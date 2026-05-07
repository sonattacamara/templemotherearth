import { motion, type Easing } from "framer-motion";
import { GraduationCap, ArrowRight, CheckCircle2, Loader2, Heart, Leaf, HandHeart } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import SEOHead from "@/components/SEOHead";
import PageBreadcrumb from "@/components/PageBreadcrumb";
import Navigation from "@/components/Navigation";
import scholarshipImg from "@/assets/community-prayer-lawn.jpg";

const ease: Easing = [0.25, 0.1, 0.25, 1];
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};
const stagger = { visible: { transition: { staggerChildren: 0.12 } } };

const SERVICE_OPTIONS = [
  { tag: "greeter", label: "Greeter · Welcome guests" },
  { tag: "events", label: "Events Team · Setup & flow" },
  { tag: "social-media", label: "Social Media · Posts & stories" },
  { tag: "graphic-design", label: "Graphic Design · Flyers" },
  { tag: "outreach", label: "Community Outreach" },
  { tag: "land-steward", label: "Land Steward · Garden & grounds" },
  { tag: "build-team", label: "Build Team · Repairs" },
  { tag: "kitchen", label: "Kitchen · Meal preparation" },
];

const Scholarship = () => {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    ceremony: "", availability: "", interests: [] as string[],
    hardship: "", commit: false,
  });

  const update = (field: string, value: string | boolean) => setForm((p) => ({ ...p, [field]: value }));
  const toggleInterest = (tag: string) => setForm((p) => ({
    ...p,
    interests: p.interests.includes(tag) ? p.interests.filter((r) => r !== tag) : [...p.interests, tag],
  }));

  const inputClass = "w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary";

  return (
    <div className="min-h-screen bg-background">
      <SEOHead title="Scholarship Seat | Sacred Reciprocity Through Service" description="Cannot afford full reciprocity? Earn your seat at the Temple through energy exchange. Apply for a scholarship seat at Temple Mother Earth." path="/scholarship" />
      <Navigation />
      <PageBreadcrumb items={[{ label: "Get Involved" }, { label: "Scholarship" }]} />

      {/* Hero */}
      <section className="relative flex min-h-[55vh] items-center justify-center overflow-hidden px-4 pt-20">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${scholarshipImg})` }} />
        <div className="absolute inset-0 bg-foreground/75" />
        <motion.div className="relative z-10 max-w-3xl text-center" initial="hidden" animate="visible" variants={stagger}>
          <motion.div variants={fadeUp} className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
            <GraduationCap className="h-8 w-8 text-primary" />
          </motion.div>
          <motion.p variants={fadeUp} className="font-body text-xs uppercase tracking-[0.3em] text-primary mb-3">Sacred Reciprocity Scholarship</motion.p>
          <motion.h1 variants={fadeUp} className="font-display text-3xl font-bold text-primary-foreground md:text-5xl">
            Earn Your Seat Through Service
          </motion.h1>
          <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-xl text-lg text-primary-foreground/80">
            No called soul is turned away. If you cannot offer full reciprocity, you can offer your hands, your time, your presence in service of the circle.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8">
            <a href="#apply" className="inline-block rounded-xl bg-primary px-7 py-3 font-body text-sm font-semibold text-primary-foreground transition hover:bg-primary/80">
              Apply for a Scholarship Seat
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* How it works */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <p className="font-body text-xs uppercase tracking-[0.3em] text-primary mb-3">How It Works</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">Three Simple Steps</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { n: "1", title: "Apply", desc: "Tell us which ceremony you feel called to and how you can serve." },
              { n: "2", title: "Serve", desc: "Commit to energy exchange at the Temple. Setup, kitchen, grounds, or whatever your gifts allow." },
              { n: "3", title: "Receive", desc: "Your seat is held. You arrive in dignity, knowing you have already given." },
            ].map((s) => (
              <div key={s.n} className="rounded-xl border border-border bg-card p-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-display text-lg font-bold">{s.n}</div>
                <h3 className="font-display text-lg font-semibold text-card-foreground">{s.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-muted-foreground italic">
            Two scholarship seats are held in every ceremony. Funded by our 508(c)(1)(A) scholarship fund and by those who give beyond their own seat.
          </p>
        </div>
      </section>

      {/* Form */}
      <section id="apply" className="bg-card px-4 py-16 scroll-mt-20">
        <div className="mx-auto max-w-2xl">
          {!submitted ? (
            <>
              <h2 className="text-center font-display text-2xl font-bold text-card-foreground md:text-3xl">
                Scholarship Application
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-center text-sm text-muted-foreground">
                Share where you are and how you can serve. Every application is read with reverence.
              </p>
              <form className="mt-10 space-y-5" onSubmit={async (e) => {
                e.preventDefault();
                if (!form.commit) {
                  toast.error("Please confirm your commitment to energy exchange.");
                  return;
                }
                if (form.interests.length === 0) {
                  toast.error("Please select at least one way you can serve.");
                  return;
                }
                setSubmitting(true);
                try {
                  const roleTags = form.interests.map((t) => `volunteer-${t}`);
                  const { error } = await supabase.functions.invoke("submit-volunteer", {
                    body: {
                      firstName: form.firstName,
                      lastName: form.lastName,
                      email: form.email,
                      phone: form.phone,
                      interests: form.interests.join(" · "),
                      availability: form.availability,
                      experience: form.ceremony,
                      whyJoin: form.hardship,
                      roleTags,
                      source: "scholarship-page",
                    },
                  });
                  if (error) throw error;
                  setSubmitted(true);
                } catch (err) {
                  console.error(err);
                  toast.error("Something went wrong. Please try again.");
                } finally {
                  setSubmitting(false);
                }
              }}>
                <div className="grid grid-cols-2 gap-3">
                  <input className={inputClass} placeholder="First Name *" value={form.firstName} onChange={(e) => update("firstName", e.target.value)} required />
                  <input className={inputClass} placeholder="Last Name *" value={form.lastName} onChange={(e) => update("lastName", e.target.value)} required />
                </div>
                <input className={inputClass} type="email" placeholder="Email Address *" value={form.email} onChange={(e) => update("email", e.target.value)} required />
                <input className={inputClass} type="tel" placeholder="Phone Number" value={form.phone} onChange={(e) => update("phone", e.target.value)} />
                <input className={inputClass} placeholder="Which ceremony are you called to? (e.g. Kambo, Sacred Tea, Sacred Series)" value={form.ceremony} onChange={(e) => update("ceremony", e.target.value)} />
                <div>
                  <label className="mb-3 block text-sm font-medium text-foreground">How can you serve in exchange? · select one or more *</label>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {SERVICE_OPTIONS.map((opt) => (
                      <label key={opt.tag} className="flex items-center text-sm text-foreground cursor-pointer rounded-lg border border-input bg-background px-3 py-2 hover:border-primary/50 transition">
                        <input type="checkbox" className="mr-3 h-4 w-4 accent-primary" checked={form.interests.includes(opt.tag)} onChange={() => toggleInterest(opt.tag)} />
                        {opt.label}
                      </label>
                    ))}
                  </div>
                </div>
                <input className={inputClass} placeholder="Availability (e.g. weekends, evenings, flexible)" value={form.availability} onChange={(e) => update("availability", e.target.value)} />
                <textarea className={inputClass + " min-h-[100px] resize-none"} placeholder="Briefly share your situation and why a scholarship seat would matter for you. *" value={form.hardship} onChange={(e) => update("hardship", e.target.value)} required />
                <label className="flex items-start gap-3 rounded-lg border border-input bg-background p-4 cursor-pointer">
                  <input type="checkbox" className="mt-1 h-4 w-4 accent-primary" checked={form.commit} onChange={(e) => update("commit", e.target.checked)} />
                  <span className="text-sm text-foreground">
                    I commit to energy exchange at the Temple in honor of the seat I am receiving. *
                  </span>
                </label>
                <button type="submit" disabled={submitting} className="w-full rounded-lg bg-primary px-6 py-3 font-body text-sm font-semibold text-primary-foreground transition hover:bg-primary/80 flex items-center justify-center gap-2 disabled:opacity-50">
                  {submitting ? <><Loader2 className="h-4 w-4 animate-spin" /> Submitting...</> : <>Submit Scholarship Application <ArrowRight className="h-4 w-4" /></>}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-12">
              <CheckCircle2 className="mx-auto h-16 w-16 text-primary" />
              <h3 className="mt-6 font-display text-2xl font-bold text-card-foreground">Application Received</h3>
              <p className="mt-4 text-muted-foreground max-w-md mx-auto">
                Thank you for trusting us with your story. We will review your application and reach out to walk you through the next step.
              </p>
              <Link to="/" className="mt-8 inline-block rounded-xl bg-primary px-8 py-3 font-body text-sm font-semibold text-primary-foreground transition hover:bg-primary/80">
                Return Home
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Continue Your Journey */}
      <section className="bg-background px-4 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <p className="font-body text-xs uppercase tracking-[0.3em] text-primary mb-3">Continue Your Journey</p>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8">Other Sacred Pathways</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <Link to="/volunteer" className="rounded-xl border border-border bg-card p-6 hover:border-primary/50 transition text-left group">
              <HandHeart className="h-6 w-6 text-primary mb-3" />
              <h3 className="font-display text-base font-semibold text-card-foreground group-hover:text-primary transition">Volunteer</h3>
              <p className="mt-2 text-xs text-muted-foreground">Serve the Temple in one of seven sacred roles.</p>
            </Link>
            <Link to="/community-care" className="rounded-xl border border-border bg-card p-6 hover:border-primary/50 transition text-left group">
              <Leaf className="h-6 w-6 text-primary mb-3" />
              <h3 className="font-display text-base font-semibold text-card-foreground group-hover:text-primary transition">Community Care Model</h3>
              <p className="mt-2 text-xs text-muted-foreground">Understand the sacred reciprocity tiers.</p>
            </Link>
            <Link to="/donate" className="rounded-xl border border-border bg-card p-6 hover:border-primary/50 transition text-left group">
              <Heart className="h-6 w-6 text-primary mb-3" />
              <h3 className="font-display text-base font-semibold text-card-foreground group-hover:text-primary transition">Fund a Scholarship</h3>
              <p className="mt-2 text-xs text-muted-foreground">Hold the door open for the next soul.</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Scholarship;