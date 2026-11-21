# Inventaire : série NOMBRES ENTIERS, du CM1 à la 6e (poste 2, samedi 21/11/2026)

> ⛔⛔ **La QUALITÉ avant le rythme** (Frédéric, 16/11 : « le principal est de tout finir avec une qualité
> optimum, même si on finit fin janvier »). Et ⛔ **le HD seulement quand on est CERTAIN** (21/11) : tout le
> contrôle se fait sur l'aperçu `-ql` et sa planche.

**Cette session s'arrête au récapitulatif des voix.** Aucun WAV, aucun rendu : `manim/VOIX-entiers-cm1-6e.md`
part en validation, et rien ne démarre avant le « oui ».

- Voix (source UNIQUE) : `manim/scripts/cm1/entier_voix.py` → `manim/VOIX-entiers-cm1-6e.md` (récap à valider)
  + `manim/scripts/cm1/entier_voix.json` (choix, bonne lettre, explications : lus par les scripts et pour le
  manifeste). Après le « oui » : `python manim/scripts/cm1/entier_voix.py --ecrire` → `manim/voix/<id>.json`.
- Bonnes réponses : ⛔ **deux graines** — **2111** pour les 44 questions des 11 premiers épisodes,
  qui sont FIGÉES (leurs WAV existent, le paysage A1 est rendu en HD, et la lettre comme l'ordre
  des choix sont DANS le texte dit : retirer tout le tirage les périmerait), **2211** pour les 4
  questions de `cm2-entier-multiple`. Résultat : A 16 / B 16 / C 16 sur 48 questions, jamais deux fois la même lettre de
  suite dans une paysage ; ordre des leurres tiré au hasard aussi (graine 2027).
- Plafonds de mots par phrase vérifiés par le script : **18 au CM1 et au CM2, 20 en 6e → 0 phrase au-dessus**.
- Centres d'intérêt vérifiés par ÂGE dans le script lui-même (tranche **9-11** pour CM1-CM2-6e) :
  **0 centre hors tranche**, et ⛔ aucun `reseaux-sociaux`, `cinema-series` ni `argent-budget`.
- Série NEUVE : **aucun WAV n'existe nulle part** pour ces 22 vidéos. Ceux produits ici seront la référence
  (c'est la raison pour laquelle Frédéric a choisi cette série plutôt que la reprise des Masses, dont les
  WAV viennent du poste 1 et dont `/public/sons/` est gitignoré).

---

## 1. Le découpage (tranché par Frédéric le 21/11 — ne pas rediscuter)

**12 épisodes = 24 vidéos** (1 paysage + 1 short Ti Margo chacun).

> ⛔⛔ **2ᵉ décision de Frédéric, 21/11** — l'écran « Et au CM2 » est gardé PARTOUT **sauf sur
> `entier_multiple`, qui se sépare en deux épisodes.** Sa raison, et c'est une règle pour la suite :
> « des nombres plus grands, un élève de CM1 les suit — l'écran Et au CM2 est exactement le bon outil
> pour ça. Mais les critères de divisibilité par 3 et par 9 sont une **méthode** que le CM1 n'a pas,
> pas une magnitude de plus. **Une notion qui déborde est une notion neuve.** »

| # | id de la vidéo | Classe | Notion | Micro | `aussi` | Métier | Centres | Ceintures (paysage / short) |
|---|---|---|---|---|---|---|---|---|
| A1 | `cm1-entier-lire` | CM1 | `nombre_entier` | `entier_lire` | cm2 `entier_lire` | Diego, cartographe | histoire-geographie | verte / blanche |
| A2 | `cm1-entier-comparer` | CM1 | `nombre_entier` | `entier_comparer` | cm2 `entier_comparer` | Malik, bibliothécaire | jeux-defis, histoire-geographie | verte / blanche |
| A3 | `cm1-entier-decomposer` | CM1 | `nombre_entier` | `entier_decomposer` | cm2 `entier_decomposer` | Thomas, imprimeur | art-design, technologie-ia | verte / blanche |
| A4 | `cm1-entier-arrondir` | CM1 | `nombre_entier` | `entier_arrondir` | cm2 `entier_arrondir` | Léna, météorologue | meteo-climat, sciences | verte / blanche |
| A5 | `cm1-entier-multiple` | **CM1 seul** | `nombre_entier` | `entier_multiple` | **—** | Awa, fleuriste | nature-ecologie, art-design | verte / blanche |
| A5′ | `cm2-entier-multiple` | **CM2 seul** | `nombre_entier` | `entier_multiple` | **—** | Hugo, pâtissier | cuisine, jeux-defis | verte / blanche |
| A6 | `cm1-entier-defi` | CM1 | `nombre_entier` | `entier_defi` | cm2 `entier_defi` | Sarah, factrice | transports, jeux-defis | **bleue** / blanche |
| B1 | `6e-entier-rang` | 6e | `entier_nombre` | `entier_rang` | — | Inès, contrôleuse aérienne | transports, technologie-ia | verte / blanche |
| B2 | `6e-entier-comparer` | 6e | `entier_nombre` | `entier_comparer` | — | Noé, astronome | espace, sciences | verte / blanche |
| B3 | `6e-entier-encadrer` | 6e | `entier_nombre` | `entier_encadrer` | — | Clara, guide de haute montagne | sport, nature-ecologie | verte / blanche |
| B4 | `6e-entier-decomposer` | 6e | `entier_nombre` | `entier_decomposer` | — | Ethan, game designer | jeux-video, technologie-ia | verte / blanche |
| B5 | `6e-entier-defi` | 6e | `entier_nombre` | `entier_defi` | — | Maya, volcanologue (974) | nature-ecologie, sciences | **bleue** / blanche |

