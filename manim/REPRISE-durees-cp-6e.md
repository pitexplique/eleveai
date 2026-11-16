# Reprise : série DURÉES du CP à la 6e (session B de mardi-mercredi 17-18/11)

> ⛔⛔ **LA QUALITÉ AVANT LE RYTHME** (Frédéric, 16/11 : « le principale est de tout finir avec une qulité optimum », « meme si on finit fin janviert »). Les 150 vidéos par semaine ne passent JAMAIS avant la qualité : contrôles complets, compteur des shorts vérifié avant chaque film, voix validées à deux. Ne jamais presser la série. (À recopier en tête du prompt de toute relève.)

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
- ✅ Les 61 autres voix (3 sous-agents, rapports `ND/rapport-voix-<groupe>.md`), commit `51faaca3` : 63 fichiers, lettres justes vérifiées par script (0 écart), calculs relus par sondage.
- ⏳ `manim/voix/RECAP-durees-cp-6e.md` montré à Frédéric le 16/11 → attendre son « oui » avant le moindre WAV.
- Notes des agents : `cp-duree-jour-semaine` = moments de la journée (comme la banque) ; CM1 sans durées décimales (réservées à la 6e) ; 6e problème : afficher le tableau des 2 cars (7 h 22, 7 h 35, 7 h 48, 8 h 11).

## Fait le 16/11 au soir (session de relève)
- ✅ Frédéric : « Oui, lance le pilote » (après le RECAP). Les 62 autres voix : validées seulement s'il ne corrige rien en voyant le pilote (le lui demander avec l'aperçu).
- ✅ WAV du pilote (Julie, −6) : `public/sons/cm1-duree-calculer(-short)/` (14 + 7 clips).
- ✅ Marques : `python manim/scripts/cm1/aire_marques.py duree:calculer` → `manim/scripts/cm1/duree_calculer_marques.json` (0 introuvable).
- ✅ Script `manim/scripts/cm1/duree_calculer.py` (`DureeCalculerCM1`) : dry run AUDIT PROPRE (seul « 974 »). Questions 01:04 rép 2 (C), 01:55 rép 1 (B). Durée ≈ 3 min 25.
  - Outils du script : `hl()` horloge hors audit ; `ecran_hm()` écran digital en 2 morceaux (« 11: » puis « 15 ») ; `frise_libre()` frise PAS à l'échelle (défi : 15 min et 10 min) ; `_avec_q` : chaque ligne de la question arrive AVEC son morceau de frise (sinon les heures arrivaient 11 s en retard) ; « 8 h » / « 45. » en deux morceaux (sinon TARD 0,47 s).
- ✅ Aperçu -ql (3 min 30) relu sur planche 2 fois, corrigés : écran « 11:15 » presque noir (couleur prise sur le Text parent), « 12 h » / « 12 h 10 » qui se chevauchaient (frise du défi : places 0, 19, 81, 100), le X du piège sur « puis », la figure de « Ce que tu as appris » (petits bonds : textes écartés du grand arc). `verifier-bords-video.py` = 0. Copie : `manim/sorties/cm1/maths/duree/04-calculer/apercu-cm1-duree-calculer.mp4`, page `manim/sorties/apercu.html` (port 3900).
- ⏳ MONTRÉ à Frédéric le 16/11 : attendre son avis sur l'aperçu ET sur les 62 autres voix (validées seulement s'il ne corrige rien).
- Vérifier un seul écran : petite scène qui n'appelle que `ecran_xxx()`, `fichier_marques` en chemin absolu, `-ql -s`.

## Reste, dans l'ordre
1. Frédéric valide `manim/voix/RECAP-durees-cp-6e.md` (retouches : modifier le JSON puis relancer `python ND/recap.py`).
2. Pilote CM1 `duree_calculer` : WAV (Julie, débit −6, comme les séries CM1) → marques (`aire_marques.py duree:calculer`, à ajouter à ses chemins) → script `manim/scripts/cm1/duree_calculer.py` (modèle `cm1/longueur_convertir.py`) → dry run AUDIT → aperçu -ql → Frédéric valide → HD (verrou) → short Ti Margo (compteur vérifié) → chaîne de fin.
3. Puis CP → CE1 → CE2 → CM1 → CM2 → 6e, même chaîne (commun par classe qui importe `cp/duree_commun.py`).
4. Manifeste à la suite de la file (dernière date le 16/11 : 28/04/2027 ; 3 shorts par jour au plus), R2, coach + Supabase `notion_ressources`, plan coché, mémoire `serie-durees-cp-6e.md`.
