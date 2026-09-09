# Une notion inconnue sert la PREMIÈRE notion du pack, en silence

**Mesure du 09/09/2026.** Point de départ : le constat de Frédéric.

```
POST /api/tutor-v4/start
{"classe":"5e","matiere":"maths","notion":"nombres_relatifs","displayMode":"simple"}
-> notionId=algo_programmation, micro=algo_sequence, énoncé sur des blocs Scratch
```

**Rien n'est corrigé.** Ce document mesure. L'instrument est
`scripts/mesurer-notions-perimees.ts` (`npx --yes tsx@4 …`), relançable.

---

## 1. Pourquoi `findNotion` n'a pas levé

Il ne peut pas lever. `lib/tutor-v4/selection/selector.ts:14` :

```ts
export function findNotion(pack: KnowledgePack, notionId: string): KnowledgeNotion {
  return pack.notions.find((n) => n.id === notionId) ?? pack.notions[0];
}
```

Ni correspondance approximative, ni pack différent : **`?? pack.notions[0]`**, sec.
Un identifiant inconnu rend la première notion du pack, sans trace.

Conséquence sur le garde-fou de `tutorEngineV4.ts:478` :

```ts
const notion = findNotion(knowledge, input.notion);
if (!notion) {
  throw new Error("Notion inconnue");   // ⛔ CODE MORT
}
```

Le type de retour est `KnowledgeNotion`, **non nullable**. `notion` n'est falsy
que si le pack est vide — jamais le cas sur les 41 couples. **Ce `throw` n'a
jamais pu s'exécuter.** C'est bien pour ça qu'aucune erreur n'est apparue.

`findMicro` (`selector.ts:21`) a exactement le même repli : `?? pack.microSkills[0]`.

Et le repli est **doublé**, indépendamment, côté navigateur —
`app/tutor-v4/TutorV4Client.tsx:750` :

```ts
const initialNotion = urlNotion && options.includes(urlNotion) ? urlNotion : options[0] ?? "";
```

