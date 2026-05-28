import Navigation from "@/components/Navigation";
import SEOHead from "@/components/SEOHead";
import EventbriteCTA from "@/components/EventbriteCTA";
import { usePageTracking } from "@/hooks/useAnalytics";
import { Shield, Lock, Eye, FileText, Users, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

const sections = [
  {
    icon: Eye,
    title: "Information We Collect",
    content: [
      "**Personal Information**: When you register for ceremonies, submit intake forms, or become a member, we collect your name, email address, phone number, and relevant background information you voluntarily provide.",
      "**Ceremony & Intake Data**: Sacred intake forms contain sensitive spiritual and personal information. This data is treated with the highest level of confidentiality and is only accessible to authorized facilitators directly involved in your care.",
      "**Payment Information**: Financial transactions are processed through secure third-party providers (Stripe). We do not store credit card numbers on our servers.",
      "**Website Analytics**: We collect anonymized browsing data (page views, referral sources) to improve the experience. No personally identifiable information is tracked without consent.",
    ],
  },
  {
    icon: Lock,
    title: "How We Use Your Information",
    content: [
      "To facilitate your participation in sacred ceremonies and ensure proper preparation and safety screening.",
      "To communicate with you about upcoming ceremonies, community gatherings, and Temple updates.",
      "To process membership contributions and ceremony registrations.",
      "To maintain the safety and integrity of our ceremonial spaces.",
      "To comply with applicable legal requirements as a 508(c)(1)(A) sacred ceremony church.",
    ],
  },
  {
    icon: Shield,
    title: "How We Protect Your Information",
    content: [
      "All data is encrypted in transit (TLS/SSL) and at rest.",
      "Sacred intake forms and ceremony records are stored in secured, access-controlled databases.",
      "Only authorized facilitators and Temple leadership have access to sensitive ceremony data.",
      "We conduct regular security reviews of our systems and third-party integrations.",
      "We never share your personal information with outside parties for any outreach purposes.",
    ],
  },
  {
    icon: Users,
    title: "Ceremony & Community Data",
    content: [
      "Information shared during ceremonies, integration circles, and community gatherings is held in strict confidence by all facilitators.",
      "Photographs or recordings are never taken during ceremonies without explicit consent from all participants.",
      "Testimonials displayed on our website are shared with the express written permission of the individual.",
      "Your ceremony history and personal journey information is never disclosed to outside parties.",
    ],
  },
  {
    icon: Globe,
    title: "Third-Party Services",
    content: [
      "**Stripe**: Payment processing. Subject to Stripe's privacy policy.",
      "**Eventbrite**: Event registration. Subject to Eventbrite's privacy policy.",
      "**Go High Level**: Member communications. Subject to GHL's privacy policy.",
      "We carefully vet all third-party services to ensure they meet our standards for data protection and privacy.",
    ],
  },
  {
    icon: FileText,
    title: "Your Rights",
    content: [
      "You may request access to all personal data we hold about you at any time.",
      "You may request deletion of your personal data, subject to legal retention requirements.",
      "You may opt out of non-essential communications at any time.",
      "You may update or correct your personal information by contacting us directly.",
      "For any privacy-related requests, contact us at privacy@templemotherearth.org.",
    ],
  },
];

const PrivacyPolicy = () => {
  usePageTracking();

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Privacy Policy | Temple Mother Earth"
        description="How Temple Mother Earth protects your personal information, ceremony data, and sacred trust. Our commitment to your privacy as a 508(c)(1)(A) sacred ceremony church."
        path="/privacy-policy"
      />
      <Navigation />

      {/* Hero */}
      <section className="bg-foreground px-4 py-24 md:py-32 text-center">
        <motion.div
          className="mx-auto max-w-3xl"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <motion.p variants={fadeUp} className="font-body text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Sacred Trust
          </motion.p>
          <motion.h1 variants={fadeUp} className="mt-4 font-display text-3xl font-bold text-primary-foreground md:text-5xl">
            Privacy Policy
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-6 text-lg text-primary-foreground/70 max-w-2xl mx-auto">
            Your trust is sacred to us. This policy outlines how Temple Mother Earth collects, uses, and protects your personal information.
          </motion.p>
          <motion.p variants={fadeUp} className="mt-4 text-sm text-primary-foreground/50 italic">
            Last updated: March 2026
          </motion.p>
        </motion.div>
      </section>

      {/* Content */}
      <section className="px-4 py-16 md:py-24">
        <div className="mx-auto max-w-3xl space-y-16">
          {sections.map((section, i) => (
            <motion.div
              key={section.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
            >
              <div className="flex items-center gap-3 mb-6">
                <section.icon className="h-6 w-6 text-primary" />
                <h2 className="font-display text-2xl font-bold text-foreground">{section.title}</h2>
              </div>
              <ul className="space-y-4">
                {section.content.map((item, j) => (
                  <li key={j} className="text-muted-foreground leading-relaxed pl-4 border-l-2 border-primary/20">
                    <span dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>') }} />
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Contact */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            className="rounded-xl border border-primary/20 bg-primary/5 p-8 text-center"
          >
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">Questions About Privacy?</h2>
            <p className="text-muted-foreground mb-6">
              If you have any questions or concerns about this policy or your personal data, we are here for you.
            </p>
            <Link
              to="/contact"
              className="inline-block rounded-lg bg-primary px-8 py-3 font-display text-sm font-semibold uppercase tracking-wider text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Contact Us
            </Link>
          </motion.div>
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

export default PrivacyPolicy;
