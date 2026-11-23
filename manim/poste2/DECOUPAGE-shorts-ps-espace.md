# Découpage des SIX SHORTS du produit scalaire (E7 à E12) — terminale spé, 23/11/2026

Écrit **avant** les scripts Manim et **pendant** que `espace_commun_short.py` bougeait
encore : le découpage ne dépend d'aucune API, les scripts en dépendent. Ce document dit,
pour chacun des six, l'**unique idée** que le short porte, le texte exact de chaque écran,
les trois propositions avec leur bonne réponse, et ce que montre la question-pause.

> ⛔ Un short ne RÉSUME pas son épisode : il en prend **une** idée et la rend en une
> minute. Les six idées ci-dessous sont prises dans la voix du paysage correspondant,
> jamais inventées.

**Les sources** : les voix sont `manim/voix/terminale-ps-espace-*-short.json`, leurs
marques `manim/scripts/terminale/ps_espace_*_short_marques.json` (189 · 200 · 153 · 183 ·
203 · 216 = **1 144**, comptées à la sortie du convertisseur). La passe maths est
exécutée : `python -X utf8 manim/poste2/controler-maths-shorts-ps-espace.py` → **0 faute
sur 50**, après étalonnage.

---

## Le cadre, lu dans le socle et non supposé

`espace_commun_short.py` l'écrit noir sur blanc, et c'est ce qui borne tous les écrans
ci-dessous : un short est en **9:16**, `frame_width = 4,5` et `frame_height = 8,0`, donc
la marge de 3 % est **x ∈ [−2,115 ; 2,115]** et **y ∈ [−3,865 ; 3,865]**. Il n'y a
**qu'une colonne**, et elle est centrée — rien à voir avec la colonne de droite du socle
paysage.

Les pièces disponibles, relevées sur le socle (lecture seule) : `entete_blocs`, `pose`,
`para`, `lignes`, `blocs_phrase`, `eq_mots`, `cube_place`, `arete`, `repere`,
`carte_choix`, `choix2`, `q_tete`, `q_reponse`, `appel_blocs`, `fin_short` ; plus les
**emprunts** au socle paysage : `trip`, `vec`, `vexpr`, `q_montrer_choix`, `q_pause`,
`nombre`, `au_fin`, `sans_audit`.

⭐ Le gabarit des six écrans est le même partout, parce que les six voix ont les mêmes
six clips : `00-accroche` (entête + la phrase choc), `01-idee` (la figure et le calcul),
`02-question` (`q_tete`, pause 3 s), `02b-reponse` (`q_reponse` + l'explication),
`03-commentaire` (`appel_blocs`), `04-abonne` (`fin_short`).

---

## ⛔⛔ DEUX PIÈCES MANQUENT AU SOCLE — à ajouter pendant qu'il est encore ouvert

Relevé en découpant, et c'est exactement le moment de le dire : après le gel, il faudra
rouvrir le fichier d'une autre session.

### 1. `racine` — et sans elle, l'écran de E9 dit le contraire de sa voix

Le bloc des emprunts du socle des shorts liste `trip`, `vec`, `vexpr`, `q_montrer_choix`,
`q_pause`, `nombre`, `au_fin`, `sans_audit` — **pas `racine`**.

Or le short de E9 affiche « racine de 3 au carré plus 4 au carré ». Le glyphe √ (U+221A)
**se rend mais n'a aucune barre** (mesuré sur image d'essai, épisode 9) : écrit tel quel,
l'écran donne « (√3²) + 4² », c'est-à-dire **la faute même que le short combat**. La barre
se trace, et `EcransEspace.racine` la trace déjà.

⭐ **Le coût est d'une ligne**, et le critère d'emprunt du socle est rempli : vérifié, la
méthode n'utilise que `self.t`, n'appelle **ni `super()`, ni `col()`, ni `gauche()`** —
donc rien de la géométrie 16:9.

```python
racine = EcransEspace.racine     # à ajouter au bloc des emprunts
```

⚠️ Et sa docstring porte la cote à ne pas oublier : un radical est plus HAUT qu'un texte
de la même police (la barre déborde de 0,07), donc toute cote d'un bloc qui en gagne un
se remesure. E10 (« 1 sur racine de 3 ») et E12 (« racine de 3 sur 3 ») en portent aussi.

### 2. `coin()` — la figure d'angle PLANE, et sans elle E10 enseigne un angle faux

