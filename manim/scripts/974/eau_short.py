# eau_short.py
# EleveAI — « Les maths en vrai » — short « 1 mm de pluie = 1 litre ». CEINTURE BLANCHE.
# Voix validée : manim/voix/974-eau-short-millimetre.json (débit −8).
# La paysage (ceinture verte) : eau.py — même eau bleue, mêmes dessins.
# Micro du coach : volume_unite (5e).
#
# ⭐ RÈGLE DU SHORT BLANC : en HAUT le bac de 1 m² sous la pluie, en BAS la
# bouteille graduée. UN SEUL ValueTracker (les mm) pilote les deux : la couche
# d'eau monte dans le bac EN MÊME TEMPS que la bouteille se remplit, et le
# nombre de litres égale le nombre de millimètres.
#
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/974/eau_short.py Eau974Short -o eleveai-maths-974-eau-short-millimetre --media_dir manim/scripts/974/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "seconde"))
sys.path.insert(0, str(Path(__file__).resolve().parent))

from manim import *

from charte import *
from gabarit_sixieme import Short6e
from signes_expression_2de import ceinture
from eau import EAU, PERTE, bac, galets, maison, pluie, tomber

Y_BAC = 0.75
MM_UNITE = 0.07     # 1 mm → 0,07 unité dans le bac (grossi)
L_UNITE = 0.15      # 1 L → 0,15 unité dans la bouteille


