# Brief commun : agents de rendu, série ÉQUATIONS 4e (05/11/2026)

Réponds en français. Lis et applique `manim/brief-agent-puissances.md` EN ENTIER (méthode, voix, ordre obligatoire, « corrige toujours les défauts mineurs », rien à committer, jamais de lecture de vidéo) puis `manim/REGLES.md`. Ce fichier donne les DIFFÉRENCES, qui priment.

⛔ Une autre série (Puissances) se rend sur le même poste, dans le même dossier : ne touche à aucun fichier `manim/scripts/4e/puissance_*` ni à `manim/rapports-puissances.md`. Tu peux les lire comme modèles récents : `puissance_zero_negatif.py` et `puissance_zero_negatif_short.py`.

## Rendu HD : 2 à la fois sur cette série, et jamais sous 2 Go libres
Le verrou unique du brief puissances est REMPLACÉ par deux places propres à cette série. Avant chaque rendu HD :
1. Prends une place : `mkdir "C:/Users/FRED/AppData/Local/Temp/eleveai-equations-hd-1.lock"`, sinon `…-hd-2.lock`. Si les deux sont prises, attends (boucle en arrière-plan, 30 s).
2. Mesure la mémoire libre : `powershell -NoProfile -Command "[math]::Round((Get-CimInstance Win32_OperatingSystem).FreePhysicalMemory/1MB,1)"`. Sous 2 Go, attends en gardant ta place et remesure toutes les 60 s.
3. Libère ta place (`rmdir`) dès la fin du rendu, même en cas d'échec. En cas de `MemoryError` : attends, relance une fois, et dis-le dans ton rapport.

## Noms (épisode NN, slug, Python `<slug_>` = slug avec des underscores)
- Voix validées : `manim/voix/4e-equation-<slug>.json` et `…-<slug>-short.json`. WAV : `public/sons/<nom-de-la-voix>/`.
- Scripts : `manim/scripts/4e/equation_<slug_>.py`, classe `Equation<Slug>4e` ; `manim/scripts/4e/equation_<slug_>_short.py`, classe `Equation<Slug>Short`.
- Sorties : `manim/sorties/4e/maths/equations/NN-<slug>/eleveai-maths-4e-equation-<slug>[-short].mp4`. media_dir : `manim/scripts/4e/media-eq-NN[-short]`.
- Identité « Maths 4e — EleveAI ». Rapport : ajoute ta section à `manim/rapports-equations.md` (sans effacer les autres).

## Épisodes (shorts tous en ceinture blanche)
| NN | slug | micro | ceinture paysage | centres | métier |
|---|---|---|---|---|---|
| 01 | reconnaitre | equation_reconnaitre | blanche | jeux-defis | Salma, conceptrice d'escape games |
| 02 | traduire | equation_traduire | jaune | cinema-series | Camille, monteuse de cinéma |
| 03 | resoudre-simple | equation_resoudre_simple | jaune | animaux, chiens-chats | Marie, vétérinaire |
| 04 | resoudre-reduction | equation_resoudre_reduction | orange | course-trail, sport | Awa, entraîneuse |
| 05 | resoudre-distributivite | equation_resoudre_distributivite | verte | electro-dj, musique | Nathan, DJ |
| 06 | verifier | equation_verifier | orange | espace, sciences | Aïcha, ingénieure du spatial |
| 07 | defi | equation_defi | verte | jeux-defis | Lina, correctrice de manuels |
| 08 | probleme | equation_probleme | verte | nature-ecologie | Yanis, garde forestier |

## Module commun
`manim/scripts/4e/equation_commun.py`, créé par l'agent de l'épisode 01, LECTURE SEULE pour les suivants (ils complètent dans LEUR script et le signalent). Il importe de `manim/scripts/6e/prop_commun.py` ce qui existe, et fournit : l'écriture d'une équation en `Text` avec l'inconnue colorée, le pictogramme métier + prénom écrit, la BALANCE animée (deux plateaux, ce qu'on retire à gauche et à droite, équilibre gardé), et le TABLEAU D'ESSAIS (on essaie x =, on calcule, oui/non).

