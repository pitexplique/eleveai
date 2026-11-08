# passe_decimaux.py
# Passe finale de la série NOMBRES DÉCIMAUX 6e (08/11/2026) : les 24 entrées du manifeste.
# Calquée sur passe_relatifs.py : les temps des chapitres et des questions sont relevés dans
# l'AUDIO de chaque mp4 (corrélation avec les WAV des clips), jamais estimés. Les questions et
# leurs explications sont lues dans les voix validées (« 1 virgule 4 » → « 1,4 », « fois » → « × »).
# Le manifeste a des modifications non commitées d'autres sessions : on sauvegarde, on relit la
# copie de travail et on ajoute seulement (relire puis réécrire redonne le fichier à l'octet près).
#
#   python manim/passe_decimaux.py temps     → manim/sorties/6e/maths/decimaux/temps.json
#   python manim/passe_decimaux.py voir      → affiche les entrées sans rien écrire
#   python manim/passe_decimaux.py manifeste → ajoute ou remplace les 24 entrées 6e-decimal-<slug>[-short]
import json
import re
import shutil
import sys
import tempfile
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from passe_relatifs import mesurer, mmss  # noqa: E402

RACINE = Path(__file__).resolve().parents[1]
SERIE = RACINE / "manim" / "sorties" / "6e" / "maths" / "decimaux"
VOIX = RACINE / "manim" / "voix"
MANIFESTE = RACINE / "manim" / "manifeste-youtube.json"
TEMPS = SERIE / "temps.json"
PAS_AVANT = "2026-12-01"  # date de prudence : rien sur YouTube sans son ordre

COACH = "https://www.eleveai.fr/coach/serie?classe=6e&matiere=maths&notion={notion}&microId={micro}&display=simple"

