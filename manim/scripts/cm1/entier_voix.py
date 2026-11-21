# entier_voix.py
# EleveAI — série NOMBRES ENTIERS, du CM1 à la 6e (samedi 21/11/2026, poste 2).
# LA source unique des voix de la série : 11 paysages + 11 shorts = 22 vidéos.
#
#   python manim/scripts/cm1/entier_voix.py            → écrit manim/VOIX-entiers-cm1-6e.md (à faire valider)
#   python manim/scripts/cm1/entier_voix.py --ecrire    → écrit manim/voix/<id>.json (⛔ SEULEMENT après le « oui »)
#
# ⛔⛔ Pas un seul WAV, pas un seul rendu avant le « oui » de Frédéric : les voix se valident à deux.
#
# LE DÉCOUPAGE (tranché par Frédéric le 21/11, ne pas rediscuter) :
#   - LOT A : 6 épisodes servis au CM1 ET au CM2 (notion `nombre_entier`, mêmes microId dans les deux
#     banques). Une seule vidéo par micro, propriétaire = CM1, branchée au CM2 par le mécanisme `aussi`
#     (2 lignes `notion_ressources`), comme `ce1_masse_soupeser` reçoit la vidéo du CP dans la série Masses.
#   - LOT B : 5 épisodes en 6e (notion `entier_nombre`). ⛔ `entier_lire_ecrire` n'est PAS produit :
#     l'ancienne vidéo `6e-entier-nombre` est en ligne et la couvre (on garde, on produit autour).
#     `entier_comparer` et `entier_decomposer` existent aussi au lot A : en 6e ce sont des vidéos à part.
#
# ⚠️ L'ÉCART CM1 / CM2 (relevé à l'exécution des banques, 21/11 — voir manim/INVENTAIRE-entiers-cm1-6e.md) :
#   les 3 items `fixed` de chaque micro du CM2 sont bien des quasi-copies du CM1, MAIS les 8 à 11 GABARITS
#   ajoutés le 14/11 montent aux millions et aux milliards sur les SIX micros. Chaque paysage du lot A porte
#   donc un écran « 07-cm2 » qui ouvre la classe des millions (ou le critère de divisibilité pour les
#   multiples).
# ✅ TRANCHÉ PAR FRÉDÉRIC LE 21/11 : « Oui, garde-le ». L'écran « 07-cm2 » RESTE dans les six paysages du
#   lot A, et les six micros restent MUTUALISÉS CM1 + CM2 (une vidéo, deux lignes `notion_ressources`).
#   ⛔ Ne pas rouvrir la question : ni supprimer cet écran, ni séparer un micro en deux vidéos.
#
# Questions-pauses : la place de la bonne réponse (A, B ou C) et l'ordre des leurres sont tirés au hasard
# (⛔ GRAINE 2111), jamais deux fois la même lettre de suite dans une paysage, ≈ un tiers de A, de B, de C
# sur la série (REGLES.md, 09/11). Toute voix finit par la clé `…-abonne` (REGLES.md, en tête).
# Plafond de mots par phrase, vérifié ici, 0 phrase au-dessus : 18 au CM1 et au CM2, 20 en 6e.
# Centres d'intérêt : liste FERMÉE lib/videos/centres-interet.ts, vérifiés par ÂGE (CM1-6e = tranche 9-11,
# donc ⛔ pas de reseaux-sociaux, cinema-series ni argent-budget) — contrôle intégré ci-dessous.
#
# Après validation, une voix retouchée se corrige ICI, puis on relance --ecrire (il refuse d'écraser un JSON
# dont le WAV existe déjà, sauf --force).
import json
import random
import re
import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
MANIM = ICI.parents[1]
RACINE = MANIM.parent
FIN_P = ("Entraîne-toi sur éleveai point f r. Et si ça t'a aidé : mets un pouce, laisse un commentaire, "
         "abonne-toi et active la cloche !")
FIN_S = "Entraîne-toi sur éleveai point f r. Mets un pouce, abonne-toi et active la cloche !"

SEUIL_MOTS = {"cm1": 18, "cm2": 18, "6e": 20}
TRANCHE = {"cm1": "9-11", "cm2": "9-11", "6e": "9-11"}


def Q(q, juste, leurres, expl):
    return {"q": q, "juste": juste, "leurres": leurres, "expl": expl}


