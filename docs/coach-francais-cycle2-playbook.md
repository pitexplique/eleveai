# Coach de français, cycle 2 — le socle commun aux trois sessions

Mesuré le 09/08/2026, en exécutant les générateurs, pas en les lisant.
À lire **en entier** avant d'écrire une ligne, quelle que soit la classe.

---

## 1. Ce que le coach sert aujourd'hui

`lib/tutor-v4/questionBank/cycle2/francais/buildCycle2FrancaisBank.ts` fabrique
les questions des trois classes. 770 lignes, quinze générateurs, un routeur.
Chaque micro-compétence reçoit trois items : variante 0, variante 1, et un
« défi » qui est la **copie exacte** de la variante 1 avec un autre identifiant.

Tiré 400 fois par item :

| | micro-compétences | items | énoncés différents |
|---|---:|---:|---:|
| **CP** | 46 | 138 | **57** |
| **CE1** | 57 | 171 | **53** |
| **CE2** | 50 | 150 | **41** |
| CM1 | 46 | 138 | 1 998 |
| CM2 | 50 | 150 | 1 990 |
| 6ᵉ | 31 | 93 | 1 239 |

Le CM1 et le CP ont le même nombre de micro-compétences et le même nombre
d'items. Le CM1 en tire **1 998 énoncés**, le CP **57**. Le CE2 et le CM2 aussi :
41 contre 1 990.

Dans tout le cycle 2 il y a **79 énoncés différents**, et **25 sont servis à
l'identique au CP, au CE1 et au CE2**. Ce n'est pas un hasard : dans
`buildCycle2FrancaisBank`, le paramètre du niveau s'appelle `_level` et **aucun
générateur ne s'en sert**. Un élève de CE2 qui travaille l'orthographe reçoit le
« le chat / la chat » écrit pour un CP.

### Le routeur aiguille sur la notion, jamais sur la micro-compétence

```ts
if (notionId.includes("phonolog")) return phonologieQuestion(level, variant);
```

Conséquence : les **six** micro-compétences de conscience phonologique du CP —
compter les syllabes, découper en syllabes, reconnaître des rimes, identifier un
son, dire s'il est au début ou à la fin, défi — reçoivent les deux mêmes
questions. « Identifier un son dans un mot » ne demande jamais d'identifier un
son. Six micro-compétences du CE1 servent le même « Lis ce texte : Tom est dans
le jardin… ». Six micro-compétences du CE2 servent le même « Quel mot est un nom
commun ? ».

Et `fluence_lecture` (CE1 et CE2) est aiguillé vers le générateur de lecture
syllabique du CP. Un CE2 qui travaille « Lire rapidement des mots fréquents et
irréguliers » reçoit : **« Parmi ces syllabes, laquelle commence par la lettre
b ? »**

C'est le même mal que les maths du cycle 2 — voir la mémoire
`chantier-cycle2-cp-ce1-ce2` — mais un cran plus loin, puisque les trois classes
partagent en plus le même stock.

## 2. Les questions cassées, comptées

- **Impossibles** — la bonne réponse est absente des propositions :
  1 306 tirages sur 55 200 au CP, 1 053 au CE1, 1 064 au CE2. Toujours la même :
  « Parmi ces syllabes, laquelle commence par la lettre « b » ? » avec
  `expected: ["ba"]` en dur, alors que deux jeux de syllabes sur trois sont
  `ro/no/lo` et `fi/si/di`. **Deux fois sur trois, aucune réponse n'est bonne.**
- **QCM à deux lignes** — « Comment s'écrit le petit mot qui désigne un
  endroit ? », correct `"ou"`, pièges `["ou", "ou", "au"]`. Après déduplication
  il reste une proposition fausse. Une chance sur deux au hasard, et la réponse
  attendue est **« ou » alors que le mot est « où »**.
- **Deux réponses justes** — « Dans quel mot le "e" est-il muet ? », correct
  `"grande"`, pièges `["ete", "porte", "fete"]`. Le e de *porte* est muet aussi.
- **Toutes les propositions justes** — « Quel mot est un mot très fréquent que
  tu dois reconnaître sans déchiffrer ? », et les quatre propositions sont tirées
  de la même liste de mots fréquents. Une seule est acceptée, au hasard.

## 3. L'orthographe du coach de français

