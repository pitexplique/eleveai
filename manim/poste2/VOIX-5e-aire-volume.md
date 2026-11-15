# Voix de la série 5e « Aire, volume et conversions » — À VALIDER PAR FRÉDÉRIC

17 paysages (Manim) + 17 shorts (dessin animé Ti Margo, ceinture blanche).
Rien n'est rendu. Après ton « oui » : ces voix sont recopiées telles quelles dans `manim/voix/5e-<notion>-<ep>(-short).json`, puis le **pilote `aire_triangle`** (paysage + short) est rendu en `-ql` pour toi, avant tout le reste.

Banques : `5e/maths/aires.bank.ts` (`aire_surface`), `volumes.bank.ts` + `patron-prisme-cylindre.bank.ts` (`volume_solide`), `conversions.bank.ts` (`grandeur_conversion`). Exemples repris des fiches `maths-5e-aires`, `maths-5e-volumes`, `maths-5e-conversions` (8 × 5 ÷ 2 = 20 ; 6 × 4 = 24 ; figure en L ; 6 × 4 × 3 = 72 ; prisme 15 × 8 ; cylindre 20 × 6 ; 2,4 kg ; 0,75 L ; 135 min ; 1,2 m − 45 cm ; 0,5 L / 75 cL / 400 mL).

**À l'écran, la division s'écrit « ÷ »** ; la voix dit « divisé par ». Chaque mot dit est écrit à l'écran.

## Tableau de la série

| Ép. | Micro | Métier (prénom) | Ceinture | Q1 · Q2 | Short (réponse) | Centres |
|---|---|---|---|---|---|---|
| A1 | `aire_comprendre` | maçonne (Awa) — matrice | jaune | A · C | La pizza carrée : B | art-design, argent-budget |
| A2 | `aire_triangle` ⭐ pilote | agriculteur (Ibrahim) — matrice | verte | B · A | Le pignon de la cabane : C | nature-ecologie, cuisine |
| A3 | `aire_parallelogramme` | graphiste (Soraya) | verte | C · B | Le coup de ciseaux : A | reseaux-sociaux, jeux-defis |
| A4 | `aire_composer` | technicienne en énergies renouvelables (Leïla) — matrice | verte | A · B | La pancarte maison : C | nature-ecologie, technologie-ia |
| A5 | `aire_defi` | menuisier agenceur (Mehdi) | bleue | B · C | Le tapis trop large : A | argent-budget, sciences |
| V1 | `patron_prisme_cylindre` | concepteur d'emballages (Gaël) | verte | C · A | L'étiquette trop courte : B | nature-ecologie, sciences |
| V2 | `volume_comprendre` | logisticien (Tiago) — matrice | jaune | A · C | La valise de Ti Margo : B | transports, argent-budget |
| V3 | `volume_pave` | technicienne en climatisation (Yuna) | verte | B · A | L'aquarium : C | technologie-ia, sciences |
| V4 | `volume_prisme` | fabricante de tentes (Maïa) | verte | C · B | La tente gonflable : A | sport, transports |
| V5 | `volume_cylindre` | ingénieur de l'eau (Hakim) — matrice | bleue | A · B | La canette : C | sciences, corps-sante |
| V6 | `volume_assemblage` | pâtissière (Chloé) — matrice | bleue | B · C | Le château de sable : A | cuisine, jeux-defis |
| V7 | `volume_unite` | pompière (Fanta) | verte | C · A | Le cube magique : B | sport, sciences |
| V8 | `volume_defi` | installateur de récupérateurs d'eau de pluie (Jonas) | bleue | A · C | Le bidon sous la gouttière : B | nature-ecologie, meteo-climat |
| C1 | `conversion_decimal` | pharmacien (Samir) — matrice | jaune | B · A | La recette de Ti Margo : C | corps-sante, sciences |
| C2 | `conversion_duree` | monteuse de films (Léna) | verte | C · B | Le film trop long : A | cinema-series, musique |
| C3 | `conversion_avant_calcul` | cheffe cuisinière (Lucie) — matrice | verte | A · B | Le ruban du cadeau : C | cuisine, argent-budget |
| C4 | `conversion_coherence` | contrôleuse qualité (Ana) | bleue | B · C | Le jus dans un bouchon : A | technologie-ia, transports |

