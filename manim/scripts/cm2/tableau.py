# tableau.py
# EleveAI — Maths CM2 — Lire un tableau (notionId : tableau)
# Mêmes données que la fiche lib/fiches/maths-cm2-tableaux.tsx (fruits du marché).
# CM2 = texte brut, langage d'un enfant de ~10 ans. VARIÉTÉ D'ANIMATIONS
# (case qui s'allume au croisement, ligne qui s'additionne, colonne comparée).
#
# ⚠️ SON — ligne du 21/07 : VOIX de Frédéric. Script voix en bas, DEUX COLONNES.
#
# Mapping micro-compétences (banque tableaux.bank.ts) → écrans :
# - tableau_lire       → écran 1 (croisement Bananes × Mercredi = 35)
# - tableau_completer  → écran 2 (total ligne Ananas = 62)
# - tableau_interpreter→ écran 3 (colonne Mercredi : le plus vendu = bananes)
# - tableau_defi       → défi + correction (total du mercredi = 73)
#
# Rendu : python -m manim render -qh manim/scripts/cm2/tableau.py TableauCM2 -o eleveai-maths-cm2-tableau --media_dir manim/scripts/cm2/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

import numpy as np
from manim import *

from charte import *
from mascotte import MascotteMargouillat

COLS = ["", "Lundi", "Mardi", "Mercredi"]
ROWS = [
    ["Ananas", "18", "24", "20"],
    ["Bananes", "30", "28", "35"],
    ["Mangues", "12", "15", "18"],
]


