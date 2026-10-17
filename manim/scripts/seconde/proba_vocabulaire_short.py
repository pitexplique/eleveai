# proba_vocabulaire_short.py
# EleveAI — Maths 2de — short jumeau de la série « Probabilités », épisode 1 :
# univers, issue, événement. CEINTURE JAUNE. Il AMUSE : « 7 ou 12, tu paries
# sur quoi ? »
#   · en HAUT les deux dés : ils roulent, puis montrent 6 et 6, 1 et 6, 2 et 5…
#   · en BAS, EN MÊME TEMPS, le tableau à double entrée du coach (canvas
#     « tableau ») : la case du 12 s'allume, puis les 6 cases du 7 ;
#   · fin : « 2 ou 11 ? », la question, « Réponds en commentaire ! ».
# Ti-Margo en bas (margo_bas). Aucun nom de personne à l'écran.
#
# Voix : manim/voix/seconde-proba-vocabulaire-short.json (Julie, débit −7).
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/seconde/proba_vocabulaire_short.py ShortProbaVocabulaireSeconde -o eleveai-maths-seconde-proba-vocabulaire-short --media_dir manim/scripts/seconde/media
# Puis copier le mp4 dans manim/sorties/seconde/maths/probabilites/01-vocabulaire/.

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from proba_vocabulaire import (  # noqa: E402  (pose les chemins)
    AMBRE_BORD, AMBRE_FOND, AMBRE_TEXTE, BLEU_BORD, BLEU_FOND, TUILE_BORD, P, de, de_qui_roule,
    tableau_deux_des,
)

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

LARGEUR_MAX = 4.1
Y_DES = 1.2


