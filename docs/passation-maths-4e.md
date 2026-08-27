# Passation — la 4ᵉ maths, chantier en cours

> Ouverte le 25/08/2026. **Cette note ne remplace pas `note-du-matin.md`** : trois
> sessions travaillent dans le dossier, et la note commune ne m'appartient pas.
> Celle-ci ne parle que des maths de 4ᵉ. Commencer par `git pull`.
>
> ⚠️ **L'ATTELAGE A CHANGÉ LE 27/08** (Frédéric) : ce n'est plus
> « français 4ᵉ + français 3ᵉ + maths 4ᵉ », mais **écran d'accueil + français +
> maths 4ᵉ**. Ça compte, parce que la session d'accueil ne touche pas aux mêmes
> fichiers qu'une session de fiches : elle vit dans `app/page.tsx` et les
> composants de la page d'entrée, là où les sessions de fiches vivent dans
> `lib/fiches/` et `app/fiches-cours/`. Le seul terrain vraiment commun est
> `lib/fiches/registre.ts` — et c'est justement lui qui a bougé sous ma main
> trois fois aujourd'hui.
>
> ⛔ **NE PAS TOUCHER À L'ACCUEIL.** Une session y travaille, et le rebond de
> 62 % est le chiffre qui l'arbitre : ce n'est pas un terrain qu'on modifie en
> passant.

---

## Où on en est

```
maths 4e   ✅ 20 fiches sur 20   ·   micros 136/136   ·   20 PDF   ·   tout est poussé
```

⚠️ **VINGT et non plus dix-neuf** : les fractions ont été scindées en deux le
26/08 (voir plus bas).

## ✅✅ LE CHANTIER EST TERMINÉ (27/08/2026, au matin)

⚠️ **CETTE NOTE COUVRE DEUX JOURNÉES, et les dates ci-dessous le disent.** La
session qui a fini la 4ᵉ a commencé le **26/08 à 13 h 30** et s'est achevée le
**27/08 à 10 h**. Les trois premières fiches d'algèbre sont donc du 26, les cinq
suivantes du 27 — le tableau plus bas porte la date de chacune. Vérifiable :
`git log --date=format:'%d/%m %H:%M'`.

**Les vingt notions de la 4ᵉ maths ont leur fiche**, mesurée aux deux largeurs,
câblée au registre et livrée en PDF. `verifier-micros` répond **136/136** : plus
une seule micro-compétence de la banque de 4ᵉ n'est sans bloc de cours.

⭐ **CE QU'IL RESTE À FAIRE N'EST PLUS DE LA RÉDACTION.** Les quatre trous mesurés
dans la BANQUE (puissances et notation scientifique, racine carrée, divisibilité
et nombres premiers, fonctions) sont toujours là, et la décision de Frédéric
tient : **banque d'abord, fiche ensuite**. Une fiche sans banque ne s'allume pas
dans le coach. Idem pour les deux compléments — cas d'égalité des triangles,
repérage dans l'espace. Le prochain chantier de 4ᵉ commence donc par des énoncés,
pas par des dessins.

---

### ✅ LE BLOC ALGÈBRE EST COMPLET (26 et 27/08)

`litteral-expression` · `litteral-distributivite` ·
`litteral-identite-remarquable` · `litteral-factorisation` ·
`equation-resolution` : **les cinq** sont publiées, mesurées, câblées et en PDF.
Elles se citent l'une l'autre sans jamais se redéfinir.
**Restent quatre notions**, toutes hors algèbre : `aire-perimetre`,
`aire-surface`, `volume-solide`, `algo-programmation`.

⭐ **CE QUE LES CINQ FICHES D'ALGÈBRE ONT APPRIS, ET QUI SERT AUX SUIVANTES.**

1. **Les dessins se RETOURNENT d'une fiche à l'autre, et c'est le meilleur
   enseignement de la série.** Le rectangle d'aire `3(x + 4)` sert deux fois : en
   distributivité on connaît les côtés et on cherche l'aire, en factorisation
   l'aire est donnée en deux morceaux et il faut remonter aux côtés. Le carré de
   côté `x + 3` sert deux fois aussi : on le développe, puis on le reconstitue.
   **Le dessin ne change pas ; la question, si.** Un élève qui retrouve la figure
   comprend d'un regard que ce n'est pas une notion de plus.
