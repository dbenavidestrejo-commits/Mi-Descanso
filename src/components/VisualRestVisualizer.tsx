import React, { useEffect, useState } from 'react';
import { Eye, Compass, SunDim, Sparkles } from 'lucide-react';

interface VisualRestVisualizerProps {
  cue: 'look_far' | 'blink' | 'rotate' | 'shake' | 'neutral';
  stepSecondsRemaining: number;
}

export const VisualRestVisualizer: React.FC<VisualRestVisualizerProps> = ({
  cue,
  stepSecondsRemaining
}) => {
  // Infinity tracker angle
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    if (cue === 'rotate') {
      const interval = setInterval(() => {
        setAngle(prev => (prev + 3) % 360);
      }, 30);
      return () => clearInterval(interval);
    }
  }, [cue]);

  // Calculate figure-8 (lemniscate) coordinates
  const rad = (angle * Math.PI) / 180;
  const scale = 70;
  const x = (scale * Math.cos(rad)) / (1 + Math.sin(rad) * Math.sin(rad));
  const y = (scale * Math.sin(rad) * Math.cos(rad)) / (1 + Math.sin(rad) * Math.sin(rad));

  return (
    <div className="flex flex-col items-center justify-center py-6">
      
      {/* 1. Distance Focus (20-20-20 rule) */}
      {cue === 'look_far' && (
        <div className="relative w-64 h-48 rounded-2xl bg-gradient-to-b from-sky-100 to-teal-50 border border-teal-200 overflow-hidden flex flex-col items-center justify-center shadow-inner">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#0d9488_1px,transparent_1px)] [background-size:16px_16px]"></div>
          
          {/* Horizon & mountains silhouette */}
          <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-teal-200 to-transparent flex items-end justify-center">
            <div className="w-full text-center pb-2 text-[11px] font-bold text-teal-800 tracking-wide">
              PUNTO LEJANO &gt; 6 METROS (20 PIES)
            </div>
          </div>

          <div className="relative z-10 flex flex-col items-center animate-bounce" style={{ animationDuration: '3s' }}>
            <div className="w-12 h-12 rounded-full bg-teal-600 text-white flex items-center justify-center shadow-lg ring-4 ring-teal-300/60">
              <Eye className="w-6 h-6" />
            </div>
            <span className="mt-2 text-xs font-bold text-teal-900 bg-white/90 px-3 py-1 rounded-full shadow-2xs">
              Enfoca a lo lejos • {stepSecondsRemaining}s
            </span>
          </div>
        </div>
      )}

      {/* 2. Conscious Blinking */}
      {cue === 'blink' && (
        <div className="relative w-64 h-48 rounded-2xl bg-gradient-to-br from-indigo-50 to-blue-50 border border-blue-200 flex flex-col items-center justify-center shadow-inner">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-md animate-pulse">
              <Eye className="w-6 h-6" />
            </div>
            <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-md animate-pulse">
              <Eye className="w-6 h-6" />
            </div>
          </div>
          <span className="text-sm font-bold text-blue-900 text-center px-4">
            Parpadea suave y constante
          </span>
          <span className="text-xs text-blue-700 mt-1">
            Humecta la córnea y glándulas lagrimales
          </span>
          <span className="mt-2 font-mono font-bold text-blue-950 bg-white px-3 py-0.5 rounded-full border border-blue-200 text-xs">
            {stepSecondsRemaining}s restantes
          </span>
        </div>
      )}

      {/* 3. Figure 8 Infinity Gym */}
      {cue === 'rotate' && (
        <div className="relative w-64 h-48 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col items-center justify-center overflow-hidden shadow-xl">
          {/* Subtle figure 8 track */}
          <div className="absolute text-slate-700 text-6xl font-light select-none tracking-widest opacity-30">
            ∞
          </div>

          {/* Smooth moving target dot */}
          <div 
            className="absolute w-6 h-6 rounded-full bg-emerald-400 shadow-[0_0_15px_#34d399] flex items-center justify-center transition-all"
            style={{
              transform: `translate(${x}px, ${y}px)`
            }}
          >
            <div className="w-2 h-2 rounded-full bg-white"></div>
          </div>

          <div className="absolute bottom-2 text-center">
            <span className="text-[11px] font-bold tracking-wider text-emerald-400 uppercase">
              Sigue el punto con tus ojos sin mover la cabeza
            </span>
          </div>
        </div>
      )}

      {/* 4. Thermal Palming or Neutral */}
      {(cue === 'shake' || cue === 'neutral') && (
        <div className="relative w-64 h-48 rounded-2xl bg-amber-50/70 border border-amber-200 flex flex-col items-center justify-center shadow-inner">
          <div className="w-14 h-14 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-md mb-2">
            <SunDim className="w-8 h-8" />
          </div>
          <span className="text-sm font-bold text-amber-900 text-center px-4">
            Oscuridad y Calor Reparador
          </span>
          <span className="text-xs text-amber-700 text-center px-4 mt-1">
            Palmas sobre ojos cerrados sin presionar
          </span>
          <span className="mt-2 font-mono font-bold text-amber-950 bg-white px-3 py-0.5 rounded-full border border-amber-200 text-xs">
            {stepSecondsRemaining}s
          </span>
        </div>
      )}

      <div className="mt-4 text-center">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
          <Sparkles className="w-3.5 h-3.5 text-teal-600" />
          Ergonomía visual clínica • HUV
        </span>
      </div>
    </div>
  );
};
