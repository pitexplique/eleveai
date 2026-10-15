# symboles_notations.py
# EleveAI — « Les bases » — Symboles et notations : lire les maths comme une phrase.
#
# ⭐ 04/10/2026 — Frédéric colle une suggestion de YouTube (le « décodeur » de
# symboles) ; le titre « Symboles et notations » est le sien. Voix validée avec
# lui : manim/voix/bases-symboles.json (débit −7).
# ⭐ LE FIL : une ligne qui fait peur, montrée à la première seconde, puis
# décodée symbole par symbole dans la correction :
#     ∀ n ∈ ℕ,  Σ (k = 1 → n) k  =  n(n + 1) / 2      (vérifiée avec n = 4)
# ⭐ Chaque symbole dit est ÉCRIT quand il est dit (`au_mot`), et chaque écran a
# son dessin : poupées russes des ensembles, A qui se retourne en ∀, E qui se
# retourne en ∃, grille 7 × 7 = 49, −3 et 3 qui tombent sur 9, nuage de pluie,
# escalier 1 + 2 + 3 + 4, sauts jusqu'à zéro, rectangle 4 × 5 coupé en deux.
# ⛔ Pas de LaTeX sur ce poste : les symboles passent par la police Cambria
# Math (vérifiée au rendu : ∀ ∃ ∈ ⊂ ⇒ ⇔ ⇏ Σ ∏ ℕ ℤ 𝔻 ℚ ℝ).
# ⛔ AUCUNE ÉTIQUETTE DE NIVEAU (série « Les bases »).
#
# Voix :
#   powershell -File scripts/generer-voix.ps1 -Fichier manim/voix/bases-symboles.json -Debit -7
# Rendu :
#   python -m manim render -qh --disable_caching manim/scripts/bases/symboles_notations.py SymbolesNotations -o eleveai-maths-bases-symboles-notations --media_dir manim/scripts/bases/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from manim import *

from charte import *
from gabarit_sixieme import Notion6e

MATH = "Cambria Math"
VIOLET = "#A78BFA"

AU_PROGRAMME = [
    ("les ensembles de nombres", "ℕ  ℤ  𝔻  ℚ  ℝ"),
    ("les quantificateurs", "∀   ∃"),
    ("les flèches", "⇒   ⇔"),
    ("deux symboles qui impressionnent pour rien", "Σ   | x |"),
]

# (extrait de la voix 08b-recap, symbole, lecture, couleur)
RECAP = [
    ("N, Z, D, Q, R", "ℕ ℤ 𝔻 ℚ ℝ", "les ensembles de nombres", BLEU_CALCUL),
    ("Appartient à", "∈", "appartient à : un élément", VERT_OK),
    ("Inclus dans", "⊂", "inclus dans : un ensemble", VERT_OK),
    ("Pour tout", "∀", "pour tout", JAUNE_TITRE),
    ("Il existe", "∃", "il existe (au moins un)", JAUNE_TITRE),
    ("Implique", "⇒", "implique", ORANGE_RETENUE),
    ("équivaut à", "⇔", "équivaut à", ORANGE_RETENUE),
    ("Sigma", "Σ", "la somme", VIOLET),
    ("Le grand pi", "∏", "le produit", VIOLET),
    ("les deux barres", "| x |", "la distance à zéro", BLEU_CALCUL),
]


