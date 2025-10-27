import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { DEADLINE_OPTIONS, TIME_OPTIONS, TIME_SLOT_OPTIONS } from '@/lib/categories';
import { ArrowLeft } from 'lucide-react';
import { SaludForm } from './forms/SaludForm';
import { AlimentacionForm } from './forms/AlimentacionForm';
import { MentalForm } from './forms/MentalForm';
import { FinanzasForm } from './forms/FinanzasForm';
import { RelacionesForm } from './forms/RelacionesForm';
import { CarreraForm } from './forms/CarreraForm';
import { OtrosForm } from './forms/OtrosForm';

interface GoalDetailsFormProps {
  categoryId: string;
  subCategoryId: string;
  formData: any;
  onUpdate: (data: any) => void;
  onBack: () => void;
  onSubmit: () => void;
  loading: boolean;
}

export const GoalDetailsForm = ({
  categoryId,
  subCategoryId,
  formData,
  onUpdate,
  onBack,
  onSubmit,
  loading
}: GoalDetailsFormProps) => {
  
  const renderCategoryForm = () => {
    const forms: Record<string, JSX.Element | null> = {
      salud: <SaludForm subCategoryId={subCategoryId} formData={formData} onUpdate={onUpdate} />,
      alimentacion: <AlimentacionForm subCategoryId={subCategoryId} formData={formData} onUpdate={onUpdate} />,
      mental: <MentalForm subCategoryId={subCategoryId} formData={formData} onUpdate={onUpdate} />,
      finanzas: <FinanzasForm subCategoryId={subCategoryId} formData={formData} onUpdate={onUpdate} />,
      relaciones: <RelacionesForm subCategoryId={subCategoryId} formData={formData} onUpdate={onUpdate} />,
      carrera: <CarreraForm subCategoryId={subCategoryId} formData={formData} onUpdate={onUpdate} />,
      reducir_habitos: <OtrosForm categoryId={categoryId} subCategoryId={subCategoryId} formData={formData} onUpdate={onUpdate} />,
      organizacion: <OtrosForm categoryId={categoryId} subCategoryId={subCategoryId} formData={formData} onUpdate={onUpdate} />,
      autocuidado: <OtrosForm categoryId={categoryId} subCategoryId={subCategoryId} formData={formData} onUpdate={onUpdate} />,
      nuevo: <OtrosForm categoryId={categoryId} subCategoryId={subCategoryId} formData={formData} onUpdate={onUpdate} />
    };

    return forms[categoryId] || null;
  };

  const renderOldForm = () => (
    <>
      <div>
        <Label className="text-sm font-medium">¿Cuántos kilos quieres perder?</Label>
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
    </>
  );

  const renderLanguageForm = () => (
    <>
      <div>
        <Label className="text-sm font-medium">¿Qué idioma?</Label>
        <Input
          value={formData.languageTarget || ''}
          onChange={(e) => updateField('languageTarget', e.target.value)}
          placeholder="Ej: Inglés, Francés..."
          className="mt-2"
        />
      </div>
      
      <div>
        <Label className="text-sm font-medium">Nivel actual</Label>
        <div className="grid grid-cols-3 gap-2 mt-2">
          {LANGUAGE_LEVEL_OPTIONS.slice(0, 6).map((option) => (
            <Button
              key={option.id}
              variant={formData.currentLevel === option.value ? 'default' : 'outline'}
              onClick={() => updateField('currentLevel', option.value)}
              className="h-12 text-xs"
            >
              {option.label}
            </Button>
          ))}
        </div>
      </div>

      <div>
        <Label className="text-sm font-medium">Nivel objetivo</Label>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {LANGUAGE_TARGET_OPTIONS.map((option) => (
            <Button
              key={option.id}
              variant={formData.targetLevel === option.value ? 'default' : 'outline'}
              onClick={() => updateField('targetLevel', option.value)}
              className="h-12 text-xs"
            >
              {option.label}
            </Button>
          ))}
        </div>
      </div>
    </>
  );

  const renderFinanceForm = () => (
    <>
      <div>
        <Label className="text-sm font-medium">Objetivo de ahorro (CHF)</Label>
        <Input
          type="number"
          value={formData.savingsTarget || ''}
          onChange={(e) => updateField('savingsTarget', parseInt(e.target.value))}
          placeholder="Ej: 1000"
          className="mt-2"
        />
      </div>
    </>
  );

  const renderGenericForm = () => (
    <>
      {categoryId !== 'salud' || subCategoryId !== 'bajar_peso' && (
        <div>
          <Label className="text-sm font-medium">Título de tu objetivo</Label>
          <Input
            value={formData.title || ''}
            onChange={(e) => updateField('title', e.target.value)}
            placeholder="Ej: Meditar diariamente, Correr 5K..."
            className="mt-2"
          />
        </div>
      )}
    </>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h2 className="text-2xl font-bold">Detalles del objetivo</h2>
          <p className="text-sm text-muted-foreground">Cuanto más específico, mejor</p>
        </div>
      </div>
      
      <div className="space-y-5">
        {renderCategoryForm()}

        {/* Common fields */}
        <div>
          <Label className="text-sm font-medium">Fecha límite</Label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {DEADLINE_OPTIONS.map((option) => (
              <Button
                key={option.id}
                variant={formData.deadlineWeeks === option.value ? 'default' : 'outline'}
                onClick={() => updateField('deadlineWeeks', option.value)}
                className="h-12 text-sm"
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <Label className="text-sm font-medium">Minutos diarios</Label>
          <div className="grid grid-cols-4 gap-2 mt-2">
            {TIME_OPTIONS.map((option) => (
              <Button
                key={option.id}
                variant={formData.minutes === option.value ? 'default' : 'outline'}
                onClick={() => updateField('minutes', option.value)}
                className="h-12"
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <Label className="text-sm font-medium">Mejor momento del día</Label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {TIME_SLOT_OPTIONS.map((option) => (
              <Button
                key={option.id}
                variant={formData.bestSlot === option.value ? 'default' : 'outline'}
                onClick={() => updateField('bestSlot', option.value)}
                className="h-12 text-sm"
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <Button variant="outline" onClick={onBack} className="flex-1">
          Atrás
        </Button>
        <Button 
          onClick={onSubmit} 
          disabled={!formData.title || !formData.deadlineWeeks || loading}
          className="flex-1"
        >
          {loading ? 'Creando...' : 'Crear objetivo'}
        </Button>
      </div>
    </div>
  );
};