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

# E3 · `terminale-tvi-unicite`

**Micro** : `tvi_unicite` — Justifier l'unicité d'une solution.
**Contexte** : Mathis court le Grand Raid, entre Cilaos et Grand-Îlet — centre `sport`.
**Code couleur** : ambre = ce qu'on regarde, vert = la courbe qui ne fait que monter,
rouge = celle qui repasse, bleu = le calcul de la dérivée.

- **00-garde** : Justifier l'unicité d'une solution. Le théorème des valeurs intermédiaires dit qu'il existe une solution. Il ne dit jamais combien. Pour écrire une seule, il faut une hypothèse de plus.
- **01-situation** : Voici Mathis. Il court le Grand Raid, quelque part entre Cilaos et Grand-Îlet. Sa distance parcourue depuis le départ ne saute pas, et elle ne recule jamais. Il est donc passé au kilomètre cent une fois, et une seule. Un promeneur qui ferait demi-tour, lui, pourrait y repasser trois fois.
- **02-idee** : Regardons deux courbes continues sur l'intervalle zéro quatre. Elles partent toutes les deux de moins trois, et elles arrivent toutes les deux à cinq. La première monte, redescend, puis remonte : elle coupe l'axe trois fois. La seconde ne fait que monter : elle le coupe une fois. Même intervalle, mêmes valeurs aux bornes, et un nombre de solutions différent. Ce qui change, c'est le sens de variation.
- **03-theoreme** : Voici le corollaire du théorème des valeurs intermédiaires, qu'on appelle aussi théorème de la bijection. Soit f une fonction continue et strictement monotone sur un intervalle a b. Soit k un nombre compris entre f de a et f de b. Alors l'équation f de x égale k admet une unique solution dans l'intervalle a b. Deux hypothèses, et pas une seule. La stricte monotonie, elle, se justifie par le signe de la dérivée.
- **04-question** : Question ! La fonction g est continue et strictement croissante sur l'intervalle zéro cinq. On sait que g de zéro vaut deux, et que g de cinq vaut neuf. Combien l'équation g de x égale zéro admet-elle de solutions sur cet intervalle ? A : une seule, g est monotone. B : on ne peut pas le savoir. C : aucune, zéro n'est jamais atteint. Mets pause, et choisis !
- **04b-reponse** : Réponse C. La fonction g part de deux et ne fait que monter : sur tout l'intervalle, elle reste plus grande que deux. Elle ne vaut donc jamais zéro. La réponse A est le réflexe à éviter : la stricte monotonie donne au plus une solution, mais encore faut-il que zéro soit atteint. Deux hypothèses, et ici c'est la seconde qui manque.
- **05-appliquer** : Appliquons. Soit f de x égale exponentielle de x, plus x, moins quatre, sur l'intervalle zéro deux. C'est une somme de fonctions continues, donc f est continue. f de zéro vaut un, plus zéro, moins quatre : moins trois. f de deux vaut environ cinq virgule trente-neuf. La dérivée f prime de x vaut exponentielle de x, plus un : elle est strictement positive, donc f est strictement croissante. Zéro est compris entre moins trois et cinq virgule trente-neuf. L'équation f de x égale zéro admet donc une unique solution, qu'on appelle alpha.
- **06-piege** : Voilà le piège ! Le mot strictement n'est pas décoratif. Une fonction croissante peut rester constante sur un morceau : si elle y vaut zéro, l'équation a une infinité de solutions. Deuxième piège : le théorème des valeurs intermédiaires tout seul ne donne jamais l'unicité, jamais. Et troisième : la stricte monotonie doit valoir sur l'intervalle de travail. Croissante ailleurs, ça ne compte pas.
- **07-question** : Question ! La fonction f est continue sur l'intervalle zéro six. On sait que f de zéro vaut moins quatre, et que f de six vaut deux. Qu'est-ce qui manque pour écrire une unique solution ? A : que f soit dérivable sur l'intervalle zéro six. B : que f soit strictement monotone. C : rien, on peut déjà l'écrire. Mets pause, et choisis !
- **07b-reponse** : Réponse B. Les signes contraires donnent l'existence : il y a au moins une solution. Mais rien n'interdit à la courbe de redescendre et de repasser par zéro. Il manque la stricte monotonie. La réponse A est le glissement classique : on se sert de la dérivée pour justifier la monotonie, alors on croit que c'est la dérivabilité qu'on exige. Une fonction peut être strictement croissante sans être dérivable partout.
- **08-rediger** : Sur la copie, la ligne qui change. On écrit : f prime de x est strictement positive sur l'intervalle zéro deux, donc f est strictement croissante sur l'intervalle zéro deux. C'est cette phrase, et elle seule, qui transforme au moins une en une seule. La copie entière, c'est le sujet de la vidéo suivante.
- **09-defi** : À toi de jouer ! Montre que l'équation x plus logarithme népérien de x égale trois admet une unique solution sur l'intervalle un trois. Mets pause, et cherche !
- **09b-correction** : Correction. On pose f de x égale x, plus logarithme népérien de x, moins trois. C'est une somme de fonctions continues sur zéro plus l'infini, donc f est continue sur l'intervalle un trois. f de un vaut un, plus zéro, moins trois : moins deux. f de trois vaut logarithme népérien de trois, c'est-à-dire environ un virgule dix. La dérivée f prime de x vaut un, plus un sur x : elle est strictement positive sur l'intervalle un trois, donc f est strictement croissante. Zéro est compris entre moins deux et un virgule dix. D'après le corollaire du théorème des valeurs intermédiaires, l'équation admet une unique solution sur l'intervalle un trois.
- **10-finale** : Ce que tu as appris. Le théorème des valeurs intermédiaires donne l'existence, et seulement l'existence. Pour l'unicité, il faut y ajouter la stricte monotonie, et on la justifie par le signe de la dérivée. Le mot strictement compte. Et avant de compter les solutions, il faut vérifier qu'il y en a au moins une : une fonction strictement croissante qui reste positive n'en a aucune.
- **11-abonne** : Entraîne-toi sur éleveai point fr. Et abonne-toi : arobase éleveai neuf cent soixante-quatorze.

