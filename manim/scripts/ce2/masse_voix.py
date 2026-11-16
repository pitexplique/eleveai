# masse_voix.py
# EleveAI — série MASSES du CP au CM2 (session C, mardi-mercredi 17-18/11/2026).
# LA source unique des voix de la série : 25 paysages + 25 shorts.
# ⛔ 16/11 Frédéric : « si la 6e n'a pas de masse tu fais pas » → pas de vidéos 6e (pas de notion masse au coach 6e).
#   python manim/scripts/ce2/masse_voix.py            → écrit manim/VOIX-masses-cp-cm2.md (à faire valider)
#   python manim/scripts/ce2/masse_voix.py --ecrire   → écrit manim/voix/<id>.json (⛔ seulement après le « oui »)
# Les questions-pauses sont écrites (question, bonne réponse, deux leurres, explication) ; la place de la
# bonne réponse (A, B ou C) et l'ordre des leurres sont tirés au hasard (graine 1116), jamais deux fois la
# même lettre de suite dans une paysage, ≈ un tiers de A, de B, de C sur la série (REGLES.md, 09/11).
# Après validation, une voix retouchée se corrige ICI, puis on relance --ecrire (il refuse d'écraser un JSON
# dont le WAV existe déjà, sauf --force).
import json
import random
import re
import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
MANIM = ICI.parents[1]
FIN_P = ("Entraîne-toi sur éleveai point f r. Et si ça t'a aidé : mets un pouce, laisse un commentaire, "
         "abonne-toi et active la cloche !")
FIN_S = "Entraîne-toi sur éleveai point f r. Mets un pouce, abonne-toi et active la cloche !"


def Q(q, juste, leurres, expl):
    return {"q": q, "juste": juste, "leurres": leurres, "expl": expl}


