import { useEffect, useMemo, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { Search, Download, AlertTriangle, Eye, ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import Navigation from "@/components/Navigation";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

type Submission = {
  id: string;
  created_at: string;
  form_name: string;
  metadata: Record<string, any>;
};

const KNOWN_FORMS = [
  "ceremony-intake",
  "volunteer",
  "sponsor",
  "facilitator",
  "contact",
  "veterans",
  "retreats-inquiry",
  "private-ceremony",
  "traveling-ceremony",
  "art-expo",
  "newsletter",
  "sacred-blueprint",
];

const humanizeKey = (k: string) =>
  k.replace(/[_-]/g, " ").replace(/([a-z])([A-Z])/g, "$1 $2").replace(/\b\w/g, (c) => c.toUpperCase());

const formatValue = (v: unknown): string => {
  if (v === null || v === undefined || v === "") return "·";
  if (Array.isArray(v)) return v.length ? v.join(", ") : "·";
  if (typeof v === "boolean") return v ? "Yes" : "No";
  if (typeof v === "object") return JSON.stringify(v, null, 2);
  return String(v);
};

const getName = (m: Record<string, any>) =>
  `${m?.firstName ?? m?.first_name ?? ""} ${m?.lastName ?? m?.last_name ?? ""}`.trim() || (m?.name ?? "");

const AdminSubmissions = () => {
  const { user, loading: authLoading } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [roleChecked, setRoleChecked] = useState(false);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [formFilter, setFormFilter] = useState<string>("all");
  const [days, setDays] = useState<number>(0);
  const [selected, setSelected] = useState<Submission | null>(null);
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 50;

  useEffect(() => {
    if (!user) { setRoleChecked(true); return; }
    (async () => {
      const { data } = await supabase.from("user_roles" as any).select("role").eq("user_id", user.id).eq("role", "admin");
      setIsAdmin(Array.isArray(data) && data.length > 0);
      setRoleChecked(true);
    })();
  }, [user]);

  useEffect(() => {
    if (!isAdmin) return;
    (async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("form_submissions")
        .select("id, created_at, form_name, metadata")
        .order("created_at", { ascending: false })
        .limit(1000);
      if (!error && data) setSubmissions(data as Submission[]);
      setLoading(false);
    })();
  }, [isAdmin]);

  const formNames = useMemo(() => {
    const set = new Set<string>(KNOWN_FORMS);
    submissions.forEach((s) => set.add(s.form_name));
    return Array.from(set).sort();
  }, [submissions]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const cutoff = days > 0 ? Date.now() - days * 86400000 : 0;
    return submissions.filter((s) => {
      const m = s.metadata || {};
      if (cutoff && new Date(s.created_at).getTime() < cutoff) return false;
      if (formFilter !== "all" && s.form_name !== formFilter) return false;
      if (q) {
        const hay = `${getName(m)} ${m.email ?? ""} ${m.phone ?? ""}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [submissions, search, formFilter, days]);

  useEffect(() => { setPage(1); }, [search, formFilter, days]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageRows = useMemo(() => filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE), [filtered, page]);

  const exportCsv = () => {
    const allKeys = new Set<string>(["submitted_at", "form_name"]);
    filtered.forEach((s) => Object.keys(s.metadata || {}).forEach((k) => allKeys.add(k)));
    const headers = Array.from(allKeys);
    const rows = filtered.map((s) => {
      const m = s.metadata || {};
      return headers.map((h) => {
        let v: unknown = "";
        if (h === "submitted_at") v = new Date(s.created_at).toISOString();
        else if (h === "form_name") v = s.form_name;
        else v = m[h];
        const str = v === null || v === undefined ? "" : Array.isArray(v) ? v.join("; ") : typeof v === "object" ? JSON.stringify(v) : String(v);
        return `"${str.replace(/"/g, '""')}"`;
      }).join(",");
    });
    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `submissions-${formFilter}-${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (authLoading || !roleChecked) {
    return <div className="min-h-screen bg-background flex items-center justify-center text-muted-foreground">Loading…</div>;
  }
  if (!user) return <Navigate to="/member/auth" replace />;
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-xl mx-auto pt-32 px-4 text-center">
          <AlertTriangle className="mx-auto h-10 w-10 text-destructive" />
          <h1 className="font-display text-2xl mt-4 text-foreground">Access Denied</h1>
          <p className="text-muted-foreground mt-2">This page is restricted to Temple administrators.</p>
          <Link to="/" className="text-primary underline mt-4 inline-block">Return Home</Link>
        </div>
      </div>
    );
  }

  const selectedEntries = selected ? Object.entries(selected.metadata || {}) : [];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead title="Admin · All Submissions" description="Review all form submissions" path="/admin/submissions" />
      <Navigation />

      <section className="px-4 pt-28 pb-10">
        <div className="mx-auto max-w-7xl">
          <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-4">
            <ArrowLeft className="h-4 w-4" /> Back
          </Link>
          <h1 className="font-display text-3xl text-foreground">All Form Submissions</h1>
          <p className="text-muted-foreground mt-1">
            Every submission across all forms. For the dedicated ceremony intake view, see{" "}
            <Link to="/admin/intakes" className="text-primary underline">/admin/intakes</Link>.
          </p>

          <div className="mt-6 flex flex-wrap gap-3 items-center">
            <div className="relative flex-1 min-w-[240px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search name, email, phone…" className="pl-9" />
            </div>
            <select value={formFilter} onChange={(e) => setFormFilter(e.target.value)} className="rounded-md border border-input bg-background px-3 py-2 text-sm">
              <option value="all">All form types</option>
              {formNames.map((n) => <option key={n} value={n}>{n}</option>)}
            </select>
            <select value={days} onChange={(e) => setDays(Number(e.target.value))} className="rounded-md border border-input bg-background px-3 py-2 text-sm">
              <option value={0}>All time</option>
              <option value={7}>Last 7 days</option>
              <option value={30}>Last 30 days</option>
              <option value={90}>Last 90 days</option>
            </select>
            <Button variant="outline" size="sm" onClick={exportCsv} className="ml-auto">
              <Download className="h-4 w-4 mr-1" /> Export CSV
            </Button>
          </div>

          <div className="mt-6 rounded-xl border border-border bg-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/40 text-muted-foreground">
                  <tr>
                    <th className="text-left px-4 py-2 font-medium">Submitted</th>
                    <th className="text-left px-4 py-2 font-medium">Form</th>
                    <th className="text-left px-4 py-2 font-medium">Name</th>
                    <th className="text-left px-4 py-2 font-medium">Email</th>
                    <th className="text-left px-4 py-2 font-medium">Phone</th>
                    <th className="px-4 py-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {loading && (
                    <tr><td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">Loading…</td></tr>
                  )}
                  {!loading && filtered.length === 0 && (
                    <tr><td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">No submissions match your filters.</td></tr>
                  )}
                  {!loading && pageRows.map((s) => {
                    const m = s.metadata || {};
                    return (
                      <tr key={s.id} className="border-t border-border hover:bg-muted/30 cursor-pointer" onClick={() => setSelected(s)}>
                        <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">{new Date(s.created_at).toLocaleString()}</td>
                        <td className="px-4 py-3"><Badge variant="secondary">{s.form_name}</Badge></td>
                        <td className="px-4 py-3 text-foreground">{getName(m) || "·"}</td>
                        <td className="px-4 py-3 text-foreground">{m.email ?? "·"}</td>
                        <td className="px-4 py-3 text-muted-foreground">{m.phone ?? "·"}</td>
                        <td className="px-4 py-3 text-right">
                          <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); setSelected(s); }}>
                            <Eye className="h-4 w-4 mr-1" /> View
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-between px-4 py-3 text-xs text-muted-foreground border-t border-border">
              <span>{filtered.length} result{filtered.length === 1 ? "" : "s"} · Page {page} of {totalPages}</span>
              <div className="flex gap-1">
                <Button variant="ghost" size="sm" disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" disabled={page >= totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Sheet open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="font-display">
              {selected ? getName(selected.metadata || {}) || "Submission" : "Submission"}
            </SheetTitle>
            <SheetDescription>
              {selected && (
                <>
                  <Badge variant="secondary" className="mr-2">{selected.form_name}</Badge>
                  {new Date(selected.created_at).toLocaleString()}
                </>
              )}
            </SheetDescription>
          </SheetHeader>
          <div className="mt-6 space-y-3">
            {selectedEntries.length === 0 && (
              <p className="text-sm text-muted-foreground">No additional data.</p>
            )}
            {selectedEntries.map(([k, v]) => (
              <div key={k} className="border-b border-border pb-2">
                <div className="text-xs uppercase tracking-wide text-muted-foreground">{humanizeKey(k)}</div>
                <div className="text-sm text-foreground whitespace-pre-wrap break-words mt-0.5">{formatValue(v)}</div>
              </div>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default AdminSubmissions;