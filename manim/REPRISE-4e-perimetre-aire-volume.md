# Reprise — 4e « Périmètre, aire, volume, solides » (2e poste, branche `poste2`)

Ouvert le 15/11/2026. 30 micros du coach, plan : `manim/PLAN-perimetre-aire-volume.md`, section `## 4E`.

## État

- [x] Inventaire des 30 micros (ci-dessous), fait sur les banques 4e et sur
      `manim/manifeste-youtube.json` + `manim/poste2/manifeste-5e.json`.
- [ ] Inventaire validé par Frédéric (ce qu'on branche en `aussi`, ce qu'on tourne).
- [ ] Voix du pilote `volume_pyramide` (paysage + short), validées à deux.
- [ ] Pilote rendu en `-ql`, validé.
- [ ] Reste de la série.

## Les notions 4e et leurs micros (source : les banques)

| notionId 4e | banque | micros |
|---|---|---|
| `aire_perimetre` | `perimetres.bank.ts` | 7 |
| `aire_surface` | `aires.bank.ts` | 8 |
| `volume_solide` | `volumes.bank.ts` + `volumes-pyramide-cone.bank.ts` | 9 |
| `vision_espace` | `vision-espace.bank.ts` + `patron-pyramide.bank.ts` | 6 |

⭐ `aire_surface` et `volume_solide` portent le MÊME nom en 5e et en 4e : un `aussi`
depuis une vidéo 5e ne change que la classe.

## Inventaire micro par micro

Légende : **5e** = déjà tourné par ce poste (série du 15/11, rendue, sur R2, pas
encore sur YouTube) · **primaire** = seulement CM1/CM2/CE2 · **—** = rien.

### Périmètre (7) — en 4e le cercle et π entrent dans la notion
| micro | existant | décision proposée |
|---|---|---|
| `aire_perimetre_comprendre` | CE2, CM2 (`perimetre_comprendre`) | 1 paysage 4e de rappel, 4 micros |
| `aire_perimetre_rectangle` | CE2, CM1/CM2 (`perimetre_quadrilatere`) | idem (`aussi`) |
| `aire_perimetre_carre` | CM1/CM2 (`perimetre_quadrilatere`) | idem (`aussi`) |
| `aire_perimetre_triangle` | CM1/CM2 (`perimetre_triangle`) | idem (`aussi`) |
| `aire_perimetre_figure` | — (cercle, demi-cercle, π : neuf en 4e) | **à tourner** |
| `aire_perimetre_probleme` | — | **à tourner** |
| `aire_perimetre_defi` | primaire seulement | **à tourner** (défi 4e : disque, π) |

### Aire (8)
| micro | existant | décision proposée |
|---|---|---|
| `aire_comprendre` | **5e**, CM1, CM2 | `aussi` 5e |
| `aire_rectangle` | CM1/CM2 (`aire_carre_rectangle`) | 1 paysage 4e de rappel, 2 micros |
| `aire_carre` | CM1/CM2 (`aire_carre_rectangle`) | idem (`aussi`) |
| `aire_triangle` | **5e** | `aussi` 5e |
| `aire_parallelogramme` | **5e** | `aussi` 5e |
| `aire_figure` | 5e `aire_composer` (sans disque) | **à tourner** (le disque entre en 4e) |
| `aire_probleme` | — | **à tourner** |
| `aire_defi` | 5e (sans disque) | **à tourner** (défi 4e) |

### Volume et contenance (9)
| micro | existant | décision proposée |
|---|---|---|
| `volume_comprendre` | **5e** | `aussi` 5e |
| `volume_lien_aire` | — | **à tourner** (neuf 4e) |
| `volume_pave` | **5e** | `aussi` 5e |
| `volume_prisme` | **5e** | `aussi` 5e |
| `volume_cylindre` | **5e** | `aussi` 5e |
| `volume_pyramide` | — | **à tourner** — PILOTE |
| `volume_cone` | — | **à tourner** (neuf 4e) |
| `volume_unite` | **5e** | `aussi` 5e |
| `volume_defi` | 5e (sans pyramide ni cône) | **à tourner** (défi 4e) |

### Solides et espace (6) — rien au collège aujourd'hui
| micro | existant | décision proposée |
|---|---|---|
| `vision_reconnaitre` | CE2, CM1 | **à tourner** (pyramide et cône au programme) |
| `vision_vues` | — | **à tourner** |
| `vision_representation` | — | **à tourner** (perspective cavalière) |
| `patron_pyramide` | 5e `patron_prisme_cylindre` (prisme, cylindre) | **à tourner** (pyramide) |
| `vision_section` | — | **à tourner** (neuf 4e) |
| `vision_defi` | CE2, CM1 | **à tourner** |

## Compte

- 8 micros branchés en `aussi` depuis la série 5e : zéro tournage.
- 22 micros couverts par **18 paysages + 18 shorts** à tourner (dont 2 paysages
  « rappel » qui servent 6 micros à elles deux par `aussi`).

## Trois points à trancher avec Frédéric

1. **`aussi` 5e → 4e** : l'élève de 4e verra « Maths 5e » en haut de l'écran
   (même cas que 1re spé → terminale sur les suites, accepté le 10/11).
2. **Les rappels de périmètre et d'aire** : seules des vidéos CM1/CM2 existent.
   Brancher le CM2 sur un 4e serait visible (« Maths CM2 »). Proposition : deux
   paysages 4e de rappel plutôt qu'un branchement primaire.
3. ✅ **Tranché le 15/11 : le short 4e reste en MANIM**, pas en dessin animé
   (Frédéric, confirmant sa règle du 09/11/2026 dans `manim/REGLES.md` : « à partir
   de la 4e, le short reste en Manim »), **et toujours avec un défi** (Frédéric,
   15/11). Donc pas de `prototypes/ti-margo/films/4e-commun.js` à écrire, et les
   miniatures viennent des générateurs `manim/miniature_*.py`.
   Chaque short 4e porte : un défi (pas un mini-cours), sa ceinture (échelle
   entière sous le titre), une question-pause avec compte à rebours de 3 s, la
   question chiffrée en commentaire à la fin.

## Pièges relevés

- Les 3 métiers de la matrice 4e `volume_solide` (ingénieur de l'eau, pâtissière,
  logisticien) sont exactement ceux déjà pris dans la série 5e : il faudra d'autres
  métiers, ou les prendre dans d'autres notions.
- Aucune vidéo 6e de périmètre ni d'aire n'existe (la banque 6e a les mêmes micros).
  Si le 1er poste en tourne, les deux séries se croiseront : à vérifier avant la fusion.
