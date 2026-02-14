import { motion, type Easing } from "framer-motion";
import { Heart, Sparkles, BookOpen, Flame, Sun, Moon } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import Navigation from "@/components/Navigation";
import valentineHero from "@/assets/valentine-hero.jpg";
import valentineLove from "@/assets/valentine-love.jpg";
import valentineMeditation from "@/assets/valentine-meditation.jpg";
import valentineSelfcare from "@/assets/valentine-selfcare.jpg";
import logo from "@/assets/logo.png";

const ease: Easing = [0.25, 0.1, 0.25, 1];
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};
const stagger = {
  visible: { transition: { staggerChildren: 0.15 } },
};

const meditations = [
  {
    title: "Heart-Opening Breath",
    icon: <Heart className="h-6 w-6 text-primary" />,
    steps: [
      "Find a comfortable seat. Place both hands over your heart.",
      "Inhale deeply for 4 counts, imagining warm golden light filling your chest.",
      "Hold for 4 counts, feeling the warmth expand.",
      "Exhale for 6 counts, releasing anything that no longer serves you.",
      "Repeat for 5–10 minutes. With each breath, silently repeat: 'I am worthy of the love I give.'"
    ],
  },
  {
    title: "Mirror of Self-Love",
    icon: <Sparkles className="h-6 w-6 text-secondary" />,
    steps: [
      "Stand before a mirror. Soften your gaze and look into your own eyes.",
      "Place your hand on your heart and say aloud: 'I see you. I honor you. I love you.'",
      "Notice any emotions that arise — let them flow without judgment.",
      "Spend 3–5 minutes simply being present with yourself, as you would with a beloved.",
      "Close by whispering: 'Thank you for carrying me this far.'"
    ],
  },
  {
    title: "Rose Petal Visualization",
    icon: <Flame className="h-6 w-6 text-primary" />,
    steps: [
      "Lie down comfortably. Close your eyes and take three deep breaths.",
      "Visualize yourself lying in a field of soft rose petals — red, pink, white.",
      "With each inhale, feel the petals' fragrance filling your body with love.",
      "Imagine each petal represents a moment you were kind to yourself.",
      "Rest here for 10 minutes, letting gratitude wash over you like warm light."
    ],
  },
];

const journalPrompts = [
  { prompt: "What does love feel like in my body? Where do I feel it most?", icon: <Heart className="h-5 w-5" /> },
  { prompt: "Write a love letter to the version of yourself who needed it most.", icon: <BookOpen className="h-5 w-5" /> },
  { prompt: "What boundaries do I need to set in order to protect my peace?", icon: <Sun className="h-5 w-5" /> },
  { prompt: "List 10 things about yourself that you genuinely admire.", icon: <Sparkles className="h-5 w-5" /> },
  { prompt: "If my heart could speak, what would it ask me for right now?", icon: <Moon className="h-5 w-5" /> },
  { prompt: "What patterns in love am I ready to release? What am I calling in?", icon: <Flame className="h-5 w-5" /> },
  { prompt: "Describe your ideal relationship with yourself one year from today.", icon: <Heart className="h-5 w-5" /> },
  { prompt: "What act of self-love have I been postponing? Why?", icon: <Sun className="h-5 w-5" /> },
];

