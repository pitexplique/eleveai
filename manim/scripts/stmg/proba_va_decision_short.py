# proba_va_decision_short.py
# EleveAI — Maths STMG — short jumeau de « Choisir avec l'espérance ».
# CEINTURE JAUNE. Il AMUSE : 500 € sûrs, ou 2 000 € avec 30 % de chances ?
#   · en HAUT : la carte « 500 € » (le sûr) et la roue du pari (30 % en bleu),
#     qui tourne ; puis 10 années, 3 pièces et 7 croix ;
#   · en BAS, EN MÊME TEMPS : 2 000 × 0,3 = 600 €, 600 € > 500 €,
#     « 7 fois sur 10 : rien ! » ;
#   · fin : « 500 € sûrs ou le pari ? » et « Réponds en commentaire ! ».
# Ti-Margo en bas (margo_bas). Aucune classe à l'écran.
#
# Voix : manim/voix/stmg-proba-va-decision-short.json (débit −7).
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/proba_va_decision_short.py ShortProbaVaDecision -o eleveai-maths-stmg-proba-va-decision-short --media_dir manim/scripts/stmg/media-va_decision
# Copier dans manim/sorties/stmg/maths/probabilites/30-va-decision/.

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from proba_va_decision import COUL_A, COUL_B, ENCRE, VIDE, Annees, P, eclair, feuille, suite  # noqa: E402

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

LARGEUR_MAX = 4.1
GRIS = "#94A3B8"


def carte_sure(centre, w=1.85, h=1.75):
    """La carte du « sûr » : bandeau vert (éclair + feuille), corps blanc ;
    le montant se pose ensuite dans `corps`."""
    corps = RoundedRectangle(width=w, height=h, corner_radius=0.15, fill_color=WHITE, fill_opacity=1,
                             stroke_color="#E2E8F0", stroke_width=2).move_to(centre)
    bande = Rectangle(width=w, height=0.5, fill_color=COUL_A, fill_opacity=1, stroke_width=0)
    bande.move_to(corps.get_top() + DOWN * 0.25)
    ic = VGroup(eclair(0.36), feuille(0.3)).arrange(RIGHT, buff=0.04).move_to(bande)
    return VGroup(corps, bande, ic)


def roue_pari(centre, r=0.82):
    """La roue du pari : 30 % en bleu (on gagne), 70 % en gris (rien),
    une pointe en haut. g[0] = le disque (ce qui tourne)."""
    a0 = PI / 2
    gagne = AnnularSector(inner_radius=0, outer_radius=r, angle=-TAU * 0.3, start_angle=a0, fill_color=COUL_B,
                          fill_opacity=1, stroke_color=ENCRE, stroke_width=3)
    rien = AnnularSector(inner_radius=0, outer_radius=r, angle=-TAU * 0.7, start_angle=a0 - TAU * 0.3,
                         fill_color=GRIS, fill_opacity=1, stroke_color=ENCRE, stroke_width=3)
    disque = VGroup(gagne, rien).shift(centre)
    moyeu = Dot(centre, radius=0.06, color=ENCRE).set_z_index(3)
    pointe = Polygon(P(0, 0), P(-0.12, 0.22), P(0.12, 0.22), fill_color=WHITE, fill_opacity=1,
                     stroke_color=ENCRE, stroke_width=1.5).move_to(centre + UP * (r + 0.1), aligned_edge=DOWN)
    return VGroup(disque, moyeu, pointe)


