# Voix — série « CONTINUITÉ ET TVI », terminale spé (27/11/2026)

**5 épisodes PAYSAGE = les 5 micro-compétences du coach** de la notion `continuite_tvi`.
Le manifeste (titres, accroches, chapitres, questions) est dans
`manim/REPRISE-continuite-tvi.md` : **c'est lui la référence**, ce fichier-ci le met en voix.

> ✅ **ÉTAT : les 5 épisodes sont écrits — 75 clips.**
> ⛔ **Et aucun WAV n'est enregistré, volontairement** : les titres et les accroches
> attendent la relecture de Frédéric, et un mot qui change après l'enregistrement coûte
> un WAV et un rendu. Le texte se corrige pour rien ; le WAV, non.
> Contrôle : `verifier-accroches-continuite-tvi.py --voix`.

> ⛔ **Ce fichier sera la source de vérité des voix.** Les JSON de `manim/voix/` en seront
> EXTRAITS. Après extraction, ⛔ ne plus éditer les JSON : on corrige ici et on relance.
> ⚠️ L'extracteur de cette série n'existe pas encore : il se recopiera de
> `manim/poste2/voix-espace-depuis-md.py`.

## Les règles d'écriture de cette série

- **Tout en toutes lettres** : « x au cube », « moins l'infini », « logarithme népérien »,
  « f de a ». ⛔ Aucun symbole, aucun LaTeX : c'est une voix, elle est LUE à haute voix.
- Un épisode = **15 clips**, le gabarit de la terminale : `00-garde`, `01-situation`,
  `02-idee`, `03-theoreme`, `04-question`, `04b-reponse`, `05-appliquer`, `06-piege`,
  `07-question`, `07b-reponse`, `08-rediger`, `09-defi`, `09b-correction`, `10-finale`,
  `11-abonne`.
- ⭐ **Trois lignes de question à l'écran au MAXIMUM** : à quatre, les cartes descendent
  sur Ti Margo et lui coupent la tête.
- ⭐ **La question dit à l'écran exactement ce que la voix dit, mot pour mot.**
- ⭐ Un clip `04-question` se termine toujours par « Mets pause, et choisis ! », un
  `09-defi` par « Mets pause, et cherche ! » : c'est sur ces mots que l'écran bascule.
- ⭐ Un clip de réponse commence par « Réponse A. », « Réponse B. » ou « Réponse C. », et
  **il explique au moins un leurre** : c'est là que l'erreur se travaille.
- Plafond de phrase : **30 mots de prose** (lettres seules et nombres non comptés).
- ⛔ Chaque nombre dit dans une CORRECTION ou dans la FINALE est **enseigné** : ils sont
  tous recalculés par `manim/poste2/controler-maths-continuite-tvi.py`.

## Les lettres de bonne réponse

Tirées, pas choisies : `manim/poste2/tirage-lettres-continuite-tvi.py` (graine 2711).

| | E1 | E2 | E3 | E4 | E5 |
|---|---|---|---|---|---|
| `04` | **A** | **C** | **C** | **A** | **B** |
| `07` | **B** | **A** | **B** | **C** | **A** |

A 4 · B 3 · C 3 ; deux lettres différentes par épisode ; aucune lettre plus de deux fois
dans une même colonne. ⚠️ Ces lettres sont **la référence** : l'écran Manim (la lettre qui
s'allume) et le champ `reponse` du manifeste (0 = A, 1 = B, 2 = C) doivent dire la même
lettre que la voix.

---

# E1 · `terminale-continuite-reconnaitre`

**Micro** : `continuite_reconnaitre` — Reconnaître une fonction continue sur un intervalle.
**Contexte** : Kévin, régulateur du téléphérique urbain de Saint-Denis — centre `transports`.
**Code couleur** : ambre = ce qu'on regarde, vert = continu, rouge = le saut, bleu = le calcul.

