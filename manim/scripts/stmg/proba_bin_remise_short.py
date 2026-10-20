# proba_bin_remise_short.py
# EleveAI — Maths STMG ET Maths Tle spé — short jumeau de « Avec ou sans
# remise : binomiale ou pas ? » (micros vaT_bin_contre_exemple / binomiale_schema).
# Il AMUSE : la caisse de 20 ampoules LED (4 défectueuses, grises et fêlées),
# on en sort 3 sans les remettre. Loi binomiale ? « Non ! » tamponné : après
# une défectueuse, 3 sur 19. Fin : et si on les remettait ? Réponds en commentaire.
#   · en HAUT la caisse et les ampoules qui sortent (puis qui reviennent) ;
#   · en BAS, EN MÊME TEMPS : 4 sur 20, 3 sans remise ; 4/20 → 3/19 ;
#     pas de loi binomiale ; « Réponds en commentaire ! ».
# ⛔ PAS D'ÉCART : seuls les nombres dits s'écrivent (4, 20, 3, 3 sur 19).
# Ti-Margo en bas (margo_bas). La ceinture s'affiche : DEUX rendus
# (STMG jaune, Tle orange).
#
# Voix : manim/voix/stmg-terminale-proba-bin-remise-short.json (débit −7).
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/proba_bin_remise_short.py ShortProbaBinRemiseSTMG -o eleveai-maths-stmg-proba-bin-remise-short --media_dir manim/scripts/stmg/media-bin_remise
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/proba_bin_remise_short.py ShortProbaBinRemiseTerminale -o eleveai-maths-terminale-proba-bin-remise-short --media_dir manim/scripts/stmg/media-bin_remise
# Copier dans manim/sorties/stmg/maths/probabilites/39-bin-remise/ et
# manim/sorties/terminale/maths/probabilites/12-bin-schema/.

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from proba_bin_remise import DEF, Lot, P, frac, suite  # noqa: E402  (pose les chemins)

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

LARGEUR_MAX = 4.1
BLEU_FR = "#60A5FA"


