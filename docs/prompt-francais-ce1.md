# Session — le français du CE1

Sors le CE1 du constructeur commun `buildCycle2FrancaisBank`, notion par notion.

**Le CP est passé avant toi le 10/08/2026, et il est le patron.** Lis d'abord
`lib/tutor-v4/questionBank/cp/francais/index.ts` et deux de ses banques —
`orthographe.bank.ts` et `comprehension-lecture.bank.ts` — avant d'écrire une
ligne. Tout ce qui suit y est déjà appliqué.

---

## 1. L'état de départ, mesuré en exécutant

Le CE1 a **118 micro-compétences** et **171 items** de repli, qui ne produisent
que **53 énoncés différents**. Le CM1, à nombre égal d'items, en produit 1 998.
**38 des 57 micro-compétences d'alors ne voyaient jamais plus de deux énoncés.**

Le cas qui résume tout : `ce1_flue_mots_connus` — « Lire des mots connus sans
déchiffrer » — sert

    « Parmi ces syllabes, laquelle commence par la lettre b ? »

avec `expected: ["ba"]` écrit en dur, alors que deux jeux de syllabes sur trois
sont `ro/no/lo` et `fi/si/di`. **Deux fois sur trois, aucune proposition ne
répond à la question.**

Et le générateur de dictée demande « Comment s'écrit le petit mot qui désigne un
endroit ? » en attendant **« ou »** — le mot est **« où »**.

Point d'arrivée visé, celui que le CP a atteint : **le repli à zéro**, et de
l'ordre de **mille questions différentes par micro-compétence**.

## 2. Étape 1 — ✅ FAITE, commit `462a1860`

`lib/tutor-v4/knowledge/francais/ce1/microSkills.ts` a été relu contre le TEXTE
INTÉGRAL du BO n° 41 du 31 octobre 2024 (Annexe 3), colonnes « Objectifs »
**et** « Exemples de réussite ». **57 → 118 micro-compétences**, 13 → 15
notions, tout réaccentué, **aucun identifiant renommé ni supprimé** — ils
portent l'historique des élèves et le graphe de prérequis.

**Ne la refais pas.** L'en-tête du fichier dit ce qui a été ajouté et pourquoi.
Le manque le plus grave était **l'imparfait et le futur** : le BO les met au
CE1, le code les rangeait au CE2. Ce n'était pas un choix, c'était un écart.

Deux notions ont été créées : `ecriture_cursive` et `orthographe_lexicale`.
⚠️ Le repli les envoie sur un générateur hors sujet. C'est ta banque qui règle ça.

## 3. Le travail : quinze banques

| notion | micros | remarque |
|---|---:|---|
| `vocabulaire` | 13 | la plus grosse, et la plus utile |
| `conjugaison` | 10 | **là où un vrai moteur paie le plus** |
| `comprehension_lecture` | 10 | dépend d'un CORPUS, pas d'un générateur |
| `grammaire_phrase` | 10 | transformations : substitution, déplacement, suppression |
| `langage_oral` | 9 | |
| `fluence_lecture` | 9 | 70 mots par minute |
| `production_ecrite` | 9 | |
| `orthographe` | 8 | accords du GN, marque de pluriel des verbes = nt |
| `classes_mots` | 7 | + le pronom personnel sujet |
| `ecriture_mots` | 7 | dictée |
| `sons_complexes` | 6 | |
| `copie_fluente` | 6 | |
| `orthographe_lexicale` | 6 | |
| `types_textes` | 5 | + le prescriptif |
| `ecriture_cursive` | 3 | les quatre écritures |

**Commence par la conjugaison.** Quatre temps × (être, avoir, une liste de
verbes du 1ᵉʳ groupe) × six personnes : ce sont des milliers d'énoncés pour
trente lignes de code. Le modèle est
`lib/tutor-v4/questionBank/cycle3/francais/conjugationEngine.ts` — lis-le avant
d'écrire le tien, il fait déjà présent, imparfait et futur.

⚠️ **Écris ton moteur dans `ce1/francais/`, pas dans un fichier partagé.** Une
session CE2 travaille peut-être en même temps. On factorisera après.

## 4. Le périmètre du CE1, et ses bornes

- **décoder** — toutes les CGP, y compris les plus complexes ; mémoriser
  l'ensemble des graphèmes, en particulier ceux des sons proches ;
- **fluence** — **70 mots par minute** ; respecter tous les signes de
  ponctuation et les groupes de souffle ; lire de manière expressive ;
- **comprendre** — un texte narratif, informatif ou prescriptif **d'une
  quinzaine de lignes**, en autonomie ; donner un titre ; résumer oralement ;
  la chaine anaphorique ; les inférences « dans des cas simples » ;
- **écrire** — copier quatre à cinq phrases courtes dès la période 1, cinq ou
  six lignes à partir de la période 3, une dizaine en fin d'année ; produire un
  texte de **six ou sept phrases** en fin d'année, avec des connecteurs ;
- **écriture cursive** — reconnaitre les lettres dans les **quatre écritures**,
  transcrire la scripte en cursive, les majuscules cursives à partir de la
  période 2 ;
