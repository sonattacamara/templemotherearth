import { motion, type Easing } from "framer-motion";
import { Shield, AlertTriangle, Leaf, Heart, Sun, Droplets, Apple, Moon } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import EventbriteCTA from "@/components/EventbriteCTA";
import Navigation from "@/components/Navigation";
import ceremonyImg from "@/assets/offering-ceremony.jpg";

const ease: Easing = [0.25, 0.1, 0.25, 1];
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};
const stagger = { visible: { transition: { staggerChildren: 0.12 } } };

const Preparation = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead title="Ceremony Preparation" description="Prepare for your Earth Medicine ceremony at Temple Mother Earth. Diet, fasting, hydration, and mental preparation guidelines." path="/preparation" />
      <Navigation />

      {/* Hero */}
      <section className="relative flex min-h-[50vh] items-center justify-center overflow-hidden px-4 pt-20">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${ceremonyImg})` }} />
        <div className="absolute inset-0 bg-foreground/70" />
        <motion.div className="relative z-10 max-w-3xl text-center" initial="hidden" animate="visible" variants={stagger}>
          <motion.div variants={fadeUp} className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
            <Leaf className="h-8 w-8 text-primary" />
          </motion.div>
          <motion.h1 variants={fadeUp} className="font-display text-3xl font-bold text-primary-foreground md:text-5xl">
            Ceremony Preparation
          </motion.h1>
          <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-xl text-lg text-primary-foreground/75">
            Preparing your body, mind, and spirit is an essential part of honoring the sacred ceremony experience.
            Please review these guidelines carefully before your ceremony date.
          </motion.p>
        </motion.div>
      </section>

      {/* General Guidelines */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-3xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="font-display text-2xl font-bold text-foreground md:text-3xl text-center">
              General Preparation Guidelines
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-4 text-center text-muted-foreground">
              These guidelines apply to most Earth Medicine ceremonies. Your facilitator may provide additional specific instructions.
            </motion.p>

            <div className="mt-12 space-y-8">
              {[
                {
                  icon: Apple,
                  title: "Diet — 3+ Days Before Ceremony",
                  items: [
                    "Avoid processed foods, fried foods, and heavy red meats",
                    "Reduce or eliminate sugar, caffeine, and alcohol",
                    "Eat clean: fresh fruits, vegetables, whole grains, and light proteins",
                    "Stay well-hydrated with water and herbal teas",
                    "Avoid pork for at least 3 days prior",
                  ],
                },
                {
                  icon: Moon,
                  title: "Day Before Ceremony",
                  items: [
                    "Eat a light dinner — nothing heavy after 6 PM",
                    "No alcohol or recreational substances",
                    "Spend time in quiet reflection or meditation",
                    "Set your intentions for the ceremony",
                    "Get adequate rest — aim for a full night's sleep",
                  ],
                },
                {
                  icon: Sun,
                  title: "Day of Ceremony",
                  items: [
                    "Fast from food (water is okay) unless otherwise instructed",
                    "Wear comfortable, loose-fitting clothing (white or light colors preferred)",
                    "Bring a blanket, pillow, and any personal sacred items",
                    "Arrive on time — late arrivals may not be admitted",
                    "Leave expectations at the door and trust the process",
                  ],
                },
                {
                  icon: Droplets,
                  title: "Kambo-Specific Preparation",
                  items: [
                    "Drink 1-2 liters of water upon waking, before arriving",
                    "Do NOT eat for at least 10-12 hours before ceremony",
                    "Avoid blood thinners and NSAIDs for 48 hours prior",
                    "Wear shorts or clothing that exposes the arm or leg for burns",
                    "Your facilitator will review your medical intake form before proceeding",
                  ],
                },
                {
                  icon: Heart,
                  title: "After Ceremony — Integration",
                  items: [
                    "Rest and allow your body to process the experience",
                    "Journal your experience while it's fresh",
                    "Maintain a clean diet for at least 24-48 hours after",
                    "Attend integration circles (Mondays at 7 PM) to process with community",
                    "Reach out to your facilitator if you need support",
                  ],
                },
              ].map((section) => (
                <motion.div key={section.title} variants={fadeUp} className="rounded-2xl border border-border bg-card p-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <section.icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-display text-lg font-semibold text-foreground">{section.title}</h3>
                  </div>
                  <ul className="mt-4 space-y-2 pl-13">
                    {section.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Important Notice */}
      <section className="bg-card px-4 py-16">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-8">
            <div className="flex items-start gap-4">
              <AlertTriangle className="mt-1 h-6 w-6 shrink-0 text-primary" />
              <div>
                <h3 className="font-display text-lg font-semibold text-foreground">Important Medical Notice</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  All participants must complete a <Link to="/ceremony-intake" className="text-primary hover:underline font-semibold">Sacred Intake Form</Link> before
                  attending any Earth Medicine ceremony. This comprehensive medical screening ensures your safety and allows our
                  facilitators to prepare the appropriate sacred container for your experience.
                </p>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  Certain medications — including SSRIs, MAOIs, blood pressure medications, and others — may be contraindicated
                  with specific Earth Medicines. Please be fully transparent in your intake form. Your safety is our highest priority.
                </p>
                <div className="mt-6 flex flex-wrap gap-4">
                  <Link to="/ceremony-intake" className="rounded-lg bg-primary px-6 py-3 font-body text-sm font-semibold text-primary-foreground transition hover:bg-primary/80">
                    Complete Sacred Intake
                  </Link>
                  <Link to="/conduct" className="rounded-lg border border-border px-6 py-3 font-body text-sm font-semibold text-foreground transition hover:bg-accent">
                    Review Code of Conduct
                  </Link>
                </div>
              </div>
            </div>
          </div>
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

export default Preparation;
