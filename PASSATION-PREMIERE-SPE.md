# Passation — le chantier de la première spé maths

> Écrit le 11/09/2026, à la fin de la session qui a terminé la seconde.
> À coller tel quel au début de la nouvelle session.

---

## Ce qu'on fait

**Les fiches de cours de première spécialité maths**, dans l'ordre du premier
trimestre, en commençant par le **second degré** (équation, discriminant Δ,
résolution, polynôme du second degré, forme canonique, signe du trinôme).

Frédéric enseigne cette année **une seconde** — les fiches de seconde sont
terminées, quinze notions — et il passe à la première spé.

---

## ⭐ LA PROCÉDURE, DICTÉE PAR FRÉDÉRIC, DANS CET ORDRE

> « procédure : vérifie le coach de la notion puis créer la fiche »
> « regarde si le coach est robuste comme d'habitude » · « puis renforce coach
> si nécessaire puis on construit la fiche »

1. **Mesurer le coach de la notion** (scripts plus bas).
2. **Le renforcer s'il y a un trou** — et le trou n'est presque jamais celui
   que les vérificateurs signalent (voir « Coach vert, exercice type absent »).
3. **Écrire la fiche**, puis **son PDF**, puis vérifier qu'il est au sitemap.
4. **Mesurer la fiche au rendu**, en 1280 px ET en 375 px.
5. Commit. Push par lots, mais **toujours avant une passation**.

> « à chaque fois sur les fiches on fait le pdf » — c'est un rappel, pas une
> option.

---

## ⛔ LE PIÈGE QUE J'AI FAILLI POSER, ET QUI COÛTERAIT UNE JOURNÉE

Il existe **DEUX premières** dans le dépôt, et elles ont des programmes
différents :

| dossier | ce que c'est | le discriminant |
|---|---|---|
| `lib/tutor-v4/questionBank/premiere/maths/` | première **technologique** (BOP1MQ) | ⛔ **HORS PROGRAMME**, la banque l'interdit explicitement dans son en-tête |
| `lib/tutor-v4/questionBank/premiere-spe/maths/` | première **spécialité** | ✅ c'est le cœur du chapitre |

**C'est `premiere-spe` qu'on travaille.** J'ai mesuré le mauvais dossier
pendant cinq minutes et j'ai bien failli annoncer « le discriminant n'existe
nulle part » — alors qu'il a 133 occurrences dans la bonne banque.

Les fiches de spé vivent sous :
- `app/fiches-cours/maths/premiere-spe/<slug>/page.tsx`
- `lib/fiches/maths-premiere-<notion>.tsx`
- `classe: "premiere-spe"` dans la donnée de la fiche
- clé de registre : `"maths/premiere-spe/<slug>"`

---

## L'ÉTAT DES LIEUX, MESURÉ LE 11/09/2026

### Le coach : douze banques, bien fournies

```
  banque                       micros  items  gabarits
  algorithmique                  10      94      21
  derivation                     12     130      31
  exponentielle                  11     113      26
  geometrie-reperee              10      85      17
  logique-ensembles              13     158      26
  probabilites-conditionnelles   11     102      22
  produit-scalaire               11     109      22
  second-degre                   11     120      29
  suites                         12     134      27
  trigonometrie                  11     119      22
  variables-aleatoires           10      96      21
  variations-fonctions           10     121      21
```

**1 381 items, 132 micros.** Médiane : 42 énoncés générés par micro.

⚠️ **43 micros sont sous le seuil de 12 énoncés générés**, et **5 micros n'ont
qu'un seul gabarit** — le mode complet du coach oppose deux questions et exige
deux items (`verifier-demarrage.ts`) : `log_reciproque`, `gr_parabole`,
`algo_listes`, `gr_cercle`, `gr_vecteur_normal`.

### Les fiches : UNE sur douze

Seule `derivation` existe (`lib/fiches/maths-premiere-derivation.tsx`,
`app/fiches-cours/maths/premiere-spe/derivation/`). **Onze notions n'ont
aucune fiche.**

### Le second degré, la notion à faire en premier

11 micros, 120 items, 29 gabarits :

```
  15  sd_canonique          forme canonique, sommet, axe
  14  sd_factorisation      factoriser un trinôme
  13  sd_racines            résoudre une équation du 2d degré
  13  sd_discriminant       Δ = b² − 4ac
  12  sd_signe              signe d'un trinôme
  10  sd_somme_produit      somme et produit des racines
  10  sd_forme_adaptee      choisir la forme selon la question
  10  sd_deux_racines
   9  sd_completion_carre
   7  sd_inequation
   7  sd_forme_factorisee
```

**Dette de renouvellement : une seule micro**, `sd_forme_adaptee` — 11 énoncés
générés pour 2 gabarits et 8 items figés, donc juste sous le seuil de 12.

