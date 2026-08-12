-- ARCHIVER UN RETOUR SANS EFFACER SES POINTS — 12/08/2026
--
-- LE BESOIN. Sur le tableau de bord de l'élève, le bloc « L'équipe EleveAI a
-- répondu à mes avis » accumule des échanges qui n'ont plus lieu d'être : une
-- idée déjà réalisée, un bug corrigé, une proposition devenue caduque.
--
-- ⛔ POURQUOI ON NE SUPPRIME PAS LA LIGNE. Il n'existe aucune table de points :
-- /api/classement les recalcule à chaque appel EN COMPTANT LES LIGNES de
-- `retours_eleves`. Supprimer un retour retire donc ses points à l'élève et le
-- fait reculer au palmarès. Constaté sur Arthur (6C19) : 70 points, 3ᵉ place,
-- entièrement portés par ses deux avis.
--
-- Et ce sont ses mots. On ne corrige pas les fautes des élèves ; les effacer
-- irait plus loin encore.
--
-- CE QUE FAIT `archive` : l'échange disparaît de l'écran de l'élève. La ligne
-- reste, les points restent, le palmarès ne bouge pas, et la trace de ce que
-- les élèves ont proposé est conservée.
--
-- ⚠️ À EXÉCUTER AVANT LE DÉPLOIEMENT : /api/mes-messages filtre désormais sur
-- cette colonne. Tant qu'elle n'existe pas, la requête échoue et l'élève ne
-- voit plus ni ses messages ni ses avis.
--
-- Script idempotent : on peut le rejouer.

alter table public.retours_eleves
add column if not exists archive boolean not null default false;

-- L'écran de l'élève lit « mes retours répondus et non archivés ».
create index if not exists retours_eleves_archive_idx
on public.retours_eleves using btree (code_etablissement, code_eleve, archive);

-- Vérification : rien n'est archivé au départ, donc rien ne change à l'écran.
select archive, count(*) as nb
from public.retours_eleves
group by 1
order by 1;
