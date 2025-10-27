import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Plus, Flame, Heart, Trophy, Calendar } from 'lucide-react';
import { getCategoryIcon, getCategoryColor } from '@/lib/categories';
import { toast } from 'sonner';

interface Goal {
  id: string;
  title: string;
  category: string;
  level: number;
  xp: number;
  streak: number;
  hearts: number;
  active: boolean;
  target_weight: number | null;
  deadline_weeks: number | null;
  created_at: string;
}

const Goals = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    loadGoals();
  }, [user]);

  const loadGoals = async () => {
    try {
      const { data, error } = await supabase
        .from('goals')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setGoals(data || []);
    } catch (error) {
      console.error('Error loading goals:', error);
      toast.error('Error al cargar objetivos');
    } finally {
      setLoading(false);
    }
  };

  const toggleGoalActive = async (goalId: string, currentActive: boolean) => {
    try {
      const { error } = await supabase
        .from('goals')
        .update({ active: !currentActive })
        .eq('id', goalId);

      if (error) throw error;
      toast.success(currentActive ? 'Objetivo pausado' : 'Objetivo activado');
      loadGoals();
    } catch (error) {
      console.error('Error updating goal:', error);
      toast.error('Error al actualizar objetivo');
    }
  };

  const getDeadlineText = (weeks: number | null) => {
    if (!weeks) return null;
    if (weeks === 1) return '1 semana';
    if (weeks === 2) return '2 semanas';
    if (weeks === 4) return '1 mes';
    if (weeks === 12) return '3 meses';
    return `${weeks} semanas`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const activeGoals = goals.filter(g => g.active);
  const pausedGoals = goals.filter(g => !g.active);

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-hero text-white p-6 rounded-b-3xl shadow-card">
        <div className="flex items-center gap-3 mb-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate('/home')}
            className="text-white hover:bg-white/20"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Mis Objetivos</h1>
            <p className="text-white/90 text-sm">Gestiona tus metas</p>
          </div>
        </div>

        <Button 
          className="w-full bg-white text-primary hover:bg-white/90"
          onClick={() => navigate('/onboarding')}
        >
          <Plus className="h-5 w-5 mr-2" />
          Nuevo objetivo
        </Button>
      </div>

      <div className="p-4 space-y-6">
        {/* Active Goals */}
        {activeGoals.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-lg font-semibold px-1">Activos ({activeGoals.length})</h2>
            {activeGoals.map((goal) => {
              const categoryIcon = getCategoryIcon(goal.category);
              const categoryColor = getCategoryColor(goal.category);
              const deadlineText = getDeadlineText(goal.deadline_weeks);

              return (
                <Card key={goal.id} className="shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3 mb-3">
                      <div className={`w-12 h-12 rounded-xl bg-${categoryColor}/10 flex items-center justify-center text-2xl flex-shrink-0`}>
                        {categoryIcon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold truncate">{goal.title}</h3>
                        <p className="text-sm text-muted-foreground">Nivel {goal.level}</p>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-2 mb-3">
                      <div className="flex items-center gap-1.5 text-sm">
                        <Flame className="h-4 w-4 text-orange-500" />
                        <span className="font-medium">{goal.streak}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-sm">
                        <Heart className="h-4 w-4 text-red-500" />
                        <span className="font-medium">{goal.hearts}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-sm">
                        <Trophy className="h-4 w-4 text-yellow-500" />
                        <span className="font-medium">{goal.xp}</span>
                      </div>
                    </div>

                    {/* Badges */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {goal.target_weight && (
                        <Badge variant="secondary" className="text-xs">
                          Meta: {goal.target_weight}kg
                        </Badge>
                      )}
                      {deadlineText && (
                        <Badge variant="outline" className="text-xs">
                          <Calendar className="h-3 w-3 mr-1" />
                          {deadlineText}
                        </Badge>
                      )}
                    </div>

                    <Button 
                      variant="outline" 
                      size="sm"
                      className="w-full"
                      onClick={() => toggleGoalActive(goal.id, goal.active)}
                    >
                      Pausar objetivo
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* Paused Goals */}
        {pausedGoals.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-lg font-semibold px-1 text-muted-foreground">
              Pausados ({pausedGoals.length})
            </h2>
            {pausedGoals.map((goal) => {
              const categoryIcon = getCategoryIcon(goal.category);
              const categoryColor = getCategoryColor(goal.category);

              return (
                <Card key={goal.id} className="shadow-sm opacity-60">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3 mb-3">
                      <div className={`w-10 h-10 rounded-xl bg-${categoryColor}/10 flex items-center justify-center text-xl flex-shrink-0`}>
                        {categoryIcon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm truncate">{goal.title}</h3>
                        <p className="text-xs text-muted-foreground">Nivel {goal.level}</p>
                      </div>
                    </div>

                    <Button 
                      variant="default" 
                      size="sm"
                      className="w-full"
                      onClick={() => toggleGoalActive(goal.id, goal.active)}
                    >
                      Reactivar
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {goals.length === 0 && (
          <Card className="shadow-sm">
            <CardContent className="p-8 text-center">
              <div className="text-4xl mb-3">🎯</div>
              <h3 className="font-semibold mb-2">No tienes objetivos aún</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Crea tu primer objetivo y comienza tu viaje
              </p>
              <Button onClick={() => navigate('/onboarding')}>
                <Plus className="h-4 w-4 mr-2" />
                Crear objetivo
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Goals;