`ce2/microSkills.ts` ne contient **pas un seul caractère accentué**. Le CP et le
CE1 en ont un chacun. Ces intitulés sont affichés à l'élève.

Dans le constructeur :

- « Quel mot contient un « e » avec un accent aigu ? » → bonne réponse
  **`"ecole"`**, écrite sans accent aigu ;
- « Comment ecrit-on le son « o » dans le mot « **gateau** » ? » — une question
  d'orthographe qui écrit le mot de travers ;
- « **Lea** va **a** l'**ecole**. » — trois fautes dans une phrase de lecture ;
- « Le chat dort sur le **canape**. » ;
- « Un poeme est **organize** en vers » et « ses **sonorities** » — deux mots
  anglais.

⛔ **Règle absolue pour les trois sessions : tout ce qui est affiché à l'élève
s'écrit en français correct, accents compris.** Énoncés, propositions, pièges,
explications, intitulés de micro-compétences et de notions. Un coach de français
qui écrit « repondre » n'a aucune autorité pour corriger un enfant.

⚠️ Le comparateur `exact_text` (`lib/tutor/evaluation/comparators.ts`) met en
minuscules, réduit les espaces, **et ne retire pas les accents**. Donc :
- sur une micro-compétence d'**orthographe ou d'accentuation**, la forme
  accentuée seule est acceptée — c'est l'objet même de l'exercice ;
- partout ailleurs, mettre les **deux formes** dans `expected` :
  `expected: ["élève", "eleve"]`, l'accentuée en tête. Un enfant de sept ans sur
  un clavier ne doit pas être puni d'un accent qu'on ne lui demandait pas.

## 4. La démarche à reprendre : celle du cycle 3

Le français du CM1, du CM2 et de la 6ᵉ tient en deux couches, et c'est la
démarche à copier :

1. **Un constructeur de cycle qui aiguille sur la MICRO-compétence**
   (`cycle3/francais/buildCycle3FrancaisBank.ts`, 1 912 lignes) :
   ```ts
   generate: () => questionForNotion(micro.notionId, micro.id)
   ```
   avec de vrais moteurs — `conjugationEngine.ts` (présent, imparfait, futur,
   infinitif) et `parametricFrench.ts` (accords, homophones, sujet-verbe,
   vocabulaire). C'est de là que viennent les 1 998 énoncés du CM1.
2. **Une couche `fixed.bank.ts` par niveau** (477 à 605 lignes), au moins cinq
   QCM figés par notion. Elle enrichit le coach **et** sert de source au test
   du guide de survie, qui ne garde que les `fixed`.

Au cycle 2 on ajoute une chose que le cycle 3 se permet d'ignorer : **le niveau
doit être utilisé**. Entre le CM1 et le CM2 une notion se ressemble ; entre le CP
et le CE2, « orthographe » veut dire « le chat / la chat » d'un côté et
« lecteur/lectrice, joyeux/joyeuse, un cheval → des chevaux » de l'autre.

### Ce que chaque session écrit, et où

Trois sessions travaillent en parallèle. **Aucune ne touche un fichier partagé.**

```
lib/tutor-v4/questionBank/<niveau>/francais/
    index.ts                  ← BANQUES_ECRITES + REPLI filtré
    <notion>.bank.ts          ← une par notion
    generateurs/              ← les moteurs propres au niveau
```

⛔ **Ne pas modifier `cycle2/francais/buildCycle2FrancaisBank.ts`.** Il reste
branché comme repli, filtré sur les micro-compétences déjà couvertes — mieux
vaut une question approximative que pas de question. Chaque banque écrite le fait
reculer.

⛔ **Ne pas relancer `scripts/generer-notions-matrice.mjs`** tant que les trois
classes ne sont pas posées : il écrit dans un fichier commun et effacerait le
travail des deux autres sessions.

Le patron du `index.ts` est déjà écrit, en maths :
`lib/tutor-v4/questionBank/ce2/maths/index.ts` — `BANQUES_ECRITES`, `REPLI`
filtré, et le commentaire d'en-tête qui explique pourquoi.

⚠️ Un moteur de conjugaison servirait au CP (être et avoir au présent), au CE1
(présent, imparfait, futur, passé composé) et au CE2 (+ huit verbes du 3ᵉ
groupe). Le mettre en commun ferait se heurter les trois sessions. **Chacune écrit
le sien dans son dossier.** On factorisera après, en une passe, quand les trois
seront posées.

