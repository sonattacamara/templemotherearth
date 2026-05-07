import { motion, type Easing } from "framer-motion";
import { Shield, Heart, Users, Eye, AlertTriangle, HandHeart } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import PageBreadcrumb from "@/components/PageBreadcrumb";
import EventbriteCTA from "@/components/EventbriteCTA";
import Navigation from "@/components/Navigation";
import sacredSpace from "@/assets/sacred-space.jpg";

const ease: Easing = [0.25, 0.1, 0.25, 1];
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};
const stagger = { visible: { transition: { staggerChildren: 0.12 } } };

const Conduct = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead title="Code of Conduct" description="Our community guidelines and code of conduct for all Temple Mother Earth ceremonies, events, and sacred gatherings." path="/conduct" />
      <Navigation />
      <PageBreadcrumb items={[{ label: "Code of Conduct" }]} />

      {/* Hero */}
      <section className="relative flex min-h-[50vh] items-center justify-center overflow-hidden px-4 pt-20">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${sacredSpace})` }} />
        <div className="absolute inset-0 bg-foreground/70" />
        <motion.div className="relative z-10 max-w-3xl text-center" initial="hidden" animate="visible" variants={stagger}>
          <motion.div variants={fadeUp} className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
            <Shield className="h-8 w-8 text-primary" />
          </motion.div>
          <motion.h1 variants={fadeUp} className="font-display text-3xl font-bold text-primary-foreground md:text-5xl">
            Code of Conduct
          </motion.h1>
          <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-xl text-lg text-primary-foreground/75">
            Temple Mother Earth is a sacred space. These guidelines ensure safety, respect, and
            the sanctity of every ceremony and gathering.
          </motion.p>
        </motion.div>
      </section>

      {/* Conduct Sections */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-3xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="space-y-8">

            <motion.div variants={fadeUp} className="rounded-2xl border border-border bg-card p-8">
              <div className="flex items-center gap-3 mb-4">
                <Heart className="h-6 w-6 text-primary" />
                <h2 className="font-display text-xl font-bold text-foreground">Sacred Space Agreement</h2>
              </div>
              <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                <p>By entering Temple Mother Earth · physically or through our virtual community · you agree to honor the following principles:</p>
                <ul className="space-y-2 pl-4">
                  <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />I honor the sovereignty of every being present.</li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />I will treat all members, facilitators, and guests with respect and compassion.</li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />I understand that what is shared in circle stays in circle · confidentiality is sacred.</li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />I will not attend ceremonies under the influence of alcohol or non-sacramental substances.</li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />I take full personal responsibility for my ceremonial journey.</li>
                </ul>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="rounded-2xl border border-border bg-card p-8">
              <div className="flex items-center gap-3 mb-4">
                <Eye className="h-6 w-6 text-primary" />
                <h2 className="font-display text-xl font-bold text-foreground">During Ceremony</h2>
              </div>
              <ul className="space-y-2 pl-4 text-sm text-muted-foreground">
                <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />Follow all instructions from your facilitator at all times.</li>
                <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />Cell phones must be silenced and put away during ceremony.</li>
                <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />No photography or recording during sacred ceremonies unless explicitly permitted.</li>
                <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />Remain within the ceremonial space until the facilitator closes the ceremony.</li>
                <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />If you feel unsafe or uncomfortable at any time, communicate with your facilitator immediately.</li>
                <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />Respect the space · leave it cleaner than you found it.</li>
              </ul>
            </motion.div>

            <motion.div variants={fadeUp} className="rounded-2xl border border-border bg-card p-8">
              <div className="flex items-center gap-3 mb-4">
                <Users className="h-6 w-6 text-primary" />
                <h2 className="font-display text-xl font-bold text-foreground">Community Standards</h2>
              </div>
              <ul className="space-y-2 pl-4 text-sm text-muted-foreground">
                <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />No harassment, discrimination, or disrespect of any kind will be tolerated.</li>
                <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />Honor the lived experiences and ceremonial journeys of others without judgment.</li>
                <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />Practice active listening · hold space rather than offering unsolicited advice.</li>
                <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />Respect the physical boundaries of all community members at all times.</li>
                <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />Children are welcome at family-friendly events only (Community Day, Soulful Sundays, Cacao Ceremony). All Earth Medicine ceremonies are 21+.</li>
              </ul>
            </motion.div>

            <motion.div variants={fadeUp} className="rounded-2xl border border-border bg-card p-8">
              <div className="flex items-center gap-3 mb-4">
                <HandHeart className="h-6 w-6 text-primary" />
                <h2 className="font-display text-xl font-bold text-foreground">Our Commitment to You</h2>
              </div>
              <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                <p>Temple Mother Earth is committed to providing:</p>
                <ul className="space-y-2 pl-4">
                  <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />Experienced, trained facilitators for all ceremonies and gatherings.</li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />A safe, clean, and sacred environment for transformation.</li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />Transparent communication about what to expect.</li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />Integration support before, during, and after ceremony.</li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />Ethical partnerships with indigenous wisdom keepers.</li>
                </ul>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="rounded-2xl border border-primary/20 bg-primary/5 p-8">
              <div className="flex items-start gap-4">
                <AlertTriangle className="mt-1 h-6 w-6 shrink-0 text-primary" />
                <div>
                  <h3 className="font-display text-lg font-semibold text-foreground">Violations</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    Any violation of this code of conduct may result in immediate removal from the ceremony or event,
                    and potential suspension from future Temple Mother Earth activities. The safety of our community
                    is non-negotiable.
                  </p>
                  <p className="mt-3 text-sm text-muted-foreground">
                    Questions or concerns? Reach out through our community circles on Telegram.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <div className="mt-12 text-center">
            <Link to="/preparation" className="rounded-xl bg-primary px-8 py-3.5 font-body text-sm font-semibold text-primary-foreground shadow-lg transition hover:bg-primary/80">
              View Preparation Guidelines
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

export default Conduct;