# (id, classe, micro, notion, aussi, ceinture paysage, ceinture short, métier, centres,
#  [écrans paysage], [écrans short])
# Un écran = (clé, texte) ou (clé, Q(...)) pour une question-pause (clé « 04-question » → « 04b-reponse »).
# `aussi` = (classe, microId) servi par la MÊME vidéo, ou None.
SERIE = [
    # ═══════════════ LOT A — 6 épisodes CM1 + CM2, notion `nombre_entier` ═══════════════
    ("cm1-entier-lire", "cm1", "entier_lire", "nombre_entier", ("cm2", "entier_lire"),
     "verte", "blanche", "Diego, cartographe", ["histoire-geographie"], [
        ("00-garde", "Lire et écrire les grands nombres. Comment écrit-on « douze mille trente » en chiffres ?"),
        ("01-situation", "Voici Diego. Il est cartographe : il dessine les cartes. "
                         "Sur chaque sommet, il écrit son altitude."),
        ("02-classes", "Un grand nombre se range par classes de trois chiffres. "
                       "La classe des mille, puis celle des unités."),
        ("03-zero", "« Douze mille » donne 12 dans la classe des mille. "
                    "« Trente » donne 030 dans les unités : le zéro garde la place vide."),
        ("04-question", Q("Comment écrit-on « douze mille trente » en chiffres ?", "12 030",
                          ["1 230", "12 300"],
                          "« Trente », c'est 030 dans la classe des unités. Le zéro garde la place des centaines.")),
        ("05-chiffre-nombre", "Attention : le chiffre des dizaines n'est pas le nombre de dizaines. "
                              "Le nombre, c'est tout ce qui est à gauche."),
        ("06-question", Q("Dans 29 404, combien de dizaines en tout ?", "2 940", ["4", "294"],
                          "On cache le dernier chiffre et on lit 2 940. Le chiffre des dizaines, lui, est 0.")),
        ("07-cm2", "Et au CM2, une classe de plus : les millions. "
                   "5 343 000 se lit « cinq millions trois cent quarante-trois mille »."),
        ("08-question", Q("« Soixante-dix millions neuf cent cinquante-sept » : quelle écriture est juste ?",
                          "70 000 957", ["70 957", "7 000 957"],
                          "Après la première classe, chaque classe prend trois chiffres : 70, puis 000, puis 957.")),
        ("09-defi", "À toi de jouer ! Écris en chiffres « quarante mille huit ». "
                    "Combien de zéros ? Mets pause, et cherche !"),
        ("09b-correction", "Correction. 40 008. Les centaines et les dizaines sont vides : "
                           "trois zéros en tout."),
        ("10-finale", "Ce que tu as appris. Un grand nombre se range par classes de trois chiffres. "
                      "Un zéro garde une place vide."),
    ], [
        ("00-accroche", "Salut ! Mon copain écrit « huit mille neuf » sur le tableau. Il écrit 8 900."),
        ("01-oups", "Huit mille neuf cents ? Ce n'est pas le même nombre !"),
        ("02-question", Q("« Huit mille neuf », ça s'écrit comment ?", "8 009", ["8 900", "8 090"],
                          "Neuf unités : deux zéros gardent les centaines et les dizaines.")),
        ("03-fin", "Un zéro oublié, et le nombre change de taille !"),
        ("04-commentaire", "À toi : écris « soixante mille quarante » en chiffres. Réponds en commentaire !"),
    ]),
    ("cm1-entier-comparer", "cm1", "entier_comparer", "nombre_entier", ("cm2", "entier_comparer"),
     "verte", "blanche", "Malik, bibliothécaire", ["jeux-defis", "histoire-geographie"], [
        ("00-garde", "Comparer des grands nombres. Lequel est le plus grand : 8 706 ou 8 760 ?"),
        ("01-situation", "Voici Malik. Il est bibliothécaire. "
                         "Il range les livres du plus petit numéro au plus grand."),
        ("02-compter", "D'abord, on compte les chiffres. Plus de chiffres, c'est plus grand."),
        ("03-colonne", "Même nombre de chiffres ? On compare de gauche à droite, "
                       "jusqu'au premier chiffre différent."),
        ("04-question", Q("12 408 et 12 804 : quel signe faut-il ?", "plus petit", ["plus grand", "égal"],
                          "Les deux commencent par 12. Ensuite 4 centaines est plus petit que 8 centaines.")),
        ("05-piege", "Le piège : 9 876 commence par 9, mais 10 234 est plus grand. "
                     "Il a un chiffre de plus."),
        ("06-question", Q("Quel nombre est le plus grand : 9 876 ou 10 234 ?", "10 234",
                          ["9 876", "les deux sont égaux"],
                          "10 234 a cinq chiffres, 9 876 n'en a que quatre. Plus de chiffres, plus grand.")),
        ("07-cm2", "Et au CM2, on compare des millions. Classe par classe, de gauche à droite : "
                   "la règle ne change pas."),
        ("08-question", Q("Range dans l'ordre croissant : 3 450, 3 045, 3 405.", "3 045, 3 405, 3 450",
                          ["3 045, 3 450, 3 405", "3 405, 3 045, 3 450"],
                          "Croissant, c'est du plus petit au plus grand : 3 045, puis 3 405, puis 3 450.")),
        ("09-defi", "À toi de jouer ! Trois classes ont ramassé 386 378, 389 358 et 389 378 bouchons. "
                    "Qui gagne ? Mets pause, et cherche !"),
        ("09b-correction", "Correction. Les trois commencent par 38. Puis 9 bat 6. "
                           "Enfin 389 378 bat 389 358."),
        ("10-finale", "Ce que tu as appris. On compte d'abord les chiffres. "
                      "Puis on compare de gauche à droite."),
    ], [
        ("00-accroche", "Salut ! Mon copain dit que 987 est plus grand que 1 002. Il commence par 9 !"),
        ("01-oups", "On compte les chiffres : trois contre quatre."),
        ("02-question", Q("Lequel est le plus grand : 987 ou 1 002 ?", "1 002", ["987", "c'est pareil"],
                          "Quatre chiffres battent trois chiffres. 1 002 gagne.")),
        ("03-fin", "Le premier chiffre ne décide rien tant qu'on n'a pas compté !"),
        ("04-commentaire", "À toi : range 4 410, 4 140 et 4 190 du plus petit au plus grand. "
                           "Réponds en commentaire !"),
    ]),
    ("cm1-entier-decomposer", "cm1", "entier_decomposer", "nombre_entier", ("cm2", "entier_decomposer"),
     "verte", "blanche", "Thomas, imprimeur", ["art-design", "technologie-ia"], [
        ("00-garde", "Décomposer un nombre. Que vaut chaque chiffre de 7 306 ?"),
        ("01-situation", "Voici Thomas. Il est imprimeur. Ses affiches arrivent par paquets : "
                         "mille, cent, dix, ou à l'unité."),
        ("02-valeur", "Chaque chiffre vaut selon sa colonne. "
                      "Dans 4 582 : 4 000, puis 500, puis 80, puis 2."),
        ("03-zero", "Un zéro ne s'écrit pas dans la décomposition. "
                    "7 306, c'est 7 000 plus 300 plus 6."),
        ("04-question", Q("Quelle est la bonne décomposition de 5 064 ?", "5 000 + 60 + 4",
                          ["5 000 + 600 + 4", "5 000 + 6 + 4"],
                          "Le 6 est aux dizaines : il vaut 60. Il n'y a aucune centaine.")),
        ("05-composer", "On peut faire l'inverse : composer. "
                        "20 000 plus 400 plus 9 donne 20 409."),
        ("06-question", Q("Quel nombre fait 70 plus 5 000 plus 800 ?", "5 870", ["758", "5 807"],
                          "L'ordre ne change rien : chaque nombre va dans sa colonne. 5 000, 800, 70.")),
        ("07-cm2", "Et au CM2, on décompose des millions. "
                   "639 600, c'est 600 000 plus 30 000 plus 9 000 plus 600."),
        ("08-question", Q("Dans 405 210, combien vaut le chiffre 5 ?", "5 000", ["500", "50 000"],
                          "Le 5 est dans la colonne des unités de mille : il vaut 5 000.")),
        ("09-defi", "À toi de jouer ! Un élève écrit : 12 405 égale 10 000 plus 2 000 plus 400 plus 50. "
                    "Où est l'erreur ? Mets pause, et cherche !"),
        ("09b-correction", "Correction. Le dernier chiffre est 5. Il vaut 5 unités, pas 50. "
                           "Il n'y a aucune dizaine."),
        ("10-finale", "Ce que tu as appris. Chaque chiffre vaut selon sa colonne. "
                      "Un rang vide ne s'écrit pas."),
    ], [
        ("00-accroche", "Salut ! Ma copine décompose 12 405. Elle écrit 10 000 plus 2 000 plus 400 plus 50."),
        ("01-oups", "Cinquante ? Le dernier chiffre est 5 : il vaut 5."),
        ("02-question", Q("Que vaut le dernier chiffre de 12 405 ?", "5 unités", ["50", "5 dizaines"],
                          "Le 5 est tout à droite : il vaut 5 unités. Il n'y a aucune dizaine.")),
        ("03-fin", "Une colonne de décalage, et le compte est faux !"),
        ("04-commentaire", "À toi : décompose 70 804. Réponds en commentaire !"),
    ]),
    ("cm1-entier-arrondir", "cm1", "entier_arrondir", "nombre_entier", ("cm2", "entier_arrondir"),
     "verte", "blanche", "Léna, météorologue", ["meteo-climat", "sciences"], [
        ("00-garde", "Arrondir un nombre. Quel est l'arrondi de 4 682 à la centaine près ?"),
        ("01-situation", "Voici Léna. Elle est météorologue. "
                         "Pour annoncer la pluie, elle donne un nombre simple à retenir."),
        ("02-encadrer", "D'abord, on encadre. 4 682 est entre 4 600 et 4 700."),
        ("03-regle", "Puis on regarde le chiffre juste à droite. "
                     "De 0 à 4 on garde, de 5 à 9 on monte."),
        ("04-question", Q("Quel est l'arrondi de 6 241 à la centaine près ?", "6 200", ["6 300", "6 240"],
                          "Le chiffre des dizaines est 4. Comme 4 est plus petit que 5, on garde 6 200.")),
        ("05-piege", "Le piège : arrondir, ce n'est pas couper. "
                     "4 682 à la centaine donne 4 700, pas 4 600."),
        ("06-question", Q("Arrondis 47 820 au millier près.", "48 000", ["47 000", "47 800"],
                          "Le chiffre des centaines est 8. Comme 8 vaut au moins 5, on monte à 48 000.")),
        ("07-cm2", "Et au CM2, on arrondit au million. 5 594 834 devient 6 000 000."),
        ("08-question", Q("Au millier près, quel nombre devient 29 000 ?", "28 805", ["29 982", "28 050"],
                          "Les nombres qui donnent 29 000 vont de 28 500 à 29 499. Seul 28 805 y est.")),
        ("09-defi", "À toi de jouer ! Un concert a réuni 86 246 personnes. "
                    "Arrondis au millier près. Mets pause, et cherche !"),
        ("09b-correction", "Correction. Le chiffre des centaines est 2. "
                           "Plus petit que 5 : on garde 86 000."),
        ("10-finale", "Ce que tu as appris. On encadre, puis on regarde le chiffre juste à droite. "
                      "De 5 à 9, on monte."),
    ], [
        ("00-accroche", "Salut ! Ma copine arrondit 4 682 à la centaine. Elle coupe la fin : 4 600."),
        ("01-oups", "Mais 4 682 est tout près de 4 700 !"),
        ("02-question", Q("4 682 arrondi à la centaine près, ça donne ?", "4 700", ["4 600", "4 680"],
                          "Le chiffre des dizaines est 8 : on monte à 4 700.")),
        ("03-fin", "Arrondir, ce n'est pas couper : c'est choisir le plus proche !"),
        ("04-commentaire", "À toi : arrondis 23 249 au millier près. Réponds en commentaire !"),
    ]),
    ("cm1-entier-multiple", "cm1", "entier_multiple", "nombre_entier", ("cm2", "entier_multiple"),
     "verte", "blanche", "Awa, fleuriste", ["nature-ecologie", "art-design"], [
        ("00-garde", "Les multiples. 42 est-il un multiple de 6 ?"),
        ("01-situation", "Voici Awa. Elle est fleuriste. "
                         "Elle compte ses roses par paquets de 10, sans qu'il en reste."),
        ("02-definition", "Un multiple de 6, c'est 6 fois un nombre entier. 6 fois 7 donne 42."),
        ("03-sans-reste", "Un multiple, c'est aussi des paquets pleins. "
                          "42 roses font 7 paquets de 6, sans reste."),
        ("04-question", Q("Quel nombre est un multiple de 9 ?", "63", ["65", "67"],
                          "9 fois 7 donne 63. Ni 65 ni 67 n'est dans la table de 9.")),
        ("05-dernier-chiffre", "Pour 2, 10 et 100, le dernier chiffre suffit. "
                               "Un multiple de 10 finit par zéro."),
        ("06-question", Q("Lequel est un multiple de 10 ?", "4 960", ["4 925", "4 911"],
                          "Un multiple de 10 finit par zéro. Seul 4 960 finit par zéro.")),
        ("07-cm2", "Et au CM2, une astuce pour 3 : on additionne les chiffres. "
                   "Dans 51 408 : 5 plus 1 plus 4 plus 0 plus 8 donne 18."),
        ("08-question", Q("Quel nombre n'est pas un multiple de 7 ?", "24", ["28", "56"],
                          "7 fois 4 donne 28, 7 fois 8 donne 56. 24 n'est pas dans la table de 7.")),
        ("09-defi", "À toi de jouer ! Un chocolatier remplit des ballotins de 7. "
                    "Quel total donne des ballotins pleins : 62, 63 ou 64 ? Mets pause, et cherche !"),
        ("09b-correction", "Correction. 7 fois 9 donne 63. "
                           "Avec 62 ou 64, il reste des chocolats."),
        ("10-finale", "Ce que tu as appris. Un multiple est un résultat de la table. "
                      "Des paquets pleins, sans reste."),
    ], [
        ("00-accroche", "Salut ! Ma copine range 35 billes par paquets de 4. Elle dit : ça tombe juste !"),
        ("01-oups", "On compte : 4, 8, 12… 32, et il en reste 3 !"),
        ("02-question", Q("Lequel est un multiple de 4 ?", "32", ["35", "34"],
                          "4 fois 8 donne 32. Ni 34 ni 35 n'est dans la table de 4.")),
        ("03-fin", "Un multiple, c'est quand il ne reste RIEN !"),
        ("04-commentaire", "À toi : combien de paquets de 6 avec 54 billes ? Réponds en commentaire !"),
    ]),
    ("cm1-entier-defi", "cm1", "entier_defi", "nombre_entier", ("cm2", "entier_defi"),
     "bleue", "blanche", "Sarah, factrice", ["transports", "jeux-defis"], [
        ("00-garde", "Le défi des nombres. Un nombre mystère se cache entre 3 900 et 4 000. Qui est-il ?"),
        ("01-situation", "Voici Sarah. Elle est factrice. "
                         "Un numéro de maison est effacé : elle doit le retrouver."),
        ("02-indices", "On garde les nombres entre 3 900 et 4 000. "
                       "Multiple de 10 : il finit par zéro."),
        ("03-dernier-indice", "Son chiffre des dizaines est 2. Un seul nombre convient : 3 920."),
        ("04-question", Q("Je suis entre 6 000 et 6 100, multiple de 10, et mes dizaines valent 9.",
                          "6 090", ["6 009", "6 095"],
                          "Multiple de 10 : il finit par zéro. Avec 9 dizaines, c'est 6 090.")),
        ("05-etiquettes", "Autre défi : quatre étiquettes, 6, 2, 7 et 9. "
                          "Pour le plus grand nombre, on range du plus grand chiffre au plus petit."),
        ("06-question", Q("Avec 0, 6, 8 et 3, quel est le plus petit nombre de quatre chiffres ?",
                          "3 068", ["368", "3 086"],
                          "Un nombre ne commence pas par zéro. On met 3, puis 0, puis 6, puis 8.")),
        ("07-cm2", "Et au CM2, les défis montent aux millions. "
                   "Juste après 6 999 999 vient 7 000 000."),
        ("08-question", Q("Une usine a fait 49 493 bouteilles. Combien en manque-t-il pour 50 000 ?",
                          "507", ["607", "407"],
                          "49 493 plus 7 donne 49 500. Puis 500 de plus : 507 en tout.")),
        ("09-defi", "À toi de jouer ! Une bibliothécaire a 95 bandes dessinées, 4 par étagère. "
                    "Combien en reste-t-il ? Mets pause, et cherche !"),
        ("09b-correction", "Correction. 4 fois 23 donne 92. "
                           "95 moins 92 : il reste 3 bandes dessinées."),
        ("10-finale", "Ce que tu as appris. Dans un défi, on applique les indices un par un. "
                      "Et on vérifie à la fin."),
    ], [
        ("00-accroche", "Salut ! Mon copain cherche un code à quatre chiffres avec 7, 4, 1 et 0."),
        ("01-essai", "Il veut le plus grand. Il tape 0 741 !"),
        ("02-question", Q("Quel est le plus grand nombre avec 7, 4, 1 et 0 ?", "7 410",
                          ["1 047", "4 710"],
                          "Du plus grand chiffre au plus petit : 7, 4, 1, 0. Donc 7 410.")),
        ("03-fin", "Un zéro devant, et le nombre perd un chiffre !"),
        ("04-commentaire", "À toi : le plus petit nombre de quatre chiffres avec 0, 5, 3 et 8 ? "
                           "Réponds en commentaire !"),
    ]),
    # ═══════════════ LOT B — 5 épisodes 6e, notion `entier_nombre` ═══════════════
    # ⛔ `entier_lire_ecrire` n'est PAS produit : l'ancienne vidéo `6e-entier-nombre` le couvre.
    ("6e-entier-rang", "6e", "entier_rang", "entier_nombre", None,
     "verte", "blanche", "Inès, contrôleuse aérienne", ["transports", "technologie-ia"], [
        ("00-garde", "Les rangs d'un nombre. Dans 5 482, quel est le chiffre des dizaines ?"),
        ("01-situation", "Voici Inès. Elle est contrôleuse aérienne. "
                         "Sur son écran, chaque altitude doit être lue au bon rang."),
        ("02-rangs", "On lit les rangs de droite à gauche : "
                     "unités, dizaines, centaines, puis unités de mille."),
        ("03-exemple", "Dans 5 482 : 2 unités, 8 dizaines, 4 centaines, 5 unités de mille. "
                       "Le chiffre des dizaines est 8."),
        ("04-question", Q("Dans 7 306, quel est le chiffre des centaines ?", "3", ["0", "7"],
                          "De droite à gauche : 6 unités, 0 dizaine, 3 centaines, 7 milliers. Donc 3.")),
        ("05-zero", "Un zéro est un chiffre comme un autre. "
                    "Dans 7 305, le chiffre des dizaines est 0."),
        ("06-question", Q("Dans 85 676, à quel rang est le chiffre 7 ?", "aux dizaines",
                          ["aux unités", "aux unités de mille"],
                          "On part de la droite : 6 unités, puis 7 dizaines. Le 7 est au rang des dizaines.")),
        ("07-grands", "Au-delà de mille, on continue : dizaines de mille, puis centaines de mille."),
        ("08-question", Q("Dans 915 843, quel est le chiffre des centaines de mille ?", "9", ["1", "8"],
                          "915 843 s'écrit 915 puis 843. Le 9 est au rang des centaines de mille.")),
        ("09-defi", "À toi de jouer ! Un avion vole à 5 102 mètres. "
                    "Donne le chiffre des dizaines, puis celui des centaines. Mets pause, et cherche !"),
        ("09b-correction", "Correction. De droite à gauche : 2 unités, 0 dizaine, 1 centaine. "
                           "Dizaines : 0. Centaines : 1."),
        ("10-finale", "Ce que tu as appris. Les rangs se lisent de droite à gauche. "
                      "Un zéro occupe un rang, lui aussi."),
    ], [
        ("00-accroche", "Salut ! Mon copain cherche le chiffre des dizaines de 7 305. Il pointe le 3."),
        ("01-oups", "Il a compté de gauche à droite !"),
        ("02-question", Q("Dans 7 305, quel est le chiffre des dizaines ?", "0", ["3", "7"],
                          "De droite à gauche : 5 unités, puis 0 dizaine. La réponse est 0.")),
        ("03-fin", "Les rangs, ça se compte en partant de la droite !"),
        ("04-commentaire", "À toi : dans 9 261, quel est le chiffre des unités de mille ? "
                           "Réponds en commentaire !"),
    ]),
    ("6e-entier-comparer", "6e", "entier_comparer", "entier_nombre", None,
     "verte", "blanche", "Noé, astronome", ["espace", "sciences"], [
        ("00-garde", "Comparer des nombres entiers. Lequel est le plus grand : 2 305 ou 2 350 ?"),
        ("01-situation", "Voici Noé. Il est astronome. "
                         "Il range les planètes de la plus proche à la plus lointaine."),
        ("02-chiffres", "Première règle : on compte les chiffres. "
                        "6 767 est plus grand que 795."),
        ("03-gauche-droite", "Même longueur ? On compare de gauche à droite, "
                             "jusqu'au premier chiffre différent."),
        ("04-question", Q("Quel nombre est le plus grand : 2 305 ou 2 350 ?", "2 350",
                          ["2 305", "les deux sont égaux"],
                          "Même début : 2 et 3. Puis 5 dizaines bat 0 dizaine. Donc 2 350.")),
        ("05-piege", "Le piège : s'arrêter au dernier chiffre. "
                     "1 408 finit par 8, et pourtant 1 480 est plus grand."),
        ("06-question", Q("Quel est le plus petit nombre : 12 647, 13 547 ou 13 647 ?", "12 647",
                          ["13 547", "13 647"],
                          "Le deuxième chiffre décide : 2 contre 3. Donc 12 647 est le plus petit.")),
        ("07-ordre", "Ordre croissant : du plus petit au plus grand. Décroissant : l'inverse."),
        ("08-question", Q("Quel rangement est croissant ?", "3 045 ; 3 405 ; 3 450",
                          ["3 405 ; 3 045 ; 3 450", "3 450 ; 3 405 ; 3 045"],
                          "Croissant va du plus petit au plus grand : 3 045, puis 3 405, puis 3 450.")),
        ("09-defi", "À toi de jouer ! Quatre scores : 6 022, 6 024, 6 023 et 6 032. "
                    "Range-les du plus petit au plus grand. Mets pause, et cherche !"),
        ("09b-correction", "Correction. 6 032 a 3 centaines : c'est le plus grand. "
                           "Dans l'ordre : 6 022, 6 023, 6 024, puis 6 032."),
        ("10-finale", "Ce que tu as appris. On compte les chiffres, puis on compare de gauche à droite. "
                      "Jamais par la fin."),
    ], [
        ("00-accroche", "Salut ! Mon copain compare 1 408 et 1 480. "
                        "Il regarde le dernier chiffre : 8 contre 0."),
        ("01-oups", "Il annonce : 1 408 est le plus grand !"),
        ("02-question", Q("Lequel est le plus grand : 1 408 ou 1 480 ?", "1 480",
                          ["1 408", "c'est pareil"],
                          "Même début : 1 et 4. Puis 8 dizaines bat 0 dizaine. Donc 1 480.")),
        ("03-fin", "On compare par la gauche, jamais par la fin !"),
        ("04-commentaire", "À toi : range 17 350, 17 340 et 16 340 du plus grand au plus petit. "
                           "Réponds en commentaire !"),
    ]),
    ("6e-entier-encadrer", "6e", "entier_encadrer", "entier_nombre", None,
     "verte", "blanche", "Clara, guide de haute montagne", ["sport", "nature-ecologie"], [
        ("00-garde", "Encadrer un nombre entier. Entre quelles centaines se trouve 582 ?"),
        ("01-situation", "Voici Clara. Elle est guide de haute montagne. "
                         "Avant de partir, elle situe chaque sommet entre deux altitudes rondes."),
        ("02-definition", "Encadrer, c'est trouver les deux nombres ronds "
                          "qui serrent le nombre au plus près."),
        ("03-exemple", "Pour 582 : 500 est juste avant, 600 est juste après. "
                       "On écrit l'encadrement : 500, puis 582, puis 600."),
        ("04-question", Q("Entre quelles dizaines consécutives se trouve 47 ?", "40 et 50",
                          ["30 et 40", "47 et 48"],
                          "40 est la dizaine juste avant, 50 la dizaine juste après.")),
        ("05-rang", "Le rang change l'encadrement. "
                    "À la dizaine près, 9 614 est entre 9 610 et 9 620."),
        ("06-question", Q("Encadre 9 614 entre deux dizaines consécutives.", "9 610 et 9 620",
                          ["9 600 et 9 610", "9 611 et 9 621"],
                          "Les dizaines finissent par zéro. Juste avant : 9 610. Juste après : 9 620.")),
        ("07-arrondi", "Encadrer aide à arrondir. "
                       "47 est entre 40 et 50, et plus proche de 50."),
        ("08-question", Q("Entre quels milliers consécutifs se trouve 5 280 ?", "5 000 et 6 000",
                          ["4 000 et 5 000", "5 200 et 5 300"],
                          "Les milliers finissent par trois zéros. 5 280 est entre 5 000 et 6 000.")),
        ("09-defi", "À toi de jouer ! Un compteur affiche 26 896 kilomètres. "
                    "Encadre-le entre deux dizaines consécutives. Mets pause, et cherche !"),
        ("09b-correction", "Correction. La dizaine juste avant est 26 890. Juste après : 26 900."),
        ("10-finale", "Ce que tu as appris. Encadrer, c'est serrer le nombre "
                      "entre deux nombres ronds du même rang."),
    ], [
        ("00-accroche", "Salut ! Ma copine encadre 752 entre deux dizaines. Elle écrit 751 et 761."),
        ("01-oups", "Mais une dizaine finit toujours par zéro !"),
        ("02-question", Q("Entre quelles dizaines se trouve 752 ?", "750 et 760",
                          ["751 et 761", "700 et 800"],
                          "Juste avant : 750. Juste après : 760. Les deux finissent par zéro.")),
        ("03-fin", "Encadrer, c'est avec des nombres ronds !"),
        ("04-commentaire", "À toi : encadre 7 755 entre deux centaines consécutives. "
                           "Réponds en commentaire !"),
    ]),
    ("6e-entier-decomposer", "6e", "entier_decomposer", "entier_nombre", None,
     "verte", "blanche", "Ethan, game designer", ["jeux-video", "technologie-ia"], [
        ("00-garde", "Décomposer un nombre entier. Quelle est la bonne décomposition de 507 ?"),
        ("01-situation", "Voici Ethan. Il est game designer. "
                         "Il donne les points de son jeu par paquets : milliers, centaines, dizaines."),
        ("02-valeur", "Chaque chiffre vaut son chiffre fois son rang. "
                      "Dans 352, le 5 vaut 5 fois 10, soit 50."),
        ("03-zero", "Un rang vide ne s'écrit pas. "
                    "507 égale 500 plus 7, et rien pour les dizaines."),
        ("04-question", Q("Quelle est la décomposition de 706 ?", "700 + 6", ["700 + 60", "70 + 6"],
                          "Le 7 vaut 700, le 0 ne compte pas, le 6 vaut 6 unités.")),
        ("05-composer", "L'inverse s'appelle composer. "
                        "On range chaque terme dans son rang, même en désordre."),
        ("06-question", Q("Quel nombre vaut 500 plus 90 plus 3 plus 8 000 ?", "8 593",
                          ["5 938", "8 953"],
                          "L'ordre ne compte pas : 8 000, puis 500, puis 90, puis 3. Donc 8 593.")),
        ("07-grands", "Même méthode avec des nombres plus longs. "
                      "10 000 plus 100 plus 20 plus 4 donne 10 124."),
        ("08-question", Q("Quelle écriture est égale à 55 140 ?", "50 000 + 5 000 + 100 + 40",
                          ["50 000 + 500 + 100 + 40", "500 000 + 5 000 + 100 + 40"],
                          "Deux 5 : l'un vaut 50 000, l'autre 5 000. Puis 100 et 40.")),
        ("09-defi", "À toi de jouer ! Au jeu, Rayan gagne 30 000, 2 000, 600, 50 et 9 points. "
                    "Quel est son total ? Mets pause, et cherche !"),
        ("09b-correction", "Correction. Chaque terme dans son rang : 3, 2, 6, 5, 9. "
                           "Le total est 32 659."),
        ("10-finale", "Ce que tu as appris. Décomposer donne la valeur de chaque chiffre. "
                      "Un rang vide ne s'écrit pas."),
    ], [
        ("00-accroche", "Salut ! Mon copain décompose 507. Il écrit 500 plus 70."),
        ("01-oups", "Soixante-dix ? Le 7 est tout à droite : il vaut 7 !"),
        ("02-question", Q("Quelle est la décomposition de 507 ?", "500 + 7", ["500 + 70", "50 + 7"],
                          "Le 0 est aux dizaines : il n'y a aucune dizaine. Donc 500 plus 7.")),
        ("03-fin", "Le zéro ne s'écrit pas, mais il garde la place !"),
        ("04-commentaire", "À toi : décompose 2 340. Réponds en commentaire !"),
    ]),
    ("6e-entier-defi", "6e", "entier_defi", "entier_nombre", None,
     "bleue", "blanche", "Maya, volcanologue", ["nature-ecologie", "sciences"], [
        ("00-garde", "Le défi des nombres entiers. Combien manque-t-il à 1 041 pour atteindre 2 000 ?"),
        ("01-situation", "Voici Maya. Elle est volcanologue au Piton de la Fournaise. "
                         "Elle compte les secousses, jour après jour."),
        ("02-complement", "Pour aller de 1 041 à 2 000, on avance par étapes rondes. "
                          "D'abord 1 041 plus 9 : 1 050."),
        ("03-suite", "Puis 1 050 plus 50 : 1 100. Enfin 1 100 plus 900 : 2 000. En tout, 959."),
        ("04-question", Q("Combien manque-t-il à 679 pour atteindre 700 ?", "21", ["31", "19"],
                          "679 plus 1 donne 680. Puis 20 de plus : 700. En tout, 21.")),
        ("05-etiquettes", "Autre défi : former un nombre avec des chiffres donnés. "
                          "Un nombre ne commence jamais par zéro."),
        ("06-question", Q("Le plus petit nombre de quatre chiffres avec 3, 0, 6 et 5 ?", "3 056",
                          ["0 356", "3 065"],
                          "On ne commence pas par zéro. On met 3, puis 0, puis 5, puis 6.")),
        ("07-mystere", "Dernier type de défi : le nombre mystère. "
                       "On place chaque indice à son rang."),
        ("08-question", Q("Quatre chiffres : unités de mille 3, centaines le double de 3, "
                          "dizaines 0, unités 1.", "3 601", ["3 061", "3 610"],
                          "Unités de mille 3, centaines 6, dizaines 0, unités 1. Donc 3 601.")),
        ("09-defi", "À toi de jouer ! Avec 5, 0, 9 et 4, "
                    "quel est le plus grand nombre de quatre chiffres ? Mets pause, et cherche !"),
        ("09b-correction", "Correction. Du plus grand chiffre au plus petit : 9, 5, 4, 0. Donc 9 540."),
        ("10-finale", "Ce que tu as appris. On avance par étapes rondes, "
                      "et on place chaque indice à son rang."),
    ], [
        ("00-accroche", "Salut ! Ma copine a 569 points. Il en faut 600 pour gagner le niveau."),
        ("01-essai", "Elle compte très vite… et elle annonce 41 !"),
        ("02-question", Q("Combien manque-t-il à 569 pour atteindre 600 ?", "31", ["41", "29"],
                          "569 plus 1 donne 570. Puis 30 de plus : 600. En tout, 31.")),
        ("03-fin", "On avance par étapes rondes, et on ne se trompe plus !"),
        ("04-commentaire", "À toi : le plus petit nombre de quatre chiffres avec 3, 0, 6 et 5 ? "
                           "Réponds en commentaire !"),
    ]),
]


