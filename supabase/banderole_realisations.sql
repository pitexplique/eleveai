-- LA BANDEROLE DES RÉALISATIONS (03/11/2026).
-- Frédéric : « une banderole au-dessus du site qui affiche tout ce qui a été
-- fait […] que ça défile, que les gens voient le travail qui est fait ».
-- Rouge, écriture blanche, au-dessus de l'en-tête, sur toutes les pages.
--
-- ⭐ UNE LIGNE = UNE ANNONCE. On ajoute, on modifie, on masque directement dans
-- l'éditeur de tables de Supabase, sans redéployer le site :
--   texte   la phrase qui défile, courte (« 66 vidéos de Terminale »)
--   lien    facultatif : la page où l'on clique (« /video », « /coach »)
--   ordre   plus petit = plus tôt dans le défilé
--   visible false = la ligne reste en base mais ne défile plus
-- Le site relit la table toutes les 10 minutes (app/api/banderole/route.ts).
-- Table vide ou absente : le site affiche sa liste de secours
-- (components/BanderoleRealisations.tsx).
-- À exécuter dans l'éditeur SQL de Supabase.

create table if not exists public.banderole_realisations (
  id bigint generated always as identity primary key,
  texte text not null check (char_length(texte) between 3 and 120),
  lien text,
  ordre integer not null default 100,
  visible boolean not null default true,
  cree_le timestamptz not null default now()
) TABLESPACE pg_default;

create index if not exists banderole_realisations_ordre_idx
  on public.banderole_realisations using btree (ordre, id) TABLESPACE pg_default;

-- RLS activé sans policy : seule la clé service role (la route API) lit.
alter table public.banderole_realisations enable row level security;

-- Les premières lignes : chiffres relevés le 03/11/2026 dans
-- lib/videos/videos-r2.json (1 363 vidéos, dont 709 shorts).
insert into public.banderole_realisations (texte, lien, ordre)
select * from (values
  ('1 363 vidéos de maths en ligne, du CP à la Terminale', '/video', 10),
  ('654 vidéos de cours et 709 shorts', '/video', 20),
  ('66 vidéos de Terminale spécialité maths', '/video', 30),
  ('10 vidéos sur la convexité en Terminale', '/video', 40),
  ('170 vidéos pour la STMG', '/video', 50),
  ('162 vidéos de Première', '/video', 60),
  ('119 vidéos de Seconde', '/video', 70),
  ('168 vidéos de 4e et 130 de 6e', '/video', 80),
  ('Série Statistiques complète, du CM1 à la Terminale', '/video', 90),
  ('Pythagore 4e et 3e : 18 vidéos refaites', '/video', 100),
  ('2 370 exercices de lycée corrigés sans IA', '/fiches-exercices', 110),
  ('Le coach suit ton programme et tes progrès', '/coach', 120),
  ('Un cahier d''écriture pas à pas', '/fiches-ecriture/mon-cahier', 130)
) as v(texte, lien, ordre)
where not exists (select 1 from public.banderole_realisations);
