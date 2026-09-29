# Consignes communes — les 16 fiches de COURS de 6e (30/09/2026)

Tu écris des FICHES DE COURS de maths de 6e pour EleveAI (Next.js, racine
`C:\Users\FRED\Documents\eleveai`). Frédéric est enseignant : il PROJETTE la
fiche en classe (mode classe) et la distribue. Réponds et commente en FRANÇAIS.

## ⭐⭐ Les trois consignes de Frédéric (30/09)

1. « N'oublie pas que ce sont des 6e : ils ont parfois du mal à LIRE. »
2. « Les fiches de cours en mode classe doivent être TRÈS VISUELLES, avec
   Ti Margo si tu veux. »
3. « N'oublie pas les CANVAS. »

Donc :
- Phrases de 12 mots en moyenne, 20 au plus. Une idée par phrase,
  sujet-verbe-complément. Pas de tiret cadratin qui empile deux idées. Le mot
  de la classe, jamais celui du mathématicien. Test : la phrase se dit telle
  quelle à l'oral devant des enfants de 11 ans.
- Longueurs MAX : accroche 2 phrases courtes ; définition 3 phrases ;
  propriété 2 phrases ; légende 1 phrase ; méthode 2 phrases par réflexe ;
  usage 2 phrases ; solution d'exemple 3 à 5 phrases courtes ; piège 1-2
  phrases ; aRetenir 3 lignes de 15 mots ; reel et historique 4 phrases.
  (La fiche `maths-6e-cercle-disque.tsx` est TROP bavarde : prends sa
  STRUCTURE et ses techniques de canvas, pas sa longueur.)
- UN CANVAS PAR BLOC : définition (figure), CHAQUE propriété, CHAQUE réflexe de
  méthode, chaque usage, CHAQUE exemple. Deux blocs voisins ne portent pas le
  même dessin. Le dessin MONTRE la règle (lire `lib/canvas/CATALOGUE.md` avant
  de choisir ; types dans `lib/tutor-v4/types_canvas.ts`). SVG local seulement
  si aucun canvas ne montre la chose (⛔ pas `AngleCanvas` : en cours de
  modification — SVG local).
