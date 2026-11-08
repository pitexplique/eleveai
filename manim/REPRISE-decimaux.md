# Reprise — série NOMBRES DÉCIMAUX 6e (état au 07/11/2026)

Notions `decimal_nombre` (6 micros) et `decimal_calcul` (6 micros jouées en 6e) : 12 paysages Manim + 12 shorts en dessin animé Ti Margo 3D, sur le modèle de la série Triangles (`manim/REPRISE-triangles.md`).

## Déroulé décidé
1. Voix des 24 vidéos, validées par Frédéric.
2. UN short et UNE paysage pilotes (épisode 01), contrôlés et montrés. Validation du format.
3. Le reste sans redemander : rendu, contrôle, défauts mineurs, miniatures (« Film d'animation 3D » sur les shorts), manifeste, fiches YouTube, R2, bilans, `COUPE_PAR_VIDEO`, coach après le push.

## État
- Coach vérifié avant les vidéos : `9850db39`, non poussé. Squelettes ≥ 234 par micro, ≤ 3,9 répétitions sur 20 à chaque étoile, avec et sans la réponse, avec `--lettres`. Corrigés : « 1 centimètres », défi ★2 hors notion (disque en 60°), 6 tournures de plus en lire_ecrire ★2, « Compte les virgules ».
- Étape 1 : voix écrites dans `manim/voix/6e-decimal-<slug>[-short].json`, montrées en entier le 07/11, **en attente du oui de Frédéric**. Rien n'est généré ni rendu.
- 07/11 : VOIX VALIDÉES par Frédéric telles quelles (« Oui, enchaîne »). Bascule de session à 71 % de contexte, juste après : **rien n'est encore généré ni rendu**.
- ⏳ RESTE, dans l'ordre :
  1. Générer les 24 voix : pour chaque `manim/voix/6e-decimal-<slug>[-short].json`, `powershell -File scripts/generer-voix.ps1 -Fichier <json> -Debit <d>` (WAV dans `public/sons/6e-decimal-<slug>[-short]/`), puis pour les paysages `powershell -File scripts/marques_dump.ps1 -Fichier <json> -Sortie manim/scripts/6e/decimal_<slug_souligné>_marques.json -Debit <d>` (même débit que la voix). ⚠️ Le débit des triangles n'est pas noté : le retrouver avant (comparer la durée de `public/sons/6e-triangle-nommer/00-garde.wav` à une génération d'essai, ou chercher l'appel dans l'historique de la série Triangles). Shorts : les instants des mots viennent de `python scripts/ti-margo-cues.py decimaux <épisode>`.
  2. Pilotes de l'épisode 01 `lire-ecrire` : paysage `manim/scripts/6e/decimal_lire_ecrire.py` (calquée sur `triangle_nommer.py` : `PaysageProp` de `prop_commun`, `self.dire`, `self.au_mot`, `FinTriangles` ou équivalent pour la fin du 05/11) ; short `films/decimaux.js` (+ `.json`) depuis `_modele`. Contrôles : dry run AUDIT, `verifier-bords-video.py`, planches relues.
  3. Montrer les deux pilotes (aperçu `manim/sorties/apercu-decimaux.html`, port 3900, à l'arrêt) et attendre la validation du FORMAT.
  4. Les 22 autres sans redemander, puis manifeste, fiches YouTube, R2, bilans, `COUPE_PAR_VIDEO` ; coach après le push.
- 07/11 après-midi (session pilotes) :
  - ✅ 24 voix générées (Julie, débit −6, vérifié contre `6e-triangle-nommer/00-garde.wav` : 5,63 s identiques), WAV dans `public/sons/6e-decimal-<slug>[-short]/`, nombres de clips = JSON.
  - ✅ Marques des 12 paysages : `python manim/scripts/6e/decimal_marques.py` (copie de `triangle_marques.py`), 0 mot introuvable.
  - ✅ `manim/scripts/6e/decimal_commun.py` : `VoixDecimale` normalise « 1 virgule 4 » → « 1,4 » dans la voix ET les marques (l'audit compare « 1,4 » à « 1,4 », écrire `self.au_mot("1,4 kilogramme")`) ; `TableauNum` (chiffres hors audit), `barre_unite`, animaux (chaton, lapin, chiot), `balance`, `lena` ; `choix()` pour un choix long (sinon la synchro le découpe en morceaux et la carte d'origine revient à la réponse) ; `poser_frac()` (numérateur puis dénominateur à leurs mots) ; `ligne_au_mot()`.
  - ✅ Paysage pilote `manim/scripts/6e/decimal_lire_ecrire.py` (3 min 44) : 1er rendu relu en planche ; corrigés : entêtes du tableau à taille unique, écran 04 agrandi (deux lignes, « 2,35 kg » dessous), « = 9 dixièmes ! » (07), explication de la question 2 sous le tableau à gauche. Dry run final : 0 AUDIT (sauf « 974 »), 0 BORD. RE-RENDU -qh lancé (media `manim/scripts/6e/media-dec-01`) : copier le mp4 dans `manim/sorties/6e/maths/decimaux/01-lire-ecrire/`, `python scripts/verifier-bords-video.py <mp4>` (le 1er rendu : 0 instant), planche relue.
  - ✅ Short pilote `prototypes/ti-margo/films/decimaux.js` (+ `.json`, `decimaux-cues.js`) : contrôle relu (mots au bon instant, le 5 tombe chez les dixièmes, « vide »), entêtes des cases agrandies, film rendu (74 s, 187 s de rendu) + miniature dans `01-lire-ecrire/`. Reste : planche du mp4 final et `verifier-bords-video.py`.
  - Puis : aperçu `manim/sorties/apercu-decimaux.html` (port 3900, à l'arrêt), montrer à Frédéric, attendre le oui du FORMAT. Committé `03f850eb`.
- 07/11 fin d'après-midi :
  - ✅ Pilotes 01 contrôlés et corrigés (`96e1cb36`) : short, « et 4 millièmes » sur sa ligne (il sortait de l'ardoise) ; paysage, coche plus petite (`PaysageDecimal.coche`, elle touchait « … 9 centièmes »). Paysage : 0 instant au bord, audit propre. ⚠️ `verifier-bords-video.py` sur un short = 100 % d'alertes (décor plein cadre) : planche relue à la place.
  - ✅ **FORMAT VALIDÉ par Frédéric** (« Oui, lance les 22 »). Instants des 12 shorts générés d'un coup (`462634b0`).
  - ⏳ 6 agents lancés (02-03, 04-05, 06-07, 08-09, 10-11, 12), cahier des charges : `side-session-notes/local_1d486d00-…/decimaux-brief-agents.md`. Chacun : scène `decimal_<slug_>.py`, film `films/decimaux-<slug>.js`, rendus, contrôles, commit de ses fichiers. Ils ne touchent ni au manifeste, ni à `lib/videos`, ni à R2.
- 07/11 soir : ✅ **LES 24 VIDÉOS SONT RENDUES**, chacune contrôlée par son agent : audit propre (seul « 974 »), 0 instant au bord pour les paysages, planches relues et défauts corrigés puis re-rendus.
  - Commits, sans push : `71761242` (02-03), `3b020ce9` et `c2999142` (04-05), `01729247`, `f468170c` et `597b2e04` (06-07), `87a27ad0` (08-09), `5d4eb74b` et `c8de2617` (10-11), `3b4af2e3` et `be8e8cdf` (12).
  - Aperçu des 24 : `manim/sorties/apercu-decimaux.html` (port 3900, à l'arrêt).
  - Ceintures des shorts : blanche pour 01, 02 et 05, jaune pour les autres (d'après cette reprise).
  - ✅ (corrigé le 08/11, voir plus bas) Défaut mineur : dans les paysages 02 et 03, les entêtes du petit tableau de « Ce que tu as appris » (6 colonnes) sont petites. À corriger et re-rendre.
  - « Mets » de la fin de chaque short (en secondes depuis le début du film, AVANT d'ajouter les 0,03 s de `COUPE_PAR_VIDEO`) : 02 = 70,33 ; 03 = 72,25 ; 04 = 65,49 ; 05 = 74,87 ; 06 = 65,31 ; 07 = 85,34 ; 08 = 69,81 ; 09 = 77,97 ; 10 = 74,62 ; 11 = 74,05 ; 12 = 65,39. Le 01 reste à mesurer. ⚠️ À vérifier au son de chaque mp4 (la règle dit « mesuré au son »).
  - Les dossiers `manim/scripts/6e/media-dec-NN` ne sont pas suivis par git et peuvent être supprimés.
  - RESTE : corriger les entêtes des paysages 02 et 03, manifeste (`6e-decimal-<slug>[-short]`, `micro_id`, `centres`, `questions`, `pas_avant`), `python scripts/fiches-youtube.py`, R2, bilans, `COUPE_PAR_VIDEO`, puis Frédéric écoute. Coach APRÈS le push. Rien sur YouTube sans son ordre.
- 08/11 matin : ✅ **PASSE FINALE FAITE, commit `2a953103`, sans push.**
  - Paysages 02 et 03 : finale refaite (`PaysageDecimal.finale_haut` : tableau en pleine largeur sous le titre, lignes d'une phrase dessous) ; dans la 03, « 0,7 » et « = 0,70. » sont maintenant à la même taille. Re-rendues en HD, audit propre (seul « 974 »), 0 instant au bord, finale relue à l'image.
  - Miniatures des 12 paysages : `python manim/miniature_decimaux.py` (« COMPRENDRE … EN N MIN », ceinture verte). Vignettes webp faites.
  - Manifeste : `python manim/passe_decimaux.py temps` puis `… manifeste` (24 entrées, `pas_avant` 2026-12-01 provisoire ; temps des chapitres et des questions mesurés dans l'audio des mp4 ; « On vérifie » de la 11 fondu, il durait moins de 10 s). Fiches : `python scripts/fiches-youtube.py 6e-decimal-`.
  - R2 : `.\scripts\r2-videos.ps1 -Rclone "copy manim/sorties/6e/maths/decimaux R2:6e/maths/decimaux --include *.{mp4,png,webp} -q"` (PAS `-Envoyer`, qui enverrait les chantiers des autres) ; `check --one-way` : 84 fichiers identiques. Table R2 et bilans : `node scripts/generer-videos-r2.mjs`, seules nos 24 clés committées.
  - `COUPE_PAR_VIDEO` : paysages 8,4 s (pause après « point f r » de 2,42 à 3,38 s dans le clip de fin) ; shorts = « Mets » mesuré au son de chaque mp4 (corrélation des WAV, score 0,99) + 0,03 s, soit 4,21 à 4,24 s. « Mets » du 01 : 70,25 s.
  - ⏳ RESTE (mis à jour plus bas) : (1) son écoute des 24 ; (2) push, le soir, sur son ordre ; (3) APRÈS le push seulement : `node scripts/brancher-videos-coach.mjs --classe 6e --notion decimal_nombre --ecrire` puis `--notion decimal_calcul` ; (4) YouTube sur son ordre, `pas_avant` à confirmer.
- 08/11 : ✅ **Frédéric a écouté les 24 vidéos : rien à corriger.**
  - ✅ 08/11 matin : **POUSSÉ** (`0df87f6f`), puis coach branché (`brancher-videos-coach.mjs`, écrit en production, aucun fichier) : 10 vidéos pour `decimal_nombre`, 7 pour `decimal_calcul` ; relance à blanc : 0 à brancher ; pages /video en 200.
  - Non branchés : 7 shorts dessin animé dont la micro a déjà un short Manim en ligne (le coach n'en montre qu'un ; les Manim sont gardés) : lire-ecrire, comparer, additionner, multiplier, multiplier-par-01, diviser-par-entier, calcul-defi. Ils restent sur le site (/video/<clé>) et partiront sur YouTube.
  - ⏳ RESTE : YouTube sur son ordre, `pas_avant` (2026-12-01 provisoire) à confirmer.
- Les deux paysages « Tout comprendre » (`6e-decimal-nombre`, `6e-decimal-calcul`) et leurs 4 shorts Manim RESTENT : elles sont en ligne (hv_ZFkFVk00, QFQsyW-CXw8), couvrent la notion entière et servent de révision. La nouvelle série est par micro ; ne pas les refaire.
- `decimal_diviser_par_decimal` : masquée en 6e (hors France, `micros-masquees.ts`), travaillée en 5e (`quotient_decimaux`). Pas de vidéo dans ce lot.

## Noms
Slugs dans l'ordre (dossier `manim/sorties/6e/maths/decimaux/NN-<slug>/`) :
01 `lire-ecrire`, 02 `rang`, 03 `comparer`, 04 `arrondir`, 05 `encadrer`, 06 `defi` (notion `decimal_nombre`) ;
07 `additionner`, 08 `multiplier`, 09 `multiplier-decimaux`, 10 `multiplier-par-01`, 11 `diviser-par-entier`, 12 `calcul-defi` (notion `decimal_calcul`).
Micros : `decimal_lire_ecrire`, `decimal_rang`, `decimal_comparer`, `decimal_arrondir`, `decimal_encadrer`, `decimal_defi`, `decimal_additionner`, `decimal_multiplier`, `decimal_multiplier_decimaux` (banque `programme-trous.bank.ts`), `decimal_multiplier_par_01`, `decimal_diviser_par_entier`, `decimal_calcul_defi`.
Préfixe des voix et du manifeste : `6e-decimal-<slug>[-short]`. Série Ti Margo : `films/decimaux.js` + `films/decimaux-<épisode>.js`.

## Décors et centres d'intérêt
| Ép. | Paysage (métier) | Short (gag Ti Margo) | Centres |
|---|---|---|---|
| 01 lire-ecrire | Léna, vétérinaire | dictée : 3,5 au lieu de 3,05 ; commentaire : 4,004 | animaux |
| 02 rang | Malik, chronométreur d'athlétisme | coffre-fort, code 7-6-2 ; commentaire : 4-1-5 | sport, jeux-defis |
| 03 comparer | Sofia, biologiste marine (tortues) | 3 bouteilles de jus ; commentaire : 2,03 < 2,3 < 2,33 | animaux-marins |
| 04 arrondir | Sami, météorologue | gâteau arrondi deux fois ; commentaire : 7 | meteo-climat, cuisine |
| 05 encadrer | Lina, pilote de robot sur Mars | loupe entre 4,7 et 4,8 ; commentaire : 9 | espace |
| 06 defi | Tom, créateur d'escape games | étiquettes 3, 7, 2 ; commentaire : 14,7 | jeux-defis |
| 07 additionner | Romain, boulanger | monnaie de 5 € ; commentaire : 3,60 € | cuisine, argent-budget |
| 08 multiplier | Lucas, jardinier paysagiste | 4 glaces à 60 € ; commentaire : 7,2 € | nature-ecologie |
| 09 multiplier-decimaux | Anaïs, carreleuse | pizza carrée 0,5 × 0,5 ; commentaire : 0,2 | construction, cuisine |
| 10 multiplier-par-01 | Kenzo, maquettiste de cinéma | machine à rétrécir, dinosaure ; commentaire : 0,25 m | cinema-series, dinosaures |
| 11 diviser-par-entier | Yasmine, régisseuse de concerts | 10 € entre 4 copains ; commentaire : 1,75 € | musique, argent-budget |
| 12 calcul-defi | Inès, vendeuse de jeux vidéo | soldes − 25 % ; commentaire : 40,50 € | jeux-video, argent-budget |

6 filles, 6 garçons. 0 sur 24 à La Réunion.
Ceintures : paysages vertes ; shorts 01, 02, 05 blancs (tout se voit) ; les autres jaunes (une règle ou un calcul).

## Choix à garder
- La valeur des chiffres AVANT le raccourci de la virgule (× 10, × 100, × 0,1, ÷ 10, ÷ 100) ; jamais « ajouter un zéro » pour × 10 (le zéro à la fin n'apparaît que pour écrire 0,7 = 0,70).
- À l'écran : « × » et « ÷ » ; la voix dit « fois » et « divisé par ». Les fractions 7/10, 25/10, 34/100, 125/100 ne figurent qu'en lire-ecrire (objet d'étude).
- Les choix de comparaison sont écrits en mots (« 12,13 est plus petit »), pas avec < > seuls : la voix dit les mots.
- Pas de choix A / B / C qui soit lui-même une lettre de point.
- Les shorts commencent par Ti Margo (« Salut ! … Tu paries ? »), il se trompe, l'élève le corrige ; question-pause de 3 s ; question chiffrée en commentaire ; phrase de fin du 05/11.
- Le défi ★2 du coach (4,9 × 2 plus proche de 10) est repris dans la paysage 12 : coach et vidéo disent la même chose.