- ⛔ **`entier_multiple` est l'exception** : deux vidéos, chacune sur sa classe, **sans `aussi`**.
  `cm1-entier-multiple` perd son écran `07-cm2` (il passe à 15 écrans ; ⚠️ le numéro 07 reste
  volontairement libre — renuméroter changerait les clés, donc les noms des WAV déjà produits).
  `cm2-entier-multiple` est bâti sur ce que la banque CM2 demande en propre : critères de
  divisibilité par 3 et par 9 (la somme des chiffres), multiples de 25/50/1 000 reconnus à la fin,
  nombres à 6-7 chiffres.
- **Lot A (les 5 autres micros)** : une seule vidéo par micro, **propriétaire CM1**, branchée au CM2 par le mécanisme `aussi`
  (2 lignes `notion_ressources`), comme `ce1_masse_soupeser` reçoit la vidéo du CP dans la série Masses.
  ⚠️ Particularité : les `microId` du CM1 et du CM2 sont **identiques** (`entier_lire`, `entier_comparer`,
  `entier_decomposer`, `entier_arrondir`, `entier_multiple`, `entier_defi`) sous la même notion
  `nombre_entier` ; seule la **classe** diffère. L'alias `aussi` doit donc porter la classe, pas seulement
  le micro — à vérifier au moment du branchement Supabase.
- **Lot B** : ⛔ **`entier_lire_ecrire` n'est PAS produit.** L'ancienne vidéo `6e-entier-nombre`
  (« Comprendre les nombres entiers en 4 minutes » + son short « Un zéro, ça ne vaut rien… ») est en ligne et
  la couvre. On la garde, on produit autour, on ne la touche pas et on ne la dépublie pas.
  `entier_comparer` et `entier_decomposer` existent aussi au lot A : en 6e ce sont des **vidéos à part**
  (autre notionId, autres lignes de coach), on ne les mutualise pas avec le CM.
- Nommage des fichiers : `eleveai-maths-<classe>-<notion-micro en tirets>` (ex.
  `eleveai-maths-cm1-entier-lire`, `eleveai-maths-6e-entier-rang`). ⚠️ `eleveai-maths-6e-entier-nombre` est
  **déjà pris** par l'ancienne vidéo : les 5 épisodes du lot B portent le **micro** dans leur nom.

---

## 2. Inventaire des banques, micro par micro (générateurs EXÉCUTÉS, pas lus)

Méthode : les trois banques ont été importées et **chaque gabarit tiré 3 fois** (script jetable
`.tmp-dump-entiers.ts`, non suivi par git). **0 erreur de générateur** sur les trois banques.
Fichiers : `lib/tutor-v4/questionBank/cm1/maths/nombres-entiers.bank.ts`,
`.../cm2/maths/nombres-entiers.bank.ts`, `.../6e/maths/entiers.bank.ts`.

⚠️ `grep microId` ne compte que les items **littéraux** : au CM1 il annonce 10 items par micro, alors que la
banque contient en plus 8 à 11 **gabarits** par micro (les « gabarits du 14/11/2026 »). C'est l'exécution qui
donne le vrai contenu.

### Lot A — CM1 et CM2, notion `nombre_entier`

| Micro | CM1 : items | CM2 : items | Bornes CM1 | Bornes CM2 |
|---|---|---|---|---|
| `entier_lire` | 9 fixed + 9 gabarits | 3 fixed + 11 gabarits | jusqu'à 6 chiffres (999 999) | **millions et milliards** (3 212 155 002) |
| `entier_comparer` | 8 fixed + 8 gabarits | 3 fixed + 8 gabarits | jusqu'à 6 chiffres | **jusqu'aux milliards** (4 935 875 779) |
| `entier_decomposer` | 8 fixed + 9 gabarits | 3 fixed + 8 gabarits | jusqu'à 6 chiffres | **jusqu'aux milliards** (6 500 625 185) |
| `entier_arrondir` | 8 fixed + 9 gabarits | 3 fixed + 9 gabarits | dizaine → dizaine de mille | **centaine de mille et million** (986 945 955) |
| `entier_multiple` | 8 fixed + 10 gabarits | 3 fixed + 10 gabarits | tables de 2 à 10, multiples de 10 et 100 | **critères par la somme des chiffres (3, 9)**, multiples de 12, 20, 25, 50, 1 000 |
| `entier_defi` | 7 fixed + 11 gabarits | 3 fixed + 10 gabarits | 4 à 6 chiffres | **millions** ; « juste après 6 999 999 » ; ajouter 100 000 |

