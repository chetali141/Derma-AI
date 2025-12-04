import React, { useState } from 'react';
import { QuizState } from '../types';
import { ArrowRightIcon } from './Icons';

interface QuizProps {
  onSubmit: (answers: QuizState) => void;
}

const Quiz: React.FC<QuizProps> = ({ onSubmit }) => {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<QuizState>({
    feel: '',
    concern: '',
    sensitivity: '',
  });

  const handleOptionSelect = (key: keyof QuizState, value: string) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
    setTimeout(() => {
        if (step < 3) {
          setStep(prev => prev + 1);
        } else {
          onSubmit({ ...answers, [key]: value });
        }
    }, 250);
  };

  const renderQuestion = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-8 animate-fade-in-up">
            <div className="space-y-2 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-serif text-stone-900">Let's start with the basics.</h2>
              <p className="text-lg text-stone-500 font-light">How does your skin feel 1 hour after washing, without any products?</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { 
                    label: "Tight & Rough", 
                    value: "Dry", 
                    desc: "Feels parched.", 
                    img: "https://images.unsplash.com/photo-1508737352327-0201d4a047c5?q=80&w=800&auto=format&fit=crop" 
                },
                { 
                    label: "Oily All Over", 
                    value: "Oily", 
                    desc: "Visible shine.", 
                    img: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&auto=format&fit=crop" 
                },
                { 
                    label: "Oily T-Zone", 
                    value: "Combination", 
                    desc: "Mixed feelings.", 
                    img: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=800&auto=format&fit=crop" 
                },
                { 
                    label: "Comfortable", 
                    value: "Normal", 
                    desc: "Just right.", 
                    img: "https://images.unsplash.com/photo-1490750967868-58cb75069ed6?q=80&w=800&auto=format&fit=crop" 
                },
              ].map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => handleOptionSelect('feel', opt.value)}
                  className={`relative overflow-hidden rounded-2xl border transition-all duration-300 group hover:-translate-y-1 hover:shadow-xl text-left h-full ${
                    answers.feel === opt.value 
                    ? 'border-teal-600 ring-2 ring-teal-600 ring-offset-2' 
                    : 'border-stone-200 bg-white hover:border-teal-300'
                  }`}
                >
                  <div className="h-32 w-full overflow-hidden">
                    <img 
                        src={opt.img} 
                        alt={opt.value} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                    />
                  </div>
                  <div className="p-4">
                      <span className={`block font-serif text-lg leading-tight mb-1 ${answers.feel === opt.value ? 'text-teal-900' : 'text-stone-800'}`}>
                          {opt.label}
                      </span>
                      <span className="text-xs text-stone-500 block">{opt.desc}</span>
                  </div>
                  {answers.feel === opt.value && (
                    <div className="absolute top-2 right-2 w-6 h-6 bg-teal-600 rounded-full flex items-center justify-center shadow-md">
                        <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-8 animate-fade-in-up">
            <div className="space-y-2 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-serif text-stone-900">What's your main goal?</h2>
              <p className="text-lg text-stone-500 font-light">We'll prioritize this in your custom routine.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { val: "Acne & Breakouts", img: "https://images.unsplash.com/photo-1596462502278-27bfdd403348?q=80&w=200&auto=format&fit=crop" },
                { val: "Dryness & Dehydration", img: "https://images.unsplash.com/photo-1535591273668-578e31182c4f?q=80&w=200&auto=format&fit=crop" },
                { val: "Fine Lines & Aging", img: "https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?q=80&w=200&auto=format&fit=crop" },
                { val: "Redness & Sensitivity", img: "https://images.unsplash.com/photo-1549480017-d76466a4b7e8?q=80&w=200&auto=format&fit=crop" },
                { val: "Dark Spots & Pigmentation", img: "https://images.unsplash.com/photo-1520186994231-6ea0019d8cc2?q=80&w=200&auto=format&fit=crop" },
                { val: "Dullness & Texture", img: "https://images.unsplash.com/photo-1601049541289-9b1b75b1e560?q=80&w=200&auto=format&fit=crop" }
              ].map((item) => (
                <button
                  key={item.val}
                  onClick={() => handleOptionSelect('concern', item.val)}
                  className={`flex items-center p-3 pr-5 rounded-2xl border transition-all duration-200 group hover:shadow-lg ${
                    answers.concern === item.val
                    ? 'border-teal-600 bg-teal-50' 
                    : 'border-stone-100 bg-white hover:border-teal-200'
                  }`}
                >
                  <div className="w-16 h-16 rounded-xl overflow-hidden mr-4 flex-shrink-0">
                      <img src={item.img} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 text-left">
                     <span className={`font-medium text-lg block ${answers.concern === item.val ? 'text-teal-900' : 'text-stone-700'}`}>{item.val}</span>
                  </div>
                  {answers.concern === item.val && <ArrowRightIcon className="w-5 h-5 text-teal-600" />}
                </button>
              ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-8 animate-fade-in-up">
            <div className="space-y-2 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-serif text-stone-900">Sensitivity Check</h2>
              <p className="text-lg text-stone-500 font-light">How reactive is your skin to new products?</p>
            </div>
            <div className="space-y-4">
              {[
                { label: "Not sensitive", value: "Resilient", sub: "My skin rarely reacts to products." },
                { label: "Somewhat sensitive", value: "Mildly Sensitive", sub: "I get occasional redness or stinging." },
                { label: "Very sensitive", value: "Very Sensitive", sub: "I have to be extremely careful with ingredients." },
              ].map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => handleOptionSelect('sensitivity', opt.value)}
                  className={`w-full p-6 rounded-2xl border-2 text-left transition-all duration-200 group hover:shadow-md ${
                    answers.sensitivity === opt.value
                    ? 'border-teal-600 bg-teal-50' 
                    : 'border-stone-100 bg-white hover:border-teal-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                     <div>
                        <span className={`block font-serif text-xl mb-1 ${answers.sensitivity === opt.value ? 'text-teal-900' : 'text-stone-800'}`}>{opt.label}</span>
                        <span className="text-stone-500 text-sm">{opt.sub}</span>
                     </div>
                     <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${answers.sensitivity === opt.value ? 'border-teal-600 bg-teal-600' : 'border-stone-200'}`}>
                        {answers.sensitivity === opt.value && <div className="w-2 h-2 bg-white rounded-full" />}
                     </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto w-full">
      {/* Progress Bar */}
      <div className="mb-12 flex items-center gap-4">
        <span className="text-xs font-bold tracking-widest text-stone-400 uppercase whitespace-nowrap">Step {step} of 3</span>
        <div className="h-1.5 flex-1 bg-stone-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-stone-900 rounded-full transition-all duration-500 ease-out" 
            style={{ width: `${(step / 3) * 100}%` }} 
          />
        </div>
      </div>
      
      {renderQuestion()}
    </div>
  );
};

export default Quiz;