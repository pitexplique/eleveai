# expression_developper.py
# EleveAI — Maths 5e — Expression littérale, épisode 6 : développer k(a + b)
# (notionId : litteral_calcul, micro : litteral_distributivite), AVEC VOIX.
#
# ⭐ 13/10/2026 : série « expression littérale » 5e/4e/3e, une paysage PAR MICRO
# + son short jumeau (modèle Pythagore 4e). Paysage ceinture JAUNE, sur le
# modèle de l'épisode 1 (expression_comprendre.py).
#
# ⭐ LE DESSIN QUI PORTE TOUT : le champ de cannes de Saint-Joseph, 5 m de
# large, x + 3 de long. Découpé en deux, il montre les DEUX produits : 5x
# (BLEU) et 15 (ORANGE). Même modèle d'aire que la paysage 4e
# (scripts/4e/litteral_developper.py).
#
# Défi : 2(3x + 4) = 6x + 8, avec son rectangle vide puis rempli.
#
# Voix : manim/voix/5e-expression-developper.json (Julie, débit −8).
# Rendu : python -m manim render -qh --disable_caching manim/scripts/5e/expression_developper.py ExpressionDevelopper5e -o eleveai-maths-5e-expression-developper --media_dir manim/scripts/5e/media
# Puis copier le mp4 dans manim/sorties/5e/maths/expression-litterale/06-developper/.

import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "seconde"))

from manim import *

from charte import *
from gabarit_sixieme import Notion6e
from signes_expression_2de import echelle_ceintures

COUL_X = BLEU_CALCUL       # le morceau 5 sur x
COUL_K = ORANGE_RETENUE    # le morceau 5 sur 3
TERRE = "#14532D"
CANNE = "#A3E635"
FEUILLE = "#4ADE80"

# Le champ : coin haut-gauche, longueur du morceau x, du morceau 3, largeur.
X0, Y0 = -5.6, 2.2
WX, W3, H = 4.4, 1.7, 2.3


class Notion5e(Notion6e):
    identite = "Maths 5e — EleveAI"


def P(x, y):
    return np.array([x, y, 0.0])


