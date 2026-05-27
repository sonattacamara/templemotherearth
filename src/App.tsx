import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
import Scholarship from "./pages/Scholarship";
import JoinFacilitator from "./pages/JoinFacilitator";
import Sponsor from "./pages/Sponsor";
import Preparation from "./pages/Preparation";
import Conduct from "./pages/Conduct";
import MemberAuth from "./pages/MemberAuth";
import MemberEducation from "./pages/MemberEducation";
import NotFound from "./pages/NotFound";
import Analytics from "./pages/Analytics";
import AdminIntakes from "./pages/AdminIntakes";
import AdminSubmissions from "./pages/AdminSubmissions";
import AdminJournal from "./pages/AdminJournal";
import AdminAnalyticsPeaks from "./pages/AdminAnalyticsPeaks";

import Contact from "./pages/Contact";
import PlantMedicineGlossary from "./pages/PlantMedicineGlossary";
import VeteransTransformation from "./pages/VeteransTransformation";
import DonationSuccess from "./pages/DonationSuccess";
import DonationCanceled from "./pages/DonationCanceled";
import CeremonyDonate from "./pages/CeremonyDonate";
import ResetPassword from "./pages/ResetPassword";
import KemeticTeachings from "./pages/KemeticTeachings";
import WebhookChecklist from "./pages/WebhookChecklist";
import SacredBlueprint from "./pages/SacredBlueprint";
import Donate from "./pages/Donate";
import ScrollToTop from "@/components/ScrollToTop";
import SacredSeries from "./pages/SacredSeries";
import HapeCeremony from "./pages/sanctuary/HapeCeremony";
import SacredTeaCeremony from "./pages/sanctuary/SacredTeaCeremony";
import InnerAlchemySpa from "./pages/sanctuary/InnerAlchemySpa";
import CommunityPotluck from "./pages/sanctuary/CommunityPotluck";
import SacredYinYoga from "./pages/sanctuary/SacredYinYoga";
import SacredArtExpo from "./pages/sanctuary/SacredArtExpo";
import FrequencyFungiFlow from "./pages/sanctuary/FrequencyFungiFlow";
import SacredTeaHouse from "./pages/sanctuary/SacredTeaHouse";
import CacaoCeremony from "./pages/sanctuary/CacaoCeremony";
import Level5Ceremony from "./pages/sanctuary/Level5Ceremony";
import MensCircle from "./pages/sanctuary/MensCircle";
import WomensCircle from "./pages/sanctuary/WomensCircle";
import KamboCeremony from "./pages/sanctuary/KamboCeremony";
import EarthKingdoms from "./pages/EarthKingdoms";
import Journal from "./pages/Journal";
import JournalPost from "./pages/JournalPost";
import CommunityCare from "./pages/CommunityCare";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import RFRACompliance from "./pages/RFRACompliance";
import Sayulita from "./pages/immersions/Sayulita";
import Panama from "./pages/immersions/Panama";
import Egypt from "./pages/immersions/Egypt";
import Peru from "./pages/immersions/Peru";
import CostaRica from "./pages/immersions/CostaRica";
import DonationButton from "@/components/DonationButton";
import CrisisFloatingButton from "@/components/CrisisFloatingButton";
import SeasonalBanner from "@/components/SeasonalBanner";
import MobileStickyBar from "@/components/MobileStickyBar";

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
          <SeasonalBanner />
          <DonationButton />
          <CrisisFloatingButton />
          <MobileStickyBar />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/membership" element={<Membership />} />
            <Route path="/ceremony-intake" element={<CeremonyIntake />} />
            <Route path="/intake" element={<CeremonyIntake />} />
            <Route path="/portal" element={<MemberPortal />} />
            <Route path="/retreats-inquiry" element={<RetreatsInquiry />} />
            <Route path="/traveling-ceremonies" element={<TravelingCeremonies />} />
            <Route path="/private-ceremonies" element={<PrivateCeremonies />} />
            <Route path="/volunteer" element={<Volunteer />} />
            <Route path="/scholarship" element={<Scholarship />} />
            <Route path="/join-facilitator" element={<JoinFacilitator />} />
            <Route path="/facilitator" element={<JoinFacilitator />} />
            <Route path="/facilitators" element={<JoinFacilitator />} />
            <Route path="/sponsor" element={<Sponsor />} />
            <Route path="/preparation" element={<Preparation />} />
            <Route path="/conduct" element={<Conduct />} />
            <Route path="/member/auth" element={<MemberAuth />} />
            <Route path="/member/education" element={<MemberEducation />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/admin/intakes" element={<AdminIntakes />} />
            <Route path="/admin/submissions" element={<AdminSubmissions />} />
            <Route path="/admin/journal" element={<AdminJournal />} />
            <Route path="/admin/analytics-peaks" element={<AdminAnalyticsPeaks />} />
            
            <Route path="/contact" element={<Contact />} />
            <Route path="/plant-medicine-glossary" element={<PlantMedicineGlossary />} />
            <Route path="/veterans-transformation-program" element={<VeteransTransformation />} />
            <Route path="/donation-success" element={<DonationSuccess />} />
            <Route path="/donation-canceled" element={<DonationCanceled />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/donate/ceremony" element={<CeremonyDonate />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/kemetic-teachings" element={<KemeticTeachings />} />
            <Route path="/kambo" element={<KamboCeremony />} />
            <Route path="/sacred-blueprint" element={<SacredBlueprint />} />
            <Route path="/webhook-checklist" element={<WebhookChecklist />} />
            <Route path="/sacred-series" element={<SacredSeries />} />
            <Route path="/sanctuary-week" element={<Navigate to="/sacred-series" replace />} />
            <Route path="/hape" element={<HapeCeremony />} />
            <Route path="/sacred-tea" element={<SacredTeaCeremony />} />
            <Route path="/spa" element={<InnerAlchemySpa />} />
            <Route path="/potluck" element={<CommunityPotluck />} />
            <Route path="/yin-yoga" element={<SacredYinYoga />} />
            <Route path="/art-expo" element={<SacredArtExpo />} />
            <Route path="/frequencyfungiflow" element={<FrequencyFungiFlow />} />
            <Route path="/frequency-fungi-flow" element={<FrequencyFungiFlow />} />
            <Route path="/tea-house" element={<SacredTeaHouse />} />
            <Route path="/cacao" element={<CacaoCeremony />} />
            <Route path="/level5" element={<Level5Ceremony />} />
            <Route path="/level-5" element={<Level5Ceremony />} />
            <Route path="/mens-circle" element={<MensCircle />} />
            <Route path="/womens-circle" element={<WomensCircle />} />
            <Route path="/kambo-women" element={<KamboCeremony />} />
            <Route path="/kambo-for-women" element={<KamboCeremony />} />
            <Route path="/earth-kingdoms" element={<EarthKingdoms />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/journal/:slug" element={<JournalPost />} />
            <Route path="/community-care" element={<CommunityCare />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/rfra-compliance" element={<RFRACompliance />} />
            <Route path="/immersions/sayulita" element={<Sayulita />} />
            <Route path="/immersions/panama" element={<Panama />} />
            <Route path="/immersions/egypt" element={<Egypt />} />
            <Route path="/immersions/peru" element={<Peru />} />
            <Route path="/immersions/costa-rica" element={<CostaRica />} />
            <Route path="/immersions/ecuador" element={<Navigate to="/retreats-inquiry" replace />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
  </HelmetProvider>
);

export default App;
