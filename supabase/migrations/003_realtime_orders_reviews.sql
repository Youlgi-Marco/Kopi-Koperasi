-- Cross-device order and review workflows. Payment verification remains server-side.
create or replace function public.is_owner()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.profiles
    where id = (select auth.uid())
      and role = 'owner'
  );
$$;

revoke all on function public.is_owner() from public, anon;
grant execute on function public.is_owner() to authenticated;

drop policy if exists "customers read own orders" on public.orders;
create policy "customers read own orders" on public.orders
  for select to authenticated
  using (customer_id = (select auth.uid()));

drop policy if exists "owners read all orders" on public.orders;
create policy "owners read all orders" on public.orders
  for select to authenticated
  using ((select public.is_owner()));

drop policy if exists "visitors create unpaid orders" on public.orders;
create policy "visitors create unpaid orders" on public.orders
  for insert to anon, authenticated
  with check (
    customer_id is null
    and payment_status = 'UNPAID'
    and order_status = 'waiting_payment'
    and payment_method = 'QRIS'
  );

drop policy if exists "owners update orders" on public.orders;
create policy "owners update orders" on public.orders
  for update to authenticated
  using ((select public.is_owner()))
  with check ((select public.is_owner()));

drop policy if exists "approved reviews are readable by everyone" on public.reviews;
create policy "approved reviews are readable by everyone" on public.reviews
  for select to anon, authenticated
  using (approved = true);

drop policy if exists "owners read all reviews" on public.reviews;
create policy "owners read all reviews" on public.reviews
  for select to authenticated
  using ((select public.is_owner()));

drop policy if exists "visitors submit pending reviews" on public.reviews;
create policy "visitors submit pending reviews" on public.reviews
  for insert to anon, authenticated
  with check (approved = false);

drop policy if exists "owners moderate reviews" on public.reviews;
create policy "owners moderate reviews" on public.reviews
  for update to authenticated
  using ((select public.is_owner()))
  with check ((select public.is_owner()));

drop policy if exists "owners delete reviews" on public.reviews;
create policy "owners delete reviews" on public.reviews
  for delete to authenticated
  using ((select public.is_owner()));

grant select, insert on public.orders to anon, authenticated;
grant update (order_status, payment_status) on public.orders to authenticated;
grant select, insert on public.reviews to anon, authenticated;
grant update (approved) on public.reviews to authenticated;
grant delete on public.reviews to authenticated;

alter table public.orders replica identity full;
alter table public.reviews replica identity full;

do $$
begin
  if not exists (
    select 1
    from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'orders'
  ) then
    alter publication supabase_realtime add table public.orders;
  end if;

  if not exists (
    select 1
    from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'reviews'
  ) then
    alter publication supabase_realtime add table public.reviews;
  end if;
end;
$$;