Le client sait donc reconnaître un identifiant inconnu, et il choisit de ne rien
en dire. Un élève arrivé par un lien périmé voit le menu déroulant afficher la
notion de repli comme si c'était la sienne. Pire, quand l'URL porte aussi un
`microId` (c'est le cas des liens de remédiation), `TutorV4Client.tsx:799-807`
**démarre la séance tout seul** sur cette notion-là.

> ⚠️ Mesuré : le repli du moteur (constat de Frédéric ci-dessus) et l'identité
> des identifiants (script). **Lu dans le code, pas mesuré en bout de chaîne :**
> le repli du client et le démarrage automatique. Un aller-retour navigateur
> reste à faire pour les confirmer.

### La cible du repli, classe par classe

`pack.notions[0]`, mesuré sur les 41 couples. Extrait :

| classe / matière | notions | ce qui est servi |
|---|---|---|
| 6e, 5e, 4e, 3e maths | 35, 19, 33, 22 | **`algo_programmation`** |
| cp → cm2 maths | 13 → 30 | `nombre_entier` |
| seconde maths | 24 | `reels_intervalles` |
| stmg maths | 86 | `auto_proportion` |
| cp, ce1, ce2 français | 16, 16, 14 | `langage_oral` |
| cm1, cm2, 6e français | 25, 27, 29 | `fluence_lecture` |
| 5e, 4e, 3e français | 28, 19, 19 | `lecture_comprehension` |

Tout le collège en maths tombe sur l'algorithmique : c'est un accident d'ordre
alphabétique, et c'est la pire cible possible — le Scratch n'a aucun rapport
visible avec ce que l'élève demandait.

---

## 2. Les deux sources de vérité

```
catalog.ts / loadKnowledgeV4 → buildKnowledge<Classe><Matiere>() → notions.ts   ← FAIT FOI
lib/tutor-v4/knowledge/*.knowledge.json                                          ← MORT
```

**Les quatre JSON de `lib/tutor-v4/knowledge/` (3e, 4e, 5e, 6e maths, figés au
31/08 14:18) n'ont AUCUN importeur dans le dépôt.** Vérifié : la seule
occurrence de leur nom est un commentaire dans `lib/fiches/maths-6e-fractions.tsx`.
L'ancien tuteur lit ses propres copies, dans un autre dossier
(`lib/tutor/knowledge/`, via `lib/tutor/loaders/loadKnowledge.ts`).

`docs/note-du-matin.md:227` le disait déjà — la note est exacte, elle n'est
simplement pas allée jusqu'à retirer les fichiers.

C'est ce qui a mis Frédéric sur une fausse piste : `nombres_relatifs` **existe**
dans `5e.maths.knowledge.json`, et **n'existe pas** dans la 5e vivante, qui dit
`relatif_nombre` et `relatif_operation`. Le fichier lu n'est pas le fichier servi.

**Les deux registres vivants, eux, sont d'accord.** Le moteur (`loadKnowledgeV4`)
et le navigateur (`catalog.ts`) ont été comparés identifiant par identifiant sur
les 41 couples : **aucun écart**. Il n'y a donc pas ici le piège de
`catalog.ts:110` (la seconde en français servant du CE1) — celui-là est fermé.

---

## 3. Combien de liens envoient un élève ailleurs, en silence

Balayage de tous les identifiants **écrits à la main** dans `app/` et `lib/` —
URL littérales, matrice d'entrée, référentiel de l'évaluation nationale — résolus
contre le pack vivant. (Les liens construits à l'exécution depuis le pack,
`notion=${score.notionId}`, sont valides par construction : hors périmètre.)

```
Lignes de source examinées      : 397
Lignes portant un id périmé     : 236
IDENTIFIANTS DISTINCTS PÉRIMÉS  :   7
```

| classe/matière | identifiant écrit | ce qui est servi | lignes | où |
|---|---|---|---|---|
| cm2/français | `oral` | `fluence_lecture` | 170 | éval. nationale |
| cm2/français | `comprehension_textes_documents` | `fluence_lecture` | 49 | éval. nationale |
| cm2/français | `vocabulaire` | `fluence_lecture` | 7 | éval. nationale |
| cm2/français | `culture_litteraire` | `fluence_lecture` | 7 | éval. nationale |
| **cm1/français** | **`grammaire_orthographe`** | **`fluence_lecture`** | 1 | **matrice, thème « grammaire »** |
| **cm1/français** | **`comprehension_textes_documents`** | **`fluence_lecture`** | 1 | **matrice, thème « lecture »** |
| 6e/maths | `fractions` | `algo_programmation` | 1 | `app/podcast-maths/ecrit/fractions/page.tsx:134` |

**Les deux lignes de `lib/matrice/coach.ts` sont les plus graves**, malgré leur
poids d'une ligne : c'est la boîte de recherche de l'élève. Un CM1 qui tape
« grammaire » ou « lecture » n'ouvre pas la grammaire ni la lecture — il ouvre
la fluence, et rien ne le lui dit. Les 233 autres lignes sont un seul défaut
répété : le référentiel de l'évaluation nationale a fusionné des notions que le
pack sépare (`comprehension_textes` **et** `comprehension_documents`,
`vocabulaire_sens` / `_formation` / `_emploi`, trois notions `culture_*`).

Le lien du podcast est le jumeau exact du cas de départ : `fractions` au lieu de
`fraction_nombre`, et l'élève reçoit du Scratch.

**Donc oui, la réponse à la question 3 est oui** — un signet ou un lien périmé
envoie quelqu'un sur une notion qu'il n'a pas demandée, sans un mot. Et
l'ampleur est faible et bornée : **7 identifiants**, pas 236.

---

## À décider — rien n'est fait

1. **Le repli est-il délibéré ?** S'il l'est, il faut au moins qu'il se voie
   (un bandeau « cette notion n'existe plus, voici X »). S'il ne l'est pas,
   `findNotion` doit rendre `undefined` et le moteur lever pour de bon — le
   `throw` de `tutorEngineV4.ts:480` est déjà écrit, il ne lui manque qu'un type
   nullable. ⚠️ Basculer `findNotion` fait tomber les 7 liens ci-dessus en
   erreur visible : **les corriger d'abord, la sonde ensuite.**
2. Les 4 JSON morts de `lib/tutor-v4/knowledge/` : les supprimer coupe la
   fausse piste à la racine.
3. Un vérificateur permanent ? `scripts/mesurer-notions-perimees.ts` rend déjà
   le compte ; le brancher là où les autres vérificateurs tournent le
   maintiendrait à zéro.
