import { BreakExercise } from '../types';

export const BREAK_EXERCISES: BreakExercise[] = [
  // --- RESPIRACIÓN GUIADA ---
  {
    id: 'respiracion-caja-444',
    title: 'Respiración en Caja 4-4-4',
    shortTitle: 'Respiración en Caja',
    category: 'respiracion',
    durationSeconds: 60,
    targetArea: 'Sistema Nervioso Autónomo y Frecuencia Cardíaca',
    description: 'Técnica de regulación vagal rápida para desacelerar el ritmo cardíaco y recuperar el enfoque clínico en 60 segundos.',
    clinicalRationale: 'Equilibra los niveles de CO2 y estimula el nervio vago, reduciendo la respuesta de lucha o huida tras situaciones de alta exigencia.',
    hospitalTip: 'Ideal tras atender un código de urgencia, entrega de turno o procedimiento invasivo complejo.',
    difficulty: 'fácil',
    standingOrSitting: 'ambos',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    steps: [
      { seconds: 4, instruction: 'Inhala profundamente por la nariz inflando el abdomen', subText: 'Siente cómo el aire expande tus costillas', visualCue: 'inhale' },
      { seconds: 4, instruction: 'Sostén el aire con serenidad', subText: 'Mantén hombros relajados y mandíbula suelta', visualCue: 'hold' },
      { seconds: 4, instruction: 'Exhala despacio y continuo por la boca', subText: 'Libera toda la tensión acumulada', visualCue: 'exhale' },
      { seconds: 3, instruction: 'Pausa breve con los pulmones vacíos', subText: 'Disfruta el silencio interno', visualCue: 'neutral' },
      { seconds: 4, instruction: 'Inhala de nuevo inflando tu diafragma', subText: 'Ciclo 2: Aire limpio y renovador', visualCue: 'inhale' },
      { seconds: 4, instruction: 'Sostén con calma y estabilidad', subText: 'Centro de calma en medio del hospital', visualCue: 'hold' },
      { seconds: 4, instruction: 'Exhala soltando el peso de tus hombros', subText: 'Expulsa el agotamiento', visualCue: 'exhale' },
      { seconds: 3, instruction: 'Pausa neutra en reposo', subText: 'Observa la disminución de tu pulso', visualCue: 'neutral' },
      { seconds: 4, instruction: 'Inhala profundamente llenando tu capacidad', subText: 'Ciclo 3: Energía y serenidad', visualCue: 'inhale' },
      { seconds: 4, instruction: 'Sostén el aire con confianza', subText: 'Firmeza y claridad mental', visualCue: 'hold' },
      { seconds: 4, instruction: 'Exhala lentamente hasta vaciarte', subText: 'Alivia la carga asistencial', visualCue: 'exhale' },
      { seconds: 3, instruction: 'Pausa final de equilibrio', subText: 'Paz fisiológica restaurada', visualCue: 'neutral' },
      { seconds: 5, instruction: 'Inhala hondo y reconéctate suavemente', subText: 'Lista/o para retomar el cuidado con mente despejada', visualCue: 'neutral' },
      { seconds: 10, instruction: 'Abre los ojos despacio y normaliza tu respiración', subText: '¡Excelente! Pausa de 1 minuto completada', visualCue: 'neutral' }
    ]
  },
  {
    id: 'respiracion-suspiro-fisiologico',
    title: 'Suspiro Fisiológico (Reset Vagal)',
    shortTitle: 'Suspiro Fisiológico',
    category: 'respiracion',
    durationSeconds: 60,
    targetArea: 'Alvéolos Pulmonares y Cortisol',
    description: 'Doble inhalación nasal rápida seguida de exhalación oral prolongada. El método fisiológico más veloz para frenar la ansiedad aguda.',
    clinicalRationale: 'Re-colapsa los alvéolos atelectásicos y activa al instante el tono parasimpático, disipando la tensión muscular.',
    hospitalTip: 'Excelente antes de canalizar una vena difícil o ingresar a ronda médica con pacientes críticos.',
    difficulty: 'fácil',
    standingOrSitting: 'ambos',
    badgeColor: 'bg-teal-100 text-teal-800 border-teal-200',
    steps: [
      { seconds: 3, instruction: 'Inhalación nasal profunda y continua', subText: 'Llena un 80% de tus pulmones', visualCue: 'inhale' },
      { seconds: 2, instruction: 'Segunda inhalación corta y enérgica por la nariz', subText: 'Maximiza la apertura alveolar superior', visualCue: 'inhale' },
      { seconds: 7, instruction: 'Exhala lento y sonoro por la boca (fsssss)', subText: 'Siente el descenso inmediato de la taquicardia', visualCue: 'exhale' },
      { seconds: 3, instruction: 'Inhalación nasal profunda (Ronda 2)', subText: 'Entrada de oxígeno al diafragma', visualCue: 'inhale' },
      { seconds: 2, instruction: 'Segundo sorbo corto de aire nasal', subText: 'Apertura torácica', visualCue: 'inhale' },
      { seconds: 7, instruction: 'Exhala muy despacio con labios entreabiertos', subText: 'Soltando contracturas del cuello', visualCue: 'exhale' },
      { seconds: 3, instruction: 'Inhalación nasal profunda (Ronda 3)', subText: 'Oxígeno fresco', visualCue: 'inhale' },
      { seconds: 2, instruction: 'Segundo impulso corto de aire', subText: 'Llenado alveolar completo', visualCue: 'inhale' },
      { seconds: 7, instruction: 'Exhala largo y prolongado', subText: 'Tu sistema nervioso se estabiliza', visualCue: 'exhale' },
      { seconds: 3, instruction: 'Inhalación profunda (Ronda 4 final)', subText: 'Inhala calma y enfoque', visualCue: 'inhale' },
      { seconds: 2, instruction: 'Último sorbo de aire al tope', subText: 'Expansión máxima', visualCue: 'inhale' },
      { seconds: 9, instruction: 'Exhalación suave, larga y completa', subText: 'Sensación de alivio y control biológico', visualCue: 'exhale' },
      { seconds: 10, instruction: 'Respira normalmente a tu propio ritmo', subText: 'Cuerpo relajado, postura erguida', visualCue: 'neutral' }
    ]
  },

  // --- EJERCICIOS DE ESTIRAMIENTO ---
  {
    id: 'estiramiento-cervical-trapecio',
    title: 'Descompresión Cervical y Trapecios',
    shortTitle: 'Cuello y Trapecios',
    category: 'estiramiento',
    durationSeconds: 60,
    targetArea: 'Músculos Esternocleidomastoideo, Trapecio y Elevador de la Escápula',
    description: 'Movilidad guiada para eliminar la rigidez de cuello causada por mascarillas quirúrgicas, visores y pantallas de monitores.',
    clinicalRationale: 'Mejora la perfusión de las arterias vertebrales y alivia puntos gatillo miofasciales de la cintura escapular.',
    hospitalTip: 'Puedes realizarlo con uniforme quirúrgico o bata sin alterar las medidas de asepsia.',
    difficulty: 'fácil',
    standingOrSitting: 'ambos',
    badgeColor: 'bg-amber-100 text-amber-900 border-amber-200',
    steps: [
      { seconds: 5, instruction: 'Postura neutra: baja los hombros lejos de las orejas', subText: 'Columna recta, pies firmes en el suelo', visualCue: 'neutral' },
      { seconds: 10, instruction: 'Inclina suavemente la oreja derecha hacia tu hombro derecho', subText: 'Siente el estiramiento en el lado izquierdo del cuello sin forzar', visualCue: 'stretch_right' },
      { seconds: 5, instruction: 'Regresa al centro despacio inhalando', subText: 'Alinea tu mentón paralelo al suelo', visualCue: 'neutral' },
      { seconds: 10, instruction: 'Inclina suavemente la oreja izquierda hacia el hombro izquierdo', subText: 'Libera la tensión del trapecio derecho', visualCue: 'stretch_left' },
      { seconds: 5, instruction: 'Regresa al centro suavemente', subText: 'Hombros relajados y sueltos', visualCue: 'neutral' },
      { seconds: 10, instruction: 'Lleva el mentón hacia el pecho mirando hacia abajo', subText: 'Estiramiento suave de la musculatura posterior y base del cráneo', visualCue: 'neutral' },
      { seconds: 10, instruction: 'Círculos lentos con los hombros hacia atrás (x4)', subText: 'Abre el pecho y descansa la espalda alta', visualCue: 'rotate' },
      { seconds: 5, instruction: 'Sacude suavemente brazos y respira hondo', subText: 'Sensación de liviandad en tu cuello', visualCue: 'shake' }
    ]
  },
  {
    id: 'estiramiento-munecas-tunel-carpiano',
    title: 'Alivio de Muñecas y Túnel Carpiano',
    shortTitle: 'Muñecas y Manos',
    category: 'estiramiento',
    durationSeconds: 60,
    targetArea: 'Nervio Mediano, Músculos Flexores y Extensores del Carpo',
    description: 'Vital para enfermeros, bacteriólogos, médicos y farmacéuticos: previene tendinitis por digitación, canalizaciones y pipeteo.',
    clinicalRationale: 'Disminuye la presión hidrostática dentro del canal carpiano y elonga las fascias sobrecargadas por pinza digital repetitiva.',
    hospitalTip: '¡Excelente después de colocar vías intravenosas o digitar notas de evolución de piso!',
    difficulty: 'fácil',
    standingOrSitting: 'ambos',
    badgeColor: 'bg-sky-100 text-sky-800 border-sky-200',
    steps: [
      { seconds: 10, instruction: 'Extiende el brazo derecho al frente con la palma hacia adelante (alto)', subText: 'Con tu otra mano, jala suavemente los dedos hacia ti', visualCue: 'stretch_right' },
      { seconds: 5, instruction: 'Baja los dedos mirando hacia el suelo e invierte el estiramiento', subText: 'Estira la parte superior de tu muñeca derecha', visualCue: 'stretch_right' },
      { seconds: 10, instruction: 'Extiende el brazo izquierdo al frente con palma adelante', subText: 'Jala con delicadeza los dedos hacia tu cuerpo', visualCue: 'stretch_left' },
      { seconds: 5, instruction: 'Baja los dedos izquierdos hacia el piso estirando extensores', subText: 'Alivio del dorso de la mano', visualCue: 'stretch_left' },
      { seconds: 12, instruction: 'Rotaciones circulares de ambas muñecas hacia afuera y adentro', subText: 'Mueve los carpos fluidamente para lubricar articulaciones', visualCue: 'rotate' },
      { seconds: 10, instruction: 'Abre los dedos al máximo como una estrella y cierra en puño suave (x5)', subText: 'Activa la bomba vascular intrínseca de la mano', visualCue: 'shake' },
      { seconds: 8, instruction: 'Sacude tus manos al aire como si salpicaras gotas de agua', subText: '¡Dedos ágiles y muñecas descomprimidas!', visualCue: 'shake' }
    ]
  },
  {
    id: 'estiramiento-retorno-venoso-gemelos',
    title: 'Activación Circulatoria y Retorno Venoso',
    shortTitle: 'Piernas y Gemelos',
    category: 'estiramiento',
    durationSeconds: 60,
    targetArea: 'Músculos Gastrocnemios, Sóleo y Sistema Venoso Profundo',
    description: 'Previene la pesadez en piernas, edema maleolar y varices tras horas de pie en rondas asistenciales o quirófanos.',
    clinicalRationale: 'La contracción isométrica del tríceps sural actúa como corazón periférico propulsando la sangre de vuelta al corazón.',
    hospitalTip: 'Puedes apoyarte ligeramente en un mesón de enfermería o pared limpia.',
    difficulty: 'fácil',
    standingOrSitting: 'de_pie',
    badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    steps: [
      { seconds: 15, instruction: 'Elevación sobre puntas de pies: Sube y baja con control (x10)', subText: 'Activa la bomba muscular de los gemelos para drenar líquidos', visualCue: 'stretch_right' },
      { seconds: 15, instruction: 'Paso atrás con pierna derecha: talón pegado al suelo', subText: 'Flexiona la rodilla izquierda y siente el estiramiento del gemelo derecho', visualCue: 'stretch_right' },
      { seconds: 15, instruction: 'Paso atrás con pierna izquierda: talón firme en el piso', subText: 'Mantén la cadera alineada y espalda derecha', visualCue: 'stretch_left' },
      { seconds: 10, instruction: 'Círculos con cada tobillo en el aire', subText: '5 segundos por cada pie para soltar articulaciones', visualCue: 'rotate' },
      { seconds: 5, instruction: 'Marcha ligera en el puesto sacudiendo piernas', subText: 'Flujo sanguíneo renovado para el resto del turno', visualCue: 'shake' }
    ]
  },
  {
    id: 'estiramiento-lumbar-espalda',
    title: 'Descompresión Lumbar y Columna',
    shortTitle: 'Lumbar y Columna',
    category: 'estiramiento',
    durationSeconds: 60,
    targetArea: 'Músculos Paravertebrales, Cuadrado Lumbar y Fascia Toracolumbar',
    description: 'Alivia la carga compresiva sobre los discos lumbares producida por traslados de pacientes y largas estancias clínicas.',
    clinicalRationale: 'Disminuye la tensión miofascial paravertebral y restablece el balance lumbo-pélvico.',
    hospitalTip: 'Realiza los movimientos de forma pausada, sin tirones bruscos.',
    difficulty: 'fácil',
    standingOrSitting: 'ambos',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-200',
    steps: [
      { seconds: 10, instruction: 'Entrelaza los dedos y estira los brazos hacia el techo', subText: 'Alarga la columna como si quisieras tocar el techo', visualCue: 'inhale' },
      { seconds: 12, instruction: 'Con los brazos arriba, inclina el torso suavemente a la derecha', subText: 'Estira el costado izquierdo de tu espalda', visualCue: 'stretch_right' },
      { seconds: 12, instruction: 'Regresa al centro e inclina el torso suavemente a la izquierda', subText: 'Alarga el dorsal ancho derecho', visualCue: 'stretch_left' },
      { seconds: 12, instruction: 'Manos en la cintura: arquea suavemente la espalda hacia atrás abriendo el pecho', subText: 'Contrarresta la postura encorvada sobre camas de pacientes', visualCue: 'exhale' },
      { seconds: 9, instruction: 'Flexiona ligeramente rodillas y balancea los brazos libres', subText: 'Sensación de descompresión vertebral', visualCue: 'shake' },
      { seconds: 5, instruction: 'Respira profundo y asume postura erguida', subText: 'Espalda protegida y alineada', visualCue: 'neutral' }
    ]
  },

  // --- DESCANSO VISUAL ---
  {
    id: 'descanso-visual-regla-20-20-20',
    title: 'Regla Oftalmológica 20-20-20',
    shortTitle: 'Regla 20-20-20',
    category: 'descanso-visual',
    durationSeconds: 60,
    targetArea: 'Músculo Ciliar, Cristalino y Película Lagrimal',
    description: 'Protocolo de ergonomía visual clínica: cada 20 minutos de pantalla, mira un punto a más de 20 pies (6 metros) por 20 segundos.',
    clinicalRationale: 'Relaja la contracción tónica del músculo ciliar, frenando la fatiga acomodativa y el ardor ocular por monitorización continua.',
    hospitalTip: 'Busca una ventana del hospital o el punto más lejano del pasillo.',
    difficulty: 'fácil',
    standingOrSitting: 'ambos',
    badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-200',
    steps: [
      { seconds: 5, instruction: 'Aparta tu mirada de cualquier monitor o pantalla clínica', subText: 'Parpadea 3 veces para humectar la córnea', visualCue: 'blink' },
      { seconds: 20, instruction: 'Enfoca un objeto a lo lejos (mínimo a 6 metros o por la ventana)', subText: 'Observa detalles lejanos: las ramas de un árbol o el final del pasillo', visualCue: 'look_far' },
      { seconds: 10, instruction: 'Parpadeo consciente rítmico: abre y cierra suavemente (x8)', subText: 'Estimula la secreción de las glándulas de Meibomio', visualCue: 'blink' },
      { seconds: 15, instruction: 'Vuelve a mirar al horizonte lejano respirando hondo', subText: 'Permite que el cristalino se aplane y repose por completo', visualCue: 'look_far' },
      { seconds: 10, instruction: 'Cierra los ojos suavemente 10 segundos en oscuridad', subText: '¡Ojos descansados y listos para continuar!', visualCue: 'neutral' }
    ]
  },
  {
    id: 'descanso-visual-palming-termico',
    title: 'Palming Térmico y Relajación Ocular',
    shortTitle: 'Palming Térmico',
    category: 'descanso-visual',
    durationSeconds: 60,
    targetArea: 'Retina, Fotorreceptores y Nervio Óptico',
    description: 'Oscuridad absoluta con calor palmar para mitigar la sobreestimulación de los tubos fluorescentes y monitores hospitalarios.',
    clinicalRationale: 'Bloquea el 100% de la luz para permitir que la rodopsina retiniana se regenere y baje la hiperemia conjuntival.',
    hospitalTip: 'Asegúrate de tener las manos limpias (higiene de manos con alcohol glicerinado o agua y jabón).',
    difficulty: 'fácil',
    standingOrSitting: 'ambos',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
    steps: [
      { seconds: 10, instruction: 'Frota con energía tus palmas entre sí hasta generar calor agradable', subText: 'Siente la calidez en el centro de tus manos limpias', visualCue: 'shake' },
      { seconds: 25, instruction: 'Coloca las palmas ahuecadas sobre tus ojos cerrados sin presionar los globos oculares', subText: 'Crea una cámara de oscuridad total. Los talones de las manos descansan en los pómulos', visualCue: 'neutral' },
      { seconds: 15, instruction: 'Respira profundamente mientras absorbes la oscuridad y el calor', subText: 'Siente cómo se disuelve la sensación de arenilla y ardor visual', visualCue: 'inhale' },
      { seconds: 10, instruction: 'Retira las manos despacio y parpadea varias veces adaptándote a la luz', subText: 'Claridad visual renovada para tu labor asistencial', visualCue: 'blink' }
    ]
  },
  {
    id: 'descanso-visual-ocho-infinito',
    title: 'Movilidad Ocular en Infinito (∞)',
    shortTitle: 'Gimnasia Ocular en 8',
    category: 'descanso-visual',
    durationSeconds: 60,
    targetArea: 'Músculos Rectos y Oblicuos del Ojo (Pares Craneales III, IV y VI)',
    description: 'Trazado visual fluido de una figura en ocho horizontal para destensar la musculatura que mantiene la mirada fija.',
    clinicalRationale: 'Mejora la coordinación motora ocular y descompone las contracciones espásticas de la mirada fija en microscopios o historias clínicas.',
    hospitalTip: 'Mantén la cabeza fija y mueve exclusivamente los ojos.',
    difficulty: 'fácil',
    standingOrSitting: 'ambos',
    badgeColor: 'bg-violet-100 text-violet-800 border-violet-200',
    steps: [
      { seconds: 6, instruction: 'Mira al frente manteniendo la cabeza quieta y relajada', subText: 'Imagina un número 8 horizontal gigante (signo infinito ∞) a 3 metros', visualCue: 'neutral' },
      { seconds: 20, instruction: 'Recorre con la mirada el trazado del 8 horizontal en sentido de las manecillas', subText: 'Movimiento fluido y suave, sin saltos ni tensión', visualCue: 'rotate' },
      { seconds: 20, instruction: 'Cambia de dirección: recorre el 8 en sentido inverso', subText: 'Los músculos oculares se estiran y liberan rigidez', visualCue: 'rotate' },
      { seconds: 14, instruction: 'Cierra los ojos firmemente 3 segundos, ábrelos y parpadea con soltura', subText: 'Excelente destreza y frescura para tu visión', visualCue: 'blink' }
    ]
  },

  // --- PAUSA ACTIVA EXPRESS (1 MINUTO INTEGRAL) ---
  {
    id: 'pausa-express-huv-60s',
    title: 'Pausa Express Multimodal HUV',
    shortTitle: 'Micro-Pausa 60s HUV',
    category: 'express',
    durationSeconds: 60,
    targetArea: 'Sistema Músculo-Esquelético, Visual y Cardiorrespiratorio',
    description: 'La pausa de 1 minuto más eficiente del Hospital Universitario del Valle: 20s respiración + 20s descompresión postural + 20s descanso visual.',
    clinicalRationale: 'Brinda un estímulo de reinicio neuro-muscular equilibrado que encaja en cualquier intervalo entre pacientes o procedimientos.',
    hospitalTip: 'Diseñada específicamente para cuando solo tienes 60 segundos antes del próximo paciente.',
    difficulty: 'fácil',
    standingOrSitting: 'ambos',
    badgeColor: 'bg-emerald-100 text-teal-900 border-teal-300',
    steps: [
      { seconds: 20, instruction: 'Bloque 1 (Respiración): Inhala en 4 segundos, exhala en 6 segundos (x2)', subText: 'Oxigena tu cerebro y desconecta la mente por un momento', visualCue: 'inhale' },
      { seconds: 20, instruction: 'Bloque 2 (Cuerpo): Eleva hombros hacia orejas y rótalos atrás mientras estiras muñecas', subText: 'Desactiva los puntos de tensión postural más críticos', visualCue: 'rotate' },
      { seconds: 20, instruction: 'Bloque 3 (Visión): Mira al punto más lejano del pasillo o ventana parpadeando suavemente', subText: 'Relaja la vista y sonríe: ¡turno protegido!', visualCue: 'look_far' }
    ]
  }
];

