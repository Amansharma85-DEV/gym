"use client";

import React, { useState } from "react";
import { Mail, Phone, Clock, MapPin, Send, MessageSquareCode } from "lucide-react";

export default function Contact() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && msg) {
      setFormSubmitted(true);
      setTimeout(() => {
        setFormSubmitted(false);
        setName("");
        setEmail("");
        setMsg("");
      }, 3000);
    }
  };

  const handleWhatsAppRedirect = () => {
    window.open("https://wa.me/15552345678?text=Hello%20Elite%20Fitness!%20I%20want%20to%20know%20more%20about%20your%20membership%20plans.", "_blank");
  };

  return (
    <section id="contact" className="py-20 bg-brand-bg relative">
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
            <span className="text-[10px] uppercase tracking-widest font-black text-primary">CONTACT US</span>
          </div>
          <h2 className="font-heading font-black text-4xl uppercase tracking-tight text-white leading-tight">
            Get in <span className="text-primary">Touch</span>
          </h2>
          <p className="text-xs text-brand-text-sec">
            Have questions or want to tour our luxury space? Drop us a line, check our hours, or initiate a chat.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-5xl mx-auto mb-16">
          {/* Left Column: Info card */}
          <div className="lg:col-span-5 bg-brand-sec border border-white/5 rounded-3xl p-6 md:p-8 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <h3 className="font-heading font-black text-xl text-white uppercase tracking-tight">Location & Info</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs text-white font-bold">Club Address</div>
                    <div className="text-xs text-brand-text-sec mt-0.5">12 Elite Blvd, Luxury District, Mumbai, India</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs text-white font-bold">Biometric Entry Hours</div>
                    <div className="text-xs text-brand-text-sec mt-0.5">Gym Floor: 24/7/365</div>
                    <div className="text-xs text-brand-text-sec">Reception: 06:00 AM - 10:00 PM</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs text-white font-bold">Phone Number</div>
                    <div className="text-xs text-brand-text-sec mt-0.5">+91 (555) 234-5678</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs text-white font-bold">Email Support</div>
                    <div className="text-xs text-brand-text-sec mt-0.5">club@elitefitness.com</div>
                  </div>
                </div>
              </div>
            </div>

            {/* WhatsApp Trigger */}
            <button
              onClick={handleWhatsAppRedirect}
              className="w-full bg-brand-success hover:bg-emerald-600 text-black font-black text-xs py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider shadow-lg shadow-emerald-500/10"
            >
              <MessageSquareCode className="w-4 h-4 fill-black stroke-none" />
              Chat on WhatsApp
            </button>
          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-7 glass-panel p-6 md:p-8 rounded-3xl border border-white/10 flex flex-col justify-between">
            {formSubmitted ? (
              <div className="text-center py-12 space-y-4 my-auto">
                <div className="w-12 h-12 rounded-full bg-brand-success/15 border border-brand-success text-brand-success flex items-center justify-center mx-auto animate-pulse">
                  ✓
                </div>
                <h3 className="font-heading font-black text-xl text-white uppercase tracking-tight">Message Received</h3>
                <p className="text-xs text-brand-text-sec">Thank you for writing. Our concierge will get back to you within 2 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-heading font-black text-xl text-white uppercase tracking-tight mb-4">Send a Message</h3>
                
                <div>
                  <label className="block text-[9px] font-bold uppercase tracking-wider text-brand-text-sec mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Aman Sharma"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-primary text-white"
                  />
                </div>

                <div>
                  <label className="block text-[9px] font-bold uppercase tracking-wider text-brand-text-sec mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. aman@gmail.com"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-primary text-white"
                  />
                </div>

                <div>
                  <label className="block text-[9px] font-bold uppercase tracking-wider text-brand-text-sec mb-1">Your Message</label>
                  <textarea
                    required
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                    rows={4}
                    placeholder="Type your message here..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-primary text-white resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-accent text-black font-black py-4 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 text-xs uppercase"
                >
                  <Send className="w-4 h-4" />
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Map Placeholder Card (visual beauty) */}
        <div className="w-full max-w-5xl mx-auto rounded-3xl overflow-hidden border border-white/10 shadow-2xl h-80 relative bg-brand-sec group select-none">
          <div className="absolute inset-0 bg-cover bg-center opacity-40 filter grayscale contrast-125" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1000')" }}></div>
          <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-transparent to-transparent"></div>
          
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-black/60 backdrop-blur-[2px]">
            <MapPin className="w-10 h-10 text-primary animate-bounce mb-3" />
            <h4 className="font-heading font-black text-lg text-white uppercase tracking-tight">Elite Fitness Club Mumbai</h4>
            <p className="text-xs text-brand-text-sec mt-1">12 Elite Blvd, Luxury District, Mumbai, MH 400001</p>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noreferrer"
              className="mt-4 bg-white text-black font-bold text-xs px-5 py-2.5 rounded-xl hover:bg-primary transition-colors cursor-pointer"
            >
              Get Directions on Map
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
