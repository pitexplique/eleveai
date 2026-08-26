# Prompt — les fiches de français de 5e et de 6e

> Écrit le 26/08/2026, au terme de la session qui a fiché la 4e entière.
> À coller tel quel dans une session neuve.

---

## Ta mission

Écrire les fiches de cours de français qui manquent en **5e** et en **6e**, au
standard des seize fiches de 4e écrites le 26/08/2026.

**État mesuré ce jour-là** (`npx --yes tsx@4 scripts/couverture-fiches.ts`) :

| classe | notions | fichées | reste | dont hors étude de la langue |
|---|---|---|---|---|
| **4e** | 19 | **19** | 0 | — |
| 6e | 29 | 9 | **20** | 16 |
| 5e | 28 | 8 | **20** | 12 |

⛔ **Le trou n'est pas seulement du côté lecture.** La 5e manque aussi huit
fiches de LANGUE : tout le vocabulaire, les registres, la conjugaison des formes
et des valeurs. Liste exacte : `npx --yes tsx@4 scripts/couverture-fiches.ts --manquantes`.

---

## ⚠️⚠️ TROIS PROGRAMMES DIFFÉRENTS — NE JAMAIS TRANSPOSER

C'est l'erreur qui coute le plus cher, et deux sessions l'ont failli faire.

| classe | référence | jusqu'à |
|---|---|---|
| **6e** | BO n° 16 du 17 avril 2025 — elle **ferme le cycle 3**, comme le CM1 et le CM2 | — |
| **5e** | BO n° 10 du 5 mars 2026 (arrêté du 18 février 2026), rubriques « Cinquième » | — |
| 4e | arrêté du 9 novembre 2015, consolidé au BO n° 31 du 30 juillet 2020 | sept. 2027 |

**Conséquences concrètes :**

- ⛔ Le **conditionnel est un MODE** en 4e, un **temps de l'indicatif** en 5e. Les
  deux fiches disent l'inverse et ont raison chacune pour sa classe.
- ⛔ La 6e ne suit **pas** le programme de cycle 4. Ne jamais lui appliquer une
  logique de 5e.
- ⛔ Les entrées littéraires diffèrent entièrement d'une classe à l'autre.

**Avant d'écrire une fiche, lis l'en-tête de la banque de la notion dans
`lib/tutor-v4/questionBank/<classe>/francais/` : la référence exacte y est
écrite en gras.**

---

## Le modèle : les seize fiches de 4e

Ouvre-en deux avant de commencer. Les plus instructives :

- `lib/fiches/francais-4e-phrase-complexe.tsx` — la structure de base.
- `lib/fiches/francais-4e-lecture-comprehension.tsx` — comment dessiner une
  notion « indessinable ».
- `lib/fiches/francais-4e-lecture-documents.tsx` — comment dessiner une image
  qu'on n'a pas.

Chaque fiche = **deux fichiers** :

```
lib/fiches/francais-<classe>-<notion>.tsx      la donnée
app/fiches-cours/francais/<classe>/<notion>/page.tsx   la page (métadonnées SEO)
```

Puis, **à la toute fin seulement**, `lib/fiches/registre.ts` et `app/sitemap.ts`.

---

## Ce que le SEO exige, et qui a été mesuré

- Le `titre` **porte l'année scolaire** : « … en 5e (2026-2027) ». La requête
  tapée est « programme 5e 2026 2027 », pas « fiche de grammaire ». Le titre
  remonte dans le H1 **et** dans tous les H2 de la page.
- ⚠️ Le titre **nomme aussi le PDF** : le changer rend l'ancien orphelin, et
  `npm run verifier:pdf` le signale.
- La `description` de la page **contient le mot « français »**. Mesuré le
  26/08 : il n'était dans **aucun** des 94 titres du site et dans dix
  descriptions. Modèle : « Programme de français 5e 2026-2027 : … ».
- Le composant ajoute lui-même « — cours de français 5e » au H1. Ne pas le
  répéter.

---

## ⛔ Les huit pièges de fabrication, tous payés le 26/08

Aucun n'est deviné : chacun a couté une passe de correction.

1. **`role` n'existe pas sur un mot.** La couleur vient du `label` du GROUPE.
   Un mot par entrée, ponctuation comprise, et `focus: true` pour désigner.
