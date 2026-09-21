import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  AlertOctagon, 
  CheckCircle, 
  Sparkles, 
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { BreakExercise, ShiftRecord } from '../types';
import { BreathingVisualizer } from './BreathingVisualizer';
import { VisualRestVisualizer } from './VisualRestVisualizer';
import { StretchingVisualizer } from './StretchingVisualizer';
import { playTibetanChime, playBreathCue, playCelebrationSound } from '../utils/audio';

interface ActiveBreakPlayerProps {
  exercise: BreakExercise;
  onClose: () => void;
  onComplete: (record: ShiftRecord) => void;
  soundEnabled: boolean;
}

export const ActiveBreakPlayer: React.FC<ActiveBreakPlayerProps> = ({
  exercise,
  onClose,
  onComplete,
  soundEnabled: initialSoundEnabled
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(exercise.durationSeconds);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [stepSecondsRemaining, setStepSecondsRemaining] = useState<number>(
    exercise.steps[0]?.seconds || 10
  );
  const [isMuted, setIsMuted] = useState<boolean>(!initialSoundEnabled);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [isEmergencyPaused, setIsEmergencyPaused] = useState<boolean>(false);

  // Perceived fatigue ratings (1: Muy recuperado, 5: Muy fatigado)
  const [fatigueBefore, setFatigueBefore] = useState<number>(3);
  const [fatigueAfter, setFatigueAfter] = useState<number>(1);

  // Track initial chime
  const hasChimedRef = useRef(false);

  useEffect(() => {
    if (!hasChimedRef.current && !isMuted) {
      playTibetanChime();
      hasChimedRef.current = true;
    }
  }, [isMuted]);

  // Main countdown timer interval
  useEffect(() => {
    if (!isPlaying || isEmergencyPaused || isCompleted) return;

    const interval = setInterval(() => {
      setSecondsRemaining(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          handleFinish();
          return 0;
        }
        return prev - 1;
      });

      setStepSecondsRemaining(prevStepSec => {
        if (prevStepSec <= 1) {
          // Advance to next step if available
          setCurrentStepIndex(currentIdx => {
            const nextIdx = currentIdx + 1;
            if (nextIdx < exercise.steps.length) {
              const nextStep = exercise.steps[nextIdx];
              if (!isMuted && exercise.category === 'respiracion') {
                playBreathCue(nextStep.visualCue === 'exhale');
              }
              return nextIdx;
            }
            return currentIdx;
          });
          // Reset step timer to next step's seconds or remaining seconds
          const nextStep = exercise.steps[currentStepIndex + 1];
          return nextStep ? nextStep.seconds : 5;
        }
        return prevStepSec - 1;
      });

    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, isEmergencyPaused, isCompleted, currentStepIndex, exercise, isMuted]);

  const handleFinish = () => {
    setIsCompleted(true);
    setIsPlaying(false);

    if (!isMuted) {
      playCelebrationSound();
    }

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      console.warn('Confetti error:', e);
    }
  };

  const handleSaveAndExit = () => {
    const record: ShiftRecord = {
      id: 'break-' + Date.now(),
      timestamp: Date.now(),
      exerciseId: exercise.id,
      exerciseTitle: exercise.title,
      category: exercise.category,
      durationSeconds: exercise.durationSeconds,
      fatigueBefore,
      fatigueAfter,
      dateString: new Date().toISOString().split('T')[0]
    };
    onComplete(record);
  };

  const handleReset = () => {
    setSecondsRemaining(exercise.durationSeconds);
    setCurrentStepIndex(0);
    setStepSecondsRemaining(exercise.steps[0]?.seconds || 10);
    setIsPlaying(true);
    setIsCompleted(false);
    setIsEmergencyPaused(false);
    if (!isMuted) {
      playTibetanChime();
    }
  };

  const currentStep = exercise.steps[currentStepIndex] || exercise.steps[0];
  const progressPercent = Math.min(100, Math.round(((exercise.durationSeconds - secondsRemaining) / exercise.durationSeconds) * 100));

  // Determine which visualizer to render
  const renderVisualizer = () => {
    if (exercise.category === 'respiracion') {
      const cue = currentStep.visualCue === 'inhale' || currentStep.visualCue === 'hold' || currentStep.visualCue === 'exhale'
        ? currentStep.visualCue
        : 'neutral';
      return (
        <BreathingVisualizer
          cue={cue}
          stepSecondsRemaining={stepSecondsRemaining}
          totalStepSeconds={currentStep.seconds}
        />
      );
    }

    if (exercise.category === 'descanso-visual') {
      const cue = (currentStep.visualCue as 'look_far' | 'blink' | 'rotate' | 'shake' | 'neutral') || 'neutral';
      return (
        <VisualRestVisualizer
          cue={cue}
          stepSecondsRemaining={stepSecondsRemaining}
        />
      );
    }

    if (exercise.category === 'estiramiento') {
      const cue = (currentStep.visualCue as 'stretch_left' | 'stretch_right' | 'rotate' | 'shake' | 'neutral') || 'neutral';
      return (
        <StretchingVisualizer
          cue={cue}
          targetArea={exercise.targetArea}
          stepSecondsRemaining={stepSecondsRemaining}
        />
      );
    }

    // Express category: switches dynamically based on visualCue
    if (currentStep.visualCue === 'inhale' || currentStep.visualCue === 'hold' || currentStep.visualCue === 'exhale') {
      return (
        <BreathingVisualizer
          cue={currentStep.visualCue}
          stepSecondsRemaining={stepSecondsRemaining}
          totalStepSeconds={currentStep.seconds}
        />
      );
    }
    if (currentStep.visualCue === 'look_far' || currentStep.visualCue === 'blink') {
      return (
        <VisualRestVisualizer
          cue={currentStep.visualCue}
          stepSecondsRemaining={stepSecondsRemaining}
        />
      );
    }
    return (
      <StretchingVisualizer
        cue="rotate"
        targetArea={exercise.targetArea}
        stepSecondsRemaining={stepSecondsRemaining}
      />
    );
  };

  return (
    <div id="active-break-modal" className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col my-auto animate-in fade-in zoom-in duration-200">
        
        {/* Top bar with emergency alert & controls */}
        <div className="bg-slate-900 text-white px-4 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              Pausa Activa de 1 Minuto • HUV
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Instant Emergency Pause button */}
            <button
              id="btn-emergency-code"
              onClick={() => {
                setIsEmergencyPaused(prev => !prev);
                if (!isEmergencyPaused) setIsPlaying(false);
              }}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                isEmergencyPaused 
                  ? 'bg-rose-600 text-white ring-2 ring-rose-300' 
                  : 'bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30'
              }`}
              title="Pausar inmediatamente en caso de llamado de paciente o código de emergencia"
            >
              <AlertOctagon className="w-3.5 h-3.5" />
              <span>{isEmergencyPaused ? 'Reanudar Guardia' : 'Código Urgente'}</span>
            </button>

            {/* Sound toggle */}
            <button
              onClick={() => setIsMuted(prev => !prev)}
              aria-label={isMuted ? 'Activar sonido' : 'Silenciar'}
              className="p-1.5 rounded-md hover:bg-slate-800 text-slate-300 transition-colors cursor-pointer"
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
            </button>

            {/* Close modal */}
            <button
              onClick={onClose}
              aria-label="Cerrar pausa"
              className="p-1.5 rounded-md hover:bg-slate-800 text-slate-300 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Emergency Pause Warning Notice if activated */}
        {isEmergencyPaused && (
          <div className="bg-rose-50 border-b border-rose-200 px-4 py-2.5 flex items-center justify-between gap-3 text-rose-900 text-xs animate-in slide-in-from-top duration-200">
            <div className="flex items-center gap-2">
              <AlertOctagon className="w-4 h-4 text-rose-600 shrink-0" />
              <p className="font-semibold">
                Pausa suspendida por Código de Emergencia. Tus pacientes son la prioridad.
              </p>
            </div>
            <button
              onClick={() => {
                setIsEmergencyPaused(false);
                setIsPlaying(true);
              }}
              className="px-3 py-1 bg-rose-600 text-white rounded font-bold hover:bg-rose-700 cursor-pointer"
            >
              Continuar Pausa
            </button>
          </div>
        )}

        {/* COMPLETED STATE MODAL CONTENT */}
        {isCompleted ? (
          <div className="p-6 sm:p-8 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4 shadow-inner">
              <CheckCircle className="w-10 h-10" />
            </div>

            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              ¡Pausa de 1 Minuto Completada!
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-md">
              Has restaurado tu oxigenación y descomprimido tu cuerpo para continuar cuidando a los pacientes del HUV.
            </p>

            {/* Fatigue self-assessment */}
            <div className="w-full max-w-md bg-slate-50 border border-slate-200 rounded-xl p-4 my-6 text-left">
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck className="w-4 h-4 text-teal-600" />
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                  Evaluación de Fatiga Laboral (1-5)
                </span>
              </div>
              <p className="text-xs text-slate-600 mb-3">
                ¿Cómo sientes tu nivel de energía y descanso tras esta pausa?
              </p>
              
              <div className="grid grid-cols-5 gap-2 text-center">
                {[
                  { val: 1, label: 'Muy renovado/a' },
                  { val: 2, label: 'Despejado/a' },
                  { val: 3, label: 'Estable' },
                  { val: 4, label: 'Fatiga leve' },
                  { val: 5, label: 'Aún exhausto/a' }
                ].map((item) => (
                  <button
                    key={item.val}
                    type="button"
                    onClick={() => setFatigueAfter(item.val)}
                    className={`py-2 px-1 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                      fatigueAfter === item.val
                        ? 'bg-teal-600 text-white border-teal-600 shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-teal-400'
                    }`}
                  >
                    <span className="block text-base font-bold font-mono">{item.val}</span>
                    <span className="block text-[10px] leading-tight truncate">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 w-full">
              <button
                onClick={handleSaveAndExit}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
              >
                Registrar y Volver al Turno
              </button>
              <button
                onClick={handleReset}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm transition-colors cursor-pointer"
              >
                Repetir Ejercicio (1 Min)
              </button>
            </div>
          </div>
        ) : (
          /* ACTIVE EXERCISE VIEW */
          <div className="p-4 sm:p-6 flex flex-col justify-between min-h-[460px]">
            
            {/* Header with Exercise title & target */}
            <div>
              <div className="flex items-center justify-between gap-3 mb-1">
                <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold border ${exercise.badgeColor}`}>
                  {exercise.category === 'respiracion' ? 'Respiración Guiada' :
                   exercise.category === 'descanso-visual' ? 'Descanso Visual Oftálmico' :
                   exercise.category === 'estiramiento' ? 'Estiramiento Físico' : 'Pausa Express 60s'}
                </span>

                {/* Overall seconds countdown */}
                <div className="flex items-center gap-2 bg-slate-900 text-white px-3 py-1 rounded-lg font-mono font-bold text-sm shadow-xs">
                  <span className="text-teal-400">00:{secondsRemaining < 10 ? `0${secondsRemaining}` : secondsRemaining}</span>
                  <span className="text-[10px] uppercase text-slate-400 tracking-wider">Restante</span>
                </div>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                {exercise.title}
              </h2>
              <p className="text-xs text-slate-500 line-clamp-1">
                {exercise.targetArea} • {exercise.standingOrSitting === 'de_pie' ? 'De pie' : exercise.standingOrSitting === 'sentado' ? 'Sentado' : 'De pie o sentado'}
              </p>

              {/* Progress bar across 60 seconds */}
              <div className="w-full bg-slate-100 rounded-full h-1.5 mt-3 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-teal-500 to-emerald-500 h-full transition-all duration-500 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Central Visualizer */}
            <div className="my-auto">
              {renderVisualizer()}
            </div>

            {/* Current Step Instruction Banner */}
            <div className="bg-teal-50/70 border border-teal-200/80 rounded-xl p-3.5 sm:p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800 bg-white px-2 py-0.5 rounded-full border border-teal-200">
                  Paso {currentStepIndex + 1} de {exercise.steps.length}
                </span>
              </div>
              <p className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                {currentStep.instruction}
              </p>
              {currentStep.subText && (
                <p className="text-xs text-teal-800 mt-1 font-medium">
                  {currentStep.subText}
                </p>
              )}
            </div>

            {/* Bottom Controls Bar */}
            <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between gap-3">
              <button
                onClick={handleReset}
                className="flex items-center gap-1 text-xs text-slate-600 hover:text-slate-900 p-2 rounded-lg hover:bg-slate-100 cursor-pointer"
                title="Reiniciar desde 60s"
              >
                <RotateCcw className="w-4 h-4" />
                <span className="hidden sm:inline">Reiniciar</span>
              </button>

              {/* Play / Pause Toggle */}
              <button
                id="btn-toggle-play-pause"
                onClick={() => setIsPlaying(prev => !prev)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm shadow-md transition-all cursor-pointer ${
                  isPlaying 
                    ? 'bg-slate-900 hover:bg-slate-800 text-white' 
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                }`}
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-4 h-4" />
                    <span>Pausar</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    <span>Reanudar</span>
                  </>
                )}
              </button>

              {/* Quick Skip Step */}
              <button
                onClick={() => {
                  if (currentStepIndex < exercise.steps.length - 1) {
                    setCurrentStepIndex(prev => prev + 1);
                    setStepSecondsRemaining(exercise.steps[currentStepIndex + 1]?.seconds || 5);
                  } else {
                    handleFinish();
                  }
                }}
                className="flex items-center gap-1 text-xs text-slate-600 hover:text-slate-900 p-2 rounded-lg hover:bg-slate-100 cursor-pointer"
              >
                <span className="hidden sm:inline">Saltar Paso</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
