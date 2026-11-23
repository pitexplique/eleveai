# Fiches YouTube — série « GÉOMÉTRIE DANS L'ESPACE », terminale spé

✅ **LES NEUF ÉPISODES RENDUS SONT DANS `manim/manifeste-youtube.json` (23/11/2026).**
Ils n'y étaient pas : mesuré le 22/11, le registre portait 1 707 vidéos et **zéro**
entrée « espace ». Neuf vidéos existaient en HD et n'atteignaient personne.

⛔ **Ce fichier-ci n'est plus la source du registre : il en est la source RÉDIGÉE.**
Le report est fait par `python -X utf8 manim/poste2/fiches-espace-vers-registre.py`
(`--ecrire` pour toucher le registre), qui relit les blocs JSON, l'accroche et les
chapitres d'ici, va chercher la lettre et l'instant de chaque question dans le JOURNAL
DU RENDU HD, le texte des questions dans la VOIX, et **refuse d'écrire** si les trois
sources ne disent pas la même lettre. ⛔ Ne plus recopier une entrée à la main : une
liste tenue à la main à côté d'un registre est l'accident déjà arrivé trois fois ici.
Le registre est partagé : le commit se fait **par clés** (`manim/outils-commit-cles.py`).

⚠️ **Il manque la miniature de chaque épisode** (`…/<slug>.png`) : aucun des douze n'en
a, et le chemin est déclaré dans l'entrée. ⛔ **`publier-youtube.mjs` ne peut donc pas
publier** — c'est le seul verrou qui reste entre ces neuf vidéos et un élève.
⚠️ Et tant qu'une vidéo n'est pas publiée, `brancher-videos-coach.mjs` répond « Rien à
brancher » — mesuré le 22/11 sur `--classe terminale-spe`.

---

## E1 · `terminale-espace-vecteurs` — ✅ rendu HD fait (REFAIT le 22/11 : notation fléchée)

`manim/sorties/terminale/maths/geometrie/espace-vecteurs/eleveai-maths-terminale-espace-vecteurs.mp4`
5 min 02 (302,4 s) · 19,0 Mo · 0 instant qui touche un bord · planche HD regardée.
⭐ **Rendu refait le 22/11** avec la notation vectorielle fléchée : 13 textes passés à
`vec` / `vexpr` et 6 étiquettes de figure fléchées (défaut de `Repere3D.vecteur`).
Durée inchangée — rien de la voix n'a bougé, seul l'écran.

```json
{
  "id": "terminale-espace-vecteurs",
  "notionId": "geometrie_espace",
  "microId": "espace_vecteurs",
  "classe": "terminale-spe",
  "ceinture": "verte",
  "serie": "Maths Tle spé",
  "type": "longue",
  "fichier": "terminale/maths/geometrie/espace-vecteurs/eleveai-maths-terminale-espace-vecteurs.mp4",
  "miniature": "terminale/maths/geometrie/espace-vecteurs/eleveai-maths-terminale-espace-vecteurs.png",
  "titre": "Trois nombres au lieu de deux — Vecteurs dans l'espace · Tle spé",
  "centres": ["technologie-ia"],
  "tags": ["vecteurs", "espace", "colinéaires", "coordonnées", "terminale", "bac"]
}
```

**Accroche** (à relire par Frédéric avant publication) :

> Nadia pilote des drones de chantier. Pour placer un drone, elle donne trois nombres :
> combien vers la droite, combien en profondeur, combien en hauteur. Dans l'espace, un
> point, c'est exactement cela — et un vecteur aussi.
>
> Dans cette vidéo :
> • un vecteur de l'espace a trois coordonnées, et A B, c'est arrivée moins départ
> • on additionne coordonnée par coordonnée, on multiplie les trois à la fois
> • colinéaires : un seul et même nombre multiplie les TROIS coordonnées
> • le piège : deux vecteurs non colinéaires n'engendrent qu'un plan — dans l'espace,
>   trois vecteurs peuvent être deux à deux non colinéaires et rester coplanaires
>
> Deux questions-pauses et un défi corrigé. Entraîne-toi sur eleveai.fr

**Chapitres** (⛔ ils partent VERBATIM dans la description YouTube :
descriptifs, avec une majuscule, jamais un nom de clip interne) :
0:00 Trois nombres au lieu de deux · 0:12 Nadia place ses drones avec trois nombres · 0:33
Arrivée moins départ · 0:57 Les règles · 1:15 Question 1 · 1:39 Réponse : un vecteur
vertical · 1:55 Somme et multiple · 2:14 Le piège · 2:36 Question 2 · 3:03 Réponse : le même
facteur pour les trois coordonnées · 3:22 Au bac · 3:43 À toi de jouer · 4:10 Correction ·
4:39 Ce que tu as appris.
---

## E2 · `terminale-espace-repere-coordonnees` — ✅ rendu HD fait (REFAIT le 22/11 : notation fléchée)

`manim/sorties/terminale/maths/geometrie/espace-repere-coordonnees/eleveai-maths-terminale-espace-repere-coordonnees.mp4`
5 min 54 (354,0 s) · 21,4 Mo · **0 instant qui touche un bord** · planche HD regardée.
⭐ **Rendu refait le 22/11** avec la notation vectorielle fléchée : 4 textes passés à
`vec` / `vexpr` (aucune étiquette de figure nommée dans cet épisode). ⭐ Son écran 09b
est le cas d'école de la série : « I J » et « A D » FLÉCHÉS (les vecteurs), puis
« (I J) et (A D) sont parallèles » entre parenthèses (les droites) — c'est exactement ce
que l'écran démontre. Durée inchangée, rien de la voix n'a bougé.
⭐ Marques vérifiées inchangées depuis le commit du rendu (le contrôle du correctif tardif).

```json
{
  "id": "terminale-espace-repere-coordonnees",
  "notionId": "geometrie_espace",
  "microId": "espace_repere_coordonnees",
  "classe": "terminale-spe",
  "ceinture": "verte",
  "serie": "Maths Tle spé",
  "type": "longue",
  "fichier": "terminale/maths/geometrie/espace-repere-coordonnees/eleveai-maths-terminale-espace-repere-coordonnees.mp4",
  "miniature": "terminale/maths/geometrie/espace-repere-coordonnees/eleveai-maths-terminale-espace-repere-coordonnees.png",
  "titre": "Le cube où tout vaut 0 ou 1 — Coordonnées dans l'espace · Tle spé",
  "centres": ["transports"],
  "tags": ["coordonnées", "repère", "milieu", "cube", "espace", "terminale", "bac"]
}
```

**Accroche** (à relire par Frédéric) :

> Lila est magasinière dans un entrepôt du Port. Chaque colis a une adresse à trois
> nombres : l'allée, la profondeur, l'étage. Dans l'espace, un point, c'est exactement
> cela — et quand on choisit bien son repère, toute la géométrie devient du calcul.
>
> Dans cette vidéo :
> • trois coordonnées, toujours dans l'ordre x, y, z
> • le milieu, c'est la moyenne — trois fois
> • le repère du cube (A ; AB, AD, AE) : les huit sommets ne sont que des 0 et des 1
> • les quatre grandes diagonales se coupent au centre
> • le piège : dans un pavé droit, les coordonnées tiennent, les longueurs NON —
>   distances et angles ne marchent que si le repère est orthonormé
>
> Deux questions-pauses et un défi corrigé. Entraîne-toi sur eleveai.fr

