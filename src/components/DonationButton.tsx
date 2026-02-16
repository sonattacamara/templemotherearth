import { useState } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Leaf, X, HandHeart, Heart, Shield, Sparkles } from "lucide-react";

const PAYPAL_DONATE_URL = "https://www.paypal.com/donate?token=NXLlyiujSJagIrl9uk8qrPC1eutuXlYi84XbzMEIMVb1EasE5b-TxfSz6XcEwmtr_Bk0lXZ-X6ph23t-qhv_9x_2VK8&useraction=commit%2Fdonate%2F&sdkMeta=eyJ1cmwiOiJodHRwczovL3d3dy5wYXlwYWxvYmplY3RzLmNvbS9kb25hdGUvc2RrL2RvbmF0ZS1zZGsuanMiLCJhdHRycyI6eyJkYXRhLXVpZCI6InVpZF9wb2t1aW9tbmJnc293cGhpc2F1Z2VianVpb21iamsifX0&targetMeta=eyJ6b2lkVmVyc2lvbiI6IjlfMF81OCIsInRhcmdldCI6IkRPTkFURSIsInNka1ZlcnNpb24iOiIwLjkuMCJ9";

const VETERAN_PAYPAL_URL = "https://www.paypal.com/donate?campaign_id=R877JP38Q4F8S";

const urlMap: Record<string, string> = {
  "/veterans-transformation-program": VETERAN_PAYPAL_URL,
};

const labelMap: Record<string, { label: string; icon: typeof Leaf }> = {
  "/": { label: "Offerings & Tithes", icon: Leaf },
  "/about": { label: "Sustain the Temple", icon: Heart },
  "/veterans-transformation-program": { label: "Support a Warrior", icon: Shield },
  "/membership": { label: "Plant a Seed", icon: Sparkles },
  "/sponsor": { label: "Give Today", icon: HandHeart },
  "/ceremony-intake": { label: "Sow Into Healing", icon: Heart },
  "/volunteer": { label: "Give Back", icon: HandHeart },
  "/contact": { label: "Support Our Mission", icon: Heart },
  "/retreats-inquiry": { label: "Fuel the Journey", icon: Sparkles },
  "/traveling-ceremonies": { label: "Carry the Light", icon: Sparkles },
  "/private-ceremonies": { label: "Honor the Sacred", icon: Leaf },
  "/preparation": { label: "Plant a Seed", icon: Leaf },
  "/conduct": { label: "Sustain the Temple", icon: Heart },
  "/plant-medicine-glossary": { label: "Support the Mission", icon: Leaf },
};

const defaultLabel = { label: "Offerings & Tithes", icon: Leaf };

const DonationButton = () => {
  const [showDonation, setShowDonation] = useState(false);
  const location = useLocation();
  const { label, icon: Icon } = labelMap[location.pathname] || defaultLabel;
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
              <h3 className="font-display text-xl font-bold text-foreground">Keep the Temple Sustainable</h3>
              <p className="mt-3 text-sm text-muted-foreground">
                Temple Mother Earth is a 501(c)(3) nonprofit organization. Your tax-deductible offerings & tithes
                help us continue to serve our community, preserve Earth Medicine traditions, and grow our sacred family.
              </p>
              <a
                href={donateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block rounded-xl bg-primary px-8 py-3.5 font-body text-sm font-semibold text-primary-foreground shadow-lg transition hover:bg-primary/80"
              >
                Offerings & Tithes
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
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-primary px-5 py-3 font-body text-sm font-semibold text-primary-foreground shadow-lg transition hover:bg-primary/80 hover:shadow-xl"
      >
        <Icon className="h-4 w-4" />
        {label}
      </button>
    </>
  );
};

export default DonationButton;
