# pythagore_cote.py
# EleveAI — Maths 4e — Pythagore, épisode 4 : calculer un côté de l'angle droit
# (notionId : pythagore_theoreme, micro : pythagore_calculer_cote), AVEC VOIX.
#
# ⭐ Frédéric, 13/10/2026 : « on suit exactement les micros », « on prend
# l'exemple des figures du 3 en variant les lettres ». Les figures de l'épisode 3
# À L'ENVERS : l'hypoténuse est connue, on cherche un côté. Le champ 30-40-50,
# les carreaux 25 − 16 = 9, KLM (9 et 5 → √56 ≈ 7,5), le défi RST (6-8-10).
# ⛔ On ne parle que de SA micro : pas d'écran « on cherche l'hypoténuse : on additionne ».
#
# Voix : manim/voix/4e-pythagore-cote.json (Julie, débit −7).
# Rendu : python -m manim render -qh --disable_caching manim/scripts/4e/pythagore_cote.py PythagoreCote4e -o eleveai-maths-4e-pythagore-cote --media_dir manim/scripts/4e/media
# Puis copier le mp4 dans manim/sorties/4e/maths/pythagore/04-cote/.

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from pythagore_hypotenuse import (  # noqa: E402  (pose les chemins)
    COTE, COUL_DROIT, COUL_HYP, NE, SE, SO, P, PythagoreHypotenuse4e, echelle_ceintures,
)
from pythagore_carre_racine import CARREAU  # noqa: E402

from manim import *  # noqa: E402

from charte import *  # noqa: E402


