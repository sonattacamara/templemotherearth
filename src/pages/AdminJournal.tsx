import { useEffect, useMemo, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { AlertTriangle, Eye, CheckCircle2, Archive, Trash2, Edit3, Save, X } from "lucide-react";
import Navigation from "@/components/Navigation";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  post_type: "long" | "short";
  topic_bucket: string | null;
  cta_label: string | null;
  cta_url: string | null;
  status: "draft" | "published" | "archived";
  scheduled_for: string | null;
  published_at: string | null;
  ai_model: string | null;
  created_at: string;
};

const STATUS_FILTERS = ["draft", "published", "archived", "all"] as const;

const AdminJournal = () => {
  const { user, loading: authLoading } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [roleChecked, setRoleChecked] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<typeof STATUS_FILTERS[number]>("draft");
  const [selected, setSelected] = useState<Post | null>(null);
  const [edit, setEdit] = useState<Partial<Post> | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) { setRoleChecked(true); return; }
    (async () => {
      const { data } = await supabase.from("user_roles" as any).select("role").eq("user_id", user.id).eq("role", "admin");
      setIsAdmin(Array.isArray(data) && data.length > 0);
      setRoleChecked(true);
    })();
  }, [user]);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("journal_posts")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(200);
    if (!error && data) setPosts(data as Post[]);
    setLoading(false);
  };

  useEffect(() => {
    if (isAdmin) load();
  }, [isAdmin]);

  const filtered = useMemo(
    () => (filter === "all" ? posts : posts.filter((p) => p.status === filter)),
    [posts, filter]
  );

  const openSheet = (p: Post) => { setSelected(p); setEdit(null); };
  const startEdit = () => selected && setEdit({ ...selected });
  const cancelEdit = () => setEdit(null);

  const saveEdit = async () => {
    if (!edit?.id) return;
    setSaving(true);
    const { error } = await supabase
      .from("journal_posts")
      .update({
        title: edit.title,
        slug: edit.slug,
        excerpt: edit.excerpt,
        body: edit.body,
        cta_label: edit.cta_label,
        cta_url: edit.cta_url,
      })
      .eq("id", edit.id);
    setSaving(false);
    if (error) { toast.error(error.message); return; }
    toast.success("Draft updated");
    setEdit(null);
    await load();
    setSelected((prev) => prev && { ...prev, ...(edit as Post) });
  };

  const setStatus = async (id: string, status: Post["status"]) => {
    const patch: any = { status };
    if (status === "published") patch.published_at = new Date().toISOString();
    const { error } = await supabase.from("journal_posts").update(patch).eq("id", id);
    if (error) { toast.error(error.message); return; }
    toast.success(`Marked ${status}`);
    await load();
    setSelected(null);
  };

  const deletePost = async (id: string) => {
    if (!confirm("Permanently delete this draft?")) return;
    const { error } = await supabase.from("journal_posts").delete().eq("id", id);
    if (error) { toast.error(error.message); return; }
    toast.success("Deleted");
    await load();
    setSelected(null);
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

  return (
    <div className="min-h-screen bg-background">
      <SEOHead title="Journal Review · Admin" description="Review and publish journal drafts" path="/admin/journal" />
      <Navigation />
      <div className="max-w-6xl mx-auto px-4 pt-28 pb-20">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div>
            <h1 className="font-display text-3xl text-foreground">Journal Review</h1>
            <p className="text-muted-foreground text-sm mt-1">{filtered.length} {filter} post{filtered.length === 1 ? "" : "s"}</p>
          </div>
          <div className="flex gap-2 flex-wrap">
            {STATUS_FILTERS.map((s) => (
              <Button key={s} size="sm" variant={filter === s ? "default" : "outline"} onClick={() => setFilter(s)}>
                {s}
              </Button>
            ))}
          </div>
        </div>

        {loading ? (
          <p className="text-muted-foreground">Loading…</p>
        ) : filtered.length === 0 ? (
          <div className="rounded-lg border border-border bg-card p-12 text-center">
            <p className="text-muted-foreground">No {filter} posts yet.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((p) => (
              <div key={p.id} className="rounded-lg border border-border bg-card p-4 flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <Badge variant="secondary">{p.post_type}</Badge>
                    <Badge variant={p.status === "published" ? "default" : p.status === "draft" ? "outline" : "secondary"}>
                      {p.status}
                    </Badge>
                    {p.topic_bucket && <Badge variant="outline">{p.topic_bucket}</Badge>}
                    <span className="text-xs text-muted-foreground">{new Date(p.created_at).toLocaleString()}</span>
                  </div>
                  <h3 className="font-display text-lg text-foreground truncate">{p.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{p.excerpt}</p>
                </div>
                <Button size="sm" variant="outline" onClick={() => openSheet(p)}>
                  <Eye className="h-4 w-4 mr-1" /> Review
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      <Sheet open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <SheetContent side="right" className="w-full sm:max-w-2xl overflow-y-auto">
          {selected && (
            <>
              <SheetHeader>
                <SheetTitle className="font-display text-2xl">{edit ? "Edit Draft" : selected.title}</SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                {edit ? (
                  <>
                    <div>
                      <label className="text-xs uppercase tracking-wider text-muted-foreground">Title</label>
                      <Input value={edit.title ?? ""} onChange={(e) => setEdit({ ...edit, title: e.target.value })} />
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-wider text-muted-foreground">Slug</label>
                      <Input value={edit.slug ?? ""} onChange={(e) => setEdit({ ...edit, slug: e.target.value })} />
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-wider text-muted-foreground">Excerpt</label>
                      <Textarea rows={3} value={edit.excerpt ?? ""} onChange={(e) => setEdit({ ...edit, excerpt: e.target.value })} />
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-wider text-muted-foreground">Body (markdown)</label>
                      <Textarea rows={20} value={edit.body ?? ""} onChange={(e) => setEdit({ ...edit, body: e.target.value })} />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs uppercase tracking-wider text-muted-foreground">CTA Label</label>
                        <Input value={edit.cta_label ?? ""} onChange={(e) => setEdit({ ...edit, cta_label: e.target.value })} />
                      </div>
                      <div>
                        <label className="text-xs uppercase tracking-wider text-muted-foreground">CTA URL</label>
                        <Input value={edit.cta_url ?? ""} onChange={(e) => setEdit({ ...edit, cta_url: e.target.value })} />
                      </div>
                    </div>
                    <div className="flex gap-2 pt-4 border-t border-border">
                      <Button onClick={saveEdit} disabled={saving}><Save className="h-4 w-4 mr-1" />{saving ? "Saving…" : "Save"}</Button>
                      <Button variant="outline" onClick={cancelEdit}><X className="h-4 w-4 mr-1" />Cancel</Button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant="secondary">{selected.post_type}</Badge>
                      <Badge variant={selected.status === "published" ? "default" : "outline"}>{selected.status}</Badge>
                      {selected.topic_bucket && <Badge variant="outline">{selected.topic_bucket}</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground italic">/{selected.slug}</p>
                    <p className="text-base text-foreground">{selected.excerpt}</p>
                    <div className="prose prose-sm max-w-none whitespace-pre-wrap text-foreground/90 border-t border-border pt-4">
                      {selected.body}
                    </div>
                    {selected.cta_label && (
                      <p className="text-sm text-muted-foreground border-t border-border pt-3">
                        <span className="uppercase tracking-wider text-xs">CTA · </span>
                        {selected.cta_label} → {selected.cta_url}
                      </p>
                    )}
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
                      <Button onClick={startEdit} variant="outline"><Edit3 className="h-4 w-4 mr-1" />Edit</Button>
                      {selected.status !== "published" && (
                        <Button onClick={() => setStatus(selected.id, "published")}>
                          <CheckCircle2 className="h-4 w-4 mr-1" />Publish
                        </Button>
                      )}
                      {selected.status !== "archived" && (
                        <Button variant="outline" onClick={() => setStatus(selected.id, "archived")}>
                          <Archive className="h-4 w-4 mr-1" />Archive
                        </Button>
                      )}
                      {selected.status === "archived" && (
                        <Button variant="outline" onClick={() => setStatus(selected.id, "draft")}>
                          Restore to Draft
                        </Button>
                      )}
                      <Button variant="destructive" onClick={() => deletePost(selected.id)}>
                        <Trash2 className="h-4 w-4 mr-1" />Delete
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default AdminJournal;