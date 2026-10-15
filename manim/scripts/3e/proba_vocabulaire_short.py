# proba_vocabulaire_short.py
# EleveAI — Maths 3e — short jumeau de la série « Probabilités », épisode 1 :
# le vocabulaire. CEINTURE BLANCHE. Il AMUSE : « gagner au loto, c'est
# impossible ? »
#   · en HAUT le tirage du loto (les boules tournent dans le bocal) ;
#   · en BAS, EN MÊME TEMPS, l'échelle des probabilités de 0 (impossible) à 1
#     (certain) : une boule sort du bocal et glisse tout près de 0… sans
#     l'atteindre ;
#   · fin : un dé et « 7 ? », la question, « Réponds en commentaire ! ».
# Ti-Margo en bas (margo_bas). Aucun nom de personne à l'écran.
#
# Voix : manim/voix/3e-proba-vocabulaire-short.json (Julie, débit −7).
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/3e/proba_vocabulaire_short.py ShortProbaVocabulaire3e -o eleveai-maths-3e-proba-vocabulaire-short --media_dir manim/scripts/3e/media
# Puis copier le mp4 dans manim/sorties/3e/maths/probabilites/01-vocabulaire/.

import math
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from proba_vocabulaire import P, de, de_qui_roule  # noqa: E402  (pose les chemins)

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

LARGEUR_MAX = 4.1
X0, X1, YE = -1.75, 1.75, -1.2
BOCAL = P(0, 1.35)
NUMEROS = [7, 23, 41, 12, 36, 5, 49, 18, 30]
VITESSES = [3.1, -2.4, 3.9, -3.3, 2.7, -4.2, 3.5, -2.9, 4.6]
PHASES = [0.0, 2.3, 4.1, 1.2, 5.5, 3.1, 0.7, 4.8, 2.0]
COULEURS = [JAUNE_TITRE, BLEU_CALCUL, VERT_OK, ORANGE_RETENUE, VIOLET_ACCENT]


def x_de(p):
    return X0 + (X1 - X0) * p


def boule(n, couleur, r=0.19):
    b = Circle(radius=r, fill_color=couleur, fill_opacity=1, stroke_color=WHITE, stroke_width=2)
    return VGroup(b, Text(str(n), font_size=int(r * 90), color=BLACK, weight=BOLD).move_to(b))


