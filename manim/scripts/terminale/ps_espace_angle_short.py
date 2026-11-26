# ps_espace_angle_short.py
# EleveAI — Maths Tle spé — short « la grande diagonale ne fait pas 45 degrés » (9:16),
# ceinture VERTE. Micro du coach : ps_espace_angle.
# Paysage jumeau : ps_espace_angle.py (HD livré).
#
# ⭐ UNE SEULE IDÉE : le cosinus vient du produit scalaire divisé par le PRODUIT des
# normes — et le dessin, lui, trompe.
#
#   · 00-accroche   : la diagonale et l'arête, « quel angle ? », et « se trompent ».
#                     ⛔ Elle n'ÉCRIT PLUS « 45 degrés » : c'est la carte A ;
#   · 01-idee       : le cube avec [A G] et [A B] en couleur, puis le calcul du cosinus ;
#   · 02/02b        : question-pause (C : 55 degrés), 3 s, puis l'angle montré ENFIN ;
#   · 03-commentaire: u · v = −6 — ⛔ la réponse (obtus) n'est NI dite NI affichée ;
#   · 04-abonne     : la fin commune.
#
# ⛔⛔⛔ AUCUN ARC D'ANGLE DANS LE CUBE, NI EN 01 NI AILLEURS. La cavalière de cette série
# ne conserve AUCUN angle : l'angle (A G, A B) s'y dessinerait à **42,4°** alors qu'il
# vaut **54,7°**. Douze degrés de mensonge, et un élève qui regarde répondrait « 45 »,
# c'est-à-dire la réponse que ce short réfute — la figure enseignerait la mauvaise
# réponse. C'est exactement le défaut du triangle (BDE) de l'épisode 12.
# ⭐ L'angle n'apparaît donc qu'en 02b, et À PLAT, par `espace3d.coin()` — une figure
# PLANE, dont l'angle dessiné est vérifié au millionième de degré par une assertion de
# module. Elle ne prétend pas dire OÙ sont les vecteurs : elle dit ce qu'est leur angle,
# et elle le dit juste.
#
# Voix : manim/voix/terminale-ps-espace-angle-short.json, calée par
# ps_espace_angle_short_marques.json (183 marques).
# Découpage : manim/poste2/DECOUPAGE-shorts-ps-espace.md, section E10.
#
# Mesure (⛔ AVANT tout rendu) : python -X utf8 manim/poste2/mesure-shorts-ps-espace.py E10
# Avant rendu : python -X utf8 manim/poste2/verifier-avant-rendu.py manim/scripts/terminale/ps_espace_angle_short.py PsEspaceAngleShort
# Dry run : AUDIT=1 BORDS=1 PYTHONIOENCODING=utf-8 python -X utf8 -m manim render --dry_run -r 1080,1920 manim/scripts/terminale/ps_espace_angle_short.py PsEspaceAngleShort
# Planche : PYTHONIOENCODING=utf-8 python -X utf8 -m manim render -ql -r 1080,1920 --disable_caching manim/scripts/terminale/ps_espace_angle_short.py PsEspaceAngleShort -o eleveai-maths-terminale-ps-espace-angle-short --media_dir manim/scripts/terminale/media-ps-espace-angle-short

import math
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

import numpy as np  # noqa: E402

from espace_commun_short import *  # noqa: E402,F403
from espace3d import coin  # noqa: E402

