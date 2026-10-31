# Consigne — VIDÉOS de la série PROPORTIONNALITÉ (6e et 4e d'abord, puis CM1, CM2, 5e, 3e, lycée)

⭐ Lis EN ENTIER, dans cet ordre : `manim/consigne-videos-stats-cycle3.md` (règles de fond, vérifications PyAV, écriture par morceaux ≤ 150 lignes, NE RIEN COMMITTER, ne jamais lire une vidéo, calage mot à mot par `*_marques.json`), `manim/consigne-videos-stats-cycle4.md` (voix, épisodes communs, génération des WAV), `manim/consigne-videos-fractions.md` (règles du 23-24/10, économie), puis `manim/REGLES.md` EN ENTIER (ceintures, questions-pauses, centres, « Ce que tu as appris », rien de rogné, synchro 0 s, AUDIT avant rendu HD, maths transversales). Ce fichier ne donne que les DIFFÉRENCES.

Frédéric enseigne cette année en **6e et en 4e** : ses élèves verront ces vidéos en classe (ses 6e lisent difficilement : phrases courtes, beaucoup de visuel). La qualité passe avant la durée.

## État au 31/10 (inventaire, rien à refaire)
- Coach robuste du CM1 à la Terminale (`09635b36`, `4624e6fb`, `eacd4fed`) ; feuilles d'exercices présentes pour les 9 notions de 6e et 4e (`lib/fiches-exercices/registre.ts`).
- **Déjà faits, ne pas refaire** : 4e `prop_proportionnalite`, `prop_ratio`, `prop_pourcentages` ont UNE paysage par notion + UN short par micro (`4e-prop-*-short-*`, manifeste) ; 6e `pourcentage_fraction` et `pourcentage_decimal` sont couverts par la série fractions (6e 12 et 13) ; anciennes paysages 6e `a2zNZzxuo4M` (proportionnalité) et `pAPkXW4EDsU` (pourcentages), muettes et à remplacer.

## ⭐⭐ Le fil rouge : les erreurs
Frédéric, 31/10 : « pas d'erreur particulière » sur ses copies. Les leurres des questions-pauses sont donc les erreurs classiques ci-dessous (ne pas en inventer d'autres) :
1. **Ajouter au lieu de multiplier** : « 3 pour 5 €, donc 6 pour 8 € » (+3 partout).
2. **Croire tout proportionnel** : l'âge et la taille, un forfait avec abonnement, un tarif dégressif.
3. **Inverser le coefficient** (÷ au lieu de ×, ou la mauvaise ligne).
4. **+20 % puis −20 %** ne ramène pas au départ (4e).
5. **Échelle à l'envers** : multiplier la distance réelle par 25 000 au lieu de diviser ; oublier de convertir (cm → km).
6. **Pourcentage = nombre de cases sans le « sur 100 »** : 25 sur 50, ce n'est pas 25 %.

