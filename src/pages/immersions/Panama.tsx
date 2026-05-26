import { useState } from "react";
import { motion, type Easing } from "framer-motion";
import { ArrowRight, CheckCircle2, Loader2, Sun, Waves, Sparkles, Mountain } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import SEOHead from "@/components/SEOHead";
import PageBreadcrumb from "@/components/PageBreadcrumb";
import Navigation from "@/components/Navigation";
import jungleHero from "@/assets/community-retreat-jungle.jpg";
import jungleGroup from "@/assets/community-jungle-group.jpg";

const ease: Easing = [0.25, 0.1, 0.25, 1];
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};
const stagger = { visible: { transition: { staggerChildren: 0.12 } } };

const Panama = () => {
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
      await supabase.functions.invoke("submit-panama", { body: form });
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
        title="The Crossing · Panama Sacred Immersion | Temple Mother Earth"
        description="The Crossing · a Lionsgate integration sanctuary in Panama. Rest, reset, and integrate the great unfolding of 2026 at the crossroads of two oceans."
        path="/immersions/panama"
      />
      <Navigation />
      <PageBreadcrumb items={[{ label: "Immersions" }, { label: "The Crossing · Panama" }]} />

      {/* Hero */}
      <section className="relative flex min-h-[72vh] items-center justify-center overflow-hidden px-4 pt-20">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${jungleHero})` }} />
        <div className="absolute inset-0 bg-foreground/75" />
        <motion.div className="relative z-10 max-w-3xl text-center" initial="hidden" animate="visible" variants={stagger}>
          <motion.p variants={fadeUp} className="font-body text-xs tracking-[3px] uppercase text-primary/80">
            Sacred Immersion · Panama
          </motion.p>
          <motion.h1 variants={fadeUp} className="mt-3 font-display text-4xl font-bold text-primary-foreground md:text-6xl">
            The Crossing
          </motion.h1>
          <motion.p variants={fadeUp} className="mx-auto mt-5 max-w-2xl text-lg italic text-primary-foreground/80">
            At the isthmus where two oceans meet · the soul lays down what it carried,
            and the body remembers it is home.
          </motion.p>
          <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-xl text-base text-primary-foreground/70">
            A Lionsgate integration sanctuary held in the lush green of Panama · for the
            sacred ones moving through the great unfolding of 2026.
          </motion.p>
          <motion.a
            variants={fadeUp}
            href="#apply"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-body text-sm font-semibold text-primary-foreground transition hover:bg-primary/80"
          >
            Apply to Cross Over <ArrowRight className="h-4 w-4" />
          </motion.a>
        </motion.div>
      </section>

      {/* Why Lionsgate / Why Panama */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <div className="text-center max-w-2xl mx-auto">
            <p className="font-body text-xs tracking-[3px] uppercase text-primary/80">
              The Lionsgate Portal
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-foreground md:text-4xl">
              Cross Through the Gate. Land in the Body.
            </h2>
            <p className="mt-6 text-base text-foreground/80">
              Each year, between late July and mid August, the heavens open a corridor
              the ancient ones called the <strong className="text-primary">Lionsgate</strong>{" · "}
              a window where the star Sirius rises with our Sun and the veil between the
              spirit world and the body world grows thin.
            </p>
            <p className="mt-4 text-base text-foreground/80">
              This is a time of immense download · new codes, new instructions, new
              chapters arriving faster than the nervous system can hold them. Without a
              sanctuary to integrate, the gift becomes a burden. This is why we cross.
            </p>
            <p className="mt-4 text-base text-foreground/80">
              Panama · the bridge between two continents, the meeting place of two oceans
              · is the perfect ground for landing. Here, the Earth herself models the
              great crossing. Here, we rest. Here, we integrate everything that 2026 has
              already asked of us.
            </p>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {[
              { icon: Sparkles, title: "Sacred Pause", desc: "Permission to stop. Days held in stillness · no agenda except your nervous system finally exhaling all the way out." },
              { icon: Waves, title: "Two Oceans, One Reset", desc: "Where the Pacific and the Caribbean kiss the same land. Daily ocean immersion · the original integration medicine." },
              { icon: Sun, title: "Lionsgate Integration", desc: "Ceremony, breath, gentle movement, and circle work designed to land the codes you have been receiving since August opened." },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-border bg-card p-6 text-center">
                <item.icon className="mx-auto h-8 w-8 text-primary" />
                <h3 className="mt-3 font-display text-lg font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 grid gap-4 grid-cols-1 md:grid-cols-2">
            {[
              { src: jungleHero, alt: "Tropical jungle sanctuary in Panama" },
              { src: jungleGroup, alt: "Sacred community gathered in ceremony" },
            ].map((img) => (
              <div key={img.src} className="overflow-hidden rounded-2xl">
                <img src={img.src} alt={img.alt} className="h-72 w-full object-cover md:h-80" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who this is for */}
      <section className="bg-card/40 px-4 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <Mountain className="mx-auto h-8 w-8 text-primary" />
          <h2 className="mt-3 font-display text-2xl font-bold text-foreground md:text-3xl">
            This Crossing Is For You If…
          </h2>
          <ul className="mt-8 space-y-3 text-left text-foreground/80 max-w-xl mx-auto">
            {[
              "You have felt the acceleration of 2026 in your body and your spirit.",
              "Lionsgate cracked something open in you · and now you need ground.",
              "You are tired of integrating alone. You are ready to be held.",
              "You sense it is time to lay down what was, before stepping into what is becoming.",
            ].map((line) => (
              <li key={line} className="flex gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Application form */}
      <section id="apply" className="bg-card px-4 py-16">
        <div className="mx-auto max-w-2xl">
          {!submitted ? (
            <>
              <p className="text-center font-body text-xs tracking-[3px] uppercase text-primary/80">
                Sacred Application
              </p>
              <h2 className="mt-3 text-center font-display text-2xl font-bold text-card-foreground md:text-3xl">
                Apply to Cross Over
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-center text-sm text-muted-foreground">
                The Crossing is held in small sacred circle. Share your details and our
                team will reach out personally with dates, sanctuary location, and the
                preparation pathway.
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
                    <><Loader2 className="h-4 w-4 animate-spin" /> Sending your application…</>
                  ) : (
                    <>Submit My Application <ArrowRight className="h-4 w-4" /></>
                  )}
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
                days with the next step on your Crossing.
              </p>
            </div>
          )}
        </div>
      </section>

      <footer className="bg-foreground px-4 py-12">
        <div className="mx-auto max-w-4xl text-center">
          <p className="font-body text-xs text-primary-foreground/40">
            © {new Date().getFullYear()} Temple Mother Earth. A 508(c)(1)(A) sacred ceremony church. The Crossing · Panama.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Panama;