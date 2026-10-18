# proba_roue_short.py
# EleveAI — Maths CM1 — short jumeau de la série « Probabilités », épisode 4 :
# la roue, tant de chances sur tant. CEINTURE BLANCHE. Il AMUSE : « 3 couleurs,
# donc 1 chance sur 3 ? Non ! »
#   · en HAUT la roue du coach (1 rouge, 2 bleues, 1 verte) qui tourne puis
#     s'arrête ; ses parts sautent, les bleues s'allument ;
#   · en BAS, EN MÊME TEMPS, « 3 couleurs → 1 chance sur 3 ? » se fait barrer,
#     puis « 4 parts → 2 chances sur 4 » se remplit ;
#   · fin : le rouge s'allume, « ? chances sur 4 », « Réponds en commentaire ! ».
# ⛔ PAS D'ÉCART (17/10) : un nombre n'apparaît qu'au moment où la voix le dit.
# Ti-Margo en bas (margo_bas). Aucun nom de personne à l'écran.
#
# Voix : manim/voix/cm1-proba-roue-short.json (débit −10).
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/cm1/proba_roue_short.py ShortProbaRoueCM1 -o eleveai-maths-cm1-proba-roue-short --media_dir manim/scripts/cm1/media
# Puis copier le mp4 dans manim/sorties/cm1/maths/probabilites/04-roue-de-sac/.

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from proba_roue import P, Roue, ROUE_KERMESSE, croix, pastille  # noqa: E402

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

ROUE_C = P(0, 0.3)
Y1, Y2 = -1.45, -2.3  # les deux lignes de maths, en bas


