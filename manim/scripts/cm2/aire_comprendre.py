# aire_comprendre.py
# EleveAI — Maths CM2 — série « Aire », épisode 01 : COMPRENDRE L'AIRE
# (micro aire_comprendre, notion aire), AVEC VOIX. Paysage 16:9, CEINTURE JAUNE.
# Short jumeau : cm2-aire-comprendre-short (serviettes de plage 3 × 4 / 2 × 6).
# Décor et métier : Elsa, COUTURIÈRE DE PATCHWORK (centres : art-design, mode).
# Le CM2, un cran au-dessus du CM1 : les DEMI-CARRÉS (2 demis = 1 carré) et AIRE ≠ PÉRIMÈTRE
# (3 × 4 et 2 × 6 : même aire 12, tours 14 et 16).
# Mapping micro → écrans : aire_comprendre = 02 (le carré-unité, même aire / formes différentes),
# 03 (le demi-carré), 04 (aire et périmètre), 06 (piège : un plus grand tour ≠ une plus grande aire),
# questions 05 (A : la mesure de la surface) et 07 (C : 6 carrés + 4 demis = 8), défi 08 (4 × 5 = 20, galon 18).
# Voix : manim/voix/cm2-aire-comprendre.json (validée le 14/11, Julie, débit −6) ;
# marques : aire_comprendre_marques.json (python manim/scripts/cm2/aire_marques_cm2.py comprendre).
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/cm2/aire_comprendre.py AireComprendreCM2
# python -m manim render -qh --disable_caching manim/scripts/cm2/aire_comprendre.py AireComprendreCM2 -o eleveai-maths-cm2-aire-comprendre --media_dir manim/scripts/cm2/media-aire-01
# Sortie : manim/sorties/cm2/maths/aire/01-comprendre/eleveai-maths-cm2-aire-comprendre.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from aire_cm2_commun import *  # noqa: E402,F403

BLEU1, BLEU2, BLEU_B = "#60a5fa", "#93c5fd", "#1e3a8a"     # la couverture bleue (patchwork)
ROUGE1, ROUGE2, ROUGE_B = "#f87171", "#fecaca", "#7f1d1d"  # la couverture rouge
TRI1, TRI2 = TRIANGLE_C, "#fdba74"                          # les demi-carrés (deux oranges)
GALON = "#22c55e"                                           # le galon vert (le tour du défi)


def case_tissu(c, couleur, bord):
    """Un carré de tissu : le carré + une couture en pointillés à l'intérieur."""
    sq = Square(c, fill_color=couleur, fill_opacity=1, stroke_color=bord, stroke_width=2.5)
    cou = DashedVMobject(Square(c * 0.74, stroke_color=WHITE, stroke_width=1.6, stroke_opacity=0.6),
                         num_dashes=16)
    return VGroup(sq, cou)


def patch(n_col, n_rang, c=0.55, c1=BLEU1, c2=BLEU2, bord=BLEU_B):
    """Une couverture en patchwork : n_rang rangées de n_col carrés, deux tons en damier.
    Rangée par rangée (g[j * n_col + i])."""
    g = VGroup()
    for j in range(n_rang):
        for i in range(n_col):
            g.add(case_tissu(c, c1 if (i + j) % 2 == 0 else c2, bord).move_to(P(i * c, -j * c)))
    return g.move_to(ORIGIN)


def bleue(c=0.55):
    return patch(4, 3, c)


def rouge(c=0.55):
    return patch(6, 2, c, ROUGE1, ROUGE2, ROUGE_B)


def demis(c=0.55, centre=ORIGIN, c1=TRI1, c2=TRI2, bord=TRIANGLE_B):
    """Un carré coupé selon sa diagonale : (le triangle du haut, le triangle du bas)."""
    h = c / 2
    ul, ur, dr, dl = centre + P(-h, h), centre + P(h, h), centre + P(h, -h), centre + P(-h, -h)
    haut = Polygon(ul, ur, dr, fill_color=c1, fill_opacity=1, stroke_color=bord, stroke_width=2.5)
    bas = Polygon(ul, dr, dl, fill_color=c2, fill_opacity=1, stroke_color=bord, stroke_width=2.5)
    return VGroup(haut, bas)


