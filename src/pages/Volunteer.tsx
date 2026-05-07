import { motion, type Easing } from "framer-motion";
import { Heart, Users, Leaf, ArrowRight, CheckCircle2, Loader2, Sparkles, CalendarHeart, Megaphone, Palette, HeartHandshake, TreePine, Hammer, GraduationCap } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import SEOHead from "@/components/SEOHead";
import PageBreadcrumb from "@/components/PageBreadcrumb";
import EventbriteCTA from "@/components/EventbriteCTA";
import Navigation from "@/components/Navigation";
import volunteerHero from "@/assets/community-women-blessing.jpg";

const ease: Easing = [0.25, 0.1, 0.25, 1];
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};
const stagger = { visible: { transition: { staggerChildren: 0.12 } } };

const SACRED_ROLES = [
  {
    icon: Sparkles,
    title: "Greeter",
    tag: "greeter",
    short: "Welcome guests · Hold the threshold",
    body: "Stand as a sentinel at the gateway of our temple. Greet every visitor as an honored guest, extending the warmth of our spiritual community to all who cross the threshold. A vessel through which the energies of harmony and connection flow.",
    serve: ["Welcome guests at the door", "Hold space for arrivals", "Tend to refreshments and comfort"],
  },
  {
    icon: CalendarHeart,
    title: "Events Team",
    tag: "events",
    short: "Ceremony setup · Flow · Logistics",
    body: "Master weavers of sacred gatherings. Sculpt ethereal landscapes of experience, orchestrating moments of divine communion. With each event, weave threads of unity and invoke the presence of the sacred in the very air we breathe.",
    serve: ["Pre and post ceremony setup", "Event flow and logistics", "Volunteer coordination on the day"],
  },
  {
    icon: Megaphone,
    title: "Social Media",
    tag: "social-media",
    short: "Posts · Stories · Community engagement",
    body: "Transmute images and words into potent elixirs that resonate with the souls of souls. With every post, craft incantations that ripple through the collective consciousness, drawing kindred spirits to our temple's embrace.",
    serve: ["Instagram and Facebook posts", "Story coverage of ceremonies", "Community engagement and replies"],
  },
  {
    icon: Palette,
    title: "Graphic Design",
    tag: "graphic-design",
    short: "Flyers · Banners · Visual identity",
    body: "Inscribe sacred narratives onto the canvas of existence. Magicians of imagery who evoke emotion and awaken dormant understanding, manifesting the ineffable into forms the human eye and heart can apprehend.",
    serve: ["Ceremony flyers and banners", "Social media graphics", "Brand and visual stewardship"],
  },
  {
    icon: HeartHandshake,
    title: "Community Outreach",
    tag: "outreach",
    short: "Partnerships · Tabling · Ambassadorship",
    body: "An emissary of unity, a bridge between our sanctuary and the wider world. Reach out to neighboring realms, form alliances, and cultivate a fertile garden where the seeds of empathy and transformation can flourish.",
    serve: ["Partner outreach in the DMV", "Tabling at local events", "Building bridges with allied communities"],
  },
  {
    icon: TreePine,
    title: "Land Steward",
    tag: "land-steward",
    short: "Garden · Grounds · Forest cleanup",
    body: "Hear the ancient heartbeat of the wild and act as its steward. Through your labor, you cleanse the earthly temple and commune with the spirit of the land that holds us.",
    serve: ["Garden tending and planting", "Forest and grounds cleanup days", "Sacred land stewardship"],
  },
  {
    icon: Hammer,
    title: "Build Team",
    tag: "build-team",
    short: "Carpentry · Repair · Renovation",
    body: "Architects of divine restoration. Hands attuned to both material and ethereal, mending the temple's physical abode and mirroring the healing of spiritual fractures. Each nail driven becomes a sacred act of devotion.",
    serve: ["Carpentry and repairs", "Painting and finishing", "Sacred build and renovation projects"],
  },
];

const ROLE_TITLES = SACRED_ROLES.map((r) => r.title);

