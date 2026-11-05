# Rapports de rendu — série ANGLES 6e

## Pilote : module + épisode 01 reconnaitre (05/11/2026)

### Fichiers
- Module : `manim/canvas_angles.py` (API en en-tête, désormais LECTURE SEULE).
- Scripts : `manim/scripts/6e/angle_reconnaitre.py` (`AngleReconnaitre6e`), `angle_reconnaitre_short.py` (`AngleReconnaitreShort`), marques `angle_reconnaitre[_short]_marques.json`.
- Sorties : `manim/sorties/6e/maths/angles/01-reconnaitre/eleveai-maths-6e-angle-reconnaitre.mp4` (3:01, ceinture verte), `eleveai-maths-6e-angle-reconnaitre-short.mp4` (0:52, ceinture blanche).
- Centres : cinema-series, art-design.
- Bords : 0 instant sur les deux. Audit : 0 AUDIT-AVANCE, 0 RETARD, 0 BORD (AUDIT-ABSENT seulement pour « 6 » de « Maths 6e » et « 974 » de @eleveai974).
- Voix : aucun changement au texte, lettres « A O B », « R S T », « E F » : cues WinRT corrects ; écoute humaine non faite.

### Chapitres de la paysage
00:00 Où se cache un angle ? · 00:06 Lina, animatrice · 00:18 Le coude · 00:30 La définition · 00:41 Le nom de l'angle · 00:55 Question 1 · 01:17 Le piège · 01:25 Aigu, droit, obtus, plat · 01:45 Question 2 · 02:11 À toi de jouer · 02:26 Correction · 02:37 Ce que tu as appris

### Questions, paysage
```json
[{"t":"00:55","question":"L'angle RST : quel point est le sommet ?","choix":["R","S","T"],"reponse":1,"explication":"La lettre du milieu est le sommet : c'est S."},
 {"t":"01:45","question":"Un angle mesure 150°. Comment s'appelle-t-il ?","choix":["aigu","obtus","plat"],"reponse":1,"explication":"150 est entre 90 et 180 : l'angle est obtus."}]
```

### Questions, short
```json
[{"t":"00:20","question":"Combien d'angles dans la lettre N ?","choix":["1","2","3"],"reponse":1,"explication":"Le N tourne en haut et en bas : 2 sommets, donc 2 angles."}]
```

