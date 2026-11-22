# passe_affines_3e.py
# Passe finale de la série FONCTIONS AFFINES 3e (22/11/2026), 9 épisodes du dossier fonctions-affines :
# les 18 entrées du manifeste. Copie de passe_identites_3e.py.
# Shorts Manim (pas de dessin animé en 3e), une paire par jour, prioritaire (du 02/07 au 10/07/2027,
# juste après 3e-identites-resoudre le 01/07/2027).
# Les temps des chapitres et des questions sont relevés dans l'AUDIO des mp4 (passe_distributivite.mesurer),
# jamais estimés ; un chapitre de moins de 10 s est fondu dans le précédent (passe_decimaux.chapitres).
# Le manifeste a des modifications non commitées d'autres sessions : on relit la copie de travail et on
# ajoute seulement nos 18 entrées 3e-affine-<slug>[-short].
#
#   python manim/passe_affines_3e.py temps [filtre] → manim/sorties/3e/maths/fonctions-affines/temps-affines.json
#   python manim/passe_affines_3e.py voir           → affiche les entrées sans rien écrire
#   python manim/passe_affines_3e.py manifeste      → ajoute ou remplace les 18 entrées
#   python manim/passe_affines_3e.py coupes         → les valeurs de COUPE_PAR_VIDEO (LecteurVideo.tsx)
import json
import shutil
import sys
import tempfile
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from passe_distributivite import mesurer, mmss  # noqa: E402
from passe_decimaux import chapitres  # noqa: E402

RACINE = Path(__file__).resolve().parents[1]
SERIE = RACINE / "manim" / "sorties" / "3e" / "maths" / "fonctions-affines"
MANIFESTE = RACINE / "manim" / "manifeste-youtube.json"
TEMPS = SERIE / "temps-affines.json"
NOTION = "affine_fonction"
COURS = "https://www.eleveai.fr/fiches-cours/maths/3e/affine-fonction"


def coach(notion, micro):
    return f"https://www.eleveai.fr/coach/serie?classe=3e&matiere=maths&notion={notion}&microId={micro}&display=simple"


