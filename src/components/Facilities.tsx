"use client";

import React from "react";
import { Dumbbell, Shield, Check, Flame, Award, Wrench } from "lucide-react";

export default function Facilities() {
  const facilityItems = [
    {
      title: "OLYMPIC POWER PLATFORMS",
      tagline: "IPF-SPEC HARDWOOD & HIGH-DENSITY DROP RUBBER",
      desc: "No shaker cups and quiet zones. Drop heavy barbells from lockouts without anyone telling you to keep it down. Equipped with competition Eleiko and Texas style bars.",
      metric: "4 PLATFORMS",
      badge: "DROP ZONE APPROVED",
      icon: Award,
    },
    {
      title: "50KG+ HEAVY DUMBBELL ARSENAL",
      tagline: "SOLID STEEL / NO LOOSE PLATES",
      desc: "Complete rack progression starting from 2.5KG all the way to massive 52.5KG bells for crushing chest presses, heavy kroc rows, and walking lunges.",
      metric: "2.5KG - 52.5KG",
      badge: "UNBROKEN PAIRS",
      icon: Dumbbell,
    },
    {
      title: "HEAVY DUTY POWER CAGES",
      tagline: "SAFETY SPOTTERS & CHIN PULL-UP ARRAYS",
      desc: "Commercial gauge box-section steel cages with laser-cut hole spacing, band peg attachments, and rock-solid safety pins for training alone without fear.",
      metric: "6 HEAVY CAGES",
      badge: "MAX CAPACITY 1000LBS",
      icon: Shield,
    },
    {
      title: "25M TACTICAL TURF & PROWLER RUN",
      tagline: "HIGH DENSITY SPRINT & DRAGGING CORRIDOR",
      desc: "Custom indoor turf strip tailored for loaded prowler pushes, heavy sled drags, overhead yoke walks, and explosive sandbag carries.",
      metric: "25 METERS",
      badge: "HIGH TRACTION",
      icon: Flame,
    },
    {
      title: "CHALK & GRIP TORTURE STATION",
      tagline: "BLOCK CHALK, AXLE BARS & PINCH BLOCKS",
      desc: "We promote chalk. Grip the raw knurl with maximum friction. We provide block gym chalk, axle fat bars, pinch grip hubs, and forearm blast rollers.",
      metric: "UNLIMITED CHALK",
      badge: "RAW GRIP ONLY",
      icon: Wrench,
    },
    {
      title: "CABLE MATRIX & PIN LOADED ARSENAL",
      tagline: "DUAL ADJUSTABLE PULLEYS & ISO-LATERAL MACHINES",
      desc: "High-grade smooth ball-bearing cable systems, seated chest-supported T-bar rows, plate-loaded hack squats, and 45-degree leg presses.",
      metric: "18+ STATIONS",
      badge: "ISOLATION PERFECTION",
      icon: Dumbbell,
    },
  ];

  return (
    <section id="facilities" className="py-20 lg:py-28 bg-[#0d0d11] relative overflow-hidden border-t-2 border-zinc-800">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-tactical-grid opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 -right-32 w-80 h-80 bg-[#facc15]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#18181f] border border-zinc-700 text-xs font-mono text-[#facc15] tracking-widest uppercase mb-3">
              <span>FACILITY TELEMETRY</span>
              <span>//</span>
              <span className="text-[#ef4444]">THE BATTLEGROUND</span>
            </div>
            <h2 className="font-bebas text-5xl sm:text-6xl md:text-7xl tracking-tight uppercase text-white leading-none">
              THE HARDCORE <span className="text-[#facc15]">ARSENAL</span>
            </h2>
            <p className="text-zinc-400 font-body text-sm sm:text-base mt-2 max-w-xl">
              Constructed for athletes who demand authentic commercial iron over cheap fitness club gimmicks.
            </p>
          </div>

          <div className="hidden lg:flex items-center gap-3 font-mono text-xs text-zinc-400 border border-zinc-800 bg-[#121216] px-4 py-3 clip-chamfer-sm">
            <span className="w-2.5 h-2.5 bg-[#facc15] rounded-full animate-pulse" />
            <span>FACILITY STATUS: 100% OPERATIONAL // SANIGAWAN ROAD</span>
          </div>
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {facilityItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-[#131317] border border-zinc-800 hover:border-[#facc15] p-6 sm:p-7 clip-chamfer group transition-all duration-300 relative flex flex-col justify-between hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(0,0,0,0.6)]"
              >
                <div>
                  {/* Top Badge & Metric */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-[10px] font-mono tracking-widest text-[#ef4444] bg-[#ef4444]/10 border border-[#ef4444]/30 px-2 py-0.5 uppercase">
                      {item.badge}
                    </span>
                    <span className="font-mono text-xs font-bold text-[#facc15] bg-[#1a1a20] px-2.5 py-0.5 border border-zinc-700">
                      {item.metric}
                    </span>
                  </div>

                  {/* Icon & Title */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-[#1e1e24] group-hover:bg-[#facc15] text-[#facc15] group-hover:text-black flex items-center justify-center transition-colors duration-300 clip-chamfer-sm">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-bebas text-2xl text-white tracking-wider group-hover:text-[#facc15] transition-colors leading-tight">
                      {item.title}
                    </h3>
                  </div>

                  <p className="font-mono text-[11px] text-[#9ca3af] uppercase tracking-wider mb-3">
                    {item.tagline}
                  </p>

                  <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed mb-6">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                  <span className="flex items-center gap-1.5 text-zinc-400">
                    <Check className="w-3.5 h-3.5 text-[#facc15]" /> Available Daily
                  </span>
                  <span className="text-[#facc15] group-hover:translate-x-1 transition-transform">
                    INSPECT ARSENAL →
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Hazard Divider Strip */}
        <div className="mt-14 w-full h-2 hazard-stripes" />
      </div>
    </section>
  );
}
