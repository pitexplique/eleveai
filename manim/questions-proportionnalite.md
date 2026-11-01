# Questions-pauses et centres — série PROPORTIONNALITÉ

À recopier dans le manifeste (champs `questions` et `centres`) à la passe finale de chaque lot.

## 6e 01-reconnaitre (PILOTE, rendu le 31/10)
**Paysage** `6e-prop-reconnaitre` — 4:07, ceinture verte — centres `cinema-series`, `corps-sante`, `argent-budget`
```json
[
  {"t":"01:20","question":"2 places coûtent 14 €. Le prix est proportionnel. Combien coûtent 6 places ?","choix":["18 €","42 €","21 €"],"reponse":1,"explication":"6 places, c'est 3 fois 2 places : 3 × 14 = 42 €."},
  {"t":"02:31","question":"Quel tableau est proportionnel ?","choix":["1 kg : 3 € ; 2 kg : 5 €","1 kg : 3 € ; 2 kg : 6 €","1 kg : 3 € ; 2 kg : 4 €"],"reponse":1,"explication":"2 kg, c'est le double de 1 kg, et 6 €, le double de 3 € : on multiplie toujours par 3."}
]
```
**Short** `6e-prop-reconnaitre-short` — 1:13, ceinture blanche — centres `corps-sante`, `animaux`, `cinema-series`
```json
[
  {"t":"00:35","question":"1 place de cinéma coûte 7 €, 3 places coûtent 21 €. C'est proportionnel ?","choix":["oui","non","on ne peut pas savoir"],"reponse":0,"explication":"3 × 7 = 21 : on multiplie toujours par 7."}
]
```
Question en commentaire : « combien mesurerait-on à 40 ans ? » (30 m).
Sources des tailles (31/10) : courbes OMS 0-5 ans et 5-19 ans, références INSERM ; girafe adulte 4,3 à 5,9 m.
Défauts connus du rendu paysage (corrigés dans le module pour la suite) : traits des cases très pâles après un allumage ; nombres masqués ~0,5 s vers 0:38.

## 6e 02-tableau (lot 1, rendu le 31/10)
**Paysage** `6e-prop-tableau` — 3:22, ceinture verte — centres `jeux-video`
```json
[
  {"t":"00:58","question":"3 coffres coûtent 12 pièces. Combien coûtent 6 coffres ?","choix":["15 pièces","24 pièces","18 pièces"],"reponse":1,"explication":"6 coffres, c'est le double de 3 coffres : 12 × 2 = 24 pièces."},
  {"t":"01:52","question":"1 épée coûte 7 pièces. 3 épées coûtent 21 pièces. Combien coûtent 4 épées ?","choix":["28 pièces","25 pièces","22 pièces"],"reponse":0,"explication":"4 = 1 + 3, on additionne les prix : 7 + 21 = 28 pièces."}
]
```
**Short** `6e-prop-tableau-short` — 1:07, ceinture blanche — centres `cuisine`
```json
[
  {"t":"00:35","question":"Et 12 cookies ?","choix":["18 €","14 €","36 €"],"reponse":0,"explication":"12 = 6 + 6, donc 9 + 9 = 18 €."}
]
```
Question en commentaire : « Combien coûtent 20 cookies ? » (30 €).

## 6e 03-coefficient (lot 1, rendu le 31/10)
**Paysage** `6e-prop-coefficient` — 3:33, ceinture verte — centres `nature-ecologie`, `sciences`
```json
[
  {"t":"01:04","question":"4 minutes de douche : 40 litres. Quel est le coefficient ?","choix":["36","10","4"],"reponse":1,"explication":"40 ÷ 4 = 10. On vérifie : 4 × 10 = 40."},
  {"t":"02:06","question":"Le coefficient est 12. Combien de minutes pour 84 litres ?","choix":["7 minutes","72 minutes","96 minutes"],"reponse":0,"explication":"On remonte, donc on divise : 84 ÷ 12 = 7 minutes."}
]
```
**Short** `6e-prop-coefficient-short` — 1:03, ceinture blanche — centres `animaux`
```json
[
  {"t":"00:26","question":"En 4 secondes, combien de battements ?","choix":["54","200","450"],"reponse":1,"explication":"4 × 50 = 200 battements."}
]
```
Question en commentaire : « Combien de battements en 1 heure ? » (180 000).
Sources (31/10) : douche 12 à 20 L/min selon le pommeau (Castorama ; Kelwatt, Parc du Verdon : 15-20 L/min classique) ; colibri 22 à ~80 battements/s selon l'espèce (Larousse), 40 à 50 (Slate).

