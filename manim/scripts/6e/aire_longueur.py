# aire_longueur.py
# EleveAI — Maths 6e — Les longueurs (notionId : aire_longueur)
# Mêmes exemples que la fiche lib/fiches/maths-6e-longueurs.tsx.
#
# Mapping micro-compétences (banque longueurs.bank.ts) → écrans :
# - aire_longueur_mesurer   → écran 1 (règle graduée, un crayon = 8 cm)
# - aire_longueur_unite     → écran 2 (le tableau km→mm, ×10 entre voisines)
# - aire_longueur_convertir → écran 3 (2,5 m posé dans le tableau → 250 cm)
# - aire_longueur_comparer  → écran 4 (2 m vs 150 cm : on convertit puis on compare, en barres)
# - aire_longueur_probleme  → défi + correction (ruban 2 m, on coupe 50 cm)
# - aire_longueur_defi      → défi (raisonnement sur l'unité) intégré à l'accueil/à-retenir
#
# Muet + texte : chaque écran s'explique seul. wait() généreux.
# Rendu : python -m manim render -qh manim/scripts/6e/aire_longueur.py AireLongueur6e -o eleveai-maths-6e-aire-longueur --media_dir manim/scripts/6e/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

import numpy as np
from manim import *

from charte import *
from mascotte import MascotteMargouillat

UNITES = ["km", "hm", "dam", "m", "dm", "cm", "mm"]


