# Passation — les feuilles d'exercices de 5e (18 à écrire)

> Écrit le 29/09/2026. À coller tel quel au début de la nouvelle session.

## Ce qu'on fait

Frédéric : « je préfère compléter les fiches d'exercices pour tous les niveaux ».
Cette session écrit **les 18 feuilles d'exercices de 5e qui manquent**, une par
notion du coach, 20 exercices corrigés chacune. Une seule existe déjà :
`maths/5e/fraction-calcul` (`lib/fiches-exercices/maths-5e-fraction-calcul.tsx`).

Les 18 notions (ids du coach, dans cet ordre) : algo_programmation,
algo_construire, relatif_nombre, relatif_operation, divisibilite, fraction_nombre,
prop_proportionnalite, prop_ratio_pourcentage, litteral_calcul, angle_mesure,
triangle_figure, sym_centrale, parallelogramme, aire_surface, grandeur_conversion,
volume_solide, stat_statistique, proba_experience.

État des autres classes au 29/09 : 3e, seconde, première, 1re spé complètes ;
4e à 29/33 (⛔ une AUTRE session travaille sur ses 4 dernières — ne pas y toucher :
`maths-4e-dependance.tsx`, `maths-4e-frequences.tsx`, `maths-4e-volumes.tsx`…) ;
terminale spé pris par une autre session ; 6e, primaire, STMG : rien.

## Le mécanisme (à respecter à la lettre)

Pour chaque notion, TROIS fichiers :
- `lib/fiches-exercices/maths-5e-<slug>.tsx` — <slug> = notionId en tirets.
  Exporte un `FicheExercicesData` (`lib/fiches-exercices/types.ts`) :
  `classe: "5e"`, `notion: "<slug>"`, `titre` NU, `accroche`, `fichesCours`
  (la fiche de cours `maths/5e/<slug>` si elle existe dans `lib/fiches/registre.ts`,
  sinon `[]`), `coachHref: "/coach-ia/maths?classe=5e"`, trois `series`.
- `app/fiches-exercices/maths/5e/<slug>/page.tsx` — page mince avec son propre
  title/description (≠ du titre de la fiche de cours).
- `scripts/verifier-exercices-5e-<slug>.mjs` — recalcul INDÉPENDANT (voir plus bas).

Puis UNE ligne par feuille dans `lib/fiches-exercices/registre.ts`, clé
`"maths/5e/<slug>"` : c'est ce qui met la feuille au sitemap, au hub et sur le
bouton « Exercices » du coach. Titre « <Titre> : 20 exercices corrigés », résumé
de 2-3 phrases : les gestes, puis les contextes concrets.

