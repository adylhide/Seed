import React, { useRef, useEffect, useMemo } from 'react';
import type { ProjectData } from '../../src/types';

interface Step1Props {
  data: ProjectData;
  setData: (data: ProjectData) => void;
  onNext: () => void;
}

export default function Step1Goal({ data, setData, onNext }: Step1Props) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-stretches the textarea box downward based on text volume
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [data.description]);

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
    setData({ ...data, description: e.target.value });
  };

  // Compute live local metrics to fill the right column contextually
  const analytics = useMemo(() => {
    const titleLen = data.title.trim().length;
    const descLen = data.description.trim().length;
    const wordCount = data.description.trim().split(/\s+/).filter(Boolean).length;

    let clarityRating = "Awaiting Input";
    let clarityColor = "text-[#306D29]/40";
    if (descLen > 0) {
      if (wordCount < 5) {
        clarityRating = "Surface Level";
        clarityColor = "text-amber-700";
      } else if (wordCount <= 15) {
        clarityRating = "Optimal Alignment";
        clarityColor = "text-[#306D29]";
      } else {
        clarityRating = "High Complexity";
        clarityColor = "text-emerald-800 font-bold";
      }
    }

    return { titleLen, descLen, wordCount, clarityRating, clarityColor };
  }, [data.title, data.description]);

  const isFormValid = data.title.trim().length > 0 && data.description.trim().length > 0;

  return (
    // Expanded the max-width bounding box from max-w-md to max-w-2xl to comfortably hold both columns
    <div className="animate-fade-in space-y-8 max-w-2xl mx-auto block">
      
      {/* Header Context */}
      <div className="space-y-2 text-center">
        <span className="text-[10px] font-bold tracking-[0.2em] text-[#306D29]/50 uppercase">
          Phase 01 / Alignment
        </span>
        <h2 className="text-3xl font-light tracking-tight text-[#306D29]">
          Plant your primary focus.
        </h2>
        <p className="text-xs text-[#306D29]/60 max-w-xs mx-auto leading-relaxed">
          Strip away the noise. Define one clear, overarching pursuit you intend to manifest.
        </p>
      </div>

      {/* Main Container - Swapped to a responsive side-by-side split grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full rounded-3xl border border-white/60 bg-white/40 shadow-xs p-6 md:p-8 backdrop-blur-md transition-all duration-300">
        
        {/* LEFT COLUMN: Input Forms (Occupies 2/3 space) */}
        <div className="md:col-span-2 space-y-6">
          {/* Field 1: Title Input */}
          <div className="space-y-2">
            <label className="text-[9px] font-bold uppercase tracking-widest text-[#306D29]/60 block">
              Blueprint Title
            </label>
            <input
              type="text"
              placeholder="e.g., Q2 Core Engine Rewrite"
              value={data.title}
              onChange={(e) => setData({ ...data, title: e.target.value })}
              className="w-full text-sm font-medium text-[#306D29] bg-white/50 border border-[#306D29]/20 rounded-xl px-4 py-3 placeholder-[#306D29]/30 focus:outline-none focus:border-[#306D29] focus:bg-white/80 transition-all"
            />
          </div>

          {/* Field 2: Adjustable Philosophy Box */}
          <div className="space-y-2">
            <label className="text-[9px] font-bold uppercase tracking-widest text-[#306D29]/60 block">
              Core Purpose & Philosophy
            </label>
            <div className="relative w-full">
              <textarea
                ref={textareaRef}
                rows={3}
                placeholder="Why must this exist? State its value in one deep breath..."
                value={data.description}
                onChange={handleDescriptionChange}
                className="w-full text-xs font-medium text-[#306D29]/80 bg-white/50 border border-[#306D29]/20 rounded-xl px-4 py-3 placeholder-[#306D29]/30 focus:outline-none focus:border-[#306D29] focus:bg-white/80 transition-all resize-none overflow-hidden min-h-[96px] leading-relaxed"
              />
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Live Metadata Analytics Dashboard (Occupies 1/3 space) */}
        {/* This completely neutralizes the awkward empty side space with modular, sleek stats */}
        <div className="md:col-span-1 rounded-2xl border border-[#E7E1B1]/40 bg-[#E7E1B1]/10 p-4 flex flex-col justify-between space-y-4 text-[10px]">
          <div className="space-y-3">
            <span className="text-[9px] font-bold uppercase tracking-wider text-[#306D29]/50 block border-b border-[#306D29]/10 pb-1.5">
              Blueprint Metrics
            </span>
            
            <div className="flex justify-between items-center">
              <span className="text-[#306D29]/60 font-medium">Title Weight:</span>
              <span className="font-mono text-[#306D29] font-bold">{analytics.titleLen} ch</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-[#306D29]/60 font-medium">Philosophy Density:</span>
              <span className="font-mono text-[#306D29] font-bold">{analytics.descLen} ch</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-[#306D29]/60 font-medium">Token Length:</span>
              <span className="font-mono text-[#306D29] font-bold">{analytics.wordCount} words</span>
            </div>
          </div>

          <div className="bg-white/60 rounded-xl p-3 border border-white/80 space-y-1">
            <span className="text-[8px] font-bold uppercase tracking-wider text-[#306D29]/40 block">
              Alignment Status
            </span>
            <span className={`text-xs font-semibold tracking-tight block transition-colors ${analytics.clarityColor}`}>
              {analytics.clarityRating}
            </span>
          </div>
        </div>

      </div>

      {/* Action Controller */}
      <div className="pt-2">
        <button
          onClick={() => isFormValid && onNext()}
          disabled={!isFormValid}
          className={`w-full py-4 text-xs font-bold uppercase tracking-widest rounded-xl shadow-xs transition-all ${
            isFormValid
              ? 'bg-[#306D29] text-[#FBF5DD] hover:bg-[#306D29]/90 hover:scale-[1.01] active:scale-[0.99] cursor-pointer'
              : 'bg-[#E7E1B1]/40 text-[#306D29]/40 cursor-not-allowed'
          }`}
        >
          Establish Milestones →
        </button>
      </div>

    </div>
  );
}