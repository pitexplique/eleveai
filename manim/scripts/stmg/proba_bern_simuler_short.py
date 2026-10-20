# proba_bern_simuler_short.py
# EleveAI — Maths STMG — short jumeau de « Simuler des échantillons avec
# Python » (micro va_bern_simuler). CEINTURE JAUNE. Il AMUSE : 100 échantillons
# en une seconde !
#   · en HAUT : l'éditeur Python (la boucle de 100 tourne, la barre se
#     remplit), puis l'AXE où les fréquences tombent et s'empilent ;
#   · en BAS, EN MÊME TEMPS : « 100 échantillons », « de 50 clients », « en une
#     seconde », puis 0,28 / 0,34 / 0,26 / 0,32 et « autour de 0,3 » ;
#   · fin : « 500 clients », « plus ? moins ? » et « Réponds en commentaire ! ».
# Ti-Margo en bas (margo_bas). Aucun nom de personne ni de classe à l'écran.
#
# Voix : manim/voix/stmg-proba-bern-simuler-short.json (débit −7).
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/proba_bern_simuler_short.py ShortProbaBernSimuler -o eleveai-maths-stmg-proba-bern-simuler-short --media_dir manim/scripts/stmg/media-bern_simuler
# Puis copier le mp4 dans manim/sorties/stmg/maths/probabilites/32-bern-simuler/.

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from proba_bern_simuler import (C_NOMBRE, DITE, DITES, FREQ50, AxeFreq, Editeur, P,  # noqa: E402
                                ORANGE_RETENUE)

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

LARGEUR_MAX = 4.1


