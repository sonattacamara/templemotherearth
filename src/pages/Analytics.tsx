import { useState, useEffect } from "react";
import { motion, type Easing } from "framer-motion";
import { ArrowLeft, BarChart3, FileText, Eye, TrendingUp, Globe, Smartphone, Monitor, Clock } from "lucide-react";
import { Link, Navigate } from "react-router-dom";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";
import Navigation from "@/components/Navigation";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

const ease: Easing = [0.25, 0.1, 0.25, 1];
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

// Admin check is now enforced server-side via RLS + user_roles table

const CHART_COLORS = [
  "hsl(var(--primary))",
  "hsl(var(--secondary))",
  "hsl(var(--accent))",
  "hsl(var(--muted))",
  "hsl(var(--primary) / 0.6)",
  "hsl(var(--secondary) / 0.6)",
];

const PAGE_NAMES: Record<string, string> = {
  "/": "Homepage", "/about": "About", "/membership": "Membership", "/ceremony-intake": "Sacred Intake",
  "/portal": "Member Portal", "/retreats-inquiry": "Retreats Inquiry", "/traveling-ceremonies": "Traveling Ceremonies",
  "/private-ceremonies": "Private Ceremonies", "/volunteer": "Volunteer", "/join-facilitator": "Facilitator App",
  "/sponsor": "Sponsor", "/preparation": "Preparation", "/conduct": "Code of Conduct",
  "/member/auth": "Member Auth", "/member/education": "Member Education", "/analytics": "Analytics",
};

const FORM_LABELS: Record<string, string> = {
  sacred_intake: "Sacred Intake Form", temple_transmissions: "Temple Transmissions", volunteer: "Volunteer",
  facilitator: "Facilitator Application", sponsor: "Sponsor Inquiry", retreats: "Retreats Inquiry",
  traveling: "Traveling Ceremonies", private: "Private Ceremonies",
};

interface DashboardData {
  totalPageViews: number;
  totalFormSubmissions: number;
  pageViewsByPath: { path: string; count: number }[];
  dailyPageViews: { date: string; count: number }[];
  formSubmissionsByType: { name: string; count: number }[];
  topReferrers: { referrer: string; count: number }[];
  deviceBreakdown: { device: string; count: number }[];
  avgDailyViews: number;
}

const parseDevice = (ua: string | null): string => {
  if (!ua) return "Unknown";
  if (/mobile|android|iphone|ipad/i.test(ua)) return "Mobile";
  if (/tablet/i.test(ua)) return "Tablet";
  return "Desktop";
};

