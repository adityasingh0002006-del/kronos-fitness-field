"use client";

import React, { useState } from "react";
import { Dumbbell, Zap, Flame, ShieldAlert, CheckCircle2, ChevronRight } from "lucide-react";

interface TrainingProgramsProps {
  onSelectProgram: (programName: string) => void;
}

export default function TrainingPrograms({ onSelectProgram }: TrainingProgramsProps) {
  const [activeTab, setActiveTab] = useState<number>(0);

  const programs = [
    {
      id: "powerlifting",
      title: "TITAN POWERLIFTING",
      subtitle: "THE HOLY TRINITY: SQUAT // BENCH // DEADLIFT",
      description:
        "Engineered for pure maximal strength. Train on IPF-spec power bars, competition racks, and calibrated steel plates. Master technique under heavy loads.",
      specs: [
        { label: "PRIMARY FOCUS", val: "Maximal 1RM Force" },
        { label: "EQUIPMENT", val: "Eleiko Style Bars, Monolifts, Calibrated Iron" },
        { label: "INTENSITY", val: "95% - 105% RPE 9-10" },
      ],
      features: [
        "Specialized deadlift dead-zone platforms",
        "Liquid & block gym chalk freely available",
        "Heavy duty safety spotter arms & bands",
        "Powerlifting coach form critiques",
      ],
      tag: "STRENGTH MATRIX",
      accent: "border-[#facc15] text-[#facc15]",
    },
    {
      id: "bodybuilding",
      title: "HARDCORE HYPERTROPHY",
      subtitle: "MAXIMUM MUSCULAR TENSION & SANGUINE PUMP",
      description:
        "Brutal high-volume bodybuilding protocol. Isolating every muscle fiber through mechanical tension, deep metabolic stress, and peak contraction.",
      specs: [
        { label: "PRIMARY FOCUS", val: "Hypertrophy & Symmetry" },
        { label: "EQUIPMENT", val: "Dumbbells to 50KG+, Pin & Plate Machines" },
        { label: "INTENSITY", val: "Failure + Rest-Pause Sets" },
      ],
      features: [
        "Heavy dumbbells from 2.5KG up to 52.5KG",
        "Multi-grip lat pulldowns & chest supported rows",
        "Cable crossover towers & preacher stations",
        "Posing mirrors with high-contrast stage lighting",
      ],
      tag: "MUSCLE FORGE",
      accent: "border-[#ef4444] text-[#ef4444]",
    },
    {
      id: "conditioning",
      title: "TACTICAL CONDITIONING",
      subtitle: "RELENTLESS STAMINA & COMBAT WORK CAPACITY",
      description:
        "High-output metabolic conditioning that builds unbreakable lung capacity and grit. Push prowlers, whip heavy battle ropes, and hammer tires.",
      specs: [
        { label: "PRIMARY FOCUS", val: "Aerobic / Anaerobic Power" },
        { label: "EQUIPMENT", val: "Heavy Sleds, Battle Ropes, Slam Balls" },
        { label: "INTENSITY", val: "VO2 Max Burst & Grit" },
      ],
      features: [
        "25-meter heavy duty synthetic turf track",
        "Heavy prowler sleds & dragging harness",
        "Assault air bikes & concept rowers",
        "Hammer & 150KG tractor tire flipping station",
      ],
      tag: "BATTLE ZONE",
      accent: "border-[#facc15] text-[#facc15]",
    },
    {
      id: "strength-combat",
      title: "COMBAT STRENGTH PROTOCOL",
      subtitle: "EXPLOSIVE ROTATIONAL POWER & GRAPPLING CORE",
      description:
        "Specialized training for combat athletes, martial artists, and anyone demanding explosive hips, unyielding grip strength, and iron neck stability.",
      specs: [
        { label: "PRIMARY FOCUS", val: "Explosive Torque & Grip" },
        { label: "EQUIPMENT", val: "Fat Gripz, Trap Bars, Heavy Bags" },
        { label: "INTENSITY", val: "Rate of Force Development (RFD)" },
      ],
      features: [
        "Axle bars and thick grip pull-up arrays",
        "Heavy boxing punch bags & speed stations",
        "Rotational landmine thruster complexes",
        "Farmer walk handles with plate loading",
      ],
      tag: "WARRIOR PROTOCOL",
      accent: "border-[#ef4444] text-[#ef4444]",
    },
  ];

  return (
    <section id="training" className="py-20 lg:py-28 bg-[#0a0a0a] relative overflow-hidden">
      {/* Gritty background accents */}
      <div className="absolute inset-0 bg-tactical-grid opacity-15 pointer-events-none" />
      <div className="absolute -bottom-48 -left-48 w-96 h-96 bg-[#ef4444]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#18181c] border border-zinc-800 text-xs font-mono text-[#facc15] uppercase tracking-widest mb-3">
            <Flame className="w-3.5 h-3.5 text-[#ef4444]" />
            <span>DISCIPLINE OVER MOTIVATION</span>
          </div>
          <h2 className="font-bebas text-5xl sm:text-6xl md:text-7xl tracking-tight uppercase text-[#f3f4f6]">
            TRAINING <span className="text-[#facc15]">PROGRAMS</span>
          </h2>
          <p className="text-zinc-400 font-body text-sm sm:text-base mt-2">
            Engineered strictly for results. Select your discipline and prepare to be pushed beyond your self-imposed limitations.
          </p>
        </div>

        {/* Tab Navigation for Desktop / Mobile */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
          {programs.map((prog, idx) => (
            <button
              key={prog.id}
              onClick={() => setActiveTab(idx)}
              className={`p-4 border text-left transition-all duration-300 clip-chamfer-sm ${
                activeTab === idx
                  ? "bg-[#18181c] border-[#facc15] shadow-[0_0_20px_rgba(250,204,21,0.2)]"
                  : "bg-[#101013] border-zinc-800 hover:border-zinc-700 text-zinc-400"
              }`}
            >
              <div className="text-[10px] font-mono tracking-widest text-zinc-500 mb-1">
                MODULE 0{idx + 1}
              </div>
              <div
                className={`font-bebas text-lg sm:text-xl tracking-wider uppercase ${
                  activeTab === idx ? "text-[#facc15]" : "text-zinc-200"
                }`}
              >
                {prog.title}
              </div>
            </button>
          ))}
        </div>

        {/* Active Program Showcase Card */}
        {(() => {
          const active = programs[activeTab];
          return (
            <div className="bg-[#121216] border-2 border-zinc-800 p-6 sm:p-10 clip-chamfer relative overflow-hidden">
              {/* Top Accent Stripe */}
              <div className="absolute top-0 left-0 w-32 h-1.5 bg-[#facc15]" />
              <div className="absolute top-0 right-0 w-32 h-1.5 bg-[#ef4444]" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left Content Column */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#1a1a20] border border-zinc-700 text-[11px] font-mono tracking-widest text-[#facc15] uppercase">
                    <Zap className="w-3.5 h-3.5 text-[#facc15]" />
                    <span>{active.tag}</span>
                  </div>

                  <div>
                    <h3 className="font-bebas text-4xl sm:text-5xl md:text-6xl text-white tracking-tight uppercase leading-none">
                      {active.title}
                    </h3>
                    <p className="font-mono text-xs sm:text-sm text-[#ef4444] tracking-wider mt-1 uppercase font-semibold">
                      {active.subtitle}
                    </p>
                  </div>

                  <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                    {active.description}
                  </p>

                  {/* Program Features */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {active.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                        <CheckCircle2 className="w-4 h-4 text-[#facc15] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="pt-4 flex flex-wrap items-center gap-4">
                    <button
                      onClick={() => onSelectProgram(active.title)}
                      className="px-6 py-3.5 bg-[#facc15] hover:bg-[#ef4444] text-black hover:text-white font-bebas text-xl tracking-wider uppercase clip-chamfer-sm transition-all duration-300 flex items-center gap-2 box-glow-yellow"
                    >
                      <Dumbbell className="w-5 h-5" />
                      <span>TRAIN THIS PROTOCOL</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                    <span className="text-xs font-mono text-zinc-400">
                      Coaching included with all active memberships
                    </span>
                  </div>
                </div>

                {/* Right Specs Radar Column */}
                <div className="lg:col-span-5 bg-[#0a0a0d] border border-zinc-800 p-6 clip-chamfer-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                    <span className="font-mono text-xs text-zinc-400 tracking-wider">
                      SPECIFICATION TELEMETRY
                    </span>
                    <span className="text-xs font-mono text-[#facc15]">STATUS: VERIFIED</span>
                  </div>

                  {active.specs.map((sp, sIdx) => (
                    <div key={sIdx} className="space-y-1">
                      <div className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
                        {sp.label}
                      </div>
                      <div className="font-mono text-sm font-semibold text-zinc-200 bg-[#141418] px-3 py-2 border-l-2 border-[#facc15]">
                        {sp.val}
                      </div>
                    </div>
                  ))}

                  <div className="pt-4 border-t border-zinc-800 flex items-center justify-between text-xs font-mono text-zinc-500">
                    <span>LOCATION: MAIN COMBAT RIG</span>
                    <span className="text-[#ef4444]">UNRESTRICTED ACCESS</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}
      </div>
    </section>
  );
}
