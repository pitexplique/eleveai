# pythagore_reconnaitre.py
# EleveAI — Maths 4e — Pythagore, épisode 1 : l'hypoténuse
# (notionId : pythagore_theoreme, micro : pythagore_reconnaitre), AVEC VOIX.
#
# ⭐ 12/10/2026 : PREMIÈRE PAIRE « une paysage par micro + son short jumeau »
# (Frédéric : « pour une fois j'aimerais faire paysage pour les micros avec son
# jumeau short »). La paysage est courte (une micro), ceinture JAUNE ; le short
# jumeau (ceinture blanche) reprend la même image : l'échelle contre la case.
#
# ⭐ LE CODE COULEUR PARTAGÉ AVEC LE SHORT : l'angle droit en BLEU, l'échelle et
# l'hypoténuse en ORANGE (la couleur de l'hypoténuse des vidéos de trigo).
#
# ⛔ 12/10/2026 : on n'ouvre ni sur une formule ni sur « ce que tu sauras
# faire ». Page de garde = le nom de la notion + sa question ; puis l'échelle.
# Le bilan « Ce que tu sais faire maintenant » est à la FIN, en questions.
#
# Voix : manim/voix/4e-pythagore-reconnaitre.json (Julie, débit −7).
# Rendu : python -m manim render -qh --disable_caching manim/scripts/4e/pythagore_reconnaitre.py PythagoreReconnaitre4e -o eleveai-maths-4e-pythagore-reconnaitre --media_dir manim/scripts/4e/media
# Puis copier le mp4 dans manim/sorties/4e/maths/pythagore/01-hypotenuse/ (la série a SON dossier, 12/10).
# En ligne : https://youtu.be/TBM5bum-xj4

import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "seconde"))

from manim import *

from charte import *
from gabarit_sixieme import Notion6e
from gabarit_trigo import COUL_HYP
from signes_expression_2de import echelle_ceintures

COUL_DROIT = BLEU_CALCUL  # l'angle droit, comme dans le short


class Notion4e(Notion6e):
    identite = "Maths 4e — EleveAI"


def P(x, y):
    return np.array([x, y, 0.0])


