import { motion, type Easing } from "framer-motion";
import { Link } from "react-router-dom";
import {
  BookOpen, Calendar, Shield, Heart, MessageCircle, Star,
  ArrowRight, ExternalLink, Smartphone,
} from "lucide-react";

const ease: Easing = [0.25, 0.1, 0.25, 1];
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};
const stagger = { visible: { transition: { staggerChildren: 0.12 } } };

const tools = [
  {
    icon: BookOpen,
    title: "Sacred Learning Library",
    description: "Deep-dive education on Kambo, Hapé, Sacred Mother Earth Ceremony, and Cacao — covering preparation, ceremony, and integration.",
    link: "/member/education",
    linkText: "Enter the Library",
  },
  {
    icon: Calendar,
    title: "Upcoming Experiences",
    description: "Browse and book upcoming ceremonies, community days, immersions, and gatherings through our Eventbrite portal.",
    link: "https://www.eventbrite.com/o/temple-of-mother-earth-29347213477",
    linkText: "View Calendar",
    external: true,
  },
  {
    icon: Shield,
    title: "Sacred Intake Form",
    description: "Complete your medical and spiritual intake — required for all ceremony participants. Your safety is our highest priority.",
    link: "/ceremony-intake",
    linkText: "Begin Intake",
  },
  {
    icon: Heart,
    title: "Preparation Guide",
    description: "Step-by-step guidance on how to prepare your body, mind, and spirit for ceremony. Diet, mindset, and practical tips.",
    link: "/preparation",
    linkText: "Read the Guide",
  },
  {
    icon: MessageCircle,
    title: "Telegram Community",
    description: "Connect with fellow community members, share experiences, ask questions, and stay updated between ceremonies.",
    link: "https://t.me/+your-telegram-link",
    linkText: "Join Telegram",
    external: true,
  },
  {
    icon: Star,
    title: "Code of Conduct",
    description: "Our shared agreements for sacred space. Understanding and honoring these principles is essential for all participants.",
    link: "/conduct",
    linkText: "Read the Code",
  },
];

const PortalToolsGrid = () => (
  <section className="px-4 py-12">
    <motion.div
      className="mx-auto max-w-5xl"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={stagger}
    >
      <motion.div variants={fadeUp} className="text-center mb-10">
        <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">
          Your Integration Tools
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
          Free resources available to every member — no tier required.
        </p>
      </motion.div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <motion.div key={tool.title} variants={fadeUp}>
            {tool.external ? (
              <a
                href={tool.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-2xl border border-border bg-card p-6 transition hover:shadow-lg hover:border-primary/30 h-full"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <tool.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mt-4 font-display text-base font-semibold text-foreground">{tool.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{tool.description}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                  {tool.linkText} <ExternalLink className="h-3 w-3" />
                </span>
              </a>
            ) : (
              <Link
                to={tool.link}
                className="group block rounded-2xl border border-border bg-card p-6 transition hover:shadow-lg hover:border-primary/30 h-full"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <tool.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mt-4 font-display text-base font-semibold text-foreground">{tool.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{tool.description}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                  {tool.linkText} <ArrowRight className="h-3 w-3" />
                </span>
              </Link>
            )}
          </motion.div>
        ))}
      </div>

      {/* Install on Phone instruction */}
      <motion.div variants={fadeUp} className="mt-10 rounded-2xl border border-primary/20 bg-primary/5 p-6 md:p-8">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
            <Smartphone className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-display text-base font-semibold text-foreground">
              Add the Integration Portal to Your Phone
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Access your daily tools instantly — no app store needed.
            </p>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-border bg-card p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-primary mb-2">iPhone (Safari)</p>
                <ol className="space-y-1.5 text-sm text-muted-foreground">
                  <li className="flex gap-2"><span className="font-semibold text-foreground">1.</span> Open <a href="https://integration.templemotherearth.org/auth" className="text-primary underline" target="_blank" rel="noopener noreferrer">integration.templemotherearth.org</a> in Safari</li>
                  <li className="flex gap-2"><span className="font-semibold text-foreground">2.</span> Tap the <strong className="text-foreground">Share</strong> button (square with arrow)</li>
                  <li className="flex gap-2"><span className="font-semibold text-foreground">3.</span> Scroll down and tap <strong className="text-foreground">"Add to Home Screen"</strong></li>
                  <li className="flex gap-2"><span className="font-semibold text-foreground">4.</span> Tap <strong className="text-foreground">"Add"</strong> — done!</li>
                </ol>
              </div>

              <div className="rounded-xl border border-border bg-card p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-primary mb-2">Android (Chrome)</p>
                <ol className="space-y-1.5 text-sm text-muted-foreground">
                  <li className="flex gap-2"><span className="font-semibold text-foreground">1.</span> Open <a href="https://integration.templemotherearth.org/auth" className="text-primary underline" target="_blank" rel="noopener noreferrer">integration.templemotherearth.org</a> in Chrome</li>
                  <li className="flex gap-2"><span className="font-semibold text-foreground">2.</span> Tap the <strong className="text-foreground">three-dot menu</strong> (top right)</li>
                  <li className="flex gap-2"><span className="font-semibold text-foreground">3.</span> Tap <strong className="text-foreground">"Add to Home screen"</strong></li>
                  <li className="flex gap-2"><span className="font-semibold text-foreground">4.</span> Tap <strong className="text-foreground">"Add"</strong> — done!</li>
                </ol>
              </div>
            </div>

            <p className="mt-4 text-xs text-muted-foreground">
              Once added, the portal opens like a native app — full screen, fast, and always at your fingertips. 🙏
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  </section>
);

export default PortalToolsGrid;
