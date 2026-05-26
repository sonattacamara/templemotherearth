import { useState } from "react";
import { motion, type Easing } from "framer-motion";
import { ArrowRight, CheckCircle2, Loader2, Waves, Flame, Heart, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import SEOHead from "@/components/SEOHead";
import PageBreadcrumb from "@/components/PageBreadcrumb";
import Navigation from "@/components/Navigation";
import beachHero from "@/assets/costa-rica-palms-beach.jpg";
import jungleHero from "@/assets/community-retreat-jungle.jpg";
import jungleGroup from "@/assets/community-jungle-group.jpg";

const ease: Easing = [0.25, 0.1, 0.25, 1];
const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } } };
const stagger = { visible: { transition: { staggerChildren: 0.12 } } };

const Sayulita = () => {
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
      await supabase.functions.invoke("submit-sayulita", { body: form });
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
        title="Infinite Yes · Sayulita Sacred Immersion | Temple Mother Earth"
        description="Infinite Yes · a beachfront sacred immersion in Sayulita, Riviera Nayarit. Oct 31·Nov 5, 2026. Held across the sacred threshold of Día de los Muertos."
        path="/immersions/sayulita"
      />
      <Navigation />
      <PageBreadcrumb items={[{ label: "Immersions" }, { label: "Infinite Yes · Sayulita" }]} />

      <section className="relative flex min-h-[72vh] items-center justify-center overflow-hidden px-4 pt-20">
        <img src={beachHero} alt="Sayulita Pacific shore at golden hour" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-foreground/70" />
        <motion.div className="relative z-10 max-w-3xl text-center" initial="hidden" animate="visible" variants={stagger}>
          <motion.p variants={fadeUp} className="font-body text-xs tracking-[3px] uppercase text-primary/80">
            Sacred Immersion · Sayulita, Riviera Nayarit
          </motion.p>
          <motion.h1 variants={fadeUp} className="mt-3 font-display text-4xl font-bold text-primary-foreground md:text-6xl">
            Infinite Yes
          </motion.h1>
          <motion.p variants={fadeUp} className="mx-auto mt-5 max-w-2xl text-lg italic text-primary-foreground/80">
            At the edge of the Pacific, where the ancestors walk between worlds · the
            soul finally says yes to the life it has been quietly dreaming of.
          </motion.p>
          <motion.p variants={fadeUp} className="mx-auto mt-4 text-sm tracking-[2px] uppercase text-primary/80">
            October 31 · November 5, 2026
          </motion.p>
          <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-xl text-base text-primary-foreground/70">
            A beachfront sanctuary immersion held across the sacred threshold of Día de
            los Muertos · five days to lay down every quiet no and walk home in an
            infinite, embodied yes.
          </motion.p>
          <motion.a variants={fadeUp} href="#apply" className="mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-body text-sm font-semibold text-primary-foreground transition hover:bg-primary/80">
            Apply to Say Yes <ArrowRight className="h-4 w-4" />
          </motion.a>
        </motion.div>
      </section>

      <section className="px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <div className="text-center max-w-2xl mx-auto">
            <p className="font-body text-xs tracking-[3px] uppercase text-primary/80">Why Sayulita · Why Now</p>
            <h2 className="mt-3 font-display text-3xl font-bold text-foreground md:text-4xl">
              The Place the Ancestors Chose for You
            </h2>
            <p className="mt-6 text-base text-foreground/80">
              Sayulita is a small jungle·meets·ocean village on the Pacific coast of
              Riviera Nayarit · colorful, barefoot, alive. The Huichol carriers have
              walked this land for centuries. The ocean keeps the rhythm. The jungle
              keeps the secrets.
            </p>
            <p className="mt-4 text-base text-foreground/80">
              And we land here during the most thinly·veiled days of the year · the
              sacred corridor of <strong className="text-primary">Día de los Muertos</strong>,
              when the ancestors come close, when the marigolds are lit, when what has
              been waiting for you finally finds the door.
            </p>
            <p className="mt-4 text-base text-foreground/80">
              You will not be talked at. You will be held. You will feel your feet in
              the sand and notice, maybe for the first time in years, that your
              shoulders dropped. That is where the work begins.
            </p>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {[
              { icon: Waves, title: "Ocean as Ceremony", desc: "Daily sunrise saltwater immersion · the original cleansing. Your breath syncs with the surf and the held things start to leave." },
              { icon: Flame, title: "Día de los Muertos Sanctuary", desc: "A sacred altar circle to honor the ones who came before · grief that has been waiting for a doorway finally gets one." },
              { icon: Heart, title: "The Infinite Yes", desc: "Embodied practices, breath, cacao, sacred sound, and circle work designed to open the body's deepest, oldest yes." },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-border bg-card p-6 text-center">
                <item.icon className="mx-auto h-8 w-8 text-primary" />
                <h3 className="mt-3 font-display text-lg font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 grid gap-4 grid-cols-1 md:grid-cols-2">
            <div className="overflow-hidden rounded-2xl"><img src={jungleHero} alt="Beachfront sanctuary at golden hour" className="h-72 w-full object-cover md:h-80" /></div>
            <div className="overflow-hidden rounded-2xl"><img src={jungleGroup} alt="Sacred community gathered in ceremony" className="h-72 w-full object-cover md:h-80" /></div>
          </div>
        </div>
      </section>

      <section className="bg-card/40 px-4 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <Sparkles className="mx-auto h-8 w-8 text-primary" />
          <h2 className="mt-3 font-display text-2xl font-bold text-foreground md:text-3xl">
            Infinite Yes Is For You If…
          </h2>
          <ul className="mt-8 space-y-3 text-left text-foreground/80 max-w-xl mx-auto">
            {[
              "You have been quietly saying yes to everything except yourself.",
              "You feel an ancestor·level pull toward the ocean, the medicine, the warmth.",
              "Grief, longing, or unspoken dreams have been knocking · and you are finally ready to open the door.",
              "You are ready to come home in your own body, in a place that knows how to hold you.",
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
              <h2 className="mt-3 text-center font-display text-2xl font-bold text-card-foreground md:text-3xl">Apply to Say Your Infinite Yes</h2>
              <p className="mx-auto mt-4 max-w-lg text-center text-sm text-muted-foreground">
                Infinite Yes is held in small sacred circle. Share your details and our
                team will reach out personally with sanctuary location, lodging, and
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
                days with the next step on your Infinite Yes.
              </p>
            </div>
          )}
        </div>
      </section>

      <footer className="bg-foreground px-4 py-12">
        <div className="mx-auto max-w-4xl text-center">
          <p className="font-body text-xs text-primary-foreground/40">
            © {new Date().getFullYear()} Temple Mother Earth. A 508(c)(1)(A) sacred ceremony church. Infinite Yes · Sayulita.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Sayulita;