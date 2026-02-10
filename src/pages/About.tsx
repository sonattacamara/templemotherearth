import { motion, type Easing } from "framer-motion";
import { Heart, Shield, Users, Leaf, Globe, Sparkles, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import aboutHero from "@/assets/about-hero.jpg";
import founderSonatta from "@/assets/founder-sonatta.jpg";
import founderJames from "@/assets/founder-james.jpg";
import facilitator1 from "@/assets/facilitator-1.jpg";
import facilitator2 from "@/assets/facilitator-2.jpg";
import facilitator3 from "@/assets/facilitator-3.jpg";
import facilitator4 from "@/assets/facilitator-4.jpg";
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
    <div className="min-h-screen bg-background">
      <Navigation />

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
            Temple Mother Earth was born from a calling — a deep, ancestral pull to create a sacred space
            where sovereign beings can reconnect with the Earth, honor the God within, and walk the path
            of healing together.
          </motion.p>
        </motion.div>
      </section>

      {/* ───── OUR PURPOSE ───── */}
      <section className="px-4 py-24 md:py-32">
        <motion.div
          className="mx-auto max-w-4xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
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
                  Temple Mother Earth is a sacred sanctuary dedicated to ancestral healing, Earth Medicine ceremonies,
                  yoga, meditation, and community wellness. Founded in Washington, DC by Dr. Sonatta Camara and King James,
                  we honor the sacred traditions of the Earth and create a space where all seekers can reconnect with their
                  divine purpose.
                </p>
                <p>
                  We are guided by the belief that the Earth is our temple, and every sovereign being who walks upon her
                  carries the divine within. Our work bridges ancient Earth Medicine traditions with modern healing practices,
                  serving our local DC community while extending our reach through international retreats and traveling ceremonies.
                </p>
              </div>
            </motion.div>
            <motion.div variants={fadeUp} className="relative">
              <img
                src={aboutHero}
                alt="Temple Mother Earth sacred space"
                className="rounded-2xl shadow-xl"
                loading="lazy"
              />
              <div className="absolute -bottom-4 -right-4 rounded-xl bg-primary px-6 py-3 shadow-lg">
                <p className="font-display text-sm font-bold text-primary-foreground">Est. Washington, DC</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ───── MISSION & VISION ───── */}
      <section className="bg-card px-4 py-24 md:py-32">
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

          <div className="mt-16 grid gap-8 md:grid-cols-2">
            <motion.div variants={fadeUp} className="rounded-2xl border border-border bg-background p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-6 font-display text-2xl font-bold text-foreground">Our Mission</h3>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                To be in continuous ethical partnership with indigenous wisdom keepers while facilitating
                sacred Earth Medicine ceremonies and experiential learning for those seeking to heal from trauma,
                reconnect with their divine essence, and spiritually evolve their way of life through
                reconnection with Mother Earth. We serve our Washington, DC community and beyond through
                local ceremonies, international retreats, and traveling sacred experiences.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="rounded-2xl border border-border bg-background p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-6 font-display text-2xl font-bold text-foreground">Our Vision</h3>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                A world where every soul has access to sacred healing spaces and Earth Medicine traditions.
                Where the wisdom of the ancestors is honored, preserved, and shared with those who seek it.
                Where communities gather in circle, rooted in love and sovereignty, to remember the divine truth
                that lives within each of us. We envision Temple Mother Earth as a beacon for seekers worldwide —
                a living testament to the power of the Earth to heal, transform, and awaken.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ───── OUR VALUES ───── */}
      <section className="px-4 py-24 md:py-32">
        <motion.div
          className="mx-auto max-w-5xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="text-center">
            <p className="font-body text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              What We Stand For
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold text-foreground md:text-5xl">
              Our Sacred Values
            </h2>
          </motion.div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Shield,
                title: "Sovereignty",
                desc: "You are not a man. You are not a woman. You are not black or white. You are a sovereign being — a divine essence having a human experience. We honor this truth above all.",
              },
              {
                icon: Leaf,
                title: "Earth Medicine",
                desc: "We honor the sacred gifts of the Earth — Kambo, Hapé, and other ancestral medicines — as divine tools for healing, transformation, and spiritual alignment.",
              },
              {
                icon: Users,
                title: "Radical Inclusivity",
                desc: "Our temple doors are open to all seekers regardless of background. We intentionally move beyond labels of gender, race, or status. All are welcome in this sacred circle.",
              },
              {
                icon: Heart,
                title: "Personal Responsibility",
                desc: "You are the only person responsible for your own healing. We provide the sacred tools, the wisdom, and the space — but the journey is yours to walk.",
              },
              {
                icon: Sparkles,
                title: "The God Within",
                desc: "We worship and connect to the Divine through connection with the higher self. The answers you seek have always been within you. We help you remember.",
              },
              {
                icon: Globe,
                title: "Indigenous Reciprocity",
                desc: "We honor the ancestral traditions and indigenous wisdom keepers who carry this sacred knowledge. We give back generously and maintain ethical partnerships with indigenous communities.",
              },
            ].map((value) => (
              <motion.div
                key={value.title}
                variants={fadeUp}
                className="rounded-2xl border border-border bg-card p-6 transition hover:shadow-lg"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <value.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-foreground">{value.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ───── OUR COMMUNITY ───── */}
      <section className="bg-card px-4 py-24 md:py-32">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
        >
          <motion.p variants={fadeUp} className="font-body text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Our Community
          </motion.p>
          <motion.h2 variants={fadeUp} className="mt-4 font-display text-3xl font-bold text-card-foreground md:text-5xl">
            A Sacred Circle of Sovereign Beings
          </motion.h2>
          <motion.div variants={fadeUp} className="mt-8 space-y-6 text-lg leading-relaxed text-muted-foreground">
            <p>
              Temple Mother Earth is proudly rooted in the BIPOC community. We were founded by and for people
              of the African diaspora, while welcoming all sovereign beings who resonate with our mission.
              Our community is radically inclusive — intentionally moving beyond labels of gender, race, or status.
            </p>
            <p>
              As it says upon our temple door: <em className="font-semibold text-foreground">"You are not a man.
              You are not a woman. You are not black. You are not white. You are a sovereign being,
              and we came here to have an experience."</em>
            </p>
            <p>
              We believe in the power of circle — the ancient practice of gathering together in sacred space
              to share, heal, and grow. Every ceremony, every gathering, every retreat is an invitation to
              step deeper into your truth and walk alongside others who honor the same call.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* ───── FOUNDERS ───── */}
      <section className="px-4 py-24 md:py-32">
        <motion.div
          className="mx-auto max-w-5xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="text-center">
            <p className="font-body text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Our Founders
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold text-foreground md:text-5xl">
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
                Dr. Sonatta Camara
              </h3>
              <p className="mt-2 font-body text-sm font-semibold uppercase tracking-wider text-primary">
                Co-Founder & Spiritual Director
              </p>
              <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Dr. Sonatta Camara is a visionary healer, educator, and spiritual guide whose journey into
                  Earth Medicine began as a personal quest for healing and quickly evolved into a sacred calling.
                  With a background that bridges academia and ancestral wisdom, Dr. Camara brings a unique
                  depth to her work as co-founder and spiritual director of Temple Mother Earth.
                </p>
                <p>
                  Her approach to healing is rooted in the understanding that we are sovereign beings — divine
                  essences having a human experience. She guides seekers through sacred ceremonies including
                  Kambo, Hapé, and other Earth Medicine traditions, creating containers of profound safety,
                  love, and transformation.
                </p>
                <p>
                  Dr. Camara is passionate about making Earth Medicine accessible to the BIPOC community and
                  ensuring that indigenous wisdom traditions are honored and preserved. Under her leadership,
                  Temple Mother Earth has grown from a local healing space into a sanctuary that serves
                  seekers across the nation and internationally.
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
                  King James is a ceremony facilitator, spiritual counselor, and co-founder of Temple Mother Earth
                  whose powerful presence anchors every gathering in groundedness and sacred intention. His journey
                  into Earth Medicine was catalyzed by a deep desire to break generational cycles of trauma
                  and reconnect with ancestral wisdom.
                </p>
                <p>
                  James brings a warrior's heart and a healer's touch to his work. He holds space with unwavering
                  strength and compassion, guiding participants through Earth Medicine ceremonies with a depth
                  of care that honors both the sacred traditions and each individual's unique path.
                </p>
                <p>
                  As the operational force behind Temple Mother Earth, James oversees community engagement,
                  retreat coordination, and the expansion of TOME's traveling ceremony program. His vision
                  is to bring sacred healing to communities that have been historically underserved,
                  ensuring that Earth Medicine is accessible to all who seek it.
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

      {/* ───── FACILITATORS ───── */}
      <section className="bg-card px-4 py-24 md:py-32">
        <motion.div
          className="mx-auto max-w-5xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="text-center">
            <p className="font-body text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Our Sacred Circle
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold text-card-foreground md:text-5xl">
              Meet Our Facilitators
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-muted-foreground">
              Our facilitators are experienced practitioners who walk the path of Earth Medicine with integrity,
              compassion, and deep reverence for the sacred traditions we honor.
            </p>
          </motion.div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                name: "Amara Johnson",
                role: "Yoga & Breathwork Guide",
                img: facilitator1,
                desc: "Certified yoga instructor and breathwork facilitator specializing in somatic healing and body-centered spiritual practices.",
              },
              {
                name: "Kwame Davis",
                role: "Meditation & Integration Guide",
                img: facilitator2,
                desc: "Meditation teacher and integration specialist helping participants ground their ceremonial experiences into daily life.",
              },
              {
                name: "Isabella Reyes",
                role: "Herbalist & Earth Medicine Keeper",
                img: facilitator3,
                desc: "Traditional herbalist and Earth Medicine practitioner with deep knowledge of sacred plant allies and their healing properties.",
              },
              {
                name: "Mama Adjua",
                role: "Elder & Spiritual Counselor",
                img: facilitator4,
                desc: "Community elder and spiritual counselor offering ancestral wisdom, guidance, and the warmth of a grandmother's love.",
              },
            ].map((person) => (
              <motion.div
                key={person.name}
                variants={fadeUp}
                className="group overflow-hidden rounded-2xl border border-border bg-background transition hover:shadow-lg"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={person.img}
                    alt={person.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
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
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ───── PERSONAL RESPONSIBILITY (Ankara inspired) ───── */}
      <section className="px-4 py-24 md:py-32">
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
          <motion.h2 variants={fadeUp} className="mt-4 font-display text-3xl font-bold text-foreground md:text-5xl">
            You Are Your Own Healer
          </motion.h2>
          <motion.div variants={fadeUp} className="mt-8 space-y-6 text-lg leading-relaxed text-muted-foreground">
            <p>
              You are the only person responsible for your own healing. There is refined elegance in
              meeting your own needs with the assistance of Earth Medicine, while laying a solid foundation
              with all the resources you have been given. Healing is a lifestyle and a continuous journey.
            </p>
            <p>
              At Temple Mother Earth, we are human beings dedicated to providing space for YOU to do
              your OWN work with sacred tools, wisdom, guidance, and practices. This is not a magic cure
              or a quick fix — it is called medicine for a specific reason.
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

      {/* ───── FOOTER ───── */}
      <footer className="bg-foreground px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Temple Mother Earth" className="h-10 w-10 rounded-full object-cover" />
              <span className="font-display text-lg font-bold text-primary-foreground">Temple Mother Earth</span>
            </div>
            <div className="flex flex-wrap justify-center gap-6 font-body text-sm text-primary-foreground/60">
              <Link to="/" className="hover:text-primary transition-colors">Home</Link>
              <Link to="/about" className="hover:text-primary transition-colors">About</Link>
              <a href="https://www.eventbrite.com/o/temple-mother-earth-83633883498" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Events</a>
              <a href="mailto:AskUs@TempleMotherEarth.org" className="hover:text-primary transition-colors">Contact</a>
            </div>
          </div>
          <div className="mt-8 border-t border-primary-foreground/10 pt-8 text-center">
            <p className="font-body text-xs text-primary-foreground/40">
              © {new Date().getFullYear()} Temple Mother Earth. A 501(c)(3) nonprofit organization. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;
