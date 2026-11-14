# aire_carre_rectangle.py
# EleveAI — Maths CM2 — série « Aire », épisode 04 : L'AIRE DU RECTANGLE ET DU CARRÉ (avec des nombres à virgule)
# (micro aire_carre_rectangle, notion aire), AVEC VOIX. Paysage 16:9, CEINTURE VERTE.
# Short jumeau : cm2-aire-carre-rectangle-short (mur 3 × 2,5 = 7,5 m²).
# Décor et métier : Yasmine, INSTALLATRICE DE PANNEAUX SOLAIRES (centres : nature-ecologie, sciences).
# Le CM2, un cran au-dessus du CM1 : longueur × largeur avec un nombre à virgule (2 × 1,5 = 3 m²),
# et les deux côtés dans la MÊME unité (50 cm = 0,5 m).
# Mapping micro → écrans : aire_carre_rectangle = 02 (toit 8 × 5 = 40 m², longueur × largeur),
# 03 (panneau 2 × 1,5 = 3 m² : 2 × 1 + 2 × 0,5), 04 (carré 6 × 6 = 36 m², côté × côté),
# 06 (piège : la même unité, 1 m × 50 cm = 0,5 m²), questions 05 (C : 7 × 4 = 28 m²) et 07 (B : 9 × 9 = 81 cm²),
# défi 08 (40 m² de toit, panneaux de 3 m² : 13 panneaux, 1 m² libre).
# Voix : manim/voix/cm2-aire-carre-rectangle.json (validée le 14/11, Julie, débit −6) ;
# marques : aire_carre_rectangle_marques.json (python manim/scripts/cm2/aire_marques_cm2.py carre-rectangle).
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/cm2/aire_carre_rectangle.py AireCarreRectangleCM2
# python -m manim render -qh --disable_caching manim/scripts/cm2/aire_carre_rectangle.py AireCarreRectangleCM2 -o eleveai-maths-cm2-aire-carre-rectangle --media_dir manim/scripts/cm2/media-aire-04
# Sortie : manim/sorties/cm2/maths/aire/04-carre-rectangle/eleveai-maths-cm2-aire-carre-rectangle.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from aire_cm2_commun import *  # noqa: E402,F403

TUILE_C, TUILE_B = "#ea580c", "#7c2d12"    # le toit de la maison (tuiles)
GARAGE_C, GARAGE_B = "#94a3b8", "#1e293b"  # le toit du garage (tôle grise)
PAN_C, PAN_B = "#1d4ed8", "#bfdbfe"        # un panneau solaire (cellules bleues, cadre clair)
PAN2_C = "#3b82f6"                         # deuxième ton (panneaux voisins)
MUR_C, MUR_B = "#fde68a", "#78350f"        # le mur de la maison (page de garde)


def cote(mob, s, sens=LEFT, fs=30, couleur=JAUNE_TITRE, audit=True):
    """La mesure d'un côté, posée contre la figure ; audit=False : un nombre déjà dit."""
    t = Text(s, font_size=fs, color=couleur, weight=BOLD).next_to(mob, sens, buff=0.18)
    return t if audit else hors_audit(t)


def panneau(w, h, couleur=PAN_C, n_col=None, n_rang=None):
    """Un panneau solaire : le fond bleu, le cadre clair, la grille fine des cellules."""
    n_col = n_col or max(2, round(w / 0.3))
    n_rang = n_rang or max(2, round(h / 0.3))
    fond = Rectangle(width=w, height=h, fill_color=couleur, fill_opacity=1, stroke_color=PAN_B, stroke_width=4)
    traits = VGroup(*[Line(fond.get_corner(UL) + RIGHT * w * k / n_col, fond.get_corner(DL) + RIGHT * w * k / n_col,
                           stroke_color=PAN_B, stroke_width=1.2, stroke_opacity=0.55) for k in range(1, n_col)],
                    *[Line(fond.get_corner(UL) + DOWN * h * k / n_rang, fond.get_corner(UR) + DOWN * h * k / n_rang,
                           stroke_color=PAN_B, stroke_width=1.2, stroke_opacity=0.55) for k in range(1, n_rang)])
    return VGroup(fond, traits)