## 6e 04-unite (lot 1, rendu le 31/10)
**Paysage** `6e-prop-unite` — 2:59, ceinture verte — centres `cuisine`
```json
[
  {"t":"00:59","question":"5 mangues coûtent 15 €. Combien coûte 1 mangue ?","choix":["10 €","3 €","75 €"],"reponse":1,"explication":"15 ÷ 5 = 3 € pour 1 mangue."},
  {"t":"01:41","question":"3 cahiers coûtent 9 €. Combien coûtent 7 cahiers ?","choix":["13 €","21 €","63 €"],"reponse":1,"explication":"1 cahier : 9 ÷ 3 = 3 €. 7 cahiers : 7 × 3 = 21 €."}
]
```
**Short** `6e-prop-unite-short` — 1:22, ceinture blanche — centres `argent-budget`, `cuisine`
```json
[
  {"t":"00:37","question":"3 yaourts : 2 €. Pack de 12 : 9 €. Meilleur prix ?","choix":["les 3 yaourts","le pack de 12","c'est pareil"],"reponse":0,"explication":"12 = 4 × 3 : 4 × 2 = 8 €. Moins cher que 9 € !"}
]
```
Question en commentaire : « 250 g de chocolat coûtent 3 €. Combien coûte 1 kg ? » (12 €).

## 6e 05-resoudre (lot 1, rendu le 31/10)
**Paysage** `6e-prop-resoudre` — 3:23, ceinture verte — centres `sport`, `football`, `argent-budget`
```json
[
  {"t":"01:13","question":"4 ballons coûtent 36 €. Combien coûtent 6 ballons ?","choix":["38 €","54 €","216 €"],"reponse":1,"explication":"1 ballon : 36 ÷ 4 = 9 €. 6 ballons : 6 × 9 = 54 €."},
  {"t":"02:06","question":"3 gourdes coûtent 12 €. Combien coûtent 9 gourdes ?","choix":["36 €","18 €","21 €"],"reponse":0,"explication":"9 gourdes, c'est 3 fois 3 gourdes. 3 × 12 = 36 €."}
]
```
**Short** `6e-prop-resoudre-short` — 1:23, ceinture blanche — centres `musique`
```json
[
  {"t":"00:50","question":"4 places de concert coûtent 100 €. Et 8 places ?","choix":["104 €","200 €","400 €"],"reponse":1,"explication":"8, c'est le double de 4. Le double de 100 = 200 €."}
]
```
Question en commentaire : « Combien coûtent 10 places, et quel chemin prends-tu ? » (250 €).
Défauts mineurs connus : les coureurs passent un instant sur le nom de leur chemin ; dans le short, le tableau couvre « Ceinture blanche » pendant la question.

## 6e 06-defi (lot 1, rendu le 31/10)
**Paysage** `6e-prop-defi` — 3:03, ceinture verte — centres `transports`, `jeux-defis`
```json
[
  {"t":"00:47","question":"Le car consomme 30 litres pour 100 km. Combien pour 300 km ?","choix":["90 litres","230 litres","33 litres"],"reponse":0,"explication":"300 km, c'est 3 fois 100 km : 3 × 30 = 90 litres."},
  {"t":"01:38","question":"Un gâteau cuit en 30 minutes. Combien de temps pour 2 gâteaux, dans le même four, en même temps ?","choix":["60 minutes","30 minutes","15 minutes"],"reponse":1,"explication":"Les deux gâteaux cuisent en même temps : toujours 30 minutes. Ce n'est pas proportionnel."}
]
```
**Short** `6e-prop-defi-short` — 0:54, ceinture blanche — centres `chiens-chats`, `jeux-defis`
```json
[
  {"t":"00:13","question":"3 chats attrapent 3 souris en 3 minutes. Combien de chats pour 100 souris en 100 minutes ?","choix":["100 chats","3 chats","33 chats"],"reponse":1,"explication":"Ensemble, les 3 chats attrapent 1 souris par minute : en 100 minutes, 100 souris. Les mêmes 3 chats suffisent."}
]
```
Question en commentaire : « Combien de souris ces 3 chats attrapent-ils en 1 heure ? » (60).
Défaut mineur connu : figure petite sur « Ce que tu as appris » de la paysage.