class PythagoreReconnaitre4e(Notion4e):
    nom_voix = "4e-pythagore-reconnaitre"

    def t(self, texte, font_size=34, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    # ── les dessins ─────────────────────────────────────────────────────────

    def carre_droit(self, sommet, u, v, s=0.3, color=COUL_DROIT):
        """Le petit carré de l'angle droit, en `sommet`, entre les directions u et v."""
        u = u / np.linalg.norm(u) * s
        v = v / np.linalg.norm(v) * s
        return Polygon(sommet, sommet + u, sommet + u + v, sommet + v,
                       color=color, stroke_width=4, fill_color=color, fill_opacity=0.35)

    def tri_rect(self, D, U, V, lettres=None):
        """Un triangle rectangle en D, d'autres sommets U et V (n'importe quelle position).

        Renvoie (contour, carré, hypoténuse orange) et, si `lettres` = « DUV »,
        les trois lettres posées dehors.
        """
        contour = Polygon(D, U, V, color=WHITE, stroke_width=4)
        carre = self.carre_droit(D, U - D, V - D)
        hyp = Line(U, V, color=COUL_HYP, stroke_width=10)
        lab = VGroup()
        if lettres:
            g = (D + U + V) / 3
            for nom, pt in zip(lettres, (D, U, V)):
                d = pt - g
                lab.add(self.t(nom, 32).move_to(pt + d / np.linalg.norm(d) * 0.38))
        return contour, carre, hyp, lab

    def case_et_echelle(self):
        """La case créole, le sol et l'échelle. A au pied du mur, C en haut, B au pied de l'échelle."""
        A, B, C = P(-3.2, -2.2), P(-0.4, -2.2), P(-3.2, 1.4)
        sol = Line(P(-6.8, -2.2), P(1.4, -2.2), color=GRAY_B, stroke_width=5)
        mur = Rectangle(width=3.0, height=3.9, stroke_color=WHITE, stroke_width=3,
                        fill_color="#14B8A6", fill_opacity=0.35).move_to(P(-4.7, -0.25))
        toit = Polygon(P(-6.5, 1.7), P(-2.9, 1.7), P(-4.7, 3.1), stroke_color=WHITE, stroke_width=3,
                       fill_color="#DC2626", fill_opacity=0.55)
        porte = Rectangle(width=0.8, height=1.5, stroke_color=WHITE, stroke_width=2,
                          fill_color="#7C2D12", fill_opacity=0.6).move_to(P(-5.0, -1.45))
        fenetre = Square(0.7, stroke_color=WHITE, stroke_width=2, fill_color="#FDE68A",
                         fill_opacity=0.4).move_to(P(-3.95, 0.35))
        case = VGroup(mur, toit, porte, fenetre)

        d = (C - B) / np.linalg.norm(C - B)
        n = np.array([-d[1], d[0], 0]) * 0.13
        rails = VGroup(Line(B + n, C + n), Line(B - n, C - n)).set_stroke(COUL_HYP, 5)
        L = np.linalg.norm(C - B)
        barreaux = VGroup(*[Line(B + d * k + n, B + d * k - n, color=COUL_HYP, stroke_width=4)
                            for k in np.arange(0.35, L - 0.1, 0.38)])
        echelle = VGroup(rails, barreaux)
        return case, sol, echelle, (A, B, C)

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("L'hypoténuse", 66, JAUNE_TITRE).to_edge(UP, buff=0.7)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.25)
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2))
        self.au_mot("Dans un triangle rectangle")
        q1 = self.t("Dans un triangle rectangle,", 40, BLEU_CALCUL)
        q2 = self.t("quel côté est le plus long ?", 40, BLEU_CALCUL)
        q = VGroup(q1, q2).arrange(DOWN, buff=0.2).move_to(P(0, 0.2))
        self.play(FadeIn(q1, shift=UP * 0.2))
        self.play(FadeIn(q2, shift=UP * 0.2))
        ech = echelle_ceintures("jaune").move_to(P(-0.6, -2.4))
        self.play(FadeIn(ech))
        self.attendre_voix(marge=1.0)

    # ── 01 : l'échelle ──────────────────────────────────────────────────────

    def ecran_echelle(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-echelle")
        case, sol, echelle, (A, B, C) = self.case_et_echelle()
        self.play(FadeIn(case), Create(sol))
        self.play(Create(echelle), run_time=1.5)
        self.au_mot("Le mur, le sol")
        m = Line(A, C, color=WHITE, stroke_width=8)
        s = Line(A, B, color=WHITE, stroke_width=8)
        lm = self.t("le mur", 30).move_to(P(3.6, 1.6))
        ls = self.t("le sol", 30).move_to(P(3.6, 0.9))
        le = self.t("l'échelle", 30, COUL_HYP).move_to(P(3.6, 0.2))
        self.play(Create(m), FadeIn(lm))
        self.play(Create(s), FadeIn(ls))
        self.au_mot("l'échelle : trois")
        self.play(Indicate(echelle, color=COUL_HYP), FadeIn(le))
        self.au_mot("Lequel est le plus long")
        q = self.t("Lequel est le plus long ?", 38, BLEU_CALCUL).move_to(P(3.4, -0.9))
        self.play(GrowFromCenter(q))
        self.au_mot("Sans rien mesurer")
        self.play(FadeIn(self.t("sans rien mesurer", 30, GRAY_B).next_to(q, DOWN, buff=0.3)))
        self.attendre_voix()

    # ── 02 : l'angle droit ──────────────────────────────────────────────────

    def ecran_angle_droit(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-angle-droit")
        case, sol, echelle, (A, B, C) = self.case_et_echelle()
        self.add(case, sol, echelle)
        self.au_mot("ils font un angle droit")
        coin = VGroup(Line(A, C, stroke_width=8), Line(A, B, stroke_width=8)).set_color(COUL_DROIT)
        self.play(Create(coin))
        self.play(FadeIn(self.t("angle droit", 34, COUL_DROIT).move_to(P(3.4, 1.8))))
        self.au_mot("petit carré")
        carre = self.carre_droit(A, RIGHT, UP, s=0.45)
        self.play(GrowFromCenter(carre))
        self.play(carre.animate.scale(1.6), run_time=0.5)
        self.play(carre.animate.scale(1 / 1.6), run_time=0.5)
        self.au_mot("L'échelle est en face")
        milieu = (B + C) / 2
        fleche = Arrow(A + UR * 0.35, milieu + DL * 0.15, color=COUL_DROIT, buff=0.05, stroke_width=6)
        self.play(GrowArrow(fleche))
        self.play(FadeIn(self.t("en face de l'angle droit", 32).move_to(P(3.4, 1.0))))
        self.au_mot("c'est elle")
        hyp = Line(B, C, color=COUL_HYP, stroke_width=14)
        self.play(Create(hyp))
        nom = self.t("l'hypoténuse", 56, COUL_HYP).move_to(P(3.4, -0.4))
        self.play(Write(nom))
        self.play(Circumscribe(nom, color=COUL_HYP))
        self.attendre_voix()

    # ── 03 : la définition ──────────────────────────────────────────────────

    def ecran_definition(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-definition")
        self.titre_ecran("L'hypoténuse")
        D, U, V = P(-5.2, -2.0), P(-1.2, -2.0), P(-5.2, 1.0)  # côtés 4, 3, 5
        contour, carre, hyp, _ = self.tri_rect(D, U, V)
        self.play(Create(contour))
        self.play(GrowFromCenter(carre))
        self.au_mot("en face de l'angle droit")
        self.play(Create(hyp))
        d1 = self.t("le côté en face", 34, COUL_HYP)
        d2 = self.t("de l'angle droit", 34, COUL_HYP)
        VGroup(d1, d2).arrange(DOWN, buff=0.15).move_to(P(3.2, 1.6))
        self.play(FadeIn(d1), FadeIn(d2))
        self.au_mot("toujours le plus long")
        # Les trois côtés se couchent côte à côte, comme des bâtons à comparer.
        x0, y0 = 1.0, -0.3
        cotes = [(Line(D, U, color=WHITE, stroke_width=8), 4.0),
                 (Line(D, V, color=WHITE, stroke_width=8), 3.0),
                 (Line(U, V, color=COUL_HYP, stroke_width=10), 5.0)]
        for i, (seg, lg) in enumerate(cotes):
            cible = Line(P(x0, y0 - 0.55 * i), P(x0 + lg, y0 - 0.55 * i),
                         color=seg.get_color(), stroke_width=seg.get_stroke_width())
            self.play(ReplacementTransform(seg, cible), run_time=0.8)
        self.play(Write(self.t("le plus long des trois", 34, COUL_HYP).move_to(P(3.5, -2.0))))
        self.attendre_voix()

    # ── 04 : la méthode ─────────────────────────────────────────────────────

    def ecran_methode(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-methode")
        self.titre_ecran("Trouver l'hypoténuse")
        A, B, C = P(-5.4, -1.8), P(-1.4, -1.8), P(-5.4, 1.2)
        contour, carre, hyp, lab = self.tri_rect(A, B, C, lettres="ABC")
        self.play(Create(contour), FadeIn(lab))
        self.au_mot("Un : je repère")
        e1 = self.t("1. Je repère l'angle droit.", 32).move_to(P(3.1, 1.8))
        self.play(FadeIn(e1), GrowFromCenter(carre))
        self.play(Indicate(carre, color=COUL_DROIT, scale_factor=1.8))
        self.au_mot("Deux : je prends")
        e2 = self.t("2. Le côté qui ne le touche pas.", 32).move_to(P(3.1, 1.0))
        self.play(FadeIn(e2))
        touche = VGroup(Line(A, B), Line(A, C)).set_stroke(GRAY_B, 8)
        self.play(Create(touche))
        self.play(FadeOut(touche))
        self.play(Create(hyp))
        self.au_mot("rectangle en A")
        r = self.t("ABC rectangle en A", 34, BLEU_CALCUL).move_to(P(3.1, -0.1))
        self.play(FadeIn(r))
        self.au_mot("sans la lettre A")
        self.play(FadeIn(self.t("→ le côté sans la lettre A", 32).move_to(P(3.1, -0.8))))
        self.au_mot("C'est BC")
        res = self.t("hypoténuse : BC", 44, VERT_OK).move_to(P(3.1, -1.7))
        self.play(Write(res))
        self.play(Circumscribe(res, color=VERT_OK))
        self.attendre_voix()

    # ── 05 : le triangle tourné ─────────────────────────────────────────────

    def ecran_tourne(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-tourne")
        self.titre_ecran("Piège 1 : le triangle est tourné")
        # Trois triangles rectangles ; l'hypoténuse en haut, à droite, en biais.
        tris = [
            (P(-4.6, -1.6), P(-6.1, -0.1), P(-3.1, -0.1)),   # angle droit en bas : hypoténuse en HAUT
            (P(-0.4, 1.2), P(-1.6, -1.6), P(1.7, 0.3)),      # hypoténuse en biais
            (P(3.0, -0.2), P(4.6, 1.4), P(4.6, -1.8)),       # hypoténuse VERTICALE
        ]
        objets = [self.tri_rect(*sommets) for sommets in tris]
        self.play(*[Create(o[0]) for o in objets])
        self.au_mot("Peu importe")
        for contour, carre, hyp, _ in objets:
            self.play(GrowFromCenter(carre), run_time=0.5)
            self.play(Create(hyp), run_time=0.6)
        self.au_mot("toujours en face")
        self.play(*[Indicate(o[2], color=COUL_HYP) for o in objets])
        self.play(Write(self.chute("Toujours EN FACE de l'angle droit.", color=COUL_HYP, font_size=34)))
        self.attendre_voix()

    # ── 06 : pas d'angle droit ──────────────────────────────────────────────

    def ecran_sans_angle_droit(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-sans-angle-droit")
        self.titre_ecran("Piège 2 : pas d'angle droit")
        tri = Polygon(P(-5.6, -1.6), P(-1.2, -1.2), P(-3.6, 1.6), color=WHITE, stroke_width=4)
        self.play(Create(tri))
        self.play(FadeIn(self.t("aucun angle droit", 32, GRAY_B).move_to(P(-3.4, -2.3))))
        self.au_mot("Alors pas d'hypoténuse")
        non = self.t("pas d'hypoténuse", 44, ROUGE_ERREUR).move_to(P(3.0, 0.8))
        self.play(Write(non))
        self.play(Wiggle(non))
        self.au_mot("Ce mot n'existe")
        self.play(FadeIn(self.t("seulement dans un", 32).move_to(P(3.0, -0.4))),
                  FadeIn(self.t("triangle rectangle", 36, COUL_DROIT).move_to(P(3.0, -1.0))))
        self.attendre_voix()

    # ── 07 : défi ───────────────────────────────────────────────────────────

    def triangle_defi(self):
        F = P(-2.6, 1.6)
        E = F + np.array([-1, -1, 0]) / np.sqrt(2) * 3.4
        G = F + np.array([1, -1, 0]) / np.sqrt(2) * 2.4
        return self.tri_rect(F, E, G, lettres="FEG")

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        contour, carre, hyp, lab = self.triangle_defi()
        self.au_mot("Le triangle EFG")
        self.play(Create(contour), FadeIn(lab))
        self.au_mot("rectangle en F")
        self.play(FadeIn(self.t("EFG rectangle en F", 36, BLEU_CALCUL).move_to(P(3.3, 1.4))),
                  GrowFromCenter(carre))
        self.au_mot("Quelle est son hypoténuse")
        self.play(Write(self.t("hypoténuse = ?", 48).move_to(P(3.3, 0.2))))
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=36)))
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("07b-correction")
        self.titre_ecran("Correction")
        contour, carre, hyp, lab = self.triangle_defi()
        self.add(contour, lab, carre)
        self.au_mot("Rectangle en F")
        self.play(Indicate(carre, color=COUL_DROIT, scale_factor=1.8))
        self.au_mot("sans la lettre F")
        self.play(FadeIn(self.t("le côté sans la lettre F", 32).move_to(P(3.3, 1.0))))
        self.play(Create(hyp))
        self.au_mot("L'hypoténuse est EG")
        res = self.t("hypoténuse : EG", 46, VERT_OK).move_to(P(3.3, -0.1))
        self.play(Write(res))
        self.play(Circumscribe(res, color=VERT_OK))
        self.attendre_voix()

    # ── 08 : ce que tu sais faire maintenant ────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-finale")
        self.play(Write(self.t("Ce que tu sais faire maintenant", 44, JAUNE_TITRE).to_edge(UP)))
        questions = [
            ("Repérer l'angle droit", "Repérer l'angle droit ?"),
            ("Trouver le côté en face", "Trouver le côté en face, même si le triangle est tourné ?"),
            ("Savoir qu'il n'y a pas", "Savoir qu'il n'y a pas d'hypoténuse sans angle droit ?"),
        ]
        lignes = VGroup(*[VGroup(self.coche(), self.t(txt, 30)).arrange(RIGHT, buff=0.3)
                          for _, txt in questions])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.55).move_to(P(-0.3, 0.5))
        for (mot, _), l in zip(questions, lignes):
            self.au_mot(mot)
            self.play(FadeIn(l[1], shift=RIGHT * 0.2), run_time=0.6)
            self.play(Create(l[0]), run_time=0.4)
        self.au_mot("Alors l'épisode 2")
        self.play(Write(self.chute("L'épisode 2 t'attend !", color=VERT_OK, font_size=40)))
        self.attendre_voix(marge=1.0)

    # ── déroulé ─────────────────────────────────────────────────────────────

    def construct(self):
        self.page_de_garde()
        self.ecran_echelle()
        self.ecran_angle_droit()
        self.ecran_definition()
        self.ecran_methode()
        self.ecran_tourne()
        self.ecran_sans_angle_droit()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="09-abonne")