const ValentinesDay = () => {
  return (
    <div id="top" className="min-h-screen bg-background">
      <SEOHead
        title="Valentine's Day — A Sacred Return to Self-Love"
        description="Celebrate Valentine's Day with Temple Mother Earth. Discover the history of this sacred day, guided meditations, journal prompts, and rituals for radical self-love."
        path="/valentines-day"
      />
      <Navigation />

      {/* ───── HERO ───── */}
      <section className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden px-4 pt-20 text-center">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${valentineHero})` }} />
        <div className="absolute inset-0 bg-foreground/70" />
        <motion.div className="relative z-10 max-w-3xl" initial="hidden" animate="visible" variants={stagger}>
          <motion.p variants={fadeUp} className="font-body text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            February 14, 2026
          </motion.p>
          <motion.h1 variants={fadeUp} className="mt-4 font-display text-4xl font-bold leading-tight text-primary-foreground md:text-6xl">
            The Sacred Art of <br />
            <span className="text-primary">Loving Yourself</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-xl font-body text-lg text-primary-foreground/80">
            Before you can pour love into another, the cup must first be full. This Valentine's Day, we invite you to turn the rose inward.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap justify-center gap-4">
            <a href="#meditations" className="rounded-lg bg-primary px-6 py-3 font-body text-sm font-semibold text-primary-foreground transition hover:bg-primary/80">
              Guided Meditations
            </a>
            <a href="#journal" className="rounded-lg bg-secondary px-6 py-3 font-body text-sm font-semibold text-secondary-foreground transition hover:bg-primary hover:text-primary-foreground">
              Journal Prompts
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* ───── HISTORY ───── */}
      <section className="px-4 py-20 md:px-8">
        <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.p variants={fadeUp} className="font-body text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              The Origins
            </motion.p>
            <motion.h2 variants={fadeUp} className="mt-2 font-display text-3xl font-bold text-foreground md:text-4xl">
              How Valentine's Day Was Born
            </motion.h2>
            <motion.div variants={fadeUp} className="mt-6 space-y-4 font-body text-base leading-relaxed text-muted-foreground">
              <p>
                Valentine's Day traces its roots to <strong>Lupercalia</strong>, an ancient Roman fertility festival held each February 15th. During this celebration, priests would gather at the sacred cave where Romulus and Remus were believed to have been nursed by a she-wolf, performing rituals of purification and fertility.
              </p>
              <p>
                In the 3rd century AD, Emperor Claudius II outlawed marriage for young soldiers, believing single men made better warriors. A priest named <strong>Valentine</strong> defied this decree, secretly performing marriages. When discovered, he was imprisoned and eventually executed on February 14th, around 270 AD.
              </p>
              <p>
                Legend tells us that before his death, Valentine wrote a letter to his jailer's daughter — whom he had healed of blindness — signing it <em>"From your Valentine."</em> This act of love in the face of death became the seed of a tradition that would blossom across centuries.
              </p>
              <p>
                By the Middle Ages, February 14th became associated with romantic love, and by the 18th century, exchanging handwritten notes and tokens of affection was common across England and France.
              </p>
            </motion.div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, ease }}>
            <img src={valentineLove} alt="Couple embracing in golden light with rose petals" className="w-full rounded-2xl object-cover shadow-xl" />
          </motion.div>
        </div>
      </section>

      {/* ───── SELF-LOVE REFRAME ───── */}
      <section className="bg-foreground px-4 py-20 md:px-8">
        <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, ease }} className="order-2 md:order-1">
            <img src={valentineSelfcare} alt="Luxurious rose petal bath with candles" className="w-full rounded-2xl object-cover shadow-xl" />
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="order-1 md:order-2">
            <motion.p variants={fadeUp} className="font-body text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              A New Perspective
            </motion.p>
            <motion.h2 variants={fadeUp} className="mt-2 font-display text-3xl font-bold text-primary-foreground md:text-4xl">
              Valentine's Day Is About <span className="text-primary">You</span>
            </motion.h2>
            <motion.div variants={fadeUp} className="mt-6 space-y-4 font-body text-base leading-relaxed text-primary-foreground/80">
              <p>
                Somewhere along the way, Valentine's Day became about proving love to someone else — through gifts, dinners, and grand gestures. But the most revolutionary act of love? <strong>Giving it to yourself.</strong>
              </p>
              <p>
                Self-love is not selfish. It is the foundation upon which all other love is built. When you fill your own cup — when you honor your body, speak kindly to your spirit, and create sacred space for your own healing — you become a vessel of love for everyone around you.
              </p>
              <p>
                This Valentine's Day, we at Temple Mother Earth invite you to reclaim this day as a <strong>holy day of self-devotion</strong>. Light a candle. Draw a bath. Sit in silence. Write yourself a love letter. Remember that you are the love you've been searching for.
              </p>
              <p className="text-lg font-semibold text-primary italic">
                "You yourself, as much as anybody in the entire universe, deserve your love and affection." — Buddha
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ───── GUIDED MEDITATIONS ───── */}
      <section id="meditations" className="px-4 py-20 md:px-8">
        <motion.div className="mx-auto max-w-6xl text-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.p variants={fadeUp} className="font-body text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Sacred Practices
          </motion.p>
          <motion.h2 variants={fadeUp} className="mt-2 font-display text-3xl font-bold text-foreground md:text-4xl">
            Guided Meditations for Self-Love
          </motion.h2>
          <motion.p variants={fadeUp} className="mx-auto mt-4 max-w-2xl font-body text-muted-foreground">
            Set aside 10–15 minutes today. Find a quiet, sacred space. Light a candle if it calls to you. These meditations are your gift to yourself.
          </motion.p>
        </motion.div>

        <div className="mx-auto mt-12 grid max-w-6xl gap-8 md:grid-cols-3">
          {meditations.map((med, i) => (
            <motion.div
              key={med.title}
              className="rounded-2xl border border-border bg-card p-8 shadow-sm"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15, ease }}
            >
              <div className="mb-4 flex items-center gap-3">
                {med.icon}
                <h3 className="font-display text-xl font-bold text-foreground">{med.title}</h3>
              </div>
              <ol className="space-y-3">
                {med.steps.map((step, j) => (
                  <li key={j} className="flex gap-3 font-body text-sm leading-relaxed text-muted-foreground">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">{j + 1}</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ───── MEDITATION IMAGE BREAK ───── */}
      <section className="relative h-[50vh] overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${valentineMeditation})` }} />
        <div className="absolute inset-0 bg-foreground/50" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl font-display text-2xl font-bold italic leading-relaxed text-primary-foreground md:text-4xl"
          >
            "To love oneself is the beginning of a lifelong romance."
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-4 font-body text-sm tracking-widest text-primary-foreground/70 uppercase"
          >
            — Oscar Wilde
          </motion.p>
        </div>
      </section>

      {/* ───── JOURNAL PROMPTS ───── */}
      <section id="journal" className="px-4 py-20 md:px-8">
        <motion.div className="mx-auto max-w-6xl text-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.p variants={fadeUp} className="font-body text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Inner Exploration
          </motion.p>
          <motion.h2 variants={fadeUp} className="mt-2 font-display text-3xl font-bold text-foreground md:text-4xl">
            Journal Prompts for the Heart
          </motion.h2>
          <motion.p variants={fadeUp} className="mx-auto mt-4 max-w-2xl font-body text-muted-foreground">
            Grab your favorite journal, a warm cup of tea, and let these prompts guide you deeper into your own heart. There are no wrong answers — only honest ones.
          </motion.p>
        </motion.div>

        <div className="mx-auto mt-12 grid max-w-4xl gap-4 md:grid-cols-2">
          {journalPrompts.map((jp, i) => (
            <motion.div
              key={i}
              className="flex items-start gap-4 rounded-xl border border-border bg-card p-6 shadow-sm"
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08, ease }}
            >
              <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                {jp.icon}
              </div>
              <p className="font-body text-sm leading-relaxed text-foreground">{jp.prompt}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ───── SELF-LOVE RITUAL ───── */}
      <section className="bg-foreground px-4 py-20 md:px-8">
        <motion.div className="mx-auto max-w-3xl text-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.p variants={fadeUp} className="font-body text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Tonight's Ritual
          </motion.p>
          <motion.h2 variants={fadeUp} className="mt-2 font-display text-3xl font-bold text-primary-foreground md:text-4xl">
            A Valentine's Evening Ceremony
          </motion.h2>
          <motion.div variants={fadeUp} className="mt-8 space-y-6 text-left font-body text-base leading-relaxed text-primary-foreground/80">
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-6">
              <h3 className="mb-3 font-display text-lg font-bold text-primary">🕯️ Set Your Sacred Space</h3>
              <p>Dim the lights. Light candles — red for passion, pink for tenderness, white for purity of intention. Play soft music or nature sounds. Draw a warm bath with rose petals, epsom salts, and a few drops of ylang-ylang or rose essential oil.</p>
            </div>
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-6">
              <h3 className="mb-3 font-display text-lg font-bold text-primary">💌 Write Your Love Letter</h3>
              <p>Before entering the bath, write yourself a love letter. Tell yourself everything you wish someone had said to you. Acknowledge your strength, your beauty, your resilience. Seal it and place it somewhere you'll find it on a harder day.</p>
            </div>
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-6">
              <h3 className="mb-3 font-display text-lg font-bold text-primary">🌹 The Bath Meditation</h3>
              <p>As you sink into the water, close your eyes. Feel the warmth embrace you like the love you deserve. With each exhale, release one thing that has weighed on your heart. With each inhale, draw in compassion, grace, and radical self-acceptance. Stay as long as you need.</p>
            </div>
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-6">
              <h3 className="mb-3 font-display text-lg font-bold text-primary">✨ Close with Gratitude</h3>
              <p>When you're ready, step out and anoint yourself with your favorite oil or lotion. Look in the mirror and say: "I am the love of my life." Smile. Mean it. You are whole. You are sacred. You are enough.</p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ───── CTA ───── */}
      <section className="px-4 py-20 text-center md:px-8">
        <motion.div className="mx-auto max-w-2xl" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.div variants={fadeUp} className="flex justify-center">
            <Heart className="h-12 w-12 text-primary" />
          </motion.div>
          <motion.h2 variants={fadeUp} className="mt-4 font-display text-3xl font-bold text-foreground md:text-4xl">
            Happy Valentine's Day, Sovereign Soul
          </motion.h2>
          <motion.p variants={fadeUp} className="mx-auto mt-4 max-w-xl font-body text-muted-foreground">
            From the Temple Mother Earth family to yours — may this day remind you that the greatest love story ever written is the one between you and yourself.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/ceremony-intake" className="rounded-lg bg-primary px-6 py-3 font-body text-sm font-semibold text-primary-foreground transition hover:bg-primary/80">
              Begin Your Healing Journey
            </Link>
            <Link to="/membership" className="rounded-lg bg-secondary px-6 py-3 font-body text-sm font-semibold text-secondary-foreground transition hover:bg-primary hover:text-primary-foreground">
              Join Our Community
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ───── FOOTER ───── */}
      <footer className="bg-foreground px-4 py-12 text-center">
        <Link to="/" className="inline-flex items-center gap-3">
          <img src={logo} alt="Temple Mother Earth" className="h-10 w-10 rounded-full object-cover" />
          <span className="font-display text-lg font-bold text-primary-foreground tracking-wide">Temple Mother Earth</span>
        </Link>
        <p className="mt-4 font-body text-sm text-primary-foreground/60">
          © {new Date().getFullYear()} Temple Mother Earth. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default ValentinesDay;
