// KAIRO Categories and Subcategories System

export interface CategoryOption {
  id: string;
  label: string;
  value: any;
}

export interface SubCategory {
  id: string;
  name: string;
  icon: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  subCategories: SubCategory[];
}

export const CATEGORIES: Category[] = [
  {
    id: 'salud',
    name: 'Salud y forma física',
    icon: '💪',
    color: 'mint',
    subCategories: [
      { id: 'bajar_peso', name: 'Bajar peso', icon: '⚖️' },
      { id: 'ganar_musculo', name: 'Ganar músculo/tonificar', icon: '💪' },
      { id: 'cardio', name: 'Mejorar cardio', icon: '🏃' },
      { id: 'movilidad', name: 'Movilidad/postura/dolor', icon: '🧘' },
      { id: 'mantener_activo', name: 'Mantenerme activo', icon: '🚶' },
    ]
  },
  {
    id: 'alimentacion',
    name: 'Alimentación saludable',
    icon: '🥗',
    color: 'green',
    subCategories: [
      { id: 'mas_verduras', name: 'Más verduras/calidad', icon: '🥦' },
      { id: 'mas_proteina', name: 'Aumentar proteína', icon: '🍗' },
      { id: 'menos_procesados', name: 'Menos ultraprocesados/azúcar', icon: '🚫' },
      { id: 'plan_menus', name: 'Plan de menús', icon: '📋' },
    ]
  },
  {
    id: 'mental',
    name: 'Salud mental y bienestar',
    icon: '🧠',
    color: 'purple',
    subCategories: [
      { id: 'reducir_estres', name: 'Reducir estrés/ansiedad', icon: '😌' },
      { id: 'dormir_mejor', name: 'Dormir mejor', icon: '😴' },
      { id: 'mindfulness', name: 'Mindfulness/journaling', icon: '📝' },
      { id: 'menos_pantalla', name: 'Menos pantalla', icon: '📱' },
    ]
  },
  {
    id: 'finanzas',
    name: 'Finanzas personales',
    icon: '💰',
    color: 'yellow',
    subCategories: [
      { id: 'ahorro', name: 'Ahorro', icon: '🐷' },
      { id: 'pagar_deudas', name: 'Pagar deudas', icon: '💳' },
      { id: 'gasto_consciente', name: 'Gasto consciente', icon: '🧾' },
      { id: 'presupuesto', name: 'Presupuesto 50/30/20', icon: '📊' },
    ]
  },
  {
    id: 'relaciones',
    name: 'Relaciones y familia',
    icon: '👥',
    color: 'pink',
    subCategories: [
      { id: 'pareja', name: 'Pareja', icon: '❤️' },
      { id: 'amistades', name: 'Amistades', icon: '🤝' },
      { id: 'familia', name: 'Familia', icon: '👨‍👩‍👧‍👦' },
      { id: 'conocer_gente', name: 'Conocer gente', icon: '🌟' },
    ]
  },
  {
    id: 'carrera',
    name: 'Carrera y aprendizaje',
    icon: '🎓',
    color: 'blue',
    subCategories: [
      { id: 'skill', name: 'Skill/certificación', icon: '📜' },
      { id: 'proyecto', name: 'Proyecto/portafolio', icon: '💼' },
      { id: 'networking', name: 'Entrevistas/networking', icon: '🤝' },
      { id: 'idiomas', name: 'Idiomas', icon: '🗣️' },
    ]
  },
  {
    id: 'reducir_habitos',
    name: 'Reducir hábitos nocivos',
    icon: '🚭',
    color: 'red',
    subCategories: [
      { id: 'fumar', name: 'Fumar', icon: '🚬' },
      { id: 'alcohol', name: 'Alcohol', icon: '🍺' },
      { id: 'azucar', name: 'Azúcar', icon: '🍬' },
      { id: 'redes', name: 'Redes sociales', icon: '📱' },
      { id: 'otro_habito', name: 'Otro hábito', icon: '⚠️' },
    ]
  },
  {
    id: 'organizacion',
    name: 'Organización y productividad',
    icon: '📅',
    color: 'teal',
    subCategories: [
      { id: 'plan_diario', name: 'Plan diario y foco', icon: '✅' },
      { id: 'revision_semanal', name: 'Revisión semanal', icon: '📆' },
      { id: 'declutter', name: 'Declutter hogar', icon: '🧹' },
      { id: 'inbox_zero', name: 'Inbox-zero', icon: '📧' },
    ]
  },
  {
    id: 'autocuidado',
    name: 'Autocuidado y estilo de vida',
    icon: '✨',
    color: 'lavender',
    subCategories: [
      { id: 'sueno_energia', name: 'Sueño/energía', icon: '💤' },
      { id: 'hobbies', name: 'Hobbies/creatividad', icon: '🎨' },
      { id: 'naturaleza', name: 'Naturaleza/movimiento suave', icon: '🌳' },
      { id: 'microplaceres', name: 'Micro-placeres', icon: '☕' },
    ]
  },
  {
    id: 'nuevo',
    name: 'Proponer nueva categoría',
    icon: '💡',
    color: 'orange',
    subCategories: []
  }
];