## Les recommandations (Frédéric, prompt du 25/10)
1. **Montrer avant de calculer** : contre-exemples réels d'abord (âge et taille, forfait), aucune règle avant d'avoir vu.
2. **Plusieurs méthodes, un même problème** : passage par l'unité, coefficient, linéarité (additionner deux colonnes, multiplier une colonne) ; ⛔ produit en croix INTERDIT en 6e (BO), seulement en 4e. Chaque épisode dit la méthode qu'il travaille.
3. **Fil rouge de la série fractions** : fraction → décimal → pourcentage ; un pourcentage est une proportion sur 100. Faire le lien sans dupliquer ses vidéos.
4. **Grandeurs et unités écrites partout**, « ÷ » et jamais 5/2 hors fractions.
5. **Centres** : 1 à 3 par vidéo, liste FERMÉE `lib/videos/centres-interet.ts` (cuisine et animaux permis), un décor et un MÉTIER différents par épisode, filles et garçons en alternance. Pistes : cuisine (recette pour 4 → pour 6, pâtissière), sport (foulées, vitesse, analyste), argent-budget (prix au kilo, soldes, change, caissier), transports (consommation, conductrice de bus), histoire-géographie (carte, cartographe), jeux-video (XP, game designer), musique (BPM, DJ), nature-ecologie (eau, déchets), espace (vitesse de la lumière). Chiffres réels vérifiés par WebSearch (source + date en en-tête du script).
6. **Shorts** : un jeu ou une surprise (« le plus gros paquet n'est pas toujours le moins cher au kilo »), 1 question-pause de 3 s, une question chiffrée en commentaire pour finir.

## Le module commun : `manim/canvas_proportion.py`
Créé et validé par le PILOTE (6e 01-reconnaitre), lecture seule pour les agents suivants (ils complètent dans LEUR script et le signalent). Au style des canvas du COACH : `lib/canvas/TableauProportionnaliteCanvas.tsx` (tableau 2 lignes, cases manquantes, cases allumées), `lib/canvas/EchelleCanvas.tsx`, `lib/canvas/SchemaBarreCanvas.tsx`, `lib/canvas/FonctionGraphiqueCanvas.tsx`. Fournit au moins : `TableauProp` (2 lignes, libellés avec unités, cases « ? », flèches latérales « × k » / « ÷ k » entre les lignes, flèches du haut « × 2 », « + » entre colonnes pour la linéarité, case allumée), `Unite` (passage par l'unité : 5 → 1 → 8 avec ÷ puis ×), `Billes` (schéma de billes, mémoire `schemas-de-billes-multiplication-division.md`), `DroiteOrigine` (repère, points alignés avec l'origine ou non), `EchelleCarte` (segment sur la carte ↔ distance réelle, conversion cm → m → km), `BarrePourcent` (barre de 100 cases / barre de chargement). Même esprit que `canvas_stats.py` : le module renvoie objets et animations, n'ajoute rien à la scène ; l'API est documentée dans son en-tête ; il reprend la section AUDIT de synchro (modèle `manim/scripts/stmg/stats_lycee_j1_commun.py`).

## Noms et sorties
- Script `manim/scripts/<classe>/prop_<slug>.py` (+ `_short.py`), classe `Prop<Slug><Classe>` (`6e`, `4e`).
- Voix `manim/voix/<classe>-prop-<slug>.json` (+ `-short.json`) ; épisode COMMUN 6e/4e : voix `commun-prop-<slug>.json`, un script `manim/scripts/6e/prop_<slug>.py` avec deux sous-classes `Prop<Slug>6e` / `Prop<Slug>4e` (seules l'identité et la ceinture changent ; la voix ne cite aucune classe ; le short rendu une fois et copié sous les deux noms).
- Sorties `manim/sorties/<classe>/maths/proportionnalite/<NN>-<slug>/eleveai-maths-<classe>-prop-<slug>[-short].mp4` ; media_dir `manim/scripts/<classe>/media-prop-<slug>`.
- Ids du manifeste (passe finale) : `<classe>-prop-<slug>[-short]`.

## Numérotation et ordre des lots (micro du coach entre parenthèses)
- **PILOTE** : 6e 01-reconnaitre (prop_reconnaitre), paysage + short. Frédéric le teste en classe avant tout autre lot.
- **Lot 1 — 6e proportionnalité** : 02-tableau (prop_table), 03-coefficient (prop_coeff), 04-unite (prop_unite), 05-resoudre (prop_direct), 06-defi (prop_defi). Paysage + short. Méthodes : linéarité, coefficient, unité ; JAMAIS le produit en croix.
- **Lot 2 — échelles, COMMUN 6e/4e** : 07-echelle-comprendre, 08-echelle-reelle (echelle_distance_reelle), 09-echelle-plan (echelle_distance_plan). Puis 6e 10-echelle-defi et 4e 10-echelle-defi (propres à chaque classe).
- **Lot 3 — 6e pourcentages** : 11-pourcentage-comprendre, 12-pourcentage-lire, 13-pourcentage-calcul (pourcentage_calcul_simple), 14-pourcentage-defi. Renvoie aux épisodes fractions 6e 12 et 13 sans les refaire.
- **Lot 4 — 4e agrandissements et grandeurs** : 11-agrandissement-rapport, 12-agrandissement-aire, 13-agrandissement-volume ; notion `grandeur_composee` : 14-grandeur-produit, 15-grandeur-quotient, 16-grandeur-unite, 17-grandeur-convertir, 18-grandeur-coherence, 19-grandeur-defi.
- **Lot 5 — 4e, une paysage par micro** pour `prop_proportionnalite`, `prop_ratio`, `prop_pourcentages` (18 micros ; PAYSAGE SEULEMENT, les shorts existent). Après les lots 1 à 4.
- Ensuite : CM1/CM2 (épisodes communs), 5e, 3e, lycée.

## Rapport final (court, en français)
Par épisode : fichiers, durées, décor/métier/source, centres, ceinture(s), `questions` (t mesuré), planches vues, résultat de `verifier-bords-video.py`, soucis restants. Le chef d'orchestre recopie `questions` et `centres` dans `manim/questions-proportionnalite.md`.
