# 5e_aire_triangle.py
# EleveAI — Maths 5e — série « Aire, volume et conversions » (2e poste), épisode A2 : L'AIRE DU TRIANGLE
# (micro aire_triangle, notion aire_surface), AVEC VOIX. Paysage 16:9, CEINTURE VERTE. ⭐ PILOTE de la série.
# Short jumeau : 5e-aire-triangle-short (le pignon de la cabane, 4 × 3 ÷ 2 = 6 m²).
# Décor et métier : Ibrahim, AGRICULTEUR (matrice 5e aire_surface ; centres nature-ecologie, cuisine).
# Mapping micro → écrans : aire_triangle = 02 (base 8 m, hauteur 5 m, rectangle autour 8 × 5 = 40 m²),
# 03 (la hauteur coupe le rectangle en deux ; chaque morceau du dehors se retourne sur un morceau du triangle :
# le triangle est la moitié, 40 ÷ 2 = 20 m²), 04 (méthode : base × hauteur ÷ 2, la hauteur tombe à angle droit),
# 06 (piège : pas le côté penché, ne pas oublier ÷ 2), questions 05 (B : 10 × 6 ÷ 2 = 30 cm²)
# et 07 (A : 6 × 4 ÷ 2 = 12 cm², le côté de 5 cm ne sert pas), défi 08 (20 m², base 8 → hauteur 5 m ; 80 fleurs).
# Fiche : lib/fiches/maths-5e-aires.tsx (exemple 1 : base 8, hauteur 5 → 20 ; entraînement 10 × 6 ; défi hauteur 5).
# Voix : manim/voix/5e-aire-triangle.json (validée le 15/11, Julie, débit −6) ;
# marques : 5e_aire_triangle_marques.json (python manim/scripts/5e/aire_volume_5e_marques.py aire-triangle).
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/5e/5e_aire_triangle.py AireTriangle5e
# Aperçu : python -m manim render -ql manim/scripts/5e/5e_aire_triangle.py AireTriangle5e -o eleveai-maths-5e-aire-triangle --media_dir manim/scripts/5e/media-5e-aire-triangle
# Sortie finale : manim/sorties/5e/maths/aire/02-triangle/eleveai-maths-5e-aire-triangle.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from aire_volume_5e_commun import *  # noqa: E402,F403

# Le triangle de la leçon : base 8, hauteur 5, le sommet au-dessus du point situé à 3 de A.
BASE, HAUT, XS = 8, 5, 3


def figure_triangle(u=0.55, o=ORIGIN, couleur=TERRE_C, bord=TERRE_B):
    """Le coin de champ : triangle ABC (base AB en bas), H le pied de la hauteur.
    f.tri, f.A, f.B, f.C, f.H ; f.base (le segment AB), f.haut (la hauteur CH, en pointillés)."""
    A, B, C, H = triangle_hb(BASE, HAUT, XS, u, o)
    t = tri(A, B, C, couleur, bord, 5)
    f = VGroup(t)
    f.tri, f.A, f.B, f.C, f.H, f.u = t, A, B, C, H, u
    f.base = Line(A, B, color=BASE_C, stroke_width=9)
    f.haut = DashedLine(C, H, color=HAUTEUR_C, stroke_width=6, dash_length=0.12)
    f.eq = equerre(H, RIGHT, UP, 0.24, HAUTEUR_C)
    return f


def rectangle_autour(f):
    A, B, C = f.A, f.B, f.C
    h = C[1] - A[1]
    return DashedVMobject(Polygon(A, B, B + UP * h, A + UP * h, stroke_color=WHITE, stroke_width=4), num_dashes=60)


