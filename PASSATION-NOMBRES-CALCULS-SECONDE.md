# Passation — seconde, « Nombres et calculs » (21/09/2026, reprise l'après-midi)

> À coller dans la session de l'après-midi. Lire d'abord la note de mémoire
> `nombres-et-calculs-seconde-feuilles-et-fiches` : état, temps mesurés, leçons.

## Où on en est
8 feuilles d'exercices + 2 fiches de cours écrites, vérifiées au rendu et par
script. RIEN n'est commité. Le serveur de dev tournait sur le port 3000.

## À faire, dans l'ordre (Frédéric chronomètre chaque action)
1. **Fiche d'arithmétique** : mode classe à 1280 × 800 (comparer au témoin
   « information chiffrée » : 9/28, max 560) et rendu à 360 px.
2. **Relancer les 8 scripts** (tous doivent finir sur « N casses sur N attrapées ») :
   `for f in puissances racines devfac identites expressions equations arithmetique reels; do node scripts/verifier-exercices-$f.mjs | tail -1; done`
3. **Les 10 PDF** — serveur REDÉMARRÉ (sinon la feuille d'impression est perdue),
   en PowerShell, un chemin à la fois :
   `node --experimental-strip-types scripts/build-fiches-pdf.ts http://localhost:3000 /fiches-exercices/maths/seconde/<notion>`
   notions : puissances-2de, racine-carree-2de, developpement-factorisation-2de,
   identites-remarquables-2de, expressions-litterales-2de,
   equations-inequations-1er-degre, arithmetique-entiers, reels-intervalles ;
   puis `/fiches-cours/maths/seconde/reels-intervalles` et `/fiches-cours/maths/seconde/arithmetique-entiers`.
4. **Commit PAR CHEMIN** — `git diff --cached --name-only` avant ; ⛔ jamais `manim/`
   ni un son ; montrer le rendu à Frédéric, pousser sur son « pousse ».
   Fichiers de la session :
   - `lib/fiches-exercices/maths-seconde-{puissances,racines,devfac,identites,expressions,equations,arithmetique,reels}.tsx`
   - `app/fiches-exercices/maths/seconde/{puissances-2de,racine-carree-2de,developpement-factorisation-2de,identites-remarquables-2de,expressions-litterales-2de,equations-inequations-1er-degre,arithmetique-entiers,reels-intervalles}/page.tsx`
   - `lib/fiches-exercices/registre.ts` (8 lignes) · `lib/fiches/registre.ts` (2 lignes)
   - `lib/fiches/maths-seconde-{reels,arithmetique}.tsx` + `app/fiches-cours/maths/seconde/{reels-intervalles,arithmetique-entiers}/page.tsx`
   - `scripts/verifier-exercices-{commun,puissances,racines,devfac,identites,expressions,equations,arithmetique,reels}.mjs`
   - `lib/canvas/DroiteGradueeCanvas.tsx` + `lib/tutor-v4/types_canvas.ts` (option `intervalles`)
   - + les PDF et le manifeste `PDF_DISPONIBLES` après l'étape 3.
5. **Les vidéos** : troisième étape du plan de Frédéric, à chronométrer aussi.

## Règles apprises ce matin (à tenir pour les prochaines feuilles)
- Une question = une lettre a), b)… sinon la diapo du mode classe déborde.
- Crochets simples `[ ]`, jamais `\left[ \right]` ; intervalles `]{-\infty}\,;\,2]`.
- Droite graduée : cadre 260 (feuille) ou 240 (fiche) ; courbe : cadre 215.
- Pas de `$` dans une `consigne` de série.
- Le temps se mesure par les fichiers (création des `page.tsx`), pas à l'estime.
