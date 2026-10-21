# Prompt — nouvelle session : STATISTIQUES cycle 4 (5e, 4e, 3e)

Lance la série STATISTIQUES du cycle 4 (5e, 4e, 3e), comme le cycle 3 qui est FINI et poussé le 21/10 (`780acff2` coach, `4918f0f9` feuilles CM, `1ab75d14` vidéos).

Lis d'abord : `manim/prompt-statistiques.md`, `manim/REGLES.md`, `manim/consigne-videos-stats-cycle3.md` (la consigne qui a marché, avec l'API de `manim/canvas_stats.py`), la mémoire « serie-statistiques-prochaine-notion », « varier-les-contextes-de-vie », « hub-robustesse-du-coach ».

Ordre de travail, une classe après l'autre (5e → 4e → 3e), sans me poser de questions : tranche, avance, liste tes choix à la fin.
1. COACH ROBUSTE d'abord : mesure les squelettes (`npx --yes tsx@4 scripts/mesurer-squelettes-coach.ts <classe> <notion>`, UNE classe par appel), seuil ≥ 30 squelettes et ≤ 4 répétitions sur 20 à chaque étoile ; répare (générateurs, pas des pools), lecture sur axe gradué, canvas `stat_graph` (courbe, histogramme, camembert `valeursParts`/`pourcentages`, boîte à moustaches en 3e si la micro la demande). tsc 0 erreur.
2. FEUILLES D'EXERCICES : celles de 5e/4e/3e en stats existent déjà ou non (vérifie `lib/fiches-exercices/registre.ts`) ; crée les manquantes (20 exercices corrigés, vérificateur indépendant `scripts/verifier-exercices-*.mjs`, registre + chargeurs), sur le modèle `maths-cm2-graphique.tsx`.
3. VIDÉOS : une paysage + un short par micro de stats, agents en parallèle (au plus 3 rendus à la fois), en réutilisant `manim/canvas_stats.py` SANS le modifier (sous-classes locales). Un domaine et un MÉTIER différents par épisode, filles et garçons, VRAIES données (INSEE, Météo-France, sport, musique, santé…), voix débit −10, voix = écrit, ceinture sur chaque vidéo, fin « Entraîne-toi sur éleveai point f r. Et abonne-toi ! », short = question en commentaire. Vérifie TOI-MÊME une planche PyAV par lot (ne jamais lire une vidéo) et renvoie les défauts.
4. PASSE FINALE unique : miniatures (`manim/miniature_essai_v2.py`, `manim/miniature_short_expression.py`) → manifeste → `python scripts/vignettes-videos.py` → `scripts/r2-videos.ps1 -Envoyer` (lancé via Bash `powershell -File`, PAS avec `2>&1` en PowerShell : l'envoi échoue) → `node scripts/generer-videos-r2.mjs` → `node scripts/brancher-videos-coach.mjs --id <tes ids> --ecrire` (seulement TES vidéos) → commit PAR CHEMIN (jamais les dossiers `manim/scripts/*/media-*`, ni les fichiers des autres sessions).

⛔ Pas de push sans mon signal (2 à 3 par jour max) ; avant tout push : `git log origin/main..HEAD --stat`, jamais la story Instagram. Toujours répondre en français.
