"use client";

import React, { useState } from "react";
import { Star, ChevronLeft, ChevronRight, MessageCircle } from "lucide-react";

export default function Testimonials() {
  const [activeIdx, setActiveIdx] = useState(0);

  const reviews = [
    {
      name: "Rohan Khanna",
      role: "Weight Loss Client",
      quote: "Elite Fitness changed my life. I lost 16kg in 3 months! The AI Diet Planner was custom fit to my work schedule, and the trainers are professional champions who keep you motivated.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200",
      rating: 5,
    },
    {
      name: "Tanya Sen",
      role: "CrossFit Athlete",
      quote: "The facility is world-class. It has premium rogue bars, biometric entries, clean lockers, and an incredible community. Viktor's CrossFit class is intense and highly scientific.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200",
      rating: 5,
    },
    {
      name: "David Miller",
      role: "Bodybuilder",
      quote: "If you are serious about bodybuilding, this is the only gym in town. Premium machines, heavy iron dumbells up to 70kg, and expert IFBB Pro advice. Marcus is an absolute beast.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200",
      rating: 5,
    },
  ];

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % reviews.length);
  };

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <section id="testimonials" className="py-20 bg-brand-bg relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
            <span className="text-[10px] uppercase tracking-widest font-black text-primary">TESTIMONIALS</span>
          </div>
          <h2 className="font-heading font-black text-4xl uppercase tracking-tight text-white leading-tight">
            Loved by Our <span className="text-primary">Athletes</span>
          </h2>
          <p className="text-xs text-brand-text-sec">
            Hear from our members who have successfully transformed their bodies and unlocked their health potential.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
          {/* Left Side: Rating Aggregate */}
          <div className="lg:col-span-4 bg-brand-sec border border-white/5 rounded-3xl p-6 text-center space-y-4">
            <div className="text-xs font-bold text-brand-text-sec uppercase tracking-wider">Google Rating</div>
            <div className="text-5xl font-black font-heading text-white">4.9</div>
            <div className="flex items-center justify-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-primary stroke-none" />
              ))}
            </div>
            <div className="text-xs text-brand-text-sec">Based on 320+ authentic reviews</div>
            
            <div className="pt-4 border-t border-white/5 flex items-center justify-center gap-2 text-xs text-primary font-bold">
              <MessageCircle className="w-4 h-4" />
              Write Review
            </div>
          </div>

          {/* Right Side: Review Slider */}
          <div className="lg:col-span-8 relative glass-panel p-6 md:p-8 rounded-3xl border border-white/10 flex flex-col justify-between lg:aspect-16/9 aspect-auto">
            <div className="space-y-6">
              {/* Stars */}
              <div className="flex gap-1">
                {[...Array(reviews[activeIdx].rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary stroke-none" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-base text-white leading-relaxed italic">
                &ldquo;{reviews[activeIdx].quote}&rdquo;
              </p>
            </div>

            {/* Profile Info */}
            <div className="flex items-center justify-between border-t border-white/5 pt-6 mt-8">
              <div className="flex items-center gap-3">
                <img
                  src={reviews[activeIdx].avatar}
                  alt={reviews[activeIdx].name}
                  className="w-12 h-12 rounded-full border border-white/10 object-cover"
                />
                <div>
                  <div className="text-sm font-bold text-white">{reviews[activeIdx].name}</div>
                  <div className="text-xs text-primary font-semibold">{reviews[activeIdx].role}</div>
                </div>
              </div>

              {/* Navigation arrows */}
              <div className="flex gap-2">
                <button
                  onClick={handlePrev}
                  className="w-9 h-9 rounded-lg bg-white/5 hover:bg-primary hover:text-black border border-white/10 hover:border-transparent flex items-center justify-center transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="w-9 h-9 rounded-lg bg-white/5 hover:bg-primary hover:text-black border border-white/10 hover:border-transparent flex items-center justify-center transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
