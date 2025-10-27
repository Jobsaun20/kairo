import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { pickTodayTask } from '@/lib/taskPlanner';
import { CategorySelector } from '@/components/onboarding/CategorySelector';
import { SubCategorySelector } from '@/components/onboarding/SubCategorySelector';
import { GoalDetailsForm } from '@/components/onboarding/GoalDetailsForm';

const Onboarding = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: category, 2: subcategory, 3: details
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    minutes: 15,
    targetWeight: null as number | null,
    deadlineWeeks: null as number | null,
    languageTarget: '',
    currentLevel: '',
    targetLevel: '',
    savingsTarget: null as number | null,
    bestSlot: 'tarde',
  });
  const [loading, setLoading] = useState(false);

  const handleCategorySelect = (categoryId: string) => {
    setCategory(categoryId);
    setStep(2);
  };

  const handleSubCategorySelect = (subCategoryId: string) => {
    setSubCategory(subCategoryId);
    setStep(3);
  };

  const handleFinish = async () => {
    if (!user || !category || !formData.title) return;
    
    setLoading(true);
    try {
      const specificDetails: any = {
        subCategory,
        ...formData
      };

      const goalData: any = {
        user_id: user.id,
        title: formData.title,
        category,
        minutes_per_day: formData.minutes,
        level: 1,
        xp: 0,
        streak: 0,
        hearts: 3,
        active: true,
        best_slot: formData.bestSlot,
        specific_details: specificDetails
      };

      if (formData.targetWeight) goalData.target_weight = formData.targetWeight;
      if (formData.deadlineWeeks) goalData.deadline_weeks = formData.deadlineWeeks;
      if (formData.languageTarget) goalData.language_target = formData.languageTarget;
      if (formData.savingsTarget) goalData.savings_target = formData.savingsTarget;

      const { data: goal, error: goalError } = await supabase
        .from('goals')
        .insert(goalData)
        .select()
        .single();

      if (goalError) throw goalError;

      const task = pickTodayTask(category, 1, formData.minutes, []);
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
            <CategorySelector 
              selectedCategory={category}
              onSelect={handleCategorySelect}
            />
          )}

          {step === 2 && (
            <SubCategorySelector 
              categoryId={category}
              selectedSubCategory={subCategory}
              onSelect={handleSubCategorySelect}
              onBack={() => setStep(1)}
            />
          )}

          {step === 3 && (
            <GoalDetailsForm
              categoryId={category}
              subCategoryId={subCategory}
              formData={formData}
              onUpdate={setFormData}
              onBack={() => setStep(2)}
              onSubmit={handleFinish}
              loading={loading}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Onboarding;
