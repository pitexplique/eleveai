# proba_va_modeliser_short.py
# EleveAI — Maths 1re spé (micro va_modeliser) — short jumeau de « Modéliser
# une situation avec une variable aléatoire ». Ceinture ORANGE.
# Il AMUSE : un ticket à gratter à 2 € pour les tortues, tu grattes… 5 € !
# Tu as gagné 5 € ? Non : gain net 5 − 2 = 3 €. Et le gros lot de 20 € ?
#   · en HAUT le ticket qu'on gratte, les pièces de la mise qui s'envolent ;
#   · en BAS, EN MÊME TEMPS : mise 2 €, ticket 5 €, gain net = 5 − 2 = 3 € ;
#   · fin : le gros lot de 20 €, « ton gain net ? » « Réponds en commentaire ! »
#     puis « Entraîne-toi sur eleveai.fr » et « Abonne-toi ! ».
# Ti-Margo en bas (margo_bas).
#
# Voix : manim/voix/premiere-proba-va-modeliser-short.json (débit −6), calée
# mot à mot par proba_va_modeliser_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/premiere/proba_va_modeliser_short.py ShortProbaVaModeliser -o eleveai-maths-premiere-proba-va-modeliser-short --media_dir manim/scripts/premiere/media-va_modeliser-1s

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from proba_va_modeliser import MINUS, OR, MotsCales, P, Ticket, piece_euro, suite  # noqa: E402

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

LARGEUR_MAX = 4.0
BLEU_NB = "#60A5FA"


