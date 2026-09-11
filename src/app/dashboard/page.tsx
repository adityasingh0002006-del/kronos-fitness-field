"use client";

import React, { useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
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
} from "lucide-react";
import {
  INITIAL_SPLITS,
  INITIAL_MEALS,
  DEMO_MEMBERS,
  Member,
  getMembers,
  DaySplit,
} from "@/lib/kronos-store";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

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

export default function MemberDashboardPage() {
  const router = useRouter();
  const member = useSyncExternalStore(subscribe, getAthleteSnapshot, () => DEMO_MEMBERS[0]);
  const [selectedDayIndex, setSelectedDayIndex] = useState(0); // 0 = Monday
  const [completedExercises, setCompletedExercises] = useState<Record<string, boolean>>({});

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("kronos_current_athlete");
      localStorage.removeItem("kronos_athlete_name");
    }
    router.push("/");
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

      {/* TOP BAR: Gym Branding & Logout */}
      <header className="sticky top-0 z-40 bg-[#0a0a0d]/95 backdrop-blur-md border-b-2 border-zinc-800 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          {/* Gym Branding */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2.5 group">
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
            </Link>
          </div>

          {/* Top Bar Right: Status Badge & Logout Button */}
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="hidden sm:flex items-center gap-2 bg-[#121216] border border-zinc-700 px-3 py-1.5 font-mono text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-zinc-300">LIVE BATTLE STATUS</span>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3.5 py-1.5 bg-[#1a1a22] hover:bg-[#ef4444] text-zinc-300 hover:text-white border border-zinc-700 hover:border-[#ef4444] font-mono text-xs uppercase tracking-wider transition-all duration-200 clip-chamfer-sm cursor-pointer"
              id="dashboard-logout-btn"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>LOGOUT</span>
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
                    <span className="px-2 py-0.5 bg-[#facc15]/10 text-[#facc15] font-bold border border-[#facc15]/30">
                      MEAL 0{meal.mealNumber}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-zinc-500" />
                      {meal.time}
                    </span>
                  </div>

                  <h4 className="font-bebas text-lg text-white tracking-wide mb-2 line-clamp-1">
                    {meal.title}
                  </h4>

                  <ul className="space-y-1.5 text-xs font-mono text-zinc-300">
                    {meal.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-[#facc15] mt-0.5">&bull;</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-[#facc15] font-bold">PROTEIN: {meal.protein}</span>
                  <span className="text-zinc-400">{meal.calories}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Coach Vikram Note */}
          <div className="mt-6 p-3.5 bg-[#14141c] border border-zinc-700/80 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-[#facc15] shrink-0 mt-0.5" />
            <div className="text-xs font-mono text-zinc-300">
              <span className="text-[#facc15] font-bold uppercase">
                Coach Vikram&apos;s Nutrition Directive:
              </span>{" "}
              {member?.dietNotes ||
                "Zero processed sugar or soda. Whey shake immediately post-workout within 45 minutes. Drink 4L mineralized water throughout the day."}
            </div>
          </div>
        </div>

        {/* SECTION 3: WEEKLY WAR SCHEDULE (7-DAY SPLIT) */}
        <div className="bg-[#0c0c10] border-2 border-zinc-800 p-6 sm:p-8 clip-chamfer shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-[#ef4444] rotate-45 inline-block" />
                <span className="text-xs font-mono font-bold text-[#ef4444] tracking-widest uppercase">
                  TRAINING PROTOCOL // 7-DAY BATTLE SCHEDULE
                </span>
              </div>
              <h3 className="font-bebas text-3xl sm:text-4xl text-white tracking-wider mt-1 flex items-center gap-3">
                <Calendar className="w-7 h-7 text-[#ef4444]" />
                WEEKLY WAR SCHEDULE
              </h3>
              <p className="text-zinc-400 text-xs sm:text-sm font-mono mt-1">
                Select any day below to inspect targeted muscle groups, exercise sets &amp; reps.
              </p>
            </div>

            <div className="text-xs font-mono text-zinc-400 bg-[#141419] px-3 py-1.5 border border-zinc-800">
              SPLIT FORMAT: <span className="text-[#facc15] font-bold">HYPERTROPHY WARFARE</span>
            </div>
          </div>

          {/* 7 Styled Cards: Day Selectors (Monday to Sunday) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 mt-6">
            {splits.map((split, index) => {
              const isSelected = selectedDayIndex === index;
              return (
                <button
                  key={split.day}
                  type="button"
                  onClick={() => setSelectedDayIndex(index)}
                  className={`p-3 text-left transition-all relative border cursor-pointer ${
                    isSelected
                      ? "bg-[#181824] border-2 border-[#facc15] shadow-[0_0_15px_rgba(250,204,21,0.2)]"
                      : "bg-[#101015] border-zinc-800 hover:border-zinc-600 hover:bg-[#15151c]"
                  }`}
                >
                  {/* Top indicator */}
                  <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                    <span
                      className={
                        isSelected ? "text-[#facc15] font-bold" : "text-zinc-500"
                      }
                    >
                      DAY 0{index + 1}
                    </span>
                    {split.target === "Rest" ? (
                      <span className="text-[9px] text-cyan-400 uppercase">REPAIR</span>
                    ) : (
                      <span className="text-[9px] text-zinc-400">WAR</span>
                    )}
                  </div>

                  <div
                    className={`font-bebas text-xl sm:text-2xl leading-tight ${
                      isSelected ? "text-white" : "text-zinc-300"
                    }`}
                  >
                    {split.day}
                  </div>

                  <div
                    className={`text-xs font-mono font-bold mt-1 line-clamp-1 ${
                      isSelected ? "text-[#facc15]" : "text-zinc-400"
                    }`}
                  >
                    {split.target}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Day Exercise Drill-down Panel */}
          <div className="mt-8 bg-[#111116] border-2 border-zinc-700/80 p-6 relative">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-zinc-800 gap-2">
              <div>
                <span className="text-xs font-mono text-[#facc15] uppercase tracking-wider font-bold">
                  {currentSplit.day.toUpperCase()} PROTOCOL // {currentSplit.focus}
                </span>
                <h4 className="font-bebas text-3xl sm:text-4xl text-white tracking-wider">
                  TARGET: {currentSplit.target.toUpperCase()}
                </h4>
              </div>

              <div className="text-xs font-mono text-zinc-400 flex items-center gap-2">
                <span>TOTAL MOVEMENTS:</span>
                <span className="px-2 py-0.5 bg-[#facc15] text-black font-bold">
                  {currentSplit.exercises.length} EXERCISES
                </span>
              </div>
            </div>

            {/* Exercises List */}
            <div className="space-y-3">
              {currentSplit.exercises.map((ex) => {
                const checkKey = `${currentSplit.day}-${ex.name}`;
                const isDone = !!completedExercises[checkKey];

                return (
                  <div
                    key={ex.name}
                    onClick={() => toggleExercise(checkKey)}
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
        </div>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-zinc-900 bg-[#08080a] py-4 px-4 text-center font-mono text-xs text-zinc-500 mt-12">
        KRONOS FITNESS FIELD {"//"} 270 BHAWA NAGAR, SANIGAWAN RD, KANPUR {"//"} +91 95806 50262 {"//"} WAR ROOM ACTIVE
      </footer>
    </div>
  );
}
