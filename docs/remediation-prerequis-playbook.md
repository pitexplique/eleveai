# Playbook — **Remédiation par prérequis fragiles** (tutor-v4)

> **Origine.** Demande du principal du collège (mail du 25 juin 2026) : quand un élève échoue,
> ne pas resservir le même exercice, mais **diagnostiquer le prérequis fragile** qui cause l'erreur
> (ex. une division ratée à cause des tables de multiplication, pas de la technique opératoire) et
> **rediriger automatiquement** l'entraînement vers ce prérequis. C'est, selon lui,
> « le critère d'efficacité d'une IA centrée sur les apprentissages ».
>
> **But du chantier.** Transformer ce comportement en moteur, dans **tutor-v4**, en réutilisant
> les briques qui existent déjà (graphe de prérequis, maîtrise, typologie d'erreurs).

---

## 0. PÉRIMÈTRE — à lire avant tout

- ✅ **Matières concernées : `maths` et `francais` UNIQUEMENT.**
- ⛔ **PAS** pour : `english-maths`, `espagnol`, `ia`, `economie`, et l'anglais/autres.
  Ces coachs existent et tournent dans le **même moteur tutor-v4** — la remédiation doit donc être
  **gatée**, jamais déclenchée pour eux. Modèle de gating de référence dans le repo :
  la **Boîte à outils** (calculatrice) gatée `matiere === "maths"` ; on fait pareil mais avec
  `matiere === "maths" || matiere === "francais"`.
- Niveaux : **maths CP→terminale (12)** et **français CP→3e (9)**.

> ⚠️ Règle d'or : un seul point de décision « est-ce que la remédiation s'applique ? », testé
> au plus haut niveau (dans le moteur, pas dans l'UI), pour ne jamais polluer les autres matières.

---

## 1. État des lieux — ce qui existe DÉJÀ (et qu'on sous-exploite)

tutor-v4 contient déjà 80 % des fondations. Rien à réinventer, il faut **câbler**.

| Brique | Où | État |
|---|---|---|
| **Graphe de prérequis** | `KnowledgeMicroSkill.prerequis[]` + `KnowledgeNotion.prerequis[]` (`lib/tutor-v4/types.ts`) | ✅ existe, validé au build, **déjà peuplé** |
| **Matrice pondérée** | `SkillMatrix` (-3..+3) + `lib/tutor-v4/matrix/matrixUtils.ts` | ✅ `getStrongestParentFromMatrix` renvoie le prérequis le plus déterminant |
| **Routage vers un prérequis** | `selectStrongPrereqMicro`, `selectWeakestMicroInNotion` (`lib/tutor-v4/selection/selector.ts`) | ✅ primitives présentes… **mais jamais appelées** par la décision pédagogique |
| **Typologie d'erreurs** | `ErrorKind = none\|careless\|conceptual\|format\|incomplete` + `AnswerEvaluation.errorKind` + `estimatedUnderstanding` (`types.ts`) | ✅ type présent |
| **Maîtrise par micro** | `masteryByMicro` 0–100 (`lib/tutor/mastery/mastery.ts`, ±8/−10) | ✅ suivi |
| **Historique fin** | `TurnAttempt[]` (micro, difficulté, erreur, durée, indice) | ✅ tout est tracé |

**Le point clé du problème actuel :** après 2 échecs, `lib/tutor-v4/pedagogyEngine.ts:56`
se contente de **baisser la difficulté d'un cran sur la même micro-compétence**.
C'est exactement le « multiplier les exercices de division sans traiter la cause » que pointe le principal.
La machinerie pour faire mieux est là — il faut la brancher.

---

## 2. Résultats d'audit du graphe (réalisés le 25/06/2026)

Outil : **`scripts/audit-prereq-graph.mjs`** (réutilisable :
`node scripts/audit-prereq-graph.mjs maths` ou `... francais`).
Détecte cycles, orphelins, liens inter-notions, et maillons à fort levier.

### Verdict global : **0 cycle, 0 orphelin** sur les deux matières.

C'est le feu vert : un cycle ferait boucler la remédiation à l'infini, un orphelin la ferait planter.
**Aucun des deux nulle part.** Le moteur peut tourner sans garde-fou supplémentaire.

### Maths (CP→terminale) — 1303 micros

| Bloc | Micros | Cycles | Orphelins | Notes |
|---|---|---|---|---|
| CP→CM2 | 558 | 0 | 0 | graphe riche (40+ liens inter-notions/niveau) |
| 6e→3e | 478 | 0 | 0 | |
| Seconde→Terminale | 267 | 0 | 0 | |

- **336 liens inter-notions** au total = les arêtes « précieuses » du diagnostic croisé.
- **2 limites (non bloquantes) :**
  1. **Première-spé = 0 lien inter-notions** (prérequis tous internes). Diagnostic croisé impossible
     là tant qu'on n'enrichit pas. (Terminale = 27, OK.)
  2. **Primaire sur-enraciné** : en CM1, `entier_lire` « débloque ↓155 » sur 156 micros → graphe
     **en chaîne profonde**. Conséquence : la remédiation doit **reculer d'UN cran à la fois**
     (s'arrêter au 1ᵉʳ prérequis dont la maîtrise < seuil) et **NE PAS** sauter au maillon de plus
     fort levier — sinon tout le monde atterrit sur « lire les entiers ».

### Français — ~382 micros

| Bloc | Micros | Cycles | Orphelins | Pivot |
|---|---|---|---|---|
| CP→CM2 (écrit en dur) | 249 | 0 | 0 | phonologie (CP) → fluence (CE1→CM2) |
| 6e→3e (généré par template) | ~133 (31–34/niv.) | 0 | 0 | **compréhension** (`comp_sens_global`) |

> Le collège français est **généré** par `lib/tutor-v4/knowledge/francais/shared/buildCollegeFrancaisSources.ts`
> (strictement hiérarchique → sain par construction). Le parser statique ne le voit pas ;
> il a été reconstruit à la main pour l'audit.

- **Bonus français :** ce builder expose **`buildCollegeFrancaisSupportLinks`** — des liens
  transversaux DÉDIÉS que les maths n'ont pas, pile le matériau du diagnostic croisé :
  - `comp_implicite` ← `voc_contexte`
  - `ecrit_reviser` ← `gram_accords`, `voc_orthographe`
  - `oral_argumenter` ← `comp_apprecier`
  - `conj_employer` ← `comp_sens_global`
- Pivot pédagogiquement parfait : la **compréhension de lecture** soutient grammaire, vocabulaire,
  culture, conjugaison.

### Maths vs Français — implication stratégique

| | Maths | Français |
|---|---|---|
| Filet graphe (Niveau 1) | ✅ partout | ✅ partout |
| Liens transversaux dédiés | ❌ (à dériver) | ✅ collège |
| Distracteurs étiquetés (Niveau 2) | ✅ fort potentiel | ⚠️ limité (beaucoup de micros `open` : rédaction/oral/interprétation, peu de QCM étiquetables ; + contrainte zéro-clavier CM1/CM2) |

➡️ **Maths = terrain idéal pour le diagnostic fin par distracteur.
Français = excellent terrain pour la remédiation par graphe (compréhension comme socle).**

---

## 3. Architecture cible

Nouvelle unité **`lib/tutor-v4/remediation/diagnoseEngine.ts`**, appelée après chaque réponse
fausse, **avant** `decidePedagogy`, et **seulement si** `matiere ∈ {maths, francais}`.

### Les 3 briques manquantes

1. **Le routage diagnostic n'est pas branché.** `decidePedagogy` ne connaît que
   `stay / promote / downgrade`. Ajouter un 4ᵉ verdict **`remediate_prerequisite`** →
   aller chercher le prérequis le plus faible via le graphe et **changer `microFocus`** (pas
   seulement la difficulté).
2. **Les distracteurs ne portent pas de « cause probable ».** Un QCM est `choices: string[]` +
   `expected[]`. Pour distinguer « tables » vs « technique opératoire », chaque mauvaise réponse
   doit pointer la cause/prérequis qu'elle révèle (voir § 4). *Maths surtout.*
3. **Les prérequis ne franchissent pas les niveaux.** `prerequis[]` ne référence que des ids du
   **même pack** (validé au build, `lib/tutor-v4/knowledge/buildKnowledge.ts`). L'exemple du
   principal (division CM2 ← tables/soustraction CM1) est inter-niveaux. → § 4, option B.

### Flux à chaque échec (matières gatées uniquement)

```
réponse fausse
   └─► diagnoseEngine
         ├─ distracteur étiqueté ? ──► cause directe (confidence "high")
         └─ sinon ──► graphe prérequis + mastery ──► maillon faible (confidence "graph")
                                   │
                   mastery(prereq) < SEUIL (≈40) ?
                      oui ──► remediate_prerequisite
                              · bascule microFocus vers le prérequis fragile
                              · difficulté basse, mode coaching
                              · mémorise remediationReturnTo (la micro cible initiale)
                              · feedback explicite à l'élève
                      non ──► decidePedagogy classique (baisse difficulté)
```

- **Reculer d'1 cran à la fois** (cf. limite « primaire sur-enraciné »). Profondeur de remontée
  max paramétrable, défaut **1**.
- **Boucle de retour** : une fois `mastery(prereq) ≥ SEUIL`, retour auto à `remediationReturnTo`.
- **Feedback élève** type : *« Ce n'est pas la division qui coince, c'est les tables de 7.
  On les revoit 2 minutes, puis on revient à la division. »*

---

## 4. Modèle de données à enrichir (rétro-compatible, tout optionnel)

**Distracteurs porteurs de sens** (banque) :
```ts
// dans TutorBankItemFixedV4 (lib/tutor-v4/types.ts)
choiceDiagnostics?: Array<{
  choice: string;            // le texte du distracteur
  cause: string;             // libellé lisible : "erreur sur une table de multiplication"
  prereqMicroId?: string;    // micro-compétence à remédier
  errorKind?: ErrorKind;     // careless / conceptual / format…
}>;
```

**Cause remontée par l'évaluation :**
```ts
// dans AnswerEvaluation (lib/tutor-v4/types.ts)
suspectedPrereq?: { microId: string; cause: string; confidence: "high" | "graph" };
```
`"high"` = distracteur explicitement étiqueté (déclenche la remédiation forte) ;
`"graph"` = déduit du graphe (plus prudent).

**Prérequis inter-niveaux — 2 options :**
- **A. Graphe global cross-pack** : autoriser `prerequis` à référencer `"cm1:table_multiplication"`,
  charger les packs adjacents. Propre, mais touche le build + tous les loaders.
- **B. Ancrage léger** *(recommandé pour démarrer)* : champ `remediationLink?: { classe, microId }`
  réservé aux quelques prérequis qui franchissent un niveau. Pas de refonte du build.

---

## 5. Restitution

- **Élève** : message de remédiation explicite (ci-dessus) + carte des prérequis (où ça coince
  dans la chaîne).
- **Prof** (`dashboard-prof`) — **le vrai livrable institutionnel** (parle au principal + DRANE) :
  *« Emma — difficulté en division ; cause identifiée : tables de 6/7/8 (maîtrise 30 %).
  Remédiation ciblée lancée. »* Se dérive de `TurnAttempt[]` + `suspectedPrereq`.

---

## 6. Phasage

| Phase | Contenu | Effort | Couverture |
|---|---|---|---|
| **1 — MVP graphe** ✅ **LIVRÉE (25/06/2026)** | Brancher `remediate_prerequisite` (graphe + mastery existants). **Gating `maths\|francais`.** Aucun enrichissement de banque. | Faible (câblage) | **maths CP→term + français CP→3e, d'un coup** |
| **2 — Distracteurs diagnostiques** ✅ **LIVRÉE (25/06/2026)** | Étiqueter les distracteurs sur **division CM2** (= l'exemple du principal, démo de rentrée). Le moteur remonte `suspectedPrereq` (confiance `high`) → remédiation dès la 1ʳᵉ erreur. | Moyen (contenu) | division CM2 (pilote), puis colonne vertébrale |
| **3a — Restitution élève** ✅ **LIVRÉE (25/06/2026)** | Carte « 📌 À réviser » sur `dashboard-eleve` : les prérequis signalés par la remédiation + bouton « Réviser » qui relance le Coach pile sur la compétence. Sans nouvelle table (via `resultats_tutor.details`). | Moyen | maths/français |
| **3b — Restitution prof** ✅ **LIVRÉE (25/06/2026)** | Bloc « 📌 À renforcer » dans le détail élève de `dashboard-prof` (prérequis + cause), agrégé depuis `details.aReviser`. | Moyen | maths/français |
| **4 — Inter-niveaux** | Option B (ou A), généralisation. | Élevé | — |

---

## 7. Colonne vertébrale à étiqueter en priorité (Niveau 2)

Le levier brut sur-crédite les racines (trop génériques). Cibler les **pivots actionnables**
(fort levier *et* à mi-graphe) :

| Priorité | Matière / Niveau | Pivots |
|---|---|---|
| 1 | Maths CM1 | `table_2/3/5/10` (↓60–72) |
| 2 | Maths CM2 | `fraction_lire`, `fraction_decimale` (↓37–47) |
| 3 | Maths 4e/5e | `relatif_addition/multiplication`, `litteral_expression_comprendre/reduire` (↓20–25) |
| 4 | Maths seconde | `devfac_developper_simple` (↓37) |
| 5 | Maths terminale | `derivation_formules` (↓36) |
| 6 | Français collège | `comp_sens_global`, `comp_indices` (pivots compréhension) + les 4 liens transversaux dédiés |

~15 micro-compétences couvrent l'essentiel de la valeur diagnostique.

---

## 8. Décisions à trancher avant la Phase 2

1. **Inter-niveaux : option A ou B ?** → recommandation **B** (livrer vite).
2. **Notion pilote** → **division CM2** (= l'exemple exact du principal).
3. **Seuil de fragilité** (`mastery < 40` ?) et **profondeur de remontée** (défaut **1** cran).

---

## 8 bis. Phase 1 — ce qui a été livré (25/06/2026)

**Fichiers :**
- `lib/tutor-v4/remediation/diagnoseEngine.ts` — nouveau. `isRemediationEnabled(matiere)`
  (gate `maths|francais`), `rankPrerequisitesByFragility(...)` (prérequis directs triés par
  maîtrise croissante, profondeur 1, cross-notion autorisé), constantes
  `REMEDIATION_MASTERY_THRESHOLD = 40` et `REMEDIATION_MAX_STEPS = 3`.
- `lib/tutor-v4/types.ts` — `TutorSessionV4.remediationReturnTo?` (cible à laquelle revenir +
  compteur `steps`).
- `lib/tutor-v4/tutorEngineV4.ts` — dans `answerTutorV4`, bloc de décision réécrit en 3 priorités :
  (1) retour de remédiation, (2) entrée en remédiation, (3) comportement standard inchangé.
  Persiste désormais `session.notionFocus` (le reroutage peut changer de notion). La note de
  remédiation est concaténée au `feedback` renvoyé à l'élève.

**Déclencheur réel (important).** La maîtrise est **par session, initialisée à 50** → aucun
prérequis n'est « sous le seuil 40 » au démarrage. Donc en Phase 1 l'entrée en remédiation est
gatée par **« l'élève bloque » = `consecutiveErrorsSameStar >= 2`** (et non par le seuil). Le
seuil reste pertinent pour les phases avec maîtrise persistante. Sortie de remédiation : prérequis
réussi (`result.ok`) **ou** `steps >= REMEDIATION_MAX_STEPS` (anti-boucle).

**Bugfix embarqué (signalé au prof).** `currentMicroMastery >= 0.7` (×2 dans `tutorEngineV4.ts`)
était faux sur l'échelle 0–100 (toujours vrai → le moteur changeait de micro à *chaque* tour).
Corrigé en `>= 70`. Améliore le reroutage **et** la progression standard de toutes les matières.

**Vérification (API tutor-v4, serveur de dev).** Scénario du principal reproduit :
- Maths CM2, cible `division_sens` → 2 erreurs → reroute vers `multiplication_table`
  (notion `multiplication`, cross-notion) avec message explicite → drill → retour auto à
  `division_sens` après `REMEDIATION_MAX_STEPS`.
- Français 6e, cible `6e_voc_contexte` → reroute vers `6e_comp_indices` (cross-notion
  `vocabulaire → lecture_comprehension`). Gating OK (rien pour les autres matières).
- `tsc --noEmit` clean.

**Reste (Phases 2→4) :** distracteurs étiquetés (division CM2 d'abord), restitution prof, inter-niveaux.

---

## 8 ter. Phase 2 — ce qui a été livré (25/06/2026)

**Modèle de données (`lib/tutor-v4/types.ts`) :**
- `ChoiceDiagnostic` = `{ choice, cause, prereqMicroId?, errorKind? }` (étiquette d'un distracteur).
- `SuspectedPrereq` = `{ microId, cause, confidence: "high" | "graph" }`.
- `choiceDiagnostics?: ChoiceDiagnostic[]` ajouté à `TutorBankItemFixedV4`,
  `TutorGeneratedQuestionV4` (templates) **et** `TutorQuestionOption`.
- `AnswerEvaluation.suspectedPrereq?` (persisté dans `TurnAttempt.result` → utile Phase 3).

**Pipeline :**
- `questionPairBuilder.ts` fait transiter `choiceDiagnostics` (fixed **et** template) jusqu'à l'option.
  ⚠️ `shuffleChoices` réordonne mais préserve le **texte** des choix → on matche sur le texte.
- `diagnoseEngine.diagnoseFromChoice({ knowledge, option, normalizedAnswer })` : si la réponse
  normalisée (même normalisation que l'évaluateur) == un distracteur étiqueté portant un
  `prereqMicroId` existant → renvoie `SuspectedPrereq` confiance `high`.
- `answerTutorV4` calcule `suspectedPrereq` après l'évaluation (gaté maths|français), le persiste
  dans l'attempt, et ajoute la **priorité (2a)** : entrée en remédiation **immédiate** (dès la 1ʳᵉ
  erreur, sans le gate « 2 erreurs ») vers `suspectedPrereq.microId`, avec la `cause` dans le
  feedback. La priorité (2b) = entrée par blocage (Phase 1) reste le filet.

**Contenu étiqueté (division CM2, micro `division_lien_multiplication`) :**
- Fixes : `cm2_division_lien_multiplication_fixed_2`, `..._fixed_4_famille`.
- Gabarits : `..._tpl_2_verifier_qcm`, `..._tpl_5_famille`.
- Mapping : distracteur « erreur de table » → `multiplication_table` ; distracteur
  « mauvaise opération / inversion » → `division_sens`.

**Vérification (API) :** distracteur table `« 35 × 5 = 7 »` → remédiation immédiate vers
`multiplication_table` + cause ; distracteur inversion `« 3 ÷ 9 = 3 »` (gabarit) → `division_sens`
(discrimination OK). `tsc` clean.

**Limite assumée :** l'étiquetage ne couvre que les **QCM** (la réponse = un choix). Les items
`short` numériques (ex. « 48 ÷ 6 = ? ») où une réponse fausse est une erreur de table ne sont pas
diagnostiqués par distracteur — ils restent couverts par le filet graphe (Phase 1). Détection
calculatoire des erreurs de table sur `short` = extension possible (Phase 2+).

**Reste (Phases 3→4) :** restitution prof (`suspectedPrereq` est déjà persisté), inter-niveaux.

---

## 8 quater. Phase 3a — restitution élève (25/06/2026)

**Idée :** afficher à l'élève, sur son dashboard, *ce qu'il doit réviser* — les prérequis que
la remédiation a signalés — avec un bouton qui relance le Coach dessus.

**Choix : aucune nouvelle table SQL.** On réutilise `resultats_tutor.details` (déjà enregistré
par séance). Le jour où on veut la boucle « à réviser → consolidé » avec extinction auto, on
passera à une table dédiée.

**Chaîne :**
- Moteur : `AnswerTutorV4Response.aReviser?` (type `RevisionFocus = {microId,label,notionId,
  notionLabel?,cause?}`) renseigné **uniquement à l'entrée en remédiation** (branches 2a/2b de
  `answerTutorV4`).
- Client coach (`app/tutor-v4/TutorV4Client.tsx`) : accumule les `aReviser` de la séance
  (`aReviserList`, dédupliqué par micro), reset au changement de notion, sauvé dans
  `details.aReviser` au save.
- `app/api/dashboard/route.ts` : `details` ajouté au select **tutor (scope élève)**.
- `app/dashboard-eleve/DashboardEleveClient.tsx` : agrège `details.aReviser` des résultats tutor
  (dédup par micro, max 6, plus récent d'abord) → carte « 📌 À réviser » + lien
  `/tutor-v4?classe=&matiere=&notion=&microId=&display=simple`.

**Vérifié :** API renvoie bien `aReviser` (ex. `multiplication_table` + cause). `tsc` clean.
Le rendu de la carte n'a pas été vu en preview (besoin d'un élève connecté + résultats en base) —
le contrat de données est validé au niveau moteur et tsc.

**Reste Phase 3b (prof) :** même donnée (`suspectedPrereq` est déjà persisté dans les attempts,
et `details.aReviser` dans `resultats_tutor`) → bloc « cause probable » sur `dashboard-prof`.

### Phase 3b — restitution prof (25/06/2026)
- `app/api/dashboard/route.ts` : `details` ajouté au select **tutor (scope établissement)**
  (était omis « trop lourd » ; `aReviser` est léger → acceptable ; optim possible : projection
  JSON `details->aReviser`).
- `app/dashboard-prof/DashboardProfClient.tsx` : helper `aggregateAReviser(tutor)` (dédup micro,
  max 5, plus récent) → `EleveSynthese.aReviser` → bloc « 📌 À renforcer (repéré par le Coach) »
  dans le détail élève déplié (label + notion + cause). Pas de bouton « réviser » côté prof
  (c'est informatif ; la révision se fait côté élève).
- `tsc` clean. Rendu non vu en preview (besoin compte prof + données en base) ; contrat
  `details.aReviser` identique à la 3a (déjà vérifié au moteur).

---

## 9. Pièges connus (repris des autres chantiers tutor-v4)

- `normalizeClasse` a sa propre whitelist dans `app/tutor-v4/TutorV4Client.tsx` (sinon le tutor
  retombe sur 6e). Toute nouvelle logique de classe doit y être cohérente.
- `buildQuestionPair` exige **≥ 2 items** par couple `notionId+microId` — la remédiation qui
  bascule vers un prérequis doit viser un micro **qui a une banque** (sinon throw). À vérifier
  pour les micros de remédiation ciblés.
- Le moteur **mélange déjà les choix QCM** (`shuffleChoices`) → ne pas se fier à l'ordre pour
  identifier un distracteur ; matcher sur le **texte** du choix dans `choiceDiagnostics`.
- Webpack « module not found » sur nouveau fichier → `rm -rf .next` puis relancer la preview.
