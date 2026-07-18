"use client";

import React, { useState, useEffect } from "react";

// Shells & Portals
import DesktopLayout from "@/components/layout/DesktopLayout";
import MobileLayout from "@/components/layout/MobileLayout";
import CheckoutModal from "@/components/portal/CheckoutModal";
import Dashboard from "@/components/portal/Dashboard";
import AdminPanel from "@/components/portal/AdminPanel";

// Landing Sections
import Hero from "@/components/sections/Hero";
import TrustedBrands from "@/components/sections/TrustedBrands";
import About from "@/components/sections/About";
import Programs from "@/components/sections/Programs";
import Classes from "@/components/sections/Classes";
import Membership from "@/components/sections/Membership";
import Trainers from "@/components/sections/Trainers";
import Calculators from "@/components/sections/Calculators";
import Transformation from "@/components/sections/Transformation";
import Testimonials from "@/components/sections/Testimonials";
import Gallery from "@/components/sections/Gallery";
import Blog from "@/components/sections/Blog";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";

import { Dumbbell, Loader2 } from "lucide-react";

export default function Page() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<string>("landing"); // "landing" | "dashboard" | "admin"

  // 1. Detect screen size (Client-side only to prevent Next.js hydration issues)
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024); // Mobile layout for viewports < 1024px (tablet/phone)
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    
    // Simulate premium loader
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timer);
    };
  }, []);

  // 2. Anchor scrolling for landing page
  const handleScrollToSection = (sectionId: string) => {
    setActiveTab("landing");
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        const offset = 80; // height of sticky header
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }, 100);
  };

  // Loading Screen
  if (isMobile === null || isLoading) {
    return (
      <div className="fixed inset-0 z-50 bg-[#050505] flex flex-col items-center justify-center space-y-4 select-none">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-2xl animate-spin-slow">
          <Dumbbell className="w-9 h-9 text-black stroke-[2.5]" />
        </div>
        <div className="text-center">
          <h2 className="font-heading font-black text-xl uppercase tracking-widest text-white">
            ELITE<span className="text-primary">FIT</span> CLUB
          </h2>
          <p className="text-[10px] text-brand-text-sec uppercase tracking-widest mt-1">
            Transform Your Body. Transform Your Life.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-primary font-bold pt-6">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Calibrating premium environment...</span>
        </div>
      </div>
    );
  }

  // --- MOBILE EXPERIENCE ---
  if (isMobile) {
    return (
      <MobileLayout
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onScrollToSection={handleScrollToSection}
      >
        {activeTab === "landing" ? (
          <div className="space-y-12">
            <Hero isMobile={true} onScrollToSection={handleScrollToSection} />
            <About isMobile={true} />
            <Programs isMobile={true} />
            <Classes isMobile={true} />
            <Membership />
            <Trainers isMobile={true} />
            <Calculators />
            <Transformation />
            <Testimonials />
            <FAQ />
            <Contact />
          </div>
        ) : activeTab === "dashboard" ? (
          <Dashboard isMobile={true} />
        ) : (
          <AdminPanel isMobile={true} />
        )}
        <CheckoutModal />
      </MobileLayout>
    );
  }

  // --- DESKTOP EXPERIENCE ---
  return (
    <DesktopLayout
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      onScrollToSection={handleScrollToSection}
    >
      {activeTab === "landing" ? (
        <div className="space-y-0">
          <Hero isMobile={false} onScrollToSection={handleScrollToSection} />
          <TrustedBrands />
          <About isMobile={false} />
          <Programs isMobile={false} />
          <Classes isMobile={false} />
          <Membership />
          <Trainers isMobile={false} />
          <Calculators />
          <Transformation />
          <Testimonials />
          <Gallery />
          <Blog />
          <FAQ />
          <Contact />
        </div>
      ) : activeTab === "dashboard" ? (
        <Dashboard isMobile={false} />
      ) : (
        <AdminPanel isMobile={false} />
      )}
      <CheckoutModal />
    </DesktopLayout>
  );
}