- **00-garde** : Reconnaître une fonction continue. Une courbe qu'on trace sans lever le crayon, ça se dit en une phrase. Au bac, il faut l'écrire — et dire sur quel intervalle.
- **01-situation** : Voici Kévin. Il régule le téléphérique de Saint-Denis, depuis la salle de contrôle. Sur son premier écran, l'altitude de la cabine : elle monte de 40 à 180 mètres, et elle prend toutes les valeurs du chemin. Sur le second écran, le nombre de passagers : il passe de 1 à 2, et il ne vaut jamais 1,5. Deux courbes, deux mondes.
- **02-idee** : Une fonction est continue en a quand sa limite en a vaut f de a. Prenons une fonction en deux morceaux. Pour x plus petit que 1, f de x vaut 2 x plus 1. Pour x plus grand ou égal à 1, f de x vaut 5. Quand x s'approche de 1 par la gauche, 2 x plus 1 s'approche de 3. Mais la valeur en 1, c'est 5. 3 d'un côté, 5 de l'autre : la courbe saute de 2. Cette fonction n'est pas continue en 1.
- **03-theoreme** : Au bac, la continuité se reconnaît par catalogue. Les fonctions polynômes sont continues sur l'ensemble des réels. La fonction racine carrée est continue sur 0 plus l'infini, crochet fermé en 0. L'exponentielle est continue sur l'ensemble des réels, et le logarithme népérien sur 0 plus l'infini, crochet ouvert. Les sommes, les produits et les composées de fonctions continues sont continues. Un quotient l'est partout où son dénominateur ne s'annule pas. Et une règle qui sert tout le temps : toute fonction dérivable sur un intervalle y est continue.
- **04-question** : Question ! La fonction g vaut x au carré pour x plus petit ou égal à 2, et 3 x moins 2 pour x plus grand que 2. Est-elle continue en 2 ? A : oui, les deux morceaux valent 4 en 2. B : non, il y a un saut de 2 unités. C : il faudrait connaître la dérivée. Mets pause, et choisis !
- **04b-reponse** : Réponse A. 2 au carré fait 4. Et 3 fois 2, moins 2, fait 4 aussi. Les deux morceaux se rejoignent exactement : il n'y a pas de saut, et g est continue en 2. La réponse C se trompe d'outil : la dérivée ne sert pas à savoir si une fonction est continue. C'est l'inverse qui est vrai.
- **05-appliquer** : Appliquons. Soit f de x égale 2 x plus 1, divisé par x moins 3. C'est un quotient de deux polynômes : il est continu partout où son dénominateur ne s'annule pas. Le dénominateur s'annule en 3. Donc f est continue sur moins l'infini 3, et sur 3 plus l'infini. Deux intervalles, et on écrit les deux.
- **06-piege** : Voilà le piège ! On n'écrit jamais qu'une fonction est continue sur l'ensemble des réels privé de 3. On donne les intervalles, l'un après l'autre, parce que les théorèmes qui suivent travaillent sur un intervalle. Deuxième piège : continue et dérivable, ce n'est pas la même chose. La fonction valeur absolue est continue en 0, sa courbe ne saute pas. Mais elle y forme une pointe, et elle n'est pas dérivable en 0. Dérivable entraîne continue ; continue n'entraîne rien.
- **07-question** : Question ! Sur quel ensemble la fonction h, définie par h de x égale logarithme népérien de x, plus x au carré, est-elle continue ? A : sur l'ensemble des réels tout entier. B : sur 0 plus l'infini, crochets ouverts. C : sur 0 plus l'infini, crochet fermé en 0. Mets pause, et choisis !
- **07b-reponse** : Réponse B. Le logarithme népérien n'existe que pour x strictement positif. En 0, il n'est pas défini : le crochet reste ouvert. La fonction x au carré, elle, est continue partout — mais une somme n'existe que là où ses deux morceaux existent. Donc h est continue sur 0 plus l'infini, crochets ouverts. La réponse C ajoute un 0 que le logarithme refuse.
- **08-rediger** : Sur la copie, une phrase suffit. La fonction h est la somme du logarithme népérien, continu sur 0 plus l'infini, et d'une fonction polynôme, continue sur l'ensemble des réels. Donc h est continue sur 0 plus l'infini. On nomme la raison, et on donne l'intervalle. On n'écrit jamais : c'est continu.
- **09-defi** : À toi de jouer ! Soit f de x égale racine de x moins 1, plus 1 divisé par x moins 4. Sur quels intervalles la fonction f est-elle continue ? Attention : il y en a plus d'un. Mets pause, et cherche !
- **09b-correction** : Correction. La racine de x moins 1 existe quand x moins 1 est positif ou nul, c'est-à-dire pour x plus grand ou égal à 1. Elle est continue sur 1 plus l'infini, crochet fermé en 1. Le quotient 1 sur x moins 4 est continu partout sauf en 4. On garde ce que les deux morceaux acceptent, et on retire 4. La fonction f est donc continue sur 1 4, crochet fermé en 1 et ouvert en 4, et sur 4 plus l'infini. Deux intervalles, et pas un seul.
- **10-finale** : Ce que tu as appris. Continue en a, c'est la limite en a qui vaut f de a. Deux morceaux sont recollés quand ils donnent la même valeur au point de jonction. Les polynômes, la racine, l'exponentielle et le logarithme sont continus sur leur ensemble de définition. Un quotient l'est partout où son dénominateur ne s'annule pas, et on l'écrit intervalle par intervalle. Et dérivable entraîne continue, jamais le contraire.
- **11-abonne** : Entraîne-toi sur éleveai point fr. Et abonne-toi : arobase éleveai neuf cent soixante-quatorze.

