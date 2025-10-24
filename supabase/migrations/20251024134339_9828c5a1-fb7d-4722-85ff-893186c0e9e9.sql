-- Add new columns to goals table for specific goal configuration
ALTER TABLE public.goals 
ADD COLUMN IF NOT EXISTS target_weight INTEGER,
ADD COLUMN IF NOT EXISTS deadline_weeks INTEGER,
ADD COLUMN IF NOT EXISTS language_target TEXT,
ADD COLUMN IF NOT EXISTS savings_target INTEGER,
ADD COLUMN IF NOT EXISTS specific_details JSONB DEFAULT '{}'::jsonb;

-- Remove the unique active goal constraint to allow multiple goals
-- Users can have multiple active goals
COMMENT ON COLUMN public.goals.target_weight IS 'Weight target in kg for health goals';
COMMENT ON COLUMN public.goals.deadline_weeks IS 'Deadline in weeks (1, 2, 4, 12)';
COMMENT ON COLUMN public.goals.language_target IS 'Language being learned';
COMMENT ON COLUMN public.goals.savings_target IS 'Savings target in CHF';
COMMENT ON COLUMN public.goals.specific_details IS 'Additional goal-specific configuration';