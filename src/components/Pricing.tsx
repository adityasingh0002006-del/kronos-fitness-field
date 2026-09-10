"use client";

import React from "react";
import { Flame, Check, Shield, Zap, ArrowRight, ShieldCheck } from "lucide-react";

interface PricingProps {
  onSelectPlan: (planName: string) => void;
}

export default function Pricing({ onSelectPlan }: PricingProps) {
  const plans = [
    {
      id: "recruit",
      title: "RECRUIT TRIAL",
      price: "FREE",
      period: "1-DAY BATTLE PASS",
      subtitle: "TEST THE RAW IRON BEFORE COMMITTING",
      popular: false,
      badge: "ZERO RISK",
      features: [
        "Full access to entire barbell & dumbbell arsenal",
        "Powerlifting platform & drop zone trial",
        "Form assessment with senior strength coach",
        "No pushy sales reps — lift in peace",
      ],
      cta: "CLAIM 1-DAY PASS",
      accent: "border-zinc-800 hover:border-zinc-600",
      btnClass: "bg-[#1f2937] hover:bg-[#facc15] text-white hover:text-black",
    },
    {
      id: "titan",
      title: "TITAN PROTOCOL",
      price: "₹3,499",
      period: "3 MONTHS (QUARTERLY)",
      subtitle: "THE SWEET SPOT FOR SERIOUS HYPERTROPHY & GAINS",
      popular: true,
      badge: "MOST DEPLOYED",
      features: [
        "Unrestricted access 0500 - 2200 daily",
        "Periodized strength & powerlifting program",
        "Nutritional macronutrient blueprint for Kanpur athletes",
        "Bi-weekly body composition & 1RM tracking",
        "Complimentary locker storage access",
      ],
      cta: "ENROLL IN TITAN PROTOCOL",
      accent: "border-[#facc15] shadow-[0_0_30px_rgba(250,204,21,0.15)]",
      btnClass: "bg-[#facc15] hover:bg-[#ef4444] text-black hover:text-white box-glow-yellow",
    },
    {
      id: "cult-annual",
      title: "CULT WARRIOR",
      price: "₹10,999",
      period: "12 MONTHS (ANNUAL)",
      subtitle: "LIFELONG BROTHERHOOD OF HARDCORE IRON",
      popular: false,
      badge: "MAX VALUE",
      features: [
        "365 Days non-stop access (No blackouts)",
        "Dedicated VIP locker assignment",
        "Quarterly private masterclass with competition lifters",
        "Official KRONOS Raw Iron heavyweight tee",
        "Guest passes for 4 warrior sparring partners per year",
      ],
      cta: "BECOME A CULT WARRIOR",
      accent: "border-zinc-800 hover:border-[#ef4444]",
      btnClass: "bg-[#18181f] hover:bg-[#ef4444] text-[#f3f4f6] hover:text-white border border-zinc-700",
    },
  ];

  return (
    <section id="membership" className="py-20 lg:py-28 bg-[#0d0d11] relative overflow-hidden border-t-2 border-zinc-800">
      {/* Background Grids & Glow */}
      <div className="absolute inset-0 bg-tactical-grid opacity-20 pointer-events-none" />
      <div className="absolute top-1/3 -left-32 w-80 h-80 bg-[#facc15]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#18181f] border border-zinc-700 text-xs font-mono text-[#facc15] tracking-widest uppercase mb-3">
            <Shield className="w-3.5 h-3.5 text-[#ef4444]" />
            <span>COMMITTED ENLISTMENT // NO CONTRACT TRAPS</span>
          </div>
          <h2 className="font-bebas text-5xl sm:text-6xl md:text-7xl tracking-tight uppercase text-white leading-none">
            CHOOSE YOUR <span className="text-[#facc15]">ENLISTMENT</span>
          </h2>
          <p className="text-zinc-400 font-body text-sm sm:text-base mt-2">
            Honest, straightforward pricing. No hidden maintenance charges, no sign-up penalties.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-[#131317] border-2 ${plan.accent} p-6 sm:p-8 clip-chamfer flex flex-col justify-between transition-all duration-300 ${
                plan.popular ? "md:-translate-y-3 bg-[#16161c]" : "hover:-translate-y-1"
              }`}
            >
              {/* Popular Flag */}
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#facc15] text-black font-bebas text-sm tracking-widest px-4 py-0.5 clip-chamfer-sm uppercase font-bold flex items-center gap-1.5 shadow-md">
                  <Flame className="w-3.5 h-3.5 fill-black" />
                  <span>WARRIOR CHOICE</span>
                </div>
              )}

              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono tracking-widest text-[#9ca3af] uppercase">
                    {plan.badge}
                  </span>
                  <ShieldCheck className={`w-5 h-5 ${plan.popular ? "text-[#facc15]" : "text-zinc-600"}`} />
                </div>

                <h3 className="font-bebas text-3xl sm:text-4xl text-white tracking-wider uppercase mb-1">
                  {plan.title}
                </h3>
                <p className="text-xs font-mono text-zinc-400 tracking-tight mb-6">
                  {plan.subtitle}
                </p>

                {/* Price Display */}
                <div className="bg-[#0b0b0e] p-4 border border-zinc-800 clip-chamfer-sm mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="font-bebas text-5xl sm:text-6xl text-[#facc15] tracking-tight leading-none">
                      {plan.price}
                    </span>
                    <span className="text-xs font-mono text-zinc-400 uppercase">
                      / {plan.period}
                    </span>
                  </div>
                  <div className="text-[10px] font-mono text-zinc-500 mt-1">
                    GST & Facilities Access Included
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-3 mb-8">
                  {plan.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                      <Check className="w-4 h-4 text-[#facc15] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onSelectPlan(plan.title)}
                className={`w-full py-4 font-bebas text-xl tracking-wider uppercase clip-chamfer-sm transition-all duration-300 flex items-center justify-center gap-2 ${plan.btnClass}`}
              >
                <span>{plan.cta}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Guarantee Banner */}
        <div className="mt-14 p-6 bg-[#111115] border border-zinc-800 clip-chamfer flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#1e1e24] text-[#facc15] flex items-center justify-center shrink-0 clip-chamfer-sm">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <div className="font-bebas text-2xl text-white tracking-wider">
                100% UNCOMPROMISED DISCIPLINE GUARANTEE
              </div>
              <p className="text-xs text-zinc-400 font-mono">
                Not sure yet? Step inside for a full workout on us. If the iron doesn&apos;t move you, walk away with zero obligations.
              </p>
            </div>
          </div>
          <button
            onClick={() => onSelectPlan("Free 1-Day Trial")}
            className="px-6 py-2.5 bg-zinc-800 hover:bg-[#facc15] text-white hover:text-black font-bebas text-lg tracking-wider transition-colors clip-chamfer-sm shrink-0 border border-zinc-700"
          >
            CLAIM FREE PASS
          </button>
        </div>
      </div>
    </section>
  );
}
