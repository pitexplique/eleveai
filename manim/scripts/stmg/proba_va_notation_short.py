# proba_va_notation_short.py
# EleveAI — Maths STMG ET Maths 1re spé — short jumeau de « Une variable
# aléatoire : lire X = a et X ≤ a » (micros : va_ecritures en STMG, va_notation
# en 1re spé). CEINTURE JAUNE. Il AMUSE : un jeu à 0 / 5 / 20 €. « X ≤ 5 » :
# 5 € pile ? Non ! Le signe RAMASSE 0 et 5.
#   · en HAUT la roue du jeu qui tourne, ses secteurs 0 € et 5 € qui s'allument ;
#   · en BAS, EN MÊME TEMPS : « X ≤ 5 », « 5 € pile ? », NON !, les trois gains
#     en cases, la flèche qui ramasse 0 et 5, « le 5 compris » ;
#   · fin : « X < 5 », quelles valeurs ? « Réponds en commentaire ! ».
# Ti-Margo en bas (margo_bas). Aucune classe à l'écran : UN SEUL rendu suffit,
# copié sous les deux noms (STMG, 1re spé). Les deux sous-classes existent quand
# même, identiques.
#
# Voix : manim/voix/stmg-premiere-spe-proba-va-notation-short.json (débit −7).
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/proba_va_notation_short.py ShortProbaVaNotationSTMG -o eleveai-maths-stmg-proba-va-notation-short --media_dir manim/scripts/stmg/media-va_notation
# (ShortProbaVaNotationPremiereSpe donne la même image.) Copier dans
# manim/sorties/stmg/maths/probabilites/23-va-notation/ et
# manim/sorties/premiere/maths/probabilites/23-va-notation/
# (eleveai-maths-premiere-proba-va-notation-short.mp4).

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from proba_va_notation import (ALLUME, BORD, COUL_0, COUL_10, COUL_2, ENCRE, ENTETE, SURLIGNE,  # noqa: E402
                               P, RoueKermesse, suite)

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

LARGEUR_MAX = 4.1


