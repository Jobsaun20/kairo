// Task Planner Engine for KAIRO
// Generates daily micro-tasks based on goal, level, and user preferences

export interface Task {
  kind: 'accion' | 'educacion' | 'reflexion';
  minutes: number;
  text: string;
  category: string;
  level: number;
  tags: string[];
}

// Seed task database
const TASK_LIBRARY: Task[] = [
  // SALUD - Level 1
  { kind: 'accion', minutes: 5, text: 'Da 300 pasos sin mirar el móvil.', category: 'salud', level: 1, tags: ['home', 'sin_equipo'] },
  { kind: 'accion', minutes: 5, text: 'Haz 10 sentadillas lentas y controladas.', category: 'salud', level: 1, tags: ['home', 'sin_equipo'] },
  { kind: 'educacion', minutes: 5, text: 'Lee la etiqueta nutricional de 1 alimento que comes hoy.', category: 'salud', level: 1, tags: ['home'] },
  { kind: 'reflexion', minutes: 2, text: 'Escribe 1 obstáculo que tuviste hoy para moverte y un plan B.', category: 'salud', level: 1, tags: ['home'] },
  { kind: 'accion', minutes: 3, text: 'Bebe un vaso de agua antes de tu próxima comida.', category: 'salud', level: 1, tags: ['home'] },
  
  // SALUD - Level 2
  { kind: 'accion', minutes: 10, text: '8 intervalos de 30" marcha rápida + 30" pausa.', category: 'salud', level: 2, tags: ['home', 'sin_equipo'] },
  { kind: 'accion', minutes: 10, text: '3 series de 8 sentadillas + 8 elevaciones de talones.', category: 'salud', level: 2, tags: ['home', 'sin_equipo'] },
  { kind: 'educacion', minutes: 8, text: 'Lee un artículo corto sobre proteínas o hidratos.', category: 'salud', level: 2, tags: ['home'] },
  { kind: 'reflexion', minutes: 3, text: '¿Qué comida saludable puedes preparar en 10 min?', category: 'salud', level: 2, tags: ['home'] },
  { kind: 'accion', minutes: 5, text: 'Prepara una ensalada simple para acompañar tu comida.', category: 'salud', level: 2, tags: ['home'] },

  // SALUD - Level 3-5
  { kind: 'accion', minutes: 15, text: '12 min de caminata rápida con 3 sprints de 20".', category: 'salud', level: 3, tags: ['sin_equipo'] },
  { kind: 'accion', minutes: 15, text: 'Circuito: 15 sentadillas + 10 flexiones + 30" plancha, x3.', category: 'salud', level: 3, tags: ['home', 'sin_equipo'] },
  { kind: 'educacion', minutes: 10, text: 'Mira un vídeo de 10 min sobre macronutrientes.', category: 'salud', level: 3, tags: ['home'] },
  { kind: 'accion', minutes: 20, text: '15 min de cardio + 5 min de estiramientos.', category: 'salud', level: 4, tags: ['sin_equipo'] },
  { kind: 'accion', minutes: 25, text: 'Rutina completa: calentamiento + fuerza + core + estiramientos.', category: 'salud', level: 5, tags: ['sin_equipo'] },

  // IDIOMA - Level 1
  { kind: 'educacion', minutes: 5, text: 'Aprende 5 palabras nuevas de un tema que te guste.', category: 'idioma', level: 1, tags: ['home'] },
  { kind: 'accion', minutes: 5, text: 'Escucha una canción en el idioma y busca 1 palabra.', category: 'idioma', level: 1, tags: ['home'] },
  { kind: 'reflexion', minutes: 2, text: 'Escribe 1 frase sobre tu día usando 1 palabra nueva.', category: 'idioma', level: 1, tags: ['home'] },
  { kind: 'educacion', minutes: 5, text: 'Mira 5 min de un vídeo infantil en el idioma.', category: 'idioma', level: 1, tags: ['home'] },
  { kind: 'accion', minutes: 3, text: 'Lee en voz alta 5 frases de un libro para niños.', category: 'idioma', level: 1, tags: ['home'] },

  // IDIOMA - Level 2
  { kind: 'educacion', minutes: 10, text: 'Completa una lección de gramática básica.', category: 'idioma', level: 2, tags: ['home'] },
  { kind: 'accion', minutes: 8, text: 'Shadowing: repite 3-5 min de un vídeo que te guste.', category: 'idioma', level: 2, tags: ['home'] },
  { kind: 'reflexion', minutes: 3, text: 'Escribe 3 frases sobre tu rutina matinal.', category: 'idioma', level: 2, tags: ['home'] },
  { kind: 'educacion', minutes: 10, text: 'Mira un episodio corto con subtítulos en el idioma.', category: 'idioma', level: 2, tags: ['home'] },
  { kind: 'accion', minutes: 10, text: 'Practica pronunciación de 10 palabras difíciles.', category: 'idioma', level: 2, tags: ['home'] },

  // IDIOMA - Level 3-5
  { kind: 'accion', minutes: 15, text: 'Conversación de 15 min con IA o intercambio.', category: 'idioma', level: 3, tags: ['home'] },
  { kind: 'educacion', minutes: 15, text: 'Lee un artículo de noticias y resume en 5 frases.', category: 'idioma', level: 3, tags: ['home'] },
  { kind: 'reflexion', minutes: 5, text: 'Escribe un párrafo sobre un tema que te apasione.', category: 'idioma', level: 3, tags: ['home'] },
  { kind: 'accion', minutes: 20, text: 'Mira un episodio completo sin subtítulos en tu idioma.', category: 'idioma', level: 4, tags: ['home'] },
  { kind: 'educacion', minutes: 25, text: 'Lee un capítulo de un libro y toma notas de vocabulario.', category: 'idioma', level: 5, tags: ['home'] },

  // AHORRO - Level 1
  { kind: 'accion', minutes: 0, text: 'Evita tu gasto evitable elegido hoy (café, snack, etc).', category: 'ahorro', level: 1, tags: ['home'] },
  { kind: 'accion', minutes: 5, text: 'Aparta 3 CHF a tu hucha o cuenta de ahorro.', category: 'ahorro', level: 1, tags: ['home'] },
  { kind: 'reflexion', minutes: 2, text: '¿Qué gatillo emocional te hizo querer gastar hoy?', category: 'ahorro', level: 1, tags: ['home'] },
  { kind: 'educacion', minutes: 5, text: 'Lee 1 tip sobre ahorro o finanzas personales.', category: 'ahorro', level: 1, tags: ['home'] },
  { kind: 'accion', minutes: 3, text: 'Revisa tus compras de esta semana y marca las innecesarias.', category: 'ahorro', level: 1, tags: ['home'] },

  // AHORRO - Level 2-5
  { kind: 'accion', minutes: 10, text: 'Aparta 5 CHF y anota en qué NO lo gastaste.', category: 'ahorro', level: 2, tags: ['home'] },
  { kind: 'educacion', minutes: 10, text: 'Mira un vídeo de 10 min sobre presupuesto personal.', category: 'ahorro', level: 2, tags: ['home'] },
  { kind: 'reflexion', minutes: 5, text: 'Calcula cuánto ahorras al mes evitando tu gasto principal.', category: 'ahorro', level: 2, tags: ['home'] },
  { kind: 'accion', minutes: 15, text: 'Crea un presupuesto semanal simple en una hoja.', category: 'ahorro', level: 3, tags: ['home'] },
  { kind: 'educacion', minutes: 15, text: 'Investiga 1 método de inversión o ahorro automático.', category: 'ahorro', level: 3, tags: ['home'] },
  { kind: 'accion', minutes: 20, text: 'Configura una transferencia automática de ahorro.', category: 'ahorro', level: 4, tags: ['home'] },
  { kind: 'reflexion', minutes: 10, text: 'Revisa tus gastos del mes y establece metas para el próximo.', category: 'ahorro', level: 4, tags: ['home'] },

  // ENFOQUE - Level 1
  { kind: 'accion', minutes: 10, text: '1 Pomodoro de 10 min, móvil boca abajo, 1 tarea.', category: 'enfoque', level: 1, tags: ['home'] },
  { kind: 'accion', minutes: 5, text: 'Limpia pestañas del navegador, deja máximo 3 abiertas.', category: 'enfoque', level: 1, tags: ['home'] },
  { kind: 'reflexion', minutes: 2, text: 'Escribe cuál es TU distractor principal hoy.', category: 'enfoque', level: 1, tags: ['home'] },
  { kind: 'educacion', minutes: 5, text: 'Lee 1 artículo corto sobre técnicas de concentración.', category: 'enfoque', level: 1, tags: ['home'] },
  { kind: 'accion', minutes: 5, text: 'Silencia notificaciones de apps durante 30 min.', category: 'enfoque', level: 1, tags: ['home'] },

  // ENFOQUE - Level 2-5
  { kind: 'accion', minutes: 15, text: '1 Pomodoro de 15 min + 5 min de pausa consciente.', category: 'enfoque', level: 2, tags: ['home'] },
  { kind: 'educacion', minutes: 10, text: 'Mira un vídeo sobre el método Pomodoro o GTD.', category: 'enfoque', level: 2, tags: ['home'] },
  { kind: 'reflexion', minutes: 5, text: 'Lista las 3 tareas más importantes para mañana.', category: 'enfoque', level: 2, tags: ['home'] },
  { kind: 'accion', minutes: 20, text: '2 Pomodoros seguidos (2x10 min) con descanso entre ellos.', category: 'enfoque', level: 3, tags: ['home'] },
  { kind: 'educacion', minutes: 15, text: 'Estudia una técnica de productividad y pruébala.', category: 'enfoque', level: 3, tags: ['home'] },
  { kind: 'accion', minutes: 25, text: 'Sesión de Deep Work: 25 min sin interrupciones en tu tarea clave.', category: 'enfoque', level: 4, tags: ['home'] },
  { kind: 'reflexion', minutes: 10, text: 'Revisa tu semana: ¿cuántas horas de enfoque real tuviste?', category: 'enfoque', level: 4, tags: ['home'] },

  // OTRO - Generic tasks
  { kind: 'reflexion', minutes: 3, text: 'Escribe el micro-paso de hoy hacia tu objetivo (1 frase).', category: 'otro', level: 1, tags: ['home'] },
  { kind: 'accion', minutes: 10, text: 'Haz ahora el micro-paso que escribiste.', category: 'otro', level: 1, tags: ['home'] },
  { kind: 'reflexion', minutes: 2, text: 'Anota qué pequeño avance lograste o desbloqueaste hoy.', category: 'otro', level: 1, tags: ['home'] },
  { kind: 'educacion', minutes: 10, text: 'Lee o mira contenido relacionado con tu objetivo por 10 min.', category: 'otro', level: 2, tags: ['home'] },
  { kind: 'accion', minutes: 15, text: 'Dedica 15 min a practicar tu habilidad objetivo.', category: 'otro', level: 2, tags: ['home'] },
  { kind: 'reflexion', minutes: 5, text: '¿Qué obstáculo te frena? Escribe 2 soluciones posibles.', category: 'otro', level: 2, tags: ['home'] },
  { kind: 'accion', minutes: 20, text: 'Sesión práctica: 20 min enfocado en tu objetivo.', category: 'otro', level: 3, tags: ['home'] },
  { kind: 'educacion', minutes: 15, text: 'Investiga sobre alguien que logró lo que tú buscas.', category: 'otro', level: 3, tags: ['home'] },
  { kind: 'accion', minutes: 25, text: 'Bloque de trabajo intenso en tu objetivo principal.', category: 'otro', level: 4, tags: ['home'] },
  { kind: 'reflexion', minutes: 10, text: 'Evalúa tu progreso semanal y ajusta tu estrategia.', category: 'otro', level: 4, tags: ['home'] },
];

