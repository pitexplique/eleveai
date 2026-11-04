# Rapports — vidéos dénombrement / VA Terminale

## va_somme — Somme de variables aléatoires (Tle spé)

- **Fichiers** : `manim/scripts/terminale/proba_va_somme.py` (ProbaVaSommeTerminale), `proba_va_somme_short.py` (ProbaVaSommeShort), marques `proba_va_somme[_short]_marques.json`, sons `public/sons/terminale-proba-va-somme[-short]/`.
- **Sorties** : `manim/sorties/terminale/maths/probabilites/va-somme/eleveai-maths-terminale-proba-va-somme.mp4` (6:07, 1920×1080, ceinture **verte**) et `…-short.mp4` (1:33, 1080×1920, ceinture **blanche**).
- **Centres** : paysage `["corps-sante", "argent-budget"]` (Maëlle, actuaire en mutuelle) ; short `["jeux-defis"]` (Chloé, créatrice de jeux de société).
- **Chapitres paysage** : 00:00 Accroche · 00:18 Titre · 00:25 Maëlle, actuaire · 00:47 E(X+Y) = E(X)+E(Y) · 01:10 aX + b · 01:36 Question 1 · 02:15 Indépendance : les variances s'additionnent · 02:45 Question 2 · 03:27 La loi binomiale, somme de Bernoulli · 04:09 Somme de 100 adhérents · 04:34 Question 3 · 05:09 Le secret de l'assurance · 05:34 Ce que tu as appris · 06:00 Fin
- **Questions paysage** :
```json
[{"t":"01:36","question":"V(X) = 2 500. Que vaut V(1,2X + 30) ?","choix":["3 000","3 600","3 030"],"reponse":1,"explication":"1,2² = 1,44 ; 1,44 × 2 500 = 3 600. Le 30 ne compte pas ; 3 000, c'est oublier le carré."},
 {"t":"02:45","question":"X et Y indépendantes, de variance 2 500 chacune. Que vaut V(X − Y) ?","choix":["0","5 000","2 500"],"reponse":1,"explication":"V(−Y) = (−1)² × 2 500 = 2 500 ; les variances s'additionnent : 5 000. Soustraire ne retire pas le hasard."},
 {"t":"04:34","question":"σ d'un adhérent = 50. Pour 100 adhérents indépendants, σ du total ?","choix":["5 000","500","50"],"reponse":1,"explication":"On additionne les variances, pas les écarts-types : σ × √100 = σ × 10 = 500."}]
```
- **Questions short** :
```json
[{"t":"00:22","question":"Quelle est l'espérance de la somme de 2 dés ?","choix":["3,5","7","12"],"reponse":1,"explication":"3,5 + 3,5 = 7, et 7 est la somme la plus fréquente."}]
```
- **Contrôles** : à la dernière passe en basse définition, 0 AUDIT-AVANCE, 0 RETARD, 0 BORD et 0 MARGO sur les deux vidéos ; `verifier-bords-video.py` : « 0 instants » sur les deux HD.
- **Planches** : 8 images en basse définition puis 12 en HD, regardées pour les deux vidéos. Questions à 3 boutons avec compte à rebours (5 s / 3 s), correction en vert et piège en rouge, « Ce que tu as appris » en haut et centré, Ti Margo sur chaque écran, échelle des ceintures visible.
- **Reste à savoir** :
  - Les milliers (« 2 500 », « 5 000 ») sortent en AUDIT-ABSENT parce que l'audit ne normalise pas la voix ; ils sont calés à la main.
  - Un repère a été mis à la main dans le paysage, `au_temps(9.0)` sur l'écran 07b : cues2marques fusionne les deux « 2 500 » consécutifs.
  - Dans le short à 0:45, il y a un fondu enchaîné de 0,5 s entre « Question ! » et « la somme la plus fréquente » au même endroit.
  - Voix inchangées. Rien n'est commité. Pas de miniature, de manifeste ni de R2.

## reconnaitre + produit-somme — dénombrement Tle spé

