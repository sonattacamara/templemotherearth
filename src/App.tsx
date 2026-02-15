import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import About from "./pages/About";
import Membership from "./pages/Membership";
import MemberPortal from "./pages/MemberPortal";
import CeremonyIntake from "./pages/CeremonyIntake";
import RetreatsInquiry from "./pages/RetreatsInquiry";
import TravelingCeremonies from "./pages/TravelingCeremonies";
import PrivateCeremonies from "./pages/PrivateCeremonies";
import Volunteer from "./pages/Volunteer";
import JoinFacilitator from "./pages/JoinFacilitator";
import Sponsor from "./pages/Sponsor";
import Preparation from "./pages/Preparation";
import Conduct from "./pages/Conduct";
import MemberAuth from "./pages/MemberAuth";
import MemberEducation from "./pages/MemberEducation";
import NotFound from "./pages/NotFound";
import Analytics from "./pages/Analytics";
import ValentinesDay from "./pages/ValentinesDay";
import Contact from "./pages/Contact";
import PlantMedicineGlossary from "./pages/PlantMedicineGlossary";
import VeteransTransformation from "./pages/VeteransTransformation";
import ScrollToTop from "@/components/ScrollToTop";
import DonationButton from "@/components/DonationButton";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <DonationButton />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/membership" element={<Membership />} />
            <Route path="/ceremony-intake" element={<CeremonyIntake />} />
            <Route path="/portal" element={<MemberPortal />} />
            <Route path="/retreats-inquiry" element={<RetreatsInquiry />} />
            <Route path="/traveling-ceremonies" element={<TravelingCeremonies />} />
            <Route path="/private-ceremonies" element={<PrivateCeremonies />} />
            <Route path="/volunteer" element={<Volunteer />} />
            <Route path="/join-facilitator" element={<JoinFacilitator />} />
            <Route path="/sponsor" element={<Sponsor />} />
            <Route path="/preparation" element={<Preparation />} />
            <Route path="/conduct" element={<Conduct />} />
            <Route path="/member/auth" element={<MemberAuth />} />
            <Route path="/member/education" element={<MemberEducation />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/valentines-day" element={<ValentinesDay />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/plant-medicine-glossary" element={<PlantMedicineGlossary />} />
            <Route path="/veterans-transformation-program" element={<VeteransTransformation />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
  </HelmetProvider>
);

export default App;
