import { useLocation, useNavigate } from "react-router-dom";
import { Leaf, HandHeart, Heart, Shield, Sparkles } from "lucide-react";

const PAYPAL_DONATE_URL = "https://www.paypal.com/donate?token=NXLlyiujSJagIrl9uk8qrPC1eutuXlYi84XbzMEIMVb1EasE5b-TxfSz6XcEwmtr_Bk0lXZ-X6ph23t-qhv_9x_2VK8&useraction=commit%2Fdonate%2F&sdkMeta=eyJ1cmwiOiJodHRwczovL3d3dy5wYXlwYWxvYmplY3RzLmNvbS9kb25hdGUvc2RrL2RvbmF0ZS1zZGsuanMiLCJhdHRycyI6eyJkYXRhLXVpZCI6InVpZF9wb2t1aW9tbmJnc293cGhpc2F1Z2VianVpb21iamsifX0&targetMeta=eyJ6b2lkVmVyc2lvbiI6IjlfMF81OCIsInRhcmdldCI6IkRPTkFURSIsInNka1ZlcnNpb24iOiIwLjkuMCJ9";

const VETERAN_PAYPAL_URL = "https://www.paypal.com/donate?campaign_id=R877JP38Q4F8S";

const CEREMONY_PAYPAL_URL = "https://www.paypal.com/donate?campaign_id=733MK2T3UK5LS";

const urlMap: Record<string, string> = {
  "/veterans-transformation-program": VETERAN_PAYPAL_URL,
  "/ceremony-intake": CEREMONY_PAYPAL_URL,
  "/donate/ceremony": CEREMONY_PAYPAL_URL,
  "/retreats-inquiry": CEREMONY_PAYPAL_URL,
  "/traveling-ceremonies": CEREMONY_PAYPAL_URL,
  "/private-ceremonies": CEREMONY_PAYPAL_URL,
};

interface PageConfig {
  label: string;
  icon: typeof Leaf;
  modalHeading: string;
  modalBody: string;
  modalButton: string;
}

