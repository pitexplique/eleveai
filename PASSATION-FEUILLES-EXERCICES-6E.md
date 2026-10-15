# Passation — la 6e : 35 feuilles d'exercices + 16 fiches de cours

> Écrit le 29/09/2026 au soir, par la session qui a fini la 5e. À coller tel
> quel au début de la nouvelle session.

## Ce qu'on fait

Frédéric : « demain je commence avec les 6e […] et j'aimerais que toutes les
fiches d'exercices soient faites pour eux ». La 6e n'a AUCUNE feuille
d'exercices. Le coach de 6e a **35 notions** : une feuille par notion, 20
exercices corrigés chacune. C'est deux fois la 5e (18 feuilles) : prévoir des
lots, et livrer d'abord les notions de début d'année.

État des classes au 29/09 au soir : 5e COMPLÈTE (19/19, commits `5be3e550` et
`4e448aa5`, non poussés à l'heure où j'écris) ; 3e, seconde, première, 1re spé
complètes ; 4e à 29/33 (une autre session : `maths-4e-dependance.tsx`,
`-frequences`, `-volumes` et `app/fiches-exercices/maths/4e/volume-solide/`,
ne pas y toucher) ; terminale spé en cours dans une autre session (ses lignes
sont dans `registre.ts`, `chargeurs.ts`, `pdf-disponibles.ts` : ne pas les
committer).

## Les 35 notions (ids du coach, dans l'ordre de `microSkills.ts`)

entier_nombre, decimal_nombre, decimal_calcul, demi_droite_graduee,
fraction_nombre, fraction_calcul, algebre_probleme, pourcentage_nombre,
prop_proportionnalite, prop_echelle, entier_calcul_pose, entier_calcul_mental,
aire_longueur, aire_perimetre, aire_unite, aire_surface, volume_solide,
angle_mesure, triangle_figure, triangle_propriete, quadrilatere_figure,
quadrilatere_propriete, duree_temps, distance_segment, bissectrice_angle,
vision_espace, cercle_circonscrit, mediatrice_segment, cercle_disque,
sym_axiale, algo_programmation, stat_enquete, stat_donnee, proba_experience,
proba_frequence.

⚠️ Vérifier l'ORDRE D'AFFICHAGE du coach de 6e (`app/coach-ia/[matiere]/page.tsx`
et ce qu'il lit) : c'est celui du registre. Les micros se listent avec un petit
script (regex `{ id, label, notionId }` sur
`lib/tutor-v4/knowledge/maths/6e/microSkills.ts`) : 3 à 6 micros par notion.

19 notions ont une fiche de cours (`lib/fiches/registre.ts`, clés
`maths/6e/…`) : entier-nombre, decimal-nombre, fraction-nombre,
pourcentage-nombre, prop-proportionnalite, entier-calcul-mental,
entier-calcul-pose, aire-longueur, aire-perimetre, aire-surface, volume-solide,
angle-mesure, triangle-figure, quadrilatere-figure, sym-axiale, stat-donnee,
proba-experience, algo-programmation, cercle-disque. Pour les 16 autres :
`fichesCours: []`.

## ⭐ ET LES FICHES DE COURS EN MÊME TEMPS (Frédéric, 29/09 au soir)

« Pour la 6e, compléter fiches d'exercices et fiches de cours en même temps. »
Les 16 notions SANS fiche de cours en reçoivent une, écrite avec sa feuille
d'exercices (même notion, même public, mêmes dessins, aucun exemple commun) :
decimal-calcul, demi-droite-graduee, fraction-calcul, algebre-probleme,
prop-echelle, aire-unite, triangle-propriete, quadrilatere-propriete,
duree-temps, distance-segment, bissectrice-angle, vision-espace,
cercle-circonscrit, mediatrice-segment, stat-enquete, proba-frequence.
(Vérifier d'abord qu'aucune n'est couverte par une fiche voisine : une fiche
peut en couvrir deux, voir `aussiPour` dans les registres.)

Le mécanisme d'une fiche de cours (le copier sur une fiche de 6e existante,
ex. `lib/fiches/maths-6e-cercle-disque.tsx`, et lire `lib/fiches/REGLES.md`) :
- `lib/fiches/maths-6e-<slug>.tsx` : exporte `fiche<Nom>6e: FicheCoursData`
  (`lib/fiches/types.ts`) et `slides<Nom>6e: ClasseSlide[]` (mode classe) ;
