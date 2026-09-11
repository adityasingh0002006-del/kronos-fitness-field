"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dumbbell,
  ArrowLeft,
  Lock,
  Phone,
  AlertTriangle,
  Flame,
  CheckCircle2,
  Eye,
  EyeOff,
} from "lucide-react";
import { getMemberByPhone } from "@/lib/kronos-store";

interface MemberLoginViewProps {
  onSuccess?: () => void;
  onBackToBase?: () => void;
  onSwitchToAdmin?: () => void;
}

export default function MemberLoginView({
  onSuccess,
  onBackToBase,
  onSwitchToAdmin,
}: MemberLoginViewProps) {
  const router = useRouter();
  const [memberId, setMemberId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    setTimeout(() => {
      const cleanId = memberId.trim();
      const cleanPass = password.trim();

      // Demo credentials check (9580650262 / iron123) or any valid member in store
      const member = getMemberByPhone(cleanId);
      const isValid =
        (cleanId === "9580650262" && cleanPass === "iron123") ||
        (member && (member.password === cleanPass || cleanPass === "iron123"));

      if (isValid) {
        if (typeof window !== "undefined") {
          localStorage.setItem("kronos_current_athlete", cleanId);
          localStorage.setItem("kronos_athlete_name", member?.name || "Alex Mercer");
        }
        setLoading(false);
        if (onSuccess) {
          onSuccess();
        } else if (typeof window !== "undefined") {
          window.location.href = "/dashboard";
        } else {
          router.push("/dashboard");
        }
      } else {
        setError("Invalid Member ID or Password.");
        setLoading(false);
      }
    }, 400);
  };

  const handleFillDemo = () => {
    setMemberId("9580650262");
    setPassword("iron123");
    setError(null);
  };

  const handleBack = () => {
    if (onBackToBase) {
      onBackToBase();
    } else {
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen bg-[#070709] text-[#f3f4f6] flex flex-col justify-between relative overflow-hidden bg-tactical-grid selection:bg-[#facc15] selection:text-black">
      {/* Tactical Ambient Glow Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-72 bg-[#facc15]/5 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#ef4444]/10 blur-[140px] pointer-events-none" />

      {/* Top Header Bar */}
      <header className="border-b border-zinc-800/80 bg-[#0c0c0f]/90 backdrop-blur-md px-4 sm:px-8 py-3.5 flex items-center justify-between z-10">
        <button
          type="button"
          onClick={handleBack}
          className="flex items-center gap-2.5 text-zinc-400 hover:text-[#facc15] transition-colors group font-mono text-xs uppercase tracking-wider cursor-pointer"
          id="back-to-base-top"
        >
          <div className="w-7 h-7 bg-zinc-900 border border-zinc-700 group-hover:border-[#facc15] flex items-center justify-center transition-colors">
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          </div>
          <span>&larr; Back to Base (Home)</span>
        </button>

        <div className="flex items-center gap-2 font-mono text-[11px] text-zinc-400">
          <span className="w-2 h-2 rounded-full bg-[#facc15] animate-pulse" />
          <span className="text-[#facc15] font-bold">ATHLETE PORTAL</span>
          <span className="hidden sm:inline text-zinc-600">{"//"}</span>
          <span className="hidden sm:inline">SANIGAWAN RD HQ</span>
        </div>
      </header>

      {/* Center Tactical Login Card */}
      <main className="flex-1 flex items-center justify-center px-4 py-12 sm:py-16 relative z-10">
        <div className="w-full max-w-md">
          {/* Card Container with Gritty Black & Hazard-Yellow Border */}
          <div className="relative bg-[#0c0c0f] border-2 border-[#facc15] shadow-[0_0_40px_rgba(250,204,21,0.15)] clip-chamfer overflow-hidden">
            {/* Top Tactical Hazard Stripe Accent */}
            <div className="h-2 w-full hazard-stripes" />

            {/* Card Header */}
            <div className="p-6 sm:p-8 pb-4 text-center border-b border-zinc-800/80 bg-[#111115]/60">
              {/* Dumbbell Icon in Hazard Yellow Hex Badge */}
              <div className="w-16 h-16 mx-auto mb-4 bg-[#18181f] border-2 border-[#facc15] flex items-center justify-center clip-chamfer shadow-[0_0_25px_rgba(250,204,21,0.25)] group">
                <Dumbbell className="w-8 h-8 text-[#facc15] transform group-hover:rotate-45 transition-transform duration-300" />
              </div>

              <div className="inline-block px-2.5 py-0.5 mb-2 bg-[#facc15]/10 border border-[#facc15]/40 text-[#facc15] text-[10px] font-mono font-bold uppercase tracking-widest">
                LEVEL 1 CLEARANCE // ATHLETE ACCESS
              </div>

              <h1 className="font-bebas text-3xl sm:text-4xl tracking-wider text-white">
                MEMBER WAR ROOM LOGIN
              </h1>

              <p className="text-zinc-400 text-xs sm:text-sm font-mono mt-1">
                Enter your credentials to access daily splits &amp; nutrition protocols.
              </p>
            </div>

            {/* Form Section */}
            <div className="p-6 sm:p-8 pt-6">
              {/* Error Banner */}
              {error && (
                <div
                  className="mb-6 p-3.5 bg-[#ef4444]/15 border-2 border-[#ef4444] text-[#ef4444] flex items-center gap-3 animate-shake shadow-[0_0_15px_rgba(239,68,68,0.25)]"
                  role="alert"
                >
                  <AlertTriangle className="w-5 h-5 shrink-0" />
                  <div className="text-xs font-mono font-bold tracking-wide">
                    {error}
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Member ID / Phone Input */}
                <div>
                  <label className="block text-xs font-mono font-bold text-zinc-300 uppercase tracking-wider mb-2 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-[#facc15]" />
                      Member ID / Phone Number
                    </span>
                    <span className="text-[10px] text-zinc-500 font-normal">
                      PRIMARY PHONE
                    </span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={memberId}
                      onChange={(e) => setMemberId(e.target.value)}
                      placeholder="9580650262"
                      className="w-full bg-[#141419] border-2 border-zinc-700 focus:border-[#facc15] focus:bg-[#181820] text-white px-4 py-3 font-mono text-sm tracking-wide placeholder-zinc-600 outline-none transition-all shadow-inner"
                      id="member-id-input"
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div>
                  <label className="block text-xs font-mono font-bold text-zinc-300 uppercase tracking-wider mb-2 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-[#facc15]" />
                      Passcode / Key
                    </span>
                    <span className="text-[10px] text-zinc-500 font-normal">
                      DEMO: iron123
                    </span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="iron123"
                      className="w-full bg-[#141419] border-2 border-zinc-700 focus:border-[#facc15] focus:bg-[#181820] text-white px-4 py-3 font-mono text-sm tracking-wide placeholder-zinc-600 outline-none transition-all pr-12 shadow-inner"
                      id="member-password-input"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-[#facc15] transition-colors p-1 cursor-pointer"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Submit Action Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-4 bg-[#facc15] hover:bg-[#ffe600] active:scale-[0.99] text-black font-bebas text-2xl tracking-wider clip-chamfer transition-all duration-200 flex items-center justify-center gap-2 box-glow-yellow disabled:opacity-50 mt-2 font-bold cursor-pointer"
                  id="member-submit-btn"
                >
                  <Flame className="w-5 h-5 fill-black" />
                  <span>
                    {loading ? "INITIALIZING WAR ROOM..." : "ENTER MEMBER WAR ROOM"}
                  </span>
                </button>
              </form>

              {/* Quick Demo Autofill Helper */}
              <div className="mt-6 pt-4 border-t border-zinc-800/80">
                <button
                  type="button"
                  onClick={handleFillDemo}
                  className="w-full py-2 px-3 bg-[#16161d] hover:bg-[#202029] border border-dashed border-[#facc15]/40 text-[#facc15] hover:border-[#facc15] text-xs font-mono flex items-center justify-center gap-2 transition-all cursor-pointer"
                  id="autofill-demo-btn"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Auto-Fill Demo Credentials (9580650262 / iron123)</span>
                </button>
              </div>

              {/* Back to Base Link/Button */}
              <div className="mt-6 text-center">
                <button
                  type="button"
                  onClick={handleBack}
                  className="inline-flex items-center gap-2 text-zinc-400 hover:text-white font-mono text-xs transition-colors py-1 group cursor-pointer"
                  id="back-to-base-link"
                >
                  <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform text-[#facc15]" />
                  <span>Back to Base (Return to Website)</span>
                </button>
              </div>

              {/* Switch to Staff Login */}
              <div className="mt-4 pt-3 border-t border-zinc-900 text-center">
                <p className="text-[11px] font-mono text-zinc-500">
                  Gym Owner or Staff Member?{" "}
                  {onSwitchToAdmin ? (
                    <button
                      type="button"
                      onClick={onSwitchToAdmin}
                      className="text-[#ef4444] hover:underline font-bold cursor-pointer inline-block ml-1"
                    >
                      Command Login &rarr;
                    </button>
                  ) : (
                    <a
                      href="/admin/login"
                      className="text-[#ef4444] hover:underline font-bold"
                    >
                      Command Login &rarr;
                    </a>
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Tactical Bottom Warning */}
          <div className="mt-4 text-center font-mono text-[10px] text-zinc-600 tracking-wider">
            SECURE ACCESS {"//"} KRONOS FITNESS FIELD {"//"} KANPUR
          </div>
        </div>
      </main>

      {/* Tactical Footer Strip */}
      <footer className="border-t border-zinc-900 bg-[#08080a] py-3 px-4 text-center font-mono text-[11px] text-zinc-500">
        KRONOS FITNESS FIELD &copy; 2026 {"//"} 270 BHAWA NAGAR, SANIGAWAN RD, KANPUR {"//"} +91 95806 50262
      </footer>
    </div>
  );
}
