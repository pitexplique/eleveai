# Reprise : série PÉRIMÈTRE, AIRE, LONGUEURS de la 6e

Plan cochable : `manim/PLAN-perimetre-aire-volume.md`, section « ## 6E » (Périmètre, Aire, Longueurs et conversions : 21 micros). Banques : `lib/tutor-v4/questionBank/6e/maths/perimetres.bank.ts` (notion `aire_perimetre`), `aires.bank.ts` (notions `aire_unite` et `aire_surface`), `longueurs.bank.ts` (notion `aire_longueur`). Le volume et les solides de la 6e sont faits par une autre session. Rien n'est poussé.

## Règles de la série
- ⛔ Vidéo commune dans la classe la plus basse, branchée par `aussi` (règle en tête du plan). La banque 6e de ces notions est au niveau CM (★1-★2) : 15 micros sur 21 sont déjà couvertes par une vidéo CE2, CM1, CM2 ou 6e.
- Les 6 vidéos 6e montent d'un cran par rapport au CM2 (`manim/REPRISE-cm2-perimetre-aire.md`) : formules écrites avec des lettres (P = 2 × (L + l), P = 4 × c, A = L × l, A = c × c), parenthèses, conversion avant la formule, problèmes à étapes (arrondir au-dessus, prix), effets d'un agrandissement (+1 → +2 au tour, côtés doublés → périmètre × 2 mais aire × 4), même tour ≠ même aire. On ne redit pas le CM2 (côté retrouvé à partir du périmètre, découpage, conversions d'aires).
- Paysage en Manim ; short en DESSIN ANIMÉ Ti Margo (6e < 4e).
- La Réunion : aucune mention sur les 12 voix (cible ≈ 4 % ; la série CM2 en a déjà une).
- Voix validée À DEUX avant tout WAV ou rendu.

## Inventaire des 21 micros (15/11/2026)
| Micro 6e | Couverte par | État |
|---|---|---|
| `aire_perimetre_comprendre` | `cm2-perimetre-comprendre` (+ short) | ✅ `aussi` + coach |
| `aire_perimetre_carre` | 6e P1 `6e-aire-perimetre-rectangle` | `aussi` à poser à la publication de P1 |
| `aire_perimetre_rectangle` | **6e P1** | ⏳ voix écrite |
| `aire_perimetre_figure` | `cm2-perimetre-polygone` (+ short) | ✅ `aussi` + coach |
| `aire_perimetre_probleme` | `cm2-perimetre-defi` (+ short) | ✅ `aussi` + coach |
| `aire_perimetre_defi` | **6e P2** | ⏳ voix écrite |
| `aire_comprendre` | `cm2-aire-comprendre` (+ short) | ✅ `aussi` + coach |
| `aire_compter` | `cm1-aire-unite` (+ short) | ✅ `aussi` + coach |
| `aire_convertir` | `cm2-aire-convertir-unites` (+ short) | ✅ `aussi` + coach |
| `aire_rectangle` | **6e A1** | ⏳ voix écrite |
| `aire_carre` | 6e A1 `6e-aire-rectangle` | `aussi` à poser à la publication de A1 |
| `aire_comparer` | **6e A2** | ⏳ voix écrite |
| `aire_decomposer` | `cm2-aire-composer` (+ short) | ✅ `aussi` + coach |
| `aire_probleme` | **6e A3** | ⏳ voix écrite |
| `aire_defi` | **6e A4** | ⏳ voix écrite |
| `aire_longueur_mesurer` | `ce2-longueur-choisir-unite` (+ short) — la banque 6e fait choisir l'unité | ✅ `aussi` + coach |
| `aire_longueur_unite` | `ce2-longueur-relations` (+ short) | ✅ `aussi` + coach |
| `aire_longueur_convertir` | `6e-aire-longueur-convertir-diagonale` (déjà en ligne) | ✅ déjà au coach |
| `aire_longueur_comparer` | `cm1-longueur-comparer` (+ short) | ✅ `aussi` + coach |
| `aire_longueur_probleme` | `ce2-longueur-probleme` (+ short) | ✅ `aussi` + coach |
| `aire_longueur_defi` | `cm1-longueur-defi` (paysage ; le short 6e « Diagonale » garde la case short) | ✅ `aussi` + coach |

- `aussi` posés dans le manifeste (commit `0fca526c`, 24 entrées : 12 paysages + leurs shorts), coach branché en production (`node scripts/brancher-videos-coach.mjs --classe 6e --ecrire` : 23 vidéos).
- Quand la série Longueurs CM2 (autre session) sera finie, on pourra rebrancher `aire_longueur_comparer` / `aire_longueur_defi` sur les vidéos CM2, plus proches de la 6e (à décider avec Frédéric).

## Les 12 voix (`manim/voix/`) — ⏳ ÉCRITES le 15/11, À VALIDER par Frédéric
| Ép. | Micro (+ aussi) | Fichiers | Métier (matrice, marqué `V`) | Questions paysage | Short (réponse) | Ceinture | Centres proposés |
|---|---|---|---|---|---|---|---|
| P1 | `aire_perimetre_rectangle` (+ `aire_perimetre_carre`) | `6e-aire-perimetre-rectangle(-short)` | Lucas, paysagiste (jardin 15 × 9 → 48 m ; potager carré 6,5 → 26 m ; massif 12 m × 80 cm → 25,6 m ; piège des parenthèses ; défi 18 m × 950 cm − portail 3 m = 52 m) | B, A | guirlande fenêtre carrée 1,2 m → 4,8 m : A | verte | nature-ecologie, construction |
| P2 | `aire_perimetre_defi` | `6e-aire-perimetre-defi(-short)` | Chloé, fleuriste (boîte 7 × 3, +1 cm → +2 cm, côtés doublés → × 2, même tour 9 × 1 / 6 × 4 / carré 5 ; défi ruban 24 cm, L = 2 l → 8 × 4) | B, A | ruban de 20 cm : boîte 7 × 3 : C | bleue | art-design, mode |
| A1 | `aire_rectangle` (+ `aire_carre`) | `6e-aire-rectangle(-short)` | Amina, jardinière (pelouse 12 × 8 = 96 ; carré 7 → 49 ; bordure 3 m × 50 cm = 1,5 m² ; piège 7 × 4 ; défi 54 m² → 3 sacs de 25) | A, C | tapis carré 3 m : 9 m², pas 12 : B | verte | nature-ecologie, sciences |
| A2 | `aire_comparer` | `6e-aire-comparer(-short)` | Léna, agente immobilière (salons 24 / 25 ; 8 × 3 = 6 × 4 ; 2 m² = 200 dm² > 150 dm² ; piège grand tour ≠ grande aire ; défi 29 / 28 m²) | B, C | parts de gâteau 60 / 49 / 48 : A | verte | argent-budget, construction |
| A3 | `aire_probleme` | `6e-aire-probleme(-short)` | Yanis, maçon (mur 6 × 2,5 = 15 m² → 4 pots → 48 € ; piège dalles de 50 cm : 4 par m² ; défi 2 murs 5 × 2,4 → 5 pots → 75 €) | B, C | mur 12 m², pots de 5 m² : 3 pots : C | verte | construction, argent-budget |
| A4 | `aire_defi` | `6e-aire-defi(-short)` | Théo, technicien en énergies renouvelables (toit 4 × 3 : longueur doublée → × 2, tout doublé → × 4 ; carré de 36 → 6 ; 24 ÷ 4 = 6 ; défi panneaux 2 × 1 sur carré 4 → 8, côté doublé → 32) | C, B | pizza de 40 cm = 4 pizzas de 20 : A | bleue | technologie-ia, sciences |

- Places des bonnes réponses tirées au hasard (graine 1511) : 6 A, 6 B, 6 C sur les 18 questions ; jamais deux fois la même lettre dans une paysage ; leurres = erreurs typiques (oubli de doubler, L × l pour le périmètre, c × c pour le tour, 4 × c pour l'aire, périmètre pris pour l'aire, arrondi en dessous, aire × 2 au lieu de × 4, ÷ 4 pour le côté d'un carré d'aire connue).
- Métiers : `npx tsx scripts/metiers-pour-video.ts 6e aire_perimetre|aire_surface|aire_unite` ; aucun n'était `V` ; les 6 pris sont marqués `V` dans `lib/matrice/metiers-college.ts` (3 filles, 3 garçons). A2 prend l'agente immobilière de `aire_unite` (seule notion de la matrice qui compare des m²).
- Clés : paysage `00-garde, 01-situation, 02-…, 03-…, 04-…, 05-question, 05b-reponse, 06-piege, 07-question, 07b-reponse, 08-defi, 08b-correction, 09-finale, 10-abonne` ; short `00-accroche, 01-…, 02-question, 02b-reponse, 03-ouf, 04-commentaire, 05-abonne` (comme le CM2).
- Shorts : ceinture blanche, 1 question-pause (3 s), question chiffrée en commentaire, fin courte.

## Prochaine étape (après la validation de Frédéric)
1. Voix figées. UNE session de production par lot (lot Périmètre P1-P2, lot Aire A1-A4), qui se partagent le verrou HD `%TEMP%\eleveai-rendu-hd.lock` : jamais plus d'un rendu HD à la fois sur le poste, rien sous 2,5 Go libres.
2. WAV (Julie, débit −6) dans `public/sons/6e-aire-<ep>[-short]/` ; marques sur le modèle `manim/scripts/cm2/aire_marques_cm2.py` / `perimetre_marques.py` (⛔ jamais sans argument).
3. Scripts `manim/scripts/6e/aire_perimetre_<ep>.py`, `aire_<ep>.py` sur le modèle CM2 (`manim/scripts/cm2/perimetre_cm2_commun.py`, `aire_cm2_commun.py`, `LigneAlignee`) ; personnages : lucas, chloe, amina, lena, yanis, theo. Chaîne : dry run AUDIT=1 BORDS=1 (0 AUDIT-AVANCE, 0 RETARD) → aperçu -ql + planche relue → UN HD sous verrou → `python scripts/verifier-bords-video.py <mp4>` = 0.
4. Shorts Ti Margo (séries `prototypes/ti-margo/films/6e-perimetre.json`, `6e-aire.json` sur le modèle `cm2-perimetre*` / `cm2-aire*`), miniature « Dessin animé ».
5. Manifeste (dates libres APRÈS tout le manifeste existant, en particulier après CM2 aire 22/03/2027 et les séries CM2 contenance / solides / longueurs et 6e volume en cours : relire le manifeste), avec `aussi` sur `aire_perimetre_carre` (P1) et `aire_carre` (A1) ; `python scripts/fiches-youtube.py <id>` ; R2 du seul dossier `6e/maths/...` ; `node scripts/generer-videos-r2.mjs` (ne garder que nos clés) ; coach `node scripts/brancher-videos-coach.mjs --id <id>,<id>-short --ecrire`.
6. Cocher le plan, commit PAR CHEMIN (manifeste, `videos-r2.json`, `bilans-videos.json` : nos seules clés via `git hash-object -w` + `git update-index --cacheinfo`), jamais de push.
