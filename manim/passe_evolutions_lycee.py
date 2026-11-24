# passe_evolutions_lycee.py
# Passe finale de la série ÉVOLUTIONS EN POURCENTAGE (automatismes de 1re, 23/11/2026) : 8 épisodes
# communs 1re + STMG (07 à 14 du dossier proportionnalite), + garde 2de pour 11, 12, 13 (numéros 03, 04, 05).
# Copie de passe_affines_3e.py.
#   · 1re : 16 entrées prioritaires, une paire par jour du 11/07 au 18/07/2027 (après 3e-affine-defi).
#   · STMG et 2de : même vidéo, seule la garde change ; short = copie du short 1re. Entrées « plus_tard »
#     (comme la série proportionnalité lycée 01-06) : elles servent au site et au coach, pas à YouTube.
# Les temps des chapitres et des questions sont relevés dans l'AUDIO des mp4 (passe_distributivite.mesurer),
# jamais estimés ; un chapitre de moins de 10 s est fondu dans le précédent (passe_decimaux.chapitres).
# Le manifeste a des modifications non commitées d'autres sessions : on relit la copie de travail et on
# ajoute seulement nos entrées <classe>-prop-evo-<slug>[-short].
#
#   python manim/passe_evolutions_lycee.py temps [filtre] → manim/sorties/premiere/maths/proportionnalite/temps-evolutions.json
#   python manim/passe_evolutions_lycee.py voir           → affiche les entrées sans rien écrire
#   python manim/passe_evolutions_lycee.py manifeste      → ajoute ou remplace nos entrées
#   python manim/passe_evolutions_lycee.py coupes         → les valeurs de COUPE_PAR_VIDEO (LecteurVideo.tsx)
import json
import shutil
import sys
import tempfile
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from passe_distributivite import mesurer, mmss  # noqa: E402
from passe_decimaux import chapitres, chap0  # noqa: E402

RACINE = Path(__file__).resolve().parents[1]
SORTIES = RACINE / "manim" / "sorties"
MANIFESTE = RACINE / "manim" / "manifeste-youtube.json"
TEMPS = SORTIES / "premiere" / "maths" / "proportionnalite" / "temps-evolutions.json"
SCRIPTS = RACINE / "manim" / "scripts" / "premiere"

# classe → (libellé, série, notion des épisodes 07-10, notion 11, notion 12-14, fiche 07-10, fiche 11, fiche 12-14)
CLASSES = {
    "premiere": dict(lib="1re", serie="Maths 1re", n1="auto_coefficient_multiplicateur", n2="auto_taux_evolution",
                     n3="auto_taux_evolution",
                     f1="https://www.eleveai.fr/fiches-exercices/maths/premiere/auto-coefficient-multiplicateur",
                     f2="https://www.eleveai.fr/fiches-exercices/maths/premiere/auto-taux-evolution",
                     f3="https://www.eleveai.fr/fiches-exercices/maths/premiere/auto-taux-evolution"),
    "stmg": dict(lib="STMG", serie="Maths STMG", n1="auto_evo_coefficient", n2="auto_evo_taux", n3="auto_evo_enchainees",
                 f1="https://www.eleveai.fr/fiches-exercices/maths/stmg/auto-evo-coefficient",
                 f2="https://www.eleveai.fr/fiches-exercices/maths/stmg/auto-evo-taux",
                 f3="https://www.eleveai.fr/fiches-exercices/maths/stmg/auto-evo-enchainees"),
    "seconde": dict(lib="2de", serie="Maths 2de", n1=None, n2="information_chiffree_evolutions",
                    n3="information_chiffree_evolutions", f1=None,
                    f2="https://www.eleveai.fr/fiches-cours/maths/seconde/information-chiffree-evolutions",
                    f3="https://www.eleveai.fr/fiches-cours/maths/seconde/information-chiffree-evolutions"),
}
MICRO_2DE = {"calculer-taux": "info_taux_evolution", "successives": "info_evolutions_successives",
             "reciproque": "info_evolution_reciproque"}
NUM_2DE = {"calculer-taux": "03", "successives": "04", "reciproque": "05"}


def coach(classe, notion, micro):
    return f"https://www.eleveai.fr/coach/serie?classe={classe}&matiere=maths&notion={notion}&microId={micro}&display=simple"


def Q(c, q, ch, r, x):
    return (c, q, ch, r, x)


# Chapitres : 00-garde porte le libellé de la situation (01 commence avant 10 s : chap0 le fond dans 00).
def chap(situation, c03, c04, c05, c07, *, k03, k04, k05, k07):
    return {"00-garde": situation, "01-situation": situation, "02-question-du-jour": "La question du jour",
            k03: c03, k04: c04, k05: c05, "06-question": "Question 1", k07: c07, "08-question": "Question 2",
            "09-defi": "À toi de jouer", "09b-correction": "Correction", "10-finale": "Ce que tu as appris"}