class ShortProbaVaNotationBase(Short6e):
    nom_voix = "stmg-premiere-spe-proba-va-notation-short"

    def t(self, texte, font_size=30, color=WHITE, largeur=LARGEUR_MAX, weight=NORMAL):
        t = Text(texte, font_size=font_size, color=color, weight=weight)
        if t.width > largeur:
            t.scale_to_fit_width(largeur)
        return t

    def insister(self, mob, k=1.3, run_time=0.25):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def ligne(self, morceaux, fs=34, y=-1.0, weight=NORMAL):
        g = suite(*[Text(x, font_size=fs, color=c, weight=weight) for x, c in morceaux], buff=0.14)
        if g.width > LARGEUR_MAX:
            g.scale_to_fit_width(LARGEUR_MAX)
        return g.move_to(P(0, y))

    def construct(self):
        self.margo_bas()

        # ── 00 : l'accroche : « X ≤ 5 » : 5 € pile ? ──
        self.dire("00-accroche")
        titre = self.grand("Le jeu", font_size=44, color=JAUNE_TITRE).move_to(P(0, 3.4))
        badge = echelle_ceintures("jaune").scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.3))
        r = RoueKermesse(gains=("0 €", "5 €", "20 €"), parts=(0.5, 0.35, 0.15), couleurs=(COUL_0, COUL_2, COUL_10),
                         centre=P(0, 0.42), r=0.82, fs=24, carte=False)
        self.play(Write(titre), FadeIn(badge, shift=DOWN * 0.2), FadeIn(r, scale=0.6), run_time=0.7)
        for k, mot in enumerate(["gagnes 0", "5 ou 20", "20 euros"]):
            self.au_mot(mot)
            self.play(FadeIn(r.lab[k], scale=1.8), run_time=0.3)
        r.lancer(self, 2, tours=2, run_time=1.4)
        self.au_mot("X inférieur")
        l1 = self.ligne([("X ≤ 5", JAUNE_TITRE)], 56, -0.85, BOLD)
        self.play(FadeIn(l1, scale=1.6), run_time=0.4)
        self.insister(l1, 1.25, 0.2)
        self.au_mot("tu gagnes 5 euros pile")
        l2 = self.ligne([("5 € pile ?", ORANGE_RETENUE)], 40, -1.6, BOLD)
        self.play(FadeIn(l2, shift=UP * 0.15), Indicate(r.sect[1], color=ALLUME, scale_factor=1.12), run_time=0.5)
        self.attendre_voix(marge=0.1)

        # ── 01 : NON ! « ≤ » ramasse 0 et 5 ──
        self.dire("01-image")
        self.au_mot("Non")
        non = self.ligne([("NON !", ROUGE_ERREUR)], 60, -1.6, BOLD)
        barre = Line(l2.get_left() + LEFT * 0.1, l2.get_right() + RIGHT * 0.1, color=ROUGE_ERREUR, stroke_width=7)
        self.play(Create(barre), run_time=0.25)
        self.play(FadeOut(VGroup(l2, barre)), FadeIn(non, scale=2.2), Wiggle(l1), run_time=0.5)
        self.insister(non, 1.3, 0.2)
        self.au_mot("c'est 5 euros")
        l3 = self.ligne([("5 €", WHITE), ("OU MOINS", JAUNE_TITRE)], 36, -1.6, BOLD)
        l3[1].shift(RIGHT * 0.12)
        l3.move_to(P(0, -1.6))
        self.play(ReplacementTransform(non, l3), run_time=0.5)
        cases = VGroup()
        for v in ("0", "5", "20"):
            rc = RoundedRectangle(width=0.95, height=0.68, corner_radius=0.1, fill_color=ENTETE, fill_opacity=1,
                                  stroke_color=BORD, stroke_width=2)
            cases.add(VGroup(rc, Text(v, font_size=40, color=WHITE, weight=BOLD).move_to(rc)))
        cases.arrange(RIGHT, buff=0.32).move_to(P(0, -2.45))
        self.au_mot("0 ou 5")
        self.play(LaggedStart(*[FadeIn(c, shift=UP * 0.2) for c in cases], lag_ratio=0.2), *r.allumer([0, 1]),
                  run_time=0.7)
        self.au_mot("ramasse")
        fl = CurvedArrow(cases[1].get_top() + UP * 0.08, cases[0].get_top() + UP * 0.08 + LEFT * 0.25,
                         radius=1.0, color=JAUNE_TITRE, stroke_width=6, tip_length=0.22)
        lasso = SurroundingRectangle(VGroup(cases[0], cases[1]), color=JAUNE_TITRE, buff=0.1, corner_radius=0.18,
                                     stroke_width=6)
        self.play(FadeOut(l3, shift=UP * 0.2), Create(fl), run_time=0.6)
        self.play(Create(lasso), FadeOut(fl), *[c[0].animate.set_fill(SURLIGNE, 1) for c in cases[:2]],
                  *[c[1].animate.set_color(ENCRE) for c in cases[:2]], cases[2].animate.set_opacity(0.35),
                  run_time=0.5)
        self.play(VGroup(cases[0], cases[1], lasso).animate.shift(UP * 0.12), run_time=0.15)
        self.play(VGroup(cases[0], cases[1], lasso).animate.shift(DOWN * 0.12), run_time=0.15)
        self.au_mot("le 5 compris")
        l4 = suite(self.t("le 5 compris", 38, VERT_OK), self.coche(taille=0.2), buff=0.18).move_to(P(0, -1.6))
        self.play(FadeIn(l4[0], shift=UP * 0.15), Create(l4[1]), run_time=0.5)
        self.insister(cases[1], 1.3, 0.2)
        self.attendre_voix(marge=0.1)

        # ── 02 : la question : « X < 5 » ──
        self.dire("02-question")
        toi = self.grand("Et toi ?", font_size=48, color=JAUNE_TITRE).move_to(P(0, 3.4))
        self.au_mot("X strictement")
        l5 = self.ligne([("X < 5", ORANGE_RETENUE)], 56, -0.85, BOLD)
        self.play(ReplacementTransform(titre, toi), ReplacementTransform(l1, l5), FadeOut(VGroup(l4, lasso)),
                  *[c[0].animate.set_fill(ENTETE, 1) for c in cases[:2]],
                  *[c[1].animate.set_color(WHITE) for c in cases[:2]], cases[2].animate.set_opacity(1),
                  *[s.animate.set_fill(c, 1).set_stroke(ENCRE, 3) for s, c in zip(r.sect, r.couleurs)],
                  *[lb.animate.set_opacity(1) for lb in r.lab], run_time=0.6)
        self.insister(l5, 1.25, 0.2)
        self.au_mot("quelles valeurs")
        q = self.ligne([("Quelles valeurs ?", JAUNE_TITRE)], 40, -1.6)
        self.play(FadeIn(q, scale=1.4), *[Indicate(c, color=JAUNE_TITRE, scale_factor=1.15) for c in cases],
                  run_time=0.6)
        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.t("Réponds en", 33, VERT_OK, weight=BOLD), self.t("commentaire !", 33, VERT_OK, weight=BOLD))
        appel.arrange(DOWN, buff=0.06).move_to(P(0, 2.52))
        self.play(FadeOut(badge), FadeIn(appel, scale=0.7), run_time=0.4)
        self.play(appel.animate.scale(1.08), run_time=0.25)
        self.play(appel.animate.scale(1 / 1.08), run_time=0.25)
        self.attendre_voix(marge=1.5)


class ShortProbaVaNotationSTMG(ShortProbaVaNotationBase):
    identite = "Maths STMG — EleveAI"


class ShortProbaVaNotationPremiereSpe(ShortProbaVaNotationBase):
    identite = "Maths 1re spé — EleveAI"
