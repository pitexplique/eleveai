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
