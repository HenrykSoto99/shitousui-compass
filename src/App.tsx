import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { MainLayout } from "@/components/MainLayout";

// Pages
import Dashboard from "./pages/Dashboard";
import Embajadores from "./pages/Embajadores";
import Leads from "./pages/Leads";
import Propiedades from "./pages/Propiedades";
import Cobranza from "./pages/Cobranza";
import ChatIA from "./pages/ChatIA";
import Configuracion from "./pages/Configuracion";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Auth routes */}
              <Route path="/login" element={<Login />} />
              
              {/* App routes with layout */}
              <Route element={<MainLayout />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/embajadores" element={<Embajadores />} />
                <Route path="/leads" element={<Leads />} />
                <Route path="/propiedades" element={<Propiedades />} />
                <Route path="/cobranza" element={<Cobranza />} />
                <Route path="/chat" element={<ChatIA />} />
                <Route path="/configuracion" element={<Configuracion />} />
              </Route>
              
              {/* Catch-all */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
