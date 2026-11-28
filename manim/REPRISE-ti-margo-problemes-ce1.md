# REPRISE — Ti Margo, division du CE1 (épisodes 08 → 10), 28/11/2026

Voix VALIDÉES par Frédéric le 28/11 (ne pas les changer sans lui) : `manim/SCRIPTS-ti-margo-problemes.md` (section CE1)
et `manim/voix/margo-pb-ce1-<ep>-{paysage,short}.json`. WAV déjà faits (`public/sons/margo-pb-ce1-*`, Julie débit −6, ignorés par git) ;
instants des mots déjà faits dans `films/margo-pb-ce1-cues.js` et `films/margo-pb-ce1-paysage-cues.js` (séries PROPRES au CE1 :
personne d'autre ne les réécrit ; si une voix change, relancer `python scripts/ti-margo-cues.py margo-pb-ce1[-paysage] <ep>`).
Le CP (01 → 07) a sa propre session et ses propres séries `margo-pb-cp[-paysage]` : ne pas y toucher.
⛔ `ce1_division_partage` est déjà fait avec Idriss : ne pas le refaire.

## Socle (fait par la session mère, ⛔ ne pas modifier)
- Séries : `films/margo-pb-ce1.json/.js` (shorts) et `films/margo-pb-ce1-paysage.json/.js` (paysages) ; `films/margo-commun.js` (relit cp-commun.js).
  Elles relisent cp-entier(-paysage).js, cp-entier2/3-dessins.js, idriss-dessins*.js (lecture seule : formuleE, enfantE, dameE, chatE, poissonE…)
  puis `films/margo-dessins.js` et `films/margo-dessins-ce1.js`.
- `films/margo-dessins.js` (commun CP/CE1, figé) : `finShortE()`, `barreE()` (schéma en barre du coach : le tout en haut, les parts dessous, « ? »),
  `rangeeE()` (n objets en rangée), `rondNombreE()`.
- TES dessins : `films/margo-dessins-ce1.js` (une seule session écrit ici). Tes films : `films/margo-pb-ce1-<ep>.js` et `films/margo-pb-ce1-paysage-<ep>.js`
  (`FILMS['<ep>']=function(outils){…}`). Modèles à recopier : `films/idriss-cp-defi.js` (short) et `films/idriss-paysage-cp-defi.js` (paysage) ;
  y remplacer Idriss par Ti Margo et les décors du port par ceux du script. DUR = durées réelles des WAV.
- Sorties : `manim/sorties/margo-pb/<num>-ce1-<ep>/`.

## Épisodes (bonnes réponses du script)
| N° | Épisode (micro) | Short | Paysage |
|---|---|---|---|
| 08 | groupement (`ce1_division_groupement`) | « Les chaussettes par paires » (B) | « Les croissants du boulanger » (B, A) |
| 09 | reste (`ce1_division_reste`) | « Les cookies des quatre amis » (C) | « Les bouquets de la classe » (B, A) |
| 10 | defi (`ce1_division_defi`) | « Les sandwichs du goûter » (A) | « Les défis du tournoi » (B, B) |

## Règles (Frédéric)
Ti Margo raconte (« je ») ; objets calmes, GRANDS et lisibles, un dessin à chaque question (test d'un enfant de 6 ans) ; compte à rebours `rebours:8`
(barre visible, pause ≈ 8,4 s après la question) ; bonne réponse = celle du script ; ceinture blanche (`ceinture:0`) ; pas de « TU PARIES ? » écrit ;
chaque nombre dit est écrit ; au CE1 le « × » sert à vérifier (« 4 × 6 = 24 »), la voix dit « fois » ; aucun lieu nommé ; fin « eleveai.fr ou YouTube @eleveai974 ».
Paysage : dessiner GRAND, questions ET réponses à x < 480 (la carte est à droite). Short : Ti Margo petit à gauche dès la fin du titre.
`phraseE(txt, ts)` : autant d'instants que de mots. Titres longs des shorts : `#titre{font-size:60px}`.
Planches -ql contrôlées image par image AVANT la HD ; corriger tout défaut mineur (texte serré, chevauchement, coupé).

## ⛔ RAM et HD
UNE SEULE HD à la fois sur tout le poste : verrou `hd-verrou.txt` du dossier de notes partagé
`C:\Users\FRED\AppData\Local\Claude-Data\claude_pzs8sxrjxfjjc\side-session-notes\local_b3fb1aff-2015-48b3-923f-9601de2506e4`.
S'il existe : attendre (Monitor / boucle until, pas de sleep au premier plan). Sinon l'écrire (« ce1 <ep> <heure> »), vérifier RAM libre ≥ 2,5 Go, lancer,
SUPPRIMER le fichier à la fin (même en cas d'échec). Planches -ql en parallèle permises, pas sous 2,5 Go libres.
(La monnaie CE1/CE2 a fini son branchement, bc730f272 : les HD sont permises.)

## Commandes
- Contrôle : `CONTROLE=<dossier> node scripts/ti-margo-short.mjs margo-pb-ce1[-paysage] <ep> controle $(seq 1 2.5 130)` puis
  `python scripts/ti-margo-planche.py <dossier> <planche.png>` (et REGARDER la planche).
- HD (sous le verrou) : `node scripts/ti-margo-short.mjs margo-pb-ce1[-paysage] <ep> film` ; miniature : `... miniature`.
- Miniatures des shorts : gabarit A + « Dessin animé » (`scripts/miniatures-shorts-grille.py`, entrées dans `scripts/miniatures-shorts-grille.json`,
  fichier PARTAGÉ : n'ajouter que tes lignes, relire juste avant d'écrire ; ou appeler `dessine()` en direct comme l'a fait la monnaie CP).

## Branchement (à la fin, comme `b1e565a3b` monnaie CP ; accord déjà donné)
Vignettes webp ; R2 sous `ce1/maths/ti-margo/<num>-ce1-<ep>/` (tailles R2 = locales) ; manifeste `manim/manifeste-youtube.json` : 6 entrées
`margo-pb-ce1-<ep>[-short]` à la fin, YouTube daté 08/09 → 10/09/2027 (après le CP 01/09 → 07/09) (une paire par jour) ;
chapitres et instants des questions depuis les films (`enchainer` + DUR) ; `lib/videos/videos-r2.json` + `bilans-videos.json` (+ ce que b1e565a3b
a touché d'autre) édités PAR CLÉS (⛔ d'autres sessions ont des modifs NON commitées dans ces JSON : relire juste avant, n'ajouter que tes clés,
ne rien perdre, et `git add -p` / commit par chemin sans embarquer leurs lignes) ; coach : `node scripts/brancher-videos-coach.mjs --ecrire --id …`
→ 6 lignes notion_ressources (3 micros ce1_division_groupement/reste/defi, paysage + short). Regarder `git show b1e565a3b` pour la recette exacte.
⛔ Ne JAMAIS lancer `generer-videos-r2.mjs`. ⛔ Ne jamais lancer la lecture d'une vidéo. Commit PAR CHEMIN, JAMAIS de push.

## À 65-70 % de contexte
Mettre à jour « État » ci-dessous, puis lancer une session fille qui reprend (sans demander). Sous-sessions par micro permises
(une fille n'écrit que les fichiers de son épisode ; une seule écrit dans `margo-dessins-ce1.js`).

## État
- [x] Voix validées, WAV, instants, socle (session mère, 28/11).
- [x] 28/11 : `films/margo-dessins-ce1.js` écrit (chaussettes, croissants, boîtes, œufs, élèves, voitures, cookies, cartes, fleurs, sandwichs, chaises, gourdes, filets…).
- [x] 08 groupement : short + paysage écrits, planches -ql regardées et corrigées ; HD lancées sous le verrou (script `hd.sh` du dossier de notes de la session CE1).
- [ ] 09 reste et 10 défi : confiés à deux filles (margo-ce1-reste, margo-ce1-defi ; brief dans le dossier de notes de la session CE1) jusqu'aux HD + miniatures, SANS branchement.
- [ ] Branchement des 6 par la session CE1 : `brancher.py [--ecrire]` (dossier de notes de la session CE1) (manifeste + videos-r2 + bilans par clés ; titres « … — Ti Margo — épisode N · Maths CE1 »,
  notion `division_partage`), puis vignettes, R2 `ce1/maths/ti-margo/`, coach `brancher-videos-coach.mjs --ecrire --id …`, miniatures shorts gabarit A (`dessine()` en direct).
