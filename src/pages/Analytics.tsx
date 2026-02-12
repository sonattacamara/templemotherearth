import { useState, useEffect } from "react";
import { motion, type Easing } from "framer-motion";
import { ArrowLeft, BarChart3, FileText, Eye, TrendingUp } from "lucide-react";
import { Link, Navigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

const ease: Easing = [0.25, 0.1, 0.25, 1];
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

interface DashboardData {
  totalPageViews: number;
  totalFormSubmissions: number;
  pageViewsByPath: { path: string; count: number }[];
  dailyPageViews: { date: string; count: number }[];
  formSubmissionsByType: { name: string; count: number }[];
}

const ADMIN_EMAILS = ["askus@templemotherearth.org", "admin@templemotherearth.org"];

const Analytics = () => {
  const { user, loading: authLoading } = useAuth();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState(30);

  const isAdmin = user?.email && ADMIN_EMAILS.includes(user.email.toLowerCase());

  useEffect(() => {
    if (!user || !isAdmin) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const since = new Date();
        since.setDate(since.getDate() - days);
        const sinceStr = since.toISOString();

        const [pvResult, fsResult] = await Promise.all([
          supabase.from("page_views").select("path, created_at").gte("created_at", sinceStr).order("created_at", { ascending: false }).limit(1000),
          supabase.from("form_submissions").select("form_name, created_at").gte("created_at", sinceStr).order("created_at", { ascending: false }).limit(1000),
        ]);

        const pageViews = pvResult.data || [];
        const formSubs = fsResult.data || [];

        const pathCounts: Record<string, number> = {};
        pageViews.forEach((pv) => { pathCounts[pv.path] = (pathCounts[pv.path] || 0) + 1; });

        const dailyCounts: Record<string, number> = {};
        pageViews.forEach((pv) => {
          const day = pv.created_at.split("T")[0];
          dailyCounts[day] = (dailyCounts[day] || 0) + 1;
        });

        const formCounts: Record<string, number> = {};
        formSubs.forEach((fs) => { formCounts[fs.form_name] = (formCounts[fs.form_name] || 0) + 1; });

        setData({
          totalPageViews: pageViews.length,
          totalFormSubmissions: formSubs.length,
          pageViewsByPath: Object.entries(pathCounts).map(([path, count]) => ({ path, count })).sort((a, b) => b.count - a.count),
          dailyPageViews: Object.entries(dailyCounts).map(([date, count]) => ({ date, count })).sort((a, b) => a.date.localeCompare(b.date)),
          formSubmissionsByType: Object.entries(formCounts).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count),
        });
      } catch (err) {
        console.error("Failed to fetch analytics:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user, isAdmin, days]);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex min-h-screen items-center justify-center pt-20"><p className="text-muted-foreground">Loading…</p></div>
      </div>
    );
  }

  if (!user || !isAdmin) return <Navigate to="/" replace />;

  const formatPath = (path: string) => {
    const names: Record<string, string> = {
      "/": "Homepage", "/about": "About", "/membership": "Membership", "/ceremony-intake": "Sacred Intake",
      "/portal": "Member Portal", "/retreats-inquiry": "Retreats Inquiry", "/traveling-ceremonies": "Traveling Ceremonies",
      "/private-ceremonies": "Private Ceremonies", "/volunteer": "Volunteer", "/join-facilitator": "Facilitator App",
      "/sponsor": "Sponsor", "/preparation": "Preparation", "/conduct": "Code of Conduct",
    };
    return names[path] || path;
  };

  const formLabel = (name: string) => {
    const labels: Record<string, string> = {
      sacred_intake: "Sacred Intake Form", temple_transmissions: "Temple Transmissions", volunteer: "Volunteer",
      facilitator: "Facilitator Application", sponsor: "Sponsor Inquiry", retreats: "Retreats Inquiry",
      traveling: "Traveling Ceremonies", private: "Private Ceremonies",
    };
    return labels[name] || name;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-24 pb-16 px-4">
        <motion.div className="mx-auto max-w-6xl" initial="hidden" animate="visible" variants={stagger}>
          <motion.div variants={fadeUp} className="flex items-center justify-between mb-8">
            <div>
              <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-2">
                <ArrowLeft className="h-4 w-4" /> Back to Site
              </Link>
              <h1 className="font-display text-3xl font-bold text-foreground">Analytics Dashboard</h1>
              <p className="text-sm text-muted-foreground mt-1">Site activity for the last {days} days</p>
            </div>
            <div className="flex gap-2">
              {[7, 30, 90].map((d) => (
                <button key={d} onClick={() => setDays(d)}
                  className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${days === d ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:text-foreground border border-border"}`}
                >{d}d</button>
              ))}
            </div>
          </motion.div>

          {loading ? (
            <div className="grid gap-6 md:grid-cols-2">
              {[1, 2, 3, 4].map((i) => (<div key={i} className="animate-pulse rounded-2xl border border-border bg-card p-6 h-48" />))}
            </div>
          ) : data ? (
            <div className="space-y-8">
              <motion.div variants={fadeUp} className="grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-border bg-card p-6">
                  <div className="flex items-center gap-3 mb-2"><Eye className="h-5 w-5 text-primary" /><span className="text-sm text-muted-foreground">Page Views</span></div>
                  <p className="font-display text-3xl font-bold text-card-foreground">{data.totalPageViews.toLocaleString()}</p>
                </div>
                <div className="rounded-2xl border border-border bg-card p-6">
                  <div className="flex items-center gap-3 mb-2"><FileText className="h-5 w-5 text-primary" /><span className="text-sm text-muted-foreground">Form Submissions</span></div>
                  <p className="font-display text-3xl font-bold text-card-foreground">{data.totalFormSubmissions.toLocaleString()}</p>
                </div>
                <div className="rounded-2xl border border-border bg-card p-6">
                  <div className="flex items-center gap-3 mb-2"><TrendingUp className="h-5 w-5 text-primary" /><span className="text-sm text-muted-foreground">Unique Pages</span></div>
                  <p className="font-display text-3xl font-bold text-card-foreground">{data.pageViewsByPath.length}</p>
                </div>
              </motion.div>

              {data.dailyPageViews.length > 0 && (
                <motion.div variants={fadeUp} className="rounded-2xl border border-border bg-card p-6">
                  <h3 className="font-display text-lg font-semibold text-card-foreground mb-4 flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-primary" /> Daily Page Views
                  </h3>
                  <div className="flex items-end gap-1 h-32">
                    {data.dailyPageViews.map((day) => {
                      const max = Math.max(...data.dailyPageViews.map((d) => d.count));
                      const height = max > 0 ? (day.count / max) * 100 : 0;
                      return (
                        <div key={day.date} className="flex-1 flex flex-col items-center gap-1 group">
                          <span className="text-[10px] text-muted-foreground opacity-0 group-hover:opacity-100 transition">{day.count}</span>
                          <div className="w-full bg-primary/80 rounded-t transition-all hover:bg-primary min-h-[2px]" style={{ height: `${Math.max(height, 2)}%` }} />
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="text-[10px] text-muted-foreground">{data.dailyPageViews[0]?.date}</span>
                    <span className="text-[10px] text-muted-foreground">{data.dailyPageViews[data.dailyPageViews.length - 1]?.date}</span>
                  </div>
                </motion.div>
              )}

              <div className="grid gap-6 md:grid-cols-2">
                <motion.div variants={fadeUp} className="rounded-2xl border border-border bg-card p-6">
                  <h3 className="font-display text-lg font-semibold text-card-foreground mb-4">Top Pages</h3>
                  <div className="space-y-3">
                    {data.pageViewsByPath.slice(0, 10).map((page) => (
                      <div key={page.path} className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">{formatPath(page.path)}</span>
                        <span className="font-body text-sm font-semibold text-card-foreground">{page.count}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <motion.div variants={fadeUp} className="rounded-2xl border border-border bg-card p-6">
                  <h3 className="font-display text-lg font-semibold text-card-foreground mb-4">Form Submissions</h3>
                  {data.formSubmissionsByType.length > 0 ? (
                    <div className="space-y-3">
                      {data.formSubmissionsByType.map((form) => (
                        <div key={form.name} className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">{formLabel(form.name)}</span>
                          <span className="font-body text-sm font-semibold text-card-foreground">{form.count}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">No form submissions yet.</p>
                  )}
                </motion.div>
              </div>
            </div>
          ) : (
            <p className="text-muted-foreground text-center">Failed to load analytics data.</p>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Analytics;
