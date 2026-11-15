# aire_comparer.py
# EleveAI — Maths 6e — série « Aire » (6e-aire), épisode 02 : COMPARER DES AIRES
# (micro aire_comparer, notion aire_surface), AVEC VOIX. Paysage 16:9, CEINTURE VERTE.
# Short jumeau : 6e-aire-comparer-short (parts de gâteau 60 / 49 / 48 : A).
# Décor et métier : Léna, AGENTE IMMOBILIÈRE (centres : argent-budget, construction).
# La 6e, un cran au-dessus du CM2 : on compare en CALCULANT (formes différentes, même aire),
# dans la MÊME unité (2 m² = 200 dm² > 150 dm²), même tour ≠ même aire, l'écart = une soustraction.
# Figures À L'ÉCHELLE dans chaque écran (un carreau bleu ciel = 1 m², le tour en orange).
# Mapping micro → écrans : aire_comparer = 02 (salon A 6 × 4 = 24 m², salon B 5 × 5 = 25 m² : B, de 1 m²),
# 03 (chambres 8 × 3 et 6 × 4 : 24 m² toutes les deux), 04 (placard 2 m² = 200 dm² > cave 150 dm²),
# 06 (piège : couloir 8 × 1, tour 18 m > carré de 4, tour 16 m ; aires 8 m² < 16 m²),
# questions 05 (B : 6 × 3 = 18 > 16 > 8) et 07 (C : 30 − 4 × 7 = 2 m²),
# défi 08 (appartement 1 : 5 × 4 + 3 × 3 = 29 m² ; appartement 2 : 7 × 4 = 28 m² ; le 1 gagne de 1 m²).
# Voix : manim/voix/6e-aire-comparer.json (validée le 15/11, Julie, débit −6) ;
# marques : aire_comparer_marques.json (python manim/scripts/6e/aire_surface_marques.py comparer).
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/6e/aire_comparer.py AireComparer6e
# python -m manim render -qh --disable_caching manim/scripts/6e/aire_comparer.py AireComparer6e -o eleveai-maths-6e-aire-comparer --media_dir manim/scripts/6e/media-aire6-02
# Sortie : manim/sorties/6e/maths/aire/02-comparer/eleveai-maths-6e-aire-comparer.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from aire_6e_commun import *  # noqa: E402,F403

SALA_C, SALA_B = CARREAU, CARREAU_B        # le salon A (et la chambre 1)
SALB_C, SALB_B = ROSE_D, "#831843"          # le salon B (et la chambre 2)
PLAC_C, PLAC_B = "#d6a35c", "#78350f"       # le placard (bois)
CAVE_C, CAVE_B = "#94a3b8", "#1e293b"       # la cave (béton)
AP1_C, AP1_B = CARREAU, CARREAU_B           # l'appartement 1
AP2_C, AP2_B = "#a78bfa", "#3b0764"         # l'appartement 2
SOMBRE = "#0f172a"


def cote(mob, s, sens=LEFT, fs=28, couleur=JAUNE_TITRE, audit=True, buff=0.15):
    """La mesure d'un côté, posée contre la figure ; audit=False : un nombre déjà dit."""
    t = Text(s, font_size=fs, color=couleur, weight=BOLD).next_to(mob, sens, buff=buff)
    return t if audit else hors_audit(t)


def plaque(n_col, n_rang, c, couleur, bord, sw=3):
    """Une figure PLEINE (sans carreaux) de la taille de rect_cases(n_col, n_rang, c)."""
    return Rectangle(width=n_col * c, height=n_rang * c, fill_color=couleur, fill_opacity=1, stroke_color=bord,
                     stroke_width=sw)


def mot_dans(mob, s, fs=24, couleur=SOMBRE):
    """Un mot écrit au milieu d'une pièce (« salon », « chambre »)."""
    return Text(s, font_size=fs, color=couleur, weight=BOLD).move_to(mob)


def lettre(s, couleur, fs=34):
    """La lettre d'une pièce (A, B) ou le numéro d'un appartement, dans un rond."""
    t = Text(s, font_size=fs, color=SOMBRE, weight=BOLD)
    rond = Circle(0.3, fill_color=couleur, fill_opacity=1, stroke_color=WHITE, stroke_width=3)
    return VGroup(rond, t.move_to(rond))


def grille_dm(carre, n=10, couleur=SOMBRE, sw=1.2, op=0.6):
    """Le quadrillage en décimètres d'un mètre carré : n − 1 traits dans chaque sens."""
    c = carre.width / n
    ul = carre.get_corner(UL)
    return VGroup(*[Line(ul + RIGHT * c * k, ul + RIGHT * c * k + DOWN * carre.height, stroke_color=couleur,
                         stroke_width=sw, stroke_opacity=op) for k in range(1, n)],
                  *[Line(ul + DOWN * c * k, ul + DOWN * c * k + RIGHT * carre.width, stroke_color=couleur,
                         stroke_width=sw, stroke_opacity=op) for k in range(1, round(carre.height / c))])