## Leçons du pilote (épisode 01), à appliquer
- Lis l'en-tête de `equation_commun.py` : `Eq`/`dire_eq`, `Balance`, `TableauEssais`, `Metier`, `question_pause`, `PaysageEq`, `ShortEq`, `self.chrono()` pour tout compte à rebours.
- `Balance` et `transformer()` n'ont été testées que sur une scène d'essai : regarde-les sur TA planche.
- N'utilise jamais `Indicate` sur un objet rempli (les cartes se remplissaient de vert et cachaient le texte). Place les objets avec `.en()`.
- Sur la planche basse déf, regarde AUSSI les instants d'animation, pas seulement les poses : c'est là que se cachent les défauts vus trop tard, qui ont coûté 5 rendus HD au pilote.
- `Eq` plante sur les ligatures « ff » et « fi » (« différence », « fini ») : pour ces mots, utilise `T` dans TON script.
- Si la voix promet une durée (« 3 secondes »), elle doit être vraie à l'écran. Sans changer un mot ni toucher à `public/sons`, insère le silence dans un WAV dérivé sous ton media_dir, et dis-le dans ton rapport.

## Dessins
Code couleur constant : bleu = l'inconnue ; orange = l'opération faite des deux côtés ; vert = juste ; rouge = piège. Les lignes de calcul se TRANSFORMENT l'une en l'autre, le signe = reste aligné verticalement d'une ligne à l'autre. Écran de voix : « 2 x » s'écrit `2x` ; « 2 fois, entre parenthèses, x plus 3 » s'écrit `2(x + 3)` ; la division s'écrit « ÷ », jamais une barre.
- **01** : le coffre et son cadenas qui s'ouvre au bon code ; les 3 écritures, dans lesquelles le signe = et la lettre s'allument ou manquent (croix rouge) ; flèches gauche/droite pour les membres ; essais x = 2 puis x = 3. Short : les écritures arrivent une à une, verdict équation / pas équation avec chrono de 3 s.
- **02** : une timeline de montage (bloc x + bloc 3 min = 11 min) ; le dictionnaire mots → symboles, chaque mot de la phrase s'envole vers son symbole ; 2x − 4 contre 2(x − 4), en barres. Short : course phrase → équation, chrono.
- **03** : balance vétérinaire ; chien + caisse 4 kg = 9 kg ; tortue ; 3 chiots ; 5 chatons (x = 3 barré en rouge, 1,6 en vert). Short : balance avec sac mystère et billes.
- **04** : la boucle de course dessinée ; 2 boucles + 3 boucles qui fusionnent en 5 ; x seul qui montre son 1 ; les t groupés et les nombres groupés par couleur. Short : paquets de cartes qui se regroupent.
- **05** : timeline de DJ (x + 3, deux fois = 14) ; deux routes en deux colonnes, même arrivée x = 4 ; les flèches de distributivité (le 2 vise x et le 3). Short : course de deux élèves, en deux colonnes qui descendent.
- **06** : tableau de contrôle d'une fusée qui passe au vert ; on remplace x (la valeur glisse dans l'équation) ; tableau d'essais pour 3x = 9 ; gauche et droite calculées dans deux cases, avec = ou ≠. Short : détecteur de mensonges avec voyant rouge ou vert.
- **07** : feuille de manuel où Lina entoure l'erreur au stylo rouge ; Léo : 2 + 3 + 4 = 9 barré, le vrai chemin en vert ; x des deux côtés : les termes en x passent d'un seul côté. Short : « Léo a juste et il a tort », grande surprise.
- **08** : la parcelle brûlée qui se replante, 4 rangées d'arbres + 6 arbres restants ; les 4 étapes (nommer, traduire, résoudre, répondre) en repères qui s'allument et restent visibles ; l'enclos rectangulaire dont chaque côté porte x ou 2 x ; deux pépinières côte à côte avec leurs prix ; les nichoirs de Yanis et d'Inès en barres. Short : le tour de magie, la « pensée » qui se dévoile en équation.

## Épisode 08 : fin des vidéos NOUVELLE
Ses voix suivent la règle du 05/11 en tête de `manim/REGLES.md`. Dans TON script (sans toucher au module), l'écran de fin écrit ce que dit la voix : « Entraîne-toi sur » + « eleveai.fr » encadré, « Abonne-toi ! » + « @eleveai974 », et « Un pouce · Un commentaire · La cloche » (paysage) ou « Un pouce · La cloche » (short). Mesure la durée exacte de la phrase de fin de chaque vidéo et écris-la dans ton rapport : elle servira à recaler `COUPE_FIN`. Ne touche pas à `components/LecteurVideo.tsx`.

## Rapport final
Ta réponse à la session principale tient en 10 lignes au plus (fichiers, durées, bords, soucis) : tout le détail (questions, chapitres, centres) va dans `manim/rapports-equations.md`.
