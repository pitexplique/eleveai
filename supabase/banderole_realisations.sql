-- LA BANDEROLE DES RÉALISATIONS (03/11/2026).
-- Frédéric : « une banderole au-dessus du site qui affiche tout ce qui a été
-- fait […] que ça défile, que les gens voient le travail qui est fait ».
-- Rouge, écriture blanche, au-dessus de l'en-tête, sur /accueil seulement (04/11).
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

-- Les premières lignes. ⭐ 04/11/2026 : le suivi d'abord, puis les nouveautés,
-- plus de compteurs de stock (Frédéric : « on ne vend plus un suivi mais un
-- nombre de vidéos ? »). Table déjà remplie avec les anciens compteurs :
-- exécuter banderole_realisations_04-11.sql.
insert into public.banderole_realisations (texte, lien, ordre)
select * from (values
  ('Le coach trouve ce qui te manque et t''entraîne là-dessus', '/coach-ia/maths', 10),
  ('Tes résultats sont gardés : demain, tu reprends où tu t''es arrêté', '/auth/signin?inscription=1', 20),
  ('Une vidéo pour chaque micro-compétence, du CP à la Terminale', '/video', 30),
  ('Prof : le bilan de ta classe, micro-compétence par micro-compétence', '/prof/classes', 40),
  ('Nouveau : le dénombrement en Terminale, vidéos et coach', '/video', 50),
  ('Nouveau : la convexité en Terminale', '/video', 60),
  ('Nouveau : un cahier d''écriture pas à pas', '/fiches-ecriture/mon-cahier', 70),
  ('Adapté à 8 pays francophones', '/rejoindre-l-aventure', 80),
  ('En janvier : les visios « Maths réelles », vrai ou faux ?', '/tarifs', 90)
) as v(texte, lien, ordre)
where not exists (select 1 from public.banderole_realisations);
