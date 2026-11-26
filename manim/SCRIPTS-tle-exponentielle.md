# Voix — série « FONCTION EXPONENTIELLE », terminale spé (26/11/2026)

**6 épisodes = les 6 micro-compétences du coach** de la notion `fonction_exponentielle`
(`lib/tutor-v4/knowledge/maths/terminale-spe/microSkills.ts`). **Paysages seulement**
(Frédéric, 26/11 : « fais simplement les paysages sur la fonction exponentielle »). Manim,
pas de short, pas de dessin animé.

> ⛔ **Statut : À VALIDER À DEUX.** Aucune image n'est faite tant que Frédéric n'a pas dit
> « oui » à ces six voix.
> ⛔ Ce fichier est la source de vérité des voix. Les JSON de `manim/voix/` en seront
> extraits. Après extraction, on corrige ici et on relance, jamais dans les JSON.

## Les règles d'écriture de cette série

- **Gabarit terminale, 15 clips** (comme la série espace) : `00-garde`, `01-situation`,
  `02-idee`, `03-theoreme`, `04-question`, `04b-reponse`, `05-appliquer`, `06-piege`,
  `07-question`, `07b-reponse`, `08-rediger`, `09-defi`, `09b-correction`, `10-finale`,
  `11-abonne`.
- **Tout en toutes lettres** dans la voix : « e puissance x », « moins l'infini »,
  « u prime ». **Chaque nombre et chaque formule dits sont écrits à l'écran, et rien
  n'apparaît avant d'être dit.**
- ⛔ **Jamais de caractère « ^ » (Frédéric, 26/11/2026 : « écrire l'exponentielle soit
  exp() soit en KaTeX, mais n'utilise pas ^ »).**
  - **Dans ce fichier** (règles, passes maths, notes), on écrit exp(x), exp(2x),
    exp(x+3), exp(−0,5t), u′·exp(u).
  - **À l'écran des vidéos, choix de la série : la VRAIE puissance, rendue en `MathTex`
    (LaTeX)**, l'exposant écrit en petit et en hauteur : e^{x}, e^{2x}, e^{x+3}, u'e^{u} dans
    le code, mais l'élève voit un vrai « e » avec son exposant, comme dans son cahier et
    dans le coach (KaTeX). Aucun `Text` ne contient de « ^ ». Contrôle avant chaque rendu :
    `grep -n 'Text(.*\^' manim/scripts/terminale/exp_*.py` doit être vide.
  - **La voix ne change donc pas** : on voit e avec l'exposant x et on entend
    « e puissance x ». La voix et l'écran disent la même chose.
- ⚠️ À l'oral, « e puissance x plus 3 » est ambigu. Règle de la série : **à l'écran,
  l'exposant entier est toujours écrit en hauteur** (tout x + 3 en exposant), et quand
  l'exposant est une somme, la voix le dit une fois en clair (« tout 3x plus 1 est en
  exposant »).
- **On ouvre sur la situation concrète** : la page de garde donne le nom de la notion et
  sa question, puis on entre tout de suite dans la vie de quelqu'un. Ni formule, ni
  objectifs au début.
- **Deux questions-pauses QCM par épisode** (`04` et `07`) + le défi `09`. Compte à rebours
  de 5 s, la bonne réponse grandit puis rétrécit, UNE phrase d'explication.
- **Trois lignes de question au maximum à l'écran.**
- « Ce que tu as appris » : **titre en haut, centré**.
- **Fin (règle du 26/11)**, clé `11-abonne` : « Entraîne-toi sur éleveai point f r, ou sur
  YouTube : éleveai neuf sept quatre ! ». Écran : « Entraîne-toi sur » + « eleveai.fr »
  (encadré), puis « ou sur YouTube » + « @eleveai974 », Ti Margo pouce levé en dessous.
  ⚠️ `manim/fin_commune.py` écrit encore l'ancienne fin : chaque script surcharge son écran
  de fin.

## Ceintures (⚠️ proposition, à confirmer par Frédéric)

| E1 | E2 | E3 | E4 | E5 | E6 |
|---|---|---|---|---|---|
| orange | orange | verte | verte | bleue | noire |

Raison : elles suivent la difficulté de la banque du coach (définition et propriétés
1 à 4 étoiles ; dérivée et équations 2 à 5 ; limites 2 à 5 avec les croissances
comparées ; défi type bac 4 à 5).

## Centres d'intérêt et métiers (tranche 15-18, vérifiés dans `lib/videos/centres-interet.ts`)