## 08-echelle-reelle (lot 2, COMMUN 6e/4e, rendu le 31/10)
**Paysages** `6e-prop-echelle-reelle` et `4e-prop-echelle-reelle` — 3:36, ceinture verte — centres `histoire-geographie`, `transports` (mêmes t)
```json
[
  {"t":"00:56","question":"Sur cette carte, 1 cm représente 5 km. Un chemin mesure 7 cm. Quelle est sa vraie longueur ?","choix":["12 km","35 km","1,4 km"],"reponse":1,"explication":"7 × 5 = 35 km."},
  {"t":"02:10","question":"Sur un plan, 1 cm représente 10 m. Un couloir mesure 3,5 cm. Quelle est sa vraie longueur ?","choix":["35 m","13,5 m","0,35 m"],"reponse":0,"explication":"3 cm : 30 m ; un demi-centimètre : 5 m ; en tout 35 m."}
]
```
**Short** `6e-prop-echelle-reelle-short` = `4e-prop-echelle-reelle-short` — 0:55, ceinture blanche — centres `jeux-defis`, `histoire-geographie`
```json
[
  {"t":"00:19","question":"Du palmier au rocher : 4 cm. Combien de pas ?","choix":["24 pas","80 pas","5 pas"],"reponse":1,"explication":"4 × 20 = 80 pas."}
]
```
Question en commentaire : « Le bateau est à 15 cm du trésor. Combien de pas ? » (300).

## 07-echelle-comprendre (lot 2, COMMUN 6e/4e, rendu le 31/10)
**Paysages** `6e-prop-echelle-comprendre` et `4e-prop-echelle-comprendre` — 3:38, ceinture verte — centres `construction`, `art-design` (mêmes t)
```json
[
  {"t":"00:57","question":"Sur le plan au 1 cm pour 10 m, le bâtiment B mesure 5 cm. Combien mesure-t-il en vrai ?","choix":["15 m","50 m","5 m"],"reponse":1,"explication":"1 cm représente 10 m, donc 5 cm représentent 5 × 10 = 50 m."},
  {"t":"01:52","question":"La maquette est au 1/200 : que veut dire ce 200 ?","choix":["1 cm sur la maquette = 200 cm en vrai","La maquette mesure 200 cm","200 cm sur la maquette = 1 cm en vrai"],"reponse":0,"explication":"1/200 : 1 cm sur la maquette représente 200 cm en vrai. 4 cm → 4 × 200 = 800 cm = 8 m."}
]
```
**Short** `6e-prop-echelle-comprendre-short` = `4e-prop-echelle-comprendre-short` — 1:08, ceinture blanche — centres `voitures-motos`, `avions`
```json
[
  {"t":"00:24","question":"Un avion miniature au 1/100 mesure 40 cm. Combien mesure le vrai ?","choix":["140 cm","4 000 cm","400 cm"],"reponse":1,"explication":"Au 1/100, on multiplie par 100 : 40 × 100 = 4 000 cm = 40 m, un avion de ligne !"}
]
```
Question en commentaire : la figurine de 3 cm au 1/60 (180 cm = 1,80 m). Sources : 1/43 ≈ 10 cm (voiture-miniature.com) ; A320 37,57 m, 737-800 39,47 m (dimensions.com). Intitulés à vérifier sur le texte exact du script avant le manifeste.

## 6e 10-echelle-defi (lot 2, rendu le 31/10)
**Paysage** `6e-prop-echelle-defi` — 2:43, ceinture verte — centres `cinema-series`, `art-design`
```json
[
  {"t":"00:36","question":"Sur un plan, 5 cm représentent 20 m. Que représente 1 cm ?","choix":["4 m","100 m","15 m"],"reponse":0,"explication":"20 ÷ 5 = 4 m pour 1 cm."},
  {"t":"01:17","question":"Sur le plan de Jade, 1 cm représente 4 m. Un pont mesure 7 cm. Combien mesure-t-il en vrai ?","choix":["11 m","28 m","1,75 m"],"reponse":1,"explication":"7 × 4 = 28 m."}
]
```
**Short** `6e-prop-echelle-defi-short` — 0:57, ceinture blanche — centres `dinosaures`, `cinema-series`
```json
[
  {"t":"00:22","question":"La queue de la figurine mesure 8 cm. Dans le film ?","choix":["16 m","10 m","4 m"],"reponse":0,"explication":"8 × 2 = 16 m."}
]
```
Question en commentaire : « La bouche mesure 3 cm sur la figurine. Et dans le film ? » (6 m ; grand pour un sauropode réel, mais juste au 1 cm ↔ 2 m de la figurine).
Chiffre réel : sauropode « de film » de 40 m, plausible (Argentinosaurus 30-40 m, Patagotitan ≈ 37 m) ; figurine 20 cm inventée.

