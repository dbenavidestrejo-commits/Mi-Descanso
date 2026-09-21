import React from 'react';
import { Wind } from 'lucide-react';

interface BreathingVisualizerProps {
  cue: 'inhale' | 'hold' | 'exhale' | 'neutral';
  stepSecondsRemaining: number;
  totalStepSeconds: number;
}

export const BreathingVisualizer: React.FC<BreathingVisualizerProps> = ({
  cue,
  stepSecondsRemaining,
  totalStepSeconds
}) => {
  // Determine ring scale based on cue
  let scaleClass = 'scale-100';
  let label = 'Respira con naturalidad';
  let ringBg = 'bg-teal-500/20 border-teal-400';
  let ringColor = 'text-teal-700';

  if (cue === 'inhale') {
    scaleClass = 'scale-125 transition-transform duration-3000 ease-out';
    label = 'INHALA POR LA NARIZ';
    ringBg = 'bg-emerald-500/30 border-emerald-500';
    ringColor = 'text-emerald-700';
  } else if (cue === 'hold') {
    scaleClass = 'scale-125';
    label = 'SOSTÉN EL AIRE';
    ringBg = 'bg-amber-500/30 border-amber-500';
    ringColor = 'text-amber-700';
  } else if (cue === 'exhale') {
    scaleClass = 'scale-85 transition-transform duration-3000 ease-in-out';
    label = 'EXHALA DESPACIO';
    ringBg = 'bg-cyan-500/30 border-cyan-500';
    ringColor = 'text-cyan-700';
  }

  return (
    <div className="flex flex-col items-center justify-center py-6">
      <div className="relative w-56 h-56 flex items-center justify-center">
        {/* Outer ambient glow ripple */}
        <div 
          className={`absolute inset-0 rounded-full border-2 border-dashed ${ringBg} opacity-60 animate-spin`} 
          style={{ animationDuration: '24s' }}
        />
        
        {/* Breathing animated circle */}
        <div 
          className={`w-40 h-40 rounded-full border-4 flex flex-col items-center justify-center shadow-lg transition-all duration-700 ease-in-out ${ringBg} ${scaleClass}`}
        >
          <Wind className={`w-8 h-8 mb-1.5 ${ringColor} transition-transform duration-500`} />
          <span className="text-3xl font-extrabold font-mono text-slate-800">
            {stepSecondsRemaining}s
          </span>
          <span className="text-[11px] font-bold tracking-wider uppercase text-slate-600 mt-1">
            {cue === 'inhale' ? 'Expansión' : cue === 'hold' ? 'Pausa' : cue === 'exhale' ? 'Vaciado' : 'Ritmo'}
          </span>
        </div>
      </div>

      {/* Primary Cue banner */}
      <div className="mt-4 text-center">
        <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase shadow-2xs border ${
          cue === 'inhale' ? 'bg-emerald-50 text-emerald-800 border-emerald-300' :
          cue === 'hold' ? 'bg-amber-50 text-amber-900 border-amber-300' :
          cue === 'exhale' ? 'bg-cyan-50 text-cyan-900 border-cyan-300' :
          'bg-slate-100 text-slate-800 border-slate-300'
        }`}>
          {label}
        </span>
      </div>
    </div>
  );
};