# ── LES DONNÉES, REFAITES à l'import ────────────────────────────────────────
S = ShortEspace.CUBE_SOMMETS
AG = np.array(S["G"]) - np.array(S["A"])            # (1 ; 1 ; 1)
AB = np.array(S["B"]) - np.array(S["A"])            # (1 ; 0 ; 0)
PS = float(AG @ AB)
N_AG, N_AB = float(np.linalg.norm(AG)), float(np.linalg.norm(AB))
COS = PS / (N_AG * N_AB)
DEG = math.degrees(math.acos(COS))
BONNE = 2                                           # C — tirage des shorts : A C B C B A
CHOIX = ("45 degrés", "60 degrés", "55 degrés")
# ⚠️ u = 0,80 et y = 1,58, MESURÉS : à u = 0,90 le cube fait 1,93 de haut et monte à
# +2,59, c'est-à-dire 0,11 DANS l'échelle des ceintures (qui descend à +2,48).
# ⭐ Les deux écarts de nom du socle (`ECARTE_CUBE`) sont des cotes ABSOLUES calées à
# u = 1,00 et plus ; ici ils ne portent sur rien, puisque « D » et « F » ne sont pas
# nommés — la question ne parle que de A, B et G.
U_CUBE, Y_CUBE = 0.80, 1.50

assert tuple(AG) == (1, 1, 1) and tuple(AB) == (1, 0, 0), (AG, AB)
assert PS == 1.0, PS
assert abs(N_AG - math.sqrt(3)) < 1e-12 and N_AB == 1.0
assert abs(COS - 1 / math.sqrt(3)) < 1e-12
assert abs(round(COS, 3) - 0.577) < 1e-9, COS
# ⭐ LA RÉPONSE, REFAITE : 54,7°, qui s'arrondit à 55 et pas à 45.
assert abs(DEG - 54.7356) < 1e-3, DEG
assert round(DEG) == 55
# ⛔⛔ ET LE MENSONGE DE LA CAVALIÈRE, MESURÉ ICI PLUTÔT QUE CRU SUR PAROLE : l'angle que
# le cube DESSINERAIT entre (A G) et (A B). S'il était proche de 54,7°, l'interdiction
# d'arc dans le cube serait une superstition ; il est à 42°, et c'est un fait.
_pr = lambda p: np.array([p[0] + FUITE[0] * p[1], p[2] + FUITE[1] * p[1]])  # noqa: E731
_vg, _vb = _pr(S["G"]) - _pr(S["A"]), _pr(S["B"]) - _pr(S["A"])
ANGLE_DESSINE = math.degrees(math.acos(
    float(_vg @ _vb) / (np.linalg.norm(_vg) * np.linalg.norm(_vb))))
assert abs(ANGLE_DESSINE - 42.4) < 1.0, ANGLE_DESSINE
assert DEG - ANGLE_DESSINE > 10.0, (DEG, ANGLE_DESSINE)
# ⭐ Les deux leurres, chacun avec SA raison : 45° et 60° ont des cosinus qui ne sont pas
# celui qu'on vient de calculer.
assert abs(round(math.cos(math.radians(45)), 2) - 0.71) < 1e-9
assert abs(math.cos(math.radians(60)) - 0.5) < 1e-12
assert len(set(CHOIX)) == 3 and len({len(c) for c in CHOIX}) == 1   # 9 / 9 / 9 : aucun tell
# ⭐ Le défi : un produit scalaire négatif donne un angle OBTUS. Ni dit, ni affiché.
assert math.degrees(math.acos(-6 / (6 * 1.0001))) > 90


def frac(e, haut, bas, fs=28, color=WHITE):
    """Une fraction : numérateur, barre, dénominateur.

    ⛔ Le socle des shorts n'a pas de fraction, et il est GELÉ. `frac()` existe bien dans
    `ps_espace_angle.py` — mais c'est un ÉPISODE LIVRÉ, pas une boîte à outils : importer
    un module de Scene pour une fonction, c'est exécuter ses assertions de figure et se
    lier à un fichier qui n'a aucune raison de rester stable. On l'écrit donc ici, comme
    la consigne le prévoit.
    ⚠️ La barre déborde de 0,08 de chaque côté du plus large des deux étages : sans ça
    elle se confond avec un signe moins quand le numérateur est un chiffre seul."""
    h = haut if isinstance(haut, Mobject) else e.t(str(haut), fs, color, larg=None)
    b = bas if isinstance(bas, Mobject) else e.t(str(bas), fs, color, larg=None)
    g = VGroup(h, b).arrange(DOWN, buff=0.16)
    barre = Line(LEFT, RIGHT, stroke_width=max(2.0, fs / 14.0), color=color)
    barre.set_length(max(h.width, b.width) + 0.16).move_to(g)
    return VGroup(g, barre)


