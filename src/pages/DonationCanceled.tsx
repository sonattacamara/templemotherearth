import { motion } from "framer-motion";
import { XCircle, ArrowRight, Heart, Shield, HelpCircle, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import Navigation from "@/components/Navigation";
import DonationCTA from "@/components/DonationCTA";
import logo from "@/assets/logo.png";

const ease = [0.25, 0.1, 0.25, 1] as const;
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};
const stagger = { visible: { transition: { staggerChildren: 0.12 } } };

const DonationCanceled = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Donation Not Completed"
        description="Your donation to Temple Mother Earth was not completed. We understand — there are many ways to support our mission."
        path="/donation-canceled"
      />
      <Navigation />

      {/* Hero */}
      <section className="relative flex min-h-[55vh] items-center justify-center overflow-hidden px-4 pt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/50 via-background to-background" />

        <motion.div
          className="relative z-10 max-w-2xl text-center"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="mx-auto mb-6">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-muted">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              >
                <XCircle className="h-10 w-10 text-muted-foreground" />
              </motion.div>
            </div>
          </motion.div>

          <motion.img
            variants={fadeUp}
            src={logo}
            alt="Temple Mother Earth"
            className="mx-auto mb-6 h-14 w-auto"
          />

          <motion.h1
            variants={fadeUp}
            className="font-display text-3xl font-bold text-foreground md:text-4xl"
          >
            Your Donation Was Not Completed
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground"
          >
            We understand — and there's absolutely no pressure. The Temple is here for you whenever
            you're ready, and there are many ways to support our mission beyond financial contributions.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/sponsor"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-body text-sm font-semibold text-primary-foreground shadow-lg transition hover:bg-primary/80"
            >
              <Heart className="h-4 w-4" />
              Try Again
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-6 py-3 font-body text-sm font-semibold text-foreground transition hover:bg-accent"
            >
              Return Home
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Other Ways to Support */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center font-display text-2xl font-bold text-foreground md:text-3xl">
            Other Ways to Support the Temple
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-center text-sm text-muted-foreground">
            Financial contributions are only one way to give. Your energy, time, and presence
            are equally sacred.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Heart,
                title: "Volunteer Your Time",
                desc: "Through our Sacred Energy Exchange program, your volunteer hours can be converted into ceremony credits. Serve the Temple, and the Temple serves you.",
                link: "/volunteer",
                cta: "Learn About Volunteering",
              },
              {
                icon: Shield,
                title: "Become a Member",
                desc: "Join our growing family with a monthly membership. Members receive priority access to ceremonies, exclusive education content, and community connection.",
                link: "/membership",
                cta: "Explore Membership",
              },
              {
                icon: MessageCircle,
                title: "Spread the Word",
                desc: "Share our mission with your network. Follow us on social media, tell a friend about the Temple, or leave a review. Your voice amplifies our reach.",
                link: "/about",
                cta: "Learn Our Story",
              },
            ].map((item) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex flex-col rounded-xl border border-border bg-card p-6"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-4 text-center font-display text-base font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 flex-1 text-center text-sm leading-relaxed text-muted-foreground">
                  {item.desc}
                </p>
                <Link
                  to={item.link}
                  className="mt-5 inline-flex items-center justify-center gap-2 rounded-lg border border-border px-4 py-2.5 text-xs font-semibold text-foreground transition hover:bg-accent"
                >
                  {item.cta}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ / Common Concerns */}
      <section className="bg-card px-4 py-16">
        <div className="mx-auto max-w-2xl">
          <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <HelpCircle className="h-6 w-6 text-primary" />
          </div>
          <h2 className="text-center font-display text-2xl font-bold text-card-foreground md:text-3xl">
            Common Questions
          </h2>

          <div className="mt-8 space-y-5">
            {[
              {
                q: "Was I charged?",
                a: "No. Since the donation was not completed, no charge was made to your account. You can verify this in your PayPal transaction history.",
              },
              {
                q: "Can I donate a different amount?",
                a: "Absolutely. PayPal allows you to choose any donation amount. Simply click 'Try Again' above and enter the amount that feels right for you.",
              },
              {
                q: "Is there a minimum donation?",
                a: "There is no minimum. Every offering — no matter the size — is received with gratitude and makes a meaningful difference.",
              },
              {
                q: "Can I donate by check or other means?",
                a: "Yes. Contact our team for information about donating by check, wire transfer, or in-kind donations of goods and services.",
              },
              {
                q: "Are donations tax-deductible?",
                a: "Yes. Temple Mother Earth is a registered 508(c)(1)(A) sacred ceremony church. All donations are tax-deductible to the full extent of the law. You will receive a receipt for your records.",
              },
            ].map((item) => (
              <div key={item.q} className="rounded-lg border border-border bg-background p-5">
                <h3 className="font-display text-sm font-semibold text-foreground">{item.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Soft CTA */}
      <DonationCTA
        eyebrow="When You're Ready"
        headline="Every Seed Planted Bears Fruit"
        body="There is no rush and no pressure. When the time is right, your offering will flow exactly where it's needed most."
        buttonLabel="Give When Ready"
        variant="light"
      />

      {/* Footer */}
      <footer className="bg-foreground px-4 py-12">
        <div className="mx-auto max-w-4xl text-center">
          <img src={logo} alt="Temple Mother Earth" className="mx-auto mb-4 h-10 w-auto opacity-60" />
          <p className="font-body text-xs text-primary-foreground/40">
            © {new Date().getFullYear()} Temple Mother Earth. A 501(c)(3) nonprofit organization. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default DonationCanceled;
