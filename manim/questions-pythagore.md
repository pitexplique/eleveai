# Questions-pauses — série PYTHAGORE 4e (+ 3e gobelet) — refonte du 31/10/2026

Frédéric, 31/10 : « refaire les vidéos de Pythagore pour les 4e avec questions, et de 3e ».
Les 18 vidéos (12-13/10) datent d'avant la règle des questions-pauses (23/10, `REGLES.md`) : aucune n'en a.
On GARDE tout le reste (images, voix déjà validées, ceintures : paysages jaune, shorts blanche, défi orange, 3e verte/orange).
On AJOUTE : 2 questions-pauses par paysage (compte à rebours 5 s), 1 par short (3 s).
On MET À JOUR : la fin (« Entraîne-toi sur éleveai point f r. Et abonne-toi ! »), l'ordre des épisodes dans les finales (ordre du coach depuis le 13/10), les règles du 24/10 (synchro 0 s d'avance, bords 0, titre de fin EN HAUT ET CENTRÉ).

Format de la voix d'une question (comme les autres séries) :
- clé `NNq-…` : « Question ! <question>. A : <choix>. B : <choix>. C : <choix>. Mets pause, et choisis ! »
- clé `NNr-…` : « Réponse <lettre> : <choix>. <une phrase>. »
Les leurres = les erreurs typiques de la micro. Contextes variés (maths transversales), pas de La Réunion ajoutée.

## Fin de TOUTES les vidéos (clé `…-abonne`)
« Entraîne-toi sur éleveai point f r. Et abonne-toi ! » — écran assorti : « Entraîne-toi sur » + « eleveai.fr » encadré, « Abonne-toi ! » + « @eleveai974 ».
Shorts : leur fin actuelle « Réponds en commentaire ! » reste ; s'ils ont un écran d'abonnement, même phrase.

---

## Ép. 1 — Carré et racine (`4e-pythagore-carre-racine`, micro `pythagore_carre_racine`)
Finale à corriger : « … Alors l'épisode 2 t'attend : reconnaître l'hypoténuse. »
✅ RENDU 31/10 (`a17f5bdd`) : paysage 3:18 (Q1 t=00:54, Q2 t=01:52), short 0:53 (Q t=00:21). ⚠️ Titre de finale resté « Ce que tu sais faire maintenant » (les autres passent à « Ce que tu as appris ») ; écran 06 « côté = √25 = 5 » écrit mais pas dit.
**Paysage**
- Q1 après `03-piege` :
  - q : « Question ! Combien vaut 6 au carré ? A : 12. B : 36. C : 66. Mets pause, et choisis ! »
  - r : « Réponse B : 36. 6 au carré, c'est 6 fois 6, et pas 6 fois 2. »
  - JSON : `{"question":"Combien vaut 6² ?","choix":["12","36","66"],"reponse":1,"explication":"6² = 6 × 6 = 36, et pas 6 × 2."}`
- Q2 après `05-aller-retour` :
  - q : « Question ! Combien vaut la racine carrée de 81 ? A : 9. B : 40 virgule 5. C : 18. Mets pause, et choisis ! »
  - r : « Réponse A : 9. 9 fois 9 égale 81 : la racine ne divise pas par 2. »
  - JSON : `{"question":"√81 = ?","choix":["9","40,5","18"],"reponse":0,"explication":"9 × 9 = 81 : la racine ne divise pas par 2."}`
**Short** — après `01-image` :
  - q : « Question ! Une terrasse de 3 carreaux sur 3. Combien de carreaux ? A : 6. B : 9. C : 33. Mets pause, et choisis ! »
  - r : « Réponse B : 9. 3 au carré, c'est 3 fois 3. »

## Ép. 2 — Reconnaître l'hypoténuse (`4e-pythagore-reconnaitre`, micro `pythagore_reconnaitre`)
✅ RENDU 31/10 : paysage 3:02 (Q1 t=00:58, Q2 t=01:38), short 0:55 (Q t=00:18).
Finale à corriger : « … Alors l'épisode 3 t'attend : calculer l'hypoténuse. »
**Paysage**
- Q1 après `04-methode` :
  - q : « Question ! Le triangle MNP est rectangle en N. Quelle est son hypoténuse ? A : MN. B : MP. C : NP. Mets pause, et choisis ! »
  - r : « Réponse B : MP. Rectangle en N : je prends le côté sans la lettre N. »
  - JSON : `{"question":"MNP est rectangle en N. Son hypoténuse ?","choix":["[MN]","[MP]","[NP]"],"reponse":1,"explication":"Rectangle en N : le côté sans la lettre N, c'est [MP]."}`
