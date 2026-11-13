# passe_suites.py
# Passe finale de la série SUITES du lycée (11/11/2026) : entrées du manifeste, AU FIL DE L'EAU
# (chaque épisode en place 2 jours avant sa date). Copie adaptée de `passe_distributivite.py`,
# dont on IMPORTE la mesure : les temps des chapitres et des questions sont relevés dans l'AUDIO
# des mp4 (corrélation avec les WAV des clips), jamais estimés.
# Calendrier validé par Frédéric le 11/11 : épisode k → paysage le 17/11 + 2(k − 1) jours, short le
# lendemain ; `prioritaire: true` partout ; le short a `renvoie_vers` = sa paysage. Les 4 vidéos
# communes (05, 13, 18, 19) portent `aussi` vers la micro de la classe du dessus.
# ⛔ Le manifeste porte parfois des modifs non commitées d'autres sessions : on sauvegarde, on lit,
# on ajoute ou remplace NOS entrées seulement, on réécrit.
#
#   python manim/passe_suites.py temps [filtre]   → temps-suites.json (dans manim/sorties/)
#   python manim/passe_suites.py manifeste        → ajoute ou remplace les entrées premiere-suite-*…
import json
import shutil
import sys
import tempfile
from datetime import date, timedelta
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from passe_distributivite import mesurer, mmss  # noqa: E402

RACINE = Path(__file__).resolve().parents[1]
SORTIES = RACINE / "manim" / "sorties"
MANIFESTE = RACINE / "manim" / "manifeste-youtube.json"
TEMPS = SORTIES / "temps-suites.json"
DEBUT = date(2026, 12, 25)  # 13/11 : après le collège (était le 17/11)
SERIE = {"premiere": "Maths 1re", "premiere-spe": "Maths 1re spé", "terminale": "Maths Tle spé"}
CLASSE_COACH = {"premiere": "premiere", "premiere-spe": "premiere-spe", "terminale": "terminale-spe"}
NOM_CLASSE = {"premiere": "1re", "premiere-spe": "1re spé", "terminale": "Tle spé"}
COMMUNS = {"premiere": ["maths", "1re", "suites", "lycée", "EleveAI"],
           "premiere-spe": ["maths", "1re spé", "spé maths", "suites", "lycée", "EleveAI"],
           "terminale": ["maths", "terminale", "spé maths", "suites", "bac", "lycée", "EleveAI"]}
EXOS = {"lin_suite_arithmetique": "https://www.eleveai.fr/fiches-exercices/maths/premiere/lin-suite-arithmetique",
        "expo_suite_geometrique": "https://www.eleveai.fr/fiches-exercices/maths/premiere/expo-suite-geometrique",
        # 12/11 : les micros explicite, variation, graphique, interpréter sont dans la notion « terme général ».
        "lin_suite_terme_general": "https://www.eleveai.fr/fiches-exercices/maths/premiere/lin-suite-terme-general",
        "expo_suite_terme_general": "https://www.eleveai.fr/fiches-exercices/maths/premiere/expo-suite-terme-general"}


def coach(classe, notion, micro):
    return (f"https://www.eleveai.fr/coach/serie?classe={CLASSE_COACH[classe]}&matiere=maths"
            f"&notion={notion}&microId={micro}&display=simple")


def dossier(e):
    return f"{e['classe']}/maths/suites/{e['num']}-{e['slug']}"


def nom_voix(e):
    return f"{e['classe']}-suite-{e['slug']}"


