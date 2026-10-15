# proba_calculer_fraction_short.py
# EleveAI — Maths 4e — short jumeau des probabilités, épisode 5 : calculer.
# CEINTURE JAUNE. Il AMUSE : le pari « 3 bleus et 1 rouge, donc 1 chance sur 3 ? ».
# En HAUT la trousse où tombent 3 stylos bleus et 1 rouge ; en BAS, EN MÊME
# TEMPS, « 1/3 ? » barré puis « 1/4 » qui se construit (le rouge au numérateur,
# les 4 stylos au dénominateur). Fin : 2 rouges et 6 bleus, la question en commentaire.
# Voix : manim/voix/4e-proba-calculer-fraction-short.json (débit −7).
#
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/4e/proba_calculer_fraction_short.py ProbaCalculerFraction4eShort -o eleveai-maths-4e-proba-calculer-fraction-short --media_dir manim/scripts/4e/media
# Puis copier le mp4 dans manim/sorties/4e/maths/probabilites/05-calculer-fraction/.

import math
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from proba_calculer_fraction import P  # noqa: E402  (pose les chemins)

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

LARGEUR_MAX = 4.1
BLEU_STYLO = "#3B82F6"
ROUGE_STYLO = "#EF4444"
TISSU = "#7C3AED"


def stylo(couleur, h=1.2):
    w = h * 0.16
    corps = RoundedRectangle(width=w, height=h * 0.62, corner_radius=w * 0.3,
                             fill_color=couleur, fill_opacity=1, stroke_color=WHITE, stroke_width=1.5)
    bouchon = RoundedRectangle(width=w * 1.1, height=h * 0.2, corner_radius=w * 0.3,
                               fill_color=couleur, fill_opacity=1, stroke_color=WHITE, stroke_width=1.5)
    bouchon.next_to(corps, UP, buff=0)
    agrafe = Line(bouchon.get_top() + RIGHT * w * 0.55, bouchon.get_top() + RIGHT * w * 0.55 + DOWN * h * 0.25,
                  stroke_width=2.5, color="#D1D5DB")
    bas = corps.get_bottom()
    pointe = Polygon(bas + LEFT * w / 2, bas + RIGHT * w / 2, bas + DOWN * h * 0.18,
                     fill_color="#E5E7EB", fill_opacity=1, stroke_color=WHITE, stroke_width=1.5)
    return VGroup(corps, bouchon, agrafe, pointe)


def trousse(larg=2.6, haut=0.75):
    """Une trousse ouverte, vue de face : le tissu devant, la fermeture éclair."""
    corps = RoundedRectangle(width=larg, height=haut, corner_radius=0.22,
                             fill_color=TISSU, fill_opacity=1, stroke_color=WHITE, stroke_width=3)
    zip_ = DashedLine(corps.get_corner(UL) + P(0.2, -0.1), corps.get_corner(UR) + P(-0.2, -0.1),
                      color="#E5E7EB", stroke_width=3, dash_length=0.06)
    tirette = RoundedRectangle(width=0.12, height=0.26, corner_radius=0.05, fill_color="#E5E7EB",
                               fill_opacity=1, stroke_width=0).move_to(corps.get_corner(UR) + P(-0.35, -0.22))
    g = VGroup(corps, zip_, tirette)
    g.set_z_index(3)
    return g