2. ⭐ **LES DEUX ERREURS DE LA BANQUE SONT LA MÊME, VUE DES DEUX CÔTÉS.**
   `3(x + 4) = 3x + 4` (on oublie de MULTIPLIER le second terme) et
   `5x + 20 = 5(x + 20)` (on oublie de le DIVISER). La fiche de factorisation le
   dit explicitement à l'élève — aucune des deux fiches ne pouvait le dire seule.
3. ⚠️ **LA BANQUE DES IDENTITÉS NE DEMANDE PAS DE RÉCITER LES FORMULES.** La
   bonne réponse du QCM de `litteral_identite_choisir` est « écrire
   `(x + 7)(x + 7)`, PUIS appliquer la double distributivité ». La méthode de la
   fiche passe donc par le produit, et les trois formules restent cantonnées au
   bloc « La formule ». **C'est la lecture des énoncés qui a tranché, pas mon
   idée du programme.**
4. ⭐ **`figure_libre` SAIT FAIRE QUATRE CASES**, ce que la note du 24/08 ne
   disait pas. `buildPathFromGridPoints` ne connaît qu'un `M` suivi de `L` : le
   `perimeterPath` repasse donc sur trois bords déjà tracés pour atteindre les
   deux traits intérieurs. Rouge sur rouge, **invisible**. C'est le seul moyen
   d'obtenir un carré coupé en quatre avec ce canvas.
   ```
   perimeterPath: [[0,0],[0,8],[8,8],[8,0],[0,0],  // le grand carré
                   [0,5],[8,5],                     // le trait vertical
                   [8,8],[5,8],[5,0]]               // puis l'horizontal
   ```
5. ⚠️ **`vertices` EST UN `Record`, DONC DEUX ÉTIQUETTES IDENTIQUES SE MANGENT.**
   Les deux bandes d'un carré remarquable valent toutes deux `3x`. La seconde
   clé porte une **espace finale** : elle distingue les clés et ne change rien à
   l'écran (SVG replie l'espace finale). `{ "3x": [...], "3x ": [...] }`
6. ⭐ **`showGrid: false` EST UN CHOIX DE FOND, PAS UN RÉGLAGE.** Avec le
   quadrillage, la partie « x » d'un rectangle devient cinq cases comptables,
   c'est-à-dire `x = 5`. Sans lui, elle reste une surface blanche dont on ne
   sait rien — **exactement ce qu'est une inconnue**. Seule la partie constante
   est carrelée, parce que c'est la seule qu'on sache compter.
7. ⚠️ **`algebre` : METTRE `showLabels: false`.** Ses étiquettes de thème sont en
   10 px FIXES (téléphone comme vidéoprojecteur). Sans elles, **aucun texte de
   la page ne descend sous 11 px** — mesuré. Les icônes et le badge du symbole
   suffisent à dire ce qu'est un groupe caché.
8. `calcul_pose` **accepte des termes littéraux** : `numbers: ["2x","3x"]`,
   `result: "5x"` rend une case par caractère, et c'est parfaitement lisible.
   C'est le seul canvas qui montre que réduire, c'est ADDITIONNER des
   coefficients. Sa branche `division` rend en plus une ligne « Vérification :
   dividende = diviseur × quotient + reste » — utile pile pour une équation.
9. ⭐ **`schema_barre` SAIT DESSINER CE QU'ON NE CONNAÎT PAS.** Son champ
   `part.unknown` trace une case ROUGE avec un « ? » de 22 px, à la place de la
   valeur. C'est le seul canvas du catalogue qui le fasse, et c'est exactement
   ce qu'une équation demande : un tout connu, un morceau connu, un trou.
   ⭐ **Et il refuse alors de mettre les parts à l'échelle** : le proportionnel
   ne s'applique que si TOUTES les parts portent un nombre, sinon il revient aux
   tranches égales. Autrement dit le dessin ne fait pas semblant de connaître
   `x`. **C'est le comportement voulu du composant** (lu dans son code avant de
   l'employer), et il faut l'écrire dans la fiche pour qu'on ne le prenne pas
   pour un défaut à la relecture.
