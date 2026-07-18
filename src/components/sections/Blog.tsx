"use client";

import React, { useState } from "react";
import { Search, BookOpen, Clock, Calendar, ArrowRight } from "lucide-react";

export default function Blog() {
  const [selectedCat, setSelectedCat] = useState<"All" | "Nutrition" | "Training" | "Recovery">("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeArticle, setActiveArticle] = useState<any | null>(null);

  const categories: ("All" | "Nutrition" | "Training" | "Recovery")[] = [
    "All", "Nutrition", "Training", "Recovery"
  ];

  const articles = [
    {
      id: "a1",
      title: "Scientific Protein Loading for Hypertrophy",
      category: "Nutrition",
      desc: "Learn precisely how to calculate leucine levels and protein distribution weights to optimize post-workout muscle protein synthesis.",
      image: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=600",
      readTime: "6 min read",
      date: "Jul 15, 2026",
      content: "Hypertrophy training requires an deliberate approach to protein intake. It is not just about the total grams per day, but rather the distribution of protein across your meals. Aim for 20-40g of high-quality protein containing at least 3g of leucine every 3 to 4 hours. Leucine triggers the mTOR pathway which calibrates muscle repair. Supplementing with whey protein isolate directly post-workout speeds up absorption times, feeding muscle tissues when they are most receptive to rebuilding.",
    },
    {
      id: "a2",
      title: "Tabata vs. HIIT: Cardiovascular Thresholds",
      category: "Training",
      desc: "Unpack the physiological performance differences between Tabata protocol intervals and standard HIIT conditioning.",
      image: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=600",
      readTime: "5 min read",
      date: "Jul 12, 2026",
      content: "While both Tabata and HIIT are forms of interval training, they operate on different physiological scales. Tabata is an ultra-intense protocol: 20 seconds of maximum effort followed by 10 seconds of rest, repeated 8 times for a total of 4 minutes. True Tabata demands working at 170% of your VO2 max. Traditional HIIT, on the other hand, usually features longer intervals (e.g., 60 seconds on, 60 seconds off) working at 85-95% of maximum heart rate. Both increase mitochondrial density, but Tabata builds extreme anaerobic threshold rapidly.",
    },
    {
      id: "a3",
      title: "Passive vs. Active Recovery Protocols",
      category: "Recovery",
      desc: "Why sitting on the couch is slowing your gains. Explore active recovery metrics like mobility flows and low-intensity walks.",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=600",
      readTime: "4 min read",
      date: "Jul 10, 2026",
      content: "Recovery is where muscle growth actually happens. Passive recovery (complete rest) has its place, but active recovery is often superior for clearing metabolic waste products. Low-intensity steady-state (LISS) exercise like a light 30-minute walk or a gentle yoga flow promotes blood flow to damaged muscle tissues without adding mechanical stress. The increased circulation delivers oxygen and nutrients, reducing DOMS (Delayed Onset Muscle Soreness) and restoring range of motion faster.",
    },
  ];

  const filteredArticles = articles.filter((art) => {
    const matchesCat = selectedCat === "All" || art.category === selectedCat;
    const matchesSearch = art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         art.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <section id="blog" className="py-20 bg-brand-bg relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
            <span className="text-[10px] uppercase tracking-widest font-black text-primary">FITNESS BLOG</span>
          </div>
          <h2 className="font-heading font-black text-4xl uppercase tracking-tight text-white leading-tight">
            Latest Fitness <span className="text-primary">Articles</span>
          </h2>
          <p className="text-xs text-brand-text-sec">
            Expand your knowledge with scientific tips on hypertrophy training, metabolic rates, active recovery, and performance nutrition.
          </p>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 max-w-5xl mx-auto">
          {/* Categories Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`px-4 py-2 rounded-xl font-bold text-xs cursor-pointer transition-all ${
                  selectedCat === cat
                    ? "bg-primary text-black"
                    : "glass-panel text-brand-text-sec hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs focus:outline-none focus:border-primary text-white"
            />
            <Search className="w-4 h-4 text-brand-text-sec absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {filteredArticles.map((art) => (
            <div
              key={art.id}
              onClick={() => setActiveArticle(art)}
              className="glass-panel rounded-2xl overflow-hidden border border-white/5 shadow-xl hover:border-primary/20 group cursor-pointer transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Image */}
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={art.image}
                    alt={art.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-3 left-3 bg-primary text-black font-extrabold text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-md">
                    {art.category}
                  </span>
                </div>

                {/* Info content */}
                <div className="p-5 space-y-3">
                  <div className="flex gap-4 text-[10px] text-brand-text-sec">
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-primary" /> {art.date}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-primary" /> {art.readTime}</span>
                  </div>
                  <h3 className="text-base font-black font-heading text-white line-clamp-2 group-hover:text-primary transition-colors">
                    {art.title}
                  </h3>
                  <p className="text-xs text-brand-text-sec line-clamp-3 leading-relaxed">
                    {art.desc}
                  </p>
                </div>
              </div>

              {/* Read button */}
              <div className="p-5 pt-0">
                <div className="text-xs font-bold text-white flex items-center gap-1 group-hover:text-primary transition-colors">
                  Read Article <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Reading Article Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4">
          <div className="w-full max-w-2xl glass-panel bg-brand-sec p-8 rounded-2xl border border-white/10 shadow-2xl relative max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setActiveArticle(null)}
              className="absolute top-4 right-4 text-brand-text-sec hover:text-white text-lg font-bold"
            >
              ×
            </button>

            <span className="text-[10px] uppercase tracking-widest font-black text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-md">
              {activeArticle.category}
            </span>

            <h3 className="font-heading font-black text-2xl text-white uppercase tracking-tight mt-4 mb-2">
              {activeArticle.title}
            </h3>

            <div className="flex gap-4 text-[10px] text-brand-text-sec mb-6">
              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-primary" /> {activeArticle.date}</span>
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-primary" /> {activeArticle.readTime}</span>
            </div>

            <div className="rounded-xl overflow-hidden aspect-video mb-6 border border-white/10">
              <img
                src={activeArticle.image}
                alt={activeArticle.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-4">
              <p className="text-sm font-bold text-white italic border-l-4 border-primary pl-4 py-1.5 bg-white/5 rounded-r-xl">
                {activeArticle.desc}
              </p>
              <p className="text-sm text-brand-text-sec leading-relaxed pt-2">
                {activeArticle.content}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
