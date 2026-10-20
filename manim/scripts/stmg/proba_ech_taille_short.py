# proba_ech_taille_short.py
# EleveAI — Maths STMG — short jumeau de « La taille de l'échantillon »
# (micro va_ech_taille). CEINTURE JAUNE. Il AMUSE : deux fois plus précis…
# avec 800 personnes ? Non : 1 600 !
#   · en HAUT : le carré de 400 sondés ; un 2e carré arrive (800 ?), il est
#     barré, puis la foule devient 4 carrés (on VOIT le 2²) ; la bande de marge
#     rétrécit de moitié sur l'axe ;
#   · en BAS, EN MÊME TEMPS : « 400 personnes », « marge ÷ 2 », « 800
#     personnes ? » barré, « 1 600 ! », « 2² = 4 fois plus » ;
#   · fin : trois fois plus précis, la bande rétrécit d'un tiers, « ? » sur la
#     foule et « Réponds en commentaire ! ».
# Ti-Margo en bas (margo_bas). Aucun nom de personne ni de classe à l'écran.
#
# Voix : manim/voix/stmg-proba-ech-taille-short.json (débit −7).
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/proba_ech_taille_short.py ShortProbaEchTaille -o eleveai-maths-stmg-proba-ech-taille-short --media_dir manim/scripts/stmg/media-va_ech_taille
# Puis copier le mp4 dans manim/sorties/stmg/maths/probabilites/37-ech-taille/.

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from proba_ech_taille import NOUVEAU, AxeMarge, Bloc, P, accolade, cases  # noqa: E402  (pose les chemins)

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402
from proba_pc_conditionnelle import suite  # noqa: E402

LARGEUR_MAX = 4.1
CENTRE = P(0, 1.15)     # la foule (carré de 2,2)
TAILLE = 2.2


