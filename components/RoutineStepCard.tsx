import React from 'react';
import { RoutineStep } from '../types';
import { DropletIcon } from './Icons';

interface RoutineStepCardProps {
  step: RoutineStep;
  index: number;
  isLast?: boolean;
}

const RoutineStepCard: React.FC<RoutineStepCardProps> = ({ step, index, isLast }) => {
  return (
    <div className="relative pl-10 sm:pl-12">
      {/* Timeline Line */}
      {!isLast && (
        <div className="absolute left-[11px] sm:left-[14px] top-8 bottom-0 w-[2px] bg-stone-200"></div>
      )}
      
      {/* Timeline Dot */}
      <div className="absolute left-0 top-1 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white border-2 border-stone-900 flex items-center justify-center z-10 shadow-sm">
        <span className="text-[10px] sm:text-xs font-bold text-stone-900">{index + 1}</span>
      </div>
      
      <div className="mb-10 group">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-2">
            <h4 className="font-serif font-bold text-stone-800 text-xl group-hover:text-teal-800 transition-colors">
              {step.productCategory}
            </h4>
            <span className="text-xs font-bold text-stone-400 tracking-wider uppercase mt-1 sm:mt-0">
              {step.stepName}
            </span>
        </div>
        
        <p className="text-stone-600 text-sm mb-4 leading-relaxed font-light">
          {step.reason}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {step.keyIngredients.map((ing, i) => (
            <span 
              key={i} 
              className="inline-flex items-center text-[11px] font-semibold text-teal-800 bg-teal-50 px-3 py-1.5 rounded-full border border-teal-100 transition-colors hover:bg-teal-100 cursor-default"
            >
              <DropletIcon className="w-3 h-3 mr-1.5 text-teal-600" />
              {ing}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoutineStepCard;