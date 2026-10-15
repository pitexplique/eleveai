# proba_contraire_short.py
# EleveAI — Maths 3e — short jumeau de l'épisode 6 des probabilités : l'événement
# contraire. CEINTURE JAUNE. Il AMUSE : en HAUT un nuage de pluie qui laisse
# place au soleil ; en BAS, EN MÊME TEMPS, la bande 100 % qui se remplit,
# 70 % pluie (BLEU) / 30 % sec (ORANGE). Fin : un ticket de tombola (1/5) et la
# question « Réponds en commentaire ! ».
# Mêmes dessins que la paysage (proba_contraire.py) : bande, nuage, soleil.
# Voix : manim/voix/3e-proba-contraire-short.json (débit −7).
#
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/3e/proba_contraire_short.py ShortProbaContraire3e -o eleveai-maths-3e-proba-contraire-short --media_dir manim/scripts/3e/media
# Puis copier le mp4 dans manim/sorties/3e/maths/probabilites/06-contraire/.

import math
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from proba_contraire import (  # noqa: E402  (pose les chemins)
    COUL_A, COUL_NON, P, bande, bande_cases, gouttes_qui_tombent, nuage, regle_total, soleil,
)

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

LARGEUR_MAX = 4.1


class ShortProbaContraire3e(Short6e):
    nom_voix = "3e-proba-contraire-short"

    def t(self, texte, font_size=30, color=WHITE, largeur=LARGEUR_MAX):
        t = Text(texte, font_size=font_size, color=color)
        if t.width > largeur:
            t.scale_to_fit_width(largeur)
        return t

    def ligne(self, morceaux, font_size=30, buff=0.14):
        g = VGroup(*[Text(m, font_size=font_size, color=c) for m, c in morceaux]).arrange(RIGHT, buff=buff)
        if g.width > LARGEUR_MAX:
            g.scale_to_fit_width(LARGEUR_MAX)
        return g

    def dans(self, part, texte, font_size=24, color=BLACK):
        lbl = Text(texte, font_size=font_size, color=color)
        if lbl.width > part.width - 0.08:
            lbl.scale_to_fit_width(max(part.width - 0.08, 0.2))
        return lbl.move_to(part)

    def insister(self, mob, k=1.4, run_time=0.3):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def ticket(self):
        fond = RoundedRectangle(width=3.2, height=1.35, corner_radius=0.12, fill_color="#FDE68A",
                                fill_opacity=1, stroke_color=ORANGE_RETENUE, stroke_width=4)
        trous = VGroup(*[Circle(radius=0.2, fill_color=BLACK, fill_opacity=1, stroke_color=ORANGE_RETENUE,
                                stroke_width=4).move_to(fond.get_edge_center(d)) for d in (LEFT, RIGHT)])
        pointilles = DashedLine(P(0.75, 0.6), P(0.75, -0.6), color=ORANGE_RETENUE, stroke_width=3, dash_length=0.08)
        mot = Text("TOMBOLA", font_size=26, color="#7C2D12", weight=BOLD).move_to(P(-0.3, 0.0))
        etoile = Star(5, outer_radius=0.26, fill_color=ORANGE_RETENUE, fill_opacity=1, stroke_width=0).move_to(P(1.2, 0))
        return VGroup(fond, trous, pointilles, mot, etoile)

    def construct(self):
        self.margo_bas()

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        titre = self.grand("Pluie ou sec ?", font_size=46, color=JAUNE_TITRE).move_to(P(0, 2.85))
        badge = echelle_ceintures("jaune").scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.3))
        self.play(FadeIn(titre), FadeIn(badge), run_time=0.6)

        nu = nuage(0.85).move_to(P(-0.2, 1.35))
        pluie = gouttes_qui_tombent(P(-0.2, 1.0), 1.1, 0.55, 7, 0.85)
        so = soleil(0.36).move_to(P(0.95, 1.5))
        b = bande(0.7, 3.9, 0.6).move_to(P(0, -0.8))
        l70 = self.ligne([("pluie :", COUL_A), ("70 %", COUL_A)], 34).move_to(P(0, -0.12))
        self.play(FadeIn(nu, shift=DOWN * 0.2), run_time=0.4)
        self.add(pluie, b[2])
        self.au_mot("70 %")
        self.play(FadeIn(l70, scale=0.7), GrowFromEdge(b[0], LEFT), run_time=0.8)
        self.add(b[2])
        self.play(FadeIn(self.dans(b[0], "pluie : 70 %")), run_time=0.3)
        self.insister(l70[1])
        self.au_mot("qu'il fasse sec")
        self.add(so)
        self.bring_to_front(nu)
        so.set_opacity(0)
        q = self.t("?", 34, COUL_NON).move_to(b[1])
        lsec = self.ligne([("sec :", COUL_NON), ("?", COUL_NON)], 34).move_to(P(0, -2.2))
        self.play(so.animate.set_opacity(1).shift(UP * 0.1), FadeIn(q), FadeIn(lsec), run_time=0.6)
        self.insister(q)
        self.attendre_voix(marge=0.2)

        # ── 01 : l'image ──
        self.dire("01-image")
        self.au_mot("100 moins 70")
        calc = self.ligne([("sec :", COUL_NON), ("100 % − 70 %", WHITE)], 32).move_to(P(0, -2.2))
        self.play(ReplacementTransform(lsec, calc), run_time=0.6)
        self.au_mot("30 %")
        res = self.ligne([("sec :", COUL_NON), ("100 % − 70 %", WHITE), ("= 30 %", COUL_NON)], 32).move_to(P(0, -2.2))
        pluie.clear_updaters()
        self.play(ReplacementTransform(calc, res), FadeOut(pluie),
                  nu.animate.shift(LEFT * 3.5).set_opacity(0),
                  so.animate.scale(1.3).move_to(P(0, 1.25)),
                  FadeOut(q), GrowFromEdge(b[1], LEFT), run_time=1.0)
        self.add(b[2])
        self.play(FadeIn(self.dans(b[1], "sec : 30 %", 22)), run_time=0.3)
        self.insister(res[2])

        self.au_mot("Il pleut, ou il ne pleut pas")
        nu2 = nuage(0.7).move_to(P(-1.05, 1.4))
        pluie2 = gouttes_qui_tombent(P(-1.05, 1.05), 0.9, 0.55, 6, 0.8)
        self.play(so.animate.scale(1 / 1.3).move_to(P(1.15, 1.4)), FadeIn(nu2), run_time=0.6)
        self.add(pluie2)
        self.play(Indicate(b[0], color=COUL_A, scale_factor=1.08), run_time=0.5)
        self.play(Indicate(b[1], color=COUL_NON, scale_factor=1.08), run_time=0.5)
        self.au_mot("les deux font 100 %")
        tot = regle_total(b, "100 %", 30)
        self.play(FadeIn(tot), run_time=0.4)
        self.insister(tot[3], 1.5)
        self.au_mot("C'est l'événement contraire")
        fin = self.t("l'événement contraire !", 34, VERT_OK).move_to(P(0, -2.2))
        self.play(FadeOut(res), FadeIn(fin, scale=0.7), run_time=0.5)
        self.insister(fin, 1.2)
        self.attendre_voix(marge=0.3)
        pluie2.clear_updaters()
        so[0].clear_updaters()

        # ── 02 : la question ──
        self.clear()
        self.margo_bas()
        self.dire("02-question")
        self.play(Write(self.grand("À toi !", font_size=56, color=JAUNE_TITRE).move_to(P(0, 2.7))), run_time=0.5)
        tk = self.ticket().scale(0.9).move_to(P(0, 1.5))
        self.play(FadeIn(tk, shift=DOWN * 0.3), run_time=0.4)
        etat = {"t": 0.0}

        def balance(m, dt):
            etat["t"] += dt
            m.rotate(0.25 * math.cos(etat["t"] * 4) * dt)

        tk.add_updater(balance)
        cases, couls = bande_cases(5, 1, 3.9, 0.55)
        cases.move_to(P(0, -0.05))
        self.au_mot("1 chance sur 5")
        g = self.ligne([("gagner :", COUL_A), ("1/5", COUL_A)], 34).move_to(P(0, 0.6))
        self.play(FadeIn(g), FadeIn(cases), run_time=0.5)
        self.play(cases[0].animate.set_fill(COUL_A, 0.9), FadeIn(self.dans(cases[0], "1/5", 22)), run_time=0.4)
        self.au_mot("quelle chance de perdre")
        p_ = self.ligne([("perdre :", COUL_NON), ("?", COUL_NON)], 34).move_to(P(0, -0.7))
        self.play(FadeIn(p_), *[c.animate.set_stroke(COUL_NON, 3) for c in cases[1:]],
                  FadeIn(self.t("?", 30, COUL_NON).move_to(cases[1:])), run_time=0.5)
        self.insister(p_[1], 1.5)
        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.t("Réponds en", 44, VERT_OK), self.t("commentaire !", 44, VERT_OK)).arrange(DOWN, buff=0.1)
        rep = VGroup(appel, self.grand("@eleveai974", font_size=30, color=BLEU_CALCUL))
        rep.arrange(DOWN, buff=0.12).move_to(P(0, -1.85))
        self.play(FadeIn(rep, scale=0.8), run_time=0.5)
        self.insister(appel, 1.15)
        self.attendre_voix(marge=1.5)
        tk.clear_updaters()
