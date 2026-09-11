"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ShieldAlert,
  ArrowLeft,
  UserCheck,
  AlertOctagon,
  CheckCircle2,
  Eye,
  EyeOff,
  Shield,
  KeyRound,
} from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    setTimeout(() => {
      const cleanId = adminId.trim().toLowerCase();
      const cleanPass = password.trim();

      // Demo credentials check: admin / kronos2026
      if (cleanId === "admin" && cleanPass === "kronos2026") {
        if (typeof window !== "undefined") {
          localStorage.setItem("kronos_staff_auth", "true");
          localStorage.setItem("kronos_staff_user", "Command Staff // Admin");
        }
        if (typeof window !== "undefined") {
          window.location.href = "/admin";
        } else {
          router.push("/admin");
        }
      } else {
        setError("Access Denied. Unauthorized Personnel.");
        setLoading(false);
      }
    }, 450);
  };

  const handleFillDemo = () => {
    setAdminId("admin");
    setPassword("kronos2026");
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#070709] text-[#f3f4f6] flex flex-col justify-between relative overflow-hidden bg-tactical-grid selection:bg-[#dc2626] selection:text-white">
      {/* Tactical Ambient Glow Elements - Crimson Red */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-72 bg-[#dc2626]/10 blur-[130px] pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-[#dc2626]/15 blur-[150px] pointer-events-none" />

      {/* Top Header Bar */}
      <header className="border-b border-zinc-800/80 bg-[#0c0c0f]/90 backdrop-blur-md px-4 sm:px-8 py-3.5 flex items-center justify-between z-10">
        <Link
          href="/"
          className="flex items-center gap-2.5 text-zinc-400 hover:text-[#ef4444] transition-colors group font-mono text-xs uppercase tracking-wider"
          id="staff-back-to-base-top"
        >
          <div className="w-7 h-7 bg-zinc-900 border border-zinc-700 group-hover:border-[#ef4444] flex items-center justify-center transition-colors">
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          </div>
          <span>&larr; Back to Base (Home)</span>
        </Link>

        <div className="flex items-center gap-2 font-mono text-[11px] text-zinc-400">
          <span className="w-2 h-2 rounded-full bg-[#ef4444] animate-ping" />
          <span className="text-[#ef4444] font-bold">STAFF COMMAND CLEARANCE</span>
          <span className="hidden sm:inline text-zinc-600">{"//"}</span>
          <span className="hidden sm:inline">RESTRICTED ZONE</span>
        </div>
      </header>

      {/* Center Industrial Command Card */}
      <main className="flex-1 flex items-center justify-center px-4 py-12 sm:py-16 relative z-10">
        <div className="w-full max-w-md">
          {/* Card Container with Crimson-Red Border */}
          <div className="relative bg-[#0c0c0f] border-2 border-[#dc2626] shadow-[0_0_45px_rgba(220,38,38,0.25)] clip-chamfer overflow-hidden">
            {/* Top Crimson Hazard Stripes */}
            <div className="h-2 w-full hazard-stripes-crimson" />

            {/* Card Header */}
            <div className="p-6 sm:p-8 pb-4 text-center border-b border-zinc-800/80 bg-[#140e0e]/50">
              {/* Shield Alert Icon in Crimson Hex Badge */}
              <div className="w-16 h-16 mx-auto mb-4 bg-[#1b1010] border-2 border-[#dc2626] flex items-center justify-center clip-chamfer shadow-[0_0_25px_rgba(220,38,38,0.35)] group">
                <ShieldAlert className="w-8 h-8 text-[#ef4444] transform group-hover:scale-110 transition-transform duration-300" />
              </div>

              <div className="inline-block px-2.5 py-0.5 mb-2 bg-[#dc2626]/15 border border-[#dc2626]/50 text-[#ef4444] text-[10px] font-mono font-bold uppercase tracking-widest">
                LEVEL 4 CLEARANCE // RESTRICTED ACCESS
              </div>

              <h1 className="font-bebas text-3xl sm:text-4xl tracking-wider text-white">
                STAFF COMMAND LOGIN
              </h1>

              <p className="text-zinc-400 text-xs sm:text-sm font-mono mt-1">
                Owner and operational staff clearance gateway.
              </p>
            </div>

            {/* Form Section */}
            <div className="p-6 sm:p-8 pt-6">
              {/* Error Toast / Alert */}
              {error && (
                <div
                  className="mb-6 p-3.5 bg-[#ef4444]/20 border-2 border-[#ef4444] text-[#ef4444] flex items-center gap-3 animate-shake shadow-[0_0_20px_rgba(239,68,68,0.35)]"
                  role="alert"
                >
                  <AlertOctagon className="w-5 h-5 shrink-0" />
                  <div className="text-xs font-mono font-bold tracking-wide">
                    {error}
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Admin ID Input */}
                <div>
                  <label className="block text-xs font-mono font-bold text-zinc-300 uppercase tracking-wider mb-2 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <UserCheck className="w-3.5 h-3.5 text-[#ef4444]" />
                      Admin ID / Callsign
                    </span>
                    <span className="text-[10px] text-zinc-500 font-normal">
                      DEMO: admin
                    </span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={adminId}
                      onChange={(e) => setAdminId(e.target.value)}
                      placeholder="admin"
                      className="w-full bg-[#141419] border-2 border-zinc-700 focus:border-[#dc2626] focus:bg-[#181515] text-white px-4 py-3 font-mono text-sm tracking-wide placeholder-zinc-600 outline-none transition-all shadow-inner"
                      id="admin-id-input"
                    />
                  </div>
                </div>

                {/* Secret Key / Password Input */}
                <div>
                  <label className="block text-xs font-mono font-bold text-zinc-300 uppercase tracking-wider mb-2 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <KeyRound className="w-3.5 h-3.5 text-[#ef4444]" />
                      Secret Key / Password
                    </span>
                    <span className="text-[10px] text-zinc-500 font-normal">
                      DEMO: kronos2026
                    </span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="kronos2026"
                      className="w-full bg-[#141419] border-2 border-zinc-700 focus:border-[#dc2626] focus:bg-[#181515] text-white px-4 py-3 font-mono text-sm tracking-wide placeholder-zinc-600 outline-none transition-all pr-12 shadow-inner"
                      id="admin-password-input"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-[#ef4444] transition-colors p-1"
                      aria-label={showPassword ? "Hide secret key" : "Show secret key"}
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
                  className="w-full py-3.5 px-4 bg-[#dc2626] hover:bg-[#ef4444] active:scale-[0.99] text-white font-bebas text-2xl tracking-wider clip-chamfer transition-all duration-200 flex items-center justify-center gap-2 box-glow-red disabled:opacity-50 mt-2 font-bold cursor-pointer"
                  id="admin-submit-btn"
                >
                  <Shield className="w-5 h-5 fill-white/20" />
                  <span>
                    {loading ? "AUTHENTICATING STAFF..." : "ACCESS COMMAND CENTER"}
                  </span>
                </button>
              </form>

              {/* Quick Demo Autofill Helper */}
              <div className="mt-6 pt-4 border-t border-zinc-800/80">
                <button
                  type="button"
                  onClick={handleFillDemo}
                  className="w-full py-2 px-3 bg-[#171112] hover:bg-[#241517] border border-dashed border-[#dc2626]/50 text-[#ef4444] hover:border-[#ef4444] text-xs font-mono flex items-center justify-center gap-2 transition-all cursor-pointer"
                  id="autofill-admin-btn"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Auto-Fill Staff Credentials (admin / kronos2026)</span>
                </button>
              </div>

              {/* Back to Base Link */}
              <div className="mt-6 text-center">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 text-zinc-400 hover:text-white font-mono text-xs transition-colors py-1 group"
                  id="staff-back-to-base-link"
                >
                  <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform text-[#ef4444]" />
                  <span>Back to Base (Return to Website)</span>
                </Link>
              </div>

              {/* Switch to Member Login */}
              <div className="mt-4 pt-3 border-t border-zinc-900 text-center">
                <p className="text-[11px] font-mono text-zinc-500">
                  Gym Member seeking War Room?{" "}
                  <Link
                    href="/login"
                    className="text-[#facc15] hover:underline font-bold"
                  >
                    Member Login &rarr;
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* Tactical Bottom Warning */}
          <div className="mt-4 text-center font-mono text-[10px] text-zinc-600 tracking-wider uppercase">
            AUDIT LOGGED {"//"} IP RECORDED {"//"} KRONOS COMMAND
          </div>
        </div>
      </main>

      {/* Tactical Footer Strip */}
      <footer className="border-t border-zinc-900 bg-[#08080a] py-3 px-4 text-center font-mono text-[11px] text-zinc-500">
        KRONOS COMMAND CENTER &copy; 2026 {"//"} RESTRICTED ACCESS {"//"} SANIGAWAN RD, KANPUR
      </footer>
    </div>
  );
}
