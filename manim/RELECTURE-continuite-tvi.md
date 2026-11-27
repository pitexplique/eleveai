# RELECTURE — série « CONTINUITÉ ET TVI », terminale spé

> ⛔ **FICHIER GÉNÉRÉ. Ne pas l'éditer.** On corrige
> `manim/REPRISE-continuite-tvi.md` (§ 5), puis on relance :
> `python -X utf8 manim/poste2/verifier-accroches-continuite-tvi.py --relire`

Les titres et les accroches des 5 paysages, chacun **en face des cartes qu'il
annonce**. Rien ici n'est recopié : tout est relu dans le manifeste.

## Les trois choses à trancher

1. **Les 5 titres et les 5 accroches** ci-dessous. La question à se poser pour chacun :
   *est-ce qu'un élève qui se souvient de cette phrase peut éliminer une carte sans
   réfléchir ?* L'instrument mesure les mots, il ne mesure pas le sens.
2. **E3, deux points volontaires** (⛔ ce ne sont pas des défauts) :
   · son titre « Une seule fois au kilomètre cent » installe exactement le réflexe que
     sa question `04` mesure — dont la bonne réponse est « aucune » ;
   · la dernière puce de son accroche oppose « croissante » et « strictement
     croissante » : elle NOMME la monotonie, qui est la bonne réponse de sa question
     `07`. Mesure : 33 %, sous le seuil, parce qu'elle ne dit pas que c'est elle qui
     manque dans la copie.
