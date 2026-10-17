# proba_hasard_short.py
# EleveAI — Maths CM1 — short jumeau de la série « Probabilités », épisode 2 :
# c'est quoi, le hasard ? CEINTURE BLANCHE. Il AMUSE : « 6… 6… 6 ! Et maintenant ? »
#   · en HAUT le dé du coach qui roule et tombe trois fois sur 6 ; puis il
#     « oublie » (sa bulle de pensée éclate) et roule encore ;
#   · en BAS, EN MÊME TEMPS, la rangée 6 · 6 · 6 · ? qui se remplit, puis la
#     grille des 6 faces du coach (deCanvas) qui s'allument une à une ;
#   · fin : « 6 ? », la question, « Réponds en commentaire ! ».
# ⛔ PAS D'ÉCART (17/10) : toute information nécessaire est dite ; seul le
# redondant (étiquettes, décor) peut s'écrire sans être dit.
# Ti-Margo en bas (margo_bas). Aucun nom de personne à l'écran.
#
# Voix : manim/voix/cm1-proba-hasard-short.json (débit −10).
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/cm1/proba_hasard_short.py ShortProbaHasardCM1 -o eleveai-maths-cm1-proba-hasard-short --media_dir manim/scripts/cm1/media
# Puis copier le mp4 dans manim/sorties/cm1/maths/probabilites/02-hasard/.

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from proba_hasard import (P, allumer, face_coach, de_coach_qui_roule,  # noqa: E402
                          grille_de_coach)

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

DE_HAUT = P(-0.85, 1.05)


