# Catalogue des canvas — ce que chacun MONTRE

À lire **avant** d'écrire une fiche ou une banque, pour choisir un dessin sans avoir à
relire les 1 300 lignes de [`types_canvas.ts`](../tutor-v4/types_canvas.ts).

La règle qui commande tout est au § 2 bis de [`lib/fiches/REGLES.md`](../fiches/REGLES.md) :
**le canvas se choisit pour ce qu'il montre, pas par habitude.** Deux propriétés voisines
qui portent la même image, ce sont deux règles identiques aux yeux de l'élève.

Rendu par `CanvasRenderer` (`lib/canvas/CanvasRenderer.tsx`) ; dans une fiche, le dessin
se pose sur `figure.schema`, `propriete.schema`, `exemple.schema`, `formule.schema`.

## Les étalons

| Ce qu'on cherche | Où le lire |
|---|---|
| Régler la `size`, fixer `display` une fois, une couleur par point | **2de** — `lib/tutor-v4/questionBank/seconde/maths/reels-intervalles.bank.ts` (droite graduée en `360 × 90`, deux fois plus plate que le défaut : une droite n'a rien à montrer en hauteur) |
| Un helper à options (labels par défaut fusionnés avec ceux de l'appelant) | **3e** — `lib/tutor-v4/questionBank/3e/maths/thales.bank.ts` |
| Un helper simple réutilisé sur six blocs d'une même fiche | `lib/fiches/maths-5e-nombres-relatifs.tsx` (`droite()`) |

## Nombres et calcul

| `kind` | Ce qu'il montre | ⛔ Pas pour |
|---|---|---|
| `number_line` | Une droite graduée et **des points posés dessus** : position, ordre, comparaison, encadrement, intervalles | Un **déplacement** ou une distance — elle dessine des points, pas des sauts |
| `schema_barre` | Un tout découpé en parts bout à bout : la longueur devient visible | Une position sur un axe |
| `calcul_pose` | Une opération posée, virgules alignées, retenues, potence de division | Un calcul mental |
| `fraction` | Une fraction en barre, disque, grille, ou deux fractions comparées | Un calcul sur les fractions (montrer l'objet, pas l'opération) |
| `algebre` | Des objets cachés/visibles derrière un symbole : l'inconnue devient concrète (`theme` : jeu vidéo, surf, requin, margouillat, pièces, eau, déchet, trésor, π) | Une résolution ligne à ligne |
| `suite` | Des termes en cases avec les flèches de passage et la règle | ⚠️ Tout le reste : le composant imprime « Suite » **en titre, en dur**, et étiquette ses cases « terme 1, terme 2 » |
| `tableau_proportionnalite` | Un tableau à trous, coefficient et cellules mises en évidence | Une courbe |

## Géométrie plane

| `kind` | Ce qu'il montre | ⛔ Pas pour |
|---|---|---|
| `triangle` | Un triangle coté, angles marqués, codage des égalités | Une configuration à deux triangles |
| `thales` | La configuration de Thalès, ses deux variantes (triangle et papillon), les rapports | Un triangle isolé |
| `quadrilatere` | Carré, rectangle, parallélogramme, losange, trapèze : côtés, angles, codage | Une aire sur quadrillage |
| `figure_libre` | Une figure quelconque **sur quadrillage** : c'est le canvas des aires et des périmètres composés | Une figure usuelle nommée |
| `angle` | Un angle seul, avec sa mesure | Deux angles à comparer |
| `droites` | Plusieurs droites, leurs intersections, parallèles et perpendiculaires marquées | Une droite graduée |
| `cercle` | Cercle avec rayon, diamètre, corde, arcs | Un disque à colorier pour une fraction |
| `transformation` | Une figure et son image : symétrie axiale, centrale, translation, rotation | Un agrandissement |
| `homothetie` | Le centre, le rapport k, la figure et son image — et **les droites issues de O**, prolongées | Une transformation qui conserve les longueurs |
| `reperage` | Un repère du plan, des points, un chemin | Une courbe de fonction |

## Espace

| `kind` | Ce qu'il montre | ⛔ Pas pour |
|---|---|---|
| `solide_3d` | Pavé, cube, prisme, cylindre, cône, pyramide, boule, avec dimensions et face surlignée | Une section |
| `section_solide` | Le solide **et le plan qui le coupe** : la section apparaît | Un patron |
| `repere3d` | Un repère de l'espace, points et segments | Une vue de solide plein |

## Données, probabilités, fonctions

| `kind` | Ce qu'il montre | ⛔ Pas pour |
|---|---|---|
| `stat_graph` | Barres, bâtons, camembert — la série mise en image | Un tableau de valeurs |
| `diagramme_boite` | Le diagramme en boîte : min, Q1, médiane (en rouge), Q3, max, l'accolade Q3 − Q1 en option. Plusieurs séries s'empilent pour se comparer | Les effectifs d'une série : c'est `stat_graph` |
| `tableau_donnees` | Un tableau (croisé compris), colonnes ou cellules surlignables | Un graphique |
| `probabilites` | Le matériel de l'expérience : dé, roue, urne de billes, tableau à double entrée | Un enchaînement de deux épreuves |
| `arbre_proba` | L'arbre : issues, branches, probabilités portées | Une expérience à une épreuve |
| `fonctionGraphique` | Courbes, droites, nuage de points, avec `misesEnEvidence` pour guider la lecture. ⚠️ **Le seul `kind` en camelCase** | Un tableau de valeurs |
| `fonction_tableau` | Le tableau de valeurs d'une fonction, à trous | La courbe |
| `tableau_signes` | Le tableau de signes : 1 à 3 facteurs, produit **ou quotient**. Chaque ligne porte un signe par intervalle et une marque sur les bornes intérieures — `0` si le facteur s'annule, `\|\|` si la valeur est **interdite** | Les variations : c'est `tableau_variations` |
| `tableau_variations` | Le tableau de variations : les flèches, avec sa ligne `f ′(x)` facultative | Le signe d'un produit ou d'un quotient |


### `diagramme_boite` — ajouté le 11/09/2026

Il manquait : `stat_graph` ne sait faire que barres, bâtons et camembert, et le
programme de seconde demande de **résumer une série par cinq nombres** puis de
comparer deux séries d'un coup d'œil. Sans lui, la médiane et les quartiles
n'existaient que comme des nombres dans une phrase.

```ts
{
  kind: "diagramme_boite",
  titre: "Deux classes",
  series: [
    { label: "2de A", min: 4, q1: 9, mediane: 12, q3: 15, max: 20 },
    { label: "2de B", min: 7, q1: 11, mediane: 13, q3: 14, max: 18,
      couleur: "#059669" },
  ],
  min: 0, max: 20, step: 2,
  display: { showEcartInterquartile: true },
}
```

Trois choses valent d'être sues :

- **La médiane est en rouge**, plus épaisse que le trait de la boîte : c'est
  elle qu'on cherche en premier, et à trait égal elle se confondait avec le bord
  de la boîte quand Q1 ou Q3 s'en approchait.
- **Les cinq nombres s'empilent quand ils se touchent**, et un nombre répété ne
  s'écrit qu'une fois. Sur une série resserrée où Q1 = médiane = Q3, trois « 10 »
  s'empilaient l'un sur l'autre et se lisaient comme trois valeurs.
- **Les bornes de l'axe se calculent** quand `min`/`max` sont omis. Une borne
  devinée coupe une moustache, et une moustache coupée se lit comme un maximum
  au mauvais endroit.

Quatre couleurs ont un fond assorti : `#2563eb` (bleu, par défaut), `#059669`
(vert), `#c2410c` (orange), `#7c3aed` (violet). Une autre teinte prend le fond
bleu.

### `arbre_proba` — photographié le 08/09/2026, et deux défauts corrigés

Il avait servi pendant des semaines sans qu'on le regarde. Deux mesures l'ont
repris :

⛔ **Il COUPAIT les étiquettes de feuilles longues.** La dernière colonne se pose
à `x = 320` et son étiquette s'écrit à `x + 8`, sans borne, dans un cadre de 360.
« Test positif » sortait — quatre étiquettes perdues d'un coup, sans erreur ni
avertissement. Le cadre s'élargit désormais à la plus longue : mesuré, 360 reste
360 pour `T+` / `P` / `D`, et passe à 428 pour « Test positif ». Les arbres
existants ne bougent pas d'un pixel.

⛔ **L'étiquette d'un nœud INTÉRIEUR se posait à sa droite, sur ses propres
branches.** Frédéric, en regardant le rendu : « Malade et Sain doivent être
centrés sur le nœud, et toi tu les fais démarrer au nœud, donc ils cachent une
partie des deux branches. » Elles se posent maintenant AU-DESSUS. Une feuille,
elle, n'a pas de branche sortante : son étiquette reste à droite.

**Mesuré après correction** : rien hors cadre, aucun chevauchement de textes,
police minimale 12 px.

### `tableau_signes` et `tableau_variations` — deux objets, deux `kind`

Séparés à la demande de Frédéric le 07/09/2026 : le professeur les trace pour
deux raisons différentes, et un type unique obligeait chaque appel à préciser ce
qu'il ne voulait pas.

⛔ **`tableau_signes` est en HTML, pas en SVG**, et c'est délibéré. Un libellé de
ligne doit pouvoir s'écrire `$\dfrac{x-4}{-x+6}$` — or KaTeX ne rend rien dans un
`<text>` SVG. La première version affichait « le quotient » en toutes lettres,
faute de pouvoir écrire la fraction. Tous les libellés passent par `TexteMath`.

⛔ **La double barre n'est pas un zéro.** Sur un quotient, la valeur qui annule le
dénominateur est INTERDITE : `"||"` et non `"0"`. Les confondre, c'est enseigner
qu'on peut diviser par zéro.

⛔ **Les flèches de `tableau_variations` ne se décrivent pas, elles se déduisent**
des valeurs données à chaque borne. Décrire les flèches à la main laisserait
écrire une flèche montante entre 9 et 4 — un dessin contredisant ses propres
nombres. La lecture des valeurs accepte le **moins typographique** (`−`, U+2212)
et la virgule décimale : `Number("−4")` vaut `NaN`, et une flèche serait partie à
l'envers sans la moindre erreur.

**Mesuré au rendu** (07/09/2026) : le cas le plus large — trois facteurs, cinq
colonnes — tient en 384 px sans débordement, avec 43 px entre deux nombres
voisins.

## Grandeurs et mesures

| `kind` | Ce qu'il montre | ⛔ Pas pour |
|---|---|---|
| `duree` | Horloge, affichage digital, frise début → fin | Une durée en calcul posé |
| `masse` | Balance à deux plateaux, objets à peser, conversions | Une contenance |
| `contenance` | Récipients à remplir, comparaison, conversions | ⛔ Une masse, **et surtout pas une longueur** : la variante `conversion` imprime « 1 L = 1000 mL » **en dur** sous la figure. Sur « 3,5 km = 3500 m » elle affiche donc une relation de contenances sous une longueur — faux, et invisible au typecheck. Une longueur se montre en `schema_barre` (les km mis bout à bout). |
| `echelle` | Plan et réel côte à côte, l'échelle qui les relie | Un agrandissement de figure |

## Algorithmique

| `kind` | Ce qu'il montre | ⛔ Pas pour |
|---|---|---|
| `scratch` | Des blocs d'instructions empilés, à la Scratch | Un tableau d'exécution |

## Français

| `kind` | Ce qu'il montre | ⛔ Pas pour |
|---|---|---|
| `phrase` | **Le canvas du français** : les mots en étiquettes, les groupes sous un crochet coloré, la nature au-dessus, les flèches d'accord, de question et de reprise par-dessus | Un texte de plusieurs phrases (les reprises d'un paragraphe), un tableau de conjugaison |
| `conjugaison` | **Le canvas du verbe** : la forme verbale démontée en wagons (radical, marque de temps, marque de personne), les temps composés en deux caisses accrochées, le tableau des six personnes, et la frise passé/présent/futur | Une phrase (c'est `phrase`), une durée sur une horloge (c'est `duree`) |

## Illustration — le cycle 2

| `kind` | Ce qu'il montre | ⛔ Pas pour |
|---|---|---|
| `personnage` | **Le premier canvas qui ILLUSTRE** : un enfant de la troupe qui fait quelque chose, sa bulle de BD, et une consigne de coloriage. Rendu au trait noir fermé (mode `coloriage`) ou en couleurs (mode `couleur`) | Analyser une phrase (c'est `phrase`), démonter un verbe (c'est `conjugaison`), décorer une fiche de collège |
| `objets` | **La bibliothèque** : 22 objets du quotidien, de la nature et des animaux, posés en grille, avec leur mot et le nombre d'exemplaires. Sert à NOMMER et à CLASSER | Une quantité à calculer (`schema_barre`, `fraction`), une figure géométrique |
| `reglure` | **La réglure Seyès** : des lignes d'écriture aux millimètres du cahier, avec le modèle en cursive et sa reprise en pointillé. Le seul canvas qui ne montre rien — il se remplit | Montrer une lettre isolée, mesurer une longueur (`schema_barre`) |

C'est à la grammaire ce que `number_line` est aux nombres : **un seul objet, dessiné
toujours pareil, sur lequel toutes les notions viennent se poser**. Avant d'en écrire un
autre, vérifier que celui-ci ne suffit pas — il porte déjà six façons de montrer :

| Ce qu'on veut montrer | Comment | Rendu |
|---|---|---|
| Le découpage en groupes | `groupes: [{ mots: [0,1], label: "sujet" }]` | crochet coloré + étiquette de fonction |
| La question qui trouve une fonction | `liens: [{ de: verbe, vers: mot, label: "à qui ?", type: "question" }]` | arc violet au-dessus, fléché |
| Un accord | `type: "accord"` (`label: "pluriel"`, `"-ent"`, `"="`) | arc noir au-dessus, du mot chef vers le mot accordé |
| Une reprise (pronom → GN) | `type: "reprise"` | arc bleu **pointillé sous** la phrase |
| La mobilité d'un groupe | `deplacable: true` | le groupe redessiné en fantôme à l'autre bout, avec sa flèche |
| La suppression | `mots: [{ texte: "ce", barre: true }]` | l'étiquette barrée en rouge |
| Nature ≠ fonction | `mots: [{ texte: "chat", nature: "nom" }]` + un `groupe` | la nature en gris au-dessus, la fonction en couleur en dessous |

⭐ **La couleur porte la fonction dans toute la matière** — sujet bleu, verbe rouge, objet
vert, circonstanciel orange, attribut violet, expansion du nom rose. Elle se déduit du
`label` : une fiche écrit `label: "sujet"`, jamais une couleur. Deux fiches ne peuvent
donc pas diverger. ⚠️ L'ordre des tests compte : « attribut du sujet » contient « sujet ».

⛔ **Le réglage qui décide de tout : `largeurMax` (250 par défaut).** Le bloc qui reçoit un
dessin mesure **226 px sur un téléphone de 375** — mesuré sur la fiche, pas estimé. Un SVG
se met à l'échelle de son bloc : dessiné sur 466 px, il y écrit ses mots en 7,8 px. À 270,
le rapport est de 0,84 et les mots restent à 13 px : **la phrase se plie en deux lignes
plutôt que de rapetisser**. Le canvas coupe **entre les groupes**, jamais dedans — sinon
crochet orphelin, étiquette sous un demi-groupe et flèches en diagonale.

---

### `conjugaison` — les quatre modes, et celui qui ne va pas partout

Ajouté le 23/08/2026. Frédéric : « on ajoute un canvas, à cet âge il faut des
dessins », « ou schéma ludique ». Il a fallu le créer parce que `phrase`
s'interdit lui-même « un tableau de conjugaison » : les quatre notions de
conjugaison de la 6e n'avaient donc AUCUN dessin possible.

**Une forme verbale est un mot ASSEMBLÉ** — le BO parle de « la composition de
la terminaison » et de « la composition EN DEUX PARTIES » des temps composés.
D'où les wagons : chaque morceau est une caisse sur ses roues, et la forme
verbale est le train. La métaphore n'est pas un décor, elle dit la règle.

| `mode` | Ce qu'il montre | Où le poser |
|---|---|---|
| `wagons` (défaut) | radical + marque de temps + marque de personne, accrochés | partout |
| `composee` | auxiliaire + participe passé, avec la flèche d'accord — ou la **croix** qui dit son absence | partout |
| `tableau` | les six personnes, la partie qui varie en relief (`alerte`) | partout |
| `frise` | passé / présent / futur, pour la valeur des temps | ⛔ **bloc d'exemple ou de méthode uniquement** |

⛔ **LA FRISE NE VA PAS DANS UNE CARTE DE PROPRIÉTÉ.** Elle porte trois zones
qui doivent rester lisibles : sa largeur naturelle est de ~420 px. Dans une
carte sur trois colonnes (250 px) elle tombe à **8 px de police** — mesuré,
et `scripts/apercu-canvas.mjs` la refuse. Baisser sa police serait la mauvaise
réparation : c'est la largeur qui manque, pas la place.

⚠️ **Les `note` sous les wagons se comptent en caractères.** C'est la note, et
non le mot, qui fixe la largeur d'un wagon : « 1re p. plur. » (12 signes) pousse
le dessin à 303 px, donc à 11,2 px de police dans une carte de 250. Viser
**huit caractères** — « imparfait », « nous », « radical ».

⭐ La couleur porte le rôle, comme la fonction dans `phrase` : radical bleu,
marque de temps orange, marque de personne verte, auxiliaire rouge (la même
couleur que le verbe conjugué ailleurs), participe passé violet. Une fiche écrit
`role: "temps"`, jamais une couleur.

---

### `personnage` — la troupe du cycle 2, en couleur ET en noir et blanc

Ajouté le 01/09/2026. Frédéric : « apprendre les notions avec des personnes de BD
à colorier », « ou de nature », « qu'elles puissent aussi être en couleur et noir
et blanc ». C'est le **premier canvas illustratif** du site : les 32 autres sont
mathématiques ou grammaticaux, et aucun ne dessine un être vivant.

⭐ **Le coloriage est l'EXERCICE, pas la décoration.** C'est ce qui sépare ce
canvas d'un cahier de vacances : « colorie en rouge ce que le personnage FAIT »
est un repérage du verbe, et la couleur demandée est déjà celle de la matière
(sujet bleu, verbe rouge, objet vert). L'enfant construit au CP le code qu'il
relira au CM1 dans `phrase`.

⭐ **Et il règle le problème de l'impression noir et blanc** — « les profs n'ont
pas d'imprimante couleur ». Ailleurs la couleur porte la fonction et meurt au
photocopieur ; ici elle n'est pas imprimée, elle est POSÉE par l'élève.

| | |
|---|---|
| `personnage` | `nina` (couettes) · `teo` (épis) · `zoe` (boucles, lunettes) · `ravi` (casquette) · `pic`, le paille-en-queue |
| `pose` | `debout` · `montre` (le bras tendu vers la bulle) · `bras_leves` · `marche` · `assis` (en tailleur) |
| `expression` | `sourire` · `rire` · `surpris` · `pense` · `triste` · `yeux_fermes` |
| `bulle.forme` | `parole` · `pensee` (nuage) · `cri` (en éclats) — ⭐ **la forme EST la leçon** : déclarative, pensée, exclamative |
| `bulle.marques` | `majuscule` et/ou `point` : le signe est ENTOURÉ dans la bulle |
| `mode` | `coloriage` (défaut) · `couleur` |

⛔ **`pic` ignore `pose` et `expression`** — c'est un oiseau. Il tient dans 112
unités de haut là où un enfant en occupe 150 ; le canvas le remonte lui-même.

⭐ **TOUT EST FERMÉ, RIEN N'EST UN TRAIT.** Un membre dessiné au trait épais est
un trait NOIR : on ne peut pas le colorier. Chaque membre est donc tracé deux
fois — un trait sombre large, puis un trait clair plus fin par-dessus — ce qui
donne une capsule cernée, donc une zone fermée, sur le papier comme à l'écran.

⚠️ **Le texte de la bulle se pose MOT PAR MOT**, chaque mot contraint à sa
largeur calculée (`textLength` + `lengthAdjust="spacingAndGlyphs"`). C'est la
seule façon de faire tomber une marque sur une lettre précise. Deux réglages
mesurés au rendu, pas estimés : la largeur moyenne d'un caractère vaut **0,52 ×
la police** et non 0,58 (« Le chat dort. » était annoncé à 121 px pour 100
réels, et le rond du point flottait 18 px à droite du point) ; et **chaque
lettre a son poids** — un point occupe le quart d'un « d », une moyenne le
décalait d'une demi-lettre.

---

### `objets` — la bibliothèque du cycle 2

Ajoutée le 02/09/2026. Frédéric : « on pourrait rajouter bateau, un verre, des
objets du quotidien non ? », « avoir une bibliothèque plus fournie ».

⭐ **Pourquoi un second `kind` plutôt qu'élargir `personnage`.** Un verre n'a ni
pose ni humeur : lui donner les champs d'un enfant, ce serait dire à la fiche
qu'un verre peut être triste. Et les deux ne servent pas la même chose —
`personnage` montre une **action** (le verbe, la phrase, le dialogue), `objets`
sert à **nommer et classer** (vocabulaire, genre, familles de mots).

Les 22 : `bateau` `verre` `tasse` `livre` `cartable` `cle` `ballon` `voiture`
`maison` `chapeau` · `pomme` `banane` · `arbre` `fleur` `feuille` `soleil`
`nuage` `etoile` · `poisson` `oiseau` `papillon` `chat`.

⭐ **`nombre` est ce qui en fait un exercice.** Une pomme, puis trois pommes : le
pluriel devient VISIBLE avant d'être une règle. Les exemplaires se chevauchent
d'un tiers — trois objets côte à côte à pleine taille ne tiendraient pas.
`marque: true` entoure une case en pointillés : c'est la réponse à trouver.

⛔ **C'EST LE MOT LE PLUS LONG QUI DÉCIDE DU NOMBRE DE COLONNES.** Sur cinq
colonnes de 360 px, chaque objet reçoit 73 px de pas — quand « une banane » en
occupe 73 à lui seul, et « une maisonun chapeau » se lisait d'un bloc. Élargir
l'écart puis rapetisser la police n'ont fait que déplacer le chevauchement : la
ligne était **trop pleine**, il fallait retirer une colonne. Le canvas plafonne
donc lui-même ses colonnes. ⭐ **Compter ~90 px par objet étiqueté.**
⚠️ Et ce défaut-là, `apercu-canvas.mjs` ne le voit pas : les mots se touchaient
**l'un l'autre**, pas le bord du cadre.

⭐ **Ajouter un objet, c'est une entrée dans `DESSINS` et une couleur dans
`TEINTES`** — le placement, l'échelle, la répétition, l'étiquette et la marque
sont gérés une fois pour toutes. Chaque dessin tient dans une boite de 60 × 60,
en formes FERMÉES : un trait épais est un trait noir, et on ne colorie pas un
trait.

---

### `reglure` — la calligraphie, aux millimètres du cahier

Ajoutée le 02/09/2026. Frédéric, en posant le format du cycle 2 : « avec
l'importance aussi de la calligraphie ». ⭐ **C'est le quatrième geste de la
feuille** : regarder, écouter, colorier, TRACER. Sans elle, « la fiche se fait
au crayon » restait un slogan — il n'y avait aucune place où écrire.

⭐ **Le seul canvas qui ne montre rien : c'est un espace à remplir.** Il se juge
donc sur une EXACTITUDE, pas sur une lisibilité. La géométrie du Seyès en une
phrase : une bande d'écriture fait **quatre interlignes**, sa ligne du bas est
forte, les trois autres sont fines, et des verticales tombent tous les 8 mm. Le
corps de la minuscule occupe **un** interligne.

| | |
|---|---|
| `interligne` | en mm — **3 au CP**, 2,5 au CE1, 2 au CE2, comme les cahiers |
| `modele` | le mot ou la phrase, en cursive sur la première ligne |
| `aRepasser` | le modèle en pointillé sur la deuxième : on lit, on repasse, on écrit seul |
| `depart` | un point vert là où le crayon se pose |
| `lignes` | 3 par défaut, 8 au maximum |

⭐⭐ **LA POLICE EST CELLE DE L'ÉCOLE : MARELLE**, embarquée le 02/09/2026.
Cursive libre conçue **pour l'enseignement de l'écriture à l'école élémentaire**
par sept enseignants et designers, soutenue par la Direction du numérique pour
l'éducation, développée dans la Forge des communs numériques éducatifs.
⚖️ **SIL Open Font License 1.1** — donc utilisable sur un site commercial, à
condition de livrer le texte de licence : il est dans
`public/fonts/marelle/LICENSE.txt`. ⚠️ Le dépôt de Marelle est en GPLv3 « à
l'exception des polices » : c'est le fichier `LICENSE` qui fait foi, pas le
README. Déclarée dans `app/globals.css`.

⭐ **`ecriture` : `cursive` (défaut) ou `baton`** — « cursive » recouvre deux
écritures que le CP apprend séparément : attachée, et script (« bâton »), celle
qu'on lit dans les livres avant de savoir attacher.

⛔ **LE FACTEUR DE TAILLE DÉPEND DE LA POLICE.** `policeModele = interligne ×
1,55` est calé sur Marelle ; il valait 1,9 pour Segoe Script, et garder l'ancien
faisait sortir les majuscules par le haut de la bande — l'erreur même que la
réglure doit apprendre à éviter. ⚠️ Ne jamais changer la police sans rejuger ce
nombre au rendu.

⭐⭐ **TROIS LIGNES, JAMAIS DEUX** (Frédéric, 02/09/2026). Elles sont les trois
temps du geste : la 1re porte le **modèle**, la 2e le **pointillé** qu'on
repasse, la 3e est **vide** — c'est là que l'enfant écrit seul. À deux lignes,
l'exercice s'arrête au repassage.

---

⚠️ **Un canvas obligatoire** dès que l'intitulé d'une micro décrit un geste graphique
(« lire un diagramme », « tracer », « nuage de points », « tangente », « arbre »…) — et
la figure se fabrique **dans le `generate()`**, pas figée à côté. Le vérificateur
`scripts/verifier-canvas.mjs` sort en erreur si une micro « graphique » n'a aucune figure.
