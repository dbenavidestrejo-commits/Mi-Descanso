import React from 'react';
import { ArrowLeft, ArrowRight, RotateCw, Activity, ArrowUp, Zap } from 'lucide-react';

interface StretchingVisualizerProps {
  cue: 'stretch_left' | 'stretch_right' | 'rotate' | 'shake' | 'neutral' | 'inhale' | 'exhale';
  targetArea: string;
  stepSecondsRemaining: number;
}

export const StretchingVisualizer: React.FC<StretchingVisualizerProps> = ({
  cue,
  targetArea,
  stepSecondsRemaining
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-6">
      <div className="relative w-64 h-52 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 border border-slate-300 flex flex-col items-center justify-center p-4 shadow-inner">
        
        {/* Target anatomical zone tag */}
        <div className="absolute top-2.5 inset-x-3 flex items-center justify-between">
          <span className="text-[10px] font-bold tracking-wider uppercase bg-white/90 text-slate-700 px-2 py-0.5 rounded-md border border-slate-200">
            Foco Anatómico
          </span>
          <span className="font-mono text-xs font-extrabold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200">
            {stepSecondsRemaining}s
          </span>
        </div>

        {/* Dynamic motion guidance icons */}
        <div className="flex items-center justify-center mt-3">
          {cue === 'stretch_right' && (
            <div className="flex flex-col items-center animate-pulse">
              <div className="w-16 h-16 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-lg mb-2">
                <ArrowRight className="w-9 h-9" />
              </div>
              <span className="text-xs font-bold text-amber-900 bg-amber-100/90 px-3 py-1 rounded-full border border-amber-300">
                Lado Derecho / Extensión
              </span>
            </div>
          )}

          {cue === 'stretch_left' && (
            <div className="flex flex-col items-center animate-pulse">
              <div className="w-16 h-16 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-lg mb-2">
                <ArrowLeft className="w-9 h-9" />
              </div>
              <span className="text-xs font-bold text-amber-900 bg-amber-100/90 px-3 py-1 rounded-full border border-amber-300">
                Lado Izquierdo / Extensión
              </span>
            </div>
          )}

          {cue === 'rotate' && (
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg mb-2 animate-spin" style={{ animationDuration: '6s' }}>
                <RotateCw className="w-9 h-9" />
              </div>
              <span className="text-xs font-bold text-indigo-900 bg-indigo-100/90 px-3 py-1 rounded-full border border-indigo-300">
                Rotación Articular Suave
              </span>
            </div>
          )}

          {cue === 'shake' && (
            <div className="flex flex-col items-center animate-bounce" style={{ animationDuration: '1s' }}>
              <div className="w-16 h-16 rounded-2xl bg-teal-600 text-white flex items-center justify-center shadow-lg mb-2">
                <Zap className="w-9 h-9" />
              </div>
              <span className="text-xs font-bold text-teal-900 bg-teal-100/90 px-3 py-1 rounded-full border border-teal-300">
                Soltar y Sacudir Tensión
              </span>
            </div>
          )}

          {(cue === 'neutral' || cue === 'inhale' || cue === 'exhale') && (
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-slate-800 text-white flex items-center justify-center shadow-lg mb-2">
                <Activity className="w-9 h-9 text-emerald-400" />
              </div>
              <span className="text-xs font-bold text-slate-800 bg-white px-3 py-1 rounded-full border border-slate-300">
                Alineación y Postura Neutra
              </span>
            </div>
          )}
        </div>

        {/* Target Area Subtitle */}
        <p className="mt-3 text-xs text-slate-600 text-center font-medium line-clamp-1">
          {targetArea}
        </p>
      </div>

      <p className="text-[11px] text-slate-500 mt-3 text-center">
        * Respira de forma continua durante la elongación; nunca aguantes la respiración.
      </p>
    </div>
  );
};
