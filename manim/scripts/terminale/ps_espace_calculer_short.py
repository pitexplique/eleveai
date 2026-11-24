# ps_espace_calculer_short.py
# EleveAI — Maths Tle spé — short « trois multiplications, une addition, et un NOMBRE »
# (9:16), ceinture VERTE. Micro du coach : ps_espace_calculer.
# Paysage jumeau : ps_espace_calculer.py (HD livré).
#
# ⭐ UNE SEULE IDÉE, celle de l'épisode : le produit scalaire se calcule en coordonnées,
# et ce qui en sort est un NOMBRE, jamais un vecteur. ⛔ Un short ne résume pas son
# épisode — il en prend une idée et la rend en une minute.
#
#   · 00-accroche   : le titre, l'échelle des ceintures, les trois temps du calcul, et
#                     la chute : « c'est un nombre » ;
#   · 01-idee       : la règle en coordonnées, u (1 ; 2 ; 3) et v (4 ; −1 ; 2), les trois
#                     produits posés au rythme de la voix, puis le total 8 encadré ;
#   · 02/02b        : question-pause (A : 5), 3 s — et la carte C n'est même pas du bon
#                     type, c'est TOUTE la leçon ;
#   · 03-commentaire: u (2 ; −1 ; 1) et v (3 ; 1 ; 5) — ⛔ la réponse (10) n'est NI dite
#                     NI affichée : c'est l'appel au commentaire ;
#   · 04-abonne     : la fin commune.
#
# Voix : manim/voix/terminale-ps-espace-calculer-short.json, calée par
# ps_espace_calculer_short_marques.json (189 marques).
# Découpage : manim/poste2/DECOUPAGE-shorts-ps-espace.md, section E7.
#
# Mesure (⛔ AVANT tout rendu) : python -X utf8 manim/poste2/mesure-shorts-ps-espace.py E7
# Avant rendu : python -X utf8 manim/poste2/verifier-avant-rendu.py manim/scripts/terminale/ps_espace_calculer_short.py PsEspaceCalculerShort
# Dry run : AUDIT=1 BORDS=1 PYTHONIOENCODING=utf-8 python -X utf8 -m manim render --dry_run -r 1080,1920 manim/scripts/terminale/ps_espace_calculer_short.py PsEspaceCalculerShort
# Planche : PYTHONIOENCODING=utf-8 python -X utf8 -m manim render -ql -r 1080,1920 --disable_caching manim/scripts/terminale/ps_espace_calculer_short.py PsEspaceCalculerShort -o eleveai-maths-terminale-ps-espace-calculer-short --media_dir manim/scripts/terminale/media-ps-espace-calculer-short

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from espace_commun_short import *  # noqa: E402,F403

# ── ⭐ CE QUE CE SHORT AJOUTE AU SOCLE, PARCE QUE LE SOCLE EST GELÉ ──────────
#
# ⛔⛔ LES SIX VOIX DU PRODUIT SCALAIRE DISENT « ZÉRO » EN LETTRES, celles de la
# GÉOMÉTRIE disaient « 0 » en chiffre. Mesuré en comparant les douze voix :
# `terminale-espace-vecteurs-short` écrit « A a pour coordonnées 1, 0, 0 », et
# `terminale-ps-espace-calculer-short` écrit « u a pour coordonnées 3, zéro, 1 ».
# L'audit, lui, cherche le CHIFFRE dans la voix (`_NB = \d+`) : tout zéro affiché par un
# `trip()` sortirait donc en `AUDIT-ABSENT « 0 »` — six shorts, une quinzaine de fois.
# ⭐ C'est exactement la raison d'être de `eq_mots` dans le socle (« la voix dit zéro en
# lettres, l'écran écrit le chiffre »), mais `eq_mots` ne couvre pas les triplets. Les
# deux fonctions ci-dessous le font, et elles vivent ICI parce que le socle est gelé :
# `espace_commun_short.py` est lu à l'import par une autre session en train de rendre.


