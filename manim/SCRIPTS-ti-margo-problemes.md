# Ti Margo : problèmes CP et division CE1, 10 micros (paysage + short), 28/11/2026

Décision de Frédéric (28/11) : après la monnaie d'Idriss, Ti Margo remplit les trous des petits : les problèmes du CP et la division du CE1.
Un enfant de CP aime autant les paysages que les shorts, donc on fait les deux par micro. « Même procédure que les autres. »
Déjà faites avec Idriss, on ne les refait pas : `cp_probleme_additif`, `cp_probleme_soustractif`, `ce1_division_partage`.

Règles suivies :
- Le socle Ti Margo des dessins animés CP (`cp-entier2`) : ton poétique, phrases courtes, les nombres en grand, peu de texte.
- C'est Ti Margo qui raconte (« je »). Il voyage : train, montagne sous la neige, forêt, cirque, ferme, bus, boulangerie… Aucun lieu nommé.
- Objets calmes et lisibles, des dessins à chaque question (test d'un enfant de 6 ans, 27/11).
- Compte à rebours de 8 s, barre visible. Bonnes réponses tirées au hasard (30 questions : 10 A, 10 B, 10 C).
- Ceinture blanche partout. Pas de « TU PARIES ? » écrit : l'accroche passe par le dessin et la voix. Chaque nombre dit est écrit à l'écran.
- CP : des nombres jusqu'à 30 environ, pas de signe « × » (on dit « fois », écrit « 4 fois 3 »). CE1 : jusqu'à 50, le « × » arrive pour vérifier.
- Le schéma en barre (le tout en haut, les parts en dessous, un « ? ») est le même que celui du coach.
- Fin : « Entraîne-toi sur eleveai.fr » / « ou sur YouTube @eleveai974 » ; dans les shorts, « réponds en commentaire » juste avant.
- Les situations suivent le coach (`lib/tutor-v4/questionBank/cp/maths/probleme.bank.ts`, `ce1/maths/division-partage.bank.ts`) :
  ce que l'élève voit dans la vidéo, il le retrouve ensuite dans les exercices.

État : ✅ CP validé par Frédéric le 28/11 (« OK CP, envoie le CE1 ») ; ✅ CE1 validé le 28/11 (« OK CE1, lance »). Production lancée.

| Micro | Paysage | Short | Bonnes réponses (paysage Q1, Q2 · short) |
|---|---|---|---|
| CP 1 `cp_probleme_identifier` | Les biscuits du train | Les œufs de la poule | C, A · B |
| CP 2 `cp_probleme_schema` | Les bonnets dans la neige | Les poissons de l'aquarium | A, A · A |
| CP 3 `cp_probleme_deux_etapes` | Le bus qui s'arrête | La mangeoire des oiseaux | A, B · C |
| CP 4 `cp_probleme_multiplicatif` | Les fraises de l'anniversaire | Les pattes des chatons | B, C · B |
| CP 5 `cp_probleme_partage` | Le pique-nique dans la forêt | Les crêpes de mamie | A, A · C |
| CP 6 `cp_probleme_reponse` | Les livres de la bibliothèque | Les cerises de Lina | B, C · C |
| CP 7 `cp_probleme_defi` | Les défis du cirque | Les billes de la récré | C, C · C |
| CE1 1 `ce1_division_groupement` | Les croissants du boulanger | Les chaussettes par paires | B, A · B |
| CE1 2 `ce1_division_reste` | Les bouquets de la classe | Les cookies des quatre amis | B, A · C |
| CE1 3 `ce1_division_defi` | Les défis du tournoi | Les sandwichs du goûter | B, B · A |

---

# CP : résoudre des problèmes

## CP 1 — `cp_probleme_identifier` — « Que cherche-t-on ? »

### Paysage (≈ 1 min 30) — « Les biscuits du train »
| Clé | Image | Voix |
|---|---|---|
| 00-accroche | Un train roule, des champs défilent à la fenêtre. Ti Margo ouvre une boîte : 9 biscuits ronds. Il en croque 3, les miettes volent. « 9 » puis « 3 ». | Salut ! Je pars en train chez mon cousin. Dans ma boîte, neuf biscuits. Pendant le voyage, j'en mange trois. |
| 01-question | La question s'écrit en grand au-dessus de la boîte : « Combien en reste-t-il ? ». Un gros « ? » clignote doucement. | Avant de calculer, je lis la question. Combien en reste-t-il ? |
| 02-redire | « ce qui reste » entouré ; les 3 biscuits mangés pâlissent, les autres brillent dans la boîte. | Je la redis avec mes mots. Je cherche les biscuits qui restent dans la boîte. Pas ceux que j'ai mangés ! |
| 03-calcul | « 9 − 3 = 6 » ; on compte les biscuits de la boîte : 1 à 6. | Neuf moins trois, six. Il reste six biscuits. Et ça répond bien à la question ! |
| 04-question | Dans le wagon, un garçon tient 5 cartes ; sa sœur lui en tend 4. Écrit : « Combien en a-t-il maintenant ? ». Choix A les cartes de sa sœur, B les cartes du début, C toutes ses cartes à la fin. | Question ! Un garçon a cinq cartes. Sa sœur lui en donne quatre. Combien en a-t-il maintenant ? Que cherche-t-on ? A : les cartes de sa sœur. B : les cartes du début. C : toutes ses cartes, à la fin. Mets pause, et choisis ! |
| 04b-reponse | Les 4 cartes rejoignent les 5 dans sa main ; « 5 + 4 = 9 ». | Réponse C ! Maintenant, c'est à la fin. On cherche toutes ses cartes. Cinq plus quatre, neuf cartes. |
| 05-question | Le cousin attend sur le quai avec 7 ballons ; Ti Margo en a 2 de plus. Écrit : « Combien de ballons a Ti Margo ? ». Choix A 7 + 2, B 7 − 2, C 2 + 2. | Question ! Mon cousin a sept ballons. Moi, j'en ai deux de plus que lui. Combien de ballons ai-je ? Quel calcul ? A : sept plus deux. B : sept moins deux. C : deux plus deux. Mets pause, et choisis ! |
| 05b-reponse | À côté des 7 ballons du cousin, 2 ballons de plus s'ajoutent chez Ti Margo ; « 7 + 2 = 9 ». | Réponse A ! J'en ai plus que lui. Je pars de sept, et j'ajoute deux. Neuf ballons ! |
| 06-appris | « Ce que tu as appris », en haut, centré ; « 1. je lis la question » ; « 2. je dis ce que je cherche » ; « 3. je calcule ». | Avant de calculer, je lis la question. Je dis avec mes mots ce que je cherche. Puis je calcule. |
| 07-abonne | Écran de fin. | Entraîne-toi sur éleveai point f r, ou sur YouTube : éleveai neuf sept quatre ! |

### Short (≈ 45 s) — « Les œufs de la poule »
| Clé | Image | Voix |
|---|---|---|
| 00-accroche | À la ferme, au petit matin. Une poule se lève de son nid : 8 œufs. Ti Margo en met 6 dans son panier. « 8 » puis « 6 ». | Salut ! La poule a pondu huit œufs. J'en ramasse six pour faire un gâteau. Combien d'œufs restent dans le nid ? |
| 01-question | Le nid et le panier côte à côte. Choix A les œufs du panier, B les œufs qui restent dans le nid, C tous les œufs pondus. | Question ! Que cherche-t-on ? A : les œufs du panier. B : les œufs qui restent dans le nid. C : tous les œufs pondus. Mets pause, et choisis ! |
| 01b-reponse | Le nid s'éclaire : 2 œufs. « 8 − 6 = 2 ». La poule se rassoit dessus, contente. | Réponse B ! La question dit : dans le nid. Huit moins six, deux. Il reste deux œufs. La poule est contente ! |
| 02-commentaire | Un fil : 3 oiseaux posés, 2 autres arrivent. « ? ». | À toi : trois oiseaux sur un fil. Deux autres arrivent. On cherche ceux qui arrivent, ou tous les oiseaux ? Dis-le à voix haute, ou réponds en commentaire ! |
| 03-abonne | Écran de fin. | Entraîne-toi sur éleveai point f r, ou sur YouTube : éleveai neuf sept quatre ! |

---

## CP 2 — `cp_probleme_schema` — « Un dessin pour comprendre »

### Paysage (≈ 1 min 30) — « Les bonnets dans la neige »
| Clé | Image | Voix |
|---|---|---|
| 00-accroche | La montagne, la neige tombe doucement. 12 enfants jouent : 5 bonnets rouges, 7 bonnets bleus (on ne les compte pas encore). Ti Margo en écharpe. « 12 » puis « 5 ». | Salut ! Il neige à la montagne ! Douze enfants jouent dehors. Cinq ont un bonnet rouge. Les autres ont un bonnet bleu. Combien de bonnets bleus ? |
| 01-barre | Une grande barre s'étire ; « 12 » au-dessus. | Je ne calcule pas tout de suite : je fais un dessin. Une grande barre pour les douze enfants. |
| 02-parts | Sous la barre, deux cases : rouge « 5 », bleue « ? ». | En dessous, la part rouge : cinq. Et la part bleue : je ne sais pas. J'y mets un point d'interrogation. |
| 03-calcul | Le « ? » est sur une part ; « 12 − 5 = 7 » ; le « ? » devient « 7 ». | Le point d'interrogation est sur une part. Alors j'enlève. Douze moins cinq, sept. Sept bonnets bleus ! |
| 04-question | 6 enfants sur des luges, 3 sur des skis. La barre : « ? » au-dessus, « 6 » et « 3 » en dessous. Choix A 6 + 3, B 6 − 3, C 6 + 6. | Question ! Six enfants font de la luge. Trois font du ski. Combien en tout ? Le point d'interrogation est en haut, sur le tout. Quel calcul ? A : six plus trois. B : six moins trois. C : six plus six. Mets pause, et choisis ! |
| 04b-reponse | Les deux parts se rejoignent sous la barre ; « 6 + 3 = 9 » ; le « ? » devient « 9 ». | Réponse A ! On cherche le tout, alors on réunit les parts. Six plus trois, neuf enfants. |
| 05-question | Sur un fil, 15 moufles qui sèchent ; 10 sont sèches. La barre : « 15 » au-dessus, « 10 » et une case vide en dessous. Choix A sur une part, B sur le tout, C nulle part. | Question ! Quinze moufles sèchent sur le fil. Dix sont déjà sèches. Combien sont encore mouillées ? Où je mets le point d'interrogation ? A : sur une part. B : sur le tout. C : nulle part. Mets pause, et choisis ! |
| 05b-reponse | Le « ? » se pose dans la case vide ; « 15 − 10 = 5 » ; il devient « 5 ». | Réponse A ! Le tout, quinze, je le connais. Je cherche une part. Quinze moins dix, cinq moufles mouillées. |
| 06-appris | « Ce que tu as appris » ; la barre « 12 », les parts « 5 » et « ? ». | Je dessine une barre : le tout en haut, les parts en dessous. Le point d'interrogation me dit si j'ajoute ou si j'enlève. |
| 07-abonne | Écran de fin. | Entraîne-toi sur éleveai point f r, ou sur YouTube : éleveai neuf sept quatre ! |

### Short (≈ 45 s) — « Les poissons de l'aquarium »
| Clé | Image | Voix |
|---|---|---|
| 00-accroche | Un grand aquarium, des bulles. 10 poissons : 4 orange, les autres jaunes. Sous l'aquarium, la barre « 10 », les parts « 4 » et « ? ». | Salut ! Dans l'aquarium, dix poissons. Quatre sont orange. Les autres sont jaunes. Je fais mon dessin. |
| 01-question | Choix A 6, B 14, C 4. | Question ! Combien de poissons jaunes ? A : six. B : quatorze. C : quatre. Mets pause, et choisis ! |
| 01b-reponse | Le « ? » devient « 6 » ; « 10 − 4 = 6 » ; les 6 poissons jaunes font une ronde. | Réponse A ! Le point d'interrogation est sur une part. Dix moins quatre, six poissons jaunes. |
| 02-commentaire | 3 chats noirs et 5 chats blancs ; une barre vide, « ? ». | À toi : fais le dessin ! Trois chats noirs et cinq chats blancs. Combien de chats en tout ? Dis-le à voix haute, ou réponds en commentaire ! |
| 03-abonne | Écran de fin. | Entraîne-toi sur éleveai point f r, ou sur YouTube : éleveai neuf sept quatre ! |

---

## CP 3 — `cp_probleme_deux_etapes` — « Deux étapes »

### Paysage (≈ 1 min 30) — « Le bus qui s'arrête »
| Clé | Image | Voix |
|---|---|---|
| 00-accroche | Un bus jaune dans une rue tranquille. Dedans, 8 passagers aux fenêtres ; Ti Margo au premier rang. « 8 ». | Salut ! Je prends le bus. Dedans, huit personnes. Le bus va s'arrêter deux fois. Combien de personnes à la fin ? |
| 01-etape1 | Premier arrêt : 3 personnes montent. « 8 + 3 = 11 » ; « étape 1 ». | Premier arrêt : trois personnes montent. Huit plus trois, onze. |
| 02-etape2 | Deuxième arrêt : 2 personnes descendent. « 11 − 2 = 9 » ; « étape 2 ». | Deuxième arrêt : deux personnes descendent. Je pars de onze. Onze moins deux, neuf. |
| 03-deux | Les deux calculs l'un sous l'autre ; une flèche relie le « 11 » du premier au « 11 » du second. | L'histoire bouge deux fois : je calcule deux fois. Le résultat de la première étape sert à la deuxième. Neuf personnes à la fin ! |
| 04-question | Une boulangerie : maman achète 5 croissants et 4 pains au chocolat ; on en mange 2 sur le chemin. Choix A 7, B 9, C 11. | Question ! Maman achète cinq croissants et quatre pains au chocolat. Sur le chemin, on en mange deux. Combien en reste-t-il ? A : sept. B : neuf. C : onze. Mets pause, et choisis ! |
| 04b-reponse | « 5 + 4 = 9 » puis « 9 − 2 = 7 » ; il reste 7 viennoiseries dans le sac. | Réponse A ! Étape un : cinq plus quatre, neuf. Étape deux : neuf moins deux, sept. B, on s'est arrêté trop tôt ! |
| 05-question | Une trousse ouverte : 10 crayons. 3 partent chez un copain, puis 1 revient. Choix A 7, B 8, C 14. | Question ! Dans ma trousse, dix crayons. J'en prête trois. Puis un copain m'en rend un. Combien de crayons dans ma trousse ? A : sept. B : huit. C : quatorze. Mets pause, et choisis ! |
| 05b-reponse | « 10 − 3 = 7 » puis « 7 + 1 = 8 » ; les 8 crayons se rangent. | Réponse B ! Étape un : dix moins trois, sept. Étape deux : sept plus un, huit crayons. |
| 06-appris | « Ce que tu as appris » ; « étape 1 » → « étape 2 » ; « 8 + 3 = 11 », « 11 − 2 = 9 ». | Quand l'histoire bouge deux fois, je calcule en deux étapes. Le résultat de la première sert à la deuxième. |
| 07-abonne | Écran de fin. | Entraîne-toi sur éleveai point f r, ou sur YouTube : éleveai neuf sept quatre ! |

### Short (≈ 45 s) — « La mangeoire des oiseaux »
| Clé | Image | Voix |
|---|---|---|
| 00-accroche | Un jardin en hiver. Sur la mangeoire, 6 oiseaux ; 4 autres arrivent ; puis un chat passe et 5 s'envolent. « 6 », « 4 », « 5 ». | Salut ! Sur la mangeoire, six oiseaux. Quatre autres arrivent. Puis un chat passe, et cinq s'envolent ! |
| 01-question | Choix A 15, B 10, C 5. | Question ! Combien d'oiseaux restent sur la mangeoire ? A : quinze. B : dix. C : cinq. Mets pause, et choisis ! |
| 01b-reponse | « 6 + 4 = 10 » puis « 10 − 5 = 5 » ; les 5 oiseaux picorent tranquillement. | Réponse C ! Six plus quatre, dix. Puis dix moins cinq, cinq oiseaux. B, c'était seulement la première étape ! |
| 02-commentaire | 7 billes ; +3 ; −2 ; « ? ». | À toi : j'ai sept billes. J'en gagne trois, puis j'en perds deux. Combien en ai-je ? Dis-le à voix haute, ou réponds en commentaire ! |
| 03-abonne | Écran de fin. | Entraîne-toi sur éleveai point f r, ou sur YouTube : éleveai neuf sept quatre ! |

---

## CP 4 — `cp_probleme_multiplicatif` — « Des groupes pareils »

### Paysage (≈ 1 min 30) — « Les fraises de l'anniversaire »
| Clé | Image | Voix |
|---|---|---|
| 00-accroche | Une table de fête, des guirlandes. 4 assiettes ; sur chaque assiette, 3 fraises. Ti Margo avec un chapeau pointu. | Salut ! C'est mon anniversaire ! Sur la table, quatre assiettes. Sur chaque assiette, trois fraises. Combien de fraises en tout ? |
| 01-pareil | Les 4 assiettes s'éclairent l'une après l'autre ; « 3 » sous chacune. | Toutes les assiettes ont pareil : trois fraises. Ce sont des groupes égaux. |
| 02-compter | On compte de 3 en 3 : « 3, 6, 9, 12 » ; « 3 + 3 + 3 + 3 = 12 ». | Je compte de trois en trois. Trois, six, neuf, douze. Douze fraises ! |
| 03-fois | « 4 fois 3 = 12 » en grand ; les 4 assiettes en rang. | Quatre groupes de trois. On dit aussi : quatre fois trois, douze. |
| 04-question | Trois copains arrivent, chacun avec 2 ballons. Choix A 5, B 6, C 32. | Question ! Trois copains arrivent. Chacun tient deux ballons. Combien de ballons en tout ? A : cinq. B : six. C : trente-deux. Mets pause, et choisis ! |
| 04b-reponse | « 2, 4, 6 » ; « 2 + 2 + 2 = 6 ». | Réponse B ! Deux, quatre, six. Trois fois deux, six ballons. A, on a ajouté trois et deux : ce n'est pas ça ! |
| 05-question | Le gâteau : 2 rangées de 5 bougies. Choix A 7, B 25, C 10. | Question ! Sur le gâteau, deux rangées de cinq bougies. Combien de bougies ? A : sept. B : vingt-cinq. C : dix. Mets pause, et choisis ! |
| 05b-reponse | Les bougies s'allument rangée par rangée : « 5, 10 » ; « 5 + 5 = 10 ». Ti Margo souffle. | Réponse C ! Cinq, puis dix. Deux fois cinq, dix bougies. Je souffle ! |
| 06-appris | « Ce que tu as appris » ; les 4 assiettes de 3 ; « 3 + 3 + 3 + 3 = 12 » et « 4 fois 3 ». | Des groupes tous pareils ? Je compte un groupe, puis je répète. Quatre fois trois, c'est trois plus trois plus trois plus trois. |
| 07-abonne | Écran de fin. | Entraîne-toi sur éleveai point f r, ou sur YouTube : éleveai neuf sept quatre ! |

### Short (≈ 45 s) — « Les pattes des chatons »
| Clé | Image | Voix |
|---|---|---|
| 00-accroche | Un panier : 3 chatons endormis, les pattes dépassent. « 3 » ; « 4 pattes chacun ». | Salut ! Trois chatons dorment dans un panier. Chacun a quatre pattes. |
| 01-question | Choix A 7, B 12, C 3. | Question ! Combien de pattes en tout ? A : sept. B : douze. C : trois. Mets pause, et choisis ! |
| 01b-reponse | Les chatons s'étirent l'un après l'autre : « 4, 8, 12 » ; « 4 + 4 + 4 = 12 ». | Réponse B ! Quatre, huit, douze. Trois fois quatre, douze pattes. Miaou ! |
| 02-commentaire | 4 mains ouvertes, 5 doigts chacune ; « ? ». | À toi : quatre mains, cinq doigts sur chaque main. Combien de doigts ? Dis-le à voix haute, ou réponds en commentaire ! |
| 03-abonne | Écran de fin. | Entraîne-toi sur éleveai point f r, ou sur YouTube : éleveai neuf sept quatre ! |

---

## CP 5 — `cp_probleme_partage` — « Partager »

### Paysage (≈ 1 min 30) — « Le pique-nique dans la forêt »
| Clé | Image | Voix |
|---|---|---|
| 00-accroche | Une clairière, de grands arbres. Une nappe à carreaux ; Ti Margo et deux amis. Un panier : 9 mandarines. « 9 » ; « 3 amis ». | Salut ! Pique-nique dans la forêt ! Nous sommes trois amis. Dans le panier, neuf mandarines. On les partage : autant chacun. |
| 01-distribue | Les mandarines roulent une par une devant chaque ami, tour après tour. | Je les donne une par une. Une pour toi, une pour toi, une pour moi. Encore un tour… et encore un. |
| 02-chacun | 3 mandarines devant chacun ; « 3 » sous chaque ami. | Le panier est vide. Chacun a trois mandarines. |
| 03-verif | « 3 + 3 + 3 = 9 ». | Je vérifie : trois plus trois plus trois, neuf. Je retrouve tout le panier. Le partage est juste ! |
| 04-question | 8 glands ; 2 écureuils sur une branche. Choix A 4, B 6, C 10. | Question ! Huit glands pour deux écureuils, autant chacun. Combien de glands pour chaque écureuil ? A : quatre. B : six. C : dix. Mets pause, et choisis ! |
| 04b-reponse | Les glands tombent un à un : 4 et 4 ; « 4 + 4 = 8 ». | Réponse A ! Quatre pour l'un, quatre pour l'autre. Quatre plus quatre, huit. |
| 05-question | 12 champignons ; Ti Margo en met 4 dans chaque petit sac. Choix A 3, B 8, C 16. | Question ! Douze champignons. J'en mets quatre dans chaque sac. Combien de sacs ? A : trois. B : huit. C : seize. Mets pause, et choisis ! |
| 05b-reponse | Les sacs se remplissent : « 4, 8, 12 » ; 3 sacs. « 4 + 4 + 4 = 12 ». | Réponse A ! Quatre, huit, douze. Trois sacs de quatre champignons. |
| 06-appris | « Ce que tu as appris » ; 3 amis, 3 mandarines chacun ; « 3 + 3 + 3 = 9 ». | Pour partager, je donne un par un, jusqu'au dernier. Puis je vérifie : les parts réunies redonnent le tout. |
| 07-abonne | Écran de fin. | Entraîne-toi sur éleveai point f r, ou sur YouTube : éleveai neuf sept quatre ! |

### Short (≈ 45 s) — « Les crêpes de mamie »
| Clé | Image | Voix |
|---|---|---|
| 00-accroche | Une cuisine chaude ; mamie fait sauter une crêpe. Une pile de 10 crêpes. 5 assiettes autour de la table. | Salut ! Mamie a fait dix crêpes. Nous sommes cinq à table. Autant chacun ! |
| 01-question | Choix A 5, B 15, C 2. | Question ! Combien de crêpes pour chacun ? A : cinq. B : quinze. C : deux. Mets pause, et choisis ! |
| 01b-reponse | Les crêpes volent dans les assiettes : 2 chacune. « 2 + 2 + 2 + 2 + 2 = 10 ». | Réponse C ! Deux crêpes chacun. Deux, quatre, six, huit, dix. Merci mamie ! |
| 02-commentaire | 6 bonbons, 3 enfants ; « ? ». | À toi : six bonbons pour trois enfants, autant chacun. Combien chacun ? Dis-le à voix haute, ou réponds en commentaire ! |
| 03-abonne | Écran de fin. | Entraîne-toi sur éleveai point f r, ou sur YouTube : éleveai neuf sept quatre ! |

---

## CP 6 — `cp_probleme_reponse` — « Ma réponse est-elle possible ? »

### Paysage (≈ 1 min 30) — « Les livres de la bibliothèque »
| Clé | Image | Voix |
|---|---|---|
| 00-accroche | Une bibliothèque calme. Une étagère : 20 livres, rouges et bleus. Un copain lève le doigt, bulle : « 24 rouges ! ». « 20 » et « 24 ». | Salut ! Sur l'étagère, vingt livres, des rouges et des bleus. Mon copain a compté. Il dit : il y a vingt-quatre livres rouges ! |
| 01-possible | La barre « 20 » ; une part « 24 » qui dépasse et déborde de la barre. | Est-ce possible ? Les rouges sont une partie des vingt livres. Une partie ne peut pas être plus grande que le tout ! |
| 02-recompte | Il recompte : 8 livres rouges s'éclairent. « 8 » tient dans la barre. | Il recompte : huit livres rouges. Huit, c'est moins que vingt. Ça, c'est possible ! |
| 03-phrase | Une phrase s'écrit sous l'étagère : « Il y a 8 livres rouges. » | Et je finis par une phrase qui répond à la question : il y a huit livres rouges. |
| 04-question | Une classe : 25 élèves. Une élève dit, bulle : « 30 filles ! ». Choix A oui, B non, c'est plus que toute la classe, C on ne peut pas savoir. | Question ! Dans la classe, vingt-cinq élèves. Une élève dit : il y a trente filles. Est-ce possible ? A : oui. B : non, c'est plus que toute la classe. C : on ne peut pas savoir. Mets pause, et choisis ! |
| 04b-reponse | La barre « 25 » ; la part « 30 » déborde, puis se dégonfle. | Réponse B ! Les filles sont une partie de la classe. Trente, c'est plus que vingt-cinq : impossible ! |
| 05-question | Nina a 6 crayons et en achète 2. Écrit : « Combien en a-t-elle ? ». Choix A « Nina a 6 crayons. », B « Nina a acheté 2 crayons. », C « Nina a 8 crayons. » | Question ! Nina a six crayons. Elle en achète deux. Combien en a-t-elle ? Quelle phrase répond à la question ? A : Nina a six crayons. B : Nina a acheté deux crayons. C : Nina a huit crayons. Mets pause, et choisis ! |
| 05b-reponse | « 6 + 2 = 8 » ; la phrase C s'éclaire. | Réponse C ! Six plus deux, huit. La phrase dit combien elle en a maintenant : Nina a huit crayons. |
| 06-appris | « Ce que tu as appris » ; « Est-ce possible ? » ; « Une phrase qui répond ». | Quand j'ai trouvé, je vérifie que c'est possible. Puis j'écris une phrase qui répond à la question. |
| 07-abonne | Écran de fin. | Entraîne-toi sur éleveai point f r, ou sur YouTube : éleveai neuf sept quatre ! |

### Short (≈ 45 s) — « Les cerises de Lina »
| Clé | Image | Voix |
|---|---|---|
| 00-accroche | Un bol de 10 cerises ; Lina en mange 4, les noyaux dans une soucoupe. Bulle : « Il m'en reste 14 ! ». « 10 », « 4 », « 14 ». | Salut ! Lina avait dix cerises. Elle en mange quatre. Elle dit : il m'en reste quatorze ! |
| 01-question | Choix A oui, bravo Lina, B on ne peut pas savoir, C non, il ne peut pas en rester plus qu'au début. | Question ! Est-ce possible ? A : oui, bravo Lina. B : on ne peut pas savoir. C : non, il ne peut pas en rester plus qu'au début. Mets pause, et choisis ! |
| 01b-reponse | « 14 » se barre ; « 10 − 4 = 6 » ; 6 cerises dans le bol. Lina rit. | Réponse C ! Elle en a mangé : il en reste moins que dix. Dix moins quatre, six cerises. |
| 02-commentaire | Un bocal : 3 poissons, on en ajoute 2. Tom dit : « 1 ». « ? ». | À toi : trois poissons dans le bocal. On en ajoute deux. Tom trouve un poisson. Est-ce possible ? Dis-le à voix haute, ou réponds en commentaire ! |
| 03-abonne | Écran de fin. | Entraîne-toi sur éleveai point f r, ou sur YouTube : éleveai neuf sept quatre ! |

---

## CP 7 — `cp_probleme_defi` — « Défis de problèmes »

### Paysage (≈ 1 min 45) — « Les défis du cirque »
| Clé | Image | Voix |
|---|---|---|
| 00-accroche | Un chapiteau rouge et blanc, une piste ronde. Un clown tient 6 ballons ; à côté, 5 ballons partis chez des enfants. « Défi 1 » ; « ? » ; « 5 » ; « 6 ». | Salut ! Au cirque, le clown me lance des défis. Défi un : j'avais des ballons. J'en ai donné cinq. Il m'en reste six. Combien en avais-je au début ? |
| 01-debut | Les 5 ballons reviennent vers le clown ; « 6 + 5 = 11 ». | Au début, il en avait plus ! Je remets les ballons donnés. Six plus cinq, onze ballons. |
| 02-defi2 | « Défi 2 » ; un jongleur avec 12 balles, une jongleuse avec des balles cachées. Écrit : « 3 de plus qu'elle ». | Défi deux : le jongleur a douze balles. Il en a trois de plus que la jongleuse. Combien en a-t-elle ? |
| 03-piege | Le mot « plus » s'allume, puis « 12 − 3 = 9 » ; la jongleuse montre 9 balles. | Le mot plus est là… Mais c'est lui qui en a le plus ! Elle en a moins. Douze moins trois, neuf. |
| 04-question | Une acrobate avec des rubans ; 4 rubans s'envolent ; il en reste 8. Choix A 4, B 8, C 12. | Question ! L'acrobate avait des rubans. Elle en perd quatre. Il lui en reste huit. Combien en avait-elle au début ? A : quatre. B : huit. C : douze. Mets pause, et choisis ! |
| 04b-reponse | Les 4 rubans reviennent ; « 8 + 4 = 12 ». | Réponse C ! Au début, elle en avait plus. Huit plus quatre, douze rubans. |
| 05-question | Le tigre saute 7 cerceaux ; écrit : « 2 de moins que le lion ». Le lion attend. Choix A 5, B 7, C 9. | Question ! Le tigre saute sept cerceaux. C'est deux de moins que le lion. Combien de cerceaux saute le lion ? A : cinq. B : sept. C : neuf. Mets pause, et choisis ! |
| 05b-reponse | Le mot « moins » s'allume ; « 7 + 2 = 9 » ; le lion saute 9 cerceaux. | Réponse C ! Le tigre en saute moins. Donc le lion en saute plus. Sept plus deux, neuf ! |
| 06-appris | « Ce que tu as appris » ; « Au début ? je remets ce qui est parti » ; « plus, moins : je lis l'histoire ». | Pour trouver le début, je remets ce qui est parti. Et le mot plus ne veut pas toujours dire j'ajoute : c'est l'histoire qui décide. |
| 07-abonne | Écran de fin. | Entraîne-toi sur éleveai point f r, ou sur YouTube : éleveai neuf sept quatre ! |

### Short (≈ 45 s) — « Les billes de la récré »
| Clé | Image | Voix |
|---|---|---|
| 00-accroche | Une cour d'école, un marronnier. Ti Margo devant un petit trou ; 3 billes roulent vers lui. Son sac : 10 billes. « 3 » et « 10 ». | Salut ! Ce matin, j'avais des billes. À la récré, j'en gagne trois. Maintenant, j'en ai dix ! |
| 01-question | Choix A 13, B 3, C 7. | Question ! Combien de billes avais-je ce matin ? A : treize. B : trois. C : sept. Mets pause, et choisis ! |
| 01b-reponse | Les 3 billes gagnées ressortent du sac ; « 10 − 3 = 7 ». | Réponse C ! Ce matin, j'en avais moins. J'enlève les billes gagnées : dix moins trois, sept. A, c'est le piège du mot gagne ! |
| 02-commentaire | 2 papiers de bonbon ; 5 bonbons dans la main ; « ? ». | À toi : j'ai mangé deux bonbons. Il m'en reste cinq. Combien en avais-je au début ? Dis-le à voix haute, ou réponds en commentaire ! |
| 03-abonne | Écran de fin. | Entraîne-toi sur éleveai point f r, ou sur YouTube : éleveai neuf sept quatre ! |

---

# CE1 : la division, des groupements au reste

## CE1 1 — `ce1_division_groupement` — « Combien de paquets ? »

### Paysage (≈ 1 min 30) — « Les croissants du boulanger »
| Clé | Image | Voix |
|---|---|---|
| 00-accroche | Une boulangerie au petit matin, le four s'ouvre : 24 croissants dorés sur une plaque. Des boîtes vides de 6 places. « 24 » ; « 6 par boîte ». | Salut ! Le boulanger sort vingt-quatre croissants du four. Il les range par boîtes de six. Combien de boîtes lui faut-il ? |
| 01-paquets | Les croissants filent dans les boîtes, six par six : « 6, 12, 18, 24 ». | Je fais des paquets de six. Six, douze, dix-huit, vingt-quatre. |
| 02-boites | 4 boîtes fermées, numérotées « 1 », « 2 », « 3 », « 4 ». | Je compte les paquets : quatre boîtes. |
| 03-difference | À gauche, un partage (on connaît le nombre de parts) ; à droite, le groupement (on connaît la taille d'un paquet) ; « 4 × 6 = 24 ». | Attention : ici, je connais la taille d'un paquet, six. Je cherche le nombre de paquets. Je vérifie : quatre fois six, vingt-quatre. |
| 04-question | Un gymnase : 30 élèves ; des chasubles par groupes de 5. Choix A 25, B 6, C 35. | Question ! Trente élèves font des équipes de cinq. Combien d'équipes ? A : vingt-cinq. B : six. C : trente-cinq. Mets pause, et choisis ! |
| 04b-reponse | « 5, 10, 15, 20, 25, 30 » ; 6 équipes ; « 6 × 5 = 30 ». | Réponse B ! Cinq, dix, quinze, vingt, vingt-cinq, trente. Six équipes de cinq. |
| 05-question | Une ferme : 40 œufs ; des boîtes de 10. Choix A 4, B 10, C 50. | Question ! Quarante œufs, rangés par boîtes de dix. Combien de boîtes ? A : quatre. B : dix. C : cinquante. Mets pause, et choisis ! |
| 05b-reponse | « 10, 20, 30, 40 » ; 4 boîtes ; « 4 × 10 = 40 ». | Réponse A ! Dix, vingt, trente, quarante. Quatre boîtes de dix œufs. |
| 06-appris | « Ce que tu as appris » ; 4 boîtes de 6 ; « 6, 12, 18, 24 ». | Je connais la taille d'un paquet ? Je fais des paquets, et je les compte. Puis je vérifie avec une multiplication. |
| 07-abonne | Écran de fin. | Entraîne-toi sur éleveai point f r, ou sur YouTube : éleveai neuf sept quatre ! |

### Short (≈ 45 s) — « Les chaussettes par paires »
| Clé | Image | Voix |
|---|---|---|
| 00-accroche | Un panier à linge renversé : 16 chaussettes de toutes les couleurs. Ti Margo les assemble deux par deux. « 16 » ; « par 2 ». | Salut ! Dans le panier à linge, seize chaussettes. Je les range par paires : deux par deux. |
| 01-question | Choix A 14, B 8, C 18. | Question ! Combien de paires ? A : quatorze. B : huit. C : dix-huit. Mets pause, et choisis ! |
| 01b-reponse | Les paires se forment : « 2, 4, 6 … 16 » ; 8 paires ; « 8 × 2 = 16 ». | Réponse B ! Deux, quatre, six, huit, dix, douze, quatorze, seize. Huit paires ! |
| 02-commentaire | 20 roues ; des petites voitures à 4 roues ; « ? ». | À toi : vingt roues, quatre roues par voiture. Combien de voitures ? Dis-le à voix haute, ou réponds en commentaire ! |
| 03-abonne | Écran de fin. | Entraîne-toi sur éleveai point f r, ou sur YouTube : éleveai neuf sept quatre ! |

---

## CE1 2 — `ce1_division_reste` — « Il en reste ! »

### Paysage (≈ 1 min 30) — « Les bouquets de la classe »
| Clé | Image | Voix |
|---|---|---|
| 00-accroche | Une classe, des fleurs des champs sur une table : 17. Des rubans. « 17 » ; « 5 par bouquet ». | Salut ! Pour la fête de l'école, on fait des bouquets. Dix-sept fleurs, cinq par bouquet. Combien de bouquets ? |
| 01-bouquets | Les fleurs se rassemblent par 5 : « 5, 10, 15 » ; 3 bouquets noués. 2 fleurs restent seules. | Cinq, dix, quinze. Trois bouquets ! Et il reste deux fleurs. |
| 02-reste | Les 2 fleurs seules ; « reste 2 » ; « 2 < 5 ». | Deux fleurs, ce n'est pas assez pour un bouquet. Le reste est toujours plus petit qu'un paquet. |
| 03-verif | « 3 × 5 + 2 = 17 ». | Je vérifie : trois fois cinq, quinze. Plus deux, dix-sept. Toutes les fleurs sont là ! |
| 04-question | Une ferme : 23 œufs ; des boîtes de 6. Écrit : « boîtes PLEINES ». Choix A 4, B 3, C 29. | Question ! Le fermier a vingt-trois œufs. Il remplit des boîtes de six. Combien de boîtes pleines ? A : quatre. B : trois. C : vingt-neuf. Mets pause, et choisis ! |
| 04b-reponse | « 6, 12, 18 » ; 3 boîtes pleines ; 5 œufs restent. « 3 × 6 + 5 = 23 ». | Réponse B ! Six, douze, dix-huit : trois boîtes pleines. Il reste cinq œufs. Pas assez pour une quatrième boîte. |
| 05-question | Une sortie : 22 enfants ; des voitures de 5 places. Écrit : « pour que TOUS partent ». Choix A 5, B 4, C 27. | Question ! Vingt-deux enfants partent en sortie, cinq par voiture. Combien de voitures pour que tous partent ? A : cinq. B : quatre. C : vingt-sept. Mets pause, et choisis ! |
| 05b-reponse | 4 voitures pleines : « 5, 10, 15, 20 » ; 2 enfants restent sur le trottoir ; une cinquième voiture arrive. | Réponse A ! Quatre voitures, vingt enfants. Mais il en reste deux ! Il faut une voiture de plus : cinq voitures. |
| 06-appris | « Ce que tu as appris » ; 3 bouquets et 2 fleurs ; « le reste < un paquet ». | Parfois, il reste des objets. Le reste est plus petit qu'un paquet. Je relis la question : des paquets pleins, ou tout le monde ? |
| 07-abonne | Écran de fin. | Entraîne-toi sur éleveai point f r, ou sur YouTube : éleveai neuf sept quatre ! |

### Short (≈ 45 s) — « Les cookies des quatre amis »
| Clé | Image | Voix |
|---|---|---|
| 00-accroche | Une plaque de 14 cookies qui fument ; quatre amis autour de la table. « 14 » ; « 4 amis ». | Salut ! Quatorze cookies pour quatre amis, autant chacun. |
| 01-question | Choix A 4, B 3, C 2. | Question ! Combien de cookies restent sur la plaque ? A : quatre. B : trois. C : deux. Mets pause, et choisis ! |
| 01b-reponse | Les cookies se distribuent : 3 chacun ; 2 restent. « 4 × 3 + 2 = 14 ». | Réponse C ! Trois cookies chacun : douze. Il en reste deux sur la plaque. |
| 02-commentaire | 19 cartes ; 3 joueurs ; « reste ? ». | À toi : dix-neuf cartes pour trois joueurs, autant chacun. Combien en reste-t-il ? Dis-le à voix haute, ou réponds en commentaire ! |
| 03-abonne | Écran de fin. | Entraîne-toi sur éleveai point f r, ou sur YouTube : éleveai neuf sept quatre ! |

---

## CE1 3 — `ce1_division_defi` — « Défis de partage »

### Paysage (≈ 1 min 45) — « Les défis du tournoi »
| Clé | Image | Voix |
|---|---|---|
| 00-accroche | Un terrain de foot, des drapeaux. 32 joueurs en maillot. « Défi 1 » ; « 32 » ; « 8 par équipe ». | Salut ! Au tournoi de foot, voici les défis. Défi un : trente-deux joueurs font des équipes de huit. Combien d'équipes ? |
| 01-equipes | Les joueurs se rangent par 8 : « 8, 16, 24, 32 » ; « 4 × 8 = 32 ». | Huit, seize, vingt-quatre, trente-deux. Quatre équipes ! |
| 02-defi2 | « Défi 2 » ; 3 packs de 6 gourdes ; 2 équipes. | Défi deux : trois packs de six gourdes. On les partage entre deux équipes. Combien de gourdes par équipe ? |
| 03-etapes | « 6 + 6 + 6 = 18 » ; puis 9 et 9 ; « 9 + 9 = 18 ». | Étape un : six, douze, dix-huit gourdes. Étape deux : dix-huit, partagé en deux. Neuf gourdes par équipe ! |
| 04-question | 25 ballons ; des filets de 6. Écrit : « TOUS les ballons ». Choix A 4, B 5, C 6. | Question ! Vingt-cinq ballons, rangés dans des filets de six. Combien de filets pour ranger tous les ballons ? A : quatre. B : cinq. C : six. Mets pause, et choisis ! |
| 04b-reponse | « 6, 12, 18, 24 » ; 4 filets pleins ; 1 ballon reste ; un cinquième filet. | Réponse B ! Quatre filets, vingt-quatre ballons. Il en reste un : il faut un filet de plus. Cinq filets ! |
| 05-question | 2 équipes de 10 enfants ; on fait des groupes de 5. Choix A 2, B 4, C 15. | Question ! Deux équipes de dix enfants. On fait des groupes de cinq. Combien de groupes ? A : deux. B : quatre. C : quinze. Mets pause, et choisis ! |
| 05b-reponse | « 10 + 10 = 20 » ; « 5, 10, 15, 20 » ; 4 groupes. | Réponse B ! Dix plus dix, vingt enfants. Cinq, dix, quinze, vingt : quatre groupes. |
| 06-appris | « Ce que tu as appris » ; « Partage ou paquets ? » ; « Il reste ? je relis la question ». | Je lis bien : je cherche le nombre de paquets, ou combien dans chaque paquet ? S'il reste des objets, je relis la question. |
| 07-abonne | Écran de fin. | Entraîne-toi sur éleveai point f r, ou sur YouTube : éleveai neuf sept quatre ! |

### Short (≈ 45 s) — « Les sandwichs du goûter »
| Clé | Image | Voix |
|---|---|---|
| 00-accroche | Une nappe dans l'herbe ; 3 paquets de 4 sandwichs ; 6 enfants assis. « 3 paquets de 4 » ; « 6 enfants ». | Salut ! Trois paquets de quatre sandwichs. Six enfants. Autant chacun ! |
| 01-question | Choix A 2, B 12, C 4. | Question ! Combien de sandwichs pour chacun ? A : deux. B : douze. C : quatre. Mets pause, et choisis ! |
| 01b-reponse | « 4 + 4 + 4 = 12 » ; puis 2 sandwichs devant chaque enfant ; « 6 × 2 = 12 ». | Réponse A ! Trois fois quatre, douze sandwichs. Douze pour six enfants : deux chacun ! |
| 02-commentaire | 36 chaises ; des rangées de 9 ; « ? ». | À toi : trente-six chaises, rangées par neuf. Combien de rangées ? Dis-le à voix haute, ou réponds en commentaire ! |
| 03-abonne | Écran de fin. | Entraîne-toi sur éleveai point f r, ou sur YouTube : éleveai neuf sept quatre ! |
