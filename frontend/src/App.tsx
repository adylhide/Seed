import { useState, lazy, Suspense } from 'react';
const Step1Goal = lazy(() => import('./components/Step1Goal'));
const Step2Milestones = lazy(() => import('./components/Step2Milestones'));
const Step3Strategy = lazy(() => import('./components/Step3Strategy'));
const Step4Dashboard = lazy(() => import('./components/Step4Dashboard'));
import type { ProjectData } from './types';

export default function App() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  // A unique key that we bump whenever we want a 100% decontaminated slate
  const [resetCounter, setResetCounter] = useState<number>(0);

  const [projectData, setProjectData] = useState<ProjectData>({
    title: '',
    description: '',
    milestones: ['', '', ''],
    completedMilestones: [false, false, false],
    completedAt: [null, null, null]
  });

  const resetProject = () => {
    if (window.confirm("Clear this project blueprint?")) {
      localStorage.clear();
      sessionStorage.clear();

      setProjectData({
        title: '',
        description: '',
        milestones: ['', '', ''],
        completedMilestones: [false, false, false],
        completedAt: [null, null, null]
      });
      setCurrentStep(1);
      setResetCounter(prev => prev + 1); // Bumping this forces a total refresh of child components
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between p-6 md:p-12 max-w-2xl mx-auto">
      <header className="flex justify-between items-center border-b border-[#E7E1B1] pb-6 mb-8">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-[#306D29]">seedling.</h1>
          <p className="text-[10px] uppercase tracking-widest opacity-50">Local TS Sandbox</p>
        </div>
        <div className="flex space-x-2">
          {([1, 2, 3, 4] as const).map((step) => (
            <button
              key={step}
              disabled={step > currentStep && !projectData.title}
              onClick={() => setCurrentStep(step)}
              className={`w-7 h-7 text-xs rounded-full flex items-center justify-center transition-all ${
                currentStep === step ? 'bg-[#306D29] text-[#FBF5DD]' : 'bg-[#E7E1B1] text-[#306D29] opacity-60'
              }`}
            >
              {step}
            </button>
          ))}
        </div>
      </header>

      <main className="grow flex flex-col justify-center">
        <Suspense fallback={<div className="flex justify-center p-12 opacity-50 text-[10px] uppercase tracking-widest">Initialising Core...</div>}>
          {currentStep === 1 && <Step1Goal data={projectData} setData={setProjectData} onNext={() => setCurrentStep(2)} />}
          {currentStep === 2 && <Step2Milestones data={projectData} setData={setProjectData} onNext={() => setCurrentStep(3)} onBack={() => setCurrentStep(1)} />}
          
          {/* ADDING THE key PROP HERE AUTOMATICALLY KILLS OLD CACHED DATA COALESCING */}
          {currentStep === 3 && (
            <Step3Strategy 
              key={`strategy-core-${resetCounter}`} 
              data={projectData} 
              onNext={() => setCurrentStep(4)} 
              onBack={() => setCurrentStep(2)} 
            />
          )}
          
          {currentStep === 4 && <Step4Dashboard data={projectData} setData={setProjectData} onBack={() => setCurrentStep(3)} />}
        </Suspense>
      </main>

      <footer className="mt-12 pt-6 border-t border-[#E7E1B1] flex justify-between items-center text-[10px] uppercase tracking-wider opacity-40">
        <span>Developer: Jinskiee</span>
        
        {/* FIXED: Conditional rendering ensures this block only injects into layout context on Step 4 */}
        {currentStep === 4 && (
          <button 
            onClick={resetProject} 
            className="hover:underline text-red-700 font-bold cursor-pointer transition-all animate-fade-in"
          >
            Purge Canvas
          </button>
        )}
      </footer>
    </div>
  );
}