-- Create profiles table
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text,
  full_name text,
  avatar_url text,
  updated_at timestamp with time zone default now()
);

-- Enable Row Level Security
alter table profiles enable row level security;

-- Policy: Allow users to select their own profile
create policy "Users can select own profile" on profiles
  for select using (auth.uid() = id);

-- Policy: Allow users to insert their own profile
create policy "Users can insert own profile" on profiles
  for insert with check (auth.uid() = id);

-- Policy: Allow users to update their own profile
create policy "Users can update own profile" on profiles
  for update using (auth.uid() = id);