const Volunteer = () => {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "", availability: "",
    interests: [] as string[], experience: "", whyJoin: "",
  });

  const update = (field: string, value: string | string[]) => setForm((p) => ({ ...p, [field]: value }));
  const toggleInterest = (role: string) => setForm((p) => ({
    ...p,
    interests: p.interests.includes(role) ? p.interests.filter((r) => r !== role) : [...p.interests, role],
  }));
  const inputClass = "w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary";

  return (
    <div className="min-h-screen bg-background">
      <SEOHead title="Volunteer | Serve Temple Mother Earth Community" description="Join The Forest Team and serve Temple Mother Earth. Land stewardship, event support, and sacred service opportunities in DC." path="/volunteer" />
      <Navigation />
      <PageBreadcrumb items={[{ label: "Get Involved" }, { label: "Volunteer" }]} />

      {/* Hero */}
      <section className="relative flex min-h-[50vh] items-center justify-center overflow-hidden px-4 pt-20">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${volunteerHero})` }} />
        <div className="absolute inset-0 bg-foreground/70" />
        <motion.div className="relative z-10 max-w-3xl text-center" initial="hidden" animate="visible" variants={stagger}>
          <motion.div variants={fadeUp} className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
            <Heart className="h-8 w-8 text-primary" />
          </motion.div>
          <motion.p variants={fadeUp} className="font-body text-xs uppercase tracking-[0.3em] text-primary mb-3">Service is the Sacrament</motion.p>
          <motion.h1 variants={fadeUp} className="font-display text-3xl font-bold text-primary-foreground md:text-5xl">
            Become a Volunteer
          </motion.h1>
          <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-xl text-lg text-primary-foreground/75">
            Temple Mother Earth thrives because of the love and dedication of our volunteers. Join us in nurturing this sacred space and serving our community.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8">
            <a href="#sacred-roles" className="inline-block rounded-xl bg-primary px-7 py-3 font-body text-sm font-semibold text-primary-foreground transition hover:bg-primary/80">
              Discover the Seven Sacred Roles
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* Seven Sacred Roles */}
      <section id="sacred-roles" className="px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <p className="font-body text-xs uppercase tracking-[0.3em] text-primary mb-3">Sacred Descriptions for Open Positions</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">The Seven Sacred Roles</h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm text-muted-foreground italic">
              "The best way to find yourself is to lose yourself in the service of others." · Gandhi
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {SACRED_ROLES.map((role) => (
              <div key={role.title} className="rounded-xl border border-border bg-card p-6 flex flex-col">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                  <role.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold text-card-foreground leading-tight">{role.title}</h3>
                <p className="mt-1 text-xs uppercase tracking-wider text-primary/80">{role.short}</p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground flex-1">{role.body}</p>
                <ul className="mt-5 space-y-1.5 border-t border-border pt-4">
                  {role.serve.map((line) => (
                    <li key={line} className="text-xs text-foreground/80 flex gap-2">
                      <span className="text-primary mt-0.5">·</span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <a href="#apply" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
              Offer Your Service <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Sacred Energy Exchange */}
      <section className="bg-card px-4 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            <Leaf className="h-7 w-7 text-primary" />
          </div>
          <h2 className="font-display text-2xl font-bold text-card-foreground md:text-3xl">
            Sacred Energy Exchange
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            At Temple Mother Earth, we believe that everyone deserves access to sacred ceremony, regardless of financial means.
            We practice <strong className="text-foreground">Sacred Energy Exchange</strong>, a reciprocal model where volunteers
            contribute their time, energy, and skills to sustain the Temple, and in return, earn credits toward
            sacred ceremony participation.
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Whether it's tending the grounds, supporting events, preparing meals, or lending your professional skills ·
            your energy is valued and honored. By exchanging energy in service to the community, you open the door to
            your own sacred path. No one is turned away.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { title: "Serve", desc: "Volunteer your time and energy in areas that align with your gifts." },
              { title: "Receive Blessings", desc: "Your sacred service is honored and reciprocated through ceremony access." },
              { title: "Heal", desc: "Use your credits to participate in sacred ceremonies and immersions." },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-border bg-background p-5">
                <h3 className="font-display text-base font-semibold text-foreground">{item.title}</h3>
                <p className="mt-1.5 text-xs text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section id="apply" className="bg-card px-4 py-16 scroll-mt-20">
        <div className="mx-auto max-w-2xl">
          {!submitted ? (
            <>
              <h2 className="text-center font-display text-2xl font-bold text-card-foreground md:text-3xl">
                Volunteer Application
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-center text-sm text-muted-foreground">
                Tell us about yourself and how you'd like to serve. We welcome all skill levels and backgrounds.
              </p>
              <form className="mt-10 space-y-5" onSubmit={async (e) => {
                e.preventDefault();
                if (form.interests.length === 0) {
                  toast.error("Please select at least one sacred role to serve.");
                  return;
                }
                setSubmitting(true);
                try {
                  const selectedTags = SACRED_ROLES
                    .filter((r) => form.interests.includes(r.title))
                    .map((r) => `volunteer-${r.tag}`);
                  const { error } = await supabase.functions.invoke("submit-volunteer", {
                    body: { ...form, interests: form.interests.join(" · "), roleTags: selectedTags },
                  });
                  if (error) throw error;
                  setSubmitted(true);
                } catch (err) {
                  console.error(err);
                  toast.error("Something went wrong. Please try again.");
                } finally {
                  setSubmitting(false);
                }
              }}>
                <div className="grid grid-cols-2 gap-3">
                  <input className={inputClass} placeholder="First Name *" value={form.firstName} onChange={(e) => update("firstName", e.target.value)} required />
                  <input className={inputClass} placeholder="Last Name *" value={form.lastName} onChange={(e) => update("lastName", e.target.value)} required />
                </div>
                <input className={inputClass} type="email" placeholder="Email Address *" value={form.email} onChange={(e) => update("email", e.target.value)} required />
                <input className={inputClass} type="tel" placeholder="Phone Number" value={form.phone} onChange={(e) => update("phone", e.target.value)} />
                <div>
                  <label className="mb-3 block text-sm font-medium text-foreground">Sacred roles you feel called to · select one or more *</label>
                  <div className="space-y-2">
                    {ROLE_TITLES.map((opt) => (
                      <label key={opt} className="flex items-center text-sm text-foreground cursor-pointer rounded-lg border border-input bg-background px-3 py-2 hover:border-primary/50 transition">
                        <input type="checkbox" className="mr-3 h-4 w-4 accent-primary" checked={form.interests.includes(opt)} onChange={() => toggleInterest(opt)} />
                        {opt}
                      </label>
                    ))}
                    <label className="flex items-center text-sm text-foreground cursor-pointer rounded-lg border border-input bg-background px-3 py-2 hover:border-primary/50 transition">
                      <input type="checkbox" className="mr-3 h-4 w-4 accent-primary" checked={form.interests.includes("I'm open to anything")} onChange={() => toggleInterest("I'm open to anything")} />
                      I'm open to anything
                    </label>
                  </div>
                </div>
                <input className={inputClass} placeholder="Availability (e.g., weekends, evenings, flexible)" value={form.availability} onChange={(e) => update("availability", e.target.value)} />
                <textarea className={inputClass + " min-h-[80px] resize-none"} placeholder="Any relevant experience or skills?" value={form.experience} onChange={(e) => update("experience", e.target.value)} />
                <textarea className={inputClass + " min-h-[100px] resize-none"} placeholder="Why do you want to volunteer with Temple Mother Earth? *" value={form.whyJoin} onChange={(e) => update("whyJoin", e.target.value)} required />
                <button type="submit" disabled={submitting} className="w-full rounded-lg bg-primary px-6 py-3 font-body text-sm font-semibold text-primary-foreground transition hover:bg-primary/80 flex items-center justify-center gap-2 disabled:opacity-50">
                  {submitting ? <><Loader2 className="h-4 w-4 animate-spin" /> Submitting...</> : <>Offer Your Service <ArrowRight className="h-4 w-4" /></>}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-12">
              <CheckCircle2 className="mx-auto h-16 w-16 text-primary" />
              <h3 className="mt-6 font-display text-2xl font-bold text-card-foreground">Thank You, Sacred Servant</h3>
              <p className="mt-4 text-muted-foreground max-w-md mx-auto">
                Your volunteer application has been received. We'll be in touch soon to discuss how you can serve alongside us.
              </p>
              <Link to="/" className="mt-8 inline-block rounded-xl bg-primary px-8 py-3 font-body text-sm font-semibold text-primary-foreground transition hover:bg-primary/80">
                Return Home
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Continue Your Journey */}
      <section className="bg-background px-4 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <p className="font-body text-xs uppercase tracking-[0.3em] text-primary mb-3">Continue Your Journey</p>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8">Other Sacred Pathways</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <Link to="/membership" className="rounded-xl border border-border bg-card p-6 hover:border-primary/50 transition text-left group">
              <Users className="h-6 w-6 text-primary mb-3" />
              <h3 className="font-display text-base font-semibold text-card-foreground group-hover:text-primary transition">Become a Member</h3>
              <p className="mt-2 text-xs text-muted-foreground">Join the Temple community and walk the membership pathway.</p>
            </Link>
            <Link to="/scholarship" className="rounded-xl border-2 border-primary/40 bg-primary/5 p-6 hover:border-primary transition text-left group">
              <GraduationCap className="h-6 w-6 text-primary mb-3" />
              <h3 className="font-display text-base font-semibold text-card-foreground group-hover:text-primary transition">Apply for Scholarship</h3>
              <p className="mt-2 text-xs text-muted-foreground">Cannot afford full reciprocity? Earn your seat through energy exchange.</p>
            </Link>
            <Link to="/donate" className="rounded-xl border border-border bg-card p-6 hover:border-primary/50 transition text-left group">
              <Heart className="h-6 w-6 text-primary mb-3" />
              <h3 className="font-display text-base font-semibold text-card-foreground group-hover:text-primary transition">Make a Donation</h3>
              <p className="mt-2 text-xs text-muted-foreground">Sustain the sanctuary through sacred reciprocity.</p>
            </Link>
          </div>
        </div>
      </section>

      <EventbriteCTA />

      <footer className="bg-foreground px-4 py-12">
        <div className="mx-auto max-w-4xl text-center">
          <p className="font-body text-xs text-primary-foreground/40">
            © {new Date().getFullYear()} Temple Mother Earth. A 508(c)(1)(A) sacred ceremony church. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Volunteer;
