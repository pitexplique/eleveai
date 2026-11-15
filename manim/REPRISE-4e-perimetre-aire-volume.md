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

---

# La 3e : les vidéos communes (demandé par Frédéric le 15/11)

Convention reprise des suites (`manim/REPRISE-suites.md` : « vidéo commune = faite
dans la classe la plus basse, branchée par `aussi` ») : une vidéo commune 4e+3e est
tournée en 4e, id `4e-…`, et branchée sur la 3e par `aussi`.

## Les micros 3e de ces familles (banques réelles, 31 micros visibles en France)

| notionId 3e | banque | micros |
|---|---|---|
| `aire_perimetre` | `perimetres.bank.ts` | comprendre, polygone, cercle, figure_composee, defi (5) |
| `aire_surface` | `aires.bank.ts` | comprendre, triangle, disque, figure_composee, agrandissement_reduction, defi (6) |
| `volume_solide` | `volumes.bank.ts` + `volumes-pyramide-cone.bank.ts` | comprendre, pave, prisme, cylindre, boule, unite, defi, agrandissement_reduction, pyramide_cone_reduction (9) |
| `volume_geometrie_espace` | `geometrie-espace.bank.ts` | solide_reconnaitre, section, representation, defi (4) |
| `sections_solides` | `sections_solides.bank.ts` + `angles-cercle.bank.ts` | reconnaitre, pave_cube, cylindre, cone_pyramide, sphere, calculer_longueur, defi (7) |

⛔ Hors France, à NE PAS tourner (`lib/tutor-v4/micros-masquees.ts`) : les aires de
solides en 3e (`aire_prisme_droit`, `aire_cylindre`, `aire_pyramide_cone`,
`aire_sphere`). En revanche `section_sphere` EST au programme français.

✅ `volume_pyramide` et `volume_cone` existent bien en 3e : la banque 3e importe
`fabriquerPyramideCone` de la banque 4e (préfixe `3e_`), et les deux micros sont
déclarés dans `knowledge/maths/3e/microSkills.ts`. Les vidéos 4e de pyramide et de
cône servent donc les deux classes. Décompte exact : **4e = 30 micros, 3e = 33**.

## Ce que la 3e gagne sans aucun tournage

- **13 micros 3e servis par la série 5e déjà tournée** (`aussi`, exactement les mêmes
  microId) : `aire_comprendre`, `aire_triangle`, `volume_comprendre`, `volume_pave`,
  `volume_prisme`, `volume_cylindre`, `volume_unite`.
- **2 micros 3e servis par deux vidéos 4e DÉJÀ en ligne** : `4e-prop-agrandissement-aire`
  → `aire_agrandissement_reduction`, `4e-prop-agrandissement-volume` →
  `volume_agrandissement_reduction`. (Elles vivent sous `prop_echelle` en 4e.)

## Découpage proposé : 17 vidéos communes 4e+3e, 10 vidéos 3e seules

Vidéos tournées ici (4e), avec les micros qu'elles servent :

| id | 4e | 3e |
|---|---|---|
| `4e-perimetre-polygones` | comprendre, rectangle, carre, triangle | comprendre, polygone |
| `4e-perimetre-cercle` | (nourrit `figure`) | `aire_perimetre_cercle` |
| `4e-perimetre-figure-composee` | `aire_perimetre_figure` | `aire_perimetre_figure_composee` |
| `4e-perimetre-probleme` | `aire_perimetre_probleme` | — |
| `4e-perimetre-defi` | `aire_perimetre_defi` | `aire_perimetre_defi` |
| `4e-aire-rectangle-carre` | `aire_rectangle`, `aire_carre` | — |
| `4e-aire-disque` | (nourrit `figure`) | `aire_disque` |
| `4e-aire-figure-composee` | `aire_figure` | `aire_figure_composee` |
| `4e-aire-probleme` | `aire_probleme` | — |
| `4e-aire-defi` | `aire_defi` | `aire_defi` |
| `4e-volume-lien-aire` | `volume_lien_aire` | — |
| `4e-volume-pyramide` **(PILOTE)** | `volume_pyramide` | `volume_pyramide` |
| `4e-volume-cone` | `volume_cone` | `volume_cone` |
| `4e-volume-defi` | `volume_defi` | `volume_defi` |
| `4e-solides-reconnaitre` | `vision_reconnaitre` | `volume_solide_reconnaitre` |
| `4e-solides-vues` | `vision_vues` | — |
| `4e-solides-perspective` | `vision_representation` | `volume_representation` |
| `4e-patron-pyramide` | `patron_pyramide` | — |
| `4e-section-comprendre` | `vision_section` | `volume_section`, `section_reconnaitre` |
| `4e-solides-defi` | `vision_defi` | `volume_geometrie_espace_defi` |

**20 paysages 4e** (+ 20 shorts Manim) couvrent les 30 micros de 4e et 18 de 3e.

Restent **8 micros 3e purs**, 8 paysages de plus : `volume_boule`,
`volume_pyramide_cone_reduction`, `section_pave_cube`, `section_cylindre`,
`section_cone_pyramide`, `section_sphere`, `section_calculer_longueur`,
`section_defi`.

## ✅ Décidé le 15/11 par Frédéric : « Fais la 3e aussi »

**28 paysages + 28 shorts Manim** pour couvrir les 30 micros de 4e ET les 33 de 3e
(9 micros de plus sont servis par la série 5e déjà tournée, 2 par deux vidéos 4e
déjà en ligne). Voix dans `manim/poste2/VOIX-4e-3e-perimetre-aire-volume.md`.

⚠️ À dire au 1er poste : il ne reste RIEN à tourner en 3e dans ces familles après
cette série. Qu'il ne la reprenne pas.

## Suivi (follow-up, hors série)

La fiche `lib/fiches/maths-4e-volumes.tsx` n'a ni pyramide ni cône, alors que le
coach les a depuis le 05/11. Les exemples du pilote viennent donc de la banque.
