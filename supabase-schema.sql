-- ============================================
-- Site dos Guri — Schema SQL
-- Rode este arquivo no Supabase Dashboard > SQL Editor
-- Pode ser re-executado sem problemas (idempotente)
-- ============================================

-- Limpar tabelas e dados antigos (CASCADE remove policies e dependências)
drop table if exists public.project_members cascade;
drop table if exists public.projects cascade;
drop table if exists public.members cascade;
drop table if exists public.products cascade;
drop table if exists public.momentos cascade;
drop table if exists public.features cascade;
drop table if exists public.profiles cascade;

-- 1. Profiles (ligada a auth.users)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  username text unique,
  display_name text,
  bio text,
  avatar_url text,
  instagram_url text,
  linkedin_url text,
  twitter_url text,
  website_url text,
  role text default 'member' check (role in ('member', 'admin')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "Perfis são públicos" on public.profiles
  for select using (true);

create policy "Usuário edita próprio perfil" on public.profiles
  for update using (auth.uid() = id);

create policy "Usuário insere próprio perfil" on public.profiles
  for insert with check (auth.uid() = id);

-- Trigger: criar perfil ao fazer signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, new.raw_user_meta_data ->> 'display_name');
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 2. Members
create table if not exists public.members (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  role text not null,
  bio text,
  avatar_url text,
  instagram_url text,
  linkedin_url text,
  twitter_url text,
  website_url text,
  display_order int default 0,
  created_at timestamptz default now()
);

alter table public.members enable row level security;

create policy "Membros são públicos" on public.members
  for select using (true);

create policy "Admin gerencia membros" on public.members
  for all using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

-- 3. Projects (Rolês)
create table if not exists public.projects (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text not null,
  image_url text,
  tags text[] default '{}',
  repo_url text,
  live_url text,
  display_order int default 0,
  created_at timestamptz default now()
);

alter table public.projects enable row level security;

create policy "Projetos são públicos" on public.projects
  for select using (true);

create policy "Admin gerencia projetos" on public.projects
  for all using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

-- 4. Project Members (N:N)
create table if not exists public.project_members (
  project_id uuid references public.projects on delete cascade,
  member_id uuid references public.members on delete cascade,
  primary key (project_id, member_id)
);

alter table public.project_members enable row level security;

create policy "Relações são públicas" on public.project_members
  for select using (true);

create policy "Admin gerencia relações" on public.project_members
  for all using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

-- 5. Products
create table if not exists public.products (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  description text not null,
  image_url text,
  sizes text[] default '{}',
  colors text[] default '{}',
  whatsapp_url text,
  is_active boolean default true,
  display_order int default 0,
  created_at timestamptz default now()
);

alter table public.products enable row level security;

create policy "Produtos são públicos" on public.products
  for select using (true);

create policy "Admin gerencia produtos" on public.products
  for all using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

-- 6. Momentos (timeline da página Sobre)
create table if not exists public.momentos (
  id uuid default gen_random_uuid() primary key,
  icon_name text not null default 'Camera',
  title text not null,
  description text not null,
  image_url text,
  display_order int default 0,
  created_at timestamptz default now()
);

alter table public.momentos enable row level security;

create policy "Momentos são públicos" on public.momentos
  for select using (true);

create policy "Admin gerencia momentos" on public.momentos
  for all using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

-- 7. Features (cards da homepage)
create table if not exists public.features (
  id uuid default gen_random_uuid() primary key,
  icon_name text not null default 'Users',
  title text not null,
  description text not null,
  color text not null default 'text-guri-green-500',
  display_order int default 0,
  created_at timestamptz default now()
);

alter table public.features enable row level security;

create policy "Features são públicas" on public.features
  for select using (true);

create policy "Admin gerencia features" on public.features
  for all using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

-- ============================================
-- STORAGE (avatars)
-- ============================================

insert into storage.buckets (id, name, public) values ('avatars', 'avatars', true)
on conflict (id) do nothing;

drop policy if exists "Avatars são públicos" on storage.objects;
create policy "Avatars são públicos" on storage.objects
  for select using (bucket_id = 'avatars');

drop policy if exists "Usuário faz upload de avatar" on storage.objects;
create policy "Usuário faz upload de avatar" on storage.objects
  for insert with check (bucket_id = 'avatars' and auth.role() = 'authenticated');

drop policy if exists "Usuário deleta próprio avatar" on storage.objects;
create policy "Usuário deleta próprio avatar" on storage.objects
  for delete using (bucket_id = 'avatars' and auth.role() = 'authenticated');

-- ============================================
-- SEED DATA
-- ============================================

-- Membros
insert into public.members (name, role, bio, avatar_url, instagram_url, linkedin_url, twitter_url, website_url, display_order) values
  ('Johnson', 'Fundador', 'Rei do beat pegou a visão?', 'avatars/pedro.jpg', 'https://instagram.com', null, null, null, 1),
  ('GHJ', 'O Resenha', 'Fodase essa descrição.', 'avatars/gabriel.jpg', 'https://instagram.com', null, 'https://twitter.com', null, 2),
  ('THG', 'Braço Direito', 'Fodase essa descrição.', 'avatars/thalis.jpg', 'https://instagram.com', null, null, null, 3),
  ('Kaio Maconheiro', 'Criou essa merda', 'Fodase.', 'avatars/kaio.jpg', 'https://instagram.com', null, null, null, 4);

