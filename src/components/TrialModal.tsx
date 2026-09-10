"use client";

import React, { useState } from "react";
import { X, Flame, ShieldAlert, CheckCircle, MessageSquare, Ticket, User, Phone, Clock, Dumbbell } from "lucide-react";
import confetti from "canvas-confetti";

interface TrialModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPlan?: string;
}

export default function TrialModal({ isOpen, onClose, defaultPlan }: TrialModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [timeSlot, setTimeSlot] = useState("05:00 AM - 08:00 AM (Dawn Iron)");
  const [discipline, setDiscipline] = useState(defaultPlan || "TITAN POWERLIFTING");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [recruitId, setRecruitId] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    const randomId = `KRN-${Math.floor(1000 + Math.random() * 9000)}-${new Date().getFullYear()}`;
    setRecruitId(randomId);
    setIsSubmitted(true);

    // Launch tactical confetti blast
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#facc15", "#ef4444", "#ffffff"],
      });
    } catch {
      // ignore
    }
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    setName("");
    setPhone("");
    onClose();
  };

  const whatsappMessage = `Hi KRONOS Fitness Field! I claimed my Free Battle Pass (Recruit ID: ${recruitId}). Name: ${name}, Phone: ${phone}, Time Slot: ${timeSlot}, Track: ${discipline}. See you on the battleground!`;
  const whatsappUrl = `https://wa.me/919580650262?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#0f0f13] border-2 border-[#facc15] clip-chamfer p-6 sm:p-8 shadow-[0_0_50px_rgba(250,204,21,0.25)]">
        {/* Close Button */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-4 right-4 p-2 bg-[#1a1a20] border border-zinc-700 text-zinc-400 hover:text-white hover:bg-[#ef4444] transition-colors clip-chamfer-sm"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            {/* Modal Header */}
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-[#facc15] text-black flex items-center justify-center clip-chamfer-sm">
                <Flame className="w-5 h-5 fill-black" />
              </div>
              <span className="font-mono text-xs text-[#facc15] tracking-widest uppercase">
                ENLISTMENT PROTOCOL // 1-DAY PASS
              </span>
            </div>

            <h3 className="font-bebas text-3xl sm:text-4xl text-white tracking-wider uppercase mb-1">
              CLAIM YOUR BATTLE PASS
            </h3>
            <p className="text-xs font-mono text-zinc-400 mb-6">
              Step inside KRONOS Fitness Field for a no-bullsh*t raw iron training session.
            </p>

            {/* Enlistment Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-xs font-mono uppercase text-zinc-300 tracking-wider mb-1.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#facc15]" /> Warrior Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Vikram Singh"
                  className="w-full px-4 py-3 bg-[#16161c] border border-zinc-700 text-white font-medium focus:border-[#facc15] focus:outline-none clip-chamfer-sm text-sm"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-mono uppercase text-zinc-300 tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#ef4444]" /> Phone Number (WhatsApp Enabled)
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full px-4 py-3 bg-[#16161c] border border-zinc-700 text-white font-medium focus:border-[#facc15] focus:outline-none clip-chamfer-sm text-sm"
                />
              </div>

              {/* Preferred Slot */}
              <div>
                <label className="block text-xs font-mono uppercase text-zinc-300 tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#facc15]" /> Preferred Deployment Slot
                </label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full px-4 py-3 bg-[#16161c] border border-zinc-700 text-zinc-200 font-medium focus:border-[#facc15] focus:outline-none clip-chamfer-sm text-sm"
                >
                  <option>05:00 AM - 08:00 AM (Dawn Iron)</option>
                  <option>08:00 AM - 11:30 AM (Mid-Morning Surge)</option>
                  <option>04:00 PM - 07:00 PM (Prime Power Hour)</option>
                  <option>07:00 PM - 10:00 PM (Night Iron Protocol)</option>
                </select>
              </div>

              {/* Training Focus */}
              <div>
                <label className="block text-xs font-mono uppercase text-zinc-300 tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Dumbbell className="w-3.5 h-3.5 text-[#facc15]" /> Training Focus
                </label>
                <select
                  value={discipline}
                  onChange={(e) => setDiscipline(e.target.value)}
                  className="w-full px-4 py-3 bg-[#16161c] border border-zinc-700 text-zinc-200 font-medium focus:border-[#facc15] focus:outline-none clip-chamfer-sm text-sm"
                >
                  <option>TITAN POWERLIFTING (Squat/Bench/Deadlift)</option>
                  <option>HARDCORE HYPERTROPHY (Bodybuilding)</option>
                  <option>TACTICAL CONDITIONING (Sleds/Turf)</option>
                  <option>COMBAT STRENGTH & GRIP</option>
                  <option>GENERAL HEALTH & SHREDDING</option>
                </select>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full mt-6 py-4 bg-[#facc15] hover:bg-[#ef4444] text-black hover:text-white font-bebas text-2xl tracking-widest uppercase clip-chamfer transition-all duration-300 flex items-center justify-center gap-2 box-glow-yellow"
              >
                <ShieldAlert className="w-5 h-5" />
                <span>GENERATE BATTLE PASS</span>
              </button>

              <div className="text-center text-[10px] font-mono text-zinc-500">
                100% Free • No Credit Card Required • Instant Activation
              </div>
            </form>
          </div>
        ) : (
          /* Confirmation Ticket Pass */
          <div className="space-y-6 text-center">
            <div className="w-16 h-16 bg-[#facc15] text-black mx-auto flex items-center justify-center clip-chamfer box-glow-yellow">
              <Ticket className="w-8 h-8" />
            </div>

            <div>
              <div className="inline-block bg-green-900/30 text-green-400 border border-green-600/40 px-3 py-1 text-xs font-mono uppercase tracking-wider mb-2">
                ✓ PASS GENERATED SUCCESSFULLY
              </div>
              <h3 className="font-bebas text-4xl text-white tracking-wider uppercase">
                WELCOME TO THE CULT, {name.toUpperCase()}
              </h3>
              <p className="text-xs font-mono text-zinc-400 mt-1">
                Your 1-Day Trial Pass is ready for presentation at the front desk.
              </p>
            </div>

            {/* Tactical Pass Card */}
            <div className="bg-[#16161c] border-2 border-dashed border-[#facc15] p-5 clip-chamfer-sm text-left space-y-3 relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                <span className="font-bebas text-xl text-[#facc15]">KRONOS BATTLE PASS</span>
                <span className="font-mono text-xs font-bold text-white bg-zinc-800 px-2 py-0.5">
                  {recruitId}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div>
                  <span className="text-zinc-500 text-[10px] block">WARRIOR</span>
                  <span className="text-zinc-200 font-semibold">{name}</span>
                </div>
                <div>
                  <span className="text-zinc-500 text-[10px] block">PHONE</span>
                  <span className="text-zinc-200 font-semibold">{phone}</span>
                </div>
                <div>
                  <span className="text-zinc-500 text-[10px] block">SLOT</span>
                  <span className="text-zinc-200">{timeSlot.split(" ")[0]}</span>
                </div>
                <div>
                  <span className="text-zinc-500 text-[10px] block">VENUE</span>
                  <span className="text-[#facc15]">270 Bhawa Nagar, Kanpur</span>
                </div>
              </div>

              {/* Barcode Graphic */}
              <div className="pt-2 flex flex-col items-center gap-1 border-t border-zinc-800">
                <div className="w-full h-8 flex items-center justify-between gap-1 px-2 opacity-80">
                  {Array.from({ length: 36 }).map((_, i) => (
                    <div
                      key={i}
                      className={`h-full ${i % 3 === 0 ? "w-1 bg-[#facc15]" : i % 2 === 0 ? "w-0.5 bg-white" : "w-1.5 bg-zinc-600"}`}
                    />
                  ))}
                </div>
                <div className="font-mono text-[9px] text-zinc-500 tracking-[0.3em]">
                  {recruitId} // PRESENT AT DESK
                </div>
              </div>
            </div>

            {/* WhatsApp Notify Button */}
            <div className="space-y-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 bg-[#25D366] hover:bg-[#20bd5a] text-black font-bebas text-xl tracking-wider uppercase clip-chamfer-sm transition-all flex items-center justify-center gap-2 font-bold"
              >
                <MessageSquare className="w-5 h-5" />
                <span>CONFIRM ON WHATSAPP (+91 95806 50262)</span>
              </a>

              <button
                onClick={handleResetAndClose}
                className="w-full py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-bebas text-lg tracking-wider uppercase clip-chamfer-sm transition-colors"
              >
                CLOSE DISPATCH
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
