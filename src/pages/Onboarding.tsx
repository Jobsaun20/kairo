import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { pickTodayTask } from '@/lib/taskPlanner';

const categories = [
  { id: 'salud', name: 'Salud/Peso', icon: '💪', color: 'mint' },
  { id: 'idioma', name: 'Idioma', icon: '🗣️', color: 'blue' },
  { id: 'ahorro', name: 'Ahorro', icon: '💰', color: 'yellow' },
  { id: 'enfoque', name: 'Enfoque/Estudio', icon: '🎯', color: 'pink' },
  { id: 'otro', name: 'Otro', icon: '✨', color: 'primary' },
];

const Onboarding = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [minutes, setMinutes] = useState(15);
  const [targetWeight, setTargetWeight] = useState<number | null>(null);
  const [deadlineWeeks, setDeadlineWeeks] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFinish = async () => {
    if (!user || !category || !title) return;
    
    setLoading(true);
    try {
      const goalData: any = {
        user_id: user.id,
        title,
        category,
        minutes_per_day: minutes,
        level: 1,
        xp: 0,
        streak: 0,
        hearts: 3,
        active: true
      };

      if (targetWeight) goalData.target_weight = targetWeight;
      if (deadlineWeeks) goalData.deadline_weeks = deadlineWeeks;

      const { data: goal, error: goalError } = await supabase
        .from('goals')
        .insert(goalData)
        .select()
        .single();

      if (goalError) throw goalError;

      const task = pickTodayTask(category, 1, minutes, []);
      if (task) {
        await supabase.from('challenges').insert({
          goal_id: goal.id,
          day: new Date().toISOString().split('T')[0],
          kind: task.kind,
          minutes: task.minutes,
          text: task.text,
          status: 'pending'
        });
      }

      toast.success('¡Objetivo creado! Comencemos tu viaje.');
      navigate('/home');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al crear objetivo');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-4 flex items-center justify-center bg-background">
      <Card className="w-full max-w-lg shadow-card">
        <CardContent className="p-6">
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold mb-2">¿Qué quieres lograr?</h2>
                <p className="text-sm text-muted-foreground">Elige una categoría</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => { setCategory(cat.id); setStep(2); }}
                    className={`p-5 rounded-2xl border-2 transition-all active:scale-95 ${
                      category === cat.id ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="text-3xl mb-2">{cat.icon}</div>
                    <div className="font-semibold text-sm">{cat.name}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold mb-2">Detalles del objetivo</h2>
                <p className="text-sm text-muted-foreground">Cuanto más específico, mejor</p>
              </div>
              
              <div className="space-y-5">
                {category === 'salud' && (
                  <div>
                    <Label className="text-sm font-medium">¿Cuántos kilos quieres perder?</Label>
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      {[2, 5, 10].map((kg) => (
                        <Button
                          key={kg}
                          variant={targetWeight === kg ? 'default' : 'outline'}
                          onClick={() => { setTargetWeight(kg); setTitle(`Perder ${kg}kg`); }}
                          className="h-12"
                        >
                          {kg} kg
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <Label className="text-sm font-medium">Fecha límite</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {[
                      { weeks: 1, label: '1 semana' },
                      { weeks: 2, label: '2 semanas' },
                      { weeks: 4, label: '1 mes' },
                      { weeks: 12, label: '3 meses' }
                    ].map((option) => (
                      <Button
                        key={option.weeks}
                        variant={deadlineWeeks === option.weeks ? 'default' : 'outline'}
                        onClick={() => setDeadlineWeeks(option.weeks)}
                        className="h-12 text-sm"
                      >
                        {option.label}
                      </Button>
                    ))}
                  </div>
                </div>

                {category !== 'salud' && (
                  <div>
                    <Label className="text-sm font-medium">Título de tu objetivo</Label>
                    <Input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Ej: Aprender inglés, Ahorrar 1000 CHF..."
                      className="mt-2"
                    />
                  </div>
                )}

                <div>
                  <Label className="text-sm font-medium">Minutos diarios</Label>
                  <div className="grid grid-cols-4 gap-2 mt-2">
                    {[5, 10, 15, 30].map((min) => (
                      <Button
                        key={min}
                        variant={minutes === min ? 'default' : 'outline'}
                        onClick={() => setMinutes(min)}
                        className="h-12"
                      >
                        {min}m
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                  Atrás
                </Button>
                <Button 
                  onClick={handleFinish} 
                  disabled={!title || !deadlineWeeks || loading}
                  className="flex-1"
                >
                  {loading ? 'Creando...' : 'Crear objetivo'}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Onboarding;