---

# E2 · `terminale-tvi-appliquer`

**Micro** : `tvi_appliquer` — Appliquer le théorème des valeurs intermédiaires.
**Contexte** : Léa, prévisionniste, relève la température au sommet du Maïdo — centre `meteo-climat`.
**Code couleur** : ambre = ce qu'on regarde, bleu = le calcul, vert = la conclusion,
rouge = ce que le théorème ne dit pas.

- **00-garde** : Le théorème des valeurs intermédiaires. Prouver qu'une solution existe, sans jamais la calculer. C'est rare en maths, et c'est au programme du bac.
- **01-situation** : Voici Léa. Elle est prévisionniste, et elle relève la température au sommet du Maïdo. À 6 heures, moins 2 degrés. À midi, 14 degrés. Elle n'a pas regardé entre les deux. Et pourtant, elle peut affirmer qu'à un moment de la matinée, il a fait exactement 0 degré. Sans savoir quand.
- **02-idee** : Pourquoi peut-elle l'affirmer ? Parce que la température ne saute pas : c'est une fonction continue du temps. Elle part de moins 2, elle arrive à 14. Pour passer du négatif au positif sans lever le crayon, il faut bien couper l'axe quelque part. 0 est compris entre moins 2 et 14, donc 0 est atteint.
- **03-theoreme** : Voici l'énoncé. Soit f une fonction continue sur un intervalle a b. Soit k un nombre compris entre f de a et f de b. Alors il existe au moins un nombre c, dans l'intervalle a b, tel que f de c égale k. Au bac, k vaut presque toujours 0. Dans ce cas, dire que 0 est compris entre f de a et f de b, c'est dire que f de a et f de b sont de signes contraires.
- **04-question** : Question ! La fonction f est continue sur l'intervalle 1 4. On sait que f de 1 vaut 5, et que f de 4 vaut 9. L'équation f de x égale 7 a-t-elle une solution sur cet intervalle ? A : non, f ne s'annule pas. B : on ne peut pas conclure. C : oui, au moins une. Mets pause, et choisis !
- **04b-reponse** : Réponse C. 7 est compris entre 5 et 9, et la fonction f est continue : le théorème s'applique, et il donne au moins une solution. La réponse A cherche un 0 là où on demande 7. Le théorème ne parle pas que de 0 : il parle de n'importe quelle valeur k prise entre les deux images.
- **05-appliquer** : Appliquons. Soit g de x égale x puissance 5, plus 3 x, moins 5, sur l'intervalle 1 2. C'est une fonction polynôme, donc elle est continue. g de 1 vaut 1, plus 3, moins 5 : moins 1. g de 2 vaut 32, plus 6, moins 5 : 33. 0 est compris entre moins 1 et 33. L'équation g de x égale 0 admet donc au moins une solution entre 1 et 2.
- **06-piege** : Voilà le piège ! Il est dans ce que le théorème ne dit pas. Si f de a et f de b sont du même signe, le théorème ne conclut rien du tout. Attention : il ne dit pas qu'il n'y a pas de solution. Il se tait. La courbe peut très bien descendre sous 0 puis remonter, et traverser deux fois. Et autre chose qu'il ne dit pas : il donne l'existence, jamais la valeur, et jamais le nombre de solutions.
- **07-question** : Question ! La fonction f est continue sur l'intervalle 0 3. On sait que f de 0 vaut 2, et que f de 3 vaut 8. Que dit le théorème pour l'équation f de x égale 0 ? A : rien, 0 n'est pas entre 2 et 8. B : qu'il y a au moins une solution. C : qu'il n'y a aucune solution. Mets pause, et choisis !
- **07b-reponse** : Réponse A. Pour appliquer le théorème, il faudrait que 0 soit compris entre f de 0 et f de 3, c'est-à-dire entre 2 et 8. Ce n'est pas le cas : les deux images sont positives. Le théorème ne s'applique pas, donc il ne dit rien. La réponse C va trop loin : la fonction pourrait très bien descendre sous 0 entre les deux, puis remonter. On n'en sait rien, et c'est tout.
- **08-rediger** : Au bac, trois lignes. Un : la fonction f est continue sur l'intervalle a b, et on dit pourquoi. Deux : f de a vaut tel nombre, f de b vaut tel nombre, et 0 est compris entre les deux. Trois : d'après le théorème des valeurs intermédiaires, l'équation f de x égale 0 admet au moins une solution dans l'intervalle a b. Le mot qui compte, c'est : au moins.
- **09-defi** : À toi de jouer ! Montre que l'équation x au cube égale x plus 5 admet une solution entre 1 et 2. Attention : avant de commencer, il faut tout ramener d'un seul côté. Mets pause, et cherche !
- **09b-correction** : Correction. On pose f de x égale x au cube, moins x, moins 5. C'est une fonction polynôme, donc elle est continue sur l'intervalle 1 2. f de 1 vaut 1, moins 1, moins 5 : moins 5. f de 2 vaut 8, moins 2, moins 5 : 1. 0 est compris entre moins 5 et 1. D'après le théorème des valeurs intermédiaires, l'équation f de x égale 0 admet au moins une solution entre 1 et 2. Et résoudre f de x égale 0, c'est exactement résoudre l'équation de départ.
- **10-finale** : Ce que tu as appris. Le théorème demande deux choses : une fonction continue, et une valeur k comprise entre les deux images. Il donne alors au moins une solution, sans jamais la calculer. Quand les deux images sont du même signe, le théorème se tait — et se taire, ce n'est pas dire qu'il n'y a rien. Et une équation se ramène toujours à f de x égale 0 avant de commencer.
- **11-abonne** : Entraîne-toi sur éleveai point fr. Et abonne-toi : arobase éleveai neuf cent soixante-quatorze.

