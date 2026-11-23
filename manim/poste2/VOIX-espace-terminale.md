# Voix — série « GÉOMÉTRIE DANS L'ESPACE », terminale spé (22/11/2026)

**12 épisodes = les 12 micro-compétences du coach**, 6 pour `geometrie_espace` et 6 pour
`produit_scalaire_espace`. Chaque épisode : une vidéo paysage + un short. 24 vidéos.

> ⛔ **Ce fichier est la source de vérité des voix.** Les JSON de `manim/voix/` en sont
> EXTRAITS (`python manim/poste2/voix-espace-depuis-md.py`). Après extraction, ⛔ ne plus
> éditer les JSON : on corrige ici et on relance. Les recopier à la main, c'est une occasion
> de changer un mot sans le voir, douze fois.

## Les règles d'écriture de cette série

- **Tout en toutes lettres** : « x au carré », « moins l'infini », « vecteur A B », « u plus v ».
  ⛔ Aucun symbole, aucun LaTeX : c'est une voix, elle est LUE à haute voix.
- Un épisode = 15 clips, le gabarit de la terminale (`convexite_derivee_seconde`) :
  `00-garde`, `01-situation`, `02-idee`, `03-theoreme`, `04-question`, `04b-reponse`,
  `05-appliquer`, `06-piege`, `07-question`, `07b-reponse`, `08-rediger`, `09-defi`,
  `09b-correction`, `10-finale`, `11-abonne`.
- ⭐ **Trois lignes de question au MAXIMUM à l'écran** : à quatre, les cartes de choix
  descendent sur Ti Margo et lui coupent la tête (piège n° 33 de la série des entiers).
- ⭐ **Une question dit à l'écran exactement ce que la voix dit, mot pour mot.**
- ⛔ Chaque nombre dit dans une CORRECTION ou dans la FINALE est enseigné : c'est là qu'on
  relit en premier (voir la passe maths de chaque épisode, plus bas).

## Les centres d'intérêt de la série, vérifiés par ÂGE

⛔⛔ `metiers` **n'existe pas** : la liste de `lib/videos/centres-interet.ts` est FERMÉE
(18 entrées) et chaque entrée porte ses `tranches`. La terminale est la tranche `15-18`,
qui en ouvre 16 — `animaux` et `cuisine` s'y ferment. L'en-tête de E1 citait `metiers` :
corrigé. ⚠️ Le contrôle du dépôt est `node scripts/verifier-centres-age.mjs <manifeste>`,
et il doit afficher « 0 centre hors tranche ».

| | E1 | E2 | E3 | E4 | E5 | E6 | E7 | E8 | E9 | E10 | E11 | E12 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| centre | `technologie-ia` | `transports` | `transports` | `sciences` | `transports` | `jeux-defis` | `sport` | `sciences` | `sport` | `nature-ecologie` | `sciences` | `jeux-defis` |

Les six centres utilisés sont tous ouverts à 15-18 ans. ⚠️ Ils ne sont écrits nulle part
ailleurs pour l'instant : c'est au moment de la fiche YouTube qu'ils entrent dans
`manim/manifeste-youtube.json`, et c'est là qu'il faut relancer le contrôle.

## La longueur des phrases, mesurée

Le plafond documenté (`manim/scripts/cm1/entier_voix.py`) est de 18 mots au CM1 et 20 en
6ᵉ. ⛔ Il ne se transporte pas tel quel au lycée : ici, « Dans le cube A B C D E F G H
avec le repère A, A B, A D, A E » pèse 17 mots et ne coûte pourtant aucun souffle. Un
décompte brut punit l'épellation des coordonnées, pas la longueur réelle.

Mesure utile : les **mots de prose**, en retirant les lettres seules et les nombres.
Sur les 898 phrases des 12 voix : **médiane 8 mots, 9ᵉ décile 18, maximum 40**. Les cinq
phrases au-dessus de 30 ont été coupées en deux (dont une à 40 mots, à trois branches,
dans le piège de E5). Plafond retenu pour la série : **30 mots de prose**, contrôlé en
alerte par `verifier-voix-espace.py` — en alerte et non en erreur, parce qu'un
deux-points et un point-virgule sont des reprises de souffle.

## ⛔ La place de la bonne réponse, tirée au hasard

`manim/REGLES.md` (Frédéric, 09/11/2026) : le 09/11, sur les 899 questions du manifeste,
la bonne réponse était **B 57 % du temps**. Un élève qui répond toujours la même lettre
gagnait trop souvent. Depuis : place **tirée au hasard** avant d'écrire la voix, jamais
deux fois la même lettre de suite dans une vidéo, environ un tiers de A, de B et de C sur
la série, et l'ordre des leurres au hasard aussi.

⛔ **J'ai écrit ces 12 voix avec les 24 bonnes réponses en A, sans le voir.** Trouvé en
lisant `manim/scripts/cm1/entier_voix.py`, pas en relisant mon travail. Corrigé : tirage
à la graine 2211 sur les 6 paires ordonnées de lettres distinctes, chacune deux fois.

| | E1 | E2 | E3 | E4 | E5 | E6 | E7 | E8 | E9 | E10 | E11 | E12 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `04` | **B** | **C** | **C** | **C** | **A** | **A** | **B** | **A** | **B** | **C** | **A** | **B** |
| `07` | **C** | **A** | **A** | **B** | **C** | **B** | **A** | **C** | **C** | **B** | **B** | **A** |

Soit **A 8 · B 8 · C 8** sur 24 questions, et dans chaque épisode deux lettres différentes.

### Et les SHORTS ont leur propre tirage (23/11/2026)

Un short ne porte qu'**une** question-pause. Les lettres des six shorts de la géométrie
(E1 à E6) sont donc tirées à part, sous la même règle : un tiers de chaque, et jamais
deux fois la même lettre sur deux shorts consécutifs de la série.

| | E1 | E2 | E3 | E4 | E5 | E6 | E7 | E8 | E9 | E10 | E11 | E12 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `02` du short | **B** | **C** | **A** | **C** | **A** | **B** | **A** | **C** | **B** | **C** | **B** | **A** |

Soit **A 4 · B 4 · C 4** sur les douze shorts, et jamais deux fois la même lettre sur deux
shorts consécutifs de la série.

✅ **Les six du produit scalaire (E7 à E12) sont tirés** (23/11/2026). ⛔ Pas choisis à la
main : tirage à la **graine 2311**, 4ᵉ essai, sur les six lettres qui restaient à placer
(A 2 · B 2 · C 2), en rejetant tout tirage qui répète le B de E6 sur E7 ou qui met deux
fois la même lettre de suite. La commande se rejoue et redonne **A C B C B A**.
⚠️ Comme pour les paysages, ces lettres sont **la référence** : l'écran Manim et le champ
`reponse` du manifeste (0 = A, 1 = B, 2 = C) doivent dire la même lettre que la voix.

⚠️ Ces lettres sont désormais **la référence** : l'écran Manim (la lettre qui s'allume) et
le champ `reponse` du manifeste (0 = A, 1 = B, 2 = C) doivent dire la même lettre que la
voix. `python manim/poste2/verifier-voix-espace.py` le vérifie sur les voix, et attrape
aussi le demi-déplacement (la question réordonnée, la réponse pas suivie).

---

# E1 · `terminale-espace-vecteurs`

**Micro** : `espace_vecteurs` — Manipuler des vecteurs dans l'espace (notion `geometrie_espace`).
**Métier / contexte** : Nadia, pilote de drones de chantier — centre `technologie-ia`.
**Code couleur** : ambre = ce qu'on regarde, bleu = le vecteur u, rose = le vecteur v,
vert = juste, rouge = le piège.

- **00-garde** : Vecteurs dans l'espace. Dans le plan, deux nombres suffisent pour placer un point. Dans l'espace, il en faut trois. Et tout le reste ne change pas.
- **01-situation** : Voici Nadia. Elle pilote des drones qui cartographient un chantier. Pour placer un drone, elle donne trois nombres : combien vers la droite, combien en profondeur, combien en hauteur. Trois nombres, un point. Et pour aller d'un point à un autre, il y a un vecteur.
- **02-idee** : Un vecteur de l'espace a trois coordonnées. Pour le vecteur A B, on fait arrivée moins départ, coordonnée par coordonnée. Si A a pour coordonnées 1, 2, 3 et B a pour coordonnées 4, 6, 3, alors le vecteur A B a pour coordonnées 3, 4, 0. Ce zéro dit que B est exactement à la même hauteur que A.
- **03-theoreme** : Toutes les règles du plan tiennent encore. On additionne deux vecteurs coordonnée par coordonnée. On multiplie un vecteur par un nombre en multipliant ses trois coordonnées. Et deux vecteurs sont colinéaires quand l'un est un multiple de l'autre.
- **04-question** : Question ! A a pour coordonnées 2, 1, 0, et B a pour coordonnées 2, 1, 5. Que valent les coordonnées du vecteur A B ? A : 4, 2, 5. B : 0, 0, 5. C : 0, 0, 1. Mets pause, et choisis !
- **04b-reponse** : Réponse B. 2 moins 2 fait 0, 1 moins 1 fait 0, et 5 moins 0 fait 5. Le vecteur A B est vertical : A et B sont l'un au-dessus de l'autre. La réponse A, c'est la somme des coordonnées, pas la différence.
- **05-appliquer** : Appliquons. Le vecteur u a pour coordonnées 1, 2, moins 1. Le vecteur v a pour coordonnées 3, 0, 2. La somme u plus v a pour coordonnées 4, 2, 1. Et le double de u a pour coordonnées 2, 4, moins 2.
- **06-piege** : Voilà le piège ! Dans le plan, deux vecteurs non colinéaires suffisent à tout construire. Dans l'espace, il en faut trois. Deux vecteurs non colinéaires n'engendrent qu'un plan. Trois vecteurs peuvent très bien être deux à deux non colinéaires et rester tous dans un même plan : on dit alors qu'ils sont coplanaires.
- **07-question** : Question ! Le vecteur u a pour coordonnées 1, 2, 3, et le vecteur v a pour coordonnées 2, 4, 6. Que peut-on dire ? A : ils ne sont pas colinéaires. B : on ne peut pas savoir. C : ils sont colinéaires. Mets pause, et choisis !
- **07b-reponse** : Réponse C. 2 égale 2 fois 1, 4 égale 2 fois 2, et 6 égale 2 fois 3. Le même facteur 2 pour les trois coordonnées : le vecteur v égale 2 fois le vecteur u. Il faut que ce soit le même facteur partout — un seul écart, et les vecteurs ne sont plus colinéaires.
- **08-rediger** : Au bac, deux lignes. Un : on calcule les coordonnées des deux vecteurs, arrivée moins départ. Deux : on cherche un nombre k tel que le second vecteur soit k fois le premier, et on le vérifie sur les trois coordonnées. Si un seul et même k marche pour les trois, les vecteurs sont colinéaires.
- **09-defi** : À toi de jouer ! A a pour coordonnées 1, 0, 0. B a pour coordonnées 0, 1, 0. Et C a pour coordonnées 0, 0, 1. Calcule les coordonnées des vecteurs A B et A C, puis dis s'ils sont colinéaires. Mets pause, et cherche !
- **09b-correction** : Correction. Le vecteur A B a pour coordonnées moins 1, 1, 0. Le vecteur A C a pour coordonnées moins 1, 0, 1. Les premières coordonnées sont égales, donc le facteur k vaudrait 1. Mais avec k égal à 1, la deuxième coordonnée du vecteur A C devrait valoir 1, et elle vaut 0. Les deux vecteurs ne sont donc pas colinéaires, et les points A, B et C ne sont pas alignés.
- **10-finale** : Ce que tu as appris. Un vecteur de l'espace, c'est trois coordonnées. Le vecteur A B, c'est arrivée moins départ. Et deux vecteurs sont colinéaires quand un seul et même nombre multiplie les trois coordonnées.
- **11-abonne** : Entraîne-toi sur éleveai point f r. Et abonne-toi !

## ✅ Passe MATHS de E1 — faite le 22/11/2026, avant tout rendu

⭐ Passe **séparée du style**, commencée par la correction et la finale, comme l'exige
`manim/REPRISE-entiers-cm1-6e.md` (la voix validée qui disait « 6 032 a 3 centaines »).
Chaque ligne ci-dessous a été recalculée, pas relue.

| Clip | Ce que la voix affirme | Recalcul | Verdict |
|---|---|---|---|
| `09b` | vecteur A B = (−1 ; 1 ; 0) | B − A = (0−1 ; 1−0 ; 0−0) | ✅ |
| `09b` | vecteur A C = (−1 ; 0 ; 1) | C − A = (0−1 ; 0−0 ; 1−0) | ✅ |
| `09b` | « les premières coordonnées sont égales, donc k vaudrait 1 » | −1 = k × (−1) ⟹ k = 1 | ✅ |
| `09b` | « avec k = 1, la 2ᵉ coordonnée de A C devrait valoir 1, et elle vaut 0 » | k × 1 = 1 ≠ 0 | ✅ **la justification, pas seulement le résultat** |
| `09b` | « donc A, B et C ne sont pas alignés » | A, B, C alignés ⟺ AB et AC colinéaires | ✅ |
| `10` | « A B, c'est arrivée moins départ » | définition | ✅ |
| `10` | « un seul et même nombre multiplie les trois coordonnées » | ⚠️ formulation volontaire : c'est le **même** k pour les trois | ✅ |
| `02` | A(1 ; 2 ; 3), B(4 ; 6 ; 3) ⟹ A B = (3 ; 4 ; 0) | (4−1 ; 6−2 ; 3−3) | ✅ |
| `02` | « ce zéro dit que B est à la même hauteur que A » | 3ᵉ coordonnée = hauteur, 3 − 3 = 0 | ✅ |
| `04` | A(2 ; 1 ; 0), B(2 ; 1 ; 5) ⟹ réponse A = (0 ; 0 ; 5) | (2−2 ; 1−1 ; 5−0) | ✅ |
| `04` | leurre B = (4 ; 2 ; 5) | c'est la SOMME A + B — leurre crédible, et nommé en `04b` | ✅ |
| `04` | leurre C = (0 ; 0 ; 1) | « il y a un écart, donc 1 » — l'erreur de celui qui compte au lieu de soustraire | ✅ |
| `04b` | « 5 moins 0 fait 5 » | ✅ | ✅ |
| `05` | u(1 ; 2 ; −1) + v(3 ; 0 ; 2) = (4 ; 2 ; 1) | (1+3 ; 2+0 ; −1+2) | ✅ |
| `05` | 2 u = (2 ; 4 ; −2) | 2 × (1 ; 2 ; −1) | ✅ |
| `07` | u(1 ; 2 ; 3), v(2 ; 4 ; 6) ⟹ colinéaires | v = 2 u, le même facteur 2 partout | ✅ |
| `07b` | « 2 = 2×1, 4 = 2×2, 6 = 2×3 » | ✅ | ✅ |
| `06` | « trois vecteurs deux à deux non colinéaires peuvent être coplanaires » | ex. (1;0;0), (0;1;0), (1;1;0) : deux à deux non colinéaires, tous dans z = 0 | ✅ **vrai, et c'est bien le piège de terminale** |

⛔ **Les trois leurres de chaque question s'excluent-ils deux à deux ?**
`04` : (0;0;5), (4;2;5), (0;0;1) — trois triplets distincts, une seule réponse défendable ✅.
`07` : « colinéaires » / « pas colinéaires » / « on ne peut pas savoir » — s'excluent, et
« on ne peut pas savoir » est faux puisque les coordonnées sont données ✅.

⏳ **Reste à faire sur E1** : validation de la voix par Frédéric, puis WAV + marques,
puis le script Manim, puis `-ql`, planche, zone Margo, HD, branchement au coach.

### Short — « arrivée moins départ »

**Une seule idée**, celle de l'épisode : le vecteur A B se calcule en une soustraction, coordonnée par coordonnée.
⛔ Un short ne RÉSUME pas son épisode — il en prend une idée et la rend en une minute.
**Bonne réponse : B** (tirage des shorts, table en tête de fichier).

- **00-accroche** : Un vecteur dans l'espace, c'est trois nombres. Et pour les trouver, un seul geste : arrivée moins départ.
- **01-idee** : A a pour coordonnées 1, 0, 0 et B a pour coordonnées 1, 0, 2. Pour le vecteur A B, on soustrait coordonnée par coordonnée : 1 moins 1 fait 0, 0 moins 0 fait 0, et 2 moins 0 fait 2. Donc A B a pour coordonnées 0, 0, 2.
- **02-question** : Question ! A a pour coordonnées 3, 1, 0. B a pour coordonnées 5, 1, 0. Coordonnées du vecteur A B ? A : 8, 2, 0. B : 2, 0, 0. C : moins 2, 0, 0. Mets pause, et choisis !
- **02b-reponse** : Réponse B. 5 moins 3 fait 2, 1 moins 1 fait 0, 0 moins 0 fait 0. La réponse A, c'est la somme. Et moins 2, 0, 0, c'est le vecteur B A, le même dans l'autre sens.
- **03-commentaire** : À toi ! A a pour coordonnées 2, 1, 4 et B a pour coordonnées 2, 5, 4. Que vaut le vecteur A B ? Réponds en commentaire !
- **04-abonne** : Entraîne-toi sur éleveai point f r. Et abonne-toi !

#### ✅ Passe MATHS du short de E1 — recalculée, pas relue

| Clip | Ce que la voix affirme | Recalcul |
|---|---|---|
| `01` | A(1;0;0), B(1;0;2) ⟹ A B = (0;0;2) | (1−1 ; 0−0 ; 2−0) |
| `02` | bonne réponse (2;0;0) | (5−3 ; 1−1 ; 0−0) |
| `02b` | leurre A = (8;2;0) | c'est A + B, la SOMME : 3+5, 1+1, 0+0 |
| `02b` | leurre C = (−2;0;0) | c'est départ − arrivée, donc le vecteur B A |
| `03` | défi A(2;1;4), B(2;5;4) | A B = (0;4;0) — ⛔ non dit, non affiché |