10. ⭐ **LE PLUS BEL ITEM DE TOUTE LA SÉRIE EST DANS `equation_defi`**, et il
   était invisible depuis le nom de la micro : « Léo dit : dans 2x + 3 = 11,
   x = 4 car 2 + 3 + 4 = 9 » → l'explication de la banque dit **« MÊME SI x = 4
   EST BIEN SOLUTION, le raisonnement de Léo est faux »**. Un élève qui a juste
   et qui se trompe quand même : c'est le seul endroit du bloc où la
   VÉRIFICATION prouve son utilité. Rien de tout cela ne se devine sans ouvrir
   l'énoncé — c'est l'argument le plus net pour la règle de Frédéric.

⚠️ **Le serveur s'est dégradé une fois de plus au début de cette session** :
`build:fiches-pdf` expirait sur `waitForFunction`, et le navigateur rendait un
**404 sur une route qui venait d'être rendue correctement**. Relancer a suffi, et
les trois PDF suivants sont sortis de la même instance sans un raté. **Recharger
la route dans le navigateur avant de relancer le script** : c'est ce qui
distingue la dégradation du serveur d'un vrai défaut de la fiche.

| fiche | notion | état |
|---|---|---|
| Algorithmique | `algo-programmation` | ✅ publiée, mesurée, PDF (27/08) |
| Volumes | `volume-solide` | ✅ publiée, mesurée, PDF (27/08) |
| Aires | `aire-surface` | ✅ publiée, mesurée, PDF (27/08) |
| Périmètres | `aire-perimetre` | ✅ publiée, mesurée, PDF (27/08) |
| Équations | `equation-resolution` | ✅ publiée, mesurée, PDF (27/08) |
| Distributivité | `litteral-distributivite` | ✅ publiée, mesurée, PDF (26/08) |
| Identités remarquables | `litteral-identite-remarquable` | ✅ publiée, mesurée, PDF (26/08) |
| Factorisation | `litteral-factorisation` | ✅ publiée, mesurée, PDF (26/08) |
| Expressions littérales | `litteral-expression` | ✅ publiée, mesurée, PDF |
| Proportionnalité | `prop-proportionnalite` | ✅ publiée, mesurée, PDF |
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

**Il ne reste aucune notion.** Les vingt sont écrites.

⭐ **CE QUE LES TROIS FICHES DE GRANDEURS ONT APPRIS.** Elles ont été écrites dans
l'ordre périmètre → aire → volume, et cet ordre EST le contenu :

1. ⭐ **LE MÊME DESSIN PORTE DEUX GRANDEURS.** La figure en L et le rectangle
   8 × 3 servent dans la fiche des périmètres ET dans celle des aires. Là-bas on
   compte le trait rouge (18 et 22) ; ici on compte les carreaux (14 et 24), et
   le contour est ÉTEINT (`showPerimeter: false`) pour que le regard aille à
   l'intérieur. **C'est la seule façon de tuer la confusion pour de bon** : deux
   nombres différents lus sur la même figure.
2. ⭐ **`figure_libre` NE MONTRE PAS LA PROPRIÉTÉ, IL LA FAIT.** `showPerimeter`
   SANS `perimeterPath` trace le contour arête par arête, en ne gardant que
   celles qui n'ont pas de voisine remplie. Deux formes séparées → deux contours.
   Deux formes accolées → **le côté commun saute tout seul**. La propriété « les
   côtés cachés ne comptent pas » est donc exécutée par le canvas, pas illustrée.
3. ⭐ **ON COMPTE LES SEGMENTS ROUGES DU DOM POUR VÉRIFIER UN PÉRIMÈTRE**, plutôt
   que de se relire :
   ```js
   [...svg.querySelectorAll('line')].filter(l => l.getAttribute('stroke') === '#dc2626').length
   ```
   Cela a confirmé 18, 22, 26 et 40 = 20 + 20. **Un nombre annoncé dans une
   légende doit être compté dans le DOM.**
