import type { StepPropsWithBack } from '../src/types';

export default function Step2Milestones({ data, setData, onNext, onBack }: StepPropsWithBack) {
  const handleEdit = (idx: number, val: string) => {
    const fresh = [...data.milestones];
    fresh[idx] = val;
    setData({ ...data, milestones: fresh });
  };

  // Helper utility to safely count words in a string
  const getWordCount = (text: string) => {
    return text.trim().split(/\s+/).filter(Boolean).length;
  };

  // Keep validation strict: Invalid if empty OR if any milestone surpasses 17 words
  const isInvalid = data.milestones.some(m => {
    const trimmed = m.trim();
    return !trimmed || getWordCount(trimmed) > 17;
  });

  return (
    <div className="animate-fade-in space-y-8 max-w-md mx-auto">
      <div className="space-y-2 text-center">
        <span className="text-[10px] font-bold tracking-[0.2em] text-[#306D29]/50 uppercase">Phase 02 / Sequence</span>
        <h2 className="text-3xl font-light tracking-tight text-[#306D29]">Map the execution line.</h2>
        <p className="text-xs text-[#306D29]/60 max-w-xs mx-auto leading-relaxed">
          Break the journey into exactly three linear macro-checkpoints. Keep each goal bite-sized.
        </p>
      </div>

      {/* Glassmorphic Stepper Card Stack */}
      <div className="bg-white/40 border border-white/60 shadow-[0_8px_32px_0_rgba(231,225,177,0.15)] backdrop-blur-md rounded-2xl p-6 space-y-3.5">
        {data.milestones.map((milestone, idx) => {
          const wordCount = getWordCount(milestone);
          const isOverLimit = wordCount > 17;

          return (
            <div key={idx} className="space-y-1">
              <div className={`flex items-start space-x-3.5 bg-white/40 border p-3 px-4 rounded-xl transition-all focus-within:bg-white/70 ${
                isOverLimit 
                  ? 'border-red-400 focus-within:border-red-500' 
                  : 'border-[#E7E1B1]/30 focus-within:border-[#306D29]/50'
              }`}>
                <span className="text-[10px] font-mono font-bold bg-[#E7E1B1] text-[#306D29]/70 px-2 py-0.5 rounded-md shrink-0 mt-0.5">
                  0{idx + 1}
                </span>
                
                {/* Upgraded text field to fluid auto-expanding textarea */}
                <textarea
                  rows={1}
                  placeholder={`Milestone checkpoint ${idx + 1}`}
                  value={milestone}
                  onChange={(e) => {
                    // Stretches height vertically to instantly show entire text content
                    e.target.style.height = 'auto';
                    e.target.style.height = `${e.target.scrollHeight}px`;
                    handleEdit(idx, e.target.value);
                  }}
                  onFocus={(e) => {
                    // Re-calculates explicit spacing bounds on input focus
                    e.target.style.height = 'auto';
                    e.target.style.height = `${e.target.scrollHeight}px`;
                  }}
                  className="grow bg-transparent outline-none text-sm text-[#306D29] placeholder-[#306D29]/30 font-medium resize-none overflow-hidden leading-relaxed self-center"
                />
              </div>

              {/* Dynamic Word Counter Feedback HUD */}
              {wordCount > 0 && (
                <div className="flex justify-end px-2 text-[9px] font-mono">
                  <span className={isOverLimit ? 'text-red-600 font-bold' : 'text-[#306D29]/40'}>
                    {wordCount}/17 words {isOverLimit && '— Limit Exceeded'}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex space-x-3 text-xs font-semibold uppercase tracking-widest">
        <button 
          onClick={onBack} 
          className="w-1/3 py-3.5 rounded-xl border border-[#306D29]/30 text-[#306D29]/70 hover:bg-white/40 transition-all cursor-pointer active:scale-95 text-center"
        >
          ← Back
        </button>
        <button
          onClick={onNext}
          disabled={isInvalid}
          className={`w-2/3 py-3.5 rounded-xl transition-all shadow-xs text-center ${
            isInvalid 
              ? 'bg-[#E7E1B1]/40 text-[#306D29]/40 cursor-not-allowed' 
              : 'bg-[#306D29] text-[#FBF5DD] hover:bg-[#306D29]/90 hover:scale-[1.01] active:scale-[0.99] cursor-pointer'
          }`}
        >
          Sprout Ecosystem
        </button>
      </div>
    </div>
  );
}