# Objets et animaux dessinés au coach du CM1, du CM2 et de la 6e ?

Étude du 14/11/2026, sans toucher au code. Question de Frédéric : faut-il
mettre au CM1, au CM2 et en 6e les objets et animaux dessinés du CP-CE2,
puisque « ce sont encore des enfants » ?

## 1. Le constat chiffré

Mesure du 14/11 : chaque gabarit est tiré 30 fois, sur les banques du coach
telles qu'elles sont dans l'arbre de travail. Le script est celui de
`scripts/mesurer-images-cycle2.ts`, étendu aux six classes.

| Classe | Énoncés tirés | Avec un dessin | Dont objets, animaux, monnaie, base dix, personnage |
|---|---:|---:|---:|
| CP  |  7 971 | **76 %** | **38 %** |
| CE1 | 10 856 | 61 % | 15 % |
| CE2 | 15 229 | 64 % | 7 % |
| CM1 | 54 720 | 66 % | **0,8 %** |
| CM2 | 45 034 | 60 % | **0,5 %** |
| 6e  | 37 690 | **33 %** | **0,0 %** |

Par étoile, la part d'énoncés avec un dessin est la suivante :
- CM1 : 62 à 69 %, régulier ;
- CM2 : 49 % à ★1, contre 71 % à ★4-★5. Le début de notion est le moins dessiné ;
- 6e : 36 % à ★1, 35 % à ★2, 19 % à ★5.

Lecture des chiffres :
- **Au CM1 et au CM2, il y a beaucoup de dessins, mais ce sont des dessins
  d'adulte** : tableaux, schémas en barre, opérations posées, droites
  graduées. Les objets qu'on peut compter du doigt disparaissent
  brutalement après le CE2, de 38 % à 0,5 %.
- **La 6e est la classe la moins illustrée du primaire et du collège.**
  Ce sont pourtant ses élèves qui « ont du mal à lire ». Certaines notions
  ont 0 % de dessin :
  - `entier_nombre` ;
  - `entier_calcul_mental` ;
  - `pourcentage_nombre` ;
  - `prop_proportionnalite` ;
  - `aire_longueur`.

  D'autres restent sous 25 % :
  - `quadrilatere_propriete` : 4 % ;
  - `decimal_calcul` : 5 % ;
  - `cercle_circonscrit` : 12 % ;
  - `volume_solide` : 13 % ;
  - `decimal_nombre` : 18 % ;
  - `fraction_calcul` : 18 % ;
  - `aire_perimetre` : 19 % ;
  - `fraction_nombre` : 22 %.
- Au CM2, quelques notions ne sont presque pas dessinées :
  - `longueur` : 0 % ;
  - `pourcentage` : 1 % ;
  - `echelle` : 10 % ;
  - `proportionnalite` : 10 % ;
  - `multiplication` : 11 % ;
  - `perimetre` : 11 % ;
  - `calculs_commerciaux` : 11 % ;
  - `aire` : 22 %.
- Au CM1, les notions les moins dessinées sont celles où le comptage
  aiderait le plus :
  - `tables_multiplication` : 12 % ;
  - `multiplication` : 27 % ;
  - `probabilite` : 57 %, avec des sacs de billes souvent décrits en mots ;
  - `fraction` : 62 %, sans aucune fraction d'une collection.
- On voit souvent le cas suivant : l'énoncé décrit une collection en mots
  (« 6 boîtes de 8 crayons », « 3 billes rouges et 1 verte », « deux tiers
  de douze œufs », « 5 araignées ont 40 pattes »), mais aucun dessin ne
  l'accompagne. C'est exactement là que l'objet dessiné remplace la lecture.
- Deux manques d'outil limitent la suite :
  - le canvas `fraction` n'a pas de modèle « collection » : il ne sait faire
    que des barres, des disques et des grilles ;
  - `stat_graph` n'a pas de pictogramme.

## 2. La recommandation : oui, mais avec un dosage

