# Reprise — série TRIANGLES 6e (état au 07/11/2026)

Notions `triangle_figure` (5 micros) et `triangle_propriete` (4 micros) : 9 paysages Manim + 9 shorts en dessin animé Ti Margo 3D.

## Déroulé décidé
1. Voix des 18 vidéos, validées par Frédéric.
2. UN short et UNE paysage pilotes, contrôlés et montrés ; temps de rendu d'un short mesuré. Validation du format.
3. Le reste sans redemander : rendu, contrôle, défauts mineurs, miniatures (« Film d'animation 3D » sur les shorts), manifeste, R2, coach.

## État
- Coach réparé avant les vidéos, à la demande de Frédéric : `8bd7ce8d`, non poussé.
- Étape 1 : voix écrites dans `manim/voix/6e-triangle-<slug>[-short].json`, montrées en entier le 07/11, **en attente du oui de Frédéric**. Rien n'est généré ni rendu.
- Bascule de session : `manim/prompt-session-triangles-6e.md`.
- 07/11 : voix VALIDÉES par Frédéric (« Oui, avec la retouche » : ép. 03, « Aucun codage : on ne peut rien dire, il faut mesurer. »). Les 18 WAV sont générés. Pendant le pilote : point D remplacé par S dans le short 01 (« M, E, R et D » devant des 6e), à lui signaler.
- Étape 2 : pilotes de l'épisode 01 (`films/triangles.js`, `manim/scripts/6e/triangle_nommer.py`, `manim/canvas_triangles.py`, marques par `triangle_marques.py`). Rendu d'un short de 73 s : 2 min 20 à 2 min 45 (ordinateur partagé) ; une paysage de 2 min 48 : 4 min 50. Les deux sont finis et contrôlés dans `manim/sorties/6e/maths/triangles/01-nommer/`, aperçu `manim/sorties/apercu-triangles.html` (port 3900). **En attente de sa validation du format : ne pas lancer les 8 autres avant.**
- 07/11 : FORMAT VALIDÉ (« Oui, enchaîne »). Étape 3 lancée : shorts dans `prototypes/ti-margo/films/triangles-<épisode>.js`, paysages dans `manim/scripts/6e/triangle_<slug>.py`, sorties dans `manim/sorties/6e/maths/triangles/NN-<slug>/`. Restera : manifeste, fiches YouTube, vignettes, R2, coach, bilans, `COUPE_PAR_VIDEO`, commits par chemin, rapport.
- 07/11, fin de la session 1 : les 18 vidéos sont rendues dans `manim/sorties/6e/maths/triangles/NN-<slug>/`, avec leurs miniatures. Les 18 entrées sont au manifeste (`6e-triangle-<slug>[-short]`, `pas_avant` 2026-12-01 pour que le lot quotidien ne les publie pas sans son ordre ; chapitres de moins de 10 s déjà fondus ; titres ≤ 100). Toutes les planches ont été relues par la session.
- Corrigés le 07/11 après relecture : tampon « Pas un vrai triangle. » (08), choix courts « oui, en très grand », « oui, 6 + 8 > 10 » (08), « oui, total : 180 », « non, 95 + 95 > 180 » (09), « 8 cm » écarté du codage et tampon agrandi (03), « oui, bien tourné » (05), pop de « 2 solutions » (short 07), fil de la lanterne (short 05), marques de la paysage 07. Re-rendus : paysages 03, 07, 08, 09 ; shorts 05, 07.
- 07/11, passe finale : paysage 05 re-rendue ; 03 (« Mets pause » décollé) et 09 (coche, légendes alignées) re-rendues ; corrections relues aux images ; short 04 : bords = décor seulement, son normal. Coupes dans `COUPE_PAR_VIDEO` : paysages 8,4 s, shorts 4,2 s (repère « Mets » à 4,19 s de la fin, `films/triangles-cues.js`). Aperçu à 18. Sur R2 : 63 fichiers du seul dossier, par `-Rclone`, 0 différence. Table R2 et bilans régénérés, committés sans push.
- ⏳ RESTE : (1) son écoute. (2) Push, le soir, sur son ordre. (3) APRÈS le push seulement (en production, `/video/6e-triangle-nommer` répond 404 avant) : `node scripts/brancher-videos-coach.mjs --classe 6e --notion triangle_figure --ecrire` puis `--notion triangle_propriete`. (4) YouTube sur son ordre, `pas_avant` du 01/12 à confirmer.
- Rapport final, à signaler : fiche « triangle aigu » contre coach et voix « acutangle » ; figures du coach contrôlées par calcul, pas à l'écran ; D remplacé par S (short 01) ; `>` à l'écran quand la voix dit « dépasse » (08, 09) ; écrans plus courts que la voix (notes `rapport-*` recopiées dans `manim/rapports-triangles.md`) ; rien écouté, rien lu en continu ; 0 sur 18 à La Réunion ; aucune date YouTube fixée, `pas_avant` provisoire du 01/12 à confirmer.
- À faire au branchement : ajouter chaque vidéo à `COUPE_PAR_VIDEO` (`components/LecteurVideo.tsx`), fin du 05/11 ; paysages avec `FinTriangles` (`canvas_triangles.py`) ; lignes de `dit()` et `mot()` dans `films/triangles.js` : voir l'épisode nommer.

## Noms
Slugs dans l'ordre : `nommer`, `sommet-cote`, `type-cote`, `type-angle`, `defi` (notion `triangle_figure`) ; `somme-angle`, `angle-manquant`, `possible-ou-non`, `propriete-defi` (notion `triangle_propriete`).

## Décors et centres d'intérêt
| Ép. | Paysage (métier) | Short (défi Ti Margo) | Centres |
|---|---|---|---|
| 01 nommer | Nora, infographiste 3D | triangle MER, 6 noms ; commentaire : 4 points → 4 triangles | jeux-video, art-design |
| 02 sommet-cote | Karim, astronome, triangle d'été | compter les triangles ; commentaire : 3 traits → 10 | espace |
| 03 type-cote | Awa, styliste | 9 bâtonnets ; commentaire : 12 bâtonnets → 3 (4-4-4, 5-5-2, 5-4-3) | art-design |
| 04 type-angle | Théo, constructeur de rampes de skate | l'horloge ; commentaire : angle en 5 du triangle 12-5-6 → 90° | sport |
| 05 defi | Samira, pâtissière | tangram ; commentaire : petits angles du grand triangle → 45° | cuisine, jeux-defis |
| 06 somme-angle | Lucie, guide de musée, Pascal | tour de magie ; commentaire : 4 coins → 360° | sciences, histoire-geographie |
| 07 angle-manquant | Maëlle, charpentière | coin mangé ; commentaire : isocèle 40° → 40-100 ou 70-70 | art-design, jeux-defis |
| 08 possible-ou-non | Zoé, fabricante de vélos | planches du toit ; commentaire : 3 et 7 → 5 longueurs (5 à 9) | transports, sport |
| 09 propriete-defi | Sarah, journaliste vérificatrice | qui ment ? ; commentaire : plus grand angle 60° → 60 et 60 | reseaux-sociaux, jeux-defis |

Ceintures : paysages vertes ; shorts 01-04 blancs (tout se voit) ; shorts 05-09 jaunes (une règle ou un calcul).

## Choix à garder
- Vocabulaire des angles : celui du coach (« obtusangle », « acutangle »). La fiche dit « triangle aigu » : à signaler, ne pas la modifier ici.
- Dans les questions-pauses, jamais de triangle nommé A, B, C : on confondrait avec les choix A / B / C.
- Pas de contexte réunionnais dans ce lot (0 sur 18).
- Le triangle 3-4-5 est évité : la banque le déclare « quelconque discutable ».
- Les shorts commencent par Ti Margo, finissent par la question en commentaire puis la phrase de fin du 05/11.

## Miniatures et accroches des shorts (consigne de la session mère, 07/11)
« Le défi du mur » (`manim/sorties/ti-margo/defi-mur/`) a la plus forte progression de la chaîne. Recette à reprendre : Ti Margo en dessin plein cadre, un pari en gros (« TU PARIES ? »), la ceinture, pas de fond quadrillé, mention « Film d'animation 3D ». Les accroches des 9 voix posent un pari. Décors différents d'un short à l'autre : plage (MER), tableau noir (compter), atelier (bâtonnets), salon (horloge), maison de thé ou table (tangram), scène de magie, cuisine (coin mangé), chantier de cabane, cour avec les copains.

## Consignes de la session « Animations Ti Margo par âge » (07/11)
Même Ti Margo et même style que le film du mur. Rôle : le complice un peu maladroit, il se trompe et l'élève le corrige. Le gag porte sur les maths. Image et objet maths synchrones. Chaque nombre dit est écrit. Question en commentaire chiffrée. Attention aux doigts : pouce sur le côté, jamais au milieu du poing. Plusieurs shorts : construire décors, gestes et objets réutilisables dans les fichiers préfixés `triangles`. Noter la réaction des 6e si Frédéric la donne.

## Socle commun Ti Margo (07/11)
La session « Animations Ti Margo par âge » crée `prototypes/ti-margo/`. Ne pas copier `ti-margo-3d.html` : attendre son mode d'emploi avant de créer `prototypes/ti-margo-triangles.html`. Aucune page de film triangles n'existe à cette date.

Socle prêt (`a7e85d3c`) : lire `prototypes/ti-margo/LISEZ-MOI.md`. Copier `films/_modele.js` et `films/_modele.json` vers `films/triangles.js` et `.json` ; `python scripts/ti-margo-cues.py triangles <épisode>` ; `CONTROLE=<dossier> node scripts/ti-margo-short.mjs triangles <épisode> controle 1 12 30` ; `node scripts/ti-margo-short.mjs triangles <épisode> film`. Le film définit `window.tiMargoMiniature`, avec la mention « Film d'animation 3D ». Geste utile à d'autres séries : petite retouche dans `personnage.js` ou `short.js`, sans changer le rendu des autres films.