2. **⛔⛔ AUCUN `titre` SUR UN DESSIN `phrase`.** Il ne se plie pas à
   `largeurMax`, il élargit la boite, et tout le dessin rapetisse dans son bloc.
   Mesuré : **5,6 px** de police au lieu de 12. Les fiches de 5e existantes n'en
   mettent jamais — voilà pourquoi.
3. **`deplacable: true` sort du cadre** sur un groupe de plus de deux mots : le
   fantôme redessine le groupe entier à l'autre bout. La légende suffit.
4. **Une étiquette de groupe ne se plie pas.** « durée impossible aujourd'hui »
   sortait du cadre par la gauche. Trois mots maximum.
5. **Le canvas `conjugaison` imprime « infinitif : » EN DUR.** Sur un verbe
   c'est juste ; sur un mot dérivé c'est faux. Ne pas envoyer le champ.
6. **Les blocs de fiche n'interprètent PAS le markdown.** Un `~~barré~~`
   s'affiche avec ses tildes sous les yeux de l'élève.
7. **Un canvas de maths se règle en LARGEUR**, et le réglage se calcule :
   `largeur = bloc × police_interne / plancher`. Valeurs mesurées : `number_line`
   à 235, `schema_barre` à 205, `figure_libre` à 190.
8. **⛔ La frise (`mode: "frise"`) NE TIENT PAS dans un bloc de fiche.** Sa
   largeur vaut `max(size.width, 3 × largeurRepère + marges)` — `size.width`
   n'est qu'un plancher. Minimum ≈ 254 px pour un bloc de 226. **Le correctif
   appartient à `lib/canvas/ConjugaisonCanvas.tsx`, fichier partagé : le
   signaler à Frédéric, pas le modifier.** Utiliser `phrase` à la place.

---

## ⭐ Les trois découvertes qui rendent dessinable ce qui ne l'était pas

C'est le cœur de ce qui a permis de ficher la lecture, l'écriture, l'oral et la
culture — que **personne n'avait jamais fichés, dans aucune classe**.

### 1. L'arc de question (`type: "question"`)

Violet, fléché, avec son étiquette. Il va **de ce qu'on affirme vers ce qui le
prouve** : « il avait peur » → « ses mains tremblaient ». C'est le geste de la
justification, en un trait.

### 2. La nature en gris (`nature:`)

Trois adjectifs alignés sans verbe d'action, et l'on **voit** qu'un portrait
n'est pas un récit — là où une phrase de cours ne fait que l'affirmer.

### 3. La même phrase dessinée deux fois, avec des groupes différents

« Il regarda l'homme avec le télescope » : selon que le groupe s'accroche au
verbe ou au nom, ce n'est pas la même personne qui tient l'instrument. Le débat
interprétatif cesse d'être une formule vague.

### Et deux canvas de maths détournés

- **`figure_libre`** — une grille = **un espace à occuper**, et ce qui l'occupe
  est ce dont on parle. Employé deux fois : comme **cadre photographique** (le
  même sujet occupe 9 cases sur 9 en gros plan, 1 sur 9 en plan large — le
  cadrage devient une proportion) et comme **page** (la silhouette d'un poème,
  d'une scène de théâtre, d'un texte en prose).
- **`number_line`** pour un ORDRE (l'intensité : crainte → peur → épouvante,
  avec `showValues: false`) et **`schema_barre`** pour une INCLUSION (la
  généralité : un caniche dans un chien, un chien dans un animal). ⛔ Ce sont
  **deux axes différents**, et les élèves les confondent parce qu'on les leur
  enseigne avec le même mot, « plus ».
- **`conjugaison` en mode `wagons`** pour démonter un mot dérivé, avec une
  correspondance FIXE : `temps` = préfixe (orange), `radical` = radical (bleu),
  `personne` = suffixe (vert).

⭐ **Avant d'écrire un canvas neuf, relire `lib/canvas/CATALOGUE.md`.** Il le dit
lui-même : « avant d'en écrire un autre, vérifier que celui-ci ne suffit pas ».
Il a suffi seize fois sur seize.

---

## Les règles de contenu, non négociables

- ⛔ **ON N'INTERROGE JAMAIS UNE ŒUVRE.** Aucun titre, aucun auteur dans ce qui
  est demandé à l'élève : les livres sont choisis par le professeur. Les blocs
  « Dans la vraie vie » et « Histoire » peuvent en citer — ils s'adressent au
  lecteur, pas au questionné.
