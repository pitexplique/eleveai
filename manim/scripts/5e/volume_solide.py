# volume_solide.py
# EleveAI — Maths 5e — Les volumes (notionId : volume_solide)
# Mêmes exemples que la fiche lib/fiches/maths-5e-volumes.tsx.
# Primitive iso_cube/pave reprise de la vidéo 6e (cubes isométriques).
#
# Mapping micro-compétences (banque volumes.bank.ts) → écrans :
# - volume_comprendre / volume_assemblage → écran 1 (compter les cubes : 4×3×2 = 24)
# - volume_pave        → écran 2 (V = L × l × h = 6 × 4 × 3 = 72)
# - volume_prisme      → écran 3 (aire de base × hauteur = 120)
# - volume_cylindre    → écran 3 (aire de base × hauteur = 120)
# - volume_unite       → écran 4 (1 L = 1 dm³ = 1000 cm³)
# - volume_defi        → défi (pavé 5×3×2) + correction (30 cm³)
#
# Rendu : python -m manim render -qh manim/scripts/5e/volume_solide.py VolumeSolide5e -o eleveai-maths-5e-volume-solide --media_dir manim/scripts/5e/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

import numpy as np
from manim import *

from charte import *
from mascotte import MascotteMargouillat


class VolumeSolide5e(Scene):

    def add_mascotte(self, scale=0.5):
        m = MascotteMargouillat().scale(scale).to_corner(DOWN + RIGHT, buff=0.35)
        self.add(m)
        return m

    def titre_ecran(self, texte):
        t = Text(texte, font_size=40, color=JAUNE_TITRE).to_edge(UP)
        self.play(Write(t))
        return t

    def iso_cube(self, cx, cy, cz, s, origin, base=BLEU_CALCUL):
        ox, oy = origin
        px = ox + cx * s + cy * 0.5 * s
        py = oy + cz * s + cy * 0.5 * s
        A = [px, py, 0]
        B = [px + s, py, 0]
        C = [px + s, py + s, 0]
        D = [px, py + s, 0]
        Db = [px + 0.5 * s, py + 1.5 * s, 0]
        Cb = [px + 1.5 * s, py + 1.5 * s, 0]
        Bb = [px + 1.5 * s, py + 0.5 * s, 0]
        front = Polygon(A, B, C, D, stroke_color=WHITE, stroke_width=1.5, fill_color=base, fill_opacity=0.75)
        right = Polygon(B, C, Cb, Bb, stroke_color=WHITE, stroke_width=1.5, fill_color=base, fill_opacity=0.5)
        top = Polygon(D, C, Cb, Db, stroke_color=WHITE, stroke_width=1.5, fill_color=base, fill_opacity=1.0)
        return VGroup(front, right, top)

    def pave(self, nx, ny, nz, s=0.5, origin=(-4.0, -1.5), base=BLEU_CALCUL):
        couches = []
        for cz in range(nz):
            cubes = []
            for cy in range(ny):
                for cx in range(nx):
                    cubes.append((cx, cy, cz))
            cubes.sort(key=lambda c: (-c[1], c[0]))
            grp = VGroup(*[self.iso_cube(cx, cy, cz, s, origin, base) for (cx, cy, cz) in cubes])
            couches.append(grp)
        return couches

    # ── écran 0 : accueil ───────────────────────────────────────────────────

    def ecran_accueil(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        titre = Text("Les volumes", font_size=52, color=JAUNE_TITRE).to_edge(UP)
        sous = Text("Maths 5e — EleveAI", font_size=32, color=WHITE).next_to(titre, DOWN, buff=0.35)
        accroche = Text("Combien de place dans l'espace ?", font_size=34, color=BLEU_CALCUL)
        accroche.next_to(sous, DOWN, buff=0.9)
        astuce = Text("On compte les cubes (cm³). L'idée : aire de base × hauteur.", font_size=25, color=WHITE).next_to(accroche, DOWN, buff=0.5)
        self.play(Write(titre), FadeIn(sous, shift=0.3 * DOWN))
        self.play(Write(accroche))
        self.play(FadeIn(astuce, shift=UP * 0.2))
        self.wait(2.2)

    # ── écran 1 : compter les cubes (4×3×2 = 24) ────────────────────────────

    def ecran_compter(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("1. Compter les cubes")

        couches = self.pave(4, 3, 2, s=0.52, origin=(-3.6, -1.9))
        compteur = Text("0 cube", font_size=34, color=ORANGE_RETENUE).move_to([3.0, 1.4, 0])
        self.play(FadeIn(compteur))
        for i, couche in enumerate(couches, 1):
            nb = Text(f"couche {i} : {i} × 12 = {i * 12}", font_size=32, color=ORANGE_RETENUE).move_to([3.0, 1.4, 0])
            self.play(FadeIn(couche, shift=0.3 * UP), Transform(compteur, nb), run_time=1.0)
            self.wait(0.4)

        conclusion = Text("24 cubes de 1 cm³  →  Volume = 24 cm³", font_size=32, color=VERT_OK).to_edge(DOWN)
        self.play(Write(conclusion))
        self.wait(2.2)

    # ── écran 2 : le pavé droit (L × l × h) ─────────────────────────────────

    def ecran_pave(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("2. Le pavé droit")

        couches = self.pave(6, 4, 3, s=0.42, origin=(-4.0, -1.9))
        self.play(*[FadeIn(c) for c in couches], run_time=1.2)

        formule = Text("V = Longueur × largeur × hauteur", font_size=30, color=BLEU_CALCUL).move_to([1.2, 2.0, 0])
        self.play(Write(formule))
        self.wait(0.6)

        etape = Text("aire de base = 6 × 4 = 24 cm²", font_size=28, color=ORANGE_RETENUE).move_to([2.2, 0.9, 0])
        self.play(Write(etape))
        self.wait(0.6)

        conclusion = Text("V = 24 × 3 = 72 cm³", font_size=36, color=VERT_OK).to_edge(DOWN)
        self.play(Write(conclusion))
        self.wait(2.2)

    # ── écran 3 : prisme & cylindre (aire de base × hauteur) ────────────────

    def cylindre(self, center, r, h, color=BLEU_CALCUL):
        cx, cy = center
        top = Ellipse(width=2 * r, height=0.6 * r, color=WHITE, stroke_width=3).set_fill(color, 0.5).move_to([cx, cy + h / 2, 0])
        bot = Ellipse(width=2 * r, height=0.6 * r, color=WHITE, stroke_width=3).set_fill(color, 0.5).move_to([cx, cy - h / 2, 0])
        left = Line([cx - r, cy - h / 2, 0], [cx - r, cy + h / 2, 0], color=WHITE, stroke_width=3)
        right = Line([cx + r, cy - h / 2, 0], [cx + r, cy + h / 2, 0], color=WHITE, stroke_width=3)
        body = Rectangle(width=2 * r, height=h, stroke_width=0).set_fill(color, 0.3).move_to([cx, cy, 0])
        return VGroup(body, left, right, bot, top)

    def prisme(self, center, color=VERT_OK):
        cx, cy = center
        # prisme triangulaire (base triangle avant + arrière)
        A = [cx - 0.9, cy - 0.7, 0]; B = [cx + 0.9, cy - 0.7, 0]; C = [cx, cy + 0.7, 0]
        dx, dy = 0.7, 0.4
        Ab = [A[0] + dx, A[1] + dy, 0]; Bb = [B[0] + dx, B[1] + dy, 0]; Cb = [C[0] + dx, C[1] + dy, 0]
        front = Polygon(A, B, C, stroke_color=WHITE, stroke_width=3, fill_color=color, fill_opacity=0.6)
        back = Polygon(Ab, Bb, Cb, stroke_color=WHITE, stroke_width=2, fill_color=color, fill_opacity=0.3)
        edges = VGroup(Line(A, Ab, color=WHITE, stroke_width=2), Line(B, Bb, color=WHITE, stroke_width=2), Line(C, Cb, color=WHITE, stroke_width=2))
        return VGroup(back, edges, front)

    def ecran_prisme_cylindre(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("3. Prisme & cylindre")

        idee = Text("Même idée : aire de base × hauteur", font_size=32, color=ORANGE_RETENUE).move_to([0, 2.1, 0])
        self.play(Write(idee))

        pr = self.prisme((-3.3, 0.3))
        pr_t = Text("Prisme", font_size=26, color=VERT_OK).move_to([-3.3, -1.2, 0])
        pr_c = Text("15 × 8 = 120 cm³", font_size=26, color=VERT_OK).move_to([-3.3, -1.7, 0])
        self.play(Create(pr), FadeIn(pr_t), FadeIn(pr_c))
        self.wait(0.6)

        cy = self.cylindre((0.6, 0.3), r=0.9, h=1.8)
        cy_t = Text("Cylindre", font_size=26, color=BLEU_CALCUL).move_to([0.6, -1.2, 0])
        cy_c = Text("20 × 6 = 120 cm³", font_size=26, color=BLEU_CALCUL).move_to([0.6, -1.7, 0])
        self.play(Create(cy), FadeIn(cy_t), FadeIn(cy_c))
        self.wait(0.6)

        base = Text("On empile une base identique sur une hauteur.", font_size=26, color=WHITE).to_edge(DOWN)
        self.play(FadeIn(base))
        self.wait(2.0)

    # ── écran 4 : les unités (litre) ────────────────────────────────────────

    def ecran_unite(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("4. Les unités")

        lignes = VGroup(
            Text("cm  →  une longueur", font_size=30, color=WHITE),
            Text("cm²  →  une aire (surface)", font_size=30, color=WHITE),
            Text("cm³  →  un volume (3 dimensions)", font_size=30, color=VERT_OK),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.5).move_to([0, 0.9, 0])
        self.play(LaggedStart(*[FadeIn(l, shift=0.2 * RIGHT) for l in lignes], lag_ratio=0.3))
        self.wait(0.8)

        conv = Text("1 L  =  1 dm³  =  1000 cm³", font_size=40, color=ORANGE_RETENUE).to_edge(DOWN, buff=1.0)
        self.play(Write(conv))
        self.wait(2.2)

    # ── écran 5 : défi ──────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        titre = Text("Défi", font_size=46, color=JAUNE_TITRE).to_edge(UP)
        self.play(Write(titre))

        couches = self.pave(5, 3, 2, s=0.4, origin=(-2.6, -1.9))
        q = Text("Un pavé droit : 5 cm × 3 cm × 2 cm.", font_size=32, color=WHITE).move_to([0, 2.1, 0])
        q2 = Text("Quel est son volume ?", font_size=32, color=BLEU_CALCUL).move_to([0, 1.4, 0])
        self.play(Write(q), Write(q2))
        self.play(*[FadeIn(c) for c in couches], run_time=1.0)

        pause = Text("Mets pause et cherche !", font_size=30, color=ORANGE_RETENUE).to_edge(DOWN, buff=0.35)
        self.play(Write(pause))
        self.wait(4.0)

    # ── écran 6 : correction ────────────────────────────────────────────────

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("Correction")

        e1 = Text("On multiplie les 3 dimensions :", font_size=32, color=WHITE).move_to([0, 1.3, 0])
        self.play(Write(e1))
        self.wait(0.6)

        calc = Text("V = 5 × 3 × 2", font_size=40, color=BLEU_CALCUL).move_to([0, 0.2, 0])
        self.play(Write(calc))
        self.wait(0.6)

        conclusion = Text("= 30 cm³", font_size=44, color=VERT_OK).to_edge(DOWN, buff=1.0)
        self.play(Write(conclusion))
        self.wait(2.4)

    # ── écran 7 : à retenir ─────────────────────────────────────────────────

    def ecran_conclusion(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        titre = Text("À retenir", font_size=46, color=JAUNE_TITRE).to_edge(UP)

        points = VGroup(
            Text("1. Pavé droit : V = Longueur × largeur × hauteur.", font_size=26),
            Text("2. Prisme et cylindre : aire de base × hauteur.", font_size=26),
            Text("3. 1 L = 1 dm³ = 1000 cm³.", font_size=26),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.5).move_to([0, 0.3, 0])

        signature = Text(SIGNATURE, font_size=26, color=VERT_OK).to_edge(DOWN)

        self.play(Write(titre))
        self.play(LaggedStart(*[Write(p) for p in points], lag_ratio=0.3))
        self.play(Write(signature))
        self.wait(2.5)

    def construct(self):
        self.ecran_accueil()
        self.ecran_compter()
        self.ecran_pave()
        self.ecran_prisme_cylindre()
        self.ecran_unite()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_conclusion()


# ─── SCRIPT VOIX (optionnel — à lire au téléphone par-dessus la vidéo muette) ──
# Dire « top » quand le titre d'accueil apparaît (point de synchro Clipchamp).
#
# [Accueil ~0:00]   « Salut ! Les volumes. Combien de place occupe un solide ? On
#                     compte les cubes, en centimètres cubes. L'idée clé : aire de
#                     base fois hauteur. »
# [Écran 1 ~0:12]   « On compte couche par couche. Une couche, c'est 4 fois 3,
#                     douze cubes. Deux couches : 24 cubes. Le volume est 24
#                     centimètres cubes. »
# [Écran 2 ~0:34]   « Pour un pavé droit : longueur fois largeur fois hauteur.
#                     L'aire de base, c'est 6 fois 4, 24. Fois la hauteur 3 : 72
#                     centimètres cubes. »
# [Écran 3 ~0:54]   « Le prisme et le cylindre, c'est la même idée : aire de base
#                     fois hauteur. On empile une base identique sur une hauteur.
#                     15 fois 8, 120. 20 fois 6, 120 aussi. »
# [Écran 4 ~1:16]   « Attention aux unités : le centimètre pour une longueur, le
#                     centimètre carré pour une aire, le centimètre cube pour un
#                     volume. Et un litre, c'est un décimètre cube, soit mille
#                     centimètres cubes. »
# [Défi ~1:38]      « À toi ! Un pavé de 5 par 3 par 2. Quel est son volume ? Mets
#                     pause. »
# [Correction ~1:54] « On multiplie les trois dimensions : 5 fois 3 fois 2. Ça fait
#                     30 centimètres cubes. »
# [À retenir ~2:08] « On retient : le pavé, longueur fois largeur fois hauteur ; le
#                     prisme et le cylindre, aire de base fois hauteur ; et un litre
#                     égale mille centimètres cubes. À bientôt ! »
