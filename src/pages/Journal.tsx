import { motion, type Easing } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Heart, Calendar } from "lucide-react";
import Navigation from "@/components/Navigation";
import SEOHead from "@/components/SEOHead";
import { usePageTracking } from "@/hooks/useAnalytics";

const ease: Easing = [0.25, 0.1, 0.25, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

const posts = [
  {
    slug: "opening-the-heart-cacao-ceremony-2026",
    title: "Opening the Heart: Our First Cacao Ceremony of the Year",
    date: "March 15, 2026",
    excerpt:
      "As the Spring Equinox approaches, we return to the circle. This Wednesday marks the opening of our 2026 Cacao season — a ceremony rooted in the frequency of the heart, community, and remembrance.",
    image: "/src/assets/offering-ceremony.jpg",
    body: `The heart knows before the mind can catch up. That is the medicine of Cacao — Mama Cacao, as she is called in the Mesoamerican traditions that have honored her for thousands of years.

This Wednesday, Temple Mother Earth opens the 2026 ceremonial season with our first Cacao Ceremony. It is not a coincidence that this falls near the Spring Equinox — a moment when light and dark find balance, when seeds buried in winter darkness finally push toward the sun.

**What is Ceremonial Cacao?**

Ceremonial-grade Cacao is not the processed chocolate you find on store shelves. It is minimally processed, stone-ground, and prepared with intention. The active compound theobromine — literally "food of the gods" — gently opens the cardiovascular system, increases blood flow, and creates a warm, expansive feeling in the chest. Combined with sacred intention, breathwork, and community, Cacao becomes a powerful heart-opening medicine.

**The Frequency of the Heart**

In our ceremonies, we work with Cacao as a bridge. A bridge between the thinking mind and the feeling heart. A bridge between isolation and community. A bridge between who you have been and who you are becoming.

Many of our community members describe Cacao ceremonies as the most gentle yet profound entry point into sacred medicine work. There is no purging, no intensity — only warmth, connection, music, and the quiet courage to feel.

**Returning to the Circle**

For six years, this community has gathered in circle. Through a global pandemic, through personal storms, through seasons of grief and seasons of joy. The circle holds it all.

This Wednesday, we invite you back. Whether you are a seasoned ceremonial participant or someone feeling the first whisper of curiosity — you belong here. The circle is not complete without you.

Come home to your heart. Come home to the circle.

🌿 *Registration is open on our events page.*`,
  },
];

const Journal = () => {
  usePageTracking();

  return (
    <>
      <SEOHead
        title="Transmissions — Temple Mother Earth Journal"
        description="Sacred writings, ceremony reflections, and plant medicine wisdom from Temple Mother Earth in Washington, DC."
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
          {posts.map((post, i) => (
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
                <div className="font-body text-card-foreground/90 leading-relaxed whitespace-pre-line space-y-4">
                  {post.body.split("\n\n").map((paragraph, idx) => {
                    if (paragraph.startsWith("**") && paragraph.endsWith("**")) {
                      return (
                        <h3 key={idx} className="font-display text-xl text-card-foreground mt-6 mb-2">
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
                </div>
                <div className="mt-8 pt-6 border-t border-border">
                  <a
                    href="https://www.eventbrite.com/o/temple-of-mother-earth-29347213477"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 font-body text-sm font-semibold text-primary-foreground transition hover:bg-primary/80"
                  >
                    <Heart className="h-4 w-4" />
                    Register for the Cacao Ceremony
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </section>
      </main>
    </>
  );
};

export default Journal;
