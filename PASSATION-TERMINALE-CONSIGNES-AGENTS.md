# Consignes communes — feuilles d'exercices de terminale spé (29/09/2026)

Dépôt : `C:\Users\FRED\Documents\eleveai` (Windows ; outils Write/Edit pour écrire ; ⛔ jamais de heredoc Git Bash : il avale les antislashs).
Toujours rapporter EN FRANÇAIS.

## Ta mission
Écrire, pour chaque notion qui t'est confiée, UNE feuille de 20 exercices corrigés de terminale spécialité maths, et son script de recalcul. Aucune fiche de cours (⛔ rien sous `lib/fiches/` ni `app/fiches-cours/`).

## ⛔ Fichiers interdits
- Ne touche PAS à : `lib/fiches-exercices/registre.ts`, `lib/fiches-exercices/chargeurs.ts`, `lib/fiches-exercices/figures.tsx`, `scripts/verifier-exercices-commun.mjs`, `scripts/verifier-exercices-terminale-commun.mjs`, ni à aucun fichier `maths-5e-*` / `maths-4e-*` (d'autres sessions y travaillent). Si tu as besoin d'un changement dans l'un d'eux, DIS-LE dans ton rapport.
- Ne lance PAS de serveur de développement, ne fais PAS de commit, ne génère pas de PDF.

## Les trois fichiers par notion (<slug> = notionId en tirets, ex. `limite_fonction` → `limite-fonction`)
1. `lib/fiches-exercices/maths-terminale-<slug>.tsx` — exporte `exercices<NomEnCamel>Terminale: FicheExercicesData` : `classe: "terminale-spe"`, `notion: "<slug>"`, `titre` NU (« Limites de fonctions »), `accroche`, `fichesCours: []` (exigé par le type, laissé VIDE), `coachHref: "/coach-ia/maths?classe=terminale-spe"`, trois `series`.
2. `app/fiches-exercices/maths/terminale-spe/<slug>/page.tsx` — page mince, calquée sur `app/fiches-exercices/maths/terminale-spe/limite-suite/page.tsx` (title « <Titre> terminale spé : 20 exercices corrigés (PDF) », description de 2-3 phrases).
3. `scripts/verifier-exercices-terminale-spe-<slug>.mjs` — recalcul INDÉPENDANT, bâti sur `scripts/verifier-exercices-terminale-commun.mjs` (lis-le : `feuilleTerminale`, `termes`, `courbes`, `tableauDe`, `pointsSur`, `arrondi`, `dit`, `integrale`, `derivee`, `binom`, `binomCumul`, `dichotomie`, `executerPython`, `fin()`). Doit finir sur « 0 fausses ».

## L'ÉTALON À LIRE EN ENTIER AVANT D'ÉCRIRE
- `lib/fiches-exercices/maths-terminale-limite-suite.tsx` (la feuille étalon de terminale, écrite aujourd'hui) et son script `scripts/verifier-exercices-terminale-spe-limite-suite.mjs`.
- `lib/fiches-exercices/figures.tsx` (toutes les aides de dessin et leurs contraintes, en commentaires).
- La feuille de 1re spé du même thème s'il y en a une (`lib/fiches-exercices/maths-premiere-*.tsx`) : ⛔ ne pas la répéter, aller PLUS LOIN (niveau terminale).
- Les micros de ta notion : `lib/tutor-v4/knowledge/maths/terminale-spe/microSkills.ts` (champ `notionId`), et l'en-tête + quelques items des banques `lib/tutor-v4/questionBank/terminale-spe/maths/*.bank.ts` (y compris `-concours`) : c'est le périmètre.

## Contenu (décisions de Frédéric, enseignant)
- 20 exercices : ★ « Un seul geste » ×8, ★★ « Type devoir » ×8, ★★★ « Problèmes » ×4 (chacun avec `titre`). Un `rappel` de 2 à 4 lignes avant chaque niveau. Consignes de série SANS formule.
- Niveau : vraies questions de devoir et de BAC ; les ★★★ ressemblent à un exercice de bac (questions qui s'enchaînent). Démonstrations du programme quand le BO en prévoit.
- Corrigé ÉTAPE PAR ÉTAPE (une étape par ligne, `\n`), le pourquoi, le piège NOMMÉ (⚠️ / ⛔ / ⭐) — CHAQUE corrigé a au moins un ⚠️ ou ⛔. Écrire simplement : une phrase par idée.
- ⭐⭐⭐ CANVAS : CHAQUE exercice a au moins un dessin qui AIDE (figure dans l'énoncé si on le lit ; schéma dans le corrigé s'il montre la réponse) : courbes et tangentes, tableaux de variations/signes, aire sous une courbe (hachurée = bande de segments verticaux en `pts`, ou courbe + droites), suites en points (`termes`) avec leur limite en `horizontale`, arbres, lois en barres (`diagramme`), programmes (`programme`) et leur `trace`. Pas de dessin décoratif. Le corrigé DIT ce qu'on voit sur le dessin (« ⭐ Sur le dessin : … »).
- Contextes concrets dans les ★★ et TOUS les problèmes : physique (radioactivité, circuit RC, refroidissement, chute), économie, écologie, démographie, sport, médecine, informatique. ⛔ Pas La Réunion par défaut. Chiffres = MODÈLES ; aucun fait réel non vérifié (liste dans ton rapport les faits réels que tu cites).
- Couvrir TOUTES les micros de la notion (liste en en-tête du fichier : « Micro-compétences : … N/N ») et rien hors programme de terminale spé. Le script commun vérifie que toutes sont citées dans `micros: [...]` et qu'aucune micro d'une autre notion n'y est.
- Tableaux de variations aux bornes infinies : écrire « +∞ » / « −∞ » en toutes lettres (vrai signe moins U+2212), vérifier que chaque flèche dit la même chose que le signe de f′ (le canvas déduit les flèches en comparant les valeurs : mettre des valeurs cohérentes, ex. « −∞ » < nombre < « +∞ »).

## Règles de rendu (mesurées ; chacune a déjà cassé une feuille)
- `repere(cadre, courbes, marques, horizontale, grand)` : ymin < 0 ; `grand = true` (5e argument) au-delà de 10 unités sur un axe ; 15 unités au plus (sinon changer d'unité et le dire). Le canvas ne gradue que les entiers. Points marqués : `termes(n0, [valeurs arrondies])` ou `{ x, y, label: "" }`. Une étiquette ne tombe ni sur une graduation ni sur un autre point (sinon label vide et le corrigé nomme le point).
- Courbes non polynomiales : aide locale `echantillon(f, de, a, yMin, yMax)` comme dans l'étalon (coupe AUSSI en hauteur).
- Texte NU dans les SVG (labels, tableaux, diagrammes, tableaux de variations) : jamais de `$`, vrai signe moins « − ».
- `tableau(entete, ligne)` : entete.length === ligne.length. Sous des barres, dès 4 barres : libellés de 9 signes au plus.
- Une `grid` qui regroupe deux dessins : `className="grid grid-cols-1 min-w-0 gap-2"` (sinon débordement à 375 px).
- Pas de formule KaTeX insécable de plus de ~30 signes (le script commun AVERTIT au-delà de 34 : couper en deux formules `$…$ $…$`).
- ⛔ JAMAIS de vraie fin de ligne dans une chaîne "…" : toujours `\n`.
- PDF ≤ 12 pages : 12 à 14 dessins IMPRIMÉS par feuille ; le surplus dans `ecranSeulement(…)` (aide locale `<div className="print:hidden">`). Priorité d'impression aux dessins qui PORTENT la réponse et aux figures d'énoncé. ⚠️ Ne mets pas en écran seulement une figure sans laquelle l'énoncé est illisible sur papier.
- LaTeX dans les chaînes TS : antislashs DOUBLÉS (`\\lim`, `\\int`, `\\ln`, `\\dfrac`), `{,}` pour la virgule décimale, `\\mathrm{e}` pour e.
- Pour une figure maison (solide de l'espace en perspective cavalière, aire hachurée…) : écris une aide locale dans ta feuille qui renvoie un `<svg viewBox=…>` (largeur max ~ 17rem, `className="block h-auto w-full"`), texte NU en `<text>` de 13-14 px, et déclare son nom au script : `feuilleTerminale({ …, dessinsEnPlus: ["espace"] })`. Arguments en clair pour que le script puisse les relire.

## Le script de recalcul
- Recalcule chaque résultat annoncé par un AUTRE chemin que le corrigé (limites par évaluation numérique, intégrales par `integrale` (Simpson), dérivées par `derivee`, probabilités binomiales exactes, solutions d'équations différentielles vérifiées en dérivant numériquement, équations résolues par `dichotomie`), ET les données des dessins relues dans le source (`pointsSur`, `tableauDe`, `courbes`, `dessin(nom, k, role)`), et vérifie par `dit(k, "morceau exact du corrigé")` que le corrigé écrit bien ces résultats (morceaux en LaTeX tel qu'à l'écran : `\\dfrac` dans le .mjs = `\dfrac` à l'écran).
- Exécute réellement les programmes Python cités (`executerPython`).
- Termine par `F.fin()` (règles de rendu, structure 8+8+4, un dessin par exercice, 12 à 14 imprimés, micros couvertes, dollars appariés…). Doit afficher « 0 fausses ».
- Si une aide de dessin de ta feuille n'est pas connue du contexte, passe-la par `contexte: { nomAide: implementationJS }` ou `dessinsEnPlus`.

## Avant de rendre
1. `node scripts/verifier-exercices-terminale-spe-<slug>.mjs` → « 0 fausses », sans avertissement de formule longue si possible.
2. `npx tsc --noEmit -p .` : aucune erreur dans TES fichiers (ignorer `.next-*` et les fichiers des autres).
3. Rapport (en français, court) : fichiers créés, nombre de vérifications, dessins imprimés/écran, micros N/N, faits réels cités, et tout doute (niveau, programme, rendu).