⛔ **Exclusion deux à deux des trois propositions ?** (8;2;0), (2;0;0), (−2;0;0) — trois triplets distincts, et un seul est B − A ✅.

---

# E2 · `terminale-espace-repere-coordonnees`

**Micro** : `espace_repere_coordonnees` — Travailler avec des coordonnées dans l'espace (notion `geometrie_espace`).
**Métier / contexte** : Lila, magasinière dans un entrepôt du Port — une adresse à trois nombres.
**Code couleur** : ambre = ce qu'on regarde, bleu = le cube, vert = juste, rouge = le piège.

- **00-garde** : Coordonnées dans l'espace. Trois nombres pour un point, une moyenne pour un milieu, et un repère bien choisi qui transforme la géométrie en calcul.
- **01-situation** : Voici Lila. Elle est magasinière dans un entrepôt du Port. Chaque colis a une adresse à trois nombres : l'allée, la profondeur, l'étage. Quatre, deux, trois, et le colis est trouvé en vingt secondes. Dans l'espace, c'est exactement pareil : une origine, trois directions, et trois nombres par point.
- **02-idee** : Un repère de l'espace, c'est une origine et trois vecteurs. On donne les coordonnées d'un point toujours dans le même ordre : x, y, z. Et le plus beau, c'est qu'on choisit souvent le repère soi-même. Dans le cube A B C D E F G H, on prend A comme origine et les vecteurs A B, A D et A E. Alors A a pour coordonnées 0, 0, 0. B : 1, 0, 0. D : 0, 1, 0. E : 0, 0, 1. Et le sommet G, tout à l'opposé de A : 1, 1, 1. Que des zéros et des uns.
- **03-theoreme** : Le milieu, c'est la moyenne. Pour le milieu du segment A B, on additionne les coordonnées de A et celles de B, et on divise par deux. Trois fois : une fois pour x, une fois pour y, une fois pour z. Rien de plus que dans le plan, avec une coordonnée en plus.
- **04-question** : Question ! A a pour coordonnées 1, 3, 5, et B a pour coordonnées 3, 1, 1. Quelles sont les coordonnées du milieu du segment A B ? A : 4, 4, 6. B : 1, moins 1, moins 2. C : 2, 2, 3. Mets pause, et choisis !
- **04b-reponse** : Réponse C. 1 plus 3 fait 4, divisé par deux : 2. 3 plus 1 fait 4, divisé par deux : 2. 5 plus 1 fait 6, divisé par deux : 3. La réponse A, c'est la somme : on a oublié de diviser. Et la réponse B, c'est la moitié du vecteur A B : un vecteur, pas un point.
- **05-appliquer** : Appliquons dans le cube. Le milieu de la grande diagonale A G : A est l'origine, G a pour coordonnées 1, 1, 1, donc le milieu a pour coordonnées 0,5 ; 0,5 ; 0,5. Calculons maintenant le milieu de l'autre diagonale, C E. C a pour coordonnées 1, 1, 0 et E a pour coordonnées 0, 0, 1 : le milieu a pour coordonnées 0,5 ; 0,5 ; 0,5. Le même point ! Les quatre grandes diagonales du cube se coupent toutes en son centre.
- **06-piege** : Voilà le piège ! Les coordonnées fonctionnent dans n'importe quel repère, mais les longueurs, non. Prends un pavé droit dont l'arête A B mesure 4 centimètres et l'arête A D mesure 1 centimètre. Dans le repère A, A B, A D, A E, le point B a toujours pour coordonnées 1, 0, 0 et le point D a pour coordonnées 0, 1, 0. Ils ont l'air symétriques, et pourtant B est quatre fois plus loin de A que D. Milieux et colinéarité : toujours valables. Distances et angles : seulement si le repère est orthonormé.
- **07-question** : Question ! Dans le cube A B C D E F G H muni du repère A, A B, A D, A E, quelles sont les coordonnées du sommet G ? A : 1, 1, 1. B : 1, 1, 0. C : 0, 1, 1. Mets pause, et choisis !
- **07b-reponse** : Réponse A. Pour aller de A à G, on fait un pas dans chacune des trois directions : un vers B, un vers D, un vers le haut. Le triplet 1, 1, 0, c'est le sommet C, resté au sol. Et 0, 1, 1, c'est le sommet H : il manque le pas vers B.
- **08-rediger** : Au bac, on commence toujours par là. Une ligne pour annoncer le repère : on se place dans le repère A, A B, A D, A E, qui est orthonormé. Puis on écrit les coordonnées de tous les points utiles, les sommets d'abord, les milieux ensuite. Cette ligne-là rapporte des points, et sans elle tout le reste est bancal.
- **09-defi** : À toi de jouer ! Dans le même cube, I est le milieu du segment E F et J est le milieu du segment G H. Donne les coordonnées de I et de J, puis celles du vecteur I J. Mets pause, et cherche !
- **09b-correction** : Correction. E a pour coordonnées 0, 0, 1 et F a pour coordonnées 1, 0, 1 : leur milieu I a pour coordonnées 0,5 ; 0 ; 1. G a pour coordonnées 1, 1, 1 et H a pour coordonnées 0, 1, 1 : leur milieu J a pour coordonnées 0,5 ; 1 ; 1. Le vecteur I J, c'est arrivée moins départ : 0, 1, 0. Et ce triplet est exactement celui du vecteur A D. Les droites I J et A D sont donc parallèles, et tu l'as démontré sans regarder le dessin.
- **10-finale** : Ce que tu as appris. Trois coordonnées, toujours dans l'ordre x, y, z. Le milieu, c'est la moyenne des coordonnées. Et choisir le repère du cube, c'est remplacer un dessin difficile par des zéros et des uns.
- **11-abonne** : Entraîne-toi sur éleveai point f r. Et abonne-toi !

## ✅ Passe MATHS de E2 — faite le 22/11/2026, avant tout rendu

| Clip | Ce que la voix affirme | Recalcul | Verdict |
|---|---|---|---|
| `09b` | I milieu de [EF] = (0,5 ; 0 ; 1) | E(0;0;1), F(1;0;1) → ((0+1)/2 ; 0 ; 1) | ✅ |
| `09b` | J milieu de [GH] = (0,5 ; 1 ; 1) | G(1;1;1), H(0;1;1) → ((1+0)/2 ; 1 ; 1) | ✅ |
| `09b` | vecteur IJ = (0 ; 1 ; 0) | J − I = (0,5−0,5 ; 1−0 ; 1−1) | ✅ |
| `09b` | « ce triplet est celui de AD » | AD = D − A = (0 ; 1 ; 0) | ✅ |
| `10` | le milieu est la moyenne | définition | ✅ |
| `02` | repère (A ; AB, AD, AE) : A(0;0;0), B(1;0;0), D(0;1;0), E(0;0;1), G(1;1;1) | G = A + AB + AD + AE | ✅ |
| `04` | milieu de [AB] avec A(1;3;5), B(3;1;1) = (2;2;3) | (4/2 ; 4/2 ; 6/2) | ✅ |
| `04` | leurre B = (4;4;6) | la somme, division oubliée | ✅ |
| `04` | leurre C = (1;−1;−2) | AB = (2;−2;−4), sa moitié — un vecteur, pas un point : nommé en `04b` | ✅ |
| `05` | milieu de [AG] = (0,5 ; 0,5 ; 0,5) | A(0;0;0), G(1;1;1) | ✅ |
| `05` | milieu de [CE] = le même point | C(1;1;0), E(0;0;1) → (0,5 ; 0,5 ; 0,5) | ✅ |
| `05` | « les QUATRE grandes diagonales » | [AG], [BH], [CE], [DF] — un cube en a bien 4 | ✅ |
| `06` | pavé AB = 4 cm, AD = 1 cm : B et D gardent (1;0;0) et (0;1;0) | les coordonnées sont relatives à la base, pas métriques | ✅ **le repère n'est alors plus normé** |
| `07` | G = (1;1;1) | un pas sur chaque vecteur de base | ✅ |
| `07` | leurre B = (1;1;0) est C | C = A + AB + AD | ✅ |
| `07` | leurre C = (0;1;1) est H | H = A + AD + AE | ✅ |

⛔ **Exclusion deux à deux des propositions ?**
`04` : (2;2;3), (4;4;6), (1;−1;−2) — trois triplets distincts, une seule bonne ✅.
`07` : (1;1;1), (1;1;0), (0;1;1) — trois sommets distincts du cube, une seule bonne ✅.

### Short — « que des zéros et des uns »

**Une seule idée**, celle de l'épisode : choisir le repère du cube remplace un dessin difficile par des zéros et des uns.
⛔ Un short ne RÉSUME pas son épisode — il en prend une idée et la rend en une minute.
**Bonne réponse : C** (tirage des shorts, table en tête de fichier).

- **00-accroche** : Dans un cube, les coordonnées des huit sommets ne contiennent que des zéros et des uns. À une seule condition : bien choisir le repère.
- **01-idee** : Prends le cube A B C D E F G H. On choisit A comme origine, et les vecteurs A B, A D et A E comme directions. Alors A a pour coordonnées 0, 0, 0. B : 1, 0, 0. D : 0, 1, 0. E : 0, 0, 1. Et G, tout à l'opposé de A : 1, 1, 1.
- **02-question** : Question ! Dans ce cube, coordonnées du sommet H ? A : 1, 1, 0. B : 0, 0, 1. C : 0, 1, 1. Mets pause, et choisis !
- **02b-reponse** : Réponse C. De A à H : aucun pas vers B, un pas vers D, un pas vers le haut. Donc 0, 1, 1. Le triplet 1, 1, 0, c'est le sommet C. Et 0, 0, 1, c'est le sommet E.
- **03-commentaire** : À toi ! Dans le même cube et le même repère, quelles sont les coordonnées du sommet F ? Réponds en commentaire !
- **04-abonne** : Entraîne-toi sur éleveai point f r. Et abonne-toi !

#### ✅ Passe MATHS du short de E2 — recalculée, pas relue

| Clip | Ce que la voix affirme | Recalcul |
|---|---|---|
| `01` | A(0;0;0), B(1;0;0), D(0;1;0), E(0;0;1), G(1;1;1) | repère (A ; A B, A D, A E) : un pas par direction |
| `02` | bonne réponse H = (0;1;1) | H = D + A E : 0 pas vers B, 1 vers D, 1 vers le haut |
| `02b` | leurre A = (1;1;0) | c'est C, le sommet opposé à A DANS le sol |
| `02b` | leurre B = (0;0;1) | c'est E : il manque le pas vers D |
| `03` | défi : le sommet F | F = (1;0;1) — ⛔ non dit, non affiché |

⛔ **Exclusion deux à deux des trois propositions ?** (1;1;0), (0;0;1), (0;1;1) — trois sommets distincts du cube, un seul est H ✅.

---

# E3 · `terminale-espace-droite-parametrique`

**Micro** : `espace_droite_parametrique` — Utiliser une représentation paramétrique de droite (notion `geometrie_espace`).
**Métier / contexte** : Soraya, contrôleuse aérienne — un avion en montée, la même avancée chaque minute.
**Code couleur** : ambre = ce qu'on regarde, bleu = la droite, rose = le vecteur directeur, vert = juste, rouge = le piège.

- **00-garde** : Représentation paramétrique d'une droite. Un point de départ, une direction, un curseur qui glisse : toute la droite tient en trois lignes.
- **01-situation** : Voici Soraya. Elle est contrôleuse aérienne. Sur son écran, un avion en montée suit une ligne droite : chaque minute il avance de la même façon, tant vers l'est, tant vers le nord, tant en altitude. Si elle connaît sa position maintenant et son avancée par minute, elle sait où il sera dans sept minutes. Une représentation paramétrique, c'est exactement cela.
- **02-idee** : Une droite, c'est un point et une direction. Prenons le point A de coordonnées 1, 2, 0, et le vecteur directeur u de coordonnées 2, moins 1, 3. Un point de la droite s'écrit alors : x égale 1 plus 2 t, y égale 2 moins t, z égale 3 t, où t est un nombre réel quelconque. Pour t égal à zéro, on retombe sur A. Pour t égal à 1, on obtient le point de coordonnées 3, 1, 3.
- **03-theoreme** : Dans ces trois lignes, tout se lit. Les nombres sans t sont les coordonnées d'un point de la droite. Les coefficients de t sont les coordonnées du vecteur directeur. Et un point appartient à la droite s'il existe un t qui donne ses trois coordonnées : le même t pour les trois.
- **04-question** : Question ! La droite d est donnée par x égale 1 plus 2 t, y égale 2 moins t, z égale 3 t. Quel est un vecteur directeur de d ? A : 1, 2, 0. B : 3, 1, 3. C : 2, moins 1, 3. Mets pause, et choisis !
- **04b-reponse** : Réponse C. Le vecteur directeur, ce sont les coefficients de t avec leurs signes : 2, moins 1 et 3. Le triplet 1, 2, 0, ce sont les nombres sans t : c'est un point de la droite, pas une direction. Et 3, 1, 3, c'est le point obtenu pour t égal à 1 : encore un point. Un point n'est jamais une direction.
- **05-appliquer** : Appliquons. Le point B de coordonnées 5, 0, 6 est-il sur la droite d ? On commence par la première ligne : 1 plus 2 t égale 5, donc t vaut 2. Maintenant on vérifie avec ce t, et seulement avec celui-là. Pour y : 2 moins 2 fait 0, c'est bon. Pour z : 3 fois 2 fait 6, c'est bon. Les trois lignes sont d'accord pour t égal à 2 : B est bien sur la droite d.
- **06-piege** : Voilà le piège ! Une même droite a une infinité de représentations paramétriques. On peut partir d'un autre point, et multiplier le vecteur directeur par n'importe quel nombre non nul. Regarde : x égale 3 plus 4 s, y égale 1 moins 2 s, z égale 3 plus 6 s. Cela ne ressemble pas du tout au système de tout à l'heure, et c'est pourtant la même droite d. Le point 3, 1, 3 est sur d, et le vecteur 4, moins 2, 6 est le double de 2, moins 1, 3. Deux systèmes différents ne veulent donc pas dire deux droites différentes.
- **07-question** : Question ! Le point C de coordonnées 7, moins 1, 10 est-il sur la droite d ? A : non, la troisième coordonnée ne suit pas. B : oui, t égal à 3 convient. C : on ne peut pas le savoir avec un seul point. Mets pause, et choisis !
- **07b-reponse** : Réponse A. La première ligne donne 1 plus 2 t égale 7, donc t vaut 3. La deuxième suit : 2 moins 3 fait bien moins 1. Mais la troisième donne 3 fois 3, c'est-à-dire 9, et on nous propose 10. Deux lignes sur trois, cela ne compte pas : C n'est pas sur d. Et c'est exactement le piège de la réponse B.
- **08-rediger** : Au bac, deux rédactions à connaître. Pour donner la droite : d passe par le point A et a pour vecteur directeur u, donc une représentation paramétrique de d est, et on écrit les trois lignes, en précisant que t est réel. Pour tester un point : la première équation donne t égale tant, et pour cette valeur les deux autres équations sont vérifiées, ou ne le sont pas.
- **09-defi** : À toi de jouer ! A a pour coordonnées 2, 0, 1, et B a pour coordonnées 2, 3, moins 1. Écris une représentation paramétrique de la droite A B. Mets pause, et cherche !
- **09b-correction** : Correction. D'abord le vecteur directeur : le vecteur A B, c'est arrivée moins départ, donc 0, 3, moins 2. Ensuite on part du point A. On obtient : x égale 2, y égale 3 t, z égale 1 moins 2 t, avec t réel. Et regarde la première ligne : x vaut 2 quel que soit t. Toute la droite reste donc dans le plan d'équation x égale 2.
- **10-finale** : Ce que tu as appris. Une droite, c'est un point plus une direction. Les coefficients de t donnent le vecteur directeur, les nombres seuls donnent un point. Et pour savoir si un point est sur la droite, il faut un seul et même t pour les trois coordonnées.
- **11-abonne** : Entraîne-toi sur éleveai point f r. Et abonne-toi !

## ✅ Passe MATHS de E3 — faite le 22/11/2026, avant tout rendu

| Clip | Ce que la voix affirme | Recalcul | Verdict |
|---|---|---|---|
| `09b` | AB = (0 ; 3 ; −2) | B − A = (2−2 ; 3−0 ; −1−1) | ✅ |
| `09b` | x = 2, y = 3t, z = 1 − 2t | A(2;0;1) + t·(0;3;−2) | ✅ |
| `09b` | « toute la droite est dans le plan x = 2 » | la 1ʳᵉ coordonnée est constante | ✅ |
| `10` | les coefficients de t sont le vecteur directeur | définition | ✅ |
| `02` | t = 0 donne A(1;2;0) | 1+0 ; 2−0 ; 0 | ✅ |
| `02` | t = 1 donne (3;1;3) | 1+2 ; 2−1 ; 3 | ✅ |
| `04` | directeur = (2;−1;3) | coefficients de t | ✅ |
| `04` | leurre B = (1;2;0) | c'est le point A ; colinéaire à u ? 1/2 ≠ 2/(−1) → non | ✅ |
| `04` | leurre C = (3;1;3) | point pour t = 1 ; colinéaire à u ? 3/2 ≠ 1/(−1) → non | ✅ |
| `05` | B(5;0;6) est sur d | x : t = 2 ; y : 2−2 = 0 ✅ ; z : 3×2 = 6 ✅ | ✅ |
| `06` | (3;1;3) est sur d | 1+2t = 3 → t = 1, puis y = 1 ✅, z = 3 ✅ | ✅ |
| `06` | (4;−2;6) est le double de (2;−1;3) | 2×(2;−1;3) | ✅ |
| `07` | C(7;−1;10) n'est pas sur d | x : t = 3 ; y : 2−3 = −1 ✅ ; z : 3×3 = 9 ≠ 10 | ✅ **deux lignes sur trois ne suffisent pas** |
| `07b` | « la troisième donne 9 » | 3 × 3 | ✅ |