⚠️ **Mais ça ne prouve rien.** Voir le paragraphe suivant, c'est le plus
important de ce document.

---

## ⛔⛔ CE QUI COMPTE VRAIMENT : « COACH VERT, EXERCICE TYPE ABSENT »

**Trouvé trois fois en trois jours sur la seconde.** Une notion peut avoir
toutes ses micros servies, des générateurs partout, zéro dette de
renouvellement — **et ne jamais poser la question du contrôle.** Parce que les
micros sont des GESTES ISOLÉS et qu'un exercice de devoir est un ENCHAÎNEMENT
de gestes.

Exemples réels, tous invisibles à tous les vérificateurs :

- **statistiques (11/09)** : tout item de quartile *donnait* déjà Q₁ et Q₃ ;
  pas un seul ne demandait de les DÉTERMINER. Les deux gabarits de médiane
  servaient une suite arithmétique DÉJÀ ORDONNÉE, donc jamais le geste
  « j'ordonne d'abord ». Le diagramme en boîte n'existait nulle part.
- **puissances, repère, vecteurs** : même forme, trois fois.

**Le seul test qui le voit** : prendre un vrai sujet — un contrôle, un DS, un
exercice de manuel — et chercher, question par question, l'énoncé
correspondant dans la banque. Aucun script ne remplace ça.

Pour le second degré, les questions de devoir à chercher nommément :

- résoudre $ax^2 + bx + c = 0$ **quand Δ < 0** (l'élève doit conclure « pas de
  solution », pas calculer une racine de nombre négatif) ;
