import { useState } from "react";
import { motion, type Easing } from "framer-motion";
import { ArrowRight, CheckCircle2, Loader2, Leaf, Waves, Mountain, ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import SEOHead from "@/components/SEOHead";
import PageBreadcrumb from "@/components/PageBreadcrumb";
import Navigation from "@/components/Navigation";
import crPalmsBeach from "@/assets/costa-rica-palms-beach.jpg";
import crYogaShala from "@/assets/costa-rica-yoga-shala.jpg";
import crPoolPalms from "@/assets/costa-rica-pool-palms.jpg";
import crHorsesBeach from "@/assets/costa-rica-horses-beach.jpg";
import costaRicaVideo from "@/assets/video-costa-rica-hero.mp4";

const WIDE_OPEN_URL = "https://wideopenimmersion.com";

const ease: Easing = [0.25, 0.1, 0.25, 1];
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};
const stagger = { visible: { transition: { staggerChildren: 0.12 } } };

const CostaRica = () => {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "" });

  const update = (field: keyof typeof form, value: string) =>
    setForm((p) => ({ ...p, [field]: value }));
  const inputClass =
    "w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary";

  const handoff = () => {
    window.location.href = WIDE_OPEN_URL;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await supabase.functions.invoke("submit-costa-rica", { body: form });
      setSubmitted(true);
      // Hand off to Wide Open Immersion after a brief confirmation
      setTimeout(handoff, 1800);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Costa Rica Sacred Immersion · Wide Open Immersion"
        description="A sacred Costa Rica immersion held in partnership with Wide Open Immersion · jungle, ocean, ceremony, and deep nervous system restoration."
        path="/immersions/costa-rica"
      />
      <Navigation />
      <PageBreadcrumb items={[{ label: "Immersions" }, { label: "Costa Rica" }]} />

      {/* Hero */}
      <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden px-4 pt-20">
        <video
          src={costaRicaVideo}
          poster={crPalmsBeach}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-foreground/70" />
        <motion.div className="relative z-10 max-w-3xl text-center" initial="hidden" animate="visible" variants={stagger}>
          <motion.p variants={fadeUp} className="font-body text-xs tracking-[3px] uppercase text-primary/80">
            Sacred Immersion · Costa Rica
          </motion.p>
          <motion.p variants={fadeUp} className="mt-4 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
            August 2 · 8, 2026
          </motion.p>
          <motion.h1 variants={fadeUp} className="mt-3 font-display text-3xl font-bold text-primary-foreground md:text-5xl">
            The Jungle Is Calling You Home
          </motion.h1>
          <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-xl text-lg text-primary-foreground/80">
            Temple Mother Earth holds Costa Rica in sacred partnership with{" "}
            <span className="text-primary">Wide Open Immersion</span> · jungle, ocean, ceremony,
            and the deep remembering of who you have always been.
          </motion.p>
          <motion.a
            variants={fadeUp}
            href="#begin"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-body text-sm font-semibold text-primary-foreground transition hover:bg-primary/80"
          >
            Begin Your Journey <ArrowRight className="h-4 w-4" />
          </motion.a>
        </motion.div>
      </section>

      {/* What this is */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { icon: Leaf, title: "Living Jungle", desc: "Held in one of the most biodiverse sanctuaries on Earth · the medicine of the land is present before the ceremony even begins." },
              { icon: Waves, title: "Ocean Reset", desc: "Pacific waters that wash the nervous system clean · daily immersion in salt, sun, and the rhythm of the tide." },
              { icon: Mountain, title: "Sacred Container", desc: "Earth Medicine ceremony, breathwork, integration circles, and embodied practice held by trusted facilitators." },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-border bg-card p-6 text-center">
                <item.icon className="mx-auto h-8 w-8 text-primary" />
                <h3 className="mt-3 font-display text-lg font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 grid gap-4 grid-cols-2 md:grid-cols-3">
            {[
              { src: crPoolPalms, alt: "Beachfront pool framed by palms in Costa Rica" },
              { src: crYogaShala, alt: "Open-air yoga shala in the Costa Rica jungle" },
              { src: crHorsesBeach, alt: "Horseback riders on a Costa Rica Pacific beach" },
            ].map((img) => (
              <div key={img.src} className="overflow-hidden rounded-2xl">
                <img src={img.src} alt={img.alt} className="h-64 w-full object-cover md:h-72" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interstitial form */}
      <section id="begin" className="bg-card px-4 py-16">
        <div className="mx-auto max-w-2xl">
          {!submitted ? (
            <>
              <h2 className="text-center font-display text-2xl font-bold text-card-foreground md:text-3xl">
                Receive Your Invitation
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-center text-sm text-muted-foreground">
                Costa Rica is held through our partner sanctuary <strong className="text-foreground">Wide Open Immersion</strong>.
                Share your details and we will hand you off · with a warm introduction · directly to their booking portal.
              </p>
              <form className="mt-10 space-y-4" onSubmit={submit}>
                <div className="grid grid-cols-2 gap-3">
                  <input className={inputClass} placeholder="First Name *" value={form.firstName} onChange={(e) => update("firstName", e.target.value)} required />
                  <input className={inputClass} placeholder="Last Name *" value={form.lastName} onChange={(e) => update("lastName", e.target.value)} required />
                </div>
                <input className={inputClass} type="email" placeholder="Email Address *" value={form.email} onChange={(e) => update("email", e.target.value)} required />
                <input className={inputClass} type="tel" placeholder="Phone Number *" value={form.phone} onChange={(e) => update("phone", e.target.value)} required />
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full rounded-lg bg-primary px-6 py-3 font-body text-sm font-semibold text-primary-foreground transition hover:bg-primary/80 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {submitting ? (
                    <><Loader2 className="h-4 w-4 animate-spin" /> Sending you over…</>
                  ) : (
                    <>Continue to Wide Open Immersion <ExternalLink className="h-4 w-4" /></>
                  )}
                </button>
                <p className="text-center text-xs text-muted-foreground">
                  By continuing you will be redirected to <span className="text-foreground">wideopenimmersion.com</span> to complete your booking.
                </p>
              </form>
            </>
          ) : (
            <div className="text-center py-12">
              <CheckCircle2 className="mx-auto h-16 w-16 text-primary" />
              <h3 className="mt-6 font-display text-2xl font-bold text-card-foreground">Thank You, Sacred One</h3>
              <p className="mt-4 text-muted-foreground max-w-md mx-auto">
                Sending you over to <strong className="text-foreground">Wide Open Immersion</strong> now…
              </p>
              <a
                href={WIDE_OPEN_URL}
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
              >
                Continue manually <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          )}
        </div>
      </section>

      <footer className="bg-foreground px-4 py-12">
        <div className="mx-auto max-w-4xl text-center">
          <p className="font-body text-xs text-primary-foreground/40">
            © {new Date().getFullYear()} Temple Mother Earth. A 508(c)(1)(A) sacred ceremony church. Costa Rica held in partnership with Wide Open Immersion.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default CostaRica;