class ShortProbaBernSimuler(Short6e):
    nom_voix = "stmg-proba-bern-simuler-short"
    ceinture = "jaune"

    def t(self, texte, font_size=30, color=WHITE, largeur=LARGEUR_MAX):
        t = Text(texte, font_size=font_size, color=color)
        if t.width > largeur:
            t.scale_to_fit_width(largeur)
        return t

    def insister(self, mob, k=1.5, run_time=0.25):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def construct(self):
        self.margo_bas()

        # ── 00 : l'accroche : 100 échantillons en une seconde ──
        self.dire("00-accroche")
        titre = self.grand("Simuler avec Python", font_size=40, color=JAUNE_TITRE).move_to(P(0, 3.4))
        badge = echelle_ceintures(self.ceinture).scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.3))
        ed = Editeur(2, 4.3, P(0, 0.8), fs=22, pas=0.5)
        ed.poser(0, "for k in range(100):")
        ed.poser(1, "    echantillon(50, 0.3)")
        cadre = Rectangle(width=4.0, height=0.28, stroke_color=WHITE, stroke_width=2).move_to(P(0, -0.3))
        barre = Rectangle(width=4.0, height=0.28, fill_color=VERT_OK, fill_opacity=1, stroke_width=0)
        barre.move_to(cadre).stretch(0.01, 0, about_edge=LEFT)
        l100 = self.t("100 échantillons", 40, C_NOMBRE).move_to(P(0, -0.9))
        self.play(Write(titre), FadeIn(badge, shift=DOWN * 0.2), FadeIn(ed), FadeIn(ed.curseur), FadeIn(cadre),
                  FadeIn(barre), FadeIn(l100, scale=0.6), run_time=0.6)
        self.au_mot("de 50 clients")
        l50 = self.t("de 50 clients", 38, BLEU_CALCUL).move_to(P(0, -1.5))
        self.play(FadeIn(l50, shift=UP * 0.15), Indicate(ed.morceau(1, 12, 14), color=C_NOMBRE, scale_factor=1.6),
                  run_time=0.5)
        self.au_mot("en une seconde")
        l1s = self.t("en une seconde", 38, VERT_OK).move_to(P(0, -2.1))
        self.play(barre.animate.stretch(100, 0, about_edge=LEFT),
                  Succession(*[ed.vers(k) for k in (1, 0) * 5], run_time=1.0),
                  FadeIn(l1s, scale=0.6), run_time=1.0, rate_func=linear)
        self.au_mot("avec Python")
        self.insister(l1s, 1.15)
        self.attendre_voix(marge=0.1)

        # ── 01 : les fréquences tombent sur l'axe ──
        self.dire("01-image")
        axe = AxeFreq(x0=-1.85, x1=1.65, y=-0.1, pas=0.14, r=0.055)
        self.play(FadeOut(VGroup(ed, ed.curseur, cadre, barre, l100, l50, l1s), shift=UP * 0.2), FadeOut(badge),
                  Create(axe), run_time=0.4)
        nombres = VGroup()
        points = []
        for k, (v, mot) in enumerate(zip(DITES, ["0,28", "0,34", "0,26", "0,32"])):
            self.au_mot(mot)
            d = axe.point(v, DITE)
            n = self.t(mot, 46, DITE).move_to(P(-1.05 + 2.1 * (k % 2), -0.9 - 0.7 * (k // 2)))
            nombres.add(n)
            self.play(axe.tomber([d], run_time=0.35), FadeIn(n, scale=1.6), run_time=0.35)
            self.add(d)
            points.append(d)
        self.au_mot("Les fréquences bougent")
        autres = VGroup(*[axe.point(v) for v in FREQ50[4:]])
        points += list(autres)
        self.play(axe.tomber(autres, run_time=2.2, lag=0.03), Wiggle(nombres, scale_value=1.1), run_time=2.2)
        self.au_mot("autour de 0,3")
        rep = axe.repere(0.3, "0,3", haut=2.45, fs=34)
        l03 = VGroup(self.t("autour de", 36), self.t("0,3", 46, JAUNE_TITRE)).arrange(RIGHT, buff=0.2)
        l03.move_to(P(0, -2.35))
        self.play(Create(rep[0]), FadeIn(rep[1], scale=1.5), FadeIn(l03, shift=UP * 0.15), run_time=0.5)
        self.insister(l03[1], 1.3)
        self.attendre_voix(marge=0.1)

        # ── 02 : la question : avec 500 clients ? ──
        self.dire("02-question")
        toi = self.grand("Et toi ?", font_size=54, color=JAUNE_TITRE).move_to(P(0, 3.4))
        x0s = [d.get_x() for d in points]
        self.play(ReplacementTransform(titre, toi), FadeOut(VGroup(nombres, l03), shift=DOWN * 0.3), run_time=0.45)
        self.au_mot("500 clients")
        l500 = self.t("500 clients", 46, ORANGE_RETENUE).move_to(P(0, -0.75))
        self.play(FadeIn(l500, scale=0.6), run_time=0.4)
        self.au_mot("plus ou moins")
        pm = VGroup(self.t("plus ?", 36), self.t("moins ?", 36)).arrange(RIGHT, buff=0.5).move_to(P(0, -1.35))
        x03 = axe.x(0.3)
        def ecarter(k):
            return [d.animate.set_x(x03 + k * (x - x03)) for d, x in zip(points, x0s)]

        self.play(FadeIn(pm[0], shift=UP * 0.1), *ecarter(1.35), run_time=0.45)
        self.play(FadeIn(pm[1], shift=UP * 0.1), *ecarter(0.45), run_time=0.5)
        self.play(*ecarter(1.0), run_time=0.4)
        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.t("Réponds en", 44, VERT_OK), self.t("commentaire !", 44, VERT_OK)).arrange(DOWN, buff=0.1)
        appel.move_to(P(0, -2.3))
        self.play(FadeIn(appel, scale=0.7), run_time=0.4)
        self.play(appel.animate.scale(1.08), run_time=0.25)
        self.play(appel.animate.scale(1 / 1.08), run_time=0.25)
        self.attendre_voix(marge=1.5)


# 20/10 : le même short pour la 1re SPÉ (ceinture orange).
class ShortProbaBernSimulerPremiereSpe(ShortProbaBernSimuler):
    identite = "Maths 1re spé — EleveAI"
    ceinture = "orange"
