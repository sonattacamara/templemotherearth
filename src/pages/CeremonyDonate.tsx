import { useState } from "react";
import { Link } from "react-router-dom";
import { Leaf, Users, Sparkles, ArrowRight, Heart } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import Navigation from "@/components/Navigation";
import EventbriteCTA from "@/components/EventbriteCTA";
import DonateHeroSplit from "@/components/donate/DonateHeroSplit";
import DonateImpactCards from "@/components/donate/DonateImpactCards";
import DonateCTA from "@/components/donate/DonateCTA";
import DonateDisclosureModal from "@/components/donate/DonateDisclosureModal";
import ceremonyImg from "@/assets/offering-ceremony.jpg";

const CEREMONY_PAYPAL_URL = "https://www.paypal.com/donate?campaign_id=733MK2T3UK5LS";

const impactCards = [
  {
    icon: Leaf,
    title: "Ceremony Access",
    desc: "Covers the sacred reciprocity of a ceremony experience for a community member in financial need.",
  },
  {
    icon: Users,
    title: "Community Sacrament",
    desc: "Supports group ceremonies, creating shared sacred spaces where transformation happens collectively.",
  },
  {
    icon: Sparkles,
    title: "Aftercare & Integration",
    desc: "Funds follow-up support and integration resources so the transformative journey continues beyond ceremony.",
  },
];

const disclosureItems = [
  "Full ceremony scholarships for community members in need",
  "Facilitator preparation and sacred space setup",
  "Post-ceremony integration and aftercare resources",
  "Earth Medicine education and safety protocols",
];

const CeremonyDonate = () => {
  const [showDisclosure, setShowDisclosure] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Donate | Support Sacred Ceremonies"
        description="Make a tax-deductible donation to Temple Mother Earth. Support our 508(c)(1)(A) sacred mission of transformation and community."
        path="/donate/ceremony"
      />
      <Navigation />

      <DonateHeroSplit
        heroImage={ceremonyImg}
        tagline="Ceremony Scholarship Fund"
        heading="Gift the Journey to Someone Else"
        description="Your generous contribution makes it possible for someone who may not have the financial means to experience the transformative power of sacred ceremony."
        taxNote="Temple Mother Earth is a US federally tax-exempt 508(c)(1)(A) sacred ceremony church. All contributions are tax-deductible."
        donateUrl={CEREMONY_PAYPAL_URL}
        buttonLabel="Gift a Journey"
        buttonIcon={Heart}
      />

      <DonateImpactCards
        heading="How Your Gift Creates Healing"
        subheading="Every dollar donated to the Ceremony Fund directly supports someone's path to transformation."
        cards={impactCards}
      />

      <DonateCTA
        tagline="Sow Into Transformation"
        heading="Plant a Seed of Transformation"
        body="Temple Mother Earth is a 508(c)(1)(A) sacred ceremony church. Your tax-deductible gift helps fund ceremony scholarships for those who cannot afford the journey on their own. You are planting seeds of transformation."
        donateUrl={CEREMONY_PAYPAL_URL}
        buttonLabel="Gift a Journey"
        buttonIcon={Heart}
        onDisclosure={() => setShowDisclosure(true)}
      />

      {/* Back Links */}
      <section className="px-4 py-10 text-center space-y-3">
        <Link
          to="/donate"
          className="inline-flex items-center gap-2 font-body text-sm text-primary transition hover:text-primary/80"
        >
          <ArrowRight className="h-4 w-4 rotate-180" />
          View All Offering Options
        </Link>
        <br />
        <Link
          to="/ceremony-intake"
          className="inline-flex items-center gap-2 font-body text-xs text-muted-foreground transition hover:text-foreground"
        >
          <ArrowRight className="h-3.5 w-3.5 rotate-180" />
          Return to Sacred Intake Form
        </Link>
      </section>

      <EventbriteCTA />

      <footer className="bg-foreground px-4 py-12">
        <div className="mx-auto max-w-4xl text-center">
          <p className="font-body text-xs text-primary-foreground/40">
            &copy; {new Date().getFullYear()} Temple Mother Earth. A 508(c)(1)(A) sacred ceremony
            church. All rights reserved.
          </p>
        </div>
      </footer>

      <DonateDisclosureModal
        open={showDisclosure}
        onClose={() => setShowDisclosure(false)}
        items={disclosureItems}
      />
    </div>
  );
};

export default CeremonyDonate;
