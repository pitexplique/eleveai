# Passation — la 4ᵉ maths, chantier en cours

> Ouverte le 25/08/2026. **Cette note ne remplace pas `note-du-matin.md`** : trois
> sessions travaillent dans le dossier (français 4ᵉ, français 3ᵉ, maths 4ᵉ), et la
> note commune ne m'appartient pas. Celle-ci ne parle que des maths de 4ᵉ.
> Commencer par `git pull`.

---

## Où on en est

```
maths 4e   5 fiches sur 19   ·   micros 34/34   ·   5 PDF   ·   banque réparée
```

| fiche | notion | état |
|---|---|---|
| Pythagore | `pythagore-theoreme` | ✅ publiée, mesurée, PDF |
| Thalès | `thales-theoreme` | ✅ publiée, mesurée, PDF |
| Cosinus | `trigo-cosinus` | ✅ publiée, mesurée, PDF |
| Parallélogramme | `quadrilatere-parallelogramme` | ✅ publiée, mesurée, PDF |
| Transformations | `sym-transformation` | ✅ publiée, mesurée, PDF |

⭐ **La géométrie de 4ᵉ est terminée.** Les cinq notions de `BO4G1` et de
`sym_transformation` ont leur fiche.

**Restent 14 notions**, toutes hors géométrie : `relatif_operation`,
`fraction_nombre`, `prop_proportionnalite`, `litteral_expression`,
`litteral_distributivite`, `litteral_identite_remarquable`,
`litteral_factorisation`, `equation_resolution`, `aire_perimetre`,
`aire_surface`, `volume_solide`, `stat_statistique`, `proba_experience`,
`algo_programmation`.

⭐ **Le rythme mesuré** : les deux premières fiches ont demandé **trois passes de
mesure chacune** ; les trois suivantes sont passées **du premier coup ou en une
retouche**. Ce qui a coûté, ce n'est pas d'écrire les fiches, c'est d'apprendre
les six règles ci-dessous.

---

## ⭐ Le périmètre a été tranché par Frédéric, et il a bougé deux fois

**On se base sur l'année scolaire 2026-2027**, donc sur le **programme actuel** —
les 19 notions du dépôt sont toutes légitimes, Thalès et le cosinus compris.

⚠️ **Le nouveau programme de cycle 4 (arrêté du 18/02/2026) ne concerne la 4ᵉ
qu'en septembre 2027.** Il est organisé par année, et il déplace beaucoup :
Thalès, le cosinus, les identités remarquables et la factorisation passent en 3ᵉ ;
puissances, racine carrée et fonctions entrent en 4ᵉ ; le thème « Grandeurs et
mesures » disparaît. **La 5ᵉ, elle, bascule en septembre 2026** — c'est-à-dire
maintenant. Ses 20 fiches sont écrites contre l'ancien programme.

⛔ **Quatre trous mesurés dans la banque, valables dès cette année** (lus dans les
attendus de fin d'année de 4ᵉ, eduscol) — aucune micro-compétence, aucun énoncé :

```
Puissances et notation scientifique   « puissances de 10 d'exposants positifs
   ou négatifs », « préfixes de nano à giga »
Racine carrée                         définition, encadrement entre deux entiers
Divisibilité et nombres premiers      décomposition en facteurs premiers
Fonctions                             « produire une formule littérale
   représentant la dépendance de deux grandeurs »
```

Plus deux compléments dans des notions existantes : les **cas d'égalité des
triangles** et le **repérage dans l'espace** (abscisse, ordonnée, altitude ;
patrons de pyramide et de cône).

⭐ **Décision de Frédéric : banque d'abord, fiche ensuite** pour ces thèmes neufs.
Une fiche sans banque ne s'allume pas dans le coach.

---

## ✅ FAIT — la banque de 4ᵉ a été réparée avant d'écrire (phase 0)

Les six vérificateurs passent. Deux défauts corrigés, tous deux invisibles au
runtime :

1. **14 gabarits servaient trois lignes au lieu de quatre** (`a9d3882c`).
   `makeChoices` déduplique et coupe à trois distracteurs : un gabarit qui n'écrit
   que trois pièges n'a aucune réserve. Le pire, `proba_defi_tpl_4_contraire`,
   tombait une fois sur deux. **Et deux QCM de Thalès avaient DEUX bonnes
   réponses** — « AM/AN = AB/AC » est vraie, c'est le produit en croix.
