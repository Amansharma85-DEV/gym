"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { Award, Star, CalendarDays, Loader2, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";

export default function Trainers({ isMobile }: { isMobile: boolean }) {
  const { isLoggedIn, bookTrainer, trainerBookings } = useApp();
  const [selectedTrainer, setSelectedTrainer] = useState<{ id: string; name: string } | null>(null);
  
  // Booking Form states
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("09:00 AM");
  const [bookingNotes, setBookingNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const trainersList = [
    {
      id: "t1",
      name: "Marcus Steel",
      role: "Head Coach & Bodybuilder",
      image: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=600",
      rating: "4.9",
      experience: "8 Years",
      specialization: "Hypertrophy & Strength Conditioning",
      certificates: ["IFBB Pro Card", "NASM Certified Personal Trainer"],
    },
    {
      id: "t2",
      name: "Serena Thorne",
      role: "Yoga & Recovery Specialist",
      image: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?q=80&w=600",
      rating: "5.0",
      experience: "6 Years",
      specialization: "Mind-Muscle Flow & Joint Rehab",
      certificates: ["RYT-500 Yoga Alliance", "Peak Pilates Certified"],
    },
    {
      id: "t3",
      name: "Viktor Novak",
      role: "Strength & CrossFit Lead",
      image: "https://images.unsplash.com/photo-1605296867304-46d5465a25f1?q=80&w=600",
      rating: "4.8",
      experience: "10 Years",
      specialization: "Olympic Lifting & Powerlifting",
      certificates: ["CrossFit Level 3 Trainer", "USAW Sports Performance Coach"],
    },
    {
      id: "t4",
      name: "Elena Rostova",
      role: "Fat Loss & HIIT Coach",
      image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=600",
      rating: "4.9",
      experience: "5 Years",
      specialization: "High-Intensity Weight Loss",
      certificates: ["ACE Group Fitness Instructor", "Precision Nutrition L1"],
    },
  ];

  const handleBookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTrainer || !bookingDate || !bookingTime) return;

    setIsSubmitting(true);

    setTimeout(() => {
      bookTrainer(
        selectedTrainer.id,
        selectedTrainer.name,
        bookingDate,
        bookingTime,
        bookingNotes
      );
      
      setIsSubmitting(false);
      setBookingSuccess(true);
      
      confetti({
        particleCount: 80,
        spread: 50,
        origin: { y: 0.8 }
      });

      setTimeout(() => {
        setBookingSuccess(false);
        setSelectedTrainer(null);
        setBookingDate("");
        setBookingNotes("");
      }, 2000);
    }, 1500);
  };

  return (
    <section id="trainers" className="py-20 bg-brand-bg relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
            <span className="text-[10px] uppercase tracking-widest font-black text-primary">ELITE COACHES</span>
          </div>
          <h2 className="font-heading font-black text-4xl uppercase tracking-tight text-white leading-tight">
            Train with the <span className="text-primary">Professionals</span>
          </h2>
          <p className="text-xs text-brand-text-sec">
            Book a one-on-one session with our certified champions. Available for online planning or in-club workouts.
          </p>
        </div>

        {/* Trainers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trainersList.map((trainer) => (
            <div
              key={trainer.id}
              className="glass-panel rounded-2xl overflow-hidden border border-white/5 shadow-xl hover:border-primary/20 group transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Image */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={trainer.image}
                    alt={trainer.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-transparent to-transparent"></div>
                  
                  {/* Rating badge */}
                  <div className="absolute top-4 right-4 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 text-xs font-bold text-primary flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-primary stroke-none" />
                    {trainer.rating}
                  </div>
                </div>

                {/* Info */}
                <div className="p-5 space-y-3">
                  <div>
                    <h3 className="text-lg font-black font-heading text-white">{trainer.name}</h3>
                    <div className="text-xs text-primary font-bold">{trainer.role}</div>
                  </div>

                  <div className="space-y-1.5 border-t border-white/5 pt-3">
                    <div className="text-xs text-brand-text-sec flex justify-between">
                      <span>Experience:</span>
                      <span className="text-white font-bold">{trainer.experience}</span>
                    </div>
                    <div className="text-xs text-brand-text-sec flex justify-between">
                      <span>Specialization:</span>
                      <span className="text-white font-bold text-right max-w-[150px] truncate">{trainer.specialization}</span>
                    </div>
                  </div>

                  {/* Certificates */}
                  <div className="space-y-1 border-t border-white/5 pt-3">
                    <div className="text-[10px] uppercase font-bold text-brand-text-sec tracking-wider mb-1 flex items-center gap-1">
                      <Award className="w-3.5 h-3.5 text-primary" /> Certifications
                    </div>
                    {trainer.certificates.map((cert, idx) => (
                      <div key={idx} className="text-[10px] text-white flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-primary"></span>
                        {cert}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-5 pt-0">
                <button
                  onClick={() => {
                    if (isLoggedIn) {
                      setSelectedTrainer({ id: trainer.id, name: trainer.name });
                    } else {
                      // Trigger login notification / toggle
                      alert("Please log in first using the 'Sign In' button at the top right.");
                    }
                  }}
                  className="w-full bg-white/5 hover:bg-primary hover:text-black border border-white/10 hover:border-transparent font-bold text-xs py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <CalendarDays className="w-4 h-4" />
                  Book Appointment
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Booking Appointment Modal */}
      {selectedTrainer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4">
          <div className="w-full max-w-md glass-panel bg-brand-sec p-8 rounded-2xl border border-white/10 shadow-2xl relative">
            <button
              onClick={() => setSelectedTrainer(null)}
              className="absolute top-4 right-4 text-brand-text-sec hover:text-white text-lg font-bold"
            >
              ×
            </button>

            {bookingSuccess ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-12 h-12 rounded-full bg-brand-success/15 border border-brand-success text-brand-success flex items-center justify-center mx-auto animate-bounce">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-black text-xl text-white uppercase tracking-tight">Appointment Set!</h3>
                <p className="text-xs text-brand-text-sec">A confirmation notification has been sent. Prepare for your session!</p>
              </div>
            ) : (
              <div>
                <h3 className="font-heading font-black text-xl text-white mb-1 uppercase tracking-tight">Schedule Coach Session</h3>
                <p className="text-xs text-brand-text-sec mb-6">Book a 1-on-1 personal session with <span className="text-primary font-bold">{selectedTrainer.name}</span>.</p>
                
                <form onSubmit={handleBookSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-text-sec mb-1">Select Date</label>
                    <input
                      type="date"
                      required
                      min={new Date().toISOString().split("T")[0]}
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-primary text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-text-sec mb-1">Choose Session Time</label>
                    <select
                      value={bookingTime}
                      onChange={(e) => setBookingTime(e.target.value)}
                      className="w-full bg-brand-sec border border-white/10 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-primary text-white"
                    >
                      <option>09:00 AM - 10:00 AM</option>
                      <option>11:00 AM - 12:00 PM</option>
                      <option>02:00 PM - 03:00 PM</option>
                      <option>04:00 PM - 05:00 PM</option>
                      <option>06:00 PM - 07:00 PM</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-text-sec mb-1">Notes / Goals for session</label>
                    <textarea
                      placeholder="e.g. Focus on chest press forms, or fat loss cardio advice..."
                      value={bookingNotes}
                      onChange={(e) => setBookingNotes(e.target.value)}
                      rows={3}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-primary text-white resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-accent disabled:bg-primary/50 text-black font-bold py-3.5 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 text-xs uppercase"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Scheduling...
                      </>
                    ) : (
                      "Confirm Booking"
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