### Leçons pour les épisodes 02 à 06
1. **Sortie filtrée.** Toujours `--progress_bar none` et sortie dans un fichier, puis `grep -aE "AUDIT|RETARD|BORD|Error"` : sinon les barres de progression noient la session.
2. **Heredoc Git Bash.** Un gros `cat <<'EOF'` contenant des apostrophes a échoué. Écrire chaque morceau de ≤ 150 lignes avec Write, puis `cat morceau >> script`.
3. **Ne jamais nommer un attribut `.points`** sur un Mobject (c'est le tableau des coordonnées de Manim : erreur `'VGroup' object has no attribute 'astype'`).
4. **Angle** : a des updaters. `a.ouvrir()`, `a.tourner()`, `a.glisser()` ; jamais `.animate.shift` ni `.scale`. Pour recadrer (finale_colonne), `Angle(...).figer()` d'abord. Avant de montrer un morceau resté hors scène : `a.maj()`.
5. **Faire suivre un personnage** : `a.t2.add_updater(lambda m: m.set_value(180 - p.t.get_value()))` puis `self.add(a.t2)` ; `a.t2.clear_updaters()` en fin d'écran.
6. **Rapporteur** : nombres `sans_synchro`, `_pas_audit` (on peut l'afficher d'un bloc) ; rayon utile 3,2 à 4,5 (en dessous, les nombres deviennent petits). `r.poser()` et jamais `.shift`. Intérieure : 0 à droite ; extérieure : 0 à gauche. Dans `r.nombres`, seuls les multiples de 10 existent ; `r.graduations` va de 5 en 5.
7. **Réponse d'une question** : `avant_q` pour la figure qui entre au mot, `autres_r` avec `sc.rep(i, avec=[…])` puis `sc.rep_fin()` : chaque ligne de la phrase arrive à son mot, avec le geste sur la figure.
8. **Phrases de réponse trop longues** : `col()` les rétrécit près de Ti-Margo (y < −1,85). Couper en deux lignes courtes reste plus lisible.
9. **Pas de « 2 » écrit si la voix dit « deux »** (AUDIT-ABSENT) ; un nombre dit « un » ou compteur qui s'incrémente : `t._pas_audit = t.sans_synchro = True`.
10. **`au_mot` avec répétition** : `self.au_mot("90", 2)` vise la 2e occurrence ; les marques ne perdent les mots répétés que s'ils se suivent (« 120 plus 120 » : à recalculer, voir le brief).
11. **Question en short avec figure** : cartes étroites (2,1 de large, x = −0,95) et figure à droite, voir `_disposer_q` et le crochet `au_mot("A :")` du short. Le N se dessine ainsi au mot, avant le choix A.
12. **Étiquettes** : côté oblique, décaler d'au moins 0,8 de la droite (0,55 touchait). Lettres d'angle : déjà placées hors de la pointe par le module (0,44).
13. **Mémoire** : au premier rendu, 0,7 Go libre ; la boucle d'attente a servi. J'ai dû refaire un second HD par vidéo pour des défauts mineurs : regarde la planche basse déf de près avant le premier.
14. **Vérifier à 2× la taille** : les défauts (« côté » qui touche, interligne serré du tampon multi-ligne, arcs du M qui se touchent) ne se voyaient qu'au zoom. Tampon sur 2 lignes : VGroup de 2 Text + SurroundingRectangle, pas de `\n`.

15. **API du module testée** sur image (`poser` tourné, rangées, `suivre`, `zero_a_droite=False`, `ouvrir`, `tourner`, `glisser`, `Equerre.poser`, `mesure=True`) : tout marche. Le rapporteur tourné garde ses nombres droits. Ce test n'a pas vu de vraie vidéo : l'épisode 01 n'utilise ni le rapporteur ni l'équerre ; l'épisode 02 ou 04 sera le premier à les rendre en mouvement, regarde bien sa planche.

16. **Contrôle du pilote par la session (⛔ à appliquer dans tous les épisodes).**
    - **Visage :** `personne(...)` n'a ni yeux ni bouche ; sur des cheveux sombres, le personnage semble sans figure. Toujours `visage(personne(...))` (dans `canvas_angles`).
    - **Interligne :** `self.bloc(...)` est maintenant régulier (ligne de base). Tout groupe de lignes fait à la main avec `arrange` : passer par `interligne_regulier(g)`.
    - **Centrage :** tout ce qui forme une colonne (titre, phrase, tampon) a le même centre ; le tampon « C'est un angle. » était décalé.
    - **Marge :** `verifier-bords-video.py` ne signale qu'en dessous de 2 %, la règle est 3 % : mesure au zoom ce qui est proche du bord. Le compte à rebours des shorts est corrigé par le module.
    - **Fantômes :** ce qu'une figure remplace disparaît (opacité 0), pas de pâle tache qui reste dessous.
    - **Arcs sur traits épais :** `set_z_index(-1)` pour que l'arc passe derrière les côtés.

### Ajouté dans les scripts, hors module
`PersoBras`, `perso_fige`, `lina`, `ecran_dessin` (paysage) ; `Lettre`, `Compteur` (short).

### Soucis restants
- Écoute de la voix non faite (aucune lecture de vidéo lancée) : prononciation des lettres à vérifier par Frédéric.
- Écran question 1 et 2 : la ligne « L'angle RST : » et « Un angle mesure 150°. » apparaissent au mot du nombre ou des lettres, soit 0,6 à 0,8 s après le début de la phrase (voulu : jamais d'avance).

## Épisode 02 droit (05/11/2026)

### Fichiers
- Scripts : `manim/scripts/6e/angle_droit.py` (`AngleDroit6e`), `angle_droit_short.py` (`AngleDroitShort`), marques `angle_droit[_short]_marques.json`.
- Sorties : `manim/sorties/6e/maths/angles/02-droit/eleveai-maths-6e-angle-droit.mp4` (3:10, ceinture verte), `eleveai-maths-6e-angle-droit-short.mp4` (1:00, ceinture blanche).
- Centre : art-design.
- Bords : 0 instant sur les deux. Marge mesurée au pixel, 2 images par seconde : paysage 3,07 % au plus juste, short 3,06 %. Audit : 0 AUDIT-AVANCE, 0 RETARD, 0 BORD (AUDIT-ABSENT seulement pour « 6 » de « Maths 6e » et « 974 » de @eleveai974).
- Voix : aucun mot changé. Marques des mots répétés (« 90 plus 90 », « 2 fois 4 ») recalculées par une copie corrigée de `cues2marques.py`.

