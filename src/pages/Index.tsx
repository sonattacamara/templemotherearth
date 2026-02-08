import logo from "@/assets/logo.png";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-foreground via-foreground/95 to-foreground/85 px-4 text-center">
        <img
          src={logo}
          alt="Temple Mother Earth logo"
          className="mb-8 h-48 w-48 rounded-full object-cover shadow-2xl md:h-64 md:w-64"
        />
        <h1 className="font-display text-4xl font-bold tracking-tight text-primary-foreground md:text-6xl lg:text-7xl">
          Temple Mother Earth
        </h1>
        <p className="mt-4 max-w-xl text-lg text-primary-foreground/70 md:text-xl">
          A sacred sanctuary for healing, spiritual growth, and community rooted in the wisdom of Mother Earth.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a
            href="#about"
            className="rounded-lg bg-primary px-8 py-3 font-body text-sm font-semibold text-primary-foreground transition hover:bg-primary/80"
          >
            Explore Our Mission
          </a>
          <a
            href="#offerings"
            className="rounded-lg border border-primary-foreground/30 px-8 py-3 font-body text-sm font-semibold text-primary-foreground transition hover:bg-primary-foreground/10"
          >
            Our Offerings
          </a>
        </div>
      </section>

      {/* About */}
      <section id="about" className="px-4 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
            Rooted in Earth. Guided by Spirit.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Temple Mother Earth is a spiritual sanctuary dedicated to ancestral healing, 
            plant medicine ceremonies, yoga, meditation, and community wellness. We honor 
            the sacred traditions of the Earth and create a space where all seekers can 
            reconnect with their divine purpose.
          </p>
        </div>
      </section>

      {/* Offerings */}
      <section id="offerings" className="bg-card px-4 py-24">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-16 text-center font-display text-3xl font-bold text-card-foreground md:text-4xl">
            Sacred Offerings
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: "Healing Ceremonies",
                desc: "Sacred plant medicine and ancestral healing rituals guided by experienced practitioners.",
              },
              {
                title: "Yoga & Meditation",
                desc: "Daily practices to align body, mind, and spirit in our dedicated temple space.",
              },
              {
                title: "Community Gatherings",
                desc: "Workshops, drum circles, and seasonal celebrations honoring Earth's rhythms.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-border bg-background p-8 text-center transition hover:shadow-lg"
              >
                <h3 className="font-display text-xl font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-3 text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground px-4 py-12 text-center text-primary-foreground/60">
        <p className="font-body text-sm">
          © {new Date().getFullYear()} Temple Mother Earth. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Index;