class ShortProbaEchTaille(Short6e):
    nom_voix = "stmg-proba-ech-taille-short"

    def t(self, texte, font_size=30, color=WHITE, largeur=LARGEUR_MAX):
        t = Text(texte, font_size=font_size, color=color)
        if t.width > largeur:
            t.scale_to_fit_width(largeur)
        return t

    def insister(self, mob, k=1.5, run_time=0.25):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def barrer(self, mob, sw=6):
        return Line(mob.get_left() + LEFT * 0.1, mob.get_right() + RIGHT * 0.1, color=ROUGE_ERREUR,
                    stroke_width=sw)

    def construct(self):
        self.margo_bas()

        # ── 00 : l'accroche : 400 personnes ; deux fois plus précis : 800 ? ──
        self.dire("00-accroche")
        titre = self.grand("Un sondage", font_size=46, color=JAUNE_TITRE).move_to(P(0, 3.4))
        badge = echelle_ceintures("jaune").scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.6))
        bloc = Bloc(1.8).move_to(CENTRE)
        axe = AxeMarge(cx=0, y=-0.5, long=4.1, u=32.0, mot=False)
        axe.remove(axe.p)
        axe.add(axe.p[0])           # en short : le trait de p, sans la lettre (place)
        b = axe.bande(0.05)
        self.play(Write(titre), FadeIn(badge, shift=DOWN * 0.2), FadeIn(bloc.cadre), FadeIn(axe), FadeIn(b),
                  run_time=0.7)
        self.au_mot("400 personnes")
        l1 = self.t("400 personnes", 34, BLEU_CALCUL).move_to(P(0, -1.5))
        self.play(LaggedStart(*[FadeIn(g, scale=0.3) for g in bloc.gens], lag_ratio=0.03),
                  FadeIn(l1, scale=1.4), run_time=0.9)
        self.au_mot("deux fois plus précis")
        l2 = suite(self.t("marge", 34), self.t("÷ 2", 38, JAUNE_TITRE), buff=0.2).move_to(P(0, -2.05))
        self.play(Transform(b, axe.bande(0.025)), FadeIn(l2, shift=UP * 0.15), run_time=0.8)
        self.au_mot("800 personnes")
        pts, cote = cases(2, CENTRE, TAILLE)
        deux = Bloc(cote, NOUVEAU).move_to(pts[1])
        l3 = self.t("800 personnes ?", 34, ORANGE_RETENUE).move_to(P(0, -2.6))
        self.play(bloc.animate.scale_to_fit_width(cote).move_to(pts[0]), run_time=0.4)
        self.play(FadeIn(deux, scale=0.4), FadeIn(l3, scale=0.6), run_time=0.5)
        self.play(Wiggle(l3), run_time=0.6)
        self.attendre_voix(marge=0.1)

        # ── 01 : non : 1 600 ! 2 au carré, 4 fois plus ──
        self.dire("01-image")
        self.au_mot("Non")
        croix = self.barrer(l3)
        self.play(Create(croix), l3.animate.set_opacity(0.5), FadeOut(badge), run_time=0.4)
        self.au_mot("1 600")
        neufs = [Bloc(cote, NOUVEAU).move_to(p) for p in pts[2:]]
        mille = self.t("1 600 !", 60, VERT_OK).move_to(P(0, -1.75))
        self.play(LaggedStart(*[FadeIn(x, scale=0.4) for x in neufs], lag_ratio=0.3),
                  FadeOut(VGroup(l1, l2, l3, croix)), run_time=0.6)
        self.play(FadeIn(mille, scale=0.5), run_time=0.35)
        self.insister(mille, 1.25)
        self.au_mot("diviser la marge par 2")
        l2b = suite(self.t("marge", 34), self.t("÷ 2", 38, JAUNE_TITRE), buff=0.2).move_to(P(0, -2.45))
        self.play(mille.animate.scale(0.75).move_to(P(0, 2.7)), FadeIn(l2b, shift=UP * 0.15),
                  Indicate(b, color=JAUNE_TITRE), run_time=0.5)
        self.au_mot("2 au carré")
        grille = VGroup(bloc, deux, *neufs)
        ag = accolade(grille, LEFT, "2", fs=30)
        k = [self.t("2²", 46, JAUNE_TITRE), self.t("=", 40), self.t("4 fois plus", 40, VERT_OK)]
        l4 = suite(*k, buff=0.2).move_to(P(0, -1.65))
        self.play(FadeIn(ag), FadeIn(k[0], scale=1.6), run_time=0.45)
        self.au_mot("4 fois plus")
        self.play(FadeIn(VGroup(*k[1:]), shift=LEFT * 0.15),
                  LaggedStart(*[Indicate(g, color=VERT_OK, scale_factor=1.1) for g in grille], lag_ratio=0.3),
                  run_time=1.0)
        self.insister(k[2], 1.15)
        self.attendre_voix(marge=0.1)

        # ── 02 : et toi : trois fois plus précis ? ──
        self.dire("02-question")
        toi = self.grand("Et toi ?", font_size=56, color=JAUNE_TITRE).move_to(P(0, 3.4))
        seul = Bloc(1.8).move_to(CENTRE)
        self.play(ReplacementTransform(titre, toi), FadeOut(VGroup(mille, l2b, l4, ag, *grille[1:])),
                  ReplacementTransform(bloc, seul), Transform(b, axe.bande(0.05)), run_time=0.6)
        self.au_mot("trois fois plus précis")
        l5 = self.t("trois fois plus précis", 38, BLEU_CALCUL).move_to(P(0, 2.6))
        self.play(FadeIn(l5, shift=DOWN * 0.15), Transform(b, axe.bande(0.05 / 3)), run_time=0.9)
        self.au_mot("combien de personnes")
        pts3, cote3 = cases(3, CENTRE, TAILLE)
        q = self.t("?", 110, ORANGE_RETENUE).move_to(CENTRE + P(0.35, -0.2))
        self.play(seul.animate.scale_to_fit_width(cote3).move_to(pts3[0]), run_time=0.4)
        self.play(FadeIn(q, scale=0.4), run_time=0.4)
        self.play(Wiggle(q), run_time=0.6)
        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.t("Réponds en", 46, VERT_OK), self.t("commentaire !", 46, VERT_OK)).arrange(DOWN, buff=0.1)
        appel.move_to(P(0, -1.95))
        self.play(FadeIn(appel, scale=0.7), run_time=0.4)
        self.play(appel.animate.scale(1.08), run_time=0.25)
        self.play(appel.animate.scale(1 / 1.08), run_time=0.25)
        self.attendre_voix(marge=1.5)
