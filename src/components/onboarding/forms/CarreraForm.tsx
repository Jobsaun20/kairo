import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LANGUAGE_LEVEL_OPTIONS, LANGUAGE_TARGET_OPTIONS } from '@/lib/categories';

interface CarreraFormProps {
  subCategoryId: string;
  formData: any;
  onUpdate: (data: any) => void;
}

export const CarreraForm = ({ subCategoryId, formData, onUpdate }: CarreraFormProps) => {
  const updateField = (field: string, value: any) => {
    onUpdate({ ...formData, [field]: value });
  };

  if (subCategoryId === 'skill') {
    return (
      <>
        <div>
          <Label>Título del objetivo</Label>
          <Input
            value={formData.title || ''}
            onChange={(e) => updateField('title', e.target.value)}
            placeholder="Ej: Certificación AWS"
            className="mt-2"
          />
        </div>

        <div>
          <Label>Skill concreta</Label>
          <Input
            value={formData.specificSkill || ''}
            onChange={(e) => updateField('specificSkill', e.target.value)}
            placeholder="Ej: React, Python, Excel"
            className="mt-2"
          />
        </div>

        <div>
          <Label>Meta específica</Label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {[
              { id: 'certificacion', label: 'Certificación', value: 'certificacion' },
              { id: 'curso', label: 'Finalizar curso', value: 'curso' },
              { id: 'proyecto', label: 'Proyecto práctico', value: 'proyecto' },
              { id: 'nivel', label: 'Nivel específico', value: 'nivel' }
            ].map((option) => (
              <Button
                key={option.id}
                variant={formData.goalType === option.value ? 'default' : 'outline'}
                onClick={() => updateField('goalType', option.value)}
                className="h-10 text-xs"
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <Label>Recursos preferidos</Label>
          <Input
            value={formData.resources || ''}
            onChange={(e) => updateField('resources', e.target.value)}
            placeholder="Ej: Udemy, YouTube, libros"
            className="mt-2"
          />
        </div>

        <div>
          <Label>Días de estudio profundo por semana</Label>
          <div className="grid grid-cols-4 gap-2 mt-2">
            {[2, 3, 4, 5].map((days) => (
              <Button
                key={days}
                variant={formData.deepStudyDays === days ? 'default' : 'outline'}
                onClick={() => updateField('deepStudyDays', days)}
                className="h-10"
              >
                {days} días
              </Button>
            ))}
          </div>
        </div>

        <div>
          <Label>¿Incluir simulacros/prácticas?</Label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {[
              { id: 'si', label: 'Sí', value: true },
              { id: 'no', label: 'No', value: false }
            ].map((option) => (
              <Button
                key={option.id}
                variant={formData.includeTests === option.value ? 'default' : 'outline'}
                onClick={() => updateField('includeTests', option.value)}
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

  if (subCategoryId === 'proyecto') {
    return (
      <>
        <div>
          <Label>Título del objetivo</Label>
          <Input
            value={formData.title || ''}
            onChange={(e) => updateField('title', e.target.value)}
            placeholder="Ej: Crear portafolio web"
            className="mt-2"
          />
        </div>

        <div>
          <Label>Tipo de proyecto</Label>
          <Input
            value={formData.projectType || ''}
            onChange={(e) => updateField('projectType', e.target.value)}
            placeholder="Ej: App web, diseño, escrito"
            className="mt-2"
          />
        </div>

        <div>
          <Label>Alcance del proyecto</Label>
          <div className="grid grid-cols-3 gap-2 mt-2">
            {[
              { id: 'pequeno', label: 'Pequeño', value: 'pequeno' },
              { id: 'mediano', label: 'Mediano', value: 'mediano' },
              { id: 'grande', label: 'Grande', value: 'grande' }
            ].map((option) => (
              <Button
                key={option.id}
                variant={formData.projectScope === option.value ? 'default' : 'outline'}
                onClick={() => updateField('projectScope', option.value)}
                className="h-10"
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <Label>Hitos semanales deseados</Label>
          <div className="grid grid-cols-4 gap-2 mt-2">
            {[1, 2, 3, 4].map((milestones) => (
              <Button
                key={milestones}
                variant={formData.weeklyMilestones === milestones ? 'default' : 'outline'}
                onClick={() => updateField('weeklyMilestones', milestones)}
                className="h-10"
              >
                {milestones}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <Label>¿Difusión pública?</Label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {[
              { id: 'si', label: 'Sí (LinkedIn/GitHub)', value: true },
              { id: 'no', label: 'No (privado)', value: false }
            ].map((option) => (
              <Button
                key={option.id}
                variant={formData.publicSharing === option.value ? 'default' : 'outline'}
                onClick={() => updateField('publicSharing', option.value)}
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

  if (subCategoryId === 'networking') {
    return (
      <>
        <div>
          <Label>Título del objetivo</Label>
          <Input
            value={formData.title || ''}
            onChange={(e) => updateField('title', e.target.value)}
            placeholder="Ej: Preparar entrevistas"
            className="mt-2"
          />
        </div>

        <div>
          <Label>Objetivo principal</Label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {[
              { id: 'entrevistas', label: 'Entrevistas', value: 'entrevistas' },
              { id: 'networking', label: 'Networking', value: 'networking' },
              { id: 'ambos', label: 'Ambos', value: 'ambos' }
            ].map((option) => (
              <Button
                key={option.id}
                variant={formData.mainGoal === option.value ? 'default' : 'outline'}
                onClick={() => updateField('mainGoal', option.value)}
                className="h-10 text-sm"
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <Label>Materiales a preparar</Label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {[
              { id: 'cv', label: 'CV', value: 'cv' },
              { id: 'portfolio', label: 'Portfolio', value: 'portfolio' },
              { id: 'pitch', label: 'Pitch personal', value: 'pitch' },
              { id: 'linkedin', label: 'Perfil LinkedIn', value: 'linkedin' }
            ].map((option) => (
              <Button
                key={option.id}
                variant={formData.materials?.includes(option.value) ? 'default' : 'outline'}
                onClick={() => {
                  const current = formData.materials || [];
                  const updated = current.includes(option.value)
                    ? current.filter((m: string) => m !== option.value)
                    : [...current, option.value];
                  updateField('materials', updated);
                }}
                className="h-10 text-sm"
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <Label>Contactos objetivo por semana</Label>
          <div className="grid grid-cols-5 gap-2 mt-2">
            {[2, 3, 5, 7, 10].map((contacts) => (
              <Button
                key={contacts}
                variant={formData.weeklyContacts === contacts ? 'default' : 'outline'}
                onClick={() => updateField('weeklyContacts', contacts)}
                className="h-10 text-sm"
              >
                {contacts}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <Label>¿Simulacros de entrevistas?</Label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {[
              { id: 'si', label: 'Sí', value: true },
              { id: 'no', label: 'No', value: false }
            ].map((option) => (
              <Button
                key={option.id}
                variant={formData.mockInterviews === option.value ? 'default' : 'outline'}
                onClick={() => updateField('mockInterviews', option.value)}
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

  if (subCategoryId === 'idiomas') {
    return (
      <>
        <div>
          <Label>¿Qué idioma?</Label>
          <Input
            value={formData.languageTarget || ''}
            onChange={(e) => {
              updateField('languageTarget', e.target.value);
              updateField('title', `Aprender ${e.target.value}`);
            }}
            placeholder="Ej: Inglés, Francés, Alemán"
            className="mt-2"
          />
        </div>
        
        <div>
          <Label>Nivel actual</Label>
          <div className="grid grid-cols-3 gap-2 mt-2">
            {LANGUAGE_LEVEL_OPTIONS.map((option) => (
              <Button
                key={option.id}
                variant={formData.currentLevel === option.value ? 'default' : 'outline'}
                onClick={() => updateField('currentLevel', option.value)}
                className="h-10 text-xs"
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <Label>Nivel objetivo</Label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {LANGUAGE_TARGET_OPTIONS.map((option) => (
              <Button
                key={option.id}
                variant={formData.targetLevel === option.value ? 'default' : 'outline'}
                onClick={() => updateField('targetLevel', option.value)}
                className="h-10 text-xs"
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <Label>Enfoque principal</Label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {[
              { id: 'speaking', label: 'Speaking', value: 'speaking' },
              { id: 'listening', label: 'Listening', value: 'listening' },
              { id: 'reading', label: 'Reading', value: 'reading' },
              { id: 'grammar', label: 'Grammar', value: 'grammar' }
            ].map((option) => (
              <Button
                key={option.id}
                variant={formData.focus === option.value ? 'default' : 'outline'}
                onClick={() => updateField('focus', option.value)}
                className="h-10 text-sm"
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <Label>Práctica real</Label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {[
              { id: 'intercambio', label: 'Intercambio', value: 'intercambio' },
              { id: 'llamadas', label: 'Llamadas', value: 'llamadas' },
              { id: 'app', label: 'App de idiomas', value: 'app' },
              { id: 'clase', label: 'Clase online', value: 'clase' }
            ].map((option) => (
              <Button
                key={option.id}
                variant={formData.practice === option.value ? 'default' : 'outline'}
                onClick={() => updateField('practice', option.value)}
                className="h-10 text-xs"
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <Label>Días de conversación por semana</Label>
          <div className="grid grid-cols-4 gap-2 mt-2">
            {[2, 3, 5, 7].map((days) => (
              <Button
                key={days}
                variant={formData.conversationDays === days ? 'default' : 'outline'}
                onClick={() => updateField('conversationDays', days)}
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