**Fichiers** (scripts `manim/scripts/terminale/`, sorties `manim/sorties/terminale/maths/probabilites/denombrement-<slug>/`) :
- `denombrement_reconnaitre.py` → `eleveai-maths-terminale-denombrement-reconnaitre.mp4` — **5:09**, ceinture **verte** (carte bancaire, Inès cybersécurité, k-uplets / distincts / parties, piège, tiercé). Centres : technologie-ia, argent-budget, chevaux, jeux-defis.
- `denombrement_reconnaitre_short.py` → `…-reconnaitre-short.mp4` — **1:25**, ceinture **blanche** (ADN, Lina biologiste ; surprise : 16 mots trop peu pour 20 acides aminés, 4³ = 64 suffit). Centres : sciences, corps-sante.
- `denombrement_produit_somme.py` → `eleveai-maths-terminale-denombrement-produit-somme.mp4` — **3:55**, ceinture **verte** (Lisbonne, Clara conseillère en voyages, arbre 3/12/60, produit cartésien, cas disjoints, piège Venn 30 + 20 − 12). Centres : transports, avions, histoire-geographie.
- `denombrement_produit_somme_short.py` → `…-produit-somme-short.mp4` — **1:18**, ceinture **blanche** (Yanis styliste, 60 tenues = 2 mois, casquettes → 180 = 6 mois). Centres : mode, art-design.
- Voix : WAV dans `public/sons/terminale-denombrement-*` (débit −6), marques `manim/scripts/terminale/denombrement_*_marques.json`. Voix **inchangées** (aucune erreur relevée).

**Questions**
```json
{"reconnaitre": [
 {"t":"01:14","question":"Un code de 6 chiffres, répétitions permises. Combien de codes ?","choix":["60","1 000 000","151 200"],"reponse":1,"explication":"L'ordre compte et on peut répéter : 10 choix par case, 10⁶ = 1 000 000."},
 {"t":"03:16","question":"Une équipe de 3 joueurs parmi 10 copains. C'est :","choix":["un 3-uplet avec répétitions","un 3-uplet d'éléments distincts","une partie à 3 éléments"],"reponse":2,"explication":"Pas d'ordre dans une équipe et pas deux fois le même : une partie (une combinaison)."},
 {"t":"03:50","question":"Une course de 15 chevaux : les trois premiers, dans l'ordre. Ton pari est :","choix":["une partie à 3 éléments","un 3-uplet d'éléments distincts","un 3-uplet avec répétitions"],"reponse":1,"explication":"L'ordre compte, un cheval ne finit pas deux fois : 15 × 14 × 13 = 2 730 paris."}],
 "reconnaitre-short": [
 {"t":"00:24","question":"Mots de 2 lettres avec A, C, G, T ?","choix":["8","12","16"],"reponse":2,"explication":"4 choix pour chaque lettre, répétition permise : 4 × 4 = 16."}],
 "produit-somme": [
 {"t":"01:18","question":"Clara ajoute un choix : avec ou sans voiture. Combien de voyages ?","choix":["62","120","14"],"reponse":1,"explication":"Une étape de plus à 2 choix : 60 × 2 = 120 voyages."},
 {"t":"02:40","question":"6 vols ou 4 bus, puis 2 classes. Combien de façons de voyager ?","choix":["48","12","20"],"reponse":2,"explication":"« ou » : 6 + 4 = 10 trajets ; « et » : 10 × 2 = 20."}],
 "produit-somme-short": [
 {"t":"00:30","question":"2 casquettes, ou aucune : combien de tenues ?","choix":["120","180","62"],"reponse":1,"explication":"Casquette 1, casquette 2 ou rien : 3 choix, 60 × 3 = 180 tenues."}]}
```

**Chapitres reconnaitre** : 00:00 Le code de la carte · 00:21 Inès, ingénieure en cybersécurité · 00:44 Premier cas : ordre et répétitions · 01:14 Question · 01:49 Deuxième cas : éléments distincts · 02:23 Troisième cas : une partie · 02:51 Le piège · 03:16 Questions : l'équipe, le tiercé · 04:28 Le conseil d'Inès · 04:40 Ce que tu as appris.

**Chapitres produit-somme** : 00:00 Un voyage à Lisbonne · 00:21 Clara, conseillère en voyages · 00:34 L'arbre des voyages · 00:53 Le principe multiplicatif · 01:18 Question · 01:50 Le principe additif · 02:17 Le piège : des cas qui se chevauchent · 02:40 Question · 03:20 Le métier de Clara · 03:31 Ce que tu as appris.

**Bords / synchro** : dry runs 0 AVANCE, 0 RETARD, 0 BORD sur les 4 ; `verifier-bords-video.py` = 0 instant sur les 4 rendus (le short des tenues a été rendu DEUX fois : le 1er touchait le bord gauche 1 image à 54,5 s, « 3 choix » en entrée zoomée).

**Planches** : chevauchements corrigés avant rendu (accroche « un hôtel / une excursion », cardinaux 3-4-5 sur « produit cartésien », rappel « ou/et » sur la carte réponse, « Ce que tu as appris » trop petit, en-tête « Question ! » resté sous « 3 choix » et « À toi » dans le short des tenues). Finales regardées : propres.