### Chapitres de la paysage
00:00 Comment savoir si un coin est droit ? · 00:05 Mehdi, carreleur · 00:17 Le coin : 90° · 00:27 Carré et rectangle · 00:36 L'équerre · 00:47 Le petit carré · 00:58 Question 1 · 01:33 Le piège · 01:47 Question 2 · 02:15 Deux angles droits, un angle plat · 02:25 À toi de jouer · 02:40 Correction · 02:48 Ce que tu as appris

### Questions, paysage
```json
[{"t":"00:58","question":"Mehdi pose un carreau penché, sur la pointe. Son coin est-il encore un angle droit ?","choix":["oui, 90°","non, moins de 90°","non, plus de 90°"],"reponse":0,"explication":"On a tourné le carreau, on n'a pas changé son ouverture. L'angle droit peut être penché."},
 {"t":"01:47","question":"Lequel est un angle droit ?","choix":["89°","90°","100°"],"reponse":1,"explication":"Droit, c'est 90° pile. Ni un peu moins, ni un peu plus."}]
```

### Questions, short
```json
[{"t":"00:15","question":"Quel angle obtiens-tu dans le coin ?","choix":["un peu moins de 90°","90° pile","ça dépend du papier"],"reponse":1,"explication":"90° pile !"}]
```

### Leçons pour les épisodes 03 à 06
1. **Équerre en mouvement : `e.poser()` marche** (glisse et tourne, colle aux côtés). Pour la faire tourner AVEC une figure : `Rotate(VGroup(figure, e), angle, about_point=c)` ; après, `e.c` et `e.rot` ne sont plus à jour : ne plus appeler `e.poser()`.
2. **Coin de l'équerre + `a.coin` ou petit carré : deux carrés emboîtés.** Sous une équerre, `Angle(arc=False)`, ou retire le petit carré quand elle arrive.
3. **Un angle de 90° avec `arc=True` affiche le petit carré tout seul** : dans une question, il donnerait la réponse. `arc=False` + un `Arc` à part.
4. **`set_opacity` sur un `Angle` entier fait apparaître ses pointes et son secteur.** Pour pâlir : seulement `a.cote1[0]`, `a.cote2[0]` et l'arc.
5. **`col()` rétrécit toute la phrase de réponse** si elle descend près de Ti-Margo et dépasse x = 5,3 : elle devient minuscule. Couper en 3 lignes courtes, à leur mot, puis `rep_fini()`.
6. **Colonne centrée :** `self.col` aligne à gauche ; pour le même centre, `mob.move_to(P(x, y))` et vérifier la largeur avec BORDS=1 (ajouté ici : `cc()`, `x_col`).
7. **Rien ne se croise pendant un fondu :** `FadeOut` (0,12 s) dans son propre `play`, puis `FadeIn`. Une sortie et une entrée au même endroit dans le même `play` se lisent l'une sur l'autre.
8. **Un objet qui tourne passe devant ce qui reste fixe** : `set_z_index(5)` sur l'étiquette posée dessus (« 90° » disparaissait sous le carreau).
9. **Fins de choix dits en deux temps** (« 90 degrés pile ») : un `VGroup` de deux `Text`, chacun arrive à son mot.
10. **`verifier-bords-video.py` ne suffit pas :** il disait 0 instant alors qu'un tampon était à 2,66 % du bord. Mesurer au pixel.
11. **Correctif par remplacement global :** un `replace` sur `self.cc(l2, 2.1)` a touché deux écrans, et un correctif échoué a fait repartir un HD identique. Enchaîner le HD seulement si le correctif a réussi.

### Ajouté dans les scripts, hors module
`carreau`, `rangee_carreaux`, `coin_carre`, `Coins`, `mehdi`, `cuisine`, `cc`/`x_col` (paysage) ; `couper`, `Feuille`, `LignePliee`, `tablette` (short, qui importe `coin_carre` depuis `angle_droit.py`). `canvas_angles.py` n'a pas été modifié.

### Soucis restants
- Écoute de la voix non faite (aucune lecture de vidéo lancée) : à vérifier par Frédéric.
- Équerre et plis regardés sur des images fixes échantillonnées, pas en continu : la fluidité du geste reste à voir à la lecture.
- Le short dure 1:00 pile (60,1 s) : à vérifier pour le format Shorts si la limite compte.
- Défaut non corrigé : aucun connu.

## Épisode 03 comparer (05/11/2026)

