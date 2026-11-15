# 5e_aire_comprendre.py
# EleveAI — Maths 5e — série « Aire, volume et conversions » (2e poste), épisode A1 : COMPRENDRE L'AIRE
# (micro aire_comprendre, notion aire_surface), AVEC VOIX. Paysage 16:9, CEINTURE JAUNE.
# Short jumeau : 5e-aire-comprendre-short (la pizza carrée, 20 × 20 = 25 × 16 = 400 cm²).
# Décor et métier : Awa, MAÇONNE (matrice 5e aire_surface ; centres arts-creation, maison).
# Mapping micro → écrans : 02 (le mur 4 m × 3 m découpé en carrés de 1 m² : 3 rangées de 4, 12 m²),
# 03 (le tour 4 + 3 + 4 + 3 = 14 m, en mètres ; la surface en mètres carrés), 04 (6 m × 2 m : même aire 12 m²,
# tour 16 m), 06 (piège : le petit 2 de m²), questions 05 (A : 10 m²) et 07 (C : 24 = 24),
# défi 08 (2 murs 4 × 2,5 + 2 murs 3 × 2,5 = 35 m² ; sacs de 10 m² → 4 sacs).
# Voix : manim/voix/5e-aire-comprendre.json (validée le 15/11, Julie, débit −6) ;
# marques : 5e_aire_comprendre_marques.json (python manim/scripts/5e/aire_volume_5e_marques.py aire-comprendre).
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/5e/5e_aire_comprendre.py AireComprendre5e
# Aperçu : python -m manim render -ql manim/scripts/5e/5e_aire_comprendre.py AireComprendre5e -o eleveai-maths-5e-aire-comprendre --media_dir manim/scripts/5e/media-5e-aire-comprendre
# Sortie finale : manim/sorties/5e/maths/aire/01-comprendre/eleveai-maths-5e-aire-comprendre.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from aire_volume_5e_commun import *  # noqa: E402,F403

BRIQUE, BRIQUE_B = "#c2410c", "#7c2d12"
ENDUIT = "#e7d8b8"


def mur_briques(n_col, n_rang, c=0.62):
    """Un mur de briques de n_col × n_rang mètres (c = un mètre à l'écran) : fond brique, joints clairs."""
    w, h = n_col * c, n_rang * c
    fond = Rectangle(width=w, height=h, fill_color=BRIQUE, fill_opacity=1, stroke_color=BRIQUE_B, stroke_width=4)
    joints = VGroup()
    nb = max(1, round(n_rang * 3))
    for k in range(1, nb):
        y = -h / 2 + k * h / nb
        joints.add(Line(P(-w / 2, y), P(w / 2, y)))
    for k in range(nb):
        y0, y1 = -h / 2 + k * h / nb, -h / 2 + (k + 1) * h / nb
        dec = 0 if k % 2 == 0 else c / 4
        x = -w / 2 + dec + c / 2
        while x < w / 2 - 0.02:
            joints.add(Line(P(x, y0), P(x, y1)))
            x += c / 2
    joints.set_stroke("#fdba74", 2, opacity=0.55)
    return VGroup(fond, joints)


def quadrillage(g):
    """Le mur découpé en carrés d'un mètre (une grille rect_cases claire, semi-transparente)."""
    for q in g:
        q.set_fill(CARREAU, 0.22).set_stroke(WHITE, 5)
    return g


