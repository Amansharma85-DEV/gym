"use client";

import React, { useState, useEffect } from "react";
import { useApp } from "@/context/AppContext";
import { CreditCard, Check, Sparkles, Percent, ShieldCheck, Loader2 } from "lucide-react";
import confetti from "canvas-confetti";

export default function CheckoutModal() {
  const { activeCheckoutPlan, setCheckoutPlan, applyCoupon, purchaseMembership } = useApp();
  const [couponCode, setCouponCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState<number | null>(null);
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"card" | "upi" | "net" | "wallet">("card");
  
  // Card inputs
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  
  // UPI Input
  const [upiId, setUpiId] = useState("");

  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!activeCheckoutPlan) return null;

  const basePrice = activeCheckoutPlan.price;
  const discountAmount = discountPercent ? (basePrice * discountPercent) / 100 : 0;
  const gstAmount = parseFloat(((basePrice - discountAmount) * 0.18).toFixed(2)); // 18% GST
  const finalTotal = parseFloat((basePrice - discountAmount + gstAmount).toFixed(2));

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError("");
    setCouponSuccess("");
    if (!couponCode) return;

    const discount = applyCoupon(couponCode);
    if (discount) {
      setDiscountPercent(discount);
      setCouponSuccess(`Coupon applied! ${discount}% discount applied.`);
    } else {
      setCouponError("Invalid coupon code.");
      setDiscountPercent(null);
    }
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate network delay
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      
      // Fire confetti!
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 }
      });

      // Complete purchase in context
      setTimeout(() => {
        purchaseMembership(activeCheckoutPlan.name, finalTotal);
        setCheckoutPlan(null);
        setIsSuccess(false);
        setDiscountPercent(null);
        setCouponCode("");
        setCouponSuccess("");
      }, 2000);
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
      <div className="w-full max-w-xl glass-panel bg-brand-sec rounded-3xl overflow-hidden shadow-2xl border border-white/10 animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-accent px-6 py-5 flex items-center justify-between">
          <div>
            <h3 className="font-heading font-black text-xl text-black uppercase tracking-tight">Checkout Portal</h3>
            <p className="text-[11px] text-black/85 font-semibold">Premium Member Registration</p>
          </div>
          <button
            onClick={() => setCheckoutPlan(null)}
            className="text-black hover:text-white font-bold text-2xl"
          >
            ×
          </button>
        </div>

        {isSuccess ? (
          <div className="p-12 text-center flex flex-col items-center justify-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-brand-success/10 border border-brand-success text-brand-success flex items-center justify-center animate-bounce">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>
            <h3 className="font-heading font-black text-2xl text-white uppercase tracking-tight">Payment Approved!</h3>
            <p className="text-sm text-brand-text-sec">Welcome to the elite club. Activating your dashboard access...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2">
            
            {/* Left Side: Order Summary */}
            <div className="p-6 border-r border-white/5 bg-black/35 flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-primary mb-4">Registration Details</h4>
                <div className="p-3 bg-white/5 rounded-xl border border-white/5 mb-4">
                  <div className="text-sm font-bold text-white mb-0.5">{activeCheckoutPlan.name}</div>
                  <div className="text-xs text-brand-text-sec">Billing interval: {activeCheckoutPlan.duration}</div>
                </div>

                {/* Coupon Form */}
                <form onSubmit={handleApplyCoupon} className="space-y-2 mb-4">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-text-sec">Apply Coupon Code</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. ELITE30"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary text-white"
                    />
                    <button
                      type="submit"
                      className="bg-white/10 hover:bg-white/15 text-white text-xs font-bold px-3 py-2 rounded-xl transition-all flex items-center gap-1 cursor-pointer"
                    >
                      <Percent className="w-3.5 h-3.5" />
                      Apply
                    </button>
                  </div>
                  {couponError && <div className="text-[10px] font-bold text-red-400">{couponError}</div>}
                  {couponSuccess && <div className="text-[10px] font-bold text-brand-success">{couponSuccess}</div>}
                </form>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2 pt-4 border-t border-white/5">
                <div className="flex justify-between text-xs text-brand-text-sec">
                  <span>Base Price</span>
                  <span>₹{basePrice.toLocaleString("en-IN")}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-xs text-brand-success font-semibold">
                    <span>Discount ({discountPercent}%)</span>
                    <span>-₹{discountAmount.toLocaleString("en-IN")}</span>
                  </div>
                )}
                <div className="flex justify-between text-xs text-brand-text-sec">
                  <span>GST (18% inclusive)</span>
                  <span>₹{gstAmount.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-white/5">
                  <span>Total Amount</span>
                  <span className="text-primary">₹{finalTotal.toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>

            {/* Right Side: Payment Form */}
            <div className="p-6 flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-primary mb-4">Payment Method</h4>
                
                {/* Method selector tabs */}
                <div className="grid grid-cols-4 gap-1.5 mb-5 bg-white/5 p-1 rounded-xl">
                  {([
                    { id: "card", label: "Card" },
                    { id: "upi", label: "UPI" },
                    { id: "net", label: "Net" },
                    { id: "wallet", label: "Wallet" },
                  ] as const).map((method) => (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setPaymentMethod(method.id)}
                      className={`text-[10px] font-bold py-1.5 rounded-lg text-center cursor-pointer transition-all ${
                        paymentMethod === method.id ? "bg-white text-black" : "text-brand-text-sec hover:text-white"
                      }`}
                    >
                      {method.label}
                    </button>
                  ))}
                </div>

                <form onSubmit={handlePayment} className="space-y-4">
                  {paymentMethod === "card" && (
                    <div className="space-y-3">
                      <div>
                        <label className="block text-[9px] font-bold uppercase tracking-wider text-brand-text-sec mb-1">Card Number</label>
                        <input
                          type="text"
                          required
                          placeholder="4111 2222 3333 4444"
                          maxLength={19}
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, "").replace(/(.{4})/g, "$1 ").trim())}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-primary text-white"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[9px] font-bold uppercase tracking-wider text-brand-text-sec mb-1">Expiry (MM/YY)</label>
                          <input
                            type="text"
                            required
                            placeholder="12/29"
                            maxLength={5}
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value.replace(/\D/g, "").replace(/(.{2})/, "$1/").trim())}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-primary text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[9px] font-bold uppercase tracking-wider text-brand-text-sec mb-1">CVV</label>
                          <input
                            type="password"
                            required
                            placeholder="***"
                            maxLength={3}
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ""))}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-primary text-white"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === "upi" && (
                    <div>
                      <label className="block text-[9px] font-bold uppercase tracking-wider text-brand-text-sec mb-1">UPI ID (VPA)</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. aman@upi"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-primary text-white"
                      />
                      <p className="text-[10px] text-brand-text-sec mt-1.5">Supports Google Pay, PhonePe, Paytm, and BHIM UPI.</p>
                    </div>
                  )}

                  {paymentMethod === "net" && (
                    <div>
                      <label className="block text-[9px] font-bold uppercase tracking-wider text-brand-text-sec mb-1">Select Bank</label>
                      <select className="w-full bg-brand-sec border border-white/10 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-primary text-white">
                        <option>State Bank of India</option>
                        <option>HDFC Bank</option>
                        <option>ICICI Bank</option>
                        <option>Axis Bank</option>
                      </select>
                    </div>
                  )}

                  {paymentMethod === "wallet" && (
                    <div>
                      <label className="block text-[9px] font-bold uppercase tracking-wider text-brand-text-sec mb-1">Select Wallet</label>
                      <select className="w-full bg-brand-sec border border-white/10 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-primary text-white">
                        <option>Paytm Wallet</option>
                        <option>PhonePe Wallet</option>
                        <option>Amazon Pay</option>
                      </select>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full bg-primary hover:bg-accent disabled:bg-primary/50 text-black font-black py-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 mt-4 text-xs tracking-wider uppercase"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Processing Securely...
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4" />
                        Pay ₹{finalTotal.toLocaleString("en-IN")}
                      </>
                    )}
                  </button>
                </form>
              </div>

              <div className="text-[9.5px] text-brand-text-sec text-center flex items-center justify-center gap-1.5 mt-4 border-t border-white/5 pt-3">
                <ShieldCheck className="w-4 h-4 text-brand-success" />
                SSL Encrypted 256-bit Secure Checkout
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
