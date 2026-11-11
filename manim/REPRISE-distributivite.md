# Reprise : série DISTRIBUTIVITÉ 4e (10/11/2026)

Notion du coach `litteral_distributivite` (banque `lib/tutor-v4/questionBank/4e/maths/distributivite.bank.ts`), 5 micros, une paysage Manim et un short MANIM par micro (la 4e n'a pas de dessin animé) : **10 vidéos**. Pas de paysage « toute la notion » : `4e-litteral-developper` (paysage déjà en ligne, `manim/sorties/4e/maths/paysage/fr/litteral-developper/`) joue ce rôle. Ne pas reprendre ses exemples : le rectangle (x + 2)(x + 3), (x + 3)², (x − 5)(x + 5), 21 × 19.
La factorisation vient APRÈS, dans une autre session.

Modèle : la série Équations 4e (`manim/REPRISE-equations.md`, `manim/brief-agent-equations.md`) et le déroulé de `manim/prompt-session-divisibilite-4e.md` (rendu, R2, manifeste, coach). Règles : `manim/REGLES.md`.

## Fait
- Coach vérifié et corrigé, commit `9d36547e` (pas poussé) : squelettes 5/5 au vert (aussi `--lettres`), 39 gabarits justes sur 500 tirages, 7 972 développements recalculés sans écart, 0 question open, 0 % de contexte à ★1-★2. 3 situations de `simple` passent de ★2 à ★3 ; « reconnaître » ne recopie plus la liste dans l'énoncé ; correcteur adapté.
- **Frédéric a VALIDÉ la voix du pilote 01 le 10/11 (« Oui, lance le pilote »).**
- Voix 01 : `manim/voix/4e-distrib-simple.json` et `…-short.json` ; WAV générés dans `public/sons/4e-distrib-simple[-short]/` (débit −6).
- Marques : `manim/scripts/4e/distrib_simple_marques.json` et `distrib_simple_short_marques.json`.
- Scène paysage écrite, JAMAIS LANCÉE : `manim/scripts/4e/distrib_simple.py` (`DistribSimple4e(PaysageRel)`, importe `Bloc`, `Barre`, `BLEU_BLOC` de `equation_resoudre_distributivite.py`). Code couleur : x bleu, le nombre qui se distribue et ses flèches orange (`FACTEUR`), juste vert, piège rouge, petites planches couleur bois.

## État au 10/11 soir (3e session) : PILOTES 01 RENDUS
- Paysage 01 : `manim/sorties/4e/maths/distributivite/01-simple/eleveai-maths-4e-distrib-simple.mp4`, 1920 × 1080, 4 min 15, audit propre, 0 bord, planches relues en entier. Questions à 01:34 (C) et 02:53 (B).
- Short 01 « Le calcul éclair » : `manim/scripts/4e/distrib_simple_short.py` (commit `c147753e`), sortie `…/01-simple/eleveai-maths-4e-distrib-simple-short.mp4`, 1080 × 1920, 1 min 15, 0 bord. Question à 00:29 (A). Les 3 lignes de réponse : cartes laissées à 85 % (sinon la dernière descend sur Ti-Margo).
- Les deux sont dans l'aperçu (`manim/sorties/apercu.html`, port 3900). **On attend le oui de Frédéric sur le FORMAT** avant d'écrire les voix 02 à 05.

## État au 10/11, 17 h 20 : format VALIDÉ, voix 02-05 VALIDÉES
- Frédéric a validé le format des pilotes 01 (« Oui, continue ») puis les 8 voix 02-05 (« Oui, lance tout »). Voix + marques committées (`b62ba56b`), WAV générés.
- 4 agents lancés en parallèle (un par épisode 02, 03, 04, 05), brief commun : `side-session-notes/local_06503db4-…/brief-agents-distributivite-02-05.md`. Chacun écrit `manim/scripts/4e/distrib_<slug>.py` + `distrib_<slug>_short.py`, rend en HD dans `manim/sorties/4e/maths/distributivite/NN-<slug>/`, committe ses 2 scripts.
- Si une session reprend : vérifier pour chaque épisode la présence des 2 mp4 et des 2 scripts committés ; relancer seulement ce qui manque, avec le même brief.

## État au 10/11, 18 h 30 : LES 10 VIDÉOS SONT RENDUES
| NN | paysage | short | commit scripts | questions (paysage ; short) |
|---|---|---|---|---|
| 01 simple | 4 min 15 | 1 min 15 « Le calcul éclair » | `a759d13d`, `c147753e` | 01:34 C, 02:53 B ; 00:29 A |
| 02 double | 4 min 07 | 1 min 22 « Les 4 morceaux » | `1fd70775` | 01:26 B, 02:42 C ; 00:30 C |
| 03 reduire | 3 min 39 | 1 min 11 « Le tri des chaussettes » | `9531b3e2` | 00:58 A, 02:12 B ; 00:25 A |
| 04 reconnaitre | 3 min 38 | 1 min 12 « Le caissier du cinéma » | `8e5ed4f3` | 01:16 C, 02:14 A ; 00:30 C |
| 05 defi | 4 min 00 | 1 min 25 « Le prix rond » | `06439ccd` | 00:48 A, 01:58 B ; 00:30 C |
Toutes : audit propre, `verifier-bords-video.py` = 0, planches HD relues par la session chef (10/11). mp4 dans `manim/sorties/4e/maths/distributivite/NN-slug/` (dossier ignoré par git). Aperçu des 8 dernières : `manim/sorties/apercu-distributivite.html` (port 3900) — ⛔ ne PAS écraser `apercu.html`, partagé avec d'autres sessions.
Piège noté par l'agent 03 : dans `_plan_eq` (equation_commun.py), deux atomes NON DITS consécutifs → le premier disparaît sans alerte d'audit (« 2e » : « 2 » puis « e »). Contourné dans `distrib_reduire.py`, module commun non modifié.

## PASSE FINALE FAITE le 10/11 soir (commit `40b27a2b`, pas poussé)
- Miniatures : `python manim/miniature_distributivite.py` → 5 paysages « COMPRENDRE … » + « EN 4 MIN » (durée lue dans le mp4) et 5 shorts Manim (badge « DISTRIBUTIVITÉ · 4E », ceinture du short), regardées une à une. Vignettes webp par `scripts/vignettes-videos.py`.
- `publication.md` (`Validé : non`, paysage + short, question en commentaire et réponse) et `fiche-youtube.md` (`python scripts/fiches-youtube.py 4e-distrib-`) dans chaque dossier `NN-slug/` (ignorés par git).
- `python manim/passe_distributivite.py temps` (corrélation audio des clips dans chaque mp4, `…/distributivite/temps.json`), puis `manifeste` : 10 entrées `4e-distrib-*`, `pas_avant: 2026-12-01`, `microId` rempli partout (`litteral_distributivite_<slug>`), shorts `renvoie_vers` leur paysage. Chapitres « Écrire le calcul » et « D'abord développer » (03, moins de 10 s) réunis ; le script refuse désormais un chapitre de moins de 10 s. Questions mesurées : 01 01:34, 02:53 ; 02 01:27, 02:43 ; 03 00:59, 02:13 ; 04 01:17, 02:14 ; 05 00:48, 01:58 ; shorts 00:30, 00:31, 00:26, 00:31, 00:30.
- Manifeste, `lib/videos/videos-r2.json` et `bilans-videos.json` committés en HEAD + nos 10 entrées (la copie de travail de `videos-r2.json` garde les ajouts non commités des autres sessions).
- `COUPE_PAR_VIDEO` (`python manim/passe_distributivite.py coupes`) : paysages 7,0 s (milieu du silence entre « point f r. » et « Et si », vérifié au son), shorts 3,72 à 3,74 s (« Mets » + 0,03 s).
- Métiers : `V` sur vendeur et menuisier (phrase du menuisier alignée sur la vidéo), photographe, maître-nageur, cuisinier ajoutés avec `V` ; `scripts/verifier-metiers.ts` vert, `tsc` sans erreur sur ces fichiers.
- R2 : `r2-videos.ps1 -Rclone "copy manim/sorties/4e/maths/distributivite R2:4e/maths/distributivite --include *.{mp4,png,jpg,webp}"`, `check --size-only` : 0 différence, 30 fichiers.

## FAIT le 11/11
- Push de `main` (`b81690a5..9784f82a`), déploiement Vercel réussi : les 10 pages `/video/4e-distrib-*` répondent 200.
- `brancher-videos-coach.mjs --ecrire` : 10 vidéos branchées au coach (micros `litteral_distributivite_*`).

## RESTE (sur l'ordre de Frédéric)
1. ✅ YouTube programmé le 11/11, AVANCÉ à sa demande (« dans un mois ? ») : `pas_avant` + `prioritaire`, 01 le 14/11, 02 le 18/11, 03 le 19/11, 04 le 20/11, 05 le 22/11 (avant les équations 4e du 24/11). Ces créneaux étaient ceux des puissances seconde/3e/1re, reportées du 09/12 au 14/12. L'envoi auto (12 h 30, 5 vidéos/jour) les envoie la veille, paysage avant son short.
2. Titres YouTube des shorts (écrits par les agents) et ligne « Voix de synthèse. » à faire relire.

## Reste, dans l'ordre
1. ~~Paysage 01 et short 01~~ FAITS (voir plus haut). Ancienne consigne, pour mémoire : paysage 01 : `AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/distrib_simple.py DistribSimple4e --media_dir manim/scripts/4e/media-dist-01-audit` (0 AUDIT-AVANCE, 0 RETARD, 0 BORD ; filtrer `tr '\r' '\n' | grep -E "AUDIT-AVANCE|RETARD|BORD|Error|Traceback"`). Points à surveiller : la pose au mot de « 3(x + 4) » sur « 3 fois, entre parenthèses, x plus 4 », `dire_eq(r2, "12. En")` dans `ecran_ranger` (à vérifier), l'écran 02-05 qui garde les planches d'un écran à l'autre, `Indicate` sur des objets REMPLIS (le brief Équations l'interdit : il remplit de vert) → remplacer par un `insister`/`Circumscribe` si ça cache le texte.
   Puis brouillon `-ql` et planche regardée (poses ET instants d'animation), UN rendu `-qh --disable_caching --media_dir manim/scripts/4e/media-dist-01`, copie vers `manim/sorties/4e/maths/distributivite/01-simple/eleveai-maths-4e-distrib-simple.mp4`, `python scripts/verifier-bords-video.py` = 0, planche finale, supprimer `media-dist-01*`.
2. Short 01 à écrire : `manim/scripts/4e/distrib_simple_short.py`, modèle `equation_probleme_short.py` (classe `(_OutilsProbleme, _OutilsDefi, ShortEq)`, `entete_short(…, "jaune")`, `margo_bas`, `question_pause` 3 s, `appel_commentaire`, et COPIER sa méthode `fin_05_11` : fin du 05/11 « Un pouce · La cloche »). Rendu `-r 1080,1920`. Visuel prévu : grille de 7 × 13 points coupée en 10 (bleu) | 3 (orange) ; 7 × 10 = 70, 7 × 3 = 21, 70 + 21 = 91 ; 7(10 + 3) = 7 × 10 + 7 × 3. Question : 7(x + 3), bonne réponse A (7x + 21). Question en commentaire : 8 × 12 (réponse 96). Titre proposé : « Le calcul éclair ».
3. Montrer les deux pilotes à Frédéric (aperçu `manim/sorties/apercu.html`, port 3900, SANS lancer la lecture) et attendre son oui sur le FORMAT.
4. Voix des épisodes 02 à 05 (paysage + short), à lui coller en entier avant de générer.
5. Puis rendu des 8 autres, passe finale (miniatures, manifeste en AJOUT depuis HEAD, `fiches-youtube.py`, R2 par `rclone copy` du seul dossier `distributivite`, `COUPE_PAR_VIDEO` = « Mets » + 0,03 s pour chaque short dans `components/LecteurVideo.tsx`), coach (`brancher-videos-coach.mjs --ecrire` APRÈS le push du soir, sur son ordre), mémoire `serie-distributivite-4e.md`.
6. Métiers : marquer `V` dans `lib/matrice/metiers-college.ts` (`litteral_distributivite` : vendeur, menuisier) et ajouter les lignes des métiers nouveaux (photographe, maître-nageur, cuisinier) avec `V`.

## Épisodes (choisis le 10/11)
| NN | slug | micro | ceinture paysage | ceinture short | domaine, métier | QCM (paysage ; short) |
|---|---|---|---|---|---|---|
| 01 | simple | litteral_distributivite_simple | jaune | jaune | construction : Lucas, menuisier | C, B ; A |
| 02 | double | litteral_distributivite_double | orange | orange | photo : une photographe, photo x + 4 par x + 2 dans son passe-partout ; (x − 2)(x + 5) ; (x + 3)² comme (x + 3)(x + 3), sans formule | B, C ; C |
| 03 | reduire | litteral_distributivite_reduire | orange | orange | natation : une maître-nageuse, 3 séries de x + 4 longueurs + 5 ; 2(x + 3) + 4(x − 1) ; le moins devant 3(x − 1) | A, B ; A |
| 04 | reconnaitre | litteral_distributivite_reconnaitre | jaune | jaune | cuisine : un cuisinier de cantine, 4(x + 2) produit / 4x + 8 somme, la dernière opération | C, A ; C |
| 05 | defi | litteral_distributivite_defi | verte | orange | commerce : une vendeuse, 4 × 2,99 = 4 × 3 − 4 × 0,01 ; erreurs d'élèves ; modéliser k1(x + b) + k2(x + d) | A, B ; C |
Bonne réponse tirée au hasard (5 A, 4 B, 5 C) ; aucun contexte réunionnais dans la série.

## Ne pas toucher
Les scripts des autres séries (`equation_*`, `relatif_*`, `div_*`, `puissance_*`) : on les importe, on ne les modifie pas. Manifeste et `lib/videos/*.json` : ajouter des entrées depuis HEAD, jamais réécrire. Pas de push, pas de YouTube sans son ordre. Commit PAR CHEMIN.
