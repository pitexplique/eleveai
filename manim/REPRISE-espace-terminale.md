# REPRISE — série « GÉOMÉTRIE DANS L'ESPACE », terminale spé (22/11/2026)

**12 épisodes = les 12 micro-compétences du coach**, 6 pour `geometrie_espace` et 6 pour
`produit_scalaire_espace`. Chacun : une vidéo paysage + un short. 24 vidéos.

> ⭐ Cette note est **vivante** : on y ajoute ce qui a coûté cher, pas ce qui a marché.
> Elle est à la série « espace » ce que `manim/REPRISE-entiers-cm1-6e.md` est aux entiers.
> ⛔ Lire celle des entiers AUSSI : ses 43 pièges valent ici, cette note ne les répète pas.

---

## Où en est la série

| pièce | état |
|---|---|
| les 12 voix | ✅ écrites, validées par Frédéric, passe maths **exécutée** |
| les 180 WAV + 12 fichiers de marques | ✅ faits (10 201 marques, 71 min de voix) |
| la boîte à outils de dessin | ✅ `manim/poste2/espace3d.py` + sa planche |
| E1 `espace_vecteurs` | ✅ script écrit, `-ql` regardé, défauts corrigés |
| les 11 autres scripts | ⏳ **à écrire — ils ne dépendent plus de rien** |
| les 12 shorts | ⏳ pas de voix encore |
| les rendus HD, le branchement coach, les fiches YouTube | ⏳ |

**Ce qui débloque tout** : un épisode ne dépend plus que de son script Manim. Son fichier de
marques est déjà dans `manim/scripts/terminale/<script>_marques.json`, sa voix dans
`manim/voix/terminale-<…>.json`, ses WAV dans `public/sons/terminale-<…>/`.

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

```
PYTHONIOENCODING=utf-8 python -X utf8 -m manim render -qh --disable_caching \
  manim/scripts/terminale/<script>.py <Scene> -o eleveai-maths-terminale-<slug> \
  --media_dir manim/scripts/terminale/media-<slug>
```

Puis, à chaque épisode et **pas à la fin de la série** :
`node scripts/brancher-videos-coach.mjs --classe terminale-spe --tout`
(⚠️ `--classe terminale` sans `-spe` ne mesure rien et dit « notion inconnue »).