class ShortProbaHasardCM1(Short6e):
    nom_voix = "cm1-proba-hasard-short"

    def insister(self, mob, k=1.5, run_time=0.25):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def rouler(self):
        r = de_coach_qui_roule(DE_HAUT, 1.25, periode=0.09)
        self.add(r)
        return r

    def poser(self, roule, face=6):
        """Le dé s'arrête sur `face` avec un petit choc."""
        roule.clear_updaters()
        self.remove(roule)
        d = face_coach(face, 1.25).move_to(DE_HAUT)
        self.add(d)
        self.play(d.animate.scale(1.25), Flash(d, color=JAUNE_TITRE, line_length=0.25), run_time=0.18)
        self.play(d.animate.scale(1 / 1.25), run_time=0.15)
        return d

    def construct(self):
        self.margo_bas()

        # ── 00 : l'accroche, 6… 6… 6 ! ──
        self.dire("00-accroche")
        titre = self.grand("6… 6… 6 !", font_size=56, color=JAUNE_TITRE).move_to(P(0, 3.4))
        badge = echelle_ceintures("blanche").scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.3))
        self.add(badge)
        roule = self.rouler()
        xs = [-1.5, -0.5, 0.5, 1.5]
        cases = VGroup(*[RoundedRectangle(width=0.82, height=0.95, corner_radius=0.12, stroke_color=BLEU_CALCUL,
                                          stroke_width=3).move_to(P(x, -0.55)) for x in xs])
        self.play(FadeIn(cases), run_time=0.3)
        six = VGroup()
        for k, ex in enumerate(["6… 6… 6 !", "6… 6 !", "6 !"]):
            self.au_mot(ex)
            d = self.poser(roule)
            n = Text("6", font_size=56, color=JAUNE_TITRE).move_to(cases[k])
            self.play(FadeIn(n, scale=0.4), run_time=0.15)
            six.add(n)
            if k == 2:  # le titre s'écrit quand la voix a dit les trois 6
                self.play(Write(titre), run_time=0.4)
            if k < 2:
                self.remove(d)
                roule = self.rouler()
        self.au_mot("Trois fois")
        trois = Text("3 fois de suite !", font_size=38, color=WHITE).move_to(P(0, -1.5))
        self.play(FadeIn(trois, scale=0.6), run_time=0.3)
        self.insister(trois, 1.2, 0.2)
        self.au_mot("Et maintenant")
        q = Text("?", font_size=64, color=ORANGE_RETENUE).move_to(cases[3])
        self.play(FadeIn(q, scale=0.4), cases[3].animate.set_stroke(ORANGE_RETENUE, 4), run_time=0.3)
        self.insister(q, 1.5, 0.2)
        self.attendre_voix(marge=0.1)
        self.dernier_de = d
        self.rangee = VGroup(cases, six, q, trois)

        # ── 01 : le dé n'a pas de mémoire ──
        self.dire("01-image")
        d = self.dernier_de
        bulle = Ellipse(width=2.0, height=1.25, stroke_color=WHITE, stroke_width=3, fill_color="#1E293B",
                        fill_opacity=1).move_to(P(1.15, 1.65))
        points = VGroup(Circle(radius=0.07), Circle(radius=0.11)).set_stroke(WHITE, 2.5)
        points[0].move_to(P(-0.1, 1.05))
        points[1].move_to(P(0.2, 1.25))
        souvenirs = VGroup(*[face_coach(6, 0.46) for _ in range(3)]).arrange(RIGHT, buff=0.1).move_to(bulle)
        self.play(FadeIn(points, lag_ratio=0.5), GrowFromCenter(bulle), run_time=0.4)
        self.play(LaggedStart(*[FadeIn(s, scale=0.5) for s in souvenirs], lag_ratio=0.25), run_time=0.5)
        self.au_mot("ne se souvient de rien")
        # la bulle ÉCLATE : il a tout oublié
        self.play(VGroup(bulle, souvenirs).animate.scale(1.35).set_opacity(0), FadeOut(points),
                  Flash(bulle.get_center(), color=WHITE, line_length=0.35, num_lines=10), run_time=0.45)
        self.remove(bulle, souvenirs)
        oubli = Text("rien !", font_size=40, color=ORANGE_RETENUE).move_to(P(1.15, 1.6))
        self.play(FadeIn(oubli, scale=0.5), run_time=0.25)
        self.au_mot("Le prochain lancer")
        self.remove(d)
        roule = self.rouler()
        fond, faces = grille_de_coach(0.68, 0.15)
        grille = VGroup(fond, faces).move_to(P(0, -0.9))
        self.play(FadeOut(self.rangee, shift=DOWN * 0.3), FadeOut(oubli), run_time=0.3)
        self.play(FadeIn(grille, shift=UP * 0.3), run_time=0.35)
        self.au_mot("encore le hasard")
        hasard = Text("hasard !", font_size=38, color=VERT_OK).move_to(P(1.0, 1.05)).align_to(P(2.05, 0), RIGHT)
        self.play(FadeIn(hasard, scale=0.5), run_time=0.3)
        self.insister(hasard, 1.25, 0.2)
        chiffres = VGroup(*[Text(c, font_size=36, color=JAUNE_TITRE if c != "ou" else WHITE)
                            for c in ["1,", "2,", "3,", "4,", "5", "ou", "6"]]).arrange(RIGHT, buff=0.16)
        chiffres.move_to(P(0, -2.35))
        groupes = [(0, [0]), (1, [1]), (2, [2]), (3, [3]), (4, [4]), (5, [5, 6])]
        for ex, (f, idx) in zip(["1, 2", "2, 3", "3, 4", "4, 5", "5 ou", "ou 6"], groupes):
            self.au_mot(ex)
            fa = faces[f]
            allumer(fa)  # la face passe en ambre, puis elle saute
            self.play(fa.animate.scale(1.25), *[FadeIn(chiffres[i], shift=UP * 0.1) for i in idx], run_time=0.15)
            self.play(fa.animate.scale(1 / 1.25), run_time=0.1)
        self.attendre_voix(marge=0.9)
        roule.clear_updaters()

        # ── 02 : la question ──
        self.clear()
        self.margo_bas()
        self.dire("02-question")
        self.add(badge)
        toi = self.grand("Et toi ?", font_size=56, color=JAUNE_TITRE).move_to(P(0, 3.4))
        self.play(Write(toi), run_time=0.4)
        roule = de_coach_qui_roule(P(-0.85, 1.05), 1.25, periode=0.09)
        self.add(roule)
        self.au_mot("refaire 6")
        six = self.grand("6 ?", font_size=90, color=ORANGE_RETENUE).move_to(P(1.0, 1.05))
        self.play(FadeIn(six, scale=0.5), run_time=0.3)
        self.insister(six, 1.3, 0.2)
        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.grand("Réponds en", font_size=48, color=VERT_OK),
                       self.grand("commentaire !", font_size=48, color=VERT_OK)).arrange(DOWN, buff=0.12)
        appel.move_to(P(0, -0.85))
        self.play(FadeIn(appel, scale=0.7), run_time=0.35)
        self.insister(appel, 1.1, 0.25)
        poignee = Text("@eleveai974", font_size=30, color=BLEU_CALCUL).move_to(P(0, -2.2))  # décor toléré
        self.play(GrowFromCenter(poignee), run_time=0.3)
        self.attendre_voix(marge=1.5)
        roule.clear_updaters()
