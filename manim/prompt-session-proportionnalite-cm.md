Prompt — vidéos CM1/CM2, lot PROPORTIONNALITÉ CM-A (01/11/2026)

Réponds toujours en français. Ne pose pas de questions : tranche, avance, liste tes choix à la fin.

**Règles** (MEMORY.md) : committer PAR CHEMIN (`git commit -- <chemins>`, jamais `git add -A`, jamais `media-*` ni `*.cues.tsv`) ; push SEULEMENT sur son signal, le soir ; ne jamais lancer la lecture d'une vidéo ; 3 agents à la fois au plus, toujours NEUFS ; changer de session à 60 % ; La Réunion ≈ 4 % des contextes. Une autre session met à jour les 6 pays (6e → 3e) : ne toucher qu'aux fichiers des vidéos CM.

## Pourquoi la proportionnalité d'abord
Frédéric, 01/11 : « il faut commencer les vidéos CM1 CM2 ». La consigne `manim/consigne-videos-proportionnalite.md` prévoit « ensuite : CM1/CM2 (épisodes communs) » après les lots 6e et 4e (finis le 01/11). Le module `manim/canvas_proportion.py` et les modèles 6e (`manim/scripts/6e/prop_*.py`, base `prop_commun.py`) sont prêts : c'est le départ le moins risqué. Le coach CM est robuste (renfort `lib/tutor-v4/questionBank/cm2/maths/proportionnalite-cm-renfort.ts`, aucune question open).

## Inventaire au 01/11 (micros du coach sans vidéo)
- CM1 : 134 micros sur 156 sans vidéo. Couvertes : fractions (9), tableau (4), graphique (4), probabilités (5).
- CM2 : environ 130 sur 155 sans vidéo. Couvertes : fractions (7), fraction mixte écrire/regrouper (2), tableau, graphique, probabilités. Fractions CM2 12-15 (encadrer, additionner, produit par un entier, quantité) abandonnées le 27/10.
- Rien en nombres entiers, suites, tables, multiplication, division, décimaux, calcul, problèmes, algèbre, proportionnalité, pourcentages (CM2), échelles (CM2), grandeurs et mesures, géométrie, algorithmique.
- Recalcul : `node <scratchpad>/couverture.js` (micros de `lib/tutor-v4/knowledge/maths/<cm1|cm2>/microSkills.ts` croisés avec les `microId` du manifeste).

