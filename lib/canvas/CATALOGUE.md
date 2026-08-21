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
| `tableau_donnees` | Un tableau (croisé compris), colonnes ou cellules surlignables | Un graphique |
| `probabilites` | Le matériel de l'expérience : dé, roue, urne de billes, tableau à double entrée | Un enchaînement de deux épreuves |
| `arbre_proba` | L'arbre : issues, branches, probabilités portées | Une expérience à une épreuve |
| `fonctionGraphique` | Courbes, droites, nuage de points, avec `misesEnEvidence` pour guider la lecture. ⚠️ **Le seul `kind` en camelCase** | Un tableau de valeurs |
| `fonction_tableau` | Le tableau de valeurs d'une fonction, à trous | La courbe |

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

⛔ **Le réglage qui décide de tout : `largeurMax` (270 par défaut).** Le bloc qui reçoit un
dessin mesure **226 px sur un téléphone de 375** — mesuré sur la fiche, pas estimé. Un SVG
se met à l'échelle de son bloc : dessiné sur 466 px, il y écrit ses mots en 7,8 px. À 270,
le rapport est de 0,84 et les mots restent à 13 px : **la phrase se plie en deux lignes
plutôt que de rapetisser**. Le canvas coupe **entre les groupes**, jamais dedans — sinon
crochet orphelin, étiquette sous un demi-groupe et flèches en diagonale.

---

⚠️ **Un canvas obligatoire** dès que l'intitulé d'une micro décrit un geste graphique
(« lire un diagramme », « tracer », « nuage de points », « tangente », « arbre »…) — et
la figure se fabrique **dans le `generate()`**, pas figée à côté. Le vérificateur
`scripts/verifier-canvas.mjs` sort en erreur si une micro « graphique » n'a aucune figure.