**A1 · `entier_lire`** — ce que la micro demande vraiment : écrire en chiffres un nombre dicté en lettres ;
le lire dans l'autre sens ; trouver le **chiffre** d'un rang dans le tableau de numération ; distinguer le
**chiffre** des dizaines du **nombre** de dizaines (29 404 → 2 940 dizaines) ; compter les zéros à écrire ;
classes de trois chiffres. Leurres typiques : oublier le zéro d'une classe (« douze mille trente » → 1 230),
le mettre au mauvais rang (12 300), en ajouter un (120 030), donner le chiffre au lieu du nombre.
Dessins de la banque : `tableau_donnees` (classe des mille | classe des unités).

**A2 · `entier_comparer`** — compter d'abord les chiffres, puis comparer de gauche à droite jusqu'au premier
chiffre différent ; les signes `<`, `>`, `=` ; ordre croissant et décroissant sur 3 ou 4 nombres ; comparer
une écriture en lettres à une écriture en chiffres ; chiffre caché (`16 ▢01 > 16 801`) ; situations (bouchons
d'une classe, kilomètres d'un camion, abonnés). Leurres typiques : un nombre **plus court** qui commence par
un chiffre plus grand (9 876 contre 10 234), comparer par la fin, une liste rangée à l'envers.
Dessins : `tableau_donnees`. Au CM2 s'ajoute la comparaison de longueurs différentes (8 chiffres contre 7) et
« quel nombre se place entre 2 000 000 et 3 000 000 » (`number_line`).

**A3 · `entier_decomposer`** — donner la valeur de chaque chiffre (4 582 = 4 000 + 500 + 80 + 2) ; **ne pas
écrire** le rang vide (7 306 = 7 000 + 300 + 6) ; composer dans l'autre sens (20 000 + 400 + 9) ; la valeur
d'UN chiffre (dans 405 210, le 5 vaut 5 000) ; l'écriture multiplicative (3 × 1 000 + 4 × 100 + 2 × 1) ;
« 1 unité de mille, 4 dizaines, 9 unités » → 1 049 ; termes **en désordre** (70 + 5 000 + 800).
Leurres typiques : décaler d'une colonne (5 000 + 600 + 4), écrire 50 au lieu de 5 pour le dernier chiffre,
remplacer un millier par une centaine (400 + 500 + 80 + 2). Dessins : `tableau_donnees`.

**A4 · `entier_arrondir`** — encadrer d'abord, puis regarder **le chiffre juste à droite** du rang visé
(0 à 4 on garde, 5 à 9 on monte) ; arrondir à la dizaine, à la centaine, au millier, à la dizaine de mille ;
« plus proche de 850 ou de 860 ? » avec le milieu ; le problème inverse (« quel nombre devient 4 200 ? »).
Leurres typiques : **tronquer** au lieu d'arrondir (4 682 → 4 600), arrondir au mauvais rang (4 680),
monter d'un rang de trop (5 000), proposer « il est juste au milieu » quand il ne l'est pas.
Dessins : `number_line`.

**A5 · `entier_multiple`** — un multiple de k, c'est k × un entier ; oui/non dans une table ; l'intrus ;
les multiples de 2, 10 et 100 reconnus au dernier chiffre ; le multiple juste après (ou juste avant) un
nombre ; des paquets pleins **sans reste**. Leurres typiques : un voisin du multiple (63/65/67), un nombre
d'une autre table, un nombre qui finit par 5 pris pour un multiple de 10.
Dessins : `tableau_donnees` (table de k en ligne), `number_line`, `schema_barre` (les paquets).
Au CM2 s'ajoutent **les critères de divisibilité par 3 et par 9** (somme des chiffres) et les multiples de
12, 20, 25, 50 et 1 000.

**A6 · `entier_defi`** — le nombre mystère (intervalle + multiple + un chiffre d'un rang) ; une division en
paquets avec ou sans reste ; le plus grand / le plus petit nombre avec 4 étiquettes (⚠️ **jamais zéro
devant**) ; l'écart jusqu'au nombre rond suivant (49 493 → 50 000) ; un code secret par indices de rang ;
un classement à 4 lignes. Leurres typiques : un nombre hors de l'intervalle, un multiple de 10 mal placé,
un nombre à 3 chiffres parce qu'on a mis le 0 devant, l'écart calculé à 100 près.
Dessins : `number_line`, `tableau_donnees`, `schema_barre`.

### Lot B — 6e, notion `entier_nombre`

| Micro | Items | Bornes | Produit ? |
|---|---|---|---|
| `entier_lire_ecrire` | 6 fixed + 2 gabarits | jusqu'à 2 979 | ⛔ **NON** (ancienne vidéo `6e-entier-nombre`) |
| `entier_rang` | 8 fixed + 4 gabarits | jusqu'à 915 843 | oui (B1) |
| `entier_comparer` | 8 fixed + 5 gabarits | jusqu'à 17 350 | oui (B2) |
| `entier_decomposer` | 8 fixed + 4 gabarits | jusqu'à 768 385 | oui (B4) |
| `entier_encadrer` | 8 fixed + 4 gabarits | jusqu'à 91 560 | oui (B3) |
| `entier_defi` | 8 fixed + 5 gabarits | jusqu'à 15 142 | oui (B5) |

**B1 · `entier_rang`** — lire les rangs **de droite à gauche** (unités, dizaines, centaines, unités de mille,
dizaines de mille, centaines de mille) ; donner le chiffre d'un rang ; donner **le rang d'un chiffre**
(« dans 85 676, à quel rang est le 7 ? ») ; un zéro occupe un rang (7 305 → dizaines = 0) ; situations
(altitude d'un avion, écoutes d'une chanson). Leurres typiques : compter de gauche à droite, prendre le rang
voisin, croire qu'un zéro « ne compte pas ». Pas de canvas dans cette banque.

**B2 · `entier_comparer`** — compter les chiffres, puis comparer de gauche à droite ; `<` et `>` ; le plus
grand / le plus petit parmi 4 ; l'ordre croissant ; situations (sauts en longueur, pas du jour, minutes de
piano, coureurs). Leurres typiques : **s'arrêter au dernier chiffre** (1 408 pris pour plus grand que 1 480),
comparer le mauvais rang (13 547 contre 12 647), une liste rangée à l'envers.