---

# E3 · `terminale-tvi-unicite`

**Micro** : `tvi_unicite` — Justifier l'unicité d'une solution.
**Contexte** : Mathis court le Grand Raid, entre Cilaos et Grand-Îlet — centre `sport`.
**Code couleur** : ambre = ce qu'on regarde, vert = la courbe qui ne fait que monter,
rouge = celle qui repasse, bleu = le calcul de la dérivée.

- **00-garde** : Justifier l'unicité d'une solution. Le théorème des valeurs intermédiaires dit qu'il existe une solution. Il ne dit jamais combien. Pour écrire une seule, il faut une hypothèse de plus.
- **01-situation** : Voici Mathis. Il court le Grand Raid, quelque part entre Cilaos et Grand-Îlet. Sa distance parcourue depuis le départ ne saute pas, et elle ne recule jamais. Il est donc passé au kilomètre 100 une fois, et une seule. Un promeneur qui ferait demi-tour, lui, pourrait y repasser trois fois.
- **02-idee** : Regardons deux courbes continues sur l'intervalle 0 4. Elles partent toutes les deux de moins 3, et elles arrivent toutes les deux à 5. La première monte, redescend, puis remonte : elle coupe l'axe trois fois. La seconde ne fait que monter : elle le coupe une fois. Même intervalle, mêmes valeurs aux bornes, et un nombre de solutions différent. Ce qui change, c'est le sens de variation.
- **03-theoreme** : Voici le corollaire du théorème des valeurs intermédiaires, qu'on appelle aussi théorème de la bijection. Soit f une fonction continue et strictement monotone sur un intervalle a b. Soit k un nombre compris entre f de a et f de b. Alors l'équation f de x égale k admet une unique solution dans l'intervalle a b. Deux hypothèses, et pas une seule. La stricte monotonie, elle, se justifie par le signe de la dérivée.
- **04-question** : Question ! La fonction g est continue et strictement croissante sur l'intervalle 0 5. On sait que g de 0 vaut 2, et que g de 5 vaut 9. Combien l'équation g de x égale 0 admet-elle de solutions sur cet intervalle ? A : une seule, g est monotone. B : on ne peut pas le savoir. C : aucune, 0 n'est jamais atteint. Mets pause, et choisis !
- **04b-reponse** : Réponse C. La fonction g part de 2 et ne fait que monter : sur tout l'intervalle, elle reste plus grande que 2. Elle ne vaut donc jamais 0. La réponse A est le réflexe à éviter : la stricte monotonie donne au plus une solution, mais encore faut-il que 0 soit atteint. Deux hypothèses, et ici c'est la seconde qui manque.
- **05-appliquer** : Appliquons. Soit f de x égale exponentielle de x, plus x, moins 4, sur l'intervalle 0 2. C'est une somme de fonctions continues, donc f est continue. f de 0 vaut 1, plus 0, moins 4 : moins 3. f de 2 vaut environ 5,39. La dérivée f prime de x vaut exponentielle de x, plus 1 : elle est strictement positive, donc f est strictement croissante. 0 est compris entre moins 3 et 5,39. L'équation f de x égale 0 admet donc une unique solution, qu'on appelle alpha.
- **06-piege** : Voilà le piège ! Le mot strictement n'est pas décoratif. Une fonction croissante peut rester constante sur un morceau : si elle y vaut 0, l'équation a une infinité de solutions. Deuxième piège : le théorème des valeurs intermédiaires tout seul ne donne jamais l'unicité, jamais. Et troisième : la stricte monotonie doit valoir sur l'intervalle de travail. Croissante ailleurs, ça ne compte pas.
- **07-question** : Question ! La fonction f est continue sur l'intervalle 0 6. On sait que f de 0 vaut moins 4, et que f de 6 vaut 2. Qu'est-ce qui manque pour écrire une unique solution ? A : que f soit dérivable sur l'intervalle 0 6. B : que f soit strictement monotone. C : rien, on peut déjà l'écrire. Mets pause, et choisis !
- **07b-reponse** : Réponse B. Les signes contraires donnent l'existence : il y a au moins une solution. Mais rien n'interdit à la courbe de redescendre et de repasser par 0. Il manque la stricte monotonie. La réponse A est le glissement classique : on se sert de la dérivée pour justifier la monotonie, alors on croit que c'est la dérivabilité qu'on exige. Une fonction peut être strictement croissante sans être dérivable partout.
- **08-rediger** : Sur la copie, la ligne qui change. On écrit : f prime de x est strictement positive sur l'intervalle 0 2, donc f est strictement croissante sur l'intervalle 0 2. C'est cette phrase, et elle seule, qui transforme au moins une en une seule. La copie entière, c'est le sujet de la vidéo suivante.
- **09-defi** : À toi de jouer ! Montre que l'équation x plus logarithme népérien de x égale 3 admet une unique solution sur l'intervalle 1 3. Mets pause, et cherche !
- **09b-correction** : Correction. On pose f de x égale x, plus logarithme népérien de x, moins 3. C'est une somme de fonctions continues sur 0 plus l'infini, donc f est continue sur l'intervalle 1 3. f de 1 vaut 1, plus 0, moins 3 : moins 2. f de 3 vaut logarithme népérien de 3, c'est-à-dire environ 1,10. La dérivée f prime de x vaut 1, plus 1 sur x : elle est strictement positive sur l'intervalle 1 3, donc f est strictement croissante. 0 est compris entre moins 2 et 1,10. D'après le corollaire du théorème des valeurs intermédiaires, l'équation admet une unique solution sur l'intervalle 1 3.
- **10-finale** : Ce que tu as appris. Le théorème des valeurs intermédiaires donne l'existence, et seulement l'existence. Pour l'unicité, il faut y ajouter la stricte monotonie, et on la justifie par le signe de la dérivée. Le mot strictement compte. Et avant de compter les solutions, il faut vérifier qu'il y en a au moins une : une fonction strictement croissante qui reste positive n'en a aucune.
- **11-abonne** : Entraîne-toi sur éleveai point fr. Et abonne-toi : arobase éleveai neuf cent soixante-quatorze.