EPS = [
    dict(num="07", slug="additif", n=7, micro="auto_evo_additif_multiplicatif", groupe=1, date="2027-07-11",
         ceinture="jaune", centres=["argent-budget"], scentres=["argent-budget"],
         titre="Plus 2 %, c'est fois combien ? Le coefficient multiplicateur d'une hausse — épisode 7",
         intro="Le 1er novembre 2024, le Smic horaire brut passe de 11,65 € à 11,88 € : + 2 %. Comment passer de l'un à l'autre en un seul calcul ? La gestionnaire de paie le fait pour chaque salaire, le commerçant pour chaque prix, l'économiste pour chaque indice.",
         puces=["une barre de 100 %, plus 2 % au bout : 102 %",
                "102 % = 1,02 : augmenter de 2 %, c'est multiplier par 1,02 ; 11,65 × 1,02 ≈ 11,88 €",
                "la règle : + t %, c'est × (1 + t ÷ 100) ; + 5 % : × 1,05 ; + 30 % : × 1,3 ; + 100 % : × 2",
                "le piège : + 5 %, ce n'est pas × 1,5 (ça, c'est + 50 %)"],
         defi="par combien multiplie-t-on pour augmenter de 12 % ? et de 0,5 % ?",
         source="Smic horaire brut au 1er novembre 2024 (service-public.fr).",
         chap=chap("Le Smic augmente de 2 %", "Une barre de 100 %", "102 % = 1,02", "La règle : × (1 + t ÷ 100)",
                   "Le piège : × 1,5 ?", k03="03-barre", k04="04-coefficient", k05="05-regle", k07="07-piege"),
         qs=[Q("06-question", "Augmenter de 7 %, c'est multiplier par :", ["7", "0,07", "1,07"], 2,
               "100 % + 7 % = 107 % = 1,07. A rend le prix 7 fois plus grand ; B ne calcule que la hausse."),
             Q("08-question", "Un loyer de 600 € augmente de 3 %. Quel calcul donne le nouveau loyer ?",
               ["600 × 1,03", "600 × 1,3", "600 + 3"], 0,
               "+ 3 % : × 1,03, soit 618 €. B augmente de 30 % ; C n'ajoute que 3 €.")],
         tags=["coefficient multiplicateur", "augmentation en pourcentage", "hausse de 2 %", "Smic", "salaire"],
         st="Plus 5 %, c'est fois 1,5 ? Le piège du coefficient multiplicateur 🔍",
         sq=Q("02-question", "Plus 20 %, c'est fois :", ["1,02", "1,2", "20"], 1, "100 % + 20 % = 120 % = 1,2."),
         sa="Un prix augmente de 5 %. On le multiplie par 1,5 ? Non ! 1,5, c'est 150 % : + 50 %.\nPlus 5 %, c'est 105 % : × 1,05.",
         stoi="plus 8 %, c'est fois combien ? Réponds en commentaire !",
         stags=["coefficient multiplicateur", "augmentation", "pourcentage"]),
    dict(num="08", slug="diminution", n=8, micro="auto_evo_diminution", groupe=1, date="2027-07-12",
         ceinture="jaune", centres=["art-design", "nature-ecologie"], scentres=["art-design"],
         titre="Moins 30 %, c'est fois 0,3 ? Le coefficient d'une baisse — épisode 8",
         intro="Les soldes commencent : un manteau à 80 € est soldé à − 30 %. Le vendeur change l'étiquette, la cliente veut savoir ce qu'elle paiera. La même baisse sert ailleurs : une ingénieure réduit de 15 % la consommation d'un bâtiment, un agriculteur voit sa récolte baisser de 10 %.",
         puces=["une barre de 100 %, on retire 30 % : il reste 70 %",
                "70 % = 0,7 : baisser de 30 %, c'est multiplier par 0,7 ; 80 × 0,7 = 56 €",
                "la règle : − t %, c'est × (1 − t ÷ 100) ; − 15 % : × 0,85 ; − 10 % : × 0,9",
                "le coefficient d'une baisse est plus petit que 1, celui d'une hausse plus grand que 1",
                "le piège : × 0,3, on ne garde que 30 % (une baisse de 70 %)"],
         defi="par combien multiplie-t-on pour baisser de 18 % ? et un coefficient de 0,92, quelle évolution est-ce ?",
         source="Exemples de la vie courante (soldes, consommation d'énergie, récolte).",
         chap=chap("Les soldes : − 30 %", "Ce qui reste : 70 %", "70 % = 0,7", "La règle : × (1 − t ÷ 100)",
                   "Le piège : × 0,3 ?", k03="03-barre", k04="04-coefficient", k05="05-regle", k07="07-piege"),
         qs=[Q("06-question", "Baisser de 4 %, c'est multiplier par :", ["0,4", "0,96", "0,6"], 1,
               "100 % − 4 % = 96 % = 0,96. A et C ne gardent que 40 % ou 60 %."),
             Q("08-question", "Un abonnement à 40 € baisse de 25 %. Combien coûte-t-il ?", ["10 €", "15 €", "30 €"], 2,
               "− 25 % : × 0,75 ; 40 × 0,75 = 30 €. A, c'est 25 % du prix ; B retire 25 €.")],
         tags=["coefficient multiplicateur", "baisse en pourcentage", "diminution", "soldes", "remise"],
         st="Moins 30 % sur un jean à 50 € : on fait fois 0,3 ? 🔍",
         sq=Q("02-question", "Moins 10 %, c'est fois :", ["0,9", "0,1", "1,1"], 0, "Il reste 90 %, soit 0,9."),
         sa="Moins 30 % sur un jean à 50 €. Fois 0,3 ? Il ne resterait que 15 € !\nMoins 30 %, il reste 70 % : 50 × 0,7 = 35 €.",
         stoi="moins 45 %, c'est fois combien ? Réponds en commentaire !",
         stags=["soldes", "baisse", "coefficient multiplicateur"]),
    dict(num="09", slug="valeur-finale", n=9, micro="auto_evo_valeur_finale", groupe=1, date="2027-07-13",
         ceinture="jaune", centres=["reseaux-sociaux", "sciences"], scentres=["musique"],
         titre="12 000 abonnés, + 15 % : combien ? Calculer une valeur d'arrivée — épisode 9",
         intro="Une créatrice de vidéos compte 12 000 abonnés, et sa chaîne progresse de 15 % ce mois-ci. Dans une usine, une ingénieure prévoyait une facture d'énergie de 45 000 €, mais elle baisse de 8 %. Deux métiers, une même question : combien à l'arrivée ?",
         puces=["deux temps : traduire le taux en coefficient, puis multiplier la valeur de départ",
                "12 000 × 1,15 = 13 800 abonnés ; 45 000 × 0,92 = 41 400 €",
                "sans calculatrice : 10 % de 12 000 = 1 200, 5 % = 600, donc 15 % = 1 800",
                "le piège : 1 800 n'est que la hausse, on n'oublie pas les 12 000 du départ"],
         defi="un vélo à 350 € est soldé à − 20 %, un salaire de 1 800 € augmente de 5 % : calcule les deux valeurs d'arrivée.",
         source="Exemples de la vie courante (abonnés, facture d'énergie).",
         chap=chap("12 000 abonnés, + 15 %", "La méthode en deux temps", "Avec une baisse : − 8 %",
                   "De tête : 10 % + 5 %", "Le piège : la hausse seule", k03="03-methode", k04="04-baisse",
                   k05="05-tete", k07="07-piege"),
         qs=[Q("06-question", "200 € augmentent de 15 %. On obtient :", ["230 €", "215 €", "30 €"], 0,
               "200 × 1,15 = 230 €. B ajoute 15 € au lieu de 15 % ; C, c'est la hausse seule."),
             Q("08-question", "Une ville de 50 000 habitants perd 2 %. Combien en reste-t-il ?", ["1 000", "49 000", "49 998"], 1,
               "50 000 × 0,98 = 49 000. A, c'est la baisse seule ; C retire 2 habitants.")],
         tags=["valeur finale", "appliquer un taux d'évolution", "coefficient multiplicateur", "abonnés", "facture d'énergie"],
         st="Un billet à 40 €, + 25 % : il coûte 65 € ? 🔍",
         sq=Q("02-question", "60 € augmentent de 50 %. Combien ?", ["110 €", "30 €", "90 €"], 2, "60 × 1,5 = 90 €."),
         sa="Un billet de concert à 40 € augmente de 25 %. 65 € ? Non ! On ajoute 25 % de 40, pas 25 €.\n40 × 1,25 = 50 €.",
         stoi="80 € baissent de 25 %. Combien ? Réponds en commentaire !",
         stags=["valeur finale", "concert", "pourcentage"]),
    dict(num="10", slug="valeur-initiale", n=10, micro="auto_evo_valeur_initiale", groupe=1, date="2027-07-14",
         ceinture="orange", centres=["argent-budget", "technologie-ia"], scentres=["argent-budget"],
         titre="60 € TTC : le prix hors taxe est 48 € ? Retrouver une valeur de départ — épisode 10",
         intro="Sur un ticket de caisse, un casque coûte 60 € TTC, avec une TVA de 20 %. Le comptable doit retrouver le prix hors taxe. 60 − 20 %, soit 48 € ? Même problème pour une biologiste qui connaît une population après sa croissance, ou pour un vendeur qui retrouve son prix d'avant les soldes.",
         puces=["le schéma : prix HT × 1,2 = 60 ; pour revenir en arrière, on divise par 1,2",
                "60 ÷ 1,2 = 50 € ; on vérifie : 50 × 1,2 = 60",
                "le piège : 60 − 20 % = 48 €, faux ; 48 × 1,2 = 57,60 €, pas 60",
                "après une baisse, pareil : un pull à − 40 % coûte 30 € ; 30 ÷ 0,6 = 50 €"],
         defi="un prix TTC de 84 € avec 20 % de TVA : quel prix hors taxe ? un salaire augmenté de 5 % vaut 2 100 € : combien valait-il avant ?",
         source="TVA au taux normal de 20 % (service-public.fr).",
         chap=chap("Un casque à 60 € TTC", "Le schéma : × 1,2", "On divise : 60 ÷ 1,2", "Le piège : 60 − 20 % ?",
                   "Après une baisse", k03="03-schema", k04="04-calcul", k05="05-piege", k07="07-baisse"),
         qs=[Q("06-question", "Après une hausse de 25 %, un prix vaut 100 €. Prix de départ ?", ["75 €", "125 €", "80 €"], 2,
               "100 ÷ 1,25 = 80 €. On vérifie : 80 × 1,25 = 100. A retire 25 % à l'arrivée."),
             Q("08-question", "Après une baisse de 50 %, un jeu vaut 20 €. Son prix avant ?", ["30 €", "40 €", "10 €"], 1,
               "20 ÷ 0,5 = 40 €. On vérifie : la moitié de 40, c'est 20.")],
         tags=["valeur initiale", "retrouver une valeur de départ", "prix hors taxe", "TVA", "coefficient multiplicateur"],
         st="Avec 20 % de TVA, 120 € TTC : hors taxe, 96 € ? 🔍",
         sq=Q("02-question", "Après + 10 %, un prix vaut 110 €. Avant ?", ["100 €", "99 €", "121 €"], 0, "110 ÷ 1,1 = 100 €."),
         sa="Avec 20 % de TVA, un objet coûte 120 €. Hors taxe : 96 € ? Non ! 96 × 1,2 = 115,20 €.\nOn divise : 120 ÷ 1,2 = 100 €.",
         stoi="avec 20 % de TVA, un objet coûte 36 € TTC. Combien hors taxe ? Réponds en commentaire !",
         stags=["TVA", "prix hors taxe", "valeur initiale"]),
    dict(num="11", slug="calculer-taux", n=11, micro="auto_evo_calculer_taux", groupe=2, date="2027-07-15",
         ceinture="jaune", centres=["argent-budget", "sport"], scentres=["reseaux-sociaux"],
         titre="Livret A : de 3 % à 2,4 %, c'est − 0,6 % ? Calculer un taux d'évolution — épisode 11",
         intro="Le taux du Livret A était de 3 %. Le 1er février 2025, il passe à 2,4 % : il perd 0,6 point. Mais en pourcentage ? Une conseillère bancaire, un journaliste, une économiste doivent le dire en une phrase.",
         puces=["la formule : (arrivée − départ) ÷ départ ; (2,4 − 3) ÷ 3 = − 0,2, soit − 20 %",
                "l'autre chemin : le coefficient, arrivée ÷ départ ; 2,4 ÷ 3 = 0,8, il manque 20 %",
                "avec une hausse : de 400 à 460 baguettes, 60 ÷ 400 = 0,15, soit + 15 %",
                "le piège : on divise toujours par la valeur de départ",
                "− 0,6 point, ce n'est pas − 0,6 % : c'est − 20 %"],
         defi="une salle de sport passe de 250 à 300 inscrits, un forfait de 40 € à 30 € : calcule les deux taux d'évolution.",
         source="Livret A : 3 % jusqu'au 31 janvier 2025, 2,4 % au 1er février 2025 (Banque de France).",
         chap=chap("Le Livret A : de 3 % à 2,4 %", "La formule", "Le coefficient : arrivée ÷ départ",
                   "Avec une hausse", "Le piège : points ou pourcentage", k03="03-formule", k04="04-coefficient",
                   k05="05-hausse", k07="07-piege"),
         qs=[Q("06-question", "Un prix passe de 50 € à 60 €. Taux d'évolution ?", ["+ 10 %", "+ 20 %", "≈ + 17 %"], 1,
               "60 − 50 = 10 ; 10 ÷ 50 = 0,2, soit + 20 %. C divise par 60, l'arrivée."),
             Q("08-question", "Une ville passe de 80 000 à 60 000 habitants. Taux d'évolution ?", ["− 25 %", "− 20 %", "≈ − 33 %"], 0,
               "− 20 000 ÷ 80 000 = − 0,25, soit − 25 %. C divise par 60 000, l'arrivée.")],
         tags=["taux d'évolution", "calculer un taux d'évolution", "variation relative", "Livret A", "point de pourcentage"],
         st="De 20 € à 25 € : le prix augmente de 5 % ? 🔍",
         sq=Q("02-question", "De 40 à 50 abonnés : quel taux ?", ["+ 10 %", "+ 20 %", "+ 25 %"], 2, "10 ÷ 40 = 0,25, soit + 25 %."),
         sa="Un prix passe de 20 € à 25 €. + 5 % ? Non ! 5 € de plus, sur 20 €.\n5 ÷ 20 = 0,25 : + 25 %.",
         stoi="de 50 à 40, quel taux d'évolution ? Réponds en commentaire !",
         stags=["taux d'évolution", "pourcentage", "abonnés"]),
    dict(num="12", slug="successives", n=12, micro="auto_evo_successives", groupe=3, date="2027-07-16",
         ceinture="orange", centres=["art-design", "argent-budget"], scentres=["art-design"],
         titre="− 30 % puis − 20 % : − 50 % ? Les évolutions successives — épisode 12",
         intro="En janvier, un magasin solde un blouson à − 30 %. Fin janvier, deuxième démarque : − 20 % sur le prix soldé. L'affiche promet « jusqu'à − 50 % ». Et les prix de la vie courante s'enchaînent aussi : en France, + 5,2 % en 2022, puis + 4,9 % en 2023.",
         puces=["on enchaîne les coefficients : − 30 %, × 0,7 ; puis − 20 %, × 0,8",
                "0,7 × 0,8 = 0,56 : il reste 56 %, une baisse de 44 %, pas de 50 %",
                "le piège : on n'additionne pas les taux, la 2e baisse porte sur un prix déjà baissé",
                "les prix en France : 1,052 × 1,049 ≈ 1,104, soit + 10,4 % en deux ans"],
         defi="un loyer augmente de 5 % deux années de suite : quel taux au total ? un prix baisse de 50 %, puis encore de 50 % ?",
         source="Prix à la consommation en France : + 5,2 % en 2022, + 4,9 % en 2023, moyennes annuelles (Insee).",
         chap=chap("Deux démarques sur un blouson", "On enchaîne les coefficients", "0,7 × 0,8 = 0,56",
                   "Le piège : additionner", "Les prix en France", k03="03-chaine", k04="04-calcul",
                   k05="05-piege", k07="07-prix"),
         qs=[Q("06-question", "+ 10 %, puis + 10 % : au total ?", ["+ 21 %", "+ 20 %", "+ 100 %"], 0,
               "1,1 × 1,1 = 1,21, soit + 21 %. B additionne les taux."),
             Q("08-question", "Une action : + 20 %, puis − 10 %. Au total ?", ["+ 10 %", "+ 2 %", "+ 8 %"], 2,
               "1,2 × 0,9 = 1,08, soit + 8 %. A additionne les taux.")],
         tags=["évolutions successives", "taux global", "multiplier les coefficients", "soldes", "inflation"],
         st="− 50 %, puis encore − 50 % : c'est gratuit ? 🔍",
         sq=Q("02-question", "− 20 %, puis − 20 % : au total ?", ["− 40 %", "− 36 %", "− 4 %"], 1, "0,8 × 0,8 = 0,64, soit − 36 %."),
         sa="Moins 50 %, puis encore moins 50 %. Gratuit ? Non ! 0,5 × 0,5 = 0,25.\nIl reste un quart du prix : − 75 %.",
         stoi="plus 50 %, puis plus 50 %. Quel taux au total ? Réponds en commentaire !",
         stags=["évolutions successives", "soldes", "pourcentage"]),
    dict(num="13", slug="reciproque", n=13, micro="auto_evo_reciproque", groupe=3, date="2027-07-17",
         ceinture="bleue", centres=["argent-budget", "corps-sante"], scentres=["jeux-video"],
         titre="Après − 20 %, + 20 % suffit-il ? L'évolution réciproque — épisode 13",
         intro="Le Livret A est passé de 3 % à 2,4 % : − 20 %. Pour retrouver 3 %, faudrait-il une hausse de 20 % ? Même question pour une kinésithérapeute dont le patient a perdu 20 % de sa force après une blessure, ou pour un commerçant qui veut revenir à son prix d'avant les soldes.",
         puces=["on teste : 2,4 × 1,2 = 2,88, pas 3 : + 20 % ne suffit pas",
                "le coefficient réciproque : 1 ÷ 0,8 = 1,25, soit + 25 % ; 2,4 × 1,25 = 3",
                "la règle : si une évolution a pour coefficient c, sa réciproque a pour coefficient 1 ÷ c",
                "le piège : après une baisse, la hausse pour revenir est toujours plus grande"],
         defi="une action perd 60 % : quelle hausse pour revenir ? et après une hausse de 100 %, quelle baisse ?",
         source="Livret A : 3 % → 2,4 % au 1er février 2025 (Banque de France).",
         chap=chap("Livret A : − 20 %, et pour revenir ?", "On teste : + 20 %", "Le coefficient réciproque",
                   "La règle : 1 ÷ c", "Le piège : le même taux", k03="03-test", k04="04-coefficient",
                   k05="05-regle", k07="07-piege"),
         qs=[Q("06-question", "Un prix baisse de 50 %. Pour revenir au départ, il faut :", ["+ 50 %", "+ 150 %", "+ 100 %"], 2,
               "1 ÷ 0,5 = 2 : il faut doubler, + 100 %."),
             Q("08-question", "Un loyer augmente de 25 %. Pour revenir au départ, il faut :", ["− 20 %", "− 25 %", "− 125 %"], 0,
               "1 ÷ 1,25 = 0,8 : − 20 %.")],
         tags=["évolution réciproque", "taux réciproque", "coefficient réciproque", "Livret A", "revenir au prix de départ"],
         st="Ton score baisse de 20 % : + 20 % pour revenir ? 🔍",
         sq=Q("02-question", "Après − 10 %, pour revenir, il faut environ :", ["+ 10 %", "≈ + 11,1 %", "+ 90 %"], 1,
              "1 ÷ 0,9 ≈ 1,111, soit + 11,1 %."),
         sa="Ton score baisse de 20 %. + 20 % pour revenir ? Non ! 100 − 20 % = 80, et 80 + 20 % = 96.\nIl faut + 25 % : 80 × 1,25 = 100.",
         stoi="après moins 75 %, quelle hausse pour revenir ? Réponds en commentaire !",
         stags=["évolution réciproque", "score", "pourcentage"]),
    dict(num="14", slug="compensation", n=14, micro="auto_evo_piege_compensation", groupe=3, date="2027-07-18",
         ceinture="orange", centres=["jeux-video", "argent-budget"], scentres=["argent-budget"],
         titre="+ 20 % puis − 20 % : retour au prix ? Le piège de la compensation — épisode 14",
         intro="Un jeu vidéo coûte 50 €. Le jour de sa sortie, son prix monte de 20 %. Un mois plus tard, il baisse de 20 %. Le joueur pense qu'il est revenu à 50 €. Le trader, l'agente immobilière, le gérant d'un magasin connaissent ce piège par cœur.",
         puces=["on suit le prix : 50 × 1,2 = 60 €, puis 60 × 0,8 = 48 € ; il manque 2 €",
                "pourquoi : la baisse porte sur 60 €, elle retire 12 €, la hausse n'avait ajouté que 10 €",
                "avec les coefficients : 1,2 × 0,8 = 0,96, soit − 4 %",
                "plus le taux est grand, plus le piège est grand : 1,5 × 0,5 = 0,75, on perd un quart"],
         defi="un prix augmente de 40 %, puis baisse de 40 % : quel taux au total ? et quelle baisse ramènerait exactement au départ ?",
         source="Exemples de la vie courante (prix fictif d'un jeu vidéo, cours d'une action).",
         chap=chap("+ 20 %, puis − 20 % sur un jeu vidéo", "On suit le prix", "Pourquoi il manque 2 €",
                   "Avec les coefficients", "Plus le taux est grand…", k03="03-calcul", k04="04-pourquoi",
                   k05="05-coefficient", k07="07-grand"),
         qs=[Q("06-question", "Un prix : − 10 %, puis + 10 %. Au total :", ["il revient au départ", "− 1 %", "+ 1 %"], 1,
               "0,9 × 1,1 = 0,99, soit − 1 %. Une baisse et une hausse de même taux ne se compensent pas."),
             Q("08-question", "Une action : + 30 %, puis − 30 %. Au total :", ["0 %", "− 30 %", "− 9 %"], 2,
               "1,3 × 0,7 = 0,91, soit − 9 %.")],
         tags=["compensation", "hausse puis baisse", "évolutions successives", "jeu vidéo", "bourse"],
         st="+ 50 %, puis − 50 % : on revient au départ ? 🔍",
         sq=Q("02-question", "+ 10 %, puis − 10 %, sur 200 € :", ["198 €", "200 €", "202 €"], 0,
              "220 €, puis 220 − 22 = 198 €."),
         sa="Plus 50 %, puis moins 50 %. On revient au départ ? Non ! 100 €, puis 150 €, puis 75 €.\n× 1,5, puis × 0,5 : au total, × 0,75.",
         stoi="moins 20 %, puis plus 20 %, sur 50 €. Combien à la fin ? Réponds en commentaire !",
         stags=["compensation", "hausse puis baisse", "pourcentage"]),
]

