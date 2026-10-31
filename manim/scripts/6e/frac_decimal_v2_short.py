# frac_decimal_v2_short.py
# EleveAI — Maths 6e — short jumeau de l'épisode 04 v2 « Relier fraction et
# décimal » (micro fraction_decimal, refaite le 31/10/2026). CEINTURE JAUNE :
# on voit la règle devenir une droite graduée, mais il faut COMPTER au-delà
# de 1 (13/10 = 1,3) : un cran au-dessus du short blanc « on voit ».
# Voix validée par Frédéric le 31/10 (manim/scripts/6e/voix-frac-decimal-v2.md).
# Il AMUSE : Rayan, MENUISIER, doit scier à 13/10 de mètre ; sa règle n'a que
# des virgules :
#   · EN HAUT, le plan et l'écriture qui se remplit (10/10 = 1 m, 13/10 = 1,3) ;
#   · EN BAS, la règle devient la droite de 0 à 2 : 10 dixièmes s'allument
#     jusqu'à 1, puis 3 de plus ; la fraction AU-DESSUS du point, le décimal
#     EN DESSOUS : même point ;
#   · fin : « 17/10, ça s'écrit comment avec une virgule ? » en commentaire (1,7).
# Pas de question-pause : la voix validée n'en a pas (une seule question, en
# commentaire). Centres d'intérêt : bricolage / métiers manuels.
#
# Voix : manim/voix/6e-frac-decimal-v2-short.json (débit −10) ; marques :
# manim/scripts/6e/frac_decimal_v2_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/6e/frac_decimal_v2_short.py FracDecimalShort6eV2 -o eleveai-maths-6e-frac-decimal-v2-short --media_dir manim/scripts/6e/media-frac-decimal-v2-short
# Sortie : manim/sorties/6e/maths/fractions/04-decimal/eleveai-maths-6e-frac-decimal-v2-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from frac_commun import *  # noqa: E402,F403
from frac_decimal_v2 import VERT_CARTE, decimal_sous, lien, segment  # noqa: E402

BOIS = "#d97706"
BOIS_CLAIR = "#fcd34d"


def menuisier(s=1.0):
    """Rayan, menuisier : casquette, salopette, crayon sur l'oreille, scie."""
    tete = Circle(radius=0.4, fill_color="#c68642", fill_opacity=1, stroke_width=0)
    casquette = VGroup(Sector(radius=0.43, angle=PI, start_angle=0, fill_color="#1d4ed8", fill_opacity=1,
                              stroke_width=0).move_to(P(0, 0.24)),
                       RoundedRectangle(width=0.55, height=0.1, corner_radius=0.05, fill_color="#1d4ed8",
                                        fill_opacity=1, stroke_width=0).move_to(P(0.35, 0.22)))
    crayon = Line(P(-0.42, 0.18), P(-0.2, 0.42), color="#facc15", stroke_width=6)
    corps = Polygon(P(-0.75, -1.9), P(0.75, -1.9), P(0.5, -0.45), P(-0.5, -0.45), fill_color="#475569",
                    fill_opacity=1, stroke_width=0)
    bavette = Rectangle(width=0.6, height=0.55, fill_color="#1e40af", fill_opacity=1, stroke_width=0).move_to(
        P(0, -0.85))
    lame = Polygon(P(0.55, -0.9), P(1.55, -1.25), P(1.55, -1.45), P(0.55, -1.15), fill_color="#cbd5e1",
                   fill_opacity=1, stroke_width=0)
    manche = RoundedRectangle(width=0.32, height=0.42, corner_radius=0.08, fill_color="#92400e", fill_opacity=1,
                              stroke_width=0).move_to(P(0.45, -1.03))
    return VGroup(corps, bavette, lame, manche, tete, casquette, crayon).scale(s)


def regle_bois(largeur=3.8, hauteur=0.62, centre=ORIGIN):
    """La règle de l'atelier, de 0 à 2 m : que des nombres À VIRGULE."""
    bande = RoundedRectangle(width=largeur, height=hauteur, corner_radius=0.06, fill_color=BOIS_CLAIR,
                             fill_opacity=1, stroke_color=BOIS, stroke_width=3)
    g = VGroup(bande)
    x0 = -largeur / 2 + 0.2
    pas = (largeur - 0.4) / 20
    for k in range(21):
        x = x0 + k * pas
        g.add(Line(P(x, hauteur / 2), P(x, hauteur / 2 - (0.24 if k % 5 == 0 else 0.13)), color=NUIT,
                   stroke_width=2.5))
        if k % 5 == 0:
            e = Text(fr(k / 10), font_size=17, color=NUIT)
            e.sans_synchro = True
            g.add(e.move_to(P(x, -hauteur / 2 + 0.15)))
    return g.move_to(centre)