⛔ **Exclusion deux à deux des propositions ?**
`04` : trois triplets distincts, et un seul est colinéaire au vecteur directeur ✅.
`07` : « non » / « oui » / « on ne peut pas savoir » s'excluent, et la troisième est fausse puisque le système suffit à décider ✅.

### Short — « les coefficients de t sont la direction »

**Une seule idée**, celle de l'épisode : dans les trois lignes, les nombres sans t donnent un point et les coefficients de t donnent la direction.
⛔ Un short ne RÉSUME pas son épisode — il en prend une idée et la rend en une minute.
**Bonne réponse : A** (tirage des shorts, table en tête de fichier).

- **00-accroche** : Une représentation paramétrique, c'est trois lignes. Et tout y est écrit : un point, et une direction.
- **01-idee** : Regarde : x égale 1 plus 2 t, y égale 2 moins t, z égale 3 t. Les nombres sans t donnent un point de la droite : 1, 2, 0. Les coefficients de t, avec leurs signes, donnent le vecteur directeur : 2, moins 1, 3.
- **02-question** : Question ! La droite d : x égale 2 plus 3 t, y égale moins t, z égale 1 plus 4 t. Vecteur directeur de d ? A : 3, moins 1, 4. B : 2, 0, 1. C : 3, 1, 4. Mets pause, et choisis !
- **02b-reponse** : Réponse A. On lit les coefficients de t avec leurs signes : 3, moins 1 et 4. Le triplet 2, 0, 1, ce sont les nombres sans t : un point, pas une direction. Et 3, 1, 4 oublie le signe.
- **03-commentaire** : À toi ! La droite d prime est donnée par x égale 4 moins 2 t, y égale 3 t, z égale moins 1 plus t. Quel est un vecteur directeur ? Réponds en commentaire !
- **04-abonne** : Entraîne-toi sur éleveai point f r. Et abonne-toi !

#### ✅ Passe MATHS du short de E3 — recalculée, pas relue

| Clip | Ce que la voix affirme | Recalcul |
|---|---|---|
| `01` | x = 1 + 2t, y = 2 − t, z = 3t ⟹ point (1;2;0) | les termes SANS t, dans l'ordre x, y, z |
| `01` | ⟹ vecteur directeur (2;−1;3) | les coefficients DE t, avec leurs signes |
| `02` | x = 2 + 3t, y = −t, z = 1 + 4t ⟹ bonne réponse (3;−1;4) | coefficients de t : 3, −1, 4 |
| `02b` | leurre B = (2;0;1) | les termes sans t : c'est un POINT de d |
| `02b` | leurre C = (3;1;4) | le signe de la 2ᵉ ligne oublié : −t donne −1, pas +1 |
| `03` | défi x = 4 − 2t, y = 3t, z = −1 + t | directeur (−2;3;1) — ⛔ non dit, non affiché |

