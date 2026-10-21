# proba_va_definition_short.py
# EleveAI — Maths 1re spé (micro va_definition) — short jumeau de « Une
# variable aléatoire : une fonction définie sur l'univers ». Ceinture ORANGE.
# Il SURPREND : deux pièces, quatre issues… mais le nombre de piles ne prend
# que TROIS valeurs : deux flèches tombent sur le 1.
#   · en HAUT les deux pièces qui tournent, puis « Non ! », « 3 valeurs » ;
#   · en BAS, EN MÊME TEMPS : le diagramme en flèches Ω → ℝ qui se remplit
#     flèche par flèche (PP → 2, PF → 1, FP → 1, FF → 0) ;
#   · fin : trois pièces, huit issues : combien de valeurs ? « Réponds en
#     commentaire ! », puis la phrase de fin.
# Ti-Margo en bas (margo_bas). Les pièces tournent sans s'arrêter : aucun
# tirage n'est montré, seulement les quatre issues possibles.
#
# Voix : manim/voix/premiere-proba-va-definition-short.json (débit −6), calée
# mot à mot par proba_va_definition_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/premiere/proba_va_definition_short.py ShortProbaVaDefinitionPremiere -o eleveai-maths-premiere-proba-va-definition-short --media_dir manim/scripts/premiere/media-va_definition-1s

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from proba_va_definition import (  # noqa: E402  (pose les chemins)
    FLECHE, ISSUES, MEME, NB_PILES, MotsCales, P, Sagittal, issue, piece_qui_tourne,
)

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

LARGEUR_MAX = 4.1


def y_s(v):
    return -2.0 + 0.8 * v