class FracDecimalShort6eV2(ShortFrac):
    nom_voix = "6e-frac-decimal-v2-short"
    fichier_marques = "frac_decimal_v2_short_marques.json"
    ceinture = "jaune"

    def _attente(self, textes):
        # une fraction écrite ne guette pas le prochain « 10 » de la voix (voir frac_decimal_v2.py)
        return super()._attente([f for f in textes if not getattr(f, "sans_synchro", False)])

    def droite(self):
        dr = Droite(0, 2, 20, etiquettes={0: "0", 1: "1", 2: "2"}, longueur=3.6, fs=26)
        self.caser_bas(dr)
        return dr.shift(DOWN * 0.45)  # la bande du haut garde la place du plan ET de l'écriture

    def plan(self):
        """Le plan de Rayan, en haut : « Plan : 13/10 m »."""
        papier = RoundedRectangle(width=3.0, height=1.15, corner_radius=0.1, fill_color="#fef3c7", fill_opacity=1,
                                  stroke_color="#a16207", stroke_width=3)
        lp = self.t("Plan :", 28, NUIT)
        lp.sans_synchro = True
        f = EcritureFraction(13, 10, fs=34, couleur=NUIT)
        m = self.t("m", 28, NUIT)
        m.sans_synchro = True
        corps = VGroup(lp, f, m).arrange(RIGHT, buff=0.18).move_to(papier)
        return VGroup(papier, corps)

    def construct(self):
        self.margo_bas()
        titre, badge = self.entete_short("La règle du menuisier", self.ceinture)
        self.add(badge)
        garder = [badge, titre, self.mobjects[0]]

        # ── 00 : Rayan, menuisier ──
        self.dire("00-accroche")
        pers = menuisier(0.62).move_to(P(-1.2, 1.25))
        self.au_mot("Rayan")
        nom = self.t("Rayan", 32, BLEU_CALCUL).move_to(P(0.95, 1.85))
        self.play(FadeIn(pers, shift=UP * 0.2), FadeIn(nom), run_time=0.5)
        self.au_mot("menuisier")
        met = self.t("menuisier", 28, BLEU_CALCUL).next_to(nom, DOWN, buff=0.12)
        self.play(FadeIn(met, shift=UP * 0.15), run_time=0.4)
        pl = self.plan().move_to(P(0, -0.3))
        self.au_mot("Son plan")
        self.play(FadeIn(pl[0]), FadeIn(pl[1][0]), run_time=0.4)
        self.au_mot("13 dixièmes")
        self.play(FadeIn(pl[1][1], scale=1.3), FadeIn(pl[1][2]), run_time=0.4)
        self.insister(pl[1][1], 1.3)
        self.au_mot("Sa règle")
        rg = regle_bois(centre=P(0, -1.45))
        self.play(Write(titre), FadeIn(rg, shift=UP * 0.2), run_time=0.6)
        self.au_mot("des virgules")
        self.play(LaggedStart(*[Indicate(e, color=AMBRE, scale_factor=1.4) for e in rg if isinstance(e, Text)],
                              lag_ratio=0.15), run_time=0.8)
        self.au_mot("Il coupe où")
        q = self.t("?", 60, ORANGE_RETENUE).move_to(P(0, -2.3))
        self.play(FadeIn(q, scale=0.5), run_time=0.35)
        self.attendre_voix(marge=0.2)
        # la règle devient la droite graduée (avant la voix suivante)
        dr = self.droite()
        pl2 = self.plan().scale(0.68).move_to(P(0, 1.85))
        self.play(FadeOut(VGroup(pers, nom, met, q)), ReplacementTransform(pl, pl2),
                  ReplacementTransform(rg, VGroup(dr.carte, dr.axe, *dr.ticks.values(), *dr.etiquettes.values())),
                  run_time=0.6)

        # ── 01 : 10 dixièmes = 1 mètre ──
        self.dire("01-dix")
        eq1 = VGroup(self.inline("10/10", 34), self.t("= 1 m", 34, VERT_OK)).arrange(RIGHT, buff=0.18).move_to(
            P(0, 0.95))
        self.au_mot("10 dixièmes")
        self.play(FadeIn(eq1[0], shift=UP * 0.15),
                  LaggedStart(*[Create(segment(dr, k / 10, (k + 1) / 10, sw=9)) for k in range(10)], lag_ratio=0.12),
                  run_time=0.9)
        self.au_mot("1 mètre")
        self.play(FadeIn(eq1[1], shift=UP * 0.15), Indicate(dr.etiquettes[1], color=VERT_OK, scale_factor=1.6),
                  run_time=0.45)
        self.attendre_voix(marge=0.2)

        # ── 02 : 3 dixièmes de plus : 13/10 = 1,3 ──
        self.dire("02-trois")
        self.au_mot("Plus 3")
        self.play(LaggedStart(*[Create(segment(dr, 1 + k / 10, 1 + (k + 1) / 10, AMBRE, sw=9)) for k in range(3)],
                              lag_ratio=0.3), run_time=0.6)
        f13 = EcritureFraction(13, 10, fs=34)
        e13 = self.t("= 1,3", 38, VERT_OK)
        eq2 = VGroup(f13, e13).arrange(RIGHT, buff=0.2).move_to(P(0, 1.0))
        self.au_mot("13 dixièmes")
        self.play(FadeOut(eq1), FadeIn(f13, scale=1.3), run_time=0.4)
        self.play(FadeIn(e13, shift=RIGHT * 0.15), run_time=0.35)
        self.au_mot("13 dixièmes", n=2)
        pt = dr.point(1.3, (13, 10), haut=0.38, fs=26)
        self.play(FadeIn(pt, shift=DOWN * 0.2), run_time=0.35)
        self.insister(pt[2], 1.4)
        self.au_mot("1,3", n=2)
        d = decimal_sous(dr, 1.3, "1,3", fs=26)
        self.play(FadeIn(d, scale=1.4), run_time=0.35)
        self.au_mot("Même point")
        li = lien(dr, 1.3, haut=0.38)
        self.play(Create(li), Flash(dr.p(1.3), color=AMBRE, flash_radius=0.4), run_time=0.5)
        self.attendre_voix(marge=0.4)
        self.vider(garder)

        # ── 03 : la question en commentaire (17/10 = ?) ──
        self.dire("03-question")
        dr = self.droite()
        self.add(dr)
        self.au_mot("À toi")
        moi = self.t("À toi !", 40, JAUNE_TITRE).move_to(P(0, 1.85))
        self.play(FadeIn(moi, scale=0.8), run_time=0.35)
        f17 = EcritureFraction(17, 10, fs=34)
        e17 = self.inline("= ?", 38, ORANGE_TROU)
        eq3 = VGroup(f17, e17).arrange(RIGHT, buff=0.2).move_to(P(0, 0.95))
        pt = dr.point(1.7, (17, 10), haut=0.38, fs=26)
        qm = Text("?", font_size=34, color=ORANGE_TROU).next_to(dr.p(1.7) + DOWN * 0.25, DOWN, buff=0.08)
        qm.sans_synchro = True
        self.au_mot("17 dixièmes")
        self.play(FadeIn(f17, scale=1.3), FadeIn(pt, shift=DOWN * 0.2), run_time=0.45)
        self.au_mot("avec une virgule")
        self.play(FadeIn(e17, scale=1.3), FadeIn(qm, scale=1.3), run_time=0.4)
        self.play(e17.animate.scale(1.3), qm.animate.scale(1.3), run_time=0.2)  # chacun sur place
        self.play(e17.animate.scale(1 / 1.3), qm.animate.scale(1 / 1.3), run_time=0.2)
        self.au_mot("Ta réponse")
        appel = self.bloc(["Ta réponse", "en commentaire !"], 32, VERT_OK, buff=0.06).move_to(P(0, -2.3))
        self.play(FadeIn(appel, scale=0.7), run_time=0.35)
        self.insister(appel, 1.1, 0.25)
        self.attendre_voix(marge=1.5)
