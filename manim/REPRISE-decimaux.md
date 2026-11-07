# Reprise — série NOMBRES DÉCIMAUX 6e (état au 07/11/2026)

Notions `decimal_nombre` (6 micros) et `decimal_calcul` (6 micros jouées en 6e) : 12 paysages Manim + 12 shorts en dessin animé Ti Margo 3D, sur le modèle de la série Triangles (`manim/REPRISE-triangles.md`).

## Déroulé décidé
1. Voix des 24 vidéos, validées par Frédéric.
2. UN short et UNE paysage pilotes (épisode 01), contrôlés et montrés. Validation du format.
3. Le reste sans redemander : rendu, contrôle, défauts mineurs, miniatures (« Film d'animation 3D » sur les shorts), manifeste, fiches YouTube, R2, bilans, `COUPE_PAR_VIDEO`, coach après le push.

## État
- Coach vérifié avant les vidéos : `9850db39`, non poussé. Squelettes ≥ 234 par micro, ≤ 3,9 répétitions sur 20 à chaque étoile, avec et sans la réponse, avec `--lettres`. Corrigés : « 1 centimètres », défi ★2 hors notion (disque en 60°), 6 tournures de plus en lire_ecrire ★2, « Compte les virgules ».
- Étape 1 : voix écrites dans `manim/voix/6e-decimal-<slug>[-short].json`, montrées en entier le 07/11, **en attente du oui de Frédéric**. Rien n'est généré ni rendu.
- 07/11 : VOIX VALIDÉES par Frédéric telles quelles (« Oui, enchaîne »). Bascule de session à 71 % de contexte, juste après : **rien n'est encore généré ni rendu**.
- ⏳ RESTE, dans l'ordre :
  1. Générer les 24 voix : pour chaque `manim/voix/6e-decimal-<slug>[-short].json`, `powershell -File scripts/generer-voix.ps1 -Fichier <json> -Debit <d>` (WAV dans `public/sons/6e-decimal-<slug>[-short]/`), puis pour les paysages `powershell -File scripts/marques_dump.ps1 -Fichier <json> -Sortie manim/scripts/6e/decimal_<slug_souligné>_marques.json -Debit <d>` (même débit que la voix). ⚠️ Le débit des triangles n'est pas noté : le retrouver avant (comparer la durée de `public/sons/6e-triangle-nommer/00-garde.wav` à une génération d'essai, ou chercher l'appel dans l'historique de la série Triangles). Shorts : les instants des mots viennent de `python scripts/ti-margo-cues.py decimaux <épisode>`.
  2. Pilotes de l'épisode 01 `lire-ecrire` : paysage `manim/scripts/6e/decimal_lire_ecrire.py` (calquée sur `triangle_nommer.py` : `PaysageProp` de `prop_commun`, `self.dire`, `self.au_mot`, `FinTriangles` ou équivalent pour la fin du 05/11) ; short `films/decimaux.js` (+ `.json`) depuis `_modele`. Contrôles : dry run AUDIT, `verifier-bords-video.py`, planches relues.
  3. Montrer les deux pilotes (aperçu `manim/sorties/apercu-decimaux.html`, port 3900, à l'arrêt) et attendre la validation du FORMAT.
  4. Les 22 autres sans redemander, puis manifeste, fiches YouTube, R2, bilans, `COUPE_PAR_VIDEO` ; coach après le push.
- 07/11 après-midi (session pilotes) :
  - ✅ 24 voix générées (Julie, débit −6, vérifié contre `6e-triangle-nommer/00-garde.wav` : 5,63 s identiques), WAV dans `public/sons/6e-decimal-<slug>[-short]/`, nombres de clips = JSON.
  - ✅ Marques des 12 paysages : `python manim/scripts/6e/decimal_marques.py` (copie de `triangle_marques.py`), 0 mot introuvable.
  - ✅ `manim/scripts/6e/decimal_commun.py` : `VoixDecimale` normalise « 1 virgule 4 » → « 1,4 » dans la voix ET les marques (l'audit compare « 1,4 » à « 1,4 », écrire `self.au_mot("1,4 kilogramme")`) ; `TableauNum` (chiffres hors audit), `barre_unite`, animaux (chaton, lapin, chiot), `balance`, `lena` ; `choix()` pour un choix long (sinon la synchro le découpe en morceaux et la carte d'origine revient à la réponse) ; `poser_frac()` (numérateur puis dénominateur à leurs mots) ; `ligne_au_mot()`.
  - ✅ Paysage pilote `manim/scripts/6e/decimal_lire_ecrire.py` (3 min 44) : 1er rendu relu en planche ; corrigés : entêtes du tableau à taille unique, écran 04 agrandi (deux lignes, « 2,35 kg » dessous), « = 9 dixièmes ! » (07), explication de la question 2 sous le tableau à gauche. Dry run final : 0 AUDIT (sauf « 974 »), 0 BORD. RE-RENDU -qh lancé (media `manim/scripts/6e/media-dec-01`) : copier le mp4 dans `manim/sorties/6e/maths/decimaux/01-lire-ecrire/`, `python scripts/verifier-bords-video.py <mp4>` (le 1er rendu : 0 instant), planche relue.
  - ✅ Short pilote `prototypes/ti-margo/films/decimaux.js` (+ `.json`, `decimaux-cues.js`) : contrôle relu (mots au bon instant, le 5 tombe chez les dixièmes, « vide »), entêtes des cases agrandies, film rendu (74 s, 187 s de rendu) + miniature dans `01-lire-ecrire/`. Reste : planche du mp4 final et `verifier-bords-video.py`.
  - Puis : aperçu `manim/sorties/apercu-decimaux.html` (port 3900, à l'arrêt), montrer à Frédéric, attendre le oui du FORMAT. Rien n'est committé.
- Les deux paysages « Tout comprendre » (`6e-decimal-nombre`, `6e-decimal-calcul`) et leurs 4 shorts Manim RESTENT : elles sont en ligne (hv_ZFkFVk00, QFQsyW-CXw8), couvrent la notion entière et servent de révision. La nouvelle série est par micro ; ne pas les refaire.
- `decimal_diviser_par_decimal` : masquée en 6e (hors France, `micros-masquees.ts`), travaillée en 5e (`quotient_decimaux`). Pas de vidéo dans ce lot.

## Noms
Slugs dans l'ordre (dossier `manim/sorties/6e/maths/decimaux/NN-<slug>/`) :
01 `lire-ecrire`, 02 `rang`, 03 `comparer`, 04 `arrondir`, 05 `encadrer`, 06 `defi` (notion `decimal_nombre`) ;
07 `additionner`, 08 `multiplier`, 09 `multiplier-decimaux`, 10 `multiplier-par-01`, 11 `diviser-par-entier`, 12 `calcul-defi` (notion `decimal_calcul`).
Micros : `decimal_lire_ecrire`, `decimal_rang`, `decimal_comparer`, `decimal_arrondir`, `decimal_encadrer`, `decimal_defi`, `decimal_additionner`, `decimal_multiplier`, `decimal_multiplier_decimaux` (banque `programme-trous.bank.ts`), `decimal_multiplier_par_01`, `decimal_diviser_par_entier`, `decimal_calcul_defi`.
Préfixe des voix et du manifeste : `6e-decimal-<slug>[-short]`. Série Ti Margo : `films/decimaux.js` + `films/decimaux-<épisode>.js`.

## Décors et centres d'intérêt
| Ép. | Paysage (métier) | Short (gag Ti Margo) | Centres |
|---|---|---|---|
| 01 lire-ecrire | Léna, vétérinaire | dictée : 3,5 au lieu de 3,05 ; commentaire : 4,004 | animaux |
| 02 rang | Malik, chronométreur d'athlétisme | coffre-fort, code 7-6-2 ; commentaire : 4-1-5 | sport, jeux-defis |
| 03 comparer | Sofia, biologiste marine (tortues) | 3 bouteilles de jus ; commentaire : 2,03 < 2,3 < 2,33 | animaux-marins |
| 04 arrondir | Sami, météorologue | gâteau arrondi deux fois ; commentaire : 7 | meteo-climat, cuisine |
| 05 encadrer | Lina, pilote de robot sur Mars | loupe entre 4,7 et 4,8 ; commentaire : 9 | espace |
| 06 defi | Tom, créateur d'escape games | étiquettes 3, 7, 2 ; commentaire : 14,7 | jeux-defis |
| 07 additionner | Romain, boulanger | monnaie de 5 € ; commentaire : 3,60 € | cuisine, argent-budget |
| 08 multiplier | Lucas, jardinier paysagiste | 4 glaces à 60 € ; commentaire : 7,2 € | nature-ecologie |
| 09 multiplier-decimaux | Anaïs, carreleuse | pizza carrée 0,5 × 0,5 ; commentaire : 0,2 | construction, cuisine |
| 10 multiplier-par-01 | Kenzo, maquettiste de cinéma | machine à rétrécir, dinosaure ; commentaire : 0,25 m | cinema-series, dinosaures |
| 11 diviser-par-entier | Yasmine, régisseuse de concerts | 10 € entre 4 copains ; commentaire : 1,75 € | musique, argent-budget |
| 12 calcul-defi | Inès, vendeuse de jeux vidéo | soldes − 25 % ; commentaire : 40,50 € | jeux-video, argent-budget |

6 filles, 6 garçons. 0 sur 24 à La Réunion.
Ceintures : paysages vertes ; shorts 01, 02, 05 blancs (tout se voit) ; les autres jaunes (une règle ou un calcul).

## Choix à garder
- La valeur des chiffres AVANT le raccourci de la virgule (× 10, × 100, × 0,1, ÷ 10, ÷ 100) ; jamais « ajouter un zéro » pour × 10 (le zéro à la fin n'apparaît que pour écrire 0,7 = 0,70).
- À l'écran : « × » et « ÷ » ; la voix dit « fois » et « divisé par ». Les fractions 7/10, 25/10, 34/100, 125/100 ne figurent qu'en lire-ecrire (objet d'étude).
- Les choix de comparaison sont écrits en mots (« 12,13 est plus petit »), pas avec < > seuls : la voix dit les mots.
- Pas de choix A / B / C qui soit lui-même une lettre de point.
- Les shorts commencent par Ti Margo (« Salut ! … Tu paries ? »), il se trompe, l'élève le corrige ; question-pause de 3 s ; question chiffrée en commentaire ; phrase de fin du 05/11.
- Le défi ★2 du coach (4,9 × 2 plus proche de 10) est repris dans la paysage 12 : coach et vidéo disent la même chose.
