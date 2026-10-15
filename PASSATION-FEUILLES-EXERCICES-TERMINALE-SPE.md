# Passation — les feuilles d'exercices de terminale spé (18 à écrire)

## ✅ COMMITTÉ LE 30/09 : `8c3b4b3b` (77 fichiers), PAS ENCORE POUSSÉ
Frédéric : « ce soir on pousse terminale et 5° ». On pousse le soir, en un seul push avec la 5e (`4e448aa5`).

## ✅ PDF : les 18 régénérés après le correctif du canvas (30/09)
Sept sont committés dans `f6b2d5b3` (poussé), les onze autres dans `9e3deea8` (PAS ENCORE POUSSÉ, à pousser au signal du soir). Trois font 14 pages (limites de fonctions, primitives, algorithmique). ✅ Frédéric a tranché le 30/09 : on les GARDE, car raccourcir les corrigés nuirait à la compréhension. Tout est poussé et vérifié sur origin/main.

## (historique) PDF après le correctif du canvas (30/09, après le commit)
- 7 PDF régénérés, présents sur le disque mais NON committés :
  - limite-suite, suite-numerique, denombrement-combinatoire, equation-differentielle : 13 p ;
  - loi-binomiale, concentration-echantillonnage : 12 p ;
  - algorithmique-python : 14 p.
- 11 PDF en échec (« page.goto : Timeout 30000ms ») : limite-fonction, continuite-tvi, derivation-fonction, convexite-fonction, fonction-exponentielle, fonction-logarithme, primitive-integrale, geometrie-espace, produit-scalaire-espace, probabilite-conditionnelle, variable-aleatoire.
- À reprendre : serveur redémarré ET chauffé (un curl sur chaque page avant la fournée), puis committer les 18 PDF et `pdf-disponibles.ts` s'il a bougé.

## ✅ ÉTAT AU 30/09 (deuxième séance)
- Les 18 feuilles sont écrites, avec leurs 18 pages et leurs 18 scripts, tous à « 0 fausses ».
- tsc est propre sur tout le projet.
- Les 18 clés `maths/terminale-spe/<slug>` sont au registre, et chargeurs.ts est régénéré.
- 375 px (playwright, script `mesure-375.mjs` du scratchpad) : 18/18 à 20 exercices, largeur 375, 0 erreur KaTeX, 0 `$`, un dessin par exercice.
- Chevauchements corrigés : les diagrammes à 7 ou 11 barres affichaient 0,234… ; ils passent en EFFECTIFS entiers (chemins sur 64, cas sur 36, chemins sur 1 024, « pour 1 000 »).
- ✅ Le chevauchement « 0 » / « −1 » près de l'origine est corrigé DANS LE CANVAS (`lib/canvas/FonctionGraphiqueCanvas.tsx`, 30/09). Un chiffre d'ordonnée qui tomberait dans la rangée des abscisses n'est plus écrit ; son trait reste. Résultat : 0 chevauchement sur les 18 pages. Ce canvas est commun à toutes les classes : il faut committer ce fichier AVEC les feuilles. Les PDF faits avant ce correctif gardent l'ancien « −1 » : les régénérer avant le commit, si possible.
- PDF : les 18 sont générés et listés dans `pdf-disponibles.ts`.
  - Six faisaient 14 pages : limite-suite, suite-numerique, limite-fonction, primitive-integrale, variable-aleatoire, algorithmique-python. On les ramène à 12 dessins imprimés, puis il faut RÉGÉNÉRER ces six PDF (serveur redémarré).
  - Fait le 30/09, PDF régénérés : limite-suite, suite-numerique et variable-aleatoire passent à 13 p. limite-fonction, primitive-integrale et algorithmique-python restent à 14 p (20/20 corrigés), même avec 12 dessins imprimés : c'est le TEXTE qui pèse. À trancher par Frédéric : accepter 14 p, ou alléger des corrigés. Pour algo, les 12 dessins imprimés sont tous des figures d'énoncé.
  - continuite-tvi : 13 p, accepté (le script sort en « hors domaine », normal au-delà de 12).