- `app/fiches-cours/maths/6e/<slug>/page.tsx` : page mince, `FicheCoursClient`,
  title « <Titre> — 6e : cours et exercices corrigés » ;
- une ligne dans `lib/fiches/registre.ts` (clé `maths/6e/<slug>`) ;
- puis `fichesCours: [{ href: "/fiches-cours/maths/6e/<slug>", … }]` dans la
  feuille d'exercices ;
- PDF de la fiche de cours : même script `build-fiches-pdf.ts`, chemin
  `/fiches-cours/maths/6e/<slug>`.
Règles de Frédéric pour les fiches de cours (mémoire) : écrire simplement,
fiches funs, peu de mots, adaptées à l'âge ; un visuel par bloc (canvas du
coach) ; largeur des blocs ; deux colonnes, jamais trois ; LIRE LES MICROS
AVANT d'écrire ; vérifier chaque fiche en la rendant. La fiche est projetable
en classe : c'est son outil de prof.

Ordre conseillé par notion : fiche de cours d'abord (elle fixe le vocabulaire
et le fil), puis la feuille d'exercices qui la prolonge sans la répéter.

La 4e est faite par Frédéric dans une AUTRE session : ne pas y toucher.

## Le mécanisme — celui de la 5e, qui a marché

Trois fichiers par notion, comme en 5e (lire `PASSATION-FEUILLES-EXERCICES-5E.md`,
toujours valable pour les règles de contenu et de rendu) :
- `lib/fiches-exercices/maths-6e-<slug>.tsx` → `exercices<Nom>6e`, `classe: "6e"`,
  `coachHref: "/coach-ia/maths?classe=6e"` ;
- `app/fiches-exercices/maths/6e/<slug>/page.tsx` ;
- `scripts/verifier-exercices-6e-<slug>.mjs`, qui importe le socle
  `scripts/verifier-exercices-5e-commun.mjs` avec la classe en 4e argument :
  `ouvrir("lib/fiches-exercices/maths-6e-<slug>.tsx", "<notionId>", [aides locales], "6e")`.
  Le socle vérifie tout le commun (dessin par exercice, 12-14 imprimés,
  guillemets, texte nu et vrai « − », grilles, droiteRel/axeVertical, 8+8+4,
  rappels, micros couvertes) ; le script de notion recalcule et relit les
  dessins. Doit finir sur « 0 fausses ».
Puis une ligne au registre `lib/fiches-exercices/registre.ts` (clé
`maths/6e/<slug>`), et `node scripts/generer-chargeurs-fiches-exercices.mjs`.

Étalons à lire : `maths-5e-relatif-nombre.tsx` + son script (écrit à la main,
le plus commenté), puis la feuille de 5e VOISINE de chaque notion de 6e (même
public à un an près, mêmes aides SVG : angles, triangles, aires, volumes,
proportionnalité, statistiques, probabilités, Scratch, fractions,
divisibilité…) — elles sont toutes à 0 fausse et propres à 375 px.

## Ce que la 6e a de particulier

- PUBLIC DE 11 ANS : phrases encore plus courtes, nombres plus simples, un
  seul geste par étape. « Fiches funs, peu de mots, adaptées à l'âge. »
- LIMITES DU PROGRAMME : les lire dans les banques
  (`lib/tutor-v4/questionBank/6e/maths/*.bank.ts`). Pas de nombres relatifs,
  pas de calcul littéral (algebre_probleme = problèmes à étapes, pas
  d'équation), fractions simples (fraction d'une quantité, fractions
  décimales), pas de symétrie centrale, périmètre et aire du disque selon la
  banque.
- ⚠️ Cinq banques de 6e sont MODIFIÉES par une autre session (angles,
  pourcentages, quadrilatères, triangles — voir `git status`) : lecture seule.
- ⚠️ `lib/canvas/AngleCanvas.tsx` était en cours de modification le 29/09 :
  la feuille des angles de 5e l'a évité (SVG local `geo()`), faire pareil.

## Les règles de rendu apprises sur la 5e (en plus de celles de la 5e)