### Fichiers
- Scripts : `manim/scripts/6e/angle_comparer.py` (`AngleComparer6e`), `angle_comparer_short.py` (`AngleComparerShort`), marques `angle_comparer[_short]_marques.json`.
- Sorties : `manim/sorties/6e/maths/angles/03-comparer/eleveai-maths-6e-angle-comparer.mp4` (3:15, ceinture verte), `eleveai-maths-6e-angle-comparer-short.mp4` (0:58, ceinture blanche). Planches : `planche-finale-paysage.png`, `planche-finale-short.png` (même dossier).
- Centre : sport.
- Bords : 0 instant sur les deux. Marge mesurée au pixel, 2 images par seconde : paysage 3,07 % au plus juste, short 3,06 %. Audit : 0 AUDIT-AVANCE, 0 RETARD, 0 BORD (AUDIT-ABSENT seulement pour « 6 » de « Maths 6e » et « 974 » de @eleveai974).
- Voix : aucun mot changé. Pas de mots répétés à la suite : marques de `cues2marques.py` gardées telles quelles.
- Échelle du terrain : 0,46 unité par mètre, but de 7,32 m, tirs à 11 m et 5,5 m ; les angles dessinés valent les vrais 36,8° et 67,3°. L'écran écrit « 5 m et demi », comme la voix.

### Chapitres de la paysage
00:00 Le plus grand angle a-t-il les plus longs côtés ? · 00:06 Jade, analyste vidéo · 00:22 Deux traits vers les poteaux · 00:39 Comparer les mesures · 00:52 Question 1 · 01:29 Superposer · 01:40 Le repère : l'angle droit · 01:51 Question 2 · 02:18 À toi de jouer · 02:37 Correction · 02:52 Ce que tu as appris

### Questions, paysage
```json
[{"t":"00:52","question":"Un angle de 70° à longs côtés, un angle de 120° à côtés courts. Lequel est le plus grand ?","choix":["70°","120°","ils sont égaux"],"reponse":1,"explication":"La longueur des côtés ne compte pas. Seule l'ouverture compte."},
 {"t":"01:51","question":"Un angle mesure 118°. Comparé à un angle droit, il est :","choix":["plus petit","égal","plus grand"],"reponse":2,"explication":"118 est plus grand que 90. Cet angle est obtus."}]
```

### Questions, short
```json
[{"t":"00:15","question":"Sous la loupe, combien mesure l'angle ?","choix":["30°","33°","90°"],"reponse":0,"explication":"Toujours 30° !"}]
```

### Leçons pour les épisodes 04 à 06
1. **Un mot courant qui revient fait attendre la ligne.** « Plus petit que 90° » attendait le « Plus » de « Plus grand », 3 s trop tard : `sans_synchro` sur la ligne (ajouté ici : `muet()`), et le script la pose avec `au_mot`.
2. **Ligne de question qui arrive à son nombre :** dans `avant_q`, poser `q[0]` soi-même, puis `q.remove(q0)` (voir `ecran_question2`).
3. **Une figure qui entre avant la question :** `mot_q` = le premier mot de la voix, et `avant_q` finit par `au_mot("Lequel")` : la figure et ses nombres arrivent chacun à leur mot.
4. **`a.glisser()` et `a.tourner()` laissent un Group de ValueTracker dans la scène** : faux BORD (x de 0 à 50), rien à l'écran. Animer `a.tx`, `a.ty`, `a.t1`, `a.t2` directement.
5. **`.animate.set_opacity` et `.set_stroke` : sur `a.cote1[0]`, jamais sur `a.cote1`** (la pointe cachée devient visible).
6. **`a.t_long` au-delà de 1** allonge les côtés sans toucher l'arc : c'est la preuve visuelle de « la longueur ne compte pas ».
7. **Morceaux d'une ligne :** `arrange` les centre, donc « et » ou « DEF » tombent hors de la ligne de base. Ajouté ici : `meme_base()`.
8. **Deux lignes de réponse, même taille :** `ligne_rep` rétrécit chacune de son côté. Reprendre le rapport de la première pour la seconde (voir `ecran_question2`).
9. **Les débordements passagers échappent à `verifier-bords-video.py`, pas à la mesure au pixel.** `FadeIn(scale=1.2)` sur un texte large (2,04 %), `Indicate` sur un côté long (1,57 %, `scale_factor=1` corrige), la carte agrandie × 1,08 avec son contour de 7 (2,5 %). Un objet qui entre depuis l'extérieur (la loupe) touche aussi le bord : `FadeIn(shift=…)` court, dans le cadre.
10. **`marge.py` en 15 lignes :** ffmpeg en gris à 2 images par seconde, boîte des pixels > 40, minimum par côté. À faire AVANT le rapport.
11. **Sur le rendu basse définition (15 images/s), AUDIT-AVANCE peut donner 0,06-0,07 s** par arrondi : seul le dry run à 60 images/s fait foi.

