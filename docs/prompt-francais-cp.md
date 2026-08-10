# Session — le français du CP

Sors le CP du constructeur commun `buildCycle2FrancaisBank`.

**Lis d'abord `docs/coach-francais-cycle2-playbook.md` en entier.** Il contient
les mesures, la démarche du cycle 3 à reprendre, les règles d'écriture, les
pièges par notion et le programme de référence. Ce prompt ne répète que ce qui
est propre au CP.

## L'état de départ, mesuré

46 micro-compétences, 138 items, **57 énoncés différents** — le CM1, à nombre
égal de micro-compétences et d'items, en tire 1 998.

Les six micro-compétences de conscience phonologique reçoivent les deux mêmes
questions : compter les syllabes, et « est-ce que chat et rat riment ? ».
« Identifier un son dans un mot » ne demande jamais d'identifier un son.
`cp_lec_syllabes_cv` sert « Parmi ces syllabes, laquelle commence par la lettre
b ? » avec `expected: ["ba"]` en dur : **deux fois sur trois, "ba" n'est pas dans
les propositions**.

## Étape 1 — ✅ FAITE le 09/08/2026, commit `462a1860`

`lib/tutor-v4/knowledge/francais/cp/microSkills.ts` a été relu contre l'**Annexe
3** du BO du 31 octobre 2024, colonnes « Objectifs » **et** « Exemples de
réussite ». **46 → 91 micro-compétences**, 11 → 15 notions, tout réaccentué,
aucun identifiant renommé ni supprimé. **Ne la refais pas.** Lis le fichier : son
en-tête dit ce qui a été ajouté et pourquoi.

Ce qui manquait, et qui est maintenant là :

- ⛔ **aucune conjugaison** — « Apprendre à conjuguer **être** et **avoir** au
  présent de l'indicatif et commencer à les mobiliser à l'écrit » est un objectif
  du **CP**. Il faut une notion `conjugaison` ;
- les **trois types de phrases** (déclarative, interrogative, impérative) et les
  **formes négative et exclamative** — le CP les a ;
- l'**adjectif** et le **pronom personnel** : le BO demande de constituer des
  corpus « noms, verbes, déterminants, adjectifs, pronoms personnels » ;
- **l'orthographe lexicale en entier** : identifier et **nommer les accents** ;
  la valeur sonore de **s, c, g** selon la lettre qui suit ; les graphèmes
  **an/am, en/em, on/om, in/im** (le m devant m, b, p) ; la **lettre muette
  finale** retrouvée par un mot de la même famille (*chat/chaton*,
  *gros/grossir*) ;
- en vocabulaire : **antonymes**, **ordre alphabétique** et dictionnaire adapté,
  polysémie et sens propre/figuré (sans les nommer), **champ lexical** ;
- en compréhension : la **chaîne anaphorique** (le nom repris par un pronom) et
  l'**inférence simple** — le BO donne l'exemple : « J'ai pris mon parapluie » →
  le temps est pluvieux.

Quatre notions ont été créées : `lecture_voix_haute`, `devenir_lecteur`,
`conjugaison` et `orthographe_lexicale`. ⚠️ Le repli les envoie sur un
générateur hors sujet — les deux premières finissent sur une question de langage
oral. C'est ta banque qui règle ça.

## Étape 2 — le périmètre du CP, et ses bornes

Ce que le BO demande au CP :

- **décoder** — 12 à 15 CGP en fin de période 1, 25 à 30 en milieu d'année, toutes
  les CGP régulières en fin d'année ; **30 mots par minute** sans préparation,
  **50 après préparation** ;
- **lire à voix haute** des syllabes, des mots, des phrases, puis un texte ;
  repérer les marques de ponctuation ;
- **comprendre** un texte narratif, informatif ou prescriptif **d'une dizaine de
  lignes** ; la chaîne anaphorique ; l'inférence simple ; justifier par un retour
  au texte ;
- **écrire** : cursive minuscule, copie de 3 ou 4 phrases sans erreur, dictée de
  mots puis de phrases, écrits de **1 à 5 lignes** ;
- **grammaire** : phrase simple et ses trois marqueurs (majuscule, ponctuation
  finale forte, sens) ; trois types de phrases ; formes négative et exclamative ;
  corpus par classe de mots ;
