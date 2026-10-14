# expression_traduire.py
# EleveAI — Maths 4e — Expression littérale, épisode 2 : traduire une phrase
# en expression (notionId : litteral_expression, micro : litteral_expression_traduire),
# AVEC VOIX. Paysage ceinture ORANGE ; short jumeau (ceinture blanche) :
# expression_traduire_short.py.
#
# ⭐ LE DESSIN QUI PORTE TOUT : le JARDIN CRÉOLE vu de dessus, longueur a,
# largeur b. La clôture se trace côté par côté pendant « a plus b plus a plus b »,
# puis se regroupe en 2 × (a + b) : le double de la somme.
# Puis : 4 cartes de vocabulaire qui se retournent (somme, différence, produit,
# quotient), les BOÎTES EMBOÎTÉES (la boîte extérieure = l'opération faite en
# dernier = le premier mot de la phrase), la comparaison pour x = 4 (14 ≠ 11)
# et le cinéma (8n + 5, puis 8n + 5n = 13n).
# Couleurs : coefficient VERT, terme constant ORANGE, lettre JAUNE ;
# boîte « × » VERTE, boîte « + / − » BLEUE. ⛔ Division : « ÷ », jamais « / ».
#
# Défi : le triple de y diminué de 5 (3y − 5) ; le triple de la différence de
# y et 5 (3 × (y − 5)).
#
# Voix : manim/voix/4e-expression-traduire.json (Julie, débit −7), validée.
# Rendu : python -m manim render -qh --disable_caching manim/scripts/4e/expression_traduire.py ExpressionTraduire4e -o eleveai-maths-4e-expression-traduire --media_dir manim/scripts/4e/media
# Puis copier le mp4 dans manim/sorties/4e/maths/expression-litterale/02-traduire/.

import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parent))
sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "seconde"))

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Notion6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

COUL_COEF = VERT_OK
COUL_CONST = ORANGE_RETENUE
COUL_X = JAUNE_TITRE
COUL_FOIS = VERT_OK        # la boîte d'un produit
COUL_PLUS = BLEU_CALCUL    # la boîte d'une somme ou d'une différence
TERRE = "#3F7D20"
BOIS = "#E7C9A0"
POPCORN = "#FEF3C7"


class Notion4e(Notion6e):
    identite = "Maths 4e — EleveAI"


def P(x, y):
    return np.array([x, y, 0.0])


