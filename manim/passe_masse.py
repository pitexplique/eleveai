# passe_masse.py
# Passe finale de la série MASSES, du CP au CM2 (16/11/2026, session masses), copie de passe_contenance_ce2.py :
# temps des chapitres et des questions relevés dans l'AUDIO des mp4 (passe_relatifs.mesurer), questions lues
# dans les voix validées. Le manifeste a des modifications non commitées d'autres sessions : on relit la copie
# de travail et on ajoute ou remplace SEULEMENT nos entrées (<classe>-masse-<slug>[-short]).
# ⛔ Pas de 6e (Frédéric, 16/11 : « si la 6e n'a pas de masse tu fais pas »).
#
#   python manim/passe_masse.py temps [id]   → manim/sorties/<classe>/maths/masse/temps.json
#   python manim/passe_masse.py voir         → affiche les entrées sans rien écrire
#   python manim/passe_masse.py manifeste    → ajoute ou remplace les entrées
import json
import shutil
import sys
import tempfile
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from passe_relatifs import mesurer, mmss  # noqa: E402
from passe_decimaux import question, chapitres  # noqa: E402

RACINE = Path(__file__).resolve().parents[1]
SORTIES = RACINE / "manim" / "sorties"
VOIX = RACINE / "manim" / "voix"
MANIFESTE = RACINE / "manim" / "manifeste-youtube.json"
NOTION = "masse"
COACH = "https://www.eleveai.fr/coach/serie?classe={classe}&matiere=maths&notion={notion}&microId={micro}&display=simple"
NOM_CEINT = {"blanche": "Ceinture blanche", "jaune": "Ceinture jaune", "orange": "Ceinture orange",
             "verte": "Ceinture verte", "bleue": "Ceinture bleue", "marron": "Ceinture marron", "noire": "Ceinture noire"}
CYCLE = {"cp": "cycle 2", "ce1": "cycle 2", "ce2": "cycle 2", "cm1": "cycle 3", "cm2": "cycle 3"}
NB_EP = {"cp": 4, "ce1": 5, "ce2": 7, "cm1": 5, "cm2": 4}