- Q2 après `05-tourne` :
  - q : « Question ! Une rampe de skate : le sol, le mur et la rampe font un triangle rectangle. Quel côté est l'hypoténuse ? A : le sol. B : la rampe. C : le mur. Mets pause, et choisis ! »
  - r : « Réponse B : la rampe. Le sol et le mur font l'angle droit, la rampe est en face. »
  - JSON : `{"question":"Sol, mur, rampe de skate : l'hypoténuse ?","choix":["le sol","la rampe","le mur"],"reponse":1,"explication":"Le sol et le mur font l'angle droit ; la rampe est en face."}`
**Short** — après `01-image` :
  - q : « Question ! Le triangle ABC est rectangle en C. Son hypoténuse ? A : AB. B : AC. C : BC. Mets pause, et choisis ! »
  - r : « Réponse A : AB. Le côté sans la lettre C. »

## Ép. 3 — Calculer l'hypoténuse (`4e-pythagore-hypotenuse`, micro `pythagore_calculer_hypotenuse`)
✅ RENDU 31/10 : paysage 4:50 (Q1 t=01:34, Q2 t=03:11), short 1:05 (Q t=00:23).
**Paysage**
- Q1 après `04-methode` (AVANT les pièges, qui montrent ensuite ces deux erreurs) :
  - q : « Question ! Un écran de télévision mesure 80 centimètres de large et 60 centimètres de haut. Combien mesure sa diagonale ? A : 140 centimètres. B : 100 centimètres. C : 10000 centimètres. Mets pause, et choisis ! »
  - r : « Réponse B : 100 centimètres. 3600 plus 6400 : 10000, et la racine carrée de 10000, c'est 100. »
  - JSON : `{"question":"Écran 80 cm × 60 cm : sa diagonale ?","choix":["140 cm","100 cm","10 000 cm"],"reponse":1,"explication":"60² + 80² = 3 600 + 6 400 = 10 000 ; √10 000 = 100 cm."}`
- Q2 après `07-arrondi` :
  - q : « Question ! Les côtés de l'angle droit mesurent 3 centimètres et 6 centimètres. L'hypoténuse mesure environ : A : 9 centimètres. B : 45 centimètres. C : 6 virgule 7 centimètres. Mets pause, et choisis ! »
  - r : « Réponse C : 6 virgule 7 centimètres. 9 plus 36 : 45, et la racine carrée de 45 vaut environ 6 virgule 7. »
  - JSON : `{"question":"Côtés de l'angle droit 3 cm et 6 cm : l'hypoténuse ≈ ?","choix":["9 cm","45 cm","6,7 cm"],"reponse":2,"explication":"3² + 6² = 9 + 36 = 45 ; √45 ≈ 6,7 cm."}`
**Short** — après `01-image` :
  - q : « Question ! Une cour de 9 mètres sur 12 mètres. Sa diagonale ? A : 21 mètres. B : 15 mètres. C : 225 mètres. Mets pause, et choisis ! »
  - r : « Réponse B : 15 mètres. 81 plus 144 : 225, et la racine de 225, c'est 15. »

## Ép. 4 — Calculer un côté (`4e-pythagore-cote`, micro `pythagore_calculer_cote`)
✅ RENDU 31/10 : paysage 4:11 (Q1 t=01:15, Q2 t=02:32), short 1:00 (Q t=00:18).
**Paysage**
- Q1 après `04-methode` (avant le piège) :
  - q : « Question ! Un pompier pose une échelle de 5 mètres, son pied à 3 mètres du mur. À quelle hauteur touche-t-elle le mur ? A : 4 mètres. B : 2 mètres. C : 5 virgule 8 mètres. Mets pause, et choisis ! »
  - r : « Réponse A : 4 mètres. 25 moins 9 : 16, et la racine carrée de 16, c'est 4. »
  - JSON : `{"question":"Échelle de 5 m, pied à 3 m du mur : la hauteur ?","choix":["4 m","2 m","5,8 m"],"reponse":0,"explication":"5² − 3² = 25 − 9 = 16 ; √16 = 4 m."}`
- Q2 après `07-arrondi` :
  - q : « Question ! L'hypoténuse mesure 13 centimètres, un côté 12 centimètres. Combien mesure l'autre côté ? A : 1 centimètre. B : 5 centimètres. C : 17 virgule 7 centimètres. Mets pause, et choisis ! »
  - r : « Réponse B : 5 centimètres. 169 moins 144 : 25, et la racine de 25, c'est 5. »
  - JSON : `{"question":"Hypoténuse 13 cm, un côté 12 cm : l'autre côté ?","choix":["1 cm","5 cm","17,7 cm"],"reponse":1,"explication":"13² − 12² = 169 − 144 = 25 ; √25 = 5 cm."}`
