# pythagore_hypotenuse.py
# EleveAI — Maths 4e — Pythagore, épisode 3 : calculer l'hypoténuse
# (notionId : pythagore_theoreme, micro : pythagore_calculer_hypotenuse), AVEC VOIX.
#
# ⭐ Série « une paysage par micro + son short jumeau » (Frédéric, 12/10/2026).
# Ceinture JAUNE. L'image commune avec le short : le CHAMP DE CANNES de 30 m sur
# 40 m, traversé en diagonale (50 m au lieu de 70). Nombres de la micro du coach :
# 3-4-5, 6-8-10 ; l'arrondi (5 et 7 → √74 ≈ 8,6) vient de la feuille d'exercices.
# ⭐ L'écran 03 reprend le CARRELAGE de l'épisode 2 : les 9 + 16 carreaux des
# petits carrés vont remplir les 25 cases du carré de l'hypoténuse.
#
# Voix : manim/voix/4e-pythagore-hypotenuse.json (Julie, débit −7), validée le 12/10 (« go »).
# Rendu : python -m manim render -qh --disable_caching manim/scripts/4e/pythagore_hypotenuse.py PythagoreHypotenuse4e -o eleveai-maths-4e-pythagore-hypotenuse --media_dir manim/scripts/4e/media
# Puis copier le mp4 dans manim/sorties/4e/maths/pythagore/03-hypotenuse-calcul/.

import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parent))

from pythagore_carre_racine import COTE, CARREAU, PythagoreCarreRacine4e  # noqa: E402  (pose les chemins)
from pythagore_reconnaitre import P, Notion4e, PythagoreReconnaitre4e, echelle_ceintures  # noqa: E402

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_trigo import COUL_HYP  # noqa: E402

CANNE = "#3F7D20"
COUL_DROIT = BLEU_CALCUL

# Le champ, vu du ciel : 40 m sur 30 m, à 0,15 unité par mètre.
SO, SE, NE, NO = P(-5.6, -2.55), P(0.4, -2.55), P(0.4, 1.95), P(-5.6, 1.95)


