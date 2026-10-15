# second_degre_shorts.py
# EleveAI — les shorts du second degré (1re spé). La vidéo paysage est dans
# `second_degre.py`.
#
# ⭐ SHORT 1 — « Qui va le plus haut ? Qui va le plus loin ? Dauphin vs baleine »
# (Frédéric, 15/09/2026 : « en donnant les deux équations de trajectoire », et
# « un short doit expliquer à quoi ça sert aussi »).
#   Le plus LOIN = la seconde racine (y redevient 0) ; le plus HAUT = au milieu
#   des racines. Deux questions, deux gestes du second degré, sans forme canonique.
#
# ⛔ Modèles vérifiés :
#   dauphin  y = −0,5x² + 3x   → racines 0 et 6 ; sommet en x = 3 : y = 4,5
#   baleine  y = −0,1x² + 1,2x → racines 0 et 12 ; sommet en x = 6 : y = 3,6
#   La baleine va deux fois plus loin, le dauphin monte plus haut.
#
# Rendu :
#   python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/premiere/second_degre_shorts.py SecondDegreShortDauphin -o eleveai-maths-premiere-second-degre-short-dauphin --media_dir manim/scripts/premiere/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parent))

from manim import *

from charte import *
from exponentielle import ExponentielleBase
from gabarit_seconde import SONS, ShortSeconde

C_DAUPHIN = BLEU_CALCUL
C_BALEINE = VERT_OK

DAUPHIN = lambda x: -0.5 * x * x + 3 * x
BALEINE = lambda x: -0.1 * x * x + 1.2 * x


