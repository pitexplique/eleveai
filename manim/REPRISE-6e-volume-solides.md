# Reprise — série VOLUME ET SOLIDES de la 6e (11 micros)

Plan : `manim/PLAN-perimetre-aire-volume.md`, section « ## 6E », blocs « Volume et contenance » (6) et « Solides et espace » (5). Banques : `lib/tutor-v4/questionBank/6e/maths/volumes.bank.ts` (notion `volume_solide`) et `vision-espace.bank.ts` (notion `vision_espace`). Fiches : `lib/fiches/maths-6e-volumes.tsx`, `maths-6e-vision-espace.tsx` (mêmes exemples : 3 × 6 = 18, 8 + 4 = 12, cube de 3 → 27 cm³, pavé 4 × 3 × 2, pyramide 9 + 4 + 1, cube peint 3 × 3 × 3).
Paysage en Manim, short en DESSIN ANIMÉ Ti Margo (6e < 4e). Voix validée À DEUX avant tout rendu. Commit PAR CHEMIN, jamais de push.

## Inventaire (15/11) : ce que couvrent déjà le CE2, le CM1 et le CM2
- En CE2 et CM1, « Volume et contenance » ne traite que des contenances (L, dL, cL) : aucune vidéo sur le cube unité, le cm³ ou le m³.
- Le CM2 (contenance, solides, longueurs) est en production dans une autre session ; il ne fait ni cm³, ni vues, ni perspective, ni cube peint.
- Ce qui sert déjà : `cm1-solides-defi` (Ilan : cubes cachés, étage par étage, pavé 4 × 3 × 2) et `cm1-solides-patron` (Rose : 11 patrons du cube, patrons du pavé, de la pyramide et du cylindre).

| Micro 6e | Couverte par | Décision |
|---|---|---|
| `volume_unite` | rien | vidéo 6e `6e-volume-unite` |
| `volume_compter` | en partie par `cm1-solides-defi` (en cubes, pas en cm³ ni en L × l × h) | vidéo 6e `6e-volume-compter` + `aussi` depuis `cm1-solides-defi` |
| `volume_comparer` | rien | vidéo 6e `6e-volume-comparer` |
| `volume_assemblage` | rien | vidéo 6e `6e-volume-assemblage` |
| `volume_lire` | — | ↪ `6e-volume-unite` par `aussi` (son écran 04 « Lire un volume » : 18 cm³ = 18 cubes de 1 cm³) |
| `volume_defi` | rien | vidéo 6e `6e-volume-defi` |
| `vision_vues` | rien | vidéo 6e `6e-vision-vues` |
| `vision_denombrer` | `cm1-solides-defi` | ↪ `cm1-solides-defi` par `aussi` (+ la pyramide 16 + 9 + 4 + 1 est dans `6e-vision-defi`) |
| `vision_representation` | patrons seulement (`cm1-solides-patron`) | vidéo 6e `6e-vision-representation` (perspective cavalière, main levée) + `aussi` depuis `cm1-solides-patron` |
| `patron_pave_dimensions` | rien (le CM1 montre la forme du patron, pas les mesures des faces) | vidéo 6e `6e-vision-patron-pave` |
| `vision_defi` | rien | vidéo 6e `6e-vision-defi` |

⇒ 9 paysages + 9 shorts à produire ; 2 micros branchées par `aussi` seulement.
⛔ Les `aussi` vont dans `manim/manifeste-youtube.json`, qui a des modifs NON commitées d'autres sessions : ne rien y écrire tant qu'on n'est pas sûr de ne toucher qu'à nos entrées (relire juste avant, upsert de nos clés, vérifier le diff). Format (comme les solides CE2) : `"aussi": [{"classe": "6e", "notionId": "vision_espace", "microId": "vision_denombrer"}]` ajouté aux entrées `cm1-solides-defi(-short)` ; `{"classe": "6e", "notionId": "volume_solide", "microId": "volume_compter"}` aussi sur `cm1-solides-defi` ; `{"classe": "6e", "notionId": "vision_espace", "microId": "vision_representation"}` sur `cm1-solides-patron(-short)` ; `{"classe": "6e", "notionId": "volume_solide", "microId": "volume_lire"}` sur `6e-volume-unite(-short)`.