class ShortProbaVaDefinitionPremiere(MotsCales, Short6e):
    fichier_marques = "proba_va_definition_short_marques.json"
    nom_voix = "premiere-proba-va-definition-short"
    identite = "Maths 1re spé — EleveAI"
    ceinture = "orange"

    def _marques(self):
        # MotsCales cherche les marques à côté de proba_bin_defi.py (terminale/) :
        # celles de cet épisode sont ici, dans premiere/ → calage mot à mot réel.
        if not hasattr(self, "_cache_marques"):
            import json
            ch = Path(__file__).resolve().parent / self.fichier_marques
            self._cache_marques = json.loads(ch.read_text(encoding="utf-8"))
        return self._cache_marques

    def t(self, texte, font_size=30, color=WHITE, largeur=LARGEUR_MAX):
        t = Text(texte, font_size=font_size, color=color)
        if t.width > largeur:
            t.scale_to_fit_width(largeur)
        return t

    def insister(self, mob, k=1.3, run_time=0.25):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def construct(self):
        self.margo_bas()

        # ── 00 : deux pièces, quatre issues… quatre valeurs ? ──
        self.dire("00-accroche")
        titre = self.grand("Deux pièces", font_size=44, color=JAUNE_TITRE).move_to(P(0, 3.4))
        badge = echelle_ceintures(self.ceinture).scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.3))
        p1 = piece_qui_tourne(P(-0.8, 1.3), r=0.45)
        p2 = piece_qui_tourne(P(0.8, 1.3), r=0.45, phase=0.7, vitesse=1.2)
        self.add(p1, p2)
        self.play(Write(titre), FadeIn(badge, shift=DOWN * 0.2), run_time=0.6)
        s = Sagittal(VGroup(*[issue(i, 0.26) for i in ISSUES]), y_s, centre_omega=P(-0.95, -1.05), x_axe=1.05,
                     haut=3.0, y_axe=(-2.4, 0.05), buff_objets=0.18)
        s.patate.stretch_to_fit_width(1.9)
        s.omega.scale(0.8).next_to(s.patate, UP, buff=0.02).align_to(s.patate, LEFT)
        s.reels.scale(0.8).next_to(s.axe, UP, buff=0.05)
        self.au_mot("quatre issues")
        self.play(FadeIn(s.patate), FadeIn(s.omega), LaggedStart(*[FadeIn(o, scale=0.5) for o in s.objets],
                                                                  lag_ratio=0.2), run_time=0.8)
        self.au_mot("quatre valeurs")
        q = self.t("4 valeurs ?", 40, ORANGE_RETENUE).move_to(P(0, 2.3))
        self.play(FadeOut(badge), FadeIn(q, scale=1.4), GrowArrow(s.axe), FadeIn(s.reels), run_time=0.5)
        self.attendre_voix(marge=0.1)

        # ── 01 : non ! trois valeurs seulement ──
        self.dire("01-surprise")
        self.au_mot("Non")
        non = self.grand("NON !", font_size=60, color=ROUGE_ERREUR).move_to(P(0, 2.3))
        p1.clear_updaters()
        p2.clear_updaters()
        self.play(FadeOut(q), FadeIn(non, scale=2), FadeOut(p1), FadeOut(p2), run_time=0.4)
        for k, (mot, v) in enumerate((("Pile pile, 2", 2), ("Pile face, 1", 1), ("Face pile, 1", 1),
                                      ("Face face, 0", 0))):
            self.au_mot(mot)
            fl = s.fleche(k, v, MEME if k in (1, 2) else FLECHE)
            anims = [s.objets[k].animate(rate_func=there_and_back).scale(1.3), GrowArrow(fl)]
            nouveaux = [fl]
            if v not in s.graduations:
                g = s.graduation(v, fs=40)
                anims.append(FadeIn(g, scale=1.6))
                nouveaux.append(g)
            self.play(*anims, run_time=0.45)
            s.add(*nouveaux)
        self.au_mot("Trois valeurs")
        trois = self.t("3 valeurs !", 52, VERT_OK).move_to(P(0, 1.25))
        self.play(FadeOut(non), FadeIn(trois, scale=1.6), *[s.fleches[k].animate.set_stroke(width=9) for k in (1, 2)],
                  run_time=0.5)
        self.play(*[Indicate(s.graduations[v][1], color=VERT_OK, scale_factor=1.5) for v in (0, 1, 2)], run_time=0.6)
        self.attendre_voix(marge=0.1)

        # ── 02 : et avec trois pièces ? ──
        self.dire("02-question")
        self.au_mot("trois pièces")
        titre2 = self.grand("Trois pièces ?", font_size=44, color=JAUNE_TITRE).move_to(P(0, 3.4))
        pieces = VGroup(*[piece_qui_tourne(P(x, 1.25), r=0.38, phase=0.5 * j, vitesse=1 + 0.15 * j)
                          for j, x in enumerate((-1.1, 0, 1.1))])
        self.play(FadeOut(trois), ReplacementTransform(titre, titre2), FadeOut(s), FadeOut(s.omega), FadeOut(s.reels), run_time=0.5)
        self.add(pieces)
        self.au_mot("huit issues")
        huit = self.t("8 issues", 44, WHITE).move_to(P(0, 0.2))
        self.play(FadeIn(huit, scale=1.4), run_time=0.4)
        self.au_mot("combien de valeurs")
        cb = self.t("combien de valeurs ?", 38, ORANGE_RETENUE).move_to(P(0, -0.6))
        pq = self.grand("?", font_size=110, color=ORANGE_RETENUE).move_to(P(0, -1.65))
        self.play(FadeIn(cb, shift=UP * 0.1), FadeIn(pq, scale=0.4), run_time=0.4)
        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.t("Réponds en", 40, VERT_OK), self.t("commentaire !", 40, VERT_OK))
        appel.arrange(DOWN, buff=0.06).move_to(P(0, 2.45))
        self.play(FadeIn(appel, scale=0.7), run_time=0.4)
        self.insister(appel, 1.08)
        self.attendre_voix(marge=0.3)

        # ── 03 : la fin ──
        self.dire("03-fin")
        for p in pieces:
            p.clear_updaters()
        self.play(FadeOut(VGroup(titre2, appel, pieces, huit, cb, pq)), run_time=0.4)
        entraine = self.t("Entraîne-toi sur", 36, JAUNE_TITRE).move_to(P(0, 2.2))
        site = self.t("eleveai.fr", 50, BLEU_CALCUL).move_to(P(0, 1.2))
        cadre = SurroundingRectangle(site, color=BLEU_CALCUL, buff=0.2, stroke_width=3)
        abonne = self.t("Abonne-toi !", 40, VERT_OK).move_to(P(0, -0.2))
        poignee = self.t("@eleveai974", 40, VERT_OK).move_to(P(0, -1.0))
        self.play(Write(entraine), run_time=0.5)
        self.au_mot("éleveai")
        self.play(GrowFromCenter(site), Create(cadre), run_time=0.5)
        self.au_mot("abonne-toi")
        self.play(FadeIn(abonne, shift=UP * 0.15), GrowFromCenter(poignee), run_time=0.5)
        self.play(Indicate(poignee, color=VERT_OK, scale_factor=1.15))
        self.attendre_voix(marge=1.0)


# 20/10 : la Tle SPÉ, même voix, ceinture ORANGE.
class ShortProbaVaDefinitionTerminale(ShortProbaVaDefinitionPremiere):
    identite = "Maths Tle spé — EleveAI"
    ceinture = "orange"
