import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress as ProgressBar } from '@/components/ui/progress';
import { ArrowLeft, Trophy, Flame, Target, Calendar, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';

interface Goal {
  id: string;
  title: string;
  category: string;
  level: number;
  xp: number;
  streak: number;
  hearts: number;
}

interface Stats {
  totalXP: number;
  maxStreak: number;
  completedChallenges: number;
  totalChallenges: number;
}

const Progress = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [goals, setGoals] = useState<Goal[]>([]);
  const [stats, setStats] = useState<Stats>({
    totalXP: 0,
    maxStreak: 0,
    completedChallenges: 0,
    totalChallenges: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    loadData();
  }, [user]);

  const loadData = async () => {
    try {
      // Load goals
      const { data: goalsData } = await supabase
        .from('goals')
        .select('*')
        .eq('user_id', user?.id)
        .eq('active', true);

      if (goalsData) {
        setGoals(goalsData);
        
        // Calculate stats
        const totalXP = goalsData.reduce((sum, g) => sum + g.xp, 0);
        const maxStreak = Math.max(...goalsData.map(g => g.streak), 0);
        
        // Get challenge stats
        const goalIds = goalsData.map(g => g.id);
        const { data: challenges } = await supabase
          .from('challenges')
          .select('status')
          .in('goal_id', goalIds);

        const completedChallenges = challenges?.filter(c => c.status === 'done').length || 0;
        const totalChallenges = challenges?.length || 0;

        setStats({
          totalXP,
          maxStreak,
          completedChallenges,
          totalChallenges
        });
      }
    } catch (error) {
      console.error('Error loading progress:', error);
      toast.error('Error al cargar progreso');
    } finally {
      setLoading(false);
    }
  };

  const getBadges = () => {
    const badges = [];
    if (stats.maxStreak >= 7) badges.push({ icon: '🔥', name: '7 días', desc: 'Racha de fuego' });
    if (stats.maxStreak >= 30) badges.push({ icon: '⚡', name: '30 días', desc: 'Imparable' });
    if (stats.completedChallenges >= 10) badges.push({ icon: '🎯', name: 'Enfocado', desc: '10 retos' });
    if (stats.completedChallenges >= 50) badges.push({ icon: '🏆', name: 'Campeón', desc: '50 retos' });
    if (stats.totalXP >= 500) badges.push({ icon: '💎', name: 'Experto', desc: '500 XP' });
    return badges;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const completionRate = stats.totalChallenges > 0 
    ? Math.round((stats.completedChallenges / stats.totalChallenges) * 100) 
    : 0;

  const badges = getBadges();

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-hero text-white p-6 rounded-b-3xl shadow-card">
        <div className="flex items-center gap-3 mb-6">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate('/home')}
            className="text-white hover:bg-white/20"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Tu Progreso</h1>
            <p className="text-white/90 text-sm">Sigue así, vas genial</p>
          </div>
        </div>

        {/* Main Stats */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="bg-white/10 border-white/20 backdrop-blur">
            <CardContent className="p-4 text-center">
              <Trophy className="h-6 w-6 mx-auto mb-1 text-white" />
              <div className="text-2xl font-bold text-white">{stats.totalXP}</div>
              <div className="text-xs text-white/80">XP Total</div>
            </CardContent>
          </Card>
          <Card className="bg-white/10 border-white/20 backdrop-blur">
            <CardContent className="p-4 text-center">
              <Flame className="h-6 w-6 mx-auto mb-1 text-white" />
              <div className="text-2xl font-bold text-white">{stats.maxStreak}</div>
              <div className="text-xs text-white/80">Mejor racha</div>
            </CardContent>
          </Card>
          <Card className="bg-white/10 border-white/20 backdrop-blur">
            <CardContent className="p-4 text-center">
              <Target className="h-6 w-6 mx-auto mb-1 text-white" />
              <div className="text-2xl font-bold text-white">{stats.completedChallenges}</div>
              <div className="text-xs text-white/80">Completados</div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Completion Rate */}
        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Tasa de éxito
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  {stats.completedChallenges} de {stats.totalChallenges} retos
                </span>
                <span className="font-semibold text-primary">{completionRate}%</span>
              </div>
              <ProgressBar value={completionRate} className="h-3" />
            </div>
          </CardContent>
        </Card>

        {/* Active Goals */}
        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Objetivos activos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {goals.length > 0 ? (
              goals.map((goal) => (
                <div key={goal.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div>
                    <p className="font-medium text-sm">{goal.title}</p>
                    <p className="text-xs text-muted-foreground">Nivel {goal.level}</p>
                  </div>
                  <div className="flex gap-3 text-sm">
                    <div className="flex items-center gap-1">
                      <Flame className="h-4 w-4 text-orange-500" />
                      <span>{goal.streak}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Trophy className="h-4 w-4 text-yellow-500" />
                      <span>{goal.xp}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground text-center py-4">
                No tienes objetivos activos
              </p>
            )}
          </CardContent>
        </Card>

        {/* Badges */}
        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Trophy className="h-5 w-5 text-primary" />
              Logros desbloqueados
            </CardTitle>
          </CardHeader>
          <CardContent>
            {badges.length > 0 ? (
              <div className="grid grid-cols-2 gap-3">
                {badges.map((badge, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20">
                    <div className="text-3xl mb-2">{badge.icon}</div>
                    <p className="font-semibold text-sm">{badge.name}</p>
                    <p className="text-xs text-muted-foreground">{badge.desc}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <div className="text-4xl mb-2">🏆</div>
                <p className="text-sm text-muted-foreground">
                  Completa retos para desbloquear logros
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Progress;
