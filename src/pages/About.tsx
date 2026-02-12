import { motion, type Easing } from "framer-motion";
import { Heart, Shield, Users, Leaf, Globe, Sparkles, ArrowLeft, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
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
import communityAbout from "@/assets/community-about.jpg";
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
                  In 2020, when the pandemic brought the world to a standstill and fear kept people isolated 
                  behind closed doors, Dr. Sonatta Camara and King James made a radical choice: they opened 
                  their doors. What began as intimate healing circles during the darkest days of the pandemic 
                  grew into Temple Mother Earth — a sacred sanctuary where sovereign beings come to reconnect 
                  with the Earth, honor the God within, and walk the path of healing together.
                </p>
                <p>
                  Founded by and for people of the African diaspora while welcoming all sovereign beings who 
                  resonate with our mission, Temple Mother Earth bridges ancient Earth Medicine traditions with 
                  modern healing practices. From our Washington, DC sanctuary, we serve our local community 
                  and extend our reach through international retreats and traveling ceremonies.
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
                  We are committed to offering grounded, ethical, and spiritually aligned environments for ceremony, emotional work, and inner exploration. Whether in Washington, D.C. or during our international retreats, every gathering is held with reverence, prayer, and deep respect for the sacred lineages that inform our work.
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
                  Our mission extends beyond our physical location. We partner with aligned organizations, stewards, and facilitators to bring sacred Earth medicine work to retreat settings around the world. We honor the traditions that carry these medicines and remain committed to ethical sourcing, cultural respect, and reciprocal relationships with Indigenous teachers and sacred lands.
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
              The Five Agreements
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-muted-foreground">
              Rooted in the Toltec wisdom tradition, the Five Agreements guide how we walk through 
              the world and show up in community. We honor these principles as a foundation 
              for personal integrity, emotional maturity, and sacred living.
            </p>
          </motion.div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
              {
                number: "5",
                title: "Be Skeptical, But Learn to Listen",
                desc: "Don't believe yourself or anybody else blindly. Use the power of doubt to question everything — but then listen with intent. The truth will reveal itself.",
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
            Based on the wisdom of Don Miguel Ruiz and Don Jose Ruiz — "The Fifth Agreement"
          </motion.p>
        </motion.div>
      </section>

      {/* ───── OUR COMMUNITY ───── */}
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
                Our Community
              </p>
              <h2 className="mt-4 font-display text-3xl font-bold text-foreground md:text-4xl">
                A Sacred Circle of Sovereign Beings
              </h2>
              <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
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
              </div>
            </motion.div>
            <motion.div variants={fadeUp}>
              <img
                src={communityAbout}
                alt="Temple Mother Earth community circle"
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
          viewport={{ once: true, amount: 0.2 }}
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
                   King James is a retired United States Air Force veteran, master beekeeper, accomplished martial artist,
                   Master Mason, ceremony facilitator, and co-founder of Temple Mother Earth. His military service
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
                   retreat coordination, and the expansion of TOME's traveling ceremony program. His vision
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

      {/* ───── FACILITATORS ───── */}
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
              Our Sacred Circle
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold text-foreground md:text-5xl">
              Meet Our Facilitators
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-muted-foreground">
              Our facilitators are experienced practitioners who walk the path of Earth Medicine with integrity,
              compassion, and deep reverence for the sacred traditions we honor.
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
                desc: "Traditional herbalist, Earth Medicine keeper, and founder of BLVCK LXTUS. Samira carries deep knowledge of sacred plant allies and their healing properties, weaving ancestral herbal wisdom into modern wellness practices. Her work honors the sacred relationship between humanity and the botanical world, guiding seekers toward holistic healing through the Earth's abundant pharmacy.",
              },
              {
                name: "Dr. George Xavier Love, Jr.",
                role: "Spiritual Elder & High Priest",
                img: facilitatorGeorge,
                desc: "A shaman, priest, physician, and scholar warrior, Dr. Love's spiritual foundation is rooted in Taoism and Qigong. Through his practice of Blue Dragon Immortal Qigong, he guides seekers toward harmony with nature and spiritual elevation through chanting, body drumming, and trance dancing. Integrating Tibetan Buddhist Psychiatry and Taoist Psychology, he views Qi — the life force — as the fundamental energy of the universe, and teaches the creative power of emptiness as a path to transcendence and fearlessness.",
              },
              {
                name: "Jala Johnson",
                role: "Wellness Space Curator & Sound Healing Practitioner",
                img: facilitatorJala,
                desc: "Jala Johnson of Metamorphosis Mind 801 is dedicated to spiritual exploration, personal expansion, and holistic wellness. Through sound healing sessions, themed workshops, retreats, and intentional gatherings, she supports individuals in self-expression, shedding outdated identities, and stepping more fully into authentic alignment.",
              },
            ].map((person) => (
              <motion.div
                key={person.name}
                variants={fadeUp}
                className="group overflow-hidden rounded-2xl border border-border bg-card transition hover:shadow-lg"
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
              <Link to="/volunteer" className="hover:text-primary transition-colors">Volunteer</Link>
              <Link to="/join-facilitator" className="hover:text-primary transition-colors">Join as Facilitator</Link>
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
