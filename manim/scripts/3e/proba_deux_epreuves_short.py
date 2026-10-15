# proba_deux_epreuves_short.py
# EleveAI — Maths 3e — short jumeau des probabilités, épisode 7 : deux épreuves.
# CEINTURE JAUNE. Il AMUSE : en HAUT deux pièces qui tombent (et montrent chaque
# chemin quand la voix le nomme) ; en BAS, EN MÊME TEMPS, l'arbre aux 4 chemins
# qui se dessine ; « 1/2 ? » barré puis « 1/4 ». Fin : trois pièces et la question.
# Dessins repris de la paysage (proba_deux_epreuves.py) : pièces jaune/orange, arbre.
# Voix : manim/voix/3e-proba-deux-epreuves-short.json (débit −7).
#
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/3e/proba_deux_epreuves_short.py ShortProbaDeuxEpreuves3e -o eleveai-maths-3e-proba-deux-epreuves-short --media_dir manim/scripts/3e/media
# Puis copier le mp4 dans manim/sorties/3e/maths/probabilites/07-deux-epreuves/.

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from proba_deux_epreuves import Arbre, P, piece_fixe, piece_tournante  # noqa: E402  (pose les chemins)

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

LARGEUR_MAX = 4.1


class ShortProbaDeuxEpreuves3e(Short6e):
    nom_voix = "3e-proba-deux-epreuves-short"

    def t(self, texte, font_size=34, color=WHITE):
        t = Text(texte, font_size=font_size, color=color)
        if t.width > LARGEUR_MAX:
            t.scale_to_fit_width(LARGEUR_MAX)
        return t

    def insister(self, mob, k=1.5, run_time=0.3):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def barrer(self, mob, color=ROUGE_ERREUR):
        return Line(mob.get_corner(DL) + LEFT * 0.06, mob.get_corner(UR) + RIGHT * 0.06,
                    stroke_width=6, color=color)

    def poser(self, faces, xs, y, r):
        return VGroup(*[piece_fixe(f, r).move_to(P(x, y)) for f, x in zip(faces, xs)])

    def construct(self):
        self.margo_bas()

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        titre = self.grand("Deux fois pile ?", font_size=46, color=JAUNE_TITRE).move_to(P(0, 3.4))
        badge = echelle_ceintures("jaune").scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.72))
        xs, yp, r = [-0.8, 0.8], 1.5, 0.45
        ancres = [Dot(P(x, 2.0)).set_opacity(0) for x in xs]
        pieces = [piece_tournante(a, r, phase=0.6 * i) for i, a in enumerate(ancres)]
        self.add(*ancres, *pieces)
        self.play(FadeIn(titre), FadeIn(badge),
                  *[a.animate.move_to(P(x, yp)) for a, x in zip(ancres, xs)],
                  run_time=0.8, rate_func=rate_functions.ease_out_bounce)
        self.au_mot("deux fois pile")
        for p in pieces:
            p.clear_updaters()
        self.remove(*pieces)
        haut = self.poser("PP", xs, yp, r)
        self.add(haut)
        self.au_mot("1 chance sur 2")
        demi = self.grand("1/2 ?", font_size=80, color=BLEU_CALCUL).move_to(P(0, -0.5))
        self.play(FadeIn(demi, scale=0.6), run_time=0.4)
        self.insister(demi, 1.3, 0.25)
        self.attendre_voix(marge=0.1)

        # ── 01 : l'image ──
        self.dire("01-image")
        self.au_mot("Non !")
        barre = self.barrer(demi)
        self.play(Create(barre), run_time=0.3)
        faux = VGroup(demi, barre)
        self.play(faux.animate.scale(0.45).move_to(P(1.3, -1.95)), run_time=0.4)

        A = Arbre(P(-1.9, -0.55), dx=1.05, dy1=0.6, dy2=0.3, r=0.13, fs=16, lab_fs=26, x_lab=0.12,
                  epaisseur=3)
        self.au_mot("4 chemins")
        self.play(FadeIn(A.rac), Create(A.b1), FadeIn(A.q1), run_time=0.4)
        self.play(FadeIn(A.n1, scale=0.5), Create(A.b2), FadeIn(A.q2), run_time=0.5)
        self.play(FadeIn(A.n2, scale=0.5), run_time=0.3)
        for k, (ex, f) in enumerate(zip(["pile pile", "pile face", "face pile", "face face"],
                                        ["PP", "PF", "FP", "FF"])):
            self.au_mot(ex)
            neuf = self.poser(f, xs, yp, r)
            self.remove(haut)
            haut = neuf
            self.add(haut)
            self.play(FadeIn(A.chemins[k], shift=RIGHT * 0.15),
                      ShowPassingFlash(A.chemin(k).copy().set_stroke(WHITE, 8), time_width=0.6), run_time=0.35)

        self.au_mot("Un seul")
        autres = VGroup(*[A.b2[k] for k in (1, 2, 3)], A.b1[1], A.q1[1], *[A.q2[k] for k in (1, 2, 3)],
                        *[A.n2[k] for k in (1, 2, 3)], A.n1[1], *[A.chemins[k] for k in (1, 2, 3)])
        neuf = self.poser("PP", xs, yp, r)
        self.remove(haut)
        haut = neuf
        self.add(haut)
        self.play(autres.animate.set_opacity(0.25), A.chemin(0).animate.set_stroke(JAUNE_TITRE, 7), run_time=0.5)
        self.insister(A.chemins[0], 1.5, 0.25)

        self.au_mot("1 chance sur 4")
        quart = self.grand("1/4", font_size=72, color=VERT_OK).move_to(P(-0.6, -1.95))
        self.play(FadeIn(quart, scale=0.5), run_time=0.4)
        self.insister(quart, 1.4, 0.3)
        self.play(Create(SurroundingRectangle(quart, color=VERT_OK, buff=0.1)), Indicate(haut, color=WHITE),
                  run_time=0.5)
        self.attendre_voix(marge=0.3)

        # ── 02 : la question ──
        self.clear()
        self.margo_bas()
        self.dire("02-question")
        self.play(FadeIn(self.grand("À toi !", font_size=52, color=JAUNE_TITRE).move_to(P(0, 3.4))), run_time=0.4)
        xs3, y3, r3 = [-1.35, 0.0, 1.35], 2.2, 0.5
        self.au_mot("trois pièces")
        ancres = [Dot(P(x, y3)).set_opacity(0) for x in xs3]
        pieces = [piece_tournante(a, r3, phase=0.5 * i) for i, a in enumerate(ancres)]
        self.add(*ancres, *pieces)
        self.wait(0.8)
        self.au_mot("trois piles")
        for p in pieces:
            p.clear_updaters()
        self.remove(*pieces)
        trois = self.poser("PPP", xs3, y3, r3)
        self.add(trois)
        self.insister(trois, 1.15, 0.25)
        self.au_mot("1 chance sur combien")
        q = VGroup(self.t("1 chance sur", 40, BLEU_CALCUL), self.t("?", 64, JAUNE_TITRE)).arrange(RIGHT, buff=0.2)
        q.move_to(P(0, 0.9))
        self.play(FadeIn(q, scale=0.7), run_time=0.4)
        self.insister(q[1], 1.6, 0.3)
        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.grand("Réponds en", font_size=48, color=VERT_OK),
                       self.grand("commentaire !", font_size=48, color=VERT_OK)).arrange(DOWN, buff=0.14)
        if appel.width > config.frame_width - 0.5:
            appel.scale_to_fit_width(config.frame_width - 0.5)
        rep = VGroup(appel, self.grand("@eleveai974", font_size=34, color=BLEU_CALCUL)).arrange(DOWN, buff=0.18)
        self.play(FadeIn(rep.move_to(P(0, -0.85)), scale=0.8), run_time=0.5)
        self.insister(appel, 1.1, 0.3)
        self.attendre_voix(marge=1.5)
