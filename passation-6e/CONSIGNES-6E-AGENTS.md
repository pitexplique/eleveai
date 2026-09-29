# Consignes communes — feuilles d'exercices de 6e (30/09/2026)

Tu écris des FEUILLES D'EXERCICES de maths de 6e pour EleveAI (Next.js,
racine `C:\Users\FRED\Documents\eleveai`). Frédéric est enseignant ; il projette
ces feuilles en classe et les imprime (PDF). Réponds et commente en FRANÇAIS.

Lis d'abord EN ENTIER : `PASSATION-FEUILLES-EXERCICES-6E.md` et
`PASSATION-FEUILLES-EXERCICES-5E.md` (racine). Tout ce qu'elles disent des
règles de contenu et de rendu s'applique. Résumé ci-dessous, puis ton lot.

## Par notion, TROIS fichiers (et rien d'autre)

1. `lib/fiches-exercices/maths-6e-<slug>.tsx` (<slug> = notionId en tirets),
   export `exercices<NomEnCamel>6e: FicheExercicesData`, `classe: "6e"`,
   `notion: "<slug>"`, `titre` NU, `accroche`, `coachHref:
   "/coach-ia/maths?classe=6e"`, trois `series`.
   `fichesCours` : `[{ href: "/fiches-cours/maths/6e/<slug>", titre: "…" }]`
   SI la clé `maths/6e/<slug>` existe dans `lib/fiches/registre.ts` (reprendre
   son titre), sinon `[]`.
2. `app/fiches-exercices/maths/6e/<slug>/page.tsx` : page mince, calquée sur
   `app/fiches-exercices/maths/5e/relatif-nombre/page.tsx` (title ≠ titre de la
   fiche de cours, orienté « exercices corrigés <notion> 6e », description).
3. `scripts/verifier-exercices-6e-<slug>.mjs` : importe le socle
   `import { ouvrir, t } from "./verifier-exercices-5e-commun.mjs";`
   `const f = ouvrir("lib/fiches-exercices/maths-6e-<slug>.tsx", "<notionId>", [aides locales], "6e");`
   RECALCULE chaque résultat annoncé (nombres relus dans l'énoncé ou le
   dessin, jamais recopiés), vérifie les réponses écrites (`dit`), relit les
   données des dessins (`dessin`), puis `f.fin()`.
   `node scripts/verifier-exercices-6e-<slug>.mjs` doit finir sur « 0 fausses ».

## Modèles

- Étalon : `lib/fiches-exercices/maths-5e-relatif-nombre.tsx` + son script
  `scripts/verifier-exercices-5e-relatif-nombre.mjs` (le plus commenté).
- La feuille de 5e VOISINE indiquée dans ton lot (même public à un an près,
  aides SVG locales déjà mesurées propres à 375 px) : COPIE ses aides de dessin
  plutôt que d'en inventer.
- Aides communes : `lib/fiches-exercices/figures.tsx`.
- La fiche de cours de 6e de la notion si elle existe (`lib/fiches/maths-6e-*.tsx`) :
  même vocabulaire, AUCUN exemple commun.
- Les micros : `lib/tutor-v4/knowledge/maths/6e/microSkills.ts` ; les LIMITES
  du programme : en-tête et questions de la banque
  `lib/tutor-v4/questionBank/6e/maths/*.bank.ts` (LECTURE SEULE).

## Contenu (décisions de Frédéric)

- 20 exercices : ★ « Un seul geste » ×8, ★★ « Type devoir » ×8, ★★★
  « Problèmes » ×4 (avec `titre`). Un `rappel` de 2 à 4 lignes avant chaque
  niveau. Consignes de série SANS formule.
- PUBLIC DE 11 ANS : phrases très courtes, nombres simples, un seul geste par
  étape, le mot de la classe. « Fiches funs, peu de mots, adaptées à l'âge. »
- Corrigé étape par étape (une étape par ligne, `\n`), à la première personne
  (« je compte… »), le pourquoi, le piège NOMMÉ (⛔ / ⚠️ / ⭐), « Réponse : … ».
- ⭐⭐⭐ CHAQUE exercice a au moins un dessin qui AIDE (figure dans l'énoncé si
  on doit le lire, schéma dans le corrigé s'il montre la réponse). Jamais
  décoratif. 12 à 14 dessins IMPRIMÉS ; le surplus dans `ecranSeulement(…)`
  (priorité d'impression aux dessins qui portent la réponse).
- Exemples concrets variés : sport, nature, écologie, cuisine, économie du
  quotidien, sciences, histoire-géo. ⛔ Pas La Réunion par défaut. Chiffres =
  MODÈLES réalistes ; aucun fait réel non vérifié.
- Couvrir TOUTES les micros de la notion ; en-tête du fichier : commentaire
  « Micro-compétences : micro (n° d'exercices), … N/N », les pièges nommés,
  les limites du programme respectées.
- Rien hors programme de 6e : pas de relatifs, pas d'équation ni de lettre
  inconnue, pas de symétrie centrale, fractions simples.

## Rendu (chaque règle a déjà cassé une feuille)

- ⛔ AUCUN `min-w` sur un dessin. viewBox ≈ 300 de large, police 14.
- Étiquettes BORNÉES au viewBox ; 18 d'écart vertical entre deux lignes de
  texte ; aucune étiquette sur une graduation ou un autre point.
- Texte NU dans les SVG (jamais `$`), vrai signe « − » ; « × », « ÷ ».
- `tableau(entete, ligne)` : même longueur ; 3 colonnes courtes au plus pour
  `tableau_donnees` ; `tableau(…, true)` passe à la verticale sur téléphone.
- Barres : dès 4 barres, libellés de 9 signes au plus. Camembert : pas deux
  petits secteurs voisins.
- Une `grid` : `grid-cols-1 min-w-0`.
- Pas de formule KaTeX insécable de plus de ~30 signes.
- ⛔ JAMAIS de vraie fin de ligne dans une chaîne "…" : toujours `\n`.
- LaTeX : antislashs DOUBLÉS dans les chaînes TS, `{,}` pour la virgule.
- ⛔ `lib/canvas/AngleCanvas.tsx` : ne pas l'utiliser (en cours de
  modification) — SVG local comme `geo()` de `maths-5e-angle-mesure.tsx`.
- Outils Write/Edit uniquement pour écrire (⛔ jamais de heredoc bash : il
  avale les antislashs ; ⛔ aucun octet NUL).

## Interdits

- ⛔ Ne touche PAS : `lib/fiches-exercices/registre.ts`, `chargeurs.ts`,
  `lib/fiches/*`, les banques, git (ni add, ni commit, ni stash, ni checkout),
  les serveurs de dev (n'en lance pas, n'en tue pas), aucun fichier de 4e, de
  terminale ou d'une autre notion que les tiennes.
- `npx tsc --noEmit -p .` : UNE fois à la fin, et ne regarde que les erreurs
  de TES fichiers (les autres ne te concernent pas).

## Ton rapport final (court)

Pour chaque notion : le résultat du script (« N justes, 0 fausses », dessins
imprimés / écran), les contextes choisis, et une LIGNE DE REGISTRE prête à
coller :
`"maths/6e/<slug>": { titre: "<Titre> : 20 exercices corrigés", resume: "<2-3 phrases : les gestes, puis les contextes>" },`
plus tout doute de programme que Frédéric doit trancher.
