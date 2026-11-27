# CP — Nombres entiers : les 6 derniers dessins animés (paysage + short), 27/11/2026

Suite des paires 1-3 (`SCRIPTS-cp-nombres-dessins-animes.md`) et 4-6 (`SCRIPTS-cp-nombres-dessins-animes-2.md`).
Même socle Ti Margo, même ton : poétique, phrases courtes, les nombres en grand, peu de texte, chaque nombre dit est écrit.
Ceinture blanche partout. Séries `cp-entier2` (shorts) et `cp-entier2-paysage` (paysages). Sorties `manim/sorties/cp/maths/entier/07-lire` → `12-defi`.

**Nouveau (test avec un enfant de CP, 27/11)** : il n'a pas vu le « TU PARIES ? » écrit. Dans ces 12 films, l'accroche passe par
le DESSIN (quelque chose qui intrigue : une ombre, des yeux dans la nuit, un coffre qui brille) et par une QUESTION DITE.
Aucun « TU PARIES ? » écrit, ni dans le film ni sur la miniature (miniature = la question courte + le dessin mystère).

Fin de toutes les vidéos : voix « Entraîne-toi sur éleveai point f r, ou sur YouTube : éleveai neuf sept quatre ! »,
écran « Entraîne-toi sur eleveai.fr » / « ou sur YouTube @eleveai974 ». Dans les shorts, « réponds en commentaire » juste avant.

Bonnes réponses tirées au hasard (18 questions : 6 A, 6 B, 6 C) :
07 → B, A, short C · 08 → A, B, short B · 09 → B, B, short C · 10 → C, A, short B · 11 → C, A, short C · 12 → A, C, short A.
Contextes : le bus de la piscine, la rue de mamie le soir, la boîte à perles, le potager de papi, la tirelire, la tour de cubes
sous la lune, le petit train de la fête, le port au coucher du soleil, les cerfs-volants, les pots de confiture, les cartes dans
le vent, le bal masqué des nombres, les mains derrière le mur, le hibou des devinettes, le coffre au trésor.