Le short de E10 a pour unique idée que **la grande diagonale du cube ne fait pas 45°**.
⛔ Dessiner cet angle DANS le cube le rendrait à **42,4°** alors qu'il vaut **54,7°** —
douze degrés de mensonge, mesurés et écrits dans la note de reprise. Un élève qui regarde
répondrait « 45 », c'est-à-dire la réponse que le short réfute : la figure enseignerait la
mauvaise réponse, exactement comme le triangle (BDE) de E12.

Le remède existe et il est éprouvé : `coin()`, la figure d'angle **plane**, dont
l'équilatéralité ou l'angle est vérifié par une assertion de module. ⚠️ Mais il vit dans
`manim/scripts/terminale/ps_espace_angle.py` — **un épisode livré**, pas le socle. C'est
la même situation que `frac()` et `noms_axes()`, déjà notées « à extraire quand le gel
sera levé ».

👉 Demande au chef : faire extraire `coin()` dans `espace_commun_short.py` (ou dans
`espace3d.py`, qui est la boîte à figures commune) pendant que la session des shorts de
la géométrie y est encore. ⛔ Je ne l'importe pas depuis l'épisode livré : importer un
module de Scene pour une fonction, c'est exécuter ses assertions de figure et se lier à
un fichier qui n'a aucune raison de rester stable.

---

## ⛔ UN DÉFAUT DE TEXTE, MESURÉ — et il est dans MA voix de E12

La règle de la maison : **la bonne réponse ne doit pas être la plus longue**, sinon elle
se devine sans rien calculer. Mesuré sur les six, ponctuation finale retirée partout :

| short | bonne | A | B | C | verdict |
|---|---|---|---|---|---|
| `calculer` | A | **1** | 1 | 42 | ✅ |
| `orthogonalite` | C | 45 | 36 | **28** | ✅ |
| `norme-distance` | B | 1 | **1** | 2 | ✅ |
| `angle` | C | 9 | 9 | **9** | ✅ ex æquo, aucun tell |
| `plan-normal` | B | 7 | **13** | 13 | ✅ ex æquo, aucun tell |
| `defi` | A | ~~28~~ **15** | ~~13~~ 16 | ~~25~~ 21 | ✅ **corrigé** (voir ci-dessous) |

⚠️⚠️ **Et mon premier instrument condamnait TROIS shorts sur six.** Il comptait le point
final sur A et B (qui le portent) et pas sur C (dont je coupais la fin avant « Mets
pause »). Sur des propositions d'UN caractère — « 5 », « 7 » — un point en plus double la
longueur mesurée. Deux innocents allaient être « corrigés ». ⭐ La leçon n'est pas neuve
mais elle vient de resservir : *un instrument qui rend un chiffre plausible n'a pas prouvé
qu'il mesurait la bonne chose* — ici, il mesurait de la ponctuation.

### ✅ Le correctif de E12 — APPLIQUÉ le 23/11/2026

