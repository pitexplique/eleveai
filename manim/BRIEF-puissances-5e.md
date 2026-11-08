# Fabriquer UN épisode (paysage + short) de la série Carré et cube 5e

Frédéric est prof de maths (6e, 4e) ; il montre ces vidéos à ses élèves : la qualité passe avant tout, la durée n'est pas un critère. Il a donné carte blanche : on ne lui redemande rien. Tout en français, dans le code comme dans le rapport.

Notion du coach de 5e `puissance_simple` (`lib/tutor-v4/questionBank/5e/maths/puissance-simple.bank.ts`), programme de cycle 4 en vigueur en 5e depuis 2026 : carré et cube seulement. ⛔ Aucun exposant au-delà de 3, aucun exposant négatif, aucune règle sur les produits de puissances (c'est la 4e). Niveau ★1-★2 : simple, un geste à la fois.

## Les épisodes

| NN | slug | micro | ceinture paysage | ceinture short | centres | métier (paysage) | short (décor, différent des autres) |
|---|---|---|---|---|---|---|---|
| 01 | notation | puissance_simple_notation | blanche | blanche | jeux-video, jeux-defis | Lucas, créateur de jeux vidéo | La salle de jeux : les dés empilés en cube |
| 02 | valeurs | puissance_simple_valeurs | blanche | blanche | cuisine | Karim, chef pâtissier | La cour : les dalles en carré qui grandissent, bordure par bordure |
| 03 | ecrire | puissance_simple_ecrire | jaune | jaune | musique, art-design | Sarah, éclairagiste | La fête des lanternes, la nuit (64 en carré, puis en cube) |
| 04 | calculer | puissance_simple_calculer | jaune | jaune | animaux, nature-ecologie | Inès, soigneuse dans un zoo | Le stand de fête foraine et sa peluche |
| 05 | litteral | puissance_simple_litteral | jaune | jaune | espace, sciences | Clara, ingénieure spatiale | L'atelier : la machine à carrés (x entre, x² + 1 sort) |

Voix (déjà écrites, calculs vérifiés) : `manim/voix/5e-puissance-<slug>.json` et `manim/voix/5e-puissance-<slug>-short.json`. N'y change rien, sauf erreur manifeste ou phrase imprononçable : alors corrige le JSON AVANT de générer, et dis-le dans ton rapport.

## Noms
- Paysage : `manim/scripts/5e/puissance_simple_<slug>.py`, classe `PuissanceSimple<Slug>5e` (ex. `PuissanceSimpleNotation5e`), identité « Maths 5e — EleveAI », marques `manim/scripts/5e/puissance_simple_<slug>_marques.json`. media_dir `manim/scripts/5e/media-ps-NN` (et `media-ps-NN-ql` pour le brouillon, `media-ps-NN-dry` pour le dry run : jamais le dossier `media` partagé).
- Short : `prototypes/ti-margo/films/puissances-5e-<slug>.js` (`FILMS['<slug>']`, série `puissances-5e`, déjà déclarée dans `films/puissances-5e.json` et `films/puissances-5e.js` : ne touche pas à ces deux fichiers).
- Sorties, les deux dans `manim/sorties/5e/maths/puissance-simple/NN-<slug>/` : `eleveai-maths-5e-puissance-<slug>.mp4` et `eleveai-maths-5e-puissance-<slug>-short.mp4` (le JSON de série s'en charge pour le short), la miniature du short et `publication.md` du short.

## À lire d'abord
1. `manim/REGLES.md` en entier (phrase de fin, ceintures, questions-pauses, synchro 0 s, bords, « Ce que tu as appris » en haut et centré, short en dessin animé).
2. Paysage, les modèles :
   - `manim/scripts/4e/div_multiple.py` + `div_commun.py` + `relatif_commun.py` : la série la plus récente (`PaysageRel`, `self.dit`, `self.lg`, `F`/`E`, `dire_eq`, `au`, `insister`, `question_pause`, `finale_colonne`, `page_abonnement` = la fin du 05/11 avec pouce, commentaire, cloche). C'est la base conseillée.
   - `manim/scripts/4e/puissance_comprendre.py` (série Puissances 4e) : comment écrire et faire dire les exposants (`puiss`, `facteurs`), et les dessins déjà faits : `grille_pixels`, `petit_cube`, `cube_empile`. Recopie dans TON script ce qui te sert.
   - Avant d'écrire : vérifie comment l'audit relie « 5 au carré » (dit) à « 5² » (écrit). Si `E`/`F` ne savent pas lire ² et ³, fais comme `puissance_comprendre.py` ou écris l'exposant comme un petit `Text` relevé, marqué sur le mot « carré » / « cube ». L'exposant n'apparaît jamais avant que la voix ait dit « au carré » ou « au cube ».
   - Chaîne et défauts à éviter d'emblée : `manim/BRIEF-relatifs-paysage.md` (même chaîne, en remplaçant les chemins 4e par les tiens).
3. Short, les modèles : `prototypes/ti-margo/LISEZ-MOI.md`, puis `films/puissances-commun.js` (gestes, `chrono`, `lignesPanneau`, `ba`/`ex`/`sup`/`puiss`, `poserMiniature`, `poserPiece`), `films/puissances.js` (`FILMS.comprendre`, la feuille pliée) et `films/puissances-calculer.js`. Section « FORMAT VALIDÉ » de `manim/REPRISE-relatifs.md` (miniature « TU PARIES ? » + ceinture + « Film d'animation 3D », publication.md, bruitages, pièges). Le modèle de `publication.md` : `manim/sorties/4e/maths/divisibilite/01-multiple/publication.md` (garde `Validé : non`).

## Ce qu'on veut voir
- Code couleur de toute la série, paysage et short : BLEU = le nombre (la base), ORANGE = l'exposant, VERT = résultat juste, ROUGE = piège (5 × 2 au lieu de 5 × 5). Pas de LaTeX : `Text`, exposants ² ³ ou petit texte relevé, « × » pour fois, espaces dans 1 000.
- Un dessin par écran, qui BOUGE et porte le calcul : la grille de pixels qui se remplit rangée par rangée, le cube qui s'empile couche par couche, les macarons qui forment des carrés de plus en plus grands (avec la bordure en couleur), les projecteurs rangés en 8 × 8 puis les boîtiers en 4 × 4 × 4, les enclos carrés dessinés à l'échelle, le panneau solaire de côté c puis 3. Le personnage du métier dessiné (`personne(...)` + un accessoire) et son métier écrit.
- Paysage : garde (nom + question + échelle des ceintures, celle du jour en couleur), situation concrète, méthode, 2 questions-pauses (compte à rebours 5 s), piège, défi + correction dessinés, « Ce que tu as appris » (titre en haut et centré), fin `page_abonnement`.
- Short (9:16, Ti Margo complice, un défi et pas un mini-cours) : l'accroche a son PARI ; en haut l'image qui bouge, en bas les maths qui s'écrivent EN MÊME TEMPS ; 1 question-pause (compte à rebours 3 s, barre visible : `div#rebours{display:block}` est déjà dans `puissances-commun.js`) ; question en commentaire ; fin short ; échelle des ceintures entière sous le titre. Décor propre à ton épisode (colonne de droite du tableau), pas un décor d'un autre film.
- Voix = écrit, 0 s d'avance, 0,4 s de retard au plus. Marge de 3 % sur les quatre côtés. Ti Margo (mascotte) sur chaque écran de la paysage.

## Chaîne (Git Bash, depuis la racine du dépôt ; tout ce qui dépasse 2 min part en ARRIÈRE-PLAN)
1. Voix : `powershell -NoProfile -ExecutionPolicy Bypass -File scripts/generer-voix.ps1 -Fichier manim/voix/5e-puissance-<slug>.json -Debit -6`, idem pour `-short` (WAV dans `public/sons/<nom>/`).
2. Paysage : marques (`scripts/marques_dump.ps1 … -Debit -6`, puis `python manim/scripts/4e/equation_commun.py <voix.json> <tmp>.cues.tsv manim/scripts/5e/puissance_simple_<slug>_marques.json` ; les mots répétés « 3 fois 3 fois 3 » doivent chacun avoir leur marque, à vérifier), script, `AUDIT=1 BORDS=1 python -m manim render --dry_run … --media_dir manim/scripts/5e/media-ps-NN-dry` (0 AUDIT-AVANCE, 0 RETARD, 0 BORD), brouillon `-ql` + planche REGARDÉE avec Read, UN rendu `-qh --disable_caching`, copie dans la sortie, `python scripts/verifier-bords-video.py <mp4>` = 0, planche finale regardée, durée vidéo = durée son (`ffprobe`).
3. Short : `python scripts/ti-margo-cues.py puissances-5e <slug>` (le fichier `films/puissances-5e-cues.js` est partagé avec les 4 autres agents : relis-le après coup, ta clé ET celles des autres doivent y être ; s'il en manque une, relance la commande de l'épisode manquant), `CONTROLE=<dossier du scratchpad> node scripts/ti-margo-short.mjs puissances-5e <slug> controle t1 t2 …` et images regardées, `… miniature`, `… film`, planche finale (`python scripts/ti-margo-planche.py`), durées vidéo et son, `publication.md`. Efface `_muet.mp4` à la fin.
4. ⛔ Un seul rendu HD à la fois sur la machine (d'autres sessions rendent aussi) : avant CHAQUE rendu HD (manim `-qh` et `ti-margo-short.mjs … film`), prends le verrou `mkdir "C:/Users/FRED/AppData/Local/Temp/eleveai-rendu-hd.lock"` ; s'il existe, attends en arrière-plan (`until mkdir …; do sleep 30; done`). Libère-le (`rmdir`) dès la fin, même en cas d'échec. Dry runs, brouillons et contrôles n'en ont pas besoin.
5. ⛔ CORRIGE TOUJOURS LES DÉFAUTS MINEURS (texte serré, léger chevauchement, étiquette mal placée, exposant qui touche sa base ou décollé) et re-rends avant ton rapport. Aucun « laissé tel quel ».
6. Supprime tes `media-ps-NN*` une fois le mp4 copié (jamais dans git).
7. Commit PAR CHEMIN de tes seuls fichiers : `git add <fichiers>` puis `git commit -m "…" -- <fichiers>` : ton script, ses `_marques.json`, ton film `puissances-5e-<slug>.js`, `films/puissances-5e-cues.js`, et dans la sortie le seul `publication.md`. Message en français terminé par la ligne `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`. Si `index.lock` existe, attends quelques secondes et recommence. Jamais de stash, reset, checkout, `git add -A`, jamais de push. Ni mp4, ni WAV, ni png.

## Interdits
Ne lance jamais la lecture d'une vidéo. Ne modifie ni `short.js`, ni `personnage.js`, ni `puissances-commun.js`, ni un module commun Manim, ni le fichier d'un autre épisode (surcharge dans ton fichier). Ni manifeste, ni R2, ni coach, ni YouTube, ni `LecteurVideo.tsx` : la session principale s'en charge.

## Rapport
Écris-le dans `C:/Users/FRED/AppData/Local/Claude-Data/claude_pzs8sxrjxfjjc/side-session-notes/local_648c2a45-f9e1-4258-b678-117b00718a34/puissances-5e-NN.md` ET renvoie-le en réponse, court, en français :
- fichiers, durées (paysage, short), hash du commit ;
- audit et bords ;
- pour chaque vidéo, la liste `questions` en JSON (`t` "MM:SS" mesuré sur le rendu = début de l'écran « Question ! », `question`, `choix`, `reponse` 0/1/2, `explication`) ;
- chapitres de la paysage (MM:SS, aucun de moins de 10 s, pas de « Fin ») ;
- coupe de fin : pour la paysage, l'instant (secondes avant la fin du mp4) juste après « point f r » ; pour le short, « Mets » mesuré dans le mp4 + 0,03 s, exprimé en secondes avant la fin (voir la note de `components/LecteurVideo.tsx`, `COUPE_PAR_VIDEO`) ;
- ce que tu as vu et corrigé sur les planches, et ce qui reste à écouter (bruitages, son).