COMMUNS = ["évolutions en pourcentage", "pourcentages", "proportionnalité", "automatismes", "maths", "lycée", "EleveAI"]
HASHTAGS = {"premiere": "#1re #automatismes", "stmg": "#stmg #lycee", "seconde": "#2de #lycee"}


def classes_de(e):
    return ["premiere", "stmg"] + (["seconde"] if e["slug"] in MICRO_2DE else [])


def num(e, classe):
    return NUM_2DE[e["slug"]] if classe == "seconde" else e["num"]


def ep_n(e, classe):
    return int(num(e, classe))


def dossier(e, classe):
    return f"{classe}/maths/proportionnalite/{num(e, classe)}-evo-{e['slug']}"


def ident(e, classe, short=False):
    return f"{classe}-prop-evo-{e['slug']}" + ("-short" if short else "")


def mp4(e, classe, short=False):
    return SORTIES / dossier(e, classe) / f"eleveai-maths-{ident(e, classe, short)}.mp4"


def notion_micro(e, classe):
    c = CLASSES[classe]
    g = e["groupe"]
    notion = c["n1"] if g == 1 else c["n2"] if g == 2 else c["n3"]
    fiche = c["f1"] if g == 1 else c["f2"] if g == 2 else c["f3"]
    micro = MICRO_2DE[e["slug"]] if classe == "seconde" else e["micro"]
    return notion, micro, fiche


