# proba_va_ecart_type_short.py
# EleveAI — Maths 1re spé — short jumeau de « L'écart-type : mesurer le risque ».
# CEINTURE ORANGE. Il AMUSE : deux placements, MÊME gain moyen (30 €) :
# lequel est le plus risqué ? Le diagramme en bâtons du coach, sur UN axe :
# A (bleu) serré autour de 30, B (orange) aux deux bouts. Les bandes « 30 ± σ »
# s'allument : 10 € pour A, 90 € pour B !
#   · en HAUT la carte « bâtons » qui se construit, puis les bandes ;
#   · en BAS, EN MÊME TEMPS : σ(A) = 10 €, σ(B) = 90 € ;
#   · fin : le placement C (0 € ou 60 €, une chance sur deux) : son écart-type ?
#     « Réponds en commentaire ! », puis « Entraîne-toi sur eleveai.fr ».
# Nombres (Python) : E(A) = E(B) = E(C) = 30 ; σ(A) = 10, σ(B) = 90, σ(C) = 30.
#
# Voix : manim/voix/premiere-proba-va-ecart-type-short.json (débit −6), calée
# par proba_va_ecart_type_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/premiere/proba_va_ecart_type_short.py ShortProbaVaEcartTypePremiereSpe -o eleveai-maths-premiere-proba-va-ecart-type-short --media_dir manim/scripts/premiere/media-va_ecart_type-1s

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from proba_va_ecart_type import COUL_A, COUL_B, COUL_C  # noqa: E402
from proba_va_variance import BORD, ENCRE, MOINS, P  # noqa: E402
from proba_va_variance_short import ShortProbaVaVarianceBase  # noqa: E402

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

XMIN, XMAX = -70, 130


class CarteUnAxe(VGroup):
    """Le stat_graph « bâtons » du coach (carte blanche, axe, bâtons à pastille),
    tous les placements sur le MÊME axe en € (à l'échelle)."""

    def __init__(self, centre=P(0, 0.75), larg=4.3, haut=2.3):
        super().__init__()
        self.carte = RoundedRectangle(width=larg, height=haut, corner_radius=0.18, fill_color=WHITE,
                                      fill_opacity=1, stroke_color=BORD, stroke_width=2).move_to(centre)
        self.titre = Text("Gain en €", font_size=22, color=ENCRE, weight=BOLD)
        self.titre.next_to(self.carte.get_corner(UL), DR, buff=0.12)
        self.gx = self.carte.get_left()[0] + 0.3
        self.dx = larg - 0.6
        self.y0 = self.carte.get_bottom()[1] + 0.55
        self.axe = Line(P(self.gx - 0.1, self.y0), P(self.gx + self.dx + 0.1, self.y0), color=ENCRE,
                        stroke_width=2.5)
        zero = Line(P(self.x(0), self.y0 - 0.07), P(self.x(0), self.y0 + 0.07), color=ENCRE, stroke_width=2.5)
        self.h = haut - 1.15
        self.add(self.carte, self.titre, self.axe, zero)

    def x(self, v):
        return self.gx + (v - XMIN) / (XMAX - XMIN) * self.dx

    def baton(self, v, couleur, dx=0.0):
        """Un bâton (proba 0,5 : tous de la même hauteur) et son étiquette (posée à part)."""
        x = self.x(v)
        tr = Line(P(x, self.y0), P(x, self.y0 + self.h), color=couleur, stroke_width=8)
        pt = Dot(P(x, self.y0 + self.h), radius=0.08, color=couleur).set_stroke(ENCRE, 1.5)
        e = Text(MOINS + str(-v) if v < 0 else str(v), font_size=24, color=couleur, weight=BOLD)
        e.move_to(P(x + dx, self.y0 - 0.27))
        return VGroup(tr, pt).set_z_index(2), e.set_z_index(2)

    def bande(self, s, couleur, h=None):
        h = h or self.h
        r = Rectangle(width=self.x(30 + s) - self.x(30 - s), height=h, fill_color=couleur, fill_opacity=0.3,
                      stroke_color=couleur, stroke_width=2)
        return r.move_to(P(self.x(30), self.y0 + h / 2)).set_z_index(1)

    def ligne_e(self):
        return DashedLine(P(self.x(30), self.y0), P(self.x(30), self.y0 + self.h + 0.25), color=ORANGE_RETENUE,
                          stroke_width=4, dash_length=0.1).set_z_index(3)


