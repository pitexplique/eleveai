# Reprise : série ÉQUATIONS 4e (05/11/2026)

À lire d'abord : `manim/brief-agent-equations.md` (noms, ceintures, dessins, 2 places de rendu HD, jamais sous 2 Go libres). Rapports des agents : `manim/rapports-equations.md`.

## Fait
- Coach au vert, committé `ec481245` : 0 question open, 0 contexte à ★1-★2, squelettes et correcteurs justes.
- 14 voix VALIDÉES par Frédéric le 05/11, committées `2249911b` (`manim/voix/4e-equation-*.json`). Ne pas les changer.
- Pilote lancé : épisode 01 `reconnaitre` + module `manim/scripts/4e/equation_commun.py`. Fini = section dans `manim/rapports-equations.md` + 2 mp4 dans `manim/sorties/4e/maths/equations/01-reconnaitre/` + places de rendu libres. Si plus aucun fichier ne bouge pendant 30 min, l'agent est figé : relancer depuis ses scripts.

## Reste
1. Épisodes 02 à 07 : un agent neuf par épisode, 2 à la fois au plus, prompt : « Lis et applique `manim/brief-agent-equations.md`. Tu es l'agent de l'épisode NN, slug `<slug>`. Module `manim/scripts/4e/equation_commun.py` en lecture seule. PAYSAGE, puis SHORT, jusqu'au bout de l'ordre obligatoire. Ne committe rien. Message final : 10 lignes au plus. »
2. Relecture des planches par un agent neuf (défauts mineurs à corriger et re-rendre).
3. Aperçu port 3900 : `manim/sorties/apercu.html`, la DERNIÈRE vidéo seulement, ouverte EN PAUSE.
4. Commit PAR CHEMIN (scripts + `_marques.json` + rapports + ce fichier ; ni `.cues.tsv`, ni `media-eq-*`, ni mp4, ni WAV). Pas de push : il se propose le soir.
5. Passe finale, après ces rendus : miniatures, manifeste (⛔ jamais réécrit en entier : modifs d'autres sessions), R2, coach, bilans.

## En attente de Frédéric
- `equation_probleme` : le manifeste ne le couvre que par un short de SECONDE (même identifiant). Écrire une paysage + un short 4e ? Pas de réponse pour l'instant ; rien d'écrit.
- Ne pas toucher : `manim/scripts/4e/puissance_*`, `manim/rapports-puissances.md`, banques 4e `divisibilite`, `factorisation`, `fractions`, `operations-relatifs`, `probabilites`.
