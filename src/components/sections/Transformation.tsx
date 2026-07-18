"use client";

import React, { useState } from "react";
import { ArrowLeftRight, Sparkles } from "lucide-react";

export default function Transformation() {
  const [sliderPos, setSliderPos] = useState(50);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPos(parseInt(e.target.value));
  };

  return (
    <section id="transformation" className="py-20 bg-brand-bg relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
            <span className="text-[10px] uppercase tracking-widest font-black text-primary">REAL PROGRESS</span>
          </div>
          <h2 className="font-heading font-black text-4xl uppercase tracking-tight text-white leading-tight">
            Before & After <span className="text-primary">Transformations</span>
          </h2>
          <p className="text-xs text-brand-text-sec">
            Slide the handle to view the physical evolution of our members under our personalized diet and workout coaching plans.
          </p>
        </div>

        {/* Slider Container */}
        <div className="w-full max-w-2xl mx-auto relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl aspect-16/10 group select-none">
          {/* After Image (Base) */}
          <img
            src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1000"
            alt="After Transformation"
            className="absolute inset-0 w-full h-full object-cover"
            draggable={false}
          />
          <div className="absolute bottom-6 right-6 bg-primary text-black font-black text-xs px-4 py-2 rounded-xl uppercase tracking-wider z-20">
            After (12 Weeks)
          </div>

          {/* Before Image (Overlay Width determined by Slider Position) */}
          <div
            className="absolute inset-y-0 left-0 overflow-hidden z-10"
            style={{ width: `${sliderPos}%` }}
          >
            <img
              src="https://images.unsplash.com/photo-1507398941214-572c25f4b1dc?q=80&w=1000"
              alt="Before Transformation"
              className="absolute inset-y-0 left-0 w-full h-full object-cover max-w-none"
              style={{ width: "100%", height: "100%" }}
              draggable={false}
            />
            <div className="absolute bottom-6 left-6 bg-white/95 text-black font-black text-xs px-4 py-2 rounded-xl uppercase tracking-wider z-20">
              Before
            </div>
          </div>

          {/* Slider Line Divider */}
          <div
            className="absolute inset-y-0 z-20 w-0.5 bg-primary pointer-events-none"
            style={{ left: `${sliderPos}%` }}
          >
            {/* Handle Drag Button */}
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-primary text-black flex items-center justify-center shadow-2xl border-4 border-black">
              <ArrowLeftRight className="w-4 h-4 stroke-[3]" />
            </div>
          </div>

          {/* Transparent Input Range Overlay to capture drags */}
          <input
            type="range"
            min="0"
            max="100"
            value={sliderPos}
            onChange={handleSliderChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
          />
        </div>

        {/* Stats metrics block */}
        <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto mt-12 text-center">
          <div className="glass-panel p-4 rounded-xl border border-white/5">
            <div className="text-xl font-black text-white">-14 kg</div>
            <div className="text-[10px] text-brand-text-sec uppercase tracking-wider mt-0.5">Average Fat Loss</div>
          </div>
          <div className="glass-panel p-4 rounded-xl border border-white/5">
            <div className="text-xl font-black text-white">+8.5 kg</div>
            <div className="text-[10px] text-brand-text-sec uppercase tracking-wider mt-0.5">Lean Muscle Gained</div>
          </div>
          <div className="glass-panel p-4 rounded-xl border border-white/5">
            <div className="text-xl font-black text-white">12 Wks</div>
            <div className="text-[10px] text-brand-text-sec uppercase tracking-wider mt-0.5">Average Duration</div>
          </div>
        </div>

      </div>
    </section>
  );
}