def script(e, short=False):
    return "prop_lycee_evo_" + e["slug"].replace("-", "_") + ("_short" if short else "")


def lire_temps():
    if not TEMPS.exists():
        raise SystemExit(f"Fichier des temps absent : {TEMPS}\nLance d'abord : python manim/passe_evolutions_lycee.py temps")
    return json.loads(TEMPS.read_text(encoding="utf-8"))


def entrees():
    temps = lire_temps()
    out, manque = [], []
    for e in EPS:
        for classe in classes_de(e):
            for s in (False, True):
                if ident(e, classe, s) not in temps:
                    manque.append(ident(e, classe, s))
    if manque:
        raise SystemExit("Pas de temps pour : " + ", ".join(manque))
    for e in EPS:
        for classe in classes_de(e):
            c = CLASSES[classe]
            notion, micro, fiche = notion_micro(e, classe)
            ide = ident(e, classe)
            dos = dossier(e, classe)
            nom = f"eleveai-maths-{ide}"
            prio = classe == "premiere"
            tp = temps[ide]
            t = tp["clips"]
            exos = "les exercices corrigés" + (" (automatismes de 1re)" if classe == "stmg" else "")
            if classe == "seconde":
                exos = "la fiche de cours et ses exercices"
            acc = e["intro"] + "\n\nDans cette vidéo :\n" + "\n".join("• " + p for p in e["puces"])
            acc += f"\n\n⏸ 2 questions-pauses : mets pause, et choisis !\n🥋 Ceinture {e['ceinture']}.\nUn défi en fin de vidéo, avec sa correction : {e['defi']}"
            acc += f"\n\nPour s'entraîner :\n• {exos} : {fiche}\n• la série du coach sur cette compétence : {coach(classe, notion, micro)}"
            acc += f"\n\nSource : {e['source']}"
            acc += f"\n\n📈 Épisode {ep_n(e, classe)} : les évolutions en pourcentage, automatismes de l'épreuve anticipée de maths."
            acc += "\n⚖️ Cette vidéo fait partie de la série Proportionnalité d'EleveAI, du CM1 à la terminale."
            titre = f"{e['titre'].rsplit(' — épisode', 1)[0]} — épisode {ep_n(e, classe)} · {c['serie']}"
            qs = [{"t": mmss(t[k]), "question": q, "choix": ch, "reponse": r, "explication": x} for k, q, ch, r, x in e["qs"]]
            longue = {"id": ide}
            if prio:
                longue.update({"pas_avant": e["date"], "prioritaire": True})
            longue.update({
                "notionId": notion, "microId": micro, "classe": classe, "ceinture": e["ceinture"], "serie": c["serie"],
                "type": "longue", "fichier": f"{dos}/{nom}.mp4", "miniature": f"{dos}/{nom}.png", "titre": titre,
                "accroche": acc, "chapitres": chap0(chapitres(e["chap"], t, tp["duree"])), "fiche": fiche,
                "tags": e["tags"] + COMMUNS[:4] + [c["lib"]] + COMMUNS[4:], "questions": qs, "centres": e["centres"],
            })
            if not prio:
                longue["plus_tard"] = True
            out.append(longue)
            ts = temps[f"{ide}-short"]["clips"]
            k, q, ch, r, x = e["sq"]
            sacc = e["sa"] + f"\n\nVoix de synthèse.\n🥋 Ceinture blanche : la version 100 % visuelle.\n👉 À toi : {e['stoi']}"
            sacc += f"\n\n▶️ L'épisode complet : {{{{LONGUE}}}}\n🎯 Le coach : {coach(classe, notion, micro)}\n\nFait à La Réunion 🌋 — Frédéric Lacoste\n\n#Shorts #maths #pourcentages {HASHTAGS[classe]}"
            short = {"id": f"{ide}-short"}
            if prio:
                short.update({"pas_avant": e["date"], "prioritaire": True})
            short.update({
                "notionId": notion, "microId": micro, "classe": classe, "ceinture": "blanche", "serie": c["serie"],
                "type": "short", "renvoie_vers": ide, "fichier": f"{dos}/{nom}-short.mp4", "miniature": f"{dos}/{nom}-short.png",
                "titre": f"{e['st']} — {c['lib']} #Shorts", "accroche": sacc,
                "tags": e["stags"] + ["évolutions en pourcentage", "maths", c["lib"], "lycée", "EleveAI", "ceinture blanche", "Shorts"],
                "questions": [{"t": mmss(ts[k]), "question": q, "choix": ch, "reponse": r, "explication": x}],
                "centres": e["scentres"],
            })
            if not prio:
                short["plus_tard"] = True
            out.append(short)
            for tt in (titre, short["titre"]):
                if len(tt) > 100:
                    print(f"TITRE TROP LONG ({len(tt)}) : {tt}", file=sys.stderr)
    return out