**Oui pour le CM1, oui avec mesure pour le CM2, oui pour la 6e, mais
seulement quand l'objet est la donnée.** Il ne faut jamais d'objet décoratif,
et il ne faut pas d'animaux « bébé » au collège.

Le principe : **on dessine la quantité dont parle la question.** Douze œufs
dans une boîte qu'on colorie aux deux tiers, ce n'est pas infantilisant :
c'est le sens même de la fraction. Un poussin qui sourit à côté de
« 345 ou 354 ? » serait infantilisant.

Le plaisir est le second critère (section 5). Il passe d'abord par la
**réaction du dessin après la réponse**, qui ne coûte aucune lecture, et pas
par des dessins décoratifs dans l'énoncé.

Ce dosage respecte la règle du collège (★1-★2 sans contexte). Un dessin
d'objets sans prénom ni phrase n'est pas un contexte. Au contraire, il
remplace des mots : « Combien de jetons sont rouges ? » en 6 mots, plus une
image, est plus court que la phrase actuelle.

| | ★1 | ★2 | ★3 | ★4-★5 |
|---|---|---|---|---|
| **CM1** | objets et animaux à compter, environ 1 énoncé sur 3 dans les notions retenues | idem | objets dans une situation, environ 1 sur 4 | rare : schémas abstraits, le transfert |
| **CM2** | objets du quotidien « grands », environ 1 sur 4 | idem | situation dessinée (prix, plan), environ 1 sur 5 | non |
| **6e** | objets « grands » neutres comme support de la quantité, environ 1 sur 4 dans les notions retenues | idem | contexte dessiné (urne, enquête, pavage), environ 1 sur 5 | non |

Ce qu'il faut éviter :
- **les animaux de la ferme en 6e** (poussin, coccinelle, lapin, souris) :
  à 11 ans, c'est la cour de maternelle. On garde poissons, oiseaux,
  tortue marine, abeille et fourmi, mais seulement comme **données
  statistiques ou de probabilité** (comptage dans un aquarium, relevé dans
  la nature). Les espèces de La Réunion restent à environ 4 % ;
- **le dessin dans le calcul nu** (« 68 + 7 », « 645 ÷ 10 », conversions
  d'unités) : le dessin n'y apprend rien. On garde la droite graduée ou le
  tableau de conversion ;
- **la géométrie** (triangles, médiatrice, cercle circonscrit, symétrie) :
  la figure est déjà le dessin. Le manque de dessins en 6e se règle là avec
  `triangle`, `cercle` et `droites`, pas avec des objets. C'est un autre
  chantier, voir la section 5 ;
- **les grands nombres** (89 225, 1 026 perles) : 1 000 objets, ça ne se
  compte pas. On garde `base_dix` en version « milliers » au CM1, et le
  tableau de numération ensuite ;
- **le style** : tout objet en 6e est réaliste et sobre, sans visage ni yeux,
  au contrat 60 × 60 de `ObjetsCanvas`. Les animaux de `lib/canvas/animaux`
  ont des yeux : ils vont bien au CM1, moins bien en 6e.

## 3. Les notions prioritaires, dans l'ordre

Dans chaque cas, l'objet aide à comprendre. Ce n'est pas de l'habillage.

**CM1** (session `coach-cm1-cm2-micros-san` finie pour le CM1) :
1. `tables_multiplication` (12 %) et `multiplication` (27 %) : une
   **disposition rectangulaire** (« 6 rangées de 8 ») d'objets ou
   d'animaux. 6 × 8 devient visible, et la commutativité se voit en tournant
   la grille. `animauxCanvas` sait déjà le faire avec 5 colonnes : il faut
   pouvoir régler `colonnes`.
2. `fraction` → `fraction_quantite` à créer au CM1 : « 1/3 des 12 billes ».
   La collection est séparée en 3 paquets entourés, dont un est colorié.
3. `division` (`division_sens`, `division_reste`) : un partage dessiné, avec
   les objets restants mis à part. Ce sont les 19 graines en sachets de 5.
4. `probabilite` (57 %) : un sac de billes ou de jetons **toujours dessiné**,
   jamais décrit seulement en mots.
5. `proportionnalite` (63 %) : « 1 araignée → 8 pattes, 5 araignées → ? ».
   Les fiches `pattes` de la bibliothèque d'animaux sont faites pour ça.
6. `aire` (déjà à 99 %) : pavage par carreaux, déjà fait avec
   `figure_libre`. Rien à ajouter.

**CM2** : attendre la fin de la session `coach-cm1-cm2-micros-san`
(local_81855025), qui réécrit les fichiers CM2 en ce moment.
1. `pourcentage` (1 %) : **100 objets en grille 10 × 10**, dont 25 colorés,
   pour montrer que 25 % = 25 sur 100. C'est le meilleur gain de toute
   l'étude.
2. `proportionnalite` (10 %) : des lots d'objets et leur prix (3 cahiers →
   6 €), avec `monnaie` en dessous.