EP = [
 dict(n=1, slug="lire-ecrire", micro="decimal_lire_ecrire", notion="decimal_nombre", nom="Lire et écrire un décimal",
      titre="Comment écrire le poids d'un chaton ?",
      intro="Léna est vétérinaire. Elle pèse un chaton : 1 kilogramme, et un peu plus. Elle dit « 1 unité et 4 dixièmes ». Comment l'écrire ?",
      points=["une unité coupée en 10 : les dixièmes, puis les centièmes",
              "avant la virgule les unités, juste après les dixièmes",
              "7/10 = 0,7 et 25/10 = 2,5",
              "s'il manque un rang, on écrit 0 : 2,09"],
      defi="écris 4 kilogrammes et 8 centièmes, puis 125/100 avec une virgule",
      chap={"00-garde": "Comment écrire 1 unité et 4 dixièmes ?", "02-dixiemes": "Les dixièmes", "04-centiemes": "Les centièmes",
            "05-question": "Question 1", "06-fraction": "Des fractions aux décimaux", "07-zero": "Attention au zéro",
            "08-question": "Question 2", "09-piege": "Le piège de 34/100", "10-defi": "À toi de jouer",
            "10b-correction": "Correction", "11-finale": "Ce que tu as appris"},
      tags=["lire un nombre décimal", "écrire un nombre décimal", "dixièmes", "centièmes", "vétérinaire", "animaux"],
      centres=["animaux"],
      s_titre="Tu paries que j'écris bien 3 unités et 5 centièmes ?",
      s_accroche="On me dicte 3 unités et 5 centièmes. J'écris 3,5 sans réfléchir... Les cases du tableau ne sont pas d'accord !",
      s_toi="écris en chiffres 4 unités et 4 millièmes.",
      s_tags=["écrire un décimal", "dictée de nombres", "centièmes"], s_centres=["jeux-defis"], s_ceinture="blanche"),
 dict(n=2, slug="rang", micro="decimal_rang", notion="decimal_nombre", nom="Le rang d'un chiffre",
      titre="Que veut dire chaque chiffre de 12,47 secondes ?",
      intro="Malik est chronométreur aux courses d'athlétisme. Une coureuse franchit la ligne en 12,47 secondes. Que veut dire chaque chiffre ?",
      points=["le tableau : centaines, dizaines, unités, dixièmes, centièmes, millièmes",
              "chaque rang vaut 10 fois moins que celui de gauche",
              "le troisième chiffre après la virgule : les millièmes",
              "dizaines ou dixièmes ? ne pas confondre"],
      defi="dans 805,316, quel chiffre est au rang des dizaines ? Et au rang des millièmes ?",
      chap={"00-garde": "Que veut dire chaque chiffre ?", "02-tableau": "Le tableau de numération", "03-valeur": "10 fois moins à chaque rang",
            "04-question": "Question 1", "05-milliemes": "Les millièmes", "06-piege": "Dizaines ou dixièmes ?",
            "07-question": "Question 2", "08-defi": "À toi de jouer", "08b-correction": "Correction", "09-finale": "Ce que tu as appris"},
      tags=["rang d'un chiffre", "tableau de numération", "dixièmes", "centièmes", "millièmes", "chronométreur", "athlétisme"],
      centres=["sport", "jeux-defis"],
      s_titre="Le code du coffre-fort : tu paries qu'il s'ouvre ?",
      s_accroche="Le code du coffre : les chiffres des dixièmes, des centièmes et des millièmes de 5,762. Je tape 5, 7, 6... Bip ! Raté.",
      s_toi="le nouveau code, ce sont les dixièmes, les centièmes et les millièmes de 806,415.",
      s_tags=["rang d'un chiffre", "code secret", "millièmes"], s_centres=["jeux-defis"], s_ceinture="blanche"),
 dict(n=3, slug="comparer", micro="decimal_comparer", notion="decimal_nombre", nom="Comparer des décimaux",
      titre="0,7 m ou 0,65 m : quelle tortue est la plus grande ?",
      intro="Sofia est biologiste marine. Elle mesure deux tortues de mer : Perle, 0,7 mètre, et Corail, 0,65 mètre. Laquelle est la plus grande ?",
      points=["le piège : 65 est plus grand que 7, mais 0,65 est plus petit que 0,7",
              "comparer rang par rang, en partant de la gauche",
              "un zéro à la fin ne change rien : 0,7 = 0,70",
              "ranger des nombres décimaux"],
      defi="range 1,5 ; 1,05 et 1,45 de la plus petite à la plus grande",
      chap={"00-garde": "Quelle tortue est la plus grande ?", "02-piege": "Le piège", "03-methode": "Rang par rang",
            "04-zero": "L'astuce du zéro", "05-question": "Question 1", "06-unites": "D'abord les unités",
            "07-ranger": "Ranger des nombres", "08-question": "Question 2", "09-defi": "À toi de jouer",
            "09b-correction": "Correction", "10-finale": "Ce que tu as appris"},
      tags=["comparer des nombres décimaux", "ranger des décimaux", "plus grand", "plus petit", "biologiste marine", "tortues"],
      centres=["animaux-marins"],
      s_titre="La bouteille avec le plus de chiffres a le plus de jus ?",
      s_accroche="Trois bouteilles : 1,5 litre, 1,25 litre et 1,125 litre. Je prends celle qui a le plus de chiffres... Mon pot est le moins rempli !",
      s_toi="range du plus petit au plus grand : 2,3 ; 2,03 ; 2,33.",
      s_tags=["comparer des décimaux", "litres", "bouteilles"], s_centres=["cuisine"], s_ceinture="jaune"),
 dict(n=4, slug="arrondir", micro="decimal_arrondir", notion="decimal_nombre", nom="Arrondir un décimal",
      titre="23,7 °C : quel nombre entier annoncer à la radio ?",
      intro="Sami est météorologue. Son thermomètre affiche 23,7 degrés. À la radio, il annonce un nombre entier. Lequel ?",
      points=["arrondir à l'unité : le nombre entier le plus proche",
              "la règle : de 0 à 4 on garde, de 5 à 9 on monte",
              "arrondir au dixième : on regarde les centièmes",
              "le piège du 9 : 3,96 arrondi au dixième donne 4"],
      defi="le vent souffle à 45,58 km/h : arrondis à l'unité, puis au dixième",
      chap={"00-garde": "Quel nombre annoncer ?", "02-droite": "Sur la droite graduée", "03-regle": "La règle",
            "05-question": "Question 1", "06-dixieme": "Arrondir au dixième", "07-piege": "Le piège du 9",
            "08-question": "Question 2", "09-defi": "À toi de jouer", "09b-correction": "Correction",
            "10-finale": "Ce que tu as appris"},
      tags=["arrondir un nombre décimal", "arrondi à l'unité", "arrondi au dixième", "valeur approchée", "météorologue", "météo"],
      centres=["meteo-climat"],
      s_titre="Arrondir deux fois, c'est permis ?",
      s_accroche="Mon gâteau pèse 2,46 kilogrammes. J'arrondis au dixième, 2,5, puis à l'unité : 3 ! Sur la droite graduée, il est pourtant bien plus près de 2...",
      s_toi="arrondis 7,45 à l'unité.",
      s_tags=["arrondir", "arrondi à l'unité", "gâteau"], s_centres=["cuisine"], s_ceinture="jaune"),
 dict(n=5, slug="encadrer", micro="decimal_encadrer", notion="decimal_nombre", nom="Encadrer et intercaler",
      titre="Y a-t-il un nombre entre 4,7 et 4,8 ?",
      intro="Lina pilote un robot sur la planète Mars. Aujourd'hui, le robot a roulé 7,38 mètres. Entre quels nombres se trouve-t-il ?",
      points=["encadrer à l'unité : 7 < 7,38 < 8",
              "encadrer au dixième : on zoome entre 7 et 8",
              "intercaler : entre 4,7 et 4,8, il y a 4,75",
              "entre deux décimaux, il y en a toujours d'autres"],
      defi="le robot a roulé 15,04 mètres : encadre ce nombre à l'unité, puis au dixième",
      chap={"00-garde": "Entre quels nombres ?", "02-unite": "Encadrer à l'unité", "03-dixieme": "Encadrer au dixième",
            "04-question": "Question 1", "05-intercaler": "Intercaler", "06-zoom": "On peut toujours zoomer",
            "07-question": "Question 2", "08-defi": "À toi de jouer", "08b-correction": "Correction",
            "09-finale": "Ce que tu as appris"},
      tags=["encadrer un nombre décimal", "intercaler", "droite graduée", "encadrement", "robot", "Mars"],
      centres=["espace"],
      s_titre="Aucun nombre entre 4,7 et 4,8 : tu paries ?",
      s_accroche="Je parie qu'il n'y a aucun nombre entre 4,7 et 4,8 : ils sont collés ! Ma loupe zoome sur la droite graduée...",
      s_toi="entre 4,7 et 4,8, combien y a-t-il de nombres avec deux chiffres après la virgule ?",
      s_tags=["intercaler", "droite graduée", "loupe"], s_centres=["jeux-defis"], s_ceinture="blanche"),
 dict(n=6, slug="defi", micro="decimal_defi", notion="decimal_nombre", nom="Défis sur les décimaux",
      titre="Sauras-tu ouvrir les trois portes de l'escape game ?",
      intro="Tom crée des escape games. Ses énigmes cachent des nombres décimaux. Trois portes t'attendent.",
      points=["retrouver un nombre à partir de ses chiffres et de leurs rangs",
              "le plus grand nombre : le plus gros chiffre au rang le plus fort",
              "vrai ou faux : plus de chiffres ne veut pas dire plus grand",
              "10,20 = 10,2"],
      defi="avec les étiquettes 9, 8 et 6, écris le plus petit nombre possible avec deux chiffres après la virgule",
      chap={"00-garde": "Trois portes à ouvrir", "02-porte1": "Porte 1", "03-question": "Question 1",
            "04-porte2": "Porte 2", "05-porte3": "Porte 3", "06-question": "Question 2", "07-defi": "À toi de jouer",
            "07b-correction": "Correction", "08-finale": "Ce que tu as appris"},
      tags=["nombres décimaux", "défis", "énigmes", "escape game", "plus grand nombre", "rang"],
      centres=["jeux-defis"],
      s_titre="Avec 3, 7 et 2, tu paries que j'écris le plus grand nombre ?",
      s_accroche="Avec les étiquettes 3, 7 et 2, je fabrique le plus grand nombre à deux chiffres après la virgule : 2,37 ! Hmm... j'ai tout fait à l'envers.",
      s_toi="avec 4, 1 et 7, écris le plus petit nombre avec un seul chiffre après la virgule.",
      s_tags=["étiquettes", "plus grand nombre", "défi"], s_centres=["jeux-defis"], s_ceinture="jaune"),
 dict(n=7, slug="additionner", micro="decimal_additionner", notion="decimal_calcul", nom="Additionner et soustraire",
      titre="Pourquoi pose-t-on virgule sous virgule ?",
      intro="Romain est boulanger. Il verse 2,35 kilogrammes de farine blanche, puis 1,4 kilogramme de farine complète. Combien en tout ?",
      points=["unités avec unités, dixièmes avec dixièmes : virgule sous virgule",
              "compléter avec des zéros : 1,4 = 1,40",
              "la retenue : 10 dixièmes font une unité",
              "soustraire : 5 − 2,75, la virgule cachée de 5"],
      defi="8,5 kg de sucre, moins 2,75 kg pour des brioches, moins 1,6 kg pour des tartes : combien en reste-t-il ?",
      chap={"00-garde": "Combien de farine en tout ?", "02-sens": "Virgule sous virgule", "03-pose": "Poser l'addition",
            "04-retenue": "La retenue", "05-question": "Question 1", "06-soustraction": "La soustraction",
            "07-piege": "La virgule cachée", "08-question": "Question 2", "09-defi": "À toi de jouer",
            "09b-correction": "Correction", "10-finale": "Ce que tu as appris"},
      tags=["addition de décimaux", "soustraction de décimaux", "poser une opération", "virgule sous virgule", "boulanger", "pain"],
      centres=["cuisine", "argent-budget"],
      s_titre="5 € − 2,75 € : il me reste 3,75 €, tu paries ?",
      s_accroche="J'ai 5 euros. J'achète des bonbons à 2,75 euros. 5 moins 2, ça fait 3, et je garde les 75 centimes... Je vérifie : ça fait plus que mes 5 euros !",
      s_toi="j'ai 10 euros. J'achète un livre à 6,40 euros. Combien me reste-t-il ?",
      s_tags=["soustraction", "rendre la monnaie", "euros"], s_centres=["argent-budget"], s_ceinture="jaune"),
 dict(n=8, slug="multiplier", micro="decimal_multiplier", notion="decimal_calcul", nom="Multiplier un décimal par un entier",
      titre="2,4 × 3 : où mettre la virgule ?",
      intro="Lucas est jardinier paysagiste. Il plante 3 rangées de fleurs de 2,4 mètres chacune. Quelle longueur en tout ?",
      points=["3 × 2,4, c'est 2,4 + 2,4 + 2,4",
              "la méthode : multiplier sans la virgule, puis la remettre",
              "vérifier avec un ordre de grandeur",
              "× 10, × 100 : chaque chiffre monte d'un ou deux rangs"],
      defi="6 rosiers à 4,25 euros : combien Lucas paie-t-il ? Vérifie avec un ordre de grandeur",
      chap={"00-garde": "Quelle longueur en tout ?", "02-sens": "Une addition répétée", "03-methode": "La méthode rapide",
            "04-verifier": "L'ordre de grandeur", "05-question": "Question 1", "06-fois10": "Multiplier par 10",
            "07-raccourci": "Le raccourci", "08-question": "Question 2", "09-defi": "À toi de jouer",
            "09b-correction": "Correction", "10-finale": "Ce que tu as appris"},
      tags=["multiplier un décimal", "multiplication", "multiplier par 10", "ordre de grandeur", "jardinier paysagiste", "jardin"],
      centres=["nature-ecologie"],
      s_titre="4 glaces à 1,5 € : je paie 60 €, tu paries ?",
      s_accroche="J'offre 4 glaces à 1,5 euro. 15 fois 4, ça fait 60 : je paie 60 euros ! Le marchand rigole...",
      s_toi="combien coûtent 6 croissants à 1,2 euro ?",
      s_tags=["multiplication", "virgule", "glaces"], s_centres=["argent-budget"], s_ceinture="jaune"),
 dict(n=9, slug="multiplier-decimaux", micro="decimal_multiplier_decimaux", notion="decimal_calcul", nom="Multiplier deux décimaux",
      titre="0,3 × 0,6 : pourquoi est-ce plus petit ?",
      intro="Anaïs est carreleuse. Elle pose des carreaux sur une zone de 0,3 mètre sur 0,6 mètre. Quelle est son aire ?",
      points=["un carré de 1 m coupé en 100 petits carreaux",
              "compter les chiffres après la virgule des deux nombres",
              "2,6 × 7,4 = 19,24, vérifié par un ordre de grandeur",
              "multiplier par moins de 1 rend plus petit"],
      defi="une plaque de carrelage mesure 1,2 m sur 0,5 m : quelle est son aire ?",
      chap={"00-garde": "Quelle est l'aire ?", "02-carre": "Le carré coupé en 100", "03-zone": "La zone de 3 sur 6",
            "04-methode": "La méthode", "05-question": "Question 1", "06-grand": "Avec de plus grands nombres",
            "07-piege": "Plus petit !", "08-question": "Question 2", "09-defi": "À toi de jouer",
            "09b-correction": "Correction", "10-finale": "Ce que tu as appris"},
      tags=["multiplier deux décimaux", "produit de décimaux", "aire", "chiffres après la virgule", "carreleuse", "carrelage"],
      centres=["construction"],
      s_titre="0,5 × 0,5 de pizza : plus que la moitié, tu paries ?",
      s_accroche="Je prends 0,5 de la largeur et 0,5 de la hauteur d'une pizza carrée. Multiplier, ça agrandit toujours... Hé ! Mon morceau est tout petit.",
      s_toi="combien font 0,4 × 0,5 ?",
      s_tags=["multiplier deux décimaux", "pizza", "un quart"], s_centres=["cuisine"], s_ceinture="jaune"),
 dict(n=10, slug="multiplier-par-01", micro="decimal_multiplier_par_01", notion="decimal_calcul", nom="Multiplier par 0,1 ; 0,01 ; 0,001",
      titre="Pourquoi ça rétrécit ?",
      intro="Kenzo fabrique des maquettes pour le cinéma. Une vraie tour mesure 37 mètres. Sa maquette doit être 10 fois plus petite : 37 × 0,1.",
      points=["0,1, c'est un dixième : multiplier par 0,1, c'est diviser par 10",
              "chaque chiffre descend d'un rang",
              "× 0,01 : deux rangs ; × 0,001 : trois rangs",
              "le résultat ne grandit jamais"],
      defi="un camion de 12,5 mètres, multiplié par 0,01 pour la maquette : combien mesure-t-elle ?",
      chap={"00-garde": "Pourquoi ça rétrécit ?", "02-sens": "Un dixième", "03-valeur": "Chaque chiffre descend",
            "05-question": "Question 1", "06-001": "× 0,01 et × 0,001", "07-piege": "Jamais plus grand",
            "08-question": "Question 2", "09-defi": "À toi de jouer", "09b-correction": "Correction",
            "10-finale": "Ce que tu as appris"},
      tags=["multiplier par 0,1", "multiplier par 0,01", "diviser par 10", "valeur des chiffres", "maquettiste", "cinéma"],
      centres=["cinema-series"],
      s_titre="Fois 0,1 : mon dinosaure va devenir géant, tu paries ?",
      s_accroche="Ma machine multiplie par 0,1. J'y mets mon dinosaure de 40 centimètres : il va sortir géant ! Bzzz...",
      s_toi="mon dinosaure géant mesure 25 mètres. Je le passe × 0,01 : combien mesure-t-il ?",
      s_tags=["multiplier par 0,1", "rétrécir", "dinosaure"], s_centres=["dinosaures"], s_ceinture="jaune"),
 dict(n=11, slug="diviser-par-entier", micro="decimal_diviser_par_entier", notion="decimal_calcul", nom="Diviser un décimal par un entier",
      titre="Comment partager 7,5 m de câble en 5 ?",
      intro="Yasmine est régisseuse de concerts. Elle coupe 7,5 mètres de câble en 5 morceaux égaux. Combien mesure chaque morceau ?",
      points=["partager les unités, puis les dixièmes",
              "poser la division : la virgule au résultat quand on passe la virgule",
              "quand ça ne tombe pas juste, on continue : 7 ÷ 4 = 1,75",
              "÷ 10, ÷ 100 : chaque chiffre descend d'un ou deux rangs"],
      defi="9 litres d'eau partagés entre 4 musiciens : combien pour chacun ?",
      chap={"00-garde": "Comment partager ?", "02-sens": "Partager rang par rang", "03-potence": "Poser la division",
            "04-question": "Question 1", "05-continuer": "Quand ça ne tombe pas juste", "06-verif": "On vérifie",
            "07-par10": "Diviser par 10", "08-question": "Question 2", "09-defi": "À toi de jouer",
            "09b-correction": "Correction", "10-finale": "Ce que tu as appris"},
      tags=["division décimale", "diviser un décimal", "division posée", "quotient", "régisseuse", "concert"],
      centres=["musique"],
      s_titre="10 € entre 4 copains : je garde 2 €, tu paries ?",
      s_accroche="Je partage 10 euros entre 4 copains : 2 euros chacun, et je garde les 2 euros qui restent ! Mes copains protestent...",
      s_toi="je partage 7 euros entre 4 copains. Combien pour chacun ?",
      s_tags=["division", "partage", "euros"], s_centres=["argent-budget"], s_ceinture="jaune"),
 dict(n=12, slug="calcul-defi", micro="decimal_calcul_defi", notion="decimal_calcul", nom="Défis de calcul",
      titre="Moitié, double, 10 % : sauras-tu tout calculer ?",
      intro="Inès tient un magasin de jeux vidéo. Chaque jour, elle calcule des moitiés, des doubles et des réductions.",
      points=["la moitié : diviser par 2 ; le double : × 2",
              "le quart : la moitié de la moitié",
              "10 % : diviser par 10 ; 50 % : la moitié",
              "un ordre de grandeur sans poser : 4,9 × 2"],
      defi="une console à 250 euros, avec 10 % de réduction : quel est le nouveau prix ?",
      chap={"00-garde": "Sauras-tu tout calculer ?", "02-moitie": "La moitié", "03-double": "Le double",
            "04-question": "Question 1", "05-pourcent": "10 % de réduction", "06-nouveau-prix": "Le nouveau prix",
            "07-question": "Question 2", "08-ordre": "Sans poser", "09-defi": "À toi de jouer",
            "09b-correction": "Correction", "10-finale": "Ce que tu as appris"},
      tags=["calcul avec les décimaux", "moitié", "double", "pourcentage", "réduction", "jeux vidéo"],
      centres=["jeux-video", "argent-budget"],
      s_titre="Moins 25 % : je retire 25 €, tu paries ?",
      s_accroche="Les soldes ! Un jeu à 40 euros, moins 25 %. Je retire 25 euros : il coûte 15 euros ! La vendeuse sourit...",
      s_toi="un jeu à 45 euros, moins 10 %. Quel est le nouveau prix ?",
      s_tags=["pourcentage", "soldes", "un quart"], s_centres=["jeux-video", "argent-budget"], s_ceinture="jaune"),
]