## 09-echelle-plan (lot 2, COMMUN 6e/4e, rendu le 31/10)
**Paysages** `6e-prop-echelle-plan` et `4e-prop-echelle-plan` — 3:32, ceinture verte — centres `nature-ecologie`, `art-design` (mêmes t)
```json
[
  {"t":"00:54","question":"1 cm représente 10 m. Un mur mesure 40 m. Combien de cm sur le plan ?","choix":["400 cm","30 cm","4 cm"],"reponse":2,"explication":"40 ÷ 10 = 4 cm."},
  {"t":"01:52","question":"Sur une carte, 1 cm représente 4 km. Un trajet mesure 30 km. Combien de cm sur la carte ?","choix":["7,5 cm","120 cm","26 cm"],"reponse":0,"explication":"28 km, c'est 7 fois 4 km : 7 cm. Il reste 2 km, la moitié de 4 km : un demi-centimètre. En tout : 7,5 cm."}
]
```
**Short** `6e-prop-echelle-plan-short` = `4e-prop-echelle-plan-short` — 1:15, ceinture blanche — centres `football`
```json
[
  {"t":"00:35","question":"La surface de réparation fait environ 40 m de large. Sur ton dessin (1 cm représente 5 m) ?","choix":["8 cm","200 cm","35 cm"],"reponse":0,"explication":"40 ÷ 5 = 8 cm."}
]
```
Question en commentaire : « Un terrain de basket mesure 28 m. Combien de cm sur ton dessin ? » (5,6 cm).
Chiffres réels (31/10) : foot 105 × 68 m (FIFA, IFAB loi 1 = fourchette), surface de réparation 40,32 m, A4 21 × 29,7 cm (ISO 216), basket 28 × 15 m (FIBA).
Défauts mineurs connus (short) : « A4 » mord sur le bas de la feuille ; « 68 ÷ 5 = 13,6 cm » frôle Ti Margo. Le script importe `Correspondance`, `cartouche`, `carte_awa`, `gras` de `prop_echelle_reelle.py` : ne pas modifier ce dernier sans re-vérifier le 09.

## 4e 10-echelle-defi (lot 2, rendu le 31/10)
**Paysage** `4e-prop-echelle-defi` — 3:46, ceinture verte — centres `course-trail`, `nature-ecologie`
```json
[
  {"t":"01:04","question":"Carte au 1/25 000. Un lac mesure 2 cm sur la carte. Combien en vrai ?","choix":["50 m","500 m","5 km"],"reponse":1,"explication":"2 × 25 000 = 50 000 cm, c'est 500 m."},
  {"t":"02:12","question":"Sur une carte, 5 cm représentent 1 km. Quelle est l'échelle ?","choix":["1/5","1/20 000","1/200"],"reponse":1,"explication":"1 km = 100 000 cm ; 100 000 ÷ 5 = 20 000. L'échelle est 1/20 000."}
]
```
**Short** `4e-prop-echelle-defi-short` — 1:06, ceinture blanche — centres `course-trail`
```json
[
  {"t":"00:29","question":"Un semi-marathon fait environ 21 km. Sur la carte au 1/25 000 ?","choix":["84 cm","21 cm","5 cm"],"reponse":0,"explication":"1 km mesure 4 cm : 21 × 4 = 84 cm."}
]
```
Question en commentaire : « Une course de 10 km : combien de cm sur la carte ? » (40 cm).
Chiffres réels (31/10) : marathon 42,195 km, semi 21,0975 km (World Athletics, Wikipédia).
Défauts mineurs connus : « 1/50 000 » (écran 06) s'affiche 1,2 s après le « 1 » dit ; étiquettes « × 25 000 » proches de leur flèche ; short : le cadre de la carte finale mord sur « Ceinture blanche ». L'audit ne contrôle pas les grands nombres à espace (« 25 000 » sort en AUDIT-ABSENT).

## 6e 13-pourcentage-calcul (lot 3, rendu le 31/10)
**Paysage** `6e-prop-pourcentage-calcul` — 3:15, ceinture verte — centres `velo`, `argent-budget`
```json
[
  {"t":"00:42","question":"Combien font 10 % de 150 € ?","choix":["15 €","140 €","1 500 €"],"reponse":0,"explication":"150 ÷ 10 = 15 €."},
  {"t":"01:47","question":"Un casque coûte 40 €. Combien font 25 % de 40 € ?","choix":["15 €","25 €","10 €"],"reponse":2,"explication":"25 %, c'est le quart : 40 ÷ 4 = 10 €."}
]
```
**Short** `6e-prop-pourcentage-calcul-short` — 0:52, ceinture blanche — centres `jeux-defis`
```json
[
  {"t":"00:23","question":"10 % de 70 ?","choix":["7","60","700"],"reponse":0,"explication":"70 ÷ 10 = 7."}
]
```
Question en commentaire : « Combien font 20 % de 70 ? » (14).
Défauts mineurs connus : short, le titre « 10 % en 1 seconde » disparaît à partir de la question ; paysage, les « 8 € » écrits dans la grille sont petits. `BarrePourcent` : passer `etiquette=False` (l'étiquette n'attend pas la voix) ; `remplir()` ne fait qu'une couleur → `.grille.colorier(…)` par rangée.