class ShortProbaVocabulaire3e(Short6e):
    nom_voix = "3e-proba-vocabulaire-short"

    def t(self, texte, font_size=30, color=WHITE, largeur=LARGEUR_MAX):
        t = Text(texte, font_size=font_size, color=color)
        if t.width > largeur:
            t.scale_to_fit_width(largeur)
        return t

    def insister(self, mob, k=1.5, run_time=0.3):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    # ── le bocal du loto ────────────────────────────────────────────────────

    def bocal(self):
        verre = Circle(radius=0.88, stroke_color=WHITE, stroke_width=4, fill_color="#E0F2FE",
                       fill_opacity=0.08).move_to(BOCAL)
        pied = Polygon(P(-0.3, -0.84), P(0.3, -0.84), P(0.5, -1.1), P(-0.5, -1.1),
                       fill_color=GREY_D, fill_opacity=1, stroke_color=WHITE, stroke_width=2).shift(BOCAL)
        boules = VGroup(*[boule(n, COULEURS[k % len(COULEURS)]) for k, n in enumerate(NUMEROS)])
        horloge = {"t": 0.0, "v": 1.0}

        def tourne(m, dt):
            horloge["t"] += dt * horloge["v"]
            tt = horloge["t"]
            for k, b in enumerate(m):
                # vitesses NON proportionnelles à k : sinon les boules s'alignent toutes
                a = tt * VITESSES[k % len(VITESSES)] + PHASES[k % len(PHASES)]
                r = 0.42 + 0.18 * math.sin(tt * (2.3 + 0.61 * VITESSES[k % len(VITESSES)]) + k * 1.3)
                b.move_to(BOCAL + P(r * math.cos(a), r * math.sin(a)))

        boules.add_updater(tourne)
        return VGroup(pied, verre), boules

    # ── l'échelle 0 → 1 ─────────────────────────────────────────────────────

    def echelle(self):
        barre = Line(P(X0, YE), P(X1, YE), stroke_width=10)
        barre.set_color([VERT_OK, JAUNE_TITRE, ORANGE_RETENUE, ROUGE_ERREUR])
        bouts = VGroup(*[Line(P(x, YE - 0.16), P(x, YE + 0.16), stroke_width=4) for x in (X0, X1)])
        return VGroup(barre, bouts)

    def construct(self):
        self.margo_bas()

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        titre = self.grand("Gagner au loto ?", font_size=46, color=JAUNE_TITRE).move_to(P(0, 3.4))
        badge = echelle_ceintures("blanche").scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.72))
        verre, boules = self.bocal()
        self.play(Write(titre), FadeIn(badge, shift=DOWN * 0.2), FadeIn(verre), FadeIn(boules), run_time=0.9)
        self.au_mot("impossible ?")
        imp = self.grand("impossible ?", font_size=48, color=ROUGE_ERREUR).move_to(P(0, -0.35))
        self.play(FadeIn(imp, scale=0.5), run_time=0.35)
        self.insister(imp, 1.25, 0.25)
        self.attendre_voix(marge=0.1)

        # ── 01 : l'échelle ──
        self.dire("01-image")
        ech = self.echelle()
        non = self.grand("Non !", font_size=64, color=VERT_OK).move_to(P(0, -0.35))
        self.play(ReplacementTransform(imp, non), Create(ech), run_time=0.45)
        self.play(Wiggle(non), run_time=0.5)

        self.au_mot("Très peu probable")
        l1 = self.t("très peu probable,", 30, ORANGE_RETENUE).move_to(P(0, -0.1))
        self.play(FadeOut(non, shift=UP * 0.3), FadeIn(l1, shift=UP * 0.2), run_time=0.35)
        self.au_mot("mais possible")
        l2 = self.t("mais possible !", 32, VERT_OK).move_to(P(0, -0.55))
        self.play(FadeIn(l2, scale=0.6), run_time=0.3)
        self.insister(l2, 1.2, 0.2)

        self.au_mot("Impossible, c'est")
        m0 = self.t("impossible", 22, ROUGE_ERREUR).move_to(P(0, YE - 0.85)).align_to(P(-2.1, 0), LEFT)
        self.play(FadeIn(m0, shift=UP * 0.1), Flash(P(X0, YE), color=ROUGE_ERREUR), run_time=0.4)
        self.au_mot("de 0")
        n0 = self.t("0", 40, JAUNE_TITRE).next_to(P(X0, YE), DOWN, buff=0.15)
        self.play(FadeIn(n0, scale=0.4), run_time=0.25)
        self.insister(n0, 1.5, 0.2)

        self.au_mot("Certain, c'est 1")
        m1 = self.t("certain", 22, VERT_OK).move_to(P(0, YE - 0.85)).align_to(P(2.1, 0), RIGHT)
        n1 = self.t("1", 40, JAUNE_TITRE).next_to(P(X1, YE), DOWN, buff=0.15)
        self.play(FadeIn(m1, shift=UP * 0.1), Flash(P(X1, YE), color=VERT_OK), FadeIn(n1, scale=0.4),
                  run_time=0.4)
        self.insister(n1, 1.5, 0.2)

        self.au_mot("Le loto")
        # une boule sort du bocal et vient se poser sur l'échelle
        sortie = boules[0]
        boules.remove(sortie)
        self.add(sortie)
        haut = P(x_de(0.55), YE + 0.38)
        self.play(FadeOut(VGroup(l1, l2), shift=UP * 0.2),
                  sortie.animate.scale(1.2).move_to(haut), run_time=0.6,
                  rate_func=rate_functions.ease_in_out_sine)
        tag = self.t("loto", 26, JAUNE_TITRE)
        p = ValueTracker(0.55)
        sortie.add_updater(lambda m: m.move_to(P(x_de(p.get_value()), YE + 0.38)))
        tag.add_updater(lambda m: m.next_to(sortie, UP, buff=0.08))
        self.play(FadeIn(tag), run_time=0.2)
        self.au_mot("tout près de 0")
        self.play(p.animate.set_value(0.035), run_time=1.6, rate_func=rate_functions.ease_out_cubic)
        sortie.clear_updaters()
        tag.clear_updaters()

        self.au_mot("mais pas 0")
        pas0 = self.t("…mais pas 0 !", 34, VERT_OK, largeur=2.5).move_to(P(0.6, YE + 0.6))
        self.play(FadeIn(pas0, scale=0.6), run_time=0.3)
        loupe = VGroup(sortie, tag)
        self.play(loupe.animate.scale(1.5, about_point=P(X0, YE)), run_time=0.4)
        self.play(loupe.animate.scale(1 / 1.5, about_point=P(X0, YE)), run_time=0.4)
        self.insister(pas0, 1.15, 0.25)
        self.attendre_voix(marge=0.2)
        boules.clear_updaters()

        # ── 02 : la question ──
        self.clear()
        self.margo_bas()
        self.dire("02-question")
        self.add(badge)
        toi = self.grand("Et toi ?", font_size=50, color=JAUNE_TITRE).move_to(P(0, 3.4))
        roule = de_qui_roule(P(-0.85, 1.45), 1.0, periode=0.1)
        sept = self.grand("7 ?", font_size=80, color=ORANGE_RETENUE).move_to(P(0.95, 1.45))
        self.play(Write(toi), run_time=0.4)
        self.add(roule)
        self.au_mot("obtenir 7")
        self.play(FadeIn(sept, scale=0.5), run_time=0.35)
        self.insister(sept, 1.3, 0.2)
        self.au_mot("impossible ou")
        c1 = self.t("impossible", 32, ROUGE_ERREUR).move_to(P(0, 0.25))
        self.play(FadeIn(c1, shift=UP * 0.15), run_time=0.3)
        self.au_mot("peu probable")
        ou = self.t("ou", 26).move_to(P(0, -0.15))
        c2 = self.t("peu probable ?", 32, ORANGE_RETENUE).move_to(P(0, -0.55))
        self.play(FadeIn(ou), FadeIn(c2, shift=UP * 0.15), run_time=0.3)
        roule.clear_updaters()
        self.remove(roule)
        self.add(de(6, 1.0).move_to(P(-0.85, 1.45)))
        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.grand("Réponds en", font_size=44, color=VERT_OK),
                       self.grand("commentaire !", font_size=44, color=VERT_OK)).arrange(DOWN, buff=0.1)
        appel.move_to(P(0, -1.55))
        self.play(FadeIn(appel, scale=0.7), run_time=0.4)
        self.insister(appel, 1.1, 0.25)
        poignee = Text("@eleveai974", font_size=28, color=BLEU_CALCUL).move_to(P(0, -2.45))
        self.play(GrowFromCenter(poignee), run_time=0.3)
        self.attendre_voix(marge=1.5)
