# Géométrie dans l'espace, terminale spé — l'état MESURÉ (22/11/2026)

Avant de produire quoi que ce soit : ce que le dépôt contient déjà, mesuré à
l'exécution, pièce par pièce. Chaque chiffre est suivi de la commande qui l'a
produit, pour qu'il soit refaisable.

⛔ **Aucun chiffre de cette note ne vient d'un `grep microId`.** Les banques du
dépôt sont en partie bâties sur des fabriques à arguments positionnels, qui ne
produisent aucun `microId` littéral : le grep répond « 0 » sur des micros
pleines. Tout ce qui est compté ici a été compté en important les modules et en
tirant les générateurs.

---

## Le périmètre : 2 notions, 12 micro-compétences

`lib/tutor-v4/knowledge/maths/terminale-spe/` (⚠️ le dossier s'appelle
`terminale-spe`, pas `terminale`, et il n'y a **pas** de `bo-objectifs.ts` à ce
niveau : seulement `bo.ts`, 6 libellés larges, dont `BOTSAG1` « Algèbre et
géométrie » qui porte les deux notions).

| notion | micro | libellé |
|---|---|---|
| `geometrie_espace` | `espace_vecteurs` | Manipuler des vecteurs dans l'espace |
| | `espace_repere_coordonnees` | Travailler avec des coordonnées dans l'espace |
| | `espace_droite_parametrique` | Utiliser une représentation paramétrique de droite |
| | `espace_plan_equation` | Utiliser une équation cartésienne de plan |
| | `espace_position_relative` | Étudier la position relative de droites et de plans |
| | `espace_defi` | Résoudre un exercice type bac |
| `produit_scalaire_espace` | `ps_espace_calculer` | Calculer un produit scalaire dans l'espace |
| | `ps_espace_orthogonalite` | Démontrer une orthogonalité |
| | `ps_espace_norme_distance` | Calculer une norme ou une distance |
| | `ps_espace_angle` | Calculer un angle dans l'espace |
| | `ps_espace_plan_normal` | Utiliser un vecteur normal à un plan |
| | `ps_espace_defi` | Exercice type bac avec produit scalaire |

`produit_scalaire_espace` a `geometrie_espace` en prérequis, et n'ouvre qu'aux
niveaux 2 et 3.

---

## 1. Les banques du coach — PLEINES

169 items sur les deux notions, **12/12 micros servies**, aucune micro à item
unique, donc le `questionPairBuilder` peut former ses paires partout.

```
  14 items  espace_vecteurs            (13 fixed + 1 template) · 13 jouables en QCM
  15 items  espace_repere_coordonnees  (15 fixed)              ·  9 jouables
  15 items  espace_droite_parametrique (15 fixed)              · 15 jouables
  15 items  espace_plan_equation       (15 fixed)              · 14 jouables
  15 items  espace_position_relative   (15 fixed)              · 15 jouables
  12 items  espace_defi                (12 fixed)              · 10 jouables
  15 items  ps_espace_calculer         (14 fixed + 1 template) ·  8 jouables
  14 items  ps_espace_orthogonalite    (14 fixed)              · 11 jouables
  15 items  ps_espace_norme_distance   (14 fixed + 1 template) ·  8 jouables
  14 items  ps_espace_angle            (14 fixed)              · 12 jouables
  13 items  ps_espace_plan_normal      (13 fixed)              · 12 jouables
  12 items  ps_espace_defi             (12 fixed)              ·  8 jouables
```

Deux fichiers, pas un : `geometrie-espace.bank.ts` (62 Ko) **et**
`geometrie-espace-concours.bank.ts` (59 Ko), plus
`produit-scalaire-espace.bank.ts` (58 Ko) — tous trois montés dans
`questionBank/terminale-spe/maths/index.ts`.

Les garde-fous passent :

```
npx --yes tsx@4 scripts/verifier-notion-item.ts terminale
  ✅ terminale-spe  chaque micro est rangée sous sa notion
  (0 item rangé hors de sa notion : les paires peuvent se former)

npx --yes tsx@4 scripts/verifier-latex.ts terminale-spe
  ✅ 1829 items — 0 anomalie, 17 083 textes analysés
```

Aucun item ne porte une micro de l'espace sous un `notionId` étranger (0), et
aucun item n'est rangé sur une micro absente du knowledge (0).

Répartition mesurée sur les 169 items :

- formats : **135 QCM, 34 `short`, 0 `open`** ;
- difficultés : 1→1, 2→15, 3→56, 4→53, 5→44 ;
- explications : 169/169 en ont une.

### ⚠️ Le trou dans les banques : il n'y a pas de figure

**4 items sur 169 portent un canvas** (`terminale_spe_esp_defi_fixed_1` et `_2`,
`terminale_spe_ps_defi_fixed_1` et `_5`). Les 165 autres sont du texte et des
triplets de coordonnées. Sur un chapitre dont tout l'objet est de VOIR dans
l'espace, c'est l'écart le plus net au standard maison (« la figure naît dans le
`generate()` »).

Ce n'est pas un manque d'outil : le canvas `repere3d` existe
(`lib/tutor-v4/types_canvas.ts`), son rendu existe
(`lib/canvas/Repere3dCanvas.tsx`, perspective cavalière, axes, points,
segments), il est branché dans `CanvasRenderer.tsx` — et il n'est utilisé que
par ces 4 items et par la 4ᵉ (`vision-espace`, `reperage`).

Ce que les énoncés nomment, compté sur les textes réellement servis (gabarits
tirés 5 fois) — un décompte de MOTS, qui mesure l'habillage, pas la couverture :

