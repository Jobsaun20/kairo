import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface OtrosFormProps {
  subCategoryId: string;
  categoryId: string;
  formData: any;
  onUpdate: (data: any) => void;
}

export const OtrosForm = ({ categoryId, subCategoryId, formData, onUpdate }: OtrosFormProps) => {
  const updateField = (field: string, value: any) => {
    onUpdate({ ...formData, [field]: value });
  };

  // Reducir hábitos nocivos
  if (categoryId === 'reducir_habitos') {
    return (
      <>
        <div>
          <Label>Título del objetivo</Label>
          <Input
            value={formData.title || ''}
            onChange={(e) => updateField('title', e.target.value)}
            placeholder="Ej: Dejar de fumar"
            className="mt-2"
          />
        </div>

        <div>
          <Label>Nivel actual (cantidad/frecuencia)</Label>
          <Input
            value={formData.currentLevel || ''}
            onChange={(e) => updateField('currentLevel', e.target.value)}
            placeholder="Ej: 10 cigarrillos/día"
            className="mt-2"
          />
        </div>

        <div>
          <Label>Método preferido</Label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {[
              { id: 'gradual', label: 'Gradual', value: 'gradual' },
              { id: 'abrupto', label: 'Abrupto', value: 'abrupto' }
            ].map((option) => (
              <Button
                key={option.id}
                variant={formData.method === option.value ? 'default' : 'outline'}
                onClick={() => updateField('method', option.value)}
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
            placeholder="Ej: Estrés, café, social"
            className="mt-2"
          />
        </div>

        <div>
          <Label>Sustitutos saludables</Label>
          <Input
            value={formData.substitutes || ''}
            onChange={(e) => updateField('substitutes', e.target.value)}
            placeholder="Ej: Chicle, agua, respiración"
            className="mt-2"
          />
        </div>
      </>
    );
  }

  // Organización y productividad
  if (categoryId === 'organizacion') {
    return (
      <>
        <div>
          <Label>Título del objetivo</Label>
          <Input
            value={formData.title || ''}
            onChange={(e) => updateField('title', e.target.value)}
            placeholder="Ej: Plan diario efectivo"
            className="mt-2"
          />
        </div>

        <div>
          <Label>Herramientas preferidas</Label>
          <Input
            value={formData.tools || ''}
            onChange={(e) => updateField('tools', e.target.value)}
            placeholder="Ej: Notion, calendario, papel"
            className="mt-2"
          />
        </div>
      </>
    );
  }

  // Autocuidado
  if (categoryId === 'autocuidado') {
    return (
      <>
        <div>
          <Label>Título del objetivo</Label>
          <Input
            value={formData.title || ''}
            onChange={(e) => updateField('title', e.target.value)}
            placeholder="Ej: Rutina de autocuidado"
            className="mt-2"
          />
        </div>

        <div>
          <Label>Actividades preferidas</Label>
          <Input
            value={formData.activities || ''}
            onChange={(e) => updateField('activities', e.target.value)}
            placeholder="Ej: Lectura, baño, música"
            className="mt-2"
          />
        </div>
      </>
    );
  }

  // Nueva categoría
  if (categoryId === 'nuevo') {
    return (
      <>
        <div>
          <Label>Nombre de tu categoría</Label>
          <Input
            value={formData.customCategory || ''}
            onChange={(e) => updateField('customCategory', e.target.value)}
            placeholder="Ej: Mi podcast"
            className="mt-2"
          />
        </div>

        <div>
          <Label>Título del objetivo</Label>
          <Input
            value={formData.title || ''}
            onChange={(e) => updateField('title', e.target.value)}
            placeholder="Ej: Lanzar 3 episodios"
            className="mt-2"
          />
        </div>

        <div>
          <Label>Resultado deseado</Label>
          <Input
            value={formData.desiredResult || ''}
            onChange={(e) => updateField('desiredResult', e.target.value)}
            placeholder="Describe qué quieres lograr"
            className="mt-2"
          />
        </div>

        <div>
          <Label>Métrica de éxito</Label>
          <Input
            value={formData.successMetric || ''}
            onChange={(e) => updateField('successMetric', e.target.value)}
            placeholder="¿Cómo medirás el éxito?"
            className="mt-2"
          />
        </div>
      </>
    );
  }

  return null;
};