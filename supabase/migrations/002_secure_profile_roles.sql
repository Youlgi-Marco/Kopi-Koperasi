-- Create customer profiles for auth users, and prevent users from changing their own role.
create or replace function public.handle_new_user_profile()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, full_name, phone, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', ''),
    nullif(new.raw_user_meta_data ->> 'phone', ''),
    'customer'
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created_profile on auth.users;
create trigger on_auth_user_created_profile
  after insert on auth.users
  for each row execute procedure public.handle_new_user_profile();

insert into public.profiles (id, full_name, phone, role)
select
  id,
  coalesce(raw_user_meta_data ->> 'full_name', ''),
  nullif(raw_user_meta_data ->> 'phone', ''),
  'customer'
from auth.users
on conflict (id) do nothing;

drop policy if exists "users update own profile" on public.profiles;
drop policy if exists "users update own profile details" on public.profiles;
create policy "users update own profile details" on public.profiles
  for update to authenticated
  using (id = (select auth.uid()))
  with check (id = (select auth.uid()));

revoke update on public.profiles from anon, authenticated, public;
grant update (full_name, phone) on public.profiles to authenticated;
