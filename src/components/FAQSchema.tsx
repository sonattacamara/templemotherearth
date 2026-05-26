import { Helmet } from "react-helmet-async";

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSchemaProps {
  faqs: FAQItem[];
}

/**
 * Drop-in FAQPage JSON-LD for AEO (Answer Engine Optimization).
 * AI engines (ChatGPT, Perplexity, Google AI Overviews) lift Q&A pairs
 * verbatim into answers with citation when wrapped in FAQPage schema.
 */
const FAQSchema = ({ faqs }: FAQSchemaProps) => {
  if (!faqs?.length) return null;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  );
};

export default FAQSchema;