def sans_fond(g):
    """Les carreaux d'une figure, vides (le contour gris seul) : on les remplit à l'aire."""
    for q in g:
        q.set_fill(opacity=0).set_stroke(GRAY_B, 2)
    return g


class AireComparer6e(PaysageAire6eG):
    nom_voix = "6e-aire-comparer"
    fichier_marques = "aire_comparer_marques.json"
    ceinture = "verte"

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Comparer des aires", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Comparer des aires")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q = self.bloc(["Laquelle est", "la plus grande ?", "On calcule,", "on ne devine pas."], 40)
        q[2:].set_color(VERT_OK)
        q.move_to(P(0, 0.2)).align_to(P(-6.2, 0), LEFT)
        c = 0.36
        a = plaque(6, 4, c, SALA_C, SALA_B).move_to(P(3.4, 1.3))
        b = plaque(5, 5, c, SALB_C, SALB_B).move_to(P(3.4, -0.6))
        la, lb = lettre("A", SALA_C).next_to(a, LEFT, buff=0.3), lettre("B", SALB_C).next_to(b, LEFT, buff=0.3)
        qa = hors_audit(Text("?", font_size=44, color=SOMBRE, weight=BOLD)).move_to(a)
        qb = hors_audit(Text("?", font_size=44, color=SOMBRE, weight=BOLD)).move_to(b)
        self.au_mot("Laquelle")
        self.play(FadeIn(q[0], shift=UP * 0.2), FadeIn(a, scale=0.9), FadeIn(la), run_time=0.45)
        self.au_mot("la plus grande")
        self.play(FadeIn(q[1], shift=UP * 0.2), FadeIn(b, scale=0.9), FadeIn(lb), run_time=0.45)
        self.play(FadeIn(qa, scale=1.4), FadeIn(qb, scale=1.4), run_time=0.3)
        self.au_mot("On calcule")
        self.play(FadeIn(q[2], shift=UP * 0.2), run_time=0.35)
        self.au_mot("on ne devine pas")
        self.play(FadeIn(q[3], shift=UP * 0.2), run_time=0.35)
        self.attendre_voix(marge=0.6)

    # ── 01 : Léna, agente immobilière ───────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        le = lena(1.0).move_to(P(-5.3, 0.45))
        self.au_mot("Voici Léna")
        nom = self.t("Léna", 40, BLEU_CALCUL).next_to(le, UP, buff=0.2)
        self.play(FadeIn(le, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("agente immobilière")
        met = self.bloc(["agente", "immobilière"], 26, BLEU_CALCUL).next_to(le, DOWN, buff=0.18)
        for m in met:
            m.set_x(le.get_x())
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.35)
        c = 0.5
        a = plaque(6, 4, c, SALA_C, SALA_B).move_to(P(-1.2, 0.7))
        b = plaque(5, 5, c, SALB_C, SALB_B).move_to(P(2.75, 0.7))
        ta, tb = mot_dans(a, "Salon A", 30), mot_dans(b, "Salon B", 30)
        self.au_mot("deux salons")
        tit = self.t("Deux salons", 38, JAUNE_TITRE).move_to(P(0.8, 2.75))
        self.play(FadeIn(tit, shift=DOWN * 0.1), FadeIn(a, scale=0.9), FadeIn(ta), FadeIn(b, scale=0.9),
                  FadeIn(tb), run_time=0.5)
        self.au_mot("plus long")
        fl = DoubleArrow(a.get_corner(DL) + DOWN * 0.3, a.get_corner(DR) + DOWN * 0.3, buff=0, color=JAUNE_TITRE,
                         stroke_width=5, tip_length=0.2)
        e1 = self.t("plus long", 28, JAUNE_TITRE).next_to(fl, DOWN, buff=0.1)
        self.play(GrowFromCenter(fl), FadeIn(e1), Indicate(a, color=WHITE, scale_factor=1.04), run_time=0.45)
        self.au_mot("plus large")
        fl2 = DoubleArrow(b.get_corner(UR) + RIGHT * 0.3, b.get_corner(DR) + RIGHT * 0.3, buff=0, color=JAUNE_TITRE,
                          stroke_width=5, tip_length=0.2)
        e2 = self.t("plus large", 28, JAUNE_TITRE).next_to(fl2, RIGHT, buff=0.15)
        self.play(GrowFromCenter(fl2), FadeIn(e2), Indicate(b, color=WHITE, scale_factor=1.04), run_time=0.45)
        self.au_mot("Lequel est le plus grand")
        q = self.t("Lequel est le plus grand ?", 38, JAUNE_TITRE).move_to(P(0.8, -2.15))
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.4)
        self.au_mot("Léna ne devine pas")
        r = self.ligne([("Léna ne devine pas :", VERT_OK), ("elle calcule.", VERT_OK)], 32).move_to(P(0.3, -2.85))
        self.play(FadeIn(r[0], shift=UP * 0.15), run_time=0.35)
        self.au_mot("elle calcule")
        self.play(FadeIn(r[1], shift=UP * 0.15), run_time=0.3)
        self.attendre_voix()

    # ── 02 : on calcule (24 m² et 25 m²) ────────────────────────────────────
    def ecran_calculer(self):
        self.ecran("02-calculer")
        c, xl = 0.45, 0.35
        a = rect_cases(6, 4, c, SALA_C, SALA_B).move_to(P(-3.9, 1.55))
        b = rect_cases(5, 5, c, SALB_C, SALB_B).move_to(P(-3.9, -1.0))
        la = lettre("A", SALA_C).next_to(a, RIGHT, buff=0.3)
        lb = lettre("B", SALB_C).next_to(b, RIGHT, buff=0.3)
        self.au_mot("Le salon A")
        l1 = self.ligne([("Salon A :", SALA_C), ("6 m", WHITE), ("sur 4 m", WHITE)], 34)
        self.col(l1, 2.7, xl)
        self.play(FadeIn(l1[0], shift=UP * 0.1), LaggedStart(*[FadeIn(x, scale=1.3) for x in a], lag_ratio=0.01),
                  FadeIn(la), run_time=0.45)
        self.au_mot("mesure 6")
        c6 = cote(a, "6 m", UP, couleur=SALA_C)
        self.play(FadeIn(l1[1], shift=UP * 0.1), FadeIn(c6), run_time=0.3)
        self.au_mot("sur 4")
        c4 = cote(a, "4 m", LEFT, couleur=SALA_C)
        self.play(FadeIn(l1[2], shift=UP * 0.1), FadeIn(c4), run_time=0.3)
        self.au_mot("6 fois 4")
        l2 = self.ligne([("6 × 4", BLEU_D), ("= 24 m²", VERT_OK)], 40, buff=0.3)
        self.col(l2, 2.05, xl)
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("4, 24")
        self.play(FadeIn(l2[1], shift=UP * 0.1), Indicate(a, color=VERT_OK, scale_factor=1.03), run_time=0.4)
        self.au_mot("Le salon B")
        l3 = self.ligne([("Salon B :", SALB_C), ("un carré", WHITE)], 34)
        self.col(l3, 1.35, xl)
        self.play(FadeIn(l3[0], shift=UP * 0.1), LaggedStart(*[FadeIn(x, scale=1.3) for x in b], lag_ratio=0.01),
                  FadeIn(lb), run_time=0.45)
        self.au_mot("un carré")
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.25)
        self.au_mot("carré de 5")
        l4 = self.ligne([("de 5 m", WHITE), ("de côté", WHITE)], 34)
        self.col(l4, 0.8, xl)
        c5 = cote(b, "5 m", LEFT, couleur=SALB_C)
        c5b = cote(b, "5 m", DOWN, couleur=SALB_C, audit=False)
        self.play(FadeIn(l4[0], shift=UP * 0.1), FadeIn(c5), FadeIn(c5b), run_time=0.3)
        self.au_mot("de côté")
        self.play(FadeIn(l4[1], shift=UP * 0.1), run_time=0.25)
        self.au_mot("5 fois 5")
        l5 = self.ligne([("5 × 5", BLEU_D), ("= 25 m²", VERT_OK)], 40, buff=0.3)
        self.col(l5, 0.1, xl)
        self.play(FadeIn(l5[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("5, 25")
        self.play(FadeIn(l5[1], shift=UP * 0.1), Indicate(b, color=VERT_OK, scale_factor=1.03), run_time=0.4)
        self.au_mot("25 est")
        l6a = self.t("25 >", 40, JAUNE_TITRE)
        l6b = self.t("24", 40, JAUNE_TITRE)
        l6 = aligner_base(VGroup(l6a, l6b).arrange(RIGHT, buff=0.2))
        self.col(l6, -0.6, xl)
        self.play(FadeIn(l6a, shift=UP * 0.1), run_time=0.25)
        self.au_mot("que 24")
        self.play(FadeIn(l6b, shift=UP * 0.1), run_time=0.25)
        self.au_mot("gagne, de 1")
        res = self.gros("B gagne, de 1 m² !", fs=38)
        self.col(res, -1.4, xl)
        self.play(FadeIn(res, scale=1.2), b[24].animate.set_fill(JAUNE_TITRE), run_time=0.45)
        self.play(Indicate(b[24], color=JAUNE_TITRE, scale_factor=1.6), run_time=0.45)
        self.attendre_voix()

    # ── 03 : deux formes, la même aire (8 × 3 et 6 × 4) ─────────────────────
    def ecran_meme_aire(self):
        self.ecran("03-meme-aire")
        c, xl = 0.42, 0.35
        r1 = rect_cases(8, 3, c, SALA_C, SALA_B).move_to(P(-3.85, 1.6))
        r2 = rect_cases(6, 4, c, SALB_C, SALB_B).move_to(P(-3.85, -1.05))
        self.au_mot("Deux formes")
        l0 = self.bloc(["Deux formes", "très différentes"], 36, JAUNE_TITRE)
        self.col(l0, 2.6, xl)
        self.play(FadeIn(l0[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("très différentes")
        self.play(FadeIn(l0[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("peuvent avoir")
        l0b = self.ligne([("peuvent avoir", JAUNE_TITRE), ("la même aire.", JAUNE_TITRE)], 34)
        self.col(l0b, 1.55, xl)
        self.play(FadeIn(l0b[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("la même aire")
        self.play(FadeIn(l0b[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("Une chambre")
        l1 = self.ligne([("Une chambre", SALA_C), ("de 8 m", WHITE), ("sur 3 m,", WHITE)], 34)
        self.col(l1, 0.75, xl)
        self.play(FadeIn(l1[0], shift=UP * 0.1), LaggedStart(*[FadeIn(x, scale=1.3) for x in r1], lag_ratio=0.01),
                  run_time=0.3)
        self.au_mot("chambre de 8")
        c8, c3 = cote(r1, "8 m", UP, couleur=SALA_C), cote(r1, "3 m", LEFT, couleur=SALA_C)
        self.play(FadeIn(l1[1], shift=UP * 0.1), FadeIn(c8), run_time=0.25)
        self.au_mot("mètres sur 3")
        self.play(FadeIn(l1[2], shift=UP * 0.1), FadeIn(c3), run_time=0.2)
        self.au_mot("et une")
        l2 = self.ligne([("et une", SALB_C), ("de 6 m", WHITE), ("sur 4 m :", WHITE)], 34)
        self.col(l2, 0.15, xl)
        self.play(FadeIn(l2[0], shift=UP * 0.1), LaggedStart(*[FadeIn(x, scale=1.3) for x in r2], lag_ratio=0.01),
                  run_time=0.3)
        self.au_mot("une de 6")
        c6, c4 = cote(r2, "6 m", UP, couleur=SALB_C), cote(r2, "4 m", LEFT, couleur=SALB_C)
        self.play(FadeIn(l2[1], shift=UP * 0.1), FadeIn(c6), run_time=0.2)
        self.au_mot("mètres sur 4")
        self.play(FadeIn(l2[2], shift=UP * 0.1), FadeIn(c4), run_time=0.2)
        self.au_mot("4 : 24")
        e1 = self.t("24 m²", 34, VERT_OK).next_to(r1, RIGHT, buff=0.25)
        e2 = self.t("24 m²", 34, VERT_OK).next_to(r2, RIGHT, buff=0.25)
        ega = self.t("= 24 m²", 44, VERT_OK)
        self.col(ega, -0.65, xl)
        n1, n2 = numeros(r1, 17, SOMBRE), numeros(r2, 17, SOMBRE)
        self.play(FadeIn(ega, shift=UP * 0.1), FadeIn(e1), FadeIn(e2), run_time=0.3)
        self.play(FadeIn(n1), FadeIn(n2), run_time=0.5)
        self.au_mot("toutes les deux")
        res = self.gros("toutes les deux !", fs=36)
        self.col(res, -1.6, xl)
        self.play(FadeIn(res, scale=1.2), Indicate(r1, color=VERT_OK, scale_factor=1.03),
                  Indicate(r2, color=VERT_OK, scale_factor=1.03), run_time=0.5)
        self.attendre_voix()

    # ── 04 : la même unité (2 m² = 200 dm² > 150 dm²) ───────────────────────
    def ecran_unites(self):
        self.ecran("04-unites")
        u, xl = 1.45, -0.3
        m1 = Square(u, fill_color=PLAC_C, fill_opacity=1, stroke_color=PLAC_B, stroke_width=4)
        m2_ = m1.copy()
        plac = VGroup(m1, m2_).arrange(RIGHT, buff=0).move_to(P(-4.2, 1.6))
        plac.align_to(P(-6.0, 0), LEFT)
        cave = Rectangle(width=1.5 * u, height=u, fill_color=CAVE_C, fill_opacity=1, stroke_color=CAVE_B,
                         stroke_width=4).move_to(P(-4.2, -1.15)).align_to(P(-6.0, 0), LEFT)
        np_ = self.t("Placard", 28, PLAC_C).next_to(plac, UP, buff=0.15)
        nc = self.t("Cave", 28, CAVE_C).next_to(cave, UP, buff=0.15)
        self.au_mot("la même unité")
        l0 = self.t("Il faut la même unité !", 38, JAUNE_TITRE)
        self.col(l0, 2.7, xl)
        self.play(Write(l0), run_time=0.45)
        self.au_mot("placard de 2")
        l1 = self.ligne([("Placard :", PLAC_C), ("2 m²", WHITE)], 36)
        self.col(l1, 2.0, xl)
        e1 = self.t("2 m²", 30, PLAC_C).next_to(plac, DOWN, buff=0.15)
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(plac, scale=0.9), FadeIn(np_), FadeIn(e1), run_time=0.4)
        self.au_mot("cave de 150")
        l2 = self.ligne([("Cave :", CAVE_C), ("150 dm²", WHITE)], 36)
        self.col(l2, 1.4, xl)
        e2 = self.t("150 dm²", 30, CAVE_C).next_to(cave, DOWN, buff=0.15)
        gc = grille_dm(cave)
        self.play(FadeIn(l2, shift=UP * 0.1), FadeIn(cave, scale=0.9), FadeIn(nc), FadeIn(e2), run_time=0.4)
        self.play(Create(gc), run_time=0.5)
        self.au_mot("1 mètre carré")
        l3 = self.ligne([("1 m²", BLEU_D), ("= 100 dm²", VERT_OK)], 40, buff=0.25)
        self.col(l3, 0.65, xl)
        self.play(FadeIn(l3[0], shift=UP * 0.1), Indicate(m1, color=JAUNE_TITRE, scale_factor=1.08), run_time=0.35)
        self.au_mot("c'est 100")
        g1 = grille_dm(m1)
        self.play(FadeIn(l3[1], shift=UP * 0.1), Create(g1), run_time=0.5)
        self.au_mot("font 200")
        l4 = VGroup(hors_audit(self.t("2 m²", 40, BLEU_D)), self.t("= 200 dm²", 40, VERT_OK)).arrange(RIGHT, buff=0.25)
        aligner_base(l4)
        self.col(l4, -0.05, xl)
        g2 = grille_dm(m2_)
        e1b = self.t("200 dm²", 30, PLAC_C).move_to(e1)
        self.play(FadeIn(l4, shift=UP * 0.1), Create(g2), Transform(e1, e1b), run_time=0.5)
        self.au_mot("200 est")
        l5a, l5b = self.t("200 >", 40, JAUNE_TITRE), self.t("150", 40, JAUNE_TITRE)
        l5 = aligner_base(VGroup(l5a, l5b).arrange(RIGHT, buff=0.2))
        self.col(l5, -0.75, xl)
        self.play(FadeIn(l5a, shift=UP * 0.1), run_time=0.25)
        self.au_mot("que 150")
        self.play(FadeIn(l5b, shift=UP * 0.1), run_time=0.25)
        self.au_mot("le placard est plus grand")
        res = self.gros("Le placard est plus grand.", fs=32)
        self.col(res, -1.5, xl)
        self.play(FadeIn(res, scale=1.2), Indicate(VGroup(plac, g1, g2), color=VERT_OK, scale_factor=1.05),
                  run_time=0.5)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (réponse B) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        c = 0.24
        fa = rect_cases(4, 4, c, SALA_C, SALA_B)
        fb = rect_cases(6, 3, c, SALB_C, SALB_B)
        fc = rect_cases(8, 1, c, AP2_C, AP2_B)
        figs = VGroup(fa, fb, fc).arrange(RIGHT, buff=0.75, aligned_edge=DOWN).move_to(P(-3.3, 1.75))
        lets = VGroup(*[lettre(s, f[0].get_fill_color(), 26).scale(0.85).next_to(f, UP, buff=0.15)
                        for s, f in zip("ABC", figs)])
        lets.align_to(lets[0], UP)  # (même hauteur pour les trois)
        for k in (1, 2):
            lets[k].set_y(lets[0].get_y())
        dims = VGroup(*[m2(s, 22, GRAY_B).next_to(f, DOWN, buff=0.15)
                        for s, f in zip(("4 m × 4 m", "6 m × 3 m", "8 m × 1 m"), figs)])
        dims.set_y(dims[0].get_y())
        dims._bloc = True  # (des mesures déjà dites : affichées d'un coup, hors synchro)

        def autres_q(sc):
            sc.play(FadeIn(figs), FadeIn(lets), FadeIn(dims), run_time=0.35)

        def apres(sc):
            sc.rep(0, avec=[Indicate(fa, color=JAUNE_TITRE, scale_factor=1.1)])
            sc.rep(1, avec=[fb.animate.set_fill(VERT_F)])
            sc.rep(2, avec=[Indicate(fc, color=JAUNE_TITRE, scale_factor=1.1)])
            sc.rep_fin()

        self.question_gauche("05-question", "05b-reponse",
                             ["Quelle surface", "est la plus grande ?"],
                             [self.choix("carré de 4 m"), self.choix("6 m sur 3 m"), self.choix("8 m sur 1 m")], 1,
                             ["4 × 4 = 16 m²", "6 × 3 = 18 m²", "8 × 1 = 8 m²", "Le plus long n'est pas",
                              "le plus grand !"],
                             0.3, couper={0: ("4 × 4", "= 16 m²"), 1: ("6 × 3", "= 18 m²"), 2: ("8 × 1", "= 8 m²")},
                             mot_q="Quelle surface", autres_q=autres_q, autres_r=apres)

    # ── 06 : le piège (grand tour ≠ grande aire) ────────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        self.au_mot("Attention")
        tit = self.t("Attention au piège !", 46, ROUGE_ERREUR)
        gauche(tit, -6.2, 3.05)
        self.play(Write(tit), run_time=0.35)
        c, xl = 0.42, 0.3
        co = sans_fond(rect_cases(8, 1, c, SALA_C, SALA_B)).move_to(P(-3.75, 1.55))
        ca = sans_fond(rect_cases(4, 4, c, SALA_C, SALA_B)).move_to(P(-4.65, -0.85))
        self.au_mot("Le plus grand tour")
        l1 = self.bloc(["Le plus grand tour", "n'a pas forcément", "la plus grande aire."], 34, JAUNE_TITRE)
        self.col(l1, 1.85, xl)
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("pas forcément")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("la plus grande aire")
        self.play(FadeIn(l1[2], shift=UP * 0.1), run_time=0.3)
        self.au_mot("Le couloir")
        l2 = self.pile([("Le couloir :", PLINTHE), ("périmètre de 18 m,", PLINTHE)], 32)
        self.col(l2, 0.45, xl)
        self.play(FadeIn(l2[0], shift=UP * 0.1), Create(co), run_time=0.3)
        self.au_mot("couloir de 8")
        c8 = cote(co, "8 m", UP, 26, GRAY_B)
        self.play(FadeIn(c8), run_time=0.2)
        self.au_mot("mètres sur 1")
        c1 = cote(co, "1 m", LEFT, 26, GRAY_B)
        self.play(FadeIn(c1), run_time=0.2)
        self.au_mot("périmètre de 18")
        t1 = contour(co, PLINTHE, 8)
        e18 = self.t("18 m", 28, PLINTHE).next_to(co, DOWN, buff=0.15)
        self.play(FadeIn(l2[1], shift=UP * 0.1), Create(t1), FadeIn(e18), run_time=0.4)
        self.au_mot("plus que le")
        l3 = self.ligne([("plus que le carré", PLINTHE), ("de 4,", PLINTHE)], 32)
        self.col(l3, -0.3, xl)
        c4 = cote(ca, "4 m", LEFT, 26, GRAY_B)
        self.play(FadeIn(l3[0], shift=UP * 0.1), Create(ca), run_time=0.3)
        self.au_mot("carré de 4")
        self.play(FadeIn(l3[1], shift=UP * 0.1), FadeIn(c4), run_time=0.2)
        self.au_mot("en a 16")
        l3b = self.t("qui en a 16 m.", 32, PLINTHE)
        self.col(l3b, -0.85, xl)
        t2 = contour(ca, PLINTHE, 8)
        e16 = self.t("16 m", 28, PLINTHE).next_to(ca, DOWN, buff=0.15)
        self.play(FadeIn(l3b, shift=UP * 0.1), Create(t2), FadeIn(e16), run_time=0.4)
        self.au_mot("son aire")
        r1 = self.ligne([("Son aire :", CARREAU), ("8 m²,", CARREAU)], 34)
        r2 = self.t("contre 16 m²", 34, CARREAU)
        VGroup(r1, r2).arrange(DOWN, aligned_edge=LEFT, buff=0.14)
        self.col(VGroup(r1, r2), -1.7, xl)
        l4 = (r1[0], r1[1], r2)
        self.play(FadeIn(l4[0], shift=UP * 0.1), run_time=0.25)
        self.au_mot("que de 8")
        a8 = self.t("8 m²", 28, CARREAU).next_to(co, RIGHT, buff=0.2)
        self.play(FadeIn(l4[1], shift=UP * 0.1), FadeIn(a8),
                  LaggedStart(*[q.animate.set_fill(SALA_C, 1).set_stroke(SALA_B) for q in co], lag_ratio=0.05),
                  run_time=0.5)
        self.au_mot("contre 16")
        a16 = self.t("16 m²", 28, CARREAU).next_to(ca, RIGHT, buff=0.25)
        self.play(FadeIn(l4[2], shift=UP * 0.1), FadeIn(a16),
                  LaggedStart(*[q.animate.set_fill(SALA_C, 1).set_stroke(SALA_B) for q in ca], lag_ratio=0.03),
                  run_time=0.6)
        self.play(Indicate(VGroup(ca, a16), color=VERT_OK, scale_factor=1.05), run_time=0.45)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (réponse C) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        c = 0.3
        fa = plaque(6, 5, c, SALA_C, SALA_B).move_to(P(-5.25, 1.75))
        ga = rect_cases(6, 5, c, SALA_C, SALA_B).move_to(fa)
        fb = plaque(7, 4, c, SALB_C, SALB_B).move_to(P(-1.95, 1.75)).align_to(fa, DOWN)
        gb = rect_cases(7, 4, c, SALB_C, SALB_B).move_to(fb)
        a30 = m2("30 m²", 30, SOMBRE).move_to(fa)
        c7 = cote(fb, "7 m", UP, 26, SALB_C, audit=False)
        c4 = cote(fb, "4 m", LEFT, 26, SALB_C, audit=False)
        la = lettre("A", SALA_C, 26).scale(0.85).next_to(fa, DOWN, buff=0.15)
        lb = lettre("B", SALB_C, 26).scale(0.85).next_to(fb, DOWN, buff=0.15)

        def autres_q(sc):
            sc.play(FadeIn(fa), FadeIn(a30), FadeIn(la), FadeIn(fb), FadeIn(c7), FadeIn(c4), FadeIn(lb),
                    run_time=0.35)

        def apres(sc):
            sc.rep(0)
            sc.rep(1, avec=[FadeOut(fb), FadeIn(gb)])
            sc.rep(2, avec=[FadeOut(a30), FadeOut(fa), FadeIn(ga), ga[28].animate.set_fill(JAUNE_TITRE),
                            ga[29].animate.set_fill(JAUNE_TITRE)])
            sc.rep_fin()

        self.question_gauche("07-question", "07b-reponse",
                             ["Terrasse A : 30 m².", "Terrasse B : 4 m sur 7 m.", "Quel est l'écart ?"],
                             [self.choix("19 m²"), self.choix("8 m²"), self.choix("2 m²")], 2,
                             ["Terrasse B :", "4 × 7 = 28 m²", "30 − 28 = 2 m²", "d'écart."],
                             0.15, couper={1: ("4 × 7", "= 28 m²"), 2: ("30 − 28", "= 2 m²")},
                             mot_q="Une terrasse A", autres_q=autres_q, autres_r=apres)

    # ── 08 : le défi (deux appartements) ────────────────────────────────────
    def appartements(self, cases=False):
        """Appartement 1 (salon 5 × 4 + chambre 3 × 3) et appartement 2 (séjour 7 × 4), à la même échelle."""
        c = 0.42
        f = (lambda n, m, col, bd: rect_cases(n, m, c, col, bd)) if cases else \
            (lambda n, m, col, bd: plaque(n, m, c, col, bd))
        salon = f(5, 4, AP1_C, AP1_B).move_to(P(-4.3, 1.35))
        ch = f(3, 3, AP1_C, AP1_B).next_to(salon, RIGHT, buff=0).align_to(salon, DOWN)
        sej = f(7, 4, AP2_C, AP2_B).move_to(P(-4.3, -1.35)).align_to(salon, LEFT)
        t1 = lettre("1", AP1_C).next_to(VGroup(salon, ch), RIGHT, buff=0.3)
        t2 = lettre("2", AP2_C).next_to(sej, RIGHT, buff=0.3)
        return salon, ch, sej, t1, t2

    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        salon, ch, sej, t1, t2 = self.appartements()
        ms, mc, mj = mot_dans(salon, "salon", 22), mot_dans(ch, "chambre", 19), mot_dans(sej, "séjour", 22)
        xl = 0.35
        self.au_mot("Appartement 1")
        l1 = self.t("Appartement 1 :", 34, AP1_C)
        self.col(l1, 2.35, xl)
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(t1, scale=0.8), run_time=0.35)
        self.au_mot("salon de 5")
        l2 = self.ligne([("un salon", WHITE), ("de 5 m", WHITE), ("sur 4 m,", WHITE)], 32)
        self.col(l2, 1.8, xl)
        c5 = cote(salon, "5 m", UP, 26, AP1_C)
        self.play(FadeIn(l2[0], shift=UP * 0.1), FadeIn(l2[1], shift=UP * 0.1), FadeIn(salon, scale=0.9),
                  FadeIn(ms), FadeIn(c5), run_time=0.25)
        self.au_mot("mètres sur 4")
        c4 = cote(salon, "4 m", LEFT, 26, AP1_C)
        self.play(FadeIn(l2[2], shift=UP * 0.1), FadeIn(c4), run_time=0.3)
        self.au_mot("chambre carrée")
        l3 = self.ligne([("une chambre carrée", WHITE), ("de 3 m", WHITE)], 32)
        self.col(l3, 1.25, xl)
        self.play(FadeIn(l3[0], shift=UP * 0.1), FadeIn(ch, scale=0.9), FadeIn(mc), run_time=0.35)
        self.au_mot("carrée de 3")
        c3 = cote(ch, "3 m", UP, 26, AP1_C)
        self.play(FadeIn(l3[1], shift=UP * 0.1), FadeIn(c3), run_time=0.3)
        self.au_mot("Appartement 2")
        l4 = self.t("Appartement 2 :", 34, AP2_C)
        self.col(l4, 0.55, xl)
        self.play(FadeIn(l4, shift=UP * 0.1), FadeIn(t2, scale=0.8), run_time=0.35)
        self.au_mot("séjour de 7")
        l5 = self.ligne([("un séjour", WHITE), ("de 7 m", WHITE), ("sur 4 m", WHITE)], 32)
        self.col(l5, 0.0, xl)
        c7 = cote(sej, "7 m", UP, 26, AP2_C)
        self.play(FadeIn(l5[0], shift=UP * 0.1), FadeIn(l5[1], shift=UP * 0.1), FadeIn(sej, scale=0.9),
                  FadeIn(mj), FadeIn(c7), run_time=0.25)
        self.au_mot("7 mètres sur 4")
        c4b = cote(sej, "4 m", LEFT, 26, AP2_C)
        self.play(FadeIn(l5[2], shift=UP * 0.1), FadeIn(c4b), run_time=0.3)
        self.au_mot("Lequel a la plus")
        q = self.bloc(["Lequel a la plus", "grande surface,", "et de combien ?"], 34, JAUNE_TITRE)
        self.col(q, -1.15, xl)
        self.play(FadeIn(q[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("grande surface")
        self.play(FadeIn(q[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("de combien")
        self.play(FadeIn(q[2], shift=UP * 0.1), Wiggle(t1), Wiggle(t2), run_time=0.5)
        # « Mets pause » aligné sur la colonne (centré, il frôlait Ti-Margo)
        self.au_mot("Mets pause")
        pz = self.col(self.t("Mets pause, et cherche !", 27, ORANGE_RETENUE), -2.45, xl)
        self.play(Write(pz), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        salon, ch, sej, t1, t2 = self.appartements(cases=True)
        cot = hors_audit(VGroup(cote(salon, "5 m", UP, 26, AP1_C), cote(salon, "4 m", LEFT, 26, AP1_C),
                                cote(ch, "3 m", UP, 26, AP1_C), cote(sej, "7 m", UP, 26, AP2_C),
                                cote(sej, "4 m", LEFT, 26, AP2_C)))
        for g in (salon, ch, sej):
            sans_fond(g)
        self.add(salon, ch, sej, t1, t2, cot)
        xl = 0.35
        self.au_mot("Appartement 1")
        l1 = self.t("Appartement 1 :", 34, AP1_C)
        self.col(l1, 2.4, xl)
        self.play(FadeIn(l1, shift=UP * 0.1), Indicate(t1, scale_factor=1.2), run_time=0.35)
        self.au_mot("5 fois 4")
        l2 = self.ligne([("5 × 4", BLEU_D), ("= 20", VERT_OK)], 38, buff=0.25)
        self.col(l2, 1.85, xl)
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("4, 20")
        self.play(FadeIn(l2[1], shift=UP * 0.1),
                  LaggedStart(*[q.animate.set_fill(AP1_C, 1).set_stroke(AP1_B) for q in salon], lag_ratio=0.02),
                  run_time=0.5)
        self.au_mot("plus 3 fois 3")
        l3 = self.ligne([("+ 3 × 3", BLEU_D), ("= 9", VERT_OK)], 38, buff=0.25)
        self.col(l3, 1.3, xl)
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("3, 9")
        self.play(FadeIn(l3[1], shift=UP * 0.1),
                  LaggedStart(*[q.animate.set_fill(AP1_C, 1).set_stroke(AP1_B) for q in ch], lag_ratio=0.04),
                  run_time=0.25)
        self.au_mot("9 : 29")
        l4 = self.t("= 29 m²", 40, VERT_OK)
        self.col(l4, 0.7, xl)
        e29 = m2("29 m²", 28, AP1_C).next_to(t1, DOWN, buff=0.15).align_to(t1, LEFT)
        self.play(FadeIn(l4, shift=UP * 0.1), FadeIn(e29), run_time=0.35)
        self.au_mot("Appartement 2")
        l5 = self.t("Appartement 2 :", 34, AP2_C)
        self.col(l5, 0.05, xl)
        self.play(FadeIn(l5, shift=UP * 0.1), Indicate(t2, scale_factor=1.2), run_time=0.35)
        self.au_mot("7 fois 4")
        l6 = self.ligne([("7 × 4", BLEU_D), ("= 28 m²", VERT_OK)], 38, buff=0.25)
        self.col(l6, -0.5, xl)
        self.play(FadeIn(l6[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("4, 28")
        e28 = m2("28 m²", 28, AP2_C).next_to(t2, DOWN, buff=0.15).align_to(t2, LEFT)
        self.play(FadeIn(l6[1], shift=UP * 0.1), FadeIn(e28),
                  LaggedStart(*[q.animate.set_fill(AP2_C, 1).set_stroke(AP2_B) for q in sej], lag_ratio=0.02),
                  run_time=0.5)
        self.au_mot("L'appartement 1 gagne")
        l7 = self.t("L'appartement 1 gagne,", 32, VERT_OK)
        self.col(l7, -1.2, xl)
        self.play(FadeIn(l7, shift=UP * 0.1), Indicate(VGroup(salon, ch), color=VERT_OK, scale_factor=1.04),
                  run_time=0.4)
        self.au_mot("gagne, de 1")
        res = self.gros("de 1 m² !", fs=38)
        self.col(res, -1.95, xl)
        self.play(FadeIn(res, scale=1.2), run_time=0.4)
        self.insister(res, 1.1, 0.25)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        c = 0.38
        co = rect_cases(8, 1, c, SALA_C, SALA_B)
        ca = rect_cases(4, 4, c, SALB_C, SALB_B)
        fig = VGroup(co, ca).arrange(DOWN, buff=0.6)
        t1 = contour(co, PLINTHE, 6)
        lignes = self.finale_gauche(fig, textes=[
            ("Pour comparer des aires :", "on calcule, dans la même unité."),
            ("La forme la plus longue, le plus", "grand tour : rien sur l'aire !"),
            ("L'écart :", "une soustraction.")], fs=32, xl=-2.3)
        t1.move_to(co)
        self.add(fig)
        self.au_mot("Pour comparer")
        self.montrer_ligne(lignes[0], Indicate(VGroup(co, ca), scale_factor=1.04))
        self.au_mot("La forme la plus")
        self.montrer_ligne(lignes[1], Create(t1))
        self.au_mot("Et l'écart")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_calculer()
        self.ecran_meme_aire()
        self.ecran_unites()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")