# (id, classe, micro, ceinture paysage, ceinture short, métier, [écrans paysage], [écrans short])
# Un écran = (clé, texte) ou (clé, Q(...)) pour une question-pause (clé « 04-question » → « 04b-reponse »).
SERIE = [
    # ─────────────────────────────── CP (notion masse_contenance) ───────────────────────────────
    ("cp-masse-lexique", "cp", "cp_masse_lexique", "blanche", "blanche", "Awa, déménageuse", [
        ("00-garde", "Lourd ou léger ? Qu'est-ce qui est le plus lourd : un carton de livres, ou un oreiller ?"),
        ("01-situation", "Voici Awa. Elle est déménageuse. Toute la journée, elle porte des cartons. "
                         "Certains sont lourds. D'autres sont légers."),
        ("02-lourd-leger", "Un carton de livres : Awa le porte avec peine. Il est lourd. "
                           "Un oreiller : elle le soulève d'un doigt. Il est léger."),
        ("03-soupeser", "Pour savoir, on soupèse. On prend un objet dans chaque main. "
                        "La main qui descend tient le plus lourd."),
        ("04-question", Q("Qu'est-ce qui est le plus léger : une plume, ou un dictionnaire ?", "la plume",
                          ["le dictionnaire", "c'est pareil"],
                          "La plume est légère : on la sent à peine dans la main.")),
        ("05-piege", "Attention : gros ne veut pas dire lourd ! Un gros ballon de plage est léger. "
                     "Une petite bille en fer est lourde."),
        ("06-question", Q("Un gros ballon de plage, une petite bille en fer. Lequel est le plus lourd ?",
                          "la bille en fer", ["le ballon de plage", "c'est pareil"],
                          "La bille est petite, mais elle est en fer. Elle est plus lourde que le ballon.")),
        ("07-defi", "À toi de jouer ! Awa a un oreiller, un carton de livres et une chaise. "
                    "Lequel est le plus léger ? Mets pause, et cherche !"),
        ("07b-correction", "Correction. L'oreiller est le plus léger. Le carton et la chaise sont plus lourds."),
        ("08-finale", "Ce que tu as appris. Lourd ou léger : on soupèse avec ses mains. "
                      "Et un gros objet n'est pas toujours lourd."),
    ], [
        ("00-accroche", "Salut ! Mon copain veut porter le gros ballon de plage. Il prend son élan… "
                        "et il le soulève d'un doigt !"),
        ("01-surprise", "Le ballon est gros, mais il est léger : il est plein d'air."),
        ("02-question", Q("Le gros ballon, ou la petite bille en fer : qui est le plus lourd ?",
                          "la bille en fer", ["le gros ballon", "c'est pareil"],
                          "Petite, mais en fer : la bille est plus lourde.")),
        ("03-fin", "Gros ne veut pas dire lourd !"),
        ("04-commentaire", "À toi : une pomme, une plume, une pastèque. Range-les du plus léger au plus lourd. "
                           "Réponds en commentaire !"),
    ]),
    ("cp-masse-comparer", "cp", "cp_masse_comparer", "blanche", "blanche", "Hugo, primeur", [
        ("00-garde", "Comparer des masses. Un melon, un ananas : lequel est le plus lourd ?"),
        ("01-situation", "Voici Hugo. Il est primeur : il vend des fruits et des légumes. "
                         "Il a un melon et un ananas. Lequel est le plus lourd ?"),
        ("02-balance", "Hugo prend une balance à deux plateaux. Le melon à gauche, l'ananas à droite. "
                       "Le plateau du melon descend."),
        ("03-regle", "Le plateau qui descend porte le plus lourd. Le melon est plus lourd que l'ananas."),
        ("04-question", Q("Sur la balance, le plateau de gauche descend. Que peut-on dire ?",
                          "à gauche, c'est le plus lourd", ["à droite, c'est le plus lourd", "les deux sont pareils"],
                          "Le plateau qui descend porte l'objet le plus lourd.")),
        ("05-equilibre", "Maintenant, deux pommes. Les plateaux restent au même niveau. "
                         "Les deux pommes ont la même masse."),
        ("06-question", Q("Deux boîtes fermées sont pareilles. Comment savoir laquelle est la plus lourde ?",
                          "on les pèse sur la balance", ["on prend la plus jolie", "on choisit au hasard"],
                          "À l'œil, elles sont pareilles. La balance, elle, sait le dire.")),
        ("07-defi", "À toi de jouer ! Une orange à gauche, un citron à droite. Le plateau de droite monte. "
                    "Qui est le plus lourd ? Mets pause, et cherche !"),
        ("07b-correction", "Correction. Le plateau de droite monte, donc celui de gauche descend. "
                           "L'orange est la plus lourde."),
        ("08-finale", "Ce que tu as appris. Sur une balance, le plateau qui descend porte le plus lourd. "
                      "Au même niveau, c'est la même masse."),
    ], [
        ("00-accroche", "Salut ! Je mets mon doudou sur la balance. Mon copain met sa petite voiture en fer. "
                        "Mon doudou monte tout en haut !"),
        ("01-surprise", "Mon doudou est gros… mais la voiture est plus lourde !"),
        ("02-question", Q("Le plateau du doudou monte. Qui est le plus lourd ?", "la voiture",
                          ["le doudou", "personne"], "Le plateau qui descend porte le plus lourd : la voiture.")),
        ("03-fin", "J'ajoute mon goûter avec le doudou… Équilibre !"),
        ("04-commentaire", "À toi : 2 pommes sur un plateau. Combien de pommes pareilles de l'autre côté, "
                           "pour l'équilibre ? Réponds en commentaire !"),
    ]),
    ("cp-masse-estimer", "cp", "cp_masse_contenance_estimer", "blanche", "blanche", "Zoé, toiletteuse pour chiens", [
        ("00-garde", "Ranger des masses. Trois chiens : lequel est le plus léger ?"),
        ("01-situation", "Voici Zoé. Elle est toiletteuse : elle lave et coiffe les chiens. "
                         "Aujourd'hui : un chiot, un chien moyen et un gros chien."),
        ("02-deux-par-deux", "Pour ranger, on compare deux par deux. Le chiot est plus léger que le chien moyen. "
                             "Le chien moyen est plus léger que le gros chien."),
        ("03-rang", "Du plus léger au plus lourd : le chiot, le chien moyen, le gros chien."),
        ("04-question", Q("La boîte A pèse plus que la B. La B pèse plus que la C. Laquelle est la plus lourde ?",
                          "la boîte A", ["la boîte B", "la boîte C"],
                          "A pèse plus que B, et B plus que C. Donc A est la plus lourde.")),
        ("05-deviner", "Sans balance, on peut deviner. Une souris est plus légère qu'un chat. "
                       "Un chat est plus léger qu'un cheval."),
        ("06-question", Q("Une souris, un chat, un cheval. Qui est le plus lourd ?", "le cheval",
                          ["la souris", "le chat"], "Le cheval est bien plus lourd que le chat et la souris.")),
        ("07-defi", "À toi de jouer ! Range du plus léger au plus lourd : une pastèque, une fraise, une pomme. "
                    "Mets pause, et cherche !"),
        ("07b-correction", "Correction. La fraise, puis la pomme, puis la pastèque."),
        ("08-finale", "Ce que tu as appris. Pour ranger des masses, on compare deux par deux. "
                      "Du plus léger au plus lourd."),
    ], [
        ("00-accroche", "Salut ! Trois chats montent sur ma branche : un chaton, un chat, un gros matou. "
                        "La branche craque !"),
        ("01-oups", "Oups ! Il faut ranger : qui est le plus léger ?"),
        ("02-question", Q("Qui monte en premier, le plus léger ?", "le chaton", ["le chat", "le gros matou"],
                          "Le chaton est le plus léger. Puis le chat, puis le gros matou.")),
        ("03-fin", "Le gros matou, lui, reste en bas !"),
        ("04-commentaire", "À toi : un éléphant, une fourmi, un lapin. Range-les du plus léger au plus lourd. "
                           "Réponds en commentaire !"),
    ]),
    ("cp-masse-defi", "cp", "cp_masse_contenance_defi", "blanche", "blanche", "Noé, livreur à vélo", [
        ("00-garde", "Le défi des masses. Trois colis : lequel est le plus lourd ?"),
        ("01-situation", "Voici Noé. Il est livreur à vélo. Il a trois colis : le rouge, le bleu et le vert. "
                         "Lequel est le plus lourd ?"),
        ("02-pesee1", "Première pesée : le rouge contre le bleu. Le rouge descend. Il est plus lourd que le bleu."),
        ("03-pesee2", "Deuxième pesée : le bleu contre le vert. Le bleu descend. Il est plus lourd que le vert."),
        ("04-question", Q("Quel colis est le plus léger ?", "le vert", ["le rouge", "le bleu"],
                          "Le rouge bat le bleu, le bleu bat le vert. Le vert est le plus léger.")),
        ("05-rang", "Du plus lourd au plus léger : le rouge, le bleu, le vert. Le rouge est le plus lourd !"),
        ("06-question", Q("Un sac de plumes, un sac de billes. Même taille. Pèsent-ils pareil ?",
                          "non, les billes sont plus lourdes", ["oui, c'est la même taille",
                                                                "non, les plumes sont plus lourdes"],
                          "Même taille, mais pas même masse. Les billes sont bien plus lourdes.")),
        ("07-defi", "À toi de jouer ! La pomme est plus lourde que la prune. La prune est plus lourde que la cerise. "
                    "Quel fruit est le plus léger ? Mets pause, et cherche !"),
        ("07b-correction", "Correction. La cerise est plus légère que la prune, et la prune que la pomme. "
                           "La cerise est la plus légère."),
        ("08-finale", "Ce que tu as appris. Avec deux pesées, on range trois objets. Et la taille ne dit pas la masse."),
    ], [
        ("00-accroche", "Salut ! J'ai trois cadeaux de la même taille. Ma copine veut le plus lourd."),
        ("01-pesees", "Le jaune contre le rose : le jaune descend. Le rose contre le bleu : le rose descend."),
        ("02-question", Q("Quel cadeau est le plus lourd ?", "le jaune", ["le rose", "le bleu"],
                          "Le jaune bat le rose, et le rose bat le bleu. Le jaune est le plus lourd !")),
        ("03-fin", "Dedans… un gros caillou ! Merci, ma copine !"),
        ("04-commentaire", "À toi : le chat pèse plus que le lapin. Le lapin pèse plus que la souris. "
                           "Qui est le plus léger ? Réponds en commentaire !"),
    ]),
    # ─────────────────────────────── CE1 (notion masse) ───────────────────────────────
    ("ce1-masse-kg-g", "ce1", "ce1_masse_kg_g", "blanche", "blanche", "Jade, postière", [
        ("00-garde", "Le kilogramme et le gramme. Un colis, une lettre : avec quelle unité les pèse-t-on ?"),
        ("01-situation", "Voici Jade. Elle est postière. Elle pèse chaque colis et chaque lettre. "
                         "Le prix de l'envoi dépend de la masse."),
        ("02-kg", "Pour les objets lourds, on utilise le kilogramme. On écrit k g. "
                  "Le gros colis pèse 3 kilogrammes."),
        ("03-g", "Pour les objets légers, on utilise le gramme. On écrit g. La lettre pèse 20 grammes."),
        ("04-question", Q("Comment écrit-on « kilogramme » en abrégé ?", "k g", ["k l", "g k"],
                          "Kilogramme s'écrit k g : le k de kilo, le g de gramme.")),
        ("05-balance", "Jade lit sa balance. Le paquet pèse 2 kilogrammes. La carte postale pèse 5 grammes."),
        ("06-question", Q("La lettre de Jade pèse 20… quoi ?", "20 grammes", ["20 kilogrammes", "20 litres"],
                          "Une lettre est légère : 20 grammes. Le litre, lui, mesure une contenance.")),
        ("07-defi", "À toi de jouer ! Un vélo et une clé. Lequel pèse 12 kilogrammes ? Lequel pèse 12 grammes ? "
                    "Mets pause, et cherche !"),
        ("07b-correction", "Correction. Le vélo est lourd : 12 kilogrammes. La clé est légère : 12 grammes."),
        ("08-finale", "Ce que tu as appris. Le kilogramme, k g, pour les objets lourds. "
                      "Le gramme, g, pour les objets légers."),
    ], [
        ("00-accroche", "Salut ! Sur l'étiquette du chaton, mon copain écrit : 1 gramme. "
                        "1 gramme ? C'est la masse d'un trombone !"),
        ("01-oups", "Un chaton, c'est bien plus lourd !"),
        ("02-question", Q("Le chaton pèse environ…", "1 kilogramme", ["1 gramme", "100 kilogrammes"],
                          "Un chaton pèse environ 1 kilogramme. 1 gramme, c'est un trombone !")),
        ("03-fin", "Mon copain corrige : 1 kilogramme. Le chaton ronronne !"),
        ("04-commentaire", "À toi : un trombone pèse 1 gramme. Combien pèsent 10 trombones ? "
                           "Réponds en commentaire !"),
    ]),
    ("ce1-masse-relation", "ce1", "ce1_masse_relation_kg_g", "blanche", "blanche", "Liam, vendeur en vrac", [
        ("00-garde", "1 kilogramme, c'est combien de grammes ? Deux sacs de 500 grammes, est-ce 1 kilogramme ?"),
        ("01-situation", "Voici Liam. Il vend du riz, des lentilles et des graines en vrac. "
                         "On vient avec son sac, et il pèse ce qu'on veut."),
        ("02-equilibre", "D'un côté de la balance, 1 kilogramme. De l'autre, 1 000 grammes. Équilibre ! "
                         "1 kilogramme, c'est 1 000 grammes."),
        ("03-deux-sacs", "Un client veut 1 kilogramme de lentilles. Liam remplit deux sacs de 500 grammes. "
                         "500 plus 500 : 1 000 grammes, 1 kilogramme."),
        ("04-question", Q("Un élève écrit : 1 kilogramme égale 100 grammes. A-t-il raison ?",
                          "non, c'est 1 000 grammes", ["oui", "non, c'est 10 grammes"],
                          "1 kilogramme, c'est 1 000 grammes. Pas 100 !")),
        ("05-quatre-sacs", "Avec des sacs de 250 grammes ? 250, 500, 750, 1 000. Il en faut 4 pour 1 kilogramme."),
        ("06-question", Q("Combien de paquets de 500 grammes pour faire 1 kilogramme ?", "2", ["5", "10"],
                          "500 plus 500 : 1 000 grammes, 1 kilogramme. Il en faut 2.")),
        ("07-defi", "À toi de jouer ! Liam a 600 grammes de riz sur la balance. Combien de grammes ajouter "
                    "pour avoir 1 kilogramme ? Mets pause, et cherche !"),
        ("07b-correction", "Correction. 1 kilogramme, c'est 1 000 grammes. De 600 à 1 000, il manque 400. "
                           "Liam ajoute 400 grammes."),
        ("08-finale", "Ce que tu as appris. 1 kilogramme, c'est 1 000 grammes. 2 fois 500 grammes, "
                      "c'est 1 kilogramme."),
    ], [
        ("00-accroche", "Salut ! Ma copine a un sac de 1 kilogramme de billes. Moi, j'ai 1 000 grammes. "
                        "1 000, c'est plus que 1 : j'ai gagné !"),
        ("01-balance", "On pose les deux sacs sur la balance…"),
        ("02-question", Q("Que fait la balance ?", "elle reste en équilibre", ["mon sac descend", "son sac descend"],
                          "1 kilogramme, c'est 1 000 grammes. Même masse : équilibre !")),
        ("03-fin", "Égalité ! Bon… on joue aux billes ensemble ?"),
        ("04-commentaire", "À toi : combien de sacs de 250 grammes pour faire 1 kilogramme ? "
                           "Réponds en commentaire !"),
    ]),
    ("ce1-masse-estimer", "ce1", "ce1_masse_estimer", "blanche", "blanche", "Chloé, bibliothécaire", [
        ("00-garde", "Estimer une masse. Une trousse peut-elle peser 3 kilogrammes ?"),
        ("01-situation", "Voici Chloé. Elle est bibliothécaire. Elle range des livres, des gros et des petits. "
                         "Elle doit savoir ce qu'elle peut porter."),
        ("02-reperes", "Deux repères. Un trombone pèse environ 1 gramme. "
                       "Une brique de lait pleine pèse environ 1 kilogramme."),
        ("03-livres", "Un gros dictionnaire pèse environ 1 kilogramme, comme la brique. "
                      "Un petit livre pèse environ 200 grammes."),
        ("04-question", Q("Environ combien pèse une brique de lait pleine ?", "1 kilogramme",
                          ["1 gramme", "10 kilogrammes"], "Une brique de lait de 1 litre pèse environ 1 kilogramme.")),
        ("05-piege", "Attention aux nombres impossibles ! 3 kilogrammes, c'est trois briques de lait. "
                     "Une trousse pèse environ 300 grammes."),
        ("06-question", Q("Un élève écrit : ma trousse pèse 3 kilogrammes. Est-ce possible ?",
                          "non, c'est trop lourd", ["oui, c'est normal", "non, c'est trop léger"],
                          "3 kilogrammes, c'est trois briques de lait. Une trousse pèse environ 300 grammes.")),
        ("07-defi", "À toi de jouer ! Le cartable de Chloé pèse-t-il 3 grammes, 3 kilogrammes, "
                    "ou 300 kilogrammes ? Mets pause, et cherche !"),
        ("07b-correction", "Correction. 3 grammes, c'est trois trombones : trop léger. 300 kilogrammes, "
                           "c'est un piano : trop lourd. Le cartable pèse environ 3 kilogrammes."),
        ("08-finale", "Ce que tu as appris. Pour estimer, on compare à un repère. 1 gramme : un trombone. "
                      "1 kilogramme : une brique de lait."),
    ], [
        ("00-accroche", "Salut ! Mon copain dit : ma gomme pèse 1 kilogramme ! Je lui donne une brique de lait. "
                        "Ça, c'est 1 kilogramme."),
        ("01-oups", "Sa main descend d'un coup ! La gomme, c'est bien plus léger."),
        ("02-question", Q("Une gomme pèse environ…", "20 grammes", ["1 kilogramme", "20 kilogrammes"],
                          "Une gomme pèse environ 20 grammes : comme 20 trombones.")),
        ("03-fin", "Mon copain range la brique… et garde sa gomme !"),
        ("04-commentaire", "À toi : combien pèse ton cartable, en kilogrammes ? Réponds en commentaire !"),
    ]),
    ("ce1-masse-probleme", "ce1", "ce1_masse_probleme", "blanche", "blanche", "Malo, pêcheur à Saint-Pierre", [
        ("00-garde", "Problèmes de masses. Panier plein : 1 kilogramme. Vide : 300 grammes. "
                     "Combien pèsent les poissons ?"),
        ("01-situation", "Voici Malo. Il est pêcheur au port de Saint-Pierre, à La Réunion. "
                         "Il pèse sa pêche pour la vendre."),
        ("02-plein-vide", "Le panier plein de poissons pèse 1 kilogramme, donc 1 000 grammes. "
                          "Le panier vide pèse 300 grammes."),
        ("03-soustraire", "Les poissons, c'est le plein moins le panier. 1 000 moins 300 : 700. "
                          "Les poissons pèsent 700 grammes."),
        ("04-question", Q("Un sac de 1 kilogramme de farine. On en prend 400 grammes. Combien reste-t-il ?",
                          "600 grammes", ["1 400 grammes", "400 grammes"],
                          "1 kilogramme, c'est 1 000 grammes. 1 000 moins 400 : il reste 600 grammes.")),
        ("05-ajouter", "Malo vend 3 kilogrammes de thon et 2 kilogrammes de dorade. 3 plus 2 : 5 kilogrammes en tout."),
        ("06-question", Q("Sur le plateau, 750 grammes de poisson. Combien ajouter pour faire 1 kilogramme ?",
                          "250 grammes", ["350 grammes", "1 750 grammes"],
                          "1 kilogramme, c'est 1 000 grammes. De 750 à 1 000, il manque 250 grammes.")),
        ("07-defi", "À toi de jouer ! Malo a 2 kilogrammes de crevettes. Il en vend 500 grammes. "
                    "Combien de grammes lui reste-t-il ? Mets pause, et cherche !"),
        ("07b-correction", "Correction. 2 kilogrammes, c'est 2 000 grammes. 2 000 moins 500 : 1 500. "
                           "Il reste 1 500 grammes."),
        ("08-finale", "Ce que tu as appris. On calcule avec la même unité. Ce qu'il y a dedans, "
                      "c'est le plein moins le vide."),
    ], [
        ("00-accroche", "Salut ! Mon seau plein de coquillages pèse 1 kilogramme. Mon copain dit : "
                        "1 kilogramme de coquillages !"),
        ("01-oups", "Attends… le seau aussi a une masse ! Vide, il pèse 200 grammes."),
        ("02-question", Q("Combien pèsent les coquillages ?", "800 grammes", ["1 kilogramme", "1 200 grammes"],
                          "1 000 grammes moins 200 grammes de seau : 800 grammes de coquillages.")),
        ("03-fin", "Le seau ne compte pas… mais il est très joli !"),
        ("04-commentaire", "À toi : un panier plein pèse 900 grammes, vide 100 grammes. "
                           "Combien pèsent les fruits ? Réponds en commentaire !"),
    ]),
    ("ce1-masse-defi", "ce1", "ce1_masse_defi", "jaune", "blanche", "Lina, jongleuse de cirque", [
        ("00-garde", "Le défi des masses. 5 quilles de 200 grammes : est-ce plus lourd que 1 kilogramme ?"),
        ("01-situation", "Voici Lina. Elle est jongleuse dans un cirque. Dans sa valise, elle range ses quilles "
                         "et ses balles. La valise doit rester légère."),
        ("02-quilles", "Une quille pèse 200 grammes. Lina en a 5. 200, 400, 600, 800, 1 000 : 1 000 grammes."),
        ("03-un-kilo", "1 000 grammes, c'est 1 kilogramme. Les 5 quilles pèsent juste 1 kilogramme. "
                       "Ni plus, ni moins !"),
        ("04-question", Q("Le même sac : Léa écrit 1 kilogramme, Kevin écrit 1 000 grammes. Qui a raison ?",
                          "les deux", ["Léa seulement", "Kevin seulement"],
                          "1 kilogramme, c'est 1 000 grammes : les deux ont raison.")),
        ("05-balles", "Lina ajoute 3 balles de 100 grammes. 1 000 plus 300 : 1 300 grammes. "
                      "C'est plus que 1 kilogramme."),
        ("06-question", Q("Qu'est-ce qui est le plus lourd : 1 kilogramme de plumes, ou 1 kilogramme de cailloux ?",
                          "c'est pareil", ["les cailloux", "les plumes"],
                          "1 kilogramme, c'est 1 kilogramme ! Les plumes prennent juste plus de place.")),
        ("07-defi", "À toi de jouer ! La valise vide pèse 2 kilogrammes. Lina y met ses 5 quilles, "
                    "et 2 balles de 500 grammes. Combien pèse la valise ? Mets pause, et cherche !"),
        ("07b-correction", "Correction. Les 5 quilles : 1 kilogramme. Les 2 balles : 500 plus 500, 1 kilogramme. "
                           "2 plus 1 plus 1 : la valise pèse 4 kilogrammes."),
        ("08-finale", "Ce que tu as appris. On additionne des masses dans la même unité. "
                      "Et 1 000 grammes, c'est 1 kilogramme."),
    ], [
        ("00-accroche", "Salut ! Ma copine et moi, on fait un pari. Le plus lourd : 1 kilogramme de plumes, "
                        "ou 1 kilogramme de cailloux ?"),
        ("01-pari", "Elle dit : les cailloux, c'est sûr ! Je pose les deux sacs sur la balance…"),
        ("02-question", Q("Que fait la balance ?", "elle reste en équilibre",
                          ["les cailloux descendent", "les plumes descendent"],
                          "1 kilogramme, c'est 1 kilogramme ! Le sac de plumes est juste plus gros.")),
        ("03-fin", "Pari gagné ! Mais je dors sur l'oreiller de plumes, pas sur les cailloux."),
        ("04-commentaire", "À toi : combien de grammes dans 2 kilogrammes de plumes ? Réponds en commentaire !"),
    ]),
    # ─────────────────────────────── CE2 (notion masse) ───────────────────────────────
    ("ce2-masse-unites", "ce2", "ce2_masse_unites", "jaune", "jaune", "Rayan, grutier au port", [
        ("00-garde", "Les unités de masse. Un conteneur se pèse-t-il en grammes, en kilogrammes, ou en tonnes ?"),
        ("01-situation", "Voici Rayan. Il est grutier au port. Avec sa grue, il soulève des conteneurs énormes "
                         "et les pose sur les bateaux."),
        ("02-trois", "Trois unités de masse. Le gramme, g, pour les objets légers. Le kilogramme, k g, "
                     "pour les objets plus lourds. La tonne, t, pour les très lourds."),
        ("03-tonne", "Un conteneur plein pèse 20 tonnes. 1 tonne, c'est 1 000 kilogrammes : "
                     "la masse d'une petite voiture."),
        ("04-question", Q("Le gramme, le kilogramme, la tonne : quelle est la plus petite unité ?", "le gramme",
                          ["le kilogramme", "la tonne"], "Le gramme est la plus petite : c'est la masse d'un trombone.")),
        ("05-kilo", "Dans kilogramme, il y a kilo. Kilo veut dire 1 000. 1 kilogramme, c'est 1 000 grammes."),
        ("06-question", Q("Dans le mot kilogramme, que veut dire kilo ?", "1 000", ["100", "10"],
                          "Kilo veut dire 1 000 : 1 kilogramme, c'est 1 000 grammes. "
                          "Comme 1 kilomètre, 1 000 mètres.")),
        ("07-defi", "À toi de jouer ! Rayan pèse une vis, sa caisse à outils, et un bateau. "
                    "Quelle unité pour chacun ? Mets pause, et cherche !"),
        ("07b-correction", "Correction. La vis, en grammes. La caisse à outils, en kilogrammes. "
                           "Le bateau, en tonnes."),
        ("08-finale", "Ce que tu as appris. Trois unités : le gramme, le kilogramme, la tonne. Kilo veut dire 1 000."),
    ], [
        ("00-accroche", "Salut ! Mon copain veut peser un éléphant… sur la balance de la cuisine !"),
        ("01-crac", "L'aiguille fait trois tours et… crac ! Il faut une autre unité."),
        ("02-question", Q("Pour peser un éléphant, on prend…", "la tonne", ["le gramme", "le litre"],
                          "Un éléphant pèse environ 5 tonnes. La tonne, c'est pour les très lourds !")),
        ("03-fin", "La balance de cuisine, c'est pour la farine. L'éléphant, c'est la bascule du port !"),
        ("04-commentaire", "À toi : 1 tonne, c'est combien de kilogrammes ? Réponds en commentaire !"),
    ]),
    ("ce2-masse-relations", "ce2", "ce2_masse_relations", "jaune", "jaune", "Emma, torréfactrice de café", [
        ("00-garde", "Les relations entre les unités. 1 kilogramme 200 grammes, c'est combien de grammes ?"),
        ("01-situation", "Voici Emma. Elle est torréfactrice : elle grille les grains de café. "
                         "Puis elle les met en paquets."),
        ("02-mille", "1 kilogramme, c'est 1 000 grammes. Emma remplit 4 paquets de 250 grammes. "
                     "250, 500, 750, 1 000 : 1 kilogramme de café."),
        ("03-demi", "Un demi-kilogramme, c'est la moitié de 1 000 grammes : 500 grammes."),
        ("04-question", Q("Un demi-kilogramme, c'est combien de grammes ?", "500 grammes",
                          ["50 grammes", "200 grammes"], "La moitié de 1 000, c'est 500. "
                                                         "Un demi-kilogramme, c'est 500 grammes.")),
        ("05-kg-et-g", "Un sac pèse 1 kilogramme 200 grammes. 1 kilogramme, c'est 1 000 grammes. "
                       "1 000 plus 200 : 1 200 grammes."),
        ("06-tonne", "Même idée pour la tonne : 1 tonne, c'est 1 000 kilogrammes. "
                     "Le camion livre 2 tonnes de grains : 2 000 kilogrammes."),
        ("07-question", Q("Un élève écrit : 2 kilogrammes 50 grammes, c'est 250 grammes. A-t-il raison ?",
                          "non, c'est 2 050 grammes", ["oui", "non, c'est 2 500 grammes"],
                          "2 kilogrammes, c'est 2 000 grammes. 2 000 plus 50 : 2 050 grammes.")),
        ("08-defi", "À toi de jouer ! Emma a 3 kilogrammes de café. Elle fait des paquets de 500 grammes. "
                    "Combien de paquets ? Mets pause, et cherche !"),
        ("08b-correction", "Correction. 3 kilogrammes, c'est 3 000 grammes. Il faut 2 paquets pour 1 kilogramme. "
                           "Pour 3 kilogrammes : 6 paquets."),
        ("09-finale", "Ce que tu as appris. 1 kilogramme, c'est 1 000 grammes. 1 tonne, c'est 1 000 kilogrammes."),
    ], [
        ("00-accroche", "Salut ! Sur le sac de riz : 1 kilogramme 200 grammes. Mon copain lit : "
                        "1 200 kilogrammes ! Il le soulève… facile !"),
        ("01-oups", "1 200 kilogrammes ? Ce serait plus lourd qu'une voiture !"),
        ("02-question", Q("1 kilogramme 200 grammes, c'est…", "1 200 grammes",
                          ["1 200 kilogrammes", "120 grammes"],
                          "1 kilogramme, c'est 1 000 grammes. Plus 200 : 1 200 grammes.")),
        ("03-fin", "Même sac, deux écritures !"),
        ("04-commentaire", "À toi : 3 kilogrammes 500 grammes, c'est combien de grammes ? "
                           "Réponds en commentaire !"),
    ]),
    ("ce2-masse-comparer", "ce2", "ce2_masse_comparer", "jaune", "jaune", "Anaïs, fromagère", [
        ("00-garde", "Comparer des masses. Qu'est-ce qui est le plus lourd : 1 kilogramme, ou 900 grammes ?"),
        ("01-situation", "Voici Anaïs. Elle est fromagère. Elle coupe des parts de fromage et les pèse. "
                         "Un client veut le plus gros morceau : 1 kilogramme, ou 900 grammes ?"),
        ("02-meme-unite", "Avec la même unité, c'est facile. Une part de 300 grammes, une autre de 450 grammes. "
                          "450 est plus grand que 300. La part de 450 grammes est la plus lourde."),
        ("03-convertir", "Avec deux unités, on met d'abord la même unité. 1 kilogramme, c'est 1 000 grammes. "
                         "On compare 1 000 et 900 : 1 000 est plus grand. Le morceau de 1 kilogramme "
                         "est le plus lourd !"),
        ("04-question", Q("Balance à deux plateaux : 1 kilogramme d'un côté, 1 000 grammes de l'autre. "
                          "Que se passe-t-il ?", "les plateaux restent au même niveau",
                          ["le kilogramme descend", "les 1 000 grammes descendent"],
                          "1 kilogramme, c'est 1 000 grammes : même masse, la balance est en équilibre.")),
        ("05-piege", "Attention au piège : 900 est plus grand que 1. Mais 1 kilogramme, c'est 1 000 grammes ! "
                     "On compare les nombres seulement avec la même unité."),
        ("06-question", Q("Qu'est-ce qui est le plus lourd : 1 kilogramme de plumes, ou 1 kilogramme de cailloux ?",
                          "c'est pareil", ["les cailloux", "les plumes"],
                          "1 kilogramme, c'est 1 kilogramme ! Les plumes prennent plus de place, "
                          "mais elles ont la même masse.")),
        ("07-defi", "À toi de jouer ! Anaïs range trois fromages, du plus léger au plus lourd : "
                    "2 kilogrammes, 1 500 grammes et 800 grammes. Dans quel ordre ? Mets pause, et cherche !"),
        ("07b-correction", "Correction. On met tout en grammes. 2 kilogrammes, c'est 2 000 grammes. "
                           "Du plus léger au plus lourd : 800 grammes, puis 1 500 grammes, puis 2 kilogrammes."),
        ("08-finale", "Ce que tu as appris. Pour comparer des masses, on met d'abord la même unité, "
                      "puis on compare les nombres. Et la taille ne dit pas la masse."),
    ], [
        ("00-accroche", "Salut ! Ma copine a un fromage de 900 grammes. Moi, un morceau de 1 kilogramme. "
                        "Elle dit : 900, c'est plus que 1 ! J'ai le plus gros !"),
        ("01-balance", "On pose les deux sur la balance…"),
        ("02-question", Q("Quel plateau descend ?", "celui de 1 kilogramme",
                          ["celui de 900 grammes", "aucun, c'est l'équilibre"],
                          "1 kilogramme, c'est 1 000 grammes. 1 000 est plus grand que 900 !")),
        ("03-fin", "Ma copine fait la grimace… je partage quand même !"),
        ("04-commentaire", "À toi : qui est le plus lourd, 2 kilogrammes ou 1 800 grammes ? "
                           "Réponds en commentaire !"),
    ]),
    ("ce2-masse-choisir-unite", "ce2", "ce2_masse_choisir_unite", "jaune", "jaune", "Tom, chauffeur routier", [
        ("00-garde", "Choisir la bonne unité. Un letchi, un sac de riz, un camion : en grammes, "
                     "en kilogrammes, ou en tonnes ?"),
        ("01-situation", "Voici Tom. Il est chauffeur routier. Son gros camion livre des fruits et du riz "
                         "aux magasins."),
        ("02-gramme", "Pour un objet léger, comme un letchi, on choisit le gramme. Un letchi pèse environ 20 grammes."),
        ("03-kilo", "Pour un objet qu'on porte, comme un sac de riz, on choisit le kilogramme : 5 kilogrammes."),
        ("04-tonne", "Pour un objet très lourd, comme le camion de Tom, on choisit la tonne : 12 tonnes."),
        ("05-question", Q("Avec quelle unité pèse-t-on un camion ?", "la tonne", ["le gramme", "le kilogramme"],
                          "Un camion est très lourd : on le pèse en tonnes.")),
        ("06-piege", "Attention ! Un élève écrit : mon cartable pèse 3 tonnes. 3 tonnes, c'est trois voitures ! "
                     "Il fallait écrire 3 kilogrammes."),
        ("07-question", Q("Un élève dit : ma gomme pèse 1 kilogramme. Qu'aurait-il dû dire ?", "20 grammes",
                          ["20 kilogrammes", "1 tonne"],
                          "Une gomme est légère : environ 20 grammes. 1 kilogramme, c'est une brique de lait !")),
        ("08-defi", "À toi de jouer ! Trouve l'unité. Une banane pèse 150… Tom pèse 80… "
                    "Son camion chargé pèse 20… Mets pause, et cherche !"),
        ("08b-correction", "Correction. La banane : 150 grammes. Tom : 80 kilogrammes. "
                           "Le camion chargé : 20 tonnes."),
        ("09-finale", "Ce que tu as appris. Le gramme pour les objets légers, le kilogramme pour ce qu'on porte, "
                      "la tonne pour les très lourds."),
    ], [
        ("00-accroche", "Salut ! Mon copain écrit la liste des courses : 2 tonnes de bananes !"),
        ("01-camion", "Le camion de livraison arrive… et il bouche toute la rue !"),
        ("02-question", Q("Il voulait écrire…", "2 kilogrammes", ["2 grammes", "2 tonnes"],
                          "2 kilogrammes de bananes, ça tient dans un sac. 2 tonnes, il faut un camion !")),
        ("03-fin", "Bon… on va faire beaucoup de gâteaux à la banane !"),
        ("04-commentaire", "À toi : combien pèse un melon, à ton avis, en grammes ? Réponds en commentaire !"),
    ]),
    ("ce2-masse-estimer", "ce2", "ce2_masse_estimer", "jaune", "jaune", "Sarah, sage-femme", [
        ("00-garde", "Estimer une masse. Un bébé qui vient de naître pèse-t-il 3 grammes, 3 kilogrammes, "
                     "ou 30 kilogrammes ?"),
        ("01-situation", "Voici Sarah. Elle est sage-femme. Elle aide les bébés à naître. "
                         "Puis elle les pèse sur une petite balance."),
        ("02-reperes", "Trois repères. 1 gramme : un trombone. 1 kilogramme : une brique de lait. "
                       "1 tonne : une petite voiture."),
        ("03-bebe", "Un bébé qui vient de naître, c'est environ trois briques de lait : 3 kilogrammes. "
                    "Un élève de CE2 pèse environ 25 kilogrammes."),
        ("04-question", Q("Environ combien pèse un élève de CE2 ?", "25 kilogrammes",
                          ["25 grammes", "250 kilogrammes"],
                          "Un élève de CE2 pèse environ 25 kilogrammes. 250 kilogrammes, c'est un piano !")),
        ("05-mangue", "Une mangue est plus légère qu'une brique de lait : environ 400 grammes."),
        ("06-question", Q("Au marché, 5 mangues pèsent environ 2 kilogrammes. Combien pèse une mangue ?",
                          "environ 400 grammes", ["environ 2 kilogrammes", "environ 40 grammes"],
                          "2 kilogrammes, c'est 2 000 grammes. Partagés en 5 : environ 400 grammes par mangue.")),
        ("07-defi", "À toi de jouer ! Une pomme, un vélo, une voiture. 150 grammes, 12 kilogrammes, 1 tonne. "
                    "Qui pèse quoi ? Mets pause, et cherche !"),
        ("07b-correction", "Correction. La pomme : 150 grammes. Le vélo : 12 kilogrammes. La voiture : 1 tonne."),
        ("08-finale", "Ce que tu as appris. Pour estimer, on compare à un repère : le trombone, "
                      "la brique de lait, la voiture."),
    ], [
        ("00-accroche", "Salut ! Ma copine dit que mon chat pèse 400 kilogrammes !"),
        ("01-ours", "400 kilogrammes ? C'est la masse d'un ours !"),
        ("02-question", Q("Un chat pèse environ…", "4 kilogrammes", ["400 kilogrammes", "4 grammes"],
                          "Un chat pèse environ 4 kilogrammes : quatre briques de lait.")),
        ("03-fin", "Mon chat est vexé… il part bouder sur le canapé."),
        ("04-commentaire", "À toi : combien pèse un chien, à ton avis, en kilogrammes ? Réponds en commentaire !"),
    ]),
    ("ce2-masse-probleme", "ce2", "ce2_masse_probleme", "jaune", "jaune",
     "Adam, agent d'enregistrement à l'aéroport", [
        ("00-garde", "Problèmes de masses. Une valise peut peser 23 kilogrammes au plus. Celle-ci passe-t-elle ?"),
        ("01-situation", "Voici Adam. Il travaille à l'aéroport, au comptoir d'enregistrement. "
                         "Il pèse chaque valise : 23 kilogrammes au plus !"),
        ("02-ajouter", "La valise de Lou pèse 18 kilogrammes. Elle ajoute un sac de 3 kilogrammes. "
                       "18 plus 3 : 21 kilogrammes. C'est moins que 23 : la valise passe !"),
        ("03-enlever", "La valise de Max pèse 25 kilogrammes. Il doit enlever 25 moins 23 : 2 kilogrammes."),
        ("04-question", Q("Un sac : 2 kilogrammes de livres et 750 grammes de jouets. Combien de grammes en tout ?",
                          "2 750 grammes", ["752 grammes", "950 grammes"],
                          "2 kilogrammes, c'est 2 000 grammes. 2 000 plus 750 : 2 750 grammes.")),
        ("05-plein-vide", "Une boîte vide pèse 300 grammes. Pleine de billes : 1 kilogramme 200 grammes, "
                          "soit 1 200 grammes. Les billes : 1 200 moins 300, 900 grammes."),
        ("06-question", Q("Un paquet est en équilibre avec 500 grammes et deux masses de 200 grammes. "
                          "Combien pèse-t-il ?", "900 grammes", ["700 grammes", "520 grammes"],
                          "500 plus 200 plus 200 : 900 grammes. On compte bien les deux masses de 200 !")),
        ("07-defi", "À toi de jouer ! La valise de Nina pèse 20 kilogrammes. Elle y met 4 paquets de "
                    "500 grammes, puis un sac de 2 kilogrammes. Passe-t-elle ? Mets pause, et cherche !"),
        ("07b-correction", "Correction. 4 paquets de 500 grammes : 2 000 grammes, soit 2 kilogrammes. "
                           "20 plus 2 plus 2 : 24 kilogrammes. C'est plus que 23 : la valise ne passe pas !"),
        ("08-finale", "Ce que tu as appris. Pour un problème de masses, on met tout dans la même unité, "
                      "on calcule, puis on vérifie."),
    ], [
        ("00-accroche", "Salut ! Ma copine part en vacances. Sa valise pèse 24 kilogrammes. "
                        "Mais c'est 23 kilogrammes au plus !"),
        ("01-chaussettes", "Elle enlève… une paire de chaussettes. 100 grammes."),
        ("02-question", Q("Combien doit-elle enlever, au moins ?", "1 kilogramme",
                          ["100 grammes", "24 kilogrammes"],
                          "24 moins 23 : il faut enlever 1 kilogramme. Les chaussettes ne suffisent pas !")),
        ("03-fin", "Elle enlève son gros livre de 1 kilogramme… et ça passe !"),
        ("04-commentaire", "À toi : une valise de 27 kilogrammes, 23 au plus. Combien de kilogrammes enlever ? "
                           "Réponds en commentaire !"),
    ]),
    ("ce2-masse-defi", "ce2", "ce2_masse_defi", "orange", "jaune", "Louise, savonnière", [
        ("00-garde", "Le défi des masses. La balance est en équilibre : combien pèse le savon ?"),
        ("01-situation", "Voici Louise. Elle fabrique des savons. Chaque savon doit peser 100 grammes, "
                         "pour être vendu au bon prix."),
        ("02-equilibre", "Louise pose un gros pain de savon sur la balance. De l'autre côté : une masse de "
                         "500 grammes, et deux de 200 grammes. Équilibre !"),
        ("03-somme", "Le pain de savon pèse 500 plus 200 plus 200 : 900 grammes."),
        ("04-question", Q("Louise coupe ce pain de 900 grammes en savons de 100 grammes. Combien de savons ?",
                          "9", ["90", "10"], "9 fois 100 grammes : 900 grammes. Louise fait 9 savons.")),
        ("05-boite", "Louise met 10 savons dans une boîte de 200 grammes. 10 savons : 1 000 grammes. "
                     "Avec la boîte : 1 200 grammes, soit 1 kilogramme 200 grammes."),
        ("06-question", Q("Trois élèves pèsent cette boîte. Léa écrit 1 kilogramme 200 grammes, Kevin "
                          "1 200 grammes, Malia 1 020 grammes. Qui a raison ?", "Léa et Kevin",
                          ["Malia", "Léa seulement"],
                          "1 kilogramme 200 grammes, c'est 1 200 grammes : Léa et Kevin ont raison.")),
        ("07-defi", "À toi de jouer ! Une boîte vide pèse 300 grammes. Pleine de savons de 100 grammes, "
                    "elle pèse 1 kilogramme 500 grammes. Combien de savons ? Mets pause, et cherche !"),
        ("07b-correction", "Correction. 1 kilogramme 500 grammes, c'est 1 500 grammes. Moins la boîte : "
                           "1 500 moins 300, 1 200 grammes de savons. 1 200, c'est 12 fois 100 : 12 savons."),
        ("08-finale", "Ce que tu as appris. Sur une balance en équilibre, on additionne les masses. "
                      "Et on met tout en grammes avant de calculer."),
    ], [
        ("00-accroche", "Salut ! Sur la balance, mon ananas fait équilibre avec trois mangues pareilles. "
                        "Une mangue pèse 400 grammes."),
        ("01-reflexion", "Mon copain se gratte la tête…"),
        ("02-question", Q("Combien pèse l'ananas ?", "1 200 grammes", ["400 grammes", "1 kilogramme"],
                          "3 mangues de 400 grammes : 400, 800, 1 200. L'ananas pèse 1 200 grammes.")),
        ("03-fin", "Soit 1 kilogramme 200 grammes de jus d'ananas. Miam !"),
        ("04-commentaire", "À toi : 4 bananes de 150 grammes font équilibre avec une papaye. "
                           "Combien pèse la papaye ? Réponds en commentaire !"),
    ]),
    # ─────────────────────────────── CM1 (notion masse) ───────────────────────────────
    ("cm1-masse-comparer", "cm1", "masse_comparer", "jaune", "blanche", "Ilyes, jockey", [
        ("00-garde", "Comparer des masses. 2 kilogrammes 50 grammes, ou 2 500 grammes : "
                     "qu'est-ce qui est le plus lourd ?"),
        ("01-situation", "Voici Ilyes. Il est jockey : il monte des chevaux de course. Avant chaque course, "
                         "on le pèse avec sa selle. Il ne doit pas être trop lourd."),
        ("02-signes", "Pour comparer, on utilise des signes. 54 kilogrammes est plus petit que 56 kilogrammes."),
        ("03-convertir", "La selle d'Ilyes pèse 2 kilogrammes 50 grammes. Celle de son ami, 2 500 grammes. "
                         "On met tout en grammes : 2 050 grammes. 2 050 est plus petit que 2 500. "
                         "La selle de l'ami est la plus lourde."),
        ("04-question", Q("Qu'est-ce qui est le plus lourd : 3 kilogrammes, ou 2 900 grammes ?", "3 kilogrammes",
                          ["2 900 grammes", "c'est pareil"],
                          "3 kilogrammes, c'est 3 000 grammes. 3 000 est plus grand que 2 900.")),
        ("05-tonne", "Et les très lourds ? Le camion des chevaux pèse 3 tonnes 500 kilogrammes, "
                     "soit 3 500 kilogrammes. C'est plus que 3 tonnes : 3 000 kilogrammes."),
        ("06-question", Q("La plus légère : 1 kilogramme 200 grammes, 1 020 grammes, "
                          "ou 1 kilogramme 2 grammes ?", "1 kilogramme 2 grammes",
                          ["1 020 grammes", "1 kilogramme 200 grammes"],
                          "En grammes : 1 200, 1 020 et 1 002. La plus petite : 1 002 grammes.")),
        ("07-defi", "À toi de jouer ! Trois jockeys avec leur selle. Ilyes : 57 kilogrammes 300 grammes. "
                    "Jules : 57 030 grammes. Inaya : 57 kilogrammes 3 grammes. "
                    "Range-les du plus léger au plus lourd. Mets pause, et cherche !"),
        ("07b-correction", "Correction. En grammes : Ilyes, 57 300. Jules, 57 030. Inaya, 57 003. "
                           "Du plus léger au plus lourd : Inaya, Jules, puis Ilyes."),
        ("08-finale", "Ce que tu as appris. Pour comparer des masses, on met d'abord la même unité. "
                      "Puis on compare les nombres, chiffre par chiffre."),
    ], [
        ("00-accroche", "Salut ! Mon copain se vante : mon cartable pèse 3 500 grammes, le tien seulement "
                        "4 kilogrammes ! 3 500, c'est bien plus que 4 !"),
        ("01-doute", "Hum… il n'a pas la même unité."),
        ("02-question", Q("Quel cartable est le plus lourd ?", "celui de 4 kilogrammes",
                          ["celui de 3 500 grammes", "ils pèsent pareil"],
                          "4 kilogrammes, c'est 4 000 grammes. 4 000 est plus grand que 3 500.")),
        ("03-fin", "D'abord la même unité ! Bon… mon cartable est vraiment lourd."),
        ("04-commentaire", "À toi : qui est le plus lourd, 2 tonnes ou 1 900 kilogrammes ? "
                           "Réponds en commentaire !"),
    ]),
    ("cm1-masse-mesurer", "cm1", "masse_mesurer", "jaune", "blanche", "Kenza, herboriste", [
        ("00-garde", "Lire une masse. Où pointe l'aiguille de la balance ?"),
        ("01-situation", "Voici Kenza. Elle est herboriste : elle vend des plantes pour les tisanes. "
                         "Elle les pèse sur une balance à aiguille."),
        ("02-graduation", "D'abord, on lit la graduation. Les nombres vont de 100 en 100 grammes. "
                          "Entre deux nombres, 5 intervalles : chacun vaut 20 grammes."),
        ("03-lire", "L'aiguille s'arrête 3 petits traits après 400. 400 plus 3 fois 20 : 460 grammes."),
        ("04-question", Q("Les nombres vont de 100 en 100 grammes. L'aiguille est pile au milieu de 500 et 600. "
                          "Quelle masse ?", "550 grammes", ["505 grammes", "600 grammes"],
                          "Au milieu de 500 et 600, c'est 550 grammes.")),
        ("05-masses", "Sur une balance à plateaux, on additionne les masses marquées. Kenza équilibre son sac "
                      "avec 500 grammes, 200 grammes et 50 grammes : 750 grammes."),
        ("06-question", Q("Pour équilibrer un paquet, il faut 2 kilogrammes, 200 grammes et 100 grammes. "
                          "Quelle masse ?", "2 300 grammes", ["302 grammes", "2 030 grammes"],
                          "2 kilogrammes, c'est 2 000 grammes. 2 000 plus 200 plus 100 : 2 300 grammes.")),
        ("07-defi", "À toi de jouer ! Sur le pèse-personne, les nombres vont de 10 en 10 kilogrammes. "
                    "Entre deux nombres, 10 petits traits. L'aiguille est 4 traits après 30. Quelle masse ? "
                    "Mets pause, et cherche !"),
        ("07b-correction", "Correction. 10 petits traits pour 10 kilogrammes : chaque trait vaut 1 kilogramme. "
                           "4 traits après 30 : 34 kilogrammes."),
        ("08-finale", "Ce que tu as appris. Pour lire une balance, on cherche d'abord ce que vaut un petit trait. "
                      "Sur une balance à plateaux, on additionne les masses marquées."),
    ], [
        ("00-accroche", "Salut ! Je pèse ma pastèque. L'aiguille s'arrête entre 2 et 3 kilogrammes, pile au milieu."),
        ("01-oups", "Mon copain lit le nombre le plus proche : 3 kilogrammes !"),
        ("02-question", Q("Combien pèse la pastèque ?", "2 kilogrammes 500 grammes",
                          ["2 kilogrammes 300 grammes", "3 kilogrammes"],
                          "Au milieu de 2 et 3 kilogrammes : 2 kilogrammes 500 grammes, soit 2 500 grammes.")),
        ("03-fin", "Bien lu ! Et maintenant… on la mange !"),
        ("04-commentaire", "À toi : l'aiguille est au milieu de 1 et 2 kilogrammes. Combien de grammes ? "
                           "Réponds en commentaire !"),
    ]),
    ("cm1-masse-convertir", "cm1", "masse_convertir", "verte", "blanche", "Margaux, diététicienne", [
        ("00-garde", "Convertir des masses. 2 kilogrammes, c'est combien de grammes ? "
                     "Et 3 000 kilogrammes, combien de tonnes ?"),
        ("01-situation", "Voici Margaux. Elle est diététicienne : elle aide les gens à bien manger. "
                         "Elle prépare les menus d'une cantine, avec les bonnes quantités."),
        ("02-multiplier", "1 kilogramme, c'est 1 000 grammes. Des kilogrammes aux grammes, on multiplie par 1 000. "
                          "2 kilogrammes de pâtes : 2 fois 1 000, 2 000 grammes."),
        ("03-diviser", "Dans l'autre sens, on divise par 1 000. 5 000 grammes de riz : "
                       "5 000 divisé par 1 000, 5 kilogrammes."),
        ("04-question", Q("Combien de grammes dans 3 kilogrammes ?", "3 000 grammes",
                          ["300 grammes", "30 grammes"], "3 fois 1 000 : 3 000 grammes.")),
        ("05-tonne", "Pour la tonne, c'est pareil avec les kilogrammes. 1 tonne, c'est 1 000 kilogrammes. "
                     "La cantine reçoit 2 tonnes de légumes par an : 2 000 kilogrammes."),
        ("06-tableau", "Le tableau aide aussi : tonne, kilogramme, hectogramme, décagramme, gramme. "
                       "1 kilogramme : un 1 sous les k g, puis un zéro par colonne jusqu'aux g. 1 000 grammes."),
        ("07-question", Q("Un élève écrit : 4 000 grammes, c'est 40 kilogrammes. A-t-il raison ?",
                          "non, c'est 4 kilogrammes", ["oui", "non, c'est 400 kilogrammes"],
                          "Des grammes aux kilogrammes, on divise par 1 000. "
                          "4 000 divisé par 1 000 : 4 kilogrammes.")),
        ("08-defi", "À toi de jouer ! Margaux prévoit 120 grammes de poisson par élève. Il y a 50 élèves. "
                    "Combien de kilogrammes commander ? Mets pause, et cherche !"),
        ("08b-correction", "Correction. 120 fois 50 : 6 000 grammes. 6 000 divisé par 1 000 : 6 kilogrammes."),
        ("09-finale", "Ce que tu as appris. Des kilogrammes aux grammes, on multiplie par 1 000. "
                      "Des grammes aux kilogrammes, on divise par 1 000. Pareil entre tonnes et kilogrammes."),
    ], [
        ("00-accroche", "Salut ! Mon copain a 3 kilogrammes de pommes. Il veut des sachets de 500 grammes. "
                        "Il calcule : 3 divisé par 500… zéro sachet !"),
        ("01-oups", "Zéro ? Mais les pommes sont là !"),
        ("02-question", Q("Combien de sachets de 500 grammes ?", "6", ["0", "15"],
                          "3 kilogrammes, c'est 3 000 grammes. 3 000, c'est 6 fois 500 : 6 sachets.")),
        ("03-fin", "La même unité d'abord ! Et maintenant… compote pour tout le monde !"),
        ("04-commentaire", "À toi : combien de grammes dans 7 kilogrammes ? Réponds en commentaire !"),
    ]),
    ("cm1-masse-estimer", "cm1", "masse_estimer", "jaune", "blanche", "Enzo, ornithologue", [
        ("00-garde", "Estimer une masse. Un colibri pèse-t-il 3 grammes, 3 kilogrammes, ou 3 tonnes ?"),
        ("01-situation", "Voici Enzo. Il est ornithologue : il étudie les oiseaux. "
                         "Il les pèse doucement, puis il les relâche."),
        ("02-unite", "D'abord, la bonne unité. Un colibri : quelques grammes. Un aigle : quelques kilogrammes. "
                     "Un avion : des tonnes."),
        ("03-repere", "Puis un repère. 1 gramme, c'est un trombone : le colibri pèse environ 3 grammes. "
                      "1 kilogramme, c'est une brique de lait : un aigle pèse environ 5 kilogrammes."),
        ("04-question", Q("Environ combien pèse un œuf de poule ?", "60 grammes", ["6 grammes", "600 grammes"],
                          "Un œuf pèse environ 60 grammes. 600 grammes, c'est plus qu'une demi-brique de lait !")),
        ("05-piege", "Attention à l'unité ! Un élève écrit : un éléphant pèse 5 kilogrammes. "
                     "5 kilogrammes, c'est un chat ! L'éléphant pèse environ 5 tonnes."),
        ("06-question", Q("Quelle unité choisir pour la masse d'un éléphant ?", "la tonne",
                          ["le gramme", "le litre"],
                          "Un éléphant pèse environ 5 tonnes : la tonne est l'unité adaptée.")),
        ("07-defi", "À toi de jouer ! Un moineau, un chien, une baleine. 30 grammes, 30 kilogrammes, 30 tonnes. "
                    "Qui pèse quoi ? Mets pause, et cherche !"),
        ("07b-correction", "Correction. Le moineau : 30 grammes. Le chien : 30 kilogrammes. "
                           "La baleine : 30 tonnes."),
        ("08-finale", "Ce que tu as appris. Pour estimer une masse, on choisit l'unité, "
                      "puis on compare à un repère connu."),
    ], [
        ("00-accroche", "Salut ! Mon copain pèse une plume d'oiseau. La balance affiche… zéro !"),
        ("01-surprise", "Zéro ? La plume a pourtant une masse !"),
        ("02-question", Q("Une plume pèse…", "moins de 1 gramme", ["environ 1 kilogramme", "environ 100 grammes"],
                          "Une plume pèse moins de 1 gramme : moins qu'un trombone !")),
        ("03-fin", "Il en pose 1 000… et la balance bouge enfin !"),
        ("04-commentaire", "À toi : combien pèse un œuf, à ton avis, en grammes ? Réponds en commentaire !"),
    ]),
    ("cm1-masse-defi", "cm1", "masse_defi", "bleue", "blanche", "Alice, cheffe de chantier", [
        ("00-garde", "Le défi des masses. Le monte-charge porte 1 tonne au plus. Combien de sacs de ciment ?"),
        ("01-situation", "Voici Alice. Elle est cheffe de chantier. Elle fait monter les sacs de ciment "
                         "au troisième étage, avec un monte-charge."),
        ("02-limite", "Le monte-charge porte au plus 1 tonne, c'est-à-dire 1 000 kilogrammes. "
                      "Un sac de ciment pèse 25 kilogrammes."),
        ("03-diviser", "1 000 divisé par 25 : 40. Le monte-charge peut monter 40 sacs à la fois."),
        ("04-question", Q("Alice charge 30 sacs de 25 kilogrammes. Quelle masse ?", "750 kilogrammes",
                          ["55 kilogrammes", "7 500 kilogrammes"],
                          "30 fois 25 : 750 kilogrammes. C'est moins que 1 tonne : ça passe.")),
        ("05-etapes", "Alice ajoute un ouvrier de 80 kilogrammes et sa brouette de 20 kilogrammes. "
                      "750 plus 80 plus 20 : 850 kilogrammes. Toujours moins de 1 000 !"),
        ("06-question", Q("Peut-elle encore ajouter 8 sacs de 25 kilogrammes ?", "non, 1 050 kilogrammes, c'est trop",
                          ["oui, 1 000 kilogrammes tout juste", "oui, 858 kilogrammes"],
                          "8 fois 25 : 200 kilogrammes. 850 plus 200 : 1 050 kilogrammes, plus que 1 tonne. Non !")),
        ("07-defi", "À toi de jouer ! Il faut monter 3 tonnes de carrelage, en paquets de 20 kilogrammes. "
                    "Le monte-charge porte 1 tonne. Combien de paquets, et combien de voyages ? "
                    "Mets pause, et cherche !"),
        ("07b-correction", "Correction. 3 tonnes, c'est 3 000 kilogrammes. 3 000 divisé par 20 : 150 paquets. "
                           "1 tonne par voyage : 3 voyages de 50 paquets."),
        ("08-finale", "Ce que tu as appris. Dans un défi à étapes, on convertit d'abord, "
                      "on calcule étape par étape, puis on vérifie."),
    ], [
        ("00-accroche", "Salut ! Avec mes copains, on prend l'ascenseur. Il porte 300 kilogrammes au plus. "
                        "Nous : 40, 45 et 35 kilogrammes."),
        ("01-piano", "Ma copine dit : on monte aussi le piano, il pèse 200 kilogrammes !"),
        ("02-question", Q("Peut-on monter avec le piano ?", "non, 320 kilogrammes, c'est trop",
                          ["oui, 300 kilogrammes tout juste", "oui, il reste de la place"],
                          "40 plus 45 plus 35 : 120 kilogrammes. Plus 200 : 320, c'est plus que 300 !")),
        ("03-fin", "Le piano prend l'ascenseur tout seul… et nous, l'escalier !"),
        ("04-commentaire", "À toi : combien de kilogrammes en trop, avec le piano ? Réponds en commentaire !"),
    ]),
    # ─────────────────────────────── CM2 (notion masse) ───────────────────────────────
    ("cm2-masse-comparer", "cm2", "masse_comparer", "jaune", "blanche", "Théa, ingénieure en aéronautique", [
        ("00-garde", "Comparer des masses. 1,25 kilogramme, ou 1 200 grammes : qu'est-ce qui est le plus lourd ?"),
        ("01-situation", "Voici Théa. Elle est ingénieure en aéronautique. Dans un avion, chaque gramme compte : "
                         "plus il est lourd, plus il consomme de carburant."),
        ("02-convertir", "Une pièce pèse 1,25 kilogramme. Une autre, 1 200 grammes. On met la même unité : "
                         "1,25 kilogramme, c'est 1 250 grammes. 1 250 est plus grand que 1 200."),
        ("03-virgule", "Le piège de la virgule : 1,5 kilogramme ou 1,25 kilogramme ? On écrit 1,50 et 1,25. "
                       "50 centièmes, c'est plus que 25 centièmes : 1,5 kilogramme est le plus lourd."),
        ("04-question", Q("1,5 kilogramme ou 1 500 grammes : lequel est le plus lourd ?", "c'est pareil",
                          ["1,5 kilogramme", "1 500 grammes"],
                          "1,5 kilogramme, c'est 1 500 grammes : même masse.")),
        ("05-tonne", "Avec les tonnes : l'avion vide pèse 42 tonnes. On ajoute 8 500 kilogrammes de bagages "
                     "et de carburant, soit 8,5 tonnes. 42 plus 8,5 : 50,5 tonnes."),
        ("06-question", Q("La plus légère : 2,3 tonnes, 2 350 kilogrammes, ou 2,08 tonnes ?", "2,08 tonnes",
                          ["2,3 tonnes", "2 350 kilogrammes"],
                          "En kilogrammes : 2 300, 2 350 et 2 080. La plus légère : 2,08 tonnes.")),
        ("07-defi", "À toi de jouer ! Trois bagages : 23,5 kilogrammes, 23 050 grammes, et 23,45 kilogrammes. "
                    "Range-les du plus léger au plus lourd. Mets pause, et cherche !"),
        ("07b-correction", "Correction. En grammes : 23 500, 23 050 et 23 450. Du plus léger au plus lourd : "
                           "23 050 grammes, 23,45 kilogrammes, puis 23,5 kilogrammes."),
        ("08-finale", "Ce que tu as appris. Pour comparer, on met la même unité, la virgule bien placée. "
                      "Puis on compare chiffre par chiffre."),
    ], [
        ("00-accroche", "Salut ! Ma copine a un melon de 1,5 kilogramme. Moi, un de 1,25 kilogramme. "
                        "25, c'est plus que 5 : j'ai le plus gros !"),
        ("01-balance", "On pose les deux melons sur la balance…"),
        ("02-question", Q("Quel melon est le plus lourd ?", "celui de 1,5 kilogramme",
                          ["celui de 1,25 kilogramme", "ils pèsent pareil"],
                          "1,5 kilogramme, c'est 1 500 grammes. 1,25 kilogramme, 1 250 grammes. 1 500 gagne !")),
        ("03-fin", "Bon… je lui échange contre une mangue ?"),
        ("04-commentaire", "À toi : qui est le plus lourd, 2,8 kilogrammes ou 2 750 grammes ? "
                           "Réponds en commentaire !"),
    ]),
    ("cm2-masse-convertir", "cm2", "masse_convertir", "verte", "blanche", "Mathis, maréchal-ferrant", [
        ("00-garde", "Convertir des masses. 0,75 kilogramme, c'est combien de grammes ?"),
        ("01-situation", "Voici Mathis. Il est maréchal-ferrant : il fabrique et pose les fers des chevaux. "
                         "Un fer pèse 0,75 kilogramme."),
        ("02-tableau", "Le tableau des unités : kilogramme, hectogramme, décagramme, gramme. "
                       "Chaque colonne vaut 10 fois celle de droite. Du kilogramme au gramme : on multiplie par 1 000."),
        ("03-placer", "0,75 kilogramme dans le tableau. Le 0 sous les k g, le 7 sous les h g. "
                      "Le 5 sous les d a g, un zéro sous les g. On lit : 750 grammes."),
        ("04-question", Q("1,2 kilogramme, c'est combien de grammes ?", "1 200 grammes",
                          ["120 grammes", "1 002 grammes"],
                          "1,2 fois 1 000 : 1 200 grammes. Les chiffres avancent de 3 rangs, pas de 1 !")),
        ("05-diviser", "Dans l'autre sens, on divise par 1 000. 4 fers : 4 fois 750, 3 000 grammes. "
                       "3 000 divisé par 1 000 : 3 kilogrammes."),
        ("06-question", Q("Un élève écrit : 250 grammes, c'est 2,5 kilogrammes. A-t-il raison ?",
                          "non, c'est 0,25 kilogramme", ["oui", "non, c'est 25 kilogrammes"],
                          "Des grammes aux kilogrammes, on divise par 1 000. 250 divisé par 1 000 : 0,25 kilogramme.")),
        ("07-mg", "Et les toutes petites masses ? Le comprimé du cheval pèse 500 milligrammes. "
                  "1 gramme, c'est 1 000 milligrammes : 500 milligrammes, c'est 0,5 gramme."),
        ("08-defi", "À toi de jouer ! Mathis commande 24 fers de 750 grammes. Combien de kilogrammes en tout ? "
                    "Mets pause, et cherche !"),
        ("08b-correction", "Correction. 24 fois 750 : 18 000 grammes. 18 000 divisé par 1 000 : 18 kilogrammes."),
        ("09-finale", "Ce que tu as appris. Du kilogramme au gramme, on multiplie par 1 000. "
                      "Du gramme au kilogramme, on divise par 1 000. Le tableau place la virgule."),
    ], [
        ("00-accroche", "Salut ! La recette du gâteau dit : 0,5 kilogramme de farine. "
                        "Mon copain verse… 5 grammes !"),
        ("01-oups", "5 grammes ? Une pincée !"),
        ("02-question", Q("0,5 kilogramme, c'est…", "500 grammes", ["5 grammes", "50 grammes"],
                          "0,5 fois 1 000 : 500 grammes. La moitié d'un kilogramme !")),
        ("03-fin", "Avec 5 grammes, on aurait fait un gâteau… pour une fourmi !"),
        ("04-commentaire", "À toi : 1,75 kilogramme, c'est combien de grammes ? Réponds en commentaire !"),
    ]),
    ("cm2-masse-estimer", "cm2", "masse_estimer", "jaune", "blanche", "Juliette, océanographe", [
        ("00-garde", "Estimer une masse. Une baleine bleue pèse-t-elle 150 kilogrammes, ou 150 tonnes ?"),
        ("01-situation", "Voici Juliette. Elle est océanographe : elle étudie la mer et ses animaux. "
                         "Elle estime la masse des baleines, sans pouvoir les peser !"),
        ("02-baleine", "Une baleine bleue pèse environ 150 tonnes, soit 150 000 kilogrammes : "
                       "autant qu'environ 150 voitures !"),
        ("03-reperes", "Pour estimer, on prend un repère. Un poisson de 1,2 kilogramme : un peu plus "
                       "qu'une brique de lait. Une tortue de mer de 150 kilogrammes : comme deux adultes."),
        ("04-question", Q("La masse la plus vraisemblable d'un dauphin ?", "200 kilogrammes",
                          ["2 kilogrammes", "20 tonnes"],
                          "Un dauphin pèse environ 200 kilogrammes : moins qu'une voiture, plus que deux adultes.")),
        ("05-piege", "Attention à l'unité et à la virgule ! Un crabe pèse 0,5 kilogramme, pas 0,5 tonne. "
                     "0,5 tonne, c'est 500 kilogrammes !"),
        ("06-question", Q("Un élève écrit : mon cartable pèse 4 500 kilogrammes. Que voulait-il écrire ?",
                          "4 500 grammes", ["45 kilogrammes", "4,5 tonnes"],
                          "4 500 grammes, c'est 4,5 kilogrammes : un vrai cartable. "
                          "4 500 kilogrammes, c'est un camion !")),
        ("07-defi", "À toi de jouer ! Une crevette, un requin, une orque. 8 grammes, 300 kilogrammes, 5 tonnes. "
                    "Qui pèse quoi ? Mets pause, et cherche !"),
        ("07b-correction", "Correction. La crevette : 8 grammes. Le requin : 300 kilogrammes. L'orque : 5 tonnes."),
        ("08-finale", "Ce que tu as appris. Pour estimer, on choisit l'unité adaptée et on compare à un repère. "
                      "Attention à la virgule !"),
    ], [
        ("00-accroche", "Salut ! Mon copain dit qu'un grain de riz pèse 1 gramme. Alors un paquet de 1 kilogramme, "
                        "c'est 1 000 grains ?"),
        ("01-compter", "On compte… 1 000, 10 000, 30 000… il en reste encore !"),
        ("02-question", Q("Un grain de riz pèse environ…", "0,02 gramme", ["1 gramme", "2 grammes"],
                          "Il faut environ 50 grains pour 1 gramme. Un grain pèse environ 0,02 gramme.")),
        ("03-fin", "Bon… on arrête de compter, et on fait cuire le riz !"),
        ("04-commentaire", "À toi : environ combien de grains dans un paquet de 1 kilogramme ? "
                           "Réponds en commentaire !"),
    ]),
    ("cm2-masse-defi", "cm2", "masse_defi", "bleue", "blanche", "Hamza, pilote de montgolfière", [
        ("00-garde", "Le défi des masses. La nacelle porte au plus 450 kilogrammes. Combien de passagers ?"),
        ("01-situation", "Voici Hamza. Il est pilote de montgolfière. Avant chaque vol, il additionne toutes "
                         "les masses : rien ne doit dépasser 450 kilogrammes."),
        ("02-pilote-gaz", "Hamza pèse 78,5 kilogrammes. Les bouteilles de gaz : 3 fois 22, 66 kilogrammes. "
                          "78,5 plus 66 : 144,5 kilogrammes."),
        ("03-reste", "Il reste 450 moins 144,5 : 305,5 kilogrammes pour les passagers."),
        ("04-question", Q("Un passager pèse 72 kilogrammes, avec un sac de 3 500 grammes. Quelle masse en tout ?",
                          "75,5 kilogrammes", ["3 572 kilogrammes", "72,35 kilogrammes"],
                          "3 500 grammes, c'est 3,5 kilogrammes. 72 plus 3,5 : 75,5 kilogrammes.")),
        ("05-quatre", "Quatre passagers de 75,5 kilogrammes : 4 fois 75,5, 302 kilogrammes. "
                      "302 est plus petit que 305,5 : ils peuvent monter !"),
        ("06-question", Q("Un cinquième passager de 60 kilogrammes veut monter. Est-ce possible ?",
                          "non, il reste 3,5 kilogrammes", ["oui, il reste 60 kilogrammes",
                                                            "oui, 450 kilogrammes tout juste"],
                          "305,5 moins 302 : il reste 3,5 kilogrammes. 60, c'est bien trop !")),
        ("07-defi", "À toi de jouer ! Une autre nacelle porte 0,5 tonne. Le pilote pèse 80 kilogrammes, "
                    "le gaz 70 kilogrammes. Combien de passagers de 75 kilogrammes, au plus ? "
                    "Mets pause, et cherche !"),
        ("07b-correction", "Correction. 0,5 tonne, c'est 500 kilogrammes. 500 moins 80 moins 70 : 350. "
                           "4 passagers : 300 kilogrammes. 5 passagers : 375, trop. Au plus 4 passagers."),
        ("08-finale", "Ce que tu as appris. Dans un défi à étapes, on convertit, on calcule chaque étape, "
                      "et on vérifie avec la limite."),
    ], [
        ("00-accroche", "Salut ! On prend le téléphérique. Il porte 0,4 tonne. Nous sommes 5 enfants "
                        "de 35 kilogrammes, avec un moniteur de 85 kilogrammes."),
        ("01-calcul", "Ma copine sort sa calculatrice…"),
        ("02-question", Q("Combien de kilogrammes reste-t-il ?", "140 kilogrammes",
                          ["3,4 kilogrammes", "260 kilogrammes"],
                          "0,4 tonne, c'est 400 kilogrammes. 5 fois 35, plus 85 : 260. 400 moins 260 : 140.")),
        ("03-fin", "Il reste de la place… pour le pique-nique !"),
        ("04-commentaire", "À toi : combien d'enfants de 35 kilogrammes peuvent encore monter ? "
                           "Réponds en commentaire !"),
    ]),
]