const pageConfig: Record<string, PageConfig> = {
  "/": { label: "Offerings & Tithes", icon: Leaf, modalHeading: "Keep the Temple Sustainable", modalBody: "Your tax-deductible offerings & tithes help us continue to serve our community, preserve Earth Medicine traditions, and grow our sacred family.", modalButton: "Offerings & Tithes" },
  "/about": { label: "Sustain the Temple", icon: Heart, modalHeading: "Sustain the Temple", modalBody: "Your contribution helps preserve our sacred space, fund community programs, and ensure the Temple's mission endures for generations.", modalButton: "Sustain the Temple" },
  "/veterans-transformation-program": { label: "Support a Warrior", icon: Shield, modalHeading: "Support a Warrior's Healing", modalBody: "Your contribution directly sponsors a veteran's transformation journey — covering ceremony, lodging, meals, and aftercare. Every dollar serves a warrior who gave everything.", modalButton: "Support a Warrior" },
  "/membership": { label: "Plant a Seed", icon: Sparkles, modalHeading: "Plant a Seed of Growth", modalBody: "Your offering nurtures the Temple's membership community, funding sacred gatherings and educational resources for our growing family.", modalButton: "Plant a Seed" },
  "/sponsor": { label: "Give Today", icon: HandHeart, modalHeading: "Give Today", modalBody: "Your generous sponsorship fuels the Temple's programs, ceremonies, and community outreach. Every contribution makes a difference.", modalButton: "Give Today" },
  "/ceremony-intake": { label: "Sow Into Healing", icon: Heart, modalHeading: "Sow Into Healing", modalBody: "Your gift helps fund ceremony scholarships for those who cannot afford the journey on their own. You are planting seeds of transformation.", modalButton: "Sow Into Healing" },
  "/donate/ceremony": { label: "Gift a Journey", icon: Heart, modalHeading: "Gift a Journey", modalBody: "Your gift helps fund ceremony scholarships for those who cannot afford the journey on their own. You are planting seeds of transformation.", modalButton: "Gift a Journey" },
  "/volunteer": { label: "Give Back", icon: HandHeart, modalHeading: "Give Back to the Temple", modalBody: "Your financial offering complements the gift of your time, helping sustain the sacred space where volunteers serve.", modalButton: "Give Back" },
  "/contact": { label: "Support Our Mission", icon: Heart, modalHeading: "Support Our Mission", modalBody: "Your tax-deductible contribution helps us continue serving our community and preserving Earth Medicine traditions.", modalButton: "Support Our Mission" },
  "/retreats-inquiry": { label: "Fuel the Journey", icon: Sparkles, modalHeading: "Fuel the Journey", modalBody: "Your offering helps fund immersion experiences and scholarship programs for those called to deeper healing.", modalButton: "Fuel the Journey" },
  "/traveling-ceremonies": { label: "Carry the Light", icon: Sparkles, modalHeading: "Carry the Light", modalBody: "Your contribution helps bring sacred ceremonies to communities across the country, expanding access to Earth Medicine healing.", modalButton: "Carry the Light" },
  "/private-ceremonies": { label: "Honor the Sacred", icon: Leaf, modalHeading: "Honor the Sacred", modalBody: "Your offering supports the facilitation of private ceremonies and the training of sacred space holders.", modalButton: "Honor the Sacred" },
  "/preparation": { label: "Plant a Seed", icon: Leaf, modalHeading: "Plant a Seed", modalBody: "Your gift supports educational resources and preparation materials for those embarking on their sacred journey.", modalButton: "Plant a Seed" },
  "/conduct": { label: "Sustain the Temple", icon: Heart, modalHeading: "Sustain the Temple", modalBody: "Your offering helps maintain the integrity and safety of our sacred community standards.", modalButton: "Sustain the Temple" },
  "/plant-medicine-glossary": { label: "Support the Mission", icon: Leaf, modalHeading: "Support the Mission", modalBody: "Your contribution helps fund educational outreach and the preservation of Earth Medicine knowledge.", modalButton: "Support the Mission" },
};

const defaultConfig: PageConfig = { label: "Offerings & Tithes", icon: Leaf, modalHeading: "Keep the Temple Sustainable", modalBody: "Your tax-deductible offerings & tithes help us continue to serve our community, preserve Earth Medicine traditions, and grow our sacred family.", modalButton: "Offerings & Tithes" };

const DonationButton = () => {
  const [showDonation, setShowDonation] = useState(false);
  const location = useLocation();
  const config = pageConfig[location.pathname] || defaultConfig;
  const donateUrl = urlMap[location.pathname] || PAYPAL_DONATE_URL;

  return (
    <>
      <AnimatePresence>
        {showDonation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/60 backdrop-blur-sm px-4"
            onClick={() => setShowDonation(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md rounded-2xl border border-border bg-background shadow-2xl p-8 text-center"
            >
              <button
                onClick={() => setShowDonation(false)}
                className="absolute right-3 top-3 rounded-full bg-background/80 p-1.5 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <HandHeart className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground">{config.modalHeading}</h3>
              <p className="mt-3 text-sm text-muted-foreground">
                Temple Mother Earth is a 501(c)(3) nonprofit organization. {config.modalBody}
              </p>
              <a
                href={donateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block rounded-xl bg-primary px-8 py-3.5 font-body text-sm font-semibold text-primary-foreground shadow-lg transition hover:bg-primary/80"
              >
                {config.modalButton}
              </a>
              <p className="mt-3 text-xs text-muted-foreground">
                You'll be redirected to PayPal's secure donation page.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setShowDonation(true)}
        className="fixed bottom-6 right-6 z-40 hidden lg:flex items-center gap-2 rounded-full bg-primary px-5 py-3 font-body text-sm font-semibold text-primary-foreground shadow-lg transition hover:bg-primary/80 hover:shadow-xl"
      >
        <config.icon className="h-4 w-4" />
        {config.label}
      </button>
    </>
  );
};

export default DonationButton;
