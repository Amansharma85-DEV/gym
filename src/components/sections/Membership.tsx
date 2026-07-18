"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { Check, X, ShieldAlert, Sparkles, Percent } from "lucide-react";

export default function Membership() {
  const { setCheckoutPlan } = useApp();
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annually">("monthly");

  const plans = [
    {
      name: "Monthly Elite Plan",
      price: 1499,
      duration: "Month",
      features: [
        "Full gym access 24/7",
        "Modern weightlifting floor access",
        "Locker and shower access",
        "Free Wi-Fi & Lounge access",
        "Basic BMI and Calorie calculations",
      ],
      missing: [
        "1-on-1 Personal Trainer sessions",
        "AI customized diet & workout planners",
        "Group classes registration",
        "Admin check-in dashboard analysis",
      ],
      popular: false,
    },
    {
      name: "Yearly Pro Plan",
      price: 14999,
      duration: "Year",
      features: [
        "Full gym access 24/7",
        "Modern weightlifting floor access",
        "Locker and shower access",
        "Free Wi-Fi & Lounge access",
        "AI customized diet & workout planners",
        "Group classes registration",
        "10% Discount on all trainer bookings",
      ],
      missing: [
        "Unlimited 1-on-1 personal training",
        "VIP Lounge access with protein bar perks",
      ],
      popular: true,
    },
    {
      name: "VIP Premium Plan",
      price: 5999,
      duration: "Month",
      features: [
        "Full gym access 24/7",
        "Modern weightlifting floor access",
        "Locker and shower access",
        "Free Wi-Fi & Lounge access",
        "AI customized diet & workout planners",
        "Unlimited group classes registration",
        "4x Monthly 1-on-1 Trainer check-ins",
        "VIP Lounge with free protein shakes",
        "Priority support & settings check-ins",
      ],
      missing: [],
      popular: false,
    },
  ];

  const handleSelectPlan = (name: string, price: number, duration: string) => {
    setCheckoutPlan({ name, price, duration });
  };

  return (
    <section id="membership" className="py-20 bg-brand-sec relative">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[130px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
            <span className="text-[10px] uppercase tracking-widest font-black text-primary">MEMBERSHIPS</span>
          </div>
          <h2 className="font-heading font-black text-4xl uppercase tracking-tight text-white leading-tight">
            Flexible Plans, <span className="text-primary">No Surprises</span>
          </h2>
          <p className="text-xs text-brand-text-sec">
            Elevate your body and health with curated options. Apply coupons at checkout for up to 50% discount savings.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-20">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`glass-panel rounded-3xl p-8 border flex flex-col justify-between relative transition-all duration-300 hover:scale-[1.02] ${
                plan.popular
                  ? "border-primary/40 bg-brand-bg/60 shadow-xl shadow-primary/5"
                  : "border-white/5"
              }`}
            >
              {plan.popular && (
                <span className="absolute top-0 right-8 -translate-y-1/2 bg-primary text-black font-black text-[10px] uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
                  Most Popular
                </span>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-black font-heading text-white uppercase tracking-tight">{plan.name}</h3>
                  <div className="flex items-baseline gap-1 mt-4">
                    <span className="text-4xl font-black font-heading text-white">₹{plan.price.toLocaleString("en-IN")}</span>
                    <span className="text-xs text-brand-text-sec">/ {plan.duration}</span>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-3.5 pt-6 border-t border-white/5">
                  {plan.features.map((feat, fidx) => (
                    <li key={fidx} className="flex items-start gap-2.5 text-xs text-white">
                      <Check className="w-4.5 h-4.5 text-brand-success stroke-[2.5] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                  {plan.missing.map((miss, midx) => (
                    <li key={midx} className="flex items-start gap-2.5 text-xs text-brand-text-sec/60">
                      <X className="w-4.5 h-4.5 text-white/20 stroke-[2] shrink-0 mt-0.5" />
                      <span>{miss}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action CTA */}
              <button
                onClick={() => handleSelectPlan(plan.name, plan.price, plan.duration)}
                className={`w-full font-black text-xs py-4 rounded-2xl tracking-wider uppercase transition-all duration-300 mt-8 cursor-pointer ${
                  plan.popular
                    ? "bg-primary text-black hover:bg-accent neon-glow-primary"
                    : "bg-white text-black hover:bg-primary"
                }`}
              >
                Join Now
              </button>
            </div>
          ))}
        </div>

        {/* Gym Rules Callout */}
        <div className="glass-panel p-6 rounded-2xl border border-white/5 flex flex-col md:flex-row items-center gap-4 justify-between max-w-4xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center shrink-0">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-tight">Our Zero-Tolerance Gym Rules</h4>
              <p className="text-xs text-brand-text-sec mt-0.5">Please re-rack weights, bring clean gym towels, and respect fellow athletes at all times.</p>
            </div>
          </div>
          <div className="text-xs font-bold text-primary whitespace-nowrap">
            Read Rules Handbook →
          </div>
        </div>

      </div>
    </section>
  );
}