EPS = [
    dict(num="01", slug="reconnaitre", n=1, micro="affine_reconnaitre", date="2027-07-02", ceinture="jaune", sc="jaune",
         centres=["reseaux-sociaux", "argent-budget"], scentres=["jeux-defis"],
         titre="f(x) = 3 − 2x est-elle affine ? Reconnaître une fonction affine — épisode 1 · Maths 3e",
         intro="Maya est monteuse vidéo. Un client la paie 20 € la minute, un autre 50 € le projet plus 15 € la minute, un troisième veut des miniatures carrées de x cm de côté. f(x) = 20x, g(x) = 15x + 50, h(x) = x² : lesquelles sont affines ?",
         puces=["une fonction affine s'écrit ax + b : pour g(x) = 15x + 50, a = 15 et b = 50",
                "si b = 0, elle est linéaire : f(x) = 20x, le prix est proportionnel à la durée",
                "x², c'est x × x : h n'est pas affine, sa courbe n'est pas une droite",
                "sur le graphique : des droites pour f et g, f passe par l'origine",
                "les fonctions déguisées : 5(x + 10) = 5x + 50 ; on développe et on réduit avant de décider",
                "un tarif fixe, 0 × x + 100 : a = 0, la fonction est constante, sa droite est horizontale"],
         defi="f(x) = 2(x + 3) et g(x) = x(x + 1) − x² sont-elles affines ?",
         chap={"00-garde": "Affine ou pas ?", "01-monteuse": "Maya, monteuse vidéo", "02-forme": "La forme ax + b",
               "03-droites": "Des droites et une courbe", "03q-question": "Question 1", "04-deguisee": "Les fonctions déguisées",
               "05q-question": "Question 2", "06-defi": "À toi de jouer", "06b-correction": "Correction",
               "07-finale": "Ce que tu as appris"},
         qs=[("03q-question", "Laquelle de ces fonctions est affine ?", ["x² + 3", "3 ÷ x", "3 − 2x"], 2,
              "3 − 2x = −2x + 3 : a = −2 et b = 3. L'ordre des termes ne change rien."),
             ("05q-question", "f(x) = 4x. Comment l'appeler ?",
              ["linéaire, et aussi affine", "linéaire, mais pas affine", "ni l'une ni l'autre"], 0,
              "4x = 4x + 0 : b = 0, donc f est linéaire. Une fonction linéaire est une fonction affine particulière.")],
         tags=["fonction affine", "fonction linéaire", "reconnaître une fonction affine", "ax + b", "fonction constante",
               "monteuse vidéo"],
         st="(x + 1)² − x² a l'air compliquée… et si elle était affine ? 🔍 — 3e #Shorts",
         sq=("01q-question", "Laquelle est linéaire ?", ["5x + 1", "5x", "x²"], 1,
             "5x = 5x + 0 : sa droite passe par l'origine."),
         sa="f(x) = (x + 1)² − x². On développe : x² + 2x + 1 − x². Les x² s'annulent.\nIl reste 2x + 1 : f est affine !",
         stoi="f(x) = 3(x + 2) − 6. Linéaire ou affine ? Réponds en commentaire !",
         stags=["fonction affine", "fonction linéaire", "développer"]),
    dict(num="02", slug="coeff-directeur", n=2, micro="affine_coeff_directeur", date="2027-07-03", ceinture="orange", sc="orange",
         centres=["jeux-video", "technologie-ia"], scentres=["technologie-ia"],
         titre="f(x) = 3x + 10 : que dit le 3 ? Le coefficient directeur — épisode 2 · Maths 3e",
         intro="Inès développe un jeu vidéo. Son héros commence avec 10 points d'énergie et en gagne 3 par seconde : f(x) = 3x + 10. Que dit ce 3 ? Et quand la batterie de son téléphone perd 2 % par minute ?",
         puces=["a, le coefficient directeur : de combien f augmente quand x augmente de 1",
                "sur la droite : un carreau vers la droite, a carreaux vers le haut ; plus a est grand, plus elle est raide",
                "a négatif : g(x) = −2x + 80, la droite descend, la fonction est décroissante",
                "a est le nombre devant x, avec son signe",
                "avec deux points : a = écart des images ÷ écart des x",
                "le piège : oublier de diviser par l'écart des x"],
         defi="f(x) = 5 − 3x est-elle croissante ou décroissante ? Et combien vaut a pour la droite qui passe par (−1 ; 4) et (2 ; −5) ?",
         chap={"00-garde": "Le nombre devant x", "01-developpeuse": "Inès, développeuse de jeux vidéo",
               "02-coefficient": "Le coefficient directeur", "03-negatif": "a négatif : la droite descend",
               "03q-question": "Question 1", "04-deux-points": "a avec deux points", "05q-question": "Question 2",
               "06-defi": "À toi de jouer", "06b-correction": "Correction", "07-finale": "Ce que tu as appris"},
         qs=[("03q-question", "f(x) = −4x + 7. Quel est son coefficient directeur ?", ["7", "−4", "4"], 1,
              "a est le nombre devant x, avec son signe : −4, la droite descend."),
             ("05q-question", "Une droite passe par (1 ; 3) et (3 ; 11). Combien vaut a ?", ["8", "0,25", "4"], 2,
              "Les images gagnent 8, les x gagnent 2 : 8 ÷ 2 = 4. Pas 8 : il faut diviser par l'écart des x.")],
         tags=["fonction affine", "coefficient directeur", "croissante", "décroissante", "ax + b", "jeu vidéo"],
         st="Ta batterie perd 4 % par heure : où est le coefficient directeur ? 🔍 — 3e #Shorts",
         sq=("01q-question", "Une plante mesure 5 cm et grandit de 2 cm par semaine. Combien vaut a ?", ["2", "5", "7"], 0,
             "a, c'est ce qui change chaque semaine : 2 cm. Le 5, c'est le départ."),
         sa="Batterie pleine : 100 %. Après x heures : f(x) = −4x + 100.\nLe coefficient directeur, c'est −4 : chaque heure, la droite descend de 4. Le signe moins, c'est la baisse.",
         stoi="au bout de combien d'heures la batterie est-elle vide ? Réponds en commentaire !",
         stags=["coefficient directeur", "fonction affine", "batterie"]),
    dict(num="03", slug="ordonnee-origine", n=3, micro="affine_ordonnee_origine", date="2027-07-04", ceinture="orange", sc="jaune",
         centres=["transports", "argent-budget"], scentres=["sport"],
         titre="f(0) = 300 € : l'ordonnée à l'origine, la valeur de départ — épisode 3 · Maths 3e",
         intro="Léo est moniteur d'auto-école. L'inscription coûte 300 €, puis chaque heure de conduite 45 € : f(x) = 45x + 300. Que vaut f avant la première heure ? Et comment retrouver un prix d'inscription caché ?",
         puces=["b, l'ordonnée à l'origine : f(0) = 45 × 0 + 300 = 300, la valeur de départ",
                "sur le graphique, la droite coupe l'axe vertical en b",
                "b est le nombre seul, avec son signe : pour 7x − 5, b = −5",
                "retrouver b avec un point connu : 50 × 20 + b = 1 400, donc b = 400",
                "le piège : on enlève, on n'ajoute pas"],
         defi="trouve b si f(x) = −2x + b et f(4) = 1 ; puis si a = 0,5 et la droite passe par (6 ; 5).",
         chap={"00-garde": "Quand x vaut 0", "01-moniteur": "Léo, moniteur d'auto-école", "02-depart": "f(0), la valeur de départ",
               "03-axe": "Lire b sur l'axe vertical", "03q-question": "Question 1", "04-retrouver": "Retrouver b",
               "05q-question": "Question 2", "06-defi": "À toi de jouer", "06b-correction": "Correction",
               "07-finale": "Ce que tu as appris"},
         qs=[("03q-question", "f(x) = 7x − 5. Quelle est son ordonnée à l'origine ?", ["−5", "7", "5"], 0,
              "b, c'est le nombre seul, avec son signe : f(0) = −5."),
             ("05q-question", "f(x) = 3x + b et f(2) = 10. Combien vaut b ?", ["16", "4", "7"], 1,
              "3 × 2 = 6, et 6 + b = 10 : b = 4. Pas 16 : on enlève 6, on ne l'ajoute pas.")],
         tags=["fonction affine", "ordonnée à l'origine", "f(0)", "ax + b", "auto-école", "permis de conduire"],
         st="20 € par mois : pourquoi la droite ne part pas de zéro ? 🔍 — 3e #Shorts",
         sq=("01q-question", "f(x) = 20x + 30. Combien vaut f(0) ?", ["20", "50", "30"], 2,
             "20 × 0 = 0 : il reste 30, l'ordonnée à l'origine."),
         sa="Salle de sport : 20 € par mois, et 30 € de frais d'inscription. Après x mois : f(x) = 20x + 30.\nf(0) = 30 : la droite coupe l'axe vertical à 30, c'est l'ordonnée à l'origine.",
         stoi="une droite coupe l'axe vertical à −2 et monte de 3 à chaque pas. Quelle est sa fonction ? Réponds en commentaire !",
         stags=["ordonnée à l'origine", "fonction affine", "salle de sport"]),
    dict(num="04", slug="calcul-image", n=4, micro="affine_calcul_image", date="2027-07-05", ceinture="jaune", sc="jaune",
         centres=["sport", "sciences"], scentres=["sciences"],
         titre="f(−2) = ? Calculer l'image d'un nombre par une fonction affine — épisode 4 · Maths 3e",
         intro="Samir est moniteur de plongée. Sous l'eau, la pression augmente avec la profondeur : à x mètres, p(x) = 0,1x + 1 bars. Quelle pression à 20 mètres ? On remplace x, et on calcule dans le bon ordre.",
         puces=["calculer une image : on remplace x par le nombre ; p(20) = 0,1 × 20 + 1 = 3",
                "on écrit p(20) = 3 : 3 est l'image de 20",
                "d'abord la multiplication, ensuite l'addition",
                "le tableau de Samir : 2 bars à 10 m, 4 bars à 30 m, 4,5 bars à 35 m",
                "un nombre négatif se met entre parenthèses : f(−2) = −3 × (−2) + 5 = 11",
                "le piège : l'erreur de signe"],
         defi="f(x) = 3x − 4 : calcule f(−1), puis f(0,5).",
         chap={"00-garde": "Un nombre précis", "01-plongee": "Samir, moniteur de plongée", "02-calcul": "p(20) = 3",
               "03-tableau": "Le tableau de Samir", "03q-question": "Question 1", "04-negatif": "Avec un nombre négatif",
               "05q-question": "Question 2", "06-defi": "À toi de jouer", "06b-correction": "Correction",
               "07-finale": "Ce que tu as appris"},
         qs=[("03q-question", "f(x) = 4x − 7. Combien vaut f(5) ?", ["27", "−8", "13"], 2,
              "4 × 5 = 20, et 20 − 7 = 13. Pas −8 : on multiplie d'abord, on ne calcule pas 5 − 7."),
             ("05q-question", "f(x) = −2x + 3. Combien vaut f(−4) ?", ["−5", "11", "−11"], 1,
              "−2 × (−4) = +8, et 8 + 3 = 11. −5, c'est l'erreur de signe.")],
         tags=["fonction affine", "calculer une image", "image d'un nombre", "nombres relatifs", "plongée", "pression"],
         st="40 m sous l'eau : la pression 4 fois plus forte qu'à 10 m ? 🔍 — 3e #Shorts",
         sq=("01q-question", "Avec p(x) = 0,1x + 1, combien vaut p(50) ?", ["6", "5", "51"], 0,
             "0,1 × 50 = 5, plus 1 : 6 bars."),
         sa="La pression sous l'eau : p(x) = 0,1x + 1. À 10 mètres : 2 bars. À 40 mètres : 5 bars. Pas 8 !\nUne fonction affine n'est pas proportionnelle.",
         stoi="à quelle profondeur la pression vaut-elle 3,5 bars ? Réponds en commentaire !",
         stags=["calculer une image", "fonction affine", "plongée"]),
    dict(num="05", slug="expression", n=5, micro="affine_expression", date="2027-07-06", ceinture="verte", sc="verte",
         centres=["nature-ecologie", "sciences"], scentres=["jeux-defis"],
         titre="Deux mesures, une fonction : trouver l'expression f(x) = ax + b — épisode 5 · Maths 3e",
         intro="Awa est technicienne en environnement. Un jeune baobab mesure 70 cm à 2 ans et 160 cm à 5 ans. Sa croissance est régulière : sa hauteur est une fonction affine de son âge. Mais laquelle ?",
         puces=["d'abord a : écart des images ÷ écart des x ; 90 ÷ 3 = 30 cm par an",
                "puis b : on remplace un point connu ; 30 × 2 + b = 70, donc b = 10",
                "f(x) = 30x + 10, et on vérifie avec l'autre point : 150 + 10 = 160",
                "a = 2 et f(0) = −3 : f(x) = 2x − 3",
                "parfois une phrase suffit : 500 litres, 20 litres de moins par jour, f(x) = −20x + 500"],
         defi="trouve f si f(−1) = 7 et f(2) = −2 ; puis si f est linéaire et f(4) = 10.",
         chap={"00-garde": "Deux mesures suffisent ?", "01-technicienne": "Awa, technicienne en environnement",
               "02-coefficient": "D'abord a", "03-ordonnee": "Puis b, et on vérifie", "03q-question": "Question 1",
               "04-phrase": "Une phrase suffit", "05q-question": "Question 2", "06-defi": "À toi de jouer",
               "06b-correction": "Correction", "07-finale": "Ce que tu as appris"},
         qs=[("03q-question", "Une fonction affine a pour coefficient directeur 2, et f(0) = −3. Quelle est son expression ?",
              ["2x − 3", "−3x + 2", "2x + 3"], 0, "a = 2, et f(0), c'est b : −3. Donc 2x − 3."),
             ("05q-question", "f(1) = 5 et f(3) = 11. Quelle est l'expression de f ?", ["6x − 1", "3x + 5", "3x + 2"], 2,
              "Les images gagnent 6, les x gagnent 2 : a = 3. Puis 3 × 1 + b = 5 : b = 2. On vérifie : 3 × 3 + 2 = 11.")],
         tags=["fonction affine", "expression d'une fonction affine", "coefficient directeur", "ordonnée à l'origine",
               "baobab", "environnement"],
         st="Deux nombres, et tu retrouves toute une fonction affine 🔍 — 3e #Shorts",
         sq=("01q-question", "f(0) = 4 et f(1) = 6. Quelle est l'expression de f ?", ["4x + 6", "2x + 4", "6x + 4"], 1,
             "f(0), c'est b : 4. De 0 à 1, f gagne 2 : a = 2."),
         sa="f(2) = 9 et f(5) = 18. Les images gagnent 9, les x gagnent 3 : a = 3. Puis 3 × 2 + b = 9 : b = 3.\nf(x) = 3x + 3. On vérifie : 15 + 3 = 18 !",
         stoi="f(1) = 2 et f(4) = −7. Quelle est l'expression de f ? Réponds en commentaire !",
         stags=["expression d'une fonction affine", "fonction affine", "deux points"]),
    dict(num="06", slug="graphique", n=6, micro="affine_graphique", date="2027-07-07", ceinture="verte", sc="orange",
         centres=["reseaux-sociaux", "sport"], scentres=["technologie-ia"],
         titre="Que nous dit une droite ? Lire une fonction affine sur un graphique — épisode 6 · Maths 3e",
         intro="Clara est community manager. Elle lance le compte d'un club de basket : 200 abonnés au départ, puis 50 de plus chaque jour. Elle trace la droite. Combien d'abonnés après 4 jours ? Quand atteindra-t-on 600 ?",
         puces=["lire une image : on part de l'axe horizontal, on monte à la droite, on va à gauche ; l'image de 4 est 400",
                "lire un antécédent : on part de l'axe vertical ; 8 est l'antécédent de 600",
                "lire b : là où la droite coupe l'axe vertical",
                "lire a : ce que la droite monte pour un pas vers la droite",
                "la droite donne l'expression sans calculer : f(x) = 50x + 200"],
         defi="sur le graphique, lis l'antécédent de 0, puis l'expression de la droite.",
         chap={"00-garde": "Que dit une droite ?", "01-community": "Clara, community manager", "02-image": "Lire une image",
               "03-antecedent": "Lire un antécédent", "03q-question": "Question 1", "04-expression": "Lire l'expression",
               "05q-question": "Question 2", "06-defi": "À toi de jouer", "06b-correction": "Correction",
               "07-finale": "Ce que tu as appris"},
         qs=[("03q-question", "La droite passe par (0 ; 1) et par (2 ; 5). Combien vaut f(3) ?", ["6", "7", "3"], 1,
              "À chaque pas vers la droite, elle monte de 2. À 3 : 1 + 3 × 2 = 7."),
             ("05q-question", "Une droite coupe l'axe vertical à 4 et descend d'un carreau à chaque pas vers la droite. Quelle est son expression ?",
              ["−x + 4", "x + 4", "4x − 1"], 0, "b = 4, et elle descend de 1 à chaque pas : a = −1. Donc −x + 4.")],
         tags=["fonction affine", "lecture graphique", "image", "antécédent", "droite", "community manager", "basket"],
         st="Ce graphique sait quand ton forfait internet sera vide 🔍 — 3e #Shorts",
         sq=("01q-question", "Lis sur la droite : combien reste-t-il après 4 jours ?", ["8 gigas", "16 gigas", "12 gigas"], 2,
             "4 jours à 2 gigas par jour : 8 gigas utilisés. 20 − 8 = 12 gigas."),
         sa="Ton forfait : 20 gigas, et tu en utilises 2 par jour. La droite part de 20 et descend de 2 chaque jour.\nElle touche l'axe horizontal à 10 : ton forfait est vide au bout de 10 jours.",
         stoi="avec 30 gigas, et 2 gigas par jour, au bout de combien de jours le forfait est-il vide ? Réponds en commentaire !",
         stags=["lecture graphique", "fonction affine", "forfait internet"]),
    dict(num="07", slug="tracer", n=7, micro="affine_tracer", date="2027-07-08", ceinture="orange", sc="jaune",
         centres=["cuisine", "sciences"], scentres=["jeux-defis"],
         titre="Deux points suffisent : tracer la droite de f(x) = 20x + 30 — épisode 7 · Maths 3e",
         intro="Yanis est boulanger. À 4 heures du matin, il allume son four : 30 degrés, et il chauffe de 20 degrés par minute. f(x) = 20x + 30. Combien de points faut-il pour tracer sa montée ?",
         puces=["une fonction affine se représente par une droite : deux points suffisent",
                "on choisit deux x faciles : f(0) = 30 et f(5) = 130, on place (0 ; 30) et (5 ; 130)",
                "on relie à la règle et on prolonge",
                "un troisième point sert à vérifier : (10 ; 230) est bien sur la droite",
                "si a est négatif, la droite descend : g(x) = −2x + 3 passe par (0 ; 3) et (2 ; −1)",
                "un point n'est pas sur la droite si son image ne correspond pas"],
         defi="dans un même repère, trace f(x) = −x + 4 et g(x) = 0,5x.",
         chap={"00-garde": "Combien de points ?", "01-boulanger": "Yanis, boulanger", "02-points": "Deux points suffisent",
               "03-droite": "On relie, on vérifie", "03q-question": "Question 1", "04-descend": "a négatif : la droite descend",
               "05q-question": "Question 2", "06-defi": "À toi de jouer", "06b-correction": "Correction",
               "07-finale": "Ce que tu as appris"},
         qs=[("03q-question", "Quelle droite représente f(x) = 2x − 1 ?",
              ["elle passe par (0 ; 2) et (1 ; 1)", "par (0 ; 1) et (1 ; 3)", "par (0 ; −1) et (1 ; 1)"], 2,
              "f(0) = −1 et f(1) = 2 − 1 = 1 : la droite passe par (0 ; −1) et (1 ; 1)."),
             ("05q-question", "Quel point n'est PAS sur la droite de f(x) = x + 2 ?", ["(3 ; 4)", "(0 ; 2)", "(2 ; 4)"], 0,
              "f(3) = 3 + 2 = 5, pas 4 : le point (3 ; 4) est en dessous de la droite.")],
         tags=["fonction affine", "tracer une droite", "représentation graphique", "repère", "boulanger", "four"],
         st="Une droite sur toute ta feuille : combien de calculs ? Deux ! 🔍 — 3e #Shorts",
         sq=("01q-question", "Pour tracer f(x) = 2x + 1, quels deux points places-tu ?",
             ["(0 ; 1) et (1 ; 3)", "(0 ; 2) et (1 ; 1)", "(1 ; 1) et (2 ; 2)"], 0,
             "f(0) = 1, et f(1) = 2 + 1 = 3."),
         sa="f(x) = 3x − 2. f(0) = −2. f(2) = 6 − 2 = 4. Deux points, une règle : la droite est tracée.\nUn troisième point ? Seulement pour vérifier.",
         stoi="quels deux points choisis-tu pour tracer f(x) = −x + 5 ? Réponds en commentaire !",
         stags=["tracer une droite", "fonction affine", "représentation graphique"]),
    dict(num="08", slug="probleme", n=8, micro="affine_probleme", date="2027-07-09", ceinture="verte", sc="verte",
         centres=["cinema-series", "argent-budget"], scentres=["transports"],
         titre="9 € la place ou une carte à 24 € ? Quel tarif choisir — épisode 8 · Maths 3e",
         intro="Manon dirige un cinéma. Tarif A : 9 € la place. Tarif B : une carte à 24 €, puis 5 € la place. Un client lui demande lequel est le moins cher. Ça dépend… du nombre de séances !",
         puces=["modéliser : on nomme x, puis f(x) = 9x et g(x) = 5x + 24",
                "comparer en calculant des images : 4 séances, le tarif A gagne ; 10 séances, le tarif B",
                "quand les prix sont égaux : 9x = 5x + 24, donc x = 6",
                "sur le graphique, les deux droites se croisent en 6",
                "au-delà de 6 séances, la carte est plus avantageuse",
                "on vérifie : même prix des deux côtés"],
         defi="un plombier facture 40 € de déplacement plus 30 € de l'heure, un autre 50 € de l'heure : lequel est le moins cher pour 3 heures, et pour quelle durée paie-t-on pareil ?",
         chap={"00-garde": "Quel tarif choisir ?", "01-cinema": "Manon, directrice de cinéma", "02-modeliser": "Deux fonctions",
               "03-comparer": "On compare", "03q-question": "Question 1", "04-egalite": "Quand les prix sont égaux",
               "05q-question": "Question 2", "06-defi": "À toi de jouer", "06b-correction": "Correction",
               "07-finale": "Ce que tu as appris"},
         qs=[("03q-question", "Pour 3 séances, combien paie-t-on avec le tarif B ?", ["39 €", "27 €", "32 €"], 0,
              "5 × 3 = 15, et 15 + 24 = 39 €. Pas 27 : ça, c'est le tarif A."),
             ("05q-question", "Une appli de musique coûte 4 € par mois. Une autre coûte 10 € à l'inscription, plus 2 € par mois. Au bout de combien de mois coûtent-elles pareil ?",
              ["2 mois", "5 mois", "10 mois"], 1, "4x = 2x + 10, donc 2x = 10 et x = 5. On vérifie : 20 € des deux côtés.")],
         tags=["fonction affine", "problème", "comparer deux tarifs", "équation", "droites qui se croisent", "cinéma"],
         st="Trottinette : quelle appli est la moins chère ? Ça dépend de ton trajet ! 🔍 — 3e #Shorts",
         sq=("01q-question", "Au bout de combien de minutes les deux applis coûtent-elles pareil ?",
             ["5 minutes", "20 minutes", "10 minutes"], 2,
             "0,2x + 1 = 0,3x, donc 0,1x = 1 : x = 10. Pour 10 minutes, 3 € des deux côtés."),
         sa="Appli A : 1 € pour débloquer, puis 20 centimes la minute. Appli B : 30 centimes la minute, sans frais.\n5 minutes : B gagne. 20 minutes : A gagne ! Les deux droites se croisent.",
         stoi="pour un trajet de 30 minutes, quelle appli choisis-tu, et combien paies-tu ? Réponds en commentaire !",
         stags=["comparer deux tarifs", "fonction affine", "trottinette"]),
    dict(num="09", slug="defi", n=9, micro="affine_defi", date="2027-07-10", ceinture="bleue", sc="bleue",
         centres=["jeux-defis", "sciences"], scentres=["jeux-defis"],
         titre="Deux cuves, une équation : défis fonctions affines, niveau brevet — épisode 9 · Maths 3e",
         intro="Jade est cheffe de chantier. La cuve A contient 1 200 litres et se vide de 40 litres par minute ; la cuve B est vide et se remplit de 20 litres par minute. Quand auront-elles le même volume ? Des défis niveau brevet.",
         puces=["traduire en fonctions : f(x) = −40x + 1 200 et g(x) = 20x",
                "même volume : f(x) = g(x), donc 1 200 = 60x et x = 20 ; 400 litres chacune",
                "la cuve est vide quand f(x) = 0 : 30 minutes",
                "un programme de calcul cache une fonction affine : 3x + 6 − 2x = x + 6",
                "le point où deux droites se croisent : on résout f(x) = g(x), puis on calcule l'image"],
         defi="f(x) = 2x + 1 et g(x) = −x + 7 : pour quelle valeur de x a-t-on f(x) = g(x), et où les droites se croisent-elles ?",
         chap={"00-garde": "Niveau brevet", "01-chantier": "Jade, cheffe de chantier", "02-fonctions": "f(x) = g(x)",
               "03q-question": "Question 1", "04-programme": "Un programme de calcul", "05q-question": "Question 2",
               "06-defi": "Défi final", "06b-correction": "Correction", "07-finale": "Ce que tu as appris"},
         qs=[("03q-question", "Au bout de combien de minutes la cuve A sera-t-elle vide ?",
              ["40 minutes", "30 minutes", "1 200 minutes"], 1,
              "La cuve est vide quand f(x) = 0 : −40x + 1 200 = 0, donc 40x = 1 200 et 1 200 ÷ 40 = 30."),
             ("05q-question", "Programme : choisis un nombre, ajoute 2, multiplie par 5, puis enlève 10. Quelle fonction obtient-on ?",
              ["5x + 2", "5x − 10", "5x"], 2, "5(x + 2) = 5x + 10, et − 10 : il reste 5x. Une fonction linéaire !")],
         tags=["fonction affine", "brevet", "programme de calcul", "équation", "droites qui se croisent", "chantier"],
         st="Pense à un nombre : je vais deviner ton résultat 🔍 — 3e #Shorts",
         sq=("01q-question", "Programme : multiplie par 2, ajoute 10, divise par 2, enlève ton nombre. Que trouves-tu toujours ?",
             ["10", "5", "ton nombre"], 1, "(2x + 10) ÷ 2 = x + 5. Moins x : il reste 5."),
         sa="Pense à un nombre. Multiplie-le par 4, ajoute 12, divise par 4, enlève ton nombre de départ : tu trouves 3 !\n(4x + 12) ÷ 4 = x + 3, moins x : il reste 3. Une fonction affine avec a = 0 : une fonction constante.",
         stoi="invente un programme de calcul qui donne toujours 7. Réponds en commentaire !",
         stags=["programme de calcul", "fonction constante", "tour de magie"]),
]