**Short** — après `01-image` :
  - q : « Question ! Diagonale 13 mètres, longueur 5 mètres. La largeur ? A : 8 mètres. B : 12 mètres. C : 13 virgule 9 mètres. Mets pause, et choisis ! »
  - r : « Réponse B : 12 mètres. 169 moins 25 : 144, et la racine de 144, c'est 12. »

## Ép. 5 — Vérifier l'égalité (`4e-pythagore-verifier`, micro `pythagore_reciproque_verifier`)
✅ RENDU 31/10 : paysage 4:42 (Q1 t=01:18, Q2 t=02:37), short 1:01 (Q t=00:21).
**Paysage**
- Q1 après `04-piege` :
  - q : « Question ! Un triangle a des côtés de 6, 8 et 10 centimètres. Combien font 6 au carré plus 8 au carré ? A : 14. B : 100. C : 196. Mets pause, et choisis ! »
  - r : « Réponse B : 100. 36 plus 64 : 100, autant que 10 au carré. »
  - JSON : `{"question":"Côtés 6, 8 et 10 cm : 6² + 8² = ?","choix":["14","100","196"],"reponse":1,"explication":"36 + 64 = 100, autant que 10²."}`
- Q2 après `06-desordre` :
  - q : « Question ! AB égale 8, BC égale 5, AC égale 6. L'égalité est-elle vérifiée ? A : oui, 64 et 64. B : non, 64 et 61. C : non, 25 et 100. Mets pause, et choisis ! »
  - r : « Réponse B : non, 64 et 61. Le plus grand, c'est AB : 8 au carré, 64. 25 plus 36 : 61. »
  - JSON : `{"question":"AB = 8, BC = 5, AC = 6 : égalité vérifiée ?","choix":["oui : 64 et 64","non : 64 et 61","non : 25 et 100"],"reponse":1,"explication":"Le plus grand est AB : 8² = 64 ; 5² + 6² = 25 + 36 = 61."}`
**Short** — après `01-image` :
  - q : « Question ! Côtés 5, 12 et 13. Combien vaut 13 au carré ? A : 26. B : 169. C : 139. Mets pause, et choisis ! »
  - r : « Réponse B : 169. 13 fois 13, et pas 13 fois 2. »

## Ép. 6 — La réciproque (`4e-pythagore-reciproque`, micro `pythagore_reciproque_conclure`)
✅ RENDU 31/10 : paysage 4:31 (Q1 t=01:27, Q2 t=02:46), short 1:00 (Q t=00:20).
**Paysage**
- Q1 après `04-sommet` :
  - q : « Question ! Le triangle RST a pour côtés RS égale 5, ST égale 13 et RT égale 12. L'égalité est vérifiée. En quel sommet est l'angle droit ? A : en R. B : en S. C : en T. Mets pause, et choisis ! »
  - r : « Réponse A : en R. ST est le plus grand côté : l'angle droit est en R, le seul sommet qui n'est pas sur ST. »
  - JSON : `{"question":"RS = 5, ST = 13, RT = 12 (égalité vérifiée) : angle droit en ?","choix":["R","S","T"],"reponse":0,"explication":"[ST] est le plus grand côté : l'angle droit est en R, le sommet qui n'est pas sur [ST]."}`
- Q2 après `06-erreurs` :
  - q : « Question ! Pour prouver qu'un triangle est rectangle, on cite : A : le théorème de Pythagore. B : la réciproque du théorème de Pythagore. C : la définition de l'hypoténuse. Mets pause, et choisis ! »
  - r : « Réponse B : la réciproque. Le théorème part de l'angle droit, il ne le prouve pas. »
  - JSON : `{"question":"Pour prouver qu'un triangle est rectangle, on cite :","choix":["le théorème de Pythagore","la réciproque du théorème de Pythagore","la définition de l'hypoténuse"],"reponse":1,"explication":"Le théorème part de l'angle droit ; seule la réciproque le prouve."}`
**Short** — après `01-image` :
  - q : « Question ! Une table de 6, 8 et 10 décimètres. 10 au carré : 100. Et 6 au carré plus 8 au carré ? A : 14. B : 100. C : 48. Mets pause, et choisis ! »
  - r : « Réponse B : 100. C'est égal : le coin est droit. »

## Ép. 7 — Rédiger (`4e-pythagore-rediger`, micro `pythagore_rediger`)
**Paysage**
- Q1 après `04-mots` :
  - q : « Question ! ABC est rectangle en A, et on cherche BC. On utilise : A : le théorème. B : la réciproque. C : les deux. Mets pause, et choisis ! »
  - r : « Réponse A : le théorème. On connaît l'angle droit, on calcule une longueur. »
  - JSON : `{"question":"ABC est rectangle en A, on cherche BC. On utilise :","choix":["le théorème","la réciproque","les deux"],"reponse":0,"explication":"On connaît l'angle droit et on calcule une longueur : le théorème."}`
