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
| E1 `espace_vecteurs` | ✅ script écrit, `-ql` regardé, défauts corrigés |
| les 11 autres scripts | ⏳ **à écrire — ils ne dépendent plus de rien** |
| les 12 shorts | ⏳ pas de voix encore |
| les rendus HD, le branchement coach, les fiches YouTube | ⏳ |

**Ce qui débloque tout** : un épisode ne dépend plus que de son script Manim. Son fichier de
marques est déjà dans `manim/scripts/terminale/<script>_marques.json`, sa voix dans
`manim/voix/terminale-<…>.json`, ses WAV dans `public/sons/terminale-<…>/`.

---

## 🔁 La relève — ce qu'il faut savoir pour reprendre la série

*(écrit le 22/11/2026 à 60 % de contexte, par la session qui a produit E1 et E2 —
règle de Frédéric : une seule productrice par série, relève à 65 %.)*

**L'état exact**, vérifiable en trois commandes :

```
git log --oneline poste2 | head -12                  # 12 commits de la série
ls manim/sorties/terminale/maths/geometrie/*/*.mp4   # les HD livrés
python manim/poste2/verifier-voix-espace.py          # 12 voix, 15 clips, lettres A 8 B 8 C 8
```

**Le prochain geste, sans réfléchir** : écrire `espace_droite_parametrique.py` (E3).
Tout l'attend — sa voix, ses WAV, ses 792 marques, le socle. Le modèle le plus propre
est `espace_repere_coordonnees.py` (E2) : il ne contient que ses 15 écrans.

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
  clips de correction) : à regarder au moment d'écrire ces deux épisodes-là.

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
