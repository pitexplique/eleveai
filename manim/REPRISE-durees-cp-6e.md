# Reprise : série DURÉES du CP à la 6e (session B de mardi-mercredi 17-18/11)

> ⛔⛔ **LA QUALITÉ AVANT LE RYTHME** (Frédéric, 16/11 : « le principale est de tout finir avec une qulité optimum », « meme si on finit fin janviert »). Les 150 vidéos par semaine ne passent JAMAIS avant la qualité : contrôles complets, compteur des shorts vérifié avant chaque film, voix validées à deux. Ne jamais presser la série. (À recopier en tête du prompt de toute relève.)

Prompt : `docs/prompt-serie-durees-cm1-6e.md` (étendue CP → 6e le 16/11). Plan : `manim/PLAN-mardi-mercredi-17-18-11.md`, session B.
Inventaire VALIDÉ par Frédéric le 16/11 (« Oui, continue » ; « donc programme durée du CP à la 6e ») : `manim/INVENTAIRE-durees-cp-6e.md`.
36 micros → 32 paysages + 31 shorts à tourner. `aussi` : CE2 lire → CM1 `duree_lire` ; CE2 placer → CM1 + CM2 `duree_positionner_aiguilles` ; 5e `conversion-duree` → 6e `duree_convertir` (paysage ; à revoir à l'œil).
Rien n'est poussé. ⏭ PROCHAIN : le CP (`cp_duree_lire_heure` d'abord), commun de classe qui importe `cp/duree_commun.py`.

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

## Fait le 17/11 (matin, session relève B)
- ✅ Frédéric : « Oui, lance la HD » sur l'aperçu du pilote, sans retouche → les 62 autres voix du RECAP sont VALIDÉES.
- ✅ **PILOTE CM1 `duree_calculer` FINI** : paysage HD 3 min 30 (`verifier-bords-video.py` = 0), chapitres par dry run (`_temps.py` temporaire : 00:07 situation, 00:24 frise, 00:36 bonds, 00:52 total, 01:04 Q1, 01:39 piège, 01:55 Q2, 02:32 défi, 02:47 correction, 03:03 appris).
- ✅ Short Ti Margo : série `cm1-duree` (`prototypes/ti-margo/films/cm1-duree.json` = épisodes lire 01, positionner 02, convertir 03, calculer 04, probleme 05, defi 06 ; outils `cm1-duree.js` : `horlogeCraie` petite aiguille bleue / grande rouge, `billetCraie`, `friseCraie`, `bondCraie`), film `cm1-duree-calculer.js` 82 s, réponse C, compteur vérifié (47,7 → 50,6 s : visible, dans la carte, se vide sans saut). Ti Margo saute à chaque « Hop » (`scene.y`, 0,3 : à 0,6 sa tête cachait la frise) ; frise HAUTE (FY = 330), le calcul juste à DROITE (Ti Margo cache le bas milieu-gauche).
  - ⚠️ Sous-titres : un nombre suivi de « à » / « et » (marque « 45 à », « 50 et ») doit rester sur la MÊME ligne que le mot suivant, sinon `voixDe` saute le mot.
- ✅ Miniatures : `python manim/miniature_duree.py <filtre>` (table `EP` à compléter par épisode) ; short = `… miniature`.
- ✅ Manifeste **06/05/2027** (paysage + short), fiche YouTube, vignettes, R2 (7 fichiers), `generer-videos-r2.mjs`, coach + Supabase (2 lignes cm1 `duree_calculer`). Commit par chemin (clés `cm1-duree` seulement dans les JSON partagés). Pas poussé.

