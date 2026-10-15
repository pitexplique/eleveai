# Passation — la 4e : RÉÉCRIRE les 33 feuilles d'exercices au standard de la 5e

> Écrit le 29/09/2026 au soir, par la session qui a fini la 5e. À coller tel
> quel au début de la session de 4e.

## Ce qu'on fait

Frédéric, 29/09 au soir : « il faut tout refaire pour la 4e » — précisé :
**les 33 feuilles d'exercices, réécrites depuis zéro**. Les **33 fiches de
cours restent telles quelles** (elles existent toutes).

Pourquoi : les feuilles de 4e datent du 25/09, d'avant les règles du 28-29/09
(un dessin qui aide dans CHAQUE exercice, 12-14 dessins imprimés, rendu
mesuré à 375 px sans rien qui défile, socle de contrôles commun). La 5e a été
faite le 29/09 à ce standard, en une journée : c'est le modèle.

La 6e a sa propre session (`PASSATION-FEUILLES-EXERCICES-6E.md`) : ne pas y
toucher. La terminale spé aussi (ses lignes dans les fichiers partagés).

## L'état de départ (29/09 au soir)

- 29 feuilles au registre, committées et poussées (25/09) :
  `lib/fiches-exercices/maths-4e-<nom>.tsx`, pages
  `app/fiches-exercices/maths/4e/<slug>/page.tsx`, scripts
  `scripts/verifier-exercices-<nom>-4e.mjs` (ancienne mécanique `lancer`).
- 3 feuilles écrites le 25/09 mais JAMAIS committées :
  `maths-4e-volumes.tsx` (+ page `4e/volume-solide`), `maths-4e-frequences.tsx`,
  `maths-4e-dependance.tsx`. `stat_donnee` : rien.
- Les 33 notions du coach (ordre de `lib/tutor-v4/knowledge/maths/4e/microSkills.ts`) :
  relatif_operation, fraction_nombre, fraction_calcul, puissance_ecriture,
  reperage, vision_espace, divisibilite, nombre_premier, ordre_grandeur,
  prop_proportionnalite, prop_ratio_pourcentage, prop_echelle,
  litteral_expression, litteral_distributivite, litteral_identite_remarquable,
  litteral_factorisation, equation_resolution, pythagore_theoreme,
  thales_theoreme, trigo_cosinus, triangle_figure, quadrilatere_parallelogramme,
  sym_transformation, aire_perimetre, aire_surface, volume_solide,
  grandeur_composee, stat_donnee, stat_statistique, proba_experience,
  proba_frequence, fonction_dependance, algo_programmation.

## Comment on réécrit (sans casser le site)

- **On garde le chemin du fichier et le nom de l'export** de chaque feuille
  existante (`maths-4e-relatifs.tsx` → `exercicesRelatifs4e`…) : la page, le
  registre, les chargeurs et le composeur continuent de pointer dessus. On
  REMPLACE le contenu.
- **L'ancienne feuille n'est qu'un réservoir** : ses faits sourcés (en-tête),
  ses bonnes idées de contexte, ses aides SVG. Les exercices sont réécrits,
  pas recopiés. Et aucun exemple de la fiche de cours de 4e n'est repris.
- **Nouveau script** par feuille : `scripts/verifier-exercices-4e-<slug>.mjs`,
  sur le socle du 29/09 :
  `import { ouvrir } from "./verifier-exercices-5e-commun.mjs";`
  `const f = ouvrir("lib/fiches-exercices/maths-4e-<nom>.tsx", "<notionId>", [aides locales], "4e");`
  recalcul indépendant (relire les nombres dans l'énoncé ou les arguments des
  dessins, calculer, chercher la réponse écrite avec `f.dit(k, "…")`), puis
  `f.fin()` → « 0 fausses ». Le socle vérifie : un dessin par exercice, 12-14
  imprimés, guillemets, texte nu et vrai « − », grilles, 8+8+4, 4 problèmes
  titrés, rappels de 2 à 4 lignes, toutes les micros de la notion.
  L'ancien script `verifier-exercices-<nom>-4e.mjs` est SUPPRIMÉ (`git rm`) dans
  le même commit que la feuille réécrite.
  ⚠️ `prop_defi` a un commentaire entre id et label dans les micros de 4e :
  le contrôle des micros le rate — corriger ce commentaire de place dans
  `microSkills.ts` seulement si Frédéric l'accepte, sinon le signaler.
- **Registre** : mettre à jour le `resume` de chaque feuille (2-3 phrases : les
  gestes, puis les contextes) ; ajouter les 4 nouvelles clés (volume-solide,
  stat-donnee, proba-frequence, fonction-dependance) à leur place ; puis
  `node scripts/generer-chargeurs-fiches-exercices.mjs`.
- **PDF** : chaque PDF est régénéré (même nom de fichier).

## Les règles de contenu (décisions de Frédéric)

- ★ « Un seul geste » ×8, ★★ « Type devoir » ×8, ★★★ « Problèmes » ×4 titrés.
  Rappel de 2 à 4 lignes simples avant chaque niveau ; consignes sans formule.
- Corrigé ÉTAPE PAR ÉTAPE, première personne, le pourquoi, le piège NOMMÉ
  (⛔ ⚠️ ⭐), « Réponse : » à la fin. Une phrase par idée, mots d'un élève de 4e.
- ⭐⭐⭐ « N'oublie pas les canvas » : un dessin qui AIDE dans CHAQUE exercice
  (figure d'énoncé qu'on lit, ou schéma de corrigé qui montre la réponse).
  Géométrie à l'échelle et codée.
