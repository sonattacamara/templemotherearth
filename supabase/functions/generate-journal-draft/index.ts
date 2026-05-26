import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const ALLOWED_ORIGINS = [
  "https://templemotherearth.lovable.app",
  "https://templemotherearth.org",
  "http://localhost:8080",
  "http://localhost:5173",
];

const getCorsHeaders = (req: Request) => {
  const origin = req.headers.get("origin") || "";
  return {
    "Access-Control-Allow-Origin": ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0],
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  };
};

const TOPIC_BUCKETS = [
  { key: "education", focus: "educational deep-dive on a sacred earth practice (Kambo, Hapé, Cacao, Sacred Vine, Sacred Tea, or Yin Yoga)", cta_label: "Explore Our Sacred Offerings", cta_url: "/membership" },
  { key: "ending-suffering", focus: "ending your own pain and suffering through ceremony, presence, and nervous-system sovereignty", cta_label: "Begin Your Journey", cta_url: "/ceremony-intake" },
  { key: "four-agreements", focus: "one of the Four Agreements (Toltec wisdom) applied to modern daily life", cta_label: "Sit in Sacred Circle", cta_url: "/sanctuary/cacao-ceremony" },
  { key: "integration", focus: "integration practices after a sacred ceremony — journaling, breath, embodiment", cta_label: "Enter the Integration Portal", cta_url: "/portal" },
  { key: "veterans", focus: "nervous-system sovereignty and reclamation for veterans and first responders", cta_label: "Veterans Transformation", cta_url: "/veterans-transformation" },
  { key: "preparation", focus: "preparing body, mind, and spirit for a sacred ceremony (7-day protocol)", cta_label: "Review Preparation Guide", cta_url: "/preparation" },
  { key: "sacred-blueprint", focus: "discovering your Sacred Blueprint and walking your unique path", cta_label: "Reveal Your Blueprint", cta_url: "/sacred-blueprint" },
];

function slugify(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80);
}

Deno.serve(async (req) => {
  const corsHeaders = getCorsHeaders(req);
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    // Require authenticated admin
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const authClient = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );
    const token = authHeader.replace("Bearer ", "");
    const { data: { user } } = await authClient.auth.getUser(token);
    if (!user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const { data: roleData } = await authClient
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .eq("role", "admin")
      .maybeSingle();
    if (!roleData) {
      return new Response(JSON.stringify({ error: "Forbidden" }), {
        status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await req.json().catch(() => ({}));
    const postType: "long" | "short" = body.post_type === "short" ? "short" : "long";

    const bucket = TOPIC_BUCKETS[Math.floor(Math.random() * TOPIC_BUCKETS.length)];
    const wordTarget = postType === "long" ? "900-1200 words" : "300-450 words";

    const systemPrompt = `You are the resident writer for Temple Mother Earth, a 508(c)(1)(A) sacred ceremony church in Washington DC. You write in a warm, embodied, Toltec-influenced voice for spiritual seekers.

STRICT RFRA / First Amendment language rules — NEVER use these words: medicine (as treatment), treatment, cure, heal, healing, poison, toxin, venom, drug, psychedelic, DMT, psilocybin, ayahuasca chemistry. 
Use instead: sacred ceremony, sacred earth practice, Sacrament, Sacred Fungi, God Molecule, the Sacred Vine, sacred frog secretion, reciprocity, awakening, remembrance.

TONE: NLP-aware, second person ("you"), present tense, sensory. Avoid em-dashes (—) and en-dashes (–); use middle dot (·), comma, or colon. No emojis.

STRUCTURE: Use **bold section headers** (markdown ** wrap) between paragraphs. Open with a hook the reader sees themselves in.`;

    const userPrompt = `Write a ${postType} journal post (${wordTarget}) for Temple Mother Earth on this topic: ${bucket.focus}.

Return ONLY valid JSON matching this shape (no markdown fence):
{
  "title": "string, under 70 chars, evocative",
  "excerpt": "string, 1-2 sentences, under 200 chars",
  "body": "string, markdown with **bold headers** between sections, ${wordTarget}, NO em-dashes",
  "suggested_cta_label": "string",
  "suggested_cta_url": "string, a path on templemotherearth.org"
}`;

    const aiRes = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${Deno.env.get("LOVABLE_API_KEY")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        response_format: { type: "json_object" },
      }),
    });

    if (!aiRes.ok) {
      const t = await aiRes.text();
      console.error("AI gateway error", aiRes.status, t);
      return new Response(JSON.stringify({ error: "AI generation failed", status: aiRes.status }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const aiJson = await aiRes.json();
    const content = aiJson.choices?.[0]?.message?.content ?? "{}";
    const parsed = JSON.parse(content);

    const title: string = parsed.title ?? "Untitled Transmission";
    const excerpt: string = parsed.excerpt ?? "";
    const bodyText: string = (parsed.body ?? "").replace(/[—–]/g, "·");
    const ctaLabel: string = parsed.suggested_cta_label ?? bucket.cta_label;
    const ctaUrl: string = parsed.suggested_cta_url ?? bucket.cta_url;

    let baseSlug = slugify(title) || `transmission-${Date.now()}`;
    let slug = baseSlug;

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // ensure unique slug
    for (let i = 2; i < 20; i++) {
      const { data: existing } = await supabase.from("journal_posts").select("id").eq("slug", slug).maybeSingle();
      if (!existing) break;
      slug = `${baseSlug}-${i}`;
    }

    const { data: inserted, error: insertErr } = await supabase
      .from("journal_posts")
      .insert({
        title,
        slug,
        excerpt,
        body: bodyText,
        post_type: postType,
        topic_bucket: bucket.key,
        cta_label: ctaLabel,
        cta_url: ctaUrl,
        status: "draft",
        scheduled_for: new Date().toISOString(),
        ai_model: "google/gemini-2.5-flash",
        generation_prompt: bucket.focus,
      })
      .select()
      .single();

    if (insertErr) {
      console.error("Insert error", insertErr);
      return new Response(JSON.stringify({ error: insertErr.message }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true, post: inserted }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("generate-journal-draft error", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "unknown" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});