## 5. Les règles d'écriture

Reprises de `regle-fixed-template-open` et de la campagne de maths du cycle 2.

- **Un générateur bat dix items figés.** Le `kind: "template"` est la règle.
- Un `kind: "fixed"` doit se justifier par un tag : `piege`, `definition`,
  `methode`, `lexique` ou `remarquable`. Un figé sans tag est un défaut.
- **Trois items par micro-compétence ne suffisent pas** : au quatrième passage
  l'élève revoit la première question. Viser une dizaine d'énoncés distincts par
  micro-compétence, mesurés en exécutant.
- **Le « défi » n'est pas une copie.** C'est la même notion, un cran plus dur :
  deux étapes, un piège, ou une justification.
- Pas de transformation zéro-clavier sur le français (elle est propre aux maths).
  `short` et `open` sont donc permis. Au **CP**, préférer `qcm` : une réponse à
  taper ne dépasse pas une lettre, un graphème ou une syllabe. Au CE1 et au CE2,
  `short` peut valoir un mot.
- **Une question ouverte de cycle 2 se répond en une phrase d'enfant de 7 à 9
  ans** : « explique comment tu as trouvé », jamais « justifie ta démarche ».
- Le coach sait lire un texte à voix haute (`app/tutor-v4/ListenButton.tsx`).
  Mais toute question doit rester **répondable sans le son** : on écrit le mot,
  on ne se contente pas de le faire entendre.

## 6. Une notion, un piège, cherché AVANT d'écrire

C'est la règle qui a tenu les banques de maths. Ceux du français du cycle 2, et
les meilleurs sont ceux que le BO nomme lui-même :

- **conscience phonologique** — la syllabe qu'on ENTEND n'est pas celle qu'on
  VOIT : *chapeau* s'entend en deux syllabes et s'écrit avec sept lettres.
- **correspondances graphème-phonème** — un son, plusieurs graphies (o, au, eau)
  et une graphie, plusieurs sons. Le BO nomme les siens : la valeur sonore de
  **s, c, g** selon la lettre qui suit, et **an/am, en/em, on/om, in/im** — le m
  devant m, b, p.
- **lecture, fluence** — la lettre finale muette qu'on prononce, et le mot deviné
  sur sa première syllabe : *chat* lu pour *château*.
- **compréhension** — la chaîne anaphorique, que le BO met en avant aux trois
  niveaux : « il » ne renvoie pas toujours au dernier nom cité. Et l'inférence,
  avec l'exemple du BO : « J'ai pris mon parapluie » → il pleut.
- **copie** — le mot sauté et le point oublié ; on se relit sur ce qu'on a écrit,
  pas sur le modèle.
- **orthographe lexicale** — la lettre muette finale retrouvée par un mot de la
  même famille. Les exemples sont dans le BO : *chat/chaton*, *gros/grossir*,
  *blanc/blanche*, *sang/sanguin*.
- **production d'écrits** — la phrase sans verbe, et les **deux marqueurs** que
  le BO nomme : majuscule et ponctuation finale forte.
- **grammaire de la phrase** — l'interrogative sans point d'interrogation, la
  négation dont on oublie la moitié (*ne … pas*), et le sujet qui n'est pas
  toujours devant le verbe.
- **classes de mots** — le même mot change de classe selon la phrase : *la porte*
  / *il porte*. Et le nom propre reconnu à la seule majuscule, alors qu'en début
  de phrase tout mot en porte une.
- **orthographe grammaticale** — la marque du pluriel **NE S'ENTEND PAS**. Le BO
  l'écrit : « s muet », *deux lapins, mes amis, des pommes*. Et l'accord d'un
  adjectif éloigné de son nom.
- **conjugaison** — *il chante* et *ils chantent* se prononcent pareil. Le BO
  note « marque de pluriel des verbes = nt ».
- **vocabulaire** — le sens propre et le sens figuré, avec l'exemple du BO :
  *souffler ses bougies* / *souffler une réponse*. Et la polysémie : *décoller*.
- **oral** — écouter jusqu'au bout avant de répondre.

## 7. Le programme de référence

**BO n° 41 du 31 octobre 2024, applicable à la rentrée 2025.** C'est celui-là et
pas un autre. Deux documents servent :

