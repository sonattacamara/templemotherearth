import Navigation from "@/components/Navigation";
import SEOHead from "@/components/SEOHead";
import EventbriteCTA from "@/components/EventbriteCTA";
import { usePageTracking } from "@/hooks/useAnalytics";
import { Scale, BookOpen, Shield, Landmark, Scroll, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

const sections = [
  {
    icon: Landmark,
    title: "Our Legal Standing",
    content: [
      "Temple Mother Earth operates as a **508(c)(1)(A) sacred ceremony church** under the Internal Revenue Code.",
      "We are a sincere religious organization whose ceremonies and sacramental practices are protected under federal law.",
      "Our organizational structure, governance, and practices are consistent with the requirements of a bona fide religious institution.",
      "We maintain detailed records of our religious practices, membership, and organizational governance as required by law.",
    ],
  },
  {
    icon: Scale,
    title: "Religious Freedom Restoration Act (RFRA)",
    content: [
      "The **Religious Freedom Restoration Act of 1993** (42 U.S.C. § 2000bb et seq.) prohibits the federal government from substantially burdening a person's exercise of religion unless it demonstrates a compelling governmental interest and uses the least restrictive means.",
      "Temple Mother Earth's ceremonial use of plant sacraments constitutes sincere religious practice protected under RFRA.",
      "Our ceremonies are conducted with the highest standards of safety, preparation, and sacred intention — not for recreational or commercial purposes.",
      "Every participant undergoes thorough sacred screening and preparation before engaging in any ceremonial sacrament.",
    ],
  },
  {
    icon: BookOpen,
    title: "First Amendment Protections",
    content: [
      "The **Free Exercise Clause** of the First Amendment guarantees the right to practice one's religion without government interference.",
      "Temple Mother Earth's ceremonies, gatherings, and sacramental practices are expressions of sincere religious belief rooted in ancient traditions.",
      "Our Kemetic, Amazonian, and Earth-based spiritual practices have documented historical and cultural lineage spanning thousands of years.",
      "We honor the sacred traditions of indigenous peoples worldwide while maintaining our own distinct religious identity and practice.",
    ],
  },
  {
    icon: Shield,
    title: "Our Commitment to Safety",
    content: [
      "All ceremonies are facilitated by trained, experienced practitioners with deep knowledge of the sacraments they serve.",
      "Mandatory **sacred intake screening** ensures the physical, psychological, and spiritual readiness of every participant.",
      "Medical contraindications and safety protocols are strictly observed — no exceptions.",
      "Emergency protocols are in place for every ceremony, with facilitators trained in crisis response.",
      "We maintain a strict **21+ age policy** for all sacramental ceremonies.",
    ],
  },
  {
    icon: Scroll,
    title: "Sacramental Framework",
    content: [
      "Our plant sacraments — including Kambo, Cacao, Hapé, Ayahuasca, and others — are used exclusively within structured ceremonial contexts.",
      "Sacraments are never distributed for personal or recreational use outside of ceremony.",
      "Each ceremony follows established ritual protocols rooted in ancestral tradition and adapted for our community's needs.",
      "Participation requires Temple membership, completion of the sacred intake form, and facilitator approval.",
      "All ceremonies are conducted in dedicated sacred space with proper preparation, intention setting, and integration support.",
    ],
  },
  {
    icon: Heart,
    title: "Community Standards",
    content: [
      "All members and participants agree to our **Code of Conduct**, which upholds the dignity, safety, and sacredness of our community.",
      "Confidentiality is paramount — what happens in ceremony stays in ceremony.",
      "We operate on a sliding-scale contribution model to ensure access is not limited by financial means.",
      "Integration support is provided after every ceremony to ensure participants process their experiences safely.",
      "We maintain transparency in our organizational governance and financial stewardship.",
    ],
  },
];

const RFRACompliance = () => {
  usePageTracking();

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="RFRA Compliance | Temple Mother Earth"
        description="Temple Mother Earth's legal framework as a 508(c)(1)(A) sacred ceremony church operating under the Religious Freedom Restoration Act and First Amendment protections."
        path="/rfra-compliance"
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
            Legal Framework
          </motion.p>
          <motion.h1 variants={fadeUp} className="mt-4 font-display text-3xl font-bold text-primary-foreground md:text-5xl">
            RFRA Compliance
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-6 text-lg text-primary-foreground/70 max-w-2xl mx-auto">
            Temple Mother Earth operates as a sincere religious organization under the full protection of federal law. Our sacred ceremonies are protected by the Religious Freedom Restoration Act and the First Amendment.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-primary-foreground/50">
            <span className="border border-primary-foreground/20 rounded-full px-4 py-1.5">508(c)(1)(A)</span>
            <span className="border border-primary-foreground/20 rounded-full px-4 py-1.5">RFRA Protected</span>
            <span className="border border-primary-foreground/20 rounded-full px-4 py-1.5">First Amendment</span>
          </motion.div>
        </motion.div>
      </section>

      {/* Content */}
      <section className="px-4 py-16 md:py-24">
        <div className="mx-auto max-w-3xl space-y-16">
          {sections.map((section) => (
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

          {/* Disclaimer */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            className="rounded-xl border border-muted bg-muted/30 p-8"
          >
            <h2 className="font-display text-lg font-bold text-foreground mb-4">Important Disclaimer</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Temple Mother Earth's ceremonies are conducted as sincere religious practice and are not intended as a substitute for medical, psychological, or psychiatric care. Participation in any ceremony is voluntary and requires completion of our sacred intake screening process. All ceremonies are held in accordance with our religious beliefs and practices, under the protections afforded by the Religious Freedom Restoration Act (RFRA) and the First Amendment of the United States Constitution.
            </p>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            className="text-center space-y-4"
          >
            <p className="text-muted-foreground">
              For questions about our legal framework or religious practices, please reach out.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/contact"
                className="inline-block rounded-lg bg-primary px-8 py-3 font-display text-sm font-semibold uppercase tracking-wider text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Contact Us
              </Link>
              <Link
                to="/conduct"
                className="inline-block rounded-lg border border-primary px-8 py-3 font-display text-sm font-semibold uppercase tracking-wider text-primary hover:bg-primary/10 transition-colors"
              >
                Code of Conduct
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <EventbriteCTA />

      <footer className="bg-foreground px-4 py-12">
        <div className="mx-auto max-w-4xl text-center">
          <p className="font-body text-xs text-primary-foreground/40">
            © {new Date().getFullYear()} Temple Mother Earth. A 508(c)(1)(A) sacred ceremony church. All rights reserved.
          </p>
          <p className="font-body text-xs text-primary-foreground/40 mt-2 max-w-lg mx-auto">
            Temple Mother Earth operates as a religious organization under the protections of the Religious Freedom Restoration Act (RFRA) and the First Amendment of the United States Constitution.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default RFRACompliance;