### Ajouté dans les scripts, hors module
`terrain`, `balle`, `jade`, `mini_but`, `ang`, `montrer`, `arc_de`, `couleur_arc`, `muet`, `meme_base`, `tampon2` (paysage) ; `Loupe`, `coccinelle`, `ang`, `poser`, `meme_base` (short). `canvas_angles.py` n'a pas été modifié.

### Soucis restants
- Écoute de la voix non faite (aucune lecture de vidéo lancée), lettres « A B C », « D E F », « G H I » comprises : à vérifier par Frédéric.
- Vidéos regardées sur des images fixes échantillonnées (planches et quelques zooms), pas en continu : le passage de DEF devant ABC et la fluidité restent à voir à la lecture.
- Tampon « Celui qui dépasse / est le plus grand. » (01:37) : son cadre arrive avec la 1re ligne, la 2e le rejoint environ 1 s plus tard, à son mot. Laissé tel quel, car c'est la règle des 0 s d'avance.
- Réponse de la question 1 : phrase un peu plus petite que les cartes (`col()` la réduit à cause de Ti-Margo).
- Rendus HD : 2 pour la paysage, 6 pour le short au lieu d'un seul, tous pour des défauts vus après coup (dont les marges passagères, visibles seulement à la mesure au pixel).

## Épisode 04 mesurer (05/11/2026)

