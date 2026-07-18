"use client";

import React, { useState, useEffect } from "react";
import { useApp } from "@/context/AppContext";
import { Dumbbell, User, Shield, ChevronDown, Menu, LogOut, Check } from "lucide-react";

interface DesktopLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onScrollToSection: (sectionId: string) => void;
}

export default function DesktopLayout({
  children,
  activeTab,
  setActiveTab,
  onScrollToSection,
}: DesktopLayoutProps) {
  const { isLoggedIn, logout, user, login, setCheckoutPlan } = useApp();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  
  // Login Form states
  const [loginName, setLoginName] = useState("");
  const [loginEmail, setLoginEmail] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginEmail && loginName) {
      login(loginEmail, "+1 (555) 234-5678", loginName);
      setShowLoginModal(false);
    }
  };

  const programs = [
    { title: "Weight Loss", desc: "Burn fat & sculpt lean muscle with high-intensity interval metrics.", href: "weight-loss" },
    { title: "Muscle Gain", desc: "Build size, power, and athletic strength using targeted weight loads.", href: "muscle-gain" },
    { title: "Cardio", desc: "Boost stamina and respiratory threshold with premium pacing equipment.", href: "cardio" },
    { title: "CrossFit", desc: "High-intensity functional conditioning designed for ultimate threshold.", href: "crossfit" },
    { title: "Yoga", desc: "Enhance flexibility, core balance, and mental mindfulness.", href: "yoga" },
    { title: "Functional Training", desc: "Optimize everyday movement, coordination, and structural balance.", href: "functional" },
  ];

  return (
    <div className="relative min-h-screen bg-brand-bg flex flex-col font-body">
      {/* Navigation Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "glass-panel py-4 bg-brand-bg/85 shadow-lg border-b border-white/10"
            : "bg-transparent py-6 border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <div
            onClick={() => {
              setActiveTab("landing");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              <Dumbbell className="w-6 h-6 text-black stroke-[2.5]" />
            </div>
            <span className="font-heading font-black text-2xl tracking-tighter uppercase">
              Elite<span className="text-primary">Fit</span>
            </span>
          </div>

          {/* Nav Items */}
          {activeTab === "landing" ? (
            <nav className="hidden lg:flex items-center gap-8">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="text-sm font-semibold text-white hover:text-primary transition-colors cursor-pointer"
              >
                Home
              </button>

              {/* Programs Mega Menu Trigger */}
              <div
                className="relative"
                onMouseEnter={() => setShowMegaMenu(true)}
                onMouseLeave={() => setShowMegaMenu(false)}
              >
                <button className="flex items-center gap-1 text-sm font-semibold text-white hover:text-primary transition-colors cursor-pointer py-1">
                  Programs <ChevronDown className={`w-4 h-4 transition-transform ${showMegaMenu ? "rotate-180" : ""}`} />
                </button>

                {/* Mega Menu */}
                {showMegaMenu && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-[600px] glass-panel bg-brand-sec/95 rounded-2xl p-6 shadow-2xl grid grid-cols-2 gap-4 border border-white/10 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="col-span-2 pb-2 border-b border-white/5">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-primary">Gym Training Categories</h4>
                    </div>
                    {programs.map((p) => (
                      <div
                        key={p.title}
                        onClick={() => {
                          setShowMegaMenu(false);
                          onScrollToSection("programs");
                        }}
                        className="p-3 rounded-xl hover:bg-white/5 cursor-pointer transition-colors"
                      >
                        <div className="text-sm font-bold text-white mb-1 hover:text-primary transition-colors">{p.title}</div>
                        <div className="text-xs text-brand-text-sec line-clamp-2">{p.desc}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <button onClick={() => onScrollToSection("classes")} className="text-sm font-semibold text-white hover:text-primary transition-colors cursor-pointer">
                Classes
              </button>
              <button onClick={() => onScrollToSection("membership")} className="text-sm font-semibold text-white hover:text-primary transition-colors cursor-pointer">
                Membership
              </button>
              <button onClick={() => onScrollToSection("trainers")} className="text-sm font-semibold text-white hover:text-primary transition-colors cursor-pointer">
                Trainers
              </button>
              <button onClick={() => onScrollToSection("calculators")} className="text-sm font-semibold text-white hover:text-primary transition-colors cursor-pointer">
                Calculators
              </button>
              <button onClick={() => onScrollToSection("gallery")} className="text-sm font-semibold text-white hover:text-primary transition-colors cursor-pointer">
                Gallery
              </button>
              <button onClick={() => onScrollToSection("blog")} className="text-sm font-semibold text-white hover:text-primary transition-colors cursor-pointer">
                Blog
              </button>
              <button onClick={() => onScrollToSection("contact")} className="text-sm font-semibold text-white hover:text-primary transition-colors cursor-pointer">
                Contact
              </button>
            </nav>
          ) : (
            <button
              onClick={() => setActiveTab("landing")}
              className="text-sm font-semibold text-white hover:text-primary transition-colors cursor-pointer border border-white/10 px-4 py-2 rounded-lg hover:bg-white/5"
            >
              ← Back to Main Page
            </button>
          )}

          {/* User actions */}
          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <div className="flex items-center gap-3 relative">
                <button
                  onClick={() => setActiveTab(activeTab === "dashboard" ? "landing" : "dashboard")}
                  className={`flex items-center gap-2 text-sm font-bold px-4 py-2.5 rounded-full transition-all cursor-pointer ${
                    activeTab === "dashboard"
                      ? "bg-primary text-black neon-glow-primary hover:bg-accent"
                      : "glass-panel hover:bg-white/10 text-white"
                  }`}
                >
                  <User className="w-4 h-4" />
                  Dashboard
                </button>
                
                <button
                  onClick={() => setActiveTab(activeTab === "admin" ? "landing" : "admin")}
                  className={`flex items-center gap-2 text-sm font-bold px-4 py-2.5 rounded-full transition-all cursor-pointer ${
                    activeTab === "admin"
                      ? "bg-white text-black hover:bg-white/90"
                      : "glass-panel hover:bg-white/10 text-white"
                  }`}
                >
                  <Shield className="w-4 h-4" />
                  Admin
                </button>

                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center font-bold text-black border-2 border-white/20 hover:scale-105 transition-transform cursor-pointer"
                >
                  {user.name.split(" ").map(n => n[0]).join("")}
                </button>

                {showProfileMenu && (
                  <div className="absolute right-0 top-full mt-2 w-56 glass-panel bg-brand-sec/95 rounded-xl p-4 shadow-xl border border-white/10 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="mb-3 pb-2 border-b border-white/5">
                      <div className="text-sm font-bold text-white truncate">{user.name}</div>
                      <div className="text-xs text-brand-text-sec truncate">{user.email}</div>
                    </div>
                    {user.membership !== "None" ? (
                      <div className="mb-3 px-2.5 py-1 bg-primary/10 border border-primary/20 rounded-lg text-[11px] font-bold text-primary flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5" /> Active: {user.membership}
                      </div>
                    ) : (
                      <div className="mb-3 px-2.5 py-1 bg-white/5 border border-white/10 rounded-lg text-[11px] font-bold text-brand-text-sec">
                        No active membership
                      </div>
                    )}
                    <button
                      onClick={() => {
                        logout();
                        setActiveTab("landing");
                        setShowProfileMenu(false);
                      }}
                      className="w-full text-left text-xs font-semibold text-red-400 hover:text-red-300 flex items-center gap-2 pt-1 transition-colors cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="text-sm font-bold text-white hover:text-primary transition-colors cursor-pointer px-4 py-2"
                >
                  Log In
                </button>
                <button
                  onClick={() => {
                    setCheckoutPlan({ name: "VIP Premium Plan", price: 5999, duration: "Month" });
                  }}
                  className="bg-primary hover:bg-accent text-black font-bold text-sm px-6 py-2.5 rounded-full transition-all duration-300 hover:scale-105 cursor-pointer shadow-lg hover:shadow-primary/25"
                >
                  Join Now
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Page Area */}
      <main className="flex-1 pt-0">{children}</main>

      {/* Footer */}
      <footer className="bg-brand-bg border-t border-white/5 py-6 text-center text-xs text-brand-text-sec">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>© {new Date().getFullYear()} Elite Fitness Club. All Rights Reserved.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary transition-colors">Gym Rules</a>
          </div>
        </div>
      </footer>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-md glass-panel bg-brand-sec p-8 rounded-2xl border border-white/10 shadow-2xl relative">
            <button
              onClick={() => setShowLoginModal(false)}
              className="absolute top-4 right-4 text-brand-text-sec hover:text-white text-lg font-bold"
            >
              ×
            </button>
            <h3 className="font-heading font-black text-2xl text-white mb-2 uppercase">Welcome Back</h3>
            <p className="text-xs text-brand-text-sec mb-6">Access your workouts, meal plans, streaks, and attendance stats.</p>
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-text-sec mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Aman Sharma"
                  value={loginName}
                  onChange={(e) => setLoginName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-text-sec mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. aman@gmail.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary text-white"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary hover:bg-accent text-black font-bold py-3.5 rounded-xl transition-all mt-4 cursor-pointer"
              >
                Log In
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