COMMUNS = ["maths", "3e", "collège", "cycle 4", "brevet", "CRPE", "EleveAI"]


def dossier(e):
    return f"{e['num']}-{e['slug']}"


def script(e):
    return "affine_" + e["slug"].replace("-", "_")


def lire_temps():
    if not TEMPS.exists():
        raise SystemExit(f"Fichier des temps absent : {TEMPS}\n"
                         "Rends d'abord les mp4, puis lance : python manim/passe_affines_3e.py temps")
    return json.loads(TEMPS.read_text(encoding="utf-8"))


def chap0(ch):
    """passe_decimaux.chapitres ne fond jamais le PREMIER chapitre : « 00:00 accroche » puis « 00:07 métier »
    faisait un chapitre de 7 s, et YouTube refuse alors TOUS les chapitres. Le 2e est fondu dans le 1er."""
    def sec(m):
        mm, ss = m.split(":")
        return int(mm) * 60 + int(ss)
    if len(ch) > 1 and sec(ch[1][0]) < 10:
        print("  chapitre fondu (début) :", ch[1][1], file=sys.stderr)
        ch = [ch[0]] + ch[2:]
    return ch


def entrees():
    temps = lire_temps()
    manque = [f"3e-affine-{e['slug']}{s}" for e in EPS for s in ("", "-short") if f"3e-affine-{e['slug']}{s}" not in temps]
    if manque:
        raise SystemExit("Pas de temps pour : " + ", ".join(manque) + "\n(mp4 pas encore rendu ? relance `temps` après le rendu)")
    out = []
    for e in EPS:
        slug = e["slug"]
        dos = f"3e/maths/fonctions-affines/{dossier(e)}"
        nom = f"eleveai-maths-3e-affine-{slug}"
        ident = f"3e-affine-{slug}"
        micro = e["micro"]
        tp = temps[ident]
        t = tp["clips"]
        acc = e["intro"] + "\n\nDans cette vidéo :\n" + "\n".join("• " + p for p in e["puces"])
        acc += f"\n\n⏸ 2 questions-pauses : mets pause, et choisis !\n🥋 Ceinture {e['ceinture']}.\nUn défi en fin de vidéo, avec sa correction : {e['defi']}"
        acc += f"\n\nPour s'entraîner :\n• la fiche de cours : {COURS}\n• la série du coach sur cette compétence : {coach(NOTION, micro)}"
        acc += f"\n\n🔢 Épisode {e['n']} de la série Fonctions affines d'EleveAI, en 3e."
        qs = [{"t": mmss(t[c]), "question": q, "choix": ch, "reponse": r, "explication": x} for c, q, ch, r, x in e["qs"]]
        out.append({
            "id": ident, "pas_avant": e["date"], "prioritaire": True, "notionId": NOTION, "microId": micro, "classe": "3e",
            "ceinture": e["ceinture"], "serie": "Maths 3e", "type": "longue", "fichier": f"{dos}/{nom}.mp4", "miniature": f"{dos}/{nom}.png",
            "titre": e["titre"], "accroche": acc, "chapitres": chap0(chapitres(e["chap"], t, tp["duree"])), "fiche": COURS,
            "tags": e["tags"] + COMMUNS, "questions": qs, "centres": e["centres"],
        })
        ts = temps[f"{ident}-short"]["clips"]
        c, q, ch, r, x = e["sq"]
        sacc = e["sa"] + f"\n\nVoix de synthèse.\n🥋 Ceinture {e['sc']}.\n👉 À toi : {e['stoi']}"
        sacc += f"\n\n▶️ L'épisode complet : {{{{LONGUE}}}}\n🎯 Le coach : {coach(NOTION, micro)}\n\nFait à La Réunion 🌋 — Frédéric Lacoste\n\n#Shorts #maths #fonctionaffine #3e #brevet"
        out.append({
            "id": f"{ident}-short", "pas_avant": e["date"], "prioritaire": True, "notionId": NOTION, "microId": micro, "classe": "3e",
            "ceinture": e["sc"], "serie": "Maths 3e", "type": "short", "renvoie_vers": ident,
            "fichier": f"{dos}/{nom}-short.mp4", "miniature": f"{dos}/{nom}-short.png",
            "titre": e["st"], "accroche": sacc, "tags": e["stags"] + ["fonctions affines"] + COMMUNS + [f"ceinture {e['sc']}", "Shorts"],
            "questions": [{"t": mmss(ts[c]), "question": q, "choix": ch, "reponse": r, "explication": x}], "centres": e["scentres"],
        })
        for tt in (e["titre"], e["st"]):
            if len(tt) > 100:
                print(f"TITRE TROP LONG ({len(tt)}) : {tt}", file=sys.stderr)
    return out


