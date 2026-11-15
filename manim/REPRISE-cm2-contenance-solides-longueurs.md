# Reprise : CM2 contenance, solides, longueurs (14 micros)

Plan : `manim/PLAN-perimetre-aire-volume.md`, section « ## CM2 ». Modèle : `manim/REPRISE-cm2-perimetre-aire.md` (même chaîne, mêmes outils). Rien n'est poussé.

## Règles de la série
- Un cran au-dessus du CM1 : décimaux (2,5 L = 250 cL, 3,45 m < 3,5 m), conversions avant de calculer, tableau des unités (km → mm, L → mL), pyramides et prismes comptés par règle, patrons de cube à construire (11 patrons, faces opposées), défis à étapes (arrondir au-dessus, intervalles et poteaux).
- Paysage Manim + short DESSIN ANIMÉ Ti Margo. Voix validée À DEUX avant tout WAV.
- Métiers neufs (aucun du CE2, du CM1 ni du CM2 déjà fait), 7 filles / 7 garçons. La Réunion : 1 seule mention (Piton des Neiges, longueur_estimer Q2).
- Bonnes réponses : générateur `side-session-notes/local_bfd6aa0c-…/gen_voix_cm2_csl.py` (graine 1115) → 14 A, 14 B, 14 C, jamais deux fois la même lettre dans une paysage.

## Les 28 voix (`manim/voix/`) — écrites le 15/11 ; ⏳ validation par série
| Micro | Fichiers | Métier | Paysage Q | Short (réponse) | Ceinture | Validée |
|---|---|---|---|---|---|---|
| `contenance_comparer` | `cm2-contenance-comparer(-short)` | Paul, glacier | A, C | canette 33 cL / bouteille 0,5 L : B | jaune | ✅ 15/11 (WAV faits) |
| `contenance_convertir` | `cm2-contenance-convertir(-short)` | Lucie, pharmacienne | B, A | limonade 1,5 L = 150 cL : B | verte | ✅ 15/11 (WAV faits) |
| `contenance_estimer` | `cm2-contenance-estimer(-short)` | Ibrahim, plombier | A, C | parfum 50 mL : A | jaune | ✅ 15/11 (WAV faits) |
| `contenance_defi` | `cm2-contenance-defi(-short)` | Manon, organisatrice de marathon | A, C | cocktail 2,5 L dans un pichet de 2 L : C | bleue | ✅ 15/11 (WAV faits) |
| `solide_reconnaitre` | `cm2-solides-reconnaitre(-short)` | Gabriel, ingénieur spatial | C, B | devinette cylindre : A | jaune | ✅ 15/11 (WAV faits) |
| `solide_sommet_arete_face` | `cm2-solides-sommets-aretes-faces(-short)` | Lisa, sculptrice | A, C | pyramide en pailles, 5 boules : C | verte | ✅ 15/11 (WAV faits) |
| `solide_face` | `cm2-solides-faces(-short)` | Victor, chocolatier | C, B | boîte à chaussures, 6 couleurs : A | jaune | ✅ 15/11 (WAV faits) |
| `solide_patron` | `cm2-solides-patron(-short)` | Julia, maquettiste | C, B | boîte pyramide, 4 triangles : C | verte | ✅ 15/11 (WAV faits) |
| `solide_patron_construire` | `cm2-solides-patron-construire(-short)` | Anna, créatrice de lanternes | B, A | 11 patrons du cube : B | verte | ✅ 15/11 (WAV faits) |
| `solide_defi` | `cm2-solides-defi(-short)` | Ethan, fabricant d'aquariums | A, C | gâteau 27 cubes, 8 coins : B | bleue | ✅ 15/11 (WAV faits) |
| `longueur_comparer` | `cm2-longueur-comparer(-short)` | Léonie, coureuse de trail | B, A | avions 3,8 m / 3,15 m : B | jaune | ✅ 15/11 (WAV faits) |
| `longueur_convertir` | `cm2-longueur-convertir(-short)` | Arthur, géomètre | B, A | ruban 2,5 m = 250 cm : B | verte | ✅ 15/11 (WAV faits) |
| `longueur_estimer` | `cm2-longueur-estimer(-short)` | Mia, photographe animalière | C, B | lit de 2 m : C | jaune | ✅ 15/11 (WAV faits) |
| `longueur_defi` | `cm2-longueur-defi(-short)` | Nathan, technicien fibre optique | C, A | ballons tous les 2 m : 6 : A | bleue | ✅ 15/11 (WAV faits) |

## Prochaine étape
1. Faire valider les voix par Frédéric, série par série (contenance → solides → longueurs). Une voix retouchée : modifier le JSON à la main (le générateur refuse d'écraser).
2. Puis la chaîne de `REPRISE-cm2-perimetre-aire.md` : WAV → marques → scripts → dry run → planche -ql → HD (un seul, verrou) → bords 0 → short → miniatures → manifeste (après le 22/03/2027) → R2 → coach → plan coché. Commit PAR CHEMIN.
