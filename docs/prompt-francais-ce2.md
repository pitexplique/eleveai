# Session — le français du CE2

Sors le CE2 du constructeur commun `buildCycle2FrancaisBank`, notion par notion.

**Le CP est passé avant toi le 10/08/2026, et il est le patron.** Lis d'abord
`lib/tutor-v4/questionBank/cp/francais/index.ts` et deux de ses banques —
`orthographe.bank.ts` et `comprehension-lecture.bank.ts` — avant d'écrire une
ligne. Tout ce qui suit y est déjà appliqué.

---

## 1. L'état de départ, mesuré en exécutant

Le CE2 a **120 micro-compétences** et **150 items** de repli, qui ne produisent
que **41 énoncés différents** — le chiffre le plus bas de tout le coach. Le CM2,
à nombre égal de micro-compétences et d'items, en produit **1 990**. La dernière
année du cycle 2 est la plus mal servie.

Six micro-compétences de classes de mots reçoivent le même « Quel mot est un nom
commun ? ». Et `ce2_flue_mots_irreguliers` — « Lire rapidement des mots fréquents
et irréguliers » — sert

    « Parmi ces syllabes, laquelle commence par la lettre b ? »

une question de CP à laquelle, deux fois sur trois, aucune proposition ne
répond.

Rien ne distingue le CE2 du CP dans le constructeur : le paramètre du niveau
s'appelle `_level` et **aucun générateur ne s'en sert**. Vingt-cinq énoncés sont
servis à l'identique aux trois classes.

Point d'arrivée visé, celui que le CP a atteint : **le repli à zéro**, et de
l'ordre de **mille questions différentes par micro-compétence**.

## 2. Étape 1 — ✅ FAITE, commit `462a1860`

`lib/tutor-v4/knowledge/francais/ce2/microSkills.ts` a été relu contre le TEXTE
INTÉGRAL du BO n° 41 du 31 octobre 2024 (Annexe 3), colonnes « Objectifs »
**et** « Exemples de réussite ». **50 → 120 micro-compétences**, 10 → 13
notions, tout réaccentué, **aucun identifiant renommé ni supprimé**.

**Ne la refais pas.** L'en-tête du fichier dit ce qui a été ajouté. Manquaient :
le **passé composé**, les **huit verbes irréguliers du 3ᵉ groupe**, l'**adverbe**,
le **discours rapporté**, et — le plus étonnant — **toute notion de dictée**,
alors que le BO a « Encoder puis écrire sous dictée » aux trois niveaux.

Le fichier ne contenait **aucun caractère accentué**, et ces intitulés sont
affichés à l'enfant.

Trois notions ont été créées : `types_textes`, `ecriture_mots` et
`orthographe_lexicale`. ⚠️ Le repli les envoie sur un générateur hors sujet.
C'est ta banque qui règle ça.

## 3. Le travail : treize banques

| notion | micros | remarque |
|---|---:|---|
| `vocabulaire` | 15 | la plus grosse : gradation, dérivation, niveaux de langue |
| `conjugaison` | 12 | **le plus gros morceau du cycle — un moteur, pas des listes** |
| `comprehension_lecture` | 11 | dépend d'un CORPUS, pas d'un générateur |
| `production_ecrite` | 11 | dialogue, récit, poème, une dizaine de lignes |
| `grammaire_phrase` | 10 | + ponctuation de fin et discours rapporté |
| `classes_mots` | 10 | + l'adverbe et les adverbes en -ment |
| `langage_oral` | 10 | |
| `orthographe` | 9 | pluriels -x et -al/-aux, féminin qui s'entend |
| `fluence_lecture` | 8 | 90 mots par minute, liaisons |
| `types_textes` | 6 | narratif, informatif, prescriptif, poétique, théâtral |
| `copie_fluente` | 6 | une dizaine de lignes, mise en page complexe |
| `ecriture_mots` | 6 | dictée — notion neuve |
| `orthographe_lexicale` | 6 | |

**Commence par la conjugaison.** C'est le plus gros morceau du cycle 2 : quatre
temps × (être, avoir, 1ᵉʳ groupe, **huit irréguliers**) × six personnes. Écrit
en dur, c'est ingérable ; écrit en moteur, ce sont des milliers d'énoncés pour
une page de code. Le modèle est
`lib/tutor-v4/questionBank/cycle3/francais/conjugationEngine.ts` — il fait déjà
présent, imparfait et futur.

