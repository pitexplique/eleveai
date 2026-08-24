# Passation — fermer la 6ᵉ en maths

> Réécrite le 24/08/2026. **Cette note se remplace, elle ne s'empile pas** : elle
> ne vaut que pour la session suivante. Commencer par `git pull`.
>
> ⚠️ Le partage des deux postes est suspendu ce jour-là : « on reste sur cet
> ordinateur aujourd'hui ». L'autre poste fait le CM2.

---

## Le travail : 105 dessins, 18 fiches

Décision de Frédéric : **fermer la 6ᵉ entièrement**, puis faire ses vidéos Manim,
« comme ça on estimera le temps pour une classe parfaite ». C'est une campagne
d'étalonnage — on mesure sur la classe la moins chère à finir, pas sur la plus
demandée.

Le standard est **un visuel par bloc** : chaque propriété et chaque étape de
méthode porte son dessin. Les exemples corrigés, eux, sont déjà dessinés partout.

**Avancement : 5 fiches sur 18 (36 dessins sur 105).**

⚠️ **QUATRE PDF RESTENT À REFAIRE** — l'autre session occupait le serveur de
développement, et un PDF ne se fabrique qu'en rendant la page. À passer dès que
la machine est libre, puis `npm run verifier:pdf` :

```bash
npm run build:fiches-pdf -- http://localhost:3000 /fiches-cours/maths/6e/proba-experience
npm run build:fiches-pdf -- http://localhost:3000 /fiches-cours/maths/6e/stat-donnee
npm run build:fiches-pdf -- http://localhost:3000 /fiches-cours/maths/6e/triangle-figure
npm run build:fiches-pdf -- http://localhost:3000 /fiches-cours/maths/6e/quadrilatere-figure
```

Il reste aussi, sur ces quatre fiches, la mesure **sur la page** aux trois
largeurs. Les dessins sont passés à `apercu-canvas.mjs` (hors du site, sans
serveur) : c'est nécessaire, ce n'est pas suffisant — voir le piège n° 1
ci-dessous.

```
fiche                              propr.  méth.   ex.   manque
Les angles                          4/4    3/3    2/2      0   ✅ 24/08, commit 70d8076f
Premiers pas en probabilités        4/4    3/3    2/2      0   ✅ 24/08, PDF à refaire
Lire et interpréter des données     4/4    3/3    2/2      0   ✅ 24/08, PDF à refaire
Les triangles                       4/4    3/3    2/2      0   ✅ 24/08, PDF à refaire
Les quadrilatères                   4/4    3/3    2/2      0   ✅ 24/08, PDF à refaire
Les fractions                       0/4    0/3    4/4      7
Le calcul mental                    0/4    0/3    3/3      7
La symétrie axiale                  0/4    0/3    2/2      7
Les volumes                         0/3    0/3    2/2      6
Les pourcentages                    0/3    0/3    3/3      6
Les nombres entiers                 0/3    0/3    4/4      6
Les nombres décimaux                0/3    0/3    4/4      6
Les longueurs                       0/3    0/3    2/2      6
Le calcul posé                      0/3    0/3    4/4      6
La proportionnalité                 0/3    0/3    3/3      6
Algorithmique et programmation      0/3    0/3    2/2      6
Les périmètres                      5/5    3/3    4/4      0   ← déjà au standard
Les aires                           7/7    3/3    4/4      0   ← déjà au standard
```

**« Les périmètres » et « Les aires » sont les deux fiches de 6ᵉ déjà complètes.**
Les lire avant de commencer : elles montrent à quoi ressemble l'objectif dans
cette classe précise.

---

## L'étalon d'écriture

