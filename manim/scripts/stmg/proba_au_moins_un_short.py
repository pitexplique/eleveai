# proba_au_moins_un_short.py
# EleveAI — Maths STMG ET Maths 1re (tronc commun) — short jumeau de
# « Au moins un : l'astuce de l'événement contraire » (micros vaT_bin_reunion /
# alea_bern_au_moins_un). CEINTURE JAUNE. Il AMUSE : 10 % par partie, dix
# parties : 100 % à coup sûr ? Non !
#   · en HAUT les dix parties (10 cases) qui se cochent « perdu » une à une,
#     puis une jauge qui s'arrête à 65 %, loin de 100 % ;
#   · en BAS, EN MÊME TEMPS : 10 × 10 % = 100 % barré, 0,9¹⁰ ≈ 0,35,
#     1 − 0,35 ≈ 0,65 ;
#   · fin : combien de parties pour dépasser une chance sur deux ?
#     « Réponds en commentaire ! ».
# Ti-Margo en bas (margo_bas). Aucune classe à l'écran : UN SEUL rendu suffit,
# copié sous les deux noms (STMG, 1re). Les deux sous-classes existent quand
# même, identiques.
#
# Voix : manim/voix/stmg-premiere-proba-au-moins-un-short.json (débit −7).
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/proba_au_moins_un_short.py ShortProbaAuMoinsUnSTMG -o eleveai-maths-stmg-proba-au-moins-un-short --media_dir manim/scripts/stmg/media-au_moins_un
# (ShortProbaAuMoinsUnPremiere donne la même image.) Copier dans
# manim/sorties/stmg/maths/probabilites/22-au-moins-un/ et
# manim/sorties/premiere-commun/maths/probabilites/22-au-moins-un/
# (eleveai-maths-premiere-commun-proba-au-moins-un-short.mp4).

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from proba_au_moins_un import P, puissance, suite  # noqa: E402  (pose les chemins)

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

LARGEUR_MAX = 4.1
ROUGE_CASE = "#EF4444"


def case(cote=0.68):
    """Une partie : un carré sombre avec « ? »."""
    c = RoundedRectangle(width=cote, height=cote, corner_radius=0.08, fill_color="#1E293B", fill_opacity=1,
                         stroke_color="#94A3B8", stroke_width=2)
    q = Text("?", font_size=26, color="#94A3B8").move_to(c)
    return VGroup(c, q)


def marque_perdu(c):
    """Le carré se remplit de rouge avec « perdu »."""
    fond = c[0].copy().set_fill(ROUGE_CASE, 1).set_stroke(WHITE, 2)
    mot = Text("perdu", font_size=15, color=WHITE, weight=BOLD).move_to(c)
    return VGroup(fond, mot)


