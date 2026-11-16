# Reprise : série DURÉES du CP à la 6e (session B de mardi-mercredi 17-18/11)

Prompt : `docs/prompt-serie-durees-cm1-6e.md` (étendue CP → 6e le 16/11). Plan : `manim/PLAN-mardi-mercredi-17-18-11.md`, session B.
Inventaire VALIDÉ par Frédéric le 16/11 (« Oui, continue » ; « donc programme durée du CP à la 6e ») : `manim/INVENTAIRE-durees-cp-6e.md`.
36 micros → 32 paysages + 31 shorts à tourner. `aussi` : CE2 lire → CM1 `duree_lire` ; CE2 placer → CM1 + CM2 `duree_positionner_aiguilles` ; 5e `conversion-duree` → 6e `duree_convertir` (paysage ; à revoir à l'œil).
Rien n'est poussé.

## Outils
Notes et outils : `side-session-notes/local_9cbb7607-cba7-48c1-a984-bb5d28d2f97c/durees/` (= `ND`)
- `ND/CONSIGNE-voix-durees.md` : règles des voix, nommage des 63 fichiers, métiers + prénoms imposés (16 filles / 16 garçons), lettres justes imposées.
- `ND/lettres.py` (graine 1116) → `ND/lettres.txt` : 32 A, 32 B, 31 C ; jamais deux fois la même lettre dans une paysage.
- `ND/recap.py` → `manim/voix/RECAP-durees-cp-6e.md` (toutes les voix dans UN fichier, pour la validation).
- Commun CP → 6e : `manim/scripts/cp/duree_commun.py` (horloge aux couleurs du coach : petite aiguille bleue, grande rouge, trotteuse orange ; `tourner()` fait avancer la petite avec la grande ; frise à échelle régulière + `bond()` ; `ecran_digital()` ; `tableau_hms()` ; `hm()`, `duree_txt()`). Test : scène `TestHorlogeFrise` (image fixe -ql vue le 16/11 : propre).
- Commun CM1 : `manim/scripts/cm1/duree_cm1_commun.py` (base `PaysageDureeCM1` = `PaysageLongueurCM1` ; `theo louise salome bastien`, `avion`, `tour_controle`).

## État (16/11 soir)
- ✅ Inventaire, commun CP → 6e, commun CM1.
- ✅ Voix du PILOTE CM1 `duree_calculer` : `manim/voix/cm1-duree-calculer(-short).json` (Théo, contrôleur aérien ; Q C puis B ; short C).
- ⏳ Les 61 autres voix écrites par 3 sous-agents (CP+CE1, CE2+CM1, CM2+6e) d'après la consigne ; rapports `ND/rapport-voix-<groupe>.md`.
- ⏳ RECAP à montrer EN ENTIER à Frédéric → attendre son « oui » avant le moindre WAV.

## Reste, dans l'ordre
1. Frédéric valide `manim/voix/RECAP-durees-cp-6e.md` (retouches : modifier le JSON puis relancer `python ND/recap.py`).
2. Pilote CM1 `duree_calculer` : WAV (Julie, débit −6, comme les séries CM1) → marques (`aire_marques.py duree:calculer`, à ajouter à ses chemins) → script `manim/scripts/cm1/duree_calculer.py` (modèle `cm1/longueur_convertir.py`) → dry run AUDIT → aperçu -ql → Frédéric valide → HD (verrou) → short Ti Margo (compteur vérifié) → chaîne de fin.
3. Puis CP → CE1 → CE2 → CM1 → CM2 → 6e, même chaîne (commun par classe qui importe `cp/duree_commun.py`).
4. Manifeste à la suite de la file (dernière date le 16/11 : 28/04/2027 ; 3 shorts par jour au plus), R2, coach + Supabase `notion_ressources`, plan coché, mémoire `serie-durees-cp-6e.md`.
