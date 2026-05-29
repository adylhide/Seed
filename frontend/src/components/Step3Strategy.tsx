import { useState, useRef, useEffect } from 'react';

interface StrategyProps {
  data: { title: string; description: string; milestones: string[] };
  onNext: () => void;
  onBack: () => void;
}

interface DynamicFramework {
  title: string;
  directive: string;
  description: string;
}

export default function Step3Strategy({ data, onNext, onBack }: StrategyProps) {
  const [loading, setLoading] = useState<boolean>(true);
  
  const [velocityFramework, setVelocityFramework] = useState<DynamicFramework | null>(null);
  const [safeguardFramework, setSafeguardFramework] = useState<DynamicFramework | null>(null);

  const [selectedVector, setSelectedVector] = useState<'velocity' | 'philosophy' | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasReadToBottom, setHasReadToBottom] = useState(false);
  const [strategyConfirmed, setStrategyConfirmed] = useState(false);
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simulating a brief "AI analysis" phase for UX feel without the API dependency
    const timer = setTimeout(() => {
      setVelocityFramework({
        title: "High-Velocity Execution Matrix",
        directive: "Optimize for rapid deployment and iterative feedback loops.",
        description: `Prioritize the core milestones for ${data.title || 'the project'} to achieve a functional prototype within the first sprint. Minimize architectural overhead by utilizing modular components and automated deployment pipelines. Focus on 'feature-complete' over 'pixel-perfect' to gather early user data.`
      });

      setSafeguardFramework({
        title: "Defensive Quality & Risk Buffer",
        directive: "Prioritize structural integrity and security at every layer.",
        description: `Implement a rigorous testing suite and security auditing for ${data.title || 'the project'}. Ensure all data transformations are validated and that the system architecture follows strict isolation principles. This strategy builds a robust foundation that scales safely, preventing technical debt from accumulating during the growth phase.`
      });

      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, [data.title, data.description]);

  // Screen layout observer: Auto-approves reading validation if no overflow layout scrollbar exists
  useEffect(() => {
    if (isModalOpen && scrollContainerRef.current) {
      const el = scrollContainerRef.current;
      const isScrollable = el.scrollHeight > el.clientHeight;
      if (!isScrollable) {
        setHasReadToBottom(true);
      }
    }
  }, [isModalOpen, selectedVector]);

  const handleScroll = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const reachedBottom = el.scrollHeight - el.scrollTop <= el.clientHeight + 8;
    if (reachedBottom) {
      setHasReadToBottom(true);
    }
  };

  const openBriefing = (vector: 'velocity' | 'philosophy') => {
    setSelectedVector(vector);
    setHasReadToBottom(false); 
    setIsModalOpen(true);
    setStrategyConfirmed(false);
  };

  const activeFramework = selectedVector === 'velocity' ? velocityFramework : safeguardFramework;

  if (loading) {
    return (
      <div className="animate-fade-in py-20 text-center space-y-4 max-w-md mx-auto">
        <div className="w-8 h-8 border-2 border-[#306D29] border-t-transparent rounded-full animate-spin mx-auto" />
        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#306D29]/60 block">
          Compiling Live AI Vectors...
        </span>
      </div>
    );
  }

  return (
    <div className="animate-fade-in space-y-8 max-w-md mx-auto relative">
      <div className="space-y-2 text-center">
        <span className="text-[10px] font-bold tracking-[0.2em] text-[#306D29]/50 uppercase">Phase 03 / Strategy Formulation</span>
        <h2 className="text-3xl font-light tracking-tight text-[#306D29]">Analyze Sandbox Counsel.</h2>
      </div>

      <div className="space-y-4">
        {velocityFramework && (
          <div 
            onClick={() => openBriefing('velocity')}
            className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer ${
              selectedVector === 'velocity' && strategyConfirmed
                ? 'bg-[#E7E1B1]/30 border-[#306D29]' : 'bg-white/40 border-white/60 hover:border-[#306D29]/50'
            }`}
          >
            <div className="flex items-start space-x-3.5">
              <div className={`mt-0.5 w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                selectedVector === 'velocity' && strategyConfirmed ? 'bg-[#306D29]' : 'border-[#306D29]/70'
              }`}>
                {selectedVector === 'velocity' && strategyConfirmed && <div className="w-1.5 h-1.5 bg-[#FBF5DD] rounded-full" />}
              </div>
              <div>
                <span className="text-[9px] font-bold uppercase text-[#306D29]/50 block">AI Stream Node 01</span>
                <p className="text-xs text-[#306D29] font-semibold">{velocityFramework.title}</p>
              </div>
            </div>
          </div>
        )}

        {safeguardFramework && (
          <div 
            onClick={() => openBriefing('philosophy')}
            className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer ${
              selectedVector === 'philosophy' && strategyConfirmed
                ? 'bg-[#E7E1B1]/30 border-[#306D29]' : 'bg-white/40 border-white/60 hover:border-[#306D29]/50'
            }`}
          >
            <div className="flex items-start space-x-3.5">
              <div className={`mt-0.5 w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                selectedVector === 'philosophy' && strategyConfirmed ? 'bg-[#306D29]' : 'border-[#306D29]/70'
              }`}>
                {selectedVector === 'philosophy' && strategyConfirmed && <div className="w-1.5 h-1.5 bg-[#FBF5DD] rounded-full" />}
              </div>
              <div>
                <span className="text-[9px] font-bold uppercase text-[#306D29]/50 block">AI Stream Node 02</span>
                <p className="text-xs text-[#306D29] font-semibold">{safeguardFramework.title}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex space-x-3 text-xs font-semibold uppercase tracking-widest">
        <button onClick={onBack} className="w-1/3 py-3.5 rounded-xl border border-[#306D29]/30 text-[#306D29]/70 hover:bg-white/40">
          ← Back
        </button>
        <button
          onClick={onNext}
          disabled={!strategyConfirmed}
          className={`w-2/3 py-3.5 rounded-xl transition-all ${
            !strategyConfirmed ? 'bg-[#E7E1B1]/40 text-[#306D29]/40 cursor-not-allowed' : 'bg-[#306D29] text-[#FBF5DD]'
          }`}
        >
          Initialize Dashboard →
        </button>
      </div>

      {/* POPUP MODAL */}
      {isModalOpen && activeFramework && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-md animate-fade-in">
          {/* ADJUSTED: Replaced max-w-xl with max-w-[606px] to precisely widen the layout footprint by exactly 30px */}
          <div className="w-full max-w-[606px] bg-[#FBF5DD] border-2 border-[#E7E1B1] rounded-3xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden transform scale-100 transition-all duration-300 animate-modal-pop">
            
            {/* Header branding info */}
            <div className="p-6 pb-4 border-b border-[#E7E1B1] bg-white/40 flex items-center justify-between">
              <div>
                <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-[#306D29]/60 block mb-0.5">
                  {selectedVector === 'velocity' ? 'Execution Matrix Node 01' : 'Risk Quality Node 02'}
                </span>
                <h3 className="text-lg font-bold text-[#306D29] tracking-tight">{activeFramework.title}</h3>
              </div>
              <button 
                onClick={() => { setIsModalOpen(false); setSelectedVector(null); }}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#306D29]/50 hover:bg-[#306D29]/10 transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Scrollable Main Content Container */}
            <div 
              ref={scrollContainerRef} 
              onScroll={handleScroll} 
              className="p-6 overflow-y-auto grow space-y-5 text-sm text-[#306D29]/80 custom-scrollbar"
            >
              <div className="bg-white/70 border border-[#E7E1B1]/60 rounded-xl p-4 font-semibold text-[#306D29] shadow-2xs italic leading-relaxed">
                "{activeFramework.directive}"
              </div>
              
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#306D29]/50 block">Strategic Blueprint Breakdown</span>
                <p className="text-xs font-medium leading-relaxed text-[#306D29]/90 bg-white/30 border border-[#E7E1B1]/30 rounded-xl p-4 shadow-3xs">
                  {activeFramework.description}
                </p>
              </div>
            </div>

            {/* Action Bar Footer */}
            <div className="p-4 bg-white/50 border-t border-[#E7E1B1] flex items-center justify-between gap-4">
              <button 
                onClick={() => { setIsModalOpen(false); setSelectedVector(null); }} 
                className="px-5 py-3 text-xs font-bold text-red-700/70 hover:bg-red-50 rounded-xl transition-colors uppercase tracking-wider"
              >
                Cancel
              </button>
              
              <button
                disabled={!hasReadToBottom}
                onClick={() => { setStrategyConfirmed(true); setIsModalOpen(false); }}
                className={`px-6 py-3 text-xs font-bold uppercase tracking-widest rounded-xl shadow-xs transition-all duration-200 active:scale-98 ${
                  hasReadToBottom 
                    ? 'bg-[#306D29] text-[#FBF5DD] hover:bg-[#306D29]/90 cursor-pointer' 
                    : 'bg-[#E7E1B1]/60 text-[#306D29]/30 cursor-not-allowed'
                }`}
              >
                {hasReadToBottom ? 'Accept Strategy ✓' : 'Scroll Content to Unlock ↓'}
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}