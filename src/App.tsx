
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
          <Route path="/dashboard/finance" element={<Finance />} />
          <Route path="/dashboard/documents" element={<Documents />} />
          <Route path="/dashboard/assets" element={<Assets />} />
          <Route path="/dashboard/events" element={<Events />} />
          <Route path="/dashboard/volunteers" element={<Volunteers />} />
          <Route path="/dashboard/checkin" element={<CheckIn />} />
          <Route path="/dashboard/reports" element={<Reports />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