**B3 · `entier_encadrer`** — encadrer entre deux dizaines / centaines / milliers **consécutifs** ; la dizaine
juste avant, juste après ; le lien avec l'arrondi (47 → 50) ; situations (compteur de vélo, altitude d'une
montagne, ballons vendus). Leurres typiques : des bornes **non rondes** (9 611 et 9 621), le rang voisin
(9 600 et 9 610), un encadrement trop large (300 et 500), le nombre lui-même et son suivant (47 et 48).

**B4 · `entier_decomposer`** — la valeur d'un chiffre (dans 352, le 5 vaut 50) ; la décomposition avec un
rang vide (507 = 500 + 7) ; composer, y compris **en désordre** (500 + 90 + 3 + 8 000) ; des totaux de points
de jeu (30 000 + 2 000 + 600 + 50 + 9). Leurres typiques : décaler d'un rang (700 + 60 pour 706),
tout descendre d'un cran (70 + 6), confondre 50 000 et 500 dans un nombre à deux 5 (55 140).

**B5 · `entier_defi`** — écrire un nombre à partir de ses rangs ; le **complément** à un nombre rond
(865 + ? = 870 ; 1 041 + ? = 2 000) ; le plus grand / le plus petit nombre avec des chiffres donnés
(⚠️ jamais zéro devant) ; le nombre mystère par indices de rang, avec un double ou un triple.
Leurres typiques : le complément à 10 près, un 0 placé devant, deux chiffres échangés (3 065 pour 3 056).

---

## 3. Les deux écarts relevés

### a) ✅ TRANCHÉ EN DEUX TEMPS — le CM2 va plus loin que le CM1 sur **les six** micros du lot A

> ✅ **Décision de Frédéric, 21/11, en deux temps.**
> 1. « Oui, garde-le » : l'écran `07-cm2` reste et le micro reste **mutualisé CM1 + CM2** sur CINQ
>    micros — `entier_lire`, `entier_comparer`, `entier_decomposer`, `entier_arrondir`, `entier_defi`.
> 2. ⛔⛔ **SAUF `entier_multiple`**, qui se sépare : `cm1-entier-multiple` perd l'écran et redevient
>    CM1 seul, `cm2-entier-multiple` est une vidéo à part. Pas de `aussi` sur ce micro.
>
> ⛔ Ne pas rouvrir la question pour les cinq autres à la prochaine relève.

La mutualisation a été décidée parce que les deux banques se ressemblaient : « trois mille deux cent
quarante » au CM1, « cinq mille deux cent quarante » au CM2, même énoncé, mêmes leurres, même explication.
**C'est exact pour les 3 items `fixed` de chaque micro du CM2.** Mais les **8 à 11 gabarits** ajoutés le
14/11 montent d'un cran partout : millions et milliards pour lire, comparer et décomposer ; arrondi au
million ; critères de divisibilité par 3 et par 9 ; défis à 7 chiffres.

Ce qui a été fait, et **validé** : **chaque paysage du lot A porte un écran `07-cm2`** qui ouvre ce cran de
plus (la classe des millions, ou le critère de divisibilité pour les multiples), suivi d'une question-pause
prise dans la banque du **CM2**. La vidéo couvre donc ce que les deux banques demandent, et reste utilisable
telle quelle au CM1 — l'écran est annoncé (« Et au CM2… »).

### b) La 6e demande des nombres **plus petits** que le CM, pas plus grands

Le brief annonçait « en 6e, nombres plus grands ». À l'exécution, c'est l'inverse : la banque 6e
`entiers.bank.ts` plafonne à 5 ou 6 chiffres (17 350 pour comparer, 91 560 pour encadrer, 15 142 pour le
défi), alors que le CM1 va à 6 chiffres et le CM2 aux milliards. La banque 6e est une banque de **reprise**,
plus légère, avec deux micros que le CM n'a pas (`entier_rang`, `entier_encadrer`).
**Le découpage ne change pas** : notion différente (`entier_nombre`), lignes de coach différentes, deux
micros propres → cinq vidéos à part, comme décidé. Mais il faut le savoir pour la suite : si un jour on veut
mutualiser dans l'autre sens, ce serait la 6e qui recevrait les vidéos du CM, pas l'inverse.

---

## 4. Les métiers (matrice métiers, `lib/matrice/`)

