# Fabriquer UNE paysage de la série Relatifs 4e

Frédéric est prof de maths (6e, 4e), il montre ces vidéos à ses élèves : la qualité passe avant tout. Le format a été validé sur le pilote de l'épisode 03 : on ne redemande rien, on le reproduit. Tout en français.

## Déjà prêt
- Voix générées : `public/sons/4e-relatif-<slug>/`. Texte : `manim/voix/4e-relatif-<slug>.json`.
- Marques : `manim/scripts/4e/relatif_<slug>_marques.json`.
- Les calculs des voix ont été vérifiés.

## À lire d'abord
- `manim/scripts/4e/relatif_multiplication.py` (LE modèle), `manim/scripts/4e/relatif_commun.py` (outils : `PaysageRel`, `F`, `signe`, `TableSignes`, `Glacier`, `Frise`, `Droite`, `page_abonnement`).
- `manim/scripts/4e/equation_commun.py` au besoin (`dit`, `dire_eq`, `au`, `lg`, `question_pause`, `finale_colonne`…).
- Section « FORMAT VALIDÉ » de `manim/REPRISE-relatifs.md`.

## À écrire
`manim/scripts/4e/relatif_<slug>.py`, classe `Relatif<Slug>4e`, sans toucher aux autres fichiers. Une figure propre à l'épisode qui resservira ailleurs reste dans ton script : `relatif_commun.py` est partagé, ne le modifie pas.
- Une méthode par clip de la voix, chacun dans l'ordre du JSON, avec `nom_voix`, `fichier_marques`, `ceinture` de ton épisode.
- Page de garde avec une figure du métier et du contexte ; le personnage du métier dessiné (`personne(...)` avec un accessoire), comme `lea()`.
- Chaque nombre dit est écrit à l'écran, au moment où il est dit, jamais avant (AUDIT). Le texte écrit est ce que dit la voix.
- Le visuel sert le calcul : droite graduée, thermomètre, frise, baguettes… Une image concrète qui bouge en même temps que le calcul. Négatif orange, positif bleu ciel, juste vert, piège rouge.
- « Ce que tu as appris » : `finale_colonne` comme le modèle, titre en haut et centré. Fin : `page_abonnement`.
- Question-pause : `question_pause` comme le modèle, avec les choix du JSON et la bonne réponse.

Défauts à éviter d'emblée :
- formule dans une carte de largeur 6 : font 42 à 46, pas 50-56 ;
- formule encadrée à droite de l'écran : limite x ≈ 6,68, cadre et zoom compris ;
- mot devant une formule (« Alors, ») : décaler `mis_sur_egal` pour lui laisser sa place ;
- texte à côté de flèches « +5 » : colonne à x ≥ 3,65 ;
- droite graduée : toute la largeur disponible (x de −5 à 5, fs 34) ;
- `TableSignes` et autres groupes : un objet créé mais pas encore dans le groupe ne suit pas `move_to`.
- Une colonne de texte à droite de 6,2 de large au plus : vérifier que rien ne déborde ni ne chevauche, y compris au zoom d'`insister`.

Défauts trouvés sur la paysage 01 (`manim/scripts/4e/relatif_addition.py`, deuxième modèle à regarder), à éviter aussi :
- graduations serrées qui se touchent (« −10−9 ») : moins de graduations, ou une graduation écrite sur deux ;
- objet qui reste en l'air ou étiquette qui flotte après son animation ;
- figure du métier qui cache un texte, personnage qui cache une étiquette ;
- deux lignes de texte l'une sur l'autre : poser les phrases d'un même écran en colonne, avec des y réservés, et une seule taille par écran ;
- réponse de question-pause trop petite : resserrer les cartes et agrandir la colonne, sans toucher Ti Margo ;
- barre de rature qui traverse le signe moins : ne barrer que le résultat ;
- jetons `signe` qui touchent le texte voisin.

## Chaîne (depuis la racine du dépôt, Bash)
1. Audit : `AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/relatif_<slug>.py Relatif<Slug>4e 2>&1 | tr '\r' '\n' | grep -E "AUDIT-AVANCE|RETARD|BORD|Error|Traceback"`. Il faut 0 AUDIT-AVANCE, 0 RETARD, 0 BORD, à corriger jusqu'à ce que ce soit vide.
2. Brouillon `-ql --media_dir manim/scripts/4e/media-rel-NN`, puis planche (`ffmpeg … -vf "fps=1/8,scale=480:-1,tile=5x…"`, écrite dans le scratchpad) et REGARDE-la avec Read. Cherche : chevauchements, texte coupé, formule collée, figure fausse, écran vide. Zoome avec une image précise au moindre doute. Corrige tout défaut mineur, même léger : Frédéric ne veut jamais de « laissé tel quel ».
3. UN SEUL rendu final, en arrière-plan : `python -m manim render -qh --disable_caching manim/scripts/4e/relatif_<slug>.py Relatif<Slug>4e -o eleveai-maths-4e-relatif-<slug> --media_dir manim/scripts/4e/media-rel-NN`.
4. Copie vers `manim/sorties/4e/maths/relatifs/NN-<slug>/eleveai-maths-4e-relatif-<slug>.mp4` puis `python scripts/verifier-bords-video.py <mp4>` (doit donner 0), et planche finale regardée. Contrôle aussi durée vidéo = durée son (`ffprobe`).
5. Supprime `manim/scripts/4e/media-rel-NN/` (jamais dans git).
6. `git add` puis `git commit` **PAR CHEMIN, ton seul script** (`git commit -m "…" -- manim/scripts/4e/relatif_<slug>.py`), message terminé par la ligne `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`. D'autres sessions travaillent dans le dossier : jamais de stash, reset, checkout, jamais de `git add -A`.

## Interdits
Ne jamais lancer la lecture d'une vidéo. Ne pas pousser. Rien sur YouTube, ni manifeste, ni R2, ni coach : c'est la session qui t'a lancé qui s'en charge. Ne change pas une voix sauf erreur manifeste, et alors régénère voix et marques et signale-le. Les fichiers sont plus sûrs lus en UTF-8 : ne les recopie pas par PowerShell.

## Rapport (court, en français)
Fichier mp4, durée, résultat de l'audit et des bords, ce que tu as corrigé en regardant les planches, le hash du commit, tout doute restant sur une image précise (avec l'instant) ou sur la voix.
