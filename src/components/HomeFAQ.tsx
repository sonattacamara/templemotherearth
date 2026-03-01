import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion, type Easing } from "framer-motion";
import { ChevronDown } from "lucide-react";

const ease: Easing = [0.25, 0.1, 0.25, 1];
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

const faqs = [
  {
    q: "What is Kambo and is it safe?",
    a: "Kambo is the sacred secretion of the Phyllomedusa bicolor (Giant Monkey Tree Frog) used for physical detoxification, immune system strengthening, and spiritual purification. When facilitated by trained practitioners with proper medical screening, Kambo is a safe and powerful healing ally. All participants must complete our Sacred Intake Form, which screens for contraindications.",
  },
  {
    q: "What is ayahuasca?",
    a: "Ayahuasca (also called Sacred Vine) is a ceremonial brew made from Banisteriopsis caapi and Psychotria viridis, used for thousands of years in Amazonian healing traditions. It facilitates deep spiritual healing, visionary experience, and consciousness expansion in a sacred ceremonial setting.",
  },
  {
    q: "How do I prepare for a plant medicine ceremony?",
    a: "Preparation includes following a clean diet for 7 days before ceremony, eliminating alcohol and recreational substances, setting clear intentions, and completing our Sacred Intake Form. Detailed preparation guidelines are available on our Preparation page.",
  },
  {
    q: "Do I need to be a member to attend ceremonies?",
    a: "While membership deepens your connection and access, first-time participants can begin by completing our Sacred Intake Form. Our membership pathway is designed to prepare you for deeper ceremonial work over time — ensuring your safety and readiness.",
  },
  {
    q: "What is the cost of ceremonies?",
    a: "Ceremony contributions vary based on the type of experience. We operate as a 501(c)(3) nonprofit, and all contributions are tax-deductible. We also offer a Sacred Energy Exchange program for those who wish to volunteer in exchange for ceremony access. No one is turned away for inability to pay.",
  },
  {
    q: "Where are you located?",
    a: "Temple Mother Earth is based in Washington, DC (SE). We also host traveling ceremonies across the United States and international healing immersions in Mexico, Costa Rica, Peru, Colombia, and beyond.",
  },
  {
    q: "Do you offer veteran discounts or scholarships?",
    a: "Yes. Our Veterans Transformation Program provides specialized support for veterans, including scholarship opportunities. We believe every warrior deserves access to healing. Contact us to learn more about veteran pricing and our scholarship fund.",
  },
  {
    q: "What is your cancellation policy?",
    a: "We ask for at least 48 hours notice for cancellations. Due to the sacred preparation required for each ceremony, late cancellations may not be eligible for a full refund. We are always willing to work with you to reschedule.",
  },
  {
    q: "Is this legal?",
    a: "Temple Mother Earth operates as a 508(c)(1)(A) recognized temple under the Religious Freedom Restoration Act (RFRA). Our sacramental use of Earth Medicines is conducted as bona fide religious practice protected under the First Amendment.",
  },
  {
    q: "How do I know if plant medicine is right for me?",
    a: "We encourage you to begin with our Sacred Intake Form, which helps our facilitators understand your health history, intentions, and readiness. If you're unsure, reach out to us — we're happy to have a conversation to help you discern if this path resonates with you.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.a,
    },
  })),
};

const HomeFAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="px-4 py-14 md:py-20">
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <motion.div
        className="mx-auto max-w-3xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={stagger}
      >
        <motion.p
          variants={fadeUp}
          className="text-center font-body text-xs font-bold uppercase tracking-[0.3em] text-primary mb-4"
        >
          Common Questions
        </motion.p>
        <motion.h2
          variants={fadeUp}
          className="text-center font-display text-3xl font-bold text-foreground md:text-5xl"
        >
          Frequently Asked Questions
        </motion.h2>
        <motion.p
          variants={fadeUp}
          className="mx-auto mt-4 max-w-xl text-center text-muted-foreground"
        >
          Everything you need to know about Temple Mother Earth, our
          ceremonies, and your healing journey.
        </motion.p>

        <div className="mt-12 space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="rounded-xl border border-border bg-card overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span className="font-display text-sm font-semibold text-foreground md:text-base">
                  {faq.q}
                </span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-primary transition-transform duration-200 ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === i && (
                <div className="px-6 pb-5">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {faq.a}
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default HomeFAQ;
