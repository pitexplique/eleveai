# Reprise : série PÉRIMÈTRE + AIRE du CM2

Plan cochable : `manim/PLAN-perimetre-aire-volume.md`, section « ## CM2 ». Banques : `lib/tutor-v4/questionBank/cm2/maths/perimetres.bank.ts`, `aires.bank.ts`, `aires-unites.bank.ts`. Rien n'est poussé (c'est le chef d'orchestre qui pousse).

## Règles de la série
- Un CRAN AU-DESSUS du CM1 (déjà fait : `manim/REPRISE-pav-cm1.md`) : nombres à virgule, conversions avant de calculer, cm² / dm² / m² (et km²), conversions d'aires (× 100), triangle rectangle = moitié d'un rectangle, côté retrouvé à partir du périmètre ou de l'aire, découpage ET retrait. On ne redit pas le CM1.
- CM2 a sa propre vidéo `perimetre_comprendre` (le CM1 renvoyait au CE2) : elle travaille tour / surface, unités, même tour pour deux formes.
- Paysage en Manim, short en DESSIN ANIMÉ Ti Margo (CM2 < 4e).
- Voix validée À DEUX avant tout rendu. ⛔ Le 14/11, aucun WAV ni rendu : deux sessions Longueurs occupent le rendu HD du seul PC.
- La Réunion : une seule mention sur 24 voix (aire_unites : « La Réunion fait environ 2 500 kilomètres carrés »).

## Les 24 voix (`manim/voix/`) — ⏳ EN ATTENTE DU OUI de Frédéric
| Ép. | Micro | Fichiers | Métier / décor | Questions paysage | Short (réponse) | Ceinture | Centres proposés |
|---|---|---|---|---|---|---|---|
| P1 | `perimetre_comprendre` | `cm2-perimetre-comprendre(-short)` | Noah, régisseur de concerts (scène 8 × 5, ruban 26 m ; carré 6,5 m, même tour) | B, C | 20 allumettes, enclos long / carré : A | jaune | musique, cinema-series |
| P2 | `perimetre_triangle` | `cm2-perimetre-triangle(-short)` | Maëlle, voilière (4 + 3,5 + 2,5 = 10 m ; équilatéral 1,5 × 3 ; convertir 80 cm / 1 m) | B, A | cerf-volant 60 + 60 + 1 m = 220 cm : C | verte | bateaux, sport |
| P3 | `perimetre_quadrilatere` | `cm2-perimetre-quadrilatere(-short)` | Rayan, jardinier de stade (100 × 64 → 328 m ; carré 12,5 × 4) | A, B | 2 tours de basket 28 × 15 = 172 m : A | verte | football, handball-volley |
| P4 | `perimetre_polygone` | `cm2-perimetre-polygone(-short)` | Inaya, créatrice de bijoux (hexagone 1,2 × 6 = 7,2 cm ; 5 côtés à virgule = 10 ; L sur quadrillage = 12) | B, A | train de 4 biscuits : 100 cm, pas 160 : A | verte | art-design, mode |
| P5 | `perimetre_defi` | `cm2-perimetre-defi(-short)` | Malo, technicien en robotique (fil de robot tondeuse 61 m → 2 rouleaux ; largeur = moitié du tour − longueur ; carré 34 ÷ 4) | B, A | grillage 36 m, enclos carré : 9 m : C | bleue | technologie-ia, nature-ecologie |
| A1 | `aire_comprendre` | `cm2-aire-comprendre(-short)` | Elsa, couturière de patchwork (3 × 4 et 2 × 6 = 12 ; demi-carrés ; tours 14 et 16) | A, C | serviettes de plage 3 × 4 / 2 × 6 : C | jaune | art-design, mode |
| A2 | `aire_unites` | `cm2-aire-unites(-short)` | Tom, imprimeur (timbre 6 cm², affiche 20 dm², bâche 12 m², La Réunion ≈ 2 500 km²) | C, A | tapis de 4 cm² livré au lieu de 4 m² : B | verte | art-design, photo |
| A3 | `aire_convertir_unites` | `cm2-aire-convertir-unites(-short)` | Kenzo, vitrier (3 dm² = 300 cm² ; 1 m² = 100 dm² = 10 000 cm²) | C, B | album d'autocollants 1 dm² = 100 cm² : C | bleue | construction, sciences |
| A4 | `aire_carre_rectangle` | `cm2-aire-carre-rectangle(-short)` | Yasmine, installatrice de panneaux solaires (toit 8 × 5 ; panneau 2 × 1,5 = 3 m² ; carré 6 × 6 ; 50 cm = 0,5 m) | C, B | mur 3 × 2,5 = 7,5 m² : B | verte | nature-ecologie, sciences |
| A5 | `aire_triangle_rectangle` | `cm2-aire-triangle-rectangle(-short)` | Baptiste, chef traiteur (sandwich 12 × 8 = 96 → 48 ; tarte 600 → 150) | A, C | toast 10 × 10 coupé en diagonale : 50 : C | verte | cuisine |
| A6 | `aire_composer` | `cm2-aire-composer(-short)` | Nadia, soigneuse animalière (L = 24 + 12 ; flamants 60 − 8 ; défi rectangle + triangle = 30) | B, A | gazon 30 − bac à sable 4 = 26 : B | verte | animaux, nature-ecologie |
| A7 | `aire_defi` | `cm2-aire-defi(-short)` | Romane, conceptrice de skateparks (48 ÷ 6 = 8 ; carré de 25 → 5 ; 9 × 4 et 6 × 6 même aire, tours 26 / 24 ; 44 m² → 5 pots) | A, B | 24 dalles sur 4 m : 6 m : C | bleue | sport, construction |