class Eau974Short(Short6e):
    nom_voix = "974-eau-short-millimetre"

    def bouteille(self):
        """Une bouteille graduée de 0 à 10 L, son eau suit self.mm."""
        bas = -2.05
        corps = Rectangle(width=1.1, height=10 * L_UNITE + 0.1).set_stroke(WHITE, 2.5)
        corps.move_to([-0.6, bas + corps.height / 2, 0])
        col = Line(corps.get_corner(UL) + RIGHT * 0.3, corps.get_corner(UR) + LEFT * 0.3)
        goulot = Rectangle(width=0.4, height=0.25).set_stroke(WHITE, 2.5).next_to(corps, UP, buff=0)
        grads = VGroup()
        for k in (0, 5, 10):
            y = bas + k * L_UNITE
            grads.add(Line([0.0, y, 0], [-0.15, y, 0], color=WHITE, stroke_width=2))
            grads.add(Text(f"{k} L", font_size=18).move_to([0.32, y, 0]))
        eau = always_redraw(lambda: Rectangle(width=1.04, height=max(self.mm.get_value() * L_UNITE, 0.001))
                            .set_fill(EAU, 0.85).set_stroke(width=0)
                            .move_to([-0.6, bas + self.mm.get_value() * L_UNITE / 2, 0]))
        lbl = always_redraw(lambda: Text(f"{self.mm.get_value():.0f} L", font_size=40, color=EAU)
                            .move_to([1.35, bas + 0.75, 0]))
        return VGroup(corps, goulot), grads, eau, lbl

    def construct(self):
        self.margo_bas()
        self.mm = ValueTracker(0.0)

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        titre = self.grand("1 mm de pluie ?", font_size=40, color=JAUNE_TITRE).move_to([0, 2.75, 0])
        badge = VGroup(ceinture("#F5F5F5", 0.8).scale(0.7), self.grand("Ceinture blanche", font_size=22))
        badge.arrange(RIGHT, buff=0.18).move_to([0, 2.2, 0])
        self.play(FadeIn(titre), FadeIn(badge), run_time=0.6)
        lieu = self.grand("Juin, Saint-Pierre", font_size=28).move_to([0, 1.4, 0])
        fond = Line([-1.8, 0.4, 0], [1.8, 0.4, 0], color=GREY_B, stroke_width=3)
        pierres = galets(-1.7, 1.7, 0.55, n=11)
        self.play(FadeIn(lieu), Create(fond))
        self.au_mot("La rivière est à sec")
        self.play(LaggedStart(*[FadeIn(p, scale=0.5) for p in pierres], lag_ratio=0.06), run_time=0.8)
        sec = self.grand("la rivière est à sec", font_size=28, color=PERTE).move_to([0, -0.1, 0])
        self.play(FadeIn(sec))
        self.au_mot("la météo annonce")
        meteo = self.grand("« 30 mm de pluie »", font_size=40, color=EAU).move_to([0, -0.95, 0])
        self.play(GrowFromCenter(meteo))
        self.au_mot("c'est beaucoup")
        q = self.grand("beaucoup, ou pas ?", font_size=32, color=WHITE).move_to([0, -1.75, 0])
        self.play(FadeIn(q))
        self.attendre_voix(marge=0.3)

        # ── 01 : le carré sous la pluie ──
        self.play(FadeOut(VGroup(lieu, fond, pierres, sec, meteo, q)), run_time=0.4)
        self.dire("01-carre")
        aretes, fond_bac, niveau, (a, b) = bac(largeur=2.4, profondeur=(0.8, 0.45), hauteur=1.0,
                                               centre=[-0.35, Y_BAC, 0])
        self.play(FadeIn(fond_bac), Create(aretes))
        c1 = self.grand("1 m", font_size=22).next_to(Line(a, b), DOWN, buff=0.1)
        c2 = self.grand("1 m", font_size=22).move_to(b + [0.65, 0.12, 0])
        self.play(FadeIn(c1), FadeIn(c2))
        couche = always_redraw(lambda: niveau(max(self.mm.get_value() * MM_UNITE, 0.001)))
        mm_lbl = always_redraw(lambda: Text(f"{self.mm.get_value():.0f} mm", font_size=28, color=EAU)
                               .move_to([-1.55, Y_BAC - 0.75, 0]))
        self.add(couche)
        corps, grads, eau, l_lbl = self.bouteille()
        self.play(FadeIn(corps), FadeIn(grads))
        self.add(eau, mm_lbl, l_lbl)
        self.au_mot("Il pleut")
        gouttes = pluie(-1.6, 1.0, 2.0, Y_BAC, n=12)
        self.add(gouttes)
        self.play(tomber(gouttes, Y_BAC - 0.4), self.mm.animate.set_value(1), run_time=1.6)
        self.attendre_voix(marge=0.2)

        # ── 02 : 1 litre ──
        self.dire("02-litre")
        self.au_mot("1 litre")
        self.play(Flash(l_lbl, color=EAU, line_length=0.25))
        self.au_mot("1 millimètre sur 1 mètre carré")
        regle = self.grand("1 mm sur 1 m² = 1 L", font_size=36, color=JAUNE_TITRE).move_to([0, 2.75, 0])
        self.play(FadeOut(titre), FadeIn(regle))
        self.attendre_voix(marge=0.2)

        # ── 03 : encore ──
        self.dire("03-encore")
        for mot, v in (("2 millimètres", 2), ("5 millimètres", 5), ("10 millimètres", 10)):
            self.au_mot(mot)
            gouttes = pluie(-1.6, 1.0, 2.0, Y_BAC, n=8, graine=v)
            self.add(gouttes)
            self.play(tomber(gouttes, Y_BAC - 0.4), self.mm.animate.set_value(v), run_time=1.0)
        self.attendre_voix(marge=0.3)

        # ── 04 : la question ──
        self.clear()
        self.margo_bas()
        self.dire("04-question")
        self.play(Write(self.grand("À toi !", font_size=56, color=JAUNE_TITRE).move_to([0, 2.6, 0])))
        m = maison(1.6, centre=[0, 0.75, 0]).scale(0.75)
        self.play(FadeIn(m))
        g = VGroup(self.grand("30 mm sur un toit", font_size=30),
                   self.grand("de 100 m²", font_size=30),
                   self.grand("combien de litres ?", font_size=36, color=EAU)).arrange(DOWN, buff=0.12)
        self.play(FadeIn(g.move_to([0, -0.75, 0])))
        self.au_mot("Réponds en commentaire")
        rep = self.grand("en commentaire !", font_size=34, color=VERT_OK).move_to([0, -1.9, 0])
        self.play(FadeIn(rep))
        self.attendre_voix(marge=1.5)
