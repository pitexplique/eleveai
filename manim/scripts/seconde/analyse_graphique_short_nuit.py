# analyse_graphique_short_nuit.py
# EleveAI — Maths seconde — short « Ne te trompe pas d'axe » (analyse graphique).
# CEINTURE BLANCHE (règle des ceintures, manim/REGLES.md) : la courbe de la nuit
# au Piton des Neiges EN HAUT, les lectures qui se remplissent EN BAS.
# Voix validée (« go », 12/10/2026) : manim/voix/seconde-analyse-graphique-short-nuit.json.
# Même courbe que la paysage (analyse_graphique_2de.py) ; ici les HEURES sont
# écrites en clair (20 h, 22 h, 0 h…), pas t : une ceinture blanche ne convertit pas.
#
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/seconde/analyse_graphique_short_nuit.py ShortNuit -o eleveai-maths-seconde-analyse-graphique-short-nuit --media_dir manim/scripts/seconde/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parent))

from manim import *

from charte import *
from gabarit_sixieme import Short6e
from analyse_graphique_2de import T
from signes_expression_2de import MOINS, PLUS, ceinture

HEURES = {0: "20 h", 2: "22 h", 4: "0 h", 6: "2 h", 8: "4 h", 10: "6 h"}


class ShortNuit(Short6e):
    nom_voix = "seconde-analyse-graphique-short-nuit"

    def p(self, t, y):
        return self.ax.c2p(t, y)

    def ligne(self, texte, y, color=WHITE, fs=30):
        return self.grand(texte, font_size=fs, color=color).move_to([0, y, 0])

    def construct(self):
        self.margo_bas()
        # ── 00 ──
        self.dire("00-accroche")
        titre = self.grand("Ne te trompe pas d'axe !", font_size=34, color=JAUNE_TITRE).move_to([0, 2.8, 0])
        badge = VGroup(ceinture("#F5F5F5", 0.8).scale(0.6), self.grand("Ceinture blanche", font_size=20))
        badge.arrange(RIGHT, buff=0.15).move_to([0, 2.3, 0])
        ax = Axes(x_range=[0, 10.4, 1], y_range=[-3.5, 6.5, 1], x_length=3.7, y_length=3.0, tips=False,
                  axis_config={"stroke_width": 2}).move_to([0.2, 0.45, 0])
        self.ax = ax
        grille = VGroup(*[Line(ax.c2p(x, -3.5), ax.c2p(x, 6.5), stroke_width=1, color=GREY_D) for x in range(1, 11)],
                        *[Line(ax.c2p(0, y), ax.c2p(10.4, y), stroke_width=1, color=GREY_D) for y in range(-3, 7) if y])
        heures = VGroup(*[Text(h, font_size=15).next_to(ax.c2p(t, -3.5), DOWN, buff=0.08) for t, h in HEURES.items()])
        degres = VGroup(*[Text(f"{str(y).replace('-', '−')} °", font_size=15).next_to(ax.c2p(0, y), LEFT, buff=0.08)
                          for y in (-3, 0, 3, 6)])
        courbe = ax.plot(T, x_range=[0, 10], color=WHITE, stroke_width=5)
        self.play(FadeIn(titre), FadeIn(badge), FadeIn(grille), Create(ax), FadeIn(heures), FadeIn(degres), run_time=1.0)
        self.au_mot("Cette courbe raconte")
        self.play(Create(courbe), run_time=2.0)
        self.add(self.grand("Piton des Neiges, une nuit de juillet", font_size=20, color=GREY_B).move_to([0, -1.75, 0]))
        self.attendre_voix(marge=0.3)

        # ── 01 : l'image ──
        self.dire("01-image")
        self.remove(*[m for m in self.mobjects if isinstance(m, Text) and "Piton" in m.text])
        q1 = self.ligne("22 h → combien de degrés ?", -1.75, BLEU_CALCUL, 28)
        self.play(FadeIn(q1))
        self.au_mot("On part de l'heure, en bas")
        d0 = Dot(self.p(2, -3.5), color=BLEU_CALCUL, radius=0.08)
        self.play(FadeIn(d0), Indicate(heures[1], color=BLEU_CALCUL, scale_factor=1.6))
        self.au_mot("On monte jusqu'à la courbe")
        l1 = DashedLine(self.p(2, -3.5), self.p(2, 3), color=BLEU_CALCUL, stroke_width=3)
        self.play(Create(l1))
        dc = Dot(self.p(2, 3), color=JAUNE_TITRE, radius=0.08)
        self.play(FadeIn(dc))
        self.au_mot("Et on lit à gauche")
        l2 = DashedLine(self.p(2, 3), self.p(0, 3), color=BLEU_CALCUL, stroke_width=3)
        self.play(Create(l2), Indicate(degres[2], color=VERT_OK, scale_factor=1.8))
        r1 = self.ligne("22 h → 3 °C", -1.75, VERT_OK, 34)
        self.play(Transform(q1, r1))
        self.attendre_voix(marge=0.3)

        # ── 02 : les antécédents ──
        self.dire("02-antecedent")
        self.play(FadeOut(VGroup(d0, l1, dc, l2)), q1.animate.scale(0.75).move_to([0, -1.6, 0]))
        q2 = self.ligne("−2 °C → à quelle heure ?", -2.1, MOINS, 28)
        self.play(FadeIn(q2))
        self.au_mot("On part de moins 2")
        lab = Text("−2 °", font_size=15, color=MOINS).next_to(self.p(0, -2), LEFT, buff=0.08)
        d1 = Dot(self.p(0, -2), color=MOINS, radius=0.08)
        self.play(FadeIn(lab), FadeIn(d1))
        self.au_mot("On avance jusqu'à la courbe")
        h = DashedLine(self.p(0, -2), self.p(10.2, -2), color=MOINS, stroke_width=3)
        self.play(Create(h), run_time=1.2)
        self.au_mot("on la touche deux fois")
        pts = VGroup(*[Dot(self.p(t, -2), color=JAUNE_TITRE, radius=0.09) for t in (6, 8)])
        self.play(LaggedStart(*[Flash(d, color=JAUNE_TITRE) for d in pts], lag_ratio=0.4), FadeIn(pts))
        vert = VGroup(*[DashedLine(self.p(t, -2), self.p(t, -3.5), color=JAUNE_TITRE, stroke_width=3) for t in (6, 8)])
        self.play(Create(vert), Indicate(heures[3], color=JAUNE_TITRE, scale_factor=1.6),
                  Indicate(heures[4], color=JAUNE_TITRE, scale_factor=1.6))
        r2 = self.ligne("−2 °C → 2 h et 4 h", -2.1, JAUNE_TITRE, 32)
        self.play(Transform(q2, r2))
        self.attendre_voix(marge=0.3)

        # ── 03 : retenir ──
        self.dire("03-retenir")
        self.play(FadeOut(VGroup(q1, q2)))
        self.au_mot("L'heure se lit en bas")
        bas = Line(self.p(0, -3.5), self.p(10.4, -3.5), color=BLEU_CALCUL, stroke_width=8)
        self.play(Create(bas), FadeIn(self.ligne("l'heure : en bas", -1.65, BLEU_CALCUL, 30)))
        self.au_mot("La température se lit à gauche")
        gauche = Line(self.p(0, -3.5), self.p(0, 6.5), color=VERT_OK, stroke_width=8)
        self.play(Create(gauche), FadeIn(self.ligne("la température : à gauche", -2.15, VERT_OK, 30)))
        self.attendre_voix(marge=0.5)

        # ── 04 : la question ──
        self.clear()
        self.margo_bas()
        self.dire("04-question")
        self.play(Write(self.grand("À toi !", font_size=56, color=JAUNE_TITRE).move_to([0, 2.5, 0])))
        g = VGroup(*[self.grand(t, font_size=s, color=c) for t, s, c in
                     [("À quelle heure", 40, WHITE), ("la température", 40, WHITE), ("remonte à 0 °C ?", 44, PLUS)]])
        self.play(FadeIn(g.arrange(DOWN, buff=0.18).move_to([0, 0.75, 0])))
        self.au_mot("Ta réponse en commentaire")
        rep = VGroup(self.grand("en commentaire !", font_size=40, color=VERT_OK),
                     self.grand("@eleveai974", font_size=40, color=BLEU_CALCUL)).arrange(DOWN, buff=0.16)
        self.play(FadeIn(rep.move_to([0, -1.25, 0])))
        self.attendre_voix(marge=1.5)