export const SHIFT_PRESETS = [
  {
    id: 'manana_6h' as const,
    name: 'Turno Mañana (6h)',
    schedule: '07:00 - 13:00',
    startTime: '07:00',
    endTime: '13:00',
    durationHours: 6,
    recommendedIntervalMin: 60,
    description: 'Mañanas de alta demanda asistencial: rondas de piso, curaciones y cirugías programadas.'
  },
  {
    id: 'tarde_6h' as const,
    name: 'Turno Tarde (6h)',
    schedule: '13:00 - 19:00',
    startTime: '13:00',
    endTime: '19:00',
    durationHours: 6,
    recommendedIntervalMin: 60,
    description: 'Tardes de procedimientos ambulatorios, altas médicas y recepción de turnos.'
  },
  {
    id: 'noche_12h' as const,
    name: 'Turno Noche / Velada (12h)',
    schedule: '19:00 - 07:00',
    startTime: '19:00',
    endTime: '07:00',
    durationHours: 12,
    recommendedIntervalMin: 90,
    description: 'Guardia nocturna: combate la fatiga circadiana y somnolencia entre las 02:00 y 05:00.'
  },
  {
    id: 'diurno_12h' as const,
    name: 'Turno Diurno Largo (12h)',
    schedule: '07:00 - 19:00',
    startTime: '07:00',
    endTime: '19:00',
    durationHours: 12,
    recommendedIntervalMin: 60,
    description: 'Jornada continua de 12 horas en servicios críticos (UCI, Urgencias, Quirófano central).'
  },
  {
    id: 'guardia_24h' as const,
    name: 'Guardia Médica 24h',
    schedule: '07:00 - 07:00 (+1)',
    startTime: '07:00',
    endTime: '07:00',
    durationHours: 24,
    recommendedIntervalMin: 90,
    description: 'Turno completo de disponibilidad continua en trauma y soporte vital.'
  },
  {
    id: 'personalizado' as const,
    name: 'Horario Personalizado',
    schedule: 'Ajuste libre',
    startTime: '08:00',
    endTime: '16:00',
    durationHours: 8,
    recommendedIntervalMin: 60,
    description: 'Configura tus horas exactas según la programación de tu servicio en el HUV.'
  }
];