class SecondDegreShortDauphin(ShortSeconde, ExponentielleBase):

    dossier_voix = SONS / "premiere-second-degre-short-dauphin"

    def carre(self, base, font_size=40, color=WHITE):
        g = self.puissance(base, "2", font_size=font_size, color=color)
        g.est_puissance = True
        return g

    def sauts(self, centre=(0.05, 0.1), x_len=3.9, y_len=2.3):
        """Les deux trajectoires dans un même repère : distance en x, hauteur en y."""
        ax = Axes(x_range=[0, 13, 3], y_range=[0, 5.5, 1], x_length=x_len, y_length=y_len, tips=False,
                  x_axis_config={"include_numbers": True, "label_constructor": Text, "font_size": 16},
                  y_axis_config={"include_numbers": True, "label_constructor": Text, "font_size": 16})
        ax.move_to([centre[0], centre[1], 0])
        d = ax.plot(DAUPHIN, x_range=[0, 6], color=C_DAUPHIN, stroke_width=6)
        b = ax.plot(BALEINE, x_range=[0, 12], color=C_BALEINE, stroke_width=6)
        ld = Text("dauphin", font_size=20, color=C_DAUPHIN).next_to(ax.c2p(3, 4.5), UP, buff=0.12)
        # ⛔ Brouillon : « baleine » posé en haut à droite du point x = 9,5 sortait du
        # cadre de 4,5 unités. Posé AU-DESSUS de la courbe, plus à gauche.
        lb = Text("baleine", font_size=20, color=C_BALEINE).move_to(ax.c2p(10.8, 3.6))
        return ax, d, b, ld, lb

    # ── 00 : l'accroche — tout est à l'image dès la première seconde ─────────

    def ecran_accroche(self):
        self.clear()
        self.margo_bas()
        self.dire("00-accroche")
        haut = VGroup(
            self.grand("Dauphin vs baleine", font_size=54, color=JAUNE_TITRE),
            self.grand("Qui va le plus haut ?", font_size=36, color=C_DAUPHIN),
            self.grand("Qui va le plus loin ?", font_size=36, color=C_BALEINE),
        ).arrange(DOWN, buff=0.22).move_to([0, 2.1, 0])
        ax, d, b, ld, lb = self.sauts(centre=(0.05, -0.55))
        self.add(haut, ax, d, b, ld, lb)  # à l'image à la première seconde, sans animation
        self.play(Flash(haut[0], color=JAUNE_TITRE, line_length=0.3), run_time=0.6)
        self.attendre_voix(marge=0.3)

    # ── 01 : les deux équations ─────────────────────────────────────────────

    def ecran_equations(self):
        self.clear()
        self.margo_bas()
        self.dire("01-equations")
        self.play(Write(self.grand("Les deux trajectoires", font_size=40, color=JAUNE_TITRE).move_to([0, 3.0, 0])))
        ed = self.rang("dauphin :  y = −0,5", self.carre("x", 32, C_DAUPHIN), "+ 3x", font_size=32, color=C_DAUPHIN, buff=0.14)
        eb = self.rang("baleine :  y = −0,1", self.carre("x", 32, C_BALEINE), "+ 1,2x", font_size=32, color=C_BALEINE, buff=0.14)
        for e in (ed, eb):
            if e.width > config.frame_width - 0.5:
                e.scale_to_fit_width(config.frame_width - 0.5)
        VGroup(ed, eb).arrange(DOWN, buff=0.3).move_to([0, 2.05, 0])
        self.play(FadeIn(ed, shift=RIGHT * 0.1))
        self.play(FadeIn(eb, shift=RIGHT * 0.1))
        # ⛔ Brouillon : la légende recouvrait les graduations. Le repère monte, la
        # légende descend, et rien de vital sous y = −2,2.
        ax, d, b, ld, lb = self.sauts(centre=(0.05, 0.15), y_len=2.1)
        self.play(Create(ax), run_time=0.6)
        self.play(Create(d), Create(b), FadeIn(ld), FadeIn(lb), run_time=1.2)
        legende = VGroup(self.grand("x : la distance, en m", font_size=26, color=WHITE),
                         self.grand("y : la hauteur, en m", font_size=26, color=WHITE)).arrange(DOWN, buff=0.1).move_to([0, -1.85, 0])
        self.play(FadeIn(legende))
        self.attendre_voix(marge=0.3)

    # ── 02 : le plus loin = la seconde racine ───────────────────────────────

    def ecran_loin(self):
        self.clear()
        self.margo_bas()
        self.dire("02-loin")
        self.play(Write(self.grand("Le plus loin ?", font_size=44, color=JAUNE_TITRE).move_to([0, 3.0, 0])))
        regle = self.grand("y = 0  →  la 2e racine", font_size=30, color=WHITE).move_to([0, 2.35, 0])
        self.play(FadeIn(regle))
        ax, d, b, ld, lb = self.sauts(centre=(0.05, 0.55))
        self.add(ax, d, b, ld, lb)
        pd = Dot(ax.c2p(6, 0), color=C_DAUPHIN, radius=0.09)
        pb = Dot(ax.c2p(12, 0), color=C_BALEINE, radius=0.09)
        rd = self.grand("dauphin : x = 6 m", font_size=30, color=C_DAUPHIN).move_to([0, -1.05, 0])
        rb = self.grand("baleine : x = 12 m", font_size=30, color=C_BALEINE).move_to([0, -1.5, 0])
        self.play(GrowFromCenter(pd), FadeIn(rd))
        self.play(GrowFromCenter(pb), FadeIn(rb))
        verdict = self.grand("la baleine, 2 fois plus loin", font_size=30, color=C_BALEINE).move_to([0, -2.05, 0])
        self.play(Write(verdict), Flash(pb, color=C_BALEINE, line_length=0.25))
        self.attendre_voix(marge=0.3)

    # ── 03 : le plus haut = au milieu des racines ───────────────────────────

    def ecran_haut(self):
        self.clear()
        self.margo_bas()
        self.dire("03-haut")
        self.play(Write(self.grand("Le plus haut ?", font_size=44, color=JAUNE_TITRE).move_to([0, 3.0, 0])))
        regle = self.grand("au milieu des deux racines", font_size=30, color=WHITE).move_to([0, 2.35, 0])
        self.play(FadeIn(regle))
        ax, d, b, ld, lb = self.sauts(centre=(0.05, 0.55))
        self.add(ax, d, b)
        sd = Dot(ax.c2p(3, 4.5), color=C_DAUPHIN, radius=0.09)
        sb = Dot(ax.c2p(6, 3.6), color=C_BALEINE, radius=0.09)
        hd = DashedLine(ax.c2p(3, 0), ax.c2p(3, 4.5), color=C_DAUPHIN, stroke_width=2)
        hb = DashedLine(ax.c2p(6, 0), ax.c2p(6, 3.6), color=C_BALEINE, stroke_width=2)
        rd = self.grand("dauphin : x = 3 → y = 4,5 m", font_size=28, color=C_DAUPHIN).move_to([0, -1.05, 0])
        rb = self.grand("baleine : x = 6 → y = 3,6 m", font_size=28, color=C_BALEINE).move_to([0, -1.5, 0])
        self.play(Create(hd), GrowFromCenter(sd), FadeIn(rd))
        self.play(Create(hb), GrowFromCenter(sb), FadeIn(rb))
        verdict = self.grand("le dauphin monte plus haut !", font_size=30, color=C_DAUPHIN).move_to([0, -2.05, 0])
        self.play(Write(verdict), Flash(sd, color=C_DAUPHIN, line_length=0.25))
        self.attendre_voix(marge=0.3)

    # ── 04 : à quoi ça sert ─────────────────────────────────────────────────

    def ecran_sert(self):
        self.clear()
        self.margo_bas()
        self.dire("04-sert")
        self.play(Write(self.grand("À quoi ça sert ?", font_size=44, color=JAUNE_TITRE).move_to([0, 3.0, 0])))
        # ⚠️ Entre le titre (y = 3,0) et le repère : à 2,15 le bloc mordait sur le
        # titre, à 1,95 le repère mordait sur le bloc. 2,0 et une police de moins.
        idee = VGroup(
            self.grand("une équation", font_size=32, color=WHITE),
            self.grand("du second degré", font_size=32, color=WHITE),
            self.grand("= une trajectoire", font_size=36, color=ORANGE_RETENUE),
        ).arrange(DOWN, buff=0.08).move_to([0, 2.0, 0])
        self.play(FadeIn(idee, shift=DOWN * 0.1))
        # ⛔ Brouillon : « où ça retombe » s'écrivait sur les graduations. Le repère
        # est plus petit et plus haut, les deux réponses en dessous, au-dessus de
        # la bande basse.
        # ⚠️ `move_to` centre les axes sur la MOITIÉ de leur hauteur : l'axe des x
        # est donc plus bas que le centre, et ses nombres encore en dessous — et
        # le « 5 » du haut de l'axe des y dépasse la boîte. Mesuré deux fois au
        # rendu 1080×1920 : le bloc du haut monte, le repère descend d'un cran.
        ax, d, b, ld, lb = self.sauts(centre=(0.05, 0.4), x_len=3.4, y_len=1.3)
        self.play(Create(ax), Create(d), Create(b), run_time=0.9)
        p1 = VGroup(self.grand("où ça retombe", font_size=28, color=C_BALEINE),
                    self.grand("→ la racine", font_size=22, color=WHITE)).arrange(DOWN, buff=0.04)
        p2 = VGroup(self.grand("jusqu'où ça monte", font_size=28, color=C_DAUPHIN),
                    self.grand("→ le sommet", font_size=22, color=WHITE)).arrange(DOWN, buff=0.04)
        VGroup(p1, p2).arrange(DOWN, buff=0.14).move_to([0, -1.65, 0])
        self.play(FadeIn(p1, shift=UP * 0.1))
        self.play(FadeIn(p2, shift=UP * 0.1))
        self.attendre_voix(marge=0.3)

    def construct(self):
        self.ecran_accroche()
        self.ecran_equations()
        self.ecran_loin()
        self.ecran_haut()
        self.ecran_sert()
        self.ecran_renvoi("05-fin")
