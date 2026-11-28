# REPRISE — Ti Margo, problèmes du CP (épisodes 01 → 07), 28/11/2026

Voix VALIDÉES par Frédéric le 28/11 (ne pas les changer sans lui) : `manim/SCRIPTS-ti-margo-problemes.md` (section CP)
et `manim/voix/margo-pb-cp-<ep>-{paysage,short}.json`. WAV déjà faits (`public/sons/margo-pb-cp-*`, Julie débit −6, ignorés par git) ;
instants des mots déjà faits dans `films/margo-pb-cp-cues.js` et `films/margo-pb-cp-paysage-cues.js` (séries PROPRES au CP :
personne d'autre ne les réécrit ; si une voix change, relancer `python scripts/ti-margo-cues.py margo-pb-cp[-paysage] <ep>`).
Le CE1 (08 → 10) a sa propre session et ses propres séries `margo-pb-ce1[-paysage]` : ne pas y toucher.

## Socle (fait par la session mère, ⛔ ne pas modifier)
- Séries : `films/margo-pb-cp.json/.js` (shorts) et `films/margo-pb-cp-paysage.json/.js` (paysages) ; `films/margo-commun.js` (relit cp-commun.js).
  Elles relisent cp-entier(-paysage).js, cp-entier2/3-dessins.js, idriss-dessins*.js (lecture seule : formuleE, enfantE, dameE, chatE, poissonE…)
  puis `films/margo-dessins.js` et `films/margo-dessins-cp.js`.
- `films/margo-dessins.js` (commun CP/CE1, figé) : `finShortE()`, `barreE()` (schéma en barre du coach : le tout en haut, les parts dessous, « ? »),
  `rangeeE()` (n objets en rangée), `rondNombreE()`.
- TES dessins : `films/margo-dessins-cp.js` (une seule session écrit ici). Tes films : `films/margo-pb-cp-<ep>.js` et `films/margo-pb-cp-paysage-<ep>.js`
  (`FILMS['<ep>']=function(outils){…}`). Modèles à recopier : `films/idriss-cp-defi.js` (short) et `films/idriss-paysage-cp-defi.js` (paysage) ;
  y remplacer Idriss par Ti Margo et les décors du port par ceux du script. DUR = durées réelles des WAV.
- Sorties : `manim/sorties/margo-pb/<num>-cp-<ep>/`.

## Épisodes (bonnes réponses du script)
| N° | Épisode (micro) | Short | Paysage |
|---|---|---|---|
| 01 | identifier (`cp_probleme_identifier`) | « Les œufs de la poule » (B) | « Les biscuits du train » (C, A) |
| 02 | schema (`cp_probleme_schema`) | « Les poissons de l'aquarium » (A) | « Les bonnets dans la neige » (A, A) |
| 03 | deux-etapes (`cp_probleme_deux_etapes`) | « La mangeoire des oiseaux » (C) | « Le bus qui s'arrête » (A, B) |
| 04 | multiplicatif (`cp_probleme_multiplicatif`) | « Les pattes des chatons » (B) | « Les fraises de l'anniversaire » (B, C) |
| 05 | partage (`cp_probleme_partage`) | « Les crêpes de mamie » (C) | « Le pique-nique dans la forêt » (A, A) |
| 06 | reponse (`cp_probleme_reponse`) | « Les cerises de Lina » (C) | « Les livres de la bibliothèque » (B, C) |
| 07 | defi (`cp_probleme_defi`) | « Les billes de la récré » (C) | « Les défis du cirque » (C, C) |

## Règles (Frédéric)
Ti Margo raconte (« je ») ; objets calmes, GRANDS et lisibles, un dessin à chaque question (test d'un enfant de 6 ans) ; compte à rebours `rebours:8`
(barre visible, pause ≈ 8,4 s après la question) ; bonne réponse = celle du script ; ceinture blanche (`ceinture:0`) ; pas de « TU PARIES ? » écrit ;
chaque nombre dit est écrit ; au CP on écrit « 4 fois 3 », jamais « × » ; aucun lieu nommé ; fin « eleveai.fr ou YouTube @eleveai974 ».
Paysage : dessiner GRAND, questions ET réponses à x < 480 (la carte est à droite). Short : Ti Margo petit à gauche dès la fin du titre.
`phraseE(txt, ts)` : autant d'instants que de mots. Titres longs des shorts : `#titre{font-size:60px}`.
Planches -ql contrôlées image par image AVANT la HD ; corriger tout défaut mineur (texte serré, chevauchement, coupé).

## ⛔ RAM et HD
UNE SEULE HD à la fois sur tout le poste : verrou `hd-verrou.txt` du dossier de notes partagé
`C:\Users\FRED\AppData\Local\Claude-Data\claude_pzs8sxrjxfjjc\side-session-notes\local_b3fb1aff-2015-48b3-923f-9601de2506e4`.
S'il existe : attendre (Monitor / boucle until, pas de sleep au premier plan). Sinon l'écrire (« cp <ep> <heure> »), vérifier RAM libre ≥ 2,5 Go, lancer,
SUPPRIMER le fichier à la fin (même en cas d'échec). Planches -ql en parallèle permises, pas sous 2,5 Go libres.
(La monnaie CE1/CE2 a fini son branchement, bc730f272 : les HD sont permises.)

## Commandes
- Contrôle : `CONTROLE=<dossier> node scripts/ti-margo-short.mjs margo-pb-cp[-paysage] <ep> controle $(seq 1 2.5 130)` puis
  `python scripts/ti-margo-planche.py <dossier> <planche.png>` (et REGARDER la planche).
- HD (sous le verrou) : `node scripts/ti-margo-short.mjs margo-pb-cp[-paysage] <ep> film` ; miniature : `... miniature`.
- Miniatures des shorts : gabarit A + « Dessin animé » (`scripts/miniatures-shorts-grille.py`, entrées dans `scripts/miniatures-shorts-grille.json`,
  fichier PARTAGÉ : n'ajouter que tes lignes, relire juste avant d'écrire ; ou appeler `dessine()` en direct comme l'a fait la monnaie CP).

## Branchement (à la fin, comme `b1e565a3b` monnaie CP ; accord déjà donné)
Vignettes webp ; R2 sous `cp/maths/ti-margo/<num>-cp-<ep>/` (tailles R2 = locales) ; manifeste `manim/manifeste-youtube.json` : 14 entrées
`margo-pb-cp-<ep>[-short]` à la fin, YouTube daté 01/09 → 07/09/2027 (une paire par jour, après la monnaie qui finit le 31/08) ;
chapitres et instants des questions depuis les films (`enchainer` + DUR) ; `lib/videos/videos-r2.json` + `bilans-videos.json` (+ ce que b1e565a3b
a touché d'autre) édités PAR CLÉS (⛔ d'autres sessions ont des modifs NON commitées dans ces JSON : relire juste avant, n'ajouter que tes clés,
ne rien perdre, et `git add -p` / commit par chemin sans embarquer leurs lignes) ; coach : `node scripts/brancher-videos-coach.mjs --ecrire --id …`
→ 14 lignes notion_ressources (7 micros cp_probleme_*, paysage + short). Regarder `git show b1e565a3b` pour la recette exacte.
⛔ Ne JAMAIS lancer `generer-videos-r2.mjs`. ⛔ Ne jamais lancer la lecture d'une vidéo. Commit PAR CHEMIN, JAMAIS de push.

## À 65-70 % de contexte
Mettre à jour « État » ci-dessous, puis lancer une session fille qui reprend (sans demander). Sous-sessions par micro permises
(une fille n'écrit que les fichiers de son épisode ; une seule écrit dans `margo-dessins-cp.js`).

## État
- [x] Voix validées, WAV, instants, socle (session mère, 28/11).
- [ ] Films écrits → planches -ql contrôlées → HD (une à la fois) → planches HD → miniatures → branchement → rapport (hash, nombre branché, reste).
