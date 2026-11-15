# Les VOIX à valider — fin de la série SUITES (2e poste, branche `poste2`)

4 épisodes = 4 paysages + 4 shorts. Rien n'est généré : j'attends ton « oui ».

## ⚠️ Ce que j'ai trouvé avant d'écrire : il reste 4 micros, pas 6

Deux des six micros de ta liste ont DÉJÀ leur vidéo, par le mécanisme `aussi` du manifeste :

| Micro Tle spé | Vidéo qui la sert déjà |
|---|---|
| `suite_calculer_termes` | ép. 18 `premiere-spe-suite-termes` (+ son short) — `aussi` : terminale-spe / suite_numerique / suite_calculer_termes |
| `suite_explicite_recurrence` | ép. 19 `premiere-spe-suite-recurrence` (+ son short) — même mécanisme |

C'était le découpage décidé le 10/11 (`manim/REPRISE-suites.md`, table « vidéo COMMUNE »), les 4 entrées `aussi` sont bien dans `manim/manifeste-youtube.json`, et `scripts/brancher-videos-coach.mjs` les déplie en lignes `notion_ressources` : le bouton « Vidéo » du coach apparaîtra donc sur ces deux micros sans rien tourner de plus.

Donc : **je n'ai PAS écrit de voix pour ces deux-là.** Si tu veux quand même deux vidéos propres en Tle (notations Tle, pas « Maths 1re spé » affiché à un élève de terminale), dis-le et je les écris.

## Les 4 épisodes