class ShortProbaVaDecision(Short6e):
    nom_voix = "stmg-proba-va-decision-short"
    identite = "Maths STMG — EleveAI"

    def t(self, texte, font_size=30, color=WHITE, largeur=LARGEUR_MAX, weight=NORMAL):
        t = Text(texte, font_size=font_size, color=color, weight=weight)
        if t.width > largeur:
            t.scale_to_fit_width(largeur)
        return t

    def insister(self, mob, k=1.3, run_time=0.25):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def ligne(self, morceaux, fs=34, y=-1.0, buff=0.12):
        g = suite(*[Text(x, font_size=fs, color=c, weight=BOLD) for x, c in morceaux], buff=buff)
        if g.width > LARGEUR_MAX:
            g.scale_to_fit_width(LARGEUR_MAX)
        return g.move_to(P(0, y))

    def tourner(self, roue, tours=2.0, run_time=1.2):
        self.play(Rotate(roue[0], angle=-tours * TAU, about_point=roue[1].get_center()), run_time=run_time,
                  rate_func=rate_functions.ease_out_cubic)

    def construct(self):
        self.margo_bas()

        # ── 00 : l'accroche : 500 € sûrs, ou 2 000 € à 30 % ? ──
        self.dire("00-accroche")
        titre = self.grand("Sûr ou pari ?", font_size=46, color=JAUNE_TITRE).move_to(P(0, 3.4))
        badge = echelle_ceintures("jaune").scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.3))
        self.play(Write(titre), FadeIn(badge, shift=DOWN * 0.2), run_time=0.6)
        carte = carte_sure(P(-1.1, 0.55))
        cinq = self.t("500 €", 40, "#15803D", weight=BOLD).move_to(carte[0]).shift(DOWN * 0.25)
        roue = roue_pari(P(1.1, 0.42))
        deux = self.t("2 000 €", 30, COUL_B, weight=BOLD).next_to(roue, UP, buff=0.1)
        l1 = self.ligne([("500 €", VERT_OK), ("sûrs", WHITE)], 38, -1.05, buff=0.18)
        self.play(FadeIn(carte, scale=0.6), run_time=0.4)
        self.play(FadeIn(cinq, scale=1.8), FadeIn(l1, shift=UP * 0.1), run_time=0.4)
        self.au_mot("2 000 euros")
        l2 = self.ligne([("ou", WHITE), ("2 000 €", COUL_B), ("avec", WHITE), ("30 %", COUL_B)], 38, -1.8, buff=0.15)
        self.play(FadeIn(roue, scale=0.6), FadeIn(deux, scale=1.5), FadeIn(l2[:2], shift=UP * 0.1), run_time=0.5)
        self.au_mot("30 %")
        self.play(FadeIn(l2[2:], scale=1.5), Indicate(roue[0][0], color=YELLOW, scale_factor=1.1), run_time=0.45)
        self.au_mot("Tu choisis")
        q = self.ligne([("Tu choisis quoi ?", JAUNE_TITRE)], 44, -2.6)
        self.play(FadeIn(q, scale=1.4), run_time=0.4)
        self.tourner(roue, 1.6, 1.0)
        self.attendre_voix(marge=0.1)

        # ── 01 : en moyenne 600 € > 500 €… mais 7 fois sur 10, rien ! ──
        self.dire("01-image")
        self.play(FadeOut(VGroup(l1, l2, q), shift=DOWN * 0.2), run_time=0.3)
        self.au_mot("En moyenne")
        m = self.ligne([("En moyenne :", JAUNE_TITRE)], 36, -0.95)
        self.play(FadeIn(m, shift=UP * 0.1), run_time=0.3)
        self.tourner(roue, 2.3, 0.9)
        self.au_mot("2 000 fois 0,3")
        c = self.ligne([("2 000", COUL_B), ("×", WHITE), ("0,3", COUL_B), ("=", WHITE), ("600 €", VERT_OK)],
                       40, -1.6, buff=0.14)
        self.play(TransformFromCopy(deux, c[0]), FadeIn(c[1:3], scale=1.4), run_time=0.45)
        self.au_mot("600 euros")
        self.play(FadeIn(c[3]), FadeIn(c[4], scale=1.8), run_time=0.35)
        self.insister(c[4], 1.3, 0.18)
        self.au_mot("Plus que 500")
        plus = self.ligne([("600 €", VERT_OK), (">", WHITE), ("500 €", WHITE)], 36, -2.25, buff=0.16)
        self.play(FadeIn(plus, shift=UP * 0.1), Indicate(cinq, color=YELLOW), run_time=0.4)
        self.au_mot("mais 7 fois")
        an = Annees(centre=P(0, 0.6), cote=0.68, pas=0.82)
        self.play(FadeOut(VGroup(carte, cinq, roue, deux)), FadeOut(VGroup(m, c, plus), shift=DOWN * 0.2),
                  FadeIn(an, scale=0.7), run_time=0.35)
        for n, cs in enumerate(an.cases):
            if n in Annees.PLEINES:
                pc = an.pieces[Annees.PLEINES.index(n)]
                self.play(cs.animate.set_fill(COUL_B, 0.9), FadeIn(pc, scale=1.8), run_time=0.05)
            else:
                cr = an.croix[n - sum(1 for p in Annees.PLEINES if p < n)]
                self.play(cs.animate.set_fill(VIDE, 1), Create(cr), run_time=0.05)
        rien = VGroup(self.t("7 fois sur 10 :", 36, ROUGE_ERREUR, weight=BOLD),
                      self.t("rien !", 56, ROUGE_ERREUR, weight=BOLD)).arrange(DOWN, buff=0.12).move_to(P(0, -1.6))
        self.play(FadeIn(rien[0], scale=1.3), *[Indicate(v, color=ROUGE_ERREUR, scale_factor=1.15)
                                               for v in an.vides()], run_time=0.5)
        self.au_mot("rien !")
        self.play(FadeIn(rien[1], scale=1.8), run_time=0.3)
        self.insister(rien[1], 1.25, 0.18)
        self.attendre_voix(marge=0.1)

        # ── 02 : la question ──
        self.dire("02-question")
        toi = self.grand("Et toi ?", font_size=48, color=JAUNE_TITRE).move_to(P(0, 3.4))
        carte2 = carte_sure(P(-1.1, 0.35))
        cinq2 = self.t("500 €", 40, "#15803D", weight=BOLD).move_to(carte2[0]).shift(DOWN * 0.25)
        roue2 = roue_pari(P(1.1, 0.22))
        deux2 = self.t("2 000 €", 30, COUL_B, weight=BOLD).next_to(roue2, UP, buff=0.1)
        self.play(ReplacementTransform(titre, toi), FadeOut(badge), FadeOut(VGroup(an, an.pieces, an.croix, rien)),
                  FadeIn(VGroup(carte2, cinq2), shift=RIGHT * 0.2), FadeIn(VGroup(roue2, deux2), shift=LEFT * 0.2),
                  run_time=0.5)
        self.au_mot("500 euros sûrs")
        q1 = self.ligne([("500 € sûrs", VERT_OK)], 40, -1.15)
        self.play(FadeIn(q1, scale=1.3), Indicate(cinq2, color=VERT_OK), run_time=0.4)
        self.au_mot("ou le pari")
        q2 = self.ligne([("ou le pari ?", COUL_B)], 40, -1.85)
        self.play(FadeIn(q2, scale=1.3), run_time=0.35)
        self.tourner(roue2, 1.4, 0.8)
        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.t("Réponds en", 40, VERT_OK, weight=BOLD), self.t("commentaire !", 40, VERT_OK, weight=BOLD))
        appel.arrange(DOWN, buff=0.06).move_to(P(0, 2.55))
        self.play(FadeIn(appel, scale=0.7), run_time=0.4)
        self.play(appel.animate.scale(1.08), run_time=0.25)
        self.play(appel.animate.scale(1 / 1.08), run_time=0.25)
        self.attendre_voix(marge=1.5)
