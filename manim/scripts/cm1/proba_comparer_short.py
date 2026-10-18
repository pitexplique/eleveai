# proba_comparer_short.py
# EleveAI — Maths CM1 — short jumeau de la série « Probabilités », épisode 3 :
# qui a le plus de chances ? CEINTURE BLANCHE. Il AMUSE : « 5 fraises ou 2 ? »
#   · en HAUT les deux sacs du coach (carte « billes », bonbons R / J) : on ne
#     voit d'abord que les fraises… puis 20 citrons dégringolent dans le grand ;
#   · en BAS, EN MÊME TEMPS, les comptes (5 R, 2 R, puis 20 J, 1 J) et une
#     bande par sac (une case par bonbon) : le rouge du grand sac se ratatine ;
#   · fin : 1 F + 1 C ou 3 F + 5 C ? « Réponds en commentaire ! » (pas de bande :
#     elle donnerait la réponse).
# ⛔ PAS D'ÉCART (17/10) : un nombre n'apparaît qu'au moment où il est dit ; les
# bandes et les mots grand / petit sont des étiquettes redondantes.
# Ti-Margo en bas (margo_bas). Aucun nom de personne à l'écran.
#
# Voix : manim/voix/cm1-proba-comparer-short.json (débit −10).
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/cm1/proba_comparer_short.py ShortProbaComparerCM1 -o eleveai-maths-cm1-proba-comparer-short --media_dir manim/scripts/cm1/media
# Puis copier le mp4 dans manim/sorties/cm1/maths/probabilites/03-comparer/.

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from proba_comparer import COACH, NUIT, P, Sac, bonbon, codes, compte  # noqa: E402  (pose les chemins)

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

XG, XP, YS = -1.1, 1.1, 0.5   # le grand sac, le petit sac
Y_BANDE = -0.95                # la bande de chaque sac, juste dessous
Y_C1, Y_C2 = -1.5, -2.0        # les comptes, l'un sous l'autre
BANDE_W, BANDE_H = 1.9, 0.3
FS, RB = 40, 0.18              # taille des nombres, rayon du bonbon des comptes


def bande(n_r, n_j, x):
    """Une case par bonbon, rouges d'abord : la part des fraises se voit."""
    n = n_r + n_j
    w = BANDE_W / n
    g = VGroup(*[Rectangle(width=w, height=BANDE_H, fill_color=COACH["R"] if i < n_r else COACH["J"],
                           fill_opacity=1, stroke_color=NUIT, stroke_width=1.5 if n > 10 else 2.5)
                 for i in range(n)]).arrange(RIGHT, buff=0)
    return g.move_to(P(x, Y_BANDE))


def cpt(n, code, x, y):
    return compte(n, code, font_size=FS, r=RB).move_to(P(x, y))