| Ép. | Classe | Micro | Métier / situation | Centres paysage | Centres short | Lettres justes | Réponse du commentaire |
|---|---|---|---|---|---|---|---|
| 39 | 1re | `expo_fct_prolonger_suite` | Fanta, archéologue (datation au carbone 14) — métier pris dans la matrice métiers | histoire-geographie, sciences | transports, technologie-ia | B puis A ; short C | ≈ 282,8 km (400 × 0,5^0,5) |
| 40 | 1re spé | `exp_suite_geo` | Soraya, pharmacienne hospitalière (élimination d'un médicament) — métier pris dans la matrice métiers | corps-sante | musique, instrument | C puis B ; short A | ≈ 20,2 % (100 × e^(−1,6)) |
| 41 | Tle spé | `integrale_suite` | Marius, concepteur de skateparks (le béton sous la rampe = l'aire) | sport, construction | art-design, jeux-defis | A puis C ; short B | I₉ = 1/10 = 0,1 |
| 42 | Tle spé | `python_suite` | Naïs, chercheuse en intelligence artificielle (l'erreur du modèle qui descend) — métier pris dans la matrice métiers | technologie-ia | reseaux-sociaux | B puis A ; short C | 47 personnes (2 × 23 + 1) |

Ceintures : paysage **verte**, short **blanche** (aucun des 4 micros n'est un micro « défi »).
Durées estimées (à 150 mots/min) : 39 ≈ 4 min 20 / 1 min 10 · 40 ≈ 4 min 40 / 1 min 10 · 41 ≈ 5 min 35 / 1 min 10 · 42 ≈ 4 min 15 / 1 min 05.
Lettres sur le lot : 4 A, 4 B, 4 C ; jamais deux fois la même lettre de suite dans une vidéo.

---

## Épisode 39 — 1re · `expo_fct_prolonger_suite` · la fonction qui prolonge la suite

Ce que dit le coach : « Relier une suite géométrique et la fonction exponentielle qui la prolonge ». Notion `expo_fonction_lecture`.

### PAYSAGE (ceinture verte) — `manim/voix/premiere-suite-expo-prolonger.json`

**00-garde**  
Suite géométrique et fonction exponentielle. Comment calculer une valeur entre deux termes d'une suite ?

**01-situation**  
Voici Fanta. Elle est archéologue : elle date les objets qu'on sort de terre. Dans un os, il y a du carbone 14, et il en disparaît la moitié tous les 5 730 ans. Au départ, 100 %. Après une période, 50 %. Après deux périodes, 25 %. Après trois périodes, 12,5 %.

**02-suite**  
Ces valeurs forment une suite géométrique de raison 0,5. On l'écrit u indice n égale 100 fois 0,5 puissance n. Mais attention : n est un nombre de périodes ENTIER. Cette suite ne sait répondre qu'aux rangs 0, 1, 2, 3.

**03-probleme**  
Or l'os que Fanta vient de sortir de terre contient environ 35,4 % de carbone 14. Ce n'est ni 50 %, ni 25 %. Il est entre une période et deux périodes. Et là, la suite n'a rien à dire.

**04-fonction**  
Alors Fanta change d'outil. Elle prend la fonction f de x égale 100 fois 0,5 puissance x. Celle-là accepte tous les nombres positifs : 1 ; 1,5 ; 2,5… On place d'abord les points de la suite, puis on trace la courbe de f.

**05-question**  
Question ! Que fait cette courbe par rapport aux points de la suite ? A : elle passe sous tous les points. B : elle passe exactement par tous les points. C : elle ne touche les points qu'en x égale 0. Mets pause, et choisis !

**05b-reponse**  
Réponse B. À chaque rang entier, la fonction donne la même valeur que la suite : f de 0 égale 100, f de 1 égale 50, f de 2 égale 25.

**06-prolonge**  
Et voilà ce qu'elle ajoute : f de 1,5 égale 100 fois 0,5 puissance 1,5, soit environ 35,4. C'est l'os de Fanta. 1,5 période, c'est 1,5 fois 5 730, donc 8 595 ans. On dit que la fonction exponentielle PROLONGE la suite géométrique : les points de la suite sont des piquets, la courbe est le fil tendu qui passe par tous les piquets et qui existe partout entre eux.

**07-piege**  
Voilà le piège ! Pour aller de 50 % à 25 %, on est tenté de tirer une ligne droite. À mi-chemin, cette droite donne 37,5 %. Mais la vraie valeur est environ 35,4 %. La courbe de l'exponentielle n'est pas une droite : elle passe EN DESSOUS du segment. Relier les points à la règle donne un âge faux.

**08-question**  
Question ! Que peut calculer la fonction, que la suite ne peut pas calculer ? A : le pourcentage au bout de 1,5 période. B : le pourcentage au bout de 3 périodes. C : la somme de tous les pourcentages. Mets pause, et choisis !

**08b-reponse**  
Réponse A. Les rangs entiers, la suite les donne aussi. Ce que la fonction ajoute, ce sont les rangs qui ne sont pas entiers.

**09-defi**  
À toi de jouer ! Fanta reçoit un os daté de 14 325 ans. Première étape : combien de périodes de 5 730 ans cela fait-il ? Deuxième étape : quel pourcentage de carbone 14 reste-t-il ? Mets pause, et cherche !

**09b-correction**  
Correction. 14 325 divisé par 5 730 égale 2,5 : il s'est écoulé 2,5 périodes. Ensuite, f de 2,5 égale 100 fois 0,5 puissance 2,5, soit environ 17,7. Il reste environ 17,7 % de carbone 14. La suite, seule, n'aurait jamais pu répondre : 2,5 n'est pas un rang entier.

**10-finale**  
Ce que tu as appris. Une suite géométrique de raison positive ne donne des valeurs qu'aux rangs entiers. La fonction exponentielle de même base la prolonge : sa courbe passe exactement par tous les points de la suite, et elle donne aussi les valeurs entre eux. Et entre deux points, cette courbe passe en dessous de la ligne droite.

**11-abonne**  
Entraîne-toi sur éleveai point f r. Et si ça t'a aidé : mets un pouce, laisse un commentaire, abonne-toi et active la cloche !

### SHORT (ceinture blanche) — `manim/voix/premiere-suite-expo-prolonger-short.json`

**00-garde**  
Suite géométrique et fonction exponentielle. Tu paries que tu peux zoomer entre deux crans ?

**01-situation**  
Sur une appli de cartes, chaque cran de zoom divise par 2 la largeur affichée : 400 kilomètres, 200, 100, 50.

**02-crans**  
C'est une suite géométrique de raison 0,5. Mais les crans sont des rangs entiers : 0, 1, 2, 3.

**03-pincement**  
Quand tu pinces l'écran avec deux doigts, tu ne t'arrêtes pas sur un cran. Tu t'arrêtes au rang 1,5. Et là, seule la fonction f de x égale 400 fois 0,5 puissance x sait répondre.

**04-question**  
Question ! Au rang 1,5, entre 200 et 100 kilomètres, la largeur affichée est : A : 150 kilomètres. B : 50 kilomètres. C : environ 141 kilomètres. Mets pause, et choisis !

**04b-reponse**  
Réponse C. 400 fois 0,5 puissance 1,5 égale environ 141. 150, ce serait le milieu de la ligne droite : la courbe passe en dessous.

**05-commentaire**  
Et toi : au rang 0,5, quelle largeur l'appli affiche-t-elle ? Réponds en commentaire !

**06-abonne**  
Entraîne-toi sur éleveai point f r. Mets un pouce, abonne-toi et active la cloche !

---

## Épisode 40 — 1re spé · `exp_suite_geo` · la suite e^(na) est géométrique

Ce que dit le coach : « Reconnaître que la suite (e^(na)) est géométrique ». Notion `exponentielle`.

### PAYSAGE (ceinture verte) — `manim/voix/premiere-spe-suite-exp-geo.json`

**00-garde**  
La suite e puissance n a. Pourquoi une exponentielle relevée d'heure en heure cache-t-elle une suite géométrique ?

**01-situation**  
Voici Soraya. Elle est pharmacienne à l'hôpital : c'est elle qui décide à quelle heure un patient doit reprendre son comprimé. Juste après la prise, il y a 400 milligrammes de médicament dans le sang. Ensuite, la quantité suit la courbe C de t égale 400 fois e puissance moins 0,3 t, avec t en heures.

**02-releves**  
Soraya ne surveille pas la courbe en continu : elle relève une valeur chaque heure. Au départ, 400 milligrammes. Au bout d'une heure, environ 296,3. Au bout de deux heures, environ 219,5. Au bout de trois heures, environ 162,6.

**03-suite**  
Ces relevés forment une suite : u indice n égale 400 fois e puissance moins 0,3 n. Et la question de Soraya est simple : est-ce qu'on passe d'une heure à la suivante en multipliant toujours par le même nombre ?

**04-quotient**  
Pour le savoir, on calcule le quotient de deux termes qui se suivent. La relation fonctionnelle de l'exponentielle donne e puissance moins 0,3 fois n plus 1, égale e puissance moins 0,3 n, fois e puissance moins 0,3. Le quotient vaut donc e puissance moins 0,3. Il ne dépend plus de n !

**05-conclusion**  
La suite est donc géométrique, de raison e puissance moins 0,3, soit environ 0,74. Chaque heure, il reste environ 74 % de la quantité de l'heure d'avant : c'est une baisse d'environ 26 % par heure.

**06-question**  
Question ! Pour tout réel a, la suite u indice n égale e puissance n a est : A : arithmétique de raison a. B : géométrique de raison a. C : géométrique de raison e puissance a. Mets pause, et choisis !

**06b-reponse**  
Réponse C. e puissance n plus 1, fois a, égale e puissance n a, fois e puissance a : d'un terme au suivant, on multiplie par e puissance a.

**07-premier**  
Et son premier terme ? u indice 0 égale e puissance 0 fois a, c'est-à-dire e puissance 0, donc 1. Quelle que soit la valeur de a, la suite e puissance n a démarre à 1.

**08-piege**  
Voilà le piège ! Devant u indice n égale e puissance 2 n, un élève annonce une raison de 2. C'est faux. Le 2 est dans l'EXPOSANT : il ne sort pas tel quel. Ce qui sort, c'est un facteur e puissance 2, soit environ 7,39. u indice 0 égale 1 et u indice 1 égale environ 7,39 : on a bien multiplié par 7,39, pas par 2.

**09-question**  
Question ! La suite v indice n égale e puissance moins 0,5 n est : A : géométrique de raison moins 0,5, et décroissante. B : géométrique de raison e puissance moins 0,5, soit environ 0,61, et décroissante. C : géométrique de raison e puissance moins 0,5, et croissante. Mets pause, et choisis !

**09b-reponse**  
Réponse B. La raison vaut environ 0,61 : elle est entre 0 et 1, donc chaque terme est plus petit que le précédent, tout en restant strictement positif.

**10-defi**  
À toi de jouer ! Soraya compare deux médicaments : le premier suit u indice n égale e puissance moins 0,2 n, le second v indice n égale e puissance moins 0,5 n. Première étape : la raison de chacun. Deuxième étape : lequel s'élimine le plus vite, et de combien de pour cent par heure ? Mets pause, et cherche !

**10b-correction**  
Correction. Le premier a pour raison e puissance moins 0,2, soit environ 0,82 : il perd environ 18 % par heure. Le second a pour raison e puissance moins 0,5, soit environ 0,61 : il perd environ 39 % par heure. C'est donc le second qui s'élimine le plus vite.

**11-finale**  
Ce que tu as appris. La suite e puissance n a est géométrique : sa raison est e puissance a, et son premier terme est 1. On le démontre avec le quotient de deux termes qui se suivent et la relation fonctionnelle. Et le nombre écrit dans l'exposant ne devient jamais la raison tout seul.

**12-abonne**  
Entraîne-toi sur éleveai point f r. Et si ça t'a aidé : mets un pouce, laisse un commentaire, abonne-toi et active la cloche !

### SHORT (ceinture blanche) — `manim/voix/premiere-spe-suite-exp-geo-short.json`

**00-garde**  
La suite e puissance n a. Tu paries que le son d'une guitare ne s'arrête jamais vraiment ?

**01-situation**  
On pince une corde, puis on la laisse vibrer. Le volume suit une exponentielle : A de t égale 100 fois e puissance moins 0,4 t, en pour cent, avec t en secondes.

**02-releves**  
Seconde par seconde : 100 %, puis environ 67 %, puis environ 44,9 %, puis environ 30,1 %.

**03-question**  
Question ! Cette suite de pourcentages est : A : géométrique de raison e puissance moins 0,4, soit environ 0,67. B : arithmétique de raison moins 33. C : géométrique de raison moins 0,4. Mets pause, et choisis !

**03b-reponse**  
Réponse A. Chaque seconde, on multiplie par e puissance moins 0,4, soit environ 0,67 : le volume perd environ 33 % par seconde, et il ne devient jamais tout à fait nul.

**04-commentaire**  
Et toi : au bout de 4 secondes, quel pourcentage du volume reste-t-il ? Réponds en commentaire !

**05-abonne**  
Entraîne-toi sur éleveai point f r. Mets un pouce, abonne-toi et active la cloche !

---

## Épisode 41 — Tle spé · `integrale_suite` · une suite d'intégrales

Ce que dit le coach : « Étudier une suite d'intégrales (variations, limite, récurrence) ». Notion `primitive_integrale`.

### PAYSAGE (ceinture verte) — `manim/voix/terminale-suite-integrale.json`

**00-garde**  
Une suite d'intégrales. Comment étudier une suite dont chaque terme est une aire ?

**01-situation**  
Voici Marius. Il conçoit des skateparks. Pour une rampe d'un mètre de long et d'un mètre de haut, il a le choix du profil : la courbe d'équation y égale x, ou y égale x au carré, ou y égale x puissance 3. Sous la rampe, il faut couler du béton. Quel profil en demande le moins ?

**02-aire**  
Le béton, c'est l'aire sous la courbe, entre 0 et 1. On la note I indice n égale l'intégrale, de 0 à 1, de x puissance n, d x. Regarde les trois profils se superposer : plus n est grand, plus la courbe reste collée au sol au début, et plus l'aire sous elle est petite.

**03-calcul**  
On calcule. Une primitive de x puissance n est x puissance n plus 1, divisé par n plus 1. Donc I indice n égale 1 divisé par n plus 1. I indice 1 égale 1 divisé par 2. I indice 2 égale 1 divisé par 3. I indice 3 égale 1 divisé par 4.

**04-question**  
Question ! Combien vaut I indice 4 ? A : 1 divisé par 5. B : 1 divisé par 3. C : 1 divisé par 4. Mets pause, et choisis !

**04b-reponse**  
Réponse A. I indice n égale 1 divisé par n plus 1, donc I indice 4 égale 1 divisé par 5.

**05-variations**  
Les variations, maintenant, et sans calculer. Sur l'intervalle 0 ; 1, x est compris entre 0 et 1, donc x puissance n plus 1 est inférieur à x puissance n. Une courbe en dessous de l'autre, c'est une aire plus petite : I indice n plus 1 est inférieur à I indice n. La suite est décroissante.

**06-piege**  
Voilà le piège ! Ailleurs, x puissance n plus 1 est PLUS GRAND que x puissance n : 2 au carré égale 4, c'est plus que 2. Mais ici on travaille entre 0 et 1, et tout s'inverse : 0,5 au carré égale 0,25, c'est MOINS que 0,5. Le sens de variation se joue sur l'intervalle, jamais sur l'habitude.

**07-limite**  
La limite. I indice n égale 1 divisé par n plus 1, et n plus 1 tend vers plus l'infini : la limite de I indice n, quand n tend vers plus l'infini, est 0. Pour Marius, cela veut dire qu'en augmentant n on rend le béton aussi petit qu'on veut, mais la rampe devient un mur, et plus personne ne la descend.

**08-question**  
Question ! Pourquoi la suite I indice n est-elle décroissante ? A : parce que l'aire devient négative. B : parce que 1 divisé par n plus 1 est une somme de n termes. C : parce que, sur l'intervalle 0 ; 1, x puissance n plus 1 est inférieur à x puissance n. Mets pause, et choisis !

**08b-reponse**  
Réponse C. On compare les deux fonctions sur l'intervalle, puis on intègre l'inégalité : intégrer conserve l'ordre.

**09-pourquoi**  
Au bac, on te donne souvent une suite d'intégrales qu'on ne sait PAS calculer. On cherche alors une relation de récurrence : une égalité qui donne un terme à partir du précédent. Prenons J indice n égale l'intégrale, de 0 à 1, de x puissance n, fois e puissance x, d x.

**10-ipp**  
On intègre par parties le terme de rang n plus 1. On pose u de x égale x puissance n plus 1, et v prime de x égale e puissance x. Le crochet vaut e. Et dans l'intégrale qui reste, on reconnaît J indice n, multiplié par n plus 1. Résultat : J indice n plus 1 égale e moins, n plus 1, fois J indice n.

**11-defi**  
À toi de jouer ! On garde J indice n, avec J indice n plus 1 égale e moins, n plus 1, fois J indice n, et J indice 0 égale e moins 1. Première étape : calcule J indice 2. Deuxième étape : vers quoi tend J indice n ? Mets pause, et cherche !

**11b-correction**  
Correction. Pour n égale 0, la relation donne J indice 1 égale e moins J indice 0. Comme J indice 0 égale e moins 1, on trouve J indice 1 égale 1. Pour n égale 1, la relation donne J indice 2 égale e moins 2 fois J indice 1, c'est-à-dire e moins 2, soit environ 0,72. Pour la limite : sur l'intervalle 0 ; 1, e puissance x est inférieur à e, donc 0 est inférieur à J indice n, lui-même inférieur à e divisé par n plus 1. Les deux bornes tendent vers 0 : la limite de J indice n est 0.

**12-finale**  
Ce que tu as appris. Une suite d'intégrales s'étudie le plus souvent SANS la calculer. Pour les variations : on compare les fonctions sur l'intervalle, puis on intègre l'inégalité. Pour la limite : on encadre. Et quand rien ne se calcule, une intégration par parties donne une relation de récurrence.

**13-abonne**  
Entraîne-toi sur éleveai point f r. Et si ça t'a aidé : mets un pouce, laisse un commentaire, abonne-toi et active la cloche !

### SHORT (ceinture blanche) — `manim/voix/terminale-suite-integrale-short.json`

**00-garde**  
Une suite d'intégrales. Tu paries que cette aire finit par disparaître ?

**01-situation**  
Sur une affiche, un dégradé va du blanc au noir. Son profil est la courbe y égale x puissance n, entre 0 et 1. L'encre utilisée, c'est l'aire sous la courbe.

**02-courbes**  
n égale 1 : l'aire vaut 1 divisé par 2. n égale 2 : 1 divisé par 3. n égale 5 : 1 divisé par 6. n égale 20 : 1 divisé par 21. À chaque fois, I indice n égale 1 divisé par n plus 1.

**03-question**  
Question ! La limite de I indice n, quand n tend vers plus l'infini, est : A : 1. B : 0. C : on ne peut pas conclure. Mets pause, et choisis !

**03b-reponse**  
Réponse B. n plus 1 tend vers plus l'infini, donc 1 divisé par n plus 1 tend vers 0 : il ne reste presque plus d'encre.

**04-commentaire**  
Et toi : combien vaut I indice 9 ? Réponds en commentaire !

**05-abonne**  
Entraîne-toi sur éleveai point f r. Mets un pouce, abonne-toi et active la cloche !

---

## Épisode 42 — Tle spé · `python_suite` · programmer les termes d'une suite

Ce que dit le coach : « Programmer les termes d'une suite ». Notion `algorithmique_python`.

### PAYSAGE (ceinture verte) — `manim/voix/terminale-suite-python.json`

**00-garde**  
Programmer les termes d'une suite. Comment faire calculer u indice 3 par une boucle Python ?

**01-situation**  
Voici Naïs. Elle est chercheuse en intelligence artificielle : elle entraîne un modèle à reconnaître des images. Au départ, son modèle se trompe beaucoup : son erreur vaut 20 000 points. À chaque passage sur les données, l'erreur est multipliée par 0,8, mais il reste 1 200 points d'erreur qu'on ne peut pas enlever. Elle a donc u indice n plus 1 égale 0,8 fois u indice n, plus 1 200.

**02-main**  
À la main, c'est long. u indice 1 égale 0,8 fois 20 000, plus 1 200 : 17 200. u indice 2 égale 0,8 fois 17 200, plus 1 200 : 14 960. u indice 3 égale 0,8 fois 14 960, plus 1 200 : 13 168.

**03-code**  
Alors Naïs écrit trois lignes. u égale 20 000. Puis : pour i dans range de 3. Puis, décalée vers la droite : u égale 0,8 fois u, plus 1 200. Le point clé : u ne garde pas tous les termes. À chaque tour, la nouvelle valeur ÉCRASE l'ancienne.

**04-trace**  
Déroulons la boucle. Tour 0 : u devient 17 200. Tour 1 : u devient 14 960. Tour 2 : u devient 13 168. Trois tours, et u vaut 13 168 : c'est u indice 3.

**05-question**  
Question ! On écrit u égale 3, puis une boucle de 3 tours qui fait u égale 2 fois u. À la fin, u vaut : A : 12. B : 24. C : 48. Mets pause, et choisis !

**05b-reponse**  
Réponse B. On double trois fois : 3, puis 6, puis 12, puis 24. u vaut 24, c'est-à-dire u indice 3.

**06-rang**  
Retiens la règle du rang. range de n fait exactement n tours. Donc si on part de u indice 0, à la sortie de la boucle u vaut u indice n. Pas u indice n moins 1, pas u indice n plus 1.

**07-piege**  
Voilà le piège ! Si tu veux VOIR tous les termes, le print doit être DANS la boucle, décalé comme la ligne du calcul. Placé après la boucle, il n'affiche qu'une seule valeur : le dernier terme. Et la variable i ne sert qu'à compter les tours : ce n'est pas le terme.

**08-question**  
Question ! On écrit u égale 5, puis une boucle de 4 tours qui fait u égale u plus 3. À la fin, u vaut 17. Mais que représente u ? A : u indice 4. B : u indice 3. C : la raison de la suite. Mets pause, et choisis !

**08b-reponse**  
Réponse A. On part de u indice 0 égale 5, et on applique la relation 4 fois : on arrive à u indice 4, qui vaut 17.

**09-defi**  
À toi de jouer ! On écrit u égale 10, puis une boucle de 3 tours qui fait u égale 0,5 fois u, plus 4. Première étape : que vaut u à la fin ? Deuxième étape : quel terme de la suite est-ce ? Mets pause, et cherche !

**09b-correction**  
Correction. Tour 0 : 0,5 fois 10, plus 4, égale 9. Tour 1 : 0,5 fois 9, plus 4, égale 8,5. Tour 2 : 0,5 fois 8,5, plus 4, égale 8,25. À la fin, u vaut 8,25. Et comme on a fait 3 tours depuis u indice 0, c'est u indice 3.

**10-finale**  
Ce que tu as appris. Une relation de récurrence se programme en une seule ligne, à l'intérieur d'une boucle : la nouvelle valeur écrase l'ancienne. range de n fait n tours, donc en partant de u indice 0 on obtient u indice n. Et pour voir tous les termes, le print se met dans la boucle.

**11-abonne**  
Entraîne-toi sur éleveai point f r. Et si ça t'a aidé : mets un pouce, laisse un commentaire, abonne-toi et active la cloche !

### SHORT (ceinture blanche) — `manim/voix/terminale-suite-python-short.json`

**00-garde**  
Programmer les termes d'une suite. Tu paries sur la valeur de u à la fin ?

**01-situation**  
Lundi, 2 personnes connaissent une information. Chaque jour, chacune la dit à une personne de plus, et une personne la découvre toute seule. On a donc u indice n plus 1 égale 2 fois u indice n, plus 1.

**02-code**  
Trois lignes de Python. u égale 2. Pour i dans range de 3. Puis, décalée : u égale 2 fois u, plus 1.

**03-question**  
Question ! À la fin de ces trois lignes, u vaut : A : 11. B : 47. C : 23. Mets pause, et choisis !

**03b-reponse**  
Réponse C. 2, puis 5, puis 11, puis 23. Trois tours depuis u indice 0 : u vaut 23, c'est jeudi.

**04-commentaire**  
Et toi : après un quatrième tour, combien de personnes connaissent l'information ? Réponds en commentaire !

**05-abonne**  
Entraîne-toi sur éleveai point f r. Mets un pouce, abonne-toi et active la cloche !

---

## Ce que le coach demande, micro par micro (pour vérifier que la vidéo le prépare)

- **39** `expo_fct_prolonger_suite` : le lien suite ↔ fonction aux rangs entiers, ce que la fonction ajoute aux rangs non entiers, la lecture graphique « les points puis la courbe », et le texte du programme 2026 (« prolongement des suites géométriques de raison positive à des valeurs non entières »). Le piège de la ligne droite entre deux points est en plus : c'est la vraie erreur de calcul d'âge.
- **40** `exp_suite_geo` : (e^(na)) géométrique de raison e^a ; u₀ = e^0 = 1 ; l'erreur « la raison est 2 » devant e^(2n) (item dédié de la banque) ; croissante si a > 0, décroissante si a < 0 ; et la forme 400 e^(−0,3n) rencontrée dans la banque (500 e^(0,2n)).
- **41** `integrale_suite` : calculer un terme, le sens de variation en comparant les fonctions sur [0 ; 1], la limite par encadrement, et la relation de récurrence par intégration par parties (Jₙ₊₁ = e − (n+1)Jₙ, exactement celle de la banque). Les 6 gabarits du coach sont couverts.
- **42** `python_suite` : la relation de récurrence en une ligne dans la boucle, l'écrasement de la variable, `range(n)` = n tours donc u = uₙ, ce que représente `u` à la fin, et le rôle de `i`. Les trois exemples repris sont ceux de la banque (2u+1 ; ×2 ; +3).

## Points que je signale

- **Ép. 41 est longue (~5 min 35)** : le micro demande trois choses (variations, limite, récurrence) et je n'ai pas voulu sacrifier l'intégration par parties. Les ép. 27 (5 min 24) et 32 (6 min 17) sont dans le même cas. Dis-moi si tu préfères que je coupe la partie récurrence dans une 2e vidéo.
- **Ép. 41, le métier** : la matrice métiers ne propose, pour `primitive_integrale`, que des métiers qui calculent UNE intégrale (ingénieur de l'eau, technicienne en énergies renouvelables, analyste de la performance) — aucun ne porte une FAMILLE d'intégrales indexée par n. J'ai pris un concepteur de skateparks, qui choisit entre les profils y = xⁿ : c'est le seul ancrage honnête que j'aie trouvé. Les 3 autres épisodes prennent bien leur métier dans la matrice.
- **Ép. 42, le code à l'écran** : Python écrit `0.8` avec un point, la voix dit « 0,8 ». C'est inévitable dès qu'on montre du code ; les lignes de code gardent le point, tout le reste de l'écran la virgule.
- **Tous les calculs sont revérifiés machine** : 0,5^1,5 = 35,355… ; 0,5^2,5 = 17,677… ; e^(−0,3) = 0,7408 ; e^(−0,5) = 0,6065 ; e^(−1,6) = 0,2019 ; e² = 7,389 ; Jₙ : e−1 ; 1 ; e−2 ; et la boucle `0.8*u+1200` depuis 20 000 tombe exactement sur 17 200 / 14 960 / 13 168 (pas d'arrondi flottant à l'écran).
- **La Réunion : 0 fois** sur le lot (la règle dit au plus 1 sur 25).
