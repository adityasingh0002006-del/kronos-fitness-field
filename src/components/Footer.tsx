"use client";

import React from "react";
import { Flame, MapPin, Phone, Clock, ShieldAlert, ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#08080a] border-t-2 border-zinc-800 text-zinc-400 relative overflow-hidden">
      {/* Hazard Warning Stripe */}
      <div className="w-full h-2.5 hazard-stripes border-b border-black" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#facc15] flex items-center justify-center clip-chamfer">
                <Flame className="w-6 h-6 text-black fill-black" />
              </div>
              <span className="font-bebas text-3xl tracking-wider text-white">
                KRONOS <span className="text-[#facc15]">FITNESS FIELD</span>
              </span>
            </div>

            <p className="text-sm text-zinc-400 max-w-sm leading-relaxed">
              Kanpur&apos;s hardcore raw iron battleground. Engineered for heavy lifting, powerlifting, athletic grit, and elite physical transformation.
            </p>

            <div className="p-3 bg-[#111115] border-l-2 border-[#ef4444] text-[11px] font-mono text-zinc-400 space-y-1">
              <div className="text-[#ef4444] font-bold flex items-center gap-1">
                <ShieldAlert className="w-3.5 h-3.5" /> BATTLEGROUND RULE #1:
              </div>
              <div>RE-RACK YOUR WEIGHTS. RESPECT THE WARRIORS AROUND YOU.</div>
            </div>
          </div>

          {/* Quick Nav */}
          <div>
            <h4 className="font-bebas text-xl text-white tracking-wider mb-4 border-b border-zinc-800 pb-2">
              TACTICAL NAVIGATION
            </h4>
            <ul className="space-y-2.5 text-sm font-mono">
              <li>
                <a href="#training" className="hover:text-[#facc15] transition-colors flex items-center gap-1.5">
                  <span className="text-zinc-600">//</span> Training Programs
                </a>
              </li>
              <li>
                <a href="#facilities" className="hover:text-[#facc15] transition-colors flex items-center gap-1.5">
                  <span className="text-zinc-600">//</span> Iron Arsenal
                </a>
              </li>
              <li>
                <a href="#location" className="hover:text-[#facc15] transition-colors flex items-center gap-1.5">
                  <span className="text-zinc-600">//</span> Location & Map
                </a>
              </li>
              <li>
                <a href="#membership" className="hover:text-[#facc15] transition-colors flex items-center gap-1.5">
                  <span className="text-zinc-600">//</span> Enlistment Plans
                </a>
              </li>
            </ul>
          </div>

          {/* Location & Contact */}
          <div>
            <h4 className="font-bebas text-xl text-white tracking-wider mb-4 border-b border-zinc-800 pb-2">
              HQ DISPATCH
            </h4>
            <ul className="space-y-3 text-xs font-mono">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#ef4444] shrink-0 mt-0.5" />
                <span>270 Bhaba Nagar, Sanigawan Rd, near Bank of Baroda ATM, Kanpur, UP</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#facc15] shrink-0" />
                <a href="tel:+919580650262" className="hover:text-[#facc15] font-bold text-zinc-200">
                  +91 95806 50262
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-[#facc15] shrink-0 mt-0.5" />
                <div>
                  <span className="text-zinc-200">05:00 AM – 10:00 PM</span>
                  <div className="text-[10px] text-zinc-500">Open 7 Days a Week</div>
                </div>
              </li>
            </ul>
          </div>

          {/* Operations Status */}
          <div>
            <h4 className="font-bebas text-xl text-white tracking-wider mb-4 border-b border-zinc-800 pb-2">
              STATUS TELEMETRY
            </h4>
            <div className="space-y-3 font-mono text-xs">
              <div className="bg-[#121216] p-3 border border-zinc-800 clip-chamfer-sm">
                <div className="text-[#facc15] font-bold flex items-center gap-1.5 mb-1">
                  <span className="w-2 h-2 bg-[#facc15] rounded-full animate-ping" />
                  ONLINE & ACCEPTING RECRUITS
                </div>
                <div className="text-[10px] text-zinc-400">
                  Walk-ins & trial passes active today.
                </div>
              </div>

              <button
                onClick={scrollToTop}
                className="w-full py-2.5 bg-[#17171d] hover:bg-[#facc15] hover:text-black text-zinc-300 font-bebas text-base tracking-wider uppercase clip-chamfer-sm transition-colors border border-zinc-700 flex items-center justify-center gap-1.5"
              >
                <span>BACK TO TOP</span>
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Credits */}
        <div className="pt-8 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
          <div>
            © {new Date().getFullYear()} KRONOS FITNESS FIELD. ALL RIGHTS RESERVED. FORGED IN KANPUR.
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>100% DISCIPLINE</span>
            <span>•</span>
            <span>ZERO EXCUSES</span>
            <span>•</span>
            <span>RAW HEAVY IRON</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
