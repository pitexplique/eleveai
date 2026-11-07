# Reprise — série NOMBRES DÉCIMAUX 6e (état au 07/11/2026)

Notions `decimal_nombre` (6 micros) et `decimal_calcul` (6 micros jouées en 6e) : 12 paysages Manim + 12 shorts en dessin animé Ti Margo 3D, sur le modèle de la série Triangles (`manim/REPRISE-triangles.md`).

## Déroulé décidé
1. Voix des 24 vidéos, validées par Frédéric.
2. UN short et UNE paysage pilotes (épisode 01), contrôlés et montrés. Validation du format.
3. Le reste sans redemander : rendu, contrôle, défauts mineurs, miniatures (« Film d'animation 3D » sur les shorts), manifeste, fiches YouTube, R2, bilans, `COUPE_PAR_VIDEO`, coach après le push.

## État
- Coach vérifié avant les vidéos : `9850db39`, non poussé. Squelettes ≥ 234 par micro, ≤ 3,9 répétitions sur 20 à chaque étoile, avec et sans la réponse, avec `--lettres`. Corrigés : « 1 centimètres », défi ★2 hors notion (disque en 60°), 6 tournures de plus en lire_ecrire ★2, « Compte les virgules ».
- Étape 1 : voix écrites dans `manim/voix/6e-decimal-<slug>[-short].json`, montrées en entier le 07/11, **en attente du oui de Frédéric**. Rien n'est généré ni rendu.
- Les deux paysages « Tout comprendre » (`6e-decimal-nombre`, `6e-decimal-calcul`) et leurs 4 shorts Manim RESTENT : elles sont en ligne (hv_ZFkFVk00, QFQsyW-CXw8), couvrent la notion entière et servent de révision. La nouvelle série est par micro ; ne pas les refaire.
- `decimal_diviser_par_decimal` : masquée en 6e (hors France, `micros-masquees.ts`), travaillée en 5e (`quotient_decimaux`). Pas de vidéo dans ce lot.

## Noms
Slugs dans l'ordre (dossier `manim/sorties/6e/maths/decimaux/NN-<slug>/`) :
01 `lire-ecrire`, 02 `rang`, 03 `comparer`, 04 `arrondir`, 05 `encadrer`, 06 `defi` (notion `decimal_nombre`) ;
07 `additionner`, 08 `multiplier`, 09 `multiplier-decimaux`, 10 `multiplier-par-01`, 11 `diviser-par-entier`, 12 `calcul-defi` (notion `decimal_calcul`).
Micros : `decimal_lire_ecrire`, `decimal_rang`, `decimal_comparer`, `decimal_arrondir`, `decimal_encadrer`, `decimal_defi`, `decimal_additionner`, `decimal_multiplier`, `decimal_multiplier_decimaux` (banque `programme-trous.bank.ts`), `decimal_multiplier_par_01`, `decimal_diviser_par_entier`, `decimal_calcul_defi`.
Préfixe des voix et du manifeste : `6e-decimal-<slug>[-short]`. Série Ti Margo : `films/decimaux.js` + `films/decimaux-<épisode>.js`.

## Décors et centres d'intérêt
| Ép. | Paysage (métier) | Short (gag Ti Margo) | Centres |
|---|---|---|---|
| 01 lire-ecrire | Léna, vétérinaire | dictée : 3,5 au lieu de 3,05 ; commentaire : 4,004 | animaux |
| 02 rang | Malik, chronométreur d'athlétisme | coffre-fort, code 7-6-2 ; commentaire : 4-1-5 | sport, jeux-defis |
| 03 comparer | Sofia, biologiste marine (tortues) | 3 bouteilles de jus ; commentaire : 2,03 < 2,3 < 2,33 | animaux-marins |
| 04 arrondir | Sami, météorologue | gâteau arrondi deux fois ; commentaire : 7 | meteo-climat, cuisine |
| 05 encadrer | Lina, pilote de robot sur Mars | loupe entre 4,7 et 4,8 ; commentaire : 9 | espace |
| 06 defi | Tom, créateur d'escape games | étiquettes 3, 7, 2 ; commentaire : 14,7 | jeux-defis |
| 07 additionner | Romain, boulanger | monnaie de 5 € ; commentaire : 3,60 € | cuisine, argent-budget |
| 08 multiplier | Lucas, jardinier paysagiste | 4 glaces à 60 € ; commentaire : 7,2 € | nature-ecologie |
| 09 multiplier-decimaux | Anaïs, carreleuse | pizza carrée 0,5 × 0,5 ; commentaire : 0,2 | construction, cuisine |
| 10 multiplier-par-01 | Kenzo, maquettiste de cinéma | machine à rétrécir, dinosaure ; commentaire : 0,25 m | cinema-series, dinosaures |
| 11 diviser-par-entier | Yasmine, régisseuse de concerts | 10 € entre 4 copains ; commentaire : 1,75 € | musique, argent-budget |
| 12 calcul-defi | Inès, vendeuse de jeux vidéo | soldes − 25 % ; commentaire : 40,50 € | jeux-video, argent-budget |

6 filles, 6 garçons. 0 sur 24 à La Réunion.
Ceintures : paysages vertes ; shorts 01, 02, 05 blancs (tout se voit) ; les autres jaunes (une règle ou un calcul).

## Choix à garder
- La valeur des chiffres AVANT le raccourci de la virgule (× 10, × 100, × 0,1, ÷ 10, ÷ 100) ; jamais « ajouter un zéro » pour × 10 (le zéro à la fin n'apparaît que pour écrire 0,7 = 0,70).
- À l'écran : « × » et « ÷ » ; la voix dit « fois » et « divisé par ». Les fractions 7/10, 25/10, 34/100, 125/100 ne figurent qu'en lire-ecrire (objet d'étude).
- Les choix de comparaison sont écrits en mots (« 12,13 est plus petit »), pas avec < > seuls : la voix dit les mots.
- Pas de choix A / B / C qui soit lui-même une lettre de point.
- Les shorts commencent par Ti Margo (« Salut ! … Tu paries ? »), il se trompe, l'élève le corrige ; question-pause de 3 s ; question chiffrée en commentaire ; phrase de fin du 05/11.
- Le défi ★2 du coach (4,9 × 2 plus proche de 10) est repris dans la paysage 12 : coach et vidéo disent la même chose.
