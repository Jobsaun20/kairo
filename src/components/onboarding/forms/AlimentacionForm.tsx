import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface AlimentacionFormProps {
  subCategoryId: string;
  formData: any;
  onUpdate: (data: any) => void;
}

export const AlimentacionForm = ({ subCategoryId, formData, onUpdate }: AlimentacionFormProps) => {
  const updateField = (field: string, value: any) => {
    onUpdate({ ...formData, [field]: value });
  };

  if (subCategoryId === 'mas_verduras') {
    return (
      <>
        <div>
          <Label>Título del objetivo</Label>
          <Input
            value={formData.title || ''}
            onChange={(e) => updateField('title', e.target.value)}
            placeholder="Ej: Comer más verduras"
            className="mt-2"
          />
        </div>

        <div>
          <Label>Comidas al día con verduras</Label>
          <div className="grid grid-cols-4 gap-2 mt-2">
            {[2, 3, 4, 5].map((meals) => (
              <Button
                key={meals}
                variant={formData.mealsPerDay === meals ? 'default' : 'outline'}
                onClick={() => updateField('mealsPerDay', meals)}
                className="h-10"
              >
                {meals}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <Label>Estilo alimenticio</Label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {[
              { id: 'omnivoro', label: 'Omnívoro', value: 'omnivoro' },
              { id: 'vegetariano', label: 'Vegetariano', value: 'vegetariano' },
              { id: 'vegano', label: 'Vegano', value: 'vegano' },
              { id: 'flexitariano', label: 'Flexitariano', value: 'flexitariano' }
            ].map((option) => (
              <Button
                key={option.id}
                variant={formData.dietStyle === option.value ? 'default' : 'outline'}
                onClick={() => updateField('dietStyle', option.value)}
                className="h-10 text-sm"
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <Label>Nivel de cocina</Label>
          <div className="grid grid-cols-3 gap-2 mt-2">
            {[
              { id: 'basico', label: 'Básico', value: 'basico' },
              { id: 'intermedio', label: 'Intermedio', value: 'intermedio' },
              { id: 'avanzado', label: 'Avanzado', value: 'avanzado' }
            ].map((option) => (
              <Button
                key={option.id}
                variant={formData.cookingLevel === option.value ? 'default' : 'outline'}
                onClick={() => updateField('cookingLevel', option.value)}
                className="h-10 text-xs"
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
              { id: 'peso', label: 'Peso', value: 'peso' },
              { id: 'energia', label: 'Energía', value: 'energia' },
              { id: 'digestion', label: 'Digestión', value: 'digestion' }
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

  if (subCategoryId === 'mas_proteina') {
    return (
      <>
        <div>
          <Label>Título del objetivo</Label>
          <Input
            value={formData.title || ''}
            onChange={(e) => updateField('title', e.target.value)}
            placeholder="Ej: Aumentar proteína diaria"
            className="mt-2"
          />
        </div>

        <div>
          <Label>Fuente preferida</Label>
          <div className="grid grid-cols-3 gap-2 mt-2">
            {[
              { id: 'animal', label: 'Animal', value: 'animal' },
              { id: 'vegetal', label: 'Vegetal', value: 'vegetal' },
              { id: 'mixto', label: 'Mixto', value: 'mixto' }
            ].map((option) => (
              <Button
                key={option.id}
                variant={formData.proteinSource === option.value ? 'default' : 'outline'}
                onClick={() => updateField('proteinSource', option.value)}
                className="h-10"
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <Label>Raciones diarias objetivo</Label>
          <div className="grid grid-cols-4 gap-2 mt-2">
            {[2, 3, 4, 5].map((servings) => (
              <Button
                key={servings}
                variant={formData.servingsPerDay === servings ? 'default' : 'outline'}
                onClick={() => updateField('servingsPerDay', servings)}
                className="h-10"
              >
                {servings}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <Label>Presupuesto</Label>
          <div className="grid grid-cols-3 gap-2 mt-2">
            {[
              { id: 'bajo', label: 'Bajo', value: 'bajo' },
              { id: 'medio', label: 'Medio', value: 'medio' },
              { id: 'alto', label: 'Alto', value: 'alto' }
            ].map((option) => (
              <Button
                key={option.id}
                variant={formData.budget === option.value ? 'default' : 'outline'}
                onClick={() => updateField('budget', option.value)}
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

  if (subCategoryId === 'menos_procesados') {
    return (
      <>
        <div>
          <Label>Título del objetivo</Label>
          <Input
            value={formData.title || ''}
            onChange={(e) => updateField('title', e.target.value)}
            placeholder="Ej: Reducir ultraprocesados"
            className="mt-2"
          />
        </div>

        <div>
          <Label>Momentos críticos</Label>
          <Input
            value={formData.criticalMoments || ''}
            onChange={(e) => updateField('criticalMoments', e.target.value)}
            placeholder="Ej: Merienda, después de cenar"
            className="mt-2"
          />
        </div>

        <div>
          <Label>Disparadores principales</Label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {[
              { id: 'estres', label: 'Estrés', value: 'estres' },
              { id: 'aburrimiento', label: 'Aburrimiento', value: 'aburrimiento' },
              { id: 'social', label: 'Social', value: 'social' },
              { id: 'hambre', label: 'Hambre real', value: 'hambre' }
            ].map((option) => (
              <Button
                key={option.id}
                variant={formData.triggers?.includes(option.value) ? 'default' : 'outline'}
                onClick={() => {
                  const current = formData.triggers || [];
                  const updated = current.includes(option.value)
                    ? current.filter((t: string) => t !== option.value)
                    : [...current, option.value];
                  updateField('triggers', updated);
                }}
                className="h-10 text-sm"
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <Label>Nivel de exigencia</Label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {[
              { id: 'gradual', label: 'Gradual', value: 'gradual' },
              { id: 'estricto', label: 'Estricto', value: 'estricto' }
            ].map((option) => (
              <Button
                key={option.id}
                variant={formData.strictness === option.value ? 'default' : 'outline'}
                onClick={() => updateField('strictness', option.value)}
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

  if (subCategoryId === 'plan_menus') {
    return (
      <>
        <div>
          <Label>Título del objetivo</Label>
          <Input
            value={formData.title || ''}
            onChange={(e) => updateField('title', e.target.value)}
            placeholder="Ej: Planificar menús semanales"
            className="mt-2"
          />
        </div>

        <div>
          <Label>Días a planificar</Label>
          <div className="grid grid-cols-3 gap-2 mt-2">
            {[3, 5, 7].map((days) => (
              <Button
                key={days}
                variant={formData.planningDays === days ? 'default' : 'outline'}
                onClick={() => updateField('planningDays', days)}
                className="h-10"
              >
                {days} días
              </Button>
            ))}
          </div>
        </div>

        <div>
          <Label>Número de recetas</Label>
          <div className="grid grid-cols-4 gap-2 mt-2">
            {[3, 5, 7, 10].map((recipes) => (
              <Button
                key={recipes}
                variant={formData.recipesCount === recipes ? 'default' : 'outline'}
                onClick={() => updateField('recipesCount', recipes)}
                className="h-10"
              >
                {recipes}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <Label>Preferencias de recetas</Label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {[
              { id: 'rapidas', label: 'Rápidas', value: 'rapidas' },
              { id: 'una_olla', label: 'Una olla', value: 'una_olla' },
              { id: 'frias', label: 'Frías', value: 'frias' },
              { id: 'batch', label: 'Batch cooking', value: 'batch' }
            ].map((option) => (
              <Button
                key={option.id}
                variant={formData.recipePreference === option.value ? 'default' : 'outline'}
                onClick={() => updateField('recipePreference', option.value)}
                className="h-10 text-sm"
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <Label>¿Generar lista de compra?</Label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {[
              { id: 'si', label: 'Sí', value: true },
              { id: 'no', label: 'No', value: false }
            ].map((option) => (
              <Button
                key={option.id}
                variant={formData.shoppingList === option.value ? 'default' : 'outline'}
                onClick={() => updateField('shoppingList', option.value)}
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

  return null;
};