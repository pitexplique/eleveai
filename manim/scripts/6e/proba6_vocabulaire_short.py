# proba6_vocabulaire_short.py
# EleveAI — Maths 6e — short jumeau de la série « Probabilités », épisode 1 :
# L'ÉCHELLE DE 0 À 1. CEINTURE BLANCHE. Il AMUSE : « ce sac n'a que des billes
# rouges ; tirer une rouge, c'est combien ? »
#   · en HAUT le sac du COACH (canvas « billes » : rouge #ef4444, bord ardoise)
#     qui secoue, la bille qu'on tire, puis la bleue qui ne peut pas entrer ;
#   · en BAS, EN MÊME TEMPS : l'échelle DEBOUT (1 tout en haut, 0 tout en bas,
#     comme le dit la voix), les billes viennent s'y poser ;
#   · fin : la pièce qui tourne, le « ? » qui cherche sa place sur l'échelle,
#     « Réponds en commentaire ! ».
# Ti-Margo en bas (margo_bas). Aucun nom de personne à l'écran.
#
# Voix : manim/voix/6e-proba-vocabulaire-short.json (débit −10).
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/6e/proba6_vocabulaire_short.py ShortProba6Vocabulaire -o eleveai-maths-6e-proba-vocabulaire-short --media_dir manim/scripts/6e/media
# Puis copier le mp4 dans manim/sorties/6e/maths/probabilites/01-vocabulaire/.

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from proba6_vocabulaire import (  # noqa: E402  (pose aussi les chemins)
    BLEU_BILLE, C_CERTAIN, C_IMPOSSIBLE, ROUGE_BILLE, P, barre_echelle, bille_coach, carte_billes, croix,
    piece_qui_tourne, sac_autour)

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

LARGEUR_MAX = 4.1
HAUT = P(0, 0.65)        # le dessin
XE = -1.2                # l'échelle debout, en bas
Y0, Y1 = -2.7, -0.75     # 0 tout en bas, 1 tout en haut