class ShortProbaVaEcartTypeBase(ShortProbaVaVarianceBase):
    nom_voix = "premiere-proba-va-ecart-type-short"
    fichier_marques = "proba_va_ecart_type_short_marques.json"

    def construct(self):
        self.margo_bas()

        # ── 00 : deux placements, même gain moyen : lequel est risqué ? ──
        self.dire("00-accroche")
        titre = self.grand("Le plus risqué ?", font_size=46, color=JAUNE_TITRE).move_to(P(0, 3.4))
        badge = echelle_ceintures("orange").scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.3))
        tirelires = VGroup()
        for nom, coul in [("A", COUL_A), ("B", COUL_B)]:
            boite = RoundedRectangle(width=1.5, height=1.5, corner_radius=0.25, fill_color=coul, fill_opacity=1,
                                     stroke_color=WHITE, stroke_width=3)
            tirelires.add(VGroup(boite, Text(nom, font_size=72, color=WHITE, weight=BOLD).move_to(boite)))
        tirelires.arrange(RIGHT, buff=0.7).move_to(P(0, 0.75))
        self.play(Write(titre), FadeIn(badge, shift=DOWN * 0.2),
                  LaggedStart(*[FadeIn(t, shift=UP * 0.4) for t in tirelires], lag_ratio=0.3), run_time=0.7)
        self.au_mot("conseiller")
        metier = self.ligne([("Conseiller en placements", BLEU_CALCUL)], 30, -0.35)
        self.play(FadeIn(metier, shift=UP * 0.1), run_time=0.3)
        self.au_mot("même gain moyen")
        g = self.ligne([("Gain moyen :", WHITE)], 36, -1.1)
        self.play(FadeIn(g, shift=UP * 0.1), run_time=0.3)
        self.au_mot("30 euros")
        g2 = self.ligne([("Gain moyen :", WHITE), ("30 €", JAUNE_TITRE)], 36, -1.1, buff=0.18)
        self.play(FadeIn(g2[1], scale=1.6), run_time=0.3)
        self.remove(g)
        self.add(g2)
        self.au_mot("Lequel")
        q = self.ligne([("Lequel ?", ORANGE_RETENUE)], 52, -2.1)
        self.play(FadeIn(q, scale=1.6), *[Wiggle(t) for t in tirelires], run_time=0.6)
        self.attendre_voix(marge=0.1)
        c = CarteUnAxe()
        self.play(FadeOut(VGroup(tirelires, metier, g2, q, badge), shift=DOWN * 0.2), FadeIn(c, shift=UP * 0.2),
                  run_time=0.4)

        # ── 01 : la carte des bâtons ; σ(A) = 10 €, σ(B) = 90 € ──
        self.dire("01-image")
        ba = [c.baton(20, COUL_A, -0.12), c.baton(40, COUL_A, 0.12)]
        bb = [c.baton(-60, COUL_B), c.baton(120, COUL_B)]
        la = self.t("A", 30, COUL_A, weight=BOLD).next_to(c.carte, DOWN, buff=0.08).align_to(c.carte, LEFT)
        lb = self.t("B", 30, COUL_B, weight=BOLD).next_to(c.carte, DOWN, buff=0.08).align_to(c.carte, RIGHT)
        for (bt, e), mot, lab in [(ba[0], "A : 20", la), (ba[1], "40 euros", None),
                                  (bb[0], "moins 60", lb), (bb[1], "120 euros", None)]:
            self.au_mot(mot)
            anims = [GrowFromEdge(bt, DOWN), FadeIn(e, scale=1.6)] + ([FadeIn(lab)] if lab else [])
            self.play(*anims, run_time=0.3)
        le = c.ligne_e()
        self.play(Create(le), run_time=0.25)
        sa = self.ligne([("σ(A)", COUL_A), ("=", WHITE), ("10 €", COUL_A)], 46, -1.35)
        sb = self.ligne([("σ(B)", COUL_B), ("=", WHITE), ("90 €", COUL_B)], 46, -2.2)
        self.au_mot("Écart-type de A")
        self.play(FadeIn(sa[:2], shift=UP * 0.1), run_time=0.3)
        self.au_mot("10 euros")
        bandA = c.bande(10, COUL_A, c.h * 0.55)
        self.play(FadeIn(sa[2], scale=1.6), GrowFromCenter(bandA), run_time=0.35)
        self.au_mot("De B")
        self.play(FadeIn(sb[:2], shift=UP * 0.1), run_time=0.3)
        self.au_mot("90 euros")
        bandB = c.bande(90, COUL_B)
        self.play(FadeIn(sb[2], scale=1.8), GrowFromCenter(bandB), run_time=0.45)
        self.insister(sb[2], 1.4)
        self.play(*[Wiggle(bt) for bt, _ in bb], run_time=0.6)
        self.attendre_voix(marge=0.1)
        toi = self.grand("Et toi ?", font_size=48, color=JAUNE_TITRE).move_to(P(0, 3.4))
        bc = [c.baton(0, COUL_C), c.baton(60, COUL_C)]
        lc = self.t("C", 30, COUL_C, weight=BOLD).next_to(c.carte, DOWN, buff=0.08)
        self.play(ReplacementTransform(titre, toi),
                  FadeOut(VGroup(sa, sb, bandA, bandB, la, lb, *[m for b in ba + bb for m in b])), run_time=0.4)

        # ── 02 : la question : le placement C (0 € ou 60 €) ──
        self.dire("02-question")
        self.au_mot("Et C")
        self.play(FadeIn(lc, scale=1.5), run_time=0.25)
        self.au_mot("0 ou")
        self.play(GrowFromEdge(bc[0][0], DOWN), FadeIn(bc[0][1], scale=1.6), run_time=0.3)
        self.au_mot("60 euros")
        self.play(GrowFromEdge(bc[1][0], DOWN), FadeIn(bc[1][1], scale=1.6), run_time=0.3)
        self.au_mot("une chance sur deux")
        pc = self.ligne([("1 chance sur 2", WHITE)], 34, -1.3)
        self.play(FadeIn(pc, shift=UP * 0.1), run_time=0.3)
        self.au_mot("Son écart-type")
        q2 = self.ligne([("σ(C)", COUL_C), ("=", WHITE), ("?", ORANGE_RETENUE)], 56, -2.15)
        self.play(FadeIn(q2, scale=1.4), run_time=0.35)
        self.insister(q2[2], 1.4)
        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.t("Réponds en", 40, VERT_OK), self.t("commentaire !", 40, VERT_OK))
        appel.arrange(DOWN, buff=0.06).move_to(P(0, 2.5))
        self.play(FadeIn(appel, scale=0.7), run_time=0.35)
        self.insister(appel, 1.08)
        self.attendre_voix(marge=0.6)

        # ── 03 : la fin ──
        self.fin_short("03-abonne", [toi, c, le, lc, *bc[0], *bc[1], pc, q2, appel])


class ShortProbaVaEcartTypePremiereSpe(ShortProbaVaEcartTypeBase):
    identite = "Maths 1re spé — EleveAI"
