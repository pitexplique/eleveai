# 4e_patron_pyramide.py
# EleveAI — Maths 4e — série « Périmètre, aire, volume, solides », épisode S4 : LE PATRON D'UNE PYRAMIDE
# (micro patron_pyramide, notion vision_espace), AVEC VOIX. Paysage 16:9, CEINTURE VERTE.
# Décor et métier : Tiago, FABRICANT DE JEUX — le dé à quatre faces (centres jeux-defis, art-design).
# Mapping micro → écrans : 02 (un patron est le solide déplié à plat, chaque face une fois en vraie
# grandeur), 03 (cinq morceaux : un carré et quatre triangles), 04 (le dé à 4 faces : quatre triangles),
# 06 (piège : deux triangles sur le même côté → le patron ne se referme pas), questions 05 (B : 5)
# et 07 (A : 4 triangles), défi 08 (36 + 4 × 15 = 96 cm² de carton).
# Voix : manim/voix/4e-patron-pyramide.json ; marques : 4e_patron_pyramide_marques.json.
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/4e_patron_pyramide.py PatronPyramide4e
# Sortie : manim/sorties/4e/maths/solides/18-patron-pyramide/

import math
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from volume_4e_commun import *  # noqa: E402,F403
from volume_4e_commun import (point3, pyramide, patron_pyramide_carree, tiago4, Paysage4e,  # noqa: E402
                              PYR_FACE, PYR_COTE, PYR_BORD)

CARTON_C, CARTON_B = "#d6b98c", "#78350f"


def _sym(pt, p1, p2):
    """Le symétrique de `pt` par rapport à la droite (p1 p2) : un triangle qui se rabat."""
    d = p2 - p1
    d = d / np.linalg.norm(d)
    v = pt - p1
    return p1 + 2 * float(v @ d) * d - v


def tetraedre(cote, u, o=ORIGIN, face=PYR_FACE, cote_c=PYR_COTE, bord=PYR_BORD, sw=4, op=0.9):
    """Un dé à QUATRE faces (pyramide à base triangulaire), dessiné comme on le dessine à la main :
    le contour A B S, et le sommet du FOND (C) à l'intérieur, relié aux trois autres — l'arête
    A C est cachée, donc pointillée. o = le coin avant-gauche.
    Attributs : .base (le triangle du sol, A B C) .faces .caches .S"""
    c = cote * u
    A, B = o, o + P(c, 0)
    S = o + P(c * 0.5, c * 0.92)
    C = o + P(c * 0.46, c * 0.34)
    f_av = Polygon(A, B, S, fill_color=face, fill_opacity=op, stroke_color=bord, stroke_width=sw)
    f_dr = Polygon(B, C, S, fill_color=cote_c, fill_opacity=op * 0.85, stroke_color=bord, stroke_width=sw)
    cach = VGroup(DashedLine(A, C, dash_length=0.08)).set_stroke(bord, sw * 0.8)
    base = Polygon(A, B, C, fill_color=BASE_C, fill_opacity=0.5, stroke_color=BASE_C, stroke_width=sw)
    v = VGroup(f_av, f_dr, cach)
    v.faces, v.caches, v.base, v.S = VGroup(f_av, f_dr), cach, base, S
    v.A, v.B, v.C = A, B, C
    return v


def patron_tetraedre(cote, u, o=ORIGIN, tri_c=PYR_FACE, base_c=BASE_C, bord=PYR_BORD, sw=4):
    """Le patron du dé à quatre faces : un triangle équilatéral au milieu (la base) et les
    TROIS autres rabattus autour. Attributs : .base .triangles"""
    c = cote * u
    h = c * math.sqrt(3) / 2
    # ⭐ Le triangle du milieu pointe vers le BAS : ses trois symétriques sont alors les trois
    #    coins d'un GRAND triangle partagé en quatre — le patron qu'on voit dans les manuels.
    #    (Avec un triangle du milieu pointant vers le haut, on obtient une étoile, pas un patron.)
    A = o + P(-c / 2, h / 3)
    B = o + P(c / 2, h / 3)
    S = o + P(0, -2 * h / 3)
    base = Polygon(A, B, S, fill_color=base_c, fill_opacity=0.45, stroke_color=bord, stroke_width=sw)
    tris = VGroup(*[Polygon(p1, p2, _sym(p3, p1, p2), fill_color=tri_c, fill_opacity=0.85,
                            stroke_color=bord, stroke_width=sw)
                    for p1, p2, p3 in ((A, B, S), (B, S, A), (A, S, B))])
    g = VGroup(base, tris)
    g.base, g.triangles = base, tris
    return g