class ShortProbaComparerCM1(Short6e):
    nom_voix = "cm1-proba-comparer-short"

    def insister(self, mob, k=1.4, run_time=0.2):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def badge(self):
        return echelle_ceintures("blanche").scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.3))

    def construct(self):
        self.margo_bas()

        # ── 00 : l'accroche, 5 fraises contre 2 ──
        self.dire("00-accroche")
        badge = self.badge()
        grand = Sac(P(XG, YS), 25, 0.33)
        og = grand.objets(codes(R=5, J=20))
        petit = Sac(P(XP, YS + 0.35), 3, 0.52)
        op = petit.objets(codes(R=2, J=1))
        self.play(FadeIn(badge, shift=DOWN * 0.2), FadeIn(grand.dessin), FadeIn(petit.dessin), run_time=0.4)
        bg, bp = bande(5, 0, XG), bande(2, 0, XP)
        c5, c2 = cpt(5, "R", XG, Y_C1), cpt(2, "R", XP, Y_C1)
        self.au_mot("5 bonbons")
        self.play(LaggedStart(*[FadeIn(o, shift=DOWN * 0.6) for o in og[:5]], lag_ratio=0.15),
                  FadeIn(c5, scale=0.5), LaggedStart(*[FadeIn(r) for r in bg], lag_ratio=0.15), run_time=0.7)
        self.au_mot("2 dans")
        self.play(LaggedStart(*[FadeIn(o, shift=DOWN * 0.6) for o in op[:2]], lag_ratio=0.3),
                  FadeIn(c2, scale=0.5), LaggedStart(*[FadeIn(r) for r in bp], lag_ratio=0.3), run_time=0.5)
        self.au_mot("Tu prends lequel")
        titre = self.grand("Tu prends lequel ?", font_size=44, color=JAUNE_TITRE).move_to(P(0, 3.4))
        self.play(Write(titre), Wiggle(VGroup(grand.dessin, og[:5])), Wiggle(VGroup(petit.dessin, op[:2])),
                  run_time=0.7)
        self.attendre_voix(marge=0.1)

        # ── 01 : la surprise, 20 citrons ──
        self.dire("01-image")
        att = self.grand("Attention !", font_size=50, color=ROUGE_ERREUR).move_to(P(0, 3.4))
        self.play(FadeOut(titre), FadeIn(att, scale=0.6), run_time=0.3)
        self.insister(att, 1.2, 0.15)
        self.au_mot("20 citrons")
        c20 = cpt(20, "J", XG, Y_C2)
        self.play(LaggedStart(*[FadeIn(o, shift=DOWN * 1.2) for o in og[5:]], lag_ratio=0.05),
                  FadeIn(c20, scale=0.5), Transform(bg, bande(5, 20, XG)), run_time=1.1)
        self.insister(c20, 1.3, 0.15)
        self.au_mot("n'en a qu'un")
        c1 = cpt(1, "J", XP, Y_C2)
        self.play(FadeIn(op[2], shift=DOWN * 0.8), FadeIn(c1, scale=0.5), Transform(bp, bande(2, 1, XP)),
                  run_time=0.5)
        self.au_mot("presque que des fraises")
        calque = VGroup(petit.corps.copy(), petit.col.copy()).set_fill(opacity=0).set_stroke(VERT_OK, 7)
        self.play(FadeIn(calque), VGroup(grand.dessin, og).animate.set_opacity(0.45),
                  bp[:2].animate.set_stroke(WHITE, 4), run_time=0.4)
        self.insister(VGroup(petit.dessin, op, calque), 1.2, 0.2)
        self.play(Indicate(bp[:2], color=WHITE, scale_factor=1.15), run_time=0.4)
        self.attendre_voix(marge=0.3)

        # ── 02 : la question (pas de bande : elle donnerait la réponse) ──
        self.clear()
        self.margo_bas()
        self.dire("02-question")
        self.add(badge)
        toi = self.grand("Et toi ?", font_size=54, color=JAUNE_TITRE).move_to(P(0, 3.4))
        a = Sac(P(XG, YS + 0.35), 2, 0.52)
        oa = a.objets(codes(R=1, J=1))
        b = Sac(P(XP, YS + 0.1), 8, 0.42)
        ob = b.objets(codes(R=3, J=5))
        self.play(Write(toi), FadeIn(a.dessin), FadeIn(b.dessin), run_time=0.4)
        Y1, Y2 = -0.6, -1.05
        self.au_mot("1 fraise")
        ca1 = cpt(1, "R", XG, Y1)
        self.play(FadeIn(oa[0], shift=DOWN * 0.6), FadeIn(ca1, scale=0.5), run_time=0.3)
        self.au_mot("1 citron")
        ca2 = cpt(1, "J", XG, Y2)
        self.play(FadeIn(oa[1], shift=DOWN * 0.6), FadeIn(ca2, scale=0.5), run_time=0.3)
        self.au_mot("3 fraises")
        cb1 = cpt(3, "R", XP, Y1)
        self.play(LaggedStart(*[FadeIn(o, shift=DOWN * 0.6) for o in ob[:3]], lag_ratio=0.2),
                  FadeIn(cb1, scale=0.5), run_time=0.4)
        self.au_mot("5 citrons")
        cb2 = cpt(5, "J", XP, Y2)
        self.play(LaggedStart(*[FadeIn(o, shift=DOWN * 0.6) for o in ob[3:]], lag_ratio=0.15),
                  FadeIn(cb2, scale=0.5), run_time=0.5)
        self.play(Wiggle(VGroup(a.dessin, oa)), Wiggle(VGroup(b.dessin, ob)), run_time=0.6)
        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.grand("Réponds en", font_size=40, color=VERT_OK),
                       self.grand("commentaire !", font_size=40, color=VERT_OK)).arrange(DOWN, buff=0.12)
        appel.move_to(P(0, -1.8))
        self.play(FadeIn(appel, scale=0.7), run_time=0.35)
        self.insister(appel, 1.1, 0.25)
        self.attendre_voix(marge=1.5)