2. **32 QCM se gagnaient à la longueur** (`f0cc8250`). Le pire à +61 caractères.
   Ce n'était pas dispersé : c'étaient les items de **rédaction** et de
   **définition**, dont la bonne réponse est forcément une phrase. Méthode du
   24/08 : on allonge les leurres, on ne raccourcit pas la réponse.
   ⛔ Piège rencontré deux fois : **allonger un leurre le rapproche de la vérité,
   et il peut devenir VRAI**.

Après réparation : validité ok, couverture 136/136, variété 136/136 au-dessus de
dix (médiane 310), 0 gabarit au compte variable sur 362 400 tirages, 0 micro
graphique sans figure.

---

## ⭐ Ce qu'on a appris en mesurant, et qui sert à CHAQUE fiche

**Aucune de ces règles ne se lit dans le code. Toutes se sont vues au rendu.**

### 1. Les canvas à points fixes sont plus nombreux que ne le disait la note du 24/08

`triangle`, `quadrilatere`, `thales` — et sans doute d'autres — dessinent sur des
**points fixes**, calés sur leur cadre de référence. Réduire la seule `size` pour
tenir dans une carte de fiche ne met pas le dessin à l'échelle : **ça ROGNE**. Les
étiquettes sortent du `<svg>` sans rien casser et sans faire baisser la police,
donc c'est invisible aux deux contrôles habituels.

⭐ **La réparation est de resserrer les POINTS, pas le cadre.** Pour un triangle :
sommets dans 35…205 pour une carte, × 0,86 pour un exemple.

### 2. Les largeurs de bloc, mesurées sur téléphone de 375 px

```
carte de propriété    222 px      →  cadre 228
bloc « La formule »   216 px      →  cadre 228 (le plus étroit des trois)
bloc d'exemple        200 px      →  cadre 208 à 212
```

Un cadre plus grand que ça fait passer les polices sous 11 px. Le calcul est
`police × largeurAffichée ÷ largeurViewBox`.

### 3. `schema_barre` : deux pièges, et le second ne se voit qu'en 1280

- Ses étiquettes de parts sont posées à **144 px DU HAUT** (`barY + barHeight + 24`)
  et sa phrase du bas à **18 px DU BAS**. Sous 180 de hauteur elles se rentrent
  dedans. **Viser 200.** ⚠️ À 180 elles se frôlaient encore d'un cheveu — invisible
  à 375 px, net une fois le dessin agrandi. **Mesurer aux DEUX largeurs.**
- Ses parts ont une largeur **proportionnelle à leur valeur** : une part qui vaut
  36 % de 240 fait 86 px, et six signes n'y tiennent pas.

### 4. `ThalesCanvas` a été réparé le 25/08 — avec l'accord de Frédéric

`lib/canvas/ThalesCanvas.tsx` plaçait points par défaut **et** décalages
d'étiquettes en pixels absolus. Un facteur `k = width / 340` met désormais le
dessin à l'échelle du cadre demandé. **Les polices ne sont volontairement PAS
multipliées** : dans un cadre plus petit affiché à la même largeur, elles doivent
rester grandes par rapport à la figure.

⭐ **Le coach est inchangé, et ce n'est pas une espérance** : la banque n'appelle
jamais `size`, donc `k = 1` exactement, et `x × 1` redonne `x` au bit près.

⚠️ **Conséquence à connaître** : comme les polices ne suivent pas l'échelle, les
étiquettes se rapprochent sans maigrir. Sur Thalès, **M doit être à 0,32 de [AB]**
— la fenêtre mesurée est étroite (0,30 à 0,34), et le défaut du canvas (0,283)
laisse les textes se toucher.

⛔ Et **pas de `showFormula`** dans une fiche : sa police interne est de 10,5 px,
soit 9,7 dans une carte.

### 5. `transformation` : sa largeur se DÉDUIT, elle ne se règle pas

`largeur = cols × cellSize + 2 × padding`. La seule commande est donc `cellSize`
— jamais `width`, qui rognerait la grille. Huit colonnes à 22 px plus 2 × 26 de
marge font les 228 px d'une carte.

⚠️ **`padding` à 26 et non 20** : l'étiquette de l'axe est écrite AU-DESSUS de la
grille et sortait du cadre de 1,8 px — visible en 1280 seulement.

