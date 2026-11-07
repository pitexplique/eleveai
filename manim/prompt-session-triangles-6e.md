# Reprise de la série TRIANGLES 6e, passe finale (bascule du 07/11/2026)

Réponds en français. Série : notions `triangle_figure` et `triangle_propriete`, 9 micros, 18 vidéos. Frédéric a validé les voix et le format : **enchaîne sans redemander**.

## Où on en est
Lis `manim/REPRISE-triangles.md` : la ligne « ⏳ RESTE » donne les étapes dans l'ordre, avec les commandes et les moments à contrôler. Les 18 vidéos sont rendues, le manifeste a ses 18 entrées. Durées, chapitres et écarts écran/voix : `manim/rapports-triangles.md`.

Avant d'agir, vérifie que les re-rendus de la session précédente sont finis : les paysages 03, 08, 09 et les shorts 05, 07 doivent porter une heure de fichier récente et aucun `_muet.mp4` ne doit rester (`Get-Process python` si un doute subsiste). Ne relance pas ce qui est fait.

## Outils
- `python manim/scripts/6e/planche_video.py <mp4> <sortie.png> <colonnes> <largeur> <pas_s>` : une planche d'une vidéo.
- `python manim/scripts/6e/bords_short.py <mp4>` : les marges d'un short sur décor clair.
- Audit d'une paysage : `AUDIT=1 BORDS=1 python -m manim render --dry_run --disable_caching manim/scripts/6e/triangle_<slug>.py <Classe>` ; lire la sortie avec `tr '\r' '\n'`, sans les lignes `Animation`. Les deux AUDIT-ABSENT « 6 » et « 974 » sont attendus.
- Rendu : voir l'en-tête de `manim/scripts/6e/triangle_nommer.py`. Au moins 2 Go libres avant chaque rendu HD.
- Dossier des sorties : `manim/sorties/6e/maths/triangles/NN-<slug>/`. Aperçu de Frédéric : `manim/sorties/apercu-triangles.html`, port 3900 : ajoute-y les 16 autres, à l'arrêt, sans autoplay.

## Contraintes
- Ne lance jamais la lecture d'une vidéo.
- Corrige toujours les défauts mineurs et re-rends.
- Commit PAR CHEMIN, seulement tes fichiers, sans pousser : le push se fait le soir à sa demande.
- `manim/manifeste-youtube.json` et `lib/videos/*` contiennent des modifications non commitées d'autres sessions : ne les commite pas avec les tiennes (précédent : `5f47c747`, et le commit `Relatifs 4e : passe finale`). Ne réécris jamais le manifeste en entier.
- Rien sur YouTube sans son ordre. Le `pas_avant` 2026-12-01 est provisoire : il l'empêche de partir dans le lot quotidien.
- Autres sessions dans ce dossier : ne touche pas à leurs fichiers ; jamais de stash, reset ou changement de branche.
- Tiens à jour `manim/REPRISE-triangles.md` et la mémoire `serie-triangles-6e`.

## Terminé quand
Les 18 vidéos sont contrôlées, sur R2 et au coach, et le rapport final liste les décisions et ce qui reste à écouter (liste « Rapport final » de la reprise).