⚠️ **Écris ton moteur dans `ce2/francais/`, pas dans un fichier partagé.** Une
session CE1 travaille peut-être en même temps. On factorisera après.

## 4. Le périmètre du CE2, et ses bornes

- **décoder** — toutes les CGP automatisées ; repérer les lettres muettes et
  décoder les mots inconnus sans perdre de vitesse ;
- **fluence** — **90 mots par minute** ; respecter l'ensemble des marques de
  ponctuation **et les liaisons** ; lecture expressive qui respecte la structure ;
- **comprendre** — narratif, poétique, documentaire ou théâtral ; **une
  vingtaine de lignes** en autonomie ; la chaine anaphorique ; l'inférence
  appuyée sur des indices explicites **et sur ses propres connaissances** ;
  revenir au texte pour lever une ambigüité ; se servir des titres et sous-titres ;
- **écrire** — copier une dizaine de lignes avec des mises en page complexes ;
  produire un texte **d'une dizaine de lignes** de différents types, relu
  méthodiquement ; dialogues, récits, poèmes ;
- **grammaire** — groupe sujet, verbe, compléments (sans les distinguer) ; les
  trois types de phrases **produits**, pas seulement reconnus ; formes négative
  et exclamative produites ; **sept classes de mots avec l'adverbe** ; la
  ponctuation de fin (. ! ?) ; les marques du **discours rapporté (« … »)** ;
  substituer un pronom à un groupe nominal sujet, et l'inverse ;
- **orthographe** — marques d'accord dans le GN, relation sujet-verbe, chaines
  d'accord dans la phrase ; **pluriels irréguliers** (-x, -al/-aux) ; **féminin
  qui s'entend** (lecteur/lectrice, joyeux/joyeuse) ; les phonèmes à plusieurs
  graphèmes ([o], [e], [ɛ], [ɑ̃], [s]) ;
- **conjugaison** — présent, imparfait, futur **et passé composé** de être,
  avoir, des verbes du 1ᵉʳ groupe **et des huit verbes irréguliers du 3ᵉ groupe :
  faire, aller, dire, venir, pouvoir, voir, vouloir, prendre** ; radical et
  terminaison ; retrouver l'infinitif ;
