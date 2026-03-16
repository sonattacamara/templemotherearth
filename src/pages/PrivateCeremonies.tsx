import { useState } from "react";
import { motion, type Easing } from "framer-motion";
import { Heart, ArrowRight, CheckCircle2, Shield, Sparkles, Users, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import SEOHead from "@/components/SEOHead";
import PageBreadcrumb from "@/components/PageBreadcrumb";
import EventbriteCTA from "@/components/EventbriteCTA";
import Navigation from "@/components/Navigation";
import offeringPrivate from "@/assets/offering-private.jpg";

const ease: Easing = [0.25, 0.1, 0.25, 1];
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};
const stagger = { visible: { transition: { staggerChildren: 0.12 } } };

const PrivateCeremonies = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    fullName: "", email: "", phone: "", ceremonyType: "",
    experience: "", intentions: "", preferredDates: "",
    location: "", medicalConcerns: "", additionalInfo: "",
  });

  const update = (field: string, value: string) => setForm((p) => ({ ...p, [field]: value }));
  const inputClass = "w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary";

  return (
    <div className="min-h-screen bg-background">
      <SEOHead title="Private Ceremonies | 1-on-1 Healing Sessions" description="Experience personalized private plant medicine ceremonies tailored to your intentions and healing journey. One-on-one sacred sessions." path="/private-ceremonies" />
      <Navigation />
      <PageBreadcrumb items={[{ label: "Experiences" }, { label: "Private Ceremonies" }]} />

      {/* Hero */}
      <section className="relative flex min-h-[50vh] items-center justify-center overflow-hidden px-4 pt-20">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${offeringPrivate})` }} />
        <div className="absolute inset-0 bg-foreground/70" />
        <motion.div className="relative z-10 max-w-3xl text-center" initial="hidden" animate="visible" variants={stagger}>
          <motion.div variants={fadeUp} className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
            <Heart className="h-8 w-8 text-primary" />
          </motion.div>
          <motion.h1 variants={fadeUp} className="font-display text-3xl font-bold text-primary-foreground md:text-5xl">
            1-on-1 / Private Ceremonies
          </motion.h1>
          <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-xl text-lg text-primary-foreground/75">
            Personalized, intimate Earth Medicine sessions tailored specifically to your individual healing journey,
            held in a private and sacred setting with one of our experienced facilitators.
          </motion.p>
        </motion.div>
      </section>

      {/* Info */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-4xl grid gap-8 md:grid-cols-3">
          {[
            { icon: Shield, title: "Undivided Attention", desc: "Your facilitator's complete focus is on you — your needs, your pace, your journey. No group dynamics to navigate." },
            { icon: Sparkles, title: "Deeply Personalized", desc: "Every element of the ceremony is tailored to your specific intentions, healing goals, and spiritual path." },
            { icon: Users, title: "Flexible Setting", desc: "Private ceremonies can be held at our DC sanctuary or at your preferred location. We create the sacred container wherever you need it." },
          ].map((item) => (
            <div key={item.title} className="rounded-xl border border-border bg-card p-6 text-center">
              <item.icon className="mx-auto h-8 w-8 text-primary" />
              <h3 className="mt-3 font-display text-lg font-semibold text-foreground">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Form */}
      <section className="bg-card px-4 py-16">
        <div className="mx-auto max-w-2xl">
          {!submitted ? (
            <>
              <h2 className="text-center font-display text-2xl font-bold text-card-foreground md:text-3xl">
                Request a Private Ceremony
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-center text-sm text-muted-foreground">
                Share your needs and our team will connect you with the right facilitator.
                You will also need to complete a full medical intake before your ceremony date.
              </p>
              <form className="mt-10 space-y-5" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
                <input className={inputClass} placeholder="Full Name *" value={form.fullName} onChange={(e) => update("fullName", e.target.value)} required />
                <input className={inputClass} type="email" placeholder="Email Address *" value={form.email} onChange={(e) => update("email", e.target.value)} required />
                <input className={inputClass} type="tel" placeholder="Phone Number *" value={form.phone} onChange={(e) => update("phone", e.target.value)} required />
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">What type of ceremony are you seeking? *</label>
                  {["Kambo Purification Ceremony", "Hapé Session", "Sacred Mother Earth Ceremony", "Not sure — I'd like guidance from a facilitator"].map((opt) => (
                    <label key={opt} className="mb-2 flex items-center text-sm text-foreground cursor-pointer">
                      <input type="radio" name="ceremonyType" className="mr-3 h-4 w-4 accent-primary" checked={form.ceremonyType === opt} onChange={() => update("ceremonyType", opt)} required />
                      {opt}
                    </label>
                  ))}
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">Earth Medicine experience level</label>
                  {["First time — I'm new to Earth Medicine", "Some experience (1-3 ceremonies)", "Experienced practitioner"].map((opt) => (
                    <label key={opt} className="mb-2 flex items-center text-sm text-foreground cursor-pointer">
                      <input type="radio" name="experience" className="mr-3 h-4 w-4 accent-primary" checked={form.experience === opt} onChange={() => update("experience", opt)} />
                      {opt}
                    </label>
                  ))}
                </div>
                <textarea className={inputClass + " min-h-[100px] resize-none"} placeholder="What are you seeking from this private ceremony? Share your intentions and what brought you to Earth Medicine... *" value={form.intentions} onChange={(e) => update("intentions", e.target.value)} required />
                <input className={inputClass} placeholder="Preferred dates or timeframe" value={form.preferredDates} onChange={(e) => update("preferredDates", e.target.value)} />
                <input className={inputClass} placeholder="Preferred location (DC sanctuary or your location)" value={form.location} onChange={(e) => update("location", e.target.value)} />
                <textarea className={inputClass + " min-h-[80px] resize-none"} placeholder="Any medical concerns, conditions, or medications we should know about?" value={form.medicalConcerns} onChange={(e) => update("medicalConcerns", e.target.value)} />
                <textarea className={inputClass + " min-h-[60px] resize-none"} placeholder="Anything else you'd like us to know?" value={form.additionalInfo} onChange={(e) => update("additionalInfo", e.target.value)} />
                <button type="submit" className="w-full rounded-lg bg-primary px-6 py-3 font-body text-sm font-semibold text-primary-foreground transition hover:bg-primary/80 flex items-center justify-center gap-2">
                  Send With Intention <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-12">
              <CheckCircle2 className="mx-auto h-16 w-16 text-primary" />
              <h3 className="mt-6 font-display text-2xl font-bold text-card-foreground">Thank You, Sacred One</h3>
              <p className="mt-4 text-muted-foreground max-w-md mx-auto">
                Your private ceremony request has been received. A facilitator will reach out to discuss your journey, answer questions, and schedule your ceremony.
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

export default PrivateCeremonies;