def tirer_lettres():
    """La place de la bonne réponse de chaque question, dans l'ordre de SERIE (paysage puis short).
    Un tiers de A, de B, de C ; jamais deux fois la même lettre de suite dans une paysage."""
    rng = random.Random(2111)
    nq = sum(1 for e in SERIE for ecrans in (e[9], e[10]) for _, v in ecrans if isinstance(v, dict))
    sac = list("ABC" * (nq // 3 + 1))[:nq]
    rng.shuffle(sac)
    res, i = [], 0
    for e in SERIE:
        for ecrans, paysage in ((e[9], True), (e[10], False)):
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


def centres_hors_tranche():
    """⛔ Le centre se vérifie par ÂGE (REGLES.md, 15/11) : liste FERMÉE + tranche de la classe.
    Fait ICI, avant tout manifeste, pour que personne n'écrive une voix sur un centre interdit."""
    src = (RACINE / "lib" / "videos" / "centres-interet.ts").read_text(encoding="utf-8")
    bloc = src[src.index("CENTRES_INTERET"):]
    connus = {}
    for m in re.finditer(r'id:\s*"([a-z-]+)"[\s\S]*?tranches:\s*\[([^\]]*)\]', bloc):
        connus[m.group(1)] = re.findall(r'"([^"]+)"', m.group(2))
    ecarts = []
    for e in SERIE:
        vid, classe, centres = e[0], e[1], e[8]
        if not 1 <= len(centres) <= 3:
            ecarts.append(f"{vid} : {len(centres)} centres (il en faut 1 à 3)")
        for c in centres:
            if c not in connus:
                ecarts.append(f"{vid} : « {c} » n'est pas dans la liste fermée")
            elif TRANCHE[classe] not in connus[c]:
                ecarts.append(f"{vid} ({classe}, tranche {TRANCHE[classe]}) : « {c} » "
                              f"n'ouvre qu'en {', '.join(connus[c])}")
    return ecarts


def construire():
    lettres, rng = tirer_lettres()
    tout = []
    for (vid, classe, micro, notion, aussi, c_p, c_s, metier, centres, ecr_p, ecr_s) in SERIE:
        vp, qp = voix_de(ecr_p, lettres, rng, False)
        vs, qs = voix_de(ecr_s, lettres, rng, True)
        tout.append(dict(id=vid, classe=classe, micro=micro, notion=notion,
                         aussi=(f"{aussi[0]}:{aussi[1]}" if aussi else None),
                         ceinture=c_p, ceinture_short=c_s, metier=metier, centres=centres,
                         paysage=vp, short=vs, questions=qp, questions_short=qs))
    return tout


def recap(tout):
    from collections import Counter
    cpt = Counter("ABC"[q["reponse"]] for e in tout for q in e["questions"] + e["questions_short"])
    nq = sum(cpt.values())
    ecarts = centres_hors_tranche()
    longues_total = sum(len(phrases_longues(e["classe"], {**e["paysage"], **e["short"]})) for e in tout)
    L = ["# Voix de la série NOMBRES ENTIERS, du CM1 à la 6e — À VALIDER PAR FRÉDÉRIC (avant tout WAV)",
         "",
         "Source unique : `manim/scripts/cm1/entier_voix.py` (on corrige LÀ, puis `--ecrire`). "
         "Inventaire des banques : `manim/INVENTAIRE-entiers-cm1-6e.md`.",
         "",
         "**11 épisodes = 22 vidéos** (1 paysage + 1 short Ti Margo chacun).",
         "",
         "- **Lot A — 6 épisodes servis au CM1 ET au CM2** (notion `nombre_entier`, mêmes `microId` dans "
         "les deux banques). Une seule vidéo par micro, propriétaire CM1, branchée au CM2 par `aussi` "
         "(2 lignes `notion_ressources`).",
         "- **Lot B — 5 épisodes en 6e** (notion `entier_nombre`). ⛔ `entier_lire_ecrire` n'est PAS "
         "produit : l'ancienne vidéo `6e-entier-nombre` est en ligne et la couvre.",
         "",
         f"**Bonnes réponses tirées au hasard, graine 2111** : A {cpt['A']}, B {cpt['B']}, C {cpt['C']} "
         f"sur {nq} questions (jamais deux fois la même lettre de suite dans une paysage ; "
         "l'ordre des leurres est tiré au hasard aussi, graine 2027).",
         "",
         f"**Plafond de mots par phrase** : 18 au CM1 et au CM2, 20 en 6e → "
         f"{'⚠️ ' + str(longues_total) + ' phrase(s) au-dessus' if longues_total else '0 phrase au-dessus'}.",
         "",
         f"**Centres d'intérêt** (liste fermée, vérifiés par âge, tranche 9-11 pour CM1-6e) : "
         f"{'⚠️ ' + ' ; '.join(ecarts) if ecarts else '0 centre hors tranche'}. "
         "⛔ Aucun `reseaux-sociaux`, `cinema-series` ni `argent-budget` : ils n'ouvrent qu'à 12-14 ans.",
         "",
         "**Shorts** : Ti Margo en dessin animé (« mon copain », « ma copine »), 1 question-pause, "
         "puis la question en commentaire. Un seul passage à La Réunion sur les 11 épisodes : "
         "Maya, volcanologue au Piton de la Fournaise (6e, défi).",
         "",
         "✅ **L'écran `07-cm2` du lot A** ouvre la classe des millions (ou le critère de divisibilité pour "
         "les multiples) : c'est l'écran qui couvre ce que la banque du CM2 demande en plus de celle du "
         "CM1. **Gardé sur décision de Frédéric le 21/11** (« Oui, garde-le ») : les six micros restent "
         "mutualisés CM1 + CM2, une seule vidéo chacun.",
         "",
         "---",
         ""]
    for e in tout:
        titre = f"## `{e['id']}` — {e['classe'].upper()}"
        if e["aussi"]:
            titre += f" (+ {e['aussi'].split(':')[0].upper()} par `aussi`)"
        titre += (f" · notion `{e['notion']}` · micro `{e['micro']}`\n\n"
                  f"**Métier :** {e['metier']} · **Centres :** {', '.join(e['centres'])} · "
                  f"**Ceintures :** paysage {e['ceinture']}, short {e['ceinture_short']}")
        L.append(titre)
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
        L.append("")
        L.append("Bonnes lettres — paysage : " +
                 ", ".join(f"{q['cle'].split('-')[0]} → **{'ABC'[q['reponse']]}** ({q['choix'][q['reponse']]})"
                           for q in e["questions"]) +
                 " · short : " +
                 ", ".join(f"**{'ABC'[q['reponse']]}** ({q['choix'][q['reponse']]})"
                           for q in e["questions_short"]) + ".")
        longues = phrases_longues(e["classe"], {**e["paysage"], **e["short"]})
        if longues:
            L.append("")
            L.append(f"⚠️ Phrases au-dessus de {SEUIL_MOTS[e['classe']]} mots : " + " ; ".join(longues))
        L.append("")
    return "\n".join(L)


if __name__ == "__main__":
    tout = construire()
    (MANIM / "VOIX-entiers-cm1-6e.md").write_text(recap(tout), encoding="utf-8")
    json.dump(tout, open(ICI / "entier_voix.json", "w", encoding="utf-8"),
              ensure_ascii=False, indent=1)
    print("écrit manim/VOIX-entiers-cm1-6e.md et manim/scripts/cm1/entier_voix.json")
    ecarts = centres_hors_tranche()
    print("centres : " + ("0 centre hors tranche" if not ecarts else "⚠️ " + " ; ".join(ecarts)))
    nlong = 0
    for e in tout:
        for ligne in phrases_longues(e["classe"], {**e["paysage"], **e["short"]}):
            print(f"⚠️ {e['id']} — {ligne}")
            nlong += 1
    print(f"phrases trop longues : {nlong}")
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
