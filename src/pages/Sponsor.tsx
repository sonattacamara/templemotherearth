import { motion, type Easing } from "framer-motion";
import { HandHeart, ArrowRight, CheckCircle2, Shield, Star, Users } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
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
  const [form, setForm] = useState({
    fullName: "", email: "", phone: "", organization: "",
    sponsorType: "", message: "",
  });

  const update = (field: string, value: string) => setForm((p) => ({ ...p, [field]: value }));
  const inputClass = "w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary";

  return (
    <div className="min-h-screen bg-background">
      <SEOHead title="Sponsor" description="Support Temple Mother Earth through sponsorship. Help sustain our 501(c)(3) nonprofit mission of sacred healing and community in Washington, DC." path="/sponsor" />
      <Navigation />

      <section className="relative flex min-h-[50vh] items-center justify-center overflow-hidden px-4 pt-20">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${communityImg})` }} />
        <div className="absolute inset-0 bg-foreground/70" />
        <motion.div className="relative z-10 max-w-3xl text-center" initial="hidden" animate="visible" variants={stagger}>
          <motion.div variants={fadeUp} className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
            <HandHeart className="h-8 w-8 text-primary" />
          </motion.div>
          <motion.h1 variants={fadeUp} className="font-display text-3xl font-bold text-primary-foreground md:text-5xl">
            Become a Sponsor
          </motion.h1>
          <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-xl text-lg text-primary-foreground/75">
            Partner with Temple Mother Earth to sustain sacred healing spaces for our community.
            Your sponsorship directly funds ceremonies, community programs, and access for those who need it most.
          </motion.p>
        </motion.div>
      </section>

      <section className="px-4 py-16">
        <div className="mx-auto max-w-4xl grid gap-8 md:grid-cols-3">
          {[
            { icon: Shield, title: "Ceremony Sponsorship", desc: "Fund ceremonies for community members who may not have the financial means to participate in healing experiences." },
            { icon: Star, title: "Event Sponsorship", desc: "Sponsor community days, immersions, yoga sessions, and other sacred gatherings that bring people together." },
            { icon: Users, title: "Temple Sponsorship", desc: "Support the ongoing maintenance and growth of our DC sanctuary — a sacred space for the entire community." },
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
                Sponsorship Inquiry
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-center text-sm text-muted-foreground">
                Tell us how you'd like to support the Temple. We'll connect with you to discuss partnership opportunities.
              </p>
              <form className="mt-10 space-y-5" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
                <input className={inputClass} placeholder="Full Name *" value={form.fullName} onChange={(e) => update("fullName", e.target.value)} required />
                <input className={inputClass} type="email" placeholder="Email Address *" value={form.email} onChange={(e) => update("email", e.target.value)} required />
                <input className={inputClass} type="tel" placeholder="Phone Number" value={form.phone} onChange={(e) => update("phone", e.target.value)} />
                <input className={inputClass} placeholder="Organization (if applicable)" value={form.organization} onChange={(e) => update("organization", e.target.value)} />
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">Type of sponsorship *</label>
                  {["Ceremony Sponsorship", "Event Sponsorship", "Temple / Facility Sponsorship", "In-Kind Donation (goods/services)", "Not sure — let's discuss"].map((opt) => (
                    <label key={opt} className="mb-2 flex items-center text-sm text-foreground cursor-pointer">
                      <input type="radio" name="sponsorType" className="mr-3 h-4 w-4 accent-primary" checked={form.sponsorType === opt} onChange={() => update("sponsorType", opt)} required />
                      {opt}
                    </label>
                  ))}
                </div>
                <textarea className={inputClass + " min-h-[100px] resize-none"} placeholder="Tell us more about your interest in sponsoring Temple Mother Earth... *" value={form.message} onChange={(e) => update("message", e.target.value)} required />
                <button type="submit" className="w-full rounded-lg bg-primary px-6 py-3 font-body text-sm font-semibold text-primary-foreground transition hover:bg-primary/80 flex items-center justify-center gap-2">
                  Submit Inquiry <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-12">
              <CheckCircle2 className="mx-auto h-16 w-16 text-primary" />
              <h3 className="mt-6 font-display text-2xl font-bold text-card-foreground">Thank You for Your Generosity</h3>
              <p className="mt-4 text-muted-foreground max-w-md mx-auto">
                Your sponsorship inquiry has been received. Our team will be in touch to discuss how we can partner together.
              </p>
              <Link to="/" className="mt-8 inline-block rounded-xl bg-primary px-8 py-3 font-body text-sm font-semibold text-primary-foreground transition hover:bg-primary/80">
                Return Home
              </Link>
            </div>
          )}
        </div>
      </section>

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

export default Sponsor;