class ShortProbaAuMoinsUnBase(Short6e):
    nom_voix = "stmg-premiere-proba-au-moins-un-short"

    def t(self, texte, font_size=30, color=WHITE, largeur=LARGEUR_MAX):
        t = Text(texte, font_size=font_size, color=color)
        if t.width > largeur:
            t.scale_to_fit_width(largeur)
        return t

    def insister(self, mob, k=1.5, run_time=0.3):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def ligne(self, morceaux, fs=44, y=-1.4):
        g = suite(*[m if isinstance(m, Mobject) else Text(m[0], font_size=fs, color=m[1]) for m in morceaux],
                  buff=0.14)
        if g.width > LARGEUR_MAX:
            g.scale_to_fit_width(LARGEUR_MAX)
        return g.move_to(P(0, y))

    def construct(self):
        self.margo_bas()

        # ── 00 : 10 % par partie ; dix parties : 100 % ? ──
        self.dire("00-accroche")
        titre = self.grand("Gagner à coup sûr ?", font_size=42, color=JAUNE_TITRE).move_to(P(0, 3.4))
        badge = echelle_ceintures("jaune").scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.3))
        self.play(Write(titre), FadeIn(badge, shift=DOWN * 0.2), run_time=0.7)
        self.au_mot("10 %")
        dix = suite(self.t("10 %", 40, JAUNE_TITRE), self.t("à chaque partie", 30), buff=0.2)
        if dix.width > LARGEUR_MAX:
            dix.scale_to_fit_width(LARGEUR_MAX)
        dix.move_to(P(0, 1.5))
        self.play(FadeIn(dix, scale=1.4), run_time=0.5)
        self.au_mot("Dix parties")
        cases = VGroup(*[case() for _ in range(10)]).arrange_in_grid(rows=2, cols=5, buff=0.14).move_to(P(0, 0.4))
        self.play(LaggedStart(*[FadeIn(c, scale=0.4) for c in cases], lag_ratio=0.1), run_time=0.8)
        self.au_mot("10 fois 10 %")
        calc = self.ligne([("10", WHITE), ("×", WHITE), ("10 %", JAUNE_TITRE), ("=", WHITE), ("100 %", ORANGE_RETENUE),
                           ("?", ORANGE_RETENUE)])
        self.play(FadeIn(calc[0], scale=1.6), FadeIn(calc[1]), TransformFromCopy(dix[0], calc[2]), run_time=0.6)
        self.au_mot(", 100 %")
        self.play(FadeIn(calc[3]), FadeIn(calc[4], scale=2.0), run_time=0.4)
        self.play(FadeIn(calc[5], scale=2.0), run_time=0.3)
        self.insister(calc[4], 1.4, 0.2)
        self.attendre_voix(marge=0.1)

        # ── 01 : non ! perdre les dix : 0,9¹⁰ ≈ 0,35 ; au moins une fois ≈ 0,65 ──
        self.dire("01-image")
        self.au_mot("Non")
        barre = Line(calc.get_corner(DL) + P(-0.1, -0.05), calc.get_corner(UR) + P(0.1, 0.05), color=ROUGE_ERREUR,
                     stroke_width=8)
        non_t = self.grand("NON !", font_size=60, color=ROUGE_ERREUR).rotate(0.15)
        non = VGroup(BackgroundRectangle(non_t, color=BLACK, fill_opacity=0.85, buff=0.12), non_t).move_to(P(0, -1.4))
        self.play(Create(barre), run_time=0.3)
        self.play(FadeIn(non, scale=2.2), run_time=0.3)
        self.play(Wiggle(non), run_time=0.4)
        self.au_mot("Perdre les dix")
        self.play(FadeOut(non, scale=0.5), FadeOut(VGroup(calc, barre), shift=DOWN * 0.2), run_time=0.3)
        rouges = [marque_perdu(c) for c in cases]
        self.play(LaggedStart(*[FadeIn(r, scale=1.6) for r in rouges], lag_ratio=0.25), run_time=1.4)
        self.au_mot("0,9 puissance 10")
        pw = puissance("0,9", "10", 50, "#60A5FA")
        l1 = self.ligne([pw, ("≈", WHITE), ("0,35", JAUNE_TITRE)], 50, y=-0.95)
        l1[1:].match_y(pw[0])
        self.play(FadeIn(pw, scale=1.5), run_time=0.4)
        self.au_mot("environ 0,35")
        self.play(FadeIn(l1[1]), FadeIn(l1[2], scale=1.8), run_time=0.4)
        self.insister(l1[2], 1.4, 0.2)
        self.au_mot("gagner au moins une fois")
        self.play(*[FadeOut(r) for r in rouges], run_time=0.4)
        cadre = SurroundingRectangle(cases, color=VERT_OK, buff=0.1, stroke_width=4)
        am = self.t("au moins une fois", 30, VERT_OK).move_to(P(0, -1.65))
        self.play(Create(cadre), FadeIn(am, shift=UP * 0.1), run_time=0.5)
        self.au_mot("1 moins 0,35")
        l2 = self.ligne([("1", WHITE), ("−", WHITE), ("0,35", JAUNE_TITRE), ("≈", WHITE), ("0,65", VERT_OK)], 50,
                        y=-2.35)
        l2.move_to(P(0, -2.3))
        self.play(FadeIn(l2[0], scale=1.6), FadeIn(l2[1]), TransformFromCopy(l1[2], l2[2]), run_time=0.5)
        self.au_mot("environ 0,65")
        self.play(FadeIn(l2[3]), FadeIn(l2[4], scale=2.0), run_time=0.4)
        self.insister(l2[4], 1.4, 0.2)
        self.au_mot("Loin de 100 %")
        loin = self.grand("Loin de 100 % !", font_size=42, color=ORANGE_RETENUE).move_to(P(0, 3.4))
        fond = RoundedRectangle(width=4.0, height=0.36, corner_radius=0.1, fill_color="#1E293B", fill_opacity=1,
                                stroke_color="#94A3B8", stroke_width=2).move_to(P(0, 1.5))
        plein = Rectangle(width=4.0 * 0.65, height=0.36, fill_color=VERT_OK, fill_opacity=1, stroke_width=0)
        plein.align_to(fond, LEFT).match_y(fond)
        cent = self.t("100 %", 24, ORANGE_RETENUE).next_to(fond, UP, buff=0.08).align_to(fond, RIGHT)
        self.play(ReplacementTransform(titre, loin), FadeOut(dix), FadeIn(fond), run_time=0.4)
        self.play(GrowFromEdge(plein, LEFT), FadeIn(cent), run_time=0.7)
        self.play(Indicate(cent, color=ROUGE_ERREUR, scale_factor=1.4), run_time=0.4)
        self.attendre_voix(marge=0.1)

        # ── 02 : combien de parties pour dépasser une chance sur deux ? ──
        self.dire("02-question")
        self.au_mot("Combien de parties")
        q = VGroup(self.t("Combien de parties", 40, JAUNE_TITRE), self.t("pour dépasser", 34),
                   self.t("une chance sur deux ?", 34, VERT_OK)).arrange(DOWN, buff=0.12)
        q.move_to(P(0, 0.4))
        self.play(FadeOut(VGroup(fond, plein, cent, cadre, cases, l1, l2, am)), run_time=0.4)
        self.play(FadeIn(q, shift=UP * 0.2), run_time=0.6)
        self.insister(q[0], 1.15, 0.2)
        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.t("Réponds en", 36, VERT_OK), self.t("commentaire !", 36, VERT_OK))
        appel.arrange(DOWN, buff=0.06).move_to(P(0, -1.9))
        self.play(FadeIn(appel, scale=0.7), run_time=0.4)
        self.play(appel.animate.scale(1.08), run_time=0.25)
        self.play(appel.animate.scale(1 / 1.08), run_time=0.25)
        self.attendre_voix(marge=1.5)


class ShortProbaAuMoinsUnSTMG(ShortProbaAuMoinsUnBase):
    identite = "Maths STMG — EleveAI"


class ShortProbaAuMoinsUnPremiere(ShortProbaAuMoinsUnBase):
    identite = "Maths 1re — EleveAI"
