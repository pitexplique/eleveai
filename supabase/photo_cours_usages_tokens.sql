-- Ce que « Photographier un cours » consomme réellement.
--
-- Frédéric, 13/08/2026, en pleine session de test : « COMBIEN CA A COUTE ? ».
-- Je n'ai pas su répondre autrement que par une estimation — et c'est un
-- manque, pas une fatalité : l'API renvoie le compte exact des tokens dans
-- CHAQUE réponse (`completion.usage`), et /api/parcours/explain les enregistre
-- déjà depuis des mois. Cette table-ci les jetait.
--
-- ⚠️ À EXÉCUTER DANS L'ÉDITEUR SQL DE SUPABASE AVANT LA MISE EN LIGNE.
-- Sans ces colonnes, l'insert de /api/photo-cours/* ÉCHOUE en entier (Supabase
-- rejette une colonne inconnue) — donc plus aucune ligne d'usage, et l'écran
-- admin se vide. Ce n'est pas un ajout facultatif comme les précédents.

alter table public.photo_cours_usages
  add column if not exists modele text null,
  add column if not exists input_tokens integer null,
  add column if not exists output_tokens integer null;

-- Le coût se calcule à la lecture, pas à l'écriture : les tarifs changent, les
-- tokens consommés non. Stocker un montant en euros aurait fige un prix de
-- 2026 dans des lignes qu'on relira en 2027.
comment on column public.photo_cours_usages.input_tokens is
  'Tokens d''entrée facturés (image comprise). Le coût se calcule à la lecture.';
comment on column public.photo_cours_usages.output_tokens is
  'Tokens de sortie facturés.';
comment on column public.photo_cours_usages.modele is
  'Modèle appelé — pour recalculer le coût si on change de modèle en cours de route.';