- **orthographe grammaticale** : masculin/féminin, singulier/pluriel, chaîne
  d'accords (*un petit garçon → une petite fille*, *le chien → deux chiens*),
  relation sujet-verbe, être et avoir au présent ;
- **vocabulaire** : 4 corpus par période.

⛔ Ce qui n'est **pas** au CP, et qu'on ne doit pas écrire :

- pas de **complément** nommé (le CE1 les nomme) ni de groupe sujet nommé ;
- pas d'**imparfait, futur, passé composé** — le présent d'être et avoir, rien
  d'autre ;
- pas d'**adverbe** (CE2) ni de **discours rapporté** (CE2) ;
- pas de **préfixe/suffixe** enseignés comme tels : le BO dit « commence à
  comprendre le sens des principaux affixes » — on reste sur des paires
  observables (*coller/décoller/recoller*, *visible/invisible*) ;
- pas de **niveaux de langue** nommés : « percevoir la différence entre deux
  niveaux de langue », c'est *rigoler / rire*, pas un classement.

## Étape 3 — écrire les banques

Une par notion, dans `lib/tutor-v4/questionBank/cp/francais/`, plus un
`index.ts` calqué sur `lib/tutor-v4/questionBank/ce2/maths/index.ts`
(`BANQUES_ECRITES` + `REPLI` filtré sur les micro-compétences couvertes).

⛔ **Ne touche pas** `cycle2/francais/buildCycle2FrancaisBank.ts` : deux autres
sessions travaillent sur le CE1 et le CE2 en même temps. Les moteurs propres au
CP vont dans `cp/francais/generateurs/`, même si le CE1 en écrira de proches.

Au CP, préfère `qcm`. Une réponse à taper ne dépasse pas une lettre, un graphème
ou une syllabe — l'enfant a six ans et cherche ses touches.

Le mot d'une question de phonologie doit rester lisible **sans le son** : on
écrit le mot, on ne se contente pas de le faire entendre.

## Les pièges du CP, un par notion

- **phonologie** — la syllabe qu'on ENTEND n'est pas celle qu'on VOIT :
  *chapeau* s'entend en deux syllabes et s'écrit avec sept lettres.
- **graphème-phonème** — le **c** de *cerise* et celui de *carotte* ; le **g** de
  *girafe* et de *gâteau* ; le **m** devant m, b, p (*tomber*, *jambe*).
- **lecture syllabique** — le mot deviné sur sa première syllabe : *chat* lu pour
  *château*. Et la lettre finale muette qu'on prononce.
- **compréhension** — « il » ne renvoie pas toujours au dernier nom cité.
- **copie** — le mot sauté et le point oublié ; on se relit sur ce qu'on a écrit,
  pas sur le modèle.
- **dictée** — un son, plusieurs graphies : le son [o] de *moto*, *jaune* et
  *gâteau*.
- **production d'écrits** — la phrase sans verbe, et les **deux marqueurs** que
  le BO nomme : majuscule et point.
- **grammaire** — la question sans point d'interrogation, et la négation dont on
  oublie la moitié (*ne … pas*).
- **orthographe** — la marque du pluriel **ne s'entend pas** : *deux lapins*,
  *mes amis*, *des pommes*. Le BO l'écrit : « s muet ».
- **conjugaison** — *il est* et *ils sont*, entendus dans une phrase.
- **vocabulaire** — le même mot, deux sens : *la souris* de la cave et celle de
  l'ordinateur.

## Avant de committer

Tout ce qui est affiché à l'élève s'écrit **en français correct, accents
compris**. C'est un coach de français. Le constructeur actuel demande « Quel mot
contient un e avec un accent aigu ? » et attend « ecole » : ne refais pas ça.

```bash
node scripts/verifier-banque.mjs cp francais
```

```bash
node --experimental-strip-types scripts/verifier-generateurs.mjs cp francais 600
```

Puis mesure et mets **dans le message de commit** : le nombre d'énoncés distincts
par micro-compétence, et le nombre de micro-compétences encore servies par le
repli. L'objectif est le même qu'au CP de maths : **repli à zéro**.

⛔ Jamais `git add -A`. ⛔ Ne relance pas `scripts/generer-notions-matrice.mjs` :
il écrit dans un fichier commun aux trois classes.