`npx tsx scripts/metiers-pour-video.ts <classe> <notion>` ne donnait que **3 métiers** par notion, aucun
marqué « déjà en vidéo ». Il en fallait 11, un par épisode. Ce qui a été fait :

- **Lot A** : ⚠️ `nombre_entier` au CM renvoyait à la famille `P_nombres`, **partagée avec le CP, le CE1, le
  CE2 et les notions `suite*`**. Y poser `V` aurait annoncé « déjà en vidéo » à des classes qui n'ont aucune
  vidéo. On a donc créé une famille **`P_nombres_cm`** (`lib/matrice/metiers-familles.ts`) : les 3 liens de
  `P_nombres` recopiés (factrice, bibliothécaire, fleuriste) + 3 neufs (cartographe, imprimeur,
  météorologue), les 6 marqués `V`, et un renvoi `nombre_entier → P_nombres_cm` pour `cm1` et `cm2`
  seulement. ✅ Vérifié : le CP, le CE1 et le CE2 gardent `P_nombres` **sans aucun `V`**.
- **Lot B** : 4 liens ajoutés à `METIERS_6E.entier_nombre` (`lib/matrice/metiers-college.ts`) — contrôleuse
  aérienne, guide de haute montagne, game designer, volcanologue — et `V` posé sur l'astronome (B2) et sur
  les 4 neufs. `journaliste` et `comptable` restent **sans `V`** : le comptable (« écrire en chiffres et en
  lettres ») accompagne l'ancienne vidéo `entier_lire_ecrire`, qu'on ne refait pas.
- Aucun métier neuf au catalogue : les 11 existaient déjà dans `lib/matrice/metiers-catalogue.ts`.
- Équilibre : **6 femmes / 5 hommes**. Un seul contexte réunionnais sur 11 (Maya, volcanologue au Piton de la
  Fournaise) ; la matrice reste à 7 liens 974 sur 1 612, soit 0,4 %.
- `npx tsx scripts/verifier-metiers.ts` → ✅ **Matrice métiers complète** (toutes les notions couvertes,
  54 % de filles au CM1, au CM2 et 56 % en 6e, 124 métiers du catalogue tous montrés).

⚠️ Pour la série SUIVANTE : ces 11 liens sont maintenant marqués `V`, donc
`metiers-pour-video.ts cm1 nombre_entier` les affichera tous « déjà en vidéo ». Il faudra en ajouter.

---

## 5. Les centres d'intérêt

Liste **FERMÉE** `lib/videos/centres-interet.ts`, 1 à 3 par vidéo, **vérifiés par âge** : CM1, CM2 et 6e sont
tous dans la tranche **9-11**, donc ⛔ pas de `reseaux-sociaux`, `cinema-series` ni `argent-budget` (12-14
ans seulement). Les sujets viennent de la réserve `manim/centres-interet-par-age.md`, ligne 9-11 (« sport en
club, jeux vidéo, animaux, espace, records, collections, cuisine, premiers défis » ; ton « défi, record,
surprise, vrai ou faux ? »).

Centres retenus, variés d'un épisode à l'autre : histoire-geographie ×2, technologie-ia ×2, sciences ×3,
nature-ecologie ×2, jeux-defis ×2, art-design ×2, transports ×2, meteo-climat, espace, sport, jeux-video.

Le contrôle est **intégré au script des voix** (`centres_hors_tranche()`) : il relit la liste fermée et la
tranche de chaque classe, et refuse tout centre hors tranche **avant** qu'une voix soit écrite. Résultat :
**0 centre hors tranche** pour les 11 épisodes.

⚠️ `node scripts/verifier-centres-age.mjs` lit les **manifestes**, et cette série n'y est pas encore. Lancé
tel quel aujourd'hui, il affiche **176 centres hors tranche** sur 1 020 vidéos — tous **antérieurs** à cette
série (60 en 6e, 26 au CM2, 21 au CE2, 19 en première, 17 au CM1, 14 en 4e, 11 au CP…), plus
`ce2-masse-unites` qui déclare `bateaux`, un id **absent de la liste fermée**. Ce n'est pas notre série, et
rien de tout ça n'a été touché (⛔ rien en dehors des vidéos ce week-end). **À signaler à Frédéric** : tant
que ces 176 écarts sont là, le « 0 centre hors tranche » ne peut être affirmé que série par série, pas
globalement.

---

## 6bis. ✅ PRODUCTION LANCÉE (Frédéric, 21/11 : « Oui, lance la prod »)

