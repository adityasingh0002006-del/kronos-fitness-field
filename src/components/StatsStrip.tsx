"use client";

import React from "react";
import { Star, Clock, Dumbbell, Trophy, Skull } from "lucide-react";

export default function StatsStrip() {
  const stats = [
    {
      icon: Star,
      value: "4.6★",
      label: "GOOGLE RATED",
      detail: "62+ Verified Kanpur Warriors",
      color: "text-[#facc15]",
      badge: "ELITE BATTLEGROUND",
    },
    {
      icon: Clock,
      value: "05:00 - 22:00",
      label: "DAILY DEPLOYMENT",
      detail: "7 Days / Week • 365 Days a Year",
      color: "text-[#facc15]",
      badge: "NO DAYS OFF",
    },
    {
      icon: Dumbbell,
      value: "100%",
      label: "RAW CAST IRON",
      detail: "Olympic Bars • Bumper Plates • Cages",
      color: "text-[#ef4444]",
      badge: "HEAVY LOADED",
    },
    {
      icon: Trophy,
      value: "12,000+ LBS",
      label: "CALIBRATED WEIGHTS",
      detail: "Dumbbells up to 50KG+ • Heavy Chalk",
      color: "text-[#facc15]",
      badge: "POWER MATRIX",
    },
  ];

  return (
    <section className="relative bg-[#0d0d10] border-b-2 border-zinc-800 py-8 lg:py-12 overflow-hidden">
      {/* Background Accent Grid */}
      <div className="absolute inset-0 bg-tactical-grid opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="relative bg-[#131316] border border-zinc-800 p-6 clip-chamfer group hover:border-[#facc15] transition-all duration-300 hover:-translate-y-1"
              >
                {/* Top Mini Badge */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono tracking-widest text-[#9ca3af] uppercase">
                    METRIC // 0{idx + 1}
                  </span>
                  <span className="text-[9px] font-mono font-bold bg-[#1f1f24] text-[#facc15] px-2 py-0.5 border border-zinc-700">
                    {item.badge}
                  </span>
                </div>

                {/* Big Stat Value */}
                <div className="flex items-baseline gap-2 mb-2">
                  <div className={`font-bebas text-4xl sm:text-5xl tracking-tight font-bold ${item.color} leading-none group-hover:scale-105 transition-transform origin-left`}>
                    {item.value}
                  </div>
                </div>

                {/* Stat Label & Detail */}
                <div className="font-bebas text-xl text-zinc-100 tracking-wider uppercase mb-1 flex items-center gap-2">
                  <Icon className="w-4 h-4 text-[#facc15]" />
                  <span>{item.label}</span>
                </div>
                <p className="text-xs text-zinc-400 font-mono tracking-tight">
                  {item.detail}
                </p>

                {/* Subtle bottom stripe accent */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-zinc-800 group-hover:bg-[#facc15] transition-colors" />
              </div>
            );
          })}
        </div>

        {/* Hardcore Statement Bar */}
        <div className="mt-8 pt-6 border-t border-zinc-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-400">
          <div className="flex items-center gap-2">
            <Skull className="w-4 h-4 text-[#ef4444]" />
            <span className="text-zinc-300 font-bold uppercase tracking-wider">KRONOS CREED:</span>
            <span>Pain is temporary. Quitting is forever. Respect the iron.</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="text-[#facc15]">CERTIFIED TRAINERS</span>
            <span>•</span>
            <span className="text-[#facc15]">POWERLIFTING APPROVED</span>
            <span>•</span>
            <span className="text-[#facc15]">TURF COMBAT ZONE</span>
          </div>
        </div>
      </div>
    </section>
  );
}
