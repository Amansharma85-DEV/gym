"use client";

import React, { useState } from "react";
import { ChevronDown, Plus, Minus } from "lucide-react";

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const faqs = [
    {
      q: "What are the club operating hours?",
      a: "Our gym floor is accessible 24/7 for active members via secure biometric gates. Reception and trainer bookings operate from 06:00 AM to 10:00 PM on weekdays, and 08:00 AM to 08:00 PM on weekends.",
    },
    {
      q: "Are personal trainer bookings included in my subscription?",
      a: "Yearly Pro and VIP plans include initial check-ins and AI planning logs. Personalized 1-on-1 private trainer coaching hours can be booked separately through the trainer calendar widget in the app.",
    },
    {
      q: "Can I freeze or pause my membership?",
      a: "Yes. Yearly Pro and VIP members can pause their memberships for up to 30 days per calendar year directly from their dashboard settings tab, free of charge.",
    },
    {
      q: "Do you offer guest passes or trial sessions?",
      a: "Yes, you can register for a complimentary 1-day executive trial pass by clicking 'Start Free Trial' or visiting our reception desk. Proof of ID is required.",
    },
    {
      q: "Is there secure valet parking available?",
      a: "Yes, Elite Fitness Club features private underground valet parking. It is complimentary for VIP members and available at standard parking rates for Monthly members.",
    },
  ];

  const handleToggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 bg-brand-sec relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
            <span className="text-[10px] uppercase tracking-widest font-black text-primary">COMMON QUESTIONS</span>
          </div>
          <h2 className="font-heading font-black text-4xl uppercase tracking-tight text-white leading-tight">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
          <p className="text-xs text-brand-text-sec">
            Have questions about registrations, personal coaches, parking rates, or trial schedules? Find fast answers here.
          </p>
        </div>

        {/* Accordions */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="glass-panel rounded-2xl border border-white/5 overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => handleToggle(idx)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between font-bold text-white hover:text-primary transition-colors cursor-pointer"
                >
                  <span className="text-sm md:text-base">{faq.q}</span>
                  {isOpen ? (
                    <Minus className="w-4 h-4 text-primary shrink-0" />
                  ) : (
                    <Plus className="w-4 h-4 text-brand-text-sec shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 text-xs md:text-sm text-brand-text-sec leading-relaxed border-t border-white/5 pt-3 animate-in fade-in slide-in-from-top-1 duration-250">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