def coupes():
    """COUPE_PAR_VIDEO (components/LecteurVideo.tsx) : secondes retirées à la fin du mp4.
    Comme passe_distributivite.coupes (marques du clip de fin, recalées sur le mp4 par `temps`), mais
    rapportées à la durée de la VIDÉO (ffprobe) : c'est elle que le navigateur donne à `v.duration`,
    et la piste son finit ~1,3 s plus tôt.
    Paysage : au milieu de la pause entre « point f r. » et « Et si ». Short : « Mets » − 0,03 s.
    (Les 18 voix de fin des affines contiennent bien « Et si » (paysages) et « Mets » (shorts).)"""
    import subprocess
    temps = lire_temps()
    res = {}
    for e in EPS:
        for suf, scr in (("", script(e)), ("-short", f"{script(e)}_short")):
            nom = f"3e-affine-{e['slug']}{suf}"
            if nom not in temps:
                continue
            voix = json.loads((RACINE / "manim" / "voix" / f"{nom}.json").read_text(encoding="utf-8"))
            cle = [k for k in voix if k.endswith("abonne")][0]
            texte = voix[cle]
            marques = json.loads((RACINE / "manim" / "scripts" / "3e" / f"{scr}_marques.json").read_text(encoding="utf-8"))[cle]
            debut = temps[nom]["clips"][cle]
            mp4 = SERIE / dossier(e) / f"eleveai-maths-{nom}.mp4"
            duree = float(subprocess.run(["ffprobe", "-v", "error", "-select_streams", "v:0", "-show_entries",
                                          "stream=duration", "-of", "csv=p=0", str(mp4)],
                                         capture_output=True, text=True).stdout.strip())

            def instant(mot):
                return dict(marques)[texte.index(mot)]

            if suf:
                t = debut + instant("Mets")
                res[nom] = round(duree - t + 0.03, 2)
            else:
                t_et = instant("Et si")
                avant = [m for c, m in marques if m < t_et][-1]
                t = debut + (avant + t_et) / 2
                res[nom] = round(duree - t, 1)
            print(nom, "durée vidéo", round(duree, 2), "fin", cle, debut, "coupe à", round(t, 2), "→", res[nom])
    return res


def main():
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    mode = sys.argv[1]
    if mode == "temps":
        res = json.loads(TEMPS.read_text(encoding="utf-8")) if TEMPS.exists() else {}
        filtre = sys.argv[2] if len(sys.argv) > 2 else ""
        for e in EPS:
            for suf in ("", "-short"):
                nom = f"3e-affine-{e['slug']}{suf}"
                mp4 = SERIE / dossier(e) / f"eleveai-maths-{nom}.mp4"
                if filtre not in nom or not mp4.exists():
                    continue
                clips, duree = mesurer(nom, mp4)
                res[nom] = {"duree": duree, "clips": clips}
                print(nom, duree, "fin", clips[list(clips)[-1]])
        if not res:
            raise SystemExit(f"Aucun mp4 trouvé dans {SERIE} : rien à mesurer.")
        TEMPS.write_text(json.dumps(res, ensure_ascii=False, indent=1), encoding="utf-8")
    elif mode == "coupes":
        coupes()
    elif mode == "voir":
        print(json.dumps(entrees(), ensure_ascii=False, indent=1))
    elif mode == "manifeste":
        sauve = Path(tempfile.gettempdir()) / "manifeste-youtube.avant-affines-3e.json"
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
