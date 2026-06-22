# Playbook — Coach IA + Parcours : **Maths Première spécialité**

> But : ajouter le niveau **Première spé** en maths, de bout en bout :
> 1. construire les banques de questions (tutor-v4) à partir du **BO de Première** (à télécharger),
> 2. brancher le **Coach IA** (`/coach-ia/maths`),
> 3. brancher le **Parcours** (`/parcours`).
>
> Modèle de référence vivant dans le repo : **`terminale-spe`** (lycée, LaTeX) et **`seconde`** (1 banque par notion, règle D). Copie-les, ne réinvente pas.
>
> ⚠️ Règle d'or du prof : **rien hors programme**. Tout (bo / notions / microSkills) se dérive du **BO officiel 2019 de Première spé**, pas de la mémoire. On télécharge le PDF d'abord.

---

## 0. Identifiant de classe choisi

On utilise la chaîne **`premiere-spe`** partout (cohérent avec `terminale-spe`).
Libellés affichés : **« Première »** (titre) / **« 1re spé »** (nav).

---

## 1. Architecture (rappel) — comment une classe est câblée

Le moteur **tutor-v4** a besoin, pour un couple `(classe, matiere)`, de 3 choses, chacune servie par un *loader* :

| Brique | Loader | Fichier |
|---|---|---|
| **Knowledge** (bo + notions + microSkills) | `loadKnowledgeV4` | `lib/tutor-v4/loaders/loadKnowledgeV4.ts` |
| **Matrix** (graphe de prérequis) | `loadMatrixV4` | `lib/tutor-v4/loaders/loadMatrixV4.ts` |
| **Question bank** (les questions) | `loadQuestionBankV4` | `lib/tutor-v4/loaders/loadQuestionBankV4.ts` |

Le **Coach IA** (`app/coach-ia/[matiere]/page.tsx`) lit le knowledge via **`lib/tutor-v4/catalog.ts`** (`getNotionOptions`, `getNotionMicroMap`, `getDomaineMap`, labels…) pour afficher l'arbre notions → micros, puis lance le **tutor** à l'URL :
```
/tutor-v4?classe=premiere-spe&matiere=maths&notion=<notionId>&microId=<microId>&display=simple
```

Le **Parcours** (`app/parcours/ParcoursClient.tsx`) est **indépendant du moteur** : il lit les notions via `lib/parcours/getClasseNotions.ts` et tire des questions via `lib/parcours/getDefiQuestionForNotion.ts` (qui pioche **dans la même question bank** tutor-v4).

> 💡 Le moteur **`buildQuestionPair` exige ≥ 2 items par couple `notionId+microId`**, sinon il throw « Pas assez de questions ». Donc chaque micro doit avoir au moins 2 items (vise ~10).
>
> 💡 Le moteur **mélange déjà les choix QCM** (`shuffleChoices` dans `lib/tutor-v4/questionPairBuilder.ts`) → on liste la bonne réponse en 1ʳᵉ position, elle sera mélangée. Pas de triche possible.
>
> 💡 `buildKnowledge` **valide au runtime** (pas tsc) : ids uniques, `notion.boId` doit exister dans `bo`, tous les `prerequis` (notion + micro) doivent référencer des ids existants. Une mauvaise réf → throw au chargement de la page.

---

## 2. CHECKLIST de câblage `premiere-spe` maths (à faire dans cet ordre)

### Étape A — Déclarer la classe dans les 3 unions de types (sinon `tsc` casse)
1. `lib/tutor-v4/types.ts` → type `SchoolLevel` : ajouter `| "premiere-spe"` (après `"seconde"`).
2. `lib/tutor-v4/catalog.ts` → type `Classe` (≈ ligne 41) : ajouter `| "premiere-spe"`.
3. `lib/parcours/types.ts` → type `ParcoursClasse` : ajouter `| "premiere-spe"`.