```
 40/169 « norme »            25/169 « vecteur normal »     8/169 « coplanaire »
 38/169 « produit scalaire » 24/169 « orthogonal »          5/169 « cube »
 37/169 « colinéaire »       22/169 « parallèle »           4/169 « intersection »
 19/169 « angle »            16/169 « distance »            3/169 « projeté »
 12/169 « sécant »            7/169 « paramétrique »        2/169 « combinaison linéaire »
  5/169 « équation cartésienne »                            1/169 « tétraèdre » · 0 « pavé »
```

Deux faits à retenir de ce tableau : le **projeté orthogonal**, capacité
explicite du BO, n'est nommé que par 3 items ; et les solides (cube, pavé,
tétraèdre, pyramide) sont quasi absents — l'espace y est algébrique, jamais
dessiné.

---

## 2. Les fiches d'exercices — FAITES, 2/2

- `lib/fiches-exercices/maths-terminale-geometrie-espace.tsx` (509 lignes,
  20 exercices, 6/6 micros citées en en-tête) ;
- `lib/fiches-exercices/maths-terminale-produit-scalaire-espace.tsx`
  (534 lignes, 20 exercices) ;
- les deux pages existent (`app/fiches-exercices/maths/terminale-spe/{geometrie-espace,produit-scalaire-espace}/page.tsx`)
  et les deux chargeurs sont déclarés dans `lib/fiches-exercices/chargeurs.ts` ;
- chacune a son script de recalcul indépendant
  (`scripts/verifier-exercices-terminale-spe-*.mjs`) et une aide locale
  `cavaliere(points, traits)` qui dessine les solides en perspective.

Feuilles du 29/09/2026. Elles ont donc, elles, les figures qui manquent au
coach.

---

## 3. Les fiches de cours — IL N'Y EN A AUCUNE, À AUCUNE NOTION DE TERMINALE

Mesuré sur le registre, à l'exécution (`Object.keys(FICHES_REGISTRE)`) :
**326 fiches de cours, 0 en terminale.**

```
  16 francais/4e    28 francais/5e   29 francais/6e   25 francais/cm1
  28 francais/cm2   16 francais/cp   16 ia/*
  22 maths/3e       34 maths/4e      20 maths/5e      35 maths/6e
   1 maths/cm1      30 maths/cm2      7 maths/premiere-spe   19 maths/seconde
   0 maths/terminale-spe
```

`app/fiches-cours/maths/` s'arrête à `premiere-spe` : il n'y a pas de dossier
`terminale-spe`. Ce n'est pas un oubli : la consigne de la vague du 29/09/2026
(`PASSATION-TERMINALE-CONSIGNES-AGENTS.md`, ligne 7) disait « Aucune fiche de
cours (⛔ rien sous `lib/fiches/` ni `app/fiches-cours/`) ». La terminale est
donc le seul niveau du site avec des banques et des feuilles d'exercices, mais
sans cours.

---

## 4. Les vidéos — ZÉRO sur l'espace

`manim/manifeste-youtube.json` : 1 707 entrées, dont **98 en terminale**,
réparties ainsi :

```
  14 variable_aleatoire   12 loi_binomiale      12 concentration_echantillonnage
  12 denombrement_combinatoire  12 limite_suite 10 probabilite_conditionnelle
  10 convexite_fonction    10 suite_numerique    2 primitive_integrale
   2 algorithmique_python                         2 (sans notionId)
```

**0 vidéo sur `geometrie_espace`, 0 sur `produit_scalaire_espace`** — ni dans le
manifeste, ni dans `lib/videos/videos-r2.json` (2 058 entrées, aucune mention
des micros de l'espace).

Branchement au coach, lu en production (lecture seule) :

```
node scripts/brancher-videos-coach.mjs --classe terminale-spe --tout
  → 79 vidéos publiées déjà branchées · 0 à brancher
  → aucune ligne ne cite une micro de l'espace
```

⚠️ `--classe terminale` (sans `-spe`) écarte tout en disant « notion inconnue du
coach terminale » : la classe du coach s'écrit **`terminale-spe`**. Le premier
appel ne mesure rien.

Les 12 micros de l'espace sont donc les seules micros de terminale ayant des
banques pleines et aucune vidéo.

---

## Récapitulatif

| pièce | état mesuré |
|---|---|
| connaissances (notions + micros) | ✅ 2 notions, 12 micros, cohérentes |
| banques du coach | ✅ 169 items, 12/12 micros, LaTeX et rangement OK |
| … leurs figures | ⛔ **4 canvas sur 169**, alors que `repere3d` existe et fonctionne |
| … leurs formats | ⚠️ 0 question `open`, alors qu'en terminale elles sont voulues |
| fiches d'exercices | ✅ 2/2 notions, 20 exercices chacune, figures en cavalière |
| fiches de cours | ⛔ **0 — aucune fiche de cours en terminale, toutes notions confondues** |
| vidéos | ⛔ **0 sur les deux notions** (98 vidéos de terminale, aucune en géométrie) |

## Les commandes, pour refaire la mesure

```
npx --yes tsx@4 scripts/verifier-notion-item.ts terminale
npx --yes tsx@4 scripts/verifier-latex.ts terminale-spe
node scripts/brancher-videos-coach.mjs --classe terminale-spe --tout
```

⚠️ `scripts/auditer-banque-runtime.ts` ne connaît **que le français** (ses
imports sont explicites et s'arrêtent à `francaisSecondeQuestionBank`) :
`… terminale` y répond « pas de banque déclarée dans ce script ». Les décomptes
par micro de cette note ont été obtenus en important
`mathsTerminaleSpeQuestionBank` et `getKnowledgePack("terminale-spe", "maths")`
dans un script jetable, et en tirant chaque `generate()`. Si on remesure
souvent, le bon geste est d'ajouter les maths à cet audit plutôt que de refaire
un jetable.
