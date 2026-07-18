"use client";

import React, { useState } from "react";
import { Calculator, Flame, GlassWater, Activity, Check } from "lucide-react";

export default function Calculators() {
  const [activeTab, setActiveTab] = useState<"bmi" | "bodyfat" | "calories">("bmi");

  // BMI States
  const [bmiWeight, setBmiWeight] = useState(80);
  const [bmiHeight, setBmiHeight] = useState(180);

  // Body Fat States
  const [bfGender, setBfGender] = useState<"male" | "female">("male");
  const [bfHeight, setBfHeight] = useState(180);
  const [bfWaist, setBfWaist] = useState(90);
  const [bfNeck, setBfNeck] = useState(40);

  // Calorie States
  const [calWeight, setCalWeight] = useState(80);
  const [calGoal, setCalGoal] = useState<"loss" | "maintain" | "gain">("maintain");
  const [calActivity, setCalActivity] = useState<"sedentary" | "moderate" | "active">("moderate");

  // Calculations
  // 1. BMI
  const calculateBMI = () => {
    const heightInMeters = bmiHeight / 100;
    const bmi = bmiWeight / (heightInMeters * heightInMeters);
    return parseFloat(bmi.toFixed(1));
  };

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { label: "Underweight", color: "text-blue-400" };
    if (bmi < 25) return { label: "Normal Weight", color: "text-brand-success" };
    if (bmi < 30) return { label: "Overweight", color: "text-yellow-400" };
    return { label: "Obese", color: "text-red-400" };
  };

  // 2. Body Fat (US Navy formula simplification)
  const calculateBodyFat = () => {
    let bf = 0;
    if (bfGender === "male") {
      // US Navy formula log10: 86.010*log10(waist-neck) - 70.041*log10(height) + 36.76
      const diff = bfWaist - bfNeck;
      if (diff > 0) {
        bf = 86.01 * Math.log10(diff) - 70.041 * Math.log10(bfHeight) + 36.76;
      }
    } else {
      // Female: 163.205*log10(waist+hip-neck) - 97.684*log10(height) - 78.387 (Simulated without hips as waist estimation)
      const diff = bfWaist + 15 - bfNeck; // dummy hip adjustment
      if (diff > 0) {
        bf = 163.205 * Math.log10(diff) - 97.684 * Math.log10(bfHeight) - 78.387;
      }
    }
    return Math.max(3, parseFloat(bf.toFixed(1)));
  };

  // 3. Daily Calories & Macros
  const calculateCalories = () => {
    // Basic BMR estimation: 10 * weight + 6.25 * height - 5 * age + s (Mifflin St Jeor)
    const baseBMR = 10 * calWeight + 6.25 * 180 - 5 * 25 + 5;
    let multiplier = 1.2;
    if (calActivity === "moderate") multiplier = 1.55;
    if (calActivity === "active") multiplier = 1.725;

    let calories = baseBMR * multiplier;
    if (calGoal === "loss") calories -= 500;
    if (calGoal === "gain") calories += 500;

    const finalCalories = Math.round(calories);
    const protein = Math.round(calWeight * (calGoal === "gain" ? 2.2 : 1.8)); // 1.8g - 2.2g per kg
    const water = Math.round(calWeight * 35); // 35ml per kg

    return { calories: finalCalories, protein, water };
  };

  const bmi = calculateBMI();
  const bmiCat = getBMICategory(bmi);
  const bodyFat = calculateBodyFat();
  const calResults = calculateCalories();

  return (
    <section id="calculators" className="py-20 bg-brand-bg relative">
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
            <span className="text-[10px] uppercase tracking-widest font-black text-primary">SCIENTIFIC TRACKERS</span>
          </div>
          <h2 className="font-heading font-black text-4xl uppercase tracking-tight text-white leading-tight">
            Fitness & Body <span className="text-primary">Calculators</span>
          </h2>
          <p className="text-xs text-brand-text-sec">
            Calibrate your nutrition, muscle weight, and target milestones using real-time biological estimators.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="grid grid-cols-3 gap-2 max-w-xl mx-auto mb-12 bg-white/5 p-1 rounded-xl border border-white/5">
          <button
            onClick={() => setActiveTab("bmi")}
            className={`py-3 rounded-lg text-xs font-bold text-center cursor-pointer transition-all ${
              activeTab === "bmi" ? "bg-primary text-black neon-glow-primary" : "text-brand-text-sec hover:text-white"
            }`}
          >
            BMI Index
          </button>
          <button
            onClick={() => setActiveTab("bodyfat")}
            className={`py-3 rounded-lg text-xs font-bold text-center cursor-pointer transition-all ${
              activeTab === "bodyfat" ? "bg-primary text-black neon-glow-primary" : "text-brand-text-sec hover:text-white"
            }`}
          >
            Body Fat %
          </button>
          <button
            onClick={() => setActiveTab("calories")}
            className={`py-3 rounded-lg text-xs font-bold text-center cursor-pointer transition-all ${
              activeTab === "calories" ? "bg-primary text-black neon-glow-primary" : "text-brand-text-sec hover:text-white"
            }`}
          >
            Calories & Macros
          </button>
        </div>

        {/* Calculator Body */}
        <div className="max-w-3xl mx-auto glass-panel p-5 md:p-8 rounded-3xl border border-white/10 shadow-2xl">
          {activeTab === "bmi" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Inputs */}
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-xs font-bold text-brand-text-sec mb-2">
                    <span>WEIGHT (KG)</span>
                    <span className="text-primary">{bmiWeight} kg</span>
                  </div>
                  <input
                    type="range"
                    min="40"
                    max="180"
                    value={bmiWeight}
                    onChange={(e) => setBmiWeight(parseInt(e.target.value))}
                    className="w-full h-1 bg-white/10 accent-primary rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-xs font-bold text-brand-text-sec mb-2">
                    <span>HEIGHT (CM)</span>
                    <span className="text-primary">{bmiHeight} cm</span>
                  </div>
                  <input
                    type="range"
                    min="120"
                    max="220"
                    value={bmiHeight}
                    onChange={(e) => setBmiHeight(parseInt(e.target.value))}
                    className="w-full h-1 bg-white/10 accent-primary rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
              
              {/* Output */}
              <div className="bg-black/35 p-6 rounded-2xl border border-white/5 text-center space-y-3">
                <div className="text-sm font-bold text-brand-text-sec uppercase tracking-wider">Your Body Mass Index</div>
                <div className="text-5xl font-black font-heading text-white">{bmi}</div>
                <div className={`text-sm font-black uppercase ${bmiCat.color}`}>{bmiCat.label}</div>
                <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden mt-4">
                  {/* Visual gauge */}
                  <div
                    className="h-full bg-gradient-to-r from-primary to-accent"
                    style={{ width: `${Math.min(100, (bmi / 40) * 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "bodyfat" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Inputs */}
              <div className="space-y-5">
                <div className="flex gap-4">
                  <button
                    onClick={() => setBfGender("male")}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold border ${
                      bfGender === "male" ? "bg-white text-black border-transparent" : "glass-panel text-brand-text-sec border-white/10"
                    }`}
                  >
                    Male
                  </button>
                  <button
                    onClick={() => setBfGender("female")}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold border ${
                      bfGender === "female" ? "bg-white text-black border-transparent" : "glass-panel text-brand-text-sec border-white/10"
                    }`}
                  >
                    Female
                  </button>
                </div>
                <div>
                  <div className="flex justify-between text-xs font-bold text-brand-text-sec mb-1">
                    <span>HEIGHT: {bfHeight} cm</span>
                  </div>
                  <input
                    type="range"
                    min="130"
                    max="220"
                    value={bfHeight}
                    onChange={(e) => setBfHeight(parseInt(e.target.value))}
                    className="w-full h-1 bg-white/10 accent-primary rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-xs font-bold text-brand-text-sec mb-1">
                    <span>WAIST: {bfWaist} cm</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="150"
                    value={bfWaist}
                    onChange={(e) => setBfWaist(parseInt(e.target.value))}
                    className="w-full h-1 bg-white/10 accent-primary rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-xs font-bold text-brand-text-sec mb-1">
                    <span>NECK: {bfNeck} cm</span>
                  </div>
                  <input
                    type="range"
                    min="25"
                    max="60"
                    value={bfNeck}
                    onChange={(e) => setBfNeck(parseInt(e.target.value))}
                    className="w-full h-1 bg-white/10 accent-primary rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
              
              {/* Output */}
              <div className="bg-black/35 p-6 rounded-2xl border border-white/5 text-center space-y-4">
                <div className="text-sm font-bold text-brand-text-sec uppercase tracking-wider">Estimated Body Fat</div>
                <div className="text-5xl font-black font-heading text-white">{bodyFat}%</div>
                <div className="text-xs text-brand-text-sec leading-relaxed">
                  Estimated using standard neck, waist, and height ratios. Target healthy range is 10-18% for males, 18-25% for females.
                </div>
              </div>
            </div>
          )}

          {activeTab === "calories" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Inputs */}
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-bold text-brand-text-sec mb-1">
                    <span>CURRENT WEIGHT: {calWeight} kg</span>
                  </div>
                  <input
                    type="range"
                    min="40"
                    max="150"
                    value={calWeight}
                    onChange={(e) => setCalWeight(parseInt(e.target.value))}
                    className="w-full h-1 bg-white/10 accent-primary rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-text-sec mb-1">Your Fitness Goal</label>
                  <select
                    value={calGoal}
                    onChange={(e) => setCalGoal(e.target.value as any)}
                    className="w-full bg-brand-sec border border-white/10 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary text-white"
                  >
                    <option value="loss">Weight Loss (-500 kcal)</option>
                    <option value="maintain">Maintain Current Weight</option>
                    <option value="gain">Build Muscle (+500 kcal)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-text-sec mb-1">Weekly Activity Level</label>
                  <select
                    value={calActivity}
                    onChange={(e) => setCalActivity(e.target.value as any)}
                    className="w-full bg-brand-sec border border-white/10 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary text-white"
                  >
                    <option value="sedentary">Sedentary (Little/no workout)</option>
                    <option value="moderate">Moderate Training (3-4 days/week)</option>
                    <option value="active">High-End Conditioning (6+ days/week)</option>
                  </select>
                </div>
              </div>
              
              {/* Outputs */}
              <div className="bg-black/35 p-6 rounded-2xl border border-white/5 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-primary text-center">Daily Target Metrics</h4>
                
                <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl">
                  <Flame className="w-5 h-5 text-primary shrink-0" />
                  <div>
                    <div className="text-[10px] text-brand-text-sec uppercase font-bold tracking-wider">Calories Required</div>
                    <div className="text-base font-black text-white">{calResults.calories} kcal</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl">
                  <Activity className="w-5 h-5 text-primary shrink-0" />
                  <div>
                    <div className="text-[10px] text-brand-text-sec uppercase font-bold tracking-wider">Protein Target</div>
                    <div className="text-base font-black text-white">{calResults.protein} g</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl">
                  <GlassWater className="w-5 h-5 text-primary shrink-0" />
                  <div>
                    <div className="text-[10px] text-brand-text-sec uppercase font-bold tracking-wider">Water Intake</div>
                    <div className="text-base font-black text-white">{calResults.water} ml</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
