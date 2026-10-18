# proba6_frequence_comparer_short.py
# EleveAI — Maths 6e — short jumeau de la série « Probabilités », épisode 8 :
# ce qu'on observe, ce qu'on calcule. CEINTURE JAUNE. Il AMUSE : « 6 lancers,
# forcément un 6 ? »
#   · en HAUT le dé du coach qui roule ; chaque lancer tombe dans sa case ;
#   · en BAS, EN MÊME TEMPS, les 6 cases se remplissent… sans aucun 6 ;
#   · fin : 60 lancers dont 40 six (la grille du coach, six surlignés),
#     « ce dé est normal ? », « Réponds en commentaire ! ».
# Ti-Margo en bas (margo_bas). Aucun nom de personne à l'écran.
#
# Voix : manim/voix/6e-proba-frequence-comparer-short.json (Julie, débit −10).
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/6e/proba6_frequence_comparer_short.py ShortProba6FrequenceComparer -o eleveai-maths-6e-proba-frequence-comparer-short --media_dir manim/scripts/6e/media
# Puis copier le mp4 dans manim/sorties/6e/maths/probabilites/08-observe-calcule/.

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from proba6_frequence_comparer import (  # noqa: E402  (pose les chemins)
    P, allumer_six, de_coach, de_coach_qui_roule, grille_lancers, tirages)

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

LARGEUR_MAX = 4.1
FACES = [3, 1, 5, 2, 4, 1]
XS = [-1.7 + 0.68 * k for k in range(6)]
Y_CASES = -0.3
Y_DE = 1.05


class ShortProba6FrequenceComparer(Short6e):
    nom_voix = "6e-proba-frequence-comparer-short"

    def t(self, texte, font_size=30, color=WHITE, largeur=LARGEUR_MAX):
        t = Text(texte, font_size=font_size, color=color)
        if t.width > largeur:
            t.scale_to_fit_width(largeur)
        return t

    def insister(self, mob, k=1.5, run_time=0.25):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def badge(self):
        return echelle_ceintures("jaune").scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.3))

    def construct(self):
        self.margo_bas()

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        titre = self.grand("6 lancers de dé", font_size=46, color=JAUNE_TITRE).move_to(P(0, 3.4))
        badge = self.badge()
        roule = de_coach_qui_roule(P(0, Y_DE), 1.05, periode=0.12)
        cases = VGroup(*[RoundedRectangle(width=0.58, height=0.58, corner_radius=0.08, stroke_color=GREY_B,
                                          stroke_width=3).move_to(P(x, Y_CASES)) for x in XS])
        self.play(Write(titre), FadeIn(badge, shift=DOWN * 0.2),
                  LaggedStart(*[Create(c) for c in cases], lag_ratio=0.12), run_time=0.9)
        self.add(roule)
        self.au_mot("forcément un 6")
        q = self.t("Forcément un 6 ?", 40, ORANGE_RETENUE).move_to(P(0, -1.3))
        self.play(FadeIn(q, scale=0.5), run_time=0.35)
        self.insister(q, 1.2, 0.25)
        self.attendre_voix(marge=0.1)

        # ── 01 : non ! les 6 lancers tombent, aucun 6 ──
        self.dire("01-image")
        non = self.grand("Non !", font_size=72, color=VERT_OK).move_to(P(0, -1.3))
        self.play(ReplacementTransform(q, non), run_time=0.35)
        self.play(Wiggle(non), run_time=0.5)
        self.au_mot("1 chance sur 6")
        l1 = self.t("1 chance sur 6", 38, BLEU_CALCUL).move_to(P(0, -1.15))
        l2 = self.t("à chaque lancer", 30).move_to(P(0, -1.7))
        self.play(FadeOut(non, shift=UP * 0.3), FadeIn(l1, shift=UP * 0.2), run_time=0.35)
        self.play(FadeIn(l2, shift=UP * 0.15), run_time=0.3)
        self.au_mot("pas une promesse")
        l3 = self.t("pas une promesse !", 32, ORANGE_RETENUE).move_to(l2)
        self.play(ReplacementTransform(l2, l3), run_time=0.35)
        # les 6 lancers : le dé du haut lâche une face dans chaque case
        for f, x in zip(FACES, XS):
            d = de_coach(f, 0.5).move_to(P(0, Y_DE))
            self.add(d)
            self.play(d.animate.move_to(P(x, Y_CASES)), run_time=0.38, rate_func=rate_functions.ease_in_quad)
        self.au_mot("sans aucun 6")
        roule.clear_updaters()
        self.remove(roule)
        fige = de_coach(6, 1.05).move_to(P(0, Y_DE))
        croix = VGroup(Line(fige.get_corner(UL), fige.get_corner(DR)),
                       Line(fige.get_corner(UR), fige.get_corner(DL))).set_stroke(ROUGE_ERREUR, 8)
        aucun = self.grand("aucun 6 !", font_size=52, color=ROUGE_ERREUR).move_to(P(0, -1.4))
        self.add(fige)
        self.play(FadeOut(VGroup(l1, l3), shift=UP * 0.2), FadeIn(aucun, scale=0.5), Create(croix), run_time=0.45)
        self.insister(aucun, 1.1, 0.25)
        self.play(Indicate(cases, color=ROUGE_ERREUR, scale_factor=1.08), run_time=0.5)
        self.attendre_voix(marge=0.2)

        # ── 02 : la question ──
        self.clear()
        self.margo_bas()
        self.dire("02-question")
        self.add(badge)
        toi = self.grand("Et toi ?", font_size=52, color=JAUNE_TITRE).move_to(P(0, 3.4))
        self.play(Write(toi), run_time=0.4)
        self.au_mot("40 six sur 60 lancers")
        faces = tirages(60, 40, 21)
        grille = grille_lancers(faces, 0.3, 0.06).move_to(P(0, 0.75))
        lbl = self.t("40 six sur 60 lancers", 30).move_to(P(0, -0.5))
        lbl[:2].set_color(ROUGE_ERREUR)
        self.play(LaggedStart(*[FadeIn(d, scale=0.5) for d in grille], lag_ratio=0.015),
                  FadeIn(lbl, shift=UP * 0.15), run_time=1.0)
        self.play(*allumer_six(grille, faces), run_time=0.45)
        self.au_mot("ce dé est normal")
        q2 = self.t("Ce dé est normal ?", 34, ORANGE_RETENUE).move_to(P(0, -0.95))
        self.play(FadeIn(q2, shift=UP * 0.15), run_time=0.35)
        self.insister(q2, 1.15, 0.2)
        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.grand("Réponds en", font_size=40, color=VERT_OK),
                       self.grand("commentaire !", font_size=40, color=VERT_OK)).arrange(DOWN, buff=0.08)
        appel.move_to(P(0, -1.8))
        poignee = Text("@eleveai974", font_size=28, color=BLEU_CALCUL).move_to(P(0, -2.55))
        self.play(FadeIn(appel, scale=0.7), run_time=0.4)
        self.insister(appel, 1.06, 0.25)
        self.play(GrowFromCenter(poignee), run_time=0.3)
        self.attendre_voix(marge=1.5)
