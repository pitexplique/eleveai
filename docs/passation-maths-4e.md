# Passation — la 4ᵉ maths, chantier en cours

> Ouverte le 25/08/2026. **Cette note ne remplace pas `note-du-matin.md`** : trois
> sessions travaillent dans le dossier (français 4ᵉ, français 3ᵉ, maths 4ᵉ), et la
> note commune ne m'appartient pas. Celle-ci ne parle que des maths de 4ᵉ.
> Commencer par `git pull`.

---

## Où on en est

```
maths 4e   10 fiches sur 20   ·   micros 71/71   ·   10 PDF   ·   banque réparée
```

⚠️ **VINGT et non plus dix-neuf** : les fractions ont été scindées en deux le
26/08 (voir plus bas).

| fiche | notion | état |
|---|---|---|
| Pythagore | `pythagore-theoreme` | ✅ publiée, mesurée, PDF |
| Thalès | `thales-theoreme` | ✅ publiée, mesurée, PDF |
| Cosinus | `trigo-cosinus` | ✅ publiée, mesurée, PDF |
| Parallélogramme | `quadrilatere-parallelogramme` | ✅ publiée, mesurée, PDF |
| Transformations | `sym-transformation` | ✅ publiée, mesurée, PDF |
| Statistiques | `stat-statistique` | ✅ publiée, mesurée, PDF |
| Probabilités | `proba-experience` | ✅ publiée, mesurée, PDF |
| Opérations sur les relatifs | `relatif-operation` | ✅ publiée, mesurée, PDF |
| Fractions et rationnels | `fraction-nombre` | ✅ publiée, mesurée, PDF |
| Calculer avec les fractions | `fraction-calcul` | ✅ publiée, mesurée, PDF |

⭐ **La géométrie, les données et les nombres sont finis.** Le redirect du 21/08
est **entièrement levé pour la 4ᵉ** : les quatre adresses éteintes sont revenues.
Seule la 3ᵉ y reste.

**Restent 10 notions** : `prop_proportionnalite`, `litteral_expression`,
`litteral_distributivite`, `litteral_identite_remarquable`,
`litteral_factorisation`, `equation_resolution`, `aire_perimetre`,
`aire_surface`, `volume_solide`, `algo_programmation`.
👉 Cinq d'entre elles sont le **bloc algèbre**, qui s'enchaîne : expressions →
distributivité → identités → factorisation → équations. Les écrire à la suite
permet de partager les canvas (`algebre`, `calcul_pose`, `tableau_donnees`).

⭐ **Le rythme mesuré** : les deux premières fiches ont demandé **trois passes de
mesure chacune** ; toutes les suivantes sont passées **du premier coup ou en une
retouche**. Ce qui a coûté, ce n'est pas d'écrire les fiches, c'est d'apprendre
les règles ci-dessous.

---

## ⛔ CE QU'IL FAUT SAVOIR AVANT D'ÉCRIRE UNE LIGNE (26/08)

### 1. Lire les micros ET leurs énoncés, jamais son idée du programme

Frédéric : « **avant de faire la fiche il faut bien lire les micro id des
notions** ». Dit après une vraie erreur : un **arbre de probabilités** avait été
mis dans la fiche de 4ᵉ. Il n'y est pas au programme — les attendus s'arrêtent
avant, et les huit énoncés de `proba_defi` ne parlent que de l'événement
contraire. **La banque le disait déjà**, je ne l'avais pas assez lue.

👉 Avant d'écrire : lire les `microId` de la notion, puis les **énoncés réels**
des micros floues — surtout celles nommées `*_defi` ou `*_probleme`, dont le nom
ne dit pas le contenu. Relever au passage **les nombres**, qui doivent être ceux
de la banque.

### 2. Les fiches rendent le LaTeX depuis le 26/08 — mais pas partout

`components/fiches/TexteMath.tsx` est branché sur les **23 points d'affichage**
de `FicheCoursClient`. On écrit donc `$\\frac{2}{3}$` et non « 2/3 ».
⭐ Il est **l'identité sur un texte sans `$`** : les 109 fiches antérieures ne
bougent pas (vérifié en rendant la 6ᵉ après coup — 0 nœud KaTeX, 0 dollar).
⛔ On n'a **pas** utilisé `MarkdownMath`, qui existe : il interprète aussi le
markdown, et un `*` au milieu d'une phrase aurait changé des fiches déjà écrites.

**Les trois endroits où le LaTeX ne se rend PAS :**

| Où | Pourquoi |
|---|---|
| Les libellés **dans** un canvas (`label`, `total`, `values`, `caption`, `questionLabel`) | tracés en `<text>` SVG, hors de React |
| Les **diapos du mode classe** (`ClasseSlide[]`) | `ModeClasse.tsx` n'a aucun rendu KaTeX — le code serait **projeté en clair au tableau** |
| Une légende sous un dessin | seulement si le helper `legende()` de la fiche passe par `TexteMath` — à faire fiche par fiche |