// Weight loss options
export const WEIGHT_OPTIONS: CategoryOption[] = [
  { id: '2kg', label: '2 kg', value: 2 },
  { id: '5kg', label: '5 kg', value: 5 },
  { id: '10kg', label: '10 kg', value: 10 },
];

// Deadline options
export const DEADLINE_OPTIONS: CategoryOption[] = [
  { id: '1w', label: '1 semana', value: 1 },
  { id: '2w', label: '2 semanas', value: 2 },
  { id: '1m', label: '1 mes', value: 4 },
  { id: '3m', label: '3 meses', value: 12 },
];

// Time per day options
export const TIME_OPTIONS: CategoryOption[] = [
  { id: '5m', label: '5 min', value: 5 },
  { id: '10m', label: '10 min', value: 10 },
  { id: '15m', label: '15 min', value: 15 },
  { id: '30m', label: '30 min', value: 30 },
];

// Activity level options
export const ACTIVITY_LEVEL_OPTIONS: CategoryOption[] = [
  { id: 'sedentario', label: 'Sedentario (< 3000 pasos)', value: 'sedentario' },
  { id: 'ligero', label: 'Ligero (3000-7000 pasos)', value: 'ligero' },
  { id: 'moderado', label: 'Moderado (7000-10000 pasos)', value: 'moderado' },
  { id: 'activo', label: 'Activo (> 10000 pasos)', value: 'activo' },
];

// Equipment options
export const EQUIPMENT_OPTIONS: CategoryOption[] = [
  { id: 'ninguno', label: 'Ninguno', value: 'ninguno' },
  { id: 'bandas', label: 'Bandas elásticas', value: 'bandas' },
  { id: 'mancuernas', label: 'Mancuernas', value: 'mancuernas' },
  { id: 'gym', label: 'Gym completo', value: 'gym' },
];

// Frequency options
export const FREQUENCY_OPTIONS: CategoryOption[] = [
  { id: '2x', label: '2 veces/semana', value: 2 },
  { id: '3x', label: '3 veces/semana', value: 3 },
  { id: '4x', label: '4 veces/semana', value: 4 },
  { id: '5x', label: '5 veces/semana', value: 5 },
  { id: 'diario', label: 'Todos los días', value: 7 },
];

// Language level options
export const LANGUAGE_LEVEL_OPTIONS: CategoryOption[] = [
  { id: 'a0', label: 'A0 (Principiante)', value: 'A0' },
  { id: 'a1', label: 'A1 (Básico)', value: 'A1' },
  { id: 'a2', label: 'A2 (Elemental)', value: 'A2' },
  { id: 'b1', label: 'B1 (Intermedio)', value: 'B1' },
  { id: 'b2', label: 'B2 (Intermedio alto)', value: 'B2' },
  { id: 'c1', label: 'C1 (Avanzado)', value: 'C1' },
];

// Language target options
export const LANGUAGE_TARGET_OPTIONS: CategoryOption[] = [
  { id: 'b1', label: 'B1 (Intermedio)', value: 'B1' },
  { id: 'b2', label: 'B2 (Intermedio alto)', value: 'B2' },
  { id: 'c1', label: 'C1 (Avanzado)', value: 'C1' },
  { id: 'conversacion', label: 'Conversación fluida', value: 'conversacion' },
];

// Time slot options
export const TIME_SLOT_OPTIONS: CategoryOption[] = [
  { id: 'manana', label: 'Mañana', value: 'manana' },
  { id: 'mediodia', label: 'Mediodía', value: 'mediodia' },
  { id: 'tarde', label: 'Tarde', value: 'tarde' },
  { id: 'noche', label: 'Noche', value: 'noche' },
];

export function getCategoryById(id: string): Category | undefined {
  return CATEGORIES.find(cat => cat.id === id);
}

export function getSubCategoryById(categoryId: string, subCategoryId: string): SubCategory | undefined {
  const category = getCategoryById(categoryId);
  return category?.subCategories.find(sub => sub.id === subCategoryId);
}

export function getCategoryIcon(categoryId: string): string {
  const category = getCategoryById(categoryId);
  return category?.icon || '✨';
}

export function getCategoryColor(categoryId: string): string {
  const category = getCategoryById(categoryId);
  return category?.color || 'primary';
}