4. ⛔ **UN DÉFAUT QUE LE MESUREUR NE VOIT PAS : L'ÉTIQUETTE DANS LA MAUVAISE
   RÉGION.** Les deux « 20 » du triangle coupé par sa diagonale tombaient dans la
   MÊME moitié. Le mesureur compte les polices, les chevauchements et les
   débordements du CADRE — il ignore l'appartenance à une région. Il faut
   comparer à la main l'ordonnée du libellé à celle de la diagonale au même x.
5. ⛔⛔ **`solide_3d` : NE JAMAIS PASSER DE `size`.** Ses sommets sont des
   constantes en pixels ; réduire `size.width` ROGNE au lieu de mettre à
   l'échelle, en silence et sans faire baisser la police. On garde le 340 par
   défaut, et c'est la carte qui met le SVG entier à l'échelle : 19 × 222/340 =
   12,4 px. ⚠️ Et ses libellés se touchent — sur un cylindre, celui de la base est
   à 20 px de celui du rayon, **quel que soit le texte**. La seule sortie est
   `showLabels: false`, qui n'éteint QUE l'étiquette de base : les cotes passent
   par `showDimensions`, la face reste colorée par `highlight.base`. Sur le pavé,
   imposer un `labels.aireBase` court (« base 4 × 3 ») suffit — le défaut « base
   rectangulaire », 18 signes, débordait sur la cote de largeur.
6. ⛔⛔ **`scratch` REND EN HTML : LE MESUREUR NE VOIT RIEN.** Sur la fiche
   d'algorithmique il compte **0 SVG** et répond « 0 petite, 0 chevauchement, 0
   débordement » sans avoir regardé un seul bloc. Le danger n'y est pas la police
   (14 et 12 px, fixes) mais le DÉBORDEMENT : chaque bloc est en `w-fit`, son
   retrait vaut `profondeur × 14` pixels, et rien ne le contraint à sa carte.
   👉 **Contrôle dédié**, à passer sur toute fiche qui emploie `scratch` :
   ```js
   (() => { let marge = 1e9, quoi = '', deborde = 0, blocs = 0;
     document.querySelectorAll('div.max-w-\[380px\]').forEach((carte) => {
       const cs = getComputedStyle(carte), r = carte.getBoundingClientRect();
       const droite = r.right - parseFloat(cs.paddingRight) - parseFloat(cs.borderRightWidth);
       carte.querySelectorAll('div').forEach((b) => {
         if (!b.className.includes('w-fit')) return; blocs++;
         const m = +(droite - b.getBoundingClientRect().right).toFixed(1);
         if (m < 0) deborde++;
         if (m < marge) { marge = m; quoi = b.textContent.trim().slice(0, 40); } }); });
     return { blocs, deborde, margeLaPlusFaible: marge, blocLePlusLarge: quoi }; })()
   ```
   Mesuré sur la fiche : 56 blocs, 0 débordement, marge minimale **20,1 px** en
   375 et **22,4 px** en 1280. Le libellé par défaut de `event` — « 🟩 quand
   drapeau vert cliqué », 28 signes — était le seul à déborder ; remplacé partout
   par « 🟩 quand on clique ».

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
3. Ajouter au **registre**, et ⛔ **retirer la notion du redirect de
   `next.config.ts`** si elle y est — sinon l'adresse redirige vers le hub et la
   fiche neuve est invisible. ✅ Plus aucune notion de 4ᵉ n'y est : les quatre
   adresses éteintes sont revenues, seule la 3ᵉ reste.
   ⭐ **LE SITEMAP N'EST PLUS À TOUCHER (26/08, seconde moitié de journée).** Une
   autre session l'a rendu GÉNÉRATIF : `app/sitemap.ts` fait désormais
   `Object.keys(FICHES_REGISTRE).map(...)`, et les sommaires de niveau se
   déduisent des mêmes clés. **Une ligne au registre suffit** — la fiche est sur
   le site ET au sitemap. Les lignes que j'y avais écrites à la main pour la
   distributivité, les identités et la factorisation ont été remplacées par le
   générateur : c'est normal, et il ne faut pas les remettre.
   ⛔ Ce qui reste écrit à la main dans `ROUTES` et doit y rester : les quatre
   portes (`/fiches-cours` et les trois sommaires de matière) et
   `/fiches-cours/ia/livre`.
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
  ⭐ **`sitemap.ts` SORT DE CETTE LISTE depuis qu'il est génératif** : il n'y a
  plus rien à y ajouter pour une fiche. Le seul fichier vraiment disputé est
  donc `registre.ts`, plus `pdf-disponibles.ts` que le script réécrit seul.