`lib/fiches/maths-5e-nombres-relatifs.tsx` — c'est la référence, et le
CATALOGUE la désigne comme telle (« un helper simple réutilisé sur six blocs
d'une même fiche »).

Le patron : une petite fonction locale au-dessus de `CanvasRenderer`, réutilisée
sur tous les blocs, avec les couleurs en constantes.

```tsx
function droite(points: {value: number; label: string; color?: string}[], min = -5, max = 5) {
  return <CanvasRenderer figure={{ kind: "number_line", min, max, ... }} />;
}
// puis, dans chaque propriété :
schema: droite([{ value: -4, label: "−4", color: ROUGE }]),
```

⛔ **Ne pas dessiner à la main en SVG.** On passe par les canvas du coach, pour
que l'élève retrouve dans sa fiche **la même figure que dans ses exercices**.

📖 **`lib/canvas/CATALOGUE.md` est à lire en entier avant de choisir un `kind`.**
Il dit ce que chaque canvas montre **et ce pour quoi il ne faut pas l'employer** —
c'est la colonne « ⛔ Pas pour » qui évite les contresens. Exemples :
`number_line` dessine des points, **pas un déplacement** ; `fraction` montre
l'objet, **pas l'opération** ; `angle` montre **un** angle, pas deux à comparer.

---

## Trois pièges découverts EN RENDANT, le 24/08 — ils valent pour toutes les fiches

Aucun ne se lit dans le code, tous se mesurent sur la page (§ 2 quater) :

1. **`apercu-canvas.mjs` ne suffit pas.** Il a dit « ✅ rien à signaler » sur les
   deux dessins du rapporteur — la page, elle, les donnait à 8,7 px. Le script
   juge un dessin isolé dans un cadre supposé ; la page ajoute la vraie largeur
   du bloc et les vraies polices. **Passer les deux**, dans cet ordre.
2. **La largeur d'une carte ne dépend pas que du téléphone.** Le pire cas était
   une fenêtre de **820 px** : trois colonnes déjà en place, 155 px par carte,
   tous les dessins sous 8 px. Corrigé dans `FicheCoursClient` (palier à deux
   colonnes) — donc pour toutes les fiches, sans rien changer dans les fiches.
   ⚠️ Mesurer désormais à **375, 820 ET 1280**.
3. **Le cadre se serre sur le dessin, donc la largeur du viewBox VARIE.** Deux
   angles côte à côte : l'aigu (viewBox 106) reste lisible, l'obtus (159) tombe
   à 9 px dans la même cellule. D'où `pile()` plutôt que deux colonnes.

Le mesureur à coller dans la console (il rend les deux : polices sous 11 px et
chevauchements de textes) est dans le commit `70d8076f`, mais il se réécrit en
dix lignes : pour chaque `svg`, `police × largeurAffichée ÷ largeurViewBox`,
puis toutes les paires de `<text>` dont les rectangles se coupent.

---

## Ce que j'ai déjà trouvé pour « Les angles » (fiche FAITE — gardé pour la 4ᵉ)

L'analyse du rapporteur, qui resservira dès qu'une fiche d'angles reviendra :

- `showProtractor: true` pose le **rapporteur** sur l'angle ;
- `protractorStep: "vertex" | "zero" | "reading"` déroule le geste en trois
  temps **sans changer de dessin** — le centre sur le sommet, le zéro sur un
  côté, la graduation atteinte. Ça tombe exactement sur les trois étapes de
  méthode de la fiche ;
- ⚠️ le canvas `angle` ne sait montrer **qu'un seul angle**. La propriété « Aigu
  ou obtus » en demande deux : composer deux `CanvasRenderer` côte à côte dans
  un `<div>` plutôt que de forcer le canvas ;
- la fiche a déjà `schemaAngleDroit` et `schemaAngleObtus` en tête de fichier :
  les réutiliser, ne pas les redéfinir.

Le type complet est dans `lib/tutor-v4/types_canvas.ts` (`AngleCanvasData`).

---

## Après chaque fiche modifiée

1. **Rendre la page** et la regarder — y compris à 375 px. Les petites erreurs ne
   se lisent pas dans le code.
2. **Refaire son PDF** (le contenu a changé) :
   ```bash
   npm run build:fiches-pdf -- http://localhost:3000 /fiches-cours/maths/6e/angle-mesure
   ```
3. **Vérifier** :
   ```bash
   npm run verifier:pdf
   ```
   Quatre contrôles : PDF manquant, PDF en retard, fiche non commitée, PDF
   orphelin. Il compare des **dates de commit**, pas des `mtime` — git ne
   conserve pas les seconds.

⚠️ Si le **H1** d'une fiche change, le nom de son PDF change aussi et l'ancien
devient orphelin. Le contrôle le dit, il ne le supprime pas.

---

## Pour remesurer la couverture

Compter les blocs `proprietes` / `methode` / `exemples` de `lib/fiches/*.tsx` et
ceux qui portent un champ `schema:`.

⚠️ **Ne pas filtrer l'IA sur `fiches-ia*`** : les fichiers s'appellent `ia-*`.
L'erreur du 24/08 avait rendu la première mesure entièrement inutile — les « 15
fiches les plus pauvres » étaient les 16 fiches d'IA, hors sujet.

---

## Ce qui vient après, et pourquoi

**La 4ᵉ.** Les analytics Vercel du 24/08 :

```
/cahier-vacances/vers-la-4e   507   ← la page la plus vue du site
/cahier-vacances/vers-la-5e   474
/accueil                      355
/cahier-vacances/vers-la-6e   177
```

Le cahier « vers la 4ᵉ » fait presque trois fois celui de la 6ᵉ, et les fiches de
4ᵉ sont à **zéro** — éteintes le 21/08 pour être refaites au propre. La 5ᵉ, elle,
est déjà à 100 %.

⚠️ Réserve d'interprétation : ces 507 visiteurs sont sur un **cahier de
vacances**, pas sur une fiche. En déduire l'audience des fiches de 4ᵉ est un pari
raisonnable, pas une mesure.

⛔ **Ne pas payer les 213 dessins manquants du CM2 en maths** : Frédéric réécrit
toutes les fiches de CM2. Ce travail partirait à la poubelle.

✅ **Le français est à 100 %**, CM2 comme 6ᵉ. Ne pas y toucher.

---

## Deux dossiers en sommeil

- **Les 16 fiches d'IA** n'ont pas de PDF : leur bouton appelle encore
  `window.print()` (`FicheCoursIa.tsx`, un autre composant). Frédéric : « les
  fiches IA pas grave ». Priorité basse, assumée.
- **`fiches-maths-premiere`** promet une collection et n'a qu'une fiche
  (`derivation`). Soit on écrit la Première, soit on retire la carte.