- l'**Annexe 3 – Programme de français du cycle 2** (22 pages, texte intégral,
  colonnes « Objectifs d'apprentissage » **et** « Exemples de réussite ») ;
- une **grille CP/CE1/CE2 en trois colonnes** qui met les trois années côte à
  côte, domaine par domaine — le document le plus utile pour voir ce qui change
  d'une classe à l'autre.

⚠️ Le « Projet de programme CSP » d'avril 2024 est la version préparatoire. Sa
structure diffère (« Transcrire de l'oral à l'écrit » au lieu de « Encoder puis
écrire sous dictée »). **Il ne fait pas foi.**

⚠️ Et la leçon du CE1 de maths vaut ici : **relire les micro-compétences contre
le texte intégral**, pas contre une synthèse d'attendus. Au CE1 de maths, la
liste est passée de 92 à 154 micro-compétences après relecture, et six choses
fausses avaient été écrites en s'appuyant sur un résumé.

### Les repères chiffrés du BO

| | CP | CE1 | CE2 |
|---|---|---|---|
| Fluence (mots/min) | 30 sans préparation, 50 après | 70 | 90 |
| Texte lu en autonomie | une dizaine de lignes | une quinzaine | une vingtaine |
| Écrit produit | 1 à 5 lignes | 6 ou 7 phrases | une dizaine de lignes |
| Copie | 3 ou 4 phrases sans erreur | une dizaine de lignes | une dizaine, mise en page complexe |
| Corpus de vocabulaire | 4 par période | 5 par période | 6 par période |
| Œuvres complètes | 5 à 10 par an | 5 à 10 | 5 à 10, en autonomie |

### La progression, domaine par domaine

**Grammaire — se repérer dans la phrase simple**
- **CP** : majuscule, ponctuation finale forte, sens. Les **trois types de
  phrases** (déclarative, interrogative, impérative). Les formes **négative et
  exclamative**. Corpus par classe de mots : noms, verbes, déterminants,
  adjectifs, **pronoms personnels**.
- **CE1** : nommer le **groupe sujet**, le verbe, les compléments (sans les
  distinguer). Effectuer les transformations. Nommer : déterminant, nom commun,
  nom propre, adjectif, verbe, **pronom personnel sujet**.
- **CE2** : idem + l'**adverbe**, la ponctuation de fin (. ! ?) et les **marques
  du discours rapporté (« … »)**.

**Orthographe grammaticale**
- **CP** : masculin/féminin, singulier/pluriel, chaîne d'accords, relation
  sujet-verbe, et **conjuguer être et avoir au présent** — oui, dès le CP.
- **CE1** : le GN (déterminant/nom/adjectif), radical et terminaison d'un verbe
  du 1ᵉʳ groupe, infinitif. **Présent, imparfait, futur puis passé composé** de
  être, avoir et des verbes du 1ᵉʳ groupe.
- **CE2** : marques d'accord dans le GN, relation sujet-verbe, présent,
  imparfait, futur et passé composé de être, avoir, 1ᵉʳ groupe **et des huit
  verbes irréguliers du 3ᵉ groupe : faire, aller, dire, venir, pouvoir, voir,
  vouloir, prendre**.

**Vocabulaire**
- **CP** : polysémie et sens propre/figuré (sans les nommer), **ordre
  alphabétique** et dictionnaire, répertoires par thème, classe grammaticale,
  famille de mots, **synonymes ET antonymes**. Orthographe lexicale : **nommer les
  accents**, valeur sonore de s, c, g, les graphèmes an/am, en/em, on/om, in/im,
  la lettre muette finale par la famille.
- **CE1** : expressions et locutions, **termes génériques et spécifiques**,
  **niveaux de langue** (familier, courant, soutenu), sens propre/figuré,
  **préfixes et suffixes**, dictionnaire.
- **CE2** : + la **gradation** dans la synonymie (*crainte > peur > épouvante*),
  la **dérivation** (*port / portuaire / aéroport*), changer de niveau de langue
  selon la situation, répertoire lexical personnel.

**Lecture — comprendre un texte** : la **chaîne anaphorique** est aux trois
niveaux, l'inférence aussi (simple au CP, « dans des cas simples » au CE1,
appuyée sur des indices et des connaissances au CE2). Le CE2 ajoute la
distinction narratif / informatif / prescriptif.

