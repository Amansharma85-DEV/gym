"use client";

import React, { useState } from "react";
import { Dumbbell, Sparkles, TrendingUp, Flame, Heart, Activity } from "lucide-react";

export default function Programs({ isMobile }: { isMobile: boolean }) {
  const programs = [
    {
      title: "Weight Loss",
      icon: Flame,
      image: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=600",
      desc: "Torch calories, stimulate metabolic rate, and build endurance with HIIT and functional cardio.",
      color: "from-orange-500 to-red-500",
    },
    {
      title: "Muscle Gain",
      icon: Dumbbell,
      image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=600",
      desc: "Focus on hypertrophy, powerlifting, progressive overload, and form calibration under expert guidance.",
      color: "from-blue-500 to-purple-500",
    },
    {
      title: "Cardio Conditioning",
      icon: Heart,
      image: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?q=80&w=600",
      desc: "Strengthen respiratory efficiency, lower recovery times, and level up VO2 max thresholds.",
      color: "from-red-500 to-pink-500",
    },
    {
      title: "CrossFit Elite",
      icon: Activity,
      image: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=600",
      desc: "Vigorous gymnastics, weightlifting, and metabolic sprints. High-intensity routines that push limits.",
      color: "from-yellow-500 to-orange-500",
    },
    {
      title: "Mind & Yoga Flow",
      icon: Sparkles,
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=600",
      desc: "Enhance recovery capacity, mental clarity, alignment, breathing techniques, and posture flex.",
      color: "from-teal-500 to-emerald-500",
    },
    {
      title: "Functional Fitness",
      icon: TrendingUp,
      image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=600",
      desc: "Improve mobility, core stability, and balance for daily tasks or athletic execution.",
      color: "from-indigo-500 to-blue-500",
    },
  ];

  return (
    <section id="programs" className="py-20 bg-brand-sec relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
            <span className="text-[10px] uppercase tracking-widest font-black text-primary">OUR PROGRAMS</span>
          </div>
          <h2 className="font-heading font-black text-4xl uppercase tracking-tight text-white leading-tight">
            Designed for <span className="text-primary">Extreme Outcomes</span>
          </h2>
          <p className="text-xs text-brand-text-sec">
            Choose your path. Each program incorporates custom fitness trackers and professional trainer coaching templates.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((prog, idx) => {
            const Icon = prog.icon;
            return (
              <div
                key={idx}
                className="relative rounded-2xl overflow-hidden aspect-[4/3] group border border-white/5 cursor-pointer shadow-lg transition-transform duration-500 hover:scale-[1.02]"
              >
                {/* Background image */}
                <img
                  src={prog.image}
                  alt={prog.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-brand-bg/60 to-transparent transition-opacity duration-300 group-hover:opacity-90"></div>

                {/* Content Overlay */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end z-10">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-9 h-9 rounded-lg bg-primary/25 border border-primary/45 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-colors duration-300">
                      <Icon className="w-5 h-5 stroke-[2.5]" />
                    </div>
                    <h3 className="font-heading font-black text-lg text-white uppercase tracking-tight group-hover:text-primary transition-colors">
                      {prog.title}
                    </h3>
                  </div>
                  
                  <p className="text-xs text-brand-text-sec leading-relaxed opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 max-h-0 group-hover:max-h-20 overflow-hidden">
                    {prog.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
