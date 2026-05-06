import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title?: string;
  description?: string;
  path?: string;
  type?: string;
  image?: string;
}

const BASE_URL = "https://templemotherearth.org";
const DEFAULT_TITLE = "Temple Mother Earth — A Temple of Higher Consciousness · Washington, DC";
const DEFAULT_DESC = "A 508(c)(1)(A) temple of higher consciousness offering sacramental ceremony, spiritual education, and congregational community in Washington DC. Est. 2020.";
const DEFAULT_IMAGE = `${BASE_URL}/og-logo.png`;

const SEOHead = ({
  title,
  description = DEFAULT_DESC,
  path = "/",
  type = "website",
  image = DEFAULT_IMAGE,
}: SEOHeadProps) => {
  const fullTitle = title ? `${title} | Temple Mother Earth` : DEFAULT_TITLE;
  const url = `${BASE_URL}${path}`;

  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": ["Church", "ReligiousOrganization"],
    name: "Temple Mother Earth",
    alternateName: "Temple of Mother Earth",
    url: BASE_URL,
    logo: `${BASE_URL}/og-logo.png`,
    image: DEFAULT_IMAGE,
    description: DEFAULT_DESC,
    foundingDate: "2020",
    address: {
      "@type": "PostalAddress",
      streetAddress: "2415 32nd St SE",
      addressLocality: "Washington",
      addressRegion: "DC",
      postalCode: "20020",
      addressCountry: "US",
    },
    sameAs: [
      "https://www.instagram.com/templemotherearth/",
      "https://www.facebook.com/TempleMotherEarth2020/",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: "askus@templemotherearth.org",
      contactType: "general inquiries",
      areaServed: "US",
      availableLanguage: ["English"],
    },
  };

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Temple Mother Earth" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Organization schema (LLM + Google Knowledge Graph) */}
      <script type="application/ld+json">{JSON.stringify(orgJsonLd)}</script>
    </Helmet>
  );
};

export default SEOHead;