⛔ **Exclusion deux à deux des trois propositions ?** (3;−1;4), (2;0;1), (3;1;4) — trois triplets distincts, et un seul est colinéaire à la direction de d ✅ (⚠️ (3;1;4) n'est PAS colinéaire à (3;−1;4) : 3/3 = 1 mais 1/(−1) = −1).

---

# E4 · `terminale-espace-plan-equation`

**Micro** : `espace_plan_equation` — Utiliser une équation cartésienne de plan (notion `geometrie_espace`).
**Métier / contexte** : Jean-Bernard, charpentier — un pan de toiture décrit par une seule ligne.
**Code couleur** : ambre = ce qu'on regarde, bleu = le plan, vert = juste, rouge = le piège.

- **00-garde** : Équation cartésienne d'un plan. Une seule équation, trois inconnues — et dans l'espace, cela ne donne jamais une droite, mais un plan tout entier.
- **01-situation** : Voici Jean-Bernard, charpentier. Quand il pose un pan de toiture, il travaille sur une surface parfaitement plate, ni horizontale ni verticale. Pour dire à la machine de découpe où se trouve ce pan, il ne lui donne pas des milliers de points : il lui donne une équation. Une seule ligne, et le plan entier est décrit.
- **02-idee** : Tout plan de l'espace a une équation de la forme a x plus b y plus c z plus d égale zéro, où a, b et c ne sont pas tous nuls. Et réciproquement, toute équation de cette forme décrit un plan. Prenons le plan P d'équation 2 x plus y moins z plus 1 égale zéro. Le point A de coordonnées 0, 0, 1 est-il dedans ? On remplace : 2 fois 0, plus 0, moins 1, plus 1. Cela fait zéro. Donc oui, A est dans le plan P.
- **03-theoreme** : La règle est sans nuance : un point appartient au plan si et seulement si ses coordonnées annulent l'équation. Pas presque zéro : zéro. Et si on connaît les coefficients a, b, c et un point du plan, on trouve le terme constant d en remplaçant.
- **04-question** : Question ! Le plan P a pour équation x plus y moins z moins 1 égale zéro. Lequel de ces trois points est dans P ? A : 1, 2, 3. B : 2, 0, 0. C : 1, 1, 1. Mets pause, et choisis !
- **04b-reponse** : Réponse C. Pour le point 1, 1, 1 : 1 plus 1 moins 1 moins 1 fait zéro, il est dans le plan. Pour 1, 2, 3 : 1 plus 2 moins 3 moins 1 fait moins 1, ce n'est pas zéro, donc il n'y est pas. Et pour 2, 0, 0 : 2 plus 0 moins 0 moins 1 fait 1, il n'y est pas non plus. Un résultat proche de zéro reste un refus.
- **05-appliquer** : Appliquons. On cherche l'équation du plan dont les coefficients sont 3, moins 1, 2 et qui passe par le point B de coordonnées 1, 1, 0. On écrit 3 x moins y plus 2 z plus d égale zéro, puis on remplace par B : 3 fois 1, moins 1, plus 2 fois 0, plus d. Cela donne 2 plus d égale zéro, donc d vaut moins 2. L'équation est 3 x moins y plus 2 z moins 2 égale zéro. Vérifions avec B : 3 moins 1 plus 0 moins 2 fait zéro. Parfait.
- **06-piege** : Voilà le piège, et il est énorme ! Dans le plan, une équation à deux inconnues comme y égale 2 x plus 1 donne une droite. Dans l'espace, une équation à trois inconnues donne un plan, jamais une droite. L'équation z égale zéro ne décrit pas un point de hauteur nulle : elle décrit le sol tout entier, le plan x O y. L'équation x égale 2 décrit un plan parallèle au plan y O z. Et pour décrire une droite dans l'espace, une équation ne suffit pas : il faut une représentation paramétrique, ou bien deux équations de plans.
- **07-question** : Question ! Dans l'espace, l'ensemble des points qui vérifient y égale 1, c'est : A : une droite. B : un plan. C : un point. Mets pause, et choisis !
- **07b-reponse** : Réponse B, un plan. Réécrivons l'équation sous sa forme complète : zéro fois x, plus 1 fois y, plus zéro fois z, moins 1, égale zéro. C'est bien une équation de plan, avec les coefficients zéro, 1 et zéro, qui ne sont pas tous nuls. Ce plan est parallèle au plan x O z. Et retiens pourquoi : x et z sont totalement libres, et ce sont deux libertés qui font une surface, pas une ligne.
- **08-rediger** : Au bac, trois lignes. Un : le plan P a une équation de la forme a x plus b y plus c z plus d égale zéro. Deux : on remplace par les coordonnées d'un point connu pour trouver d. Trois : on vérifie avec un deuxième point de l'énoncé, et on écrit cette vérification. Elle attrape presque toutes les erreurs de signe.
- **09-defi** : À toi de jouer ! Le plan P a pour équation 2 x moins 3 y plus z moins 4 égale zéro. Les points A, de coordonnées 2, 0, 0, et B, de coordonnées 0, moins 1, 1, sont-ils dans P ? Mets pause, et cherche !
- **09b-correction** : Correction. Pour A : 2 fois 2, moins 3 fois 0, plus 0, moins 4. Donc 4 moins 4, égale zéro : A est dans P. Pour B : 2 fois 0, cela fait zéro. Puis moins 3 fois moins 1 — et c'est là qu'il faut être solide : moins par moins fait plus, donc plus 3. Ensuite plus 1, puis moins 4. Zéro plus 3 plus 1 moins 4 fait zéro : B est dans P aussi. Les deux points appartiennent au plan, et le seul vrai danger de ce calcul était un signe.
- **10-finale** : Ce que tu as appris. Un plan, c'est une équation de la forme a x plus b y plus c z plus d égale zéro. Un point y appartient si ses coordonnées annulent l'équation, exactement. On trouve d en remplaçant par un point connu. Et dans l'espace, une seule équation donne un plan, pas une droite.
- **11-abonne** : Entraîne-toi sur éleveai point f r. Et abonne-toi !

## ✅ Passe MATHS de E4 — faite le 22/11/2026, avant tout rendu

| Clip | Ce que la voix affirme | Recalcul | Verdict |
|---|---|---|---|
| `09b` | A(2;0;0) est dans P : 2x − 3y + z − 4 = 0 | 2×2 − 0 + 0 − 4 = 0 | ✅ |
| `09b` | B(0;−1;1) est dans P | 0 − 3×(−1) + 1 − 4 = 0 + 3 + 1 − 4 = 0 | ✅ **moins par moins = plus, le seul danger** |
| `10` | « un point y est si ses coordonnées annulent l'équation » | définition | ✅ |
| `02` | A(0;0;1) est dans 2x + y − z + 1 = 0 | 0 + 0 − 1 + 1 = 0 | ✅ |
| `04` | (1;1;1) est dans x + y − z − 1 = 0 | 1 + 1 − 1 − 1 = 0 | ✅ |
| `04` | leurre B (1;2;3) donne −1 | 1 + 2 − 3 − 1 | ✅ |
| `04` | leurre C (2;0;0) donne 1 | 2 + 0 − 0 − 1 | ✅ |
| `05` | 3x − y + 2z + d = 0 par B(1;1;0) ⟹ d = −2 | 3 − 1 + 0 + d = 0 | ✅ |
| `05` | vérification sur B | 3 − 1 + 0 − 2 = 0 | ✅ |
| `06` | « z = 0 est le plan (Oxy) tout entier » | 0x + 0y + 1z + 0 = 0 ; x et y libres | ✅ |
| `06` | « x = 2 est parallèle au plan (Oyz) » | coefficients (1;0;0), même direction normale que x = 0 | ✅ |
| `06` | « une droite demande une paramétrique ou deux équations » | une équation ⟹ une surface de dimension 2 | ✅ |
| `07` | y = 1 est un plan | 0x + 1y + 0z − 1 = 0, coefficients non tous nuls | ✅ |
| `07b` | « parallèle au plan (Oxz) » | (Oxz) a pour équation y = 0 | ✅ |

⛔ **Exclusion deux à deux des propositions ?**
`04` : trois points distincts, un seul annule l'équation (les deux autres donnent −1 et 1) ✅.
`07` : « un plan » / « une droite » / « un point » s'excluent par dimension ✅.

### Short — « une équation, c'est un plan »

**Une seule idée**, celle de l'épisode : dans l'espace une seule équation à trois inconnues décrit un plan, jamais une droite.
⛔ Un short ne RÉSUME pas son épisode — il en prend une idée et la rend en une minute.
**Bonne réponse : C** (tirage des shorts, table en tête de fichier).

- **00-accroche** : Dans le plan, une équation donne une droite. Dans l'espace, elle donne un plan tout entier. C'est le piège le plus coûteux du chapitre.
- **01-idee** : Prends l'équation z égale zéro. Dans l'espace, ce n'est pas un point de hauteur nulle, et ce n'est pas une droite : c'est le sol tout entier, le plan x O y. Pourquoi ? Parce que x et y restent libres, et deux libertés font une surface.
- **02-question** : Question ! Dans l'espace, les points tels que x égale 2, c'est : A : une droite. B : un point. C : un plan. Mets pause, et choisis !
- **02b-reponse** : Réponse C, un plan. Réécrivons l'équation en entier : 1 fois x, plus zéro fois y, plus zéro fois z, moins 2, égale zéro. C'est bien la forme a x plus b y plus c z plus d égale zéro. Ici y et z sont libres.
- **03-commentaire** : À toi ! Dans l'espace, l'ensemble des points qui vérifient y égale moins 3, c'est quoi ? Réponds en commentaire !
- **04-abonne** : Entraîne-toi sur éleveai point f r. Et abonne-toi !

#### ✅ Passe MATHS du short de E4 — recalculée, pas relue

| Clip | Ce que la voix affirme | Recalcul |
|---|---|---|
| `01` | z = 0 est le plan xOy, pas un point | 0x + 0y + 1z + 0 = 0 : a, b, c non tous nuls ⟹ un plan |
| `01` | « x et y restent libres » | l'équation ne contraint que z ⟹ 2 degrés de liberté ⟹ une surface |
| `02` | x = 2 ⟹ bonne réponse : un plan | 1x + 0y + 0z − 2 = 0 : la forme d'un plan |
| `02b` | « parallèle au plan yOz » | normale (1;0;0) ⟹ normale de yOz ; et 2 ≠ 0 ⟹ pas confondus |
| `02b` | leurres « une droite » / « un point » | ⛔ faux dans l'espace : une seule équation NE descend PAS en dimension 1 |
| `03` | défi y = −3 | un plan parallèle à xOz — ⛔ non dit, non affiché |

⛔ **Exclusion deux à deux des trois propositions ?** « une droite » / « un point » / « un plan » s'excluent par dimension ✅.

---

# E5 · `terminale-espace-position-relative`

**Micro** : `espace_position_relative` — Étudier la position relative de droites et de plans (notion `geometrie_espace`).
**Métier / contexte** : la route qui passe sous le pont — deux tracés qui ne se rencontrent jamais et ne sont pas parallèles.
**Code couleur** : ambre = ce qu'on regarde, bleu = la droite, rose = la seconde droite, vert = juste, rouge = le piège.

- **00-garde** : Positions relatives dans l'espace. Deux droites peuvent ne jamais se rencontrer sans être parallèles — et à cela, le plan ne nous avait pas préparés.
- **01-situation** : Pense à une route qui passe sous un pont. Vue d'en haut, les deux tracés se croisent. Dans l'espace, ils ne se rencontrent jamais, et ils ne sont pas parallèles non plus. Dans le plan, cette situation n'existe pas. Dans l'espace, c'est la plus fréquente. On dit que ces deux droites ne sont pas coplanaires.
- **02-idee** : Commençons par une droite et un plan. La méthode est purement mécanique : on remplace x, y et z de la droite dans l'équation du plan, et on regarde ce qu'il reste. Prenons la droite d : x égale 1 plus t, y égale 2 t, z égale moins 1 plus t. Et le plan P : x plus y moins z moins 2 égale zéro. On remplace. Les constantes donnent 1 plus 1 moins 2, c'est-à-dire zéro. Les termes en t donnent t plus 2 t moins t, c'est-à-dire 2 t. Il reste 2 t égale zéro, donc t vaut zéro. Un seul point commun : celui de coordonnées 1, 0, moins 1.
- **03-theoreme** : Trois cas, et trois seulement. Si l'équation en t a une solution unique, la droite coupe le plan en un point : ils sont sécants. Si elle n'a aucune solution, du type 3 égale zéro, la droite est strictement parallèle au plan. Et si elle est vraie pour tout t, du type zéro égale zéro, la droite est contenue dans le plan.
- **04-question** : Question ! On remplace la droite dans l'équation du plan et on obtient 3 égale zéro. Que conclut-on ? A : la droite est parallèle au plan, sans aucun point commun. B : la droite est contenue dans le plan. C : la droite coupe le plan en un point. Mets pause, et choisis !
- **04b-reponse** : Réponse A. L'égalité 3 égale zéro est fausse, et elle est fausse pour toutes les valeurs de t : aucun point de la droite n'est dans le plan. La droite est donc strictement parallèle au plan. Si on avait obtenu zéro égale zéro, l'égalité serait vraie pour tout t, et la droite serait entièrement dans le plan. Une seule ligne de calcul sépare ces deux conclusions opposées.
- **05-appliquer** : Appliquons maintenant à deux plans. P : x plus y plus z moins 1 égale zéro, et P prime : 2 x plus 2 y plus 2 z plus 5 égale zéro. Les coefficients du second sont exactement le double de ceux du premier : les deux plans sont parallèles. Sont-ils confondus ? Divisons la seconde équation par 2 : x plus y plus z plus 2,5 égale zéro. Le terme constant vaut 2,5 et non moins 1 : ce n'est pas le même plan. Ils sont donc strictement parallèles.
- **06-piege** : Voilà le piège ! Pour deux droites de l'espace, pas de point commun ne veut pas dire parallèles. La méthode est donc en deux temps. D'abord on regarde les vecteurs directeurs : s'ils sont colinéaires, les droites sont parallèles, et même confondues si elles ont un point commun. S'ils ne sont pas colinéaires, on cherche un point commun en résolvant le système. S'il y en a un, les droites sont sécantes. Sinon, les droites ne sont pas coplanaires, et aucun plan ne les contient toutes les deux.
- **07-question** : Question ! Deux droites de l'espace n'ont aucun point commun, et leurs vecteurs directeurs ne sont pas colinéaires. Que peut-on dire ? A : elles sont parallèles. B : c'est impossible. C : elles ne sont pas coplanaires. Mets pause, et choisis !
- **07b-reponse** : Réponse C. Parallèles, cela voudrait dire des vecteurs directeurs colinéaires, et l'énoncé dit exactement le contraire. Quant à impossible, c'est tout l'inverse : c'est la route et le pont, le cas le plus courant dans l'espace. Deux droites non coplanaires, cela veut dire qu'aucun plan ne peut les contenir toutes les deux.
- **08-rediger** : Au bac, annonce la méthode avant de calculer. Pour une droite et un plan : je remplace la représentation paramétrique dans l'équation du plan, puis je conclus selon le nombre de solutions en t. Pour deux plans : je compare les coefficients, puis je teste un point. Pour deux droites : je compare les vecteurs directeurs, puis je résous le système. Et on nomme la conclusion avec le mot exact : sécants, strictement parallèles, confondus, ou non coplanaires.
- **09-defi** : À toi de jouer ! La droite d est donnée par x égale t, y égale 1 plus t, z égale 2 moins t. Le plan P a pour équation x plus y plus 2 z plus 1 égale zéro. Quelle est leur position relative ? Mets pause, et cherche !
- **09b-correction** : Correction. On remplace : t, plus 1 plus t, plus 2 fois 2 moins t, plus 1. Regardons d'abord les termes en t : t, plus t, moins 2 t. Ils s'éliminent, il n'y a plus de t du tout. Restent les constantes : 1, plus 4, plus 1, c'est-à-dire 6. L'équation devient 6 égale zéro, ce qui est faux quelle que soit la valeur de t. Aucun point de d n'appartient à P : la droite d est strictement parallèle au plan P. Et retiens ce signal : ce sont les t qui disparaissent qui annoncent le parallélisme, avant même qu'on regarde les constantes.
- **10-finale** : Ce que tu as appris. Pour une droite et un plan, on remplace et on lit l'équation en t : une solution, aucune, ou toutes. Pour deux plans, on compare les coefficients, puis on teste un point. Et dans l'espace, deux droites peuvent très bien ne jamais se croiser sans être parallèles.
- **11-abonne** : Entraîne-toi sur éleveai point f r. Et abonne-toi !

## ✅ Passe MATHS de E5 — faite le 22/11/2026, avant tout rendu

| Clip | Ce que la voix affirme | Recalcul | Verdict |
|---|---|---|---|
| `09b` | les t s'éliminent | d = (1;1;−1), P : x + y + 2z ⟹ 1 + 1 + 2×(−1) = 0 | ✅ |
| `09b` | les constantes font 6 | 0 + 1 + 2×2 + 1 = 6 | ✅ |
| `09b` | « 6 = 0 est faux pour tout t » ⟹ strictement parallèle | aucune solution ⟹ aucun point commun | ✅ |
| `09b` | « les t qui disparaissent annoncent le parallélisme » | coefficient de t nul ⟺ direction parallèle au plan | ✅ |
| `10` | trois cas selon le nombre de solutions | récapitulatif du `03` | ✅ |
| `02` | substitution ⟹ 2t | (1+t) + 2t − (−1+t) − 2 = (1+1−2) + (t+2t−t) | ✅ |
| `02` | point commun (1 ; 0 ; −1) | t = 0 dans d | ✅ |
| `02` | ce point est dans P | 1 + 0 − (−1) − 2 = 0 | ✅ |
| `03` | « 3 = 0 » ⟹ strictement parallèle ; « 0 = 0 » ⟹ incluse | classification complète, pas de 4ᵉ cas | ✅ |
| `05` | P' = 2P sur les coefficients ⟹ parallèles | (2;2;2) = 2×(1;1;1) | ✅ |
| `05` | P' ⟺ x + y + z + 2,5 = 0, donc pas confondus | 5/2 = 2,5 ≠ −1 | ✅ |
| `06` | directeurs colinéaires ⟹ parallèles ou confondues | classification des droites | ✅ |
| `07` | pas de point commun + directeurs non colinéaires ⟹ non coplanaires | les 4 cas : confondues, parallèles, sécantes, non coplanaires | ✅ |

⛔ **Exclusion deux à deux des propositions ?**
`04` : parallèle sans point commun / contenue / sécante — trois positions exclusives ✅.
`07` : non coplanaires / parallèles / impossible — s'excluent, et « parallèles » est exclu par l'énoncé lui-même ✅.

### Short — « une solution, aucune, ou toutes »

**Une seule idée**, celle de l'épisode : droite et plan : on remplace, et c'est l'équation en t qui donne la position.
⛔ Un short ne RÉSUME pas son épisode — il en prend une idée et la rend en une minute.
**Bonne réponse : A** (tirage des shorts, table en tête de fichier).

- **00-accroche** : Une droite et un plan dans l'espace : trois positions, et une seule ligne de calcul.
- **01-idee** : Le geste est le même : on remplace x, y et z de la droite dans l'équation du plan, et on lit ce qu'il reste. Une solution, comme 2 t égale zéro : la droite coupe le plan. Aucune, comme 3 égale zéro : strictement parallèle. Toutes, zéro égale zéro : contenue dans le plan.
- **02-question** : Question ! Après substitution, il reste zéro égale zéro. La droite est : A : contenue dans le plan. B : sécante au plan. C : strictement parallèle. Mets pause, et choisis !
- **02b-reponse** : Réponse A. Zéro égale zéro est vrai pour tout t : tous les points de la droite sont dans le plan. Avec 3 égale zéro, c'était faux, donc strictement parallèle.
- **03-commentaire** : À toi ! La droite d : x égale 1 plus t, y égale t, z égale 2 t. Le plan P : x plus y moins z moins 1 égale zéro. Position relative ? Réponds en commentaire !
- **04-abonne** : Entraîne-toi sur éleveai point f r. Et abonne-toi !

#### ✅ Passe MATHS du short de E5 — recalculée, pas relue

| Clip | Ce que la voix affirme | Recalcul |
|---|---|---|
| `01` | « 2t = 0 ⟹ la droite coupe le plan » | une seule racine t = 0 ⟹ un seul point commun |
| `01` | « 3 = 0 ⟹ strictement parallèle » | aucune racine ⟹ aucun point commun, et la direction reste celle du plan |
| `01` | « 0 = 0 ⟹ contenue » | vrai pour tout t ⟹ tout point de d est dans P |
| `02` | bonne réponse : contenue dans le plan | 0 = 0 est vrai pour tout t |
| `02b` | leurres « sécante » / « strictement parallèle » | ⛔ ils correspondent à UNE racine et à ZÉRO racine : exclusifs |
| `03` | défi d : x = t + 1, y = t, z = 2t ; P : x + y − z − 1 = 0 | (1+t) + t − 2t − 1 = 0 pour tout t ⟹ d est CONTENUE dans P — ⛔ non dit, non affiché |

⛔ **Exclusion deux à deux des trois propositions ?** « contenue » / « sécante » / « strictement parallèle » : une racine, zéro racine, toutes — trois cas exclusifs, et « strictement » exclut bien « contenue » ✅.

---

# E6 · `terminale-espace-defi`

**Micro** : `espace_defi` — Résoudre un exercice type bac de géométrie dans l'espace (notion `geometrie_espace`).
**Métier / contexte** : l'exercice du bac lui-même — le cube, le repère, et quatre questions qui montent.
**Code couleur** : ambre = ce qu'on regarde, bleu = le cube, vert = juste, rouge = le piège.

- **00-garde** : Exercice type bac, géométrie dans l'espace. Un cube, un repère et quatre questions qui s'enchaînent : c'est l'exercice que tu auras.
- **01-situation** : Au bac, l'exercice de géométrie dans l'espace a presque toujours la même forme. Un solide, souvent un cube ou un pavé. Un repère donné par l'énoncé. Puis une suite de questions qui montent : des coordonnées, puis une droite, puis un plan, puis une intersection. Chaque question prépare la suivante. Celui qui connaît le fil ne se perd pas.
- **02-idee** : La première chose à faire, avant tout calcul : se placer dans le repère de l'énoncé et écrire les coordonnées de tous les points utiles. Le dessin sert à comprendre la situation, les coordonnées servent à démontrer. Dans le cube A B C D E F G H avec le repère A, A B, A D, A E, les huit sommets ne contiennent que des zéros et des uns.
- **03-theoreme** : Ta boîte à outils compte quatre objets, et ils suffisent. Un : coordonnées et milieux. Deux : la colinéarité, pour l'alignement et le parallélisme. Trois : la représentation paramétrique, pour une droite. Quatre : l'équation cartésienne, pour un plan. Et le geste qui relie tout : on remplace la droite dans l'équation du plan pour trouver une intersection.
- **04-question** : Question ! Dans le cube A B C D E F G H muni du repère A, A B, A D, A E, quelles sont les coordonnées du centre du cube ? A : 0,5 ; 0,5 ; 0,5. B : 1, 1, 1. C : 0,5 ; 0,5 ; 1. Mets pause, et choisis !
- **04b-reponse** : Réponse A. Le centre du cube est le milieu de la grande diagonale A G : on fait la moyenne de 0, 0, 0 et de 1, 1, 1. Le triplet 1, 1, 1, c'est le sommet G lui-même. Et 0,5 ; 0,5 ; 1, c'est le centre de la face du haut, E F G H : la hauteur 1 aurait dû te mettre en alerte.
- **05-appliquer** : Appliquons. Montrons que A, le centre du cube et G sont alignés. Appelons oméga ce centre. Le vecteur A oméga a pour coordonnées 0,5 ; 0,5 ; 0,5. Le vecteur A G a pour coordonnées 1, 1, 1. Et 1, 1, 1, c'est deux fois 0,5 ; 0,5 ; 0,5. Le vecteur A G est donc égal à deux fois le vecteur A oméga : les deux vecteurs sont colinéaires, et les trois points sont alignés. Deux lignes, et c'est démontré.
- **06-piege** : Voilà le piège, et il coûte des points chaque année. Ne conclus jamais sur le dessin. Sur une figure en perspective, deux droites peuvent sembler se croiser alors qu'elles ne sont pas coplanaires, et un point peut sembler posé sur un plan sans y être. La figure sert à choisir la méthode, la preuve est dans les coordonnées. Deuxième piège, plus discret : le repère. Quand l'énoncé dit le repère A, A B, A D, A E, l'arête du cube vaut 1, même si le cube mesure 6 centimètres sur ton brouillon. Tes coordonnées sont des zéros et des uns, pas des centimètres.
- **07-question** : Question ! Pour démontrer que trois points A, B et C de l'espace sont alignés, que fait-on ? A : on montre que A B et A C ont la même norme. B : on montre que les vecteurs A B et A C sont colinéaires. C : on montre qu'ils sont dans un même plan. Mets pause, et choisis !
- **07b-reponse** : Réponse B : on cherche un nombre k tel que le vecteur A C soit égal à k fois le vecteur A B. La même norme, cela dit seulement que B et C sont à la même distance de A, ce qui n'a rien à voir avec l'alignement. Et la réponse C est un piège magnifique : trois points de l'espace sont toujours dans un même plan. Cette phrase est vraie, et elle ne démontre jamais rien.
- **08-rediger** : Le squelette d'une copie qui prend tous les points. Un : dans le repère A, A B, A D, A E, on a les coordonnées suivantes, et on les écrit toutes. Deux : on annonce ce qu'on va faire avant de le faire. Trois : on vérifie son résultat sur un point de l'énoncé. Quatre : on écrit la conclusion en français, pas seulement en calculs.
- **09-defi** : À toi de jouer ! Dans le cube, le plan P a pour équation x plus z moins 1 égale zéro. Première question : vérifie que B et E sont dans P. Deuxième : donne une représentation paramétrique de la droite A G. Troisième : trouve le point d'intersection de la droite A G et du plan P. Mets pause, et cherche !
- **09b-correction** : Correction. Premier point : B a pour coordonnées 1, 0, 0, donc 1 plus 0 moins 1 fait zéro, B est dans P. E a pour coordonnées 0, 0, 1, donc 0 plus 1 moins 1 fait zéro, E aussi. Deuxième point : le vecteur A G a pour coordonnées 1, 1, 1, et la droite passe par A, qui est l'origine. Sa représentation paramétrique est donc x égale t, y égale t, z égale t. Troisième point : on remplace dans l'équation du plan, t plus t moins 1 égale zéro, donc 2 t égale 1, donc t vaut 0,5. Les trois coordonnées valent 0,5 : le point d'intersection est le centre du cube. Et ce n'est pas un hasard : le plan P contient B, C, H et E, c'est une grande section rectangulaire du cube, et la grande diagonale la traverse en son centre.
- **10-finale** : Ce que tu as appris. Dans l'espace, on remplace la géométrie par du calcul : la figure guide, les coordonnées prouvent. Pour un alignement ou un parallélisme, on cherche la colinéarité. Pour une intersection, on remplace la droite dans l'équation du plan. Et on commence toujours par écrire les coordonnées.
- **11-abonne** : Entraîne-toi sur éleveai point f r. Et abonne-toi !

## ✅ Passe MATHS de E6 — faite le 22/11/2026, avant tout rendu

| Clip | Ce que la voix affirme | Recalcul | Verdict |
|---|---|---|---|
| `09b` | B(1;0;0) est dans P : x + z − 1 = 0 | 1 + 0 − 1 = 0 | ✅ |
| `09b` | E(0;0;1) est dans P | 0 + 1 − 1 = 0 | ✅ |
| `09b` | (AG) : x = t, y = t, z = t | A = origine, AG = (1;1;1) | ✅ |
| `09b` | substitution ⟹ 2t = 1, t = 0,5 | t + t − 1 = 0 | ✅ |
| `09b` | le point d'intersection est le centre du cube | (0,5 ; 0,5 ; 0,5) = milieu de [AG] | ✅ |
| `09b` | « P contient B, C, H et E » | C(1;1;0) : 1+0−1 = 0 ✅ · H(0;1;1) : 0+1−1 = 0 ✅ | ✅ |
| `09b` | « la diagonale traverse cette section en son centre » | centre de BCHE = moyenne des 4 = (0,5 ; 0,5 ; 0,5) | ✅ |
| `10` | la colinéarité prouve l'alignement | définition | ✅ |
| `04` | centre du cube = (0,5 ; 0,5 ; 0,5) | milieu de [AG] | ✅ |
| `04` | leurre B (1;1;1) est G | sommet | ✅ |
| `04` | leurre C (0,5 ; 0,5 ; 1) est le centre de EFGH | moyenne de E, F, G, H | ✅ |
| `05` | AG = 2 × AΩ | (1;1;1) = 2×(0,5;0,5;0,5) | ✅ |
| `06` | « l'arête vaut 1 dans ce repère » | la base est (AB, AD, AE) : AB a pour norme 1 par construction | ✅ |
| `07` | alignement ⟺ AB et AC colinéaires | définition | ✅ |
| `07` | leurre B : même norme | AB = AC n'implique rien sur l'alignement (B et C sur une même sphère) | ✅ |
| `07` | leurre C : « dans un même plan » | ⭐ TOUJOURS vrai pour 3 points : ne démontre jamais rien | ✅ **le meilleur leurre de la série** |

⛔ **Exclusion deux à deux des propositions ?**
`04` : trois triplets distincts, un seul est le centre ✅.
`07` : colinéarité / même norme / coplanarité — trois critères différents, un seul caractérise l'alignement ✅.

### Short — « ne conclus jamais sur le dessin »

**Une seule idée**, celle de l'épisode : deux droites peuvent se couper sur la figure et ne jamais se rencontrer dans l'espace.
⛔ Un short ne RÉSUME pas son épisode — il en prend une idée et la rend en une minute.
**Bonne réponse : B** (tirage des shorts, table en tête de fichier).

- **00-accroche** : Deux droites qui se croisent sur le dessin, et qui ne se rencontrent jamais. Ne conclus jamais sur une figure.
- **01-idee** : Dans le cube A B C D E F G H, trace la droite A C, puis la droite E B. Sur la figure, les deux traits se coupent. Pourtant A C reste au sol et E B descend du haut du cube au sol : aucun point commun, et aucun plan ne les contient toutes les deux.
- **02-question** : Question ! Deux droites semblent se croiser en perspective. Que conclure ? A : sécantes. B : rien du tout. C : parallèles. Mets pause, et choisis !
- **02b-reponse** : Réponse B : rien du tout. Une perspective écrase une direction : deux droites qui ne se rencontrent pas peuvent se superposer à l'écran. On écrit les coordonnées, et c'est le calcul qui conclut.
- **03-commentaire** : À toi ! Dans le même cube, les droites A G et B H ont-elles un point commun ? Réponds en commentaire !
- **04-abonne** : Entraîne-toi sur éleveai point f r. Et abonne-toi !

#### ✅ Passe MATHS du short de E6 — recalculée, pas relue

| Clip | Ce que la voix affirme | Recalcul |
|---|---|---|
| `01` | (A C) et (E B) se COUPENT à l'écran | cavalière : t = 0,589 sur (A C) et s = 0,831 sur (E B), tous deux dans ]0;1[ |
| `01` | « aucun point commun » | (t;t;0) = (s;0;1−s) ⟹ t = 0 ET s = 1 : impossible |
| `01` | « aucun plan ne les contient » | det[(1;1;0),(1;0;−1),(0;0;1)] = −1 ≠ 0 ⟹ non coplanaires |
| `01` | « A C reste au sol » | A et C ont z = 0 ; E B va de z = 1 à z = 0 |
| `02` | bonne réponse : rien du tout | la projection cavalière a un NOYAU : elle écrase une direction |
| `03` | défi (A G) et (B H) | (t;t;t) = (1−s;s;s) ⟹ t = s = 0,5 : elles se coupent au CENTRE du cube — ⛔ non dit |

⛔ **Exclusion deux à deux des trois propositions ?** « sécantes » / « rien du tout » / « parallèles » — « rien » exclut les deux affirmations, et sécantes exclut parallèles ✅.

⚠️ **Les trois choix de ce short sont écrits en UN mot, et c'est une cote, pas un style.**
Mesuré hors rendu : avec « qu'elles sont sécantes » sur deux lignes, le bloc des trois
cartes descend à −2,28 et « Mets pause, et choisis ! » tombe à **−3,20**, c'est-à-dire
DANS la boîte de Ti-Margo (qui monte à −2,92 en 9:16). En un mot, les trois cartes
tiennent sur une ligne à 26 px et la pause s'arrête à −2,85. ⛔ C'est le piège de
l'épisode 6 (« ajouter une ligne à un choix rapetisse les trois cartes ») dans un cadre
deux fois plus étroit : en 9:16, il ne rapetisse pas les cartes, il les fait **sortir par
le bas**.

---

# E7 · `terminale-ps-espace-calculer`

**Micro** : `ps_espace_calculer` — Calculer un produit scalaire dans l'espace (notion `produit_scalaire_espace`).
**Métier / contexte** : Kelly, kitesurf à l'Hermitage — seule la part du vent qui pousse dans le bon sens compte.
**Code couleur** : ambre = ce qu'on regarde, bleu = le vecteur u, rose = le vecteur v, vert = juste, rouge = le piège.

- **00-garde** : Produit scalaire dans l'espace. Deux vecteurs, trois multiplications, une addition — et le résultat est un nombre, pas un vecteur.
- **01-situation** : Voici Kelly. Elle fait du kitesurf à l'Hermitage. Le vent pousse son aile, mais seule la partie du vent qui va dans le bon sens la fait avancer : un vent de côté ne sert à rien. Ce combien ça pousse dans le bon sens, c'est exactement ce que mesure un produit scalaire. En physique, c'est le travail d'une force. En maths, c'est un seul nombre qui résume l'accord entre deux directions.
- **02-idee** : Dans un repère orthonormé — et cette condition est obligatoire — le produit scalaire se calcule en coordonnées. On multiplie les x entre eux, les y entre eux, les z entre eux. Puis on additionne les trois résultats. Prenons u de coordonnées 1, 2, 3 et v de coordonnées 4, moins 1, 2. On obtient 1 fois 4, c'est 4 ; 2 fois moins 1, c'est moins 2 ; 3 fois 2, c'est 6. Total : 4 moins 2 plus 6, donc 8.
- **03-theoreme** : Trois choses à retenir. Le résultat est un nombre réel, jamais un vecteur. Il existe une seconde formule : le produit scalaire de u et v est le produit des deux normes par le cosinus de l'angle entre eux. Et le cas particulier le plus utile de tous : le produit scalaire d'un vecteur par lui-même est le carré de sa norme.
- **04-question** : Question ! u a pour coordonnées 2, 0, moins 1, et v a pour coordonnées 1, 5, 2. Que vaut le produit scalaire de u et v ? A : 4. B : zéro. C : le vecteur de coordonnées 2, 0, moins 2. Mets pause, et choisis !
- **04b-reponse** : Réponse B, zéro. 2 fois 1 fait 2. Zéro fois 5 fait zéro. Et moins 1 fois 2 fait moins 2. Deux, plus zéro, moins deux : zéro. La réponse A, 4, c'est ce qu'on trouve en oubliant le signe moins. Et la réponse C n'est même pas du bon type : un produit scalaire est un nombre, pas un vecteur. Enfin, retiens ceci : ce zéro n'est pas rien. Il dit que les deux vecteurs sont orthogonaux, et c'est tout le sujet de l'épisode suivant.
- **05-appliquer** : Appliquons le cas particulier. Soit u de coordonnées 1, 2, 3. Le produit scalaire de u par lui-même vaut 1 fois 1, plus 2 fois 2, plus 3 fois 3, c'est-à-dire 1 plus 4 plus 9, donc 14. Et comme ce produit est le carré de la norme, la norme de u vaut racine de 14. Deux lignes, et on a une longueur.
- **06-piege** : Voilà le piège ! Le produit scalaire ressemble à une multiplication, mais on ne peut pas simplifier comme avec des nombres. Il est bien symétrique : u scalaire v égale v scalaire u. Il est bien distributif : u scalaire la somme de v et w égale u scalaire v, plus u scalaire w. Mais si le produit scalaire de u et v est égal à celui de u et w, on ne peut pas conclure que v égale w. Exemple : u de coordonnées 1, 0, 0 ; v de coordonnées 0, 1, 0 ; w de coordonnées 0, 0, 1. Les deux produits scalaires valent zéro, et pourtant v et w sont deux vecteurs complètement différents.
- **07-question** : Question ! Le produit scalaire de u et v est nul, et ni u ni v n'est le vecteur nul. Que peut-on dire ? A : ils sont orthogonaux. B : ils sont colinéaires. C : l'un des deux est le vecteur nul. Mets pause, et choisis !
- **07b-reponse** : Réponse A. Un produit scalaire nul entre deux vecteurs non nuls, c'est la définition même de l'orthogonalité. Colinéaires, c'est au contraire le cas extrême opposé : le produit scalaire y est le plus grand possible en valeur absolue, il vaut le produit des normes. Et la réponse C se contredit elle-même, puisque l'énoncé dit justement qu'aucun des deux vecteurs n'est nul. Lis toujours l'énoncé jusqu'au bout.
- **08-rediger** : Au bac, deux lignes suffisent, mais elles doivent être écrites. Un : dans le repère orthonormé, u a pour coordonnées tant, et v a pour coordonnées tant. Deux : on écrit la somme des trois produits, avec les signes visibles, avant de donner le résultat. Le correcteur cherche la ligne de calcul, pas seulement le nombre.
- **09-defi** : À toi de jouer ! Dans le cube A B C D E F G H d'arête 1, avec le repère A, A B, A D, A E : calcule le produit scalaire de A G et A B, puis celui de A G et A C. Mets pause, et cherche !
- **09b-correction** : Correction. Le vecteur A G a pour coordonnées 1, 1, 1. Le vecteur A B a pour coordonnées 1, 0, 0 : leur produit scalaire vaut 1 fois 1, plus 1 fois 0, plus 1 fois 0, donc 1. Le vecteur A C a pour coordonnées 1, 1, 0 : son produit scalaire avec A G vaut 1 plus 1 plus 0, donc 2. Les deux résultats sont positifs : la grande diagonale part dans le même sens général que l'arête et que la diagonale de la face. Attention tout de même : on ne peut pas comparer directement ces deux nombres pour comparer deux angles, parce que les vecteurs n'ont pas la même norme. Pour les angles, il faudra diviser par les normes.
- **10-finale** : Ce que tu as appris. Dans un repère orthonormé, le produit scalaire est la somme des trois produits de coordonnées. Le résultat est un nombre. Le produit scalaire d'un vecteur par lui-même est le carré de sa norme. Et un produit scalaire nul signifie orthogonal.
- **11-abonne** : Entraîne-toi sur éleveai point f r. Et abonne-toi !

## ✅ Passe MATHS de E7 — faite le 22/11/2026, avant tout rendu

| Clip | Ce que la voix affirme | Recalcul | Verdict |
|---|---|---|---|
| `09b` | AG · AB = 1 | (1;1;1)·(1;0;0) = 1 + 0 + 0 | ✅ |
| `09b` | AG · AC = 2 | (1;1;1)·(1;1;0) = 1 + 1 + 0 | ✅ |
| `09b` | « on ne compare pas ces deux nombres pour comparer deux angles » | cos = 1/√3 ≈ 0,577 et 2/√6 ≈ 0,816 : les normes diffèrent | ✅ **la phrase prudente est la phrase juste** |
| `10` | u · u = norme au carré | u·u = x² + y² + z² | ✅ |
| `02` | u(1;2;3) · v(4;−1;2) = 8 | 4 − 2 + 6 | ✅ |
| `02` | « repère orthonormé obligatoire » | la formule en coordonnées suppose la base orthonormée | ✅ |
| `04` | u(2;0;−1) · v(1;5;2) = 0 | 2 + 0 − 2 | ✅ |
| `04` | leurre B = 4 | 2 + 0 + 2 : signe oublié | ✅ |
| `04` | leurre C = un vecteur | erreur de TYPE, nommée en `04b` | ✅ |
| `05` | u(1;2;3) · u = 14 | 1 + 4 + 9 | ✅ |
| `05` | norme de u = racine de 14 | √(u·u) | ✅ |
| `06` | u·v = u·w n'implique pas v = w | u(1;0;0), v(0;1;0), w(0;0;1) : 0 = 0 et v ≠ w | ✅ |
| `07b` | « colinéaires : le produit vaut le produit des normes en valeur absolue » | cas d'égalité de Cauchy-Schwarz | ✅ |

⛔ **Exclusion deux à deux des propositions ?**
`04` : 0, 4 et un vecteur — exclusives, et la troisième n'est même pas du bon type ✅.
`07` : orthogonaux / colinéaires / l'un est nul — exclusives, et la troisième est niée par l'énoncé ✅.

### Short — « trois multiplications, une addition, et un NOMBRE »

**Une seule idée**, celle de l'épisode : le produit scalaire se calcule en coordonnées, et ce qui en sort est un nombre, jamais un vecteur.
⛔ Un short ne RÉSUME pas son épisode — il en prend une idée et la rend en une minute.
**Bonne réponse : A** (tirage des shorts, table en tête de fichier).

- **00-accroche** : Deux vecteurs, trois multiplications, une addition. Et ce qui sort n'est pas un vecteur : c'est un nombre.
- **01-idee** : Dans un repère orthonormé, on multiplie les x entre eux, les y entre eux, les z entre eux, puis on additionne les trois résultats. Prenons u de coordonnées 1, 2, 3 et v de coordonnées 4, moins 1, 2. Cela fait 4, puis moins 2, puis 6. Total : 8.
- **02-question** : Question ! u a pour coordonnées 3, zéro, 1, et v a pour coordonnées 2, 1, moins 1. Que vaut le produit scalaire de u et v ? A : 5. B : 7. C : le vecteur de coordonnées 6, zéro, moins 1. Mets pause, et choisis !
- **02b-reponse** : Réponse A, 5. 3 fois 2 fait 6. Zéro fois 1 fait zéro. Et 1 fois moins 1 fait moins 1. Six, plus zéro, moins un : 5. La réponse B oublie le signe moins. Et la réponse C n'est même pas du bon type : un produit scalaire est un nombre, pas un vecteur.
- **03-commentaire** : À toi ! u a pour coordonnées 2, moins 1, 1 et v a pour coordonnées 3, 1, 5. Que vaut leur produit scalaire ? Réponds en commentaire !
- **04-abonne** : Entraîne-toi sur éleveai point f r. Et abonne-toi !

#### ✅ Passe MATHS du short de E7 — recalculée, pas relue

| Clip | Ce que la voix affirme | Recalcul |
|---|---|---|
| `01` | u(1;2;3) · v(4;−1;2) = 8 | 4 − 2 + 6 |
| `02` | bonne réponse 5 | 3×2 + 0×1 + 1×(−1) = 6 + 0 − 1 |
| `02b` | leurre B = 7 | 6 + 0 + 1 : le signe moins oublié |
| `02b` | leurre C = un vecteur | erreur de TYPE, nommée dans la réponse |
| `03` | défi u(2;−1;1) · v(3;1;5) | 6 − 1 + 5 = 10 — ⛔ non dit, non affiché |

⛔ **Exclusion deux à deux des trois propositions ?** 5, 7 et un vecteur — deux nombres distincts et un objet qui n'est même pas du bon type ✅.

---

# E8 · `terminale-ps-espace-orthogonalite`

**Micro** : `ps_espace_orthogonalite` — Démontrer une orthogonalité (notion `produit_scalaire_espace`).
**Métier / contexte** : Marc, maçon — un poteau vérifié dans un seul sens n'est pas droit.
**Code couleur** : ambre = ce qu'on regarde, bleu et rose = les deux directions du plan, vert = juste, rouge = le piège.

- **00-garde** : Démontrer une orthogonalité. Un produit scalaire nul, et c'est prouvé — mais pour un plan, il en faut deux, pas un.
- **01-situation** : Voici Marc, maçon. Il plante un poteau et veut qu'il soit bien perpendiculaire à la dalle. Il vérifie au niveau dans un sens : c'est droit. Est-ce que cela suffit ? Non. Un poteau peut être droit vu de face et penché vu de côté. Il faut vérifier dans deux directions. Ce geste de chantier, c'est exactement le théorème de ce chapitre.
- **02-idee** : Deux vecteurs non nuls sont orthogonaux si et seulement si leur produit scalaire est nul. En coordonnées, c'est un calcul de trois secondes. Prenons u de coordonnées 2, 1, moins 1 et v de coordonnées 1, moins 1, 1. Le produit : 2 fois 1 fait 2 ; 1 fois moins 1 fait moins 1 ; moins 1 fois 1 fait moins 1. Deux moins un moins un : zéro. Ils sont orthogonaux.
- **03-theoreme** : Et voici le théorème qui porte tout le chapitre. Une droite est orthogonale à un plan si et seulement si son vecteur directeur est orthogonal à deux vecteurs non colinéaires de ce plan. Deux vecteurs, pas un. Et non colinéaires, sinon ils donnent deux fois la même direction. Quand c'est le cas, on dit que ce vecteur est normal au plan.
- **04-question** : Question ! u a pour coordonnées 1, 2, moins 2, et v a pour coordonnées 2, moins 3, moins 2. Sont-ils orthogonaux ? A : oui, le produit scalaire vaut zéro. B : non, il vaut moins 8. C : non, car leurs coordonnées ne sont pas proportionnelles. Mets pause, et choisis !
- **04b-reponse** : Réponse A. 1 fois 2 fait 2. 2 fois moins 3 fait moins 6. Et moins 2 fois moins 2 fait plus 4 : moins par moins fait plus. Deux, moins six, plus quatre : zéro. Ils sont orthogonaux. Si tu as trouvé moins 8, c'est que ce dernier signe t'a échappé. Et la réponse C confond deux notions : des coordonnées non proportionnelles disent seulement que les vecteurs ne sont pas colinéaires, ce qui ne dit rien du tout sur l'orthogonalité.
- **05-appliquer** : Appliquons le théorème du poteau. Le vecteur n a pour coordonnées 1, 1, 1. Le plan P contient les vecteurs u de coordonnées 1, moins 1, 0 et v de coordonnées 0, 1, moins 1. Premier produit scalaire : 1 moins 1 plus 0, égale zéro. Deuxième : zéro plus 1 moins 1, égale zéro. Et u et v ne sont pas colinéaires, puisque la première coordonnée de v est nulle et celle de u ne l'est pas : aucun nombre ne permet d'obtenir v à partir de u. Donc n est orthogonal au plan P : c'est un vecteur normal à P.
- **06-piege** : Voilà le piège, et c'est le plus coûteux du chapitre ! Un seul produit scalaire nul ne suffit pas. Un vecteur orthogonal à une seule direction du plan peut même être dans le plan. Regarde : au sol, la direction du nord est orthogonale à la direction de l'est. Et pourtant le nord est au sol, il n'est pas vertical. Deuxième piège, plus subtil : dans l'espace, deux droites peuvent être orthogonales sans se couper. Dans le cube, l'arête A B et l'arête C G sont orthogonales, et elles ne se rencontrent jamais. On réserve le mot perpendiculaire aux droites qui sont à la fois orthogonales et sécantes.
- **07-question** : Question ! Le vecteur n est orthogonal à un vecteur u du plan P. Peut-on en conclure que n est orthogonal au plan P ? A : oui, un vecteur suffit. B : oui, à condition que u ne soit pas le vecteur nul. C : non, il faut deux vecteurs non colinéaires du plan. Mets pause, et choisis !
- **07b-reponse** : Réponse C. Une seule direction ne suffit jamais, même bien choisie, même si u n'est pas nul. La preuve : le vecteur n pourrait être lui-même dans le plan P, comme le nord est au sol. Il faut deux vecteurs du plan, non colinéaires, et il faut écrire les deux produits scalaires.
- **08-rediger** : Le modèle de rédaction, à recopier tel quel au bac. Un : le vecteur n a pour coordonnées tant, et u et v sont deux vecteurs du plan P. Deux : le produit scalaire de n et u vaut, calcul, zéro. Trois : le produit scalaire de n et v vaut, calcul, zéro. Quatre : u et v ne sont pas colinéaires car, et on donne la raison. Cinq : donc n est un vecteur normal au plan P. La quatrième ligne est celle qu'on oublie, et c'est un point perdu à chaque fois.
- **09-defi** : À toi de jouer ! Dans le cube A B C D E F G H avec le repère A, A B, A D, A E : démontre que la droite A G est orthogonale au plan B D E. Mets pause, et cherche !
- **09b-correction** : Correction. D'abord les coordonnées : A est l'origine, B vaut 1, 0, 0 ; D vaut 0, 1, 0 ; E vaut 0, 0, 1 ; et G vaut 1, 1, 1. Le vecteur A G a donc pour coordonnées 1, 1, 1. Prenons deux vecteurs du plan B D E. Le vecteur B D, c'est D moins B : moins 1, 1, 0. Le vecteur B E, c'est E moins B : moins 1, 0, 1. Premier produit scalaire, A G avec B D : moins 1, plus 1, plus zéro, égale zéro. Deuxième, A G avec B E : moins 1, plus zéro, plus 1, égale zéro. Enfin, B D et B E ne sont pas colinéaires : leurs deux dernières coordonnées sont 1 et zéro pour le premier, zéro et 1 pour le second, et aucun nombre ne passe de l'une à l'autre. Le vecteur A G est donc orthogonal à deux vecteurs non colinéaires du plan : la droite A G est orthogonale au plan B D E. Retiens cette figure, elle revient tous les ans.
- **10-finale** : Ce que tu as appris. Produit scalaire nul, vecteurs orthogonaux. Pour une droite et un plan, il faut deux vecteurs non colinéaires du plan, et il faut justifier qu'ils ne le sont pas. Un vecteur orthogonal à un plan s'appelle un vecteur normal. Et dans l'espace, orthogonales ne veut pas dire sécantes.
- **11-abonne** : Entraîne-toi sur éleveai point f r. Et abonne-toi !

## ✅ Passe MATHS de E8 — faite le 22/11/2026, avant tout rendu

| Clip | Ce que la voix affirme | Recalcul | Verdict |
|---|---|---|---|
| `09b` | BD = (−1 ; 1 ; 0) | D(0;1;0) − B(1;0;0) | ✅ |
| `09b` | BE = (−1 ; 0 ; 1) | E(0;0;1) − B(1;0;0) | ✅ |
| `09b` | AG · BD = 0 | (1;1;1)·(−1;1;0) = −1 + 1 + 0 | ✅ |
| `09b` | AG · BE = 0 | (1;1;1)·(−1;0;1) = −1 + 0 + 1 | ✅ |
| `09b` | BD et BE non colinéaires | k·(−1;1;0) = (−1;0;1) ⟹ k = 1 puis 1 ≠ 0 | ✅ **la ligne qu'on oublie** |
| `09b` | conclusion : (AG) ⊥ plan (BDE) | théorème du `03` appliqué complètement | ✅ |
| `10` | il faut DEUX vecteurs non colinéaires | théorème | ✅ |
| `02` | u(2;1;−1) · v(1;−1;1) = 0 | 2 − 1 − 1 | ✅ |
| `04` | u(1;2;−2) · v(2;−3;−2) = 0 | 2 − 6 + 4 | ✅ |
| `04` | leurre B = −8 | 2 − 6 − 4 : (−2)×(−2) pris pour −4 | ✅ |
| `04` | leurre C : « coordonnées non proportionnelles » | c'est la non-colinéarité, sans rapport | ✅ |
| `05` | n(1;1;1) ⊥ u(1;−1;0) et ⊥ v(0;1;−1) | 1−1+0 = 0 et 0+1−1 = 0 | ✅ |
| `05` | u et v non colinéaires | v₁ = 0 et u₁ = 1 ⟹ k = 0 ⟹ v = 0, faux | ✅ |
| `06` | au sol, le nord est orthogonal à l'est et pourtant dans le plan | (0;1;0)·(1;0;0) = 0, les deux dans z = 0 | ✅ **le contre-exemple vaut la règle** |
| `06` | AB et CG orthogonales et non sécantes | AB = (1;0;0), CG = (0;0;1) ⟹ produit 0 ; (AB) : y = z = 0 ; (CG) : x = y = 1 : aucun point commun | ✅ |

⛔ **Exclusion deux à deux des propositions ?**
`04` : « oui, 0 » / « non, −8 » / « non, pas proportionnelles » — une seule valeur juste, et le troisième motif est d'une autre nature ✅.
`07` : « non » / « oui » / « oui si u non nul » — les deux dernières diffèrent par leur condition, aucune ne peut être vraie avec la première ✅.

### Short — « orthogonal à une direction, et pourtant dedans »

**Une seule idée**, celle de l'épisode : un seul produit scalaire nul ne prouve rien sur un PLAN.
⛔ Un short ne RÉSUME pas son épisode — il en prend une idée et la rend en une minute.
**Bonne réponse : C** (tirage des shorts, table en tête de fichier).

- **00-accroche** : Un produit scalaire nul prouve que deux vecteurs sont orthogonaux. Mais face à un plan, un seul ne suffit pas.
- **01-idee** : Marc plante un poteau et le vérifie au niveau dans un seul sens : c'est droit. Cela ne suffit pas, car un poteau peut être droit vu de face et penché vu de côté. Pour une droite et un plan, il faut deux directions, et deux vecteurs non colinéaires.
- **02-question** : Question ! Au sol, la direction du nord est orthogonale à la direction de l'est. Le nord est-il pour autant orthogonal au sol ? A : oui, il est orthogonal à une direction du sol. B : on ne peut pas le savoir sans calcul. C : non, le nord est dans le sol. Mets pause, et choisis !
- **02b-reponse** : Réponse C. Le nord est au sol, il n'est pas vertical, et il est pourtant orthogonal à l'est. Une seule direction ne suffit donc jamais, même bien choisie. Il faut deux vecteurs du plan, non colinéaires, et il faut écrire les deux produits scalaires.
- **03-commentaire** : À toi ! Dans le cube A B C D E F G H, l'arête A B et l'arête C G sont orthogonales. Se coupent-elles ? Réponds en commentaire !
- **04-abonne** : Entraîne-toi sur éleveai point f r. Et abonne-toi !

#### ✅ Passe MATHS du short de E8 — recalculée, pas relue

| Clip | Ce que la voix affirme | Recalcul |
|---|---|---|
| `01` | il faut DEUX vecteurs non colinéaires du plan | le théorème du chapitre, clip `03` du paysage |
| `02` | nord ⊥ est | (0;1;0)·(1;0;0) = 0 + 0 + 0 = 0 |
| `02b` | et pourtant le nord est DANS le sol | les deux vecteurs ont leur troisième coordonnée nulle : tous deux dans le plan z = 0 |
| `03` | défi : (AB) et (CG) orthogonales et non sécantes | AB = (1;0;0), CG = (0;0;1) ⟹ produit 0 ; (AB) : y = z = 0 et (CG) : x = y = 1 n'ont aucun point commun — ⛔ réponse non dite |

⛔ **Exclusion deux à deux des trois propositions ?** « oui » / « on ne peut pas savoir » / « non » — trois positions exclusives, et le contre-exemple du clip tranche ✅.

---

# E9 · `terminale-ps-espace-norme-distance`

**Micro** : `ps_espace_norme_distance` — Calculer une norme ou une distance (notion `produit_scalaire_espace`).
**Métier / contexte** : la Diagonale des Fous — dix kilomètres à plat et un de dénivelé ne font pas onze.
**Code couleur** : ambre = ce qu'on regarde, bleu = le vecteur mesuré, vert = juste, rouge = le piège.

- **00-garde** : Normes et distances dans l'espace. Trois carrés, une racine — et une règle qu'on viole tout le temps : la racine ne se distribue pas.
- **01-situation** : Pense à la Diagonale des Fous. Un coureur enchaîne dix kilomètres à plat et un kilomètre de dénivelé. Quelle distance a-t-il parcourue, vraiment ? Pas onze kilomètres. On n'additionne pas une distance au sol et une hauteur : on passe par les carrés. Racine de cent plus un, c'est-à-dire racine de cent un, soit un peu plus de dix kilomètres. Le dénivelé change presque tout à l'effort, et presque rien à la distance. C'est le théorème de Pythagore, en trois dimensions.
- **02-idee** : Dans un repère orthonormé, la norme d'un vecteur u de coordonnées x, y, z vaut racine de x au carré plus y au carré plus z au carré. Un exemple qui tombe juste : u de coordonnées 2, 3, 6. Les carrés font 4, 9 et 36. Leur somme fait 49. Et racine de 49 fait 7. La norme de u vaut exactement 7.
- **03-theoreme** : La distance entre deux points A et B est la norme du vecteur A B. On fait donc d'abord arrivée moins départ, puis la racine de la somme des carrés. Et n'oublie pas le lien avec l'épisode précédent : le carré de la norme est le produit scalaire du vecteur par lui-même.
- **04-question** : Question ! u a pour coordonnées 1, moins 2, 2. Que vaut la norme de u ? A : 9. B : 3. C : 1. Mets pause, et choisis !
- **04b-reponse** : Réponse B, 3. On élève au carré d'abord : 1 au carré fait 1 ; moins 2 au carré fait plus 4 ; 2 au carré fait 4. La somme fait 9, et racine de 9 fait 3. La réponse A, 9, c'est le carré de la norme : on a oublié la racine. Et la réponse C, 1, c'est la somme des coordonnées, 1 moins 2 plus 2 : les carrés ont disparu, et avec eux le théorème de Pythagore.
- **05-appliquer** : Appliquons à une distance. A a pour coordonnées 1, 0, 2, et B a pour coordonnées 3, moins 1, 4. D'abord le vecteur A B, arrivée moins départ : 2, moins 1, 2. Ensuite les carrés : 4, 1 et 4, leur somme fait 9. Enfin la racine : la distance A B vaut 3.
- **06-piege** : Voilà le piège ! La racine ne se distribue pas. Racine de 3 au carré plus 4 au carré ne fait pas 3 plus 4, c'est-à-dire 7 : elle fait racine de 25, c'est-à-dire 5. Deuxième point, tout aussi important au bac : on garde la valeur exacte. Racine de 14 est une réponse ; 3 virgule 74 est un arrondi, et il ne vaut une réponse que si l'énoncé demande un arrondi. Enfin, une norme est toujours positive ou nulle : si tu trouves une distance négative, c'est un signe qui s'est perdu en route.
- **07-question** : Question ! A a pour coordonnées 2, 1, zéro, et B a pour coordonnées 2, 1, 5. Que vaut la distance A B ? A : racine de 5. B : zéro, puisque les deux premières coordonnées sont égales. C : 5. Mets pause, et choisis !
- **07b-reponse** : Réponse C, 5. Le vecteur A B a pour coordonnées zéro, zéro, 5. Sa norme : racine de zéro plus zéro plus 25, c'est-à-dire racine de 25, donc 5. A et B sont l'un au-dessus de l'autre, à cinq unités de distance. Attention à la réponse B : ce sont les deux premières coordonnées du vecteur qui sont nulles, pas la distance. Et racine de 5, c'est ce qu'on trouve en oubliant d'élever 5 au carré avant de prendre la racine.
- **08-rediger** : Au bac, trois lignes, toujours dans cet ordre. Un : les coordonnées du vecteur, arrivée moins départ. Deux : la somme des trois carrés, écrite. Trois : la racine, en valeur exacte, et l'arrondi seulement si on le demande. Et si l'énoncé parle de distance, finis par une phrase : la distance A B vaut tant.
- **09-defi** : À toi de jouer ! Dans le cube A B C D E F G H d'arête 1, avec le repère A, A B, A D, A E : calcule la longueur A C, puis la longueur A G. Mets pause, et cherche !
- **09b-correction** : Correction. Le point C a pour coordonnées 1, 1, zéro, donc le vecteur A C aussi. La somme des carrés fait 1 plus 1 plus zéro, c'est-à-dire 2 : la longueur A C vaut racine de 2, environ 1 virgule 41. Le point G a pour coordonnées 1, 1, 1 : la somme des carrés fait 3, et la longueur A G vaut racine de 3, environ 1 virgule 73. Retiens ces deux résultats par cœur : dans un cube d'arête 1, la diagonale d'une face vaut racine de 2, et la grande diagonale vaut racine de 3. Et si l'arête mesure a, il suffit de multiplier : a racine de 2, et a racine de 3.
- **10-finale** : Ce que tu as appris. La norme, c'est la racine de la somme des trois carrés. La distance A B, c'est la norme du vecteur A B. La racine ne se distribue jamais. Et dans le cube d'arête 1 : racine de 2 pour la diagonale d'une face, racine de 3 pour la grande diagonale.
- **11-abonne** : Entraîne-toi sur éleveai point f r. Et abonne-toi !

## ✅ Passe MATHS de E9 — faite le 22/11/2026, avant tout rendu

| Clip | Ce que la voix affirme | Recalcul | Verdict |
|---|---|---|---|
| `09b` | AC = racine de 2 ≈ 1,41 | AC = (1;1;0) ⟹ √2 = 1,41421… | ✅ |
| `09b` | AG = racine de 3 ≈ 1,73 | AG = (1;1;1) ⟹ √3 = 1,73205… | ✅ |
| `09b` | arête a : a√2 et a√3 | homogénéité de la norme : ‖a·u‖ = a‖u‖ pour a > 0 | ✅ |
| `10` | la norme est la racine de la somme des carrés | définition en base orthonormée | ✅ |
| `01` | 10 km à plat + 1 km de dénivelé ⟹ √101 ≈ 10,05 km | √101 = 10,0498… | ✅ **« pas onze » est exact** |
| `02` | u(2;3;6) ⟹ norme 7 | 4 + 9 + 36 = 49, √49 = 7 | ✅ |
| `04` | u(1;−2;2) ⟹ norme 3 | 1 + 4 + 4 = 9, √9 = 3 | ✅ |
| `04` | leurre B = 1 | 1 − 2 + 2 : somme des coordonnées | ✅ |
| `04` | leurre C = 9 | le carré de la norme, racine oubliée | ✅ |
| `05` | A(1;0;2), B(3;−1;4) ⟹ AB = 3 | AB = (2;−1;2), 4 + 1 + 4 = 9 | ✅ |
| `06` | √(3² + 4²) = 5, et non 7 | √25 = 5 | ✅ |
| `06` | √14 ≈ 3,74 | √14 = 3,7416… | ✅ |
| `07` | A(2;1;0), B(2;1;5) ⟹ AB = 5 | AB = (0;0;5), √25 = 5 | ✅ |
| `07b` | leurre « racine de 5 » | 5 non élevé au carré sous la racine | ✅ |
| `07b` | leurre « zéro » | les deux premières coordonnées du VECTEUR sont nulles, pas la norme | ✅ |

⛔ **Exclusion deux à deux des propositions ?**
`04` : 3, 1 et 9 — trois nombres distincts, un seul juste ✅.
`07` : 5, √5 ≈ 2,24 et 0 — trois valeurs distinctes ✅.

### Short — « la racine ne se distribue pas »

**Une seule idée**, celle de l'épisode : on n'additionne pas deux longueurs perpendiculaires, on passe par les carrés.
⛔ Un short ne RÉSUME pas son épisode — il en prend une idée et la rend en une minute.
**Bonne réponse : B** (tirage des shorts, table en tête de fichier).

- **00-accroche** : Dix kilomètres à plat et un kilomètre de dénivelé. Onze kilomètres parcourus ? Non.
- **01-idee** : On n'additionne pas une distance au sol et une hauteur : on passe par les carrés. Cent plus un fait cent un, et racine de cent un fait un peu plus de dix. Le dénivelé change presque tout à l'effort, et presque rien à la distance.
- **02-question** : Question ! Que vaut racine de 3 au carré plus 4 au carré ? A : 7. B : 5. C : 25. Mets pause, et choisis !
- **02b-reponse** : Réponse B, 5. Les carrés font 9 et 16, leur somme fait 25, et racine de 25 fait 5. La réponse A distribue la racine sur les deux termes, et c'est exactement ce qu'une racine ne fait jamais. Et 25, c'est la somme des carrés : on a oublié de prendre la racine.
- **03-commentaire** : À toi ! u a pour coordonnées 2, 3, 6. Que vaut sa norme ? Réponds en commentaire !
- **04-abonne** : Entraîne-toi sur éleveai point f r. Et abonne-toi !

#### ✅ Passe MATHS du short de E9 — recalculée, pas relue

| Clip | Ce que la voix affirme | Recalcul |
|---|---|---|
| `01` | 10 km à plat + 1 km de dénivelé ⟹ un peu plus de 10 km | √(10² + 1²) = √101 = 10,0498… — ✅ « pas onze » est exact |
| `02` | bonne réponse 5 | 9 + 16 = 25, √25 = 5 |
| `02b` | leurre A = 7 | 3 + 4 : la racine distribuée sur les deux termes |
| `02b` | leurre C = 25 | la somme des carrés, racine oubliée |
| `03` | défi u(2;3;6) | 4 + 9 + 36 = 49, √49 = 7 — ⛔ non dit, non affiché |

⛔ **Exclusion deux à deux des trois propositions ?** 5, 7 et 25 — trois nombres distincts, et chacun nomme une faute précise ✅.

---

# E10 · `terminale-ps-espace-angle`

**Micro** : `ps_espace_angle` — Calculer un angle dans l'espace (notion `produit_scalaire_espace`).
**Métier / contexte** : Ravi, installateur de panneaux solaires à Saint-Pierre — l'angle décide du rendement.
**Code couleur** : ambre = ce qu'on regarde, bleu = le vecteur u, rose = le vecteur v, vert = juste, rouge = le piège.

- **00-garde** : Calculer un angle dans l'espace. Un produit scalaire, deux normes, une division — et le signe te donne la réponse avant le calcul.
- **01-situation** : Voici Ravi. Il installe des panneaux solaires sur les toits de Saint-Pierre. Un panneau face au soleil produit à plein. Incliné de trente degrés, il perd un peu. À quatre-vingt-dix degrés, il ne produit plus rien. Ce qui compte, c'est l'angle entre la direction du soleil et la direction du panneau. Et cet angle se calcule avec un produit scalaire.
- **02-idee** : On part de la seconde formule du produit scalaire : u scalaire v égale la norme de u, fois la norme de v, fois le cosinus de l'angle. On isole le cosinus : il vaut le produit scalaire divisé par le produit des deux normes. Exemple : u de coordonnées 1, zéro, zéro, et v de coordonnées 1, 1, zéro. Le produit scalaire vaut 1. La norme de u vaut 1, celle de v vaut racine de 2. Le cosinus vaut donc 1 sur racine de 2, environ zéro virgule 71. L'angle vaut 45 degrés.
- **03-theoreme** : La méthode tient en trois calculs : le produit scalaire, puis les deux normes, puis la division — et on termine avec la touche arccosinus de la calculatrice. Mais avant tout cela, regarde le signe du produit scalaire : positif, l'angle est aigu ; nul, il est droit ; négatif, il est obtus. Les normes étant toujours positives, le cosinus a le même signe que le produit scalaire.
- **04-question** : Question ! Le produit scalaire de u et v vaut moins 6, et aucun des deux vecteurs n'est nul. L'angle entre u et v est : A : aigu. B : droit. C : obtus, donc plus grand que 90 degrés. Mets pause, et choisis !
- **04b-reponse** : Réponse C. Le cosinus de l'angle a le même signe que le produit scalaire, puisqu'on divise par deux normes qui sont positives. Un produit scalaire négatif donne donc un cosinus négatif, et un cosinus négatif donne un angle compris entre 90 et 180 degrés : un angle obtus. On n'a même pas eu besoin de connaître les normes.
- **05-appliquer** : Appliquons jusqu'au bout. u a pour coordonnées 1, 1, zéro, et v a pour coordonnées zéro, 1, 1. Le produit scalaire : zéro plus 1 plus zéro, donc 1. Les deux normes valent racine de 2, leur produit vaut donc 2. Le cosinus vaut 1 divisé par 2, c'est-à-dire zéro virgule 5. Et un cosinus qui vaut un demi, c'est l'angle de 60 degrés, sans calculatrice.
- **06-piege** : Voilà le piège, ou plutôt les trois ! Un : on divise par le produit des normes, jamais par leur somme. Deux : un cosinus est toujours compris entre moins 1 et 1 ; si tu trouves 1 virgule 25, ce n'est pas une découverte, c'est une erreur de calcul. Trois, le plus fin : l'angle de deux vecteurs et l'angle de deux droites ne sont pas la même chose. Si tu retournes un vecteur, le produit scalaire change de signe et l'angle devient son supplémentaire. Pour l'angle de deux droites, on prend donc la valeur absolue du cosinus, et on obtient un angle entre zéro et 90 degrés.
- **07-question** : Question ! On calcule le cosinus de l'angle entre deux vecteurs et on trouve 1 virgule 25. Que peut-on dire ? A : l'angle est très petit. B : il y a une erreur, un cosinus reste entre moins 1 et 1. C : les deux vecteurs sont colinéaires. Mets pause, et choisis !
- **07b-reponse** : Réponse B. Un cosinus ne dépasse jamais 1, jamais. Les deux erreurs les plus fréquentes : avoir divisé par la somme des normes au lieu de leur produit, ou avoir oublié une racine dans une norme. Reprends le calcul. Et pour la réponse C : quand le cosinus vaut exactement 1, ou exactement moins 1 — mais pas 1 virgule 25 — alors oui, les deux vecteurs sont colinéaires.
- **08-rediger** : Au bac, quatre lignes, dans cet ordre. Un : le produit scalaire, calcul écrit. Deux : la première norme. Trois : la seconde norme. Quatre : le cosinus sous forme exacte, puis l'angle arrondi comme l'énoncé le demande, avec son unité, degrés ou radians. Donner un angle sans préciser l'unité, c'est perdre le point.
- **09-defi** : À toi de jouer ! Dans le cube A B C D E F G H d'arête 1, avec le repère A, A B, A D, A E : calcule l'angle entre les vecteurs A G et A B, arrondi au degré. Mets pause, et cherche !
- **09b-correction** : Correction. Le vecteur A G a pour coordonnées 1, 1, 1 et le vecteur A B a pour coordonnées 1, zéro, zéro. Leur produit scalaire vaut 1 fois 1, plus 1 fois zéro, plus 1 fois zéro, donc 1. La norme de A G vaut racine de 3, celle de A B vaut 1. Le cosinus de l'angle vaut donc 1 divisé par racine de 3, soit environ zéro virgule 577. À la calculatrice, l'arccosinus donne environ 54 virgule 7 degrés, donc 55 degrés arrondi au degré. Et surtout : ce n'est pas 45 degrés. L'angle de la grande diagonale du cube avec une arête vaut 55 degrés environ, et beaucoup de copies écrivent 45 sans calculer.
- **10-finale** : Ce que tu as appris. Le cosinus de l'angle, c'est le produit scalaire divisé par le produit des normes. Le signe du produit scalaire dit tout de suite aigu, droit ou obtus. Un cosinus reste entre moins 1 et 1. Et pour deux droites, on prend la valeur absolue.
- **11-abonne** : Entraîne-toi sur éleveai point f r. Et abonne-toi !

## ✅ Passe MATHS de E10 — faite le 22/11/2026, avant tout rendu

| Clip | Ce que la voix affirme | Recalcul | Verdict |
|---|---|---|---|
| `09b` | AG · AB = 1 | (1;1;1)·(1;0;0) | ✅ |
| `09b` | cos = 1/√3 ≈ 0,577 | 1/1,73205 = 0,57735 | ✅ |
| `09b` | angle ≈ 54,7°, soit 55° | arccos(0,57735) = 54,7356° | ✅ |
| `09b` | « ce n'est pas 45 degrés » | 45° serait cos = 0,7071 ≠ 0,577 | ✅ **l'erreur la plus répandue** |
| `10` | cos = produit scalaire / produit des normes | formule isolée du `02` | ✅ |
| `02` | u(1;0;0), v(1;1;0) ⟹ cos = 1/√2 ≈ 0,71, angle 45° | 1/1,41421 = 0,70711 ; arccos = 45° | ✅ |
| `03` | le signe du produit scalaire donne la nature de l'angle | ‖u‖‖v‖ > 0 pour u, v non nuls | ✅ |
| `04` | produit scalaire −6 ⟹ angle obtus | cos < 0 ⟹ θ ∈ ]90° ; 180°] | ✅ |
| `05` | u(1;1;0)·v(0;1;1) = 1 | 0 + 1 + 0 | ✅ |
| `05` | les deux normes valent √2, leur produit 2 | √2 × √2 = 2 | ✅ |
| `05` | cos = 0,5 ⟹ 60° | arccos(0,5) = 60° | ✅ |
| `06` | « on divise par le produit, pas la somme » | la formule | ✅ |
| `06` | retourner un vecteur donne l'angle supplémentaire | cos(180° − θ) = −cos θ | ✅ |
| `06` | pour deux DROITES : valeur absolue, angle dans [0° ; 90°] | les deux directeurs opposés donnent le même angle de droites | ✅ |
| `07` | cos = 1,25 impossible | la valeur absolue du cosinus est au plus 1 (Cauchy-Schwarz) | ✅ |
| `07b` | cos = ±1 ⟺ colinéaires | cas d'égalité | ✅ |

