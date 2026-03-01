import { motion, type Easing } from "framer-motion";
import { Heart, Shield, Users, Leaf, Globe, Sparkles, ArrowLeft, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import PageBreadcrumb from "@/components/PageBreadcrumb";
import EventbriteCTA from "@/components/EventbriteCTA";
import DonationCTA from "@/components/DonationCTA";
import Navigation from "@/components/Navigation";
import aboutHero from "@/assets/about-hero.jpg";
import sacredSpace from "@/assets/sacred-space.jpg";
import founderSonatta from "@/assets/founder-sonatta.jpg";
import founderJames from "@/assets/founder-james.jpg";
import facilitatorDebra from "@/assets/facilitator-debra.jpg";
import facilitatorSpencer from "@/assets/facilitator-spencer.jpg";
import facilitatorSamira from "@/assets/facilitator-samira.jpg";
import facilitatorGeorge from "@/assets/facilitator-george-new.jpg";
import facilitatorJala from "@/assets/facilitator-jala.jpg";
import facilitatorRama from "@/assets/facilitator-rama.jpg";
import communityCircleGrass from "@/assets/community-circle-grass.jpg";
import logo from "@/assets/logo.png";

const ease: Easing = [0.25, 0.1, 0.25, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } },
};

const About = () => {
  return (
    <div id="top" className="min-h-screen bg-background">
      <SEOHead title="About Temple Mother Earth | Our Story & Mission" description="Learn how Temple Mother Earth was founded in 2020 to provide sacred plant medicine ceremonies, spiritual healing, and conscious community in Washington DC." path="/about" />
      <Navigation />
      <PageBreadcrumb items={[{ label: "About" }]} />

      {/* ───── HERO ───── */}
      <section className="relative flex min-h-[60vh] flex-col items-center justify-center overflow-hidden px-4 pt-20 text-center">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${aboutHero})` }}
        />
        <div className="absolute inset-0 bg-foreground/75" />
        <motion.div
          className="relative z-10 max-w-3xl"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <motion.p variants={fadeUp} className="font-body text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Who We Are
          </motion.p>
          <motion.h1 variants={fadeUp} className="mt-4 font-display text-4xl font-bold text-primary-foreground md:text-6xl">
            Our Story
          </motion.h1>
          <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-xl text-lg text-primary-foreground/75">
            Born during the pandemic, when the world was closing its doors, Temple Mother Earth opened ours — 
            bringing community together to heal with Mother Earth when it was needed most.
          </motion.p>
        </motion.div>
      </section>

      {/* ───── OUR PURPOSE ───── */}
      <section className="px-4 py-24 md:py-32">
        <motion.div
          className="mx-auto max-w-4xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={stagger}
        >
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <motion.div variants={fadeUp}>
              <p className="font-body text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                Our Purpose
              </p>
              <h2 className="mt-4 font-display text-3xl font-bold text-foreground md:text-4xl">
                Rooted in the Earth. Guided by Spirit.
              </h2>
              <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  In 2020, when the pandemic brought the world to a standstill and fear kept people isolated 
                  behind closed doors, Dr. Sonatta Camara and King James made a radical choice: they opened 
                  their doors. What began as intimate healing circles during the darkest days of the pandemic 
                  grew into Temple Mother Earth — a sacred sanctuary where sovereign beings come to reconnect 
                  with the Earth, honor the God within, and walk the path of healing together.
                </p>
                <p>
               Founded by and for people who are looking for higher states of consciousness, who want to end their own pain and suffering, who are ready for tapping into the God within them, to create love and abundance in all things. Temple Mother Earth bridges ancient Earth Medicine traditions with 
                  modern healing practices. From our Washington, DC sanctuary, we serve our local community 
                  and extend our reach through international immersions and traveling ceremonies.
                </p>
              </div>
            </motion.div>
            <motion.div variants={fadeUp} className="relative">
              <img
                src={sacredSpace}
                alt="Temple Mother Earth sacred space"
                className="rounded-2xl shadow-xl"
                loading="lazy"
              />
              <div className="absolute -bottom-4 -right-4 rounded-xl bg-primary px-6 py-3 shadow-lg">
                <p className="font-display text-sm font-bold text-primary-foreground">Est. 2020 · Washington, DC</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ───── MISSION & VISION ───── */}
      <section className="bg-card px-4 py-16 md:py-20">
        <motion.div
          className="mx-auto max-w-5xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="text-center">
            <p className="font-body text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Our Guiding Light
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold text-card-foreground md:text-5xl">
              Mission & Vision
            </h2>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-12 text-center">
            <p className="font-display text-xl font-semibold text-primary italic md:text-2xl">
              Honoring the Sacred. Awakening the Sovereign. Returning to the Truth Within.
            </p>
          </motion.div>

          <div className="mt-16 space-y-12">
            <motion.div variants={fadeUp} className="rounded-2xl border border-border bg-background p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-6 font-display text-2xl font-bold text-foreground">Restoring the Sacred Within Every Person</h3>
              <div className="mt-4 space-y-4 leading-relaxed text-muted-foreground">
                <p>
                  The mission of Temple Mother Earth is to guide individuals back to the place where true healing begins — within themselves. We believe that every human being carries an inner source of wisdom, clarity, and divine intelligence.
                </p>
                <p>
                  Our work is to help people reconnect with this inner truth through sacred Earth medicine, spiritual practice, and intentional self-discovery.
                </p>
                <p>
                  Healing is not about fixing what is broken; it is about remembering what has always been whole. Our mission is to create spaces where this remembrance becomes possible.
                </p>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="rounded-2xl border border-border bg-background p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-6 font-display text-2xl font-bold text-foreground">Providing Safe, Sacred Spaces for Healing & Transformation</h3>
              <div className="mt-4 space-y-4 leading-relaxed text-muted-foreground">
                <p>
                  We are committed to offering grounded, ethical, and spiritually aligned environments for ceremony, emotional work, and inner exploration. Whether in Washington, D.C. or during our international immersions, every gathering is held with reverence, prayer, and deep respect for the sacred lineages that inform our work.
                </p>
                <p>
                  Our mission is to ensure that anyone who steps through our doors feels safe, supported, and honored in their healing process. We prioritize trauma awareness, cultural integrity, emotional maturity, and responsible Earth medicine practices.
                </p>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="rounded-2xl border border-border bg-background p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-6 font-display text-2xl font-bold text-foreground">Building Community Through Connection & Consciousness</h3>
              <div className="mt-4 space-y-4 leading-relaxed text-muted-foreground">
                <p>
                  At Temple Mother Earth, we know that healing does not happen in isolation — it happens in community. Our mission includes fostering a spiritual family where people can be seen, heard, and held without judgment. Through circles, classes, ceremonies, and communal gatherings, we nurture environments where individuals can grow together, learn together, and remember their interconnectedness.
                </p>
                <p>
                  We hold a vision of community built on respect, compassion, sovereignty, and shared awakening.
                </p>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="rounded-2xl border border-border bg-background p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-6 font-display text-2xl font-bold text-foreground">Supporting Global Awakening Through Earth Medicine & Ancient Wisdom</h3>
              <div className="mt-4 space-y-4 leading-relaxed text-muted-foreground">
                <p>
                  Our mission extends beyond our physical location. We partner with aligned organizations, stewards, and facilitators to bring sacred Earth medicine work to immersion settings around the world. We honor the traditions that carry these medicines and remain committed to ethical sourcing, cultural respect, and reciprocal relationships with Indigenous teachers and sacred lands.
                </p>
                <p className="font-semibold text-foreground">
                  Our mission is simple but powerful: to support humanity's evolution by helping people reconnect with the Earth, with Spirit, and with the truth of who they are.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ───── OUR VALUES ───── */}
      <section className="px-4 py-16 md:py-20">
        <motion.div
          className="mx-auto max-w-5xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="text-center">
            <p className="font-body text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Our Values
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold text-foreground md:text-5xl">
              The Principles That Guide Our Sacred Work
            </h2>
          </motion.div>

          <div className="mt-16 space-y-8">
            {[
              {
                icon: Leaf,
                label: "Value 1",
                title: "Reverence for the Earth & the Sacred",
                desc: "At Temple Mother Earth, we honor the Earth as our first teacher, our medicine, and our guide. Every ceremony, circle, and gathering begins with a deep acknowledgment of the land, the elements, and the unseen forces that support our lives. We believe that healing happens when we return to harmony with nature and with the God within.",
                detail: "Our work is built on humility, respect, and gratitude — honoring the sacred lineages, teachings, and Earth medicines that make our healing possible.",
              },
              {
                icon: Shield,
                label: "Value 2",
                title: "Sovereignty & Personal Empowerment",
                desc: "We honor each person as a sovereign being with the right to choose their path, their pace, and their truth. Our role is never to impose belief systems or identities but to help individuals reconnect with their inner wisdom.",
                detail: "In our spaces, you are not defined by gender, race, titles, or labels. You are a spirit having a human experience. Sovereignty means remembering your power, your voice, and your ability to shape your life with intention and clarity.",
              },
              {
                icon: Users,
                label: "Value 3",
                title: "Community, Connection & Collective Healing",
                desc: "Our community is at the heart of everything we do. We believe that healing deepens when we are witnessed, supported, and held in sacred community. Temple Mother Earth brings people together to cultivate connection, emotional maturity, accountability, and mutual care.",
                detail: "In our circles, each person is welcomed as family. We grow together, learn together, and rise together — honoring the truth that we heal in relationship, not in isolation.",
              },
              {
                icon: Heart,
                label: "Value 4",
                title: "Integrity, Ethics & Sacred Responsibility",
                desc: "We hold our work with the highest level of responsibility. This includes ethical sourcing of Earth medicines, honoring Indigenous and ancestral traditions, upholding safety protocols in every ceremony, and providing consistent preparation and integration support.",
                detail: "Integrity guides every decision we make. We do not take shortcuts, we do not rush transformation, and we do not engage in practices that compromise the sanctity of this work. Everything is held with intention, transparency, and respect for Spirit.",
              },
              {
                icon: Sparkles,
                label: "Value 5",
                title: "Emotional Maturity & Inner Accountability",
                desc: "Healing requires courage, honesty, and a willingness to take responsibility for one's own path. We support individuals in developing emotional intelligence, communication skills, self-awareness, and the capacity to navigate life with clarity.",
                detail: "We believe emotional maturity is a spiritual practice — a way of aligning our actions with our highest self. Every offering, from ceremonies to classes, is designed to help people return to their inner truth with integrity and compassion.",
              },
              {
                icon: Globe,
                label: "Value 6",
                title: "Inclusivity, Belonging & Universal Humanity",
                desc: "Temple Mother Earth is an inclusive community where all people are welcome. We do not see you as a category — not male or female, not Black or white, not labels or roles. We recognize you as a human being, a divine soul, and a carrier of wisdom and purpose.",
                detail: "",
              },
            ].map((value) => (
              <motion.div
                key={value.title}
                variants={fadeUp}
                className="rounded-2xl border border-border bg-card p-8 transition hover:shadow-lg"
              >
                <div className="flex items-start gap-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-body text-xs font-bold uppercase tracking-[0.2em] text-primary">{value.label}</p>
                    <h3 className="mt-1 font-display text-xl font-semibold text-foreground">{value.title}</h3>
                    <p className="mt-3 leading-relaxed text-muted-foreground">{value.desc}</p>
                    {value.detail && (
                      <p className="mt-3 leading-relaxed text-muted-foreground">{value.detail}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ───── THE FIVE AGREEMENTS ───── */}
      <section className="bg-card px-4 py-24 md:py-32">
        <motion.div
          className="mx-auto max-w-4xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="text-center">
            <p className="font-body text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Our Guiding Wisdom
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold text-card-foreground md:text-5xl">
              The Four Agreements
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-muted-foreground">
              Rooted in the Toltec wisdom tradition, the Four Agreements guide how we walk through 
              the world and show up in community. We honor these principles as a foundation 
              for personal integrity, emotional maturity, and sacred living.
            </p>
          </motion.div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {[
              {
                number: "1",
                title: "Be Impeccable with Your Word",
                desc: "Speak with integrity. Say only what you mean. Use the power of your word in the direction of truth and love.",
              },
              {
                number: "2",
                title: "Don't Take Anything Personally",
                desc: "Nothing others do is because of you. What others say and do is a projection of their own reality, their own dream.",
              },
              {
                number: "3",
                title: "Don't Make Assumptions",
                desc: "Find the courage to ask questions and express what you really want. Communicate clearly to avoid misunderstandings and drama.",
              },
              {
                number: "4",
                title: "Always Do Your Best",
                desc: "Your best will change from moment to moment. Under any circumstance, simply do your best and you will avoid self-judgment and regret.",
              },
            ].map((agreement) => (
              <motion.div
                key={agreement.number}
                variants={fadeUp}
                className="rounded-2xl border border-border bg-background p-6 transition hover:shadow-lg"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <span className="font-display text-lg font-bold text-primary">{agreement.number}</span>
                  </div>
                  <BookOpen className="h-5 w-5 text-primary/50" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground">{agreement.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{agreement.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.p variants={fadeUp} className="mt-10 text-center text-sm text-muted-foreground italic">
            Based on the wisdom of Don Miguel Ruiz — "The Four Agreements"
          </motion.p>
        </motion.div>
      </section>

      {/* ───── STATEMENT OF BELIEFS ───── */}
      <section className="px-4 py-24 md:py-32">
        <motion.div
          className="mx-auto max-w-4xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="text-center">
            <p className="font-body text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Our Foundation
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold text-foreground md:text-5xl">
              Statement of Beliefs
            </h2>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-12 space-y-6 text-muted-foreground leading-relaxed">
            <div className="rounded-2xl border border-border bg-card p-8 space-y-4">
              <p>
                We believe that the Earth is sacred, alive, and a source of medicine, wisdom, and spiritual sustenance 
                for all human beings. We believe that the Creator — known by many names across cultures — has placed 
                within every person a divine spark, an inner intelligence, and the innate capacity for healing and transformation.
              </p>
              <p>
                We believe that Earth Medicine ceremonies — including but not limited to Kambo, Hapé, Cacao, and Sacred Plant 
                ceremonies — are sacramental practices that connect the human spirit to the divine, to nature, and to the 
                truth within. These practices are central to our religious and spiritual expression.
              </p>
              <p>
                We believe in the sovereignty of every individual to choose their spiritual path, to seek healing through 
                sacred traditions, and to gather in community for prayer, ceremony, and collective awakening.
              </p>
              <p>
                We believe that healing is not about fixing what is broken — it is about remembering what has always been whole. 
                Our ceremonies and gatherings are held with reverence, prayer, safety, and deep respect for the ancestral 
                and indigenous lineages that carry these sacred traditions.
              </p>
              <p className="text-sm text-muted-foreground/80 italic">
                Temple Mother Earth operates as a religious organization under the protections of the Religious Freedom 
                Restoration Act (RFRA) and the First Amendment of the United States Constitution.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      <section className="px-4 py-24 md:py-32">
        <motion.div
          className="mx-auto max-w-4xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          variants={stagger}
        >
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <motion.div variants={fadeUp}>
              <p className="font-body text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                Our Community
              </p>
              <h2 className="mt-4 font-display text-3xl font-bold text-foreground md:text-4xl">
                A Sacred Circle of Sovereign Beings
              </h2>
              <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
                <p>
               Temple Mother Earth is proudly rooted in the BIPOC community. We were founded by and for people
                  who are seeking higher states of consciousness and lasting transformation, while welcoming all sovereign beings who resonate with our mission.
                  Our community is radically inclusive — intentionally moving beyond labels of gender, race, or status.
                </p>
                <p>
                  As it says upon our temple door: <em className="font-semibold text-foreground">"You are not a man.
                  You are not a woman. You are not black. You are not white. You are a sovereign being,
                  and we came here to have an experience."</em>
                </p>
              </div>
            </motion.div>
            <motion.div variants={fadeUp}>
              <img
                src={communityCircleGrass}
                alt="Community circle of men sitting together on the grass at Temple Mother Earth"
                className="rounded-2xl shadow-xl"
                loading="lazy"
              />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ───── FOUNDERS ───── */}
      <section className="bg-card px-4 py-24 md:py-32">
        <motion.div
          className="mx-auto max-w-5xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="text-center">
            <p className="font-body text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Our Founders
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold text-card-foreground md:text-5xl">
              The Visionaries Behind the Temple
            </h2>
          </motion.div>

          {/* Dr. Sonatta Camara */}
          <motion.div variants={fadeUp} className="mt-16 grid gap-12 md:grid-cols-2 md:items-center">
            <div className="relative">
              <img
                src={founderSonatta}
                alt="Dr. Sonatta Camara"
                className="rounded-2xl shadow-xl"
                loading="lazy"
              />
            </div>
            <div>
              <h3 className="font-display text-2xl font-bold text-foreground md:text-3xl">
               Dr. Sonatta Camara, PhD
              </h3>
              <p className="mt-2 font-body text-sm font-semibold uppercase tracking-wider text-primary">
                Co-Founder & Spiritual Director
              </p>
              <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Dr. Sonatta Camara, PhD is a visionary educator and spiritual guide whose lineage traces
                  to West Africa — Guinea — and Cairo, Egypt, where East meets West, shaping the foundation
                  of who she is. Her journey into Earth Medicine began as a personal quest for reconnection
                  and quickly evolved into a sacred calling. With a background that bridges academia and
                  ancestral wisdom, Dr. Camara brings a unique depth to her work as co-founder and spiritual
                  director of Temple Mother Earth.
                </p>
                <p>
                  Her approach is rooted in the understanding that we are sovereign beings — divine
                  essences having a human experience. She guides individuals through sacred ceremonies including
                  Kambo, Hapé, and other Earth Medicine traditions, creating containers of profound safety,
                  love, and transformation.
                </p>
                <p>
                  Through her own healing journey, Dr. Camara discovered the transformative power of self-regulating 
                  the nervous system — a practice she now brings to the many women, especially executives and high-achievers, 
                  who carry the invisible weight of stress, burnout, and disconnection. Her mission is rooted in the 
                  understanding that when we learn to regulate our own systems, we unlock a deeper capacity for joy, 
                  purpose, and authentic leadership.
                </p>
                <p>
                  Dr. Camara is passionate about making Earth Medicine accessible and
                  ensuring that indigenous wisdom traditions are honored and preserved. Under her leadership,
                  Temple Mother Earth has grown from a local gathering space into a sanctuary that serves
                  individuals across the nation and internationally.
                </p>
              </div>
            </div>
          </motion.div>

          {/* King James */}
          <motion.div variants={fadeUp} className="mt-24 grid gap-12 md:grid-cols-2 md:items-center">
            <div className="order-2 md:order-1">
              <h3 className="font-display text-2xl font-bold text-foreground md:text-3xl">
                King James
              </h3>
              <p className="mt-2 font-body text-sm font-semibold uppercase tracking-wider text-primary">
                Co-Founder & Ceremony Facilitator
              </p>
              <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
                <p>
                   King James is a native Washingtonian, born and raised in the DC area. A retired United States Air Force veteran, accomplished black belt martial artist,
                   ceremony facilitator, and co-founder of Temple Mother Earth, his military service
                   instilled a warrior's discipline and unwavering commitment to service — qualities he now channels
                   into holding sacred space for healing and transformation.
                </p>
                <p>
                   James specializes in working with veterans and individuals navigating PTSD, drawing from his own
                   journey of healing through Earth Medicine to guide others through their darkest chapters. His deep
                   understanding of the veteran experience — the invisible wounds, the isolation, the search for purpose
                   after service — makes him a uniquely powerful facilitator for those who have served.
                </p>
                <p>
                   As a master beekeeper, James embodies the sacred relationship between humanity and the natural world,
                   tending to the pollinators that sustain Mother Earth. His practice of martial arts cultivates the
                   balance of strength and stillness that defines his ceremonial presence. As a Master Mason, he carries
                   forward ancient traditions of brotherhood, spiritual architecture, and moral foundation.
                </p>
                <p>
                   As the operational force behind Temple Mother Earth, James oversees community engagement,
                   immersion coordination, and the expansion of Temple Mother Earth's Veterans Transformation Program. His vision
                   is to bring sacred healing to communities that have been historically underserved — especially
                   fellow veterans and those carrying the weight of trauma — ensuring that Earth Medicine
                   is accessible to all who seek it.
                </p>
              </div>
            </div>
            <div className="relative order-1 md:order-2">
              <img
                src={founderJames}
                alt="King James"
                className="rounded-2xl shadow-xl"
                loading="lazy"
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ───── HIGH PRIEST ───── */}
      <section className="px-4 py-24 md:py-32">
        <motion.div
          className="mx-auto max-w-5xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="text-center">
            <p className="font-body text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Spiritual Leadership
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold text-foreground md:text-5xl">
              Meet the High Priest of Temple Mother Earth
            </h2>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-16 grid gap-12 md:grid-cols-2 md:items-center">
            <div className="relative">
              <img
                src={facilitatorGeorge}
                alt="Dr. George Xavier Love, Jr. — High Priest of Temple Mother Earth"
                className="rounded-2xl shadow-xl h-[500px] w-full object-cover object-[center_20%]"
                loading="lazy"
              />
              <div className="absolute -bottom-4 -right-4 rounded-xl bg-primary px-6 py-3 shadow-lg">
                <p className="font-display text-sm font-bold text-primary-foreground">High Priest</p>
              </div>
            </div>
            <div>
              <h3 className="font-display text-2xl font-bold text-foreground md:text-3xl">
                Dr. George Xavier Love, Jr.
              </h3>
              <p className="mt-2 font-body text-sm font-semibold uppercase tracking-wider text-primary">
                Spiritual Elder · High Priest · Taoist Qigong Master
              </p>
              <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  A shaman, priest, physician, and scholar warrior, Dr. George Xavier Love, Jr. serves as the High Priest of Temple Mother Earth — the spiritual anchor who carries the Kemetic and Taoist wisdom traditions that guide our community's deepest work.
                </p>
                <p>
                  Dr. Love's spiritual foundation is rooted in Taoism and Qigong. Through his practice of Blue Dragon Immortal Qigong, he guides individuals toward harmony with nature and spiritual elevation through chanting, body drumming, and trance dancing. Integrating Tibetan Buddhist Psychiatry and Taoist Psychology, he views Qi — the life force — as the fundamental energy of the universe, and teaches the creative power of emptiness as a path to transcendence and fearlessness.
                </p>
                <p>
                  As the keeper of our Kemetic teachings, Dr. Love illuminates the ancient Egyptian wisdom that forms the theological backbone of Temple Mother Earth — teaching the Body as Temple philosophy, the sacred significance of Kemet as the birthplace of humanity and medicine, and the Kemetic Trinity that connects us to our divine origins.
                </p>
                <p>
                  His presence in ceremony is both grounding and transcendent, holding space with a depth of knowledge that spans thousands of years of wisdom traditions.
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/kemetic-teachings"
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-body text-sm font-semibold text-primary-foreground shadow-lg transition hover:bg-primary/80"
                >
                  <BookOpen className="h-4 w-4" />
                  Explore His Teachings
                </Link>
                <a
                  href="https://loveqigong.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-border px-6 py-3 font-body text-sm font-semibold text-foreground transition hover:bg-card"
                >
                  loveqigong.com →
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ───── FACILITATORS ───── */}
      <section className="px-4 py-24 md:py-32">
        <motion.div
          className="mx-auto max-w-5xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="text-center">
            <p className="font-body text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Our Sacred Circle
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold text-foreground md:text-5xl">
              Meet Our Facilitators
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-muted-foreground">
              Our facilitators are experienced practitioners who walk the path of Earth Medicine with integrity,
              compassion, and deep reverence for the sacred traditions we honor. Each brings a unique gift to our community.
            </p>
          </motion.div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Debra Owens",
                role: "Yoga & Sound Therapy Guide",
                img: facilitatorDebra,
                desc: "Certified yoga instructor and sound therapist devoted to guiding others toward strength, flexibility, and inner peace — nurturing the body, calming the mind, and awakening the spirit.",
              },
              {
                name: "Walter Spencer",
                role: "Poet & Facilitator",
                img: facilitatorSpencer,
                desc: "A multi-medium artist from Prince George's County rooted in creativity and healing. Through poetry, plant medicine and beyond, he centers the voices of Black and Indigenous people. His offering to the Temple is The Cove: A Men's Healing & Reflection Circle — inviting men to slow down, soften, and be held.",
              },
              {
                name: "Samira Davis",
                role: "Herbalist & Earth Medicine Keeper",
                img: facilitatorSamira,
                desc: "Traditional herbalist, Earth Medicine keeper, and founder of BLVCK LXTUS. Samira carries deep knowledge of sacred plant allies and their healing properties, weaving ancestral herbal wisdom into modern wellness practices. Her work honors the sacred relationship between humanity and the botanical world, guiding individuals toward holistic healing through the Earth's abundant pharmacy.",
              },
              {
                name: "Jala Johnson",
                role: "Creator of Metamorphosis Mind 801 · Sound Healing Practitioner",
                img: facilitatorJala,
                desc: "Jala Johnson, creator of Metamorphosis Mind 801, is dedicated to spiritual exploration, personal expansion, and holistic wellness. Through sound healing sessions, themed workshops, immersions, and intentional gatherings, she supports individuals in self-expression, shedding outdated identities, and stepping more fully into authentic alignment.",
              },
              {
                name: "Rama",
                role: "Healer, Facilitator & Transpersonal Psychology Scholar",
                img: facilitatorRama,
                desc: "Equity and inclusion are at the core of Rama's work. Guided by Traditional Amazonian wisdom, he has trained with respected indigenous masters from the Shipibo-Conibo and Quechua-Lamista lineages, thoughtfully integrating ancient teachings into modern healing practices. A Volunteer Supervisor with the Fireside Project and MAPS MDMA-assisted Therapy Training graduate, Rama is currently pursuing a Ph.D. in transpersonal psychology. Through his work, he empowers others to heal, awaken, and step fully into their highest potential.",
              },
            ].map((person) => (
              <motion.div
                key={person.name}
                variants={fadeUp}
                className="group overflow-hidden rounded-2xl border border-border bg-card transition hover:shadow-lg"
              >
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={person.img}
                    alt={person.name}
                    className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                      person.name === "Samira Davis"
                        ? "object-[center_30%]"
                        : person.name === "Walter Spencer"
                        ? "object-[center_45%]"
                        : person.name === "Jala Johnson"
                        ? "object-[center_55%]"
                        : "object-top"
                    }`}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg font-semibold text-foreground">{person.name}</h3>
                  <p className="mt-1 font-body text-xs font-semibold uppercase tracking-wider text-primary">
                    {person.role}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{person.desc}</p>
                  {"website" in person && (person as any).website && (
                    <a href={(person as any).website} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-sm text-primary hover:underline">
                      {(person as any).website.replace("https://", "")} →
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ───── YOU ARE YOUR OWN HEALER ───── */}
      <section className="bg-card px-4 py-24 md:py-32">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
        >
          <motion.p variants={fadeUp} className="font-body text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Our Message to You
          </motion.p>
          <motion.h2 variants={fadeUp} className="mt-4 font-display text-3xl font-bold text-card-foreground md:text-5xl">
            You Are Your Own Healer
          </motion.h2>
          <motion.div variants={fadeUp} className="mt-8 space-y-6 text-lg leading-relaxed text-muted-foreground">
            <p>
              The Divine resides within you. Whether you call it God, Source, Universe, Spirit, 
              the Most High, the Creator, the Ancestors, the Great Mystery, Jah, Allah, Yahweh, 
              Brahman, the Sacred, or simply Love — that infinite intelligence lives within your 
              very being. You have always had the power to connect to it.
            </p>
            <p>
              At Temple Mother Earth, we are human beings dedicated to providing space for YOU to do
              your OWN work with sacred tools, wisdom, guidance, and practices. This is not a magic cure
              or a quick fix — it is called medicine for a specific reason. Healing is a lifestyle 
              and a continuous journey.
            </p>
            <p className="font-display text-xl font-semibold text-foreground italic">
              "Find your way back home to the wisdom and divine intelligence that exists within your entire being.
              You are your own healer and savior."
            </p>
          </motion.div>
          <motion.div variants={fadeUp} className="mt-10">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 font-body text-sm font-semibold text-primary-foreground shadow-lg transition hover:bg-primary/80"
            >
              <ArrowLeft className="h-4 w-4" />
              Return Home
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <DonationCTA
        variant="dark"
        eyebrow="Sustain the Temple"
        headline="Help Us Continue This Sacred Work"
        body="Your generosity sustains a living sanctuary — funding ceremonies, facilitator training, and community access for those who need it most."
        buttonLabel="Support the Temple"
      />

      <EventbriteCTA />

      {/* ───── FOOTER ───── */}
      <footer className="bg-foreground px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 md:grid-cols-4">
            <div>
              <Link to="/" className="flex items-center gap-3">
                <img src={logo} alt="Temple Mother Earth" className="h-10 w-10 rounded-full object-cover" />
                <span className="font-display text-lg font-bold text-primary-foreground">Temple Mother Earth</span>
              </Link>
              <p className="mt-4 text-sm text-primary-foreground/50 leading-relaxed">
                A 501(c)(3) nonprofit sanctuary for Earth Medicine, sovereignty, and sacred community. Est. 2020 · Washington, DC.
              </p>
            </div>
            <div>
              <h4 className="font-display text-sm font-bold uppercase tracking-wider text-primary">Experiences</h4>
              <div className="mt-4 flex flex-col gap-2.5 text-sm">
                <a href="https://www.eventbrite.com/o/29347213477#events" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/60 hover:text-primary transition-colors">Earth Medicine Ceremonies</a>
                <Link to="/retreats-inquiry" className="text-primary-foreground/60 hover:text-primary transition-colors">International Immersions</Link>
                <Link to="/traveling-ceremonies" className="text-primary-foreground/60 hover:text-primary transition-colors">Traveling Ceremonies</Link>
                <Link to="/private-ceremonies" className="text-primary-foreground/60 hover:text-primary transition-colors">Private Sessions</Link>
                <Link to="/membership" className="text-primary-foreground/60 hover:text-primary transition-colors">Membership Pathway</Link>
              </div>
            </div>
            <div>
              <h4 className="font-display text-sm font-bold uppercase tracking-wider text-primary">Get Involved</h4>
              <div className="mt-4 flex flex-col gap-2.5 text-sm">
                <Link to="/volunteer" className="text-primary-foreground/60 hover:text-primary transition-colors">Volunteer</Link>
                <Link to="/join-facilitator" className="text-primary-foreground/60 hover:text-primary transition-colors">Join as Facilitator</Link>
                <Link to="/sponsor" className="text-primary-foreground/60 hover:text-primary transition-colors">Become a Sponsor</Link>
                <Link to="/preparation" className="text-primary-foreground/60 hover:text-primary transition-colors">Ceremony Preparation</Link>
                <Link to="/conduct" className="text-primary-foreground/60 hover:text-primary transition-colors">Code of Conduct</Link>
              </div>
            </div>
            <div>
              <h4 className="font-display text-sm font-bold uppercase tracking-wider text-primary">Connect</h4>
              <div className="mt-4 flex flex-col gap-2.5 text-sm">
                
                <Link to="/about" className="text-primary-foreground/60 hover:text-primary transition-colors">About Us</Link>
                <Link to="/contact" className="text-primary-foreground/60 hover:text-primary transition-colors">Contact Us</Link>
                <Link to="/portal" className="text-primary-foreground/60 hover:text-primary transition-colors">Member Portal</Link>
                <a href="https://www.instagram.com/templemotherearth/" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/60 hover:text-primary transition-colors">Instagram</a>
                <a href="https://www.facebook.com/TempleMotherEarth2020/" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/60 hover:text-primary transition-colors">Facebook</a>
              </div>
            </div>
          </div>
          <div className="mt-12 border-t border-primary-foreground/10 pt-8">
            <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
              <p className="font-body text-xs text-primary-foreground/40">
                © {new Date().getFullYear()} Temple Mother Earth. A 501(c)(3) nonprofit organization. All rights reserved.
              </p>
              <p className="font-body text-xs text-primary-foreground/40 text-center md:text-right max-w-lg">
                Temple Mother Earth operates as a religious organization under the protections of the Religious Freedom Restoration Act (RFRA) and the First Amendment of the United States Constitution.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;
