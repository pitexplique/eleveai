# proba_va_equitable_short.py
# EleveAI — Maths STMG ET Maths 1re spécialité — short jumeau de
# « Un jeu équitable ? L'espérance répond » (proba_va_equitable.py).
# CEINTURE JAUNE. Il AMUSE : la ROULETTE du casino (18 rouges, 18 noires,
# un zéro vert). On mise 1 € sur le rouge : jeu équitable ?
#   · en HAUT la roulette qui tourne, la bille qui tombe (sur rouge, puis…
#     sur le zéro vert !) ;
#   · en BAS, EN MÊME TEMPS : 18/37 − 19/37 = −1/37 ≈ −0,03 € par euro misé,
#     « Le casino gagne toujours » ;
#   · fin : 100 € misés, combien le casino garde-t-il ? « Réponds en commentaire ! ».
# Ti-Margo en bas (margo_bas). Aucune classe à l'écran : UN SEUL rendu suffit,
# copié sous les deux noms (STMG, 1re spé). Les deux sous-classes existent
# quand même, identiques.
#
# Voix : manim/voix/stmg-premiere-spe-proba-va-equitable-short.json (débit −7).
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/proba_va_equitable_short.py ShortProbaVaEquitableSTMG -o eleveai-maths-stmg-proba-va-equitable-short --media_dir manim/scripts/stmg/media-va_equitable
# (ShortProbaVaEquitablePremiereSpe donne la même image.) Copier dans
# manim/sorties/stmg/maths/probabilites/26-va-equitable/ et
# manim/sorties/premiere/maths/probabilites/26-va-equitable/
# (eleveai-maths-premiere-proba-va-equitable-short.mp4).

import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "seconde"))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "premiere"))

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402
from proba_pc_conditionnelle import ENCRE, suite  # noqa: E402

LARGEUR_MAX = 4.1
ROUGE_CASE = "#DC2626"
NOIR_CASE = "#111827"
VERT_CASE = "#16A34A"
BOIS = "#7C2D12"
OR = "#FBBF24"
OR_FONCE = "#B45309"
N_CASES = 37


def P(x, y):
    return np.array([x, y, 0.0])


def piece(texte="1 €", r=0.3, fs=20):
    d = Circle(radius=r, fill_color=OR, fill_opacity=1, stroke_color=OR_FONCE, stroke_width=4)
    anneau = Circle(radius=r * 0.8, stroke_color=OR_FONCE, stroke_width=1.5)
    t = Text(texte, font_size=fs, color=ENCRE, weight=BOLD)
    return VGroup(d, anneau, t)


class Roulette(VGroup):
    """La roulette : 37 cases (0 vert en haut, puis rouge / noir en alternance :
    18 rouges, 18 noires), un rebord de bois, un cône central, une bille.
    self.cases[k] ; self.rouges ; self.vert ; self.plateau (ce qui tourne)."""

    def __init__(self, centre=P(0, 0.75), R=1.0, **kw):
        super().__init__(**kw)
        self.c, self.R = centre, R
        self.d = TAU / N_CASES
        rebord = Circle(radius=R * 1.13, fill_color=BOIS, fill_opacity=1, stroke_color=OR, stroke_width=4)
        piste = Circle(radius=R * 1.01, stroke_color=OR_FONCE, stroke_width=2)
        self.cases, self.rouges = VGroup(), VGroup()
        for k in range(N_CASES):
            coul = VERT_CASE if k == 0 else (ROUGE_CASE if k % 2 else NOIR_CASE)
            a = PI / 2 + self.d / 2 - k * self.d
            s = AnnularSector(inner_radius=R * 0.62, outer_radius=R, angle=-self.d, start_angle=a,
                              fill_color=coul, fill_opacity=1, stroke_color=OR, stroke_width=1)
            self.cases.add(s)
            if k % 2:
                self.rouges.add(s)
        self.vert = self.cases[0]
        cone = Circle(radius=R * 0.62, fill_color="#92400E", fill_opacity=1, stroke_color=OR, stroke_width=3)
        croix = VGroup(Line(P(-0.28, 0), P(0.28, 0)), Line(P(0, -0.28), P(0, 0.28))).set_stroke(OR, 5)
        moyeu = Dot(radius=0.09, color=OR)
        self.plateau = VGroup(self.cases, cone, croix, moyeu)
        VGroup(rebord, piste, self.plateau).shift(centre)
        self.add(rebord, piste, self.plateau)
        self.ang_bille = PI / 2 + 0.6
        self.bille = Dot(self.pos(self.ang_bille, 1.07), radius=0.075, color=WHITE).set_z_index(5)
        self.add(self.bille)

    def pos(self, ang, k):
        return self.c + self.R * k * P(np.cos(ang), np.sin(ang))

    def lancer(self, scene, cible=1, tours=2, run_time=2.4, extra=()):
        """Le plateau fait `tours` tours (sens horaire, il revient en place) ;
        la bille tourne en sens inverse et tombe dans la case `cible`."""
        a0 = self.ang_bille
        a_cible = PI / 2 - cible * self.d
        delta = (a_cible - a0) % TAU + TAU * (tours + 1)
        bille, plateau = self.bille, self.plateau
        dep = plateau.copy()

        def f_plateau(m, a):
            m.become(dep)
            m.rotate(-TAU * tours * rate_functions.ease_out_cubic(a), about_point=self.c)

        def f_bille(m, a):
            ang = a0 + delta * rate_functions.ease_out_cubic(a)
            k = 1.07 - (1.07 - 0.81) * min(1.0, max(0.0, (a - 0.7) / 0.3))
            m.move_to(self.pos(ang, k))

        scene.play(UpdateFromAlphaFunc(plateau, f_plateau), UpdateFromAlphaFunc(bille, f_bille), *extra,
                   run_time=run_time, rate_func=linear)
        self.ang_bille = a_cible

    def relever(self):
        """La bille remonte sur la piste (avant un nouveau lancer)."""
        return self.bille.animate.move_to(self.pos(self.ang_bille, 1.07))


