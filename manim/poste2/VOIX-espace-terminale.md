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
- Un épisode = 14 clips, le gabarit de la terminale (`convexite_derivee_seconde`) :
  `00-garde`, `01-situation`, `02-idee`, `03-theoreme`, `04-question`, `04b-reponse`,
  `05-appliquer`, `06-piege`, `07-question`, `07b-reponse`, `08-rediger`, `09-defi`,
  `09b-correction`, `10-finale`, `11-abonne`.
- ⭐ **Trois lignes de question au MAXIMUM à l'écran** : à quatre, les cartes de choix
  descendent sur Ti Margo et lui coupent la tête (piège n° 33 de la série des entiers).
- ⭐ **Une question dit à l'écran exactement ce que la voix dit, mot pour mot.**
- ⛔ Chaque nombre dit dans une CORRECTION ou dans la FINALE est enseigné : c'est là qu'on
  relit en premier (voir la passe maths de chaque épisode, plus bas).

---

# E1 · `terminale-espace-vecteurs`

**Micro** : `espace_vecteurs` — Manipuler des vecteurs dans l'espace (notion `geometrie_espace`).
**Métier / centre** : Nadia, pilote de drones de chantier — centres `technologie-ia`, `metiers`.
**Code couleur** : ambre = ce qu'on regarde, bleu = le vecteur u, rose = le vecteur v,
vert = juste, rouge = le piège.

- **00-garde** : Vecteurs dans l'espace. Dans le plan, deux nombres suffisent pour placer un point. Dans l'espace, il en faut trois. Et tout le reste ne change pas.
- **01-situation** : Voici Nadia. Elle pilote des drones qui cartographient un chantier. Pour placer un drone, elle donne trois nombres : combien vers la droite, combien en profondeur, combien en hauteur. Trois nombres, un point. Et pour aller d'un point à un autre, il y a un vecteur.
- **02-idee** : Un vecteur de l'espace a trois coordonnées. Pour le vecteur A B, on fait arrivée moins départ, coordonnée par coordonnée. Si A a pour coordonnées 1, 2, 3 et B a pour coordonnées 4, 6, 3, alors le vecteur A B a pour coordonnées 3, 4, 0. Ce zéro dit que B est exactement à la même hauteur que A.
- **03-theoreme** : Toutes les règles du plan tiennent encore. On additionne deux vecteurs coordonnée par coordonnée. On multiplie un vecteur par un nombre en multipliant ses trois coordonnées. Et deux vecteurs sont colinéaires quand l'un est un multiple de l'autre.
- **04-question** : Question ! A a pour coordonnées 2, 1, 0, et B a pour coordonnées 2, 1, 5. Que valent les coordonnées du vecteur A B ? A : 0, 0, 5. B : 4, 2, 5. C : 0, 0, 1. Mets pause, et choisis !
- **04b-reponse** : Réponse A. 2 moins 2 fait 0, 1 moins 1 fait 0, et 5 moins 0 fait 5. Le vecteur A B est vertical : A et B sont l'un au-dessus de l'autre. La réponse B, c'est la somme des coordonnées, pas la différence.
- **05-appliquer** : Appliquons. Le vecteur u a pour coordonnées 1, 2, moins 1. Le vecteur v a pour coordonnées 3, 0, 2. La somme u plus v a pour coordonnées 4, 2, 1. Et le double de u a pour coordonnées 2, 4, moins 2.
- **06-piege** : Voilà le piège ! Dans le plan, deux vecteurs non colinéaires suffisent à tout construire. Dans l'espace, il en faut trois. Deux vecteurs non colinéaires n'engendrent qu'un plan. Trois vecteurs peuvent très bien être deux à deux non colinéaires et rester tous dans un même plan : on dit alors qu'ils sont coplanaires.
- **07-question** : Question ! Le vecteur u a pour coordonnées 1, 2, 3, et le vecteur v a pour coordonnées 2, 4, 6. Que peut-on dire ? A : ils sont colinéaires. B : ils ne sont pas colinéaires. C : on ne peut pas savoir. Mets pause, et choisis !
- **07b-reponse** : Réponse A. 2 égale 2 fois 1, 4 égale 2 fois 2, et 6 égale 2 fois 3. Le même facteur 2 pour les trois coordonnées : le vecteur v égale 2 fois le vecteur u. Il faut que ce soit le même facteur partout — un seul écart, et les vecteurs ne sont plus colinéaires.
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