class PythagoreHypotenuse4e(Notion4e):
    nom_voix = "4e-pythagore-hypotenuse"

    # Les dessins des épisodes 1 et 2, repris tels quels.
    t = PythagoreCarreRacine4e.t
    carre_de = PythagoreCarreRacine4e.carre_de
    carre_sur = PythagoreCarreRacine4e.carre_sur
    carre_droit = PythagoreReconnaitre4e.carre_droit
    tri_rect = PythagoreReconnaitre4e.tri_rect

    def ligne(self, texte, y, font_size=36, color=WHITE, x=3.4):
        return self.t(texte, font_size, color).move_to(P(x, y))

    # ── le champ ────────────────────────────────────────────────────────────

    def champ(self, echelle=1.0, centre=None):
        """Le champ de cannes vu du ciel : un rectangle vert rayé de rangs de cannes."""
        fond = Polygon(SO, SE, NE, NO, stroke_color=WHITE, stroke_width=3,
                       fill_color=CANNE, fill_opacity=0.55)
        rangs = VGroup(*[Line(P(SO[0] + 0.15, y), P(SE[0] - 0.15, y), color="#A3D977",
                              stroke_width=1.5, stroke_opacity=0.6)
                         for y in np.arange(SO[1] + 0.3, NO[1] - 0.1, 0.3)])
        bas = self.t("40 m", 30, COTE).next_to(Line(SO, SE), DOWN, buff=0.15)
        droite = self.t("30 m", 30, COTE).next_to(Line(SE, NE), RIGHT, buff=0.15)
        g = VGroup(fond, rangs, bas, droite)
        if centre is not None:
            g.scale(echelle).move_to(P(*centre))
        g.coins = [fond.get_vertices()[k] for k in range(4)]  # SO, SE, NE, NO après mise à l'échelle
        return g

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("Calculer l'hypoténuse", 60, JAUNE_TITRE).to_edge(UP, buff=0.7)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.25)
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2))
        self.au_mot("Pour traverser")
        q1 = self.t("Un champ de cannes en diagonale :", 40, BLEU_CALCUL)
        q2 = self.t("combien de mètres ?", 40, BLEU_CALCUL)
        VGroup(q1, q2).arrange(DOWN, buff=0.2).move_to(P(0, 0.2))
        self.play(FadeIn(q1, shift=UP * 0.2))
        self.play(FadeIn(q2, shift=UP * 0.2))
        self.play(FadeIn(echelle_ceintures("jaune").move_to(P(-0.6, -2.4))))
        self.attendre_voix(marge=1.0)

    # ── 01 : le champ ───────────────────────────────────────────────────────

    def ecran_champ(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-champ")
        c = self.champ()
        self.play(FadeIn(c[0]), Create(c[1]), run_time=1.2)
        self.au_mot("40 mètres de long")
        self.play(FadeIn(c[2]))
        self.au_mot("30 mètres de large")
        self.play(FadeIn(c[3]))
        self.au_mot("on peut longer les bords")
        marcheur = Dot(SO, radius=0.13, color=JAUNE_TITRE)
        chemin = VGroup(Line(SO, SE), Line(SE, NE)).set_stroke(COTE, 8)
        self.add(marcheur)
        self.play(Create(chemin[0]), marcheur.animate.move_to(SE), run_time=1.2, rate_func=linear)
        self.play(Create(chemin[1]), marcheur.animate.move_to(NE), run_time=0.9, rate_func=linear)
        self.play(FadeIn(self.ligne("par les bords : 70 m", 1.3, 34, COTE, x=4.0)))
        self.au_mot("Ou couper en diagonale")
        diag = DashedLine(SO, NE, color=COUL_HYP, stroke_width=8, dash_length=0.2)
        self.play(marcheur.animate.move_to(SO), run_time=0.4)
        self.play(Create(diag), marcheur.animate.move_to(NE), run_time=1.6, rate_func=linear)
        self.au_mot("Combien mesure la diagonale")
        q = self.t("?", 60, COUL_HYP).move_to((SO + NE) / 2 + UL * 0.45)
        self.play(Write(q), FadeIn(self.ligne("en diagonale : ?", 0.3, 34, COUL_HYP, x=4.0)))
        self.attendre_voix()

    # ── 02 : le triangle ────────────────────────────────────────────────────

    def ecran_triangle(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-triangle")
        c = self.champ()
        self.add(c)
        self.au_mot("coupe le champ en deux")
        haut = Polygon(SO, NE, NO, stroke_width=0, fill_color=BLACK, fill_opacity=0.55)
        tri = Polygon(SO, SE, NE, color=WHITE, stroke_width=6)
        self.play(FadeIn(haut), Create(tri))
        self.au_mot("L'angle droit est au coin")
        carre = self.carre_droit(SE, LEFT, UP, s=0.4)
        self.play(GrowFromCenter(carre))
        self.play(Indicate(carre, color=COUL_DROIT, scale_factor=1.6))
        self.play(FadeIn(self.ligne("angle droit au coin", 1.4, 32, COUL_DROIT, x=4.0)))
        self.au_mot("La diagonale est en face")
        self.play(Create(Line(SO, NE, color=COUL_HYP, stroke_width=10)))
        nom = self.ligne("l'hypoténuse", 0.3, 50, COUL_HYP, x=4.0)
        self.play(Write(nom))
        self.play(Circumscribe(nom, color=COUL_HYP))
        self.attendre_voix()

    # ── 03 : le théorème, en carreaux ───────────────────────────────────────

    def ecran_theoreme(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-theoreme")
        self.titre_ecran("Le théorème de Pythagore")
        u = 0.4
        A = P(-4.0, -1.6)
        B, C = A + RIGHT * 4 * u, A + UP * 3 * u
        tri = Polygon(A, B, C, color=WHITE, stroke_width=5)
        c3 = self.carre_sur(A, C, 3, B, color=BLEU_CALCUL)
        c4 = self.carre_sur(A, B, 4, C, color=BLEU_CALCUL)
        c5 = self.carre_sur(C, B, 5, A, color=CARREAU, opacite=0.0)  # les cases vides, à remplir
        self.play(Create(tri), GrowFromCenter(self.carre_droit(A, RIGHT, UP, s=0.22)))
        self.au_mot("le carré de l'hypoténuse est égal")
        enonce = VGroup(self.t("hypoténuse²", 36, COUL_HYP), self.t("=", 36),
                        self.t("côté² + côté²", 36, BLEU_CALCUL)).arrange(RIGHT, buff=0.2).move_to(P(2.9, 2.0))
        self.play(Write(enonce))
        self.au_mot("3 sur 3")
        self.play(LaggedStart(*[FadeIn(k) for k in c3], lag_ratio=0.05), run_time=0.9)
        self.play(FadeIn(self.ligne("3 × 3 = 9", 0.9, 38, BLEU_CALCUL, x=2.9)))
        self.au_mot("4 sur 4")
        self.play(LaggedStart(*[FadeIn(k) for k in c4], lag_ratio=0.04), run_time=0.9)
        self.play(FadeIn(self.ligne("4 × 4 = 16", 0.1, 38, BLEU_CALCUL, x=2.9)))
        self.au_mot("9 plus 16")
        self.play(Create(c5), run_time=0.8)
        # Les 9 + 16 carreaux vont remplir les 25 cases du grand carré.
        sources = [k.copy() for k in list(c3) + list(c4)]
        self.add(*sources)
        cibles = [k.copy().set_fill(CARREAU, 0.7) for k in c5]
        self.play(*[Transform(s, cbl) for s, cbl in zip(sources, cibles)], run_time=2.0)
        self.play(FadeIn(self.ligne("9 + 16 = 25", -0.7, 42, CARREAU, x=2.9)))
        self.au_mot("Exactement le carré")
        res = self.ligne("= 5 × 5 : l'hypoténuse mesure 5", -1.5, 30, VERT_OK, x=2.7)
        self.play(Write(res))
        self.play(Circumscribe(enonce, color=JAUNE_TITRE))
        self.attendre_voix()

    # ── 04 : la méthode, sur le champ ───────────────────────────────────────

    def ecran_methode(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-methode")
        self.titre_ecran("La méthode en trois lignes")
        c = self.champ(echelle=0.55, centre=(-4.4, 0.4))
        so, se, ne = c.coins[0], c.coins[1], c.coins[2]
        self.play(FadeIn(c))
        self.play(Create(Line(so, ne, color=COUL_HYP, stroke_width=7)))
        x0 = 2.2
        e1 = self.t("1. J'écris l'égalité.", 30, GRAY_B).move_to(P(x0, 2.0))
        e2 = self.t("2. Je calcule et j'additionne les carrés.", 30, GRAY_B).move_to(P(x0, 1.5))
        e3 = self.t("3. Je prends la racine carrée.", 30, GRAY_B).move_to(P(x0, 1.0))
        for e, mot in [(e1, "Un : j'écris"), (e2, "Deux : je calcule"), (e3, "Trois : je prends")]:
            self.au_mot(mot)
            self.play(FadeIn(e, shift=RIGHT * 0.2))
        self.au_mot("Pour le champ")
        l1 = self.t("diagonale² = 30² + 40²", 38).move_to(P(x0, 0.1))
        self.play(Write(l1))
        self.au_mot("30 au carré, 900")
        l2 = self.t("= 900 + 1 600", 38).move_to(P(x0 + 0.4, -0.65))
        self.play(FadeIn(l2))
        self.au_mot("900 plus 1600")
        l3 = self.t("= 2 500", 38).move_to(P(x0 - 0.4, -1.35))
        self.play(FadeIn(l3))
        self.au_mot("Racine carrée de 2500")
        l4 = VGroup(self.t("diagonale =", 40, VERT_OK), self.radical("2 500", font_size=40, color=VERT_OK),
                    self.t("= 50 m", 40, VERT_OK)).arrange(RIGHT, buff=0.2).move_to(P(x0, -2.1))
        self.play(Write(l4))
        self.au_mot("20 mètres de moins")
        self.play(FadeIn(self.t("70 − 50 = 20 m de gagnés", 26, VERT_OK).move_to(P(-4.4, -1.6))))
        self.attendre_voix()

    # ── 05 : piège 1, additionner les longueurs ─────────────────────────────

    def ecran_piege_longueurs(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-piege-longueurs")
        self.titre_ecran("Piège 1 : additionner les longueurs")
        c = self.champ(echelle=0.7, centre=(-3.6, -0.3))
        so, se, ne = c.coins[0], c.coins[1], c.coins[2]
        self.add(c)
        self.au_mot("30 plus 40")
        self.play(Create(VGroup(Line(so, se), Line(se, ne)).set_stroke(COTE, 8)))
        faux = self.ligne("30 + 40 = 70", 1.2, 46, ROUGE_ERREUR, x=3.3)
        self.play(Write(faux))
        self.au_mot("c'est le chemin par les bords")
        self.play(FadeIn(self.ligne("= le chemin par les bords", 0.4, 30, COTE, x=3.3)))
        self.play(Create(Line(faux.get_left(), faux.get_right(), color=ROUGE_ERREUR, stroke_width=6)))
        self.au_mot("On additionne les carrés")
        regle = VGroup(self.t("On additionne les CARRÉS,", 34, VERT_OK),
                       self.t("pas les longueurs.", 34, VERT_OK)).arrange(DOWN, buff=0.15).move_to(P(3.3, -0.9))
        self.play(Write(regle))
        self.attendre_voix()

    # ── 06 : piège 2, oublier la racine ─────────────────────────────────────

    def ecran_piege_racine(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-piege-racine")
        self.titre_ecran("Piège 2 : oublier la racine")
        faux = self.ligne("diagonale = 2 500 m", 1.8, 46, ROUGE_ERREUR, x=-0.5)
        self.play(Write(faux))
        self.au_mot("c'est le carré de la diagonale")
        self.play(Create(Line(faux.get_left(), faux.get_right(), color=ROUGE_ERREUR, stroke_width=6)))
        self.play(FadeIn(self.ligne("2 500, c'est diagonale²", 1.0, 34, ORANGE_RETENUE, x=-0.5)))
        self.au_mot("Pour contrôler")
        axe = NumberLine(x_range=[0, 80, 10], length=10, include_numbers=False, color=WHITE).move_to(P(-0.5, -0.6))
        self.play(Create(axe))
        marques = VGroup()
        for v, txt, coul in [(40, "40", COTE), (70, "70", COTE), (50, "50", VERT_OK)]:
            d = Dot(axe.n2p(v), radius=0.12, color=coul)
            marques.add(VGroup(d, self.t(txt, 32, coul).next_to(d, UP, buff=0.2)))
        self.play(FadeIn(marques[0]), FadeIn(self.t("plus long côté", 22, COTE).next_to(axe.n2p(40), DOWN, buff=0.3)))
        self.play(FadeIn(marques[1]), FadeIn(self.t("bout à bout", 22, COTE).next_to(axe.n2p(70), DOWN, buff=0.3)))
        self.au_mot("50 est entre 40 et 70")
        zone = Line(axe.n2p(40), axe.n2p(70), color=VERT_OK, stroke_width=10)
        self.play(Create(zone), FadeIn(marques[2]))
        self.play(Write(self.chute("50 est entre 40 et 70 : c'est cohérent.", color=VERT_OK, font_size=34)))
        self.attendre_voix()

    # ── 07 : quand la racine ne tombe pas juste ─────────────────────────────

    def ecran_arrondi(self):
        self.clear()
        self.add_mascotte()
        self.dire("07-arrondi")
        self.titre_ecran("Quand la racine ne tombe pas juste")
        u = 0.42
        A = P(-5.4, -1.8)
        B, C = A + RIGHT * 7 * u, A + UP * 5 * u
        contour, carre, hyp, _ = self.tri_rect(A, B, C)
        self.play(Create(contour), GrowFromCenter(carre))
        self.au_mot("5 centimètres et 7")
        self.play(FadeIn(self.t("5 cm", 30, COTE).next_to(Line(A, C), LEFT, buff=0.15)),
                  FadeIn(self.t("7 cm", 30, COTE).next_to(Line(A, B), DOWN, buff=0.15)))
        self.au_mot("25 plus 49")
        self.play(Write(self.ligne("5² + 7² = 25 + 49 = 74", 1.6, 38, x=2.7)))
        self.au_mot("la calculatrice donne")
        rac = VGroup(self.radical(74, font_size=40), self.t("= 8,602…", 40, BLEU_CALCUL)).arrange(RIGHT, buff=0.2)
        ecran = SurroundingRectangle(rac, color=GRAY_B, buff=0.25, corner_radius=0.1)
        self.play(Create(hyp), FadeIn(VGroup(rac, ecran).move_to(P(2.7, 0.4))))
        self.au_mot("On arrondit au dixième")
        res = self.ligne("hypoténuse ≈ 8,6 cm", -0.9, 44, VERT_OK, x=2.7)
        self.play(Write(res))
        self.play(FadeIn(self.t("≈ 8,6 cm", 28, COUL_HYP).move_to((B + C) / 2 + UR * 0.4)))
        self.attendre_voix()

    # ── 08 : défi ───────────────────────────────────────────────────────────

    def triangle_defi(self):
        u = 0.36
        E = P(-5.0, -1.6)
        F, D = E + RIGHT * 8 * u, E + UP * 6 * u
        return E, F, D, self.tri_rect(E, F, D, lettres="EFD")

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        E, F, D, (contour, carre, hyp, lab) = self.triangle_defi()
        self.au_mot("Le triangle DEF")
        self.play(Create(contour), FadeIn(lab), GrowFromCenter(carre))
        self.au_mot("DE égale 6")
        self.play(FadeIn(self.t("6 cm", 30, COTE).next_to(Line(E, D), LEFT, buff=0.15)))
        self.au_mot("EF égale 8")
        self.play(FadeIn(self.t("8 cm", 30, COTE).next_to(Line(E, F), DOWN, buff=0.15)))
        self.au_mot("Combien mesure DF")
        self.play(Write(self.ligne("DF = ?", 0.6, 56, COUL_HYP, x=2.8)))
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=36)))
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("08b-correction")
        self.titre_ecran("Correction")
        E, F, D, (contour, carre, hyp, lab) = self.triangle_defi()
        self.add(contour, lab, carre,
                 self.t("6 cm", 30, COTE).next_to(Line(E, D), LEFT, buff=0.15),
                 self.t("8 cm", 30, COTE).next_to(Line(E, F), DOWN, buff=0.15))
        self.au_mot("l'hypoténuse est DF")
        self.play(Create(hyp), FadeIn(self.ligne("rectangle en E : hypoténuse DF", 2.0, 30, COUL_HYP, x=2.6)))
        self.au_mot("DF au carré égale")
        self.play(Write(self.ligne("DF² = 6² + 8²", 1.1, 40, x=2.6)))
        self.au_mot("36 plus 64")
        self.play(FadeIn(self.ligne("= 36 + 64 = 100", 0.3, 40, x=2.9)))
        self.au_mot("DF égale racine carrée")
        res = VGroup(self.t("DF =", 44, VERT_OK), self.radical(100, font_size=44, color=VERT_OK),
                     self.t("= 10 cm", 44, VERT_OK)).arrange(RIGHT, buff=0.2).move_to(P(2.6, -0.6))
        self.play(Write(res))
        self.au_mot("Contrôle")
        self.play(FadeIn(VGroup(self.coche(), self.t("8 < 10 < 14", 34, VERT_OK)).arrange(RIGHT, buff=0.25)
                         .move_to(P(2.6, -1.5))))
        self.attendre_voix()

    # ── 09 : ce que tu sais faire maintenant ────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("09-finale")
        self.play(Write(self.t("Ce que tu sais faire maintenant", 44, JAUNE_TITRE).to_edge(UP)))
        questions = [
            ("Écrire l'égalité", "Écrire l'égalité de Pythagore ?"),
            ("Additionner les carrés", "Additionner les carrés, puis prendre la racine ?"),
            ("Arrondir", "Arrondir quand la racine ne tombe pas juste ?"),
        ]
        lignes = VGroup(*[VGroup(self.coche(), self.t(txt, 30)).arrange(RIGHT, buff=0.3) for _, txt in questions])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.55).move_to(P(-0.3, 0.5))
        for (mot, _), l in zip(questions, lignes):
            self.au_mot(mot)
            self.play(FadeIn(l[1], shift=RIGHT * 0.2), run_time=0.6)
            self.play(Create(l[0]), run_time=0.4)
        self.au_mot("Alors l'épisode 4")
        self.play(Write(self.chute("Épisode 4 : calculer un côté de l'angle droit", color=VERT_OK, font_size=36)))
        self.attendre_voix(marge=1.0)

    # ── déroulé ─────────────────────────────────────────────────────────────

    def construct(self):
        self.page_de_garde()
        self.ecran_champ()
        self.ecran_triangle()
        self.ecran_theoreme()
        self.ecran_methode()
        self.ecran_piege_longueurs()
        self.ecran_piege_racine()
        self.ecran_arrondi()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="10-abonne")
