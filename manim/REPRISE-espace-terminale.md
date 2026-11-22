# REPRISE — série « GÉOMÉTRIE DANS L'ESPACE », terminale spé (22/11/2026)

**12 épisodes = les 12 micro-compétences du coach**, 6 pour `geometrie_espace` et 6 pour
`produit_scalaire_espace`. Chacun : une vidéo paysage + un short. 24 vidéos.

> ⛔⛔ **LES 12 ENTRÉES DE MANIFESTE N'EXISTENT QUE DANS
> `manim/poste2/FICHES-YOUTUBE-espace-terminale.md`, ET NULLE PART AILLEURS.**
> Mesuré le 22/11 : **0 entrée `espace` dans `manim/manifeste-youtube.json`**, et
> `brancher-videos-coach.mjs --classe terminale-spe` répond « Rien à brancher ».
> Tant que personne ne reporte ces entrées dans le registre au moment de la
> publication, **E1 est une vidéo qu'aucun élève ne peut atteindre** : elle existe en
> HD, et le coach ne la propose à personne.
> ⚠️ Une liste tenue à la main à côté d'un registre, c'est l'accident qui est déjà
> arrivé trois fois dans ce dépôt — des pages en ligne que rien ne déclarait. Le
> registre est partagé et se commit **par clés** (`manim/outils-commit-cles.py`) :
> c'est pour ça que la liste est à part, pas pour l'oublier.

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
| E1 `espace_vecteurs` | ✅ **HD livré** (5 min 02, 0 bord, planche HD regardée) |
| E2 `espace_repere_coordonnees` | ✅ **HD livré** (5 min 54, 0 bord, planche HD regardée) |
| E3 `espace_droite_parametrique` | ✅ **HD livré** (5 min 56, 0 bord, planche HD regardée) |
| E4 `espace_plan_equation` | ✅ **HD livré** (6 min 09, 0 bord, planche HD regardée) |
| E5 `espace_position_relative` | ✅ **HD livré** (6 min 34, 0 bord, planche HD regardée) |
| les 7 autres scripts | ⏳ **à écrire — ils ne dépendent plus de rien** |
| les 12 shorts | ⏳ pas de voix encore |
| les rendus HD, le branchement coach, les fiches YouTube | ⏳ |

**Ce qui débloque tout** : un épisode ne dépend plus que de son script Manim. Son fichier de
marques est déjà dans `manim/scripts/terminale/<script>_marques.json`, sa voix dans
`manim/voix/terminale-<…>.json`, ses WAV dans `public/sons/terminale-<…>/`.

---

## 🔁 La relève — ce qu'il faut savoir pour reprendre la série

*(écrit le 22/11/2026 par la session qui a produit E1 et E2, tenu à jour par celle qui a
produit E3 — règle de Frédéric : une seule productrice par série, relève à 65 %.)*

**L'état exact**, vérifiable en trois commandes :

```
git log --oneline poste2 | head -12                  # 12 commits de la série
ls manim/sorties/terminale/maths/geometrie/*/*.mp4   # les HD livrés
python manim/poste2/verifier-voix-espace.py          # 12 voix, 15 clips, lettres A 8 B 8 C 8
```

**Le prochain geste, sans réfléchir** : écrire `espace_defi.py` (E6).
Tout l'attend — sa voix dans `manim/poste2/VOIX-espace-terminale.md`, ses WAV, ses marques,
et un socle qui a maintenant tout ce qu'il faut : `systeme`, `ligne_param`, `eq_plan`,
`eq_zero`, `choix3`, `au_fin`, `trip(par=True)`, `q_tete(largeur, xl)`, et — dans
`espace3d.py` — `platitude()` et `plan_dessine()`.
⚠️ **E6 garde 13 cues non placées**, toutes dans des clips de correction : les regarder
AVANT d'écrire ses écrans, pas après (`manim/poste2/cues2marques-espace.py`).
⭐ Le modèle le plus propre est **`espace_position_relative.py` (E5)** : quinze écrans,
chaque `sans_audit` porte sa raison écrite à côté, chaque cote est MESURÉE hors rendu, et
chaque correction d'image est commentée à l'endroit où elle a été payée.
⛔ Lire d'abord « Ce que l'épisode 3 a appris », « Ce que l'épisode 4 a confirmé » et
« Ce que l'épisode 5 a appris » plus bas : ensemble elles disent où regarder en premier,
et ce qu'aucun outil ne voit. ⭐ Celle de E5 est la plus utile des trois, parce que deux
de ses défauts étaient dans les OUTILS et touchent donc les sept épisodes qui restent.

**L'ordre pour chaque épisode, sans en sauter un :**

1. lire la voix du `.md` et poser un écran par clip ;
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
- `espace_defi` garde **13** cues non placées et `ps_espace_angle` **2** (toutes dans des
  clips de correction) : à regarder au moment d'écrire ces deux épisodes-là — et
  `espace_defi`, c'est **le prochain**.

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

### 4. Les trois contrôles, et leur moment

| Outil | Quand | Ce qu'il attrape |
|---|---|---|
| `manim/poste2/verifier-avant-rendu.py <script.py> <Scene>` | **avant le dry run** | un `au_mot` sans marque à son offset exact, une question qui n'est pas dans la voix mot pour mot |
| `AUDIT=1 BORDS=1 … --dry_run` | **avant le `-ql`** | un nombre affiché que la voix ne dit pas, un objet hors de la marge de 3 % |
| `scripts/planche-video.py` **+** `manim/poste2/apercu-instants.py` | **sur le `-ql`, avant le HD** | ce qui est réellement affiché — et **rien d'autre ne le voit** |
| un **recadrage PIL ×2,5 à ×3** sur la figure de l'épisode | **sur le `-ql`, après la planche** | ce qu'une vignette à trois colonnes ne montre pas : sur E5, deux défauts de la figure du pont, dont « la route ne passe sous le pont nulle part » |

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

⚠️ Deux épisodes gardent des cues non placées, à regarder quand leur script s'écrira :
`espace_defi` (13) et `ps_espace_angle` (2).

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
- ⭐ Le cube `ABCDEFGH` dans le repère (A ; AB, AD, AE) revient dans **9 épisodes sur 12** :
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
