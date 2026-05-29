import { useState, useEffect } from 'react';
import ThreeSeedling from './ThreeSeedling';
import type { DashboardProps } from '../types';

export default function Step4Dashboard({ data, setData, onBack }: DashboardProps) {
  const [showCongratulatoryModal, setShowCongratulatoryModal] = useState<boolean>(false);
  const [hasTriggeredCongratz, setHasTriggeredCongratz] = useState<boolean>(false);
  
  const toggleMilestone = (idx: number) => {
    if (idx > 0 && !data.completedMilestones[idx - 1] && !data.completedMilestones[idx]) {
      return; 
    }

    const updatedMilestones = [...data.completedMilestones];
    const updatedTimestamps = [...data.completedAt];

    updatedMilestones[idx] = !updatedMilestones[idx];
    updatedTimestamps[idx] = updatedMilestones[idx] ? new Date().toLocaleDateString() : null;

    setData({
      ...data,
      completedMilestones: updatedMilestones,
      completedAt: updatedTimestamps
    });
  };

  const score = data.completedMilestones.filter(Boolean).length;
  const pct = Math.round((score / 3) * 100);

  // Safely track completion milestone triggers outside synchronous thread ticks
  useEffect(() => {
    if (pct === 100 && !hasTriggeredCongratz) {
      const token = setTimeout(() => {
        setShowCongratulatoryModal(true);
        setHasTriggeredCongratz(true);
      }, 20000); // FIXED: 20-second delay as requested
      return () => clearTimeout(token);
    } else if (pct < 100 && hasTriggeredCongratz) {
      const token = setTimeout(() => {
        setHasTriggeredCongratz(false);
      }, 0);
      return () => clearTimeout(token);
    }
  }, [pct, hasTriggeredCongratz]);

  // Pure Tailwind configuration mapping to eliminate inline styles entirely
  const widthClasses: Record<number, string> = {
    0: 'w-0',
    33: 'w-1/3',
    67: 'w-2/3',
    100: 'w-full'
  };
  const activeWidthClass = widthClasses[pct] || 'w-0';

  return (
    <div className="animate-fade-in space-y-6 max-w-lg mx-auto block">
      
      {/* Premium Glassmorphic Canvas Frame */}
      <div className="relative h-64 overflow-hidden rounded-2xl border border-white/80 bg-white/30 shadow-[0_8px_32px_0_rgba(231,225,177,0.12)] backdrop-blur-lg">
        <ThreeSeedling progressPercentage={pct} />
        <div className="absolute top-4 left-4 rounded-full bg-white/70 border border-[#E7E1B1]/40 px-2.5 py-1 text-[9px] font-bold tracking-widest text-[#306D29] uppercase backdrop-blur-md">
          Ecosystem Visualizer
        </div>
        <div className="absolute bottom-4 right-4 text-[9px] font-mono font-bold uppercase tracking-wider text-[#306D29]/50 bg-white/50 px-2 py-0.5 rounded-md">
          {score}/3 Settled
        </div>
      </div>

      {/* Glassmorphic Content Card Header */}
      <div className="rounded-2xl border border-white/60 bg-white/40 shadow-xs p-6 space-y-2.5 backdrop-blur-md">
        <div>
          <span className="text-[9px] font-bold uppercase tracking-widest text-[#306D29]/50">Primary Intention</span>
          <h2 className="text-2xl font-semibold text-[#306D29] tracking-tight mt-0.5">{data.title || "No Target Intention"}</h2>
        </div>
        <p className="text-xs text-[#306D29]/70 leading-relaxed pl-3 border-l border-[#306D29]/30 font-medium">
          {data.description || "No philosophy parameters declared."}
        </p>
      </div>

      {/* Analytics Glass Matrix Layout */}
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-2xl border border-white/60 bg-white/40 shadow-xs p-4 flex flex-col justify-between backdrop-blur-md">
          <span className="text-[9px] font-bold uppercase tracking-wider text-[#306D29]/40">Ecosystem Maturity</span>
          <div className="mt-2 flex items-baseline space-x-1.5">
            <span className="text-3xl font-light font-mono text-[#306D29]">{pct}%</span>
            <span className="text-[10px] text-[#306D29]/60 font-semibold uppercase tracking-wider">Matured</span>
          </div>
          <div className="w-full h-1 bg-[#E7E1B1]/50 rounded-full overflow-hidden mt-3">
            <div className={`h-full bg-[#306D29] transition-all duration-1000 ${activeWidthClass}`} />
          </div>
        </div>

        <div className="rounded-2xl border border-white/60 bg-white/40 shadow-xs p-4 flex flex-col justify-between backdrop-blur-md">
          <span className="text-[9px] font-bold uppercase tracking-wider text-[#306D29]/40">Velocity Tracking</span>
          <div className="mt-2">
            <span className="text-xs font-semibold text-[#306D29] block">
              {score === 3 ? "🌱 Sequence Complete" : `Focusing: Step 0${score + 1}`}
            </span>
            <span className="text-[10px] text-[#306D29]/50 block mt-0.5 leading-tight">
              {score === 3 ? "All parameters met." : "Future sequences locked to protect mental bandwidth."}
            </span>
          </div>
        </div>
      </div>

      {/* Purpose-Driven Linear Track */}
      <div className="space-y-2.5">
        {data.milestones.map((milestone, idx) => {
          const checked = data.completedMilestones[idx];
          const isLocked = idx > 0 && !data.completedMilestones[idx - 1] && !checked;

          return (
            <div 
              key={idx}
              onClick={() => !isLocked && toggleMilestone(idx)}
              className={`group flex items-center justify-between p-4 rounded-xl border transition-all duration-300 select-none ${
                isLocked 
                  ? 'opacity-25 bg-transparent border-dashed border-[#E7E1B1] cursor-not-allowed' 
                  : checked 
                    ? 'bg-[#E7E1B1]/30 border-[#306D29] shadow-inner opacity-90 cursor-pointer' 
                    : 'bg-white/50 border-white/80 shadow-xs hover:border-[#306D29] hover:bg-white/80 cursor-pointer'
              }`}
            >
              <div className="flex items-center space-x-3.5">
                <span className={`text-[9px] font-mono font-bold w-5 h-5 flex items-center justify-center rounded-md ${
                  checked ? 'bg-[#306D29] text-[#FBF5DD]' : 'bg-[#E7E1B1] text-[#306D29]/60'
                }`}>
                  0{idx + 1}
                </span>

                <div className="w-4 h-4 rounded-full border flex items-center justify-center transition-all">
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                    checked ? 'bg-[#306D29] border-[#306D29]' : 'border-[#306D29]/70 bg-transparent'
                  }`}>
                    {checked && (
                      <svg className="w-2.5 h-2.5 text-[#FBF5DD]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </div>

                <span className={`text-xs font-semibold tracking-wide transition-all ${
                  checked ? 'line-through text-[#306D29]/40' : 'text-[#306D29]'
                }`}>
                  {milestone || `Milestone Checkpoint ${idx + 1}`}
                </span>
              </div>

              {checked && data.completedAt[idx] && (
                <span className="text-[9px] font-mono font-bold bg-[#306D29]/10 text-[#306D29] px-2 py-0.5 rounded border border-[#306D29]/20 animate-fade-in">
                  {data.completedAt[idx]}
                </span>
              )}
              {isLocked && (
                <span className="text-[8px] font-mono uppercase tracking-wider text-[#306D29]/40 px-2 py-0.5 bg-black/5 rounded">
                  Queued
                </span>
              )}
            </div>
          );
        })}
      </div>

      <div className="text-center pt-2">
        <button 
          onClick={onBack} 
          className="text-[9px] font-bold uppercase tracking-widest text-[#306D29]/40 hover:text-[#306D29] transition-colors cursor-pointer border-b border-transparent hover:border-[#306D29] pb-0.5"
        >
          ← Adjust Configuration Parameters
        </button>
      </div>

      {/* BIG SCREEN POP-UP MODAL OVERLAY CONTAINER */}
      {showCongratulatoryModal && (
        // CHANGED: Replaced bg-slate-900/50 with bg-transparent to clear the grey overlay tint completely
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-transparent backdrop-blur-md animate-fade-in overflow-hidden">
          
          {/* Internal floating structural decorations */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
            <span className="absolute text-3xl animate-popper-1 opacity-0">🎉</span>
            <span className="absolute text-4xl animate-popper-2 opacity-0">✨</span>
            <span className="absolute text-2xl animate-popper-3 opacity-0">🌱</span>
            <span className="absolute text-3xl animate-popper-4 opacity-0">🎉</span>
            <span className="absolute text-4xl animate-popper-5 opacity-0">✨</span>
          </div>

          {/* Spacious Pop-up Core Card Container */}
          <div className="w-full max-w-md bg-[#FBF5DD] border-2 border-[#306D29]/30 rounded-3xl p-8 text-center shadow-2xl transform scale-100 transition-all duration-300 animate-modal-pop relative">
            
            <div className="w-20 h-20 bg-[#306D29] rounded-full mx-auto flex items-center justify-center shadow-lg mb-5 animate-spin-slow">
              <span className="text-3xl text-[#FBF5DD]">🌳</span>
            </div>

            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-[#306D29]/60 block mb-1">
              Ecosystem Equilibrium Achieved
            </span>
            
            <h3 className="text-2xl font-bold text-[#306D29] tracking-tight mb-3">
              100% Sequence Complete!
            </h3>

            <p className="text-xs text-[#306D29]/70 leading-relaxed font-medium px-4 mb-8">
              Success! Every target blueprint checkpoint allocated for <strong className="text-[#306D29]">"{data.title || "this initiative"}"</strong> has been completed, logged, and integrated into your active workspace.
            </p>

            <button
              onClick={() => setShowCongratulatoryModal(false)}
              className="w-full py-3.5 bg-[#306D29] text-[#FBF5DD] text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-[#306D29]/90 active:scale-98 transition-all shadow-md cursor-pointer"
            >
              Return to Visualizer ✓
            </button>
          </div>

        </div>
      )}

    </div>
  );
}