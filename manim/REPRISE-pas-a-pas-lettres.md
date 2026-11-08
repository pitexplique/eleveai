# Reprise — « La belle écriture, pas à pas » : les 20 lettres en paysage lent

> À coller dans une session neuve. État au 08/11/2026 après-midi.

## Le pourquoi
Frédéric, en 6e : un élève avec AESH et deux élèves d'ULIS qui ne savaient pas écrire.
Les 10 paysages des chiffres (`manim/scripts/cp/pas_a_pas_chiffres.py`) les ont fait écrire :
« pour une fois ils étaient fiers ». Ces vidéos doivent être LENTES, encourageantes, et faire RÉUSSIR.
Règles : tout en cursive (jamais l'imprimé pour le modèle), voix = écrit à l'écran, La Réunion rare,
tout en français. Fin de voix : « Entraîne-toi sur éleveai point f r. Et si ça t'a aidé : mets un pouce,
laisse un commentaire, abonne-toi et active la cloche ! ».

## Ce qui est fait
- `manim/scripts/cp/pas_a_pas_lettres.py` : le gabarit des chiffres pour les 20 lettres tracées
  (a c d e f g h i k l m n o p q r s t u y). Il contient MORCEAUX (coupés sur les proportions MESURÉES des
  chemins `chemin_<x>`), LEURRE (Q2), LEURRE_MOT (Q3 : un mot sans la lettre), MOT_Q3 = 3 (4e mot de la
  scène). La réglure se règle sur la lettre. Le point du i est un 2e trait.
  Essai du i contrôlé et corrigé : taille de la lettre, main du doigt, point vert sur le point du i,
  lettre allumée de la Q3, « Bravo » qui touchait le mot.
- Les 20 voix : `manim/voix/cp-pas-a-pas-lettre-<x>.json`, WAV à −28 dans `public/sons/cp-pas-a-pas-lettre-<x>/`.
- `scripts/manifeste-pas-a-pas-lettres.mjs` (pas encore lancé) : `node scripts/manifeste-pas-a-pas-lettres.mjs <dossier des logs rendu-hq-<x>.log> [lettres]`.
- Miniatures : bloc `_acc_lettre` dans `manim/miniature_essai_v2.py`, qui trace la cursive.
  Lancer `python manim/miniature_essai_v2.py pas-a-pas-lettre` APRÈS avoir copié les MP4 (la durée vient de ffprobe).
- Les dossiers `manim/sorties/cp/francais/paysage/fr/pas-a-pas/lettre-<x>/` existent.

## Rendus
Lot 1 (i f a m g) : voir la section « État des rendus » en bas, mise à jour en fin de session.
Commande (un `--media_dir` PAR rendu parallèle, toujours `--disable_caching`) :
```
python -m manim render -qh --disable_caching manim/scripts/cp/pas_a_pas_lettres.py PasAPasLettre<X> \
  -o eleveai-francais-cp-pas-a-pas-lettre-<x> --media_dir manim/scripts/cp/media-pap-<x> > rendu-hq-<x>.log 2>&1
```
⚠️ Cinq en parallèle, il faut ~25 min par lot. Gardez les journaux : ils portent les « TEMPS » du manifeste.
Contrôle de chaque rendu :
- ffprobe : audio ≈ vidéo ;
- des images aux instants TEMPS (+2 à 5 s) : garde, morceaux, doigt, Q2, mots, Q3 (lettre allumée à sa place),
  fiche, fin ;
- les bords : rien de clair à moins de 3 px du bord.

## Reste à faire
1. Rendre les lettres restantes, les contrôler, corriger même un défaut mineur et re-rendre.
2. Copier les MP4 dans `manim/sorties/.../lettre-<x>/`, puis faire les miniatures.
3. R2 lettre par lettre, JAMAIS `-Envoyer` (il envoie aussi les chantiers des autres) :
   `powershell -File scripts/r2-videos.ps1 -Rclone "copy C:\Users\FRED\Documents\eleveai\manim\sorties\cp\francais\paysage\fr\pas-a-pas\lettre-<x> R2:cp/francais/paysage/fr/pas-a-pas/lettre-<x>"`
4. Copier `manim/manifeste-youtube.json` en sauvegarde, lancer le script mjs, puis `node scripts/generer-videos-r2.mjs`.
   Ne committer que NOS lignes : ces fichiers portent des modifications d'autres sessions
   (blob HEAD + nos lignes, dans l'ordre des clés de HEAD).
5. Commit PAR CHEMIN, sans push (le chef d'orchestre pousse le soir), sans YouTube (sur ordre de Frédéric seulement).
6. Lister les voix à Frédéric (les `09-morceau-*` et `20-q3` de chaque JSON) pour qu'il les relise.
7. b j v w x z ne sont PAS tracées. Lui demander, AVANT tout essai : « Décrivez-moi le geste en courbures :
   par où ça part, creux ou voûte à chaque étape, où ça lève, et à quelle hauteur ça croise. »

## État des rendus
Mis à jour le 08/11 vers 15 h 30 :
- Lot 1 rendu en hq : **i f a m g**. Durée et bords OK (vidéo ≈ audio + 1,5 s, rien sur les bords).
  ⛔ Ce lot est À RE-RENDRE : à la question 2, « Bravo ! » touchait le cadre d'une lettre large (m).
  C'est corrigé APRÈS le rendu : « Bravo ! » passe sous les choix, avec un assert qui arrête le rendu s'il touche un choix.
- Les 20 lettres passent `--dry_run` (tous les asserts de mise en page) avec cette correction.
- Rien n'est encore copié dans sorties, envoyé sur R2 ni mis au manifeste.
- Les WAV `public/sons/cp-pas-a-pas-lettre-*` et les dossiers `manim/scripts/cp/media-pap-*` ne sont PAS dans git
  (comme pour les chiffres) : ne pas les committer.
👉 Prochaine étape : rendre les 20 lettres par lots de 5
(i f a m g, puis c d e h k, puis l n o p q, puis r s t u y), contrôler chaque planche, et enchaîner sur « Reste à faire ».