class ProbaCalculerFraction4eShort(Short6e):
    nom_voix = "4e-proba-calculer-fraction-short"

    def t(self, texte, font_size=30, color=WHITE, largeur=LARGEUR_MAX):
        t = Text(texte, font_size=font_size, color=color)
        if t.width > largeur:
            t.scale_to_fit_width(largeur)
        return t

    def fraction(self, num, den, font_size=34, color=WHITE, color_num=None):
        n = Text(str(num), font_size=font_size, color=color_num or color)
        d = Text(str(den), font_size=font_size, color=color)
        larg = max(n.width, d.width) + 0.14
        barre = Line(LEFT * larg / 2, RIGHT * larg / 2, color=color, stroke_width=4)
        return VGroup(n, barre, d).arrange(DOWN, buff=0.08)

    def insister(self, mob, k=1.4, run_time=0.3):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def remplir(self, tr, couleurs, h, xs):
        """Les stylos qui tombent dans la trousse (debout, le haut dépasse)."""
        y = tr.get_top()[1] + h * 0.12
        st = VGroup(*[stylo(c, h).move_to(P(x, y + 2.5)).set_opacity(0) for c, x in zip(couleurs, xs)])
        cibles = [P(x, y) for x in xs]
        return st, cibles

    def construct(self):
        self.margo_bas()

        # ── 00 : le pari ──
        self.dire("00-accroche")
        titre = self.grand("La trousse", font_size=42, color=JAUNE_TITRE).move_to(P(0, 3.2))
        badge = echelle_ceintures("jaune").scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.45))
        tr = trousse(3.0, 0.85).move_to(P(0, 0.35))
        self.play(FadeIn(titre), FadeIn(badge), run_time=0.6)
        self.au_mot("Dans ma trousse")
        self.play(FadeIn(tr, shift=UP * 0.3), run_time=0.5)

        h = 1.35
        xs = [-0.9, -0.3, 0.3, 0.9]
        couleurs = [BLEU_STYLO] * 3 + [ROUGE_STYLO]
        st, cibles = self.remplir(tr, couleurs, h, xs)
        st[3].rotate(0.15)
        self.add(st)

        self.au_mot("3 stylos bleus")
        cb = VGroup(stylo(BLEU_STYLO, 0.45).rotate(-PI / 2), self.t("3 bleus", 28, BLEU_STYLO)).arrange(RIGHT, buff=0.12)
        cb.move_to(P(-1.05, -0.3))
        self.play(LaggedStart(*[s.animate.set_opacity(1).move_to(c) for s, c in zip(st[:3], cibles[:3])],
                              lag_ratio=0.25), FadeIn(cb, scale=1.5), run_time=0.9,
                  rate_func=rate_functions.ease_out_bounce)
        self.au_mot("et 1 rouge")
        cr = VGroup(stylo(ROUGE_STYLO, 0.45).rotate(-PI / 2), self.t("1 rouge", 28, ROUGE_STYLO)).arrange(RIGHT, buff=0.12)
        cr.move_to(P(1.05, -0.3))
        self.play(st[3].animate.set_opacity(1).move_to(cibles[3]), FadeIn(cr, scale=1.5), run_time=0.6,
                  rate_func=rate_functions.ease_out_bounce)

        self.au_mot("1 chance sur 3")
        faux = VGroup(self.fraction(1, 3, 56, ORANGE_RETENUE), self.t("?", 56, ORANGE_RETENUE))
        faux.arrange(RIGHT, buff=0.15).move_to(P(0, -1.4))
        self.play(FadeIn(faux, scale=0.6), run_time=0.5)
        self.insister(faux, 1.3, 0.3)
        self.attendre_voix(marge=0.15)

        # ── 01 : non ! on compte tous les stylos ──
        self.dire("01-image")
        self.au_mot("Non")
        barre = Line(faux.get_corner(DL) + LEFT * 0.1, faux.get_corner(UR) + RIGHT * 0.1,
                     stroke_width=8, color=ROUGE_ERREUR)
        self.play(Create(barre), faux.animate.set_color(ROUGE_ERREUR), run_time=0.35)
        self.play(VGroup(faux, barre).animate.scale(0.7).move_to(P(-1.3, -1.4)), run_time=0.4)

        f = self.fraction(1, 4, 54, VERT_OK, color_num=ROUGE_STYLO)
        egal = self.t("=", 54)
        bon = VGroup(egal, f).arrange(RIGHT, buff=0.15).move_to(P(0.9, -1.4))

        self.au_mot("1 stylo rouge")
        self.play(st[3].animate.shift(UP * 0.55).rotate(-0.15), run_time=0.35)
        rc = st[3].copy()
        self.play(MoveAlongPath(rc, ArcBetweenPoints(rc.get_center(), f[0].get_center(), angle=-PI / 3)),
                  rc.animate.scale(0.4), FadeIn(egal), run_time=0.7)
        self.play(ReplacementTransform(rc, f[0]), st[3].animate.shift(DOWN * 0.55), run_time=0.35)

        self.au_mot("sur 4 stylos en tout")
        tous = st.copy()
        self.play(*[s.animate.shift(UP * 0.35) for s in st], run_time=0.25)
        self.play(*[s.animate.shift(DOWN * 0.35) for s in st], Create(f[1]),
                  LaggedStart(*[c.animate.scale(0.35).move_to(f[2]) for c in tous], lag_ratio=0.1), run_time=0.8)
        self.play(ReplacementTransform(tous, f[2]), run_time=0.3)

        self.au_mot("1 chance sur 4")
        self.insister(f, 1.35, 0.3)
        self.play(Create(SurroundingRectangle(f, color=VERT_OK, buff=0.12)), run_time=0.3)

        self.au_mot("On divise toujours")
        regle = VGroup(self.t("On divise toujours", 26, BLEU_CALCUL),
                       self.t("par le total !", 26, BLEU_CALCUL)).arrange(DOWN, buff=0.06).move_to(P(0, -2.5))
        self.play(FadeIn(regle, shift=UP * 0.15), Wiggle(st), run_time=0.8)
        self.attendre_voix(marge=0.3)

        # ── 02 : la question ──
        self.clear()
        self.margo_bas()
        self.dire("02-question")
        self.play(Write(self.grand("À toi !", font_size=56, color=JAUNE_TITRE).move_to(P(0, 2.95))), run_time=0.5)
        tr2 = trousse(3.4, 0.7).move_to(P(0, 1.05))
        self.play(FadeIn(tr2), run_time=0.3)
        h2 = 0.95
        xs2 = [-1.3 + i * 0.37 for i in range(8)]
        coul2 = [ROUGE_STYLO] * 2 + [BLEU_STYLO] * 6
        st2, cib2 = self.remplir(tr2, coul2, h2, xs2)
        self.add(st2)

        self.au_mot("2 stylos rouges")
        self.play(LaggedStart(*[s.animate.set_opacity(1).move_to(c) for s, c in zip(st2[:2], cib2[:2])],
                              lag_ratio=0.25), run_time=0.6, rate_func=rate_functions.ease_out_bounce)
        self.au_mot("et 6 bleus")
        self.play(LaggedStart(*[s.animate.set_opacity(1).move_to(c) for s, c in zip(st2[2:], cib2[2:])],
                              lag_ratio=0.12), run_time=0.8, rate_func=rate_functions.ease_out_bounce)
        lb = VGroup(self.t("2 rouges", 30, ROUGE_STYLO), self.t("6 bleus", 30, BLEU_STYLO)).arrange(RIGHT, buff=0.5)
        lb.next_to(tr2, DOWN, buff=0.15)
        self.play(FadeIn(lb), run_time=0.3)
        bases = [s.get_center() for s in st2]
        horloge = {"t": 0.0}

        def danse(g, dt):
            horloge["t"] += dt
            for k, (s, p) in enumerate(zip(g, bases)):
                s.move_to(p + UP * 0.12 * abs(math.sin(horloge["t"] * 4 + k * 0.8)))

        st2.add_updater(danse)

        self.au_mot("Quelle chance")
        q = VGroup(self.t("P =", 42), self.fraction("?", "?", 42, JAUNE_TITRE)).arrange(RIGHT, buff=0.3)
        q.move_to(P(0, -0.45))
        self.play(FadeIn(q, scale=0.7), run_time=0.4)
        self.insister(q[1], 1.3, 0.25)

        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.grand("Réponds en", font_size=44, color=VERT_OK),
                       self.grand("commentaire !", font_size=44, color=VERT_OK)).arrange(DOWN, buff=0.1)
        if appel.width > config.frame_width - 0.5:
            appel.scale_to_fit_width(config.frame_width - 0.5)
        appel.move_to(P(0, -1.6))
        poignee = self.grand("@eleveai974", font_size=26, color=BLEU_CALCUL).move_to(P(0, -2.55))
        self.play(FadeIn(appel, scale=0.7), run_time=0.4)
        self.insister(appel, 1.1, 0.25)
        self.play(GrowFromCenter(poignee), run_time=0.3)
        self.attendre_voix(marge=1.5)
        st2.clear_updaters()
