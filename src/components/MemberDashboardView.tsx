"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Flame,
  LogOut,
  Shield,
  Utensils,
  Calendar,
  Clock,
  CheckCircle2,
  Award,
  User,
  HeartPulse,
  FlameKindling,
  AlertCircle,
  ArrowLeft,
  Home,
} from "lucide-react";
import {
  INITIAL_SPLITS,
  INITIAL_MEALS,
  DEMO_MEMBERS,
  Member,
  getMembers,
  DaySplit,
} from "@/lib/kronos-store";

function getAthleteSnapshot(): Member {
  if (typeof window === "undefined") return DEMO_MEMBERS[0];
  try {
    const phone = localStorage.getItem("kronos_current_athlete") || "9580650262";
    const members = getMembers();
    return members.find((m) => m.phone === phone) || DEMO_MEMBERS[0];
  } catch {
    return DEMO_MEMBERS[0];
  }
}

interface MemberDashboardViewProps {
  onBackToBase?: () => void;
}

export default function MemberDashboardView({ onBackToBase }: MemberDashboardViewProps) {
  const router = useRouter();
  const [member, setMember] = useState<Member>(() => getAthleteSnapshot());
  const [selectedDayIndex, setSelectedDayIndex] = useState(0); // 0 = Monday
  const [completedExercises, setCompletedExercises] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const syncMember = () => setMember(getAthleteSnapshot());
    syncMember();

    if (typeof window === "undefined") return;
    window.addEventListener("storage", syncMember);

    return () => {
      window.removeEventListener("storage", syncMember);
    };
  }, []);

  const handleBack = () => {
    if (onBackToBase) {
      onBackToBase();
    } else {
      router.push("/");
    }
  };

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("kronos_current_athlete");
      localStorage.removeItem("kronos_athlete_name");
    }
    if (onBackToBase) {
      onBackToBase();
    } else {
      router.push("/");
    }
  };

  const toggleExercise = (key: string) => {
    setCompletedExercises((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const splits: DaySplit[] = member?.splits || INITIAL_SPLITS;
  const meals = member?.meals || INITIAL_MEALS;
  const currentSplit = splits[selectedDayIndex] || splits[0];

  return (
    <div className="min-h-screen bg-[#070709] text-[#f3f4f6] flex flex-col relative bg-tactical-grid selection:bg-[#facc15] selection:text-black">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#facc15]/5 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#ef4444]/5 blur-[140px] pointer-events-none" />

      {/* TOP BAR: Gym Branding & Navigation */}
      <header className="sticky top-0 z-40 bg-[#0a0a0d]/95 backdrop-blur-md border-b-2 border-zinc-800 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          {/* Gym Branding / Click to go Home */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleBack}
              className="flex items-center gap-2.5 group text-left cursor-pointer"
              title="Return to Base"
            >
              <div className="w-9 h-9 bg-[#facc15] flex items-center justify-center clip-chamfer group-hover:bg-[#ef4444] transition-colors shadow-md shadow-yellow-500/20">
                <Flame className="w-5 h-5 text-black fill-black" />
              </div>
              <div className="flex flex-col">
                <div className="font-bebas text-xl sm:text-2xl tracking-wider text-white flex items-center gap-2">
                  <span>KRONOS FITNESS FIELD</span>
                  <span className="hidden md:inline text-xs font-mono text-zinc-500">{"//"}</span>
                  <span className="hidden md:inline text-xs font-mono text-[#facc15]">
                    Sanigawan Rd, Kanpur
                  </span>
                </div>
                <span className="font-mono text-[9px] text-zinc-400 tracking-widest uppercase -mt-0.5">
                  WAR ROOM // ATHLETE PORTAL
                </span>
              </div>
            </button>
          </div>

          {/* Top Bar Right: Back to Base, Status Badge & Logout Button */}
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="hidden lg:flex items-center gap-2 bg-[#121216] border border-zinc-700 px-3 py-1.5 font-mono text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-zinc-300">LIVE BATTLE STATUS</span>
            </div>

            {/* Back to Base Button */}
            <button
              type="button"
              onClick={handleBack}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#171720] hover:bg-[#facc15] text-[#facc15] hover:text-black border border-[#facc15]/50 hover:border-[#facc15] font-mono text-xs uppercase tracking-wider transition-all duration-200 clip-chamfer-sm cursor-pointer font-bold shadow-sm"
              id="back-to-base-btn"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Base</span>
            </button>

            {/* Logout Button */}
            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#1a1a22] hover:bg-[#ef4444] text-zinc-300 hover:text-white border border-zinc-700 hover:border-[#ef4444] font-mono text-xs uppercase tracking-wider transition-all duration-200 clip-chamfer-sm cursor-pointer"
              id="dashboard-logout-btn"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">LOGOUT</span>
            </button>
          </div>
        </div>
        {/* Tactical Yellow Accent Line */}
        <div className="h-1 w-full hazard-stripes" />
      </header>

      {/* MAIN WAR ROOM CONTENT */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* SECTION 1: ATHLETE OVERVIEW CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          {/* Card 1: Athlete Name */}
          <div className="bg-[#0e0e12] border-2 border-zinc-800 hover:border-[#facc15] p-5 clip-chamfer transition-all relative overflow-hidden group">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest flex items-center gap-1.5">
                  <User className="w-3 h-3 text-[#facc15]" />
                  REGISTERED ATHLETE
                </span>
                <h2 className="font-bebas text-3xl sm:text-4xl tracking-wider text-white mt-1 group-hover:text-[#facc15] transition-colors">
                  {member?.name || "Alex Mercer"}
                </h2>
                <div className="font-mono text-xs text-zinc-400 mt-1 flex items-center gap-2">
                  <span>ID: {member?.phone || "9580650262"}</span>
                  <span className="text-zinc-600">{"//"}</span>
                  <span className="text-emerald-400 font-bold">STATUS: ACTIVE</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded bg-zinc-900 border border-zinc-700 flex items-center justify-center text-[#facc15] shrink-0">
                <Award className="w-6 h-6" />
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px] font-mono text-zinc-500">
              <span>CLEARANCE: LEVEL 1 TITAN</span>
              <span>SINCE 2024</span>
            </div>
          </div>

          {/* Card 2: Assigned Trainer */}
          <div className="bg-[#0e0e12] border-2 border-zinc-800 hover:border-[#ef4444] p-5 clip-chamfer transition-all relative overflow-hidden group">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest flex items-center gap-1.5">
                  <Shield className="w-3 h-3 text-[#ef4444]" />
                  ASSIGNED TRAINER
                </span>
                <h2 className="font-bebas text-3xl sm:text-4xl tracking-wider text-white mt-1 group-hover:text-[#ef4444] transition-colors">
                  {member?.trainer || "Coach Vikram"}
                </h2>
                <div className="font-mono text-xs text-zinc-400 mt-1">
                  Head Strength &amp; Hypertrophy Commander
                </div>
              </div>
              <div className="w-12 h-12 rounded bg-zinc-900 border border-zinc-700 flex items-center justify-center text-[#ef4444] shrink-0">
                <FlameKindling className="w-6 h-6" />
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px] font-mono text-zinc-500">
              <span>ON-FLOOR MONITORING</span>
              <span className="text-amber-400">ACTIVE SUPERVISION</span>
            </div>
          </div>

          {/* Card 3: Nutrition Plan Status */}
          <div className="bg-[#0e0e12] border-2 border-zinc-800 hover:border-emerald-400 p-5 clip-chamfer transition-all relative overflow-hidden group">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest flex items-center gap-1.5">
                  <Utensils className="w-3 h-3 text-emerald-400" />
                  NUTRITION PROTOCOL
                </span>
                <div className="mt-1">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-950/60 border border-emerald-500 text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    ACTIVE PLAN BADGE
                  </span>
                </div>
                <div className="font-mono text-xs text-zinc-300 mt-2 line-clamp-1">
                  High-Protein Hypertrophy // 180g Target
                </div>
              </div>
              <div className="w-12 h-12 rounded bg-zinc-900 border border-zinc-700 flex items-center justify-center text-emerald-400 shrink-0">
                <HeartPulse className="w-6 h-6" />
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px] font-mono text-zinc-500">
              <span>CALORIC CAP: 2,200 KCAL</span>
              <span className="text-emerald-400">100% FUEL COMPLIANT</span>
            </div>
          </div>
        </div>

        {/* SECTION 2: NUTRITION & FUEL CARD */}
        <div className="bg-[#0c0c10] border-2 border-[#facc15] clip-chamfer p-6 sm:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.8)] relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-[#facc15] rotate-45 inline-block" />
                <span className="text-xs font-mono font-bold text-[#facc15] tracking-widest uppercase">
                  DAILY RECOVERY MATRIX
                </span>
              </div>
              <h3 className="font-bebas text-3xl sm:text-4xl text-white tracking-wider mt-1 flex items-center gap-3">
                <Utensils className="w-7 h-7 text-[#facc15]" />
                NUTRITION &amp; FUEL BREAKDOWN
              </h3>
              <p className="text-zinc-400 text-xs sm:text-sm font-mono mt-1">
                Optimized high-protein fuel schedule to accelerate muscle protein synthesis.
              </p>
            </div>

            {/* Quick Macro Pills */}
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
              <div className="bg-[#181820] border border-zinc-700 px-3 py-1.5">
                <span className="text-zinc-400">PROTEIN: </span>
                <span className="text-[#facc15] font-bold">180g</span>
              </div>
              <div className="bg-[#181820] border border-zinc-700 px-3 py-1.5">
                <span className="text-zinc-400">CALORIES: </span>
                <span className="text-white font-bold">2,200 KCAL</span>
              </div>
              <div className="bg-[#181820] border border-zinc-700 px-3 py-1.5">
                <span className="text-zinc-400">WATER: </span>
                <span className="text-cyan-400 font-bold">4.0 L</span>
              </div>
            </div>
          </div>

          {/* Meal Breakdown Grid: Eggs, Oats, Chicken / Paneer, Whey Shake */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            {meals.map((meal) => (
              <div
                key={meal.mealNumber}
                className="bg-[#121217] border border-zinc-800 hover:border-zinc-600 p-4 flex flex-col justify-between transition-all"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-2">
                    <span className="px-1.5 py-0.5 bg-black/60 border border-zinc-700 text-[#facc15] font-bold">
                      MEAL 0{meal.mealNumber}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-zinc-500" />
                      {meal.time}
                    </span>
                  </div>

                  <h4 className="font-bebas text-xl text-white tracking-wide mb-1">
                    {meal.title}
                  </h4>

                  <ul className="space-y-1.5 my-3">
                    {meal.items.map((item, idx) => (
                      <li
                        key={idx}
                        className="text-xs font-mono text-zinc-300 flex items-center gap-2"
                      >
                        <span className="w-1.5 h-1.5 bg-[#facc15] rounded-full shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs font-mono">
                  <span className="text-[#facc15] font-bold">
                    {meal.protein} Protein
                  </span>
                  <span className="text-zinc-400">{meal.calories}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Diet Notes Strip */}
          {member?.dietNotes && (
            <div className="mt-6 p-4 bg-[#14141c] border-l-4 border-[#facc15] flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-[#facc15] shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-mono font-bold text-[#facc15] uppercase tracking-wider block">
                  COACHING DIRECTIVE // HYDRATION & TIMING
                </span>
                <p className="text-xs font-mono text-zinc-300 mt-0.5">
                  {member.dietNotes}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* SECTION 3: 7-DAY HARDCORE SPLIT & INTERACTIVE WORKOUTS */}
        <div className="bg-[#0c0c10] border-2 border-zinc-800 clip-chamfer p-6 sm:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-[#ef4444] rotate-45 inline-block" />
                <span className="text-xs font-mono font-bold text-[#ef4444] tracking-widest uppercase">
                  PROGRAM BLUEPRINT
                </span>
              </div>
              <h3 className="font-bebas text-3xl sm:text-4xl text-white tracking-wider mt-1 flex items-center gap-3">
                <Calendar className="w-7 h-7 text-[#ef4444]" />
                7-DAY HARDCORE TRAINING SPLIT
              </h3>
              <p className="text-zinc-400 text-xs sm:text-sm font-mono mt-1">
                Select your combat day to view targeted exercises, prescribed sets, and volume metrics.
              </p>
            </div>

            {/* Current Target Pill */}
            <div className="bg-[#181820] border-2 border-[#ef4444] px-4 py-2 flex items-center gap-2 self-start md:self-auto">
              <Flame className="w-4 h-4 text-[#ef4444]" />
              <span className="font-bebas text-lg tracking-wider text-white">
                TODAY: {currentSplit.target.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Day Selector Tabs (Monday through Sunday) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 mt-6">
            {splits.map((s, idx) => {
              const isSelected = selectedDayIndex === idx;
              return (
                <button
                  key={s.day}
                  type="button"
                  onClick={() => setSelectedDayIndex(idx)}
                  className={`p-3 text-left transition-all border clip-chamfer-sm cursor-pointer ${
                    isSelected
                      ? "bg-[#facc15] border-[#facc15] text-black font-bold shadow-[0_0_15px_rgba(250,204,21,0.3)]"
                      : "bg-[#121217] border-zinc-800 text-zinc-300 hover:border-zinc-600 hover:bg-[#181820]"
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                    <span className={isSelected ? "text-black" : "text-zinc-500"}>
                      DAY 0{idx + 1}
                    </span>
                    {idx === 6 ? (
                      <span className="text-[9px] px-1 bg-black/20 uppercase">REST</span>
                    ) : null}
                  </div>
                  <div className="font-bebas text-lg tracking-wider truncate">
                    {s.day.toUpperCase()}
                  </div>
                  <div
                    className={`text-[10px] font-mono truncate ${
                      isSelected ? "text-black font-semibold" : "text-zinc-400"
                    }`}
                  >
                    {s.target}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Split Exercises Table */}
          <div className="mt-8 bg-[#09090c] border border-zinc-800 p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-zinc-800">
              <div>
                <span className="font-bebas text-2xl text-white tracking-wider">
                  {currentSplit.day.toUpperCase()} ROUTINE // {currentSplit.target.toUpperCase()}
                </span>
                <span className="text-xs font-mono text-zinc-400 block sm:inline sm:ml-3">
                  Focus: {currentSplit.focus}
                </span>
              </div>
              <span className="text-xs font-mono text-[#facc15] bg-[#facc15]/10 px-2 py-1 border border-[#facc15]/30 self-start">
                {currentSplit.exercises.length} EXERCISES LOGGED
              </span>
            </div>

            {/* Exercise List */}
            <div className="space-y-3">
              {currentSplit.exercises.map((ex, exIdx) => {
                const exKey = `${currentSplit.day}-${exIdx}-${ex.name}`;
                const isDone = !!completedExercises[exKey];

                return (
                  <div
                    key={exIdx}
                    onClick={() => toggleExercise(exKey)}
                    className={`p-4 border transition-all flex items-center justify-between gap-4 cursor-pointer ${
                      isDone
                        ? "bg-[#0f1f14] border-emerald-500/60 text-zinc-300"
                        : "bg-[#14141a] border-zinc-800 hover:border-[#facc15]/60 hover:bg-[#181822]"
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div
                        className={`w-6 h-6 rounded border flex items-center justify-center transition-colors ${
                          isDone
                            ? "bg-emerald-500 border-emerald-400 text-black"
                            : "border-zinc-700 bg-black/40 text-transparent hover:border-[#facc15]"
                        }`}
                      >
                        <CheckCircle2 className="w-4 h-4" />
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`font-bebas text-xl tracking-wide ${
                              isDone ? "text-emerald-300 line-through" : "text-white"
                            }`}
                          >
                            {ex.name}
                          </span>
                          <span className="text-[10px] font-mono text-zinc-400 bg-black/50 px-2 py-0.5 border border-zinc-800 hidden sm:inline-block">
                            {ex.target}
                          </span>
                        </div>
                        <div className="text-xs font-mono text-zinc-400 sm:hidden">
                          Target: {ex.target}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-xs font-mono shrink-0">
                      <span className="px-2.5 py-1 bg-black/60 border border-zinc-700 text-[#facc15] font-bold">
                        {ex.sets}
                      </span>
                      <span className="px-2.5 py-1 bg-black/60 border border-zinc-700 text-zinc-300">
                        {ex.reps}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 pt-3 border-t border-zinc-800 flex items-center justify-between text-[11px] font-mono text-zinc-500">
              <span>TIP: CLICK AN EXERCISE ROW TO TOGGLE COMPLETION FOR TODAY</span>
              <span className="text-[#facc15]">KRONOS RAW IRON STANDARD</span>
            </div>
          </div>

          {/* Bottom Back to Base Button Strip */}
          <div className="mt-8 text-center pt-4 border-t border-zinc-800">
            <button
              type="button"
              onClick={handleBack}
              className="inline-flex items-center gap-2.5 px-6 py-3 bg-[#141419] hover:bg-[#facc15] text-[#facc15] hover:text-black border border-[#facc15]/50 hover:border-[#facc15] font-bebas text-lg tracking-wider clip-chamfer transition-all duration-200 cursor-pointer shadow-md"
              id="dashboard-footer-back-to-base"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>RETURN TO MAIN BASE // LANDING PAGE</span>
            </button>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-zinc-900 bg-[#08080a] py-4 px-4 text-center font-mono text-xs text-zinc-500 mt-12">
        KRONOS FITNESS FIELD {"//"} 270 BHABA NAGAR, SANIGAWAN RD, KANPUR {"//"} +91 95806 50262 {"//"} WAR ROOM ACTIVE
      </footer>
    </div>
  );
}