État : ⏳ voix à valider par Frédéric (rien n'est enregistré). Les brouillons `manim/voix/cp-entier-lire-{paysage,short}.json`
du 26/11 (ancienne fin « pouce, cloche ») seront remplacés par ces voix.

---

## 7. « Lire et écrire les nombres » — micro `cp_entier_lire_ecrire`

### Paysage (≈ 1 min 40) — « Le bus de la piscine »
| Clé | Image | Voix |
|---|---|---|
| 00-accroche | L'arrêt de bus, le matin, dans la brume. Un bus arrive : son numéro est caché par la buée. Ti Margo tient son ticket : « 4 » puis « 7 ». | Salut ! Ce matin, on va à la piscine en bus. Un bus arrive dans la brume… Est-ce que c'est le nôtre ? Sur mon ticket, il y a un quatre, puis un sept. |
| 01-lire | La buée s'efface : « 47 ». Le 4 s'allume, puis le 7. « quarante-sept » écrit dessous. | Je lis d'abord le chiffre de devant : quatre, ça fait quarante. Puis celui de derrière : sept. Quarante-sept ! C'est notre bus ! |
| 02-piege | Le 7 saute devant le 4 : « 74 ». Le bus fait la grimace et repart. | Attention ! Si le sept passe devant, on lit soixante-quatorze. Ce n'est plus notre bus ! |
| 03-ecrire | Le chauffeur parle (bulle sonore). « vingt-huit » → un « 2 » s'écrit, puis un « 8 » juste à côté : « 28 ». | Et pour écrire un nombre que j'entends ? Le chauffeur dit : vingt-huit. J'entends vingt : j'écris un deux. J'entends huit : j'écris un huit, juste à côté. Vingt-huit ! |
| 04-question | Un autre bus approche, le chauffeur crie son numéro. Choix A 23, B 32, C 302. | Question ! Le chauffeur crie : trente-deux ! Quel numéro est écrit sur son bus ? A : vingt-trois. B : trente-deux. C : trois cent deux. Mets pause, et choisis ! |
| 04b-reponse | « 3 » s'écrit, puis « 2 » à côté : « 32 » sur le bus. | Réponse B ! J'entends trente : un trois devant. J'entends deux : un deux derrière. Trente-deux ! |
| 05-question | À la piscine, un bracelet de casier : « 65 ». Choix A soixante-cinq, B cinquante-six, C six-cinq. | Question ! À la piscine, voici la clé de mon casier. Comment se lit ce nombre ? A : soixante-cinq. B : cinquante-six. C : six-cinq. Mets pause, et choisis ! |
| 05b-reponse | Le 6 s'allume (« soixante »), puis le 5. Le casier s'ouvre : une serviette, des lunettes. | Réponse A ! Un six devant : soixante. Un cinq derrière : soixante-cinq. Voilà mon casier ! |
| 06-appris | « Ce que tu as appris », en haut, centré ; « 47 » et « 74 » côte à côte. | Je lis le chiffre de devant, puis celui de derrière. Quand j'entends un nombre, j'écris d'abord le chiffre des dizaines. L'ordre des chiffres compte ! |
| 07-abonne | Écran de fin (eleveai.fr, @eleveai974). | Entraîne-toi sur éleveai point f r, ou sur YouTube : éleveai neuf sept quatre ! |

### Short (≈ 50 s) — « La porte de mamie »
| Clé | Image | Voix |
|---|---|---|
| 00-accroche | Une rue le soir. Toutes les portes se ressemblent. Ti Margo avance avec une lanterne qui éclaire les portes une à une ; une bulle-téléphone : « quarante et un ». | Salut ! Ce soir, je vais chez ma mamie. Au téléphone, elle m'a dit : j'habite au quarante et un. Mais toutes les portes se ressemblent ! Laquelle est la sienne ? |
| 01-question | Trois portes éclairées : A 14, B 401, C 41 (carte à droite sous l'ardoise, Ti Margo visible). | Question ! Quelle est la porte de mamie ? A : quatorze. B : quatre cent un. C : quarante et un. Mets pause, et choisis ! |
| 01b-reponse | « 4 » puis « 1 » s'écrivent ; la porte 41 s'ouvre, la fenêtre s'allume, mamie fait coucou. | Réponse C ! Quarante, c'est un quatre devant. Et un, c'est un un derrière. Quarante et un. Bonjour mamie ! |
| 02-commentaire | « soixante-dix » écrit en lettres, puis « ? ? ». | À toi : comment écris-tu soixante-dix en chiffres ? Dis-le à voix haute, ou réponds en commentaire ! |
| 03-abonne | Écran de fin : « Entraîne-toi sur eleveai.fr » / « ou sur YouTube @eleveai974 ». | Entraîne-toi sur éleveai point f r, ou sur YouTube : éleveai neuf sept quatre ! |

---

## 8. « Des dizaines plus des unités » — micro `cp_entier_decomposer`

### Paysage (≈ 1 min 40) — « La boîte à perles »
| Clé | Image | Voix |
|---|---|---|
| 00-accroche | Une boîte à bijoux s'ouvre toute seule ; une lumière en sort ; des perles de toutes les couleurs roulent partout. | Salut ! Pour l'anniversaire de ma sœur, je fais un bracelet. Regarde ma boîte à perles ! Combien de perles se cachent là-dedans ? |
| 01-fils | Les perles s'enfilent par dix sur des fils : 1 fil, 2 fils, 3 fils. Il reste 4 perles seules. | Je les enfile par dix sur des fils. Un fil, deux fils, trois fils. Et quatre perles toutes seules. |
| 02-addition | Sous les fils : « 10, 20, 30 » ; sous les perles seules : « 4 ». Puis « 30 + 4 ». | Trois fils de dix : dix, vingt, trente. Plus quatre perles. Trente plus quatre ! |
| 03-nombre | « 30 + 4 = 34 » en très grand ; le 3 de 34 brille de la couleur des fils, le 4 de la couleur des perles seules. | Trente plus quatre, c'est trente-quatre. Dans trente-quatre, le trois vaut trente. Le quatre vaut quatre. |
| 04-question | Le potager de papi : 5 rangées de 10 salades, et 2 salades seules. Choix A 50 + 2, B 5 + 2, C 20 + 5. | Question ! Dans le potager, papi a planté cinq rangées de dix salades. Et deux salades toutes seules. Quelle addition va avec le dessin ? A : cinquante plus deux. B : cinq plus deux. C : vingt plus cinq. Mets pause, et choisis ! |
| 04b-reponse | Les rangées comptent « 10, 20, 30, 40, 50 », puis « + 2 » ; « 50 + 2 = 52 ». | Réponse A ! Cinq rangées de dix : cinquante. Plus deux salades : cinquante plus deux. Ça fait cinquante-deux ! |
| 05-question | « 68 = 60 + ? » en grand ; un tissu cache des fils de perles. Choix A 6, B 8, C 60. | Question ! Soixante-huit, c'est soixante plus combien ? A : six. B : huit. C : soixante. Mets pause, et choisis ! |
| 05b-reponse | Le tissu s'envole : 6 fils de dix et 8 perles seules. « 68 = 60 + 8 ». | Réponse B ! Soixante-huit, c'est six fils de dix, et huit perles toutes seules. Soixante plus huit ! |
| 06-appris | « Ce que tu as appris » ; les 3 fils et les 4 perles, « 34 = 30 + 4 ». | Un nombre, c'est des dizaines plus des unités. Trente-quatre, c'est trente plus quatre. |
| 07-abonne | Écran de fin. | Entraîne-toi sur éleveai point f r, ou sur YouTube : éleveai neuf sept quatre ! |

### Short (≈ 50 s) — « La tirelire »
| Clé | Image | Voix |
|---|---|---|
| 00-accroche | Une tirelire cochon qui tremble et tinte sur une étagère. Elle s'ouvre : 4 billets de 10 € et 6 pièces de 1 € s'envolent et se posent. | Salut ! Ma tirelire est toute lourde. Je la secoue : ding, ding ! Combien d'euros sont cachés dedans ? Quatre billets de dix euros, et six pièces d'un euro ! |
| 01-question | Choix A 10, B 46, C 64. | Question ! Combien d'euros dans ma tirelire ? A : dix. B : quarante-six. C : soixante-quatre. Mets pause, et choisis ! |
| 01b-reponse | Les billets comptent « 10, 20, 30, 40 », puis « + 6 » ; « 40 + 6 = 46 ». | Réponse B ! Quatre billets de dix : quarante. Six pièces : six. Quarante plus six : quarante-six euros ! |
| 02-commentaire | « 20 + 9 = ? » en grand. | À toi : vingt plus neuf, ça fait combien ? Dis-le à voix haute, ou réponds en commentaire ! |
| 03-abonne | Écran de fin : « Entraîne-toi sur eleveai.fr » / « ou sur YouTube @eleveai974 ». | Entraîne-toi sur éleveai point f r, ou sur YouTube : éleveai neuf sept quatre ! |

---

## 9. « Premier, deuxième… vingtième » — micro `cp_entier_ordinal`

### Paysage (≈ 1 min 45) — « La tour qui touche la lune »
| Clé | Image | Voix |
|---|---|---|
| 00-accroche | La nuit, une grosse lune toute ronde, tout en haut. Ti Margo pose un premier cube par terre ; la tour vacille un peu. | Salut ! Ce soir, je construis une tour de cubes. Je veux toucher la lune ! Mais quel cube va la toucher ? |
| 01-mots | Les cubes se posent un par un, chacun avec son étiquette : « 1er », « 2e », « 3e », « 4e ». | Le premier cube. Le deuxième. Le troisième. Le quatrième. Pour dire la place, j'ajoute ième au nombre : quatre, quatrième. |
| 02-ecrire | Zoom sur « 4e » : le petit e en haut grandit puis rétrécit. Puis « 1er » : le « er » brille. | On l'écrit avec un petit e en haut : quatre, petit e. Mais attention : on ne dit pas unième. On dit premier ! On écrit un, avec e, r. |
| 03-pieges | Le 5e cube (« 5e cinquième ») puis le 9e (« 9e neuvième ») ; le f de « neuf » se change en v. La tour monte jusqu'au 10e. | Cinq devient cinquième. Neuf devient neuvième : le f se change en v ! Et on continue : dixième. |
| 04-question | Une tour de 7 cubes ; le 7e cube brille. Choix A le 6e, B le 7e, C le 8e. | Question ! Le cube qui brille, c'est lequel ? A : le sixième. B : le septième. C : le huitième. Mets pause, et compte depuis le bas ! |
| 04b-reponse | Les étiquettes s'allument depuis le bas : « 1er, 2e, 3e, 4e, 5e, 6e, 7e ». | Réponse B ! Premier, deuxième, troisième, quatrième, cinquième, sixième, septième. Le septième cube ! On écrit sept, petit e. |
| 05-question | La tour a 20 cubes ; le dernier touche la lune. Choix A « 2e », B « 20e », C « 20 ». | Question ! Le dernier cube touche la lune : c'est le vingtième. Comment l'écrit-on ? A : deux, petit e. B : vingt, petit e. C : vingt, tout seul. Mets pause, et choisis ! |
| 05b-reponse | « 20e » s'écrit sur le dernier cube ; la lune s'allume et sourit. | Réponse B ! Vingtième : vingt, avec un petit e en haut. Regarde, la lune s'allume ! |
| 06-appris | « Ce que tu as appris » ; la tour, « 1er », « 4e », « 20e ». | Pour dire une place, j'ajoute ième : quatrième, vingtième. Mais le tout premier, c'est premier ! |
| 07-abonne | Écran de fin. | Entraîne-toi sur éleveai point f r, ou sur YouTube : éleveai neuf sept quatre ! |

### Short (≈ 50 s) — « Le petit train de la fête »
| Clé | Image | Voix |
|---|---|---|
| 00-accroche | La fête foraine le soir, guirlandes. Un petit train de 10 wagons passe ; dans un wagon, un ourson agite la patte. | Salut ! À la fête, le petit train passe. Oh ! Mon ourson est monté tout seul dedans ! Dans quel wagon est-il ? |
| 01-question | Le train s'arrête ; l'ourson est dans le 9e wagon (compté depuis la locomotive). Choix A le 8e, B le 10e, C le 9e. | Question ! Je compte depuis la locomotive. Mon ourson est dans quel wagon ? A : le huitième. B : le dixième. C : le neuvième. Mets pause, et compte ! |
| 01b-reponse | Les wagons s'allument : « 1er, 2e, 3e … 8e, 9e » ; l'ourson saute dans les bras de Ti Margo. | Réponse C ! Premier, deuxième, troisième… huitième, neuvième ! Le neuvième wagon. Neuf devient neuvième : le f se change en v ! |
| 02-commentaire | « 11e → ? » en grand. | À toi : je suis juste après le onzième. Quelle est ma place ? Dis-le à voix haute, ou réponds en commentaire ! |
| 03-abonne | Écran de fin : « Entraîne-toi sur eleveai.fr » / « ou sur YouTube @eleveai974 ». | Entraîne-toi sur éleveai point f r, ou sur YouTube : éleveai neuf sept quatre ! |

---

## 10. « Du plus petit au plus grand » — micro `cp_entier_ordonner`

### Paysage (≈ 1 min 45) — « Les bateaux rentrent au port »
| Clé | Image | Voix |
|---|---|---|
| 00-accroche | Le port au coucher du soleil. Quatre petits bateaux en désordre, numéros sur les voiles : 21, 5, 30, 12. Ils se cognent doucement. | Salut ! Le soir, les petits bateaux rentrent au port. Mais quel désordre ! Comment les ranger, du plus petit au plus grand ? |
| 01-petit | Le bateau 5 glisse en premier le long du quai. | Je cherche d'abord le plus petit. Cinq ! Il n'a qu'un chiffre : il passe devant. |
| 02-dizaines | Les dizaines des voiles brillent : le 1 de 12, le 2 de 21, le 3 de 30. Les bateaux se placent. | Ensuite, je regarde les dizaines. Douze a une dizaine. Vingt et un en a deux. Trente en a trois. |
| 03-range | Les 4 bateaux alignés : « 5 < 12 < 21 < 30 ». Les lumières du port s'allument. | Cinq, douze, vingt et un, trente. Du plus petit au plus grand. Bonne nuit, les bateaux ! |
| 04-question | Au parc, trois cerfs-volants : 40, 24, 14. Choix A 40, B 24, C 14. | Question ! Trois cerfs-volants dansent dans le ciel : quarante, vingt-quatre, quatorze. Lequel passe en premier, si je range du plus petit au plus grand ? A : quarante. B : vingt-quatre. C : quatorze. Mets pause, et choisis ! |
| 04b-reponse | Le 14 descend en premier, puis 24, puis 40 : « 14 < 24 < 40 ». | Réponse C ! Quatorze n'a qu'une dizaine : il passe en premier. Puis vingt-quatre. Puis quarante. |
| 05-question | L'étagère de mamie : pots de confiture 38, 32, 35. Trois rangements : A 32, 35, 38 ; B 38, 35, 32 ; C 35, 32, 38. | Question ! Mamie range ses pots de confiture, du plus petit au plus grand. Quel rangement est juste ? A : trente-deux, trente-cinq, trente-huit. B : trente-huit, trente-cinq, trente-deux. C : trente-cinq, trente-deux, trente-huit. Mets pause, et choisis ! |
| 05b-reponse | Les 3 dizaines brillent ensemble ; puis les unités 2, 5, 8 ; les pots se rangent : « 32 < 35 < 38 ». | Réponse A ! Ils ont tous trois dizaines. Alors je regarde les unités : deux, puis cinq, puis huit. |
| 06-appris | « Ce que tu as appris » ; les bateaux rangés. | Je cherche le plus petit. Je regarde d'abord les dizaines. Si elles sont pareilles, je regarde les unités. |
| 07-abonne | Écran de fin. | Entraîne-toi sur éleveai point f r, ou sur YouTube : éleveai neuf sept quatre ! |

### Short (≈ 50 s) — « Les cartes dans le vent »
| Clé | Image | Voix |
|---|---|---|
| 00-accroche | Un coup de vent dans le jardin : trois cartes s'envolent en tournoyant, puis retombent : 91, 9, 19. | Salut ! Le vent a fait voler mes cartes ! Quatre-vingt-onze, neuf, dix-neuf. Tout est mélangé ! Comment les remettre dans l'ordre ? |
| 01-question | Choix A 91, 19, 9 ; B 9, 19, 91 ; C 19, 9, 91. | Question ! Quel est le bon rangement, du plus petit au plus grand ? A : quatre-vingt-onze, dix-neuf, neuf. B : neuf, dix-neuf, quatre-vingt-onze. C : dix-neuf, neuf, quatre-vingt-onze. Mets pause, et choisis ! |
| 01b-reponse | Les cartes se posent en éventail : « 9 < 19 < 91 ». | Réponse B ! Neuf n'a qu'un chiffre : c'est le plus petit. Dix-neuf a une dizaine. Quatre-vingt-onze en a neuf. Neuf, dix-neuf, quatre-vingt-onze ! |
| 02-commentaire | « 50 ; 15 ; 5 » en grand. | À toi : range-les du plus petit au plus grand : cinquante, quinze, cinq. Dis-le à voix haute, ou réponds en commentaire ! |
| 03-abonne | Écran de fin : « Entraîne-toi sur eleveai.fr » / « ou sur YouTube @eleveai974 ». | Entraîne-toi sur éleveai point f r, ou sur YouTube : éleveai neuf sept quatre ! |

---

## 11. « Un nombre, plusieurs costumes » — micro `cp_entier_representations`

### Paysage (≈ 1 min 45) — « Le bal masqué des nombres »
| Clé | Image | Voix |
|---|---|---|
| 00-accroche | Un rideau de théâtre rouge s'ouvre. Sur la scène, une ombre avec un masque et un grand « ? ». | Salut ! Ce soir, c'est le bal masqué des nombres. Un nombre arrive, tout déguisé. Qui se cache là-dessous ? |
| 01-cubes | Premier costume : 2 barres de dix et 3 cubes. Ils se comptent « 10, 20… 21, 22, 23 ». Le masque tombe : « 23 ». | Son premier costume : deux barres de dix, et trois petits cubes. Dix, vingt… vingt et un, vingt-deux, vingt-trois ! |
| 02-costumes | « 23 » tourne sur lui-même et change de costume : « vingt-trois » en lettres ; « 20 + 3 » ; deux cadres de dix pleins et 3 jetons. | Il change de costume. En lettres : vingt-trois. En calcul : vingt plus trois. Dans les cadres de dix : deux cadres pleins, et trois jetons. |
| 03-meme | Les 4 costumes autour du « 23 » qui salue. | Toutes ces écritures disent le même nombre : vingt-trois. C'est toujours lui ! |
| 04-question | Un autre danseur masqué : 3 barres de dix et 6 cubes. Choix A 63, B 9, C 36. | Question ! Un autre nombre arrive : trois barres de dix, et six cubes. Qui est-ce ? A : soixante-trois. B : neuf. C : trente-six. Mets pause, et choisis ! |
| 04b-reponse | Comptage « 10, 20, 30… 31 … 36 » ; le masque tombe : « 36 ». | Réponse C ! Trois barres : dix, vingt, trente. Six cubes : trente et un… trente-six. C'est trente-six ! |
| 05-question | « 52 » cherche son costume. Trois costumes : A 5 barres + 2 cubes ; B 2 barres + 5 cubes ; C 7 cubes. | Question ! Le nombre cinquante-deux cherche son costume. Lequel ? A : cinq barres et deux cubes. B : deux barres et cinq cubes. C : sept cubes. Mets pause, et choisis ! |
| 05b-reponse | Le « 52 » enfile le costume A : « 50 + 2 = 52 ». | Réponse A ! Cinquante, c'est cinq barres de dix. Plus deux cubes. Cinquante-deux ! |
| 06-appris | « Ce que tu as appris » ; « 23 » et ses costumes. | Un nombre a plusieurs costumes : des chiffres, des lettres, des barres et des cubes. C'est toujours le même nombre ! |
| 07-abonne | Écran de fin. | Entraîne-toi sur éleveai point f r, ou sur YouTube : éleveai neuf sept quatre ! |

### Short (≈ 50 s) — « Les mains derrière le mur »
| Clé | Image | Voix |
|---|---|---|
| 00-accroche | Un petit mur de pierres dans la cour. Des mains surgissent une à une derrière : quatre copains lèvent leurs deux mains (10 doigts chacun), un cinquième lève 3 doigts. | Salut ! Derrière le mur, mes copains lèvent les mains. Une main, deux mains, encore, encore… Combien de doigts se cachent là ? |
| 01-question | Choix A 7, B 34, C 43. | Question ! Quatre copains lèvent leurs deux mains : dix doigts chacun. Et un copain lève trois doigts. Combien de doigts en tout ? A : sept. B : trente-quatre. C : quarante-trois. Mets pause, et choisis ! |
| 01b-reponse | Chaque paire de mains compte « 10, 20, 30, 40 », puis « 41, 42, 43 » ; les copains sortent en riant. | Réponse C ! Deux mains, c'est dix doigts. Dix, vingt, trente, quarante… et trois : quarante-trois ! |
| 02-commentaire | « 25 = ? barres + ? cubes ». | À toi : pour faire vingt-cinq avec des barres et des cubes, combien de barres de dix faut-il ? Dis-le à voix haute, ou réponds en commentaire ! |
| 03-abonne | Écran de fin : « Entraîne-toi sur eleveai.fr » / « ou sur YouTube @eleveai974 ». | Entraîne-toi sur éleveai point f r, ou sur YouTube : éleveai neuf sept quatre ! |

---

## 12. « Les défis des nombres » — micro `cp_entier_defi`

### Paysage (≈ 1 min 50) — « Les devinettes du hibou »
| Clé | Image | Voix |
|---|---|---|
| 00-accroche | La forêt la nuit. Dans un arbre, deux grands yeux jaunes s'ouvrent. « Hou hou ! » (bulle). | Salut ! Dans la forêt, deux grands yeux s'allument. C'est le hibou des devinettes ! Tu es prêt à jouer avec moi ? |
| 01-devinette | Le hibou dit (bulle) : « 4 dizaines et 2 unités ». 4 barres + 2 cubes apparaissent, puis « 42 ». | Le hibou dit : je suis un nombre. J'ai quatre dizaines et deux unités. Quatre dizaines : quarante. Deux unités : deux. Quarante-deux ! |
| 02-cartes | Le hibou lâche deux cartes : « 3 » et « 8 ». Ti Margo met le 8 devant : « 83 ». | Deuxième défi : avec un trois et un huit, fais le plus grand nombre ! Je mets le plus grand chiffre devant. Huit, puis trois : quatre-vingt-trois ! |
| 03-echange | Les deux cartes échangent leur place : « 38 », plus petit. « 83 > 38 ». | Et si j'échange les cartes ? Trente-huit. Ce n'est plus le même nombre ! La place du chiffre change tout. |
| 04-question | Bulle du hibou : « entre 60 et 70 » ; « unités : 5 ». Choix A 65, B 56, C 75. | Question ! Le hibou dit : je suis entre soixante et soixante-dix. Mon chiffre des unités est cinq. Qui suis-je ? A : soixante-cinq. B : cinquante-six. C : soixante-quinze. Mets pause, et choisis ! |
| 04b-reponse | Le « 6 » s'écrit, puis le « 5 » : « 65 », posé entre « 60 » et « 70 ». | Réponse A ! Entre soixante et soixante-dix : un six devant. Cinq unités : un cinq derrière. Soixante-cinq ! |
| 05-question | Trois cartes : 5, 0, 9. Bulle : « le plus petit nombre à deux chiffres ». Choix A « 05 », B 59, C 50. | Question ! Avec deux cartes, parmi cinq, zéro et neuf, fais le plus petit nombre à deux chiffres. A : zéro, cinq. B : cinquante-neuf. C : cinquante. Mets pause, et choisis ! |
| 05b-reponse | Le 0 essaie de passer devant : le hibou fait non de la tête. Le 5 devant, le 0 derrière : « 50 ». | Réponse C ! Le zéro ne se met jamais devant. Je mets le cinq devant, et le zéro derrière : cinquante. Hou hou, bravo ! |
| 06-appris | « Ce que tu as appris » ; le hibou, « 83 » et « 38 ». | Pour un défi, je lis les indices un par un. Le chiffre de devant compte les dizaines. Et jamais de zéro devant ! |
| 07-abonne | Écran de fin. | Entraîne-toi sur éleveai point f r, ou sur YouTube : éleveai neuf sept quatre ! |

### Short (≈ 50 s) — « Le coffre au trésor »
| Clé | Image | Voix |
|---|---|---|
| 00-accroche | Dans le sable, un vieux coffre qui brille ; un cadenas à deux roues de chiffres « ? ? ». Un petit mot : « 2 » et « 6 ». | Salut ! J'ai trouvé un coffre au trésor ! Sur le cadenas, un petit mot : le code, c'est le plus grand nombre avec un deux et un six. Quel est le code ? |
| 01-question | Choix A 62, B 26, C 8. | Question ! Quel est le code du coffre ? A : soixante-deux. B : vingt-six. C : huit. Mets pause, et choisis ! |
| 01b-reponse | Les roues tournent : « 6 » puis « 2 ». Clic ! Le coffre s'ouvre, des étoiles en sortent. | Réponse A ! Le plus grand chiffre devant : six. Puis deux. Soixante-deux ! Clic, le coffre s'ouvre ! |
| 02-commentaire | Cartes « 1 » et « 9 », « le plus petit ? ». | À toi : avec un un et un neuf, quel est le plus petit nombre ? Dis-le à voix haute, ou réponds en commentaire ! |
| 03-abonne | Écran de fin : « Entraîne-toi sur eleveai.fr » / « ou sur YouTube @eleveai974 ». | Entraîne-toi sur éleveai point f r, ou sur YouTube : éleveai neuf sept quatre ! |

---

Ordre de fabrication, sur ton « oui » : la paire 7 d'abord (paysage + short), contrôlée image par image ; puis 8 → 12,
une HD à la fois. Branchement R2 / manifeste / coach seulement sur ton accord.