class ExpressionTraduire4e(Notion4e):
    nom_voix = "4e-expression-traduire"

    def t(self, texte, font_size=36, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def ligne(self, morceaux, font_size=40, buff=None):
        """Une ligne faite de morceaux (texte, couleur[, "colle"]), écrite d'UN
        seul Text (la ligne de base reste droite) puis découpée par morceau.
        Un morceau marqué « colle » se pose contre le précédent (2x, parenthèses)."""
        chaine, tranches, i = "", [], 0
        for k, m in enumerate(morceaux):
            if k and not (len(m) > 2 and m[2] == "colle"):
                chaine += " "
                i += 1  # sans ligatures, l'espace est un glyphe (vide)
            chaine += m[0]
            n = len(m[0])
            tranches.append((i, i + n, m[1]))
            i += n
        txt = Text(chaine, font_size=font_size, disable_ligatures=True)
        g = VGroup()
        for a, b, c in tranches:
            g.add(VGroup(*txt.submobjects[a:b]).set_color(c))
        return g

    def boite(self, mob, color, buff=0.15):
        return SurroundingRectangle(mob, color=color, buff=buff, corner_radius=0.12, stroke_width=4)

    def insiste(self, mob, k=1.5, rt=0.45):
        self.play(mob.animate.scale(k), run_time=rt)
        self.play(mob.animate.scale(1 / k), run_time=rt)

    # ── les dessins ─────────────────────────────────────────────────────────

    def jardin(self, so, ne):
        """Le jardin créole vu de dessus : de la terre, des rangs de brèdes, des piments."""
        larg, haut = ne[0] - so[0], ne[1] - so[1]
        fond = Rectangle(width=larg, height=haut, stroke_width=0, fill_color=TERRE,
                         fill_opacity=0.55).move_to((so + ne) / 2)
        plants = VGroup()
        nx, ny = 7, 4
        for i in range(nx):
            for j in range(ny):
                x = so[0] + larg * (i + 0.5) / nx
                y = so[1] + haut * (j + 0.5) / ny
                rouge = (i + 2 * j) % 5 == 0
                plants.add(Circle(radius=0.09 if rouge else 0.13,
                                  fill_color="#DC2626" if rouge else "#86EFAC", fill_opacity=0.9,
                                  stroke_width=0).move_to(P(x, y)))
        return VGroup(fond, plants)

    def ticket(self):
        corps = RoundedRectangle(width=2.3, height=1.25, corner_radius=0.12, stroke_color=WHITE,
                                 stroke_width=2, fill_color="#BE123C", fill_opacity=1)
        trous = VGroup(*[Circle(radius=0.16, fill_color=BLACK,
                                fill_opacity=1, stroke_width=0).move_to(corps.get_edge_center(s))
                         for s in (LEFT, RIGHT)])
        pointilles = DashedLine(P(0.55, -0.55), P(0.55, 0.55), color=WHITE, stroke_width=2)
        mot = self.t("CINÉMA", 20, WHITE).move_to(P(-0.2, 0))
        return VGroup(corps, trous, pointilles, mot)

    def pop_corn(self):
        cornet = Polygon(P(-0.55, 0.35), P(0.55, 0.35), P(0.38, -0.75), P(-0.38, -0.75),
                         stroke_color=WHITE, stroke_width=2, fill_color=WHITE, fill_opacity=1)
        bandes = VGroup()
        for x0, x1 in [(-0.42, -0.26), (-0.08, 0.08), (0.26, 0.42)]:
            bandes.add(Polygon(P(x0 - 0.05, 0.35), P(x1 - 0.05, 0.35), P(x1 * 0.7, -0.75), P(x0 * 0.7, -0.75),
                               stroke_width=0, fill_color="#DC2626", fill_opacity=1))
        grains = VGroup(*[Circle(radius=0.16, fill_color=POPCORN, fill_opacity=1, stroke_color="#F59E0B",
                                 stroke_width=1.5).move_to(P(x, y))
                          for x, y in [(-0.4, 0.45), (-0.13, 0.5), (0.15, 0.48), (0.4, 0.45),
                                       (-0.27, 0.68), (0.02, 0.72), (0.28, 0.68), (-0.1, 0.9), (0.15, 0.88)]])
        return VGroup(cornet, bandes, grains)

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("Traduire une phrase en expression", 50, JAUNE_TITRE).to_edge(UP, buff=0.7)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.25)
        ech = echelle_ceintures("orange").move_to(P(-0.6, -2.4))
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech))
        self.au_mot("Comment écrire")
        q = self.ligne([("le double", COUL_FOIS), ("de la somme", COUL_PLUS), ("de", WHITE),
                        ("a", COUL_X), ("et", WHITE), ("b", COUL_X), ("?", WHITE)], 46)
        q.move_to(P(-0.6, 0.4))
        self.play(FadeIn(q, shift=UP * 0.2))
        self.insiste(q, 1.3, 0.5)
        self.attendre_voix(marge=1.5)

    # ── 01 : le jardin ──────────────────────────────────────────────────────

    def ecran_jardin(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-jardin")
        self.titre_ecran("Le jardin créole")
        so, se, ne, no = P(-5.9, -0.9), P(-1.7, -0.9), P(-1.7, 1.6), P(-5.9, 1.6)
        self.au_mot("Un jardin créole")
        jardin = self.jardin(so, ne)
        self.play(FadeIn(jardin, shift=DOWN * 0.2))
        self.au_mot("longueur a")
        la = self.t("a", 48, COUL_X).next_to(Line(so, se), DOWN, buff=0.15)
        self.play(GrowFromCenter(la))
        self.au_mot("largeur b")
        lb = self.t("b", 48, COUL_X).next_to(Line(se, ne), RIGHT, buff=0.18)
        self.play(GrowFromCenter(lb))
        self.au_mot("Pour la clôture")
        poteau = Dot(so, radius=0.12, color=BOIS)
        self.play(FadeIn(poteau, scale=2))
        # la clôture, côté par côté, et l'expression qui s'écrit en même temps
        tour = self.ligne([("a", COUL_X), ("+", WHITE), ("b", COUL_X), ("+", WHITE),
                           ("a", COUL_X), ("+", WHITE), ("b", COUL_X)], 60)
        tour.move_to(P(2.0, 0.9))
        termes = [VGroup(tour[0]), VGroup(tour[1], tour[2]), VGroup(tour[3], tour[4]), VGroup(tour[5], tour[6])]
        cotes = [(so, se), (se, ne), (ne, no), (no, so)]
        etiq = [None, None, self.t("a", 40, COUL_X).next_to(Line(ne, no), UP, buff=0.12),
                self.t("b", 40, COUL_X).next_to(Line(no, so), LEFT, buff=0.15)]
        cloture = VGroup()
        self.au_mot("a plus b plus a plus b")
        for (d, f), terme, e in zip(cotes, termes, etiq):
            seg = Line(d, f, color=BOIS, stroke_width=8)
            cloture.add(seg)
            anims = [Create(seg), poteau.animate.move_to(f), FadeIn(terme, shift=RIGHT * 0.15)]
            if e is not None:
                anims.append(FadeIn(e))
            self.play(*anims, run_time=0.55, rate_func=linear)
        # le tour = deux fois le même « a + b »
        self.au_mot("C'est le double")
        s1 = Line(tour[0].get_corner(DL), tour[2].get_corner(DR)).shift(DOWN * 0.18)
        s2 = Line(tour[4].get_corner(DL), tour[6].get_corner(DR)).shift(DOWN * 0.18)
        s1.set_stroke(COUL_PLUS, 5)
        s2.set_stroke(COUL_PLUS, 5)
        moitie1 = VGroup(cloture[0], cloture[1]).copy().set_stroke(COUL_PLUS, 10)
        moitie2 = VGroup(cloture[2], cloture[3]).copy().set_stroke(COUL_PLUS, 10)
        self.play(Create(s1), Create(moitie1), run_time=0.7)
        self.play(Create(s2), Create(moitie2), run_time=0.7)
        self.au_mot("2 fois, parenthèse")
        egal = self.ligne([("=", WHITE), ("2", COUL_COEF), ("×", WHITE), ("(", WHITE),
                           ("a", COUL_X, "colle"), ("+", WHITE), ("b", COUL_X), (")", WHITE, "colle")], 64)
        egal.next_to(tour, DOWN, buff=0.75).align_to(tour, LEFT)
        self.play(FadeIn(egal, shift=DOWN * 0.2))
        self.insiste(VGroup(*egal[1:]))
        self.play(Write(self.chute("Le tour : le double de la somme de a et b.", color=BLEU_CALCUL, font_size=36)))
        self.attendre_voix()

    # ── 02 : le vocabulaire ─────────────────────────────────────────────────

    def carte_dos(self, centre):
        fond = RoundedRectangle(width=2.8, height=2.95, corner_radius=0.18, stroke_color=WHITE,
                                stroke_width=2, fill_color="#1E3A5F", fill_opacity=1)
        return VGroup(fond, self.t("?", 90, WHITE)).move_to(centre)

    def carte_face(self, centre, mot, signe, verbe):
        fond = RoundedRectangle(width=2.8, height=2.95, corner_radius=0.18, stroke_color=BLEU_CALCUL,
                                stroke_width=3, fill_color="#0F172A", fill_opacity=1)
        m = self.t(mot, 30, WHITE).move_to(P(0, 1.05))
        s = self.t(signe, 96, BLEU_CALCUL).move_to(P(0, 0.25))
        v = self.t(verbe, 22, GRAY_B).move_to(P(0, -0.45))
        return VGroup(fond, m, s, v).move_to(centre)

    def retourner(self, dos, face):
        self.play(dos.animate.stretch(0.02, 0), run_time=0.25)
        self.remove(dos)
        face.stretch(0.02, 0)
        self.add(face)
        self.play(face.animate.stretch(50, 0), run_time=0.25)

    def ecran_vocabulaire(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-vocabulaire")
        self.titre_ecran("Quatre mots à connaître")
        xs = [-5.15, -2.15, 0.85, 3.85]
        y = 0.45
        dos = [self.carte_dos(P(x, y)) for x in xs]
        self.play(LaggedStart(*[FadeIn(d, shift=UP * 0.2) for d in dos], lag_ratio=0.15))
        cartes = [("la somme", "+", "on additionne"), ("la différence", "−", "on soustrait"),
                  ("le produit", "×", "on multiplie"), ("le quotient", "÷", "on divise")]
        exemples = [
            [("x", COUL_X), ("+", WHITE), ("y", COUL_X)],
            [("x", COUL_X), ("−", WHITE), ("y", COUL_X)],
            [("5", COUL_COEF), ("×", WHITE), ("n", COUL_X)],
            [("x", COUL_X), ("÷", WHITE), ("4", COUL_COEF)],
        ]
        mots = [("La somme", "x plus y"), ("La différence", "x moins y"),
                ("Le produit", "5 fois n"), ("Le quotient", "x divisé par 4")]
        faces = []
        for x, d, (mot, signe, verbe), ex, (m_mot, m_ex) in zip(xs, dos, cartes, exemples, mots):
            self.au_mot(m_mot)
            f = self.carte_face(P(x, y), mot, signe, verbe)
            self.retourner(d, f)
            faces.append(f)
            self.au_mot(m_ex)
            e = self.ligne(ex, 40).move_to(P(x, y - 1.0))
            self.play(FadeIn(e, shift=UP * 0.15), Indicate(f[2], color=BLEU_CALCUL), run_time=0.6)
            f.add(e)
            if m_mot == "Le produit":
                # le produit : 5 × n s'écrit 5n
                self.au_mot("donc 5 n")
                court = self.ligne([("=", WHITE), ("5", COUL_COEF), ("n", COUL_X, "colle")], 40)
                ex_prod = f[-1]
                groupe = VGroup(ex_prod.copy(), court).arrange(RIGHT, buff=0.2)
                if groupe.width > 2.5:
                    groupe.scale_to_fit_width(2.5)
                groupe.move_to(P(x, y - 1.0))
                self.play(Transform(ex_prod, groupe[0]), FadeIn(court, shift=RIGHT * 0.15))
                self.insiste(court[1:], 1.5, 0.4)
        self.attendre_voix()

    # ── 03 : l'opération faite en dernier ───────────────────────────────────

    def ecran_ordre(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-ordre")
        self.titre_ecran("L'opération faite en dernier")
        self.au_mot("Le premier mot")
        regle = self.ligne([("le premier mot", JAUNE_TITRE), ("=", WHITE),
                            ("l'opération faite en dernier", JAUNE_TITRE)], 32).move_to(P(-0.6, 2.5))
        self.play(FadeIn(regle, shift=DOWN * 0.2))

        # ── la première phrase : le double de la somme ──
        y1 = 1.1
        self.au_mot("Le double de la somme")
        ph1 = self.ligne([("le double", COUL_FOIS), ("de", WHITE), ("la somme", COUL_PLUS), ("de", WHITE),
                          ("x", COUL_X), ("et", WHITE), ("3", COUL_CONST)], 28)
        ph1.move_to(P(0, y1)).align_to(P(-6.5, 0), LEFT)
        self.play(FadeIn(ph1, shift=RIGHT * 0.2))
        e1 = self.ligne([("2", COUL_COEF), ("×", WHITE), ("(", WHITE), ("x", COUL_X, "colle"), ("+", WHITE),
                         ("3", COUL_CONST), (")", WHITE, "colle")], 56)
        e1.move_to(P(3.05, y1))
        interieur = VGroup(e1[3], e1[4], e1[5])
        b_int = self.boite(VGroup(e1[2], interieur, e1[6]), COUL_PLUS, 0.1)
        b_ext = self.boite(e1, COUL_FOIS, 0.3)
        self.au_mot("la somme d'abord")
        self.play(Indicate(ph1[2], color=COUL_PLUS, scale_factor=1.3))
        self.au_mot("x plus 3, entre")
        self.play(FadeIn(interieur, shift=UP * 0.15))
        self.au_mot("entre parenthèses")
        self.play(FadeIn(e1[2]), FadeIn(e1[6]), Create(b_int))
        self.au_mot("puis le double")
        self.play(Indicate(ph1[0], color=COUL_FOIS, scale_factor=1.3))
        self.au_mot("2 fois, parenthèse")
        dernier1 = self.ligne([("en dernier :", COUL_FOIS), ("×", COUL_FOIS)], 26).next_to(b_ext, DOWN, buff=0.12)
        self.play(FadeIn(VGroup(e1[0], e1[1]), shift=RIGHT * 0.15), Create(b_ext))
        self.play(FadeIn(dernier1))
        self.insiste(VGroup(e1, b_int, b_ext), 1.3, 0.45)

        # ── la seconde phrase : la somme du double ──
        y2 = -1.05
        self.au_mot("Mais la somme du double")
        ph2 = self.ligne([("la somme", COUL_PLUS), ("du double", COUL_FOIS), ("de", WHITE),
                          ("x", COUL_X), ("et de", WHITE), ("3", COUL_CONST)], 28)
        ph2.move_to(P(0, y2)).align_to(P(-6.5, 0), LEFT)
        mais = self.t("Mais", 30, ROUGE_ERREUR).next_to(ph2, UP, buff=0.2).align_to(ph2, LEFT)
        self.play(FadeIn(mais), FadeIn(ph2, shift=RIGHT * 0.2))
        self.au_mot("2 x plus 3.")
        e2 = self.ligne([("2", COUL_COEF), ("x", COUL_X, "colle"), ("+", WHITE), ("3", COUL_CONST)], 56)
        e2.move_to(P(3.05, y2))
        b2_int = self.boite(VGroup(e2[0], e2[1]), COUL_FOIS, 0.12)
        b2_ext = self.boite(e2, COUL_PLUS, 0.3)
        dernier2 = self.ligne([("en dernier :", COUL_PLUS), ("+", COUL_PLUS)], 26).next_to(b2_ext, DOWN, buff=0.12)
        self.play(FadeIn(VGroup(e2[0], e2[1]), shift=UP * 0.15), Create(b2_int), run_time=0.6)
        self.play(FadeIn(VGroup(e2[2], e2[3]), shift=RIGHT * 0.15), Create(b2_ext), run_time=0.6)
        self.play(FadeIn(dernier2))
        self.insiste(VGroup(e2, b2_int, b2_ext), 1.3, 0.45)
        self.attendre_voix()

    # ── 04 : comparer pour x = 4 ────────────────────────────────────────────

    def ecran_comparer(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-comparer")
        self.titre_ecran("Ce n'est pas pareil")
        xg, xd = -3.6, 2.4
        g = self.ligne([("2", COUL_COEF), ("×", WHITE), ("(", WHITE), ("x", COUL_X, "colle"), ("+", WHITE),
                        ("3", COUL_CONST), (")", WHITE, "colle")], 56).move_to(P(xg, 2.0))
        d = self.ligne([("2", COUL_COEF), ("x", COUL_X, "colle"), ("+", WHITE), ("3", COUL_CONST)], 56)
        d.move_to(P(xd, 2.0))
        diff = self.t("≠", 64, ROUGE_ERREUR).move_to(P((xg + xd) / 2, 2.0))
        self.play(FadeIn(g), FadeIn(d))
        self.play(GrowFromCenter(diff))
        self.au_mot("Pour x égale 4")
        chip = self.ligne([("x", COUL_X), ("=", COUL_X), ("4", COUL_X)], 44).move_to(P(-0.6, 0.95))
        cadre = self.boite(chip, COUL_X, 0.18)
        self.play(FadeIn(chip), Create(cadre))
        self.au_mot("2 fois, parenthèse, 4")
        cg = self.ligne([("2", COUL_COEF), ("×", WHITE), ("(", WHITE), ("4", COUL_X, "colle"), ("+", WHITE),
                         ("3", COUL_CONST), (")", WHITE, "colle")], 50).move_to(P(xg, -0.25))
        self.play(TransformFromCopy(g, cg))
        self.au_mot("ça fait 14")
        rg = self.ligne([("=", WHITE), ("14", BLEU_CALCUL)], 72).move_to(P(xg, -1.5))
        self.play(FadeIn(rg, shift=DOWN * 0.2))
        self.insiste(rg[1])
        self.au_mot("Et 2 fois 4")
        cd = self.ligne([("2", COUL_COEF), ("×", WHITE), ("4", COUL_X), ("+", WHITE), ("3", COUL_CONST)], 50)
        cd.move_to(P(xd, -0.25))
        self.play(TransformFromCopy(d, cd))
        self.au_mot("fait 11")
        rd = self.ligne([("=", WHITE), ("11", BLEU_CALCUL)], 72).move_to(P(xd, -1.5))
        self.play(FadeIn(rd, shift=DOWN * 0.2))
        self.insiste(rd[1])
        neq = self.t("≠", 72, ROUGE_ERREUR).move_to(P((xg + xd) / 2, -1.5))
        self.play(GrowFromCenter(neq))
        self.attendre_voix()

    # ── 05 : le cinéma ──────────────────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-situation")
        self.titre_ecran("Une situation : au cinéma")
        self.au_mot("Au cinéma")
        tk = self.ticket().move_to(P(-3.9, 1.85))
        pc = self.pop_corn().move_to(P(1.4, 1.85))
        self.play(FadeIn(tk, shift=DOWN * 0.2), FadeIn(pc, shift=DOWN * 0.2))
        self.au_mot("8 euros")
        p8 = self.ligne([("8 €", COUL_COEF), ("la place", WHITE)], 34).move_to(P(tk.get_x(), 0.6))
        self.play(FadeIn(p8, shift=UP * 0.15))
        self.au_mot("pop-corn 5 euros")
        p5 = self.ligne([("5 €", COUL_CONST), ("le pop-corn", WHITE)], 34).move_to(P(pc.get_x(), 0.6))
        self.play(FadeIn(p5, shift=UP * 0.15))

        x_g, x_f, x_e = -6.5, -0.45, 0.35
        y1, y2 = -0.55, -1.75
        self.au_mot("Pour n places et un seul")
        s1 = self.ligne([("n", COUL_X), ("places + un seul pop-corn", WHITE)], 28)
        s1.move_to(P(0, y1)).align_to(P(x_g, 0), LEFT)
        self.play(FadeIn(s1, shift=RIGHT * 0.2))
        self.au_mot("8 n plus 5.")
        x_f = s1.get_right()[0] + 0.75
        f1 = Arrow(P(x_f - 0.5, y1), P(x_f + 0.4, y1), buff=0, color=WHITE, stroke_width=4,
                   max_tip_length_to_length_ratio=0.3)
        e1 = self.ligne([("8", COUL_COEF), ("n", COUL_X, "colle"), ("+", WHITE), ("5", COUL_CONST)], 46)
        e1.move_to(P(0, y1)).align_to(P(x_f + 0.65, 0), LEFT)
        self.play(GrowArrow(f1), FadeIn(e1, shift=RIGHT * 0.2))
        self.insiste(e1)
        self.au_mot("Pour n places et n pop-corns")
        s2 = self.ligne([("n", COUL_X), ("places +", WHITE), ("n", COUL_X), ("pop-corns", WHITE)], 28)
        s2.move_to(P(0, y2)).align_to(P(x_g, 0), LEFT)
        self.play(FadeIn(s2, shift=RIGHT * 0.2))
        self.au_mot("8 n plus 5 n")
        f2 = Arrow(P(x_f - 0.5, y2), P(x_f + 0.4, y2), buff=0, color=WHITE, stroke_width=4,
                   max_tip_length_to_length_ratio=0.3)
        e2 = self.ligne([("8", COUL_COEF), ("n", COUL_X, "colle"), ("+", WHITE), ("5", COUL_COEF),
                         ("n", COUL_X, "colle")], 46)
        e2.move_to(P(0, y2)).align_to(P(x_f + 0.65, 0), LEFT)
        self.play(GrowArrow(f2), FadeIn(e2, shift=RIGHT * 0.2))
        self.au_mot("donc 13 n")
        r2 = self.ligne([("=", WHITE), ("13", COUL_COEF), ("n", COUL_X, "colle")], 46).next_to(e2, RIGHT, buff=0.3)
        self.play(FadeIn(r2, shift=RIGHT * 0.2))
        self.insiste(r2[1:])
        self.play(Circumscribe(VGroup(e2, r2), color=VERT_OK))
        self.attendre_voix()

    # ── 06 : défi ───────────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("06-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        self.au_mot("Traduis")
        self.play(FadeIn(self.t("Traduis en expression :", 36, BLEU_CALCUL).move_to(P(-0.6, 2.2))))
        self.au_mot("le triple de y")
        q1 = self.ligne([("1.", WHITE), ("le triple de", WHITE), ("y", COUL_X), ("diminué de", WHITE),
                         ("5", COUL_CONST)], 40)
        q1.move_to(P(0, 1.2)).align_to(P(-6.0, 0), LEFT)
        self.play(FadeIn(q1, shift=RIGHT * 0.2))
        self.au_mot("le triple de la différence")
        q2 = self.ligne([("2.", WHITE), ("le triple de la différence de", WHITE), ("y", COUL_X), ("et", WHITE),
                         ("5", COUL_CONST)], 40)
        q2.move_to(P(0, -0.6)).align_to(q1, LEFT)
        self.play(FadeIn(q2, shift=RIGHT * 0.2))
        cases = VGroup()
        for q in (q1, q2):
            c = DashedVMobject(RoundedRectangle(width=2.6, height=0.85, corner_radius=0.12,
                                                stroke_color=BLEU_CALCUL, stroke_width=3), num_dashes=28)
            fl = self.t("→", 40).next_to(q, DOWN, buff=0.4).align_to(q, LEFT).shift(RIGHT * 0.6)
            c.next_to(fl, RIGHT, buff=0.3)
            cases.add(VGroup(fl, c, self.t("?", 40, BLEU_CALCUL).move_to(c)))
        self.play(*[FadeIn(c) for c in cases])
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=36)))
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("06b-correction")
        self.titre_ecran("Correction")
        self.au_mot("Le triple de y diminué")
        q1 = self.ligne([("1.", WHITE), ("le triple de", COUL_FOIS), ("y", COUL_X), ("diminué de", COUL_PLUS),
                         ("5", COUL_CONST)], 36)
        q1.move_to(P(0, 2.3)).align_to(P(-6.0, 0), LEFT)
        self.play(FadeIn(q1, shift=RIGHT * 0.2))
        self.au_mot("3 y moins 5")
        e1 = self.ligne([("3", COUL_COEF), ("y", COUL_X, "colle"), ("−", WHITE), ("5", COUL_CONST)], 60)
        e1.move_to(P(-0.6, 1.15))
        b1i = self.boite(VGroup(e1[0], e1[1]), COUL_FOIS, 0.12)
        b1e = self.boite(e1, COUL_PLUS, 0.3)
        self.play(FadeIn(VGroup(e1[0], e1[1]), shift=UP * 0.15), Create(b1i), run_time=0.6)
        self.play(FadeIn(VGroup(e1[2], e1[3]), shift=RIGHT * 0.15), Create(b1e), run_time=0.6)
        self.insiste(VGroup(e1, b1i, b1e), 1.3, 0.4)

        self.au_mot("Le triple de la différence")
        q2 = self.ligne([("2.", WHITE), ("le triple", COUL_FOIS), ("de la différence", COUL_PLUS), ("de", WHITE),
                         ("y", COUL_X), ("et", WHITE), ("5", COUL_CONST)], 36)
        q2.move_to(P(0, -0.1)).align_to(q1, LEFT)
        self.play(FadeIn(q2, shift=RIGHT * 0.2))
        self.au_mot("3 fois, parenthèse")
        e2 = self.ligne([("3", COUL_COEF), ("×", WHITE), ("(", WHITE), ("y", COUL_X, "colle"), ("−", WHITE),
                         ("5", COUL_CONST), (")", WHITE, "colle")], 60)
        e2.move_to(P(-0.6, -1.35))
        inter = VGroup(e2[3], e2[4], e2[5])
        b2i = self.boite(VGroup(e2[2], inter, e2[6]), COUL_PLUS, 0.1)
        b2e = self.boite(e2, COUL_FOIS, 0.3)
        self.play(FadeIn(inter, shift=UP * 0.15), Create(b2i), FadeIn(e2[2]), FadeIn(e2[6]), run_time=0.6)
        self.play(FadeIn(VGroup(e2[0], e2[1]), shift=RIGHT * 0.15), Create(b2e), run_time=0.6)
        self.insiste(VGroup(e2, b2i, b2e), 1.3, 0.4)
        self.au_mot("Une parenthèse change")
        self.play(Write(self.chute("Une parenthèse change tout.", color=JAUNE_TITRE, font_size=38)))
        self.attendre_voix()

    # ── 07 : ce que tu as appris (règle du 13/10 : des affirmations) ─────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)))
        acquis = [
            ('Somme, différence', 'Somme, différence, produit, quotient.'),
            ('Le premier mot', "Le premier mot donne l'opération faite en dernier."),
            ('Et une parenthèse', 'Une parenthèse change tout.'),
        ]
        lignes = VGroup(*[VGroup(self.coche(), self.t(txt, 32)).arrange(RIGHT, buff=0.3)
                          for _, txt in acquis])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.5)
        if lignes.width > 11.5:
            lignes.scale_to_fit_width(11.5)
        lignes.move_to(P(-0.6, 0.5))
        for (mot, _), l in zip(acquis, lignes):
            self.au_mot(mot)
            self.play(Create(l[0]), FadeIn(l[1], shift=RIGHT * 0.2), run_time=0.6)
        self.au_mot("L'épisode 3")
        self.play(Write(self.chute('Épisode 3 : calculer une expression', color=VERT_OK, font_size=36)))
        self.attendre_voix(marge=1.0)

    # ── déroulé ─────────────────────────────────────────────────────────────

    def construct(self):
        self.page_de_garde()
        self.ecran_jardin()
        self.ecran_vocabulaire()
        self.ecran_ordre()
        self.ecran_comparer()
        self.ecran_situation()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="08-abonne")
