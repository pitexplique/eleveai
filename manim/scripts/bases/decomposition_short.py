# decomposition_short.py
# EleveAI — « Les bases » — le short de la décomposition : 60 billes cassées jusqu'au bout.
#
# ⭐ 08/10/2026 — voix validée (« go ») : manim/voix/bases-decomposition-short.json (−7).
# On casse 60 en 2 groupes de 30, un 30 en 2 groupes de 15, un 15 en 3 groupes
# de 5 : chaque cassure dépose sa BRIQUE en bas de l'écran (2, 2, 3, 5).
# ⛔ Zone sûre : rien de vital au-dessus de y = +3,0 ni sous y = −2,2.
#
# Rendu :
#   python -m manim render -qh --disable_caching -r 1080,1920 manim/scripts/bases/decomposition_short.py ShortDecomposition -o eleveai-maths-bases-decomposition-short --media_dir manim/scripts/bases/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parent))

from manim import *

from charte import *
from decomposition import Decomposition
from multiplication_division_shorts import _ShortMultiplication
from nombres_premiers import _Billes


class ShortDecomposition(_Billes, _ShortMultiplication):

    nom_voix = "bases-decomposition-short"

    brique = Decomposition.brique
    insister = Decomposition.insister
    produit = Decomposition.produit

    def construct(self):
        # 60 billes : 10 rangées de 6. Elles restent à l'écran d'un plan à l'autre.
        g = self.jetons(10, 6, pas=0.36, rayon=0.13).move_to([0, 0.75, 0])
        billes = [[g[r][c] for c in range(6)] for r in range(10)]

        # 00 — ⭐ l'image de la première seconde : 60 billes, en grand
        self.ecran("00-accroche")
        titre = self.grand("60 billes", font_size=60, color=JAUNE_TITRE).move_to([0, 2.95, 0])
        self.add(titre, g)
        self.au_mot("Je les casse")
        q = self.grand("jusqu'au bout ?", font_size=44, color=ORANGE_RETENUE).move_to([0, -1.6, 0])
        self.play(GrowFromCenter(q))
        self.insister(q, 1.25)
        self.attendre_voix(marge=0.2)

        # 01 — casser : 2 × 30, puis 2 × 15, puis 3 × 5
        self.clear()
        self.margo_bas()
        self.dire("01-casser")
        self.add(g)
        mur = []  # les briques déposées en bas

        def deposer(p):
            b = self.brique(p, 0.8, 0.5, 30)
            b.move_to([-1.35 + len(mur) * 0.9, -1.75, 0])
            self.play(GrowFromCenter(b), run_time=0.35)
            self.insister(b, 1.35, 0.12)
            mur.append(b)

        self.au_mot("60, c'est 2 groupes de 30")
        f = self.grand("60 = 2 × 30", font_size=48).move_to([0, 2.95, 0])
        moities = [VGroup(*[b for r in range(5) for b in billes[r]]), VGroup(*[b for r in range(5, 10) for b in billes[r]])]
        cadres = VGroup(*[self.cadre(m, VERT_OK, buff=0.08) for m in moities])
        self.play(Write(f), Create(cadres))
        deposer(2)

        self.au_mot("30, c'est 2 groupes de 15")
        self.play(FadeOut(cadres), moities[1].animate.set_opacity(0.15))
        quinzes = [VGroup(*[billes[r][c] for r in range(5) for c in range(3)]),
                   VGroup(*[billes[r][c] for r in range(5) for c in range(3, 6)])]
        cadres = VGroup(*[self.cadre(m, VERT_OK, buff=0.08) for m in quinzes])
        self.play(Transform(f, self.grand("30 = 2 × 15", font_size=48).move_to(f)), Create(cadres))
        deposer(2)

        self.au_mot("15, c'est 3 groupes de 5")
        self.play(FadeOut(cadres), quinzes[1].animate.set_opacity(0.15))
        cinqs = [VGroup(*[billes[r][c] for r in range(5)]) for c in range(3)]
        cadres = VGroup(*[self.cadre(m, ORANGE_RETENUE, buff=0.07) for m in cinqs])
        self.play(Transform(f, self.grand("15 = 3 × 5", font_size=48).move_to(f)), Create(cadres))
        deposer(3)

        self.au_mot("Et 5 ne se casse plus")
        self.play(cinqs[1].animate.set_opacity(0.15), cinqs[2].animate.set_opacity(0.15), FadeOut(cadres[1:]))
        self.insister(cadres[0], 1.2)
        self.play(Transform(f, self.grand("5 est premier", font_size=48, color=VIOLET_ACCENT).move_to(f)))
        deposer(5)
        self.attendre_voix(marge=0.3)

        # 02 — les briques de 60
        self.ecran("02-briques")
        self.au_mot("60 égale 2 fois 2 fois 3 fois 5")
        res = self.produit([2, 2, 3, 5], 50, debut="60 =").move_to([0, 2.2, 0])
        if res.width > 4.1:
            res.scale_to_fit_width(4.1)
        self.play(Write(res))
        briques = VGroup(*[self.brique(p, 1.6, 0.8, 44) for p in (2, 2, 3, 5)]).arrange_in_grid(rows=2, cols=2, buff=0.2)
        briques.move_to([0, 0.4, 0])
        self.play(LaggedStart(*[GrowFromCenter(b) for b in briques], lag_ratio=0.2))
        self.au_mot("les briques")
        self.insister(briques, 1.12)
        self.play(FadeIn(VGroup(self.grand("les briques", font_size=40, color=JAUNE_TITRE),
                                self.grand("du nombre", font_size=40, color=JAUNE_TITRE)).arrange(DOWN, buff=0.1)
                         .move_to([0, -1.4, 0])))
        self.attendre_voix(marge=0.3)

        # 03 — le défi
        self.ecran("03-defi")
        self.play(Write(self.grand("À toi !", font_size=60, color=JAUNE_TITRE).move_to([0, 2.3, 0])))
        self.au_mot("décompose 36")
        d = self.grand("36 = ?", font_size=96, color=BLEU_CALCUL).move_to([0, 0.6, 0])
        self.play(GrowFromCenter(d))
        self.insister(d, 1.2)
        self.play(FadeIn(self.grand("en facteurs premiers", font_size=34).move_to([0, -0.8, 0])))
        self.attendre_voix(marge=1.5)

        # 04 — la fin
        self.fin("04-fin")