⚠️ **DEUX ANTISLASHS DANS LE SOURCE.** Avec un seul, `\t` est la tabulation et
`\d` perd son antislash : l'écran affichait « imes » et « div » au lieu de × et ÷.
**Invisible au typecheck.** Ça se voit en comptant les `.katex-error` dans la
page — le mesureur du § suivant les compte désormais.

⭐ **Et le PDF suit** : `KaTeX_Main-Regular` est **embarquée** dans le fichier
téléchargeable (vérifié en listant ses `/BaseFont`). Les formules y sont dans la
vraie police mathématique.

### 3. Les fractions ont été scindées, et le seuil est posé

`fraction_nombre` portait **douze** micros contre une médiane de sept. Frédéric :
« une notion ne doit pas avoir 12 micro-compétences ». Découpage suivant la ligne
de fracture déjà présente dans les prérequis, et **identique à celui de la 5ᵉ** :

```
fraction_nombre  « Fractions et nombres rationnels »   5 micros   (garde son id)
fraction_calcul  « Calculer avec les fractions »       7 micros
```

⚠️ **`stat_statistique` en a dix et RESTE en l'état** — Frédéric : « ça me parait
cohérent ». Le seuil n'est donc pas mécanique.
⚠️ `fraction_nombre` **garde son identifiant** : dix fichiers le citent, dont
`lib/matrice/coach.ts`. Après un découpage, **régénérer**
`node scripts/generer-notions-matrice.mjs` et vérifier que le diff ne contient
que la nouvelle notion.

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
  par REGLES.md ou autorisés explicitement : `registre.ts`, `sitemap.ts`,
  `pdf-disponibles.ts`, `next.config.ts`, `lib/canvas/ThalesCanvas.tsx`,
  `components/fiches/FicheCoursClient.tsx` et le nouveau
  `components/fiches/TexteMath.tsx`. Aucune ligne existante d'un autre chantier
  modifiée.

⛔ **EN SUSPENS AU 26/08, À REPRENDRE** : `lib/fiches/registre.ts` et
`app/sitemap.ts` contenaient, en fin de session, le **travail non commité de la
session de français** — seize fiches de 4ᵉ, trois alias, de longs commentaires.
Committer ces fichiers par chemin aurait emporté leur travail dans un commit de
maths. Ils ont donc été laissés de côté, et **les deux lignes de
`maths/4e/fraction-calcul` y sont écrites mais PAS COMMITÉES**.
👉 À la reprise : `git pull`, vérifier si le français a commité, puis committer
ces deux lignes — ou constater qu'elles sont parties avec leur commit. Vérifier
d'un coup d'œil que `/fiches-cours/maths/4e/fraction-calcul` figure bien au
sitemap et au registre.

---

## Le mesureur à coller dans la console

Il compte maintenant les erreurs KaTeX, en plus des trois contrôles habituels.
À passer **en 375 ET en 1280** sur chaque fiche.

```js
(() => {
  const out = { largeur: innerWidth, nbSvg: 0, minPx: 99, petites: 0, chev: 0, deb: 0,
    erreursKatex: document.querySelectorAll(".katex-error").length,
    dollars: (document.body.innerText.match(/\$/g) || []).length };
  document.querySelectorAll("svg").forEach((svg) => {
    const r = svg.getBoundingClientRect();
    if (r.width < 60 || svg.closest(".katex")) return;   // ⚠️ ignorer les SVG internes de KaTeX
    out.nbSvg++;
    const vb = svg.viewBox?.baseVal?.width || r.width, ratio = r.width / vb;
    const T = [...svg.querySelectorAll("text")];
    T.forEach((t) => {
      const f = (parseFloat(getComputedStyle(t).fontSize) || 0) * ratio;
      if (f > 0 && f < out.minPx) out.minPx = +f.toFixed(1);
      if (f < 11) out.petites++;
      const b = t.getBoundingClientRect();
      if (b.width && (b.left < r.left-1 || b.right > r.right+1 || b.top < r.top-1 || b.bottom > r.bottom+1)) out.deb++;
    });
    for (let a = 0; a < T.length; a++) for (let b = a+1; b < T.length; b++) {
      const x = T[a].getBoundingClientRect(), y = T[b].getBoundingClientRect();
      if (x.width && y.width && x.left < y.right && y.left < x.right && x.top < y.bottom && y.top < x.bottom) out.chev++;
    }
  });
  return out;
})()
```

**La cible : `petites: 0`, `chev: 0`, `deb: 0`, `erreursKatex: 0`, `dollars: 0`.**
