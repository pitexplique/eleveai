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
