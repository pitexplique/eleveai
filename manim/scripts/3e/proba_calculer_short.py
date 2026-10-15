# proba_calculer_short.py
# EleveAI — Maths 3e — short jumeau des probabilités, épisode 5 : calculer.
# CEINTURE JAUNE. Il AMUSE : le pari « 3 parfums, donc 1 chance sur 3 ? ».
# En HAUT le paquet de bonbons (4 citron, 5 fraise, 3 menthe) qui se remplit
# puis se VIDE EN PLUIE ; en BAS, EN MÊME TEMPS, « 1/3 ? » barré puis « 5/12 »
# qui se construit. Fin : la menthe et la question en commentaire.
# Dessins et couleurs repris de la paysage (proba_calculer.py).
# Voix : manim/voix/3e-proba-calculer-short.json (débit −7).
#
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/3e/proba_calculer_short.py ShortProbaCalculer3e -o eleveai-maths-3e-proba-calculer-short --media_dir manim/scripts/3e/media
# Puis copier le mp4 dans manim/sorties/3e/maths/probabilites/05-calculer/.

import math
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from proba_calculer import CITRON, FRAISE, MENTHE, PARFUMS, P, bonbon, places_sachet, sachet  # noqa: E402

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

LARGEUR_MAX = 4.1


class ShortProbaCalculer3e(Short6e):
    nom_voix = "3e-proba-calculer-short"

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

    def construct(self):
        self.margo_bas()

        # ── 00 : le pari ──
        self.dire("00-accroche")
        titre = self.grand("Le paquet de bonbons", font_size=40, color=JAUNE_TITRE).move_to(P(0, 3.4))
        badge = echelle_ceintures("jaune").scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.72))
        centre = P(-1.05, 1.05)
        L, H = 1.75, 1.85
        sac = sachet(L, H).move_to(centre)
        places = places_sachet(L, H, 0.6)
        self.play(FadeIn(titre), FadeIn(badge), FadeIn(sac, shift=DOWN * 0.2), run_time=0.7)

        ybas = -0.3
        bonbons = VGroup()
        compte = VGroup()
        xs = [-1.45, 0.0, 1.45]
        for extrait, coul, n, a, b, x in [("4 bonbons citron", CITRON, "4", 0, 4, xs[0]),
                                          ("5 fraise", FRAISE, "5", 4, 9, xs[1]),
                                          ("3 menthe", MENTHE, "3", 9, 12, xs[2])]:
            self.au_mot(extrait)
            neufs = VGroup()
            for k in range(a, b):
                p, ang = places[k]
                neufs.add(bonbon(coul, 0.48).rotate(ang).move_to(centre + p + UP * 1.6).set_opacity(0))
            self.add(neufs)
            c = VGroup(bonbon(coul, 0.6), self.t(n, 40, coul)).arrange(RIGHT, buff=0.12).move_to(P(x, ybas))
            self.play(LaggedStart(*[m.animate.set_opacity(1).move_to(centre + places[a + i][0])
                                    for i, m in enumerate(neufs)], lag_ratio=0.15),
                      FadeIn(c, scale=1.6), run_time=0.7, rate_func=rate_functions.ease_out_bounce)
            bonbons.add(*neufs)
            compte.add(c)

        # le pari, en haut à droite : un bonbon de chaque parfum, une chance chacun ?
        self.au_mot("1 chance sur 3")
        trio = VGroup(*[bonbon(c, 0.55) for c in (CITRON, FRAISE, MENTHE)]).arrange(DOWN, buff=0.18)
        trio.move_to(P(1.15, 1.05))
        faux = VGroup(self.fraction(1, 3, 56, ORANGE_RETENUE), self.t("?", 56, ORANGE_RETENUE))
        faux.arrange(RIGHT, buff=0.15).move_to(P(0, -1.4))
        self.play(LaggedStart(*[FadeIn(b, scale=0.4) for b in trio], lag_ratio=0.2),
                  FadeIn(faux, scale=0.6), run_time=0.7)
        self.insister(faux, 1.3, 0.3)
        self.attendre_voix(marge=0.15)

        # ── 01 : non ! la pluie de bonbons ──
        self.dire("01-image")
        self.au_mot("Non")
        barre = Line(faux.get_corner(DL) + LEFT * 0.1, faux.get_corner(UR) + RIGHT * 0.1,
                     stroke_width=8, color=ROUGE_ERREUR)
        self.play(Create(barre), faux.animate.set_color(ROUGE_ERREUR), run_time=0.35)
        self.play(VGroup(faux, barre).animate.scale(0.7).move_to(P(-1.2, -1.4)), run_time=0.4)

        self.au_mot("3 parfums")
        p3 = self.t("3 parfums", 24).next_to(trio, DOWN, buff=0.12)
        self.play(FadeIn(p3, shift=LEFT * 0.1), Wiggle(trio), run_time=0.6)

        self.au_mot("mais 12 bonbons")
        cibles = [P(-1.75 + (i % 6) * 0.7, 1.3 - (i // 6) * 0.6) for i in range(12)]
        self.play(FadeOut(p3), FadeOut(trio, shift=RIGHT * 0.4),
                  sac.animate.rotate(-2.5).scale(0.6).move_to(P(0.7, 1.75)), run_time=0.45)
        pluie = []
        for b, c in zip(bonbons, cibles):
            haut = sac.get_center() + DOWN * 0.1
            pluie.append(Succession(b.animate(run_time=0.15).move_to(haut).rotate(0.6),
                                    Transform(b, bonbon(PARFUMS[len(pluie)], 0.52).move_to(c), run_time=0.35,
                                              rate_func=rate_functions.ease_out_bounce)))
        self.play(LaggedStart(*pluie, lag_ratio=0.12), run_time=1.6)
        douze = VGroup(self.t("12", 32, JAUNE_TITRE), self.t("bonbons", 28)).arrange(RIGHT, buff=0.12)
        douze.move_to(P(0, 0.3))
        self.play(FadeOut(sac, shift=UP * 0.3), FadeIn(douze, scale=1.5), run_time=0.4)

        self.au_mot("5 à la fraise")
        f = self.fraction(5, 12, 52, VERT_OK, color_num=FRAISE)
        egal = self.t("=", 50)
        bon = VGroup(egal, f).arrange(RIGHT, buff=0.15).move_to(P(0.95, -1.4))
        roses = VGroup(*bonbons[4:9])
        self.play(*[r.animate.shift(UP * 0.22) for r in roses], run_time=0.25)
        copies = roses.copy()
        self.play(*[r.animate.shift(DOWN * 0.22) for r in roses],
                  LaggedStart(*[MoveAlongPath(c, ArcBetweenPoints(c.get_center(), f[0].get_center(), angle=-PI / 3))
                                for c in copies], lag_ratio=0.12), FadeIn(egal), run_time=0.8)
        self.play(ReplacementTransform(copies, f[0]), run_time=0.3)

        self.au_mot("sur 12")
        tous = bonbons.copy()
        self.play(Create(f[1]), LaggedStart(*[b.animate.move_to(f[2].get_center()).scale(0.5) for b in tous],
                                            lag_ratio=0.05), run_time=0.8)
        self.play(ReplacementTransform(tous, f[2]), run_time=0.3)

        self.au_mot("5 sur 12")
        self.insister(f, 1.35, 0.3)
        self.play(Create(SurroundingRectangle(f, color=VERT_OK, buff=0.12)), run_time=0.3)

        self.au_mot("On compte les bonbons")
        regle = VGroup(self.t("On compte les bonbons,", 24, BLEU_CALCUL),
                       self.t("pas les parfums !", 24, BLEU_CALCUL)).arrange(DOWN, buff=0.06).move_to(P(0, -2.5))
        self.play(FadeIn(regle, shift=UP * 0.15), run_time=0.4)
        self.play(Wiggle(bonbons), run_time=0.8)
        self.attendre_voix(marge=0.3)

        # ── 02 : la question ──
        self.clear()
        self.margo_bas()
        self.dire("02-question")
        self.play(Write(self.grand("Et la menthe ?", font_size=50, color=MENTHE).move_to(P(0, 2.6))), run_time=0.6)
        bases = [P(-1.2, 1.55), P(0, 1.55), P(1.2, 1.55)]
        verts = VGroup(*[bonbon(MENTHE, 1.15).move_to(p) for p in bases])
        horloge = {"t": 0.0}

        def danse(g, dt):
            horloge["t"] += dt
            for k, (b, p) in enumerate(zip(g, bases)):
                b.move_to(p + UP * 0.15 * abs(math.sin(horloge["t"] * 4 + k)))

        verts.add_updater(danse)
        self.play(LaggedStart(*[FadeIn(b, scale=0.4) for b in verts], lag_ratio=0.2), run_time=0.6)
        self.au_mot("quelle probabilité")
        q = VGroup(self.t("P =", 46), self.fraction("?", "?", 50, JAUNE_TITRE)).arrange(RIGHT, buff=0.2)
        q.move_to(P(0, 0.35))
        self.play(FadeIn(q, scale=0.7), run_time=0.4)
        self.insister(q[1], 1.3, 0.25)

        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.grand("Réponds en", font_size=48, color=VERT_OK),
                       self.grand("commentaire !", font_size=48, color=VERT_OK)).arrange(DOWN, buff=0.12)
        if appel.width > config.frame_width - 0.5:
            appel.scale_to_fit_width(config.frame_width - 0.5)
        appel.move_to(P(0, -1.05))
        poignee = self.grand("@eleveai974", font_size=32, color=BLEU_CALCUL).move_to(P(0, -2.2))
        self.play(FadeIn(appel, scale=0.7), run_time=0.4)
        self.insister(appel, 1.1, 0.25)
        self.play(GrowFromCenter(poignee), run_time=0.3)
        self.attendre_voix(marge=1.5)
        verts.clear_updaters()