def patron_rate(cote, haut_tri, u, o=ORIGIN):
    """Le patron qui NE se referme PAS : deux triangles collés au MÊME côté du carré."""
    c = cote * u
    carre = Square(side_length=c, fill_color=BASE_C, fill_opacity=0.45, stroke_color=PYR_BORD,
                   stroke_width=4).move_to(o)
    haut = carre.get_top()
    t1 = Polygon(haut + P(-c / 2, 0), haut + P(c / 2, 0), haut + P(0, haut_tri * u),
                 fill_color=PYR_FACE, fill_opacity=0.85, stroke_color=PYR_BORD, stroke_width=4)
    t2 = t1.copy().rotate(-0.95, about_point=haut + P(c / 2, 0)).set_fill("#fda4af", 0.85)
    g = VGroup(carre, t1, t2)
    g.carre, g.triangles = carre, VGroup(t1, t2)
    return g


class PatronPyramide4e(Paysage4e):
    nom_voix = "4e-patron-pyramide"
    fichier_marques = "4e_patron_pyramide_marques.json"
    ceinture = "verte"

    # ── 00 ──────────────────────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Le patron d'une pyramide", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Le patron d'une pyramide")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q = self.bloc(["Quel découpage", "se referme en pointe ?"], 38)
        q.move_to(P(0, 0.35)).align_to(P(-6.2, 0), LEFT)
        pa = patron_pyramide_carree(1.4, 1.1, 0.85, P(3.0, -0.9))
        self.au_mot("Quel découpage")
        self.play(FadeIn(q[0], shift=UP * 0.2), FadeIn(pa, scale=0.85), run_time=0.5)
        self.au_mot("se referme en pointe")
        self.play(FadeIn(q[1], shift=UP * 0.2), Indicate(pa.triangles, color=JAUNE_TITRE,
                                                         scale_factor=1.05), run_time=0.6)
        self.attendre_voix(marge=0.6)

    # ── 01 ──────────────────────────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        p = tiago4(1.0).move_to(P(-5.2, 0.3))
        self.au_mot("Voici Tiago")
        nom = self.t("Tiago", 40, BLEU_CALCUL).next_to(p, UP, buff=0.25)
        self.play(FadeIn(p, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("Il fabrique des jeux de société")
        met = self.t("jeux de société", 22, BLEU_CALCUL).next_to(p, DOWN, buff=0.2)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.4)
        x = -2.6
        l1 = self.bloc(["Il découpe des dés", "dans du carton :"], 32, WHITE)
        self.col(l1, 2.0, x)
        self.au_mot("il découpe des dés dans du carton")
        feuille = Rectangle(width=2.6, height=1.9, fill_color=CARTON_C, fill_opacity=0.5,
                            stroke_color=CARTON_B, stroke_width=4).move_to(P(4.3, 1.5))
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(feuille, scale=0.9), run_time=0.6)
        l2 = self.t("des dés à quatre faces,", 32, PYR_FACE)
        self.col(l2, 0.8, x)
        de = tetraedre(1.3, 0.95, P(3.4, -2.2))
        self.au_mot("des dés à quatre faces")
        self.play(FadeIn(l2, shift=UP * 0.1), FadeIn(de, scale=0.9), run_time=0.6)
        l3 = self.t("qui sont des pyramides.", 32, PYR_FACE)
        self.col(l3, 0.0, x)
        self.au_mot("qui sont des pyramides")
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.45)
        l4 = self.bloc(["Pour les découper,", "il lui faut le patron."], 32, JAUNE_TITRE)
        self.col(l4, -1.3, x)
        self.au_mot("Pour les découper")
        self.play(FadeIn(l4, shift=UP * 0.1), run_time=0.55)
        self.attendre_voix()

    # ── 02 : déplier ────────────────────────────────────────────────────────
    def ecran_deplier(self):
        self.ecran("02-deplier")
        self.au_mot("Un patron")
        tit = self.t("Un patron", 46, JAUNE_TITRE).move_to(P(0, 3.15))
        l1 = self.t("c'est le solide déplié à plat.", 32, WHITE)
        x = -1.5
        self.col(l1, 2.0, x)
        self.play(Write(tit), FadeIn(l1, shift=UP * 0.1), run_time=0.6)
        l2 = self.t("Chaque face y apparaît une fois,", 30, WHITE)
        self.col(l2, 1.2, x)
        self.au_mot("Chaque face y apparaît une fois")
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.5)
        l3 = self.t("en vraie grandeur.", 32, VERT_OK)
        self.col(l3, 0.5, x)
        self.au_mot("en vraie grandeur")
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.45)
        py = pyramide(1.5, 1.5, 0.95, P(-5.9, -2.2))
        pa = patron_pyramide_carree(1.5, 1.2, 0.95, P(-4.0, -0.9))
        self.au_mot("Tiago déplie sa pyramide à base carrée")
        self.play(FadeIn(py, shift=UP * 0.2), run_time=0.5)
        self.play(ReplacementTransform(py, pa), run_time=1.1)
        l4 = self.t("le carré reste au milieu,", 30, BASE_C)
        self.col(l4, -1.4, x)
        self.au_mot("le carré reste au milieu")
        self.play(FadeIn(l4, shift=UP * 0.1), Indicate(pa.carre, color=BASE_C, scale_factor=1.1),
                  run_time=0.6)
        l5 = self.bloc(["et les quatre triangles", "se rabattent autour."], 30, PYR_FACE)
        self.col(l5, -2.4, x)
        self.au_mot("et les quatre triangles")
        self.play(FadeIn(l5, shift=UP * 0.1), Indicate(pa.triangles, color=PYR_FACE, scale_factor=1.08),
                  run_time=0.7)
        self.attendre_voix()

    # ── 03 : compter les morceaux ───────────────────────────────────────────
    def ecran_compter(self):
        self.ecran("03-compter")
        pa = patron_pyramide_carree(1.5, 1.2, 1.0, P(-3.9, -0.3))
        self.add(pa)
        self.au_mot("cinq morceaux")
        tit = self.t("Cinq morceaux", 46, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), Indicate(pa, color=JAUNE_TITRE, scale_factor=1.05), run_time=0.7)
        x = 0.3
        l1 = self.ligne([("un carré", BASE_C), ("et quatre triangles.", PYR_FACE)], 34, buff=0.2)
        self.col(l1, 1.7, x)
        self.au_mot("un carré")
        num = hors_audit(self.t("1", 30, WHITE)).move_to(pa.carre.get_center())
        self.play(FadeIn(l1[0], shift=UP * 0.1), FadeIn(num, scale=1.3), run_time=0.45)
        self.au_mot("et quatre triangles")
        nums = VGroup(*[hors_audit(self.t(str(k + 2), 28, WHITE)).move_to(
            pa.triangles[k].get_center_of_mass()) for k in range(4)])
        self.play(FadeIn(l1[1], shift=UP * 0.1),
                  LaggedStart(*[FadeIn(n, scale=1.3) for n in nums], lag_ratio=0.18), run_time=0.9)
        l2 = self.t("Autant que de faces.", 34, VERT_OK)
        self.col(l2, 0.4, x)
        self.au_mot("Autant que de faces")
        self.play(FadeIn(l2, scale=1.1), run_time=0.5)
        self.insister(l2, 1.06, 0.25)
        self.attendre_voix()

    # ── 04 : le dé à quatre faces ───────────────────────────────────────────
    def ecran_le_de(self):
        self.ecran("04-le-de")
        de = tetraedre(1.5, 1.0, P(-6.0, -1.9))
        self.au_mot("Le dé à quatre faces")
        tit = self.t("Le dé à quatre faces", 44, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), FadeIn(de, shift=UP * 0.2), run_time=0.7)
        x = -1.9
        l1 = self.t("a une base triangulaire.", 32, BASE_C)
        self.col(l1, 1.8, x)
        self.au_mot("une base triangulaire")
        self.play(FadeIn(l1, shift=UP * 0.1), Create(de.base), run_time=0.6)
        pa = patron_tetraedre(1.5, 1.0, P(2.6, -0.4))
        l2 = self.ligne([("Son patron :", JAUNE_TITRE), ("quatre triangles,", PYR_FACE)], 32, buff=0.18)
        self.col(l2, 0.6, x)
        self.au_mot("Son patron")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("quatre triangles")
        self.play(FadeIn(l2[1], shift=UP * 0.1), FadeIn(pa, scale=0.9), run_time=0.7)
        l3 = self.t("et rien d'autre.", 34, VERT_OK)
        self.col(l3, -1.4, x)
        self.au_mot("et rien d'autre")
        self.play(FadeIn(l3, scale=1.12), run_time=0.45)
        self.insister(l3, 1.08, 0.25)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (réponse B) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        pa = patron_pyramide_carree(1.3, 1.0, 0.95, P(-4.2, 1.1))

        def avant_q(sc):
            sc.play(FadeIn(pa), run_time=0.45)

        self.question_gauche("05-question", "05b-reponse",
                             ["Pyramide à base carrée :", "combien de morceaux ?"],
                             [self.choix("4"), self.choix("5"), self.choix("6")], 1,
                             ["Cinq : le carré de la base", "et quatre triangles.",
                              "4, c'est oublier la base.", "6, ce serait un cube."],
                             # ⛔ le nombre à part : sinon il attend le 1er mot long de la ligne
                             # (« oublier », « serait ») et s'écrit 0,9 s après avoir été dit.
                             -0.3, couper={2: ("4,", "c'est oublier la base."),
                                           3: ("6,", "ce serait un cube.")},
                             avant_q=avant_q)

    # ── 06 : le piège ───────────────────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege", 0.65)
        tit = self.t("Attention au piège !", 48, ORANGE_Q).move_to(P(0, 3.15))
        self.au_mot("Attention au piège")
        self.play(Write(tit), run_time=0.4)
        x = -1.8
        l1 = self.bloc(["Les triangles doivent être", "collés aux côtés du carré,"], 30, WHITE)
        self.col(l1, 2.0, x)
        self.au_mot("Les triangles doivent être collés")
        bon = patron_pyramide_carree(1.1, 0.85, 0.9, P(-4.6, 0.9))
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(bon), run_time=0.6)
        l2 = self.t("pas n'importe où.", 32, ROUGE_ERREUR)
        self.col(l2, 0.9, x)
        self.au_mot("pas n'importe où")
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.45)
        rate = patron_rate(1.1, 0.85, 0.9, P(-4.6, -2.0))
        l3 = self.bloc(["Si deux triangles partent", "du même côté,"], 30, ROUGE_ERREUR)
        self.col(l3, 0.0, x)
        self.au_mot("Si deux triangles partent")
        self.play(FadeIn(l3, shift=UP * 0.1), FadeIn(rate), run_time=0.7)
        l4 = self.t("le patron ne se referme pas.", 32, ROUGE_ERREUR)
        self.col(l4, -1.2, x)
        self.au_mot("le patron ne se referme pas")
        croix = Cross(rate, stroke_color=ROUGE_ERREUR, stroke_width=7).scale(0.75)
        self.play(FadeIn(l4, shift=UP * 0.1), Create(croix), run_time=0.7)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (réponse A) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        de = tetraedre(1.6, 0.9, P(-5.9, 0.5))

        def avant_q(sc):
            sc.play(FadeIn(de), run_time=0.45)

        self.question_gauche("07-question", "07b-reponse",
                             ["Dé à quatre faces :", "son patron ?"],
                             [self.choix("4 triangles"), self.choix("1 carré et 4 triangles"),
                              self.choix("3 triangles")], 0,
                             ["Quatre triangles :", "la base en est un,",
                              "3 triangles, c'est oublier la base."],
                             -0.3, avant_q=avant_q)

    # ── 08 : le défi ────────────────────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        pa = patron_pyramide_carree(1.6, 1.25, 1.0, P(-3.8, -0.3))
        x = 0.8
        l0 = self.bloc(["Tiago découpe une pyramide", "à base carrée"], 30, WHITE)
        self.col(l0, 2.0, x)
        self.au_mot("Tiago découpe une pyramide")
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(pa, shift=UP * 0.2), run_time=0.7)
        # ⛔ « de 6 cm » et « de côté. » séparés : ensemble, le gabarit attend « côté », dit 1,1 s
        #    après le 6, et le 6 s'écrit en retard (AUDIT-TARD).
        l1 = self.ligne([("de 6 cm", BASE_C), ("de côté.", BASE_C)], 32, buff=0.18)
        self.col(l1, 1.0, x)
        self.au_mot("6 centimètres")
        c6 = hors_audit(sur_fond(self.t("6 cm", 24, BASE_C))).next_to(pa.carre, DOWN, buff=0.08)
        self.play(FadeIn(l1[0], shift=UP * 0.1), FadeIn(c6), run_time=0.4)
        self.au_mot("de côté")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.3)
        l2 = self.bloc(["Chaque triangle a", "une hauteur de 5 cm."], 32, HAUTEUR_C)
        self.col(l2, 0.0, x)
        self.au_mot("Chaque triangle a une hauteur")
        hh = DashedLine(pa.triangles[0].get_bottom(), pa.triangles[0].get_top(), color=HAUTEUR_C,
                        stroke_width=5, dash_length=0.1)
        c5 = hors_audit(sur_fond(self.t("5 cm", 24, HAUTEUR_C))).next_to(hh, RIGHT, buff=0.08)
        self.play(FadeIn(l2, shift=UP * 0.1), Create(hh), FadeIn(c5), run_time=0.7)
        l3 = self.bloc(["Quelle est l'aire totale", "de carton découpé ?"], 32, JAUNE_TITRE)
        self.col(l3, -1.3, x)
        self.au_mot("Quelle est l'aire totale")
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.55)
        self.pause_defi(y=-2.9)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        pa = patron_pyramide_carree(1.3, 1.0, 0.95, P(-4.4, -0.3))
        self.add(pa)
        x = -1.3
        # ⛔ UN seul nombre par morceau (sinon le dernier chiffre s'écrit avant d'être dit).
        l1 = self.ligne([("Le carré :", BASE_C), ("6", BLEU_D), ("× 6", BLEU_D), ("= 36 cm²", VERT_OK)],
                        30, buff=0.16)
        self.col(l1, 2.1, x)
        self.au_mot("Le carré")
        self.play(FadeIn(l1[0], shift=UP * 0.1), Indicate(pa.carre, color=BASE_C, scale_factor=1.1),
                  run_time=0.4)
        self.au_mot("6 fois 6")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.28)
        self.play(FadeIn(l1[2], shift=UP * 0.1), run_time=0.28)
        self.au_mot("36 centimètres carrés")
        self.play(FadeIn(l1[3], shift=UP * 0.1), run_time=0.35)
        l2 = self.ligne([("Un triangle :", PYR_FACE), ("6", BLEU_D), ("× 5", BLEU_D), ("÷ 2", BLEU_D),
                         ("= 15 cm²", VERT_OK)], 30, buff=0.14)
        self.col(l2, 1.2, x)
        self.au_mot("Un triangle")
        self.play(FadeIn(l2[0], shift=UP * 0.1), Indicate(pa.triangles[0], color=PYR_FACE,
                                                          scale_factor=1.1), run_time=0.4)
        self.au_mot("6 fois 5")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.28)
        self.play(FadeIn(l2[2], shift=UP * 0.1), run_time=0.28)
        self.au_mot("divisé par 2")
        self.play(FadeIn(l2[3], shift=UP * 0.1), run_time=0.3)
        self.au_mot("15 centimètres carrés")
        self.play(FadeIn(l2[4], shift=UP * 0.1), run_time=0.35)
        l3 = self.ligne([("Quatre triangles :", PYR_FACE), ("15", BLEU_D), ("× 4", BLEU_D),
                         ("= 60", VERT_OK)], 30, buff=0.16)
        self.col(l3, 0.3, x)
        self.au_mot("Quatre triangles")
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("15 fois 4")
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.28)
        self.play(FadeIn(l3[2], shift=UP * 0.1), run_time=0.28)
        self.au_mot("60.")
        self.play(FadeIn(l3[3], shift=UP * 0.1), run_time=0.3)
        l4 = self.ligne([("En tout :", JAUNE_TITRE), ("36", BLEU_D), ("+ 60", BLEU_D),
                         ("= 96 cm²", VERT_OK)], 34, buff=0.18)
        self.col(l4, -1.1, x)
        self.au_mot("En tout")
        self.play(FadeIn(l4[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("36 plus")
        self.play(FadeIn(l4[1], shift=UP * 0.1), run_time=0.28)
        self.play(FadeIn(l4[2], shift=UP * 0.1), run_time=0.28)
        self.au_mot("96 centimètres carrés")
        self.play(FadeIn(l4[3], scale=1.2), run_time=0.45)
        self.insister(l4[3], 1.1, 0.25)
        self.attendre_voix()

    # ── 09 ──────────────────────────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        pa = patron_pyramide_carree(1.2, 0.95, 0.85, ORIGIN)
        lignes = self.finale_gauche(pa, textes=[
            ("Un patron est le solide", "déplié à plat."),
            ("Chaque face y apparaît une fois,", "en vraie grandeur."),
            ("Base carrée : cinq morceaux.", "Triangulaire : quatre.")], fs=28)
        self.add(pa)
        self.au_mot("Un patron est le solide")
        self.montrer_ligne(lignes[0], Indicate(pa, color=JAUNE_TITRE, scale_factor=1.05))
        self.au_mot("Chaque face y apparaît")
        self.montrer_ligne(lignes[1])
        self.au_mot("Une pyramide à base carrée a cinq morceaux")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_deplier()
        self.ecran_compter()
        self.ecran_le_de()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")
