import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WagmiProvider } from "wagmi";
import { Toaster as HotToaster } from "react-hot-toast";
import { config as wagmiConfig } from "@/lib/wagmi";
import { WalletProvider } from "@/contexts/WalletContext";
import { AccessLevelProvider } from "@/contexts/AccessLevelContext";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import CreateCampaign from "./pages/CreateCampaign";
import Proofs from "./pages/Proofs";
import ShareRedirect from "./pages/ShareRedirect";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <WagmiProvider config={wagmiConfig}>
    <QueryClientProvider client={queryClient}>
      <WalletProvider>
        <AccessLevelProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <HotToaster position="top-right" />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/create" element={<CreateCampaign />} />
                <Route path="/proofs" element={<Proofs />} />
                <Route path="/p/:id" element={<ShareRedirect />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </AccessLevelProvider>
      </WalletProvider>
    </QueryClientProvider>
  </WagmiProvider>
);

export default App;
