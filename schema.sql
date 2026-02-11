-- Create a table for public profiles using Supabase's auth.users
create table profiles (
  id uuid references auth.users not null primary key,
  updated_at timestamp with time zone,
  full_name text,
  avatar_url text,
  role text check (role in ('tenant', 'admin')) default 'tenant',
  email text,
  
  -- Tenant specific fields
  phone text,
  is_onboarded boolean default false
);

-- Set up Row Level Security (RLS)
alter table profiles enable row level security;

create policy "Public profiles are viewable by everyone."
  on profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = id );

-- Create a trigger to automatically create a profile entry when a new user signs up
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', 'tenant');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Create Units Table
create table units (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null, -- e.g. "Apartment 4B"
  address text,
  rent_amount numeric,
  status text check (status in ('occupied', 'vacant', 'maintenance')) default 'vacant',
  tenant_id uuid references profiles(id) -- Current tenant
);

alter table units enable row level security;

-- Admins can do everything with units
create policy "Admins can view all units"
  on units for select
  using ( exists ( select 1 from profiles where id = auth.uid() and role = 'admin' ) );
  
create policy "Admins can insert units"
  on units for insert
  with check ( exists ( select 1 from profiles where id = auth.uid() and role = 'admin' ) );
  
create policy "Admins can update units"
  on units for update
  using ( exists ( select 1 from profiles where id = auth.uid() and role = 'admin' ) );

-- Tenants can view their own unit
create policy "Tenants can view their assigned unit"
  on units for select
  using ( tenant_id = auth.uid() );
