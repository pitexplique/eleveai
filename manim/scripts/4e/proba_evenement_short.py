# proba_evenement_short.py
# EleveAI — Maths 4e — short jumeau de l'épisode 3 des probabilités : les
# événements (le contraire). CEINTURE BLANCHE. Il AMUSE : « le contraire de
# faire un 6, c'est faire un 1 ? » En HAUT le dé qui roule puis les 6 faces
# qui s'allument (6 en BLEU, les autres en ORANGE) ; en BAS, EN MÊME TEMPS,
# « contraire de « faire 6 » = 1, 2, 3, 4 ou 5 ». Fin : « faire plus de 3 » et
# « Réponds en commentaire ! ».
# Mêmes couleurs que la paysage (proba_evenement.py) : événement BLEU, contraire ORANGE.
# Voix : manim/voix/4e-proba-evenement-short.json (débit −7).
#
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/4e/proba_evenement_short.py ProbaEvenement4eShort -o eleveai-maths-4e-proba-evenement-short --media_dir manim/scripts/4e/media
# Puis copier le mp4 dans manim/sorties/4e/maths/probabilites/03-evenement/.

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from proba_evenement import COUL_EV, COUL_NON, P  # noqa: E402  (pose les chemins)

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402
from annonce_probabilites import de, de_qui_roule  # noqa: E402

LARGEUR_MAX = 3.7


class ProbaEvenement4eShort(Short6e):
    nom_voix = "4e-proba-evenement-short"

    def t(self, texte, font_size=34, color=WHITE, largeur=LARGEUR_MAX):
        t = Text(texte, font_size=font_size, color=color)
        if t.width > largeur:
            t.scale_to_fit_width(largeur)
        return t

    def ligne(self, morceaux, font_size=34, buff=0.14):
        g = VGroup(*[Text(m, font_size=font_size, color=c) for m, c in morceaux]).arrange(RIGHT, buff=buff)
        if g.width > LARGEUR_MAX:
            g.scale_to_fit_width(LARGEUR_MAX)
        return g

    def insister(self, mob, k=1.4, run_time=0.3):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def barrer(self, mob, color=ROUGE_ERREUR):
        return Line(mob.get_corner(DL) + LEFT * 0.06, mob.get_corner(UR) + RIGHT * 0.06,
                    stroke_width=6, color=color)

    def cadre(self, mob, couleur):
        return SurroundingRectangle(mob, color=couleur, buff=0.06, stroke_width=6, corner_radius=0.1)

    def construct(self):
        self.margo_bas()

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        titre = self.grand("6 ou 1 ?", font_size=50, color=JAUNE_TITRE).move_to(P(0, 3.25))
        badge = echelle_ceintures("blanche").scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.3))
        self.play(FadeIn(titre), FadeIn(badge), run_time=0.6)
        roule = de_qui_roule(P(0, 1.1), 1.3)
        self.add(roule)
        self.au_mot("le contraire de")
        l1 = self.ligne([("contraire de", WHITE), ("« faire 6 »", COUL_EV)], 34).move_to(P(0, -0.35))
        self.play(FadeIn(l1[0]), run_time=0.3)
        self.au_mot("« faire un 6 »")
        roule.clear_updaters()
        self.remove(roule)
        d6 = de(6, 1.3).move_to(P(0, 1.1))
        self.add(d6)
        self.play(FadeIn(l1[1], scale=0.7), d6.animate.move_to(P(-1.0, 1.1)), run_time=0.5)
        self.au_mot("« faire un 1 »")
        fl = Arrow(P(-0.25, 1.1), P(0.3, 1.1), buff=0, color=WHITE, stroke_width=6)
        d1 = de(1, 1.3).move_to(P(1.05, 1.1))
        l2 = self.ligne([("=", WHITE), ("« faire 1 » ?", ROUGE_ERREUR)], 38).move_to(P(0, -1.05))
        self.play(GrowArrow(fl), FadeIn(d1, scale=0.5), Write(l2), run_time=0.6)
        self.insister(d1, 1.3)
        self.attendre_voix(marge=0.2)

        # ── 01 : l'image ──
        self.dire("01-image")
        non = self.grand("Non !", font_size=80, color=ROUGE_ERREUR).move_to(P(0, 1.1))
        barre = self.barrer(l2)
        self.play(FadeOut(VGroup(d6, d1, fl)), Create(barre), FadeIn(non, scale=0.5), run_time=0.4)
        self.insister(non, 1.3, 0.25)
        faces = VGroup(*[de(k, 0.6) for k in range(1, 7)]).arrange(RIGHT, buff=0.1).move_to(P(0, 1.15))
        self.au_mot("Le contraire de")
        self.play(FadeOut(non), LaggedStart(*[FadeIn(f, shift=DOWN * 0.3) for f in faces], lag_ratio=0.1),
                  FadeOut(VGroup(l2, barre)), run_time=0.7)
        c6 = self.cadre(faces[5], COUL_EV)
        self.play(Create(c6), run_time=0.3)
        self.au_mot("« ne pas faire un 6 »")
        l2b = self.ligne([("=", WHITE), ("« ne pas faire 6 »", COUL_NON)], 34).move_to(P(0, -1.0))
        self.play(Write(l2b), faces[5].animate.set_opacity(0.35), run_time=0.6)
        self.insister(l2b[1][3:6], 1.5)
        self.au_mot("1, 2")
        l3 = self.ligne([("=", WHITE), ("1, 2, 3, 4 ou 5", COUL_NON)], 40).move_to(P(0, -1.7))
        self.play(FadeIn(l3[0]), run_time=0.2)
        self.play(Write(l3[1]), LaggedStart(*[Create(self.cadre(f, COUL_NON)) for f in faces[:5]], lag_ratio=0.3),
                  run_time=1.6)
        self.au_mot("Toutes les autres")
        fin = self.t("toutes les autres faces !", 34, VERT_OK).move_to(P(0, -2.45))
        self.play(FadeIn(fin, scale=0.7), LaggedStart(*[f.animate(rate_func=there_and_back).shift(UP * 0.25)
                                                       for f in faces[:5]], lag_ratio=0.15), run_time=0.9)
        self.insister(fin, 1.15)
        self.attendre_voix(marge=0.3)

        # ── 02 : la question ──
        self.clear()
        self.margo_bas()
        self.dire("02-question")
        self.play(Write(self.grand("À toi !", font_size=56, color=JAUNE_TITRE).move_to(P(0, 2.7))), run_time=0.5)
        roule2 = de_qui_roule(P(0, 1.45), 1.2)
        self.add(roule2)
        self.au_mot("quel est le contraire")
        q1 = self.t("contraire de", 36).move_to(P(0, 0.25))
        self.play(FadeIn(q1), run_time=0.3)
        self.au_mot("« faire plus de 3 »")
        q2 = self.t("« faire plus de 3 » ?", 40, COUL_EV).move_to(P(0, -0.4))
        self.play(Write(q2), run_time=0.6)
        self.insister(q2, 1.15)
        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.t("Réponds en", 48, VERT_OK), self.t("commentaire !", 48, VERT_OK)).arrange(DOWN, buff=0.12)
        rep = VGroup(appel, self.grand("@eleveai974", font_size=32, color=BLEU_CALCUL))
        rep.arrange(DOWN, buff=0.14).move_to(P(0, -1.75))
        self.play(FadeIn(rep, scale=0.8), run_time=0.5)
        self.insister(appel, 1.12)
        self.attendre_voix(marge=1.5)
        roule2.clear_updaters()
