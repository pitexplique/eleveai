# triangle_defi.py
# EleveAI — Maths 6e — série « Triangles », épisode 05 : DÉFIS SUR LES TRIANGLES
# (micro triangle_defi, notion triangle_figure), AVEC VOIX. Paysage 16:9, CEINTURE VERTE.
# Décor et métier : Samira, PÂTISSIÈRE (centres : cuisine, jeux-defis).
# Voix : manim/voix/6e-triangle-defi.json ; marques : triangle_defi_marques.json.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/6e/triangle_defi.py TriangleDefi6e
# Sortie : manim/sorties/6e/maths/triangles/05-defi/eleveai-maths-6e-triangle-defi.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from prop_commun import *  # noqa: E402,F403
from canvas_angles import *  # noqa: E402,F403
from canvas_triangles import *  # noqa: E402,F403

GATEAU, CREME = "#b45309", "#fde68a"


def samira(s=1.0):
    p = visage(personne(peau="#c68642", tenue="#f8fafc", cheveux="#111827", longs=True, s=s))
    t = p.tete.get_center()
    r = p.tete.width / 2
    toque = VGroup(RoundedRectangle(width=1.5 * r, height=0.9 * r, corner_radius=0.2 * r, fill_color=WHITE, fill_opacity=1, stroke_width=0)
                   .move_to(t + UP * 1.25 * r),
                   Rectangle(width=1.5 * r, height=0.25 * r, fill_color="#e2e8f0", fill_opacity=1, stroke_width=0).move_to(t + UP * 0.78 * r))
    tablier = Polygon(p.corps.get_top() + LEFT * 0.3 * s, p.corps.get_top() + RIGHT * 0.3 * s, p.corps.get_bottom() + RIGHT * 0.5 * s,
                      p.corps.get_bottom() + LEFT * 0.5 * s, fill_color="#ec4899", fill_opacity=1, stroke_width=0)
    p.add(tablier, toque)
    return p


def part(a, b, c):
    """Une part de gâteau carré : le dessus, vu d'en haut."""
    return Polygon(a, b, c, fill_color=GATEAU, fill_opacity=1, stroke_color=CREME, stroke_width=7)


def gateau(centre, cote):
    c = np.array(centre, dtype=float)
    h = cote / 2
    A, B, C, D = c + np.array([-h, h, 0]), c + np.array([-h, -h, 0]), c + np.array([h, -h, 0]), c + np.array([h, h, 0])
    return A, B, C, D


def mesure(sc, a, b, txt, centre, fs=34, couleur=WHITE, d=0.2):
    a, b = np.array(a), np.array(b)
    m = (a + b) / 2
    u = (b - a) / np.linalg.norm(b - a)
    n = np.array([-u[1], u[0], 0.0])
    if np.dot(n, m - np.array(centre)) < 0:
        n = -n
    t = sc.t(txt, fs, couleur)
    return t.move_to(m + n * (d + abs(n[0]) * t.width / 2 + abs(n[1]) * t.height / 2))