- MODE CLASSE (`slides<Nom>6e: ClasseSlide[]`, type dans
  `components/fiches/ModeClasse.tsx`) : 8 à 10 diapos, CHACUNE avec un
  `schema` (un dessin), textes très courts (≤ 120 signes par carte), aucun
  LaTeX (pas de KaTeX en mode classe). Ti Margo : composant
  `components/fiches/TiMargoBulle.tsx` (déjà écrit, ne pas le modifier) :
  `import TiMargoBulle, { avecMargo } from "@/components/fiches/TiMargoBulle";`
  `schema: avecMargo(<dessin>, "La phrase clé, courte !", "attention")` —
  Ti Margo sur 4 à 6 diapos (objectif, règle d'or, pièges, exercice flash…),
  pas sur toutes. Humeurs : "normal", "joie", "attention" (pour un piège).

## ⛔⛔ CORRECTIF (30/09, après les premiers rapports) : Ti Margo passe par la DONNÉE

Le mode classe N'UTILISE PAS `slides<Nom>6e` : `FicheCoursClient` fabrique les
diapos depuis la fiche (`lib/fiches/slidesDepuisFiche.tsx` : objectif,
définition + figure, une diapo par propriété, réel, historique, formule,
réflexes, usages, exemples, pièges, à retenir, exercices). Donc :
- Ti Margo se déclare DANS la fiche, champ `tiMargo` (type `TiMargoDiapo` de
  `lib/fiches/types.ts`) :
  `tiMargo: { objectif: "…", definition: "…", pieges: "…", retenir: "…", exercice: "…" },`
  4 à 6 clés, une phrase ≤ 70 signes chacune, sans LaTeX. Les humeurs sont
  fixées d'office (pièges = attention). Clés possibles : objectif, definition,
  reel, historique, formule, methode, pieges, retenir, exercice.
- Le visuel du mode classe = les `schema` de la fiche : chaque propriété,
  réflexe, usage, exemple doit en avoir un (ils deviennent les diapos).
- Le tableau `slides<Nom>6e` reste exporté (la page le passe, un tableau VIDE
  couperait le mode classe) mais son contenu n'est pas projeté : garde-le
  court, sans effort.

## Le mécanisme (par notion)

Lire d'abord : `lib/fiches/REGLES.md` (en entier), `lib/fiches/types.ts`,
`lib/fiches/maths-6e-cercle-disque.tsx` et `maths-6e-calcul-pose.tsx`
(modèles de structure), et les mémoires de Frédéric recopiées ici.

- `lib/fiches/maths-6e-<slug>.tsx` : exporte `fiche<Nom>6e: FicheCoursData`
  (`classe: "6e"`, `notion: "<slug>"` = notionId en tirets,
  `coachHref: "/coach-ia/maths?classe=6e"`) et `slides<Nom>6e: ClasseSlide[]`.
  En-tête : mapping micro → blocs, « Micro-compétences N/N ».
- `app/fiches-cours/maths/6e/<slug>/page.tsx` : page mince, copie de
  `app/fiches-cours/maths/6e/cercle-disque/page.tsx`, title
  « <Titre> — 6e : cours et exercices corrigés ».
- ⛔ Ne touche PAS `lib/fiches/registre.ts` (je le câble) : donne la ligne
  dans ton rapport.

## Contenu

- LIRE LES MICROS AVANT D'ÉCRIRE : `lib/tutor-v4/knowledge/maths/6e/microSkills.ts`
  et les ÉNONCÉS de la banque `lib/tutor-v4/questionBank/6e/maths/<…>.bank.ts`
  (lecture seule). Toutes les micros couvertes. Les nombres des exemples
  viennent de la banque (l'élève les retrouve dans le coach).
- Exemples du monde d'un enfant de 11 ans : sport, jeux, goûter, animaux,
  nature, cuisine, trajet de l'école. ⛔ Pas La Réunion par défaut.
- La feuille d'exercices de la même notion s'écrit en parallèle
  (`lib/fiches-exercices/maths-6e-<slug>.tsx`, peut-être pas encore là) : si
  elle existe, AUCUN exemple commun.
- Rien hors du programme de 6e (pas de relatifs, pas d'équation à lettre,
  pas de symétrie centrale).

## Rendu (mesuré, chaque règle a déjà cassé une fiche)

- Aucune lettre de dessin sous 11 px à 375 px : régler `size` des canvas
  (cadre ~228-260 de large pour une carte ; voir l'en-tête de cercle-disque).
  Vérifier avec `node scripts/apercu-canvas.mjs <figures.json> <sortie.html>`
  (lis son en-tête pour le format) : il refuse sous 11 px.
- Aucune légende ne touche une autre ; étiquettes dans le cadre.
- Tableaux : deux colonnes, jamais trois quand c'est évitable ; `tableau_donnees`
  3 colonnes courtes au plus.
- ⛔ Aucun `min-w`. Une `grid` : `grid-cols-1 min-w-0`.
- LaTeX : antislashs DOUBLÉS dans les chaînes TS, `{,}` pour la virgule ;
  ⛔ jamais de vraie fin de ligne dans une chaîne "…".
- Écrire avec Write/Edit (⛔ jamais de heredoc bash ; ⛔ aucun octet NUL).

## Interdits

- ⛔ Ne touche pas : les registres, `chargeurs.ts`, les banques, les feuilles
  d'exercices, `TiMargoBulle.tsx`, `ModeClasse.tsx`, `FicheCoursClient.tsx`,
  git, les serveurs (n'en lance pas, n'en tue pas), la 4e, la terminale.
- `npx tsc --noEmit -p .` UNE fois à la fin ; ne regarde que TES fichiers.

## Rapport final (court)

Par fiche : micros couvertes N/N, nombre de canvas (fiche / diapos), la
sortie de `apercu-canvas` (plus petite police), la ligne de registre :
`"maths/6e/<slug>": { titre: "…", resume: "… (une phrase simple)" },`
et tout doute de programme pour Frédéric.