COMMUNS = ["nombres décimaux", "maths", "6e", "collège", "cycle 3", "CRPE", "EleveAI"]
CEINTURE_SHORT = {"blanche": "Ceinture blanche : la version 100 % visuelle.", "jaune": "Ceinture jaune : une règle ou un calcul."}


def ecran(s):
    """La voix → l'écran : « 1 virgule 4 » → « 1,4 », « fois » → « × », « divisé par » → « ÷ »."""
    s = re.sub(r"(\d) virgule (\d)", r"\1,\2", s)
    s = re.sub(r"\bFois ", "× ", s)
    s = re.sub(r"(\d) plus (\d)", r"\1 + \2", s)
    s = re.sub(r"(\d) moins (\d)", r"\1 − \2", s)
    return s.replace(" fois ", " × ").replace(" divisé par ", " ÷ ")


def question(voix, cle):
    """« Question ! <q> A : x. B : y. C : z. Mets pause… » + « Réponse B. <explication> »."""
    q = ecran(voix[cle])
    m = re.match(r"Question ! (.*?) A : (.*?)\. B : (.*?)\. C : (.*?)\. Mets pause", q)
    if not m:
        raise SystemExit("question illisible : " + cle)
    r = ecran(voix[re.sub(r"-question$", "b-reponse", cle)])
    mr = re.match(r"Réponse ([ABC]) ?[.!] ?(.*)", r)
    return {"question": m.group(1), "choix": [m.group(2), m.group(3), m.group(4)],
            "reponse": "ABC".index(mr.group(1)), "explication": mr.group(2).strip()}