⚠️ **Le libellé d'un vecteur se compte en caractères**, comme la phrase du bas
d'un schéma. « 4 à droite, 2 en bas » (vingt signes) touche le nom de la figure
image ; « 4 à droite » (dix signes) le touche encore d'un dixième de pixel.
Écrire `(+4 ; +2)` — c'est de toute façon la notation de la 3ᵉ.

### 6. Le PDF, et le serveur

- Redémarrer le serveur **avant** une fournée : le rechargement à chaud perd la
  feuille d'impression. Il s'est dégradé **deux fois** le 25/08 —
  `build:fiches-pdf` expire sur `waitForFunction` alors que la page s'affiche.
  Le relancer suffit, ce n'est jamais le code.
- `MSYS_NO_PATHCONV=1` devant le `npm run` sous Git Bash.
- Un PDF correct fait **6 pages, 4 corrections sur 4, 12 blocs**.

---

## ⭐ La règle qui commande le choix des dessins, et ses DEUX formes

Le canvas se choisit pour ce qu'il MONTRE. Sur une fiche de géométrie, le dessin
évident revient partout — six triangles, ce sont six règles identiques.

**Deux parades, et la seconde a été trouvée le 25/08 :**

1. **Changer d'objet** — chercher ce que le canvas évident ne sait PAS faire.
   Un carré est une aire → `figure_libre` ; une égalité est un partage →
   `schema_barre` ; un cosinus est un nombre entre 0 et 1 → `number_line` ; une
   quatrième proportionnelle → `tableau_proportionnalite` ; le geste qui précède
   la figure → `droites`.
2. **Garder le même objet et changer l'INFORMATION.** Sur le parallélogramme, la
   même figure aux mêmes coordonnées porte tour à tour les marques de
   parallélisme, le codage des égalités, les diagonales, puis la hauteur en
   pointillés. L'élève reconnaît la figure et voit une information de plus à
   chaque bloc.

⭐ **Et le contre-exemple ouvre trois des quatre fiches écrites** : un triangle
4-5-6 qui n'est pas rectangle, une configuration de Thalès dont les rapports
diffèrent, un trapèze qui est penché sans être un parallélogramme. C'est le
dessin le plus utile à chaque fois.

⛔ **Un bloc peut rester sans dessin** — Frédéric, 25/08 : « tu peux avoir un bloc
sans schéma, surtout rédiger », et dans la même minute « mais les élèves ont
besoin de dessin, schéma, etc. ». Les deux ensemble donnent la règle : **on ne se
prive d'un dessin que là où il redirait le texte.** Onze visuels sur douze blocs.

---

## La boucle, fiche par fiche

1. Lire les micros de la notion dans `knowledge/maths/4e/microSkills.ts`, et les
   nombres dans la banque (⚠️ **les nombres de la fiche sont ceux de la banque**).
2. Écrire `lib/fiches/maths-4e-<notion>.tsx` + la page mince.
3. Ajouter au **registre**, au **sitemap**, et ⛔ **retirer la notion du redirect
   de `next.config.ts`** si elle y est — sinon l'adresse redirige vers le hub et
   la fiche neuve est invisible. Sorties à ce jour : `pythagore-theoreme`,
   `trigo-cosinus`. Restent éteintes : `stat-statistique`, `proba-experience`.
4. `npx tsc --noEmit`, puis `node scripts/verifier-micros.mjs maths 4e`.
5. **Rendre la page et la MESURER en 375 ET en 1280** : polices sous 11 px,
   chevauchements de `<text>`, débordements hors du `<svg>`.
6. `npm run build:fiches-pdf`, puis commit **par chemin**.

---

## ⛔ Les règles du dépôt à trois sessions

- **Toujours committer par chemin** : `git commit -F msg.txt -- <fichiers>`.
  ⚠️ `git status` montre des fichiers du français : ne pas les ajouter.
- ⛔ **Jamais** `--amend`, `reset --hard`, `checkout -- .`
- **Mon serveur est `eleveai-2`** (port 3100, dossier compilé `.next-2`), jamais
  celui d'un autre.
- **Fichiers partagés touchés jusqu'ici**, tous de façon additive et tous imposés
  par REGLES.md : `registre.ts`, `sitemap.ts`, `pdf-disponibles.ts`,
  `next.config.ts`, et `lib/canvas/ThalesCanvas.tsx` (avec accord explicite).
  Aucune ligne existante d'un autre chantier modifiée.
