# proba_comparer_short.py
# EleveAI — Maths 4e — short jumeau de Probabilités, épisode 7 : comparer.
# CEINTURE JAUNE. Il AMUSE : le pari « tombola A ou tombola B ? ».
#   · en HAUT, les tickets des deux tombolas (A : 5 gagnants dorés sur 20 ;
#     B : 1 gagnant sur 3) qui tombent et s'agitent ;
#   · en BAS, EN MÊME TEMPS, les fractions et deux jauges qui se remplissent
#     (25 % contre environ 33 %) : la B gagne avec un seul ticket gagnant ;
#   · fin : 3 chances sur 10 ou 1 chance sur 4 ? « Réponds en commentaire ! ».
# Ti-Margo en bas (margo_bas). Voix : manim/voix/4e-proba-comparer-short.json (débit −7).
#
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/4e/proba_comparer_short.py ProbaComparer4eShort -o eleveai-maths-4e-proba-comparer-short --media_dir manim/scripts/4e/media
# Puis copier le mp4 dans manim/sorties/4e/maths/probabilites/07-comparer/.

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from proba_comparer import P, etoile  # noqa: E402  (pose les chemins)

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

LARGEUR_MAX = 4.1
TICKET = "#F9A8D4"
OR = "#FACC15"
X_BARRE, L_BARRE, H_BARRE = -0.05, 1.6, 0.38


def ticket(gagnant=False, s=1.0):
    """Un ticket de tombola, sa perforation ; le gagnant est doré et étoilé."""
    corps = RoundedRectangle(width=0.42, height=0.26, corner_radius=0.05, fill_color=OR if gagnant else TICKET,
                             fill_opacity=1, stroke_color=WHITE, stroke_width=1.5)
    perfo = DashedLine(P(-0.12, 0.11), P(-0.12, -0.11), stroke_color="#9D174D", stroke_width=1.5, dash_length=0.03)
    g = VGroup(corps, perfo)
    if gagnant:
        g.add(etoile(0.075).move_to(P(0.05, 0)))
    return g.scale(s)


def tickets(n, g, cols, s=1.0):
    """n tickets en grille, dont g gagnants répartis."""
    gagn = {int((k + 0.5) * n / g) for k in range(g)}
    tk = VGroup(*[ticket(k in gagn, s) for k in range(n)])
    return tk.arrange_in_grid(cols=cols, buff=(0.06 * s, 0.07 * s))