def coupes():
    """COUPE_PAR_VIDEO (components/LecteurVideo.tsx), comme passe_affines_3e.coupes : secondes retirées à la fin
    du mp4, rapportées à la durée de la VIDÉO (ffprobe). Paysage : milieu de la pause entre « point f r. » et
    « Et si ». Short : « Mets » − 0,03 s."""
    import subprocess
    temps = lire_temps()
    res = {}
    for e in EPS:
        for classe in classes_de(e):
            for s in (False, True):
                nom = ident(e, classe, s)
                if nom not in temps:
                    continue
                vnom = f"lycee-evo-{e['slug']}" + ("-short" if s else "")
                voix = json.loads((RACINE / "manim" / "voix" / f"{vnom}.json").read_text(encoding="utf-8"))
                cle = [k for k in voix if k.endswith("abonne")][0]
                texte = voix[cle]
                marques = json.loads((SCRIPTS / f"{script(e, s)}_marques.json").read_text(encoding="utf-8"))[cle]
                debut = temps[nom]["clips"][cle]
                duree = float(subprocess.run(["ffprobe", "-v", "error", "-select_streams", "v:0", "-show_entries",
                                              "stream=duration", "-of", "csv=p=0", str(mp4(e, classe, s))],
                                             capture_output=True, text=True).stdout.strip())

                def instant(mot):
                    return dict(marques)[texte.index(mot)]

                if s:
                    t = debut + instant("Mets")
                    res[nom] = round(duree - t + 0.03, 2)
                else:
                    t_et = instant("Et si")
                    avant = [m for c, m in marques if m < t_et][-1]
                    t = debut + (avant + t_et) / 2
                    res[nom] = round(duree - t, 1)
                print(nom, "durée vidéo", round(duree, 2), "coupe à", round(t, 2), "→", res[nom])
    return res