def pieces(e):
    """BÂTIT et POSITIONNE les six écrans, sans rien jouer."""
    p = {}
    # ⚠️ 28 px : « Angle dans l'espace » fait 3,89 à 28 px pour 3,90 offerts. Le titre du
    # découpage, « Un angle dans l'espace », faisait 6,13 à 38 px et serait tombé à
    # **24,2 px obtenus** — le pire des six titres.
    titre, badge = e.entete_blocs("Angle dans l'espace", fs=28)

    # ── 00 : quel angle ? beaucoup de copies se trompent ─────────────────────────────
    a1 = e.blocs_phrase("La grande diagonale d'un cube", 1.95, 26)
    # ⛔⛔ L'ACCROCHE N'ÉCRIT PLUS « 45 degrés » (26/11/2026). C'est la carte A de la
    # question, et la donner fausse d'entrée la rendait éliminable DE MÉMOIRE, sans aucun
    # calcul : le vrai choix tombait à 60 contre 55.
    # ⭐ La règle : une carte ne doit pas être réfutable par la seule mémoire de l'accroche.
    # L'erreur classique garde toute sa place — mais DANS les cartes, là où elle fait
    # travailler, et dans le 02b qui l'explique (« 45 degrés : cos 0,71 »).
    a2 = e.blocs_phrase("et une arête. Quel angle ?", 0.95, 24, C_REGARD)
    a3 = e.blocs_phrase("Beaucoup de copies", -0.25, 22, GREY_A)
    # ⛔ `larg=3,60` : un bloc encadré qui remplit la largeur sort du cadre pendant le
    # battement de `insister` — la borne est 2 × 2,115 / 1,05 − 0,28 = 3,75.
    a4 = e.blocs_phrase("se trompent", -1.70, 40, C_PIEGE, larg=3.60)
    cadre4 = SurroundingRectangle(a4, color=C_PIEGE, buff=0.16, stroke_width=3)
    p["00-accroche"] = [("titre", titre), ("badge", badge), ("la diagonale", a1),
                        ("quel angle", a2), ("les copies", a3),
                        ("se trompent", VGroup(a4, cadre4))]

    # ── 01 : le cube, et le calcul du cosinus ───────────────────────────────
    # ⛔⛔ PAS D'ARC DANS CE CUBE (voir l'en-tête) : il se dessinerait à 42,4° pour un
    # angle de 54,7°. Les deux arêtes sont en COULEUR, et c'est tout — la couleur dit de
    # quels vecteurs on parle sans rien affirmer sur leur angle.
    r, _cube, _vs, cubeg = e.cube_place(U_CUBE, Y_CUBE, ecarte=e.ECARTE_CUBE,
                                        noms=("A", "B", "G"))
    ag = e.arete(r, "A", "G", couleur=C_VECTEUR2, sw=6)
    ab = e.arete(r, "A", "B", couleur=C_VECTEUR, sw=6)
    l1 = e.pose(e.vexpr("A G · A B = 1", ("A G", "A B"), 26), 0.22)
    l2 = e.pose(VGroup(e.vexpr("‖A G‖ =", ("A G",), 26, C_VECTEUR2),
                       e.racine("3", 26, C_VECTEUR2)).arrange(RIGHT, buff=0.16), -0.40)
    l3 = e.pose(e.vexpr("‖A B‖ = 1", ("A B",), 26, C_VECTEUR), -1.02)
    # ⚠️ « 0,577 » HORS AUDIT : la voix dit « environ zéro virgule 577 », donc en
    # LETTRES pour la partie « zéro virgule ». L'audit cherche la chaîne « 0,577 » dans
    # la voix et ne la trouve pas. Le « 1 » et le « 3 » de la fraction, eux, restent
    # surveillés — ce sont les deux nombres que l'audit doit voir.
    # ⛔⛔ ET CE BLOC SE JOUE EN DEUX TEMPS, parce que la voix le dit en deux temps :
    # « Le cosinus vaut donc 1 sur racine de 3 », PUIS « environ zéro virgule 577 ».
    # Posé d'un coup à la seconde ancre, le « 1 » de la fraction arrivait **2,89 s**
    # après avoir été dit et le « 3 » 1,86 s après — deux `AUDIT-TARD` dont le plus gros
    # au-delà des 2 s que `--tard` signale. Ce n'était pas du bruit : la fraction
    # ATTENDAIT vraiment, et ça se voit à l'image.
    cos_g = VGroup(e.t("cos =", 28, VERT_OK, larg=None),
                   frac(e, "1", e.racine("3", 26, VERT_OK), 28, VERT_OK)
                   ).arrange(RIGHT, buff=0.20)
    cos_d = e.sans_audit(e.t("≈ 0,577", 28, VERT_OK, larg=None))
    cos = VGroup(cos_g, cos_d).arrange(RIGHT, buff=0.20)
    e.pose(cos, -2.00)
    cadre_cos = SurroundingRectangle(cos, color=VERT_OK, buff=0.14, stroke_width=3)
    p["01-idee"] = [("titre", titre), ("badge", badge), ("cube", cubeg),
                    ("+ [A G]", ag), ("+ [A B]", ab),
                    ("produit scalaire", l1), ("norme A G", l2), ("norme A B", l3),
                    ("le cosinus", VGroup(cos, cadre_cos))]

    # ── 02 / 02b : la question-pause ────────────────────────────────────────
    fsq, fsc = 24, 26
    # ⛔ MAJUSCULE, ET C'EST LE GROS PLAN DU 26/11 QUI L'A DIT. Le premier jet recopiait
    # le fragment de la voix (« … que vaut alors l'angle entre… ») tel quel : l'écran de
    # pause s'ouvrait donc sur une minuscule, seul des six à le faire. Un écran de pause
    # est lu SEUL, arrêté, sans la phrase qui le précède — il doit se tenir debout tout
    # seul. Le découpage l'écrivait déjà « L'angle entre… ».
    # ⛔⛔ ET « GRANDE » TOMBE AVEC LA MAJUSCULE, CE QUI N'EST PAS UN CHOIX DE STYLE.
    # Mesuré : en minuscule, « l'angle entre la grande » faisait 3,83 pour 3,90 offerts
    # — à sept centièmes de la coupe. La capitale passe la ligne au-dessus, `lignes()`
    # rend QUATRE lignes au lieu de trois, les cartes descendent d'autant et le second
    # leurre de l'écran 02b finit à −3,20, c'est-à-dire SUR Ti-Margo. C'est la mesure
    # de la série qui l'a dit, pas l'œil. Sans « grande » : trois lignes, 3,33.
    # ⭐ Et c'est le texte du découpage, qui écrivait « L'angle entre la diagonale ».
    q_lignes, _ = e.lignes("L'angle entre la diagonale et l'arête, "
                           "arrondi au degré ?", fsq)
    # ⭐ Les trois libellés font NEUF caractères chacun — « 45 degrés », « 60 degrés »,
    # « 55 degrés ». Mesurés sur l'écran, ils sont strictement ex æquo : un devineur
    # n'a aucune prise, et c'est le meilleur cas possible pour cette règle.
    choix = []
    for lib in CHOIX:
        t = e.t(lib, fsc, larg=None)
        t.nb = [t]          # sans `.nb`, la carte paraît juste AVANT que le nombre soit dit
        choix.append(t)
    tete, q, cartes, pause, rebours = e.q_tete(q_lignes, choix, fs_q=fsq, fs_c=fsc)
    p["02-question"] = [("titre", titre), ("badge", badge), ("tête", tete),
                        ("rebours", rebours), ("question", q), ("cartes", cartes),
                        ("pause", pause)]

    # ⭐⭐ L'ANGLE APPARAÎT ENFIN, ET À PLAT. `coin(54,7)` dessine exactement 54,7° —
    # vérifié au millionième de degré par `_controler_figures_planes` à l'import de
    # `espace3d`, et re-vérifié ici sur CETTE instance.
    angle = coin(round(DEG, 1), r=1.15, r_arc=0.42, sw=7,
                 c1=C_VECTEUR, c2=C_VECTEUR2)
    _f1, _f2 = [m for m in angle if isinstance(m, Arrow)][:2]

    def _dir(fl):
        v = fl.get_end() - fl.get_start()
        return math.degrees(math.atan2(v[1], v[0]))

    assert abs(abs(_dir(_f2) - _dir(_f1)) - round(DEG, 1)) < 1e-6, "coin ne dessine pas 54,7°"
    # ⚠️ L'étiquette se place depuis le SOMMET (d'où partent les deux flèches), jamais
    # depuis le centre de la boîte du groupe — qui tombe au milieu du secteur. Elle est
    # posée sur la bissectrice, au-delà de l'arc.
    # ⛔ L'ÉTIQUETTE N'EST PAS POSÉE SUR LA BISSECTRICE À VUE. Premier jet : sommet +
    # 0,88 sur la bissectrice — mesuré à **0,028** d'un trait, c'est-à-dire collée à
    # l'arc. ⭐ Cherchée en grille, un pas de 0,03, sous trois contraintes : à plus de
    # 0,16 de tout trait de la figure, DANS le secteur (sinon elle n'étiquette pas
    # l'angle mais le vide à côté), et la plus PROCHE du sommet parmi celles qui
    # restent. 777 places libres, la retenue est à 0,166 du trait le plus proche.
    etq = e.sans_audit(e.t("54,7°", 26, C_REGARD, larg=None))
    etq.move_to(angle.sommet() + np.array([1.020, 0.330, 0.0]))
    fig_angle = VGroup(angle, etq)
    p["02b-reponse"] = [("titre", titre), ("badge", badge), ("cartes", cartes),
                        ("figure angle", fig_angle),
                        ("leurre A", None), ("leurre B", None)]
    fig_angle.move_to(P(0, float(cartes.get_top()[1]) + 0.30 + fig_angle.height / 2))
    bas = float(cartes.get_bottom()[1])
    # ⚠️ « 0,71 » et « 0,5 » hors audit : la voix dit « un cosinus de zéro virgule 71 ».
    # « 45 » et « 60 », eux, sont dits en chiffres et restent surveillés.
    la = e.blocs_phrase("45 degrés : cos 0,71", bas - 0.30, 22, C_PIEGE)
    lb = e.blocs_phrase("60 degrés : cos 0,5", bas - 0.76, 22, C_PIEGE)
    for bloc in (la, lb):
        for m in bloc:
            if "0," in m.original_text:
                e.sans_audit(m)
    p["02b-reponse"][4] = ("leurre A", la)
    p["02b-reponse"][5] = ("leurre B", lb)

    # ── 03 : la question en commentaire ─────────────────────────────────────
    et = e.pose(e.t("À toi !", 38, JAUNE_TITRE, larg=None), 3.50)
    d1 = e.pose(e.vexpr("u · v = −6", ("u", "v"), 34, C_REGARD), 1.80)
    # ⛔⛔ `.arrange(DOWN)` N'EST PAS UNE FINITION, C'EST CE QUI SÉPARE LES LIGNES.
    # `lignes()` rend des mobjets COUPÉS mais NON POSITIONNÉS : sans `arrange`, les deux
    # lignes se posent toutes les deux à l'origine et l'écran affiche
    # « aigubdrusi? ou » — deux phrases superposées, parfaitement illisibles.
    # ⭐⭐ Et AUCUN instrument ne l'a vu : le bloc a une boîte valide, il ne déborde
    # d'aucune marge, il ne chevauche aucun autre bloc, et le dry run est muet. Seule la
    # PLANCHE le montre. C'est la raison d'être de la règle de Frédéric — on regarde
    # l'image avant tout HD.
    # ⛔ « Leur angle est-il … » ET NON « aigu, droit ou obtus ? ». Même défaut que
    # l'écran de pause, vu au même gros plan : la queue d'une phrase de la voix posée
    # seule à l'écran. Ici la voix donne la tête (« Leur angle est-il aigu, droit ou
    # obtus ? »), donc on l'écrit en entier — mot pour mot, et c'est une question.
    # ⚠️ Trois lignes au lieu de deux à 30 px : la donnée est à 1,80 et l'appel à −1,25,
    # le bloc centré en 0,45 a 2,4 d'unité devant lui pour 1,50 — il y tient.
    dq = e.pose(VGroup(*e.lignes("Leur angle est-il aigu, droit ou obtus ?", 30)[0]
                       ).arrange(DOWN, buff=0.12), 0.45)
    appel = e.appel_blocs(-1.25)
    p["03-commentaire"] = [("à toi", et), ("donnée", d1), ("question", dq),
                           ("appel", appel)]
    return p