# Dates : après la dernière de la file (28/04/2027 le 16/11) ; ⛔ 3 shorts par jour au plus, relire la file avant.
EP = [
 dict(classe="ce2", n=3, slug="comparer", micro="ce2_masse_comparer", nom="Comparer des masses", date="2027-04-29",
      ceinture="jaune",
      titre="1 kg ou 900 g : lequel est le plus lourd ?",
      intro="Anaïs est fromagère. Elle coupe des parts de fromage et les pèse. Un client veut le plus gros morceau : 1 kilogramme, ou 900 grammes ?",
      points=["même unité : on compare les nombres (450 g > 300 g)",
              "deux unités : d'abord la même unité, 1 kg = 1 000 g",
              "le piège : 900 est plus grand que 1, mais 1 kg = 1 000 g",
              "1 kg de plumes ou 1 kg de cailloux : la même masse"],
      defi="ranger 2 kg, 1 500 g et 800 g du plus léger au plus lourd.",
      chap={"00-garde": "Le plus lourd ?", "02-meme-unite": "La même unité", "03-convertir": "Deux unités",
            "04-question": "Question 1", "05-piege": "Le piège", "06-question": "Question 2",
            "07-defi": "À toi de jouer", "07b-correction": "Correction", "08-finale": "Ce que tu as appris"},
      tags=["masse", "comparer des masses", "kilogramme", "gramme", "balance", "fromagère", "fromage"],
      centres=["cuisine"],
      aussi=[{"classe": "ce1", "notionId": "masse", "microId": "ce1_masse_comparer"}],
      s_titre="900 g ou 1 kg : 900 est plus grand, donc plus lourd ?", s_ceinture="jaune",
      s_accroche="Ma copine a un fromage de 900 grammes. Moi, un morceau de 1 kilogramme. Elle dit : 900, c'est plus que 1 ! On pose les deux sur la balance…",
      s_toi="qui est le plus lourd, 2 kilogrammes ou 1 800 grammes ?",
      s_tags=["masse", "comparer", "balance", "fromage"], s_centres=["cuisine", "jeux-defis"]),
 dict(classe="cp", n=1, slug="lexique", micro="cp_masse_lexique", notion="masse_contenance", nom="Lourd ou léger",
      date="2027-04-30", ceinture="blanche",
      titre="Carton de livres ou oreiller : lequel est le plus lourd ?",
      intro="Awa est déménageuse. Toute la journée, elle porte des cartons. Certains sont lourds. D'autres sont légers.",
      points=["lourd, léger : un carton de livres, un oreiller",
              "on soupèse : un objet dans chaque main, la main qui descend tient le plus lourd",
              "le piège : gros ne veut pas dire lourd (le ballon de plage, la bille en fer)"],
      defi="trouver le plus léger : un oreiller, un carton de livres, une chaise.",
      chap={"00-garde": "Lourd ou léger ?", "02-lourd-leger": "Lourd, léger", "03-soupeser": "On soupèse",
            "04-question": "Question 1", "05-piege": "Le piège", "06-question": "Question 2",
            "07-defi": "À toi de jouer", "07b-correction": "Correction", "08-finale": "Ce que tu as appris"},
      tags=["masse", "lourd", "léger", "soupeser", "comparer des masses", "déménageuse"],
      centres=["construction"],
      s_titre="Un gros ballon de plage, c'est lourd ?", s_ceinture="blanche",
      s_accroche="Mon copain veut porter le gros ballon de plage. Il prend son élan… et il le soulève d'un doigt !",
      s_toi="une pomme, une plume, une pastèque : range-les du plus léger au plus lourd.",
      s_tags=["masse", "lourd", "léger", "ballon"], s_centres=["sport", "jeux-defis"]),
 dict(classe="cp", n=2, slug="comparer", micro="cp_masse_comparer", notion="masse_contenance", nom="Comparer des masses",
      date="2027-05-01", ceinture="blanche",
      titre="Un melon ou un ananas : lequel est le plus lourd ?",
      intro="Hugo est primeur : il vend des fruits et des légumes. Il a un melon et un ananas. Lequel est le plus lourd ? Il sort sa balance à deux plateaux.",
      points=["la balance à deux plateaux : un objet de chaque côté",
              "le plateau qui descend porte le plus lourd",
              "même niveau : même masse (deux pommes)",
              "deux boîtes pareilles : à l'œil on ne sait pas, la balance le dit"],
      defi="une orange à gauche, un citron à droite, le plateau de droite monte : qui est le plus lourd ?",
      chap={"00-garde": "Le plus lourd ?", "02-balance": "La balance à deux plateaux", "03-regle": "Le plateau qui descend",
            "04-question": "Question 1", "05-equilibre": "Même niveau", "06-question": "Question 2",
            "07-defi": "À toi de jouer", "07b-correction": "Correction", "08-finale": "Ce que tu as appris"},
      tags=["masse", "comparer des masses", "balance", "balance à deux plateaux", "plus lourd", "primeur", "fruits"],
      centres=["cuisine"],
      aussi=[{"classe": "ce1", "notionId": "masse", "microId": "ce1_masse_soupeser"}],
      s_titre="Mon gros doudou monte sur la balance : il est léger ?", s_ceinture="blanche",
      s_accroche="Je mets mon doudou sur la balance. Mon copain met sa petite voiture en fer. Mon doudou monte tout en haut !",
      s_toi="2 pommes sur un plateau. Combien de pommes pareilles de l'autre côté, pour l'équilibre ?",
      s_tags=["masse", "balance", "plus lourd", "doudou"], s_centres=["jeux-defis"]),
 dict(classe="cp", n=3, slug="estimer", micro="cp_masse_contenance_estimer", notion="masse_contenance", nom="Ranger des masses",
      date="2027-05-02", ceinture="blanche",
      titre="Trois chiens : lequel est le plus léger ?",
      intro="Zoé est toiletteuse : elle lave et coiffe les chiens. Aujourd'hui : un chiot, un chien moyen et un gros chien. Comment les ranger du plus léger au plus lourd ?",
      points=["pour ranger, on compare deux par deux",
              "du plus léger au plus lourd : le chiot, le chien moyen, le gros chien",
              "A pèse plus que B, et B plus que C : donc A est la plus lourde",
              "sans balance, on peut deviner : une souris, un chat, un cheval"],
      defi="ranger du plus léger au plus lourd : une pastèque, une fraise, une pomme.",
      chap={"00-garde": "Le plus léger ?", "02-deux-par-deux": "Deux par deux", "03-rang": "Du plus léger au plus lourd",
            "04-question": "Question 1", "05-deviner": "Sans balance, on devine", "06-question": "Question 2",
            "07-defi": "À toi de jouer", "07b-correction": "Correction", "08-finale": "Ce que tu as appris"},
      tags=["masse", "ranger des masses", "plus léger", "plus lourd", "comparer des masses", "toiletteuse", "chiens"],
      centres=["animaux"],
      s_titre="Trois chats sur ma branche : qui monte en premier ?", s_ceinture="blanche",
      s_accroche="Trois chats montent sur ma branche : un chaton, un chat, un gros matou. La branche craque !",
      s_toi="un éléphant, une fourmi, un lapin : range-les du plus léger au plus lourd.",
      s_tags=["masse", "plus léger", "ranger", "chats"], s_centres=["animaux", "jeux-defis"]),
 dict(classe="cp", n=4, slug="defi", micro="cp_masse_contenance_defi", notion="masse_contenance", nom="Le défi des masses",
      date="2027-05-03", ceinture="blanche",
      titre="Trois colis : lequel est le plus lourd ?",
      intro="Noé est livreur à vélo. Il a trois colis : le rouge, le bleu et le vert. Lequel est le plus lourd ? Deux pesées suffisent.",
      points=["première pesée : le rouge descend, il est plus lourd que le bleu",
              "deuxième pesée : le bleu descend, il est plus lourd que le vert",
              "du plus lourd au plus léger : le rouge, le bleu, le vert",
              "la taille ne dit pas la masse : un sac de plumes, un sac de billes"],
      defi="la pomme est plus lourde que la prune, la prune plus lourde que la cerise : quel fruit est le plus léger ?",
      chap={"00-garde": "Le plus lourd ?", "02-pesee1": "Deux pesées", "04-question": "Question 1",
            "05-rang": "Du plus lourd au plus léger", "06-question": "Question 2",
            "07-defi": "À toi de jouer", "07b-correction": "Correction", "08-finale": "Ce que tu as appris"},
      tags=["masse", "défi", "balance", "pesée", "plus lourd", "plus léger", "livreur", "vélo"],
      centres=["transports", "sport"],
      s_titre="Trois cadeaux de la même taille : lequel est le plus lourd ?", s_ceinture="blanche",
      s_accroche="J'ai trois cadeaux de la même taille. Ma copine veut le plus lourd. Deux pesées… et une surprise dedans !",
      s_toi="le chat pèse plus que le lapin, le lapin plus que la souris : qui est le plus léger ?",
      s_tags=["masse", "balance", "cadeau", "plus lourd"], s_centres=["jeux-defis", "animaux"]),
 dict(classe="ce1", n=1, slug="kg-g", micro="ce1_masse_kg_g", nom="Le kilogramme et le gramme",
      date="2027-05-04", ceinture="blanche",
      titre="Un colis, une lettre : kilogramme ou gramme ?",
      intro="Jade est postière. Elle pèse chaque colis et chaque lettre : le prix de l'envoi dépend de la masse. Avec quelle unité ?",
      points=["le kilogramme (kg) pour les objets lourds : le gros colis pèse 3 kg",
              "le gramme (g) pour les objets légers : la lettre pèse 20 g",
              "kilogramme s'écrit kg : le k de kilo, le g de gramme",
              "lire une balance : le paquet pèse 2 kg, la carte postale 5 g"],
      defi="un vélo et une clé : lequel pèse 12 kg, lequel pèse 12 g ?",
      chap={"00-garde": "Kilogramme ou gramme ?", "02-kg": "Le kilogramme", "03-g": "Le gramme",
            "04-question": "Question 1", "05-balance": "Lire la balance", "06-question": "Question 2",
            "07-defi": "À toi de jouer", "07b-correction": "Correction", "08-finale": "Ce que tu as appris"},
      tags=["masse", "kilogramme", "gramme", "kg", "g", "unités de masse", "balance", "postière"],
      centres=["transports", "argent-budget"],
      s_titre="Un chaton de 1 gramme ? Vraiment ?", s_ceinture="blanche",
      s_accroche="Sur l'étiquette du chaton, mon copain écrit : 1 gramme. Mais 1 gramme, c'est la masse d'un trombone !",
      s_toi="un trombone pèse 1 gramme : combien pèsent 10 trombones ?",
      s_tags=["masse", "kilogramme", "gramme", "chaton"], s_centres=["animaux", "jeux-defis"]),
 dict(classe="ce1", n=2, slug="relation", micro="ce1_masse_relation_kg_g", nom="1 kilogramme = 1 000 grammes",
      date="2027-05-05", ceinture="blanche",
      titre="1 kg, c'est combien de grammes ?",
      intro="Liam vend du riz, des lentilles et des graines en vrac. Un client veut 1 kilogramme de lentilles : Liam remplit deux sacs de 500 grammes. Est-ce bien 1 kilogramme ?",
      points=["sur la balance, 1 kg d'un côté et 1 000 g de l'autre : équilibre", "1 kg = 1 000 g",
              "500 g + 500 g = 1 000 g = 1 kg", "4 sacs de 250 g font 1 kg"],
      defi="Liam a 600 g de riz sur la balance : combien de grammes ajouter pour avoir 1 kg ?",
      chap={"00-garde": "1 kg, combien de grammes ?", "02-equilibre": "L'équilibre", "03-deux-sacs": "Deux sacs de 500 g",
            "04-question": "Question 1", "05-quatre-sacs": "Quatre sacs de 250 g", "06-question": "Question 2",
            "07-defi": "À toi de jouer", "07b-correction": "Correction", "08-finale": "Ce que tu as appris"},
      tags=["masse", "kilogramme", "gramme", "1 kg = 1 000 g", "convertir", "balance", "vrac"],
      centres=["cuisine", "argent-budget"],
      s_titre="1 000 grammes contre 1 kilogramme : qui gagne ?", s_ceinture="blanche",
      s_accroche="Ma copine a un sac de 1 kilogramme de billes. Moi, j'ai 1 000 grammes. 1 000, c'est plus que 1 : j'ai gagné ?",
      s_toi="combien de sacs de 250 grammes pour faire 1 kilogramme ?",
      s_tags=["masse", "kilogramme", "gramme", "billes", "balance"], s_centres=["jeux-defis"]),
 dict(classe="ce1", n=3, slug="estimer", micro="ce1_masse_estimer", nom="Estimer une masse",
      date="2027-05-07", ceinture="blanche",
      titre="Une trousse peut-elle peser 3 kg ?",
      intro="Chloé est bibliothécaire : elle range des livres, des gros et des petits. Elle doit savoir ce qu'elle peut porter. Pour estimer une masse, on la compare à un repère.",
      points=["deux repères : un trombone pèse environ 1 g, une brique de lait pleine environ 1 kg",
              "un gros dictionnaire : environ 1 kg ; un petit livre : environ 200 g",
              "3 kg, c'est trois briques de lait : une trousse pèse environ 300 g",
              "le cartable : 3 g (trop léger), 300 kg (trop lourd), environ 3 kg"],
      defi="Le cartable de Chloé pèse-t-il 3 g, 3 kg ou 300 kg ?",
      chap={"00-garde": "Estimer une masse", "02-reperes": "Deux repères", "03-livres": "Les livres de Chloé",
            "04-question": "Question 1", "05-piege": "Les nombres impossibles", "06-question": "Question 2",
            "07-defi": "À toi de jouer", "07b-correction": "Correction", "08-finale": "Ce que tu as appris"},
      tags=["masse", "estimer", "kilogramme", "gramme", "repère", "ordre de grandeur", "bibliothèque"],
      centres=["histoire-geographie", "art-design"],
      s_titre="Une gomme de 1 kilogramme ? Vraiment ?", s_ceinture="blanche",
      s_accroche="Mon copain dit : ma gomme pèse 1 kilogramme ! Je lui donne une brique de lait. Ça, c'est 1 kilogramme.",
      s_toi="combien pèse ton cartable, en kilogrammes ?",
      s_tags=["masse", "estimer", "gramme", "kilogramme", "gomme"], s_centres=["jeux-defis"]),
 dict(classe="ce1", n=4, slug="probleme", micro="ce1_masse_probleme", nom="Problèmes de masses",
      date="2027-05-08", ceinture="blanche",
      titre="Le panier pèse 1 kg : et les poissons ?",
      intro="Malo est pêcheur au port de Saint-Pierre, à La Réunion. Il pèse sa pêche pour la vendre. Pour résoudre un problème de masses, on calcule avec la même unité.",
      points=["le panier plein pèse 1 kg = 1 000 g, vide 300 g : les poissons, c'est le plein moins le vide, 700 g",
              "1 kg de farine, on en prend 400 g : 1 000 − 400, il reste 600 g",
              "3 kg de thon et 2 kg de dorade : 3 + 2 = 5 kg en tout",
              "750 g sur le plateau : de 750 à 1 000, il manque 250 g pour faire 1 kg"],
      defi="Malo a 2 kg de crevettes et en vend 500 g : combien de grammes lui reste-t-il ?",
      chap={"00-garde": "Problèmes de masses", "01-situation": "Malo, pêcheur à Saint-Pierre",
            "02-plein-vide": "Le plein et le vide", "03-soustraire": "Le plein moins le vide",
            "04-question": "Question 1", "05-ajouter": "Ajouter des masses", "06-question": "Question 2",
            "07-defi": "À toi de jouer", "07b-correction": "Correction", "08-finale": "Ce que tu as appris"},
      tags=["masse", "problème", "kilogramme", "gramme", "soustraction", "addition", "pêcheur", "La Réunion"],
      centres=["nature-ecologie", "cuisine"],
      s_titre="1 kg de coquillages ? Et le seau, alors ?", s_ceinture="blanche",
      s_accroche="Mon seau plein de coquillages pèse 1 kilogramme. Mon copain dit : 1 kilogramme de coquillages !",
      s_toi="un panier plein pèse 900 grammes, vide 100 grammes : combien pèsent les fruits ?",
      s_tags=["masse", "problème", "gramme", "kilogramme", "coquillages", "plage"], s_centres=["jeux-defis"]),
 dict(classe="ce1", n=5, slug="defi", micro="ce1_masse_defi", nom="Le défi des masses",
      date="2027-05-11", ceinture="jaune",
      titre="5 quilles de 200 g : plus lourd que 1 kg ?",
      intro="Lina est jongleuse dans un cirque. Dans sa valise, elle range ses quilles et ses balles : la valise doit rester légère. Pour additionner des masses, on les met dans la même unité.",
      points=["5 quilles de 200 g : 200, 400, 600, 800, 1 000 g",
              "1 000 g, c'est 1 kg : la balance reste à niveau, ni plus, ni moins",
              "avec 3 balles de 100 g : 1 000 + 300 = 1 300 g, plus que 1 kg",
              "1 kg de plumes et 1 kg de cailloux : c'est pareil, les plumes prennent juste plus de place"],
      defi="La valise vide pèse 2 kg ; Lina y met 5 quilles de 200 g et 2 balles de 500 g : combien pèse la valise ?",
      chap={"00-garde": "Le défi des masses", "01-situation": "Lina, jongleuse de cirque",
            "02-quilles": "5 quilles de 200 g", "03-un-kilo": "1 000 g = 1 kg",
            "04-question": "Question 1", "05-balles": "Plus que 1 kg", "06-question": "Question 2",
            "07-defi": "À toi de jouer", "07b-correction": "Correction", "08-finale": "Ce que tu as appris"},
      tags=["masse", "défi", "kilogramme", "gramme", "1 kg = 1 000 g", "addition", "cirque", "jongleuse"],
      centres=["art-design", "jeux-defis"],
      s_titre="1 kg de plumes ou 1 kg de cailloux : le plus lourd ?", s_ceinture="blanche",
      s_accroche="Ma copine et moi, on fait un pari. Le plus lourd : 1 kilogramme de plumes, ou 1 kilogramme de cailloux ?",
      s_toi="combien de grammes dans 2 kilogrammes de plumes ?",
      s_tags=["masse", "kilogramme", "plumes", "cailloux", "balance", "pari"], s_centres=["jeux-defis"]),
 dict(classe="ce2", n=1, slug="unites", micro="ce2_masse_unites", nom="Les unités de masse",
      date="2027-06-11", ceinture="jaune",
      titre="Un conteneur : en grammes, en kilos ou en tonnes ?",
      intro="Rayan est grutier au port. Avec sa grue, il soulève des conteneurs énormes et les pose sur les bateaux. Pour chaque masse, il faut choisir la bonne unité.",
      points=["trois unités : le gramme (g), le kilogramme (kg), la tonne (t)",
              "1 tonne = 1 000 kg : la masse d'une petite voiture",
              "le gramme est la plus petite : un trombone pèse 1 g",
              "kilo veut dire 1 000 : 1 kg = 1 000 g, comme 1 km = 1 000 m"],
      defi="quelle unité pour peser une vis, une caisse à outils, un bateau ?",
      chap={"00-garde": "g, kg ou t ?", "01-situation": "Rayan, grutier au port", "02-trois": "Trois unités",
            "03-tonne": "La tonne", "04-question": "Question 1", "05-kilo": "Kilo veut dire 1 000",
            "06-question": "Question 2", "07-defi": "À toi de jouer", "07b-correction": "Correction",
            "08-finale": "Ce que tu as appris"},
      tags=["masse", "unités de masse", "gramme", "kilogramme", "tonne", "1 t = 1 000 kg", "grutier", "port", "conteneur"],
      centres=["bateaux", "transports"],
      s_titre="Peser un éléphant sur la balance de cuisine ?", s_ceinture="jaune",
      s_accroche="Mon copain veut peser un éléphant… sur la balance de la cuisine ! L'aiguille fait trois tours et… crac !",
      s_toi="1 tonne, c'est combien de kilogrammes ?",
      s_tags=["masse", "tonne", "éléphant", "balance", "unités"], s_centres=["animaux", "jeux-defis"]),
 dict(classe="ce2", n=2, slug="relations", micro="ce2_masse_relations", nom="Les relations entre les unités",
      date="2027-06-12", ceinture="jaune",
      titre="1 kg 200 g, c'est combien de grammes ?",
      intro="Emma est torréfactrice : elle grille les grains de café, puis elle les met en paquets. Pour peser ses paquets, elle passe des kilogrammes aux grammes.",
      points=["1 kg = 1 000 g : 4 paquets de 250 g font 1 kg",
              "un demi-kilogramme, c'est la moitié de 1 000 g : 500 g",
              "1 kg 200 g = 1 000 g + 200 g = 1 200 g",
              "même idée pour la tonne : 1 t = 1 000 kg, 2 t = 2 000 kg"],
      defi="Emma a 3 kg de café ; elle fait des paquets de 500 g : combien de paquets ?",
      chap={"00-garde": "1 kg 200 g = ? g", "01-situation": "Emma, torréfactrice", "02-mille": "1 kg = 1 000 g",
            "03-demi": "Un demi-kilogramme", "04-question": "Question 1", "05-kg-et-g": "1 kg 200 g = 1 200 g",
            "06-tonne": "1 t = 1 000 kg", "07-question": "Question 2", "08-defi": "À toi de jouer",
            "08b-correction": "Correction", "09-finale": "Ce que tu as appris"},
      tags=["masse", "relations entre unités", "kilogramme", "gramme", "tonne", "1 kg = 1 000 g", "conversion", "café", "torréfactrice"],
      centres=["cuisine"],
      s_titre="1 kg 200 g de riz… ou 1 200 kg ?", s_ceinture="jaune",
      s_accroche="Sur le sac de riz : 1 kilogramme 200 grammes. Mon copain lit : 1 200 kilogrammes ! Il le soulève… facile !",
      s_toi="3 kilogrammes 500 grammes, c'est combien de grammes ?",
      s_tags=["masse", "kilogramme", "gramme", "conversion", "riz", "sac"], s_centres=["cuisine", "jeux-defis"]),
 dict(classe="ce2", n=4, slug="choisir-unite", micro="ce2_masse_choisir_unite", nom="Choisir la bonne unité",
      date="2027-06-13", ceinture="jaune",
      titre="Letchi, sac de riz, camion : g, kg ou t ?",
      intro="Tom est chauffeur routier : son gros camion livre des fruits et du riz aux magasins. Pour dire une masse, il faut choisir la bonne unité.",
      points=["un objet léger (un letchi : environ 20 g) se pèse en grammes",
              "un objet qu'on porte (un sac de riz : 5 kg) se pèse en kilogrammes",
              "un objet très lourd (un camion : 12 t) se pèse en tonnes",
              "piège : un cartable de 3 t pèserait trois voitures ! Il pèse 3 kg"],
      defi="trouve l'unité : une banane pèse 150…, Tom pèse 80…, son camion chargé pèse 20…",
      chap={"00-garde": "g, kg ou t ?", "01-situation": "Tom, chauffeur routier", "02-gramme": "Le gramme",
            "03-kilo": "Le kilogramme", "04-tonne": "La tonne", "05-question": "Question 1",
            "06-piege": "Le piège du cartable", "07-question": "Question 2", "08-defi": "À toi de jouer",
            "08b-correction": "Correction", "09-finale": "Ce que tu as appris"},
      tags=["masse", "choisir l'unité", "gramme", "kilogramme", "tonne", "unité adaptée", "camion", "chauffeur routier", "letchi"],
      centres=["transports", "cuisine"],
      s_titre="2 tonnes de bananes sur la liste des courses ?", s_ceinture="jaune",
      s_accroche="Mon copain écrit la liste des courses : 2 tonnes de bananes ! Le camion de livraison arrive… et il bouche toute la rue !",
      s_toi="combien pèse un melon, à ton avis, en grammes ?",
      s_tags=["masse", "tonne", "kilogramme", "bananes", "unités"], s_centres=["cuisine", "jeux-defis"]),
 dict(classe="ce2", n=5, slug="estimer", micro="ce2_masse_estimer", nom="Estimer une masse",
      date="2027-06-14", ceinture="jaune",
      titre="Un bébé pèse-t-il 3 g, 3 kg ou 30 kg ?",
      intro="Sarah est sage-femme : elle aide les bébés à naître, puis elle les pèse sur une petite balance. Pour estimer une masse, on la compare à un repère.",
      points=["trois repères : 1 g = un trombone, 1 kg = une brique de lait, 1 t = une petite voiture",
              "un bébé qui vient de naître ≈ trois briques de lait : environ 3 kg",
              "un élève de CE2 pèse environ 25 kg ; une mangue, plus légère qu'une brique : environ 400 g",
              "5 mangues ≈ 2 kg = 2 000 g, donc une mangue ≈ 400 g"],
      defi="une pomme, un vélo, une voiture : 150 g, 12 kg ou 1 t ?",
      chap={"00-garde": "3 g, 3 kg ou 30 kg ?", "01-situation": "Sarah, sage-femme", "02-reperes": "Trois repères",
            "03-bebe": "Le bébé : 3 kg", "04-question": "Question 1", "05-mangue": "La mangue : 400 g",
            "06-question": "Question 2", "07-defi": "À toi de jouer", "07b-correction": "Correction",
            "08-finale": "Ce que tu as appris"},
      tags=["masse", "estimer une masse", "ordre de grandeur", "gramme", "kilogramme", "tonne", "repère", "bébé", "sage-femme", "mangue"],
      centres=["corps-sante", "cuisine"],
      s_titre="Mon chat pèse 400 kg ?!", s_ceinture="jaune",
      s_accroche="Ma copine dit que mon chat pèse 400 kilogrammes ! 400 kilogrammes ? C'est la masse d'un ours !",
      s_toi="combien pèse un chien, à ton avis, en kilogrammes ?",
      s_tags=["masse", "estimer", "kilogramme", "chat", "ours"], s_centres=["animaux", "jeux-defis"]),
]

