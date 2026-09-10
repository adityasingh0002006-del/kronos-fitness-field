"use client";

import dynamic from "next/dynamic";
import React from "react";

const HeroCanvas = dynamic(() => import("./HeroCanvas"), {
  ssr: false,
  loading: () => (
    <div className="relative w-full h-[480px] sm:h-[580px] lg:h-[680px] flex flex-col items-center justify-center bg-[#0a0a0a] border border-[#222] overflow-hidden">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-16 h-16 border-2 border-[#facc15] border-t-transparent animate-spin rounded-full flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-[#ef4444] border-b-transparent animate-spin rounded-full" />
        </div>
        <div className="font-bebas tracking-widest text-[#facc15] text-xl animate-pulse">
          INITIALIZING 3D TITAN IRON ENGINE...
        </div>
        <div className="font-mono text-xs text-[#9ca3af]">CALIBRATING KRONOS FORGE</div>
      </div>
      <div className="absolute inset-0 bg-tactical-grid opacity-30 pointer-events-none" />
    </div>
  ),
});

export default function HeroCanvasWrapper() {
  return <HeroCanvas />;
}
