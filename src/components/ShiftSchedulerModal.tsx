import React, { useState } from 'react';
import { 
  X, 
  Clock, 
  Bell, 
  Volume2, 
  Check, 
  AlertCircle, 
  Play, 
  Sparkles, 
  Calendar, 
  Building2, 
  User, 
  Shield 
} from 'lucide-react';
import { NotificationSettings, ShiftType, HospitalDepartment } from '../types';
import { SHIFT_PRESETS, HOSPITAL_DEPARTMENTS } from '../data/exercises';
import { requestBrowserNotificationPermission, triggerBreakNotification } from '../utils/notifications';

interface ShiftSchedulerModalProps {
  settings: NotificationSettings;
  isOpen: boolean;
  onClose: () => void;
  onSave: (newSettings: NotificationSettings) => void;
}

export const ShiftSchedulerModal: React.FC<ShiftSchedulerModalProps> = ({
  settings,
  isOpen,
  onClose,
  onSave
}) => {
  const [formState, setFormState] = useState<NotificationSettings>({ ...settings });
  const [browserPermissionState, setBrowserPermissionState] = useState<string>(
    typeof window !== 'undefined' && 'Notification' in window ? Notification.permission : 'default'
  );
  const [testNotificationSent, setTestNotificationSent] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleRequestPermission = async () => {
    const granted = await requestBrowserNotificationPermission();
    setBrowserPermissionState(granted ? 'granted' : 'denied');
    setFormState(prev => ({ ...prev, browserNotificationsAllowed: granted }));
  };

  const handleTestNotification = () => {
    triggerBreakNotification(
      formState,
      '¡Prueba de Pausa Activa HUV Exitosa! 🏥',
      'El sistema de alertas de rotación laboral del Hospital Universitario del Valle funciona correctamente.'
    );
    setTestNotificationSent(true);
    setTimeout(() => setTestNotificationSent(false), 4000);
  };

  const handleSave = () => {
    onSave(formState);
    onClose();
  };

  // Generate scheduled break hours list based on chosen shift and frequency
  const calculateDailyBreaks = () => {
    let startH = 7;
    let startM = 0;
    let endH = 19;
    let endM = 0;

    if (formState.shiftType === 'personalizado') {
      const [sh, sm] = formState.customStartTime.split(':').map(Number);
      const [eh, em] = formState.customEndTime.split(':').map(Number);
      startH = isNaN(sh) ? 8 : sh;
      startM = isNaN(sm) ? 0 : sm;
      endH = isNaN(eh) ? 16 : eh;
      endM = isNaN(em) ? 0 : em;
    } else {
      const preset = SHIFT_PRESETS.find(p => p.id === formState.shiftType);
      if (preset) {
        const [sh, sm] = preset.startTime.split(':').map(Number);
        const [eh, em] = preset.endTime.split(':').map(Number);
        startH = sh;
        startM = sm;
        endH = eh;
        endM = em;
      }
    }

    const times: string[] = [];
    const intervalMinutes = formState.frequencyMinutes || 60;

    let currentTotalMinutes = startH * 60 + startM + intervalMinutes;
    let endTotalMinutes = endH * 60 + endM;

    // Handle overnight shift (e.g. 19:00 to 07:00)
    if (endTotalMinutes <= startH * 60 + startM) {
      endTotalMinutes += 24 * 60;
    }

    let safetyCount = 0;
    while (currentTotalMinutes < endTotalMinutes && safetyCount < 30) {
      safetyCount++;
      const modTotal = currentTotalMinutes % (24 * 60);
      const h = Math.floor(modTotal / 60);
      const m = modTotal % 60;
      times.push(`${h < 10 ? '0' : ''}${h}:${m < 10 ? '0' : ''}${m}`);
      currentTotalMinutes += intervalMinutes;
    }

    return times;
  };

  const scheduledTimes = calculateDailyBreaks();

  return (
    <div id="shift-scheduler-modal" className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="bg-slate-900 text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center text-white">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">
                Horarios de Rotación y Notificaciones
              </h2>
              <p className="text-xs text-slate-300">
                Personaliza las alertas de pausas activas según tu servicio y turno en el HUV
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Cerrar modal"
            className="p-1.5 rounded-md hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-sm text-slate-800">
          
          {/* Master Enable/Disable Switch */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-teal-50 border border-teal-200">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-teal-700" />
              <div>
                <span className="font-bold text-teal-950 block">
                  Notificaciones de Pausas Activas
                </span>
                <span className="text-xs text-teal-800">
                  Recordatorios sonoros y visuales durante tus horas de guardia o turno
                </span>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={formState.enabled} 
                onChange={(e) => setFormState(prev => ({ ...prev, enabled: e.target.checked }))}
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-slate-300 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
            </label>
          </div>

          {/* 1. SELECCIÓN DE TURNO DE ROTACIÓN */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              1. Selecciona tu Turno de Rotación Laboral
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {SHIFT_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => setFormState(prev => ({ 
                    ...prev, 
                    shiftType: preset.id,
                    frequencyMinutes: preset.recommendedIntervalMin
                  }))}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    formState.shiftType === preset.id
                      ? 'bg-teal-50 border-teal-500 ring-2 ring-teal-500/20 shadow-xs'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-slate-900 text-xs">{preset.name}</span>
                    <span className="font-mono text-[11px] font-bold text-teal-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                      {preset.schedule}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-tight">
                    {preset.description}
                  </p>
                </button>
              ))}
            </div>

            {/* Custom Hours inputs if 'personalizado' selected */}
            {formState.shiftType === 'personalizado' && (
              <div className="mt-3 p-3 bg-slate-50 border border-slate-200 rounded-xl grid grid-cols-2 gap-3 animate-in fade-in">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Hora Inicio Turno
                  </label>
                  <input
                    type="time"
                    value={formState.customStartTime}
                    onChange={(e) => setFormState(prev => ({ ...prev, customStartTime: e.target.value }))}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-mono font-bold bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Hora Fin Turno
                  </label>
                  <input
                    type="time"
                    value={formState.customEndTime}
                    onChange={(e) => setFormState(prev => ({ ...prev, customEndTime: e.target.value }))}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-mono font-bold bg-white"
                  />
                </div>
              </div>
            )}
          </div>

          {/* 2. SERVICIO / DEPARTAMENTO HUV */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              2. Servicio Hospitalario HUV & Rol
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] text-slate-500 mb-1">
                  Servicio Asignado
                </label>
                <select
                  value={formState.department}
                  onChange={(e) => setFormState(prev => ({ ...prev, department: e.target.value as HospitalDepartment }))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold bg-white text-slate-800"
                >
                  {HOSPITAL_DEPARTMENTS.map((dept) => (
                    <option key={dept.id} value={dept.id}>
                      {dept.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] text-slate-500 mb-1">
                  Rol o Cargo Hospitalario
                </label>
                <select
                  value={formState.staffRole}
                  onChange={(e) => setFormState(prev => ({ ...prev, staffRole: e.target.value }))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold bg-white text-slate-800"
                >
                  <option value="Enfermero(a) Jefe">Enfermero(a) Jefe</option>
                  <option value="Auxiliar de Enfermería">Auxiliar de Enfermería</option>
                  <option value="Médico(a) Especialista / Cirujano">Médico(a) Especialista / Cirujano</option>
                  <option value="Médico(a) General / Residente / Interno">Médico(a) General / Residente</option>
                  <option value="Terapeuta Respiratorio / Físico">Terapeuta Respiratorio / Físico</option>
                  <option value="Bacteriólogo(a) / Lab Clínico">Bacteriólogo(a) / Lab Clínico</option>
                  <option value="Personal Administrativo / Admisiones">Personal Administrativo / Facturación</option>
                  <option value="Camillero(a) / Soporte Operativo">Camillero(a) / Soporte</option>
                </select>
              </div>
            </div>
          </div>

          {/* 3. FRECUENCIA DE NOTIFICACIONES */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              3. Frecuencia de Notificaciones de Pausa Activa
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { min: 45, label: 'Cada 45 min', desc: 'Monitores continuos' },
                { min: 60, label: 'Cada 60 min', desc: 'Recomendado HUV' },
                { min: 90, label: 'Cada 90 min', desc: 'Rondas clínicas' },
                { min: 120, label: 'Cada 2 horas', desc: 'Cirugías / Trauma' },
              ].map((freq) => (
                <button
                  key={freq.min}
                  type="button"
                  onClick={() => setFormState(prev => ({ ...prev, frequencyMinutes: freq.min }))}
                  className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                    formState.frequencyMinutes === freq.min
                      ? 'bg-teal-600 text-white border-teal-600 shadow-xs'
                      : 'bg-white border-slate-200 hover:border-slate-300 text-slate-800'
                  }`}
                >
                  <span className="block font-bold text-xs">{freq.label}</span>
                  <span className={`block text-[10px] mt-0.5 ${formState.frequencyMinutes === freq.min ? 'text-teal-100' : 'text-slate-500'}`}>
                    {freq.desc}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* 4. PREVISIÓN DE PAUSAS PROGRAMADAS PARA EL TURNO */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-teal-600" />
                Pausas de 1 minuto programadas para tu turno ({scheduledTimes.length}):
              </span>
              <span className="text-[11px] font-bold text-teal-700">
                1 min cada una
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {scheduledTimes.map((time, idx) => (
                <span 
                  key={idx} 
                  className="px-2.5 py-1 rounded-md bg-white border border-slate-200 font-mono text-xs font-bold text-slate-800 shadow-2xs"
                >
                  {time}
                </span>
              ))}
            </div>
          </div>

          {/* 5. CANALES Y PRUEBA DE SONIDO */}
          <div className="space-y-3 pt-2 border-t border-slate-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-slate-600" />
                <span className="text-xs font-semibold text-slate-800">
                  Sonido suave de campana hospitalaria
                </span>
              </div>
              <input
                type="checkbox"
                checked={formState.soundEnabled}
                onChange={(e) => setFormState(prev => ({ ...prev, soundEnabled: e.target.checked }))}
                className="w-4 h-4 accent-teal-600 cursor-pointer"
              />
            </div>

            {/* Browser notification permission request */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 bg-slate-100 rounded-xl">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-slate-600" />
                <div>
                  <span className="text-xs font-semibold text-slate-800 block">
                    Notificaciones de Sistema (Escritorio / Móvil)
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Estado actual: <strong className={browserPermissionState === 'granted' ? 'text-emerald-700' : 'text-amber-700'}>
                      {browserPermissionState === 'granted' ? 'Activadas' : 'Requiere permiso'}
                    </strong>
                  </span>
                </div>
              </div>

              {browserPermissionState !== 'granted' && (
                <button
                  type="button"
                  onClick={handleRequestPermission}
                  className="px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold cursor-pointer transition-colors"
                >
                  Permitir Alertas
                </button>
              )}
            </div>

            {/* Test Notification button */}
            <div className="flex items-center justify-between pt-1">
              <button
                type="button"
                onClick={handleTestNotification}
                className="flex items-center gap-1.5 text-xs font-bold text-teal-700 hover:text-teal-800 p-1.5 rounded-lg hover:bg-teal-50 transition-colors cursor-pointer"
              >
                <Play className="w-3.5 h-3.5" />
                <span>Probar Notificación y Sonido Ahora</span>
              </button>

              {testNotificationSent && (
                <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1 animate-in fade-in">
                  <Check className="w-3.5 h-3.5" />
                  ¡Notificación emitida!
                </span>
              )}
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 border-t border-slate-200 px-5 py-3.5 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white border border-slate-300 text-slate-700 font-semibold text-xs hover:bg-slate-100 transition-colors cursor-pointer"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
          >
            Guardar Configuración
          </button>
        </div>

      </div>
    </div>
  );
};