### Étape B — Knowledge (dossier + builder + loader)
Créer `lib/tutor-v4/knowledge/maths/premiere-spe/` avec 4 fichiers (copier ceux de `terminale-spe`) :
4. `bo.ts` — les **grands domaines** du BO (KnowledgeBoCompetence[]).
5. `notions.ts` — les **notions** (chapitres), chaque `boId` ∈ `bo`.
6. `microSkills.ts` — les **micro-compétences**, chaque `notionId` ∈ notions, `prerequis` valides.
7. `buildKnowledgePremiereSpe.ts` :
```ts
import { buildKnowledge } from "@/lib/tutor-v4/knowledge/buildKnowledge";
import { bo } from "./bo";
import { notions } from "./notions";
import { microSkills } from "./microSkills";

export function buildKnowledgePremiereSpeMaths() {
  return buildKnowledge({
    id: "premiere-spe-maths",
    classe: "premiere-spe",
    matiere: "maths",
    bo, notions, microSkills,
  });
}
```
8. `lib/tutor-v4/knowledge/loaders/loadKnowledgePremiereSpeMaths.ts` :
```ts
import { buildKnowledgePremiereSpeMaths } from "../maths/premiere-spe/buildKnowledgePremiereSpe";
export function loadKnowledgePremiereSpeMaths() {
  return buildKnowledgePremiereSpeMaths();
}
```

### Étape C — Matrix (le plus simple : auto depuis les prérequis)
9. `lib/tutor-v4/matrix/matrixPremiereSpeMaths.ts` :
```ts
import type { SkillMatrix } from "@/lib/tutor-v4/types";
import { microSkills } from "@/lib/tutor-v4/knowledge/maths/premiere-spe/microSkills";
import { buildMatrixFromMicroSkills } from "./buildMatrixFromMicroSkills";

export const matrixPremiereSpeMaths: SkillMatrix = {
  id: "premiere_spe_maths_matrix_v4",
  classe: "premiere-spe",
  matiere: "maths",
  microSkillIndex: microSkills.map((m) => m.id),
  matrix: buildMatrixFromMicroSkills(microSkills),
};
```
> (C'est la méthode utilisée par les matrices IA : 100 % auto, **aucune maintenance** quand les micros changent. La version « hand-built » de `matrixTerminaleSpeMaths.ts` avec `supportLinks` est optionnelle/avancée — on n'en a pas besoin.)

### Étape D — Question banks
10. Créer `lib/tutor-v4/questionBank/premiere-spe/maths/<notion>.bank.ts` (**une banque par notion**, comme seconde).
11. Créer `lib/tutor-v4/questionBank/premiere-spe/maths/index.ts` qui importe/spread toutes les banques :
```ts
import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { suitesBank } from "./suites.bank";
// ... import des autres banques ...

export const mathsPremiereSpeQuestionBank: TutorBankItemV4[] = [
  ...suitesBank,
  // ...
];

export function getMathsPremiereSpeQuestionBank(args?: {
  notionId?: string | null; microId?: string | null;
}): TutorBankItemV4[] {
  let bank = mathsPremiereSpeQuestionBank;
  if (args?.notionId) bank = bank.filter((i) => i.notionId === args.notionId);
  if (args?.microId) bank = bank.filter((i) => i.microId === args.microId);
  return bank;
}
```

### Étape E — Brancher les 3 loaders tutor-v4
12. `loaders/loadKnowledgeV4.ts` : importer `loadKnowledgePremiereSpeMaths` + ajouter
    `if (classe === "premiere-spe" && matiere === "maths") return loadKnowledgePremiereSpeMaths() as KnowledgePack;`
13. `loaders/loadMatrixV4.ts` : importer `matrixPremiereSpeMaths` + ajouter le `if (... ) return matrixPremiereSpeMaths;`
14. `loaders/loadQuestionBankV4.ts` : importer `mathsPremiereSpeQuestionBank` + ajouter le `if (...) return mathsPremiereSpeQuestionBank;`

### Étape F — catalog.ts (Coach IA lit ça)
15. `lib/tutor-v4/catalog.ts` : importer `buildKnowledgePremiereSpeMaths` (en haut) + dans le `switch` maths de `getKnowledge` ajouter :
    `case "premiere-spe": return buildKnowledgePremiereSpeMaths();`

