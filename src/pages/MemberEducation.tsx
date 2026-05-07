import { useState } from "react";
import { motion, type Easing } from "framer-motion";
import { BookOpen, Play, Shield, Heart, Leaf, AlertTriangle, ChevronDown, ChevronUp, LogOut, ArrowLeft } from "lucide-react";
import { Link, Navigate } from "react-router-dom";
import EventbriteCTA from "@/components/EventbriteCTA";
import Navigation from "@/components/Navigation";
import SEOHead from "@/components/SEOHead";
import { useAuth } from "@/hooks/useAuth";

const ease: Easing = [0.25, 0.1, 0.25, 1];
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};
const stagger = { visible: { transition: { staggerChildren: 0.12 } } };

const kamboSections = [
  {
    id: "overview",
    title: "What is Kambo?",
    icon: Leaf,
    content: `Kambo is the waxy secretion of the Giant Monkey Frog (Phyllomedusa bicolor), found in the upper Amazon rainforest. For thousands of years, indigenous tribes · particularly the Matsés, Katukina, and Yawanawá · have used Kambo as a powerful cleansing medicine to sharpen the senses, increase strength, and remove "panema" (dark or heavy energy) from the body.

Kambo is not a psychedelic. It works primarily on the physical body through bioactive peptides that interact with the immune, endocrine, and nervous systems. The experience is typically intense but short-lived (20·40 minutes), followed by a period of deep rest and rejuvenation.

At Temple Mother Earth, Kambo is administered with deep reverence for its indigenous origins and the sacred relationship between humanity and the frog nation.`,
  },
  {
    id: "benefits",
    title: "Benefits of Kambo",
    icon: Heart,
    content: `Kambo has been traditionally used for:

• **Deep physical detoxification** · Kambo purges stored impurities, heavy metals, and parasites from the body through a natural purging process.
• **Immune system activation** · The bioactive peptides in Kambo stimulate the immune system, helping the body fight infection and illness.
• **Mental clarity & focus** · Many participants report heightened mental clarity, improved focus, and a sense of "lifting" from brain fog.
• **Emotional release** · Stored emotional trauma and grief often release during the ceremony, creating space for new energy.
• **Pain relief** · Kambo contains powerful natural peptides that support the body's own pain management systems.
• **Energy & vitality** · After the initial purge and rest, many people experience a significant increase in energy and vitality.
• **Spiritual alignment** · Kambo is often described as a "reset button" that clears energetic blockages and realigns the spirit.

Scientific research has identified over 100 bioactive peptides in Kambo, including dermaseptins (antimicrobial), phyllocaerulein (anti-inflammatory), and phyllomedusin (vasodilator).`,
  },
  {
    id: "preparation",
    title: "How to Prepare",
    icon: BookOpen,
    content: `Preparation is essential for a safe and meaningful Kambo experience:

**3·7 Days Before:**
• Begin eating clean, whole foods · reduce processed foods, sugar, alcohol, and caffeine.
• Increase water intake to support hydration and detoxification.
• Avoid recreational substances including cannabis and alcohol.
• Set your intention · journal, meditate, or pray about what you're seeking from the ceremony.

**24 Hours Before:**
• Eat a light dinner the evening before. Your last meal should be at least 10·12 hours before ceremony.
• Avoid alcohol, cannabis, and all recreational substances.
• Get plenty of rest.

**Day of Ceremony:**
• **Fast from food for 10·12 hours** before ceremony. You may have small sips of water the morning of.
• Wear comfortable, loose clothing.
• Bring a water bottle, towel, and change of clothes.
• Arrive with an open heart and willingness to surrender to the process.

**What to Bring:**
• Comfortable clothing
• A water bottle
• A towel
• A change of clothes (optional)
• Your intention written on paper (optional)
• A journal for integration notes`,
  },
  {
    id: "ceremony",
    title: "What Happens During Ceremony",
    icon: Shield,
    content: `**Opening & Prayer:**
The ceremony begins with prayer, intention setting, and energetic clearing of the space. Your facilitator will explain the process and answer any final questions.

**Application:**
Small burns (called "gates" or "points") are made on the surface of the skin using a small vine stick. The outer layer of skin is gently removed, creating tiny openings. Kambo is then applied to these points.

**The Purge:**
Within minutes, you will begin to feel the effects · facial swelling, increased heart rate, warmth, and nausea. The purging process (vomiting into a bucket) typically lasts 20·40 minutes. You will be drinking water throughout to support the purge.

**Rest & Integration:**
After the purge is complete, the Kambo is removed. You will rest, often falling into a deep sleep. When you awaken, most people feel clear, light, and renewed.

**Closing:**
The ceremony closes with gratitude, prayer, and gentle integration discussion. Light food and electrolyte drinks are provided.

**Number of Points:**
First-time participants typically receive 3·5 points. Experienced practitioners may receive more. Your facilitator will always start conservatively and adjust based on your body's response.`,
  },
  {
    id: "contraindications",
    title: "Safety & Contraindications",
    icon: AlertTriangle,
    content: `Kambo is powerful medicine and is **not appropriate for everyone**. You should NOT receive Kambo if you:

• Are pregnant or breastfeeding
• Have serious heart conditions (e.g., heart disease, pacemaker, recent heart surgery)
• Are taking blood thinners (e.g., Warfarin, Eliquis)
• Have had a stroke or brain hemorrhage
• Have an organ transplant
• Are currently taking immunosuppressant medications
• Have Addison's Disease or other adrenal conditions
• Have active psychosis or schizophrenia
• Are taking SSRIs, MAOIs, or lithium
• Have had a recent surgery (within 6 weeks)
• Have epilepsy that is not controlled

**Water Fasting Warning:** Kambo should never be combined with extended water fasting (more than 8 hours without food). Participants must not over-hydrate before ceremony. Your facilitator will guide you on proper water intake.

**Important:** All participants at Temple Mother Earth must complete a full medical intake form before receiving Kambo. This ensures your safety is our highest priority.

If you are unsure whether Kambo is safe for you, please reach out through our community circles on Telegram for a pre-ceremony consultation.`,
  },
  {
    id: "integration",
    title: "After Ceremony: Integration",
    icon: Heart,
    content: `Integration is where the real transformation happens. The ceremony opens the door; integration is walking through it.

**First 24·48 Hours:**
• Rest deeply. Your body has done powerful work.
• Eat light, nourishing foods · soups, fruits, and whole grains.
• Hydrate well with water and electrolytes.
• Avoid alcohol, cannabis, and heavy foods for at least 48 hours.
• Journal about your experience · what came up, what released, what you felt.

**First Week:**
• Continue clean eating and adequate hydration.
• Spend time in nature · walk barefoot, sit with trees, connect with the Earth.
• Meditate or pray daily, even if just for 5 minutes.
• Share your experience with a trusted person · a facilitator, partner, or fellow community member.

**Ongoing Integration:**
• Attend Temple Mother Earth integration circles (virtual or in-person).
• Continue journaling and tracking shifts in your emotional landscape.
• Notice changes in habits, relationships, and energy levels.
• Be gentle with yourself · transformation is not linear.

**Community Support:**
As a Temple Mother Earth member, you have access to:
• Monthly integration circles
• Private Telegram community
• Direct access to facilitators for follow-up questions
• Recommended reading, podcasts, and resources`,
  },
];

