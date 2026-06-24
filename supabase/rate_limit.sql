-- Rate limiting générique (fenêtre fixe), appelé par les routes API en
-- service-role pour freiner le brute-force — en premier lieu la connexion par
-- codes établissement (/api/code-login), où un mot de passe est comparé.
--
-- À EXÉCUTER UNE FOIS EN BASE (Supabase SQL editor). Tant que ce script n'est
-- pas lancé, le code applicatif « fail-open » : la fonction RPC est absente,
-- l'appel échoue silencieusement et la connexion reste autorisée. Aucune
-- régression donc si on déploie le code avant de lancer ce SQL.

create table if not exists public.rate_limits (
  bucket text primary key,
  hits integer not null default 0,
  window_start timestamptz not null default now()
);

-- Aucune policy : seule la service role (qui contourne le RLS) y accède.
alter table public.rate_limits enable row level security;

-- Incrémente le compteur du « bucket » dans une fenêtre glissante simple et
-- renvoie true si la requête est AUTORISÉE (hits <= limite), false si bloquée.
create or replace function public.rate_limit_hit(
  p_bucket text,
  p_limit integer,
  p_window_seconds integer
) returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  v_now timestamptz := now();
  v_hits integer;
begin
  insert into public.rate_limits as rl (bucket, hits, window_start)
    values (p_bucket, 1, v_now)
  on conflict (bucket) do update
    set
      hits = case
        when rl.window_start < v_now - make_interval(secs => p_window_seconds)
          then 1
          else rl.hits + 1
      end,
      window_start = case
        when rl.window_start < v_now - make_interval(secs => p_window_seconds)
          then v_now
          else rl.window_start
      end
  returning rl.hits into v_hits;

  return v_hits <= p_limit;
end;
$$;

-- Réservée à la service role (les routes API). Personne d'autre n'y touche.
revoke all on function public.rate_limit_hit(text, integer, integer)
  from public, anon, authenticated;
grant execute on function public.rate_limit_hit(text, integer, integer)
  to service_role;

-- Purge optionnelle des vieux buckets (à appeler dans un cron si souhaité) :
-- delete from public.rate_limits where window_start < now() - interval '1 day';
