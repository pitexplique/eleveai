# nombre_entier.py
# EleveAI — Maths CM2 — Les nombres entiers (notionId : nombre_entier)
# Mêmes exemples que la fiche lib/fiches/maths-cm2-nombres-entiers.tsx.
# CM2 = texte brut, langage d'un enfant de ~10 ans. VARIÉTÉ D'ANIMATIONS
# (tableau qui se remplit colonne par colonne, comparaison chiffre à chiffre,
# décomposition qui éclate, curseur qui glisse pour l'arrondi, sauts de la table
# de 6). Légendes DISTRIBUÉES près de l'action.
#
# ⚠️ SON — nouvelle ligne éditoriale du 21/07 : cette leçon prend la VOIX de
# Frédéric. Le script voix est en bas, à DEUX COLONNES (ce qui reste écrit / ce
# que la voix dit) : la voix GUIDE LE REGARD, elle ne relit pas l'écran.
#
# Mapping micro-compétences (banque nombres-entiers.bank.ts) → écrans :
# - entier_lire       → écran 1 (tableau : 4 273 = 4 milliers, 2 centaines, 7 dizaines, 3 unités)
# - entier_comparer   → écran 2 (9 870 vs 9 708 : on compare les centaines)
# - entier_decomposer → écran 3 (4 582 = 4 000 + 500 + 80 + 2)
# - entier_arrondir   → écran 4 (4 682 arrondi à la centaine → 4 700)
# - entier_multiple   → écran 5 (42 = 6 × 7, les sauts de la table de 6)
# - entier_defi       → défi + correction (96 letchis ÷ 8 = 12 sachets, marché de Saint-Pierre)
#
# Rendu : python -m manim render -qh manim/scripts/cm2/nombre_entier.py NombreEntierCM2 -o eleveai-maths-cm2-nombre-entier --media_dir manim/scripts/cm2/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from manim import *

from charte import *
from mascotte import MascotteMargouillat

CLASSES = ["Milliers", "Centaines", "Dizaines", "Unités"]