SEUIL_MOTS = {"cp": 14, "ce1": 16, "ce2": 18, "cm1": 18, "cm2": 18}  # 16/11 soir : phrases courtes jusqu'au CM2


def tirer_lettres():
    """La place de la bonne réponse de chaque question, dans l'ordre de SERIE (paysage puis short).
    Un tiers de A, de B, de C ; jamais deux fois la même lettre de suite dans une paysage."""
    rng = random.Random(1116)
    nq = sum(1 for e in SERIE for ecrans in (e[6], e[7]) for _, v in ecrans if isinstance(v, dict))
    sac = list("ABC" * (nq // 3 + 1))[:nq]
    rng.shuffle(sac)
    res, i = [], 0
    for e in SERIE:
        for ecrans, paysage in ((e[6], True), (e[7], False)):
            prec = None
            for _, v in ecrans:
                if not isinstance(v, dict):
                    continue
                if paysage and sac[i] == prec:  # échanger avec la prochaine lettre différente
                    j = next(j for j in range(i + 1, len(sac)) if sac[j] != prec)
                    sac[i], sac[j] = sac[j], sac[i]
                prec = sac[i]
                res.append(sac[i])
                i += 1
    return res, random.Random(2027)


def voix_de(ecrans, lettres, rng, short):
    """Les textes de la voix (clé → texte), et la liste des questions (pour le manifeste)."""
    out, qs = {}, []
    for cle, v in ecrans:
        if not isinstance(v, dict):
            out[cle] = v
            continue
        L = lettres.pop(0)
        leurres = v["leurres"][:]
        rng.shuffle(leurres)
        k = "ABC".index(L)
        choix = leurres[:k] + [v["juste"]] + leurres[k:]
        q = v["q"]
        out[cle] = f"Question ! {q} " + " ".join(f"{'ABC'[i]} : {c}." for i, c in enumerate(choix)) + \
                   " Mets pause, et choisis !"
        num = cle.split("-")[0]
        out[f"{num}b-reponse"] = f"Réponse {L}{' !' if short else '.'} {v['expl']}"
        qs.append({"cle": cle, "question": q, "choix": choix, "reponse": k, "explication": v["expl"]})
    n = len(ecrans) if short else len(ecrans)
    dernier = max(int(c.split("-")[0][:2]) for c, _ in ecrans) + 1
    out[f"{dernier:02d}-abonne"] = FIN_S if short else FIN_P
    return out, qs


def phrases_longues(classe, textes):
    s = SEUIL_MOTS.get(classe)
    if not s:
        return []
    res = []
    for cle, t in textes.items():
        if cle.endswith("abonne"):
            continue
        for ph in re.split(r"(?<=[.!?…])\s+", t):
            n = len(re.findall(r"[\wÀ-ÿ'’]+", ph))
            if n > s:
                res.append(f"{cle} ({n} mots) : {ph}")
    return res


def construire():
    lettres, rng = tirer_lettres()
    tout = []
    for (vid, classe, micro, c_p, c_s, metier, ecr_p, ecr_s) in SERIE:
        vp, qp = voix_de(ecr_p, lettres, rng, False)
        vs, qs = voix_de(ecr_s, lettres, rng, True)
        tout.append(dict(id=vid, classe=classe, micro=micro, ceinture=c_p, ceinture_short=c_s, metier=metier,
                         paysage=vp, short=vs, questions=qp, questions_short=qs))
    return tout


def recap(tout):
    from collections import Counter
    cpt = Counter("ABC"[q["reponse"]] for e in tout for q in e["questions"] + e["questions_short"])
    L = ["# Voix de la série MASSES, du CP au CM2 — À VALIDER PAR FRÉDÉRIC (avant tout WAV)",
         "",
         "Session C des séries de mardi-mercredi (`manim/PLAN-mardi-mercredi-17-18-11.md`). "
         "Source : `manim/scripts/ce2/masse_voix.py` (on corrige là, puis `--ecrire`).",
         f"25 paysages + 25 shorts (CM1 masse_mesurer ajoutée le 16/11 ; pas de 6e : aucune notion masse au coach 6e, décision de Frédéric le 16/11). Bonnes réponses tirées au hasard : A {cpt['A']}, B {cpt['B']}, C {cpt['C']} "
         "(jamais deux fois la même lettre de suite dans une paysage).",
         "Shorts : Ti Margo en dessin animé (« mon copain », « ma copine »). Un seul passage à La Réunion : "
         "Malo, pêcheur à Saint-Pierre (CE1).", ""]
    for e in tout:
        L.append(f"## `{e['id']}` — {e['classe'].upper()} · micro `{e['micro']}` · {e['metier']} · "
                 f"paysage ceinture {e['ceinture']}, short ceinture {e['ceinture_short']}")
        L.append("")
        L.append("**Paysage**")
        L.append("")
        for k, t in e["paysage"].items():
            L.append(f"- `{k}` : {t}")
        L.append("")
        L.append("**Short**")
        L.append("")
        for k, t in e["short"].items():
            L.append(f"- `{k}` : {t}")
        longues = phrases_longues(e["classe"], {**e["paysage"], **e["short"]})
        if longues:
            L.append("")
            L.append(f"⚠️ Phrases au-dessus de {SEUIL_MOTS[e['classe']]} mots : " + " ; ".join(longues))
        L.append("")
    return "\n".join(L)


if __name__ == "__main__":
    tout = construire()
    (MANIM / "VOIX-masses-cp-cm2.md").write_text(recap(tout), encoding="utf-8")
    json.dump(tout, open(MANIM / "scripts" / "ce2" / "masse_voix.json", "w", encoding="utf-8"),
              ensure_ascii=False, indent=1)
    print("écrit manim/VOIX-masses-cp-cm2.md et manim/scripts/ce2/masse_voix.json")
    if "--ecrire" in sys.argv:
        force = "--force" in sys.argv
        for e in tout:
            for nom, v in ((e["id"], e["paysage"]), (e["id"] + "-short", e["short"])):
                f = MANIM / "voix" / f"{nom}.json"
                if f.exists() and not force and any((MANIM / "voix" / nom).glob("*.wav")):
                    print("garde (WAV déjà faits)", f.name)
                    continue
                json.dump(v, open(f, "w", encoding="utf-8"), ensure_ascii=False, indent=2)
                print("écrit", f.name)