def tour(g, couleur=PLINTHE, sw=9):
    return contour(g, couleur, sw)


def cote(mob, s, sens=LEFT, fs=30, couleur=JAUNE_TITRE):
    """Une longueur écrite contre la figure (posée à son mot)."""
    return Text(s, font_size=fs, color=couleur, weight=BOLD).next_to(mob, sens, buff=0.18)


def tissus(c=0.5):
    """Une pile de carrés de tissu (le stock d'Elsa)."""
    cols = [BLEU1, ROUGE1, "#facc15", "#a78bfa", BLEU2]
    return VGroup(*[case_tissu(c, cols[k], "#334155").move_to(P(0.07 * k, 0.07 * k)) for k in range(5)])


class AireComprendreBase(LigneAlignee, PaysageAireCM2G):
    nom_voix = "cm2-aire-comprendre"
    fichier_marques = "aire_comprendre_marques.json"
    ceinture = "jaune"

    def _carte_choix(self, lettre, txt, largeur, fs):
        """La carte d'un choix, avec la place de la coche au bout (sinon elle colle à « surface »)."""
        c = super()._carte_choix(lettre, txt, largeur, fs)
        cadre, ligne = c
        if ligne.width > largeur - 1.0:
            ligne.scale_to_fit_width(largeur - 1.0).align_to(cadre.get_left() + RIGHT * 0.2, LEFT)
        return c

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Comprendre l'aire", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Comprendre")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q = self.bloc(["Comment mesurer", "la place que prend", "une surface ?"], 38)
        q.move_to(P(0, 0.3)).align_to(P(-6.2, 0), LEFT)
        g = bleue(0.55).move_to(P(3.3, 0.4))
        self.au_mot("Comment")
        self.play(FadeIn(q[0], shift=UP * 0.2), run_time=0.35)
        self.play(FadeIn(q[1], shift=UP * 0.2), run_time=0.35)
        self.au_mot("surface")
        self.play(FadeIn(q[2], shift=UP * 0.2), LaggedStart(*[FadeIn(x, scale=1.6) for x in g], lag_ratio=0.08),
                  run_time=1.0)
        self.attendre_voix(marge=0.6)

    # ── 01 : Elsa, couturière de patchwork ──────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        el = elsa(1.0).move_to(P(-5.3, 0.3))
        self.au_mot("Voici Elsa")
        nom = self.t("Elsa", 42, BLEU_CALCUL).next_to(el, UP, buff=0.2)
        self.play(FadeIn(el, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("couturière")
        met = self.t("couturière", 32, BLEU_CALCUL).next_to(el, DOWN, buff=0.18)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.35)
        pile = tissus(0.6).move_to(P(-2.9, 0.7))
        self.au_mot("carrés de tissu")
        tp = self.bloc(["carrés", "de tissu"], 26, GRAY_B).next_to(pile, DOWN, buff=0.2)
        self.play(LaggedStart(*[FadeIn(x, shift=DOWN * 0.3) for x in pile], lag_ratio=0.15), FadeIn(tp),
                  run_time=0.6)
        b, r = bleue(0.5).move_to(P(0.6, 0.9)), rouge(0.5).move_to(P(3.9, 0.9))
        self.au_mot("Deux clients")
        self.play(LaggedStart(*[FadeIn(x, scale=1.3) for x in b], lag_ratio=0.04), run_time=0.6)
        self.au_mot("formes différentes")
        self.play(LaggedStart(*[FadeIn(x, scale=1.3) for x in r], lag_ratio=0.04), run_time=0.6)
        self.au_mot("Laquelle")
        q = self.t("Laquelle demande le plus de tissu ?", 38, JAUNE_TITRE).move_to(P(-0.6, -2.55))
        self.play(FadeIn(q, shift=UP * 0.15), Wiggle(VGroup(b, r)), run_time=0.6)
        self.attendre_voix()

    # ── 02 : le carré-unité ; même aire, formes différentes ─────────────────
    def ecran_carreaux(self):
        self.ecran("02-carreaux")
        b, r = bleue(0.6).move_to(P(-4.1, 1.6)), rouge(0.6).move_to(P(-3.5, -0.9))
        self.add(b, r)
        self.au_mot("L'aire")
        l0 = self.pile([("L'aire, c'est la mesure", WHITE), ("d'une surface.", VERT_OK)], 34)
        self.col(l0, 2.7)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.4)
        self.au_mot("On la mesure")
        l1 = self.bloc(["On la mesure avec", "un carré-unité :"], 32)
        self.col(l1, 1.55)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.4)
        u = case_tissu(0.95, BLEU1, BLEU_B).move_to(P(-1.5, 1.75))
        tu = self.bloc(["un carré", "de tissu"], 24, GRAY_B).next_to(u, DOWN, buff=0.15)
        self.au_mot("un carré de tissu")
        self.play(TransformFromCopy(b[0], u), Indicate(b[0], color=JAUNE_TITRE, scale_factor=1.3), run_time=0.5)
        self.play(FadeIn(tu), run_time=0.3)
        self.au_mot("La couverture bleue")
        l2 = self.ligne([("Bleue :", BLEU1), ("3 rangées", WHITE), ("de 4", WHITE)], 32)
        self.col(l2, 0.6)
        self.play(FadeIn(l2, shift=UP * 0.1), Indicate(b, color=BLEU1, scale_factor=1.04), run_time=0.4)
        nb = numeros(b, 22, "#0f172a")
        self.play(LaggedStart(*[FadeIn(n, scale=1.4) for n in nb], lag_ratio=0.06), run_time=0.7)
        l3 = self.t("12 carrés", 34, VERT_OK)
        self.col(l3, 0.05, 1.6)
        self.au_mot("12 carrés.")
        self.play(FadeIn(l3, scale=1.2), run_time=0.3)
        self.au_mot("La rouge")
        l4 = self.ligne([("Rouge :", ROUGE1), ("2 rangées", WHITE), ("de 6", WHITE)], 32)
        self.col(l4, -0.6)
        self.play(FadeIn(l4, shift=UP * 0.1), Indicate(r, color=ROUGE1, scale_factor=1.04), run_time=0.4)
        nr = numeros(r, 22, "#0f172a")
        self.play(LaggedStart(*[FadeIn(n, scale=1.4) for n in nr], lag_ratio=0.06), run_time=0.7)
        l5 = self.t("12 carrés aussi !", 34, VERT_OK)
        self.col(l5, -1.15, 1.6)
        self.au_mot("12 carrés aussi")
        self.play(FadeIn(l5, scale=1.2), run_time=0.3)
        self.au_mot("Même aire")
        res = self.gros("Même aire, formes différentes !", fs=32)
        gauche(res, -6.1, -2.65)
        self.play(FadeIn(res, scale=1.1), run_time=0.45)
        self.attendre_voix()

    # ── 03 : le demi-carré ──────────────────────────────────────────────────
    def ecran_demi(self):
        self.ecran("03-demi")
        c = 1.4
        centre = P(-4.3, 1.75)
        sq = Square(c, fill_color=TRI1, fill_opacity=1, stroke_color=TRIANGLE_B, stroke_width=3).move_to(centre)
        self.au_mot("coupe un carré")
        self.play(FadeIn(sq, scale=0.8), run_time=0.35)
        diag = DashedLine(sq.get_corner(UL), sq.get_corner(DR), color=WHITE, stroke_width=5, dash_length=0.12)
        self.au_mot("suivant")
        l1 = self.t("Suivant la diagonale :", 34)
        self.col(l1, 2.75)
        self.play(Create(diag), FadeIn(l1, shift=UP * 0.1), run_time=0.5)
        tr = demis(c, centre)
        self.au_mot("elle obtient")
        self.add(tr)
        self.remove(sq)
        self.play(FadeOut(diag), tr[0].animate.shift(P(0.35, 0.2)), tr[1].animate.shift(P(-0.35, -0.2)),
                  run_time=0.4)
        l2 = self.t("2 triangles.", 34, TRI1)
        self.col(l2, 2.15)
        self.au_mot("2 triangles")
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.3)
        self.au_mot("Chaque triangle")
        l3 = self.pile([("Chaque triangle vaut", WHITE), ("un demi-carré.", TRI1)], 34)
        self.col(l3, 1.25)
        self.play(FadeIn(l3, shift=UP * 0.1), Indicate(tr[0], color=JAUNE_TITRE, scale_factor=1.1), run_time=0.45)
        self.au_mot("2 demis")
        l4 = self.ligne([("2 demis", TRI1), ("= 1 carré entier", VERT_OK)], 34)
        self.col(l4, 0.3)
        self.play(FadeIn(l4[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("font 1 carré")
        self.play(FadeIn(l4[1], shift=UP * 0.1), tr[0].animate.shift(P(-0.35, -0.2)),
                  tr[1].animate.shift(P(0.35, 0.2)), run_time=0.4)
        self.play(tr.animate.set_fill(VERT_F), run_time=0.3)
        # la couverture de 10 carrés et 4 demis (les deux carrés du bas à droite, coupés)
        cc = 0.55
        g = bleue(cc).move_to(P(-4.3, -1.4))
        entiers = VGroup(*[q for k, q in enumerate(g) if k not in (10, 11)])
        tri = VGroup(*[t for k in (10, 11) for t in demis(cc, g[k].get_center())])
        self.au_mot("Une couverture")
        self.play(LaggedStart(*[FadeIn(q, scale=1.3) for q in entiers], lag_ratio=0.04), run_time=0.6)
        l5 = self.ligne([("10 carrés", BLEU1), ("et 4 demis", TRI1)], 34)
        self.col(l5, -0.6)
        self.au_mot("10 carrés")
        self.play(FadeIn(l5[0], shift=UP * 0.1), Indicate(entiers, color=BLEU1, scale_factor=1.04), run_time=0.35)
        self.au_mot("et 4 demis")
        self.play(FadeIn(l5[1], shift=UP * 0.1), LaggedStart(*[FadeIn(t, scale=1.3) for t in tri], lag_ratio=0.1),
                  run_time=0.4)
        l6 = self.ligne([("10", WHITE), ("+ 2", TRI1), ("= 12 carrés", VERT_OK)], 38, buff=0.25)
        self.col(l6, -1.3)
        self.au_mot("10 plus")
        self.play(FadeIn(l6[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("plus 2")
        self.play(FadeIn(l6[1], shift=UP * 0.1), Indicate(tri, color=VERT_OK, scale_factor=1.06), run_time=0.35)
        self.au_mot("12 carrés")
        self.play(FadeIn(l6[2], shift=UP * 0.1), run_time=0.3)
        self.insister(l6[2], 1.12, 0.25)
        self.attendre_voix()

    # ── 04 : aire et périmètre ──────────────────────────────────────────────
    def ecran_perimetre(self):
        self.ecran("04-perimetre")
        b, r = bleue(0.55).move_to(P(-4.3, 1.55)), rouge(0.55).move_to(P(-3.9, -0.9))
        self.add(b, r)
        self.au_mot("Aire et périmètre")
        l0 = self.bloc(["Aire et périmètre,", "ce n'est pas pareil."], 36, JAUNE_TITRE)
        self.col(l0, 2.75)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.4)
        self.au_mot("La couverture bleue")
        l1 = self.ligne([("Bleue :", BLEU1), ("4 carrés", WHITE), ("sur 3", WHITE)], 34)
        self.col(l1, 1.55)
        self.play(FadeIn(l1[0], shift=UP * 0.1), Indicate(b, color=BLEU1, scale_factor=1.04), run_time=0.35)
        c4, c3 = cote(b, "4", UP, couleur=BLEU1), cote(b, "3", LEFT, couleur=BLEU1)
        self.au_mot("4 carrés")
        self.play(FadeIn(l1[1], shift=UP * 0.1), FadeIn(c4), run_time=0.3)
        self.au_mot("sur 3")
        self.play(FadeIn(l1[2], shift=UP * 0.1), FadeIn(c3), run_time=0.3)
        tb = tour(b)
        l2 = self.ligne([("Tour :", PLINTHE), ("14 côtés de carré", PLINTHE)], 34)
        self.col(l2, 0.95)
        self.au_mot("son tour")
        self.play(FadeIn(l2[0], shift=UP * 0.1), Create(tb), run_time=0.5)
        self.au_mot("fait 14")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("La rouge")
        l3 = self.ligne([("Rouge :", ROUGE1), ("6 carrés", WHITE), ("sur 2", WHITE)], 34)
        self.col(l3, -0.05)
        self.play(FadeIn(l3[0], shift=UP * 0.1), Indicate(r, color=ROUGE1, scale_factor=1.04), run_time=0.35)
        c6, c2 = cote(r, "6", DOWN, couleur=ROUGE1), cote(r, "2", LEFT, couleur=ROUGE1)
        self.au_mot("6 carrés")
        self.play(FadeIn(l3[1], shift=UP * 0.1), FadeIn(c6), run_time=0.3)
        self.au_mot("sur 2")
        self.play(FadeIn(l3[2], shift=UP * 0.1), FadeIn(c2), run_time=0.3)
        tr = tour(r)
        l4 = self.ligne([("Tour :", PLINTHE), ("16", PLINTHE)], 34)
        self.col(l4, -0.65)
        self.au_mot("son tour fait 16")
        self.play(FadeIn(l4[0], shift=UP * 0.1), Create(tr), run_time=0.45)
        self.play(FadeIn(l4[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("Même aire")
        res = self.gros("Même aire, pas le même périmètre !", fs=30)
        gauche(res, -6.1, -2.75)
        self.play(FadeIn(res, scale=1.1), run_time=0.45)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (réponse A) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        g = bleue(0.55).move_to(P(-3.7, 1.25))

        def autres_q(sc):
            sc.play(FadeIn(g), run_time=0.35)

        def apres(sc):
            sc.play(*[q[0].animate.set_fill(VERT_F) for q in g], run_time=0.3)

        self.question_gauche("05-question", "05b-reponse", ["L'aire d'une figure,", "c'est…"],
                             [self.choix("la mesure de sa surface", 25), self.choix("la longueur de son tour", 25),
                              self.choix("le nombre de ses côtés", 25)], 0,
                             ["L'aire mesure la surface,", "toute la place à l'intérieur.", "La longueur du tour,",
                              "c'est le périmètre."],
                             0.05, mot_q="L'aire d'une", autres_q=autres_q, autres_r=apres)

    # ── 06 : le piège (un plus grand tour ≠ une plus grande aire) ───────────
    def ecran_piege(self):
        self.ecran("06-piege")
        self.au_mot("Attention")
        tit = self.t("Attention au piège !", 46, ROUGE_ERREUR)
        gauche(tit, -6.2, 3.05)
        self.play(Write(tit), run_time=0.35)
        b, r = bleue(0.5).move_to(P(-4.7, 1.3)), rouge(0.5).move_to(P(-4.2, -0.8))
        tb, tr = tour(b, PLINTHE, 7), tour(r, PLINTHE, 7)
        e14 = hors_audit(Text("tour : 14", font_size=28, color=PLINTHE, weight=BOLD).next_to(tb, RIGHT, buff=0.2))
        self.add(b, r, tb, tr, e14)
        self.au_mot("Un plus grand tour")
        l0 = self.bloc(["Un plus grand tour", "ne veut pas dire", "une plus grande aire."], 32)
        self.col(l0, 1.95)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.4)
        self.au_mot("La couverture rouge")
        l1 = self.ligne([("Rouge :", ROUGE1), ("tour 16,", PLINTHE)], 34)
        self.col(l1, 0.65)
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.3)
        e16 = Text("tour : 16", font_size=28, color=PLINTHE, weight=BOLD).next_to(tr, RIGHT, buff=0.2)
        self.au_mot("tour, 16")
        self.play(FadeIn(l1[1], shift=UP * 0.1), FadeIn(e16), Indicate(tr, color=PLINTHE, scale_factor=1.05),
                  run_time=0.4)
        l2 = self.ligne([("mais tissu :", VERT_OK), ("12 carrés,", VERT_OK)], 34)
        self.col(l2, 0.05)
        self.au_mot("pas plus de tissu")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("12 carrés")
        self.play(FadeIn(l2[1], shift=UP * 0.1), FadeIn(numeros(r, 20, "#0f172a")), run_time=0.35)
        self.au_mot("comme la bleue")
        l3 = self.t("comme la bleue.", 34, BLEU1)
        self.col(l3, -0.55)
        self.play(FadeIn(l3, shift=UP * 0.1), FadeIn(numeros(b, 20, "#0f172a")), run_time=0.35)
        self.au_mot("Pour l'aire")
        lg = VGroup(*[Text(x, font_size=30, color=VERT_OK, weight=BOLD) for x in
                      ("Pour l'aire, on compte", "les carrés à l'intérieur.")]).arrange(DOWN, buff=0.18)
        res = VGroup(SurroundingRectangle(lg, color=VERT_OK, buff=0.2, corner_radius=0.12, stroke_width=5), lg)
        gauche(res, -6.1, -2.65)
        self.play(FadeIn(res, scale=1.1), FadeOut(tb), FadeOut(tr), run_time=0.5)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (réponse C) ─────────────────────────────────────────
    def figure_q2(self):
        c = 0.6
        g = VGroup(*[case_tissu(c, BLEU1 if (i + j) % 2 == 0 else BLEU2, BLEU_B).move_to(P(i * c, -j * c))
                     for j in range(2) for i in range(3)])
        tri = VGroup(*[t for j in range(2) for t in demis(c, P(3 * c + 0.12, -j * c))])
        fig = VGroup(g, tri).move_to(P(-3.7, 1.35))
        return fig

    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        fig = self.figure_q2()
        g, tri = fig

        def autres_q(sc):
            sc.play(FadeIn(g), FadeIn(tri), run_time=0.3)

        def apres(sc):
            sc.play(tri.animate.set_fill(VERT_F), run_time=0.25)

        self.question_gauche("07-question", "07b-reponse",
                             ["6 carrés entiers", "et 4 demi-carrés :", "quelle est son aire ?"],
                             [self.choix("10 carrés"), self.choix("6 carrés"), self.choix("8 carrés")], 2,
                             ["4 demi-carrés, c'est", "2 carrés entiers.", "6 + 2 = 8 carrés."],
                             0.3, couper={2: ("6 +", "2", "= 8 carrés.")}, mot_q="6 carrés",
                             autres_q=autres_q, autres_r=apres)

    # ── 08 : le défi (4 rangées de 5, le galon) ─────────────────────────────
    def couverture(self):
        return patch(5, 4, 0.5).move_to(P(-3.6, 0.7))

    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        pile = tissus(0.5).move_to(P(-5.6, -1.75))
        self.au_mot("Elsa a 20")
        l0 = self.t("Elsa a 20 carrés de tissu.", 32)
        self.col(l0, 2.3, 0.35)
        t20 = hors_audit(self.t("20 carrés", 26, GRAY_B)).next_to(pile, RIGHT, buff=0.25)
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(pile, shift=UP * 0.2), FadeIn(t20), run_time=0.4)
        g = self.couverture()
        self.au_mot("4 rangées")
        l1 = self.ligne([("4 rangées", BLEU1), ("de 5 carrés,", BLEU1)], 32)
        self.col(l1, 1.65, 0.35)
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("5 carrés")
        self.play(FadeIn(l1[1], shift=UP * 0.1), LaggedStart(*[FadeIn(q, scale=1.3) for q in g], lag_ratio=0.03),
                  run_time=0.6)
        gal = tour(g, GALON, 10)
        self.au_mot("un galon")
        l2 = self.t("un galon vert tout autour.", 32, GALON)
        self.col(l2, 1.0, 0.35)
        self.play(FadeIn(l2, shift=UP * 0.1), Create(gal), run_time=0.7)
        self.au_mot("A-t-elle")
        q1 = self.bloc(["A-t-elle assez", "de tissu ?"], 34, JAUNE_TITRE)
        self.col(q1, 0.3, 0.35)
        self.play(FadeIn(q1, shift=UP * 0.1), Wiggle(pile), run_time=0.5)
        self.au_mot("Et combien")
        q2 = self.bloc(["Et combien de côtés de carré", "mesure le galon ?"], 30, JAUNE_TITRE)
        self.col(q2, -0.98, 0.35)
        self.play(FadeIn(q2, shift=UP * 0.1), Indicate(gal, color=GALON, scale_factor=1.04), run_time=0.5)
        self.pause_defi(y=-1.78)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        g = self.couverture()
        self.add(g)
        self.au_mot("Le tissu")
        l0 = self.t("Le tissu, c'est l'aire :", 32, VERT_OK)
        self.col(l0, 2.35, 0.35)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.35)
        l1 = self.ligne([("4 rangées", BLEU1), ("de 5 :", BLEU1), ("20 carrés.", VERT_OK)], 32)
        self.col(l1, 1.75, 0.35)
        self.au_mot("4 rangées")
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("de 5")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("20 carrés")
        self.play(FadeIn(l1[2], shift=UP * 0.1), FadeIn(numeros(g, 18, "#0f172a")), run_time=0.35)
        self.au_mot("Elsa a juste")
        l2 = self.t("Elsa a juste assez !", 34, VERT_OK)
        self.col(l2, 1.1, 0.35)
        self.play(FadeIn(l2, shift=UP * 0.1), Indicate(g, color=VERT_OK, scale_factor=1.03), run_time=0.45)
        self.au_mot("Le galon")
        gal = tour(g, GALON, 10)
        l3 = self.t("Le galon, c'est le périmètre :", 30, GALON)
        self.col(l3, 0.4, 0.35)
        c5, c4 = cote(g, "5", UP, couleur=GALON), cote(g, "4", LEFT, couleur=GALON)
        self.play(FadeIn(l3, shift=UP * 0.1), Create(gal), run_time=0.5)
        l4 = self.ligne([("5 +", BLEU_D), ("4", BLEU_D), ("= 9", BLEU_D)], 38, buff=0.2)
        self.col(l4, -0.3, 0.35)
        self.au_mot("5 plus")
        self.play(FadeIn(l4[0], shift=UP * 0.1), FadeIn(c5), run_time=0.3)
        self.au_mot("plus 4")
        self.play(FadeIn(l4[1], shift=UP * 0.1), FadeIn(c4), run_time=0.2)
        self.au_mot("4, 9")
        self.play(FadeIn(l4[2], shift=UP * 0.1), run_time=0.2)
        l5 = self.ligne([("9 ×", BLEU_D), ("2", BLEU_D), ("= 18 côtés", GALON)], 38, buff=0.2)
        self.col(l5, -1.0, 0.35)
        hors_audit(l5[0])  # le 9 descend de la ligne du dessus (déjà dit)
        self.au_mot("fois 2")
        self.play(FadeIn(l5[0], shift=DOWN * 0.15), Indicate(l4[2], color=BLEU_D, scale_factor=1.1), run_time=0.3)
        self.play(FadeIn(l5[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("18 côtés")
        self.play(FadeIn(l5[2], shift=UP * 0.1), Indicate(gal, color=GALON, scale_factor=1.03), run_time=0.4)
        self.insister(l5[2], 1.1, 0.25)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        b = bleue(0.45)
        tri = VGroup(*[t for k in (10, 11) for t in demis(0.45, b[k].get_center())])
        for k in (10, 11):
            b[k].set_opacity(0)
        r = rouge(0.45)
        fig = VGroup(VGroup(b, tri), r).arrange(DOWN, buff=0.55)
        lignes = self.finale_gauche(fig, textes=[
            ("L'aire mesure une surface,", "en carrés-unités."),
            ("2 demi-carrés", "font 1 carré."),
            ("Deux figures : même aire,", "périmètres différents.")], fs=34)
        tb, trr = tour(b, PLINTHE, 6), tour(r, PLINTHE, 6)
        self.add(b, tri, r)
        self.au_mot("L'aire mesure")
        self.montrer_ligne(lignes[0], Indicate(VGroup(b, r), color=VERT_F, scale_factor=1.04))
        self.au_mot("2 demi-carrés")
        self.montrer_ligne(lignes[1], Indicate(tri, color=VERT_OK, scale_factor=1.12))
        self.au_mot("Deux figures")
        self.montrer_ligne(lignes[2], Create(tb), Create(trr))
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_carreaux()
        self.ecran_demi()
        self.ecran_perimetre()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")


class AireComprendreCM2(AireComprendreBase):
    identite = "Maths CM2 — EleveAI"
    ceinture = "jaune"