class ShortProbaRoueCM1(Short6e):
    nom_voix = "cm1-proba-roue-short"

    def insister(self, mob, k=1.3, run_time=0.2):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def ligne(self, morceaux, font_size=44):
        g = VGroup(*[Text(m, font_size=font_size, color=c) for m, c in morceaux]).arrange(RIGHT, buff=0.18)
        if g.width > config.frame_width - 1.0:
            g.scale_to_fit_width(config.frame_width - 1.0)
        return g

    def borne(self, mob, marge=0.5):
        if mob.width > config.frame_width - marge:
            mob.scale_to_fit_width(config.frame_width - marge)
        return mob

    def sauter(self, roue, idx, k=1.12):
        g = VGroup(*[roue.parts[i] for i in idx])
        self.play(g.animate.scale(k, about_point=roue.centre), run_time=0.12)
        self.play(g.animate.scale(1 / k, about_point=roue.centre), run_time=0.09)

    def nouvelle_roue(self):
        roue = Roue(ROUE_KERMESSE, ROUE_C, 1.05)
        self.add(roue.tout())
        self.add_foreground_mobjects(roue.fixe)
        return roue

    def construct(self):
        self.margo_bas()
        badge = echelle_ceintures("blanche").scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.3))
        self.add(badge)

        # ── 00 : l'accroche, 3 couleurs… 1 chance sur 3 ? ──
        self.dire("00-accroche")
        roue = self.nouvelle_roue()
        roue.tourner(9.0)
        cette = Text("Cette roue…", font_size=46, color=JAUNE_TITRE).move_to(P(0, 3.4))
        self.play(FadeIn(cette, shift=DOWN * 0.2), run_time=0.3)
        self.au_mot("3 couleurs")
        past = VGroup(*[pastille(c, 0.2) for c in "RBV"]).arrange(RIGHT, buff=0.15)
        l1 = VGroup(past, self.ligne([("3", ORANGE_RETENUE), ("couleurs", WHITE)])).arrange(RIGHT, buff=0.25)
        self.borne(l1).move_to(P(0, Y1))
        self.play(LaggedStart(*[FadeIn(p, scale=0.3) for p in past], lag_ratio=0.3), FadeIn(l1[1], shift=UP * 0.2),
                  run_time=0.5)
        self.au_mot("Le bleu")
        titre = Text("Le bleu ?", font_size=56, color=JAUNE_TITRE).move_to(P(0, 3.4))
        self.play(FadeOut(cette, shift=UP * 0.2), Write(titre), past[1].animate.scale(1.6), run_time=0.4)
        self.play(past[1].animate.scale(1 / 1.6), run_time=0.2)
        self.au_mot("1 chance sur 3")
        l2 = self.ligne([("1", ORANGE_RETENUE), ("chance sur", WHITE), ("3", ORANGE_RETENUE), ("?", ORANGE_RETENUE)])
        l2.move_to(P(0, Y2))
        self.play(FadeIn(l2, scale=0.5), run_time=0.35)
        self.insister(l2, 1.15)
        self.attendre_voix(marge=0.1)

        # ── 01 : non ! 4 parts, 2 bleues ──
        self.dire("01-image")
        self.au_mot("Non")
        x1, x2 = croix(l1, sw=7), croix(l2, sw=7)
        non = Text("Non !", font_size=72, color=ROUGE_ERREUR, weight=BOLD).move_to(P(0, 3.4))
        self.play(Create(x1), Create(x2), FadeOut(titre), FadeIn(non, scale=1.6), run_time=0.35)
        roue.arreter_sur(self, 1, 1.0, tours=0)
        self.au_mot("4 parts")
        self.play(FadeOut(VGroup(l1, x1), shift=LEFT * 0.4), run_time=0.2)
        n4 = self.ligne([("4", VERT_OK), ("parts", WHITE)], 44).move_to(P(0, Y1))
        self.play(FadeIn(n4, scale=0.5), run_time=0.2)
        for i in range(4):
            self.sauter(roue, [i])
        self.au_mot("2 sont bleues")
        self.play(*roue.eteindre([1, 3]), run_time=0.3)
        self.sauter(roue, [1, 3], 1.18)
        self.au_mot("2 chances sur 4")
        self.play(FadeOut(VGroup(l2, x2), shift=LEFT * 0.4), run_time=0.2)
        ok = self.ligne([("2", BLEU_CALCUL), ("chances sur", WHITE), ("4", VERT_OK)], 50).move_to(P(0, Y2))
        cadre = SurroundingRectangle(ok, color=VERT_OK, buff=0.18, corner_radius=0.12, stroke_width=5)
        self.play(FadeIn(ok, scale=0.5), Create(cadre), run_time=0.35)
        self.insister(VGroup(ok, cadre), 1.12)
        self.au_mot("On compte les parts")
        regle = VGroup(Text("les parts,", font_size=46, color=VERT_OK),
                       Text("pas les couleurs !", font_size=40, color=WHITE)).arrange(DOWN, buff=0.12)
        self.borne(regle, 0.4).move_to(P(0, 3.35))
        self.play(FadeOut(non, shift=UP * 0.3), FadeIn(regle, shift=UP * 0.3), *roue.rallumer(), run_time=0.4)
        self.insister(regle[0], 1.2)
        self.attendre_voix(marge=0.4)

        # ── 02 : la question ──
        self.clear()
        self.margo_bas()
        self.add(badge)
        self.dire("02-question")
        toi = Text("Et toi ?", font_size=56, color=JAUNE_TITRE).move_to(P(0, 3.4))
        self.play(Write(toi), run_time=0.4)
        roue = self.nouvelle_roue()
        roue.tourner(9.0)
        self.au_mot("le rouge")
        roue.arreter_sur(self, 0, 0.9, tours=0)
        self.play(*roue.eteindre([0]), run_time=0.3)
        self.sauter(roue, [0], 1.2)
        self.au_mot("combien de chances")
        q = self.ligne([("?", ORANGE_RETENUE), ("chances sur", WHITE), ("4", VERT_OK)], 50).move_to(P(0, Y1))
        self.play(FadeIn(q, scale=0.5), run_time=0.3)
        self.insister(q[0], 1.6)
        self.au_mot("Réponds en commentaire")
        appel = VGroup(Text("Réponds en", font_size=46, color=VERT_OK),
                       Text("commentaire !", font_size=46, color=VERT_OK)).arrange(DOWN, buff=0.1)
        self.borne(appel, 0.5).move_to(P(0, Y2 - 0.1))
        self.play(FadeIn(appel, scale=0.7), run_time=0.35)
        self.insister(appel, 1.1, 0.25)
        self.attendre_voix(marge=1.5)
