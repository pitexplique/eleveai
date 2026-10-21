# Consigne commune — VIDÉOS de la série STATISTIQUES, cycle 3 (EleveAI)

Réponds en FRANÇAIS. Dépôt : C:\Users\FRED\Documents\eleveai (Windows ; Git Bash et PowerShell). Plusieurs agents rendent des épisodes en même temps : tu ne crées QUE tes fichiers (scripts, voix mp3, rendus de TES épisodes). ⛔ NE COMMITTE RIEN. ⛔ Ne lance JAMAIS la lecture d'une vidéo (ni lecteur, ni navigateur) : tu vérifies par des PLANCHES d'images extraites avec PyAV. ⛔ Pas de miniatures YouTube, pas de manifeste, pas de R2, pas de branchement au coach : le chef d'orchestre fait cette passe à la fin.

Frédéric est STATISTICIEN et professeur ; il montre ces vidéos à ses élèves (CM, 6e qui lisent difficilement). La qualité passe avant la durée.

## Lis d'abord, EN ENTIER
1. `manim/REGLES.md` (règles des vidéos : ceinture, voix = écrit, pas d'écart, agrandir pour insister, fin de vidéo, shorts…).
2. `manim/prompt-statistiques.md` (série, maths transversales, métiers, pièges du statisticien, section « Les CANVAS de la série »).
3. Le modèle de mise en scène : `manim/scripts/cm1/proba_roue.py` et `manim/scripts/cm1/proba_roue_short.py` (gabarit `Notion6e` de `gabarit_sixieme`, `attendre_voix`, `page_abonnement`, `echelle_ceintures`, en-tête du fichier qui documente écrans, voix, commande de rendu).
4. Le modèle « une voix, un script, deux rendus » : en-tête et classes de `manim/scripts/stmg/proba_probaC_notation.py` (une sous-classe par classe, qui ne change que `identite`).
5. Les figures du COACH que la vidéo reprend : `lib/canvas/StatGraphCanvas.tsx` (barres, bâtons, camembert, courbe ; axe gradué + grille légère, couleurs, highlight) et le canvas `tableau_donnees` (cherche-le dans `lib/canvas/`, en-tête sombre, colonne des libellés, case allumée). La vidéo doit ressembler à ce que l'élève verra ensuite dans le coach.
6. La voix de ton épisode : `manim/voix/<nom>.json` et `<nom>-short.json`. La voix est ÉCRITE ; tu peux corriger une phrase seulement si elle est fausse, incohérente avec la figure, ou si elle ne finit pas par « Entraîne-toi sur éleveai point f r. Et abonne-toi ! » (paysage) ; dis-le dans ton rapport. Le short finit par une QUESTION à laquelle répondre en commentaire.

## Le module commun des figures : `manim/canvas_stats.py`
Créé par l'agent PILOTE (épisode graphique-lire), réutilisé par TOUS les autres (import comme `charte`). Il fournit, au style du coach : `Barres` (barres ou bâtons, axe gradué avec pas, grille légère, petits traits intermédiaires optionnels, nom d'axe, barre allumée, valeurs optionnelles, ligne pointillée « du haut de la barre jusqu'à l'axe »), `Courbe` (points reliés, point allumé + pointillé vers l'axe), `Camembert` (couleurs du coach, parts, étiquettes dehors pour les petites parts, moitié/quart), `Tableau` (tableau à double entrée façon `tableau_donnees`, case/ligne/colonne allumée, cases « ? »), avec des méthodes d'animation simples (faire pousser les barres, allumer, tracer le pointillé). Les autres agents ne MODIFIENT PAS ce module : s'il leur manque quelque chose, ils l'ajoutent dans LEUR script (sous-classe ou fonction locale) et le signalent.

## Règles de fond (rappel, REGLES.md fait foi)
- Voix = écrit : chaque nombre dit est écrit au moment où il est dit ; aucun nombre n'apparaît avant d'être dit (sauf étiquettes et décor redondants).
- On n'ouvre pas sur les maths : situation concrète, un MÉTIER, puis la méthode ; « Ce que tu as appris » à la FIN.
- Pour insister : AGRANDIR puis rétrécir (pas de zoom de caméra).
- CEINTURE affichée (échelle entière) sur la paysage ET le short, selon REGLES.md.
- Lire = sur l'axe gradué : le geste « je pars du haut de la barre, je suis la ligne jusqu'à l'axe » se VOIT (pointillé).
- Paysage = apprendre (méthode, piège, défi avec pause, correction). Short = amuser (jeu, surprise, question en commentaire), vertical 9:16.
- Débit de la voix −10.

## Fichiers, noms, sorties
- CM (une voix commune CM1/CM2, deux rendus) : script `manim/scripts/cm1/stats_<slug>.py` (+ `_short.py`), classes `Stats<Slug>CM1` / `Stats<Slug>CM2` (seule l'identité change : « Maths CM1 — EleveAI » / « Maths CM2 — EleveAI » ; la voix ne cite aucune classe). Sorties : `manim/sorties/cm1/maths/statistiques/<NN>-<slug>/eleveai-maths-cm1-stats-<slug>.mp4` et `…-short.mp4`, idem `cm2`.
  Numéros CM : 01-tableau-lire, 02-tableau-completer, 03-tableau-interpreter, 04-tableau-defi, 05-graphique-lire, 06-graphique-completer, 07-graphique-interpreter, 08-graphique-defi (voix `cm-stats-<slug>.json`).
- 6e : script `manim/scripts/6e/stats_<slug>.py` (+ `_short.py`), classe `Stats<Slug>6e`. Sorties : `manim/sorties/6e/maths/statistiques/<NN>-<slug>/eleveai-maths-6e-stats-<slug>.mp4` et `…-short.mp4`.
  Numéros 6e : 01-lire-tableau, 02-prelever, 03-construire-tableau, 04-enquete-planifier, 05-enquete-mesurer, 06-lire-graphique, 07-lire-circulaire, 08-comparer, 09-interpreter, 10-defi (voix `6e-stats-<slug>.json`).
- Le short d'un épisode CM n'affiche pas la classe : rends-le une fois et copie-le sous les deux noms (cm1 et cm2), comme le fait l'en-tête de proba_probaC_notation.py.
- En-tête de chaque script : épisode, micro du coach, écrans, voix, commandes de rendu exactes, dossier de sortie.
- Voix : génère les mp3 avec `scripts/generer-voix.ps1` (lis son USAGE ; débit −10), au même endroit et sous le même nom que les autres voix de la série (regarde comment les voix `cm1-proba-*` sont rangées).
- Rendu : `python -m manim render -qh --disable_caching <script> <Classe> -o <nom> --media_dir manim/scripts/<dossier>/media-<slug>` (un media_dir par épisode, pour ne pas se marcher dessus).

## Vérifications obligatoires
1. Une PLANCHE PyAV par vidéo (une image toutes les ~3 s, ou une par écran) que tu REGARDES (Read de l'image) : rien ne déborde du cadre, pas de chevauchement, texte lisible (≥ 28 px équivalent), les nombres affichés = ceux de la voix, ceinture présente, figure fidèle au coach.
2. La synchro : chaque écran attend sa voix (`attendre_voix`), aucun nombre affiché avant d'être dit.
3. Durée et taille de chaque mp4 (ffprobe ou PyAV).

## ⛔ Écriture par petits morceaux
Jamais plus de ~150 lignes par Write/Edit : écris un script en plusieurs fois. Des agents se sont figés en écrivant d'énormes blocs. Un rendu peut être long : lance-le en arrière-plan si besoin et ne relance pas en boucle.

## Rapport final (court, en français)
Fichiers créés ; durée de chaque vidéo ; décor et métier ; ceinture ; corrections faites à la voix (avant → après) ; ce que tu as vu sur les planches ; soucis restants.

## ⭐ Le PILOTE est fait (05-graphique-lire, 21/10) : c'est TON MODÈLE
- Scripts modèles : `manim/scripts/cm1/stats_graphique_lire.py` et `stats_graphique_lire_short.py` (calage mot à mot par `*_marques.json` dans le même dossier : reprends le même mécanisme). Lis-les EN ENTIER avant d'écrire.
- Sorties modèles : `manim/sorties/cm1/maths/statistiques/05-graphique-lire/`.
- Ceintures choisies par le pilote : paysage jaune quand il faut lire un petit trait sans nombre ; short blanc. Choisis la tienne selon REGLES.md et justifie-la.
- Les voix WAV de TOUS les épisodes existent déjà dans `public/sons/<nom-voix>/` (débit −10). Si tu corriges une phrase, régénère seulement ce fichier json.
- API de `canvas_stats.py` (NE PAS le modifier) :
```
from canvas_stats import Barres, Courbe, Camembert, Tableau, fr, texte, AMBRE, NUIT
Barres(categories, valeurs, pas, sous_pas=None, maxi=None, mini=0, largeur=7, hauteur=4.2, couleurs=None,
       batons=False, nom_axe=None, titre=None (dans la carte), fs=32, colonne_lue=False, centre=ORIGIN, carte=True)
Courbe(categories, valeurs, pas, ...mêmes paramètres..., couleur=BLEU_COURBE)  → .ligne, .ronds
  Morceaux : .fond (carte, titre, axes, nombres, catégories : à faire apparaître d'abord) .marques/.barres
  .trait(v) .nombre(v) .etiquettes .titre .point(i, v) .y_axe(v)
  Animations : pousser() / tracer() · focus(i, opacite) · allumer(i) · eteindre(i) · estomper(garder) · rallumer()
  Objets à jouer : monter(i) · vers_axe(i, jusqu_au_lu=False) · vers_bas(i) · lu(v) · valeur(i)
Camembert(etiquettes, valeurs, rayon=1.8, couleurs=None, montrer_etiquettes=True, valeurs_parts=False,
          pourcentages=False, total=False, titre=None, centre, fs=30)
  .parts[i] .textes[i] · apparaitre() · focus/allumer/eteindre/estomper/rallumer · sortir(i)/rentrer(i) · moitie() · quarts()
Tableau(entetes, lignes, libelles=None, coin="Données", largeur_case=1.7, largeur_libelle=2.6, hauteur=0.8, fs=30,
        titre=None, centre)  → valeur "?" en orange, None = case vide
  .cases[r][c] .case(r, c) · allumer_case/allumer_ligne/allumer_colonne (listes d'animations) · eteindre() · remplir(r, c, v)
Le module n'ajoute rien à la scène ; il renvoie objets/animations. Utiliser focus(i), jamais allumer(i) et estomper() dans le même play.
```
- Pièges vus par le pilote sur ses planches : textes trop petits ou coupés au bord, chiffres qui débordent d'une carte, étiquettes collées sous les barres, titre qui déborde du short (1080 px de large !), écran vide avant « Ce que tu as appris ». Vérifie-les.
- Un épisode à la fois, rendu au premier plan ou en arrière-plan mais JAMAIS deux rendus simultanés dans ton lot.
