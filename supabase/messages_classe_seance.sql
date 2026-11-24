-- 📤 SÉANCE ENVOYÉE À LA CLASSE (24/11/2026) — Frédéric : « go » pour
-- « Envoyer la séance à la classe ». Un message à la classe peut porter un
-- LIEN vers le coach sur les micros cochées par le prof ; l'élève voit un gros
-- bouton « ▶ Commencer la séance » dans son Cockpit et son Jardin.
--
-- Mêmes règles que supabase/messages_classe.sql (visible 7 jours, effacé à
-- 30 jours, une classe ne voit que ses envois). À exécuter APRÈS lui.
--
-- ⛔ Le lien est un CHEMIN INTERNE du site, jamais une URL externe : il
-- commence par « /coach », sans « // » ni « \ » (vérifié aussi dans
-- lib/server/messagesClasse.ts, nettoyerLienSeance).

alter table public.messages_classe add column if not exists lien text;

alter table public.messages_classe drop constraint if exists messages_classe_lien_interne;
alter table public.messages_classe add constraint messages_classe_lien_interne check (
  lien is null
  or (
    lien like '/coach%'
    and position('//' in lien) = 0
    and position('\' in lien) = 0
    and char_length(lien) <= 1000
  )
);
