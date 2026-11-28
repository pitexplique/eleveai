# REPRISE — Monnaie Idriss, CP (épisodes 07 → 11), 28/11/2026

Voix VALIDÉES par Frédéric (ne pas les changer sans lui) : `manim/SCRIPTS-monnaie-idriss.md` (section CP) et `manim/voix/idriss-cp-*-{paysage,short}.json`.
Règles communes aux trois sessions (CP, CE1, CE2) : note `monnaie-idriss-regles-communes.md` du dossier de notes partagé (verrou HD `hd-verrou.txt`, RAM ≥ 2,5 Go).

## Épisodes (bonnes réponses du script)
| N° | Épisode | Short | Paysage |
|---|---|---|---|
| 07 | cp-reconnaitre | « Les trois trésors de la mouette » (C) | « Le soir, la caisse d'Idriss » (A, C) |
| 08 | cp-valeur | « La vieille boîte à hameçons » (C) | « Combien m'a-t-on donné ? » (C, B) |
| 09 | cp-comparer | « La mouette et le crabe » (A) | « Qui a le plus ? » (C, B) |
| 10 | cp-rendre | « Le filet du voisin » (A) | « La sardine du petit garçon » (C, B) |
| 11 | cp-defi | « Deux glaces pour Idriss » (B) | « Les défis d'Idriss » (A, A) |

## Fichiers (ceux du CP seulement)
- Films : `prototypes/ti-margo/films/idriss-cp-<ep>.js` (short) et `idriss-paysage-cp-<ep>.js` (paysage).
- Dessins CP : `films/idriss-dessins-cp.js` — coquilleRondeE (coquillage rond doré, sans nombre), loupeE, boiteHameconsE (rouillée, secouée, couvercle),
  filetRouleE, glaceE (option moitie), chariotGlacesE (parasol), goutteE (sueur), tasE (rangée de pièces/billets).
- Sons : `public/sons/idriss-cp-<ep>-{short,paysage}/` (ignorés par git). Sorties : `manim/sorties/idriss/<num>-cp-<ep>/`.

## ⚠️ Leçons
- `ti-margo-cues.py` réécrit tout `idriss-cues.js` / `idriss-paysage-cues.js` : deux sessions en même temps → l'une efface les épisodes de l'autre.
  Après un passage, vérifier que les 5 épisodes CP sont dans LES DEUX fichiers (sinon relancer `python scripts/ti-margo-cues.py idriss[-paysage] cp-<ep>`).
- Titres longs des shorts : `#titre{font-size:60px}` dans le film (07, 08).
- `phraseE(txt, ts)` : autant d'instants que de mots (séparés par des espaces) dans txt.

## Commandes
- Contrôle -ql : `CONTROLE=<dossier> node scripts/ti-margo-short.mjs idriss[-paysage] cp-<ep> controle $(seq 1 2.5 130)` puis
  `python scripts/ti-margo-planche.py <dossier> <planche.png>`.
- HD (sous le verrou) : `node scripts/ti-margo-short.mjs idriss[-paysage] cp-<ep> film` ; miniature : `... miniature`.

## État
- [x] 10 WAV + instants (28/11).
- [x] 10 films écrits (commit 3b03bb352).
- [x] Planches -ql 07 short + 07 paysage contrôlées et corrigées (commit e6d98ed09) : prêtes pour la HD.
- [x] Planches -ql 08 → 11 (shorts + paysages) contrôlées et corrigées le 28/11 vers 4 h 45 (commit 875cac71a) :
  pièces/billets agrandis, ciel foncé (09 et 11 short) pour lire les textes, couvercle de la boîte fermé pendant la question (08),
  paysages : tout à x < 480 pendant questions ET réponses (formules redondantes avec la carte retirées du tableau).
- 28/11 : Frédéric a fait arrêter les 4 `next dev` (≈ 4 Go) → 5,3 Go libres. Il préfère : UNE chose à la fois, petit à petit.
- [x] HD des 10 vidéos rendues le 28/11 entre 4 h 51 et 5 h 28 (une à la fois, verrou pris et rendu à chaque fois), toutes rc=0.
  Planches HD regardées, toutes bonnes : `manim/sorties/idriss/<num>-cp-<ep>/planche-hd-{short,paysage}.png`.
  MP4 : `manim/sorties/idriss/<num>-cp-<ep>/eleveai-maths-idriss-cp-<ep>-{short,paysage}.mp4`.
- [x] Miniatures : sources `... miniature` pour les 10 films ; gabarit A « Dessin animé » pour les 5 shorts
  (entrées `idriss-cp-<ep>-short` ajoutées en fin de `scripts/miniatures-shorts-grille.json`, ancienne image gardée en `-avant-grille.png`).
  Planche des 5 : `manim/sorties/idriss/planche-miniatures-cp-07-11.png`.
  ⚠️ `miniatures-shorts-grille.py` lit le MANIFESTE (`V[cle]`) : ces 5 ids n'y sont pas encore (manifeste interdit sans Frédéric),
  donc un lancement SANS filtre plantera sur eux tant qu'ils ne sont pas au manifeste ; on a appelé `dessine()` en direct.
  Miniatures des paysages : modèle commun de la série (titre + « Dessin animé »), non modifiées.
- [x] 28/11 ~06 h 30, sur son « oui » : vignettes webp (20) ; R2 45 fichiers sous `cp/maths/idriss/<num>-cp-<ep>/` (tailles = locales ;
  les 5 `-avant-grille.png` sont partis aussi, sans gêne) ; manifeste : 10 entrées `idriss-cp-<ep>[-short]` à la fin, YouTube daté
  15/08 → 19/08/2027 (une paire par jour, à la suite du 14/08 ; CE1/CE2 : prendre à partir du 20/08) ; chapitres depuis les durées des voix ;
  videos-r2.json + bilans-videos.json (mes 10 clés) ; coach : `brancher-videos-coach.mjs --ecrire --id …` → 10 lignes notion_ressources
  (5 micros cp_monnaie_*, paysage + short). `miniatures-shorts-grille.py` ne plante plus (240 clés au manifeste).
  ⚠️ Pas poussé : les boutons du coach mènent à /video/idriss-cp-… qui n'existe en ligne qu'après le push.
- [ ] Reste : push (avec son accord) ; publication YouTube à son heure.
- Pas de push sans Frédéric.
