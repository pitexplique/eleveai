Prompt — série FRACTIONS, suite (après le 24/10/2026 soir)

Colle ceci dans une nouvelle session :

---

Réponds toujours en français. Ne me pose pas de questions : tranche, avance, et liste tes choix à la fin. Occupe-toi UNIQUEMENT des fractions (pas de STMG, pas des autres sessions).

**Règles** :
- Committe PAR CHEMIN : jamais `git add -A`, jamais `manim/scripts/*/media-*` ni `mb*`. Ne committe pas `lib/fiches-exercices/chargeurs.ts` ni `registre.ts` (modifiés par une autre session).
- Pas de push sans mon signal (1 à 2 fois par jour). La story Instagram n'est jamais poussée.
- Ne lance jamais la lecture d'une vidéo. La qualité passe avant tout.
- Change de session à 60 % de contexte (mémoire `changer-de-session-a-65-pourcent.md`).

## Où on en est
Lis la mémoire `serie-fractions-cm1-terminale.md` (ses erreurs : SIMPLIFIER, puis fraction → DÉCIMAL → POURCENTAGE ; contextes et centres ; ses énigmes du gâteau).
- Coach fractions 6e (fraction_nombre, fraction_calcul, pourcentage_nombre) et 4e (fraction_nombre, fraction_calcul) : TOUT VERT au seuil des squelettes.
- Nouvelle micro 6e `fraction_egale` « Fractions égales, simplifier » : commit `835a6802` (coach, correcteurs, fiche de cours, exercice 9 de la feuille).
- Feuilles d'exercices des 5 notions : existent (20 exercices corrigés chacune).
- Consigne vidéo : `manim/consigne-videos-fractions.md` (numérotation 6e 01-13, 4e 01-12, sorties `manim/sorties/<classe>/maths/fractions/`). Questions et centres à recopier au fil des rapports dans `manim/questions-fractions.md`.
- PILOTE : 6e 03-egale + module commun `manim/canvas_fractions.py` → état ci-dessous.

✅ PILOTE FINI (24/10 soir) : `manim/sorties/6e/maths/fractions/03-egale/` paysage 5:36 (verte) + short 1:02 (blanc), bords 0 instants, dry run sans RETARD. Module `manim/canvas_fractions.py` (API dans l'en-tête) + bases de scène `manim/scripts/6e/frac_commun.py` (`PaysageFrac` / `ShortFrac`, question_pause avec `avant_q`, fractions écrites `sans_synchro` à montrer au mot par `au_mot`). Scripts `frac_egale.py` / `frac_egale_short.py` = LE MODÈLE des lots. Questions/centres déjà dans `manim/questions-fractions.md`.
⚠️ `frac_commun.py` importe `manim/scripts/stmg/stats_lycee_j2_commun.py`, fichier de la session STMG NON COMMITTÉ : ne le committe pas toi-même ; vérifie qu'il est commité (par la session STMG) avant tout push des fractions, sinon les scripts fractions ne se rendent pas sur un autre poste.
⚠️ Les outils de calage mot à mot (`marques_dump.ps1`, `cues2marques.py`) sont dans un scratchpad, pas dans le dépôt : cherche-les (`find C:/Users/FRED/AppData/Local/Temp/claude -name cues2marques.py`) et range-les dans `scripts/` au début de la session.
Points à améliorer dans les lots : lignes de réponse qui arrivent 1 à 3 s après leur premier nombre (viser 0,4 s), étiquettes de flèches trop proches ; paysage un peu longue (5:36) — rester ≤ 5 min si possible.

## État au 25/10 après-midi
- ✅ VIDÉOS 6e COMPLÈTES (13 épisodes, 22 vidéos neuves) et 4e COMPLÈTES (12 épisodes, 24 vidéos), toutes commitées (dernier : `fd535325`) ; bords 0 instants partout ; questions et centres de TOUTES dans `manim/questions-fractions.md`.
- ✅ PASSE FINALE FAITE (`a5aee451`) : 46 entrées au manifeste, miniatures + fiche-youtube.md à côté des mp4, R2 envoyé, table R2 (1 156), 46 vidéos branchées au coach. Reste : publier sur YouTube (playlists Cycle 4 + CRPE à cocher à la main), puis la 5e, CM1-CM2, 3e, lycée.
- Chiffres de 6e 13 (USGS) et du short 4e 05 (steak) : confirmés par Frédéric le 25/10.
- PUSH : Frédéric pousse le soir du 25/10 (vérifier la story avant).

## À faire, dans l'ordre
1. Pour chaque lot non commité : vérifier ce qui existe (`manim/sorties/{6e,4e}/maths/fractions/*/`), `python scripts/verifier-bords-video.py <mp4>` → 0 instants, planche PyAV de 12 images sur 1 ou 2 vidéos par lot (écrans chargés : questions, corrections, « Ce que tu as appris » titre en haut et centré, étiquettes jamais collées). Les `questions`/`centres` sont dans les en-têtes des scripts et dans les voix : les recopier dans `manim/questions-fractions.md`. Committer par chemin (scripts `frac_*`, `*_marques.json`, voix `manim/voix/<classe>-frac-*.json` ; jamais `media-*`, jamais les `*.cues.tsv`).
2. Relancer UN agent par lot interrompu (4e D, 4e F) en lui donnant l'état ci-dessus, puis le lot 4e E (06 à 09) avec la consigne et les modèles ci-dessus ; 3 agents au plus.
3. Passe finale quand la 6e est complète (puis la 4e) : miniatures (`manim/miniature_essai_v2.py`, `manim/miniature_short_expression.py`) et entrées du manifeste `manim/manifeste-youtube.json` (ids `<classe>-frac-<slug>[-short]`, `microId`, `notionId`, `questions`, `centres`, chapitres mesurés par dry run — imiter les entrées stats), puis `python scripts/fiches-youtube.py -frac-`, R2 (`powershell -NoProfile -ExecutionPolicy Bypass -File scripts/r2-videos.ps1 -Envoyer > log 2>&1` lancé depuis Bash), `node scripts/generer-videos-r2.mjs`, `node scripts/brancher-videos-coach.mjs --id <ids> --ecrire`, commit par chemin. Push seulement sur mon signal.
4. Mettre à jour la mémoire `serie-fractions-cm1-terminale.md` à chaque étape.

## Plus tard
Après la 6e et la 4e : 5e, puis CM1-CM2, 3e et lycée (fractions_rationnel 3e, rappels au lycée). Puis la proportionnalité.