- résoudre **une inéquation** du second degré, avec le tableau de signes ;
- **passer de la forme développée à la forme canonique**, et dire à quoi elle
  sert (le sommet, l'extremum) ;
- un **problème** qui débouche sur une équation du second degré (aire, trajet,
  optimisation) — le geste « je mets en équation » ;
- **factoriser en connaissant une racine évidente** ;
- **choisir la bonne forme** selon la question posée (c'est `sd_forme_adaptee`,
  et c'est justement la micro en dette).

---

## LES OUTILS DE MESURE, ET COMMENT LES LANCER

```bash
npx tsx scripts/verifier-renouvellement.ts premiere-spe maths
```
Compte les énoncés que le coach sait FABRIQUER, par micro. Seuil : 12.

⭐ **Sa clé porte maintenant le canvas** (corrigé le 11/09). Avant, elle
signait une question par son texte et ses propositions seulement, et
réclamait une dette sur des gabarits dont la variation est dans le DESSIN.
⚠️ `scripts/mesurer-vivier.ts` garde l'ancienne clé et sous-compte les mêmes
gabarits — à corriger si on s'en sert.

Les autres : `verifier-banque.mjs`, `verifier-variete-notion.ts`,
`verifier-latex.ts`, `verifier-micros.mjs`, `mesurer-fiches.mjs`,
`mesurer-mode-classe.mjs`.

⭐ **Et surtout : RECALCULER INDÉPENDAMMENT chaque générateur neuf.** Écrire un
script jetable qui tire 500 à 600 fois, relit l'ÉNONCÉ produit (pas la formule
du gabarit), refait le calcul et compare. C'est la seule chose qui attrape :

- un distracteur qui devient la bonne réponse selon le tirage ;
- un piège qui ne pique pas (sur la série en désordre, une fois sur *n*, la
  valeur au milieu de la liste mélangée ÉTAIT la médiane) ;
- un énoncé qui ne varie pas parce que toute la variation est dans le dessin.

---

## LES RÈGLES DE FICHE, TOUTES MESURÉES

### ⭐ Deux colonnes, trois seulement si le contenu est léger

Règle affinée par Frédéric le 11/09 : « fais deux colonnes et non pas trois,
sauf si l'intérieur des colonnes a peu de texte ». C'est **automatique**, dans
`grilleColonnes()` de `components/fiches/FicheCoursClient.tsx` — on n'écrit
rien dans la fiche. Trois conditions pour passer à trois :

1. aucune carte ne porte de schéma ;
2. le plus long texte tient en **180 signes** ;
3. les cartes ne sont **pas au nombre de 4** (sinon une orpheline sur la 2ᵉ ligne).

À l'impression : **`grid-cols-2` partout**, quoi qu'il arrive.

En pratique, une fiche de lycée a des schémas partout → **deux colonnes de bout
en bout**. Ne pas y penser.

### ⭐ Des schémas, pas des tableaux — mais pas aveuglément

> « fiche vecteur parfaite, mieux vaut des schémas que des tableaux »
> « j'ai du mal avec les tableaux, je préfère dessin et schéma »
> « tu n'auras pas de pb de largeur, et utilise les couleurs »

⚠️ Mais aussi : « parfois les tableaux sont bons même si les élèves préfèrent
schéma, ça dépend — il faut que je regarde fiche par fiche ».

⛔ **J'ai effacé 14 tableaux de la fiche du repère pour rien.** Frédéric :
« tu as effacé les tableaux ? il était clair, juste un problème de mettre en
deux colonnes ». **Mesurer la LARGEUR avant de toucher au CONTENU.**

Les aides sont dans `lib/fiches/schemas.tsx` : `egalite`, `egalites`, `cas`,
`etapes`, `enRouge` / `enBleu` / `enVert`, `ROUGE` / `BLEU` / `VERT`.

### ⛔ La carte qui déborde en poche (corrigé le 11/09, à connaître)

Un élément de grille porte `min-width: auto` : il refuse de descendre sous la
largeur minimale de son contenu. Une formule KaTeX ne se coupe pas → **elle
poussait la carte hors du cadre**, sans barre de défilement et sans erreur. La
fiche des racines carrées débordait de **164 px** à 375 px.

Trois gestes, déjà en place : `min-w-0` sur les cartes, `overflow-x-auto` et
`whitespace-nowrap` sur chaque ligne de formule.

⚠️ **Une formule sur plusieurs lignes n'est PAS un défaut.** « AB = √(…) = 5 »
qui passe à la ligne après un signe égal se lit comme une phrase. Le défaut,
c'est une **fraction ou un radical coupé en deux**. J'ai accusé à tort les
fiches du repère et des vecteurs avec le mauvais critère — Frédéric l'avait dit
avant la mesure : « les fiches de seconde qu'on a faites hier et avant-hier
étaient bonnes ».

### La règle de largeur d'un dessin

**viewBox ≤ la largeur de la carte EN POCHE**, pas sur l'écran de bureau. Le
SVG se met à la largeur de sa carte (`w-full`) : un viewBox plus large rétrécit
le texte d'autant. Mesuré : une carte de fiche à deux colonnes fait **225 px**
en poche ; un viewBox de 320 avec `fontSize 12` donne **8,7 px** à l'écran.

⛔ Les blocs d'une fiche n'ont pas tous la même largeur : **225 px en
propriétés, 80 px en exemples**.

---

## LE MODE CLASSE EST LE CRITÈRE D'ACCEPTATION

> « en mode classe c'est parfait » · « les carrés parfaits, même s'ils sont
> cassés en mode classe, ils sont supers »

Le mode classe donne **toute la largeur** : un tableau peut être cassé sur le
web et parfait projeté. Dans ce cas **c'est la carte web qui cède, pas le
contenu**. Frédéric enseigne en direct depuis le site — c'est son outil de
classe. Trois rendus par fiche : page web, **mode classe** (un bloc par diapo
plein écran), **PDF** A4.

---

## LA STRUCTURE D'UNE FICHE

Donnée : `lib/fiches/maths-premiere-<notion>.tsx` exporte un `FicheCoursData`
et un tableau `ClasseSlide[]` (souvent une seule diapo « objectif », le reste
se dérive).

Rubriques : `identite, definition, figure, proprietes, reel, historique,
methode, usages, exemples, pieges, aRetenir, entrainement` — plus
`coachHref: "/coach-ia/maths?classe=premiere-spe"` (⛔ obligatoire, le
typecheck le réclame).

Page mince : `app/fiches-cours/maths/premiere-spe/<slug>/page.tsx`.
Registre : `lib/fiches/registre.ts`, clé `"maths/premiere-spe/<slug>"`.

**Prendre `lib/fiches/maths-seconde-statistiques.tsx` comme étalon** — c'est la
plus récente et elle porte toutes les règles en vigueur.

### Le PDF

```bash
# 1. lancer SON PROPRE serveur (3000 est pris par l'autre poste)
npx next dev -p 3021

# 2. depuis PowerShell (⛔ PAS Git Bash : il mange le / initial du chemin)
node --experimental-strip-types scripts/build-fiches-pdf.ts `
  http://localhost:3021 /fiches-cours/maths/premiere-spe/<slug>
```

⛔ **Une fiche à la fois.** Une fournée s'arrête à la première route qui expire.
⛔ **Redémarrer le serveur avant une fournée** : le rechargement à chaud perd la
feuille d'impression et le script expire sans dire pourquoi.

Le script réécrit `lib/fiches/pdf-disponibles.ts`, que `app/sitemap.ts` lit —
donc **le PDF entre au sitemap tout seul**, il suffit de vérifier qu'il y est.

---

## LES RÈGLES DE TRAVAIL — ELLES RESTENT TOUTES EN VIGUEUR

### Git

⭐ **COMMITTER PAR CHEMIN, TOUJOURS** :
```bash
git commit -F message.txt -- <fichier> [<fichier>…]
```
Un `git commit` nu emporte ce que les autres sessions ont laissé dans l'index.
Avant tout commit nu : `git diff --cached --name-only`.

⛔ **JAMAIS** `git commit --amend`, `git reset --hard`, `git checkout -- .`

`git status` montre des fichiers qui ne sont pas à moi : **ne pas les ajouter,
ne pas les annuler, ne pas les corriger.** Actuellement l'autre poste touche
`manim/**`, `scripts/page-publication.mjs`, `.vercelignore`, `tsconfig.json`.

⛔ **Ne jamais pousser manim ni le son.**

⭐ **Grouper les push** — 86 % de la dépense Vercel est du build CPU, un push =
un build (~2 min 30). Committer autant qu'on veut, pousser par lots. **Mais
toujours pousser avant une passation.**

### Fichiers partagés — prévenir Frédéric AVANT d'y toucher

`components/fiches/FicheCoursClient.tsx`, `lib/fiches/types.ts`,
`lib/fiches/registre.ts`, `lib/canvas/**`, `package.json`.
⛔ `components/matrice/EntreeMatrice.tsx` n'est pas à modifier.

### Environnement

- **Lancer son propre serveur** (port libre, 3000 est pris). **Ne jamais tuer
  celui d'une autre session.**
- ⛔ **Jamais d'antislash ni de backtick dans un heredoc Git Bash** — il les
  avale, trois fois en une journée. Utiliser l'outil Write.
- Le cache `.next` se corrompt (ENOENT sur `.pack.gz`, `styled-jsx` undefined,
  500 partout, KaTeX sans CSS avec un radical géant). Remède :
  `Remove-Item -Recurse -Force .next` puis redémarrer.

### Diagnostic

⭐ **Le triage, avant toute lecture de code** :
- TOUTES les cibles échouent → l'environnement.
- UNE échoue, différente à chaque passage → **l'instrument**.
- UNE échoue, toujours la même → le code.

⭐ **Un écart entre le nombre qu'on écrit et le nombre que la machine annonce
est TOUJOURS un défaut de câblage.** (`waitForFunction` dont les options
étaient au mauvais rang : le code disait 15 000, l'erreur disait 30 000.)

---

## LES CANVAS

38 figures dans `lib/tutor-v4/types_canvas.ts`, catalogue dans
`lib/canvas/CATALOGUE.md`. Pour le second degré, `fonctionGraphique` dessine la
parabole — ⛔ **ses plages se CALCULENT**, ne pas les deviner.

Ajouté le 11/09 : **`diagramme_boite`** (min, Q₁, médiane en rouge, Q₃, max,
accolade Q₃ − Q₁, plusieurs séries empilées).

Une fiche peut importer un canvas directement :
`import DiagrammeBoiteCanvas from "@/lib/canvas/DiagrammeBoiteCanvas"`.

⛔ `tableau_donnees` : **`headers.length` doit être exactement égal à
`values.length`.** Le composant ajoute lui-même une colonne « Données » quand
les lignes ont un label ; un `headers` commençant par `""` crée une colonne
fantôme et décale toutes les valeurs. 90 tableaux étaient touchés.

---

## CE QUE FRÉDÉRIC A DIT SUR LES QCM

> « les QCM peuvent avoir vrai/faux, 3 propositions ou 4 ; l'important c'est
> l'ordre des bonnes questions, mais le mieux est 3 ou 4 »

Donc **on ne rembourre pas un QCM pour atteindre 4**. Le moteur mélange déjà
les positions à l'affichage (`shuffleChoices`, `questionPairBuilder.ts`).

---

## L'ORDRE DU TRIMESTRE — À CONFIRMER AVEC LUI

Il a nommé **le second degré en premier** : « équation second degré, forme,
delta, résolution d'équation, polynôme second degré ».

La suite plausible du premier trimestre de première spé :
second degré → variations de fonctions → dérivation (⚠️ **la seule qui a déjà
sa fiche**) → suites → produit scalaire.

**Lui demander l'ordre exact du trimestre avant d'enchaîner la deuxième fiche.**

---

## ÉTAT À LA PASSATION

- Tout est poussé. `origin/main` à `3fad6d47`.
- ⚠️ Un commit non poussé, `39a6b634` (manim, série « Les bases » sur les
  fractions) — **il est à l'autre poste, ne pas y toucher.**
- Seconde : **15 fiches, 15 PDF, 15/15 propres en poche.**
- Fichiers de travail laissés dans le dépôt : aucun (les `.tmp-*.mjs` de
  scripts/ ont été supprimés ; `.tmp-page.mjs` et `.tmp-shot.mjs` à la racine
  ne sont pas à moi).