- ⚠️ COMMIT : `registre.ts` et `chargeurs.ts` contiennent AUSSI les lignes de la session 5e (feuilles pas forcément committées). Pour chargeurs.ts, soit committer avec les fichiers 5e, soit ne stager que nos hunks (`git add -p`, cf. mémoire « stager son hunk »). Un chargeur qui importe un fichier absent casse la construction.
- `pdf-disponibles.ts` est lui aussi partagé.

## ⏳ ÉTAT AU 29/09 AU SOIR (première séance)
- ✅ Étalon écrit : `lib/fiches-exercices/maths-terminale-limite-suite.tsx` + page
  `app/fiches-exercices/maths/terminale-spe/limite-suite/page.tsx` + script
  `scripts/verifier-exercices-terminale-spe-limite-suite.mjs` (637 justes, 0 fausses ;
  14 dessins imprimés, 6 écran ; tsc propre ; 375 px : 20 ex., largeur 360, 0 katex-error,
  0 `$`, un dessin par exercice).
- ✅ NOUVEAU socle des scripts : `scripts/verifier-exercices-terminale-commun.mjs`
  (`feuilleTerminale` : relit les dessins, règles de rendu, 8+8+4, 12-14 imprimés,
  micros, Python, Simpson, binomiale…). Chaque script de notion l'utilise.
- ✅ Consignes des agents : copiées dans `PASSATION-TERMINALE-CONSIGNES-AGENTS.md`.
- ⏳ 8 agents lancés en fin de séance sur les 17 autres notions (suites + limites de
  fonctions ; TVI + dérivation ; convexité + exp + ln ; intégrales + équa diff ;
  espace ×2 ; conditionnelles + binomiale ; v.a. + concentration ; algo + dénombrement).
  S'ils ont été coupés, vérifier ce qui existe (`ls lib/fiches-exercices/maths-terminale-*`)
  et relancer chaque script : une feuille à « 0 fausses » + tsc propre est gardée, sinon
  la reprendre.
- Relevé à l'arrêt (29/09, ~10 min avant la fin) : 10 scripts à « 0 fausses » —
  limite-suite, suite-numerique, limite-fonction, continuite-tvi, convexite-fonction,
  fonction-exponentielle, primitive-integrale, probabilite-conditionnelle,
  variable-aleatoire, algorithmique-python. Feuilles écrites mais SANS script à ce
  moment : denombrement-combinatoire, geometrie-espace, loi-binomiale. Pas encore
  commencées : derivation-fonction, fonction-logarithme, equation-differentielle,
  produit-scalaire-espace, concentration-echantillonnage. Rapports des agents NON relus ;
  tsc et rendu à refaire sur toutes.
- ⏳ À FAIRE ensuite : registre (18 clés `maths/terminale-spe/<slug>`), puis
  `node scripts/generer-chargeurs-fiches-exercices.mjs` (chargeurs.ts est GÉNÉRÉ, pour le
  composeur), rendu 375 px de chaque page, PDF un par un, `pdf-disponibles.ts`, commit par chemin.