- **grammaire** — identifier et **nommer** le groupe sujet, le verbe, les
  compléments (sans les distinguer entre eux) ; les trois types de phrases ; les
  formes négative et exclamative **et savoir effectuer les transformations** ;
- **orthographe** — le GN (déterminant/nom/adjectif) et la chaine d'accords ;
  l'accord sujet-verbe ; la **marque de pluriel des verbes = nt** ;
- **conjugaison** — présent, imparfait, futur **puis passé composé** de être,
  avoir et des verbes du 1ᵉʳ groupe ; radical et terminaison ; retrouver
  l'infinitif d'une forme conjuguée (*ils plieront, tu as plié* → *plier*) ;
- **vocabulaire** — 5 corpus par période ; niveaux de langue ; termes
  génériques et spécifiques ; préfixes et suffixes ; sens propre / figuré ;
  dictionnaire.

⛔ Ce qui n'est **pas** au CE1 :

- pas d'**adverbe** ni de **discours rapporté** — ils arrivent au CE2 ;
- pas de **verbes irréguliers du 3ᵉ groupe** conjugués : les huit (*faire,
  aller, dire, venir, pouvoir, voir, vouloir, prendre*) sont au CE2 ;
- pas de **compléments distingués** : ni COD, ni COI, ni attribut. Le BO le dit
  — « sans distinguer ces derniers entre eux » ;
- pas de **compléments circonstanciels** : réservés au cycle 3 ;
- pas de **gradation** dans la synonymie (*crainte > peur > épouvante*) : CE2.

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
   l'envers donne **nom**, « les » donne **sel**, « un » donne **nu**, « dans »
   + e donne **danse**, « bien » + s donne **biens**, « puis » + e donne
   **puise**. Des mots bien réels : l'élève a deux bonnes réponses sous les
   yeux. Écris-les à la main, et **phonétiquement plausibles** — *bocou*,
   *écolle*, *maizon*. Une anagramme ne trompe personne.

3. **Un groupe nominal ne se RECOMPOSE pas.** Coller déterminant + adjectif +
   nom donne « une mûre mangue » et « le bleu lagon » — proposés comme la BONNE
   réponse. Aucun script ne l'attrape : la question est bien formée, elle est
   juste fausse. Écris le groupe en toutes lettres, avec son genre et son
   nombre.

4. **Dédoublonne tout ce qui vient d'une table.** Un même mot y vit souvent
   deux fois : « chapeau » a un *ch* ET un *eau*, « samoussa » se découpe
   sa-mous-sa, « Le bateau flotte sur le lagon. » contient deux fois « le ».
   `verifier-generateurs.mjs` les attrape — lis sa section « propositions qui
   s'effondrent », elle ne bloque pas mais elle a raison à chaque fois.

5. **Vérifie qu'il n'y a qu'UNE bonne réponse.** « le » et « la » conviennent
   autant que « un » et « une » devant un nom : ils sont sortis des
   propositions. « porte » a un e muet autant que « grande ».

6. ⛔ **Rien qui dépende de l'accent d'ici.** Pas de [e] contre [ɛ] — « lait »
   se dit [lɛ] dans le nord et souvent [le] à La Réunion. Pas de « e » muet
   final dans les mots à compter en syllabes — « porte » fait une syllabe à
   Paris et souvent deux ici. Un enfant d'ici aurait faux à cause de son
   accent, pas de son orthographe.

7. **La compréhension ne se génère pas : elle se CORPUS.** Seize textes
   étiquetés donnent seize questions par micro-compétence, pas une de plus. Au
   CP c'est la notion la plus maigre malgré seize textes. Prévois-en trente au
   CE1, ils sont plus longs — une quinzaine de lignes en fin d'année.

8. **Mesure, ne devine pas.** Après chaque banque, compte les énoncés distincts
   par micro-compétence en exécutant les générateurs. Le CP est passé de 7 à
   144 sur une micro-compétence parce que la mesure l'a montré.

## 6. Écrire pour un enfant de sept ans

Le coach parle à l'élève, pas au professeur. Le CP a fait cette passe après
coup ; fais-la tout de suite.

- **« tu », pas « on ».** « Frappe dans tes mains à chaque morceau. Ta main
  compte mieux que tes yeux. » « Ferme les yeux et frappe en disant le mot :
  les yeux fermés, on ne peut plus compter les lettres. »
- **Un geste que l'enfant connait** : frapper dans ses mains, poser son doigt,
  dire au ralenti, essayer devant un nom.
- **Le piège nommé, pas caché** : « Il chante et ils chantent : ta bouche dit
  la même chose. C'est le s de ils qui prévient. »
- **L'île est dans les mots** au même titre que le reste : letchi, lagon,
  margouillat, cari, piton, tamarin, case. Pas comme décor — comme vocabulaire.
- Une question ouverte se répond en une phrase d'enfant de sept ans :
  « explique comment tu as trouvé », jamais « justifie ta démarche ».
- Au CE1, `short` peut valoir un mot. Mets alors les **deux formes** dans
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
node --experimental-strip-types scripts/verifier-generateurs.mjs ce1 francais 1200
```

```bash
node scripts/verifier-banque.mjs ce1 francais
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
