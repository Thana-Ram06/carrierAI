import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import { Navbar } from "@/components/Navbar";
import { Home } from "@/pages/Home";
import { Dashboard } from "@/pages/Dashboard";
import { ResumeGenerator } from "@/pages/ResumeGenerator";
import { ResumeImprover } from "@/pages/ResumeImprover";
import { InterviewPrep } from "@/pages/InterviewPrep";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-primary/30 selection:text-white">
      <Navbar />
      <main className="flex-1 w-full">
        {children}
      </main>
    </div>
  );
}

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/resume-generator" component={ResumeGenerator} />
        <Route path="/resume-improver" component={ResumeImprover} />
        <Route path="/interview" component={InterviewPrep} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