- Exemples concrets : sport, nature, écologie, économie, physique,
  histoire-géo ; ⛔ pas La Réunion par défaut ; chiffres = modèles ; un fait
  réel seulement s'il est sûr, sourcé en en-tête. Les chiffres « de mémoire »
  du 25/09 (Everest, mer Morte, records, 184 coureurs, dentures) : les
  vérifier ou les remplacer par des modèles.
- PROGRAMME 2020 cette année (celui du coach), tranché le 25/09. Limites à lire
  dans `lib/tutor-v4/questionBank/4e/maths/*.bank.ts`. ⛔ Identités
  remarquables SANS formule : (x + 2)² = (x + 2)(x + 2) puis on distribue ;
  factorisation par facteur commun, sans identités lues à l'envers. En
  trigonométrie : le cosinus seulement. Papillon de Thalès : question posée le
  25/09, sans réponse — ne pas en mettre sans son accord.

## Les règles de rendu (mesurées ; chacune a cassé une feuille)

- ⛔ AUCUN `min-w` sur un SVG : à 375 px la zone de dessin d'une correction fait
  ~235 px ; avec un `min-w` le dessin DÉFILE et cache son bord. Police 14 dans
  un viewBox d'environ 300 (→ 11 px, la limite). (Le `min-w` de `diagramme()`,
  `arbre()`, `tableauProba()` de `figures.tsx` défile par conception : accepté.)
- Étiquettes bornées au viewBox ; 18 d'écart vertical entre deux lignes
  empilées ; cotes d'un tracé en coin de part et d'autre.
- Tableau `tableau_donnees` : 3 colonnes courtes au plus, sinon
  `tableau(…, true)` ; barres : libellés ≤ 9 signes dès 4 barres ; camembert :
  pas deux petits secteurs voisins ; `repere` : ymin < 0, `grand` au-delà de 10,
  ~15 unités au plus, sinon une ligne brisée locale.
- Texte NU dans les dessins, vrai « − », « 2,5 » ; LaTeX : antislashs doublés,
  `{,}` ; ⛔ jamais de vraie fin de ligne dans une chaîne ; ⛔ jamais de heredoc
  bash ni de `sed` sur ces fichiers (Write/Edit seulement).
- Toute `grid` de dessins : `grid grid-cols-1 min-w-0`.
- Arguments des aides de dessin EN CLAIR (le script les relit).

Aides toutes prêtes, à copier : `droiteRel` et `axeVertical`
(`maths-5e-relatif-nombre.tsx`), `geo` (angles, `maths-5e-angle-mesure.tsx`),
`tri` et `longueurs` (`maths-5e-triangle-figure.tsx`), `quad`
(`maths-5e-parallelogramme.tsx`), `grille` (quadrillage,
`maths-5e-sym-centrale.tsx`), `plan` (aires), solides en perspective
(`maths-5e-volume-solide.tsx`), `scratch` et `lutin`
(`maths-5e-algo-programmation.tsx`), `pointsRelies` et `barres`
(`maths-5e-stat-statistique.tsx`), tuiles et balance
(`maths-5e-litteral-calcul.tsx`).

## Méthode (celle qui a fait la 5e en un jour)

1. Réécrire SOI-MÊME une feuille étalon de 4e (ex. `relatif_operation`), la
   mesurer à 375 px, la PDF-er : c'est le modèle des agents.
2. Consignes communes dans un fichier (reprendre les règles ci-dessus), puis
   des agents par lots de 3-4 notions voisines (≈ 3 vagues de 5 agents pour
   32 feuilles), chacun avec la feuille de 5e voisine comme modèle. ⛔ Les
   agents ne touchent ni au registre, ni aux chargeurs, ni à git, ni aux
   serveurs ; ils rendent le résumé du registre dans leur rapport.
3. Mesurer chaque page dès qu'elle est prête et renvoyer les défauts à
   l'agent qui l'a écrite (SendMessage).
4. Câbler soi-même registre et chargeurs, puis les contrôles.

## Les contrôles avant commit (dans cet ordre)

1. Tous les scripts à « 0 fausses ».
2. `npx tsc --noEmit -p .` propre (ignorer `.next-*`).
3. `node scripts/mesurer-feuilles-375.mjs <port> 4e <slug> …` → tout à ✓, sur
   SON serveur (prendre un port libre de `.claude/launch.json` : 3000, 3100,
   3300, 3400, 3500 ; ne jamais tuer celui d'une autre session).
4. PDF un par un, serveur REDÉMARRÉ juste avant, aucun fichier du site touché
   pendant la fournée (PowerShell, en arrière-plan) :
   `node --experimental-strip-types scripts/build-fiches-pdf.ts http://localhost:<port> /fiches-exercices/maths/4e/<slug>`
   → 10 à 12 pages, 20/20 corrigés (13 accepté).
5. Relire le diff de `lib/fiches/pdf-disponibles.ts`.

## Git

- Committer PAR CHEMIN, par vagues (une feuille réécrite + son nouveau script
  + le `git rm` de l'ancien + son PDF). `registre.ts`, `chargeurs.ts`,
  `pdf-disponibles.ts` sont PARTAGÉS avec les sessions de 6e et de terminale :
  n'indexer que SES lignes (version = HEAD + ses lignes,
  `git hash-object -w` + `git update-index --cacheinfo`, puis
  `git diff --cached`).
- Push seulement au signal de Frédéric (le soir) ; ⛔ jamais manim ni le son ;
  jamais `--amend`, `reset --hard`, `checkout -- .`.
- Toujours répondre en français.

## Après

Dès que la 4e a ses 33 feuilles au nouveau standard : améliorer le composeur
de feuilles A/B pour elle (mémoire « composeur »). Les 5 doutes de la 5e :
« on reprendra plus tard » — pas pour cette session.
