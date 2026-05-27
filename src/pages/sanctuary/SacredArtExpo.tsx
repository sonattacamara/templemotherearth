import { useState } from "react";
import { motion, type Easing } from "framer-motion";
import { Palette, Music, Users, Sparkles, Send, ArrowRight, ArrowDown, Flower2, Leaf as LeafIcon, Brush } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import SEOHead from "@/components/SEOHead";
import artExpoHero from "@/assets/art-expo-hero.jpeg";
import artExpoVideo from "@/assets/video-art-expo-hero.mp4?url";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { trackForm } from "@/hooks/useAnalytics";

const EVENTBRITE_TICKET = "https://www.eventbrite.com/e/1989536196320/?aff=oddtdtcreator";

/** Reusable ticket-purchase anchor with loading/disabled state + analytics. */
const TicketLink = ({
  source,
  className,
  style,
  children,
}: {
  source: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) => {
  const [clicked, setClicked] = useState(false);
  const handle = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (clicked) {
      e.preventDefault();
      return;
    }
    setClicked(true);
    // Fire analytics (don't block navigation)
    void trackForm("art-expo-ticket-click", { source, url: EVENTBRITE_TICKET });
    // Re-enable after 4s in case the new tab is blocked / user returns
    window.setTimeout(() => setClicked(false), 4000);
  };
  return (
    <a
      href={EVENTBRITE_TICKET}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handle}
      aria-disabled={clicked}
      data-loading={clicked || undefined}
      className={className}
      style={{ ...style, ...(clicked ? { opacity: 0.65, pointerEvents: "none" } : {}) }}
    >
      {clicked ? "Opening…" : children}
    </a>
  );
};

interface FlipCardProps {
  icon: React.ElementType;
  title: string;
  detail: string;
  intention: string;
  source: string;
}