- ⭐ **CE QUI REND LA COHABITATION SUPPORTABLE, mesuré sur trois câblages** : les
  trois chantiers n'écrivent presque jamais dans les mêmes fichiers. L'accueil
  vit dans `app/page.tsx`, les fiches dans `lib/fiches/` et `app/fiches-cours/`.
  L'unique point de contact est `registre.ts`, et une relecture du diff juste
  avant `git commit` a suffi à chaque fois — le fichier avait bougé les trois
  fois, et les trois fois le diff ne contenait que mes lignes.
  👉 **Il n'y a donc pas lieu d'arrêter les autres sessions** pour écrire une
  fiche de maths : le coût de la cohabitation est une commande `git diff`.

## ⭐ LA RÈGLE DU CÂBLAGE, ÉCRITE APRÈS UN 404 ÉVITÉ DE JUSTESSE

**Committer la fiche ET sa page AVANT le câblage, jamais l'inverse.** Une route
déclarée au registre sans fichier suivi casse le site — le hub mène à un 404 et
le sitemap porte une URL morte. Un fichier sans route ne fait qu'attendre.
Le contrôle, avant chaque `push` :
```
git show HEAD:lib/fiches/registre.ts | grep -c '"maths/4e/'
git ls-files app/fiches-cours/maths/4e/ \
  | grep -v '^app/fiches-cours/maths/4e/page.tsx$' | grep -c '/page.tsx$'
```
**Les deux nombres doivent être égaux** — 15 et 15 au soir du 26/08, puis
20 et 20 au matin du 27/08.

⚠️ **LA SECONDE COMMANDE A ÉTÉ CORRIGÉE DEUX FOIS, ET LES DEUX PREMIÈRES
VERSIONS MENTAIENT.** La v1 comptait `… | wc -l` tout court et répondait **16
contre 15** : non parce qu'une fiche manquait au registre, mais parce qu'une
autre session a ajouté **`app/fiches-cours/maths/4e/page.tsx`, le sommaire de la
classe**, qui vit dans le même dossier sans être une fiche. La v2 filtrait sur
`/page.tsx$` — et le sommaire finit lui aussi par `/page.tsx`, donc elle
répondait 16 elle aussi. **Il faut exclure le chemin exact du sommaire, pas un
motif.** La v3 ci-dessus a été LANCÉE avant d'être écrite ici.

⭐ La leçon vaut plus que la commande : **un contrôle se re-mesure le jour où le
dossier qu'il compte change de contenu**, et une correction de contrôle se
vérifie en la lançant. Un contrôle qui crie au loup pour une raison saine est
pire qu'aucun contrôle — le prochain qui le verra rouge le désactivera.

⚠️ Et **relire le diff d'un fichier partagé JUSTE AVANT le `git commit`** :
`git add` prend le fichier tel qu'il est à cet instant, pas tel qu'on l'a lu. Les
trois câblages de cette session ont été relus ainsi ; chaque fois, `registre.ts`
avait bougé entre-temps sous la main d'une session de français.

---

⛔ **ANCIEN POINT EN SUSPENS, RÉGLÉ** : `lib/fiches/registre.ts` et
`app/sitemap.ts` contenaient, en fin de session du 26/08 au matin, le **travail
non commité de la session de français** — seize fiches de 4ᵉ, trois alias, de longs commentaires.
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