- **vocabulaire** — 6 corpus par période ; sens propre / figuré (*souffler ses
  bougies* / *souffler une réponse*) ; **gradation** (*la crainte, la peur,
  l'épouvante*) ; **dérivation** (*port / portuaire / aéroport*) ; niveaux de
  langue selon les interlocuteurs ; répertoire lexical personnel ;
- **oral** — registre adapté, jeux de rôles, exposé de quelques minutes.

⛔ Ce qui n'est **pas** au CE2 :

- pas de **compléments distingués** : ni COD, ni COI, ni attribut du sujet. Le
  BO est net — « l'objectif est de reconnaitre ces deux groupes, sans distinguer
  les différents compléments du verbe » ;
- pas de **compléments circonstanciels** : « leur étude est réservée au cycle 3 » ;
- pas de **passé simple** ni de **conditionnel** ;
- pas de **fonctions** de l'adjectif : le BO précise « sans que cette notion
  soit enseignée ».

## 5. Les huit choses que le CP a apprises à ses dépens

Elles ont toutes coûté un aller-retour. Ne les redécouvre pas.

1. **`npx tsc --noEmit` AVANT chaque commit de banque.**
   `verifier-generateurs.mjs` exécute le code *après dépouillement des types* :
   il ne voit jamais une erreur de compilation. Il annonçait « aucun défaut »
   sur 33 000 tirages pendant que `npm run build` cassait sur origin/main.
   ⚠️ Cause précise : une table écrite en `as const` donne des types
   **littéraux**, et comparer un mot d'une table à un mot d'une autre devient
   « ces deux types n'ont aucun recouvrement ». **Type tes tables à la main**
   (`type Paire = { readonly a: string; … }; const T: readonly Paire[] = [...]`)
   dès qu'elles se comparent entre elles ou passent par un ternaire.

2. **Les pièges d'un QCM d'orthographe ne se FABRIQUENT pas.** « mon » à
   l'envers donne **nom**, « les » donne **sel**, « dans » + e donne **danse**,
   « bien » + s donne **biens**, « puis » + e donne **puise**. Des mots bien
   réels : l'élève a deux bonnes réponses sous les yeux. Écris-les à la main, et
   **phonétiquement plausibles** — *bocou*, *écolle*, *maizon*. Une anagramme ne
   trompe personne.

3. **Un groupe nominal ne se RECOMPOSE pas.** Coller déterminant + adjectif +
   nom donne « une mûre mangue » et « le bleu lagon » — proposés comme la BONNE
   réponse. Aucun script ne l'attrape : la question est bien formée, elle est
   juste fausse. Écris le groupe en toutes lettres, avec son genre et son nombre.

4. **Dédoublonne tout ce qui vient d'une table.** Un même mot y vit souvent deux
   fois. `verifier-generateurs.mjs` les attrape — lis sa section « propositions
   qui s'effondrent », elle ne bloque pas mais elle a raison à chaque fois.

5. **Vérifie qu'il n'y a qu'UNE bonne réponse.** « le » et « la » conviennent
   autant que « un » et « une » devant un nom. « porte » a un e muet autant que
   « grande ».

6. ⛔ **Rien qui dépende de l'accent d'ici.** Pas de [e] contre [ɛ] — « lait »
   se dit [lɛ] dans le nord et souvent [le] à La Réunion. Pas de « e » muet
   final dans les mots à compter en syllabes. Un enfant d'ici aurait faux à
   cause de son accent, pas de son orthographe.
   ⚠️ Attention : le BO du CE2 demande explicitement les graphies de [e] et [ɛ]
   en dictée. Fais-les travailler **par la graphie** (« comment s'écrit ce
   mot ? »), jamais **par l'oreille** (« quel son entends-tu ? »).

7. **La compréhension ne se génère pas : elle se CORPUS.** Seize textes
   étiquetés donnent seize questions par micro-compétence, pas une de plus. Au
   CE2 les textes font une vingtaine de lignes : prévois-en trente, et étiquette
   chacun (personnage, lieu, moment, question, reprise anaphorique, inférence,
   indice, phrase qui prouve, résumé, type de texte).

8. **Mesure, ne devine pas.** Après chaque banque, compte les énoncés distincts
   par micro-compétence en exécutant les générateurs. Le CP est passé de 7 à 144
   sur une micro-compétence parce que la mesure l'a montré.

## 6. Écrire pour un enfant de neuf ans

Le coach parle à l'élève, pas au professeur.

- **« tu », pas « on ».** Un geste que l'enfant connait, un exemple qu'il
  reconnait.
- **Le piège nommé, pas caché** : « Il chante et ils chantent : ta bouche dit la
  même chose. C'est le s de ils qui prévient. »
- **L'île est dans les mots** au même titre que le reste : letchi, lagon,
  margouillat, cari, piton, tamarin, case. Pas comme décor — comme vocabulaire.
- Une question ouverte se répond en une phrase d'enfant de neuf ans : « explique
  comment tu as trouvé », jamais « justifie ta démarche ».
- Au CE2, `short` peut valoir un mot. Mets alors les **deux formes** dans
  `expected` (accentuée en tête), **sauf** si la micro-compétence porte
  justement sur l'accent ou l'orthographe : là, la forme accentuée seule.
  ⚠️ Le comparateur `exact_text` ne retire pas les accents.

## 7. Le mécanisme, la vérification, le commit

Copie `lib/tutor-v4/questionBank/cp/francais/index.ts` : `BANQUES_ECRITES` +
`REPLI` filtré sur les micro-compétences déjà couvertes. Chaque banque écrite
fait reculer le repli. On n'arrache rien — mieux vaut une question approximative
que pas de question.

```bash
npx tsc --noEmit
```

```bash
node --experimental-strip-types scripts/verifier-generateurs.mjs ce2 francais 1200
```

```bash
node scripts/verifier-banque.mjs ce2 francais
```

Un `kind: "fixed"` doit porter le tag qui le justifie : `piege`, `definition`,
`methode`, `lexique` ou `remarquable`. Le `kind: "template"` est la règle.
Le « défi » n'est jamais une copie : même notion, un cran plus dur.

Dans le message de commit : le nombre d'énoncés distincts, le nombre de
micro-compétences encore au repli, et ce que la banque REMPLACE. Committe après
chaque notion, pas à la fin.

⛔ Jamais `git add -A`.
⛔ Ne touche pas `cycle2/francais/buildCycle2FrancaisBank.ts`.
⛔ Ne relance pas `scripts/generer-notions-matrice.mjs` : il écrit dans un
fichier commun aux trois classes, à régénérer **une seule fois** quand les trois
seront posées.

Voir aussi `docs/coach-francais-cycle2-playbook.md` pour la grille du BO
CP/CE1/CE2 en trois colonnes.
