"use client";

import React from "react";
import { Flame, Shield, ArrowRight, Crosshair, Dumbbell, MapPin } from "lucide-react";

interface HeroSectionProps {
  onOpenTrial: () => void;
}

export default function HeroSection({ onOpenTrial }: HeroSectionProps) {
  return (
    <section className="relative min-h-[90vh] lg:min-h-screen flex flex-col justify-between overflow-hidden bg-[#0a0a0a] pt-6 sm:pt-10 pb-16">
      {/* Background Gritty Overlays */}
      <div className="absolute inset-0 bg-tactical-grid opacity-25 pointer-events-none" />
      <div className="absolute inset-0 bg-tactical-dots opacity-20 pointer-events-none" />

      {/* Atmospheric Ambient Glow Orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#ef4444]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-32 w-96 h-96 bg-[#facc15]/15 rounded-full blur-3xl pointer-events-none" />

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        {/* Top Tactical Status Badge */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 bg-[#17171a]/90 border-l-4 border-[#facc15] border-y border-r border-zinc-800 text-xs font-mono uppercase tracking-widest text-zinc-300">
            <span className="w-2 h-2 bg-[#facc15] rounded-full animate-ping" />
            <span className="text-[#facc15] font-bold">KANPUR DIVISION</span>
            <span className="text-zinc-500">|</span>
            <span>OP HOURS: 0500 - 2200 HRS</span>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-zinc-400">
            <MapPin className="w-3.5 h-3.5 text-[#ef4444]" />
            <span>SANIGAWAN RD, KANPUR</span>
          </div>
        </div>

        {/* Hero Headlines */}
        <div className="text-center max-w-5xl mx-auto">
          <div className="inline-flex items-center justify-center gap-2 mb-3 text-xs sm:text-sm font-mono tracking-[0.3em] uppercase text-[#facc15] font-semibold">
            <Crosshair className="w-4 h-4 text-[#ef4444]" />
            <span>NO COMPROMISE // NO MERCY // 100% RAW IRON</span>
            <Crosshair className="w-4 h-4 text-[#ef4444]" />
          </div>

          <h1 className="font-bebas text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight leading-[0.88] uppercase text-[#f3f4f6] text-glow-yellow mb-4">
            FORGE YOUR <br className="sm:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#facc15] via-[#ffe600] to-[#ef4444]">
              INNER TITAN
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-[#9ca3af] font-body font-normal leading-relaxed tracking-wide mb-8">
            No excuses. Raw iron, hardcore discipline, and relentless strength at Kanpur&apos;s premier battleground. Designed for warriors who refuse to be mediocre.
          </p>

          {/* Action CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-6">
            <button
              onClick={onOpenTrial}
              className="w-full sm:w-auto px-8 py-4 bg-[#facc15] hover:bg-[#ef4444] text-black hover:text-white font-bebas text-2xl tracking-widest uppercase clip-chamfer transition-all duration-300 box-glow-yellow hover:box-glow-red flex items-center justify-center gap-3 active:scale-95 group"
            >
              <Flame className="w-6 h-6 fill-black group-hover:fill-white transition-colors" />
              <span>START FREE TRIAL</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href="#facilities"
              className="w-full sm:w-auto px-8 py-4 bg-[#121215] hover:bg-[#1a1a1f] text-[#f3f4f6] hover:text-[#facc15] border-2 border-zinc-700 hover:border-[#facc15] font-bebas text-2xl tracking-widest uppercase clip-chamfer transition-all duration-300 flex items-center justify-center gap-3 active:scale-95"
            >
              <Dumbbell className="w-6 h-6" />
              <span>EXPLORE ARSENAL</span>
            </a>
          </div>

          {/* Quick Credibility Callout */}
          <div className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400">
            <Shield className="w-3.5 h-3.5 text-[#facc15]" />
            <span>Zero Bullsh*t Policy • 4.6★ Rated on Google • First Session on the House</span>
          </div>
        </div>
      </div>

      {/* Bottom Danger Stripe Border */}
      <div className="w-full h-3 hazard-stripes border-y border-black mt-8" />
    </section>
  );
}