⛔ **Exclusion deux à deux des propositions ?**
`04` : obtus / aigu / droit — les trois natures d'angle s'excluent ✅.
`07` : erreur de calcul / angle très petit / colinéaires — s'excluent, et seules les deux dernières supposent le résultat valide ✅.

### Short — « la grande diagonale ne fait pas 45 degrés »

**Une seule idée**, celle de l'épisode : le cosinus vient du produit scalaire divisé par le produit des normes — et le dessin, lui, trompe.
⛔ Un short ne RÉSUME pas son épisode — il en prend une idée et la rend en une minute.
**Bonne réponse : C** (tirage des shorts, table en tête de fichier).

- **00-accroche** : La grande diagonale d'un cube et une arête : 45 degrés ? Beaucoup de copies l'écrivent, et c'est faux.
- **01-idee** : Le cosinus de l'angle, c'est le produit scalaire divisé par le produit des deux normes. Dans le cube d'arête 1, le vecteur A G a pour coordonnées 1, 1, 1 et le vecteur A B a pour coordonnées 1, zéro, zéro. Leur produit scalaire vaut 1. Les normes valent racine de 3 et 1. Le cosinus vaut donc 1 sur racine de 3, environ zéro virgule 577.
- **02-question** : Question ! Que vaut alors l'angle entre la grande diagonale et l'arête, arrondi au degré ? A : 45 degrés. B : 60 degrés. C : 55 degrés. Mets pause, et choisis !
- **02b-reponse** : Réponse C. L'arccosinus de zéro virgule 577 donne environ 54 virgule 7 degrés, donc 55 degrés arrondi au degré. 45 degrés correspondrait à un cosinus de zéro virgule 71, et 60 degrés à un cosinus de zéro virgule 5 : ni l'un ni l'autre n'est la valeur trouvée. Le dessin trompe, le calcul tranche.
- **03-commentaire** : À toi ! Le produit scalaire de deux vecteurs non nuls vaut moins 6. Leur angle est-il aigu, droit ou obtus ? Réponds en commentaire !
- **04-abonne** : Entraîne-toi sur éleveai point f r. Et abonne-toi !