Étalons à lire EN ENTIER avant d'écrire : `maths-5e-fraction-calcul.tsx` (la seule
de 5e), les feuilles de 4e voisines (`maths-4e-*.tsx`, même public, dessins
partout), et `lib/fiches-exercices/figures.tsx` (repere + 5e argument `grand`,
droite, intervalles, triangle, vecteurs, droites, tableau, diagramme, boite,
de, roue, billes, arbre, programme, trace, venn… et leurs contraintes).
Lire aussi, pour chaque notion, les micros (`lib/tutor-v4/knowledge/maths/5e/
microSkills.ts`) et l'en-tête de la banque du coach (`lib/tutor-v4/questionBank/
5e/maths/*.bank.ts`) : c'est là que sont les LIMITES DU PROGRAMME de 5e (ex. :
relatifs = addition/soustraction, pas le produit ; pas de résolution d'équation
formelle ; pas d'identité remarquable).

## Les règles de contenu (décisions de Frédéric)

- 20 exercices : ★ « Un seul geste » ×8, ★★ « Type devoir » ×8, ★★★ « Problèmes »
  ×4 (avec `titre`). Un `rappel` de 2 à 4 lignes simples avant chaque niveau.
- Corrigé ÉTAPE PAR ÉTAPE (une étape par ligne), le pourquoi, le piège NOMMÉ
  (⚠️ / ⛔ / ⭐). Écrire simplement : une phrase par idée, le mot de la classe.
- ⭐⭐⭐ CANVAS — Frédéric le répète à chaque séance : « n'oublie pas les canvas ».
  CHAQUE exercice a au moins un dessin qui AIDE (figure dans l'énoncé si on le
  lit, schéma dans le corrigé s'il montre la réponse). Pas de dessin décoratif.
  Le script le vérifie.
- Exemples concrets : sport, nature, écologie, économie, physique, histoire-géo,
  « il faut exploiter le monde ». ⛔ Pas La Réunion par défaut (83 % du public est
  en métropole). Chiffres = MODÈLES ; aucun fait réel non vérifié.
- Couvrir TOUTES les micros de la notion (liste en en-tête : « Micro-compétences :
  … N/N »), et rien hors du programme de 5e.

## Les règles de rendu (mesurées, chacune a déjà cassé une feuille)

- Sous des barres, dès 4 barres : libellés de 9 signes au plus.
- `repere(...)` : ymin < 0 ; `grand = true` (5e argument) au-delà de 10 unités sur
  un axe ; ~15 unités au plus (changer d'unité sinon).
- Une étiquette de point ne tombe ni sur une graduation ni sur un autre point.
- Texte NU dans les SVG (jamais de `$`), vrai signe moins « − ».
- `tableau(entete, ligne)` : entete.length === ligne.length.
- Une `grid` qui regroupe deux dessins porte `grid-cols-1 min-w-0` (sinon un
  dessin large fait déborder TOUTE la page à 375 px).
- Pas de formule KaTeX insécable de plus de ~30 signes (une somme dans un
  numérateur, une longue liste) : couper en deux formules.
- ⛔ JAMAIS de vraie fin de ligne dans une chaîne "…" : toujours `\n` (12 chaînes
  cassées le 28/09, vues par `tsc` seulement).
- PDF ≤ 12 pages : 12 à 14 dessins IMPRIMÉS par feuille ; le surplus dans
  `ecranSeulement(…)` (div `print:hidden`) — priorité d'impression aux dessins qui
  portent la réponse.
- LaTeX dans les chaînes TS : antislashs DOUBLÉS, `{,}` pour la virgule décimale.
  Outil Write/Edit, ⛔ jamais de heredoc Git Bash (il avale les antislashs).

## Le script de recalcul (un par feuille)

Recalcule chaque résultat annoncé ET les données des dessins relues dans le
source ; vérifie : `$` pairs, micros existantes et toutes couvertes, 20
`correction:`, découpage 8+8+4, un dessin par exercice, les règles de rendu
ci-dessus. Doit finir sur « 0 fausses » (exit 1 sinon). Modèles :
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
   `node --experimental-strip-types scripts/build-fiches-pdf.ts http://localhost:<port> /fiches-exercices/maths/5e/<slug>`.
   13 pages avec 20/20 corrigés = accepté (la limite 12 cherche l'accident).
5. Relire `lib/fiches/pdf-disponibles.ts` : une autre session peut l'avoir
   réécrit ; il doit lister les nouveaux PDF (sinon le regénérer depuis
   `public/fiches/`, même règle que le script).

## Git

- ⭐ COMMITTER PAR CHEMIN : `git add -- <mes fichiers>` puis vérifier
  `git diff --cached --name-only` AVANT `git commit`. D'autres sessions ont des
  fichiers en cours dans l'arbre (composeur, accueil, 4e, manim…) : ne pas les
  ajouter, ne pas les annuler.
- `registre.ts` est partagé : vérifier que son diff ne contient que vos clés.
- Commits groupés ; ⛔ PUSH seulement au signal de Frédéric (le soir) ; ⛔ jamais
  manim ni le son. Jamais `--amend`, `reset --hard`, `checkout -- .`.
- Toujours répondre en français.

## Méthode qui a marché le 28-29/09

Écrire UNE feuille étalon soi-même, puis répartir les autres entre 3 ou 4 agents
(consignes communes dans un fichier, lots par thème), relire leurs rapports,
câbler soi-même le registre, puis faire tous les contrôles ci-dessus. Les agents
ont tendance à mettre leurs dessins ajoutés en « écran seulement » et à laisser
des fins de ligne brutes : `tsc` et le compteur de dessins les attrapent.