# ───── Les contenus (ajoutés au fil de l'eau) ─────
# chap : clé du clip de voix → titre du chapitre (le 1er est posé à 00:00).
# qs / sq : (clé du clip « …-question », question, choix, réponse 0/1/2, explication).
EPS = [
    dict(num="01", slug="arith-reconnaitre", classe="premiere", notion="lin_suite_arithmetique", micro="lin_suite_reconnaitre",
         ceinture="verte", sc="blanche", centres=["nature-ecologie", "construction"], scentres=["course-trail", "sport"],
         titre="40, 70, 100, 130 : toujours le même pas ? — Reconnaître une suite arithmétique — épisode 1 · Maths 1re",
         intro="Lucas est agriculteur : il plante des haies d'arbres autour de ses champs. 40 arbres la première année, puis 30 de plus chaque année : 40, 70, 100, 130. Comment savoir qu'une liste de nombres avance toujours du même pas ?",
         puces=["l'écart entre deux termes qui se suivent : 70 − 40 = 30, 100 − 70 = 30…", "suite arithmétique : on ajoute toujours le même nombre, la raison r", "la raison peut être négative : le silo qui perd 60 tonnes par semaine", "un motif de carreaux en croix qui grandit de 4 à chaque étape", "le piège : 2, 4, 8, 16, les écarts changent, ce n'est pas arithmétique"],
         defi="12 ; 9,5 ; 7 ; 4,5 : est-elle arithmétique ? Si oui, quelle est sa raison ?",
         chap={"00-garde": "Suite arithmétique : la reconnaître", "01-situation": "Lucas, agriculteur : la haie", "02-ecarts": "L'écart entre deux termes", "03-definition": "La raison", "04-question": "Question 1", "05-negative": "Une raison négative : le silo", "06-motif": "Un motif en croix", "07-piege": "Le piège", "08-question": "Question 2", "09-defi": "À toi de jouer", "09b-correction": "Correction", "10-finale": "Ce que tu as appris"},
         qs=[("04-question", "Laquelle de ces listes est arithmétique ?", ["3 ; 6 ; 12 ; 24", "5 ; 8 ; 12 ; 17", "20 ; 17 ; 14 ; 11"], 2, "On enlève 3 à chaque fois : c'est une suite arithmétique de raison −3."),
             ("08-question", "Les termes d'une suite sont 7 ; 11 ; 15 ; 19. Sa raison est :", ["4", "−4", "7"], 0, "11 − 7 = 4 : on calcule toujours un terme moins celui d'avant, pas l'inverse.")],
         tags=["suite arithmétique", "reconnaître une suite arithmétique", "raison", "écart", "agriculteur", "haie"],
         st="10, 13, 16, 19 : tu repères le pas en 3 secondes ? 🏃‍♀️ — 1re #Shorts",
         sq=("03-question", "Laquelle avance toujours du même pas ?", ["2 ; 4 ; 8 ; 16", "50 ; 45 ; 40 ; 35", "1 ; 4 ; 9 ; 16"], 1, "On enlève 5 à chaque fois : la raison est −5."),
         sa="Inès prépare un marathon : chaque semaine, elle court 3 kilomètres de plus. 10, 13, 16, 19 kilomètres : le pas est toujours le même, + 3. C'est une suite arithmétique, de raison 3.",
         stoi="combien de kilomètres Inès courra-t-elle la 10e semaine ?", srep="37 km : 10 + 9 × 3.",
         stags=["marathon", "course à pied", "suite arithmétique", "raison"]),
    dict(num="02", slug="arith-recurrence", classe="premiere", notion="lin_suite_arithmetique", micro="lin_suite_recurrence",
         ceinture="verte", sc="blanche", centres=["musique"], scentres=["cuisine"],
         titre="uₙ₊₁ = uₙ + 300 : passer au terme suivant — La relation de récurrence — épisode 2 · Maths 1re",
         intro="Léna est programmatrice d'un festival de musique. La première édition accueille 1 200 spectateurs, et elle en prévoit 300 de plus chaque année. Combien de place réserver pour les éditions suivantes ? On passe d'un terme au suivant, et même on revient en arrière.",
         puces=["la notation uₙ : le nombre de spectateurs de l'édition n", "la relation de récurrence : uₙ₊₁ = uₙ + 300", "on déroule pas à pas : u₁, u₂, u₃…", "remonter le temps : pour reculer d'un rang, on fait l'opération inverse", "le piège : uₙ = uₙ₊₁ + 300, la relation écrite à l'envers"],
         defi="t₁ = 7,5 et tₙ₊₁ = tₙ + 2,5 : calcule t₄, pas à pas.",
         chap={"00-garde": "La relation de récurrence", "01-situation": "Léna et son festival", "02-notation": "La notation uₙ", "03-relation": "uₙ₊₁ = uₙ + 300", "04-question": "Question 1", "05-derouler": "On déroule pas à pas", "06-precedent": "Remonter le temps", "07-question": "Question 2", "08-piege": "Le piège", "09-defi": "À toi de jouer", "09b-correction": "Correction", "10-finale": "Ce que tu as appris"},
         qs=[("04-question", "Une chorale perd 15 choristes chaque année. vₙ est le nombre de choristes après n années. Quelle relation traduit cette situation ?", ["vₙ₊₁ = vₙ − 15", "vₙ₊₁ = 15 × vₙ", "vₙ = vₙ₊₁ − 15"], 0, "Perdre 15, c'est retirer 15 au terme actuel pour obtenir le terme suivant."),
             ("07-question", "Une suite vérifie wₙ₊₁ = wₙ − 4 et w₆ = 50. Combien vaut w₅ ?", ["46", "54", "42"], 1, "Pour reculer d'un rang, on fait l'opération inverse : 50 + 4 = 54.")],
         tags=["relation de récurrence", "suite arithmétique", "terme suivant", "terme précédent", "festival", "programmatrice"],
         st="u₁₀ = 600 : tu remontes le temps d'une suite ? 🚚 — 1re #Shorts",
         sq=("03-question", "u₁₀ = 600 (on ajoute 35 chaque semaine). Combien vaut u₉ ?", ["635", "565", "35"], 1, "On recule d'un rang : 600 − 35 = 565."),
         sa="Un food truck sert chaque semaine 35 repas de plus que la semaine d'avant : uₙ₊₁ = uₙ + 35. Pour reculer d'une semaine, on retire 35.",
         stoi="u₀ = 250. Combien vaut u₄ ?", srep="390 : 250 + 4 × 35.",
         stags=["food truck", "relation de récurrence", "remonter le temps", "suite arithmétique"]),
    dict(num="03", slug="arith-notation", classe="premiere", notion="lin_suite_arithmetique", micro="lin_suite_notation",
         ceinture="verte", sc="blanche", centres=["espace", "sciences"], scentres=["reseaux-sociaux"],
         titre="u(n), uₙ : que veut dire ce petit n ? — La notation des suites — épisode 3 · Maths 1re",
         intro="Nadia est ingénieure dans une agence spatiale : elle suit une constellation de satellites. 600 en orbite en 2026, 120 de plus chaque année. Avant une réunion, elle contrôle un rapport rempli de notations : u(n), uₙ, u(n + 1)…",
         puces=["u(n) et uₙ : deux écritures du même terme", "le n est un rang : on compte les années depuis 2026", "le premier terme : u₀ ou u₁, il faut regarder", "u(n + 1), le terme suivant : on remplace n par n + 1", "le piège : uₙ n'est pas u × n"],
         defi="les termes de w commencent à w₀ : quel est l'indice du 25e terme ? Combien de termes de w₀ à w₄₀ ?",
         chap={"00-garde": "Suites : la notation", "01-situation": "Nadia et les satellites", "02-deux-notations": "u(n) et uₙ : le même terme", "03-rang": "Le n est un rang", "04-question": "Question 1", "05-position": "Le premier terme : u₀ ou u₁", "06-n-plus-1": "u(n + 1), le terme suivant", "07-question": "Question 2", "08-piege": "Le piège : uₙ n'est pas u × n", "09-defi": "À toi de jouer", "09b-correction": "Correction", "10-finale": "Ce que tu as appris"},
         qs=[("04-question", "Dans le rapport, comment s'écrit le nombre de satellites en 2034 ?", ["u₈", "u₂₀₃₄", "u₉"], 0, "2034 − 2026 = 8 : c'est le terme de rang 8."),
             ("07-question", "Une suite v est définie par v(n) = 5 + 3n. Que vaut v(n + 1) ?", ["6 + 3n", "8 + 3n", "5 + 4n"], 1, "On remplace n par n + 1 : 5 + 3n + 3 = 8 + 3n.")],
         tags=["notation des suites", "u indice n", "rang", "terme suivant", "satellites", "ingénieure spatiale"],
         st="2031, c'est u₂₀₃₁ ? Le piège de l'année 📱 — 1re #Shorts",
         sq=("03-question", "Comment s'écrit le nombre d'abonnés en 2031 ?", ["u₂₀₃₁", "u₆", "u₇"], 1, "2031 − 2025 = 6 : c'est u₆."),
         sa="Un compte de vulgarisation scientifique gagne des abonnés chaque année. u(n) est le nombre d'abonnés en 2025 + n : u(0) correspond à 2025. Le n est un rang : on compte les années depuis 2025.",
         stoi="une suite commence à u₀. Quel est l'indice de son 50e terme ?", srep="49 : le 50e terme est u₄₉.",
         stags=["abonnés", "notation", "rang", "u indice n"]),
    dict(num="04", slug="arith-terme-rang", classe="premiere", notion="lin_suite_arithmetique", micro="lin_suite_terme_rang",
         ceinture="verte", sc="blanche", centres=["construction", "jeux-defis"], scentres=["velo"],
         titre="Le 20e terme sans calculer les autres — Calculer un terme lointain — épisode 4 · Maths 1re",
         intro="Hugo est carreleur. Autour de bacs à plantes carrés, il pose des bordures : 8 carreaux à l'étape 1, 12 à l'étape 2, 16 à l'étape 3. Le plus grand bac est l'étape 20 : combien de carreaux commander, sans tout calculer ?",
         puces=["la raison : 4 carreaux de plus à chaque étape", "compter les pas : de l'étape 1 à l'étape 20, 19 pas", "les formules : uₙ = u₀ + n × r, uₙ = u₁ + (n − 1) × r, uₙ = uₚ + (n − p) × r", "u₂₀ = 8 + 19 × 4 = 84 carreaux", "le piège : 8 + 20 × 4, un pas de trop"],
         defi="1 carré : 4 allumettes, 2 carrés : 7, 3 carrés : 10. Combien d'allumettes pour 50 carrés ?",
         chap={"00-garde": "Calculer un terme lointain", "01-situation": "Hugo, carreleur : le carré bordé", "02-raison": "La raison : 4 carreaux de plus", "03-compter-pas": "Compter les pas : 19 pas", "04-formules": "Les trois formules", "05-question": "Question 1", "06-autre-terme": "Depuis un autre terme", "07-piege": "Le piège : un pas de trop", "08-question": "Question 2", "09-defi": "À toi de jouer : les allumettes", "09b-correction": "Correction", "10-finale": "Ce que tu as appris"},
         qs=[("05-question", "Une suite arithmétique de raison 5 commence à u₁ = 12. Combien vaut u₁₀ ?", ["62", "67", "57"], 2, "De u₁ à u₁₀, il y a 9 pas : 12 + 9 × 5 = 57."),
             ("08-question", "Une suite arithmétique vérifie v₄ = 30, et sa raison est −2. Combien vaut v₁₂ ?", ["14", "46", "6"], 0, "De v₄ à v₁₂, il y a 8 pas : 30 + 8 × (−2) = 14.")],
         tags=["terme général", "suite arithmétique", "calculer un terme", "compter les pas", "carreleur", "motif"],
         st="La 10e semaine : 10 pas ou 9 ? 🚴‍♀️ — 1re #Shorts",
         sq=("03-question", "Chloé roule 20 km la 1re semaine, puis 5 km de plus chaque semaine. Combien de kilomètres roule-t-elle la 10e semaine ?", ["70", "75", "65"], 2, "20 + 9 × 5 = 65 : de la semaine 1 à la semaine 10, il y a 9 pas."),
         sa="Chloé prépare une course à vélo : 20 kilomètres la 1re semaine, puis 5 de plus chaque semaine. u₁ = 20. De la semaine 1 à la semaine 10, il y a 9 pas, pas 10.",
         stoi="combien de kilomètres Chloé roulera-t-elle la 30e semaine ?", srep="165 km : 20 + 29 × 5.",
         stags=["vélo", "terme lointain", "compter les pas", "suite arithmétique"]),
    dict(num="05", slug="arith-explicite", classe="premiere", notion="lin_suite_terme_general", micro="lin_suite_explicite",
         ceinture="verte", sc="blanche", centres=["argent-budget", "voitures-motos"], scentres=["transports"],
         titre="Dans combien de mois aura-t-elle 1 200 € ? — La formule explicite — épisode 5 · Maths 1re",
         intro="Sofiane est conseiller bancaire. Sa cliente Jade, 17 ans, a 300 € sur son livret et y ajoute 45 € chaque mois pour payer son permis. Dans combien de mois aura-t-elle 1 200 € ? Une formule donne directement n'importe quel terme.",
         puces=["de la récurrence à la formule : uₙ = 300 + 45n", "rang 0 ou rang 1 : uₙ = u₀ + nr, uₙ = u₁ + (n − 1)r", "retrouver le rang : 300 + 45n = 1 200, n = 20", "avec deux termes connus : la raison, puis la formule", "lire une formule et prouver qu'une suite est arithmétique", "le piège : la raison devant le n, le premier terme seul"],
         defi="u₂ = 11 et u₆ = 31 : la raison, la formule explicite, puis le rang n pour lequel uₙ = 96.",
         chap={"00-garde": "La formule explicite", "01-situation": "Jade, son livret et son permis", "02-vers-explicite": "De la récurrence à la formule", "03-formules": "Rang 0, rang 1 : les deux formules", "04-question": "Question 1", "05-rang": "Retrouver le rang", "06-deux-termes": "Avec deux termes connus", "07-lire-prouver": "Lire la formule, prouver", "08-question": "Question 2", "09-piege": "Le piège", "10-defi": "À toi de jouer", "10b-correction": "Correction", "11-finale": "Ce que tu as appris"},
         qs=[("04-question", "Une suite arithmétique a pour premier terme v₀ = 8 et pour raison −3. Pour tout entier naturel n :", ["vₙ = −3 + 8n", "vₙ = 8 − 3 × (n − 1)", "vₙ = 8 − 3n"], 2, "Le premier terme est le nombre seul, et la raison multiplie n : 8 − 3n."),
             ("08-question", "Une suite arithmétique commence à t₁ = 20, et sa raison est 6. Pour tout entier n ≥ 1 :", ["tₙ = 20 + 6n", "tₙ = 14 + 6n", "tₙ = 6 + 20n"], 1, "tₙ = 20 + 6 × (n − 1) = 14 + 6n. On vérifie : t₁ = 14 + 6 = 20.")],
         tags=["formule explicite", "suite arithmétique", "terme général", "uₙ = u₀ + nr", "épargne", "conseiller bancaire", "permis de conduire"],
         st="La formule de la trottinette en 10 secondes ? 🛴 — 1re #Shorts",
         sq=("03-question", "Le compteur affiche 120 km et la propriétaire roule 15 km par jour. Quelle est la formule explicite ?", ["uₙ = 15 + 120n", "uₙ = 120 × 15ⁿ", "uₙ = 120 + 15n"], 2, "Le premier terme, 120, plus n fois la raison, 15."),
         sa="Le compteur d'une trottinette électrique affiche 120 km, et sa propriétaire roule 15 km par jour. Après n jours, on a ajouté n fois 15 : uₙ = 120 + 15n.",
         stoi="combien de kilomètres affiche le compteur après 30 jours ?", srep="570 km : 120 + 30 × 15.",
         stags=["trottinette électrique", "formule explicite", "suite arithmétique", "kilométrage"]),
    dict(num="06", slug="arith-variation", classe="premiere", notion="lin_suite_terme_general", micro="lin_suite_variation",
         ceinture="verte", sc="blanche", centres=["meteo-climat", "nature-ecologie"], scentres=["natation"],
         titre="Le glacier va-t-il se stabiliser ? — Sens de variation d'une suite arithmétique — épisode 6 · Maths 1re",
         intro="Lucie est glaciologue. Le glacier qu'elle suit mesure 6 000 m en 2026 et recule de 25 m par an. Un article affirme : « il est si long qu'il va finir par se stabiliser ». Vrai ou faux ? Le signe de la raison décide de tout.",
         puces=["la raison −25 : la suite est décroissante", "la règle : r > 0 croissante, r < 0 décroissante, r = 0 constante", "le premier terme ne décide rien", "le piège : on compare la raison à 0, pas à 1"],
         defi="uₙ = 3n − 50, vₙ₊₁ = vₙ, une citerne de 900 L qui perd 40 L par jour : croissante, décroissante ou constante ?",
         chap={"00-garde": "Monte-t-elle ou descend-elle ?", "01-situation": "Lucie, glaciologue : le glacier recule", "02-signe": "La raison −25 : décroissante", "03-regle": "La règle : le signe de r", "04-question": "Question 1", "05-premier-terme": "Le premier terme ne décide rien", "06-piege": "Le piège : comparer à 0, pas à 1", "07-question": "Question 2", "08-defi": "À toi de jouer : trois suites", "08b-correction": "Correction", "09-finale": "Ce que tu as appris"},
         qs=[("04-question", "Une suite est définie par vₙ = 40 − 0,5n. Elle est :", ["décroissante", "croissante", "constante"], 0, "La raison est le nombre devant n : −0,5. Elle est négative, même si elle est petite."),
             ("07-question", "Une suite arithmétique a pour premier terme w₀ = −300 et pour raison 0,25. Quelle affirmation est juste ?", ["Elle est décroissante, car w₀ est négatif", "Elle est croissante, car r est positive", "Elle est décroissante, car r est plus petite que 1"], 1, "On ajoute 0,25 à chaque étape : −300, puis −299,75. Elle monte.")],
         tags=["sens de variation", "suite arithmétique", "croissante", "décroissante", "raison", "glacier", "glaciologue", "climat"],
         st="Monte ou descend, sans rien calculer ? 🏊 — 1re #Shorts",
         sq=("03-question", "Un nageur gagne 0,5 s chaque semaine : 62 s, 61,5 s, puis 61 s. La suite de ses temps est :", ["croissante", "constante", "décroissante"], 2, "La raison est négative : les temps descendent, et c'est une bonne nouvelle pour lui."),
         sa="Un nageur s'entraîne au 100 m : chaque semaine, il gagne 0,5 s. 62 s, 61,5 s, puis 61 s : on retire 0,5 chaque semaine, la raison est −0,5.",
         stoi="en partant de 62 secondes, quel temps fera-t-il après 8 semaines ?", srep="58 s : 62 − 8 × 0,5.",
         stags=["natation", "100 mètres", "sens de variation", "décroissante"]),
    dict(num="07", slug="arith-graphique", classe="premiere", notion="lin_suite_terme_general", micro="lin_suite_graphique",
         ceinture="verte", sc="blanche", centres=["technologie-ia", "corps-sante"], scentres=["cinema-series"],
         titre="Quand le robot doit-il se recharger ? — Suite arithmétique sur un graphique — épisode 7 · Maths 1re",
         intro="Amel est ingénieure en robotique : son robot livre les médicaments dans un hôpital. 120 minutes d'autonomie au départ, 15 de moins à chaque livraison. Sur un graphique, elle voit d'un coup d'œil quand le recharger.",
         puces=["placer les points (n ; uₙ) : l'abscisse est le rang, l'ordonnée le terme", "une suite arithmétique : des points alignés", "lire la raison sur le graphique : 12 ÷ 3 = 4", "monter, descendre, ou pas aligné", "le piège : confondre u₀ et la raison"],
         defi="les points sont sur la droite y = 30 − 2x : donne u₀, la raison, le sens de variation et u₆.",
         chap={"00-garde": "Suite arithmétique sur un graphique", "01-situation": "Amel et son robot livreur", "02-points": "Placer les points (n ; uₙ)", "03-alignes": "Des points alignés", "04-question": "Question 1", "05-lire": "Lire le graphique : quand recharger ?", "06-nature": "Monter, descendre, ou pas aligné", "07-question": "Question 2", "08-piege": "Le piège : u₀ et r", "09-defi": "À toi de jouer", "09b-correction": "Correction", "10-finale": "Ce que tu as appris"},
         qs=[("04-question", "Quelle est la raison ?", ["4", "12", "3"], 0, "De l'abscisse 1 à l'abscisse 4, il y a 3 pas, et on monte de 12 : 12 ÷ 3 = 4."),
             ("07-question", "Quel point fait partie de sa représentation graphique ?", ["(17 ; 4)", "(4 ; 17)", "(4 ; 20)"], 1, "w₄ = 5 + 3 × 4 = 17 : l'abscisse est le rang, l'ordonnée est le terme.")],
         tags=["représentation graphique", "suite arithmétique", "points alignés", "nuage de points", "robot", "ingénieure en robotique"],
         st="Une suite arithmétique au premier coup d'œil ? 🎬 — 1re #Shorts",
         sq=("03-question", "Lequel de ces nuages est arithmétique ?", ["des points qui montent de plus en plus vite", "des points en zigzag", "des points alignés"], 2, "Un écart constant donne des points alignés."),
         sa="Lina est monteuse vidéo : sa série a 4 épisodes en ligne, puis elle en publie 3 de plus chaque semaine. Les points (0 ; 4), (1 ; 7), (2 ; 10) : on ajoute toujours 3, ils sont alignés.",
         stoi="(0 ; 4), (1 ; 7), (2 ; 10)… quelle est l'ordonnée du point d'abscisse 10 ?", srep="34 : 4 + 3 × 10.",
         stags=["monteuse vidéo", "série", "points alignés", "graphique"]),
    dict(num="08", slug="arith-interpreter", classe="premiere", notion="lin_suite_terme_general", micro="lin_suite_interpreter",
         ceinture="verte", sc="blanche", centres=["corps-sante", "sport"], scentres=["animaux"],
         titre="Quand Bastien marchera-t-il 3 km ? — Interpréter une suite arithmétique — épisode 8 · Maths 1re",
         intro="Clara est kinésithérapeute. Son patient Bastien, opéré du genou, marche 400 m au début de sa rééducation, puis 150 m de plus chaque semaine. Quand pourra-t-il marcher 3 km pour aller au lycée à pied ?",
         puces=["ce que dit chaque nombre de la formule", "un terme est une valeur, pas un gain", "le seuil des 3 km : la première semaine où on le dépasse", "le piège : arrondir au plus proche au lieu de l'entier suivant", "l'indice devient une date", "un motif de carreaux en T"],
         defi="une croix de 5, 9, 13 carreaux… Avec 150 carreaux, quelle est la plus grande étape construite entièrement ?",
         chap={"00-garde": "Interpréter une formule", "01-situation": "Clara, Bastien et ses 3 km", "02-formule": "Ce que dit chaque nombre", "03-terme": "Un terme, pas un gain", "04-question": "Question 1", "05-seuil": "Le seuil des 3 km", "06-piege": "Le piège : arrondir à 17", "07-annee": "L'indice devient une date", "08-motif": "Le motif en T", "09-question": "Question 2", "10-defi": "À toi de jouer", "10b-correction": "Correction", "11-finale": "Ce que tu as appris"},
         qs=[("04-question", "Une médiathèque possède wₙ = 2 000 + 120n livres, en 2026 + n. Que veut dire le nombre 120 ?", ["le nombre de livres en 2026", "le nombre de livres ajoutés chaque année", "le nombre d'années écoulées"], 1, "Le nombre devant n, c'est la raison : ce qui s'ajoute chaque année."),
             ("09-question", "Quelle étape du T utilise exactement 61 carreaux ?", ["l'étape 61", "l'étape 21", "l'étape 20"], 2, "4 + 3 × (n − 1) = 61 : 3 × (n − 1) = 57, donc n − 1 = 19, et n = 20.")],
         tags=["interpréter une suite", "suite arithmétique", "seuil", "modéliser", "kinésithérapeute", "rééducation"],
         st="u₉, c'est quelle année ? Sans te tromper d'un an 🐶 — 1re #Shorts",
         sq=("03-question", "À quelle année correspond u₉ (u₀ correspond à 2026) ?", ["2036", "2035", "2034"], 1, "2026 + 9 = 2035."),
         sa="Un refuge pour animaux fait adopter chaque année 12 chiens de plus que l'année d'avant. u₀ correspond à 2026 : l'indice compte les années écoulées depuis 2026.",
         stoi="cette fois, u₁ correspond à 2026. À quelle année correspond u₉ ?", srep="2034.",
         stags=["refuge", "adoption", "chiens", "indice et année"]),
    dict(num="09", slug="geo-reconnaitre", classe="premiere", notion="expo_suite_geometrique", micro="expo_suite_reconnaitre",
         ceinture="verte", sc="blanche", centres=["corps-sante", "sciences"], scentres=["photo"],
         titre="500, 1 000, 2 000, 4 000 : à quelle vitesse ? — Reconnaître une suite géométrique — épisode 9 · Maths 1re",
         intro="Mathis est technicien dans un laboratoire d'analyses médicales. Une culture de bactéries : 500, puis 1 000, 2 000, 4 000. Il doit dire au médecin à quelle vitesse elle grandit. Les écarts changent… mais le quotient, lui, reste le même.",
         puces=["le quotient de deux termes qui se suivent : 1 000 ÷ 500 = 2", "suite géométrique : on multiplie toujours par le même nombre, la raison q", "un pourcentage fixe cache une suite géométrique : − 20 %, c'est × 0,8", "le piège : 5, 10, 15, 20 n'est pas géométrique"],
         defi="6 ; 18 ; 54 ; 162 : arithmétique, géométrique ou ni l'un ni l'autre ? Et v₂ = 5, v₄ = 45 : quelle raison ?",
         chap={"00-garde": "Suite géométrique : la reconnaître", "01-situation": "Mathis et sa culture de bactéries", "02-quotients": "Les écarts changent, le quotient reste", "03-definition": "La raison q", "04-question": "Question 1", "05-pourcentage": "Un pourcentage fixe : × 0,8", "06-piege": "Le piège : 5, 10, 15, 20", "07-question": "Question 2", "08-defi": "À toi de jouer", "08b-correction": "Correction", "09-finale": "Ce que tu as appris"},
         qs=[("04-question", "Laquelle de ces listes est géométrique ?", ["3 ; 7 ; 11 ; 15", "80 ; 40 ; 20 ; 10", "1 ; 4 ; 9 ; 16"], 1, "40 ÷ 80 = 0,5, et de même ensuite : c'est une suite géométrique de raison 0,5."),
             ("07-question", "Une suite géométrique à termes positifs vérifie u₃ = 20 et u₄ = 25. Sa raison est :", ["5", "0,8", "1,25"], 2, "On divise le terme suivant par le précédent : 25 ÷ 20 = 1,25.")],
         tags=["suite géométrique", "reconnaître une suite géométrique", "raison", "quotient", "bactéries", "laboratoire d'analyses"],
         st="8, 12, 18, 27 : tu la repères en 3 secondes ? 📷 — 1re #Shorts",
         sq=("03-question", "Laquelle multiplie toujours par le même nombre ?", ["10 ; 20 ; 30 ; 40", "1 ; 2 ; 4 ; 7", "5 ; 15 ; 45 ; 135"], 2, "On multiplie par 3 à chaque fois : la raison est 3."),
         sa="Un photographe agrandit une photo : à chaque fois, sa largeur est multipliée par 1,5. 8, 12, 18, 27 cm : 12 ÷ 8 = 1,5, et de même ensuite. C'est une suite géométrique de raison 1,5.",
         stoi="8, 12, 18, 27… quelle sera la largeur suivante, en centimètres ?", srep="40,5 cm : 27 × 1,5.",
         stags=["photographe", "agrandissement", "suite géométrique", "quotient"]),
    dict(num="10", slug="geo-recurrence", classe="premiere", notion="expo_suite_geometrique", micro="expo_suite_recurrence",
         ceinture="verte", sc="blanche", centres=["animaux", "nature-ecologie"], scentres=["jeux-defis"],
         titre="+ 20 % par mois : quand agrandir la ruche ? — Récurrence d'une suite géométrique — épisode 10 · Maths 1re",
         intro="Manon est apicultrice. Au printemps, une colonie compte 10 000 abeilles, et elle grandit de 20 % chaque mois. Quand faudra-t-il agrandir la ruche ? On passe d'un mois au suivant en multipliant.",
         puces=["+ 20 %, c'est × 1,2 : uₙ₊₁ = 1,2 × uₙ", "on déroule pas à pas : 10 000, 12 000, 14 400, 17 280", "remonter le temps : on divise par q", "le piège : ajouter au lieu de multiplier"],
         defi="une balle lâchée de 160 cm remonte à 75 % de sa hauteur à chaque rebond : la relation, puis h₃.",
         chap={"00-garde": "La relation de récurrence", "01-situation": "Manon, apicultrice : la ruche", "02-relation": "uₙ₊₁ = 1,2 × uₙ", "03-question": "Question 1", "04-derouler": "On déroule, pas à pas", "05-precedent": "Remonter le temps : ÷ q", "06-piege": "Le piège : ajouter au lieu de multiplier", "07-question": "Question 2", "08-defi": "À toi de jouer : la balle qui rebondit", "08b-correction": "Correction", "09-finale": "Ce que tu as appris"},
         qs=[("03-question", "Une ville perd 2 % de ses habitants chaque année. vₙ est sa population après n années. Quelle relation traduit cette situation ?", ["vₙ₊₁ = 0,98 × vₙ", "vₙ₊₁ = vₙ − 2", "vₙ₊₁ = 0,02 × vₙ"], 0, "Perdre 2 %, c'est garder 98 % : on multiplie par 0,98."),
             ("07-question", "Une suite vérifie tₙ₊₁ = 3 × tₙ et t₄ = 162. Combien vaut t₃ ?", ["486", "159", "54"], 2, "Pour reculer d'un rang, on divise par 3 : 162 ÷ 3 = 54.")],
         tags=["relation de récurrence", "suite géométrique", "pourcentage", "coefficient multiplicateur", "abeilles", "apicultrice"],
         st="1 024 joueurs, la moitié éliminée : la bonne relation ? ♟️ — 1re #Shorts",
         sq=("03-question", "À chaque tour, la moitié des joueurs est éliminée. Quelle relation vérifie la suite ?", ["uₙ₊₁ = 0,5 × uₙ", "uₙ₊₁ = uₙ − 2", "uₙ₊₁ = uₙ − 0,5"], 0, "Diviser par 2, c'est multiplier par 0,5."),
         sa="Un tournoi d'échecs en ligne réunit 1 024 joueurs. À chaque tour, la moitié est éliminée : 1 024, 512, 256. On divise par 2 à chaque tour : uₙ₊₁ = 0,5 × uₙ.",
         stoi="1 024 joueurs au départ. Combien en reste-t-il après 4 tours ?", srep="64 : 1 024 ÷ 2⁴.",
         stags=["échecs", "tournoi", "relation de récurrence", "suite géométrique"]),
    dict(num="11", slug="geo-taux", classe="premiere", notion="expo_suite_geometrique", micro="expo_suite_taux",
         ceinture="verte", sc="blanche", centres=["cinema-series", "argent-budget"], scentres=["argent-budget", "reseaux-sociaux"],
         titre="− 30 % par semaine : combien d'entrées ? — Du pourcentage à la raison — épisode 11 · Maths 1re",
         intro="Ylan travaille dans la distribution de films : il décide combien de salles gardent un film à l'affiche. 200 000 entrées la première semaine, puis − 30 % d'une semaine à l'autre. Combien deux semaines plus tard ?",
         puces=["baisser de 30 %, c'est garder 70 % : q = 0,7", "les mots qui cachent une raison : hausse, baisse, double, moitié", "dans l'autre sens : le taux, c'est q − 1", "deux semaines : × 0,7², soit − 51 %", "le piège : − 30 % deux fois n'est pas − 60 %"],
         defi="8 000 vues en 2026, 10 000 en 2027, au même taux : la raison, le pourcentage, et les vues en 2028.",
         chap={"00-garde": "Du pourcentage à la raison", "01-situation": "Ylan et les entrées d'un film", "02-formule": "Baisser de 30 %, c'est garder 70 %", "03-mots": "Des mots qui cachent une raison", "04-question": "Question 1", "05-inverse": "Dans l'autre sens : q − 1", "06-global": "Deux semaines : × 0,7²", "07-piege": "Le piège : pas − 60 %", "08-question": "Question 2", "09-defi": "À toi de jouer", "09b-correction": "Correction", "10-finale": "Ce que tu as appris"},
         qs=[("04-question", "Un abonnement augmente de 4 % chaque année. La raison de la suite géométrique associée est :", ["1,04", "1,4", "0,04"], 0, "1 + 4/100 = 1,04 : on garde tout, et on ajoute 4 %."),
             ("08-question", "Une suite géométrique a pour raison q = 1,1. Entre u₀ et u₂, l'évolution globale est :", ["une hausse de 20 %", "une hausse de 121 %", "une hausse de 21 %"], 2, "1,1² = 1,21, et 1,21 − 1 = 0,21 : c'est une hausse de 21 %.")],
         tags=["taux d'évolution", "coefficient multiplicateur", "suite géométrique", "pourcentage", "cinéma", "distribution de films"],
         st="− 20 % par an : ne te fais pas avoir 📱 — 1re #Shorts",
         sq=("03-question", "Perdre 20 %, c'est multiplier par :", ["0,8", "0,2", "1,2"], 0, "1 − 20/100 = 0,8."),
         sa="Un smartphone perd 20 % de sa valeur chaque année. Perdre 20 %, c'est garder 80 % : on multiplie par 0,8.",
         stoi="un smartphone de 500 € perd 20 % de sa valeur par an. Combien vaut-il après 2 ans ?", srep="320 € : 500 × 0,8².",
         stags=["smartphone", "pourcentage", "coefficient multiplicateur", "valeur"]),
    dict(num="12", slug="geo-terme-rang", classe="premiere", notion="expo_suite_geometrique", micro="expo_suite_terme_rang",
         ceinture="verte", sc="blanche", centres=["reseaux-sociaux", "basket"], scentres=["jeux-defis"],
         titre="+ 10 % par mois : combien d'abonnés dans un an ? — Calculer un terme d'une suite géométrique — épisode 12 · Maths 1re",
         intro="Léo est community manager : il anime le compte d'un club de basket. 2 000 abonnés, et 10 % de plus chaque mois. Pour convaincre un sponsor, le club veut savoir combien il en aura dans un an, sans calculer mois par mois.",
         puces=["trois mois : trois sauts × 1,1", "douze mois : u₁₂ = 2 000 × 1,1¹² ≈ 6 277", "uₙ = u₀ × qⁿ, et depuis u₁ : uₙ = u₁ × qⁿ⁻¹", "le piège : × 12 au lieu de la puissance 12"],
         defi="une suite géométrique de raison 2 vérifie t₅ = 96 : calcule t₈, puis t₃.",
         chap={"00-garde": "Calculer un terme lointain", "01-situation": "Léo et ses 2 000 abonnés", "02-pas": "Trois sauts × 1,1", "03-puissance": "Douze sauts : 1,1¹²", "04-question": "Question 1", "05-rang-1": "Le rang de départ", "06-question": "Question 2", "07-piege": "Le piège : × 12", "08-defi": "À toi de jouer", "08b-correction": "Correction", "09-finale": "Ce que tu as appris"},
         qs=[("04-question", "Une suite géométrique commence à v₀ = 5, et sa raison est 3. Combien vaut v₄ ?", ["60", "135", "405"], 2, "3⁴ = 81, et 5 × 81 = 405."),
             ("06-question", "Une suite géométrique commence à w₁ = 800, et sa raison est 0,5. Combien vaut w₄ ?", ["50", "100", "1 600"], 1, "De w₁ à w₄, il y a 3 pas : 800 × 0,5³ = 800 × 0,125 = 100.")],
         tags=["terme général", "suite géométrique", "puissance", "uₙ = u₀ × qⁿ", "community manager", "abonnés", "basket"],
         st="Une feuille pliée 10 fois : plus de 10 cm ? 📄 — 1re #Shorts",
         sq=("03-question", "Une feuille de 0,1 mm double d'épaisseur à chaque pliage. Quelle formule donne l'épaisseur uₙ après n pliages ?", ["uₙ = 0,1 × 2 × n", "uₙ = 0,1 + 2n", "uₙ = 0,1 × 2ⁿ"], 2, "On multiplie n fois par 2 : uₙ = 0,1 × 2ⁿ. Et u₁₀ = 0,1 × 1 024 = 102,4 mm : plus de 10 cm !"),
         sa="Une feuille de 0,1 mm d'épaisseur double à chaque pliage. Après n pliages, on a multiplié n fois par 2 : uₙ = 0,1 × 2ⁿ. Après 10 pliages : 102,4 mm, plus de 10 cm !",
         stoi="quelle est l'épaisseur, en millimètres, après 7 pliages ?", srep="12,8 mm : 0,1 × 2⁷.",
         stags=["feuille pliée", "puissance de 2", "suite géométrique", "défi"]),
    dict(num="13", slug="geo-explicite", classe="premiere", notion="expo_suite_terme_general", micro="expo_suite_explicite",
         ceinture="verte", sc="blanche", centres=["voitures-motos", "argent-budget"], scentres=["nature-ecologie"],
         titre="20 000 € et − 20 % par an : combien dans 3 ans ? — La formule explicite d'une suite géométrique — épisode 13 · Maths 1re",
         intro="Elena est experte automobile : elle estime la valeur des voitures pour les assurances. Une voiture neuve vaut 20 000 €, et sa valeur baisse de 20 % chaque année. Combien vaudra-t-elle dans 3 ans ? Avec la formule explicite, on calcule n'importe quel terme d'un seul coup.",
         puces=["− 20 % = × 0,8 : uₙ = 20 000 × 0,8ⁿ", "la puissance d'abord : 0,8³ = 0,512, puis u₃ = 10 240 €", "si la suite commence à u₁ : uₙ = u₁ × qⁿ⁻¹", "lire une formule : le nombre devant est le premier terme, la base est la raison", "prouver qu'une suite est géométrique : uₙ₊₁ ÷ uₙ ne dépend pas de n", "le piège : 0,2ⁿ, la part perdue au lieu de ce qui reste"],
         defi="une suite géométrique à termes positifs vérifie u₁ = 6 et u₂ = 9 : trouve sa raison, u₀, puis uₙ en fonction de n.",
         chap={"00-garde": "Formule explicite", "01-situation": "Elena, experte automobile", "02-formule": "uₙ = 20 000 × 0,8ⁿ", "03-calcul": "La puissance d'abord", "04-question": "Question 1", "05-rang-1": "Départ à u₁ : qⁿ⁻¹", "06-lire-prouver": "Lire et prouver", "07-question": "Question 2", "08-piege": "Le piège 0,2ⁿ", "09-defi": "À toi de jouer", "09b-correction": "Correction", "10-finale": "Ce que tu as appris"},
         qs=[("04-question", "Une suite géométrique a pour premier terme v₀ = 50 et pour raison 1,2. Pour tout entier naturel n :", ["vₙ = 50 × 1,2 × n", "vₙ = 1,2 × 50ⁿ", "vₙ = 50 × 1,2ⁿ"], 2, "Le premier terme est devant, la raison est la base de la puissance, et n est en exposant."),
             ("07-question", "Une suite géométrique commence à t₁ = 400, et sa raison est 0,9. Pour tout entier n ≥ 1 :", ["tₙ = 400 × 0,9ⁿ", "tₙ = 400 × 0,9ⁿ⁻¹", "tₙ = 400 − 10n"], 1, "On vérifie : t₁ = 400 × 0,9⁰ = 400.")],
         tags=["formule explicite", "suite géométrique", "uₙ = u₀ × qⁿ", "puissance", "expert automobile", "assurance", "voiture"],
         st="uₙ = 3 × 2ⁿ : tu la lis en 5 secondes ? 🪷 — 1re #Shorts",
         sq=("03-question", "Des nénuphars couvrent uₙ = 3 × 2ⁿ m² après n jours. Quels sont le premier terme et la raison ?", ["u₀ = 3 et q = 2", "u₀ = 2 et q = 3", "u₀ = 6 et q = 2"], 0, "Pour n = 0, 2⁰ = 1 : u₀ = 3."),
         sa="Sur un étang, des nénuphars couvrent 3 m², et leur surface double chaque jour : uₙ = 3 × 2ⁿ. Le nombre devant, c'est le départ ; la base de la puissance, c'est la raison.",
         stoi="combien de mètres carrés les nénuphars couvrent-ils au bout de 6 jours ?", srep="192 m² : 3 × 2⁶.",
         stags=["nénuphars", "étang", "suite géométrique", "formule explicite"]),
    dict(num="14", slug="geo-variation", classe="premiere", notion="expo_suite_terme_general", micro="expo_suite_variation",
         ceinture="verte", sc="blanche", centres=["jeux-video", "technologie-ia"], scentres=["corps-sante", "sciences"],
         titre="+ 5 % par niveau : « ça reste presque pareil » ? — Sens de variation d'une suite géométrique — épisode 14 · Maths 1re",
         intro="Sarah est game designer : elle règle la difficulté d'un jeu vidéo. À chaque niveau, il faut 5 % de points d'expérience de plus. Un testeur affirme : « 5 %, c'est si peu que ça reste presque pareil ». Monte-t-elle, descend-elle ? Il faut comparer la raison au bon nombre.",
         puces=["q = 1,05 > 1 : 2 000, 2 100, 2 205, la suite croît lentement, sans jamais s'arrêter", "la règle à termes positifs : q > 1 croissante, 0 < q < 1 décroissante, q = 1 constante", "les ventes du jeu : − 10 % par mois, la suite décroît vers 0 sans devenir négative", "le piège : comparer q à 0 au lieu de 1"],
         defi="croissante, décroissante ou constante ? Une ville de 5 000 habitants qui perd 2 % par an ; wₙ = 40 × 1ⁿ ; t₀ = 8 et tₙ₊₁ = 1,5 × tₙ.",
         chap={"00-garde": "Sens de variation", "01-situation": "Sarah, game designer", "02-croissante": "+ 5 % : croissante", "03-regle": "La règle : comparer q à 1", "04-question": "Question 1", "05-reste-positive": "Les ventes : vers 0", "06-piege": "Le piège : comparer à 0", "07-question": "Question 2", "08-defi": "À toi de jouer", "08b-correction": "Correction", "09-finale": "Ce que tu as appris"},
         qs=[("04-question", "Une suite géométrique à termes positifs a pour raison 0,9. Elle est :", ["décroissante", "croissante, car 0,9 est positif", "constante, car 0,9 est proche de 1"], 0, "0,9 est plus petit que 1 : à chaque étape, on ne garde que 90 %, donc ça baisse."),
             ("07-question", "La suite vₙ = 300 × 1,02ⁿ est :", ["décroissante, car le taux est faible", "constante", "croissante"], 2, "La raison est la base de la puissance : 1,02, plus grande que 1.")],
         tags=["sens de variation", "suite géométrique", "croissante", "décroissante", "raison", "game designer", "jeu vidéo"],
         st="− 25 % par heure : ça monte ou ça descend ? 💊 — 1re #Shorts",
         sq=("03-question", "Un médicament baisse de 25 % chaque heure dans le sang (× 0,75). La suite des quantités est :", ["décroissante", "croissante, car q est positif", "constante"], 0, "q est entre 0 et 1 : la quantité baisse à chaque heure, sans devenir négative."),
         sa="Dans le sang d'un patient, la quantité d'un médicament baisse de 25 % chaque heure : on multiplie par 0,75. 0,75 est plus petit que 1 : la suite est décroissante, sans jamais devenir négative.",
         stoi="200 mg au départ : combien en reste-t-il après 2 heures ?", srep="112,5 mg : 200 × 0,75².",
         stags=["médicament", "pourcentage", "suite géométrique", "sens de variation"]),
    dict(num="15", slug="geo-graphique", classe="premiere", notion="expo_suite_terme_general", micro="expo_suite_graphique",
         ceinture="verte", sc="blanche", centres=["cuisine", "corps-sante", "sciences"], scentres=["jeux-video", "jeux-defis"],
         titre="100 bactéries qui doublent : à quoi ressemble la courbe ? — Suite géométrique sur un graphique — épisode 15 · Maths 1re",
         intro="Laura est technicienne qualité dans une cuisine centrale, qui prépare les repas des cantines. Un plat oublié hors du frigo contient 100 bactéries, et leur nombre double toutes les 20 minutes. Pour montrer le risque aux cuisiniers, un seul dessin suffit : celui de la suite.",
         puces=["placer les points (n ; uₙ) : 100, 200, 400, 800, 1 600", "des points pas alignés : une courbe qui se creuse quand q > 1", "lire la raison sur un graphique : le quotient de deux ordonnées qui se suivent", "q entre 0 et 1 : la planche à découper, les points descendent vers 0", "le piège : une courbe qui démarre doucement ne reste pas petite (409 600 bactéries en 4 heures)"],
         defi="uₙ = 3 × 2ⁿ : le point (4 ; 48) ou le point (4 ; 24) est-il sur son graphique ? Que conjecturer quand n devient très grand ?",
         chap={"00-garde": "Suite géométrique sur un graphique", "01-situation": "Laura et les bactéries", "02-points": "Placer les points", "03-courbe": "Une courbe qui se creuse", "04-question": "Question 1", "05-conjecture": "Raison entre 0 et 1", "06-piege": "Le piège", "07-question": "Question 2", "08-defi": "À toi de jouer", "08b-correction": "Correction", "09-finale": "Ce que tu as appris"},
         qs=[("04-question", "Sur le graphique d'une suite géométrique, on lit u₀ = 40 et u₁ = 20. Sa raison est :", ["0,5", "−20", "2"], 0, "On divise : 20 ÷ 40 = 0,5. −20, c'est l'écart, pas la raison."),
             ("07-question", "Deux nuages de points. La suite bleue : 3 ; 6 ; 9 ; 12. La suite rouge : 3 ; 6 ; 12 ; 24. Laquelle est géométrique ?", ["la bleue", "la rouge", "les deux"], 1, "La rouge double à chaque fois : ses points se creusent. La bleue ajoute 3 : ses points sont alignés.")],
         tags=["suite géométrique", "représentation graphique", "nuage de points", "raison", "bactéries", "hygiène alimentaire", "cuisine centrale"],
         st="Tu reconnais une suite géométrique rien qu'à son dessin ? 🎮 — 1re #Shorts",
         sq=("03-question", "Les monstres triplent à chaque vague : 2 ; 6 ; 18 ; 54. À quoi ressemble ce nuage de points ?", ["des points qui montent de plus en plus vite", "des points alignés", "des points qui descendent"], 0, "On multiplie par 3 : les écarts grandissent, et la courbe se creuse."),
         sa="Dans un jeu vidéo, les monstres triplent à chaque vague : 2, 6, 18, 54. Sur un graphique, les points ne sont pas alignés : ils montent de plus en plus vite, la courbe se creuse.",
         stoi="2, 6, 18, 54… quelle est l'ordonnée du point d'abscisse 6 ?", srep="1 458 : 2 × 3⁶.",
         stags=["jeu vidéo", "monstres", "suite géométrique", "graphique"]),
    dict(num="16", slug="geo-interpreter", classe="premiere", notion="expo_suite_terme_general", micro="expo_suite_interpreter",
         ceinture="verte", sc="blanche", centres=["transports", "sport"], scentres=["musique", "reseaux-sociaux"],
         titre="50 000 trajets à vélo, + 20 % par an : quand auront-ils doublé ? — Interpréter une suite géométrique — épisode 16 · Maths 1re",
         intro="Baptiste est chargé de mobilité dans une grande ville : il prépare les pistes cyclables. En 2026, 50 000 trajets à vélo par jour, et 20 % de plus chaque année. En quelle année les trajets auront-ils doublé ? Que veulent dire, dans la vraie vie, chaque nombre et chaque indice de la formule ?",
         puces=["uₙ = 50 000 × 1,2ⁿ : 50 000, la valeur de départ ; 1,2, une hausse de 20 % par an", "un terme est une valeur totale, pas un gain : u₃ = 86 400 trajets en 2029", "le rang et l'année : u₀ correspond à 2026, u₄ à 2030", "le seuil : les trajets dépassent 100 000 au rang 4", "le piège : + 20 % deux ans de suite, c'est + 44 %, pas + 40 %"],
         defi="Une piscine accueille 40 000 nageurs en 2026, et sa fréquentation baisse de 10 % par an. En quelle année passe-t-elle sous 30 000 ? Quelle est la baisse globale entre 2026 et 2028 ?",
         chap={"00-garde": "Interpréter une suite géométrique", "01-situation": "Baptiste et les pistes cyclables", "02-formule": "Que dit la formule ?", "03-terme": "Un terme, une année", "04-question": "Question 1", "05-seuil": "Quand les trajets auront-ils doublé ?", "06-piege": "Le piège", "07-question": "Question 2", "08-defi": "À toi de jouer", "08b-correction": "Correction", "09-finale": "Ce que tu as appris"},
         qs=[("04-question", "Une ville compte vₙ = 80 000 × 0,97ⁿ habitants en 2026 + n. Que veut dire le nombre 0,97 ?", ["la population augmente de 97 % par an", "la population baisse de 3 % par an", "la population baisse de 0,97 habitant par an"], 1, "0,97 − 1 = −0,03 : c'est une baisse de 3 % chaque année."),
             ("07-question", "u₀ correspond à 2026. À quelle année correspond u₇ ?", ["2033", "2032", "2034"], 0, "2026 + 7 = 2033.")],
         tags=["suite géométrique", "interpréter", "pourcentage d'évolution", "seuil", "pistes cyclables", "vélo", "mobilité urbaine"],
         st="Le total ou la hausse ? Ne te fais pas piéger 🎧 — 1re #Shorts",
         sq=("03-question", "u₂ = 3 600 (écoutes d'un morceau). Ça veut dire :", ["le morceau a gagné 3 600 écoutes en 2 semaines", "2 semaines après la sortie, il fait 3 600 écoutes dans la semaine", "3 semaines après la sortie, il fait 3 600 écoutes dans la semaine"], 1, "Un terme est une valeur, au rang 2 : pas un gain."),
         sa="Un nouveau morceau de rap sort en streaming : uₙ = 1 600 × 1,5ⁿ écoutes dans la semaine, n semaines après la sortie. u₂ = 3 600 : est-ce un total ou une hausse ?",
         stoi="combien d'écoutes dans la semaine, 4 semaines après la sortie ?", srep="8 100 : 1 600 × 1,5⁴.",
         stags=["rap", "streaming", "écoutes", "suite géométrique", "interpréter"]),
    dict(num="17", slug="registres", classe="premiere-spe", notion="suites", micro="suite_registres",
         ceinture="verte", sc="blanche", centres=["musique", "argent-budget"], scentres=["art-design", "reseaux-sociaux"],
         titre="Que veut dire u₄ = 180 ? — Des mots aux symboles : lire une suite — épisode 17 · Maths 1re spé",
         intro="Sofiane dirige une école de musique : 120 élèves à la rentrée 2026, et 15 de plus chaque année avec la nouvelle classe de guitare. On note uₙ le nombre d'élèves après n années. Que veut dire, en français, u₄ = 180 ?",
         puces=["le rang n et la valeur uₙ : n compte les années, uₙ compte les élèves", "u₄ = 180 se lit : après 4 années, l'école compte 180 élèves", "d'une année à la suivante : uₙ₊₁ = uₙ + 15, ou uₙ₊₁ = 1,1 × uₙ pour + 10 %", "le rang et l'année : u₇ correspond à 2033", "le piège : si la suite commence à u₁, tout se décale d'un cran"],
         defi="La lettre d'information de l'école compte 200 abonnés. Chaque mois, 10 % se désinscrivent, puis 30 nouveaux s'inscrivent. Écris uₙ₊₁ en fonction de uₙ, puis calcule u₁.",
         chap={"00-garde": "Des mots aux symboles", "01-situation": "Sofiane et l'école de musique", "02-notation": "Le rang et la valeur", "03-egalite": "Que veut dire u₄ = 180 ?", "04-question": "Question 1", "05-recurrence": "D'une année à la suivante", "06-annee": "Quelle année correspond à u₇ ?", "07-piege": "Le piège", "08-question": "Question 2", "09-defi": "À toi de jouer", "09b-correction": "Correction", "10-finale": "Ce que tu as appris"},
         qs=[("04-question", "Que veut dire u₆ = 210 ?", ["après 210 années, il y a 6 élèves", "après 7 années, il y a 210 élèves", "après 6 années, il y a 210 élèves"], 2, "L'indice 6 compte les années ; le nombre 210, c'est la valeur : le nombre d'élèves."),
             ("08-question", "Un orchestre perd 5 % de ses abonnés chaque année. On note uₙ le nombre d'abonnés après n années. Quelle relation convient ?", ["uₙ₊₁ = 0,95 × uₙ", "uₙ₊₁ = uₙ − 5", "uₙ₊₁ = 0,05 × uₙ"], 0, "Diminuer de 5 %, c'est multiplier par 1 − 0,05 = 0,95.")],
         tags=["suites", "notation uₙ", "rang et valeur", "relation de récurrence", "modéliser", "école de musique"],
         st="Tu lis u₅ = 90 sans te tromper ? 🎨 — 1re spé #Shorts",
         sq=("03-question", "u₅ = 90 (abonnés d'une chaîne) veut dire :", ["après 90 mois, 5 abonnés", "après 5 mois, 90 abonnés", "après 6 mois, 90 abonnés"], 1, "L'indice compte les mois, la valeur compte les abonnés : 50 + 5 × 8 = 90."),
         sa="Zoé lance sa chaîne de vidéos de dessin : 50 abonnés au départ, puis 8 de plus chaque mois. uₙ, c'est le nombre d'abonnés après n mois. Que veut dire u₅ = 90 ?",
         stoi="pour quel n a-t-on uₙ = 130 ?", srep="n = 10 : 50 + 10 × 8 = 130.",
         stags=["dessin", "chaîne vidéo", "abonnés", "notation", "suites"]),
]
# Les 4 vidéos communes : la même vidéo sert aussi la micro de la classe du dessus.
AUSSI = {
    "05": [{"classe": "premiere-spe", "notionId": "suites", "microId": "suite_arithmetique"}],
    "13": [{"classe": "premiere-spe", "notionId": "suites", "microId": "suite_geometrique"}],
    "18": [{"classe": "terminale-spe", "notionId": "suite_numerique", "microId": "suite_calculer_termes"}],
    "19": [{"classe": "terminale-spe", "notionId": "suite_numerique", "microId": "suite_explicite_recurrence"}],
}
# Terminale (28 à 38) : données dans leur propre fichier (session Tle, 12/11).
from suites_terminale_donnees import EPS_TLE, EXOS_TLE  # noqa: E402
EPS += EPS_TLE
EXOS.update(EXOS_TLE)