## Fait le 17/11 (matin, session relève C : le CP)
- Outils CP : `manim/scripts/cp/duree_marques.py <ep>` (ou `ce1:<ep>`) → `<classe>/duree_<ep>_marques.json` ; commun `manim/scripts/cp/duree_cp_commun.py` (base `PaysageDureeCP` = `PaysageLongueurCM1`, ceinture BLANCHE ; `hl()` horloge hors audit aux nombres réduits à 0,8 (11-12-1 se touchaient), `entoure(hg, n)`, `pointer(hg, "h"|"m", n)` fait tourner UNE aiguille, `sans_aiguille`, `coche_v`, `croix_x`, `chapiteau` ; personnages `rose leo malo inaya tom`).
- ⚠️ Piège Manim : `FadeIn(hg)` et `Indicate(hg.aig_h)` dans le MÊME `play` → la petite aiguille disparaît pour de bon. Toujours deux `play`.
- Shorts : série `cp-duree` (`prototypes/ti-margo/films/cp-duree.json`, épisodes lire-heure 01, placer-aiguilles 02, jour-semaine 03, ordonner 04, defi 05) ; outils `cp-duree.js` (`horlogeCraie` aux 12 nombres, `horlogeNum` aiguilles en « nombres du cadran » + `vis` pour les faire pousser, `reveilCraie`, `litCraie`, `placeNombre`) ; `cp-commun.js` (série masses) NON modifié.
- Scripts de la session (scratchpad) : `hd.sh` (attend verrou + 2,5 Go, HD, copie, bords) et `film.sh` (film sous verrou).
- ✅ CP 01 `cp_duree_lire_heure` FINI (`96efd9fe`) : paysage (Rose horlogère) HD 2 min 50, bords 0 ; short Ti Margo « le réveil » 64 s, réponse C, compteur vérifié (30,5 → 33,2 s) ; manifeste 08/05/2027, R2, coach.
- ✅ CP 02 `cp_duree_placer_aiguilles` FINI : paysage (Léo clown, chapiteau) HD 2 min 30, bords 0 ; short Ti Margo « le réveil à l'envers » (réponse A, compteur 32,9 → 35,9 s) ; manifeste 09/05/2027, R2 (7 fichiers), coach (2 lignes). `entoure(hg, n, f=0.8)` pour deux nombres voisins (11 et 12 se chevauchaient).
- ✅ CP 03 `cp_duree_jour_semaine` FINI : paysage (Malo maître-nageur, piscine OUVERT/FERMÉ, 4 cartes matin/midi/après-midi/soir, 7 h du matin / 7 h du soir) HD 2 min 45, bords 0 ; short Ti Margo « bonne nuit… à 8 heures du matin » (réponse A, compteur 29,4 → 32 s) ; manifeste 10/05/2027, R2 (7 fichiers), coach (2 lignes). Dessins ajoutés au commun : `soleil lune assiette lit gouter piscine panneau` ; au short : `soleilCraie`, `ecoleCraie` (cp-duree.js).
- ✅ CP 04 `cp_duree_ordonner` FINI (17/11 après-midi, reprise sur ordre du chef poste 1) : paysage (Inaya astronaute, fusée, 4 cartes numérotées, 8 h avant 10 h, bande des heures 1-12) HD bords 0 ; short Ti Margo « ma journée dans la fusée » (réponse C, compteur vu à 30,5 et 31,5 s) ; manifeste 12/05/2027, R2 (7), coach (2). ⚠️ Synchro : une ligne de question qui contient un mot redit juste après (« Elle fait… » puis « fait-elle ») attend ce second mot (AUDIT-TARD) → reformuler la ligne. Choix longs : élargir la colonne (`self.XL = -1.3` le temps de la question).
- ✅ CP 05 `cp_duree_defi` FINI (17/11, 12 h 30) : paysage (Tom pâtissier, four, midi = les 2 aiguilles sur le 12, horloge qui avance / retarde (3 horloges), 2 tours par jour, Q1 A, piège bande 7 → 6, Q2 B : 4 h, défi pendule qui retarde, montre 2 h → 3 h) HD 2 min 47, bords 0 ; short Ti Margo « le gâteau tout mou » (réponse C : 2 heures, compteur vu à 28,5-30 s ; `fourCraie`, `gateauCraie` dans `cp-duree-defi.js`) ; manifeste **10/06/2027** (le max était passé au 09/06 avec la fusion 4e/3e de poste 2), R2 (7), coach (2). Choix très long (« la petite sur le 12, la grande sur le 6 ») : carte sur 2 lignes `VGroup(self.choix(a), self.choix(b)).arrange(DOWN)` + `self.XL = -1.0`.
- ✅ **LE CP EST FINI (5 épisodes, 10 vidéos).** Arrêt sur ordre de Frédéric (forfait hebdo), sans fille.

## ⏭ Reprise SAMEDI 21/11 : le CE1
- Lire d’abord `manim/INVENTAIRE-durees-cp-6e.md` : 8 micros CE1 (lire_heure_demi, positionner_aiguilles, matin_apres_midi, unites_h_min, calculer_simple, ajouter, calendrier, defi) ; leurs 16 voix sont DÉJÀ écrites dans `manim/voix/ce1-duree-*.json` (WAV à générer, débit −6). Commencer par `ce1_duree_lire_heure_demi` ; marques : `python manim/scripts/cp/duree_marques.py ce1:<ep>`.
- Modèles : `manim/scripts/cp/duree_defi.py` / `duree_ordonner.py` (paysage), `prototypes/ti-margo/films/cp-duree-defi.js` (short) ; scripts du manifeste à refaire sur le modèle de l'entrée CP (2 entrées, date = max `pas_avant` + 1 jour, relu juste avant).
- Même chaîne et mêmes règles : un seul rendu HD (verrou `%TEMP%\eleveai-rendu-hd.lock`), ≥ 2,5 Go libres, compteur du short vérifié, commit PAR CHEMIN avec `read-tree HEAD` + `log -1` dans le même appel, jamais de push.
- ⛔ Commit par chemin : `git read-tree HEAD` + vérifier `git log -1` DANS LE MÊME appel que `git commit` (le 96efd9fe, parti d'un vieux HEAD, avait effacé le CE1 04 des masses, rétabli en 74461264).
- Chapitres : `_temps_cp.py` temporaire dans `manim/scripts/cp/` (enveloppe chaque écran, imprime `renderer.time` en dry run), supprimé après.

## Reste, dans l'ordre
1. ✅ Voix validées (17/11).
2. ✅ Pilote CM1 `duree_calculer` FINI (17/11). Chaîne type par épisode : WAV (Julie, débit −6, comme les séries CM1) → marques (`aire_marques.py duree:calculer`, à ajouter à ses chemins) → script `manim/scripts/cm1/duree_calculer.py` (modèle `cm1/longueur_convertir.py`) → dry run AUDIT → aperçu -ql → Frédéric valide → HD (verrou) → short Ti Margo (compteur vérifié) → chaîne de fin.
3. Puis CP → CE1 → CE2 → CM1 → CM2 → 6e, même chaîne (commun par classe qui importe `cp/duree_commun.py`).
4. Manifeste à la suite de la file (relire `max pas_avant` juste avant : le 17/11, CM1 calculer = 06/05/2027 ; la série Masses écrit aussi à la suite ; 3 shorts par jour au plus), R2, coach + Supabase `notion_ressources`, plan coché, mémoire `serie-durees-cp-6e.md`.
