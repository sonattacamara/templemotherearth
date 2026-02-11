import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Membership from "./pages/Membership";
import CeremonyIntake from "./pages/CeremonyIntake";
import RetreatsInquiry from "./pages/RetreatsInquiry";
import TravelingCeremonies from "./pages/TravelingCeremonies";
import PrivateCeremonies from "./pages/PrivateCeremonies";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/ceremony-intake" element={<CeremonyIntake />} />
          <Route path="/retreats-inquiry" element={<RetreatsInquiry />} />
          <Route path="/traveling-ceremonies" element={<TravelingCeremonies />} />
          <Route path="/private-ceremonies" element={<PrivateCeremonies />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
