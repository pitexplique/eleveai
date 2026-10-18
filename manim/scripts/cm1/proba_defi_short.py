# proba_defi_short.py
# EleveAI — Maths CM1 — short jumeau de la série « Probabilités », épisode 5 :
# le défi express de la roue. CEINTURE JAUNE. Il AMUSE, il ne donne PAS la réponse :
#   · en HAUT la roue du coach (roueAvecPoidsCanvas : 4 parts, 1 rouge, 3 bleues)
#     qui tourne et retombe toujours sur du bleu ;
#   · en BAS, EN MÊME TEMPS, « 1 roue · 4 parts · 1 seule rouge », puis
#     rouge = bleu, « ? parts rouges », l'indice « 4 parts » ;
#   · fin : la question, « Réponds en commentaire ! ».
# ⛔ PAS D'ÉCART (17/10) : chaque nombre écrit est dit quand il l'est.
# Ti-Margo en bas (margo_bas). Aucun nom de personne à l'écran.
#
# Voix : manim/voix/cm1-proba-defi-short.json (débit −10).
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/cm1/proba_defi_short.py ShortProbaDefiCM1 -o eleveai-maths-cm1-proba-defi-short --media_dir manim/scripts/cm1/media
# Puis copier le mp4 dans manim/sorties/cm1/maths/probabilites/05-defis/.

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from proba_defi import COACH, NUIT, P, roue, tourner_de  # noqa: E402

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

CENTRE = P(0, 0.6)
R = 0.72


class ShortProbaDefiCM1(Short6e):
    nom_voix = "cm1-proba-defi-short"

    def t(self, texte, font_size=40, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def insister(self, mob, k=1.4, run_time=0.22):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def tourner(self, parts, vitesse=9.0):
        etat = {"angle": 0.0}

        def maj(m, dt):
            d = vitesse * dt
            etat["angle"] += d
            tourner_de(m, CENTRE, d)

        parts.add_updater(maj)
        return etat

    def arreter_sur_bleu(self, parts, etat, run_time=1.2):
        """La roue s'arrête… encore sur une part bleue (la 2e, 3e ou 4e)."""
        parts.clear_updaters()
        tour = etat["angle"]
        cible = tour + TAU
        cible = cible + ((PI / 4 + PI / 2 * (int(tour) % 3)) - cible) % TAU
        fait = {"a": 0.0}

        def pas(m, alpha):
            a = (cible - tour) * alpha
            tourner_de(m, CENTRE, a - fait["a"])
            fait["a"] = a

        self.play(UpdateFromAlphaFunc(parts, pas), run_time=run_time, rate_func=rate_functions.ease_out_cubic)
        etat["angle"] = cible

    def egal(self, y):
        g = VGroup(Circle(radius=0.3, fill_color=COACH["R"], fill_opacity=1, stroke_color=NUIT, stroke_width=3),
                   self.t("=", 64), Circle(radius=0.3, fill_color=COACH["B"], fill_opacity=1, stroke_color=NUIT,
                                           stroke_width=3))
        return g.arrange(RIGHT, buff=0.3).move_to(P(0, y))

    def construct(self):
        self.margo_bas()
        badge = echelle_ceintures("jaune").scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.3))
        self.add(badge)
        fond, parts, fixe = roue(["R", "B", "B", "B"], CENTRE, R, 15)

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        titre = self.grand("Défi express !", font_size=52, color=JAUNE_TITRE).move_to(P(0, 3.35))
        self.play(Write(titre), run_time=0.5)
        self.au_mot("1 roue")
        l1 = VGroup(self.t("1 roue", 40), self.t("4 parts", 40, JAUNE_TITRE)).arrange(RIGHT, buff=0.5)
        l1.move_to(P(0, -1.05))
        self.play(FadeIn(VGroup(fond, parts, fixe), scale=0.6), FadeIn(l1[0], shift=UP * 0.1), run_time=0.4)
        self.add_foreground_mobject(fixe)
        etat = self.tourner(parts)
        self.au_mot("4 parts")
        self.play(FadeIn(l1[1], scale=0.5), run_time=0.3)
        self.au_mot("1 seule rouge")
        self.arreter_sur_bleu(parts, etat, 1.0)
        l2 = self.t("1 seule rouge", 44, COACH["R"]).move_to(P(0, -1.75))
        self.play(FadeIn(l2, scale=0.6), Indicate(parts[0], scale_factor=1.15), run_time=0.4)
        self.insister(l2, 1.25)
        self.attendre_voix(marge=0.1)

        # ── 01 : le défi ──
        self.dire("01-image")
        self.play(FadeOut(VGroup(l1, l2), shift=DOWN * 0.2), run_time=0.3)
        etat = self.tourner(parts, 10.0)
        self.au_mot("autant de chances")
        eg = self.egal(-0.95)
        self.play(GrowFromCenter(eg), run_time=0.35)
        self.insister(eg, 1.3)
        self.arreter_sur_bleu(parts, etat, 1.0)
        self.play(Wiggle(fixe[1], scale_value=1.4), run_time=0.5)
        self.au_mot("Combien de parts rouges")
        q = VGroup(self.t("?", 64, ORANGE_RETENUE), self.t("parts rouges", 36, COACH["R"])).arrange(RIGHT, buff=0.25)
        q.move_to(P(0, -1.75))
        self.play(FadeIn(q, scale=0.6), run_time=0.35)
        self.insister(q[0], 1.5)
        etat = self.tourner(parts, 10.0)
        self.au_mot("Indice")
        ind = VGroup(self.t("Indice :", 34, VERT_OK), self.t("4 parts", 40, JAUNE_TITRE)).arrange(RIGHT, buff=0.25)
        ind.move_to(P(0, -2.4))
        self.play(FadeIn(ind[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("4 parts")
        self.play(FadeIn(ind[1], scale=0.5), run_time=0.3)
        self.arreter_sur_bleu(parts, etat, 0.9)
        self.play(LaggedStart(*[Indicate(p, color=JAUNE_TITRE, scale_factor=1.12) for p in parts], lag_ratio=0.3),
                  run_time=1.0)
        self.attendre_voix(marge=0.2)

        # ── 02 : la question ──
        self.dire("02-question")
        self.play(FadeOut(VGroup(eg, q, ind), shift=DOWN * 0.2), run_time=0.3)
        etat = self.tourner(parts, 9.0)
        q2 = VGroup(self.grand("Combien de", font_size=40, color=WHITE),
                    self.grand("parts rouges ?", font_size=40, color=COACH["R"])).arrange(DOWN, buff=0.1)
        q2.move_to(P(0, -1.1))
        self.play(FadeIn(q2, scale=0.7), run_time=0.35)
        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.grand("Réponds en", font_size=44, color=VERT_OK),
                       self.grand("commentaire !", font_size=44, color=VERT_OK)).arrange(DOWN, buff=0.1)
        appel.move_to(P(0, -2.3))
        self.play(FadeIn(appel, scale=0.7), run_time=0.35)
        self.insister(appel, 1.1, 0.25)
        self.attendre_voix(marge=1.5)
        parts.clear_updaters()
