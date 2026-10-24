# Stats lycée : centres + questions-pauses relevés dans les rapports d'agents (24/10)
À reporter dans `manim/manifeste-youtube.json` (champs `centres`, `questions` : t, question, choix, reponse 0/1/2, explication).
Format ci-dessous : t | question | [A ; B ; C] → index | explication.
Les épisodes communs 1re ⇄ STMG ont les MÊMES temps dans les deux classes.

## 2de (lot G1) — débit −10, paysages ceinture verte, shorts orange
- 01 lire-serie — centres [sport]
  - 01:48 | Sur ce diagramme, quelle est la valeur la plus fréquente ? | [17 ; 8 ; 2] → 2 | 2 buts, la barre la plus haute ; 17 n'est que son effectif, 8 la plus grande valeur.
  - 03:14 | Sans le match des 8 buts (Angleterre – Iran), quelle est l'étendue ? | [7 ; 8 ; 16] → 0 | 7 − 0 = 7 ; 8 oublie le match retiré, 16 = 17 − 1 est une différence d'effectifs.
  - 04:09 | Combien de matchs ont fini avec plus de 3 buts ? | [30 ; 16 ; 14] → 1 | « Plus de 3 » ne compte pas le 3 : 30 − 14 = 16.
  - short 00:27 | Valeur la plus fréquente ? | [17 ; 2 ; 8] → 1 | (commentaire : au moins 5 buts ? → 12)
- 02 moyenne — centres [espace, sciences]
  - 01:24 | Moyenne de 358 et 394 min ? | [752 ; 376 ; 36] → 1 | 752 ÷ 2 = 376 ; 752 = somme non divisée, 36 = écart.
  - 02:22 | 4 sorties de 390 min en moyenne : total ? | [97,5 ; 394 ; 1 560] → 2 | 390 × 4 = 1 560.
  - 03:40 | Moyenne sans la sortie de 358 min ? | [399 ; 407,2 ; 339,3] → 1 | (2 394 − 358) ÷ 5 = 407,2.
  - short 00:35 | 6 sorties × 399 min ? | [405 ; 2 394 ; 66,5] → 1 | (commentaire : avec une sortie de 546 min → 420)
- 03 moyenne-ponderee — centres [sport]
  - 01:58 | 10 matchs à 20 pts puis 30 matchs à 10 pts : moyenne ? | [15 ; 12,5 ; 500] → 1 | 500 ÷ 40 = 12,5 ; 15 oublie les effectifs.
  - 02:53 | 6 paniers à 2 pts, 4 à 3 pts : points par panier ? | [2,5 ; 24 ; 2,4] → 2 | 24 ÷ 10 = 2,4.
  - 03:32 | 71 matchs à 21,4 et 46 à 24,3 : la moyenne est… | [exactement 22,85 ; plus proche de 21,4 ; plus proche de 24,3] → 1 | La saison la plus chargée tire la moyenne (≈ 22,5).
  - short 00:30 | 10 matchs à 30, 90 matchs à 20 ? | [25 ; 21 ; 50] → 1 | (commentaire → 23,5)
- 04 mediane-quartiles — centres [musique]
  - 01:32 | Médiane des 11 titres restants ? | [185,5 ; 184 ; 162] → 1 | 11 valeurs : la 6e de la série rangée.
  - 02:42 | n = 30 : rang de Q1 ? | [7 ; 7,5 ; 8] → 2 | 30 ÷ 4 = 7,5 → entier au-dessus, 8.
  - 03:34 | Au moins 75 % des titres durent… | [191 s ou moins ; 191 s ou plus ; 162 s ou moins] → 0 | 191 = Q3.
  - short 00:26 | Un bonus de 600 s : la médiane… | [explose ; bouge peu ; double] → 1 | (commentaire : Q3 → 191)
- 05 frequence — centres [technologie-ia, histoire-geographie]
  - 01:17 | Fréquence du S (13 sur 113) en % ? | [13 % ; 11,5 % ; 8,7 %] → 1 | 13 ÷ 113 × 100 ≈ 11,5.
  - 02:18 | 12 % de E sur 2 000 lettres ? | [12 ; 240 ; 167] → 1 | 0,12 × 2 000 = 240.
  - 03:21 | 30 H = 15 % des lettres : total ? | [200 ; 45 ; 4,5] → 0 | 30 ÷ 0,15 = 200.
  - short 00:31 | 60 E sur 500 lettres ? | [60 % ; 12 % ; 8,3 %] → 1 | (commentaire : sur 2 500 lettres → 300)