def main():
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    mode = sys.argv[1]
    if mode == "temps":
        res = json.loads(TEMPS.read_text(encoding="utf-8")) if TEMPS.exists() else {}
        filtre = sys.argv[2] if len(sys.argv) > 2 else ""
        for e in EPS:
            for classe in classes_de(e):
                for s in (False, True):
                    nom = ident(e, classe, s)
                    f = mp4(e, classe, s)
                    if filtre not in nom or not f.exists():
                        continue
                    clips, duree = mesurer(f"lycee-evo-{e['slug']}" + ("-short" if s else ""), f)
                    res[nom] = {"duree": duree, "clips": clips}
                    print(nom, duree, "fin", clips[list(clips)[-1]])
        if not res:
            raise SystemExit("Aucun mp4 trouvé : rien à mesurer.")
        TEMPS.write_text(json.dumps(res, ensure_ascii=False, indent=1), encoding="utf-8")
    elif mode == "coupes":
        print(json.dumps(coupes(), ensure_ascii=False))
    elif mode == "voir":
        print(json.dumps(entrees(), ensure_ascii=False, indent=1))
    elif mode == "manifeste":
        sauve = Path(tempfile.gettempdir()) / "manifeste-youtube.avant-evolutions-lycee.json"
        shutil.copy(MANIFESTE, sauve)
        # newline="" : garder les CRLF de la copie de travail (read_text les convertit, 24/11 : réécrit en LF).
        texte = MANIFESTE.open(encoding="utf-8", newline="").read()
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