class AireComprendre5e(Paysage5e):
    nom_voix = "5e-aire-comprendre"
    fichier_marques = "5e_aire_comprendre_marques.json"
    ceinture = "jaune"

    C = 0.82  # un mètre à l'écran (écrans 02 → 04)
    O = P(-3.3, 0.2)

    def mur(self, n_col, n_rang, o=None, c=None):
        c = c or self.C
        m = mur_briques(n_col, n_rang, c).move_to(o if o is not None else self.O)
        return m

    def grille(self, n_col, n_rang, m, c=None):
        c = c or self.C
        return quadrillage(rect_cases(n_col, n_rang, c)).move_to(m)

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("L'aire", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("L'aire")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q = self.bloc(["Combien de place", "prend une surface ?"], 40)
        q.move_to(P(0, 0.3)).align_to(P(-6.2, 0), LEFT)
        g = rect_cases(4, 3, 0.62).move_to(P(3.3, 0.35))
        self.au_mot("Combien de place")
        self.play(FadeIn(q[0], shift=UP * 0.2), run_time=0.4)
        self.au_mot("prend une surface")
        self.play(FadeIn(q[1], shift=UP * 0.2), LaggedStart(*[FadeIn(x, scale=0.6) for x in g], lag_ratio=0.06),
                  run_time=0.9)
        self.attendre_voix(marge=0.6)

    # ── 01 : Awa, maçonne ───────────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        aw = awa5(1.0).move_to(P(-5.25, 0.1))
        self.au_mot("Voici Awa")
        nom = self.t("Awa", 40, BLEU_CALCUL).next_to(aw, UP, buff=0.25)
        self.play(FadeIn(aw, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("maçonne")
        met = self.t("maçonne", 30, BLEU_CALCUL).next_to(aw, DOWN, buff=0.18)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.35)
        m = mur_briques(4, 3, 0.95).move_to(P(0.2, 0.55))
        lm = self.t("un mur", 28, "#fdba74").next_to(m, DOWN, buff=0.2).align_to(m, LEFT)
        self.au_mot("couvrir un mur")
        self.play(FadeIn(m, shift=UP * 0.2), FadeIn(lm), run_time=0.55)
        self.au_mot("d'enduit")
        enduit = Rectangle(width=m.width, height=m.height, fill_color=ENDUIT, fill_opacity=0.92,
                           stroke_width=0).move_to(m)
        enduit.stretch(0.001, 0, about_edge=LEFT)
        self.play(enduit.animate.stretch(1000, 0, about_edge=LEFT), run_time=1.0)
        sac = RoundedRectangle(width=1.35, height=1.6, corner_radius=0.18, fill_color="#d6d3d1", fill_opacity=1,
                               stroke_color="#57534e", stroke_width=4).move_to(P(4.6, 0.55))
        self.au_mot("Au magasin")
        ls = self.t("enduit", 26, "#292524").move_to(sac.get_center() + UP * 0.25)
        self.play(FadeIn(sac, shift=LEFT * 0.2), FadeIn(ls), run_time=0.45)
        self.au_mot("au mètre carré")
        pr = m2("au m²", 30, "#292524").move_to(sac.get_center() + DOWN * 0.3)
        self.play(FadeIn(pr, scale=1.2), Indicate(sac, color=JAUNE_TITRE, scale_factor=1.06), run_time=0.5)
        self.au_mot("Combien de mètres carrés")
        q = self.t("Combien de mètres carrés faut-il ?", 36, JAUNE_TITRE).move_to(P(0.3, -2.55))
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.45)
        self.attendre_voix()

    # ── 02 : les carreaux (3 rangées de 4 : 12 m²) ─────────────────────────
    def ecran_carreaux(self):
        self.ecran("02-carreaux")
        m = self.mur(4, 3)
        self.add(m)
        cl = cote(Line(m.get_corner(DL), m.get_corner(DR)), "4 m", DOWN, couleur=BASE_C)
        ch = cote(Line(m.get_corner(DL), m.get_corner(UL)), "3 m", LEFT, couleur=BASE_C)
        l1 = self.ligne([("4 m", BASE_C), ("sur 3 m", BASE_C)], 38)
        self.col(l1, 2.6)
        self.au_mot("4 mètres")
        self.play(FadeIn(cl), FadeIn(l1[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("sur 3 mètres")
        self.play(FadeIn(ch), FadeIn(l1[1], shift=UP * 0.1), run_time=0.35)
        g = self.grille(4, 3, m)
        l2 = self.bloc(["En carrés", "de 1 m sur 1 m."], 34)
        self.col(l2, 1.75)
        self.au_mot("Awa le découpe en carrés")
        self.play(FadeIn(l2[0], shift=UP * 0.1), LaggedStart(*[FadeIn(x, scale=0.7) for x in g], lag_ratio=0.05),
                  run_time=0.6)
        self.au_mot("de 1 mètre sur 1 mètre")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.3)
        un = g[0]
        l3 = self.ligne([("Chaque carré :", CARREAU), ("1 m²", CARREAU)], 38)
        self.col(l3, 0.75)
        self.au_mot("Chaque carré")
        self.play(FadeIn(l3[0], shift=UP * 0.1), un.animate.set_fill(JAUNE_TITRE, 0.85), run_time=0.4)
        self.au_mot("c'est 1 mètre carré")
        e1 = m2("1 m²", 24, "#1c1917").move_to(un)
        self.play(FadeIn(l3[1], shift=UP * 0.1), FadeIn(e1, scale=1.2), run_time=0.4)
        self.au_mot("Elle compte")
        self.play(FadeOut(e1), un.animate.set_fill(CARREAU, 0.22), run_time=0.3)
        n = numeros(g, 24)
        l4 = self.ligne([("3 rangées", WHITE), ("de 4 :", WHITE), ("12", VERT_OK)], 38)
        self.col(l4, -0.15)
        self.au_mot("3 rangées")
        self.play(FadeIn(l4[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("de 4 carrés")
        self.play(FadeIn(l4[1], shift=UP * 0.1), LaggedStart(*[FadeIn(x) for x in n], lag_ratio=0.08),
                  run_time=1.0)
        self.au_mot("12 carrés")
        self.play(FadeIn(l4[2], scale=1.2), run_time=0.3)
        res = self.gros("L'aire : 12 m²", fs=46)
        self.col(res, -1.25)
        self.au_mot("L'aire du mur")
        self.play(FadeIn(res, scale=1.2), FadeOut(n), Indicate(g, color=JAUNE_TITRE, scale_factor=1.02),
                  run_time=0.55)
        self.insister(res, 1.1, 0.25)
        self.attendre_voix()

    # ── 03 : le tour, c'est autre chose (14 m) ──────────────────────────────
    def ecran_tour(self):
        self.ecran("03-tour")
        m = self.mur(4, 3)
        g = self.grille(4, 3, m)
        self.add(m, g)
        self.au_mot("le tour")
        l1 = self.t("Le tour, c'est autre chose.", 36, PLINTHE)
        self.col(l1, 2.6)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.35)
        bas, droite = Line(m.get_corner(DL), m.get_corner(DR)), Line(m.get_corner(DR), m.get_corner(UR))
        haut, gauche_ = Line(m.get_corner(UR), m.get_corner(UL)), Line(m.get_corner(UL), m.get_corner(DL))
        for s in (bas, droite, haut, gauche_):
            s.set_stroke(PLINTHE, 10)
        l2 = self.ligne([("4", PLINTHE), ("+ 3", PLINTHE), ("+ 4", PLINTHE), ("+ 3", PLINTHE)], 42, buff=0.18)
        self.col(l2, 1.7)
        self.au_mot("4 plus")
        self.play(FadeIn(l2[0]), Create(bas), run_time=0.3)
        self.au_mot("plus 3", 1)
        self.play(FadeIn(l2[1]), Create(droite), run_time=0.3)
        self.au_mot("plus 4")
        self.play(FadeIn(l2[2]), Create(haut), run_time=0.3)
        self.au_mot("plus 3", 2)
        self.play(FadeIn(l2[3]), Create(gauche_), run_time=0.3)
        l3 = self.ligne([("= 14 m", VERT_OK)], 46)
        self.col(l3, 0.85)
        self.au_mot("14 mètres")
        self.play(FadeIn(l3, scale=1.2), run_time=0.35)
        l4 = self.ligne([("Le tour :", PLINTHE), ("en m", PLINTHE)], 38)
        self.col(l4, -0.2)
        self.au_mot("Le tour se mesure en mètres")
        self.play(FadeIn(l4, shift=UP * 0.1), Indicate(VGroup(bas, droite, haut, gauche_), color=PLINTHE,
                                                         scale_factor=1.02), run_time=0.5)
        l5 = self.ligne([("La surface :", CARREAU), ("en m²", CARREAU)], 38)
        self.col(l5, -1.05)
        self.au_mot("La surface se mesure en mètres carrés")
        self.play(FadeIn(l5, shift=UP * 0.1), Indicate(g, color=CARREAU, scale_factor=1.02), run_time=0.5)
        self.insister(l5[1], 1.15, 0.25)
        self.attendre_voix()

    # ── 04 : deux murs, la même aire ────────────────────────────────────────
    def ecran_methode(self):
        self.ecran("04-methode")
        c = 0.62
        m1 = self.mur(4, 3, P(-4.6, 1.05), c)
        g1 = self.grille(4, 3, m1, c)
        e1 = sur_fond(m2("12 m²", 30, WHITE).next_to(m1, DOWN, buff=0.18))
        self.au_mot("Deux murs différents")
        self.play(FadeIn(m1), FadeIn(g1), run_time=0.4)
        l1 = self.bloc(["Deux murs différents :", "la même aire ?"], 36, JAUNE_TITRE)
        self.col(l1, 2.6, 0.6)
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("la même aire")
        self.play(FadeIn(l1[1], shift=UP * 0.1), FadeIn(e1), run_time=0.3)
        m2_ = self.mur(6, 2, P(-3.7, -1.35), c)
        g2 = self.grille(6, 2, m2_, c)
        l2 = self.ligne([("6 m", BASE_C), ("sur 2 m :", BASE_C)], 36)
        self.col(l2, 1.3, 0.6)
        self.au_mot("Un mur de 6 mètres sur 2 mètres")
        self.play(FadeIn(m2_, shift=UP * 0.15), FadeIn(l2, shift=UP * 0.1), run_time=0.45)
        self.au_mot("12 carrés aussi")
        n2 = numeros(g2, 20)
        l3 = self.t("12 carrés aussi.", 36, WHITE)
        self.col(l3, 0.55, 0.6)
        self.play(LaggedStart(*[FadeIn(x, scale=0.7) for x in g2], lag_ratio=0.05), FadeIn(n2), FadeIn(l3),
                  run_time=0.9)
        res = self.ligne([("Même aire :", VERT_OK), ("12 m²", VERT_OK)], 42)
        self.col(res, -0.3, 0.6)
        self.au_mot("Même aire")
        self.play(FadeIn(res, scale=1.15), FadeOut(n2), run_time=0.45)
        self.insister(res, 1.08, 0.25)
        l4 = self.ligne([("Son tour :", PLINTHE), ("16 m", PLINTHE)], 38)
        self.col(l4, -1.2, 0.6)
        tour = Rectangle(width=m2_.width, height=m2_.height, stroke_color=PLINTHE, stroke_width=9).move_to(m2_)
        self.au_mot("Mais son tour")
        self.play(FadeIn(l4[0], shift=UP * 0.1), Create(tour), run_time=0.6)
        self.au_mot("16 mètres")
        self.play(FadeIn(l4[1], scale=1.2), run_time=0.3)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (réponse A) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        c = 0.5
        m = mur_briques(5, 2, c).move_to(P(-3.6, 1.6))
        g = quadrillage(rect_cases(5, 2, c)).move_to(m)
        c5 = cote(Line(m.get_corner(DL), m.get_corner(DR)), "5 m", DOWN, fs=28, couleur=BASE_C, audit=False)
        c2 = cote(Line(m.get_corner(DL), m.get_corner(UL)), "2 m", LEFT, fs=28, couleur=BASE_C, audit=False)

        def avant(sc):
            sc.play(FadeIn(m), FadeIn(c5), FadeIn(c2), run_time=0.4)

        def apres(sc):
            sc.rep(0, avec=[FadeIn(g)])
            sc.rep_fin()

        self.question_gauche("05-question", "05b-reponse",
                             ["Un mur mesure 5 m sur 2 m.", "Quelle est son aire ?"],
                             [self.choix("10 m²"), self.choix("14 m²"), self.choix("7 m²")], 0,
                             ["2 rangées de 5 carrés : 10 m².", "14, c'est le tour du mur.", "7, c'est 5 + 2."],
                             -0.15, couper={1: ("14,", "c'est le tour du mur."), 2: ("7,", "c'est 5 + 2.")},
                             mot_q="Un mur", avant_q=avant, autres_r=apres)

    # ── 06 : le piège (le petit 2 de m²) ────────────────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        self.au_mot("Attention")
        tit = self.t("Attention au piège !", 46, ROUGE_ERREUR)
        gauche(tit, -6.2, 3.05)
        self.play(Write(tit), run_time=0.35)
        l1 = self.bloc(["Une aire s'écrit", "en unités carrées :"], 36)
        self.col(l1, 2.0, -0.3)
        self.au_mot("Une aire s'écrit")
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("en unités carrées")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.3)
        l2 = self.ligne([("cm²,", CARREAU), ("m².", CARREAU)], 44, buff=0.35)
        self.col(l2, 0.95, -0.3)
        self.au_mot("centimètres carrés")
        self.play(FadeIn(l2[0], scale=1.2), run_time=0.3)
        self.au_mot("mètres carrés. Le")
        self.play(FadeIn(l2[1], scale=1.2), run_time=0.3)
        l3 = self.t("Le petit 2 en haut compte.", 36, JAUNE_TITRE)
        self.col(l3, 0.0, -0.3)
        self.au_mot("Le petit 2")
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.35)
        deux = VGroup(l2[0][-2], l2[1][-2])
        self.play(Indicate(deux, color=JAUNE_TITRE, scale_factor=1.8), run_time=0.6)
        # deux encadrés : 12 m (une longueur, un trait) et 12 m² (une surface, des carreaux)
        b1 = self.t("12 m", 44, PLINTHE).move_to(P(-4.6, -1.2))
        trait = Line(P(-5.6, -1.85), P(-3.6, -1.85), color=PLINTHE, stroke_width=10)
        d1 = self.t("une longueur", 30, PLINTHE).move_to(P(-4.6, -2.4))
        self.au_mot("12 mètres")
        self.play(FadeIn(b1, scale=1.2), Create(trait), run_time=0.4)
        self.au_mot("une longueur")
        self.play(FadeIn(d1), run_time=0.3)
        b2 = self.t("12 m²", 44, CARREAU).move_to(P(-0.6, -1.2))
        g = rect_cases(4, 1, 0.42).move_to(P(-0.6, -1.85))
        d2 = self.t("une surface", 30, CARREAU).move_to(P(-0.6, -2.4))
        self.au_mot("12 mètres carrés")
        self.play(FadeIn(b2, scale=1.2), FadeIn(g), run_time=0.4)
        self.au_mot("une surface")
        self.play(FadeIn(d2), run_time=0.3)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (réponse C) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        c = 0.3
        t1 = quadrillage(rect_cases(8, 3, c)).move_to(P(-4.6, 1.85))
        t2 = quadrillage(rect_cases(6, 4, c)).move_to(P(-1.9, 1.7))
        for q in t2:
            q.set_fill(VERT_F, 0.55)
        l1 = self.t("8 m × 3 m", 26, CARREAU).next_to(t1, DOWN, buff=0.12)
        l2 = self.t("6 m × 4 m", 26, VERT_F).next_to(t2, DOWN, buff=0.12)
        hors_audit(l1)
        hors_audit(l2)

        # les deux terrasses sont posées AVANT la voix (étiquettes hors audit) : la question les trouve là
        self.play(FadeIn(t1), FadeIn(t2), FadeIn(l1), FadeIn(l2), run_time=0.4)

        def apres(sc):
            sc.rep(0, avec=[Indicate(t1, color=JAUNE_TITRE, scale_factor=1.04)])
            sc.rep(1, avec=[Indicate(t2, color=JAUNE_TITRE, scale_factor=1.04)])
            sc.rep(2)
            sc.rep_fin()

        self.question_gauche("07-question", "07b-reponse",
                             ["La première : 8 m sur 3 m.", "La deuxième : 6 m sur 4 m.",
                              "Laquelle a la plus grande aire ?"],
                             [self.choix("la deuxième"), self.choix("la première"), self.choix("la même aire")], 2,
                             ["8 × 3 = 24.", "6 × 4 = 24.", "Même aire : 24 m²."],
                             -0.35, couper={0: ("8 × 3", "= 24."), 1: ("6 × 4", "= 24."), 2: ("Même aire :", "24 m².")},
                             mot_q="La", autres_r=apres)

    # ── 08 : le défi (la pièce : 4 murs, des sacs de 10 m²) ─────────────────
    def murs_piece(self):
        c = 0.42
        ms = VGroup(mur_briques(4, 2.5, c), mur_briques(4, 2.5, c), mur_briques(3, 2.5, c), mur_briques(3, 2.5, c))
        ms[0].move_to(P(-5.2, 1.15))
        ms[1].next_to(ms[0], RIGHT, buff=0.25)
        ms[2].move_to(P(-5.2, 0.15)).align_to(ms[0], LEFT).shift(DOWN * 0.25)
        ms[3].next_to(ms[2], RIGHT, buff=0.25)
        return ms

    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        ms = self.murs_piece()
        l1 = self.t("Awa enduit une pièce.", 34)
        self.col(l1, 2.1, -0.4)
        self.au_mot("Awa enduit une pièce")
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.3)
        l2 = self.ligne([("Deux murs :", WHITE), ("4 m sur 2,5 m.", BASE_C)], 34)
        self.col(l2, 1.35, -0.4)
        self.au_mot("Deux murs mesurent")
        self.play(FadeIn(l2[0], shift=UP * 0.1), FadeIn(ms[0]), FadeIn(ms[1]), run_time=0.4)
        self.au_mot("4 mètres sur 2,5 mètres")
        c4 = cote(Line(ms[0].get_corner(UL), ms[0].get_corner(UR)), "4 m", UP, fs=24, couleur=BASE_C, audit=False,
                  buff=0.08)
        self.play(FadeIn(l2[1], shift=UP * 0.1), FadeIn(c4), run_time=0.3)
        l3 = self.ligne([("Deux autres :", WHITE), ("3 m sur 2,5 m.", BASE_C)], 34)
        self.col(l3, 0.6, -0.4)
        self.au_mot("Deux autres")
        self.play(FadeIn(l3[0], shift=UP * 0.1), FadeIn(ms[2]), FadeIn(ms[3]), run_time=0.4)
        self.au_mot("3 mètres sur 2,5 mètres")
        c3 = cote(Line(ms[2].get_corner(DL), ms[2].get_corner(DR)), "3 m", DOWN, fs=24, couleur=BASE_C, audit=False,
                  buff=0.08)
        self.play(FadeIn(l3[1], shift=UP * 0.1), FadeIn(c3), run_time=0.3)
        sac = RoundedRectangle(width=1.5, height=1.3, corner_radius=0.16, fill_color="#d6d3d1", fill_opacity=1,
                               stroke_color="#57534e", stroke_width=4).move_to(P(-4.4, -1.65))
        l4 = self.ligne([("Un sac :", JAUNE_TITRE), ("10 m².", JAUNE_TITRE)], 34)
        self.col(l4, -0.2, -0.4)
        self.au_mot("Un sac d'enduit")
        self.play(FadeIn(l4[0], shift=UP * 0.1), FadeIn(sac, shift=UP * 0.15), run_time=0.4)
        self.au_mot("couvre 10 mètres carrés")
        e10 = m2("10 m²", 26, "#292524").move_to(sac)
        self.play(FadeIn(l4[1], shift=UP * 0.1), FadeIn(e10), run_time=0.3)
        l5 = self.t("Combien de sacs faut-il ?", 36, JAUNE_TITRE)
        self.col(l5, -1.05, -0.4)
        self.au_mot("Combien de sacs")
        self.play(FadeIn(l5, shift=UP * 0.1), run_time=0.35)
        self.pause_defi(y=-2.35)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        ms = self.murs_piece()
        self.add(ms)
        x = -0.6
        l1 = self.ligne([("Un grand :", WHITE), ("4 × 2,5", BLEU_D), ("= 10", VERT_OK)], 34, buff=0.2)
        self.col(l1, 2.25, x)
        self.au_mot("Un grand mur")
        self.play(FadeIn(l1[0], shift=UP * 0.1), Indicate(ms[0], color=JAUNE_TITRE, scale_factor=1.04), run_time=0.4)
        self.au_mot("4 fois 2,5")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("10 mètres carrés")
        self.play(FadeIn(l1[2], shift=UP * 0.1), run_time=0.3)
        l2 = self.ligne([("Deux grands :", WHITE), ("20", VERT_OK)], 34)
        self.col(l2, 1.55, x)
        self.au_mot("Deux grands murs")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("murs : 20")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.3)
        l3 = self.ligne([("Un petit :", WHITE), ("3 × 2,5", BLEU_D), ("= 7,5", VERT_OK)], 34, buff=0.2)
        self.col(l3, 0.85, x)
        self.au_mot("Un petit mur")
        self.play(FadeIn(l3[0], shift=UP * 0.1), Indicate(ms[2], color=JAUNE_TITRE, scale_factor=1.04), run_time=0.4)
        self.au_mot("3 fois 2,5")
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("2,5, 7,5")
        self.play(FadeIn(l3[2], shift=UP * 0.1), run_time=0.3)
        l4 = self.ligne([("Deux petits :", WHITE), ("15", VERT_OK)], 34)
        self.col(l4, 0.15, x)
        self.au_mot("Deux petits murs")
        self.play(FadeIn(l4[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("murs : 15")
        self.play(FadeIn(l4[1], shift=UP * 0.1), run_time=0.3)
        l5 = self.ligne([("En tout :", JAUNE_TITRE), ("20 + 15", BLEU_D), ("= 35 m²", VERT_OK)], 36, buff=0.2)
        self.col(l5, -0.6, x)
        self.au_mot("En tout")
        self.play(FadeIn(l5[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("20 plus 15")
        self.play(FadeIn(l5[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("35 mètres carrés")
        self.play(FadeIn(l5[2], shift=UP * 0.1), run_time=0.3)
        l6 = self.ligne([("3 sacs :", ROUGE_ERREUR), ("30,", ROUGE_ERREUR), ("pas assez.", ROUGE_ERREUR)], 34)
        self.col(l6, -1.35, x)
        self.au_mot("3 sacs")
        self.play(FadeIn(l6[0], shift=UP * 0.1), run_time=0.25)
        self.au_mot("couvrent 30")
        self.play(FadeIn(l6[1], shift=UP * 0.1), run_time=0.25)
        self.au_mot("pas assez")
        self.play(FadeIn(l6[2], shift=UP * 0.1), run_time=0.3)
        res = self.gros("4 sacs", fs=48)
        self.col(res, -2.2, x)
        sacs = VGroup(*[RoundedRectangle(width=0.55, height=0.68, corner_radius=0.1, fill_color="#d6d3d1",
                                         fill_opacity=1, stroke_color="#57534e", stroke_width=3)
                        for _ in range(4)]).arrange(RIGHT, buff=0.18).move_to(P(-4.5, -1.75))
        self.au_mot("Il faut 4 sacs")
        self.play(FadeIn(res, scale=1.2), LaggedStart(*[FadeIn(s, shift=UP * 0.2) for s in sacs], lag_ratio=0.15),
                  run_time=0.7)
        self.insister(res, 1.12, 0.25)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        g1 = rect_cases(4, 3, 0.36)
        g2 = rect_cases(6, 2, 0.36)
        for q in g2:
            q.set_fill(VERT_F, 1)
        fig = VGroup(g1, g2).arrange(DOWN, buff=0.35)
        lignes = self.finale_gauche(fig, textes=[
            ("L'aire : le nombre de carrés-unité", "qui couvrent une surface."),
            ("Elle s'écrit en cm²", "ou en m²."),
            ("Deux figures différentes peuvent", "avoir la même aire.")], fs=32)
        self.add(fig)
        self.au_mot("L'aire, c'est le nombre")
        self.montrer_ligne(lignes[0], Indicate(g1, color=JAUNE_TITRE, scale_factor=1.04))
        self.au_mot("Elle s'écrit")
        self.montrer_ligne(lignes[1])
        self.au_mot("Deux figures différentes")
        self.montrer_ligne(lignes[2], Indicate(fig, color=VERT_OK, scale_factor=1.03))
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_carreaux()
        self.ecran_tour()
        self.ecran_methode()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")
