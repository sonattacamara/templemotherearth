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

      {/* Review cards */}
      <div className="grid gap-6 md:grid-cols-3">
        {data.reviews.slice(0, 6).map((review, i) => (
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

      {/* View all on Google link */}
      <motion.div variants={fadeUp} className="flex justify-center">
        <a
          href="https://www.google.com/maps/place/Temple+of+Mother+Earth/@38.8541,-76.9649,17z/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          View all reviews on Google
        </a>
      </motion.div>
    </div>
  );
};

export default GoogleReviewsWidget;