class ShortProbaVocabulaireSeconde(Short6e):
    nom_voix = "seconde-proba-vocabulaire-short"

    def t(self, texte, font_size=30, color=WHITE, largeur=LARGEUR_MAX):
        t = Text(texte, font_size=font_size, color=color)
        if t.width > largeur:
            t.scale_to_fit_width(largeur)
        return t

    def insister(self, mob, k=1.5, run_time=0.25):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def paire(self, a, b):
        g = VGroup(de(a, 0.95), self.t("et", 36, JAUNE_TITRE), de(b, 0.95)).arrange(RIGHT, buff=0.3)
        return g.move_to(P(0, Y_DES))

    def montrer(self, ancienne, a, b, run_time=0.25):
        nouvelle = self.paire(a, b)
        self.play(FadeOut(ancienne, scale=0.8), FadeIn(nouvelle, scale=1.2), run_time=run_time)
        return nouvelle

    def allumer_case(self, cases, textes, c, fond, bord, texte):
        textes[c].set_color(texte)
        return AnimationGroup(cases[c].animate.set_fill(fond, 1).set_stroke(bord, 4), FadeIn(textes[c], scale=0.4))

    def construct(self):
        self.margo_bas()

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        titre = self.grand("Tu paries ?", font_size=50, color=JAUNE_TITRE).move_to(P(0, 3.4))
        badge = echelle_ceintures("jaune").scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.3))
        r1 = de_qui_roule(P(-0.65, Y_DES), 0.95, periode=0.13)
        r2 = de_qui_roule(P(0.65, Y_DES), 0.95, periode=0.17, faces=[4, 1, 6, 2, 5, 3])
        self.play(Write(titre), FadeIn(badge, shift=DOWN * 0.2), run_time=0.7)
        self.add(r1, r2)
        self.au_mot("quel total")
        q = VGroup(self.grand("7", font_size=96, color=AMBRE_BORD), self.grand("ou", font_size=40),
                   self.grand("12 ?", font_size=96, color=BLEU_BORD)).arrange(RIGHT, buff=0.3)
        q.scale_to_fit_width(min(q.width, 3.7)).move_to(P(0, -0.7))
        self.play(FadeIn(q, scale=0.5), run_time=0.4)
        self.insister(q, 1.2, 0.2)
        self.attendre_voix(marge=0.1)

        # ── 01 : l'image ──
        self.dire("01-image")
        grille, cases, textes = tableau_deux_des(P(-0.95, -0.85), cell=0.36, fs=17)
        r1.clear_updaters()
        r2.clear_updaters()
        des = self.paire(6, 6)
        self.play(FadeOut(q), FadeOut(r1), FadeOut(r2), FadeIn(des), FadeIn(grille), run_time=0.5)
        self.au_mot("il faut 6 et 6")
        self.play(self.allumer_case(cases, textes, (6, 6), BLEU_FOND, BLEU_BORD, TUILE_BORD), run_time=0.4)
        self.insister(cases[(6, 6)], 1.6, 0.2)
        self.au_mot("une seule façon")
        f12 = VGroup(self.t("12 :", 28, BLEU_BORD), self.t("une seule", 26, BLEU_BORD), self.t("façon", 26, BLEU_BORD)).arrange(DOWN, buff=0.08)
        f12.move_to(P(1.3, 0.05))
        self.play(FadeIn(f12, shift=LEFT * 0.2), run_time=0.3)
        for ex, (a, b) in zip(["1 et 6", "2 et 5", "3 et 4"], [(1, 6), (2, 5), (3, 4)]):
            self.au_mot(ex)
            des = self.montrer(des, a, b, 0.2)
            self.play(self.allumer_case(cases, textes, (a, b), AMBRE_FOND, AMBRE_BORD, AMBRE_TEXTE), run_time=0.25)
            des = self.montrer(des, b, a, 0.2)
            self.play(self.allumer_case(cases, textes, (b, a), AMBRE_FOND, AMBRE_BORD, AMBRE_TEXTE), run_time=0.25)
        self.au_mot("6 façons")
        f7 = VGroup(self.t("7 :", 28, AMBRE_BORD), self.t("6 façons", 26, AMBRE_BORD)).arrange(DOWN, buff=0.08)
        f7.move_to(P(1.3, -1.15))
        self.play(FadeIn(f7, scale=0.6), *[Indicate(cases[c], color=AMBRE_BORD) for c in
                                            [(1, 6), (2, 5), (3, 4), (4, 3), (5, 2), (6, 1)]], run_time=0.5)
        self.insister(f7, 1.3, 0.2)
        self.au_mot("6 fois plus souvent")
        fin = self.t("7 sort 6 fois plus souvent !", 30, VERT_OK).move_to(P(0, -2.55))
        self.play(FadeIn(fin, shift=UP * 0.2), run_time=0.4)
        self.insister(fin, 1.1, 0.25)
        self.attendre_voix(marge=0.2)

        # ── 02 : la question ──
        self.clear()
        self.margo_bas()
        self.dire("02-question")
        self.add(badge)
        toi = self.grand("Et toi ?", font_size=50, color=JAUNE_TITRE).move_to(P(0, 3.4))
        r1 = de_qui_roule(P(-0.65, 1.3), 0.95, periode=0.12)
        r2 = de_qui_roule(P(0.65, 1.3), 0.95, periode=0.16, faces=[4, 1, 6, 2, 5, 3])
        self.play(Write(toi), run_time=0.4)
        self.add(r1, r2)
        self.au_mot("le total 2 ou le total 11")
        q2 = VGroup(self.grand("2", font_size=72, color=BLEU_BORD), self.grand("ou", font_size=36),
                    self.grand("11 ?", font_size=72, color=AMBRE_BORD)).arrange(RIGHT, buff=0.3)
        q2.scale_to_fit_width(min(q2.width, 3.7)).move_to(P(0, 0.1))
        self.play(FadeIn(q2, scale=0.5), run_time=0.35)
        self.insister(q2, 1.2, 0.2)
        self.au_mot("lequel sort le plus")
        l = self.t("lequel sort le plus ?", 30).move_to(P(0, -0.6))
        self.play(FadeIn(l, shift=UP * 0.15), run_time=0.3)
        self.au_mot("Réponds en commentaire")
        r1.clear_updaters()
        r2.clear_updaters()
        appel = VGroup(self.grand("Réponds en", font_size=44, color=VERT_OK),
                       self.grand("commentaire !", font_size=44, color=VERT_OK)).arrange(DOWN, buff=0.1)
        appel.move_to(P(0, -1.5))
        self.play(FadeIn(appel, scale=0.7), run_time=0.4)
        self.insister(appel, 1.1, 0.25)
        self.attendre_voix(marge=1.5)