## La série proportionnalité CM (numérotation commune)
Épisode COMMUN = une voix `cm-prop-<slug>.json`, un script `manim/scripts/cm1/prop_<slug>.py` à deux sous-classes `Prop<Slug>CM1` / `Prop<Slug>CM2` (seules l'identité et la ceinture changent, la voix ne cite aucune classe), short rendu une fois et copié sous les deux noms (comme les fractions CM). Paysage CM1 VERTE / CM2 JAUNE ; short BLANC. Épisode propre à une classe : voix `cm1-prop-<slug>.json` ou `cm2-…`, paysage verte.
Sorties `manim/sorties/<cm1|cm2>/maths/proportionnalite/<NN>-<slug>/eleveai-maths-<cm1|cm2>-prop-<slug>[-short].mp4` ; ids du manifeste `<cm1|cm2>-prop-<slug>[-short]`.
Niveau CM : 9-11 ans, phrases très courtes, débit −10, « ÷ » écrit (la voix dit « divisé par »), aucun produit en croix, centres de la tranche 9-11 (pas d'argent, de réseaux sociaux ni de cinéma).

### Lot CM-A — voix VALIDÉES par Frédéric le 01/11 (`357ff852`) ; brief des agents `manim/brief-agent-proportionnalite-cm.md` ; rendus 01-03 lancés le 01/11, 04 ensuite
| NN | slug | micro(s) | classes | paysage (métier, décor) | centres | short | centres short |
|---|---|---|---|---|---|---|---|
| 01 | reconnaitre | prop_reconnaitre | CM1 + CM2 | Adam, entraîneur de basket : 1 panier = 2 points ; contre-exemple âges Lili/Bob (+3) ; défi bouquets 5, 10, 16 | sport | 1 musicien ou 5 : toujours 3 min ; œufs 10 min | musique, jeux-defis |
| 02 | fois-plus | prop_fois_plus | CM1 | Fatou, maraîchère : 1 rangée = 6 salades (billes), × 2, × 3 ; défi ruches 20 kg → 40, 100 | nature-ecologie | sauter 6 fois plus haut sur la Lune | espace, sport |
| 03 | fois-moins | prop_fois_moins | CM1 | Malik, peintre en bâtiment : 6 murs = 12 L (billes), ÷ 2, ÷ 3 ; défi volets 20 L → 10, 4 | art-design | Ti Margo : 30 moustiques en 6 min | animaux, jeux-defis |
| 04 | tableau | prop_tableau | CM1 + CM2 | Léna, conductrice d'un train touristique : 1 wagon = 20 places, × 20 et colonnes ; défi 2 wagons = 50 places | transports | pattes : fourmi 6, araignée 8 | animaux, sciences |

Questions-pauses : 2 par paysage, 1 par short (choix dans les JSON ; leurres = ajouter au lieu de multiplier, croire tout proportionnel, inverser × et ÷). Questions en commentaire : 01 tee-shirts (2 h), 02 Ti Margo sur la Lune (60 cm), 03 en 3 min (15), 04 fourmis + araignées (140).
Faits à vérifier et sourcer en tête des scripts : saut environ 6 fois plus haut sur la Lune (gravité ≈ 1/6, NASA) ; ruche ≈ 10 kg de miel par an (ordre de grandeur France) ; fourmi 6 pattes, araignée 8.

### Lot CM-B — voix VALIDÉES par Frédéric le 01/11 (`1b10f19d`) ; brief des agents `manim/brief-agent-proportionnalite-cm-b.md` ; rendus 05-07 lancés le 01/11, 08 ensuite
| NN | slug | micro | classes | voix | paysage (métier, décor) | centres | short | centres short |
|---|---|---|---|---|---|---|---|---|
| 05 | coefficient | prop_coefficient | CM1 + CM2 | `cm-prop-coefficient[-short]` | Nora, pâtissière : 4 gâteaux = 12 œufs, coefficient 3 ; piège l'écart 8 ; défi pizzas 18 tomates → 9 pizzas | cuisine | cœur au repos ≈ 80 battements/min, récré 15 min = 1 200 | corps-sante |
| 06 | quatrieme | prop_quatrieme | CM2 | `cm2-prop-quatrieme[-short]` | Yanis, météorologue : pluie 3 h = 12 mm → 1 h = 4 mm → 5 h = 20 mm ; piège 14 ; défi satellite 15 photos/5 min → 8 min | meteo-climat | guépard ≈ 90 m en 3 s → 30 m/s | animaux, sport |
| 07 | probleme | prop_probleme | CM1 + CM2 | `cm-prop-probleme[-short]` | Zoé, ingénieure en robots : 2 robots = 6 piles, 5 = 15, 7 = 6 + 15 ; 4 étapes ; piège la donnée inutile (30 cm) ; défi vis | technologie-ia | Station spatiale ≈ 16 levers de soleil par jour | espace, sciences |
| 08 | defi | prop_defi | CM1 + CM2 | `cm-prop-defi[-short]` | Ilyes, soigneur de parc animalier : offres de sacs de graines, valeur pour 1 sac ; offres égales ; défi 3 offres de croquettes | animaux | Léo, Maya, Sam : mètres par minute | sport, jeux-defis |

Questions en commentaire : 05 en 60 min (4 800), 06 en 7 s (210 m), 07 en 10 jours (160), 08 Inès 1 200 m en 6 min (aussi vite que Léo). Faits à sourcer en tête des scripts : fréquence cardiaque d'un enfant de 9-11 ans au repos (≈ 70-110/min), guépard ≈ 100-110 km/h (≈ 30 m/s), Station spatiale ≈ 16 orbites et levers de soleil par jour (NASA).
Puis : CM2 pourcentages (5 micros) et échelles (4 micros).

## État des rendus (01/11, à reprendre ici si la session change)
- ✅ FINIS, vérifiés (bords 0) et commités : 01 reconnaitre `c19cb1ce`, 02 fois-plus `d82c8fdd`, 03 fois-moins `4530a4da` ; questions + centres dans la section CM de `manim/questions-proportionnalite.md`.
- ✅ 04 tableau FINI (voir `git log`), bords 0. Pour mémoire, sa mission : `manim/scripts/cm1/prop_tableau.py` (`PropTableauCM1` verte / `PropTableauCM2` jaune, garde CM2 collée) + `prop_tableau_short.py` ; voix `cm-prop-tableau[-short].json` ; sorties `manim/sorties/<cm1|cm2>/maths/proportionnalite/04-tableau/` ; media_dir `manim/scripts/cm1/media-prop-tableau[-short]` ; modèle `manim/scripts/6e/prop_tableau.py` (`TableauProp`, flèche latérale « × 20 », flèches du haut « × 2 » entre colonnes).
- Vérifier chaque épisode soi-même : mp4 présents et immobiles, `verifier-bords-video.py` = 0 instants, planche de 12 images regardée, `questions` + centres notés dans une section « CM » de `manim/questions-proportionnalite.md`, puis commit par chemin (scripts + `*_marques.json` + questions, jamais `media-*` ni `*.cues.tsv`).

## ⏭ Reste à faire (lot CM-A rendu en entier le 01/11)
- ✅ Passe finale du lot CM-A FAITE le 01/11 (voir `git log`, « passe finale ») : 12 entrées au manifeste (`cm1-prop-<slug>[-short]` ×8, `cm2-prop-<slug>[-short]` ×4 ; chapitres par dry run + `renderer.time`, questions et centres de la section CM de `manim/questions-proportionnalite.md` ; fiche de cours seulement en CM2, il n'y a pas de fiche proportionnalité CM1) ; table R2 + bilans ; R2 36/36 (`rclone check`) et HTTP 200 ; 12 vidéos branchées au coach (`/video/<id>`) ; pays du primaire : Belgique P4/P5, Suisse romande cycle 2 (MSN 23-b2), Québec (SOP A3/B2), 0 erreur de couverture. Miniatures, vignettes et `fiche-youtube.md` hors git dans les 6 dossiers de sortie (titres à relire par Frédéric). Reste : publier sur YouTube, chaque paysage AVANT son short.
- Outils de la passe finale (à recopier pour le lot B) : scratchpad de la session du 01/11 après-midi, `miniatures_cma.py`, `construire_cma.py`, `appliquer_manifeste.py`, `appliquer_r2_bilans.mjs`, `temps/lancer.sh` (⚠️ `sys.path` : `cm1` AVANT `6e`, sinon `prop_tableau` 6e est importé).
- Écrire les voix du lot CM-B et les faire valider par Frédéric.

## Après la validation
1. Brief des agents (modèle `manim/brief-agent-proportionnalite-lot3.md`, adapté au CM) ; WAV ; scripts ; dry run (0 RETARD, 0 AUDIT-AVANCE) ; planche ; UN rendu HD ; `verifier-bords-video.py` ; section CM dans `manim/questions-proportionnalite.md`.
2. Passe finale : miniatures, manifeste (`centres`, `questions`, `microId`), fiches YouTube, R2, coach (`brancher-videos-coach.mjs` pagine depuis `7627c2df`).

Ne pousse rien sans le signal du soir de Frédéric.
