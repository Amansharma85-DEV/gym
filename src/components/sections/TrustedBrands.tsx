"use client";

import React from "react";
import { Dumbbell, ShieldCheck, Activity, Award, Flame } from "lucide-react";

export default function TrustedBrands() {
  const brands = [
    { name: "ROGUE ATHLETICS", icon: Dumbbell },
    { name: "NIKE PRO", icon: ShieldCheck },
    { name: "GYMSHARK ELITE", icon: Flame },
    { name: "UNDER ARMOUR", icon: Award },
    { name: "HAMMER STRENGTH", icon: Activity },
    { name: "MATRIX FITNESS", icon: Dumbbell },
  ];

  return (
    <section className="bg-brand-sec py-10 border-y border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-6">
          <p className="text-[10px] uppercase font-bold tracking-widest text-brand-text-sec">
            Equipped by the Industry Leaders
          </p>
        </div>
        
        {/* Infinite Scrolling Marquee Wrapper */}
        <div className="relative w-full flex items-center">
          <div className="flex w-full animate-marquee gap-16 whitespace-nowrap">
            {/* Render twice for continuous scrolling */}
            {[...brands, ...brands].map((brand, idx) => {
              const Icon = brand.icon;
              return (
                <div key={idx} className="flex items-center gap-2.5 text-brand-text-sec hover:text-white transition-colors">
                  <Icon className="w-5 h-5 text-primary stroke-[2]" />
                  <span className="font-heading font-black tracking-wider text-sm">{brand.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