def trip0(e, t3, fs=28, color=WHITE, par=False):
    """Un triplet dont les ZÉROS sont hors audit, et EUX SEULS.

    ⛔ Pas un `sans_audit` sur le triplet entier : cela exempterait aussi le « 3 » et le
    « 1 » de (3 ; 0 ; 1), c'est-à-dire les deux nombres que l'audit doit surveiller.
    C'est le défaut que le socle a déjà écarté pour `eq_mots` — « un `sans_audit` sur
    toute l'équation aurait aussi exempté le 2 de 2t = 0, le seul nombre qu'il fallait
    surveiller ». ⭐ `g.nb[i]` existe précisément pour rendre un nombre adressable."""
    g = e.trip(t3, fs, color, par=par)
    for v, m in zip(t3, g.nb):
        if v == 0:
            e.sans_audit(m)
    return g


def eq_rappel(e, jetons, gardes, fs=28, color=WHITE):
    """Une ligne de calcul dont les FACTEURS sont un rappel, et seul le RÉSULTAT est neuf.

    ⛔⛔ MESURÉ AU DRY RUN : « 3 × 2 = 6 » paraît quand la voix dit « puis 6 », ce qui est
    juste. Mais son « 3 » a été dit six secondes plus tôt, dans le triplet de u, et
    l'audit signale un `AUDIT-TARD` de **6,47 s**. Ce n'est pas un bloc qui attend : une
    ligne de calcul REDIT forcément des nombres déjà énoncés.
    ⭐⭐ Et ce bruit n'est pas inoffensif — « un gros AUDIT-TARD cachait une vraie
    avance » revient HUIT fois dans cette série. Un signalement de 6 s qu'on apprend à
    ignorer est exactement ce qui fait rater le petit signalement voisin. On abaisse donc
    le plancher de bruit : les facteurs sortent de l'audit, le résultat y reste.
    ⛔ Et on exempte PAR INDICE, pas par valeur : dans « 1 × 4 = 4 » le premier « 4 » est
    un facteur et le second est le résultat. Exempter « 4 » les aurait exemptés tous les
    deux, c'est-à-dire le seul nombre qu'il fallait surveiller.
    `gardes` : les indices de jeton qui RESTENT audités."""
    g = e.eq_mots(jetons, fs, color)
    for k, m in enumerate(g):
        if k not in gardes:
            e.sans_audit(m)
    return g


def eq_lettres(e, jetons, lettres, fs=28, color=WHITE):
    """Une équation dont certains jetons sont dits EN LETTRES à l'instant où ils paraissent.

    ⛔⛔ MESURÉ SUR CE CLIP : la voix de `02b-reponse` conclut « Six, plus zéro, moins
    un : 5 » — « Six » et « un » en LETTRES. L'écran écrit « 6 + 0 − 1 = 5 », et l'audit
    cherche le chiffre « 6 » : il le trouve six secondes plus tôt (« 3 fois 2 fait 6 »)
    et signale un `AUDIT-TARD` de 6 s. Ce n'est pas un défaut de synchro, c'est une
    différence d'ÉCRITURE — et un gros TARD peut cacher une vraie avance, huit fois dans
    cette série.
    ⭐ On exempte EXACTEMENT les jetons dits en lettres, et pas l'équation : « 5 », que
    la voix dit en chiffre au même instant, reste surveillé. C'est le seul nombre que
    l'audit doit vraiment voir ici."""
    g = e.eq_mots(jetons, fs, color)
    for j, m in zip(jetons, g):
        if j.strip() in lettres:
            e.sans_audit(m)
    return g


# ── LES DONNÉES, une seule fois, et REFAITES à l'import ─────────────────────
# ⭐ Ce ne sont pas des invariants décoratifs : chaque assertion REFAIT le calcul que la
# voix annonce. Elles tournent à chaque `verifier-avant-rendu`, à chaque dry run et à
# chaque rendu — pas une fois dans une journée. (Les 28 assertions des six shorts de la
# géométrie ont trouvé une figure fausse de cette façon.)
U1, V1 = (1, 2, 3), (4, -1, 2)                 # l'exemple de l'écran 01
PROD1 = tuple(a * b for a, b in zip(U1, V1))
TOT1 = sum(PROD1)
UQ, VQ = (3, 0, 1), (2, 1, -1)                 # la question
PRODQ = tuple(a * b for a, b in zip(UQ, VQ))
TOTQ = sum(PRODQ)
BONNE = 0                                      # A — tirage des shorts : A C B C B A
LEURRE_B = 7                                   # le signe moins oublié
UD, VD = (2, -1, 1), (3, 1, 5)                 # le défi de l'écran 03

