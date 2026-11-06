# Reprise — série ANGLES 6e (état au 05/11/2026)

Brief des agents de rendu : `manim/brief-agent-angles.md` (décors, dessins par épisode, mémoire, noms). Rapports : `manim/rapports-angles.md`.

## État
- Coach `angle_mesure` au vert : commit `a342c05f` (non poussé). Figures nouvelles vérifiées par les correcteurs, pas regardées dans le navigateur.
- Voix : 12 fichiers `manim/voix/6e-angle-<slug>[-short].json`, VALIDÉES par Frédéric le 05/11.
- Les 12 vidéos (épisodes 01 à 06) : FINIES et contrôlées par la session sur planches et images zoomées, dans `manim/sorties/6e/maths/angles/NN-<slug>/`. Aucune écoutée ni lue en continu.
- Décidé : défi du 04 sans rapporteur retourné (on lit la rangée dont le 0 est à gauche) ; retard de 0,31 s sur « Elle dessine » (05) gardé, sous le seuil de 0,4 s.

## Passe finale (06/11/2026)
- Poussé (`4ec5a03b`), en ligne, 12 lignes branchées au coach (`--classe 6e --notion angle_mesure`).
- Faits : 12 miniatures (`manim/miniature_angles.py`), 12 entrées au manifeste (`6e-angle-<slug>[-short]`), fiches YouTube, vignettes, 36 fichiers sur R2, table R2, bilans.
- Chapitres : retirés quand ils duraient moins de 10 s (YouTube les désactive tous sinon).

## Reste à faire
1. Frédéric écoute les voix (lettres « A O B », « R S T ») et regarde les vidéos.
2. YouTube : pas demandé (paysage AVANT son short).

## Prompt type d'un agent
> Lis et applique `manim/brief-agent-angles.md` (« corrige toujours les défauts mineurs », mémoire). Lis la section du pilote dans `manim/rapports-angles.md` (API et leçons). Modèles finis : `manim/scripts/6e/angle_reconnaitre.py` et `angle_reconnaitre_short.py`.
> Tes vidéos : épisode NN, slug `<slug>`. PAYSAGE `Angle<Slug>6e`, puis SHORT `Angle<Slug>Short`, toute la chaîne du brief. Rapport court à la fin.
