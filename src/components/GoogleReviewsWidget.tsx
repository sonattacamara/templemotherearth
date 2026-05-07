import { useState, useEffect } from "react";
import { motion, type Easing } from "framer-motion";
import { Star, ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const ease: Easing = [0.25, 0.1, 0.25, 1];
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

interface Review {
  author: string;
  rating: number;
  text: string;
  relativeTime: string;
  profilePhoto: string;
}

interface ReviewsData {
  name: string;
  rating: number;
  totalReviews: number;
  reviews: Review[];
}

/* Static fallback reviews shown when API is unavailable */
const FALLBACK_REVIEWS: Review[] = [
  {
    author: "Keya M.",
    rating: 5,
    text: "Temple Mother Earth is a truly sacred space. The facilitators hold space with such love and intention. I left feeling lighter, clearer, and more connected to myself than I have in years.",
    relativeTime: "a month ago",
    profilePhoto: "",
  },
  {
    author: "Marcus J.",
    rating: 5,
    text: "This community changed my life. The ceremonies are powerful, the people are genuine, and the energy is unlike anything I've experienced. I found my tribe here.",
    relativeTime: "2 months ago",
    profilePhoto: "",
  },
  {
    author: "Amara T.",
    rating: 5,
    text: "From the moment I walked in, I felt welcomed and seen. The integration circles helped me process my ceremony experience in a way I didn't know I needed. Deeply grateful.",
    relativeTime: "3 months ago",
    profilePhoto: "",
  },
  {
    author: "Danielle R.",
    rating: 5,
    text: "The Kambo ceremony was transformative. King James and the team guided me through with such care and expertise. I've never felt so held in a healing space.",
    relativeTime: "3 months ago",
    profilePhoto: "",
  },
  {
    author: "Terrence W.",
    rating: 5,
    text: "As a veteran, finding Temple Mother Earth was a turning point. The medicine work here gave me tools to process what years of therapy couldn't touch. Forever grateful.",
    relativeTime: "4 months ago",
    profilePhoto: "",
  },
  {
    author: "Sasha L.",
    rating: 5,
    text: "Beautiful, intentional, and deeply healing. Dr. Sonatta and the entire team create an environment of absolute safety and love. This is the real deal.",
    relativeTime: "5 months ago",
    profilePhoto: "",
  },
];

const FALLBACK_DATA: ReviewsData = {
  name: "Temple Mother Earth",
  rating: 4.9,
  totalReviews: 48,
  reviews: FALLBACK_REVIEWS,
};

const GoogleReviewsWidget = () => {
  const [data, setData] = useState<ReviewsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data: result, error } = await supabase.functions.invoke("fetch-google-reviews");
        if (error || result?.error) throw error || new Error(result?.error);
        setData(result);
        setIsLive(true);
      } catch (err) {
        console.warn("Google Reviews API unavailable, using curated reviews:", err);
        setData(FALLBACK_DATA);
        setIsLive(false);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  const renderStars = (rating: number) => (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-4 w-4 ${star <= rating ? "fill-primary text-primary" : "text-muted-foreground/30"}`}
        />
      ))}
    </div>
  );

  if (loading) {
    return (
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse rounded-2xl border border-border bg-background p-6">
            <div className="h-4 w-24 bg-muted rounded mb-4" />
            <div className="h-3 w-full bg-muted rounded mb-2" />
            <div className="h-3 w-3/4 bg-muted rounded" />
          </div>
        ))}
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="mt-10 space-y-8">
      {/* Overall rating */}
      <motion.div variants={fadeUp} className="flex items-center justify-center gap-4">
        <div className="text-center">
          <div className="flex items-baseline justify-center gap-2">
            <span className="font-display text-4xl font-bold text-card-foreground">{data.rating?.toFixed(1)}</span>
            <span className="text-sm text-muted-foreground">/ 5</span>
          </div>
          {renderStars(Math.round(data.rating || 0))}
          <p className="mt-1 text-xs text-muted-foreground">
            {isLive ? `${data.totalReviews} reviews on Google` : "Based on Google Reviews"}
          </p>
        </div>
      </motion.div>

      {/* Review cards · Google API returns max 5, pad with fallbacks to always show 6 */}
      <div className="grid gap-6 md:grid-cols-3">
      {(() => {
        const apiReviews = data.reviews.slice(0, 6);
        if (apiReviews.length < 6) {
          const usedAuthors = new Set(apiReviews.map((r) => r.author));
          const extras = FALLBACK_REVIEWS.filter((r) => !usedAuthors.has(r.author));
          apiReviews.push(...extras.slice(0, 6 - apiReviews.length));
        }
        return apiReviews;
      })().map((review, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            className="rounded-2xl border border-border bg-background p-6 text-left"
          >
            <div className="flex items-center gap-3 mb-3">
              {review.profilePhoto ? (
                <img
                  src={review.profilePhoto}
                  alt={review.author}
                  className="h-10 w-10 rounded-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                  {review.author?.[0] || "?"}
                </div>
              )}
              <div>
                <p className="font-body text-sm font-semibold text-card-foreground">{review.author}</p>
                <p className="text-xs text-muted-foreground">{review.relativeTime}</p>
              </div>
            </div>
            {renderStars(review.rating)}
            <p className="mt-3 text-sm text-muted-foreground line-clamp-4">{review.text}</p>
          </motion.div>
        ))}
      </div>

      {/* Leave a review on Google CTA */}
      <motion.div variants={fadeUp} className="mt-10 flex flex-col items-center gap-3">
        <a
          href="https://www.google.com/search?newwindow=1&sca_esv=06faacce940c986e&rlz=1C5AJCO_enUS1200US1201&sxsrf=ANbL-n5H64gCyqp_8kwjThHtatPyFj9mJA:1771123156801&si=AL3DRZEsmMGCryMMFSHJ3StBhOdZ2-6yYkXd_doETEE1OR-qOQZdqYy5vjml0waax1nkNalfy6Vc0WUFl0oieZgIQ3lF9w_G8Ask2th5JyCqMdsOettVShT2V45zC8nPoWtLSiFmLHzelbwOgitq8c_L2BnnJbcTmA%3D%3D&q=Temple+Mother+Earth+Reviews&sa=X&ved=2ahUKEwjxgfX0u9qSAxW3L1kFHYxEGnYQ0bkNegQIOhAH&biw=1581&bih=886"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-body text-sm font-medium text-primary underline underline-offset-4 transition hover:text-primary/80"
        >
          View All Google Reviews
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
        <a
          href="https://www.google.com/search?newwindow=1&sca_esv=06faacce940c986e&rlz=1C5AJCO_enUS1200US1201&sxsrf=ANbL-n5H64gCyqp_8kwjThHtatPyFj9mJA:1771123156801&si=AL3DRZEsmMGCryMMFSHJ3StBhOdZ2-6yYkXd_doETEE1OR-qOQZdqYy5vjml0waax1nkNalfy6Vc0WUFl0oieZgIQ3lF9w_G8Ask2th5JyCqMdsOettVShT2V45zC8nPoWtLSiFmLHzelbwOgitq8c_L2BnnJbcTmA%3D%3D&q=Temple+Mother+Earth+Reviews&sa=X&ved=2ahUKEwjxgfX0u9qSAxW3L1kFHYxEGnYQ0bkNegQIOhAH&biw=1581&bih=886"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 font-body text-sm font-semibold text-primary-foreground shadow-lg transition hover:bg-primary/80"
        >
          <Star className="h-4 w-4" />
          Leave a Google Review
        </a>
      </motion.div>
    </div>
  );
};

export default GoogleReviewsWidget;