- **Bonnes réponses** : 51 questions, 17 A, 17 B, 17 C ; jamais deux fois la même lettre dans une paysage ; leurres = erreurs typiques des banques (oubli du ÷ 2, côté penché, addition des dimensions, rayon / diamètre, × 10 au lieu de × 1 000, 1 h = 100 min, sens de la conversion).
- **Métiers** : 17 différents, 10 femmes et 7 hommes ; les 8 métiers de la matrice 5e sont pris (V à marquer après ton oui), les 9 autres hors matrice, aucun repris du CM1 ou du CM2.
- **La Réunion** : une seule fois sur 34 voix (V8, la cuve d'eau de pluie).
- **Défis** : tous à 2 étapes.

## ⚠️ Doublons à trancher AVANT le rendu

1. **`aire_comprendre`** existe déjà en CM1 et en CM2 (`cm2-aire-comprendre`). La règle du plan (« vidéo commune dans la classe la plus basse, branchée par `aussi` ») voudrait qu'on ne la refasse pas. Ma voix A1 monte d'un cran (m², même aire avec un autre tour, mur à 2,5 m, deux étapes), mais elle reste proche. **Je propose : soit tu la gardes, soit on branche la CM2 par `aussi` et je ne fais pas A1.**
2. **`aire_composer` et `aire_defi`** existent en CM1 et en CM2, mais en comptant des carreaux. Ici, on découpe avec les formules du triangle et du parallélogramme, et on remonte une formule : c'est du contenu nouveau. Je les garde.
3. **`volume_unite` et `volume_assemblage`** sont aussi des micros de **6e**, que le 1er poste produit en ce moment. Aucune vidéo 6e n'est encore au manifeste. Si le 1er poste fait la 6e d'abord, la 5e pourrait la reprendre par `aussi`. Mes voix V6 et V7 vont plus loin que la 6e (prisme + creuser ; m³ → L, × 1 000). **À voir entre les deux postes.**
4. Aucune des 17 micros n'a encore de vidéo 5e au manifeste.

---

# A1 · `aire_comprendre` — ceinture jaune

### Paysage
- **00-garde** : L'aire. Combien de place prend une surface ?
- **01-situation** : Voici Awa. Elle est maçonne. Elle doit couvrir un mur d'enduit. Au magasin, l'enduit se vend au mètre carré. Combien de mètres carrés faut-il ?
- **02-carreaux** : Le mur mesure 4 mètres sur 3 mètres. Awa le découpe en carrés de 1 mètre sur 1 mètre. Chaque carré, c'est 1 mètre carré. Elle compte : 3 rangées de 4 carrés, 12 carrés. L'aire du mur est 12 mètres carrés.
- **03-tour** : Attention : le tour du mur, c'est autre chose. 4 plus 3 plus 4 plus 3 : 14 mètres. Le tour se mesure en mètres. La surface se mesure en mètres carrés.
- **04-methode** : Deux murs différents peuvent avoir la même aire. Un mur de 6 mètres sur 2 mètres : 12 carrés aussi. Même aire, 12 mètres carrés. Mais son tour fait 16 mètres.
- **05-question** : Question ! Un mur mesure 5 mètres sur 2 mètres. Quelle est son aire ? A : 10 mètres carrés. B : 14 mètres carrés. C : 7 mètres carrés. Mets pause, et choisis !
- **05b-reponse** : Réponse A. 2 rangées de 5 carrés : 10 mètres carrés. 14, c'est le tour du mur. 7, c'est 5 plus 2.
- **06-piege** : Attention au piège ! Une aire s'écrit en unités carrées : centimètres carrés, mètres carrés. Le petit 2 en haut compte. 12 mètres, c'est une longueur. 12 mètres carrés, c'est une surface.
- **07-question** : Question ! Deux terrasses. La première mesure 8 mètres sur 3 mètres. La deuxième mesure 6 mètres sur 4 mètres. Laquelle a la plus grande aire ? A : la deuxième. B : la première. C : elles ont la même aire. Mets pause, et choisis !
- **07b-reponse** : Réponse C. 8 fois 3, 24. 6 fois 4, 24 aussi. Les deux terrasses ont la même aire : 24 mètres carrés.
- **08-defi** : À toi de jouer ! Awa enduit une pièce. Deux murs mesurent 4 mètres sur 2,5 mètres. Deux autres mesurent 3 mètres sur 2,5 mètres. Un sac d'enduit couvre 10 mètres carrés. Combien de sacs faut-il ? Mets pause, et cherche !
- **08b-correction** : Correction. Un grand mur : 4 fois 2,5, 10 mètres carrés. Deux grands murs : 20. Un petit mur : 3 fois 2,5, 7,5. Deux petits murs : 15. En tout : 20 plus 15, 35 mètres carrés. 3 sacs couvrent 30 : pas assez. Il faut 4 sacs.
- **09-finale** : Ce que tu as appris. L'aire, c'est le nombre de carrés-unité qui couvrent une surface. Elle s'écrit en centimètres carrés ou en mètres carrés. Deux figures différentes peuvent avoir la même aire.
- **10-abonne** : Entraîne-toi sur éleveai point f r. Et si ça t'a aidé : mets un pouce, laisse un commentaire, abonne-toi et active la cloche !

### Short « La pizza carrée » (blanche)
- **00-accroche** : Ma pizza est carrée : 20 centimètres sur 20. Celle de mon frère est un rectangle : 25 centimètres sur 16.
- **01-dispute** : Il dit : la mienne est plus longue, donc plus grande ! Moi, je dis : on compte !
- **02-question** : Question ! Quelle pizza a la plus grande aire ? A : la pizza rectangle. B : les deux ont la même aire. C : la pizza carrée. Mets pause, et choisis !
- **02b-reponse** : Réponse B ! Ma pizza : 20 fois 20, 400 centimètres carrés. La sienne : 25 fois 16, 400 aussi. Même aire !
- **03-ouf** : Égalité… alors on partage les deux !
- **04-commentaire** : À toi : une pizza de 30 centimètres sur 10. Quelle est son aire ? Réponds en commentaire !
- **05-abonne** : Entraîne-toi sur éleveai point f r. Mets un pouce, abonne-toi et active la cloche !

---

# A2 · `aire_triangle` — ceinture verte — ⭐ PILOTE

### Paysage
- **00-garde** : L'aire du triangle. Comment mesurer une surface à trois côtés ?
- **01-situation** : Voici Ibrahim. Il est agriculteur. Au bout de son champ, il reste un coin en forme de triangle. Il veut y semer des fleurs pour les abeilles. Combien de mètres carrés doit-il semer ?
- **02-rectangle** : Le triangle a une base de 8 mètres et une hauteur de 5 mètres. Ibrahim trace un rectangle autour : 8 mètres sur 5. Son aire : 8 fois 5, 40 mètres carrés.
- **03-moitie** : Le triangle prend exactement la moitié du rectangle. Son aire : 40 divisé par 2, 20 mètres carrés.
- **04-methode** : La méthode : base fois hauteur, divisé par 2. La hauteur part du sommet et tombe sur la base, à angle droit.
- **05-question** : Question ! Un triangle a une base de 10 centimètres et une hauteur de 6 centimètres. Quelle est son aire ? A : 60 centimètres carrés. B : 30 centimètres carrés. C : 16 centimètres carrés. Mets pause, et choisis !
- **05b-reponse** : Réponse B. 10 fois 6, 60. Divisé par 2 : 30 centimètres carrés.
- **06-piege** : Attention au piège ! La hauteur n'est pas le côté penché. Elle tombe tout droit sur la base, à angle droit. Et on n'oublie pas de diviser par 2.
- **07-question** : Question ! Un triangle a une base de 6 centimètres, un côté penché de 5 centimètres et une hauteur de 4 centimètres. Quelle est son aire ? A : 12 centimètres carrés. B : 15 centimètres carrés. C : 24 centimètres carrés. Mets pause, et choisis !
- **07b-reponse** : Réponse A. On prend la base et la hauteur : 6 fois 4, 24. Divisé par 2 : 12 centimètres carrés. Le côté de 5 centimètres ne sert pas.
- **08-defi** : À toi de jouer ! Un autre coin de champ est un triangle de 20 mètres carrés. Sa base mesure 8 mètres. Quelle est sa hauteur ? Et Ibrahim plante 4 fleurs par mètre carré : combien de fleurs en tout ? Mets pause, et cherche !
- **08b-correction** : Correction. Base fois hauteur égale 20 fois 2, 40. Donc la hauteur : 40 divisé par 8, 5 mètres. Les fleurs : 20 fois 4, 80 fleurs.
- **09-finale** : Ce que tu as appris. Un triangle est la moitié d'un rectangle. Son aire : base fois hauteur, divisé par 2. La hauteur tombe sur la base à angle droit.
- **10-abonne** : Entraîne-toi sur éleveai point f r. Et si ça t'a aidé : mets un pouce, laisse un commentaire, abonne-toi et active la cloche !

### Short « Le pignon de la cabane » (blanche)
- **00-accroche** : Je peins le haut de ma cabane : un triangle. Sa base mesure 4 mètres, sa hauteur 3 mètres.
- **01-achat** : 4 fois 3, 12 ! J'achète de la peinture pour 12 mètres carrés.
- **02-question** : Question ! Quelle est l'aire du triangle ? A : 12 mètres carrés. B : 7 mètres carrés. C : 6 mètres carrés. Mets pause, et choisis !
- **02b-reponse** : Réponse C ! 4 fois 3, 12 : c'est le rectangle entier. Le triangle en est la moitié : 6 mètres carrés.
- **03-ouf** : Il me reste la moitié de la peinture… je peins aussi la cabane de mon voisin !
- **04-commentaire** : À toi : un triangle de base 6 mètres et de hauteur 5 mètres. Quelle est son aire ? Réponds en commentaire !
- **05-abonne** : Entraîne-toi sur éleveai point f r. Mets un pouce, abonne-toi et active la cloche !

---

# A3 · `aire_parallelogramme` — ceinture verte

### Paysage
- **00-garde** : L'aire du parallélogramme. Une forme penchée, comment la mesurer ?
- **01-situation** : Voici Soraya. Elle est graphiste. Elle dessine des motifs pour des tissus. Son motif préféré : un parallélogramme, une forme penchée. Pour l'imprimer, elle doit connaître son aire.
- **02-decouper** : Le motif a une base de 6 centimètres et une hauteur de 4 centimètres. Soraya coupe le petit triangle à gauche. Elle le glisse à droite. Le parallélogramme devient un rectangle !
- **03-rectangle** : Ce rectangle mesure 6 centimètres sur 4. Son aire : 6 fois 4, 24 centimètres carrés. Rien n'a été perdu : le parallélogramme a la même aire, 24 centimètres carrés.
- **04-methode** : La méthode : base fois hauteur. Et c'est tout : pour le parallélogramme, on ne divise pas par 2.
- **05-question** : Question ! Un parallélogramme a une base de 8 centimètres et une hauteur de 5 centimètres. Quelle est son aire ? A : 20 centimètres carrés. B : 13 centimètres carrés. C : 40 centimètres carrés. Mets pause, et choisis !
- **05b-reponse** : Réponse C. 8 fois 5, 40 centimètres carrés. 20, c'est diviser par 2 en trop : ça, c'est pour le triangle.
- **06-piege** : Attention au piège ! La hauteur n'est pas le côté penché. Elle tombe tout droit sur la base, à angle droit.
- **07-question** : Question ! Un parallélogramme a une base de 6 centimètres, un côté penché de 5 centimètres et une hauteur de 4 centimètres. Quelle est son aire ? A : 30 centimètres carrés. B : 24 centimètres carrés. C : 12 centimètres carrés. Mets pause, et choisis !
- **07b-reponse** : Réponse B. Base fois hauteur : 6 fois 4, 24 centimètres carrés. Le côté penché ne sert pas.
- **08-defi** : À toi de jouer ! Soraya imprime son motif sur un tissu de 60 centimètres sur 40 centimètres. Chaque motif a une base de 6 centimètres et une hauteur de 4 centimètres. Combien de fois l'aire d'un motif tient-elle dans le tissu ? Mets pause, et cherche !
- **08b-correction** : Correction. Le tissu : 60 fois 40, 2 400 centimètres carrés. Un motif : 6 fois 4, 24. 2 400 divisé par 24 : 100. L'aire du tissu vaut 100 motifs.
- **09-finale** : Ce que tu as appris. Un parallélogramme se transforme en rectangle de même aire. Son aire : base fois hauteur, sans diviser par 2. La hauteur tombe sur la base à angle droit.
- **10-abonne** : Entraîne-toi sur éleveai point f r. Et si ça t'a aidé : mets un pouce, laisse un commentaire, abonne-toi et active la cloche !

### Short « Le coup de ciseaux » (blanche)
- **00-accroche** : J'ai une feuille en forme de parallélogramme. Base : 5 centimètres. Hauteur : 2 centimètres.
- **01-ciseaux** : Clac ! Je coupe le petit triangle penché. Je le recolle de l'autre côté. Un rectangle !
- **02-question** : Question ! Quelle est l'aire du parallélogramme ? A : 10 centimètres carrés. B : 5 centimètres carrés. C : 7 centimètres carrés. Mets pause, et choisis !
- **02b-reponse** : Réponse A ! Le rectangle : 5 fois 2, 10 centimètres carrés. Je n'ai rien perdu : le parallélogramme fait 10 aussi.
- **03-ouf** : Même aire… mais maintenant, il tient droit dans ma boîte !
- **04-commentaire** : À toi : un parallélogramme de base 7 centimètres et de hauteur 3 centimètres. Quelle est son aire ? Réponds en commentaire !
- **05-abonne** : Entraîne-toi sur éleveai point f r. Mets un pouce, abonne-toi et active la cloche !

---

# A4 · `aire_composer` — ceinture verte

### Paysage
- **00-garde** : L'aire d'une figure composée. Comment mesurer une forme compliquée ?
- **01-situation** : Voici Leïla. Elle est technicienne en énergies renouvelables. Elle pose des panneaux solaires. Ce toit a une drôle de forme : un L. Combien de mètres carrés de toit a-t-elle ?
- **02-decouper** : Leïla coupe le L en deux rectangles. Le premier : 6 mètres sur 4, 24 mètres carrés. Le second : 3 mètres sur 2, 6 mètres carrés. En tout : 24 plus 6, 30 mètres carrés.
- **03-enlever** : Autre méthode : elle complète le L en un grand rectangle de 6 mètres sur 6, 36 mètres carrés. Puis elle enlève le morceau en trop : 3 mètres sur 2, 6. 36 moins 6 : 30 mètres carrés. Le même résultat !
- **04-methode** : La méthode : on découpe en rectangles et en triangles. On calcule chaque morceau. Puis on additionne… ou on enlève.
- **05-question** : Question ! Une figure en L est faite d'un rectangle de 5 mètres sur 4 et d'un rectangle de 2 mètres sur 3. Quelle est son aire ? A : 26 mètres carrés. B : 20 mètres carrés. C : 14 mètres carrés. Mets pause, et choisis !
- **05b-reponse** : Réponse A. 5 fois 4, 20. 2 fois 3, 6. 20 plus 6 : 26 mètres carrés.
- **06-piege** : Attention au piège ! Quand on découpe, chaque morceau compte une seule fois. Et quand on enlève un morceau, on enlève son aire, pas sa longueur.
- **07-question** : Question ! Un carré de 10 mètres de côté. On enlève un carré de 4 mètres de côté. Quelle aire reste-t-il ? A : 96 mètres carrés. B : 84 mètres carrés. C : 60 mètres carrés. Mets pause, et choisis !
- **07b-reponse** : Réponse B. Le grand carré : 10 fois 10, 100. Le petit : 4 fois 4, 16. 100 moins 16 : 84 mètres carrés.
- **08-defi** : À toi de jouer ! Un autre toit : un rectangle de 9 mètres sur 4, avec un triangle collé au bout. Le triangle a une base de 4 mètres et une hauteur de 3 mètres. Un panneau solaire couvre 2 mètres carrés. Combien de panneaux Leïla peut-elle poser ? Mets pause, et cherche !
- **08b-correction** : Correction. Le rectangle : 9 fois 4, 36. Le triangle : 4 fois 3, 12, divisé par 2, 6. Le toit : 36 plus 6, 42 mètres carrés. 42 divisé par 2 : 21 panneaux.
- **09-finale** : Ce que tu as appris. Une figure compliquée se découpe en rectangles et en triangles. On calcule chaque morceau. Puis on additionne, ou on enlève ce qui manque.
- **10-abonne** : Entraîne-toi sur éleveai point f r. Et si ça t'a aidé : mets un pouce, laisse un commentaire, abonne-toi et active la cloche !

### Short « La pancarte maison » (blanche)
- **00-accroche** : Je fabrique une pancarte en forme de maison. Un carré de 4 décimètres de côté, et un toit en triangle.
- **01-toit** : Le toit a une base de 4 décimètres et une hauteur de 3 décimètres. Je le peins en rouge.
- **02-question** : Question ! Quelle est l'aire de toute la pancarte ? A : 28 décimètres carrés. B : 16 décimètres carrés. C : 22 décimètres carrés. Mets pause, et choisis !
- **02b-reponse** : Réponse C ! Le carré : 4 fois 4, 16. Le toit : 4 fois 3, 12, divisé par 2, 6. En tout : 22 décimètres carrés.
- **03-ouf** : 28, c'était le toit sans diviser par 2. J'aurais acheté trop de peinture !
- **04-commentaire** : À toi : un carré de 5 décimètres et un toit de base 5 décimètres, de hauteur 4 décimètres. Quelle est l'aire de la pancarte ? Réponds en commentaire !
- **05-abonne** : Entraîne-toi sur éleveai point f r. Mets un pouce, abonne-toi et active la cloche !

---

# A5 · `aire_defi` — ceinture bleue

### Paysage
- **00-garde** : Défis sur les aires. Et si on connaît l'aire, mais pas la longueur ?
- **01-situation** : Voici Mehdi. Il est menuisier agenceur. Il fabrique des meubles sur mesure. Une cliente veut une tablette en triangle de 24 décimètres carrés, avec une base de 8 décimètres. Quelle hauteur doit-il découper ?
- **02-remonter** : Base fois hauteur, divisé par 2, égale 24. Donc base fois hauteur égale 24 fois 2, 48. La base fait 8 : 48 divisé par 8, la hauteur fait 6 décimètres.
- **03-verifier** : Mehdi vérifie : 8 fois 6, 48, divisé par 2, 24. C'est bien 24 décimètres carrés.
- **04-methode** : La méthode : on écrit la formule, on remplace ce qu'on connaît, puis on remonte le calcul. Triangle : hauteur égale aire fois 2, divisé par la base. Parallélogramme : base égale aire divisée par la hauteur.
- **05-question** : Question ! Un triangle a une aire de 20 centimètres carrés et une base de 8 centimètres. Quelle est sa hauteur ? A : 10 centimètres. B : 5 centimètres. C : 2,5 centimètres. Mets pause, et choisis !
- **05b-reponse** : Réponse B. 20 fois 2, 40. 40 divisé par 8 : 5 centimètres. 2,5, c'est l'oubli du fois 2.
- **06-piege** : Attention au piège ! Pour un triangle, on multiplie l'aire par 2 avant de diviser. Pour un parallélogramme, non. Et toujours : on vérifie en refaisant le calcul.
- **07-question** : Question ! Un parallélogramme a une aire de 36 centimètres carrés et une hauteur de 4 centimètres. Quelle est sa base ? A : 32 centimètres. B : 18 centimètres. C : 9 centimètres. Mets pause, et choisis !
- **07b-reponse** : Réponse C. 36 divisé par 4 : 9 centimètres. On vérifie : 9 fois 4, 36. 18 serait la base d'un triangle de même aire.
- **08-defi** : À toi de jouer ! Mehdi pose un plan de travail en L. Un morceau mesure 1,20 mètre sur 0,60 mètre. L'autre mesure 0,80 mètre sur 0,60 mètre. Le revêtement se vend en plaques de 0,50 mètre carré. Combien de plaques faut-il ? Mets pause, et cherche !
- **08b-correction** : Correction. 1,20 fois 0,60 : 0,72 mètre carré. 0,80 fois 0,60 : 0,48. En tout : 1,20 mètre carré. 2 plaques couvrent 1 mètre carré : pas assez. Il faut 3 plaques.
- **09-finale** : Ce que tu as appris. Si on connaît l'aire, on remonte la formule. Triangle : hauteur égale aire fois 2, divisé par la base. Parallélogramme : base égale aire divisée par la hauteur. Et on vérifie toujours.
- **10-abonne** : Entraîne-toi sur éleveai point f r. Et si ça t'a aidé : mets un pouce, laisse un commentaire, abonne-toi et active la cloche !

### Short « Le tapis trop large » (blanche)
- **00-accroche** : J'ai acheté un tapis de 12 mètres carrés. Il est long de 4 mètres.
- **01-couloir** : Mon couloir fait 2 mètres de large. Le tapis va-t-il rentrer ?
- **02-question** : Question ! Quelle est la largeur du tapis ? A : 3 mètres. B : 8 mètres. C : 48 mètres. Mets pause, et choisis !
- **02b-reponse** : Réponse A ! Longueur fois largeur égale 12. 12 divisé par 4 : 3 mètres de large.
- **03-ouf** : 3 mètres dans un couloir de 2… je le pose dans le salon !
- **04-commentaire** : À toi : un tapis de 20 mètres carrés et de 5 mètres de long. Quelle est sa largeur ? Réponds en commentaire !
- **05-abonne** : Entraîne-toi sur éleveai point f r. Mets un pouce, abonne-toi et active la cloche !

---

# V1 · `patron_prisme_cylindre` — ceinture verte

### Paysage
- **00-garde** : Le patron d'un prisme et d'un cylindre. Que voit-on quand on déplie une boîte ?
- **01-situation** : Voici Gaël. Il est concepteur d'emballages. Il invente des boîtes en carton. Avant de fabriquer une boîte, il dessine son patron : la boîte dépliée à plat.
- **02-cylindre** : Une boîte ronde, c'est un cylindre. Gaël la déplie. Il obtient deux disques, le fond et le couvercle, et un rectangle : le tour de la boîte.
- **03-longueur** : Le rectangle s'enroule autour du disque. Sa longueur est donc le tour du disque : 2 fois pi fois le rayon. Pour un rayon de 4 centimètres : 2 fois 3,14 fois 4, 25,12 centimètres. Sa largeur, c'est la hauteur de la boîte.
- **04-prisme** : Une boîte en forme de prisme droit, maintenant. Sa base est un triangle de côtés 3, 4 et 5 centimètres. Dépliée : deux triangles, et un rectangle par côté du triangle. Les trois rectangles ont tous pour largeur la hauteur du prisme.
- **05-question** : Question ! Le patron d'un cylindre, c'est… A : deux disques et un carré. B : un disque et un rectangle. C : deux disques et un rectangle. Mets pause, et choisis !
- **05b-reponse** : Réponse C. Deux disques, le fond et le couvercle. Et un rectangle, qui fait le tour.
- **06-piege** : Attention au piège ! La longueur du rectangle n'est pas le diamètre du disque. C'est tout le tour : 2 fois pi fois le rayon. Si le rectangle est trop court, la boîte ne ferme pas.
- **07-question** : Question ! Un cylindre a un rayon de 5 centimètres. Quelle est la longueur du rectangle de son patron ? On prend pi égal 3,14. A : 31,4 centimètres. B : 15,7 centimètres. C : 10 centimètres. Mets pause, et choisis !
- **07b-reponse** : Réponse A. 2 fois 3,14 fois 5 : 31,4 centimètres. 15,7, c'est un demi-tour. 10, c'est le diamètre.
- **08-defi** : À toi de jouer ! Gaël habille une boîte ronde d'une étiquette. La boîte a un rayon de 3 centimètres et une hauteur de 12 centimètres. Quelles sont les dimensions de l'étiquette ? Et quelle est son aire ? Mets pause, et cherche !
- **08b-correction** : Correction. La longueur : 2 fois 3,14 fois 3, 18,84 centimètres. La largeur : la hauteur, 12 centimètres. L'aire : 18,84 fois 12, 226,08 centimètres carrés.
- **09-finale** : Ce que tu as appris. Le patron d'un cylindre : deux disques et un rectangle, long comme le tour du disque. Le patron d'un prisme droit : deux bases, et un rectangle par côté. La largeur des rectangles, c'est la hauteur du solide.
- **10-abonne** : Entraîne-toi sur éleveai point f r. Et si ça t'a aidé : mets un pouce, laisse un commentaire, abonne-toi et active la cloche !

### Short « L'étiquette trop courte » (blanche)
- **00-accroche** : Je colle une étiquette autour de ma boîte de conserve. Le rayon de la boîte : 2 centimètres.
- **01-coupe** : Je coupe une étiquette de 4 centimètres, comme le diamètre. Je l'enroule… il manque un gros morceau !
- **02-question** : Question ! Quelle longueur doit avoir l'étiquette ? On prend pi égal 3,14. A : 6,28 centimètres. B : 12,56 centimètres. C : 4 centimètres. Mets pause, et choisis !
- **02b-reponse** : Réponse B ! L'étiquette fait tout le tour : 2 fois 3,14 fois 2, 12,56 centimètres. Plus de trois fois le diamètre !
- **03-ouf** : Cette fois, elle fait le tour… et elle ferme pile !
- **04-commentaire** : À toi : une boîte de rayon 5 centimètres. Quelle longueur doit avoir son étiquette ? Réponds en commentaire !
- **05-abonne** : Entraîne-toi sur éleveai point f r. Mets un pouce, abonne-toi et active la cloche !

---

# V2 · `volume_comprendre` — ceinture jaune

### Paysage
- **00-garde** : Le volume. Combien de place prend un objet ?
- **01-situation** : Voici Tiago. Il est logisticien. Il remplit des camions et des conteneurs. Son problème de chaque jour : combien de caisses vont rentrer ?
- **02-cubes** : Tiago range des cubes de 1 décimètre de côté dans une caisse. Une couche : 4 cubes sur 3, 12 cubes. Deux couches : 24 cubes.
- **03-volume** : Chaque cube, c'est 1 décimètre cube. La caisse contient 24 cubes : son volume est 24 décimètres cubes.
- **04-methode** : Une aire couvre une surface plate : elle se compte en carrés. Un volume remplit un espace : il se compte en cubes. Il s'écrit en centimètres cubes, en décimètres cubes, en mètres cubes.
- **05-question** : Question ! Un solide est fait de 12 cubes de 1 centimètre cube. Quel est son volume ? A : 12 centimètres cubes. B : 12 centimètres carrés. C : 36 centimètres cubes. Mets pause, et choisis !
- **05b-reponse** : Réponse A. 12 cubes de 1 centimètre cube : 12 centimètres cubes. Les centimètres carrés, c'est pour une aire.
- **06-piege** : Attention au piège ! Le petit 2, c'est une aire, à plat. Le petit 3, c'est un volume, en trois dimensions : longueur, largeur, hauteur.
- **07-question** : Question ! Un pavé mesure 2 centimètres, 3 centimètres et 4 centimètres. Quel est son volume ? A : 12 centimètres cubes. B : 9 centimètres cubes. C : 24 centimètres cubes. Mets pause, et choisis !
- **07b-reponse** : Réponse C. Une couche : 2 fois 3, 6 cubes. 4 couches : 24 centimètres cubes. 9, c'est l'addition : faux.
- **08-defi** : À toi de jouer ! Un conteneur mesure 6 mètres de long, 2 mètres de large et 2 mètres de haut. Tiago y range des caisses cubiques de 1 mètre de côté. Chaque caisse pèse 50 kilos. Combien de caisses rentrent ? Et combien pèse le chargement ? Mets pause, et cherche !
- **08b-correction** : Correction. Une couche : 6 fois 2, 12 caisses. 2 couches : 24 caisses. Le chargement : 24 fois 50, 1 200 kilos.
- **09-finale** : Ce que tu as appris. Le volume, c'est la place qu'occupe un objet. On le compte en cubes-unité. Il s'écrit en centimètres cubes, décimètres cubes ou mètres cubes.
- **10-abonne** : Entraîne-toi sur éleveai point f r. Et si ça t'a aidé : mets un pouce, laisse un commentaire, abonne-toi et active la cloche !

### Short « La valise de Ti Margo » (blanche)
- **00-accroche** : Je pars en vacances. Je range mes boîtes cubiques dans ma valise.
- **01-rangement** : Une rangée de 3 boîtes, deux rangées, et une deuxième couche par-dessus.
- **02-question** : Question ! Combien de boîtes dans la valise ? A : 7. B : 12. C : 6. Mets pause, et choisis !
- **02b-reponse** : Réponse B ! Une couche : 3 fois 2, 6 boîtes. Deux couches : 12 boîtes.
- **03-ouf** : 12 boîtes… et plus de place pour mon maillot !
- **04-commentaire** : À toi : 4 boîtes sur 3, en 2 couches. Combien de boîtes ? Réponds en commentaire !
- **05-abonne** : Entraîne-toi sur éleveai point f r. Mets un pouce, abonne-toi et active la cloche !

---

# V3 · `volume_pave` — ceinture verte

### Paysage
- **00-garde** : Le volume du pavé droit. Comment calculer la place dans une boîte ?
- **01-situation** : Voici Yuna. Elle est technicienne en climatisation. Pour choisir le bon climatiseur, elle doit connaître le volume d'air d'une pièce.
- **02-couche** : La pièce mesure 6 mètres de long, 4 mètres de large et 3 mètres de haut. Au sol : 6 fois 4, 24 cubes de 1 mètre cube. C'est l'aire de la base, 24 mètres carrés.
- **03-hauteur** : Il y a 3 couches comme celle-là, jusqu'au plafond. 24 fois 3 : 72 mètres cubes.
- **04-methode** : La méthode : volume égale longueur fois largeur fois hauteur. C'est aussi l'aire de la base, fois la hauteur.
- **05-question** : Question ! Un pavé mesure 5 centimètres, 3 centimètres et 2 centimètres. Quel est son volume ? A : 10 centimètres cubes. B : 30 centimètres cubes. C : 15 centimètres cubes. Mets pause, et choisis !
- **05b-reponse** : Réponse B. 5 fois 3, 15. Fois 2 : 30 centimètres cubes. 10, c'est l'addition. 15, c'est oublier la hauteur.
- **06-piege** : Attention au piège ! On multiplie les trois dimensions, on ne les additionne pas. Et la réponse est en unités cubes.
- **07-question** : Question ! Un cube a une arête de 2 centimètres. Quel est son volume ? A : 8 centimètres cubes. B : 6 centimètres cubes. C : 4 centimètres cubes. Mets pause, et choisis !
- **07b-reponse** : Réponse A. 2 fois 2 fois 2 : 8 centimètres cubes. 6, c'est 2 plus 2 plus 2. 4, c'est seulement une face.
- **08-defi** : À toi de jouer ! Yuna climatise deux salles. La première : 7 mètres sur 5, et 3 mètres de haut. La deuxième : 4 mètres sur 3, et 3 mètres de haut. Un climatiseur refroidit 80 mètres cubes. Combien de climatiseurs faut-il ? Mets pause, et cherche !
- **08b-correction** : Correction. Première salle : 7 fois 5 fois 3, 105 mètres cubes. Deuxième : 4 fois 3 fois 3, 36. En tout : 141 mètres cubes. Un climatiseur ne suffit pas. Il en faut 2.
- **09-finale** : Ce que tu as appris. Volume du pavé droit : longueur fois largeur fois hauteur. C'est aussi l'aire de la base fois la hauteur. La réponse s'écrit en unités cubes.
- **10-abonne** : Entraîne-toi sur éleveai point f r. Et si ça t'a aidé : mets un pouce, laisse un commentaire, abonne-toi et active la cloche !

### Short « L'aquarium » (blanche)
- **00-accroche** : J'ai un aquarium : 5 décimètres de long, 3 de large, 4 de haut. Je verse l'eau…
- **01-seaux** : Je pense : 5 plus 3 plus 4, 12 litres. Je verse 12 litres… le fond est à peine mouillé !
- **02-question** : Question ! Quel est le volume de l'aquarium ? A : 12 décimètres cubes. B : 20 décimètres cubes. C : 60 décimètres cubes. Mets pause, et choisis !
- **02b-reponse** : Réponse C ! 5 fois 3, 15 au fond. Fois 4 : 60 décimètres cubes. Et 1 décimètre cube, c'est 1 litre : 60 litres !
- **03-ouf** : Mes poissons vont enfin pouvoir nager !
- **04-commentaire** : À toi : un aquarium de 6 décimètres sur 3, et 5 de haut. Combien de litres ? Réponds en commentaire !
- **05-abonne** : Entraîne-toi sur éleveai point f r. Mets un pouce, abonne-toi et active la cloche !

---

# V4 · `volume_prisme` — ceinture verte

### Paysage
- **00-garde** : Le volume du prisme droit. Comment mesurer l'air d'une tente ?
- **01-situation** : Voici Maïa. Elle fabrique des tentes de randonnée. Une tente doit être légère, mais assez grande pour dormir. Combien d'air y a-t-il dedans ?
- **02-base** : La tente est un prisme droit. Vue de face, c'est un triangle : 2 mètres de base, 1,5 mètre de hauteur. Son aire : 2 fois 1,5, divisé par 2, 1,5 mètre carré.
- **03-empiler** : Ce triangle se répète sur toute la longueur de la tente : 3 mètres. Volume : 1,5 fois 3, 4,5 mètres cubes.
- **04-methode** : La méthode : volume du prisme droit égale aire de la base, fois la hauteur du prisme. Ici, la hauteur du prisme, c'est la longueur de la tente.
- **05-question** : Question ! Un prisme a une aire de base de 15 centimètres carrés et une hauteur de 8 centimètres. Quel est son volume ? A : 23 centimètres cubes. B : 60 centimètres cubes. C : 120 centimètres cubes. Mets pause, et choisis !
- **05b-reponse** : Réponse C. 15 fois 8 : 120 centimètres cubes. 23, c'est l'addition. 60, c'est diviser par 2 en trop.
- **06-piege** : Attention au piège ! Quand la base est un triangle, on calcule d'abord son aire, sans oublier le divisé par 2. Et on ne confond pas la hauteur du triangle avec la hauteur du prisme.
- **07-question** : Question ! Un prisme droit a pour base un triangle de base 6 centimètres et de hauteur 4 centimètres. Le prisme mesure 10 centimètres de long. Quel est son volume ? A : 240 centimètres cubes. B : 120 centimètres cubes. C : 20 centimètres cubes. Mets pause, et choisis !
- **07b-reponse** : Réponse B. Le triangle : 6 fois 4, divisé par 2, 12 centimètres carrés. Fois 10 : 120 centimètres cubes. 240, c'est l'oubli du divisé par 2.
- **08-defi** : À toi de jouer ! Une grande tente : un triangle de base 2,4 mètres et de hauteur 1,5 mètre, sur 3 mètres de long. Chaque campeur a besoin de 1,5 mètre cube d'air. Combien de campeurs peuvent y dormir ? Mets pause, et cherche !
- **08b-correction** : Correction. Le triangle : 2,4 fois 1,5, 3,6, divisé par 2, 1,8 mètre carré. Le volume : 1,8 fois 3, 5,4 mètres cubes. 3 campeurs ont besoin de 4,5 : ça passe. 4 campeurs, de 6 : trop. Donc 3 campeurs.
- **09-finale** : Ce que tu as appris. Volume du prisme droit : aire de la base fois la hauteur du prisme. Si la base est un triangle, on n'oublie pas de diviser par 2.
- **10-abonne** : Entraîne-toi sur éleveai point f r. Et si ça t'a aidé : mets un pouce, laisse un commentaire, abonne-toi et active la cloche !

### Short « La tente gonflable » (blanche)
- **00-accroche** : Je gonfle ma tente. Vue de face, c'est un triangle : 2 mètres de base, 1 mètre de haut. Elle fait 3 mètres de long.
- **01-pompe** : Ma super pompe envoie 1 mètre cube à chaque coup. Combien de coups faut-il ?
- **02-question** : Question ! Quel est le volume de la tente ? A : 3 mètres cubes. B : 6 mètres cubes. C : 1 mètre cube. Mets pause, et choisis !
- **02b-reponse** : Réponse A ! Le triangle : 2 fois 1, divisé par 2, 1 mètre carré. Fois 3 mètres de long : 3 mètres cubes. Trois coups de pompe !
- **03-ouf** : Pouf, pouf, pouf… la tente est gonflée !
- **04-commentaire** : À toi : un triangle de base 2 mètres et de hauteur 2 mètres, sur 4 mètres de long. Quel est le volume ? Réponds en commentaire !
- **05-abonne** : Entraîne-toi sur éleveai point f r. Mets un pouce, abonne-toi et active la cloche !

---

# V5 · `volume_cylindre` — ceinture bleue

### Paysage
- **00-garde** : Le volume du cylindre. Combien d'eau dans un réservoir rond ?
- **01-situation** : Voici Hakim. Il est ingénieur de l'eau. Il construit des réservoirs pour l'eau potable d'une ville. Ses réservoirs sont ronds : ce sont des cylindres.
- **02-empiler** : Un cylindre, c'est un disque qu'on empile, tranche après tranche, jusqu'en haut. Comme le prisme : volume égale aire de la base, fois la hauteur.
- **03-disque** : La base est un disque. Son aire : pi fois le rayon fois le rayon. Un rayon de 3 centimètres : 3,14 fois 3 fois 3, 28,26 centimètres carrés. Avec 5 centimètres de haut : 28,26 fois 5, 141,3 centimètres cubes.
- **04-methode** : La méthode : volume du cylindre égale pi, fois rayon, fois rayon, fois hauteur.
- **05-question** : Question ! Un cylindre a une aire de base de 20 centimètres carrés et une hauteur de 6 centimètres. Quel est son volume ? A : 120 centimètres cubes. B : 26 centimètres cubes. C : 60 centimètres cubes. Mets pause, et choisis !
- **05b-reponse** : Réponse A. Aire de la base fois hauteur : 20 fois 6, 120 centimètres cubes.
- **06-piege** : Attention au piège ! On prend le rayon, pas le diamètre. Et c'est rayon fois rayon, pas rayon fois 2.
- **07-question** : Question ! Un cylindre a un rayon de 2 centimètres et une hauteur de 10 centimètres. Quel est son volume ? On prend pi égal 3,14. A : 502,4 centimètres cubes. B : 125,6 centimètres cubes. C : 62,8 centimètres cubes. Mets pause, et choisis !
- **07b-reponse** : Réponse B. Le disque : 3,14 fois 2 fois 2, 12,56. Fois 10 : 125,6 centimètres cubes. 502,4, c'est le diamètre pris à la place du rayon.
- **08-defi** : À toi de jouer ! Un réservoir de Hakim a un rayon de 2 mètres et une hauteur de 3 mètres. Quel est son volume ? Et combien de litres d'eau contient-il ? 1 mètre cube, c'est 1 000 litres. Mets pause, et cherche !
- **08b-correction** : Correction. Le disque : 3,14 fois 2 fois 2, 12,56 mètres carrés. Fois 3 : 37,68 mètres cubes. En litres : 37,68 fois 1 000, 37 680 litres.
- **09-finale** : Ce que tu as appris. Un cylindre se calcule comme un prisme : aire de la base fois hauteur. Sa base est un disque : pi fois rayon fois rayon.
- **10-abonne** : Entraîne-toi sur éleveai point f r. Et si ça t'a aidé : mets un pouce, laisse un commentaire, abonne-toi et active la cloche !

### Short « La canette » (blanche)
- **00-accroche** : Je bois du jus dans une canette. Rayon : 3 centimètres. Hauteur : 10 centimètres.
- **01-pari** : Mon copain parie qu'elle contient moins de 200 centimètres cubes. Moi, je dis plus !
- **02-question** : Question ! Quel est le volume de la canette ? On prend pi égal 3,14. A : 188,4 centimètres cubes. B : 94,2 centimètres cubes. C : 282,6 centimètres cubes. Mets pause, et choisis !
- **02b-reponse** : Réponse C ! Le disque : 3,14 fois 3 fois 3, 28,26. Fois 10 : 282,6 centimètres cubes. Plus de 200 : j'ai gagné !
- **03-ouf** : Son gage : il porte toutes nos canettes au recyclage !
- **04-commentaire** : À toi : un verre de rayon 4 centimètres et de hauteur 10 centimètres. Quel est son volume ? Réponds en commentaire !
- **05-abonne** : Entraîne-toi sur éleveai point f r. Mets un pouce, abonne-toi et active la cloche !

---

# V6 · `volume_assemblage` — ceinture bleue

### Paysage
- **00-garde** : Le volume d'un assemblage. Comment mesurer un solide fait de plusieurs morceaux ?
- **01-situation** : Voici Chloé. Elle est pâtissière. Elle crée des gâteaux à étages. Pour préparer juste assez de pâte, elle doit connaître le volume de chaque gâteau.
- **02-additionner** : Ce gâteau a deux morceaux : un pavé de 40 centimètres cubes et, collé dessus, un prisme de 30 centimètres cubes. Volume total : 40 plus 30, 70 centimètres cubes.
- **03-enlever** : Cet autre gâteau est un pavé de 80 centimètres cubes. Chloé creuse au milieu un trou cubique de 8 centimètres cubes, pour la crème. Il reste : 80 moins 8, 72 centimètres cubes de gâteau.
- **04-methode** : La méthode : on découpe le solide en morceaux simples. On calcule le volume de chacun. Puis on additionne… ou on enlève ce qui est creusé.
- **05-question** : Question ! Un solide est fait d'un cube de 8 centimètres cubes collé contre un pavé de 20 centimètres cubes. Quel est son volume ? A : 160 centimètres cubes. B : 28 centimètres cubes. C : 12 centimètres cubes. Mets pause, et choisis !
- **05b-reponse** : Réponse B. On colle : on additionne. 8 plus 20, 28 centimètres cubes.
- **06-piege** : Attention au piège ! On additionne des volumes, jamais des longueurs. Et les volumes doivent être dans la même unité avant d'additionner.
- **07-question** : Question ! Un pavé de 60 centimètres cubes. On y creuse un trou de 15 centimètres cubes. Quel volume reste-t-il ? A : 75 centimètres cubes. B : 4 centimètres cubes. C : 45 centimètres cubes. Mets pause, et choisis !
- **07b-reponse** : Réponse C. On creuse : on enlève. 60 moins 15, 45 centimètres cubes.
- **08-defi** : À toi de jouer ! Chloé monte un gâteau à deux étages. En bas : un pavé de 20 centimètres sur 20, et 6 centimètres de haut. En haut : un pavé de 10 centimètres sur 10, et 6 centimètres de haut. Quel est le volume du gâteau ? Et combien de litres de pâte faut-il ? 1 litre, c'est 1 000 centimètres cubes. Mets pause, et cherche !
- **08b-correction** : Correction. En bas : 20 fois 20 fois 6, 2 400 centimètres cubes. En haut : 10 fois 10 fois 6, 600. En tout : 3 000 centimètres cubes. C'est 3 litres de pâte.
- **09-finale** : Ce que tu as appris. Un assemblage se découpe en solides simples. On additionne leurs volumes. Et si on a creusé, on enlève le volume du trou.
- **10-abonne** : Entraîne-toi sur éleveai point f r. Et si ça t'a aidé : mets un pouce, laisse un commentaire, abonne-toi et active la cloche !

### Short « Le château de sable » (blanche)
- **00-accroche** : Je construis un château de sable. En bas, un bloc de 40 décimètres cubes. Au-dessus, une tour de 10 décimètres cubes.
- **01-frere** : Mon frère dit : 40 fois 10, 400 ! Il part chercher 400 décimètres cubes de sable…
- **02-question** : Question ! Quel est le volume du château ? A : 50 décimètres cubes. B : 400 décimètres cubes. C : 4 décimètres cubes. Mets pause, et choisis !
- **02b-reponse** : Réponse A ! On empile, donc on additionne : 40 plus 10, 50 décimètres cubes.
- **03-ouf** : Il a rapporté 350 décimètres cubes de trop… on construit tout un village !
- **04-commentaire** : À toi : un bloc de 60 décimètres cubes et deux tours de 12 décimètres cubes. Quel est le volume du château ? Réponds en commentaire !
- **05-abonne** : Entraîne-toi sur éleveai point f r. Mets un pouce, abonne-toi et active la cloche !

---

# V7 · `volume_unite` — ceinture verte

### Paysage
- **00-garde** : Les unités de volume. Combien de litres dans un mètre cube ?
- **01-situation** : Voici Fanta. Elle est pompière. Son camion transporte une citerne d'eau. Sur la citerne, c'est écrit en mètres cubes. Sur la lance, en litres. Fanta doit passer de l'un à l'autre.
- **02-litre** : Un cube de 1 décimètre de côté, soit 10 centimètres. Il contient 10 fois 10 fois 10, 1 000 petits cubes de 1 centimètre cube. Et si on le remplit d'eau : exactement 1 litre. Donc 1 litre égale 1 décimètre cube égale 1 000 centimètres cubes.
- **03-metre** : Un cube de 1 mètre de côté, soit 10 décimètres. Il contient 10 fois 10 fois 10, 1 000 décimètres cubes. Donc 1 mètre cube égale 1 000 litres.
- **04-methode** : La méthode : d'une unité de volume à la suivante, on multiplie ou on divise par 1 000. Pas par 10 : par 1 000, car un cube a trois dimensions.
- **05-question** : Question ! 1 décimètre cube, c'est combien de centimètres cubes ? A : 100 centimètres cubes. B : 10 centimètres cubes. C : 1 000 centimètres cubes. Mets pause, et choisis !
- **05b-reponse** : Réponse C. 10 fois 10 fois 10 : 1 000 centimètres cubes. 10 et 100, c'est oublier une ou deux dimensions.
- **06-piege** : Attention au piège ! Pour les longueurs, on passe d'une unité à l'autre par 10. Pour les volumes, c'est par 1 000. 3 décimètres cubes, c'est 3 000 centimètres cubes, pas 30.
- **07-question** : Question ! Combien de litres y a-t-il dans 1 mètre cube ? A : 1 000 litres. B : 10 litres. C : 100 litres. Mets pause, et choisis !
- **07b-reponse** : Réponse A. 1 mètre cube, c'est 1 000 décimètres cubes. Et 1 décimètre cube, c'est 1 litre : 1 000 litres.
- **08-defi** : À toi de jouer ! La citerne du camion contient 3,5 mètres cubes. La lance envoie 500 litres par minute. En combien de minutes la citerne est-elle vide ? Mets pause, et cherche !
- **08b-correction** : Correction. 3,5 mètres cubes : 3,5 fois 1 000, 3 500 litres. 3 500 divisé par 500 : 7 minutes.
- **09-finale** : Ce que tu as appris. 1 litre égale 1 décimètre cube égale 1 000 centimètres cubes. 1 mètre cube égale 1 000 litres. D'une unité de volume à la suivante : fois 1 000, ou divisé par 1 000.
- **10-abonne** : Entraîne-toi sur éleveai point f r. Et si ça t'a aidé : mets un pouce, laisse un commentaire, abonne-toi et active la cloche !

### Short « Le cube magique » (blanche)
- **00-accroche** : J'ai une bouteille de 1 litre et une boîte cubique de 10 centimètres de côté.
- **01-verse** : Je verse toute la bouteille dans la boîte… glou, glou, glou…
- **02-question** : Question ! 1 litre, c'est combien de centimètres cubes ? A : 100 centimètres cubes. B : 1 000 centimètres cubes. C : 10 centimètres cubes. Mets pause, et choisis !
- **02b-reponse** : Réponse B ! La boîte : 10 fois 10 fois 10, 1 000 centimètres cubes. Et la bouteille la remplit pile : 1 litre égale 1 000 centimètres cubes.
- **03-ouf** : Pas une goutte de trop… c'est magique ? Non, ce sont les maths !
- **04-commentaire** : À toi : 2,5 litres, c'est combien de centimètres cubes ? Réponds en commentaire !
- **05-abonne** : Entraîne-toi sur éleveai point f r. Mets un pouce, abonne-toi et active la cloche !

---

# V8 · `volume_defi` — ceinture bleue — (la seule mention de La Réunion)

### Paysage
- **00-garde** : Défis sur les volumes. Combien d'eau de pluie peut-on garder ?
- **01-situation** : Voici Jonas. Il installe des récupérateurs d'eau de pluie. À La Réunion, beaucoup de maisons gardent l'eau du toit pour arroser le jardin. Jonas doit choisir la bonne cuve.
- **02-cuve** : Cette cuve est un cylindre : 1 mètre de rayon, 2 mètres de haut. Son volume : 3,14 fois 1 fois 1 fois 2, 6,28 mètres cubes. En litres : 6 280 litres.
- **03-jardin** : Le jardin boit 150 litres par jour. 6 280 divisé par 150 : un peu plus de 41. La cuve pleine arrose le jardin pendant 41 jours.
- **04-methode** : La méthode d'un défi : on calcule le volume avec la bonne formule. On le convertit dans l'unité de la question. Puis on répond à la vraie question.
- **05-question** : Question ! Une cuve contient 2 mètres cubes. Combien de litres ? A : 2 000 litres. B : 200 litres. C : 20 000 litres. Mets pause, et choisis !
- **05b-reponse** : Réponse A. 1 mètre cube égale 1 000 litres. 2 fois 1 000 : 2 000 litres.
- **06-piege** : Attention au piège ! Toutes les longueurs doivent être dans la même unité avant de multiplier. Et à la fin, on convertit dans l'unité demandée.
- **07-question** : Question ! Une cuve en pavé mesure 50 centimètres, 40 centimètres et 30 centimètres. Combien de litres contient-elle ? A : 600 litres. B : 6 litres. C : 60 litres. Mets pause, et choisis !
- **07b-reponse** : Réponse C. 50 fois 40 fois 30 : 60 000 centimètres cubes. 1 litre égale 1 000 centimètres cubes : 60 litres.
- **08-defi** : À toi de jouer ! Un toit mesure 60 mètres carrés. Il tombe 40 millimètres de pluie. Toute l'eau va dans une cuve de 2 000 litres. La cuve déborde-t-elle ? De combien ? Mets pause, et cherche !
- **08b-correction** : Correction. 40 millimètres, c'est 0,04 mètre. Le volume d'eau : 60 fois 0,04, 2,4 mètres cubes, soit 2 400 litres. La cuve fait 2 000 litres : elle déborde de 400 litres.
- **09-finale** : Ce que tu as appris. Dans un défi de volume : on met tout dans la même unité, on applique la formule, puis on convertit. 1 mètre cube égale 1 000 litres.
- **10-abonne** : Entraîne-toi sur éleveai point f r. Et si ça t'a aidé : mets un pouce, laisse un commentaire, abonne-toi et active la cloche !

### Short « Le bidon sous la gouttière » (blanche)
- **00-accroche** : Il pleut. Je mets un bidon sous la gouttière : 30 centimètres sur 20, et 10 de haut.
- **01-arrosoir** : Mon arrosoir fait 5 litres. Le bidon pourra-t-il le remplir ?
- **02-question** : Question ! Combien de litres contient le bidon ? A : 60 litres. B : 6 litres. C : 600 litres. Mets pause, et choisis !
- **02b-reponse** : Réponse B ! 30 fois 20 fois 10 : 6 000 centimètres cubes. Divisé par 1 000 : 6 litres.
- **03-ouf** : 6 litres : l'arrosoir est plein, et il reste un litre pour mes plantes en pot !
- **04-commentaire** : À toi : un bidon de 40 centimètres sur 20, et 10 de haut. Combien de litres ? Réponds en commentaire !
- **05-abonne** : Entraîne-toi sur éleveai point f r. Mets un pouce, abonne-toi et active la cloche !

---

# C1 · `conversion_decimal` — ceinture jaune

### Paysage
- **00-garde** : Convertir une longueur, une masse ou une contenance. Comment changer d'unité sans se tromper ?
- **01-situation** : Voici Samir. Il est pharmacien. Une ordonnance indique 0,5 gramme. Sa balance affiche des milligrammes. Une erreur, et le médicament est faux.
- **02-masse** : 1 gramme égale 1 000 milligrammes. Le milligramme est plus petit : il en faut plus. 0,5 fois 1 000 : 500 milligrammes.
- **03-autres** : C'est pareil pour les autres unités. 2,4 kilos égale 2 400 grammes. 3,5 kilomètres égale 3 500 mètres. 0,75 litre égale 75 centilitres.
- **04-methode** : La méthode : on repère l'unité de départ et l'unité d'arrivée. Vers une unité plus petite, le nombre grandit : on multiplie. Vers une unité plus grande, il diminue : on divise.
- **05-question** : Question ! 1,8 kilo, c'est combien de grammes ? A : 18 grammes. B : 1 800 grammes. C : 180 grammes. Mets pause, et choisis !
- **05b-reponse** : Réponse B. 1 kilo égale 1 000 grammes. 1,8 fois 1 000 : 1 800 grammes.
- **06-piege** : Attention au piège ! Se tromper de sens. Vers une plus petite unité, le nombre devient plus grand. 2,4 kilos ne peuvent pas faire 0,0024 gramme.
- **07-question** : Question ! 0,6 litre, c'est combien de centilitres ? A : 60 centilitres. B : 6 centilitres. C : 600 centilitres. Mets pause, et choisis !
- **07b-reponse** : Réponse A. 1 litre égale 100 centilitres. 0,6 fois 100 : 60 centilitres.
- **08-defi** : À toi de jouer ! Samir prépare un sirop. Il mesure 0,15 litre d'eau et 0,02 kilo de sucre. Combien de millilitres d'eau ? Combien de grammes de sucre ? Mets pause, et cherche !
- **08b-correction** : Correction. 1 litre égale 1 000 millilitres : 0,15 fois 1 000, 150 millilitres. 1 kilo égale 1 000 grammes : 0,02 fois 1 000, 20 grammes.
- **09-finale** : Ce que tu as appris. Convertir, c'est écrire la même quantité avec une autre unité. Vers plus petit, on multiplie. Vers plus grand, on divise. Par 10, 100 ou 1 000.
- **10-abonne** : Entraîne-toi sur éleveai point f r. Et si ça t'a aidé : mets un pouce, laisse un commentaire, abonne-toi et active la cloche !

### Short « La recette de Ti Margo » (blanche)
- **00-accroche** : Je fais un gâteau. La recette dit : 1,5 kilo de farine. Ma balance compte en grammes.
- **01-balance** : Je mets 15 grammes. Une petite cuillère… ça fait un tout petit gâteau !
- **02-question** : Question ! 1,5 kilo, c'est combien de grammes ? A : 150 grammes. B : 15 grammes. C : 1 500 grammes. Mets pause, et choisis !
- **02b-reponse** : Réponse C ! 1 kilo égale 1 000 grammes. 1,5 fois 1 000 : 1 500 grammes.
- **03-ouf** : Cette fois, le gâteau est assez grand pour toute la classe !
- **04-commentaire** : À toi : 0,25 kilo, c'est combien de grammes ? Réponds en commentaire !
- **05-abonne** : Entraîne-toi sur éleveai point f r. Mets un pouce, abonne-toi et active la cloche !

---

# C2 · `conversion_duree` — ceinture verte

### Paysage
- **00-garde** : Convertir une durée. Pourquoi une heure ne fait pas 100 minutes ?
- **01-situation** : Voici Léna. Elle est monteuse de films. Elle colle les scènes bout à bout. Son logiciel compte en minutes. Mais le cinéma veut la durée en heures et minutes.
- **02-soixante** : Une heure, c'est 60 minutes. Pas 100 : 60. Et une minute, c'est 60 secondes. Les durées comptent par paquets de 60.
- **03-paquets** : Le film dure 135 minutes. Léna fait des paquets de 60 : 60, et encore 60, ça fait 120. Il reste 15. 135 minutes, c'est 2 heures et 15 minutes.
- **04-methode** : La méthode : pour passer en heures, on fait des paquets de 60 minutes. Pour passer en minutes, on multiplie les heures par 60, puis on ajoute les minutes. 2 heures 45, c'est 2 fois 60, 120, plus 45 : 165 minutes.
- **05-question** : Question ! 150 minutes, c'est combien d'heures et de minutes ? A : 1 heure 50 minutes. B : 2 heures 50 minutes. C : 2 heures 30 minutes. Mets pause, et choisis !
- **05b-reponse** : Réponse C. 60 plus 60, 120. Il reste 30. 2 heures 30 minutes. 1 heure 50, c'est compter 100 minutes dans une heure : faux.
- **06-piege** : Attention au piège ! Une heure ne contient que 60 minutes. 1 heure 50 plus 20 minutes, ce n'est pas 1 heure 70 : 70 minutes, c'est 1 heure 10. Donc 2 heures 10.
- **07-question** : Question ! 3 heures 20 minutes, c'est combien de minutes ? A : 320 minutes. B : 200 minutes. C : 180 minutes. Mets pause, et choisis !
- **07b-reponse** : Réponse B. 3 fois 60, 180. Plus 20 : 200 minutes.
- **08-defi** : À toi de jouer ! Léna monte un documentaire en trois parties : 48 minutes, 35 minutes et 52 minutes. Combien dure-t-il en heures et minutes ? La chaîne de télé veut 2 heures pile. Combien de minutes faut-il couper ? Mets pause, et cherche !
- **08b-correction** : Correction. 48 plus 35 plus 52 : 135 minutes. C'est 2 heures et 15 minutes. Pour arriver à 2 heures pile, Léna coupe 15 minutes.
- **09-finale** : Ce que tu as appris. 1 heure égale 60 minutes, 1 minute égale 60 secondes. Pour convertir une durée, on fait des paquets de 60. Une durée ne s'écrit pas comme un nombre à virgule.
- **10-abonne** : Entraîne-toi sur éleveai point f r. Et si ça t'a aidé : mets un pouce, laisse un commentaire, abonne-toi et active la cloche !

### Short « Le film trop long » (blanche)
- **00-accroche** : Ce soir, je regarde un film de 100 minutes. Il commence à 20 heures.
- **01-calcul** : 100 minutes, c'est 1 heure pile ? Alors je finis à 21 heures !
- **02-question** : Question ! 100 minutes, c'est… A : 1 heure 40 minutes. B : 1 heure pile. C : 1 heure 20 minutes. Mets pause, et choisis !
- **02b-reponse** : Réponse A ! Une heure, c'est 60 minutes. 100 moins 60 : il reste 40. 1 heure 40 minutes.
- **03-ouf** : À 21 heures, maman éteint la télé… j'ai raté la fin !
- **04-commentaire** : À toi : un film de 145 minutes. Combien d'heures et de minutes ? Réponds en commentaire !
- **05-abonne** : Entraîne-toi sur éleveai point f r. Mets un pouce, abonne-toi et active la cloche !

---

# C3 · `conversion_avant_calcul` — ceinture verte

### Paysage
- **00-garde** : Convertir avant de calculer. Peut-on additionner des litres et des centilitres ?
- **01-situation** : Voici Lucie. Elle est cheffe cuisinière. Ses recettes mélangent les unités : des litres, des centilitres, des millilitres. Avant de calculer, elle met tout dans la même unité.
- **02-comparer** : Trois bouteilles de crème : 0,5 litre, 75 centilitres et 400 millilitres. Laquelle est la plus grande ? Lucie met tout en millilitres : 500, 750 et 400. La plus grande, c'est 75 centilitres.
- **03-soustraire** : Un rouleau de ficelle de cuisine mesure 1,2 mètre. Lucie en coupe 45 centimètres. Tout en centimètres : 1,2 mètre égale 120 centimètres. 120 moins 45 : il reste 75 centimètres.
- **04-methode** : La méthode : on choisit une seule unité. On convertit tout dans cette unité. Ensuite seulement, on compare ou on calcule.
- **05-question** : Question ! Un ruban de 2 mètres. On en coupe 60 centimètres. Combien reste-t-il ? A : 140 centimètres. B : 58 centimètres. C : 1,4 centimètre. Mets pause, et choisis !
- **05b-reponse** : Réponse A. 2 mètres égale 200 centimètres. 200 moins 60 : 140 centimètres.
- **06-piege** : Attention au piège ! On ne calcule jamais avec deux unités différentes. 1,2 moins 45, ça ne veut rien dire. 120 centimètres moins 45 centimètres, oui.
- **07-question** : Question ! Quelle est la plus grande quantité ? A : 0,8 litre. B : 85 centilitres. C : 700 millilitres. Mets pause, et choisis !
- **07b-reponse** : Réponse B. En millilitres : 800, 850 et 700. La plus grande, c'est 85 centilitres.
- **08-defi** : À toi de jouer ! Lucie a 1,5 litre de crème. Elle en utilise 60 centilitres pour une sauce et 250 millilitres pour un dessert. Combien en reste-t-il, en millilitres ? Peut-elle refaire la même sauce ? Mets pause, et cherche !
- **08b-correction** : Correction. Tout en millilitres : 1 500, 600 et 250. 1 500 moins 600 moins 250 : 650 millilitres. La sauce demande 600 : oui, elle peut la refaire. Il restera 50 millilitres.
- **09-finale** : Ce que tu as appris. Avant de comparer ou de calculer, on met tout dans la même unité. Ensuite seulement, on calcule.
- **10-abonne** : Entraîne-toi sur éleveai point f r. Et si ça t'a aidé : mets un pouce, laisse un commentaire, abonne-toi et active la cloche !

### Short « Le ruban du cadeau » (blanche)
- **00-accroche** : Mon ruban de cadeau mesure 1 mètre. J'en coupe 30 centimètres pour faire le nœud.
- **01-calcul** : 1 moins 30… moins 29 ? Il me reste un ruban plus petit que rien ?!
- **02-question** : Question ! Combien mesure le ruban qui reste ? A : 0,7 centimètre. B : 29 centimètres. C : 70 centimètres. Mets pause, et choisis !
- **02b-reponse** : Réponse C ! 1 mètre égale 100 centimètres. 100 moins 30 : 70 centimètres.
- **03-ouf** : 70 centimètres : assez pour emballer le cadeau !
- **04-commentaire** : À toi : un ruban de 2 mètres. On en coupe 45 centimètres. Combien reste-t-il, en centimètres ? Réponds en commentaire !
- **05-abonne** : Entraîne-toi sur éleveai point f r. Mets un pouce, abonne-toi et active la cloche !

---

# C4 · `conversion_coherence` — ceinture bleue

### Paysage
- **00-garde** : Contrôler une conversion. Comment savoir si un résultat est possible ?
- **01-situation** : Voici Ana. Elle est contrôleuse qualité dans une usine. Son travail : repérer les erreurs avant que les produits partent. Sur ce paquet de riz, l'étiquette dit 2,4 kilos. La fiche dit 24 grammes. Ana sent qu'il y a un problème.
- **02-ordre** : 24 grammes, c'est le poids de quelques morceaux de sucre. Un gros paquet de riz ne peut pas peser ça. Le bon résultat : 2,4 fois 1 000, 2 400 grammes.
- **03-reperes** : Ana garde des repères en tête. 1 litre : une grande bouteille d'eau. 1 kilo : un paquet de farine. 1 kilomètre : un quart d'heure de marche. Elle compare chaque résultat à ses repères.
- **04-methode** : La méthode : après une conversion, on se demande si le résultat est possible. Vers une unité plus petite, le nombre doit grandir. Si le résultat est 10 fois ou 100 fois trop petit ou trop grand, on refait le calcul.
- **05-question** : Question ! Un camion pèse 12 tonnes. Un élève écrit 1 200 kilos. Est-ce cohérent ? A : oui, c'est juste. B : non, c'est 12 000 kilos. C : non, c'est 120 kilos. Mets pause, et choisis !
- **05b-reponse** : Réponse B. 1 tonne égale 1 000 kilos. 12 fois 1 000 : 12 000 kilos. 1 200 kilos, c'est le poids d'une petite voiture, pas d'un camion.
- **06-piege** : Attention au piège ! Un résultat qui a l'air propre peut être faux. On vérifie toujours le sens : unité plus petite, nombre plus grand.
- **07-question** : Question ! Une piste mesure 1,5 kilomètre. Lequel de ces résultats est cohérent ? A : 150 mètres. B : 15 mètres. C : 1 500 mètres. Mets pause, et choisis !
- **07b-reponse** : Réponse C. 1,5 fois 1 000 : 1 500 mètres. 15 mètres, c'est à peine la longueur d'une salle de classe : beaucoup trop court pour une piste.
- **08-defi** : À toi de jouer ! Ana contrôle une palette de 48 boîtes de 250 grammes. L'étiquette de la palette annonce 120 kilos. Est-ce cohérent ? Mets pause, et cherche !
- **08b-correction** : Correction. 48 fois 250 : 12 000 grammes. Divisé par 1 000 : 12 kilos. L'étiquette annonce 120 kilos : 10 fois trop. Ana la fait corriger.
- **09-finale** : Ce que tu as appris. Après une conversion, on vérifie que le résultat est possible. On le compare à des repères connus. Un résultat 10 fois trop grand ou trop petit cache une erreur de sens.
- **10-abonne** : Entraîne-toi sur éleveai point f r. Et si ça t'a aidé : mets un pouce, laisse un commentaire, abonne-toi et active la cloche !

### Short « Le jus dans un bouchon » (blanche)
- **00-accroche** : J'ai commandé 1,5 litre de jus en ligne. Le livreur m'apporte… un bouchon.
- **01-bon** : Sur le bon, c'est écrit : 1,5 centilitre. Quelqu'un s'est trompé en convertissant !
- **02-question** : Question ! 1,5 litre, c'est combien de centilitres ? A : 150 centilitres. B : 15 centilitres. C : 1 500 centilitres. Mets pause, et choisis !
- **02b-reponse** : Réponse A ! 1 litre égale 100 centilitres. 1,5 fois 100 : 150 centilitres. Une grande bouteille, pas un bouchon !
- **03-ouf** : Le livreur revient… avec la vraie bouteille. Santé !
- **04-commentaire** : À toi : 0,8 litre, c'est combien de centilitres ? Réponds en commentaire !
- **05-abonne** : Entraîne-toi sur éleveai point f r. Mets un pouce, abonne-toi et active la cloche !
