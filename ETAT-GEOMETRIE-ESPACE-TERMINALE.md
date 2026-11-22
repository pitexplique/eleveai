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

---

## Ce qui a été ouvert le 22/11/2026 : les figures du coach

Frédéric a choisi cette pièce-là. Les banques ne manquaient pas d'items, elles
manquaient de dessins.

**96 items sur 169 portent maintenant une figure**, contre 4 le matin. Chaque
micro-compétence en a au moins quatre, donc le `questionPairBuilder` peut
servir une paire illustrée partout :

```
   5/14 espace_vecteurs           10/15 ps_espace_calculer
  12/15 espace_repere_coordonnees  7/14 ps_espace_orthogonalite
   9/15 espace_droite_parametrique 11/15 ps_espace_norme_distance
   9/15 espace_plan_equation       4/14 ps_espace_angle
   6/15 espace_position_relative   8/13 ps_espace_plan_normal
   8/12 espace_defi                8/12 ps_espace_defi
```

Les figures viennent d'un module commun aux trois banques,
`lib/tutor-v4/questionBank/terminale-spe/maths/espace-figures.ts` : un vecteur
et ses trois coordonnées en escalier, deux vecteurs issus du même point, deux
points et le segment, un triangle, le cube $ABCDEFGH$, un tétraèdre, une
droite, un morceau de plan, une droite et un plan, deux plans, deux droites, un
point et son plan (ou sa droite) avec la perpendiculaire amorcée. Toutes en
canvas `repere3d`, donc en perspective cavalière, rendues par
`lib/canvas/Repere3dCanvas.tsx` qui existait déjà.

### Pourquoi 73 items n'en ont pas, et c'est volontaire

- on dessine les **données** (points, solide, droite, morceau de plan) ;
- on ne dessine **jamais la réponse**. Deux vecteurs colinéaires se dessinent
  superposés : l'élève cocherait sans calculer. Même chose pour un milieu, un
  projeté, une position relative ou une appartenance qu'on demande de trouver ;
- une question de pure définition (« quelle est la formule de la norme ? ») n'a
  pas de figure : un dessin décoratif est interdit.

Un item a perdu sa figure en cours de route pour cette raison
(`terminale_spe_geo_concours_17`, « le plan d'équation $z = 0$ est : ») : le
dessin montrait que c'est le plan $(Oxy)$, c'est-à-dire la réponse. Trouvé en
regardant la question dans le coach, pas en relisant le code.

### L'instrument : `scripts/verifier-figures-espace-terminale.mjs`

`scripts/apercu-canvas.mjs`, l'étalon du dépôt, est **hors service pour tous
les canvas** : il charge `CanvasRenderer`, qui charge `TableauDonneesCanvas` →
`TexteMath` → `katex/dist/katex.min.css`, et Node s'arrête sur le `.css`
(`ERR_UNKNOWN_FILE_EXTENSION`). Je ne l'ai pas retouché (une autre session s'en
sert peut-être) : le nouveau script ne charge que `Repere3dCanvas`.

Il rend les 121 figures distinctes des trois banques (gabarits tirés douze
fois) et mesure cinq choses :

1. un texte coupé par le bord du SVG ;
2. un texte sous 11 px dans le bloc du coach (280 px sur un téléphone — et non
   250 px, qui est le cadre d'une carte de fiche) ;
3. ⭐ **deux noms l'un sur l'autre** — le rendu pose toutes les étiquettes au
   même décalage, sans réglage possible. Aucun outil du dépôt ne voyait ça ;
4. la santé de la figure (coordonnée NaN, segment vers un point inexistant,
   deux points de même nom, figure plate) ;
5. ⭐⭐ **la figure dit-elle la même chose que son énoncé ?** Les triplets
   écrits dans l'énoncé sont des points dessinés, les quatre coins d'un morceau
   de plan vérifient l'équation, les points d'une droite vérifient la
   représentation paramétrique.

### Ce que l'instrument a trouvé, et que la lecture n'aurait pas vu

- **Les coins des morceaux de plan n'étaient pas dans leur plan.** J'arrondissais
  les coordonnées calculées à deux décimales (pour un JSON plus court) : sur
  treize items portant une équation de plan, deux coins sur quatre seulement la
  vérifiaient encore. Un dessin faux, parfaitement crédible à l'œil. Arrondi
  supprimé.
- **Un nom d'axe collé au nom d'un plan** : « y » et « P » à 10 px l'un de
  l'autre. Le nom du plan se pose maintenant sur le coin le plus seul.

### Et l'instrument, lui, a été étalonné

Trois fautes ont été posées exprès dans les banques — un point transposé
(`B(4 ; 6 ; 3)` dessiné en `(4 ; 3 ; 6)`), un plan dont on change le terme
constant, une direction de droite fausse. **La première version n'en a vu que
deux** : elle ne criait que si AUCUN triplet de l'énoncé n'était dessiné, et le
point transposé passait parce que l'autre point, lui, était juste. La règle est
devenue « chacun », avec une liste courte et explicite des deux seuls items où
un triplet n'est volontairement pas dessiné. Les trois fautes sont alors
attrapées, et une quatrième, réelle, est apparue.

Deux fois, c'est l'instrument qui se trompait et non les figures : un lecteur
d'équation qui avalait le « 2 » de « 2x + 3y − z + 1 = 0 » (22 figures accusées
à tort), et un lecteur de représentation paramétrique qui lisait « 4t » comme
« origine 4, direction 1 ». Les deux sont corrigés et commentés dans le script.