#### ✅ Passe MATHS du short de E10 — recalculée, pas relue

| Clip | Ce que la voix affirme | Recalcul |
|---|---|---|
| `01` | AG · AB = 1 | (1;1;1)·(1;0;0) = 1 + 0 + 0 |
| `01` | ‖AG‖ = √3 et ‖AB‖ = 1 | √(1+1+1) et √(1+0+0) |
| `01` | cos ≈ 0,577 | 1 / 1,73205 = 0,57735 |
| `02b` | bonne réponse ≈ 54,7°, donc 55° | arccos(0,57735) = 54,7356° |
| `02b` | leurre A : 45° ⟹ cos 0,71 | cos 45° = 0,70711 ≠ 0,577 |
| `02b` | leurre B : 60° ⟹ cos 0,5 | cos 60° = 0,5 ≠ 0,577 |
| `03` | défi : u · v = −6 ⟹ obtus | ‖u‖‖v‖ > 0 donc cos < 0 donc θ entre 90° et 180° — ⛔ non dit, non affiché |

⛔ **Exclusion deux à deux des trois propositions ?** 45, 55 et 60 degrés — trois valeurs distinctes, et une seule est compatible avec le cosinus calculé juste avant à l'écran ✅.

---

# E11 · `terminale-ps-espace-plan-normal`