### Fichiers
- Scripts : `manim/scripts/6e/angle_mesurer.py` (`AngleMesurer6e`), `angle_mesurer_short.py` (`AngleMesurerShort`), marques `angle_mesurer[_short]_marques.json`.
- Sorties : `manim/sorties/6e/maths/angles/04-mesurer/eleveai-maths-6e-angle-mesurer.mp4` (3:27, ceinture verte), `eleveai-maths-6e-angle-mesurer-short.mp4` (0:54, ceinture blanche), `planche-finale-paysage.png`, `planche-finale-short.png`.
- Centres : corps-sante, sport (Yanis, kinésithérapeute, et le genou de Manon ; l'horloge dans le short).
- Bords : 0 instant sur les deux ; marge mesurée au pixel : 3,07 % (paysage), 3,06 % (short).
- Audit : 0 RETARD, 0 BORD ; AUDIT-ABSENT seulement pour « 6 » et « 974 » ; une AUDIT-AVANCE de 0,06 s en paysage (voir Soucis restants).
- Voix : aucun mot changé ; écoute humaine non faite.

### Chapitres de la paysage
00:00 Mesurer un angle ? · 00:06 Yanis, kinésithérapeute · 00:18 Le goniomètre · 00:30 Le rapporteur · 00:42 Les trois gestes · 00:59 Question 1 · 01:27 Les deux rangées · 01:40 Vérifier : aigu · 01:51 Question 2 · 02:32 À toi de jouer · 02:48 Correction · 03:02 Ce que tu as appris

### Questions, paysage
```json
[{"t":"00:59","question":"Où poses-tu le centre du rapporteur ?","choix":["sur le sommet","au bout d'un côté","au milieu de l'angle"],"reponse":0,"explication":"Le centre va pile sur le sommet. Sinon, la mesure est fausse."},
 {"t":"01:51","question":"Un mois plus tôt, l'angle était obtus. Le rapporteur indiquait 60 et 120. Quelle est la mesure ?","choix":["60°","120°","180°"],"reponse":1,"explication":"Un angle obtus est plus grand que 90°. Donc 120."}]
```

### Questions, short
```json
[{"t":"00:16","question":"Et à 4 heures ?","choix":["40°","90°","120°"],"reponse":2,"explication":"30° de plus à chaque heure : 120°."}]
```

### Leçons pour les épisodes 05 et 06
1. **Lire 55, 125, 35 ou 145** : le module n'écrit que les dizaines. Le nombre ajouté se pose sur sa rangée (`lu()` dans `angle_mesurer.py`), et ses deux voisins passent à opacité 0, sinon on lit des fantômes (« 120 / 125 / 130 » superposés).
2. **`r.rangees[rg].animate.set_opacity(0.3)` fait REVENIR les voisins cachés.** Le fantôme du 125 est revenu ainsi, vu seulement au zoom du HD. Atténuer nombre par nombre, en excluant les voisins.
3. **Anneau autour d'un 0** : il touche forcément le 10, trop proche à ce rayon. Le 10 s'efface tant que l'anneau est au 0, puis revient au moment où le doigt monte. Le rayon 0,3 touchait aussi le 180 : 0,23 à 0,25 suffit.
4. **Zoomer le HD aux moments de lecture** (nombre lu, anneau, mise en valeur), pas seulement les écrans stables. Ces défauts ne se voyaient pas sur la planche basse définition et ont coûté deux HD de plus.
5. **Nombres mis en valeur** : `allumer_nombre` avec k = 1,6 vient au contact des voisins ; k = 1,35 à 1,4 suffit à R = 3 à 4.
6. **`FadeIn(scale=1.5)` sur une étiquette près du bord** fait passer la marge sous 3 % pendant l'animation (2,41 % en short), sans que `verifier-bords-video.py` le voie (il ne détecte que sous 2 %). Scale 1,1 au bord, et mesurer au pixel.
7. **Largeur de texte** : compter 0,0074 × fs par caractère. Au-delà, couper la ligne ou réduire le rayon (R = 3,8 et colonne à x = 4,36 en paysage).
8. **Synchro** : une étiquette dont le mot revient (« un côté » puis « côté ») se met en `sans_synchro`, sinon RETARD ; pour un « 0 » dit, viser `au_mot("0 est")`, `au_mot("0 sur")`.
9. **Halo noir** : `set_stroke(BLACK, w, background=True)` et `joint_type = LineJointType.ROUND`, sinon le contour du « 3 » fait une pointe.

### Ajouté dans les scripts, hors module
`lu` (nombre aux 5 sur sa rangée), `RapporteurM` (3 chiffres de la rangée intérieure × 0,82), `Doigt` (anneau et trace qui suivent une rangée depuis son 0), `Jambe`, `Goniometre`, `coin_pointille` dans `angle_mesurer.py` ; `Horloge` et `bas()` dans le short.

### Défauts du module à reprendre (contournés dans les scripts, module inchangé)
- Le rapporteur n'écrit que les dizaines : pas de 55, 125, 35, 145.
- Les nombres à 3 chiffres de la rangée intérieure se touchent (100 et 90, 110 et 100) : `RapporteurM` les réduit à 0,82.
- Au rayon du short, la rangée intérieure est trop serrée : `bas()` n'y garde que les multiples de 30, rangée extérieure pâle, 0 et 180 décalés.

### Soucis restants
- **À trancher : le défi du brief.** Le brief disait rapporteur « retourné ». Le script garde le même rapporteur et lit sur la rangée extérieure, dont le 0 est à gauche (35 sur l'extérieure, 145 sur l'intérieure), sans `zero_a_droite=False`. C'est un écart volontaire : c'est le geste réel sur un rapporteur à deux rangées.
- **Nombres cachés pendant la lecture** : quand 55 est lu, 50 et 60 de sa rangée disparaissent ; quand 35 est lu, 30 et 40 aussi. Pendant la correction, le 30 s'affiche d'abord, puis disparaît au moment de « 35 ».
- **AUDIT-AVANCE de 0,06 s** sur « le 0 sur un côté » : corrigée ensuite par la session, audit propre. Même HD : l'anneau du doigt s'efface à l'arrivée sur 55 et 35 (il rendait le nombre illisible) et le nombre passe au vert par le fill seul, pour que son halo reste noir.
- **Le short n'a pas été rendu de nouveau** après les derniers correctifs : ils ne concernaient que la paysage.
- Vérifié sur images fixes et au zoom, pas en lecture : mouvement et son non contrôlés à l'œil et à l'oreille.

## Épisode 05 tracer (05/11/2026)

### Fichiers
- Scripts : `manim/scripts/6e/angle_tracer.py` (`AngleTracer6e`), `angle_tracer_short.py` (`AngleTracerShort`), marques `angle_tracer[_short]_marques.json`.
- Sorties : `manim/sorties/6e/maths/angles/05-tracer/eleveai-maths-6e-angle-tracer.mp4` (3:10, ceinture verte), `eleveai-maths-6e-angle-tracer-short.mp4` (1:02, ceinture blanche), `planche-finale-paysage.png`, `planche-finale-short.png`.
- Centres : jeux-video (Inès, game designer, et sa catapulte), meteo-climat (le flocon, dans le short).
- Bords : 0 instant sur les deux ; marge mesurée au pixel : 3,07 % (paysage), 3,06 % (short).
- Audit : 0 AUDIT-AVANCE, 0 BORD ; 1 RETARD toléré de 0,31 s (« Elle dessine », écran 01) ; AUDIT-ABSENT seulement pour « 6 » et « 974 ».
- Voix : aucun mot changé. Pas de mots répétés à la suite : marques de `cues2marques.py` gardées telles quelles.
- Gestes vérifiés sur le HD : centre sur le sommet, 0 sur le côté, repère à la bonne graduation, trait passant par le repère. Mesuré sur l'image : 40° pour le repère à 40, 40° depuis la gauche pour le piège à 140°.

### Chapitres de la paysage
00:00 Quels sont les quatre gestes ? · 00:06 Inès, game designer · 00:20 Quel outil ? · 00:29 Premier geste · 00:37 Deuxième geste · 00:44 Troisième geste · 00:52 Quatrième geste · 01:03 Question 1 · 01:29 Le piège · 01:41 On prévoit · 01:52 Question 2 · 02:18 À toi de jouer · 02:29 Correction · 02:46 Ce que tu as appris

### Questions, paysage
```json
[{"t":"01:03","question":"Que fais-tu en premier ?","choix":["poser le rapporteur","tracer un côté","faire un repère à 40"],"reponse":1,"explication":"Sans premier côté, on ne sait pas où poser le 0."},
 {"t":"01:52","question":"Tu traces un angle de 130°. Il sera :","choix":["aigu","droit","obtus"],"reponse":2,"explication":"130 est entre 90 et 180. L'angle sera obtus."}]
```

### Questions, short
```json
[{"t":"00:21","question":"Quel repère pour la branche suivante ?","choix":["70°","90°","120°"],"reponse":2,"explication":"60° de plus : 120°"}]
```

### Leçons pour l'épisode 06
1. **`au_mot` prend la 1re occurrence de la chaîne** : « Que » trouve « Question », « rayons » le premier « rayons ». Viser `au_mot("Que fais")`, `au_mot("rayons voisins")`. Pour « le 0 », `au_mot("0")` a retiré une AUDIT-AVANCE de 0,16 s.
2. **Un `Text` attend son dernier mot** : une phrase longue arrive en retard. La découper, ou `muet()` et poser avec `au_mot`.
3. **Colonne paysage centrée à x = 4,36 :** à fs 36, 17 caractères au plus ; à fs 32, 19. Au-delà, le texte vient contre le cadre de la page ou sous 3 %.
4. **`FadeIn(scale=1.2)` sur une ligne longue passe sous 3 %** (1,99 % ici, têtes de geste) : `shift=UP * 0.1` à la place.
5. **Lire un nombre sous l'anneau du doigt** : effacer l'anneau au moment de la lecture (`d.anneau.animate.set_stroke(opacity=0)`). Nombre lu : halo et `z_index` 2, au-dessus du trait.
6. **Carte de short étroite (< 2,5)** : le choix rétrécit à l'arrivée de la coche. Avec une figure à côté, carte à 2,5 et figure réduite.
7. **Position d'attente du rapporteur :** mal posé exprès, il couvrait sa légende pendant 1 s. Vu seulement au HD, car la planche à 12 images tombait à côté : échantillonner aussi les images entre « Pose » et « au milieu ».
8. **`arrange` ne garde pas l'interligne entre blocs de « Ce que tu as appris »** : `interligne_regulier` ne change rien à 2 lignes. Poser les lignes de base à pas fixe (0,48 ici, boucle après `finale_colonne`).
9. **Les objets posés sur la figure** : un nombre déplacé sur l'équerre coupait l'hypoténuse (« 115° »). Le placer à côté de l'objet qui arrive.

### Ajouté dans les scripts, hors module
`halo`, `lu`, `RapporteurT`, `cahier`, `Doigt`, `Crayon`, `regle_sur`, `repere`, `arc_de`, `tache`, `EcranJeu`, `ines`, `Etapes`, `muet` (paysage) ; `Flocon`, `Roue`, `repere`, `halo`, `rapporteur_bas`, `arc_de`, `legende`, `cale`, `changer` (short). `canvas_angles.py` n'a pas été modifié.

### Soucis restants
- Écoute de la voix non faite (aucune lecture de vidéo lancée) : à vérifier par Frédéric.
- Vérifié sur images fixes et au zoom, pas en lecture : mouvement et son non contrôlés à l'œil et à l'oreille.
- Short de 1:02, soit un peu plus de 60 s : la voix validée n'a pas été touchée.
- RETARD de 0,31 s sur « Elle dessine » : sous la tolérance de 0,4 s, non corrigé.
- Les `.vignette.webp` du dossier de sortie datent de 13:23, avant le dernier rendu, et ne viennent pas de mes commandes. Ils montrent l'état précédent.
- Rendus HD : 2 pour la paysage, 2 pour le short. Le second corrige la pose du rapporteur (short) et les interlignes (paysage), vus sur la planche finale.

## Épisode 06 defi (05/11/2026)

### Fichiers
- Scripts : `manim/scripts/6e/angle_defi.py` (`AngleDefi6e`), `angle_defi_short.py` (`AngleDefiShort`), marques `angle_defi[_short]_marques.json`.
- Sorties : `manim/sorties/6e/maths/angles/06-defi/eleveai-maths-6e-angle-defi.mp4` (3:24, ceinture verte), `eleveai-maths-6e-angle-defi-short.mp4` (1:01, ceinture blanche). Planches finales hors de `manim/sorties` : `%TEMP%\agent-angle-defi\planche-finale-paysage.png`, `planche-finale-short.png`.
- Centres : paysage transports, histoire-geographie ; short nature-ecologie.
- Bords : 0 instant sur les deux. Marge au pixel, 4 images par seconde (gauche / droite / haut / bas) : paysage 3,49 / 3,70 / 3,07 / 3,02 % ; short 3,70 / 3,06 / 8,06 / 3,33 %. Aucune image sous 3 %.
- Audit au dry run : 0 AUDIT-AVANCE, 0 AUDIT-TARD, 0 RETARD, 0 BORD (AUDIT-ABSENT seulement pour « 6 » et « 974 »).
- Voix : aucun mot changé. Marques du short recalculées pour « 120 plus 120 plus 120 » (`03-verif`), corrigées directement dans `angle_defi_short_marques.json`.
- Vraies mesures : 110°, 125°, 35°, le croisement à 50°, le rond-point à 120, 90, 80 et 70.

### Chapitres de la paysage
00:00 Peut-on trouver un angle sans rapporteur ? · 00:06 Tom, urbaniste · 00:20 Premier cas : la rue droite · 00:32 L'autre angle · 00:46 Question 1 · 01:21 Deuxième cas : le croisement · 01:34 Question 2 · 02:06 Troisième cas : le tour complet · 02:22 À toi de jouer · 02:39 Correction · 02:58 Ce que tu as appris

### Questions, paysage
```json
[{"t":"00:46","question":"Sur une rue droite, un angle mesure 125°. Combien mesure l'autre ?","choix":["55°","65°","235°"],"reponse":0,"explication":"180 − 125 = 55°. On vérifie : 125 + 55 = 180."},
 {"t":"01:34","question":"Deux rues se croisent. Un angle mesure 35°. Combien mesure l'angle en face ?","choix":["35°","145°","325°"],"reponse":0,"explication":"En face, c'est la même mesure : 35°."}]
```

### Questions, short
```json
[{"t":"00:13","question":"Quel angle entre deux pales voisines ?","choix":["90°","120°","180°"],"reponse":1,"explication":"On partage le tour en 3 : 360 ÷ 3 = 120°."}]
```

### Leçons
1. **Un mot qui revient retarde une ligne de plusieurs secondes.** « Un angle mesure 35° » attendait « l'angle en face » : `sans_synchro` sur la ligne, posée avec `au_mot("35")`.
2. **`au_mot` du module tolère 0,05 s d'avance.** Surchargé dans ces deux scripts : il attend le reste avec `t_mot`, plus une image.
3. **Largeur réelle d'un Text : 0,0074 × fs par caractère**, un peu plus en gras. La colonne de droite réduit tout ce qui dépasse 5,2 (`cc`).
4. **Une légende sur fond sombre coupe les décors en deux** (arbre à moitié caché, vu seulement au zoom). `plan_quartier(sans=…)` retire ces arbres.
5. **`_ensuite`** : après `_avec`, une seconde liste de gestes pour le `play` suivant (la ligne « Combien » et son « ? »).

### Ajouté dans les scripts, hors module
`plan_quartier`, `bout`, `rue`, `rue_depuis`, `rue_droite`, `ouverture`, `etiq`, `sommet`, `Voiture`, `tom`, `tampon2`, `FigureRondPoint` (paysage) ; `Helice`, `mat`, `Cercle` (short). `canvas_angles.py` n'a pas été modifié.

### Soucis restants
- **Short de 60,8 s** : à vérifier si une limite de 60 s compte.
- Écoute de la voix non faite (aucune lecture lancée) : à vérifier par Frédéric.
- Vérifié sur images fixes et au zoom, pas en lecture : les rotations (angle opposé, pales) et la voiture ne sont pas contrôlées en continu.
- Quelques mots de liaison dits ne sont pas écrits (« Ils ont » devant le tampon « la même mesure. », « Voici », « Il est »).
- Rendus HD : 2 pour la paysage (le second retire les arbres coupés par les légendes), 1 pour le short.
