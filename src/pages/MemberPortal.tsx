import { useState } from "react";
import { motion, type Easing } from "framer-motion";
import {
  ArrowRight, Eye, EyeOff, ExternalLink, ArrowLeft, LogOut,
  BookOpen, Calendar, Heart, Leaf, Shield, Sparkles, Star, Users,
  CheckCircle2, ArrowDown, MessageCircle
} from "lucide-react";
import { Link } from "react-router-dom";
import EventbriteCTA from "@/components/EventbriteCTA";
import Navigation from "@/components/Navigation";
import { useAuth } from "@/hooks/useAuth";
import logo from "@/assets/logo.png";

const ease: Easing = [0.25, 0.1, 0.25, 1];
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};
const stagger = { visible: { transition: { staggerChildren: 0.12 } } };

/* ── Pathway Steps ── */
const pathwaySteps = [
  {
    stage: "Welcome",
    tier: "Welcome Circle",
    price: "Free · 30 Days",
    icon: Heart,
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
    description: "Your first step into the Temple community. Explore who we are, what we stand for, and feel the energy of this sacred space.",
    includes: [
      "Access to the Integration Portal for 30 days",
      "Community orientation resources",
      "Introduction to our ceremonies and offerings",
      "Temple Transmissions newsletter",
    ],
    action: "You're here! Explore the resources below.",
  },
  {
    stage: "Belong",
    tier: "Community Rhythm",
    price: "$50/month",
    icon: Users,
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
    description: "Root yourself in the rhythm of community. Show up, share space, and begin building sacred relationships.",
    includes: [
      "Full Integration Portal access",
      "Community events & gatherings",
      "Monthly community days",
      "Telegram community access",
      "Priority Eventbrite booking",
    ],
    action: "Join Community Rhythm →",
  },
  {
    stage: "Train",
    tier: "Environment Collective",
    price: "$150/month",
    icon: Leaf,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
    description: "Deepen your practice. Build the daily discipline that prepares your body, mind, and spirit for deeper ceremony work.",
    includes: [
      "Everything in Community Rhythm",
      "Live virtual Qi Gong (Mon–Fri)",
      "Breathwork & movement sessions",
      "Wellness workshops & skill shares",
      "Access to facilitator Q&A sessions",
    ],
    action: "Join Environment Collective →",
  },
  {
    stage: "Prepare",
    tier: "Preparation Path",
    price: "$275/month · 3-month minimum",
    icon: Shield,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    description: "Enter the preparation phase. This is where the real inner work begins — clearing, cleansing, and readying yourself for ceremony.",
    includes: [
      "Everything in Environment Collective",
      "Ceremony eligibility after 3 months",
      "1-on-1 facilitator guidance",
      "Sacred intake & medical screening",
      "Preparation circles & education",
      "Integration support sessions",
    ],
    action: "Begin Preparation Path →",
  },
  {
    stage: "Embody",
    tier: "Temple Immersion Path",
    price: "$500/month · 3-month minimum",
    icon: Sparkles,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    description: "The highest expression of commitment. Fully embody the Temple way of life with quarterly immersions and deep ceremony access.",
    includes: [
      "Everything in Preparation Path",
      "Quarterly international immersions eligibility",
      "Advanced ceremony access",
      "Facilitator mentorship track",
      "VIP retreat pricing",
      "Direct founder access",
    ],
    action: "Begin Temple Immersion →",
  },
];

