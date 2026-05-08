import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/fileorbit/Navbar";
import { Hero } from "@/components/fileorbit/Hero";
import { Stats } from "@/components/fileorbit/Stats";
import { ScrollStory } from "@/components/fileorbit/ScrollStory";
import { Features } from "@/components/fileorbit/Features";
import { ToolsGrid } from "@/components/fileorbit/ToolsGrid";
import { Formats } from "@/components/fileorbit/Formats";
import { ConvertPreview } from "@/components/fileorbit/ConvertPreview";
import { DashboardPreview } from "@/components/fileorbit/DashboardPreview";
import { Testimonials } from "@/components/fileorbit/Testimonials";
import { Pricing } from "@/components/fileorbit/Pricing";
import { FAQ } from "@/components/fileorbit/FAQ";
import { CTA } from "@/components/fileorbit/CTA";
import { Footer } from "@/components/fileorbit/Footer";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "FileOrbit — Tous vos fichiers dans une seule orbite" },
      {
        name: "description",
        content:
          "Convertissez, compressez, fusionnez et optimisez vos PDF et images en quelques secondes. FileOrbit, la station spatiale de vos fichiers.",
      },
    ],
  }),
});

function Index() {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <div className="fixed inset-0 -z-10 bg-aurora" />
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <ScrollStory />
        <Features />
        <ToolsGrid />
        <Formats />
        <ConvertPreview />
        <DashboardPreview />
        <Testimonials />
        <Pricing />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
