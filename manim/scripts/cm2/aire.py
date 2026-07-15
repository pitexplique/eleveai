# aire.py
# EleveAI — Maths CM2 — Les aires (notionId : aire)
# Mêmes exemples que la fiche lib/fiches/maths-cm2-aires.tsx.
# CM2 = texte brut, langage d'un enfant de ~10 ans. Muet + texte. VARIÉTÉ
# D'ANIMATIONS (carreaux qui se colorient, rectangle coupé en deux) + légendes distribuées.
#
# Mapping micro-compétences (banque aires.bank.ts) → écrans :
# - aire_comprendre        → écran 1 (comptage de carreaux, 4 × 3 = 12)
# - aire_carre_rectangle   → écran 2 (rectangle 4 × 3 = 12 cm²) + écran 3 (carré 5 → 25 cm²)
# - aire_triangle_rectangle→ écran 4 (moitié d'un rectangle 6 × 4 → 12 cm²)
# - aire_composer          → écran 5 (figure en L : 12 + 4 = 16)
# - aire_defi              → défi + correction (potager 6 m × 4 m → 24 m²)
#
# Rendu : python -m manim render -qh manim/scripts/cm2/aire.py AireCM2 -o eleveai-maths-cm2-aire --media_dir manim/scripts/cm2/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

import numpy as np
from manim import *

from charte import *
from mascotte import MascotteMargouillat


