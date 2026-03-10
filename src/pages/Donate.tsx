import { useState } from "react";
import { Link } from "react-router-dom";
import { HandHeart, Leaf, Users, Sparkles, Heart, Shield, ArrowRight } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import Navigation from "@/components/Navigation";
import EventbriteCTA from "@/components/EventbriteCTA";
import DonateHeroSplit from "@/components/donate/DonateHeroSplit";
import DonateImpactCards from "@/components/donate/DonateImpactCards";
import DonateCTA from "@/components/donate/DonateCTA";
import DonateDisclosureModal from "@/components/donate/DonateDisclosureModal";
import sacredSpaceImg from "@/assets/sacred-space.jpg";

const PAYPAL_DONATE_URL =
  "https://www.paypal.com/donate?token=NXLlyiujSJagIrl9uk8qrPC1eutuXlYi84XbzMEIMVb1EasE5b-TxfSz6XcEwmtr_Bk0lXZ-X6ph23t-qhv_9x_2VK8&useraction=commit%2Fdonate%2F&sdkMeta=eyJ1cmwiOiJodHRwczovL3d3dy5wYXlwYWxvYmplY3RzLmNvbS9kb25hdGUvc2RrL2RvbmF0ZS1zZGsuanMiLCJhdHRycyI6eyJkYXRhLXVpZCI6InVpZF9wb2t1aW9tbmJnc293cGhpc2F1Z2VianVpb21iamsifX0&targetMeta=eyJ6b2lkVmVyc2lvbiI6IjlfMF81OCIsInRhcmdldCI6IkRPTkFURSIsInNka1ZlcnNpb24iOiIwLjkuMCJ9";

const impactCards = [
  {
    icon: Leaf,
    title: "Preserve Sacred Traditions",
    desc: "Your offering helps maintain and protect Earth Medicine traditions passed down through generations of indigenous wisdom keepers.",
  },
  {
    icon: Users,
    title: "Grow Our Sacred Family",
    desc: "Fund community gatherings, sacred services, and educational programs that bring our Temple family together in healing.",
  },
  {
    icon: Shield,
    title: "Sacred Stewardship",
    desc: "Sponsor a veteran's transformation journey, covering ceremony, lodging, meals, and aftercare for those who gave everything.",
  },
  {
    icon: Heart,
    title: "Ceremony Scholarships",
    desc: "Gift the journey to someone who may not have the financial means to experience the transformative power of sacred ceremony.",
  },
  {
    icon: Sparkles,
    title: "Sustain the Temple",
    desc: "Keep our sacred space operational, from facility maintenance to facilitator training and safety protocols.",
  },
  {
    icon: HandHeart,
    title: "Community Outreach",
    desc: "Bring traveling ceremonies and educational resources to communities across the country who need healing most.",
  },
];

const disclosureItems = [
  "Sacred ceremony facilitation and community gatherings",
  "Veteran transformation program scholarships",
  "Facilitator training and sacred space maintenance",
  "Earth Medicine education and safety protocols",
  "Community outreach and traveling ceremony programs",
];

const Donate = () => {
  const [showDisclosure, setShowDisclosure] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Offerings & Tithes | Temple Mother Earth"
        description="Make a tax-deductible offering to Temple Mother Earth. Support our 501(c)(3) nonprofit mission of healing, community, and preserving Earth Medicine traditions."
        path="/donate"
      />
      <Navigation />

      <DonateHeroSplit
        heroImage={sacredSpaceImg}
        tagline="Offerings & Tithes"
        heading="Keep the Temple Sustainable"
        description="Your generosity sustains a sacred space where healing, community, and Earth Medicine traditions thrive. Every offering directly supports our mission to preserve these practices and expand access to transformation."
        taxNote="Temple Mother Earth is a US federally tax-exempt 501(c)(3) religious organization. All contributions are tax-deductible. Thank you for being part of this sacred family."
        donateUrl={PAYPAL_DONATE_URL}
        buttonLabel="Offerings & Tithes"
      />

      <DonateImpactCards
        heading="How Your Offering Creates Healing"
        subheading="Every dollar sown into the Temple directly supports transformation, community, and the preservation of sacred traditions."
        cards={impactCards}
      />

      {/* Specific Fund Links */}
      <section className="bg-card px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <p className="text-center font-body text-xs uppercase tracking-[0.3em] text-primary">
            Directed Giving
          </p>
          <h2 className="mt-3 text-center font-display text-2xl font-bold text-card-foreground md:text-3xl">
            Sow Into a Specific Fund
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-center text-sm text-muted-foreground">
            If you feel called to direct your offering toward a particular area of our mission, explore these dedicated funds.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <a
              href="https://www.paypal.com/donate?campaign_id=733MK2T3UK5LS"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-xl border border-border bg-background p-6 transition hover:border-primary/40 hover:shadow-md"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-display text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                  Ceremony Scholarship Fund
                </h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  Gift the journey to someone who cannot afford sacred ceremony
                </p>
              </div>
              <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-muted-foreground/40 group-hover:text-primary transition-colors" />
            </a>

            <a
              href="https://www.paypal.com/donate?campaign_id=R877JP38Q4F8S"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-xl border border-border bg-background p-6 transition hover:border-primary/40 hover:shadow-md"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-display text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                  Sacred Stewardship Fund
                </h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  Sponsor a veteran's healing and transformation journey
                </p>
              </div>
              <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-muted-foreground/40 group-hover:text-primary transition-colors" />
            </a>
          </div>
        </div>
      </section>

      <DonateCTA
        tagline="Sustain the Sacred"
        heading="Your Offering Plants Seeds of Transformation"
        body="Temple Mother Earth is a 501(c)(3) nonprofit organization. Your tax-deductible offering helps us continue to serve our community, preserve Earth Medicine traditions, and grow our sacred family."
        donateUrl={PAYPAL_DONATE_URL}
        buttonLabel="Offerings & Tithes"
        onDisclosure={() => setShowDisclosure(true)}
      />

      <EventbriteCTA />

      <footer className="bg-foreground px-4 py-12">
        <div className="mx-auto max-w-4xl text-center">
          <p className="font-body text-xs text-primary-foreground/40">
            &copy; {new Date().getFullYear()} Temple Mother Earth. A 501(c)(3) nonprofit
            organization. All rights reserved.
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

export default Donate;
