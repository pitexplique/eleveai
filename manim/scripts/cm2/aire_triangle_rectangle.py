# aire_triangle_rectangle.py
# EleveAI — Maths CM2 — série « Aire », épisode 05 : L'AIRE DU TRIANGLE RECTANGLE
# (micro aire_triangle_rectangle, notion aire), AVEC VOIX. Paysage 16:9, CEINTURE VERTE.
# Short jumeau : cm2-aire-triangle-rectangle-short (toast 10 × 10 coupé en diagonale : 50).
# Décor et métier : Baptiste, CHEF TRAITEUR (centre : cuisine).
# Le CM2, un cran au-dessus du CM1 : le triangle rectangle = la MOITIÉ d'un rectangle,
# aire = (côté × côté de l'angle droit) ÷ 2.
# Mapping micro → écrans : aire_triangle_rectangle = 02 (sandwich 12 × 8 = 96 cm²),
# 03 (la diagonale : deux triangles pareils, on en fait PIVOTER un, il se pose sur l'autre ; 96 ÷ 2 = 48 cm²),
# 04 (la méthode : les deux côtés de l'angle droit = longueur et largeur du rectangle caché ; × puis ÷ 2),
# 06 (piège : pas le côté penché, ne pas oublier ÷ 2), questions 05 (A : 6 × 4 ÷ 2 = 12 cm²)
# et 07 (C : 8 × 5 ÷ 2 = 20 cm²), défi 08 (tarte 30 × 20 = 600, un triangle 300, une petite part 150 cm²).
# Voix : manim/voix/cm2-aire-triangle-rectangle.json (validée le 14/11, Julie, débit −6) ;
# marques : aire_triangle_rectangle_marques.json (python manim/scripts/cm2/aire_marques_cm2.py triangle-rectangle).
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/cm2/aire_triangle_rectangle.py AireTriangleRectangleCM2
# python -m manim render -qh --disable_caching manim/scripts/cm2/aire_triangle_rectangle.py AireTriangleRectangleCM2 -o eleveai-maths-cm2-aire-triangle-rectangle --media_dir manim/scripts/cm2/media-aire-05
# Sortie : manim/sorties/cm2/maths/aire/05-triangle-rectangle/eleveai-maths-cm2-aire-triangle-rectangle.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from aire_cm2_commun import *  # noqa: E402,F403

PAIN_C, PAIN_B = "#fde68a", "#92400e"      # le pain de mie du sandwich (et sa croûte)
TARTE_C, TARTE_B = "#fcd34d", "#b45309"    # la tarte (pâte dorée, bord cuit)
PART_C = "#fdba74"                         # une part sur deux de la tarte (orange pâle)
DROIT_C = VERT_OK                          # les deux côtés de l'angle droit
PENCHE_C = ROUGE_ERREUR                    # le grand côté penché


def cote(mob, s, sens=LEFT, fs=30, couleur=JAUNE_TITRE, audit=True):
    """La mesure d'un côté, posée contre la figure ; audit=False : un nombre déjà dit."""
    t = Text(s, font_size=fs, color=couleur, weight=BOLD).next_to(mob, sens, buff=0.18)
    return t if audit else hors_audit(t)


def equerre(sommet, d1, d2, s=0.28, couleur=WHITE):
    """Le petit carré de l'angle droit, au sommet, le long des directions d1 et d2 (unitaires)."""
    return Polygon(sommet, sommet + d1 * s, sommet + (d1 + d2) * s, sommet + d2 * s, stroke_color=couleur,
                   stroke_width=4, fill_opacity=0)


def tri(a, b, c, couleur=TRIANGLE_C, bord=TRIANGLE_B, sw=0):
    return Polygon(a, b, c, fill_color=couleur, fill_opacity=1, stroke_color=bord, stroke_width=sw)


def centre_de(*pts):
    return sum(pts) / len(pts)


