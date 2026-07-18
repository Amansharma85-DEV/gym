"use client";

import React from "react";
import { ShieldAlert, Award, Clock, HeartHandshake, CheckCircle2 } from "lucide-react";

export default function About({ isMobile }: { isMobile: boolean }) {
  const highlights = [
    {
      icon: Award,
      title: "Certified Coaches",
      desc: "Our trainers are IFBB Pro, NASM, and ACSM accredited experts specializing in premium body sculpting.",
    },
    {
      icon: Clock,
      title: "24/7 Executive Access",
      desc: "Train on your schedule. Biometric scanner entries unlock luxury lockers and weights day or night.",
    },
    {
      icon: HeartHandshake,
      title: "Bespoke Training Programs",
      desc: "No cookie-cutter routines. We construct custom biomechanical routines paired with medical diet tracking.",
    },
  ];

  return (
    <section id="about" className="py-20 bg-brand-bg relative">
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Side: Images & Parallax Art */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/5 aspect-4/3 group">
              <img
                src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1470"
                alt="Elite Gym Workout"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              
              {/* Overlapping Badge */}
              <div className="absolute bottom-6 left-6 glass-panel p-4 rounded-2xl flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center font-heading font-black text-black text-xl">
                  10+
                </div>
                <div>
                  <div className="text-sm font-bold text-white">Years of Elite Coaching</div>
                  <div className="text-[11px] text-brand-text-sec">Proven results since 2016</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Copy & Benefits */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
              <span className="text-[10px] uppercase tracking-widest font-black text-primary">WHO WE ARE</span>
            </div>
            
            <h2 className="font-heading font-black text-4xl uppercase tracking-tight text-white leading-tight">
              A New Standard <br />
              Of <span className="text-primary">Fitness Excellence</span>
            </h2>

            <p className="text-sm text-brand-text-sec leading-relaxed">
              At Elite Fitness Club, we believe that fitness is a lifetime dedication. We offer a high-performance environment designed for individuals demanding the absolute best. Our modern space is fitted with premium equipment, biometric scanners, and medical-grade recovery facilities.
            </p>

            <div className="space-y-4 pt-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary stroke-[2.5] mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-white">Biometric Safety & Privacy</h4>
                  <p className="text-xs text-brand-text-sec mt-0.5">Secure, state-of-the-art facilities restricted to registered members.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary stroke-[2.5] mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-white">Advanced Medical Health Analysis</h4>
                  <p className="text-xs text-brand-text-sec mt-0.5">Bi-weekly body fat logs, hydration checks, and target calibration metrics.</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Why Choose Us Highlight Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="glass-panel p-6 rounded-2xl border border-white/5 hover:border-primary/20 transition-all duration-300 hover:translate-y-[-4px] group"
              >
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-black transition-colors duration-300">
                  <Icon className="w-6 h-6 stroke-[2]" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">{item.title}</h3>
                <p className="text-xs text-brand-text-sec leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