- ⚠️ Point ouvert (rendu) : dans les repères `[-1, 9, -1, 7]`, `[-1, 9, -1, 6]`,
  `[-1, 8, -1, 8]` (ex. 2, 10, 17 de l'étalon), le « 0 » de l'origine chevauche la
  graduation « −1 » (5 × 8 px). ⛔ ymin = −0,7 ne marche pas : le canvas écrit « −0,7 »
  comme graduation. Piste : laisser tel quel (la 1re spé a des chevauchements du même
  ordre) ou chercher le placement du « 0 » dans `lib/canvas/FonctionGraphiqueCanvas.tsx`.
- Serveur de cette session : `eleveai-2` (port 3100). Mesure 375 px : iframe sandbox,
  ouvrir les `details.fiche-correction`, compter `[data-exercice]`, chevauchements de `<text>`.

> Écrit le 29/09/2026. À coller tel quel au début de la nouvelle session.

## Ce qu'on fait

Frédéric : « je préfère compléter les fiches d'exercices pour tous les niveaux ».
Cette session écrit **les 18 feuilles d'exercices de terminale spécialité maths**,
une par notion du coach, 20 exercices corrigés chacune. Aucune n'existe encore.
⛔ ON RESTE SUR LES FICHES D'EXERCICES : cette session n'écrit AUCUNE fiche de
cours, ne crée rien sous `lib/fiches/` ni `app/fiches-cours/`, et ne touche pas
à `lib/fiches/registre.ts`.

Les 18 notions (ids du coach, dans cet ordre) : suite_numerique, limite_suite,
limite_fonction, continuite_tvi, derivation_fonction, convexite_fonction,
fonction_exponentielle, fonction_logarithme, primitive_integrale,
denombrement_combinatoire, geometrie_espace, produit_scalaire_espace,
probabilite_conditionnelle, variable_aleatoire, loi_binomiale,
algorithmique_python, equation_differentielle, concentration_echantillonnage.

⛔ D'AUTRES SESSIONS TRAVAILLENT EN MÊME TEMPS : la 5e (18 feuilles) et la 4e
(ses 4 dernières). Ne touchez à aucun de leurs fichiers (`maths-5e-*`,
`maths-4e-*`, leurs pages, leurs scripts). État au 29/09 : 3e, seconde,
première, 1re spé complètes.

## Le mécanisme (à respecter à la lettre)

Pour chaque notion, TROIS fichiers :
- `lib/fiches-exercices/maths-terminale-<slug>.tsx` — <slug> = notionId en tirets
  (ex. `limite-suite`). Exporte un `FicheExercicesData`
  (`lib/fiches-exercices/types.ts`) : `classe: "terminale-spe"`,
  `notion: "<slug>"`, `titre` NU, `accroche`, `fichesCours: []` (champ exigé
  par le type, laissé vide),
  `coachHref: "/coach-ia/maths?classe=terminale-spe"`, trois `series`.
- `app/fiches-exercices/maths/terminale-spe/<slug>/page.tsx` — page mince avec son
  propre title/description (« … terminale spé : 20 exercices corrigés (PDF) »).
- `scripts/verifier-exercices-terminale-spe-<slug>.mjs` — recalcul INDÉPENDANT.

Puis UNE ligne par feuille dans `lib/fiches-exercices/registre.ts`, clé
`"maths/terminale-spe/<slug>"` (sitemap, hub, bouton « Exercices » du coach).
Titre « <Titre> : 20 exercices corrigés », résumé de 2-3 phrases : les gestes,
puis les contextes concrets. La classe `terminale-spe` est déjà connue du hub et
de `libelleClasse` (« Tale spé ») : rien d'autre à câbler.

Étalons à lire EN ENTIER avant d'écrire : les feuilles de 1re spé, niveau juste
en dessous, en particulier `maths-premiere-trigonometrie.tsx`,
`maths-premiere-derivation.tsx`, `maths-premiere-variables-aleatoires.tsx`,
`maths-premiere-produit-scalaire.tsx` (écrites les 26-29/09, dessins partout), et
`lib/fiches-exercices/figures.tsx` (repere + 5e argument `grand`, tableauSignes,
tableauVariations, vecteurs, droites, triangle, arbre, diagramme, boite,
programme, trace, intervalles, venn… et leurs contraintes). Pour chaque notion,
lire les micros (`lib/tutor-v4/knowledge/maths/terminale-spe/microSkills.ts`) et
l'en-tête des banques du coach (`lib/tutor-v4/questionBank/terminale-spe/maths/
*.bank.ts`, y compris les banques `-concours`) : c'est là qu'est le périmètre du
BO de terminale. Ne pas répéter la feuille de 1re spé du même thème : aller plus
loin (limites, TVI, convexité, logarithme, intégrales, espace, binomiale…).

## Les règles de contenu (décisions de Frédéric)

- 20 exercices : ★ « Un seul geste » ×8, ★★ « Type devoir » ×8, ★★★ « Problèmes »
  ×4 (avec `titre`). Un `rappel` de 2 à 4 lignes avant chaque niveau.
- Niveau : de vraies questions de devoir et de BAC (les ★★★ ressemblent à un
  exercice de bac, questions qui s'enchaînent). Démonstrations du programme
  quand le BO en prévoit.
- Corrigé ÉTAPE PAR ÉTAPE (une étape par ligne), le pourquoi, le piège NOMMÉ
  (⚠️ / ⛔ / ⭐). Écrire simplement : une phrase par idée.
- ⭐⭐⭐ CANVAS — Frédéric le répète à chaque séance : « n'oublie pas les canvas ».
  CHAQUE exercice a au moins un dessin qui AIDE (figure dans l'énoncé si on le
  lit, schéma dans le corrigé s'il montre la réponse) : courbes et tangentes,
  tableaux de variations et de signes, aire sous une courbe hachurée, suites en
  points avec leur limite en horizontale, solides et repères de l'espace
  (projection plane lisible), arbres, lois en barres, programmes et leur trace.
  Pas de dessin décoratif. Le script le vérifie.
- Contextes concrets dans le ★★ et tous les problèmes : physique (radioactivité,
  circuit RC, refroidissement, chute), économie, écologie, démographie, sport,
  médecine, informatique. ⛔ Pas La Réunion par défaut. Chiffres = MODÈLES ;
  aucun fait réel non vérifié (lister dans le rapport ceux qu'on cite).
- Couvrir TOUTES les micros de la notion (liste en en-tête : « Micro-compétences :
  … N/N »), et rien hors du programme de terminale spé.
- ⚠️ Tableaux de variations aux bornes infinies : le canvas déduit ses flèches en
  comparant les valeurs ; écrire « +∞ » / « −∞ » en toutes lettres (vrai signe
  moins) et vérifier que chaque flèche dit la même chose que le signe de f′.

## Les règles de rendu (mesurées, chacune a déjà cassé une feuille)

- Sous des barres, dès 4 barres : libellés de 9 signes au plus.
- `repere(...)` : ymin < 0 ; `grand = true` (5e argument) au-delà de 10 unités sur
  un axe ; ~15 unités au plus (changer d'unité sinon).
- Une étiquette de point ne tombe ni sur une graduation ni sur un autre point
  (on ne peut pas changer son côté dans ce canvas : déplacer le point ou vider
  l'étiquette si le corrigé le nomme).
- Texte NU dans les SVG (jamais de `$`), vrai signe moins « − ».
- `tableau(entete, ligne)` : entete.length === ligne.length.
- Une `grid` qui regroupe deux dessins porte `grid-cols-1 min-w-0` (sinon un
  dessin large fait déborder TOUTE la page à 375 px).
- Pas de formule KaTeX insécable de plus de ~30 signes (somme dans un numérateur,
  intégrale développée, longue liste) : couper en deux formules.
- ⛔ JAMAIS de vraie fin de ligne dans une chaîne "…" : toujours `\n` (12 chaînes
  cassées le 28/09, vues par `tsc` seulement).
- PDF ≤ 12 pages : 12 à 14 dessins IMPRIMÉS par feuille ; le surplus dans
  `ecranSeulement(…)` (div `print:hidden`) — priorité d'impression aux dessins qui
  portent la réponse.
- LaTeX dans les chaînes TS : antislashs DOUBLÉS (`\\lim`, `\\int`, `\\ln`),
  `{,}` pour la virgule décimale. Outil Write/Edit, ⛔ jamais de heredoc Git Bash
  (il avale les antislashs).

## Le script de recalcul (un par feuille)

Recalcule chaque résultat annoncé ET les données des dessins relues dans le
source (limites par évaluation numérique, intégrales par approximation,
probabilités binomiales exactes, solutions d'équations différentielles
vérifiées en dérivant) ; vérifie aussi : `$` pairs, micros existantes et toutes
couvertes, 20 `correction:`, découpage 8+8+4, un dessin par exercice, les règles
de rendu. Doit finir sur « 0 fausses » (exit 1 sinon). Si Python est disponible,
exécuter réellement les programmes cités. Modèles :
`scripts/verifier-exercices-premiere-spe-*.mjs`, `scripts/verifier-exercices-commun.mjs`.

## Les contrôles avant commit (dans cet ordre)

1. Les 18 scripts à « 0 fausses ».
2. `npx tsc --noEmit -p .` propre (ignorer les erreurs dans `.next-*` : fichiers générés).
3. Rendu à 375 px, sur SON serveur (ne jamais tuer celui d'une autre session) :
   pour chaque page, 20 exercices, aucun débordement de page, 0 `.katex-error`,
   aucun `$` visible, chaque `[data-exercice]` contient `svg, table,
   div.grid.border-slate-900` ou `pre`, et aucune paire de `<text>` d'un même SVG
   qui se recouvre de plus de 3 px dans les deux sens (sous 3 px : marge de boîte).
   ⚠️ Mesurer dans une iframe `sandbox="allow-same-origin allow-scripts"` de
   375 px : sans le sandbox, une page a redirigé l'onglet vers l'accueil.
4. PDF, UNE fiche à la fois, serveur REDÉMARRÉ juste avant (le rechargement à
   chaud perd la feuille d'impression et le script expire) ; ne toucher à AUCUN
   fichier du site pendant la fournée ; PowerShell :
   `node --experimental-strip-types scripts/build-fiches-pdf.ts http://localhost:<port> /fiches-exercices/maths/terminale-spe/<slug>`.
   Une première page qui expire sur un serveur neuf : relancer (compilation à
   froid). 13 pages avec 20/20 corrigés = accepté (la limite 12 cherche l'accident).
5. Relire `lib/fiches/pdf-disponibles.ts` : une autre session peut l'avoir
   réécrit ; il doit lister les nouveaux PDF (sinon le regénérer depuis
   `public/fiches/`, même règle que le script).

## Git

- ⭐ COMMITTER PAR CHEMIN : `git add -- <mes fichiers>` puis vérifier
  `git diff --cached --name-only` AVANT `git commit`. D'autres sessions ont des
  fichiers en cours (5e, 4e, composeur, accueil, manim…) : ne pas les ajouter,
  ne pas les annuler.
- `registre.ts` est partagé avec la session 5e : vérifier que son diff ne contient
  que vos clés ; en cas de conflit, relire le fichier avant d'éditer.
- Commits groupés ; ⛔ PUSH seulement au signal de Frédéric (le soir) ; ⛔ jamais
  manim ni le son. Jamais `--amend`, `reset --hard`, `checkout -- .`.
- Toujours répondre en français.

## Méthode qui a marché le 28-29/09

Écrire UNE feuille étalon soi-même (par exemple `limite-suite`), puis répartir
les autres entre 4 ou 5 agents par thème (analyse ; intégrales et équations
différentielles ; espace ; probabilités ; algorithmique et dénombrement), avec
des consignes communes écrites dans un fichier. Relire leurs rapports, câbler
soi-même le registre, puis faire tous les contrôles ci-dessus. Les agents ont
tendance à mettre leurs dessins ajoutés en « écran seulement » et à laisser des
fins de ligne brutes : `tsc` et le compteur de dessins les attrapent.