def sandwich(L=12, l=8, u=0.36, pos=ORIGIN, grille=True):
    """Le sandwich rectangulaire L × l (cm), à l'échelle u (une case = 1 cm).
    g.haut : le triangle du haut (angle droit en haut à gauche), g.bas : celui du bas (angle droit en bas à droite),
    g.grille : les traits fins des cm, g.cadre : la croûte. g.coins = (ul, ur, dr, dl), g.o = le centre."""
    w, h = L * u, l * u
    ul, ur, dr, dl = P(-w / 2, h / 2), P(w / 2, h / 2), P(w / 2, -h / 2), P(-w / 2, -h / 2)
    haut = tri(dl, ul, ur, PAIN_C, PAIN_B)
    bas = tri(dl, dr, ur, PAIN_C, PAIN_B)
    traits = VGroup()
    if grille:
        traits.add(*[Line(P(-w / 2 + k * u, -h / 2), P(-w / 2 + k * u, h / 2)) for k in range(1, L)],
                   *[Line(P(-w / 2, -h / 2 + k * u), P(w / 2, -h / 2 + k * u)) for k in range(1, l)])
        traits.set_stroke(PAIN_B, 1.2, opacity=0.35)
    cadre = Rectangle(width=w, height=h, stroke_color=PAIN_B, stroke_width=6, fill_opacity=0)
    g = VGroup(haut, bas, traits, cadre)
    g.haut, g.bas, g.grille, g.cadre = haut, bas, traits, cadre
    g.move_to(pos)
    return g


def coins(g):
    c = g.cadre
    return c.get_corner(UL), c.get_corner(UR), c.get_corner(DR), c.get_corner(DL)


def diagonale(g, couleur=WHITE, sw=5):
    ul, ur, dr, dl = coins(g)
    return DashedLine(dl, ur, color=couleur, stroke_width=sw, dash_length=0.14)


def demi_coupe(g, bas_couleur=TRIANGLE_C, bas_bord=TRIANGLE_B):
    """Le sandwich déjà coupé : la diagonale tracée, le triangle du bas en orange."""
    g.bas.set_fill(bas_couleur, 1)
    d = diagonale(g, bas_bord, 4)
    ul, ur, dr, dl = coins(g)
    eq = equerre(dr, LEFT, UP, 0.26)
    return VGroup(g, d, eq)


def tarte(L=30, l=20, u=0.13, pos=ORIGIN):
    """La tarte rectangulaire coupée par ses DEUX diagonales : 4 parts qui se rejoignent au centre.
    t.parts = (bas, droite, haut, gauche) ; la 1re diagonale (bas-gauche → haut-droite) sépare
    {bas, droite} de {haut, gauche} ; la 2e coupe chaque triangle en 2 parts de même aire."""
    w, h = L * u, l * u
    ul, ur, dr, dl = P(-w / 2, h / 2), P(w / 2, h / 2), P(w / 2, -h / 2), P(-w / 2, -h / 2)
    o = ORIGIN
    parts = VGroup(tri(dl, dr, o, TARTE_C), tri(dr, ur, o, TARTE_C), tri(ur, ul, o, TARTE_C),
                   tri(ul, dl, o, TARTE_C))
    cadre = RoundedRectangle(width=w, height=h, corner_radius=0.08, stroke_color=TARTE_B, stroke_width=10,
                             fill_opacity=0)
    d1 = Line(dl, ur, color=WHITE, stroke_width=5)
    d2 = Line(ul, dr, color=WHITE, stroke_width=5)
    t = VGroup(parts, d1, d2, cadre)
    t.parts, t.d1, t.d2, t.cadre = parts, d1, d2, cadre
    t.move_to(pos)
    return t


