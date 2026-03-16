import { useState } from "react";
import { motion, type Easing } from "framer-motion";
import { Users, ArrowRight, CheckCircle2, MapPin, Shield, Heart, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import SEOHead from "@/components/SEOHead";
import PageBreadcrumb from "@/components/PageBreadcrumb";
import EventbriteCTA from "@/components/EventbriteCTA";
import Navigation from "@/components/Navigation";
import offeringTraveling from "@/assets/offering-traveling.jpg";

const ease: Easing = [0.25, 0.1, 0.25, 1];
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};
const stagger = { visible: { transition: { staggerChildren: 0.12 } } };

const TravelingCeremonies = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    fullName: "", email: "", phone: "", location: "",
    ceremonyType: "", groupSize: "", preferredDates: "",
    venue: "", intentions: "", additionalInfo: "",
  });

  const update = (field: string, value: string) => setForm((p) => ({ ...p, [field]: value }));
  const inputClass = "w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary";

  return (
    <div className="min-h-screen bg-background">
      <SEOHead title="Traveling Ceremonies | Bring Temple Mother Earth to You" description="Host a sacred ceremony in your community. Temple Mother Earth brings Kambo, cacao, and healing experiences to your location." path="/traveling-ceremonies" />
      <Navigation />
      <PageBreadcrumb items={[{ label: "Experiences" }, { label: "Traveling Ceremonies" }]} />

      {/* Hero */}
      <section className="relative flex min-h-[50vh] items-center justify-center overflow-hidden px-4 pt-20">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${offeringTraveling})` }} />
        <div className="absolute inset-0 bg-foreground/70" />
        <motion.div className="relative z-10 max-w-3xl text-center" initial="hidden" animate="visible" variants={stagger}>
          <motion.div variants={fadeUp} className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
            <Users className="h-8 w-8 text-primary" />
          </motion.div>
          <motion.h1 variants={fadeUp} className="font-display text-3xl font-bold text-primary-foreground md:text-5xl">
            Traveling Ceremonies
          </motion.h1>
          <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-xl text-lg text-primary-foreground/75">
            We come to you. Invite Temple Mother Earth to bring the sacred into your community
            with personalized Earth Medicine ceremonies tailored to your group's unique needs and intentions.
          </motion.p>
        </motion.div>
      </section>

      {/* Info */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-4xl grid gap-8 md:grid-cols-3">
          {[
            { icon: MapPin, title: "We Travel to You", desc: "Whether it's your home, immersion center, or community space — we bring the sacred container to your location anywhere in the US and beyond." },
            { icon: Shield, title: "Full Facilitation", desc: "Our experienced facilitators handle everything — from altar setup and sacred space preparation to ceremony facilitation and post-ceremony integration." },
            { icon: Heart, title: "Custom Ceremonies", desc: "Each traveling ceremony is designed around your group's intentions, experience level, and spiritual goals. No two ceremonies are alike." },
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
                Request a Traveling Ceremony
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-center text-sm text-muted-foreground">
                Tell us about your group and what you're seeking. Our team will reach out to discuss details, pricing, and logistics.
                All participants will need to complete a medical intake before ceremony.
              </p>
              <form className="mt-10 space-y-5" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
                <input className={inputClass} placeholder="Full Name *" value={form.fullName} onChange={(e) => update("fullName", e.target.value)} required />
                <input className={inputClass} type="email" placeholder="Email Address *" value={form.email} onChange={(e) => update("email", e.target.value)} required />
                <input className={inputClass} type="tel" placeholder="Phone Number *" value={form.phone} onChange={(e) => update("phone", e.target.value)} required />
                <input className={inputClass} placeholder="City / State / Location *" value={form.location} onChange={(e) => update("location", e.target.value)} required />
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">What type of ceremony are you seeking? *</label>
                  {["Kambo Purification Ceremony", "Hapé Circle", "Sacred Mother Earth Ceremony", "Multiple ceremonies (weekend format)", "Not sure — I'd like guidance"].map((opt) => (
                    <label key={opt} className="mb-2 flex items-center text-sm text-foreground cursor-pointer">
                      <input type="radio" name="ceremonyType" className="mr-3 h-4 w-4 accent-primary" checked={form.ceremonyType === opt} onChange={() => update("ceremonyType", opt)} required />
                      {opt}
                    </label>
                  ))}
                </div>
                <input className={inputClass} placeholder="Estimated group size *" value={form.groupSize} onChange={(e) => update("groupSize", e.target.value)} required />
                <input className={inputClass} placeholder="Preferred dates or timeframe" value={form.preferredDates} onChange={(e) => update("preferredDates", e.target.value)} />
                <input className={inputClass} placeholder="Do you have a venue/space available?" value={form.venue} onChange={(e) => update("venue", e.target.value)} />
                <textarea className={inputClass + " min-h-[100px] resize-none"} placeholder="What are your group's intentions? What are you collectively seeking?" value={form.intentions} onChange={(e) => update("intentions", e.target.value)} required />
                <textarea className={inputClass + " min-h-[80px] resize-none"} placeholder="Any additional information or questions?" value={form.additionalInfo} onChange={(e) => update("additionalInfo", e.target.value)} />
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
                Your traveling ceremony request has been received. Our team will be in touch to discuss logistics, pricing, and next steps.
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

export default TravelingCeremonies;