### Ce qui n'est pas fait

- ⛔ **Frédéric n'a pas encore validé l'affichage** : deux questions ont été
  regardées dans le coach en `npm run dev` (une norme de vecteur, une équation
  de plan), sur écran et à 375 px. Les 94 autres figures sont mesurées, pas
  regardées une à une.
- Les **questions `open`** (voulues en terminale pour préparer l'oral) restent à
  zéro sur ces deux notions.
- La **fiche de cours** (aucune en terminale) et la **vidéo** (aucune sur ces
  deux notions) restent entières.

## Ce qui a été ouvert ensuite, le 22/11/2026 : la série vidéo

Les 12 micros de l'espace sont les seules micros de terminale à avoir des banques pleines
et **zéro vidéo**. La série est donc 12 épisodes, un par micro, chacun en paysage + short.

### La décision technique, et pourquoi

**Pas de scène 3D Manim : de la cavalière 2D.** Mesuré : il n'existe aucune
`ThreeDScene` dans le dépôt. Mais la maison dessine des solides en cavalière depuis la
5ᵉ (`manim/scripts/5e/aire_volume_5e_commun.py`, repris en 4ᵉ et en 3ᵉ). Ce qui tranche
n'est pas le temps de rendu : **le coach montre la même projection**
(`lib/canvas/Repere3dCanvas.tsx`, cavalière à 30°). Un élève qui regarde la vidéo puis
ouvre sa question retrouve exactement le même dessin.

`manim/poste2/espace3d.py` donne aux 12 épisodes : le repère, un point avec son escalier
de coordonnées, un vecteur (une vraie flèche — le canvas du coach n'a que des segments),
une droite paramétrée, un morceau de plan teinté, le cube `ABCDEFGH`, un tétraèdre, la
marque d'angle droit, la perpendiculaire amorcée. Plus `PlancheEspace3D`, la planche de
contrôle 4 × 2 qu'on REGARDE.

⭐⭐ **Trois défauts trouvés à l'image, aucun à la lecture** : les arêtes étaient de la
couleur du fond (cube et tétraèdre invisibles — aucun audit ne le dit, rien ne sort du
cadre) ; le nom d'un plan tombait sur le nom de l'axe `y` ; un sommet du cube tombait à
l'intérieur du cube.

### Les voix : 12/12 écrites, et leur passe maths exécutée

`manim/poste2/VOIX-espace-terminale.md` est la **source de vérité** des 12 voix
(15 clips chacune, 180 répliques) ; les JSON de `manim/voix/` en sont extraits par
`manim/poste2/voix-espace-depuis-md.py`. ⛔ On corrige le `.md`, jamais les JSON.

Deux contrôles, tous deux **étalonnés avec des fautes posées exprès** (3/3 et 3/3) :

```
python manim/poste2/verifier-voix-espace.py          → 12 épisodes, 15 clips, 0 symbole
                                                       non prononçable, 0 copier-coller
python manim/poste2/controler-maths-voix-espace.py   → 0 affirmation fausse sur 180 répliques
```

Le second réécrit **en calcul** chaque nombre dit par les voix, et le compare : c'est la
réponse à la voix validée qui disait « 6 032 a 3 centaines » dans un clip de correction.
⛔ L'étalonnage a aussi trouvé deux de mes propres tests creux (`isclose(0, 1)`, un `True`
en dur) : un instrument qui n'a jamais eu tort n'a peut-être jamais rien mesuré.

### Ce qui n'est pas fait sur la série

- ⏳ **Aucun rendu** : ni WAV, ni marques, ni script Manim, ni `-ql`, ni HD. Les 12 voix
  attendent leur fabrication, épisode par épisode.
- ⏳ Les **12 shorts** n'ont pas de voix : leur gabarit se relit sur un short de terminale
  existant avant d'être écrit.
- ⭐ Le cube `ABCDEFGH` dans le repère (A ; AB, AD, AE) revient dans **9 épisodes sur 12** :
  c'est un décor à dessiner une fois (fait) et à réutiliser.

## Les commandes, pour refaire la mesure

```
node scripts/verifier-figures-espace-terminale.mjs
npx --yes tsx@4 scripts/verifier-notion-item.ts terminale
npx --yes tsx@4 scripts/verifier-latex.ts terminale-spe
node scripts/brancher-videos-coach.mjs --classe terminale-spe --tout
```

État au 22/11/2026 après les figures : `96 items portent une figure · 121
figures distinctes rendues · aucun débordement, aucun texte trop petit, aucun
nom superposé`, `terminale-spe 1829 items — 0 anomalie de LaTeX`, `aucun item
rangé hors de sa notion`.

⚠️ `scripts/auditer-banque-runtime.ts` ne connaît **que le français** (ses
imports sont explicites et s'arrêtent à `francaisSecondeQuestionBank`) :
`… terminale` y répond « pas de banque déclarée dans ce script ». Les décomptes
par micro de cette note ont été obtenus en important
`mathsTerminaleSpeQuestionBank` et `getKnowledgePack("terminale-spe", "maths")`
dans un script jetable, et en tirant chaque `generate()`. Si on remesure
souvent, le bon geste est d'ajouter les maths à cet audit plutôt que de refaire
un jetable.