export const HOSPITAL_DEPARTMENTS = [
  { id: 'urgencias', name: 'Urgencias y Trauma', icon: 'AlertTriangle', tip: 'Enfoque en respiración para desescalar picos de estrés y estiramiento de piernas.' },
  { id: 'uci', name: 'UCI Adultos / Pediátrica', icon: 'Activity', tip: 'Enfoque en descanso visual por pantallas de monitorización y descompresión de cuello.' },
  { id: 'quirofano', name: 'Salas de Cirugía', icon: 'Scissors', tip: 'Enfoque en hombros, columna lumbar y muñecas tras largas intervenciones.' },
  { id: 'hospitalizacion', name: 'Hospitalización y Pisos', icon: 'Bed', tip: 'Enfoque en retorno venoso de piernas tras extensas rondas de enfermería.' },
  { id: 'laboratorio', name: 'Laboratorio e Imágenes', icon: 'FlaskConical', tip: 'Enfoque en muñecas por pipeteo, digitación y descanso visual de microscopio/placas.' },
  { id: 'farmacia_consulta', name: 'Farmacia / Consulta Externa', icon: 'Pill', tip: 'Enfoque en postura sedente, túnel carpiano y estiramiento de espalda.' },
  { id: 'administrativo', name: 'Sistemas y Administrativo', icon: 'FileText', tip: 'Regla 20-20-20 oftalmológica y corrección de postura en computador.' }
];

export const BIOSECURITY_RULES = [
  'Higiene de manos obligatoria (con solución alcohólica al 70% o agua y jabón) antes y después de realizar cualquier ejercicio que involucre el rostro o los ojos.',
  'En áreas de aislamiento o quirófano, realiza la pausa activa en la esclusa o área de descanso limpia para no contaminar superficies estériles.',
  'La pausa activa de 1 minuto nunca debe comprometer la vigilancia de pacientes inestables; en caso de llamado de auxilio, pulsa "Código de Emergencia" para pausar de inmediato.'
];
