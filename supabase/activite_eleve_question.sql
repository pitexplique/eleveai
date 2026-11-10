-- « EN DIRECT » : VOIR LA QUESTION DE L'ÉLÈVE — 10/11/2026
--
-- LE BESOIN (Frédéric). Dans « Mes classes » → « Direct », voir, s'il le
-- souhaite, la question sur laquelle l'élève travaille : l'énoncé, ce qu'il a
-- répondu, et si c'est juste (la colonne `juste` existe déjà).
--
-- Deux colonnes de plus sur activite_eleve, remplies pour les gestes « coach »
-- seulement. Même durée de vie que le reste : 30 jours (purge de /api/activite).
--
-- Sans ces colonnes, rien ne casse : /api/activite écrit la ligne sans elles et
-- la page « En direct » affiche « énoncé pas encore enregistré ». Idempotent.

alter table public.activite_eleve add column if not exists enonce text null;   -- l'énoncé, en Markdown + LaTeX comme dans le coach
alter table public.activite_eleve add column if not exists reponse text null;  -- ce que l'élève a envoyé