-- Rolês
insert into public.projects (title, description, tags, repo_url, live_url, display_order) values
  ('Churrasco dos Guri', 'O clássico churras do grupo. Carne, música e muita resenha do começo ao fim.', '{"Churrasco","Resenha","Clássico"}', null, null, 1),
  ('Pelada de Domingo', 'Futebol sagrado de todo domingo. Quem perde paga o açaí.', '{"Futebol","Domingo","Tradição"}', null, null, 2),
  ('Rolê de Praia', 'Dia de sol, prancha e cooler cheio. O rolê mais esperado do verão.', '{"Praia","Verão","Aventura"}', null, null, 3),
  ('Noite de Jogos', 'Truco, sinuca, videogame — vale tudo menos perder.', '{"Jogos","Noite","Competição"}', null, null, 4);

-- Project Members (relações)
insert into public.project_members (project_id, member_id)
select p.id, m.id from public.projects p, public.members m
where (p.title = 'Churrasco dos Guri' and m.name in ('Johnson', 'GHJ'))
   or (p.title = 'Pelada de Domingo' and m.name in ('THG', 'Kaio Maconheiro'))
   or (p.title = 'Rolê de Praia' and m.name in ('GHJ', 'THG'))
   or (p.title = 'Noite de Jogos' and m.name in ('Johnson', 'Kaio Maconheiro'));

-- Produto
insert into public.products (name, description, image_url, sizes, colors, whatsapp_url, display_order) values
  ('Camiseta dos Guri', 'Camiseta oficial do grupo, feita com material de qualidade. Disponível em diversas cores e tamanhos.', 'products/camiseta.jpg', '{"P","M","G","GG"}', '{"Preta","Branca"}', 'https://wa.me/5500000000000', 1);

-- Momentos
insert into public.momentos (icon_name, title, description, display_order) values
  ('Camera', 'O Começo', 'Um grupo de amigos que se conheceu e decidiu que a resenha não podia parar.', 1),
  ('PartyPopper', 'Primeiro Rolê', 'O primeiro churras oficial do grupo. Ninguém esquece aquele dia.', 2),
  ('Coffee', 'Tradição Firmada', 'Os encontros viraram rotina — todo fim de semana tinha algo marcado.', 3),
  ('Trophy', 'Virou Família', 'De amigos a irmãos. O grupo cresceu e a resenha só ficou melhor.', 4);

-- Features
insert into public.features (icon_name, title, description, color, display_order) values
  ('Flame', 'Resenha Garantida', 'Onde os Guri se juntam, a diversão é certa. Sem tempo ruim.', 'text-guri-green-500', 1),
  ('Users', 'Parceria Firmeza', 'Um grupo unido que tá junto em qualquer rolê, chuva ou sol.', 'text-guri-blue-500', 2),
  ('MapPin', 'Rolê Marcado', 'Sempre tem algo acontecendo. Churrasco, pelada, praia — é só colar.', 'text-yellow-500', 3);

-- ============================================
-- GALERIA (Gallery)
-- ============================================

drop table if exists public.gallery_comments cascade;
drop table if exists public.gallery_reactions cascade;
drop table if exists public.gallery_posts cascade;

-- 8. Gallery Posts
create table if not exists public.gallery_posts (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  image_url text not null,
  caption text,
  created_at timestamptz default now()
);

alter table public.gallery_posts enable row level security;

create policy "Posts da galeria são públicos" on public.gallery_posts
  for select using (true);

create policy "Usuário cria próprio post" on public.gallery_posts
  for insert with check (auth.uid() = user_id);

create policy "Usuário deleta próprio post" on public.gallery_posts
  for delete using (auth.uid() = user_id);

-- 9. Gallery Reactions
create table if not exists public.gallery_reactions (
  id uuid default gen_random_uuid() primary key,
  post_id uuid references public.gallery_posts(id) on delete cascade not null,
  user_id uuid references public.profiles(id) on delete cascade not null,
  reaction_type text not null check (reaction_type in ('like', 'love', 'fire')),
  created_at timestamptz default now(),
  unique (post_id, user_id, reaction_type)
);

alter table public.gallery_reactions enable row level security;

create policy "Reações são públicas" on public.gallery_reactions
  for select using (true);

create policy "Usuário cria própria reação" on public.gallery_reactions
  for insert with check (auth.uid() = user_id);

create policy "Usuário remove própria reação" on public.gallery_reactions
  for delete using (auth.uid() = user_id);

-- 10. Gallery Comments
create table if not exists public.gallery_comments (
  id uuid default gen_random_uuid() primary key,
  post_id uuid references public.gallery_posts(id) on delete cascade not null,
  user_id uuid references public.profiles(id) on delete cascade not null,
  content text not null,
  created_at timestamptz default now()
);

alter table public.gallery_comments enable row level security;

create policy "Comentários são públicos" on public.gallery_comments
  for select using (true);

create policy "Usuário cria próprio comentário" on public.gallery_comments
  for insert with check (auth.uid() = user_id);

create policy "Usuário deleta próprio comentário" on public.gallery_comments
  for delete using (auth.uid() = user_id);

-- ============================================
-- STORAGE (gallery)
-- ============================================

insert into storage.buckets (id, name, public) values ('gallery', 'gallery', true)
on conflict (id) do nothing;

drop policy if exists "Fotos da galeria são públicas" on storage.objects;
create policy "Fotos da galeria são públicas" on storage.objects
  for select using (bucket_id = 'gallery');

drop policy if exists "Usuário faz upload na galeria" on storage.objects;
create policy "Usuário faz upload na galeria" on storage.objects
  for insert with check (bucket_id = 'gallery' and auth.role() = 'authenticated');

drop policy if exists "Usuário deleta foto da galeria" on storage.objects;
create policy "Usuário deleta foto da galeria" on storage.objects
  for delete using (bucket_id = 'gallery' and auth.role() = 'authenticated');