---

# E4 · `terminale-tvi-rediger`

**Micro** : `tvi_rediger` — Rédiger une justification conforme au bac avec le TVI.
**Contexte** : Yoan relit sa copie de bac blanc, ligne par ligne — centre `jeux-defis`.
**Code couleur** : ambre = l'hypothèse du théorème, vert = la phrase qui y répond,
rouge = la ligne absente, bleu = le calcul.

- **00-garde** : Rédiger le théorème des valeurs intermédiaires au bac. Quatre lignes, et chacune répond à une hypothèse. Celui qui en saute une perd les points, même avec la bonne réponse.
- **01-situation** : Voici Yoan. Il relit sa copie de bac blanc. Il avait écrit la bonne conclusion : l'équation admet une unique solution. Il a eu le quart des points. Ce qui manquait n'était pas le résultat — c'étaient les phrases qui autorisent à l'écrire.
- **02-idee** : Posons le théorème à gauche, et la copie à droite. Le théorème demande trois choses : que la fonction soit continue, qu'elle soit strictement monotone, et que la valeur cherchée soit comprise entre les deux images. Prenons f de x égale deux x au cube, plus trois x, moins quatre, sur l'intervalle zéro deux. Première phrase : f est une fonction polynôme, donc elle est continue sur l'intervalle zéro deux. Deuxième phrase : f prime de x vaut six x au carré, plus trois, qui est strictement positif, donc f est strictement croissante. Troisième phrase : f de zéro vaut moins quatre, f de deux vaut dix-huit, et zéro est compris entre les deux. Une hypothèse, une phrase.
- **03-theoreme** : La quatrième ligne, c'est la conclusion, et elle se cite mot pour mot. On écrit : d'après le corollaire du théorème des valeurs intermédiaires, l'équation f de x égale zéro admet une unique solution dans l'intervalle zéro deux. Le mot corollaire compte : le théorème tout court ne donne que l'existence. Et on nomme toujours l'intervalle.
- **04-question** : Question ! Dans une rédaction, à quoi sert la phrase : f de un et f de trois sont de signes contraires ? A : à dire que zéro est entre f de un et f de trois. B : à dire que f est continue. C : à dire que f est strictement monotone. Mets pause, et choisis !
- **04b-reponse** : Réponse A. Dire que les deux images sont de signes contraires, c'est exactement dire que zéro est compris entre elles. C'est la troisième hypothèse du théorème, et rien d'autre. La continuité se justifie par la nature de la fonction, et la stricte monotonie par le signe de la dérivée : trois phrases, trois rôles, et aucune ne remplace une autre.
- **05-appliquer** : Appliquons, sur une fonction où la continuité se démontre vraiment. Soit g de x égale deux logarithme népérien de x, plus x, moins quatre, sur l'intervalle un quatre. Première ligne : g est la somme d'un logarithme et d'un polynôme, tous deux continus sur zéro plus l'infini, donc g est continue sur l'intervalle un quatre. Deuxième ligne : g prime de x vaut deux sur x, plus un, strictement positif, donc g est strictement croissante. Troisième ligne : g de un vaut moins trois, g de quatre vaut environ deux virgule soixante-dix-sept, et zéro est compris entre les deux. Quatrième ligne : d'après le corollaire du théorème des valeurs intermédiaires, l'équation g de x égale zéro admet une unique solution sur l'intervalle un quatre.
- **06-piege** : Voilà le piège ! Écrire croissante au lieu de strictement croissante : c'est un mot, et il coûte le point de l'unicité. Deuxième piège : citer le théorème des valeurs intermédiaires pour conclure à l'unicité. Ce n'est pas lui, c'est son corollaire. Et troisième : oublier de dire sur quel intervalle. Une solution unique sur un intervalle peut très bien ne pas l'être sur un autre.
- **07-question** : Question ! Une copie dit : h est continue sur l'intervalle deux cinq. Puis : h de deux vaut moins un, et h de cinq vaut six. Puis : donc l'équation h de x égale zéro admet une unique solution. Que manque-t-il ? A : la valeur approchée de la solution. B : le calcul de h de trois. C : la stricte monotonie de h. Mets pause, et choisis !
- **07b-reponse** : Réponse C. La copie a la continuité, et elle a les signes contraires : elle a donc le droit d'écrire au moins une solution. Mais pas une seule. Il manque la phrase sur la stricte monotonie, justifiée par le signe de la dérivée. La réponse A confond la démonstration et le résultat : encadrer la solution vient après, et ne démontre rien.
- **08-rediger** : Le modèle à recopier, avec ses quatre trous. Un : la fonction f est continue sur l'intervalle a b, parce que… Deux : f prime de x est de signe constant sur a b, donc f est strictement monotone. Trois : f de a vaut tel nombre, f de b vaut tel nombre, et zéro est compris entre les deux. Quatre : d'après le corollaire du théorème des valeurs intermédiaires, l'équation f de x égale zéro admet une unique solution dans l'intervalle a b. Quatre lignes, toujours dans cet ordre.
- **09-defi** : À toi de jouer ! Voici la copie de Yoan, sur la fonction f de x égale x au cube, plus trois x, moins six, sur l'intervalle un deux. Il a écrit : f de un vaut moins deux, f de deux vaut huit, donc l'équation f de x égale zéro admet une unique solution. Il manque deux phrases. Lesquelles ? Mets pause, et cherche !
- **09b-correction** : Correction. Il manque d'abord la continuité : f est une fonction polynôme, donc elle est continue sur l'intervalle un deux. Il manque ensuite la stricte monotonie : f prime de x vaut trois x au carré, plus trois, qui est strictement positif, donc f est strictement croissante sur l'intervalle un deux. Avec ces deux phrases, la conclusion de Yoan devient juste. Sans elles, elle n'était pas démontrée — même si elle était vraie.
- **10-finale** : Ce que tu as appris. Une rédaction du théorème des valeurs intermédiaires, c'est quatre lignes : la continuité, la stricte monotonie, la valeur comprise entre les deux images, et la conclusion. Chaque ligne répond à une hypothèse, et aucune ne remplace une autre. On cite le corollaire quand on conclut à l'unicité. Et on nomme toujours l'intervalle.
- **11-abonne** : Entraîne-toi sur éleveai point fr. Et abonne-toi : arobase éleveai neuf cent soixante-quatorze.