## 6e 11-pourcentage-comprendre (lot 3, rendu le 31/10)
**Paysage** `6e-prop-pourcentage-comprendre` — 3:28, ceinture verte — centres `animaux`, `chiens-chats`
```json
[
  {"t":"01:01","question":"Un refuge de 100 animaux. 30 sont des chiens. Quel pourcentage de chiens ?","choix":["30 %","70 %","3 %"],"reponse":0,"explication":"30 sur 100, c'est 30 %."},
  {"t":"02:07","question":"Un refuge a 20 animaux. 5 sont des lapins. Quel pourcentage de lapins ?","choix":["5 %","25 %","20 %"],"reponse":1,"explication":"20 × 5 = 100, alors 5 × 5 = 25 : 25 sur 100, c'est 25 %."}
]
```
**Short** `6e-prop-pourcentage-comprendre-short` — 0:55, ceinture blanche — centres `technologie-ia`
```json
[
  {"t":"00:19","question":"La batterie affiche 50 %. Elle est remplie à…","choix":["la moitié","50 cases sur 50","5 cases"],"reponse":0,"explication":"50 cases sur 100 : la moitié."}
]
```
Question en commentaire : « La batterie affiche 75 %. Combien de cases sont vides ? » (25).
`BarrePourcent` mode « chargement » trop limité pour un short → classe `Batterie` dans `prop_pourcentage_comprendre_short.py` (réutilisable).

## 6e 12-pourcentage-lire (lot 3, rendu le 31/10)
**Paysage** `6e-prop-pourcentage-lire` — 3:14, ceinture verte — centres `cuisine`
```json
[
  {"t":"00:51","question":"Un chocolat au lait contient 30 % de cacao. Combien de cacao dans 100 g ?","choix":["70 g","30 g","3 g"],"reponse":1,"explication":"30 %, c'est 30 sur 100 : 30 g de cacao dans 100 g."},
  {"t":"01:55","question":"Une pâte à tartiner contient 20 % de noisettes. Combien de noisettes dans un pot de 200 g ?","choix":["20 g","220 g","40 g"],"reponse":2,"explication":"20 g pour 100 g. 200 g, c'est 2 fois plus : 40 g de noisettes."}
]
```
**Short** `6e-prop-pourcentage-lire-short` — 0:58, ceinture blanche — centres `mode`
```json
[
  {"t":"00:22","question":"Combien de polyester dans ce tee-shirt de 100 g ?","choix":["40 g","60 g","4 g"],"reponse":0,"explication":"40 %, c'est 40 g sur 100 g."}
]
```
Question en commentaire : « Un sweat de 200 g contient 60 % de coton. Combien de grammes de coton ? » (120).
Fait réel (31/10) : dans un chocolat noir à 70 %, le reste est surtout du sucre (allodocteurs.fr, Test-Achats).
⚠️ Leçon : un `Indicate` coloré sur toute la grille de `BarrePourcent` la colore entière un instant (on croit voir 100 %) → `Circumscribe` ou un cadre (corrigé dans la paysage ET le short).

## 6e 14-pourcentage-defi (lot 3, rendu le 31/10)
**Paysage** `6e-prop-pourcentage-defi` — 2:55, ceinture verte — centres `musique`, `jeux-defis`
```json
[
  {"t":"00:31","question":"Deuxième jour : 50 % des 200 billets. Combien ?","choix":["50 billets","100 billets","150 billets"],"reponse":1,"explication":"50 %, c'est la moitié. 200 ÷ 2 = 100 billets."},
  {"t":"01:39","question":"Un stand vend 12 crêpes sur 50. Quel pourcentage ?","choix":["12 %","24 %","62 %"],"reponse":1,"explication":"50 × 2 = 100. 12 × 2 = 24. 24 %."}
]
```
**Short** `6e-prop-pourcentage-defi-short` — 1:01, ceinture blanche — centres `football`, `jeux-defis`
```json
[
  {"t":"00:22","question":"Lina : 15 buts sur 50 tirs. Quel pourcentage ?","choix":["15 %","30 %","35 %"],"reponse":1,"explication":"50 × 2 = 100. 15 × 2 = 30 %."}
]
```
Question en commentaire : « Un joueur marque 18 buts sur 25 tirs. Combien de pour cent ? » (72 %).
Leçon du 12 appliquée : `Circumscribe` au lieu d'`Indicate` sur les grilles et les jauges. Défaut mineur : sur l'écran du piège, « pas » est un peu plus haut que les nombres dans « Le total : 20, pas 100 ».