const Analytics = () => {
  const { user, loading: authLoading } = useAuth();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState(30);
  const [isAdmin, setIsAdmin] = useState(false);
  const [roleChecked, setRoleChecked] = useState(false);

  // Check admin role from user_roles table
  useEffect(() => {
    if (!user) { setRoleChecked(true); return; }
    const checkRole = async () => {
      const { data: roles } = await supabase.from("user_roles" as any).select("role").eq("user_id", user.id).eq("role", "admin");
      setIsAdmin(Array.isArray(roles) && roles.length > 0);
      setRoleChecked(true);
    };
    checkRole();
  }, [user]);

  useEffect(() => {
    if (!user || !isAdmin) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const since = new Date();
        since.setDate(since.getDate() - days);
        const sinceStr = since.toISOString();

        const [pvResult, fsResult] = await Promise.all([
          supabase.from("page_views").select("path, created_at, referrer, user_agent").gte("created_at", sinceStr).order("created_at", { ascending: false }).limit(1000),
          supabase.from("form_submissions").select("form_name, created_at").gte("created_at", sinceStr).order("created_at", { ascending: false }).limit(1000),
        ]);

        const pageViews = pvResult.data || [];
        const formSubs = fsResult.data || [];

        // Path counts
        const pathCounts: Record<string, number> = {};
        pageViews.forEach((pv) => { pathCounts[pv.path] = (pathCounts[pv.path] || 0) + 1; });

        // Daily counts
        const dailyCounts: Record<string, number> = {};
        pageViews.forEach((pv) => {
          const day = pv.created_at.split("T")[0];
          dailyCounts[day] = (dailyCounts[day] || 0) + 1;
        });

        // Form counts
        const formCounts: Record<string, number> = {};
        formSubs.forEach((fs) => { formCounts[fs.form_name] = (formCounts[fs.form_name] || 0) + 1; });

        // Referrer counts
        const refCounts: Record<string, number> = {};
        pageViews.forEach((pv) => {
          if (pv.referrer) {
            try {
              const hostname = new URL(pv.referrer).hostname || pv.referrer;
              refCounts[hostname] = (refCounts[hostname] || 0) + 1;
            } catch {
              refCounts[pv.referrer] = (refCounts[pv.referrer] || 0) + 1;
            }
          }
        });

        // Device breakdown
        const deviceCounts: Record<string, number> = {};
        pageViews.forEach((pv) => {
          const device = parseDevice(pv.user_agent);
          deviceCounts[device] = (deviceCounts[device] || 0) + 1;
        });

        const dailyArr = Object.entries(dailyCounts).map(([date, count]) => ({ date, count })).sort((a, b) => a.date.localeCompare(b.date));
        const avgDailyViews = dailyArr.length > 0 ? Math.round(pageViews.length / dailyArr.length) : 0;

        setData({
          totalPageViews: pageViews.length,
          totalFormSubmissions: formSubs.length,
          pageViewsByPath: Object.entries(pathCounts).map(([path, count]) => ({ path, count })).sort((a, b) => b.count - a.count),
          dailyPageViews: dailyArr,
          formSubmissionsByType: Object.entries(formCounts).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count),
          topReferrers: Object.entries(refCounts).map(([referrer, count]) => ({ referrer, count })).sort((a, b) => b.count - a.count).slice(0, 10),
          deviceBreakdown: Object.entries(deviceCounts).map(([device, count]) => ({ device, count })).sort((a, b) => b.count - a.count),
          avgDailyViews,
        });
      } catch (err) {
        console.error("Failed to fetch analytics:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user, isAdmin, days]);

  if (authLoading || !roleChecked) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex min-h-screen items-center justify-center pt-20"><p className="text-muted-foreground">Loading…</p></div>
      </div>
    );
  }

  if (!user || !isAdmin) return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-24 pb-16 px-4">
        <motion.div className="mx-auto max-w-6xl" initial="hidden" animate="visible" variants={stagger}>
          {/* Header */}
          <motion.div variants={fadeUp} className="flex items-center justify-between mb-8 flex-wrap gap-4">
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
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {[1, 2, 3, 4].map((i) => (<div key={i} className="animate-pulse rounded-2xl border border-border bg-card p-6 h-32" />))}
            </div>
          ) : data ? (
            <div className="space-y-8">
              {/* Summary cards */}
              <motion.div variants={fadeUp} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <SummaryCard icon={Eye} label="Page Views" value={data.totalPageViews} />
                <SummaryCard icon={FileText} label="Form Submissions" value={data.totalFormSubmissions} />
                <SummaryCard icon={TrendingUp} label="Avg Daily Views" value={data.avgDailyViews} />
                <SummaryCard icon={Globe} label="Unique Pages" value={data.pageViewsByPath.length} />
              </motion.div>

              {/* Traffic chart */}
              {data.dailyPageViews.length > 1 && (
                <motion.div variants={fadeUp} className="rounded-2xl border border-border bg-card p-6">
                  <h3 className="font-display text-lg font-semibold text-card-foreground mb-4 flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-primary" /> Daily Traffic
                  </h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={data.dailyPageViews}>
                        <defs>
                          <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="date" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} tickFormatter={(v) => v.slice(5)} />
                        <YAxis tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} width={30} />
                        <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "12px" }} />
                        <Area type="monotone" dataKey="count" stroke="hsl(var(--primary))" strokeWidth={2} fill="url(#colorViews)" name="Views" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>
              )}

              <div className="grid gap-6 lg:grid-cols-2">
                {/* Top Pages */}
                <motion.div variants={fadeUp} className="rounded-2xl border border-border bg-card p-6">
                  <h3 className="font-display text-lg font-semibold text-card-foreground mb-4">Top Pages</h3>
                  <div className="space-y-3">
                    {data.pageViewsByPath.slice(0, 10).map((page) => {
                      const pct = data.totalPageViews > 0 ? (page.count / data.totalPageViews) * 100 : 0;
                      return (
                        <div key={page.path}>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm text-muted-foreground">{PAGE_NAMES[page.path] || page.path}</span>
                            <span className="font-body text-sm font-semibold text-card-foreground">{page.count}</span>
                          </div>
                          <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                            <div className="h-full rounded-full bg-primary/60 transition-all" style={{ width: `${pct}%` }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>

                {/* Form Submissions */}
                <motion.div variants={fadeUp} className="rounded-2xl border border-border bg-card p-6">
                  <h3 className="font-display text-lg font-semibold text-card-foreground mb-4">Form Submissions</h3>
                  {data.formSubmissionsByType.length > 0 ? (
                    <div className="space-y-3">
                      {data.formSubmissionsByType.map((form) => {
                        const pct = data.totalFormSubmissions > 0 ? (form.count / data.totalFormSubmissions) * 100 : 0;
                        return (
                          <div key={form.name}>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm text-muted-foreground">{FORM_LABELS[form.name] || form.name}</span>
                              <span className="font-body text-sm font-semibold text-card-foreground">{form.count}</span>
                            </div>
                            <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                              <div className="h-full rounded-full bg-secondary/60 transition-all" style={{ width: `${pct}%` }} />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">No form submissions yet.</p>
                  )}
                </motion.div>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                {/* Device Breakdown */}
                {data.deviceBreakdown.length > 0 && (
                  <motion.div variants={fadeUp} className="rounded-2xl border border-border bg-card p-6">
                    <h3 className="font-display text-lg font-semibold text-card-foreground mb-4 flex items-center gap-2">
                      <Smartphone className="h-5 w-5 text-primary" /> Device Breakdown
                    </h3>
                    <div className="flex items-center gap-8">
                      <div className="w-40 h-40">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie data={data.deviceBreakdown} dataKey="count" nameKey="device" cx="50%" cy="50%" outerRadius={60} innerRadius={35}>
                              {data.deviceBreakdown.map((_, i) => (
                                <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "12px" }} />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="space-y-3 flex-1">
                        {data.deviceBreakdown.map((d, i) => (
                          <div key={d.device} className="flex items-center gap-3">
                            <div className="h-3 w-3 rounded-full" style={{ backgroundColor: CHART_COLORS[i % CHART_COLORS.length] }} />
                            <span className="text-sm text-muted-foreground flex-1">{d.device}</span>
                            <span className="font-body text-sm font-semibold text-card-foreground">{d.count}</span>
                            <span className="text-xs text-muted-foreground">
                              ({data.totalPageViews > 0 ? Math.round((d.count / data.totalPageViews) * 100) : 0}%)
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Top Referrers */}
                {data.topReferrers.length > 0 && (
                  <motion.div variants={fadeUp} className="rounded-2xl border border-border bg-card p-6">
                    <h3 className="font-display text-lg font-semibold text-card-foreground mb-4 flex items-center gap-2">
                      <Globe className="h-5 w-5 text-primary" /> Top Referrers
                    </h3>
                    <div className="space-y-3">
                      {data.topReferrers.map((ref) => (
                        <div key={ref.referrer} className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground truncate max-w-[200px]">{ref.referrer}</span>
                          <span className="font-body text-sm font-semibold text-card-foreground">{ref.count}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
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

/* ── Summary Card Component ── */
const SummaryCard = ({ icon: Icon, label, value }: { icon: any; label: string; value: number }) => (
  <div className="rounded-2xl border border-border bg-card p-6">
    <div className="flex items-center gap-3 mb-2">
      <Icon className="h-5 w-5 text-primary" />
      <span className="text-sm text-muted-foreground">{label}</span>
    </div>
    <p className="font-display text-3xl font-bold text-card-foreground">{value.toLocaleString()}</p>
  </div>
);

export default Analytics;
