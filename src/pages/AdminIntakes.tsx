import { useEffect, useMemo, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { Search, Download, AlertTriangle, Eye, ArrowLeft, Filter, ArrowUp, ArrowDown, ChevronsUpDown, ChevronLeft, ChevronRight } from "lucide-react";
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

const FLAGGED_CONDITIONS = [
  "Schizophrenia or schizoaffective disorder",
  "Bipolar disorder",
  "History of psychosis",
  "Seizure disorder or epilepsy",
  "Currently pregnant or possibility of pregnancy",
  "History of aneurysm",
  "History of stroke",
];

const isFlagged = (m: Record<string, any>): boolean => {
  const conds: string[] = Array.isArray(m?.selectedConditions) ? m.selectedConditions : [];
  if (conds.some((c) => FLAGGED_CONDITIONS.includes(c))) return true;
  const kamboFlags = ["kamboSurgery","kamboPacemaker","kamboStroke","kamboAddisons","kamboClotting","kamboTransplant","kamboImplants","kamboBufo28"];
  if (kamboFlags.some((k) => m?.[k] === "yes")) return true;
  if (m?.takingPsychMeds === "yes" || m?.recentPsychMeds === "yes") return true;
  return false;
};

const SECTIONS: Array<{ title: string; fields: Array<[string, string]> }> = [
  {
    title: "Personal",
    fields: [
      ["firstName", "First Name"], ["lastName", "Last Name"], ["email", "Email"],
      ["phone", "Phone"], ["dob", "Date of Birth"], ["pronouns", "Pronouns"],
      ["cityState", "City/State"], ["armedForcesStatus", "Armed Forces"],
    ],
  },
  {
    title: "Emergency Contact",
    fields: [
      ["emergencyName", "Name"], ["emergencyPhone", "Phone"], ["emergencyRelation", "Relationship"],
    ],
  },
  {
    title: "Ceremony Selection",
    fields: [
      ["ceremonyType", "Ceremony"], ["experienceLevel", "Experience Level"],
      ["intentions", "Intentions"], ["howHeard", "How Heard"], ["howHeardOther", "How Heard (other)"],
      ["referralName", "Referral"], ["currentChallenges", "Current Challenges"],
      ["traumaTriggers", "Trauma Triggers"], ["questionsOrConcerns", "Questions/Concerns"],
    ],
  },
  {
    title: "Medications",
    fields: [
      ["takingMedications", "Currently on medications"], ["medicationsList", "Medications List"],
      ["takingPsychMeds", "Psych Meds"], ["psychMedsList", "Psych Meds List"],
      ["recentPsychMeds", "Recent Psych Meds (30d)"], ["recentPsychMedsDetails", "Details"],
      ["takingBloodThinners", "Blood Thinners"], ["takingImmunosuppressants", "Immunosuppressants"],
      ["canStopMedications", "Can stop meds"], ["canStopMedicationsDetails", "Details"],
      ["terminalCondition", "Terminal Condition"], ["terminalConditionDetails", "Details"],
      ["tobaccoAdverseReaction", "Tobacco Adverse Reaction"],
    ],
  },
  {
    title: "Mental Health",
    fields: [
      ["psychiatricHospital", "Psychiatric Hospitalization"], ["psychiatricHospitalDetails", "Details"],
      ["suicidalIdeation", "Suicidal Ideation"], ["suicidalIdeationDetails", "Details"],
      ["psychoticEpisodes", "Psychotic Episodes"], ["psychoticEpisodesDetails", "Details"],
      ["inTherapy", "In Therapy"], ["therapistName", "Therapist"],
      ["recentTrauma", "Recent Trauma (6mo)"], ["recentTraumaDetails", "Details"],
      ["emotionalStability", "Emotional Stability (1-10)"],
    ],
  },
  {
    title: "Substances",
    fields: [
      ["recreationalDrugs", "Non-sacramental substances"], ["recreationalDrugsDetails", "Details"],
      ["consumeAlcohol", "Alcohol"], ["alcoholFrequency", "Alcohol Frequency"],
      ["useCannabis", "Cannabis"], ["cannabisFrequency", "Cannabis Frequency"],
      ["substanceAbuseTreatment", "Treatment History"], ["substanceAbuseTreatmentDetails", "Details"],
      ["recentPsychedelics", "Recent Psychedelics (30d)"], ["recentPsychedelicsDetails", "Details"],
      ["recentSubstances", "Last 48h"],
    ],
  },
  {
    title: "Allergies & Body",
    fields: [
      ["hasAllergies", "Allergies"], ["allergiesList", "List"],
      ["frogAllergy", "Frog/Amphibian Allergy"],
      ["foodSensitivities", "Food Sensitivities"], ["foodSensitivitiesDetails", "Details"],
      ["weight", "Weight (lbs)"], ["heightFeet", "Height (ft)"], ["heightInches", "Height (in)"],
      ["hasFasted", "Fasted Before"], ["fastDuration", "Fast Duration"],
      ["mobilityLimitations", "Mobility Limits"], ["mobilityDetails", "Details"],
      ["difficultyFloor", "Difficulty Sitting on Floor"],
    ],
  },
  {
    title: "Conditions",
    fields: [
      ["selectedConditions", "Selected Conditions"], ["conditionDetails", "Details"],
    ],
  },
  {
    title: "Previous Ceremony",
    fields: [
      ["ceremonyExperienceLevel", "Experience Level"],
      ["previousMedicines", "Medicines worked with"], ["previousMedicineOther", "Other"],
      ["previousExperienceDetails", "Details"],
      ["adverseReaction", "Adverse Reaction"], ["adverseReactionDetails", "Details"],
    ],
  },
  {
    title: "Kambo (if applicable)",
    fields: [
      ["hadKamboBefore", "Had Kambo Before"], ["kamboTimes", "Times"], ["lastKamboDate", "Last Kambo"],
      ["kamboSurgery", "Surgery 6mo"], ["kamboPacemaker", "Pacemaker"], ["kamboStroke", "Stroke"],
      ["kamboAddisons", "Addison's"], ["kamboClotting", "Clotting"], ["kamboTransplant", "Transplant"],
      ["kamboImplants", "Implants"], ["kamboWaterFast", "Water Fast"], ["kamboBufo28", "Sacred Toad 28d"],
    ],
  },
  {
    title: "Intentions & Support",
    fields: [
      ["ceremonyIntention", "Ceremony Intention"], ["seekingHealing", "Seeking Healing For"],
      ["integrationSupport", "Integration Support"], ["facilitatorNotes", "Notes for Facilitators"],
    ],
  },
];

const formatValue = (v: unknown): string => {
  if (v === null || v === undefined || v === "") return "·";
  if (Array.isArray(v)) return v.length ? v.join(", ") : "·";
  if (typeof v === "boolean") return v ? "Yes" : "No";
  return String(v);
};

const AdminIntakes = () => {
  const { user, loading: authLoading } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [roleChecked, setRoleChecked] = useState(false);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [ceremonyFilter, setCeremonyFilter] = useState<string>("all");
  const [days, setDays] = useState<number>(0); // 0 = all
  const [flaggedOnly, setFlaggedOnly] = useState(false);
  const [selected, setSelected] = useState<Submission | null>(null);
  const [sortKey, setSortKey] = useState<"created_at" | "name" | "email" | "phone" | "ceremonyType">("created_at");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 25;

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
        .eq("form_name", "ceremony-intake")
        .order("created_at", { ascending: false })
        .limit(500);
      if (!error && data) setSubmissions(data as Submission[]);
      setLoading(false);
    })();
  }, [isAdmin]);

  const ceremonies = useMemo(() => {
    const set = new Set<string>();
    submissions.forEach((s) => { if (s.metadata?.ceremonyType) set.add(s.metadata.ceremonyType); });
    return Array.from(set).sort();
  }, [submissions]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const cutoff = days > 0 ? Date.now() - days * 86400000 : 0;
    const list = submissions.filter((s) => {
      const m = s.metadata || {};
      if (cutoff && new Date(s.created_at).getTime() < cutoff) return false;
      if (ceremonyFilter !== "all" && m.ceremonyType !== ceremonyFilter) return false;
      if (flaggedOnly && !isFlagged(m)) return false;
      if (q) {
        const hay = `${m.firstName ?? ""} ${m.lastName ?? ""} ${m.email ?? ""} ${m.phone ?? ""}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
    const getKey = (s: Submission): string | number => {
      const m = s.metadata || {};
      if (sortKey === "created_at") return new Date(s.created_at).getTime();
      if (sortKey === "name") return `${m.firstName ?? ""} ${m.lastName ?? ""}`.toLowerCase();
      if (sortKey === "email") return String(m.email ?? "").toLowerCase();
      if (sortKey === "phone") return String(m.phone ?? "").toLowerCase();
      if (sortKey === "ceremonyType") return String(m.ceremonyType ?? "").toLowerCase();
      return "";
    };
    list.sort((a, b) => {
      const av = getKey(a); const bv = getKey(b);
      if (av < bv) return sortDir === "asc" ? -1 : 1;
      if (av > bv) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
    return list;
  }, [submissions, search, ceremonyFilter, days, flaggedOnly, sortKey, sortDir]);

  useEffect(() => { setPage(1); }, [search, ceremonyFilter, days, flaggedOnly, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageRows = useMemo(() => filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE), [filtered, page]);

  const toggleSort = (key: typeof sortKey) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(key); setSortDir(key === "created_at" ? "desc" : "asc"); }
  };
  const SortIcon = ({ k }: { k: typeof sortKey }) =>
    sortKey !== k ? <ChevronsUpDown className="inline h-3.5 w-3.5 ml-1 opacity-50" />
    : sortDir === "asc" ? <ArrowUp className="inline h-3.5 w-3.5 ml-1" />
    : <ArrowDown className="inline h-3.5 w-3.5 ml-1" />;

  const exportCsv = () => {
    const headers = ["Submitted","First","Last","Email","Phone","Ceremony","Experience","Flagged","City/State"];
    const rows = filtered.map((s) => {
      const m = s.metadata || {};
      return [
        new Date(s.created_at).toISOString(),
        m.firstName ?? "", m.lastName ?? "", m.email ?? "", m.phone ?? "",
        m.ceremonyType ?? "", m.experienceLevel ?? "",
        isFlagged(m) ? "yes" : "no", m.cityState ?? "",
      ].map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",");
    });
    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ceremony-intakes-${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (authLoading || !roleChecked) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center text-muted-foreground">Loading…</div>
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
          <p className="text-muted-foreground mt-2">This page is restricted to Temple administrators.</p>
          <Link to="/" className="text-primary underline mt-4 inline-block">Return Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SEOHead title="Admin · Ceremony Intakes" description="Review submitted ceremony intakes" path="/admin/intakes" />
      <Navigation />

      <section className="px-4 pt-28 pb-10">
        <div className="mx-auto max-w-7xl">
          <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-4">
            <ArrowLeft className="h-4 w-4" /> Back
          </Link>
          <h1 className="font-display text-3xl text-foreground">Ceremony Intakes</h1>
          <p className="text-muted-foreground mt-1">Review, search, and export submitted intakes.</p>

          <div className="mt-6 flex flex-wrap gap-3 items-center">
            <div className="relative flex-1 min-w-[240px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search name, email, phone…" className="pl-9" />
            </div>
            <select value={ceremonyFilter} onChange={(e) => setCeremonyFilter(e.target.value)} className="rounded-md border border-input bg-background px-3 py-2 text-sm">
              <option value="all">All ceremonies</option>
              {ceremonies.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <select value={days} onChange={(e) => setDays(Number(e.target.value))} className="rounded-md border border-input bg-background px-3 py-2 text-sm">
              <option value={0}>All time</option>
              <option value={7}>Last 7 days</option>
              <option value={30}>Last 30 days</option>
              <option value={90}>Last 90 days</option>
            </select>
            <label className="flex items-center gap-2 text-sm text-foreground">
              <input type="checkbox" checked={flaggedOnly} onChange={(e) => setFlaggedOnly(e.target.checked)} className="h-4 w-4 accent-primary" />
              <Filter className="h-3.5 w-3.5" /> Flagged only
            </label>
            <Button variant="outline" size="sm" onClick={exportCsv} className="ml-auto">
              <Download className="h-4 w-4 mr-1" /> Export CSV
            </Button>
          </div>

          <div className="mt-6 rounded-xl border border-border bg-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/40 text-muted-foreground">
                  <tr>
                    <th className="text-left px-4 py-2 font-medium cursor-pointer select-none" onClick={() => toggleSort("created_at")}>Submitted<SortIcon k="created_at" /></th>
                    <th className="text-left px-4 py-2 font-medium cursor-pointer select-none" onClick={() => toggleSort("name")}>Name<SortIcon k="name" /></th>
                    <th className="text-left px-4 py-2 font-medium cursor-pointer select-none" onClick={() => toggleSort("email")}>Email<SortIcon k="email" /></th>
                    <th className="text-left px-4 py-2 font-medium cursor-pointer select-none" onClick={() => toggleSort("phone")}>Phone<SortIcon k="phone" /></th>
                    <th className="text-left px-4 py-2 font-medium cursor-pointer select-none" onClick={() => toggleSort("ceremonyType")}>Ceremony<SortIcon k="ceremonyType" /></th>
                    <th className="text-left px-4 py-2 font-medium">Status</th>
                    <th className="px-4 py-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {loading && (
                    <tr><td colSpan={7} className="px-4 py-8 text-center text-muted-foreground">Loading…</td></tr>
                  )}
                  {!loading && filtered.length === 0 && (
                    <tr><td colSpan={7} className="px-4 py-8 text-center text-muted-foreground">No intakes match your filters.</td></tr>
                  )}
                  {!loading && pageRows.map((s) => {
                    const m = s.metadata || {};
                    const flagged = isFlagged(m);
                    return (
                      <tr key={s.id} className="border-t border-border hover:bg-muted/30 cursor-pointer" onClick={() => setSelected(s)}>
                        <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">{new Date(s.created_at).toLocaleString()}</td>
                        <td className="px-4 py-3 text-foreground">{m.firstName} {m.lastName}</td>
                        <td className="px-4 py-3 text-foreground">{m.email}</td>
                        <td className="px-4 py-3 text-muted-foreground">{m.phone}</td>
                        <td className="px-4 py-3 text-foreground">{m.ceremonyType ?? "·"}</td>
                        <td className="px-4 py-3">
                          {flagged ? (
                            <Badge variant="destructive">Flagged</Badge>
                          ) : (
                            <Badge variant="secondary">OK</Badge>
                          )}
                        </td>
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
              <span>
                Showing {filtered.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1}·{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length} (total {submissions.length})
              </span>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>
                  <ChevronLeft className="h-4 w-4" /> Prev
                </Button>
                <span className="px-2">Page {page} of {totalPages}</span>
                <Button variant="outline" size="sm" disabled={page >= totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>
                  Next <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Sheet open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
          {selected && (
            <>
              <SheetHeader>
                <SheetTitle>{selected.metadata?.firstName} {selected.metadata?.lastName}</SheetTitle>
                <SheetDescription>
                  Submitted {new Date(selected.created_at).toLocaleString()}
                  {isFlagged(selected.metadata || {}) && (
                    <Badge variant="destructive" className="ml-2">Flagged</Badge>
                  )}
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-6">
                {SECTIONS.map((sec) => (
                  <div key={sec.title}>
                    <h3 className="font-display text-base font-semibold text-foreground border-b border-border pb-1 mb-2">{sec.title}</h3>
                    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-sm">
                      {sec.fields.map(([key, label]) => (
                        <div key={key} className="py-1">
                          <dt className="text-xs text-muted-foreground">{label}</dt>
                          <dd className="text-foreground break-words">{formatValue(selected.metadata?.[key])}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                ))}
                <div>
                  <h3 className="font-display text-base font-semibold text-foreground border-b border-border pb-1 mb-2">Agreements</h3>
                  <ul className="text-sm space-y-1">
                    {["eligibilityStatement","communityGuidelines","ageConfirmation21","rfrAgreement","liabilityWaiver","truthfulness","confidentiality","preparationCompliance","emergencyAuth"].map((k) => (
                      <li key={k} className="text-muted-foreground">
                        <span className={selected.metadata?.[k] ? "text-primary" : "text-destructive"}>
                          {selected.metadata?.[k] ? "✓" : "✗"}
                        </span>{" "}
                        {k}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default AdminIntakes;