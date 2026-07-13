# volume_solide.py
# EleveAI — Maths 6e — Les volumes (notionId : volume_solide)
# Mêmes exemples que la fiche lib/fiches/maths-6e-volumes.tsx.
#
# Mapping micro-compétences (banque volumes.bank.ts) → écrans :
# - volume_unite      → écran 1 (le cube unité = 1 cm³ ; cm / cm² / cm³)
# - volume_compter    → écran 2 (pavé 3 couches de 5 cubes = 15, couche par couche)
# - volume_defi       → écran 3 (boîte 2×3×2 = 12) + défi cube 3 d'arête = 27
# - volume_comparer   → écran 4 (14 cubes vs 12 cubes)
# - volume_assemblage → écran 4 (18 + 12 = 30)
# - volume_lire       → à retenir
#
# Muet + texte : chaque écran s'explique seul. wait() généreux.
# Rendu : python -m manim render -qh manim/scripts/6e/volume_solide.py VolumeSolide6e -o eleveai-maths-6e-volume-solide --media_dir manim/scripts/6e/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

import numpy as np
from manim import *

from charte import *
from mascotte import MascotteMargouillat


class VolumeSolide6e(Scene):

    def add_mascotte(self, scale=0.5):
        m = MascotteMargouillat().scale(scale).to_corner(DOWN + RIGHT, buff=0.35)
        self.add(m)
        return m

    def titre_ecran(self, texte):
        t = Text(texte, font_size=40, color=JAUNE_TITRE).to_edge(UP)
        self.play(Write(t))
        return t

    def iso_cube(self, cx, cy, cz, s, origin, base=BLEU_CALCUL):
        """Un petit cube unité en perspective isométrique (3 faces ombrées)."""
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
        """Un pavé de nx×ny×nz cubes, groupés par couche (indice cz) pour l'animation."""
        couches = []
        for cz in range(nz):
            cubes = []
            for cy in range(ny):
                for cx in range(nx):
                    cubes.append((cx, cy, cz))
            cubes.sort(key=lambda c: (-c[1], c[0]))  # profondeur : le fond d'abord
            grp = VGroup(*[self.iso_cube(cx, cy, cz, s, origin, base) for (cx, cy, cz) in cubes])
            couches.append(grp)
        return couches

    # ── écran 0 : accueil ───────────────────────────────────────────────────

    def ecran_accueil(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        titre = Text("Les volumes", font_size=52, color=JAUNE_TITRE).to_edge(UP)
        sous = Text("Maths 6e — EleveAI", font_size=32, color=WHITE).next_to(titre, DOWN, buff=0.35)
        accroche = Text("Combien de place dans l'espace ?", font_size=34, color=BLEU_CALCUL)
        accroche.next_to(sous, DOWN, buff=0.9)
        astuce = Text("On compte les petits cubes (cm³).", font_size=28, color=VERT_OK).next_to(accroche, DOWN, buff=0.5)
        self.play(Write(titre), FadeIn(sous, shift=0.3 * DOWN))
        self.play(Write(accroche))
        self.play(FadeIn(astuce, scale=1.2))
        self.wait(2.2)

    # ── écran 1 : le cube unité ─────────────────────────────────────────────

    def ecran_unite(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("1. Le cube unité")

        cube = self.iso_cube(0, 0, 0, 1.6, origin=(-3.6, -0.8), base=BLEU_CALCUL)
        self.play(FadeIn(cube, scale=0.6))
        lab = Text("1 cm de côté\n= 1 cm³", font_size=30, color=VERT_OK, line_spacing=1.2).next_to(cube, RIGHT, buff=0.8)
        self.play(Write(lab))
        self.wait(1.0)

        note = VGroup(
            Text("cm  →  une longueur", font_size=26, color=WHITE),
            Text("cm²  →  une aire (surface)", font_size=26, color=WHITE),
            Text("cm³  →  un volume (3 dimensions)", font_size=26, color=VERT_OK),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.3).to_edge(DOWN, buff=0.7)
        self.play(LaggedStart(*[FadeIn(n, shift=0.2 * RIGHT) for n in note], lag_ratio=0.3))
        self.wait(2.0)

    # ── écran 2 : compter les cubes (3 couches de 5) ────────────────────────

    def ecran_compter(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("2. Compter les cubes, couche par couche")

        couches = self.pave(5, 1, 3, s=0.55, origin=(-4.2, -1.8))
        compteur = Text("0 cube", font_size=34, color=ORANGE_RETENUE).move_to([3.2, 1.2, 0])
        self.play(FadeIn(compteur))
        for i, couche in enumerate(couches, 1):
            nb = Text(f"{i} × 5 = {i * 5} cubes", font_size=34, color=ORANGE_RETENUE).move_to([3.2, 1.2, 0])
            self.play(FadeIn(couche, shift=0.3 * UP), Transform(compteur, nb), run_time=0.9)
            self.wait(0.4)

        res = Text("3 couches de 5 = 15 cubes", font_size=34, color=VERT_OK).move_to([3.2, -0.6, 0])
        self.play(Write(res))
        unite = Text("soit 15 cm³", font_size=30, color=VERT_OK).next_to(res, DOWN, buff=0.3)
        self.play(FadeIn(unite))
        self.wait(2.0)

    # ── écran 3 : la formule (boîte 2×3×2) ──────────────────────────────────

    def ecran_formule(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("3. Remplir une boîte : L × l × h")

        couches = self.pave(2, 3, 2, s=0.6, origin=(-3.6, -1.2))
        for couche in couches:
            self.play(FadeIn(couche, shift=0.25 * UP), run_time=0.7)

        dims = Text("2 × 3 × 2", font_size=40, color=BLEU_CALCUL).move_to([3.0, 0.8, 0])
        detail = Text("longueur × largeur × hauteur", font_size=24, color=WHITE).next_to(dims, DOWN, buff=0.25)
        self.play(Write(dims), FadeIn(detail))
        self.wait(0.8)

        res = Text("= 12 cubes = 12 cm³", font_size=38, color=VERT_OK).move_to([3.0, -1.0, 0])
        self.play(Write(res))
        self.wait(2.2)

    # ── écran 4 : comparer et assembler ─────────────────────────────────────

    def ecran_comparer(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("4. Comparer et assembler")

        c1 = Text("Comparer : même unité, on compare les nombres.", font_size=28, color=WHITE).move_to([0, 1.7, 0])
        self.play(FadeIn(c1))
        comp = Text("A = 14 cubes   >   B = 12 cubes", font_size=34, color=BLEU_CALCUL).move_to([0, 0.9, 0])
        self.play(Write(comp))
        petit = Text("A a 2 cubes de plus (14 − 12 = 2).", font_size=26, color=VERT_OK).move_to([0, 0.2, 0])
        self.play(FadeIn(petit))
        self.wait(1.2)

        c2 = Text("Assembler : on additionne les volumes.", font_size=28, color=WHITE).move_to([0, -0.9, 0])
        self.play(FadeIn(c2))
        asm = Text("18 cm³ + 12 cm³ = 30 cm³", font_size=34, color=VERT_OK).move_to([0, -1.7, 0])
        self.play(Write(asm))
        self.wait(2.2)

    # ── écran 5 : défi (cube de 3 d'arête) ──────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.6)
        titre = Text("À toi de jouer", font_size=46, color=JAUNE_TITRE).to_edge(UP)
        self.play(Write(titre))

        couches = self.pave(3, 3, 3, s=0.5, origin=(-1.7, -1.6), base=ORANGE_RETENUE)
        for couche in couches:
            self.play(FadeIn(couche, shift=0.2 * UP), run_time=0.6)

        q = Text("Un cube a 3 cm d'arête. Quel est son volume ?", font_size=32, color=BLEU_CALCUL).move_to([0, -2.2, 0])
        pause = Text("Mets pause et cherche !", font_size=30, color=ORANGE_RETENUE).to_edge(DOWN, buff=0.35)
        self.play(Write(q))
        self.play(FadeIn(pause, scale=1.2))
        self.wait(4.0)

    # ── écran 6 : correction ────────────────────────────────────────────────

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("Correction")

        e1 = Text("Un cube : arête × arête × arête.", font_size=34, color=BLEU_CALCUL).move_to([0, 1.3, 0])
        self.play(Write(e1))
        self.wait(0.8)

        e2 = Text("3 × 3 × 3 = 27", font_size=42, color=WHITE).move_to([0, 0.2, 0])
        self.play(Write(e2))
        self.wait(0.8)

        conclusion = Text("Le volume est 27 cm³.", font_size=40, color=VERT_OK).to_edge(DOWN, buff=0.9)
        self.play(Write(conclusion))
        self.wait(2.2)

    # ── écran 7 : à retenir ─────────────────────────────────────────────────

    def ecran_conclusion(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        titre = Text("À retenir", font_size=46, color=JAUNE_TITRE).to_edge(UP)

        points = VGroup(
            Text("1. Le volume = la place dans l'espace, en cm³ ou m³.", font_size=27),
            Text("2. On compte les cubes unités, couche par couche.", font_size=27),
            Text("3. Pavé : longueur × largeur × hauteur.", font_size=27),
            Text("4. On assemble = on additionne les volumes.", font_size=27),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.42).move_to([0, 0.2, 0])

        signature = Text(SIGNATURE, font_size=26, color=VERT_OK).to_edge(DOWN)

        self.play(Write(titre))
        self.play(LaggedStart(*[Write(p) for p in points], lag_ratio=0.3))
        self.play(Write(signature))
        self.wait(2.5)

    def construct(self):
        self.ecran_accueil()
        self.ecran_unite()
        self.ecran_compter()
        self.ecran_formule()
        self.ecran_comparer()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_conclusion()
