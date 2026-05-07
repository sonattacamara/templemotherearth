import { motion, type Easing } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Heart, Users, Leaf, Shield, Sparkles, CheckCircle2,
} from "lucide-react";

const ease: Easing = [0.25, 0.1, 0.25, 1];
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};
const stagger = { visible: { transition: { staggerChildren: 0.12 } } };

const pathwaySteps = [
  {
    stage: "Welcome", tier: "Welcome Circle", icon: Heart,
    color: "text-pink-500", bgColor: "bg-pink-500/10",
    description: "Your first step into the Temple community. Explore who we are, what we stand for, and feel the energy of this sacred space.",
    includes: ["Access to the Integration Portal for 30 days", "Community orientation resources", "Introduction to our ceremonies and offerings", "Temple Transmissions newsletter"],
    action: "You're here! Explore the resources below.",
  },
  {
    stage: "Belong", tier: "Community Rhythm", icon: Users,
    color: "text-amber-500", bgColor: "bg-amber-500/10",
    description: "Root yourself in the rhythm of community. Show up, share space, and begin building sacred relationships.",
    includes: ["Full Integration Portal access", "Community events & gatherings", "Monthly community days", "Telegram community access", "Priority Eventbrite booking"],
    action: "Join Community Rhythm →",
  },
  {
    stage: "Train", tier: "Environment Collective", icon: Leaf,
    color: "text-emerald-500", bgColor: "bg-emerald-500/10",
    description: "Deepen your practice. Build the daily discipline that prepares your body, mind, and spirit for deeper ceremony work.",
    includes: ["Everything in Community Rhythm", "Live virtual Qi Gong (Mon·Fri)", "Breathwork & movement sessions", "Wellness workshops & skill shares", "Access to facilitator Q&A sessions"],
    action: "Join Environment Collective →",
  },
  {
    stage: "Prepare", tier: "Preparation Path", icon: Shield,
    color: "text-blue-500", bgColor: "bg-blue-500/10",
    description: "Enter the preparation phase. This is where the real inner work begins · clearing, cleansing, and readying yourself for ceremony.",
    includes: ["Everything in Environment Collective", "Ceremony eligibility after 3 months", "1-on-1 facilitator guidance", "Sacred intake & medical screening", "Preparation circles & education", "Integration support sessions"],
    action: "Begin Preparation Path →",
  },
  {
    stage: "Embody", tier: "Temple Immersion Path", icon: Sparkles,
    color: "text-purple-500", bgColor: "bg-purple-500/10",
    description: "The highest expression of commitment. Fully embody the Temple way of life with quarterly immersions and deep ceremony access.",
    includes: ["Everything in Preparation Path", "Quarterly international immersions eligibility", "Advanced ceremony access", "Facilitator mentorship track", "Priority retreat access", "Direct founder access"],
    action: "Begin Temple Immersion →",
  },
];

const PortalPathway = () => (
  <section className="bg-card border-y border-border px-4 py-16">
    <motion.div
      className="mx-auto max-w-4xl"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={stagger}
    >
      <motion.div variants={fadeUp} className="text-center mb-12">
        <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">
          Your Pathway of Evolution
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
          Temple Mother Earth membership follows a sacred progression · each stage represents a threshold of inner evolution and readiness.
          Move at your own pace. There is no rush; only remembering.
        </p>
      </motion.div>

      <div className="space-y-0">
        {pathwaySteps.map((step, index) => (
          <motion.div key={step.tier} variants={fadeUp}>
            <div className="relative flex gap-6">
              <div className="flex flex-col items-center">
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${step.bgColor} ring-2 ring-background`}>
                  <step.icon className={`h-5 w-5 ${step.color}`} />
                </div>
                {index < pathwaySteps.length - 1 && (
                  <div className="w-px flex-1 bg-border my-2" />
                )}
              </div>

              <div className="pb-10 flex-1">
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                    {step.stage}
                  </span>
                </div>
                <h3 className="mt-1 font-display text-lg font-bold text-foreground">{step.tier}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
                <ul className="mt-3 space-y-1.5">
                  {step.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
                {index === 0 ? (
                  <p className="mt-3 text-xs font-semibold text-primary italic">{step.action}</p>
                ) : (
                  <Link
                    to="/membership"
                    className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
                  >
                    {step.action}
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  </section>
);

export default PortalPathway;