class SymbolesNotations(Notion6e):

    identite = "Les bases · EleveAI"
    nom_voix = "bases-symboles"

    # ── les briques ─────────────────────────────────────────────────────────

    def m(self, texte, font_size=48, color=WHITE):
        """Une ligne de maths, en Cambria Math."""
        return Text(texte, font=MATH, font_size=font_size, color=color)

    def t(self, texte, font_size=26, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def barrer(self, mob):
        return Cross(mob, stroke_color=ROUGE_ERREUR, stroke_width=6, scale_factor=0.9)

    def frac(self, num, den, font_size=40, color=WHITE):
        n = self.m(num, font_size, color)
        d = self.m(den, font_size, color)
        larg = max(n.width, d.width) + 0.14
        barre = Line(LEFT * larg / 2, RIGHT * larg / 2, color=color, stroke_width=3)
        return VGroup(n, barre, d).arrange(DOWN, buff=0.08)

    def sigma(self, haut, bas, terme, font_size=56, color=WHITE, couleurs=None):
        """Σ avec ses bornes : VGroup(Σ, haut, bas, terme)."""
        ch, cb, ct = couleurs or (color, color, color)
        s = self.m("Σ", font_size * 1.6, color)
        h = self.m(haut, font_size * 0.5, ch).next_to(s, UP, buff=0.06)
        b = self.m(bas, font_size * 0.5, cb).next_to(s, DOWN, buff=0.06)
        k = self.m(terme, font_size, ct).next_to(s, RIGHT, buff=0.12)
        return VGroup(s, h, b, k)

    def formule(self, font_size=52, buff=0.5):
        """La ligne qui fait peur : VGroup(pour tout n ∈ ℕ, la somme, = la fraction)."""
        g1 = VGroup(self.m("∀", font_size), self.m("n", font_size),
                    self.m("∈", font_size), self.m("ℕ,", font_size)).arrange(RIGHT, buff=0.16)
        g2 = self.sigma("n", "k = 1", "k", font_size)
        g3 = VGroup(self.m("=", font_size), self.frac("n(n + 1)", "2", font_size * 0.8)).arrange(RIGHT, buff=0.2)
        return VGroup(g1, g2, g3).arrange(RIGHT, buff=buff)

    def retourner(self, lettre, symbole, centre, axe, font_size=150, couleur=JAUNE_TITRE):
        """La lettre apparaît, se retourne, et devient le symbole : A → ∀, E → ∃."""
        a = self.m(lettre, font_size, couleur).move_to(centre)
        self.play(FadeIn(a, scale=1.2), run_time=0.5)
        if axe == "tour":
            self.play(Rotate(a, PI), run_time=0.9)
        else:
            self.play(a.animate.flip(UP), run_time=0.9)
        s = self.m(symbole, font_size, couleur).move_to(centre)
        self.play(FadeTransform(a, s), run_time=0.3)
        return s

    def grille(self, lignes, colonnes, cote, couleur, pleines=None):
        """Une grille de cases ; `pleines(i, j)` dit lesquelles sont coloriées."""
        g = VGroup()
        for i in range(lignes):
            for j in range(colonnes):
                c = Square(side_length=cote, stroke_width=1.5, color=WHITE)
                plein = pleines(i, j) if pleines else True
                c.set_fill(couleur if plein else GREY_E, opacity=0.9 if plein else 0.35)
                g.add(c)
        g.arrange_in_grid(rows=lignes, cols=colonnes, buff=0)
        return g

    def escalier(self, n, cote, couleur=BLEU_CALCUL):
        """1 + 2 + … + n en colonnes de cases posées sur le sol."""
        g = VGroup()
        for k in range(1, n + 1):
            col = VGroup(*[Square(side_length=cote, stroke_width=1.5, color=WHITE)
                           .set_fill(couleur, opacity=0.9) for _ in range(k)])
            col.arrange(UP, buff=0)
            g.add(col)
        g.arrange(RIGHT, buff=0, aligned_edge=DOWN)
        return g

    def nuage(self, centre):
        c = np.array(centre, dtype=float)
        bulles = VGroup(*[Circle(radius=r, stroke_width=0).set_fill(GREY_B, opacity=1).move_to(c + d)
                          for r, d in ((0.45, LEFT * 0.5), (0.6, UP * 0.15), (0.45, RIGHT * 0.55),
                                       (0.35, RIGHT * 0.05 + DOWN * 0.15))])
        gouttes = VGroup(*[Line(c + [x, -0.6, 0], c + [x - 0.12, -1.05, 0], color=BLEU_CALCUL, stroke_width=5)
                           for x in (-0.6, -0.2, 0.2, 0.6)])
        return VGroup(bulles, gouttes)

    def flaque(self, centre):
        c = np.array(centre, dtype=float)
        sol = Line(c + LEFT * 1.0 + DOWN * 0.1, c + RIGHT * 1.0 + DOWN * 0.1, color=ORANGE_RETENUE, stroke_width=5)
        eau = Ellipse(width=1.3, height=0.32, stroke_width=0).set_fill(BLEU_CALCUL, opacity=0.9).move_to(c)
        return VGroup(sol, eau)

    # ── 00 · la page de garde : la ligne qui fait peur ──────────────────────

    def page_de_garde(self, titre, accroche="", promesse="", voix="00-garde"):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire(voix)
        t = Text(titre, font_size=56, color=JAUNE_TITRE).to_edge(UP, buff=0.7)
        identite = Text(self.identite, font_size=28).next_to(t, DOWN, buff=0.25)
        f = self.formule(60).move_to([-0.4, 1.0, 0])
        # ⭐ l'image de la première seconde porte la question : la ligne est déjà là
        self.play(FadeIn(t), FadeIn(identite), FadeIn(f), run_time=0.6)

        # ⭐ Frédéric, 04/10 : « elle te fait peur, il faut un schéma ». Chaque
        # morceau qui fait peur reçoit sa flèche et son « ? »…
        def mystere(cible, x):
            rond = Circle(radius=0.32, color=ORANGE_RETENUE, stroke_width=4).move_to([x, -0.75, 0])
            q = self.t("?", 34, ORANGE_RETENUE).move_to(rond)
            fl = Arrow(cible.get_bottom(), rond.get_top(), buff=0.12, color=ORANGE_RETENUE,
                       stroke_width=4, max_tip_length_to_length_ratio=0.25)
            return VGroup(fl, rond, q)

        self.au_mot("Un A à l'envers")
        m1 = mystere(f[0][0], f[0][0].get_x())
        self.play(Indicate(f[0][0], color=ORANGE_RETENUE, scale_factor=1.5), GrowArrow(m1[0]), FadeIn(m1[1:]))
        self.au_mot("un grand E bizarre")
        m2 = mystere(f[1][2], f[1][0].get_x())
        self.play(Indicate(f[1][0], color=ORANGE_RETENUE, scale_factor=1.3), GrowArrow(m2[0]), FadeIn(m2[1:]))
        self.au_mot("des lettres partout")
        m3 = mystere(f[2][1], f[2][1].get_x())
        self.play(Indicate(f[0][1], color=ORANGE_RETENUE), Indicate(f[1][3], color=ORANGE_RETENUE),
                  Indicate(f[2][1], color=ORANGE_RETENUE), GrowArrow(m3[0]), FadeIn(m3[1:]))
        self.au_mot("Elle te fait peur")
        peur = self.t("Elle te fait peur ?", 40, ORANGE_RETENUE).move_to([-0.4, -1.75, 0])
        self.play(Write(peur), *[Wiggle(m[1:]) for m in (m1, m2, m3)])

        # … puis les « ? » s'effacent : la ligne se TRADUIT en une phrase
        self.au_mot("une phrase en français")
        self.play(FadeOut(VGroup(m1, m2, m3, peur)), run_time=0.4)
        tr = Arrow([-0.4, f.get_bottom()[1] - 0.05, 0], [-0.4, -0.95, 0], buff=0, color=BLEU_CALCUL,
                   stroke_width=7, max_tip_length_to_length_ratio=0.3)
        lab = self.t("traduire", 26, BLEU_CALCUL).next_to(tr, RIGHT, buff=0.2)
        p = self.t("une phrase en français, écrite en raccourci", 32, WHITE).move_to([-0.4, -1.5, 0])
        cadre = SurroundingRectangle(p, color=BLEU_CALCUL, buff=0.22, corner_radius=0.15, stroke_width=3)
        self.play(GrowArrow(tr), FadeIn(lab))
        self.play(Create(cadre), FadeIn(p, shift=UP * 0.15))
        self.au_mot("tu sauras la lire")
        self.play(Write(self.chute("À la fin, tu sauras la lire à voix haute.", color=JAUNE_TITRE)))
        self.attendre_voix()

    # ── 00b · au programme, en une phrase ───────────────────────────────────

    def page_objectifs(self, objectifs=None, voix="00b-objectifs"):
        self.clear()
        self.add_mascotte()
        self.dire(voix)
        self.play(Write(Text("Au programme", font_size=44, color=JAUNE_TITRE).to_edge(UP, buff=0.75)))
        for i, (mots, symboles) in enumerate(AU_PROGRAMME):
            y = 1.6 - i * 1.25
            self.au_mot(mots)
            s = self.m(symboles, 52, BLEU_CALCUL).move_to([-4.3, y, 0])
            w = self.t(mots, 28).next_to([-1.9, y, 0], RIGHT, buff=0)
            self.play(FadeIn(s, scale=1.3), FadeIn(w, shift=RIGHT * 0.2), run_time=0.5)
        self.attendre_voix()

    # ── 01 · pourquoi des symboles ──────────────────────────────────────────

    def ecran_pourquoi(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-pourquoi")
        self.titre_ecran("Pourquoi des symboles ?")
        self.au_mot("Au lieu de x plus 3")
        # VU AU RENDU : à −3,4 la phrase encadrée touchait le 5.
        court = self.m("x + 3 = 5", 72, BLEU_CALCUL).move_to([-4.7, 1.4, 0])
        self.play(GrowFromCenter(court))
        self.au_mot("on lisait")
        long = self.t("« une chose, plus trois, est égale à cinq »", 28, GREY_B).move_to([2.9, 1.4, 0])
        cadre = SurroundingRectangle(long, color=GREY_B, buff=0.25, stroke_width=2)
        self.play(FadeIn(long, shift=LEFT * 0.3), Create(cadre))
        self.au_mot("Même le signe égal")
        self.play(Indicate(court, color=JAUNE_TITRE))
        self.au_mot("en 1557")
        an = self.t("1557", 64, ORANGE_RETENUE).move_to([-3.6, -0.8, 0])
        self.play(GrowFromCenter(an))
        self.au_mot("Robert Recorde")
        nom = self.t("Robert Recorde", 34).next_to(an, DOWN, buff=0.3)
        self.play(FadeIn(nom, shift=UP * 0.15))
        self.au_mot("deux traits parallèles")
        l1 = Line([0.6, -0.55, 0], [4.6, -0.55, 0], color=VERT_OK, stroke_width=10)
        l2 = Line([0.6, -1.25, 0], [4.6, -1.25, 0], color=VERT_OK, stroke_width=10)
        self.play(Create(l1), Create(l2), run_time=0.8)
        egal = self.m("=", 120, VERT_OK).move_to([2.6, -0.9, 0])
        self.play(ReplacementTransform(VGroup(l1, l2), egal), run_time=0.9)
        self.au_mot("Un symbole n'est pas")
        self.play(Write(self.chute("Un symbole = une abréviation", color=JAUNE_TITRE, font_size=34)))
        self.attendre_voix()

    # ── 02 · les poupées russes ─────────────────────────────────────────────

    def ecran_ensembles(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-ensembles")
        self.titre_ecran("Les ensembles de nombres")
        cx, cy = -2.4, -0.15
        poupees = [
            # (extrait, lettre, demi-axes, couleur, extrait exemple, exemple, légende)
            ("N, les entiers naturels", "ℕ", (1.05, 0.8), BLEU_CALCUL, "0, 1, 2, 3", "0  1  2  3", "entiers naturels"),
            ("Z, on ajoute", "ℤ", (1.9, 1.3), VERT_OK, "moins 2", "−2", "+ les négatifs"),
            ("D, les décimaux", "𝔻", (2.75, 1.8), ORANGE_RETENUE, "0,75", "0,75", "décimaux"),
            ("Q, les rationnels", "ℚ", (3.6, 2.3), VIOLET, "un tiers", None, "rationnels = fractions"),
            ("R, les réels", "ℝ", (4.45, 2.8), JAUNE_TITRE, "racine de 2", "√2\nπ", "réels : toute la droite"),
        ]
        a_prec = 0.0
        for i, (extrait, lettre, (a, b), coul, ex_mot, ex, legende) in enumerate(poupees):
            self.au_mot(extrait)
            e = Ellipse(width=2 * a, height=2 * b, color=coul, stroke_width=4).move_to([cx, cy, 0])
            if i == 0:
                lab = self.m(lettre, 40, coul).move_to([cx, cy + 0.35, 0])
            else:
                lab = self.m(lettre, 36, coul).move_to([cx, cy + b - 0.27, 0])
            leg = VGroup(self.m(lettre, 34, coul), self.t(legende, 24, coul)).arrange(RIGHT, buff=0.25)
            leg.move_to([4.3, 2.2 - i * 0.85, 0]).align_to(np.array([2.55, 0, 0]), LEFT)
            self.play(Create(e), FadeIn(lab, scale=1.3), FadeIn(leg, shift=LEFT * 0.2), run_time=0.7)
            self.au_mot(ex_mot)
            if i == 0:
                x_ex, y_ex = cx, cy - 0.25
            else:
                x_ex, y_ex = cx - (a_prec + a) / 2, cy
            if ex is None:
                exm = self.frac("1", "3", 26, coul).move_to([x_ex, y_ex, 0])
            else:
                exm = VGroup(*[self.m(l, 24 if i else 26, coul) for l in ex.split("\n")]).arrange(DOWN, buff=0.15)
                exm.move_to([x_ex, y_ex, 0])
            self.play(FadeIn(exm, scale=1.3), run_time=0.4)
            a_prec = a
        self.au_mot("Chaque poupée")
        self.play(Write(self.chute("Chaque poupée contient la précédente.", color=WHITE)))
        self.attendre_voix()

    # ── 03 · appartient / inclus dans ───────────────────────────────────────

    def ecran_appartient(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-appartient")
        self.titre_ecran("Appartient, inclus dans")
        club = RoundedRectangle(width=5.2, height=4.6, corner_radius=0.4, color=VERT_OK, stroke_width=4)
        club.move_to([-3.7, -0.3, 0])
        lz = self.m("ℤ", 40, VERT_OK).move_to(club.get_corner(UL) + [0.45, -0.45, 0])
        cz = self.t("le club", 22, VERT_OK).next_to(lz, RIGHT, buff=0.2)
        equipe = Ellipse(width=3.0, height=2.2, color=BLEU_CALCUL, stroke_width=4).move_to([-3.5, -0.7, 0])
        ln = self.m("ℕ", 36, BLEU_CALCUL).move_to(equipe.get_top() + DOWN * 0.38)
        ce = self.t("l'équipe", 22, BLEU_CALCUL).next_to(equipe, DOWN, buff=0.12)
        joueur = Dot([-3.7, -0.75, 0], radius=0.12, color=ORANGE_RETENUE)
        l3 = self.m("3", 34, ORANGE_RETENUE).next_to(joueur, RIGHT, buff=0.15)
        # VU AU RENDU : à gauche du point, « un joueur » mordait sur l'ellipse.
        cj = self.t("un joueur", 20, ORANGE_RETENUE).next_to(joueur, DOWN, buff=0.15)
        self.play(Create(club), FadeIn(lz), Create(equipe), FadeIn(ln), run_time=0.8)

        self.au_mot("3 appartient à N")
        n1 = self.m("3 ∈ ℕ", 64, VERT_OK).move_to([2.6, 2.0, 0])
        self.play(Write(n1), FadeIn(joueur, scale=1.5), FadeIn(l3))
        s1 = self.t("« appartient à » : 3 est UN élément de ℕ", 22).next_to(n1, DOWN, buff=0.15)
        self.play(FadeIn(s1))
        self.au_mot("un joueur dans une équipe")
        self.play(FadeIn(cj), FadeIn(ce), Indicate(joueur, color=ORANGE_RETENUE, scale_factor=2))

        self.au_mot("N est inclus dans Z")
        n2 = self.m("ℕ ⊂ ℤ", 64, VERT_OK).move_to([2.6, 0.15, 0])
        self.play(Write(n2))
        s2 = self.t("« inclus dans » : ℕ tout entier est un morceau de ℤ", 22).next_to(n2, DOWN, buff=0.15)
        self.play(FadeIn(s2), Indicate(equipe, color=BLEU_CALCUL))
        self.au_mot("une équipe dans un club")
        self.play(FadeIn(cz), Indicate(club, color=VERT_OK, scale_factor=1.05))

        self.au_mot("Le piège")
        n3 = self.m("3 ⊂ ℕ", 60).move_to([2.6, -1.75, 0])
        self.play(FadeIn(n3))
        self.play(Create(self.barrer(n3)))
        self.au_mot("Un joueur n'est pas")
        s3 = self.t("3 est un nombre, pas un ensemble", 22, ROUGE_ERREUR).next_to(n3, DOWN, buff=0.2)
        self.play(FadeIn(s3))
        self.attendre_voix()

    # ── 04 · pour tout ──────────────────────────────────────────────────────

    def ecran_pour_tout(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-pour-tout")
        self.titre_ecran("Pour tout")
        self.au_mot("Ce A à l'envers")
        s = self.retourner("A", "∀", [-5.2, 1.5, 0], "tour")
        self.au_mot("pour tout")
        lu = self.t("se lit « pour tout », « quel que soit »", 28).move_to([-3.9, 1.85, 0]).align_to(np.array([-4.1, 0, 0]), LEFT)
        self.play(FadeIn(lu, shift=LEFT * 0.2))
        self.au_mot("All")
        al = self.t("A comme « All » = « tous »", 26, BLEU_CALCUL).next_to(lu, DOWN, buff=0.25).align_to(lu, LEFT)
        self.play(FadeIn(al))

        self.au_mot("Pour tout x appartenant")
        e1 = self.m("∀ x ∈ ℝ,  x² ≥ 0", 54, VERT_OK).move_to([-2.7, -0.2, 0])
        self.play(Write(e1))
        ax = Axes(x_range=[-1.6, 1.6, 1], y_range=[-0.4, 2.4, 1], x_length=3.0, y_length=2.2,
                  tips=False, axis_config={"include_numbers": False, "stroke_width": 2})
        ax.move_to([4.2, 0.0, 0])
        courbe = ax.plot(lambda x: x * x, x_range=[-1.5, 1.5], color=VERT_OK, stroke_width=5)
        self.play(Create(ax), run_time=0.5)
        self.play(Create(courbe), run_time=0.9)
        self.au_mot("n'importe quel nombre")
        # VU AU RENDU : centrée sous la formule, la phrase sortait du cadre à gauche.
        tr = self.t("n'importe quel nombre, au carré, donne un résultat positif ou nul", 20).move_to([-1.3, -0.95, 0])
        self.play(FadeIn(tr), Indicate(courbe, color=VERT_OK))

        self.au_mot("un seul contre-exemple")
        self.play(Write(self.chute("Un seul contre-exemple suffit à le démolir.", color=ORANGE_RETENUE, font_size=28)))
        self.au_mot("Pour tout x, x au carré est plus grand")
        e2 = self.m("∀ x,  x² > x  ?", 48).move_to([-3.4, -1.9, 0])
        self.play(FadeIn(e2))
        self.au_mot("avec x égale 0,5")
        ce = self.m("x = 0,5  :  x² = 0,25", 44, ROUGE_ERREUR).move_to([2.0, -1.9, 0])
        self.play(FadeIn(ce, shift=LEFT * 0.2))
        self.play(Create(self.barrer(e2)))
        self.attendre_voix()

    # ── 05 · il existe ──────────────────────────────────────────────────────

    def ecran_il_existe(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-il-existe")
        self.titre_ecran("Il existe")
        self.au_mot("Ce E à l'envers")
        self.retourner("E", "∃", [-5.2, 1.5, 0], "miroir")
        self.au_mot("il existe")
        lu = self.t("se lit « il existe »", 28).move_to([0, 1.85, 0]).align_to(np.array([-4.1, 0, 0]), LEFT)
        self.play(FadeIn(lu, shift=LEFT * 0.2))
        self.au_mot("Exists")
        ex = self.t("E comme « Exists »", 26, BLEU_CALCUL).next_to(lu, DOWN, buff=0.25).align_to(lu, LEFT)
        self.play(FadeIn(ex))

        self.au_mot("Il existe n")
        e1 = self.m("∃ n ∈ ℕ,  n² = 49", 56, VERT_OK).move_to([-2.8, -0.2, 0])
        self.play(Write(e1))
        self.au_mot("n égale 7")
        g = self.grille(7, 7, 0.3, VERT_OK).move_to([3.9, 0.55, 0])
        self.play(LaggedStart(*[FadeIn(c, scale=0.5) for c in g], lag_ratio=0.02), run_time=1.2)
        lab = self.m("n = 7  :  7 × 7 = 49", 34, VERT_OK).next_to(g, DOWN, buff=0.25)
        self.play(FadeIn(lab))
        self.play(Create(self.coche().next_to(lab, RIGHT, buff=0.25)))

        self.au_mot("AU MOINS UN")
        amu = self.t("« il existe » = AU MOINS UN", 36, ORANGE_RETENUE).move_to([-2.8, -1.55, 0])
        self.play(GrowFromCenter(amu))
        self.au_mot("plusieurs")
        pl = self.t("il peut y en avoir plusieurs", 24, ORANGE_RETENUE).next_to(amu, DOWN, buff=0.15)
        self.play(FadeIn(pl))
        self.au_mot("un seul exemple")
        self.play(Write(self.chute("Un seul exemple suffit à le prouver.", color=VERT_OK, font_size=28)))
        self.attendre_voix()

    # ── 06 · les flèches ────────────────────────────────────────────────────

    def ecran_fleches(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-fleches")
        titre = self.titre_ecran("Les flèches")
        self.au_mot("La flèche simple")
        imp = self.m("⇒", 90, VERT_OK).move_to([-5.4, 1.85, 0])
        lu = self.t("se lit « implique »", 28, VERT_OK).next_to(imp, RIGHT, buff=0.3)
        self.play(FadeIn(imp, scale=1.4), FadeIn(lu))
        self.au_mot("x égale 3 implique")
        e1 = self.m("x = 3  ⇒  x² = 9", 50, VERT_OK).move_to([-3.0, 0.75, 0])
        self.play(Write(e1))
        ok1 = self.coche().next_to(e1, RIGHT, buff=0.3)
        self.play(Create(ok1))
        self.au_mot("on ne peut pas la retourner")
        e2 = self.m("x² = 9  ⇏  x = 3", 50, ROUGE_ERREUR).move_to([-3.0, -0.35, 0])
        self.play(Write(e2))
        # le dessin : −3 et 3 tombent tous les deux sur 9
        p3 = self.m("3", 40, BLEU_CALCUL).move_to([4.6, -0.5, 0])
        pm3 = self.m("−3", 40, ORANGE_RETENUE).move_to([2.4, -0.5, 0])
        neuf = self.m("9", 48, WHITE).move_to([3.5, 1.5, 0])
        f1 = Arrow(p3.get_top(), neuf.get_bottom(), buff=0.12, color=BLEU_CALCUL, stroke_width=5)
        lab = self.t("au carré", 22, GREY_B).move_to([3.5, 2.25, 0])
        self.play(FadeIn(p3), FadeIn(neuf), GrowArrow(f1), FadeIn(lab))
        self.au_mot("x peut aussi valoir moins 3")
        f2 = Arrow(pm3.get_top(), neuf.get_bottom(), buff=0.12, color=ORANGE_RETENUE, stroke_width=5)
        self.play(FadeIn(pm3, scale=1.4), GrowArrow(f2))
        c = self.m("car (−3)² = 9 aussi", 30, ORANGE_RETENUE).next_to(e2, DOWN, buff=0.15)
        self.play(FadeIn(c))

        self.au_mot("La double flèche")
        e3 = self.m("x + 2 = 5  ⇔  x = 3", 50, BLEU_CALCUL).move_to([-2.6, -1.85, 0])
        self.play(Write(e3))
        s3 = self.t("« équivaut à » : dans les deux sens", 24, BLEU_CALCUL).move_to([3.3, -1.85, 0])
        self.play(FadeIn(s3, shift=LEFT * 0.2))

        # la réciproque : on fait place nette, la pluie prend tout l'écran
        self.au_mot("Confondre les deux")
        self.play(*[FadeOut(mob) for mob in (imp, lu, e1, ok1, e2, p3, pm3, neuf, f1, f2, lab, c, e3, s3)],
                  run_time=0.5)
        rec = self.t("L'erreur de la réciproque", 36, ORANGE_RETENUE).move_to([0, 2.2, 0])
        self.play(Write(rec))
        self.au_mot("S'il pleut")
        n = self.nuage([-4.2, 0.9, 0])
        fl1 = self.m("⇒", 80, VERT_OK).move_to([-1.6, 0.6, 0])
        fq = self.flaque([1.2, 0.3, 0])
        self.play(FadeIn(n, shift=DOWN * 0.2))
        self.play(FadeIn(fl1, scale=1.3), FadeIn(fq))
        l1 = self.t("il pleut  ⇒  le sol est mouillé", 30, VERT_OK).move_to([-1.4, -0.9, 0])
        self.play(FadeIn(l1))
        self.play(Create(self.coche().next_to(l1, RIGHT, buff=0.3)))
        self.au_mot("Mais si le sol")
        l2 = self.t("le sol est mouillé  ⇏  il a plu", 30, ROUGE_ERREUR).move_to([-1.4, -1.9, 0])
        self.play(FadeIn(l2))
        self.play(Create(self.barrer(l2)))
        self.attendre_voix()

    # ── 07 · sigma ──────────────────────────────────────────────────────────

    def ecran_somme(self):
        self.clear()
        self.add_mascotte()
        self.dire("07-somme")
        self.titre_ecran("Le grand sigma")
        self.au_mot("lettre grecque sigma")
        sg = self.sigma("4", "k = 1", "k", 72, couleurs=(VIOLET, ORANGE_RETENUE, BLEU_CALCUL))
        sg.move_to([-3.6, 0.9, 0])
        self.play(FadeIn(sg[0], scale=1.4))
        nom = self.t("Σ = sigma, le S de « somme »", 28).move_to([2.4, 2.2, 0])
        self.play(FadeIn(nom))
        self.au_mot("addition répétée")
        self.play(Indicate(sg[0], color=JAUNE_TITRE))
        self.au_mot("En bas")
        self.play(FadeIn(sg[2], shift=UP * 0.2))
        nb = self.t("où l'on commence", 22, ORANGE_RETENUE).next_to(sg[2], DOWN, buff=0.15)
        self.play(FadeIn(nb))
        self.au_mot("En haut")
        self.play(FadeIn(sg[1], shift=DOWN * 0.2))
        nh = self.t("où l'on s'arrête", 22, VIOLET).next_to(sg[1], LEFT, buff=0.3)
        self.play(FadeIn(nh))
        self.au_mot("À droite")
        self.play(FadeIn(sg[3], shift=LEFT * 0.2))
        nd = self.t("ce qu'on additionne", 22, BLEU_CALCUL).next_to(sg[3], RIGHT, buff=0.3)
        self.play(FadeIn(nd))
        self.au_mot("c'est 1 plus 2")
        dev = self.m("= 1 + 2 + 3 + 4", 52).move_to([-2.4, -1.15, 0])
        esc = self.escalier(4, 0.42).move_to([3.6, 0.0, 0]).align_to(np.array([0, -0.9, 0]), DOWN)
        self.play(Write(dev))
        self.play(LaggedStart(*[FadeIn(col, shift=UP * 0.2) for col in esc], lag_ratio=0.35), run_time=1.4)
        self.au_mot("Dix")
        dix = self.m("= 10", 60, VERT_OK).next_to(dev, RIGHT, buff=0.3)
        lab = self.m("10 cases", 30, VERT_OK).next_to(esc, DOWN, buff=0.2)
        self.play(GrowFromCenter(dix), FadeIn(lab))
        self.au_mot("Son cousin")
        pr = self.sigma("4", "k = 1", "k", 40)
        pr[0].become(self.m("∏", 40 * 1.6).move_to(pr[0]))
        ligne = VGroup(pr, self.m("= 1 × 2 × 3 × 4", 36)).arrange(RIGHT, buff=0.3).move_to([-2.4, -2.6, 0])
        np_ = self.t("le grand pi : des multiplications", 22, GREY_B).next_to(ligne, RIGHT, buff=0.4)
        self.play(FadeIn(ligne), FadeIn(np_))
        self.attendre_voix()

    # ── 08 · la valeur absolue ──────────────────────────────────────────────

    def ecran_valeur_absolue(self):
        self.clear()
        self.add_mascotte()
        self.dire("08-valeur-absolue")
        self.titre_ecran("La valeur absolue")
        self.au_mot("les deux barres droites")
        b = self.m("| x |", 90, JAUNE_TITRE).move_to([-4.6, 1.8, 0])
        self.play(FadeIn(b, scale=1.3))
        self.au_mot("la distance entre")
        d = self.t("= la distance entre x et zéro", 30).next_to(b, RIGHT, buff=0.4)
        self.play(FadeIn(d))
        axe, pt = self.droite(-6, 6, 12, {-5: "−5", 0: "0", 3: "3"}, longueur=11.0, centre=(-0.3, -0.2))
        self.play(Create(axe), run_time=0.8)
        self.au_mot("Valeur absolue de moins 5")
        p5 = Dot(pt(-5), color=ORANGE_RETENUE, radius=0.12)
        self.play(FadeIn(p5, scale=1.5))
        sauts = VGroup(*[ArcBetweenPoints(pt(-5 + i), pt(-4 + i), angle=-PI / 2, color=ORANGE_RETENUE, stroke_width=4)
                         for i in range(5)])
        self.play(LaggedStart(*[Create(s) for s in sauts], lag_ratio=0.5), run_time=1.6)
        v5 = self.m("|−5| = 5", 52, ORANGE_RETENUE).move_to([pt(-2.5)[0], 0.9, 0])
        self.play(Write(v5))
        self.au_mot("Valeur absolue de 3")
        p3 = Dot(pt(3), color=BLEU_CALCUL, radius=0.12)
        sauts3 = VGroup(*[ArcBetweenPoints(pt(i), pt(i + 1), angle=-PI / 2, color=BLEU_CALCUL, stroke_width=4)
                          for i in range(3)])
        self.play(FadeIn(p3, scale=1.5))
        self.play(LaggedStart(*[Create(s) for s in sauts3], lag_ratio=0.5), run_time=1.0)
        v3 = self.m("|3| = 3", 52, BLEU_CALCUL).move_to([pt(1.5)[0], 0.9, 0])
        self.play(Write(v3))
        self.au_mot("jamais négative")
        self.play(Write(self.chute("Une distance n'est jamais négative.", color=VERT_OK, font_size=32)))
        self.attendre_voix()

    # ── 08b · le récapitulatif, à garder ────────────────────────────────────

    def ecran_recap(self):
        """⭐ Frédéric, 04/10 : « fais le résumé des symboles ». Le tableau à
        photographier : le symbole, et comment il se lit."""
        self.clear()
        self.dire("08b-recap")
        self.titre_ecran("Le récapitulatif, à garder")
        self.play(Create(Line([0.5, 2.6, 0], [0.5, -2.8, 0], color=GREY_D, stroke_width=2)), run_time=0.3)
        for i, (extrait, symb, lecture, coul) in enumerate(RECAP):
            col, rang = divmod(i, 5)
            # VU AU RENDU : la colonne de droite mordait sur les lectures de gauche.
            x, decal = (-6.9, 2.4) if col == 0 else (1.4, 1.4)
            y = 2.2 - rang * 1.15
            self.au_mot(extrait)
            s = self.m(symb, 32 if len(symb) > 5 else 52, coul)
            s.move_to([x, y, 0]).align_to(np.array([x, 0, 0]), LEFT)
            l = self.t(lecture, 25).move_to([0, y, 0]).align_to(np.array([x + decal, 0, 0]), LEFT)
            self.play(FadeIn(s, scale=1.3), FadeIn(l, shift=RIGHT * 0.15), run_time=0.45)
        self.attendre_voix(marge=1.5)

    # ── 11 · la clôture, symboles en Cambria Math ───────────────────────────

    def page_finale(self, points, rappel, voix="11-finale"):
        """Celle du gabarit, mais les symboles passent par Cambria Math.
        VU AU RENDU : en police par défaut, ⇒ et ⇔ sortaient minuscules."""
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire(voix)
        titre = Text("Tu sais maintenant", font_size=44, color=JAUNE_TITRE).to_edge(UP)
        lignes = VGroup()
        for mots, symb in points:
            lignes.add(VGroup(self.coche(), self.t(mots, 26), self.m(symb, 34, BLEU_CALCUL))
                       .arrange(RIGHT, buff=0.3))
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.4).move_to([0, 0.75, 0])
        piege = Text(rappel, font_size=27, color=ORANGE_RETENUE).move_to([0, -1.55, 0])
        cadre = SurroundingRectangle(piege, color=ORANGE_RETENUE, buff=0.25, stroke_width=2)
        signature = Text(SIGNATURE, font_size=25, color=VERT_OK).to_edge(DOWN, buff=0.85)
        self.play(Write(titre))
        for l in lignes:
            self.play(FadeIn(l, shift=RIGHT * 0.2), run_time=0.5)
        self.play(Write(piege), Create(cadre))
        self.play(Flash(piege, color=ORANGE_RETENUE, line_length=0.25))
        self.play(FadeIn(signature))
        self.attendre_voix(marge=1.0)

    # ── 09 · le défi, puis la correction ────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte()
        self.dire("09-defi")
        self.titre_ecran("À toi !")
        f = self.formule(64).move_to([-0.4, 0.7, 0])
        self.play(FadeIn(f, scale=1.1))
        self.au_mot("lis-la en français")
        q = self.t("Lis-la en français.", 40, BLEU_CALCUL).move_to([-0.4, -1.0, 0])
        self.play(GrowFromCenter(q))
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=34)))
        self.attendre_voix(marge=2.5)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("10-correction")
        self.titre_ecran("Correction")
        # VU AU RENDU : serrées, les trois traductions se chevauchaient — on écarte.
        f = self.formule(56, buff=1.5).move_to([-0.4, 1.9, 0])
        self.add(f)
        self.au_mot("Pour tout n appartenant")
        t1 = self.t("pour n'importe quel\nentier naturel n", 22, BLEU_CALCUL).next_to(f[0], DOWN, buff=0.6)
        self.play(Indicate(f[0], color=BLEU_CALCUL), FadeIn(t1))
        self.au_mot("La somme de k")
        t2 = self.m("1 + 2 + 3 + … + n", 26, VIOLET).next_to(f[1], DOWN, buff=0.35)
        self.play(Indicate(f[1], color=VIOLET), FadeIn(t2))
        self.au_mot("Égale n fois")
        t3 = self.t("n fois (n + 1),\ndivisé par 2", 22, ORANGE_RETENUE).next_to(f[2], DOWN, buff=0.35)
        self.play(Indicate(f[2], color=ORANGE_RETENUE), FadeIn(t3))
        self.au_mot("Vérifions avec n égale 4")
        v1 = self.m("n = 4  :  1 + 2 + 3 + 4 = 10", 40).move_to([-2.6, -1.0, 0])
        self.play(Write(v1))
        self.au_mot("Et 4 fois 5")
        # le rectangle 4 × 5 : l'escalier 1 + 2 + 3 + 4 en occupe exactement la moitié
        g = self.grille(4, 5, 0.38, BLEU_CALCUL, pleines=lambda i, j: j <= i).move_to([4.2, -1.1, 0])
        v2 = self.m("(4 × 5) / 2 = 10", 40).move_to([-2.6, -2.0, 0])
        self.play(Write(v2), FadeIn(g))
        lg = self.t("20 cases, la moitié : 10", 20, BLEU_CALCUL).next_to(g, UP, buff=0.15)
        self.play(FadeIn(lg))
        self.play(Create(self.coche().next_to(v2, RIGHT, buff=0.3)))
        self.au_mot("La ligne qui faisait peur")
        self.play(Write(self.chute("La ligne qui faisait peur, ce n'était que ça.", color=VERT_OK, font_size=28)))
        self.attendre_voix()

    # ── 12 · la fin : la question en commentaire, le coach, l'abonnement ────

    def page_abonnement(self, voix="12-abonne"):
        self.clear()
        self.dire(voix)
        self.add_mascotte(scale=0.9)
        q = Text("Quel symbole t'a le plus bloqué ?", font_size=36, color=ORANGE_RETENUE).move_to([0, 2.85, 0])
        q2 = Text("Dis-le en commentaire", font_size=28, color=ORANGE_RETENUE).next_to(q, DOWN, buff=0.2)
        entraine = Text("Entraîne-toi sur le coach", font_size=40, color=JAUNE_TITRE).move_to([0, 1.0, 0])
        site = Text("eleveai.fr", font_size=54, color=BLEU_CALCUL).move_to([0, 0.05, 0])
        cadre = SurroundingRectangle(site, color=BLEU_CALCUL, buff=0.24, stroke_width=3)
        abonne = Text("Abonne-toi à la chaîne !", font_size=36, color=VERT_OK).move_to([0, -1.4, 0])
        poignee = Text("@eleveai974", font_size=44, color=VERT_OK).move_to([0, -2.3, 0])
        self.play(FadeIn(q, shift=DOWN * 0.15), FadeIn(q2))
        self.au_mot("Entraîne-toi")
        self.play(Write(entraine))
        self.play(GrowFromCenter(site), Create(cadre))
        self.au_mot("abonne-toi")
        self.play(FadeIn(abonne, shift=UP * 0.15))
        self.play(GrowFromCenter(poignee))
        self.play(Flash(poignee, color=VERT_OK, line_length=0.3))
        self.attendre_voix(marge=1.4)

    def construct(self):
        self.page_de_garde(titre="Symboles et notations")
        self.page_objectifs()
        self.ecran_pourquoi()
        self.ecran_ensembles()
        self.ecran_appartient()
        self.ecran_pour_tout()
        self.ecran_il_existe()
        self.ecran_fleches()
        self.ecran_somme()
        self.ecran_valeur_absolue()
        self.ecran_recap()
        self.ecran_defi()
        self.ecran_correction()
        self.page_finale(
            points=AU_PROGRAMME,
            rappel="Un symbole n'est qu'une phrase écrite en raccourci.",
            voix="11-finale",
        )
        self.page_abonnement()