| | E1 | E2 | E3 | E4 | E5 | E6 |
|---|---|---|---|---|---|---|
| centre | `reseaux-sociaux` | `sciences` | `sport` | `musique` | `jeux-video` | `corps-sante` |
| métier | community manager | technicienne de laboratoire | préparateur physique | programmatrice radio | concepteur de niveaux | pharmacienne (matrice métiers) |
| personne | Inès | Camille | Malik | Léa | Yanis | Sarah |

Six centres différents, filles et garçons. **0 contexte La Réunion** sur 6 (la règle :
environ 1 sur 25). ⏳ `node scripts/verifier-centres-age.mjs` se relancera sur le
manifeste quand les entrées y seront.

## ⛔ La place de la bonne réponse, tirée au hasard

Tirage à la **graine 2611** sur les 6 paires de lettres distinctes, en rejetant les
tirages déséquilibrés ou qui répètent une lettre d'un épisode au suivant :

| | E1 | E2 | E3 | E4 | E5 | E6 |
|---|---|---|---|---|---|---|
| `04` | **B** | **B** | **C** | **A** | **C** | **C** |
| `07` | **C** | **A** | **B** | **B** | **A** | **A** |

Soit **A 4 · B 4 · C 4** sur 12 questions, deux lettres différentes dans chaque épisode.
L'écran (la lettre qui s'allume) et le champ `reponse` du manifeste (0 = A, 1 = B, 2 = C)
diront la même lettre que la voix.

---

# E1 · `terminale-exp-definition`

**Micro** : `exp_definition` — Comprendre la fonction exponentielle. **Ceinture** : orange (proposée).
**Contexte** : Inès, community manager — centre `reseaux-sociaux`.
**Code couleur** : bleu = la courbe exp(x), ambre = ce qu'on regarde, vert = juste, rouge = le piège.

- **00-garde** : La fonction exponentielle. Quelle fonction grandit exactement à la vitesse de sa propre valeur ?
- **01-situation** : Voici Inès. Elle est community manager : elle s'occupe des comptes d'une marque sur les réseaux sociaux. Une de ses vidéos se met à tourner. Chaque spectateur la montre à d'autres. Alors, plus elle a de vues, plus elle en gagne vite.
- **02-idee** : Traduisons. On appelle f de x le nombre de vues, en millions, au bout de x jours. La vitesse de croissance, c'est la dérivée, f prime. Ici, elle est égale au nombre de vues : f prime égale f. Et au départ, il y a 1 million de vues : f de 0 égale 1. Une seule fonction vérifie ces deux conditions : la fonction exponentielle. On la note e puissance x.
- **03-theoreme** : Ce qu'il faut savoir. La fonction exponentielle est définie sur tous les réels. Sa dérivée, c'est elle-même. e puissance 0 vaut 1. Le nombre e vaut environ 2,72. Et e puissance x est toujours strictement positif. Sa dérivée est donc positive : la fonction est strictement croissante.
- **04-question** : Question ! Combien l'équation e puissance x égale 0 a-t-elle de solutions ? A : une, x égale 0. B : aucune. C : une, x égale 1. Mets pause, et choisis !
- **04b-reponse** : Réponse B. e puissance x est toujours strictement positif : il ne vaut jamais 0. L'équation n'a aucune solution. La réponse A confond avec e puissance 0, qui vaut 1, et pas 0.
- **05-appliquer** : Appliquons : la tangente en 0. La courbe passe par le point de coordonnées 0 et 1. La pente de la tangente, c'est la dérivée en 0 : e puissance 0, soit 1. La tangente a donc pour équation y égale x plus 1. Près de 0, la courbe colle à cette droite, et elle reste toujours au-dessus.
- **06-piege** : Voilà le piège ! e puissance x, ce n'est pas e fois x. e puissance 2, c'est e fois e : environ 7,39. Alors que 2 fois e fait environ 5,44. L'exponentielle se comporte comme une puissance, pas comme un produit.
- **07-question** : Question ! La fonction exponentielle est strictement croissante. Comment se comparent e puissance 2 et e puissance 3 ? A : e puissance 2 est plus grand. B : ils sont égaux. C : e puissance 2 est plus petit. Mets pause, et choisis !
- **07b-reponse** : Réponse C. 2 est plus petit que 3, et une fonction strictement croissante garde l'ordre. Donc e puissance 2 est plus petit que e puissance 3. Pas besoin de calculatrice.
- **08-rediger** : Au bac, on cite les bonnes propriétés. Un : pour tout réel x, e puissance x est strictement positif. Deux : la dérivée de e puissance x est e puissance x. Trois : la dérivée est donc strictement positive, et la fonction est strictement croissante sur tous les réels.
- **09-defi** : À toi de jouer ! Donne une valeur approchée de e puissance moins 1, de e puissance 0 et de e puissance 1. Puis range-les du plus petit au plus grand. Mets pause, et cherche !
- **09b-correction** : Correction. e puissance moins 1 vaut environ 0,37. e puissance 0 vaut exactement 1. e puissance 1, c'est e, environ 2,72. La fonction est croissante : moins 1, 0 et 1 donnent le même ordre. Et les trois sont positifs, même e puissance moins 1.
- **10-finale** : Ce que tu as appris. L'exponentielle est la fonction égale à sa dérivée, qui vaut 1 en 0. Elle est toujours strictement positive, et strictement croissante. Et le nombre e vaut environ 2,72.
- **11-abonne** : Entraîne-toi sur éleveai point f r, ou sur YouTube : éleveai neuf sept quatre !

