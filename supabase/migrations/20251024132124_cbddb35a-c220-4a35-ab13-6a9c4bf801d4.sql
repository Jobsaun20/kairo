-- Create profiles table
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text,
  locale text default 'es',
  tz text default 'Europe/Zurich',
  created_at timestamptz default now()
);

-- Create goals table
create table public.goals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  category text not null check (category in ('salud','idioma','ahorro','enfoque','otro')),
  level int not null default 1 check (level >= 1 and level <= 5),
  xp int not null default 0,
  streak int not null default 0,
  hearts int not null default 3,
  minutes_per_day int not null default 15,
  best_slot text not null default 'tarde' check (best_slot in ('manana','tarde','noche')),
  active boolean not null default true,
  created_at timestamptz default now()
);

-- Create challenges table
create table public.challenges (
  id uuid primary key default gen_random_uuid(),
  goal_id uuid not null references public.goals(id) on delete cascade,
  day date not null default current_date,
  kind text not null check (kind in ('accion','educacion','reflexion')),
  minutes int not null,
  text text not null,
  status text not null default 'pending' check (status in ('pending','done','skipped')),
  created_at timestamptz default now(),
  unique (goal_id, day)
);

-- Create preferences table
create table public.preferences (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  notifications_enabled boolean not null default true,
  morning_hour int not null default 9,
  noon_hour int not null default 13,
  evening_hour int not null default 20
);

-- Enable RLS
alter table public.profiles enable row level security;
alter table public.goals enable row level security;
alter table public.challenges enable row level security;
alter table public.preferences enable row level security;

-- RLS Policies for profiles
create policy "Users can view own profile"
  on public.profiles for select
  using (id = auth.uid());

create policy "Users can insert own profile"
  on public.profiles for insert
  with check (id = auth.uid());

create policy "Users can update own profile"
  on public.profiles for update
  using (id = auth.uid());

-- RLS Policies for goals
create policy "Users can view own goals"
  on public.goals for select
  using (user_id = auth.uid());

create policy "Users can insert own goals"
  on public.goals for insert
  with check (user_id = auth.uid());

create policy "Users can update own goals"
  on public.goals for update
  using (user_id = auth.uid());

create policy "Users can delete own goals"
  on public.goals for delete
  using (user_id = auth.uid());

-- RLS Policies for challenges
create policy "Users can view own challenges"
  on public.challenges for select
  using (exists (
    select 1 from public.goals g 
    where g.id = goal_id and g.user_id = auth.uid()
  ));

create policy "Users can insert own challenges"
  on public.challenges for insert
  with check (exists (
    select 1 from public.goals g 
    where g.id = goal_id and g.user_id = auth.uid()
  ));

create policy "Users can update own challenges"
  on public.challenges for update
  using (exists (
    select 1 from public.goals g 
    where g.id = goal_id and g.user_id = auth.uid()
  ));

create policy "Users can delete own challenges"
  on public.challenges for delete
  using (exists (
    select 1 from public.goals g 
    where g.id = goal_id and g.user_id = auth.uid()
  ));

-- RLS Policies for preferences
create policy "Users can view own preferences"
  on public.preferences for select
  using (user_id = auth.uid());

create policy "Users can insert own preferences"
  on public.preferences for insert
  with check (user_id = auth.uid());

create policy "Users can update own preferences"
  on public.preferences for update
  using (user_id = auth.uid());

-- Function to create profile automatically on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, username)
  values (new.id, new.email);
  
  insert into public.preferences (user_id)
  values (new.id);
  
  return new;
end;
$$;

-- Trigger to create profile on signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Function to update goal level based on performance
create or replace function public.update_goal_level()
returns void
language plpgsql
security definer set search_path = public
as $$
declare
  goal_record record;
  completion_rate float;
begin
  for goal_record in select id from public.goals where active = true loop
    -- Calculate completion rate for last 3 days
    select 
      count(case when status = 'done' then 1 end)::float / 
      nullif(count(*)::float, 0) into completion_rate
    from public.challenges
    where goal_id = goal_record.id
    and day >= current_date - interval '3 days'
    and day < current_date;
    
    -- Update level based on completion rate
    if completion_rate >= 0.7 then
      update public.goals
      set level = least(level + 1, 5)
      where id = goal_record.id;
    elsif completion_rate <= 0.4 and completion_rate > 0 then
      update public.goals
      set level = greatest(level - 1, 1)
      where id = goal_record.id;
    end if;
  end loop;
end;
$$;