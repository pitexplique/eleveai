# Voix — série « CONTINUITÉ ET TVI », terminale spé (27/11/2026)

**5 épisodes PAYSAGE = les 5 micro-compétences du coach** de la notion `continuite_tvi`.
Le manifeste (titres, accroches, chapitres, questions) est dans
`manim/REPRISE-continuite-tvi.md` : **c'est lui la référence**, ce fichier-ci le met en voix.

> ⏳ **ÉTAT : E1 et E2 écrits. E3, E4 et E5 restent à écrire.**
> ⛔ **Et aucun WAV n'est enregistré, volontairement** : les titres et les accroches
> attendent la relecture de Frédéric, et un mot qui change après l'enregistrement coûte
> un WAV et un rendu.

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
- **01-situation** : Voici Kévin. Il régule le téléphérique de Saint-Denis, depuis la salle de contrôle. Sur son premier écran, l'altitude de la cabine : elle monte de quarante à cent quatre-vingts mètres, et elle prend toutes les valeurs du chemin. Sur le second écran, le nombre de passagers : il passe de un à deux, et il ne vaut jamais un et demi. Deux courbes, deux mondes.
- **02-idee** : Une fonction est continue en a quand sa limite en a vaut f de a. Prenons une fonction en deux morceaux. Pour x plus petit que un, f de x vaut deux x plus un. Pour x plus grand ou égal à un, f de x vaut cinq. Quand x s'approche de un par la gauche, deux x plus un s'approche de trois. Mais la valeur en un, c'est cinq. Trois d'un côté, cinq de l'autre : la courbe saute de deux. Cette fonction n'est pas continue en un.
- **03-theoreme** : Au bac, la continuité se reconnaît par catalogue. Les fonctions polynômes sont continues sur l'ensemble des réels. La fonction racine carrée est continue sur zéro plus l'infini, crochet fermé en zéro. L'exponentielle est continue sur l'ensemble des réels, et le logarithme népérien sur zéro plus l'infini, crochet ouvert. Les sommes, les produits et les composées de fonctions continues sont continues. Un quotient l'est partout où son dénominateur ne s'annule pas. Et une règle qui sert tout le temps : toute fonction dérivable sur un intervalle y est continue.
- **04-question** : Question ! La fonction g vaut x au carré pour x plus petit ou égal à deux, et trois x moins deux pour x plus grand que deux. Est-elle continue en deux ? A : oui, les deux morceaux valent quatre en deux. B : non, il y a un saut de deux unités. C : il faudrait connaître la dérivée. Mets pause, et choisis !
- **04b-reponse** : Réponse A. Deux au carré fait quatre. Et trois fois deux, moins deux, fait quatre aussi. Les deux morceaux se rejoignent exactement : il n'y a pas de saut, et g est continue en deux. La réponse C se trompe d'outil : la dérivée ne sert pas à savoir si une fonction est continue. C'est l'inverse qui est vrai.
- **05-appliquer** : Appliquons. Soit f de x égale deux x plus un, divisé par x moins trois. C'est un quotient de deux polynômes : il est continu partout où son dénominateur ne s'annule pas. Le dénominateur s'annule en trois. Donc f est continue sur moins l'infini trois, et sur trois plus l'infini. Deux intervalles, et on écrit les deux.
- **06-piege** : Voilà le piège ! On n'écrit jamais qu'une fonction est continue sur l'ensemble des réels privé de trois. On donne les intervalles, l'un après l'autre, parce que les théorèmes qui suivent travaillent sur un intervalle. Deuxième piège : continue et dérivable, ce n'est pas la même chose. La fonction valeur absolue est continue en zéro, sa courbe ne saute pas. Mais elle y forme une pointe, et elle n'est pas dérivable en zéro. Dérivable entraîne continue ; continue n'entraîne rien.
- **07-question** : Question ! Sur quel ensemble la fonction h, définie par h de x égale logarithme népérien de x, plus x au carré, est-elle continue ? A : sur l'ensemble des réels tout entier. B : sur zéro plus l'infini, crochets ouverts. C : sur zéro plus l'infini, crochet fermé en zéro. Mets pause, et choisis !
- **07b-reponse** : Réponse B. Le logarithme népérien n'existe que pour x strictement positif. En zéro, il n'est pas défini : le crochet reste ouvert. La fonction x au carré, elle, est continue partout — mais une somme n'existe que là où ses deux morceaux existent. Donc h est continue sur zéro plus l'infini, crochets ouverts. La réponse C ajoute un zéro que le logarithme refuse.
- **08-rediger** : Sur la copie, une phrase suffit. La fonction h est la somme du logarithme népérien, continu sur zéro plus l'infini, et d'une fonction polynôme, continue sur l'ensemble des réels. Donc h est continue sur zéro plus l'infini. On nomme la raison, et on donne l'intervalle. On n'écrit jamais : c'est continu.
- **09-defi** : À toi de jouer ! Soit f de x égale racine de x moins un, plus un divisé par x moins quatre. Sur quels intervalles la fonction f est-elle continue ? Attention : il y en a plus d'un. Mets pause, et cherche !
- **09b-correction** : Correction. La racine de x moins un existe quand x moins un est positif ou nul, c'est-à-dire pour x plus grand ou égal à un. Elle est continue sur un plus l'infini, crochet fermé en un. Le quotient un sur x moins quatre est continu partout sauf en quatre. On garde ce que les deux morceaux acceptent, et on retire quatre. La fonction f est donc continue sur un quatre, crochet fermé en un et ouvert en quatre, et sur quatre plus l'infini. Deux intervalles, et pas un seul.
- **10-finale** : Ce que tu as appris. Continue en a, c'est la limite en a qui vaut f de a. Deux morceaux sont recollés quand ils donnent la même valeur au point de jonction. Les polynômes, la racine, l'exponentielle et le logarithme sont continus sur leur ensemble de définition. Un quotient l'est partout où son dénominateur ne s'annule pas, et on l'écrit intervalle par intervalle. Et dérivable entraîne continue, jamais le contraire.
- **11-abonne** : Entraîne-toi sur éleveai point fr. Et abonne-toi : arobase éleveai neuf cent soixante-quatorze.

