import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";

const queryClient = new QueryClient();

const App = () => {
  // Simple routing based on pathname
  const pathname = window.location.pathname;

  const renderPage = () => {
    switch (pathname) {
      case "/auth":
        return <Auth />;
      case "/admin":
        return <Admin />;
      default:
        return <Index />;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {renderPage()}
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