## 4e 11-agrandissement-rapport (lot 4, rendu le 31/10)
**Paysage** `4e-prop-agrandissement-rapport` — 4:08, ceinture verte — centres `art-design`, `reseaux-sociaux`
```json
[
  {"t":"00:54","question":"Une photo mesure 8 cm sur 12 cm. On l'agrandit avec un rapport 2. Quelle est sa nouvelle longueur ?","choix":["14 cm","24 cm","10 cm"],"reponse":1,"explication":"12 × 2 = 24 cm. On multiplie, on n'ajoute pas."},
  {"t":"02:19","question":"Un timbre mesure 3 cm de haut. Son agrandissement mesure 15 cm de haut. Quel est le rapport d'agrandissement ?","choix":["12","18","5"],"reponse":2,"explication":"15 ÷ 3 = 5. Le rapport est 5."}
]
```
**Short** `4e-prop-agrandissement-rapport-short` — 1:22, ceinture blanche — centres `animaux`, `reseaux-sociaux`
```json
[
  {"t":"00:30","question":"Une photo de 5 cm sur 7 cm est agrandie avec un rapport 3. Elle mesure…","choix":["8 cm sur 10 cm","15 cm sur 21 cm","15 cm sur 7 cm"],"reponse":1,"explication":"5 × 3 = 15 ; 7 × 3 = 21. On multiplie tout."}
]
```
Question en commentaire : « Une photo de 6 cm sur 9 cm est agrandie : sa largeur devient 30 cm. Combien mesure sa hauteur ? » (45 cm).
Défauts mineurs : short, « On multiplie tout. » effleure la tête de Ti Margo ; paysage, le timbre de 3 cm est minuscule (vrai rapport 5), « + 20 cm » barré mord un peu la flèche rouge.

## 4e 12-agrandissement-aire (lot 4, rendu le 31/10)
**Paysage** `4e-prop-agrandissement-aire` — 4:30, ceinture verte — centres `cuisine`
```json
[
  {"t":"00:59","question":"On double toutes les longueurs d'un carré. Son aire est multipliée par…","choix":["2","4","8"],"reponse":1,"explication":"2 × 2 = 4. L'aire est multipliée par 4."},
  {"t":"02:06","question":"Le dessus d'un gâteau : 300 cm². On l'agrandit avec un rapport 2. Quelle est la nouvelle aire ?","choix":["600 cm²","1 200 cm²","2 400 cm²"],"reponse":1,"explication":"Rapport 2 : aire × 4. 300 cm² × 4 = 1 200 cm²."},
  {"t":"03:08","question":"L'aire d'un gâteau a été multipliée par 9. Et ses longueurs ?","choix":["× 9","× 3","× 81"],"reponse":1,"explication":"3 × 3 = 9. Les longueurs : × 3."}
]
```
**Short** `4e-prop-agrandissement-aire-short` — 1:07, ceinture blanche — centres `cuisine`
```json
[
  {"t":"00:29","question":"Une pizza de 45 cm et une pizza de 15 cm. La grande vaut combien de petites ?","choix":["3","9","27"],"reponse":1,"explication":"3 fois plus large : 3 × 3 = 9 petites pizzas."}
]
```
Question en commentaire : « Une pizza géante de 60 cm vaut combien de pizzas de 15 cm ? » (16).
Short : on pave les BOÎTES carrées (des disques ne pavent pas un disque). Deux rendus HD du short (un contact au bord à 28,5 s au premier).

## 4e 13-agrandissement-volume (lot 4, rendu le 31/10)
**Paysage** `4e-prop-agrandissement-volume` — 4:01, ceinture verte — centres `animaux`, `sciences`
```json
[
  {"t":"00:59","question":"On double toutes les longueurs d'un cube de 1 L. Son nouveau volume ?","choix":["2 L","4 L","8 L"],"reponse":2,"explication":"2 × 2 × 2 = 8 ; le cube contient 8 L."},
  {"t":"02:03","question":"Un bac de 10 L est agrandi avec un rapport 3. Son nouveau volume ?","choix":["30 L","90 L","270 L"],"reponse":2,"explication":"3 × 3 × 3 = 27 ; 10 × 27 = 270 L."}
]
```
**Short** `4e-prop-agrandissement-volume-short` — 0:50, ceinture blanche — centres `jeux-defis`
```json
[
  {"t":"00:17","question":"Un dé 3 fois plus grand dans chaque sens. Combien de petits dés ?","choix":["3","9","27"],"reponse":2,"explication":"3 × 3 × 3 = 27 dés."}
]
```
Question en commentaire : « Un dé 4 fois plus grand dans chaque sens : combien de petits dés faut-il ? » (64).
Défaut mineur : « 40 L » et « 80 L » barrés d'une croix rouge, un peu durs à lire. Le short importe les pavés en perspective du script paysage.

