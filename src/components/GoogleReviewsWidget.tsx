import { useState, useEffect } from "react";
import { motion, type Easing } from "framer-motion";
import { Star } from "lucide-react";
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

const GoogleReviewsWidget = () => {
  const [data, setData] = useState<ReviewsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data: result, error } = await supabase.functions.invoke("fetch-google-reviews");
        if (error) throw error;
        setData(result);
      } catch (err) {
        console.error("Failed to fetch reviews:", err);
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

  if (!data || !data.reviews?.length) {
    return null;
  }

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
          <p className="mt-1 text-xs text-muted-foreground">{data.totalReviews} reviews on Google</p>
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
    </div>
  );
};

export default GoogleReviewsWidget;
