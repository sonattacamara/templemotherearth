import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence, type Easing } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const ease: Easing = [0.25, 0.1, 0.25, 1];
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

interface FAQ {
  q: string;
  a: string;
}

interface FAQCategory {
  title: string;
  faqs: FAQ[];
}

const categories: FAQCategory[] = [
  {
    title: "About Temple Mother Earth",
    faqs: [
      {
        q: "What is Temple Mother Earth?",
        a: "Temple Mother Earth is a sacred ceremony church organized under section 508(c)(1)(A) of the Internal Revenue Code, operating under the Religious Freedom Restoration Act (RFRA). We hold sacred space for Earth Medicine ceremonies, spiritual education, and community gatherings in Washington, DC and beyond.",
      },
      {
        q: "Is this legal?",
        a: "Temple Mother Earth operates as a 508(c)(1)(A) recognized temple under the Religious Freedom Restoration Act (RFRA). Our sacramental use of Earth Medicines is conducted as bona fide religious practice protected under the First Amendment.",
      },
      {
        q: "Where are you located?",
        a: "Temple Mother Earth is based in Washington, DC (SE). We also host traveling ceremonies across the United States and international immersions in Mexico, Costa Rica, Peru, Colombia, and beyond.",
      },
      {
        q: "Who are your facilitators?",
        a: "Our facilitators are experienced practitioners who have walked this path themselves. Each has completed extensive training in Earth Medicine traditions and holds deep reverence for the sacraments they steward. You can learn more on our About page.",
      },
    ],
  },
  {
    title: "Ceremonies & Sacraments",
    faqs: [
      {
        q: "What is Kambo and is it safe?",
        a: "Kambo is the sacred secretion of the Phyllomedusa bicolor (Giant Monkey Tree Frog) used for physical purification, immune system strengthening, and spiritual cleansing. When facilitated by trained practitioners with proper medical screening, Kambo is a safe and powerful sacred ally. All participants must complete our Sacred Intake Form, which screens for contraindications.",
      },
      {
        q: "What is ayahuasca?",
        a: "Ayahuasca (also called Sacred Vine) is a ceremonial brew made from Banisteriopsis caapi and Psychotria viridis, used for thousands of years in Amazonian traditions. It facilitates deep spiritual transformation, visionary experience, and consciousness expansion in a sacred ceremonial setting.",
      },
      {
        q: "What other sacraments do you offer?",
        a: "In addition to Kambo and Ayahuasca, we offer Hapé (sacred snuff), Cacao ceremonies, Sacred Tea ceremonies, Sound Ceremony, and Yin Yoga. Each sacrament serves a unique purpose within the MIND, BODY, SPIRIT framework.",
      },
      {
        q: "Will I hallucinate or lose control?",
        a: "Each sacrament works differently. Kambo does not alter your state of mind, you remain fully conscious. Ayahuasca and other visionary sacraments expand awareness but you are always supported in a sacred container with experienced facilitators. You are never alone.",
      },
    ],
  },
  {
    title: "Preparation & Safety",
    faqs: [
      {
        q: "How do I prepare for a ceremony?",
        a: "Preparation includes following a clean diet for 7 days before ceremony, eliminating alcohol and recreational substances, setting clear intentions, and completing our Sacred Intake Form. Detailed preparation guidelines are available on our Preparation page.",
      },
      {
        q: "What if I am on medications?",
        a: "Certain medications, including SSRIs, MAOIs, blood pressure medications, and others, may be contraindicated with specific Earth Medicines. Please be fully transparent in your Sacred Intake Form. Our facilitators will review your health history before any ceremony.",
      },
      {
        q: "What happens after ceremony?",
        a: "Integration is essential. We offer weekly Integration Circles (Mondays at 7 PM), community support through Telegram circles, and facilitator check-ins. We also provide journaling guidance and dietary recommendations for the days following ceremony.",
      },
    ],
  },
  {
    title: "Membership & Access",
    faqs: [
      {
        q: "Do I need to be a member to attend ceremonies?",
        a: "While membership deepens your connection and access, first-time participants can begin by completing our Sacred Intake Form. Our membership pathway is designed to prepare you for deeper ceremonial work over time, ensuring your safety and readiness.",
      },
      {
        q: "What are the membership tiers?",
        a: "We offer five pathways: Welcome Circle — community access and newsletter. Community Rhythm — full portal access, monthly teachings, ceremony attendance. Environment Collective — daily Qi Gong, replay library, embodiment workshops. Preparation Path — guided 3-month preparation container, ceremony eligibility. Temple Immersion Path — quarterly immersion eligibility, deep integration support. Visit our Membership page to learn about each pathway.",
      },
      {
        q: "How do contributions work?",
        a: "Each offering's sacred contribution is shared at the point of registration via Eventbrite, or — for offerings by application — confirmed during the application process. We operate as a 508(c)(1)(A) sacred ceremony church, and all contributions support our mission. Our Sacred Energy Exchange and scholarship offerings ensure no one is turned away for inability to contribute.",
      },
      {
        q: "Do you offer veteran scholarships?",
        a: "Yes. Our Veterans Transformation Program provides specialized support for veterans, including scholarship opportunities. We believe every warrior deserves access to sacred ceremony. Contact us to learn more about our veteran scholarship fund.",
      },
    ],
  },
  {
    title: "Practical Details",
    faqs: [
      {
        q: "How do I get started?",
        a: "Begin by completing our Sacred Intake Form. This comprehensive screening ensures your safety and allows our facilitators to prepare the appropriate sacred container for your experience. From there, we will guide you to the right ceremony or membership path.",
      },
      {
        q: "What is your cancellation policy?",
        a: "We ask for at least 48 hours notice for cancellations. Due to the sacred preparation required for each ceremony, late cancellations may not be eligible for a full refund. We are always willing to work with you to reschedule.",
      },
      {
        q: "How do I know if sacred ceremony is right for me?",
        a: "We encourage you to begin with our Sacred Intake Form, which helps our facilitators understand your health history, intentions, and readiness. If you are unsure, reach out to us through our Contact page. We are happy to have a conversation to help you discern if this path resonates with you.",
      },
    ],
  },
];

const allFaqs = categories.flatMap((c) => c.faqs);

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: allFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.a,
    },
  })),
};

const HomeFAQ = () => {
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  const toggle = (key: string) =>
    setOpenIndex((prev) => (prev === key ? null : key));

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
          ceremonies, and your sacramental path.
        </motion.p>

        <div className="mt-12 space-y-10">
          {categories.map((category, catIdx) => (
            <motion.div key={catIdx} variants={fadeUp}>
              <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                {category.title}
              </h3>
              <div className="space-y-2">
                {category.faqs.map((faq, faqIdx) => {
                  const key = `${catIdx}-${faqIdx}`;
                  const isOpen = openIndex === key;
                  return (
                    <div
                      key={key}
                      className="rounded-xl border border-border bg-card overflow-hidden"
                    >
                      <button
                        onClick={() => toggle(key)}
                        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                      >
                        <span className="font-display text-sm font-semibold text-foreground md:text-base">
                          {faq.q}
                        </span>
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10">
                          {isOpen ? (
                            <Minus className="h-4 w-4 text-primary" />
                          ) : (
                            <Plus className="h-4 w-4 text-primary" />
                          )}
                        </span>
                      </button>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-5">
                              <p className="text-sm leading-relaxed text-muted-foreground">
                                {faq.a}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default HomeFAQ;
