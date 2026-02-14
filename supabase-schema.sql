-- ============================================
-- Site dos Guri — Schema SQL
-- Rode este arquivo no Supabase Dashboard > SQL Editor
-- ============================================

-- 1. Profiles (ligada a auth.users)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  display_name text,
  bio text,
  avatar_url text,
  github_url text,
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
  github_url text,
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

-- 3. Projects
create table if not exists public.projects (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text not null,
  image_url text,
  tech_stack text[] default '{}',
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
  icon_name text not null default 'Code2',
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
-- SEED DATA
-- ============================================

-- Membros
insert into public.members (name, role, bio, avatar_url, github_url, linkedin_url, twitter_url, website_url, display_order) values
  ('Johnson', 'Administrador', 'Rei do beat pegou a visão?', 'avatars/pedro.jpg', 'https://github.com', 'https://linkedin.com', null, null, 1),
  ('GHJ', 'Administrador', 'Fodase essa descrição.', 'avatars/gabriel.jpg', 'https://github.com', null, 'https://twitter.com', null, 2),
  ('THG', 'Administrador', 'Fodase essa descrição.', 'avatars/thalis.jpg', 'https://github.com', 'https://linkedin.com', null, 'https://example.com', 3),
  ('Kaio Maconheiro', 'Criou essa merda', 'Fodase.', 'avatars/kaio.jpg', 'https://github.com', null, null, null, 4);

-- Projetos
with m as (select id, name from public.members)
insert into public.projects (title, description, tech_stack, repo_url, live_url, display_order) values
  ('Site dos Guri', 'Website da comunidade, construído com as tecnologias mais modernas do ecossistema React.', '{"Next.js","React","TypeScript","Tailwind CSS","Supabase"}', 'https://github.com', 'https://example.com', 1),
  ('API de Gerenciamento', 'API RESTful para gerenciamento de projetos e tarefas da comunidade com autenticação JWT.', '{"Node.js","Express","PostgreSQL","Prisma"}', 'https://github.com', null, 2),
  ('Bot Discord', 'Bot para o servidor da comunidade com comandos personalizados, moderação e integrações.', '{"Discord.js","TypeScript","Redis"}', 'https://github.com', null, 3),
  ('Mobile App', 'Aplicativo mobile da comunidade para acompanhar projetos e se conectar com os membros.', '{"React Native","Expo","TypeScript","Supabase"}', null, null, 4);

-- Project Members (relações)
insert into public.project_members (project_id, member_id)
select p.id, m.id from public.projects p, public.members m
where (p.title = 'Site dos Guri' and m.name in ('Johnson', 'GHJ'))
   or (p.title = 'API de Gerenciamento' and m.name in ('THG', 'Kaio Maconheiro'))
   or (p.title = 'Bot Discord' and m.name in ('GHJ', 'THG'))
   or (p.title = 'Mobile App' and m.name in ('Johnson', 'Kaio Maconheiro'));

-- Produto
insert into public.products (name, description, image_url, sizes, colors, whatsapp_url, display_order) values
  ('Camiseta dos Guri', 'Camiseta oficial do grupo, feita com material de qualidade. Disponível em diversas cores e tamanhos.', 'products/camiseta.jpg', '{"P","M","G","GG"}', '{"Preta","Branca"}', 'https://wa.me/5500000000000', 1);

-- Momentos
insert into public.momentos (icon_name, title, description, display_order) values
  ('Camera', 'O Começo', 'Um grupo de amigos com a mesma paixão por tecnologia decidiu se juntar.', 1),
  ('PartyPopper', 'Primeiro Evento', 'Organizamos nosso primeiro encontro presencial com a comunidade local.', 2),
  ('Coffee', 'Café & Code', 'Sessões semanais de programação em grupo se tornaram tradição.', 3),
  ('Trophy', 'Primeiro Projeto', 'Lançamos nosso primeiro projeto open source juntos.', 4);

-- Features
insert into public.features (icon_name, title, description, color, display_order) values
  ('Code2', 'Projetos Open Source', 'Colaboramos em projetos reais que fazem a diferença na comunidade dev.', 'text-guri-green-500', 1),
  ('Users', 'Comunidade Ativa', 'Um grupo unido que compartilha conhecimento e experiências.', 'text-guri-blue-500', 2),
  ('Lightbulb', 'Inovação', 'Sempre explorando novas tecnologias e abordagens criativas.', 'text-yellow-500', 3);