class ShortProbaBinRemiseBase(Short6e):
    nom_voix = "stmg-terminale-proba-bin-remise-short"
    ceinture = "jaune"

    def t(self, texte, font_size=30, color=WHITE, largeur=LARGEUR_MAX):
        t = Text(texte, font_size=font_size, color=color)
        if t.width > largeur:
            t.scale_to_fit_width(largeur)
        return t

    def insister(self, mob, k=1.5, run_time=0.3):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def borner(self, g):
        if g.width > LARGEUR_MAX:
            g.scale_to_fit_width(LARGEUR_MAX)
        return g

    def construct(self):
        self.margo_bas()

        # ── 00 : 4 défectueuses sur 20, on en prend 3 sans les remettre ──
        self.dire("00-accroche")
        titre = self.grand("Binomiale ?", font_size=50, color=JAUNE_TITRE).move_to(P(0, 3.4))
        badge = echelle_ceintures(self.ceinture).scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.3))
        lot = Lot(0.78).move_to(P(-0.6, 0.35))
        self.play(Write(titre), FadeIn(badge, shift=DOWN * 0.2), FadeIn(lot), run_time=0.7)
        self.au_mot("4 ampoules défectueuses")
        l1 = suite(self.t("4", 46, JAUNE_TITRE), self.t("défectueuses", 32, "#94A3B8"), self.t("sur", 30),
                   self.t("20", 46, JAUNE_TITRE), buff=0.15)
        self.borner(l1).move_to(P(0, -1.45))
        self.play(FadeIn(l1[:2], shift=UP * 0.15), *[Wiggle(a, scale_value=1.4) for a in lot.defect()],
                  run_time=0.6)
        self.au_mot("sur 20")
        self.play(FadeIn(l1[2:], shift=UP * 0.15), Indicate(lot.caisse, color=WHITE, scale_factor=1.04),
                  run_time=0.5)
        self.au_mot("On en prend 3")
        prises = [lot.ampoules[i] for i in (8, 6, 13)]   # la 1re est défectueuse
        self.places = [a.get_center() for a in prises]
        for k, a in enumerate(prises):
            self.play(a.animate.move_to(P(1.65, 1.2 - 0.85 * k)).scale(1.35), run_time=0.3)
        self.au_mot("sans les remettre")
        l2 = suite(self.t("3", 46, JAUNE_TITRE), self.t("sans remise", 34, ORANGE_RETENUE), buff=0.2)
        self.borner(l2).move_to(P(0, -2.3))
        croix = VGroup(Line(P(-0.18, -0.18), P(0.18, 0.18)), Line(P(-0.18, 0.18), P(0.18, -0.18)))
        croix.set_stroke(ROUGE_ERREUR, 7).move_to(P(1.0, 0.35))
        self.play(FadeIn(l2, scale=1.3), Create(croix), run_time=0.5)
        self.au_mot("Loi binomiale")
        self.insister(titre, 1.25, 0.25)
        self.attendre_voix(marge=0.1)

        # ── 01 : Non ! 3 sur 19 : la probabilité change ──
        self.dire("01-image")
        non = self.grand("Non !", font_size=96, color=ROUGE_ERREUR).move_to(P(-0.2, 0.4))
        cadre_non = SurroundingRectangle(non, color=ROUGE_ERREUR, buff=0.12, stroke_width=8)
        tampon = VGroup(non, cadre_non).rotate(0.18).set_z_index(8)
        self.play(FadeIn(tampon, scale=2.2), run_time=0.35)
        self.au_mot("Après une défectueuse")
        haut_non = self.grand("Non !", font_size=56, color=ROUGE_ERREUR).move_to(P(0, 3.4))
        self.play(FadeOut(VGroup(non, cadre_non), scale=0.5), FadeOut(titre, shift=UP * 0.2),
                  FadeIn(haut_non, shift=DOWN * 0.2), run_time=0.45)
        titre = haut_non
        d = prises[0]
        self.play(Indicate(d, color=RED, scale_factor=1.4), run_time=0.5)
        self.au_mot("3 sur 19")
        f1, f2 = frac("4", "20", 46, BLEU_FR), frac("3", "19", 52, VERT_OK)
        fl = Arrow(LEFT * 0.45, RIGHT * 0.45, color=ORANGE_RETENUE, buff=0, stroke_width=6)
        cmp_ = suite(f1, fl, f2, buff=0.25).move_to(P(0, -1.58))
        reste = [x for x in lot.defect() if x is not d]
        self.play(FadeOut(VGroup(l1, l2), shift=DOWN * 0.2), FadeIn(f1), GrowArrow(fl), FadeIn(f2, scale=1.6),
                  *[Indicate(x, color=YELLOW, scale_factor=1.5) for x in reste], run_time=0.7)
        self.insister(f2, 1.4, 0.25)
        self.au_mot("La probabilité change")
        chg = self.t("la probabilité change", 32, ORANGE_RETENUE).move_to(P(0, -2.55))
        self.play(FadeIn(chg, shift=UP * 0.1), run_time=0.4)
        self.au_mot("pas de loi binomiale")
        pas = self.grand("Pas de loi binomiale", font_size=40, color=ORANGE_RETENUE).move_to(P(0, 3.4))
        self.play(FadeOut(titre, shift=UP * 0.2), FadeIn(pas, shift=DOWN * 0.2), run_time=0.5)
        titre = pas
        self.insister(pas, 1.12, 0.25)
        self.attendre_voix(marge=0.1)

        # ── 02 : et si on les remettait ? ──
        self.dire("02-question")
        self.au_mot("et si on remettait")
        etsi = self.grand("Et avec remise ?", font_size=42, color=VERT_OK).move_to(P(0, 3.4))
        self.play(FadeOut(titre, shift=UP * 0.2), FadeIn(etsi, shift=DOWN * 0.2), FadeOut(croix), run_time=0.5)
        fleches = VGroup(*[CurvedArrow(a.get_left() + P(-0.05, 0), pl + P(0.25, 0.05), angle=0.9, color=VERT_OK,
                                       stroke_width=4, tip_length=0.15) for a, pl in zip(prises, self.places)])
        self.play(Create(fleches), run_time=0.5)
        self.play(*[a.animate.move_to(pl).scale(1 / 1.35) for a, pl in zip(prises, self.places)],
                  FadeOut(fleches), run_time=0.8)
        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.t("Réponds en", 40, VERT_OK), self.t("commentaire !", 40, VERT_OK))
        appel.arrange(DOWN, buff=0.06).move_to(P(0, -2.0))
        self.play(FadeOut(VGroup(cmp_, chg), shift=DOWN * 0.2), FadeIn(appel, scale=0.7), run_time=0.5)
        self.play(appel.animate.scale(1.08), run_time=0.25)
        self.play(appel.animate.scale(1 / 1.08), run_time=0.25)
        self.attendre_voix(marge=1.5)


class ShortProbaBinRemiseSTMG(ShortProbaBinRemiseBase):
    identite = "Maths STMG — EleveAI"
    ceinture = "jaune"


class ShortProbaBinRemiseTerminale(ShortProbaBinRemiseBase):
    identite = "Maths Tle spé — EleveAI"
    ceinture = "orange"