Arbitrage du chef d'orchestre : les sections E7 à E12 de `VOIX-espace-terminale.md` sont
les miennes, E1 à E6 sont celles de la session voisine ; une ligne de mon propre épisode
ne demande l'autorisation de personne. Le correctif est donc appliqué à la source, et la
voix de E12 a été réextraite, resynthétisée et remarquée (**217 marques**, une de plus
que les 216 d'avant — le nouveau libellé porte un jeton de plus).
⭐ Mesuré après coup : l'édition touche **exactement une ligne**, et elle est dans la
section E12 (`git diff HEAD --stat` → `1 insertion(+), 1 deletion(-)`).

**Avant** (bonne réponse A = 28 caractères, la plus longue) :

> A : à son premier tiers depuis A. B : en son milieu. C : à ses deux tiers depuis A.

**Après** (A = 15, B = 16, C = 21 — la plus longue est un leurre, et les trois gardent la
même forme) :

> A : au tiers de A G. B : au milieu de A G. C : aux deux tiers de A G.

⚠️ Le clip `02b-reponse` nomme les leurres (« Le milieu, ce serait un demi partout, et les
deux tiers, deux tiers partout ») : il est resté **juste tel quel**, aucun mot changé.

⭐ **Et la régénération s'est faite SANS toucher aux 23 autres voix**, ce qui comptait
puisque 18 d'entre elles ne sont pas à moi. `voix-espace-depuis-md.py --tout` les aurait
toutes réécrites ; la manœuvre est de **supprimer le seul fichier à refaire** et de
lancer l'extracteur sans option, qui n'écrit que ce qui manque :
« 1 fichier écrit, 23 déjà présents ». Même principe pour les WAV, dont le lanceur saute
ce qui existe : « 5 déjà fait », un seul refait.

**Après correctif, les trois contrôles repassés :**

| contrôle | résultat |
|---|---|
| longueurs des six | **6 / 6 ok** — `defi` à 15 / 16 / 21, la plus longue est un leurre |
| exclusion deux à deux de `defi` | le tiers, le milieu, les deux tiers : trois points distincts d'une même diagonale, et les deux leurres sont réfutés par l'équation du plan (3 × 1/2 − 1 = 1/2 ≠ 0 ; 3 × 2/3 − 1 = 1 ≠ 0) ✅ |
| passe maths | **0 faute sur 50**, après étalonnage |

---

## L'exclusion deux à deux des propositions — les six, une par une

Aucun outil ne voit ceci : il faut le lire.

| short | les trois propositions s'excluent-elles ? |
|---|---|
| `calculer` | 5, 7, **et un vecteur** — deux nombres distincts, et le troisième n'est même pas du bon type ✅ |
| `orthogonalite` | « oui » / « on ne peut pas savoir » / « non » — trois positions, une seule peut tenir ✅ |
| `norme-distance` | 5, 7, 25 — trois nombres distincts, chacun nommant une faute précise ✅ |
| `angle` | 45°, 55°, 60° — trois valeurs distinctes, une seule compatible avec le cosinus affiché juste avant ✅ |
| `plan-normal` | trois triplets, **aucun colinéaire à un autre** (vérifié par calcul dans le contrôleur) ✅ |
| `defi` | le tiers, le milieu, les deux tiers — trois points distincts, et les deux leurres sont réfutés par l'équation du plan elle-même ✅ |

---

# E7 · `ps_espace_calculer_short` — « trois multiplications, une addition, et un NOMBRE »

**L'unique idée** : le produit scalaire se calcule en coordonnées, et ce qui en sort est
un **nombre**, jamais un vecteur. **Ceinture** : verte. **Bonne réponse : A.**

| écran | ce qui est à l'écran |
|---|---|
| `00-accroche` | entête « Produit scalaire » + échelle. Puis, en gros, sur trois lignes : « Deux vecteurs », « trois multiplications », « une addition ». Et dessous, en vert : « → un NOMBRE ». |
| `01-idee` | `vexpr` : **u⃗ (1 ; 2 ; 3)** et **v⃗ (4 ; −1 ; 2)** l'un sous l'autre (`trip`), puis la ligne de calcul remplie **au rythme de la voix** : « 1×4 = 4 », « 2×(−1) = −2 », « 3×2 = 6 », et enfin le total **8** encadré. ⚠️ Le total se pose à `au_fin`, pas au premier mot de la ligne. |
| `02-question` | `q_tete`, question sur **deux lignes** : « u⃗ (3 ; 0 ; 1) et v⃗ (2 ; 1 ; −1). » / « Que vaut u⃗ · v⃗ ? » Trois cartes : **A : 5** · **B : 7** · **C : le vecteur (6 ; 0 ; −1)**. |
| `02b-reponse` | la carte A s'allume. Dessous : « 6 + 0 − 1 = 5 ». Puis, en rouge, « B : le signe moins oublié » et « C : un produit scalaire est un NOMBRE ». |
| `03-commentaire` | « u⃗ (2 ; −1 ; 1) · v⃗ (3 ; 1 ; 5) = ? » + « Réponds en commentaire ! » ⛔ la réponse (10) n'est ni dite ni affichée. |
| `04-abonne` | `fin_short`. |

**La question-pause (3 s)** montre les deux triplets et les trois cartes, rien d'autre :
le calcul n'est PAS à l'écran pendant la pause, sinon il n'y a plus rien à chercher.

---

# E8 · `ps_espace_orthogonalite_short` — « orthogonal à une direction, et pourtant dedans »

**L'unique idée** : un seul produit scalaire nul ne prouve rien sur un **plan**.
**Ceinture** : verte. **Bonne réponse : C.**

| écran | ce qui est à l'écran |
|---|---|
| `00-accroche` | entête « Orthogonalité » + échelle. « Un produit scalaire nul : » / « deux vecteurs orthogonaux. » puis, en rouge : « Mais face à un PLAN, un seul ne suffit pas. » |
| `01-idee` | le poteau de Marc, vu de face puis vu de côté : droit dans un sens, **penché dans l'autre**. ⭐ Les deux vues côte à côte, c'est ce qui porte toute la leçon. Dessous : « deux directions, et non colinéaires ». |
| `02-question` | `q_tete`, question sur deux lignes : « Au sol, le nord est orthogonal à l'est. » / « Le nord est-il orthogonal au SOL ? » Cartes : **A : oui, il est orthogonal à une direction du sol** · **B : on ne peut pas le savoir sans calcul** · **C : non, le nord est dans le sol**. |
| `02b-reponse` | la carte C s'allume, et le **sol dessiné à plat** (`espace3d.plan_dessine`) avec les flèches *nord* et *est* dedans. ⛔ Les mots « nord » et « est » sont des DIRECTIONS en français, pas des noms de vecteur : **pas de flèche de notation dessus** (l'audit des flèches les signale, c'est un faux positif documenté). |
| `03-commentaire` | le cube, arêtes [A B] et [C G] en couleur : « orthogonales. Se coupent-elles ? » ⛔ réponse non dite. |
| `04-abonne` | `fin_short`. |

**La question-pause** montre le sol à plat **sans** les deux flèches : les poser
montrerait la réponse. Elles arrivent en `02b`.

---

# E9 · `ps_espace_norme_distance_short` — « la racine ne se distribue pas »

**L'unique idée** : on n'additionne pas deux longueurs perpendiculaires, on passe par les
carrés. **Ceinture** : verte. **Bonne réponse : B.**

| écran | ce qui est à l'écran |
|---|---|
| `00-accroche` | entête « Norme et distance » + échelle. « 10 km à plat » / « 1 km de dénivelé » / en rouge, barré : « 11 km ». |
| `01-idee` | le profil du coureur : une base de 10, une montée de 1, l'hypoténuse. ⚠️ **La hauteur doit faire exactement un dixième de la base**, sinon l'image contredit la voix qui dit « presque rien à la distance » — assertion de module obligatoire (défaut du 3-4-5 faux de E9). Puis `racine` : **√101 ≈ 10,05**. |
| `02-question` | `q_tete` : « Que vaut √(3² + 4²) ? » (une seule ligne, avec la **barre** du radical). Cartes : **A : 7** · **B : 5** · **C : 25**. |
| `02b-reponse` | la carte B s'allume. « 9 + 16 = 25 », puis « √25 = 5 ». En rouge : « A : la racine distribuée » · « C : la racine oubliée ». |
| `03-commentaire` | « u⃗ (2 ; 3 ; 6). Sa norme ? » ⛔ la réponse (7) n'est ni dite ni affichée. |
| `04-abonne` | `fin_short`. |

⛔ **Cet écran est celui qui exige `racine`** (voir les pièces manquantes) : sans la barre,
l'énoncé de la question lui-même porterait la faute qu'il interroge.

---

# E10 · `ps_espace_angle_short` — « la grande diagonale ne fait pas 45 degrés »

**L'unique idée** : le cosinus vient du produit scalaire divisé par le **produit** des
normes — et le dessin, lui, trompe. **Ceinture** : verte. **Bonne réponse : C.**

| écran | ce qui est à l'écran |
|---|---|
| `00-accroche` | entête « Un angle dans l'espace » + échelle. « La diagonale du cube » / « et une arête : 45° ? » puis, en rouge : « Non. » |
| `01-idee` | le cube (`cube_place`) avec **[A G] et [A B]** en couleur. ⛔ **Aucun arc d'angle dans le cube** : il s'y dessinerait à 42,4° pour un angle de 54,7°. La colonne donne `vexpr` : « A⃗G · A⃗B = 1 », « ‖A⃗G‖ = √3 », « ‖A⃗B‖ = 1 », puis « cos = 1/√3 ≈ 0,577 ». |
| `02-question` | `q_tete` : « L'angle entre la diagonale et l'arête, » / « arrondi au degré ? » Cartes : **A : 45 degrés** · **B : 60 degrés** · **C : 55 degrés**. |
| `02b-reponse` | la carte C s'allume, et **l'angle apparaît enfin — à plat** (`coin()`), avec son 54,7° vérifié par assertion. En rouge : « 45° ⟹ cos 0,71 » · « 60° ⟹ cos 0,5 ». |
| `03-commentaire` | « u⃗ · v⃗ = −6. Aigu, droit ou obtus ? » ⛔ réponse non dite. |
| `04-abonne` | `fin_short`. |

⛔ **Cet écran est celui qui exige `coin()`** (voir les pièces manquantes). Tant qu'il
n'est pas dans le socle, l'écran `02b` de ce short ne peut pas être écrit sans mentir.

---

# E11 · `ps_espace_plan_normal_short` — « la normale est déjà écrite dans l'équation »

**L'unique idée** : les trois coefficients de l'équation **sont** les coordonnées d'un
vecteur normal. **Ceinture** : verte. **Bonne réponse : B.**

| écran | ce qui est à l'écran |
|---|---|
| `00-accroche` | entête « Vecteur normal » + échelle. « Tu as l'équation d'un plan ? » / « Tu as déjà sa normale. » / en vert : « sans aucun calcul. » |
| `01-idee` | `eq_mots` : **2x − y + 3z − 5 = 0**, les trois coefficients **2**, **−1**, **3** s'allument un par un et **descendent** former le triplet `vec` **n⃗ (2 ; −1 ; 3)**. ⭐ C'est la seule animation qui porte la leçon : les chiffres ne sont pas recopiés, ils **tombent** de l'équation. Puis, en rouge, le −5 reste en haut : « le terme constant n'en fait pas partie ». |
| `02-question` | `q_tete` : « Un vecteur normal au plan » / « 3x − y + 2z + 4 = 0 ? » Cartes : **A : (3 ; 1 ; 2)** · **B : (3 ; −1 ; 2)** · **C : (0 ; 0 ; 4)**. |
| `02b-reponse` | la carte B s'allume. Les trois coefficients de l'équation se re-soulignent avec **leurs signes**. En rouge : « A : le signe moins perdu » · « C : le terme constant ». |
| `03-commentaire` | « x − 4y + z − 9 = 0. Sa normale ? » ⛔ la réponse (1 ; −4 ; 1) n'est ni dite ni affichée. |
| `04-abonne` | `fin_short`. |

**La question-pause** montre l'équation et les trois cartes. ⛔ Les coefficients ne sont
**pas** mis en couleur pendant la pause : les colorer, c'est donner la réponse.

---

# E12 · `ps_espace_defi_short` — « le plan (BDE) coupe la diagonale à son premier tiers »

**L'unique idée** : on atteint un projeté orthogonal en **suivant la normale**, et le
résultat est une surprise géométrique. **Ceinture** : verte. **Bonne réponse : A.**

| écran | ce qui est à l'écran |
|---|---|
| `00-accroche` | entête « Type bac : le projeté » + échelle. « Le plan (BDE) coupe la grande diagonale. » / « En son milieu ? » / en rouge : « Non. » |
| `01-idee` | le cube avec **B, D, E en ambre** (ce sont les données) et la diagonale **[A G]**. ⛔ **Pas de triangle (BDE) rempli** : il se projette sur une lame (platitude 9,02°, aire projetée 17,5 %) et se lirait « quelconque ». La colonne : « (BDE) : x + y + z − 1 = 0 », « n⃗ (1 ; 1 ; 1) », « x = y = z = t », « 3t − 1 = 0 », « t = 1/3 ». |
| `02-question` | `q_tete` : « Ce point est situé où » / « sur la diagonale A G ? » Cartes : **A : au tiers de A G** · **B : au milieu de A G** · **C : aux deux tiers de A G**. ⭐ Les trois gardent la **même forme** — c'est ce qui compte plus encore que leur longueur : trois tournures parallèles ne laissent aucune prise au devineur. |
| `02b-reponse` | la carte A s'allume, et **le point K apparaît sur [A G]**, au tiers. ⛔ K ne porte pas d'étiquette : la grille ne rend aucune position à moins de 0,82 du point, plus près d'autre chose que de lui. ⭐ C'est la **couleur** qui relie — K en vert, et le bloc « K (1/3 ; 1/3 ; 1/3) » encadré en vert. |
| `03-commentaire` | « La distance de A au plan (BDE) ? » ⛔ la réponse (√3/3 ≈ 0,58) n'est ni dite ni affichée. |
| `04-abonne` | `fin_short`. |

**La question-pause** montre le cube, la diagonale et **les valeurs t = 1/3** déjà
calculées — mais **pas** le point K sur la diagonale : le poser, c'est montrer la réponse
à la question qu'on vient de poser. K arrive en `02b`.

---

## ⏭ Ce qui reste, dans l'ordre

1. ⏳ le gel de `espace_commun_short.py`, **et son SHA** : on écrit contre un commit,
   jamais contre un fichier qui bouge ;
2. les deux pièces ci-dessus (`racine` en une ligne, `coin()` à extraire) ;
3. ✅ ~~le correctif de longueur du `02-question` de E12~~ — **fait le 23/11**, voix
   réextraite et 217 marques refaites ;
4. les 6 scripts, un par un — et pour chacun : `verifier-avant-rendu.py`, dry run
   (**0 BORD, 0 AUDIT-AVANCE**), `espace_mesure_short.py`, `-ql` + planche **et** gros
   plans, `verifier-zone-margo.py` sur le `-ql`, `auditer-fleches-vecteurs.py` à **0 NU** ;
5. ⛔ aucun rendu HD, aucun push.
