"use client";

import React, { useState, useEffect } from "react";
import { useApp } from "@/context/AppContext";
import {
  Flame, GlassWater, Footprints, Clock, Sparkles, Plus, RefreshCw,
  Play, Pause, RotateCcw, Dumbbell, Calendar, Apple, CheckCircle2,
  Trash2, QrCode, Loader2
} from "lucide-react";

export default function Dashboard({ isMobile }: { isMobile: boolean }) {
  const {
    user, addWeightLog, addWater, resetWater, addSteps,
    classBookings, cancelClass, trainerBookings, cancelTrainer,
    weightHistory, generateAIWorkout, generateAIDiet, aiWorkoutPlan, aiDietPlan
  } = useApp();

  const [weightInput, setWeightInput] = useState("");
  const [stepInput, setStepInput] = useState("");

  // AI Workout States
  const [workoutGoal, setWorkoutGoal] = useState("Muscle Gain");
  const [workoutLevel, setWorkoutLevel] = useState("Intermediate");
  const [workoutEquip, setWorkoutEquip] = useState("Full Gym");
  const [isGeneratingWorkout, setIsGeneratingWorkout] = useState(false);

  // AI Diet States
  const [dietGoal, setDietGoal] = useState("Muscle Gain");
  const [dietType, setDietType] = useState("High Protein");
  const [dietCals, setDietCals] = useState(2500);
  const [isGeneratingDiet, setIsGeneratingDiet] = useState(false);

  // Live Timer States
  const [timerMode, setTimerMode] = useState<"warmup" | "work" | "rest">("work");
  const [timeLeft, setTimeLeft] = useState(40); // 40s work
  const [timerActive, setTimerActive] = useState(false);
  const [completedCycles, setCompletedCycles] = useState(0);

  // Attendance Heatmap simulation: last 28 days (4 weeks x 7 days)
  const [heatmapData, setHeatmapData] = useState<boolean[]>([]);
  useEffect(() => {
    // Generate static list of true/false checks
    const data = [
      true, true, false, true, true, false, true,
      true, false, true, true, true, false, false,
      true, true, false, true, true, false, true,
      true, true, true, false, true, true, false
    ];
    setHeatmapData(data);
  }, []);

  // Interval timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timerActive && timeLeft === 0) {
      // Cycle transition
      if (timerMode === "work") {
        setTimerMode("rest");
        setTimeLeft(20); // 20s rest
        setCompletedCycles((c) => c + 1);
      } else if (timerMode === "rest") {
        setTimerMode("work");
        setTimeLeft(40); // 40s work
      } else {
        setTimerMode("work");
        setTimeLeft(40);
      }
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerActive, timeLeft, timerMode]);

  const handleAddWeight = (e: React.FormEvent) => {
    e.preventDefault();
    const weight = parseFloat(weightInput);
    if (!isNaN(weight) && weight > 30 && weight < 250) {
      addWeightLog(weight);
      setWeightInput("");
    }
  };

  const handleAddSteps = (e: React.FormEvent) => {
    e.preventDefault();
    const steps = parseInt(stepInput);
    if (!isNaN(steps) && steps > 0) {
      addSteps(steps);
      setStepInput("");
    }
  };

  const handleGenerateWorkout = () => {
    setIsGeneratingWorkout(true);
    setTimeout(() => {
      generateAIWorkout(workoutGoal, workoutLevel, workoutEquip);
      setIsGeneratingWorkout(false);
    }, 2000);
  };

  const handleGenerateDiet = () => {
    setIsGeneratingDiet(true);
    setTimeout(() => {
      generateAIDiet(dietGoal, dietType, dietCals);
      setIsGeneratingDiet(false);
    }, 2000);
  };

  const getSvgCoordinates = () => {
    if (weightHistory.length === 0) return "";
    if (weightHistory.length === 1) {
      return `250,75`; // single point in center
    }
    const width = 500;
    const height = 150;
    const padding = 20;

    const weights = weightHistory.map(w => w.weight);
    const minWeight = Math.min(...weights) - 1;
    const maxWeight = Math.max(...weights) + 1;
    const weightRange = maxWeight - minWeight;

    const points = weightHistory.map((item, idx) => {
      const x = padding + (idx / (weightHistory.length - 1)) * (width - padding * 2);
      const y = height - padding - ((item.weight - minWeight) / weightRange) * (height - padding * 2);
      return `${x},${y}`;
    });

    return points.join(" ");
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-2 md:px-6 space-y-8">
      
      {/* Upper overview section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* User Card */}
        <div className="glass-panel p-6 rounded-3xl border border-white/10 bg-brand-sec/80 flex flex-col justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center font-heading font-black text-black text-2xl">
              {user.name.split(" ").map(n => n[0]).join("")}
            </div>
            <div>
              <h3 className="text-lg font-black text-white">{user.name}</h3>
              <p className="text-xs text-brand-text-sec">{user.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/5">
            <div>
              <div className="text-[10px] text-brand-text-sec uppercase font-bold tracking-wider">Membership Status</div>
              <div className="text-sm font-black text-primary mt-0.5">{user.membership}</div>
            </div>
            <div>
              <div className="text-[10px] text-brand-text-sec uppercase font-bold tracking-wider">Expiry Date</div>
              <div className="text-xs text-white font-bold mt-1">{user.membershipExpiry}</div>
            </div>
          </div>
        </div>

        {/* Dynamic Water & Streak Metrics */}
        <div className="grid grid-cols-2 gap-4">
          
          {/* Water Log */}
          <div className="glass-panel p-5 rounded-2xl border border-white/5 bg-brand-sec/40 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <GlassWater className="w-8 h-8 text-primary animate-pulse" />
              <button onClick={resetWater} className="p-1 hover:text-white text-brand-text-sec">
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>
            <div>
              <div className="text-[10px] text-brand-text-sec uppercase font-bold">Water Tracker</div>
              <div className="text-lg font-black text-white mt-0.5">{user.waterCurrent} / {user.waterGoal} ml</div>
              
              <div className="flex gap-1.5 mt-3">
                <button
                  onClick={() => addWater(250)}
                  className="flex-1 bg-white/5 hover:bg-primary hover:text-black border border-white/10 hover:border-transparent text-[10px] font-bold py-1.5 rounded-lg transition-colors cursor-pointer"
                >
                  +250ml
                </button>
                <button
                  onClick={() => addWater(500)}
                  className="flex-1 bg-white/5 hover:bg-primary hover:text-black border border-white/10 hover:border-transparent text-[10px] font-bold py-1.5 rounded-lg transition-colors cursor-pointer"
                >
                  +500ml
                </button>
              </div>
            </div>
          </div>

          {/* Steps Log */}
          <div className="glass-panel p-5 rounded-2xl border border-white/5 bg-brand-sec/40 flex flex-col justify-between">
            <Footprints className="w-8 h-8 text-primary" />
            <div>
              <div className="text-[10px] text-brand-text-sec uppercase font-bold">Step Tracker</div>
              <div className="text-lg font-black text-white mt-0.5">{user.stepCurrent} / {user.stepGoal}</div>
              
              <form onSubmit={handleAddSteps} className="flex gap-2 mt-3">
                <input
                  type="number"
                  required
                  placeholder="Steps..."
                  value={stepInput}
                  onChange={(e) => setStepInput(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-xs focus:outline-none focus:border-primary text-white"
                />
                <button
                  type="submit"
                  className="bg-primary hover:bg-accent text-black font-bold px-2 py-1 rounded-lg text-xs cursor-pointer"
                >
                  Add
                </button>
              </form>
            </div>
          </div>

        </div>

        {/* Heatmap checkins */}
        <div className="glass-panel p-6 rounded-3xl border border-white/10 bg-brand-sec/80 flex flex-col justify-between">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-primary" /> Gym Attendance Heatmap
            </h4>
            <p className="text-[10px] text-brand-text-sec mt-1">Consistency calendar: days you checked in during the last 28 days.</p>
          </div>

          <div className="grid grid-cols-7 gap-1.5 my-4">
            {heatmapData.map((checked, idx) => (
              <div
                key={idx}
                title={`Day ${idx + 1}: ${checked ? "Checked in" : "No record"}`}
                className={`aspect-square rounded-md border border-white/5 ${
                  checked ? "bg-primary shadow-sm shadow-primary/20" : "bg-white/5"
                }`}
              ></div>
            ))}
          </div>

          <div className="text-[10px] text-brand-text-sec flex justify-between">
            <span>Streak: {user.streak} Days Active</span>
            <span>Total Gym visits: {user.checkInCount}</span>
          </div>
        </div>

      </div>

      {/* Main Portlets row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left column: charts, timers, schedules (8 cols) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* SVG Weight Chart */}
          <div className="glass-panel p-6 rounded-3xl border border-white/10 bg-brand-sec/40">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-primary">Weight Progress Track</h4>
                <p className="text-[10px] text-brand-text-sec mt-0.5">Last 5 logs. Current weight: {user.currentWeight}kg. Target: {user.targetWeight}kg.</p>
              </div>

              <form onSubmit={handleAddWeight} className="flex gap-2">
                <input
                  type="number"
                  step="0.1"
                  required
                  placeholder="Weight (kg)..."
                  value={weightInput}
                  onChange={(e) => setWeightInput(e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:border-primary text-white w-28"
                />
                <button
                  type="submit"
                  className="bg-primary hover:bg-accent text-black font-bold px-3 py-1.5 rounded-xl text-xs cursor-pointer"
                >
                  Log
                </button>
              </form>
            </div>

            {/* Custom SVG line drawing */}
            <div className="relative w-full aspect-5/2 md:aspect-5/1.5 border border-white/5 p-4 rounded-2xl bg-black/20">
              <svg viewBox="0 0 500 150" className="w-full h-full">
                {/* Grid Lines */}
                <line x1="20" y1="20" x2="480" y2="20" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                <line x1="20" y1="65" x2="480" y2="65" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                <line x1="20" y1="110" x2="480" y2="110" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                
                {/* Trend line */}
                {weightHistory.length > 0 && (
                  <polyline
                    fill="none"
                    stroke="#FF6B00"
                    strokeWidth="3.5"
                    points={getSvgCoordinates()}
                  />
                )}
                
                {/* Labels */}
                {weightHistory.map((item, idx) => {
                  const width = 500;
                  const padding = 20;
                  const x = weightHistory.length === 1 
                    ? 250 
                    : padding + (idx / (weightHistory.length - 1)) * (width - padding * 2);
                  return (
                    <g key={idx}>
                      <circle cx={x} cy={150 - padding - ((item.weight - Math.min(...weightHistory.map(w => w.weight)) + 1) / (Math.max(...weightHistory.map(w => w.weight)) - Math.min(...weightHistory.map(w => w.weight)) + 2)) * (150 - padding * 2)} r="4" fill="#FFB000" />
                      <text x={x} y="145" fontSize="8" fill="#B3B3B3" textAnchor="middle">{item.date}</text>
                      <text x={x} y={150 - padding - ((item.weight - Math.min(...weightHistory.map(w => w.weight)) + 1) / (Math.max(...weightHistory.map(w => w.weight)) - Math.min(...weightHistory.map(w => w.weight)) + 2)) * (150 - padding * 2) - 8} fontSize="8" fill="#FFF" fontWeight="bold" textAnchor="middle">{item.weight}kg</text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* Active Bookings (Classes and Trainers) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Booked Classes */}
            <div className="glass-panel p-6 rounded-3xl border border-white/10 bg-brand-sec/40">
              <h4 className="text-xs font-bold uppercase tracking-wider text-primary mb-4 flex items-center gap-1.5">
                <Calendar className="w-4 h-4" /> Booked Group Classes
              </h4>
              
              {classBookings.filter(b => b.status === "active").length === 0 ? (
                <p className="text-xs text-brand-text-sec">You have no active class bookings today.</p>
              ) : (
                <div className="space-y-3">
                  {classBookings.filter(b => b.status === "active").map((booking) => (
                    <div key={booking.id} className="p-3 bg-white/5 border border-white/5 rounded-xl flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-white">{booking.className}</div>
                        <div className="text-[10px] text-brand-text-sec mt-0.5">{booking.time} • {booking.trainerName}</div>
                      </div>
                      <button
                        onClick={() => cancelClass(booking.id)}
                        className="text-red-400 hover:text-red-300 p-1 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Booked Trainers */}
            <div className="glass-panel p-6 rounded-3xl border border-white/10 bg-brand-sec/40">
              <h4 className="text-xs font-bold uppercase tracking-wider text-primary mb-4 flex items-center gap-1.5">
                <Clock className="w-4 h-4" /> Private Trainer Bookings
              </h4>

              {trainerBookings.filter(b => b.status === "confirmed").length === 0 ? (
                <p className="text-xs text-brand-text-sec">No upcoming private appointments booked.</p>
              ) : (
                <div className="space-y-3">
                  {trainerBookings.filter(b => b.status === "confirmed").map((booking) => (
                    <div key={booking.id} className="p-3 bg-white/5 border border-white/5 rounded-xl flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-white">1-on-1 with {booking.trainerName}</div>
                        <div className="text-[10px] text-brand-text-sec mt-0.5">{booking.date} at {booking.time}</div>
                      </div>
                      <button
                        onClick={() => cancelTrainer(booking.id)}
                        className="text-red-400 hover:text-red-300 p-1 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* Workout Timer */}
          <div className="glass-panel p-6 rounded-3xl border border-white/10 bg-brand-sec/80 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                <Clock className="w-4 h-4" /> HIIT / Tabata Workout Timer
              </h4>
              <p className="text-[10px] text-brand-text-sec mt-1">Live interval clock. Complete 8 rounds. (40s work, 20s recovery rest).</p>
              
              <div className="flex items-center gap-6 mt-6">
                <div className="text-5xl font-black font-heading text-white">{timeLeft}s</div>
                <div>
                  <div className="text-xs font-bold uppercase text-primary tracking-wider">{timerMode} mode</div>
                  <div className="text-[10px] text-brand-text-sec">Completed cycles: {completedCycles}/8</div>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setTimerActive(!timerActive)}
                className="flex-1 bg-primary hover:bg-accent text-black font-bold py-3.5 rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer uppercase"
              >
                {timerActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {timerActive ? "Pause" : "Start"}
              </button>
              <button
                onClick={() => {
                  setTimerActive(false);
                  setTimerMode("work");
                  setTimeLeft(40);
                  setCompletedCycles(0);
                }}
                className="bg-white/5 hover:bg-white/10 text-white font-bold p-3.5 rounded-xl border border-white/10 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Right column: AI generators (4 cols) */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* AI Workout Planner */}
          <div className="glass-panel p-6 rounded-3xl border border-white/10 bg-brand-sec/40">
            <h4 className="text-xs font-bold uppercase tracking-wider text-primary mb-4 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" /> AI Workout Generator
            </h4>

            {aiWorkoutPlan ? (
              <div className="space-y-4">
                <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                  <div className="text-[10px] text-brand-text-sec uppercase font-bold">Goal / Level</div>
                  <div className="text-xs font-bold text-white mt-0.5">{aiWorkoutPlan.goal} ({aiWorkoutPlan.level})</div>
                </div>

                <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                  {aiWorkoutPlan.schedule.map((day, idx) => (
                    <div key={idx} className="p-2.5 bg-black/20 rounded-lg border border-white/5">
                      <div className="text-[9.5px] text-primary font-bold">{day.day} - {day.target}</div>
                      <ul className="text-[10px] text-brand-text-sec mt-1 space-y-0.5 list-disc pl-3">
                        {day.exercises.map((ex, eidx) => (
                          <li key={eidx}>{ex}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => generateAIWorkout("", "", "")}
                  className="w-full text-center text-[10px] font-bold text-brand-text-sec hover:text-white pt-2 cursor-pointer animate-pulse"
                >
                  ✕ Clear — Generate new routine
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-text-sec mb-1">Workout Goal</label>
                  <select
                    value={workoutGoal}
                    onChange={(e) => setWorkoutGoal(e.target.value)}
                    className="w-full bg-brand-sec border border-white/10 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary text-white"
                  >
                    <option>Muscle Gain</option>
                    <option>Weight Loss</option>
                    <option>Functional Training</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-text-sec mb-1">Athlete Level</label>
                  <select
                    value={workoutLevel}
                    onChange={(e) => setWorkoutLevel(e.target.value)}
                    className="w-full bg-brand-sec border border-white/10 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary text-white"
                  >
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Elite Pro</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-text-sec mb-1">Available Equipment</label>
                  <select
                    value={workoutEquip}
                    onChange={(e) => setWorkoutEquip(e.target.value)}
                    className="w-full bg-brand-sec border border-white/10 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary text-white"
                  >
                    <option>Full Gym</option>
                    <option>Dumbbells Only</option>
                    <option>Bodyweight Only</option>
                  </select>
                </div>

                <button
                  onClick={handleGenerateWorkout}
                  disabled={isGeneratingWorkout}
                  className="w-full bg-primary hover:bg-accent disabled:bg-primary/50 text-black font-black py-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 text-xs uppercase"
                >
                  {isGeneratingWorkout ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Creating routine...
                    </>
                  ) : (
                    "Generate Routine"
                  )}
                </button>
              </div>
            )}
          </div>

          {/* AI Diet Planner */}
          <div className="glass-panel p-6 rounded-3xl border border-white/10 bg-brand-sec/40">
            <h4 className="text-xs font-bold uppercase tracking-wider text-primary mb-4 flex items-center gap-1.5">
              <Apple className="w-4 h-4" /> AI Diet Planner
            </h4>

            {aiDietPlan ? (
              <div className="space-y-4">
                <div className="p-3 bg-white/5 rounded-xl border border-white/5 grid grid-cols-2 gap-2 text-center text-xs font-bold text-white">
                  <div>
                    <div className="text-[8px] text-brand-text-sec uppercase tracking-wider">Calories</div>
                    <div>{aiDietPlan.calories} kcal</div>
                  </div>
                  <div>
                    <div className="text-[8px] text-brand-text-sec uppercase tracking-wider">Protein</div>
                    <div>{aiDietPlan.protein}g</div>
                  </div>
                </div>

                <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
                  {aiDietPlan.meals.map((meal, idx) => (
                    <div key={idx} className="p-2.5 bg-black/20 rounded-lg border border-white/5">
                      <div className="text-[9.5px] text-primary font-bold uppercase tracking-wider">{meal.type}</div>
                      <div className="text-[10px] text-white mt-0.5">{meal.item}</div>
                      <div className="text-[8px] text-brand-text-sec mt-1">{meal.macros}</div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => generateAIDiet("", "", 0)}
                  className="w-full text-center text-[10px] font-bold text-brand-text-sec hover:text-white pt-2 cursor-pointer animate-pulse"
                >
                  ✕ Clear — Generate new diet plan
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-text-sec mb-1">Dietary Goal</label>
                  <select
                    value={dietGoal}
                    onChange={(e) => setDietGoal(e.target.value)}
                    className="w-full bg-brand-sec border border-white/10 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary text-white"
                  >
                    <option>Muscle Gain</option>
                    <option>Weight Loss</option>
                    <option>Lean Cut</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-text-sec mb-1">Nutrition Strategy</label>
                  <select
                    value={dietType}
                    onChange={(e) => setDietType(e.target.value)}
                    className="w-full bg-brand-sec border border-white/10 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary text-white"
                  >
                    <option>High Protein</option>
                    <option>Keto Diet</option>
                    <option>Balanced / Carb Loading</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-text-sec mb-1">Daily Calories Goal</label>
                  <input
                    type="number"
                    value={dietCals}
                    onChange={(e) => setDietCals(parseInt(e.target.value))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary text-white"
                  />
                </div>

                <button
                  onClick={handleGenerateDiet}
                  disabled={isGeneratingDiet}
                  className="w-full bg-primary hover:bg-accent disabled:bg-primary/50 text-black font-black py-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 text-xs uppercase"
                >
                  {isGeneratingDiet ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Creating diet...
                    </>
                  ) : (
                    "Generate Diet Plan"
                  )}
                </button>
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
