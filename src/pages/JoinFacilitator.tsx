import { motion, type Easing } from "framer-motion";
import { Sparkles, ArrowRight, CheckCircle2, Loader2, Flame, UsersRound, ShieldCheck, Mountain, HandHeart, Scroll } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import SEOHead from "@/components/SEOHead";
import PageBreadcrumb from "@/components/PageBreadcrumb";
import Navigation from "@/components/Navigation";
import MidImageBanner from "@/components/story/MidImageBanner";
import FooterVideoBanner from "@/components/story/FooterVideoBanner";
import midFacilitatorImg from "@/assets/kambo-ceremony-altar.jpg";
import footerFacilitatorVideoAsset from "@/assets/video-footer-facilitator.mp4.asset.json";
import sacredSpace from "@/assets/sacred-space.jpg";

const ease: Easing = [0.25, 0.1, 0.25, 1];
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};
const stagger = { visible: { transition: { staggerChildren: 0.12 } } };

const mirrors = [
  "You hold sacred work · and most days you're holding it alone.",
  "You're tired of renting yoga studios that don't understand what you do.",
  "You've built your craft. You need a community that's already gathered.",
  "You want to focus on the work · not the marketing, booking, and logistics.",
  "You want elders, peers, and a lineage to be accountable to.",
  "You're ready to stop selling sessions and start serving in ceremony.",
];

const offer = [
  { icon: Mountain, title: "Sanctuary Space", desc: "Consecrated rooms, altar, sound, fire. Show up and serve · the container is already built." },
  { icon: UsersRound, title: "A Gathered Community", desc: "Our seekers are already arriving. You meet souls who came here on purpose · not strangers." },
  { icon: HandHeart, title: "A Held Container", desc: "Intake, screening, integration, aftercare · all carried by the temple so you can stay in your craft." },
  { icon: Flame, title: "Lineage & Eldership", desc: "Walk alongside Dr. George Xavier Love, Jr., Sonatta, and the council of stewards holding this work." },
  { icon: Sparkles, title: "Sacred Reciprocity", desc: "An energy exchange that honors your years of training · so you can give from a full cup." },
  { icon: ShieldCheck, title: "Spiritual Covering", desc: "Facilitate inside a 508(c)(1)(A) sacred ceremony church · standing in First Amendment protection." },
];

const listening = [
  "Certified or lineage-trained in your modality · Earth Sacrament, Kambo, Hapé, Cacao, breathwork, yin, sound, integration, somatic, and more",
  "A real body of personal practice and ceremonies you have already held",
  "Insurance and paperwork in place where your modality requires it",
  "A heart aligned with our six Sacred Values · Reverence, Sovereignty, Community, Lineage, Reciprocity, and Service",
  "Willingness to sit in our circle as a guest before serving as a steward",
];

const path = [
  { step: "01", title: "Share Your Calling", desc: "Send the application below. Tell us who you are, what you hold, and what is stirring." },
  { step: "02", title: "The Council Listens", desc: "Our stewards review with care and reach out to begin a conversation, not an interview." },
  { step: "03", title: "Sit in Our Circle", desc: "Come as a guest. We meet your energy in the room before anything else is decided." },
  { step: "04", title: "Be Invited to Serve", desc: "When the alignment is clear, you are invited to facilitate inside the sanctuary." },
];

