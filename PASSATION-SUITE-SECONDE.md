# Passation — la suite de la seconde (après la journée du 21/09/2026)

> À coller tel quel dans une nouvelle session. La mémoire du projet se charge
> seule ; lire d'abord la note `nombres-et-calculs-seconde-feuilles-et-fiches`.

## Ce qu'on a fait le 21/09 (tout est EN LIGNE)

Le bloc **« Nombres et calculs » de seconde est COMPLET** : 8 notions × (coach,
fiche de cours, feuille de 20 exercices + PDF, leçon vidéo reliée).
- 8 feuilles d'exercices + 2 fiches de cours (réels/valeur absolue, arithmétique),
  10 PDF — commit `7c148ac1`.
- 5 leçons vidéo publiées sur YouTube et reliées (base `notion_ressources` +
  `VIDEOS_FICHES` du sitemap, commit `bc638646`) : valeur absolue `Fmg5FNKY-Zs`,
  développer-factoriser `Luyg-h3m98o`, expressions `XsfMrmyxuak`, nombres premiers
  `ZZiXPXBTXIQ`, équations `O8xsaf2bwNc`.
- Canvas `number_line` : option `intervalles` (crochets tournés comme on les écrit).
- 9 scripts de recalcul `scripts/verifier-exercices-*.mjs` sur un socle commun
  (`verifier-exercices-commun.mjs`) : lecture des formules telles qu'écrites,
  fractions exactes, grille pour les intervalles, casses jouées en mémoire.

## Le chronomètre (MESURÉ par l'heure des fichiers, jamais estimé)
- Feuille d'exercices : ~15 min, page blanche → production (13,75 min sans PDF/commit).
- Fiche de cours : ~2-5 min d'écriture + ~15 min de contrôle au rendu.
- Leçon vidéo : ~10 min (écrire scène + voix 1,5-8 min ; rendu 3,5-5,5 min, deux
  en parallèle sur 8 cœurs ; contrôle par planches). Publication : le temps de Frédéric.

## Les réussites à reproduire
- « Coach d'abord » : lire l'échantillon de la banque (`echantillon-banque.mjs`)
  avant d'écrire ; aucun calcul de la fiche de cours repris dans la feuille.
- Une question = une lettre a), b)… : sinon la diapo du mode classe déborde.
- Le module commun des scripts : un nouvel exercice ne coûte que ses calculs.
- Chapitres YouTube MESURÉS dans la vidéo (scratchpad `coupes.py` : un écran
  commence quand l'image hors Ti-Margo redevient noire).
- Grouper : un commit, un push, un build Vercel par lot.

## Les erreurs (et la règle qui en est sortie)
1. Mon premier chrono était ESTIMÉ et se contredisait → le temps se lit dans
   l'heure des fichiers.
2. Défauts vus seulement AU RENDU : `\left[ \right]` insécable (débordement à
   375 px), `]-\infty` espacé par KaTeX (écrire `]{-\infty}`), textes dessinés
   à 8-9,75 px sur téléphone (cadre SVG trop large : droite 260, courbe 215 —
   la règle existait dans la mémoire, je ne l'ai pas relue), `$` dans une
   `consigne` (badge brut du mode classe).
3. Instruments trompeurs : une casse passée inaperçue, un script qui plantait
   « attrapait » les casses, 293 radicaux KaTeX comptés comme débordements, une
   hydratation cassée par mon propre `details.open = true`.
4. Vidéo valeur absolue : 4 défauts d'image → 3 rendus (crochets sur les
   nombres, texte sur le « R », étiquette sous les arcs, règle coupée au bord).
5. Vignette : « ✓ » sort en carré en Arial Black.
6. Miniatures laissées dans `manim/miniatures/` au lieu d'être copiées À CÔTÉ de
   la vidéo dans `manim/sorties/…` (règle de la mémoire oubliée).
7. Description YouTube : les chevrons < > sont REFUSÉS (« −2x > 6 »).
8. Commentaire de script faux (« fiche en ligne le même jour ») alors que la
   fiche devfac existait depuis le 10/09 — Frédéric l'a relevé.

## Ce qui reste — et l'ordre proposé
1. **Bloc « Fonctions » de seconde** (son calendrier : signes et variations en
   novembre-décembre) : 5 feuilles d'exercices (signes, vocabulaire, variations,
   affines, fonctions de référence), fiches déjà là ; puis leurs leçons vidéo
   (seules vocabulaire et affines ont une vidéo).
2. Géométrie (vecteurs, repère, droites, problèmes), puis stats-probas, Python,
   logique. Fiches de cours manquantes : `droites_plan`,
   `geometrie_problemes_plan`, `probabilites_ensemble_fini`,
   `probabilites_conditionnelles_2de`, `echantillonnage_simulation`, `logique_ensembles`.
3. La 3e (ses élèves de l'an dernier) : 22 notions, 0 feuille.
4. Shorts : « distance entre −3 et 5 » écrit (voix faite) mais pas rendu ; les
   shorts « 0,999… = 1 » et « −x » d'une autre session attendent leur publication.

## Les règles qui ne se discutent pas
- Chronométrer chaque action (Frédéric le demande) par l'heure des fichiers.
- Contrôle au rendu : 375 et 360 px, textes dessinés ≥ 11 px, mode classe
  1280 × 800 comparé à un témoin ; vidéos par planches toutes les 8 s.
- ⛔ Rien de `manim/` ni `public/sons/` dans un commit. Commit PAR CHEMIN,
  `git diff --cached --name-only` avant. Pousser sur son « pousse ».
- ⛔ `notion_ressources` = base de PRODUCTION : montrer le tableau, attendre son oui.
- Quand il demande une chose précise, faire CELLE-LÀ ; un doute → une question fermée.
