# proba_equiprobabilite_short.py
# EleveAI — Maths 3e — short jumeau de Probabilités, épisode 3 : l'équiprobabilité.
# CEINTURE JAUNE : en HAUT la roue de la kermesse qui tourne et s'arrête plusieurs
# fois sur le rouge ; en BAS « 4 couleurs → 1/4 chacune ? » barré, puis
# « rouge : 1/2 ». Fin : la moitié restante partagée en 3 et la question.
# Même roue que la paysage (rouge 180°, bleu, vert, jaune 60° chacun).
# Voix : manim/voix/3e-proba-equiprobabilite-short.json (débit −7).
#
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/3e/proba_equiprobabilite_short.py ShortProbaEquiprobabilite3e -o eleveai-maths-3e-proba-equiprobabilite-short --media_dir manim/scripts/3e/media
# Puis copier le mp4 dans manim/sorties/3e/maths/probabilites/03-equiprobabilite/.

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from proba_equiprobabilite import (BLEU, JAUNE, ROUE_KERMESSE, ROUGE, VERT, P,  # noqa: E402
                                   aiguille, direction, roue, tourner)

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_bases import _Fractions  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402


class ShortProbaEquiprobabilite3e(Short6e, _Fractions):
    nom_voix = "3e-proba-equiprobabilite-short"

    def t(self, texte, font_size=34, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def borne(self, mob, marge=0.4):
        if mob.width > config.frame_width - marge:
            mob.scale_to_fit_width(config.frame_width - marge)
        return mob

    def barrer(self, mob, color=ROUGE_ERREUR):
        return Line(mob.get_corner(DL) + LEFT * 0.06, mob.get_corner(UR) + RIGHT * 0.06,
                    stroke_width=6, color=color)

    def construct(self):
        self.margo_bas()
        c = P(0, 0.62)
        r = 0.98

        # ── 00 ──
        self.dire("00-accroche")
        titre = self.grand("Tu paries ?", font_size=48, color=JAUNE_TITRE).move_to(P(0, 2.85))
        badge = echelle_ceintures("jaune").scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.25))
        sect, cont = roue(ROUE_KERMESSE, r, c)
        aig = aiguille(r, c)
        self.play(FadeIn(titre), FadeIn(badge), FadeIn(sect, scale=0.6), FadeIn(cont), run_time=0.8)
        self.add(aig)
        self.au_mot("4 couleurs")
        l1 = VGroup(self.t("4", 40, JAUNE_TITRE), self.t("couleurs", 40)).arrange(RIGHT, buff=0.15)
        l1.move_to(P(0, -0.75))
        self.play(FadeIn(l1, shift=UP * 0.15), tourner(aig, 20, 2, 1.4))
        self.au_mot("1 chance sur 4")
        f4 = self.fraction(1, 4, 44, BLEU_CALCUL)
        l2 = VGroup(self.t("→", 36), f4, self.t("chacune ?", 36, BLEU_CALCUL)).arrange(RIGHT, buff=0.2)
        self.borne(l2, 0.7).move_to(P(0, -1.65))
        self.play(FadeIn(l2, shift=UP * 0.15), run_time=0.5)
        self.play(f4.animate.scale(1.5), run_time=0.3)
        self.play(f4.animate.scale(1 / 1.5), run_time=0.3)
        self.attendre_voix(marge=0.1)

        # ── 01 ──
        self.dire("01-image")
        faux = VGroup(l1, l2)
        croix = VGroup(self.barrer(faux), Line(faux.get_corner(UL), faux.get_corner(DR),
                                               stroke_width=6, color=ROUGE_ERREUR))
        self.au_mot("Pas si")
        self.play(Create(croix), run_time=0.4)
        self.au_mot("la moitié")
        diam = Line(c + UP * (r + 0.1), c + DOWN * (r + 0.1), color=WHITE, stroke_width=7)
        v = direction(180) * 0.3
        self.play(Create(diam), sect[0].animate.shift(v), run_time=0.4)
        self.play(sect[0].animate.shift(-v), run_time=0.3)
        # les lancers : la flèche s'arrête sur le rouge, encore et encore
        tally = VGroup()
        pos_tally = [P(1.65, 1.25 - 0.42 * k) for k in range(4)]

        def marque(k):
            m = Dot(radius=0.14, color=ROUGE).move_to(pos_tally[k])
            tally.add(m)
            return FadeIn(m, scale=2.0)

        self.play(tourner(aig, 200, 2, 1.3))
        self.play(marque(0), Indicate(sect[0], color=ROUGE, scale_factor=1.04), run_time=0.4)
        self.au_mot("Le rouge a 1 chance sur 2")
        self.play(FadeOut(VGroup(faux, croix)), run_time=0.3)
        f2 = self.fraction(1, 2, 60, VERT_OK)
        bon = VGroup(self.t("rouge :", 46, ROUGE), f2).arrange(RIGHT, buff=0.3).move_to(P(0, -0.95))
        self.play(FadeIn(bon, shift=UP * 0.15), tourner(aig, 140, 2, 1.1))
        self.play(marque(1), f2.animate.scale(1.5), run_time=0.35)
        self.play(f2.animate.scale(1 / 1.5), run_time=0.35)
        self.au_mot("4 couleurs, mais")
        pm = self.borne(self.t("pas la même chance", 32, ORANGE_RETENUE)).move_to(P(0, -1.95))
        self.play(FadeIn(pm), tourner(aig, 235, 2, 1.1))
        self.play(marque(2), run_time=0.3)
        self.au_mot("pas équiprobable")
        pe = self.borne(self.t("pas équiprobable !", 36, ORANGE_RETENUE)).move_to(P(0, -1.95))
        self.play(ReplacementTransform(pm, pe), tourner(aig, 170, 2, 1.0))
        self.play(marque(3), run_time=0.3)
        self.attendre_voix(marge=0.2)

        # ── 02 ──
        self.dire("02-question")
        self.play(FadeOut(VGroup(bon, pe, tally, diam)), run_time=0.3)
        self.au_mot("Bleu, vert et jaune")
        for s, m in zip(sect[1:], [300, 0, 60]):
            w = direction(m) * 0.28
            self.play(s.animate.shift(w), run_time=0.25)
            self.play(s.animate.shift(-w), run_time=0.2)
        self.au_mot("à parts égales")
        rayons = VGroup(*[Line(c, c + direction(a) * r, color=WHITE, stroke_width=6) for a in (330, 30)])
        pe2 = VGroup(self.t("l'autre moitié", 30), self.t("en 3 parts égales", 30, BLEU_CALCUL)).arrange(DOWN, buff=0.1)
        self.borne(pe2).move_to(P(0, -0.85))
        self.play(Create(rayons), FadeIn(pe2), run_time=0.6)
        self.au_mot("Quelle chance pour le bleu")
        q = VGroup(self.t("bleu :", 50, BLEU), self.t("?", 60, BLEU_CALCUL)).arrange(RIGHT, buff=0.25)
        q.move_to(P(0, -0.6))
        self.play(FadeOut(pe2), FadeIn(q, scale=0.8), tourner(aig, 300, 1, 1.2))
        self.play(q[1].animate.scale(1.5), run_time=0.3)
        self.play(q[1].animate.scale(1 / 1.5), run_time=0.3)
        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.t("Réponds en", 46, VERT_OK), self.t("commentaire !", 46, VERT_OK)).arrange(DOWN, buff=0.12)
        self.borne(appel, 0.5)
        rep = VGroup(appel, self.grand("@eleveai974", font_size=32, color=BLEU_CALCUL)).arrange(DOWN, buff=0.12)
        self.play(FadeIn(rep.move_to(P(0, -1.75)), scale=0.8))
        self.attendre_voix(marge=1.5)
