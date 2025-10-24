import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, Bell, Clock, Globe } from 'lucide-react';
import { toast } from 'sonner';

interface Preferences {
  notifications_enabled: boolean;
  morning_hour: number;
  noon_hour: number;
  evening_hour: number;
}

const Settings = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [prefs, setPrefs] = useState<Preferences>({
    notifications_enabled: true,
    morning_hour: 9,
    noon_hour: 13,
    evening_hour: 20
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    loadPreferences();
  }, [user]);

  const loadPreferences = async () => {
    try {
      const { data, error } = await supabase
        .from('preferences')
        .select('*')
        .eq('user_id', user?.id)
        .maybeSingle();

      if (error) throw error;
      if (data) {
        setPrefs(data);
      }
    } catch (error) {
      console.error('Error loading preferences:', error);
      toast.error('Error al cargar preferencias');
    } finally {
      setLoading(false);
    }
  };

  const savePreferences = async () => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from('preferences')
        .upsert({
          user_id: user?.id,
          ...prefs
        });

      if (error) throw error;
      toast.success('Preferencias guardadas');
    } catch (error) {
      console.error('Error saving preferences:', error);
      toast.error('Error al guardar');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-hero text-white p-6 rounded-b-3xl shadow-card">
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate('/home')}
            className="text-white hover:bg-white/20"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Configuración</h1>
            <p className="text-white/90 text-sm">Personaliza tu experiencia</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Notifications */}
        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              Notificaciones
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium">Recordatorios diarios</Label>
                <p className="text-xs text-muted-foreground mt-1">
                  Te avisaremos de tus retos
                </p>
              </div>
              <Switch
                checked={prefs.notifications_enabled}
                onCheckedChange={(checked) => 
                  setPrefs({ ...prefs, notifications_enabled: checked })
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Notification Times */}
        {prefs.notifications_enabled && (
          <Card className="shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Horarios de recordatorio
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Mañana</Label>
                <div className="grid grid-cols-4 gap-2 mt-2">
                  {[7, 8, 9, 10].map((hour) => (
                    <Button
                      key={hour}
                      variant={prefs.morning_hour === hour ? 'default' : 'outline'}
                      onClick={() => setPrefs({ ...prefs, morning_hour: hour })}
                      size="sm"
                    >
                      {hour}:00
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium">Mediodía</Label>
                <div className="grid grid-cols-4 gap-2 mt-2">
                  {[12, 13, 14, 15].map((hour) => (
                    <Button
                      key={hour}
                      variant={prefs.noon_hour === hour ? 'default' : 'outline'}
                      onClick={() => setPrefs({ ...prefs, noon_hour: hour })}
                      size="sm"
                    >
                      {hour}:00
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium">Noche</Label>
                <div className="grid grid-cols-4 gap-2 mt-2">
                  {[19, 20, 21, 22].map((hour) => (
                    <Button
                      key={hour}
                      variant={prefs.evening_hour === hour ? 'default' : 'outline'}
                      onClick={() => setPrefs({ ...prefs, evening_hour: hour })}
                      size="sm"
                    >
                      {hour}:00
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Save Button */}
        <Button 
          className="w-full" 
          size="lg"
          onClick={savePreferences}
          disabled={saving}
        >
          {saving ? 'Guardando...' : 'Guardar cambios'}
        </Button>
      </div>
    </div>
  );
};

export default Settings;
