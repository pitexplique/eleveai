# signes_short_dauphin.py
# EleveAI — Maths seconde — short « Le dauphin et le tableau de signes ».
# CEINTURE BLANCHE (Frédéric, 11/10/2026) : « un short simple, un dauphin qui
# saute en haut et le tableau de signes qui se remplit en bas, le dauphin
# devient bleu dans l'air et d'une autre couleur dans l'eau ».
# Voix validée : manim/voix/seconde-signes-expression-short-dauphin.json.
# La paysage (ceinture verte) : signes_expression_2de.py — mêmes dessins,
# même h(t) = (3 − t)(t − 1), mêmes couleurs (+ bleu, − orange).
#
# ⭐ LE DAUPHIN PASSE AU-DESSUS DE SA COLONNE : son abscisse suit les colonnes
# du tableau (0, 1, 3, 4 ne sont pas équidistants dans un tableau de signes),
# pour que l'œil descende tout droit du dauphin à son signe.
#
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/seconde/signes_short_dauphin.py ShortSignesDauphin -o eleveai-maths-seconde-signes-short-dauphin --media_dir manim/scripts/seconde/media

import math
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parent))

from manim import *

from charte import *
from gabarit_sixieme import Short6e
from signes_expression_2de import MER, MOINS, PLUS, Tableau, ceinture, dauphin, h

Y_MER = 1.2