3. **Les cartes écrites en symboles** (marquées ⚠ ci-dessous) : l'écran écrit
   « ]0 ; +∞[ », la voix dit « zéro plus l'infini, crochets ouverts ». Les deux sont
   justes, et aucune machine ne peut vérifier qu'elles disent la même chose.

---

## E1 · `terminale-continuite-reconnaitre`

### Titre

> **Le compteur saute, la cabine non — Reconnaître une fonction continue · Tle spé**

### Accroche

> Kévin suit deux écrans en salle de régulation. L'altitude de la cabine : elle monte de
> 40 à 180 mètres et passe par toutes les valeurs du chemin. Le compteur de passagers :
> il saute de 1 à 2, et ne vaut jamais 1,5. Deux courbes, deux mondes — et c'est toute la
> différence entre continue et pas continue.
>
> Dans cette vidéo :
> • la définition : f est continue en a quand la limite en a vaut f(a)
> • deux morceaux recollés : ce qu'on compare, et où
> • le catalogue du bac : polynômes, racine, exponentielle, logarithme, et les quotients
> • une fonction rationnelle se déclare **intervalle par intervalle**, jamais d'un bloc
> • continue et dérivable, ce n'est pas la même chose — et une seule des deux entraîne
> l'autre
>

### Les cartes que ce titre et cette accroche annoncent

| | proposition | | titre | accroche |
|---|---|---|---|---|
| `04` **A** | oui, les deux morceaux valent 4 en 2 | ✅ | 0% | 33% |
| `04` **B** | non, il y a un saut de 2 unités |  | 25% | 25% |
| `04` **C** | il faudrait connaître la dérivée |  | 0% | 0% |
| `07` **A** | sur ℝ tout entier ⚠ |  | 0% | 0% |
| `07` **B** | sur ]0 ; +∞[ ⚠ | ✅ | 0% | 0% |
| `07` **C** | sur [0 ; +∞[ ⚠ |  | 0% | 0% |

⭐ Le pourcentage est la part des mots d'une carte que contient **un
seul segment** du titre ou de l'accroche. Au-delà de 50 %, l'instrument crie
(seuil étalonné sur les deux titres fautifs de la série espace). ⚠ = carte
écrite en symboles : non vérifiable par la machine.

---

## E2 · `terminale-tvi-appliquer`

### Titre

> **Le théorème qui prouve sans calculer — Appliquer le TVI · Tle spé**

### Accroche

> À six heures, Léa relève −2 °C au sommet du Maïdo. À midi, 14 °C. Elle n'a pas regardé
> entre les deux, et elle peut pourtant affirmer qu'il a fait exactement 0 °C à un moment.
> Sans savoir quand. C'est le théorème des valeurs intermédiaires, et c'est un des rares
> endroits des maths où on prouve qu'une chose existe sans jamais la trouver.
>
> Dans cette vidéo :
> • l'énoncé exact : f continue sur [a ; b], et k compris entre f(a) et f(b)
> • le cas k = 0, celui du bac, et ce que « signes contraires » veut dire
> • un exemple complet sur x⁵ + 3x − 5 entre 1 et 2
> • **le piège : ce que le théorème ne dit pas quand f(a) et f(b) ont le même signe**
> • ramener une équation à f(x) = 0 avant de commencer
>

### Les cartes que ce titre et cette accroche annoncent

| | proposition | | titre | accroche |
|---|---|---|---|---|
| `04` **A** | non, f ne s'annule pas |  | 0% | 0% |
| `04` **B** | on ne peut pas conclure |  | 0% | 0% |
| `04` **C** | oui, au moins une | ✅ | 0% | 0% |
| `07` **A** | rien : 0 n'est pas entre 2 et 8 | ✅ | 0% | 40% |
| `07` **B** | qu'il y a au moins une solution |  | 0% | 33% |
| `07` **C** | qu'il n'y a aucune solution |  | 0% | 25% |

⭐ Le pourcentage est la part des mots d'une carte que contient **un
seul segment** du titre ou de l'accroche. Au-delà de 50 %, l'instrument crie
(seuil étalonné sur les deux titres fautifs de la série espace). ⚠ = carte
écrite en symboles : non vérifiable par la machine.

---

## E3 · `terminale-tvi-unicite`

### Titre

> **Une seule fois au kilomètre cent — Justifier l'unicité d'une solution · Tle spé**

### Accroche

> Mathis est quelque part entre Cilaos et Grand-Îlet. Sa distance parcourue depuis le
> départ ne saute pas et ne recule jamais : il est passé au kilomètre cent une fois, et
> une seule. Un marcheur qui ferait demi-tour, lui, pourrait y repasser trois fois. Toute
> la différence entre « il existe une solution » et « il en existe une seule » tient dans
> cette phrase.
>
> Dans cette vidéo :
> • le théorème des valeurs intermédiaires donne l'existence — et jamais autre chose
> • ce qu'il faut lui ajouter pour écrire « unique », et comment on le justifie
> • le corollaire du TVI, aussi appelé théorème de la bijection
> • un exemple complet sur eˣ + x − 4 entre 0 et 2
> • le piège : « croissante » et « strictement croissante » ne valent pas le même nombre
> de points, parce qu'elles ne disent pas la même chose
>

### Les cartes que ce titre et cette accroche annoncent

| | proposition | | titre | accroche |
|---|---|---|---|---|
| `04` **A** | une seule, g est monotone |  | 50% | 50% |
| `04` **B** | on ne peut pas le savoir |  | 0% | 0% |
| `04` **C** | aucune, 0 n'est jamais atteint | ✅ | 0% | 20% |
| `07` **A** | que f soit dérivable sur [0 ; 6] ⚠ |  | 0% | 25% |
| `07` **B** | que f soit strictement monotone | ✅ | 0% | 33% |
| `07` **C** | rien, on peut déjà l'écrire |  | 0% | 0% |

⭐ Le pourcentage est la part des mots d'une carte que contient **un
seul segment** du titre ou de l'accroche. Au-delà de 50 %, l'instrument crie
(seuil étalonné sur les deux titres fautifs de la série espace). ⚠ = carte
écrite en symboles : non vérifiable par la machine.

---

## E4 · `terminale-tvi-rediger`

### Titre

> **Il a trouvé la bonne réponse et perdu les points — Rédiger le TVI au bac · Tle spé**

### Accroche

> Yoan a écrit la bonne conclusion : l'équation a une unique solution. Il a eu le quart
> des points. Ce qui manquait n'était pas le résultat — c'étaient les phrases qui
> autorisent à l'écrire. Dans un exercice de TVI, chaque ligne de la copie répond à une
> hypothèse du théorème, et une hypothèse non citée est une ligne non payée.
>
> Dans cette vidéo :
> • le théorème et la copie posés côte à côte : une hypothèse, une phrase
> • la formule exacte à citer, et pourquoi « d'après le TVI » ne suffit pas pour l'unicité
> • une copie complète sur 2 ln x + x − 4, où la continuité se justifie vraiment
> • trois phrases qui coûtent des points chaque année
> • deux copies à réparer : il manque une ligne, puis deux
>

### Les cartes que ce titre et cette accroche annoncent

| | proposition | | titre | accroche |
|---|---|---|---|---|
| `04` **A** | à dire que 0 est entre f(1) et f(3) | ✅ | 0% | 0% |
| `04` **B** | à dire que f est continue |  | 0% | 0% |
| `04` **C** | à dire que f est strictement monotone |  | 0% | 0% |
| `07` **A** | la valeur approchée de la solution |  | 0% | 33% |
| `07` **B** | le calcul de h(3) |  | 0% | 0% |
| `07` **C** | la stricte monotonie de h | ✅ | 0% | 0% |

⭐ Le pourcentage est la part des mots d'une carte que contient **un
seul segment** du titre ou de l'accroche. Au-delà de 50 %, l'instrument crie
(seuil étalonné sur les deux titres fautifs de la série espace). ⚠ = carte
écrite en symboles : non vérifiable par la machine.

---

## E5 · `terminale-tvi-defi`

### Titre

> **Le théorème ne dit rien, et pourtant elle s'annule — Continuité et TVI, type bac · Tle spé**

### Accroche

> Sur l'écran de Ryan, une courbe : l'écart entre l'inclinaison mesurée du volcan et celle
> que prévoit le modèle. Quand l'écart vaut zéro, le modèle tombe juste. Au début de la
> matinée l'écart est positif, à la fin aussi — et pourtant la courbe a croisé le zéro en
> chemin. Un exercice de bac complet commence toujours par là : regarder comment la
> fonction varie avant de chercher où elle s'annule.
>
> Dans cette vidéo :
> • pourquoi appliquer le théorème sur tout l'intervalle fait rater des solutions
> • les variations d'abord : le signe de f′, puis le tableau
> • le théorème appliqué sur **chaque morceau strictement monotone**, un par un
> • un morceau où il n'y a rien à trouver, et comment on l'écrit quand même
> • l'encadrement à la calculatrice, et ce qu'on a le droit d'en conclure
>

### Les cartes que ce titre et cette accroche annoncent

| | proposition | | titre | accroche |
|---|---|---|---|---|
| `04` **A** | une seule |  | 0% | 0% |
| `04` **B** | exactement deux | ✅ | 0% | 0% |
| `04` **C** | au moins une, sans pouvoir dire combien |  | 0% | 0% |
| `07` **A** | 0,3 < α < 0,4 ⚠ | ✅ | 0% | 0% |
| `07` **B** | α ≈ 0,13 ⚠ |  | 0% | 0% |
| `07` **C** | 0,13 < α < 0,14 ⚠ |  | 0% | 0% |

⭐ Le pourcentage est la part des mots d'une carte que contient **un
seul segment** du titre ou de l'accroche. Au-delà de 50 %, l'instrument crie
(seuil étalonné sur les deux titres fautifs de la série espace). ⚠ = carte
écrite en symboles : non vérifiable par la machine.

---