3. `fraction_calcul` → `fraction_quantite` (deux tiers de douze œufs) :
   modèle « collection ».
4. `echelle` (10 %) : plan dessiné avec des objets à taille réduite (table,
   lit, voiture vue de dessus). Le canvas `echelle` existe, il sert peu.
5. `calculs_commerciaux` (11 %) et `probleme` : ticket de caisse ou étiquettes
   de prix dessinés avec `monnaie`, à ★3 seulement.
6. `aire` (22 %) et `perimetre` (11 %) : carreaux et dalles. Le gain vient de
   `figure_libre` et `quadrilatere`, pas d'objets.

**6e** (règle REGLES-6E : ★1 ≤ 12 mots, ★2 ≤ 15 mots) :
1. `pourcentage_nombre` (0 %) : grille de 100 jetons ou ampoules, dont N
   colorés. Le texte de l'énoncé tombe à 6-8 mots.
2. `fraction_nombre` (22 %) et `fraction_calcul` (18 %) → `fraction_quantite` :
   collection entourée par paquets.
3. `prop_proportionnalite` (0 %) : lots d'objets (3 croissants → 4,5 €), en
   **pictogramme au-dessus du tableau**, à ★1-★2 sans phrase.
4. `stat_enquete` (33 %) et `stat_donnee` : **pictogramme** (1 dessin =
   2 élèves), et comptage d'une collection en vrac pour remplir un tableau
   d'effectifs. C'est le geste de base des statistiques.
5. `proba_experience` (64 %) et `proba_frequence` (34 %) : urne, sac, cartes
   et jetons dessinés partout où l'énoncé les décrit.
6. `entier_calcul_mental` (0 %) : seulement les ★3 avec situation (« 9
   rangées de 7 fleurs »), sous forme de disposition rectangulaire. Le calcul
   nu reste sans dessin.
7. `aire_unite` (28 %) : pavage par dalles ou carreaux à compter. C'est plus
   de `figure_libre`, pas de nouveaux objets.

## 4. Les nouveaux objets à dessiner

Ce sont des objets « grands », c'est-à-dire de collégien, sans visage. Ils
suivent le contrat de `ObjetsCanvas` : boîte de 60 × 60, formes fermées,
contour `#111827`. Il y en a 14, plus 2 outils.