**Chapitres** (⛔ ils partent VERBATIM dans la description YouTube :
descriptifs, avec une majuscule, jamais un nom de clip interne) :
0:00 Trois nombres, une moyenne, un repère · 0:11 Lila et les adresses à trois nombres de
l'entrepôt · 0:34 Le repère du cube · 1:09 Le milieu · 1:29 Question 1 · 1:54 Réponse : le
milieu, moyenne par moyenne · 2:15 Les diagonales · 2:54 Le piège du pavé · 3:31 Question 2
· 3:52 Réponse : un pas dans chacune des trois directions · 4:12 La première ligne de la
copie · 4:35 À toi de jouer · 4:53 Correction · 5:29 Ce que tu as appris.
---

## E3 · `terminale-espace-droite-parametrique` — ✅ rendu HD fait (REFAIT le 22/11 : notation fléchée)

`manim/sorties/terminale/maths/geometrie/espace-droite-parametrique/eleveai-maths-terminale-espace-droite-parametrique.mp4`
5 min 56 (355,7 s) · 25,0 Mo · **0 instant qui touche un bord** · planche HD regardée.
⭐ **Rendu refait le 22/11** avec la notation vectorielle fléchée : 3 textes passés à
`vec` / `vexpr` + son étiquette de figure. ⚠️ Et un changement de CONTENU : la consigne du
défi écrit maintenant « (A B) », la DROITE — la voix dit « la droite A B », alors que la
correction, elle, parle du VECTEUR A B et le flèche. Durée inchangée.
⭐ Marques vérifiées inchangées depuis le correctif du « 0,5 » (`30bf5f3ff`) : 792 marques,
fichier identique — le rendu est calé sur des marques à jour.
⭐ `grep -c "self\.au_t("` → **0** : aucun instant relevé à la main, donc rien qui se
périme si la voix est régénérée (piège n° 37 de la série des entiers).

```json
{
  "id": "terminale-espace-droite-parametrique",
  "notionId": "geometrie_espace",
  "microId": "espace_droite_parametrique",
  "classe": "terminale-spe",
  "ceinture": "verte",
  "serie": "Maths Tle spé",
  "type": "longue",
  "fichier": "terminale/maths/geometrie/espace-droite-parametrique/eleveai-maths-terminale-espace-droite-parametrique.mp4",
  "miniature": "terminale/maths/geometrie/espace-droite-parametrique/eleveai-maths-terminale-espace-droite-parametrique.png",
  "titre": "Un point, une direction, un curseur — Représentation paramétrique · Tle spé",
  "centres": ["transports"],
  "tags": ["représentation paramétrique", "droite", "vecteur directeur", "espace", "terminale", "bac"]
}
```

**Accroche** (à relire par Frédéric avant publication) :

> Soraya est contrôleuse aérienne. Sur son écran, un avion en montée suit une ligne droite :
> chaque minute il avance de la même façon, tant vers l'est, tant vers le nord, tant en
> altitude. Si elle connaît sa position maintenant et son avancée par minute, elle sait où il
> sera dans sept minutes. Une représentation paramétrique, c'est exactement cela.
>
> Dans cette vidéo :
> • une droite, c'est un point et une direction — et trois lignes suffisent à l'écrire
> • les coefficients de t donnent le vecteur directeur, les nombres seuls donnent un point
> • tester un point : la première équation donne t, et les deux autres doivent suivre avec
>   LE MÊME t — deux lignes sur trois, cela ne compte pas
> • le piège : une même droite a une infinité de représentations paramétriques, et deux
>   systèmes différents ne veulent pas dire deux droites différentes
> • la rédaction du bac, dans les deux sens : donner la droite, tester un point
>
> Deux questions-pauses et un défi corrigé. Entraîne-toi sur eleveai.fr

**Chapitres** (⛔ ils partent VERBATIM dans la description YouTube :
descriptifs, avec une majuscule, jamais un nom de clip interne) :
0:00 Un point de départ, une direction, un curseur · 0:11 Soraya suit un avion en montée sur
son écran · 0:38 Un point, une direction · 1:08 Tout se lit dans les trois lignes · 1:28
Question 1 · 1:52 Réponse : le vecteur directeur se lit sur les coefficients de t · 2:17
Tester un point · 2:48 Le piège · 3:27 Question 2 · 3:52 Réponse : on teste t sur les trois
lignes · 4:17 Au bac · 4:42 À toi de jouer · 5:01 Correction · 5:30 Ce que tu as appris.
---

## E4 · `terminale-espace-plan-equation` — ✅ rendu HD fait

`manim/sorties/terminale/maths/geometrie/espace-plan-equation/eleveai-maths-terminale-espace-plan-equation.mp4`
6 min 09 (369,1 s) · 23,5 Mo · **0 instant qui touche un bord** · planche HD regardée.
⭐ Marques vérifiées inchangées depuis le correctif du « 0,5 » (`30bf5f3ff`) : 826 marques,
fichier identique — le rendu est calé sur des marques à jour.
⭐ `grep -c "self\.au_t("` → **0** : aucun instant relevé à la main, donc rien qui se
périme si la voix est régénérée (piège n° 37 de la série des entiers).

```json
{
  "id": "terminale-espace-plan-equation",
  "notionId": "geometrie_espace",
  "microId": "espace_plan_equation",
  "classe": "terminale-spe",
  "ceinture": "verte",
  "serie": "Maths Tle spé",
  "type": "longue",
  "fichier": "terminale/maths/geometrie/espace-plan-equation/eleveai-maths-terminale-espace-plan-equation.mp4",
  "miniature": "terminale/maths/geometrie/espace-plan-equation/eleveai-maths-terminale-espace-plan-equation.png",
  "titre": "Une seule ligne décrit un plan entier — Équation cartésienne · Tle spé",
  "centres": ["sciences"],
  "tags": ["équation cartésienne", "plan", "espace", "coefficients", "terminale", "bac"]
}
```

**Accroche** (à relire par Frédéric avant publication) :

> Jean-Bernard est charpentier. Quand il pose un pan de toiture, il travaille sur une
> surface parfaitement plate, ni horizontale ni verticale. Pour dire à la machine de découpe
> où se trouve ce pan, il ne lui donne pas des milliers de points : il lui donne une
> équation. Une seule ligne, et le plan entier est décrit.
>
> Dans cette vidéo :
> • tout plan de l'espace a une équation de la forme a x + b y + c z + d = 0
> • un point y appartient si et seulement si ses coordonnées ANNULENT l'équation —
>   pas « presque zéro » : zéro
> • on trouve le terme constant d en remplaçant par un point connu
> • le piège, et il est énorme : dans l'espace, UNE équation donne un PLAN, jamais une
>   droite — « z = 0 » n'est pas un point de hauteur nulle, c'est le sol tout entier
> • la rédaction du bac en trois lignes, dont la vérification qui attrape les erreurs de signe
>
> Deux questions-pauses et un défi corrigé. Entraîne-toi sur eleveai.fr

**Chapitres** (⛔ ils partent VERBATIM dans la description YouTube :
descriptifs, avec une majuscule, jamais un nom de clip interne) :
0:00 Une seule équation, trois inconnues · 0:11 Jean-Bernard pose un pan de toiture · 0:34
Une équation, un plan · 1:08 Si et seulement si · 1:25 Question 1 · 1:47 Réponse : le point
qui annule l'équation · 2:12 Trouver l'équation · 2:48 Le piège · 3:26 Question 2 · 3:45
Réponse : « y égale 1 » est un plan, pas une droite · 4:15 Au bac · 4:39 À toi de jouer ·
5:03 Correction · 5:39 Ce que tu as appris.
---

## E5 · `terminale-espace-position-relative` — ✅ rendu HD fait

`manim/sorties/terminale/maths/geometrie/espace-position-relative/eleveai-maths-terminale-espace-position-relative.mp4`
6 min 34 (394,3 s) · 26,2 Mo · **0 instant qui touche un bord** · planche HD regardée.
⭐ Marques prouvées à jour : **877 marques**, fichier identique à HEAD, et le correctif
du « 0,5 » (`30bf5f3ff`) n'a jamais touché ce fichier-là — ses marques sont celles de
`4ce34fff5` et elles sont bonnes (contrôle par le CONTENU, pas par la date).
⭐ `grep -c "self\.au_t("` → **0** : aucun instant relevé à la main, donc rien qui se
périme si la voix est régénérée (piège n° 37 de la série des entiers).
⚠️ `verifier-zone-margo` : 39 instants, qui font exactement les trois écrans à grosse
mascotte (garde 11 s ≈ 10,8 · finale 21 s ≈ 20,8 · abonnement 7 s ≈ 6,4) et dont le
surplus est constant dans chacun. **Aucun écran de question touché** — c'est le critère.

```json
{
  "id": "terminale-espace-position-relative",
  "notionId": "geometrie_espace",
  "microId": "espace_position_relative",
  "classe": "terminale-spe",
  "ceinture": "verte",
  "serie": "Maths Tle spé",
  "type": "longue",
  "fichier": "terminale/maths/geometrie/espace-position-relative/eleveai-maths-terminale-espace-position-relative.mp4",
  "miniature": "terminale/maths/geometrie/espace-position-relative/eleveai-maths-terminale-espace-position-relative.png",
  "titre": "Deux droites qui ne se croisent jamais, sans être parallèles — Positions relatives · Tle spé",
  "centres": ["transports"],
  "tags": ["positions relatives", "droite et plan", "deux plans", "non coplanaires", "espace", "terminale", "bac"]
}
```

**Accroche** (à relire par Frédéric avant publication) :

> Pense à une route qui passe sous un pont. Vue d'en haut, les deux tracés se croisent.
> Dans l'espace, ils ne se rencontrent jamais — et ils ne sont pas parallèles non plus.
> Dans le plan, cette situation n'existe pas. Dans l'espace, c'est la plus fréquente.
>
> Dans cette vidéo :
> • droite et plan : on remplace x, y et z dans l'équation, et on lit l'équation en t —
>   une solution (sécants), aucune (strictement parallèle), ou toutes (contenue)
> • deux plans : on compare les coefficients, puis on teste un point ; 2x + 2y + 2z + 5 = 0
>   est parallèle à x + y + z − 1 = 0, et il ne lui est PAS confondu
> • le piège, et il coûte des points : pour deux droites, pas de point commun ne veut
>   PAS dire parallèles — ça veut souvent dire non coplanaires, et aucun plan ne les
>   contient toutes les deux
> • la méthode annoncée au bac, et le mot exact : sécants, strictement parallèles,
>   confondus, ou non coplanaires
>
> Deux questions-pauses et un défi corrigé. Entraîne-toi sur eleveai.fr

**Chapitres** (⛔ ils partent VERBATIM dans la description YouTube :
descriptifs, avec une majuscule, jamais un nom de clip interne) :
0:00 Ne jamais se rencontrer sans être parallèles · 0:10 La route et le pont · 0:33 Droite
et plan · 1:16 Trois cas · 1:39 Question 1 · 2:06 Réponse : « 3 égale zéro » est faux pour
tout t · 2:32 Deux plans · 3:07 Le piège · 3:42 Question 2 · 4:07 Réponse : aucun point
commun ne veut pas dire parallèles · 4:28 Au bac · 5:01 À toi de jouer · 5:25 Correction ·
6:06 Ce que tu as appris.
---

## E6 · `terminale-espace-defi` — ✅ rendu HD fait (REFAIT le 22/11 : notation fléchée)

`manim/sorties/terminale/maths/geometrie/espace-defi/eleveai-maths-terminale-espace-defi.mp4`
6 min 49 (409,4 s) · 28,1 Mo · **0 instant qui touche un bord** · planche HD regardée.
⭐ **Rendu refait le 22/11** avec la notation vectorielle fléchée : 6 textes passés à
`vec` / `vexpr`, **dont deux cartes de choix** (c'est pour elles que `choix2` / `choix3`
acceptent désormais `noms=`). ⚠️ Trois cotes ont dû bouger avec : les cartes de l'écran 07
(recoupées et à 24 px, sinon les flèches les faisaient tomber de 25,8 à 20,4 px), le bloc
« la même norme » de 07b et le système de 09b. Durée inchangée.
⭐ Marques : **923**, et elles ont été RÉÉCRITES avant ce rendu — le convertisseur
de la série perdait les décimales répétées, et huit marques de cette voix tombaient sur le
mauvais mot (jusqu'à 4,3 s d'avance sur un choix de question). Détail, chiffres et effet
sur les autres voix : `manim/REPRISE-espace-terminale.md`, « Ce que l'épisode 6 a appris ».
⭐ `grep -c "self\.au_t("` → **0** : aucun instant relevé à la main, donc rien qui se
périme si la voix est régénérée (piège n° 37 de la série des entiers).
⚠️ `verifier-zone-margo --pas 1.0` : **41 instants**, qui font exactement les trois écrans
à grosse mascotte — garde 11 s (00:00 → 00:10), finale 23 s (06:19 → 06:41), abonnement
7 s (06:42 → 06:48) — et dont le surplus est constant à l'intérieur de chacun (≈ +440,
+462, +82 pixels). **Aucun écran de question touché** : c'est le critère.
⚠️ Cet épisode n'a **pas de personnage** : sa voix ne nomme personne, son contexte est
l'exercice du bac lui-même. La figure regardée au gros plan (×2,8) est donc LE CUBE, sur
les quatre écrans où il porte quelque chose.

```json
{
  "id": "terminale-espace-defi",
  "notionId": "geometrie_espace",
  "microId": "espace_defi",
  "classe": "terminale-spe",
  "ceinture": "verte",
  "serie": "Maths Tle spé",
  "type": "longue",
  "fichier": "terminale/maths/geometrie/espace-defi/eleveai-maths-terminale-espace-defi.mp4",
  "miniature": "terminale/maths/geometrie/espace-defi/eleveai-maths-terminale-espace-defi.png",
  "titre": "Trois points sont toujours dans un même plan — et ça ne démontre rien · Exercice type bac dans l'espace · Tle spé",
  "centres": ["jeux-defis"],
  "tags": ["exercice type bac", "cube ABCDEFGH", "repère de l'espace", "alignement", "colinéarité", "intersection droite plan", "espace", "terminale", "bac"]
}
```

**Accroche** (à relire par Frédéric avant publication) :

> Au bac, l'exercice de géométrie dans l'espace a presque toujours la même forme : un
> solide, un repère donné par l'énoncé, puis une suite de questions qui montent — des
> coordonnées, puis une droite, puis un plan, puis une intersection. Chaque question
> prépare la suivante. Celui qui connaît le fil ne se perd pas.
>
> Dans cette vidéo :
> • le cube ABCDEFGH et le repère (A ; AB, AD, AE) : les huit sommets ne contiennent que
>   des zéros et des uns — et l'arête vaut 1, même si ton brouillon dit 6 cm
> • la boîte à outils en quatre objets : coordonnées et milieux, colinéarité,
>   représentation paramétrique, équation cartésienne — et le geste qui relie tout
> • A, le centre du cube et G alignés en deux lignes : AG = 2 AΩ
> • le piège qui coûte des points : sur une figure en perspective, (AC) et (EB) semblent
>   se croiser alors qu'elles ne sont pas coplanaires
> • et le plus beau leurre de la série : « trois points sont dans un même plan » est une
>   phrase vraie, et elle ne démontre jamais rien
>
> Deux questions-pauses et un défi corrigé : le plan P : x + z − 1 = 0, la droite (AG), et
> leur point d'intersection — qui est le centre du cube, et ce n'est pas un hasard.
> Entraîne-toi sur eleveai.fr

**Chapitres** (⛔ ils partent VERBATIM dans la description YouTube :
descriptifs, avec une majuscule, jamais un nom de clip interne) :
0:00 Un cube, un repère, quatre questions · 0:10 Toujours la même forme · 0:37 Avant tout
calcul · 1:01 La boîte à outils · 1:28 Question 1 · 1:56 Réponse : le centre du cube est le
milieu de [AG] · 2:19 Montrons un alignement · 2:58 Le piège · 3:38 Question 2 · 4:05
Réponse : chercher k tel que AC = k AB · 4:30 Le squelette d'une copie · 4:54 À toi de jouer
· 5:22 Correction · 6:19 Ce que tu as appris.
---

## E7 · `terminale-ps-espace-calculer` — ✅ rendu HD fait

`manim/sorties/terminale/maths/geometrie/ps-espace-calculer/eleveai-maths-terminale-ps-espace-calculer.mp4`
6 min 33 (393,7 s) · 24,9 Mo · **0 instant qui touche un bord** · planche HD regardée.
⭐ Marques : **890**, contrôlées avec le convertisseur corrigé (celui qui perdait les
décimales répétées) : 0 cue non placée, fichier identique à celui du dépôt. Le rendu est
donc calé sur des marques à jour, et le contrôle par le CONTENU le prouve.
⭐ `grep -c "self\.au_t("` → **0** : aucun instant relevé à la main, donc rien qui se
périme si la voix est régénérée (piège n° 37 de la série des entiers).
⚠️ `verifier-zone-margo --pas 1.0` : **38 instants**, qui font exactement les trois écrans
à grosse mascotte — garde 10,8 s (00:00 → 00:10), finale 20,3 s (06:06 → 06:26),
abonnement 6,1 s (06:27 → 06:32), soit 37,2 s pour 38 relevés au pas de 1 s — et dont le
surplus est constant à l'intérieur de chacun (+440, +463, +80 pixels, à ±6 près).
**Aucun écran de question touché** : c'est le critère.
⭐⭐ **PREMIER ÉPISODE DE LA SÉRIE AVEC LA NOTATION VECTORIELLE FLÉCHÉE** (demandée par
Frédéric le 22/11). E1 à E6 ne l'ont pas : ils sont à reprendre, et ils ne sont devant
aucun élève (0 entrée `espace` au manifeste). Détail de l'outil : `self.vec` et
`self.vexpr` dans `manim/poste2/espace_ecrans.py`, et « Ce que l'épisode 7 a appris »
dans `manim/REPRISE-espace-terminale.md`.
⚠️ Le personnage est **Kelly, kitesurfeuse à l'Hermitage**. Regardée au gros plan (×2,8),
son aile était un BOL (arc retourné) et elle n'avait pas de jambes — deux défauts
invisibles sur la vignette à trois colonnes.

```json
{
  "id": "terminale-ps-espace-calculer",
  "notionId": "produit_scalaire_espace",
  "microId": "ps_espace_calculer",
  "classe": "terminale-spe",
  "ceinture": "verte",
  "serie": "Maths Tle spé",
  "type": "longue",
  "fichier": "terminale/maths/geometrie/ps-espace-calculer/eleveai-maths-terminale-ps-espace-calculer.mp4",
  "miniature": "terminale/maths/geometrie/ps-espace-calculer/eleveai-maths-terminale-ps-espace-calculer.png",
  "titre": "Un produit scalaire est un NOMBRE, pas un vecteur · Le calculer en coordonnées dans l'espace · Tle spé",
  "centres": ["sport"],
  "tags": ["produit scalaire", "espace", "coordonnées", "repère orthonormé", "norme", "orthogonalité", "cube ABCDEFGH", "terminale", "bac"]
}
```

**Accroche** (à relire par Frédéric avant publication) :

> Kelly fait du kitesurf à l'Hermitage. Le vent pousse son aile, mais seule la partie du
> vent qui va dans le bon sens la fait avancer : un vent de côté ne sert à rien. Ce
> « combien ça pousse dans le bon sens », c'est exactement ce que mesure un produit
> scalaire — un seul nombre qui résume l'accord entre deux directions.
>
> Dans cette vidéo :
> • le calcul en coordonnées, dans un repère orthonormé (et cette condition est
>   obligatoire) : on multiplie les x entre eux, les y entre eux, les z entre eux, puis
>   on additionne les trois résultats
> • le résultat est un NOMBRE, jamais un vecteur — c'est l'erreur de type qui coûte le
>   plus cher au bac
> • le cas particulier le plus utile de tous : u · u est le carré de la norme, donc deux
>   lignes suffisent pour obtenir une longueur
> • le piège : le produit scalaire ressemble à une multiplication, mais si u · v = u · w,
>   on ne peut PAS conclure que v = w
> • et le zéro qui n'est pas rien : un produit scalaire nul entre deux vecteurs non nuls,
>   c'est la définition même de l'orthogonalité
>
> Deux questions-pauses et un défi corrigé dans le cube ABCDEFGH d'arête 1 : A G · A B et
> A G · A C — avec la prudence qu'il faut garder, parce qu'on ne compare pas deux
> produits scalaires pour comparer deux angles si les normes diffèrent.
> Entraîne-toi sur eleveai.fr

**Chapitres** (⛔ ils partent VERBATIM dans la description YouTube :
descriptifs, avec une majuscule, jamais un nom de clip interne) :
0:00 Deux vecteurs, trois multiplications, une addition · 0:10 Kelly, la part du vent qui
pousse · 0:39 Le calcul en coordonnées · 1:12 Trois choses à retenir · 1:35 Question 1 ·
2:00 Réponse : zéro, et ce zéro veut dire quelque chose · 2:35 Le cas u · u · 3:01 On ne
simplifie jamais · 3:45 Question 2 · 4:09 Réponse : un produit scalaire nul entre deux
vecteurs non nuls · 4:38 Deux lignes, mais écrites · 5:00 À toi de jouer · 5:20 Correction ·
6:06 Ce que tu as appris.
---

## E8 · `terminale-ps-espace-orthogonalite` — ✅ rendu HD fait

`manim/sorties/terminale/maths/geometrie/ps-espace-orthogonalite/eleveai-maths-terminale-ps-espace-orthogonalite.mp4`
7 min 00 (420,5 s) · 28,2 Mo · **0 instant qui touche un bord** · planche HD regardée.
⭐ Marques : **987**, fichier identique à celui du dépôt (`git diff HEAD --stat` vide) :
le rendu est calé sur des marques à jour, et le contrôle par le CONTENU le prouve.
⭐ `grep -c "self\.au_t("` → **0** : aucun instant relevé à la main, donc rien qui se
périme si la voix est régénérée (piège n° 37 de la série des entiers).
⚠️ `verifier-zone-margo --pas 1.0` : **38 instants**, qui font exactement les trois écrans
à grosse mascotte — garde 9,2 s (00:00 → 00:08), finale 22,7 s (06:31 → 06:53),
abonnement 5,9 s (06:54 → 06:59), soit 37,8 s pour 38 relevés au pas de 1 s — et dont le
surplus est constant à l'intérieur de chacun (+442, +463, +80 pixels, à ±5 près).
**Aucun écran de question touché** : c'est le critère.
⭐⭐ **Les deux plans de l'épisode se projetteraient sur une LAME** : `platitude((1;1;1))`
= 9,0°, et c'est à la fois la normale du plan P de l'écran 05 et le vecteur A G du défi.
L'écran 05 dessine donc son plan À PLAT (sans aucun axe), et le défi n'en dessine aucun —
il montre les deux VECTEURS du plan. Détail dans « Ce que l'épisode 8 a appris »
(`manim/REPRISE-espace-terminale.md`).
⚠️ Le personnage est **Marc, maçon**. Regardé au gros plan ×2,6 AVANT le premier rendu de
l'épisode, son casque de chantier flottait au-dessus du crâne et son bord lui barrait le
visage — la visière de Jean-Bernard (E4) à sa deuxième récidive.
⛔ Une droite s'écrit « (A G) », un plan « (BDE) », un vecteur porte sa flèche : dans cet
épisode-là, c'est le sujet même de la leçon.

```json
{
  "id": "terminale-ps-espace-orthogonalite",
  "notionId": "produit_scalaire_espace",
  "microId": "ps_espace_orthogonalite",
  "classe": "terminale-spe",
  "ceinture": "verte",
  "serie": "Maths Tle spé",
  "type": "longue",
  "fichier": "terminale/maths/geometrie/ps-espace-orthogonalite/eleveai-maths-terminale-ps-espace-orthogonalite.mp4",
  "miniature": "terminale/maths/geometrie/ps-espace-orthogonalite/eleveai-maths-terminale-ps-espace-orthogonalite.png",
  "titre": "Un produit scalaire nul, et c'est prouvé — mais pour un plan, il en faut DEUX · Démontrer une orthogonalité dans l'espace · Tle spé",
  "centres": ["sciences"],
  "tags": ["orthogonalité", "produit scalaire", "espace", "vecteur normal", "plan", "droite orthogonale à un plan", "cube ABCDEFGH", "terminale", "bac"]
}
```

**Accroche** (à relire par Frédéric avant publication) :

> Marc est maçon. Il plante un poteau et veut qu'il soit bien perpendiculaire à la dalle.
> Il vérifie au niveau dans un sens : c'est droit. Est-ce que ça suffit ? Non — un poteau
> peut être droit vu de face et penché vu de côté. Il faut vérifier dans DEUX directions.
> Ce geste de chantier, c'est exactement le théorème de ce chapitre.
>
> Dans cette vidéo :
> • le test : deux vecteurs non nuls sont orthogonaux si et seulement si leur produit
>   scalaire est nul — en coordonnées, c'est un calcul de trois secondes
> • le théorème qui porte tout le chapitre : une droite est orthogonale à un plan si et
>   seulement si son vecteur directeur est orthogonal à DEUX vecteurs non colinéaires de
>   ce plan — et ce vecteur s'appelle alors un vecteur normal
> • le piège le plus coûteux : un seul produit scalaire nul ne suffit pas. Au sol, le nord
>   est orthogonal à l'est, et pourtant le nord est AU SOL : il n'est pas vertical
> • le second piège : dans l'espace, deux droites peuvent être orthogonales sans se
>   couper — dans le cube, les arêtes [A B] et [C G] ne se rencontrent jamais
> • le modèle de rédaction en cinq lignes, dont la quatrième — « u et v ne sont pas
>   colinéaires, car… » — est celle qu'on oublie, et c'est un point perdu à chaque fois
>
> Deux questions-pauses et un défi corrigé dans le cube ABCDEFGH : démontrer que la droite
> (A G) est orthogonale au plan (BDE). Une figure qui revient tous les ans.
> Entraîne-toi sur eleveai.fr

**Chapitres** (⛔ ils partent VERBATIM dans la description YouTube :
descriptifs, avec une majuscule, jamais un nom de clip interne) :
0:00 Un produit scalaire nul, et c'est prouvé · 0:09 Marc, le poteau vérifié dans un seul
sens · 0:36 Le test de l'orthogonalité · 1:04 Le théorème du chapitre · 1:28 Question 1 ·
1:57 Réponse : la somme des trois produits est nulle · 2:29 Le théorème du poteau · 3:08 Un
seul ne suffit pas · 3:51 Question 2 · 4:19 Réponse : une seule direction ne suffit jamais ·
4:39 Cinq lignes, et la quatrième compte · 5:12 À toi de jouer · 5:30 Correction · 6:31 Ce
que tu as appris.
---

## E9 · `terminale-ps-espace-norme-distance` — ✅ rendu HD fait

`manim/sorties/terminale/maths/geometrie/ps-espace-norme-distance/eleveai-maths-terminale-ps-espace-norme-distance.mp4`
6 min 08 (368,0 s) · 23,9 Mo · **0 instant qui touche un bord** · planche HD regardée.
⭐ Marques : **831**, fichier identique à celui du dépôt (`git diff --stat` vide) : le rendu est calé sur des
marques à jour, et le contrôle par le CONTENU le prouve.
⭐ `grep -c "self\.au_t("` → **0** : aucun instant relevé à la main, donc rien qui se
périme si la voix est régénérée (piège n° 37 de la série des entiers).
⚠️ `verifier-zone-margo --pas 1.0` : **38 instants**, en DEUX plages seulement — 0 à 9 s
et 340 à 367 s. La soustraction tranche : garde 10,05 s (mascotte à 0,8) + finale 21,66 s
(0,65) + abonnement 6,70 s (0,9) = **38,41 s**, pour 38 relevés au pas de 1 s. Et le
surplus est constant à l'intérieur de chaque plage (+440, +461, +80 pixels).
**Aucun écran de question touché** (04 : 89 → 135 s ; 07 : 195 → 253 s) : c'est le critère.
⭐⭐ **Le glyphe √ se rend, MAIS IL N'A AUCUNE BARRE.** Mesuré sur une image d'essai avant
d'écrire le premier écran : « √x² + y² + z² » se lirait « (√x²) + y² + z² », c'est-à-dire
la faute même que l'épisode combat. Le vinculum est TRACÉ — `EcransEspace.racine()`, neuf
dans le socle, à réemployer en E10 et E12 qui écrivent aussi des racines.
⛔⛔ **« AB » est une LONGUEUR, « A B⃗ » est un VECTEUR**, et ici la distinction EST la
leçon : l'écran 03 écrit les deux côte à côte. Les huit textes de longueur sont inscrits
avec leur raison dans `PAS_DES_VECTEURS` (`auditer-fleches-vecteurs.py`), qui reste à
**0 NU** sur les neuf scripts.
⚠️ Le personnage est **une coureuse de la Diagonale des Fous**. Regardée au gros plan
AVANT le premier rendu, ses bras partaient du MILIEU du buste et sa queue de cheval
flottait détachée du crâne — la visière de Jean-Bernard (E4) et le casque de Marc (E8) à
leur troisième forme.
⭐ Le profil « 10 km à plat / 1 km de dénivelé » est dessiné À L'ÉCHELLE, et le 3-4-5 du
piège est aux VRAIES proportions 3-4-5 — il ne l'était pas au premier jet (1,50 au lieu
de 1,333), et aucun outil ne pouvait le dire. Les deux sont maintenant vérifiés par une
assertion du module.

```json
{
  "id": "terminale-ps-espace-norme-distance",
  "notionId": "produit_scalaire_espace",
  "microId": "ps_espace_norme_distance",
  "classe": "terminale-spe",
  "ceinture": "verte",
  "serie": "Maths Tle spé",
  "type": "longue",
  "fichier": "terminale/maths/geometrie/ps-espace-norme-distance/eleveai-maths-terminale-ps-espace-norme-distance.mp4",
  "miniature": "terminale/maths/geometrie/ps-espace-norme-distance/eleveai-maths-terminale-ps-espace-norme-distance.png",
  "titre": "Dix kilomètres à plat et un de dénivelé ne font pas onze · Calculer une norme ou une distance dans l'espace · Tle spé",
  "centres": ["sport"],
  "tags": ["norme", "distance", "espace", "racine carrée", "Pythagore", "valeur exacte", "cube ABCDEFGH", "diagonale", "terminale", "bac"]
}
```

**Accroche** (à relire par Frédéric avant publication) :

> Pense à la Diagonale des Fous. Un coureur enchaîne dix kilomètres à plat et un kilomètre
> de dénivelé. Quelle distance a-t-il parcourue, vraiment ? Pas onze kilomètres : on
> n'additionne pas une distance au sol et une hauteur, on passe par les carrés. Racine de
> cent un, soit un peu plus de dix kilomètres. Le dénivelé change presque tout à l'effort,
> et presque rien à la distance — c'est Pythagore, en trois dimensions.
>
> Dans cette vidéo :
> • la norme d'un vecteur de coordonnées x, y, z : la racine de x² + y² + z², et
>   l'escalier de coordonnées qui montre d'où sortent les trois carrés
> • la distance entre deux points : arrivée moins départ, puis la racine de la somme des
>   carrés — et le lien avec l'épisode précédent, le carré de la norme est le produit
>   scalaire du vecteur par lui-même
> • le piège qui coûte le plus cher : la racine NE SE DISTRIBUE PAS. Racine de 3² + 4² ne
>   fait pas 3 + 4, elle fait racine de 25, c'est-à-dire 5
> • la valeur exacte : racine de 14 est une réponse, 3,74 est un arrondi — et il ne vaut
>   une réponse que si l'énoncé en demande un
> • le modèle de rédaction en trois lignes, et la phrase de conclusion qu'on oublie quand
>   l'énoncé parle de distance
>
> Deux questions-pauses et un défi corrigé dans le cube ABCDEFGH : les longueurs AC et AG.
> Deux résultats à retenir par cœur — racine de 2 pour la diagonale d'une face, racine de
> 3 pour la grande diagonale, et a racine de 2 / a racine de 3 si l'arête mesure a.
> Entraîne-toi sur eleveai.fr

**Chapitres** (⛔ ils partent VERBATIM dans la description YouTube :
descriptifs, avec une majuscule, jamais un nom de clip interne) :
0:00 Trois carrés, une racine · 0:10 La Diagonale des Fous · 0:44 La norme d'un vecteur ·
1:11 Une distance est une norme · 1:29 Question 1 · 1:45 Réponse : 3, en élevant au carré
d'abord · 2:14 D'un point à l'autre · 2:37 La racine ne se distribue pas · 3:15 Question 2 ·
3:40 Réponse : 5, la norme d'un vecteur vertical · 4:13 Trois lignes, toujours dans cet
ordre · 4:37 À toi de jouer · 4:56 Correction · 5:39 Ce que tu as appris.
---

## E10 · `terminale-ps-espace-angle` — ✅ rendu HD fait

`manim/sorties/terminale/maths/geometrie/ps-espace-angle/eleveai-maths-terminale-ps-espace-angle.mp4`
6 min 35 (394,98 s) · 24,8 Mo · **0 instant qui touche un bord** · planche HD regardée.
⭐ Marques : **861**, fichier identique à celui du dépôt (`git diff --stat` vide) : le rendu est calé
sur des marques à jour, et le contrôle par le CONTENU le prouve.
⭐ `grep -c "self\.au_t("` → **0** : aucun instant relevé à la main.
⚠️ `verifier-zone-margo --pas 1.0` : **37 instants**, en DEUX plages seulement — 0 à 9 s et 368 à
394 s. La soustraction tranche : garde 10,33 s (mascotte à 0,8) + finale 20,31 s (0,65) +
abonnement 6,70 s (0,9) = **37,34 s**, pour 37 relevés au pas de 1 s.
**Aucun écran de question touché** (04 : 101 → 125 s ; 07 : 217 → 244 s) : c'est le critère.
⭐ Dry run `-qh` : **15 écrans, 0 BORD, 0 AUDIT-AVANCE, 0 RETARD**, et un seul
`AUDIT-ABSENT`, celui de `@eleveai974` que les épisodes publiés portent aussi. Les 9
`AUDIT-TARD` sont tous ≤ 1,75 s et relus à la main : c'est la durée des animations.
⭐⭐ **Les 2 cues « 577 » ne sont pas un défaut.** « 577 » n'apparaît qu'une fois dans le
texte du clip ; WinRT en a émis TROIS (25,50 / 25,82 / 26,09 s), parce qu'il le lit
« cinq cent soixante-dix-sept ». Le convertisseur place la première à l'offset 326 et
saute les deux autres SANS avancer : la marque est au bon endroit et les 41 suivantes du
clip sont justes. ⚠️ Ce n'est pas la règle « une décimale vaut 3 cues » (E6) — « 577 »
est un ENTIER lu en trois mots, et c'est le garde-fou `SAUT_MAXI` qui fait le travail.
**Un entier long (577, 101, 180) se comporte comme une décimale** : à savoir pour E11/E12.
⛔⛔ **Aucune figure d'angle n'est en cavalière**, et c'est mesuré : la projection de la
série n'en conserve aucun. u(1 ; 1 ; 0) y tombe à **11,5°** de l'axe des x, et l'angle du
défi s'y lit **42,4°** pour 54,7° réels — douze degrés de mensonge. Les figures d'angle
sont donc PLANES (`coin()`), leur angle dessiné est vérifié par une assertion du module,
et l'arc du cube ne porte **aucune valeur** (c'est une convention, comme `angle_droit`).

```json
{
  "id": "terminale-ps-espace-angle",
  "notionId": "produit_scalaire_espace",
  "microId": "ps_espace_angle",
  "classe": "terminale-spe",
  "ceinture": "verte",
  "serie": "Maths Tle spé",
  "type": "longue",
  "fichier": "terminale/maths/geometrie/ps-espace-angle/eleveai-maths-terminale-ps-espace-angle.mp4",
  "miniature": "terminale/maths/geometrie/ps-espace-angle/eleveai-maths-terminale-ps-espace-angle.png",
  "titre": "La grande diagonale d'un cube ne fait pas 45° · Calculer un angle dans l'espace · Tle spé",
  "centres": ["nature-ecologie"],
  "tags": ["angle", "produit scalaire", "cosinus", "arccos", "espace", "cube ABCDEFGH", "grande diagonale", "terminale", "bac"]
}
```

**Accroche** (à relire par Frédéric avant publication) :

> Ravi installe des panneaux solaires sur les toits de Saint-Pierre. Un panneau face au
> soleil produit à plein ; incliné de trente degrés, il perd un peu ; à quatre-vingt-dix
> degrés, il ne produit plus rien. Ce qui décide du rendement, c'est l'angle entre la
> direction du soleil et celle du panneau — et cet angle se calcule avec un produit
> scalaire.
>
> Dans cette vidéo :
> • la seconde formule du produit scalaire, et le cosinus qu'on en isole : le produit
>   scalaire divisé par le PRODUIT des deux normes
> • le signe du produit scalaire donne la nature de l'angle avant tout calcul : positif
>   aigu, nul droit, négatif obtus — parce que les deux normes sont toujours positives
> • un exemple mené jusqu'au bout sans calculatrice : un cosinus qui vaut un demi, c'est
>   soixante degrés
> • les trois pièges : on divise par le produit et jamais par la somme ; un cosinus reste
>   entre moins 1 et 1, donc 1,25 est une erreur de calcul ; et l'angle de deux VECTEURS
>   n'est pas l'angle de deux DROITES — pour des droites on prend la valeur absolue
> • les quatre lignes de la copie, et l'unité qu'on oublie : un angle sans degrés ni
>   radians, c'est le point perdu
>
> Deux questions-pauses et un défi corrigé dans le cube ABCDEFGH d'arête 1 : l'angle
> entre la grande diagonale et une arête. Il vaut 55 degrés environ, et surtout pas 45 —
> beaucoup de copies écrivent 45 sans calculer. Entraîne-toi sur eleveai.fr

**Chapitres** (⛔ ils partent VERBATIM dans la description YouTube :
descriptifs, avec une majuscule, jamais un nom de clip interne) :
0:00 Un produit scalaire, deux normes, une division · 0:10 Ravi et les panneaux solaires
de Saint-Pierre · 0:36 Du produit scalaire à l'angle · 1:13 Le signe décide avant le
calcul · 1:41 Question 1 · 2:05 Réponse : obtus, parce que le produit scalaire est
négatif · 2:29 Jusqu'au bout, sans calculatrice · 2:57 Les trois pièges · 3:37 Question 2
· 4:04 Réponse : un cosinus ne dépasse jamais 1 · 4:31 Quatre lignes, dans cet ordre ·
4:57 À toi de jouer · 5:17 Correction : 55 degrés, et pas 45 · 6:07 Ce que tu as appris.

---

## E11 · `terminale-ps-espace-plan-normal` — ✅ rendu HD fait

`manim/sorties/terminale/maths/geometrie/ps-espace-plan-normal/eleveai-maths-terminale-ps-espace-plan-normal.mp4`
6 min 38.8 (398.77 s) · 24.1 Mo · **0 instant qui touche un bord** · planche HD regardée.
⭐ Marques : **913**, fichier identique à celui du dépôt (`git diff` vide) : le rendu est calé
sur des marques à jour, et le contrôle par le CONTENU le prouve.
⭐ `grep -c "self\.au_t("` → **0** : aucun instant relevé à la main.
⭐ Dry run `-qh` : **15 écrans, 0 BORD, 0 AUDIT-AVANCE**, et un seul `AUDIT-ABSENT`,
celui de `@eleveai974` que les épisodes publiés portent aussi. Les 33 `AUDIT-TARD` sont
tous ≤ 2,96 s et relus à la main : c'est le prix de poser une équation quand elle est
ENTIÈREMENT lue, et l'inverse serait une AVANCE — on préfère 2,96 s de retard sur le
premier chiffre à une seconde d'avance sur le dernier.
⛔⛔ **Deux des plans de cet épisode ne sont PAS dessinés, et c'est mesuré** :
`platitude((1 ; 1 ; 1))` = **9,02°**, sous le seuil de 12°. Or c'est la normale du plan
de la question 07 ET celle du plan du défi — les deux écrans qui portent la leçon sont
les deux qu'on ne peut pas dessiner en cavalière. L'écran 07b est donc algébrique (la
place manquait de toute façon : six blocs dans la colonne de gauche), et le défi montre
le POINT et l'escalier de ses coordonnées, jamais un morceau de plan qui se lirait
comme un trait. Les trois autres plans se projettent bien : (0 ; 0 ; 1) = 14,9°,
(2 ; −1 ; 3) = 39,8°, (3 ; 0 ; 1) = 25,4°.
⚠️ **Les NOMS D'AXES sont des étiquettes, et rien ne les mesurait.** Trois défauts d'un
coup sur le premier −ql : « n̄y » à l'écran 02, la pointe de n⃗ sur celle de l'axe des x
à l'écran 05, et le DISQUE du point A collé au « y » à l'écran 09b — A (1 ; 1 ; 1) se
projette à **8°** de cet axe. D'où `noms_axes()` dans la mesure, à recopier pour E12.

```json
{
  "id": "terminale-ps-espace-plan-normal",
  "notionId": "produit_scalaire_espace",
  "microId": "ps_espace_plan_normal",
  "classe": "terminale-spe",
  "ceinture": "verte",
  "serie": "Maths Tle spé",
  "type": "longue",
  "fichier": "terminale/maths/geometrie/ps-espace-plan-normal/eleveai-maths-terminale-ps-espace-plan-normal.mp4",
  "miniature": "terminale/maths/geometrie/ps-espace-plan-normal/eleveai-maths-terminale-ps-espace-plan-normal.png",
  "titre": "La perpendiculaire à un plan est écrite dans son équation · Vecteur normal · Tle spé",
  "centres": ["sciences"],
  "tags": ["vecteur normal", "équation de plan", "plan", "espace", "projeté orthogonal", "plans parallèles", "produit scalaire", "terminale", "bac"]
}
```

**Accroche** (à relire par Frédéric avant publication) :

> Un clou planté bien droit dans une planche : le clou donne la direction
> perpendiculaire à la planche. En maths, ce clou s'appelle un vecteur normal. Et voici
> le plus beau résultat du chapitre : si tu as l'équation d'un plan, tu as déjà son
> vecteur normal sous les yeux, sans aucun calcul.
>
> Dans cette vidéo :
> • les trois coefficients de x, de y et de z SONT les coordonnées d'un vecteur normal,
>   avec leurs signes — et le terme constant n'en fait pas partie : il dit seulement où
>   le plan se place, pas comment il est orienté
> • le théorème dans l'autre sens : un point et une normale suffisent pour écrire
>   l'équation, et le terme constant se trouve en remplaçant par le point
> • la raison profonde, en une ligne : M est dans le plan si et seulement si le produit
>   scalaire de A M et de la normale est nul
> • le piège : une normale n'est pas unique, donc deux équations qui ne se ressemblent
>   pas peuvent décrire le même plan — on compare deux plans en deux temps, les normales
>   d'abord, un point ensuite
> • et le second piège : un vecteur normal n'est pas un vecteur directeur
> • la méthode reine du projeté orthogonal : on écrit la droite qui suit la normale,
>   puis on cherche son intersection avec le plan
>
> Deux questions-pauses et un défi corrigé : le projeté orthogonal du point de
> coordonnées 1, 1, 1 sur le plan d'équation x plus y plus z égale zéro. C'est l'origine
> du repère. Entraîne-toi sur eleveai.fr

**Chapitres**, relevés sur le rendu (⛔ ils partent VERBATIM dans la description
YouTube : descriptifs, avec une majuscule, jamais un nom de clip interne) :
0:00 Les coefficients de l'équation sont un vecteur · 0:10 Le clou planté droit dans une
planche · 0:31 On lit la normale dans l'équation · 0:56 Et dans l'autre sens : un point
et une normale · 1:23 Question 1 · 1:45 Réponse : on lit les coefficients avec leurs
signes · 2:09 Trouver l'équation à partir d'un point et d'une normale · 2:49 Le piège :
une normale n'est pas unique · 3:38 Question 2 · 4:04 Réponse : strictement parallèles ·
4:33 Les deux rédactions à connaître · 5:06 À toi de jouer · 5:26 Correction : le projeté
de A est l'origine · 6:11 Ce que tu as appris.

---

## E12 · `terminale-ps-espace-defi` — ✅ rendu HD fait

`manim/sorties/terminale/maths/geometrie/ps-espace-defi/eleveai-maths-terminale-ps-espace-defi.mp4`
6 min 48.9 (408.85 s) · 27.4 Mo · **0 instant qui touche un bord** · planche HD regardée.
⭐ **DOUZIÈME ET DERNIER DE LA SÉRIE.** Script et planches écrits par une autre session
(commit `bdead4cc1`), HD rendu ici — la frontière a été tenue des deux côtés : regarder
d'un côté, corriger de l'autre, et aucun fichier touché à deux mains.
⭐ Marques : **935**. Le script était FIGÉ pendant le rendu, vérifié au caractère près
avant et après (`621f00d3…` et `159fc7a4…`, `git diff HEAD` vide) : le HD rend bien la
version qui a été regardée. ⛔ C'est l'inverse de l'âge d'un fichier, qui ne prouve rien.
⭐ Dry run `-qh` : **0 BORD · 0 AUDIT-AVANCE · 0 RETARD**, un seul `AUDIT-ABSENT`
(`@eleveai974`). Mesure : 0 ennui. Flèches : 0 NU.

⛔⛔ **CE QUE LA CAVALIÈRE AURAIT FAIT DE LA QUESTION 2, ET POURQUOI LE TRIANGLE EST À
PLAT.** `platitude((1 ; 1 ; 1))` = **9,02°**, sous le seuil de 12° : le plan (BDE) se
projette sur une lame. Mesuré sur le triangle lui-même, dont la bonne réponse est
« équilatéral » :

| | réel | en cavalière |
|---|---|---|
| côté B D | 1,414 | **0,656** |
| côté B E | 1,414 | **1,414** |
| côté D E | 1,414 | **0,822** |
| angle en B | 60,0° | **19,1°** |
| aire | 100 % | **17,5 %** |

Un élève y aurait lu « quelconque » — c'est-à-dire le **leurre C de sa propre question**.
C'est le 3-4-5 faux de l'épisode 9 en plus grave : là-bas le schéma était faux de 13 %,
ici il aurait plaidé pour une mauvaise réponse. ⭐ L'écran 07 ne porte donc que les trois
POINTS (la donnée) et la forme arrive en 07b par une figure PLANE, vue dans son plan.

⭐⭐ **ET L'ÉQUILATÉRALITÉ EST VÉRIFIÉE SUR L'IMAGE RENDUE, PAS SEULEMENT À LA
CONSTRUCTION.** Une assertion de module mesure les `Line` telles qu'on les bâtit — avant
`scale`, `move_to`, l'épaisseur de trait et l'anticrénelage. Les pixels oranges du rendu
ont donc été extraits et les trois côtés mesurés. ⛔ Les deux contrôles, pas l'un des deux.

⚠️ **Les douze arêtes du cube ont été COMPTÉES une par une** sur un recadrage ×4,6, et pas
déduites d'une assertion : `[E H]` a manqué pendant six épisodes sans qu'aucun instrument
le voie. Une absence ne se mesure pas, elle se compte.

```json
{
  "id": "terminale-ps-espace-defi",
  "notionId": "produit_scalaire_espace",
  "microId": "ps_espace_defi",
  "classe": "terminale-spe",
  "ceinture": "verte",
  "serie": "Maths Tle spé",
  "type": "longue",
  "fichier": "terminale/maths/geometrie/ps-espace-defi/eleveai-maths-terminale-ps-espace-defi.mp4",
  "miniature": "terminale/maths/geometrie/ps-espace-defi/eleveai-maths-terminale-ps-espace-defi.png",
  "titre": "Le plan (BDE) coupe la diagonale du cube à son premier tiers · Exercice type bac · Tle spé",
  "centres": ["jeux-defis"],
  "tags": ["exercice type bac", "produit scalaire", "vecteur normal", "équation de plan", "projeté orthogonal", "distance à un plan", "cube ABCDEFGH", "espace", "terminale", "bac"]
}
```

**Accroche** (à relire par Frédéric avant publication) :

> Regarde les sujets des années passées : l'exercice de l'espace suit presque toujours le
> même chemin. On démontre qu'un vecteur est normal à un plan, on en déduit l'équation de
> ce plan, puis on calcule une distance, un projeté ou un angle. Si tu reconnais le
> chemin, tu ne cherches plus quoi faire : tu avances.
>
> Dans cette vidéo :
> • le fil en trois étapes : deux produits scalaires nuls prouvent qu'un vecteur est
>   normal au plan, ce vecteur donne les coefficients de l'équation, et un point du plan
>   donne le terme constant
> • la boîte à outils complète, cinq objets — et ils suffisent pour tout l'exercice
> • les cinq pièges de la copie, qui coûtent plus cher que les erreurs de calcul :
>   prouver l'orthogonalité sur une seule direction, oublier d'écrire la non-colinéarité,
>   donner un arrondi quand l'énoncé veut l'exact, annoncer une distance négative, et
>   s'appuyer sur le dessin pour affirmer — dans l'espace, la preuve est toujours un calcul
> • le squelette d'une copie complète, qui fonctionne sur n'importe quel sujet de l'espace
>
> Deux questions-pauses et un défi corrigé dans le cube d'arête 1 : le projeté orthogonal
> de A sur le plan B D E, et la distance de A à ce plan. Elle vaut racine de 3 sur 3,
> environ zéro virgule 58 — et le point trouvé est au premier tiers de la grande
> diagonale. Entraîne-toi sur eleveai.fr

**Chapitres**, relevés sur le rendu (⛔ ils partent VERBATIM dans la description
YouTube : descriptifs, avec une majuscule, jamais un nom de clip interne) :
0:00 Une normale, une équation, une distance · 0:12 Toujours le même chemin · 0:35 Le
fil, en trois étapes · 1:00 Cinq objets, et ils suffisent · 1:24 Question 1 · 1:50
Réponse : les deux produits scalaires, et la phrase · 2:17 Dans le cube : la normale,
puis l'équation · 3:03 Cinq pièges de copie · 3:38 Question 2 · 4:00 Réponse : le
triangle BDE est équilatéral · 4:30 Le squelette d'une copie · 5:00 À toi de jouer ·
5:22 Correction : K au premier tiers de la diagonale · 6:19 Ce que tu as appris.

---

## E10 à E12 — ⏳ en attente de leur rendu HD

Les identifiants sont fixés et doivent rester ceux-là (c'est sur eux que le coach
branchera) :

| épisode | id | microId | centre |
|---|---|---|---|
| E2 | `terminale-espace-repere-coordonnees` | `espace_repere_coordonnees` | `transports` |
| E3 | `terminale-espace-droite-parametrique` | `espace_droite_parametrique` | `transports` |
| E4 | `terminale-espace-plan-equation` | `espace_plan_equation` | `sciences` |
| E5 | `terminale-espace-position-relative` | `espace_position_relative` | `transports` |
| E6 | `terminale-espace-defi` | `espace_defi` | `jeux-defis` |
| E10 | `terminale-ps-espace-angle` | `ps_espace_angle` | `nature-ecologie` |
| E11 | `terminale-ps-espace-plan-normal` | `ps_espace_plan_normal` | `sciences` |
| E12 | `terminale-ps-espace-defi` | `ps_espace_defi` | `jeux-defis` |

Les six premiers portent `"notionId": "geometrie_espace"`, les six suivants
`"produit_scalaire_espace"`. Tous : `classe` `terminale-spe`, `ceinture` `verte`,
`serie` « Maths Tle spé », `type` `longue`, et le chemin
`terminale/maths/geometrie/<slug>/`.

⚠️ Les centres sont pris dans la liste FERMÉE `lib/videos/centres-interet.ts` et vérifiés
dans la tranche `15-18`. ⛔ `metiers` n'existe pas. Contrôle avant publication :
`node scripts/verifier-centres-age.mjs manim/manifeste-youtube.json` → « 0 centre hors
tranche ».
