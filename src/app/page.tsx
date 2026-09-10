"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsStrip from "@/components/StatsStrip";
import TrainingPrograms from "@/components/TrainingPrograms";
import Facilities from "@/components/Facilities";
import LocationCard from "@/components/LocationCard";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";
import TrialModal from "@/components/TrialModal";

export default function Home() {
  const [trialOpen, setTrialOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string>("TITAN POWERLIFTING");

  const handleOpenTrial = (planName?: string) => {
    if (planName) {
      setSelectedPlan(planName);
    }
    setTrialOpen(true);
  };

  const handleCloseTrial = () => {
    setTrialOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0a] text-[#f3f4f6]">
      {/* Navigation */}
      <Navbar onOpenTrial={() => handleOpenTrial("JOIN THE CULT TRIAL")} />

      {/* Main Sections */}
      <main className="flex-1">
        {/* Hero Section with 3D Canvas */}
        <HeroSection onOpenTrial={() => handleOpenTrial("HERO FREE TRIAL")} />

        {/* Hardcore Stats Strip */}
        <StatsStrip />

        {/* Training Programs */}
        <TrainingPrograms onSelectProgram={(prog) => handleOpenTrial(prog)} />

        {/* Facilities & Heavy Iron Arsenal */}
        <Facilities />

        {/* Enlistment / Membership Plans */}
        <Pricing onSelectPlan={(plan) => handleOpenTrial(plan)} />

        {/* Location & Tactical Radar Map */}
        <LocationCard />
      </main>

      {/* Footer */}
      <Footer />

      {/* Lead Capture Trial Modal */}
      <TrialModal
        isOpen={trialOpen}
        onClose={handleCloseTrial}
        defaultPlan={selectedPlan}
      />
    </div>
  );
}
