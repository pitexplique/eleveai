# stat_donnee.py
# EleveAI — Maths 6e — Lire et interpréter des données (notionId : stat_donnee)
# Mêmes exemples que la fiche lib/fiches/maths-6e-donnees.tsx.
#
# Mapping micro-compétences (banque donnees.bank.ts) → écrans :
# - stat_donnee_lire_tableau / prelever → écran 1 (tableau : Natation × Filles = 6)
# - stat_donnee_lire_graphique / comparer → écran 2 (barres : Sport 16, écart 16−9=7)
# - stat_donnee_lire_circulaire → écran 3 (camembert : la moitié de 20 = 10)
# - stat_donnee_interpreter → écrans 2-3 (comparer avant de conclure)
# - stat_donnee_defi → défi (total du sondage : 8+12+5) + correction
#
# Muet + texte : chaque écran s'explique seul. wait() généreux.
# Rendu : python -m manim render -qh manim/scripts/6e/stat_donnee.py StatDonnee6e -o eleveai-maths-6e-stat-donnee --media_dir manim/scripts/6e/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

import numpy as np
from manim import *

from charte import *
from mascotte import MascotteMargouillat


class StatDonnee6e(Scene):

    def add_mascotte(self, scale=0.5):
        m = MascotteMargouillat().scale(scale).to_corner(DOWN + RIGHT, buff=0.35)
        self.add(m)
        return m

    def titre_ecran(self, texte):
        t = Text(texte, font_size=38, color=JAUNE_TITRE).to_edge(UP)
        self.play(Write(t))
        return t

    # ── écran 0 : accueil ───────────────────────────────────────────────────

    def ecran_accueil(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        titre = Text("Lire des données", font_size=50, color=JAUNE_TITRE).to_edge(UP)
        sous = Text("Maths 6e — EleveAI", font_size=32, color=WHITE).next_to(titre, DOWN, buff=0.35)
        accroche = Text("Tableau, graphique, camembert.", font_size=34, color=BLEU_CALCUL)
        accroche.next_to(sous, DOWN, buff=0.9)
        astuce = Text("On lit la vraie valeur, puis on compare.", font_size=28, color=VERT_OK).next_to(accroche, DOWN, buff=0.5)
        self.play(Write(titre), FadeIn(sous, shift=0.3 * DOWN))
        self.play(Write(accroche))
        self.play(FadeIn(astuce, scale=1.15))
        self.wait(2.2)

    # ── écran 1 : le tableau à double entrée ────────────────────────────────

    def ecran_tableau(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("1. Le tableau à double entrée")

        entetes = ["", "Filles", "Garçons"]
        lignes = [["Football", "5", "9"], ["Natation", "6", "7"], ["Danse", "8", "3"]]
        cw, ch = 2.0, 0.72
        x0, y0 = -3.0, 1.3
        cells = VGroup()
        pos = {}
        table_rows = [entetes] + lignes
        for r, row in enumerate(table_rows):
            for c, val in enumerate(row):
                x = x0 + c * cw
                y = y0 - r * ch
                rect = Rectangle(width=cw, height=ch, stroke_width=2, color=WHITE)
                rect.move_to([x, y, 0])
                col = JAUNE_TITRE if r == 0 or c == 0 else WHITE
                txt = Text(val, font_size=26, color=col).move_to([x, y, 0])
                cells.add(rect, txt)
                pos[(r, c)] = [x, y, 0]
        self.play(Create(cells, lag_ratio=0.02), run_time=1.8)
        self.wait(0.4)

        q = Text("Combien de filles ont choisi la natation ?", font_size=26, color=BLEU_CALCUL).move_to([0, -2.2, 0])
        self.play(FadeIn(q))
        self.wait(0.5)

        # on suit la ligne Natation et la colonne Filles
        cadre_natation = Rectangle(width=cw * 3, height=ch, color=ORANGE_RETENUE, stroke_width=4).move_to([x0 + cw, y0 - 2 * ch, 0])
        cadre_filles = Rectangle(width=cw, height=ch * 4, color=BLEU_CALCUL, stroke_width=4).move_to([x0 + cw, y0 - 1.5 * ch, 0])
        self.play(Create(cadre_natation))
        self.play(Create(cadre_filles))

        croix = SurroundingRectangle(Dot(pos[(2, 1)]), color=VERT_OK, buff=0.32)
        rep = Text("= 6 filles", font_size=32, color=VERT_OK).move_to([3.4, -2.2, 0])
        self.play(Create(croix), Write(rep))
        self.wait(2.2)

    # ── écran 2 : le graphique en barres ────────────────────────────────────

    def ecran_barres(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("2. Le graphique en barres")

        data = [("Sport", 16, VERT_OK), ("Lecture", 9, BLEU_CALCUL), ("Jeux", 12, ORANGE_RETENUE)]
        base_y = -1.8
        scale = 0.2
        x0 = -3.4
        bw = 1.3
        gap = 2.4
        axe = Line([x0 - 0.6, base_y, 0], [x0 + 2 * gap + 1.0, base_y, 0], color=WHITE, stroke_width=3)
        self.play(Create(axe))

        barres = VGroup()
        for i, (lab, val, col) in enumerate(data):
            x = x0 + i * gap
            h = val * scale
            bar = Rectangle(width=bw, height=h, color=col, fill_color=col, fill_opacity=0.5, stroke_width=2)
            bar.move_to([x, base_y + h / 2, 0])
            v = Text(str(val), font_size=26, color=col).next_to(bar, UP, buff=0.1)
            l = Text(lab, font_size=24, color=WHITE).next_to(bar, DOWN, buff=0.12)
            self.play(GrowFromEdge(bar, DOWN), FadeIn(v), FadeIn(l), run_time=0.6)
            barres.add(bar)

        pref = Text("Le plus haut : Sport (16) → activité préférée.", font_size=26, color=VERT_OK).move_to([0, 2.2, 0])
        self.play(FadeIn(pref), Indicate(barres[0]))
        ecart = Text("Écart avec la lecture : 16 − 9 = 7.", font_size=28, color=WHITE).to_edge(DOWN, buff=0.4)
        self.play(FadeIn(ecart))
        self.wait(2.2)

    # ── écran 3 : le diagramme circulaire ───────────────────────────────────

    def ecran_camembert(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("3. Le diagramme circulaire")

        centre = [-2.8, -0.1, 0]
        R = 1.9
        parts = [("Chien", 10, VERT_OK), ("Chat", 6, BLEU_CALCUL), ("Oiseau", 4, ORANGE_RETENUE)]
        total = 20
        start = 90 * DEGREES
        secteurs = VGroup()
        for lab, val, col in parts:
            ang = val / total * TAU
            sec = Sector(radius=R, start_angle=start, angle=-ang, color=col, fill_color=col, fill_opacity=0.6, stroke_color=WHITE, stroke_width=2)
            sec.move_arc_center_to(centre)
            mid = start - ang / 2
            lp = np.array(centre) + 1.25 * np.array([np.cos(mid), np.sin(mid), 0])
            lab_t = Text(f"{lab}\n{val}", font_size=20, color=WHITE, line_spacing=0.9).move_to(lp)
            secteurs.add(sec)
            self.play(FadeIn(sec), FadeIn(lab_t), run_time=0.6)
            start -= ang

        note = VGroup(
            Text("Chien = la moitié du disque.", font_size=28, color=VERT_OK),
            Text("La moitié de 20 : 20 ÷ 2 = 10.", font_size=28, color=WHITE),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.4).move_to([3.0, 0.0, 0])
        self.play(FadeIn(note))
        self.wait(2.2)

    # ── écran 4 : défi ──────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.6)
        titre = Text("À toi de jouer", font_size=46, color=JAUNE_TITRE).to_edge(UP)
        self.play(Write(titre))

        enonce = Text("Un sondage sur le trajet à l'école :", font_size=30, color=WHITE).move_to([0, 1.6, 0])
        self.play(FadeIn(enonce))

        items = VGroup(
            Text("À pied : 8", font_size=32, color=BLEU_CALCUL),
            Text("En bus : 12", font_size=32, color=VERT_OK),
            Text("En voiture : 5", font_size=32, color=ORANGE_RETENUE),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.4).move_to([0, 0.1, 0])
        self.play(LaggedStart(*[FadeIn(i, shift=0.2 * RIGHT) for i in items], lag_ratio=0.3))

        q = Text("Combien d'élèves ont répondu en tout ?", font_size=30, color=BLEU_CALCUL).move_to([0, -1.8, 0])
        pause = Text("Mets pause et cherche !", font_size=28, color=ORANGE_RETENUE).to_edge(DOWN, buff=0.35)
        self.play(Write(q))
        self.play(FadeIn(pause, scale=1.15))
        self.wait(4.0)

    # ── écran 5 : correction ────────────────────────────────────────────────

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("Correction")

        e1 = Text("Le total = la somme de toutes les catégories.", font_size=30, color=BLEU_CALCUL).move_to([0, 1.3, 0])
        self.play(Write(e1))
        self.wait(0.8)

        e2 = Text("8 + 12 + 5", font_size=44, color=WHITE).move_to([0, 0.2, 0])
        self.play(Write(e2))
        self.wait(0.6)

        conclusion = Text("= 25 élèves ont répondu.", font_size=40, color=VERT_OK).to_edge(DOWN, buff=0.9)
        self.play(Write(conclusion))
        self.wait(2.2)

    # ── écran 6 : à retenir ─────────────────────────────────────────────────

    def ecran_conclusion(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        titre = Text("À retenir", font_size=46, color=JAUNE_TITRE).to_edge(UP)

        points = VGroup(
            Text("1. On lit d'abord le titre et les légendes.", font_size=27),
            Text("2. Tableau : la valeur est au croisement ligne × colonne.", font_size=27),
            Text("3. Barres : la hauteur donne la valeur.", font_size=27),
            Text("4. Camembert : chaque secteur est une part du total.", font_size=27),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.42).move_to([0, 0.2, 0])

        signature = Text(SIGNATURE, font_size=26, color=VERT_OK).to_edge(DOWN)

        self.play(Write(titre))
        self.play(LaggedStart(*[Write(p) for p in points], lag_ratio=0.3))
        self.play(Write(signature))
        self.wait(2.5)

    def construct(self):
        self.ecran_accueil()
        self.ecran_tableau()
        self.ecran_barres()
        self.ecran_camembert()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_conclusion()
