# La monnaie avec Idriss le pêcheur : 17 micros, CP → CE2 (paysage + short), 28/11/2026

Demande de Frédéric (28/11) : « Lance la série du CP au CE2, il n'y a pas de souci avec Idriss. »
But : finir la notion MONNAIE d'un seul trait, du CP au CE2. Idriss vend son poisson au marché du port (fil rouge). Ti Margo raconte.
Déjà faites, à ne pas refaire : `cp_monnaie_constituer` (« J'achète mon poisson »), `ce1_monnaie_rendre` (« Idriss rend la monnaie »),
`ce2_monnaie_probleme` (« La balance d'Idriss »). Ici, les 17 autres.

Règles suivies :
- Le même socle que la série Idriss (nouveau portrait : très grand, yeux bleus, grand sourire, ciré et bob jaunes).
- Compte à rebours de 8 s, barre visible. Bonnes réponses tirées au hasard (51 questions : 17 A, 17 B, 17 C).
- Ceinture blanche partout, comme la première série Idriss.
- Pas de « TU PARIES ? » écrit : l'accroche passe par le dessin et la voix. Chaque nombre dit est écrit à l'écran.
- De vrais euros, dessinés simplement : pièces de 1 € et 2 € ; billets de 5 € (gris), 10 € (rouge), 20 € (bleu), 50 € (orange),
  un billet plus grand quand il vaut plus. Au CE1 et au CE2, les pièces en centimes : 1, 2 et 5 c (cuivre), 10, 20 et 50 c (dorées).
- CP : des euros entiers, au plus 100 €, aucune virgule. CE1 : les centimes arrivent, puis la virgule (« on dit souvent quatre euros
  cinquante »). CE2 : la virgule est le cœur du programme, la voix dit « virgule ».
- Aucun lieu nommé : un port, un marché, la mer. Fin : « Entraîne-toi sur eleveai.fr » / « ou sur YouTube @eleveai974 » ;
  dans les shorts, « réponds en commentaire » juste avant.
- Les situations suivent le coach (banques `lib/tutor-v4/questionBank/{cp,ce1,ce2}/maths/monnaie.bank.ts`) : ce que l'élève voit
  dans la vidéo, il le retrouve ensuite dans les exercices.

État : ⏳ voix à valider par Frédéric, classe par classe (rien n'est enregistré).

| Micro | Paysage | Short | Bonnes réponses (paysage Q1, Q2 · short) |
|---|---|---|---|
| CP 1 `cp_monnaie_reconnaitre` | Le soir, la caisse d'Idriss | Les trois trésors de la mouette | A, C · C |
| CP 2 `cp_monnaie_valeur` | Combien m'a-t-on donné ? | La vieille boîte à hameçons | C, B · C |
| CP 3 `cp_monnaie_comparer` | Qui a le plus ? | La mouette et le crabe | C, B · A |
| CP 4 `cp_monnaie_rendre` | La sardine du petit garçon | Le filet du voisin | C, B · A |
| CP 5 `cp_monnaie_defi` | Les défis d'Idriss | Deux glaces pour Idriss | A, A · B |
| CE1 1 `ce1_monnaie_euros_centimes` | Les toutes petites pièces | La pièce de la mouette | A, A · B |
| CE1 2 `ce1_monnaie_valeur_ensemble` | La caisse du soir | Le trésor du filet | B, B · A |
| CE1 3 `ce1_monnaie_comparer_ensembles` | Les deux tirelires | Le crabe têtu | C, B · C |
| CE1 4 `ce1_monnaie_constituer` | Payer pile | La glace pour la barque | C, B · A |
| CE1 5 `ce1_monnaie_virgule` | La petite virgule | La mouette et l'ardoise | B, A · B |
| CE1 6 `ce1_monnaie_probleme` | Les courses d'Idriss | Le café et le pain | A, B · C |
| CE1 7 `ce1_monnaie_defi` | Les défis du soir | Six beignets ? | B, C · B |
| CE2 1 `ce2_monnaie_ecriture_virgule` | L'ardoise des prix | Le zéro oublié | A, B · C |
| CE2 2 `ce2_monnaie_constituer` | Le beau thon | Le filet neuf | C, A · B |
| CE2 3 `ce2_monnaie_additionner` | Le panier de la dame | La glace et les appâts | C, B · A |
| CE2 4 `ce2_monnaie_rendre` | La monnaie au centime près | Idriss a-t-il bien rendu ? | C, C · A |
| CE2 5 `ce2_monnaie_defi` | Le grand défi du marché | La lampe d'Idriss | A, B · A |

---

# CP : des euros entiers

## CP 1 — `cp_monnaie_reconnaitre` — « Pièce ou billet ? »

### Paysage (≈ 1 min 30) — « Le soir, la caisse d'Idriss »
| Clé | Image | Voix |
|---|---|---|
| 00-accroche | Le soir sur le port. Idriss renverse sa caisse sur l'étal : des pièces rondes qui roulent, des billets qui volent un peu. Ti Margo à côté. | Salut ! Le marché est fini. Idriss vide sa caisse sur l'étal. Que de pièces et de billets ! |
| 01-pieces | Une pièce « 1 € » et une pièce « 2 € » grandissent au centre ; le mot « pièce » sous chacune. | Les pièces sont rondes, en métal. Voici une pièce de un euro, et une pièce de deux euros. |
| 02-billets | Quatre billets en rang, du plus petit au plus grand : « 5 € » gris, « 10 € » rouge, « 20 € » bleu, « 50 € » orange ; le mot « billet ». | Les billets sont des rectangles de papier. Cinq euros, dix euros, vingt euros, cinquante euros. Plus il vaut, plus il est grand ! |
| 03-lire | Une loupe passe sur le « 2 » de la pièce, puis sur le « 20 » du billet. | Pour savoir ce que vaut une pièce ou un billet, je lis le nombre écrit dessus. |
| 04-question | Idriss tient en l'air un billet bleu « 20 € ». Choix : A un billet de 20 €, B une pièce de 20 €, C un billet de 2 €. | Question ! Idriss me montre ceci. Qu'est-ce que c'est ? A : un billet de vingt euros. B : une pièce de vingt euros. C : un billet de deux euros. Mets pause, et choisis ! |
| 04b-reponse | Le billet s'éclaire ; « billet » et « 20 € » écrits dessous. | Réponse A ! C'est un rectangle de papier : un billet. Et il est écrit vingt dessus. Un billet de vingt euros ! |
| 05-question | Trois objets sur l'étal, notés A, B, C : A un billet « 5 € », B une pièce « 1 € », C une pièce « 2 € ». | Question ! Idriss cherche la pièce de deux euros. Laquelle est-ce ? A, B ou C ? Mets pause, et choisis ! |
| 05b-reponse | La pièce C saute dans la main d'Idriss ; sous A « 5 € », sous B « 1 € ». | Réponse C ! Elle est ronde : c'est une pièce. Et il est écrit deux dessus. A, c'est un billet de cinq euros. B, une pièce de un euro. |
| 06-appris | « Ce que tu as appris », en haut, centré ; à gauche les pièces « 1 € » « 2 € », à droite les billets « 5 € » « 10 € » « 20 € » « 50 € ». | Les pièces sont rondes : un euro, deux euros. Les billets sont en papier : cinq, dix, vingt, cinquante euros. Je lis le nombre écrit dessus. |
| 07-abonne | Écran de fin. | Entraîne-toi sur éleveai point f r, ou sur YouTube : éleveai neuf sept quatre ! |

### Short (≈ 45 s) — « Les trois trésors de la mouette »
| Clé | Image | Voix |
|---|---|---|
| 00-accroche | Une mouette se pose sur l'étal et lâche trois trésors qui brillent au soleil : A une pièce « 2 € », B un billet « 10 € », C un coquillage rond et doré. | Salut ! Une mouette rapporte trois trésors sur l'étal d'Idriss. Ils brillent au soleil ! |
| 01-question | Les trois trésors notés A, B, C. | Question ! Lequel n'est pas de l'argent ? A, B ou C ? Mets pause, et choisis ! |
| 01b-reponse | Le coquillage C s'éclaire : aucun nombre dessus ; sous A « 2 € », sous B « 10 € ». La mouette reprend son coquillage. | Réponse C ! C'est un coquillage. Il est rond, mais aucun nombre n'est écrit dessus. A, c'est une pièce de deux euros. B, un billet de dix euros. |
| 02-commentaire | « 50 € » en grand ; « pièce ou billet ? ». | À toi : cinquante euros, c'est une pièce ou un billet ? Dis-le à voix haute, ou réponds en commentaire ! |
| 03-abonne | Écran de fin. | Entraîne-toi sur éleveai point f r, ou sur YouTube : éleveai neuf sept quatre ! |

---

## CP 2 — `cp_monnaie_valeur` — « Combien d'argent dans le tas ? »

### Paysage (≈ 1 min 30) — « Combien m'a-t-on donné ? »
| Clé | Image | Voix |
|---|---|---|
| 00-accroche | Une dame achète une dorade ; elle pose sur l'étal un billet « 5 € », une pièce « 2 € », une pièce « 1 € ». | Salut ! Une dame achète une dorade. Elle pose son argent sur l'étal. Combien a-t-elle donné ? |
| 01-compter | Le billet s'allume : « 5 » ; puis la pièce de 2 € : « 6, 7 » ; puis la pièce de 1 € : « 8 ». Enfin « 5 + 2 + 1 = 8 ». | Je commence par le billet : cinq. Puis la pièce de deux : six, sept. Puis la pièce de un : huit. Elle a donné huit euros ! |
| 02-gros | Les trois rangés du plus gros au plus petit ; une flèche les parcourt. | Je commence toujours par le plus gros, puis j'ajoute les petits. |
| 03-dizaines | Deux billets « 10 € » et deux pièces « 1 € » : « 10, 20 … 21, 22 » ; « 10 + 10 + 1 + 1 = 22 ». | Deux billets de dix : dix, vingt. Plus deux pièces de un : vingt et un, vingt-deux. Vingt-deux euros ! |
| 04-question | Un garçon pose trois pièces « 2 € ». Choix A 3 €, B 5 €, C 6 €. | Question ! Un garçon pose trois pièces de deux euros. Combien a-t-il donné ? A : trois euros. B : cinq euros. C : six euros. Mets pause, et choisis ! |
| 04b-reponse | Les pièces s'allument une à une : « 2, 4, 6 » ; « 2 + 2 + 2 = 6 ». | Réponse C ! Deux, quatre, six. Six euros. A, c'est le nombre de pièces, pas l'argent ! |
| 05-question | Un pêcheur voisin pose un billet « 20 € », un billet « 5 € », une pièce « 2 € ». Choix A 3 €, B 27 €, C 25 €. | Question ! Un pêcheur pose un billet de vingt euros, un billet de cinq euros et une pièce de deux euros. Combien en tout ? A : trois euros. B : vingt-sept euros. C : vingt-cinq euros. Mets pause, et choisis ! |
| 05b-reponse | « 20 … 25 … 26, 27 » ; « 20 + 5 + 2 = 27 ». | Réponse B ! Vingt… vingt-cinq… vingt-six, vingt-sept. Vingt-sept euros. C, on a oublié la pièce ! |
| 06-appris | « Ce que tu as appris » ; le billet « 5 € » puis les pièces, « 5 + 2 + 1 = 8 ». | Pour savoir combien vaut un tas d'argent, je commence par le plus gros billet, puis j'ajoute le reste. |
| 07-abonne | Écran de fin. | Entraîne-toi sur éleveai point f r, ou sur YouTube : éleveai neuf sept quatre ! |

### Short (≈ 45 s) — « La vieille boîte à hameçons »
| Clé | Image | Voix |
|---|---|---|
| 00-accroche | Idriss secoue une vieille boîte à hameçons rouillée ; en sortent un billet « 10 € » et quatre pièces « 1 € ». | Salut ! Idriss secoue sa vieille boîte à hameçons. Il en sort un billet de dix euros et quatre pièces de un euro ! |
| 01-question | Choix A 5 €, B 40 €, C 14 €. | Question ! Combien d'argent dans la boîte ? A : cinq euros. B : quarante euros. C : quatorze euros. Mets pause, et choisis ! |
| 01b-reponse | « 10 … 11, 12, 13, 14 » ; « 10 + 1 + 1 + 1 + 1 = 14 ». Idriss sourit. | Réponse C ! Dix… onze, douze, treize, quatorze. Quatorze euros dans la boîte ! A, on a compté les pièces, pas l'argent. |
| 02-commentaire | Deux billets « 5 € » et une pièce « 2 € » ; « ? ». | À toi : deux billets de cinq euros et une pièce de deux euros. Combien ça fait ? Dis-le à voix haute, ou réponds en commentaire ! |
| 03-abonne | Écran de fin. | Entraîne-toi sur éleveai point f r, ou sur YouTube : éleveai neuf sept quatre ! |

---

## CP 3 — `cp_monnaie_comparer` — « Qui a le plus d'argent ? »

### Paysage (≈ 1 min 30) — « Qui a le plus ? »
| Clé | Image | Voix |
|---|---|---|
| 00-accroche | Une fille et un garçon aident Idriss à ranger les caisses. Il leur donne de l'argent : elle, cinq pièces « 1 € » ; lui, un seul billet « 10 € ». | Salut ! Deux enfants aident Idriss au marché. Elle reçoit cinq pièces. Lui reçoit un seul billet. Qui a le plus d'argent ? |
| 01-piege | Les cinq pièces brillent, le billet est seul ; « beaucoup de pièces ≠ beaucoup d'argent ». | Attention ! Beaucoup de pièces, ce n'est pas forcément beaucoup d'argent. Je compte ce que ça vaut. |
| 02-compter | Sous elle : « 1, 2, 3, 4, 5 » puis « 5 € » ; sous lui : « 10 € ». Puis « 10 € > 5 € ». | Elle : un, deux, trois, quatre, cinq euros. Lui : dix euros. Dix euros, c'est plus que cinq euros. C'est le garçon qui a le plus ! |
| 03-pareil | Deux pièces « 1 € » face à une pièce « 2 € » ; « 1 € + 1 € = 2 € ». | Parfois, c'est pareil ! Deux pièces de un euro valent une pièce de deux euros. |
| 04-question | Tas rouge : deux billets « 5 € ». Tas bleu : une pièce « 2 € » et une pièce « 1 € ». Choix A le tas bleu, B pareil, C le tas rouge. | Question ! Le tas rouge : deux billets de cinq euros. Le tas bleu : une pièce de deux euros et une pièce de un euro. Lequel vaut le plus ? A : le tas bleu. B : les deux pareil. C : le tas rouge. Mets pause, et choisis ! |
| 04b-reponse | Rouge : « 5, 10 » → « 10 € ». Bleu : « 2, 3 » → « 3 € ». « 10 € > 3 € ». | Réponse C ! Le tas rouge : cinq, dix. Dix euros. Le tas bleu : deux, trois. Trois euros. Dix, c'est plus que trois. |
| 05-question | Panier vert : un billet « 10 € ». Panier jaune : deux billets « 5 € ». Choix A le vert, B pareil, C le jaune. | Question ! Dans le panier vert, un billet de dix euros. Dans le panier jaune, deux billets de cinq euros. Lequel vaut le plus ? A : le vert. B : les deux pareil. C : le jaune. Mets pause, et choisis ! |
| 05b-reponse | « 5 + 5 = 10 » ; « 10 € = 10 € ». | Réponse B ! Cinq plus cinq, dix. Les deux paniers valent dix euros : c'est pareil ! |
| 06-appris | « Ce que tu as appris » ; cinq pièces « 5 € » face au billet « 10 € ». | Pour comparer deux tas d'argent, je compte ce que vaut chaque tas. Pas le nombre de pièces ! |
| 07-abonne | Écran de fin. | Entraîne-toi sur éleveai point f r, ou sur YouTube : éleveai neuf sept quatre ! |

### Short (≈ 45 s) — « La mouette et le crabe »
| Clé | Image | Voix |
|---|---|---|
| 00-accroche | Sur le quai, une mouette avec quatre pièces « 1 € » sous l'aile ; un crabe qui brandit un billet « 5 € » dans sa pince. Chacun bombe le torse. | Salut ! La mouette a quatre pièces de un euro. Le crabe a un seul billet de cinq euros. Chacun crie : c'est moi le plus riche ! |
| 01-question | Choix A le crabe, B la mouette, C pareil. | Question ! Qui a raison ? A : le crabe. B : la mouette. C : ils ont pareil. Mets pause, et choisis ! |
| 01b-reponse | « 4 € » sous la mouette, « 5 € » sous le crabe ; « 5 € > 4 € ». Le crabe danse. | Réponse A ! La mouette a quatre euros. Le crabe a cinq euros. Cinq, c'est plus que quatre. Le crabe gagne, d'une pince ! |
| 02-commentaire | Trois pièces « 2 € » face à un billet « 5 € » ; « ? ». | À toi : trois pièces de deux euros, ou un billet de cinq euros. Lequel vaut le plus ? Dis-le à voix haute, ou réponds en commentaire ! |
| 03-abonne | Écran de fin. | Entraîne-toi sur éleveai point f r, ou sur YouTube : éleveai neuf sept quatre ! |

---

## CP 4 — `cp_monnaie_rendre` — « Rendre la monnaie »

### Paysage (≈ 1 min 30) — « La sardine du petit garçon »
| Clé | Image | Voix |
|---|---|---|
| 00-accroche | Un petit garçon devant l'étal ; une sardine « 3 € ». Il tend un billet « 5 € ». | Salut ! Un petit garçon achète une sardine. Elle coûte trois euros. Il donne un billet de cinq euros. |
| 01-trop | « 5 € » et « 3 € » côte à côte ; « 5 € > 3 € ». | Cinq euros, c'est plus que trois. Idriss doit lui rendre de l'argent : c'est la monnaie. |
| 02-avance | Une droite de 3 à 5 ; Idriss avance : « 3 … 4, 5 », une pièce « 1 € » à chaque pas. « 3 + 2 = 5 ». | Idriss part du prix : trois. Il avance jusqu'à cinq : quatre, cinq. Deux pas : il rend deux euros. |
| 03-verif | « 3 € + 2 € = 5 € ». | Je vérifie : le prix, plus la monnaie, ça fait ce qu'il a donné. Trois plus deux, cinq. Le compte est bon ! |
| 04-question | Un seau de crevettes « 4 € » ; Ti Margo tend un billet « 5 € ». Choix A 9 €, B 4 €, C 1 €. | Question ! Un seau de crevettes coûte quatre euros. Je paie avec un billet de cinq euros. Combien Idriss me rend-il ? A : neuf euros. B : quatre euros. C : un euro. Mets pause, et choisis ! |
| 04b-reponse | « 4 … 5 » ; une pièce « 1 € » glisse vers Ti Margo. « 4 + 1 = 5 ». | Réponse C ! Quatre… cinq. Un seul pas. Idriss me rend un euro. |
| 05-question | Une dorade « 17 € » ; une dame tend un billet « 20 € ». Choix A 37 €, B 3 €, C 17 €. | Question ! Une dorade coûte dix-sept euros. La dame donne un billet de vingt euros. Combien lui rend-on ? A : trente-sept euros. B : trois euros. C : dix-sept euros. Mets pause, et choisis ! |
| 05b-reponse | « 17 … 18, 19, 20 » ; trois pièces « 1 € ». « 17 + 3 = 20 ». | Réponse B ! Dix-sept… dix-huit, dix-neuf, vingt. Trois pas : Idriss rend trois euros. |
| 06-appris | « Ce que tu as appris » ; la droite « 3 … 4, 5 ». | Pour rendre la monnaie, je pars du prix, et j'avance jusqu'à ce qu'on m'a donné. |
| 07-abonne | Écran de fin. | Entraîne-toi sur éleveai point f r, ou sur YouTube : éleveai neuf sept quatre ! |

### Short (≈ 45 s) — « Le filet du voisin »
| Clé | Image | Voix |
|---|---|---|
| 00-accroche | Le pêcheur voisin achète un filet roulé « 9 € » ; il tend un billet « 10 € ». | Salut ! Le voisin d'Idriss achète un filet à neuf euros. Il donne un billet de dix euros. |
| 01-question | Choix A 1 €, B 19 €, C 10 €. | Question ! Combien Idriss lui rend-il ? A : un euro. B : dix-neuf euros. C : dix euros. Mets pause, et choisis ! |
| 01b-reponse | « 9 … 10 » ; une pièce « 1 € ». « 9 + 1 = 10 ». | Réponse A ! Neuf… dix. Un seul pas : Idriss rend un euro. |
| 02-commentaire | Une glace « 3 € », un billet « 10 € » ; « ? ». | À toi : une glace à trois euros, payée avec un billet de dix euros. Combien te rend-on ? Dis-le à voix haute, ou réponds en commentaire ! |
| 03-abonne | Écran de fin. | Entraîne-toi sur éleveai point f r, ou sur YouTube : éleveai neuf sept quatre ! |

---

## CP 5 — `cp_monnaie_defi` — « Défis de monnaie »

### Paysage (≈ 1 min 45) — « Les défis d'Idriss »
| Clé | Image | Voix |
|---|---|---|
| 00-accroche | Idriss, grand sourire, lève un doigt : « Défi 1 ». Ti Margo tient deux pièces « 2 € » et une pièce « 1 € » ; un poisson « 6 € ». | Salut ! Aujourd'hui, Idriss me lance des défis. Premier défi : j'ai deux pièces de deux euros et une pièce de un euro. Ce poisson coûte six euros. Ai-je assez d'argent ? |
| 01-compte | « 2, 4, 5 » → « 5 € » ; « 5 € < 6 € » ; « il manque 1 € ». | Je compte : deux, quatre, cinq. J'ai cinq euros. Cinq, c'est moins que six. Il me manque un euro ! |
| 02-moins | « Défi 2 » ; « 23 € » ; un billet « 20 € », puis une pièce « 2 € », puis une pièce « 1 € » glissent l'un après l'autre. | Deuxième défi : payer vingt-trois euros avec le moins de billets et de pièces. Je prends d'abord le plus gros : un billet de vingt. Puis une pièce de deux, et une pièce de un. |
| 03-astuce | « 20 + 2 + 1 = 23 » ; « 3 » entouré. | Vingt plus deux plus un, vingt-trois. Seulement trois ! Pour en donner le moins possible, je commence par le plus gros. |
| 04-question | Une dame avec un billet « 10 € » et une pièce « 2 € » ; deux poissons « 11 € ». Choix A oui, B non, il manque de l'argent, C on ne peut pas savoir. | Question ! La dame a un billet de dix euros et une pièce de deux euros. Ses deux poissons coûtent onze euros. A-t-elle assez d'argent ? A : oui. B : non, il manque de l'argent. C : on ne peut pas savoir. Mets pause, et choisis ! |
| 04b-reponse | « 10 + 2 = 12 » ; « 12 € > 11 € ». | Réponse A ! Dix plus deux, douze euros. Douze, c'est plus que onze. Elle a assez, et il lui restera un euro ! |
| 05-question | « 35 € » ; Idriss tient des billets « 20 € », « 10 € », « 5 € ». Choix A un, B trois, C cinq. | Question ! Idriss doit payer trente-cinq euros, avec le moins de billets possible. Il a des billets de vingt, de dix et de cinq euros. Combien de billets de dix ? A : un. B : trois. C : cinq. Mets pause, et choisis ! |
| 05b-reponse | Les billets se posent : « 20 » puis « 30 » puis « 35 » ; « 20 + 10 + 5 = 35 ». | Réponse A ! D'abord un billet de vingt. Puis un billet de dix : trente. Puis un billet de cinq : trente-cinq. Un seul billet de dix ! B marche aussi, mais avec plus de billets. |
| 06-appris | « Ce que tu as appris » ; « Assez ? je compte, je compare » ; « Le moins ? le plus gros d'abord ». | Assez d'argent ? Je compte, puis je compare au prix. Le moins de billets ? Je commence par les plus gros. |
| 07-abonne | Écran de fin. | Entraîne-toi sur éleveai point f r, ou sur YouTube : éleveai neuf sept quatre ! |

### Short (≈ 45 s) — « Deux glaces pour Idriss »
| Clé | Image | Voix |
|---|---|---|
| 00-accroche | Il fait chaud ; Idriss s'éponge le front devant un marchand de glaces : deux glaces « 3 € » chacune. Dans sa main, un billet « 5 € ». | Salut ! Il fait chaud. Idriss veut deux glaces, à trois euros chacune. Dans sa poche : un billet de cinq euros. |
| 01-question | Choix A oui, tout juste, B non, il manque 1 €, C oui, il reste 2 €. | Question ! A-t-il assez d'argent ? A : oui, tout juste. B : non, il manque un euro. C : oui, il reste deux euros. Mets pause, et choisis ! |
| 01b-reponse | « 3 + 3 = 6 » ; « 5 € < 6 € » ; Idriss coupe une glace en deux et en tend la moitié à Ti Margo. | Réponse B ! Trois plus trois, six euros. Il n'a que cinq euros : il manque un euro. Alors Idriss partage une seule glace avec moi ! |
| 02-commentaire | « 4 € » ; des pièces « 1 € » et « 2 € » ; « ? ». | À toi : avec le moins de pièces possible, comment payer quatre euros ? Dis-le à voix haute, ou réponds en commentaire ! |
| 03-abonne | Écran de fin. | Entraîne-toi sur éleveai point f r, ou sur YouTube : éleveai neuf sept quatre ! |

---

# CE1 : les centimes arrivent

## CE1 1 — `ce1_monnaie_euros_centimes` — « 1 euro = 100 centimes »

### Paysage (≈ 1 min 30) — « Les toutes petites pièces »
| Clé | Image | Voix |
|---|---|---|
| 00-accroche | Une dame vide un petit porte-monnaie : une pluie de toutes petites pièces sur l'étal. Idriss se penche, étonné. | Salut ! Ce matin, une dame paie Idriss avec de toutes petites pièces. Ce ne sont pas des euros… ce sont des centimes ! |
| 01-pieces | Six pièces en rang : « 1 c », « 2 c », « 5 c » (cuivre), « 10 c », « 20 c », « 50 c » (dorées). | Voici les pièces en centimes : un, deux, cinq, dix, vingt et cinquante centimes. |
| 02-cent | Une pièce « 1 € » face à « 100 c » ; « 1 € = 100 c ». À côté, petit, « 1 m = 100 cm ». | Un euro, c'est cent centimes. Comme un mètre, c'est cent centimètres ! |
| 03-cinquante | Deux pièces « 50 c » se rejoignent et deviennent une pièce « 1 € » ; « 50 c + 50 c = 100 c = 1 € ». | Deux pièces de cinquante centimes : cinquante plus cinquante, cent centimes. Un euro ! |
| 04-question | Une pile de pièces « 10 c » ; « 1 € = ? ». Choix A dix, B cent, C une. | Question ! Combien de pièces de dix centimes faut-il pour faire un euro ? A : dix. B : cent. C : une. Mets pause, et choisis ! |
| 04b-reponse | Les pièces tombent une à une : « 10, 20, 30, … 100 » ; « 10 pièces = 100 c = 1 € ». | Réponse A ! Dix, vingt, trente… jusqu'à cent. Dix pièces de dix centimes, cent centimes : un euro. |
| 05-question | Idriss tient trois pièces « 1 € » ; « 3 € = ? c ». Choix A 300 c, B 30 c, C 3 c. | Question ! Idriss a trois euros. Combien de centimes, ça fait ? A : trois cents centimes. B : trente centimes. C : trois centimes. Mets pause, et choisis ! |
| 05b-reponse | Sous chaque pièce « 100 c » ; « 100, 200, 300 » ; « 3 € = 300 c ». | Réponse A ! Un euro, cent centimes. Trois euros : cent, deux cents, trois cents. Trois cents centimes ! |
| 06-appris | « Ce que tu as appris » ; « 1 € = 100 c » ; les six pièces en centimes. | Les petites pièces sont des centimes. Un euro, c'est cent centimes. |
| 07-abonne | Écran de fin. | Entraîne-toi sur éleveai point f r, ou sur YouTube : éleveai neuf sept quatre ! |

### Short (≈ 45 s) — « La pièce de la mouette »
| Clé | Image | Voix |
|---|---|---|
| 00-accroche | Une mouette lâche une pièce « 50 c » sur l'étal ; Idriss rit ; « 1 € = ? ». | Salut ! Une mouette dépose une pièce de cinquante centimes sur l'étal. Idriss rit : il en faut combien pour un euro ? |
| 01-question | Choix A cinquante, B deux, C cent. | Question ! Combien de pièces de cinquante centimes pour faire un euro ? A : cinquante. B : deux. C : cent. Mets pause, et choisis ! |
| 01b-reponse | « 50 c + 50 c = 100 c = 1 € » ; la mouette repart en chercher une autre. | Réponse B ! Cinquante plus cinquante, cent centimes : un euro. Deux pièces ! La mouette repart en chercher une autre. |
| 02-commentaire | Des pièces « 20 c » ; « 1 € = ? ». | À toi : combien de pièces de vingt centimes pour faire un euro ? Dis-le à voix haute, ou réponds en commentaire ! |
| 03-abonne | Écran de fin. | Entraîne-toi sur éleveai point f r, ou sur YouTube : éleveai neuf sept quatre ! |

---

## CE1 2 — `ce1_monnaie_valeur_ensemble` — « Combien d'argent, avec les centimes ? »

### Paysage (≈ 1 min 30) — « La caisse du soir »
| Clé | Image | Voix |
|---|---|---|
| 00-accroche | Le soir, Idriss compte sa caisse sous une lampe : un billet « 5 € », une pièce « 2 € », une pièce « 50 c », une pièce « 20 c ». | Salut ! Le soir, Idriss compte sa caisse. Un billet, des pièces en euros, des pièces en centimes. Combien a-t-il ? |
| 01-euros | Le billet et la pièce de 2 € glissent à gauche : « 5 + 2 = 7 » → « 7 € ». | Je compte d'abord les euros : cinq, plus deux, sept euros. |
| 02-centimes | Les deux petites pièces glissent à droite : « 50 + 20 = 70 » → « 70 c ». | Puis les centimes : cinquante, plus vingt, soixante-dix centimes. |
| 03-ensemble | « 7 € et 70 c ». | En tout : sept euros et soixante-dix centimes. Les euros avec les euros, les centimes avec les centimes ! |
| 04-question | Dans un seau : un billet « 10 € », une pièce « 1 € », une pièce « 50 c ». Choix A 61 €, B 11 € et 50 c, C 12 €. | Question ! Dans le seau : un billet de dix euros, une pièce de un euro et une pièce de cinquante centimes. Combien en tout ? A : soixante et un euros. B : onze euros et cinquante centimes. C : douze euros. Mets pause, et choisis ! |
| 04b-reponse | « 10 + 1 = 11 » → « 11 € » ; « 50 c » ; « 11 € et 50 c ». | Réponse B ! Dix plus un, onze euros. Et cinquante centimes. A, on a mélangé les euros et les centimes ! |
| 05-question | Trois pièces « 20 c » et deux pièces « 10 c ». Choix A 5 c, B 80 c, C 5 €. | Question ! Trois pièces de vingt centimes et deux pièces de dix centimes. Combien en tout ? A : cinq centimes. B : quatre-vingts centimes. C : cinq euros. Mets pause, et choisis ! |
| 05b-reponse | « 20, 40, 60 … 70, 80 » → « 80 c ». | Réponse B ! Vingt, quarante, soixante… soixante-dix, quatre-vingts. Quatre-vingts centimes. A, c'est le nombre de pièces ! |
| 06-appris | « Ce que tu as appris » ; à gauche « euros », à droite « centimes » ; « 7 € et 70 c ». | Pour trouver combien vaut un tas, je compte les euros, puis les centimes. Je ne mélange pas les deux. |
| 07-abonne | Écran de fin. | Entraîne-toi sur éleveai point f r, ou sur YouTube : éleveai neuf sept quatre ! |

### Short (≈ 45 s) — « Le trésor du filet »
| Clé | Image | Voix |
|---|---|---|
| 00-accroche | Idriss remonte son filet : pas de poisson, mais un vieux porte-monnaie mouillé ! Dedans, un billet « 20 € » et deux pièces « 50 c ». | Salut ! Dans le filet d'Idriss, pas de poisson… mais un vieux porte-monnaie ! Dedans : un billet de vingt euros et deux pièces de cinquante centimes. |
| 01-question | Choix A 21 €, B 20 € et 2 c, C 120 €. | Question ! Combien d'argent dans le porte-monnaie ? A : vingt et un euros. B : vingt euros et deux centimes. C : cent vingt euros. Mets pause, et choisis ! |
| 01b-reponse | « 50 c + 50 c = 100 c = 1 € » ; « 20 € + 1 € = 21 € ». Idriss le tend à un monsieur qui le cherchait. | Réponse A ! Cinquante plus cinquante, cent centimes : un euro. Vingt plus un, vingt et un euros ! Idriss rend le porte-monnaie à son propriétaire. |
| 02-commentaire | Un billet « 5 € » et trois pièces « 10 c » ; « ? ». | À toi : un billet de cinq euros et trois pièces de dix centimes. Combien ça fait ? Dis-le à voix haute, ou réponds en commentaire ! |
| 03-abonne | Écran de fin. | Entraîne-toi sur éleveai point f r, ou sur YouTube : éleveai neuf sept quatre ! |

---

## CE1 3 — `ce1_monnaie_comparer_ensembles` — « Quel tas vaut le plus ? »

### Paysage (≈ 1 min 30) — « Les deux tirelires »
| Clé | Image | Voix |
|---|---|---|
| 00-accroche | Une fille et un garçon vident leur tirelire devant l'étal : ils veulent offrir un poisson à leur maman. Elle : quatre pièces « 50 c ». Lui : une pièce « 2 € » et une pièce « 10 c ». | Salut ! Deux enfants vident leur tirelire au marché. Ils veulent offrir un poisson à leur maman. Qui a le plus d'argent ? |
| 01-fille | Ses pièces s'allument : « 50, 100, 150, 200 » → « 200 c = 2 € ». | Elle a quatre pièces de cinquante centimes. Cinquante, cent, cent cinquante, deux cents. Deux cents centimes, c'est deux euros. |
| 02-garcon | « 2 € et 10 c ». | Lui a une pièce de deux euros et une pièce de dix centimes. Deux euros et dix centimes. |
| 03-compare | « 2 € et 10 c > 2 € ». | Deux euros et dix centimes, c'est plus que deux euros. C'est lui qui a le plus, de dix centimes ! Je calcule chaque tas, puis je compare. |
| 04-question | Porte-monnaie rouge : un billet « 5 € » et une pièce « 20 c ». Bleu : cinq pièces « 1 € » et une pièce « 50 c ». Choix A le rouge, B pareil, C le bleu. | Question ! Dans le porte-monnaie rouge : un billet de cinq euros et une pièce de vingt centimes. Dans le bleu : cinq pièces de un euro et une pièce de cinquante centimes. Lequel a le plus ? A : le rouge. B : les deux pareil. C : le bleu. Mets pause, et choisis ! |
| 04b-reponse | Rouge « 5 € et 20 c », bleu « 5 € et 50 c » ; les « 5 € » se barrent ensemble, « 50 c > 20 c ». | Réponse C ! Le rouge : cinq euros et vingt centimes. Le bleu : cinq euros et cinquante centimes. Les euros sont pareils, alors je compare les centimes : le bleu gagne ! |
| 05-question | Idriss : deux pièces « 1 € ». La dame : une pièce « 1 € » et deux pièces « 50 c ». Choix A Idriss, B pareil, C la dame. | Question ! Idriss a deux pièces de un euro. La dame a une pièce de un euro et deux pièces de cinquante centimes. Qui a le plus ? A : Idriss. B : les deux pareil. C : la dame. Mets pause, et choisis ! |
| 05b-reponse | « 50 c + 50 c = 1 € » ; « 2 € = 2 € ». | Réponse B ! Deux pièces de cinquante centimes, c'est un euro. La dame a deux euros, comme Idriss. C'est pareil ! |
| 06-appris | « Ce que tu as appris » ; « 1. les euros » ; « 2. les centimes ». | Pour comparer, je calcule chaque tas. D'abord les euros. S'ils sont pareils, je regarde les centimes. |
| 07-abonne | Écran de fin. | Entraîne-toi sur éleveai point f r, ou sur YouTube : éleveai neuf sept quatre ! |

### Short (≈ 45 s) — « Le crabe têtu »
| Clé | Image | Voix |
|---|---|---|
| 00-accroche | Le crabe trône sur une montagne de dix pièces « 10 c » ; la mouette tient une seule pièce « 2 € » dans le bec. | Salut ! Le crabe a dix pièces de dix centimes. La mouette a une seule pièce de deux euros. Le crabe crie : j'ai plus de pièces, je suis le plus riche ! |
| 01-question | Choix A le crabe, B pareil, C la mouette. | Question ! Qui a le plus d'argent ? A : le crabe. B : les deux pareil. C : la mouette. Mets pause, et choisis ! |
| 01b-reponse | « 10 × 10 c = 100 c = 1 € » ; « 2 € > 1 € ». Le crabe rentre dans sa coquille… de honte. | Réponse C ! Dix pièces de dix centimes, cent centimes : un euro. La mouette a deux euros. Plus de pièces… mais moins d'argent ! |
| 02-commentaire | Cinq pièces « 20 c » face à une pièce « 1 € » ; « ? ». | À toi : cinq pièces de vingt centimes, ou une pièce de un euro. Lequel vaut le plus ? Dis-le à voix haute, ou réponds en commentaire ! |
| 03-abonne | Écran de fin. | Entraîne-toi sur éleveai point f r, ou sur YouTube : éleveai neuf sept quatre ! |

---

## CE1 4 — `ce1_monnaie_constituer` — « Faire une somme en euros et centimes »

### Paysage (≈ 1 min 30) — « Payer pile »
| Clé | Image | Voix |
|---|---|---|
| 00-accroche | L'ardoise d'Idriss : « sardines : 3 € 20 c ». Ti Margo ouvre son porte-monnaie : pièces en euros et en centimes. | Salut ! Sur l'ardoise d'Idriss : sardines, trois euros et vingt centimes. Je veux payer pile, sans qu'il ait à me rendre. |
| 01-euros | Une pièce « 2 € » et une pièce « 1 € » glissent vers Idriss : « 2 + 1 = 3 » → « 3 € ». | Je fais d'abord les euros : une pièce de deux euros, et une pièce de un euro. Trois euros. |
| 02-centimes | Une pièce « 20 c » les rejoint : « 3 € et 20 c ». | Puis les centimes : une pièce de vingt centimes. Trois euros et vingt centimes, pile ! |
| 03-autre | Autre façon : trois pièces « 1 € » et deux pièces « 10 c ». | Je peux aussi donner trois pièces de un euro, et deux pièces de dix centimes. Il y a plusieurs façons de payer. |
| 04-question | Un crabe « 2 € 50 c ». Choix (pièces dessinées) : A 1 € + 1 € + 20 c, B 2 € + 5 c, C 2 € + 50 c. | Question ! Un crabe coûte deux euros et cinquante centimes. Que donner ? A : un euro, un euro et vingt centimes. B : deux euros et cinq centimes. C : deux euros et cinquante centimes. Mets pause, et choisis ! |
| 04b-reponse | C s'allume « 2 € et 50 c » ; sous A « 2 € et 20 c », sous B « 2 € et 5 c ». | Réponse C ! Deux euros, plus cinquante centimes. A ne fait que deux euros et vingt centimes. B, deux euros et cinq centimes. |
| 05-question | « 4 € » à payer ; déjà posés : une pièce « 2 € », une pièce « 1 € », une pièce « 50 c » ; « ? ». Choix A 1 €, B 50 c, C 5 c. | Question ! Pour payer quatre euros, j'ai déjà posé trois euros et cinquante centimes. Quelle pièce ajouter ? A : un euro. B : cinquante centimes. C : cinq centimes. Mets pause, et choisis ! |
| 05b-reponse | Une pièce « 50 c » rejoint l'autre : « 50 c + 50 c = 1 € » ; « 4 € ». | Réponse B ! Cinquante centimes plus cinquante centimes, un euro. Trois euros plus un euro : quatre euros pile. |
| 06-appris | « Ce que tu as appris » ; « 1. les euros » ; « 2. les centimes ». | Pour faire une somme, je fais d'abord les euros, avec les billets et les grosses pièces. Puis les centimes, avec les petites pièces. |
| 07-abonne | Écran de fin. | Entraîne-toi sur éleveai point f r, ou sur YouTube : éleveai neuf sept quatre ! |

### Short (≈ 45 s) — « La glace pour la barque »
| Clé | Image | Voix |
|---|---|---|
| 00-accroche | Idriss achète un sac de glace pilée pour garder ses poissons au frais : « 1 € 20 c ». | Salut ! Idriss achète un sac de glace, pour garder ses poissons au frais. Il coûte un euro et vingt centimes. |
| 01-question | Choix (pièces dessinées) : A 1 € + 10 c + 10 c, B 1 € + 2 c, C 1 € + 1 €. | Question ! Quelles pièces donner ? A : un euro, dix centimes et dix centimes. B : un euro et deux centimes. C : un euro et un euro. Mets pause, et choisis ! |
| 01b-reponse | « 10 c + 10 c = 20 c » ; « 1 € et 20 c ». La glace fume de froid sur les poissons. | Réponse A ! Dix plus dix, vingt centimes. Un euro et vingt centimes, pile. B, c'est deux centimes, pas vingt ! |
| 02-commentaire | « 2 € 50 c » ; « avec 3 pièces ? ». | À toi : comment payer deux euros et cinquante centimes avec trois pièces ? Dis-le à voix haute, ou réponds en commentaire ! |
| 03-abonne | Écran de fin. | Entraîne-toi sur éleveai point f r, ou sur YouTube : éleveai neuf sept quatre ! |

---

## CE1 5 — `ce1_monnaie_virgule` — « La virgule dans un prix »

### Paysage (≈ 1 min 30) — « La petite virgule »
| Clé | Image | Voix |
|---|---|---|
| 00-accroche | L'ardoise d'Idriss : « dorade : 4,50 € ». La virgule clignote ; Ti Margo se gratte la tête. | Salut ! Sur l'ardoise d'Idriss, un prix avec une petite virgule. Mais que veut-elle dire ? |
| 01-virgule | « 4 » en bleu devant la virgule, « 50 » en orange derrière ; « 4,50 € = 4 € et 50 c ». | Devant la virgule, les euros : quatre. Derrière la virgule, les centimes : cinquante. Quatre virgule cinquante, c'est quatre euros et cinquante centimes. |
| 02-deux | « 3 € et 5 c = 3,05 € » ; les deux chiffres « 05 » entourés. | Derrière la virgule, il y a toujours deux chiffres. Trois euros et cinq centimes s'écrit : trois, virgule, zéro, cinq. |
| 03-dire | « 4,50 € » ; une bulle « quatre euros cinquante ». | On dit souvent : quatre euros cinquante. Et on l'écrit avec la virgule. |
| 04-question | « 2 € et 30 c = ? ». Choix A 23 €, B 2,30 €, C 2,3 c. | Question ! Comment écrire deux euros et trente centimes ? A : vingt-trois euros. B : deux virgule trente euros. C : deux virgule trois centimes. Mets pause, et choisis ! |
| 04b-reponse | « 2 » bleu, virgule, « 30 » orange → « 2,30 € ». | Réponse B ! Deux, pour les euros. Virgule. Trente, pour les centimes. Deux virgule trente euros. |
| 05-question | L'ardoise : « crevettes : 6,08 € ». Choix A 8 c, B 80 c, C 6 c. | Question ! Sur l'ardoise : six virgule zéro huit euros. Combien de centimes après les euros ? A : huit centimes. B : quatre-vingts centimes. C : six centimes. Mets pause, et choisis ! |
| 05b-reponse | « 08 » entouré ; « 6,08 € = 6 € et 8 c ». | Réponse A ! Derrière la virgule : zéro, huit. Huit centimes. Six euros et huit centimes. Le zéro compte ! |
| 06-appris | « Ce que tu as appris » ; « euros , centimes » ; « 4,50 € ». | Devant la virgule, les euros. Derrière, les centimes, toujours avec deux chiffres. |
| 07-abonne | Écran de fin. | Entraîne-toi sur éleveai point f r, ou sur YouTube : éleveai neuf sept quatre ! |

### Short (≈ 45 s) — « La mouette et l'ardoise »
| Clé | Image | Voix |
|---|---|---|
| 00-accroche | Une mouette posée sur l'ardoise : « sardine : 1,05 € ». Elle penche la tête, perplexe. | Salut ! Une mouette lit l'ardoise d'Idriss : sardine, un virgule zéro cinq euro. Elle penche la tête… |
| 01-question | Choix A 50 c, B 5 c, C 105 c. | Question ! Combien de centimes après l'euro ? A : cinquante centimes. B : cinq centimes. C : cent cinq centimes. Mets pause, et choisis ! |
| 01b-reponse | « 05 » entouré ; « 1,05 € = 1 € et 5 c ». | Réponse B ! Derrière la virgule : zéro, cinq. Cinq centimes. Un euro et cinq centimes. Pas cinquante ! |
| 02-commentaire | « 7 € et 40 c = ? ». | À toi : comment écrire sept euros et quarante centimes, avec une virgule ? Dis-le à voix haute, ou réponds en commentaire ! |
| 03-abonne | Écran de fin. | Entraîne-toi sur éleveai point f r, ou sur YouTube : éleveai neuf sept quatre ! |

---

## CE1 6 — `ce1_monnaie_probleme` — « Un problème d'argent »

### Paysage (≈ 1 min 30) — « Les courses d'Idriss »
| Clé | Image | Voix |
|---|---|---|
| 00-accroche | Pour une fois, Idriss fait les courses, dans un magasin de pêche : un filet « 12 € », des hameçons « 5 € ». Dans sa main, un billet « 20 € ». | Salut ! Aujourd'hui, c'est Idriss qui fait les courses. Il a vingt euros. Il achète un filet à douze euros, et des hameçons à cinq euros. |
| 01-depense | « 12 + 5 = 17 » → « 17 € ». | D'abord : combien dépense-t-il en tout ? Douze plus cinq, dix-sept euros. |
| 02-reste | « 17 … 18, 19, 20 » ; « 20 − 17 = 3 » → « 3 € ». | Ensuite : combien lui reste-t-il ? De dix-sept à vingt, trois. Vingt moins dix-sept, trois euros. |
| 03-etapes | Trois étiquettes : « le total ? », « ce qui reste ? », « ce qui manque ? ». | Je lis bien la question. On me demande le total, ce qui reste, ou ce qui manque ? |
| 04-question | Une bouée « 21 € » ; Idriss a « 15 € ». Choix A 6 €, B 36 €, C 15 €. | Question ! Idriss a quinze euros. Il veut une bouée à vingt et un euros. Combien lui manque-t-il ? A : six euros. B : trente-six euros. C : quinze euros. Mets pause, et choisis ! |
| 04b-reponse | « 15 … 20, 21 » ; « 15 + 6 = 21 ». Idriss range ses sous en souriant. | Réponse A ! De quinze à vingt et un : six. Il lui manque six euros. Il attendra la pêche de demain ! |
| 05-question | Une dame : une dorade « 8,50 € » et des crevettes « 2 € ». Choix A 8,52 €, B 10,50 €, C 6,50 €. | Question ! La dame achète une dorade à huit euros cinquante, et des crevettes à deux euros. Combien paie-t-elle ? A : huit euros cinquante-deux. B : dix euros cinquante. C : six euros cinquante. Mets pause, et choisis ! |
| 05b-reponse | « 8 € + 2 € = 10 € » ; les « 50 c » restent ; « 10,50 € ». | Réponse B ! Huit euros plus deux euros, dix euros. Les cinquante centimes restent. Dix euros cinquante. A : on a ajouté deux centimes, pas deux euros ! |
| 06-appris | « Ce que tu as appris » ; les trois étiquettes ; « étape par étape ». | Un problème d'argent ? Je lis bien la question : le total, ce qui reste, ou ce qui manque. Puis je calcule, étape par étape. |
| 07-abonne | Écran de fin. | Entraîne-toi sur éleveai point f r, ou sur YouTube : éleveai neuf sept quatre ! |

### Short (≈ 45 s) — « Le café et le pain »
| Clé | Image | Voix |
|---|---|---|
| 00-accroche | Au lever du jour, Idriss, avant de partir en mer : un café « 1,50 € », un pain « 1 € ». Dans sa main, un billet « 5 € ». | Salut ! Avant la pêche, Idriss a cinq euros. Il achète un café à un euro cinquante, et un pain à un euro. |
| 01-question | Choix A 7,50 €, B 3,50 €, C 2,50 €. | Question ! Combien lui reste-t-il ? A : sept euros cinquante. B : trois euros cinquante. C : deux euros cinquante. Mets pause, et choisis ! |
| 01b-reponse | « 1,50 € + 1 € = 2,50 € » ; « 5 € − 2,50 € = 2,50 € ». | Réponse C ! Il dépense un euro cinquante, plus un euro : deux euros cinquante. Sur cinq euros, il lui reste deux euros cinquante. B, on a oublié le pain ! |
| 02-commentaire | Un ballon « 12 € », « tu as 10 € » ; « ? ». | À toi : tu as dix euros. Un ballon coûte douze euros. Combien te manque-t-il ? Dis-le à voix haute, ou réponds en commentaire ! |
| 03-abonne | Écran de fin. | Entraîne-toi sur éleveai point f r, ou sur YouTube : éleveai neuf sept quatre ! |

---

## CE1 7 — `ce1_monnaie_defi` — « Défis de monnaie »

### Paysage (≈ 1 min 45) — « Les défis du soir »
| Clé | Image | Voix |
|---|---|---|
| 00-accroche | Le soir, Idriss lève un doigt : « Défi 1 ». Deux amies au marché : l'une écrit « 2,50 € », l'autre dit « 250 centimes ». | Salut ! Ce soir, Idriss me lance des défis. Premier défi : pour le même prix, une amie écrit deux virgule cinquante euros. L'autre dit : deux cent cinquante centimes. Qui a raison ? |
| 01-centimes | « 2 € = 200 c » ; « 200 c + 50 c = 250 c » ; « 2,50 € = 250 c ». | Deux euros, c'est deux cents centimes. Plus cinquante centimes : deux cent cinquante centimes. Les deux ont raison ! |
| 02-plus | « Défi 2 » ; « 5 € » ; des glaces « 2 € » : « 2, 4 … 6 : trop ! ». | Deuxième défi : j'ai cinq euros, une glace coûte deux euros. Combien de glaces, au plus ? Deux, quatre… six, c'est trop. Deux glaces, et il me reste un euro. |
| 03-astuce | « J'ajoute le prix… sans dépasser ». | Pour en acheter le plus possible, j'ajoute le prix encore et encore, sans dépasser ce que j'ai. |
| 04-question | « 38 € » ; billets « 20 € », « 10 € », « 5 € » et pièces « 2 € », « 1 € ». Choix A 3, B 5, C 8. | Question ! Idriss doit donner trente-huit euros, avec le moins de billets et de pièces possible. Combien lui en faut-il ? A : trois. B : cinq. C : huit. Mets pause, et choisis ! |
| 04b-reponse | Ils se posent un à un : « 20, 30, 35, 37, 38 » ; « 20 + 10 + 5 + 2 + 1 = 38 ». | Réponse B ! Vingt, trente, trente-cinq, trente-sept, trente-huit. Un billet de vingt, un de dix, un de cinq, une pièce de deux, une pièce de un. Cinq en tout ! |
| 05-question | Des sardines « 3 € » l'une ; Idriss a « 20 € ». Choix A 7, B 3, C 6. | Question ! Une sardine coûte trois euros. Avec vingt euros, combien de sardines peut-on acheter, au plus ? A : sept. B : trois. C : six. Mets pause, et choisis ! |
| 05b-reponse | « 3, 6, 9, 12, 15, 18 » ; « 21 : trop ! ». | Réponse C ! Trois, six, neuf, douze, quinze, dix-huit : six sardines. Une de plus ferait vingt et un euros : trop ! |
| 06-appris | « Ce que tu as appris » ; « 2,50 € = 250 c » ; « sans dépasser » ; « le plus gros d'abord ». | Un défi d'argent ? Je change en centimes si besoin. J'ajoute le prix sans dépasser. Et je commence par les plus gros billets. |
| 07-abonne | Écran de fin. | Entraîne-toi sur éleveai point f r, ou sur YouTube : éleveai neuf sept quatre ! |

### Short (≈ 45 s) — « Six beignets ? »
| Clé | Image | Voix |
|---|---|---|
| 00-accroche | Ti Margo devant un marchand de beignets : « 1 € » le beignet. Dans sa main, un billet « 5 € ». Six copains attendent derrière lui. | Salut ! J'ai cinq euros. Un beignet coûte un euro. Je veux en acheter six, pour mes copains. |
| 01-question | Choix A oui, B non, il manque 1 €, C oui, il reste 1 €. | Question ! Ai-je assez d'argent ? A : oui. B : non, il manque un euro. C : oui, il reste un euro. Mets pause, et choisis ! |
| 01b-reponse | « 6 × 1 € = 6 € » ; « 5 € < 6 € ». Idriss arrive et pose une pièce « 1 € » sur le comptoir, grand sourire. | Réponse B ! Six beignets, six euros. Je n'ai que cinq euros : il manque un euro. Heureusement, Idriss ajoute le dernier euro ! |
| 02-commentaire | « 1,50 € = ? c ». | À toi : un euro cinquante, c'est combien de centimes ? Dis-le à voix haute, ou réponds en commentaire ! |
| 03-abonne | Écran de fin. | Entraîne-toi sur éleveai point f r, ou sur YouTube : éleveai neuf sept quatre ! |

---

# CE2 : la virgule au cœur

## CE2 1 — `ce2_monnaie_ecriture_virgule` — « Écrire un prix avec une virgule »

### Paysage (≈ 1 min 30) — « L'ardoise des prix »
| Clé | Image | Voix |
|---|---|---|
| 00-accroche | Le matin, Idriss, la craie à la main, hésite devant son ardoise ; une bulle : « 3 € et 45 c ». | Salut ! Ce matin, Idriss écrit ses prix sur l'ardoise. Mais il hésite : comment écrire trois euros et quarante-cinq centimes ? |
| 01-ecrire | « 3 » bleu, virgule, « 45 » orange → « 3,45 € ». | Les euros devant la virgule : trois. Les centimes derrière : quarante-cinq. Trois virgule quarante-cinq euros. |
| 02-centimes | « 345 c » ; « 300 c = 3 € » ; « 345 c = 3,45 € ». | Trois cent quarante-cinq centimes, c'est pareil ! Cent centimes font un euro, alors trois cents centimes font trois euros. |
| 03-zero | « 7 € et 6 c = 7,06 € » ; le « 0 » entouré. | Attention : derrière la virgule, toujours deux chiffres. Sept euros et six centimes : sept virgule zéro six. |
| 04-question | « 520 c = ? ». Choix A 5,20 €, B 52 €, C 0,52 €. | Question ! Comment écrire cinq cent vingt centimes en euros ? A : cinq virgule vingt euros. B : cinquante-deux euros. C : zéro virgule cinquante-deux euro. Mets pause, et choisis ! |
| 04b-reponse | « 500 c = 5 € » ; « 20 c » ; « 5,20 € ». | Réponse A ! Cinq cents centimes, cinq euros. Il reste vingt centimes. Cinq virgule vingt euros. |
| 05-question | L'ardoise : « sardines : 2,5 € » ; la bulle d'Idriss : « 2 € et 5 c ». Choix A 2,50 €, B 2,05 €, C 25 €. | Question ! Idriss voulait écrire deux euros et cinq centimes. Il a écrit deux virgule cinq. Comment corriger ? A : deux virgule cinquante euros. B : deux virgule zéro cinq euros. C : vingt-cinq euros. Mets pause, et choisis ! |
| 05b-reponse | Idriss efface et écrit « 2,05 € » ; sous A « 2 € et 50 c ». | Réponse B ! Cinq centimes, ça s'écrit zéro, cinq, derrière la virgule. Deux virgule zéro cinq euros. A, c'est cinquante centimes ! |
| 06-appris | « Ce que tu as appris » ; « euros , centimes » ; « 100 c = 1 € » ; « 7,06 € ». | Devant la virgule, les euros. Derrière, les centimes, toujours avec deux chiffres. Et cent centimes font un euro. |
| 07-abonne | Écran de fin. | Entraîne-toi sur éleveai point f r, ou sur YouTube : éleveai neuf sept quatre ! |

### Short (≈ 45 s) — « Le zéro oublié »
| Clé | Image | Voix |
|---|---|---|
| 00-accroche | Un crabe sur l'étal avec une étiquette vide ; une bulle : « 409 c ». Idriss tient la craie. | Salut ! Ce crabe coûte quatre cent neuf centimes. Idriss doit écrire son prix en euros. |
| 01-question | Choix A 40,9 €, B 4,90 €, C 4,09 €. | Question ! Quelle étiquette est juste ? A : quarante virgule neuf euros. B : quatre virgule quatre-vingt-dix euros. C : quatre virgule zéro neuf euros. Mets pause, et choisis ! |
| 01b-reponse | « 400 c = 4 € » ; « 9 c → 09 » ; l'étiquette « 4,09 € ». Le crabe applaudit des pinces. | Réponse C ! Quatre cents centimes, quatre euros. Il reste neuf centimes : zéro, neuf. Quatre virgule zéro neuf euros. B, c'est quatre-vingt-dix centimes ! |
| 02-commentaire | « 205 c = ? € ». | À toi : écris deux cent cinq centimes en euros, avec une virgule. Dis-le à voix haute, ou réponds en commentaire ! |
| 03-abonne | Écran de fin. | Entraîne-toi sur éleveai point f r, ou sur YouTube : éleveai neuf sept quatre ! |

---

## CE2 2 — `ce2_monnaie_constituer` — « Faire une somme avec une virgule »

### Paysage (≈ 1 min 30) — « Le beau thon »
| Clé | Image | Voix |
|---|---|---|
| 00-accroche | Une dame devant un beau thon : étiquette « 13,75 € ». Elle ouvre son porte-monnaie. | Salut ! Une dame achète un beau thon, à treize virgule soixante-quinze euros. Elle veut payer pile. |
| 01-billets | Un billet « 10 € », une pièce « 2 € », une pièce « 1 € » glissent : « 10 + 2 + 1 = 13 » → « 13 € ». | D'abord les euros : un billet de dix, une pièce de deux, une pièce de un. Treize euros. |
| 02-centimes | Puis « 50 c », « 20 c », « 5 c » : « 50 + 20 + 5 = 75 » → « 75 c » ; « 13,75 € ». | Puis les centimes : cinquante, plus vingt, plus cinq. Soixante-quinze centimes. Treize virgule soixante-quinze euros, pile ! |
| 03-gros | Une flèche du plus gros au plus petit : « le plus gros d'abord ». | Je commence toujours par le plus gros billet, ou la plus grosse pièce, sans dépasser. |
| 04-question | Une pile de pièces « 20 c » ; « 2 € = ? ». Choix A 20, B 2, C 10. | Question ! Combien de pièces de vingt centimes pour faire deux euros ? A : vingt. B : deux. C : dix. Mets pause, et choisis ! |
| 04b-reponse | « 2 € = 200 c » ; « 20, 40, … 200 » ; « 10 × 20 c = 200 c ». | Réponse C ! Deux euros, c'est deux cents centimes. Vingt, quarante… jusqu'à deux cents : dix pièces. |
| 05-question | « 8,40 € » ; trois tas dessinés : A 5 € + 2 € + 1 € + 20 c + 20 c ; B 5 € + 2 € + 20 c + 20 c ; C 5 € + 2 € + 1 € + 20 c + 2 c. | Question ! Pour payer huit virgule quarante euros, quel tas faut-il donner ? A, B ou C ? Compte bien chaque tas. Mets pause, et choisis ! |
| 05b-reponse | A s'allume : « 8 € et 40 c = 8,40 € » ; sous B « 7,40 € », sous C « 8,22 € ». | Réponse A ! Cinq, sept, huit euros. Vingt, quarante centimes. Huit virgule quarante euros ! B ne fait que sept virgule quarante. C, huit virgule vingt-deux. |
| 06-appris | « Ce que tu as appris » ; « 1. les euros » ; « 2. les centimes » ; « le plus gros d'abord ». | Pour faire une somme, je fais les euros avec les billets et les grosses pièces, puis les centimes. Toujours le plus gros d'abord. |
| 07-abonne | Écran de fin. | Entraîne-toi sur éleveai point f r, ou sur YouTube : éleveai neuf sept quatre ! |

### Short (≈ 45 s) — « Le filet neuf »
| Clé | Image | Voix |
|---|---|---|
| 00-accroche | Idriss rêve devant un filet neuf : « 23,50 € ». Dans sa main : deux billets « 10 € », une pièce « 2 € », une pièce « 50 c ». | Salut ! Idriss veut un filet neuf, à vingt-trois virgule cinquante euros. Il a deux billets de dix euros, une pièce de deux euros et une pièce de cinquante centimes. |
| 01-question | Choix A oui, pile, B non, il manque 1 €, C oui, il reste 1 €. | Question ! A-t-il assez d'argent ? A : oui, pile. B : non, il manque un euro. C : oui, il reste un euro. Mets pause, et choisis ! |
| 01b-reponse | « 10, 20, 22 » → « 22,50 € » ; « 22,50 € < 23,50 € ». Idriss range le filet… pour demain. | Réponse B ! Dix, vingt, vingt-deux euros, et cinquante centimes : vingt-deux virgule cinquante. Il manque un euro. Ce sera après la pêche de demain ! |
| 02-commentaire | Des pièces « 50 c » ; « 5 € = ? ». | À toi : combien de pièces de cinquante centimes pour faire cinq euros ? Dis-le à voix haute, ou réponds en commentaire ! |
| 03-abonne | Écran de fin. | Entraîne-toi sur éleveai point f r, ou sur YouTube : éleveai neuf sept quatre ! |

---

## CE2 3 — `ce2_monnaie_additionner` — « Additionner des prix »

### Paysage (≈ 1 min 30) — « Le panier de la dame »
| Clé | Image | Voix |
|---|---|---|
| 00-accroche | Une dame remplit son panier : une dorade « 6,40 € », des crevettes « 3,30 € ». | Salut ! Une dame remplit son panier chez Idriss : une dorade à six virgule quarante euros, et des crevettes à trois virgule trente euros. Combien en tout ? |
| 01-separes | Euros en bleu : « 6 + 3 = 9 » ; centimes en orange : « 40 + 30 = 70 ». | Les euros avec les euros : six plus trois, neuf euros. Les centimes avec les centimes : quarante plus trente, soixante-dix centimes. |
| 02-total | « 6,40 € + 3,30 € = 9,70 € ». | En tout : neuf virgule soixante-dix euros. |
| 03-retenue | « 60 c + 50 c = 110 c = 1 € et 10 c » ; une pièce « 1 € » saute du côté des euros. | Attention ! Si les centimes dépassent cent, je fais un euro de plus. Soixante plus cinquante, cent dix centimes : un euro et dix centimes. |
| 04-question | Un calamar « 2,50 € » et un poisson « 4,20 € ». Choix A 6,07 €, B 67 €, C 6,70 €. | Question ! Un calamar à deux virgule cinquante euros, et un poisson à quatre virgule vingt euros. Combien en tout ? A : six virgule zéro sept euros. B : soixante-sept euros. C : six virgule soixante-dix euros. Mets pause, et choisis ! |
| 04b-reponse | « 2 + 4 = 6 » ; « 50 + 20 = 70 » ; « 6,70 € ». | Réponse C ! Deux plus quatre, six euros. Cinquante plus vingt, soixante-dix centimes. Six virgule soixante-dix euros. |
| 05-question | Des sardines « 1,80 € » et un citron « 0,50 € ». Choix A 1,130 €, B 2,30 €, C 1,30 €. | Question ! Des sardines à un virgule quatre-vingts euro, et un citron à zéro virgule cinquante euro. Combien en tout ? A : un virgule cent trente euro. B : deux virgule trente euros. C : un virgule trente euro. Mets pause, et choisis ! |
| 05b-reponse | « 80 c + 50 c = 130 c = 1 € et 30 c » ; « 1 € + 1 € = 2 € » ; « 2,30 € ». A barré : « 3 chiffres après la virgule ? Non ! ». | Réponse B ! Les centimes : quatre-vingts plus cinquante, cent trente. C'est un euro et trente centimes. Les euros : un, plus cet euro, deux. Deux virgule trente euros ! A : trois chiffres après la virgule, c'est interdit. |
| 06-appris | « Ce que tu as appris » ; « euros + euros » ; « centimes + centimes » ; « 100 c = 1 € de plus ». | Pour additionner des prix : les euros avec les euros, les centimes avec les centimes. Et cent centimes font un euro de plus. |
| 07-abonne | Écran de fin. | Entraîne-toi sur éleveai point f r, ou sur YouTube : éleveai neuf sept quatre ! |

### Short (≈ 45 s) — « La glace et les appâts »
| Clé | Image | Voix |
|---|---|---|
| 00-accroche | Idriss au comptoir : un sac de glace « 2,60 € », une boîte d'appâts « 3,50 € ». | Salut ! Idriss achète un sac de glace à deux virgule soixante euros, et des appâts à trois virgule cinquante euros. |
| 01-question | Choix A 6,10 €, B 5,110 €, C 5,10 €. | Question ! Combien paie-t-il en tout ? A : six virgule dix euros. B : cinq virgule cent dix euros. C : cinq virgule dix euros. Mets pause, et choisis ! |
| 01b-reponse | « 60 c + 50 c = 110 c = 1 € et 10 c » ; « 2 + 3 + 1 = 6 » ; « 6,10 € ». | Réponse A ! Soixante plus cinquante, cent dix centimes : un euro et dix centimes. Deux plus trois plus un, six euros. Six virgule dix euros ! C, on a oublié l'euro de plus. |
| 02-commentaire | « 4,75 € + 2,25 € = ? ». | À toi : quatre virgule soixante-quinze euros, plus deux virgule vingt-cinq euros. Combien ça fait ? Dis-le à voix haute, ou réponds en commentaire ! |
| 03-abonne | Écran de fin. | Entraîne-toi sur éleveai point f r, ou sur YouTube : éleveai neuf sept quatre ! |

---

## CE2 4 — `ce2_monnaie_rendre` — « Rendre la monnaie au centime près »

### Paysage (≈ 1 min 30) — « La monnaie au centime près »
| Clé | Image | Voix |
|---|---|---|
| 00-accroche | Un monsieur achète un poisson « 7,60 € » ; il tend un billet « 10 € ». | Salut ! Un monsieur achète un poisson à sept virgule soixante euros. Il paie avec un billet de dix euros. Combien Idriss lui rend-il ? |
| 01-euro | Une droite : de « 7,60 € » à « 8 € », un petit bond « + 40 c » ; deux pièces « 20 c ». | Idriss avance d'abord jusqu'à l'euro suivant : de sept virgule soixante à huit, quarante centimes. |
| 02-billet | Un grand bond de « 8 € » à « 10 € » : « + 2 € » ; une pièce « 2 € ». « 2 € et 40 c = 2,40 € ». | Puis de huit à dix : deux euros. Il rend deux euros et quarante centimes. Deux virgule quarante euros. |
| 03-verif | « 10 € − 7,60 € = 2,40 € ». | Je vérifie : dix moins sept virgule soixante, deux virgule quarante. Le compte est bon ! |
| 04-question | Une dorade « 4,20 € », payée avec « 5 € ». Choix A 1,20 €, B 9,20 €, C 0,80 €. | Question ! Une dorade à quatre virgule vingt euros, payée avec cinq euros. Combien rend-on ? A : un virgule vingt euro. B : neuf virgule vingt euros. C : zéro virgule quatre-vingts euro. Mets pause, et choisis ! |
| 04b-reponse | De « 4,20 € » à « 5 € » : « + 80 c » ; « 0,80 € ». | Réponse C ! De quatre virgule vingt à cinq : quatre-vingts centimes. Zéro virgule quatre-vingts euro. |
| 05-question | La dame paie « 12,35 € » avec un billet « 20 € ». Choix A 8,35 €, B 7,75 €, C 7,65 €. | Question ! La dame achète pour douze virgule trente-cinq euros. Elle paie avec un billet de vingt euros. Combien lui rend-on ? A : huit virgule trente-cinq euros. B : sept virgule soixante-quinze euros. C : sept virgule soixante-cinq euros. Mets pause, et choisis ! |
| 05b-reponse | « 12,35 € → 13 € : + 65 c » ; « 13 € → 20 € : + 7 € » ; « 7,65 € ». | Réponse C ! De douze virgule trente-cinq à treize : soixante-cinq centimes. De treize à vingt : sept euros. Sept virgule soixante-cinq euros ! |
| 06-appris | « Ce que tu as appris » ; la droite : petit bond jusqu'à l'euro, grand bond jusqu'au billet. | Pour rendre la monnaie, je pars du prix. J'avance jusqu'à l'euro suivant, puis jusqu'au billet. |
| 07-abonne | Écran de fin. | Entraîne-toi sur éleveai point f r, ou sur YouTube : éleveai neuf sept quatre ! |

### Short (≈ 45 s) — « Idriss a-t-il bien rendu ? »
| Clé | Image | Voix |
|---|---|---|
| 00-accroche | Ti Margo paie un crabe « 3,90 € » avec un billet « 5 € » ; Idriss lui tend « 1,10 € » (une pièce « 1 € », une pièce « 10 c »). | Salut ! Je paie un crabe à trois virgule quatre-vingt-dix euros, avec un billet de cinq euros. Idriss me rend un virgule dix euro. |
| 01-question | Choix A oui, c'est juste, B non, il me doit plus, C non, il m'a trop rendu. | Question ! Idriss a-t-il bien rendu ? A : oui, c'est juste. B : non, il me doit plus. C : non, il m'a trop rendu. Mets pause, et choisis ! |
| 01b-reponse | « 3,90 € → 4 € : + 10 c » ; « 4 € → 5 € : + 1 € » ; « 1,10 € ». Ti Margo et Idriss se tapent dans la main. | Réponse A ! De trois virgule quatre-vingt-dix à quatre : dix centimes. De quatre à cinq : un euro. Un virgule dix euro. Bravo, Idriss ! |
| 02-commentaire | Un poisson « 6,50 € », un billet « 10 € » ; « ? ». | À toi : un poisson à six virgule cinquante euros, payé avec dix euros. Combien te rend-on ? Dis-le à voix haute, ou réponds en commentaire ! |
| 03-abonne | Écran de fin. | Entraîne-toi sur éleveai point f r, ou sur YouTube : éleveai neuf sept quatre ! |

---

## CE2 5 — `ce2_monnaie_defi` — « Défis de monnaie »

### Paysage (≈ 1 min 45) — « Le grand défi du marché »
| Clé | Image | Voix |
|---|---|---|
| 00-accroche | Idriss lève un doigt : « Défi 1 ». Il a « 5 € » ; des flotteurs pour sa ligne, « 1,50 € » l'un. | Salut ! C'est le grand défi de la monnaie. Idriss a cinq euros. Un flotteur pour sa ligne coûte un virgule cinquante euro. Combien peut-il en acheter, au plus ? |
| 01-ajoute | Les flotteurs s'alignent : « 1,50 € ; 3 € ; 4,50 € » ; un quatrième, « 6 € : trop ! », repart. | J'ajoute le prix sans dépasser : un virgule cinquante, trois, quatre virgule cinquante. Encore un ? Six euros : c'est trop ! |
| 02-reste | « 3 flotteurs » ; « 5 € − 4,50 € = 0,50 € ». | Idriss achète trois flotteurs. Il lui reste cinquante centimes. |
| 03-ecritures | « Défi 2 » ; « 6,05 € = 605 c ». | Deuxième défi : un même prix peut s'écrire de deux façons. Six virgule zéro cinq euros, c'est six cent cinq centimes ! |
| 04-question | Deux porte-monnaie : le premier « 3,40 € », le second « 304 c ». Choix A le premier, B le second, C pareil. | Question ! Le premier porte-monnaie contient trois virgule quarante euros. Le second, trois cent quatre centimes. Lequel a le plus ? A : le premier. B : le second. C : les deux pareil. Mets pause, et choisis ! |
| 04b-reponse | « 304 c = 3,04 € » ; « 3,40 € > 3,04 € ». | Réponse A ! Trois cent quatre centimes, c'est trois virgule zéro quatre euros. Trois virgule quarante, c'est plus. Le premier gagne ! |
| 05-question | « Défi 3 » ; une dorade et un calamar : « 9 € en tout » ; la dorade « 5,50 € », le calamar « ? ». Choix A 4,50 €, B 3,50 €, C 14,50 €. | Question ! Une dorade et un calamar coûtent neuf euros en tout. La dorade coûte cinq virgule cinquante euros. Combien coûte le calamar ? A : quatre virgule cinquante euros. B : trois virgule cinquante euros. C : quatorze virgule cinquante euros. Mets pause, et choisis ! |
| 05b-reponse | « 5,50 € → 6 € : + 50 c » ; « 6 € → 9 € : + 3 € » ; « 3,50 € ». | Réponse B ! De cinq virgule cinquante à six : cinquante centimes. De six à neuf : trois euros. Le calamar coûte trois virgule cinquante euros. |
| 06-appris | « Ce que tu as appris » ; « sans dépasser » ; « en centimes pour comparer » ; « étape par étape ». | Un défi d'argent ? J'ajoute le prix sans dépasser. Je change en centimes pour comparer. Et j'avance étape par étape. |
| 07-abonne | Écran de fin. | Entraîne-toi sur éleveai point f r, ou sur YouTube : éleveai neuf sept quatre ! |

### Short (≈ 50 s) — « La lampe d'Idriss »
| Clé | Image | Voix |
|---|---|---|
| 00-accroche | La nuit tombe ; Idriss a « 10 € ». Il veut une lampe « 6,20 € », un flotteur « 1,50 € », des hameçons « 2,40 € ». | Salut ! Idriss a dix euros. Il veut une lampe à six virgule vingt euros, un flotteur à un virgule cinquante euro, et des hameçons à deux virgule quarante euros. |
| 01-question | Choix A non, il manque 10 c, B oui, pile, C oui, il reste 1 €. | Question ! A-t-il assez d'argent ? A : non, il manque dix centimes. B : oui, pile. C : oui, il reste un euro. Mets pause, et choisis ! |
| 01b-reponse | « 6,20 € + 1,50 € = 7,70 € » ; « 7,70 € + 2,40 € = 10,10 € » ; « 10,10 € > 10 € ». Idriss repose le flotteur et garde la lampe allumée. | Réponse A ! Six virgule vingt plus un virgule cinquante, sept virgule soixante-dix. Plus deux virgule quarante : dix virgule dix euros. Il manque dix centimes ! Le flotteur attendra demain. |
| 02-commentaire | Des glaces « 2,50 € », « tu as 10 € » ; « ? ». | À toi : avec dix euros, combien de glaces à deux virgule cinquante euros peux-tu acheter ? Dis-le à voix haute, ou réponds en commentaire ! |
| 03-abonne | Écran de fin. | Entraîne-toi sur éleveai point f r, ou sur YouTube : éleveai neuf sept quatre ! |
