import { motion, type Easing } from "framer-motion";
import { HandHeart, ArrowRight, CheckCircle2, Shield, Star, Users, Loader2 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import SEOHead from "@/components/SEOHead";
import EventbriteCTA from "@/components/EventbriteCTA";
import DonationCTA from "@/components/DonationCTA";
import Navigation from "@/components/Navigation";
import communityImg from "@/assets/community.jpg";

const ease: Easing = [0.25, 0.1, 0.25, 1];
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};
const stagger = { visible: { transition: { staggerChildren: 0.12 } } };

const Sponsor = () => {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    fullName: "", email: "", phone: "", organization: "",
    sponsorType: "", message: "",
  });

  const update = (field: string, value: string) => setForm((p) => ({ ...p, [field]: value }));
  const inputClass = "w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary";

  return (
    <div className="min-h-screen bg-background">
      <SEOHead title="Become a Sponsor | Support Temple Mother Earth" description="Partner with Temple Mother Earth as a sponsor. Support sacred ceremonies, community wellness, and spiritual healing." path="/sponsor" />
      <Navigation />

      <section className="relative flex min-h-[50vh] items-center justify-center overflow-hidden px-4 pt-20">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${communityImg})` }} />
        <div className="absolute inset-0 bg-foreground/70" />
        <motion.div className="relative z-10 max-w-3xl text-center" initial="hidden" animate="visible" variants={stagger}>
          <motion.div variants={fadeUp} className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
            <HandHeart className="h-8 w-8 text-primary" />
          </motion.div>
          <motion.h1 variants={fadeUp} className="font-display text-3xl font-bold text-primary-foreground md:text-5xl">
            Walk With Us as a Sacred Steward
          </motion.h1>
          <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-xl text-lg text-primary-foreground/75">
            Your generosity sustains the sacred spaces where healing happens.
            As a steward of Temple Mother Earth, you help ensure ceremonies, community programs, and access remain available for all who are called.
          </motion.p>
        </motion.div>
      </section>

      <section className="px-4 py-16">
        <div className="mx-auto max-w-4xl grid gap-8 md:grid-cols-3">
          {[
            { icon: Shield, title: "Ceremony Stewardship", desc: "Help ensure that sacred healing is accessible to all, especially those who may not have the financial means to participate." },
            { icon: Star, title: "Gathering Stewardship", desc: "Sustain community days, immersions, yoga sessions, and other sacred gatherings that bring people together in prayer and healing." },
            { icon: Users, title: "Temple Stewardship", desc: "Support the ongoing care and growth of our DC sanctuary, a sacred space held open for the entire community." },
          ].map((item) => (
            <div key={item.title} className="rounded-xl border border-border bg-card p-6 text-center">
              <item.icon className="mx-auto h-8 w-8 text-primary" />
              <h3 className="mt-3 font-display text-lg font-semibold text-foreground">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-card px-4 py-16">
        <div className="mx-auto max-w-2xl">
          {!submitted ? (
            <>
              <h2 className="text-center font-display text-2xl font-bold text-card-foreground md:text-3xl">
               Share Your Intention
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-center text-sm text-muted-foreground">
                Tell us how you feel called to support the Temple. We will reach out to explore how we can walk this path together.
              </p>
              <form className="mt-10 space-y-5" onSubmit={async (e) => {
                e.preventDefault();
                setSubmitting(true);
                try {
                  const { error } = await supabase.functions.invoke("submit-sponsor", { body: form });
                  if (error) throw error;
                  setSubmitted(true);
                } catch (err) {
                  console.error(err);
                  toast.error("Something went wrong. Please try again.");
                } finally {
                  setSubmitting(false);
                }
              }}>
                <input className={inputClass} placeholder="Full Name *" value={form.fullName} onChange={(e) => update("fullName", e.target.value)} required />
                <input className={inputClass} type="email" placeholder="Email Address *" value={form.email} onChange={(e) => update("email", e.target.value)} required />
                <input className={inputClass} type="tel" placeholder="Phone Number" value={form.phone} onChange={(e) => update("phone", e.target.value)} />
                <input className={inputClass} placeholder="Organization (if applicable)" value={form.organization} onChange={(e) => update("organization", e.target.value)} />
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">How do you feel called to support? *</label>
                  {["Ceremony Stewardship", "Gathering Stewardship", "Temple / Facility Stewardship", "In-Kind Offering (goods/services)", "I'm not sure yet, I'd love to explore"].map((opt) => (
                    <label key={opt} className="mb-2 flex items-center text-sm text-foreground cursor-pointer">
                      <input type="radio" name="sponsorType" className="mr-3 h-4 w-4 accent-primary" checked={form.sponsorType === opt} onChange={() => update("sponsorType", opt)} required />
                      {opt}
                    </label>
                  ))}
                </div>
                <textarea className={inputClass + " min-h-[100px] resize-none"} placeholder="Tell us more about your interest in sponsoring Temple Mother Earth... *" value={form.message} onChange={(e) => update("message", e.target.value)} required />
                <button type="submit" disabled={submitting} className="w-full rounded-lg bg-primary px-6 py-3 font-body text-sm font-semibold text-primary-foreground transition hover:bg-primary/80 flex items-center justify-center gap-2 disabled:opacity-50">
                  {submitting ? <><Loader2 className="h-4 w-4 animate-spin" /> Submitting...</> : <>Send With Love <ArrowRight className="h-4 w-4" /></>}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-12">
              <CheckCircle2 className="mx-auto h-16 w-16 text-primary" />
              <h3 className="mt-6 font-display text-2xl font-bold text-card-foreground">Thank You, Sacred Steward</h3>
              <p className="mt-4 text-muted-foreground max-w-md mx-auto">
                Your message has been received with gratitude. Our team will reach out to explore how we can walk this sacred path together.
              </p>
              <Link to="/" className="mt-8 inline-block rounded-xl bg-primary px-8 py-3 font-body text-sm font-semibold text-primary-foreground transition hover:bg-primary/80">
                Return Home
              </Link>
            </div>
          )}
        </div>
      </section>

      <DonationCTA
        eyebrow="Make an Immediate Impact"
        headline="Give Today, Change a Life Tomorrow"
        body="While we process your sponsorship inquiry, you can make an immediate impact with a one-time tax-deductible donation."
        buttonLabel="Give Today"
      />

      <EventbriteCTA />

      <footer className="bg-foreground px-4 py-12">
        <div className="mx-auto max-w-4xl text-center">
          <p className="font-body text-xs text-primary-foreground/40">
            © {new Date().getFullYear()} Temple Mother Earth. A 508(c)(1)(A) sacred ceremony church. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Sponsor;