class TriangleDefiBase(FinTriangles, PaysageProp):
    nom_voix = "6e-triangle-defi"
    fichier_marques = "triangle_defi_marques.json"

    def demi(self, centre=P(-3.5, -0.3), cote=3.9):
        """La moitié du gâteau : rectangle isocèle, l'angle droit en bas à gauche."""
        A, B, C, _ = gateau(centre, cote)
        return Tri(A, B, C, sw=8, r_point=0.09, couleur=CREME, fond=0.0), A, B, C

    # ── 00 ──────────────────────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Défis sur les triangles", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Défis")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q = self.bloc(["Un triangle peut-il", "avoir deux noms", "à la fois ?"], 40).move_to(P(-2.6, 0.5))
        A, B, C, D = gateau(P(3.9, 0.7), 2.4)
        f = VGroup(part(A, B, C), part(A, C, D))
        self.au_mot("Un triangle")
        self.play(FadeIn(q, shift=UP * 0.2), FadeIn(f), run_time=0.5)
        self.attendre_voix(marge=0.6)

    # ── 01 ──────────────────────────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        s = samira(1.05).move_to(P(-5.0, 0.1))
        self.au_mot("Voici Samira")
        nom = self.t("Samira", 44, BLEU_CALCUL).next_to(s, UP, buff=0.2)
        self.play(FadeIn(s, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("pâtissière")
        met = self.t("pâtissière", 32, BLEU_CALCUL).next_to(s, DOWN, buff=0.18)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.35)
        A, B, C, D = gateau(P(-0.7, 0.1), 3.8)
        p1, p2 = part(A, B, C), part(A, C, D)
        self.au_mot("Elle coupe")
        l1 = self.t("un gâteau carré", 34, AMBRE).move_to(P(4.0, 2.4))
        self.play(FadeIn(p1), FadeIn(p2), run_time=0.4)
        self.au_mot("un gâteau")
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.3)
        self.au_mot("par la diagonale")
        l2 = self.bloc(["en deux, par", "la diagonale."], 34).move_to(P(4.0, 1.25))
        coup = Line(A + (A - C) * 0.08, C + (C - A) * 0.08, color=WHITE, stroke_width=7)
        self.play(FadeIn(l2, shift=UP * 0.1), Create(coup), run_time=0.5)
        self.au_mot("Elle obtient")
        d = (D - B) / np.linalg.norm(D - B) * 0.32
        self.play(FadeOut(coup), p1.animate.shift(-d), p2.animate.shift(d), run_time=0.5)
        l3 = self.bloc(["deux parts", "en triangle."], 36, VERT_OK).move_to(P(4.0, -0.05))
        self.au_mot("deux parts")
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.3)
        self.au_mot("Quel est")
        l4 = self.t("Quel est leur nom ?", 34, JAUNE_TITRE).move_to(P(4.0, -1.2))
        self.play(FadeIn(l4, scale=1.1), run_time=0.35)
        self.attendre_voix()

    # ── 02 ──────────────────────────────────────────────────────────────────
    def ecran_deux_noms(self):
        self.ecran("02-deux-noms")
        f, A, B, C = self.demi()
        self.add(part(A, B, C).set_fill(opacity=0.55), f)
        self.au_mot("Regardons les côtés")
        l1 = self.t("Regardons les côtés :", 36, JAUNE_TITRE)
        self.col(l1, 3.0, xl=0.5)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.3)
        self.au_mot("deux côtés")
        l2 = self.bloc(["deux côtés égaux,", "ceux du carré."], 32)
        self.col(l2, 2.2, xl=0.5)
        c1, c2 = codage(A, B, 1, couleur=WHITE), codage(B, C, 1, couleur=WHITE)
        self.play(FadeIn(l2[0], shift=UP * 0.1), Create(c1), Create(c2), run_time=0.4)
        self.au_mot("ceux du")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("Il est isocèle")
        v1 = self.tampon("Isocèle", TEAL_C, 32)
        self.col(v1, 1.05, xl=0.5)
        self.play(FadeIn(v1, scale=1.2), run_time=0.35)
        self.au_mot("Regardons les angles")
        l3 = self.t("Regardons les angles :", 36, JAUNE_TITRE)
        self.col(l3, 0.3, xl=0.5)
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.3)
        self.au_mot("un coin")
        l4 = self.t("un coin du carré, 90°.", 34)
        self.col(l4, -0.4, xl=0.5)
        cd = coin_droit(B, C, A, c=0.45, couleur=WHITE, sw=7)
        self.play(FadeIn(l4[:14], shift=UP * 0.1), Create(cd), run_time=0.35)
        self.au_mot("90 degrés")
        self.play(FadeIn(l4[14:], scale=1.2), run_time=0.25)
        self.au_mot("Il est rectangle")
        v2 = self.tampon("Rectangle", TEAL_C, 32)
        self.col(v2, -1.2, xl=0.5)
        self.play(FadeIn(v2, scale=1.2), run_time=0.35)
        self.au_mot("Il est les deux")
        self.play(FadeOut(v1), FadeOut(v2), run_time=0.15)
        v = self.tampon("Rectangle isocèle !", VERT_OK, 34)
        v.move_to(P(2.8, -1.2)).align_to(P(0.5, 0), LEFT)
        self.play(FadeIn(v, scale=1.2), run_time=0.4)
        self.attendre_voix()

    # ── 03 ──────────────────────────────────────────────────────────────────
    def ecran_methode(self):
        self.ecran("03-methode")
        f, A, B, C = self.demi()
        self.add(part(A, B, C).set_fill(opacity=0.4), f)
        self.au_mot("La méthode")
        l0 = self.t("La méthode :", 42, JAUNE_TITRE)
        self.col(l0, 2.5, xl=0.6)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.3)
        self.au_mot("d'abord")
        l1 = self.t("d'abord les côtés,", 38)
        self.col(l1, 1.6, xl=0.6)
        self.play(FadeIn(l1, shift=UP * 0.1), Indicate(f.cotes[0], color=AMBRE, scale_factor=1.04), Indicate(f.cotes[1], color=AMBRE, scale_factor=1.04), run_time=0.45)
        self.au_mot("puis les angles")
        l2 = self.t("puis les angles.", 38)
        self.col(l2, 0.85, xl=0.6)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.35)
        self.au_mot("Les petits traits")
        l3 = self.bloc(["Les petits traits", "donnent un nom."], 34, AMBRE)
        self.col(l3, -0.2, xl=0.6)
        self.play(FadeIn(l3, shift=UP * 0.1), Create(codage(A, B, 1, couleur=WHITE)), Create(codage(B, C, 1, couleur=WHITE)), run_time=0.45)
        self.au_mot("Le petit carré")
        l4 = self.bloc(["Le petit carré", "en donne un autre."], 34, AMBRE)
        self.col(l4, -1.35, xl=0.6)
        self.play(FadeIn(l4, shift=UP * 0.1), Create(coin_droit(B, C, A, c=0.45, couleur=WHITE, sw=7)), run_time=0.45)
        self.attendre_voix()

    # ── 04 : QUESTION 1 ─────────────────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        f = Tri.par_angles(90, 35, 4.2, P(-3.4, -1.2), r_point=0.09)
        A, B, C = f.sommets
        c = coin_droit(B, C, A, c=0.38, couleur=WHITE, sw=7)

        def avant(sc):
            sc.play(FadeIn(f), FadeIn(c), run_time=0.3)

        def apres(sc):
            sc.play(Indicate(c, color=VERT_OK, scale_factor=1.8), run_time=0.5)

        self.question_pause("04-question", "04b-reponse", ["Ce triangle porte un", "petit carré, et aucun", "petit trait. Sa nature ?"],
                            [self.t("rectangle", 32), self.t("isocèle", 32), self.t("rectangle isocèle", 30)], 0,
                            ["Un seul codage :", "l'angle droit."], mot_q="Ce triangle", avant_q=avant, autres_r=apres)

    # ── 05 ──────────────────────────────────────────────────────────────────
    def ecran_equilateral(self):
        self.ecran("05-equilateral")
        f = Tri.par_cotes(5, 5, 5, 0.86, P(-3.5, 0.0), sw=8, r_point=0.09)
        A, B, C = f.sommets
        self.au_mot("Et un triangle")
        l0 = self.t("Et un triangle équilatéral ?", 36, JAUNE_TITRE)
        self.col(l0, 2.95, xl=0.3)
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(f), run_time=0.4)
        self.au_mot("Il a trois")
        cs = [codage(B, C, 1, couleur=AMBRE), codage(C, A, 1, couleur=AMBRE), codage(A, B, 1, couleur=AMBRE)]
        l1 = self.t("Il a trois côtés égaux,", 34)
        self.col(l1, 2.35, xl=0.3)
        self.play(FadeIn(l1, shift=UP * 0.1), *[Create(x) for x in cs], run_time=0.4)
        self.au_mot("donc au moins")
        l2 = self.t("donc au moins deux.", 34)
        self.col(l2, 1.82, xl=0.3)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.3)
        self.au_mot("Il est aussi")
        l3 = self.t("Il est aussi isocèle !", 36, VERT_OK)
        self.col(l3, 1.27, xl=0.3)
        self.play(FadeIn(l3, scale=1.1), run_time=0.35)
        self.au_mot("Mais on dit")
        l4 = self.bloc(["Mais on dit équilatéral :", "c'est plus précis."], 30)
        self.col(l4, 0.42, xl=0.3)
        self.play(FadeIn(l4[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("c'est plus")
        self.play(FadeIn(l4[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("L'inverse")
        l5 = self.bloc(["L'inverse est faux :", "un isocèle n'est pas", "toujours équilatéral."], 30, ROUGE_ERREUR)
        self.col(l5, -1.0, xl=0.3)
        G = VGroup(f, *cs)
        self.play(FadeIn(l5[0], shift=UP * 0.1), G.animate.scale(0.62).move_to(P(-5.1, 1.0)), run_time=0.4)
        g = Tri.par_cotes(3, 5.4, 5.4, 0.52, P(-2.6, -0.3), sw=6, r_point=0.06)
        g.add(codage(g.sommets[0], g.sommets[1], 1, couleur=AMBRE), codage(g.sommets[2], g.sommets[0], 1, couleur=AMBRE))
        self.au_mot("un isocèle n'est")
        self.play(FadeIn(l5[1], shift=UP * 0.1), FadeIn(g, scale=0.8), run_time=0.35)
        self.au_mot("toujours")
        self.play(FadeIn(l5[2], shift=UP * 0.1), run_time=0.3)
        self.attendre_voix()

    # ── 06 ──────────────────────────────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        self.au_mot("Attention")
        tit = self.t("Attention !", 50, ROUGE_ERREUR)
        self.col(tit, 2.75, xl=0.7)
        self.play(Write(tit), run_time=0.35)
        f = Tri.par_angles(88, 42, 4.3, P(-3.5, -0.75), sw=8, r_point=0.09)
        A, B, C = f.sommets
        self.play(FadeIn(f), run_time=0.25)
        self.au_mot("Ce triangle")
        l1 = self.t("Ce triangle a l'air rectangle.", 34)
        self.col(l1, 1.85, xl=0.7)
        q = self.t("?", 66, ROUGE_ERREUR).move_to(B + UP * 0.62 + RIGHT * 0.62)
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(q, scale=1.5), run_time=0.4)
        self.au_mot("Ce n'est pas")
        l2 = self.t("Ce n'est pas une preuve.", 34, ROUGE_ERREUR)
        self.col(l2, 1.1, xl=0.7)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.3)
        self.au_mot("Un dessin")
        l3 = self.t("Un dessin peut tromper.", 34)
        self.col(l3, 0.35, xl=0.7)
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.3)
        self.au_mot("Il faut")
        l4 = self.t("Il faut le petit carré,", 34, VERT_OK)
        self.col(l4, -0.55, xl=0.7)
        cd = coin_droit(P(4.75, -0.8), P(5.6, -0.8), P(4.75, 0.05), c=0.34, couleur=VERT_OK, sw=7)
        self.play(FadeIn(l4, shift=UP * 0.1), run_time=0.35)
        self.au_mot("ou une mesure")
        l5 = self.t("ou une mesure de 90°.", 34, VERT_OK)
        self.col(l5, -1.3, xl=0.7)
        self.play(FadeIn(l5[:13], shift=UP * 0.1), run_time=0.3)
        self.au_mot("90 degrés")
        self.play(FadeIn(l5[13:], scale=1.2), run_time=0.25)
        self.attendre_voix()

    # ── 07 : QUESTION 2 ─────────────────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        f = Tri.par_cotes(5, 5, 5, 0.72, P(-3.4, -0.9), r_point=0.09)
        A, B, C = f.sommets
        cs = VGroup(codage(B, C, 1, couleur=AMBRE), codage(C, A, 1, couleur=AMBRE), codage(A, B, 1, couleur=AMBRE))

        def avant(sc):
            sc.play(FadeIn(f), Create(cs), run_time=0.3)

        def apres(sc):
            lbs = []
            for s, p, q in ((A, B, C), (B, C, A), (C, A, B)):
                u, v = (p - s) / np.linalg.norm(p - s), (q - s) / np.linalg.norm(q - s)
                b = (u + v) / np.linalg.norm(u + v)
                t = sc.t("60°", 28, AMBRE).move_to(s + b * 1.0)
                t.sans_synchro = True
                lbs.append(VGroup(arc_angle(s, p, q, r=0.5, sw=6), t))
            lg = sc.ligne_rep(0, ["Trois fois", "60°."])
            lg[1].sans_synchro = True
            l2 = sc.ph_q[1]
            sc.au_mot("Ses trois")
            sc.play(FadeIn(lg[0], shift=UP * 0.1), run_time=0.3)
            sc.au_mot("60 degrés")
            sc.play(FadeIn(lg[1], scale=1.1), *[FadeIn(x, scale=1.3) for x in lbs], run_time=0.35)
            sc.au_mot("Aucun")
            sc.play(FadeIn(l2, shift=UP * 0.1), run_time=0.3)
            sc.rep_fini()

        self.question_pause("07-question", "07b-reponse", ["Un triangle équilatéral", "peut-il être rectangle ?"],
                            [self.t("oui, s'il est grand", 32), self.t("oui, bien tourné", 32), self.t("non, jamais", 32)], 2,
                            ["Trois fois 60°.", "Aucun n'est droit."], mot_q="Un triangle", avant_q=avant, autres_r=apres)

    # ── 08 : le défi ────────────────────────────────────────────────────────
    def figure_defi(self):
        return Tri.par_cotes(6, 7, 7, 0.56, P(-3.6, -0.6), noms=("S", "T", "U"), fs=50, sw=8, r_point=0.11)

    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        f = self.figure_defi()
        S, T, U = f.sommets
        self.au_mot("Un triangle")
        l1 = self.t("Un triangle est isocèle en S.", 32, AMBRE)
        self.col(l1, 2.2, xl=0.4)
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(f), Create(codage(S, T, 1, couleur=AMBRE)), Create(codage(U, S, 1, couleur=AMBRE)), run_time=0.4)
        self.au_mot("Son périmètre")
        l2 = self.t("Son périmètre mesure 20 cm.", 32)
        self.col(l2, 1.45, xl=0.4)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.4)
        self.au_mot("Sa base")
        l3 = self.t("Sa base mesure 6 cm.", 32)
        self.col(l3, 0.7, xl=0.4)
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.3)
        self.au_mot("6 centimètres")
        m = mesure(self, T, U, "6 cm", f.centre_)
        m.sans_synchro = True
        self.play(FadeIn(m, scale=1.4), run_time=0.25)
        self.au_mot("Combien")
        l4 = self.bloc(["Combien mesure chacun", "des deux côtés égaux ?"], 34, ORANGE_RETENUE)
        self.col(l4, -0.35, xl=0.4)
        q1, q2 = mesure(self, S, T, "?", f.centre_, 44, ORANGE_RETENUE), mesure(self, U, S, "?", f.centre_, 44, ORANGE_RETENUE)
        self.play(FadeIn(l4, shift=UP * 0.1), FadeIn(q1, scale=1.5), FadeIn(q2, scale=1.5), run_time=0.35)
        self.pause_defi(y=-1.5)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        f = self.figure_defi()
        S, T, U = f.sommets
        m = mesure(self, T, U, "6 cm", f.centre_)
        m.sans_synchro = True
        self.add(f, m, codage(S, T, 1, couleur=AMBRE), codage(U, S, 1, couleur=AMBRE))
        self.play(Write(tit), run_time=0.35)

        def calc(y, *morceaux):
            x = 0.4
            for txt, cle, n, co in morceaux:
                t = self.t(txt, 40, co)
                t.sans_synchro = True
                t.move_to(P(x + t.width / 2, y))
                x += t.width + 0.2
                if cle:
                    self.au_mot(cle, n)
                    self.play(FadeIn(t, scale=1.25), run_time=0.2)
                else:
                    self.add(t)

        self.au_mot("Sans la base")
        l1 = self.t("Sans la base, il reste :", 34)
        self.col(l1, 2.25, xl=0.4)
        self.play(FadeIn(l1, shift=UP * 0.1), m.animate.set_opacity(0.3), run_time=0.3)
        calc(1.5, ("20", "20 moins", 1, WHITE), ("−", None, 0, WHITE), ("6", "6 :", 1, WHITE), ("=", None, 0, WHITE), ("14 cm", "14 centimètres", 1, AMBRE))
        self.au_mot("Les deux côtés")
        l2 = self.bloc(["Les deux côtés égaux", "se partagent 14."], 34)
        self.col(l2, 0.45, xl=0.4)
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("se partagent")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.3)
        calc(-0.6, ("14", "14 divisé", 1, WHITE), ("÷", None, 0, WHITE), ("2", "2 :", 1, WHITE), ("=", None, 0, WHITE), ("7", "7. Chaque", 1, AMBRE))
        self.au_mot("Chaque côté")
        l3 = self.t("Chaque côté mesure 7 cm.", 36, VERT_OK)
        self.col(l3, -1.6, xl=0.4)
        q1, q2 = mesure(self, S, T, "7 cm", f.centre_, couleur=VERT_OK), mesure(self, U, S, "7 cm", f.centre_, couleur=VERT_OK)
        q1.sans_synchro = q2.sans_synchro = True
        self.play(FadeIn(l3[:16], shift=UP * 0.1), run_time=0.35)
        self.au_mot("7 centimètres")
        self.play(FadeIn(l3[16:], scale=1.2), FadeIn(q1, scale=1.4), FadeIn(q2, scale=1.4), run_time=0.3)
        self.attendre_voix()

    # ── 09 ──────────────────────────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        A, B, C, _ = gateau(ORIGIN, 2.2)
        f = Tri(A, B, C, sw=6, r_point=0.06, couleur=CREME, fond=0.25)
        f.add(codage(A, B, 1, couleur=WHITE, lg=0.13), codage(B, C, 1, couleur=WHITE, lg=0.13), coin_droit(B, C, A, c=0.3, couleur=WHITE, sw=5))
        self.add(f)
        lignes = self.finale_colonne(figure=f, textes=[
            ("On lit les côtés, puis les angles.",), ("Un triangle peut être", "rectangle et isocèle."),
            ("Un équilatéral est aussi isocèle.",), ("Un dessin ne prouve", "rien sans codage.")], fs=32)
        for i, cle in enumerate(("On lit", "Un triangle", "Un équilatéral", "Et un dessin")):
            self.au_mot(cle)
            self.montrer_ligne(lignes[i])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_deux_noms()
        self.ecran_methode()
        self.ecran_question1()
        self.ecran_equilateral()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")


class TriangleDefi6e(TriangleDefiBase):
    identite = "Maths 6e — EleveAI"
    ceinture = "verte"
