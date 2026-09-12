"use client";

import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Clock,
  Navigation,
  Compass,
  CheckCircle,
  ExternalLink,
  MessageSquare,
  Copy,
  Check,
} from "lucide-react";

export default function LocationCard() {
  const [copied, setCopied] = useState(false);

  const address = "270 Bhaba Nagar, Sanigawan Rd, near Bank of Baroda ATM, Kanpur, Uttar Pradesh 208007";
  const phone = "+91 95806 50262";
  const googleMapsUrl = "https://www.google.com/maps/search/?api=1&query=270+Bhaba+Nagar+Sanigawan+Rd+near+Bank+of+Baroda+ATM+Kanpur";
  const whatsappUrl = "https://wa.me/919580650262?text=Hello%20KRONOS%20Fitness%20Field!%20I%20want%20to%20inquire%20about%20memberships%20and%20claim%20my%20free%20trial%20session.";

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="location" className="py-20 lg:py-28 bg-[#0a0a0a] relative overflow-hidden">
      {/* Background Gritty Glow */}
      <div className="absolute inset-0 bg-tactical-grid opacity-15 pointer-events-none" />
      <div className="absolute -top-32 -left-32 w-80 h-80 bg-[#ef4444]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#16161a] border border-zinc-700 text-xs font-mono text-[#facc15] tracking-widest uppercase mb-3">
            <Compass className="w-3.5 h-3.5 text-[#ef4444]" />
            <span>HQ COORDINATES // PHYSICAL GROUND</span>
          </div>
          <h2 className="font-bebas text-5xl sm:text-6xl md:text-7xl tracking-tight uppercase text-white leading-none">
            LOCATE THE <span className="text-[#facc15]">BATTLEGROUND</span>
          </h2>
          <p className="text-zinc-400 font-body text-sm sm:text-base mt-2">
            Situated on Sanigawan Road near Bank of Baroda ATM. Step into Kanpur&apos;s rawest strength arena.
          </p>
        </div>

        {/* Tactical Info Box & Radar Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Tactical Mission Dossier */}
          <div className="lg:col-span-6 bg-[#111115] border-2 border-zinc-800 p-6 sm:p-8 clip-chamfer relative flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              {/* Dossier Header */}
              <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                <div>
                  <div className="font-bebas text-3xl text-white tracking-wider">
                    KRONOS FITNESS FIELD // HQ
                  </div>
                  <div className="font-mono text-xs text-[#facc15] tracking-widest uppercase">
                    SECTOR: SANIGAWAN ROAD, KANPUR
                  </div>
                </div>
                <div className="w-3 h-3 bg-[#facc15] rounded-full animate-ping" />
              </div>

              {/* Physical Location Address */}
              <div className="bg-[#17171d] border-l-4 border-[#facc15] p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono tracking-wider text-zinc-400 uppercase flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#ef4444]" /> EXACT PHYSICAL ADDRESS
                  </span>
                  <button
                    onClick={handleCopyAddress}
                    className="text-xs font-mono text-[#facc15] hover:text-white flex items-center gap-1 transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3 h-3 text-green-400" /> Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" /> Copy
                      </>
                    )}
                  </button>
                </div>
                <p className="text-white font-medium text-sm sm:text-base leading-relaxed">
                  {address}
                </p>
                <div className="text-[11px] font-mono text-zinc-400">
                  Landmark: Exactly adjacent to Bank of Baroda ATM
                </div>
              </div>

              {/* Operational Timings */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-[#17171d] border border-zinc-800 p-4 clip-chamfer-sm">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#facc15] mb-1">
                    <Clock className="w-4 h-4" />
                    <span>MORNING SHIFT</span>
                  </div>
                  <div className="font-bebas text-2xl text-white">05:00 AM – 11:30 AM</div>
                  <div className="text-[11px] font-mono text-zinc-400 mt-1">
                    Peak Powerlifting & Empty Bars
                  </div>
                </div>

                <div className="bg-[#17171d] border border-zinc-800 p-4 clip-chamfer-sm">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#ef4444] mb-1">
                    <Clock className="w-4 h-4" />
                    <span>EVENING SHIFT</span>
                  </div>
                  <div className="font-bebas text-2xl text-white">04:00 PM – 10:00 PM</div>
                  <div className="text-[11px] font-mono text-zinc-400 mt-1">
                    Hypertrophy & High-Octane Pump
                  </div>
                </div>
              </div>

              {/* Verified Features */}
              <div className="space-y-2 pt-2">
                {[
                  "Free dedicated two-wheeler and four-wheeler parking space",
                  "RO purified chilled water hydration station",
                  "Continuous high-output power backup for non-stop workouts",
                  "Air-conditioned & high-velocity industrial cooling fans",
                ].map((perk, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-zinc-300 font-mono">
                    <CheckCircle className="w-3.5 h-3.5 text-[#facc15] shrink-0" />
                    <span>{perk}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct Contact Buttons */}
            <div className="pt-4 border-t border-zinc-800 flex flex-col sm:flex-row gap-3">
              <a
                href={`tel:${phone.replace(/\s+/g, "")}`}
                className="flex-1 py-3.5 px-4 bg-[#facc15] hover:bg-[#ef4444] text-black hover:text-white font-bebas text-xl tracking-wider uppercase clip-chamfer-sm transition-all duration-300 flex items-center justify-center gap-2 box-glow-yellow"
              >
                <Phone className="w-4 h-4" />
                <span>CALL: {phone}</span>
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3.5 px-5 bg-[#1f2937] hover:bg-[#25D366] text-white font-bebas text-xl tracking-wider uppercase clip-chamfer-sm transition-all duration-300 flex items-center justify-center gap-2 border border-zinc-700"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WHATSAPP</span>
              </a>
            </div>
          </div>

          {/* Right: Tactical Radar & Map Viewport */}
          <div className="lg:col-span-6 bg-[#111115] border-2 border-zinc-800 clip-chamfer overflow-hidden flex flex-col justify-between">
            {/* Radar Header */}
            <div className="bg-[#16161c] px-4 py-3 border-b border-zinc-800 flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2 text-zinc-300">
                <Navigation className="w-4 h-4 text-[#facc15] animate-spin" />
                <span className="font-bold">GRID GPS: 26.4172° N, 80.3789° E</span>
              </div>
              <span className="text-[#facc15]">SATELLITE SYNC OK</span>
            </div>

            {/* Interactive Map Embed with Dark Styling */}
            <div className="relative w-full h-[360px] sm:h-[420px] bg-[#0c0c0f]">
              <iframe
                title="KRONOS Fitness Field Location Map"
                src="https://maps.google.com/maps?q=270+Bhaba+Nagar,+Sanigawan+Rd,+near+Bank+of+Baroda+ATM,+Kanpur&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(92%) hue-rotate(180deg) contrast(1.15)" }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full opacity-85 hover:opacity-100 transition-opacity"
              />

              {/* Floating Radar Pin Overlay */}
              <div className="absolute top-4 left-4 bg-[#0a0a0a]/90 backdrop-blur-sm border border-[#facc15] p-3 text-xs font-mono text-zinc-200 pointer-events-none max-w-xs">
                <div className="text-[#facc15] font-bold uppercase flex items-center gap-1.5 mb-1">
                  <span className="w-2 h-2 bg-[#facc15] rounded-full animate-ping" />
                  KRONOS FITNESS FIELD
                </div>
                <div className="text-[11px] text-zinc-400">
                  Near Bank of Baroda ATM, Sanigawan Road
                </div>
              </div>
            </div>

            {/* Map Action Footer */}
            <div className="p-4 bg-[#141418] border-t border-zinc-800 flex items-center justify-between">
              <span className="text-xs font-mono text-zinc-400">
                Open in Google Maps for turn-by-turn navigation
              </span>
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#1d1d24] hover:bg-[#facc15] text-zinc-200 hover:text-black font-bebas text-lg tracking-wider clip-chamfer-sm transition-colors border border-zinc-700"
              >
                <span>OPEN GPS DIRECTIONS</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