assert PROD1 == (4, -2, 6), PROD1
assert TOT1 == 8, TOT1
assert PRODQ == (6, 0, -1), PRODQ
assert TOTQ == 5, TOTQ
# ⭐ Le leurre B porte SA RAISON dans l'assertion : c'est la somme des valeurs absolues,
# c'est-à-dire le signe moins perdu. Si la question changeait de coordonnées, l'assertion
# tomberait au lieu de laisser un leurre devenu quelconque.
assert LEURRE_B == sum(abs(x) for x in PRODQ), (LEURRE_B, PRODQ)
assert LEURRE_B != TOTQ                        # A et B sont deux NOMBRES distincts
# ⛔ Et la carte C n'est pas un nombre du tout : c'est le triplet des produits terme à
# terme, la faute de type que ce short combat. Trois choix qui s'excluent deux à deux :
# deux nombres différents, et un objet qui n'est même pas du bon type.
assert isinstance(PRODQ, tuple) and len(PRODQ) == 3
# ⭐ Le défi : la réponse est 10, et elle n'est NI dite NI affichée (vérifié ci-dessous
# contre la voix elle-même, pas contre une relecture).
assert sum(a * b for a, b in zip(UD, VD)) == 10


def pieces(e):
    """BÂTIT et POSITIONNE les six écrans. ⛔ Ne joue rien : `construct()` animera ces
    objets-là, et `mesure-shorts-ps-espace.py` mesurera les mêmes."""
    p = {}
    # ⚠️ 34 px et non 38, et c'est MESURÉ avant d'écrire un écran : « Produit scalaire »
    # fait 4,19 de large à 38 px pour 3,90 offerts, donc `pose()` l'aurait réduit à
    # **35,4 px obtenus** — en silence. Quatre des six titres du découpage étaient dans
    # ce cas, et le pire tombait à 24 px. Une réduction ne se voit nulle part ailleurs
    # qu'à l'image (défaut n° 4 de l'épisode 3).
    titre, badge = e.entete_blocs("Produit scalaire", fs=34)

    # ── 00 : les trois temps, et la chute ───────────────────────────────────
    # ⭐ TROIS BLOCS ET NON UN SEUL, et ce n'est pas un détail de mise en page : la voix
    # scande « Deux vecteurs, trois multiplications, une addition », trois temps. Un
    # `blocs_phrase` de la phrase entière aurait coupé à la LARGEUR — « Deux vecteurs,
    # trois » / « multiplications, une » / « addition. » — et le rythme serait mort.
    # ⚠️ 27 px pour les trois : « trois multiplications, » fait 3,89 à 27 px, et 4,03 à
    # 28. Un pixel de police décide, et seule la mesure le dit.
    a1 = e.blocs_phrase("Deux vecteurs,", 1.95, 27)
    a2 = e.blocs_phrase("trois multiplications,", 1.30, 27)
    a3 = e.blocs_phrase("une addition.", 0.65, 27)
    # ⛔ LA CROIX SE POSE DANS LE GROUPE, PAS À CÔTÉ DU BLOC DÉJÀ CENTRÉ. Mesuré :
    # `next_to(a4, LEFT)` sur un bloc de 3,69 déjà centré pousse le bord gauche à
    # **−2,26**, hors de la marge du 9:16 (±2,115) — et BORDS=1 l'aurait signalé six fois
    # au dry run. En 16:9 il y avait 6,68 de chaque côté et le geste passait ; ici il n'y
    # a plus de marge à prendre. On assemble, PUIS on centre.
    # ⚠️ LA CROIX SE PAIE EN LARGEUR : elle prend 0,28 et son écart 0,14, donc le bloc
    # n'a plus 3,90 mais 3,48. On le dit à `blocs_phrase` par `larg=3,40` au lieu de le
    # découvrir après coup — à 26 px sur toute la largeur, `pose()` ramenait le groupe à
    # **24,7 px obtenus**, en silence.
    # ⛔ ET LE SUJET EST REVENU DANS LA PHRASE. Vu à la planche : « n'est pas un vecteur »
    # tout seul n'a pas de sujet et se lit comme une liste de mots. La voix dit « ce qui
    # sort n'est pas un vecteur » — c'est contigu, donc écrivable tel quel, et ça tient
    # en deux lignes.
    a4t = e.blocs_phrase("ce qui sort n'est pas un vecteur", 0.0, 24, C_PIEGE, larg=3.40)
    a4 = e.pose(VGroup(e.croix(), a4t).arrange(RIGHT, buff=0.14), -0.70)
    # ⛔⛔ 30 px ET NON 34, ET C'EST LE BATTEMENT QUI LE DÉCIDE — pas la mesure statique.
    # À 34 px le bloc fait 3,81, son cadre 4,13, et `mesure-shorts-ps-espace.py` disait
    # ✅ (x ±2,07, dans la marge de ±2,115). Mais `insister(…, 1,06)` le grandit de 6 % le
    # temps d'un battement : **x ±2,19**, et le dry run a sorti deux `BORD`. C'est le
    # défaut de l'épisode 5 (« le battement de la carte gagnante sort du cadre dès que la
    # carte est large ») hors des cartes — et c'est la preuve, une fois de plus, qu'une
    # mesure du modèle statique ne remplace pas le dry run.
    # ⭐ À 30 px : 3,36 + 0,32 de cadre = 3,68, et 1,06 × 3,68 = 3,90 — ±1,95, qui tient.
    a5 = e.blocs_phrase("c'est un nombre", -1.90, 30, VERT_OK)
    cadre5 = SurroundingRectangle(a5, color=VERT_OK, buff=0.16, stroke_width=3)
    p["00-accroche"] = [("titre", titre), ("badge", badge),
                        ("deux vecteurs", a1), ("trois multiplications", a2),
                        ("une addition", a3), ("pas un vecteur", a4),
                        ("un nombre", VGroup(a5, cadre5))]

    # ── 01 : la règle, les deux vecteurs, les trois produits, le total ──────
    # ⭐ La règle s'écrit sans flèche et sans chiffre : ce sont des COORDONNÉES, pas des
    # vecteurs. L'audit des flèches la laisse donc passer à juste titre — `x`, `y`, `z`
    # ne sont pas des noms de vecteur (la règle de `NOM` ne reconnaît que `u`, `v`, `w`,
    # `n` isolés et deux majuscules).
    regle = e.pose(e.t("x x′ + y y′ + z z′", 28, C_REGARD, larg=None), 2.10)
    cu = e.pose(VGroup(e.vec("u", 28, C_VECTEUR),
                       trip0(e, U1, 28, C_VECTEUR, par=True)).arrange(RIGHT, buff=0.18), 1.30)
    cv = e.pose(VGroup(e.vec("v", 28, C_VECTEUR2),
                       trip0(e, V1, 28, C_VECTEUR2, par=True)).arrange(RIGHT, buff=0.18), 0.65)
    # ⛔ TROIS LIGNES DE PRODUIT, chacune posée à SON instant. La voix ne les énonce
    # qu'en résultats (« Cela fait 4, puis moins 2, puis 6 ») : posées ensemble, les
    # trois résultats seraient à l'écran avant d'être dits — c'est le piège n° 6 de la
    # série des entiers, 35 `AUDIT-AVANCE` sur le seul épisode 3.
    # ⭐ L'indice 4 est le RÉSULTAT, le seul nombre que la voix dise à cet instant
    # (« Cela fait 4 »). Les indices 0 et 2 sont les deux facteurs, dits dans les
    # triplets quelques secondes plus tôt : voir `eq_rappel`.
    # ⛔ UN FACTEUR NÉGATIF PREND SES PARENTHÈSES : « 2 × −1 = −2 » se lit mal au tableau,
    # et c'est la même raison que `par=True` de `trip()` (« 4 ; −2 ; 6 = 2 × 2 ; −1 ; 3 »
    # se lisait « 2 × 2 », épisode 3). Elles ne coûtent rien à l'audit : le jeton commence
    # par une parenthèse, donc il n'entre pas dans la règle du zéro de `eq_mots`.
    def fact(v):
        return f"({e.nombre(v)})" if v < 0 else e.nombre(v)

    pr = [eq_rappel(e, [fact(U1[i]), "×", fact(V1[i]), "=", e.nombre(PROD1[i])],
                    {4}, 26)
          for i in range(3)]
    for i, g in enumerate(pr):
        e.pose(g, -0.20 - 0.60 * i)
    tot = e.vexpr(f"u · v = {TOT1}", ("u", "v"), 32, VERT_OK)
    e.pose(tot, -2.35)
    cadre_tot = SurroundingRectangle(tot, color=VERT_OK, buff=0.14, stroke_width=3)
    p["01-idee"] = [("titre", titre), ("badge", badge), ("règle", regle),
                    ("u", cu), ("v", cv),
                    ("produit x", pr[0]), ("produit y", pr[1]), ("produit z", pr[2]),
                    ("total", VGroup(tot, cadre_tot))]

    # ── 02 / 02b : la question-pause ────────────────────────────────────────
    # ⭐ 26/24 vient d'un balayage de police hors rendu : c'est le plus grand couple qui
    # garde toute police au-dessus de 22 px ET le bas de « Mets pause » au-dessus
    # de −2,87 (le haut de la boîte de Ti-Margo plus l'écart minimal).
    fsq, fsc = 26, 24
    q_lignes = [VGroup(e.vec("u", fsq, C_REGARD),
                       trip0(e, UQ, fsq, C_REGARD, par=True)).arrange(RIGHT, buff=0.16),
                VGroup(e.vec("v", fsq, C_REGARD),
                       trip0(e, VQ, fsq, C_REGARD, par=True)).arrange(RIGHT, buff=0.16),
                e.vexpr("Que vaut u · v ?", ("u", "v"), fsq)]
    # ⛔⛔ LES TROIS CORPS DE CARTE PORTENT UN `.nb`, Y COMPRIS « 5 » ET « 7 ».
    # `q_montrer_choix` ne retarde le corps d'un choix QUE s'il porte un `.nb` : sinon il
    # le pose quatre caractères après « A : », c'est-à-dire juste AVANT que la voix dise
    # le nombre. C'est le défaut de l'épisode 8 (« une carte de choix qui porte un nombre
    # s'affiche quand il est dit »), et un `trip()` y échappe par construction. Un simple
    # « 5 », non : on lui donne donc son `.nb` à la main, et la carte attend la dernière
    # marque de son propre libellé.
    cA = e.t(e.nombre(TOTQ), fsc, larg=None)
    cA.nb = [cA]
    cB = e.t(e.nombre(LEURRE_B), fsc, larg=None)
    cB.nb = [cB]
    # ⛔⛔ LA CARTE C NE PORTE PAS LES MOTS « le vecteur », ET C'EST UNE COTE.
    # Premier jet : « le vecteur (6 ; 0 ; −1) » à 24 px. Mesuré — `carte_choix` réduit le
    # groupe rond + lettre + corps pour tenir dans `largeur − 0,95`, soit 3,00 : le corps
    # faisait 4,50, et la carte tombait à **16,7 px obtenus**, sous le plancher de 20.
    # ⛔ Augmenter la police n'y change RIEN, c'est la largeur qui décide (épisode 5).
    # ⭐ Et le remède n'ôte rien à la leçon : « ( ; ; ) » EST la notation française des
    # coordonnées, donc la carte se lit comme un triplet et pas comme un nombre — la
    # faute de type que ce short combat est à l'écran, en face de « 5 » et « 7 ». C'est la
    # voix qui dit le mot (« C : le vecteur de coordonnées 6, zéro, moins 1 »).
    # ⚠️ Et ce choix paie une seconde fois : à deux lignes la carte gagnait 0,33 de haut,
    # et il ne restait plus la place des deux corrections sous les cartes en 02b.
    cC = trip0(e, PRODQ, fsc, par=True)
    tete, q, cartes, pause, rebours = e.q_tete(q_lignes, [cA, cB, cC],
                                               fs_q=fsq, fs_c=fsc)
    p["02-question"] = [("titre", titre), ("badge", badge), ("tête", tete),
                        ("rebours", rebours), ("question", q), ("cartes", cartes),
                        ("pause", pause)]

    # l'écran de réponse ⚠️ HÉRITE de la question (défaut n° 1 de l'épisode 3, et quatre
    # récidives) : ce qui reste à l'écran, c'est la tête, la question et les trois cartes.
    # On efface les deux premières, on écrit AU-DESSUS des cartes, et les deux leurres
    # vont DESSOUS — mesuré : les cartes s'arrêtent bien au-dessus de la boîte de
    # Ti-Margo ici, ce qui n'était pas le cas du short de l'épisode 6.
    haut, bas = float(cartes.get_top()[1]), float(cartes.get_bottom()[1])
    somme = eq_lettres(e, [e.nombre(PRODQ[0]), "+", e.nombre(PRODQ[1]), "−",
                           e.nombre(abs(PRODQ[2])), "=", e.nombre(TOTQ)],
                       # ⭐ « Six », « zéro » et « un » sont dits EN LETTRES à cet
                       # instant : seuls « 5 » reste audité (voir `eq_lettres`).
                       {"6", "1"}, 30, VERT_OK)
    # ⚠️ 0,62 AU-DESSUS DES CARTES, et c'est la PLANCHE qui l'a dit : posée à 1,34, la
    # somme laissait une bande vide de 1,06 entre elle et les cartes, et l'écran se
    # lisait comme deux écrans. La mesure ne voit pas un vide — elle ne voit que des
    # chevauchements.
    e.pose(somme, haut + 0.62)
    cadre_s = SurroundingRectangle(somme, color=VERT_OK, buff=0.12, stroke_width=3)
    # ⚠️ LES DEUX CORRECTIONS TIENNENT SOUS LES CARTES, ET IL A FALLU LE MESURER.
    # Les cartes s'arrêtent à −1,80 et la boîte de Ti-Margo monte à −2,92 : il reste
    # 1,12, c'est-à-dire deux lignes de 24 px et pas trois. ⛔ Le premier jet mettait
    # « n'est même pas du bon type » sur DEUX lignes à −3,15 — bas à **−3,53**, en plein
    # sur Ti-Margo. L'extrait court « pas du bon type » dit la même chose en une ligne.
    # ⛔⛔ CHAQUE CORRECTION PORTE LA LETTRE DE SA CARTE, ET C'EST LA PLANCHE QUI L'A DIT.
    # Sans la lettre, « oublie le signe moins » et « pas du bon type » s'empilent sous la
    # carte C et un lecteur les lui attribue toutes les deux — l'écran accuse C de la
    # faute de B. À l'animation l'`Indicate` relie la ligne à sa carte, mais une image
    # fixe n'a pas d'animation, et un élève qui met pause voit l'image fixe.
    # ⭐ C'est le découpage qui l'écrivait déjà ainsi (« B : le signe moins oublié »,
    # « C : … »), et c'est la convention des cartes de toute la série.
    # ⚠️ 22 px, et la lettre coûte exactement ces deux pixels : « B : oublie le signe
    # moins » fait 3,90 à 24 px — pile la largeur offerte, donc `lignes()` le coupe en
    # DEUX, le bloc gagne 0,43 de haut et il ne reste plus la place de la seconde
    # correction (mesuré : 0,07 de chevauchement avec les cartes). À 22 px il fait 3,58
    # et tient sur une ligne. Les 1,12 disponibles sous les cartes valent deux lignes,
    # pas trois.
    lb = e.blocs_phrase("B : oublie le signe moins", bas - 0.26, 22, C_PIEGE)
    lc = e.blocs_phrase("C : pas du bon type", bas - 0.70, 22, C_PIEGE)
    p["02b-reponse"] = [("titre", titre), ("badge", badge), ("cartes", cartes),
                        ("la somme", VGroup(somme, cadre_s)),
                        ("leurre B", lb), ("leurre C", lc)]

    # ── 03 : la question en commentaire ─────────────────────────────────────
    et = e.pose(e.t("À toi !", 38, JAUNE_TITRE, larg=None), 3.50)
    d1 = e.pose(VGroup(e.vec("u", 30, C_REGARD),
                       trip0(e, UD, 30, C_REGARD, par=True)).arrange(RIGHT, buff=0.18), 1.95)
    d2 = e.pose(VGroup(e.vec("v", 30, C_REGARD),
                       trip0(e, VD, 30, C_REGARD, par=True)).arrange(RIGHT, buff=0.18), 1.25)
    dq = e.pose(e.vexpr("Que vaut u · v ?", ("u", "v"), 32), 0.10)
    appel = e.appel_blocs(-1.25)
    p["03-commentaire"] = [("à toi", et), ("donnée u", d1), ("donnée v", d2),
                           ("question", dq), ("appel", appel)]
    return p