---

# E5 · `terminale-tvi-defi`

**Micro** : `tvi_defi` — Résoudre un exercice type bac avec continuité et TVI.
**Contexte** : Ryan, technicien à l'observatoire du Piton de la Fournaise — centre `sciences`.
**Code couleur** : ambre = ce qu'on regarde, bleu = le tableau de variations,
vert = un morceau qui donne une solution, rouge = un morceau qui n'en donne aucune.

- **00-garde** : Un exercice type bac, du début à la fin. Une fonction qui descend puis qui monte, un tableau de variations, et un encadrement. On commence par les variations, jamais par le théorème.
- **01-situation** : Voici Ryan. Il est technicien à l'observatoire du Piton de la Fournaise. Sur son écran, une courbe : l'écart entre l'inclinaison mesurée du volcan et celle que prévoit le modèle. Quand l'écart vaut zéro, le modèle tombe juste. Au début de la matinée l'écart est positif, à la fin aussi — et pourtant la courbe a croisé le zéro en chemin.
- **02-idee** : Prenons une fonction simple pour voir le mécanisme. Soit g de x égale x moins un, le tout au carré, moins quatre, sur l'intervalle moins deux quatre. g de moins deux vaut cinq. g de quatre vaut cinq aussi. Les deux bornes sont positives : appliqué tel quel, le théorème ne dit rien. Mais au creux, en un, la fonction vaut moins quatre. On coupe donc en un. Sur chaque morceau, la fonction est strictement monotone et change de signe : une solution de chaque côté, moins un et trois. Deux solutions, trouvées parce qu'on a coupé.
- **03-theoreme** : La méthode d'un exercice de bac, en quatre temps. Un : on justifie la continuité. Deux : on calcule la dérivée, on étudie son signe, et on dresse le tableau de variations. Trois : sur chaque intervalle où la fonction est strictement monotone, on applique le corollaire du théorème des valeurs intermédiaires, et on conclut : une solution, ou aucune. Quatre : on encadre les solutions à la calculatrice.
- **04-question** : Question ! Une fonction continue sur l'intervalle zéro quatre est strictement décroissante de cinq à moins deux, puis strictement croissante de moins deux à trois. Combien l'équation f de x égale zéro admet-elle de solutions ? A : une seule. B : exactement deux. C : au moins une, sans pouvoir dire combien. Mets pause, et choisis !
- **04b-reponse** : Réponse B. Sur le premier morceau, la fonction est continue, strictement décroissante, et elle passe de cinq à moins deux : zéro est compris entre les deux, donc il y a exactement une solution. Sur le second, elle est strictement croissante et passe de moins deux à trois : encore une solution, et une seule. Une plus une font deux. La réponse C s'arrête à l'existence : elle oublie que la stricte monotonie, elle, permet de compter.
- **05-appliquer** : Revenons à la courbe de Ryan. Soit f de t égale t au cube, moins trois t, plus un, sur l'intervalle zéro deux. C'est un polynôme, donc f est continue. La dérivée f prime de t vaut trois t au carré, moins trois : elle s'annule en un, elle est négative avant, et positive après. f de zéro vaut un, f de un vaut moins un, et f de deux vaut trois. Sur l'intervalle zéro un, f est strictement décroissante de un à moins un : une unique solution, appelons-la alpha. Sur l'intervalle un deux, f est strictement croissante de moins un à trois : une unique solution, appelons-la bêta. Deux solutions en tout.
- **06-piege** : Voilà le piège ! Si on applique le théorème sur l'intervalle zéro deux tout entier, f de zéro vaut un et f de deux vaut trois : deux nombres positifs. Le théorème ne dit rien du tout, et on croirait qu'il n'y a rien à trouver. Il y a pourtant deux solutions. Deuxième piège : deux solutions, ça se démontre en deux fois, pas en une phrase. Et troisième : un morceau sans changement de signe, on le conclut quand même — on écrit qu'il n'y a pas de solution dessus, on ne le saute pas.
- **07-question** : Question ! À la calculatrice, f de zéro virgule trois vaut environ zéro virgule treize, et f de zéro virgule quatre vaut environ moins zéro virgule quatorze. Que peut-on écrire pour alpha ? A : zéro virgule trois est plus petit qu'alpha, lui-même plus petit que zéro virgule quatre. B : alpha vaut environ zéro virgule treize. C : zéro virgule treize est plus petit qu'alpha, lui-même plus petit que zéro virgule quatorze. Mets pause, et choisis !
- **07b-reponse** : Réponse A. La fonction change de signe entre zéro virgule trois et zéro virgule quatre : la solution alpha est entre ces deux nombres-là. Zéro virgule treize et moins zéro virgule quatorze, ce sont des images, pas des antécédents. Les réponses B et C les prennent pour la solution : c'est l'erreur de lecture la plus fréquente du balayage. On encadre alpha par des valeurs de t, jamais par des valeurs de f.
- **08-rediger** : Sur la copie, l'exercice entier. D'abord : f est un polynôme, donc elle est continue sur l'intervalle zéro deux. Ensuite le tableau de variations, avec le signe de la dérivée. Puis un bloc par morceau : sur l'intervalle zéro un, f est continue et strictement décroissante, f de zéro vaut un, f de un vaut moins un, zéro est compris entre les deux, donc il existe une unique solution alpha. Le même bloc sur l'intervalle un deux pour bêta. Enfin l'encadrement : zéro virgule trois est plus petit qu'alpha, lui-même plus petit que zéro virgule quatre.
- **09-defi** : À toi de jouer ! Soit f de x égale x au cube, moins douze x, plus cinq, sur l'intervalle zéro trois. Combien l'équation f de x égale zéro admet-elle de solutions ? Attention : les deux morceaux ne donnent pas la même réponse. Mets pause, et cherche !
- **09b-correction** : Correction. La dérivée f prime de x vaut trois x au carré, moins douze : elle s'annule en deux, elle est négative avant, et positive après. f de zéro vaut cinq. f de deux vaut huit, moins vingt-quatre, plus cinq : moins onze. f de trois vaut vingt-sept, moins trente-six, plus cinq : moins quatre. Sur l'intervalle zéro deux, f est strictement décroissante de cinq à moins onze : zéro est compris entre les deux, donc il y a une unique solution. Sur l'intervalle deux trois, f est strictement croissante de moins onze à moins quatre : zéro n'est pas compris entre ces deux nombres, donc aucune solution sur ce morceau. En tout, l'équation admet une seule solution.
- **10-finale** : Ce que tu as appris. Dans un exercice complet, les variations passent avant le théorème. On applique le corollaire sur chaque intervalle où la fonction est strictement monotone, et on conclut sur chacun : une solution, ou aucune. Deux bornes de même signe ne veulent pas dire zéro solution — elles veulent dire qu'il faut couper. Et on encadre une solution par des valeurs de x, jamais par des valeurs de f.
- **11-abonne** : Entraîne-toi sur éleveai point fr. Et abonne-toi : arobase éleveai neuf cent soixante-quatorze.