**Micro** : `ps_espace_plan_normal` — Utiliser un vecteur normal à un plan (notion `produit_scalaire_espace`).
**Métier / contexte** : le clou planté droit dans une planche — la direction perpendiculaire se lit dans l'équation.
**Code couleur** : ambre = ce qu'on regarde, bleu = le plan, rose = le vecteur normal, vert = juste, rouge = le piège.

- **00-garde** : Vecteur normal à un plan. Les trois coefficients de l'équation sont les coordonnées d'un vecteur — et ce vecteur donne la direction perpendiculaire.
- **01-situation** : Un clou planté bien droit dans une planche : le clou donne la direction perpendiculaire à la planche. En maths, ce clou s'appelle un vecteur normal. Et voici le plus beau résultat du chapitre : si tu as l'équation d'un plan, tu as déjà son vecteur normal sous les yeux, sans aucun calcul.
- **02-idee** : Le plan d'équation 2 x moins y plus 3 z moins 5 égale zéro a pour vecteur normal le vecteur de coordonnées 2, moins 1, 3. On lit simplement les coefficients de x, de y et de z, avec leurs signes. Le terme constant, lui, ne fait pas partie du vecteur normal : il dit seulement où le plan se place, pas comment il est orienté.
- **03-theoreme** : Et cela marche dans les deux sens. Si le plan passe par un point A et a pour vecteur normal n de coordonnées a, b, c, alors son équation est a x plus b y plus c z plus d égale zéro. Et on trouve d en remplaçant par les coordonnées de A. La raison profonde : un point M est dans le plan si et seulement si le vecteur A M est orthogonal à n, c'est-à-dire si leur produit scalaire est nul.
- **04-question** : Question ! Quel est un vecteur normal au plan d'équation x moins 2 y plus 5 z plus 7 égale zéro ? A : 1, moins 2, 5. B : 1, 2, 5. C : zéro, zéro, 7. Mets pause, et choisis !
- **04b-reponse** : Réponse A. On lit les coefficients avec leurs signes : 1, moins 2 et 5. La réponse B a perdu le signe moins, et ce n'est pas un détail : elle décrit une direction complètement différente. Et la réponse C a pris le terme constant, qui ne dit rien de la direction : deux plans parallèles ont le même vecteur normal et des termes constants différents.
- **05-appliquer** : Appliquons dans l'autre sens. On cherche l'équation du plan qui passe par A, de coordonnées 1, 2, moins 1, et qui a pour vecteur normal n de coordonnées 3, zéro, 1. L'équation commence donc par 3 x plus zéro y plus z plus d égale zéro. On remplace par A : 3 fois 1, plus zéro, plus moins 1, plus d. Cela donne 2 plus d égale zéro, donc d vaut moins 2. L'équation du plan est 3 x plus z moins 2 égale zéro. Et le y absent n'est pas une erreur : son coefficient est nul, le plan est parallèle à l'axe des y.
- **06-piege** : Voilà le piège ! Un vecteur normal n'est pas unique : tous ses multiples non nuls en sont aussi. Du coup, deux équations qui ne se ressemblent pas peuvent décrire le même plan. Regarde : 2 x plus 2 y plus 2 z moins 2 égale zéro et x plus y plus z moins 1 égale zéro sont deux écritures du même plan. Pour comparer deux plans, on procède donc en deux temps : les normales sont-elles colinéaires ? Si non, les plans sont sécants. Si oui, les plans sont parallèles, et on teste alors un point pour savoir s'ils sont confondus. Deuxième piège : ne confonds pas vecteur normal et vecteur directeur. Le vecteur normal d'un plan est le vecteur directeur de toute droite perpendiculaire à ce plan.
- **07-question** : Question ! Les plans P, d'équation x plus y plus z moins 1 égale zéro, et P prime, d'équation 2 x plus 2 y plus 2 z plus 6 égale zéro, sont : A : sécants. B : strictement parallèles. C : confondus. Mets pause, et choisis !
- **07b-reponse** : Réponse B. Les deux normales, 1, 1, 1 et 2, 2, 2, sont colinéaires : les plans sont donc parallèles, ils ne sont pas sécants. Sont-ils confondus ? Divisons la seconde équation par 2 : x plus y plus z plus 3 égale zéro. Le terme constant vaut plus 3, et celui de P vaut moins 1 : ce ne sont pas les mêmes plans. Ils sont donc strictement parallèles, sans aucun point commun.
- **08-rediger** : Deux rédactions à connaître. Pour une équation : n de coordonnées tant est un vecteur normal à P, donc P a une équation de la forme a x plus b y plus c z plus d égale zéro, et on trouve d avec le point A. Pour un projeté orthogonal, voilà la méthode reine. On écrit la droite qui passe par le point, et qui a le vecteur normal pour vecteur directeur. Puis on cherche son intersection avec le plan. Le point trouvé est le projeté.
- **09-defi** : À toi de jouer ! Le plan P a pour équation x plus y plus z égale zéro, et le point A a pour coordonnées 1, 1, 1. Détermine les coordonnées du projeté orthogonal de A sur P. Mets pause, et cherche !
- **09b-correction** : Correction. Le vecteur normal de P se lit dans l'équation : 1, 1, 1. La droite qui passe par A et qui suit cette direction a pour représentation paramétrique x égale 1 plus t, y égale 1 plus t, z égale 1 plus t. On remplace dans l'équation du plan : 1 plus t, plus 1 plus t, plus 1 plus t. Cela fait 3 plus 3 t. On résout 3 plus 3 t égale zéro : t vaut moins 1. On reporte : chaque coordonnée vaut 1 moins 1, donc zéro. Le projeté orthogonal de A sur P est l'origine du repère. Vérification : zéro plus zéro plus zéro fait bien zéro, l'origine est bien dans P.
- **10-finale** : Ce que tu as appris. Les coefficients de l'équation d'un plan sont les coordonnées d'un vecteur normal. Un point et une normale suffisent pour écrire l'équation. Deux normales colinéaires annoncent deux plans parallèles. Et pour un projeté orthogonal, on suit la normale.
- **11-abonne** : Entraîne-toi sur éleveai point f r. Et abonne-toi !

## ✅ Passe MATHS de E11 — faite le 22/11/2026, avant tout rendu

| Clip | Ce que la voix affirme | Recalcul | Verdict |
|---|---|---|---|
| `09b` | normale de x + y + z = 0 : (1;1;1) | coefficients | ✅ |
| `09b` | la droite : x = 1 + t, y = 1 + t, z = 1 + t | A(1;1;1) + t·(1;1;1) | ✅ |
| `09b` | substitution ⟹ 3 + 3t | (1+t)×3 | ✅ |
| `09b` | t = −1, projeté = (0;0;0) | 3 + 3t = 0 ⟹ t = −1 ; 1 − 1 = 0 | ✅ |
| `09b` | vérification : l'origine est dans P | 0 + 0 + 0 = 0 | ✅ |
| `09b` | ⚠️ contrôle supplémentaire : AK est bien colinéaire à n | AK = (0;0;0) − (1;1;1) = (−1;−1;−1) = −n | ✅ |
| `10` | les coefficients sont la normale | théorème du `02` | ✅ |
| `02` | 2x − y + 3z − 5 = 0 ⟹ n(2;−1;3) | lecture directe | ✅ |
| `04` | n = (1;−2;5) | coefficients avec signes | ✅ |
| `04` | leurre B = (1;2;5) | signe perdu ; colinéaire à (1;−2;5) ? non | ✅ |
| `04` | leurre C = (0;0;7) | le terme constant ; colinéaire à (1;−2;5) ? non | ✅ |
| `05` | A(1;2;−1), n(3;0;1) ⟹ d = −2 | 3 + 0 − 1 + d = 0 ⟹ d = −2 | ✅ |
| `05` | équation 3x + z − 2 = 0, vérifiée sur A | 3 − 1 − 2 = 0 | ✅ |
| `05` | « le plan est parallèle à l'axe des y » | n ⊥ j puisque la 2ᵉ coordonnée de n est nulle | ✅ |
| `06` | 2x + 2y + 2z − 2 = 0 et x + y + z − 1 = 0 : même plan | division par 2 | ✅ |
| `07` | P et P' strictement parallèles | normales colinéaires ; P' ⟺ x + y + z + 3 = 0, et 3 ≠ −1 | ✅ |