class AireTriangle5e(Paysage5e):
    nom_voix = "5e-aire-triangle"
    fichier_marques = "5e_aire_triangle_marques.json"
    ceinture = "verte"

    O = P(-3.4, 0.15)  # le triangle des écrans 02 → 04

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("L'aire du triangle", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("L'aire du triangle")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q = self.bloc(["Comment mesurer", "une surface", "à trois côtés ?"], 38)
        q.move_to(P(0, 0.3)).align_to(P(-6.2, 0), LEFT)
        f = figure_triangle(0.42, P(3.2, 0.35))
        self.au_mot("Comment mesurer")
        self.play(FadeIn(q[0], shift=UP * 0.2), run_time=0.4)
        self.au_mot("une surface")
        self.play(FadeIn(q[1], shift=UP * 0.2), FadeIn(f.tri, scale=0.8), run_time=0.5)
        self.au_mot("à trois côtés")
        cotes = VGroup(Line(f.A, f.B), Line(f.B, f.C), Line(f.C, f.A)).set_stroke(JAUNE_TITRE, 8)
        self.play(FadeIn(q[2], shift=UP * 0.2), Create(cotes), run_time=0.7)
        self.play(FadeOut(cotes), Indicate(f.tri, color=JAUNE_TITRE, scale_factor=1.05), run_time=0.5)
        self.attendre_voix(marge=0.6)

    # ── 01 : Ibrahim, agriculteur ───────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        ib = ibrahim(1.0).move_to(P(-5.25, 0.1))
        self.au_mot("Voici Ibrahim")
        nom = self.t("Ibrahim", 40, BLEU_CALCUL).next_to(ib, UP, buff=0.25)
        self.play(FadeIn(ib, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("agriculteur")
        met = self.t("agriculteur", 30, BLEU_CALCUL).next_to(ib, DOWN, buff=0.18)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.35)
        # le champ (vert, en rangs) et son coin en triangle (la terre), qui s'appuie sur le côté AC
        u = 0.4
        A, B, C, H = triangle_hb(BASE, HAUT, XS, u, P(2.85, 0.4))
        g, d = -3.4, C[1]
        champ = Polygon(P(g, A[1]), A, C, P(g, d), fill_color=CHAMP_C, fill_opacity=1, stroke_color="#365314",
                        stroke_width=4)
        rangs = VGroup(*[Line(P(g + 0.15, y), P(A[0] + (y - A[1]) / (C[1] - A[1]) * (C[0] - A[0]) - 0.15, y))
                         for y in [A[1] + k * 0.32 for k in range(1, 6)]]).set_stroke("#a3e635", 3, opacity=0.7)
        coin = tri(A, B, C, TERRE_C, TERRE_B, 5)
        self.au_mot("Au bout de son champ")
        lb = self.t("son champ", 28, "#a3e635").next_to(champ, DOWN, buff=0.25).align_to(champ, LEFT)
        self.play(FadeIn(champ, shift=RIGHT * 0.2), Create(rangs), FadeIn(lb), run_time=0.6)
        self.au_mot("un coin en forme de triangle")
        lb2 = self.t("un coin en triangle", 28, TERRE_C).next_to(coin, DOWN, buff=0.25)
        self.play(FadeIn(coin, shift=LEFT * 0.2), FadeIn(lb2), run_time=0.5)
        self.play(Indicate(coin, color=TRI_C, scale_factor=1.06), run_time=0.45)
        self.au_mot("semer des fleurs")
        fl = fleurs(A, B, C, 16)
        lb3 = self.t("des fleurs pour les abeilles", 28, "#f472b6").move_to(P(1.4, 2.35))
        self.play(LaggedStart(*[GrowFromCenter(x) for x in fl], lag_ratio=0.06), FadeIn(lb3), run_time=0.9)
        self.au_mot("Combien de mètres carrés")
        q = self.t("Combien de mètres carrés doit-il semer ?", 36, JAUNE_TITRE).move_to(P(-0.3, -2.6))
        self.play(FadeIn(q, shift=UP * 0.15), Indicate(VGroup(coin, fl), color=JAUNE_TITRE, scale_factor=1.04),
                  run_time=0.5)
        self.attendre_voix()

    # ── 02 : le rectangle autour (8 × 5 = 40 m²) ────────────────────────────
    def ecran_rectangle(self):
        self.ecran("02-rectangle")
        f = figure_triangle(o=self.O)
        self.add(f.tri)
        l1 = self.ligne([("base :", BASE_C), ("8 m", BASE_C)], 38)
        self.col(l1, 2.6)
        c8 = cote(f.base, "8 m", DOWN, couleur=BASE_C)
        self.au_mot("une base de 8 mètres")
        self.play(Create(f.base), FadeIn(l1), FadeIn(c8, shift=UP * 0.1), run_time=0.5)
        l2 = self.ligne([("hauteur :", HAUTEUR_C), ("5 m", HAUTEUR_C)], 38)
        self.col(l2, 1.9)
        c5 = cote(f.haut, "5 m", RIGHT, couleur=HAUTEUR_C, buff=0.12, fond=True)
        self.au_mot("une hauteur de 5 mètres")
        self.play(Create(f.haut), Create(f.eq), FadeIn(l2), FadeIn(c5, shift=LEFT * 0.1), run_time=0.6)
        self.au_mot("trace un rectangle autour")
        r = rectangle_autour(f)
        l3 = self.t("Un rectangle autour :", 34, WHITE)
        self.col(l3, 1.0)
        self.play(Create(r), FadeIn(l3, shift=UP * 0.1), run_time=0.9)
        l4 = self.ligne([("8 m", BLEU_D), ("sur 5 m", BLEU_D)], 38)
        self.col(l4, 0.35)
        self.au_mot("8 mètres sur 5")
        self.play(FadeIn(l4, shift=UP * 0.1), Indicate(r, color=JAUNE_TITRE, scale_factor=1.02), run_time=0.45)
        self.au_mot("Son aire")
        l5 = self.t("Son aire :", 34, JAUNE_TITRE)
        self.col(l5, -0.4)
        self.play(FadeIn(l5, shift=UP * 0.1), run_time=0.3)
        l6 = self.ligne([("8 × 5", BLEU_D), ("= 40", VERT_OK)], 50, buff=0.3)
        self.col(l6, -1.15)
        self.au_mot("8 fois 5")
        self.play(FadeIn(l6[0], scale=1.2), run_time=0.35)
        self.au_mot("5, 40")
        self.play(FadeIn(l6[1], shift=UP * 0.1), run_time=0.3)
        res = self.gros("40 m²", fs=46)
        self.col(res, -2.1)
        fond = Polygon(f.A, f.B, f.B + UP * (f.C[1] - f.A[1]), f.A + UP * (f.C[1] - f.A[1]), fill_color=WHITE,
                       fill_opacity=0.12, stroke_width=0)
        self.play(FadeIn(res, scale=1.2), FadeIn(fond), run_time=0.5)
        self.attendre_voix()

    # ── 03 : la moitié du rectangle (40 ÷ 2 = 20 m²) ────────────────────────
    def ecran_moitie(self):
        self.ecran("03-moitie")
        f = figure_triangle(o=self.O)
        r = rectangle_autour(f)
        c8 = cote(f.base, "8 m", DOWN, couleur=BASE_C, audit=False)
        self.add(f.tri, r, c8)
        A, B, C, H = f.A, f.B, f.C, f.H
        h = UP * (C[1] - A[1])
        dehors_g = tri(A, A + h, C, "#475569", GRAY_B, 3, 0.85)
        dehors_d = tri(B, B + h, C, "#475569", GRAY_B, 3, 0.85)
        self.au_mot("Le triangle prend")
        self.play(FadeIn(dehors_g), FadeIn(dehors_d), Create(f.haut), run_time=0.6)
        l1 = self.bloc(["Le triangle prend exactement", "la moitié du rectangle."], 34, JAUNE_TITRE)
        self.col(l1, 2.45)
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("la moitié du rectangle")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.3)
        # chaque morceau du dehors se retourne sur un morceau du triangle : ils sont pareils
        cg, cd = centre_de(A, H, C, A + h), centre_de(H, B, B + h, C)
        self.play(Rotate(dehors_g.copy().set_fill(JAUNE_TITRE, 0.55), PI, about_point=cg, remover=True),
                  Rotate(dehors_d.copy().set_fill(JAUNE_TITRE, 0.55), PI, about_point=cd, remover=True),
                  run_time=1.6)
        self.play(Indicate(f.tri, color=TRI_C, scale_factor=1.03), run_time=0.45)
        self.au_mot("Son aire")
        l2 = self.t("Son aire :", 34, JAUNE_TITRE)
        self.col(l2, 1.0)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.3)
        l3 = self.ligne([("40 ÷ 2", BLEU_D), ("= 20", VERT_OK)], 50, buff=0.3)
        self.col(l3, 0.2)
        self.au_mot("40 divisé par 2")
        self.play(FadeIn(l3[0], scale=1.2), run_time=0.35)
        self.au_mot("par 2, 20")
        self.play(FadeIn(l3[1], shift=UP * 0.1), FadeOut(dehors_g), FadeOut(dehors_d), run_time=0.35)
        res = self.gros("20 m²", fs=48)
        self.col(res, -0.85)
        e20 = m2("20 m²", 30, "#1c1917").move_to(centre_de(H, B, C) + DOWN * 0.2)
        self.play(FadeIn(res, scale=1.2), FadeIn(e20, scale=1.2), run_time=0.5)
        self.insister(res, 1.1, 0.25)
        self.attendre_voix()

    # ── 04 : la méthode ─────────────────────────────────────────────────────
    def ecran_methode(self):
        self.ecran("04-methode")
        f = figure_triangle(o=self.O)
        self.add(f.tri)
        self.au_mot("La méthode")
        l1 = self.t("La méthode :", 38, JAUNE_TITRE)
        self.col(l1, 2.6)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.3)
        l2 = self.ligne([("base", BASE_C), ("×", WHITE), ("hauteur", HAUTEUR_C), ("÷ 2", VERT_OK)], 42, buff=0.2)
        self.col(l2, 1.75, 0.35)
        self.au_mot("base fois hauteur")
        self.play(FadeIn(l2[0]), FadeIn(l2[1]), FadeIn(l2[2]), Create(f.base), Create(f.haut), run_time=0.5)
        self.au_mot("divisé par 2")
        self.play(FadeIn(l2[3], shift=UP * 0.1), run_time=0.3)
        self.insister(l2, 1.1, 0.25)
        l3 = self.bloc(["La hauteur part du sommet", "et tombe sur la base,"], 34, HAUTEUR_C)
        self.col(l3, 0.55)
        som = Dot(f.C, radius=0.11, color=JAUNE_TITRE)
        self.au_mot("La hauteur part du sommet")
        self.play(FadeIn(l3[0], shift=UP * 0.1), GrowFromCenter(som), run_time=0.4)
        self.play(Flash(som, color=JAUNE_TITRE), run_time=0.4)
        self.au_mot("tombe sur la base")
        trait = Line(f.C, f.H, color=HAUTEUR_C, stroke_width=9)
        self.play(FadeIn(l3[1], shift=UP * 0.1), Create(trait), run_time=0.6)
        l4 = self.t("à angle droit.", 34, HAUTEUR_C)
        self.col(l4, -0.45)
        self.au_mot("à angle droit")
        self.play(FadeIn(l4, shift=UP * 0.1), Create(f.eq), run_time=0.4)
        self.play(Indicate(f.eq, color=HAUTEUR_C, scale_factor=1.8), run_time=0.5)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (réponse B) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        A, B, C, H = triangle_hb(10, 6, 7, 0.3, P(-3.6, 1.55))
        t = tri(A, B, C, TRI_C, TRI_B, 4)
        hh = DashedLine(C, H, color=HAUTEUR_C, stroke_width=5, dash_length=0.1)
        eq = equerre(H, LEFT, UP, 0.2, HAUTEUR_C)
        c10 = cote(Line(A, B), "10 cm", DOWN, fs=28, couleur=BASE_C, audit=False)
        c6 = cote(hh, "6 cm", RIGHT, fs=28, couleur=HAUTEUR_C, audit=False, buff=0.12, fond=True)
        c6.align_to(hh, DOWN).shift(UP * 0.12)

        def autres_q(sc):
            sc.play(FadeIn(t), Create(hh), FadeIn(eq), FadeIn(c10), FadeIn(c6), run_time=0.4)

        def apres(sc):
            r = rectangle_autour(type("F", (), {"A": A, "B": B, "C": C})())
            sc.rep(0, avec=[Create(r)])
            sc.rep_fin()

        self.question_gauche("05-question", "05b-reponse",
                             ["Un triangle a une base de 10 cm", "et une hauteur de 6 cm.", "Quelle est son aire ?"],
                             [self.choix("60 cm²"), self.choix("30 cm²"), self.choix("16 cm²")], 1,
                             ["10 × 6 = 60.", "Divisé par 2 :", "30 cm²."],
                             -0.15, couper={0: ("10 × 6", "= 60.")}, mot_q="Un triangle",
                             avant_q=autres_q, autres_r=apres)

    # ── 06 : le piège (le côté penché, l'oubli du ÷ 2) ──────────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        self.au_mot("Attention")
        tit = self.t("Attention au piège !", 46, ROUGE_ERREUR)
        gauche(tit, -6.2, 3.05)
        self.play(Write(tit), run_time=0.35)
        f = figure_triangle(0.5, P(-3.4, 0.2), TRI_C, TRI_B)
        self.add(f.tri)
        self.au_mot("La hauteur n'est pas le côté penché")
        l1 = self.bloc(["La hauteur n'est pas", "le côté penché !"], 34, PENCHE_C)
        self.col(l1, 2.0)
        pen = Line(f.B, f.C, color=PENCHE_C, stroke_width=10)
        croix = Cross(stroke_color=PENCHE_C, stroke_width=8).scale(0.25).move_to(
            pen.get_center() + P(0.35, 0.3))
        self.play(FadeIn(l1, shift=UP * 0.1), Create(pen), run_time=0.45)
        self.play(Create(croix), Wiggle(pen), run_time=0.5)
        l2 = self.bloc(["Elle tombe tout droit", "sur la base,"], 34, HAUTEUR_C)
        self.col(l2, 0.75)
        self.au_mot("Elle tombe tout droit")
        trait = Line(f.C, f.H, color=HAUTEUR_C, stroke_width=9)
        self.play(FadeIn(l2[0], shift=UP * 0.1), FadeOut(croix), pen.animate.set_stroke(TRI_B, 5),
                  Create(trait), run_time=0.55)
        self.au_mot("sur la base")
        self.play(FadeIn(l2[1], shift=UP * 0.1), Create(f.base), run_time=0.35)
        l3 = self.t("à angle droit.", 34, HAUTEUR_C)
        self.col(l3, -0.05)
        self.au_mot("à angle droit")
        self.play(FadeIn(l3, shift=UP * 0.1), Create(f.eq), run_time=0.35)
        self.play(Indicate(f.eq, color=HAUTEUR_C, scale_factor=1.8), run_time=0.45)
        l4 = self.bloc(["Et on n'oublie pas", "de diviser par 2 !"], 36, JAUNE_TITRE)
        self.col(l4, -1.2)
        self.au_mot("Et on n'oublie pas")
        self.play(FadeIn(l4[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("de diviser par 2")
        self.play(FadeIn(l4[1], shift=UP * 0.1), run_time=0.3)
        self.insister(l4[1], 1.12, 0.25)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (réponse A) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        A, B, C, H = triangle_hb(6, 4, 3, 0.42, P(-3.6, 1.6))
        t = tri(A, B, C, TRI_C, TRI_B, 4)
        hh = DashedLine(C, H, color=HAUTEUR_C, stroke_width=5, dash_length=0.1)
        eq = equerre(H, RIGHT, UP, 0.2, HAUTEUR_C)
        c6 = cote(Line(A, B), "6 cm", DOWN, fs=28, couleur=BASE_C, audit=False)
        c5 = cote(Line(B, C), "5 cm", RIGHT, fs=28, couleur=PENCHE_C, audit=False, buff=0.05)
        c4 = cote(hh, "4 cm", LEFT, fs=26, couleur=HAUTEUR_C, audit=False, buff=0.1, fond=True)
        c4.align_to(hh, DOWN).shift(UP * 0.12)
        c5.shift(LEFT * 0.25 + UP * 0.1)

        def autres_q(sc):
            sc.play(FadeIn(t), Create(hh), FadeIn(eq), FadeIn(c6), FadeIn(c5), FadeIn(c4), run_time=0.4)

        def apres(sc):
            sc.rep(0, avec=[Indicate(VGroup(c6, c4), color=VERT_OK, scale_factor=1.15)])
            sc.rep(1)
            sc.rep(2)
            sc.rep(3, avec=[c5.animate.set_opacity(0.45)])
            sc.rep_fin()

        self.question_gauche("07-question", "07b-reponse",
                             ["Un triangle a une base de 6 cm,", "un côté penché de 5 cm", "et une hauteur de 4 cm.",
                              "Quelle est son aire ?"],
                             [self.choix("12 cm²"), self.choix("15 cm²"), self.choix("24 cm²")], 0,
                             ["On prend la base et la hauteur :", "6 × 4 = 24.", "Divisé par 2 : 12 cm².",
                              "Le côté de 5 cm ne sert pas."],
                             -0.2, couper={1: ("6 × 4", "= 24."), 2: ("Divisé par 2 :", "12 cm².")},
                             mot_q="Un triangle", avant_q=autres_q, autres_r=apres)

    # ── 08 : le défi (retrouver la hauteur, puis compter les fleurs) ────────
    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        A, B, C, H = triangle_hb(8, 5, 2, 0.48, P(-3.5, 0.45))
        t = tri(A, B, C, TERRE_C, TERRE_B, 5)
        base = Line(A, B, color=BASE_C, stroke_width=9)
        hh = DashedLine(C, H, color=HAUTEUR_C, stroke_width=6, dash_length=0.12)
        point_q = sur_fond(self.t("?", 44, HAUTEUR_C).next_to(hh, LEFT, buff=0.15))
        l1 = self.bloc(["Un autre coin de champ :", "un triangle de 20 m²."], 34)
        self.col(l1, 2.0, 0.35)
        self.au_mot("Un autre coin de champ")
        self.play(FadeIn(t, scale=0.85), FadeIn(l1[0], shift=UP * 0.1), run_time=0.45)
        self.au_mot("un triangle de 20 mètres carrés")
        e20 = self.t("20 m²", 30, "#fef3c7").move_to(centre_de(H, B, C))
        self.play(FadeIn(l1[1], shift=UP * 0.1), FadeIn(e20, scale=1.2), run_time=0.4)
        l2 = self.ligne([("Sa base :", BASE_C), ("8 m.", BASE_C)], 34)
        self.col(l2, 1.2, 0.35)
        c8 = cote(base, "8 m", DOWN, fs=28, couleur=BASE_C)
        self.au_mot("Sa base mesure 8 mètres")
        self.play(FadeIn(l2, shift=UP * 0.1), Create(base), FadeIn(c8), run_time=0.45)
        l3 = self.t("Quelle est sa hauteur ?", 36, HAUTEUR_C)
        self.col(l3, 0.5, 0.35)
        self.au_mot("Quelle est sa hauteur")
        self.play(FadeIn(l3, shift=UP * 0.1), Create(hh), FadeIn(point_q, scale=1.3), run_time=0.5)
        fl = fleurs(A + (B - A) * 0.66, B, B + (C - B) * 0.38, 7, graine=3, r=0.06)
        l4 = self.bloc(["Ibrahim plante 4 fleurs", "par mètre carré :", "combien de fleurs en tout ?"], 34,
                       JAUNE_TITRE)
        self.col(l4, -0.75, 0.35)
        self.au_mot("Et Ibrahim plante")
        self.play(FadeIn(l4[0], shift=UP * 0.1), LaggedStart(*[GrowFromCenter(x) for x in fl], lag_ratio=0.05),
                  run_time=0.6)
        self.au_mot("par mètre carré")
        self.play(FadeIn(l4[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("combien de fleurs en tout")
        self.play(FadeIn(l4[2], shift=UP * 0.1), run_time=0.3)
        self.pause_defi(y=-2.35)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        A, B, C, H = triangle_hb(8, 5, 2, 0.48, P(-3.5, 0.45))
        t = tri(A, B, C, TERRE_C, TERRE_B, 5)
        base = Line(A, B, color=BASE_C, stroke_width=9)
        hh = DashedLine(C, H, color=HAUTEUR_C, stroke_width=6, dash_length=0.12)
        c8 = cote(base, "8 m", DOWN, fs=28, couleur=BASE_C, audit=False)
        e20 = m2("20 m²", 30, "#fef3c7").move_to(centre_de(H, B, C))
        self.add(t, base, hh, c8, e20)
        l1 = self.ligne([("base × hauteur", WHITE), ("= 20 × 2", BLEU_D), ("= 40", VERT_OK)], 34, buff=0.22)
        self.col(l1, 2.3, 0.35)
        self.au_mot("Base fois hauteur égale")
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("20 fois 2")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("2, 40")
        self.play(FadeIn(l1[2], shift=UP * 0.1), run_time=0.3)
        l2 = self.t("Donc la hauteur :", 34, HAUTEUR_C)
        self.col(l2, 1.5, 0.35)
        self.au_mot("Donc la hauteur")
        self.play(FadeIn(l2, shift=UP * 0.1), Indicate(hh, color=HAUTEUR_C, scale_factor=1.05), run_time=0.4)
        l3 = self.ligne([("40 ÷ 8", BLEU_D), ("= 5 m", VERT_OK)], 42, buff=0.3)
        self.col(l3, 0.8, 0.35)
        self.au_mot("40 divisé par 8")
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("par 8, 5 mètres")
        c5 = cote(hh, "5 m", LEFT, fs=30, couleur=HAUTEUR_C, audit=False, buff=0.12, fond=True)
        self.play(FadeIn(l3[1], shift=UP * 0.1), FadeIn(c5, scale=1.2), run_time=0.35)
        self.insister(l3[1], 1.15, 0.25)
        l4 = self.t("Les fleurs :", 34, JAUNE_TITRE)
        self.col(l4, -0.1, 0.35)
        fl = fleurs(A + (B - A) * 0.66, B, B + (C - B) * 0.38, 7, graine=3, r=0.06)
        self.au_mot("Les fleurs")
        self.play(FadeIn(l4, shift=UP * 0.1), LaggedStart(*[GrowFromCenter(x) for x in fl], lag_ratio=0.05),
                  run_time=0.5)
        l5 = self.ligne([("20 × 4", BLEU_D), ("= 80 fleurs", VERT_OK)], 42, buff=0.3)
        self.col(l5, -0.85, 0.35)
        self.au_mot("20 fois 4")
        self.play(FadeIn(l5[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("4, 80 fleurs")
        self.play(FadeIn(l5[1], shift=UP * 0.1), run_time=0.35)
        self.insister(l5[1], 1.15, 0.25)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        f = figure_triangle(0.36, ORIGIN, TRI_C, TRI_B)
        r = rectangle_autour(f)
        fig = VGroup(f.tri, r, f.haut, f.eq)
        lignes = self.finale_gauche(fig, textes=[
            ("Un triangle est la moitié", "d'un rectangle."),
            ("Son aire : base × hauteur,", "divisé par 2."),
            ("La hauteur tombe sur la base", "à angle droit.")], fs=32)
        self.add(fig)
        self.au_mot("Un triangle est la moitié")
        self.montrer_ligne(lignes[0], Indicate(f.tri, color=TRI_C, scale_factor=1.05))
        self.au_mot("Son aire")
        self.montrer_ligne(lignes[1])
        self.au_mot("La hauteur tombe")
        self.montrer_ligne(lignes[2], Indicate(f.eq, color=HAUTEUR_C, scale_factor=1.6))
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