## Communs 1re ⇄ STMG (lot H1) — débit −7
- 01 lire-graphique — [meteo-climat, nature-ecologie] — ceintures jaune/jaune, short blanche
  - 01:24 | Que vaut la barre de 2010 ? | [380 ; 390 ; 400] → 1 | Le petit trait vaut 10 de plus que 380.
  - 02:24 | De 1980 à 2023, le CO₂ a… | [été multiplié par 3 ; augmenté de 80 ppm ; augmenté de 420 ppm] → 1 | 420 − 340 = 80 ; A compare des hauteurs sur un axe tronqué.
  - short 00:23 | Le CO₂ a… | [×3 ; +80 ; +420] → 1 | Les hauteurs trompent quand l'axe ne part pas de 0.
- 02 graphiques-usuels (1re) / diagrammes-usuels (STMG) — [cinema-series] — orange/orange
  - 01:04 | Ensemble, films français et autres films ? | [63,3 % ; 25,5 % ; 36,7 %] → 0 | 44,4 + 18,9.
  - 02:50 | De 2023 à 2024, la part des films américains… | [a baissé de 4,5 points ; a baissé de 4,5 % ; a augmenté de 4,5 points] → 0 | Écart de deux % = points.
  - short 00:20 | Et en 2024, qui gagne ? | [les films français ; les films américains ; les autres films] → 0
- 03 graphique-donnees — [sport] — orange/orange
  - 01:32 | Que vaut le secteur de Giroud ? | [4 % ; 25 % ; 90 %] → 1 | 4 ÷ 16 = 25 % ; 90° ≠ 90 %.
  - 02:27 | Une graduation = 4 buts : hauteur de la barre de Mbappé ? | [8 ; 4 ; 2] → 2 | 8 ÷ 4 = 2 graduations.
  - short 00:15 | L'angle de la moitié ? | [50° ; 180° ; 360°] → 1
- 04 tab-lire — [histoire-geographie, sciences] — jaune/jaune
  - 01:20 | Femmes Nobel de physique avant 2000 ? | [2 ; 5 ; 11] → 0 | 5 = total de ligne, 11 = total de colonne.
  - 02:09 | Le nombre 6, c'est… | [la médecine avant 2000 ; la médecine depuis 2000 ; toute la médecine] → 0
  - short 00:16 | Combien de 2000 à 2025 ? | [16 ; 27 ; 5] → 0
- 05 tab-completer — [espace, technologie-ia] — verte/verte
  - 01:08 | Combien de ratés pour la Chine ? | [3 ; 4 ; 7] → 0 | Par la colonne : 8 − 1 − 0 − 4.
  - 01:37 | Combien de lancements en tout pour la Chine ? | [68 ; 62 ; 65] → 0 | 65 + 3.
  - short 00:17 | Combien de ratés ? | [8 ; 253 ; 514] → 0
- 06 tab-construire (1re) / tab-dresser (STMG) — [musique] — verte/verte
  - 01:22 | Combien de coches dans la case anglais, solo ? | [5 ; 6 ; 8] → 0 | 6 = tous les solos, 8 = tous.
  - 02:38 | Avec Loreen 2012, la case anglais, solo ? | [6 ; 5 ; 9] → 0 | 9 = le nouveau total.
  - short 00:13 | Dans une autre langue ? | [3 ; 5 ; 13] → 0

## Communs 1re ⇄ STMG (lot H2) — débit −7 — numéros 1re 11-17 ⇄ STMG 18,17,19,13,14,15,16
- nuage-lire — [sport] — orange/orange, short jaune
  - 01:19 | Ordonnée du point d'abscisse 27 ? | [13 ; 27 ; 33] → 0 | 27 = l'abscisse ; 33 = un autre point.
  - 02:30 | Coordonnées de la saison 2022-2023 ? | [(29 ; 34) ; (34 ; 29) ; (34 ; 27)] → 1 | A inverse ; C prend un point voisin.
  - short 00:20 | Point (20 ; 18) : que vaut 18 ? | [les matchs ; les buts ; la saison] → 1
- nuage-construire (1re) / nuage-representer (STMG) — [transports] — verte/verte, short orange
  - 01:24 | Où placer la ligne 9 : 20 km, 37 stations ? | [(37 ; 20) ; (20 ; 37) ; (20 ; 27)] → 1
  - 02:32 | Quelle ligne est le point (17 ; 25) ? | [ligne 12 ; ligne 1 ; ligne 4] → 1 | La 12 a 17 km mais 31 stations.
  - short 00:18 | Ligne 7bis : 3 km, 8 stations ? | [(8 ; 3) ; (3 ; 8) ; (3 ; 3)] → 1