class AireTriangleRectangleCM2(PaysageAireCM2G):
    nom_voix = "cm2-aire-triangle-rectangle"
    fichier_marques = "aire_triangle_rectangle_marques.json"
    ceinture = "verte"

    POS = P(-3.2, 0.3)  # le sandwich des écrans 02 et 03

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("L'aire du triangle rectangle", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("L'aire du triangle rectangle")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q = self.bloc(["Combien mesure", "la moitié", "d'un rectangle ?"], 38)
        q.move_to(P(0, 0.3)).align_to(P(-6.2, 0), LEFT)
        g = sandwich(12, 8, 0.27, P(3.3, 0.35))
        fig = demi_coupe(g)
        self.au_mot("Combien mesure")
        self.play(FadeIn(q[0], shift=UP * 0.2), FadeIn(g, shift=UP * 0.2), run_time=0.5)
        self.au_mot("la moitié")
        self.play(FadeIn(q[1], shift=UP * 0.2), Create(fig[1]), run_time=0.45)
        self.au_mot("d'un rectangle")
        self.play(FadeIn(q[2], shift=UP * 0.2), Create(fig[2]), Indicate(g.bas, color=TRIANGLE_C, scale_factor=1.06),
                  run_time=0.5)
        self.attendre_voix(marge=0.6)

    # ── 01 : Baptiste, chef traiteur ────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        ba = baptiste(1.0).move_to(P(-5.3, 0.1))
        self.au_mot("Voici Baptiste")
        nom = self.t("Baptiste", 40, BLEU_CALCUL).next_to(ba, UP, buff=0.2)
        self.play(FadeIn(ba, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("chef traiteur")
        met = self.t("chef traiteur", 30, BLEU_CALCUL).next_to(ba, DOWN, buff=0.18)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.35)
        g = sandwich(12, 8, 0.3, P(0.4, 0.75))
        self.au_mot("des sandwichs rectangulaires")
        lb = self.t("un sandwich rectangulaire", 28, GRAY_B).next_to(g, DOWN, buff=0.3)
        self.play(FadeIn(g, scale=0.8), FadeIn(lb), run_time=0.5)
        self.au_mot("la diagonale")
        d = diagonale(g, WHITE, 6)
        self.play(Create(d), run_time=0.6)
        self.au_mot("deux triangles rectangles")
        ul, ur, dr, dl = coins(g)
        eq_h = equerre(ul, RIGHT, DOWN, 0.26)
        eq_b = equerre(dr, LEFT, UP, 0.26)
        haut = VGroup(g.haut, eq_h)
        bas = VGroup(g.bas, eq_b)
        self.play(FadeOut(g.grille), FadeOut(g.cadre), FadeOut(d),
                  g.haut.animate.set_stroke(PAIN_B, 5), g.bas.animate.set_stroke(TRIANGLE_B, 5).set_fill(TRIANGLE_C),
                  run_time=0.35)
        self.play(haut.animate.shift(P(-0.25, 0.2)), bas.animate.shift(P(0.25, -0.2)), FadeIn(eq_h), FadeIn(eq_b),
                  lb.animate.shift(DOWN * 0.2), run_time=0.5)
        lb2 = self.t("deux triangles rectangles", 28, TRIANGLE_C).move_to(lb)
        self.play(FadeTransform(lb, lb2), run_time=0.35)
        self.au_mot("Quelle est l'aire")
        q = self.t("Quelle est l'aire de chaque triangle ?", 38, JAUNE_TITRE).move_to(P(-0.6, -2.55))
        self.play(FadeIn(q, shift=UP * 0.15), Indicate(bas, color=JAUNE_TITRE, scale_factor=1.05), run_time=0.45)
        self.attendre_voix()

    # ── 02 : le rectangle entier (12 × 8 = 96 cm²) ──────────────────────────
    def ecran_rectangle(self):
        self.ecran("02-rectangle")
        g = sandwich(pos=self.POS)
        self.add(g)
        self.au_mot("Le sandwich est un rectangle")
        l0 = self.t("Le sandwich : un rectangle", 34)
        self.col(l0, 2.6)
        self.play(FadeIn(l0, shift=UP * 0.1), Indicate(g.cadre, color=JAUNE_TITRE, scale_factor=1.03), run_time=0.4)
        l1 = self.ligne([("12 cm", BLEU_D), ("sur 8 cm", BLEU_D)], 40)
        self.col(l1, 1.85)
        c12 = cote(g, "12 cm", UP)
        c8 = cote(g, "8 cm", LEFT)
        self.au_mot("de 12 centimètres")
        self.play(FadeIn(l1[0], shift=UP * 0.1), FadeIn(c12, shift=DOWN * 0.1), run_time=0.3)
        self.au_mot("sur 8 centimètres")
        self.play(FadeIn(l1[1], shift=UP * 0.1), FadeIn(c8, shift=RIGHT * 0.1), run_time=0.3)
        self.au_mot("Son aire")
        l2 = self.t("Son aire :", 34, JAUNE_TITRE)
        self.col(l2, 1.0)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.3)
        l3 = self.ligne([("12 × 8", BLEU_D), ("= 96", VERT_OK)], 50, buff=0.3)
        self.col(l3, 0.2)
        self.au_mot("12 fois 8")
        self.play(FadeIn(l3[0], scale=1.2), run_time=0.35)
        self.au_mot("8, 96")
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.3)
        res = self.gros("96 cm²", fs=48)
        self.col(res, -0.9)
        self.play(FadeIn(res, scale=1.2), Indicate(VGroup(g.haut, g.bas), color=VERT_OK, scale_factor=1.03),
                  run_time=0.5)
        self.attendre_voix()

    # ── 03 : la diagonale, deux triangles pareils, la moitié ────────────────
    def ecran_moitie(self):
        self.ecran("03-moitie")
        g = sandwich(pos=self.POS)
        c12 = cote(g, "12 cm", UP, audit=False)
        c8 = cote(g, "8 cm", LEFT, audit=False)
        self.add(g, c12, c8)
        ul, ur, dr, dl = coins(g)
        o = g.cadre.get_center()
        self.au_mot("La diagonale coupe")
        d = diagonale(g, TRIANGLE_B, 5)
        self.play(Create(d), run_time=0.5)
        l1 = self.bloc(["Deux triangles", "exactement pareils !"], 34, JAUNE_TITRE)
        self.col(l1, 2.55)
        self.au_mot("en deux triangles")
        self.play(g.bas.animate.set_fill(TRIANGLE_C), FadeIn(l1[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("exactement pareils")
        copie = g.haut.copy().set_fill(PAIN_C, 0.85).set_stroke(JAUNE_TITRE, 5)
        self.add(copie)
        self.play(FadeIn(l1[1], shift=UP * 0.1), Rotate(copie, PI, about_point=o), run_time=1.1)
        self.play(Indicate(copie, color=JAUNE_TITRE, scale_factor=1.04), run_time=0.45)
        self.play(FadeOut(copie), run_time=0.3)
        l2 = self.bloc(["Un triangle :", "la moitié du rectangle"], 34)
        self.col(l2, 1.3)
        self.au_mot("Chaque triangle")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("la moitié du rectangle")
        self.play(FadeIn(l2[1], shift=UP * 0.1), Indicate(g.bas, color=TRIANGLE_C, scale_factor=1.04), run_time=0.45)
        l3 = self.ligne([("96 ÷ 2", BLEU_D), ("= 48", VERT_OK)], 50, buff=0.3)
        self.col(l3, 0.2)
        self.au_mot("96 divisé par 2")
        self.play(FadeIn(l3[0], scale=1.2), run_time=0.35)
        self.au_mot("par 2, 48")
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.3)
        res = self.gros("48 cm²", fs=48)
        self.col(res, -0.9)
        e48 = m2("48 cm²", 30, "#431407").move_to(centre_de(dl, dr, ur))
        self.play(FadeIn(res, scale=1.2), FadeIn(e48, scale=1.2), run_time=0.5)
        self.insister(res, 1.1, 0.25)
        self.attendre_voix()

    # ── 04 : la méthode ─────────────────────────────────────────────────────
    def ecran_methode(self):
        self.ecran("04-methode")
        g = sandwich(pos=self.POS, grille=False)
        ul, ur, dr, dl = coins(g)
        t = g.bas.set_fill(TRIANGLE_C).set_stroke(TRIANGLE_B, 4)
        self.add(t)
        self.au_mot("un angle droit")
        l1 = self.t("Un angle droit", 36, JAUNE_TITRE)
        self.col(l1, 2.65)
        eq = equerre(dr, LEFT, UP, 0.32, JAUNE_TITRE)
        self.play(FadeIn(l1, shift=UP * 0.1), Create(eq), run_time=0.45)
        self.play(Indicate(eq, color=JAUNE_TITRE, scale_factor=1.6), run_time=0.45)
        self.au_mot("Les deux côtés de l'angle droit")
        l2 = self.bloc(["Les deux côtés", "de l'angle droit :"], 34, DROIT_C)
        self.col(l2, 1.75)
        base = Line(dl, dr, color=DROIT_C, stroke_width=10)
        haut = Line(dr, ur, color=DROIT_C, stroke_width=10)
        self.play(FadeIn(l2, shift=UP * 0.1), Create(base), Create(haut), run_time=0.5)
        l3 = self.bloc(["la longueur et la largeur", "du rectangle caché"], 32)
        self.col(l3, 0.6)
        self.au_mot("la longueur")
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.3)
        e_l = self.t("longueur", 28, DROIT_C).next_to(base, DOWN, buff=0.18)
        self.play(FadeIn(e_l, shift=UP * 0.1), Indicate(base, color=DROIT_C, scale_factor=1.05), run_time=0.35)
        self.au_mot("la largeur")
        e_w = self.t("largeur", 28, DROIT_C).next_to(haut, RIGHT, buff=0.18)
        self.play(FadeIn(e_w, shift=LEFT * 0.1), Indicate(haut, color=DROIT_C, scale_factor=1.05), run_time=0.35)
        self.au_mot("du rectangle caché")
        cache = DashedVMobject(Polygon(dl, ul, ur, stroke_color=GRAY_B, stroke_width=4), num_dashes=46)
        self.play(FadeIn(l3[1], shift=UP * 0.1), Create(cache), run_time=0.6)
        self.au_mot("La méthode")
        l4 = self.t("La méthode :", 36, JAUNE_TITRE)
        self.col(l4, -0.4)
        self.play(FadeIn(l4, shift=UP * 0.1), run_time=0.3)
        l5 = self.ligne([("(côté × côté)", BLEU_D), ("÷ 2", VERT_OK)], 42, buff=0.25)
        self.col(l5, -1.15)
        self.au_mot("on multiplie ces deux côtés")
        self.play(FadeIn(l5[0], shift=UP * 0.1), Indicate(VGroup(base, haut), color=DROIT_C, scale_factor=1.04),
                  run_time=0.45)
        self.au_mot("on divise par 2")
        self.play(FadeIn(l5[1], shift=UP * 0.1), FadeOut(cache), run_time=0.35)
        self.insister(l5, 1.1, 0.25)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (réponse A) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        u = 0.5
        o = P(-3.6, 1.45)
        ul, ur, dl = o + P(-3 * u, 2 * u), o + P(3 * u, 2 * u), o + P(-3 * u, -2 * u)
        dr = o + P(3 * u, -2 * u)
        t = tri(ul, ur, dl, TRIANGLE_C, TRIANGLE_B, 4)
        eq = equerre(ul, RIGHT, DOWN, 0.26)
        c6 = cote(Line(ul, ur), "6 cm", UP, fs=28, audit=False)
        c4 = cote(Line(ul, dl), "4 cm", LEFT, fs=28, audit=False)
        cache = DashedVMobject(Polygon(ur, dr, dl, stroke_color=GRAY_B, stroke_width=4), num_dashes=36)

        def autres_q(sc):
            sc.play(FadeIn(t), FadeIn(eq), FadeIn(c6), FadeIn(c4), run_time=0.35)

        def apres(sc):
            sc.rep(0)
            sc.rep(1, avec=[Create(cache)])
            sc.rep_fin()

        self.question_gauche("05-question", "05b-reponse",
                             ["Les deux côtés de l'angle droit", "d'un triangle rectangle", "mesurent 6 cm et 4 cm.",
                              "Quelle est son aire ?"],
                             [self.choix("12 cm²"), self.choix("24 cm²"), self.choix("10 cm²")], 0,
                             ["6 × 4 = 24 :", "c'est le rectangle entier.", "Le triangle en est la moitié :",
                              "24 ÷ 2 = 12 cm²."],
                             0.2, couper={0: ("6 × 4", "= 24 :"), 3: ("24 ÷ 2", "= 12 cm².")}, mot_q="Les deux côtés",
                             autres_q=autres_q, autres_r=apres)

    # ── 06 : le piège (le côté penché, l'oubli du ÷ 2) ──────────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        self.au_mot("Attention")
        tit = self.t("Attention au piège !", 46, ROUGE_ERREUR)
        gauche(tit, -6.2, 3.05)
        self.play(Write(tit), run_time=0.35)
        g = sandwich(12, 8, 0.33, P(-3.3, 0.55), grille=False)
        ul, ur, dr, dl = coins(g)
        t = g.bas.set_fill(TRIANGLE_C).set_stroke(TRIANGLE_B, 4)
        eq = equerre(dr, LEFT, UP, 0.26)
        self.add(t, eq)
        self.au_mot("On prend les deux côtés de l'angle droit")
        l1 = self.bloc(["On prend les deux côtés", "de l'angle droit,"], 34, DROIT_C)
        self.col(l1, 2.0)
        base = Line(dl, dr, color=DROIT_C, stroke_width=10)
        haut = Line(dr, ur, color=DROIT_C, stroke_width=10)
        self.play(FadeIn(l1, shift=UP * 0.1), Create(base), Create(haut), run_time=0.5)
        self.au_mot("le grand côté penché")
        l2 = self.t("pas le grand côté penché !", 32, PENCHE_C)
        self.col(l2, 1.1)
        pen = Line(dl, ur, color=PENCHE_C, stroke_width=10)
        croix = Cross(stroke_color=PENCHE_C, stroke_width=8).scale(0.25).move_to(pen.get_center() + P(-0.25, 0.35))
        self.play(FadeIn(l2, shift=UP * 0.1), Create(pen), run_time=0.45)
        self.play(Create(croix), Wiggle(pen), run_time=0.5)
        l3 = self.bloc(["Et on n'oublie pas", "de diviser par 2 !"], 34, JAUNE_TITRE)
        self.col(l3, 0.1)
        self.au_mot("Et on n'oublie")
        self.play(FadeIn(l3[0], shift=UP * 0.1), FadeOut(croix), pen.animate.set_stroke(TRIANGLE_B, 4), run_time=0.35)
        self.au_mot("de diviser par 2")
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.3)
        l4 = self.bloc(["Sinon, on calcule", "tout le sandwich…"], 32, ROUGE_ERREUR)
        self.col(l4, -0.95)
        self.au_mot("sinon, on calcule")
        self.play(FadeIn(l4[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("tout le sandwich")
        autre = g.haut.set_fill(ROUGE_F, 0.55).set_stroke(ROUGE_ERREUR, 4)
        self.play(FadeIn(l4[1], shift=UP * 0.1), FadeIn(autre), run_time=0.45)
        self.play(Indicate(VGroup(autre, t), color=ROUGE_ERREUR, scale_factor=1.03), run_time=0.45)
        self.au_mot("un seul triangle")
        res = self.t("… au lieu d'un seul triangle !", 34, VERT_OK)
        gauche(res, -6.1, -2.45)
        self.play(FadeIn(res, shift=UP * 0.1), FadeOut(autre), Indicate(t, color=VERT_OK, scale_factor=1.05),
                  run_time=0.5)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (réponse C) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        u = 0.4
        o = P(-3.6, 1.75)
        ul, dl, dr = o + P(-4 * u, 2.5 * u), o + P(-4 * u, -2.5 * u), o + P(4 * u, -2.5 * u)
        ur = o + P(4 * u, 2.5 * u)
        t = tri(ul, dl, dr, TRIANGLE_C, TRIANGLE_B, 4)
        eq = equerre(dl, RIGHT, UP, 0.26)
        c8 = cote(Line(dl, dr), "8 cm", DOWN, fs=28, audit=False)
        c5 = cote(Line(ul, dl), "5 cm", LEFT, fs=28, audit=False)
        cache = DashedVMobject(Polygon(ul, ur, dr, stroke_color=GRAY_B, stroke_width=4), num_dashes=36)

        def autres_q(sc):
            sc.play(FadeIn(t), FadeIn(eq), FadeIn(c8), FadeIn(c5), run_time=0.35)

        def apres(sc):
            sc.rep(0, avec=[Create(cache)])
            sc.rep_fin()

        self.question_gauche("07-question", "07b-reponse",
                             ["Un triangle rectangle a une base", "de 8 cm", "et une hauteur de 5 cm.",
                              "Quelle est son aire ?"],
                             [self.choix("40 cm²"), self.choix("13 cm²"), self.choix("20 cm²")], 2,
                             ["8 × 5 = 40.", "Divisé par 2 :", "20 cm²."],
                             -0.15, couper={0: ("8 × 5", "= 40.")}, mot_q="Un triangle",
                             autres_q=autres_q, autres_r=apres)

    # ── 08 : le défi (la tarte en 4 parts) ──────────────────────────────────
    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        ta = tarte(u=0.12, pos=P(-2.75, 0.35))
        l1 = self.ligne([("Une tarte :", TARTE_C), ("30 cm", BLEU_D), ("sur 20 cm", BLEU_D)], 34)
        self.col(l1, 2.2, 0.35)
        self.au_mot("une grande tarte rectangulaire")
        self.play(FadeIn(ta.parts, scale=0.85), FadeIn(ta.cadre, scale=0.85), FadeIn(l1[0], shift=UP * 0.1),
                  run_time=0.5)
        c30 = cote(ta.cadre, "30 cm", UP, fs=28)
        c20 = cote(ta.cadre, "20 cm", LEFT, fs=28)
        self.au_mot("de 30 centimètres")
        self.play(FadeIn(l1[1], shift=UP * 0.1), FadeIn(c30), run_time=0.3)
        self.au_mot("sur 20 centimètres")
        self.play(FadeIn(l1[2], shift=UP * 0.1), FadeIn(c20), run_time=0.3)
        self.au_mot("en 2 triangles rectangles")
        l2 = self.t("coupée en 2 triangles,", 34)
        self.col(l2, 1.45, 0.35)
        p_bas, p_dr, p_ht, p_ga = ta.parts
        self.play(FadeIn(l2, shift=UP * 0.1), Create(ta.d1), p_bas.animate.set_fill(PART_C),
                  p_dr.animate.set_fill(PART_C), run_time=0.6)
        l3 = self.bloc(["puis chaque triangle", "en 2 parts de même aire."], 34)
        self.col(l3, 0.55, 0.35)
        self.au_mot("puis chaque triangle")
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("en 2 parts de même aire")
        self.play(FadeIn(l3[1], shift=UP * 0.1), Create(ta.d2), p_dr.animate.set_fill(TARTE_C),
                  p_ga.animate.set_fill(PART_C), run_time=0.6)
        q = self.bloc(["Quelle est l'aire", "d'une petite part ?"], 38, JAUNE_TITRE)
        self.col(q, -0.8, 0.35)
        self.au_mot("Quelle est l'aire")
        self.play(FadeIn(q[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("d'une petite part")
        self.play(FadeIn(q[1], shift=UP * 0.1), Indicate(p_bas, color=JAUNE_TITRE, scale_factor=1.08), run_time=0.5)
        self.pause_defi(y=-1.95)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        ta = tarte(u=0.12, pos=P(-2.75, 0.35))
        c30 = cote(ta.cadre, "30 cm", UP, fs=28, audit=False)
        c20 = cote(ta.cadre, "20 cm", LEFT, fs=28, audit=False)
        self.add(ta, c30, c20)
        p_bas, p_dr, p_ht, p_ga = ta.parts
        self.au_mot("La tarte")
        l0 = self.t("La tarte :", 32, TARTE_C)
        self.col(l0, 2.35, 0.35)
        self.play(FadeIn(l0, shift=UP * 0.1), Indicate(ta, color=TARTE_C, scale_factor=1.03), run_time=0.4)
        l1 = self.ligne([("30 × 20", BLEU_D), ("= 600 cm²", VERT_OK)], 38, buff=0.3)
        self.col(l1, 1.8, 0.35)
        self.au_mot("30 fois 20")
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("20, 600")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("Un triangle")
        l2 = self.t("Un triangle :", 32, TRIANGLE_C)
        self.col(l2, 1.05, 0.35)
        self.play(FadeIn(l2, shift=UP * 0.1), p_bas.animate.set_fill(TRIANGLE_C), p_dr.animate.set_fill(TRIANGLE_C),
                  run_time=0.4)
        l3 = self.ligne([("600 ÷ 2", BLEU_D), ("= 300", VERT_OK)], 38, buff=0.3)
        self.col(l3, 0.5, 0.35)
        self.au_mot("600 divisé par 2")
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("par 2, 300")
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("Une petite part")
        l4 = self.t("Une petite part :", 32, VERT_F)
        self.col(l4, -0.25, 0.35)
        self.play(FadeIn(l4, shift=UP * 0.1), p_bas.animate.set_fill(VERT_F), p_dr.animate.set_fill(TARTE_C),
                  run_time=0.4)
        l5 = self.ligne([("300 ÷ 2", BLEU_D), ("= 150 cm²", VERT_OK)], 38, buff=0.3)
        self.col(l5, -0.8, 0.35)
        self.au_mot("300 divisé par 2")
        self.play(FadeIn(l5[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("par 2, 150")
        e150 = m2("150 cm²", 26, "#052e16").move_to(p_bas.get_center() + DOWN * 0.18)
        self.play(FadeIn(l5[1], shift=UP * 0.1), FadeIn(e150, scale=1.2), run_time=0.4)
        self.insister(l5[1], 1.15, 0.25)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        g = sandwich(12, 8, 0.26, ORIGIN, grille=False)
        fig = demi_coupe(g)
        lignes = self.finale_gauche(fig, textes=[
            ("Un triangle rectangle est", "la moitié d'un rectangle."),
            ("Son aire : on multiplie les deux", "côtés de l'angle droit,"),
            ("puis on divise par 2.",)], fs=32)
        self.add(fig)
        self.au_mot("Un triangle rectangle")
        self.montrer_ligne(lignes[0], Indicate(g.bas, color=TRIANGLE_C, scale_factor=1.05))
        self.au_mot("Son aire")
        self.montrer_ligne(lignes[1])
        self.au_mot("on divise par 2")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_rectangle()
        self.ecran_moitie()
        self.ecran_methode()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")
