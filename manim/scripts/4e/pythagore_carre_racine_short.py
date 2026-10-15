# pythagore_carre_racine_short.py
# EleveAI — Maths 4e — short jumeau de Pythagore, épisode 2 : le carré et la racine.
# CEINTURE BLANCHE : en HAUT la terrasse qu'on carrèle, rangée par rangée ; en
# BAS l'écriture qui se remplit AU MÊME RYTHME (4, 4 × 4, = 16, 4² = 16, √16 = 4).
# Carreaux ORANGE, côté BLEU, comme dans la paysage (FLaSgGr-lAA).
# Voix validée le 12/10 : manim/voix/4e-pythagore-carre-racine-short.json.
#
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/4e/pythagore_carre_racine_short.py ShortCarreRacine4e -o eleveai-maths-4e-pythagore-carre-racine-short --media_dir manim/scripts/4e/media
# Puis copier le mp4 dans manim/sorties/4e/maths/pythagore/02-carre-racine/.

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from pythagore_carre_racine import COTE, CARREAU, P, PythagoreCarreRacine4e  # noqa: E402  (pose les chemins)

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import ceinture  # noqa: E402


class ShortCarreRacine4e(Short6e):
    nom_voix = "4e-pythagore-carre-racine-short"

    # Les dessins de la paysage, repris tels quels (même carrelage, mêmes couleurs).
    t = PythagoreCarreRacine4e.t
    grille = PythagoreCarreRacine4e.grille
    carre_de = PythagoreCarreRacine4e.carre_de

    def construct(self):
        self.margo_bas()

        # ── 00 : titre, ceinture, question ──
        self.dire("00-accroche")
        titre = self.grand("Le carré", font_size=48, color=JAUNE_TITRE).move_to(P(0, 2.85))
        badge = VGroup(ceinture("#F5F5F5", 0.8).scale(0.7), self.grand("Ceinture blanche", font_size=22))
        badge.arrange(RIGHT, buff=0.18).move_to(P(0, 2.3))
        q = self.grand("Combien de carreaux ?", font_size=30, color=BLEU_CALCUL).move_to(P(0, 1.9))
        self.play(FadeIn(titre), FadeIn(badge), run_time=0.8)
        self.au_mot("Combien")
        self.play(FadeIn(q))
        self.attendre_voix(marge=0.2)

        # ── 01 : la terrasse en haut, l'écriture en bas ──
        self.dire("01-image")
        g = self.grille(4, t=0.38, centre=(0.25, 0.78))
        terrasse = SurroundingRectangle(g, color=GRAY_B, buff=0.08, stroke_width=3)
        self.au_mot("Une terrasse carrée")
        self.play(Create(terrasse))

        self.au_mot("4 carreaux sur un côté")
        self.play(LaggedStart(*[FadeIn(c, scale=0.6) for c in g.rangees[0]], lag_ratio=0.25))
        acc = Brace(g, LEFT, color=COTE, buff=0.12)
        quatre_h = self.t("4", 30, COTE).next_to(acc, LEFT, buff=0.08)
        y1, y2, y3 = -0.4, -1.1, -1.8
        quatre_b = self.t("4", 46, COTE)
        fois = self.t("× 4", 46, COTE)
        seize = self.t("= 16", 46, CARREAU)
        VGroup(quatre_b, fois, seize).arrange(RIGHT, buff=0.18).move_to(P(0, y1))
        self.play(FadeIn(acc), FadeIn(quatre_h), FadeIn(quatre_b))

        self.au_mot("4 rangées de 4")
        for k, r in enumerate(g.rangees[1:]):
            anims = [FadeIn(r, shift=DOWN * 0.2)]
            if k == 0:
                anims.append(FadeIn(fois))
            self.play(*anims, run_time=0.45)

        self.au_mot("16 carreaux")
        self.play(Indicate(g, color=CARREAU, scale_factor=1.05), FadeIn(seize))
        self.au_mot("4 au carré")
        ligne2 = VGroup(self.carre_de(4, 50, VERT_OK), self.t("= 16", 50, VERT_OK)).arrange(RIGHT, buff=0.3)
        self.play(Write(ligne2.move_to(P(0, y2))))
        self.play(Circumscribe(ligne2, color=VERT_OK))

        self.au_mot("Et à l'envers")
        self.play(Indicate(acc, color=COTE), Indicate(quatre_h, color=COTE, scale_factor=1.5))
        self.au_mot("C'est la racine carrée")
        ligne3 = VGroup(self.radical(16, font_size=50, color=COTE), self.t("= 4", 50, COTE)).arrange(RIGHT, buff=0.25)
        self.play(Write(ligne3.move_to(P(0, y3))))
        self.attendre_voix(marge=0.4)

        # ── 02 : la question ──
        self.clear()
        self.margo_bas()
        self.dire("02-question")
        self.play(Write(self.grand("À toi !", font_size=56, color=JAUNE_TITRE).move_to(P(0, 2.55))))
        self.au_mot("64 carreaux")
        g8 = self.grille(8, t=0.2, centre=(0.25, 0.95))
        self.play(LaggedStart(*[FadeIn(r) for r in g8.rangees], lag_ratio=0.15))
        self.play(FadeIn(self.grand("64 carreaux", font_size=34, color=CARREAU).move_to(P(0, -0.1))))
        self.au_mot("Combien de carreaux sur un côté")
        acc8 = Brace(g8, LEFT, color=COTE, buff=0.1)
        self.play(FadeIn(acc8), FadeIn(self.t("?", 36, COTE).next_to(acc8, LEFT, buff=0.08)))
        self.play(FadeIn(self.grand("Combien sur un côté ?", font_size=30).move_to(P(0, -0.8))))
        self.au_mot("Réponds en commentaire")
        rep = VGroup(self.grand("en commentaire !", font_size=36, color=VERT_OK),
                     self.grand("@eleveai974", font_size=36, color=BLEU_CALCUL)).arrange(DOWN, buff=0.14)
        self.play(FadeIn(rep.move_to(P(0, -1.8))))
        self.attendre_voix(marge=1.5)
