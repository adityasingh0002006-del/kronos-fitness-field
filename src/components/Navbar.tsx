"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Flame,
  Menu,
  X,
  Phone,
  ShieldAlert,
  ArrowUpRight,
  User,
  Dumbbell,
  Shield,
  ArrowRight,
  ChevronDown,
  Sparkles,
} from "lucide-react";

interface NavbarProps {
  onOpenTrial: () => void;
}

export default function Navbar({ onOpenTrial }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Click outside to close behavior and Escape key handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setDropdownOpen(false);
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const navLinks = [
    { name: "TRAINING", href: "#training" },
    { name: "FACILITIES", href: "#facilities" },
    { name: "LOCATION", href: "#location" },
    { name: "MEMBERSHIP", href: "#membership" },
  ];

  return (
    <>
      {/* Top Tactical Warning Ribbon */}
      <div className="bg-[#0e0e11] border-b border-[#222226] text-[11px] font-mono py-1 px-4 flex items-center justify-between text-[#9ca3af]">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 bg-[#facc15] animate-pulse rounded-sm" />
          <span className="text-[#facc15] font-bold tracking-wider">
            KANPUR BATTLEGROUND ACTIVE
          </span>
          <span className="hidden sm:inline text-zinc-600">//</span>
          <span className="hidden sm:inline">5:00 AM – 10:00 PM DAILY</span>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="tel:+919580650262"
            className="flex items-center gap-1 hover:text-[#facc15] transition-colors"
          >
            <Phone className="w-3 h-3 text-[#facc15]" />
            <span className="font-semibold text-zinc-200">+91 95806 50262</span>
          </a>
          <span className="hidden md:inline-block bg-[#ef4444]/20 text-[#ef4444] px-2 py-0.5 border border-[#ef4444]/40 text-[9px] font-bold uppercase tracking-wider">
            RAW IRON ONLY
          </span>
        </div>
      </div>

      {/* Main Tactical Navbar - Fixed/Sticky with Gritty Theme */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#0a0a0a]/98 backdrop-blur-md border-b border-[#27272a] shadow-[0_10px_35px_rgba(0,0,0,0.9)]"
            : "bg-[#0a0a0a]/85 backdrop-blur-sm border-b border-[#222226]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Stencil Logo */}
          <a href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-[#facc15] flex items-center justify-center clip-chamfer group-hover:bg-[#ef4444] transition-colors duration-300 shadow-md shadow-yellow-500/20">
              <Flame className="w-6 h-6 text-black fill-black" />
            </div>
            <div className="flex flex-col">
              <div className="font-bebas text-2xl sm:text-3xl tracking-widest text-[#f3f4f6] group-hover:text-[#facc15] transition-colors leading-none flex items-center gap-2">
                <span>KRONOS</span>
                <span className="text-[#facc15] group-hover:text-[#ef4444] transition-colors">
                  FITNESS
                </span>
                <span className="text-xs bg-[#1f2937] text-zinc-400 px-1.5 py-0.5 rounded font-mono border border-zinc-700">
                  FIELD
                </span>
              </div>
              <span className="font-mono text-[9px] text-[#9ca3af] tracking-[0.25em] uppercase mt-0.5">
                KANPUR // RAW IRON BATTLEGROUND
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="font-bebas text-lg tracking-wider text-[#9ca3af] hover:text-[#facc15] transition-colors relative group py-1"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#facc15] group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          {/* Top-Right Action Suite: Avatar Dropdown, CTA & Mobile Toggle */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* CTA Button */}
            <button
              onClick={onOpenTrial}
              className="relative hidden lg:inline-flex items-center gap-2 px-5 py-2.5 font-bebas text-lg tracking-wider text-black bg-[#facc15] hover:bg-[#ef4444] hover:text-white transition-all duration-300 clip-chamfer box-glow-yellow hover:box-glow-red active:scale-95"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>JOIN THE CULT</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            {/* Circular Profile Avatar Button with sleek dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setDropdownOpen((prev) => !prev)}
                className={`group relative w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 focus:outline-none ${
                  dropdownOpen
                    ? "border-2 border-[#facc15] ring-2 ring-[#facc15]/40 shadow-[0_0_20px_rgba(250,204,21,0.5)] bg-zinc-900"
                    : "border-2 border-zinc-700 hover:border-[#facc15] bg-gradient-to-b from-zinc-800 to-zinc-950 hover:shadow-[0_0_15px_rgba(250,204,21,0.3)]"
                }`}
                aria-expanded={dropdownOpen}
                aria-haspopup="true"
                aria-label="User Portal Access (Member or Owner/Staff)"
                id="profile-avatar-btn"
              >
                {/* Tactical Avatar Inner Graphic */}
                <div className="w-8 h-8 rounded-full bg-[#121215] flex items-center justify-center border border-zinc-700/80 group-hover:border-[#facc15]/50 transition-colors overflow-hidden">
                  <User
                    className={`w-4 h-4 transition-colors ${
                      dropdownOpen
                        ? "text-[#facc15]"
                        : "text-zinc-300 group-hover:text-[#facc15]"
                    }`}
                  />
                </div>

                {/* Status Ping Indicator Dot (Hazard Yellow / Operational) */}
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#facc15] rounded-full border-2 border-[#0a0a0a] flex items-center justify-center shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-black"></span>
                </span>
              </button>

              {/* Sleek Tactical Portal Dropdown */}
              <div
                className={`absolute right-0 mt-3 w-80 sm:w-88 bg-[#0c0c0f] border-2 border-zinc-800 shadow-[0_20px_50px_rgba(0,0,0,0.95)] z-50 transition-all duration-200 ease-out origin-top-right overflow-hidden ${
                  dropdownOpen
                    ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                }`}
              >
                {/* Top Gritty Hazard Accent Line */}
                <div className="h-1.5 w-full hazard-stripes"></div>

                {/* Dropdown Header */}
                <div className="px-4 py-3 bg-[#131317] border-b border-zinc-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#facc15] animate-ping" />
                    <span className="font-bebas text-base tracking-wider text-white">
                      PORTAL ACCESS GATEWAY
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-400 bg-black/60 px-2 py-0.5 border border-zinc-800">
                    CLEARANCE SELECT
                  </span>
                </div>

                {/* Dropdown Menu Choices */}
                <div className="p-3 space-y-2.5">
                  {/* Choice A: "Member" (Dumbbell icon, hazard yellow accent) */}
                  <a
                    href="/login"
                    onClick={() => setDropdownOpen(false)}
                    className="group relative block p-3.5 bg-zinc-950/90 hover:bg-zinc-900 border border-zinc-800 hover:border-[#facc15] transition-all duration-200 shadow-sm"
                    id="portal-link-member"
                  >
                    <div className="flex items-start gap-3.5">
                      {/* Dumbbell Icon with Hazard Yellow Accent */}
                      <div className="w-11 h-11 bg-[#facc15]/10 border border-[#facc15]/40 text-[#facc15] group-hover:bg-[#facc15] group-hover:text-black flex items-center justify-center shrink-0 transition-colors shadow-sm">
                        <Dumbbell className="w-5 h-5 transition-transform group-hover:scale-110" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-0.5">
                          <span className="font-bebas text-xl text-white group-hover:text-[#facc15] tracking-wider transition-colors">
                            MEMBER
                          </span>
                          <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 bg-[#facc15]/15 text-[#facc15] border border-[#facc15]/40 uppercase tracking-wider">
                            WAR ROOM
                          </span>
                        </div>
                        <p className="text-xs text-zinc-400 group-hover:text-zinc-300 font-mono leading-tight">
                          Athlete check-in, diet targets &amp; daywise split
                        </p>
                      </div>

                      <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-[#facc15] group-hover:translate-x-1 transition-all shrink-0 mt-2" />
                    </div>
                  </a>

                  {/* Choice B: "Owner / Staff" (Shield icon, crimson red accent) */}
                  <a
                    href="/admin/login"
                    onClick={() => setDropdownOpen(false)}
                    className="group relative block p-3.5 bg-zinc-950/90 hover:bg-zinc-900 border border-zinc-800 hover:border-[#ef4444] transition-all duration-200 shadow-sm"
                    id="portal-link-admin"
                  >
                    <div className="flex items-start gap-3.5">
                      {/* Shield Icon with Crimson Red Accent */}
                      <div className="w-11 h-11 bg-[#ef4444]/10 border border-[#ef4444]/40 text-[#ef4444] group-hover:bg-[#ef4444] group-hover:text-white flex items-center justify-center shrink-0 transition-colors shadow-sm">
                        <Shield className="w-5 h-5 transition-transform group-hover:scale-110" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-0.5">
                          <span className="font-bebas text-xl text-white group-hover:text-[#ef4444] tracking-wider transition-colors">
                            OWNER / STAFF
                          </span>
                          <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 bg-[#ef4444]/15 text-[#ef4444] border border-[#ef4444]/40 uppercase tracking-wider">
                            COMMAND
                          </span>
                        </div>
                        <p className="text-xs text-zinc-400 group-hover:text-zinc-300 font-mono leading-tight">
                          Manage members, assign trainers &amp; edit plans
                        </p>
                      </div>

                      <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-[#ef4444] group-hover:translate-x-1 transition-all shrink-0 mt-2" />
                    </div>
                  </a>
                </div>

                {/* Dropdown Footer with Quick Demo Info */}
                <div className="px-4 py-2.5 bg-[#0a0a0c] border-t border-zinc-800 text-[11px] font-mono text-zinc-500 flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-zinc-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block"></span>
                    SANIGAWAN RD HQ
                  </span>
                  <span className="text-[10px] text-zinc-500">
                    PRESS ESC TO CLOSE
                  </span>
                </div>
              </div>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 bg-[#17171a] border border-[#27272a] text-[#facc15] hover:text-white transition-colors clip-chamfer-sm"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Slide-down Tactical Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#0a0a0a] border-b border-[#27272a] px-4 pt-4 pb-6 space-y-4">
            <div className="grid grid-cols-1 gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 bg-[#121215] border-l-2 border-[#facc15] font-bebas text-xl text-white hover:bg-[#1a1a1f] flex items-center justify-between"
                >
                  <span>{link.name}</span>
                  <span className="text-xs font-mono text-zinc-500">
                    // 0{navLinks.indexOf(link) + 1}
                  </span>
                </a>
              ))}
            </div>

            {/* Quick Mobile Portal Access Options */}
            <div className="pt-2 border-t border-zinc-800/80 space-y-2">
              <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 px-1">
                // DIRECT PORTAL ENTRY
              </div>
              <a
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 px-3 bg-[#131317] border border-[#facc15]/40 text-[#facc15] hover:bg-[#facc15] hover:text-black font-bebas text-lg tracking-wider transition-all flex items-center justify-between"
              >
                <span className="flex items-center gap-2">
                  <Dumbbell className="w-4 h-4" />
                  <span>MEMBER WAR ROOM</span>
                </span>
                <span className="text-xs font-mono">&rarr;</span>
              </a>

              <a
                href="/admin/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 px-3 bg-[#131317] border border-[#ef4444]/40 text-[#ef4444] hover:bg-[#ef4444] hover:text-white font-bebas text-lg tracking-wider transition-all flex items-center justify-between"
              >
                <span className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  <span>OWNER / STAFF COMMAND</span>
                </span>
                <span className="text-xs font-mono">&rarr;</span>
              </a>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenTrial();
                }}
                className="w-full py-3.5 bg-[#facc15] text-black font-bebas text-2xl tracking-wider clip-chamfer hover:bg-[#ef4444] hover:text-white transition-all flex items-center justify-center gap-2 shadow-lg shadow-yellow-500/20"
              >
                <ShieldAlert className="w-5 h-5" />
                <span>JOIN THE CULT // START TRIAL</span>
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
