import { motion } from "framer-motion";
import { Heart, CheckCircle2, ArrowRight, Leaf, Mail, FileText, Users, HandHeart } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import Navigation from "@/components/Navigation";
import logo from "@/assets/logo.png";

const ease = [0.25, 0.1, 0.25, 1] as const;
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};
const stagger = { visible: { transition: { staggerChildren: 0.12 } } };

const DonationSuccess = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  const categoryMessages: Record<string, { title: string; message: string }> = {
    veteran: {
      title: "A Warrior's Journey Begins With You",
      message: "Your generous contribution directly supports a veteran's path to transformation through sacred ceremony. You have planted a seed of restoration that will ripple through their life and the lives of those they touch.",
    },
    ceremony: {
      title: "You've Gifted the Journey of Transformation",
      message: "Because of your generosity, someone who may not have had the financial means will now have the opportunity to experience the transformative power of sacred ceremony. You are a vessel of light.",
    },
    general: {
      title: "The Temple Grows Because of You",
      message: "Your offering sustains our sacred space, our community programs, and our mission to bring Earth Medicine sacrament to all who seek it. Every seed you plant bears fruit in ways seen and unseen.",
    },
  };

  const { title, message } = categoryMessages[category || ""] || {
    title: "Your Offering Has Been Received",
    message: "Thank you for your generous contribution to Temple Mother Earth. Your support sustains our sacred mission of transformation, community, and the preservation of Earth Medicine traditions.",
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Thank You for Your Donation"
        description="Your generous donation to Temple Mother Earth has been received. Thank you for supporting our sacred mission."
        path="/donation-success"
      />
      <Navigation />

      {/* Hero */}
      <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden px-4 pt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background to-background" />

        <motion.div
          className="relative z-10 max-w-2xl text-center"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="mx-auto mb-6">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-primary/15">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              >
                <CheckCircle2 className="h-12 w-12 text-primary" />
              </motion.div>
            </div>
          </motion.div>

          <motion.img
            variants={fadeUp}
            src={logo}
            alt="Temple Mother Earth"
            className="mx-auto mb-6 h-16 w-auto"
          />

          <motion.h1
            variants={fadeUp}
            className="font-display text-3xl font-bold text-foreground md:text-4xl lg:text-5xl"
          >
            {title}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            {message}
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mx-auto mt-8 max-w-md rounded-xl border border-primary/20 bg-primary/5 p-5"
          >
            <p className="text-sm font-medium text-foreground">
              <HandHeart className="inline h-4 w-4 mr-1" /> Temple of Mother Earth is a sacred ceremony church organized under section 508(c)(1)(A). EIN: 85-4135623.
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              Your contribution is tax-deductible to the full extent permitted by law. No goods or services were provided in exchange for this donation. A receipt has been sent to your email via PayPal. Please retain it for your records.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* What Happens Next */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center font-display text-2xl font-bold text-foreground md:text-3xl">
            What Happens Next
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-center text-sm text-muted-foreground">
            Here's how your generous offering flows through the Temple.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {[
              {
                icon: Mail,
                title: "Confirmation Email",
                desc: "PayPal has sent a donation receipt to your email. This serves as your official tax-deductible acknowledgment for the current tax year.",
              },
              {
                icon: Leaf,
                title: "Funds Allocated",
                desc: "Your donation is designated to its intended purpose — whether veteran sponsorship, ceremony scholarships, or the general Temple fund — and deployed within the current operating cycle.",
              },
              {
                icon: Heart,
                title: "Lives Transformed",
                desc: "Your contribution directly enables ceremonies, community programs, facilitator training, and sacred space maintenance. Every dollar plants seeds of healing.",
              },
            ].map((item) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="rounded-xl border border-border bg-card p-6 text-center"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-4 font-display text-base font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact & Transparency */}
      <section className="bg-card px-4 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            <FileText className="h-7 w-7 text-primary" />
          </div>
          <h2 className="font-display text-2xl font-bold text-card-foreground md:text-3xl">
            Your Impact By the Numbers
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Temple Mother Earth is committed to full transparency. Your donations fund real, tangible outcomes
            in the lives of our community members.
          </p>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { stat: "500+", label: "Ceremonies Held" },
              { stat: "200+", label: "Veterans Served" },
              { stat: "1,000+", label: "Community Members" },
              { stat: "100%", label: "Donor Transparency" },
            ].map((item) => (
              <div key={item.label} className="rounded-lg border border-border bg-background p-5">
                <p className="font-display text-2xl font-bold text-primary">{item.stat}</p>
                <p className="mt-1 text-xs text-muted-foreground">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stay Connected */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            <Users className="h-7 w-7 text-primary" />
          </div>
          <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">
            Continue Your Journey With Us
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Your offering is just the beginning. There are many ways to deepen your connection with the Temple community.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/ceremony-intake"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-body text-sm font-semibold text-primary-foreground shadow-lg transition hover:bg-primary/80"
            >
              Begin Your Journey
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/volunteer"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-6 py-3 font-body text-sm font-semibold text-foreground transition hover:bg-accent"
            >
              Volunteer With Us
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-6 py-3 font-body text-sm font-semibold text-foreground transition hover:bg-accent"
            >
              Learn About the Temple
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground px-4 py-12">
        <div className="mx-auto max-w-4xl text-center">
          <img src={logo} alt="Temple Mother Earth" className="mx-auto mb-4 h-10 w-auto opacity-60" />
          <p className="font-body text-xs text-primary-foreground/40">
            © {new Date().getFullYear()} Temple Mother Earth. A sacred ceremony church organized under 508(c)(1)(A). All rights reserved.
          </p>
          <p className="mt-2 font-body text-xs text-primary-foreground/30">
            Questions about your donation? Contact us at{" "}
            <Link to="/contact" className="underline hover:text-primary-foreground/60">
              our contact page
            </Link>.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default DonationSuccess;