| Étape | État |
|---|---|
| Les 22 JSON de voix (`manim/voix/<id>.json`) | ✅ écrits (`--ecrire`) |
| WAV Julie, débit −6 | ✅ **253 fichiers** dans `public/sons/<id>/` (16 par paysage, 7 par short) |
| Marques mot à mot des 11 paysages | ✅ **2 860 marques**, 16 écrans chacun, 0 écran sans marque |
| `manim/scripts/cm1/entier_commun.py` | ✅ le commun de la série (tableau par classes, droite graduée, 11 personnages, 2 bases) |
| A1 `entier_lire.py` — script + dry run | ✅ 0 AUDIT-AVANCE, 0 RETARD, 0 BORD ; durée 3 min 00 |
| A1 — aperçu `-ql` + planche des 12 écrans | ✅ relus, 3 défauts corrigés |
| **A1 — rendu HD** | ✅ `manim/sorties/cm1/maths/entiers/01-lire/`, 15,4 Mo, 3 min 11, **0 instant qui touche un bord**, planche HD relue (identique à celle du `-ql`), fraîcheur prouvée sur les 3 points |
| A1 — short Ti Margo, miniatures, publication | ⏳ |
| A2 `entier_comparer.py` — script + dry run | ✅ 0 AUDIT-AVANCE, 0 RETARD, 0 BORD ; durée 3 min 25 |
| A2 — aperçu `-ql` relu | ✅ |
| **A2 — rendu HD** | ✅ `manim/sorties/cm1/maths/entiers/02-comparer/`, 3 min 36, **0 bord**, planche HD relue (13 écrans) |
| Série Ti Margo `cm1-entier` (json, commun, cues) | ✅ `prototypes/ti-margo/films/cm1-entier*.js` |
| A1 et A2 — shorts Ti Margo | ✅ 58,0 s et 62,7 s, planches relues, **compteurs contrôlés** |
| A1 et A2 — chaîne de publication | ✅ complète (voir ci-dessous) |
| **A3 `entier_decomposer`** | ✅ script, dry run propre, `-ql` relu (4 défauts corrigés), short 62,2 s relu |
| A4 → A6, A5′, B1 → B5 (9 épisodes) | ⏳ |

### ⛔ A3 : quatre défauts, et deux qui ne se voyaient QU'À L'IMAGE

1. **AUDIT-AVANCE de 0,96 s** (09b-correction) : la ligne entière arrivait sur son PREMIER mot, donc
   le « 5 » s'écrivait avant d'être dit. Chaque morceau attend SON mot, et le second extrait commence
   PAR le nombre (`au_mot("5. Il vaut")`). C'est le piège n° 4, payé une deuxième fois.
2. ⛔⛔ **`col()` écrit dans la colonne de DROITE.** Les quatre tableaux étaient posés à x = +2,2,
   donc DANS cette colonne : les phrases s'écrivaient par-dessus les cases, sur quatre écrans.
   Le dry run était parfaitement propre. **Les figures vont à GAUCHE (x ≈ −3,4)**, comme dans A1 et A2.
3. **BORD mesuré** : la somme corrigée partait à x = −7,1 (marge de 3 % : −6,68) → elle passe en bas,
   sur toute la largeur.
4. **Un libellé plus large que sa colonne touche son voisin** : « 4 000 » (5 caractères) collait à
   « 500 » — « 4 000500 ». Les quatre valeurs sont posées **en QUINCONCE**, deux hauteurs qui
   alternent : plus aucune ne peut toucher sa voisine, quelle que soit sa longueur.

⭐ **Le commun gagne `au_t(t)`** : attendre un instant LU DANS LE WAV, pour les 29 nombres à espace de
la série qui n'ont pas de marque. « 4 000 » de l'écran 02 est dit à **5,64 s**, relevé sur l'énergie
du WAV (recette dans le prompt de relève). ⛔ A1 et A2, déjà rendus, ne l'appellent pas.

⚠️ **La planche saute parfois un écran** : elle en a détecté 11 sur 12 (02-valeur manquait), et c'est
justement celui qui portait deux des quatre défauts. Comparer son compte aux lignes `ECRAN` du log,
et extraire à la main ceux qui manquent.

### ✅ A1 et A2 sont FINIS, publication comprise (21/11, 12 h 30)

- **Shorts Ti Margo** : série `cm1-entier` (`cm1-entier.json`, `cm1-entier.js`, `cm1-entier-cues.js`,
  un fichier par film). A1 « Où va le neuf ? » 58,0 s, A2 « 987 ou 1 002 ? » 62,7 s, ceinture
  BLANCHE toutes les deux. Planches des films relues image par image.
- ✅ **Compteurs contrôlés sur le FILM rendu, pas sur le source** :
  A1 absent à 28,2 s, plein à 28,4, 2/3 à 29,4, 1/3 à 30,4, presque vide à 31,2, disparu à 31,4 ;
  A2 absent à 28,6, plein à 28,9, 2/3 à 29,9, 1/3 à 30,9, presque vide à 31,6, disparu à 31,9.
  Dans la carte, au-dessus de « Mets pause », rien dessus, pas de saut.
- **Registres neufs** : `manim/miniature_entier.py` (miniatures des paysages) et
  `manim/passe_entier.py` (temps, questions, manifeste). Dates **13 et 14/06/2027** — la file
  s'arrêtait au 12/06 ; 1 short par jour.
- ⚠️ **Titre YouTube de A1 raccourci** : « Lire ET ÉCRIRE les grands nombres » faisait 103
  caractères avec le reste du gabarit → « Lire les grands nombres » (93).
- Miniatures : paysages (`miniature_entier.py`), shorts au **gabarit A**
  (`scripts/miniatures-shorts-grille.json` + `miniatures-shorts-grille.py`, mention « Dessin animé »,
  tout entre y = 215 et 1700). Fiche YouTube, vignettes, R2 (9 fichiers par épisode),
  `videos-r2` + bilans (nos 4 clés seulement, via `outils-commit-cles.py`).
