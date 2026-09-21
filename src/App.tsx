import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Wind, 
  Eye, 
  Activity, 
  Sliders, 
  History, 
  ShieldCheck, 
  Bell, 
  Calendar,
  Layers,
  HeartPulse,
  Flame
} from 'lucide-react';
import { BreakExercise, BreakCategory, NotificationSettings, ShiftRecord } from './types';
import { BREAK_EXERCISES, HOSPITAL_DEPARTMENTS, SHIFT_PRESETS } from './data/exercises';
import { 
  loadNotificationSettings, 
  saveNotificationSettings, 
  isWithinShift, 
  calculateNextScheduledBreak, 
  triggerBreakNotification 
} from './utils/notifications';
import { Header } from './components/Header';
import { ExerciseCard } from './components/ExerciseCard';
import { ActiveBreakPlayer } from './components/ActiveBreakPlayer';
import { ShiftSchedulerModal } from './components/ShiftSchedulerModal';
import { NotificationBanner } from './components/NotificationBanner';
import { ShiftHistorySummary } from './components/ShiftHistorySummary';

const RECORDS_STORAGE_KEY = 'mi_descanso_huv_records_v1';

export default function App() {
  const [settings, setSettings] = useState<NotificationSettings>(() => loadNotificationSettings());
  const [records, setRecords] = useState<ShiftRecord[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const raw = localStorage.getItem(RECORDS_STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const [activeExercise, setActiveExercise] = useState<BreakExercise | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'pausas' | 'historial'>('pausas');
  const [categoryFilter, setCategoryFilter] = useState<'todas' | BreakCategory>('todas');
  const [pendingNotification, setPendingNotification] = useState<BreakExercise | null>(null);
  const [nextBreakTimestamp, setNextBreakTimestamp] = useState<number | null>(() => {
    return calculateNextScheduledBreak(loadNotificationSettings());
  });

  // Save records on change
  const saveRecords = (newRecords: ShiftRecord[]) => {
    setRecords(newRecords);
    try {
      localStorage.setItem(RECORDS_STORAGE_KEY, JSON.stringify(newRecords));
    } catch (e) {
      console.warn('Failed to save records:', e);
    }
  };

  // Schedule timer loop: checks if next break is reached
  useEffect(() => {
    if (!settings.enabled) return;

    const interval = setInterval(() => {
      const now = Date.now();
      const within = isWithinShift(settings);

      if (within && nextBreakTimestamp && now >= nextBreakTimestamp) {
        // Pick an exercise recommended for their department
        const candidateExercises = BREAK_EXERCISES;
        const randomExercise = candidateExercises[Math.floor(Math.random() * candidateExercises.length)];
        
        // Trigger system / sound alert
        triggerBreakNotification(
          settings,
          `¡Pausa de 1 Minuto para Turno ${settings.department.toUpperCase()}! 🏥`,
          `Recomendación HUV: ${randomExercise.title} (${randomExercise.durationSeconds}s)`
        );

        // Show floating in-app banner
        setPendingNotification(randomExercise);

        // Advance next break
        const nextTime = calculateNextScheduledBreak(settings);
        setNextBreakTimestamp(nextTime);
      }
    }, 10000); // check every 10s

    return () => clearInterval(interval);
  }, [settings, nextBreakTimestamp]);

  const handleUpdateSettings = (newSettings: NotificationSettings) => {
    setSettings(newSettings);
    saveNotificationSettings(newSettings);
    setNextBreakTimestamp(calculateNextScheduledBreak(newSettings));
  };

  const handleCompleteBreak = (newRecord: ShiftRecord) => {
    const updated = [...records, newRecord];
    saveRecords(updated);
    setActiveExercise(null);
    setPendingNotification(null);
    // Reset next break timer from now
    setNextBreakTimestamp(calculateNextScheduledBreak(settings));
  };

  const handleQuickExpress = () => {
    const expressExercise = BREAK_EXERCISES.find(e => e.id === 'pausa-express-huv-60s') || BREAK_EXERCISES[0];
    setActiveExercise(expressExercise);
  };

  const filteredExercises = categoryFilter === 'todas'
    ? BREAK_EXERCISES
    : BREAK_EXERCISES.filter(e => e.category === categoryFilter);

  const activeDeptInfo = HOSPITAL_DEPARTMENTS.find(d => d.id === settings.department);
  const activeShiftPreset = SHIFT_PRESETS.find(p => p.id === settings.shiftType);

  const todayStr = new Date().toISOString().split('T')[0];
  const completedTodayCount = records.filter(r => r.dateString === todayStr).length;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      
      {/* Top Navigation Bar with live clock and shift rotation badge */}
      <Header
        settings={settings}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onQuickStartExpress={handleQuickExpress}
        completedTodayCount={completedTodayCount}
        nextBreakMs={nextBreakTimestamp}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        
        {/* Hospital Welcome & Shift Status Banner */}
        <section className="bg-gradient-to-br from-teal-800 via-teal-900 to-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
          {/* Subtle medical cross background ornament */}
          <div className="absolute -right-8 -bottom-8 opacity-10 pointer-events-none text-white text-9xl select-none font-black">
            +
          </div>

          <div className="relative z-10 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30">
                Hospital Universitario del Valle
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/10 text-slate-200">
                {settings.staffRole}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {activeDeptInfo?.name}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Pausas Activas de 1 Minuto para Cuidar al Personal de Turno
            </h2>
            <p className="text-sm text-teal-100/90 mt-2 leading-relaxed">
              Diseñado para los ritmos intensos del HUV. Disminuye la sobrecarga postural, fatiga visual de pantallas de monitorización y cortisol en solo 60 segundos, sin salir de tu área asistencial.
            </p>

            {/* Quick stats and launch button */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                id="btn-hero-start-express"
                onClick={handleQuickExpress}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-extrabold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Comenzar Micro-Pausa 60s HUV</span>
              </button>

              <button
                onClick={() => setIsSettingsOpen(true)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm border border-white/20 transition-all cursor-pointer"
              >
                <Sliders className="w-4 h-4 text-teal-300" />
                <span>Horario Turno: {activeShiftPreset?.name}</span>
              </button>
            </div>
          </div>
        </section>

        {/* View Selection Tabs & Category Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-3">
          
          {/* Main Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-200/70 rounded-xl">
            <button
              onClick={() => setActiveTab('pausas')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'pausas'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Ejercicios de 1 Minuto</span>
            </button>
            <button
              onClick={() => setActiveTab('historial')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'historial'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <History className="w-3.5 h-3.5" />
              <span>Registro y Salud Ocupacional</span>
              {completedTodayCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-teal-600 text-white text-[10px] flex items-center justify-center font-mono">
                  {completedTodayCount}
                </span>
              )}
            </button>
          </div>

          {/* Categories Pill Selector (only visible on exercises tab) */}
          {activeTab === 'pausas' && (
            <div className="flex flex-wrap items-center gap-1.5">
              {[
                { id: 'todas', label: 'Todas', icon: Sparkles },
                { id: 'estiramiento', label: 'Estiramiento', icon: Activity },
                { id: 'descanso-visual', label: 'Descanso Visual', icon: Eye },
                { id: 'respiracion', label: 'Respiración', icon: Wind },
                { id: 'express', label: 'Express HUV', icon: HeartPulse }
              ].map((cat) => {
                const IconComp = cat.icon;
                const isSelected = categoryFilter === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setCategoryFilter(cat.id as 'todas' | BreakCategory)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-teal-700 text-white shadow-2xs'
                        : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    <IconComp className="w-3 h-3" />
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>
          )}

        </div>

        {/* Tab 1: EXERCISES GRID */}
        {activeTab === 'pausas' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-500 px-1">
              <span>
                Mostrando <strong>{filteredExercises.length}</strong> rutinas de 60 segundos diseñadas para ergonomía hospitalaria
              </span>
              <span className="hidden sm:inline">
                * Todas son ejecutables de pie o sentado en el servicio
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {filteredExercises.map((exercise) => (
                <ExerciseCard
                  key={exercise.id}
                  exercise={exercise}
                  onSelect={(ex) => setActiveExercise(ex)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: SHIFT HISTORY & OCCUPATIONAL HEALTH SUMMARY */}
        {activeTab === 'historial' && (
          <ShiftHistorySummary
            records={records}
            settings={settings}
          />
        )}

      </main>

      {/* FOOTER */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-4 px-4 sm:px-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700">Mi Descanso</span>
            <span>•</span>
            <span>Hospital Universitario del Valle "Evaristo García" E.S.E.</span>
          </div>
          <p className="text-[11px] text-slate-400">
            Programa de Salud Ocupacional, Pausas Activas y Prevención del Síndrome de Burnout en Personal de Turno.
          </p>
        </div>
      </footer>

      {/* ACTIVE BREAK 1-MINUTE MODAL PLAYER */}
      {activeExercise && (
        <ActiveBreakPlayer
          exercise={activeExercise}
          onClose={() => setActiveExercise(null)}
          onComplete={handleCompleteBreak}
          soundEnabled={settings.soundEnabled}
        />
      )}

      {/* SHIFT & NOTIFICATION SCHEDULER MODAL */}
      <ShiftSchedulerModal
        settings={settings}
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onSave={handleUpdateSettings}
      />

      {/* IN-APP BREAK NOTIFICATION BANNER */}
      {pendingNotification && !activeExercise && (
        <NotificationBanner
          exercise={pendingNotification}
          onStart={(ex) => {
            setActiveExercise(ex);
            setPendingNotification(null);
          }}
          onSnooze={() => {
            setPendingNotification(null);
            setNextBreakTimestamp(Date.now() + 5 * 60 * 1000); // 5 min snooze
          }}
          onDismiss={() => setPendingNotification(null)}
        />
      )}

    </div>
  );
}