class AireLongueur6e(Scene):

    # ── outils communs ──────────────────────────────────────────────────────

    def add_mascotte(self, scale=0.5):
        m = MascotteMargouillat().scale(scale).to_corner(DOWN + RIGHT, buff=0.35)
        self.add(m)
        return m

    def titre_ecran(self, texte):
        t = Text(texte, font_size=40, color=JAUNE_TITRE).to_edge(UP)
        self.play(Write(t))
        return t

    def regle(self, xmin, xmax, y=-1.6, width=11.0):
        """Une règle graduée : ligne + petites graduations + nombres."""
        ligne = Line([-width / 2, y, 0], [width / 2, y, 0], color=WHITE, stroke_width=3)

        def x2p(v):
            return np.array([-width / 2 + (v - xmin) / (xmax - xmin) * width, y, 0])

        marks = VGroup()
        for v in range(xmin, xmax + 1):
            p = x2p(v)
            tick = Line(p + [0, 0.16, 0], p, color=WHITE, stroke_width=2)
            marks.add(tick)
            lab = Text(str(v), font_size=20, color=WHITE).next_to(p, DOWN, buff=0.12)
            marks.add(lab)
        return VGroup(ligne, marks), x2p

    def tableau(self, center=ORIGIN, cw=1.0, ch=0.95):
        """Tableau de conversion km→mm : en-têtes + cases vides. Renvoie (groupe, positions)."""
        entetes = VGroup()
        cases = VGroup()
        for i, u in enumerate(UNITES):
            x = (i - 3) * cw
            head = Rectangle(width=cw, height=0.6, color=BLEU_CALCUL, fill_opacity=0.2, stroke_width=2)
            head.move_to([x, ch * 0.5 + 0.3, 0])
            hl = Text(u, font_size=24, color=WHITE).move_to(head.get_center())
            entetes.add(head, hl)
            case = Rectangle(width=cw, height=ch, color=WHITE, stroke_width=2)
            case.move_to([x, -ch * 0.15, 0])
            cases.add(case)
        grp = VGroup(entetes, cases).move_to(center)
        pos = [cases[i].get_center() for i in range(len(UNITES))]
        return grp, cases, pos

    # ── écran 0 : accueil ───────────────────────────────────────────────────

    def ecran_accueil(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        titre = Text("Les longueurs", font_size=52, color=JAUNE_TITRE).to_edge(UP)
        sous = Text("Maths 6e — EleveAI", font_size=32, color=WHITE).next_to(titre, DOWN, buff=0.35)
        accroche = Text("mm, cm, m, km : quelle unité choisir ?", font_size=34, color=BLEU_CALCUL)
        accroche.next_to(sous, DOWN, buff=0.9)
        astuce = Text("Et comment passer de l'une à l'autre.", font_size=28, color=VERT_OK).next_to(accroche, DOWN, buff=0.5)
        self.play(Write(titre), FadeIn(sous, shift=0.3 * DOWN))
        self.play(Write(accroche))
        self.play(FadeIn(astuce, scale=1.2))
        self.wait(2.2)

    # ── écran 1 : mesurer avec la règle ─────────────────────────────────────

    def ecran_mesurer(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("1. Mesurer avec une règle graduée")

        grp, x2p = self.regle(0, 12)
        self.play(Create(grp[0]), FadeIn(grp[1], lag_ratio=0.03))
        self.wait(0.4)

        # un crayon posé de 0 à 8
        crayon = Line(x2p(0), x2p(8), color=ORANGE_RETENUE, stroke_width=10)
        crayon.shift(0.45 * UP)
        pointe = Triangle(color=ORANGE_RETENUE, fill_opacity=1).scale(0.12).rotate(-PI / 2).move_to(x2p(8) + 0.45 * UP)
        etiq = Text("un crayon", font_size=26, color=ORANGE_RETENUE).next_to(crayon, UP, buff=0.15)
        self.play(Create(crayon), FadeIn(pointe), FadeIn(etiq))
        self.wait(0.6)

        # on lit la graduation d'arrivée
        lecture = Text("Il s'arrête sur 8 : il mesure 8 cm.", font_size=30, color=VERT_OK).move_to([0, -2.6, 0])
        self.play(Indicate(grp[1][16], color=VERT_OK), Write(lecture))  # 8 : tick à l'index 2*8
        self.wait(1.2)

        note = Text("La bonne unité : cm pour un crayon, m pour une salle, km pour une route.",
                    font_size=24, color=WHITE).to_edge(DOWN, buff=0.25)
        self.play(Transform(lecture, note))
        self.wait(2.0)

    # ── écran 2 : le tableau des unités (×10) ───────────────────────────────

    def ecran_unites(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("2. Les unités, du km au mm")

        grp, cases, pos = self.tableau(center=[0, 0.2, 0])
        self.play(FadeIn(grp[0]), Create(grp[1], lag_ratio=0.1))
        self.wait(0.4)

        # flèches ×10 entre deux colonnes voisines
        fleche = CurvedArrow(pos[3] + [0.35, 0.7, 0], pos[4] + [-0.35, 0.7, 0], angle=-PI / 2, color=ORANGE_RETENUE, tip_length=0.18)
        lab = Text("× 10", font_size=26, color=ORANGE_RETENUE).next_to(fleche, UP, buff=0.05)
        note = Text("Chaque colonne vaut 10 fois sa voisine de droite.", font_size=28, color=WHITE).move_to([0, -2.0, 0])
        self.play(Create(fleche), Write(lab))
        self.play(FadeIn(note))
        self.wait(1.2)

        cles = Text("1 m = 100 cm       1 km = 1 000 m       1 cm = 10 mm", font_size=28, color=VERT_OK).move_to([0, -2.9, 0])
        self.play(Transform(note, cles))
        self.wait(2.2)

    # ── écran 3 : convertir 2,5 m en cm ─────────────────────────────────────

    def ecran_convertir(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("3. Convertir : 2,5 m en cm")

        grp, cases, pos = self.tableau(center=[0, 0.3, 0])
        self.play(FadeIn(grp[0]), Create(grp[1], lag_ratio=0.1))

        # on pose 2 dans m, 5 dans dm
        d2 = Text("2", font_size=40, color=BLEU_CALCUL).move_to(pos[3])
        d5 = Text("5", font_size=40, color=BLEU_CALCUL).move_to(pos[4])
        pose = Text("2,5 m : le 2 dans « m », le 5 dans « dm ».", font_size=28, color=WHITE).move_to([0, -1.9, 0])
        self.play(Write(d2), Write(d5), FadeIn(pose))
        self.wait(1.2)

        # pour lire en cm, on complète jusqu'à la colonne cm avec un 0
        z0 = Text("0", font_size=40, color=ORANGE_RETENUE).move_to(pos[5])
        cadre = SurroundingRectangle(cases[5], color=VERT_OK, buff=0.0)
        comp = Text("On complète jusqu'à « cm » avec un 0.", font_size=28, color=ORANGE_RETENUE).move_to([0, -1.9, 0])
        self.play(Write(z0), Transform(pose, comp), Create(cadre))
        self.wait(1.2)

        res = Text("2,5 m = 250 cm", font_size=42, color=VERT_OK).move_to([0, -2.8, 0])
        self.play(Write(res), Indicate(VGroup(d2, d5, z0), color=VERT_OK))
        self.wait(2.2)

    # ── écran 4 : comparer 2 m et 150 cm ────────────────────────────────────

    def ecran_comparer(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("4. Comparer : d'abord la même unité")

        q = Text("Le plus grand : 2 m ou 150 cm ?", font_size=36, color=BLEU_CALCUL).move_to([0, 2.0, 0])
        self.play(Write(q))
        self.wait(0.6)

        etape = Text("On convertit : 2 m = 200 cm.", font_size=30, color=ORANGE_RETENUE).move_to([0, 1.1, 0])
        self.play(FadeIn(etape))
        self.wait(0.8)

        # deux barres proportionnelles (échelle : 1 cm réel = 0.04 unité manim)
        k = 0.03
        b1 = Rectangle(width=200 * k, height=0.7, color=VERT_OK, fill_opacity=0.35).move_to([0, 0.1, 0])
        b1.align_to([-3.2, 0, 0], LEFT)
        l1 = Text("200 cm  (2 m)", font_size=26, color=VERT_OK).next_to(b1, RIGHT, buff=0.2)
        b2 = Rectangle(width=150 * k, height=0.7, color=BLEU_CALCUL, fill_opacity=0.35).move_to([0, -0.9, 0])
        b2.align_to([-3.2, 0, 0], LEFT)
        l2 = Text("150 cm", font_size=26, color=BLEU_CALCUL).next_to(b2, RIGHT, buff=0.2)
        self.play(GrowFromEdge(b1, LEFT), FadeIn(l1))
        self.play(GrowFromEdge(b2, LEFT), FadeIn(l2))
        self.wait(0.8)

        concl = Text("200 cm > 150 cm : 2 m est le plus grand.", font_size=30, color=VERT_OK).to_edge(DOWN, buff=0.6)
        self.play(Write(concl), Indicate(b1))
        self.wait(2.2)

    # ── écran 5 : défi (ruban) ──────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.6)
        titre = Text("À toi de jouer", font_size=46, color=JAUNE_TITRE).to_edge(UP)
        self.play(Write(titre))

        enonce = Text("Un ruban mesure 2 m. On en coupe 50 cm.", font_size=32, color=WHITE).move_to([0, 1.5, 0])
        self.play(FadeIn(enonce))

        k = 0.03
        ruban = Rectangle(width=200 * k, height=0.8, color=BLEU_CALCUL, fill_opacity=0.3).move_to([0, 0.1, 0])
        total = Text("2 m = 200 cm", font_size=26, color=WHITE).next_to(ruban, UP, buff=0.15)
        coupe = Rectangle(width=50 * k, height=0.8, color=ORANGE_RETENUE, fill_opacity=0.4)
        coupe.align_to(ruban, RIGHT).move_to(ruban.get_center() + [ (200 * k - 50 * k) / 2, 0, 0])
        lcoupe = Text("coupé 50 cm", font_size=24, color=ORANGE_RETENUE).next_to(coupe, DOWN, buff=0.15)
        self.play(Create(ruban), FadeIn(total))
        self.play(FadeIn(coupe), FadeIn(lcoupe))

        q = Text("Combien reste-t-il, en cm ?", font_size=34, color=BLEU_CALCUL).move_to([0, -1.6, 0])
        pause = Text("Mets pause et cherche !", font_size=30, color=ORANGE_RETENUE).to_edge(DOWN, buff=0.5)
        self.play(Write(q))
        self.play(FadeIn(pause, scale=1.2))
        self.wait(4.0)

    # ── écran 6 : correction ────────────────────────────────────────────────

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("Correction")

        e1 = Text("On met tout en cm : 2 m = 200 cm.", font_size=34, color=BLEU_CALCUL).move_to([0, 1.4, 0])
        self.play(Write(e1))
        self.wait(1.0)

        e2 = Text("On enlève ce qu'on coupe : 200 − 50 = 150.", font_size=34, color=WHITE).move_to([0, 0.3, 0])
        self.play(Write(e2))
        self.wait(1.0)

        conclusion = Text("Il reste 150 cm de ruban.", font_size=42, color=VERT_OK).to_edge(DOWN, buff=0.8)
        self.play(Write(conclusion))
        self.wait(2.2)

    # ── écran 7 : à retenir ─────────────────────────────────────────────────

    def ecran_conclusion(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        titre = Text("À retenir", font_size=46, color=JAUNE_TITRE).to_edge(UP)

        points = VGroup(
            Text("1. 1 km = 1 000 m ; 1 m = 100 cm ; 1 cm = 10 mm.", font_size=28),
            Text("2. D'une unité à sa voisine : × 10 ou ÷ 10.", font_size=28),
            Text("3. Pour comparer, on convertit d'abord dans la même unité.", font_size=28),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.5).move_to([0, 0.3, 0])

        signature = Text(SIGNATURE, font_size=26, color=VERT_OK).to_edge(DOWN)

        self.play(Write(titre))
        self.play(LaggedStart(*[Write(p) for p in points], lag_ratio=0.3))
        self.play(Write(signature))
        self.wait(2.5)

    # ── déroulé ─────────────────────────────────────────────────────────────

    def construct(self):
        self.ecran_accueil()
        self.ecran_mesurer()
        self.ecran_unites()
        self.ecran_convertir()
        self.ecran_comparer()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_conclusion()
