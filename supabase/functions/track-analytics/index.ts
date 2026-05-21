import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

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
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
  };
};

serve(async (req) => {
  const corsHeaders = getCorsHeaders(req);

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceKey);

    const url = new URL(req.url);
    const action = url.searchParams.get("action");

    if (req.method === "POST" && action === "track") {
      const body = await req.json().catch(() => ({}));
      const path = typeof body.path === "string" ? body.path.slice(0, 500) : null;
      const referrer = typeof body.referrer === "string" ? body.referrer.slice(0, 500) : null;
      const userAgent = typeof body.userAgent === "string" ? body.userAgent.slice(0, 500) : null;
      const formName = typeof body.formName === "string" ? body.formName.slice(0, 100) : null;
      const metadata =
        body.metadata && typeof body.metadata === "object" && !Array.isArray(body.metadata)
          ? body.metadata
          : {};

      // Cap metadata size to prevent abuse
      const metaStr = JSON.stringify(metadata);
      const safeMetadata = metaStr.length > 2000 ? {} : metadata;

      if (formName) {
        await supabase.from("form_submissions").insert({ form_name: formName, metadata: safeMetadata });
      } else if (path) {
        await supabase.from("page_views").insert({ path, referrer, user_agent: userAgent });
      } else {
        return new Response(JSON.stringify({ error: "path or formName required" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (req.method === "GET" && action === "dashboard") {
      const authHeader = req.headers.get("Authorization");
      if (!authHeader?.startsWith("Bearer ")) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Validate JWT and get authenticated user
      const token = authHeader.replace("Bearer ", "");
      const { data: { user }, error: authError } = await supabase.auth.getUser(token);

      if (authError || !user) {
        return new Response(JSON.stringify({ error: "Invalid or expired token" }), {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Verify admin role
      const { data: roleData } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin")
        .single();

      if (!roleData) {
        return new Response(JSON.stringify({ error: "Forbidden: Admin access required" }), {
          status: 403,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const days = parseInt(url.searchParams.get("days") || "30");
      const since = new Date();
      since.setDate(since.getDate() - days);
      const sinceStr = since.toISOString();

      const { data: pageViews } = await supabase
        .from("page_views")
        .select("path, created_at")
        .gte("created_at", sinceStr)
        .order("created_at", { ascending: false })
        .limit(1000);

      const { data: formSubs } = await supabase
        .from("form_submissions")
        .select("form_name, metadata, created_at")
        .gte("created_at", sinceStr)
        .order("created_at", { ascending: false })
        .limit(1000);

      const pathCounts: Record<string, number> = {};
      (pageViews || []).forEach((pv: any) => {
        pathCounts[pv.path] = (pathCounts[pv.path] || 0) + 1;
      });

      const dailyCounts: Record<string, number> = {};
      (pageViews || []).forEach((pv: any) => {
        const day = pv.created_at.split("T")[0];
        dailyCounts[day] = (dailyCounts[day] || 0) + 1;
      });

      const formCounts: Record<string, number> = {};
      (formSubs || []).forEach((fs: any) => {
        formCounts[fs.form_name] = (formCounts[fs.form_name] || 0) + 1;
      });

      return new Response(
        JSON.stringify({
          totalPageViews: pageViews?.length || 0,
          totalFormSubmissions: formSubs?.length || 0,
          pageViewsByPath: Object.entries(pathCounts)
            .map(([path, count]) => ({ path, count }))
            .sort((a, b) => b.count - a.count),
          dailyPageViews: Object.entries(dailyCounts)
            .map(([date, count]) => ({ date, count }))
            .sort((a, b) => a.date.localeCompare(b.date)),
          formSubmissionsByType: Object.entries(formCounts)
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => b.count - a.count),
          recentFormSubmissions: (formSubs || []).slice(0, 20),
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(JSON.stringify({ error: "Invalid action" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Analytics error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
