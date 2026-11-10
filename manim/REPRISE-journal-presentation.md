# Reprise : paysage dessin animé « Le Journal d'EleveAI » (10/11/2026)

## Où on en est
- Script VALIDÉ par Frédéric (« Je valide »), commit `b2c916ff` : `manim/journal-presentation-script.md` + `manim/voix/journal-presentation-paysage.json` (+ short).
- ⛔ Le SHORT n'est PAS à faire : une autre session a déjà programmé le short « Bonnes actions × 2 » (série `monde`, j3ilVtalprI, 10/11 20 h 30). Le dire à Frédéric ; ne faire que la PAYSAGE.
- Fait, NON commité :
  - `prototypes/ti-margo/films/journal.json` (série `journal`, `"format": "paysage"`, sortie `manim/sorties/ti-margo/journal-presentation`).
  - Voix générées : `public/sons/journal-presentation-paysage/*.wav` (Julie, `-Debit -6`), instants : `prototypes/ti-margo/films/journal-cues.js` (`python scripts/ti-margo-cues.py journal presentation`).
  - Film : `prototypes/ti-margo/films/journal.js` (Ti Margo à gauche, page de journal crème à droite ; 3 questions dessinées sur la page par `carteQ`, 5 s de rebours ; écran de fin à 7 lignes avec « Un commentaire » ; sous-titres en bas tirés de `TEXTES` par `decouper`).
- Durée : environ 5 min (voix 4 min 51 + pauses).

## Bug corrigé (10/11, session 2)
Sous-titres appariés mot pour mot par `seq()` (jetons doublés sautés) ; contrôles faits sur 22 instants : page lisible, question 3 sur 3 lignes avec « ≈ », jour 30 sur sa ligne, arbre sous son texte, « Ce que tu as appris » sans nombres non dits. Réglages : page x=1.58 y=2.5, Ti Margo scene.x=-2.95, cam d=7.1 y=2.3. Durée : 5 min 24.

## La suite
1. Corriger jusqu'à ce que la page se charge, puis images de contrôle (2 8 15 28 40 55 … une par écran) et `python scripts/ti-margo-planche.py <dossier> <planche.png>` : régler caméra (`scene.x=-4.15`, `cam.d=9.6`, `cam.y=2.55`), position de la page (`poserPage` x=1.85 y=2.75 L=6.6 H=3.75), sous-titres en bas qui ne cachent rien, marges ≥ 3 %.
2. Vérifier voix = écrit (0 s d'avance) écran par écran.
3. `BD=1 node scripts/ti-margo-short.mjs journal presentation film` (brouillon basse définition), le montrer à Frédéric EN PAUSE (ne jamais lancer la lecture), puis le rendu final, `verifier-bords-video.py`, miniature (`… miniature`, mention « Dessin animé »).
4. Commit PAR CHEMIN, pas de push sans le rythme du jour.