**Soucis restants** (mineurs) : questions 08/09 de reconnaitre, les trois cartes n'ont pas la même taille de police (texte réduit à la largeur de la carte) ; « oui » frôle sa flèche dans le schéma du piège. Rien committé, ni miniature, ni manifeste, ni R2.

## arrangement-combinaison + coefficient-binomial (Tle spé)

- **Fichiers** : `manim/scripts/terminale/denombrement_arrangement_combinaison.py` (DenombrementArrangementCombinaisonTerminale), `denombrement_arrangement_combinaison_short.py` (DenombrementArrangementCombinaisonShort), `denombrement_coefficient_binomial.py` (DenombrementCoefficientBinomialTerminale), `denombrement_coefficient_binomial_short.py` (DenombrementCoefficientBinomialShort) ; marques `denombrement_*_marques.json` ; sons `public/sons/terminale-denombrement-*/`.
- **Sorties** (`manim/sorties/terminale/maths/probabilites/`) :
  - `denombrement-arrangement-combinaison/eleveai-maths-terminale-denombrement-arrangement-combinaison.mp4` — 4:36, 1920×1080, ceinture **verte** (Léa, organisatrice de tournois d'e-sport)
  - `…/eleveai-maths-terminale-denombrement-arrangement-combinaison-short.mp4` — 1:24, 1080×1920, ceinture **blanche** (Hugo, magicien : 52 cartes, 52! unique)
  - `denombrement-coefficient-binomial/eleveai-maths-terminale-denombrement-coefficient-binomial.mp4` — 4:20, 1920×1080, ceinture **verte** (Nadia, compositrice de musiques de films : accords de 3 notes parmi 12)
  - `…/eleveai-maths-terminale-denombrement-coefficient-binomial-short.mp4` — 1:16, 1080×1920, ceinture **blanche** (Enzo, pizzaïolo : 2¹⁰ = 1 024 pizzas, 2²⁰ = 1 048 576)
- **Centres** : arrangement paysage `["jeux-video", "jeux-defis"]`, short `["jeux-defis", "sciences"]` ; coefficient paysage `["musique", "cinema-series"]`, short `["cuisine"]`.
- **Chapitres arrangement (paysage)** : 00:00 Accroche · 00:10 Titre · 00:18 Léa, organisatrice de tournois · 00:30 Les podiums : 8 × 7 × 6 · 00:52 Les k-uplets d'éléments distincts · 01:16 Les permutations : n! · 01:38 Question 1 · 02:04 Un groupe sans ordre · 02:28 Les combinaisons · 02:42 Le piège · 03:03 Question 2 · 03:35 Question 3 · 04:08 Ce que tu as appris · 04:29 Fin
- **Chapitres coefficient (paysage)** : 00:00 Accroche · 00:11 Titre · 00:18 Nadia, compositrice · 00:33 L'ordre ne compte pas · 00:49 Avec l'ordre, puis ÷ 3! · 01:05 La formule de k parmi n · 01:28 Question 1 · 01:56 La symétrie · 02:12 Question 2 · 02:44 Les parties d'un ensemble : 2ⁿ · 03:06 Le piège · 03:23 Question 3 · 03:50 Ce que tu as appris · 04:12 Fin
- **Questions arrangement paysage** :
```json
[{"t":"01:38","question":"5 joueurs passent un par un pour un défi. Combien d'ordres de passage ?","choix":["25","120","5"],"reponse":1,"explication":"5! = 5 × 4 × 3 × 2 × 1 = 120."},
 {"t":"03:03","question":"Léa tire 2 équipes parmi les 8 pour le match d'ouverture. Combien de matchs possibles ?","choix":["56","28","64"],"reponse":1,"explication":"Échanger les deux équipes donne le même match : l'ordre ne compte pas. 8 × 7 ÷ 2 = 28 matchs."},
 {"t":"03:35","question":"Dans une équipe de 5 joueurs, on nomme un capitaine et un vice-capitaine. Combien de choix ?","choix":["10","20","25"],"reponse":1,"explication":"Les deux rôles sont différents : l'ordre compte. 5 × 4 = 20. 10, c'est si on oublie les rôles."}]
```
- **Questions arrangement short** :
```json
[{"t":"00:24","question":"Et avec 4 cartes, combien d'ordres ?","choix":["16","24","10"],"reponse":1,"explication":"4 × 3 × 2 × 1 = 24. Chaque carte ajoutée multiplie tout."}]
```
- **Questions coefficient paysage** :
```json
[{"t":"01:28","question":"Combien vaut 2 parmi 5 ?","choix":["10","20","25"],"reponse":0,"explication":"5 × 4 ÷ 2 = 10. 20, c'est en comptant l'ordre ; 25, c'est 5²."},
 {"t":"02:12","question":"Combien vaut 18 parmi 20 ?","choix":["380","190","20"],"reponse":1,"explication":"Par symétrie, 18 parmi 20 = 2 parmi 20 = 20 × 19 ÷ 2 = 190. Pas besoin de calculer 20 factorielle."},
 {"t":"03:23","question":"Un ensemble à 5 éléments a combien de parties ?","choix":["25","32","31"],"reponse":1,"explication":"2⁵ = 32, sans oublier la partie vide ni l'ensemble entier."}]
```
- **Questions coefficient short** :
```json
[{"t":"00:23","question":"Avec 3 garnitures, combien de pizzas (la pizza sans rien comprise) ?","choix":["6","9","8"],"reponse":2,"explication":"2 × 2 × 2 = 2³ = 8 pizzas."}]
```
- **Contrôles** :
  - Dernier dry run `AUDIT=1 BORDS=1` : 0 AUDIT-AVANCE, 0 RETARD et 0 BORD/MARGO sur les quatre vidéos.
  - Il reste un seul AUDIT-TARD, sur « 8! » dans l'arrangement paysage, écran 08. Il vient de cues2marques, qui fusionne les deux « 8 » consécutifs ; le décalage réel est d'environ 0,26 s.
  - `verifier-bords-video.py` donne « 0 instants » sur les quatre HD.
- **Planches** : 8 images en basse définition puis 12 en HD, regardées pour chaque vidéo. Les débordements et chevauchements vus en basse définition ont été corrigés avant la HD : lignes de question, Ti Margo, « Enzo / pizzaïolo », grille 1 024, « L'ordre ne compte pas ». Dans le short coefficient, un rendu HD a été refait après la correction « Enzo / pizzaïolo ».
- **Reste à savoir** :
  - Coefficient paysage : à 0:48, la ligne « Do, do, mi ~~impossible~~ » est très proche du binôme 3 parmi 12. Rien ne se chevauche.
  - « Pas besoin de calculer 20! » à l'écran correspond à la voix (« 20 factorielle »).
  - Voix inchangées. Rien n'est commité. Pas de miniature, de manifeste ni de R2.

## pascal + defi — relation de Pascal, exercice type bac (Tle spé)

**Fichiers** (scripts `manim/scripts/terminale/`, sorties `manim/sorties/terminale/maths/probabilites/denombrement-<slug>/`) :
- `denombrement_pascal.py` → `denombrement-pascal/eleveai-maths-terminale-denombrement-pascal.mp4` — **4:35**, ceinture **verte** (chemins chez toi → lycée sur une grille, Mélissa urbaniste, cases 1-2-3…10 = 2 parmi 5, triangle, relation, pourquoi avec Sam, arbre → binomiale, piège « descend ET avance d'un cran »). Centres : transports, jeux-defis.
- `denombrement_pascal_short.py` → `…-pascal-short.mp4` — **1:27**, ceinture **blanche** (triangle des nombres en haut, billes en bas ; impairs coloriés → Sierpinski sur 32 lignes ; Rosa designer textile et son foulard ; commentaire : somme de la ligne). Centres : art-design, mode.
- `denombrement_defi.py` → `denombrement-defi/eleveai-maths-terminale-denombrement-defi.mp4` — **5:13**, ceinture **bleue** (20 rivets dont 4 défectueux, 3 prélevés ; Karima ingénieure qualité aéronautique ; énoncé en 3 questions rédigé en lignes ; vérification 560 + 480 + 96 + 4 = 1 140 ; piège 4 × 171 = 684 ; P ≈ 0,51 ; défi 10 pièces). Centres : avions, technologie-ia.
- `denombrement_defi_short.py` → `…-defi-short.mp4` — **1:21**, ceinture **blanche** (poignées de main ; Fatou organisatrice de congrès ; 4 personnes ↔ 6 traits ; 30 élèves = 435 poignées ≈ 22 minutes ; commentaire : 12 personnes). Centres : jeux-defis.
- Voix **inchangées** (aucune erreur relevée), débit −6 ; marques `denombrement_{pascal,pascal_short,defi,defi_short}_marques.json`.

**Questions**
```json
{"pascal": [
 {"t":"01:12","question":"Grille de 4 rues vers l'est et 4 rues vers le nord. Combien de chemins ?","choix":["16","70","256"],"reponse":1,"explication":"8 déplacements dont 4 vers le nord : on choisit leurs places, 4 parmi 8 = 70."},
 {"t":"03:09","question":"Ligne 5 : 1, 5, 10, 10, 5, 1. Quelle est la ligne 6 ?","choix":["1, 6, 15, 20, 15, 6, 1","1, 6, 10, 20, 10, 6, 1","1, 5, 15, 20, 15, 5, 1"],"reponse":0,"explication":"On additionne deux voisins : 1 + 5 = 6, 5 + 10 = 15, 10 + 10 = 20. La somme vaut 64 = 2⁶."}],
 "pascal-short": [
 {"t":"00:20","question":"Quelle ligne vient après 1, 4, 6, 4, 1 ?","choix":["1, 5, 10, 10, 5, 1","1, 5, 11, 11, 5, 1","1, 4, 10, 10, 4, 1"],"reponse":0,"explication":"Chaque nombre est la somme des deux du dessus : 1 + 4 = 5, 4 + 6 = 10."}],
 "defi": [
 {"t":"01:11","question":"Le nombre de prélèvements possibles est :","choix":["20³","20 × 19 × 18","3 parmi 20"],"reponse":2,"explication":"Simultané : pas d'ordre, pas de répétition. 3 parmi 20 = 20 × 19 × 18 / 6 = 1 140."},
 {"t":"02:02","question":"Exactement 1 rivet défectueux. Combien de prélèvements ?","choix":["4 + 120, soit 124","4 × 120, soit 480","4 × 560, soit 2 240"],"reponse":1,"explication":"1 défectueux parmi 4 ET 2 bons parmi 16 : on multiplie, 4 × 120 = 480."}],
 "defi-short": [
 {"t":"00:23","question":"Poignées de main entre 4 personnes ?","choix":["16","12","6"],"reponse":2,"explication":"Une poignée = 2 personnes sans ordre : 2 parmi 4 = 6. 12 compte chaque poignée deux fois."}]}
```
Défi de fin (defi, 04:02, pas de cartes) : 10 pièces dont 3 défectueuses, 2 prélevées ; au moins une défectueuse ? Correction 04:26 : 45 − 21 = 24, P = 24/45 ≈ 0,53.

**Chapitres pascal** : 00:00 Le chemin du lycée · 00:16 Mélissa, urbaniste · 00:31 Compter les chemins sur la grille · 00:56 Pourquoi 10 : 2 parmi 5 · 01:12 Question · 01:50 Le triangle de Pascal · 02:15 La relation de Pascal · 02:33 Pourquoi ça marche · 02:52 Le triangle compte les chemins d'un arbre · 03:09 Question · 03:52 Le piège · 04:12 Ce que tu as appris.

**Chapitres defi** : 00:00 La caisse de rivets · 00:16 Karima, ingénieure qualité · 00:29 L'énoncé · 00:57 D'abord, reconnaître · 01:11 Question · 01:43 Rédigeons, comme au bac · 02:02 Question · 02:42 Rédiger la question 3 · 03:00 Vérifions · 03:21 Le piège du « au moins 1 » · 03:43 La probabilité · 04:02 À toi de jouer · 04:26 Correction · 04:49 Ce que tu as appris.

**Bords / synchro** : dry runs 0 AVANCE, 0 RETARD, 0 BORD, 0 MARGO sur les 4 ; `verifier-bords-video.py` = 0 instant sur les 4 rendus finaux. Deux vidéos rendues DEUX fois (rendus séparés, toujours sous le verrou) : le short pascal (la 2e ligne de la question « 1, 4, 6, 4, 1 ? » était mordue par la carte A) et la paysage defi (l'avion recouvrait la fin de « aéronautique »).

**Planches** : chevauchements corrigés avant rendu (étiquette du lycée, routes de l'embouteillage, caisse de l'énoncé, barre de vérification, bulle de Karima, cartes du short des poignées, arcs remplis d'orange, texte dans le cercle des 30). Planches finales de 12 images regardées : propres ; questions, corrections et « Ce que tu as appris » lisibles.

**Soucis restants** (mineurs) : paysage pascal, à la 2e question la coche verte frôle le dernier « 1 » de la carte A ; dans « Pourquoi », la pastille de Sam touche « Sam est choisi ». Les « 1 140 » et quelques données de figure sont en `_pas_audit` (l'audit lit « 1140 » comme absent) ; dans pascal 03, le 4 et le 6 de « et ainsi de suite » s'affichent sans être dits. Rien committé, ni miniature, ni manifeste, ni R2.