def chapitres(chap, t, duree):
    """Les chapitres, au son ; un chapitre de moins de 10 s est fondu dans le précédent
    (YouTube refuse TOUS les chapitres s'il y en a un trop court)."""
    cles = list(chap)
    debuts = [0.0] + [t[c] for c in cles[1:]]
    res = []
    for i, c in enumerate(cles):
        fin = debuts[i + 1] if i + 1 < len(cles) else duree
        if res and fin - debuts[i] < 10:
            print("  chapitre fondu :", c, chap[c], file=sys.stderr)
            continue
        res.append((debuts[i], chap[c]))
    return [[mmss(d), lib] for d, lib in res]


def entrees():
    temps = json.loads(TEMPS.read_text(encoding="utf-8"))
    out = []
    for e in EP:
        n, slug = e["n"], e["slug"]
        dos = f"6e/maths/decimaux/{n:02d}-{slug}"
        nom = f"eleveai-maths-6e-decimal-{slug}"
        ident = f"6e-decimal-{slug}"
        page = e["notion"].replace("_", "-")
        fiche = f"https://www.eleveai.fr/fiches-cours/maths/6e/{page}"
        exos = f"https://www.eleveai.fr/fiches-exercices/maths/6e/{page}"
        coach = COACH.format(notion=e["notion"], micro=e["micro"])
        voix = json.loads((VOIX / f"{ident}.json").read_text(encoding="utf-8"))
        t = temps[ident]
        titre = f"{e['titre']} — {e['nom']} — épisode {n} · Maths 6e"
        acc = e["intro"] + "\n\nDans cette vidéo :\n" + "\n".join("• " + p for p in e["points"])
        acc += f"\n\n⏸ 2 questions-pauses : mets pause, et choisis !\n🥋 Ceinture verte.\nUn défi en fin de vidéo, avec sa correction : {e['defi']}."
        acc += f"\n\nPour s'entraîner :\n• la fiche de cours : {fiche}\n• les exercices corrigés : {exos}\n• la série du coach sur cette compétence : {coach}"
        acc += f"\n\n🔢 Épisode {n} sur 12 de la série Nombres décimaux d'EleveAI, en 6e."
        qs = [dict(t=mmss(t["clips"][c]), **question(voix, c)) for c in voix if c.endswith("-question")]
        out.append({
            "id": ident, "pas_avant": PAS_AVANT, "notionId": e["notion"], "microId": e["micro"], "classe": "6e",
            "ceinture": "verte", "serie": "Maths 6e", "type": "longue", "fichier": f"{dos}/{nom}.mp4", "miniature": f"{dos}/{nom}.png",
            "titre": titre, "accroche": acc, "chapitres": chapitres(e["chap"], t["clips"], t["duree"]),
            "fiche": fiche, "fiche_exercices": exos, "tags": e["tags"] + COMMUNS, "questions": qs, "centres": e["centres"],
        })
        sv = json.loads((VOIX / f"{ident}-short.json").read_text(encoding="utf-8"))
        ts = temps[f"{ident}-short"]
        stitre = f"{e['s_titre']} #maths #6e"
        sacc = e["s_accroche"] + f"\n\nFilm d'animation 3D, voix de synthèse.\n🥋 {CEINTURE_SHORT[e['s_ceinture']]}\n👉 À toi : {e['s_toi']} Réponds en commentaire !"
        sacc += f"\n\n▶️ L'épisode complet : {{{{LONGUE}}}}\n🎯 Le coach : {coach}\n\nFait à La Réunion 🌋 — Frédéric Lacoste\n\n#Shorts #maths #decimaux #6e #collège"
        out.append({
            "id": f"{ident}-short", "pas_avant": PAS_AVANT, "notionId": e["notion"], "microId": e["micro"], "classe": "6e",
            "ceinture": e["s_ceinture"], "serie": "Maths 6e", "type": "short", "renvoie_vers": ident,
            "fichier": f"{dos}/{nom}-short.mp4", "miniature": f"{dos}/{nom}-short-miniature.png",
            "titre": stitre, "accroche": sacc,
            "tags": e["s_tags"] + ["Ti Margo", "film d'animation 3D", f"ceinture {e['s_ceinture']}"] + COMMUNS + ["Shorts"],
            "questions": [dict(t=mmss(ts["clips"][c]), **question(sv, c)) for c in sv if c.endswith("-question")],
            "centres": e["s_centres"],
        })
        for x in (titre, stitre):
            if len(x) > 100:
                print(f"TITRE TROP LONG ({len(x)}) : {x}", file=sys.stderr)
    return out


def main():
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    mode = sys.argv[1]
    if mode == "temps":
        res = {}
        for e in EP:
            for suf in ("", "-short"):
                nom = f"6e-decimal-{e['slug']}{suf}"
                mp4 = SERIE / f"{e['n']:02d}-{e['slug']}" / f"eleveai-maths-{nom}.mp4"
                clips, duree = mesurer(nom, mp4)
                res[nom] = {"duree": duree, "clips": clips}
                print(nom, duree, "fin", clips[list(clips)[-1]])
        TEMPS.write_text(json.dumps(res, ensure_ascii=False, indent=1), encoding="utf-8")
    elif mode == "voir":
        print(json.dumps(entrees(), ensure_ascii=False, indent=1))
    elif mode == "manifeste":
        sauve = Path(tempfile.gettempdir()) / "manifeste-youtube.avant-decimaux.json"
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
