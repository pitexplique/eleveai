# algo_programmation.py
# EleveAI — Maths 6e — Algorithmique et programmation (notionId : algo_programmation)
# Mêmes exemples que la fiche lib/fiches/maths-6e-algorithmique.tsx.
#
# Mapping micro-compétences (banque algorithmique.bank.ts) → écrans :
# - algo_sequence     → écran 1 (les blocs s'exécutent dans l'ordre)
# - algo_deplacement / algo_lire_programme → écran 2 (avancer 3, tourner, avancer 2)
# - algo_repetition   → écran 3 (répéter 4 fois : avancer 10 → 40 pas)
# - algo_figure       → écran 4 (répéter 4 fois : avancer + tourner 90° → un carré)
# - algo_defi         → défi (répéter 3 fois pour un carré ?) + correction
#
# Muet + texte : chaque écran s'explique seul. wait() généreux.
# Rendu : python -m manim render -qh manim/scripts/6e/algo_programmation.py AlgoProgrammation6e -o eleveai-maths-6e-algo-programmation --media_dir manim/scripts/6e/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

import numpy as np
from manim import *

from charte import *
from mascotte import MascotteMargouillat


class AlgoProgrammation6e(Scene):

    def add_mascotte(self, scale=0.5):
        m = MascotteMargouillat().scale(scale).to_corner(DOWN + RIGHT, buff=0.35)
        self.add(m)
        return m

    def titre_ecran(self, texte):
        t = Text(texte, font_size=38, color=JAUNE_TITRE).to_edge(UP)
        self.play(Write(t))
        return t

    def bloc(self, texte, couleur, w=3.6):
        r = RoundedRectangle(width=w, height=0.62, corner_radius=0.12, color=couleur, fill_color=couleur, fill_opacity=0.4, stroke_width=2)
        t = Text(texte, font_size=22, color=WHITE).move_to(r.get_center())
        return VGroup(r, t)

    def lutin(self, couleur=VERT_OK):
        # une petite flèche-tortue pointant vers la droite
        return Triangle(color=couleur, fill_color=couleur, fill_opacity=0.9, stroke_width=2).scale(0.22).rotate(-PI / 2)

    # ── écran 0 : accueil ───────────────────────────────────────────────────

    def ecran_accueil(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        titre = Text("Algorithmique et programmation", font_size=42, color=JAUNE_TITRE).to_edge(UP)
        sous = Text("Maths 6e — EleveAI", font_size=32, color=WHITE).next_to(titre, DOWN, buff=0.35)
        accroche = Text("Programmer : donner des ordres clairs.", font_size=32, color=BLEU_CALCUL)
        accroche.next_to(sous, DOWN, buff=0.9)
        astuce = Text("La machine fait exactement ce qu'on lui dit.", font_size=28, color=VERT_OK).next_to(accroche, DOWN, buff=0.5)
        self.play(Write(titre), FadeIn(sous, shift=0.3 * DOWN))
        self.play(Write(accroche))
        self.play(FadeIn(astuce, scale=1.15))
        self.wait(2.2)

    # ── écran 1 : une séquence ──────────────────────────────────────────────

    def ecran_sequence(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("1. Les blocs s'exécutent dans l'ordre")

        blocs = VGroup(
            self.bloc("quand ▶ est cliqué", ORANGE_RETENUE),
            self.bloc("avancer de 10", BLEU_CALCUL),
            self.bloc("tourner de 90°", VERT_OK),
            self.bloc("dire « Bonjour ! »", VIOLET_ACCENT),
        ).arrange(DOWN, buff=0.14).move_to([-2.2, 0.1, 0])

        fleche = Arrow(blocs[0].get_left() + [-0.6, 0, 0], blocs[-1].get_left() + [-0.6, 0, 0], color=WHITE, stroke_width=3, buff=0.1)
        sens = Text("de haut\nen bas", font_size=22, color=WHITE, line_spacing=0.9).next_to(fleche, LEFT, buff=0.15)

        for b in blocs:
            self.play(FadeIn(b, shift=0.2 * DOWN), run_time=0.45)
        self.play(Create(fleche), FadeIn(sens))

        note = Text("Si on change l'ordre, le résultat change.", font_size=26, color=ORANGE_RETENUE).move_to([3.2, 0.1, 0])
        self.play(FadeIn(note))
        self.wait(2.0)

    # ── écran 2 : exécuter un déplacement ───────────────────────────────────

    def ecran_deplacement(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("2. Exécuter pas à pas")

        # petite grille
        grid = VGroup()
        for i in range(7):
            grid.add(Line([-3.4 + i * 0.9, -2.0, 0], [-3.4 + i * 0.9, 1.4, 0], color=GREY, stroke_width=1))
        for j in range(5):
            grid.add(Line([-3.4, -2.0 + j * 0.85, 0], [1.9, -2.0 + j * 0.85, 0], color=GREY, stroke_width=1))
        self.play(Create(grid, lag_ratio=0.02), run_time=1.0)

        blocs = VGroup(
            self.bloc("avancer de 3", BLEU_CALCUL, w=3.0),
            self.bloc("tourner à droite", VERT_OK, w=3.0),
            self.bloc("avancer de 2", BLEU_CALCUL, w=3.0),
        ).arrange(DOWN, buff=0.16).move_to([4.2, 0.4, 0])
        self.play(FadeIn(blocs))

        start = np.array([-3.4 + 0.9, -2.0 + 3 * 0.85, 0])
        lut = self.lutin().move_to(start)
        self.play(FadeIn(lut))

        p1 = start + np.array([3 * 0.9, 0, 0])
        self.play(lut.animate.move_to(p1), Create(Line(start, p1, color=BLEU_CALCUL, stroke_width=5)), run_time=1.0)
        self.play(Rotate(lut, -PI / 2), run_time=0.5)
        p2 = p1 + np.array([0, -2 * 0.85, 0])
        self.play(lut.animate.move_to(p2), Create(Line(p1, p2, color=BLEU_CALCUL, stroke_width=5)), run_time=0.9)

        res = Text("Distance : 3 + 2 = 5 cases.", font_size=28, color=VERT_OK).to_edge(DOWN, buff=0.5)
        self.play(FadeIn(res))
        self.wait(2.0)

    # ── écran 3 : la répétition ─────────────────────────────────────────────

    def ecran_repetition(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("3. La répétition (la boucle)")

        boucle = self.bloc("répéter 4 fois", ORANGE_RETENUE, w=3.4).move_to([-3.4, 1.3, 0])
        dedans = self.bloc("avancer de 10", BLEU_CALCUL, w=2.8).move_to([-3.0, 0.55, 0])
        self.play(FadeIn(boucle), FadeIn(dedans))

        y = -1.0
        ligne = Line([-4.4, y, 0], [4.4, y, 0], color=WHITE, stroke_width=3)
        self.play(Create(ligne))

        lut = self.lutin().move_to([-4.4, y + 0.25, 0])
        self.play(FadeIn(lut))
        compteur = Text("0 pas", font_size=30, color=VERT_OK).move_to([0, 1.2, 0])
        self.play(FadeIn(compteur))
        for i in range(1, 5):
            xpos = -4.4 + i * 2.1
            nb = Text(f"{i} × 10 = {i * 10} pas", font_size=30, color=VERT_OK).move_to([2.4, 1.2, 0])
            self.play(lut.animate.move_to([xpos, y + 0.25, 0]), Transform(compteur, nb), run_time=0.7)

        res = Text("La boucle refait 4 fois : 4 × 10 = 40 pas.", font_size=28, color=WHITE).to_edge(DOWN, buff=0.5)
        self.play(FadeIn(res))
        self.wait(2.0)

    # ── écran 4 : tracer un carré ───────────────────────────────────────────

    def ecran_carre(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("4. Tracer un carré avec une boucle")

        boucle = VGroup(
            self.bloc("répéter 4 fois", ORANGE_RETENUE, w=3.2),
            self.bloc("avancer", BLEU_CALCUL, w=2.4),
            self.bloc("tourner de 90°", VERT_OK, w=2.4),
        ).arrange(DOWN, buff=0.14).move_to([3.4, 0.3, 0])
        self.play(FadeIn(boucle))

        L = 2.0
        start = np.array([-3.6, -1.4, 0])
        coins = [start, start + [L, 0, 0], start + [L, L, 0], start + [0, L, 0], start]
        lut = self.lutin().move_to(start)
        self.play(FadeIn(lut))
        for i in range(4):
            self.play(lut.animate.move_to(coins[i + 1]), Create(Line(coins[i], coins[i + 1], color=BLEU_CALCUL, stroke_width=5)), run_time=0.7)
            if i < 3:
                self.play(Rotate(lut, PI / 2), run_time=0.35)

        res = Text("4 côtés + 4 angles droits = un carré !", font_size=28, color=VERT_OK).to_edge(DOWN, buff=0.5)
        self.play(FadeIn(res))
        self.wait(2.0)

    # ── écran 5 : défi ──────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.6)
        titre = Text("À toi de jouer", font_size=46, color=JAUNE_TITRE).to_edge(UP)
        self.play(Write(titre))

        prog = VGroup(
            self.bloc("répéter 3 fois", ROUGE_ERREUR, w=3.4),
            self.bloc("avancer de 50", BLEU_CALCUL, w=2.8),
            self.bloc("tourner de 90°", VERT_OK, w=2.8),
        ).arrange(DOWN, buff=0.16).move_to([0, 0.6, 0])
        self.play(FadeIn(prog))

        q = Text("Ce programme trace-t-il un carré ?", font_size=32, color=BLEU_CALCUL).move_to([0, -1.6, 0])
        pause = Text("Mets pause et cherche !", font_size=28, color=ORANGE_RETENUE).to_edge(DOWN, buff=0.4)
        self.play(Write(q))
        self.play(FadeIn(pause, scale=1.15))
        self.wait(4.0)

    # ── écran 6 : correction ────────────────────────────────────────────────

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("Correction")

        e1 = Text("Un carré a 4 côtés.", font_size=34, color=BLEU_CALCUL).move_to([0, 1.3, 0])
        self.play(Write(e1))
        self.wait(0.7)

        e2 = Text("« répéter 3 fois » ne trace que 3 côtés : figure ouverte.", font_size=28, color=ROUGE_ERREUR).move_to([0, 0.2, 0])
        self.play(Write(e2))
        self.wait(0.7)

        conclusion = Text("Il faut « répéter 4 fois » pour fermer le carré.", font_size=32, color=VERT_OK).to_edge(DOWN, buff=0.9)
        self.play(Write(conclusion))
        self.wait(2.2)

    # ── écran 7 : à retenir ─────────────────────────────────────────────────

    def ecran_conclusion(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        titre = Text("À retenir", font_size=46, color=JAUNE_TITRE).to_edge(UP)

        points = VGroup(
            Text("1. Un algorithme = une suite d'instructions, dans l'ordre.", font_size=27),
            Text("2. On exécute pas à pas, de haut en bas.", font_size=27),
            Text("3. Une boucle « répéter … fois » raccourcit le programme.", font_size=27),
            Text("4. La machine fait exactement ce qu'on écrit.", font_size=27),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.42).move_to([0, 0.2, 0])

        signature = Text(SIGNATURE, font_size=26, color=VERT_OK).to_edge(DOWN)

        self.play(Write(titre))
        self.play(LaggedStart(*[Write(p) for p in points], lag_ratio=0.3))
        self.play(Write(signature))
        self.wait(2.5)

    def construct(self):
        self.ecran_accueil()
        self.ecran_sequence()
        self.ecran_deplacement()
        self.ecran_repetition()
        self.ecran_carre()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_conclusion()