class PsEspaceAngleShort(ShortEspace):
    fichier_marques = "ps_espace_angle_short_marques.json"
    nom_voix = "terminale-ps-espace-angle-short"

    # ⛔ L'emprunt qui manque au socle gelé : sans la barre, « √3 » se lit « √ 3 ».
    racine = EcransEspace.racine

    def construct(self):
        p = self.par_nom(pieces(self))
        titre, badge = p["00-accroche"]["titre"], p["00-accroche"]["badge"]

        # ── 00 : l'accroche ─────────────────────────────────────────────────
        self.margo_bas()
        self.add(titre, badge)
        self.dire("00-accroche")
        a = p["00-accroche"]
        self.jouer_phrase(a["la diagonale"], "La grande diagonale d'un cube")
        self.jouer_phrase(a["quel angle"], "et une arête. Quel angle ?")
        self.jouer_phrase(a["les copies"], "Beaucoup de copies")
        self.au_mot("se trompent")
        self.play(FadeIn(a["se trompent"][0], scale=1.2),
                  Create(a["se trompent"][1]), run_time=0.45)
        self.insister(a["se trompent"], 1.05)
        self.attendre_voix(marge=0.25)

        # ── 01 : le cube et le cosinus ──────────────────────────────────────
        self.dire("01-idee")
        i = p["01-idee"]
        self.play(FadeOut(VGroup(a["la diagonale"], a["quel angle"], a["les copies"],
                                 a["se trompent"])), run_time=0.25)
        self.au_mot("Dans le cube d'arête 1")
        self.play(FadeIn(i["cube"]), run_time=0.45)
        self.au_fin("le vecteur A G a pour coordonnées 1, 1, 1")
        self.play(Create(i["+ [A G]"]), run_time=0.3)
        self.au_fin("le vecteur A B a pour coordonnées 1, zéro, zéro")
        self.play(Create(i["+ [A B]"]), run_time=0.3)
        self.au_fin("Leur produit scalaire vaut 1")
        self.play(FadeIn(i["produit scalaire"], shift=UP * 0.08), run_time=0.3)
        # ⛔ LES DEUX NORMES PARAISSENT ENSEMBLE, EN UN SEUL `play`. Posées à deux ancres,
        # « Les normes valent racine de 3 » et « racine de 3 et 1 » sont séparées de
        # **0,45 s** et chaque `play` en coûte 0,30 : la seconde ligne arriverait en
        # retard sur son propre mot. `verifier-avant-rendu.py` le dit AVANT le rendu
        # (seuil de 0,6 s entre deux ancres), et c'est tout l'intérêt de le lancer.
        # ⭐ La voix, elle, dit bien les deux normes d'un trait : « Les normes valent
        # racine de 3 et 1 ». L'écran suit la voix, pas l'inverse.
        self.au_fin("Les normes valent racine de 3 et 1")
        self.play(FadeIn(i["norme A G"], shift=UP * 0.08),
                  FadeIn(i["norme A B"], shift=UP * 0.08), run_time=0.35)
        cos_g, cos_d = i["le cosinus"][0]
        self.au_fin("1 sur racine de 3")
        self.play(FadeIn(cos_g, shift=UP * 0.08), run_time=0.35)
        self.au_fin("environ zéro virgule 577")
        self.play(FadeIn(cos_d, shift=RIGHT * 0.1),
                  Create(i["le cosinus"][1]), run_time=0.4)
        self.insister(i["le cosinus"], 1.05)
        self.attendre_voix(marge=0.3)

        # ── 02 : la question-pause ──────────────────────────────────────────
        self.dire("02-question")
        t0 = self.renderer.time
        qq = p["02-question"]
        self.play(FadeOut(VGroup(i["cube"], i["+ [A G]"], i["+ [A B]"],
                                 i["produit scalaire"], i["norme A G"],
                                 i["norme A B"], i["le cosinus"])), run_time=0.3)
        self.au_mot("Question")
        self.play(FadeIn(qq["tête"], shift=DOWN * 0.12), run_time=0.3)
        self.au_mot("Que vaut alors l'angle")
        self.play(FadeIn(qq["question"], shift=UP * 0.08), run_time=0.35)
        self.q_montrer_choix(qq["cartes"])
        self.q_pause(qq["pause"], qq["rebours"], "02-question", t0, BONNE)

        # ── 02b : la réponse, et l'angle montré ENFIN ───────────────────────
        self.dire("02b-reponse")
        r = p["02b-reponse"]
        cartes = qq["cartes"]
        ok = self.q_reponse(cartes, BONNE, qq["pause"], qq["rebours"])
        self.play(FadeOut(VGroup(qq["tête"], qq["question"])), run_time=0.25)
        fa = r["figure angle"]
        self.au_fin("environ 54 virgule 7 degrés")
        self.play(FadeIn(fa, shift=UP * 0.08), run_time=0.45)
        self.au_mot("45 degrés correspondrait")
        self.play(FadeIn(r["leurre A"], shift=UP * 0.06),
                  Indicate(cartes[0], color=C_PIEGE, scale_factor=1.04), run_time=0.4)
        self.au_mot("60 degrés à un cosinus")
        self.play(FadeIn(r["leurre B"], shift=UP * 0.06),
                  Indicate(cartes[1], color=C_PIEGE, scale_factor=1.04), run_time=0.4)
        self.attendre_voix(marge=0.3)

        # ── 03 : la question en commentaire ─────────────────────────────────
        self.dire("03-commentaire")
        c = p["03-commentaire"]
        self.play(FadeOut(VGroup(cartes, fa, r["leurre A"], r["leurre B"], ok,
                                 titre, badge)), run_time=0.3)
        self.au_mot("À toi")
        self.play(FadeIn(c["à toi"], shift=DOWN * 0.1), run_time=0.35)
        self.au_fin("vaut moins 6")
        self.play(FadeIn(c["donnée"], shift=UP * 0.08), run_time=0.35)
        self.au_mot("aigu, droit ou obtus")
        self.play(FadeIn(c["question"], scale=1.1), run_time=0.35)
        self.jouer_appel(c["appel"])
        self.attendre_voix(marge=0.5)

        # ── 04 : la fin ─────────────────────────────────────────────────────
        self.fin_short("04-abonne", [c["à toi"], c["donnée"], c["question"],
                                     c["appel"]])
