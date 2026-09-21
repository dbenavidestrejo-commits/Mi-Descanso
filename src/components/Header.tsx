import React, { useState, useEffect } from 'react';
import { Bell, Clock, ShieldAlert, Sparkles, Sliders, Moon, Sun, CheckCircle2 } from 'lucide-react';
import { NotificationSettings } from '../types';
import { SHIFT_PRESETS, HOSPITAL_DEPARTMENTS } from '../data/exercises';
import { isWithinShift } from '../utils/notifications';

interface HeaderProps {
  settings: NotificationSettings;
  onOpenSettings: () => void;
  onQuickStartExpress: () => void;
  completedTodayCount: number;
  nextBreakMs: number | null;
}

export const Header: React.FC<HeaderProps> = ({
  settings,
  onOpenSettings,
  onQuickStartExpress,
  completedTodayCount,
  nextBreakMs
}) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const activeShiftPreset = SHIFT_PRESETS.find(p => p.id === settings.shiftType);
  const activeDept = HOSPITAL_DEPARTMENTS.find(d => d.id === settings.department);
  const inShift = isWithinShift(settings, currentTime);

  // Time remaining to next break
  const getRemainingTimeStr = () => {
    if (!settings.enabled) return 'Pausadas';
    if (!nextBreakMs) return 'Calculando...';
    const diff = Math.max(0, nextBreakMs - Date.now());
    if (diff <= 0) return '¡Ahora!';
    const mins = Math.floor(diff / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);
    return `${mins}m ${secs < 10 ? '0' : ''}${secs}s`;
  };

  const isNightShift = settings.shiftType === 'noche_12h' || (currentTime.getHours() >= 19 || currentTime.getHours() < 7);

  return (
    <header id="huv-app-header" className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      {/* Top institution bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-semibold text-white tracking-wide">Hospital Universitario del Valle</span>
            <span className="hidden sm:inline text-slate-400">| Evaristo García E.S.E. • Cali, Colombia</span>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="flex items-center gap-1.5 text-slate-200">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              {currentTime.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </span>
            <span className="hidden md:inline text-slate-400">
              {currentTime.toLocaleDateString('es-CO', { weekday: 'short', day: 'numeric', month: 'short' })}
            </span>
          </div>
        </div>
      </div>

      {/* Main navigation header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Brand & App title */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-teal-600 to-emerald-700 text-white flex items-center justify-center shadow-md shadow-teal-700/20 shrink-0">
              <Sparkles className="w-6 h-6 text-emerald-100" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold tracking-tight text-slate-900">
                  Mi Descanso
                </h1>
                <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-teal-50 text-teal-700 border border-teal-200">
                  1 Minuto Activo
                </span>
              </div>
              <p className="text-xs text-slate-500 line-clamp-1">
                Pausas activas y salud laboral para el personal de turno hospitalario
              </p>
            </div>
          </div>

          {/* Shift status card & quick actions */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            
            {/* Shift rotation status chip */}
            <div 
              onClick={onOpenSettings}
              className="cursor-pointer group flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-slate-100/90 hover:bg-slate-200/80 border border-slate-200 text-xs transition-colors"
              title="Haz clic para cambiar horario de rotación o servicio"
            >
              <div className="flex items-center justify-center w-6 h-6 rounded-md bg-white text-slate-700 shadow-2xs">
                {isNightShift ? <Moon className="w-3.5 h-3.5 text-indigo-500" /> : <Sun className="w-3.5 h-3.5 text-amber-500" />}
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-slate-800">
                    {activeShiftPreset?.name || 'Turno'}
                  </span>
                  <span className={`inline-flex items-center px-1.5 py-0.2 rounded text-[10px] font-medium ${inShift ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'}`}>
                    {inShift ? 'En turno' : 'Pausa'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">
                  {activeDept?.name || 'Servicio'} • {settings.shiftType === 'personalizado' ? `${settings.customStartTime}-${settings.customEndTime}` : activeShiftPreset?.schedule}
                </p>
              </div>
            </div>

            {/* Next break countdown chip */}
            <div 
              onClick={onOpenSettings}
              className="cursor-pointer flex items-center gap-2 px-3 py-1.5 rounded-lg bg-teal-50 hover:bg-teal-100/80 border border-teal-200 text-xs text-teal-900 transition-colors"
              title="Configurar frecuencia de notificaciones"
            >
              <div className="relative">
                <Bell className={`w-4 h-4 ${settings.enabled ? 'text-teal-700' : 'text-slate-400'}`} />
                {settings.enabled && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-teal-500"></span>
                )}
              </div>
              <div className="text-left">
                <span className="text-[10px] uppercase tracking-wider text-teal-700 font-semibold block leading-tight">
                  Próxima Pausa
                </span>
                <span className="font-bold font-mono text-teal-950">
                  {getRemainingTimeStr()}
                </span>
              </div>
            </div>

            {/* Completed breaks today counter */}
            <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <div>
                <span className="text-slate-500 text-[10px] block leading-tight">Hoy completadas</span>
                <span className="font-bold text-slate-800 font-mono">{completedTodayCount} pausas</span>
              </div>
            </div>

            {/* Quick 60s Start CTA button */}
            <button
              id="btn-quick-break-express"
              onClick={onQuickStartExpress}
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white text-xs font-semibold shadow-xs transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Pausa de 1 Minuto</span>
            </button>

            {/* Shift Settings button */}
            <button
              id="btn-open-settings"
              onClick={onOpenSettings}
              aria-label="Configuración de turnos y alertas"
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 active:bg-slate-200 border border-slate-200 transition-colors cursor-pointer"
              title="Configurar turnos de rotación y notificaciones"
            >
              <Sliders className="w-4 h-4" />
            </button>

          </div>
        </div>
      </div>
    </header>
  );
};