class ShortProbaVaEquitableBase(Short6e):
    nom_voix = "stmg-premiere-spe-proba-va-equitable-short"

    def t(self, texte, font_size=30, color=WHITE, largeur=LARGEUR_MAX, weight=NORMAL):
        t = Text(texte, font_size=font_size, color=color, weight=weight)
        if t.width > largeur:
            t.scale_to_fit_width(largeur)
        return t

    def insister(self, mob, k=1.3, run_time=0.25):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def ligne(self, morceaux, fs=34, y=-1.0):
        g = suite(*[Text(x, font_size=fs, color=c) for x, c in morceaux], buff=0.12)
        if g.width > LARGEUR_MAX:
            g.scale_to_fit_width(LARGEUR_MAX)
        return g.move_to(P(0, y))

    def construct(self):
        self.margo_bas()

        # ── 00 : l'accroche : 1 € sur le rouge, jeu équitable ? ──
        self.dire("00-accroche")
        titre = self.grand("La roulette", font_size=42, color=JAUNE_TITRE).move_to(P(0, 3.4))
        badge = echelle_ceintures("jaune").scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.3))
        rl = Roulette()
        self.play(Write(titre), FadeIn(badge, shift=DOWN * 0.2), FadeIn(rl, scale=0.6), run_time=0.7)
        rl.lancer(self, cible=3, tours=1, run_time=1.6)
        self.au_mot("tu mises 1 euro")
        jeton = piece().move_to(P(-1.7, 1.55))
        l1 = self.ligne([("Mise :", WHITE), ("1 €", OR), ("sur le", WHITE), ("rouge", ROUGE_CASE)], 34, -0.75)
        self.play(FadeIn(jeton, scale=2), FadeIn(l1[:2], shift=UP * 0.1), run_time=0.4)
        self.au_mot("sur le rouge")
        self.play(FadeIn(l1[2:], shift=UP * 0.1), Indicate(rl.rouges, color=JAUNE_TITRE, scale_factor=1.0),
                  run_time=0.5)
        self.au_mot("18 cases rouges")
        l2 = self.ligne([("18", ROUGE_CASE), ("rouges sur", WHITE), ("37", JAUNE_TITRE), ("cases", WHITE)], 34, -1.3)
        flash = rl.rouges.copy().set_fill(opacity=0).set_stroke(JAUNE_TITRE, 4).set_z_index(4)
        self.play(FadeIn(l2[:2], shift=UP * 0.1), FadeIn(flash), run_time=0.4)
        self.au_mot("sur 37")
        self.play(FadeIn(l2[2:], scale=1.4), FadeOut(flash), run_time=0.4)
        self.au_mot("Tu gagnes 1 euro")
        l3 = self.ligne([("+1 €", VERT_OK), ("ou", WHITE), ("−1 €", ROUGE_ERREUR)], 40, -1.88)
        self.play(FadeIn(l3[0], scale=1.6), run_time=0.4)
        self.au_mot("ou tu perds ta mise")
        self.play(FadeIn(l3[1]), FadeIn(l3[2], scale=1.6), run_time=0.4)
        self.au_mot("Jeu équitable ?")
        q = self.ligne([("Jeu équitable ?", JAUNE_TITRE)], 42, -2.45)
        self.play(FadeIn(q, scale=1.5), run_time=0.4)
        self.insister(q, 1.2, 0.2)
        self.attendre_voix(marge=0.1)

        # ── 01 : 18/37 − 19/37 = −1/37 : le casino gagne toujours ──
        self.dire("01-image")
        self.play(FadeOut(VGroup(l1, l2, l3, q), shift=DOWN * 0.2), rl.relever(), run_time=0.4)
        self.au_mot("Gagner : 18 sur 37")
        g = self.ligne([("Gagner :", WHITE), ("18/37", VERT_OK)], 38, -0.75)
        self.play(FadeIn(g, shift=UP * 0.1), Indicate(rl.rouges, color=JAUNE_TITRE, scale_factor=1.0), run_time=0.5)
        self.au_mot("Perdre : 19 sur 37")
        p = self.ligne([("Perdre :", WHITE), ("19/37", ROUGE_ERREUR)], 38, -1.3)
        self.play(FadeIn(p, shift=UP * 0.1), run_time=0.4)
        self.au_mot("à cause du zéro vert")
        zv = self.ligne([("le zéro vert !", VERT_CASE)], 34, -1.85)
        rl.lancer(self, cible=0, tours=1, run_time=1.3)
        bord = rl.vert.copy().set_fill(opacity=0).set_stroke(JAUNE_TITRE, 7).set_z_index(4)
        self.play(FadeIn(zv, scale=1.5), FadeIn(bord), run_time=0.3)
        self.play(FadeOut(bord), run_time=0.15)
        self.play(FadeIn(bord), run_time=0.15)
        self.au_mot("Espérance : 18 sur 37")
        e1 = self.ligne([("E(X) =", JAUNE_TITRE), ("18/37", VERT_OK), ("−", WHITE), ("19/37", ROUGE_ERREUR)], 36, -0.75)
        self.play(FadeOut(VGroup(g[0], p[0], zv, bord)), ReplacementTransform(g[1], e1[1]), FadeIn(e1[0]),
                  run_time=0.5)
        self.au_mot("moins 19 sur 37")
        self.play(FadeIn(e1[2]), ReplacementTransform(p[1], e1[3]), run_time=0.5)
        self.au_mot("égale moins 1 sur 37")
        e2 = self.ligne([("=", WHITE), ("−1/37", ROUGE_ERREUR)], 44, -1.35)
        self.play(FadeIn(e2[0]), FadeIn(e2[1], scale=1.6), run_time=0.4)
        self.au_mot("Environ moins 3 centimes")
        e3 = self.ligne([("≈ −0,03 €", ROUGE_ERREUR)], 42, -1.95)
        e4 = self.ligne([("par euro misé", WHITE)], 32, -2.45)
        self.play(FadeIn(e3, scale=1.5), run_time=0.4)
        self.au_mot("par euro misé")
        self.play(FadeIn(e4, shift=UP * 0.1), run_time=0.4)
        self.au_mot("Le casino gagne toujours")
        casino = VGroup(self.t("Le casino", 40, ROUGE_ERREUR, weight=BOLD),
                        self.t("gagne toujours !", 40, ROUGE_ERREUR, weight=BOLD)).arrange(DOWN, buff=0.05)
        casino.move_to(P(0, 3.25))
        self.play(ReplacementTransform(titre, casino), FadeOut(jeton, shift=RIGHT * 0.5), run_time=0.5)
        self.insister(casino, 1.15, 0.2)
        self.attendre_voix(marge=0.1)

        # ── 02 : la question : 100 € misés ──
        self.dire("02-question")
        toi = self.grand("Et toi ?", font_size=48, color=JAUNE_TITRE).move_to(P(0, 3.4))
        self.play(ReplacementTransform(casino, toi), FadeOut(VGroup(e1, e2, e3, e4)), rl.relever(), run_time=0.5)
        self.au_mot("100 euros")
        q1 = self.ligne([("Tu mises", WHITE), ("100 €", OR), ("en tout", WHITE)], 36, -0.75)
        self.play(FadeIn(q1, shift=UP * 0.1), run_time=0.4)
        self.au_mot("combien le casino")
        q2 = self.ligne([("Combien le casino", WHITE)], 36, -1.3)
        q2b = self.ligne([("garde-t-il,", WHITE)], 36, -1.85)
        q3 = self.ligne([("en moyenne ?", JAUNE_TITRE)], 40, -2.42)
        rl.lancer(self, cible=7, tours=1, run_time=1.4, extra=[FadeIn(q2, shift=UP * 0.1)])
        self.au_mot("garde-t-il")
        self.play(FadeIn(q2b, shift=UP * 0.1), run_time=0.3)
        self.au_mot("en moyenne")
        self.play(FadeIn(q3, shift=UP * 0.1), run_time=0.4)
        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.t("Réponds en", 40, VERT_OK), self.t("commentaire !", 40, VERT_OK))
        appel.arrange(DOWN, buff=0.06).move_to(P(0, 2.3))
        self.play(FadeOut(badge), FadeIn(appel, scale=0.7), run_time=0.4)
        self.play(appel.animate.scale(1.08), run_time=0.25)
        self.play(appel.animate.scale(1 / 1.08), run_time=0.25)
        self.attendre_voix(marge=1.5)


class ShortProbaVaEquitableSTMG(ShortProbaVaEquitableBase):
    identite = "Maths STMG — EleveAI"


class ShortProbaVaEquitablePremiereSpe(ShortProbaVaEquitableBase):
    identite = "Maths 1re spé — EleveAI"
