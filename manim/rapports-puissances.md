
## Épisode 01 « comprendre » — SHORT ceinture blanche « Plie une feuille en deux » (04/11)
- Fichiers : `manim/scripts/4e/puissance_comprendre_short.py` (classe `PuissanceComprendreShort`, base `ShortProp` importée de 6e/prop_commun.py, rien de commun modifié), `puissance_comprendre_short_marques.json` (+ `.cues.tsv`), WAV `public/sons/4e-puissance-comprendre-short/`, sortie `manim/sorties/4e/maths/puissances/01-comprendre/eleveai-maths-4e-puissance-comprendre-short.mp4` (1080 × 1920, 62,5 s), media `manim/scripts/4e/media-puiss-01-short`.
- Voix : clé `04-abonne` AJOUTÉE (la phrase de fin du 19/10, absente de la voix validée) ; rien d'autre changé. Marques : les « 2 fois » répétés gardent chacun leur instant (cues2marques les fusionnait).
- Ceinture : blanche. Centres : `sciences`.
- Dessin : en haut la feuille de profil qui se rabat (moitié bleue qui passe par-dessus), pile de 1 → 32 traits, nombre de couches en vert ; en bas compteur de pliages orange, produit bleu qui s'allonge puis se replie en 2, l'orange 5 vole à l'exposant : 2⁵ = 32 ; « Pas 2 × 5 ! » rouge + 10 barré.
- Dry run : 0 AUDIT-AVANCE, 0 RETARD, 0 BORD (seul « TARD 3 » = le chiffre du compte à rebours, comme le modèle). Bords HD : « 0 instants qui touchent un bord ».
- questions :
```json
[{"t": "00:14", "question": "Après 3 pliages, combien de couches ?", "choix": ["6", "8", "9"], "reponse": 1, "explication": "2 × 2 × 2 = 2³ = 8 couches."}]
```
- Écrans : accroche 00:00, pliages 00:07, question 00:14, réponse 00:27, suite (2⁵ = 32) 00:33, commentaire (7 pliages) 00:47, fin 00:56.
- Planches regardées : pliage lisible, pile qui s'épaissit, produit/compteur synchrones.
- Correction 04/11 (défaut mineur) : « Pas 2 × 5 ! » sur sa ligne, le 10 barré sur la ligne d'en dessous, 2⁵ = 32 remonté et un peu réduit ; mêmes temps. Nouveau dry run propre, re-rendu HD unique sous verrou, bords = 0 instant, planche regardée : plus aucun chevauchement (même pendant l'agrandissement du 32). Aucun souci restant.