| Objet | Sert à |
|---|---|
| `jeton` (pion rond, couleur = donnée) | pourcentages 10 × 10, probabilités, fractions de collection |
| `bille` | sacs de probabilité (aujourd'hui seulement dans `probabilites`) |
| `carte` (carte à jouer ou de collection, sans marque) | probabilités, partages |
| `oeuf` + `boite_oeufs` (6 ou 12 alvéoles) | fractions d'une quantité, multiples de 6 |
| `canette`, `bouteille` | lots et prix, contenances |
| `croissant`, `part_pizza` | proportionnalité, fractions |
| `mangue`, `letchi` | fruits de La Réunion, environ 4 % |
| `cahier`, `stylo` | lots et prix (papeterie) |
| `ticket` (bus, cinéma) | proportionnalité, offres comparées |
| `ballon_basket`, `manette` | statistiques des passions (sport, jeu vidéo) |
| `dalle` (carreau de sol) | aires par pavage, pour le CM2 et la 6e |

Il faut aussi deux outils, plus importants que les dessins :
- **modèle `collection` du canvas `fraction`** : N objets séparés en `d`
  paquets entourés, dont `n` sont coloriés. Il réutilise `svgGrille` ;
- **variante `pictogramme` de `stat_graph`** : une ligne d'objets par
  modalité, avec une légende « 1 dessin = k ».

Il faut aussi pouvoir régler `colonnes` dans `animauxCanvas` et
`ObjetsCanvas`, pour obtenir des dispositions rectangulaires a × b et la
grille de 10 × 10.

## 5. Le plaisir, critère à part entière (ajout de Frédéric : « ça rendrait plus fun »)

Le plaisir et l'envie de continuer comptent autant que la compréhension.
Aujourd'hui, le coach dit « Bravo » et affiche « 🔥 Série N »
(`app/coach/serie/TutorV4Client.tsx`). Aucun dessin ne réagit. Il y a deux
leviers différents :
- **le fun dans la question**, c'est-à-dire ce qu'on compte et ce qui fait
  sourire. Il doit rester **muet** : rien de plus à lire ;
- **le fun dans la réaction**, c'est-à-dire ce qui se passe après la réponse.
  Là, rien ne gêne la lecture, puisque la question est finie. C'est le
  levier le plus sûr, et il vaut pour les trois classes.

Le garde-fou est le même partout : **le fun ne rajoute jamais de mots à
l'énoncé**. Une situation drôle se dit en un dessin, pas en une phrase de
plus. Elle reste ★3 et plus au collège, et ne dépasse pas 25 mots (REGLES-6E).

**CM1** (9-10 ans, ils aiment encore les animaux) :
- **Réaction** : l'animal de la question réagit à la réponse. À la bonne
  réponse, la poule saute, la grenouille fait un bond, le chat ronronne
  (une animation CSS d'une demi-seconde). À la mauvaise réponse, il penche la
  tête sans aucun air triste, puis le corrigé l'entoure.
- **Collections drôles** à compter :
  - « Combien de pattes dans le poulailler ? », avec une araignée cachée
    dans la grille ;
  - le « trouve l'intrus » de `famille` : l'escargot parmi les insectes ;
  - 6 × 8 escargots en rangées, avec un seul qui va dans l'autre sens.
- **Collection de la série** : chaque série de 5 bonnes réponses gagne un
  animal dans son « zoo » (les 24 dessins existent déjà). C'est l'envie de
  revenir, façon album d'images.
- **Situations à ★3** : « les fourmis partagent 23 miettes en 4 files »,
  avec le reste dessiné qui repart tout seul.

**CM2** (10-11 ans, le « bébé » commence à gêner) :
- **Réaction** : les objets « grands » remplacent les animaux. La canette
  qui pétille, la pièce qui tombe dans la tirelire en proportionnalité, la
  grille de 100 jetons qui se remplit jusqu'au pourcentage juste. Le dessin
  de la question termine son geste.
- **Collections à compter** qui leur ressemblent : cartes de collection
  (sans marque), billes, tickets, stickers. « 25 % de mes 100 stickers sont
  brillants » se voit sur la grille.
- **Situations drôles à ★3** :
  - le distributeur qui rend trop de monnaie : faut-il le dire ? ;
  - « 3 croissants à 1,50 € ou le lot de 7 à 9 € ? » ;
  - le plan à l'échelle d'une chambre en désordre.
- Animaux encore possibles, mais seulement comme **données vraies** :
  « Combien de pattes pour 7 araignées ? » plutôt que « la poule est
  contente ».

**6e** (11-12 ans, et ils lisent mal) :
- **Réaction sobre, mais visible** : pas de cri ni de poussin. Le pictogramme
  qui se complète, la boîte d'œufs qui se ferme quand la fraction est juste,
  la jauge 10 × 10 qui se remplit. **Ti Margo** peut réagir (il est déjà
  accepté par les 6e, voir `TiMargoBulle.tsx`). C'est la seule « mascotte » à
  garder au collège.
- **Fun par la passion** : des objets de leur monde, en statistiques et en
  probabilités (`ballon_basket`, `manette`, cartes, tickets de cinéma), en
  écho à `/passions`. Exemple : une urne de cartes rares et communes, et
  « Quelle chance de tirer une rare ? ».
- **Défis rares (★4-★5)** :
  - « Combien de jetons faut-il ajouter pour arriver à 50 % ? » ;
  - un pictogramme truqué à démasquer, où un dessin vaut 2 et non 1 ;
  - le plus petit nombre d'œufs qu'on peut partager en tiers ET en quarts.
- **Collection de séance** : un objet gagné par série (une carte à
  collectionner). Elle ne s'affiche qu'au tableau de bord élève, jamais dans
  la question.
- ⛔ En 6e, il faut éviter les animaux qui sourient, les dessins sans rapport
  avec le calcul, et les blagues écrites, qui sont à lire.

Le tout reste à valider à deux, pour la même raison que le script des vidéos :
il faut **demander aux élèves** de Frédéric (6e et 4e) quelle réaction leur
plaît, avant de la généraliser.

## 6. L'effort à prévoir

| Chantier | Effort |
|---|---|
| 14 objets dessinés, planche vérifiée à 150 px et en grille | 1 session, environ ½ journée |
| `fraction` modèle `collection` + `stat_graph` `pictogramme` + `colonnes` | 1 session, environ ½ journée (types, canvas, CATALOGUE, aperçu) |
| CM1 : environ 40 gabarits (tables, fraction de quantité, division, probabilités, proportionnalité) | 1 session, environ 1 journée |
| CM2 : environ 30 gabarits (pourcentage, proportionnalité, fraction de quantité, échelle) | 1 session, **après** local_81855025 |
| 6e : environ 45 gabarits (pourcentages, fractions, proportionnalité, statistiques, probabilités) | 1 à 2 sessions, à relire selon REGLES-6E |
| Fun : réaction du dessin à la bonne réponse (animation CSS du canvas de la question, + Ti Margo en 6e) | 1 session, environ ½ journée, dans le client du coach |
| Fun : « zoo » ou collection de cartes gagnée par série (CM1 : animaux ; 6e : cartes, au tableau de bord) | 1 session, environ ½ à 1 journée, avec un stockage par élève |
| Vérifier les squelettes et les répétitions (`mesurer-squelettes-coach.ts`) et refaire cette mesure | inclus dans chaque session |

Il faut compter **4 à 5 sessions** pour les images, plus **1 à 2 sessions**
pour le fun, réparties sur 3 à 4 blocs de travail. La réaction à la bonne
réponse est le meilleur rapport entre l'effort et le plaisir : elle vaut
pour toutes les classes et ne touche à aucun gabarit.
Voici ce qu'on peut viser après ce chantier :
- illustrations du CM1 : de 0,8 % à environ 8 % ;
- illustrations du CM2 : de 0,5 % à environ 6 % ;
- dessins de la 6e : de 33 % à environ 40 %.

Le vrai retard de la 6e est dans la géométrie (`cercle_circonscrit`,
`mediatrice_segment`, `quadrilatere_propriete` et `triangle_propriete`, entre
4 et 28 %). C'est un chantier séparé, avec les canvas qui existent déjà, et il
compte autant pour les 6e qui lisent mal.
