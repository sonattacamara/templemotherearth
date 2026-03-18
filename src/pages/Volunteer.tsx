import { motion, type Easing } from "framer-motion";
import { Heart, Users, Leaf, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import SEOHead from "@/components/SEOHead";
import PageBreadcrumb from "@/components/PageBreadcrumb";
import EventbriteCTA from "@/components/EventbriteCTA";
import Navigation from "@/components/Navigation";
import communityImg from "@/assets/community.jpg";

const ease: Easing = [0.25, 0.1, 0.25, 1];
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};
const stagger = { visible: { transition: { staggerChildren: 0.12 } } };

const Volunteer = () => {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "", availability: "",
    interests: "", experience: "", whyJoin: "",
  });

  const update = (field: string, value: string) => setForm((p) => ({ ...p, [field]: value }));
  const inputClass = "w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary";

  return (
    <div className="min-h-screen bg-background">
      <SEOHead title="Volunteer | Serve Temple Mother Earth Community" description="Join The Forest Team and serve Temple Mother Earth. Land stewardship, event support, and sacred service opportunities in DC." path="/volunteer" />
      <Navigation />
      <PageBreadcrumb items={[{ label: "Get Involved" }, { label: "Volunteer" }]} />

      {/* Hero */}
      <section className="relative flex min-h-[50vh] items-center justify-center overflow-hidden px-4 pt-20">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${communityImg})` }} />
        <div className="absolute inset-0 bg-foreground/70" />
        <motion.div className="relative z-10 max-w-3xl text-center" initial="hidden" animate="visible" variants={stagger}>
          <motion.div variants={fadeUp} className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
            <Heart className="h-8 w-8 text-primary" />
          </motion.div>
          <motion.h1 variants={fadeUp} className="font-display text-3xl font-bold text-primary-foreground md:text-5xl">
            Become a Volunteer
          </motion.h1>
          <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-xl text-lg text-primary-foreground/75">
            Temple Mother Earth thrives because of the love and dedication of our volunteers.
            Join us in nurturing this sacred space and serving our community.
          </motion.p>
        </motion.div>
      </section>

      {/* Info */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-4xl grid gap-8 md:grid-cols-3">
          {[
            { icon: Leaf, title: "Sacred Grounds", desc: "Help maintain our temple grounds, garden, and sacred spaces — tending to the Earth that sustains us." },
            { icon: Users, title: "Community Events", desc: "Support our ceremonies, potlucks, yoga sessions, and community days with setup, greeting, and coordination." },
            { icon: Heart, title: "Outreach & Growth", desc: "Help spread the word, welcome newcomers, and build bridges with the broader DC community." },
          ].map((item) => (
            <div key={item.title} className="rounded-xl border border-border bg-card p-6 text-center">
              <item.icon className="mx-auto h-8 w-8 text-primary" />
              <h3 className="mt-3 font-display text-lg font-semibold text-foreground">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sacred Energy Exchange */}
      <section className="bg-card px-4 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            <Leaf className="h-7 w-7 text-primary" />
          </div>
          <h2 className="font-display text-2xl font-bold text-card-foreground md:text-3xl">
            Sacred Energy Exchange
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            At Temple Mother Earth, we believe that everyone deserves access to sacred ceremony, regardless of financial means.
            We practice <strong className="text-foreground">Sacred Energy Exchange</strong>, a reciprocal model where volunteers
            contribute their time, energy, and skills to sustain the Temple, and in return, earn credits toward
            sacred ceremony participation.
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Whether it's tending the grounds, supporting events, preparing meals, or lending your professional skills —
            your energy is valued and honored. By exchanging energy in service to the community, you open the door to
            your own sacred path. No one is turned away.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { title: "Serve", desc: "Volunteer your time and energy in areas that align with your gifts." },
              { title: "Receive Blessings", desc: "Your sacred service is honored and reciprocated through ceremony access." },
              { title: "Heal", desc: "Use your credits to participate in sacred ceremonies and immersions." },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-border bg-background p-5">
                <h3 className="font-display text-base font-semibold text-foreground">{item.title}</h3>
                <p className="mt-1.5 text-xs text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="bg-card px-4 py-16">
        <div className="mx-auto max-w-2xl">
          {!submitted ? (
            <>
              <h2 className="text-center font-display text-2xl font-bold text-card-foreground md:text-3xl">
                Volunteer Application
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-center text-sm text-muted-foreground">
                Tell us about yourself and how you'd like to serve. We welcome all skill levels and backgrounds.
              </p>
              <form className="mt-10 space-y-5" onSubmit={async (e) => {
                e.preventDefault();
                setSubmitting(true);
                try {
                  const { error } = await supabase.functions.invoke("submit-volunteer", { body: form });
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
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">Areas of interest *</label>
                  {["Grounds & Garden Maintenance", "Event Setup & Coordination", "Community Outreach", "Kitchen & Meals", "Photography / Videography", "Administrative Support", "I'm open to anything!"].map((opt) => (
                    <label key={opt} className="mb-2 flex items-center text-sm text-foreground cursor-pointer">
                      <input type="radio" name="interests" className="mr-3 h-4 w-4 accent-primary" checked={form.interests === opt} onChange={() => update("interests", opt)} required />
                      {opt}
                    </label>
                  ))}
                </div>
                <input className={inputClass} placeholder="Availability (e.g., weekends, evenings, flexible)" value={form.availability} onChange={(e) => update("availability", e.target.value)} />
                <textarea className={inputClass + " min-h-[80px] resize-none"} placeholder="Any relevant experience or skills?" value={form.experience} onChange={(e) => update("experience", e.target.value)} />
                <textarea className={inputClass + " min-h-[100px] resize-none"} placeholder="Why do you want to volunteer with Temple Mother Earth? *" value={form.whyJoin} onChange={(e) => update("whyJoin", e.target.value)} required />
                <button type="submit" disabled={submitting} className="w-full rounded-lg bg-primary px-6 py-3 font-body text-sm font-semibold text-primary-foreground transition hover:bg-primary/80 flex items-center justify-center gap-2 disabled:opacity-50">
                  {submitting ? <><Loader2 className="h-4 w-4 animate-spin" /> Submitting...</> : <>Offer Your Service <ArrowRight className="h-4 w-4" /></>}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-12">
              <CheckCircle2 className="mx-auto h-16 w-16 text-primary" />
              <h3 className="mt-6 font-display text-2xl font-bold text-card-foreground">Thank You, Sacred Servant</h3>
              <p className="mt-4 text-muted-foreground max-w-md mx-auto">
                Your volunteer application has been received. We'll be in touch soon to discuss how you can serve alongside us.
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
            © {new Date().getFullYear()} Temple Mother Earth. A 508(c)(1)(A) sacred ceremony church. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Volunteer;
