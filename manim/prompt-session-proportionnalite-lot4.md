Prompt — série PROPORTIONNALITÉ, reprise au lot 4 (4e agrandissements + grandeurs composées) — 31/10/2026

Réponds toujours en français. Ne pose pas de questions : tranche, avance, liste tes choix à la fin.

**Règles** (MEMORY.md) : committer PAR CHEMIN (jamais `git add -A`, jamais `media-*`, `*.cues.tsv` ; ⚠️ `git commit -- <chemins>` pour ne pas embarquer ce qu'une autre session a mis en attente) ; push SEULEMENT sur son signal, le soir (vérifier `git log origin/main..HEAD --stat`) ; ne jamais lancer la lecture d'une vidéo ; 3 agents à la fois au plus, toujours NEUFS ; changer de session à 60 % ; La Réunion ≈ 4 % des contextes.

## Où on en est
- Lots pilote, 1, 2 (`1020970a`) et 3 (6e pourcentages : rendus + passe finale `954f8d84`) FINIS. Questions + centres : `manim/questions-proportionnalite.md`. Consigne : `manim/consigne-videos-proportionnalite.md`.
- **Lot 4 : voix VALIDÉES par Frédéric le 31/10** : `manim/voix/4e-prop-<slug>[-short].json`. Brief des agents : `manim/brief-agent-proportionnalite-lot4.md`.
- **31/10 au soir : épisodes 11 à 16 RENDUS, vérifiés (bords 0, planches) et COMMITÉS** avec leurs questions dans `manim/questions-proportionnalite.md` (sections « 4e 11 » à « 4e 16 »). Frédéric a arrêté là pour la journée.
- **01/11 : épisodes 17, 18, 19 RENDUS, vérifiés et COMMITÉS** (`b389f975`, `29d997cf`, `22f09486`) ; **passe finale du lot 4 FAITE `95f38301`** (18 entrées manifeste, R2 18/18, table R2, bilans ; 17/18 branchées au coach : `4e-prop-grandeur-defi-short` NON branché car la micro `grandeur_defi` montre déjà le short YouTube `YwddOhgj4as` — à retirer de `notion_ressources` si Frédéric préfère le nouveau). Miniatures + `fiche-youtube.md` hors git dans les dossiers 11-* à 19-* : titres, chapitres, accroches et arrondis « EN N MIN » (12 → 5 min, 15/16 → 3 min) à relire par Frédéric. **LOT 4 FINI.**
- ⚠️ `manim/manifeste-youtube.json` garde 2 lignes NON commitées d'une autre session (nouvelles `url` + `ancienne_url` de `4e-pythagore-carre-racine` et son short) : ne pas les embarquer.
- **Lot 5 : les 18 voix sont ÉCRITES le 01/11** (`manim/voix/4e-prop-<slug>.json`, tableau en bas), **EN ATTENTE DE VALIDATION** par Frédéric. Ensuite : brief des agents (sur le modèle du brief lot 4, PAYSAGE SEULEMENT), rendus 3 par 3, passe finale.
- Leçons des épisodes 11-16, à donner aux agents 17-19 :
  - `scripts/cues2marques.py` jette les répétitions : poser une marque par occurrence (outil de l'agent 13 : convertisseur maison, ou ajout à la main) ;
  - l'AUDIT cherche « 1600 » quand la voix dit « 1 600 » (AUDIT-ABSENT sans gravité) ; `question_pause` audite à tort les choix pendant la réponse (surcharge dans `prop_grandeur_unite.py`) ;
  - garder la dernière ligne d'un short au-dessus de la tête de Ti Margo, et la coche verte loin du texte des choix (frôlements en 11, 14, 16) ;
  - modèles récents : `manim/scripts/4e/prop_agrandissement_*.py` et `prop_grandeur_{produit,quotient,unite}*.py` (`PropAgrandissementRapportBase` de l'épisode 11 est réutilisable).

## Missions des agents (une par épisode : paysage + short ; 3 agents à la fois, NEUFS : « lis et applique le brief `manim/brief-agent-proportionnalite-lot4.md` » + la mission)
| NN | slug | script (manim/scripts/4e/) | micro | paysage : décor, centres | short : jeu, centres |
|---|---|---|---|---|---|
| 11 | agrandissement-rapport | prop_agrandissement_rapport | agrandissement_rapport | Nina photographe, poster ; `art-design`, `reseaux-sociaux` | chat écrasé si on ajoute ; `animaux`, `reseaux-sociaux` |
| 12 | agrandissement-aire | prop_agrandissement_aire | agrandissement_aire | Adam pâtissier, pâte à sucre ; `cuisine` | grande pizza = 4 petites ; `cuisine` |
| 13 | agrandissement-volume | prop_agrandissement_volume | agrandissement_volume | Louise soigneuse d'aquarium ; `animaux`, `sciences` | dé géant = 8 dés ; `jeux-defis` |
| 14 | grandeur-produit | prop_grandeur_produit | grandeur_produit | Rayan électricien, kWh ; `sciences`, `argent-budget` | 714 chambres sur un terrain de foot ; `sport` |
| 15 | grandeur-quotient | prop_grandeur_quotient | grandeur_quotient | Manon conductrice de TGV ; `transports`, `argent-budget` | cœur et BPM ; `musique`, `corps-sante` |
| 16 | grandeur-unite | prop_grandeur_unite | grandeur_unite_composee | Malik géographe, densité de Paris ; `histoire-geographie` | la lumière, 7,5 tours de la Terre ; `espace`, `sciences` |
| 17 | grandeur-convertir | prop_grandeur_convertir | grandeur_convertir | Aïcha carreleuse ; `art-design` | Bolt à 36 km/h ; `sport`, `transports` |
| 18 | grandeur-coherence | prop_grandeur_coherence | grandeur_coherence | Enzo pisciniste ; `sport`, `sciences` | trois résultats faux ; `jeux-defis` |
| 19 | grandeur-defi | prop_grandeur_defi | grandeur_defi | Fatou agricultrice, blé ; `nature-ecologie`, `argent-budget` | le petit paquet moins cher au kilo ; `argent-budget`, `cuisine` |
Classe `Prop<Slug>4e` ; sorties `manim/sorties/4e/maths/proportionnalite/<NN>-<slug>/` ; media_dir `manim/media-prop-4e-<NN>`.

## Vérifier chaque épisode (toi-même)
Les 2 mp4 présents et immobiles → `python scripts/verifier-bords-video.py <mp4>` = « 0 instants » ; planche de 12 images (PyAV, outil à recréer dans ton scratchpad) regardée ; `t` des questions-pauses ; noter `questions` + centres + durées + question en commentaire dans `manim/questions-proportionnalite.md` (modèle des sections « 6e 11 » à « 6e 14 », titre « 4e NN-slug ») ; commit par chemin (scripts + `*_marques.json` + questions).

## Suite
1. ✅ Rendus 11 → 19 et passe finale du lot 4 (`95f38301`).
2. **Lot 5 : faire valider les 18 voix** (déjà écrites), puis écrire `manim/brief-agent-proportionnalite-lot5.md` (copie du brief lot 4 : PAYSAGE SEULEMENT, ceinture verte, script `manim/scripts/4e/prop_<slug_souligné>.py`, classe `Prop<Slug>4e`, sorties `manim/sorties/4e/maths/proportionnalite/<NN>-<slug>/eleveai-maths-4e-prop-<slug>.mp4`, media_dir `manim/media-prop-4e-<NN>`, produit en croix seulement en 24 `quatrieme`), rendus 3 agents NEUFS à la fois, vérifier, committer ; passe finale (microId = colonne micro).
3. Publier sur YouTube les paysages AVANT leurs shorts (lots 2, 3, 4).

## Lot 5 — 18 paysages 4e (voix écrites le 01/11, à valider)
Faits réels : pression ≈ 1 bar par 10 m d'eau de mer + ≈ 1 bar d'air en surface (22) ; match FIBA 40 min (32) ; essence ≈ 1,80 €/L (20). Le reste est inventé. Erreurs du fil rouge travaillées : ajouter au lieu de multiplier (21, 28), croire tout proportionnel (20, 25, 27), inverser le coefficient / la diagonale (23, 24, 26), +20 % puis −20 % (36, 37), « sur 100 » oublié (33).
| NN | slug | micro | décor, métier | centres |
|---|---|---|---|---|
| 20 | reconnaitre | prop_reconnaitre | Hugo chauffeur de taxi (prise en charge) | `transports`, `argent-budget` |
| 21 | tableau | prop_table | Inès chocolatière | `cuisine` |
| 22 | graphique | prop_graphique | Noé biologiste marin, pression en plongée | `animaux-marins`, `sciences` |
| 23 | coefficient | prop_coeff | Yasmine peintre en bâtiment, m²/L | `construction`, `art-design` |
| 24 | quatrieme | prop_quatrieme | Malo styliste, tissu (produit en croix) | `mode` |
| 25 | probleme | prop_probleme | Sofia organise un tournoi de foot | `football`, `argent-budget` |
| 26 | relation | prop_relation | Maël installateur de panneaux solaires, y = 1,5x | `sciences`, `nature-ecologie` |
| 27 | defi | prop_defi | Kenza game designer, XP et packs | `jeux-video` |
| 28 | ratio-ecrire | prop_rapport | Tom coloriste de manga | `dessin-manga`, `art-design` |
| 29 | ratio-quotients | prop_ratio_quotients | Salomé boulangère, farine : eau 5 : 3 | `cuisine` |
| 30 | ratio-trois | prop_ratio_trois | Bastien horticulteur, terreau 3 : 4 : 1 | `nature-ecologie` |
| 31 | ratio-partager | prop_ratio_partager | Awa productrice, cachet de concert | `rap`, `argent-budget` |
| 32 | ratio-defi | prop_ratio_defi | Nathan entraîneur de basket | `basket` |
| 33 | pourcentage-calculer | prop_pourcentage | Lou journaliste sportive, tennis | `tennis`, `sport` |
| 34 | pourcentage-mental | prop_pourcentage_mental | Mehdi vendeur de baskets | `argent-budget`, `mode` |
| 35 | pourcentage-coefficient | prop_coeff_multiplicateur | Léna vendeuse de motos | `voitures-motos`, `argent-budget` |
| 36 | pourcentage-evolution | prop_evolution | Sacha community manager | `reseaux-sociaux` |
| 37 | pourcentage-defi | prop_pourcentage_defi | Julia directrice de cinéma | `cinema-series`, `argent-budget` |