## ✅ Passe MATHS de E1 (recalculée)

| Clip | Ce que la voix affirme | Recalcul | Verdict |
|---|---|---|---|
| `02` | une seule fonction vérifie f′ = f et f(0) = 1 | théorème d'existence et d'unicité du cours | ✅ |
| `03` | e ≈ 2,72 | e = 2,71828… | ✅ |
| `04b` | exp(x) = 0 n'a aucune solution | exp(x) > 0 pour tout x | ✅ |
| `05` | tangente en 0 : y = x + 1 | y = exp(0)(x − 0) + exp(0) | ✅ |
| `05` | la courbe reste au-dessus de la tangente | exp(x) ≥ x + 1 (convexité) | ✅ |
| `06` | exp(2) ≈ 7,39 ; 2e ≈ 5,44 | 7,389… ; 5,436… | ✅ |
| `09b` | exp(−1) ≈ 0,37 | 0,3679… | ✅ |

---

# E2 · `terminale-exp-proprietes`

**Micro** : `exp_proprietes` — Utiliser les propriétés algébriques de l'exponentielle. **Ceinture** : orange (proposée).
**Contexte** : Camille, technicienne de laboratoire — centre `sciences`.
**Code couleur** : bleu = les exposants qui s'additionnent, rose = ceux qui se soustraient, vert = juste, rouge = le piège.

- **00-garde** : Les propriétés de l'exponentielle. Comment calculer avec des puissances de e, sans calculatrice ?
- **01-situation** : Voici Camille. Elle est technicienne dans un laboratoire de biologie, et elle fait pousser des levures. Le matin, leur nombre est multiplié par e puissance 2. L'après-midi, il est encore multiplié par e puissance 3. Par combien a-t-il été multiplié sur toute la journée ?
- **02-idee** : Sur la journée, on multiplie : e puissance 2, fois e puissance 3. e puissance 2, ce sont deux facteurs e. e puissance 3, ce sont trois facteurs e. En tout, cinq facteurs e : e puissance 5. Les exposants s'additionnent.
- **03-theoreme** : Les règles, pour tous réels a et b. e puissance a, fois e puissance b, égale e puissance a plus b. e puissance a, divisé par e puissance b, égale e puissance a moins b. e puissance moins a égale 1 sur e puissance a. Et e puissance a, le tout puissance n, égale e puissance n fois a.
- **04-question** : Question ! Que vaut e puissance 5, divisé par e puissance 2 ? A : e puissance 2,5. B : e puissance 3. C : e puissance 7. Mets pause, et choisis !
- **04b-reponse** : Réponse B. Pour une division, on soustrait les exposants : 5 moins 2 fait 3. La réponse A divise les exposants, et la réponse C les additionne.
- **05-appliquer** : Appliquons. Le soir, Camille dilue sa culture : le nombre de levures est multiplié par e puissance moins 3. Sur la journée entière, e puissance 5 fois e puissance moins 3 donne e puissance 2. Et multiplier par e puissance moins 3, c'est diviser par e puissance 3.
- **06-piege** : Voilà le piège ! e puissance a, plus e puissance b, ce n'est pas e puissance a plus b. La règle marche pour un produit, pas pour une somme. Par exemple, e puissance 1 plus e puissance 1 fait 2 fois e, environ 5,44. Alors que e puissance 2 vaut environ 7,39.
- **07-question** : Question ! Simplifie : e puissance x, le tout au carré, fois e puissance moins x. A : e puissance x. B : e puissance x au carré. C : 1. Mets pause, et choisis !
- **07b-reponse** : Réponse A. e puissance x, le tout au carré, égale e puissance 2x : on double l'exposant. Puis e puissance 2x fois e puissance moins x : 2x moins x fait x. Il reste e puissance x. La réponse B met le carré sur x, au lieu de doubler l'exposant.
- **08-rediger** : Au bac, on écrit chaque étape avec la règle utilisée. Un : on transforme les puissances de puissances. Deux : on regroupe les produits et les quotients en un seul exposant. Trois : on simplifie cet exposant.
- **09-defi** : À toi de jouer ! Simplifie : e puissance 4, fois e puissance moins 1, le tout divisé par e puissance 2. Mets pause, et cherche !
- **09b-correction** : Correction. En haut, e puissance 4 fois e puissance moins 1 : 4 moins 1 fait 3, donc e puissance 3. Puis on divise par e puissance 2 : 3 moins 2 fait 1. Le résultat est e puissance 1, c'est-à-dire e, environ 2,72.
- **10-finale** : Ce que tu as appris. Pour un produit, on additionne les exposants. Pour un quotient, on les soustrait. e puissance moins a, c'est 1 sur e puissance a. Et une somme de puissances de e ne se simplifie pas comme un produit.
- **11-abonne** : Entraîne-toi sur éleveai point f r, ou sur YouTube : éleveai neuf sept quatre !

