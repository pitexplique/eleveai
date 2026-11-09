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
Mis à jour le 08/11 vers 19 h (session de reprise, relève à 67 % de contexte) :
- Le contrôle des planches a trouvé 6 défauts, tous corrigés dans le gabarit, chacun avec son assert :
  1. la lettre ou le dessin écarté d'une question devenait une forme PLEINE (`set_opacity` remplit les tracés creux) → on n'estompe que le trait ;
  2. le haut du f (et le crayon, 0,66 au-dessus de sa pointe) mordait sur une consigne de deux lignes → plafond sous la consigne (marge crayon 0,95), la lettre rapetisse ;
  3. une consigne coupée après la virgule restait plus large que la limite et touchait la lettre du coin (g) → coupe qui tient, sinon la police baisse jusqu'à 34 ;
  4. la clé de la Q3 (c) faisait 5 unités de large → dessins de la Q3 ≤ 1,8 × leur hauteur ;
  5. « Bravo ! » de la Q3 finissait à 30 px du bas (sous la barre du lecteur) → choix de la Q3 à y = −0,6, et les choix montent si « Bravo ! » finirait à moins de 0,6 du bas ;
  6. la boîte du dessin de la goutte s'arrête 0,31 au-dessus de sa courbe : les « tt » de « goutte » touchaient le dessin (Q3 du g) → le mot se place sous le VRAI bas de la courbe.
  7. même défaut de boîte à GAUCHE pour la lune : « lune » touchait son dessin (u, « u comme dans… ») → le dessin part du vrai bord gauche.
- ✅ Re-rendues en hq, contrôlées (durée, bords, marge de « Bravo ! » ≥ 80 px, planches regardées) et COPIÉES dans
  `manim/sorties/.../lettre-<x>/` : **i f a m c d e h k l n o p q r s t y** (18), journaux dans `journaux/`.
- ⛔ **g** (défaut 6) et **u** (défaut 7) sont À RE-RENDRE : `bash rendre.sh g u` (~25 min), puis contrôle
  (`controle.py g u`, regarder les planches, `bravo.py gu`), copie du MP4 et du journal.
- Journaux des rendus validés (ils portent les TEMPS du manifeste) : dans le dossier de notes
  `C:/Users/FRED/AppData/Local/Claude-Data/claude_pzs8sxrjxfjjc/side-session-notes/local_a701a38e-b492-4973-a529-0e88c031ea9d/journaux/`.
  Le rendu de g écrira le sien dans le `S` de `rendre.sh` : le copier au même endroit.
- Outils (même dossier de notes) : `rendre.sh`, `controle.py`, `bravo.py` (marge de « Bravo ! » en px). Changer `S` en tête de chacun.
- Rien n'est encore fait pour : miniatures, R2, manifeste, `generer-videos-r2.mjs`.
- Les WAV `public/sons/cp-pas-a-pas-lettre-*` et les dossiers `manim/scripts/cp/media-pap-*` ne sont PAS dans git : ne pas les committer.
- Liste des voix à relire pour Frédéric (morceaux + Q3) : `voix-lettres-a-relire.md` dans le même dossier de notes.

👉 Suite : re-rendre g et u → miniatures → R2 lettre par lettre → manifeste (journaux ci-dessus) →
`node scripts/generer-videos-r2.mjs` → commit PAR CHEMIN (nos lignes seulement) → donner à Frédéric la liste des voix et
lui demander la description en courbures de b j v w x z.

