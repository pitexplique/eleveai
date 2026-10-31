Prompt — série PROPORTIONNALITÉ, reprise au lot 4 (4e agrandissements + grandeurs composées) — 31/10/2026

Réponds toujours en français. Ne pose pas de questions : tranche, avance, liste tes choix à la fin.

**Règles** (MEMORY.md) : committer PAR CHEMIN (jamais `git add -A`, jamais `media-*`, `*.cues.tsv` ; ⚠️ `git commit -- <chemins>` pour ne pas embarquer ce qu'une autre session a mis en attente) ; push SEULEMENT sur son signal, le soir (vérifier `git log origin/main..HEAD --stat`) ; ne jamais lancer la lecture d'une vidéo ; 3 agents à la fois au plus, toujours NEUFS ; changer de session à 60 % ; La Réunion ≈ 4 % des contextes.

## Où on en est
- Lots pilote, 1, 2 (`1020970a`) et 3 (6e pourcentages : rendus + passe finale `954f8d84`) FINIS. Questions + centres : `manim/questions-proportionnalite.md`. Consigne : `manim/consigne-videos-proportionnalite.md`.
- **Lot 4 : voix VALIDÉES par Frédéric le 31/10** : `manim/voix/4e-prop-<slug>[-short].json`. Brief des agents : `manim/brief-agent-proportionnalite-lot4.md`.
- **Aucun rendu lancé.**

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
1. Rendus 11 → 19 (3 par 3).
2. Passe finale du lot 4 par un agent, comme `954f8d84` (miniatures, manifeste avec microId 4e ci-dessus, `fiche-youtube.md`, R2 limité au préfixe `eleveai-maths-4e-prop-agrandissement*`/`grandeur*`, bilans, `brancher-videos-coach --ecrire --id …`) ; vérifier que les JSON ne contiennent QUE des ajouts `4e-prop-agrandissement*`/`4e-prop-grandeur*` ; commit par chemin.
3. Lot 5 (4e, une paysage par micro pour `prop_proportionnalite`, `prop_ratio`, `prop_pourcentages`, 18 paysages) : voix à écrire puis à faire valider (coller la voix en entier, s'arrêter là).
4. Publier sur YouTube les paysages AVANT leurs shorts (lots 2, 3, 4).
