import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface MentalFormProps {
  subCategoryId: string;
  formData: any;
  onUpdate: (data: any) => void;
}

export const MentalForm = ({ subCategoryId, formData, onUpdate }: MentalFormProps) => {
  const updateField = (field: string, value: any) => {
    onUpdate({ ...formData, [field]: value });
  };

  if (subCategoryId === 'reducir_estres') {
    return (
      <>
        <div>
          <Label>Título del objetivo</Label>
          <Input
            value={formData.title || ''}
            onChange={(e) => updateField('title', e.target.value)}
            placeholder="Ej: Reducir estrés diario"
            className="mt-2"
          />
        </div>

        <div>
          <Label>Nivel actual de estrés</Label>
          <div className="grid grid-cols-3 gap-2 mt-2">
            {[
              { id: 'bajo', label: 'Bajo', value: 'bajo' },
              { id: 'moderado', label: 'Moderado', value: 'moderado' },
              { id: 'alto', label: 'Alto', value: 'alto' }
            ].map((option) => (
              <Button
                key={option.id}
                variant={formData.stressLevel === option.value ? 'default' : 'outline'}
                onClick={() => updateField('stressLevel', option.value)}
                className="h-10"
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <Label>Disparadores principales</Label>
          <Input
            value={formData.triggers || ''}
            onChange={(e) => updateField('triggers', e.target.value)}
            placeholder="Ej: Trabajo, tráfico, familia"
            className="mt-2"
          />
        </div>

        <div>
          <Label>Técnicas preferidas</Label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {[
              { id: 'respiracion', label: 'Respiración', value: 'respiracion' },
              { id: 'pausas', label: 'Pausas activas', value: 'pausas' },
              { id: 'caminatas', label: 'Caminatas', value: 'caminatas' },
              { id: 'meditacion', label: 'Meditación', value: 'meditacion' }
            ].map((option) => (
              <Button
                key={option.id}
                variant={formData.technique === option.value ? 'default' : 'outline'}
                onClick={() => updateField('technique', option.value)}
                className="h-10 text-sm"
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <Label>Horarios críticos</Label>
          <Input
            value={formData.criticalTimes || ''}
            onChange={(e) => updateField('criticalTimes', e.target.value)}
            placeholder="Ej: 9-11am, 3-5pm"
            className="mt-2"
          />
        </div>
      </>
    );
  }

  if (subCategoryId === 'dormir_mejor') {
    return (
      <>
        <div>
          <Label>Título del objetivo</Label>
          <Input
            value={formData.title || ''}
            onChange={(e) => updateField('title', e.target.value)}
            placeholder="Ej: Mejorar calidad del sueño"
            className="mt-2"
          />
        </div>

        <div>
          <Label>Hora deseada de dormir</Label>
          <Input
            type="time"
            value={formData.bedtime || '22:30'}
            onChange={(e) => updateField('bedtime', e.target.value)}
            className="mt-2"
          />
        </div>

        <div>
          <Label>Hora deseada de despertar</Label>
          <Input
            type="time"
            value={formData.wakeTime || '06:30'}
            onChange={(e) => updateField('wakeTime', e.target.value)}
            className="mt-2"
          />
        </div>

        <div>
          <Label>Horas objetivo de sueño</Label>
          <div className="grid grid-cols-4 gap-2 mt-2">
            {[6, 7, 8, 9].map((hours) => (
              <Button
                key={hours}
                variant={formData.sleepHours === hours ? 'default' : 'outline'}
                onClick={() => updateField('sleepHours', hours)}
                className="h-10"
              >
                {hours}h
              </Button>
            ))}
          </div>
        </div>

        <div>
          <Label>Problema principal</Label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {[
              { id: 'conciliar', label: 'Conciliar sueño', value: 'conciliar' },
              { id: 'despertar', label: 'Despertares', value: 'despertar' },
              { id: 'temprano', label: 'Despertar temprano', value: 'temprano' },
              { id: 'calidad', label: 'Calidad', value: 'calidad' }
            ].map((option) => (
              <Button
                key={option.id}
                variant={formData.sleepProblem === option.value ? 'default' : 'outline'}
                onClick={() => updateField('sleepProblem', option.value)}
                className="h-10 text-xs"
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <Label>Duración ritual nocturno (minutos)</Label>
          <div className="grid grid-cols-4 gap-2 mt-2">
            {[10, 15, 20, 30].map((mins) => (
              <Button
                key={mins}
                variant={formData.ritualDuration === mins ? 'default' : 'outline'}
                onClick={() => updateField('ritualDuration', mins)}
                className="h-10"
              >
                {mins}m
              </Button>
            ))}
          </div>
        </div>

        <div>
          <Label>¿Cafeína en la tarde?</Label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {[
              { id: 'si', label: 'Sí', value: true },
              { id: 'no', label: 'No', value: false }
            ].map((option) => (
              <Button
                key={option.id}
                variant={formData.afternoonCaffeine === option.value ? 'default' : 'outline'}
                onClick={() => updateField('afternoonCaffeine', option.value)}
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

  if (subCategoryId === 'mindfulness') {
    return (
      <>
        <div>
          <Label>Título del objetivo</Label>
          <Input
            value={formData.title || ''}
            onChange={(e) => updateField('title', e.target.value)}
            placeholder="Ej: Práctica diaria de mindfulness"
            className="mt-2"
          />
        </div>

        <div>
          <Label>Práctica preferida</Label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {[
              { id: 'meditacion', label: 'Meditación', value: 'meditacion' },
              { id: 'respiracion', label: 'Respiración', value: 'respiracion' },
              { id: 'diario', label: 'Diario/Journaling', value: 'diario' },
              { id: 'gratitud', label: 'Gratitud', value: 'gratitud' }
            ].map((option) => (
              <Button
                key={option.id}
                variant={formData.practice === option.value ? 'default' : 'outline'}
                onClick={() => updateField('practice', option.value)}
                className="h-10 text-sm"
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <Label>Frecuencia objetivo</Label>
          <div className="grid grid-cols-3 gap-2 mt-2">
            {[
              { id: 'diaria', label: 'Diaria', value: 7 },
              { id: '5x', label: '5x semana', value: 5 },
              { id: '3x', label: '3x semana', value: 3 }
            ].map((option) => (
              <Button
                key={option.id}
                variant={formData.frequency === option.value ? 'default' : 'outline'}
                onClick={() => updateField('frequency', option.value)}
                className="h-10 text-sm"
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <Label>Temas de enfoque</Label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {[
              { id: 'gratitud', label: 'Gratitud', value: 'gratitud' },
              { id: 'claridad', label: 'Claridad mental', value: 'claridad' },
              { id: 'autodiálogo', label: 'Autodiálogo', value: 'autodiálogo' },
              { id: 'emociones', label: 'Emociones', value: 'emociones' }
            ].map((option) => (
              <Button
                key={option.id}
                variant={formData.focusTopic === option.value ? 'default' : 'outline'}
                onClick={() => updateField('focusTopic', option.value)}
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

  if (subCategoryId === 'menos_pantalla') {
    return (
      <>
        <div>
          <Label>Título del objetivo</Label>
          <Input
            value={formData.title || ''}
            onChange={(e) => updateField('title', e.target.value)}
            placeholder="Ej: Reducir tiempo de pantalla"
            className="mt-2"
          />
        </div>

        <div>
          <Label>Apps objetivo a reducir</Label>
          <Input
            value={formData.targetApps || ''}
            onChange={(e) => updateField('targetApps', e.target.value)}
            placeholder="Ej: Instagram, TikTok, YouTube"
            className="mt-2"
          />
        </div>

        <div>
          <Label>Límite diario (horas)</Label>
          <div className="grid grid-cols-5 gap-2 mt-2">
            {[0.5, 1, 1.5, 2, 3].map((hours) => (
              <Button
                key={hours}
                variant={formData.dailyLimit === hours ? 'default' : 'outline'}
                onClick={() => updateField('dailyLimit', hours)}
                className="h-10 text-xs"
              >
                {hours}h
              </Button>
            ))}
          </div>
        </div>

        <div>
          <Label>Franjas de veto</Label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {[
              { id: 'manana', label: 'Primera hora', value: 'manana' },
              { id: 'comidas', label: 'Durante comidas', value: 'comidas' },
              { id: 'noche', label: '1h antes dormir', value: 'noche' },
              { id: 'trabajo', label: 'En trabajo', value: 'trabajo' }
            ].map((option) => (
              <Button
                key={option.id}
                variant={formData.vetoSlots?.includes(option.value) ? 'default' : 'outline'}
                onClick={() => {
                  const current = formData.vetoSlots || [];
                  const updated = current.includes(option.value)
                    ? current.filter((s: string) => s !== option.value)
                    : [...current, option.value];
                  updateField('vetoSlots', updated);
                }}
                className="h-10 text-xs"
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <Label>Alternativas rápidas</Label>
          <Input
            value={formData.alternatives || ''}
            onChange={(e) => updateField('alternatives', e.target.value)}
            placeholder="Ej: Leer, caminar, estirar"
            className="mt-2"
          />
        </div>
      </>
    );
  }

  return null;
};