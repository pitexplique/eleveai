# Rapports : série Équations 4e

## Épisode 01 : reconnaitre (agent pilote, 05/11/2026)

**Fichiers**
- Module commun : `manim/scripts/4e/equation_commun.py` (documenté en en-tête, lecture seule pour les épisodes 02 à 07). `Eq` (équation ou phrase, atome par atome), `dire_eq` (pose au mot), `Balance`, `Charge`, `TableauEssais`, `Metier`, `question_pause` (choix posés au mot), `chrono`, `verdict`, `PaysageEq`, `ShortEq`. Lancé seul, il convertit les cues en marques en datant les deux mots d'une cue double.
- `Balance` et `transformer()` ne servent pas à l'épisode 01 : testées sur une scène d'essai en basse définition seulement (la balance penche, s'équilibre, les charges s'envolent des deux côtés ; le = reste aligné). Le rendu n'a pas été jugé sur un écran réel : à regarder sur la planche des épisodes qui s'en servent. `Coffre` vit dans `equation_reconnaitre.py`.
- Scripts : `manim/scripts/4e/equation_reconnaitre.py` (classe `EquationReconnaitre4e`), `equation_reconnaitre_short.py` (classe `EquationReconnaitreShort`), marques `equation_reconnaitre_marques.json` et `equation_reconnaitre_short_marques.json`.
- Sorties : `manim/sorties/4e/maths/equations/01-reconnaitre/eleveai-maths-4e-equation-reconnaitre.mp4` (3:53) et `eleveai-maths-4e-equation-reconnaitre-short.mp4` (1:12).

**Ceintures** : blanche (paysage et short). **Centres** : `["jeux-defis"]`. **Métier** : Salma, conceptrice d'escape games. **Micro** : `equation_reconnaitre`.

**Chapitres de la paysage (dry run)**
00:00 Reconnaître une équation · 00:06 Le coffre de Salma · 00:24 Une égalité et une inconnue · 00:35 Les trois écritures · 01:00 Question 1 · 01:25 Les deux membres · 01:49 Question 2 · 02:16 Résoudre : les essais · 02:40 Le piège · 02:49 À toi de jouer · 03:11 Correction · 03:29 Ce que tu as appris

**Questions de la paysage**
```json
[
  {"t": "01:00", "question": "Laquelle est une équation ?", "choix": ["5 − 2", "5x − 2 = 8", "5x − 2"], "reponse": 1, "explication": "C'est la seule qui a un signe égal et une lettre."},
  {"t": "01:49", "question": "Dans 4x + 1 = 13, comment s'appelle le 13 ?", "choix": ["l'inconnue", "le premier membre", "le second membre"], "reponse": 2, "explication": "Le second membre : il est à droite du signe égal."}
]
```

**Question du short**
```json
[
  {"t": "00:30", "question": "8 = y − 1, c'est une équation ?", "choix": ["oui", "non", "seulement à l'envers"], "reponse": 0, "explication": "Il y a un signe égal et une lettre. L'inconnue peut être à droite."}
]
```
Question en commentaire : parmi 6 × 2 = 12, 4n − 1 et 4n = 20, laquelle est une équation ?

**Voix** : les mots n'ont pas changé. ⚠️ Une décision à relire : le short promet « 3 secondes à chaque fois », mais le WAV ne laissait que 1,3 s avant chaque verdict. Le script insère donc un silence d'environ 2 s avant les trois verdicts (WAV dérivé dans `media-eq-01-short/voix/`, marques décalées, `public/sons` intact) : le chrono dure vraiment 3 s, et le short passe de 58 s de voix à 1:12.

