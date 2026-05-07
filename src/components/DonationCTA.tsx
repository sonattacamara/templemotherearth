import { useState } from "react";
import { motion } from "framer-motion";
import { HandHeart, ShieldCheck, ArrowRight, X, Heart } from "lucide-react";

const PAYPAL_DONATE_URL = "https://www.paypal.com/donate?token=NXLlyiujSJagIrl9uk8qrPC1eutuXlYi84XbzMEIMVb1EasE5b-TxfSz6XcEwmtr_Bk0lXZ-X6ph23t-qhv_9x_2VK8&useraction=commit%2Fdonate%2F&sdkMeta=eyJ1cmwiOiJodHRwczovL3d3dy5wYXlwYWxvYmplY3RzLmNvbS9kb25hdGUvc2RrL2RvbmF0ZS1zZGsuanMiLCJhdHRycyI6eyJkYXRhLXVpZCI6InVpZF9wb2t1aW9tbmJnc293cGhpc2F1Z2VianVpb21iamsifX0&targetMeta=eyJ6b2lkVmVyc2lvbiI6IjlfMF81OCIsInRhcmdldCI6IkRPTkFURSIsInNka1ZlcnNpb24iOiIwLjkuMCJ9";

export interface DonationCTAProps {
  /** Short label above the heading */
  eyebrow?: string;
  /** Main heading */
  headline: string;
  /** Supporting paragraph */
  body: string;
  /** CTA button text */
  buttonLabel?: string;
  /** Visual variant */
  variant?: "light" | "dark" | "olive";
  /** Override default PayPal donation URL */
  donateUrl?: string;
}

const variantStyles = {
  light: {
    section: "bg-card",
    eyebrow: "text-primary",
    headline: "text-card-foreground",
    body: "text-muted-foreground",
    button: "bg-primary text-primary-foreground hover:bg-primary/80",
    disclosure: "text-muted-foreground/60 hover:text-muted-foreground",
    modal: "bg-background text-foreground border-border",
  },
  dark: {
    section: "bg-foreground",
    eyebrow: "text-primary",
    headline: "text-primary-foreground",
    body: "text-primary-foreground/60",
    button: "bg-primary text-primary-foreground hover:bg-primary/80",
    disclosure: "text-primary-foreground/40 hover:text-primary-foreground/60",
    modal: "bg-background text-foreground border-border",
  },
  olive: {
    section: "bg-[#2F4F4F]",
    eyebrow: "text-[#B8860B]",
    headline: "text-[#F5F0E6]",
    body: "text-[#F5F0E6]/60",
    button: "bg-[#B8860B] text-white hover:bg-[#DAA520]",
    disclosure: "text-[#F5F0E6]/40 hover:text-[#F5F0E6]/60",
    modal: "bg-[#1A1A1A] text-[#F5F0E6] border-[#556B2F]/30",
  },
};

const DonationCTA = ({
  eyebrow = "Support Our Mission",
  headline,
  body,
  buttonLabel = "Give Today",
  variant = "light",
  donateUrl,
}: DonationCTAProps) => {
  const finalUrl = donateUrl || PAYPAL_DONATE_URL;
  const [showDisclosure, setShowDisclosure] = useState(false);
  const s = variantStyles[variant];

  return (
    <section className={`relative px-4 py-16 md:py-20 ${s.section}`}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-2xl text-center"
      >
        <p className={`font-body text-xs uppercase tracking-[0.3em] ${s.eyebrow}`}>
          {eyebrow}
        </p>
        <h2 className={`mt-4 font-display text-2xl font-bold md:text-4xl ${s.headline}`}>
          {headline}
        </h2>
        <p className={`mx-auto mt-4 max-w-lg font-body text-sm leading-relaxed ${s.body}`}>
          {body}
        </p>

        <div className="mt-8 flex flex-col items-center gap-3">
          <a
            href={finalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 rounded-xl px-8 py-3.5 font-body text-sm font-semibold shadow-lg transition ${s.button}`}
            aria-label={`${buttonLabel} · donate to Temple Mother Earth via PayPal`}
          >
            <HandHeart className="h-4 w-4" />
            {buttonLabel}
            <ArrowRight className="h-4 w-4" />
          </a>

          <button
            onClick={() => setShowDisclosure(true)}
            className={`inline-flex items-center gap-1.5 font-body text-xs transition ${s.disclosure}`}
            aria-label="View donation transparency disclosure"
          >
            <ShieldCheck className="h-3.5 w-3.5" />
            How your donation is used
          </button>
        </div>
      </motion.div>

      {/* Disclosure Modal */}
      {showDisclosure && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/60 backdrop-blur-sm px-4"
          onClick={() => setShowDisclosure(false)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className={`relative w-full max-w-md rounded-2xl border shadow-2xl p-8 ${s.modal}`}
          >
            <button
              onClick={() => setShowDisclosure(false)}
              className="absolute right-3 top-3 rounded-full p-1.5 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close disclosure"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Heart className="h-6 w-6 text-primary" />
            </div>

            <h3 className="text-center font-display text-lg font-bold">
              Transparency & Trust
            </h3>

            <div className="mt-4 space-y-3 text-sm leading-relaxed opacity-80">
              <p>
                <strong>Temple Mother Earth</strong> is a sacred ceremony church organized under section 508(c)(1)(A).
                All offerings are tax-deductible to the extent allowed by law. EIN available upon request.
              </p>
              <p>Your contributions directly fund:</p>
              <ul className="ml-4 list-disc space-y-1.5">
                <li>Sacred ceremonies and community integration gatherings</li>
                <li>Veteran and underserved community scholarship programs</li>
                <li>Maintenance and expansion of our DC sanctuary</li>
                <li>Facilitator training and Earth Medicine education</li>
                <li>International immersion outreach programs</li>
              </ul>
              <p className="text-xs opacity-60">
                We are committed to financial stewardship. Detailed financial reports are available upon request by contacting our team.
              </p>
            </div>

            <button
              onClick={() => setShowDisclosure(false)}
              className="mt-6 w-full rounded-lg bg-primary px-6 py-2.5 font-body text-sm font-semibold text-primary-foreground transition hover:bg-primary/80"
            >
              Got it
            </button>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default DonationCTA;