---

# E4 · `terminale-tvi-rediger`

**Micro** : `tvi_rediger` — Rédiger une justification conforme au bac avec le TVI.
**Contexte** : Yoan relit sa copie de bac blanc, ligne par ligne — centre `jeux-defis`.
**Code couleur** : ambre = l'hypothèse du théorème, vert = la phrase qui y répond,
rouge = la ligne absente, bleu = le calcul.

- **00-garde** : Rédiger le théorème des valeurs intermédiaires au bac. 4 lignes, et chacune répond à une hypothèse. Celui qui en saute une perd les points, même avec la bonne réponse.
- **01-situation** : Voici Yoan. Il relit sa copie de bac blanc. Il avait écrit la bonne conclusion : l'équation admet une unique solution. Il a eu le quart des points. Ce qui manquait n'était pas le résultat — c'étaient les phrases qui autorisent à l'écrire.
- **02-idee** : Posons le théorème à gauche, et la copie à droite. Le théorème demande trois choses : que la fonction soit continue, qu'elle soit strictement monotone, et que la valeur cherchée soit comprise entre les deux images. Prenons f de x égale 2 x au cube, plus 3 x, moins 4, sur l'intervalle 0 2. Première phrase : f est une fonction polynôme, donc elle est continue sur l'intervalle 0 2. Deuxième phrase : f prime de x vaut 6 x au carré, plus 3, qui est strictement positif, donc f est strictement croissante. Troisième phrase : f de 0 vaut moins 4, f de 2 vaut 18, et 0 est compris entre les deux. Une hypothèse, une phrase.
- **03-theoreme** : La quatrième ligne, c'est la conclusion, et elle se cite mot pour mot. On écrit : d'après le corollaire du théorème des valeurs intermédiaires, l'équation f de x égale 0 admet une unique solution dans l'intervalle 0 2. Le mot corollaire compte : le théorème tout court ne donne que l'existence. Et on nomme toujours l'intervalle.
- **04-question** : Question ! Dans une rédaction, à quoi sert la phrase : f de 1 et f de 3 sont de signes contraires ? A : à dire que 0 est entre f de 1 et f de 3. B : à dire que f est continue. C : à dire que f est strictement monotone. Mets pause, et choisis !
- **04b-reponse** : Réponse A. Dire que les deux images sont de signes contraires, c'est exactement dire que 0 est compris entre elles. C'est la troisième hypothèse du théorème, et rien d'autre. La continuité se justifie par la nature de la fonction, et la stricte monotonie par le signe de la dérivée : trois phrases, trois rôles, et aucune ne remplace une autre.
- **05-appliquer** : Appliquons, sur une fonction où la continuité se démontre vraiment. Soit g de x égale 2 logarithme népérien de x, plus x, moins 4, sur l'intervalle 1 4. Première ligne : g est la somme d'un logarithme et d'un polynôme, tous deux continus sur 0 plus l'infini, donc g est continue sur l'intervalle 1 4. Deuxième ligne : g prime de x vaut 2 sur x, plus 1, strictement positif, donc g est strictement croissante. Troisième ligne : g de 1 vaut moins 3, g de 4 vaut environ 2,77, et 0 est compris entre les deux. Quatrième ligne : d'après le corollaire du théorème des valeurs intermédiaires, l'équation g de x égale 0 admet une unique solution sur l'intervalle 1 4.
- **06-piege** : Voilà le piège ! Écrire croissante au lieu de strictement croissante : c'est un mot, et il coûte le point de l'unicité. Deuxième piège : citer le théorème des valeurs intermédiaires pour conclure à l'unicité. Ce n'est pas lui, c'est son corollaire. Et troisième : oublier de dire sur quel intervalle. Une solution unique sur un intervalle peut très bien ne pas l'être sur un autre.
- **07-question** : Question ! Une copie dit : h est continue sur l'intervalle 2 5. Puis : h de 2 vaut moins 1, et h de 5 vaut 6. Puis : donc l'équation h de x égale 0 admet une unique solution. Que manque-t-il ? A : la valeur approchée de la solution. B : le calcul de h de 3. C : la stricte monotonie de h. Mets pause, et choisis !
- **07b-reponse** : Réponse C. La copie a la continuité, et elle a les signes contraires : elle a donc le droit d'écrire au moins une solution. Mais pas une seule. Il manque la phrase sur la stricte monotonie, justifiée par le signe de la dérivée. La réponse A confond la démonstration et le résultat : encadrer la solution vient après, et ne démontre rien.
- **08-rediger** : Le modèle à recopier, avec ses quatre trous. Un : la fonction f est continue sur l'intervalle a b, parce que… Deux : f prime de x est de signe constant sur a b, donc f est strictement monotone. Trois : f de a vaut tel nombre, f de b vaut tel nombre, et 0 est compris entre les deux. Quatre : d'après le corollaire du théorème des valeurs intermédiaires, l'équation f de x égale 0 admet une unique solution dans l'intervalle a b. Quatre lignes, toujours dans cet ordre.
- **09-defi** : À toi de jouer ! Voici la copie de Yoan, sur la fonction f de x égale x au cube, plus 3 x, moins 6, sur l'intervalle 1 2. Il a écrit : f de 1 vaut moins 2, f de 2 vaut 8, donc l'équation f de x égale 0 admet une unique solution. Il manque deux phrases. Lesquelles ? Mets pause, et cherche !
- **09b-correction** : Correction. Il manque d'abord la continuité : f est une fonction polynôme, donc elle est continue sur l'intervalle 1 2. Il manque ensuite la stricte monotonie : f prime de x vaut 3 x au carré, plus 3, qui est strictement positif, donc f est strictement croissante sur l'intervalle 1 2. Avec ces deux phrases, la conclusion de Yoan devient juste. Sans elles, elle n'était pas démontrée — même si elle était vraie.
- **10-finale** : Ce que tu as appris. Une rédaction du théorème des valeurs intermédiaires, c'est quatre lignes : la continuité, la stricte monotonie, la valeur comprise entre les deux images, et la conclusion. Chaque ligne répond à une hypothèse, et aucune ne remplace une autre. On cite le corollaire quand on conclut à l'unicité. Et on nomme toujours l'intervalle.
- **11-abonne** : Entraîne-toi sur éleveai point fr. Et abonne-toi : arobase éleveai neuf cent soixante-quatorze.