**Contrôles** : dry run paysage et short : 0 AUDIT-AVANCE, 0 RETARD, 0 BORD (seul reste `AUDIT-ABSENT « 974 »` de @eleveai974, l'écran de fin standard). `verifier-bords-video.py` : 0 instant sur les deux rendus HD.

**Vu sur les planches, corrigé puis re-rendu** : coffre sur le texte de la garde ; « premier membre » sur « second membre » ; couvercle sur l'équation (05) ; zooms qui restaient (x collé au 3) ; cartes remplies de vert par `Indicate`, qui cachaient le texte (écran 02) ; définition trop longue qui sortait du cadre (05) ; coffre coupé par la carte et phrase de réponse sur Ti-Margo (short) ; couvercle ouvert trop près de « Ceinture blanche » (short).

**À savoir pour les épisodes suivants** : la boîte englobante du `Coffre` compte la lueur, le placer avec `.en(x, y)` ; ne jamais `Indicate` un objet rempli ; le chiffre d'un compte à rebours attend le même nombre dans la voix si on n'utilise pas `self.chrono()`. Ce pilote a coûté 5 rendus HD (paysage 2, short 3) au lieu de 2 : le remplissage vert et le couvercle n'ont été vus qu'à la planche finale HD, car la planche basse définition regardait la fin de chaque écran et non ses instants d'animation.

**Soucis restants** : aucun défaut visuel connu.

**Corrections (relecture du 05/11, `defauts-equations.md`)** : aucun mot de la voix changé, durées inchangées (3:53 et 1:12). Paysage 00:24 : le x grandit depuis son coin bas-gauche, à 1,45 au lieu de 1,7, il ne mord plus le 3 (`allumer_lettre` applique le même zoom aux autres lettres collées à leur coefficient : écran 03, membres, correction). Paysage 02:48 : verre de la loupe sans remplissage, plus grand, centré sur le chiffre, il entoure le 2 sans le masquer ; « vrai » écarté pour laisser passer le verre sur le 9. Short 00:30 : la raison passe sur 2 lignes (les 3 manches), équation et tampon remontés, plus rien près du bord de la carte. Vu en plus au contrôle des animations et corrigé : le y de « 4y » flottait au-dessus de la ligne (aligné par le bas de son jambage) ; il garde la ligne de base, et les soulignés des membres descendent pour que son jambage ne les croise pas. Anneau 02:05 vérifié : il ne touche plus rien. Dry run : 0 AUDIT-AVANCE, 0 RETARD, 0 BORD (seul reste `AUDIT-ABSENT « 974 »`, l'écran de fin) ; `verifier-bords-video.py` : 0 instant sur les deux ; rendus HD : paysage 2 (la planche HD a montré le jambage du y qui touchait encore le souligné), short 1, aucune `MemoryError`.

## Épisode 03 : resoudre-simple (05/11/2026)

**Fichiers**
- Scripts : `manim/scripts/4e/equation_resoudre_simple.py` (classe `EquationResoudreSimple4e`), `equation_resoudre_simple_short.py` (classe `EquationResoudreSimpleShort`), marques `equation_resoudre_simple_marques.json` et `equation_resoudre_simple_short_marques.json`.
- Sorties : `manim/sorties/4e/maths/equations/03-resoudre-simple/eleveai-maths-4e-equation-resoudre-simple.mp4` (3:47) et `eleveai-maths-4e-equation-resoudre-simple-short.mp4` (1:05).

**Ceintures** : jaune (paysage), blanche (short). **Centres** : `["animaux", "chiens-chats"]`. **Métier** : Marie, vétérinaire. **Micro** : `equation_resoudre_simple`.

**Chapitres de la paysage**
00:00 Résoudre une équation simple · 00:06 Le chien de Marie · 00:19 La balance · 00:41 Résoudre, c'est défaire · 00:51 La tortue · 01:07 Question 1 · 01:39 Les 3 chiots · 01:54 Le piège des 5 chatons · 02:18 Question 2 · 02:48 Un nombre négatif · 02:59 À toi de jouer · 03:13 Correction · 03:26 Ce que tu as appris

**Questions de la paysage**
```json
[
  {"t": "01:07", "question": "Pour résoudre x − 5 = 12, que fait-on des deux côtés ?", "choix": ["soustraire 5", "ajouter 5", "diviser par 5"], "reponse": 1, "explication": "x = 17. On retirait 5, l'inverse est d'ajouter 5."},
  {"t": "02:18", "question": "4x = 10. Que vaut x ?", "choix": ["6", "2,5", "40"], "reponse": 1, "explication": "Le 4 multiplie x, donc 10 ÷ 4. Le 6, c'est le piège de la soustraction."}
]
```

**Question du short**
```json
[
  {"t": "00:23", "question": "3 sacs identiques d'un côté, 15 billes de l'autre. Combien de billes par sac ?", "choix": ["12", "5", "18"], "reponse": 1, "explication": "3x = 15. On divise par 3 des deux côtés."}
]
```
Question en commentaire : un sac et 7 billes d'un côté, 15 billes de l'autre, combien de billes dans le sac ?

**Voix** : aucun mot changé, aucun silence inséré (la voix ne promet pas de durée).

**Contrôles** : dry run paysage et short : 0 AUDIT-AVANCE, 0 RETARD, 0 BORD (seul reste `AUDIT-ABSENT « 974 »` de @eleveai974, l'écran de fin standard). `verifier-bords-video.py` : 0 instant sur les deux rendus HD. Aucune `MemoryError`. Attention : en `-ql` (15 images/s) l'audit donne de fausses alertes de synchro ; seul le dry run fait foi.

**Complété dans MON script (module commun inchangé)** : `BalanceVeto` et `BalanceHaute` (les plateaux pendent à un portique, car les cordes en triangle du module croisaient les charges), `Pese` (balance à écran), `chien`, `chaton`, `tortue`, `poids`, `E()` et l'ajout des décimaux dans `PAROLE` (« 1,6 » dit « 1 virgule 6 », sans quoi `dire_eq` perd l'atome en silence), `_OutilsVeto` (`descendre`, `sous_membre`, `ph_eq`). Le short importe ces outils du script de la paysage.

**À savoir pour les épisodes suivants**
- `Balance` : ne pas jouer `FadeIn(charge)` et `incliner()` dans le même `play`, la charge finit au mauvais endroit. L'envol de `retirer()` va bien avec `incliner()`.
- Largeur d'un texte en cadre paysage : environ 0,0062 × fs par caractère, à vérifier au dry run.

**Vu sur les planches, corrigé puis re-rendu** : flèches qui barraient « On ajoutait 4 » et « on soustrait 4 » ; phrases qui sortaient du cadre (écrans 02, 05, 06) ; « pas 5 + x » sur « 5 × x » ; réponse de la question 2 illisible (trop petite), le piège passe sous la figure ; le « 10 » coupé par les pointillés, remplacé par 2,5 dans chaque part ; « en équilibre » affiché pendant que la balance penche ; tailles de texte inégales dans le short ; « x » peu lisible sur le sac. Vus sur la planche HD : les deux-points collés au 8 (06), le sac qui touchait le portique, la ligne de question 1 décalée. D'où 2 rendus HD par vidéo.

**Soucis restants** : aucun défaut visuel connu.

**Corrections (relecture du 05/11)** : portique de la question 1 plus haut et « + 5 » moins collés, ils ne touchent plus le fléau (01:31-01:35) ; balances du défi élargies, la case « x + 5 » ne remplit plus son plateau (03:12) ; « ils ont soustrait 5. » passé sur sa propre ligne, en grand, le reste de la colonne descend (02:17) ; libellés de la droite graduée descendus, le point vert ne mord plus « −10 », même agrandi (02:58) ; en plus, chatons un peu réduits : la queue touchait la tête du voisin et les pointillés coupaient les têtes. Short 00:20 : doute non confirmé au zoom (le x bleu est sur un disque sombre, très lisible), short NON re-rendu. Anneau : ne touche plus la question (01:23). Aucun mot de voix changé. Dry run paysage : 0 AUDIT-AVANCE, 0 RETARD, 0 BORD. `verifier-bords-video.py` : 0 instant. 1 rendu HD pour la paysage, aucune `MemoryError`. Durée (3:47), chapitres et questions inchangés.

## Épisode 02 : traduire (05/11/2026)

**Fichiers**
- Scripts : `manim/scripts/4e/equation_traduire.py` (classe `EquationTraduire4e`), `equation_traduire_short.py` (classe `EquationTraduireShort`), marques `equation_traduire_marques.json` et `equation_traduire_short_marques.json`. WAV : `public/sons/4e-equation-traduire/` et `…-short/` (débit −6).
- Sorties : `manim/sorties/4e/maths/equations/02-traduire/eleveai-maths-4e-equation-traduire.mp4` (3:40) et `eleveai-maths-4e-equation-traduire-short.mp4` (1:03).

**Ceintures** : jaune (paysage), blanche (short). **Centres** : `["cinema-series"]`. **Métier** : Camille, monteuse de cinéma. **Micro** : `equation_traduire`.

**Chapitres de la paysage (mesurés au rendu)**
00:00 Traduire par une équation · 00:06 La timeline de Camille · 00:29 Le dictionnaire des mots · 00:45 Un exemple, morceau par morceau · 01:00 Question 1 · 01:33 Attention à l'ordre · 01:49 Le piège des parenthèses · 02:07 Question 2 · 02:38 À toi de jouer · 02:57 Correction · 03:18 Ce que tu as appris

**Questions de la paysage**
```json
[
  {"t": "01:00", "question": "Le triple de x vaut 21. Quelle équation ?", "choix": ["x + 3 = 21", "3x = 21", "x = 3 × 21"], "reponse": 1, "explication": "Le triple de x, c'est 3 fois x, pas x plus 3."},
  {"t": "02:07", "question": "Le double de x augmenté de 1 vaut 9. Quelle équation ?", "choix": ["2x + 1 = 9", "2(x + 1) = 9", "2 + x + 1 = 9"], "reponse": 0, "explication": "On prend le double, puis on ajoute 1."}
]
```

**Question du short**
```json
[
  {"t": "00:23", "question": "Le double de x vaut 14.", "choix": ["x + 2 = 14", "2x = 14", "x = 28"], "reponse": 1, "explication": "Le double, c'est 2 fois."}
]
```
Question en commentaire : le triple de x augmenté de 4 vaut 19, écris l'équation.

**Voix** : aucun mot changé. ⚠️ Une décision à relire : le short joue une course avec chrono, mais le WAV ne laisse que 0,5 à 0,75 s entre la phrase et l'équation. Le script insère donc environ 3 s de silence avant chacune des deux équations (WAV dérivé dans `media-eq-02-short/voix/`, marques décalées, `public/sons` intact) : le chrono dure vraiment 3 s.

**Contrôles** : dry run paysage et short : 0 AUDIT-AVANCE, 0 RETARD, 0 BORD (seul reste `AUDIT-ABSENT « 974 »` de @eleveai974, l'écran de fin standard). `verifier-bords-video.py` : 0 instant sur les deux rendus HD finaux.

**Vu sur les planches, corrigé puis re-rendu** : « Le triple de x, c'est » dont le p touchait la barre (question 1) ; « générique » peu contrasté sur le bloc violet ; la flèche du 10 qui s'arrêtait avant le bloc 4, et le 10 collé à la barre (écran 04 : le bloc 4 reste maintenant à sa vraie place, la flèche finit pile à son bord) ; Ti-Margo sur le mât du drapeau à l'arrivée (short). Corrigé dès la basse définition : explications de réponse réduites par `col()` (déplacées à gauche, en grand, sur la figure) ; x cachés sous le bloc 4 ; lignes serrées du short.

**Rendus HD** : paysage 3, short 2. Aucun `MemoryError`. La mémoire libre est descendue à 0,1 Go en attente : les rendus ont attendu 2 Go.

**À savoir pour les épisodes suivants** : `Eq` plante sur « ff » (« différence ») : Pango en fait une ligature, le compte des lettres ne tombe plus juste. Couper la ligne et poser ce mot avec `T`. Un atome final sans mot dans la phrase (« min » pour « minutes ») n'est jamais posé par `dire_eq` : le poser avec `au`. `equation_commun.py` n'a pas été modifié ; `bloc`, `rangee`, `Piste`, `Clap` et `Livre` vivent dans `equation_traduire.py`.

**`Balance` et `transformer()`** : non utilisées ici, toujours pas jugées sur un écran réel.

**Soucis restants** : aucun défaut visuel connu.

**Corrections (relecture du 05/11)** : interligne de « Ce que tu as appris » desserré (03:26) ; x blanc sur le bloc bleu (00:26, doute confirmé), et aussi sur les 3 blocs de la correction, même défaut ; cadre de 3x = 21 et x + 3 = 11 du short élargi (00:22), équation passée de 48 à 44 pour tenir dans la carte ; flèche sans valeur du short (00:52-00:56, doute confirmé) : elle porte maintenant « 19 », affiché juste après le mot ; en plus, cadres des équations de la paysage élargis (écrans 01, 03, correction), serrés de la même façon. Anneau : ne touche plus la question aux deux questions de la paysage. Aucun mot de voix changé. Dry run paysage et short : 0 AUDIT-AVANCE, 0 RETARD, 0 BORD. `verifier-bords-video.py` : 0 instant sur les deux. 1 rendu HD pour chacune, aucune `MemoryError`. Durées inchangées : 3:40 et 1:03.

## Épisode 05 : resoudre-distributivite (05/11/2026)

**Fichiers**
- Scripts : `manim/scripts/4e/equation_resoudre_distributivite.py` (classe `EquationResoudreDistributivite4e`), `equation_resoudre_distributivite_short.py` (classe `EquationResoudreDistributiviteShort`), marques `equation_resoudre_distributivite_marques.json` et `equation_resoudre_distributivite_short_marques.json`. WAV : `public/sons/4e-equation-resoudre-distributivite/` et `…-short/` (débit −6).
- Sorties : `manim/sorties/4e/maths/equations/05-resoudre-distributivite/eleveai-maths-4e-equation-resoudre-distributivite.mp4` (3:29) et `eleveai-maths-4e-equation-resoudre-distributivite-short.mp4` (1:11).

**Ceintures** : verte (paysage), blanche (short). **Centres** : `["electro-dj", "musique"]`. **Métier** : Nathan, DJ. **Micro** : `equation_resoudre_distributivite`.

**Chapitres de la paysage (mesurés au rendu)**
00:00 Résoudre avec des parenthèses · 00:05 La timeline de Nathan · 00:24 Première route : diviser · 00:37 Deuxième route : développer · 00:54 Deux routes, la même solution · 01:03 Question 1 · 01:33 Le piège · 01:45 Avec un moins · 01:59 Question 2 · 02:26 À toi de jouer · 02:48 Correction · 03:06 Ce que tu as appris

**Questions de la paysage**
```json
[
  {"t": "01:03", "question": "Que donne 2(x + 3) quand on développe ?", "choix": ["2x + 3", "2x + 6", "x + 6"], "reponse": 1, "explication": "Le 2 multiplie x, et il multiplie aussi le 3."},
  {"t": "01:59", "question": "4(x − 2) = 12. Que vaut x ?", "choix": ["3", "1", "5"], "reponse": 2, "explication": "On divise par 4 : x − 2 = 3. On ajoute 2 : x = 5."}
]
```

**Question du short**
```json
[
  {"t": "00:30", "question": "2(x + 5) = 16. Que vaut x ?", "choix": ["3", "8", "5,5"], "reponse": 0, "explication": "x + 5 = 8, donc x = 3."}
]
```
Question en commentaire : 5(x + 2) = 35, que vaut x ?

**Voix** : aucun mot changé, aucun silence inséré (la voix ne promet pas de durée).

**Contrôles** : dry run paysage et short : 0 AUDIT-AVANCE, 0 RETARD, 0 BORD (dans la paysage, seul reste `AUDIT-ABSENT « 974 »` de @eleveai974, l'écran de fin standard). `verifier-bords-video.py` : 0 instant sur les deux rendus HD finaux.

**Complété dans MON script (module commun inchangé)** : `Bloc`, `partie`, `platine`, `Barre`, `E()` et `PAROLE` (« 5,5 »), `_OutilsDj` (`glisser` : les atomes d'une ligne de calcul glissent depuis la ligne d'avant ; `deux_cotes`, `sous_membre`, `ph_eq`, `fleche_arc`). Le short importe ces outils du script de la paysage.

**Vu sur les planches, corrigé puis re-rendu** : basse définition : titres des deux routes hors cadre, lignes de calcul serrées, deuxième partie de la timeline sans texte, « 2x + 3 » sur « est faux », réponse de la question 2 trop petite (les calculs passent en grand sous la figure), correction serrée sous la timeline ; dans le short, équations trop larges, pion sur les nombres, dernière phrase hors cadre. Planche HD : « ÷ 2 » collé au cadre de x = 4, flèche collée à la parenthèse, « − 6 » collé au cadre de a = 4, puis x et le 4 serrés dans leurs cadres. D'où 3 rendus HD pour la paysage, 1 pour le short. Aucun `MemoryError`.

**À savoir pour les épisodes suivants** : `Eq` plante aussi sur « fi » (« fini ») : ce mot se pose avec `T`. `ph_eq` doit caler la largeur et non la hauteur, sinon une ligne longue sort du cadre du short.

**Soucis restants** : aucun défaut visuel connu.

**Corrections (relecture du 05/11)** : colonnes des deux routes redisposées et phrases du bas descendues, plus rien ne touche les cadres x = 4 (01:02, et colonne de droite dès 00:52). Opérations de la correction passées de 26 à 34, lignes plus espacées (03:01-03:04) ; celles des deux routes de 30 à 34, par cohérence. Le résultat a = 4 grandit puis reste environ 3 s, et l'écran se vide en fondu : silence après la voix, la paysage passe de 3:27 à 3:29, « Ce que tu as appris » à 03:06. Contraste : blocs de l'inconnue en bleu foncé (`BLEU_BLOC`), plus aucune strie sous leur nom (paysage et short). Short : trait central décalé à gauche et lignes de 23 à 22, le 2x ne le touche plus (00:20-00:28) ; « Lui développe : » écarté du coureur (00:20) ; 01:00 : doute levé, ce n'est pas « x − 1/2 » mais le x et le 2 de x + 2 dans leurs blocs, les stries faisaient croire à un trait : aucune barre, règle respectée. Vu en plus : le cercle rouge du piège frôlait la parenthèse, le 3 oublié est maintenant souligné ; « ÷ 2 » et « − 6 » trop près des cadres. Aucun mot de voix changé, questions inchangées. Dry run paysage et short : 0 AUDIT-AVANCE, 0 RETARD, 0 BORD (seul reste `AUDIT-ABSENT « 974 »`, l'écran de fin). `verifier-bords-video.py` : 0 instant sur les deux. Rendus HD : paysage 2 (la planche HD a montré le cercle et les opérations serrées), short 1, aucune `MemoryError`. Durée du short inchangée (1:11).

## Épisode 04 : resoudre-reduction (05/11/2026)

**Fichiers**
- Scripts : `manim/scripts/4e/equation_resoudre_reduction.py` (classe `EquationResoudreReduction4e`), `equation_resoudre_reduction_short.py` (classe `EquationResoudreReductionShort`), marques `equation_resoudre_reduction_marques.json` et `equation_resoudre_reduction_short_marques.json`.
- Sorties : `manim/sorties/4e/maths/equations/04-resoudre-reduction/eleveai-maths-4e-equation-resoudre-reduction.mp4` (3:31) et `eleveai-maths-4e-equation-resoudre-reduction-short.mp4` (1:01).

**Ceintures** : orange (paysage), blanche (short). **Centres** : `["course-trail", "sport"]`. **Métier** : Awa, entraîneuse. **Micro** : `equation_resoudre_reduction`.

**Chapitres de la paysage**
00:00 Résoudre en réduisant · 00:06 La boucle d'Awa · 00:24 Réduire : 2x + 3x = 5x · 00:39 On résout · 00:53 x tout seul, c'est 1x · 01:07 Question 1 · 01:29 Le piège · 01:42 Les t et les nombres ensemble · 02:05 Question 2 · 02:31 À toi de jouer · 02:49 Correction · 03:10 Ce que tu as appris

**Questions de la paysage**
```json
[
  {"t": "01:07", "question": "Combien vaut 4x − x ?", "choix": ["4", "3x", "4x²"], "reponse": 1, "explication": "x tout seul, c'est 1x."},
  {"t": "02:05", "question": "5x − 2x = 9. Que vaut x ?", "choix": ["3", "6", "9"], "reponse": 0, "explication": "5x − 2x, 3x. Donc 3x = 9, et x = 3."}
]
```

**Question du short**
```json
[
  {"t": "00:22", "question": "3x + 4x = 21. Que vaut x ?", "choix": ["3", "7", "14"], "reponse": 0, "explication": "3x + 4x, 7x. Donc 7x = 21."}
]
```
Question en commentaire : 6x − 2x = 20, que vaut x ?

**Voix** : aucun mot changé, aucun silence inséré (la voix ne promet pas de durée).

**Contrôles** : dry run paysage et short : 0 AUDIT-AVANCE, 0 RETARD, 0 BORD (seul reste `AUDIT-ABSENT « 974 »` de @eleveai974, l'écran de fin standard). `verifier-bords-video.py` : 0 instant sur les deux rendus HD. Aucune `MemoryError`.

**Complété dans MON script (module commun inchangé)** : `Boucle`, `rang`, `coureuse`, `jeton`, `chrono_main`, `barre_parts`, `par_morceaux` (une ligne dite en plusieurs temps) ; ajouts à `PAROLE` : « km » dit « kilomètres », « ² » dit « carré ». Le short ajoute `Paquet` et importe `_OutilsReduc`.

**À savoir pour les épisodes suivants**
- Un atome sans mot dans la phrase et sans voisin à droite n'apparaît JAMAIS : `dire_eq` le perd en silence. Il faut l'ajouter à `PAROLE`.
- `dire_eq(e, "les nombres")` prend la PREMIÈRE occurrence dans la voix : avec un mot répété, passer `n=2`, sinon l'audit signale un RETARD de plusieurs secondes.
- Un rectangle plein posé après un objet le cache : un bac qui reçoit des objets reste sans remplissage.
- Largeur d'un texte en cadre paysage : environ 0,0074 × fs par caractère (mesuré sur la planche), plutôt que 0,0062.
- Le dry run est lent quand la machine rend : pas de `timeout 300`, il coupe l'audit en silence.

**Vu sur les planches, corrigé puis re-rendu** : basse définition : `2x + 3x = 15` sur Awa ; les « 3 » et les coupes de la bande posés hors de la bande (écran 03) ; « D'abord réduire » sur « ensuite résoudre » ; « ce n'est pas » collé à 2x + 3 et à 5x ; bacs pleins qui cachaient les boucles, légendes plus larges que les bacs (écran 05) ; « Exemple. » sur l'équation (écran 06) ; la coureuse sur la 1re ligne du défi ; le « : » caché par 5x (correction). Planche HD : lignes serrées et « Exemple. » qui touchait son équation (écran 06), « x » blanc dans « Que vaut x ? ». D'où 3 rendus HD pour la paysage et 2 pour le short.

**Soucis restants** : aucun défaut visuel connu.

**Corrections (relecture du 05/11, `defauts-equations.md`)** : aucun mot de la voix changé, durées inchangées (3:31 et 1:01). Paysage 00:37 : « 2 boucles + 3 boucles » descendu sous le cadre vert. Paysage 00:37 et 02:04 : cadres desserrés (5x = 15, 2x, 3x, 2t, 12, t, −3, 3t, 9, t = 6), et les atomes des équations encadrées écartés (`aerer()`, dans MON script), le = reste aligné ; écran 06 redisposé. Paysage 01:05 et short 00:16-00:22 : le cadre de « x = 4. » et « x = 3. » prend le point final, en vert. Paysage 03:14-03:23 : doute confirmé, « x = 1x » était là 10 s trop tôt, il arrive maintenant au mot « 1 x », comme le « 1x » de la ligne (le 2x + 3x = 5x reste un rappel). Short 00:20-00:22 : tout remonte et rétrécit, le bas du texte a 0,75 d'air au-dessus de Ti-Margo, « Regrouper d'abord, » et « et tout devient facile. » à la même taille. Vu en plus et corrigé : barre rouge de la 4e boucle qui touchait le cadre vert, « x tout seul » trop près de 4x − 1x = 3x, « et » et « Donc » collés à leur cadre ; short 00:07 : le + collé au paquet de gauche, recentré (vu sur la planche HD). Anneau 01:19 vérifié : il ne touche plus rien. Dry run : 0 AUDIT-AVANCE, 0 RETARD, 0 BORD (seul reste `AUDIT-ABSENT « 974 »`, l'écran de fin). `verifier-bords-video.py` : 0 instant sur les deux. Rendus HD : paysage 1, short 2 (à cause du +), aucune `MemoryError`.

## Épisode 06 : verifier (05/11/2026)

**Fichiers**
- Scripts : `manim/scripts/4e/equation_verifier.py` (classe `EquationVerifier4e`), `equation_verifier_short.py` (classe `EquationVerifierShort`), marques `equation_verifier_marques.json` et `equation_verifier_short_marques.json`. WAV : `public/sons/4e-equation-verifier/` et `…-short/` (débit −6, repris du premier agent, figé : 15 + 6 WAV et toutes les clés de marques vérifiés, mot à mot).
- Sorties : `manim/sorties/4e/maths/equations/06-verifier/eleveai-maths-4e-equation-verifier.mp4` (3:45) et `eleveai-maths-4e-equation-verifier-short.mp4` (1:05).

**Ceintures** : orange (paysage), blanche (short). **Centres** : `["espace", "sciences"]`. **Métier** : Aïcha, ingénieure du spatial. **Micro** : `equation_verifier`.

**Chapitres de la paysage (dry run, renderer.time)**
00:00 Vérifier une solution · 00:05 Le tableau de contrôle d'Aïcha · 00:24 On remplace x · 00:38 Le tableau d'essais · 00:56 Question 1 · 01:22 Vérifier démasque les erreurs · 01:43 Et zéro ? · 01:56 Question 2 · 02:26 x des deux côtés · 02:47 À toi de jouer · 03:01 Correction · 03:21 Ce que tu as appris

**Questions de la paysage**
```json
[
  {"t": "00:56", "question": "Le nombre 2 est-il solution de 3x = 9 ?", "choix": ["oui", "non", "on ne peut pas savoir"], "reponse": 1, "explication": "3 × 2 = 6. Ce n'est pas 9."},
  {"t": "01:56", "question": "0 est-il solution de x + 5 = 5 ?", "choix": ["non, 0 n'est jamais solution", "oui", "non, car il faut un nombre positif"], "reponse": 1, "explication": "0 + 5 = 5. L'égalité est vraie."}
]
```

**Question du short**
```json
[
  {"t": "00:20", "question": "3x = 0, donc x = 0. Vrai ou faux ?", "choix": ["vrai", "faux", "impossible à savoir"], "reponse": 0, "explication": "3 × 0 = 0. Zéro est une vraie solution."}
]
```
Question en commentaire : x = 6 est-il solution de 2x − 5 = 7 ? Vrai ou faux ?

**Voix** : aucun mot changé, aucun silence inséré (« dix secondes » désigne la durée d'un contrôle, pas un chrono à l'écran).

**Contrôles** : dry run paysage et short : 0 AUDIT-AVANCE, 0 RETARD, 0 BORD (dans la paysage, seul reste `AUDIT-ABSENT « 974 »` de @eleveai974, l'écran de fin standard). `verifier-bords-video.py` : 0 instant sur les deux rendus HD finaux. Aucune `MemoryError`.

**Complété dans MON script (module commun inchangé)** : `Fusee`, `Voyant`, `Panneau`, `DeuxCases` (gauche et droite calculées dans deux cases, le signe = ou ≠ entre les deux), `Loupe`, `E()` et `PAROLE` (« 1,6 »), `_OutilsVerif` (`ph_eq`), `_disposer_q` à cartes larges pour la question 2. Le short ajoute `Detecteur` et importe `Voyant` et `_OutilsVerif`.

**À savoir pour les épisodes suivants**
- `Eq` plante sur « affirme » (« ff » et « fi ») : ce mot se pose avec `T` ou `tx`.
- Un audit fait sur un rendu `-ql` (15 images par seconde) signale de fausses AVANCE et de faux TARD (0,06 s, ou plusieurs secondes sur un nombre répété) : l'audit qui compte est le dry run en 60 images par seconde.
- Les lignes `AUDIT-` tombent sur la même ligne de console que les barres de progression : filtrer après `tr '\r' '\n'`.
- Pour des choix longs, reconstruire les cartes depuis des copies : `_carte_choix` réduit l'`Eq` et ne l'agrandit plus ensuite.

**Vu sur les planches, corrigé puis re-rendu** : basse définition : « 2x + 1 = 9 » collé à « et trouve », le 4 écrasé sur le x (écran 02), « ≠ » sur les cases de la question 1, « Quelqu'un écrit : » collé à 5x, « Non, 4 n'est » sur la case de la correction, lignes de « Ce que tu as appris » trop petites ; dans le short, le « ? » du voyant resté sur le rouge (devient « ! »), l'aiguille sur « faux », un verdict hors cadre. Planche HD : nombres serrés dans les cases, loupe contre la rature, lignes serrées dans le short, puis « = » qui mordait sur les cases de la question 2. D'où 3 rendus HD pour la paysage et 2 pour le short.

**Corrections (relecture du 05/11, paysage seule, short non re-rendu, voix inchangée)** : 00:28 flèche du 4 relevée, elle ne touche plus le x ; 00:47-00:55 colonnes du tableau élargies (2,6 / 2,4 / 2,2) pour « On essaie » ; 01:04-01:21 rappel 3x = 9 remonté et cartes écartées, ≠ au large ; 02:24 cartes de la question 2 écartées, = au large ; 03:19 pastilles et textes décalés, « Non, 4 n'est pas solution » à distance égale de la case et de la pastille. Anneau vérifié à 01:08 : il ne touche plus la question. Vus en plus et corrigés : étiquettes « à gauche » / « à droite » remises sur la même ligne d'écriture, voyant qui touchait le nez de la fusée (écrans 02 et 06), « Les deux membres » serré sous les cases (02), « à gauche » serré sous la ligne (05), « La bonne solution » serré (04). Ces deux derniers, vus au zoom sur le premier rendu, ont demandé un 2e rendu HD au lieu d'un seul. Dry run : 0 AUDIT-AVANCE, 0 RETARD, 0 BORD (seul reste `AUDIT-ABSENT « 974 »`). `verifier-bords-video.py` : 0 instant. Durée 3:45 inchangée, donc chapitres et `t` des questions inchangés. Aucune `MemoryError`.

**Soucis restants** : aucun défaut visuel connu.

## Épisode 07 : defi (05/11/2026)

**Fichiers**
- Scripts : `manim/scripts/4e/equation_defi.py` (classe `EquationDefi4e`), `equation_defi_short.py` (classe `EquationDefiShort`), marques `equation_defi_marques.json` et `equation_defi_short_marques.json`.
- Sorties : `manim/sorties/4e/maths/equations/07-defi/eleveai-maths-4e-equation-defi.mp4` (3:45) et `eleveai-maths-4e-equation-defi-short.mp4` (1:05).

**Ceintures** : verte (paysage), blanche (short). **Centres** : `["jeux-defis"]`. **Métier** : Lina, correctrice de manuels. **Micro** : `equation_defi`.

**Chapitres de la paysage**
00:00 Défi sur les équations · 00:07 Lina, correctrice de manuels · 00:25 Bonne réponse, faux raisonnement · 00:40 Le vrai chemin · 00:55 Question 1 · 01:27 Autre copie : Lina vérifie · 01:46 Question 2 · 02:20 x des deux côtés · 02:43 À toi de jouer · 02:57 Correction · 03:23 Ce que tu as appris

**Questions de la paysage**
```json
[
  {"t": "00:55", "question": "Quel calcul prouve que 3 est solution de 2x + 1 = 7 ?", "choix": ["2 + 3 + 1 = 6", "2 × 3 + 1 = 7", "7 − 1 = 6"], "reponse": 1, "explication": "On remplace x par 3 dans l'équation de départ, et on trouve bien 7."},
  {"t": "01:46", "question": "Une copie dit : 3x = 12, donc x = 9. Quelle est l'erreur ?", "choix": ["il fallait ajouter 3", "il fallait diviser par 3", "il n'y a pas d'erreur"], "reponse": 1, "explication": "Le 3 multiplie x : on divise par 3, et x = 4. La copie a soustrait 3."}
]
```

**Question du short**
```json
[
  {"t": "00:21", "question": "a + 2 = 11, donc a = 13. Où est l'erreur ?", "choix": ["il fallait soustraire 2", "il fallait multiplier par 2", "il n'y a pas d'erreur"], "reponse": 0, "explication": "On soustrait 2, et a = 9."}
]
```
Sur les cartes du short, seul le cœur du choix est écrit (« soustraire 2 », « multiplier par 2 », « pas d'erreur ») : la phrase entière rétrécissait trop une fois la réponse allumée. Question en commentaire : 3x + 4 = x + 10, que vaut x ?

**Voix** : aucun mot changé, aucun silence inséré (la voix ne promet pas de durée).

**Contrôles** : dry run paysage et short : 0 AUDIT-AVANCE, 0 RETARD, 0 BORD (dans la paysage, seul reste `AUDIT-ABSENT « 974 »` de @eleveai974, l'écran de fin standard). `verifier-bords-video.py` : 0 instant sur les deux rendus HD finaux. Aucune `MemoryError`.

**Complété dans MON script (module commun inchangé)** : `E` (une `Eq` sans ligature), `encre`, `Feuille`, `Stylo`, `De`, `coche_x`, `_OutilsDefi` (`entourer`, `glisser`, `ph_eq`, `rouler`, `tag`, `fleche_etape`). Le short importe ces outils du script de la paysage.

**À savoir pour la suite**
- `E` règle le plantage de `Eq` sur « ff » et « fi » : la référence se construit avec `Text(s, disable_ligatures=True)`, mais ce `Text` garde alors un sous-objet par caractère, ESPACES COMPRIS : il faut les retirer avant de découper. Cela pourrait passer dans `equation_commun.py`.
- Ne jamais nommer `self.points` un sous-objet d'un `VGroup` : `points` est le tableau de coordonnées de Manim (`'VGroup' object has no attribute 'shape'`).
- Un script de contrôle hors du dossier doit donner `fichier_marques` en chemin absolu.

**Vu sur les planches, corrigé puis re-rendu** : basse définition : coche sous la croix et croix sur « x = 4 » (short), texte de la feuille hors feuille (short), cartes trop petites (short) ; feuille sur « 2x + 3 » (écran 03), flèches sur « On soustrait », texte hors feuille (question 1), réponse illisible (question 1), « Mets pause » sur la feuille (défi), « Correction » sur l'équation, le 2x de droite mal désigné (écran 05), phrase de réponse hors cadre (question 2). Planche HD : « a » sur la marge, croix collée au 15, cadres serrés autour de x = 5 et x = 7, cadre de x = 5 sur « ÷ 2 », « = » collé entre 17 à gauche et 17 à droite puis entre les cases de la correction, « À droite » décalé de « à gauche », « C'est juste. » collé à la case (paysage) ; « 2x + 3 = 11 » collé à la feuille, « Sauras-tu… » trop petit (short). D'où 4 rendus HD pour la paysage et 2 pour le short.

**Soucis restants** : aucun défaut visuel connu.

**Corrections (relecture du 05/11)** : libellés « À gauche » / « À droite » écrits pareil, même écart à la case, même ligne de base (03:16-03:23). Ellipse de 00:39 élargie, la ligne « car… » passée de 32 à 30 : elle passe au large du 9 et du « car » ; stylo garé plus bas, il ne touche plus l'ellipse. Ellipse de 01:45 : « + 2 » écarté du 11 et du =, ellipse plus large, plus aucun contact ; ligne « donc… » de 34 à 32 pour tenir dans la feuille. Écran « x des deux côtés » (02:32-02:40) : chaque opération s'écrit sous le terme visé (− 2x sous 4x et sous 2x, + 3 sous − 3 et sous 7, ÷ 2 sous 2x et sous 10), planche confirmée ; x = 5 descendu, « ÷ 2 » ne serre plus son cadre. Vu en plus et corrigé : le a et « donc » sur la marge rouge de la feuille (écran 04), décalés à droite ; lignes rapprochées des − 2x, redistribuées ; envol du 2x, qui serait passé par le titre et l'équation, il passe maintenant dessous. Aucun mot de voix changé, questions et chapitres inchangés, durée inchangée (3:45), short non re-rendu. Dry run : 0 AUDIT-AVANCE, 0 RETARD, 0 BORD (seul reste `AUDIT-ABSENT « 974 »`, l'écran de fin). `verifier-bords-video.py` : 0 instant. 1 rendu HD, aucune `MemoryError`.