- ✅ **Coach vérifié À L'IMAGE, en partant de l'accueil** (serveur `eleveai-4`, port 3400) :
  **8 lignes `notion_ressources`** écrites et relues en base (4 au CM1 + 4 au CM2 par l'alias
  `aussi`). ⭐ L'alias porte bien la CLASSE : le coach CM1 **et** le coach CM2 montrent « ▶ Vidéo »
  et le short sur les micros 1 et 2, et sur aucune autre. La page `/video/cm1-entier-lire` lit bien
  le MP4 sur R2 (1920 × 1080, 191,8 s, aucune erreur de lecture).

### ⛔ UN 5ᵉ DÉFAUT, trouvé À L'IMAGE sur le HD de A2 : la coche touche le libellé

Le premier HD de A2 était propre partout — sauf l'écran 08, où le ✓ de la bonne réponse touchait le
dernier chiffre : « 3 045, 3 405, 3 450✓ », **écart 1 px** (mesuré par `verifier-coche-carte.py`,
puis regardé à l'image). ⚠️ `BORDS=1` ne voit rien : rien ne sort du cadre. C'est le défaut connu de
`manim/REGLES.md` (« La coche ✓ des questions-pauses »), qui n'était jamais arrivé dans cette série
parce que A1 n'a que des libellés courts.

Le remède est maintenant **dans le commun de la série** : `_CocheAuBout` (`entier_commun.py`), hérité
par `PaysageEntierCM1` et `PaysageEntier6e` — les 9 épisodes suivants l'ont donc d'office.
Il rétrécit le libellé à `largeur − 1.0` **seulement s'il dépasse**, et imprime une ligne
`COCHE-RESERVE` à chaque fois.

- ⭐ **A1 n'a pas été re-rendu, et c'est MESURÉ, pas supposé** : son dry run avec la surcharge affiche
  **0 ligne `COCHE-RESERVE`** → aucun de ses libellés ne bouge, son MP4 de 15,4 Mo reste la bonne image.
  (A2, lui, en affiche 4 : les trois listes de l'écran 08 et « les deux sont égaux » de l'écran 06.)
- ⛔ Ne pas porter ce remède dans `contenance_cm1_commun.py` : il sert à la série CM1 contenance, finie
  et rendue — on ne modifie pas le source d'un script déjà rendu.

⚠️ **A2 : trois défauts trouvés au dry run et corrigés** — (1) deux **AUDIT-AVANCE** dans la
correction (« 38. » 1,05 s et « 6. » 0,41 s avant la voix) : la ligne entière arrivait sur le
PREMIER mot de l'extrait, chaque nombre attend maintenant SON mot ; (2) la ligne de question
« 12 408 et 12 804 : » partait à x = −6,7 → coupée en trois lignes courtes, sans changer un mot ;
(3) deux figures `duel()` débordaient (−6,69 et −6,85) → **mesurées** avant correction, pas estimées.
⛔ `BOIS` n'existe PAS dans notre chaîne d'import (il vient du commun des Masses) : écrire la couleur.
⚠️ Un 4ᵉ défaut, vu seulement à l'image : sur l'écran `07-cm2`, la 2ᵉ ligne de chiffres était décalée
vers le bas sans ses cases, donc écrite **sous** le tableau — on descend une COPIE des cases avec elle.

✅ **Vérifié à la mesure, pas à l'œil : l'espace fine insécable n'est PAS un sous-mobjet.**
`Text("8 706")` a 4 sous-mobjets pour 4 chiffres, `Text("386 378")` en a 6 pour 6 chiffres. Les
encadrés posés par index (`t[0:2]`, `t[2]`) tombent donc sur les bons chiffres — les écrans 03 et 09b
de A2 paraissaient douteux sur la planche, ils sont justes. ⭐ À retenir pour les 9 épisodes suivants :
indexer un nombre à espace par position de chiffre fonctionne.

- **Outils neufs** : `entier_marques.py` (marques, prend la CLASSE en argument),
  `entier_commun.py` (le commun). ⛔ Tous deux sont des **COPIES** et non des imports de la série
  Masses ou Périmètre : le poste 1 reprend les Masses ce week-end, et un commun partagé ferait bouger
  nos rendus sous nos pieds (REGLES.md, « le SOURCE n'est pas le RÉSULTAT »).
- ⚠️ **Le piège du lot, confirmé à l'usage** : les nombres à espace. Trois conséquences réelles —
  (1) à l'écran il faut l'espace **fine insécable** (`ESP` / `nb()` dans `entier_commun.py`), sinon
  Manim coupe le nombre en deux mots qui ne s'alignent plus ; (2) l'audit sort
  « AUDIT-ABSENT 29404 » pour ces nombres et **ne les vérifie pas** → contrôle à l'image obligatoire ;
  (3) WinRT pose **deux** frontières de mot sur un sigle lettres+chiffre (« CM2 ») — fausse alerte
  « introuvable » corrigée dans `entier_marques.py`.
- ⚠️ **Deux défauts réels trouvés au dry run de A1 et corrigés** : le tableau de l'écran final sortait
  à x = −6,9 (marge de 3 % : −6,68) → `larg=0.58` ; et le tableau de l'écran 02 arrivait **0,58 s**
  après son mot (toléré : 0,4 s) parce que deux `au_mot` se suivaient à 0,6 s d'intervalle → le bloc et
  le tableau arrivent maintenant ensemble, au premier mot.

### ⚠️ Les 29 nombres à espace SANS marque — à lire avant d'écrire chaque script

Un nombre dit deux fois dans la même voix, ou repris dans une liste de choix, n'a pas toujours de marque
sur son premier groupe de chiffres. `au_mot("3 045")` échoue alors silencieusement : il faut lire
l'instant dans le WAV (`au_t(t)`) ou s'accrocher au mot d'à côté. Relevé automatiquement :

| Voix | Sans marque | Lesquels |
|---|---|---|
| `cm1-entier-lire` | 0 | — |
| `cm1-entier-comparer` | 10 | 04-question « 12 804 » ; 08-question « 3 045 » ×2, « 3 405 » ×3, « 3 450 » ×3 ; 09-defi « 389 378 » |
| `cm1-entier-decomposer` | 1 | 02-valeur « 4 000 » |
| `cm1-entier-arrondir` | 1 | 02-encadrer « 4 700 » |
| `cm1-entier-multiple` | 0 | — |
| `cm1-entier-defi` | 1 | 04-question « 6 100 » |
| `6e-entier-rang` | 0 | — |
| `6e-entier-comparer` | 11 | 08-question « 3 045 » ×2, « 3 405 » ×2, « 3 450 » ×2 ; 09-defi « 6 024 », « 6 023 », « 6 032 » ; 09b-correction « 6 023 », « 6 024 » |
| `6e-entier-encadrer` | 5 | 05-rang « 9 620 » ; 06-question « 9 620 », « 9 621 », « 9 610 » ; 08-question « 5 300 » |
| `6e-entier-decomposer` | 0 | — |
| `6e-entier-defi` | 0 | — |

Ce sont les écrans de QUESTION qui concentrent le problème : les trois choix reprennent les mêmes
nombres, et WinRT ne pose qu'une marque pour toute la série. ⭐ Les choix d'une question sont posés par
`question_gauche`, qui ne passe pas par `au_mot` : en pratique seuls `02-valeur`, `02-encadrer`,
`05-rang` et les `09-defi` / `09b-correction` demandent un `au_t()`.

## 6. Ce qui reste à faire (après le « oui » de Frédéric)

Par épisode, dans l'ordre de `manim/REPRISE-masses-cp-cm2.md` :

1. `python manim/scripts/cm1/entier_voix.py --ecrire` → `manim/voix/<id>.json` (22 fichiers).
2. WAV Julie : `scripts/generer-voix.ps1 -Debit -6`, puis les marques
   (`perimetre_marques.py entier:<slug>:<classe>`).
3. Script Manim `manim/scripts/cm1/entier_<slug>.py` (et `manim/scripts/6e/` pour le lot B) sur le modèle de
   `masse_cp_defi.py` ; dry run AUDIT (0 RETARD, 0 AUDIT-AVANCE, BORDS sans alerte) ; aperçu `-ql` + planche ;
   **un seul** rendu HD sous verrou ; `verifier-bords-video.py` ; planche finale.
4. Short Ti Margo : séries `cm1-entier` et `6e-entier` à créer (`prototypes/ti-margo/films/`), socles
   `cm1-commun.js` et `6e-commun.js` **déjà présents** ; compteur contrôlé AVANT chaque film.
5. Miniatures (paysage + short « Dessin animé », gabarit A), manifeste (dates après la dernière de la file,
   ⛔ 3 shorts/jour au plus), fiche YouTube, vignettes, R2, `videos-r2`, coach + Supabase
   `notion_ressources` (⚠️ lot A : **2 lignes par épisode**, cm1 + alias `aussi` cm2).
6. ⭐ **Le coach se vérifie à chaque épisode** (Frédéric, 21/11) : banque, `notionId`/`microId`, générateurs
   exécutés, ligne en base, vidéo visible sur la micro visée — en partant de l'accueil, pas d'une URL
   `?classe=` (qui ment sur la visibilité).

### Pièges déjà payés, à relire avant d'écrire les scripts Manim
De `manim/REPRISE-masses-cp-cm2.md` : `au_mot` prend la **dernière marque AVANT** l'extrait (toujours
commencer l'extrait par le nombre) ; un mot sans marque se lit dans le WAV (`au_t(t)`) ; `base_commune()`
remet les chiffres coupés sur une même ligne de base **et saute les lettres à jambage** (g j p q y) ;
`_q_mots`, `_q_apres` et `_ph_mots` pour caler une ligne de question ou de réponse sur SON mot ; les choix
longs rétrécissent seuls → `_disposer_q` ; « Mets pause, et cherche ! » frôle Ti Margo ; l'audit dit
« AUDIT-ABSENT » pour tout nombre à espace (`1 000`) sans le vérifier. Côté short : écrire `1 000` avec une
**espace insécable** dans `voixDe`, `mot()` ne trouve qu'**un** mot seul, et deux marques identiques de suite
veulent le même `a0(...)` sans `deuxAuPlusM`.
⚠️ Cette série est pleine de nombres à espace (12 030, 70 000 957, 6 999 999…) : c'est **le** piège du lot.