class ExpressionDevelopper5e(Notion5e):
    nom_voix = "5e-expression-developper"

    def t(self, texte, font_size=36, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def ligne(self, morceaux, font_size=40):
        """Une ligne faite de morceaux (texte, couleur), pour colorier un seul nombre."""
        return VGroup(*[self.t(m, font_size, c) for m, c in morceaux]).arrange(RIGHT, buff=0.26)

    def insister(self, mob, run_time=0.5):
        """Agrandir puis rétrécir (règle de Frédéric, pas de zoom caméra).
        Une liste : chaque objet grandit sur PLACE (sinon ils s'écartent)."""
        mobs = mob if isinstance(mob, (list, tuple)) else [mob]
        self.play(*[m.animate.scale(1.5) for m in mobs], run_time=run_time)
        self.play(*[m.animate.scale(1 / 1.5) for m in mobs], run_time=run_time)

    def barrer(self, mob, color=ROUGE_ERREUR):
        return Line(mob.get_corner(DL) + LEFT * 0.08, mob.get_corner(UR) + RIGHT * 0.08,
                    stroke_width=6, color=color)

    # ── les dessins ─────────────────────────────────────────────────────────

    def canne(self, x, y, h=0.55):
        """Une tige de canne : la tige, deux nœuds, deux feuilles en haut."""
        tige = Line(P(x, y - h / 2), P(x, y + h / 2), stroke_color=CANNE, stroke_width=4)
        noeuds = VGroup(*[Line(P(x - 0.05, y + d), P(x + 0.05, y + d), stroke_color="#365314",
                               stroke_width=3) for d in (-0.12, 0.08)])
        f1 = ArcBetweenPoints(P(x, y + h / 2), P(x - 0.22, y + h / 2 - 0.12), angle=-PI / 3,
                              stroke_color=FEUILLE, stroke_width=3)
        f2 = ArcBetweenPoints(P(x, y + h / 2), P(x + 0.22, y + h / 2 - 0.12), angle=PI / 3,
                              stroke_color=FEUILLE, stroke_width=3)
        return VGroup(tige, noeuds, f1, f2)

    def champ(self):
        """Le champ de cannes : fond, tiges, contour, repère du découpage, cotes."""
        fond = Rectangle(width=WX + W3, height=H, stroke_width=0, fill_color=TERRE, fill_opacity=0.9)
        fond.move_to(P(X0 + (WX + W3) / 2, Y0 - H / 2))
        cannes = VGroup()
        n = 12
        for i in range(n):
            for j, dy in enumerate((0.55, 1.2, 1.85)):
                x = X0 + (i + 0.5) * (WX + W3) / n
                cannes.add(self.canne(x + (0.06 if j % 2 else 0), Y0 - dy))
        bord = Rectangle(width=WX + W3, height=H, stroke_color=WHITE, stroke_width=4).move_to(fond)
        xs = X0 + WX
        repere = Line(P(xs, Y0), P(xs, Y0 + 0.28), stroke_color=WHITE, stroke_width=4)
        cote5 = self.t("5 m", 36, WHITE).move_to(P(X0 - 0.5, Y0 - H / 2))
        cotex = self.t("x m", 36, JAUNE_TITRE).move_to(P(X0 + WX / 2, Y0 + 0.38))
        cote3 = self.t("3 m", 36, WHITE).move_to(P(xs + W3 / 2, Y0 + 0.38))
        coupe = DashedLine(P(xs, Y0 + 0.05), P(xs, Y0 - H - 0.05), stroke_color=WHITE,
                           stroke_width=6, dash_length=0.15)
        mx = Rectangle(width=WX, height=H, stroke_width=0, fill_color=COUL_X, fill_opacity=0.6)
        mx.move_to(P(X0 + WX / 2, Y0 - H / 2))
        mk = Rectangle(width=W3, height=H, stroke_width=0, fill_color=COUL_K, fill_opacity=0.6)
        mk.move_to(P(xs + W3 / 2, Y0 - H / 2))
        return dict(dessin=VGroup(fond, cannes, bord, repere), cote5=cote5, cotex=cotex,
                    cote3=cote3, coupe=coupe, mx=mx, mk=mk)

    def champ_complet(self):
        c = self.champ()
        self.add(c["dessin"], c["cote5"], c["cotex"], c["cote3"])
        return c

    def grille(self, cols, rows, coin):
        """Le rectangle découpé (comme en 4e) : cols / rows = [(étiquette, taille)]."""
        x0, y0 = coin
        h = rows[0][1]
        cases, etiq = [], VGroup()
        x = x0
        for lc, w in cols:
            r = Rectangle(width=w, height=h, stroke_color=WHITE, stroke_width=3)
            r.move_to(P(x + w / 2, y0 - h / 2))
            cases.append(r)
            etiq.add(self.t(lc, 34, BLEU_CALCUL).move_to(P(x + w / 2, y0 + 0.32)))
            x += w
        etiq.add(self.t(rows[0][0], 34, BLEU_CALCUL).move_to(P(x0 - 0.38, y0 - h / 2)))
        return cases, etiq

    def remplir(self, case, texte, color, font_size=38):
        fond = case.copy().set_fill(color, opacity=0.45).set_stroke(width=0)
        txt = self.t(texte, font_size, WHITE).move_to(case.get_center())
        return VGroup(fond, txt)

    def fleches(self, a, b1, b2):
        """Les deux flèches courbes du nombre devant vers chaque terme."""
        f1 = CurvedArrow(a.get_top() + UP * 0.08, b1.get_top() + UP * 0.08, angle=-PI / 2, color=VERT_OK)
        f2 = CurvedArrow(a.get_top() + UP * 0.08, b2.get_top() + UP * 0.08, angle=-PI / 2, color=ORANGE_RETENUE)
        return f1, f2

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("Développer une expression", 50, JAUNE_TITRE).to_edge(UP, buff=0.7)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.25)
        ech = echelle_ceintures("jaune").move_to(P(-0.6, -2.4))
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech))
        self.au_mot("Comment enlever")
        expr = self.t("5(x + 3)", 84, WHITE).move_to(P(-1.4, 0.5))
        expr[2].set_color(JAUNE_TITRE)
        q = self.t("=  ?", 84, BLEU_CALCUL).next_to(expr, RIGHT, buff=0.4)
        self.play(FadeIn(expr, shift=UP * 0.2), FadeIn(q, shift=UP * 0.2))
        sous = self.t("Comment enlever les parenthèses ?", 36, BLEU_CALCUL).move_to(P(-0.6, -0.7))
        self.play(FadeIn(sous))
        par = VGroup(expr[1], expr[5])
        self.play(par.animate.set_color(ORANGE_RETENUE))
        self.insister([expr[1], expr[5]])
        self.attendre_voix(marge=1.5)

    # ── 01 : le champ ───────────────────────────────────────────────────────

    def ecran_champ(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-champ")
        self.titre_ecran("Un champ de cannes à Saint-Joseph")
        c = self.champ()
        self.au_mot("champ rectangulaire")
        self.play(FadeIn(c["dessin"][0]), Create(c["dessin"][2]))
        self.play(LaggedStart(*[GrowFromEdge(k, DOWN) for k in c["dessin"][1]], lag_ratio=0.02),
                  FadeIn(c["dessin"][3]), run_time=1.5)
        self.au_mot("Sa largeur")
        self.play(GrowFromCenter(c["cote5"]))
        self.insister(c["cote5"])
        self.au_mot("Sa longueur")
        self.play(GrowFromCenter(c["cotex"]))
        self.au_mot("plus 3 mètres")
        self.play(GrowFromCenter(c["cote3"]))
        self.au_mot("Quelle est son aire")
        aire = self.t("aire = ?", 60, BLEU_CALCUL).move_to(P(3.7, 1.0))
        self.play(Write(aire))
        self.play(Write(self.chute("Quelle est son aire ?", color=BLEU_CALCUL, font_size=40)))
        self.attendre_voix()

    # ── 02 : l'aire du champ entier ─────────────────────────────────────────

    def ecran_aire_entiere(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-aire-entiere")
        self.titre_ecran("L'aire du champ entier")
        c = self.champ_complet()
        self.au_mot("largeur fois longueur")
        regle = VGroup(self.t("aire =", 36), self.t("largeur × longueur", 36)
                       ).arrange(DOWN, buff=0.2).move_to(P(3.7, 1.0))
        self.play(FadeIn(regle, shift=LEFT * 0.2))
        self.au_mot("Ici")
        a = self.ligne([("aire =", WHITE), ("5", WHITE), ("×", WHITE), ("(x + 3)", WHITE)], 60)
        a[3][1].set_color(JAUNE_TITRE)
        a.move_to(P(-0.8, -1.9))
        self.play(Write(a))
        self.au_mot("La parenthèse")
        accol = Brace(c["dessin"][2], DOWN, buff=0.12, color=BLEU_CALCUL)
        lbl = self.t("x + 3", 40, BLEU_CALCUL).next_to(accol, DOWN, buff=0.1)
        self.play(GrowFromCenter(accol), FadeIn(lbl))
        self.play(a[3].animate.set_color(BLEU_CALCUL))
        self.play(a[3].animate.scale(1.5, about_edge=LEFT), run_time=0.5)
        self.play(a[3].animate.scale(1 / 1.5, about_edge=LEFT), run_time=0.5)
        self.play(Write(self.chute("La parenthèse, c'est toute la longueur.", color=BLEU_CALCUL, font_size=34)))
        self.attendre_voix()

    # ── 03 : je découpe ─────────────────────────────────────────────────────

    def ecran_decouper(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-decouper")
        self.titre_ecran("Je découpe le champ en deux")
        c = self.champ_complet()
        self.au_mot("Je découpe")
        self.play(Create(c["coupe"]), run_time=1.0)
        self.au_mot("Le premier")
        self.play(FadeIn(c["mx"]), c["cote5"].animate.set_color(COUL_X))
        l1 = self.t("5 × x", 46).move_to(P(3.3, 1.5))
        l1[2].set_color(JAUNE_TITRE)
        self.play(FadeIn(l1, shift=LEFT * 0.2))
        self.au_mot("son aire est 5 x")
        v1 = self.t("5x", 64, WHITE).move_to(c["mx"])
        r1 = self.t("= 5x", 46, COUL_X).next_to(l1, RIGHT, buff=0.25)
        self.play(GrowFromCenter(v1), FadeIn(r1))
        self.au_mot("Le deuxième")
        self.play(FadeIn(c["mk"]), c["cote5"].animate.set_color(COUL_K))
        l2 = self.t("5 × 3", 46).move_to(P(3.3, 0.5))
        self.play(FadeIn(l2, shift=LEFT * 0.2))
        self.au_mot("son aire est 15")
        v2 = self.t("15", 64, WHITE).move_to(c["mk"])
        r2 = self.t("= 15", 46, COUL_K).next_to(l2, RIGHT, buff=0.25)
        self.play(GrowFromCenter(v2), FadeIn(r2))
        self.au_mot("En tout")
        self.play(c["cote5"].animate.set_color(WHITE))
        tot = self.ligne([("aire =", WHITE), ("5x", COUL_X), ("+", WHITE), ("15", COUL_K)], 60)
        tot.move_to(P(-0.8, -1.9))
        self.play(Write(tot))
        res = VGroup(tot[1], tot[2], tot[3])
        self.play(res.animate.scale(1.5, about_edge=LEFT), run_time=0.5)
        self.play(res.animate.scale(1 / 1.5, about_edge=LEFT), run_time=0.5)
        self.attendre_voix()

    # ── 04 : la règle ───────────────────────────────────────────────────────

    def ecran_regle(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-regle")
        self.titre_ecran("Les deux calculs, la même aire")
        a1 = self.ligne([("champ entier :", WHITE), ("5 × (x + 3)", BLEU_CALCUL)], 40).move_to(P(-0.6, 2.2))
        a2 = self.ligne([("en deux morceaux :", WHITE), ("5x + 15", VERT_OK)], 40).move_to(P(-0.6, 1.45))
        self.play(FadeIn(a1), FadeIn(a2))
        self.au_mot("même aire")
        self.play(Indicate(a1[1], color=BLEU_CALCUL), Indicate(a2[1], color=VERT_OK))
        self.au_mot("Donc 5 fois")
        e = self.t("5(x + 3) = 5x + 15", 84).move_to(P(-0.6, -0.6))
        for i in (2, 8):
            e[i].set_color(JAUNE_TITRE)
        VGroup(*e[7:]).set_color(VERT_OK)
        e[8].set_color(JAUNE_TITRE)
        self.play(Write(e))
        f1, f2 = self.fleches(e[0], e[2], e[4])
        self.au_mot("Le 5 multiplie le x")
        self.play(Create(f1), Indicate(e[2], color=VERT_OK, scale_factor=1.6))
        self.au_mot("et il multiplie le 3")
        self.play(Create(f2), Indicate(e[4], color=ORANGE_RETENUE, scale_factor=1.6))
        self.au_mot("C'est ça")
        self.play(Write(self.chute("C'est ça, développer !", color=VERT_OK, font_size=44)))
        self.insister(e[0])
        self.attendre_voix()

    # ── 05 : vérifier avec des nombres ──────────────────────────────────────

    def ecran_verifier(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-verifier")
        self.titre_ecran("Vérifions avec des nombres")
        cases, etiq = self.grille([("3", 1.5), ("5", 2.5)], [("4", 2.0)], coin=(-5.4, 1.6))
        self.play(*[Create(c) for c in cases], FadeIn(etiq))
        self.au_mot("4 fois, parenthèse")
        l1 = self.t("4 × (3 + 5)", 46).move_to(P(2.6, 1.6))
        self.play(FadeIn(l1, shift=LEFT * 0.2))
        self.au_mot("4 fois 8")
        tout = Rectangle(width=4.0, height=2.0, stroke_width=0, fill_color=BLEU_CALCUL,
                         fill_opacity=0.3).move_to(VGroup(*cases))
        l1b = self.t("= 4 × 8 = 32", 46, BLEU_CALCUL).next_to(l1, DOWN, buff=0.3).align_to(l1, LEFT)
        self.play(FadeIn(tout), FadeIn(l1b))
        self.au_mot("Et 4 fois 3")
        self.play(FadeOut(tout))
        l2 = self.t("4 × 3 + 4 × 5", 46).move_to(P(2.6, -0.4)).align_to(l1, LEFT)
        self.play(FadeIn(l2, shift=LEFT * 0.2))
        self.au_mot("12 plus 20")
        p1 = self.remplir(cases[0], "12", COUL_X)
        p2 = self.remplir(cases[1], "20", COUL_K)
        l2b = self.t("= 12 + 20 = 32", 46, VERT_OK).next_to(l2, DOWN, buff=0.3).align_to(l1, LEFT)
        self.play(FadeIn(p1), FadeIn(p2), FadeIn(l2b))
        self.au_mot("Pareil")
        ch = self.chute("Pareil : 32 = 32", color=VERT_OK, font_size=44)
        coche = self.coche(taille=0.3).next_to(ch, RIGHT, buff=0.4)
        self.play(Write(ch), Create(coche))
        self.insister([VGroup(*l1b[-2:]), VGroup(*l2b[-2:])], run_time=0.4)
        self.attendre_voix()

    # ── 06 : avec un moins ──────────────────────────────────────────────────

    def ecran_moins(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-moins")
        self.titre_ecran("Avec un signe −, la même règle")
        self.au_mot("4 fois, parenthèse")
        e = self.t("4(x − 1)", 96).move_to(P(-0.6, 1.0))
        e[2].set_color(JAUNE_TITRE)
        self.play(Write(e))
        f1, f2 = self.fleches(e[0], e[2], e[4])
        self.au_mot("4 fois x")
        self.play(Create(f1))
        g1 = self.t("4 × x", 50, VERT_OK).move_to(P(-3.6, -0.6))
        self.play(FadeIn(g1))
        self.au_mot("moins 4 fois 1")
        self.play(Create(f2))
        g2 = self.t("− 4 × 1", 50, ORANGE_RETENUE).move_to(P(1.8, -0.6))
        self.play(FadeIn(g2))
        self.au_mot("On obtient")
        r = self.t("4(x − 1) = 4x − 4", 70, VERT_OK).move_to(P(-0.6, -2.0))
        r[2].set_color(JAUNE_TITRE)
        r[8].set_color(JAUNE_TITRE)
        self.play(GrowFromCenter(r))
        self.insister(VGroup(r[9], r[10]))
        self.attendre_voix(marge=1.5)

    # ── 07 : le piège ───────────────────────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("07-piege")
        self.titre_ecran("Le piège")
        self.au_mot("écrire 5 x plus 3")
        faux = self.t("5(x + 3) = 5x + 3", 76).move_to(P(-0.6, 1.0))
        VGroup(*faux[7:]).set_color(ROUGE_ERREUR)
        self.play(Write(faux))
        self.play(Create(self.barrer(VGroup(*faux[7:]))))
        self.au_mot("On a oublié")
        trois = faux[4]
        self.play(trois.animate.set_color(ORANGE_RETENUE))
        fl = CurvedArrow(faux[0].get_top() + UP * 0.08, trois.get_top() + UP * 0.08,
                         angle=-PI / 2, color=ORANGE_RETENUE)
        self.play(Create(fl))
        self.insister(trois, run_time=0.6)
        oubli = self.t("le 3 n'a pas été multiplié !", 36, ORANGE_RETENUE).move_to(P(-0.6, -0.1))
        self.play(FadeIn(oubli))
        bon = self.t("5(x + 3) = 5x + 15", 64, VERT_OK).move_to(P(-0.6, -1.3))
        bon[2].set_color(JAUNE_TITRE)
        bon[8].set_color(JAUNE_TITRE)
        self.play(Write(bon))
        self.au_mot("Le nombre devant")
        regle = VGroup(self.t("Le nombre devant la parenthèse", 36, ORANGE_RETENUE),
                       self.t("multiplie tout ce qu'il y a dedans.", 36, ORANGE_RETENUE)
                       ).arrange(DOWN, buff=0.15).move_to(P(-0.6, -2.75))
        self.play(Write(regle))
        self.attendre_voix()

    # ── 08 : défi ───────────────────────────────────────────────────────────

    def defi_rectangle(self):
        cases, etiq = self.grille([("3x", 2.6), ("4", 1.4)], [("2", 1.2)], coin=(-2.6, -0.65))
        return cases, etiq

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        self.au_mot("Développe")
        self.play(FadeIn(self.t("Développe :", 40, BLEU_CALCUL).move_to(P(-0.6, 2.0))))
        self.au_mot("2 fois, parenthèse")
        e = self.t("2(3x + 4) = ?", 80).move_to(P(-0.6, 0.85))
        e[3].set_color(JAUNE_TITRE)
        self.play(GrowFromCenter(e))
        cases, etiq = self.defi_rectangle()
        q = VGroup(*[self.t("?", 44, ORANGE_RETENUE).move_to(c) for c in cases])
        self.play(*[Create(c) for c in cases], FadeIn(etiq), FadeIn(q))
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=36)))
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("08b-correction")
        self.titre_ecran("Correction")
        e = self.t("2(3x + 4)", 72).move_to(P(-2.6, 1.5))
        e[3].set_color(JAUNE_TITRE)
        self.add(e)
        cases, etiq = self.grille([("3x", 2.4), ("4", 1.3)], [("2", 1.2)], coin=(1.8, 1.0))
        self.add(*cases, etiq)
        f1 = CurvedArrow(e[0].get_top() + UP * 0.08, VGroup(e[2], e[3]).get_top() + UP * 0.08,
                         angle=-PI / 2, color=VERT_OK)
        f2 = CurvedArrow(e[0].get_top() + UP * 0.08, e[5].get_top() + UP * 0.08,
                         angle=-PI / 2, color=ORANGE_RETENUE)
        self.au_mot("2 fois 3 x")
        l1 = self.t("2 × 3x", 46, VERT_OK).move_to(P(-4.0, 0.1))
        self.play(Create(f1), FadeIn(l1))
        self.au_mot("6 x")
        r1 = self.t("= 6x", 46, VERT_OK).next_to(l1, RIGHT, buff=0.25)
        self.play(FadeIn(r1), FadeIn(self.remplir(cases[0], "6x", COUL_X)))
        self.au_mot("2 fois 4")
        l2 = self.t("2 × 4", 46, ORANGE_RETENUE).move_to(P(-4.0, -0.8)).align_to(l1, LEFT)
        self.play(Create(f2), FadeIn(l2))
        self.au_mot("8")
        r2 = self.t("= 8", 46, ORANGE_RETENUE).next_to(l2, RIGHT, buff=0.25)
        self.play(FadeIn(r2), FadeIn(self.remplir(cases[1], "8", COUL_K)))
        self.au_mot("On obtient")
        r = self.t("2(3x + 4) = 6x + 8", 68, VERT_OK).move_to(P(-0.6, -2.1))
        r[3].set_color(JAUNE_TITRE)
        r[9].set_color(JAUNE_TITRE)
        self.play(GrowFromCenter(r))
        self.insister(VGroup(*r[8:]))
        self.attendre_voix()

    # ── 09 : ce que tu as appris (règle du 13/10 : des affirmations) ─────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("09-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)))
        acquis = [
            ("Développer, c'est", "Développer, c'est découper un rectangle"),
            ("Le nombre devant", "Le nombre devant multiplie chaque terme"),
            ("Et on n'oublie", "On n'oublie jamais le deuxième"),
        ]
        lignes = VGroup(*[VGroup(self.coche(), self.t(txt, 34)).arrange(RIGHT, buff=0.3)
                          for _, txt in acquis])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.5)
        if lignes.width > 10.0:  # ne pas toucher Ti-Margo (coin bas-droit)
            lignes.scale_to_fit_width(10.0)
        lignes.move_to(P(-0.9, 0.5))
        for (mot, _), l in zip(acquis, lignes):
            self.au_mot(mot)
            self.play(FadeIn(l[1], shift=RIGHT * 0.2), run_time=0.6)
            self.play(Create(l[0]), run_time=0.4)
        self.au_mot("Tu as fini la série")
        fini = self.chute("Tu as fini la série !", color=VERT_OK, font_size=40)
        self.play(Write(fini))
        self.au_mot("Les défis")
        defis = self.t("Les défis t'attendent sur le coach", 30, VERT_OK).next_to(fini, DOWN, buff=0.2)
        self.play(VGroup(fini).animate.shift(UP * 0.35), FadeIn(defis.shift(UP * 0.35), shift=UP * 0.2))
        self.attendre_voix(marge=1.0)

    # ── déroulé ─────────────────────────────────────────────────────────────

    def construct(self):
        self.page_de_garde()
        self.ecran_champ()
        self.ecran_aire_entiere()
        self.ecran_decouper()
        self.ecran_regle()
        self.ecran_verifier()
        self.ecran_moins()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="10-abonne")