**Écriture** : cursive minuscule au CP, majuscules cursives au CE1, tout
automatisé au CE2. Copie, dictée et production d'écrits aux trois niveaux.

**Oral** : écouter pour comprendre, dire pour être compris, participer à des
échanges — aux trois niveaux, avec les **niveaux de langue** au CE1 et les
**registres** au CE2.

## 8. ✅ Les micro-compétences, relues et corrigées le 09/08/2026

Commit `462a1860`. Les trois `microSkills.ts`, `notions.ts` et `bo.ts` ont été
relus contre le texte intégral : **153 → 329 micro-compétences**, tout
réaccentué, aucun identifiant renommé ni supprimé. Cohérence vérifiée en
chargeant les neuf fichiers — zéro prérequis orphelin, zéro notion inconnue,
zéro doublon, zéro notion vide. **Cette étape ne se refait pas.**

⚠️ Deux retombées :
- `lib/matrice/notions.generated.ts` est désormais **périmé** pour le français du
  cycle 2. Régénérer avec `scripts/generer-notions-matrice.mjs` **une seule
  fois**, quand les trois classes seront posées ;
- les notions créées tombent dans le repli sur un générateur hors sujet
  (`lecture_voix_haute` et `devenir_lecteur` finissent sur une question de
  langage oral). Normal : tout l'était déjà. Ça disparaît banque par banque.

Ce qui manquait, classe par classe :

**CP** (46 micro-compétences aujourd'hui)
- ⛔ aucune **conjugaison** : être et avoir au présent sont au programme du CP ;
- manque les **trois types de phrases**, les formes négative et exclamative ;
- manque l'**adjectif** et le **pronom personnel** dans les classes de mots ;
- manque **l'orthographe lexicale** en entier : nommer les accents, valeur sonore
  de s/c/g, an/am en/em on/om in/im, la lettre muette par la famille ;
- manque en vocabulaire : **antonyme**, **ordre alphabétique et dictionnaire**,
  polysémie, sens propre/figuré, champ lexical ;
- manque en compréhension : la **chaîne anaphorique** et l'**inférence**.

**CE1** (57 aujourd'hui)
- ⛔ manque l'**imparfait** et le **futur**, qui sont au programme du CE1 alors
  qu'ils ne figurent qu'au CE2 dans le code ;
- manque le **pronom personnel sujet** dans les classes de mots ;
- manque en vocabulaire : **niveaux de langue**, **termes génériques et
  spécifiques**, **préfixes et suffixes**, dictionnaire ;
- manque les **majuscules cursives** en écriture ;
- manque la **chaîne anaphorique**.

**CE2** (50 aujourd'hui)
- ⛔ manque le **passé composé** et les **huit verbes irréguliers du 3ᵉ groupe** ;
- manque l'**adverbe** et le **discours rapporté (« … »)** ;
- manque les **pluriels irréguliers** (-x, -al/-aux) et le **féminin qui
  s'entend** (lecteur/lectrice, joyeux/joyeuse) ;
- manque les **niveaux de langue** et le **sens propre/figuré** nommés ;
- manque la distinction **narratif / informatif / prescriptif**.

⚠️ Retirer ou ajouter une notion touche **quatre endroits** : `microSkills.ts`,
`notions.ts`, le `supportLinks` de la matrice du niveau, puis la régénération de
la matrice — qui attend que les trois classes soient posées.

## 9. La vérification, avant de committer

```bash
node scripts/verifier-banque.mjs cp francais
```

```bash
node --experimental-strip-types scripts/verifier-generateurs.mjs cp francais 600
```

Le second **exécute** chaque `generate()`. Il attrape la bonne réponse absente
des choix et les propositions qui s'effondrent à deux lignes — les deux défauts
mesurés plus haut. Il est bloquant.

Puis compter, à la main, en vingt lignes de script : le nombre d'énoncés
distincts par micro-compétence, et le nombre de micro-compétences encore servies
par le repli. **Les deux chiffres vont dans le commit.**

⛔ Jamais `git add -A`. Committer souvent : une autre session travaille dans le
même dépôt.

Voir les mémoires `regle-fixed-template-open`,
`generateurs-verifies-a-lexecution`, `chantier-cycle2-cp-ce1-ce2`,
`qualite-facteur-numero-un`.
