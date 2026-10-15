# diagonale_trajet_2026.py
# EleveAI — le trajet de la Diagonale des Fous 2026 sur la carte de l'île, avec
# le dénivelé positif et négatif de chaque tronçon. BROUILLON MUET (11/10/2026).
#
# Frédéric, 11/10, avec le descriptif officiel (PDF « diagonale_des_fous_2026 ») :
# « en te basant sur une carte de l'île, peux-tu faire le trajet avec variations
# dénivelé positif et négatif ». Le short des relatifs du 08/10 l'avait fait en
# CINQ points arrondis ; ici, les 35 points du tableau officiel.
#
# ⭐ CE QUE LES NOMBRES MONTRENT : en additionnant les variations d'un point de
# pointage au suivant, on trouve D+ = 6 419 m et D− = −6 372 m. Le D+ officiel
# est 10 200 m : les 3 800 m qui manquent sont les montées et descentes CACHÉES
# entre deux points. Plus on mesure souvent, plus on trouve de dénivelé.
# Et D+ + D− = 47 = 49 − 2 = arrivée − départ, quel que soit le découpage.
#
# ⚠️ Altitudes et kilomètres : tableau officiel. Le km de Roche Plate manque au
# tableau : 116,5 estimé (entre 111,3 et 118,9).
# ⚠️ Positions sur la carte : APPROCHÉES (lieux-dits placés à la main, à
# quelques centaines de mètres près) ; le contour de l'île est schématique.
#
# Rendu brouillon :
#   python -m manim render -ql -r 540,960 --disable_caching manim/scripts/974/diagonale_trajet_2026.py DiagonaleTrajet2026 -o eleveai-974-diagonale-trajet-2026 --media_dir manim/scripts/974/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from manim import *

from carte_reunion import CarteReunion
from charte import *
from gabarit_seconde import ShortSeconde

from gabarit_diagonale import ALT_MAX, PARCOURS



def milliers(n):
    s = f"{abs(n):,}".replace(",", " ")
    return ("−" if n < 0 else "") + s


class DiagonaleTrajet2026(ShortSeconde):
    """9:16 muet : la carte en haut, le profil en bas, deux compteurs."""

    def pt_profil(self, km, alt):
        x = -1.7 + km / 180.8 * 3.8
        y = -2.1 + alt / ALT_MAX * 1.25
        return np.array([x, y, 0])

    def construct(self):
        self.margo_bas()
        titre = self.grand("Diagonale des Fous 2026", font_size=30, color=JAUNE_TITRE, marge=0.5).move_to([0, 2.85, 0])
        sous = self.grand("180,8 km · 35 points de pointage", font_size=20, color=WHITE, marge=0.8).move_to([0, 2.5, 0])
        self.play(Write(titre), FadeIn(sous))

        carte = CarteReunion(hauteur=2.3, centre=[0, 1.1, 0], opacite=0.25)
        self.play(FadeIn(carte.mer()), Create(carte.contour()), run_time=1.2)

        # Le profil : axe des km, la mer à 0.
        axe = Line(self.pt_profil(0, 0), self.pt_profil(180.8, 0), color=BLEU_CALCUL, stroke_width=2)
        lmer = Text("0 m", font_size=14, color=BLEU_CALCUL).next_to(axe, LEFT, buff=0.06)
        lsom = Text("2 475 m", font_size=14, color=WHITE).move_to(self.pt_profil(0, ALT_MAX) + LEFT * 0.05).align_to(axe, LEFT).shift(UP * 0.12)
        self.play(Create(axe), FadeIn(lmer), FadeIn(lsom))

        # Les compteurs, entre la carte et le profil.
        self.dp, self.dm = ValueTracker(0), ValueTracker(0)
        c_plus = always_redraw(lambda: Text(f"montées  +{milliers(round(self.dp.get_value()))} m",
                                            font_size=18, color=VERT_OK).move_to([0, -0.25, 0]))
        c_moins = always_redraw(lambda: Text(f"descentes  {milliers(-round(self.dm.get_value()))} m",
                                             font_size=18, color=ROUGE_ERREUR).move_to([0, -0.55, 0]))
        self.play(FadeIn(c_plus), FadeIn(c_moins))

        depart = PARCOURS[0]
        p_carte = carte.point(depart[3], depart[4])
        coureur = Dot(p_carte, radius=0.07, color=ORANGE_RETENUE)
        c_prof = Dot(self.pt_profil(0, depart[1]), radius=0.05, color=ORANGE_RETENUE)
        self.add(coureur, c_prof)
        self.etiquette(carte, depart)

        for a, b in zip(PARCOURS, PARCOURS[1:]):
            monte = b[1] > a[1]
            col = VERT_OK if monte else ROUGE_ERREUR
            t_carte = Line(carte.point(a[3], a[4]), carte.point(b[3], b[4]), color=col, stroke_width=3)
            t_prof = Line(self.pt_profil(a[0], a[1]), self.pt_profil(b[0], b[1]), color=col, stroke_width=3)
            d = b[1] - a[1]
            anims = [Create(t_carte), Create(t_prof),
                     coureur.animate.move_to(carte.point(b[3], b[4])),
                     c_prof.animate.move_to(self.pt_profil(b[0], b[1]))]
            anims.append((self.dp if monte else self.dm).animate.increment_value(abs(d)))
            # Le temps suit la distance du tronçon : 16 km de descente durent plus que 700 m.
            self.play(*anims, run_time=0.25 + (b[0] - a[0]) * 0.07, rate_func=linear)
            if b[5] is not None:
                self.etiquette(carte, b)
        self.wait(1.0)

        # ── Le bilan ────────────────────────────────────────────────────────
        bilan = VGroup(
            self.grand("entre les points : D+ 6 419 m", font_size=24, color=VERT_OK, marge=0.7),
            self.grand("D+ officiel : 10 200 m", font_size=30, color=JAUNE_TITRE, marge=0.7),
            self.grand("3 800 m de montées cachées", font_size=24, color=ORANGE_RETENUE, marge=0.7),
            self.grand("entre deux points de pointage", font_size=24, color=ORANGE_RETENUE, marge=0.7),
        ).arrange(DOWN, buff=0.16).move_to([0, 1.2, 0])
        fond = BackgroundRectangle(bilan, color=BLACK, fill_opacity=0.85, buff=0.15)
        self.play(FadeIn(fond), LaggedStart(*[FadeIn(m, shift=UP * 0.1) for m in bilan], lag_ratio=0.5))
        self.wait(3.0)
        net = self.grand("D+ + D− = 6 419 − 6 372 = 47 = 49 − 2", font_size=22, color=WHITE, marge=0.4)
        net.next_to(bilan, DOWN, buff=0.16)
        self.play(FadeIn(net, shift=UP * 0.1), fond.animate.stretch_to_fit_height(fond.height + 0.4).shift(DOWN * 0.2))
        self.wait(3.0)

    def etiquette(self, carte, p):
        lab = Text(p[2], font_size=13, color=WHITE).next_to(carte.point(p[3], p[4]), p[5], buff=0.07)
        if lab.get_left()[0] < -2.15:
            lab.align_to([-2.15, 0, 0], LEFT)
        if lab.get_right()[0] > 2.15:
            lab.align_to([2.15, 0, 0], RIGHT)
        dot = Dot(carte.point(p[3], p[4]), radius=0.045, color=WHITE)
        self.play(FadeIn(dot), FadeIn(lab), run_time=0.3)