interface TaskHistory {
  kind: string;
  text: string;
}

export function pickTodayTask(
  category: string,
  level: number,
  minutesPreferred: number,
  history: TaskHistory[]
): Task | null {
  // Filter tasks by category and level (±1 level tolerance)
  const eligibleTasks = TASK_LIBRARY.filter(task => 
    task.category === category &&
    Math.abs(task.level - level) <= 1 &&
    Math.abs(task.minutes - minutesPreferred) <= 5
  );

  if (eligibleTasks.length === 0) return null;

  // Avoid repeating same kind 3 times in a row
  const recentKinds = history.slice(-2).map(h => h.kind);
  let availableTasks = eligibleTasks;
  
  if (recentKinds.length === 2 && recentKinds[0] === recentKinds[1]) {
    const repeated = recentKinds[0];
    const differentKind = eligibleTasks.filter(t => t.kind !== repeated);
    if (differentKind.length > 0) {
      availableTasks = differentKind;
    }
  }

  // Avoid repeating exact same task from last 5 days
  const recentTexts = new Set(history.slice(-5).map(h => h.text));
  const novelTasks = availableTasks.filter(t => !recentTexts.has(t.text));
  const finalPool = novelTasks.length > 0 ? novelTasks : availableTasks;

  // Random selection
  return finalPool[Math.floor(Math.random() * finalPool.length)];
}

export function getCategoryIcon(category: string): string {
  const icons: Record<string, string> = {
    salud: '💪',
    alimentacion: '🥗',
    mental: '🧠',
    finanzas: '💰',
    relaciones: '👥',
    carrera: '🎓',
    reducir_habitos: '🚭',
    organizacion: '📅',
    autocuidado: '✨',
    nuevo: '💡',
    // Legacy support
    idioma: '🗣️',
    ahorro: '💰',
    enfoque: '🎯',
    otro: '✨'
  };
  return icons[category] || '✨';
}

export function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    salud: 'mint',
    alimentacion: 'green',
    mental: 'purple',
    finanzas: 'yellow',
    relaciones: 'pink',
    carrera: 'blue',
    reducir_habitos: 'red',
    organizacion: 'teal',
    autocuidado: 'lavender',
    nuevo: 'orange',
    // Legacy support
    idioma: 'blue',
    ahorro: 'yellow',
    enfoque: 'pink',
    otro: 'primary'
  };
  return colors[category] || 'primary';
}
