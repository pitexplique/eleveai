# REPRISE — série « GÉOMÉTRIE DANS L'ESPACE », terminale spé (22/11/2026)

**12 épisodes = les 12 micro-compétences du coach**, 6 pour `geometrie_espace` et 6 pour
`produit_scalaire_espace`. Chacun : une vidéo paysage + un short. 24 vidéos.

> ✅ **LES NEUF ÉPISODES RENDUS SONT DANS LE REGISTRE DEPUIS LE 23/11/2026.**
> Ils n'y étaient pas : mesuré le 22/11, **0 entrée `espace` dans
> `manim/manifeste-youtube.json`** sur 1 707 vidéos. Neuf vidéos existaient en HD et
> n'atteignaient personne — et rien nulle part ne le signalait.
> ⛔ **On ne recopie plus une entrée à la main** :
> `python -X utf8 manim/poste2/fiches-espace-vers-registre.py --ecrire` fait le report
> depuis `FICHES-YOUTUBE-espace-terminale.md`, qui reste la source RÉDIGÉE (titre,
> accroche, chapitres). Il va chercher la lettre et l'instant de chaque question-pause
> dans le JOURNAL DU RENDU HD et le texte des questions dans la VOIX, et il **refuse
> d'écrire** si la voix, l'écran rendu et la table du `.md` ne disent pas la même lettre
> (contrôlé : les 18 questions des neuf épisodes sont d'accord).
> ⚠️ Une liste tenue à la main à côté d'un registre, c'est l'accident déjà arrivé trois
> fois dans ce dépôt — des pages en ligne que rien ne déclarait. Le registre est partagé
> et se commit **par clés** (`manim/outils-commit-cles.py`).
>
> ⛔⛔ **CE QUI BLOQUE ENCORE LA PUBLICATION : LES MINIATURES.** Zéro sur douze. Le
> chemin `…/<slug>.png` est déclaré dans chaque entrée, et le fichier n'existe pas.
> Tant qu'elles manquent, `publier-youtube.mjs` ne peut pas publier, donc
> `brancher-videos-coach.mjs` continue de répondre « Rien à brancher » : **les neuf
> vidéos n'atteignent toujours aucun élève.** Le goulot a changé de nature, il n'a pas
> disparu — et il ne se décide pas tout seul (une miniature est une image à faire).

> ⭐ Cette note est **vivante** : on y ajoute ce qui a coûté cher, pas ce qui a marché.
> Elle est à la série « espace » ce que `manim/REPRISE-entiers-cm1-6e.md` est aux entiers.
> ⛔ Lire celle des entiers AUSSI : ses 43 pièges valent ici, cette note ne les répète pas.

---

## Où en est la série

| pièce | état |
|---|---|
| les 12 voix | ✅ écrites, validées par Frédéric, passe maths **exécutée** |
| les 180 WAV + 12 fichiers de marques | ✅ faits (**10 278** marques mesurées, 71 min de voix) |
| la boîte à outils de dessin | ✅ `manim/poste2/espace3d.py` + sa planche |
| le socle d'écran | ✅ `manim/poste2/espace_ecrans.py` — + `systeme`, `ligne_param`, `choix3`, `au_fin`, `trip(par=True)` (épisode 3) |
| E1 `espace_vecteurs` | ✅ **HD livré** (5 min 02, 0 bord, planche HD regardée) — ⭐ REFAIT le 22/11 avec les flèches |
| E2 `espace_repere_coordonnees` | ✅ **HD livré** (5 min 54, 0 bord, planche HD regardée) — ⭐ REFAIT le 22/11 avec les flèches |
| E3 `espace_droite_parametrique` | ✅ **HD livré** (5 min 56, 0 bord, planche HD regardée) — ⭐ REFAIT le 22/11 avec les flèches |
| E4 `espace_plan_equation` | ✅ **HD livré** (6 min 09, 0 bord, planche HD regardée) — il ne nomme aucun vecteur |
| E5 `espace_position_relative` | ✅ **HD livré** (6 min 34, 0 bord, planche HD regardée) — il ne nomme aucun vecteur |
| E6 `espace_defi` | ✅ **HD livré** (6 min 49, 0 bord, planche HD regardée) — ⭐ REFAIT le 22/11 avec les flèches |
| E7 `ps_espace_calculer` | ✅ **HD livré** (6 min 33, 0 bord, planche HD regardée) — ⭐ le premier AVEC les flèches |
| E8 `ps_espace_orthogonalite` | ✅ **HD livré** (7 min 00, 0 bord, planche HD regardée) — ⭐ deux plans qui se projetteraient sur une LAME |
| E9 `ps_espace_norme_distance` | ✅ **HD livré** (6 min 08, 0 bord, planche HD regardée) — ⭐ le glyphe √ n'a PAS de barre |
| E10 `ps_espace_angle` | ✅ **HD livré** (6 min 35, 0 bord, planche HD regardée) — ⭐⭐ aucune figure d'angle en cavalière |
| ⭐⭐ **le cube** | **RE-RENDU des 5 épisodes livrés qui le dessinent** (E2, E6, E7, E8, E9) : il lui manquait l'arête [E H] |
| ✅ **la notation vectorielle** | **faite sur les 9 scripts** : `auditer-fleches-vecteurs.py` → 0 nu (voir « LA PASSE DES FLÈCHES ») |
| les 2 autres scripts | ⏳ **E11 et E12, à écrire — ils ne dépendent plus de rien** |
| les 12 shorts | ⏳ pas de voix encore |
| les 10 entrées de registre | ✅ **écrites le 23/11** dans `manim/manifeste-youtube.json` (1 717 vidéos), chacune avec ses 14 chapitres et ses 2 questions-pauses, par `manim/poste2/fiches-espace-vers-registre.py` |
| les 12 miniatures | ⛔ **0 sur 12** — c'est ce qui bloque la publication, et donc le coach |
| les rendus HD, le branchement coach, les fiches YouTube | ⏳ |

**Ce qui débloque tout** : un épisode ne dépend plus que de son script Manim. Son fichier de
marques est déjà dans `manim/scripts/terminale/<script>_marques.json`, sa voix dans
`manim/voix/terminale-<…>.json`, ses WAV dans `public/sons/terminale-<…>/`.

---

## 🔁 La relève — ce qu'il faut savoir pour reprendre la série

*(écrit le 22/11/2026 par la session qui a produit E1 et E2, tenu à jour par celles de E3
puis de E6 — règle de Frédéric : une seule productrice par série, relève à 65 %.)*

**L'état exact**, vérifiable en trois commandes :

```
git log --oneline poste2 | head -12                  # 12 commits de la série
ls manim/sorties/terminale/maths/geometrie/*/*.mp4   # les HD livrés
python manim/poste2/verifier-voix-espace.py          # 12 voix, 15 clips, lettres A 8 B 8 C 8
```

**Le prochain geste** : écrire `ps_espace_plan_normal.py` (E11), puis `ps_espace_defi.py`
(E12). ⭐ Le modèle est maintenant **`ps_espace_angle.py` (E10)** et sa mesure
`manim/poste2/mesure-ps-espace-angle.py`, qui porte la chaîne complète de `dessous()`
sur toute une colonne — le contrôle qui manquait à tous les précédents. ⭐ Le modèle est maintenant
**`ps_espace_norme_distance.py` (E9)**, et sa mesure
`manim/poste2/mesure-ps-espace-norme-distance.py` porte TROIS contrôles que les
précédentes n'avaient pas : les **étiquettes comparées deux à deux** (E8), la **pointe
d'une flèche testée dans le polygone de son plan** (E8), et surtout
**`loin_des_fleches()`** — une étiquette comparée au FÛT de tout segment tracé, qui a
trouvé deux noms de sommet barrés par la grande diagonale du cube.
⭐⭐ **E10 écrit « 1 sur racine de 3 » et « racine de 2 » : il emploie
`EcransEspace.racine()`, neuf dans le socle, et n'en réécrit pas une.** Le glyphe √ se
rend mais **il n'a aucune barre** — détail dans « Ce que l'épisode 9 a appris ».
✅ Les 2 cues « 577 » de `ps_espace_angle` sont RÉGLÉES (23/11) : ce n'était pas
un défaut. « 577 » n'apparaît qu'une fois dans le texte, WinRT en a émis trois, et le
convertisseur garde la bonne en sautant les deux autres sans avancer. Détail et
conséquence pour E11/E12 : « Ce que l'épisode 10 a appris ».
✅ **La reprise des flèches est FAITE** (22/11) : E1, E2, E3 et E6 portent la notation
vectorielle et sont re-rendus en HD. `python -X utf8 manim/poste2/auditer-fleches-vecteurs.py`
doit rester à **0 NU sur tous les scripts** — c'est le contrôle à relancer après chaque
épisode écrit. ⛔ Lire « LA PASSE DES FLÈCHES » plus bas AVANT d'écrire un écran qui
nomme un vecteur : la flèche grandit les blocs, et elle a cassé trois figures et un bloc
de cartes sur des épisodes qui étaient propres.

Pour écrire E10, tout l'attend — sa voix dans
`manim/poste2/VOIX-espace-terminale.md`, ses WAV, ses marques, et un socle complet :
`systeme`, `ligne_param`, `eq_plan`, `eq_zero`, `choix2`, `choix3`, `au_fin`,
`trip(par=True)`, `q_tete(largeur, xl)`, et — dans `espace3d.py` — `platitude()`,
`plan_dessine()` et le cube.
⭐ Le modèle le plus propre est maintenant **`ps_espace_calculer.py` (E7)** : c'est le
seul qui porte la notation fléchée (`self.vec`, `self.vexpr`) et sa mesure
(`mesure-ps-espace-calculer.py`) est la seule qui signale une réduction PAR UN PLAFOND
et qui compare la colonne de droite au TITRE. `espace_defi.py` (E6) reste bon pour tout
le reste : quinze écrans,
chaque `sans_audit` porte sa raison, chaque cote vient d'une COMMANDE
(`manim/poste2/mesure-espace-defi.py`, à recopier pour E7), et chaque correction d'image
est commentée à l'endroit où elle a été payée. `espace_position_relative.py` (E5) reste
le modèle pour tout ce qui touche aux plans.
⛔ Lire d'abord « Ce que l'épisode 5 a appris » et « Ce que l'épisode 6 a appris » plus
bas (puis celles de E3 et E4) : ensemble elles disent où regarder en premier, et ce
qu'aucun outil ne voit. ⭐ Celle de E6 est la plus utile, parce que **deux de ses défauts
sont dans les OUTILS** et touchent donc les six épisodes qui restent : le convertisseur de
marques perdait les décimales répétées, et `col()` rapetisse un bloc pour une raison qui
n'a rien à voir avec sa largeur.
✅ Les 2 cues « 577 » de `ps_espace_angle` sont RÉGLÉES (23/11) : ce n'était pas
un défaut. « 577 » n'apparaît qu'une fois dans le texte, WinRT en a émis trois, et le
convertisseur garde la bonne en sautant les deux autres sans avancer. Détail et
conséquence pour E11/E12 : « Ce que l'épisode 10 a appris ».
✅ Les 13 de `espace_defi` l'étaient déjà, à la source.

**L'ordre pour chaque épisode, sans en sauter un :**

1. lire la voix du `.md` et poser un écran par clip — ⭐ et **tout nom de vecteur passe
   par `self.vec` / `self.vexpr` dès l'écriture** : `auditer-fleches-vecteurs.py` doit
   rester à 0 NU, et reprendre un épisode après coup coûte un rendu HD de plus ;
2. `python manim/poste2/verifier-avant-rendu.py <script.py> <Scene>` → **0 problème**
   (il attrape les `au_mot` sans marque, qui sont la moitié du travail) ;
3. dry run `AUDIT=1 BORDS=1 … --dry_run` → **0 `BORD`**, et **un seul `AUDIT-ABSENT`**,
   celui de `@eleveai974` que l'épisode publié porte aussi ;
4. rendu `-ql`, **planche ET gros plans**, et on corrige jusqu'à ce que l'image soit
   propre (compter 3 à 4 tours : j'en ai fait 4 sur E1, 2 sur E2) ;
5. HD sous le verrou (`bash manim/poste2/4e_hd.sh <script.py> <Scene> <nom> <media_dir>
   <dossier-sortie>`), puis planche du HD ;
6. l'entrée de manifeste dans `manim/poste2/FICHES-YOUTUBE-espace-terminale.md`.

**Ce qui n'est PAS fait et qu'on oublie facilement :**

- les **miniatures** : aucune des 12 n'existe, et le manifeste en attend une ;
- les **12 shorts** : pas de voix écrite, et leur gabarit se relit sur un short de
  terminale existant **avant** d'en écrire douze ;
- le **branchement au coach** vient APRÈS la publication — mesuré :
  `brancher-videos-coach.mjs --classe terminale-spe` répond « Rien à brancher » tant que
  la vidéo n'est pas en ligne ;
- ✅ les 2 cues « 577 » de `ps_espace_angle` sont réglées : ce n'était pas un défaut
  (voir « Ce que l'épisode 10 a appris »). ✅ Les **13** de `espace_defi` ne sont plus un
  problème : elles venaient d'un défaut du convertisseur, corrigé le 22/11 (voir « Ce que
  l'épisode 6 a appris »).

**Ce qu'il ne faut pas refaire :**

- ⛔ ne pas écrire les 11 scripts en parallèle. Le verrou HD est unique — on gagnerait
  l'écriture, pas le rendu — et surtout personne ne regarderait onze épisodes à l'image.
- ⛔ ne pas toucher `scripts/cues2marques.py` (le commun) : d'autres séries s'en servent.
- ⛔ ne pas « corriger » les trois faux positifs de la section plus haut.

---

## La chaîne, dans l'ordre, avec les pièges de chaque étape

### 1. La voix — ⛔ on ne touche QUE le `.md`

`manim/poste2/VOIX-espace-terminale.md` est la source de vérité. Les JSON en sont **extraits**
(`python manim/poste2/voix-espace-depuis-md.py --tout`). Corriger un JSON à la main, c'est
perdre la correction à la prochaine extraction.

```
python manim/poste2/verifier-voix-espace.py          # gabarit, symboles, lettres, souffle
python manim/poste2/controler-maths-voix-espace.py   # ⭐⭐ la passe MATHS, recalculée
```

⭐⭐ **La passe maths est un SCRIPT, pas une relecture.** Chaque nombre dit par les voix est
réécrit en calcul et comparé. C'est la réponse à la voix validée des entiers qui disait
« 6 032 a 3 centaines » dans un clip de correction — une erreur qui aurait été *enseignée*.

⛔ **Un « oui » de Frédéric valide le ton, pas l'arithmétique, et pas la place des lettres.**

### 2. Les WAV et les marques

```
bash manim/poste2/voix-espace-tous-les-wav.sh     # les 12, saute ce qui existe
```

- ⚠️ **`-Debit -6` aux DEUX étapes.** `generer-voix.ps1` a pour défaut `-18`,
  `marques_dump.ps1` `-10`. Deux débits différents = des marques qui datent une AUTRE voix
  que le WAV : tous les `au_mot` glissent, et **aucun outil ne le dit**.
- ⚠️ `-Hauteur 6` est le défaut des deux : ne pas y toucher.
- ⛔ **On passe par `manim/poste2/cues2marques-espace.py`, pas par le convertisseur commun.**
  `scripts/cues2marques.py` jette toute cue dont le texte répète la précédente. Mesuré sur
  E1 : 30 cues « nombre + mot » (`2 moins`, `4 égale`) arrivent par paires jumelles à
  0,14–0,36 s — celles-là, il faut bien les jeter ; mais **5 cues identiques consécutives
  sont des jetons simples** (`0`,`0` dans « 0, 0, 5 ») et ce sont de vrais mots. Le commun en
  perdait 20 sur E1. ⛔ Ne pas modifier le commun : d'autres séries ont peut-être de vrais
  doublons, à mesurer chez elles.
- ⚠️ `marques_dump.ps1` écrit son JSON **avec un BOM** ; le convertisseur le relit en
  `utf-8-sig` et réécrit sans BOM. C'est aussi pour ça que la dernière étape existe.

### 3. Le script Manim

Modèle : **`manim/scripts/terminale/espace_vecteurs.py`** (E1), lui-même recopié de
`convexite_derivee_seconde.py`. Gabarit : 15 clips, un écran par clip.

Les figures viennent de **`manim/poste2/espace3d.py`** (cavalière 2D) :

```python
sys.path.insert(3, str(Path(__file__).resolve().parents[2] / "poste2"))   # ⚠️ parents[2]
from espace3d import Repere3D, C_VECTEUR, C_PLAN, …
```

⛔ **Pas de `ThreeDScene`.** Il n'y en a aucune dans le dépôt, et surtout : **le coach montre
la même projection** (`lib/canvas/Repere3dCanvas.tsx`). Un élève qui voit la vidéo puis ouvre
sa question doit retrouver le même dessin.

### 4. Les contrôles, et leur moment

| Outil | Quand | Ce qu'il attrape |
|---|---|---|
| `manim/poste2/verifier-avant-rendu.py <script.py> <Scene>` | **avant le dry run** | un `au_mot` sans marque à son offset exact, une question qui n'est pas dans la voix mot pour mot |
| `AUDIT=1 BORDS=1 … --dry_run` | **avant le `-ql`** | un nombre affiché que la voix ne dit pas, un objet hors de la marge de 3 % |
| `scripts/planche-video.py` **+** `manim/poste2/apercu-instants.py` | **sur le `-ql`, avant le HD** | ce qui est réellement affiché — et **rien d'autre ne le voit** |
| un **recadrage PIL ×2,5 à ×3** sur la figure de l'épisode | **sur le `-ql`, après la planche** | ce qu'une vignette à trois colonnes ne montre pas : sur E5, deux défauts de la figure du pont, dont « la route ne passe sous le pont nulle part » ; sur E6, les trois axes couchés sur les arêtes du cube et le « y » planté dedans |
| `python -X utf8 manim/poste2/auditer-fleches-vecteurs.py` | **après chaque écran écrit** | un nom de vecteur écrit à plat (« u · v », « A G »), dans les textes d'écran comme dans les cartes de choix. ⛔ Il lit l'AST : un `grep` du glyphe « ⃗ » répond « non » même quand tout est juste, la flèche étant DESSINÉE. Le détail de ce qu'il ne voit pas est en tête du fichier |
| `mesure-espace-vecteurs.py`, `-repere-coordonnees.py`, `-droite-parametrique.py`, `-defi-fleches.py` | **avant tout re-rendu** | les cotes des blocs qui portent une notation vectorielle, **comparées à un TÉMOIN** (`--sans-fleches`) : sans cette comparaison on lit l'état et on croit lire un diff |
| `manim/poste2/mesure-espace-defi.py` (à recopier par épisode) | **avant même le premier dry run** | un bloc RÉTRÉCI par `col()` ou `gauche()`, ou posé hors de la marge de 3 % — onze sur E6, dont le tableau des huit sommets tombé à 21 px. ⛔ Rien d'autre ne le voit : le dry run est propre, et à la planche un texte deux fois trop petit ne « saute » pas aux yeux |

⛔⛔ **PLANCHE *ET* GROS PLANS, jamais la planche seule.** `planche-video.py` prend la
**dernière image** de chaque écran : tout ce qui est recouvert à la fin y est invisible.
Deux colonnes de calcul traversaient les axes du repère sur E1 ; la planche était
propre, et `apercu-instants.py` sur les écrans de réponse les a montrées tout de suite.
⭐ Les instants à regarder, toujours : les clips `04b`, `07b` et `09b` (les explications
arrivent par-dessus une figure déjà là).

---

## ⛔⛔ Ce que les outils n'ont PAS vu sur E1

Sept défauts, tous trouvés **en regardant l'image**, aucun signalé par un outil :

1. **`q_reponse(cartes, bonne, None, None)`** → « Mets pause, et choisis ! » et le compte à
   rebours restaient affichés **par-dessus toute l'explication**. Il faut passer `pause` et
   `rebours` : c'est `q_reponse` qui les efface. ⭐ Donc on mémorise les cinq objets de
   `q_tete`, pas trois.
2. **Le glyphe `⚠` ne se rend pas** : un carré « tofu » avec son code hexa dedans. On
   **dessine** le triangle (`Triangle` + `Text("!")`), on ne le tape pas.
3. **Une phrase posée sur l'échelle des ceintures** en page de garde (elle occupe
   y ∈ [−3,45 ; −2,8]), puis, remontée, posée sur les légendes des figures. La bande libre
   est **y ≈ −2,0**.
4. **Des cartes de choix réduites à ~10 px** : une phrase longue dans une carte de 4,1 de
   large passe par `scale_to_fit_width`. ⭐ Écrire le choix sur **deux lignes** à 28 px
   plutôt que le laisser rétrécir — et ⛔ ne pas raccourcir le texte, la voix le dit mot
   pour mot.
5. **Un `SurroundingRectangle` posé sur un GLYPHE** : `trip(...)[0]` était le signe moins, pas
   la première coordonnée. ⭐ `trip()` rend maintenant les trois nombres séparés (`g.nb[i]`).
6. **Une colonne de calcul qui traverse les axes du repère** (04b, 07b) : posée à x = −6,2,
   elle allait jusqu'à l'origine du repère. ⭐ `self.gauche(mob, y, xmax)` mesure le bord
   droit et réduit. ⚠️ **La planche ne le montrait pas** : elle prend la DERNIÈRE image de
   chaque écran, où d'autres objets recouvrent la collision. Il a fallu
   `apercu-instants.py` sur les écrans de réponse.
7. **Une étiquette hors de l'écran** à x = −7,1 (la marge s'arrête à −6,68) : centrée sous un
   personnage posé à −5,6. Le texte est simplement coupé, sans un mot.

⚠️ **Et un titre `to_edge(UP, buff=0.4)` atteint y = 3,6**, au-delà de la marge de 3 %
(3,573). `buff=0.5`. Ça seul expliquait 24 des 28 lignes `BORD` du premier dry run.

---

## ⛔⛔ Ce que l'épisode 3 a appris — à lire AVANT d'écrire l'épisode 4

### ⭐⭐ Un triplet posé à son PREMIER mot met son dernier nombre à l'écran avant qu'il soit dit

Premier dry run de E3 : **40 `AUDIT-AVANCE`, dont 35 de cette seule cause**, et **aucun ne
dépassait 1,9 s** — donc aucun ne sautait aux yeux. « 1, 2, 0 » se dit en 0,8 s, « x égale
1 plus 2 t » en 1,1 s : posés à leur premier mot, le « 0 » et le « 2t » sont affichés avant
d'être prononcés. C'est le piège n° 6 de la série des entiers (« une ligne qui finit par un
nombre se pose à l'instant de CE nombre »), transposé au triplet.

⭐ Le socle a maintenant **`self.au_fin("…")`** : il attend la **dernière marque DANS
l'extrait**. `verifier-avant-rendu.py` le connaît et mesure son seuil de 0,6 s sur la fin.
Après bascule : **1 `AUDIT-AVANCE`**, structurel (un choix de question en toutes lettres,
affiché dès son premier mot pour qu'on puisse le LIRE en l'écoutant — `q_montrer_choix` ne
retarde que les triplets, jamais les phrases).

⚠️ Effet de bord : `au_fin` rapproche l'ancre suivante, et le garde-fou de 0,6 s crie. Deux
fois sur E3 la voix ne laissait que 0,20 s et 0,35 s — remède du piège n° 6 : **ne pas
appeler `au_mot` pour la ligne suivante, on enchaîne**, sa propre synchro la cale.

### ⛔ L'audit travaille CLIP PAR CLIP : un RAPPEL lui est invisible

Les écrans 03, 06 et 07 **relisent** le système écrit à l'écran 02. La voix de ces clips dit
« dans ces trois lignes », « le système de tout à l'heure », sans redire un nombre : **12
`AUDIT-ABSENT` légitimes de son point de vue, faux du nôtre**. Remède : `sans_audit` sur le
rappel, **avec la raison écrite à côté**.
⛔ Ce n'est PAS l'excuse des cinq vrais `ABSENT` de l'épisode 1 : là-bas, les nombres (les
coordonnées d'un drone) n'étaient dits **nulle part** dans l'épisode.

### ⛔⛔ `grep "^AUDIT-…"` SOUS-COMPTE : les signalements tombent sur les barres de progression

Manim écrit ses `tqdm` sur la même ligne. Mesuré sur E3 : `grep -c "^AUDIT-ABSENT"` répond
**9**, la vraie sortie en porte **13** ; `^AUDIT-AVANCE` répond **20**, il y en a **40**.
Et l'`AUDIT-ABSENT` de `@eleveai974` — celui qu'on doit justement retrouver — était l'un des
invisibles. ⭐ **Compter avec `grep -o "<motif>" <log> | wc -l`, jamais avec `^`.**
C'est la même leçon que le `head` et le `tail -1` de la journée du 22 : un zéro se vérifie.

### ⚠️ Un gros `AUDIT-TARD` peut CACHER un petit `AUDIT-AVANCE`

L'audit ne compare l'avance qu'à la **première** occurrence du nombre dans le clip ; pour un
chiffre répété, il rend un `TARD` mesuré sur l'occurrence **précédente**. Un `TARD` de 12 s
sur « 4 » veut donc dire « l'audit a pris le 4 d'une autre phrase » — et il peut recouvrir
un affichage réellement en avance sur SA propre occurrence. Cinq de ces cas ont été trouvés
sur E3 en relisant à la main les plus gros `TARD` (jusqu'à 1,9 s d'avance réelle).

### ⚠️ En `-ql` (15 ips), un `AVANCE` de 0,06 s est un artefact de quantification

Une attente se cale sur une image, et une image dure 0,067 s à 15 ips. Le même script mesuré
en `-qh` (60 ips) : l'`AVANCE` disparaît. ⭐ **Le dry run qui compte est celui de la
résolution livrée** — et un dry run `-qh` ne coûte rien, il n'écrit aucune image.

### ⭐⭐ La capacité RÉELLE de la colonne de droite, mesurée SANS rendre

`q_tete` n'utilise pas le renderer : on peut l'appeler sur `EcransEspace.__new__(EcransEspace)`
et lire les bords au centième. Fait avant d'écrire l'écran 07 ; voilà les chiffres.

| mesure | valeur |
|---|---|
| boîte de Ti-Margo à `scale=0.5` | x ∈ [5,54 ; 6,66], y ∈ [−3,55 ; **−2,15**] |
| largeur offerte au texte d'une carte (`largeur=4.1`) | **2,95** — soit ~14 caractères à 28 px |
| cartes à 3 lignes + question à **3** lignes | bas des cartes **−2,27** ⛔ coupe la tête de Ti-Margo |
| cartes à 3 lignes + question à **2** lignes, bloc LARGE (7,25) | bas des cartes **−1,73** ✅ |
| cartes à 3 lignes + question à **2** lignes, bloc ÉTROIT (5,0) | bas des cartes **−2,07** ✅ de justesse |

⛔⛔ **Et les deux dernières lignes sont la vraie leçon : RÉTRÉCIR la question DESCEND les
cartes.** `col()` réduit le bloc à la largeur de sa plus longue ligne ; un bloc moins large
est moins réduit, donc plus HAUT, et tout ce qui est accroché dessous descend d'autant. En
corrigeant la question à 19 px (défaut n° 3 ci-dessous), le bas des cartes est passé de
−1,73 à −2,07 — et le commentaire du script, lui, annonçait toujours −1,73. ⭐ **Toute
mesure de cet écran se refait après CHAQUE changement de la question**, y compris quand on
ne touche qu'à sa police ou à ses mots.

⭐ D'où `choix3` dans le socle : « coordonnée ne suit pas » seule fait 4,54 de large, donc sur
DEUX lignes la carte la ramenait à 15 px (le défaut n° 4 de l'épisode 1). Sur trois lignes de
14 caractères, elle tient à ~20 px. ⛔ Et on ne raccourcit pas le texte : la voix le dit.

### ⛔⛔ Les quatre défauts que SEULE la planche a vus (aucun outil, aucun dry run)

1. **La correction s'écrivait par-dessus les données du défi.** `ecran_correction` effaçait la
   consigne et la pause, mais pas les deux lignes `A 2 ; 0 ; 1` / `B 2 ; 3 ; −1` : trois textes
   empilés au même endroit. ⭐ Elles ne doivent PAS s'effacer (ce sont les données de
   l'exercice) — c'est la correction qui descend. ⚠️ **Tout écran de correction hérite de
   l'écran de défi : lister ce qui reste avant de poser quoi que ce soit.**
2. **`4 ; −2 ; 6 = 2 × 2 ; −1 ; 3` se lit « 2 × 2 ».** Un triplet MULTIPLIÉ veut ses
   parenthèses : `trip(..., par=True)`. ⛔ Aucun audit ne peut le voir — les nombres affichés
   sont exactement ceux que la voix dit.
3. **Une question à 19 px.** `col()` réduit le bloc entier à la largeur de sa ligne la plus
   longue : « Le point C de coordonnées » + le triplet font 7,25, donc tout tombait à 0,61.
   Écrit **`C 7 ; −1 ; 10`** — la notation que l'épisode emploie déjà sur huit autres écrans —
   c'est 5,0 de large, donc 28 px.
4. **La CONCLUSION d'un écran devenue son plus petit texte.** Le second garde-fou de `col()`
   rétrécit à 3,1 tout ce qui descend sous y = −1,95 en dépassant x = 5,3 (il protège
   Ti-Margo). « B est bien sur la droite d » y est passé. ⭐ **Le bas de la colonne de droite
   est réservé aux lignes COURTES ; une conclusion va à gauche, sous le repère, en grand.**

---

## ⚠️ Ce que l'épisode 4 a confirmé (22/11/2026)

Rien de neuf dans les causes : **les six défauts de E4 étaient tous des répétitions** de ce
que les épisodes 1 et 3 avaient déjà payé. C'est en soi le résultat — la liste tient, il
suffit de la relire AVANT d'écrire, et pas après le rendu.

| Ce qui a été vu à l'image, sur E4 | Où c'était déjà écrit |
|---|---|
| trois lignes de calcul traversant le repère et le plan (écran 04b) | défaut n° 6 de E1 |
| « x et z sont libres » posé SUR la carte C (écran 07b) | défaut n° 1 de E3 |
| un garde-fou de bord appelé APRÈS le `play` qu'il devait protéger (écran 01) | défaut n° 7 de E1 |
| un `SurroundingRectangle` dont le buff déborde la colonne que `col()` venait de borner | nouveau — **et il frappe des DEUX côtés** : `col()` comme `gauche()` bornent le TEXTE, pas le cadre. ⭐ On pose le GROUPE texte + cadre |
| un morceau de plan centré sur un COIN : le point B tombait pile sur son bord, avec son étiquette | nouveau — ⭐ centrer le morceau sur le MILIEU des points qu'il doit contenir |
| une casquette dont la visière partait du MILIEU du visage, et une barbe de la couleur de la peau | piège n° 17 des entiers, deux fois dans le même dessin |

⭐⭐ **Et la seule leçon vraiment neuve : un personnage ne se juge qu'EN GRAND.** Sur la
planche à trois colonnes, Jean-Bernard paraissait correct ; agrandi 2,4 fois, la visière
lui barrait la figure, la barbe faisait un second menton et les carreaux de sa chemise
faisaient une fenêtre. ⛔ **Chaque épisode a son personnage, et aucun n'avait jamais été
regardé de près.** Le recadrage coûte trois lignes de PIL sur une image déjà extraite :

```
im.crop((0, h*0.08, w*0.34, h*0.72)).resize(…, Image.LANCZOS)
```

✅ Confirmé aussi, pour la troisième fois : un `AUDIT-AVANCE` de **0,07 s** en `-ql`
disparaît en `-qh` — c'est la quantification à 15 images par seconde, pas un défaut.

---

## ⛔⛔ Ce que l'épisode 5 a appris — à lire AVANT d'écrire l'épisode 6

Cinq des huit défauts étaient **neufs**, et deux d'entre eux étaient dans les OUTILS, pas
dans l'épisode : ils attendaient simplement qu'un épisode les réveille.

### ⭐⭐ UN PLAN PEUT SE PROJETER SUR UNE DROITE — et rien ne le dit

La cavalière envoie (x ; y ; z) sur (x + 0,41 y ; z + 0,287 y). Elle écrase donc
**exactement une direction**, celle qui part sur (0 ; 0) :

> `NOYAU = (−0,41 ; 1 ; −0,287)` — c'est maintenant dans `espace3d.py`.

Tout plan qui CONTIENT cette direction se dessine comme une lame, et un plan qui la
contient exactement se dessine comme un **trait**. Mesuré sur les quatre plans de E5 :

| normale | angle au noyau | épaisseur projetée | à l'écran |
|---|---|---|---|
| (1 ; 1 ; −1) | 26,9° | 0,40 | ✅ un morceau de plan |
| (0 ; 0 ; 1) | 14,9° | 0,34 | ✅ le sol |
| (1 ; 1 ; 1) | **9,0°** | 0,13 | ⛔ deux lames qu'on prend pour du papier de champ |
| (1 ; 1 ; 2) | **0,4°** | **0,01** | ⛔⛔ un trait qu'on prend pour une seconde droite |

⛔ Et on ne choisit PAS l'équation : c'est la voix qui la dicte. Agrandir `demi` n'arrange
rien (l'épaisseur grandit comme la longueur), et le choix de u1/u2 non plus — la
projection d'un plan ne dépend que du plan.
⭐ Deux outils neufs dans `espace3d.py` : **`platitude(normale)`** rend l'angle, à
appeler AVANT de poser un morceau de plan ; **`plan_dessine()`** rend un plan à plat,
en parallélogramme, comme un manuel. ⛔ `plan_dessine` ne va JAMAIS dans un repère :
posé à côté d'axes, il se lirait comme un morceau de plan DU repère, et il serait faux.
⭐ Sur E5, les écrans 05 (deux plans parallèles) et 09b (droite parallèle à un plan) ont
donc perdu leur repère et gagné un schéma — et ils sont devenus les plus lisibles de
l'épisode.

### ⭐⭐ Une carte de choix plafonne à 14,6 px : c'est la LARGEUR qui décide, pas la police

`carte_choix` réduit le GROUPE rond + lettre + corps pour le faire tenir dans
`largeur − 1,15`. Le rond, lui, ne rétrécit pas de bon cœur : une carte de 4,1 n'offre
donc que **2,20** à son texte. Mesuré hors rendu, pour un choix de quatre lignes :

| police demandée | 24 | 26 | 28 | 30 |
|---|---|---|---|---|
| police OBTENUE | 14,6 | 14,9 | 15,1 | 15,3 |

⛔ Augmenter la police ne change **rien** — et c'est le défaut n° 4 de l'épisode 1
(« des cartes à 10 px ») sous une autre forme. L'épisode 3 l'avait contourné en coupant
en trois lignes de 14 caractères ; E5 ne pouvait pas : sa voix dit « la droite est
parallèle au plan, sans aucun point commun », 56 caractères qu'on ne raccourcit pas.
⭐ `q_tete(question, choix, largeur=6.0, xl=0.6)` : la colonne de cartes va de x = 0,6 à
6,6, offre **4,10** au texte, et les trois choix tiennent à **26 px sans aucune
réduction** — le plus lisible des cinq épisodes. ⚠️ La donnée de gauche doit alors
s'arrêter avant x = 0,4 (`gauche(..., xmax=0.2)`), et la place de l'écran de RÉPONSE se
recompte en entier, du bas vers le haut.

### ⛔ Le battement de la carte gagnante SORT du cadre dès que la carte est large

`q_reponse` faisait `scale(1.12)` autour du centre. Pour une carte de 6,0 centrée en
x = 3,6, le bord droit part à **6,96** — au-delà de la marge (6,68), et le dry run l'a
signalé deux fois. Les cartes de 4,1 des épisodes 1 à 4 y échappaient de justesse
(6,55) : un défaut qui dormait depuis quatre épisodes. ⭐ Le facteur est maintenant
borné sur les deux bords, et s'il ne reste plus de place, on ne bat pas.

### ⛔ L'ÉCHELLE DES CEINTURES MONTE À −1,98, ET CETTE NOTE DISAIT −2,6

La page de garde de E5 a posé deux lignes à y = −1,55 (bas : −1,95) en se fiant à
« la bande libre est y ≈ −2,0 » écrit plus haut. À l'image, **les ceintures s'écrivaient
par-dessus**. Mesuré : `echelle()` alignée en bas occupe **y de −3,45 à −1,98**. La ligne
unique de l'épisode 4, à −1,6, passait de 0,18 ; un bloc de DEUX lignes ne passe pas.
⭐ La leçon n'est pas le chiffre, c'est que **ce chiffre-là était dans cette note et il
était faux** : une cote se remesure sur l'objet, elle ne se recopie pas.

### ⛔ Un gros AUDIT-TARD cachait une vraie avance — cinquième fois de la série

`AUDIT-TARD 05-appliquer « 1 » (2,5 ≠ −1) **24,46 s**`. L'audit avait rattaché le « 1 »
de `2,5 ≠ −1` au « moins 1 » de l'équation de P, dite 24 secondes plus tôt. Sur SA propre
occurrence (« et non moins 1 », à la fin du clip), l'affichage était en **avance de
0,8 s**. ⭐ Les 27 autres TARD de E5 étaient tous légitimes ; celui-là ne se trouvait
qu'en relisant à la main le plus gros. Le contrôle coûte deux minutes :
`grep -o "AUDIT-TARD.*" <log>`, trié par valeur décroissante, et on lit les premiers.

### ⛔ Dessiner un pont : ce qui doit paraître HORIZONTAL se dessine selon x

Trois versions de la même figure, et seul le **gros plan** (recadrage ×3) a montré les
deux premières erreurs — la leçon de l'épisode 4, confirmée sur un objet qui n'est pas
un personnage :
1. le tablier filait en PROFONDEUR : comme toute direction de fuite monte à 35°, on
   lisait une **rampe de skate**, et les piles étaient plantées dans la chaussée ;
2. corrigé, le tablier était à z = 1,3 et la route s'arrêtait à y = 2,6 : **les deux
   rubans ne se chevauchaient NULLE PART**, alors que « vue d'en haut, les deux tracés
   se croisent » est la phrase que l'écran doit montrer. Tablier descendu à z = 0,58,
   route allongée à y = 3,6 : elle entre sous le pont, disparaît, et ressort.
⭐ La règle : **dans cette cavalière, ce qui doit paraître horizontal se dessine selon x,
ce qui doit s'éloigner se dessine selon y.** Un pont est horizontal, une route s'éloigne.
⚠️ Et une droite qui porte le vecteur (1 ; 0 ; 0) depuis l'ORIGINE se confond trait pour
trait avec l'axe des x : on la décale (ici en y = 0,7), même direction, même leçon.

### ⛔ L'écran de correction hérite — et l'héritage descend plus bas qu'on ne croit

Déjà payé sur l'épisode 3, repayé ici : « les termes en t » s'écrivait **par-dessus
l'équation de P**, parce que le bloc de l'écran de défi est posé à y = 0,85 et fait DEUX
lignes, donc descend à 0,45. ⭐ Avant de poser le premier bloc d'une correction, on lit
le `get_bottom()` de ce qui reste, on ne regarde pas le `y` qu'on avait écrit.

### ⛔ `str(2,5)` écrit « 2.5 » — dans le SOCLE, pas dans l'épisode

`ligne_param` et `equation_plan` écrivaient leurs nombres avec `str(...)`. Les épisodes 1
à 4 n'ont que des entiers : le défaut était invisible. E5 écrit « x + y + z + 2,5 = 0 »,
et il est sorti. ⭐ `fr(v)` est maintenant au niveau du module (`self.nombre` est une
méthode, ces deux fonctions ne pouvaient pas s'en servir).

---

## ⛔⛔ Ce que l'épisode 6 a appris — à lire AVANT d'écrire l'épisode 7

Huit défauts, et **deux d'entre eux sont dans les OUTILS**, donc ils attendent les six
épisodes qui restent. Les six autres sont des récidives — mais trois ont pris une forme
que la liste ne prévoyait pas, et c'est ça qu'il faut lire.

### ⭐⭐ LE CONVERTISSEUR DE MARQUES PERDAIT LES DÉCIMALES RÉPÉTÉES — et il mentait

La note annonçait « E6 garde **13 cues non placées** ». Mesuré, c'était pire que « non
placées » : **huit marques tombaient sur le MAUVAIS mot**, et celles-là ne se signalent
nulle part.

| ce que la marque disait | ce que la voix dit | écart |
|---|---|---|
| le « 0,5 » du choix C de `04-question` à 14,12 s | 17,32 s | **3,2 s d'avance** |
| le « 1 » du choix C à 15,96 s | 20,23 s | **4,3 s d'avance** |
| le « 0,5 » final de `09b-correction` à 36,69 s | 39,93 s | **3,24 s d'avance** |

⛔ Conséquence si on n'avait rien vu : `q_montrer_choix` aurait affiché les cartes B et C
**trois et quatre secondes avant** que la voix les dise. Et `verifier-avant-rendu.py` ne
dit RIEN de ce cas : il vérifie qu'une marque EXISTE à l'offset, pas qu'elle est juste.

**La cause** (dans `manim/poste2/cues2marques-espace.py`) : WinRT lit « 0,5 » comme trois
mots, donc **3 cues par occurrence**. Mais le JETON de la cue dépend de la PONCTUATION qui
suit, pas du nombre d'émissions : « 0,5 ; » arrive comme `'0,5 '` (le point-virgule est
rendu comme un blanc), « 0,5. » comme `'0,5'` nu. Or `doublon_groupe` tranchait sur ce
blanc. Donc, dans les deux sens :
- `'0,5 '` répété **6** fois (= DEUX occurrences) ne gardait qu'UNE marque ;
- `'0,5'` NU répété **3** fois (= UNE occurrence) les gardait toutes les TROIS, posées sur
  trois positions différentes — donc sur les coordonnées suivantes.

⭐ **La règle neuve est COMPTÉE, pas devinée** : sur les 15 runs de cues décimales des 12
voix de la série, **toutes les longueurs sont des multiples de 3**, et n/3 est exactement
le nombre d'occurrences du jeton dans cette portion de texte. D'où : dans un run de cues
identiques dont le jeton est une décimale, on garde la PREMIÈRE de chaque groupe de 3.

✅ **Effet mesuré, les 12 voix régénérées dans un dossier temporaire et comparées au
fichier commité** : `espace_defi` passe de 912 à **923 marques, 0 cue non placée** ; les
dix autres voix sont **identiques au diff** — y compris `espace_position_relative` (E5),
qui n'a que des runs de 3 à une occurrence.

> ⛔⛔ **SAUF `espace_repere_coordonnees` (E2), ET SON HD EST LIVRÉ.** La règle neuve
> change **4 marques** de son clip `05-appliquer` (positions 151, 157, 318 et 324). Son
> fichier **n'a PAS été régénéré**, exprès : le rendu HD d'E2 a été calé dessus.
> ⭐ Et il n'y a rien à rattraper : les 4 marques fautives sont toutes **EN RETARD** de
> 0,31 s à 1,50 s (13,04 au lieu de 11,55 ; 13,35 au lieu de 13,04 ; 29,46 au lieu de
> 27,96 ; 29,77 au lieu de 29,46), jamais en avance. Un affichage tardif ne montre rien
> avant l'heure : **E2 n'est pas en cause**, elle pose seulement deux triplets jusqu'à
> 1,5 s trop tard.
> ⚠️ Donc : si quelqu'un relance `voix-espace-tous-les-wav.sh` ou le convertisseur sur
> E2, **son fichier de marques changera** et son HD deviendra suspect au sens du contrôle
> par le CONTENU (plus bas). Décision à prendre à ce moment-là, pas avant.

### ⭐⭐ `col()` RAPETISSE UN BLOC POUR UNE RAISON QUI N'A RIEN À VOIR AVEC SA LARGEUR

Le second garde-fou de `col()` (« bas sous −1,95 ET droite au-delà de 5,3 → réduire à
3,1 ») protège Ti-Margo. Il a frappé **trois fois** sur cet épisode, et à chaque fois le
texte rapetissé était celui qui portait la leçon :

| le bloc | ce qui s'est passé | la mesure |
|---|---|---|
| la chaîne des quatre maillons (01) | posée à y = **−1,15**, son bas tombe à **−1,96** | réduite de 3,45 à 2,50, soit **18,8 px** |
| « A, Ω et G alignés » (05) | posé à −1,85, bas à −2,01 | réduit de 4,30 à 3,10 |
| les trois cartes de la question 2 | `q_tete` les mesure **centrées en y = 0** : à trois lignes chacune, leur bas y est à −2,10 | les trois choix à **20,4 px** |

⛔⛔ **Et le troisième est le plus traître de toute la série : c'est AJOUTER une ligne à un
choix qui rapetisse les trois cartes.** On croit gagner de la place, on perd 6 px. Le
remède mesuré : *une seule* des trois cartes sur trois lignes (la plus longue), les deux
autres sur deux → 25,8 px.
⭐ Et la règle générale : **un écart d'un centième de unité décide**. −1,15 passe, −1,05
passe, et entre les deux il y a un seuil qu'aucune relecture ne voit.

### ⛔⛔ LES TROIS AXES D'UN REPÈRE (A ; AB, AD, AE) SONT TROIS ARÊTES DU CUBE

⛔ **Le cube ne revient PAS dans 9 épisodes : mesuré, 7 voix en parlent et 6 scripts le
dessinent.** Le « 9 » était une intention de conception, jamais comptée — un chiffre de
tête, la faute la plus fréquente de cette série. Les scripts qui appellent `.cube()` :
`espace_repere_coordonnees` (4 fois), `espace_defi`, `ps_espace_angle`, `ps_espace_calculer`,
`ps_espace_norme_distance`, `ps_espace_orthogonalite`. ⭐ `ps_espace_defi` (E12) en parle
5 fois et son script reste à écrire : il en dessinera un. Les quatre autres épisodes
(`espace_vecteurs`, `espace_droite_parametrique`, `espace_plan_equation`,
`espace_position_relative`) n'ont jamais dessiné de cube — l'arête manquante ne les a
pas touchés, et les re-rendre aurait pris le verrou deux heures pour rien.
⭐ La commande : `grep -c "\.cube(" manim/scripts/terminale/*espace*.py`
Dessiné avec `self.repere(...)` et `portee=2`, les axes se superposent exactement aux
arêtes A B, A D et A E sur leur première moitié — on ne voit pas des axes, on voit des
arêtes grises doublées. Et surtout : **le bout de l'axe des y tombe À L'INTÉRIEUR du
cube**. Le projeté de (0 ; 2 ; 0) est (0,82 ; 0,57) et la silhouette du cube va jusqu'à
(1,41 ; 1,29) : à l'image, une flèche grise plantée dans le solide et un « y » italique
collé sous le F. ⛔ Allonger la portée n'arrange rien avant 4, où les axes feraient quatre
fois le cube.
⭐ Le remède est celui des manuels : **pas d'axes**. `cube_repere()` ne dessine que le
cube, et l'écran 02 montre le repère avec `base_repere()` — trois flèches posées sur les
trois arêtes qui partent de A, sans lettres.
⚠️ Deuxième cote du même défaut : **`u = 0,95 est trop petit pour un cube unité**. Une
étiquette de sommet est posée à 0,26 du sommet ; quand l'arête fait 0,95 à l'écran, les
noms se touchent et le « F » se lit dans le cube. Cet épisode est à **1,25 → 1,6**.

### ⛔ UN BLOC PASSÉ DE DEUX À TROIS LIGNES, ET `l2[1]` N'EN MONTRE PLUS QUE DEUX

Vu à la planche : l'écran 07b affichait « à la même distance de A — » puis plus rien, un
tiret dans le vide au milieu de l'explication. La troisième ligne existait, elle était
bien placée, elle n'était **jamais jouée** — `self.play(FadeIn(l2[1], …))` au lieu de
`l2[1:]`. ⛔ Aucun outil ne peut le dire : le mobjet est construit, il est dans la marge,
aucun nombre n'est en avance. ⭐ **Quand un bloc change de nombre de lignes, relire les
index de TOUS ses `play`.**

### ⛔ ET LE MÊME CHANGEMENT A FAIT ÉCRIRE UN BLOC SUR UNE CARTE

Toujours 07b : en passant le choix B de deux à trois lignes, le bas des cartes est
descendu de −1,23 à **−1,70**, et le bloc « la même norme… », mesuré pour l'ancienne
hauteur, s'écrivait **par-dessus la carte C**. C'est le défaut n° 1 de l'épisode 3, à sa
troisième récidive. ⭐ **Changer la hauteur des cartes oblige à recompter TOUS les blocs de
l'écran de réponse**, pas seulement ceux qu'on vient d'écrire.

### ⛔ UN GROS `AUDIT-TARD` CACHAIT DEUX VRAIES AVANCES — sixième et septième fois

Le contrôle de l'épisode 5 (relire à la main les plus gros TARD, triés par valeur) a servi
deux fois de plus :

| signalement | la vraie mesure |
|---|---|
| `AUDIT-TARD 09b « 1 » (t + t − 1 =) **10,94 s**` | « t + t − 1 = 0 » était posé avec « on remplace », à 28,8 s, et la voix ne dit « moins 1 » qu'à 32,0 s : **2,7 s d'AVANCE** |
| `AUDIT-TARD 04b « 1 » (la hauteur 1) **3,25 s**` | la ligne posée à son premier mot mettait son « 1 » à l'écran **0,13 s** avant qu'il soit dit |

L'audit avait rattaché ces « 1 » à d'autres « 1 » dits bien plus tôt — il y en a neuf dans
`09b`. ⭐ Le contrôle coûte deux minutes et il a trouvé quelque chose sur **trois épisodes
d'affilée** : `grep -o "AUDIT-TARD.*" <log>`, trié par valeur décroissante, et on lit les
premiers. ⚠️ Les deux `AUDIT-AVANCE` francs du premier dry run (06, « 1 » et « 6 cm »,
1,12 s et 1,39 s) étaient le piège n° 6 des entiers sous sa forme habituelle : **un nombre
qui clôt un membre de phrase se pose à `au_fin`, même s'il y en a deux dans la ligne**.

### ⭐ CE QUI A BIEN MARCHÉ, ET QU'IL FAUT REFAIRE

- **Mesurer toutes les cotes AVANT de rendre**, dans un script à part
  (`manim/poste2/mesure-espace-defi.py`) qui rend un code de sortie : il a attrapé onze
  blocs rétrécis ou hors marge que la planche n'aurait montrés qu'après un rendu.
  ⭐ Il est écrit pour être recopié d'un épisode à l'autre.
- **Dessiner la section d'un plan comme une SECTION DU SOLIDE** : le plan P : x + z − 1 = 0
  coupe le cube selon le rectangle B C H E, dont les quatre coins SONT des sommets. Un
  `r.plan(...)` carré centré sur Ω n'aurait coïncidé avec aucun d'eux, et l'écran devait
  justement montrer que B, C, H et E sont dessus. (`platitude((1 ; 0 ; 1))` = 26,1° :
  ce plan-là se projette très bien, et l'aire projetée garde **49 %** de l'aire réelle.)
- **Choisir une figure par la MESURE et non à vue** : l'écran 06 a besoin de deux droites
  du cube qui SEMBLENT se croiser sans être coplanaires. (A C) et (E B) le font
  (paramètres 0,589 et 0,831 : deux points différents superposés). ⛔ Les paires choisies
  à vue ratent — (A G) et (B H) se coupent VRAIMENT, (A G) et (B D) ne se croisent même
  pas à l'écran. `se_croisent_a_lecran()` est dans `espace_defi.py`.

---

## ⛔⛔ Ce que l'épisode 7 a appris — à lire AVANT d'écrire l'épisode 8

Neuf défauts. **Trois sont dans les OUTILS** et valent donc pour les cinq épisodes qui
restent ; un quatrième est une faute de CONTENU que six épisodes livrés portent déjà.

### ⛔⛔⛔ IL MANQUAIT LA FLÈCHE DES VECTEURS — dans les douze épisodes

Frédéric, 22/11, en regardant la planche : « as-tu mis les flèches sur les vecteurs ? »
Mesuré aussitôt : `grep` sur les douze scripts de la série → **aucune notation fléchée
nulle part**. E1 à E6, déjà rendus en HD, écrivent « A G », « A Ω », « u · v » à plat.
⛔ À l'écran d'une terminale, « u · v » se lit comme un produit de deux NOMBRES — et dans
un épisode dont toute la leçon est « les facteurs sont des vecteurs, le résultat est un
nombre », l'écran contredisait la voix.

⭐⭐ **Le caractère combinant U+20D7 NE SE REND PAS.** Mesuré sur une image avant d'écrire
quoi que ce soit : « u⃗ » sort en carré « tofu » avec « 20D7 » écrit dedans, exactement
comme le ⚠ de l'épisode 1. La flèche d'un vecteur se **dessine**, comme le triangle du
panneau d'avertissement.

⭐ Deux outils neufs dans le socle `espace_ecrans.py`, à employer partout :
- `self.vec("u", fs, couleur)` → un nom de vecteur et sa flèche (« u », « AB », « A G » :
  un nom de deux lettres porte **une seule** flèche, et c'est la bonne notation) ;
- `self.vexpr("u · v = ‖u‖ × ‖v‖ × cos θ", ("u", "v"), fs, couleur)` → l'expression
  entière en UN `Text`, les flèches posées par-dessus.
  ⛔ Le montage en morceaux (`VGroup(...).arrange(RIGHT)`) ne marche pas : les boîtes de
  « u », de « · » et de « = » n'ont ni la même hauteur ni la même ligne de base, et
  l'expression monte et descend à chaque signe.
  ⚠️ **L'indexation des glyphes a été MESURÉE**, parce que c'est le seul point qui pouvait
  trahir : Manim ne crée **aucun sous-mobjet pour un espace** et n'a pas de ligature ici
  (« A G · A B » = 9 caractères, 5 sous-mobjets ; « ‖u‖ × ‖v‖ × cos θ » = 12 pour 12 non
  blancs). L'indice d'un glyphe est donc le nombre de caractères non blancs qui le
  précèdent.
  ⛔ Un nom n'est reconnu que s'il est **isolé** : sans cette frontière, le « u » de
  `vexpr` se pose sur le « u » de « nul ». Vérifié à l'image sur « aucun u dans "nul" ».

⚠️ **Et la flèche change la HAUTEUR de tout ce qui la contient** (0,10 + l'épaisseur
au-dessus du texte) : sur E7 le cadre « et pourtant v ≠ w » est passé de −3,55 à −3,59,
donc **sous la marge de 3 %**, uniquement à cause des deux flèches. Toute cote d'un bloc
qui gagne une notation vectorielle se remesure.

⏳ **Décision de Frédéric, 22/11 : « il faut reprendre les vidéos ».** E1 à E6 sont à
refaire avec la notation. ⭐ Ce qui rend l'opération peu chère : **ces six-là ne sont
devant aucun élève** — 0 entrée `espace` dans `manim/manifeste-youtube.json`, et
`brancher-videos-coach.mjs --classe terminale-spe` répond « Rien à brancher ». On ne
corrige rien en public, on repasse six rendus HD.
⭐⭐ **L'ÉTAT EXACT, MESURÉ PAR UN OUTIL QUI EST DANS LE DÉPÔT** :
`python -X utf8 manim/poste2/auditer-fleches-vecteurs.py`. Il lit l'AST, pas un grep —
chercher le glyphe « ⃗ » répond « non » même quand tout est juste, puisque la flèche est
DESSINÉE. Résultat du 22/11 :

| script | noms de vecteur **nus** |
|---|---|
| `espace_vecteurs` (E1) | **6** — et c'est l'épisode qui parle des vecteurs |
| `espace_repere_coordonnees` (E2) | 2 |
| `espace_droite_parametrique` (E3) | 3 |
| `espace_plan_equation` (E4) | **0** ✅ |
| `espace_position_relative` (E5) | **0** ✅ |
| `espace_defi` (E6) | 3 |
| `ps_espace_calculer` (E7) | **0** ✅ |

⭐ Donc **QUATRE** épisodes à reprendre, pas six : E4 et E5 ne nomment jamais un vecteur.
⚠️ Et l'audit a aussi attrapé un nu **chez E7** — le TITRE « Le cas u · u », sur l'écran
dont toute la leçon est que ces deux u sont des vecteurs. Un texte d'écran sur 26 était
passé entre les mailles d'une relecture à la main.

✅ **ET LES ÉTIQUETTES DE FIGURE SONT RÉGLÉES À LA SOURCE** :
`espace3d.Repere3D.vecteur(…, fleche_nom=True)` est maintenant le DÉFAUT, et la flèche
vient de `espace3d.fleche_de_nom`, **une seule implémentation** dont `EcransEspace.vec`
et `.vexpr` se servent aussi. Il y avait 8 étiquettes nues dans la série (6 dans E1).
⚠️ Ce changement de défaut touche E1 à E6 dès qu'on les rendra : leurs blocs gagnent la
hauteur de la flèche, donc **leurs mesures sont à relancer** avant tout rendu.
⚠️ `g.nom` est désormais le GROUPE (texte + flèche) et non le seul texte : un
`FadeIn(g.nom)` montre les deux, `g.texte_nom` garde le texte seul.

### ⛔⛔ UNE ÉTIQUETTE DE VECTEUR SE POSE DU CÔTÉ OÙ LE VECTEUR NE VA PAS

Dès que l'étiquette porte elle aussi une flèche, `decal=UR` (le défaut de
`Repere3D.vecteur`) devient faux pour tout vecteur qui monte vers la droite : les DEUX
flèches se croisent. Vu au gros plan sur deux écrans de E7 :
- écran 05, u = (1 ; 2 ; 3) monte à droite → son étiquette était **sur le fût** ;
- écran 06, w = (0 ; 0 ; 1) monte → `UP` posait l'étiquette sur le fût et sa flèche
  percutait la **pointe** du vecteur.
⭐ La règle : **l'étiquette va du côté où le vecteur ne va pas.** u horizontal → `DOWN` ;
w vertical → `LEFT` ; u diagonal montant → `UL`.
⚠️ Et un piège de plus, parce que `decal` s'applique au MILIEU du vecteur et non à sa
pointe : v = (0 ; 1 ; 0) est **court** en cavalière (son projeté fait 0,41 ; 0,287), donc
son milieu est près de l'origine et `DR` posait son étiquette exactement sur le fût de u,
qui part de la même origine. Deux vecteurs courts issus du même point se gênent toujours :
il faut les regarder.

### ⛔⛔ LA MESURE VOYAIT LE TITRE, ET NE LE COMPARAIT À RIEN

Le badge « repère ORTHONORMÉ / obligatoire » de l'écran 02, trois lignes encadrées posées
à y = 2,45, monte à **3,25** — et le titre descend à **2,88**. Il s'écrivait dessus.
⛔ Aucun instrument ne le disait : le titre est posé par `to_edge`, la colonne par
`col()`, et `mesure-*.py` mesurait les deux **sans jamais les comparer**. Vu à la planche.
⭐ Le haut de la colonne de droite est libre jusqu'à **2,78**, et non jusqu'à 3,15 : la
tête « Question ! » y tient parce qu'elle fait UNE ligne. Le script de mesure compare
maintenant explicitement les deux boîtes, et c'est à recopier dans les épisodes suivants.

### ⛔⛔ UNE RÉDUCTION PAR UN PLAFOND NE SE SIGNALAIT JAMAIS

`mesure-espace-defi.py` (E6) passait son plafond en `naturel=min(nat, plafond)` : un bloc
réduit **par le plafond lui-même** ne sortait donc pas. Deux cas sur E7, tous deux graves :
- le modèle de rédaction de l'écran 08, ramené à **19,8 px** par le plafond de la copie ;
- la FINALE, réduite de **27 %** (30 px → 21,9) par son plafond de 10,60.
⭐ `plafonne()` remplace les trois `if … scale_to_fit_width` du script de mesure et rend
la réduction visible. ⚠️ À reporter dans les mesures de E8 à E12.

### ⛔ L'ÉCRAN DE RÉPONSE HÉRITE — QUATRIÈME RÉCIDIVE, ET C'ÉTAIT LA DONNÉE

L'écran 04 laisse u (2 ; 0 ; −1) à y = 1,50 et v (1 ; 5 ; 2) à 0,60 : ce sont les données
de l'exercice, elles ne s'effacent pas. Les trois lignes de calcul de 04b, posées à
1,55 / 0,75 / −0,05, s'écrivaient **exactement dessus** — trois textes empilés, illisibles.
⭐ Elles sont devenues UN SEUL bloc de quatre lignes (la somme en est la dernière), posé
SOUS les données : un calcul se lit d'un bloc, pas en quatre morceaux épars. Et la mesure
vérifie désormais l'écart entre le haut du bloc et le bas de v.

### ⛔⛔ DEUX DÉFAUTS DE PERSONNAGE QUE SEUL LE GROS PLAN A VUS — quatrième épisode d'affilée

Kelly, kitesurfeuse, à ×2,8 :
1. **l'aile était un BOL.** L'arc était tourné vers le bas (concavité vers le haut) : on
   lisait un bol suspendu, pas une aile de kite. Une aile est **convexe vers le haut**,
   bouts en bas — et c'est par ces bouts que partent les lignes ;
2. **elle n'avait pas de jambes** : le torse posé directement sur la planche se lisait
   comme un buste coupé à mi-corps. Les jambes font 0,50, soit la moitié du torse.
3. (et le bras partait du MILIEU du buste, pas de l'épaule — le défaut n° 1 de
   Jean-Bernard sur E4, à sa deuxième récidive.)
⭐ Sur la vignette à trois colonnes, les trois étaient invisibles. **Quatre épisodes de
suite** (E4 la visière, E5 le pont, E6 les axes, E7 l'aile) : le recadrage ×2,5 à ×3 sur
la figure de l'épisode n'est pas une précaution, c'est une étape.

### ⚠️ LES AUTRES, tous des récidives déjà écrites plus haut

| vu sur E7 | où c'était déjà écrit |
|---|---|
| `AUDIT-AVANCE` de 1,04 s sur « La réponse A, 4 » posé à son premier mot | piège n° 6 des entiers, `au_fin` |
| un `au_fin` qui remontait de 0,35 s dans le temps (l'arête et le repère en 09) | ordre de la VOIX, pas de l'écran (E6, 04b) |
| six blocs rétrécis par `col()` / `gauche()` d'un à trois dixièmes | défaut n° 4 de E3 |
| le bloc de 09b à deux centièmes de celui du dessous | « une cote se remesure », E5 |
| la figure des trois vecteurs à 1,22 × 1,47 — trois traits d'un centimètre | « un personnage ne se juge qu'en grand », E4 |

⭐ **Et un cas où la leçon de l'épisode 6 a servi tout de suite** : les trois vecteurs du
contre-exemple de l'écran 06 sont u (1 ; 0 ; 0), v (0 ; 1 ; 0) et w (0 ; 0 ; 1) —
c'est-à-dire **exactement les trois vecteurs de base**. Tracés dans un repère, ils se
seraient superposés trait pour trait aux trois axes, et les noms u, v, w seraient tombés
sur x, y, z. Ils sont dessinés **sans axes** : les trois flèches SONT le repère.

---

## ⛔⛔ LA PASSE DES FLÈCHES (22/11/2026) — E1, E2, E3 et E6 repris et re-rendus

Frédéric, devant la planche de l'épisode 7 : « as-tu mis les flèches sur les vecteurs ? »
puis « il faut reprendre les vidéos désolé ou pas de flèche ». Cette section raconte ce
que la reprise a coûté, parce que **rien de ce qui suit n'était prévisible** : la flèche
n'ajoute pas un dessin, elle change la HAUTEUR de tout ce qui la contient.

### ⭐⭐ LE MODE TÉMOIN : sans lui, cette passe se serait trompée de dix défauts sur dix

Les quatre `mesure-*.py` de cette passe acceptent **`--sans-fleches`** : ils rebâtissent
exactement les mêmes blocs sans la notation (et sans les flèches d'étiquette), et on
compare les deux sorties. ⛔ Sans ce mode, l'outil liste l'ÉTAT, pas le DIFF — et sur
l'épisode 1 il a sorti **dix** « RÉTRÉCI » dont **dix** étaient déjà dans l'épisode
publié, regardé et accepté le matin même (sa question de l'écran 07 est à 14,4 px depuis
le premier rendu). Les traiter comme des dégâts de la passe, c'était refaire la faute que
la note des entiers appelle « un diff a DEUX colonnes ».

> ⭐ **Le critère de cette passe n'est pas l'état, c'est le delta.** Ce qui doit être à
> zéro, c'est ce que la flèche a changé — pas ce que l'épisode portait déjà.

Le même raisonnement a servi sur le dry run : les **21 `AUDIT-AVANCE`** de l'épisode 1
font peur, et ils sont **rigoureusement identiques** à ceux de la version publiée (vérifié
en rendant `git show HEAD:…` dans un fichier témoin, même Scene, même dry run, puis
`diff` des deux listes triées). E1 et E2 ont été écrits **avant** que `au_fin` existe :
c'est leur dette, pas celle des flèches.

| épisode | AUDIT-AVANCE au dry run `-qh` | d'où ils viennent |
|---|---|---|
| E1 | **21** | écrit avant `au_fin` (triplets posés au premier mot) |
| E2 | **14** | idem |
| E3 | **1** | le seul structurel, déjà documenté plus haut |
| E6 | **0** | écrit après `au_fin` |

### ⭐⭐ CE QUE LA FLÈCHE COÛTE, EN CHIFFRES

Une flèche de nom déborde de **0,10 + son épaisseur** au-dessus du texte et de **0,08**
en largeur (`espace3d.fleche_de_nom` va de `UL + LEFT*0.03` à `UR + RIGHT*0.05`). Donc :

- **tout bloc qui en porte une grandit d'environ 0,09 en hauteur** — mesuré sur les
  quatre épisodes, aucun n'a franchi une marge pour autant ;
- **un bloc de CARTES en porte une par ligne nommée**, et là ça casse (voir plus bas) ;
- ⛔ **les étiquettes de figure ne concernent que DEUX des quatre épisodes.** Compté à
  l'AST, et non supposé : `espace_vecteurs` **6**, `espace_droite_parametrique` **1**,
  `espace_repere_coordonnees` **0**, `espace_defi` **0** (et E4, E5 : **0** — c'est
  pourquoi le changement de défaut de `Repere3D.vecteur` ne peut pas les abîmer).

### ⛔⛔ TROIS ÉTIQUETTES DE FIGURE SUR SIX ÉTAIENT DEVENUES FAUSSES — vu AU GROS PLAN

Sur l'épisode 1, les écrans 03, 05 et 07b portent chacun deux vecteurs nommés. Avec la
flèche, **les trois paires de décalages héritées (`UL` / `DR`) sont devenues fausses** :

| écran | ce qu'on voyait au gros plan | ce que la planche montrait |
|---|---|---|
| 03 | « u » écrit **sur l'axe des z** ; « v » flottant entre les deux vecteurs | rien |
| 05 | idem, et « v » plus près du vecteur VERT que du sien | rien |
| 07b | « u » **traversé par l'axe des y** | rien |

⭐ Et c'est bien la flèche qui l'a causé : sur le HD publié le matin, le « u » NU passait
à côté de l'axe. La flèche occupe précisément la bande qui restait libre au-dessus.

### ⭐⭐ ON NE CHOISIT PLUS UN `decal` À VUE : ON LE CHERCHE EN GRILLE

La recette, écrite pour cette passe et valable pour les cinq épisodes qui restent : on
balaie (dx, dy) **au pas de 0,25 entre −2,5 et +2,5**, on garde les positions dont la
boîte de l'étiquette est à plus de **0,08** de tout ce qui est tracé, et on classe par
distance au fût du vecteur qu'elle nomme — la plus proche gagne, pour qu'on sache **à qui
elle appartient**.

⛔⛔ **ET LE CONTRÔLE DOIT PORTER SUR LES POINTS TRACÉS, PAS SUR LES BOÎTES.** Premier jet :
« aucun décalage libre » sur l'écran 07b, pour les deux étiquettes. La cause : la boîte
d'une flèche en diagonale est un grand rectangle **presque vide**, et testée ainsi elle
interdit tout un quadrant. En échantillonnant les points des chemins, la même recherche
rend une dizaine de positions libres.

⚠️ Et la grille ne connaît que ce qu'on lui donne : il faut lui passer aussi les COLONNES
DE TEXTE de l'écran. Sur 07b, trois des positions « libres » tombaient dans la colonne de
calcul, qui n'était pas dans la liste au premier essai.

Résultat, écrit dans les scripts avec son jeu mesuré : 03 → u `(0,25 ; −1,25)`, v
`(2,25 ; 2,25)` ; 05 → u `(−0,75 ; −1,00)`, v `(2,25 ; 2,25)` ; 07b → u `(−0,25 ; 1,50)`,
v `(1,25 ; 0,75)`.

### ⛔⛔ LE PIRE DÉGÂT : TROIS FLÈCHES ONT FAIT TOMBER TROIS CARTES DE 25,8 À 20,4 px

Épisode 6, écran 07. Ses trois choix nomment des vecteurs (« on montre que A B et / A C
ont la même norme », « vecteurs A B et A C »). Fléchées, **trois lignes** gagnent 0,09 :
le bloc des cartes grandit de 0,28 de haut, descend à **−2,19**, donc sur la tête de
Ti-Margo — et `col()` le rétrécit. Les trois choix passent de **25,8 px à 20,4 px**.

⛔ C'est le piège le plus traître de l'épisode 6, déjà écrit plus haut sous une autre
forme (« c'est AJOUTER une ligne à un choix qui rapetisse les trois cartes »), et la
flèche en est une troisième forme : **on ajoute une notation, on perd 5 px de lisibilité
à l'autre bout de l'écran.**

⭐⭐ **Et le remède n'est PAS dans le socle — j'ai cru le contraire et je me suis trompé.**
Première idée : « `col()` juge les cartes CENTRÉES en y = 0, alors qu'elles seront
remontées sous la question ; son garde-fou se déclenche sur une position qu'elles
n'occuperont jamais ». C'était vrai de la description, et **faux de la conclusion** :
mesuré en désactivant le garde-fou, leur vrai bas tombe à −2,19, c'est-à-dire bel et bien
sur Ti-Margo. **Le garde-fou se vérifie lui-même.** Le paramètre que j'avais ajouté au
socle a été retiré ; il ne reste que le commentaire, pour que personne ne refasse le
détour.

Le remède est dans l'ÉPISODE, en deux cotes mesurées ensemble, et **aucune ne touche un
mot de la voix** :
1. **couper le choix A après « A C » et non après « et »**, pour qu'une seule de ses deux
   lignes porte des noms → 0,14 de haut récupéré ;
2. **24 px demandés au lieu de 26**.

→ **23,8 px obtenus**, bas des cartes à −1,87, soit 0,28 au-dessus de Ti-Margo.
⛔ **25 px ne passe pas** : le bas tombe à −1,94, à **un centième** du seuil de `col()`.

### ⚠️ DEUX COTES DE L'ÉPISODE 6 QUI MORDAIENT, DONT UNE DÉJÀ DANS LE HD PUBLIÉ

- 07b : l'écart entre « A C = k × A B » et le bloc « la même norme » est tombé de 0,14 à
  **0,05**. Bloc du dessous descendu à −1,53 → 0,13.
- 09b : l'accolade du système rentrait de **0,22** dans « A = origine ». ⚠️ Et elle
  mordait **déjà de 0,13 dans l'épisode publié** — vu au gros plan sur le HD du matin,
  signalé par aucun outil, parce qu'aucun outil ne comparait ces deux blocs-là. Système
  descendu de −1,30 à −1,64 → 0,12.

### ⛔ UNE DROITE ET UN VECTEUR NE S'ÉCRIVENT PAS PAREIL — et c'est le vrai sujet

La question que la passe a dû trancher six fois, en relisant la VOIX et non l'écran :

| écran | ce qui est écrit | ce que la voix dit | verdict |
|---|---|---|---|
| E2 09b | « I J », « A D » en face d'un triplet | « le vecteur I J », « le vecteur A D » | **vecteurs → flèche** |
| E2 09b | « (I J) et (A D) sont parallèles » | « les droites I J et A D » | **droites → rien** |
| E2 08 | « le repère A, A B, A D, A E » | la base du repère | **vecteurs → flèche** |
| E3 09 | « A B » sous « paramétrique de la droite » | « la droite A B » | **droite → écrit « (A B) »** |
| E3 09b | « A B » en face d'un triplet | « le vecteur A B » | **vecteur → flèche** |
| E6 04 | « la grande diagonale A G » | un segment | **segment → rien** |

⭐ L'épisode 2 est le cas d'école : ses deux lignes fléchées démontrent l'égalité de deux
VECTEURS, et sa conclusion parle du parallélisme de deux DROITES. **Si les quatre
notations se ressemblaient, il ne resterait rien à démontrer.**

### ⛔⛔ L'AUDIT DES FLÈCHES A DÛ ÊTRE REFAIT, ET SON ANCIENNE VERSION MENTAIT

`auditer-fleches-vecteurs.py`, première version : un nom TOUT SEUL, ou un texte portant un
« · ». Elle voyait **14** noms nus. En relisant à la main les ~300 textes des sept
scripts, il y en avait **26** : « u + v : », « k u : », « 2 u », « A G = 2 A Ω »,
« A C = k × A B », « Le vecteur u a pour coordonnées », « les coordonnées de A B et A C »,
« vecteurs A B et A C »… ⛔ **Un ✅ de cette version-là aurait fait croire la série réglée.**

⭐⭐ La règle est maintenant **inversée** : tout nom isolé est SUSPECT, et ce qui n'est pas
un vecteur doit le DIRE, avec sa raison, dans la table `PAS_DES_VECTEURS` — le même
principe que le `sans_audit` des épisodes, qui porte toujours sa raison à côté. Deux cas
se décident sans table, parce que la notation tranche : **« (A B) » est une droite,
« [A G] » un segment**.

⚠️ Deux faux positifs ont dû être mesurés avant d'y croire :
- **l'apostrophe est une frontière** — sans elle, le « n » de « n'est », « n'ont »,
  « n'existe » sortait en nom de vecteur : quatre faux positifs sur le seul épisode 5,
  qui est pourtant juste ;
- **deux majuscules collées, c'est aussi un petit mot français en capitales** — « c'est
  LA définition » (épisode 7). D'où `MOTS_CAPS`.

⭐ Son ÉTALON est pris **hors** du périmètre soupçonné : E4, E5 et E7 sont relus à la main
et justes. Tant qu'ils restent à ✅, la règle élargie ne fabrique pas de faux positifs.
C'est exactement la leçon des entiers (« un étalon qui partage le défaut de l'instrument
ne prouve rien »).

⭐ Et il lit maintenant les cartes de choix : `choix2` / `choix3` acceptent `noms=(…)` et
passent chaque ligne par `vexpr` (socle, `_ligne_choix`). Sans cette lecture, l'outil
signalerait comme nues des cartes parfaitement fléchées.

### ⚠️ CE QUE CETTE PASSE A VU ET N'A PAS CORRIGÉ — trois constats pour Frédéric

Rien de ce qui suit ne vient des flèches : les trois défauts sont dans les épisodes
publiés le matin. Ils sont écrits ici parce qu'ils se décident avec lui, pas tout seul.

1. ⛔ **La flèche ne se voit pas sur la question de l'écran 07 de E1.** Mesuré en pixels
   HD : la pointe y fait **4,8 × 4,8 px**, contre 12 à 16 px partout ailleurs — à l'écran
   on lit une **barre**, pas une flèche. La cause n'est pas la flèche : c'est que cette
   question est réduite à **14,4 px** par `col()` (elle fait 9,8 de large pour 4,40 de
   place). Même chose pour l'écran 04. ⭐ Le remède connu existe — `q_tete(largeur=6,3,
   xl=0,35)`, comme E5 et E6 — mais il déplace les cartes, la pause et toute la colonne
   de gauche des deux écrans : c'est une reprise de mise en page, pas un réglage.
2. ⚠️ **Sur les écrans 03 et 05 de E1, le vecteur v (3 ; 0 ; 2) se dessine PAR-DESSUS
   l'axe des y.** Mesuré : son projeté part à 33,7°, l'axe des y à 35,0° — ils sont
   confondus, et la pointe rose recouvre la lettre « y ». Un vecteur dont la deuxième
   coordonnée est NULLE, dessiné le long de l'axe des y : c'est la même famille que « les
   trois axes sont trois arêtes du cube » (E6) et que la droite de E5 confondue avec
   l'axe des x. ⛔ On ne peut pas changer le triplet, la voix le dit.
3. ⚠️ **Sur l'écran 05 de E1, le vecteur u est invisible** : le double 2 u, orange et
   tracé par-dessus la même demi-droite, le recouvre entièrement. L'étiquette « u »
   fléchée désigne donc une flèche ORANGE. (L'écran 03 ne l'a pas : son double y est à
   55 % d'opacité.)

---

## ⛔⛔ Ce que l'épisode 8 a appris — à lire AVANT d'écrire l'épisode 9

Onze défauts. **Cinq n'ont été vus que par le GROS PLAN**, trois par le dry run, trois par
la mesure hors rendu. Et deux contrôles neufs sont entrés dans l'outil de mesure : ils
valent pour les quatre épisodes qui restent.

### ⭐⭐ DEUX PLANS DE CET ÉPISODE SE PROJETTENT SUR UNE LAME — et c'est la MÊME normale

`platitude((1 ; 1 ; 1))` = **9,0°**, sous le seuil de 12° (voir le NOYAU dans
`espace3d.py`). Or (1 ; 1 ; 1) est à la fois la normale du plan P de l'écran 05 **et**
le vecteur A G du défi, dont le plan (B D E) a exactement cette normale. Les deux écrans
qui portent la leçon de l'épisode étaient donc les deux écrans impossibles à dessiner en
cavalière. Mesuré sur le triangle B D E :

| mesure | valeur |
|---|---|
| aire projetée / aire réelle | **17,5 %** |
| distance de D à la droite (B E), projetée | **0,214** unité de repère |
| angle entre B D et B E à l'écran | **19°** |

⭐ Deux remèdes différents, et c'est l'écran qui décide :
- **écran 05** : le plan est DESSINÉ À PLAT (`plan_poteau` dans l'épisode, sur le modèle
  de `plan_dessine`), sans aucun axe. Il ne prétend pas montrer OÙ est le plan, il montre
  CE QU'EST un plan — et c'est exactement ce que l'écran doit dire ;
- **écran 09b** : **aucun morceau de plan**. On montre les deux VECTEURS du plan (B D et
  B E), qui sont ce que la démonstration manipule. Un triangle B D E rempli se serait lu
  comme une lame.
⭐ Et le sol de l'écran 06, lui, se projette très bien : `platitude((0 ; 0 ; 1))` = 14,9°.
Un épisode peut donc porter les deux conventions, à condition que chacune ait sa raison.

### ⭐⭐ LES ÉTIQUETTES DE FIGURE SE CHERCHENT EN GRILLE — et parfois il n'y a pas de place

Les **512** combinaisons de `decal` des trois vecteurs du défi ont été essayées hors
rendu : la MEILLEURE ne laisse que **0,14** entre deux noms, et la paire « A G » / « B E »
se touche franchement dans la plupart. La cause est la platitude ci-dessus — 19° entre
B D et B E à l'écran.
⛔ **Quand la grille ne trouve rien, on n'étiquette pas.** Les trois flèches sont
anonymes, et c'est la COULEUR qui les relie à la colonne de droite (ambre = A G, bleu =
B D, rose = B E) — exactement ce que fait déjà l'écran 09b de l'épisode 7.
⭐ **`etiquettes()` est maintenant dans le script de mesure** : il compare les étiquettes
DEUX À DEUX, y compris contre les huit noms de sommet du cube, et il dit « se touchent »
sous 0,10 et « serré » sous 0,22. ⚠️ À recopier dans les mesures de E9 à E12.

### ⛔⛔ UNE FLÈCHE QUI SORT DE SON PLAN CONTREDIT LA LÉGENDE QUI EST JUSTE DESSOUS

Écran 06, vu au gros plan ×3 : la pointe de « nord » passait **au-dessus** du bord haut
du morceau de sol et celle d'« est » **à droite** de son bord droit — dans l'écran dont
la légende dit « le nord est AU SOL ». Le dry run était propre (rien ne sort du cadre),
la mesure aussi (les bords de la figure sont dans la marge).
⭐ **Un contrôle neuf, dans le script de mesure** : la pointe de chaque flèche est testée
par un point-dans-polygone contre les quatre coins du morceau de plan. ⚠️ À recopier.
⚠️ Et le réglage qui marche est COMPTÉ : avec `demi = 1,15` centré en (0,6 ; 0,6), le sol
projeté va de (−0,78 ; −0,16) à (2,47 ; 0,50) ; (0 ; 1,5 ; 0) se projette en
(0,615 ; 0,431) et (1,45 ; 0 ; 0) en (1,45 ; 0) — les deux sont dedans.

### ⛔⛔ CINQ MORCEAUX CONSTRUITS, QUATRE JOUÉS — et aucun instrument ne le voit

`plan_poteau` rend `(plan, u, v, n, angles)`. L'écran 05 jouait le plan et les trois
flèches… et **jamais les deux carrés d'angle droit**. Ils étaient construits, bien
placés, dans la marge, et invisibles. C'est le défaut de l'épisode 6 (l. 07b, « une
ligne qui existe et n'est jamais jouée »), à sa deuxième récidive.
⭐ Vu au gros plan ×2,6, par rien d'autre. **Quand une fonction de figure rend N morceaux,
compter les `play` qui les montrent.**
⭐ Et le remède est meilleur que l'original : chaque carré paraît **avec son produit
scalaire**, c'est-à-dire quand on vient de PROUVER que l'angle est droit.

### ⛔⛔ UN `au_fin` NE PLACE RIEN — IL ATTEND. Il va donc contre son `play`.

L'écran 04 avait ses deux `au_fin` groupés en tête de méthode (recopié tel quel de
l'épisode 7), et les `play` plus bas. Résultat au dry run : le « 1 » de u s'affichait
**4,93 s après** avoir été prononcé, parce que la méthode attendait d'abord la fin du
triplet de v. ⭐ La règle : **un `au_fin` (ou un `au_mot`) se colle au `play` qu'il
règle**, jamais en tête de bloc. ⚠️ `ps_espace_calculer.py` porte encore cette forme à
son écran 04 : son HD est livré et ne bouge pas, mais on ne la recopie plus.

### ⛔ L'ORDRE EST CELUI DE LA VOIX, MÊME QUAND L'ÉCRAN EST UN TABLEAU

Écran 03 : trois rangées jouées à la suite, puis deux blocs d'insistance. Or la voix dit
« Deux vecteurs, pas un. Et non colinéaires… » **avant** « on dit que ce vecteur est
normal au plan ». Les deux blocs sortaient donc à **9,07 s et 5,97 s de RETARD**.
⭐ Le tableau se construit d'un bloc ; seule la RÉVÉLATION suit la voix, et la troisième
rangée se montre après les deux blocs. (Même défaut qu'à l'écran 04b de E6 et qu'à
l'écran 09 de E7.)

### ⛔ UNE CARTE DE CHOIX QUI PORTE UN NOMBRE S'AFFICHE QUAND IL EST DIT

« B : non, il vaut −8 » paraissait **1,05 s avant** que « moins 8 » soit prononcé.
`q_montrer_choix` ne retarde que les corps qui portent un `.nb` (prévu pour les
triplets). ⭐ `cB.nb = [cB]` suffit : le socle attend alors la dernière marque DANS le
choix. ⚠️ C'est le piège n° 6 des entiers, dans sa troisième forme de la série.

### ⛔⛔ TROIS DÉFAUTS DE PERSONNAGE ET DE FIGURE, VUS AU GROS PLAN — cinquième épisode d'affilée

⭐⭐ **Et cette fois ils ont été vus AVANT le premier rendu de l'épisode**, sur une planche
de figures seules (`marc()`, `poteau_vue()`, `plan_poteau()` posés en grand dans une Scene
à part, rendue en `-qh -s`). Ça coûte quinze secondes et ça a évité deux tours complets.

1. **le casque de chantier flottait au-dessus du crâne**, et son bord barrait le visage à
   hauteur des yeux : on lisait un sombrero. C'est la visière de Jean-Bernard (E4) à sa
   deuxième récidive. ⭐ Un dôme en `Arc` laisse du NOIR entre le crâne et le trait :
   c'est un `AnnularSector` plein qu'il faut, et le bord se pose à 1,44 quand le haut de
   la tête est à 1,45 — pas à 1,30, qui est DANS la tête ;
2. **la coche verte posée sur le haut du poteau** le faisait lire comme un poteau TORDU.
   Une marque de validation se pose À CÔTÉ de ce qu'elle valide ;
3. **v pointait hors du plan**, dans l'écran qui enseigne que u et v sont DANS le plan ;
   et le second carré d'angle droit était posé du côté où **aucun vecteur n'allait**.

### ⚠️ LES COTES QUI ONT COÛTÉ UN TOUR, toutes mesurées hors rendu

| ce que la mesure a dit | la décision |
|---|---|
| tableau de l'écran 03 : 11,20 pour un plafond de 10,60 | police 30 → 28 |
| carte C de l'écran 04 à **22,5 px** sur deux lignes | trois lignes, et **une seule des trois** (remède de E6) |
| cartes de l'écran 07 : fs 28 → 27,8 / 25,2 / 24,9 px ; fs 24 → **23,8 partout** | fs 24. Trois lignes à 28 px feraient descendre les cartes à −2,52, c'est-à-dire DANS la boîte de Ti-Margo |
| pause des écrans 04 **et** 07 posée sous −2,15 par `q_tete` | déplacée en bas à GAUCHE — les cartes, elles, restent au-dessus |
| modèle de rédaction (08) : 8,89 pour les 8,60 de la copie | première ligne raccourcie |
| finale (10) : 10,73 pour 10,60 | « dans l'espace : » → « attention : » |
| leurre C de 04b : bas du cadre à **−3,570** pour une marge à −3,573 | police 26 → 24 |

⭐⭐ **Les deux dernières lignes sont la vraie leçon** : trois MILLIÈMES d'unité et 1,2 %
de réduction. Aucune relecture ne voit ça, et les deux auraient abîmé l'écran que l'élève
relit le plus.

### ⭐ CE QUI A BIEN MARCHÉ, ET QU'IL FAUT REFAIRE

- **Étalonner `verifier-avant-rendu.py` avant de croire son zéro** : une copie du script
  avec UN `au_mot` faux, dans le répertoire temporaire, et on vérifie qu'il crie. Il ne
  dit rien quand tout va bien — un silence n'est pas une preuve tant qu'on n'a pas vu
  l'outil parler (leçon « un zéro se vérifie » des entiers).
- **Rendre les GLYPHES avant de les employer** : ⊥ (U+22A5), ⟺ (U+27FA), ⟹ (U+27F9),
  ⊂ (U+2282) et ∠ (U+2220) ont été rendus dans une image d'essai. Tous se dessinent, et
  ⟺ se distingue bien de ⟹. ⛔ Deux caractères de cette série sont déjà sortis en carré
  « tofu » (le ⚠ de E1, la flèche combinante U+20D7 de E7) : on ne tape plus un symbole
  mathématique sans l'avoir vu.
- **La planche des FIGURES SEULES, en grand, avant le premier rendu de l'épisode.**

### ⛔ UNE DROITE, UN PLAN ET UN VECTEUR : trois notations, et c'est le sujet de l'épisode

Cet épisode écrit « (A G) » pour la droite, « (BDE) » pour le plan, « A G » fléché pour
le vecteur. ⭐ C'est la convention tranchée par la passe des flèches, et ici elle n'est
pas cosmétique : **toute la leçon est que le VECTEUR A G est orthogonal au PLAN (BDE)**.
⚠️ Détail d'outil : `auditer-fleches-vecteurs.py` laisse passer « (A G) » (deux
majuscules entre parenthèses) mais signalerait « (B D E) » — trois lettres espacées. On
écrit donc le plan **collé**, « (BDE) », qui est aussi la notation la plus courante.

⚠️⚠️ **ET DEUX LIGNES `[figure]` DE CET AUDIT SONT LÉGITIMES, QU'ON NE « CORRIGE » PAS.**
Sur `ps_espace_orthogonalite.py`, l'outil liste deux étiquettes « nues » : **« nord » et
« est »**, posées avec `fleche_nom=False` à l'écran 06. Ce ne sont pas des NOMS de
vecteur, ce sont des DIRECTIONS nommées en français — une flèche dessinée au-dessus du
mot « nord » serait une faute de notation, pas une correction. L'outil ne lit pas le
français (il le dit lui-même), donc il les signale ; la raison est écrite dans le script,
à l'endroit de l'appel. ⛔ Le compte qui fait foi reste **NUS : 0**.

---

## ⛔⛔ Ce que l'épisode 9 a appris — à lire AVANT d'écrire l'épisode 10

Douze défauts. **Cinq n'ont été vus que par le GROS PLAN**, trois par le dry run relu à
la main, deux par la mesure hors rendu, un par `verifier-avant-rendu.py` et un par une
image d'essai avant le premier écran. ⭐ Et **trois contrôles neufs** sont entrés dans
les outils : ils valent pour les trois épisodes qui restent.

### ⭐⭐ LE GLYPHE √ SE REND — MAIS IL N'A AUCUNE BARRE

Rendu dans une image d'essai AVANT d'écrire le premier écran, avec ‖, ², ≈, ≥, ⟹, ⟺ :
tous se dessinent (⛔ contrairement au ⚠ de E1 et à la flèche combinante U+20D7 de E7).
Mais **√ est un signe seul, sans vinculum** : « √x² + y² + z² » se lit
« (√x²) + y² + z² », c'est-à-dire **la faute même que l'épisode combat**. L'écran aurait
contredit la voix, dans l'épisode dont toute la leçon est « la racine ne se distribue
pas ».
⭐ `EcransEspace.racine(radicande, fs, color, coef)` est maintenant dans le socle : elle
TRACE la barre, comme `fleche_de_nom` dessine la flèche d'un vecteur. Le remède existait
déjà dans le dépôt — `radical()` de `manim/scripts/seconde/racine_carree_2de.py` — et il
a fallu aller le chercher. ⚠️ **E10 (cosinus, 1/√3) et E12 écrivent aussi des racines :
on réemploie `self.racine`, on n'en réécrit pas une.**
⚠️ Un radical est plus HAUT qu'un texte de la même police (0,07 au-dessus du radicande) :
toute cote d'un bloc qui en gagne un se remesure. C'est la même leçon que la flèche de
vecteur sur E7.

### ⛔⛔ « AB » EST UNE LONGUEUR, « A B⃗ » EST UN VECTEUR — et ici c'est le sujet

L'écran 03 écrit les deux côte à côte : **AB = ‖A B⃗‖**. Si les deux notations se
ressemblaient, il ne resterait rien à enseigner. Huit textes de cet épisode portent une
longueur et n'ont donc PAS de flèche ; chacun est inscrit **avec sa raison** dans
`PAS_DES_VECTEURS` (`auditer-fleches-vecteurs.py`), qui reste à **0 NU sur les neuf
scripts**. ⭐ C'est le point d'extension prévu de l'outil, et la table garde la trace de
chaque décision — exactement comme le `sans_audit` d'un épisode porte toujours sa raison.

> ⚠️⚠️ **ET CETTE TABLE EST GLOBALE, PAS PROPRE À UN ÉPISODE.** Les huit clés ajoutées
> sont des chaînes EXACTES (« AB », « AC = », « AG = », « la distance AB vaut »,
> « Que vaut la distance AB ? », « calcule la longueur AC, », « puis la longueur AG »,
> « « la distance AB vaut … » »). ⛔ Si E10, E11 ou E12 écrit l'une de ces chaînes pour
> désigner un VECTEUR, l'audit l'excusera en silence. Dans cette série un vecteur passe
> toujours par `self.vec` / `self.vexpr`, donc le cas ne devrait pas se produire — mais
> c'est écrit ici parce qu'un instrument qu'on a soi-même élargi mérite qu'on dise où il
> est devenu aveugle.

### ⛔⛔ UN NOM DE SOMMET TRAVERSÉ PAR UN FÛT — et `etiquettes()` ne pouvait pas le voir

Dans le cube ABCDEFGH, la grande diagonale A G passe à **0,00** du nom « D » et à
**0,10** du nom « F » : en cavalière A G se projette sur (1,41 ; 1,287) et frôle le
projeté de D (0,41 ; 0,287) comme celui de F (1 ; 1). Les deux lettres étaient barrées
par la flèche.
⛔ `etiquettes()` (épisode 8) compare les étiquettes **deux à deux** : une boîte contre
une boîte. Il ne voit jamais une boîte contre un SEGMENT.
⭐ `loin_des_fleches()` est le contrôle neuf : il échantillonne le segment (⛔ pas sa
boîte — la boîte d'une flèche en diagonale est un grand rectangle presque vide, leçon de
la passe des flèches) et mesure sa distance à chaque étiquette.
⚠️⚠️ **ET E8 DESSINE LA MÊME DIAGONALE DANS LE MÊME CUBE** : son HD est livré et ne
bouge pas, mais le défaut y est probablement aussi — à regarder si on le re-rend un jour.

### ⛔⛔ FUIR UNE FLÈCHE POUR TOMBER SUR UNE ARÊTE

Premier réflexe : écarter « D » vers la gauche et « F » vers la droite. Vu au gros plan
×2,8, les deux s'étaient posés **pile sur deux arêtes du cube**. ⛔ Un contrôle qui ne
connaît qu'une partie du dessin DÉPLACE le défaut au lieu de le corriger — et la première
version de `loin_des_fleches` ne testait que les deux diagonales.
⭐ Il teste maintenant **tout segment tracé** : les douze arêtes, les deux diagonales et
[C G]. Et les deux positions viennent d'une **recherche en grille** (pas de 0,06 entre
−0,9 et +0,9), qui garde ce qui est à plus de 0,11 de tout segment et à plus de 0,22 des
sept autres noms, puis classe par distance au sommet : D en haut à gauche (0,14 / 0,77),
F en bas à droite (0,17 / 0,55). ⚠️ `placer` donne la position **par rapport au SOMMET**,
jamais par rapport à la place que `cube()` avait donnée : une cote relative à une autre
cote se périme au premier changement de l'une des deux.

### ⛔⛔ UN SCHÉMA PEUT PORTER LES BONS NOMBRES ET MENTIR SUR SA FORME

Le triangle « 3-4-5 » de l'écran 06 avait un rapport de **1,50** au lieu de 1,333 : un
triangle étiqueté 3, 4, 5 qui n'était pas un 3-4-5, faux de 13 %. ⛔ Aucun outil ne peut
le dire — les trois nombres affichés sont exactement ceux que la voix prononce, le dessin
est dans la marge, et il est simplement FAUX. Vu sur la planche des figures seules.
⭐ Les cotes viennent maintenant d'une UNITÉ, et **deux assertions du module** les
revérifient à l'import : le 3-4-5 et le profil « 10 km à plat / 1 km de dénivelé » (dont
la hauteur doit faire exactement un dixième de la base, sinon l'image contredit la voix
qui dit « presque rien à la distance »). ⚠️ À faire pour tout schéma qui annonce une
proportion.

### ⛔⛔ TROIS DÉFAUTS DE PERSONNAGE, SIXIÈME ÉPISODE D'AFFILÉE — et une décision

La coureuse de la Diagonale des Fous, à ×3,2 :
1. **l'épaule était au milieu du buste** (défaut n° 1 de Jean-Bernard, E4, troisième
   récidive). Poussée sur le bord même du torse, le gros plan montrait alors un **trou
   noir** entre le torse et chaque bras. ⭐ **La solution n'est pas une cote, c'est
   l'ORDRE** : l'épaule rentre franchement dans le torse, et le torse est dessiné
   PAR-DESSUS — l'articulation disparaît sous le vêtement, comme sur un vrai dessin ;
2. **les deux bras étaient symétriques** : on lisait un haussement d'épaules, pas une
   foulée. C'est l'OPPOSITION des deux (avant qui remonte, arrière qui descend) qui dit
   le mouvement, et aucune cote ne la remplace ;
3. **le mollet arrière remontait** — une vraie foulée, illisible à cette taille : les
   deux pieds vont vers le bas.
⭐⭐ **ET LA DÉCISION : plus d'accessoire de tête.** Une queue de cheval en `Arc` posé par
`move_to` flottait détachée du crâne (`move_to` centre la BOÎTE d'un arc, pas son centre
de courbure) ; réécrite en segments partant de l'intérieur de la tête, elle se lisait
comme une **corne**. C'est le troisième épisode de suite où une coiffure coûte un tour —
la visière de Jean-Bernard (E4), le casque de Marc (E8), ces cheveux. Aucun personnage de
la série n'a de traits de visage ; **une tête nue est le gabarit de la maison**, et c'est
le DOSSARD qui dit « course ».

### ⛔ UN POINTILLÉ N'ATTEINT PAS SES EXTRÉMITÉS

Le sol du profil était une `DashedLine` : mesuré au gros plan ×2,6, le premier tiret
commençait **0,30 unité à droite du départ** et le triangle paraissait OUVERT à gauche.
⚠️ Et il n'avait aucune raison d'être pointillé — les dix kilomètres à plat sont
réellement parcourus, ce n'est pas un trait de construction. ⭐ Corollaire d'outil : une
cote ne se lit jamais sur une `DashedLine` (la mesure déduit la base de la montée et du
trajet, qui sont deux `Line` pleines).

### ⛔ UN `arrange` QUI EN DÉFAIT UN AUTRE — et seule la mesure l'a vu

`VGroup(croix, t1, t2)` puis `lA[1:].arrange(DOWN)` suivi de `lA.arrange(RIGHT)` : le
second `arrange` reprend LES TROIS enfants et défait le premier. Le bloc sortait en UNE
ligne de 10,34 de large au lieu de deux. ⛔ À la planche, deux lignes et une ligne se
ressemblent trop pour qu'on le remarque ; c'est le script de mesure qui l'a dit, par sa
hauteur. ⭐ On monte le groupe en DEUX ÉTAGES explicites, comme le fait E8.

### ⛔ UN GROS `AUDIT-TARD` CACHAIT TROIS VRAIES AVANCES — huitième fois de la série

Le contrôle de l'épisode 5 (relire à la main les plus gros TARD, triés par valeur) a servi
une fois de plus, et il a rapporté **trois** défauts d'un coup :

| signalement | la vraie mesure |
|---|---|
| `AUDIT-TARD 04b « 2 » (1 − 2 + 2 : les carrés…) **14,23 s**` | la voix finit « c'est la somme des coordonnées » à 21,67 s et ne dit « 1 moins 2 plus 2 » qu'à 23,56 s : **1,9 s d'AVANCE** |
| `AUDIT-TARD 09b « 2 » (2) **13,28 s**` | « Retiens ces deux résultats » finit à 28,25 s, « la diagonale d'une face vaut racine de 2 » à 32,54 s : **4,3 s d'AVANCE** sur √2, et 6,8 s sur √3 |
| `AUDIT-TARD 09b « 3 » (3) **10,07 s**` | même cause, dans le cadre final (« a racine de 2 » à 40,45 s, « et a racine de 3 » à 41,79 s) |

⭐ La règle qui les résume toutes : **un bloc qui porte plusieurs nombres que la voix
énumère ne se pose pas d'un coup** — il se remplit au rythme de la voix. Et l'extrait d'un
`au_fin` doit CONTENIR le dernier nombre de la ligne : « La somme des carrés fait 1 plus 1
plus zéro » s'arrête juste avant le total (« c'est-à-dire 2 »), et le total s'affichait
en avance.

### ⛔ L'ORDRE EST CELUI DE LA VOIX — et `verifier-avant-rendu.py` le dit AVANT le rendu

Écran 06 : la conclusion « au bac, la valeur exacte » est dite à 25,88 s, et « une norme
est toujours positive ou nulle » à 29,24 s. Écrite dans l'ordre de la PAGE — le bloc de
droite d'abord, la conclusion du bas ensuite — elle serait arrivée **3,36 s en retard**.
⭐ Le contrôle le signale en « RETARD probable » avec un écart NÉGATIF : deux ancres dans
le désordre se lisent à ce signe-là. Même défaut qu'à l'écran 03 de E8 (9,07 s), et il
tombait ici sur une consigne de bac.
⚠️ Il a aussi trouvé deux endroits où la voix ne laisse que **0,34 s** et **0,45 s** entre
deux phrases : remède du piège n° 6 des entiers — **on ne pose pas d'ancre, on enchaîne**,
le `play` précédent cale la ligne tout seul.

### ⭐ CE QUI A BIEN MARCHÉ, ET QU'IL FAUT REFAIRE

- **Étalonner `verifier-avant-rendu.py` avant de croire son zéro** : une copie du script
  avec UN `au_mot` faux, dans le répertoire temporaire. Il a crié — et dans la même sortie
  il a trouvé les trois vrais défauts ci-dessus.
- **La planche des FIGURES SEULES avant le premier rendu**, deuxième épisode de suite
  qu'elle paie : elle a attrapé le 3-4-5 faux, la queue de cheval détachée et le [C G]
  invisible. ⚠️ **Et la planche elle-même se mesure** : au premier jet ses figures se
  chevauchaient, et une planche illisible ne prouve rien.
- **Dessiner un escalier de coordonnées** (`Repere3D.point(..., escalier=True)`) : c'est
  la figure de cette micro, et elle est lisible du premier coup. ⛔ Elle encombre : un
  seul écran de l'épisode la demande.
- ⛔ **Ne pas poser un pointillé sur un trait déjà tracé** : [C G] dessiné en pointillé
  était INVISIBLE, parce que [C G] *est* une arête du cube. Un trait plein d'une autre
  couleur par-dessus, lui, se voit — et il porte la leçon (A C G est rectangle en C, donc
  A G² = A C² + C G²).

---

## ⛔⛔ Ce que l'épisode 10 a appris — à lire AVANT d'écrire l'épisode 11

Quinze défauts. **Un seul a été vu par Frédéric, à l'œil, et il valait les quatorze
autres.** Six n'ont été vus qu'au GROS PLAN, trois par `verifier-avant-rendu.py`, deux
par la mesure, deux étaient des TROUS D'INSTRUMENT, et un était une collision entre deux
sessions. ⭐ Et **deux des corrections ont DÉPLACÉ le défaut au lieu de le supprimer** :
c'est le sujet principal de cet épisode.

### ⛔⛔⛔ LE CUBE N'AVAIT QUE ONZE ARÊTES SUR DOUZE — depuis le premier épisode

Frédéric, devant une planche de figures : « vérifie le segment EH ». Mesuré :
`Repere3D.cube()` traçait `AB BC CD AD AE BF CG DH EF FG GH` — **onze**. Le haut du cube
était **OUVERT entre E et H**, dans la figure que **SIX** scripts sur dix dessinent
(recompté : espace_repere_coordonnees, espace_defi, ps_espace_calculer,
ps_espace_orthogonalite, ps_espace_norme_distance, ps_espace_angle — et SEPT voix en
parlent, ce qui est l'origine du « neuf » que je répétais sans l'avoir compté).

⛔⛔ **AUCUN instrument du dépôt ne pouvait le dire, et c'est la leçon.** Le dry run ne
regarde que les bords du cadre ; les scripts de mesure ne regardent que les cotes des
blocs ; `loin_des_fleches` et `etiquettes` comparent ce qui EST dessiné. Tous mesurent
**ce qui est là**. Aucun ne compte **ce qui manque** — et à la planche, une arête absente
ne saute pas aux yeux, puisqu'il n'y a rien à voir. C'est le défaut de l'épisode 8
(« cinq morceaux construits, quatre joués ») dans sa forme la plus pure : ici le morceau
n'était même pas construit.

⭐ Le contrôle est maintenant **exécuté à l'import** de `espace3d.py`, et il ne relit pas
la liste `vues` — ce serait se relire soi-même. Il relève les segments RÉELLEMENT
construits, retrouve leurs extrémités parmi les huit sommets, et compare aux douze paires
qui diffèrent d'exactement UNE coordonnée. Si une arête repart, l'import casse.
⭐⭐ **La règle générale** : pour une figure fermée (cube, tétraèdre, polygone), compter
les morceaux et les comparer à un compte CALCULÉ, jamais à la liste qui les produit.
✅ Les cinq épisodes livrés qui dessinent le cube ont été re-rendus (E2, E6, E7, E8, E9) :
0 échec, 0 bord, **durées identiques à la centiseconde**, les cinq cubes regardés à
l'image. L'arête ajoutée ne déplace rien — elle relie deux sommets déjà tracés.

### ⛔⛔ CORRIGER UN DÉFAUT PEUT LE DÉPLACER — deux fois dans le même épisode

C'est « fuir une flèche pour tomber sur une arête » (E9), et ça s'est produit deux fois :

| la correction | ce qu'elle a cassé |
|---|---|
| les deux normes de 09b passées à DEUX lignes, pour qu'on ne les lise plus comme un produit | le bloc a grandi de 0,68 **autour de son centre**, donc il est MONTÉ de 0,34 et la flèche de « ‖A G⃗‖ » entrait dans « 1 × 1 » |
| « Saint-Pierre » écarté de « Ravi » (buff 0,08 → 0,18) | « Saint-Pierre » s'est posé **sur le bord haut du cadre de conclusion**, 0,13 de recouvrement, le texte rayé d'un trait orange |

⭐⭐ **La règle** : changer la HAUTEUR d'un bloc oblige à recompter TOUS ses voisins, pas
seulement celui qu'on vient de corriger. Un `col()` ou un `gauche()` pose un bloc par son
CENTRE : le grandir le fait déborder des deux côtés à la fois.
⭐ Les deux remèdes qui ont tenu : une seule ligne avec un **point-virgule** (« ‖A G⃗‖ = √3
**;** ‖A B⃗‖ = 1 »), qui lève l'ambiguïté sans grandir le bloc ; et déplacer le
PERSONNAGE vers le haut plutôt que son étiquette vers le bas.

### ⛔⛔ DEUX TROUS D'INSTRUMENT, ET CE SONT EUX QUI ONT LAISSÉ PASSER LES DEUX

- **la colonne de droite de 09b n'était comparée à RIEN** : six blocs mesurés un par un,
  pas une seule paire. La mesure disait ✅ pendant que deux blocs se chevauchaient.
- **« Saint-Pierre » n'était mesuré qu'EN PAIRE avec « Ravi »** : son bas disparaissait
  dans la boîte commune, et le cadre qui le barrait n'était comparé à rien.

⭐⭐ **La règle, et elle vaut pour E11 et E12** : dans une colonne, on compare les blocs
**proche en proche** (`dessous()` sur chaque paire consécutive), et tout bloc qui a un
voisin au-dessus ou au-dessous est mesuré SEUL en plus de son groupe. La mesure de E10
porte la chaîne complète — c'est elle qu'on recopie, plus celle de E9.

### ⛔⛔ UNE ÉTIQUETTE SE PLACE DEPUIS LE SOMMET, ET SON ÉCART EST PERPENDICULAIRE AU FÛT

Trois étiquettes étaient TRAVERSÉES par leur propre fût, et la cause n'était pas la
distance mais la MÉTHODE, à deux étages :

1. je les posais par rapport à `g.get_center()`, **le centre de la BOÎTE du groupe**, qui
   pour un secteur de rayon 1 tombe à (0,5 ; 0,37) du sommet d'où partent les flèches.
   ⭐ `coin().sommet()` rend le point réel, lu APRÈS les `move_to` et les `scale` ;
2. je décalais vers le BAS ou le HAUT. Sur un fût à 45°, un `UP * 0,16` ne gagne que
   0,11 de distance réelle. ⭐ `ecart(p, signe, d)` décale **perpendiculairement** au fût.
   ⚠️ Le piège : avec `DOWN`, « u » (horizontal) passait et « v » (en diagonale) non — un
   réglage qui marche sur un objet et pas sur l'autre se lit comme une cote à affiner,
   alors que c'est la méthode qui est fausse.

### ⛔⛔ LA CAVALIÈRE NE CONSERVE AUCUN ANGLE — et cet épisode ne parle que d'angles

Mesuré avant d'écrire un écran :

| ce qu'on dessinerait | à l'écran | en vrai |
|---|---|---|
| u(1 ; 1 ; 0) par rapport à l'axe des x | **11,5°** | 45° |
| l'angle de u(1 ; 1 ; 0) et v(0 ; 1 ; 1) | 60,8° | 60° — juste **par chance** |
| l'angle de A⃗G et A⃗B (le défi) | **42,4°** | 54,7° — **douze degrés de mensonge** |

⭐ Les figures d'angle sont donc **PLANES** (`coin()`), comme `plan_dessine` de E8 : elles
ne prétendent pas montrer OÙ sont les vecteurs, elles montrent leur ANGLE — et il est
vérifié par une assertion du module. ⛔ Et dans le cube, l'arc ne porte **aucune valeur** :
c'est une convention, exactement comme le petit carré de `angle_droit`, qui n'est pas
droit à l'écran non plus. La valeur est dans la colonne, jamais sur la figure.
⛔⛔ **Un arc peut aussi porter la bonne valeur sur le MAUVAIS angle** : l'arc du
supplémentaire, écrit `start_angle=θ, angle=π−θ`, balayait bien 120°… du côté OPPOSÉ à
−v⃗. Il ne touchait NI u⃗ NI −v⃗. L'assertion du module ne portait que sur les FLÈCHES, et
120° est 120° : seule la planche des figures seules l'a vu.

### ⛔ L'ORDRE EST CELUI DE LA VOIX — 17,07 s, le plus gros écart de la série

`verifier-avant-rendu.py`, par un écart NÉGATIF entre deux ancres : la figure de l'écran
02, écrite dans l'ordre de la PAGE (la colonne de droite d'abord), arrivait **17,07 s en
retard**. La voix dit « Exemple : » à 15,43 s et la colonne court jusqu'à 32,50 s.
⭐ C'est le même contrôle qui a trouvé 3,36 s sur E9 et 9,07 s sur E8. Il paie à chaque
épisode. ⚠️ Et il a aussi attrapé un `au_fin("fois zéro, donc 1")` dont l'offset (168)
**n'a pas de marque** : il aurait pris silencieusement celle d'avant.

### ⭐⭐ LES 2 CUES « 577 » N'ÉTAIENT PAS UN DÉFAUT

Annoncées depuis E1 comme « à regarder en écrivant E10 ». Mesuré : « 577 » n'apparaît
**qu'une fois** dans le texte du clip, et WinRT en a émis **TROIS** (25,50 / 25,82 /
26,09 s) parce qu'il le lit « cinq cent soixante-dix-sept ». Le convertisseur place la
première à l'offset 326 — le début du nombre — et saute les deux autres **sans avancer** :
la marque est au bon endroit, et les 41 marques suivantes du clip sont justes.
⛔ Ce n'est PAS la règle « une décimale vaut 3 cues » (E6) : « 577 » est un ENTIER, et
`DECIMALE` ne l'attrape pas. C'est le garde-fou `SAUT_MAXI` qui fait le travail.
⭐⭐ **Un entier long (577, 101, 180) se comporte comme une décimale** — à savoir pour E11
et E12, qui en portent.

### ⛔⛔ DEUX SESSIONS ONT ÉCRIT DANS LE MÊME FICHIER, EN MÊME TEMPS

Une seconde session a été lancée sur E10 pendant que celle-ci y travaillait, sur une
information fausse (« E10 est écrit, son HD tourne » — le verrou tenait en fait le rendu
de E8). Les deux ont écrit dans `ps_espace_angle.py` et `mesure-ps-espace-angle.py`.
⭐ **Ce qui l'a révélé n'est pas une alerte, c'est un `assert`** : deux modifications ont
échoué parce que le texte avait changé sous elles. Sans ces `assert`, l'une aurait écrasé
l'autre en silence. ⚠️ `ListAgents` donne la réponse en une commande — à faire au moindre
doute, et non à supposer. ⭐ La collision s'est réglée entre les deux sessions, et le
travail de l'autre a été gardé : ses deux contrôles manquants sont ceux décrits plus haut.
⛔⛔ **Et la cote de Ravi était recopiée dans DEUX fichiers** : corrigée dans l'épisode et
pas dans la mesure, l'instrument a mesuré pendant un tour **un écran qui n'existait pas**
et a crié sur un défaut déjà corrigé. ⭐ Elle est maintenant une constante du module
(`POS_RAVI`), importée par la mesure. C'est la même forme que « la fiche et le registre
ont divergé » du même jour : **deux copies d'une seule vérité divergent dès qu'on en
touche une.**

### ⛔ LES AUTRES, vus au gros plan et par rien d'autre

- la flèche de « −v⃗ » coiffait **aussi le signe moins** : on lisait un double trait. Un
  vecteur opposé s'écrit « − » suivi de « v⃗ » — et le signe se centre à mi-hauteur, pas
  sur la ligne de base (`aligned_edge=DOWN` le posait au pied de la lettre) ;
- « 1 × 1+ 1 × 0+ 1 × 0= 1 » : à `buff` 0,06 les « + » collent au terme de gauche et se
  détachent de celui de droite. Quand la ligne doit tenir dans une largeur, c'est la
  POLICE qui cède, jamais l'espacement ;
- les mollets couleur PEAU sous un pantalon sombre se lisaient comme des **jambes nues**
  sur un installateur en gilet de chantier : un vêtement de travail est d'une pièce ;
- le bras bas de Ravi ne dépassait du torse que de **0,17** et se lisait comme un moignon.

### ⭐ CE QUI A BIEN MARCHÉ, ET QU'IL FAUT REFAIRE

- **Rendre une image d'essai des glyphes AVANT d'écrire un écran** : °, θ, ≤, |…|, ∈, ⟹,
  ⟺ — tous se dessinent. Dix secondes, et deux caractères de cette série sont déjà sortis
  en « tofu ».
- **La planche des FIGURES SEULES avant le premier rendu**, troisième épisode de suite
  qu'elle paie : elle a attrapé l'arc du supplémentaire posé du mauvais côté, le bras
  moignon, et la flèche combinante U+20D7 dans ses propres légendes.
- **Étalonner `verifier-avant-rendu.py`** sur une copie avec UN `au_mot` faux : il a crié,
  et dans la même sortie il a trouvé les deux vrais défauts.
- **Les durées AVANT/APRÈS comme témoin d'un re-rendu** : identiques à la centiseconde
  sur les cinq, c'est ce qui prouve qu'une correction de figure n'a rien déplacé d'autre.

---

## ⛔⛔ Les marques : « 0,5 » vaut TROIS marques

WinRT émet une marque par mot **prononcé**, pas par mot écrit. Il lit « 0,5 » comme
« zéro virgule cinq » : **trois marques sur le même texte source**. Sur
« 0,5 ; 0,5 ; 0,5 », cela fait NEUF cues pour trois nombres.

Mal traitées, les trois de trop se posent 155 caractères plus loin, sur le triplet
suivant de la phrase — et **toutes les cues d'après deviennent introuvables** : 150
caractères de leçon sans une seule marque, au milieu d'un écran. C'est
`verifier-avant-rendu.py` qui l'a dit (« PAS de marque à l'offset … »), pas la relecture.

`manim/poste2/cues2marques-espace.py` applique deux règles, et il a fallu trois
tentatives fausses pour les trouver :

1. **Une cue répétée qui porte autre chose que son premier jeton est une seconde
   émission** — « 2 moins », « 4 égale », ou « 0,5 » suivi d'un blanc (le point-virgule
   est rendu comme un espace). Une cue répétée **nue** (« 0 », « 1 ») est un vrai mot.
2. ⭐⭐ **Une cue avance d'UN MOT.** Un jeton retrouvé plus de 60 caractères plus loin
   est une marque en trop, pas un mot nouveau : on la saute **sans avancer**. C'est ce
   garde-fou qui rend le reste robuste.

Et la recherche se fait sur le premier jeton **en mot entier** : sans frontière, le
jeton « a » se pose dans « coordonnées ».

⛔⛔ **CES DEUX RÈGLES NE SUFFISAIENT PAS, ET IL A FALLU UNE TROISIÈME (22/11, E6).**
Elles tranchaient sur le BLANC que la ponctuation colle au jeton, et une décimale répétée
les met en défaut **dans les deux sens** — six cues gardées pour une, ou une pour deux.
La règle qui manquait est comptée, pas devinée : **une décimale vaut exactement 3 cues par
occurrence**, donc on garde la première de chaque groupe de 3. Détail, chiffres et effet
sur E2 : « Ce que l'épisode 6 a appris ».
✅ `ps_espace_angle` : ses 2 cues « 577 » ne sont pas un défaut (voir E10).

## ⛔ Écrire un nombre à la française

`str(0.5)` donne « 0.5 », avec un POINT. À l'écran d'un cours français c'est une faute,
et la voix dit « zéro virgule cinq ». Le socle a `self.nombre(v)` pour ça (virgule, et le
vrai signe − U+2212). ⚠️ L'audit l'attrape, mais sous une forme qui ne saute pas aux
yeux : `AUDIT-ABSENT « 5 » (0.5)`.

## ⛔ Un zéro se vérifie, un `head` se compte

⭐⭐ **Un diff a DEUX colonnes.** Le cas le plus discret de la journée, parce que le
chiffre faux était *plausible* : j'ai annoncé que le correctif des marques en avait
ajouté **279**. Vrai — mais il en avait aussi **retiré 202**, celles que le bug posait
155 caractères plus loin. Le net est **+77**, et le total réel **10 278**, pas 10 480.
Reconstruit depuis git, fichier par fichier :

```
4ce34fff5 (avant le correctif) : 10 201
30bf5f3ff (le correctif)       : 10 278      → net +77, et non +279
```

J'avais lu la colonne des ajouts sans lire celle des retraits. ⚠️ Et 202 marques
fantômes, c'est exactement le genre de chiffre qu'on recopie dans une note de reprise et
qui devient vrai pour tout le monde. ⭐ **Le contrôle qui tranche n'est jamais le
delta : c'est le TOTAL, recompté sur l'état final.**

⭐ **Et un total s'additionne sur la sortie, pas dans la tête.** J'ai annoncé « 10 480
marques » : c'était 10 201 + 279 calculé de mémoire, jamais mesuré. Le compte réel est
**10 278**, parce que deux fichiers avaient été réécrits entre-temps. Un chiffre qu'on
n'a pas produit par une commande n'est pas une mesure, c'est un souvenir.

Trois fois dans la même journée, un `head` ou un `tail -1` m'a fait conclure « rien à
signaler » alors que la sortie en portait des dizaines : 6 signalements d'audit au lieu
de 64, « 0 perte » de cues au lieu de 100, et un script copié hors de `manim/poste2/`
qui ne lisait **aucune** voix et annonçait « 0 alerte ». ⭐ Avant de croire un zéro :
compter les lignes de la sortie complète, et vérifier que l'outil a lu quelque chose.

## ⚠️ Lire un journal d'audit sans se tromper de cible

L'audit vérifie **chaque nombre de chaque texte** contre l'instant où la voix le prononce. Un
épisode de géométrie dans l'espace affiche des **triplets** : une ligne porte trois nombres
que la voix énumère en 2 à 3 secondes, et l'audit rattache chaque chiffre à sa **dernière
occurrence** dans la voix — souvent un autre triplet, dit bien plus tôt.

> Mesuré le 22/11 : `convexite_derivee_seconde`, **épisode publié**, 26 signalements dont 11
> au-dessus de 1,5 s. E1 après correction : du même ordre, et **0 `BORD`** des deux côtés.

⭐ **Ce qu'on cherche dans ce journal, c'est l'`AUDIT-ABSENT`** : un nombre à l'écran que la
voix ne dit **jamais**. Sur E1 il en a trouvé cinq vrais — les coordonnées inventées d'un
drone, deux chiffres écrits là où la voix dit « deux » et « trois » en lettres, et trois
triplets de vecteurs coplanaires. Ceux-là s'enseignent à l'élève. Les `TARD` sur un triplet,
non.

⛔ **Ne jamais résumer un journal d'audit avec `sort | uniq -c | head`** : j'ai cru avoir
6 signalements, j'en avais 64. Le `head` cachait les trois quarts.

---

## ⚠️ `verifier-zone-margo.py` crie sur tout épisode où Ti-Margo change de taille

Sur E1, l'outil annonce **88 instants où quelque chose recouvre Ti-Margo**. C'est un
faux positif, et il faut savoir le reconnaître sans rendre le HD pour rien.

Son étalon est la vidéo elle-même : « Ti-Margo seul » = le **minimum** de pixels allumés
dans son rectangle sur toute la vidéo. Or le gabarit maison le pose à des tailles
différentes selon l'écran — `add_mascotte(scale=0.8)` en page de garde, `0.65` à la
finale, `0.9` à l'abonnement, `0.5` partout ailleurs. Les écrans où il est plus GRAND
dépassent donc forcément le minimum.

⭐ **Le contrôle qui tranche, en une soustraction** : les 88 instants font 35,2 s à
0,4 s de pas, et les trois écrans à grande mascotte durent 12,4 + 16,3 + 6,5 = 35,2 s.
Exactement. Et le surplus est **constant** (~443 pixels) à l'intérieur d'un écran : un
texte qui tomberait sur lui ferait varier ce nombre d'une image à l'autre.

⛔ Ne pas « corriger » en uniformisant la taille de la mascotte : c'est le gabarit de la
maison. Lire la liste, vérifier que les instants coïncident avec les écrans à mascotte
agrandie, et passer. ⭐ L'outil garde tout son sens sur les écrans à `scale=0.5`, qui
sont la grande majorité — et c'est là qu'il a attrapé la poignée `@eleveai974` posée sur
sa tête, après 20 rendus HD.

## Les règles de contenu propres à cette série

- ⛔⛔ **Le dessin porte la DONNÉE, jamais la RÉPONSE.** Sur un écran de question, on place
  les points ; on ne trace pas le vecteur qui donnerait la réponse, ni les deux vecteurs
  colinéaires superposés. La figure arrive **dans le clip de réponse**.
- ⛔ **La place de la bonne réponse est tirée** (graine 2211, table dans
  `VOIX-espace-terminale.md`) : A 8 · B 8 · C 8 sur 24 questions, deux lettres différentes
  par épisode. L'écran, la voix et le champ `reponse` du manifeste disent **la même lettre**.
- ⚠️ **Les centres d'intérêt sont une liste FERMÉE** (`lib/videos/centres-interet.ts`, 18
  entrées, chacune avec ses tranches d'âge). ⛔ `metiers` **n'existe pas**. La terminale est
  la tranche `15-18`, qui en ouvre 16. Contrôle : `node scripts/verifier-centres-age.mjs`.
- ⭐ Le cube `ABCDEFGH` dans le repère (A ; AB, AD, AE) — **7 voix sur 12 en parlent,
  6 scripts le dessinent** (mesuré, voir plus haut) :
  A(0;0;0), B(1;0;0), C(1;1;0), D(0;1;0), E(0;0;1), F(1;0;1), G(1;1;1), H(0;1;1).

---

## Le rendu HD

⚠️ **Le verrou est unique sur la machine** (`$env:TEMP/eleveai-rendu-hd.lock`, mutex
`mkdir`/`rmdir`). Un verrou orphelin bloque tout le monde. ⭐⭐ **Le HD seulement quand on est
certain** : tout se contrôle en `-ql`, et l'écran final se relit **avant** le HD.

⛔⛔ **Un correctif de marques POSTÉRIEUR à un rendu rend ce rendu suspect.** Le HD de
E1 est daté 08:36 ; le correctif « 0,5 vaut trois marques » a réécrit les douze fichiers
à 08:44, huit minutes après. Le rendu avait-il été calé sur des marques périmées ? La
question ne se tranche pas à la date, elle se tranche sur le CONTENU :

```
git show <commit-du-rendu>:manim/scripts/terminale/<script>_marques.json > /tmp/avant.json
diff /tmp/avant.json manim/scripts/terminale/<script>_marques.json && echo "rendu valide"
```

Vérifié ainsi pour E1 : **fichier identique, 642 marques des deux côtés** — le bug du
« 0,5 » ne touchait pas cette voix-là, et son HD tient. ⭐ Deux commandes, et elles
valent une heure de rendu. ⚠️ C'est le même contrôle que la série des entiers avait
appris sur les dates de WAV : **la date ne prouve rien, le contenu tranche**.

⛔⛔ **L'heure d'un verrou se LIT, elle ne s'écrit pas de mémoire.** J'ai noté dans un
rapport « verrou pris à 09:05 » alors que `stat` disait 08:31 — un chiffre inventé, et
pas un détail de forme : **l'âge du verrou est le seul moyen de distinguer un rendu
vivant d'un orphelin**, et un orphelin bloque toute la machine. Un verrou daté d'une
heure qui n'est pas encore arrivée aurait fait conclure « orphelin, je casse » à la
session suivante — pendant un rendu.

```
stat -c '%n  cree %y' "$TEMP/eleveai-rendu-hd.lock"   # l'heure réelle
date '+maintenant : %H:%M:%S'                          # et l'écart
```

Un verrou de quelques minutes avec un `.hd.log` qui grossit = un rendu vivant, on
attend. Un verrou de plusieurs heures avec un log figé = un orphelin, on le retire.

```
PYTHONIOENCODING=utf-8 python -X utf8 -m manim render -qh --disable_caching \
  manim/scripts/terminale/<script>.py <Scene> -o eleveai-maths-terminale-<slug> \
  --media_dir manim/scripts/terminale/media-<slug>
```

Puis, à chaque épisode et **pas à la fin de la série** :
`node scripts/brancher-videos-coach.mjs --classe terminale-spe --tout`
(⚠️ `--classe terminale` sans `-spe` ne mesure rien et dit « notion inconnue »).