class ProbaComparer4eShort(Short6e):
    nom_voix = "4e-proba-comparer-short"

    def t(self, texte, font_size=30, color=WHITE, largeur=LARGEUR_MAX):
        t = Text(texte, font_size=font_size, color=color)
        if t.width > largeur:
            t.scale_to_fit_width(largeur)
        return t

    def fraction(self, num, den, font_size=32, color=WHITE):
        n = Text(str(num), font_size=font_size, color=color)
        d = Text(str(den), font_size=font_size, color=color)
        larg = max(n.width, d.width) + 0.14
        barre = Line(LEFT * larg / 2, RIGHT * larg / 2, color=color, stroke_width=3.5)
        return VGroup(n, barre, d).arrange(DOWN, buff=0.07)

    def insister(self, mob, k=1.4, run_time=0.3):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def gagnants(self, tk):
        return VGroup(*[t for t in tk if len(t) > 2])

    def tomber(self, tk, run_time=1.0):
        hauts = [t.copy().shift(UP * 2.5) for t in tk]
        self.play(LaggedStart(*[Transform(h, t) for h, t in zip(hauts, tk)], lag_ratio=0.05),
                  run_time=run_time, rate_func=rate_functions.ease_out_bounce)
        self.remove(*hauts)
        self.add(tk)

    def rangee(self, lettre, num, den, y):
        """Une rangée du bas : lettre, fraction, barre vide (cadre + remplissage nul)."""
        lab = self.t(lettre, 32, JAUNE_TITRE).move_to(P(-1.95, y))
        f = self.fraction(num, den, 30, JAUNE_TITRE).move_to(P(-1.35, y))
        cadre = Rectangle(width=L_BARRE, height=H_BARRE, stroke_color=WHITE, stroke_width=2.5).move_to(P(X_BARRE, y))
        return lab, f, cadre

    def remplir(self, cadre, pct, couleur=VERT_OK):
        r = Rectangle(width=L_BARRE * pct / 100, height=H_BARRE, stroke_width=0, fill_color=couleur, fill_opacity=0.85)
        return r.align_to(cadre, LEFT).set_y(cadre.get_y())

    def construct(self):
        self.margo_bas()

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        titre = self.grand("Quelle tombola ?", font_size=42, color=JAUNE_TITRE).move_to(P(0, 3.4))
        badge = echelle_ceintures("jaune").scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.75))
        ta = tickets(20, 5, 5, 1.0).move_to(P(-0.85, 1.3))
        tb = tickets(3, 1, 1, 1.35).move_to(P(1.45, 1.3))
        la = self.t("A", 30, JAUNE_TITRE).next_to(ta, DOWN, buff=0.15)
        lb = self.t("B", 30, JAUNE_TITRE).next_to(tb, DOWN, buff=0.15).set_y(la.get_y())
        self.play(Write(titre), FadeIn(badge, shift=DOWN * 0.2), run_time=0.8)

        yA, yB = -0.35, -1.25
        rA = self.rangee("A", 5, 20, yA)
        rB = self.rangee("B", 1, 3, yB)
        self.au_mot("Tombola A")
        self.add(la)
        self.tomber(ta, 1.0)
        self.play(FadeIn(rA[0]), FadeIn(rA[1], shift=LEFT * 0.2), Indicate(self.gagnants(ta), color=WHITE),
                  run_time=0.6)
        self.au_mot("Tombola B")
        self.add(lb)
        self.tomber(tb, 0.6)
        self.play(FadeIn(rB[0]), FadeIn(rB[1], shift=LEFT * 0.2), Indicate(self.gagnants(tb), color=WHITE),
                  run_time=0.6)
        self.au_mot("Tu prends")
        q = self.grand("A ou B ?", font_size=48, color=BLEU_CALCUL).move_to(P(0, -2.2))
        self.play(FadeIn(q, scale=0.6), Wiggle(ta), Wiggle(tb), run_time=0.8)
        self.attendre_voix(marge=0.1)

        # ── 01 : les jauges ──
        self.dire("01-image")
        self.au_mot("5 sur 20")
        self.play(Create(rA[2]), Indicate(rA[1], color=WHITE), run_time=0.5)
        self.au_mot("25 %")
        fa = self.remplir(rA[2], 25)
        pa = self.t("25 %", 28, VERT_OK).next_to(rA[2], RIGHT, buff=0.12)
        self.play(GrowFromEdge(fa, LEFT), FadeIn(pa), run_time=0.7)
        self.au_mot("1 sur 3")
        self.play(Create(rB[2]), Indicate(rB[1], color=WHITE), run_time=0.5)
        self.au_mot("environ 33 %")
        fb = self.remplir(rB[2], 100 / 3)
        pb = VGroup(self.t("environ", 18, VERT_OK), self.t("33 %", 28, VERT_OK)).arrange(DOWN, buff=0.04)
        pb.next_to(rB[2], RIGHT, buff=0.12)
        self.play(GrowFromEdge(fb, LEFT), FadeIn(pb), run_time=0.7)
        niveau = DashedLine(P(fb.get_right()[0], yB - 0.3), P(fb.get_right()[0], yA + 0.3),
                            color=BLEU_CALCUL, stroke_width=3)
        self.play(Create(niveau), run_time=0.3)

        self.au_mot("La tombola B")
        cadre = SurroundingRectangle(VGroup(rB[0], rB[2], pb), color=VERT_OK, buff=0.08, stroke_width=4)
        gagne = self.grand("B gagne !", font_size=46, color=VERT_OK).move_to(q)
        self.play(Create(cadre), ReplacementTransform(q, gagne), run_time=0.5)
        self.au_mot("même avec un seul")
        g1 = self.gagnants(tb)
        self.play(Flash(g1, color=OR, line_length=0.25, flash_radius=0.35), run_time=0.5)
        self.insister(g1, 1.6, 0.3)
        self.attendre_voix(marge=0.3)

        # ── 02 : la question ──
        self.clear()
        self.margo_bas()
        self.dire("02-question")
        self.add(titre.become(self.grand("Et toi ?", font_size=46, color=JAUNE_TITRE).next_to(badge, UP, buff=0.15)), badge)
        t10 = tickets(10, 3, 5, 1.0).move_to(P(-0.95, 1.35))
        t4 = tickets(4, 1, 2, 1.0).move_to(P(1.35, 1.35))
        self.au_mot("3 chances sur 10")
        self.tomber(t10, 0.8)
        f1 = self.fraction(3, 10, 52, JAUNE_TITRE).move_to(P(-1.25, -0.3))
        self.play(FadeIn(f1, scale=0.7), run_time=0.4)
        self.au_mot("1 chance sur 4")
        self.tomber(t4, 0.5)
        ou = self.t("ou", 36, WHITE).move_to(P(0, -0.3))
        f2 = self.fraction(1, 4, 52, JAUNE_TITRE).move_to(P(1.25, -0.3))
        self.play(FadeIn(ou), FadeIn(f2, scale=0.7), run_time=0.4)
        self.play(Wiggle(t10), Wiggle(t4), run_time=0.6)
        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.grand("Réponds en", font_size=44, color=VERT_OK),
                       self.grand("commentaire !", font_size=44, color=VERT_OK)).arrange(DOWN, buff=0.1)
        appel.move_to(P(0, -1.85))
        self.play(FadeIn(appel, scale=0.7), run_time=0.4)
        self.insister(appel, 1.1, 0.25)
        self.attendre_voix(marge=1.5)
