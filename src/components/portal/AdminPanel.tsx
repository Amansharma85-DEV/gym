"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import {
  TrendingUp, Users, Ticket, Bell, ShieldCheck, QrCode, Trash2,Plus, CheckCircle
} from "lucide-react";

export default function AdminPanel({ isMobile }: { isMobile: boolean }) {
  const {
    memberRecords, coupons, addCoupon, deleteMember, simulateCheckIn, addNotification
  } = useApp();

  // Checkin states
  const [scanInput, setScanInput] = useState("");
  const [scanResult, setScanResult] = useState("");
  const [scanError, setScanError] = useState("");

  // Coupon states
  const [newCode, setNewCode] = useState("");
  const [newDiscount, setNewDiscount] = useState("20");
  const [newDesc, setNewDesc] = useState("");
  const [couponSuccess, setCouponSuccess] = useState("");

  // Broadcast states
  const [notifTitle, setNotifTitle] = useState("");
  const [notifDesc, setNotifDesc] = useState("");
  const [broadcastSuccess, setBroadcastSuccess] = useState("");

  const handleScanSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setScanResult("");
    setScanError("");
    if (!scanInput) return;

    const result = simulateCheckIn(scanInput);
    if (result.includes("Error")) {
      setScanError(result);
    } else {
      setScanResult(result);
      setScanInput("");
    }
  };

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponSuccess("");
    if (newCode && newDiscount) {
      addCoupon(newCode, parseInt(newDiscount), newDesc || `${newDiscount}% Promotional Discount`);
      setCouponSuccess(`Coupon code '${newCode.toUpperCase()}' created!`);
      setNewCode("");
      setNewDesc("");
    }
  };

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    setBroadcastSuccess("");
    if (notifTitle && notifDesc) {
      addNotification(notifTitle, notifDesc);
      setBroadcastSuccess("Notification broadcasted successfully!");
      setNotifTitle("");
      setNotifDesc("");
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-2 md:px-6 space-y-8">
      
      {/* Top Admin Summary Banner */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-primary/10 border border-primary/20 p-6 rounded-3xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-primary text-black flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6 stroke-[2]" />
          </div>
          <div>
            <h2 className="font-heading font-black text-xl text-white uppercase tracking-tight">Admin Operations</h2>
            <p className="text-xs text-brand-text-sec mt-0.5">Control pricing, check in members, build promo codes, and analyze reports.</p>
          </div>
        </div>
        <div className="text-xs text-primary font-bold bg-black/45 px-4 py-2 rounded-xl border border-white/5">
          Level: Executive Admin
        </div>
      </div>

      {/* Analytics Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* SVG Revenue Chart (8 cols) */}
        <div className="lg:col-span-8 glass-panel p-6 rounded-3xl border border-white/10 bg-brand-sec/40">
          <h4 className="text-xs font-bold uppercase tracking-wider text-primary mb-4 flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4" /> Gym Revenue Growth (H1 2026)
          </h4>

          {/* SVG Bar Chart */}
          <div className="relative w-full aspect-5/2 md:aspect-5/1.5 border border-white/5 p-4 rounded-2xl bg-black/20">
            <svg viewBox="0 0 500 150" className="w-full h-full">
              {/* Bars */}
              {/* Jan: ₹10L */}
              <rect x="50" y="90" width="40" height="40" rx="4" fill="rgba(255,255,255,0.1)" />
              <text x="70" y="142" fontSize="8" fill="#B3B3B3" textAnchor="middle">Jan</text>
              <text x="70" y="82" fontSize="8" fill="#FFF" textAnchor="middle" fontWeight="bold">₹10L</text>

              {/* Feb: ₹12L */}
              <rect x="120" y="80" width="40" height="50" rx="4" fill="rgba(255,255,255,0.1)" />
              <text x="140" y="142" fontSize="8" fill="#B3B3B3" textAnchor="middle">Feb</text>
              <text x="140" y="72" fontSize="8" fill="#FFF" textAnchor="middle" fontWeight="bold">₹12L</text>

              {/* Mar: ₹15L */}
              <rect x="190" y="68" width="40" height="62" rx="4" fill="rgba(255,255,255,0.1)" />
              <text x="210" y="142" fontSize="8" fill="#B3B3B3" textAnchor="middle">Mar</text>
              <text x="210" y="60" fontSize="8" fill="#FFF" textAnchor="middle" fontWeight="bold">₹15L</text>

              {/* Apr: ₹18L */}
              <rect x="260" y="55" width="40" height="75" rx="4" fill="rgba(255,255,255,0.1)" />
              <text x="280" y="142" fontSize="8" fill="#B3B3B3" textAnchor="middle">Apr</text>
              <text x="280" y="47" fontSize="8" fill="#FFF" textAnchor="middle" fontWeight="bold">₹18L</text>

              {/* May: ₹22L */}
              <rect x="330" y="40" width="40" height="90" rx="4" fill="rgba(255,255,255,0.1)" />
              <text x="350" y="142" fontSize="8" fill="#B3B3B3" textAnchor="middle">May</text>
              <text x="350" y="32" fontSize="8" fill="#FFF" textAnchor="middle" fontWeight="bold">₹22L</text>

              {/* Jun: ₹25L */}
              <rect x="400" y="28" width="40" height="102" rx="4" fill="#FF6B00" />
              <text x="420" y="142" fontSize="8" fill="#B3B3B3" textAnchor="middle">Jun</text>
              <text x="420" y="20" fontSize="8" fill="#FFF" textAnchor="middle" fontWeight="bold">₹25L</text>
            </svg>
          </div>
        </div>

        {/* Checkin Scanner Panel (4 cols) */}
        <div className="lg:col-span-4 glass-panel p-6 rounded-3xl border border-white/10 bg-brand-sec/80 flex flex-col justify-between">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-primary mb-2 flex items-center gap-1.5">
              <QrCode className="w-4 h-4" /> QR Check-in Simulator
            </h4>
            <p className="text-[10px] text-brand-text-sec leading-relaxed mb-4">Simulate reception biometric checkin. Input email or scan code (e.g. `MEMBER-AMAN-ELITE` or `dan@heavyiron.com`).</p>

            <form onSubmit={handleScanSubmit} className="space-y-3">
              <input
                type="text"
                required
                placeholder="VPA / QR string..."
                value={scanInput}
                onChange={(e) => setScanInput(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary text-white"
              />
              <button
                type="submit"
                className="w-full bg-primary hover:bg-accent text-black font-bold py-2.5 rounded-xl text-xs cursor-pointer uppercase"
              >
                Scan Code
              </button>
            </form>
          </div>

          <div className="mt-4 pt-3 border-t border-white/5 min-h-[50px]">
            {scanResult && <div className="text-[10.5px] font-bold text-brand-success p-2.5 bg-brand-success/15 border border-brand-success/35 rounded-xl">{scanResult}</div>}
            {scanError && <div className="text-[10.5px] font-bold text-red-400 p-2.5 bg-red-400/15 border border-red-400/35 rounded-xl">{scanError}</div>}
          </div>
        </div>

      </div>

      {/* Admin Operations Lists Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Members Management Table (8 cols) */}
        <div className="lg:col-span-8 glass-panel p-6 rounded-3xl border border-white/10 bg-brand-sec/40">
          <h4 className="text-xs font-bold uppercase tracking-wider text-primary mb-4 flex items-center gap-1.5">
            <Users className="w-4 h-4" /> Member Accounts Registry
          </h4>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-white/5 text-brand-text-sec font-bold">
                  <th className="pb-3 pr-2">Member</th>
                  <th className="pb-3 pr-2">Membership</th>
                  <th className="pb-3 pr-2">Checkins</th>
                  <th className="pb-3 pr-2">Join Date</th>
                  <th className="pb-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {memberRecords.map((m) => (
                  <tr key={m.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-3.5 pr-2">
                      <div className="font-bold text-white">{m.name}</div>
                      <div className="text-[10px] text-brand-text-sec mt-0.5">{m.email}</div>
                    </td>
                    <td className="py-3.5 pr-2">
                      <span className={`text-[9px] uppercase font-black px-2 py-0.5 rounded-md ${
                        m.status === "Active" ? "bg-brand-success/10 text-brand-success border border-brand-success/20" : "bg-white/5 text-brand-text-sec"
                      }`}>
                        {m.membership}
                      </span>
                    </td>
                    <td className="py-3.5 pr-2 text-white font-bold">{m.checkIns} visits</td>
                    <td className="py-3.5 pr-2 text-brand-text-sec">{m.joinDate}</td>
                    <td className="py-3.5 text-right">
                      <button
                        onClick={() => deleteMember(m.id)}
                        className="text-red-400 hover:text-red-300 p-1 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Coupons & Broadcasts column (4 cols) */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Coupon configurator */}
          <div className="glass-panel p-6 rounded-3xl border border-white/10 bg-brand-sec/40">
            <h4 className="text-xs font-bold uppercase tracking-wider text-primary mb-4 flex items-center gap-1.5">
              <Ticket className="w-4 h-4" /> Configure Promo Coupon
            </h4>

            <form onSubmit={handleCreateCoupon} className="space-y-3">
              <div>
                <label className="block text-[9px] font-bold uppercase tracking-wider text-brand-text-sec mb-1">Coupon Code</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. FITFREE50"
                  value={newCode}
                  onChange={(e) => setNewCode(e.target.value.toUpperCase())}
                  className="w-full bg-brand-sec border border-white/10 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[9px] font-bold uppercase tracking-wider text-brand-text-sec mb-1">Discount %</label>
                  <select
                    value={newDiscount}
                    onChange={(e) => setNewDiscount(e.target.value)}
                    className="w-full bg-brand-sec border border-white/10 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary text-white"
                  >
                    <option value="10">10%</option>
                    <option value="20">20%</option>
                    <option value="30">30%</option>
                    <option value="50">50%</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[9px] font-bold uppercase tracking-wider text-brand-text-sec mb-1">Description</label>
                  <input
                    type="text"
                    placeholder="e.g. 50% Off"
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    className="w-full bg-brand-sec border border-white/10 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary text-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-primary hover:bg-accent text-black font-bold py-2.5 rounded-xl text-xs cursor-pointer flex items-center justify-center gap-1.5 uppercase mt-2"
              >
                <Plus className="w-4 h-4" />
                Build Coupon
              </button>
            </form>

            {couponSuccess && (
              <div className="mt-3 text-[10px] text-brand-success font-semibold flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" /> {couponSuccess}
              </div>
            )}
          </div>

          {/* Alert broadcast sender */}
          <div className="glass-panel p-6 rounded-3xl border border-white/10 bg-brand-sec/40">
            <h4 className="text-xs font-bold uppercase tracking-wider text-primary mb-4 flex items-center gap-1.5">
              <Bell className="w-4 h-4" /> Broadcast Member Notification
            </h4>

            <form onSubmit={handleBroadcast} className="space-y-3">
              <div>
                <label className="block text-[9px] font-bold uppercase tracking-wider text-brand-text-sec mb-1">Alert Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Heavy Dumbells re-racked"
                  value={notifTitle}
                  onChange={(e) => setNotifTitle(e.target.value)}
                  className="w-full bg-brand-sec border border-white/10 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary text-white"
                />
              </div>

              <div>
                <label className="block text-[9px] font-bold uppercase tracking-wider text-brand-text-sec mb-1">Body Text</label>
                <textarea
                  required
                  rows={2}
                  placeholder="Notification message body..."
                  value={notifDesc}
                  onChange={(e) => setNotifDesc(e.target.value)}
                  className="w-full bg-brand-sec border border-white/10 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary text-white resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-white text-black hover:bg-primary hover:text-black font-bold py-2.5 rounded-xl text-xs cursor-pointer uppercase mt-2 transition-colors"
              >
                Send Alert
              </button>
            </form>

            {broadcastSuccess && (
              <div className="mt-3 text-[10px] text-brand-success font-semibold flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" /> {broadcastSuccess}
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
