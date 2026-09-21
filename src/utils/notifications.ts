import { NotificationSettings, ShiftType } from '../types';
import { SHIFT_PRESETS } from '../data/exercises';
import { playNotificationBell } from './audio';

export const DEFAULT_NOTIFICATION_SETTINGS: NotificationSettings = {
  enabled: true,
  frequencyMinutes: 60,
  soundEnabled: true,
  browserNotificationsAllowed: false,
  shiftType: 'diurno_12h',
  customStartTime: '07:00',
  customEndTime: '19:00',
  department: 'urgencias',
  staffRole: 'Enfermería / Médico',
  lastNotifiedAt: null,
  nextScheduledTime: null,
};

const SETTINGS_STORAGE_KEY = 'mi_descanso_huv_settings';

export function loadNotificationSettings(): NotificationSettings {
  if (typeof window === 'undefined') return DEFAULT_NOTIFICATION_SETTINGS;
  try {
    const raw = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { ...DEFAULT_NOTIFICATION_SETTINGS, ...parsed };
    }
  } catch (e) {
    console.warn('Failed to load settings:', e);
  }
  return DEFAULT_NOTIFICATION_SETTINGS;
}

export function saveNotificationSettings(settings: NotificationSettings): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
  } catch (e) {
    console.warn('Failed to save settings:', e);
  }
}

/**
 * Checks if current time is within active shift hours (supports cross-midnight shifts e.g. 19:00 - 07:00)
 */
export function isWithinShift(settings: NotificationSettings, date = new Date()): boolean {
  let startStr = '07:00';
  let endStr = '19:00';

  if (settings.shiftType === 'personalizado') {
    startStr = settings.customStartTime || '08:00';
    endStr = settings.customEndTime || '16:00';
  } else {
    const preset = SHIFT_PRESETS.find(p => p.id === settings.shiftType);
    if (preset) {
      startStr = preset.startTime;
      endStr = preset.endTime;
    }
  }

  const [startH, startM] = startStr.split(':').map(Number);
  const [endH, endM] = endStr.split(':').map(Number);

  const currentMinutes = date.getHours() * 60 + date.getMinutes();
  const startMinutes = startH * 60 + startM;
  const endMinutes = endH * 60 + endM;

  // 24 hour shift
  if (startMinutes === endMinutes && settings.shiftType === 'guardia_24h') {
    return true;
  }

  // Same day shift (e.g. 07:00 to 13:00)
  if (startMinutes < endMinutes) {
    return currentMinutes >= startMinutes && currentMinutes < endMinutes;
  }

  // Cross midnight shift (e.g. 19:00 to 07:00)
  return currentMinutes >= startMinutes || currentMinutes < endMinutes;
}

/**
 * Calculates next break target timestamp based on frequency
 */
export function calculateNextScheduledBreak(settings: NotificationSettings): number {
  const now = Date.now();
  const intervalMs = settings.frequencyMinutes * 60 * 1000;
  return now + intervalMs;
}

/**
 * Requests browser notification permission safely
 */
export async function requestBrowserNotificationPermission(): Promise<boolean> {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    return false;
  }
  try {
    const perm = await Notification.requestPermission();
    return perm === 'granted';
  } catch (e) {
    console.warn('Notification permission error:', e);
    return false;
  }
}

/**
 * Triggers a break notification (system notification if allowed, sound, plus callback for UI banner)
 */
export function triggerBreakNotification(
  settings: NotificationSettings,
  title: string = '¡Momento de tu Pausa Activa de 1 Minuto! 🏥',
  body: string = 'Personal de turno HUV: relaja tu visión, estira tu cuerpo y respira hondo 60 segundos.'
): boolean {
  if (settings.soundEnabled) {
    playNotificationBell();
  }

  let shown = false;

  if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
    try {
      new Notification(title, {
        body,
        icon: '/favicon.ico',
        tag: 'huv-mi-descanso',
        silent: !settings.soundEnabled
      });
      shown = true;
    } catch (e) {
      console.warn('Browser notification invocation failed:', e);
    }
  }

  return shown;
}
