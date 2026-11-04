
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