- Places des bonnes réponses tirées au hasard (graine 1114) : 12 A, 12 B, 12 C ; jamais deux fois la même lettre de suite dans une paysage ; leurres = erreurs typiques (oubli de doubler, L × l pour le périmètre, 5,10 au lieu de 6, ÷ 4 pour le côté d'un carré d'aire connue, × 10 au lieu de × 100, oubli du ÷ 2…).
- Shorts : ceinture blanche, 1 question-pause, question chiffrée en commentaire, fin « éleveai point f r » courte.
- Métiers : la matrice (`npx tsx scripts/metiers-pour-video.ts cm2 perimetre|aire`) ne propose que 3 métiers (éleveuse, carreleur, jardinière), déjà pris au CM1 : métiers choisis hors matrice, 6 filles / 6 garçons, aucun repris du CM1 ou du CE2. Pas de lignes CM2 dans `metiers-college.ts` : rien à marquer.
- Clés : paysage `00-garde … 10-abonne` (comme le CM1) ; short `00-accroche, 01-…, 02-question, 02b-reponse, 03-ouf, 04-commentaire, 05-abonne` (seule la clé 01 change de nom selon l'épisode).

## Prochaine étape (après le oui de Frédéric, et quand le rendu HD est libre)
1. Corriger les voix selon ses retours (fichiers `manim/voix/cm2-*.json`).
2. WAV (Julie, débit −6) dans `public/sons/cm2-<notion>-<ep>[-short]/` ; marques : adapter `manim/scripts/cm1/aire_marques.py` (ou une copie `manim/scripts/cm2/`) aux noms `cm2-…` ; ⚠️ jamais sans argument.
3. Scripts `manim/scripts/cm2/perimetre_<ep>.py` et `aire_<ep>.py` sur le modèle CM1 (`perimetre_cm1_commun.py`, `aire_cm1_commun.py`, mixin `PhraseAGauche`) ; personnages à ajouter : noah, maelle, rayan, inaya, malo, elsa, tom, kenzo, yasmine, baptiste, nadia, romane. Puis la chaîne habituelle : dry run AUDIT=1 BORDS=1 → planche -ql → UN HD sous verrou `%TEMP%\eleveai-rendu-hd.lock` (≥ 2,5 Go libres) → `verifier-bords-video.py` = 0 → short Ti Margo (séries `films/cm2-perimetre.json`, `cm2-aire.json`) → miniatures « Dessin animé » → manifeste (dates libres après la série Longueurs) → fiche YouTube, R2, coach.
4. Commit PAR CHEMIN, jamais de push.
