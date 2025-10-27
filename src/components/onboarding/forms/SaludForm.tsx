import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  WEIGHT_OPTIONS, 
  ACTIVITY_LEVEL_OPTIONS,
  EQUIPMENT_OPTIONS,
  FREQUENCY_OPTIONS
} from '@/lib/categories';

interface SaludFormProps {
  subCategoryId: string;
  formData: any;
  onUpdate: (data: any) => void;
}

export const SaludForm = ({ subCategoryId, formData, onUpdate }: SaludFormProps) => {
  const updateField = (field: string, value: any) => {
    onUpdate({ ...formData, [field]: value });
  };

  if (subCategoryId === 'bajar_peso') {
    return (
      <>
        <div>
          <Label>¿Cuántos kilos quieres perder?</Label>
          <div className="grid grid-cols-3 gap-2 mt-2">
            {WEIGHT_OPTIONS.map((option) => (
              <Button
                key={option.id}
                variant={formData.targetWeight === option.value ? 'default' : 'outline'}
                onClick={() => {
                  updateField('targetWeight', option.value);
                  updateField('title', `Perder ${option.value}kg`);
                }}
                className="h-12"
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <Label>Nivel actual</Label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {[
              { id: '1', label: 'Principiante', value: 1 },
              { id: '2', label: 'Intermedio', value: 2 },
              { id: '3', label: 'Avanzado', value: 3 }
            ].map((option) => (
              <Button
                key={option.id}
                variant={formData.currentLevel === option.value ? 'default' : 'outline'}
                onClick={() => updateField('currentLevel', option.value)}
                className="h-10 text-sm"
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <Label>Peso inicial (kg)</Label>
          <Input
            type="number"
            value={formData.initialWeight || ''}
            onChange={(e) => updateField('initialWeight', parseFloat(e.target.value))}
            placeholder="70"
            className="mt-2"
          />
        </div>

        <div>
          <Label>Actividad actual</Label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {ACTIVITY_LEVEL_OPTIONS.map((option) => (
              <Button
                key={option.id}
                variant={formData.activityLevel === option.value ? 'default' : 'outline'}
                onClick={() => updateField('activityLevel', option.value)}
                className="h-auto py-2 text-xs"
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <Label>Equipo disponible</Label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {EQUIPMENT_OPTIONS.map((option) => (
              <Button
                key={option.id}
                variant={formData.equipment === option.value ? 'default' : 'outline'}
                onClick={() => updateField('equipment', option.value)}
                className="h-10 text-sm"
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <Label>¿Tienes lesiones? (opcional)</Label>
          <Input
            value={formData.injuries || ''}
            onChange={(e) => updateField('injuries', e.target.value)}
            placeholder="Ej: Rodilla derecha"
            className="mt-2"
          />
        </div>

        <div>
          <Label>Hora de cierre de cocina</Label>
          <Input
            type="time"
            value={formData.kitchenCloseTime || '20:00'}
            onChange={(e) => updateField('kitchenCloseTime', e.target.value)}
            className="mt-2"
          />
        </div>

        <div>
          <Label>Días flexibles por semana</Label>
          <div className="grid grid-cols-3 gap-2 mt-2">
            {[0, 1, 2].map((days) => (
              <Button
                key={days}
                variant={formData.flexibleDays === days ? 'default' : 'outline'}
                onClick={() => updateField('flexibleDays', days)}
                className="h-10"
              >
                {days} días
              </Button>
            ))}
          </div>
        </div>
      </>
    );
  }

  if (subCategoryId === 'ganar_musculo') {
    return (
      <>
        <div>
          <Label>Título del objetivo</Label>
          <Input
            value={formData.title || ''}
            onChange={(e) => updateField('title', e.target.value)}
            placeholder="Ej: Ganar masa muscular"
            className="mt-2"
          />
        </div>

        <div>
          <Label>Zonas prioritarias</Label>
          <Input
            value={formData.targetZones || ''}
            onChange={(e) => updateField('targetZones', e.target.value)}
            placeholder="Ej: Piernas, brazos, core"
            className="mt-2"
          />
        </div>

        <div>
          <Label>Frecuencia semanal</Label>
          <div className="grid grid-cols-3 gap-2 mt-2">
            {FREQUENCY_OPTIONS.slice(0, 5).map((option) => (
              <Button
                key={option.id}
                variant={formData.frequency === option.value ? 'default' : 'outline'}
                onClick={() => updateField('frequency', option.value)}
                className="h-10 text-sm"
              >
                {option.label.split('/')[0]}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <Label>Equipo disponible</Label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {EQUIPMENT_OPTIONS.map((option) => (
              <Button
                key={option.id}
                variant={formData.equipment === option.value ? 'default' : 'outline'}
                onClick={() => updateField('equipment', option.value)}
                className="h-10 text-sm"
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <Label>Experiencia técnica</Label>
          <div className="grid grid-cols-3 gap-2 mt-2">
            {[
              { id: 'baja', label: 'Baja', value: 'baja' },
              { id: 'media', label: 'Media', value: 'media' },
              { id: 'alta', label: 'Alta', value: 'alta' }
            ].map((option) => (
              <Button
                key={option.id}
                variant={formData.experience === option.value ? 'default' : 'outline'}
                onClick={() => updateField('experience', option.value)}
                className="h-10"
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <Label>Objetivo secundario</Label>
          <div className="grid grid-cols-3 gap-2 mt-2">
            {[
              { id: 'fuerza', label: 'Fuerza', value: 'fuerza' },
              { id: 'estetica', label: 'Estética', value: 'estetica' },
              { id: 'rendimiento', label: 'Rendimiento', value: 'rendimiento' }
            ].map((option) => (
              <Button
                key={option.id}
                variant={formData.secondaryGoal === option.value ? 'default' : 'outline'}
                onClick={() => updateField('secondaryGoal', option.value)}
                className="h-10 text-xs"
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>
      </>
    );
  }

  if (subCategoryId === 'cardio') {
    return (
      <>
        <div>
          <Label>Título del objetivo</Label>
          <Input
            value={formData.title || ''}
            onChange={(e) => updateField('title', e.target.value)}
            placeholder="Ej: Mejorar resistencia cardiovascular"
            className="mt-2"
          />
        </div>

        <div>
          <Label>Modalidad preferida</Label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {[
              { id: 'caminar', label: 'Caminar', value: 'caminar' },
              { id: 'correr', label: 'Correr', value: 'correr' },
              { id: 'bici', label: 'Bicicleta', value: 'bici' },
              { id: 'hiit', label: 'HIIT suave', value: 'hiit' }
            ].map((option) => (
              <Button
                key={option.id}
                variant={formData.modality === option.value ? 'default' : 'outline'}
                onClick={() => updateField('modality', option.value)}
                className="h-10 text-sm"
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <Label>Frecuencia semanal</Label>
          <div className="grid grid-cols-3 gap-2 mt-2">
            {FREQUENCY_OPTIONS.slice(0, 5).map((option) => (
              <Button
                key={option.id}
                variant={formData.frequency === option.value ? 'default' : 'outline'}
                onClick={() => updateField('frequency', option.value)}
                className="h-10 text-sm"
              >
                {option.label.split('/')[0]}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <Label>Entorno</Label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {[
              { id: 'exterior', label: 'Exterior', value: 'exterior' },
              { id: 'cinta', label: 'Cinta/Gimnasio', value: 'cinta' }
            ].map((option) => (
              <Button
                key={option.id}
                variant={formData.environment === option.value ? 'default' : 'outline'}
                onClick={() => updateField('environment', option.value)}
                className="h-10 text-sm"
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <Label>Condición actual</Label>
          <div className="grid grid-cols-3 gap-2 mt-2">
            {[
              { id: 'baja', label: 'Baja', value: 'baja' },
              { id: 'media', label: 'Media', value: 'media' },
              { id: 'buena', label: 'Buena', value: 'buena' }
            ].map((option) => (
              <Button
                key={option.id}
                variant={formData.condition === option.value ? 'default' : 'outline'}
                onClick={() => updateField('condition', option.value)}
                className="h-10"
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>
      </>
    );
  }

  if (subCategoryId === 'movilidad') {
    return (
      <>
        <div>
          <Label>Título del objetivo</Label>
          <Input
            value={formData.title || ''}
            onChange={(e) => updateField('title', e.target.value)}
            placeholder="Ej: Mejorar movilidad lumbar"
            className="mt-2"
          />
        </div>

        <div>
          <Label>Zona principal</Label>
          <Input
            value={formData.targetZone || ''}
            onChange={(e) => updateField('targetZone', e.target.value)}
            placeholder="Ej: Espalda baja, cuello, cadera"
            className="mt-2"
          />
        </div>

        <div>
          <Label>Situación de dolor</Label>
          <div className="grid grid-cols-3 gap-2 mt-2">
            {[
              { id: 'sin_dolor', label: 'Sin dolor', value: 'sin_dolor' },
              { id: 'leve', label: 'Leve', value: 'leve' },
              { id: 'moderado', label: 'Moderado', value: 'moderado' }
            ].map((option) => (
              <Button
                key={option.id}
                variant={formData.painLevel === option.value ? 'default' : 'outline'}
                onClick={() => updateField('painLevel', option.value)}
                className="h-10 text-xs"
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <Label>Rigidez actual</Label>
          <div className="grid grid-cols-3 gap-2 mt-2">
            {[
              { id: 'baja', label: 'Baja', value: 'baja' },
              { id: 'media', label: 'Media', value: 'media' },
              { id: 'alta', label: 'Alta', value: 'alta' }
            ].map((option) => (
              <Button
                key={option.id}
                variant={formData.stiffness === option.value ? 'default' : 'outline'}
                onClick={() => updateField('stiffness', option.value)}
                className="h-10"
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>
      </>
    );
  }

  if (subCategoryId === 'mantener_activo') {
    return (
      <>
        <div>
          <Label>Título del objetivo</Label>
          <Input
            value={formData.title || ''}
            onChange={(e) => updateField('title', e.target.value)}
            placeholder="Ej: Mantenerme activo diariamente"
            className="mt-2"
          />
        </div>

        <div>
          <Label>Objetivo de pasos diarios</Label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {[
              { id: '5000', label: '5,000 pasos', value: 5000 },
              { id: '7500', label: '7,500 pasos', value: 7500 },
              { id: '10000', label: '10,000 pasos', value: 10000 },
              { id: '12500', label: '12,500 pasos', value: 12500 }
            ].map((option) => (
              <Button
                key={option.id}
                variant={formData.stepsGoal === option.value ? 'default' : 'outline'}
                onClick={() => updateField('stepsGoal', option.value)}
                className="h-10 text-sm"
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <Label>Días activos por semana</Label>
          <div className="grid grid-cols-4 gap-2 mt-2">
            {[5, 6, 7].map((days) => (
              <Button
                key={days}
                variant={formData.activeDays === days ? 'default' : 'outline'}
                onClick={() => updateField('activeDays', days)}
                className="h-10"
              >
                {days} días
              </Button>
            ))}
          </div>
        </div>
      </>
    );
  }

  return null;
};