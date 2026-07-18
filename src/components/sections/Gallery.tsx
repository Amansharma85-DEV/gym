"use client";

import React, { useState } from "react";
import { Image as ImageIcon, Film, Maximize2 } from "lucide-react";

export default function Gallery() {
  const [mediaType, setMediaType] = useState<"photos" | "videos">("photos");
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  const photos = [
    { src: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=600", aspect: "aspect-square" },
    { src: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=600", aspect: "aspect-4/3" },
    { src: "https://images.unsplash.com/photo-1637666062717-1c6bcab4a4ed?q=80&w=600", aspect: "aspect-3/4" },
    { src: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=600", aspect: "aspect-video" },
    { src: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=600", aspect: "aspect-square" },
    { src: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?q=80&w=600", aspect: "aspect-4/3" },
  ];

  const videos = [
    { src: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=600", title: "Iron Lift Showcase", duration: "1:24" },
    { src: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=600", title: "CrossFit Intensity", duration: "2:10" },
    { src: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?q=80&w=600", title: "Morning Yoga Flow", duration: "3:45" },
  ];

  return (
    <section id="gallery" className="py-20 bg-brand-sec relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
            <span className="text-[10px] uppercase tracking-widest font-black text-primary">CLUB GALLERY</span>
          </div>
          <h2 className="font-heading font-black text-4xl uppercase tracking-tight text-white leading-tight">
            Take a Look <span className="text-primary">Inside</span>
          </h2>
          <p className="text-xs text-brand-text-sec">
            Browse our premium facility space, state of the art training zones, recovery rooms, and group sessions.
          </p>
        </div>

        {/* Media Toggle Tabs */}
        <div className="flex justify-center gap-3 mb-10">
          <button
            onClick={() => setMediaType("photos")}
            className={`flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
              mediaType === "photos"
                ? "bg-primary border-transparent text-black neon-glow-primary"
                : "glass-panel text-brand-text-sec border-white/10 hover:text-white"
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            Photos
          </button>
          <button
            onClick={() => setMediaType("videos")}
            className={`flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
              mediaType === "videos"
                ? "bg-primary border-transparent text-black neon-glow-primary"
                : "glass-panel text-brand-text-sec border-white/10 hover:text-white"
            }`}
          >
            <Film className="w-4 h-4" />
            Videos
          </button>
        </div>

        {/* Media Grid */}
        {mediaType === "photos" ? (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {photos.map((photo, idx) => (
              <div
                key={idx}
                onClick={() => setLightboxSrc(photo.src)}
                className="relative rounded-2xl overflow-hidden group border border-white/5 cursor-pointer shadow-lg break-inside-avoid"
              >
                <img
                  src={photo.src}
                  alt="Club Workout Photo"
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center border border-primary/40">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {videos.map((vid, idx) => (
              <div
                key={idx}
                onClick={() => setLightboxSrc(vid.src)}
                className="glass-panel rounded-2xl overflow-hidden border border-white/5 shadow-xl hover:border-primary/20 group cursor-pointer transition-all duration-300"
              >
                <div className="relative aspect-video">
                  <img
                    src={vid.src}
                    alt={vid.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-primary text-black flex items-center justify-center font-bold shadow-lg border border-black/10 group-hover:scale-110 transition-transform">
                      ▶
                    </div>
                  </div>
                  <span className="absolute bottom-2 right-2 bg-black/75 px-2 py-0.5 rounded text-[10px] font-bold text-white">
                    {vid.duration}
                  </span>
                </div>
                <div className="p-4">
                  <h4 className="text-sm font-bold text-white group-hover:text-primary transition-colors">{vid.title}</h4>
                  <p className="text-[10px] text-brand-text-sec mt-0.5">High Performance Demo</p>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Lightbox Modal */}
      {lightboxSrc && (
        <div
          onClick={() => setLightboxSrc(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 cursor-zoom-out"
        >
          <div className="max-w-4xl max-h-[85vh] relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            <img
              src={lightboxSrc}
              alt="Lightbox View"
              className="w-full h-full object-contain"
            />
            <button
              onClick={() => setLightboxSrc(null)}
              className="absolute top-4 right-4 text-white hover:text-primary font-bold text-2xl bg-black/60 w-10 h-10 rounded-full flex items-center justify-center border border-white/10"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
