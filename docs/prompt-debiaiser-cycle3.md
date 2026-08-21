# Chantier : finir le cycle 3, puis les couches `fixed`

Écrit le 21/08/2026, à coller dans une session neuve.
Ce prompt prend la suite de `docs/prompt-debiaiser-cycle4.md`, qui est **terminé**.

---

## Ce qu'il y a à faire, en une phrase

Le français de **CM1, CM2 et 6ᵉ** se laisse encore gagner à la longueur :
dans deux questions sur cinq, la bonne réponse est la plus longue des quatre.
Le gros du travail est fait — il reste **14 jeux** dans le builder partagé, et
surtout les **couches `fixed` propres à chaque classe**, qui n'ont pas été
touchées.

## La mesure, à refaire AVANT de toucher quoi que ce soit

```bash
node --experimental-strip-types --no-warnings scripts/verifier-devinabilite.mjs --etalon
```

L'instrument porte ses trois étalons et les vérifie à chaque lancement.
**Si l'étalonnage ne passe pas, ne rien mesurer d'autre.**

Puis, classe par classe :

```bash
node --experimental-strip-types --no-warnings scripts/verifier-devinabilite.mjs 6e francais
```

État au 21/08/2026, après cinq lots :

| classe | items | la bonne est la plus longue | avance moyenne |
|---|---|---|---|
| ✅ CP (18/08) | 202 | 24 % | +1,2 car. |
| ✅ 2de (18/08) | 192 | 25 % | +0,4 car. |
| ✅ 5ᵉ · 4ᵉ · 3ᵉ (20/08) | 1195 | 34 % | +1,2 à +1,5 |
| **CM1** | 230 | **39 %** | +3,2 car. |
| **CM2** | 338 | **41 %** | +3,7 car. |
| **6ᵉ** | 193 | **45 %** | +5,3 car. |

Les trois classes sont **VERTES au seuil calibré** (80 % *et* +15 car.). Ce
n'est pas une panne, c'est un défaut de qualité installé. ⛔ Ne pas baisser le
seuil pour se donner raison. L'objectif reste **sous 35 %** et **sous +5 car.**

## Où est la cause — et c'est là que ça change

⭐ **Le builder partagé est presque fini. Le reste est dans les couches `fixed`.**

| fichier | items | part | avance |
|---|---|---|---|
| `cycle3/francais/buildCycle3FrancaisBank.ts` (CM1+CM2+6ᵉ) | 784 jeux | 36 % | +2,7 |
| ⛔ **`6e/francais/fixed.bank.ts`** | 43 | **67 %** | **+12,5** |
| ⛔ `cm2/francais/fixed.bank.ts` | 68 | 51 % | +6,4 |
| `cm1/francais/fixed.bank.ts` | 41 | 46 % | +4,4 |

**Commencer par `6e/francais/fixed.bank.ts`** : 43 items seulement, et c'est
lui qui tient la 6ᵉ au-dessus des autres. Le builder ne rendra plus grand-chose.

## L'outil de chantier