COMMUNS = ["masse", "maths"]


def dossier(e):
    return f"{e['classe']}/maths/masse/{e['n']:02d}-{e['slug']}"


def temps_de(classe):
    p = SORTIES / classe / "maths" / "masse" / "temps.json"
    return p, (json.loads(p.read_text(encoding="utf-8")) if p.exists() else {})


def entrees():
    out = []
    for e in EP:
        cl, n, slug = e["classe"], e["n"], e["slug"]
        ident = f"{cl}-masse-{slug}"
        _, temps = temps_de(cl)
        if ident not in temps:
            continue
        CL = cl.upper()
        communs = COMMUNS + [CL, "primaire", CYCLE[cl], "CRPE", "EleveAI"]
        dos = dossier(e)
        nom = f"eleveai-maths-{ident}"
        notion = e.get("notion", NOTION)  # CP : masse_contenance
        coach = COACH.format(classe=cl, micro=e["micro"], notion=notion)
        voix = json.loads((VOIX / f"{ident}.json").read_text(encoding="utf-8"))
        t = temps[ident]
        titre = f"{e['titre']} — {e['nom']} — épisode {n} · Maths {CL}"
        acc = e["intro"] + "\n\nDans cette vidéo :\n" + "\n".join("• " + p for p in e["points"])
        acc += (f"\n\n⏸ 2 questions-pauses : mets pause, et choisis !\n🥋 {NOM_CEINT[e['ceinture']]}.\n"
                f"Un défi en fin de vidéo, avec sa correction : {e['defi']}")
        acc += f"\n\nPour s'entraîner :\n• la série du coach sur cette compétence : {coach}"
        acc += f"\n\n⚖️ Épisode {n} de la série Masses d'EleveAI, en {CL}."
        qs = [dict(t=mmss(t["clips"][c]), **question(voix, c)) for c in voix if c.endswith("-question")]
        out.append({
            "id": ident, "pas_avant": e["date"], "prioritaire": True, "notionId": notion, "microId": e["micro"], "classe": cl,
            "ceinture": e["ceinture"], "serie": f"Maths {CL}", "type": "longue", "fichier": f"{dos}/{nom}.mp4",
            "miniature": f"{dos}/{nom}.png", "titre": titre, "accroche": acc,
            "chapitres": chapitres(e["chap"], t["clips"], t["duree"]),
            "tags": list(dict.fromkeys(e["tags"] + communs)), "questions": qs, "centres": e["centres"],
        })
        if e.get("aussi"):  # la même vidéo sert aussi une micro d'une classe voisine
            out[-1]["aussi"] = e["aussi"]
        if f"{ident}-short" not in temps:
            continue
        sv = json.loads((VOIX / f"{ident}-short.json").read_text(encoding="utf-8"))
        ts = temps[f"{ident}-short"]
        stitre = f"{e['s_titre']} #maths #{cl}"
        sc = e.get("s_ceinture", "blanche")
        sacc = e["s_accroche"] + (f"\n\nDessin animé, voix de synthèse.\n🥋 {NOM_CEINT[sc]}"
                                  + (" : pour découvrir." if sc == "blanche" else ".")
                                  + f"\n👉 À toi : {e['s_toi']} Réponds en commentaire !")
        sacc += (f"\n\n▶️ L'épisode complet : {{{{LONGUE}}}}\n🎯 Le coach : {coach}\n\n"
                 f"Fait à La Réunion 🌋 — Frédéric Lacoste\n\n#Shorts #maths #masse #{cl} #primaire")
        out.append({
            "id": f"{ident}-short", "pas_avant": e["date"], "prioritaire": True, "notionId": notion, "microId": e["micro"],
            "classe": cl, "ceinture": sc, "serie": f"Maths {CL}", "type": "short", "renvoie_vers": ident,
            "fichier": f"{dos}/{nom}-short.mp4", "miniature": f"{dos}/{nom}-short-miniature.png",
            "titre": stitre, "accroche": sacc,
            "tags": list(dict.fromkeys(e["s_tags"] + ["Ti Margo", "dessin animé", NOM_CEINT[sc].lower()] + communs + ["Shorts"])),
            "questions": [dict(t=mmss(ts["clips"][c]), **question(sv, c)) for c in sv if c.endswith("-question")],
            "centres": e["s_centres"],
        })
        if e.get("aussi"):
            out[-1]["aussi"] = e["aussi"]
        for x in (titre, stitre):
            if len(x) > 100:
                print(f"TITRE TROP LONG ({len(x)}) : {x}", file=sys.stderr)
    return out