- nuage-tendance — [histoire-geographie, meteo-climat] — 1re verte, STMG bleue, short orange
  - 01:16 | Quelle phrase décrit ce nuage ? | [tendance croissante ; tendance décroissante ; points exactement alignés] → 1
  - 02:28 | Tunis, 37° : température plausible ? | [26 °C ; 18 °C ; 8 °C] → 1 | En vrai 18,4 °C.
  - short 00:26 | Les points sont-ils… | [exactement alignés ; proches d'une tendance ; sans aucun lien] → 1
- filtre-sous-ensemble — [cinema-series] — orange/orange, short jaune
  - 01:07 | Filtre « Durée (min) < 100 » : combien de lignes ? | [4 ; 3 ; 6] → 0 | 3 oublie le film de 99 min.
  - 02:10 | Un critère, il reste 5 lignes : lequel ? | [Animation = Oui ; Durée (min) ≥ 140 ; Français = Oui] → 1
  - short 00:20 | Animation = Oui : combien de films ? | [3 ; 7 ; 10] → 0
- filtre-et — [nature-ecologie, sciences] — verte/verte, short orange
  - 00:56 | Hémisphère = Sud ET Éruption = Oui ? | [3 ; 7 ; 4] → 0 | 4 = Sud seul ; 7 = un OU.
  - 01:51 | Hémisphère = Sud ET NON Éruption = Oui ? | [1 ; 3 ; 4] → 0
  - short 00:20 | Avec ET, le nombre de lignes peut-il augmenter ? | [oui ; non, jamais ; ça dépend du tableur] → 1
- filtre-ou — [art-design] — bleue/bleue, short verte
  - 00:59 | Continent = Asie OU Année < 2000 ? | [9 ; 8 ; 1] → 1 | 6 + 3 − 1.
  - 01:56 | Continent = Amérique OU Hauteur (m) < 500 ? | [8 ; 5 ; 3] → 1 | 4 + 4 − 3.
  - short 00:19 | Le OU garde-t-il les tours qui vérifient les deux ? | [oui ; non ; une fois sur deux] → 0
- filtre-non — [espace, sciences] — verte/verte, short orange
  - 00:59 | NON « Diamètre (km) ≥ 10 000 » ? | [6 ; 2 ; 8] → 1 | Mercure et Mars.
  - 02:01 | NON « Rocheuse ET Lune = Non » ? | [2 ; 6 ; 4] → 1 | 8 − 2 = 6.
  - short 00:14 | NON Type = Gazeuse ? | [4 ; 8 ; 0] → 0

## En cours au moment de la coupure (rapports perdus si la session change)
G2 (2de 06-09), I1 (1re 07-10 + 18, STMG 03 boîte + 06 marges), I2 (STMG 09-12 fréquences) :
relever centres et questions dans leurs scripts/voix (`manim/voix/*.json`, clés « question ») et mesurer les t sur le rendu.

## 2de (lot G2) — débit −10, paysages verte, shorts orange
- 06 ecart-interquartile — [meteo-climat, nature-ecologie]
  - 01:09 | Avec ces quartiles, que vaut l'écart interquartile de Paris ? | [27 ; 13 ; 5,5] → 1 | Q3 − Q1 = 58 − 45 = 13 ; 27 = étendue, 5,5 = Q3 − médiane.
  - 03:07 | Un cyclone : janvier reçoit 1 000 mm au lieu de 270. L'écart interquartile de Saint-Denis ? | [839 ; 957 ; 109] → 2 | Q1 et Q3 ne bougent pas ; 957 = nouvelle étendue.
  - short 00:22 | Quelle est la largeur de la boîte ? | [236 ; 109 ; 211] → 1 | (commentaire : Paris Q1 45, Q3 58 → 13)
- 07 linearite-moyenne — [cinema-series, technologie-ia]
  - 01:25 | Avec 30 min de bandes-annonces, la durée moyenne d'une séance ? | [171 ; 291 ; 141] → 0 | 141 + 30 ; 291 ajoute 30 cinq fois.
  - 02:19 | DVD européen : chaque durée × 0,96. La durée moyenne ? | [141,96 ; 140,04 ; 135,36] → 2 | 0,96 × 141 ; 141,96 ajoute au lieu de multiplier.
  - short 00:22 | La nouvelle moyenne des séances ? | [241 ; 161 ; 141] → 1 | (commentaire : films 2 fois plus longs → 282)
- 08 ecart-type — [transports, histoire-geographie]
  - 01:20 | Quelle ville a la température la plus régulière ? | [Strasbourg ; Brest ; Les deux, même moyenne] → 1 | Plus petit σ (3,7) ; même moyenne ≠ même dispersion.
  - 02:11 | À Strasbourg, x̄ = 11,4 et σ = 6,5. Que vaut x̄ + σ ? | [17,9 ; 4,9 ; 24,4] → 0 | 4,9 = x̄ − σ ; 24,4 ajoute 2σ.
  - short 00:25 | Quelle ville a le plus grand écart type ? | [Brest ; Strasbourg ; Pareil] → 1 | (commentaire : 11,7 − 3,7 → 8)
- 09 interpreter — [argent-budget, reseaux-sociaux]
  - 00:47 | Quelle phrase est juste ? | [La plupart gagnent 2 735 € ; La moitié gagne exactement 2 183 € ; La moitié gagne moins de 2 183 €] → 2 | Sens de la médiane.
  - 01:48 | Si les plus hauts salaires doublaient, sans rien changer aux autres ? | [La moyenne augmente, la médiane ne bouge pas ; Les deux augmentent ; La médiane augmente, pas la moyenne] → 0 | La somme augmente ; le salarié du milieu ne bouge pas.
  - 02:49 | Quelle conclusion est juste ? | [Toutes les femmes gagnent moins que tous les hommes ; Le niveau des femmes est plus bas, en moyenne et en médiane ; On ne peut rien comparer] → 1 | Un indicateur résume un groupe, pas chaque personne.
  - short 00:31 | Lequel veut dire « la moitié gagne moins » ? | [2 735 € ; 4 302 € ; 2 183 €] → 2 | (commentaire : 1 sur 10 sur 30 salariés → 3)

## Lot I1 — débit −7 (1re seule + STMG seule)
- 1re 07 rep-barres — [technologie-ia] — paysage orange, short jaune
  - 01:20 | Part des 12-17 ans qui ne s'en sert pas chaque jour ? | [74 % ; 26 % ; 49 %] → 0 | 100 − 26 = 74 %.
  - 02:47 | Que dit la barre des 60 ans et plus ? | [17 % des 60 ans et + s'en servent ; 17 % des usagers ont 60 ans et + ; 17 personnes de 60 ans et +] → 0 | Une part DANS le groupe.
  - short 00:17 | 12-17 ans : qui ne s'en sert pas ? | [74 % ; 26 % ; 49 %] → 0 | (commentaire : 17 % de 200 → 34)
- 1re 08 rep-circulaire — [nature-ecologie, sciences] — verte, short orange
  - 01:17 | L'éolien mesure 32,4°. Quelle part ? | [9 % ; 32,4 % ; 90 %] → 0 | 32,4 ÷ 3,6 = 9 %.
  - 02:44 | Demi-disque : l'angle de l'hydraulique ? | [25,2° ; 50,4° ; 14°] → 0 | 14 × 1,8 = 25,2°.
  - short 00:17 | Nucléaire : 241,2°. Quelle part ? | [67 % ; 241 % ; 33 %] → 0 | (commentaire : 50,4° → 14 %)
- 1re 09 rep-choisir — [jeux-video, argent-budget] — verte, short orange
  - 01:23 | Le chiffre d'affaires, année après année ? | [diagramme circulaire ; courbe ; nuage de points] → 1 | Une évolution : l'axe du temps.
  - 02:35 | Jouer plus longtemps, est-ce mieux scorer ? | [nuage de points ; diagramme en barres ; diagramme circulaire] → 0 | 2 nombres par joueur : un point.
  - short 00:18 | Peut-on en faire un camembert ? | [oui ; non : plus de 100 % ; oui, en arrondissant] → 1 | (commentaire : total des 5 supports → 184 %)
- 1re 10 rep-commenter — [sport, corps-sante] — bleue, short verte
  - 01:10 | Foot : au moins 2 fois plus que le tennis ? | [oui ; non ; on ne peut pas savoir] → 1 | 2 × 1 229 = 2 458 > 2 372.
  - 02:27 | Quelle phrase est vraie ? | [part des filles : foot > basket ; plus de licenciées au basket ; plus de licenciées au foot] → 2 | ≈ 249 milliers contre 221.
  - short 00:21 | Où y a-t-il le plus de licenciées ? | [au foot ; au basket ; autant] → 0 | (commentaire : handball 602 × 39,8 % → ≈ 240 milliers)
- 1re 18 filtre-effectif — [histoire-geographie, art-design] — bleue, short verte
  - 01:14 | Naturel OU en péril : combien de biens ? | [282 ; 294 ; 12] → 0 | 240 + 54 − 12.
  - 02:17 | Le tableur affiche 1 219 biens. Quel filtre ? | [NON En péril ; NON Culturel ; Culturel ET Hors péril] → 0 | 1 273 − 54.
  - short 00:16 | Naturel OU en péril ? | [294 ; 282 ; 12] → 1 | (commentaire : 991 − 42 → 949)
- STMG 03 boite — [argent-budget, histoire-geographie] — jaune, short blanche
  - 01:28 | Part des pays à au moins 1 802 € ? | [25 % ; 75 % ; 50 %] → 0 | 1 802 = Q3 : ≈ 1/4 au-dessus.
  - 02:44 | Où y a-t-il le plus de pays ? | [Q3 → max ; Q1 → médiane ; à peu près autant] → 2 | ≈ 1/4 dans chaque partie.
  - short 00:22 | Part des pays qui paient au moins autant ? | [≈ un quart ; ≈ la moitié ; ≈ trois quarts] → 0 | (commentaire : Q3 − Q1 → 976 €)
- STMG 06 tab-marges — [corps-sante] — jaune, short blanche
  - 01:05 | Marge de la colonne « Hommes » : le calcul ? | [48 + 70 ; 67 + 70 ; 52 + 48] → 0 | Je descends la colonne.
  - 02:20 | Le total général du tableau ? | [237 ; 474 ; 219] → 0 | La somme des 4 cases.
  - short 00:13 | Combien de femmes médecins en tout ? | [119 milliers ; 100 milliers ; 52 milliers] → 0 | (commentaire : 48 + 70 → 118 milliers)

## STMG fréquences (lot I2) — débit −7, paysages verte, shorts orange
- 09 freq-marginale — [histoire-geographie, transports]
  - 01:19 | Sur toutes les nuitées, quelle part a lieu en camping ? | [35,9 % ; 24,1 % ; 41,3 %] → 0 | 13,7 ÷ 38,2 ; B ne prend qu'une case, C divise par 10,9.
  - 02:47 | Un stagiaire calcule 6,4 ÷ 10,9. Qu'a-t-il calculé ? | [la part des hôtels, sur toutes les nuitées ; la part des hôtels, parmi les nuitées de l'étranger ; la part de l'étranger, sur toutes les nuitées] → 1 | Il a divisé par l'étranger seulement : fréquence conditionnelle.
  - short 00:21 | Part de l'étranger ? | [10,9 % ; 28,5 % ; 38,2 %] → 1 | (commentaire : campings 13,7 / 38,2 → 35,9 %)
- 10 freq-conditionnelle — [sport, corps-sante]
  - 01:27 | Parmi les licences de handball, quelle part de femmes ? | [49,1 % ; 39,9 % ; 8,1 %] → 1 | 240 ÷ 602 ; A = l'autre sens, C = le total.
  - 02:43 | Parmi les hommes, quelle part joue au handball : quel dénominateur ? | [602 ; 2 485 ; 2 974] → 1 | La colonne hommes.
  - short 00:20 | Le plus féminin ? | [le football ; le handball ; pareil] → 1 | (commentaire : rugby 59 / 420 → 14 %)
- 11 freq-completer — [transports, technologie-ia]
  - 01:25 | 2023 : 16,7 % des 1 817 milliers. Combien ? | [≈ 303 ; ≈ 10 880 ; ≈ 30 344] → 0 | 1 817 × 0,167 ; B divise, C oublie ÷ 100.
  - 02:48 | 2024 : 295,6 milliers d'électriques = 16,8 %. Combien en tout ? | [≈ 1 760 milliers ; ≈ 50 milliers ; ≈ 312 milliers] → 0 | 295,6 ÷ 0,168.
  - short 00:12 | Combien d'électriques ? | [≈ 168 000 ; ≈ 295 000 ; ≈ 16 800] → 1 | (commentaire : 16,7 % de 1 817 000 → ≈ 303 000)
- 12 freq-interpreter — [corps-sante, transports]
  - 01:15 | « 71 % des automobilistes tués sont des hommes » : population de référence ? | [les hommes tués ; les automobilistes tués ; tous les tués] → 1 | 1 074 ÷ 1 512.
  - 02:23 | Quelle phrase est exacte ? | [37,7 % des tués à deux-roues sont des hommes. ; 37,7 % des hommes tués étaient à deux-roues. ; 37,7 % des tués sont des hommes.] → 1 | 650 ÷ 1 724, les hommes tués.
  - short 00:21 | Parmi les hommes tués, quelle part était à deux-roues ? | [92,1 % ; 37,7 % ; 29,3 %] → 1 | (commentaire : femmes 56 / 494 → 11,3 %)