/* ── Free Integration Tools ── */
const integrationTools = [
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

const MemberPortal = () => {
  const { user, loading, signIn, signUp, signOut, resetPassword } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const inputClass =
    "w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSubmitting(true);

    if (isForgotPassword) {
      const { error } = await resetPassword(email);
      if (error) setError(error.message);
      else setSuccess("Password reset email sent. Check your inbox and follow the link to reset your password.");
      setSubmitting(false);
      return;
    }

    if (isLogin) {
      const { error } = await signIn(email, password);
      if (error) setError(error.message);
    } else {
      const { error } = await signUp(email, password, fullName);
      if (error) setError(error.message);
      else setSuccess("Please check your email to verify your account before logging in.");
    }
    setSubmitting(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex min-h-screen items-center justify-center pt-20">
          <p className="text-muted-foreground">Loading…</p>
        </div>
      </div>
    );
  }

  /* ═══════════════════════════════════════════════ */
  /* LOGGED-IN: Enhanced Integration Dashboard       */
  /* ═══════════════════════════════════════════════ */
  if (user) {
    const displayName = user.user_metadata?.full_name || "Sacred One";

    return (
      <div className="min-h-screen bg-background">
        <Navigation />

        {/* Dashboard Header */}
        <section className="bg-card border-b border-border pt-20">
          <div className="mx-auto max-w-5xl px-4 py-10">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <img
                  src={logo}
                  alt="Temple Mother Earth"
                  className="h-16 w-16 rounded-full object-cover shadow-lg ring-2 ring-primary/20"
                />
                <div>
                  <p className="font-body text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                    Integration Portal
                  </p>
                  <h1 className="font-display text-2xl font-bold text-foreground md:text-3xl">
                    Welcome Home, {displayName}
                  </h1>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Your sacred companion for life's expanded experiences
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  to="/"
                  className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" /> Home
                </Link>
                <button
                  onClick={() => signOut()}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs text-muted-foreground hover:text-destructive transition-colors"
                >
                  <LogOut className="h-3 w-3" /> Sign Out
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="px-4 py-12 bg-card/50 border-b border-border">
          <motion.div
            className="mx-auto max-w-4xl"
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="text-center mb-8">
              <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">
                How the Integration Portal Works
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
                The Integration Portal is your free resource hub for navigating every step of your journey at Temple Mother Earth.
                Whether you're preparing for your first ceremony or deepening your ongoing practice, everything you need is here.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="rounded-2xl border border-primary/20 bg-primary/5 p-6 md:p-8">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <span className="font-display text-lg font-bold text-primary">1</span>
                  </div>
                  <h3 className="mt-3 font-display text-base font-semibold text-foreground">Explore & Learn</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Browse the Sacred Learning Library, read preparation guides, and understand our ceremonies.
                  </p>
                </div>
                <div className="text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <span className="font-display text-lg font-bold text-primary">2</span>
                  </div>
                  <h3 className="mt-3 font-display text-base font-semibold text-foreground">Prepare & Apply</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Complete your Sacred Intake form, follow the preparation guide, and book your experience.
                  </p>
                </div>
                <div className="text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <span className="font-display text-lg font-bold text-primary">3</span>
                  </div>
                  <h3 className="mt-3 font-display text-base font-semibold text-foreground">Integrate & Grow</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    After ceremony, use integration resources, connect with community, and continue your evolution.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Free Integration Tools */}
        <section className="px-4 py-12">
          <motion.div
            className="mx-auto max-w-5xl"
            initial="hidden"
            animate="visible"
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
              {integrationTools.map((tool) => (
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
          </motion.div>
        </section>

        {/* Membership Pathway Progression */}
        <section className="bg-card border-y border-border px-4 py-16">
          <motion.div
            className="mx-auto max-w-4xl"
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="text-center mb-12">
              <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">
                Your Pathway of Evolution
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
                Temple Mother Earth membership follows a sacred progression — each stage represents a threshold of inner evolution and readiness.
                Move at your own pace. There is no rush; only remembering.
              </p>
            </motion.div>

            <div className="space-y-0">
              {pathwaySteps.map((step, index) => (
                <motion.div key={step.tier} variants={fadeUp}>
                  <div className="relative flex gap-6">
                    {/* Vertical Line */}
                    <div className="flex flex-col items-center">
                      <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${step.bgColor} ring-2 ring-background`}>
                        <step.icon className={`h-5 w-5 ${step.color}`} />
                      </div>
                      {index < pathwaySteps.length - 1 && (
                        <div className="w-px flex-1 bg-border my-2" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="pb-10 flex-1">
                      <div className="flex items-baseline gap-3 flex-wrap">
                        <span className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                          {step.stage}
                        </span>
                        <span className="text-xs text-muted-foreground">{step.price}</span>
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

        {/* External Integration Portal Link */}
        <section className="px-4 py-12">
          <div className="mx-auto max-w-2xl text-center">
            <h3 className="font-display text-xl font-bold text-foreground">Full Integration & Wellness Portal</h3>
            <p className="mt-3 text-sm text-muted-foreground">
              Access the complete Integration & Wellness portal for expanded tools, resources, and community features available to paid members.
            </p>
            <a
              href="https://integration.templemotherearth.org/auth"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 font-body text-sm font-semibold text-primary-foreground shadow-lg transition hover:bg-primary/80"
            >
              Open Integration Portal <ExternalLink className="h-4 w-4" />
            </a>
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
  }

  /* ═══════════════════════════════════════════════ */
  /* NOT LOGGED IN: Auth Form with Forgot Password   */
  /* ═══════════════════════════════════════════════ */
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <section className="flex min-h-screen items-center justify-center px-4 pt-20">
        <motion.div
          className="w-full max-w-md"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="text-center mb-8">
            <img
              src={logo}
              alt="Temple Mother Earth"
              className="mx-auto h-20 w-20 rounded-full object-cover shadow-lg ring-2 ring-primary/20"
            />
            <h1 className="mt-4 font-display text-2xl font-bold text-foreground">
              {isForgotPassword ? "Reset Your Password" : "Temple Mother Earth"}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {isForgotPassword
                ? "Enter your email and we'll send you a reset link."
                : "Your sacred integration companion"}
            </p>
          </motion.div>

          <motion.form
            variants={fadeUp}
            className="space-y-4 rounded-2xl border border-border bg-card p-8"
            onSubmit={handleSubmit}
          >
            {!isForgotPassword && (
              <div className="flex rounded-lg border border-border overflow-hidden">
                <button
                  type="button"
                  onClick={() => { setIsLogin(false); setError(""); setSuccess(""); setIsForgotPassword(false); }}
                  className={`flex-1 py-2.5 text-sm font-semibold transition ${!isLogin ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}
                >
                  Create Space
                </button>
                <button
                  type="button"
                  onClick={() => { setIsLogin(true); setError(""); setSuccess(""); setIsForgotPassword(false); }}
                  className={`flex-1 py-2.5 text-sm font-semibold transition ${isLogin ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}
                >
                  Welcome Back
                </button>
              </div>
            )}

            {!isLogin && !isForgotPassword && (
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1">Your Name</label>
                <input
                  className={inputClass}
                  placeholder="How would you like to be called?"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-foreground mb-1">Email</label>
              <input
                className={inputClass}
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {!isForgotPassword && (
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1">Password</label>
                <div className="relative">
                  <input
                    className={inputClass}
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            )}

            {error && <p className="text-sm text-destructive">{error}</p>}
            {success && <p className="text-sm text-primary">{success}</p>}

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-lg bg-primary px-6 py-3 font-body text-sm font-semibold text-primary-foreground transition hover:bg-primary/80 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {submitting
                ? "Please wait..."
                : isForgotPassword
                ? "Send Reset Link"
                : isLogin
                ? "Welcome Back"
                : "Begin Your Journey"}
              <ArrowRight className="h-4 w-4" />
            </button>

            {/* Forgot Password Link */}
            {isLogin && !isForgotPassword && (
              <p className="text-center">
                <button
                  type="button"
                  onClick={() => { setIsForgotPassword(true); setError(""); setSuccess(""); }}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Forgot your password?
                </button>
              </p>
            )}

            {isForgotPassword && (
              <p className="text-center">
                <button
                  type="button"
                  onClick={() => { setIsForgotPassword(false); setError(""); setSuccess(""); }}
                  className="text-sm text-primary hover:underline font-semibold"
                >
                  ← Back to Sign In
                </button>
              </p>
            )}
          </motion.form>
        </motion.div>
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

export default MemberPortal;
