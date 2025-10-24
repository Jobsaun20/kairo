import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Flame, Heart, Trophy, Target, LogOut, Settings, TrendingUp } from 'lucide-react';
import { getCategoryIcon, getCategoryColor } from '@/lib/taskPlanner';
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
}

interface Challenge {
  id: string;
  day: string;
  kind: string;
  minutes: number;
  text: string;
  status: string;
}

const Home = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [goal, setGoal] = useState<Goal | null>(null);
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    loadData();
  }, [user, navigate]);

  const loadData = async () => {
    try {
      // Load active goals (get first one for display)
      const { data: goals } = await supabase
        .from('goals')
        .select('*')
        .eq('user_id', user?.id)
        .eq('active', true)
        .order('created_at', { ascending: false })
        .limit(1);

      if (!goals || goals.length === 0) {
        navigate('/onboarding');
        return;
      }

      setGoal(goals[0]);

      // Load today's challenge
      const today = new Date().toISOString().split('T')[0];
      const { data: challenges } = await supabase
        .from('challenges')
        .select('*')
        .eq('goal_id', goals[0].id)
        .eq('day', today)
        .maybeSingle();

      setChallenge(challenges);
    } catch (error) {
      console.error('Error loading data:', error);
      toast.error('Error al cargar tus datos');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!goal) return null;

  const levelProgress = (goal.xp % 100);
  const categoryColor = getCategoryColor(goal.category);
  const categoryIcon = getCategoryIcon(goal.category);
  const hasChallenge = challenge && challenge.status === 'pending';

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-hero text-white p-6 rounded-b-3xl shadow-card">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold">¡Hola de nuevo!</h1>
            <p className="text-white/90 text-sm mt-1">Sigamos mejorando juntos</p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="ghost" 
              size="icon"
              className="text-white hover:bg-white/20"
              onClick={() => navigate('/settings')}
            >
              <Settings className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              className="text-white hover:bg-white/20"
              onClick={signOut}
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="bg-white/10 border-white/20 backdrop-blur">
            <CardContent className="p-4 text-center">
              <Flame className="h-6 w-6 mx-auto mb-1 text-white" />
              <div className="text-2xl font-bold text-white">{goal.streak}</div>
              <div className="text-xs text-white/80">días</div>
            </CardContent>
          </Card>
          <Card className="bg-white/10 border-white/20 backdrop-blur">
            <CardContent className="p-4 text-center">
              <Heart className="h-6 w-6 mx-auto mb-1 text-white" />
              <div className="text-2xl font-bold text-white">{goal.hearts}</div>
              <div className="text-xs text-white/80">vidas</div>
            </CardContent>
          </Card>
          <Card className="bg-white/10 border-white/20 backdrop-blur">
            <CardContent className="p-4 text-center">
              <Trophy className="h-6 w-6 mx-auto mb-1 text-white" />
              <div className="text-2xl font-bold text-white">{goal.xp}</div>
              <div className="text-xs text-white/80">XP</div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Active Goal Card */}
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl bg-${categoryColor}/10 flex items-center justify-center text-2xl`}>
                  {categoryIcon}
                </div>
                <div>
                  <h2 className="font-semibold text-lg">{goal.title}</h2>
                  <p className="text-sm text-muted-foreground">Nivel {goal.level}</p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/progress')}
              >
                <TrendingUp className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Progreso al nivel {goal.level + 1}</span>
                <span className="font-medium">{levelProgress}%</span>
              </div>
              <Progress value={levelProgress} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Today's Challenge */}
        {hasChallenge ? (
          <Card className="shadow-card border-2 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <Target className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-lg">Reto de hoy</h3>
              </div>
              <p className="text-foreground mb-4">{challenge.text}</p>
              
              <div className="flex gap-2 mb-4">
                <Badge variant="secondary">
                  {challenge.minutes} min
                </Badge>
                <Badge variant="outline">
                  {challenge.kind}
                </Badge>
              </div>

              <Button 
                className="w-full shadow-button" 
                size="lg"
                onClick={() => navigate('/challenge')}
              >
                Empezar ahora
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card className="shadow-card">
            <CardContent className="p-6 text-center">
              <div className="text-4xl mb-2">🎉</div>
              <h3 className="font-semibold mb-2">¡Reto completado!</h3>
              <p className="text-sm text-muted-foreground">
                {challenge?.status === 'done' 
                  ? 'Ya cumpliste tu reto de hoy. ¡Excelente trabajo!' 
                  : 'Tu nuevo reto estará disponible mañana.'}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button 
            variant="outline" 
            className="h-20"
            onClick={() => navigate('/goals')}
          >
            <div className="text-center">
              <Target className="h-5 w-5 mx-auto mb-1" />
              <div className="text-sm font-medium">Mis objetivos</div>
            </div>
          </Button>
          <Button 
            variant="outline" 
            className="h-20"
            onClick={() => navigate('/progress')}
          >
            <div className="text-center">
              <TrendingUp className="h-5 w-5 mx-auto mb-1" />
              <div className="text-sm font-medium">Progreso</div>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
