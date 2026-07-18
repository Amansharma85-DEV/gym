"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  membership: "None" | "Monthly" | "Quarterly" | "Yearly" | "VIP Premium";
  membershipExpiry: string;
  streak: number;
  waterGoal: number; // in ml
  waterCurrent: number;
  stepGoal: number;
  stepCurrent: number;
  currentWeight: number; // in kg
  targetWeight: number; // in kg
  bodyFat: number; // in %
  qrCode: string;
  checkInCount: number;
}

export interface ClassBooking {
  id: string;
  classId: string;
  className: string;
  time: string;
  date: string;
  trainerName: string;
  status: "active" | "cancelled";
}

export interface TrainerBooking {
  id: string;
  trainerId: string;
  trainerName: string;
  date: string;
  time: string;
  notes: string;
  status: "confirmed" | "cancelled";
}

export interface WeightHistory {
  date: string;
  weight: number;
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
}

export interface Coupon {
  code: string;
  discount: number; // percentage, e.g. 20
  description: string;
}

export interface MemberRecord {
  id: string;
  name: string;
  email: string;
  membership: string;
  status: "Active" | "Expired" | "Pending";
  checkIns: number;
  joinDate: string;
}

export interface GymClass {
  id: string;
  name: string;
  time: string;
  trainer: string;
  seatsTotal: number;
  seatsLeft: number;
  category: "CrossFit" | "Yoga" | "Strength" | "HIIT";
}

export interface AIPlanResult {
  workoutPlan?: {
    goal: string;
    level: string;
    schedule: { day: string; target: string; exercises: string[] }[];
  };
  dietPlan?: {
    goal: string;
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
    meals: { type: string; item: string; macros: string }[];
  };
}

interface AppContextType {
  isLoggedIn: boolean;
  login: (email: string, phone: string, name: string) => void;
  logout: () => void;
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
  classBookings: ClassBooking[];
  trainerBookings: TrainerBooking[];
  weightHistory: WeightHistory[];
  notifications: NotificationItem[];
  coupons: Coupon[];
  memberRecords: MemberRecord[];
  classes: GymClass[];
  activeCheckoutPlan: { name: string; price: number; duration: string } | null;
  
  // Actions
  bookClass: (classId: string) => boolean;
  cancelClass: (bookingId: string) => void;
  bookTrainer: (trainerId: string, trainerName: string, date: string, time: string, notes: string) => void;
  cancelTrainer: (bookingId: string) => void;
  addWeightLog: (weight: number) => void;
  addWater: (amount: number) => void;
  resetWater: () => void;
  addSteps: (amount: number) => void;
  addNotification: (title: string, description: string) => void;
  markNotificationsRead: () => void;
  applyCoupon: (code: string) => number | null; // returns discount % if valid
  purchaseMembership: (planName: string, finalPrice: number) => void;
  setCheckoutPlan: (plan: { name: string; price: number; duration: string } | null) => void;
  
  // AI Tools
  generateAIWorkout: (goal: string, level: string, equipment: string) => AIPlanResult;
  generateAIDiet: (goal: string, dietType: string, calories: number) => AIPlanResult;
  aiWorkoutPlan: AIPlanResult["workoutPlan"] | null;
  aiDietPlan: AIPlanResult["dietPlan"] | null;
  
  // Admin simulation actions
  simulateCheckIn: (emailOrQR: string) => string; // returns message
  addCoupon: (code: string, discount: number, description: string) => void;
  deleteMember: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<UserProfile>({
    name: "Aman Sharma",
    email: "aman@elitefit.com",
    phone: "+1 (555) 234-5678",
    membership: "None",
    membershipExpiry: "N/A",
    streak: 5,
    waterGoal: 3000,
    waterCurrent: 1250,
    stepGoal: 10000,
    stepCurrent: 6420,
    currentWeight: 82.5,
    targetWeight: 75.0,
    bodyFat: 18.4,
    qrCode: "MEMBER-AMAN-ELITE",
    checkInCount: 14,
  });

