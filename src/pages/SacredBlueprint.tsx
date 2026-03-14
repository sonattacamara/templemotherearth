import { useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import SEOHead from "@/components/SEOHead";
import PageBreadcrumb from "@/components/PageBreadcrumb";
import EventbriteCTA from "@/components/EventbriteCTA";
import DonationCTA from "@/components/DonationCTA";
import BlueprintHero from "@/components/sacred-blueprint/BlueprintHero";
import BlueprintIntro from "@/components/sacred-blueprint/BlueprintIntro";
import BlueprintForm from "@/components/sacred-blueprint/BlueprintForm";
import BlueprintChartPlaceholder from "@/components/sacred-blueprint/BlueprintChartPlaceholder";
import BlueprintReveals from "@/components/sacred-blueprint/BlueprintReveals";

import BlueprintReadings from "@/components/sacred-blueprint/BlueprintReadings";
import BlueprintTestimonials from "@/components/sacred-blueprint/BlueprintTestimonials";
import BlueprintFooterCTA from "@/components/sacred-blueprint/BlueprintFooterCTA";
import logo from "@/assets/logo.png";

const SacredBlueprint = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);

  return (
    <div id="top" className="min-h-screen bg-background">
      <SEOHead
        title="Sacred Blueprint | Discover Your Human Design | Temple Mother Earth"
        description="Discover your Sacred Blueprint — your unique Human Design chart decoded through a sacred lens. Get your free chart and book a reading with Sonatta Camara, PhD."
        path="/sacred-blueprint"
      />
      <Navigation />
      <PageBreadcrumb items={[{ label: "Sacred Blueprint" }]} />

      <BlueprintHero />
      <BlueprintIntro />
      <BlueprintForm onSuccess={() => setFormSubmitted(true)} />

      {formSubmitted && <BlueprintChartPlaceholder />}

      <BlueprintReveals />
      <BlueprintTypePath />
      <BlueprintReadings />
      <BlueprintTestimonials />
      <BlueprintFooterCTA />

      <DonationCTA
        variant="dark"
        eyebrow="Sustain the Sacred"
        headline="Walk With Us on This Journey"
        body="Your tax-deductible offering helps Temple Mother Earth continue to hold space for sacred healing, education, and community."
        buttonLabel="Offerings & Tithes"
      />

      <EventbriteCTA />

      <footer className="bg-foreground py-12 text-center">
        <img src={logo} alt="Temple Mother Earth" className="mx-auto mb-4 h-12 w-auto opacity-80" />
        <p className="font-body text-sm text-primary-foreground/60">
          © {new Date().getFullYear()} Temple Mother Earth · All Rights Reserved
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-6 text-sm text-primary-foreground/50">
          <Link to="/about" className="hover:text-primary transition-colors">About</Link>
          <Link to="/contact" className="hover:text-primary transition-colors">Contact Us</Link>
          <Link to="/membership" className="hover:text-primary transition-colors">Membership</Link>
          <Link to="/conduct" className="hover:text-primary transition-colors">Code of Conduct</Link>
          <Link to="/preparation" className="hover:text-primary transition-colors">Preparation</Link>
        </div>
      </footer>
    </div>
  );
};

export default SacredBlueprint;
