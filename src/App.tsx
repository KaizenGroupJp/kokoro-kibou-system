
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Members from "./pages/Members";
import Finance from "./pages/Finance";
import Documents from "./pages/Documents";
import Assets from "./pages/Assets";
import Events from "./pages/Events";
import Volunteers from "./pages/Volunteers";
import CheckIn from "./pages/CheckIn";
import Reports from "./pages/Reports";
import MemberDetail from "./pages/MemberDetail";
import PricingPlans from "./pages/PricingPlans";
import NotFound from "./pages/NotFound";
import Calendar from "./pages/Calendar";
import Settings from "./pages/Settings";
import Features from "./pages/Features";
import MemberCard from "./pages/MemberCard";
import BaptismCertificate from "./pages/BaptismCertificate";
import TransferLetter from "./pages/TransferLetter";
import Contact from "./pages/Contact";
import NewEvent from "./pages/NewEvent";
import ChildrenMinistry from "./pages/ChildrenMinistry";
import Discipleship from "./pages/Discipleship";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/pricing" element={<PricingPlans />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/members" element={<Members />} />
          <Route path="/dashboard/members/:id" element={<MemberDetail />} />
          <Route path="/dashboard/member-card/:id" element={<MemberCard />} />
          <Route path="/dashboard/finance" element={<Finance />} />
          <Route path="/dashboard/documents" element={<Documents />} />
          <Route path="/dashboard/baptism-certificate/:id" element={<BaptismCertificate />} />
          <Route path="/dashboard/transfer-letter/:id" element={<TransferLetter />} />
          <Route path="/dashboard/assets" element={<Assets />} />
          <Route path="/dashboard/events" element={<Events />} />
          <Route path="/dashboard/new-event" element={<NewEvent />} />
          <Route path="/dashboard/volunteers" element={<Volunteers />} />
          <Route path="/dashboard/checkin" element={<CheckIn />} />
          <Route path="/dashboard/reports" element={<Reports />} />
          <Route path="/dashboard/calendar" element={<Calendar />} />
          <Route path="/dashboard/settings" element={<Settings />} />
          <Route path="/dashboard/features" element={<Features />} />
          <Route path="/dashboard/contact" element={<Contact />} />
          <Route path="/dashboard/children-ministry" element={<ChildrenMinistry />} />
          <Route path="/dashboard/discipleship" element={<Discipleship />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