- ⛔ AUCUN `min-w` sur un SVG : à 375 px, la zone de dessin d'une correction
  fait ~235 px ; avec un `min-w`, le dessin DÉFILE et son bord est caché
  (« Charlemagne » coupé sur la frise, 29/09). Police 14 dans un viewBox
  d'environ 300 (→ 11 px à l'écran, la limite).
- Étiquettes BORNÉES au viewBox (voir `droiteRel` de l'étalon), 18 d'écart
  vertical entre deux lignes de texte empilées.
- Tableau `tableau_donnees` : 3 colonnes courtes au plus, sinon il défile ;
  `tableau(…, true)` passe à la verticale sur téléphone.
- Camembert : deux petits secteurs voisins font chevaucher leurs noms —
  alterner petits et grands, ou passer en barres.
- `repere(…)` : graduations hors cadre si l'axe est trop long ; préférer une
  ligne brisée locale (voir `pointsRelies` de `maths-5e-stat-statistique.tsx`).
- Cotes d'un tracé en coin : une cote qui en touche une autre passe de l'autre
  côté (voir `lutin` de `maths-5e-algo-programmation.tsx`).

## Les contrôles avant commit (dans cet ordre) — tous faits sur la 5e

1. Tous les scripts à « 0 fausses ».
2. `npx tsc --noEmit -p .` propre (ignorer `.next-*`).
3. `node scripts/mesurer-feuilles-375.mjs <port> 6e <slug> …` sur SON serveur
   (preview « eleveai », port 3000, s'il est libre ; ne jamais tuer celui d'une
   autre session) : tout à ✓. C'est ce script, pas l'onglet caché du
   navigateur, qui a trouvé les 6 défauts de la 5e.
4. PDF un par un, serveur REDÉMARRÉ juste avant, AUCUN fichier du site touché
   pendant la fournée (PowerShell, en arrière-plan) :
   `node --experimental-strip-types scripts/build-fiches-pdf.ts http://localhost:<port> /fiches-exercices/maths/6e/<slug>`
   → 10 à 12 pages, 20/20 corrigés (13 accepté).
5. Relire le diff de `lib/fiches/pdf-disponibles.ts`.

## Git

- Committer PAR CHEMIN. `registre.ts`, `chargeurs.ts` et `pdf-disponibles.ts`
  sont PARTAGÉS : le 29/09, la terminale spé y écrivait en même temps. On a
  indexé une version du fichier = HEAD + ses seules lignes (lignes absentes de
  HEAD et étrangères à la classe retirées, puis `git hash-object -w` +
  `git update-index --cacheinfo`), et vérifié `git diff --cached`.
- Push seulement au signal de Frédéric (le soir) ; ⛔ jamais manim ni le son ;
  jamais `--amend`, `reset --hard`, `checkout -- .`.
- Toujours répondre en français.

## Méthode qui a marché le 29/09 (5e : 18 feuilles en une journée)

1. Écrire UNE feuille étalon soi-même, la mesurer à 375 px AVANT de lancer les
   agents (c'est là qu'on a trouvé la règle « aucun min-w »).
2. Consignes communes dans un fichier, 5 agents par lots de 3-4 notions
   voisines, chacun avec sa feuille de 5e voisine comme modèle. ⛔ Les agents
   ne touchent ni au registre, ni aux chargeurs, ni à git, ni aux serveurs.
3. Mesurer chaque page dès qu'elle existe et renvoyer les défauts à l'agent
   qui l'a écrite.
4. Câbler soi-même le registre (résumés des rapports), puis les contrôles
   ci-dessus.
Pour 35 notions : deux vagues de 5 agents (≈ 3-4 notions chacun), la première
sur les notions du début d'année (nombres entiers et décimaux, calcul, droite
graduée, angles, symétrie axiale).

## Laissé en suspens par la 5e (Frédéric : « on reprendra plus tard »)

Cinq doutes de contenu (réciproque de l'isocèle, caractérisation du
parallélogramme, « si… sinon » en 5e, π seulement approché, répartition du
Scrabble) et l'ancienne feuille `maths-5e-fraction-calcul.tsx` (20/09), qui
n'a des dessins que dans 5 exercices sur 20. Pas pour la session de 6e.
