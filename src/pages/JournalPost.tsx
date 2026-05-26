import { useParams, Link } from "react-router-dom";
import { motion, type Easing } from "framer-motion";
import { ArrowLeft, Calendar, Heart, ArrowRight } from "lucide-react";
import { Helmet } from "react-helmet-async";
import Navigation from "@/components/Navigation";
import SEOHead from "@/components/SEOHead";
import { journalPosts } from "@/data/journalPosts";

const ease: Easing = [0.25, 0.1, 0.25, 1];
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

const JournalPost = () => {
  const { slug } = useParams();
  const post = journalPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex flex-col items-center justify-center pt-32 pb-20 px-4 text-center">
          <h1 className="font-display text-3xl font-bold text-foreground mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-8">The article you're looking for doesn't exist.</p>
          <Link
            to="/journal"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-body text-sm font-semibold text-primary-foreground transition hover:bg-primary/80"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Journal
          </Link>
        </div>
      </div>
    );
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: "Sonatta",
      jobTitle: "Founder & High Priestess",
      affiliation: {
        "@type": "Organization",
        name: "Temple Mother Earth",
      },
      url: "https://templemotherearth.org/about",
    },
    publisher: {
      "@type": "Organization",
      name: "Temple Mother Earth",
      logo: {
        "@type": "ImageObject",
        url: "https://templemotherearth.org/og-logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://templemotherearth.org/journal/${post.slug}`,
    },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "article p"],
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://templemotherearth.org/" },
      { "@type": "ListItem", position: 2, name: "Journal", item: "https://templemotherearth.org/journal" },
      { "@type": "ListItem", position: 3, name: post.title, item: `https://templemotherearth.org/journal/${post.slug}` },
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead title={post.title} description={post.excerpt} path={`/journal/${post.slug}`} type="article" />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
      </Helmet>
      <Navigation />

      <main className="pt-24 pb-20">
        <article className="mx-auto max-w-3xl px-4">
          <Link
            to="/journal"
            className="inline-flex items-center gap-2 text-sm text-primary hover:underline mb-8"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Journal
          </Link>

          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
              <Calendar className="h-4 w-4" />
              <time>{post.date}</time>
              <span className="mx-2 opacity-50">·</span>
              <span>By <Link to="/about" className="text-primary hover:underline">Sonatta</Link>, Founder & High Priestess</span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-6 leading-tight">
              {post.title}
            </h1>
            <p className="font-body text-lg text-muted-foreground leading-relaxed mb-10 border-l-4 border-primary/30 pl-6 italic">
              {post.excerpt}
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="font-body text-foreground/90 leading-relaxed space-y-4"
          >
            {post.body.split("\n\n").map((paragraph, idx) => {
              if (paragraph.startsWith("**") && paragraph.endsWith("**")) {
                return (
                  <h3 key={idx} className="font-display text-xl text-foreground mt-8 mb-3">
                    {paragraph.replace(/\*\*/g, "")}
                  </h3>
                );
              }
              return (
                <p key={idx} className="leading-relaxed">
                  {paragraph.replace(/\*\*/g, "")}
                </p>
              );
            })}
          </motion.div>

          <div className="mt-12 pt-8 border-t border-border flex flex-wrap gap-4">
            {post.slug.includes("kambo") ? (
              <Link
                to="/kambo"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 font-body text-sm font-semibold text-primary-foreground transition hover:bg-primary/80"
              >
                <Heart className="h-4 w-4" /> Learn More About Kambo <ArrowRight className="h-4 w-4" />
              </Link>
            ) : post.slug.includes("integration") ? (
              <a
                href="https://integration.templemotherearth.org"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 font-body text-sm font-semibold text-primary-foreground transition hover:bg-primary/80"
              >
                <Heart className="h-4 w-4" /> Enter the Integration Portal <ArrowRight className="h-4 w-4" />
              </a>
            ) : (
              <a
                href="https://www.eventbrite.com/o/temple-of-mother-earth-29347213477"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 font-body text-sm font-semibold text-primary-foreground transition hover:bg-primary/80"
              >
                <Heart className="h-4 w-4" /> Register for Upcoming Ceremonies <ArrowRight className="h-4 w-4" />
              </a>
            )}
          </div>
        </article>
      </main>

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

export default JournalPost;
