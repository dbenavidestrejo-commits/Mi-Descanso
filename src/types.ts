export type BreakCategory = 'estiramiento' | 'descanso-visual' | 'respiracion' | 'express';

export type ShiftType = 
  | 'manana_6h'    // 07:00 - 13:00
  | 'tarde_6h'     // 13:00 - 19:00
  | 'noche_12h'    // 19:00 - 07:00
  | 'diurno_12h'   // 07:00 - 19:00
  | 'guardia_24h'  // 07:00 - 07:00
  | 'personalizado';

export type HospitalDepartment =
  | 'urgencias'
  | 'uci'
  | 'quirofano'
  | 'hospitalizacion'
  | 'laboratorio'
  | 'farmacia_consulta'
  | 'administrativo';

export interface ExerciseStep {
  seconds: number;
  instruction: string;
  subText?: string;
  highlightArea?: string;
  visualCue?: 'inhale' | 'hold' | 'exhale' | 'look_far' | 'blink' | 'stretch_left' | 'stretch_right' | 'rotate' | 'shake' | 'neutral';
}

export interface BreakExercise {
  id: string;
  title: string;
  shortTitle: string;
  category: BreakCategory;
  durationSeconds: number; // 60s
  targetArea: string;
  description: string;
  clinicalRationale: string;
  hospitalTip: string;
  steps: ExerciseStep[];
  difficulty: 'fácil' | 'moderada';
  standingOrSitting: 'de_pie' | 'sentado' | 'ambos';
  badgeColor: string;
}

export interface NotificationSettings {
  enabled: boolean;
  frequencyMinutes: number; // 45, 60, 90, 120
  soundEnabled: boolean;
  browserNotificationsAllowed: boolean;
  shiftType: ShiftType;
  customStartTime: string; // HH:mm
  customEndTime: string;   // HH:mm
  department: HospitalDepartment;
  staffRole: string; // Médico(a), Enfermero(a), Auxiliar, Residente, Terapeuta, Administrativo
  lastNotifiedAt: number | null;
  nextScheduledTime: number | null;
}

export interface ShiftRecord {
  id: string;
  timestamp: number;
  exerciseId: string;
  exerciseTitle: string;
  category: BreakCategory;
  durationSeconds: number;
  fatigueBefore: number; // 1-5
  fatigueAfter: number;  // 1-5
  dateString: string;    // YYYY-MM-DD
}
