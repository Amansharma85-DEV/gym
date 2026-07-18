"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { Home, Calendar, QrCode, CreditCard, User, LogOut, Check, Dumbbell, Shield } from "lucide-react";

interface MobileLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onScrollToSection: (sectionId: string) => void;
}

export default function MobileLayout({
  children,
  activeTab,
  setActiveTab,
  onScrollToSection,
}: MobileLayoutProps) {
  const { isLoggedIn, logout, user, login, setCheckoutPlan } = useApp();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  
  // Login Form states
  const [loginName, setLoginName] = useState("");
  const [loginEmail, setLoginEmail] = useState("");

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginEmail && loginName) {
      login(loginEmail, "+1 (555) 234-5678", loginName);
      setShowLoginModal(false);
    }
  };

  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "classes", label: "Classes", icon: Calendar },
    { id: "qr", label: "Check-in", icon: QrCode, action: () => {
      if (isLoggedIn) setShowQRModal(true);
      else setShowLoginModal(true);
    }},
    { id: "membership", label: "Membership", icon: CreditCard },
    { id: "profile", label: "Profile", icon: User },
  ];

  const handleTabClick = (itemId: string, action?: () => void) => {
    if (action) {
      action();
      return;
    }

    if (itemId === "home") {
      setActiveTab("landing");
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 50);
    } else if (itemId === "classes") {
      setActiveTab("landing");
      setTimeout(() => {
        const el = document.getElementById("classes");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 50);
    } else if (itemId === "membership") {
      setActiveTab("landing");
      setTimeout(() => {
        const el = document.getElementById("membership");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 50);
    } else if (itemId === "profile") {
      if (isLoggedIn) {
        setActiveTab("dashboard");
      } else {
        setShowLoginModal(true);
      }
    }
  };

  const currentActiveTab = () => {
    if (activeTab === "dashboard") return "profile";
    return "home";
  };

  return (
    <div className="relative min-h-screen bg-brand-bg flex flex-col font-body pb-20">
      {/* Mobile Top Header */}
      <header className="sticky top-0 z-40 bg-brand-bg/90 backdrop-blur-md px-4 py-3 flex items-center justify-between border-b border-white/5">
        <div
          onClick={() => {
            setActiveTab("landing");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center gap-1.5 cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Dumbbell className="w-5 h-5 text-black stroke-[2.5]" />
          </div>
          <span className="font-heading font-black text-lg tracking-tight uppercase">
            Elite<span className="text-primary">Fit</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          {isLoggedIn && (
            <button
              onClick={() => setActiveTab(activeTab === "admin" ? "landing" : "admin")}
              className={`flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                activeTab === "admin"
                  ? "bg-white text-black"
                  : "glass-panel text-white"
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              Admin
            </button>
          )}

          {isLoggedIn ? (
            <button
              onClick={() => {
                logout();
                setActiveTab("landing");
              }}
              className="p-1.5 text-red-400 hover:text-red-300"
            >
              <LogOut className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={() => setShowLoginModal(true)}
              className="text-xs font-bold bg-primary hover:bg-accent text-black px-3.5 py-1.5 rounded-full transition-all"
            >
              Sign In
            </button>
          )}
        </div>
      </header>

      {/* Main content slot */}
      <main className="flex-1 px-4 py-4">{children}</main>

      {/* Floating Join Button */}
      {!isLoggedIn || user.membership === "None" ? (
        <button
          onClick={() => {
            setCheckoutPlan({ name: "Monthly Elite Plan", price: 1499, duration: "Month" });
          }}
          className="fixed bottom-20 right-4 z-30 bg-primary hover:bg-accent text-black font-black py-3 px-5 rounded-full shadow-2xl neon-glow-primary flex items-center justify-center gap-1.5 text-xs uppercase tracking-wider transition-all duration-200 active:scale-95"
        >
          Join Now 🔥
        </button>
      ) : null}

      {/* Mobile Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 z-40 bg-brand-sec/95 backdrop-blur-lg border-t border-white/10 px-2 pt-2 pb-5 flex items-center justify-around shadow-2xl w-screen max-w-full">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentActiveTab() === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleTabClick(item.id, item.action)}
              className={`flex flex-col items-center justify-center w-14 py-1 transition-all cursor-pointer ${
                isActive ? "text-primary scale-105" : "text-brand-text-sec hover:text-white"
              }`}
            >
              <Icon className="w-5 h-5 stroke-[2]" />
              <span className="text-[9px] font-medium mt-1 tracking-tight">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full glass-panel bg-brand-sec p-6 rounded-t-3xl border border-white/10 shadow-2xl relative animate-in slide-in-from-bottom duration-300">
            <div className="w-12 h-1.5 bg-white/20 rounded-full mx-auto mb-6" onClick={() => setShowLoginModal(false)}></div>
            <button
              onClick={() => setShowLoginModal(false)}
              className="absolute top-4 right-4 text-brand-text-sec hover:text-white text-lg font-bold"
            >
              ×
            </button>
            <h3 className="font-heading font-black text-xl text-white mb-1 uppercase">Members Area</h3>
            <p className="text-xs text-brand-text-sec mb-5">Login to load your active streaks, trackers, and workouts.</p>
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-text-sec mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="Aman Sharma"
                  value={loginName}
                  onChange={(e) => setLoginName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary text-white"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-text-sec mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="aman@elitefit.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary text-white"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary hover:bg-accent text-black font-bold py-3.5 rounded-xl transition-all mt-2 cursor-pointer"
              >
                Log In
              </button>
            </form>
          </div>
        </div>
      )}

      {/* QR Check-in Modal */}
      {showQRModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
          <div className="w-full max-w-sm glass-panel bg-brand-sec p-6 rounded-2xl border border-white/10 text-center shadow-2xl relative">
            <button
              onClick={() => setShowQRModal(false)}
              className="absolute top-4 right-4 text-brand-text-sec hover:text-white text-xl font-bold"
            >
              ×
            </button>
            <h3 className="font-heading font-black text-lg uppercase tracking-tight text-white mb-1">Gym Check-in QR</h3>
            <p className="text-xs text-brand-text-sec mb-6">Hold this in front of the scanner to check in at the reception desk.</p>
            
            <div className="bg-white p-4 rounded-2xl inline-block mx-auto mb-6 shadow-xl relative group">
              {/* Mock QR code using CSS art and styling since it works offline */}
              <div className="w-48 h-48 border-4 border-black flex flex-col justify-between p-2 relative">
                <div className="flex justify-between">
                  <div className="w-12 h-12 border-4 border-black bg-black"></div>
                  <div className="w-12 h-12 border-4 border-black bg-black"></div>
                </div>
                <div className="absolute inset-4 border border-dashed border-black/30 flex items-center justify-center flex-col">
                  <Dumbbell className="w-10 h-10 text-primary animate-pulse" />
                  <span className="text-[7px] font-black text-black tracking-widest mt-1">ELITEFIT</span>
                </div>
                <div className="flex justify-between items-end">
                  <div className="w-12 h-12 border-4 border-black bg-black"></div>
                  <div className="w-8 h-8 bg-black"></div>
                </div>
              </div>
            </div>

            <div className="text-white text-sm font-bold tracking-wider uppercase mb-1">{user.name}</div>
            <div className="text-xs text-primary font-semibold mb-4">Membership: {user.membership}</div>
            <div className="text-[10px] text-brand-text-sec bg-white/5 py-2 px-3 rounded-lg border border-white/5">
              Code: {user.qrCode}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
