import React, { useState } from 'react';
import { generateSkinRoutine } from './services/geminiService';
import Quiz from './components/Quiz';
import RoutineStepCard from './components/RoutineStepCard';
import IngredientChat from './components/IngredientChat';
import { AppView, QuizState, RoutineData } from './types';
import { SparklesIcon, SunIcon, MoonIcon, LoaderIcon, ArrowRightIcon } from './components/Icons';

function App() {
  const [view, setView] = useState<AppView>(AppView.WELCOME);
  const [routine, setRoutine] = useState<RoutineData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleQuizSubmit = async (answers: QuizState) => {
    setView(AppView.LOADING);
    setError(null);
    try {
      const data = await generateSkinRoutine(answers);
      setRoutine(data);
      setView(AppView.RESULTS);
    } catch (err) {
      console.error(err);
      setError("We encountered an issue determining your routine. Please check your connection and try again.");
      setView(AppView.WELCOME);
    }
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.currentTarget;
    target.style.display = 'none';
    if (target.parentElement) {
        target.parentElement.classList.add('bg-stone-200');
        target.parentElement.classList.remove('bg-stone-100');
        // Add a fallback icon or text if needed via CSS, or just keep it as a colored placeholder
    }
  };

  const renderContent = () => {
    switch (view) {
      case AppView.WELCOME:
        return (
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[70vh] animate-fade-in-up">
            {/* Left Content */}
            <div className="flex flex-col items-start text-left">
              <div className="inline-flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm border border-stone-200 mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
                </span>
                <span className="text-xs font-semibold tracking-wide uppercase text-stone-500">AI-Powered Dermatology</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-serif font-medium text-stone-900 mb-6 leading-[1.1]">
                Skincare decoded, <br/>
                <span className="italic text-teal-800">just for you.</span>
              </h1>
              
              <p className="text-lg text-stone-600 mb-10 leading-relaxed font-light max-w-lg">
                Stop guessing with your skin. Derma-AI analyzes your unique profile to build a personalized, product-neutral routine grounded in science.
              </p>
              
              <button
                onClick={() => setView(AppView.QUIZ)}
                className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white transition-all duration-200 bg-stone-900 rounded-full hover:bg-teal-800 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-900 w-full sm:w-auto"
              >
                Start Your Diagnosis
                <ArrowRightIcon className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>

              {error && (
                <div className="mt-8 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm w-full">
                  {error}
                </div>
              )}
              
              <div className="mt-12 flex gap-8 text-stone-400">
                 <div className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-teal-500"></div>
                    <span className="text-xs uppercase tracking-widest">100% Unbiased</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-teal-500"></div>
                    <span className="text-xs uppercase tracking-widest">Instant Results</span>
                 </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative hidden lg:block h-[600px] w-full">
                <div className="absolute inset-0 bg-stone-100 rounded-[3rem] rotate-3 transform transition-transform hover:rotate-2"></div>
                <div className="absolute inset-0 rounded-[3rem] overflow-hidden shadow-2xl bg-white">
                    <img 
                        src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1000&auto=format&fit=crop" 
                        alt="Skincare aesthetic" 
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                        onError={(e) => {
                            // Fallback to a very reliable simple texture if the main one fails
                            e.currentTarget.src = "https://images.unsplash.com/photo-1556228720-1957be979c22?q=80&w=1000&auto=format&fit=crop";
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900/20 to-transparent"></div>
                </div>
                
                {/* Floating Badge */}
                <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl max-w-xs animate-fade-in-up delay-300">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="flex -space-x-2">
                             {[
                               "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&auto=format&fit=crop",
                               "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop",
                               "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop"
                             ].map((img, i) => (
                                 <div key={i} className="w-8 h-8 rounded-full bg-stone-200 border-2 border-white overflow-hidden">
                                    <img 
                                        src={img} 
                                        alt="user" 
                                        className="w-full h-full object-cover" 
                                        onError={(e) => e.currentTarget.style.display = 'none'}
                                    />
                                    {/* Fallback colored circle if image fails */}
                                    <div className="w-full h-full bg-stone-300"></div>
                                 </div>
                             ))}
                        </div>
                        <span className="text-xs font-bold text-stone-600">10k+ Analyses</span>
                    </div>
                    <p className="text-xs text-stone-400 leading-tight">"Finally a routine that actually makes sense for my sensitive skin."</p>
                </div>
            </div>
          </div>
        );

      case AppView.QUIZ:
        return <Quiz onSubmit={handleQuizSubmit} />;

      case AppView.LOADING:
        return (
          <div className="flex flex-col items-center justify-center min-h-[60vh] animate-fade-in-up">
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-teal-100 rounded-full blur-xl opacity-50 animate-pulse"></div>
              <div className="relative w-24 h-24 bg-white rounded-full shadow-xl flex items-center justify-center border border-stone-100">
                 <LoaderIcon className="w-10 h-10 text-teal-600 animate-spin" />
              </div>
            </div>
            <h3 className="text-3xl font-serif text-stone-800 mb-3">Analyzing your profile</h3>
            <p className="text-stone-500 font-light text-lg">Consulting dermatological guidelines...</p>
          </div>
        );

      case AppView.RESULTS:
        if (!routine) return null;
        return (
          <div className="space-y-12 animate-fade-in-up pb-12">
            {/* Summary Section */}
            <div className="bg-stone-900 rounded-[2.5rem] shadow-2xl shadow-stone-200 overflow-hidden relative text-white">
              <div className="absolute inset-0 bg-stone-800">
                <img 
                    src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2570&auto=format&fit=crop" 
                    className="w-full h-full object-cover opacity-20 mix-blend-overlay"
                    alt="Background texture"
                    onError={handleImageError}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-stone-900 via-stone-900/90 to-transparent"></div>
              </div>

              <div className="relative z-10 p-8 md:p-16 max-w-4xl">
                <div className="inline-flex items-center gap-2 mb-6">
                    <div className="w-2 h-2 rounded-full bg-teal-400"></div>
                    <span className="text-teal-100 text-xs font-bold uppercase tracking-widest">
                        Assessment Complete
                    </span>
                </div>
                <h2 className="text-4xl md:text-6xl font-serif mb-6 leading-tight">
                    Your skin is <span className="text-teal-300 italic">{routine.skinType}</span>.
                </h2>
                <p className="text-stone-300 text-lg md:text-xl leading-relaxed font-light mb-8 max-w-2xl">
                    {routine.summary}
                </p>
                <button 
                    onClick={() => setView(AppView.WELCOME)} 
                    className="text-sm text-stone-400 hover:text-white font-medium transition-colors border-b border-transparent hover:border-white pb-1 inline-block"
                >
                    Retake Analysis
                </button>
              </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-8 items-start">
              {/* Routine Columns */}
              <div className="lg:col-span-8 space-y-8">
                {/* Morning */}
                <div className="bg-white rounded-3xl shadow-sm border border-stone-100 overflow-hidden">
                  <div className="bg-amber-50/50 p-8 border-b border-stone-100 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-amber-100/50 shadow-sm rounded-2xl text-amber-600">
                        <SunIcon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-serif text-stone-800">Morning Routine</h3>
                        <p className="text-stone-500 text-sm font-medium">Protect & Glow</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-8">
                    {routine.morning.map((step, idx) => (
                      <RoutineStepCard key={`am-${idx}`} step={step} index={idx} isLast={idx === routine.morning.length - 1} />
                    ))}
                  </div>
                </div>

                {/* Evening */}
                <div className="bg-white rounded-3xl shadow-sm border border-stone-100 overflow-hidden">
                  <div className="bg-indigo-50/30 p-8 border-b border-stone-100 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-indigo-100/50 shadow-sm rounded-2xl text-indigo-600">
                        <MoonIcon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-serif text-stone-800">Evening Routine</h3>
                        <p className="text-stone-500 text-sm font-medium">Repair & Renew</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-8">
                    {routine.evening.map((step, idx) => (
                      <RoutineStepCard key={`pm-${idx}`} step={step} index={idx} isLast={idx === routine.evening.length - 1} />
                    ))}
                  </div>
                </div>

                 {/* Weekly */}
                 {routine.weekly.length > 0 && (
                  <div className="bg-teal-900 rounded-3xl overflow-hidden p-8 text-white shadow-xl relative">
                    <img 
                        src="https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?q=80&w=2670&auto=format&fit=crop"
                        className="absolute inset-0 w-full h-full object-cover opacity-10 mix-blend-overlay"
                        alt="Water texture"
                        onError={handleImageError}
                    />
                    <div className="absolute top-0 right-0 p-32 bg-teal-500 rounded-full blur-3xl opacity-20 -mr-16 -mt-16"></div>
                    
                    <h3 className="text-2xl font-serif mb-6 relative z-10 flex items-center gap-2">
                        <SparklesIcon className="w-5 h-5 text-teal-300" />
                        Weekly Treatments
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-4 relative z-10">
                      {routine.weekly.map((step, idx) => (
                        <div key={idx} className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 hover:bg-white/15 transition-colors">
                           <h4 className="font-semibold text-lg mb-2">{step.productCategory}</h4>
                           <p className="text-sm text-teal-100 leading-relaxed opacity-90">{step.reason}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar: Chat */}
              <div className="lg:col-span-4 sticky top-6 space-y-6">
                <IngredientChat />
                
                <div className="relative overflow-hidden bg-[#FAF9F6] border border-stone-200 rounded-3xl p-6 text-center group">
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <img 
                            src="https://images.unsplash.com/photo-1509664158680-07c5032b513a?q=80&w=800&auto=format&fit=crop" 
                            className="w-full h-full object-cover opacity-10"
                            alt="Texture"
                            onError={handleImageError}
                        />
                    </div>
                    <div className="relative z-10">
                        <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-3">
                            <SparklesIcon className="w-5 h-5 text-teal-700" />
                        </div>
                        <p className="text-sm font-bold text-stone-800 mb-1">Consistency is Key</p>
                        <p className="text-xs text-stone-500 leading-relaxed px-2">
                            Results take time. Stick to your routine for at least 4-6 weeks to see noticeable changes.
                        </p>
                    </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 selection:bg-teal-200 selection:text-teal-900 font-sans">
      {/* Navbar */}
      <nav className="fixed w-full z-50 transition-all duration-300 bg-white/80 backdrop-blur-md border-b border-stone-200/50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div 
            className="flex items-center space-x-3 cursor-pointer group" 
            onClick={() => setView(AppView.WELCOME)}
          >
            <div className="bg-stone-900 text-white p-2 rounded-xl transition-transform group-hover:rotate-6 shadow-lg shadow-stone-200">
              <SparklesIcon className="w-5 h-5" />
            </div>
            <span className="font-serif font-bold text-xl tracking-tight text-stone-900">Derma-AI</span>
          </div>
          <div className="hidden md:block">
             <span className="text-[10px] font-bold tracking-[0.2em] text-stone-400 uppercase">Virtual Esthetician</span>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-32 pb-20">
        {renderContent()}
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col items-center">
           <div className="mb-4 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
             <div className="bg-stone-100 p-3 rounded-full">
                <SparklesIcon className="w-6 h-6 text-teal-600" />
             </div>
           </div>
          <p className="text-xs text-stone-400 max-w-2xl text-center leading-relaxed">
            <strong className="block text-stone-600 mb-2 uppercase tracking-widest text-[10px]">Medical Disclaimer</strong>
            Derma-AI is an artificial intelligence designed for informational purposes only. The recommendations provided are not medical advice, diagnosis, or treatment. Always seek the advice of a dermatologist or qualified healthcare provider with any questions you may have regarding a medical condition or skin concern.
          </p>
          <p className="mt-8 text-[10px] text-stone-300">© {new Date().getFullYear()} Derma-AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;