## ✅ Passe MATHS de E2 (recalculée)

| Clip | Ce que la voix affirme | Recalcul | Verdict |
|---|---|---|---|
| `02` | exp(2) × exp(3) = exp(5) | 2 + 3 = 5 | ✅ |
| `04b` | exp(5) / exp(2) = exp(3) | 5 − 2 = 3 | ✅ |
| `05` | exp(5) × exp(−3) = exp(2) | 5 − 3 = 2 | ✅ |
| `06` | e + e = 2e ≈ 5,44 ≠ exp(2) ≈ 7,39 | 5,436… ; 7,389… | ✅ |
| `07b` | (exp(x))² × exp(−x) = exp(x) | exp(2x) × exp(−x) = exp(2x − x) | ✅ |
| `09b` | exp(4) × exp(−1) / exp(2) = e | 4 − 1 − 2 = 1 | ✅ |

---

# E3 · `terminale-exp-deriver`

**Micro** : `exp_deriver` — Dériver une expression contenant une exponentielle. **Ceinture** : verte (proposée).
**Contexte** : Malik, préparateur physique d'un club de handball — centre `sport`.
**Code couleur** : bleu = l'exposant u, orange = u prime, vert = juste, rouge = le piège.

- **00-garde** : Dériver avec l'exponentielle. Comment dériver e puissance u, quand u est une fonction ?
- **01-situation** : Voici Malik. Il est préparateur physique dans un club de handball. Après un sprint, il suit le cœur d'une joueuse. À la fin de l'effort, il bat à 160 battements par minute. Puis il redescend. Malik veut savoir à quelle vitesse.
- **02-idee** : Le modèle de Malik : F de t égale 60 plus 100 fois e puissance moins 0,5 t. Ici, t est le temps en minutes. En t égale 0, e puissance 0 vaut 1, donc F de 0 égale 160. La vitesse à laquelle le cœur redescend, c'est la dérivée, F prime.
- **03-theoreme** : La règle. La dérivée de e puissance u, c'est u prime fois e puissance u. On garde l'exponentielle telle quelle, et on la multiplie par la dérivée de son exposant. Par exemple, la dérivée de e puissance 2x, c'est 2 fois e puissance 2x.
- **04-question** : Question ! Quelle est la dérivée de e puissance moins x ? A : e puissance moins x. B : moins x fois e puissance moins x. C : moins e puissance moins x. Mets pause, et choisis !
- **04b-reponse** : Réponse C. Ici, u égale moins x, donc u prime égale moins 1. La dérivée est moins 1 fois e puissance moins x. La réponse A oublie u prime. La réponse B multiplie par u, au lieu de u prime.
- **05-appliquer** : Appliquons au cœur de la joueuse. La constante 60 a pour dérivée 0. Pour 100 fois e puissance moins 0,5 t : u égale moins 0,5 t, et u prime égale moins 0,5. Donc F prime de t égale 100 fois moins 0,5, fois e puissance moins 0,5 t. Soit moins 50 fois e puissance moins 0,5 t. En t égale 0, F prime vaut moins 50 : juste après l'effort, le cœur perd 50 battements par minute, à chaque minute.
- **06-piege** : Voilà le piège ! Dans x fois e puissance x, il y a un produit. On ne dérive pas seulement e puissance x. On utilise la règle du produit : u prime v, plus u v prime. Ici : 1 fois e puissance x, plus x fois e puissance x. On factorise : 1 plus x, fois e puissance x.
- **07-question** : Question ! Quelle est la dérivée de 5 fois e puissance 2x ? A : 5 fois e puissance 2x. B : 10 fois e puissance 2x. C : 2 fois e puissance 2x. Mets pause, et choisis !
- **07b-reponse** : Réponse B. La constante 5 reste devant. La dérivée de e puissance 2x est 2 fois e puissance 2x. Et 5 fois 2 fait 10. La réponse C perd le 5, et la réponse A oublie le 2.
- **08-rediger** : Au bac, trois lignes. Un : on nomme u, l'exposant, et on calcule u prime. Deux : on applique la règle, u prime fois e puissance u. Trois : on factorise par l'exponentielle, pour étudier le signe facilement, car e puissance u est toujours positif.
- **09-defi** : À toi de jouer ! Dérive f de x égale e puissance 3x plus 1 : tout 3x plus 1 est en exposant. Puis dérive g de x égale e puissance x au carré : x au carré est en exposant. Mets pause, et cherche !
- **09b-correction** : Correction. Pour f, u égale 3x plus 1, et u prime égale 3. Donc f prime de x égale 3 fois e puissance 3x plus 1. Pour g, u égale x au carré, et u prime égale 2x. Donc g prime de x égale 2x fois e puissance x au carré.
- **10-finale** : Ce que tu as appris. La dérivée de e puissance u, c'est u prime fois e puissance u. Une constante devant reste devant. Et pour un produit, on utilise la règle du produit, puis on factorise par l'exponentielle.
- **11-abonne** : Entraîne-toi sur éleveai point f r, ou sur YouTube : éleveai neuf sept quatre !