---

# E5 · `terminale-tvi-defi`

**Micro** : `tvi_defi` — Résoudre un exercice type bac avec continuité et TVI.
**Contexte** : Ryan, technicien à l'observatoire du Piton de la Fournaise — centre `sciences`.
**Code couleur** : ambre = ce qu'on regarde, bleu = le tableau de variations,
vert = un morceau qui donne une solution, rouge = un morceau qui n'en donne aucune.

- **00-garde** : Un exercice type bac, du début à la fin. Une fonction qui descend puis qui monte, un tableau de variations, et un encadrement. On commence par les variations, jamais par le théorème.
- **01-situation** : Voici Ryan. Il est technicien à l'observatoire du Piton de la Fournaise. Sur son écran, une courbe : l'écart entre l'inclinaison mesurée du volcan et celle que prévoit le modèle. Quand l'écart vaut 0, le modèle tombe juste. Au début de la matinée l'écart est positif, à la fin aussi — et pourtant la courbe a croisé le 0 en chemin.
- **02-idee** : Prenons une fonction simple pour voir le mécanisme. Soit g de x égale x moins 1, le tout au carré, moins 4, sur l'intervalle moins 2 4. g de moins 2 vaut 5. g de 4 vaut 5 aussi. Les deux bornes sont positives : appliqué tel quel, le théorème ne dit rien. Mais au creux, en 1, la fonction vaut moins 4. On coupe donc en 1. Sur chaque morceau, la fonction est strictement monotone et change de signe : une solution de chaque côté, moins 1 et 3. Deux solutions, trouvées parce qu'on a coupé.
- **03-theoreme** : La méthode d'un exercice de bac, en quatre temps. Un : on justifie la continuité. Deux : on calcule la dérivée, on étudie son signe, et on dresse le tableau de variations. Trois : sur chaque intervalle où la fonction est strictement monotone, on applique le corollaire du théorème des valeurs intermédiaires, et on conclut : une solution, ou aucune. Quatre : on encadre les solutions à la calculatrice.
- **04-question** : Question ! Une fonction continue sur l'intervalle 0 4 est strictement décroissante de 5 à moins 2, puis strictement croissante de moins 2 à 3. Combien l'équation f de x égale 0 admet-elle de solutions ? A : une seule. B : exactement deux. C : au moins une, sans pouvoir dire combien. Mets pause, et choisis !
- **04b-reponse** : Réponse B. Sur le premier morceau, la fonction est continue, strictement décroissante, et elle passe de 5 à moins 2 : 0 est compris entre les deux, donc il y a exactement une solution. Sur le second, elle est strictement croissante et passe de moins 2 à 3 : encore une solution, et une seule. Une plus une font deux. La réponse C s'arrête à l'existence : elle oublie que la stricte monotonie, elle, permet de compter.
- **05-appliquer** : Revenons à la courbe de Ryan. Soit f de t égale t au cube, moins 3 t, plus 1, sur l'intervalle 0 2. C'est un polynôme, donc f est continue. La dérivée f prime de t vaut 3 t au carré, moins 3 : elle s'annule en 1, elle est négative avant, et positive après. f de 0 vaut 1, f de 1 vaut moins 1, et f de 2 vaut 3. Sur l'intervalle 0 1, f est strictement décroissante de 1 à moins 1 : une unique solution, appelons-la alpha. Sur l'intervalle 1 2, f est strictement croissante de moins 1 à 3 : une unique solution, appelons-la bêta. Deux solutions en tout.
- **06-piege** : Voilà le piège ! Si on applique le théorème sur l'intervalle 0 2 tout entier, f de 0 vaut 1 et f de 2 vaut 3 : deux nombres positifs. Le théorème ne dit rien du tout, et on croirait qu'il n'y a rien à trouver. Il y a pourtant 2 solutions. Deuxième piège : 2 solutions, ça se démontre en 2 fois, pas en une phrase. Et troisième : un morceau sans changement de signe, on le conclut quand même — on écrit qu'il n'y a pas de solution dessus, on ne le saute pas.
- **07-question** : Question ! À la calculatrice, f de 0,3 vaut environ 0,13, et f de 0,4 vaut environ moins 0,14. Que peut-on écrire pour alpha ? A : 0,3 est plus petit qu'alpha, lui-même plus petit que 0,4. B : alpha vaut environ 0,13. C : 0,13 est plus petit qu'alpha, lui-même plus petit que 0,14. Mets pause, et choisis !
- **07b-reponse** : Réponse A. La fonction change de signe entre 0,3 et 0,4 : la solution alpha est entre ces deux nombres-là. 0,13 et moins 0,14, ce sont des images, pas des antécédents. Les réponses B et C les prennent pour la solution : c'est l'erreur de lecture la plus fréquente du balayage. On encadre alpha par des valeurs de t, jamais par des valeurs de f.
- **08-rediger** : Sur la copie, l'exercice entier. D'abord : f est un polynôme, donc elle est continue sur l'intervalle 0 2. Ensuite le tableau de variations, avec le signe de la dérivée. Puis un bloc par morceau : sur l'intervalle 0 1, f est continue et strictement décroissante, f de 0 vaut 1, f de 1 vaut moins 1, 0 est compris entre les deux, donc il existe une unique solution alpha. Le même bloc sur l'intervalle 1 2 pour bêta. Enfin l'encadrement : 0,3 est plus petit qu'alpha, lui-même plus petit que 0,4.
- **09-defi** : À toi de jouer ! Soit f de x égale x au cube, moins 12 x, plus 5, sur l'intervalle 0 3. Combien l'équation f de x égale 0 admet-elle de solutions ? Attention : les deux morceaux ne donnent pas la même réponse. Mets pause, et cherche !
- **09b-correction** : Correction. La dérivée f prime de x vaut 3 x au carré, moins 12 : elle s'annule en 2, elle est négative avant, et positive après. f de 0 vaut 5. f de 2 vaut 8, moins 24, plus 5 : moins 11. f de 3 vaut 27, moins 36, plus 5 : moins 4. Sur l'intervalle 0 2, f est strictement décroissante de 5 à moins 11 : 0 est compris entre les deux, donc il y a une unique solution. Sur l'intervalle 2 3, f est strictement croissante de moins 11 à moins 4 : 0 n'est pas compris entre ces deux nombres, donc aucune solution sur ce morceau. En tout, l'équation admet une seule solution.
- **10-finale** : Ce que tu as appris. Dans un exercice complet, les variations passent avant le théorème. On applique le corollaire sur chaque intervalle où la fonction est strictement monotone, et on conclut sur chacun : une solution, ou aucune. Deux bornes de même signe ne veulent pas dire 0 solution — elles veulent dire qu'il faut couper. Et on encadre une solution par des valeurs de x, jamais par des valeurs de f.
- **11-abonne** : Entraîne-toi sur éleveai point fr. Et abonne-toi : arobase éleveai neuf cent soixante-quatorze.