class ShortProbaVaModeliser(MotsCales, Short6e):
    fichier_marques = "proba_va_modeliser_short_marques.json"
    nom_voix = "premiere-proba-va-modeliser-short"
    identite = "Maths 1re spé — EleveAI"
    ceinture = "orange"

    def t(self, texte, font_size=30, color=WHITE, largeur=LARGEUR_MAX):
        t = Text(texte, font_size=font_size, color=color)
        if t.width > largeur:
            t.scale_to_fit_width(largeur)
        return t

    def cap(self, g, larg=LARGEUR_MAX):
        if g.width > larg:
            g.scale_to_fit_width(larg)
        return g

    def insister(self, mob, k=1.5, run_time=0.25):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)


    # les rangées du bas (les maths), sous le ticket
    R1, R2, R3, R4 = -0.4, -1.08, -1.82, -2.55

    def construct(self):
        self.margo_bas()

        # ── 00 : un ticket à 2 €, tu grattes : 5 € ! Tu as gagné 5 € ? ──
        self.dire("00-accroche")
        badge = echelle_ceintures(self.ceinture).scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.3))
        tk = Ticket("5 €", s=1.3).move_to(P(0, 1.0))
        titre = self.cap(suite(self.t("Ticket à", 44, JAUNE_TITRE), self.t("2 €", 56, ROUGE_ERREUR), buff=0.2))
        titre.move_to(P(0, 3.25))
        self.add(badge, tk, titre)
        self.au_mot("2 euros")
        mise = suite(self.t("mise :", 40), self.t("2 €", 48, ROUGE_ERREUR), buff=0.2).move_to(P(0, self.R1))
        self.play(FadeIn(mise, shift=UP * 0.15), self.insister_anim(titre[1]), run_time=0.5)
        self.au_mot("tortues")
        self.play(Indicate(tk.dessin, color=GREEN, scale_factor=1.5), run_time=0.6)
        self.au_mot("Tu grattes")
        self.play(tk.gratter(0.8))
        self.au_mot("5 euros !")
        rap = suite(self.t("ticket :", 40), self.t("5 €", 48, VERT_OK), buff=0.2).move_to(P(0, self.R2))
        self.play(FadeIn(rap, shift=UP * 0.15), Flash(tk.lot, color=OR, line_length=0.35, num_lines=12),
                  run_time=0.6)
        self.au_mot("Tu as gagné")
        q = self.cap(suite(self.t("Gagné", 50, JAUNE_TITRE), self.t("5 € ?", 56, VERT_OK), buff=0.2)).move_to(P(0, 3.25))
        self.play(FadeOut(titre, run_time=0.2), FadeIn(q, run_time=0.3))
        self.play(Wiggle(q), run_time=0.6)
        self.attendre_voix(marge=0.1)

        # ── 01 : Non ! gain net = 5 − 2 = 3 € ──
        self.dire("01-surprise")
        non = self.t("Non !", 66, ROUGE_ERREUR).move_to(P(0, 3.25))
        self.play(FadeOut(q, run_time=0.15), FadeIn(non, scale=1.5, run_time=0.3))
        self.au_mot("payé 2 euros")
        pieces = VGroup(piece_euro(0.8), piece_euro(0.8)).arrange(RIGHT, buff=0.1).move_to(tk.get_center())
        self.play(FadeIn(pieces, scale=1.6), self.insister_anim(mise[1]), run_time=0.4)
        self.play(pieces.animate.move_to(mise[1].get_center()).scale(0.5).set_opacity(0), run_time=0.6)
        self.au_mot("Gain net")
        gn = self.t("gain net =", 46, JAUNE_TITRE).move_to(P(0, self.R3))
        self.play(FadeIn(gn, shift=UP * 0.15), run_time=0.4)
        self.au_mot("5 moins 2")
        calc = suite(self.t("5", 62, VERT_OK), self.t(MINUS, 62), self.t("2", 62, ROUGE_ERREUR), self.t("=", 62),
                     self.t("3 €", 72, VERT_OK), buff=0.2)
        self.cap(calc).move_to(P(0, self.R4))
        self.play(TransformFromCopy(rap[1][0], calc[0]), FadeIn(calc[1]), TransformFromCopy(mise[1][0], calc[2]),
                  run_time=0.6)
        self.au_mot("3 euros")
        self.play(FadeIn(calc[3]), FadeIn(calc[4], scale=1.8), run_time=0.4)
        cad = SurroundingRectangle(calc[4], color=VERT_OK, buff=0.08, stroke_width=4)
        self.play(Create(cad), run_time=0.3)
        self.insister(VGroup(calc[4], cad), 1.3)
        self.attendre_voix(marge=0.1)

        # ── 02 : le gros lot de 20 € : ton gain net ? ──
        self.dire("02-question")
        self.au_mot("gros lot")
        tk2 = Ticket("20 €", s=1.3, fond=OR).move_to(P(0, 1.0))
        gros = self.t("Gros lot !", 60, OR).move_to(P(0, 3.25))
        self.play(FadeOut(VGroup(gn, calc, cad, rap[1]), run_time=0.3), FadeOut(non, run_time=0.2),
                  FadeOut(tk, shift=LEFT * 0.6), FadeIn(tk2, shift=LEFT * 0.6), run_time=0.5)
        self.play(FadeIn(gros, scale=1.4), run_time=0.3)
        self.au_mot("20 euros")
        rap2 = self.cap(suite(self.t("ticket :", 40), self.t("20 €", 48, VERT_OK), buff=0.2)).move_to(P(0, self.R2))
        vingt = rap2[1]
        self.play(tk2.gratter(0.5), run_time=0.5)
        self.play(Transform(rap[0], rap2[0]), FadeIn(vingt, scale=1.5),
                  Flash(tk2.lot, color=OR, line_length=0.35, num_lines=12), run_time=0.5)
        self.au_mot("ton gain net")
        q2 = self.cap(suite(self.t("gain net =", 46, JAUNE_TITRE), self.t("?", 68, ORANGE_RETENUE), buff=0.25))
        q2.move_to(P(0, self.R3 - 0.15))
        self.play(FadeIn(q2[0], shift=UP * 0.15), FadeIn(q2[1], scale=2.0), run_time=0.5)
        self.play(Wiggle(q2[1]), run_time=0.5)
        self.attendre_voix(marge=0.1)

        # ── 03 : Réponds en commentaire ! puis eleveai.fr et abonne-toi ──
        self.dire("03-fin")
        appel = VGroup(self.t("Réponds en", 54, VERT_OK), self.t("commentaire !", 54, VERT_OK)).arrange(DOWN, buff=0.06)
        self.cap(appel).move_to(P(0, -1.75))
        self.play(FadeOut(VGroup(mise, rap[0], vingt)), run_time=0.25)
        self.play(q2.animate.move_to(P(0, -0.5)), FadeIn(appel, scale=0.7), run_time=0.4)
        self.play(appel.animate.scale(1.1), run_time=0.25)
        self.play(appel.animate.scale(1 / 1.1), run_time=0.25)
        self.au_mot("Entraîne-toi")
        entraine = self.t("Entraîne-toi sur", 40, JAUNE_TITRE).move_to(P(0, 2.45))
        site = self.t("eleveai.fr", 56, BLEU_CALCUL).move_to(P(0, 1.6))
        cadre = SurroundingRectangle(site, color=BLEU_CALCUL, buff=0.2, stroke_width=3)
        self.play(FadeOut(VGroup(tk2, badge)), FadeIn(entraine, shift=DOWN * 0.1), run_time=0.4)
        self.au_mot("éleveai")
        self.play(GrowFromCenter(site), Create(cadre), run_time=0.5)
        self.au_mot("abonne-toi")
        abonne = self.t("Abonne-toi !", 44, VERT_OK).move_to(P(0, 0.55))
        self.play(FadeIn(abonne, scale=1.4), run_time=0.4)
        self.play(Flash(abonne, color=VERT_OK, line_length=0.3), run_time=0.5)
        self.attendre_voix(marge=0.8)

    def insister_anim(self, mob, k=1.4):
        """Agrandir puis rétrécir, en UNE animation (jouable avec d'autres)."""
        return mob.animate(rate_func=there_and_back).scale(k)