class ShortSignesDauphin(Short6e):
    nom_voix = "seconde-signes-expression-short-dauphin"

    def k_de_t(self, t):
        """Le temps → le demi-indice de colonne (0→0, 1→2, 3→4, 4→6)."""
        if t <= 1:
            return 2 * t
        if t <= 3:
            return 2 + (t - 1)
        return 4 + 2 * (t - 3)

    def pos(self, t):
        return np.array([self.T.x(self.k_de_t(t)), Y_MER + 0.7 * h(t), 0])

    def fabrique_dauphin(self):
        tt = self.tr.get_value()
        a, b = self.pos(max(tt - 0.01, 0)), self.pos(min(tt + 0.01, 4))
        c = PLUS if h(tt) > 0 else MOINS
        return dauphin(c).scale(0.45).rotate(math.atan2(b[1] - a[1], b[0] - a[0])).move_to(self.pos(tt))

    def nager(self, jusqu_a, run_time):
        self.play(self.tr.animate.set_value(jusqu_a), run_time=run_time, rate_func=linear)

    def construct(self):
        self.T = Tableau(["0", "1", "3", "4"], centre_x=0.0, y_haut=-1.0, larg_lab=0.95,
                         pas=0.95, h=0.58, fs=26, marge=0.25)
        T = self.T
        self.margo_bas()

        # ── 00 ──
        self.dire("00-accroche")
        titre = self.grand("Le tableau de signes", font_size=36, color=JAUNE_TITRE).move_to([0, 2.75, 0])
        badge = VGroup(ceinture("#F5F5F5", 0.8).scale(0.7), self.grand("Ceinture blanche", font_size=22))
        badge.arrange(RIGHT, buff=0.18).move_to([0, 2.2, 0])
        surface = Line([-2.25, Y_MER, 0], [2.25, Y_MER, 0], color=BLEU_CALCUL, stroke_width=3)
        mer = Rectangle(width=4.5, height=Y_MER + 0.95).set_fill(MER, 0.55).set_stroke(width=0)
        mer.move_to([0, (Y_MER - 0.95) / 2, 0])
        self.add(mer)
        self.play(FadeIn(titre), FadeIn(badge), Create(surface), run_time=0.8)
        self.tr = ValueTracker(0.0)
        d = always_redraw(self.fabrique_dauphin)
        trace = TracedPath(lambda: self.pos(self.tr.get_value()), stroke_color=WHITE, stroke_width=2, stroke_opacity=0.5)
        self.add(trace, d)
        q = self.grand("Où est-il, à chaque seconde ?", font_size=28, color=WHITE).move_to([0, -1.55, 0])
        self.au_mot("Où est-il")
        self.play(FadeIn(q), self.tr.animate(rate_func=linear).set_value(4.0), run_time=2.4)
        self.attendre_voix(marge=0.3)

        # ── 01 ──
        self.dire("01-couleurs")
        self.remove(trace)
        self.tr.set_value(0.4)
        self.play(FadeOut(q), run_time=0.3)
        self.au_mot("Sous l'eau")
        l1 = self.grand("sous l'eau → signe −", font_size=30, color=MOINS).move_to([0, -1.3, 0])
        self.play(FadeIn(l1), Flash(d, color=MOINS))
        self.au_mot("Dans l'air")
        self.play(self.tr.animate.set_value(2.0), run_time=1.0)
        l2 = self.grand("dans l'air → signe +", font_size=30, color=PLUS).move_to([0, -1.95, 0])
        self.play(FadeIn(l2), Flash(d, color=PLUS))
        self.attendre_voix(marge=0.3)

        # ── 02 ──
        self.dire("02-tableau")
        self.play(FadeOut(l1), FadeOut(l2), self.tr.animate.set_value(0.0), run_time=0.6)
        trace = TracedPath(lambda: self.pos(self.tr.get_value()), stroke_color=WHITE, stroke_width=2, stroke_opacity=0.5)
        self.add(trace)
        l0, ls = T.ligne(0, "t (s)"), T.ligne(1, "signe", JAUNE_TITRE)
        self.au_mot("Regarde le tableau")
        self.play(Create(l0), Create(ls), *[FadeIn(T.valeur(i)) for i in range(4)])
        curseur = always_redraw(lambda: Line([T.x(self.k_de_t(self.tr.get_value())), T.y(1) - T.h / 2, 0],
                                             self.pos(self.tr.get_value()), color=JAUNE_TITRE,
                                             stroke_width=2, stroke_opacity=0.7))
        self.add(curseur)
        etapes = [("De 0 à 1 seconde", 1.0, 1, "−"), ("À 1 seconde", None, 2, "0"),
                  ("De 1 à 3 secondes", 3.0, 3, "+"), ("À 3 secondes", None, 4, "0"),
                  ("Puis il replonge", 4.0, 5, "−")]
        for mot, cible, k, s in etapes:
            self.au_mot(mot)
            if cible is not None:
                self.nager(cible, 1.4 if cible - self.tr.get_value() > 1 else 1.0)
            c = T.case(1, k, s)
            self.play(FadeIn(c, scale=1.6), run_time=0.4)
        self.remove(curseur)
        self.attendre_voix(marge=0.3)

        # ── 03 ──
        self.dire("03-retenir")
        cadre = SurroundingRectangle(VGroup(l0, ls), color=JAUNE_TITRE, buff=0.06)
        self.play(Create(cadre))
        self.au_mot("dire où est le dauphin")
        phrase = VGroup(self.grand("= où est le dauphin,", font_size=30, color=VERT_OK),
                        self.grand("à chaque instant", font_size=30, color=VERT_OK)).arrange(DOWN, buff=0.1).move_to([0, 0.35, 0])
        fond = BackgroundRectangle(phrase, color=BLACK, fill_opacity=0.85, buff=0.12)
        self.play(FadeIn(fond), FadeIn(phrase))
        self.attendre_voix(marge=0.5)

        # ── 04 ──
        self.clear()
        self.margo_bas()
        self.dire("04-question")
        self.play(Write(self.grand("À toi !", font_size=56, color=JAUNE_TITRE).move_to([0, 2.5, 0])))
        g = VGroup(*[self.grand(t, font_size=s, color=c) for t, s, c in
                     [("Combien de secondes", 38, WHITE), ("le dauphin est-il", 38, WHITE), ("dans l'air ?", 48, PLUS)]])
        self.play(FadeIn(g.arrange(DOWN, buff=0.18).move_to([0, 0.9, 0])))
        self.play(FadeIn(dauphin(PLUS).scale(0.6).rotate(0.3).move_to([0, -0.4, 0])))
        self.au_mot("Ta réponse en commentaire")
        rep = VGroup(self.grand("en commentaire !", font_size=40, color=VERT_OK),
                     self.grand("@eleveai974", font_size=40, color=BLEU_CALCUL)).arrange(DOWN, buff=0.16)
        self.play(FadeIn(rep.move_to([0, -1.55, 0])))
        self.attendre_voix(marge=1.5)