  const [classBookings, setClassBookings] = useState<ClassBooking[]>([]);
  const [trainerBookings, setTrainerBookings] = useState<TrainerBooking[]>([]);
  const [weightHistory, setWeightHistory] = useState<WeightHistory[]>([
    { date: "Jul 10", weight: 85.0 },
    { date: "Jul 12", weight: 84.5 },
    { date: "Jul 14", weight: 83.8 },
    { date: "Jul 16", weight: 83.1 },
    { date: "Jul 18", weight: 82.5 },
  ]);
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    { id: "1", title: "Welcome to Elite Fitness!", description: "Your profile has been created successfully.", time: "2 hours ago", read: false },
    { id: "2", title: "Active Streak: 5 Days", description: "You are consistent! Keep it up for exclusive rewards.", time: "1 day ago", read: true },
  ]);

  const [coupons, setCoupons] = useState<Coupon[]>([
    { code: "ELITE30", discount: 30, description: "30% Off on Yearly & VIP memberships" },
    { code: "GROW50", discount: 50, description: "50% Off First Month of membership" },
    { code: "WELCOME10", discount: 10, description: "10% Off on any plan" },
  ]);

  const [classes, setClasses] = useState<GymClass[]>([
    { id: "c1", name: "Power CrossFit", time: "08:00 AM - 09:00 AM", trainer: "Viktor Novak", seatsTotal: 20, seatsLeft: 12, category: "CrossFit" },
    { id: "c2", name: "Zen Yoga Flow", time: "10:00 AM - 11:00 AM", trainer: "Serena Thorne", seatsTotal: 25, seatsLeft: 18, category: "Yoga" },
    { id: "c3", name: "Elite Iron Lift", time: "05:00 PM - 06:00 PM", trainer: "Marcus Steel", seatsTotal: 15, seatsLeft: 8, category: "Strength" },
    { id: "c4", name: "HIIT Cardio Burnout", time: "07:00 PM - 08:00 PM", trainer: "Elena Rostova", seatsTotal: 22, seatsLeft: 15, category: "HIIT" },
  ]);

  const [memberRecords, setMemberRecords] = useState<MemberRecord[]>([
    { id: "m1", name: "Aman Sharma", email: "aman@elitefit.com", membership: "VIP Premium", status: "Active", checkIns: 14, joinDate: "2026-06-01" },
    { id: "m2", name: "Jane Miller", email: "jane@fitness.org", membership: "Monthly", status: "Active", checkIns: 8, joinDate: "2026-07-02" },
    { id: "m3", name: "Dan Cruickshank", email: "dan@heavyiron.com", membership: "Yearly", status: "Active", checkIns: 22, joinDate: "2025-11-15" },
    { id: "m4", name: "Sarah Connor", email: "sarah@resistance.com", membership: "None", status: "Expired", checkIns: 0, joinDate: "2025-05-10" },
  ]);

  const [activeCheckoutPlan, setCheckoutPlan] = useState<{ name: string; price: number; duration: string } | null>(null);
  const [aiWorkoutPlan, setAiWorkoutPlan] = useState<AIPlanResult["workoutPlan"] | null>(null);
  const [aiDietPlan, setAiDietPlan] = useState<AIPlanResult["dietPlan"] | null>(null);

  // Load from local storage
  useEffect(() => {
    const savedIsLoggedIn = localStorage.getItem("elite_isLoggedIn");
    const savedUser = localStorage.getItem("elite_user");
    const savedClassBookings = localStorage.getItem("elite_classBookings");
    const savedTrainerBookings = localStorage.getItem("elite_trainerBookings");
    const savedWeightHistory = localStorage.getItem("elite_weightHistory");
    const savedNotifications = localStorage.getItem("elite_notifications");
    const savedCoupons = localStorage.getItem("elite_coupons");
    const savedMembers = localStorage.getItem("elite_memberRecords");
    const savedWorkoutPlan = localStorage.getItem("elite_aiWorkoutPlan");
    const savedDietPlan = localStorage.getItem("elite_aiDietPlan");

    if (savedIsLoggedIn) setIsLoggedIn(JSON.parse(savedIsLoggedIn));
    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedClassBookings) setClassBookings(JSON.parse(savedClassBookings));
    if (savedTrainerBookings) setTrainerBookings(JSON.parse(savedTrainerBookings));
    if (savedWeightHistory) setWeightHistory(JSON.parse(savedWeightHistory));
    if (savedNotifications) setNotifications(JSON.parse(savedNotifications));
    if (savedCoupons) setCoupons(JSON.parse(savedCoupons));
    if (savedMembers) setMemberRecords(JSON.parse(savedMembers));
    if (savedWorkoutPlan) setAiWorkoutPlan(JSON.parse(savedWorkoutPlan));
    if (savedDietPlan) setAiDietPlan(JSON.parse(savedDietPlan));
  }, []);

  // Sync to local storage
  const sync = (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  const login = (email: string, phone: string, name: string) => {
    setIsLoggedIn(true);
    const updatedUser = { ...user, email, phone, name };
    setUser(updatedUser);
    sync("elite_isLoggedIn", true);
    sync("elite_user", updatedUser);
    addNotification("Access Granted", `Welcome back, ${name}! Your dashboard is active.`);
  };

  const logout = () => {
    setIsLoggedIn(false);
    sync("elite_isLoggedIn", false);
  };

  const bookClass = (classId: string) => {
    const classObj = classes.find(c => c.id === classId);
    if (!classObj || classObj.seatsLeft <= 0) return false;

    // Check if already booked
    if (classBookings.some(b => b.classId === classId && b.status === "active")) {
      addNotification("Class Already Booked", `You are already registered for ${classObj.name}.`);
      return false;
    }

    const newBooking: ClassBooking = {
      id: "b-" + Date.now(),
      classId,
      className: classObj.name,
      time: classObj.time,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      trainerName: classObj.trainer,
      status: "active",
    };

    const updatedBookings = [newBooking, ...classBookings];
    setClassBookings(updatedBookings);
    sync("elite_classBookings", updatedBookings);

    // Update classes seats left
    const updatedClasses = classes.map(c => c.id === classId ? { ...c, seatsLeft: c.seatsLeft - 1 } : c);
    setClasses(updatedClasses);

    addNotification("Class Confirmed!", `Successfully booked ${classObj.name}. Seat reserved!`);
    return true;
  };

  const cancelClass = (bookingId: string) => {
    const booking = classBookings.find(b => b.id === bookingId);
    if (!booking) return;

    const updatedBookings = classBookings.map(b => b.id === bookingId ? { ...b, status: "cancelled" as const } : b);
    setClassBookings(updatedBookings);
    sync("elite_classBookings", updatedBookings);

    // Give seat back
    const updatedClasses = classes.map(c => c.id === booking.classId ? { ...c, seatsLeft: c.seatsLeft + 1 } : c);
    setClasses(updatedClasses);

    addNotification("Class Cancelled", `Your booking for ${booking.className} was cancelled.`);
  };

  const bookTrainer = (trainerId: string, trainerName: string, date: string, time: string, notes: string) => {
    const newBooking: TrainerBooking = {
      id: "tb-" + Date.now(),
      trainerId,
      trainerName,
      date,
      time,
      notes,
      status: "confirmed",
    };

    const updatedBookings = [newBooking, ...trainerBookings];
    setTrainerBookings(updatedBookings);
    sync("elite_trainerBookings", updatedBookings);

    addNotification("Personal Trainer Confirmed!", `Session booked with ${trainerName} on ${date} at ${time}.`);
  };

  const cancelTrainer = (bookingId: string) => {
    const booking = trainerBookings.find(b => b.id === bookingId);
    if (!booking) return;

    const updatedBookings = trainerBookings.map(b => b.id === bookingId ? { ...b, status: "cancelled" as const } : b);
    setTrainerBookings(updatedBookings);
    sync("elite_trainerBookings", updatedBookings);

    addNotification("Session Cancelled", `Your trainer session with ${booking.trainerName} was cancelled.`);
  };

  const addWeightLog = (weight: number) => {
    const dateStr = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" });
    const newLog = { date: dateStr, weight };
    const updatedHistory = [...weightHistory, newLog].slice(-7); // Keep last 7 items
    setWeightHistory(updatedHistory);
    sync("elite_weightHistory", updatedHistory);

    const updatedUser = { ...user, currentWeight: weight };
    setUser(updatedUser);
    sync("elite_user", updatedUser);

    addNotification("Weight Updated", `Log recorded: ${weight} kg.`);
  };

  const addWater = (amount: number) => {
    const newAmount = Math.min(user.waterGoal * 2, user.waterCurrent + amount);
    const updatedUser = { ...user, waterCurrent: newAmount };
    setUser(updatedUser);
    sync("elite_user", updatedUser);

    if (user.waterCurrent < user.waterGoal && newAmount >= user.waterGoal) {
      addNotification("Goal Achieved! 💧", "Excellent job! You met your hydration target today.");
    }
  };

  const resetWater = () => {
    const updatedUser = { ...user, waterCurrent: 0 };
    setUser(updatedUser);
    sync("elite_user", updatedUser);
  };

  const addSteps = (amount: number) => {
    const newSteps = user.stepCurrent + amount;
    const updatedUser = { ...user, stepCurrent: newSteps };
    setUser(updatedUser);
    sync("elite_user", updatedUser);

    if (user.stepCurrent < user.stepGoal && newSteps >= user.stepGoal) {
      addNotification("Steps Goal Achieved! 🏃‍♂️", "10,000 steps reached! Streak extended.");
      setUser(prev => ({ ...prev, streak: prev.streak + 1 }));
    }
  };

  const addNotification = (title: string, description: string) => {
    const newNotif: NotificationItem = {
      id: "n-" + Date.now(),
      title,
      description,
      time: "Just now",
      read: false,
    };
    const updatedNotifs = [newNotif, ...notifications];
    setNotifications(updatedNotifs);
    sync("elite_notifications", updatedNotifs);
  };

  const markNotificationsRead = () => {
    const updatedNotifs = notifications.map(n => ({ ...n, read: true }));
    setNotifications(updatedNotifs);
    sync("elite_notifications", updatedNotifs);
  };

  const applyCoupon = (code: string) => {
    const coupon = coupons.find(c => c.code.toUpperCase() === code.toUpperCase());
    return coupon ? coupon.discount : null;
  };

  const purchaseMembership = (planName: string, finalPrice: number) => {
    const expiryDate = new Date();
    if (planName.includes("Monthly")) expiryDate.setMonth(expiryDate.getMonth() + 1);
    else if (planName.includes("Quarterly")) expiryDate.setMonth(expiryDate.getMonth() + 3);
    else expiryDate.setFullYear(expiryDate.getFullYear() + 1);

    const expiryStr = expiryDate.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

    // Map plan display names to valid UserProfile.membership enum values
    const planMap: Record<string, UserProfile["membership"]> = {
      "Monthly Elite Plan": "Monthly",
      "Yearly Pro Plan": "Yearly",
      "VIP Premium Plan": "VIP Premium",
    };
    const formattedPlan: UserProfile["membership"] = planMap[planName] ?? "Monthly";
    
    const updatedUser: UserProfile = {
      ...user,
      membership: formattedPlan,
      membershipExpiry: expiryStr,
    };

    setUser(updatedUser);
    sync("elite_user", updatedUser);

    // Sync to admin records as well
    const updatedRecords = memberRecords.map(m => m.email === user.email ? { ...m, membership: formattedPlan, status: "Active" as const } : m);
    setMemberRecords(updatedRecords);
    sync("elite_memberRecords", updatedRecords);

    addNotification("Membership Active! 🎉", `Thank you! You are now an active ${formattedPlan} member until ${expiryStr}.`);
  };

  // AI Planner simulations
  const generateAIWorkout = (goal: string, level: string, equipment: string) => {
    // Mock response details
    const workoutsByGoal: Record<string, { day: string; target: string; exercises: string[] }[]> = {
      "Muscle Gain": [
        { day: "Mon", target: "Chest & Triceps", exercises: ["Bench Press: 4x8", "Incline DB Press: 3x10", "Dips: 3xMax", "Tricep Pushdowns: 4x12"] },
        { day: "Wed", target: "Back & Biceps", exercises: ["Pullups: 4x8", "Barbell Rows: 3x8", "Lat Pulldowns: 3x12", "Hammer Curls: 3x10"] },
        { day: "Fri", target: "Legs & Shoulders", exercises: ["Squats: 4x8", "Romanian Deadlifts: 3x10", "Overhead Press: 4x8", "Lateral Raises: 3x15"] },
      ],
      "Weight Loss": [
        { day: "Mon", target: "Full Body HIIT", exercises: ["Kettlebell Swings: 4x45s", "Burpees: 4x30s", "Thrusters: 3x12", "Plank: 4x60s"] },
        { day: "Wed", target: "Cardio Conditioning", exercises: ["Rowing Machine: 20 mins", "Sprints: 8x100m", "Medicine Ball Slams: 3x15"] },
        { day: "Fri", target: "Athletic Strength & Core", exercises: ["Goblet Squats: 3x15", "Pushups: 3x20", "Mountain Climbers: 4x45s", "Leg Raises: 3x15"] },
      ],
      "Functional Training": [
        { day: "Mon", target: "Mobility & Strength", exercises: ["Turkish Get-Ups: 3x5 each", "Pull-ups: 3x8", "Bulgarian Split Squats: 3x10"] },
        { day: "Wed", target: "Agility & Core", exercises: ["Box Jumps: 4x10", "Battle Ropes: 4x30s", "Hanging Knee Raises: 3x12"] },
        { day: "Fri", target: "Power & Endurance", exercises: ["Deadlifts: 3x5", "Dumbbell Snatch: 3x8", "Farmers Walk: 4x40m"] },
      ],
    };

    const targetList = workoutsByGoal[goal] || workoutsByGoal["Muscle Gain"];

    const plan = {
      goal,
      level,
      schedule: targetList,
    };

    setAiWorkoutPlan(plan);
    sync("elite_aiWorkoutPlan", plan);
    addNotification("AI Workout Customizer", `Successfully generated customized ${level} ${goal} routine.`);
    return { workoutPlan: plan };
  };

  const generateAIDiet = (goal: string, dietType: string, calories: number) => {
    const protein = Math.round(calories * 0.075); // rough g protein
    const carbs = Math.round(calories * 0.1);
    const fats = Math.round(calories * 0.03);

    const plan = {
      goal,
      calories,
      protein,
      carbs,
      fats,
      meals: [
        { type: "Breakfast", item: "Oatmeal with whey protein, 1 banana, and almonds", macros: `P: 35g | C: 50g | F: 12g` },
        { type: "Lunch", item: "Grilled chicken breast, brown rice, broccoli, olive oil", macros: `P: 45g | C: 45g | F: 14g` },
        { type: "Snack", item: "Greek yogurt with berries and 1 scoop of protein powder", macros: `P: 28g | C: 15g | F: 2g` },
        { type: "Dinner", item: "Baked Salmon, sweet potatoes, green asparagus", macros: `P: 38g | C: 35g | F: 18g` },
      ],
    };

    setAiDietPlan(plan);
    sync("elite_aiDietPlan", plan);
    addNotification("AI Diet Planner", `Successfully generated ${dietType} diet plan containing ${calories} kcal.`);
    return { dietPlan: plan };
  };

  // Admin Simulation Actions
  const simulateCheckIn = (emailOrQR: string) => {
    // Check if matches Aman
    if (emailOrQR === user.email || emailOrQR === user.qrCode) {
      const updatedUser = { ...user, checkInCount: user.checkInCount + 1 };
      setUser(updatedUser);
      sync("elite_user", updatedUser);

      const updatedRecords = memberRecords.map(m => m.email === user.email ? { ...m, checkIns: m.checkIns + 1 } : m);
      setMemberRecords(updatedRecords);
      sync("elite_memberRecords", updatedRecords);

      addNotification("Gym Entry Scanned 📲", "Welcome to Elite Fitness! Your attendance has been logged.");
      return `Welcome, ${user.name}! Checked in successfully. Check-in Count: ${updatedUser.checkInCount}`;
    }

    // Try scanning others
    const matched = memberRecords.find(m => m.email === emailOrQR || m.id === emailOrQR);
    if (matched) {
      const updatedRecords = memberRecords.map(m => m.id === matched.id ? { ...m, checkIns: m.checkIns + 1 } : m);
      setMemberRecords(updatedRecords);
      sync("elite_memberRecords", updatedRecords);
      return `Welcome, ${matched.name}! Checked in successfully.`;
    }

    return "Error: Member credentials not found. Invalid scan.";
  };

  const addCoupon = (code: string, discount: number, description: string) => {
    const newCoupon = { code: code.toUpperCase(), discount, description };
    const updatedCoupons = [...coupons, newCoupon];
    setCoupons(updatedCoupons);
    sync("elite_coupons", updatedCoupons);
    addNotification("Admin Settings", `New coupon code '${code.toUpperCase()}' was created.`);
  };

  const deleteMember = (id: string) => {
    const updated = memberRecords.filter(m => m.id !== id);
    setMemberRecords(updated);
    sync("elite_memberRecords", updated);
  };

  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
        user,
        setUser,
        classBookings,
        trainerBookings,
        weightHistory,
        notifications,
        coupons,
        memberRecords,
        classes,
        activeCheckoutPlan,
        bookClass,
        cancelClass,
        bookTrainer,
        cancelTrainer,
        addWeightLog,
        addWater,
        resetWater,
        addSteps,
        addNotification,
        markNotificationsRead,
        applyCoupon,
        purchaseMembership,
        setCheckoutPlan,
        generateAIWorkout,
        generateAIDiet,
        aiWorkoutPlan,
        aiDietPlan,
        simulateCheckIn,
        addCoupon,
        deleteMember,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
