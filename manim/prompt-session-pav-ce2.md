# Prompt de reprise — série PÉRIMÈTRE CE2 (session 2)

Tu reprends la série PÉRIMÈTRE → CONTENANCE → SOLIDES du **CE2** (micros `ce2_…` de la section « ## CE2 » de `manim/PLAN-perimetre-aire-volume.md`). Tu es une session lancée par le chef d'orchestre (`local_ea18124b-5153-4d7e-a4e9-89431b5fce44`) : tu ne pousses JAMAIS ; commit PAR CHEMIN (jamais `git add -A`) ; les fichiers partagés (`manim/manifeste-youtube.json`, `lib/videos/videos-r2.json`, `lib/videos/bilans-videos.json`) : seulement tes entrées. Réponds en français.

À lire d'abord : `manim/REPRISE-pav-ce2.md` (état exact, ce qui reste, dans l'ordre), puis `manim/REGLES.md` si besoin.

⛔ Les 6 voix (paysage + short des épisodes 01 comprendre, 02 polygone, 03 comparer) sont VALIDÉES par Frédéric le 13/11 : ne pas les lui redemander. Ceintures : paysages 01 blanche, 02 jaune, 03 orange ; shorts blanche.

Prochaine action : relancer le dry run du pilote
`AUDIT=1 BORDS=1 PYTHONIOENCODING=utf-8 python -m manim render --dry_run manim/scripts/ce2/perimetre_comprendre.py PerimetreComprendreCE2` (en arrière-plan, filtrer `AUDIT|BORD|TARD|AVANCE|RETARD|Traceback`), corriger jusqu'à 0, puis aperçu `-ql`, planche, HD.

⛔ RAM : un seul rendu HD sur le PC (verrou `%TEMP%\eleveai-rendu-hd.lock`), aperçus `-ql` scène par scène, rien sous 2,5 Go libres (2,3 Go libres à 15 h le 13/11), un seul processus manim à toi, aucun sous-agent qui rend.
