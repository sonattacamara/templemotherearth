import { motion, type Easing } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar } from "lucide-react";
import Navigation from "@/components/Navigation";
import SEOHead from "@/components/SEOHead";
import { usePageTracking } from "@/hooks/useAnalytics";
import { journalPosts } from "@/data/journalPosts";

const ease: Easing = [0.25, 0.1, 0.25, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

const Journal = () => {
  usePageTracking();

  return (
    <>
      <SEOHead
        title="Transmissions · Temple Mother Earth Journal"
        description="Sacred writings on Kambo detox, Cacao ceremonies, Ayahuasca integration, and plant medicine wisdom from Temple Mother Earth in Washington DC, Maryland, and Virginia."
        path="/journal"
      />
      <Navigation />
      <main className="min-h-screen bg-background pt-24 pb-20">
        {/* Hero */}
        <section className="max-w-4xl mx-auto px-4 mb-16 text-center">
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="font-display text-4xl md:text-5xl text-foreground mb-4"
          >
            Transmissions
          </motion.h1>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.15 }}
            className="font-body text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Reflections from the circle. Wisdom from the Earth. Words carried on sacred breath.
          </motion.p>
        </section>

        {/* Posts */}
        <section className="max-w-4xl mx-auto px-4 space-y-10">
          {journalPosts.map((post, i) => (
            <motion.article
              key={post.slug}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="p-6 md:p-10">
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-3">
                  <Calendar className="h-4 w-4" />
                  <time>{post.date}</time>
                </div>
                <h2 className="font-display text-2xl md:text-3xl text-card-foreground mb-4">
                  {post.title}
                </h2>
                <p className="font-body text-muted-foreground leading-relaxed mb-6">
                  {post.excerpt}
                </p>
                <Link
                  to={`/journal/${post.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
                >
                  Read Full Article <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </motion.article>
          ))}
        </section>
      </main>
    </>
  );
};

export default Journal;
