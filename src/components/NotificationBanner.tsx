import React from 'react';
import { Bell, Sparkles, Clock, X } from 'lucide-react';
import { BreakExercise } from '../types';

interface NotificationBannerProps {
  exercise: BreakExercise;
  onStart: (exercise: BreakExercise) => void;
  onSnooze: () => void;
  onDismiss: () => void;
}

export const NotificationBanner: React.FC<NotificationBannerProps> = ({
  exercise,
  onStart,
  onSnooze,
  onDismiss
}) => {
  return (
    <div 
      id="notification-alert-banner"
      className="fixed bottom-4 right-4 left-4 sm:left-auto sm:max-w-md z-40 bg-slate-900 text-white rounded-2xl shadow-2xl border border-teal-500/40 p-4 animate-in slide-in-from-bottom-5 duration-300"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-500 text-white flex items-center justify-center shrink-0 shadow-md">
            <Bell className="w-5 h-5 animate-bounce" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-extrabold uppercase tracking-wider text-teal-400">
                Alerta de Turno HUV
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-ping"></span>
            </div>
            <h4 className="text-sm font-bold text-white leading-tight mt-0.5">
              ¡Momento de tu Pausa Activa!
            </h4>
          </div>
        </div>

        <button 
          onClick={onDismiss}
          aria-label="Cerrar notificación"
          className="text-slate-400 hover:text-white p-1 rounded-md transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="mt-2.5 bg-slate-800/80 rounded-xl p-2.5 border border-slate-700">
        <p className="text-xs font-semibold text-teal-200">
          Recomendada: <strong className="text-white">{exercise.title}</strong>
        </p>
        <p className="text-[11px] text-slate-300 line-clamp-1 mt-0.5">
          {exercise.description}
        </p>
      </div>

      <div className="mt-3 flex items-center justify-end gap-2">
        <button
          onClick={onSnooze}
          className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition-colors cursor-pointer"
        >
          Posponer 5 min
        </button>
        <button
          onClick={() => onStart(exercise)}
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-teal-500 hover:bg-teal-600 text-slate-950 text-xs font-bold shadow-md transition-colors cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Iniciar 1 Min</span>
        </button>
      </div>
    </div>
  );
};
