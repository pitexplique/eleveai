# Rapport agent brouillons -ql 10-12 (23/11 soir)
Classes Premiere + Short rendues en -ql, planches regardées. Dry runs finaux : 0 AVANCE, 0 RETARD, 0 BORD. Classes Stmg (10, 11, 12) et Seconde (11, 12) écrites mais NI dry run NI rendu. Bases communes : EvoLyceeBase (dans prop_lycee_evo_valeur_initiale.py) et EvoShortBase (dans _short.py), chargées par 11 et 12. Aucune erreur dans les voix.

10 valeur-initiale : P 3:52, S 1:03. Clés P : 00 0:00, 01 0:06, 02 0:29, 03 0:36, 04 0:49, 05 1:03, 06 1:23, 06b 1:47, 07 2:03, 08 2:20, 08b 2:42, 09 2:52, 09b 3:13, 10 3:24, 11 3:41 ; S : 00 0:00, 01 0:07, 02 0:19, 02b 0:38, 03 0:44, 04 0:56
Q P : [{"t":"01:23","question":"Après une hausse de 25 %, un prix vaut 100 €. Prix de départ ?","choix":["75 €","125 €","80 €"],"reponse":2,"explication":"100 ÷ 1,25 = 80 €"},{"t":"02:20","question":"Après une baisse de 50 %, un jeu vaut 20 €. Son prix avant ?","choix":["30 €","40 €","10 €"],"reponse":1,"explication":"20 ÷ 0,5 = 40 €"}]
Q S : [{"t":"00:19","question":"Après + 10 %, un prix vaut 110 €. Avant ?","choix":["100 €","99 €","121 €"],"reponse":0,"explication":"110 ÷ 1,1 = 100 €"}]

11 calculer-taux : P 4:01, S 0:57. Clés P : 00 0:00, 01 0:06, 02 0:27, 03 0:31, 04 0:49, 05 1:07, 06 1:25, 06b 1:48, 07 2:04, 08 2:20, 08b 2:43, 09 3:00, 09b 3:17, 10 3:31, 11 3:49 ; S : 00 0:00, 01 0:06, 02 0:17, 02b 0:34, 03 0:43, 04 0:50
Q P : [{"t":"01:25","question":"Un prix passe de 50 € à 60 €. Taux d'évolution ?","choix":["+ 10 %","+ 20 %","≈ + 17 %"],"reponse":1,"explication":"60 − 50 = 10 ; 10 ÷ 50 = 0,2 = + 20 %"},{"t":"02:20","question":"Une ville passe de 80 000 à 60 000 habitants. Taux d'évolution ?","choix":["− 25 %","− 20 %","≈ − 33 %"],"reponse":0,"explication":"− 20 000 ÷ 80 000 = − 0,25 = − 25 %"}]
Q S : [{"t":"00:17","question":"De 40 à 50 abonnés : quel taux ?","choix":["+ 10 %","+ 20 %","+ 25 %"],"reponse":2,"explication":"10 ÷ 40 = 0,25 = + 25 %"}]
Reste : RETARD 0,30 s sur « moins 50 » (06b) dans le log -ql, absent du dry run.

12 successives : P 4:01, S 1:05. Clés P : 00 0:00, 01 0:08, 02 0:34, 03 0:39, 04 0:56, 05 1:15, 06 1:29, 06b 1:50, 07 2:02, 08 2:24, 08b 2:45, 09 2:58, 09b 3:16, 10 3:36, 11 3:49 ; S : 00 0:00, 01 0:06, 02 0:18, 02b 0:38, 03 0:47, 04 0:57
Q P : [{"t":"01:29","question":"+ 10 %, puis + 10 % : au total ?","choix":["+ 21 %","+ 20 %","+ 100 %"],"reponse":0,"explication":"1,1 × 1,1 = 1,21 = + 21 %"},{"t":"02:24","question":"Une action : + 20 %, puis − 10 %. Au total ?","choix":["+ 10 %","+ 2 %","+ 8 %"],"reponse":2,"explication":"1,2 × 0,9 = 1,08 = + 8 %"}]
Q S : [{"t":"00:18","question":"− 20 %, puis − 20 % : au total ?","choix":["− 40 %","− 36 %","− 4 %"],"reponse":1,"explication":"0,8 × 0,8 = 0,64 = − 36 %"}]
⚠️ À REVOIR : l'affiche de la situation (vers 20 s) : « puis − 20 % » touche presque le cadre ; dernière correction pas revue à l'image.
Écarts maquette : pas de « = 10,1 » (07, ép. 12) ; ticket ép. 10 « 60 € » au lieu de « 60,00 € ».
⚠️ Temps mesurés sur le -ql : à re-mesurer sur le HD.