const videoResources = [
  { title: "Understanding Kambo: An Introduction", duration: "12 min", description: "Learn the origins, science, and spiritual significance of Kambo medicine." },
  { title: "Preparation Guide: Body, Mind & Spirit", duration: "8 min", description: "Step-by-step preparation to ensure you're ready for your Kambo ceremony." },
  { title: "What to Expect During Ceremony", duration: "15 min", description: "A detailed walkthrough of the Kambo ceremony process from start to finish." },
  { title: "Integration Practices After Kambo", duration: "10 min", description: "Powerful integration practices to deepen your ceremonial journey after ceremony." },
  { title: "Kambo & the Immune System: The Science", duration: "18 min", description: "Explore the bioactive peptides in Kambo and their effects on the human body." },
];

const MemberEducation = () => {
  const { user, loading, signOut } = useAuth();
  const [expandedSection, setExpandedSection] = useState<string | null>("overview");

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/member/auth" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <SEOHead title="Kambo Education" description="Learn about Kambo frog medicine · benefits, preparation, safety guidelines, and what to expect during ceremony at Temple Mother Earth." path="/member/education" />
      <Navigation />

      {/* Header */}
      <section className="bg-card border-b border-border pt-20">
        <div className="mx-auto max-w-5xl px-4 py-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <p className="font-body text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                Member Education
              </p>
              <h1 className="mt-2 font-display text-3xl font-bold text-foreground md:text-4xl">
                Sacred Learning Library
              </h1>
              <p className="mt-2 text-muted-foreground">
                Welcome back, {user.user_metadata?.full_name || "Sacred One"}. Deepen your knowledge and prepare for ceremony.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="h-4 w-4" /> Home
              </Link>
              <button
                onClick={signOut}
                className="inline-flex items-center gap-1 rounded-lg border border-border px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <LogOut className="h-4 w-4" /> Sign Out
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Education Navigation */}
      <section className="bg-card/50 border-b border-border">
        <div className="mx-auto max-w-5xl px-4 py-4">
          <div className="flex gap-3 overflow-x-auto">
            <div className="rounded-lg bg-primary px-4 py-2 font-body text-sm font-semibold text-primary-foreground whitespace-nowrap">
              Kambo
            </div>
            <div className="rounded-lg border border-border px-4 py-2 font-body text-sm text-muted-foreground whitespace-nowrap opacity-50 cursor-not-allowed">
              Hapé (Coming Soon)
            </div>
            <div className="rounded-lg border border-border px-4 py-2 font-body text-sm text-muted-foreground whitespace-nowrap opacity-50 cursor-not-allowed">
              Sacred Mother Earth Ceremony (Coming Soon)
            </div>
            <div className="rounded-lg border border-border px-4 py-2 font-body text-sm text-muted-foreground whitespace-nowrap opacity-50 cursor-not-allowed">
              Cacao (Coming Soon)
            </div>
          </div>
        </div>
      </section>

      {/* Kambo Content */}
      <section className="px-4 py-12">
        <motion.div
          className="mx-auto max-w-4xl"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          {/* Intro */}
          <motion.div variants={fadeUp} className="rounded-2xl border border-primary/20 bg-primary/5 p-8 mb-10">
            <h2 className="font-display text-2xl font-bold text-foreground">Kambo: The Giant Monkey Frog Medicine</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              This comprehensive guide covers everything you need to know about Kambo · from its indigenous origins
              and scientific properties to preparation, ceremony, and integration. Take your time with each section
              and return as often as you need.
            </p>
          </motion.div>

          {/* Expandable Sections */}
          <div className="space-y-4">
            {kamboSections.map((section) => (
              <motion.div
                key={section.id}
                variants={fadeUp}
                className="rounded-2xl border border-border bg-card overflow-hidden"
              >
                <button
                  onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-card/80 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <section.icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-display text-lg font-semibold text-foreground">{section.title}</h3>
                  </div>
                  {expandedSection === section.id ? (
                    <ChevronUp className="h-5 w-5 text-muted-foreground shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-muted-foreground shrink-0" />
                  )}
                </button>
                {expandedSection === section.id && (
                  <div className="px-6 pb-6 border-t border-border pt-4">
                    <div className="prose prose-sm max-w-none text-muted-foreground leading-relaxed whitespace-pre-line">
                      {section.content.split("**").map((part, i) =>
                        i % 2 === 1 ? <strong key={i} className="text-foreground">{part}</strong> : part
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Video Resources */}
          <motion.div variants={fadeUp} className="mt-12">
            <h2 className="font-display text-2xl font-bold text-foreground mb-6">
              Video Resources
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {videoResources.map((video) => (
                <div
                  key={video.title}
                  className="group rounded-2xl border border-border bg-card p-6 transition hover:shadow-lg hover:border-primary/30"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <Play className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display text-base font-semibold text-foreground">{video.title}</h3>
                      <p className="mt-1 text-xs text-primary font-semibold">{video.duration}</p>
                      <p className="mt-2 text-sm text-muted-foreground">{video.description}</p>
                      <p className="mt-3 text-xs text-muted-foreground/60 italic">Video coming soon</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div variants={fadeUp} className="mt-12 rounded-2xl border border-primary/20 bg-primary/5 p-8 text-center">
            <h3 className="font-display text-xl font-bold text-foreground">Ready for Your Kambo Ceremony?</h3>
            <p className="mt-3 text-muted-foreground max-w-md mx-auto">
              If you feel called to experience Kambo, complete your sacred intake form and browse our upcoming ceremonies.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Link
                to="/ceremony-intake"
                className="rounded-xl bg-primary px-6 py-3 font-body text-sm font-semibold text-primary-foreground transition hover:bg-primary/80"
              >
                Complete Sacred Intake
              </Link>
              <a
                href="https://www.eventbrite.com/o/29347213477#events"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-border px-6 py-3 font-body text-sm font-semibold text-foreground transition hover:border-primary"
              >
                View Upcoming Ceremonies
              </a>
            </div>
          </motion.div>
        </motion.div>
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

export default MemberEducation;
