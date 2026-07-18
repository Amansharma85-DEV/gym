"use client";

import React, { useState, useEffect } from "react";
import { useApp } from "@/context/AppContext";
import { motion, useScroll, useTransform } from "framer-motion";
import { Flame, Play, ChevronDown, CheckCircle } from "lucide-react";

export default function Hero({ isMobile, onScrollToSection }: { isMobile: boolean; onScrollToSection: (id: string) => void }) {
  const { setCheckoutPlan, isLoggedIn, user } = useApp();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (isMobile) return;
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 30, // Max 30px offset
        y: (e.clientY / window.innerHeight - 0.5) * 30,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isMobile]);

  const handleJoinNow = () => {
    setCheckoutPlan({ name: "VIP Premium Plan", price: 99, duration: "Month" });
  };

  if (isMobile) {
    return (
      <div className="relative py-12 flex flex-col justify-center overflow-hidden">
        {/* Animated Background Mesh */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-bg via-brand-bg to-brand-sec z-0"></div>
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/20 rounded-full blur-[100px] animate-pulse"></div>

        <div className="relative z-10 space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
            <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
            <span className="text-[10px] uppercase tracking-wider font-extrabold text-primary">TRANSFORM YOUR LIFE</span>
          </div>

          <h1 className="font-heading font-black text-4xl leading-tight uppercase text-white tracking-tight">
            Transform <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Your Body</span> <br />
            Build Your Future
          </h1>

          <p className="text-sm text-brand-text-sec leading-relaxed max-w-sm">
            Elite training programs, state-of-the-art weights, and AI trackers. Unleash your inner athlete today.
          </p>

          <div className="flex flex-col gap-3 pt-2">
            <button
              onClick={handleJoinNow}
              className="bg-primary hover:bg-accent text-black font-black text-sm py-4 rounded-xl shadow-lg neon-glow-primary tracking-wider uppercase text-center"
            >
              Start Free Trial
            </button>
            <button
              onClick={() => onScrollToSection("membership")}
              className="glass-panel text-white font-bold text-sm py-4 rounded-xl text-center border border-white/15"
            >
              Explore Plans
            </button>
          </div>

          {/* Quick Streaks view if logged in */}
          {isLoggedIn && (
            <div className="glass-panel bg-white/5 p-4 rounded-2xl border border-white/10 flex items-center justify-between mt-6">
              <div>
                <div className="text-xs text-brand-text-sec">Active Daily Streak</div>
                <div className="text-lg font-black text-white">{user.streak} Days Active</div>
              </div>
              <Flame className="w-8 h-8 text-primary animate-bounce" />
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden bg-brand-bg">
      {/* Background Graphic Grids & Glows */}
      <div className="absolute inset-0 z-0 bg-cover bg-center opacity-30" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470')" }}></div>
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-brand-bg via-brand-bg/95 to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-bg/50 to-brand-bg z-0"></div>

      {/* Floating Ambient Glow Light */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[140px] animate-pulse"></div>

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10 grid grid-cols-12 gap-8 items-center pt-16">
        
        {/* Left Side: Copy */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="col-span-7 space-y-6"
          style={{ transform: `translate3d(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px, 0)` }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full">
            <span className="w-2 h-2 rounded-full bg-brand-success pulse-indicator"></span>
            <span className="text-xs uppercase tracking-widest font-black text-primary">Luxury Fitness Club</span>
          </div>

          <h1 className="font-heading font-black text-6xl leading-[1.05] uppercase tracking-tighter text-white">
            Transform <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Your Body</span> <br />
            Build Your Future
          </h1>

          <p className="text-lg text-brand-text-sec leading-relaxed max-w-xl">
            Elite Fitness Club provides customized scientific workout metrics, certified coaches, luxury facilities, and dynamic AI-powered meal planners to supercharge your health.
          </p>

          <div className="flex items-center gap-4 pt-4">
            <button
              onClick={handleJoinNow}
              className="bg-primary hover:bg-accent text-black font-black text-base px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-primary/20 cursor-pointer uppercase tracking-wider"
            >
              Join Club Today
            </button>
            
            <button
              onClick={() => onScrollToSection("membership")}
              className="glass-panel hover:bg-white/10 text-white font-bold text-base px-8 py-4 rounded-full transition-all duration-300 cursor-pointer border border-white/10 uppercase tracking-wider"
            >
              View Membership
            </button>
          </div>
        </motion.div>

        {/* Right Side: Stats Panel */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="col-span-5 flex flex-col items-end"
          style={{ transform: `translate3d(${mousePos.x * -0.5}px, ${mousePos.y * -0.5}px, 0)` }}
        >
          <div className="glass-panel p-8 rounded-3xl border border-white/10 w-96 space-y-6 shadow-2xl relative overflow-hidden group hover:border-primary/20 transition-all duration-500">
            {/* Gloss highlight */}
            <div className="absolute -top-12 -left-12 w-24 h-24 bg-white/5 rounded-full blur-xl group-hover:bg-primary/5 transition-colors"></div>

            <div className="border-b border-white/5 pb-4">
              <div className="text-3xl font-black font-heading text-white tracking-tight flex items-baseline gap-1">
                5000<span className="text-primary">+</span>
              </div>
              <div className="text-xs font-bold text-brand-text-sec uppercase tracking-wider">Active Members</div>
            </div>

            <div className="border-b border-white/5 pb-4">
              <div className="text-3xl font-black font-heading text-white tracking-tight flex items-baseline gap-1">
                50<span className="text-primary">+</span>
              </div>
              <div className="text-xs font-bold text-brand-text-sec uppercase tracking-wider">State-of-the-Art Machines</div>
            </div>

            <div className="border-b border-white/5 pb-4">
              <div className="text-3xl font-black font-heading text-white tracking-tight flex items-baseline gap-1">
                20<span className="text-primary">+</span>
              </div>
              <div className="text-xs font-bold text-brand-text-sec uppercase tracking-wider">Professional Coaches</div>
            </div>

            <div>
              <div className="text-3xl font-black font-heading text-white tracking-tight flex items-baseline gap-1">
                10<span className="text-primary">+</span>
              </div>
              <div className="text-xs font-bold text-brand-text-sec uppercase tracking-wider">Years Elite Experience</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bouncing scroll indicator */}
      <div
        onClick={() => onScrollToSection("programs")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer flex flex-col items-center gap-1 group z-10"
      >
        <span className="text-[10px] uppercase font-bold tracking-widest text-brand-text-sec group-hover:text-primary transition-colors">Scroll to Discover</span>
        <ChevronDown className="w-5 h-5 text-brand-text-sec group-hover:text-primary animate-bounce transition-colors" />
      </div>
    </div>
  );
}
