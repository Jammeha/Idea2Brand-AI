-- Run this script in your Supabase SQL Editor

-- 1. Create a table for public profiles corresponding to auth.users
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  brand_tokens integer default 5 not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Enable Row Level Security
alter table public.profiles enable row level security;

-- 3. Create policies so users can only view their own profile
create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);
  
create policy "Users can insert their own profile." on profiles
  for insert with check (auth.uid() = id);

create policy "Users can update own profile." on profiles
  for update using (auth.uid() = id);

-- 4. Create a trigger to automatically create a profile when a new user signs up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, brand_tokens)
  values (new.id, 5); -- Start new users with 5 free brand tokens
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
