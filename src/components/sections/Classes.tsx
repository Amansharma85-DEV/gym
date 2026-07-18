"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { Clock, User, Armchair, CheckCircle, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";

export default function Classes({ isMobile }: { isMobile: boolean }) {
  const { classes, bookClass, classBookings, isLoggedIn } = useApp();
  const [selectedFilter, setSelectedFilter] = useState<"All" | "CrossFit" | "Yoga" | "Strength" | "HIIT">("All");

  const categories: ("All" | "CrossFit" | "Yoga" | "Strength" | "HIIT")[] = [
    "All", "CrossFit", "Yoga", "Strength", "HIIT"
  ];

  const filteredClasses = selectedFilter === "All"
    ? classes
    : classes.filter(c => c.category === selectedFilter);

  const handleBook = (classId: string, name: string) => {
    if (!isLoggedIn) {
      alert("Please sign in at the top right to book gym classes!");
      return;
    }

    const success = bookClass(classId);
    if (success) {
      // Confetti burst for class booking success
      confetti({
        particleCount: 50,
        spread: 40,
        origin: { y: 0.8 }
      });
    }
  };

  const isClassBooked = (classId: string) => {
    return classBookings.some(b => b.classId === classId && b.status === "active");
  };

  return (
    <section id="classes" className="py-20 bg-brand-sec relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
            <span className="text-[10px] uppercase tracking-widest font-black text-primary">DAILY TIMETABLE</span>
          </div>
          <h2 className="font-heading font-black text-4xl uppercase tracking-tight text-white leading-tight">
            Today&apos;s Class <span className="text-primary">Schedule</span>
          </h2>
          <p className="text-xs text-brand-text-sec">
            Reserve your slot for our daily group energy sessions. High intensity workouts, dynamic structures, maximum push.
          </p>
        </div>

        {/* Categories Tabs Filter */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              className={`px-5 py-2.5 rounded-full font-bold text-xs cursor-pointer transition-all border ${
                selectedFilter === cat
                  ? "bg-primary border-transparent text-black neon-glow-primary"
                  : "glass-panel text-brand-text-sec border-white/10 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Classes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredClasses.map((item) => {
            const booked = isClassBooked(item.id);
            return (
              <div
                key={item.id}
                className="glass-panel p-6 rounded-2xl border border-white/5 hover:border-primary/20 transition-all duration-300 flex flex-col justify-between gap-6"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[9px] uppercase font-extrabold px-2 py-0.5 bg-primary/10 border border-primary/20 rounded-md text-primary tracking-wider">
                      {item.category}
                    </span>
                    <h3 className="text-xl font-heading font-black text-white uppercase tracking-tight mt-2.5">
                      {item.name}
                    </h3>
                  </div>

                  <div className="text-right">
                    <div className="text-xs text-brand-text-sec flex items-center justify-end gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-primary" />
                      {item.time.split(" - ")[0]}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-white/5 pt-4">
                  <div className="flex flex-wrap items-center gap-4">
                    {/* Trainer name */}
                    <div className="flex items-center gap-1.5 text-xs text-brand-text-sec">
                      <User className="w-4 h-4 text-primary" />
                      <span>{item.trainer}</span>
                    </div>

                    {/* Seats indicator */}
                    <div className="flex items-center gap-1.5 text-xs text-brand-text-sec">
                      <Armchair className="w-4 h-4 text-primary" />
                      <span className={item.seatsLeft <= 5 ? "text-red-400 font-bold" : "text-white"}>
                        {item.seatsLeft} / {item.seatsTotal} Seats Left
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleBook(item.id, item.name)}
                    disabled={booked || item.seatsLeft <= 0}
                    className={`w-full sm:w-auto justify-center font-bold text-xs px-5 py-2.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                      booked
                        ? "bg-brand-success/15 border border-brand-success/35 text-brand-success"
                        : item.seatsLeft <= 0
                        ? "bg-white/5 border border-white/10 text-white/40 cursor-not-allowed"
                        : "bg-white text-black hover:bg-primary hover:text-black transition-colors"
                    }`}
                  >
                    {booked ? (
                      <>
                        <CheckCircle className="w-4 h-4" /> Booked
                      </>
                    ) : item.seatsLeft <= 0 ? (
                      "Full House"
                    ) : (
                      "Book Class"
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