def entrees():
    temps = json.loads(TEMPS.read_text(encoding="utf-8"))
    out = []
    for e in EPS:
        if nom_voix(e) not in temps:
            print("⏭ pas encore mesuré :", e["num"], e["slug"])
            continue
        k = int(e["num"])
        jour = DEBUT + timedelta(days=2 * (k - 1))
        t = temps[nom_voix(e)]["clips"]
        # ⛔ YouTube refuse TOUS les chapitres s'il y en a un de moins de 10 s : on réunit un chapitre
        # trop court avec le suivant (« garde · situation »).
        bruts = [[0.0, e["chap"][next(iter(e["chap"]))]]] + [[t[c], lib] for c, lib in list(e["chap"].items())[1:]]
        chap = [bruts[0]]
        for deb, lib in bruts[1:]:
            if deb - chap[-1][0] < 10:
                chap[-1][1] += " · " + lib
            else:
                chap.append([deb, lib])
        if temps[nom_voix(e)]["duree"] - chap[-1][0] < 10:
            raise SystemExit(f"dernier chapitre de moins de 10 s : {e['slug']}")
        chap = [[mmss(d), lib] for d, lib in chap]
        cl, nom = e["classe"], f"eleveai-maths-{e['classe']}-suite-{e['slug']}"
        dos, lien = dossier(e), coach(e["classe"], e["notion"], e["micro"])
        acc = e["intro"] + "\n\nDans cette vidéo :\n" + "\n".join("• " + p for p in e["puces"])
        acc += f"\n\n⏸ {len(e['qs'])} questions-pauses : mets pause, et choisis !\n🥋 Ceinture {e['ceinture']}.\nUn défi en fin de vidéo, avec sa correction : {e['defi']}"
        acc += "\n\nPour s'entraîner :"
        if e["notion"] in EXOS:
            acc += f"\n• les exercices corrigés : {EXOS[e['notion']]}"
        acc += f"\n• la série du coach sur cette compétence : {lien}"
        acc += f"\n\n📈 Épisode {k} sur 38 de la série Suites d'EleveAI, de la 1re à la terminale."
        qs = [{"t": mmss(t[c]), "question": q, "choix": ch, "reponse": r, "explication": x} for c, q, ch, r, x in e["qs"]]
        base = {"notionId": e["notion"], "microId": e["micro"], "classe": cl, "serie": SERIE[cl], "prioritaire": True}
        p = {"id": f"{cl}-suite-{e['slug']}", **base, "pas_avant": jour.isoformat(), "ceinture": e["ceinture"], "type": "longue",
             "fichier": f"{dos}/{nom}.mp4", "miniature": f"{dos}/{nom}.png", "titre": e["titre"], "accroche": acc,
             "chapitres": chap, "tags": e["tags"] + COMMUNS[cl], "questions": qs, "centres": e["centres"]}
        if e["notion"] in EXOS:
            p["fiche_exercices"] = EXOS[e["notion"]]
        if e["num"] in AUSSI:
            p["aussi"] = AUSSI[e["num"]]
        out.append(p)
        tsh = temps[nom_voix(e) + "-short"]["clips"]
        c, q, ch, r, x = e["sq"]
        sacc = e["sa"] + f"\n\n🥋 Ceinture {e['sc']} : la version 100 % visuelle.\n👉 À toi : {e['stoi']} Ta réponse en commentaire !"
        sacc += f"\n\n▶️ L'épisode complet : {{{{LONGUE}}}}\n🎯 Le coach : {lien}\n\nFait à La Réunion 🌋 — Frédéric Lacoste\n\n#Shorts #maths #suites #{NOM_CLASSE[cl].replace(' ', '')} #lycée"
        s = {"id": f"{cl}-suite-{e['slug']}-short", **base, "pas_avant": (jour + timedelta(days=1)).isoformat(), "ceinture": e["sc"],
             "type": "short", "renvoie_vers": p["id"], "fichier": f"{dos}/{nom}-short.mp4", "miniature": f"{dos}/{nom}-short.png",
             "titre": e["st"], "accroche": sacc, "tags": e["stags"] + COMMUNS[cl] + [f"ceinture {e['sc']}", "Shorts"],
             "questions": [{"t": mmss(tsh[c]), "question": q, "choix": ch, "reponse": r, "explication": x}], "centres": e["scentres"]}
        if e["num"] in AUSSI:
            s["aussi"] = AUSSI[e["num"]]
        out.append(s)
    return out


def main():
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    mode = sys.argv[1]
    if mode == "temps":
        filtre = sys.argv[2] if len(sys.argv) > 2 else ""
        res = json.loads(TEMPS.read_text(encoding="utf-8")) if TEMPS.exists() else {}
        for e in EPS:
            for suf in ("", "-short"):
                nom = nom_voix(e) + suf
                if filtre not in nom:
                    continue
                mp4 = SORTIES / dossier(e) / f"eleveai-maths-{nom}.mp4"
                clips, duree = mesurer(nom, mp4)
                res[nom] = {"duree": duree, "clips": clips}
                print(nom, duree, {c: mmss(v) for c, v in clips.items() if "question" in c})
        TEMPS.write_text(json.dumps(res, ensure_ascii=False, indent=1), encoding="utf-8")
    elif mode == "manifeste":
        sauve = Path(tempfile.gettempdir()) / "manifeste-youtube.avant-suites.json"
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
