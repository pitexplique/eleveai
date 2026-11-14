# Bibliothèque d'animaux (`lib/canvas/animaux`)

Créée le 14/11/2026 à la demande de Frédéric : une bibliothèque d'animaux
réutilisable, d'abord pour les questions du coach CP → CM2 (« Combien de
poules ? », « Compte les insectes » à la IXL), ensuite pour les shorts Manim.

**Voir les dessins** : `manim/assets/animaux/planche.html` (s'ouvre sans
serveur) ou la page `/bibliotheque-animaux` (noindex, hors menu).

## Les 24 animaux

| Le monde (20) | La Réunion (4, ≈ 4 % des contextes) |
|---|---|
| `chat` `chien` `poule` `poussin` `canard` `oiseau` `poisson` `papillon` `coccinelle` `abeille` `fourmi` `araignee` `escargot` `tortue` `lapin` `souris` `grenouille` `vache` `cochon` `mouton` | `margouillat` (peau de Ti Margo) `tangue` `paille_en_queue` `tortue_marine` |

Chaque animal a sa fiche (`FICHES`) : `un` (« une coccinelle »), `pluriel`,
`famille` (insecte, arachnide, mollusque, oiseau, mammifère, poisson, reptile,
amphibien), `pattes`, `origine`. ⭐ `famille` et `pattes` servent aux questions
de tri et de calcul : l'araignée (8 pattes) et l'escargot sont les pièges
naturels d'un « Compte les insectes » ; « Combien de pattes pour 3 poules ? ».

## L'API

```ts
import { Animal, GrilleAnimaux, svgAnimal, svgGrille, nommer, FICHES } from "@/lib/canvas/animaux";

<Animal nom="tortue" taille={80} />                       // un animal
<Animal nom="poisson" couleur="#ef4444" />                // la couleur EST la donnée
<GrilleAnimaux groupes={[{ animal: "poule", nombre: 7 }]} />      // 7 poules, 5 par ligne
<GrilleAnimaux
  groupes={[{ animal: "coccinelle", nombre: 4 }, { animal: "araignee", nombre: 2 }]}
  disposition="vrac" graine={12} />                       // mélangés, en vrac
svgGrille(groupes, options)  // la même chose en chaîne SVG (sans React)
nommer("poule", 7)           // « 7 poules »
```

Options d'un animal : `taille` (px, défaut 60), `couleur` (remplace la teinte
principale), `coloriage` (tout blanc, pour l'impression), `miroir`.
Options d'une grille : `colonnes` (défaut 5), `taille`, `ecart`,
`disposition` (`"grille"` | `"vrac"`), `melange` (défaut : oui dès 2 groupes),
`graine`, `coloriage`, `fond`.

⭐ **Même graine → même image** : aucun `Math.random`. Une question re-rendue
ne voit pas ses animaux bouger.

⭐ **La couleur par défaut est fixe** (une coccinelle est rouge partout) ;
`couleur` ne sert qu'aux exercices où la couleur est la donnée.

## Ajouter un animal

Une entrée dans `FICHES`, une dans `TEINTES`, une dans `DESSINS`
(`dessins.ts`), puis `npx tsx scripts/exporter-animaux.mts` pour Manim et la
planche. Contrat du dessin (le même que `ObjetsCanvas`) : boite **60 × 60**,
formes **fermées**, contour noir `#111827` de 2,2, détails noirs en trait fin
dessinés après. Regarder la planche à 150 px ET à la taille d'une grille.

## Dans Manim

```python
from animaux import animal, troupeau   # manim/animaux.py
poule = animal("poule", hauteur=1.2)
poules = troupeau("poule", 7, par_ligne=5, hauteur=0.9)  # VGroup, à compter un à un
```

Les SVG de `manim/assets/animaux/` sont **générés** (ne pas les retoucher) ; un
cadre invisible de 60 × 60 en tête de chacun garde les proportions du coach
(SVGMobject ignore le viewBox).

## Pas encore fait

- **Brancher au coach** : ajouter un `kind: "animaux"` à `CanvasFigure`
  (`lib/tutor-v4/types.ts`) et un cas dans `CanvasRenderer` qui rend
  `<GrilleAnimaux>` — pas fait le 14/11 parce que `types.ts` et les banques
  étaient en cours d'édition par une autre session.
- Les 4 animaux d'`ObjetsCanvas` (chat, poisson, oiseau, papillon) sont des
  copies des dessins d'ici ; à terme `ObjetsCanvas` pourra les importer.
