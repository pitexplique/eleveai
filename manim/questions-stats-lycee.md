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
