# Série FRACTIONS — questions-pauses et centres d'intérêt, par vidéo

Recopié des rapports des agents au fil des lots (consigne : `manim/consigne-videos-fractions.md`). Les temps `t` sont mesurés sur le rendu final ; la passe finale les reporte dans `manim/manifeste-youtube.json` (champs `questions` et `centres`).

## 6e

### 03-egale (fraction_egale) — PILOTE, 24/10
- Paysage `6e-frac-egale` (5:36, ceinture verte, Inès pâtissière : 6/8 L de lait → verre doseur en quarts ; défi tarte 8/12 = 2/3). Centres : `["cuisine"]`.
  ```json
  [{"t":"01:33","question":"7/3 = combien de sixièmes ?","choix":["10","14","7"],"reponse":1,"explication":"3 × 2 = 6, donc 7 × 2 = 14 : 7/3 = 14/6."},
   {"t":"02:47","question":"Laquelle ne se simplifie plus ?","choix":["4/6","3/5","9/12"],"reponse":1,"explication":"3 et 5 ne se divisent pas par un même nombre, à part 1."},
   {"t":"03:39","question":"Simplifie 10/15.","choix":["2/3","8/13","2/15"],"reponse":0,"explication":"10 ÷ 5 = 2 et 15 ÷ 5 = 3 ; les autres réponses tombent dans le piège."}]
  ```
- Short `6e-frac-egale-short` (1:02, ceinture blanche, Malik pizzaïolo : 2/4, 4/8, 6/12 = 1/2). Centres : `["cuisine","jeux-defis"]`. Question en commentaire : « 15/20, c'est combien de quarts ? » (3).
  ```json
  [{"t":"00:31","question":"Laquelle n'est pas égale à 1/2 ?","choix":["3/6","4/6","5/10"],"reponse":1,"explication":"La moitié de 6, c'est 3, pas 4."}]
  ```
- Soucis restants : sur l'écran du piège, « − 2 » et « ÷ 2 » très proches ; quelques lignes de réponse arrivent 1 à 3 s après leur premier nombre (la ligne attend son dernier mot) — à resserrer à 0,4 s dans les lots suivants.

## 4e
