import { motion, type Easing } from "framer-motion";
import { Sparkles, ArrowRight, CheckCircle2, Shield, Heart, Users, Loader2 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import SEOHead from "@/components/SEOHead";
import PageBreadcrumb from "@/components/PageBreadcrumb";
import EventbriteCTA from "@/components/EventbriteCTA";
import Navigation from "@/components/Navigation";
import sacredSpace from "@/assets/sacred-space.jpg";

const ease: Easing = [0.25, 0.1, 0.25, 1];
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};
const stagger = { visible: { transition: { staggerChildren: 0.12 } } };

const JoinFacilitator = () => {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    fullName: "", email: "", phone: "", location: "",
    background: "", modality: "", experience: "",
    whyJoin: "", additionalInfo: "",
  });

  const update = (field: string, value: string) => setForm((p) => ({ ...p, [field]: value }));
  const inputClass = "w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary";

  return (
    <div className="min-h-screen bg-background">
      <SEOHead title="Become a Facilitator" description="Join our team of sacred facilitators. Share your gifts in ceremony, healing, and community at Temple Mother Earth." path="/join-facilitator" />
      <Navigation />
      <PageBreadcrumb items={[{ label: "Get Involved" }, { label: "Become a Facilitator" }]} />

      <section className="relative flex min-h-[50vh] items-center justify-center overflow-hidden px-4 pt-20">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${sacredSpace})` }} />
        <div className="absolute inset-0 bg-foreground/70" />
        <motion.div className="relative z-10 max-w-3xl text-center" initial="hidden" animate="visible" variants={stagger}>
          <motion.div variants={fadeUp} className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
            <Sparkles className="h-8 w-8 text-primary" />
          </motion.div>
          <motion.h1 variants={fadeUp} className="font-display text-3xl font-bold text-primary-foreground md:text-5xl">
            Join as a Facilitator
          </motion.h1>
          <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-xl text-lg text-primary-foreground/75">
            Share your gifts with the Temple Mother Earth community. We're seeking experienced practitioners
            and healers who are called to serve through Earth Medicine and holistic wellness.
          </motion.p>
        </motion.div>
      </section>

      <section className="px-4 py-16">
        <div className="mx-auto max-w-4xl grid gap-8 md:grid-cols-3">
          {[
            { icon: Shield, title: "Trained & Experienced", desc: "We seek facilitators with established training and experience in Earth Medicine, yoga, sound healing, or related modalities." },
            { icon: Heart, title: "Heart-Centered", desc: "Our facilitators lead from the heart — holding sacred space with compassion, integrity, and a deep commitment to service." },
            { icon: Users, title: "Community-Minded", desc: "You'll join a team dedicated to centering Black and Indigenous voices while welcoming all sovereign beings." },
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
                Facilitator Application
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-center text-sm text-muted-foreground">
                Tell us about your background, training, and what calls you to serve at Temple Mother Earth.
              </p>
              <form className="mt-10 space-y-5" onSubmit={async (e) => {
                e.preventDefault();
                setSubmitting(true);
                try {
                  const { error } = await supabase.functions.invoke("submit-facilitator", { body: form });
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
                <input className={inputClass} type="tel" placeholder="Phone Number *" value={form.phone} onChange={(e) => update("phone", e.target.value)} required />
                <input className={inputClass} placeholder="City / State *" value={form.location} onChange={(e) => update("location", e.target.value)} required />
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">Primary modality / offering *</label>
                  {["Earth Medicine Ceremony Facilitation", "Yoga / Movement", "Sound Healing / Music", "Meditation / Breathwork", "Integration Support / Counseling", "Other"].map((opt) => (
                    <label key={opt} className="mb-2 flex items-center text-sm text-foreground cursor-pointer">
                      <input type="radio" name="modality" className="mr-3 h-4 w-4 accent-primary" checked={form.modality === opt} onChange={() => update("modality", opt)} required />
                      {opt}
                    </label>
                  ))}
                </div>
                <textarea className={inputClass + " min-h-[100px] resize-none"} placeholder="Describe your training, certifications, and experience... *" value={form.experience} onChange={(e) => update("experience", e.target.value)} required />
                <textarea className={inputClass + " min-h-[100px] resize-none"} placeholder="What calls you to serve at Temple Mother Earth? *" value={form.whyJoin} onChange={(e) => update("whyJoin", e.target.value)} required />
                <textarea className={inputClass + " min-h-[60px] resize-none"} placeholder="Anything else you'd like us to know?" value={form.additionalInfo} onChange={(e) => update("additionalInfo", e.target.value)} />
                <button type="submit" disabled={submitting} className="w-full rounded-lg bg-primary px-6 py-3 font-body text-sm font-semibold text-primary-foreground transition hover:bg-primary/80 flex items-center justify-center gap-2 disabled:opacity-50">
                  {submitting ? <><Loader2 className="h-4 w-4 animate-spin" /> Submitting...</> : <>Share Your Calling <ArrowRight className="h-4 w-4" /></>}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-12">
              <CheckCircle2 className="mx-auto h-16 w-16 text-primary" />
              <h3 className="mt-6 font-display text-2xl font-bold text-card-foreground">Thank You, Sacred Guide</h3>
              <p className="mt-4 text-muted-foreground max-w-md mx-auto">
                Your facilitator application has been received. Our team will review your background and reach out to discuss next steps.
              </p>
              <Link to="/" className="mt-8 inline-block rounded-xl bg-primary px-8 py-3 font-body text-sm font-semibold text-primary-foreground transition hover:bg-primary/80">
                Return Home
              </Link>
            </div>
          )}
        </div>
      </section>

      <EventbriteCTA />

      <footer className="bg-foreground px-4 py-12">
        <div className="mx-auto max-w-4xl text-center">
          <p className="font-body text-xs text-primary-foreground/40">
            © {new Date().getFullYear()} Temple Mother Earth. A 501(c)(3) nonprofit organization. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default JoinFacilitator;