def toit(n_col=8, n_rang=5, c=0.5, couleur=TUILE_C, bord=TUILE_B):
    return rect_cases(n_col, n_rang, c, couleur, bord)


def maison(s=1.0):
    """La page de garde : une maison vue de côté, trois panneaux sur le toit."""
    mur = Rectangle(width=2.8 * s, height=1.5 * s, fill_color=MUR_C, fill_opacity=1, stroke_color=MUR_B,
                    stroke_width=3)
    porte = Rectangle(width=0.45 * s, height=0.8 * s, fill_color="#92400e", fill_opacity=1, stroke_width=0) \
        .align_to(mur, DOWN).shift(LEFT * 0.6 * s)
    fen = Square(0.45 * s, fill_color="#7dd3fc", fill_opacity=1, stroke_color=WHITE, stroke_width=3) \
        .move_to(mur.get_center() + P(0.6 * s, 0.1 * s))
    haut = mur.get_top()[1]
    t = Polygon(P(-1.75 * s, haut), P(1.75 * s, haut), P(1.05 * s, haut + 1.25 * s), P(-1.05 * s, haut + 1.25 * s),
                fill_color=TUILE_C, fill_opacity=1, stroke_color=TUILE_B, stroke_width=3)
    t.shift(RIGHT * mur.get_x())
    pans = VGroup(*[panneau(0.62 * s, 0.5 * s, n_col=3, n_rang=2) for _ in range(3)]).arrange(RIGHT, buff=0.1 * s)
    pans.move_to(t.get_center())
    soleil = VGroup(Circle(0.32 * s, fill_color="#facc15", fill_opacity=1, stroke_width=0),
                    *[Line(P(0.42 * s * np.cos(a), 0.42 * s * np.sin(a)), P(0.62 * s * np.cos(a), 0.62 * s * np.sin(a)),
                           stroke_color="#facc15", stroke_width=4) for a in np.linspace(0, 2 * PI, 9)[:-1]])
    soleil.move_to(t.get_corner(UR) + P(0.9 * s, 0.45 * s))
    return VGroup(mur, porte, fen, t, pans, soleil)


