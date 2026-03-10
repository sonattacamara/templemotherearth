import { useLocation, useNavigate } from "react-router-dom";
import { Leaf, HandHeart, Heart, Shield, Sparkles } from "lucide-react";

interface PageConfig {
  label: string;
  icon: typeof Leaf;
}

const pageConfig: Record<string, PageConfig> = {
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

const defaultConfig: PageConfig = { label: "Offerings & Tithes", icon: Leaf };

const HIDDEN_ROUTES = ["/donate", "/donate/ceremony"];

const DonationButton = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const config = pageConfig[location.pathname] || defaultConfig;

  // Hide on donation pages themselves
  if (HIDDEN_ROUTES.includes(location.pathname)) return null;

  return (
    <button
      onClick={() => navigate("/donate")}
      className="fixed bottom-6 right-6 z-40 hidden lg:flex items-center gap-2 rounded-full bg-primary px-5 py-3 font-body text-sm font-semibold text-primary-foreground shadow-lg transition hover:bg-primary/80 hover:shadow-xl"
    >
      <config.icon className="h-4 w-4" />
      {config.label}
    </button>
  );
};

export default DonationButton;