## 4e 14-grandeur-produit (lot 4, rendu le 31/10)
**Paysage** `4e-prop-grandeur-produit` — 3:42, ceinture verte — centres `sciences`, `argent-budget`
```json
[
  {"t":"00:54","question":"Un four de 3 kW chauffe pendant 2 h. Quelle énergie consomme-t-il ?","choix":["6 kWh","1,5 kW/h","5 kWh"],"reponse":0,"explication":"3 kW × 2 h = 6 kWh."},
  {"t":"01:58","question":"Laquelle est une grandeur produit ?","choix":["une aire, en m²","une vitesse, en km/h","un prix, en €/kg"],"reponse":0,"explication":"Une aire, c'est une longueur fois une largeur : un produit."}
]
```
**Short** `4e-prop-grandeur-produit-short` — 1:08, ceinture blanche — centres `sport`
```json
[
  {"t":"00:31","question":"105 m × 68 m : quelle est l'unité du résultat ?","choix":["m","m²","m³"],"reponse":1,"explication":"Deux longueurs multipliées donnent des mètres carrés."}
]
```
Question en commentaire : « Un terrain de basket mesure 28 m sur 15 m. Quelle est son aire ? » (420 m²).
Sources : EDF tarif réglementé au 1/08/2025 ≈ 0,1952 €/kWh ; FIFA 105 × 68 m ; FIBA 28 × 15 m. Défauts mineurs : la coche de la question 2 frôle « m² » ; « pour un seul radiateur ! » un peu petit.

## 4e 15-grandeur-quotient (lot 4, rendu le 31/10)
**Paysage** `4e-prop-grandeur-quotient` — 3:21, ceinture verte — centres `transports`, `argent-budget`
```json
[
  {"t":"00:53","question":"Un train : 450 km en 3 heures. Sa vitesse moyenne ?","choix":["150 km/h","150 h/km","1 350 km/h"],"reponse":0,"explication":"450 km ÷ 3 h = 150 km/h."},
  {"t":"02:03","question":"4 kg de pommes : 10 €. Le prix au kilo ?","choix":["0,40 €/kg","2,50 €/kg","40 €/kg"],"reponse":1,"explication":"10 € ÷ 4 kg = 2,50 €/kg."}
]
```
**Short** `4e-prop-grandeur-quotient-short` — 1:15, ceinture blanche — centres `musique`, `corps-sante`
```json
[
  {"t":"00:33","question":"60 battements en 30 secondes. Combien de BPM ?","choix":["120 BPM","30 BPM","2 BPM"],"reponse":0,"explication":"30 s : une demi-minute. 1 min : 60 × 2 = 120 BPM."}
]
```
Question en commentaire : « Une chanson fait 25 battements en 10 secondes. Combien de BPM ? » (150).
Sources : TGV jusqu'à 320 km/h (sites secondaires) ; cœur au repos 60 à 100 /min (procédure de soins du CHUV).

## 4e 16-grandeur-unite (lot 4, rendu le 31/10)
**Paysage** `4e-prop-grandeur-unite` — 3:29, ceinture verte — centres `histoire-geographie`
```json
[
  {"t":"00:55","question":"Que veut dire 20 000 hab/km² ?","choix":["20 000 hab pour 1 km²","20 000 km² pour 1 hab","20 000 hab en tout"],"reponse":0,"explication":"« Par » veut dire « pour 1 » : 20 000 habitants pour 1 km²."},
  {"t":"01:46","question":"On divise des litres (L) par des minutes (min). L'unité du résultat ?","choix":["L/min","min/L","L × min"],"reponse":0,"explication":"L ÷ min = L/min : des litres par minute, c'est un débit."}
]
```
**Short** `4e-prop-grandeur-unite-short` — 1:15, ceinture blanche — centres `espace`, `sciences`
```json
[
  {"t":"00:31","question":"300 000 km/s, ça veut dire…","choix":["300 000 km en 1 s","300 000 s pour 1 km","300 000 km en tout"],"reponse":0,"explication":"« Par » veut dire « pour 1 » : 300 000 km en 1 seconde."}
]
```
Question en commentaire : « La Lune est à environ 384 000 km. Combien de secondes sa lumière met-elle pour arriver jusqu'à nous ? » (≈ 1,3 s).
Sources : Insee, Paris ≈ 2,1 millions (population légale 2022) sur 105 km² ; c = 299 792 km/s (BIPM) ; Terre-Lune 384 400 km (NASA). Le trajet Lune → Terre dure 1,28 s à l'écran (clin d'œil à la réponse). Défauts mineurs : les coches touchent presque « km² » (paysage) et « 1 s » (short). Deux rendus HD du short. La paysage hérite de `PropAgrandissementRapportBase` (ép. 11).