def main():
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    mode = sys.argv[1]
    if mode == "temps":
        filtre = sys.argv[2] if len(sys.argv) > 2 else ""
        for e in EP:
            ident = f"{e['classe']}-masse-{e['slug']}"
            if filtre and filtre != ident:
                continue
            p, res = temps_de(e["classe"])
            for suf in ("", "-short"):
                nom = f"{ident}{suf}"
                mp4 = SORTIES / dossier(e) / f"eleveai-maths-{nom}.mp4"
                if not mp4.exists():
                    print("pas encore :", nom)
                    continue
                clips, duree = mesurer(nom, mp4)
                res[nom] = {"duree": duree, "clips": clips}
                print(nom, duree, "fin", clips[list(clips)[-1]])
            p.write_text(json.dumps(res, ensure_ascii=False, indent=1), encoding="utf-8")
    elif mode == "voir":
        print(json.dumps(entrees(), ensure_ascii=False, indent=1))
    elif mode == "manifeste":
        sauve = Path(tempfile.gettempdir()) / "manifeste-youtube.avant-masse.json"
        shutil.copy(MANIFESTE, sauve)
        texte = MANIFESTE.read_text(encoding="utf-8")
        data = json.loads(texte)
        neuves = entrees()
        ids = {n["id"] for n in neuves}
        avant = len(data["videos"])
        for v in data["videos"]:
            if v["id"] in ids and v.get("url"):
                raise SystemExit("déjà publiée : " + v["id"])
        data["videos"] = [v for v in data["videos"] if v["id"] not in ids] + neuves
        sortie = json.dumps(data, ensure_ascii=False, indent=2) + "\n"
        MANIFESTE.write_text(sortie, encoding="utf-8", newline="\n" if "\r\n" not in texte else "\r\n")
        print("manifeste :", avant, "→", len(data["videos"]), "sauvegarde", sauve)


if __name__ == "__main__":
    main()