- **Les phrases viennent des BANQUES DU COACH**, sans exception. L'élève qui a
  lu la fiche doit retrouver ses propres phrases dans les exercices. La banque
  de chaque notion est nommée dans l'en-tête de la fiche de 4e correspondante.
- **Chaque bloc cite ses `micros`** dans la donnée (champ optionnel `micros`),
  jamais en commentaire.
- **Orthographe** : accents et apostrophes partout, apostrophe DROITE (`'`,
  28 880 contre 0 dans le dépôt), rectifications de 1990 (reconnaitre, connaitre,
  chaine, gout, cout, parait) — ⛔ sauf `sûr`, `dû`, `mûr`, qui gardent leur
  circonflexe. Voir la mémoire `orthographe-de-ce-que-l-eleve-lit`.
- **Aucun caractère d'une autre écriture.** Deux contaminations en une journée
  (un idéogramme, un mot cyrillique), invisibles pour tsc et pour le
  vérificateur de dessins. Scan disponible, voir plus bas.

---

## La boucle de vérification, à faire sur CHAQUE fiche

```bash
npx tsc --noEmit
node scripts/verifier-fiches-francais.mjs lib/fiches/francais-5e-<notion>.tsx
```

Puis **regarder la page rendue**, ce qui n'est pas optionnel : trois défauts du
26/08 n'existaient que là — l'« infinitif : » en dur, les tildes du markdown, et
six blocs laissés sans dessin.

```bash
# ton propre serveur, jamais celui d'une autre session
# (preview_start sur la config "eleveai-2")
```

Sur la page, en 375 px, mesurer **la plus petite police de tous les `<text>` des
SVG** — pas la plus grande. Plancher : **11 px**. Les seize fiches de 4e sont
entre 11,1 et 12,0.

Vérifier aussi qu'il ne reste **ni markdown brut** (`~~`, `**`) **ni caractère
d'une autre écriture** sur la page.

---

## ⚠️ Le dépôt est partagé — trois sessions y travaillent

Lis `docs/pied-de-prompt-sessions-paralleles.md`. En résumé :

1. **Committer par chemin** : `git commit -F message.txt -- <fichier> <fichier>`.
2. ⛔ **Jamais** `git commit --amend`, `git reset --hard`, `git checkout -- .`,
   ni `git stash` (il emporte l'arbre entier, pas seulement tes fichiers).
3. `git status` montrera des fichiers qui ne sont pas à toi : ne pas les ajouter,
   ne pas les annuler.
4. Démarre **ton** serveur de dev ; ne tue jamais celui d'un autre.

⛔ **ET LE PIÈGE DE LA PASSE FINALE :** `registre.ts` et `sitemap.ts` sont
partagés, et une autre session y aura probablement des lignes non commitées. Un
`git commit -- <fichier>` prend **l'arbre de travail** et emporte leurs lignes.
La parade : trier les hunks (`git diff -U0`, filtrer, `git apply --cached
--unidiff-zero`), puis committer **depuis l'index**, sans pathspec. Fait le
26/08 : cinq hunks stagés, deux laissés intacts.

---

## La passe finale

1. Une entrée par fiche dans `lib/fiches/registre.ts` (`titre` + `resume`).
2. Une ligne par fiche dans `app/sitemap.ts`.
3. **Les alias** : quand une fiche couvre DEUX notions du coach — parce que le
   découpage a coupé en deux un objectif que le programme traite d'un bloc —,
   ajouter une ligne dans `FICHES_ALIAS`, sinon la seconde notion s'affiche sans
   badge « Fiche » alors que son cours existe. Trois cas en 4e.
4. Mesurer : `npx --yes tsx@4 scripts/couverture-fiches.ts`.

---

## Par où commencer

**La 5e d'abord**, et par ses huit notions de LANGUE manquantes : le vocabulaire
y manque en entier, et c'est le chantier où l'on réutilise le plus directement
ce qui a été inventé en 4e (l'échelle d'intensité, l'emboitement de généralité,
le mot démonté en wagons).

Puis les notions transversales, en s'appuyant sur les trois découvertes
ci-dessus. La 6e ensuite — en relisant son programme à elle, celui du cycle 3.

**Une fiche à la fois, vérifiée et commitée avant la suivante.** C'est ce rythme
qui a permis d'en écrire seize en une journée sans qu'aucune ne soit à reprendre.
