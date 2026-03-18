import { useState } from "react";
import { motion, type Easing } from "framer-motion";
import { Globe, ArrowRight, CheckCircle2, MapPin, Calendar, Users, Sparkles, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import SEOHead from "@/components/SEOHead";
import PageBreadcrumb from "@/components/PageBreadcrumb";
import EventbriteCTA from "@/components/EventbriteCTA";
import Navigation from "@/components/Navigation";
import logo from "@/assets/logo.png";
import offeringRetreat from "@/assets/offering-retreat.jpg";
import immersionAerial from "@/assets/immersion-aerial.jpg";
import immersionHammock from "@/assets/immersion-hammock.jpg";
import immersionPalapa from "@/assets/immersion-palapa.jpg";
import immersionInterior from "@/assets/immersion-interior.jpg";
import CeremonyExploreNav from "@/components/CeremonyExploreNav";


const ease: Easing = [0.25, 0.1, 0.25, 1];
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};
const stagger = { visible: { transition: { staggerChildren: 0.12 } } };

const RetreatsInquiry = () => {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "", retreatInterest: "",
    groupSize: "", dates: "", experience: "", dietaryNeeds: "",
    intentions: "", medicalConcerns: "", howHeard: "",
  });

  const update = (field: string, value: string) => setForm((p) => ({ ...p, [field]: value }));
  const inputClass = "w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary";

  return (
    <div className="min-h-screen bg-background">
      <SEOHead title="International Retreats & Immersions" description="Join our international plant medicine retreats in Costa Rica, Peru, Mexico, and beyond. Transformational immersions with Temple Mother Earth." path="/retreats-inquiry" />
      <Navigation />
      <PageBreadcrumb items={[{ label: "Experiences" }, { label: "International Retreats" }]} />

      {/* Hero */}
      <section className="relative flex min-h-[50vh] items-center justify-center overflow-hidden px-4 pt-20">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${offeringRetreat})` }} />
        <div className="absolute inset-0 bg-foreground/70" />
        <motion.div className="relative z-10 max-w-3xl text-center" initial="hidden" animate="visible" variants={stagger}>
          <motion.div variants={fadeUp} className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
            <Globe className="h-8 w-8 text-primary" />
          </motion.div>
          <motion.h1 variants={fadeUp} className="font-display text-3xl font-bold text-primary-foreground md:text-5xl">
            International Immersions
          </motion.h1>
          <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-xl text-lg text-primary-foreground/75">
            Journey with Temple Mother Earth to breathtaking destinations for immersive sacred experiences
            that blend cultural richness, Earth Medicine, and deep spiritual practice.
          </motion.p>
        </motion.div>
      </section>

      {/* Info */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { icon: MapPin, title: "Sacred Destinations", desc: "We travel to locations chosen for their spiritual energy and cultural significance — from Mexico to West Africa and beyond." },
              { icon: Calendar, title: "Immersive Experience", desc: "Multi-day immersions include Earth Medicine ceremonies, integration circles, cultural activities, nourishing meals, and community bonding." },
              { icon: Users, title: "Intimate Groups", desc: "Small group sizes ensure personalized attention from our facilitators and a deeply supportive container for your journey." },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-border bg-card p-6 text-center">
                <item.icon className="mx-auto h-8 w-8 text-primary" />
                <h3 className="mt-3 font-display text-lg font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-2xl border border-primary/20 bg-primary/5 p-8 text-center">
            <h3 className="font-display text-xl font-bold text-foreground">🇲🇽 Life's Best Yes Immersion — Sayulita, Mexico</h3>
            <p className="mt-2 text-lg text-muted-foreground">October 31 – November 5, 2026</p>
            <div className="mx-auto mt-4 max-w-xl space-y-3 text-sm text-muted-foreground text-left">
              <p>
                Join Temple Mother Earth in the vibrant coastal village of <strong className="text-foreground">Sayulita, Mexico</strong> for 
                six transformative days of deep restoration, Earth Medicine ceremony, and soul-level renewal.
              </p>
              <p>
                This immersion is designed to help you <strong className="text-foreground">regulate your nervous system</strong>, release 
                stored trauma from the body, and reclaim your natural state of peace. Through guided breathwork, 
                body napping (deep somatic rest), movement practices, and sacred ceremony, you'll learn to{" "}
                <strong className="text-foreground">return your body to its natural baseline</strong> — not just during the immersion, but as a
                way of life.
              </p>
              <p>
                Immerse yourself in Sayulita's lush jungle landscapes, Pacific Ocean energy, and rich Mexican 
                culture while being held in a sacred container by our experienced facilitators.
              </p>
            </div>
            <p className="mt-4 text-sm text-muted-foreground italic">Details and pricing coming soon. Submit your interest below to be the first to know.</p>
          </div>

          {/* Sayulita Photo Gallery */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="mt-12">
            <motion.h3 variants={fadeUp} className="text-center font-display text-xl font-bold text-foreground mb-6">
              <Sparkles className="inline h-5 w-5 mr-1" /> Your Sacred Space Awaits
            </motion.h3>
            <div className="grid gap-4 grid-cols-2">
              {[
                { src: immersionAerial, alt: "Aerial view of Ayahuasca and San Pedro retreat property overlooking the Pacific Ocean in Sayulita, Mexico", caption: "Clifftop Sanctuary" },
                { src: immersionHammock, alt: "Lush coastal hillside for Kambo and Cacao ceremony immersion in Sayulita, Mexico", caption: "Coastal Paradise" },
                { src: immersionInterior, alt: "Hammock with ocean views at sacred Psilocybin and Hapé healing retreat property", caption: "Ocean Views" },
                { src: immersionPalapa, alt: "Thatched-roof palapa ceremony space for Iboga and Blue Lotus rituals on the beachfront", caption: "Beachfront Palapa" },
              ].map((img, i) => (
                <motion.div key={i} variants={fadeUp} className="relative overflow-hidden rounded-2xl group">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-64 md:h-72 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
                  <p className="absolute bottom-3 left-4 text-sm font-semibold text-primary-foreground">{img.caption}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Form */}
      <section className="bg-card px-4 py-16">
        <div className="mx-auto max-w-2xl">
          {!submitted ? (
            <>
              <h2 className="text-center font-display text-2xl font-bold text-card-foreground md:text-3xl">
                Express Your Interest
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-center text-sm text-muted-foreground">
                Fill out this form and our team will reach out with immersion details, pricing, and preparation guidelines.
                All immersion participants will also need to complete a medical intake before ceremony.
              </p>
              <form className="mt-10 space-y-5" onSubmit={async (e) => {
                e.preventDefault();
                setSubmitting(true);
                try {
                  const { error } = await supabase.functions.invoke("submit-retreats-inquiry", { body: form });
                  if (error) throw error;
                  setSubmitted(true);
                } catch (err) {
                  console.error(err);
                  toast.error("Something went wrong. Please try again.");
                } finally {
                  setSubmitting(false);
                }
              }}>
                <input className={inputClass} placeholder="Full Name *" value={form.fullName} onChange={(e) => update("fullName", e.target.value)} required />
                <input className={inputClass} type="email" placeholder="Email Address *" value={form.email} onChange={(e) => update("email", e.target.value)} required />
                <input className={inputClass} type="tel" placeholder="Phone Number *" value={form.phone} onChange={(e) => update("phone", e.target.value)} required />
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">Which immersion interests you? *</label>
                  {["Mexico: Life's Best Yes Immersion (Oct 31 – Nov 5, 2026)", "Future immersions — notify me of upcoming destinations", "Both — I want to attend Mexico and future immersions"].map((opt) => (
                    <label key={opt} className="mb-2 flex items-center text-sm text-foreground cursor-pointer">
                      <input type="radio" name="retreatInterest" className="mr-3 h-4 w-4 accent-primary" checked={form.retreatInterest === opt} onChange={() => update("retreatInterest", opt)} required />
                      {opt}
                    </label>
                  ))}
                </div>
                <input className={inputClass} placeholder="Traveling solo or with a group? How many?" value={form.groupSize} onChange={(e) => update("groupSize", e.target.value)} />
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">Earth Medicine experience level</label>
                  {["First time — I'm new to Earth Medicine", "Some experience (1-3 ceremonies)", "Experienced practitioner"].map((opt) => (
                    <label key={opt} className="mb-2 flex items-center text-sm text-foreground cursor-pointer">
                      <input type="radio" name="experience" className="mr-3 h-4 w-4 accent-primary" checked={form.experience === opt} onChange={() => update("experience", opt)} />
                      {opt}
                    </label>
                  ))}
                </div>
                <input className={inputClass} placeholder="Dietary needs or restrictions" value={form.dietaryNeeds} onChange={(e) => update("dietaryNeeds", e.target.value)} />
                <textarea className={inputClass + " min-h-[100px] resize-none"} placeholder="What are you seeking from this retreat? Share your intentions..." value={form.intentions} onChange={(e) => update("intentions", e.target.value)} />
                <textarea className={inputClass + " min-h-[80px] resize-none"} placeholder="Any medical concerns or conditions we should know about?" value={form.medicalConcerns} onChange={(e) => update("medicalConcerns", e.target.value)} />
                <input className={inputClass} placeholder="How did you hear about us?" value={form.howHeard} onChange={(e) => update("howHeard", e.target.value)} />
                <button type="submit" disabled={submitting} className="w-full rounded-lg bg-primary px-6 py-3 font-body text-sm font-semibold text-primary-foreground transition hover:bg-primary/80 flex items-center justify-center gap-2 disabled:opacity-50">
                  {submitting ? <><Loader2 className="h-4 w-4 animate-spin" /> Submitting...</> : <>Send With Intention <ArrowRight className="h-4 w-4" /></>}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-12">
              <CheckCircle2 className="mx-auto h-16 w-16 text-primary" />
              <h3 className="mt-6 font-display text-2xl font-bold text-card-foreground">Thank You, Sacred One</h3>
              <p className="mt-4 text-muted-foreground max-w-md mx-auto">
                Your immersion interest has been received. Our team will reach out with details, pricing, and next steps. 
                Keep an eye on your email!
              </p>
              <Link to="/" className="mt-8 inline-block rounded-xl bg-primary px-8 py-3 font-body text-sm font-semibold text-primary-foreground transition hover:bg-primary/80">
                Return Home
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Keyword-rich SEO section — visible to crawlers, hidden from users */}
      <section className="sr-only" aria-label="International Plant Medicine Retreats">
        <h2>International Ayahuasca Retreats & Plant Medicine Immersions</h2>
        <p>
          Temple Mother Earth offers <Link to="/retreats-inquiry">Ayahuasca retreats in Mexico</Link>, <Link to="/retreats-inquiry">plant medicine retreats in Costa Rica</Link>, 
          and <Link to="/retreats-inquiry">sacred immersions in Peru, Colombia, and Brazil</Link>. Our international retreats combine 
          Ayahuasca ceremony (Banisteriopsis caapi + Chacruna), Kambo purification, Hapé (Rapé), ceremonial Cacao, breathwork, 
          and somatic integration in transformative multi-day experiences.
        </p>
        <p>
          Join our <Link to="/retreats-inquiry">Life's Best Yes Immersion in Sayulita, Mexico</Link> for six days of Earth Medicine ceremony, 
          nervous system regulation, and deep spiritual practice. Past retreats have included Ayahuasca journeys in the Sacred Valley of Peru, 
          Iboga ceremonies in Gabon, and San Pedro (Huachuma) pilgrimages in the Andes.
        </p>
        <p>
          All retreat participants must complete our <Link to="/ceremony-intake">Sacred Intake Form</Link> for medical screening and RFRA compliance. 
          Visit our <Link to="/plant-medicine-glossary">plant medicine glossary</Link> to learn about Ayahuasca, Psilocybin, San Pedro, Ibogaine, 
          5-MeO-DMT, Bobinsana, Chiric Sanango, Noya Rao, Mapacho, Sananga, Blue Lotus, and other sacred allies. 
          We also facilitate <Link to="/traveling-ceremonies">traveling ceremonies</Link> and <Link to="/private-ceremonies">private ceremonies</Link> 
          across the United States for those seeking Kambo, Hapé, and Earth Medicine closer to home.
        </p>
      </section>

      <CeremonyExploreNav />

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

export default RetreatsInquiry;