class NombreEntierCM2(Scene):

    # ── outils communs ──────────────────────────────────────────────────────

    def add_mascotte(self, scale=0.5):
        m = MascotteMargouillat().scale(scale).to_corner(DOWN + RIGHT, buff=0.35)
        self.add(m)
        return m

    def titre_ecran(self, texte):
        t = Text(texte, font_size=40, color=JAUNE_TITRE).to_edge(UP)
        self.play(Write(t))
        return t

    def tableau_numeration(self, chiffres, y=0.4, cell=1.5, headers=True):
        """Une ligne de cases (une par classe) avec en-têtes. Renvoie
        (groupe, cases, textes_chiffres)."""
        n = len(chiffres)
        x0 = -(n - 1) / 2 * cell
        cases = VGroup()
        entetes = VGroup()
        vals = VGroup()
        for i, ch in enumerate(chiffres):
            x = x0 + i * cell
            r = Rectangle(width=cell * 0.9, height=1.1, stroke_width=2, color=WHITE).move_to([x, y, 0])
            cases.add(r)
            if headers:
                entetes.add(Text(CLASSES[i], font_size=22, color=BLEU_CALCUL).next_to(r, UP, buff=0.16))
            vals.add(Text(ch, font_size=58, color=WHITE).move_to([x, y, 0]))
        return VGroup(cases, entetes, vals), cases, vals

    # ── écran 0 : accueil ───────────────────────────────────────────────────

    def ecran_accueil(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        titre = Text("Les nombres entiers", font_size=50, color=JAUNE_TITRE).to_edge(UP)
        sous = Text("Maths CM2 — EleveAI", font_size=32, color=WHITE).next_to(titre, DOWN, buff=0.35)
        accroche = Text("4 273 : que vaut vraiment le 4 ?", font_size=36, color=BLEU_CALCUL).next_to(sous, DOWN, buff=0.9)
        astuce = Text("La place d'un chiffre décide de sa valeur.", font_size=26, color=WHITE).next_to(accroche, DOWN, buff=0.5)
        self.play(Write(titre), FadeIn(sous))
        self.play(GrowFromCenter(accroche))
        self.play(FadeIn(astuce, shift=UP * 0.2))
        self.wait(2.2)

    # ── écran 1 : lire (4 273 dans le tableau) ──────────────────────────────

    def ecran_lire(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("1. Lire dans le tableau")

        tab, cases, vals = self.tableau_numeration(["4", "2", "7", "3"], y=0.6)
        self.play(Create(cases), FadeIn(tab[1], shift=DOWN * 0.2))
        self.play(LaggedStart(*[FadeIn(v, scale=0.4) for v in vals], lag_ratio=0.25))
        self.wait(0.5)

        # Chaque chiffre annonce sa valeur, l'une après l'autre.
        valeurs = ["4 000", "200", "70", "3"]
        cols = [BLEU_CALCUL, VERT_OK, ORANGE_RETENUE, WHITE]
        etiquettes = VGroup()
        for i, (v, c) in enumerate(zip(valeurs, cols)):
            lbl = Text(v, font_size=30, color=c).next_to(cases[i], DOWN, buff=0.45)
            etiquettes.add(lbl)
        for i in range(4):
            self.play(Indicate(vals[i], color=cols[i]), FadeIn(etiquettes[i], shift=DOWN * 0.2), run_time=0.7)

        conclusion = Text("4 273 = 4 000 + 200 + 70 + 3", font_size=40, color=VERT_OK).to_edge(DOWN, buff=0.6)
        self.play(Write(conclusion))
        self.wait(2.2)

    # ── écran 2 : comparer (9 870 vs 9 708) ─────────────────────────────────

    def ecran_comparer(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("2. Comparer 9 870 et 9 708")

        astuce = Text("On compare les chiffres de gauche à droite.", font_size=28, color=ORANGE_RETENUE).move_to([0, 2.0, 0])
        self.play(FadeIn(astuce, shift=DOWN * 0.2))

        n1 = Text("9 870", font_size=72, color=WHITE).move_to([-2.6, 0.4, 0])
        n2 = Text("9 708", font_size=72, color=WHITE).move_to([2.6, 0.4, 0])
        self.play(FadeIn(n1, scale=0.5), FadeIn(n2, scale=0.5))
        self.wait(0.4)

        # Les milliers sont pareils (9) → on descend aux centaines.
        b1m = SurroundingRectangle(n1[0], color=WHITE, buff=0.06)
        b2m = SurroundingRectangle(n2[0], color=WHITE, buff=0.06)
        egal = Text("milliers égaux : 9 = 9", font_size=26, color=WHITE).move_to([0, -0.7, 0])
        self.play(Create(b1m), Create(b2m), FadeIn(egal))
        self.wait(0.6)
        self.play(FadeOut(b1m), FadeOut(b2m), FadeOut(egal))

        # 8 (dans 9 870) est le 3e caractère : "9"," ","8"... index 2.
        b1c = SurroundingRectangle(n1[2], color=VERT_OK, buff=0.06)
        b2c = SurroundingRectangle(n2[2], color=ORANGE_RETENUE, buff=0.06)
        cent = Text("centaines : 8 > 7", font_size=30, color=VERT_OK).move_to([0, -0.8, 0])
        self.play(Create(b1c), Create(b2c), Write(cent), Flash(n1[2], color=VERT_OK))
        self.wait(1.0)

        conclusion = Text("9 870 > 9 708", font_size=48, color=VERT_OK).to_edge(DOWN, buff=0.6)
        self.play(n1.animate.set_color(VERT_OK), Write(conclusion))
        self.wait(2.2)

    # ── écran 3 : décomposer (4 582) ────────────────────────────────────────

    def ecran_decomposer(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("3. Décomposer 4 582")

        nombre = Text("4 582", font_size=80, color=WHITE).move_to([0, 1.7, 0])
        self.play(GrowFromCenter(nombre))
        self.wait(0.4)

        # Chaque chiffre « tombe » vers sa valeur.
        chiffres = ["4", "5", "8", "2"]
        valeurs = ["4 000", "500", "80", "2"]
        cols = [BLEU_CALCUL, VERT_OK, ORANGE_RETENUE, WHITE]
        xs = [-4.2, -1.4, 1.4, 4.2]
        morceaux = VGroup()
        for i in range(4):
            v = Text(valeurs[i], font_size=34, color=cols[i]).move_to([xs[i], -0.2, 0])
            morceaux.add(v)
            self.play(TransformFromCopy(nombre, v), run_time=0.6)

        plus = VGroup(*[Text("+", font_size=34, color=WHITE).move_to([(xs[i] + xs[i + 1]) / 2, -0.2, 0]) for i in range(3)])
        self.play(FadeIn(plus))
        self.wait(0.6)

        conclusion = Text("4 582 = 4 000 + 500 + 80 + 2", font_size=38, color=VERT_OK).to_edge(DOWN, buff=0.7)
        self.play(Write(conclusion))
        self.wait(2.2)

    # ── écran 4 : arrondir (4 682 → 4 700) ──────────────────────────────────

    def ecran_arrondir(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("4. Arrondir à la centaine")

        consigne = Text("Arrondis 4 682 à la centaine la plus proche", font_size=30, color=WHITE).move_to([0, 2.1, 0])
        self.play(FadeIn(consigne, shift=DOWN * 0.2))

        # Petite droite : de 4 600 à 4 700, le point 4 682.
        x0, x1, y = -5.0, 5.0, 0.3
        vmin, vmax = 4600, 4700

        def x_of(v):
            return x0 + (x1 - x0) * (v - vmin) / (vmax - vmin)

        axe = Arrow([x0 - 0.4, y, 0], [x1 + 0.4, y, 0], buff=0, stroke_width=3, color=WHITE)
        g600 = Line([x_of(4600), y - 0.18, 0], [x_of(4600), y + 0.18, 0], stroke_width=3)
        g650 = Line([x_of(4650), y - 0.14, 0], [x_of(4650), y + 0.14, 0], stroke_width=2, color=GREY)
        g700 = Line([x_of(4700), y - 0.18, 0], [x_of(4700), y + 0.18, 0], stroke_width=3)
        l600 = Text("4 600", font_size=24, color=WHITE).next_to(g600, DOWN, buff=0.25)
        l650 = Text("4 650", font_size=20, color=GREY).next_to(g650, DOWN, buff=0.2)
        l700 = Text("4 700", font_size=24, color=WHITE).next_to(g700, DOWN, buff=0.25)
        self.play(GrowArrow(axe))
        self.play(Create(VGroup(g600, g650, g700)), Write(VGroup(l600, l650, l700)))
        self.wait(0.4)

        pt = Dot([x_of(4682), y, 0], color=BLEU_CALCUL, radius=0.12)
        lab = Text("4 682", font_size=28, color=BLEU_CALCUL).next_to(pt, UP, buff=0.4)
        self.play(FadeIn(pt, scale=0.4), FadeIn(lab, shift=DOWN * 0.2))

        regle = Text("Les dizaines : 8 (5 ou plus) → on monte", font_size=26, color=ORANGE_RETENUE).move_to([0, -1.2, 0])
        self.play(Write(regle))
        self.wait(0.6)

        fleche = Arrow([x_of(4682), 1.2, 0], [x_of(4700), 1.2, 0], buff=0.1, color=VERT_OK)
        self.play(GrowArrow(fleche), pt.animate.move_to([x_of(4700), y, 0]).set_color(VERT_OK), lab.animate.set_opacity(0.3))
        self.play(Flash(Dot([x_of(4700), y, 0]), color=VERT_OK))

        conclusion = Text("4 682 arrondi à la centaine = 4 700", font_size=36, color=VERT_OK).to_edge(DOWN, buff=0.5)
        self.play(Write(conclusion))
        self.wait(2.2)

    # ── écran 5 : les multiples (42 = 6 × 7) ────────────────────────────────

    def ecran_multiple(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("5. Les multiples de 6")

        consigne = Text("Un multiple de 6 est dans la table de 6", font_size=30, color=WHITE).move_to([0, 2.1, 0])
        self.play(FadeIn(consigne, shift=DOWN * 0.2))

        # Droite 0 → 48, les multiples de 6 marqués, un arceau qui saute de 6 en 6.
        x0, x1, y = -5.4, 5.4, 0.2
        vmin, vmax, step = 0, 48, 6

        def x_of(v):
            return x0 + (x1 - x0) * (v - vmin) / (vmax - vmin)

        axe = Arrow([x0 - 0.3, y, 0], [x1 + 0.3, y, 0], buff=0, stroke_width=3, color=WHITE)
        self.play(GrowArrow(axe))

        marques = VGroup()
        labels = VGroup()
        for v in range(0, 49, 6):
            t = Line([x_of(v), y - 0.16, 0], [x_of(v), y + 0.16, 0], stroke_width=3, color=BLEU_CALCUL)
            marques.add(t)
            labels.add(Text(str(v), font_size=22, color=WHITE).next_to(t, DOWN, buff=0.2))
        self.play(LaggedStart(*[Create(m) for m in marques], lag_ratio=0.1),
                  LaggedStart(*[Write(l) for l in labels], lag_ratio=0.1))
        self.wait(0.4)

        # Des arceaux de saut : +6 à chaque fois.
        sauts = VGroup()
        for i in range(7):
            a = ArcBetweenPoints([x_of(i * 6), y + 0.16, 0], [x_of((i + 1) * 6), y + 0.16, 0],
                                 angle=-PI / 2, color=ORANGE_RETENUE, stroke_width=3)
            sauts.add(a)
        self.play(LaggedStart(*[Create(s) for s in sauts], lag_ratio=0.2))
        self.wait(0.4)

        # On s'arrête sur 42.
        pt = Dot([x_of(42), y, 0], color=VERT_OK, radius=0.13)
        lab = Text("42 = 6 × 7", font_size=32, color=VERT_OK).move_to([x_of(42), y + 1.1, 0])
        self.play(FadeIn(pt, scale=0.4), FadeIn(lab, shift=DOWN * 0.2), Flash(pt, color=VERT_OK))

        conclusion = Text("42 est un multiple de 6", font_size=38, color=VERT_OK).to_edge(DOWN, buff=0.6)
        self.play(Write(conclusion))
        self.wait(2.2)

    # ── écran 6 : défi (les letchis) ────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        titre = Text("Défi", font_size=46, color=JAUNE_TITRE).to_edge(UP)
        self.play(GrowFromCenter(titre))

        q1 = Text("Au marché de Saint-Pierre, 96 letchis.", font_size=32, color=WHITE).move_to([0, 1.7, 0])
        q2 = Text("On les range dans des sachets de 8.", font_size=32, color=WHITE).move_to([0, 0.95, 0])
        q3 = Text("Combien de sachets remplis ?", font_size=34, color=BLEU_CALCUL).move_to([0, 0.1, 0])
        indice = Text("Indice : combien de fois 8 dans 96 ?", font_size=28, color=ORANGE_RETENUE).move_to([0, -0.7, 0])
        self.play(Write(q1))
        self.play(FadeIn(q2, shift=DOWN * 0.2))
        self.play(FadeIn(q3, shift=DOWN * 0.2))
        self.play(FadeIn(indice, shift=UP * 0.2))

        pause = Text("Mets pause et cherche !", font_size=30, color=ORANGE_RETENUE).to_edge(DOWN)
        self.play(Write(pause))
        self.wait(4.0)

    # ── écran 7 : correction (12 sachets) ───────────────────────────────────

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("Correction")

        e1 = Text("On partage en paquets égaux → une division.", font_size=30, color=WHITE).move_to([0, 1.4, 0])
        e2 = Text("96 ÷ 8 = 12", font_size=56, color=ORANGE_RETENUE).move_to([0, 0.3, 0])
        self.play(FadeIn(e1, shift=DOWN * 0.2))
        self.play(GrowFromCenter(e2))
        self.wait(0.5)

        verif = Text("Vérif : 8 × 12 = 96 ✓", font_size=30, color=BLEU_CALCUL).move_to([0, -0.8, 0])
        self.play(FadeIn(verif, shift=UP * 0.2))
        self.wait(0.6)

        conclusion = Text("12 sachets remplis", font_size=44, color=VERT_OK).to_edge(DOWN, buff=0.8)
        self.play(Write(conclusion))
        self.wait(2.4)

    # ── écran 8 : à retenir ─────────────────────────────────────────────────

    def ecran_conclusion(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        titre = Text("À retenir", font_size=46, color=JAUNE_TITRE).to_edge(UP)

        points = VGroup(
            Text("1. Chaque chiffre vaut selon sa colonne (unités, dizaines, centaines…).", font_size=25),
            Text("2. Pour comparer : les chiffres de gauche à droite.", font_size=25),
            Text("3. Arrondir : on regarde le chiffre juste après le rang voulu.", font_size=25),
            Text("4. Un multiple, c'est un résultat de la table (42 = 6 × 7).", font_size=25),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.42).move_to([0, 0.2, 0])

        signature = Text(SIGNATURE, font_size=26, color=VERT_OK).to_edge(DOWN)

        self.play(Write(titre))
        self.play(LaggedStart(*[FadeIn(p, shift=RIGHT * 0.3) for p in points], lag_ratio=0.3))
        self.play(Write(signature))
        self.wait(2.5)

    # ── déroulé ─────────────────────────────────────────────────────────────

    def construct(self):
        self.ecran_accueil()
        self.ecran_lire()
        self.ecran_comparer()
        self.ecran_decomposer()
        self.ecran_arrondir()
        self.ecran_multiple()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_conclusion()


# ─── SCRIPT VOIX (leçon → VOIX de Frédéric, ligne éditoriale du 21/07) ─────────
# DEUX COLONNES : ce qui RESTE écrit à l'écran (minimal) / ce que dit la VOIX.
# Règle d'or : la voix GUIDE LE REGARD, elle ne relit pas le texte affiché.
# Dire « top » à l'apparition du titre d'accueil (synchro). Mémo tel 2-3 min.
#
#  minutage   │ CE QUI RESTE À L'ÉCRAN        │ CE QUE DIT LA VOIX (guidage, ≠ écran)
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  Accueil    │ « Les nombres entiers »       │ « Regarde ce nombre : quatre mille
#  ~0:00      │  4 273                        │   deux cent soixante-treize. Le quatre,
#             │                               │   là devant — il ne vaut pas quatre. »
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  Écran 1    │  tableau : 4 | 2 | 7 | 3      │ « Suis les colonnes de gauche à droite.
#  ~0:12      │  4 000 · 200 · 70 · 3         │   Plus on va à gauche, plus le chiffre
#             │                               │   pèse lourd : ici le quatre vaut quatre
#             │                               │   mille. »
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  Écran 2    │  9 870   |   9 708            │ « Les deux commencent pareil, ne t'y
#  ~0:34      │  centaines : 8 > 7            │   fie pas. Descends d'un cran, sur le
#             │  9 870 > 9 708                │   chiffre d'après : huit contre sept.
#             │                               │   C'est lui qui tranche. »
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  Écran 3    │  4 582                        │ « Casse-le en morceaux. Chaque chiffre
#  ~0:54      │  4 000 + 500 + 80 + 2         │   s'en va poser sa vraie valeur en
#             │                               │   dessous. Additionne-les du regard :
#             │                               │   tu retombes sur le nombre. »
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  Écran 4    │  droite 4 600 —— 4 700        │ « Où tombe quatre mille six cent quatre-
#  ~1:14      │  4 682 → 4 700                │   vingt-deux ? Regarde de quel bord il est
#             │                               │   le plus proche. Le chiffre des dizaines
#             │                               │   te le dit : huit, ça pousse vers le
#             │                               │   haut. »
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  Écran 5    │  droite 0…48, sauts de 6      │ « Compte les bonds avec moi : six, douze,
#  ~1:36      │  42 = 6 × 7                   │   dix-huit… chaque bond ajoute six. On
#             │                               │   s'arrête pile sur quarante-deux : il est
#             │                               │   dans la table, c'est un multiple. »
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  Défi       │  96 letchis, sachets de 8     │ « À toi. Imagine les letchis sur l'étal.
#  ~1:56      │  Combien de sachets ?         │   On veut des paquets de huit. Mets pause,
#             │                               │   cherche l'opération. »
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  Correction │  96 ÷ 8 = 12                  │ « Partager en paquets égaux, c'est diviser.
#  ~2:10      │  8 × 12 = 96 ✓                │   Quatre-vingt-seize divisé par huit : douze.
#             │  12 sachets                   │   Et on vérifie en remontant : huit fois
#             │                               │   douze, quatre-vingt-seize. Ça colle. »
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  À retenir  │  les 4 points                 │ « Garde trois idées : la place fait la
#  ~2:28      │                               │   valeur ; on compare de gauche à droite ;
#             │                               │   et un multiple, c'est un résultat de la
#             │                               │   table. À bientôt ! »
