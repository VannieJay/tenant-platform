-- Create Payments Table
create table payments (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  tenant_id uuid references profiles(id) not null,
  unit_id uuid references units(id),
  amount numeric not null,
  currency text default 'NGN',
  reference text unique not null,
  status text check (status in ('pending', 'success', 'failed')) default 'pending',
  type text default 'rent', -- rent, service_charge, other
  metadata jsonb
);

-- RLS for Payments
alter table payments enable row level security;

create policy "Tenants can view their own payments"
  on payments for select
  using ( tenant_id = auth.uid() );

create policy "Admins can view all payments"
  on payments for select
  using ( exists ( select 1 from profiles where id = auth.uid() and role = 'admin' ) );
  
-- Only system/admin (or server action with service role) should ideally insert verified payments
-- But for client-initiated pending payments, we can allow insert with status 'pending'
create policy "Tenants can insert pending payments"
  on payments for insert
  with check ( tenant_id = auth.uid() and status = 'pending' );

create policy "Admins can update payments"
  on payments for update
  using ( exists ( select 1 from profiles where id = auth.uid() and role = 'admin' ) );
