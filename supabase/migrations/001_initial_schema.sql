-- KOPERASI initial schema for Supabase. Review before applying to a production project.
create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null default '',
  phone text,
  role text not null default 'customer' check (role in ('customer', 'staff', 'manager', 'owner')),
  created_at timestamptz not null default now()
);

create table if not exists public.products (
  id text primary key,
  name text not null,
  category text not null,
  series_name text not null default '',
  price integer not null check (price >= 0),
  description text not null default '',
  stock integer not null default 0 check (stock >= 0),
  available boolean not null default true,
  image text not null default '',
  temperature text,
  best_seller boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references auth.users(id) on delete set null,
  customer_name text not null,
  customer_phone text,
  order_type text not null check (order_type in ('dine_in', 'takeaway')),
  table_number text,
  items jsonb not null,
  subtotal integer not null check (subtotal >= 0),
  tax integer not null default 0 check (tax >= 0),
  total integer not null check (total >= 0),
  payment_method text not null default 'QRIS',
  payment_status text not null default 'UNPAID' check (payment_status in ('UNPAID', 'PAID', 'FAILED', 'REFUNDED')),
  order_status text not null default 'waiting_payment' check (order_status in ('waiting_payment', 'paid', 'preparing', 'ready', 'completed', 'cancelled')),
  provider_reference text unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references auth.users(id) on delete set null,
  author text not null,
  rating integer not null check (rating between 1 and 5),
  comment text not null,
  favorite_item text,
  approved boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.reviews enable row level security;

-- Public catalog and approved reviews can be read by visitors.
create policy "products are readable by everyone" on public.products for select using (true);
create policy "approved reviews are readable by everyone" on public.reviews for select using (approved = true);

-- Customers may read only their own orders. Order creation should be moved to a trusted
-- Edge Function/RPC that recalculates prices and validates stock; do not insert PAID from client.
create policy "customers read own orders" on public.orders for select to authenticated
  using (customer_id = (select auth.uid()));

create policy "users read own profile" on public.profiles for select to authenticated
  using (id = (select auth.uid()));
create policy "users update own profile" on public.profiles for update to authenticated
  using (id = (select auth.uid())) with check (id = (select auth.uid()));

-- Intentionally no client-side write policies for products, order payment status, stock, or review approval.
-- Add staff/manager policies only after defining and testing a secure role-checking function.