`scripts/` ne contient pas d'outil qui donne la LIGNE à éditer. En écrire un
jetable (il l'a été deux fois, il se réécrit en dix minutes) : il lit le
SOURCE, repère chaque `correct:` suivi de son `wrongs:`, et rend la ligne,
l'avance, l'énoncé et les quatre propositions avec leurs longueurs. Trier par
avance décroissante et traiter par lots de quinze.

⚠️ Les couches `fixed` n'ont **pas** la forme `{ text, correct, wrongs }` : elles
appellent `qcm(id, notionId, microId, difficulty, text, choices, correct, …)`,
où `choices` est un **ordre figé** et où la bonne réponse figure **DEUX fois**
(dans `choices` ET dans l'argument `correct`). La raccourcir à un seul endroit
rend l'item insoluble sans qu'aucun vérificateur s'en aperçoive.

## ⛔ LA RÈGLE DU REMÈDE — elle vient de Frédéric, 14/08

**« Le remède n'est pas de gonfler les leurres, c'est d'ajouter des cas à
réponse courte. »** Deux gestes seulement :

1. **Raccourcir la bonne réponse** quand elle dit plus que nécessaire.
2. **Rendre les leurres PLAUSIBLES** — ce qui les allonge naturellement.

## ⭐ Les quatre montages qui marchent, éprouvés sur 900 jeux

Ce sont eux le vrai acquis du chantier. Dans les quatre, **la longueur ne peut
plus rien trahir, par construction** — ce n'est plus une question d'équilibrage
à la main.

**1. L'INVERSION**, sur toute règle à deux branches. Le leurre échange les deux
termes de la bonne réponse :
- `être → avec le sujet ; avoir → avec le COD` **contre** `avoir → avec le
  sujet ; être → avec le COD`
- `« qui » est sujet ; « que » ne l'est pas` **contre** l'inverse
- `l'antécédent est dit AVANT` **contre** `APRÈS`

Même longueur, même vocabulaire, même forme. Il faut savoir dans quel SENS va
la règle, et non seulement qu'elle existe.

**2. LE RÉSULTAT, PAS SON NOM.** Sur les manipulations syntaxiques, le leurre
porte la phrase transformée : `« C'est son filet que le pêcheur répare. » —
« son filet » est donc le sujet` au lieu de `le verbe change de personne`.
L'élève lit ce que la manipulation produit — c'est exactement ce qu'on lui
demande de savoir faire.

**3. LA LISTE FERMÉE**, quand la bonne réponse énumère : `un verbe d'état :
être, sembler, devenir` **contre** `un verbe d'action : courir, prendre, dire`,
`une préposition : à, de, par`, `une conjonction : et, ou, mais`. Quatre
listes de même forme ; seule la classe grammaticale les sépare.

**4. LE CHIFFRE QUI PORTE SA RAISON** : `deux : « petit » et « blanc »` se
choisit contre `une seule : « petit »`, `une seule : « blanc »`, `trois : « le »,
« petit » et « blanc »`. Plus jamais de nombres nus (`deux`, `trois`, `aucun`).

**5. LA MÊME THÈSE DANS LES QUATRE LIGNES**, seule la justification change
(aucune / prise hors du texte / un fait donné pour une raison / la bonne).
Employé sur l'avis de lecteur et le débat interprétatif au cycle 4.

## Les pièges du dépôt, à ne pas rouvrir

- ⛔ **Les quatre choix doivent s'EXCLURE deux à deux.** En rendant un leurre
  plausible, on risque de le rendre *juste*. **Aucun instrument ne voit ce
  défaut** — seule la relecture. Trois cas rencontrés et écartés :
  « un scénario de film » porte aussi des noms en tête de ligne (théâtre) ;
  une incise sans guillemets reste du discours DIRECT ; « la ruse » et
  « la douceur » se recouvrent dans un réseau de lectures.
- ⛔ **Un leurre allongé devient FAUX aussi souvent que juste.** Plusieurs
  pools portent leur règle d'écriture en commentaire d'en-tête — la lire AVANT
  de réécrire. Voir `leurres-allonges-trois-pieges` en mémoire.
- ⛔ **Pas de ligne morte.** Un leurre jamais bonne réponse et présent à chaque
  tirage ramène le QCM à trois lignes : 33 % au lieu de 25.
- ⚠️ **Le biais peut être dans le GABARIT, pas dans les données** : une bonne
  réponse qui incorpore une variable que le leurre n'incorpore pas est plus
  longue à CHAQUE tirage. Relire les cas ne le trouve jamais.
- ⚠️ `scripts/auditer-banque.mjs` **ment sur tout le français** : il lit le
  SOURCE. Utiliser `scripts/auditer-banque-runtime.ts`.

## Le contrôle de non-régression

Après chaque lot, sur **les trois classes** :

```bash
npx --yes tsx@4 scripts/verifier-demarrage.ts 6e francais complete
```

⚠️ **Toujours passer le MODE en argument.** Une même classe rend des chiffres
opposés en `simple` et en `complete`.

État de référence au 21/08 : **CM1 63/63, CM2 90/90, 6ᵉ 50/50**, aucune ligne
détournée, aucune qui lève. Ne pas dégrader.

Et :

```bash
node --experimental-strip-types --no-warnings scripts/verifier-generateurs.mjs 6e francais
npx --yes tsx@4 scripts/verifier-doublons-choix.ts 6e francais
npx tsc --noEmit
```

## Ce qui est fini et qu'il ne faut PAS retoucher

- ✅ **Cycle 4** (5ᵉ, 4ᵉ, 3ᵉ) : 34 %, terminé le 20/08.
- ✅ **CP** 24 %, **2de** 25 %.
- ✅ **Le démarrage de tout le cycle 2** : CP 96/96, CE1 125/125, CE2 128/128.
  59 seconds items écrits le 20/08 — plus une ligne qui plante ni qui se
  détourne.
- ⛔ **La STMG et les fiches de cours sont tenues par d'autres sessions.**
  Ne pas y toucher : `lib/fiches/`, `lib/tutor-v4/questionBank/stmg/`.

## Conventions de travail

- ⛔ **Jamais `git add -A`** : nommer les fichiers un par un.
- ⛔ **Ne commiter et ne pousser QUE son propre travail.** Vérifier
  `git log origin/main..HEAD` avant tout push : d'autres sessions travaillent
  en parallèle dans le même dépôt.
- Commiter **souvent**, pousser **par lots** — quota Vercel.
- Les commentaires du dépôt sont en français, denses, et expliquent le POURQUOI
  d'un choix ainsi que ce qui a été mesuré. Le prochain lecteur doit pouvoir
  refaire la mesure.
- Annoncer les résultats avec **les trois nombres** du contrôle de démarrage
  (franches / détournées / lèvent), jamais un chiffre mélangé.

## Ce que « fini » veut dire

1. CM1, CM2 et 6ᵉ sous **35 %**, avance moyenne sous **+5 car.**
2. Plus aucun item au-dessus du seuil individuel de 20 caractères.
3. Les trois classes démarrent toujours à 100 % en mode complet.
4. `npx tsc --noEmit` propre.
5. Un échantillon d'items relu à la main — c'est le seul contrôle qui trouve
   une seconde réponse défendable.

## ⏭️ Après ça

Le seul 🟠 restant du dépôt entier est le **français de CE2** : 53 % / **+21,8
car.**, concentré dans `ce2/francais/langage-oral.bank.ts` à **+65,6** — soit
plus que l'étalon « défaut pur » de l'instrument lui-même (+55,8). C'est le
prochain chantier, et il tient dans un seul fichier.
