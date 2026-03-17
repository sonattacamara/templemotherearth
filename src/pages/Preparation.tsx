import { motion, type Easing } from "framer-motion";
import { Shield, AlertTriangle, Leaf, Heart, Sun, Droplets, Apple, Moon } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import PageBreadcrumb from "@/components/PageBreadcrumb";
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
      <SEOHead title="Ceremony Preparation Guide" description="How to prepare for your sacred ceremony. Diet, intentions, and guidelines for Kambo, ayahuasca, and Earth Medicine experiences." path="/preparation" />
      <Navigation />
      <PageBreadcrumb items={[{ label: "Preparation Guide" }]} />

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
                  title: "Diet — 7 Days Before Ceremony",
                  items: [
                    "Begin transitioning to a clean, whole-foods diet rich in fresh fruits, vegetables, and whole grains",
                    "Eliminate processed foods, fast food, and anything with artificial additives or preservatives",
                    "Avoid fried foods, heavy red meats, and pork entirely",
                    "Reduce or eliminate sugar, caffeine, alcohol, and carbonated beverages",
                    "Choose light proteins such as fish, chicken, or plant-based sources",
                    "Stay well-hydrated with water, coconut water, and herbal teas (chamomile, ginger, peppermint)",
                    "Avoid dairy products and overly spicy foods, which can burden digestion",
                    "Minimize salt intake and avoid fermented foods (soy sauce, kimchi, sauerkraut)",
                    "Consider eliminating sexual activity for 3–7 days prior to preserve and focus your energy",
                  ],
                },
                {
                  icon: Moon,
                  title: "3 Days Before Ceremony",
                  items: [
                    "Simplify your meals further — soups, steamed vegetables, fruits, rice, and light broths are ideal",
                    "Completely stop all alcohol, cannabis, and recreational substances",
                    "Begin limiting screen time, especially social media and news, to quiet the nervous system",
                    "Start a journaling practice — write about your intentions, fears, and what you wish to release",
                    "Spend time in nature: walk barefoot on the earth, sit beneath trees, or be near water",
                    "Begin reducing social obligations and overstimulation — create space for inner stillness",
                    "Drink at least 2–3 liters of water daily to support your body's natural cleansing process",
                    "Avoid arguments, confrontation, and high-stress situations as much as possible",
                  ],
                },
                {
                  icon: Sun,
                  title: "Day Before Ceremony",
                  items: [
                    "Eat a light, clean dinner — nothing heavy after 5–6 PM",
                    "No alcohol, cannabis, or any recreational substances",
                    "Spend dedicated time in quiet reflection, prayer, or meditation",
                    "Write down your ceremony intentions clearly — what do you seek? What are you ready to release?",
                    "Take a cleansing bath or shower with intention — some add sea salt or Florida water for spiritual cleansing",
                    "Get adequate, quality rest — aim for a full night's sleep in a calm environment",
                    "Prepare your ceremony items the night before: comfortable clothing, blanket, pillow, water bottle, journal, and any personal sacred items",
                    "Limit phone use and digital consumption — begin entering a contemplative, sacred mindset",
                  ],
                },
                {
                  icon: Leaf,
                  title: "Day of Ceremony",
                  items: [
                    "Fast from food beginning the night before (water and herbal tea are okay unless otherwise instructed)",
                    "Wear comfortable, loose-fitting clothing — white or light-colored garments are preferred",
                    "Bring your blanket, pillow, journal, pen, water bottle, and any personal sacred items (crystals, photos, prayer beads)",
                    "Arrive on time or early — late arrivals may not be admitted once the sacred container is opened",
                    "Silence your phone completely and leave it in your vehicle or designated area",
                    "Leave expectations at the door and trust the process — surrender is the gateway",
                    "Approach the space with reverence, gratitude, and respect for the facilitators and your fellow participants",
                    "Be prepared for emotional releases, crying, shaking, and deep breathing are natural parts of the ceremonial process",
                  ],
                },
                {
                  icon: Droplets,
                  title: "Kambo-Specific Preparation",
                  items: [
                    "Drink 1.5–2 liters of water upon waking the morning of ceremony, before arriving",
                    "Do NOT eat for at least 10–12 hours before your Kambo session",
                    "Avoid blood thinners, NSAIDs (ibuprofen, aspirin), and anti-inflammatory medications for 48+ hours prior",
                    "Wear shorts or clothing that exposes the arm or leg for the application of burns",
                    "Bring a towel, as purging is a central part of the Kambo experience",
                    "Inform your facilitator of ALL medications, supplements, and health conditions during your intake review",
                    "Avoid heavy exercise or strenuous activity the day of — conserve your energy for ceremony",
                    "Your facilitator will review your medical intake form and assess readiness before proceeding",
                  ],
                },
                {
                  icon: Heart,
                  title: "After Ceremony — Integration",
                  items: [
                    "Rest deeply — your body, mind, and spirit need time to process the experience",
                    "Journal your experience while it's fresh: visions, emotions, messages, and physical sensations",
                    "Maintain a clean, gentle diet for at least 48–72 hours after ceremony",
                    "Drink plenty of water and nourishing fluids to support your body's continued cleansing",
                    "Avoid alcohol, cannabis, and recreational substances for a minimum of 3 days post-ceremony",
                    "Limit social media and overstimulation — protect your energetic field as it recalibrates",
                    "Attend integration circles (Mondays at 7 PM) to process your experience with community support",
                    "Be patient and compassionate with yourself — integration unfolds over days, weeks, and even months",
                    "Reach out to your facilitator if you need additional support — you are never alone in this journey",
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
            © {new Date().getFullYear()} Temple Mother Earth. A 508(c)(1)(A) sacred ceremony church. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Preparation;