class PsEspaceCalculerShort(ShortEspace):
    fichier_marques = "ps_espace_calculer_short_marques.json"
    nom_voix = "terminale-ps-espace-calculer-short"

    def construct(self):
        p = self.par_nom(pieces(self))
        titre, badge = p["00-accroche"]["titre"], p["00-accroche"]["badge"]

        # ── 00 : l'accroche ─────────────────────────────────────────────────
        # ⛔ LE TITRE EST AJOUTÉ AVANT LA VOIX, pas écrit pendant : un `Write` de 0,5 s
        # met la première ligne du clip 0,50 s en retard sur son propre mot, et une demi
        # seconde de silence en tête d'un short se paie en rétention.
        self.margo_bas()
        self.add(titre, badge)
        self.dire("00-accroche")
        a = p["00-accroche"]
        self.jouer_phrase(a["deux vecteurs"], "Deux vecteurs,")
        self.jouer_phrase(a["trois multiplications"], "trois multiplications,")
        self.jouer_phrase(a["une addition"], "une addition.")
        self.au_mot("ce qui sort n'est pas un vecteur")
        self.play(FadeIn(a["pas un vecteur"], shift=UP * 0.08), run_time=0.35)
        self.au_mot("c'est un nombre")
        self.play(FadeIn(a["un nombre"][0], scale=1.2),
                  Create(a["un nombre"][1]), run_time=0.45)
        self.insister(a["un nombre"], 1.06)
        self.attendre_voix(marge=0.25)

        # ── 01 : la règle, les vecteurs, les produits, le total ─────────────
        self.dire("01-idee")
        i = p["01-idee"]
        self.play(FadeOut(VGroup(a["deux vecteurs"], a["trois multiplications"],
                                 a["une addition"], a["pas un vecteur"],
                                 a["un nombre"])), run_time=0.25)
        self.au_mot("on multiplie les x entre eux")
        self.play(FadeIn(i["règle"], shift=UP * 0.08), run_time=0.4)
        self.au_fin("u de coordonnées 1, 2, 3")
        self.play(FadeIn(i["u"], shift=UP * 0.08), run_time=0.3)
        self.au_fin("v de coordonnées 4, moins 1, 2")
        self.play(FadeIn(i["v"], shift=UP * 0.08), run_time=0.3)
        # ⛔ Chaque produit à SON résultat, et les trois extraits sont UNIQUES dans le
        # clip (vérifié : « Cela fait 4 », « puis moins 2 », « puis 6 »). Un extrait
        # ambigu ferait viser la première occurrence — le garde-fou `_ambigu` du socle
        # le dirait dans le journal du dry run.
        for extrait, g in zip(("Cela fait 4", "puis moins 2", "puis 6"),
                              (i["produit x"], i["produit y"], i["produit z"])):
            self.au_fin(extrait)
            self.play(FadeIn(g, shift=UP * 0.06), run_time=0.25)
        self.au_fin("Total : 8")
        self.play(FadeIn(i["total"][0], shift=UP * 0.1),
                  Create(i["total"][1]), run_time=0.4)
        self.insister(i["total"], 1.06)
        self.attendre_voix(marge=0.3)

        # ── 02 : la question-pause ──────────────────────────────────────────
        self.dire("02-question")
        t0 = self.renderer.time
        qq = p["02-question"]
        self.play(FadeOut(VGroup(i["règle"], i["u"], i["v"], i["produit x"],
                                 i["produit y"], i["produit z"], i["total"])),
                  run_time=0.3)
        self.au_mot("Question")
        self.play(FadeIn(qq["tête"], shift=DOWN * 0.12), run_time=0.3)
        self.au_fin("u a pour coordonnées 3, zéro, 1")
        self.play(FadeIn(qq["question"][0], shift=UP * 0.08), run_time=0.25)
        self.au_fin("v a pour coordonnées 2, 1, moins 1")
        self.play(FadeIn(qq["question"][1], shift=UP * 0.08), run_time=0.25)
        self.au_mot("Que vaut le produit scalaire")
        self.play(FadeIn(qq["question"][2], shift=UP * 0.08), run_time=0.3)
        self.q_montrer_choix(qq["cartes"])
        self.q_pause(qq["pause"], qq["rebours"], "02-question", t0, BONNE)

        # ── 02b : la réponse ────────────────────────────────────────────────
        self.dire("02b-reponse")
        r = p["02b-reponse"]
        cartes = qq["cartes"]
        ok = self.q_reponse(cartes, BONNE, qq["pause"], qq["rebours"])
        self.play(FadeOut(VGroup(qq["tête"], qq["question"])), run_time=0.25)
        self.au_fin("Six, plus zéro, moins un : 5")
        self.play(FadeIn(r["la somme"][0], shift=UP * 0.08),
                  Create(r["la somme"][1]), run_time=0.4)
        # ⚠️ PAS `jouer_phrase` ICI, ET C'EST VOULU : ces deux lignes portent la lettre de
        # leur carte (« B : … »), donc leur texte n'est plus un morceau exact de la voix
        # et `jouer_phrase` lèverait. On pose l'ancre à la main, sur les mots qui, eux,
        # sont dits. C'est ce que fait déjà l'écran 03 du short de l'épisode 6 pour
        # « (A G) » et « (B H) ».
        self.au_mot("oublie le signe moins")
        self.play(FadeIn(r["leurre B"], shift=UP * 0.06),
                  Indicate(cartes[1], color=C_PIEGE, scale_factor=1.04), run_time=0.4)
        self.au_mot("pas du bon type")
        self.play(FadeIn(r["leurre C"], shift=UP * 0.06),
                  Indicate(cartes[2], color=C_PIEGE, scale_factor=1.04), run_time=0.4)
        self.attendre_voix(marge=0.3)

        # ── 03 : la question en commentaire ─────────────────────────────────
        self.dire("03-commentaire")
        c = p["03-commentaire"]
        self.play(FadeOut(VGroup(cartes, r["la somme"], r["leurre B"], r["leurre C"],
                                 ok, titre, badge)), run_time=0.3)
        self.au_mot("À toi")
        self.play(FadeIn(c["à toi"], shift=DOWN * 0.1), run_time=0.35)
        self.au_fin("u a pour coordonnées 2, moins 1, 1")
        self.play(FadeIn(c["donnée u"], shift=UP * 0.08), run_time=0.3)
        self.au_fin("v a pour coordonnées 3, 1, 5")
        self.play(FadeIn(c["donnée v"], shift=UP * 0.08), run_time=0.3)
        self.au_mot("Que vaut leur produit scalaire")
        self.play(FadeIn(c["question"], scale=1.1), run_time=0.35)
        self.jouer_appel(c["appel"])
        self.attendre_voix(marge=0.5)

        # ── 04 : la fin ─────────────────────────────────────────────────────
        self.fin_short("04-abonne", [c["à toi"], c["donnée u"], c["donnée v"],
                                     c["question"], c["appel"]])