## ✅ Passe MATHS de E3 (recalculée)

| Clip | Ce que la voix affirme | Recalcul | Verdict |
|---|---|---|---|
| `02` | F(0) = 160 | 60 + 100 × 1 | ✅ |
| `03` | (exp(2x))′ = 2exp(2x) | u′ = 2 | ✅ |
| `04b` | (exp(−x))′ = −exp(−x) | u′ = −1 | ✅ |
| `05` | F′(t) = −50 exp(−0,5t) ; F′(0) = −50 | 100 × (−0,5) = −50 ; exp(0) = 1 | ✅ |
| `06` | (x exp(x))′ = (1 + x) exp(x) | 1·exp(x) + x·exp(x) | ✅ |
| `07b` | (5exp(2x))′ = 10 exp(2x) | 5 × 2 | ✅ |
| `09b` | (exp(3x+1))′ = 3exp(3x+1) ; (exp(x²))′ = 2x exp(x²) | u′ = 3 ; u′ = 2x | ✅ |

---

# E4 · `terminale-exp-equation-inequation`

**Micro** : `exp_equation_inequation` — Résoudre une équation ou inéquation avec exponentielle. **Ceinture** : verte (proposée).
**Contexte** : Léa, programmatrice dans une radio — centre `musique`.
**Code couleur** : bleu = titre 1 (exp(2x)), rose = titre 2 (exp(x+3)), vert = juste, rouge = le piège.