class AireCarreRectangleCM2(PaysageAireCM2G):
    nom_voix = "cm2-aire-carre-rectangle"
    fichier_marques = "aire_carre_rectangle_marques.json"
    ceinture = "verte"

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("L'aire du rectangle et du carré", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("L'aire du rectangle")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q = self.bloc(["Avec des nombres à virgule :", "combien de mètres carrés", "de panneaux solaires ?"], 36)
        q.move_to(P(0, 0.35)).align_to(P(-6.2, 0), LEFT)
        m = maison(0.95).move_to(P(3.7, 0.35))
        self.au_mot("avec des nombres")
        self.play(FadeIn(m, shift=UP * 0.2), FadeIn(q[0], shift=UP * 0.2), run_time=0.6)
        self.au_mot("Combien")
        self.play(FadeIn(q[1], shift=UP * 0.2), run_time=0.4)
        self.play(FadeIn(q[2], shift=UP * 0.2), Indicate(m[4], color=JAUNE_TITRE, scale_factor=1.15), run_time=0.5)
        self.attendre_voix(marge=0.6)

    # ── 01 : Yasmine, installatrice de panneaux solaires ────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        ya = yasmine(1.0).move_to(P(-4.75, 0.1))
        self.au_mot("Voici Yasmine")
        nom = self.t("Yasmine", 40, BLEU_CALCUL).next_to(ya, UP, buff=0.2)
        self.play(FadeIn(ya, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("installe des panneaux")
        met = self.bloc(["installatrice de", "panneaux solaires"], 24, BLEU_CALCUL).next_to(ya, DOWN, buff=0.18)
        for x in met:
            x.set_x(ya.get_x())
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.35)
        g = toit(8, 5, 0.45).move_to(P(-0.75, 0.75))
        self.au_mot("sur les toits")
        self.play(LaggedStart(*[FadeIn(x, scale=1.3) for x in g], lag_ratio=0.01), run_time=0.6)
        pa = panneau(1.8, 1.35).move_to(P(3.75, 0.75))
        self.au_mot("l'aire du toit")
        q1 = self.t("Aire du toit ?", 30, JAUNE_TITRE).next_to(g, DOWN, buff=0.25)
        self.play(FadeIn(q1, shift=UP * 0.1), Indicate(g, color=JAUNE_TITRE, scale_factor=1.03), run_time=0.45)
        self.au_mot("l'aire d'un panneau")
        q2 = self.t("Aire d'un panneau ?", 30, JAUNE_TITRE).next_to(pa, DOWN, buff=0.25)
        self.play(FadeIn(pa, scale=0.8), FadeIn(q2, shift=UP * 0.1), run_time=0.45)
        self.au_mot("Le toit est")
        self.play(Indicate(g, color=WHITE, scale_factor=1.03), run_time=0.4)
        c8 = cote(g, "8 m", UP)
        self.play(FadeIn(c8, shift=DOWN * 0.1), run_time=0.3)
        r5 = cote(g, "5 m", LEFT)
        self.play(FadeIn(r5, shift=RIGHT * 0.1), run_time=0.3)
        self.attendre_voix()

    # ── 02 : rangées × carrés, longueur × largeur ───────────────────────────
    def ecran_formule(self):
        self.ecran("02-formule")
        g = toit(8, 5, 0.5).move_to(P(-3.4, 0.2))
        self.add(g)
        self.au_mot("Un rectangle de 8")
        c8 = cote(g, "8 m", UP, couleur=CARREAU)
        self.play(FadeIn(c8, shift=DOWN * 0.1), run_time=0.3)
        r5 = cote(g, "5 m", LEFT, couleur=ORANGE_RETENUE)
        self.play(FadeIn(r5, shift=RIGHT * 0.1), run_time=0.3)
        self.au_mot("c'est 5 rangées")
        l1 = self.ligne([("5 rangées", ORANGE_RETENUE), ("de 8 carrés", CARREAU)], 36)
        self.col(l1, 2.6)
        self.play(FadeIn(l1[0], shift=UP * 0.1),
                  LaggedStart(*[Indicate(rangee(g, j, 8), color=ORANGE_RETENUE, scale_factor=1.04) for j in range(5)],
                              lag_ratio=0.25), run_time=0.8)
        self.play(FadeIn(l1[1], shift=UP * 0.1), Indicate(rangee(g, 0, 8), color=CARREAU, scale_factor=1.05),
                  run_time=0.4)
        self.au_mot("de 1 mètre")
        l1b = self.t("1 m de côté chacun", 30, GRAY_B)
        self.col(l1b, 2.0)
        self.play(FadeIn(l1b, shift=UP * 0.1), Indicate(g[0], color=JAUNE_TITRE, scale_factor=1.5), run_time=0.4)
        self.au_mot("8 fois 5")
        l2 = self.ligne([("8 × 5", BLEU_D), ("= 40", VERT_OK)], 50, buff=0.3)
        self.col(l2, 1.1)
        self.play(FadeIn(l2[0], scale=1.2), run_time=0.35)
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("L'aire du toit")
        res = self.gros("40 m²", fs=48)
        self.col(res, -0.1)
        self.play(FadeIn(res, scale=1.2), Indicate(g, color=VERT_OK, scale_factor=1.03), run_time=0.5)
        self.au_mot("Pour un rectangle")
        l3 = self.bloc(["Rectangle :", "longueur × largeur"], 38, JAUNE_TITRE)
        self.col(l3, -1.45)
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("la longueur")
        self.play(FadeIn(l3[1], shift=UP * 0.1), Indicate(c8, scale_factor=1.4), run_time=0.45)
        self.au_mot("la largeur")
        self.play(Indicate(r5, scale_factor=1.4), run_time=0.4)
        self.attendre_voix()

    # ── 03 : un panneau de 2 m sur 1,5 m ────────────────────────────────────
    def panneau_metres(self, u=1.5, pos=P(-3.4, 0.4)):
        """Le panneau de 2 m sur 1,5 m, découpé en mètres : .haut = 2 carrés de 1 m, .bas = 2 demi-bandes de 0,5 m."""
        haut = VGroup(*[panneau(u, u, n_col=4, n_rang=4) for _ in range(2)]).arrange(RIGHT, buff=0)
        bas = VGroup(*[panneau(u, u / 2, PAN2_C, n_col=4, n_rang=2) for _ in range(2)]).arrange(RIGHT, buff=0)
        g = VGroup(haut, bas).arrange(DOWN, buff=0).move_to(pos)
        g.haut, g.bas = haut, bas
        return g

    def ecran_virgule(self):
        self.ecran("03-virgule")
        g = self.panneau_metres()
        self.au_mot("Un panneau")
        self.play(FadeIn(g, scale=0.9), run_time=0.4)
        l1 = self.ligne([("2 m", BLEU_D), ("sur 1,5 m", BLEU_D)], 40)
        self.col(l1, 2.6)
        c2 = cote(g, "2 m", UP)
        c15 = cote(g, "1,5 m", LEFT)
        self.play(FadeIn(l1[0], shift=UP * 0.1), FadeIn(c2), run_time=0.3)
        self.play(FadeIn(l1[1], shift=UP * 0.1), FadeIn(c15), run_time=0.3)
        l2 = self.t("2 × 1,5 :", 44, BLEU_D)
        self.col(l2, 1.85)
        self.play(FadeIn(l2, scale=1.2), run_time=0.35)
        l3 = self.ligne([("2 × 1", BLEU_D), ("= 2", VERT_OK)], 40, buff=0.3)
        self.col(l3, 1.1, self.XL + 0.4)
        e1 = hors_audit(Text("1 m", font_size=26, color=GRAY_B, weight=BOLD)).next_to(g.haut, RIGHT, buff=0.15)
        self.play(FadeIn(l3[0], shift=UP * 0.1), Indicate(g.haut, color=JAUNE_TITRE, scale_factor=1.04), FadeIn(e1),
                  run_time=0.35)
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("5 dixièmes")
        l4a = hors_audit(self.t("2 × 0,5", 40, BLEU_D))
        l4b = self.t("= 1", 40, VERT_OK)
        l4 = VGroup(l4a, l4b).arrange(RIGHT, buff=0.3)
        self.col(l4, 0.35, self.XL + 0.4)
        e2 = hors_audit(Text("0,5 m", font_size=26, color=GRAY_B, weight=BOLD)).next_to(g.bas, RIGHT, buff=0.15)
        self.play(FadeIn(l4a, shift=UP * 0.1), Indicate(g.bas, color=JAUNE_TITRE, scale_factor=1.06), FadeIn(e2),
                  run_time=0.3)
        self.play(FadeIn(l4b, shift=UP * 0.1), run_time=0.3)
        self.au_mot("2 plus 1")
        l5 = self.ligne([("2 + 1", BLEU_D), ("= 3", VERT_OK)], 40, buff=0.3)
        self.col(l5, -0.45)
        self.play(FadeIn(l5[0], shift=UP * 0.1), run_time=0.3)
        self.play(FadeIn(l5[1], shift=UP * 0.1), run_time=0.3)
        res = self.gros("3 m²", fs=46)
        self.col(res, -1.4)
        self.play(FadeIn(res, scale=1.2), Indicate(g, color=VERT_OK, scale_factor=1.03), run_time=0.4)
        self.au_mot("par panneau")
        pp = self.t("par panneau", 34, VERT_OK).next_to(res, RIGHT, buff=0.3)
        self.play(FadeIn(pp, shift=LEFT * 0.1), run_time=0.3)
        self.attendre_voix()

    # ── 04 : le toit du garage, un carré ────────────────────────────────────
    def ecran_carre(self):
        self.ecran("04-carre")
        self.au_mot("Le toit du garage")
        tit = self.t("Le toit du garage", 40, JAUNE_TITRE)
        self.col(tit, 2.65)
        g = toit(6, 6, 0.5, GARAGE_C, GARAGE_B).move_to(P(-3.5, 0.15))
        self.play(Write(tit), LaggedStart(*[FadeIn(x, scale=1.3) for x in g], lag_ratio=0.01), run_time=0.5)
        self.au_mot("un carré de 6")
        l1 = self.t("un carré de 6 m de côté", 34)
        self.col(l1, 1.95)
        c6 = cote(g, "6 m", UP, couleur=CARREAU)
        r6 = cote(g, "6 m", LEFT, couleur=CARREAU, audit=False)
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(c6), run_time=0.35)
        self.play(FadeIn(r6), run_time=0.25)
        self.au_mot("Pour un carré")
        l2 = self.bloc(["Carré :", "côté × côté"], 38, JAUNE_TITRE)
        self.col(l2, 0.95)
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("le côté fois")
        self.play(FadeIn(l2[1], shift=UP * 0.1), Indicate(VGroup(c6, r6), scale_factor=1.4), run_time=0.45)
        self.au_mot("6 fois 6")
        l3 = self.ligne([("6 × 6", BLEU_D), ("= 36", VERT_OK)], 50, buff=0.3)
        self.col(l3, -0.2)
        self.play(FadeIn(l3[0], scale=1.2), run_time=0.35)
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.3)
        res = self.gros("36 m²", fs=48)
        self.col(res, -1.3)
        self.play(FadeIn(res, scale=1.2), Indicate(g, color=VERT_OK, scale_factor=1.03), run_time=0.5)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (réponse C) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        g = rect_cases(7, 4, 0.45, CARREAU, CARREAU_B).move_to(P(-3.6, 1.5))
        c7 = cote(g, "7 m", UP, fs=28, audit=False)
        r4 = cote(g, "4 m", LEFT, fs=28, audit=False)

        def autres_q(sc):
            sc.play(FadeIn(g), FadeIn(c7), FadeIn(r4), run_time=0.35)

        def apres(sc):
            sc.play(g.animate.set_fill(VERT_F), run_time=0.25)

        self.question_gauche("05-question", "05b-reponse",
                             ["Un rectangle mesure", "7 m sur 4 m.", "Quelle est son aire ?"],
                             [self.choix("22 m²"), self.choix("11 m²"), self.choix("28 m²")], 2,
                             ["Longueur × largeur :", "7 × 4 = 28 m².", "22, c'est le périmètre :",
                              "le tour, pas la surface."],
                             0.2, couper={1: ("7 × 4", "= 28 m²."), 2: ("22,", "c'est le périmètre :")}, mot_q="Un rectangle",
                             autres_q=autres_q, autres_r=apres)

    # ── 06 : le piège (la même unité) ───────────────────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        self.au_mot("Attention")
        tit = self.t("Attention au piège !", 46, ROUGE_ERREUR)
        gauche(tit, -6.2, 3.05)
        self.play(Write(tit), run_time=0.35)
        self.au_mot("Les deux côtés")
        l1 = self.bloc(["Les deux côtés :", "dans la même unité !"], 34, JAUNE_TITRE)
        self.col(l1, 2.2)
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("dans la même unité")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.3)
        u = 3.0
        pa = panneau(u, u / 2, n_col=10, n_rang=5).move_to(P(-3.0, 1.15))
        cadre = DashedVMobject(Square(u, stroke_color=GRAY_B, stroke_width=3), num_dashes=40)
        cadre.align_to(pa, UP).align_to(pa, LEFT)
        self.au_mot("Un panneau de 1")
        l2 = self.ligne([("1 m", BLEU_D), ("sur 50 cm", BLEU_D)], 38)
        self.col(l2, 1.15)
        c1 = cote(pa, "1 m", UP)
        r50 = cote(pa, "50 cm", LEFT)
        self.play(FadeIn(pa, scale=0.9), FadeIn(l2[0], shift=UP * 0.1), FadeIn(c1), run_time=0.35)
        self.play(FadeIn(l2[1], shift=UP * 0.1), FadeIn(r50), run_time=0.3)
        self.au_mot("on ne fait pas")
        l3 = self.t("Pas 1 × 50 !", 38, ROUGE_ERREUR)
        self.col(l3, 0.4)
        self.play(FadeIn(l3, shift=UP * 0.1), Indicate(VGroup(c1, r50), color=ROUGE_ERREUR, scale_factor=1.12),
                  run_time=0.4)
        barre = Line(l3.get_left() + LEFT * 0.08, l3.get_right() + RIGHT * 0.08, color=ROUGE_ERREUR, stroke_width=6)
        self.play(Create(barre), run_time=0.2)
        self.au_mot("50 centimètres, c'est")
        l4 = self.ligne([("50 cm", WHITE), ("= 0,5 m", VERT_OK)], 38, buff=0.3)
        self.col(l4, -0.35)
        self.play(FadeIn(l4[0], shift=UP * 0.1), run_time=0.3)
        r05 = hors_audit(Text("0,5 m", font_size=30, color=VERT_OK, weight=BOLD)).next_to(pa, LEFT, buff=0.18)
        self.play(FadeIn(l4[1], shift=UP * 0.1), run_time=0.3)
        self.play(Transform(r50, r05), run_time=0.35)
        self.au_mot("1 fois 0,5")
        l5a = self.t("1 × 0,5", 40, BLEU_D)
        l5b = m2("= 0,5 m²", 40, VERT_OK)
        l5 = VGroup(l5a, l5b).arrange(RIGHT, buff=0.3)
        self.col(l5, -1.2)
        self.play(FadeIn(l5a, shift=UP * 0.1), Create(cadre), run_time=0.4)
        self.au_mot("mètre carré")
        self.play(FadeIn(l5b, shift=UP * 0.1), Indicate(pa, color=VERT_OK, scale_factor=1.04), run_time=0.4)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (réponse B) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        g = rect_cases(9, 9, 0.22, ROSE_D, "#831843").move_to(P(-3.7, 1.45))
        c9 = cote(g, "9 cm", UP, fs=28, audit=False)

        def autres_q(sc):
            sc.play(FadeIn(g), FadeIn(c9), run_time=0.35)

        def apres(sc):
            sc.play(g.animate.set_fill(VERT_F), run_time=0.25)

        self.question_gauche("07-question", "07b-reponse",
                             ["Un carré a 9 cm", "de côté.", "Quelle est son aire ?"],
                             [self.choix("36 cm²"), self.choix("81 cm²"), self.choix("18 cm²")], 1,
                             ["Côté × côté :", "9 × 9 = 81 cm².", "36, c'est le tour", "du carré."],
                             0.1, couper={1: ("9 × 9", "= 81 cm²."), 2: ("36,", "c'est le tour")}, mot_q="Un carré",
                             autres_q=autres_q, autres_r=apres)

    # ── 08 : le défi ────────────────────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        g = toit(8, 5, 0.5).move_to(P(-3.7, 0.75))
        self.au_mot("Sur le toit")
        l1 = self.t("Le toit : 40 m²", 34)
        self.col(l1, 2.2, 0.35)
        self.play(LaggedStart(*[FadeIn(x, scale=1.3) for x in g], lag_ratio=0.01), run_time=0.5)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.35)
        self.au_mot("pose des panneaux")
        pa = panneau(1.0, 0.75).move_to(P(-4.3, -1.45))
        e3 = m2("3 m²", 30, PAN_B).next_to(pa, RIGHT, buff=0.25)
        l2 = self.t("Un panneau : 3 m²", 34, PAN_B)
        self.col(l2, 1.5, 0.35)
        self.play(FadeIn(pa, shift=UP * 0.2), run_time=0.3)
        self.play(FadeIn(l2, shift=UP * 0.1), FadeIn(e3), run_time=0.35)
        self.au_mot("Combien")
        q = self.bloc(["Combien de panneaux", "au plus ?"], 36, JAUNE_TITRE)
        self.col(q, 0.55, 0.35)
        self.play(FadeIn(q, shift=UP * 0.1), Wiggle(pa), run_time=0.5)
        self.au_mot("Et quelle aire")
        q2 = self.bloc(["Quelle aire", "restera libre ?"], 36, JAUNE_TITRE)
        self.col(q2, -0.6, 0.35)
        self.play(FadeIn(q2, shift=UP * 0.1), run_time=0.45)
        self.pause_defi(y=-1.6)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        c = 0.55
        g = toit(8, 5, c).move_to(P(-3.6, 0.55))
        self.add(g)
        self.au_mot("13 panneaux")
        l1 = self.t("13 panneaux :", 34)
        self.col(l1, 2.2, 0.35)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.3)
        l1b = self.ligne([("13 × 3", BLEU_D), ("= 39 m²", VERT_OK)], 40, buff=0.3)
        self.col(l1b, 1.55, 0.35)
        nums = hors_audit(VGroup(*[Text(str(k + 1), font_size=20, color=WHITE, weight=BOLD).move_to(g[3 * k])
                                   for k in range(13)]))
        self.play(FadeIn(l1b[0], shift=UP * 0.1), run_time=0.3)
        self.play(FadeIn(l1b[1], shift=UP * 0.1),
                  LaggedStart(*[q.animate.set_fill(PAN_C if (k // 3) % 2 == 0 else PAN2_C).set_stroke(PAN_B)
                                for k, q in enumerate(g[:39])], lag_ratio=0.02), run_time=0.9)
        self.play(FadeIn(nums), run_time=0.25)
        self.au_mot("14 panneaux")
        l2 = self.t("14 panneaux :", 34)
        self.col(l2, 0.75, 0.35)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.3)
        fois = VGroup(hors_audit(self.t("14 ×", 38, BLEU_D)), hors_audit(self.t("3", 38, BLEU_D))).arrange(RIGHT, buff=0.3)
        l2b = VGroup(fois, self.t("= 42 m²", 38, ROUGE_ERREUR),
                     self.t("trop !", 38, ROUGE_ERREUR)).arrange(RIGHT, buff=0.28)
        l2b[2].align_to(l2b[1], UP)
        self.col(l2b, 0.1, 0.35)
        dehors = VGroup(*[DashedVMobject(Square(c, stroke_color=ROUGE_ERREUR, stroke_width=4), num_dashes=12)
                          for _ in range(2)]).arrange(RIGHT, buff=0).next_to(g[39], RIGHT, buff=0)
        self.play(FadeIn(l2b[0], shift=UP * 0.1), run_time=0.3)
        self.play(FadeIn(l2b[1], shift=UP * 0.1), g[39].animate.set_fill(ROUGE_F), Create(dehors), run_time=0.4)
        self.play(FadeIn(l2b[2], shift=UP * 0.1), Wiggle(dehors), run_time=0.4)
        self.au_mot("Yasmine pose")
        res = self.gros("13 panneaux", fs=40)
        self.col(res, -0.85, 0.35)
        self.play(FadeIn(res, scale=1.2), FadeOut(dehors), g[39].animate.set_fill(TUILE_C), run_time=0.45)
        self.au_mot("il reste 1")
        l3 = self.t("Il reste 1 m² libre.", 34, VERT_OK)
        self.col(l3, -1.75, 0.35)
        self.play(FadeIn(l3, shift=UP * 0.1), Indicate(g[39], color=JAUNE_TITRE, scale_factor=1.5), run_time=0.45)
        self.insister(res, 1.1, 0.25)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        a = toit(5, 3, 0.42)
        b = toit(3, 3, 0.42, GARAGE_C, GARAGE_B)
        fig = VGroup(a, b).arrange(DOWN, buff=0.45)
        lignes = self.finale_gauche(fig, textes=[
            ("Rectangle :", "longueur × largeur."),
            ("Carré :", "côté × côté."),
            ("Les côtés dans la même unité,", "l'aire en unités carrées : m², cm².")], fs=30, xl=-2.9)
        self.add(fig)
        self.au_mot("L'aire du rectangle")
        self.montrer_ligne(lignes[0], Indicate(a, scale_factor=1.05))
        self.au_mot("L'aire du carré")
        self.montrer_ligne(lignes[1], Indicate(b, scale_factor=1.05))
        self.au_mot("Les côtés")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_formule()
        self.ecran_virgule()
        self.ecran_carre()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")