class PythagoreCote4e(PythagoreHypotenuse4e):
    nom_voix = "4e-pythagore-cote"

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("Calculer un côté de l'angle droit", 54, JAUNE_TITRE).to_edge(UP, buff=0.7)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.25)
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2))
        self.au_mot("On connaît la diagonale")
        q1 = self.t("On connaît la diagonale du champ :", 40, BLEU_CALCUL)
        q2 = self.t("combien mesure sa largeur ?", 40, BLEU_CALCUL)
        VGroup(q1, q2).arrange(DOWN, buff=0.2).move_to(P(0, 0.2))
        self.play(FadeIn(q1, shift=UP * 0.2))
        self.play(FadeIn(q2, shift=UP * 0.2))
        self.play(FadeIn(echelle_ceintures("jaune").move_to(P(-0.6, -2.4))))
        self.attendre_voix(marge=1.0)

    # ── 01 : le champ, à l'envers ───────────────────────────────────────────

    def champ_inverse(self):
        """Le champ de l'épisode 3, mais la largeur est inconnue et la diagonale connue."""
        c = self.champ()
        c[3].become(self.t("? m", 30, COTE).next_to(Line(SE, NE), RIGHT, buff=0.15))
        return c

    def ecran_champ(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-champ")
        c = self.champ_inverse()
        self.play(FadeIn(c[0]), Create(c[1]), run_time=1.0)
        self.au_mot("on connaît la diagonale")
        diag = Line(SO, NE, color=COUL_HYP, stroke_width=9)
        self.play(Create(diag))
        self.play(FadeIn(self.t("50 m", 34, COUL_HYP).move_to((SO + NE) / 2 + UL * 0.45)))
        self.au_mot("Et la longueur")
        self.play(FadeIn(c[2]), Create(Line(SO, SE, color=COTE, stroke_width=8)))
        self.au_mot("Combien mesure la largeur")
        larg = Line(SE, NE, color=COTE, stroke_width=8)
        self.play(Create(larg), FadeIn(c[3]))
        self.play(Indicate(c[3], color=COTE, scale_factor=1.6))
        self.play(FadeIn(self.ligne("largeur = ?", 0.3, 44, COTE, x=4.0)))
        self.attendre_voix()

    # ── 02 : qui est l'hypoténuse ───────────────────────────────────────────

    def ecran_hypotenuse(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-hypotenuse")
        c = self.champ_inverse()
        self.add(c, Line(SO, NE, color=COUL_HYP, stroke_width=9),
                 self.t("50 m", 34, COUL_HYP).move_to((SO + NE) / 2 + UL * 0.45))
        self.au_mot("en face de l'angle droit")
        carre = self.carre_droit(SE, LEFT, UP, s=0.4)
        self.play(GrowFromCenter(carre))
        self.play(Indicate(carre, color=COUL_DROIT, scale_factor=1.6))
        self.au_mot("c'est l'hypoténuse")
        self.play(FadeIn(self.ligne("hypoténuse : connue", 1.3, 34, COUL_HYP, x=4.4)))
        self.au_mot("Ce qu'on cherche")
        self.play(Create(Line(SE, NE, color=COTE, stroke_width=12)))
        self.play(FadeIn(self.ligne("on cherche :", 0.2, 30, WHITE, x=4.4)),
                  FadeIn(self.ligne("un côté de l'angle droit", -0.4, 30, COTE, x=4.4)))
        self.attendre_voix()

    # ── 03 : l'idée, en carreaux ────────────────────────────────────────────

    def ecran_carreaux(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-carreaux")
        self.titre_ecran("L'idée, en carreaux")
        u = 0.4
        A = P(-4.0, -1.6)
        B, C = A + RIGHT * 4 * u, A + UP * 3 * u
        tri = Polygon(A, B, C, color=WHITE, stroke_width=5)
        c3 = self.carre_sur(A, C, 3, B, color=COTE, opacite=0.0)   # le carré CHERCHÉ : vide
        c4 = self.carre_sur(A, B, 4, C, color=BLEU_CALCUL)
        c5 = self.carre_sur(C, B, 5, A, color=CARREAU, opacite=0.7)
        self.play(Create(tri), GrowFromCenter(self.carre_droit(A, RIGHT, UP, s=0.22)))
        self.play(FadeIn(c5), FadeIn(c4), Create(c3))
        self.au_mot("L'égalité ne change pas")
        enonce = VGroup(self.t("hypoténuse²", 36, COUL_HYP), self.t("=", 36),
                        self.t("côté² + côté²", 36, BLEU_CALCUL)).arrange(RIGHT, buff=0.2).move_to(P(2.9, 2.0))
        self.play(Write(enonce))
        self.au_mot("25 carreaux")
        self.play(Indicate(c5, color=CARREAU, scale_factor=1.05),
                  FadeIn(self.ligne("25 carreaux", 1.0, 38, CARREAU, x=2.9)))
        self.au_mot("16 carreaux plus")
        self.play(FadeIn(self.ligne("= 16 + ?", 0.25, 38, BLEU_CALCUL, x=2.9)))
        self.au_mot("Il en reste")
        # On retire du grand carré autant de carreaux que le carré de 4 : les 9 qui restent remplissent le carré cherché.
        retires = VGroup(*list(c5)[:16])
        restants = list(c5)[16:]
        self.play(retires.animate.set_fill(opacity=0.08).set_stroke(opacity=0.3), run_time=1.0)
        copies = [k.copy() for k in restants]
        self.add(*copies)
        self.play(*[Transform(s, cbl.copy().set_fill(COTE, 0.7)) for s, cbl in zip(copies, c3)], run_time=1.8)
        self.play(FadeIn(self.ligne("25 − 16 = 9", -0.55, 42, COTE, x=2.9)))
        self.au_mot("Le côté mesure 3")
        res = self.ligne("= 3 × 3 : le côté mesure 3", -1.35, 32, VERT_OK, x=2.9)
        self.play(Write(res))
        self.attendre_voix()

    # ── 04 : la méthode, sur le champ ───────────────────────────────────────

    def ecran_methode(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-methode")
        self.titre_ecran("La méthode en trois lignes")
        c = self.champ(echelle=0.55, centre=(-4.4, 0.4))
        so, se, ne = c.coins[0], c.coins[1], c.coins[2]
        c[3].become(self.t("?", 24, COTE).next_to(Line(se, ne), RIGHT, buff=0.1))
        self.play(FadeIn(c))
        self.play(Create(Line(so, ne, color=COUL_HYP, stroke_width=7)), Create(Line(se, ne, color=COTE, stroke_width=7)))
        x0 = 2.2
        e1 = self.t("1. J'écris l'égalité.", 30, GRAY_B).move_to(P(x0, 2.0))
        e2 = self.t("2. Je soustrais les carrés.", 30, GRAY_B).move_to(P(x0, 1.5))
        e3 = self.t("3. Je prends la racine carrée.", 30, GRAY_B).move_to(P(x0, 1.0))
        for e, mot in [(e1, "Un : j'écris"), (e2, "Deux : je soustrais"), (e3, "Trois : je prends")]:
            self.au_mot(mot)
            self.play(FadeIn(e, shift=RIGHT * 0.2))
        self.au_mot("Largeur au carré")
        self.play(Write(self.t("largeur² = 50² − 40²", 38).move_to(P(x0, 0.1))))
        self.au_mot("2500 moins 1600")
        self.play(FadeIn(self.t("= 2 500 − 1 600", 38).move_to(P(x0 + 0.4, -0.65))))
        self.play(FadeIn(self.t("= 900", 38).move_to(P(x0 - 0.6, -1.35))))
        self.au_mot("Racine carrée de 900")
        l4 = VGroup(self.t("largeur =", 40, VERT_OK), self.radical(900, font_size=40, color=VERT_OK),
                    self.t("= 30 m", 40, VERT_OK)).arrange(RIGHT, buff=0.2).move_to(P(x0, -2.1))
        self.play(Write(l4))
        self.play(Circumscribe(l4, color=VERT_OK))
        self.attendre_voix()

    # ── 05 : le piège ───────────────────────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-piege")
        self.titre_ecran("Le piège : additionner par habitude")
        faux1 = self.ligne("2 500 + 1 600 = 4 100", 1.6, 42, ROUGE_ERREUR, x=-0.3)
        self.au_mot("2500 plus 1600")
        self.play(Write(faux1))
        self.au_mot("Racine de 4100")
        faux2 = VGroup(self.radical("4 100", font_size=42, color=ROUGE_ERREUR),
                       self.t("≈ 64 m", 42, ROUGE_ERREUR)).arrange(RIGHT, buff=0.2).move_to(P(-0.3, 0.7))
        self.play(Write(faux2))
        self.au_mot("Plus long que la diagonale")
        b64 = Line(P(-5.5, -0.5), P(-5.5 + 64 * 0.11, -0.5), color=ROUGE_ERREUR, stroke_width=12)
        b50 = Line(P(-5.5, -1.1), P(-5.5 + 50 * 0.11, -1.1), color=COUL_HYP, stroke_width=12)
        self.play(Create(b50), FadeIn(self.t("diagonale 50 m", 26, COUL_HYP).next_to(b50, RIGHT, buff=0.2)))
        self.play(Create(b64), FadeIn(self.t("64 m ?", 26, ROUGE_ERREUR).next_to(b64, RIGHT, buff=0.2)))
        self.au_mot("C'est impossible")
        self.play(Create(Line(faux1.get_left(), faux1.get_right(), color=ROUGE_ERREUR, stroke_width=6)))
        self.play(Write(self.chute("Un côté de l'angle droit est plus court que l'hypoténuse.",
                                   color=VERT_OK, font_size=30)))
        self.attendre_voix()

    # ── 07 : avec un arrondi ────────────────────────────────────────────────

    def ecran_arrondi(self):
        self.clear()
        self.add_mascotte()
        self.dire("07-arrondi")
        self.titre_ecran("Avec un arrondi")
        u = 0.36
        L = P(-5.4, -1.8)
        Mx, K = L + RIGHT * 7.48 * u, L + UP * 5 * u  # LM ≈ 7,48 : la longueur cherchée, à l'échelle
        contour, carre, hyp, lab = self.tri_rect(L, Mx, K, lettres="LMK")
        self.au_mot("Le triangle KLM")
        self.play(Create(contour), FadeIn(lab), GrowFromCenter(carre))
        self.au_mot("L'hypoténuse KM")
        self.play(Create(hyp), FadeIn(self.t("9 cm", 30, COUL_HYP).move_to((Mx + K) / 2 + UR * 0.4)))
        self.au_mot("KL mesure 5")
        self.play(FadeIn(self.t("5 cm", 30, COTE).next_to(Line(L, K), LEFT, buff=0.15)))
        self.play(FadeIn(self.t("LM = ?", 30, COTE).next_to(Line(L, Mx), DOWN, buff=0.15)))
        self.au_mot("81 moins 25")
        self.play(Write(self.ligne("LM² = 9² − 5² = 81 − 25 = 56", 1.4, 36, x=2.6)))
        self.au_mot("Racine de 56")
        rac = VGroup(self.radical(56, font_size=40), self.t("= 7,48…", 40, BLEU_CALCUL)).arrange(RIGHT, buff=0.2)
        ecran = SurroundingRectangle(rac, color=GRAY_B, buff=0.25, corner_radius=0.1)
        self.play(FadeIn(VGroup(rac, ecran).move_to(P(2.6, 0.3))))
        self.play(Write(self.ligne("LM ≈ 7,5 cm", -0.9, 46, VERT_OK, x=2.6)))
        self.attendre_voix()

    # ── 08 : défi ───────────────────────────────────────────────────────────

    def triangle_defi(self):
        u = 0.36
        S = P(-5.0, -1.6)
        T, R = S + RIGHT * 8 * u, S + UP * 6 * u
        return S, T, R, self.tri_rect(S, T, R, lettres="STR")

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        S, T, R, (contour, carre, hyp, lab) = self.triangle_defi()
        self.au_mot("Le triangle RST")
        self.play(Create(contour), FadeIn(lab), GrowFromCenter(carre))
        self.au_mot("RT égale 10")
        self.play(Create(hyp), FadeIn(self.t("10 cm", 30, COUL_HYP).move_to((T + R) / 2 + UR * 0.4)))
        self.au_mot("RS égale 6")
        self.play(FadeIn(self.t("6 cm", 30, COTE).next_to(Line(S, R), LEFT, buff=0.15)))
        self.au_mot("Combien mesure ST")
        self.play(Write(self.ligne("ST = ?", 0.6, 56, COTE, x=2.8)))
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=36)))
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("08b-correction")
        self.titre_ecran("Correction")
        S, T, R, (contour, carre, hyp, lab) = self.triangle_defi()
        self.add(contour, lab, carre, hyp,
                 self.t("10 cm", 30, COUL_HYP).move_to((T + R) / 2 + UR * 0.4),
                 self.t("6 cm", 30, COTE).next_to(Line(S, R), LEFT, buff=0.15))
        self.au_mot("l'hypoténuse est RT")
        self.play(FadeIn(self.ligne("rectangle en S : hypoténuse RT", 2.0, 30, COUL_HYP, x=2.6)))
        self.au_mot("ST au carré égale")
        self.play(Write(self.ligne("ST² = 10² − 6²", 1.1, 40, x=2.6)))
        self.au_mot("100 moins 36")
        self.play(FadeIn(self.ligne("= 100 − 36 = 64", 0.3, 40, x=2.9)))
        self.au_mot("ST égale racine carrée")
        res = VGroup(self.t("ST =", 44, VERT_OK), self.radical(64, font_size=44, color=VERT_OK),
                     self.t("= 8 cm", 44, VERT_OK)).arrange(RIGHT, buff=0.2).move_to(P(2.6, -0.6))
        self.play(Write(res), Create(Line(S, T, color=COTE, stroke_width=9)))
        self.au_mot("Contrôle")
        self.play(FadeIn(VGroup(self.coche(), self.t("8 < 10", 34, VERT_OK)).arrange(RIGHT, buff=0.25)
                         .move_to(P(2.6, -1.5))))
        self.attendre_voix()

    # ── 09 : ce que tu sais faire maintenant ────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("09-finale")
        self.play(Write(self.t("Ce que tu sais faire maintenant", 44, JAUNE_TITRE).to_edge(UP)))
        questions = [
            ("Repérer que l'hypoténuse", "Repérer que l'hypoténuse est connue ?"),
            ("Soustraire les carrés", "Soustraire les carrés, puis prendre la racine ?"),
            ("Vérifier que le côté", "Vérifier que le côté trouvé est plus court que l'hypoténuse ?"),
        ]
        lignes = VGroup(*[VGroup(self.coche(), self.t(txt, 28)).arrange(RIGHT, buff=0.3) for _, txt in questions])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.55).move_to(P(-0.3, 0.5))
        for (mot, _), l in zip(questions, lignes):
            self.au_mot(mot)
            self.play(FadeIn(l[1], shift=RIGHT * 0.2), run_time=0.6)
            self.play(Create(l[0]), run_time=0.4)
        self.au_mot("Alors l'épisode 5")
        self.play(Write(self.chute("Épisode 5 : vérifier une égalité avec trois longueurs", color=VERT_OK, font_size=32)))
        self.attendre_voix(marge=1.0)

    # ── déroulé ─────────────────────────────────────────────────────────────

    def construct(self):
        self.page_de_garde()
        self.ecran_champ()
        self.ecran_hypotenuse()
        self.ecran_carreaux()
        self.ecran_methode()
        self.ecran_piege()
        self.ecran_arrondi()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="10-abonne")