## 4e 19-grandeur-defi (lot 4, rendu le 01/11)
**Paysage** `4e-prop-grandeur-defi` — 4:15, ceinture verte — centres `nature-ecologie`, `argent-budget`
```json
[
  {"t":"01:09","question":"4 ha : 28 t de blé. Quel est le rendement ?","choix":["7 t/ha","7 ha/t","112 t/ha"],"reponse":0,"explication":"28 t ÷ 4 ha = 7 t/ha : on ramène à 1 hectare."},
  {"t":"02:00","question":"Une pompe tourne 2,5 h. En heures et minutes ?","choix":["2 h 50 min","2 h 30 min","250 min"],"reponse":1,"explication":"0,5 h, c'est la moitié de 60 min : 30 min. Donc 2 h 30 min."}
]
```
**Short** `4e-prop-grandeur-defi-short` — 1:29, ceinture blanche — centres `argent-budget`, `cuisine`
```json
[
  {"t":"00:40","question":"1 kg à 5 €, ou 2 kg à 11 € : le moins cher au kilo ?","choix":["le 1 kg","le 2 kg","c'est pareil"],"reponse":0,"explication":"11 € ÷ 2 kg = 5,50 €/kg : plus cher que 5 €/kg !"}
]
```
Question en commentaire : « 1,5 L pour 2,70 € ou 2 L pour 3,40 € : lequel est le moins cher au litre ? » (2 L : 1,70 €/L contre 1,80 €/L).
Sources : Agreste, blé tendre 2025 ≈ 7,4 t/ha ; champ, pompe, magasins et prix des céréales inventés. Défauts mineurs : les cadres verts de « 70 t » et « 15 h » frôlent le mot qui les précède. Le convertisseur de marques de l'agent pose une marque par occurrence même à travers la ponctuation (« 21 tonnes. 21 tonnes »).

## 4e 18-grandeur-coherence (lot 4, rendu le 01/11)
**Paysage** `4e-prop-grandeur-coherence` — 4:05, ceinture verte — centres `sport`, `sciences`
```json
[
  {"t":"01:00","question":"Quelle unité pour l'aire du fond du bassin ?","choix":["le mètre (m)","le mètre carré (m²)","le mètre cube (m³)"],"reponse":1,"explication":"50 m × 25 m = 1 250 m². Deux longueurs multipliées : une aire."},
  {"t":"01:52","question":"Combien de litres y a-t-il dans 1 m³ ?","choix":["100 L","1 000 L","10 L"],"reponse":1,"explication":"10 × 10 × 10 = 1 000 dm³, et 1 dm³ = 1 L : 1 000 L."},
  {"t":"02:34","question":"Peut-on additionner 150 m et 1 250 m² ?","choix":["oui, ça fait 1 400 m","oui, ça fait 1 400 m²","non, pas les mêmes grandeurs"],"reponse":2,"explication":"Une longueur et une aire ne s'additionnent pas."}
]
```
**Short** `4e-prop-grandeur-coherence-short` — 1:17, ceinture blanche — centres `jeux-defis`
```json
[
  {"t":"00:33","question":"Un élève écrit : la piscine contient 400 m² d'eau.","choix":["c'est juste","faux : des m³","juste si on arrondit"],"reponse":1,"explication":"L'eau remplit un volume : des mètres cubes, ou des litres."}
]
```
Question en commentaire : « Un terrain de handball mesure 40 m sur 20 m. Un élève écrit 800 m³. Corrige-le : son aire, avec la bonne unité ! » (800 m²).
Sources : bassin olympique 50 × 25 m, 2 m de profondeur au moins (World Aquatics FR 2) ; handball 40 × 20 m (IHF) ; pompe de 50 m³/h inventée. Défauts mineurs : dans le short, la roue avant du scooter frôle « 45 h/km » barré ; dans la paysage, le choix C de la question 3 tient sur deux lignes.