class TableauCM2(Scene):

    def add_mascotte(self, scale=0.5):
        m = MascotteMargouillat().scale(scale).to_corner(DOWN + RIGHT, buff=0.35)
        self.add(m)
        return m

    def titre_ecran(self, texte):
        t = Text(texte, font_size=40, color=JAUNE_TITRE).to_edge(UP)
        self.play(Write(t))
        return t

    def make_table(self, center=(-1.0, -0.2), cw=1.7, ch=0.9):
        """Construit le tableau. Renvoie (groupe, cell_text[r][c], cell_x, cell_y)."""
        cx0, cy0 = center
        cells = []
        cellsxy = []
        grp = VGroup()
        data = [COLS] + [r for r in ROWS]  # 4 lignes (entêtes + 3), 4 colonnes
        for r in range(4):
            row_text = []
            row_xy = []
            for c in range(4):
                x = cx0 + (c - 1.5) * cw
                y = cy0 + (1.5 - r) * ch
                box = Rectangle(width=cw, height=ch, stroke_width=2, color=WHITE).move_to([x, y, 0])
                is_head = (r == 0 or c == 0)
                box.set_fill("#123" if is_head else "#0b1b2b", opacity=1)
                col = JAUNE_TITRE if is_head else WHITE
                txt = Text(data[r][c], font_size=26, color=col).move_to([x, y, 0])
                grp.add(box, txt)
                row_text.append(txt)
                row_xy.append((x, y))
            cells.append(row_text)
            cellsxy.append(row_xy)
        return grp, cells, cellsxy

    # ── écran 0 : accueil ───────────────────────────────────────────────────

    def ecran_accueil(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        titre = Text("Lire un tableau", font_size=52, color=JAUNE_TITRE).to_edge(UP)
        sous = Text("Maths CM2 — EleveAI", font_size=32, color=WHITE).next_to(titre, DOWN, buff=0.3)
        grp, cells, xy = self.make_table(center=(-0.4, -0.6))
        astuce = Text("Une case = une ligne × une colonne", font_size=28, color=BLEU_CALCUL).to_edge(DOWN, buff=0.5)
        self.play(Write(titre), FadeIn(sous))
        self.play(FadeIn(grp))
        self.play(FadeIn(astuce, shift=UP * 0.2))
        self.wait(2.2)

    # ── écran 1 : lire une case ────────────────────────────────────────────

    def ecran_lire(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("1. Lire une case")

        grp, cells, xy = self.make_table(center=(-0.6, -0.3))
        self.play(FadeIn(grp))

        q = Text("Bananes vendues mercredi ?", font_size=28, color=WHITE).to_edge(DOWN, buff=0.7)
        self.play(FadeIn(q, shift=UP * 0.2))
        self.wait(0.4)

        # on éclaire la ligne Bananes (r=2) et la colonne Mercredi (c=3).
        (lx, ly) = xy[2][0]
        (cx, cy) = xy[0][3]
        ligne = Rectangle(width=1.7 * 4, height=0.9, color=ORANGE_RETENUE, stroke_width=5).move_to([-0.6, ly, 0])
        colonne = Rectangle(width=1.7, height=0.9 * 4, color=BLEU_CALCUL, stroke_width=5).move_to([cx, -0.3, 0])
        self.play(Create(ligne))
        self.play(Create(colonne))

        # la case au croisement (r=2, c=3)
        (tx, ty) = xy[2][3]
        box = Rectangle(width=1.7, height=0.9, color=VERT_OK, stroke_width=6).move_to([tx, ty, 0])
        self.play(Create(box), Flash([tx, ty, 0], color=VERT_OK))
        rep = Text("35 bananes", font_size=34, color=VERT_OK).to_edge(DOWN, buff=0.7)
        self.play(Transform(q, rep))
        self.wait(2.0)

    # ── écran 2 : le total d'une ligne ─────────────────────────────────────

    def ecran_completer(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("2. Le total d'une ligne")

        grp, cells, xy = self.make_table(center=(-1.4, -0.3))
        self.play(FadeIn(grp))

        # on souligne la ligne Ananas (r=1)
        (lx, ly) = xy[1][0]
        ligne = Rectangle(width=1.7 * 4, height=0.9, color=ORANGE_RETENUE, stroke_width=5).move_to([-1.4, ly, 0])
        self.play(Create(ligne))

        calc = Text("18 + 24 + 20", font_size=32, color=WHITE).move_to([3.4, 0.4, 0])
        res = Text("= 62 ananas", font_size=34, color=VERT_OK).next_to(calc, DOWN, buff=0.4)
        self.play(FadeIn(calc, shift=RIGHT * 0.2))
        self.play(Write(res))
        self.wait(2.0)

    # ── écran 3 : interpréter (le plus vendu) ──────────────────────────────

    def ecran_interpreter(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("3. Le plus vendu mercredi")

        grp, cells, xy = self.make_table(center=(-1.2, -0.3))
        self.play(FadeIn(grp))

        # colonne Mercredi (c=3)
        (cx, cy) = xy[0][3]
        colonne = Rectangle(width=1.7, height=0.9 * 4, color=BLEU_CALCUL, stroke_width=5).move_to([cx, -0.3, 0])
        self.play(Create(colonne))

        vals = Text("20 · 35 · 18", font_size=32, color=WHITE).move_to([3.4, 0.5, 0])
        self.play(FadeIn(vals))
        # on entoure le 35 (bananes, r=2, c=3)
        (tx, ty) = xy[2][3]
        box = Rectangle(width=1.7, height=0.9, color=VERT_OK, stroke_width=6).move_to([tx, ty, 0])
        self.play(Create(box), Indicate(cells[2][3], color=VERT_OK))
        rep = Text("Le plus grand : 35 → les bananes", font_size=30, color=VERT_OK).to_edge(DOWN, buff=0.6)
        self.play(Write(rep))
        self.wait(2.0)

    # ── écran 4 : défi ─────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.6)
        titre = Text("Défi", font_size=46, color=JAUNE_TITRE).to_edge(UP)
        self.play(GrowFromCenter(titre))

        q1 = Text("Au marché de Saint-Pierre,", font_size=32, color=WHITE).move_to([0, 1.5, 0])
        q2 = Text("combien de fruits en tout mercredi ?", font_size=32, color=BLEU_CALCUL).move_to([0, 0.6, 0])
        indice = Text("Indice : additionne toute la colonne Mercredi.", font_size=26, color=ORANGE_RETENUE).move_to([0, -0.3, 0])
        self.play(Write(q1))
        self.play(FadeIn(q2, shift=DOWN * 0.2))
        self.play(FadeIn(indice, shift=UP * 0.2))

        pause = Text("Mets pause et cherche !", font_size=30, color=ORANGE_RETENUE).to_edge(DOWN)
        self.play(Write(pause))
        self.wait(4.0)

    # ── écran 5 : correction ───────────────────────────────────────────────

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("Correction")

        e1 = Text("Colonne Mercredi : 20 + 35 + 18", font_size=34, color=BLEU_CALCUL).move_to([0, 1.0, 0])
        e2 = Text("= 73", font_size=48, color=ORANGE_RETENUE).next_to(e1, DOWN, buff=0.5)
        self.play(Write(e1))
        self.play(GrowFromCenter(e2))
        self.wait(0.5)

        conclusion = Text("73 fruits vendus mercredi", font_size=40, color=VERT_OK).to_edge(DOWN, buff=0.8)
        self.play(Write(conclusion))
        self.wait(2.4)

    # ── écran 6 : à retenir ─────────────────────────────────────────────────

    def ecran_conclusion(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        titre = Text("À retenir", font_size=46, color=JAUNE_TITRE).to_edge(UP)

        points = VGroup(
            Text("1. Une case se lit au croisement ligne × colonne.", font_size=27),
            Text("2. Le total d'une ligne = la somme de ses cases.", font_size=27),
            Text("3. Interpréter = comparer les cases pour répondre.", font_size=27),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.5).move_to([0, 0.2, 0])

        signature = Text(SIGNATURE, font_size=26, color=VERT_OK).to_edge(DOWN)

        self.play(Write(titre))
        self.play(LaggedStart(*[FadeIn(p, shift=RIGHT * 0.3) for p in points], lag_ratio=0.3))
        self.play(Write(signature))
        self.wait(2.5)

    def construct(self):
        self.ecran_accueil()
        self.ecran_lire()
        self.ecran_completer()
        self.ecran_interpreter()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_conclusion()


# ─── SCRIPT VOIX (leçon → VOIX de Frédéric, ligne éditoriale du 21/07) ─────────
# DEUX COLONNES : ce qui RESTE écrit à l'écran (minimal) / ce que dit la VOIX.
# Règle d'or : la voix GUIDE LE REGARD, elle ne relit pas le texte affiché.
#
#  minutage   │ CE QUI RESTE À L'ÉCRAN        │ CE QUE DIT LA VOIX (guidage, ≠ écran)
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  Accueil    │ « Lire un tableau » + grille  │ « Un tableau, c'est du rangé : des lignes,
#  ~0:00      │  case = ligne × colonne       │   des colonnes. Chaque case est au
#             │                               │   croisement des deux. »
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  Écran 1    │  ligne Bananes + col Mercredi │ « Regarde mon doigt. Je pars de la ligne
#  ~0:14      │  → 35                         │   Bananes, en orange, je descends la
#             │                               │   colonne Mercredi, en bleu. Là où elles
#             │                               │   se croisent, la case verte : trente-cinq. »
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  Écran 2    │  ligne Ananas surlignée       │ « Pour un total, balaie toute la ligne.
#  ~0:32      │  18 + 24 + 20 = 62           │   Additionne ses trois cases : dix-huit,
#             │                               │   vingt-quatre, vingt. Soixante-deux. »
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  Écran 3    │  colonne Mercredi             │ « Interpréter, c'est comparer. Reste dans la
#  ~0:50      │  20 · 35 · 18 → bananes       │   colonne du mercredi et cherche le plus
#             │                               │   grand. Trente-cinq gagne : ce sont les
#             │                               │   bananes. »
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  Défi       │  total du mercredi ?          │ « À toi. Combien de fruits, tous confondus,
#  ~1:08      │                               │   ce mercredi ? Additionne toute la colonne.
#             │                               │   Pause. »
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  Correction │  20 + 35 + 18 = 73            │ « Les trois cases de la colonne : vingt,
#  ~1:22      │                               │   trente-cinq, dix-huit. Soixante-treize
#             │                               │   fruits vendus ce jour-là. »
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  À retenir  │  les 3 points                 │ « Retiens : la case au croisement ; le total
#  ~1:36      │                               │   c'est la somme d'une ligne ; interpréter,
#             │                               │   c'est comparer. À bientôt ! »
