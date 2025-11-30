import { Hero } from "@/components/sections/Hero";
import { Features } from "@/components/sections/Features";
import { WhyTypeForge } from "@/components/sections/WhyTypeForge";
import { TypingSimulation } from "@/components/sections/TypingSimulation";
import { SocialProof } from "@/components/sections/SocialProof";
import { CTA } from "@/components/sections/CTA";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Hero />
      <Features />
      <WhyTypeForge />
      <TypingSimulation />
      <SocialProof />
      <CTA />
    </main>
  );
}