### Étape G — Page Coach IA
16. `app/coach-ia/[matiere]/page.tsx` :
    - `const CLASSES` (≈ ligne 17) : ajouter `"premiere-spe"` (entre `"seconde"` et `"terminale-spe"`).
    - `classeLabel` (Record **complet** `Record<Classe,string>`) : ajouter `"premiere-spe": "Première",` **(obligatoire sinon tsc casse)**.
    - `getClasseNavLabel` (Partial) : ajouter `"premiere-spe": "1re spé",` (cosmétique).
    - `getClasseButtonSize` : ajouter `"premiere-spe"` à la liste des classes « larges » (cosmétique).

➡️ **À ce stade, le Coach IA maths Première marche.** Vérifier (voir §4) puis passer au Parcours.

### Étape H — Parcours
17. `lib/parcours/getClasseNotions.ts` : importer `buildKnowledgePremiereSpeMaths` + ajouter
    `if (classe === "premiere-spe") return buildKnowledgePremiereSpeMaths().notions;`
18. `lib/parcours/getDefiQuestionForNotion.ts` : importer `mathsPremiereSpeQuestionBank` + dans `getQuestionBank` ajouter
    `if (classe === "premiere-spe") return mathsPremiereSpeQuestionBank;`
19. `app/parcours/ParcoursClient.tsx` : ajouter Première au sélecteur de classe (chercher le `Record` de libellés contenant `"terminale-spe": "Terminale spé"` ≈ ligne 61 et la liste des boutons de classe ; ajouter `"premiere-spe": "Première"`).

### Étape I — (optionnel) SEO
20. `app/sitemap.ts` → `MATHS_CLASSES` : ajouter `"premiere-spe"`.

---

## 3. Règles de rédaction des questions (règle D — validée par le prof)

Reprendre **à l'identique** le style des banques `seconde` (ex. [statistiques-descriptives.bank.ts](../lib/tutor-v4/questionBank/seconde/maths/statistiques-descriptives.bank.ts), [identites-remarquables.bank.ts](../lib/tutor-v4/questionBank/seconde/maths/identites-remarquables.bank.ts)).

- **`fixed`** : UNIQUEMENT valeurs remarquables, définitions, cas de départ.
- **`template`** (`kind:"template"`, `generate()` avec `randomInt`) : le gros du volume, **valeurs aléatoires** → variété (éviter que les élèves retombent sur la même question). **Viser ~10 questions/micro.**
- **QCM** : pour le calcul ET le **raisonnement** (« pourquoi on factorise », « à quoi sert la dérivée »). Mettre de **vrais distracteurs plausibles**.
- **`short`** : UNIQUEMENT réponse **numérique** courte (une calculatrice `BoiteAOutils` est dispo en bas de page). Le comparateur `number_equal` accepte la virgule (`2,5` = `2.5`).
- **PAS de format `open`** pour l'instant (clavier mobile pénible). C'est géré côté client, activable plus tard sans dette.
- **LaTeX obligatoire** (lycée) : écrire les maths en `$...$` (rendu KaTeX via `MarkdownMath`, déjà branché côté tutor ET côté parcours). Ex. `$f'(x) = 2x$`, `$\\dfrac{1}{2}$`, `$\\sqrt{3}$`, `$e^{x}$`, `$\\ln(x)$`.
- **Contextes qui parlent aux élèves** (consigne prof) : **sport, écologie, La Réunion**, et exemples concrets. ⚠️ `QuestionTheme` valides = `neutral | reunion | sport | cuisine | jeux_video` (PAS `"ecologie"` → contexte écolo dans le **texte**, `theme:"neutral"`).
- Helper d'explication structuré `exp(definition, methode, calcul, conclusion)` (copier depuis une banque seconde).

### Canvas disponibles (rendus par `TutorV4Client` ET `CanvasRenderer` du parcours)
`fonctionGraphique` (le plus fiable : courbes `affine`/`quadratique`/`points` + points + mises en évidence), `fonction_tableau`, `reperage`, `droites`, `triangle`, `angle`, `thales`, `stat_graph` (camembert : valeur **dans** le label), `probabilites` (billes en **hex**), `arbre_proba`, `repere3d`, `solide_3d`, `section_solide`, `number_line`, `tableau_donnees` (lecture seule).
⚠️ **`cercle` n'est PAS rendu** (éviter). ⚠️ **`tableau_proportionnalite` a ses propres champs non reliés à la réponse tutor → éviter.**
Pour Première : `fonctionGraphique` (paraboles du 2nd degré, exp, dérivée/tangente), `arbre_proba` (probas conditionnelles), `stat_graph` (variables aléatoires), `reperage`/`droites` (géométrie repérée, produit scalaire).