class ShortProba6Vocabulaire(Short6e):
    nom_voix = "6e-proba-vocabulaire-short"

    def t(self, texte, font_size=30, color=WHITE, largeur=LARGEUR_MAX):
        t = Text(texte, font_size=font_size, color=color)
        if t.width > largeur:
            t.scale_to_fit_width(largeur)
        return t

    def insister(self, mob, k=1.5, run_time=0.22):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def badge(self):
        return echelle_ceintures("blanche").scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.3))

    def echelle_debout(self, y0=Y0, y1=Y1):
        return barre_echelle(P(XE, y0), P(XE, y1), epaisseur=16)

    def sac_rouge(self):
        carte, billes = carte_billes([ROUGE_BILLE] * 6, r=0.25, pas=0.62)
        carte.move_to(HAUT)
        sac = sac_autour(carte, 0.25)
        return VGroup(sac, carte), carte, billes

    def construct(self):
        self.margo_bas()

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        titre = self.grand("Que des rouges !", font_size=44, color=JAUNE_TITRE).move_to(P(0, 3.4))
        badge = self.badge()
        tout, carte, billes = self.sac_rouge()
        self.play(Write(titre), FadeIn(badge, shift=DOWN * 0.2), FadeIn(tout[0]), FadeIn(carte[0]), run_time=0.7)
        self.play(LaggedStart(*[FadeIn(b, scale=0.3) for b in billes], lag_ratio=0.1), run_time=0.6)
        ech = self.echelle_debout()
        self.au_mot("Tirer une rouge")
        self.play(Wiggle(tout, scale_value=1.06, rotation_angle=0.05 * TAU), Create(ech[0], lag_ratio=1), FadeIn(ech[1]),
                  run_time=0.7)
        rouge = bille_coach(ROUGE_BILLE, 0.25).move_to(billes[4])
        self.play(rouge.animate.move_to(HAUT + RIGHT * 1.75).scale(1.3), run_time=0.5)
        self.au_mot("c'est combien")
        q = self.t("?", 80, ORANGE_RETENUE).move_to(P(XE + 0.75, (Y0 + Y1) / 2))
        self.play(FadeIn(q, scale=0.4), run_time=0.3)
        self.play(q.animate.shift(UP * 0.8), run_time=0.3)
        self.play(q.animate.shift(DOWN * 1.6), run_time=0.45)
        self.play(q.animate.shift(UP * 0.8), run_time=0.3)
        self.attendre_voix(marge=0.1)

        # ── 01 : certain → 1 ; impossible → 0 ──
        self.dire("01-image")
        self.au_mot("C'est certain")
        cert = self.t("certain !", 36, C_CERTAIN)
        cert.move_to(P(XE + 0.95 + cert.width / 2, Y1))
        self.play(FadeOut(q, scale=0.5), rouge.animate.move_to(P(XE + 0.55, Y1)).scale(1 / 1.3),
                  run_time=0.5)
        self.play(FadeIn(cert, shift=LEFT * 0.2), run_time=0.3)
        self.au_mot(": 1")
        n1 = self.t("1", 56, JAUNE_TITRE).move_to(P(XE - 0.6, Y1))
        self.play(FadeIn(n1, scale=0.4), run_time=0.3)
        self.insister(n1, 1.6)
        self.au_mot("tout en haut")
        self.play(Indicate(ech[1][1], color=C_CERTAIN, scale_factor=1.6), run_time=0.5)

        self.au_mot("Et une bleue")
        bleue = bille_coach(BLEU_BILLE, 0.32).move_to(HAUT + RIGHT * 1.75)
        self.play(FadeIn(bleue, scale=0.4), run_time=0.3)
        self.play(bleue.animate.move_to(carte.get_center()), run_time=0.35)
        self.play(bleue.animate.move_to(HAUT + RIGHT * 1.75), run_time=0.35)
        self.au_mot("Impossible")
        xb = croix(bleue, sw=6)
        self.play(Create(xb), run_time=0.25)
        imp = self.t("impossible", 32, C_IMPOSSIBLE)
        imp.move_to(P(XE + 0.95 + imp.width / 2, Y0))
        g = VGroup(bleue, xb)
        self.play(g.animate.scale(0.8).move_to(P(XE + 0.55, Y0)), FadeIn(imp, shift=LEFT * 0.2), run_time=0.5)
        self.au_mot(": 0")
        n0 = self.t("0", 56, JAUNE_TITRE).move_to(P(XE - 0.6, Y0))
        self.play(FadeIn(n0, scale=0.4), run_time=0.3)
        self.insister(n0, 1.6)
        self.au_mot("tout en bas")
        self.play(Indicate(ech[1][0], color=C_IMPOSSIBLE, scale_factor=1.6), run_time=0.5)
        self.attendre_voix(marge=0.3)

        # ── 02 : la question ──
        self.clear()
        self.margo_bas()
        self.dire("02-question")
        self.add(badge)
        toi = self.grand("Et toi ?", font_size=50, color=JAUNE_TITRE).move_to(P(0, 3.4))
        self.play(Write(toi), run_time=0.4)
        self.au_mot("pile ou face")
        piece = piece_qui_tourne(P(0, 1.1), 0.5)
        self.add(piece)
        ya, yb = -1.4, 0.0
        ech2 = self.echelle_debout(ya, yb)
        m0 = self.t("0", 46, JAUNE_TITRE).move_to(P(XE - 0.55, ya))
        m1 = self.t("1", 46, JAUNE_TITRE).move_to(P(XE - 0.55, yb))
        self.play(Create(ech2[0], lag_ratio=1), FadeIn(ech2[1]), FadeIn(m0), FadeIn(m1), run_time=0.6)
        self.au_mot("on le place où")
        q2 = self.t("?", 72, ORANGE_RETENUE).move_to(P(XE + 0.65, yb))
        self.play(FadeIn(q2, scale=0.4), run_time=0.25)
        self.play(q2.animate.move_to(P(XE + 0.65, ya)), run_time=0.6)
        self.play(q2.animate.move_to(P(XE + 0.65, (ya + yb) / 2 + 0.5)), run_time=0.45)
        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.grand("Réponds en", font_size=40, color=VERT_OK),
                       self.grand("commentaire !", font_size=40, color=VERT_OK)).arrange(DOWN, buff=0.1)
        appel.move_to(P(0, -2.25))
        self.play(FadeIn(appel, scale=0.7), run_time=0.4)
        self.insister(appel, 1.1, 0.25)
        self.play(q2.animate.shift(DOWN * 0.5), run_time=0.3)
        self.play(q2.animate.shift(UP * 0.5), run_time=0.3)
        self.attendre_voix(marge=1.5)
        piece.clear_updaters()
