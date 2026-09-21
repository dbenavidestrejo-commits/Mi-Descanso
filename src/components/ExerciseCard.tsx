import React from 'react';
import { Play, Wind, Eye, Activity, Sparkles, Clock, MapPin } from 'lucide-react';
import { BreakExercise } from '../types';

interface ExerciseCardProps {
  exercise: BreakExercise;
  onSelect: (exercise: BreakExercise) => void;
}

export const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise, onSelect }) => {
  const getCategoryIcon = () => {
    switch (exercise.category) {
      case 'respiracion':
        return <Wind className="w-4 h-4 text-emerald-600" />;
      case 'descanso-visual':
        return <Eye className="w-4 h-4 text-cyan-600" />;
      case 'estiramiento':
        return <Activity className="w-4 h-4 text-amber-600" />;
      case 'express':
      default:
        return <Sparkles className="w-4 h-4 text-teal-600" />;
    }
  };

  const getCategoryLabel = () => {
    switch (exercise.category) {
      case 'respiracion':
        return 'Respiración Guiada';
      case 'descanso-visual':
        return 'Descanso Visual';
      case 'estiramiento':
        return 'Estiramiento Físico';
      case 'express':
      default:
        return 'Pausa Express HUV';
    }
  };

  return (
    <div 
      id={`exercise-card-${exercise.id}`}
      className="group bg-white rounded-2xl border border-slate-200/90 hover:border-teal-400/80 p-5 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
    >
      <div>
        {/* Category & duration chip */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold border ${exercise.badgeColor}`}>
            {getCategoryIcon()}
            {getCategoryLabel()}
          </span>

          <span className="flex items-center gap-1 text-[11px] font-mono font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
            <Clock className="w-3 h-3 text-slate-500" />
            1 Minuto
          </span>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-slate-900 group-hover:text-teal-700 transition-colors tracking-tight leading-snug">
          {exercise.title}
        </h3>

        {/* Description */}
        <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
          {exercise.description}
        </p>

        {/* Target Anatomical / Sensory Area */}
        <div className="mt-3 pt-3 border-t border-slate-100 flex items-start gap-1.5 text-slate-500 text-[11px]">
          <MapPin className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
          <span className="line-clamp-1">
            <strong>Foco:</strong> {exercise.targetArea}
          </span>
        </div>

        {/* Hospital specific tip */}
        <div className="mt-2 text-[11px] text-teal-800 bg-teal-50/70 p-2 rounded-lg border border-teal-100">
          <span className="font-semibold block text-[10px] uppercase tracking-wider text-teal-700">
            Consejo Clínico HUV:
          </span>
          <p className="line-clamp-2 mt-0.5">{exercise.hospitalTip}</p>
        </div>
      </div>

      {/* CTA Button */}
      <div className="mt-4 pt-3 flex items-center justify-between">
        <span className="text-[11px] text-slate-500 font-medium">
          {exercise.steps.length} pasos guiados
        </span>

        <button
          onClick={() => onSelect(exercise)}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
        >
          <Play className="w-3.5 h-3.5" />
          <span>Iniciar 1 Min</span>
        </button>
      </div>
    </div>
  );
};