const JoinFacilitator = () => {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "", location: "",
    background: "", modality: "", experience: "",
    whyJoin: "", additionalInfo: "",
  });

  const update = (field: string, value: string) => setForm((p) => ({ ...p, [field]: value }));
  const inputClass = "w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary";

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Facilitators · Answer the Call to Serve in Sanctuary"
        description="For certified facilitators called to hold sacred work in community. Temple Mother Earth provides the space, the gathered sangha, and the held container · you bring the calling."
        path="/join-facilitator"
      />
      <Navigation />
      <PageBreadcrumb items={[{ label: "Get Involved" }, { label: "Become a Facilitator" }]} />

      {/* ───── HERO ───── */}
      <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden px-4 pt-20">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${sacredSpace})` }} />
        <div className="absolute inset-0 bg-foreground/75" />
        <motion.div className="relative z-10 max-w-4xl text-center" initial="hidden" animate="visible" variants={stagger}>
          <motion.div variants={fadeUp} className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
            <Sparkles className="h-8 w-8 text-primary" />
          </motion.div>
          <motion.p variants={fadeUp} className="font-body text-[11px] uppercase tracking-[0.3em] text-primary mb-4">
            For the called
          </motion.p>
          <motion.h1 variants={fadeUp} className="font-display text-4xl font-bold leading-tight text-primary-foreground md:text-6xl">
            You already do the work. <br />
            <em className="font-serif italic text-primary">You're looking for the temple to do it in.</em>
          </motion.h1>
          <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-2xl text-lg text-primary-foreground/80">
            Space. Sangha. Sanctuary. We hold the container · you bring the calling.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href="#apply" className="rounded-xl bg-primary px-8 py-3 font-body text-sm font-semibold uppercase tracking-wider text-primary-foreground transition hover:bg-primary/80">
              Answer the Call
            </a>
            <Link to="/about" className="rounded-xl border border-primary/60 px-8 py-3 font-body text-sm font-semibold uppercase tracking-wider text-primary transition hover:bg-primary hover:text-primary-foreground">
              Walk Through the Doors
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ───── MIRROR · pain points ───── */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <p className="font-body text-[11px] uppercase tracking-[0.3em] text-primary mb-3">Does this mirror you?</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            If you nodded once · you are in the right place.
          </h2>
        </div>
        <div className="mx-auto mt-12 grid max-w-4xl gap-4 md:grid-cols-2">
          {mirrors.map((line, i) => (
            <div key={i} className="flex items-start gap-3 rounded-xl border border-border bg-card p-5">
              <span className="mt-1 inline-block h-2 w-2 shrink-0 rounded-full bg-primary" />
              <p className="font-body text-base text-foreground/85 leading-relaxed">{line}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ───── OFFER · what we hold for you ───── */}
      <section className="bg-card/40 px-4 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <p className="font-body text-[11px] uppercase tracking-[0.3em] text-primary mb-3">What we hold for you</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              You bring the calling. <em className="font-serif italic text-primary">We hold everything else.</em>
            </h2>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {offer.map((item) => (
              <div key={item.title} className="rounded-2xl border border-border bg-background p-7">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/15">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold text-foreground">{item.title}</h3>
                <p className="mt-3 font-body text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── WHO WE ARE LISTENING FOR ───── */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <p className="font-body text-[11px] uppercase tracking-[0.3em] text-primary mb-3">Who we are listening for</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              Discernment, not gatekeeping.
            </h2>
            <p className="mt-4 font-body text-base text-muted-foreground">
              We are not the right home for everyone · and that is the work. Here is the energy we are listening for:
            </p>
          </div>
          <ul className="mx-auto mt-10 space-y-4">
            {listening.map((line, i) => (
              <li key={i} className="flex items-start gap-4 rounded-xl border border-border bg-card p-5">
                <Scroll className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <span className="font-body text-base text-foreground/85 leading-relaxed">{line}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ───── PATH · process ───── */}
      <section className="bg-card/40 px-4 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <p className="font-body text-[11px] uppercase tracking-[0.3em] text-primary mb-3">Walk Through the Doors</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              Four steps · one threshold.
            </h2>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-4">
            {path.map((p) => (
              <div key={p.step} className="rounded-2xl border border-border bg-background p-6">
                <p className="font-display text-3xl font-bold text-primary/80">{p.step}</p>
                <h3 className="mt-3 font-display text-lg font-semibold text-foreground">{p.title}</h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── MID BANNER ───── */}
      <MidImageBanner
        image={midFacilitatorImg}
        eyebrow="The Calling"
        headline={<>Hold Space · <em className="font-serif italic text-primary">Become Space</em></>}
        body="The facilitators we are listening for are not looking for a job. They are answering a calling. If this stirs something in you · do not turn away. Walk toward it."
        ctaLabel="Answer the Call"
        ctaHref="#apply"
      />

      {/* ───── APPLICATION ───── */}
      <section id="apply" className="bg-card px-4 py-20 scroll-mt-20">
        <div className="mx-auto max-w-2xl">
          {!submitted ? (
            <>
              <div className="text-center">
                <p className="font-body text-[11px] uppercase tracking-[0.3em] text-primary mb-3">Share Your Calling</p>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-card-foreground">
                  Tell us what is stirring.
                </h2>
                <p className="mx-auto mt-4 max-w-lg font-body text-base text-muted-foreground">
                  This is the beginning of a conversation, not an application form. Tell us who you are,
                  what you hold, and why now.
                </p>
              </div>
              <form className="mt-12 space-y-5" onSubmit={async (e) => {
                e.preventDefault();
                setSubmitting(true);
                try {
                  const { error } = await supabase.functions.invoke("submit-facilitator", { body: form });
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
                <input className={inputClass} type="tel" placeholder="Phone Number *" value={form.phone} onChange={(e) => update("phone", e.target.value)} required />
                <input className={inputClass} placeholder="City / State *" value={form.location} onChange={(e) => update("location", e.target.value)} required />
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">The modality I am called to hold *</label>
                  {["Earth Sacrament Ceremony", "Yoga / Movement", "Sound Healing / Music", "Meditation / Breathwork", "Integration Support / Counseling", "Other"].map((opt) => (
                    <label key={opt} className="mb-2 flex items-center text-sm text-foreground cursor-pointer">
                      <input type="radio" name="modality" className="mr-3 h-4 w-4 accent-primary" checked={form.modality === opt} onChange={() => update("modality", opt)} required />
                      {opt}
                    </label>
                  ))}
                </div>
                <textarea className={inputClass + " min-h-[110px] resize-none"} placeholder="How I have been trained and held · certifications, lineage, years of practice... *" value={form.experience} onChange={(e) => update("experience", e.target.value)} required />
                <textarea className={inputClass + " min-h-[110px] resize-none"} placeholder="What is stirring this calling right now? *" value={form.whyJoin} onChange={(e) => update("whyJoin", e.target.value)} required />
                <textarea className={inputClass + " min-h-[60px] resize-none"} placeholder="Anything else you would like the council to know?" value={form.additionalInfo} onChange={(e) => update("additionalInfo", e.target.value)} />
                <button type="submit" disabled={submitting} className="w-full rounded-lg bg-primary px-6 py-4 font-body text-sm font-semibold uppercase tracking-wider text-primary-foreground transition hover:bg-primary/80 flex items-center justify-center gap-2 disabled:opacity-50">
                  {submitting ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending...</> : <>Send the Smoke Signal <ArrowRight className="h-4 w-4" /></>}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-16">
              <CheckCircle2 className="mx-auto h-16 w-16 text-primary" />
              <h3 className="mt-6 font-display text-3xl font-bold text-card-foreground">The council has received your calling.</h3>
              <p className="mt-4 font-body text-base text-muted-foreground max-w-md mx-auto">
                We will sit with what you sent and reach out to begin the conversation. Until then ·
                keep listening.
              </p>
              <Link to="/" className="mt-8 inline-block rounded-xl bg-primary px-8 py-3 font-body text-sm font-semibold uppercase tracking-wider text-primary-foreground transition hover:bg-primary/80">
                Return Home
              </Link>
            </div>
          )}
        </div>
      </section>

      <FooterVideoBanner
        video={footerFacilitatorVideoAsset.url}
        eyebrow="Walk With Us"
        headline={<>Step Onto <em className="font-serif italic text-primary">The Path</em></>}
        body="We are a circle of facilitators learning, growing, and holding sacred work together. Come walk with us."
        ctaLabel="Answer the Call"
        ctaHref="#apply"
      />

      {/* Quiet redirect for non-facilitators */}
      <section className="bg-foreground/60 border-y border-primary/15 px-4 py-10">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-body text-sm text-primary-foreground/75">
            Not a facilitator yet? <Link to="/ceremony-intake" className="text-primary hover:underline">Sit in circle with us first →</Link>
          </p>
        </div>
      </section>

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

export default JoinFacilitator;