⛔ **Exclusion deux à deux des propositions ?**
`04` : trois triplets, aucun colinéaire à un autre, un seul est la normale ✅.
`07` : strictement parallèles / confondus / sécants — trois positions exclusives ✅.

### Short — « la normale est déjà écrite dans l'équation »

**Une seule idée**, celle de l'épisode : les trois coefficients de l'équation SONT les coordonnées d'un vecteur normal.
⛔ Un short ne RÉSUME pas son épisode — il en prend une idée et la rend en une minute.
**Bonne réponse : B** (tirage des shorts, table en tête de fichier).

- **00-accroche** : Tu as l'équation d'un plan ? Alors tu as déjà son vecteur normal sous les yeux, sans aucun calcul.
- **01-idee** : Les coefficients de x, de y et de z sont les coordonnées d'un vecteur normal, avec leurs signes. Le plan d'équation 2 x moins y plus 3 z moins 5 égale zéro a donc pour vecteur normal 2, moins 1, 3. Le terme constant, lui, n'en fait pas partie : il dit seulement où le plan se place, pas comment il est orienté.
- **02-question** : Question ! Quel est un vecteur normal au plan d'équation 3 x moins y plus 2 z plus 4 égale zéro ? A : 3, 1, 2. B : 3, moins 1, 2. C : zéro, zéro, 4. Mets pause, et choisis !
- **02b-reponse** : Réponse B. On lit les trois coefficients avec leurs signes : 3, moins 1 et 2. La réponse A a perdu le signe moins, et ce n'est pas un détail : elle décrit une tout autre direction. Et la réponse C a pris le terme constant, qui ne dit rien de l'orientation du plan : deux plans parallèles ont la même normale et des termes constants différents.
- **03-commentaire** : À toi ! Quel est un vecteur normal au plan d'équation x moins 4 y plus z moins 9 égale zéro ? Réponds en commentaire !
- **04-abonne** : Entraîne-toi sur éleveai point f r. Et abonne-toi !

#### ✅ Passe MATHS du short de E11 — recalculée, pas relue

| Clip | Ce que la voix affirme | Recalcul |
|---|---|---|
| `01` | 2x − y + 3z − 5 = 0 ⟹ n(2;−1;3) | lecture des coefficients de x, y, z |
| `02` | bonne réponse (3;−1;2) | coefficients de 3x − y + 2z + 4 = 0, avec leurs signes |
| `02b` | leurre A = (3;1;2) | signe perdu ; colinéaire à (3;−1;2) ? k = 1 sur x, puis 1 ≠ −1 : non |
| `02b` | leurre C = (0;0;4) | le terme constant ; colinéaire à (3;−1;2) ? première coordonnée 0 ≠ 3 : non |
| `02b` | « deux plans parallèles ont la même normale » | ils ne diffèrent que par d |
| `03` | défi x − 4y + z − 9 = 0 | n = (1;−4;1) — ⛔ non dit, non affiché |

⛔ **Exclusion deux à deux des trois propositions ?** Trois triplets, aucun colinéaire à un autre (vérifié ci-dessus), et un seul est la normale ✅.

---

# E12 · `terminale-ps-espace-defi`

**Micro** : `ps_espace_defi` — Résoudre un exercice type bac avec produit scalaire dans l'espace (notion `produit_scalaire_espace`).
**Métier / contexte** : le sujet de bac lui-même — une normale, une équation, une distance.
**Code couleur** : ambre = ce qu'on regarde, bleu = le cube, rose = la normale, vert = juste, rouge = le piège.

- **00-garde** : Exercice type bac avec produit scalaire. Une normale, une équation, une distance : c'est toujours le même fil, et il se tire en quatre questions.
- **01-situation** : Regarde les sujets des années passées : l'exercice de l'espace suit presque toujours le même chemin. On démontre qu'un vecteur est normal à un plan. On en déduit l'équation de ce plan. Puis on calcule une distance, un projeté, ou un angle. Si tu reconnais le chemin, tu ne cherches plus quoi faire : tu avances.
- **02-idee** : Le fil, en trois étapes. Un : deux produits scalaires nuls prouvent qu'un vecteur est normal au plan. Deux : ce vecteur donne les coefficients de l'équation, et un point du plan donne le terme constant. Trois : avec la normale, on atteint tout le reste — le projeté orthogonal en suivant la normale, la distance en calculant une norme, l'angle en divisant par les normes.
- **03-theoreme** : Ta boîte à outils complète, cinq objets. Le produit scalaire en coordonnées. Produit nul, vecteurs orthogonaux. La norme, racine de la somme des carrés. Les coefficients de l'équation d'un plan, qui sont sa normale. Et le projeté orthogonal, qu'on trouve en suivant la normale depuis le point.
- **04-question** : Question ! Pour démontrer qu'un vecteur n est normal au plan B D E, que faut-il vérifier ? A : que n est orthogonal à B D. B : que n est orthogonal à B D et à B E, et que ces deux vecteurs ne sont pas colinéaires. C : que n est colinéaire à B D. Mets pause, et choisis !
- **04b-reponse** : Réponse B. Il faut les deux produits scalaires, et il faut la phrase sur la non-colinéarité : sans elle, la démonstration est incomplète et le point est perdu. La réponse A, c'est le piège du poteau vérifié dans un seul sens. Et la réponse C dit le contraire de ce qu'on cherche : être colinéaire à un vecteur du plan, c'est aller dans la direction du plan, pas perpendiculairement à lui.
- **05-appliquer** : Appliquons les deux premières étapes dans le cube A B C D E F G H, repère A, A B, A D, A E. On sait que le vecteur A G, de coordonnées 1, 1, 1, est normal au plan B D E. Les coefficients de l'équation sont donc 1, 1 et 1 : l'équation s'écrit x plus y plus z plus d égale zéro. On remplace par B, de coordonnées 1, zéro, zéro : 1 plus d égale zéro, donc d vaut moins 1. Le plan B D E a pour équation x plus y plus z moins 1 égale zéro. Vérifions sur les deux autres points : pour D, zéro plus 1 plus zéro moins 1 fait zéro ; pour E, zéro plus zéro plus 1 moins 1 fait zéro. Les trois points y sont.
- **06-piege** : Voilà les pièges de la copie, et ils coûtent plus cher que les erreurs de calcul. Un : prouver une orthogonalité sur une seule direction. Deux : oublier d'écrire que les deux vecteurs ne sont pas colinéaires. Trois : donner un arrondi quand l'énoncé demande une valeur exacte, ou l'inverse. Quatre : annoncer une distance négative, ce qui n'existe pas. Et cinq : s'appuyer sur le dessin pour affirmer qu'un point est dans un plan. Dans l'espace, la preuve est toujours un calcul.
- **07-question** : Question ! Dans le cube d'arête 1, on considère les points B, D et E. Le triangle B D E est : A : équilatéral. B : rectangle en B. C : quelconque. Mets pause, et choisis !
- **07b-reponse** : Réponse A, équilatéral. Chacun de ses trois côtés est la diagonale d'une face du cube : B D, B E et D E ont tous pour longueur racine de 2. Rectangle en B ? Calculons : le produit scalaire de B D et B E vaut moins 1 fois moins 1, plus 1 fois zéro, plus zéro fois 1, c'est-à-dire 1. Il n'est pas nul, donc l'angle en B n'est pas droit — il vaut 60 degrés, comme dans tout triangle équilatéral.
- **08-rediger** : Le squelette d'une copie complète. Un : les coordonnées de tous les points utiles. Deux : les deux produits scalaires, et la phrase de non-colinéarité. Trois : donc n est normal au plan, puis l'équation, vérifiée sur un deuxième point. Quatre : le calcul demandé, projeté, distance ou angle, avec une conclusion en français et l'unité. Ce plan-là fonctionne sur n'importe quel sujet de l'espace.
- **09-defi** : À toi de jouer ! Dans le cube d'arête 1, le plan B D E a pour équation x plus y plus z moins 1 égale zéro. Détermine le projeté orthogonal K de A sur ce plan, puis la distance de A au plan B D E. Mets pause, et cherche !
- **09b-correction** : Correction. La normale du plan se lit dans l'équation : 1, 1, 1. La droite qui passe par A, l'origine, et qui suit cette direction a pour représentation paramétrique x égale t, y égale t, z égale t. On remplace dans l'équation : t plus t plus t moins 1 égale zéro, donc 3 t égale 1, donc t vaut un tiers. Le projeté K a donc pour coordonnées un tiers, un tiers, un tiers. Pour la distance, on calcule la norme du vecteur A K : chaque coordonnée au carré fait un neuvième, et trois neuvièmes font un tiers. La distance vaut donc racine d'un tiers, c'est-à-dire racine de 3 divisé par 3, environ zéro virgule 58. Et regarde ce que tu viens de démontrer : K est au tiers de la grande diagonale A G. Le plan B D E coupe la diagonale du cube à son premier tiers.
- **10-finale** : Ce que tu as appris. Le fil du bac : une normale, une équation, puis une distance ou un angle. Deux produits scalaires nuls, et la non-colinéarité écrite. Le projeté orthogonal se trouve en suivant la normale. Et la preuve, dans l'espace, est toujours un calcul, jamais un dessin.
- **11-abonne** : Entraîne-toi sur éleveai point f r. Et abonne-toi !

## ✅ Passe MATHS de E12 — faite le 22/11/2026, avant tout rendu

| Clip | Ce que la voix affirme | Recalcul | Verdict |
|---|---|---|---|
| `09b` | substitution ⟹ 3t − 1 = 0, t = 1/3 | t + t + t − 1 | ✅ |
| `09b` | K = (1/3 ; 1/3 ; 1/3) | t = 1/3 sur x = y = z = t | ✅ |
| `09b` | K est dans le plan | 1/3 + 1/3 + 1/3 − 1 = 0 | ✅ |
| `09b` | ‖AK‖² = 3 × 1/9 = 1/3 | (1/3)² = 1/9 | ✅ |
| `09b` | distance = √(1/3) = √3/3 ≈ 0,58 | 1/√3 = 0,57735 | ✅ |
| `09b` | « K est au tiers de AG » | AK = (1/3)·(1;1;1) = (1/3)·AG | ✅ |
| `10` | le projeté se trouve en suivant la normale | méthode du `08` de E11 | ✅ |
| `05` | (BDE) : x + y + z − 1 = 0 | normale (1;1;1), B(1;0;0) ⟹ d = −1 | ✅ |
| `05` | vérifié sur D(0;1;0) et E(0;0;1) | 0+1+0−1 = 0 · 0+0+1−1 = 0 | ✅ |
| `04` | il faut DEUX produits scalaires + la non-colinéarité | théorème de E8 | ✅ |
| `07` | BD = BE = DE = racine de 2 | BD = (−1;1;0), BE = (−1;0;1), DE = (0;−1;1) — les trois de norme √2 | ✅ |
| `07` | le triangle est équilatéral | trois côtés égaux | ✅ |
| `07` | BD · BE = 1, donc pas rectangle en B | (−1)(−1) + (1)(0) + (0)(1) = 1 ≠ 0 | ✅ |
| `07b` | « l'angle en B vaut 60 degrés » | cos = 1/(√2·√2) = 0,5 ⟹ 60° | ✅ **cohérent avec l'équilatéral** |
| `06` | « une distance négative n'existe pas » | une norme est positive ou nulle | ✅ |

⛔ **Exclusion deux à deux des propositions ?**
`04` : les deux produits + non-colinéarité / un seul produit / colinéaire à BD — exclusives, et la dernière est l'opposé du but ✅.
`07` : équilatéral / rectangle en B / quelconque — exclusives : équilatéral exclut rectangle (60° ≠ 90°) et exclut quelconque ✅.

### Short — « le plan B D E coupe la diagonale à son premier tiers »

**Une seule idée**, celle de l'épisode : on atteint un projeté orthogonal en suivant la normale, et le résultat est une surprise géométrique.
⛔ Un short ne RÉSUME pas son épisode — il en prend une idée et la rend en une minute.
**Bonne réponse : A** (tirage des shorts, table en tête de fichier).

- **00-accroche** : Dans le cube, le plan B D E coupe la grande diagonale. En son milieu ? Non.
- **01-idee** : Le plan B D E a pour équation x plus y plus z moins 1 égale zéro, donc pour vecteur normal 1, 1, 1. La droite qui part de A et suit cette normale a pour représentation paramétrique x égale t, y égale t, z égale t. On remplace dans l'équation : trois t moins 1 égale zéro, donc t vaut un tiers. Le projeté de A a pour coordonnées un tiers, un tiers, un tiers.
- **02-question** : Question ! Ce point est donc situé où, sur la grande diagonale A G ? A : au tiers de A G. B : au milieu de A G. C : aux deux tiers de A G. Mets pause, et choisis !
- **02b-reponse** : Réponse A. Le vecteur A G a pour coordonnées 1, 1, 1, et le projeté a pour coordonnées un tiers, un tiers, un tiers : c'est exactement un tiers du vecteur A G. Le milieu, ce serait un demi partout, et les deux tiers, deux tiers partout — et ni l'un ni l'autre ne vérifie l'équation du plan. Le plan coupe bien la diagonale à son premier tiers.
- **03-commentaire** : À toi ! Quelle est alors la distance du point A au plan B D E ? Réponds en commentaire !
- **04-abonne** : Entraîne-toi sur éleveai point f r. Et abonne-toi !

#### ✅ Passe MATHS du short de E12 — recalculée, pas relue

| Clip | Ce que la voix affirme | Recalcul |
|---|---|---|
| `01` | (BDE) : x + y + z − 1 = 0, normale (1;1;1) | coefficients ; et B(1;0;0) donne 1 + d = 0, d = −1 |
| `01` | substitution ⟹ 3t − 1 = 0, t = 1/3 | t + t + t − 1 = 0 |
| `01` | K = (1/3 ; 1/3 ; 1/3) | t = 1/3 reporté sur x = y = z = t |
| `02b` | K est au tiers de AG | AK = (1/3 ; 1/3 ; 1/3) = (1/3)·(1;1;1) = (1/3)·AG |
| `02b` | leurre B, le milieu | (1/2 ; 1/2 ; 1/2) : 3 × 1/2 − 1 = 1/2 ≠ 0, le point n'est PAS dans le plan |
| `02b` | leurre C, les deux tiers | (2/3 ; 2/3 ; 2/3) : 3 × 2/3 − 1 = 1 ≠ 0, le point n'est PAS dans le plan |
| `03` | défi : distance de A au plan | ‖AK‖ = √(3 × 1/9) = √(1/3) = √3/3 ≈ 0,577 — ⛔ non dit, non affiché |

⛔ **Exclusion deux à deux des trois propositions ?** Le tiers, le milieu, les deux tiers — trois points distincts de la diagonale, et les deux leurres sont réfutés par l'équation elle-même ✅.

---

## Les deux contrôles de ces voix, et ce qu'ils ne voient pas

Les tableaux de passe maths ci-dessus sont une **relecture** : c'est moi qui y affirme
que « 4 moins 4 fait zéro ». Deux scripts refont le travail à l'exécution.

```
python manim/poste2/verifier-voix-espace.py          → gabarit, symboles, copier-collers
python manim/poste2/controler-maths-voix-espace.py   → ⭐⭐ la passe MATHS, recalculée
```

Le second ne lit pas les fichiers de voix — il ne saurait pas comprendre « moins 3 fois
moins 1 fait plus 3 ». Les affirmations y sont **réécrites en calcul**, clip par clip :
deux écritures indépendantes du même nombre, et un désaccord qui se voit.

⭐⭐ **Les deux instruments ont été étalonnés avant d'être crus**, avec des fautes posées
exprès — la leçon de l'instrument des figures, qui disait « 0 faute » alors qu'il ne
testait rien. Trois fautes de gabarit (un symbole `=`, un clip manquant, un clip recopié
d'un épisode à l'autre) : 3 attrapées. Trois fautes de maths (un produit scalaire changé
en 3, l'angle du cube ramené à 45 degrés, le signe du terme constant du plan BDE) :
3 attrapées.

⛔ **Et l'étalonnage a trouvé deux de mes propres tests CREUX**, qui rendaient « vrai »
quoi qu'il arrive : un `isclose(0, 1)` (toujours faux, donc la ligne passait toujours) et
un `True` écrit en dur. Les deux sont remplacés par de vrais calculs — la non-coplanarité
de (AB) et (CG) se mesure maintenant par un déterminant. Un instrument qui n'a jamais eu
tort n'a peut-être jamais rien mesuré.

⚠️ **Ce que ces deux scripts ne voient pas, et que rien ne voit** : ce qui s'AFFICHE.
La longueur réelle d'une question à l'écran, une figure qui dépasse, une carte de choix
sur la tête de Ti Margo, une arête de la couleur du fond. La planche de contrôle et
`manim/poste2/apercu-instants.py` restent obligatoires, et avant le HD, pas après.

## ⏳ Ce qui reste après ces 12 voix

- Les **12 shorts Ti Margo** n'ont pas encore de voix : un short se déduit de l'épisode validé
  (accroche, une question, la réponse), et son gabarit se relit sur un short de terminale
  existant avant d'être écrit. ⛔ On n'écrit pas 12 shorts dans un moule non vérifié.
- Pour chaque épisode, dans l'ordre : WAV + marques, script Manim, `verifier-avant-rendu.py`,
  dry run, rendu `-ql`, planche regardée, `verifier-zone-margo.py` **sur le `-ql`**, puis
  seulement le HD (verrou unique), puis le branchement au coach et la fiche YouTube.
- ⭐ Le cube `ABCDEFGH` dans le repère (A ; AB, AD, AE) revient dans **neuf** des douze
  épisodes : c'est un décor à dessiner UNE fois dans `manim/poste2/espace3d.py` (fait) et à
  réutiliser, pas à redessiner douze fois.