---

# E2 · `terminale-tvi-appliquer`

**Micro** : `tvi_appliquer` — Appliquer le théorème des valeurs intermédiaires.
**Contexte** : Léa, prévisionniste, relève la température au sommet du Maïdo — centre `meteo-climat`.
**Code couleur** : ambre = ce qu'on regarde, bleu = le calcul, vert = la conclusion,
rouge = ce que le théorème ne dit pas.

- **00-garde** : Le théorème des valeurs intermédiaires. Prouver qu'une solution existe, sans jamais la calculer. C'est rare en maths, et c'est au programme du bac.
- **01-situation** : Voici Léa. Elle est prévisionniste, et elle relève la température au sommet du Maïdo. À six heures, moins deux degrés. À midi, quatorze degrés. Elle n'a pas regardé entre les deux. Et pourtant, elle peut affirmer qu'à un moment de la matinée, il a fait exactement zéro degré. Sans savoir quand.
- **02-idee** : Pourquoi peut-elle l'affirmer ? Parce que la température ne saute pas : c'est une fonction continue du temps. Elle part de moins deux, elle arrive à quatorze. Pour passer du négatif au positif sans lever le crayon, il faut bien couper l'axe quelque part. Zéro est compris entre moins deux et quatorze, donc zéro est atteint.
- **03-theoreme** : Voici l'énoncé. Soit f une fonction continue sur un intervalle a b. Soit k un nombre compris entre f de a et f de b. Alors il existe au moins un nombre c, dans l'intervalle a b, tel que f de c égale k. Au bac, k vaut presque toujours zéro. Dans ce cas, dire que zéro est compris entre f de a et f de b, c'est dire que f de a et f de b sont de signes contraires.
- **04-question** : Question ! La fonction f est continue sur l'intervalle un quatre. On sait que f de un vaut cinq, et que f de quatre vaut neuf. L'équation f de x égale sept a-t-elle une solution sur cet intervalle ? A : non, f ne s'annule pas. B : on ne peut pas conclure. C : oui, au moins une. Mets pause, et choisis !
- **04b-reponse** : Réponse C. Sept est compris entre cinq et neuf, et la fonction f est continue : le théorème s'applique, et il donne au moins une solution. La réponse A cherche un zéro là où on demande sept. Le théorème ne parle pas que de zéro : il parle de n'importe quelle valeur k prise entre les deux images.
- **05-appliquer** : Appliquons. Soit g de x égale x puissance cinq, plus trois x, moins cinq, sur l'intervalle un deux. C'est une fonction polynôme, donc elle est continue. g de un vaut un, plus trois, moins cinq : moins un. g de deux vaut trente-deux, plus six, moins cinq : trente-trois. Zéro est compris entre moins un et trente-trois. L'équation g de x égale zéro admet donc au moins une solution entre un et deux.
- **06-piege** : Voilà le piège ! Il est dans ce que le théorème ne dit pas. Si f de a et f de b sont du même signe, le théorème ne conclut rien du tout. Attention : il ne dit pas qu'il n'y a pas de solution. Il se tait. La courbe peut très bien descendre sous zéro puis remonter, et traverser deux fois. Et autre chose qu'il ne dit pas : il donne l'existence, jamais la valeur, et jamais le nombre de solutions.
- **07-question** : Question ! La fonction f est continue sur l'intervalle zéro trois. On sait que f de zéro vaut deux, et que f de trois vaut huit. Que dit le théorème pour l'équation f de x égale zéro ? A : rien, zéro n'est pas entre deux et huit. B : qu'il y a au moins une solution. C : qu'il n'y a aucune solution. Mets pause, et choisis !
- **07b-reponse** : Réponse A. Pour appliquer le théorème, il faudrait que zéro soit compris entre f de zéro et f de trois, c'est-à-dire entre deux et huit. Ce n'est pas le cas : les deux images sont positives. Le théorème ne s'applique pas, donc il ne dit rien. La réponse C va trop loin : la fonction pourrait très bien descendre sous zéro entre les deux, puis remonter. On n'en sait rien, et c'est tout.
- **08-rediger** : Au bac, trois lignes. Un : la fonction f est continue sur l'intervalle a b, et on dit pourquoi. Deux : f de a vaut tel nombre, f de b vaut tel nombre, et zéro est compris entre les deux. Trois : d'après le théorème des valeurs intermédiaires, l'équation f de x égale zéro admet au moins une solution dans l'intervalle a b. Le mot qui compte, c'est : au moins.
- **09-defi** : À toi de jouer ! Montre que l'équation x au cube égale x plus cinq admet une solution entre un et deux. Attention : avant de commencer, il faut tout ramener d'un seul côté. Mets pause, et cherche !
- **09b-correction** : Correction. On pose f de x égale x au cube, moins x, moins cinq. C'est une fonction polynôme, donc elle est continue sur l'intervalle un deux. f de un vaut un, moins un, moins cinq : moins cinq. f de deux vaut huit, moins deux, moins cinq : un. Zéro est compris entre moins cinq et un. D'après le théorème des valeurs intermédiaires, l'équation f de x égale zéro admet au moins une solution entre un et deux. Et résoudre f de x égale zéro, c'est exactement résoudre l'équation de départ.
- **10-finale** : Ce que tu as appris. Le théorème demande deux choses : une fonction continue, et une valeur k comprise entre les deux images. Il donne alors au moins une solution, sans jamais la calculer. Quand les deux images sont du même signe, le théorème se tait — et se taire, ce n'est pas dire qu'il n'y a rien. Et une équation se ramène toujours à f de x égale zéro avant de commencer.
- **11-abonne** : Entraîne-toi sur éleveai point fr. Et abonne-toi : arobase éleveai neuf cent soixante-quatorze.

---

# E3, E4, E5 — à écrire

⏳ `terminale-tvi-unicite`, `terminale-tvi-rediger`, `terminale-tvi-defi`.
Tout ce qu'il faut est déjà figé dans `manim/REPRISE-continuite-tvi.md` § 5 : le contexte,
les cinq cas numériques de chaque épisode, les deux questions avec leurs propositions mot
pour mot, et la lettre de la bonne réponse. ⛔ **Recopier les questions depuis le
manifeste, sans les reformuler** : la voix, l'écran et le champ `reponse` doivent dire la
même chose au mot près.