- **00-garde** : Équations et inéquations avec l'exponentielle. Comment trouver x, quand il est caché dans l'exposant ?
- **01-situation** : Voici Léa. Elle est programmatrice dans une radio. Deux titres montent en streaming. Au bout de x semaines, le premier en est à e puissance 2x milliers d'écoutes. Le second, à e puissance x plus 3 milliers : tout x plus 3 est en exposant. Le premier part plus bas, mais grimpe plus vite. Quand va-t-il rattraper le second ?
- **02-idee** : On cherche x tel que e puissance 2x égale e puissance x plus 3. L'exponentielle est strictement croissante : deux exposants différents donnent toujours deux résultats différents. Donc, si les exponentielles sont égales, les exposants sont égaux.
- **03-theoreme** : Les règles, pour tous réels A et B. e puissance A égale e puissance B, si et seulement si A égale B. Et e puissance A est plus petit que e puissance B, si et seulement si A est plus petit que B. L'inégalité garde son sens, parce que la fonction est croissante.
- **04-question** : Question ! Résous e puissance x plus 1 égale e puissance 4. Que vaut x ? A : 3. B : 4. C : 5. Mets pause, et choisis !
- **04b-reponse** : Réponse A. Les exposants sont égaux : x plus 1 égale 4, donc x égale 3. La réponse B oublie le plus 1. La réponse C ajoute 1, au lieu de l'enlever.
- **05-appliquer** : Revenons à Léa. e puissance 2x égale e puissance x plus 3 donne 2x égale x plus 3. On enlève x des deux côtés : x égale 3. Au bout de 3 semaines, les deux titres ont autant d'écoutes : e puissance 6 milliers, environ 403 mille.
- **06-piege** : Voilà le piège ! Une équation comme e puissance x égale 0, ou e puissance x égale moins 2, n'a aucune solution, car e puissance x est toujours strictement positif. Avant de résoudre, on regarde donc le signe de l'autre membre. Et pour e puissance x égale 1, on écrit 1 comme e puissance 0 : x égale 0.
- **07-question** : Question ! Résous l'inéquation e puissance x plus petit que e puissance 2. Quelles sont les solutions ? A : de 2, exclu, à plus l'infini. B : de moins l'infini à 2, exclu. C : aucune solution. Mets pause, et choisis !
- **07b-reponse** : Réponse B. L'inégalité garde son sens : e puissance x plus petit que e puissance 2 donne x plus petit que 2. Les solutions vont de moins l'infini à 2, exclu. La réponse A retourne l'inégalité, comme si la fonction était décroissante.
- **08-rediger** : Au bac, trois lignes. Un : on écrit les deux membres sous la forme e puissance quelque chose. Deux : on cite la propriété : la fonction exponentielle est strictement croissante. Trois : on résout sur les exposants, et on donne l'ensemble des solutions.
- **09-defi** : À toi de jouer ! À partir de quand le premier titre dépasse-t-il le second ? Résous e puissance 2x plus grand que e puissance x plus 3. Mets pause, et cherche !
- **09b-correction** : Correction. La fonction est strictement croissante, donc l'inégalité garde son sens : 2x plus grand que x plus 3. On enlève x : x plus grand que 3. Les solutions vont de 3, exclu, à plus l'infini. Après 3 semaines, le premier titre est devant.
- **10-finale** : Ce que tu as appris. e puissance A égale e puissance B revient à A égale B. Une inégalité entre deux exponentielles garde son sens. Et e puissance x égale un nombre négatif ou nul n'a aucune solution.
- **11-abonne** : Entraîne-toi sur éleveai point f r, ou sur YouTube : éleveai neuf sept quatre !

## ✅ Passe MATHS de E4 (recalculée)