## Les 18 voix (`manim/voix/6e-volume-*.json`, `6e-vision-*.json`) — ⏳ ÉCRITES le 15/11, EN ATTENTE DE VALIDATION
| Ép. | Micro | Fichiers | Métier (matrice) | Questions paysage | Short (réponse) | Ceinture (proposée) | Centres (proposés) |
|---|---|---|---|---|---|---|---|
| V1 | `volume_unite` (+ `volume_lire`) | `6e-volume-unite(-short)` | Mathis, maître-nageur (piscine 300 m³) | B, A | boîte à trésors de 20 cm³ = 20 cubes : C | jaune | natation, sport ; short jeux-defis |
| V2 | `volume_compter` | `6e-volume-compter(-short)` | Yanis, logisticien (remorque 8 × 4 × 3 = 96) | C, B | bloc de sucres 4 × 2 × 3 = 24 : C | verte | transports ; short cuisine |
| V3 | `volume_comparer` | `6e-volume-comparer(-short)` | Léna, ingénieure de l'eau (cuves ; ⭐ seule mention de La Réunion des 18 voix) | A, C | tour de 10 contre bloc 3 × 2 × 2 : B | jaune | nature-ecologie, sciences ; short construction |
| V4 | `volume_assemblage` | `6e-volume-assemblage(-short)` | Manon, menuisière (maquette d'armoire 24 + 4 − 2 = 26) | A, B | château 18 + 7 = 25 : C | jaune | construction, art-design ; short jeux-defis |
| V5 | `volume_defi` | `6e-volume-defi(-short)` | Clara, pâtissière-chocolatière (manque 7 ; 36 ÷ 12 = 3 couches ; 27 − 24) | B, A | 48 glaçons, bac 6 × 4 : 2 bacs : C | bleue | cuisine ; short cuisine |
| S1 | `vision_vues` | `6e-vision-vues(-short)` | Samuel, architecte (pavé 4 × 3 × 2 : face 8, droite 6, dessus 12 ; escalier) | A, B | drone au-dessus de 2 tours de 5 : 2 carreaux : A | jaune | art-design, construction ; short technologie-ia |
| S2 | `vision_representation` | `6e-vision-representation(-short)` | Lina, animatrice 3D (face avant vraie grandeur, traits en biais, 3 pointillés ; 2 vrais carrés) | A, C | « c'est un carré, ton truc » : traits en biais : C | verte | cinema-series, dessin-manga ; short dessin-manga |
| S3 | `patron_pave_dimensions` | `6e-vision-patron-pave(-short)` | Jeanne, designer d'emballages (céréales 20 × 8 × 30 ; chaussures 30 × 20 × 10) | B, A | couvercle d'une boîte 10 × 6 × 4 : 10 sur 6 : C | verte | art-design ; short art-design |
| S4 | `vision_defi` | `6e-vision-defi(-short)` | Enzo, dessinateur-projeteur, escape game (plan coté 8 ; pyramide 14 et 30 ; cube peint 8 + 12 + 6 + 1 ; défi 4 × 4 × 4 → 8) | A, B | gâteau 3 × 3 × 3 au chocolat : 8 coins : B | bleue | jeux-defis, sciences ; short cuisine |

- Places des bonnes réponses tirées au hasard (graine 1511) : 9 A, 9 B, 9 C ; jamais deux fois la même lettre de suite dans une paysage ; leurres = erreurs typiques (petit 3 compté comme × 3, additionner au lieu de multiplier, une seule couche, juger à la hauteur, colonnes ≠ cubes, cm² au lieu de cm³, côté au lieu du dessus).
- Shorts : ceinture blanche, 1 question-pause (3 s), question chiffrée en commentaire (V1 : 23 ; V2 : 30 ; V3 : le bloc, 16 > 15 ; V4 : 21 ; V5 : 7 ; S1 : 10 ; S2 : 12 ; S3 : 5 sur 3 ; S4 : 12), fin courte « éleveai point f r ».
- Métiers : 6 pris dans `npx tsx scripts/metiers-pour-video.ts 6e volume_solide|vision_espace` (aucun n'était `V`) ; la matrice n'en avait que 6 pour 9 vidéos : 3 liens ajoutés le 15/11 dans `lib/matrice/metiers-college.ts` (`menuisier` F et `patissier` F à `volume_solide`, `designer-emballage` F à `vision_espace`). 5 filles, 4 garçons ; aucun prénom repris du CE2, du CM1 ou du CM2. ⏳ À la production : marquer `V` sur les 9 liens.
- Clés : paysage `00-garde … 10-abonne` (11-abonne pour V1, V4, S4 ; 12-abonne pour S2, qui a un écran patron) ; short `00-accroche, 01-…, 02-question, 02b-reponse, 03-ouf, 04-commentaire, 05-abonne`.

## Prochaine étape (après la validation de Frédéric)
UNE session de production, dans l'ordre V1 → V5 puis S1 → S4 :
1. WAV (Julie, débit −6 : `scripts/generer-voix.ps1 -Fichier … -Debit -6`) dans `public/sons/6e-<ep>[-short]/` ; marques mot à mot (copie de `manim/scripts/cm2/aire_marques_cm2.py` adaptée aux noms `6e-volume-*` / `6e-vision-*` ; ⛔ jamais sans argument).
2. Scripts `manim/scripts/6e/volume_<ep>.py` et `vision_<ep>.py` ; commun à écrire en réutilisant `manim/scripts/ce2/solides_ce2_commun.py` (`Solide` en cavalière, arêtes cachées en pointillés, `cube`, `pave`, `Patron`) ; identité « Maths 6e — EleveAI ». En tête : mapping micro → écrans et ceinture.
3. Chaîne : dry run `AUDIT=1 BORDS=1` (0 AUDIT-AVANCE, 0 RETARD, 0 BORD) → aperçu `-ql` relu image par image → UN SEUL rendu HD à la fois sur le poste, sous le verrou partagé `%TEMP%\eleveai-rendu-hd.lock`, rien sous 2,5 Go de mémoire libre → `python scripts/verifier-bords-video.py <mp4>` = 0. Sorties `manim/sorties/6e/maths/volume/0N-<ep>/` et `manim/sorties/6e/maths/vision-espace/0N-<ep>/`.
4. Shorts Ti Margo : séries `prototypes/ti-margo/films/6e-volume.json` et `6e-vision.json` (moteur 3D à copier de `ce2-solides.js` : `cav`, `polyedre`, `plierPatron`), miniatures « Dessin animé ».
5. Miniatures paysage, manifeste (dates après les séries en cours ; 1 paysage + son short par jour ; `questions`, `centres`, `aussi`), fiches YouTube, R2, `node scripts/generer-videos-r2.mjs` (ne garder que nos clés), coach `node scripts/brancher-videos-coach.mjs --classe 6e --notion volume_solide|vision_espace --ecrire`.
6. Cocher le plan, marquer `V` dans la matrice, commit PAR CHEMIN, jamais de push.