class AireCM2(Scene):

    def add_mascotte(self, scale=0.5):
        m = MascotteMargouillat().scale(scale).to_corner(DOWN + RIGHT, buff=0.35)
        self.add(m)
        return m

    def titre_ecran(self, texte):
        t = Text(texte, font_size=40, color=JAUNE_TITRE).to_edge(UP)
        self.play(Write(t))
        return t

    def grille(self, cols, rows, s=0.7, x=0.0, y=0.0, couleur=BLEU_CALCUL):
        """Une grille cols×rows de carreaux. Renvoie la liste des carrés (ligne par ligne)."""
        carres = VGroup()
        w, h = cols * s, rows * s
        x0, y0 = x - w / 2, y + h / 2
        for r in range(rows):
            for c in range(cols):
                sq = Square(side_length=s, stroke_width=2, color=WHITE)
                sq.move_to([x0 + s * (c + 0.5), y0 - s * (r + 0.5), 0])
                sq.set_fill(couleur, opacity=0.0)
                carres.add(sq)
        return carres

    # ── écran 0 : accueil ───────────────────────────────────────────────────

    def ecran_accueil(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        titre = Text("Les aires", font_size=54, color=JAUNE_TITRE).to_edge(UP)
        sous = Text("Maths CM2 — EleveAI", font_size=32, color=WHITE).next_to(titre, DOWN, buff=0.35)
        accroche = Text("Combien de place à l'intérieur ?", font_size=36, color=BLEU_CALCUL)
        accroche.next_to(sous, DOWN, buff=0.9)
        astuce = Text("L'aire = la surface. On compte les carreaux.", font_size=28, color=VERT_OK).next_to(accroche, DOWN, buff=0.5)
        self.play(Write(titre), FadeIn(sous, shift=0.3 * DOWN))
        self.play(GrowFromCenter(accroche))
        self.play(FadeIn(astuce, scale=1.2))
        self.wait(2.2)

    # ── écran 1 : comprendre (compter les carreaux) ────────────────────────

    def ecran_comprendre(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("1. L'aire, c'est la surface")

        carres = self.grille(4, 3, s=0.8, x=-1.6, y=0.3)
        self.play(Create(carres))
        self.wait(0.3)

        legende = Text("On compte les carreaux à l'intérieur.", font_size=28, color=WHITE).move_to([0, -2.3, 0])
        self.play(FadeIn(legende, shift=UP * 0.2))

        # on colorie et on compte un à un.
        compteur = Text("0", font_size=40, color=ORANGE_RETENUE).move_to([3.2, 0.3, 0])
        self.play(FadeIn(compteur))
        for i, sq in enumerate(carres, 1):
            nouveau = Text(str(i), font_size=40, color=ORANGE_RETENUE).move_to([3.2, 0.3, 0])
            self.play(sq.animate.set_fill(BLEU_CALCUL, opacity=0.8), Transform(compteur, nouveau), run_time=0.22)

        conclusion = Text("12 carreaux → aire = 12 (en cm² si le côté fait 1 cm)",
                          font_size=28, color=VERT_OK).to_edge(DOWN)
        self.play(Write(conclusion))
        self.wait(2.0)

    # ── écran 2 : le rectangle (4 × 3 = 12) ────────────────────────────────

    def ecran_rectangle(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("2. Le rectangle : A = L × l")

        carres = self.grille(4, 3, s=0.8, x=-2.0, y=0.2)
        self.play(Create(carres))
        self.play(LaggedStart(*[sq.animate.set_fill(BLEU_CALCUL, opacity=0.75) for sq in carres],
                              lag_ratio=0.04))
        lL = Text("L = 4", font_size=26, color=BLEU_CALCUL).move_to([-2.0, 1.6, 0])
        ll = Text("l = 3", font_size=26, color=ORANGE_RETENUE).move_to([-4.2, 0.2, 0])
        self.play(FadeIn(lL, shift=DOWN * 0.2), FadeIn(ll, shift=RIGHT * 0.2))
        self.wait(0.6)

        detail = Text("4 colonnes × 3 lignes", font_size=28, color=WHITE).move_to([3.0, 0.6, 0])
        calcul = Text("A = 4 × 3 = 12 cm²", font_size=38, color=VERT_OK).move_to([3.0, -0.4, 0])
        self.play(Write(detail))
        self.play(Write(calcul))
        self.wait(2.2)

    # ── écran 3 : le carré (5 × 5 = 25) ────────────────────────────────────

    def ecran_carre(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("3. Le carré : A = côté × côté")

        carres = self.grille(5, 5, s=0.62, x=-2.2, y=0.1, couleur=VERT_OK)
        self.play(Create(carres))
        self.play(LaggedStart(*[sq.animate.set_fill(VERT_OK, opacity=0.6) for sq in carres], lag_ratio=0.02))
        cote = Text("côté = 5", font_size=26, color=WHITE).next_to(carres, DOWN, buff=0.15)
        self.play(FadeIn(cote))
        self.wait(0.6)

        calcul = Text("A = 5 × 5 = 25 cm²", font_size=40, color=VERT_OK).move_to([3.0, 0.2, 0])
        self.play(Write(calcul))
        self.wait(2.2)

    # ── écran 4 : le triangle rectangle (moitié d'un rectangle) ────────────

    def ecran_triangle(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("4. Le triangle : la moitié d'un rectangle")

        # un rectangle 6 × 4, coupé en deux par la diagonale.
        r = Rectangle(width=3.6, height=2.4, color=BLEU_CALCUL, fill_opacity=0.12).move_to([-2.4, 0.1, 0])
        lb = Text("base 6", font_size=24, color=WHITE).next_to(r, DOWN, buff=0.12)
        lh = Text("hauteur 4", font_size=24, color=WHITE).next_to(r, LEFT, buff=0.12)
        self.play(Create(r), FadeIn(lb), FadeIn(lh))
        self.wait(0.4)

        # la diagonale + la moitié coloriée (triangle rectangle)
        coin_ur = r.get_corner(UR)
        coin_dl = r.get_corner(DL)
        coin_dr = r.get_corner(DR)
        diag = Line(coin_dl, coin_ur, color=ORANGE_RETENUE, stroke_width=6)
        demi = Polygon(coin_dl, coin_dr, coin_ur, color=VERT_OK, fill_color=VERT_OK, fill_opacity=0.5, stroke_width=3)
        self.play(Create(diag))
        self.play(FadeIn(demi))
        note = Text("le triangle = la moitié du rectangle", font_size=26, color=ORANGE_RETENUE).move_to([2.6, 1.2, 0])
        self.play(Write(note))
        self.wait(0.8)

        calc = Text("A = (6 × 4) ÷ 2", font_size=34, color=BLEU_CALCUL).move_to([2.6, 0.2, 0])
        res = Text("= 24 ÷ 2 = 12 cm²", font_size=38, color=VERT_OK).move_to([2.6, -0.8, 0])
        self.play(Write(calc))
        self.play(Write(res))
        self.wait(2.2)

    # ── écran 5 : figure en L (12 + 4 = 16) ────────────────────────────────

    def ecran_composer(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("5. Une figure compliquée : on découpe")

        # figure en L : un rectangle 4×3 + un carré 2×2.
        g1 = self.grille(4, 3, s=0.62, x=-2.4, y=0.7, couleur=BLEU_CALCUL)
        g2 = self.grille(2, 2, s=0.62, x=-3.65, y=-1.15, couleur=ORANGE_RETENUE)
        self.play(Create(g1), Create(g2))
        self.wait(0.3)

        self.play(LaggedStart(*[sq.animate.set_fill(BLEU_CALCUL, opacity=0.75) for sq in g1], lag_ratio=0.03))
        t1 = Text("rectangle 4 × 3 = 12", font_size=28, color=BLEU_CALCUL).move_to([2.6, 1.0, 0])
        self.play(Write(t1))
        self.play(LaggedStart(*[sq.animate.set_fill(ORANGE_RETENUE, opacity=0.8) for sq in g2], lag_ratio=0.06))
        t2 = Text("carré 2 × 2 = 4", font_size=28, color=ORANGE_RETENUE).move_to([2.6, 0.2, 0])
        self.play(Write(t2))
        self.wait(0.6)

        conclusion = Text("Aire = 12 + 4 = 16 carreaux", font_size=38, color=VERT_OK).to_edge(DOWN)
        self.play(Write(conclusion))
        self.wait(2.2)

    # ── écran 6 : défi (potager) ───────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.6)
        titre = Text("Défi", font_size=46, color=JAUNE_TITRE).to_edge(UP)
        self.play(GrowFromCenter(titre))

        r = Rectangle(width=4.2, height=2.6, color=VERT_OK, fill_color=VERT_OK, fill_opacity=0.15).move_to([0, 0.3, 0])
        lL = Text("6 m", font_size=26, color=WHITE).next_to(r, UP, buff=0.12)
        ll = Text("4 m", font_size=26, color=WHITE).next_to(r, LEFT, buff=0.12)
        q = Text("Quelle surface pour ce potager créole ?", font_size=32, color=BLEU_CALCUL).move_to([0, -2.0, 0])
        pause = Text("Mets pause et cherche !", font_size=30, color=ORANGE_RETENUE).to_edge(DOWN, buff=0.4)
        self.play(Create(r), FadeIn(lL), FadeIn(ll))
        self.play(Write(q))
        self.play(FadeIn(pause, scale=1.2))
        self.wait(4.0)

    # ── écran 7 : correction ───────────────────────────────────────────────

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("Correction")

        e1 = Text("La surface, c'est l'aire : A = L × l.", font_size=32, color=WHITE).move_to([0, 1.4, 0])
        self.play(FadeIn(e1, shift=DOWN * 0.2))
        self.wait(0.8)

        e2 = Text("A = 6 × 4", font_size=42, color=BLEU_CALCUL).move_to([0, 0.3, 0])
        self.play(Write(e2))
        self.wait(0.6)

        conclusion = Text("= 24 m²", font_size=48, color=VERT_OK).to_edge(DOWN)
        note = Text("en m² (des mètres carrés) : c'est une surface", font_size=26, color=ORANGE_RETENUE).move_to([0, -1.2, 0])
        self.play(Write(conclusion), FadeIn(note, shift=UP * 0.2))
        self.wait(2.4)

    # ── écran 8 : à retenir ─────────────────────────────────────────────────

    def ecran_conclusion(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        titre = Text("À retenir", font_size=46, color=JAUNE_TITRE).to_edge(UP)

        points = VGroup(
            Text("1. L'aire = la surface à l'intérieur. On compte les carreaux.", font_size=26),
            Text("2. Rectangle : A = L × l.   Carré : A = côté × côté.", font_size=26),
            Text("3. Triangle rectangle : (base × hauteur) ÷ 2.", font_size=26),
            Text("4. C'est une surface : en cm² ou m², jamais en cm.", font_size=26),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.42).move_to([0, 0.2, 0])

        signature = Text(SIGNATURE, font_size=26, color=VERT_OK).to_edge(DOWN)

        self.play(Write(titre))
        self.play(LaggedStart(*[FadeIn(p, shift=RIGHT * 0.3) for p in points], lag_ratio=0.3))
        self.play(Write(signature))
        self.wait(2.5)

    def construct(self):
        self.ecran_accueil()
        self.ecran_comprendre()
        self.ecran_rectangle()
        self.ecran_carre()
        self.ecran_triangle()
        self.ecran_composer()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_conclusion()


# ─── SCRIPT VOIX (optionnel — à lire au téléphone par-dessus la vidéo muette) ──
# Dire « top » quand le titre d'accueil apparaît (point de synchro Clipchamp).
# Ton simple, phrases courtes, on REDIT ce que l'écran montre.
#
# [Accueil ~0:00]    « Salut ! Les aires. L'aire, c'est la place à l'intérieur d'une
#                      figure. Pour la mesurer, on compte les carreaux. »
# [Écran 1 ~0:14]    « Regarde : on colorie et on compte les carreaux à l'intérieur.
#                      Un, deux, trois… douze carreaux. L'aire, c'est douze. »
# [Écran 2 ~0:34]    « Un rectangle de quatre sur trois : quatre colonnes, trois
#                      lignes. Au lieu de compter, on multiplie : quatre fois trois,
#                      douze centimètres carrés. »
# [Écran 3 ~0:52]    « Un carré de cinq. On multiplie le côté par lui-même : cinq
#                      fois cinq, vingt-cinq centimètres carrés. »
# [Écran 4 ~1:08]    « Un triangle rectangle, c'est la moitié d'un rectangle. Six
#                      fois quatre, vingt-quatre ; divisé par deux, douze centimètres
#                      carrés. »
# [Écran 5 ~1:26]    « Une figure compliquée ? On la découpe. Un rectangle de douze
#                      carreaux, un carré de quatre. Douze plus quatre, seize. »
# [Défi ~1:44]       « À toi ! Un potager de six mètres sur quatre. Quelle surface ?
#                      Mets pause. »
# [Correction ~2:02] « La surface, c'est l'aire : six fois quatre, vingt-quatre. En
#                      mètres carrés. »
# [À retenir ~2:18]  « On retient : l'aire, c'est la surface, on compte les carreaux.
#                      Rectangle, longueur fois largeur ; carré, côté fois côté. Et
#                      c'est en centimètres carrés. À bientôt ! »