- Q2 après `05-piege` :
  - q : « Question ! Quelle phrase est juste ? A : d'après le théorème de Pythagore, ABC est rectangle. B : d'après la réciproque du théorème de Pythagore, ABC est rectangle. C : d'après la réciproque, BC égale 10 centimètres. Mets pause, et choisis ! »
  - r : « Réponse B. La réciproque prouve l'angle droit ; le théorème calcule une longueur. »
  - JSON : `{"question":"Quelle phrase est juste ?","choix":["D'après le théorème de Pythagore, ABC est rectangle.","D'après la réciproque du théorème de Pythagore, ABC est rectangle.","D'après la réciproque, BC = 10 cm."],"reponse":1,"explication":"La réciproque prouve l'angle droit ; le théorème calcule une longueur."}`
**Short** — après `01-image` :
  - q : « Question ! Un triangle a pour côtés 7, 24 et 25. Est-il rectangle ? Pour le savoir : A : le théorème. B : la réciproque. C : aucun des deux. Mets pause, et choisis ! »
  - r : « Réponse B : la réciproque. On cherche l'angle droit. »

## Ép. 8 — Défi du cube (`4e-pythagore-defi-cube`, micro `pythagore_defi`, ceinture orange)
✅ RENDU 31/10 : paysage 2:32 (Q1 t=00:20, Q2 t=01:32), short 0:49 (Q t=00:16).
**Paysage**
- Q1 entre `01-cube` et `02-faces` :
  - q : « Question ! Sur une seule face carrée, combien de triangles rectangles ? A : 2. B : 4. C : 6. Mets pause, et choisis ! »
  - r : « Réponse B : 4. On enlève un sommet sur quatre : 4 façons. »
  - JSON : `{"question":"Sur une seule face carrée : combien de triangles rectangles ?","choix":["2","4","6"],"reponse":1,"explication":"On enlève un des 4 sommets : 4 triangles."}`
- Q2 entre `03-biais` et `04-total` :
  - q : « Question ! Alors, combien de triangles rectangles en tout ? A : 24. B : 48. C : 56. Mets pause, et choisis ! »
  - r : « Réponse B : 48. »  (puis `04-total` explique 24 plus 24 ; 56 = tous les triangles, dit dans `05-piege`)
  - JSON : `{"question":"Combien de triangles rectangles en tout dans le cube ?","choix":["24","48","56"],"reponse":1,"explication":"24 sur les faces + 24 en biais = 48 (56 = tous les triangles)."}`
**Short** (publié avant la correction, la réponse n'est pas donnée) — après `01-image` :
  - q : « Question ! Trois sommets d'une même face, comme A, B et C. Le triangle a-t-il un angle droit ? A : oui, en B. B : non. C : oui, en A. Mets pause, et choisis ! »
  - r : « Réponse A : oui, en B. AB et BC sont deux arêtes de la face. »

## 3e — Pythagore dans un solide (`3e-pythagore-solide`, micro `pythagore_solide`)
**Paysage** (ceinture verte)
- Q1 après `06-piege` :
  - q : « Question ! Combien vaut 1 virgule 5 au carré ? A : 2 virgule 25. B : 1 virgule 25. C : 3. Mets pause, et choisis ! »
  - r : « Réponse A : 2 virgule 25. 1 virgule 5 fois 1 virgule 5, calculé entier. »
  - JSON : `{"question":"1,5² = ?","choix":["2,25","1,25","3"],"reponse":0,"explication":"1,5 × 1,5 = 2,25 : le carré d'un décimal se calcule entier."}`
- Q2 après `07-partout` :
  - q : « Question ! Un cône : la génératrice mesure 10 centimètres, le rayon 6 centimètres. Sa hauteur ? A : 8 centimètres. B : 4 centimètres. C : 11 virgule 7 centimètres. Mets pause, et choisis ! »
  - r : « Réponse A : 8 centimètres. La génératrice est l'hypoténuse : 100 moins 36, 64, et la racine de 64, c'est 8. »
  - JSON : `{"question":"Cône : génératrice 10 cm, rayon 6 cm. Sa hauteur ?","choix":["8 cm","4 cm","11,7 cm"],"reponse":0,"explication":"La génératrice est l'hypoténuse : 10² − 6² = 64 ; √64 = 8 cm."}`
**Short** (ceinture orange) — après `01-image` :
  - q : « Question ! Le triangle OAD est rectangle en A. Son hypoténuse ? A : OA. B : OD. C : AD. Mets pause, et choisis ! »
  - r : « Réponse B : OD, le bord du cône. »

---
Les temps `t` (MM:SS, début de l'écran question) sont mesurés sur le rendu final et notés ici, puis recopiés au manifeste (`questions`).