---

## 4. Vérification (à chaque étape)

```bash
npx tsc --noEmit        # doit être clean après CHAQUE lot
```
Puis preview (serveur « eleveai », port 3000) :
- Coach : `http://localhost:3000/coach-ia/maths?classe=premiere-spe` → doit afficher le bon nombre de notions / micros.
- Tutor : `http://localhost:3000/tutor-v4?classe=premiere-spe&matiere=maths&notion=<id>&microId=<id>&display=simple` → la question se génère (vérifier le rendu LaTeX = KaTeX, pas de `$...$` brut), aucune erreur serveur/console.
- Parcours : `http://localhost:3000/parcours` → choisir « Première », « Défi », « Démarrer ».

**Pièges connus :**
- **Rebond transitoire vers `/accueil`** juste après navigation directe vers `/tutor-v4` (hydratation) → renaviguer une 2ᵉ fois, ça tient.
- **`.next` corrompu** (ENOENT routes-manifest / 500 partout, ou erreur HMR « X is not defined » sur du code supprimé) → `rm -rf .next` puis relancer la preview.
- Vérifier le LaTeX : en preview, `document.querySelectorAll('.katex').length > 0` et **aucun** `$...$` dans `main.innerText`.

---

## 5. Programme Première spé (structure 2019) — **À CONFIRMER SUR LE BO TÉLÉCHARGÉ**

> ⚠️ Ne pas figer tant que le PDF n'est pas lu. Indication de départ (BO 2019), à valider/ajuster chapitre par chapitre, **rien hors programme** :

- **Algèbre** : Suites numériques (récurrence simple, sens de variation, comportement) · Équations & fonctions polynômes du **second degré** (forme canonique, discriminant, racines, signe, somme/produit).
- **Analyse** : Dérivation (nombre dérivé, tangente, dérivées usuelles, opérations, dérivée d'une composée simple) · Variations & courbes · **Fonction exponentielle** · **Fonctions trigonométriques** (cos, sin, cercle trigo, radian).
- **Géométrie** : Calcul vectoriel & **produit scalaire** (dans le plan) · **Géométrie repérée** (équations de droites, vecteur normal, équation de cercle).
- **Probabilités & statistiques** : **Probabilités conditionnelles** & indépendance (arbres, formule des probabilités totales) · **Variables aléatoires réelles** (loi, espérance, variance, écart-type ; échantillon, somme de variables).
- **Algorithmique & programmation** (transversal, Python) : variables/boucles/fonctions, listes, simulation, seuils sur les suites. (Dimension **éco-énergie** : minimiser le nombre d'opérations — consigne prof.)

Découpage suggéré : **1 notion = 1 chapitre = 1 fichier `.bank.ts`**. Possibilité d'éclater un gros chapitre en plusieurs notions (comme le calcul littéral seconde) si ça aide la robustesse/lisibilité.

---

## 6. Ordre d'exécution recommandé (nouvelle session)

1. Télécharger + lire le **BO Première spé** ; figer **bo / notions / microSkills** conformes (Étapes A–B).
2. Matrix auto (Étape C).
3. Écrire les banques **notion par notion** (Étape D), `tsc` + preview tutor après chaque notion.
4. Brancher les 3 loaders + catalog + page Coach (Étapes E–G) → vérifier le Coach IA complet.
5. Brancher le Parcours (Étape H) → vérifier.
6. (option) sitemap (Étape I).
7. Mettre à jour la mémoire (`tutor-maths-premiere-spe-banques.md` + entrée `MEMORY.md`).

> Mémoire liée : `[[tutor-maths-seconde-banques]]`, `[[tutor-maths-terminale-banques]]`, `[[tutor-ia-coach-banques]]` (même méthode / règle D).
