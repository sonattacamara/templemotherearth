import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title?: string;
  description?: string;
  path?: string;
  type?: string;
  image?: string;
}

const BASE_URL = "https://templemotherearth.lovable.app";
const DEFAULT_TITLE = "Temple Mother Earth — Sacred Healing Sanctuary in Washington, DC";
const DEFAULT_DESC = "Temple Mother Earth is a spiritual sanctuary offering Kambo ceremonies, yoga, meditation, integration circles, and community wellness experiences in Washington, DC.";
const DEFAULT_IMAGE = `${BASE_URL}/favicon.png`;

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
