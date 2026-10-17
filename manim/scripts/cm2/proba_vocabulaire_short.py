# proba_vocabulaire_short.py
# EleveAI — Maths CM2 — short jumeau de la série « Probabilités », épisode 1 :
# « 1 chance sur 6 ». CEINTURE BLANCHE. Il AMUSE : « il faut faire 6 pour
# rejouer, tu as combien de chances ? »
#   · en HAUT le dé : il roule, puis devient la carte du COACH (les 6 faces en
#     grille 3 × 2, faces surlignées en ambre) ;
#   · en BAS, EN MÊME TEMPS : « 1 chance sur 6 », « 3 chances sur 6 », « 3 fois
#     plus ! » ;
#   · fin : « plus que 4 ? », « ? chances sur 6 », « Réponds en commentaire ! ».
# Ti-Margo en bas (margo_bas). Aucun nom de personne à l'écran.
#
# Voix : manim/voix/cm2-proba-vocabulaire-short.json (débit −10).
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/cm2/proba_vocabulaire_short.py ShortProbaVocabulaireCM2 -o eleveai-maths-cm2-proba-vocabulaire-short --media_dir manim/scripts/cm2/media
# Puis copier le mp4 dans manim/sorties/cm2/maths/probabilites/01-vocabulaire/.

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from proba_vocabulaire import P, carte_de, de, de_qui_roule, surligner  # noqa: E402  (pose les chemins)

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

LARGEUR_MAX = 4.1
HAUT = P(0, 0.5)  # le dessin