## Épisode 01 « Comprendre une puissance » — PAYSAGE 4e + 3e (agent paysage, 04/11)
- Script : `manim/scripts/4e/puissance_comprendre.py` (base `PuissanceComprendreBase` + `PuissanceComprendre4e` / `PuissanceComprendre3e`, seule l'identité change) ; marques `manim/scripts/4e/puissance_comprendre_marques.json` (+ `.cues.tsv`) ; WAV `public/sons/4e-puissance-comprendre/` (débit −6). Voix inchangée.
- ⚠️ Marques : `cues2marques.py` sautait TOUS les « 3 fois » consécutifs (« 3 fois 3 fois 3 fois 3 » n'avait qu'une marque). Converti avec une copie corrigée (doublons sautés PAR PAIRES) gardée dans mon dossier temporaire ; `scripts/cues2marques.py` non modifié — à corriger pour les épisodes à facteurs répétés.
- Sorties : `manim/sorties/4e/maths/puissances/01-comprendre/eleveai-maths-4e-puissance-comprendre.mp4` et `manim/sorties/3e/maths/puissances/01-comprendre/eleveai-maths-3e-puissance-comprendre.mp4` — 1920 × 1080, **4:29** chacune. Ceinture BLANCHE (les deux). Centres : `reseaux-sociaux`, `art-design`, `sciences`.
- Micros : 4e `puissance_comprendre`, 3e `entier_puissance_comprendre`. Métiers : analyste de données, graphiste, biologiste.
- Chapitres (dry run) : 00:00 Comprendre une puissance · 00:10 La vidéo du chat d'Inès · 00:26 L'arbre des partages : 81, pas 12 · 00:57 Base et exposant : 3⁴ · 01:17 Question 1 · 01:49 Le carré : 4² · 02:14 Le cube : 3³ · 02:28 Les pièges · 02:53 Question 2 · 03:18 À toi de jouer · 03:39 Correction · 04:01 Ce que tu as appris
- questions (mêmes temps pour la 4e et la 3e) :
```json
[{"t": "01:17", "question": "Comment écrire 5 × 5 × 5 avec une puissance ?", "choix": ["5³", "3⁵", "5 × 3"], "reponse": 0, "explication": "La base, c'est 5, le nombre répété. L'exposant, 3, compte les facteurs."},
 {"t": "02:53", "question": "Combien vaut 2 puissance 4 ?", "choix": ["8", "16", "6"], "reponse": 1, "explication": "2 × 2 × 2 × 2 = 16. 8, c'est 2 × 4 : le piège."}]
```
- Contrôles : dry run AUDIT/BORDS = 0 AUDIT-AVANCE, 0 RETARD, 0 BORD (seul « 974 » de l'écran de fin standard, absent de la voix). `verifier-bords-video.py` = 0 instant sur les deux mp4.
- Planches regardées (basse déf puis finale HD) : corrigé avant le rendu final la question trop à droite de l'écran 01, l'étiquette « biologiste », la phrase de réponse des questions (trop petite → à gauche sous la figure, 32 px), « = 16 » collé, l'exposant de aⁿ pas assez haut, les « Envoi 1…4 » trop serrés (arbre élargi, re-rendu HD des deux). Arbre, carré rangée par rangée (4 × 2 = deux rangées en rouge), cube qui s'empile, 32 carrés contre 10, bactéries 2 → 32 : lisibles. Aucun souci restant.

## Épisode 02 « calculer » — PAYSAGE 4e + 3e (ceinture jaune) et SHORT 4e (ceinture blanche) (04/11)
- Fichiers : `manim/scripts/4e/puissance_calculer.py` (base `PuissanceCalculerBase` + `PuissanceCalculer4e` / `PuissanceCalculer3e`, mixin `AuNombre` : un `au_mot("Moins 2")` attend le « 2 », pas « Moins »), `puissance_calculer_short.py` (`PuissanceCalculerShort`), marques `puissance_calculer_marques.json` / `puissance_calculer_short_marques.json` (+ `.cues.tsv`), WAV `public/sons/4e-puissance-calculer[-short]/` (débit −6). Rien de commun modifié. Voix : AUCUN changement.
- Sorties : `manim/sorties/4e/maths/puissances/02-calculer/eleveai-maths-4e-puissance-calculer.mp4` (4:33), `manim/sorties/3e/maths/puissances/02-calculer/eleveai-maths-3e-puissance-calculer.mp4` (4:33), `manim/sorties/4e/maths/puissances/02-calculer/eleveai-maths-4e-puissance-calculer-short.mp4` (0:56, 1080 × 1920). Media : `manim/scripts/4e/media-puiss-02-4e`, `-3e`, `-short`.
- Ceintures : paysage JAUNE (4e et 3e) ; short BLANCHE (échelle entière sous le titre).
- Centres : paysage `cuisine`, `jeux-defis` ; short `jeux-defis`, `technologie-ia`.
- Micros : 4e `puissance_calculer`, 3e `entier_puissance_calculer`.
- Dessins : 01 calculatrices de Léo (−16) et Maya (16), ≠ ; 02 cheffe pâtissière, pâte qui passe de 3 à 9, 27, 81 couches pendant l'échelle 3, × 3 = 9, × 3 = 27, × 3 = 81 (4 flèches de pliage qui verdissent) ; 03 (−2)⁴ encadré bleu « la base : −2 », 4 facteurs, signes moins orange liés par paires (arcs « + ») → = 16 ; 04 −2⁴, flèche orange exposant → 2, 2⁴ = 16 puis le « − » posé devant → −16 ; 05 tableau pair / impair (+ vert / − violet) avec (−2)⁴ = 16 et (−2)³ = −8 ; 06 grande calculatrice, touches ( ) qui s'allument, écran −2⁴ / −16 ; 07 défi (−2)⁵ et −2⁵ ; 07b cinq « − », deux paires + un seul (violet) → −32, et 2⁵ = 32 → −32, les deux −32 agrandis puis rétrécis. Short : calculatrice en haut (−2^4, −16, « ? », coche, touches ( ), (−2)^4 = 16), calcul décomposé en bas en même temps.
- Paysage, questions :
```json
[{"t": "00:49", "question": "Combien vaut 4³ ?", "choix": ["12", "64", "81"], "reponse": 1, "explication": "4 × 4 = 16, × 4 = 64. 12 = 4 × 3 : le piège !"},
 {"t": "02:15", "question": "Combien vaut (−3)² ?", "choix": ["−9", "9", "−6"], "reponse": 1, "explication": "(−3) × (−3) : deux signes moins, le résultat est positif."},
 {"t": "02:53", "question": "Combien vaut −5² (sans parenthèses) ?", "choix": ["25", "−25", "−10"], "reponse": 1, "explication": "Sans parenthèses : 5² = 25, et le moins reste devant."}]
```
- Short, questions :
```json
[{"t": "00:22", "question": "(−3)² = ?", "choix": ["−9", "9", "6"], "reponse": 1, "explication": "Deux signes moins : le résultat est positif."}]
```
- Chapitres paysage (ECRAN du rendu HD) : 00:00 Calculer une puissance · 00:07 Deux calculatrices, deux résultats · 00:26 Pas à pas : la pâte feuilletée · 00:49 Question : 4³ · 01:20 (−2)⁴ : la base est −2 · 01:41 −2⁴ : sans parenthèses · 01:56 La règle des signes · 02:15 Question : (−3)² · 02:40 Le conseil de la calculatrice · 02:53 Question : −5² · 03:22 À toi de jouer · 03:37 Correction · 04:03 Ce que tu as appris · 04:26 Fin.
- Contrôles : dry runs AUDIT=1 BORDS=1 : 0 AUDIT-AVANCE, 0 RETARD, 0 BORD (paysage et short ; seul « TARD 3 » = chiffre du compte à rebours). `verifier-bords-video.py` : « 0 instants qui touchent un bord » sur la 4e, la 3e et le short.
- Planches : deux passes basse déf + planche HD. Corrigé avant HD : coches/textes trop larges (finale, correction, ligne « Sinon »), tableau des signes serré, « =−16 » collé, « + » des paires qui touchaient « = −32 », titre de l'écran 06 trop petit, « − » collé au 5 dans −5² ; short : calculatrice sous l'échelle des ceintures, lignes trop larges, « 1¹⁰⁰ » trop grand, arcs trop près de Ti-Margo (remplacés par les « − » qui verdissent). Planches HD finales (4e, 3e, short) : rien qui chevauche ni ne déborde.

## Épisode 04 « zero-negatif » — PAYSAGE 4e (orange) + 2de (jaune) et SHORT 4e (blanche) (04/11)
- Fichiers : `manim/scripts/4e/puissance_zero_negatif.py` (base `PuissanceZeroNegatifBase` + `PuissanceZeroNegatif4e` / `PuissanceZeroNegatif2de` ; l'écran 04b n'existe qu'en 2de), `puissance_zero_negatif_short.py` (`PuissanceZeroNegatifShort`), marques `puissance_zero_negatif[_short]_marques.json` (+ `.cues.tsv`). Dans la paysage, j'ai daté à la main les « 1 » répétés : 05-negatif pos 69 → 6,221 s ; 08b pos 152 → 15,676 s. Voix : AUCUN changement. Rien de commun modifié.
- Sorties :
  - `manim/sorties/4e/maths/puissances/04-zero-negatif/eleveai-maths-4e-puissance-zero-negatif.mp4` (3:46) ;
  - `manim/sorties/seconde/maths/puissances/04-zero-negatif/eleveai-maths-seconde-puissance-zero-negatif.mp4` (4:05 ; nommé « seconde » comme les fichiers 2de existants) ;
  - `manim/sorties/4e/maths/puissances/04-zero-negatif/eleveai-maths-4e-puissance-zero-negatif-short.mp4` (1:02, 1080 × 1920).
- Ceintures : paysage 4e ORANGE, paysage 2de JAUNE, short BLANCHE. Centres : paysage `technologie-ia`, `sciences` ; short `jeux-defis`. Micros : 4e `puissance_exposant_negatif`, 2de `puiss_exposant_negatif`.
- Dessins de la paysage :
  - une ingénieure en microélectronique et sa puce ;
  - la table 10³ → 10⁰ qui descend (étiquettes « −1 » à gauche, flèches « ÷ 10 » à droite), puis 10 ÷ 10 = 1 ; « Pas 0 » est barré ;
  - la même table avec la base 2, à côté ; « Quelle que soit la base : a⁰ = 1 » ;
  - 04q : piège « 0 » en rouge ;
  - 04b (2de) : 5³ ÷ 5³ = 1 = 5³⁻³ = 5⁰ ;
  - « Et sous zéro ? » : la table continue sous un pointillé jusqu'à 10⁻³ = 0,001 ;
  - rang du 1 après la virgule ; 2⁻¹ = 1 ÷ 2 = 0,5 → a⁻ⁿ = 1/aⁿ (barres) ;
  - 07q : « négatif ? » barré, « petit ! » ;
  - défi : 10⁻⁹ m pour la puce, et 4⁻¹ ;
  - correction : 0,000 000 001 m et 4⁻¹ = 1/4 = 0,25.
- Dessins du short : Ti-Margo descend l'escalier 9 → 3 → 1. En bas, au même moment, 3², 3¹, 3⁰ et « ÷ 3 » se remplissent. 2026⁰ en grand. La question en commentaire porte sur 1 000 000⁰ (jamais 0⁰).
- Paysage 4e, questions :
```json
[{"t": "01:07", "question": "Combien vaut 7 puissance 0 ?", "choix": ["0", "7", "1"], "reponse": 2, "explication": "Une puissance d'exposant 0 vaut toujours 1."},
 {"t": "02:15", "question": "Combien vaut 10 puissance moins 2 ?", "choix": ["−100", "0,01", "−20"], "reponse": 1, "explication": "Un exposant négatif ne rend pas le nombre négatif : il le rend petit."}]
```
- Paysage 2de : mêmes questions, mais à t = « 01:07 » et « 02:34 ».
- Short :
```json
[{"t": "00:24", "question": "Alors, 2026 puissance 0 ?", "choix": ["0", "1", "2026"], "reponse": 1, "explication": "Avec 2026 aussi, la dernière marche divise 2026 par 2026 : 1."}]
```
- Chapitres 4e : 00:00 Puissance zéro, exposant négatif · 00:09 L'ingénieure et la puce · 00:24 La table qui descend · 00:39 10⁰ = 1 · 00:49 Avec 2, c'est pareil · 01:07 Question : 7⁰ · 01:27 Et sous zéro ? · 01:45 Le rang du 1 · 01:58 a⁻ⁿ = 1/aⁿ · 02:15 Question : 10⁻² · 02:43 Défi · 02:59 Correction · 03:18 Ce que tu as appris · 03:39 Fin.
- Chapitres 2de : identiques à la 4e jusqu'à la question 7⁰ (01:07), puis 01:27 Preuve : 5³ ÷ 5³ · 01:46 Et sous zéro ? · 02:04 Le rang du 1 · 02:17 La règle · 02:34 Question : 10⁻² · 03:02 Défi · 03:18 Correction · 03:38 Ce que tu as appris · 03:58 Fin.
- Contrôles : les dry runs AUDIT=1 BORDS=1 donnent 0 AUDIT-AVANCE, 0 RETARD, 0 BORD pour les 3 vidéos. Seul reste AUDIT-ABSENT « 974 », qui vient de l'écran de fin commun. `verifier-bords-video.py` donne « 0 instants » pour la 4e, la 2de et le short.
- Planches : basse déf puis HD. Corrigé et re-rendu :
  - paysage : exposants collés au « = » ; « = » alignés dans 07, 04 et la finale ; étiquettes « −1 » sortaient du cadre ; étiquettes 04b sur le « 1 » ; étiquette de l'ingénieure et ligne 08b au bord ;
  - short : chiffres des marches cachés par Indicate ; « 1 » qui débordait de la 3e marche ; 2026⁰ et 1 000 000⁰ au bord ; réponse qui chevauchait Ti-Margo (question passée sur une ligne) ; titre « Les puissances de 3 » plus large que la carte et collé aux exposants (fs 30 → 24) ; tirets parasites (« : ») sous les marches, supprimés.
  - Planches HD finales : rien ne chevauche ni ne déborde.
- Soucis restants : aucun défaut visuel.

## Épisode 03 « dix » — PAYSAGE 4e + 3e (ceinture jaune) et SHORT 4e (ceinture blanche) (04/11)
- Fichiers : `manim/scripts/4e/puissance_dix.py` (base `PuissanceDixBase` + `PuissanceDix4e` / `PuissanceDix3e`), `puissance_dix_short.py` (`PuissanceDixShort`), marques `puissance_dix_marques.json` / `puissance_dix_short_marques.json` (+ `.cues.tsv`, recalculées par paires : « 10 puissance » répété ; triple de 06b corrigé à la main), WAV `public/sons/4e-puissance-dix[-short]/` (débit −6). Rien de commun modifié. Voix : AUCUN changement.
- Sorties : `manim/sorties/4e/maths/puissances/03-dix/eleveai-maths-4e-puissance-dix.mp4` (3:11), `manim/sorties/3e/maths/puissances/03-dix/eleveai-maths-3e-puissance-dix.mp4` (3:11), `manim/sorties/4e/maths/puissances/03-dix/eleveai-maths-4e-puissance-dix-short.mp4` (1:03, 1080 × 1920). Media : `manim/scripts/4e/media-puiss-03-4e`, `-3e`, `-short`.
- Ceintures : paysage JAUNE (4e et 3e) ; short BLANCHE.
- Centres : paysage `espace`, `sciences`, `technologie-ia` ; short `reseaux-sociaux`, `technologie-ia`.
- Micros : 4e `puissance_dix`, 3e `entier_puissance_dix`.
- Dessins : 01 astronome + télescope sous les étoiles ; 02 « La table qui monte » 10¹ … 10⁶, zéros orange, règle encadrée ; 03 galaxie, 10¹¹ ; 04 ingénieur réseau + baies de serveurs ; 05 le piège « quatre chiffres » barré / « trois zéros », 100 000 et l'accolade « 6 chiffres » ; 06 technicienne + disque dur d'un téraoctet, correction 3 + 9 = 12 zéros → 10¹² octets (agrandi puis rétréci, encadré). Short : vidéo + compteur de vues en haut (10 → 1 000 000 000), 10¹ … 10⁹ en bas en même temps, exposant orange = nombre de zéros numérotés ; question finale 10¹⁰⁰ (« Lequel ? », réponds en commentaire), puis 04-abonne.
- Paysage, questions :
```json
[{"t": "00:48", "question": "Combien vaut 10 puissance 4 ?", "choix": ["40", "10 000", "1 000"], "reponse": 1, "explication": "10 000 : un 1 suivi de 4 zéros ; 40, c'est 10 × 4 : le piège."},
 {"t": "01:45", "question": "Comment écrire 100 000 avec une puissance de 10 ?", "choix": ["10⁶", "10⁵", "10 × 5"], "reponse": 1, "explication": "10⁵ : un 1 et cinq zéros ; 6, c'est le nombre de chiffres : le piège."}]
```
- Short, questions :
```json
[{"t": "00:15", "question": "Un million de vues, c'est :", "choix": ["10⁶", "10⁷", "10 × 6"], "reponse": 0, "explication": "Un million, c'est un 1 suivi de 6 zéros : 10⁶."}]
```
- Chapitres paysage (ECRAN du rendu HD) : 00:00 Les puissances de 10 · 00:06 L'astronome et les étoiles · 00:23 La table qui monte · 00:41 Une galaxie : 10¹¹ · 00:48 Question : 10⁴ · 01:15 Dans l'autre sens : les serveurs · 01:34 Le piège : chiffres ou zéros ? · 01:45 Question : 100 000 · 02:17 À toi de jouer : le disque dur · 02:32 Correction · 02:46 Ce que tu as appris · 03:04 Fin.
- Contrôles : dry runs AUDIT=1 BORDS=1 : 0 AUDIT-AVANCE, 0 RETARD, 0 BORD (paysage et short). `verifier-bords-video.py` : « 0 instants qui touchent un bord » sur la 4e, la 3e et le short.
- Planches : basse déf puis HD. Corrigé et re-rendu : personnages et étiquettes trop près du bord, titre de la table trop large, règle sur deux lignes, étiquette « 6 zéros », phrase de réponse 05r trop serrée (posée morceau par morceau), réponse du short qui touchait Ti-Margo (2 lignes), zéros du compteur trop agrandis, ligne « L'exposant compte les zéros » trop serrée. Planches HD finales (4e, 3e, short) : rien qui chevauche ni ne déborde.
- Soucis restants : aucun défaut visuel. Rien de commité ; pas de miniature, manifeste ni R2.

## Épisode 05 « notation-scientifique » — PAYSAGE 4e (verte) + 3e (jaune) + 2de (jaune) et SHORT 4e (blanche) (04/11)
- Fichiers : `manim/scripts/4e/puissance_notation_scientifique.py` (base `PuissanceNotationScientifiqueBase` + `PuissanceNotationScientifique4e` / `3e` / `2de`), `puissance_notation_scientifique_short.py` (`PuissanceNotationScientifiqueShort`), marques `puissance_notation_scientifique_marques.json` / `…_short_marques.json` (+ `.cues.tsv`), WAV `public/sons/4e-puissance-notation-scientifique[-short]/`. Rien de commun modifié. Voix : AUCUN changement.
- Sorties (1920 × 1080, 3:58) : `manim/sorties/4e/maths/puissances/05-notation-scientifique/eleveai-maths-4e-puissance-notation-scientifique.mp4`, `manim/sorties/3e/…/eleveai-maths-3e-puissance-notation-scientifique.mp4`, `manim/sorties/seconde/…/eleveai-maths-seconde-puissance-notation-scientifique.mp4`. Short (1080 × 1920, 1:08) : `manim/sorties/4e/maths/puissances/05-notation-scientifique/eleveai-maths-4e-puissance-notation-scientifique-short.mp4`. Media : `manim/scripts/4e/media-puiss-05-{4e,3e,seconde,short}`.
- Ceintures : paysage 4e VERTE, 3e et 2de JAUNE ; short BLANCHE.
- Micros : 4e `puissance_notation_scientifique`, 3e `entier_puissance_ecriture_scientifique`, 2de `puiss_notation_scientifique`.
- Centres : paysage `corps-sante`, `histoire-geographie`, `sciences` ; short `espace`, `corps-sante`.
- Dessins : démographe + planisphère peuplé (8 milliards) et médecin + microscope + globule (0,000 007 m) ; « un nombre entre 1 et 10 × une puissance de 10 » souligné ; cœur, 2 500 000 000 battements, virgule qui recule de 9 sauts numérotés ; globule, virgule qui avance de 6 sauts ; piège du signe (deux cartes + / −) ; leurre 45 × 10³ barré en rouge, « 45 n'est pas entre 1 et 10 » ; défi botaniste + pollen (0,000 03 m) et Chine peuplée (1 400 000 000 hab.) ; correction 3 × 10⁻⁵ et 1,4 × 10⁹ ; carte mentale finale. Short : foule qui se multiplie + planète, 8 000 000 000 dont les 9 zéros numérotés s'envolent en exposant → 8 × 10⁹ ; globule → 7 × 10⁻⁶ ; question finale « La Terre pèse environ 6 suivi de 24 zéros kilogrammes » → 6 × 10? (réponds en commentaire), puis 04-abonne.
- Paysage (4e, 3e et 2de, mêmes temps), questions :
```json
[{"t": "01:00", "question": "Quelle est la notation scientifique de 45 000 ?", "choix": ["45 × 10³", "4,5 × 10⁴", "4,5 × 10³"], "reponse": 1, "explication": "45 × 10³ vaut bien 45 000, mais 45 n'est pas entre 1 et 10."},
 {"t": "02:08", "question": "Quelle est la notation scientifique de 0,003 ?", "choix": ["3 × 10³", "3 × 10⁻³", "0,3 × 10⁻²"], "reponse": 1, "explication": "0,003 est plus petit que 1 : l'exposant est négatif. Le 3 est à la troisième place après la virgule."}]
```
- Short :
```json
[{"t": "00:13", "question": "Et 3 millions ?", "choix": ["3 × 10⁶", "3 × 10³", "30 × 10⁵"], "reponse": 0, "explication": "Un 3 suivi de 6 zéros."}]
```
- Chapitres paysage (ECRAN du rendu HD, identiques en 4e, 3e, 2de) : 00:00 La notation scientifique · 00:09 Une démographe, une médecin · 00:29 Un nombre entre 1 et 10 × une puissance de 10 · 00:41 Un grand nombre : la virgule recule · 01:00 Question : 45 000 · 01:37 Un petit nombre : la virgule avance · 01:57 Le piège : le signe · 02:08 Question : 0,003 · 02:46 À toi de jouer · 03:07 Correction · 03:29 Ce que tu as appris · 03:50 Fin.
- Contrôles : dry runs AUDIT=1 BORDS=1 (60 im/s) : 0 AUDIT-AVANCE, 0 RETARD, 0 BORD pour les 4 vidéos (reste AUDIT-ABSENT « 974 » de l'écran de fin commun). `verifier-bords-video.py` : « 0 instants qui touchent un bord » sur les 4 mp4.
- Planches : basse déf puis HD. Corrigé et re-rendu : textes plus larges que prévu (polices, retours à la ligne), cartes trop près de Ti-Margo, silhouettes mal placées sur le planisphère, contour de la Chine refait (lon/lat), « 7,mètre » collé, étiquettes « entre 1 et 10 » / « puissance de 10 » qui se chevauchaient, trou dans « 1, 4 », lignes de base décalées entre morceaux posés au mot (« vaut bien 45 000, », « plus petit que 1 », « Réponse B : »…, aligné partout par `ligne_base`), « la Terre » sans majuscule dans le short. Planches HD finales : rien qui chevauche ni ne déborde.
- Soucis restants : aucun défaut visuel. Rien de commité ; pas de miniature, manifeste ni R2.
- Contrôle de la session principale (04/11, 18 h) : planches paysage 4e + 2de et short regardées. Short : textes de la carte finale (« La Terre pèse environ », « 6 suivi de 24 zéros ») et du « 8 000 000 000 » trop près des bords de la carte → largeur bornée 3,6 au lieu de 3,9, interligne de « Écris-le en notation / scientifique. » élargi ; dry run AUDIT=1 BORDS=1 = 0 ; short RE-RENDU en HD, `verifier-bords-video.py` = 0 instants.

## Épisode 08 « produit-quotient » — PAYSAGE 2de (verte) et SHORT 2de (blanche) (05/11)
- Fichiers : `manim/scripts/4e/puissance_produit_quotient.py` (base `PuissanceProduitQuotientBase` + `PuissanceProduitQuotient2de`), `puissance_produit_quotient_short.py` (`PuissanceProduitQuotientShort`), marques `puissance_produit_quotient[_short]_marques.json` (+ `.cues.tsv`, marques_dump + cues2marques, relues mot à mot : aucun mot répété perdu), WAV `public/sons/2de-puissance-produit-quotient[-short]/` (débit −6). Outils importés sans modification : `6e/prop_commun.py`, et `OutilsNotation` / `puiss` / `T` de `puissance_notation_scientifique.py`. Voix : AUCUN changement.
- Sorties : `manim/sorties/seconde/maths/puissances/08-produit-quotient/eleveai-maths-seconde-puissance-produit-quotient.mp4` (4:23, 1920 × 1080) et `…/eleveai-maths-seconde-puissance-produit-quotient-short.mp4` (1:10, 1080 × 1920). Media : `manim/scripts/4e/media-puiss-08-seconde`, `media-puiss-08-short`.
- Ceintures : paysage VERTE, short BLANCHE (échelle entière sous le titre). Identité « Maths 2de — EleveAI ».
- Micro : 2de `puiss_produit_quotient` (notion `puissances_2de`). Centres : paysage `technologie-ia`, `jeux-defis` ; short `technologie-ia`. Métier : ingénieure en cybersécurité (clés secrètes en bits).
- Dessins de la paysage :
  - 01 l'ingénieure, le cadenas, la clé, les cases de bits qui défilent (3 bleues puis 4 orange) ;
  - 02 2³ × 2⁴ se déplie en 3 puis 4 facteurs 2 (accolades), les deux groupes se rejoignent, compteur 1…7 orange, les 7 facteurs se regroupent en 2⁷ = 128 clés ; aᵐ × aⁿ = aᵐ⁺ⁿ encadré ;
  - 03 3⁷/3² déplié, deux paires de 3 barrées en haut et en bas, « il en reste cinq » (compteur), les 5 facteurs se regroupent en 3⁵ ; aᵐ/aⁿ = aᵐ⁻ⁿ ;
  - 04 5³/5³ : les trois paires barrées = 1 « un nombre divisé par lui-même », puis 5³⁻³ = 5⁰ et a⁰ = 1 encadré ;
  - 05 2³/2⁵ : trois paires barrées, « 2 facteurs en bas » orange → 2³⁻⁵ = 2⁻² = 1/4 (un quart) ;
  - 06 le piège 2³ × 3² : bases rouges, la règle barrée en rouge, points 2 × 4 et 3 × 3 → 8 × 9 = 72 ;
  - 07 défi (4⁵ × 4⁻²)/4³ avec cadenas fermé, 07b 5 + (−2) = 3 → 4³/4³ = 4³⁻³ = 4⁰ = 1, la clé ouvre le cadenas.
- Short : en haut la clé et ses cases de bits (3 bleues, puis 4 orange) ; en bas, sous chaque groupe et au même instant, 2³ (8 clés) et × 2⁴, puis 2³ × 2⁴ = 2³⁺⁴ = 2⁷ = 128 clés ; fin sur la clé de 128 bits (128 petites cases) et « 2^? », réponse en commentaire, puis la fin standard.
- Paysage, questions (t mesuré au rendu = début de l'écran « Question ! ») :
```json
[{"t": "00:46", "question": "5² × 5⁶ ?", "choix": ["5¹²", "25⁸", "5⁸"], "reponse": 2, "explication": "La base reste 5, on additionne les exposants. 25⁸ : le piège, la base ne se multiplie pas."},
 {"t": "02:13", "question": "7⁴ ÷ 7⁶ ?", "choix": ["7²", "7⁻²", "1⁻²"], "reponse": 1, "explication": "4 − 6 = −2. La base 7 ne change pas."},
 {"t": "02:57", "question": "2³ × 3² ?", "choix": ["6⁵", "72", "6⁶"], "reponse": 1, "explication": "Les bases sont différentes : on calcule 8 × 9 = 72."}]
```
- Short, questions :
```json
[{"t": "00:25", "question": "2⁵ × 2⁵ ?", "choix": ["2¹⁰", "4¹⁰", "2²⁵"], "reponse": 0, "explication": "La base reste 2 : 5 + 5 = 10. 1 024 clés."}]
```
- Chapitres paysage (ECRAN du rendu HD) : 00:00 Produit et quotient de puissances · 00:10 Les clés de l'ingénieure en cybersécurité · 00:29 2³ × 2⁴ = 2⁷ · 00:46 Question : 5² × 5⁶ · 01:20 Pour diviser : 3⁷ ÷ 3² · 01:39 Un rappel : 5⁰ = 1 · 01:57 Exposant du bas plus grand : 2⁻² · 02:13 Question : 7⁴ ÷ 7⁶ · 02:44 Le piège : deux bases différentes · 02:57 Question : 2³ × 3² · 03:25 À toi de jouer · 03:40 Correction · 03:55 Ce que tu as appris · 04:16 Fin.
- Contrôles : dry runs AUDIT=1 BORDS=1 : 0 AUDIT-AVANCE, 0 RETARD, 0 BORD (paysage et short ; restent « TARD 5 » = chiffre du compte à rebours, « 974 » de l'écran de fin, « 1024 » écrit « 1 024 »). `verifier-bords-video.py` : « 0 instants qui touchent un bord » sur la paysage et sur le short.
- Planches : deux passes basse déf + planches HD. Corrigé avant le rendu final : titre du défi trop large (sur deux lignes), facteurs « 2×2×2 » trop serrés, phrase de réponse de la question 1 trop petite (4 lignes), règle barrée qui touchait le titre du piège et « On calcule : » collé aux points, « = 1 » collé à son cadre (correction), dernière ligne du bilan trop réduite (sur deux lignes) ; short : clé sur l'échelle des ceintures, lignes qui débordaient de la carte, phrase de réponse trop petite, « 128clés » collé (re-rendu HD du short).
- Contrôle de la session principale (05/11), corrigé puis RE-RENDU en HD sous verrou (paysage et short) : (1) short : la ligne « 2³ × 2⁴ = 2³⁺⁴ » bornée à 3,4 (≈ 85 % de la carte) et centrée, « = 2⁷ = 128 clés » encadrée en entier et bornée à 3,3 ; (2) paysage : explications des trois questions-pauses à UNE seule taille (28, `rep_ligne` sans réduction ligne par ligne), chacune sur 4 lignes bien espacées à gauche de Ti-Margo (Q1 « Réponse C : 5⁸. / La base reste 5 : / on additionne / les exposants. », Q2 « Réponse B : 7⁻². / 4 − 6 = −2. / La base 7 / ne change pas. », Q3 « Réponse B : 72. / Les bases sont / différentes : / on calcule 8 × 9. »). Dry runs propres (0 AUDIT-AVANCE, 0 RETARD, 0 BORD, 0 ligne trop large), `verifier-bords-video.py` = 0 instant sur les deux mp4, mêmes temps de questions et de chapitres, planches HD regardées.
- Soucis restants : aucun défaut visuel.

## Épisode 06 « comparer » — PAYSAGE 4e (verte) et SHORT 4e (blanche) (05/11)
- Fichiers : `manim/scripts/4e/puissance_comparer.py` (`PuissanceComparerBase` + `PuissanceComparer4e`), `puissance_comparer_short.py` (`PuissanceComparerShort`), marques `puissance_comparer_marques.json` / `…_short_marques.json` (+ `.cues.tsv`), WAV `public/sons/4e-puissance-comparer[-short]/`. Aucun module commun modifié : T / puiss / notation / ligne_base / OutilsNotation sont IMPORTÉS de l'épisode 05. Voix : AUCUN changement.
- Marques : `cues2marques.py` perdait les mots répétés (« 10 puissance » doublé). J'ai donc converti PAR PAIRES (cue doublée « 9 fois » = le 9 puis le « fois » ; un nombre à espaces reste un seul mot), avec un script à part dans mon dossier temporaire.
- Sorties : `manim/sorties/4e/maths/puissances/06-comparer/eleveai-maths-4e-puissance-comparer.mp4` (1920 × 1080, 3:37) et `…/eleveai-maths-4e-puissance-comparer-short.mp4` (1080 × 1920, 1:01). Media : `manim/scripts/4e/media-puiss-06-4e`, `media-puiss-06-short`.
- Ceintures : paysage VERTE ; short BLANCHE (échelle entière sous le titre).
- Micro : 4e `puissance_comparer`.
- Centres : paysage `sciences`, `nature-ecologie`, `animaux` ; short `sport`, `jeux-defis`.
- Dessins de la paysage : une géologue (casque, marteau) et deux volcans qui fument, avec des coulées de lave à l'échelle (0,9 contre 2). Le 9 et le 2 sont entourés avec « ? », et « Attention ! » s'affiche. En entier : deux barres de lave à l'échelle, puis deux copies de la petite barre posées sur la grande (« plus de deux fois »). La règle en deux marches : 1) les exposants (orange), 2) les nombres devant (bleu), seulement si égalité ; Ti-Margo monte d'une marche à l'autre et l'exposant ⁿ puis le « a » sont entourés. 3,7 × 10⁸ contre 3,2 × 10⁸ : les exposants sont grisés, les nombres devant encadrés en bleu et placés sur une droite de 3 à 4. Une droite des exposants −9 … −3 montre « à droite » ; une bactérie et un virus sont dessinés à l'échelle relative (× 20). Défi : baleine bleue, éléphant et camion en silhouettes. Correction : les gros exposants 3, 4, 5 s'affichent, puis les animaux descendent à leur place, avec 6 000 / 40 000 / 150 000 kg et une flèche.
- Short : sur un ring en haut, deux jauges-boxeurs (gant au sommet) « 9 × 10⁵ » VS « 2 × 10⁶ ». En bas, au même instant : 900 000 sous la jauge de gauche, 2 000 000 sous celle de droite, puis « L'exposant décide d'abord : 6 bat 5 ». Le gant de droite frappe et la jauge de gauche pâlit. La question-pause dure 3 s. La question finale (9,9 × 10⁻⁴ contre 1 × 10⁻³, réponds en commentaire) précède 03-abonne.
- Paysage, questions (t mesuré sur le rendu HD) :
```json
[{"t": "00:55", "question": "Lequel est le plus grand ?", "choix": ["8 × 10³", "1,2 × 10⁴", "9,9 × 10³"], "reponse": 1, "explication": "Son exposant, 4, est le plus grand : 12 000, contre 8 000 et 9 900."},
 {"t": "01:56", "question": "Lequel est le plus petit ?", "choix": ["5 × 10⁻³", "5 × 10⁻⁴", "1 × 10⁻³"], "reponse": 1, "explication": "5 × 10⁻⁴, soit 0,000 5. Son exposant, −4, est le plus petit."}]
```
- Short :
```json
[{"t": "00:17", "question": "7 × 10² contre 1 × 10³ ?", "choix": ["7 × 10²", "1 × 10³", "égalité"], "reponse": 1, "explication": "1 000 contre 700. L'exposant 3 bat l'exposant 2."}]
```
- Chapitres de la paysage (lignes ECRAN du rendu HD) : 00:00 Comparer en notation scientifique · 00:09 La géologue et les deux volcans · 00:27 En entier · 00:42 La règle en deux marches · 00:55 Question : le plus grand · 01:25 Même exposant · 01:41 Exposants négatifs · 01:56 Question : le plus petit · 02:29 À toi de jouer · 02:53 Correction · 03:08 Ce que tu as appris · 03:30 Fin.
- Contrôles : dry runs AUDIT=1 BORDS=1 à 60 im/s : 0 AUDIT-AVANCE, 0 RETARD, 0 BORD pour la paysage et le short (il reste seulement l'AUDIT-ABSENT « 974 » de l'écran de fin commun). `verifier-bords-video.py` : « 0 instants qui touchent un bord » sur les deux mp4.
- Planches : basse déf puis HD, regardées écran par écran. Corrigé et re-rendu :
  - fumée sur les étiquettes des volcans ;
  - textes des deux marches qui débordaient (marches agrandies, polices réduites) ;
  - phrases de réponse trop serrées ou rapetissées (lignes plus courtes, interligne élargi, nombres posés sur les barres) ;
  - « = » entre exposants grisés supprimé ;
  - titre du défi collé à la consigne ;
  - « −6 », « −7 », « 9,9 », « 10 » qui s'affichaient avant la voix ;
  - short : « 10⁵VS2 » collés (VS descendu), trait parasite dans les gants, pointillés qui barraient « Écrits en entier », question cachée sous les cartes (bug de ligne de base corrigé), réponse qui touchait Ti-Margo (cartes réduites, « Réponse B » porté par la carte allumée), « Qui gagne ? » sur le VS et « 2 000 000 » au bord de la carte.
- Soucis restants : aucun défaut visuel. Rien de commité ; pas de miniature, de manifeste ni de R2.
- Contrôle de la session principale (05/11, 1 h) : planches paysage + short regardées. Paysage, écran « La règle » : le cercle orange autour de l'exposant n de « a × 10ⁿ » mordait sur le « 0 » → remplacé par une flèche orange qui pointe l'exposant ; paysage RE-RENDUE en HD (audit 60 im/s = 0, `verifier-bords-video.py` = 0 instants). Short : rien à corriger.
- Correction du 05/11, 2 h 55 (règle voix = écrit) : short, écran de réponse : « Réponse B : » puis « 1 000 contre 700. » sont maintenant ÉCRITS au mot ; 4 lignes sur des lignes de base fixes, chiffres sur la ligne de base, Ti-Margo libre. Short RE-RENDU en HD (audit 0, `verifier-bords-video.py` = 0 instants) ; durée et question inchangées.

## Épisode 10 « enchainer » — PAYSAGE 2de (orange) et SHORT 2de (blanche) (05/11)
- Fichiers : `manim/scripts/4e/puissance_enchainer.py` (base `PuissanceEnchainerBase` + `PuissanceEnchainer2de`), `puissance_enchainer_short.py` (`PuissanceEnchainerShort`), marques `puissance_enchainer[_short]_marques.json` (+ `.cues.tsv`), WAV `public/sons/2de-puissance-enchainer[-short]/` (débit −6). Outils importés sans modification : `6e/prop_commun.py`, `OutilsNotation` / `puiss` / `T` de `puissance_notation_scientifique.py`, `fracm` / `rangee` / `expo2` / `eg` de `puissance_produit_quotient.py`. Voix : AUCUN changement.
- Marques : `marques_dump.ps1` puis conversion PAR PAIRES (copie corrigée de `cues2marques.py` dans mon dossier temporaire) : les « 7 puissance », « 2 puissance », « moins » répétés gardent chacun leur instant ; `scripts/cues2marques.py` non modifié.
- Sorties : `manim/sorties/seconde/maths/puissances/10-enchainer/eleveai-maths-seconde-puissance-enchainer.mp4` (3:38, 1920 × 1080) et `…/eleveai-maths-seconde-puissance-enchainer-short.mp4` (1:05, 1080 × 1920). Media : `manim/scripts/4e/media-puiss-10-seconde`, `media-puiss-10-short`.
- Ceintures : paysage ORANGE, short BLANCHE (échelle entière sous le titre). Identité « Maths 2de — EleveAI ».
- Micro : 2de `puiss_expression_composee` (notion `puissances_2de`, B = (7⁴ × 7⁻⁵) / (7³)⁴ du contrôle commun). Centres : paysage `transports`, `avions` ; short `avions`, `transports`. Métier : une pilote de ligne et sa check-list avant le décollage.
- Dessins de la paysage :
  - 00 une longue rangée de « puissances » schématiques (carré bleu + petit carré orange) qui se fond en UNE seule, exposant « ? » orange ;
  - 01 la pilote (casquette à galon, ailes dorées), sa planchette « Check-list » cochée ligne à ligne (une étape à la fois / dans l'ordre / sans en sauter) ; l'avion roule à chaque coche puis décolle au « on fait pareil » ;
  - 02 B posé au mot (parenthèse et exposant extérieur au « le tout puissance 4 »), le but encadré « On veut : B = 7ⁿ » ;
  - 03 la check-list à droite : 3 cartes numérotées (puissances de puissances (aᵐ)ⁿ = aᵐˣⁿ, produits, quotient) ;
  - 04-05-06 une étape par ligne : la carte de l'étape s'allume en jaune, sa règle grandit puis rétrécit, le calcul des exposants s'écrit À CÔTÉ en orange (3 × 4 = 12 ; 4 + (−5) = −1 ; −1 − 12 = −13), la ligne suivante DESCEND de la précédente (copie qui glisse), pastille ①②③ à gauche, la carte se coche en vert ; 7⁻¹³ encadré en vert et le but devient « B = 7⁻¹³ » ;
  - 07 le piège sur une droite graduée −14 … 1 : départ à −1, arc orange « 12 vers la gauche », 11 et −11 barrés (point rouge en −11), −13 vert encadré ; « Écris le calcul des exposants à côté » + −1 − 12 = −13 ;
  - 08 défi C = ((5²)³ × 5⁻⁴) / 5³ avec la planchette 1 □ 2 □ 3 □ ; 08b correction en trois lignes qui descendent (2 × 3 = 6 ; 6 + (−4) = 2 ; 2 − 3 = −1), check-list cochée, C = 5⁻¹ encadré ;
  - 09 « Ce que tu as appris » titre en haut, centré : l'ordre 1-2-3 avec les trois règles, écrire les exposants à côté, vérifier les signes moins.
- Short « La check-list » : en haut une piste, l'avion et trois balises 1, 2, 3 ; en bas, une ligne par étape portant le même numéro que la balise : (2³)² = 2⁶, 2⁶ × 2⁴ = 2¹⁰, 2¹⁰ ÷ 2⁷ = 2³, puis 2³ = 8 encadré ; à chaque résultat dit, l'avion roule jusqu'à sa balise qui s'allume en vert ; au « 8 ! » il décolle. Question-pause 3 s, puis (3⁴)² ÷ 3⁸ = 3^? « Réponds en commentaire ! », puis la fin standard.
- Paysage, questions (t mesuré au rendu HD = début de l'écran « Question ! ») :
```json
[{"t": "01:20", "question": "(2⁵ × 2³) ÷ 2⁶ ?", "choix": ["2²", "2⁹", "2¹⁴"], "reponse": 0, "explication": "5 + 3 = 8, puis 8 − 6 = 2 : 2²."},
 {"t": "02:04", "question": "3⁻² ÷ 3⁴ ?", "choix": ["3²", "3⁻⁶", "3⁻²"], "reponse": 1, "explication": "−2 − 4 = −6 : 3⁻⁶."}]
```
- Short, questions :
```json
[{"t": "00:21", "question": "(10²)³ ÷ 10⁵ ?", "choix": ["1", "10", "100"], "reponse": 1, "explication": "2 × 3 = 6, puis 6 − 5 = 1 : 10¹ = 10."}]
```
- Chapitres paysage (ECRAN du rendu HD) : 00:00 Enchaîner les règles · 00:06 La check-list de la pilote de ligne · 00:19 L'expression B · 00:33 La check-list : l'ordre des règles · 00:42 Étape 1 : la puissance de puissance · 00:54 Étape 2 : le produit · 01:06 Étape 3 : le quotient, B = 7⁻¹³ · 01:20 Question : (2⁵ × 2³) ÷ 2⁶ · 01:51 Le piège : −1 − 12 · 02:04 Question : 3⁻² ÷ 3⁴ · 02:33 À toi de jouer · 02:51 Correction · 03:14 Ce que tu as appris · 03:31 Fin.
- Contrôles : dry runs AUDIT=1 BORDS=1 à 60 im/s : 0 AUDIT-AVANCE, 0 RETARD, 0 BORD, 0 ligne trop large (paysage et short). Restent seulement : « TARD 5 » (chiffre du compte à rebours), les « TARD » du rappel −1 − 12 = −13 écrit à côté (déjà dit) et « 974 » de l'écran de fin commun. `verifier-bords-video.py` : « 0 instants qui touchent un bord » sur les deux mp4.
- Planches : deux passes basse déf + planches HD (12 images paysage, 8 short, zooms sur les questions, la correction, « Ce que tu as appris »). Corrigé avant le rendu HD : textes plus larges que prévu (check-list, planchette, but « On veut » qui touchait le bord droit), lignes du calcul qui descendaient sous la marge du bas (interlignes resserrés), pilote cachée par la phrase du bas, casquette trop basse, étiquette « 12 vers la gauche » sur l'arc puis collée à « −1 − 12 », exposant « −2−4 » qui perdait son premier « − », « −13 » du but mal posé, règles du bilan trop petites, chiffres « 11 », « −13 », « −2 », « 4 » posés un peu avant la voix, retards de la correction (coche jouée avec la dernière pièce) ; short : « ? » géant de l'accroche, numéros ② collés aux lignes (lignes bornées à 2,85 et décalées), explication de la question qui touchait Ti-Margo (« Réponse B : 10. » porté par la carte B allumée, 3 lignes à taille unique), « Réponds en commentaire ! » borné à 85 % de la carte.
- Soucis restants : aucun défaut visuel. Rien de commité ; pas de miniature, manifeste ni R2.
- Correction du 05/11, 2 h 55 (règle voix = écrit) : short, écran de réponse : « Réponse B : 10. » est maintenant ÉCRIT au mot ; cartes réduites à 82 %, 4 lignes sur des lignes de base fixes, Ti-Margo libre. Short RE-RENDU en HD (audit 0, `verifier-bords-video.py` = 0 instants) ; durée et question inchangées.

## Épisode 09 « puissance-puissance » — PAYSAGE 2de (verte) (05/11)
- Fichiers : `manim/scripts/4e/puissance_puissance_puissance.py` (base `PuissancePuissancePuissanceBase` + `PuissancePuissancePuissance2de`), marques `puissance_puissance_puissance_marques.json` (+ `.cues.tsv`), WAV `public/sons/2de-puissance-puissance-puissance/` (débit −6). Pas de short (`puissances-parenthese` gardé). Outils importés sans modification : `6e/prop_commun.py`, `OutilsNotation` / `T` / `puiss` / `ligne_base` / `sans_audit` de l'épisode 05, `barre` / `eg` / `expo2` / `facteurs` / `rangee` / `poser_idx` / `accolade` de l'épisode 08. Voix : AUCUN changement.
- Marques : les cues doublées (« 2 puissance » ×2, « 4 fois » ×4, « 10 000 mètres » ×3) lues PAR PAQUETS avec une copie corrigée de `cues2marques.py` dans mon dossier temporaire : chaque mot répété garde son instant ; script commun non modifié.
- Sortie : `manim/sorties/seconde/maths/puissances/09-puissance-puissance/eleveai-maths-seconde-puissance-puissance-puissance.mp4` (3:30, 1920 × 1080, avec son). Media : `manim/scripts/4e/media-puiss-09-seconde`.
- Ceinture : VERTE. Identité « Maths 2de — EleveAI ».
- Micro : 2de `puiss_puissance_puissance` (notion `puissances_2de`). Centres : `art-design`, `jeux-defis`. Métier : architecte (place carrée).
- Dessins :
  - 01 l'architecte (casque, équerre) et la place vue d'en haut (dalles, fontaine, arbres) ; la cote 10² mètres = 100 mètres, les dalles qui verdissent rangée par rangée pour l'aire, aire = côté², (10²)² ;
  - 02 les deux cotes 10² de la place deviennent 10² × 10² ; leurs exposants 2 + 2 = 4 ; 10⁴ = 10 000 mètres carrés encadré, la place se remplit ;
  - 03 (2³)² : le paquet « 2 × 2 × 2 » se recopie 2 fois (grille 3 × 2), compteur 1…6, 2⁶ ; accolades « 3 » et « deux fois », 3 × 2 = 6 ; (aᵐ)ⁿ = aᵐˣⁿ encadré ;
  - 04 deux cartes : 2³ × 2² (les facteurs se rejoignent, 1…5, on additionne, 2⁵) contre (2³)² (deux paquets, 1…6, on multiplie, 2⁶ ≠ 2⁵ en rouge : le piège) ;
  - 05 (10⁻³)² : droite des exposants de 0 à −6, deux sauts de −3, −3 × 2 = −6, 10⁻⁶ encadré ;
  - 06 défi 4³ = 4 × 4 × 4, le 4 devient un carré de 2 × 2 points (4 = 2²) ; 06b 4³ = (2²)³, trois paquets « 2 × 2 », 2 × 3 = 6, 2⁶ = 64, vérification 4 × 4 × 4 = 64.
- Questions (t mesuré au rendu HD = début de l'écran « Question ! ») :
```json
[{"t": "00:58", "question": "(5⁴)³ ?", "choix": ["5⁷", "5¹²", "15⁴"], "reponse": 1, "explication": "Puissance d'une puissance : 4 × 3 = 12. 5⁷, c'est la règle du produit : le piège."},
 {"t": "02:02", "question": "(3⁻²)⁻¹ ?", "choix": ["3²", "3⁻³", "3⁻²"], "reponse": 0, "explication": "(−2) × (−1) = +2."}]
```
- Chapitres (ECRAN du rendu HD) : 00:00 La puissance d'une puissance · 00:09 L'architecte et la place carrée · 00:25 (10²)² = 10⁴ · 00:37 (2³)² = 2⁶ : la règle · 00:58 Question : (5⁴)³ · 01:32 Ne confonds pas les deux règles · 01:50 Avec un exposant négatif · 02:02 Question : (3⁻²)⁻¹ · 02:30 À toi de jouer · 02:44 Correction · 03:04 Ce que tu as appris · 03:23 Fin.
- Contrôles : dry run AUDIT=1 BORDS=1 (dernier, avant le rendu final) : 0 AUDIT-AVANCE, 0 AUDIT-TARD, 0 RETARD, 0 BORD (restent « TARD 5 » = chiffre du compte à rebours, « 974 » de l'écran de fin). `verifier-bords-video.py` : « 0 instants qui touchent un bord ».
- Planches : trois passes basse déf puis trois rendus HD (le premier et le deuxième refaits pour des défauts mineurs). Corrigé : texte qui sortait du cadre et cadre au bord (01, 02), « 3 » de l'accolade collé à la formule (03), explication trop large pour la colonne (question 1, répartie en lignes centrées de même taille, interligne régulier, loin de Ti-Margo ; le piège écrit à côté du 5⁷), titre qui débordait de sa carte, compteurs sur les cadres, résultats collés au bas de la carte, « ≠ » collé (04), chiffres en vol qui traversaient d'autres textes (03, 04, 05, 05q), 64 et 10 000 encadrés collés au « = », compteurs sur les cadres (06b), formules du bilan sur les phrases, interlignes du bilan (07), visage de l'architecte caché par son casque, « 1 0 » trop écarté à la taille 72 ou 80 (passé à 76). Planche HD finale : rien qui chevauche ni ne déborde.
- Soucis restants : aucun défaut visuel. Rien de commité ; pas de miniature, manifeste ni R2.
- Contrôle du 05/11, 3 h : planche + zooms regardés (exposants près des parenthèses, questions, correction, bilan) : rien à corriger.

## Épisode 07 « calcul » — PAYSAGE 4e + 3e (verte) et SHORT 4e (blanche) (05/11)
- Reprise d'un agent figé à 23 h 55 (scripts, marques et WAV déjà faits). Fichiers : `manim/scripts/4e/puissance_calcul.py` (`PuissanceCalculBase` + `PuissanceCalcul4e`, `PuissanceCalcul3e`), `puissance_calcul_short.py` (`PuissanceCalculShort`), marques `puissance_calcul_marques.json` / `…_short_marques.json` (+ `.cues.tsv`, convertis PAR PAIRES pour garder les mots répétés), WAV `public/sons/4e-puissance-calcul[-short]/`. Aucun module commun modifié. Voix : AUCUN changement.
- Sorties : `manim/sorties/4e/maths/puissances/07-calcul/eleveai-maths-4e-puissance-calcul.mp4` (1920 × 1080, 3:50), `manim/sorties/3e/maths/puissances/07-calcul/eleveai-maths-3e-puissance-calcul.mp4` (1920 × 1080, 3:50), `manim/sorties/4e/maths/puissances/07-calcul/eleveai-maths-4e-puissance-calcul-short.mp4` (1080 × 1920, 0:58). Media : `manim/scripts/4e/media-puiss-07-4e`, `media-puiss-07-3e`, `media-puiss-07-short`.
- Ceintures : paysages 4e et 3e VERTES ; short BLANCHE (échelle entière sous le titre).
- Micros : 4e `puissance_calcul`, 3e `entier_puissance_calcul`.
- Centres : paysage `animaux`, `photo`, `espace` ; short `jeux-defis`.
- Dessins de la paysage : un apiculteur (combinaison, voile) devant 100 ruches qui arrivent rangée par rangée, une ruche agrandie et ses abeilles ; 10² × 10⁴ se déplie en six facteurs 10 comptés un à un, le 6 du compteur vole vers 10⁶. Un photographe, sa carte mémoire et une photo : 10⁹ ÷ 10⁶ en fraction dépliée, six facteurs barrés, les trois restants en vert → 10³ = 1 000 photos. Les nombres devant : 3 × 10² × 2 × 10⁴ se range en deux cadres (bleu 3 × 2, orange 10² × 10⁴), des flèches mènent à 6 et 10⁶. L'exposant négatif : 10⁵ × 10⁻², deux facteurs barrés. Le défi et la correction : une astrophysicienne, le Soleil et son rayon, un photon qui file (3 × 10⁸ km).
- Short « Le jeu des zéros » : en haut, 100 et 10 000, dont les zéros orange glissent en une rangée 1 000 000 ; en bas, au même instant, l'exposant s'allume et 2 + 4 = 6 se remplit, puis = 10⁶. Accroche : 10⁸ barré, « Perdu ! ». Question-pause de 3 s, puis 10⁷ ÷ 10³ à répondre en commentaire, puis la fin standard.
- Paysages 4e et 3e, questions (t mesuré sur le rendu HD, identique pour les deux) :
```json
[{"t": "00:37", "question": "Combien font 10³ × 10⁵ ?", "choix": ["10¹⁵", "10⁸", "100⁸"], "reponse": 1, "explication": "On additionne les exposants : 3 + 5 = 8. 15, c'est 3 × 5 : le piège."},
 {"t": "01:55", "question": "4 × 10³ × 2 × 10⁵ ?", "choix": ["8 × 10⁸", "6 × 10⁸", "8 × 10¹⁵"], "reponse": 0, "explication": "4 × 2 = 8. Et 10³ × 10⁵ = 10⁸."}]
```
- Short :
```json
[{"t": "00:18", "question": "10⁴ × 10⁴ ?", "choix": ["10¹⁶", "10⁸", "20⁸"], "reponse": 1, "explication": "4 zéros + 4 zéros = 8 zéros."}]
```
- Chapitres des paysages (lignes ECRAN du rendu HD) : 00:00 Calculer avec des puissances de 10 · 00:07 L'apiculteur et ses 100 ruches · 00:16 Le produit : 10² × 10⁴ · 00:37 Question : 10³ × 10⁵ · 01:09 Le quotient : la carte mémoire · 01:36 Avec des nombres devant · 01:55 Question : 4 × 10³ × 2 × 10⁵ · 02:30 Avec un exposant négatif · 02:43 À toi de jouer · 03:03 Correction · 03:21 Ce que tu as appris · 03:42 Fin.
- Contrôles : dry runs puis rendus avec AUDIT=1 BORDS=1 : 0 AUDIT-AVANCE, 0 RETARD, 0 BORD sur les trois vidéos. `verifier-bords-video.py` : « 0 instants qui touchent un bord » sur les trois mp4.
- Planches : quatre passes basse déf + planches HD (14 images paysage, 12 short, zooms sur les questions, la correction, les insistances image par image). Corrigé et re-rendu :
  - exposant qui touchait le « 0 » aux grandes tailles (écart base-exposant proportionnel à la police) ;
  - « On additionne les exposants : » contre le bord gauche, cadre de la question 1 trop large ;
  - exposant qui débordait un instant de son cadre en s'agrandissant (2 + 4 = 6, 10⁸ de la question 1, 10³ de l'écran négatif, 3 × 10⁸ km) : le cadre grandit avec son contenu, ou l'insistance vient avant le cadre ;
  - « octets » et « de place » pas sur la même ligne de base ; « : » et « = » collés aux cadres ; cadre de 3 collé au « × » ; « 1 000 » serré dans son cadre ; point final détaché (« 10⁸ . ») ;
  - short : réponse en deux tailles de police (une seule maintenant), « = 8 zéros » qui touchait Ti-Margo, rangées 100 / × 10 000 / 1 000 000 serrées, lignes qui touchaient les bords de la carte.
- Soucis restants : aucun défaut visuel. Rien de commité ; pas de miniature, de manifeste ni de R2.
- Contrôle du 05/11, 3 h - 4 h : planches + zooms regardés. Corrigé : interlignes inégaux du bilan (lignes de base fixes), « 300 » plus grand que « millions de kilomètres » (même taille), « 8 zéros » du short qui mordait sur le « = » en s'agrandissant (toute la ligne s'agrandit). Les 3 vidéos RE-RENDUES en HD ; audit 0, `verifier-bords-video.py` = 0 instants ; durées inchangées.