const EventFlipCard = ({ icon: Icon, title, detail, intention, source }: FlipCardProps) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      variants={fadeUp}
      className="cursor-pointer group"
      style={{ perspective: 800, minHeight: 220 }}
      onClick={() => setFlipped((f) => !f)}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative w-full h-full"
        style={{ transformStyle: "preserve-3d", minHeight: 220 }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 rounded-xl p-6 text-center flex flex-col items-center justify-center overflow-hidden"
          style={{
            background: "#1a1612",
            border: "1px solid #c9a84c22",
            backfaceVisibility: "hidden",
            boxShadow: "0 0 12px rgba(201,168,76,0.06)",
            animation: "glowPulse 4s ease-in-out infinite",
          }}
        >
          {/* Shimmer overlay */}
          <div
            className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            style={{
              background: "linear-gradient(105deg, transparent 40%, rgba(201,168,76,0.08) 45%, rgba(201,168,76,0.18) 50%, rgba(201,168,76,0.08) 55%, transparent 60%)",
              animation: "shimmer 3s ease-in-out infinite",
            }}
          />
          <Icon className="mx-auto h-8 w-8" style={{ color: "#c9a84c" }} />
          <h3 className="mt-3 font-serif text-lg font-semibold" style={{ color: "#c9a84c" }}>
            {title}
          </h3>
          <p className="mt-1 text-sm" style={{ color: "#B8A07Aaa" }}>{detail}</p>
          <p className="mt-3 text-[10px] uppercase tracking-[0.3em] font-sans" style={{ color: "#c9a84c66" }}>
            Tap to learn more
          </p>
        </div>
        {/* Back */}
        <div
          className="absolute inset-0 rounded-xl p-6 flex flex-col items-center justify-between text-center"
          style={{ background: "#1a1612", border: "1px solid #c9a84c33", backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div>
            <h3 className="font-serif text-lg font-semibold" style={{ color: "#c9a84c" }}>
              {title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed font-serif" style={{ color: "#B8A07Acc" }}>
              {intention}
            </p>
          </div>
          <TicketLink
            source={`flipcard-${source}`}
            className="mt-4 inline-flex items-center gap-2 rounded-lg px-5 py-2.5 font-sans text-xs font-bold uppercase tracking-wider transition hover:opacity-90"
            style={{ background: "#c9a84c", color: "#0d0b08" }}
          >
            Reserve Your Experience <ArrowRight className="h-3.5 w-3.5" />
          </TicketLink>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ease: Easing = [0.25, 0.1, 0.25, 1];
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};
const stagger = { visible: { transition: { staggerChildren: 0.12 } } };

const MEDIUMS = [
  "Painting", "Sculpture", "Photography", "Digital Art", "Mixed Media",
  "Fiber Arts", "Ceramics", "Illustration", "Performance Art", "Other",
];

const EVENTS = [
  "Spring Equinox · March 28, 2026",
  "Fall Equinox · Fall 2026",
  "Canvas & Ceremony · July 2026",
  "All of the above",
];

const HEARD_FROM = [
  "Text message", "Social media", "Word of mouth", "Community member",
];

const SacredArtExpo = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    mediums: [] as string[],
    description: "",
    portfolio: "",
    event: "",
    heardFrom: "",
  });

  const update = (field: string, value: string) =>
    setForm((p) => ({ ...p, [field]: value }));

  const toggleMedium = (m: string) =>
    setForm((p) => ({
      ...p,
      mediums: p.mediums.includes(m)
        ? p.mediums.filter((x) => x !== m)
        : [...p.mediums, m],
    }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.firstName || !form.lastName || !form.email || !form.phone || !form.city) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setIsSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke("submit-art-expo", { body: form });
      if (error) throw error;
      setSubmitted(true);
      document.getElementById("art-form")?.scrollIntoView({ behavior: "smooth" });
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen" style={{ background: "#0d0b08" }}>
      <SEOHead
        title="Art Expo · Artist Submissions"
        description="Temple Mother Earth invites artists of all mediums to submit work for our bi-annual Art Expo. Spring Equinox March 28, 2026."
        path="/art-expo"
      />
      <Navigation />

      {/* ── HERO ── */}
      <section className="relative isolate flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 text-center bg-[#0d0b08]">
        <video
          src={artExpoVideo}
          poster={artExpoHero}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 z-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 z-[1] bg-[#0d0b08]/70 pointer-events-none" />

        <motion.div
          className="relative z-10 max-w-3xl"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <motion.p
            variants={fadeUp}
            className="font-sans text-[10px] font-bold uppercase tracking-[0.5em]"
            style={{ color: "#c9a84c" }}
          >
           Temple Mother Earth · Art Expo
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="mt-6 font-serif text-4xl font-semibold leading-tight md:text-6xl lg:text-7xl"
            style={{ color: "#F5F0E6" }}
          >
            Art is an open expression
            <br />
            <em className="italic" style={{ color: "#c9a84c" }}>of the soul.</em>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-4 max-w-lg font-serif text-lg italic"
            style={{ color: "#c9a84c99" }}
          >
            A language that speaks to our humanity and captures the essence of spirit.
          </motion.p>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-xl text-base leading-relaxed md:text-lg"
            style={{ color: "#F5F0E6cc" }}
          >
            Temple Mother Earth invites artists of all mediums to bring their work into our
            sacred space. The Art Expo is a living gallery · where creativity, community, and
            ceremony converge.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#art-form"
              className="inline-flex items-center justify-center gap-2 rounded-xl px-8 py-4 font-sans text-sm font-bold uppercase tracking-wider transition hover:opacity-90"
              style={{ background: "#c9a84c", color: "#0d0b08" }}
            >
              I'm an Artist · Apply <ArrowDown className="h-4 w-4" />
            </a>
            <TicketLink
              source="hero"
              className="inline-flex items-center justify-center gap-2 rounded-xl px-8 py-4 font-sans text-sm font-bold uppercase tracking-wider border-2 transition hover:bg-[#c9a84c] hover:text-[#0d0b08]"
              style={{ borderColor: "#c9a84c", color: "#c9a84c", background: "transparent" }}
            >
              I Want to See the Art · Get Tickets <ArrowRight className="h-4 w-4" />
            </TicketLink>
          </motion.div>
        </motion.div>
      </section>

      {/* ── ABOUT THE ART EXPO ── */}
      <section className="px-4 py-20 md:py-28" style={{ borderTop: "1px solid #c9a84c22" }}>
        <motion.div
          className="mx-auto max-w-4xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
        >
          <motion.p variants={fadeUp} className="text-center font-sans text-[10px] font-bold uppercase tracking-[0.4em]" style={{ color: "#c9a84c" }}>
            What This Is
          </motion.p>
          <motion.h2 variants={fadeUp} className="mt-4 text-center font-serif text-3xl font-semibold md:text-5xl" style={{ color: "#F5F0E6" }}>
            What is the Art Expo?
          </motion.h2>
          <motion.div variants={fadeUp} className="mx-auto mt-8 max-w-[720px] space-y-6 font-serif text-lg leading-[1.85]" style={{ color: "#B8A07Aaa" }}>
            <p>
              The Temple Mother Earth Art Expo is a bi-annual sacred art exhibition held at the Spring and Fall
              Equinox · moments of balance, beauty, and transition. Each expo features local DC-area
              artists across all mediums: painting, sculpture, photography, digital art, fiber arts,
              and beyond.
            </p>
            <p>
              <strong style={{ color: "#F5F0E6" }}>
                A ceremony of creative souls gathered to witness, honor, and elevate art as sacrament.
              </strong>
            </p>
          </motion.div>

          {/* Event Cards */}
          <div className="mt-14 grid gap-4 sm:grid-cols-3">
            {[
              {
                icon: Flower2,
                title: "Spring Equinox",
                detail: "March 28, 2026 · 7·10 PM",
                intention: "A celebration of renewal and rebirth. As the Earth awakens, we gather to honor the creative spirit within · displaying art that reflects transformation, new beginnings, and the sacredness of spring.",
                source: "spring-equinox",
              },
              {
                icon: LeafIcon,
                title: "Fall Equinox",
                detail: "Date TBD · Fall 2026",
                intention: "A ceremony of harvest and reflection. As the seasons shift, we invite art that speaks to gratitude, ancestral wisdom, and the beauty found in surrender and letting go.",
                source: "fall-equinox",
              },
              {
                icon: Brush,
                title: "Canvas & Ceremony",
                detail: "July 2026 · Immersive art + ceremony",
                intention: "An immersive evening where art-making becomes ceremony. Guests create alongside artists in a guided, sacred space · blending live painting, sound healing, and communal expression.",
                source: "canvas-ceremony",
              },
            ].map((e) => (
              <EventFlipCard key={e.title} icon={e.icon} title={e.title} detail={e.detail} intention={e.intention} source={e.source} />
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── THE EXPERIENCE ── */}
      <section className="px-4 py-16 md:py-24" style={{ background: "#111009" }}>
        <motion.div
          className="mx-auto max-w-5xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
        >
          <motion.p variants={fadeUp} className="text-center font-sans text-[10px] font-bold uppercase tracking-[0.4em]" style={{ color: "#c9a84c" }}>
            What to Expect
          </motion.p>
          <motion.h2 variants={fadeUp} className="mt-4 text-center font-serif text-3xl font-semibold md:text-4xl" style={{ color: "#F5F0E6" }}>
            The Experience
          </motion.h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {[
              { icon: Palette, title: "Live Exhibition", desc: "Your work displayed in a curated, sacred setting." },
              { icon: Music, title: "Live Music & Community", desc: "An evening of sound, connection, and creativity." },
              { icon: Sparkles, title: "Artist Spotlight", desc: "Share the story and intention behind your work." },
            ].map((c) => (
              <motion.div
                key={c.title}
                variants={fadeUp}
                className="rounded-xl p-8 text-center"
                style={{ background: "#0d0b08", border: "1px solid #c9a84c22" }}
              >
                <c.icon className="mx-auto h-8 w-8" style={{ color: "#c9a84c" }} />
                <h3 className="mt-4 font-serif text-lg font-semibold" style={{ color: "#F5F0E6" }}>
                  {c.title}
                </h3>
                <p className="mt-2 text-sm" style={{ color: "#B8A07Aaa" }}>{c.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── WHO WE'RE LOOKING FOR ── */}
      <section className="px-4 py-16 md:py-24">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
        >
          <motion.p variants={fadeUp} className="font-sans text-[10px] font-bold uppercase tracking-[0.4em]" style={{ color: "#c9a84c" }}>
            The Call
          </motion.p>
          <motion.h2 variants={fadeUp} className="mt-4 font-serif text-3xl font-semibold md:text-4xl" style={{ color: "#F5F0E6" }}>
            We're Calling All Artists
          </motion.h2>
          <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-xl font-serif text-base leading-relaxed" style={{ color: "#B8A07Aaa" }}>
            Whether you paint, sculpt, photograph, illustrate, weave, or create digitally · if
            your work carries soul, there is a place for it here. We welcome artists of all
            backgrounds, disciplines, and experience levels. No piece is too sacred. No voice is
            too small.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap justify-center gap-2">
            {MEDIUMS.map((m) => (
              <span
                key={m}
                className="rounded-full px-4 py-1.5 font-sans text-xs font-medium"
                style={{ background: "#c9a84c22", color: "#c9a84c", border: "1px solid #c9a84c33" }}
              >
                {m}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ── SUBMISSION FORM ── */}
      <section id="art-form" className="px-4 py-16 md:py-24" style={{ background: "#111009" }}>
        <div className="mx-auto max-w-2xl">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl p-10 text-center"
              style={{ background: "#1a1612", border: "1px solid #c9a84c33" }}
            >
              <Sparkles className="mx-auto h-10 w-10" style={{ color: "#c9a84c" }} />
              <h3 className="mt-6 font-serif text-2xl font-semibold" style={{ color: "#F5F0E6" }}>
                Thank you for sharing your light with us.
              </h3>
              <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed" style={{ color: "#B8A07Aaa" }}>
                Our team will be in touch within 48 hours. We cannot wait to see what you bring.
              </p>
            </motion.div>
          ) : (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
            >
              <motion.p variants={fadeUp} className="text-center font-sans text-[10px] font-bold uppercase tracking-[0.4em]" style={{ color: "#c9a84c" }}>
                Artist Submission
              </motion.p>
              <motion.h2 variants={fadeUp} className="mt-4 text-center font-serif text-3xl font-semibold md:text-4xl" style={{ color: "#F5F0E6" }}>
                Submit Your Art
              </motion.h2>

              <form onSubmit={handleSubmit} className="mt-10 space-y-6">
                <motion.div variants={fadeUp} className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="text-sm" style={{ color: "#F5F0E6" }}>First Name *</Label>
                    <Input
                      value={form.firstName}
                      onChange={(e) => update("firstName", e.target.value)}
                      required
                      className="border-[#c9a84c33] bg-[#0d0b08] text-[#F5F0E6] placeholder:text-[#B8A07A66]"
                      placeholder="First name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm" style={{ color: "#F5F0E6" }}>Last Name *</Label>
                    <Input
                      value={form.lastName}
                      onChange={(e) => update("lastName", e.target.value)}
                      required
                      className="border-[#c9a84c33] bg-[#0d0b08] text-[#F5F0E6] placeholder:text-[#B8A07A66]"
                      placeholder="Last name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm" style={{ color: "#F5F0E6" }}>Email Address *</Label>
                    <Input
                      type="email"
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      required
                      className="border-[#c9a84c33] bg-[#0d0b08] text-[#F5F0E6] placeholder:text-[#B8A07A66]"
                      placeholder="you@example.com"
                    />
                  </div>
                </motion.div>

                <motion.div variants={fadeUp} className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="text-sm" style={{ color: "#F5F0E6" }}>Phone Number *</Label>
                    <Input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      required
                      className="border-[#c9a84c33] bg-[#0d0b08] text-[#F5F0E6] placeholder:text-[#B8A07A66]"
                      placeholder="(202) 555-0123"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm" style={{ color: "#F5F0E6" }}>City / Neighborhood *</Label>
                    <Input
                      value={form.city}
                      onChange={(e) => update("city", e.target.value)}
                      required
                      className="border-[#c9a84c33] bg-[#0d0b08] text-[#F5F0E6] placeholder:text-[#B8A07A66]"
                      placeholder="e.g. Southeast DC"
                    />
                  </div>
                </motion.div>

                {/* Mediums */}
                <motion.div variants={fadeUp} className="space-y-3">
                  <Label className="text-sm" style={{ color: "#F5F0E6" }}>Art Medium(s)</Label>
                  <div className="flex flex-wrap gap-2">
                    {MEDIUMS.map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => toggleMedium(m)}
                        className="rounded-full px-4 py-1.5 text-xs font-medium transition"
                        style={{
                          background: form.mediums.includes(m) ? "#c9a84c" : "#c9a84c22",
                          color: form.mediums.includes(m) ? "#0d0b08" : "#c9a84c",
                          border: `1px solid ${form.mediums.includes(m) ? "#c9a84c" : "#c9a84c33"}`,
                        }}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </motion.div>

                <motion.div variants={fadeUp} className="space-y-2">
                  <Label className="text-sm" style={{ color: "#F5F0E6" }}>Brief Description of Your Work</Label>
                  <Textarea
                    value={form.description}
                    onChange={(e) => update("description", e.target.value)}
                    rows={3}
                    maxLength={500}
                    className="border-[#c9a84c33] bg-[#0d0b08] text-[#F5F0E6] placeholder:text-[#B8A07A66] resize-none"
                    placeholder="Tell us about your work in 2·3 sentences…"
                  />
                </motion.div>

                <motion.div variants={fadeUp} className="space-y-2">
                  <Label className="text-sm" style={{ color: "#F5F0E6" }}>Instagram Handle or Portfolio Link</Label>
                  <Input
                    value={form.portfolio}
                    onChange={(e) => update("portfolio", e.target.value)}
                    className="border-[#c9a84c33] bg-[#0d0b08] text-[#F5F0E6] placeholder:text-[#B8A07A66]"
                    placeholder="@yourhandle or https://..."
                  />
                </motion.div>

                <motion.div variants={fadeUp} className="space-y-2">
                  <Label className="text-sm" style={{ color: "#F5F0E6" }}>Which event are you interested in? *</Label>
                  <select
                    value={form.event}
                    onChange={(e) => update("event", e.target.value)}
                    required
                    className="w-full rounded-md border px-3 py-2 text-sm"
                    style={{ background: "#0d0b08", color: "#F5F0E6", borderColor: "#c9a84c33" }}
                  >
                    <option value="">Select an event…</option>
                    {EVENTS.map((e) => (
                      <option key={e} value={e}>{e}</option>
                    ))}
                  </select>
                </motion.div>

                <motion.div variants={fadeUp} className="space-y-2">
                  <Label className="text-sm" style={{ color: "#F5F0E6" }}>How did you hear about us?</Label>
                  <select
                    value={form.heardFrom}
                    onChange={(e) => update("heardFrom", e.target.value)}
                    className="w-full rounded-md border px-3 py-2 text-sm"
                    style={{ background: "#0d0b08", color: "#F5F0E6", borderColor: "#c9a84c33" }}
                  >
                    <option value="">Select…</option>
                    {HEARD_FROM.map((h) => (
                      <option key={h} value={h}>{h}</option>
                    ))}
                  </select>
                </motion.div>

                <motion.div variants={fadeUp}>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-6 text-base font-bold uppercase tracking-wider"
                    style={{ background: "#c9a84c", color: "#0d0b08" }}
                  >
                    {isSubmitting ? "Sending…" : (
                      <>
                        <Send className="mr-2 h-5 w-5" /> Send My Submission
                      </>
                    )}
                  </Button>
                </motion.div>
              </form>
            </motion.div>
          )}
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="px-4 py-16 text-center" style={{ borderTop: "1px solid #c9a84c22" }}>
        <motion.div
          className="mx-auto max-w-xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.p variants={fadeUp} className="font-serif text-lg" style={{ color: "#B8A07Aaa" }}>
            Not an artist? Come experience the expo.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-6">
            <TicketLink
              source="bottom-cta"
              className="inline-flex items-center gap-2 rounded-xl px-8 py-4 font-sans text-sm font-bold uppercase tracking-wider transition"
              style={{ background: "#c9a84c", color: "#0d0b08" }}
            >
              Get Your Ticket <ArrowRight className="h-4 w-4" />
            </TicketLink>
          </motion.div>
          <motion.p variants={fadeUp} className="mt-4 text-sm" style={{ color: "#B8A07A66" }}>
            Questions?{" "}
            <a href="/contact" style={{ color: "#c9a84c" }}>
              Visit our Contact page →
            </a>
          </motion.p>
        </motion.div>
      </section>
    </div>
  );
};

export default SacredArtExpo;