| Clip | Ce que la voix affirme | Recalcul | Verdict |
|---|---|---|---|
| `01` | le premier part plus bas | en x = 0 : exp(0) = 1 < exp(3) ≈ 20,1 | ✅ |
| `04b` | exp(x+1) = exp(4) ⟹ x = 3 | x + 1 = 4 | ✅ |
| `05` | 2x = x + 3 ⟹ x = 3 ; exp(6) ≈ 403 | exp(6) = 403,43… | ✅ |
| `06` | exp(x) = 1 ⟹ x = 0 | 1 = exp(0) | ✅ |
| `07b` | exp(x) < exp(2) ⟺ x ∈ ]−∞ ; 2[ | croissance stricte | ✅ |
| `09b` | exp(2x) > exp(x+3) ⟺ x > 3 | 2x > x + 3 | ✅ |

---

# E5 · `terminale-exp-limite`

**Micro** : `exp_limite` — Étudier une limite avec exponentielle. **Ceinture** : bleue (proposée).
**Contexte** : Yanis, concepteur de niveaux dans un studio de jeux vidéo — centre `jeux-video`.
**Code couleur** : bleu = les ennemis (exp(x)), vert = le joueur (x³), ambre = ce qu'on regarde, rouge = le piège.

- **00-garde** : Limites avec l'exponentielle. Qui gagne la course vers l'infini : l'exponentielle, ou les puissances de x ?
- **01-situation** : Voici Yanis. Il est concepteur de niveaux dans un studio de jeux vidéo. Dans son jeu, au niveau x, la force du joueur vaut x au cube. Et celle des ennemis vaut e puissance x. Au niveau 2, le joueur est devant. Mais Yanis veut savoir qui gagne quand les niveaux deviennent très grands.
- **02-idee** : D'abord, les deux limites de base. Quand x tend vers plus l'infini, e puissance x tend vers plus l'infini. Quand x tend vers moins l'infini, e puissance x tend vers 0. La courbe s'approche de l'axe des abscisses sans jamais le toucher : la droite d'équation y égale 0 est une asymptote en moins l'infini.
- **03-theoreme** : Les croissances comparées. Pour tout entier naturel n, e puissance x divisé par x puissance n tend vers plus l'infini, quand x tend vers plus l'infini. En plus l'infini, l'exponentielle l'emporte sur toute puissance de x. Et en moins l'infini, x puissance n fois e puissance x tend vers 0.
- **04-question** : Question ! Quand x tend vers plus l'infini, vers quoi tend 1 sur e puissance x ? A : plus l'infini. B : 1. C : 0. Mets pause, et choisis !
- **04b-reponse** : Réponse C. Le dénominateur, e puissance x, devient immense. 1 divisé par un nombre immense devient tout petit : la limite est 0. La réponse A oublie qu'on divise par l'exponentielle.
- **05-appliquer** : Revenons à Yanis. Au niveau 2, le joueur est devant : 2 au cube fait 8, et e puissance 2 vaut environ 7,39. Mais e puissance x divisé par x au cube tend vers plus l'infini. Au niveau 10, e puissance 10 vaut environ 22 026, contre 1 000 pour le joueur. Les ennemis finissent toujours par l'emporter.
- **06-piege** : Voilà le piège ! En plus l'infini, e puissance x moins x donne plus l'infini moins plus l'infini : c'est une forme indéterminée. On ne conclut pas tout de suite. On factorise par x : x fois, e puissance x sur x, moins 1. e puissance x sur x tend vers plus l'infini, donc la parenthèse aussi, et le produit tend vers plus l'infini.
- **07-question** : Question ! Quand x tend vers plus l'infini, vers quoi tend x fois e puissance moins x ? A : 0. B : plus l'infini. C : 1. Mets pause, et choisis !
- **07b-reponse** : Réponse A. x fois e puissance moins x, c'est x divisé par e puissance x. Par croissances comparées, l'exponentielle l'emporte au dénominateur : le quotient tend vers 0. La réponse B ne regarde que le facteur x.
- **08-rediger** : Au bac, on nomme toujours l'argument. Un : on repère la forme, et on dit si elle est indéterminée. Deux : on factorise, ou on réécrit, pour faire apparaître e puissance x sur x puissance n. Trois : on conclut en écrivant « par croissances comparées ».
- **09-defi** : À toi de jouer ! Quand x tend vers plus l'infini, vers quoi tend e puissance x, divisé par x plus 1 ? Mets pause, et cherche !
- **09b-correction** : Correction. On a plus l'infini sur plus l'infini : une forme indéterminée. On écrit le quotient comme e puissance x sur x, fois x sur x plus 1. Par croissances comparées, e puissance x sur x tend vers plus l'infini. Et x sur x plus 1 tend vers 1. Le produit tend donc vers plus l'infini.
- **10-finale** : Ce que tu as appris. e puissance x tend vers plus l'infini en plus l'infini, et vers 0 en moins l'infini. En plus l'infini, l'exponentielle l'emporte sur toute puissance de x. Et devant une forme indéterminée, on factorise avant de conclure.
- **11-abonne** : Entraîne-toi sur éleveai point f r, ou sur YouTube : éleveai neuf sept quatre !

## ✅ Passe MATHS de E5 (recalculée)

| Clip | Ce que la voix affirme | Recalcul | Verdict |
|---|---|---|---|
| `01`/`05` | au niveau 2 le joueur est devant : 8 contre ≈ 7,39 | 2³ = 8 > exp(2) = 7,389… | ✅ |
| `03` | exp(x) / xⁿ → +∞ ; xⁿ exp(x) → 0 en −∞ | croissances comparées (n entier naturel) | ✅ |
| `04b` | 1/exp(x) → 0 | 1 / (+∞) | ✅ |
| `05` | exp(10) ≈ 22 026 ; 10³ = 1 000 | 22 026,47… | ✅ |
| `06` | exp(x) − x = x (exp(x)/x − 1) → +∞ | +∞ × +∞ | ✅ |
| `07b` | x exp(−x) = x / exp(x) → 0 | croissances comparées | ✅ |
| `09b` | exp(x)/(x+1) = (exp(x)/x) × (x/(x+1)) → +∞ | +∞ × 1 | ✅ |

---

# E6 · `terminale-exp-defi`

**Micro** : `exp_defi` — Résoudre un exercice type bac avec exponentielle. **Ceinture** : noire (proposée).
**Contexte** : Sarah, pharmacienne à l'hôpital (matrice métiers) — centre `corps-sante`.
**Code couleur** : bleu = la courbe C, orange = le signe de C′, vert = juste et le maximum, rouge = le piège.

- **00-garde** : Exercice type bac sur l'exponentielle. Comment étudier une fonction de bout en bout, de la dérivée à la limite ?
- **01-situation** : Voici Sarah. Elle est pharmacienne à l'hôpital. Un patient reçoit une piqûre dans le muscle. Le médicament passe dans le sang, puis le corps l'élimine. Sarah veut savoir à quel moment il y en a le plus dans le sang, et ce que devient la quantité ensuite.
- **02-idee** : Le modèle : C de t égale 10 t fois e puissance moins t. C est la concentration, en milligrammes par litre, et t le temps, en heures, à partir de 0. En t égale 0, C vaut 0 : le médicament n'est pas encore dans le sang. Pour trouver le maximum, on étudie le signe de la dérivée.
- **03-theoreme** : La méthode du bac, en quatre temps. Un : dériver. Deux : étudier le signe de la dérivée. Trois : dresser le tableau de variations, avec le maximum. Quatre : calculer la limite en plus l'infini. On les fait un par un.
- **04-question** : Question ! Pour dériver 10 t fois e puissance moins t, quelle règle utilise-t-on d'abord ? A : la dérivée de e puissance u, seule. B : la dérivée d'un quotient. C : la dérivée d'un produit. Mets pause, et choisis !
- **04b-reponse** : Réponse C. C'est un produit : 10 t, fois e puissance moins t. On dérive chaque facteur : 10 t donne 10, et e puissance moins t donne moins e puissance moins t. La réponse A oublie le facteur 10 t.
- **05-appliquer** : Dérivons. C prime de t égale 10 fois e puissance moins t, plus 10 t fois moins e puissance moins t. On factorise par 10 fois e puissance moins t : C prime de t égale 10, fois 1 moins t, fois e puissance moins t.
- **06-piege** : Voilà le piège ! Le signe de C prime ne se lit pas d'un coup d'œil. Il faut écrire la phrase clé : e puissance moins t est strictement positif, et 10 aussi. Donc C prime de t a le signe de 1 moins t. Sans cette phrase, au bac, la justification est incomplète.
- **07-question** : Question ! C prime de t a le signe de 1 moins t. Sur quel intervalle la concentration augmente-t-elle ? A : de 0 à 1. B : de 1 à plus l'infini. C : de 0 à 10. Mets pause, et choisis !
- **07b-reponse** : Réponse A. 1 moins t est positif quand t est plus petit que 1. Donc C est croissante de 0 à 1, puis décroissante après 1. La concentration monte pendant la première heure, puis elle baisse. La réponse C confond avec le coefficient 10.
- **08-rediger** : Le maximum est atteint en t égale 1. C de 1 égale 10 fois 1 fois e puissance moins 1, soit 10 sur e : environ 3,68 milligrammes par litre, au bout d'une heure. Au bac, on l'écrit dans le tableau de variations : croissante, puis le maximum 10 sur e en 1, puis décroissante.
- **09-defi** : À toi de jouer ! Que devient la concentration à long terme ? Calcule la limite de 10 t fois e puissance moins t, quand t tend vers plus l'infini. Mets pause, et cherche !
- **09b-correction** : Correction. 10 t fois e puissance moins t, c'est 10 fois t sur e puissance t. Par croissances comparées, t sur e puissance t tend vers 0. Donc la concentration tend vers 0 : le médicament finit par quitter le sang. L'axe des abscisses est une asymptote à la courbe en plus l'infini.
- **10-finale** : Ce que tu as appris. Pour un produit avec une exponentielle, on dérive avec la règle du produit, puis on factorise. Le signe de la dérivée vient du facteur qui n'est pas l'exponentielle. Et la limite se règle par croissances comparées.
- **11-abonne** : Entraîne-toi sur éleveai point f r, ou sur YouTube : éleveai neuf sept quatre !

## ✅ Passe MATHS de E6 (recalculée)

| Clip | Ce que la voix affirme | Recalcul | Verdict |
|---|---|---|---|
| `02` | C(0) = 0 | 10 × 0 × 1 | ✅ |
| `05` | C′(t) = 10 (1 − t) exp(−t) | 10exp(−t) + 10t(−exp(−t)) | ✅ |
| `07b` | C croissante sur [0 ; 1], décroissante après | signe de 1 − t | ✅ |
| `08` | C(1) = 10/e ≈ 3,68 | 3,6788… | ✅ |
| `09b` | 10t exp(−t) = 10 t/exp(t) → 0 | croissances comparées | ✅ |

---

## ⏳ Après le « oui » de Frédéric

1. Extraire les voix en JSON (`manim/voix/terminale-exp-*.json`), WAV + marques.
2. Scripts `manim/scripts/terminale/exp_*.py`, écran de fin surchargé (règle du 26/11).
3. Dry run (0 AVANCE, 0 BORD), aperçus `-ql`, planches regardées (barre du compte à rebours
   présente, rien de rogné).
4. HD un par un (un seul rendu sur le poste, ≥ 2,5 Go libres), R2 (Content-Length = taille
   locale), manifeste, `videos-r2.json`, `COUPE_PAR_VIDEO` mesurée dans chaque MP4,
   lignes `notion_ressources`.