class ShortProbaVocabulaireCM2(Short6e):
    nom_voix = "cm2-proba-vocabulaire-short"

    def t(self, texte, font_size=30, color=WHITE, largeur=LARGEUR_MAX):
        t = Text(texte, font_size=font_size, color=color)
        if t.width > largeur:
            t.scale_to_fit_width(largeur)
        return t

    def ligne(self, morceaux, font_size=40, buff=0.15, largeur=LARGEUR_MAX):
        """Morceaux colorés d'UN SEUL Text (même ligne de base) ; g[i] = i-ème morceau."""
        T = Text(" ".join(m for m, _ in morceaux), font_size=font_size)
        tailles = [len(m.replace(" ", "")) for m, _ in morceaux]
        if len(T) != sum(tailles):
            g = VGroup(*[Text(m, font_size=font_size, color=c) for m, c in morceaux]).arrange(RIGHT, buff=buff)
        else:
            g, k = VGroup(), 0
            for (m, c), n in zip(morceaux, tailles):
                g.add(VGroup(*T[k:k + n]).set_color(c))
                k += n
        if g.width > largeur:
            g.scale_to_fit_width(largeur)
        return g

    def chances(self, a, b, font_size=40, couleur=JAUNE_TITRE, mot=None):
        mot = mot or ("chance" if a == 1 else "chances")
        return self.ligne([(str(a), couleur), (mot, WHITE), ("sur", WHITE), (str(b), couleur)], font_size)

    def insister(self, mob, k=1.5, run_time=0.25):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def badge(self):
        return echelle_ceintures("blanche").scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.3))

    def construct(self):
        self.margo_bas()

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        titre = self.grand("Faire 6 pour rejouer !", font_size=40, color=JAUNE_TITRE).move_to(P(0, 3.4))
        badge = self.badge()
        roule = de_qui_roule(HAUT, 1.7, periode=0.12)
        self.play(Write(titre), FadeIn(badge, shift=DOWN * 0.2), run_time=0.8)
        self.add(roule)
        self.au_mot("combien de chances")
        q = self.t("combien de chances ?", 40, ORANGE_RETENUE)
        q.move_to(P(0, -1.1))
        self.play(FadeIn(q, scale=0.5), run_time=0.35)
        self.insister(q, 1.25, 0.2)
        self.attendre_voix(marge=0.1)

        # ── 01 : la carte du coach ──
        self.dire("01-image")
        roule.clear_updaters()
        self.remove(roule)
        carte, faces = carte_de(0.88, 0.16)
        carte.move_to(HAUT)
        self.play(FadeOut(q, shift=DOWN * 0.3), FadeIn(carte, scale=0.6), run_time=0.4)
        self.au_mot("1 face sur 6")
        l1 = self.chances(1, 6, 42, mot="face").move_to(P(0, -0.95))
        self.play(*surligner(faces[5]), FadeIn(l1, shift=UP * 0.2), run_time=0.3)
        self.play(faces[5].animate.scale(1.3), run_time=0.2)
        self.play(faces[5].animate.scale(1 / 1.3), run_time=0.25)
        self.au_mot(": 1 chance sur 6")
        l1b = self.chances(1, 6, 42).move_to(l1)
        self.play(TransformMatchingShapes(l1, l1b), run_time=0.45)
        self.insister(l1b[0], 1.5, 0.2)

        self.au_mot("nombre pair")
        pair = self.t("nombre pair ?", 38, BLEU_CALCUL).move_to(P(0, -1.7))
        self.play(FadeIn(pair, scale=0.6), run_time=0.3)
        for ex, f in zip(["2,", "4,", ", 6"], (2, 4, 6)):
            self.au_mot(ex)
            if f != 6:
                self.play(*surligner(faces[f - 1]), run_time=0.15)
            self.play(faces[f - 1].animate.scale(1.3), run_time=0.18)
            self.play(faces[f - 1].animate.scale(1 / 1.3), run_time=0.15)
        self.au_mot(": 3 chances sur 6")
        l2 = self.chances(3, 6, 42, VERT_OK).move_to(P(0, -1.7))
        self.play(FadeOut(pair, scale=0.6), FadeIn(l2, scale=0.6), run_time=0.4)
        self.insister(l2[0], 1.5, 0.2)
        self.au_mot("3 fois plus")
        fois = self.grand("3 fois plus !", font_size=50, color=ORANGE_RETENUE).move_to(P(0, -2.5))
        sauts = [faces[f - 1] for f in (2, 4, 6)]
        self.play(FadeIn(fois, scale=0.4), *[s.animate.shift(UP * 0.25) for s in sauts], run_time=0.3)
        self.play(*[s.animate.shift(DOWN * 0.25) for s in sauts], run_time=0.25,
                  rate_func=rate_functions.ease_out_bounce)
        self.play(Wiggle(fois), run_time=0.6)
        self.attendre_voix(marge=0.2)

        # ── 02 : la question ──
        self.clear()
        self.margo_bas()
        self.dire("02-question")
        self.add(badge)
        toi = self.grand("Et toi ?", font_size=50, color=JAUNE_TITRE).move_to(P(0, 3.4))
        carte2, faces2 = carte_de(0.7, 0.14)
        carte2.move_to(P(0, 0.92))
        self.play(Write(toi), FadeIn(carte2, scale=0.7), run_time=0.5)
        self.au_mot("plus que 4")
        plus = self.ligne([("plus que", WHITE), ("4", JAUNE_TITRE), ("?", ORANGE_RETENUE)], 38).move_to(P(0, -0.3))
        self.play(FadeIn(plus, scale=0.6), Indicate(faces2[3], color=JAUNE_TITRE, scale_factor=1.25), run_time=0.45)
        self.au_mot("combien de chances sur 6")
        q2 = VGroup(self.t("combien de chances", 36),
                    self.ligne([("sur", WHITE), ("6", JAUNE_TITRE), ("?", WHITE)], 36)).arrange(DOWN, buff=0.1)
        q2.move_to(P(0, -1.0))
        self.play(FadeIn(q2, shift=UP * 0.2), run_time=0.35)
        self.insister(q2[1][1], 1.6, 0.2)
        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.grand("Réponds en", font_size=40, color=VERT_OK),
                       self.grand("commentaire !", font_size=40, color=VERT_OK)).arrange(DOWN, buff=0.1)
        appel.move_to(P(0, -2.05))
        self.play(FadeIn(appel, scale=0.7), run_time=0.4)
        self.insister(appel, 1.1, 0.25)
        poignee = Text("@eleveai974", font_size=22, color=BLEU_CALCUL).move_to(P(0, -2.86))
        self.play(GrowFromCenter(poignee), run_time=0.3)
        self.attendre_voix(marge=1.5)
