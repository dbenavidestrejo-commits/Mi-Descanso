import React from 'react';
import { 
  CheckCircle2, 
  Clock, 
  TrendingDown, 
  ShieldCheck, 
  Flame, 
  Award,
  Sparkles,
  Info
} from 'lucide-react';
import { ShiftRecord, NotificationSettings } from '../types';
import { BIOSECURITY_RULES } from '../data/exercises';

interface ShiftHistorySummaryProps {
  records: ShiftRecord[];
  settings: NotificationSettings;
  onClearHistory?: () => void;
}

export const ShiftHistorySummary: React.FC<ShiftHistorySummaryProps> = ({
  records,
  settings,
  onClearHistory
}) => {
  const todayStr = new Date().toISOString().split('T')[0];
  const todayRecords = records.filter(r => r.dateString === todayStr);

  const totalSeconds = todayRecords.reduce((acc, curr) => acc + curr.durationSeconds, 0);
  const totalMinutes = Math.round(totalSeconds / 60);

  // Fatigue calculation
  const totalFatigueBefore = todayRecords.reduce((acc, r) => acc + r.fatigueBefore, 0);
  const totalFatigueAfter = todayRecords.reduce((acc, r) => acc + r.fatigueAfter, 0);
  const avgReduction = todayRecords.length > 0 
    ? ((totalFatigueBefore - totalFatigueAfter) / todayRecords.length).toFixed(1)
    : '0.0';

  return (
    <div id="shift-history-summary" className="space-y-6">
      
      {/* 3 Metric Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        
        <div className="bg-white rounded-2xl border border-slate-200 p-4.5 flex items-center gap-4 shadow-xs">
          <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0 border border-teal-100">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600 block">
              Pausas en el Turno
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-2xl font-extrabold font-mono text-slate-900">
                {todayRecords.length}
              </span>
              <span className="text-xs text-slate-500 font-medium">completadas hoy</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-4.5 flex items-center gap-4 shadow-xs">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-100">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600 block">
              Tiempo Total Pausas
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-2xl font-extrabold font-mono text-slate-900">
                {totalMinutes}
              </span>
              <span className="text-xs text-slate-500 font-medium">minutos activos</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-4.5 flex items-center gap-4 shadow-xs">
          <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center shrink-0 border border-sky-100">
            <TrendingDown className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600 block">
              Alivio de Fatiga
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-2xl font-extrabold font-mono text-teal-700">
                -{avgReduction}
              </span>
              <span className="text-xs text-slate-500 font-medium">puntos percibidos</span>
            </div>
          </div>
        </div>

      </div>

      {/* Hospital Biosecurity & Occupational Safety Notice */}
      <div className="bg-gradient-to-r from-teal-900 to-slate-900 text-white rounded-2xl p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <h4 className="text-sm font-bold tracking-tight text-white">
            Protocolo de Bioseguridad y Pausa Segura HUV
          </h4>
        </div>
        <p className="text-xs text-slate-300 mb-3 leading-relaxed">
          Programa de Salud Ocupacional y Bienestar Laboral del Hospital Universitario del Valle "Evaristo García":
        </p>

        <ul className="space-y-2 text-xs text-slate-200">
          {BIOSECURITY_RULES.map((rule, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0"></span>
              <span>{rule}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Today's log table if any */}
      {todayRecords.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-bold text-slate-900">
              Registro de Pausas de este Turno
            </h4>
            <span className="text-xs text-slate-500">
              {settings.staffRole} • {settings.department.toUpperCase()}
            </span>
          </div>

          <div className="divide-y divide-slate-100">
            {todayRecords.slice().reverse().map((record) => (
              <div key={record.id} className="py-2.5 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-teal-500"></span>
                  <span className="font-bold text-slate-800">{record.exerciseTitle}</span>
                  <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-mono text-[10px]">
                    1 min
                  </span>
                </div>

                <div className="flex items-center gap-3 text-slate-500">
                  <span>
                    Fatiga: <strong className="text-slate-700">{record.fatigueBefore}</strong> &rarr; <strong className="text-teal-700">{record.fatigueAfter}</strong>
                  </span>
                  <span className="font-mono text-slate-400">
                    {new Date(record.timestamp).toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
