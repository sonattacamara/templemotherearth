import { useState } from "react";
import { motion, type Easing } from "framer-motion";
import { ArrowRight, CheckCircle2, Loader2, Sun, Eye, Sparkles, Crown } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import SEOHead from "@/components/SEOHead";
import PageBreadcrumb from "@/components/PageBreadcrumb";
import Navigation from "@/components/Navigation";
import egyptVideo from "@/assets/video-egypt-hero-v2.mp4";
import jungleHero from "@/assets/community-retreat-jungle.jpg";
import jungleGroup from "@/assets/community-jungle-group.jpg";

const ease: Easing = [0.25, 0.1, 0.25, 1];
const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } } };
const stagger = { visible: { transition: { staggerChildren: 0.12 } } };

const Egypt = () => {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "" });

  const update = (field: keyof typeof form, value: string) =>
    setForm((p) => ({ ...p, [field]: value }));
  const inputClass =
    "w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary";

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await supabase.functions.invoke("submit-egypt", { body: form });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="The Remembrance · Egypt Sacred Pilgrimage | Temple Mother Earth"
        description="The Remembrance · a Kemetic pilgrimage through the sacred sites of Egypt. February 2027. Walk where the priesthoods walked. Remember what your blood already knows."
        path="/immersions/egypt"
      />
      <Navigation />
      <PageBreadcrumb items={[{ label: "Immersions" }, { label: "The Remembrance · Egypt" }]} />

      <section className="relative flex min-h-[72vh] items-center justify-center overflow-hidden px-4 pt-20">
        <video src={egyptVideo} autoPlay loop muted playsInline className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-foreground/70" />
        <motion.div className="relative z-10 max-w-3xl text-center" initial="hidden" animate="visible" variants={stagger}>
          <motion.p variants={fadeUp} className="font-body text-xs tracking-[3px] uppercase text-primary/80">
            Sacred Pilgrimage · Kemet
          </motion.p>
          <motion.h1 variants={fadeUp} className="mt-3 font-display text-4xl font-bold text-primary-foreground md:text-6xl">
            The Remembrance
          </motion.h1>
          <motion.p variants={fadeUp} className="mx-auto mt-5 max-w-2xl text-lg italic text-primary-foreground/80">
            Stand where the ancestors stood · breathe where the mystery schools breathed
            · remember what your blood has been quietly waiting to say.
          </motion.p>
          <motion.p variants={fadeUp} className="mx-auto mt-4 text-sm tracking-[2px] uppercase text-primary/80">
            February 2027
          </motion.p>
          <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-xl text-base text-primary-foreground/70">
            A sacred Kemetic pilgrimage through the temples, the desert, and the Nile ·
            held for the ones who have always felt the call of the old land.
          </motion.p>
          <motion.a variants={fadeUp} href="#apply" className="mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-body text-sm font-semibold text-primary-foreground transition hover:bg-primary/80">
            Apply to Remember <ArrowRight className="h-4 w-4" />
          </motion.a>
        </motion.div>
      </section>

      <section className="px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <div className="text-center max-w-2xl mx-auto">
            <p className="font-body text-xs tracking-[3px] uppercase text-primary/80">Why Kemet · Why You</p>
            <h2 className="mt-3 font-display text-3xl font-bold text-foreground md:text-4xl">
              You Have Been Dreaming of This Land for Lifetimes
            </h2>
            <p className="mt-6 text-base text-foreground/80">
              Long before it was called Egypt, it was <strong className="text-primary">Kemet</strong> ·
              the Black Land · the place where the ancestors built temples to align the
              body with the stars and the breath with the Nile.
            </p>
            <p className="mt-4 text-base text-foreground/80">
              You did not pick this pilgrimage by accident. Something old in you has
              been pulling you toward this land long before you had words for it. We
              are simply walking you to the door.
            </p>
            <p className="mt-4 text-base text-foreground/80">
              We walk where the priesthoods walked · the Giza Plateau, Saqqara, Abydos,
              Dendera, the Valley of the Kings · with ceremony, with reverence, with
              the carriers of the lineage holding the corridor open for your
              remembrance.
            </p>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {[
              { icon: Eye, title: "Temple Activations", desc: "Sacred ceremony inside the temples themselves · sound, breath, and silent presence in the rooms built for exactly this." },
              { icon: Sun, title: "Nile as Initiation", desc: "Days on the river, the same river that initiated the old ones · the body lands, the dreams return, the codes download." },
              { icon: Crown, title: "Lineage Carriers", desc: "Held by Kemetic teachers and indigenous Egyptian guides · the wisdom transmitted the way it has always been transmitted · in person." },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-border bg-card p-6 text-center">
                <item.icon className="mx-auto h-8 w-8 text-primary" />
                <h3 className="mt-3 font-display text-lg font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 grid gap-4 grid-cols-1 md:grid-cols-2">
            <div className="overflow-hidden rounded-2xl"><img src={jungleHero} alt="Sacred ceremony space" className="h-72 w-full object-cover md:h-80" /></div>
            <div className="overflow-hidden rounded-2xl"><img src={jungleGroup} alt="Sacred community in ceremony" className="h-72 w-full object-cover md:h-80" /></div>
          </div>
        </div>
      </section>

      <section className="bg-card/40 px-4 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <Sparkles className="mx-auto h-8 w-8 text-primary" />
          <h2 className="mt-3 font-display text-2xl font-bold text-foreground md:text-3xl">
            The Remembrance Is For You If…
          </h2>
          <ul className="mt-8 space-y-3 text-left text-foreground/80 max-w-xl mx-auto">
            {[
              "Egypt has lived inside your dreams, your art, your imagery · for as long as you can remember.",
              "You feel the limits of what books and videos can give you, and you are ready for transmission in the body.",
              "You sense you carry an old responsibility · and you are ready to receive what has been waiting.",
              "You are ready to be initiated by the land herself.",
            ].map((line) => (
              <li key={line} className="flex gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="apply" className="bg-card px-4 py-16">
        <div className="mx-auto max-w-2xl">
          {!submitted ? (
            <>
              <p className="text-center font-body text-xs tracking-[3px] uppercase text-primary/80">Sacred Application</p>
              <h2 className="mt-3 text-center font-display text-2xl font-bold text-card-foreground md:text-3xl">Apply for The Remembrance</h2>
              <p className="mx-auto mt-4 max-w-lg text-center text-sm text-muted-foreground">
                The Remembrance is held in small sacred circle. Share your details and
                our team will reach out personally with the itinerary, sacred sites, and
                the preparation pathway.
              </p>
              <form className="mt-10 space-y-4" onSubmit={submit}>
                <div className="grid grid-cols-2 gap-3">
                  <input className={inputClass} placeholder="First Name *" value={form.firstName} onChange={(e) => update("firstName", e.target.value)} required />
                  <input className={inputClass} placeholder="Last Name *" value={form.lastName} onChange={(e) => update("lastName", e.target.value)} required />
                </div>
                <input className={inputClass} type="email" placeholder="Email Address *" value={form.email} onChange={(e) => update("email", e.target.value)} required />
                <input className={inputClass} type="tel" placeholder="Phone Number *" value={form.phone} onChange={(e) => update("phone", e.target.value)} required />
                <button type="submit" disabled={submitting} className="w-full rounded-lg bg-primary px-6 py-3 font-body text-sm font-semibold text-primary-foreground transition hover:bg-primary/80 flex items-center justify-center gap-2 disabled:opacity-50">
                  {submitting ? (<><Loader2 className="h-4 w-4 animate-spin" /> Sending your application…</>) : (<>Submit My Application <ArrowRight className="h-4 w-4" /></>)}
                </button>
                <p className="text-center text-xs text-muted-foreground">
                  Held in sacred reciprocity · your information stays with our temple team.
                </p>
              </form>
            </>
          ) : (
            <div className="text-center py-12">
              <CheckCircle2 className="mx-auto h-16 w-16 text-primary" />
              <h3 className="mt-6 font-display text-2xl font-bold text-card-foreground">Application Received</h3>
              <p className="mt-4 text-muted-foreground max-w-md mx-auto">
                Thank you, sacred one. Our team will reach out personally within a few
                days with the next step on your Remembrance.
              </p>
            </div>
          )}
        </div>
      </section>

      <footer className="bg-foreground px-4 py-12">
        <div className="mx-auto max-w-4xl text-center">
          <p className="font-body text-xs text-primary-foreground/40">
            © {new Date().getFullYear()} Temple Mother Earth. A 508(c)(1)(A) sacred ceremony church. The Remembrance · Kemet.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Egypt;