import { useEffect, useMemo, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { AlertTriangle, TrendingUp, Loader2 } from "lucide-react";
import Navigation from "@/components/Navigation";
import SEOHead from "@/components/SEOHead";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

type Row = { created_at: string; path: string; referrer: string | null };
type DaySummary = {
  day: string;
  views: number;
  trailingAvg: number;
  ratio: number;
  topPaths: { path: string; hits: number }[];
  topSources: { source: string; hits: number }[];
};

const sourceFromReferrer = (r: string | null) => {
  if (!r) return "(direct)";
  try {
    return new URL(r).hostname.replace(/^www\./, "");
  } catch {
    return "(direct)";
  }
};

const AdminAnalyticsPeaks = () => {
  const { user, loading: authLoading } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [roleChecked, setRoleChecked] = useState(false);
  const [rows, setRows] = useState<Row[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { setRoleChecked(true); return; }
    (async () => {
      const { data } = await supabase
        .from("user_roles" as any)
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin");
      setIsAdmin(Array.isArray(data) && data.length > 0);
      setRoleChecked(true);
    })();
  }, [user]);

  useEffect(() => {
    if (!isAdmin) return;
    (async () => {
      setLoading(true);
      const since = new Date();
      since.setDate(since.getDate() - 60);
      // page_views can have many rows; chunk via range to bypass 1000-row default
      const pageSize = 1000;
      let all: Row[] = [];
      for (let i = 0; i < 20; i++) {
        const { data, error } = await supabase
          .from("page_views")
          .select("created_at, path, referrer")
          .gte("created_at", since.toISOString())
          .order("created_at", { ascending: false })
          .range(i * pageSize, i * pageSize + pageSize - 1);
        if (error || !data || data.length === 0) break;
        all = all.concat(data as Row[]);
        if (data.length < pageSize) break;
      }
      setRows(all);
      setLoading(false);
    })();
  }, [isAdmin]);

  const days = useMemo<DaySummary[]>(() => {
    if (!rows) return [];
    const byDay = new Map<string, Row[]>();
    for (const r of rows) {
      const day = new Date(r.created_at).toISOString().slice(0, 10);
      if (!byDay.has(day)) byDay.set(day, []);
      byDay.get(day)!.push(r);
    }
    const sortedDays = Array.from(byDay.keys()).sort();
    return sortedDays.map((day, idx) => {
      const dayRows = byDay.get(day)!;
      const views = dayRows.length;
      const window = sortedDays.slice(Math.max(0, idx - 7), idx);
      const windowViews = window.map((d) => byDay.get(d)!.length);
      const trailingAvg = windowViews.length
        ? windowViews.reduce((a, b) => a + b, 0) / windowViews.length
        : 0;
      const ratio = trailingAvg ? views / trailingAvg : 0;

      const pathCount = new Map<string, number>();
      const sourceCount = new Map<string, number>();
      for (const r of dayRows) {
        pathCount.set(r.path, (pathCount.get(r.path) || 0) + 1);
        const s = sourceFromReferrer(r.referrer);
        sourceCount.set(s, (sourceCount.get(s) || 0) + 1);
      }
      const topPaths = Array.from(pathCount.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([path, hits]) => ({ path, hits }));
      const topSources = Array.from(sourceCount.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([source, hits]) => ({ source, hits }));

      return { day, views, trailingAvg, ratio, topPaths, topSources };
    }).reverse();
  }, [rows]);

  const peaks = days.filter((d) => d.trailingAvg > 0 && d.ratio >= 1.4);

  if (authLoading || !roleChecked) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center text-muted-foreground">
        Loading…
      </div>
    );
  }
  if (!user) return <Navigate to="/member/auth" replace />;
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-xl mx-auto pt-32 px-4 text-center">
          <AlertTriangle className="mx-auto h-10 w-10 text-destructive" />
          <h1 className="font-display text-2xl mt-4 text-foreground">Access Denied</h1>
          <p className="text-muted-foreground mt-2">
            This page is restricted to Temple administrators.
          </p>
          <Link to="/" className="text-primary underline mt-4 inline-block">
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Traffic Peaks · Admin"
        description="Identify and attribute traffic spikes"
        path="/admin/analytics-peaks"
      />
      <Navigation />
      <div className="max-w-6xl mx-auto px-4 pt-28 pb-20">
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <TrendingUp className="h-7 w-7 text-primary" />
            <h1 className="font-display text-3xl text-foreground">Traffic Peaks</h1>
          </div>
          <p className="text-muted-foreground text-sm mt-2 max-w-2xl">
            Days with traffic at 1.4x or more above the trailing 7-day average. Use the top
            sources and top paths to identify what drove each spike, then repeat what works.
          </p>
        </div>

        {loading ? (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" /> Loading 60 days of traffic data…
          </div>
        ) : peaks.length === 0 ? (
          <div className="rounded-lg border border-border bg-card p-12 text-center">
            <p className="text-muted-foreground">No spike days detected in the last 60 days.</p>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              {peaks.length} spike day{peaks.length === 1 ? "" : "s"} found
            </p>
            {peaks.map((d) => (
              <div
                key={d.day}
                className="rounded-lg border border-border bg-card p-5"
              >
                <div className="flex items-start justify-between flex-wrap gap-3 mb-4">
                  <div>
                    <h2 className="font-display text-xl text-foreground">
                      {new Date(d.day + "T12:00:00").toLocaleDateString("en-US", {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      {d.views} views · trailing avg {d.trailingAvg.toFixed(1)}
                    </p>
                  </div>
                  <Badge
                    variant={d.ratio >= 3 ? "default" : "secondary"}
                    className="text-sm"
                  >
                    {d.ratio.toFixed(1)}x baseline
                  </Badge>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                      Top Sources
                    </p>
                    <ul className="space-y-1 text-sm">
                      {d.topSources.map((s) => (
                        <li key={s.source} className="flex justify-between text-foreground/90">
                          <span className="truncate">{s.source}</span>
                          <span className="text-muted-foreground tabular-nums ml-3">
                            {s.hits}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                      Top Paths
                    </p>
                    <ul className="space-y-1 text-sm">
                      {d.topPaths.map((p) => (
                        <li key={p.path} className="flex justify-between text-foreground/90">
                          <span className="truncate">{p.path}</span>
                          <span className="text-muted-foreground tabular-nums ml-3">
                            {p.hits}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminAnalyticsPeaks;