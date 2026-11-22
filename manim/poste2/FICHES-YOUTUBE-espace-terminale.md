# Fiches YouTube — série « GÉOMÉTRIE DANS L'ESPACE », terminale spé

⛔ **Rien n'est écrit dans `manim/manifeste-youtube.json` par cette session.** Ce registre
est partagé, et une copie de travail ment : il se commit **par clés**
(`manim/outils-commit-cles.py`). Les entrées prêtes sont ici, à reporter au moment de la
publication, quand la miniature existe.

⚠️ Il manque la **miniature** de chaque épisode (`…/<slug>.png`) : aucun des douze n'en a.
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

⚠️ **Chapitres** : le champ `chapitres` du manifeste attend des horodatages. Ceux de E1,
relevés sur le rendu (lignes `ECRAN` du journal) :
0:00 garde · 0:12 Nadia · 0:33 arrivée moins départ · 0:57 les règles · 1:15 question 1 ·
1:39 réponse · 1:55 somme et multiple · 2:14 le piège · 2:36 question 2 · 3:03 réponse ·
3:22 au bac · 3:43 à toi de jouer · 4:10 correction · 4:39 ce que tu as appris.

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

**Chapitres**, relevés sur le rendu :
0:00 garde · 0:11 Lila · 0:34 le repère du cube · 1:09 le milieu · 1:29 question 1 ·
1:54 réponse · 2:15 les diagonales · 2:54 le piège du pavé · 3:31 question 2 ·
3:52 réponse · 4:12 la première ligne de la copie · 4:35 à toi de jouer ·
4:53 correction · 5:29 ce que tu as appris.

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

**Chapitres**, relevés sur le rendu :
0:00 garde · 0:11 Soraya · 0:38 un point, une direction · 1:08 tout se lit dans les trois
lignes · 1:28 question 1 · 1:52 réponse · 2:17 tester un point · 2:48 le piège ·
3:27 question 2 · 3:52 réponse · 4:17 au bac · 4:42 à toi de jouer · 5:01 correction ·
5:30 ce que tu as appris.

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

**Chapitres**, relevés sur le rendu :
0:00 garde · 0:11 Jean-Bernard · 0:34 une équation, un plan · 1:08 si et seulement si ·
1:25 question 1 · 1:47 réponse · 2:12 trouver l'équation · 2:48 le piège · 3:26 question 2 ·
3:45 réponse · 4:15 au bac · 4:39 à toi de jouer · 5:03 correction · 5:39 ce que tu as appris.

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

**Chapitres**, relevés sur le rendu :
0:00 garde · 0:10 la route et le pont · 0:33 droite et plan · 1:16 trois cas ·
1:39 question 1 · 2:06 réponse · 2:32 deux plans · 3:07 le piège · 3:42 question 2 ·
4:07 réponse · 4:28 au bac · 5:01 à toi de jouer · 5:25 correction ·
6:06 ce que tu as appris.

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

**Chapitres**, relevés sur le rendu :
0:00 garde · 0:10 toujours la même forme · 0:37 avant tout calcul · 1:01 la boîte à
outils · 1:28 question 1 · 1:56 réponse · 2:19 montrons un alignement · 2:58 le piège ·
3:38 question 2 · 4:05 réponse · 4:30 le squelette d'une copie · 4:54 à toi de jouer ·
5:22 correction · 6:19 ce que tu as appris.

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

**Chapitres**, relevés sur le rendu :
0:00 garde · 0:10 Kelly, la part du vent qui pousse · 0:39 le calcul en
coordonnées · 1:12 trois choses à retenir · 1:35 question 1 · 2:00 réponse ·
2:35 le cas u · u · 3:01 on ne simplifie jamais · 3:45 question 2 · 4:09 réponse ·
4:38 deux lignes, mais écrites · 5:00 à toi de jouer · 5:20 correction ·
6:06 ce que tu as appris.

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

**Chapitres**, relevés sur le rendu :
0:00 garde · 0:09 Marc, le poteau vérifié dans un seul sens · 0:36 le test de
l'orthogonalité · 1:04 le théorème du chapitre · 1:28 question 1 · 1:57 réponse ·
2:29 le théorème du poteau · 3:08 un seul ne suffit pas · 3:51 question 2 ·
4:19 réponse · 4:39 cinq lignes, et la quatrième compte · 5:12 à toi de jouer ·
5:30 correction · 6:31 ce que tu as appris.

---

## E9 à E12 — ⏳ en attente de leur rendu HD

Les identifiants sont fixés et doivent rester ceux-là (c'est sur eux que le coach
branchera) :

| épisode | id | microId | centre |
|---|---|---|---|
| E2 | `terminale-espace-repere-coordonnees` | `espace_repere_coordonnees` | `transports` |
| E3 | `terminale-espace-droite-parametrique` | `espace_droite_parametrique` | `transports` |
| E4 | `terminale-espace-plan-equation` | `espace_plan_equation` | `sciences` |
| E5 | `terminale-espace-position-relative` | `espace_position_relative` | `transports` |
| E6 | `terminale-espace-defi` | `espace_defi` | `jeux-defis` |
| E9 | `terminale-ps-espace-norme-distance` | `ps_espace_norme_distance` | `sport` |
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
