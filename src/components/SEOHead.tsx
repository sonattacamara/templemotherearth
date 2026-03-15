import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title?: string;
  description?: string;
  path?: string;
  type?: string;
  image?: string;
}

const BASE_URL = "https://templemotherearth.org";
const DEFAULT_TITLE = "Temple Mother Earth — Sacred Ceremony Church · Washington, DC";
const DEFAULT_DESC = "A 508(c)(1)(A) sacred medicine church offering sacramental ceremony, spiritual education, and congregational community in Washington DC. Est. 2020.";
const DEFAULT_IMAGE = `${BASE_URL}/og-image.jpg`;

const SEOHead = ({
  title,
  description = DEFAULT_DESC,
  path = "/",
  type = "website",
  image = DEFAULT_IMAGE,
}: SEOHeadProps) => {
  const fullTitle = title ? `${title} | Temple Mother Earth` : DEFAULT_TITLE;
  const url = `${BASE_URL}${path}`;

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
    </Helmet>
  );
};

export default SEOHead;
