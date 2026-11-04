-- LA BANDEROLE PARLE DU SUIVI, PLUS DU STOCK (04/11/2026).
-- Frédéric : « le bandeau avec le nombre de vidéos et fiches est-il approprié,
-- car là on ne vend plus un suivi mais un nombre de vidéos ? »
-- → les compteurs de stock sont MASQUÉS (visible = false, rien n'est effacé),
--   et les phrases du suivi et des nouveautés prennent leur place.
-- Mêmes phrases que la liste de secours de components/BanderoleRealisations.tsx.
-- À exécuter dans l'éditeur SQL de Supabase, après banderole_realisations.sql.

update public.banderole_realisations set visible = false where visible;

insert into public.banderole_realisations (texte, lien, ordre)
values
  ('Le coach trouve ce qui te manque et t''entraîne là-dessus', '/coach-ia/maths', 10),
  ('Tes résultats sont gardés : demain, tu reprends où tu t''es arrêté', '/auth/signin?inscription=1', 20),
  ('Une vidéo pour chaque micro-compétence, du CP à la Terminale', '/video', 30),
  ('Prof : le bilan de ta classe, micro-compétence par micro-compétence', '/prof/classes', 40),
  ('Nouveau : le dénombrement en Terminale, vidéos et coach', '/video', 50),
  ('Nouveau : la convexité en Terminale', '/video', 60),
  ('Nouveau : un cahier d''écriture pas à pas', '/fiches-ecriture/mon-cahier', 70),
  ('Adapté à 8 pays francophones', '/rejoindre-l-aventure', 80),
  ('En janvier : les visios « Maths réelles », vrai ou faux ?', '/tarifs', 90);
