# Note du matin — 24/08/2026

> Écrite le soir du 23/08 depuis le poste du soir, à lire depuis le poste du
> matin. **Commence par `git pull`.** Le partage est en place depuis le 23/08 :
> les fiches de maths et de français se font le matin sur l'autre poste, le soir
> on s'occupe d'autre chose.

---

## 1. À faire en premier : relire la fiche CM2 « Attribut, COD et COI »

`app/fiches-cours/francais/cm2/grammaire-complements/` **était sur le disque du
poste du soir depuis des jours, jamais commitée.** Elle l'est maintenant
([6d33405c]), parce que le CM2 est ton chantier de ce matin et qu'elle t'aurait
fait réécrire de zéro quelque chose qui existe déjà.

Ce qui est vérifié : la page répond `200` et porte la structure complète du
standard du 19/08 — « À quoi ça sert », « Un peu d'histoire », définition,
propriétés, la méthode en trois temps (poser la question au verbe, déplacer,
supprimer), « Exemples corrigés ».

⚠️ **Ce qui ne l'est pas : personne ne l'a regardée.** Ni à l'œil, ni en 375 px.
C'est la règle du dépôt et elle n'a pas été appliquée à celle-là.

Son alias est tombé de `lib/fiches/registre.ts` du même coup. Il reste les deux
autres — `grammaire-groupe-nominal` et `grammaire-accords` n'ont toujours pas
leur fiche au CM2, et le coach continue de les envoyer sur l'orthographe. **Ce
sont les deux dernières de la série de grammaire du CM2.**

---

## 2. Le patron des titres a changé — applique-le au CM2

Les 27 pages de 6ᵉ et les trois sommaires sont passés à un nouveau `title`
([ee421e22]). Le CM2 est resté à l'ancien : c'est à faire ce matin, en même
temps que les fiches.

```
avant :  Les compléments du verbe — fiche de cours CM2
après :  Les compléments du verbe — CM2 : cours et exercices corrigés
```

**La règle** : la notion et le niveau devant — c'est ce qui est tapé — puis la
promesse. « Fiche de cours » n'est pas supprimé, il change de rôle : il reste le
nom de la **collection** (fil d'Ariane, corps de page, surtitre des cartes de
l'accueil), mais il ne porte aucun volume de recherche et il occupait la moitié
du titre. La requête historique du soutien scolaire en France est « cours et
exercices corrigés ».

**Trois garde-fous appris hier soir :**

1. **Ne l'écris que si c'est vrai.** Une fiche doit contenir un bloc d'exercice
   et une section « Exemples corrigés » pour avoir le droit à ce titre. Les 27
   de 6ᵉ ont été vérifiées avant, une par une.
2. **~60 signes**, et le gabarit ajoute encore « — EleveAI ». Au-delà, Google
   coupe la promesse — c'est-à-dire exactement la partie qu'on vient d'ajouter.
   Trois titres de 6ᵉ ont dû être raccourcis pour cette raison ; le `H1` de la
   page, lui, garde l'intitulé complet.
3. **« exercices résolus »** (la même chose dite au Maroc, en Algérie et en
   Belgique) va **une fois par sommaire**, dans une phrase qui se lit — jamais
   dans les titres de fiche. Répété 27 fois, c'est de l'empilement de mots-clés
   et il se lit comme tel. C'est déjà fait sur `/fiches-cours/maths` et
   `/fiches-cours/francais`.

Le script d'hier soir est reproductible : il lit `title:` dans chaque
`page.tsx`, coupe le suffixe, garde la partie avant un `:` éventuel, et réécrit.
Compte une quinzaine de pages pour le CM2.

### En revanche, les H2 sont déjà faits — partout, CM2 compris

Une seule modification dans `components/fiches/FicheCoursClient.tsx` vaut pour
les 104 fiches : chaque intitulé de bloc porte maintenant le nom de la notion,
pris dans la fiche elle-même. **Rien à faire de ce côté pour le CM2.**

```
Définition            →  Définition : les compléments du verbe
Propriétés            →  Propriétés : les compléments du verbe
(le bloc méthode n'avait aucun titre)  →  Méthode : les compléments du verbe
Je m'entraîne         →  Exercices corrigés : les compléments du verbe
```

Le plus gros gain est le dernier : le bloc s'appelait « Je m'entraîne » alors
qu'il contient des `question` + `correction`. C'étaient des exercices corrigés
qui ne le disaient pas — la requête la plus tapée du domaine, sur la seule
section qui la méritait vraiment.

Les trois étapes de la méthode passent de `<h2>` à `<h3>` : elles étaient de
même rang que « Définition » pour une seule idée.

⚠️ **Le titre est repris tel quel, sauf l'initiale d'un article** (`Le`, `La`,
`Les`, `L'`, `Un`, `Une`, `Des`, `Du`) qui passe en minuscule après le
deux-points. Aucun nom propre ne commence par « Les » — c'est ce qui rend la
règle sûre. « Définition : Premiers pas en probabilités » garde donc sa
majuscule, et c'est correct.

---

## 3. Ce qui a bougé côté matrice, et qui te concerne

- **Les fiches de 6ᵉ sont déclarées** dans `lib/matrice/ressources.ts`
  (`fiches-maths-6e`, `fiches-francais-6e`). Quand le CM2 sera complet dans les
  deux matières, il prendra les siennes sur le même modèle — **pas avant** : une
  ressource déclarée est une ressource promise.
- ⚠️ **N'écris jamais `"prof"` ou `"parent"` dans les `niveaux` d'une fiche.**
  Ce sont des rôles, pas des niveaux : essayé hier, et un parent qui avait dit
  « CP » recevait la fiche de 6ᵉ. La classe dite suffit, le moteur essaie les
  deux portes depuis le 16/08.
- **Il n'existe aucune page de classe.** `/fiches-cours/maths/6e` répond `404` —
  seuls le sommaire par matière et les pages de notion existent. Trois entrées
  de l'inventaire pointaient dessus depuis des mois. Si tu déclares le CM2,
  vise `/fiches-cours/francais`, pas `/fiches-cours/francais/cm2`.
- **Une pastille « 📄 Fiches »** est apparue dans la rangée d'entrée
  (`lib/matrice/fiches.ts`). Elle se déduit des ressources : le CM2 l'aura le
  jour où ses fiches seront déclarées, sans rien à brancher.

---

## 4. Deux choses en suspens, à trancher quand tu veux

- **`fiches-maths-premiere`** promet une collection et n'a **qu'une seule
  fiche** (`derivation`) contre 84 en CM2 et 54 en 6ᵉ. Un lycéen arrive sur le
  sommaire et cherche la sienne au milieu de deux cents. C'est la carte la plus
  fragile de l'inventaire — soit on écrit la Première, soit on retire la carte.
- **12 branches `codex/*`** de mars-mai portent chacune 1 à 5 patchs qu'on ne
  retrouve pas sur `main`. Neuf autres ont été supprimées hier (contenu déjà
  remonté, vérifié au `git cherry`). Celles-là attendent ton avis.

---

## 5. Le sujet du soir, si tu veux y penser d'ici là

Le **livre électronique** des fiches. Le tuyau existe déjà :
`scripts/build-ebook.ts` fabrique un PDF **et** un EPUB, avec couverture,
avant-propos et chapitres. Mais il lit `lib/fiches-ia.ts`, une **donnée**, alors
que les fiches de maths et de français sont des **composants React** dans
`lib/fiches/`. Tout le travail est là : trouver comment en sortir le contenu.
