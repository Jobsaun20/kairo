import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface RelacionesFormProps {
  subCategoryId: string;
  formData: any;
  onUpdate: (data: any) => void;
}

export const RelacionesForm = ({ subCategoryId, formData, onUpdate }: RelacionesFormProps) => {
  const updateField = (field: string, value: any) => {
    onUpdate({ ...formData, [field]: value });
  };

  if (subCategoryId === 'pareja') {
    return (
      <>
        <div>
          <Label>Título del objetivo</Label>
          <Input
            value={formData.title || ''}
            onChange={(e) => updateField('title', e.target.value)}
            placeholder="Ej: Fortalecer relación de pareja"
            className="mt-2"
          />
        </div>

        <div>
          <Label>Lenguaje del amor principal</Label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {[
              { id: 'palabras', label: 'Palabras de afirmación', value: 'palabras' },
              { id: 'tiempo', label: 'Tiempo de calidad', value: 'tiempo' },
              { id: 'regalos', label: 'Regalos', value: 'regalos' },
              { id: 'servicio', label: 'Actos de servicio', value: 'servicio' },
              { id: 'contacto', label: 'Contacto físico', value: 'contacto' }
            ].map((option) => (
              <Button
                key={option.id}
                variant={formData.loveLanguage === option.value ? 'default' : 'outline'}
                onClick={() => updateField('loveLanguage', option.value)}
                className="h-auto py-2 text-xs"
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <Label>Ritual semanal</Label>
          <Input
            value={formData.weeklyRitual || ''}
            onChange={(e) => updateField('weeklyRitual', e.target.value)}
            placeholder="Ej: Cena romántica, paseo"
            className="mt-2"
          />
        </div>

        <div>
          <Label>Temas a mejorar</Label>
          <Input
            value={formData.improvementAreas || ''}
            onChange={(e) => updateField('improvementAreas', e.target.value)}
            placeholder="Ej: Comunicación, tiempo juntos"
            className="mt-2"
          />
        </div>
      </>
    );
  }

  if (subCategoryId === 'amistades') {
    return (
      <>
        <div>
          <Label>Título del objetivo</Label>
          <Input
            value={formData.title || ''}
            onChange={(e) => updateField('title', e.target.value)}
            placeholder="Ej: Mantener contacto con amigos"
            className="mt-2"
          />
        </div>

        <div>
          <Label>Personas prioritarias (nombres o número)</Label>
          <Input
            value={formData.priorityPeople || ''}
            onChange={(e) => updateField('priorityPeople', e.target.value)}
            placeholder="Ej: María, Juan, Pedro (3 personas)"
            className="mt-2"
          />
        </div>

        <div>
          <Label>Frecuencia de contacto</Label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {[
              { id: 'diario', label: 'Mensaje diario', value: 'diario' },
              { id: 'semanal', label: 'Semanal', value: 'semanal' },
              { id: 'quincenal', label: 'Quincenal', value: 'quincenal' },
              { id: 'mensual', label: 'Mensual', value: 'mensual' }
            ].map((option) => (
              <Button
                key={option.id}
                variant={formData.contactFrequency === option.value ? 'default' : 'outline'}
                onClick={() => updateField('contactFrequency', option.value)}
                className="h-10 text-sm"
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <Label>Tipo de actividad preferida</Label>
          <Input
            value={formData.activityType || ''}
            onChange={(e) => updateField('activityType', e.target.value)}
            placeholder="Ej: Café, deportes, cine"
            className="mt-2"
          />
        </div>

        <div>
          <Label>Presupuesto mensual (CHF)</Label>
          <Input
            type="number"
            value={formData.monthlyBudget || ''}
            onChange={(e) => updateField('monthlyBudget', parseInt(e.target.value))}
            placeholder="100"
            className="mt-2"
          />
        </div>
      </>
    );
  }

  if (subCategoryId === 'familia') {
    return (
      <>
        <div>
          <Label>Título del objetivo</Label>
          <Input
            value={formData.title || ''}
            onChange={(e) => updateField('title', e.target.value)}
            placeholder="Ej: Tiempo de calidad en familia"
            className="mt-2"
          />
        </div>

        <div>
          <Label>Miembros foco</Label>
          <Input
            value={formData.focusMembers || ''}
            onChange={(e) => updateField('focusMembers', e.target.value)}
            placeholder="Ej: Padres, hijos, abuelos"
            className="mt-2"
          />
        </div>

        <div>
          <Label>Rituales familiares</Label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {[
              { id: 'comida', label: 'Comida juntos', value: 'comida' },
              { id: 'paseo', label: 'Paseo/excursión', value: 'paseo' },
              { id: 'juego', label: 'Juegos de mesa', value: 'juego' },
              { id: 'pelicula', label: 'Película', value: 'pelicula' }
            ].map((option) => (
              <Button
                key={option.id}
                variant={formData.ritual === option.value ? 'default' : 'outline'}
                onClick={() => updateField('ritual', option.value)}
                className="h-10 text-sm"
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <Label>Duración por sesión (minutos)</Label>
          <div className="grid grid-cols-4 gap-2 mt-2">
            {[30, 60, 90, 120].map((mins) => (
              <Button
                key={mins}
                variant={formData.sessionDuration === mins ? 'default' : 'outline'}
                onClick={() => updateField('sessionDuration', mins)}
                className="h-10 text-sm"
              >
                {mins}m
              </Button>
            ))}
          </div>
        </div>

        <div>
          <Label>Días preferidos</Label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {[
              { id: 'entre_semana', label: 'Entre semana', value: 'entre_semana' },
              { id: 'fin_semana', label: 'Fin de semana', value: 'fin_semana' }
            ].map((option) => (
              <Button
                key={option.id}
                variant={formData.preferredDays === option.value ? 'default' : 'outline'}
                onClick={() => updateField('preferredDays', option.value)}
                className="h-10 text-sm"
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>
      </>
    );
  }

  if (subCategoryId === 'conocer_gente') {
    return (
      <>
        <div>
          <Label>Título del objetivo</Label>
          <Input
            value={formData.title || ''}
            onChange={(e) => updateField('title', e.target.value)}
            placeholder="Ej: Ampliar círculo social"
            className="mt-2"
          />
        </div>

        <div>
          <Label>Intereses principales</Label>
          <Input
            value={formData.interests || ''}
            onChange={(e) => updateField('interests', e.target.value)}
            placeholder="Ej: Deportes, arte, tecnología"
            className="mt-2"
          />
        </div>

        <div>
          <Label>Formato preferido</Label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {[
              { id: 'clase', label: 'Clase/taller', value: 'clase' },
              { id: 'evento', label: 'Eventos', value: 'evento' },
              { id: 'deporte', label: 'Deporte', value: 'deporte' },
              { id: 'voluntariado', label: 'Voluntariado', value: 'voluntariado' }
            ].map((option) => (
              <Button
                key={option.id}
                variant={formData.format === option.value ? 'default' : 'outline'}
                onClick={() => updateField('format', option.value)}
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
            {[1, 2, 3].map((times) => (
              <Button
                key={times}
                variant={formData.weeklyFrequency === times ? 'default' : 'outline'}
                onClick={() => updateField('weeklyFrequency', times)}
                className="h-10"
              >
                {times}x/sem
              </Button>
            ))}
          </div>
        </div>

        <div>
          <Label>Nivel de introversión</Label>
          <div className="grid grid-cols-3 gap-2 mt-2">
            {[
              { id: 'extrovertido', label: 'Extrovertido', value: 'extrovertido' },
              { id: 'ambivertido', label: 'Ambivertido', value: 'ambivertido' },
              { id: 'introvertido', label: 'Introvertido', value: 'introvertido' }
            ].map((option) => (
              <Button
                key={option.id}
                variant={formData.socialLevel === option.value ? 'default' : 'outline'}
                onClick={() => updateField('socialLevel', option.value)}
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

  return null;
};