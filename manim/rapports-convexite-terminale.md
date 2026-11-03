# Rapports des agents de rendu — convexité Tle (03/11/2026, après-midi)

Pour la passe finale (manifeste, R2, coach). Les micros reconnaitre et defi :
voir la mémoire `videos-convexite-terminale.md` (rapports du matin).

## derivee-seconde — SHORT ✅
- `convexite-derivee-seconde/eleveai-maths-terminale-convexite-derivee-seconde-short.mp4`, 0:57, 1080×1920, ceinture blanche, bords 0.
- Centre : `transports`.
- questions : `[{"t":"00:18","question":"Un bus freine pour s'arrêter. Sa courbe de distance est :","choix":["convexe","concave","une droite"],"reponse":1,"explication":"Il freine : f seconde est négative, la courbe se bombe."}]` (t mesuré au dry run).
- Paysage déjà rendue le matin (questions et chapitres : à reprendre par dry run).

## point-inflexion — PAYSAGE + SHORT ✅
- Paysage `convexite-point-inflexion/eleveai-maths-terminale-convexite-point-inflexion.mp4`, 3:53, verte, bords 0, centre `musique` (Inès, label de musique).
- Short `…-point-inflexion-short.mp4`, 1:01, blanche, bords 0, centre `jeux-video`.
- questions paysage :
  `[{"t":"01:29","question":"f''(x) = 6x − 12. Quelle est l'abscisse du point d'inflexion ?","choix":["12","2","6"],"reponse":1,"explication":"6x − 12 = 0 quand x = 2, et le signe change en 2. A et C lisent les nombres de la formule sans résoudre."},{"t":"02:18","question":"f''(x) = 12x². Y a-t-il un point d'inflexion en 0 ?","choix":["oui","non","seulement si f(0) = 0"],"reponse":1,"explication":"12x² ne change pas de signe en 0 : la courbe reste convexe, sans inflexion."}]`
- questions short :
  `[{"t":"00:22","question":"Au point d'inflexion, la tangente :","choix":["traverse la courbe","reste au-dessus","reste au-dessous"],"reponse":0,"explication":"Avant, la courbe est au-dessus de sa tangente ; après, elle passe au-dessous."}]`
- Chapitres paysage : 00:00 Point d'inflexion ; 00:08 Inès et la chanson qui buzze ; 00:30 Le point d'inflexion ; 00:44 La courbe traverse sa tangente ; 00:55 La méthode : f'' ; 01:05 Exemple x³ − 3x² ; 01:29 Question 1 ; 01:59 Le piège x⁴ ; 02:18 Question 2 ; 02:49 À toi de jouer ; 03:06 Correction ; 03:30 Ce que tu as appris.
- Restes mineurs : 14 AUDIT-TARD (nombres réaffichés ~0,6 s avant leur 2e mention) ; brouillons dans `media-convexite-point-inflexion*`.

## tangente — PAYSAGE + SHORT ✅
- Paysage `convexite-tangente/eleveai-maths-terminale-convexite-tangente.mp4`, 4:44, verte, bords 0 ; short `…-tangente-short.mp4`, 1:03, blanche, bords 0. Centres `["transports","sciences"]` (Thomas, éclairage automobile).
- Script du short = `convexite_tangente_micro_short.py` (classe `ConvexiteTangenteShort`) ; `convexite_tangente_short.py` en doublon, laissé (autre session).
- questions paysage :
  `[{"t":"01:22","question":"Avec la même tangente, e^0,2 est :","choix":["≥ 1,2","≤ 1,2","= 1,2"],"reponse":0,"explication":"L'exponentielle est convexe : sa courbe est au-dessus de la tangente y = x + 1. Elle vaut environ 1,221."},{"t":"02:37","question":"ln(1,5) est :","choix":["≥ 0,5","≤ 0,5","= 0,5"],"reponse":1,"explication":"Le logarithme est concave : sa courbe est au-dessous de la tangente y = x − 1. Il vaut environ 0,405."}]`
- questions short :
  `[{"t":"00:21","question":"Au sommet d'une colline, les phares éclairent :","choix":["la route","le ciel","le bas-côté"],"reponse":1,"explication":"Sur une bosse, la route passe sous le faisceau : le faisceau part vers le ciel."}]`
- Chapitres paysage : 00:00 Sans calculatrice, e^0,1 ? ; 00:14 Thomas et les phares la nuit ; 00:35 Au-dessus ou au-dessous des tangentes ; 00:49 eˣ ≥ x + 1 ; 01:05 Estimer e^0,1 ; 01:22 Question 1 ; 01:56 ln x ≤ x − 1 ; 02:14 Le piège ; 02:37 Question 2 ; 03:11 Rédiger au bac ; 03:33 Défi ; 03:57 Correction ; 04:21 Ce que tu as appris ; 04:37 Fin.

## ✅ Les 10 vidéos sont rendues : passe finale à faire (manifeste, R2 + rclone check, coach, commit, push).
