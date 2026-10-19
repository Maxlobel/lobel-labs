import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PageMetadata from "@/components/PageMetadata";
const Lab = lazy(() => import("./pages/Lab"));
const Privacy = lazy(() => import("./pages/Privacy"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));
export default function App() {
  return (
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <PageMetadata />
        <Suspense
          fallback={
            <p role="status" className="p-8">
              Loading…
            </p>
          }
        >
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/lab" element={<Lab />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/projects/:slug" element={<ProjectDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  );
}
