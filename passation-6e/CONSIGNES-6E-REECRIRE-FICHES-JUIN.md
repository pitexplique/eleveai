# Consignes — réécrire les 19 fiches de cours de 6e de juin au standard (30/09/2026)

Frédéric : « les anciennes fiches de juin, il faudra les modifier, que ça
corresponde aux étalons des nouvelles fiches ». Et, pour la 6e : « ce sont
des 6e, ils ont parfois du mal à LIRE » ; « le mode classe doit être TRÈS
VISUEL, avec Ti Margo » ; « n'oublie pas les CANVAS ».
Réponds et commente en FRANÇAIS.

## Les étalons (à lire AVANT d'écrire)

- `lib/fiches/maths-6e-demi-droite-graduee.tsx`, `maths-6e-stat-enquete.tsx`,
  `maths-6e-bissectrice-angle.tsx` : les fiches du 30/09, au standard.
- `passation-6e/CONSIGNES-6E-FICHES-COURS.md` : TOUTES ses règles
  s'appliquent (longueurs max par bloc, un canvas par bloc, rendu, interdits),
  y compris la section CORRECTIF sur Ti Margo (champ `tiMargo`).
- `lib/fiches/REGLES.md`, `lib/canvas/CATALOGUE.md`.

## Ce qu'on garde, ce qu'on change

GARDER (sinon on casse le site) :
- le nom du fichier, les noms des exports (`fiche<Nom>6e`, `slides<Nom>6e`),
  `notion`, `classe`, `coachHref`, la page `app/fiches-cours/maths/6e/<slug>/` ;
- toutes les micros couvertes (mapping micro → blocs en tête du fichier) ;
- les nombres de la banque du coach (l'élève les retrouve dans le coach) ;
- les dessins justes qui marchent déjà (on les réutilise, on ne les refait pas
  pour le plaisir).

CHANGER :
- TOUS les textes, au standard 6e : phrases de ~12 mots (20 au plus), une idée
  par phrase, sujet-verbe-complément, le mot de la classe. Longueurs max :
  accroche 2 phrases ; définition 3 phrases ; propriété 2 phrases ; légende 1 ;
  réflexe 2 ; usage 2 ; solution d'exemple 3 à 5 phrases courtes ; piège 1-2 ;
  aRetenir 3 lignes de 15 mots ; reel et historique 4 phrases.
- Un `schema` sur CHAQUE propriété, réflexe, usage et exemple (ce sont les
  diapos du mode classe). Deux blocs voisins ne portent pas le même dessin.
- Ajouter `tiMargo` (5 à 6 clés, phrases ≤ 70 signes, sans LaTeX).
- La feuille d'exercices de la notion existe maintenant
  (`lib/fiches-exercices/maths-6e-<slug>.tsx`) : AUCUN exemple commun avec
  elle.
- Retirer La Réunion des exemples quand ce n'est pas un nombre de la banque.

## Mesurer avant / après (obligatoire)

Serveur de dev déjà lancé sur le port 3300 (ne pas le lancer, ne pas
l'arrêter) :
- `node scripts/mesurer-debordement-mode-classe.mjs 3300 6e/<slug>` → viser ✓
  (aucune diapo qui déborde à 1280 × 800, correction révélée) ;
- `node scripts/mesurer-mode-classe.mjs http://localhost:3300 maths 6e` mesure
  TOUTE la classe (dollars/LaTeX en clair) : le lancer une fois à la fin, ne
  regarder que tes fiches ;
- dessins : aucune lettre sous 11 px à 375 px (`scripts/apercu-canvas.mjs`,
  il plante sur la CSS de KaTeX : le lancer avec un `--import` qui neutralise
  les `.css`, voir le scratchpad) ;
- `npx tsc --noEmit -p .` une fois à la fin (≈ 10 min), tes fichiers seulement.

## Interdits

⛔ Ne touche pas : registres, chargeurs, banques, feuilles d'exercices,
`ModeClasse.tsx`, `FicheCoursClient.tsx`, `TiMargoBulle.tsx`,
`slidesDepuisFiche.tsx`, git, serveurs, les autres classes. Write/Edit
seulement (⛔ heredoc bash, ⛔ octet NUL).

## Rapport (court)

Par fiche : débordement avant → après, micros N/N, blocs dessinés, clés
Ti Margo, et les doutes de programme pour Frédéric.
