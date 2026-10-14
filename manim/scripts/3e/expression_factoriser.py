# expression_factoriser.py
# EleveAI — Maths 3e — Expression littérale, épisode 5 : factoriser
# (notionId : litteral_calcul, micro : litteral_factoriser), AVEC VOIX.
#
# ⭐ 13/10/2026 : série « expression littérale » 5e/4e/3e, une paysage PAR MICRO
# + son short jumeau. Paysage ceinture VERTE, même structure que les épisodes 1
# (5e) et 4 (4e). Short jumeau (ceinture blanche) : expression_factoriser_short.py.
# ⛔ Différente de la paysage 4e « Factoriser » (scripts/4e/litteral_factoriser.py,
# le rectangle découpé) : ici, la TABLETTE DE CHOCOLAT et le facteur qui SORT.
#
# ⭐ LE DESSIN QUI PORTE TOUT : une tablette de 3 rangées ; dans chaque rangée
# une barre « x » de carrés au lait et 4 carrés noirs. En vrac : 3x + 12 ; par
# rangées : 3 × (x + 4).
# Couleurs : FACTEUR COMMUN VERT, LETTRE JAUNE, piège ORANGE, faux ROUGE.
#
# Défi : 4x + 20 → 4 × (x + 5) ; 2x² − 6x → 2x × (x − 3).
#
# Voix : manim/voix/3e-expression-factoriser.json (débit −7).
# Rendu : python -m manim render -qh --disable_caching manim/scripts/3e/expression_factoriser.py ExpressionFactoriser3e -o eleveai-maths-3e-expression-factoriser --media_dir manim/scripts/3e/media
# Puis copier le mp4 dans manim/sorties/3e/maths/expression-litterale/05-factoriser/.

import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "seconde"))

from manim import *

from charte import *
from gabarit_sixieme import Notion6e
from signes_expression_2de import echelle_ceintures

COUL_FACTEUR = VERT_OK
COUL_LETTRE = JAUNE_TITRE
LAIT = "#E3C29B"
LAIT_BORD = "#B08860"
NOIR = "#5A3418"
NOIR_BORD = "#C08050"
FOND_ETIQ = "#1E293B"
BOIS = "#8B5E3C"


class Notion3e(Notion6e):
    identite = "Maths 3e — EleveAI"


def P(x, y):
    return np.array([x, y, 0.0])


def rang(texte, sous, n=0):
    """La tranche des glyphes de `sous` (n-ième occurrence) dans Text(texte) :
    les espaces ne font pas de glyphe."""
    pos = -1
    for _ in range(n + 1):
        pos = texte.find(sous, pos + 1)
        if pos < 0:
            raise ValueError(f"« {sous} » absent de « {texte} »")
    a = len(texte[:pos].replace(" ", ""))
    return slice(a, a + len(sous.replace(" ", "")))


def ex(texte, font_size=56, verts=(), color=WHITE):
    """Une expression : la lettre (et son carré) en JAUNE ; les morceaux de
    `verts` (texte, ou (texte, n)) en VERT, couleur du facteur commun."""
    # espaces doublés : un anneau autour d'un facteur ne touche pas ses voisins
    m = Text(texte.replace(" ", "  "), font_size=font_size, color=color)
    s = texte.replace(" ", "")
    if len(s) != len(m):
        raise ValueError(f"glyphes ≠ caractères : {texte}")
    for i, c in enumerate(s):
        if c == "x" or (c == "²" and i > 0 and s[i - 1] == "x"):
            m[i].set_color(COUL_LETTRE)
    for v in verts:
        sous, n = (v, 0) if isinstance(v, str) else v
        m[rang(texte, sous, n)].set_color(COUL_FACTEUR)
    return m


def tablette(barre=2.8, c=0.8, h=0.8, ecart=0.15, n=3):
    """Les rangées de la tablette : [barre au lait, 4 carrés noirs] × n."""
    rangees = VGroup()
    for k in range(n):
        lait = Rectangle(width=barre, height=h, fill_color=LAIT, fill_opacity=1,
                         stroke_color=LAIT_BORD, stroke_width=3)
        # quelques traits pâles : on ne sait pas combien de carrés il y a
        traits = VGroup(*[DashedLine(lait.get_top() + RIGHT * (barre * (j / 5 - 0.5)),
                                     lait.get_bottom() + RIGHT * (barre * (j / 5 - 0.5)),
                                     color=LAIT_BORD, stroke_width=1.5, dash_length=0.08)
                          for j in (1, 2, 3, 4)])
        noirs = VGroup(*[Square(side_length=c, fill_color=NOIR, fill_opacity=1,
                                stroke_color=NOIR_BORD, stroke_width=2.5) for _ in range(4)])
        noirs.arrange(RIGHT, buff=0)
        r = VGroup(VGroup(lait, traits), noirs).arrange(RIGHT, buff=0)
        rangees.add(r)
    rangees.arrange(DOWN, buff=ecart)
    return rangees


class ExpressionFactoriser3e(Notion3e):
    nom_voix = "3e-expression-factoriser"

    def t(self, texte, font_size=36, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def insister(self, mob, f=1.5, bord=None):
        """Agrandir puis rétrécir ; `bord=LEFT` : grandit vers la droite, sans
        toucher le « = » qui le précède."""
        kw = {"about_edge": bord} if bord is not None else {}
        self.play(mob.animate.scale(f, **kw), run_time=0.5)
        self.play(mob.animate.scale(1 / f, **kw), run_time=0.5)

    def barrer(self, mob, color=ROUGE_ERREUR):
        return Line(mob.get_corner(DL) + LEFT * 0.08, mob.get_corner(UR) + RIGHT * 0.08,
                    stroke_width=6, color=color)

    def etiquette_x(self, cible, font_size=34):
        lbl = self.t("x", font_size, COUL_LETTRE)
        fond = RoundedRectangle(width=lbl.width + 0.3, height=lbl.height + 0.22, corner_radius=0.1,
                                fill_color=FOND_ETIQ, fill_opacity=1, stroke_width=0)
        return VGroup(fond, lbl.move_to(fond)).move_to(cible)

    def anneau(self, mob, color=COUL_FACTEUR):
        return Circle(color=color, stroke_width=5).surround(mob, buffer_factor=1.25)

    def sortir(self, sources, cible, run_time=1.2):
        """Les facteurs communs entourés glissent ensemble devant la parenthèse."""
        copies = [s.copy() for s in sources]
        self.add(*copies)
        self.play(*[c.animate.move_to(cible).set_color(COUL_FACTEUR) for c in copies], run_time=run_time)
        self.remove(*copies)
        self.add(cible)

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("Factoriser une expression", 50, JAUNE_TITRE).to_edge(UP, buff=0.7)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.25)
        ech = echelle_ceintures("verte").move_to(P(-0.6, -2.4))
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech))
        dev = ex("3 × (x + 4)", 60, verts=["3"])
        som = ex("3x + 12", 60)
        fl = Arrow(LEFT, RIGHT, color=VERT_OK, stroke_width=6, max_tip_length_to_length_ratio=0.25)
        fl.scale_to_fit_width(1.6)
        ligne = VGroup(som, fl, dev).arrange(RIGHT, buff=0.45).move_to(P(-0.6, 0.4))
        self.play(FadeIn(som, shift=UP * 0.2))
        self.au_mot("Le chemin inverse")
        self.play(GrowArrow(fl), FadeIn(dev, shift=LEFT * 0.3))
        self.insister(dev)
        self.attendre_voix(marge=1.5)

    # ── 01 : la tablette ────────────────────────────────────────────────────

    def ecran_tablette(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-tablette")
        self.titre_ecran("Une tablette de chocolat")
        rangees = tablette().scale(1.15).move_to(P(-3.4, 0.35))
        self.play(LaggedStart(*[FadeIn(r, shift=RIGHT * 0.3) for r in rangees], lag_ratio=0.3), run_time=1.4)
        self.au_mot("de 3 rangées")
        r3 = VGroup(self.t("3", 48, COUL_FACTEUR), self.t("rangées", 40)).arrange(RIGHT, buff=0.2)
        r3.move_to(P(4.1, 0.35))
        self.play(FadeIn(r3), LaggedStart(*[Indicate(r, color=VERT_OK, scale_factor=1.05) for r in rangees],
                                          lag_ratio=0.3), run_time=1.2)
        self.au_mot("x carrés au lait")
        xs = VGroup(*[self.etiquette_x(r[0]) for r in rangees])
        self.play(LaggedStart(*[FadeIn(x, scale=0.6) for x in xs], lag_ratio=0.2), run_time=0.9)
        self.au_mot("4 carrés noirs")
        quatre = self.t("4", 40).next_to(rangees[0][1], UP, buff=0.15)
        self.play(FadeIn(quatre), Indicate(rangees[0][1], color=NOIR_BORD, scale_factor=1.1))

        res = ex("3x + 12 = 3 × (x + 4)", 58, verts=[("3", 1)]).move_to(P(-1.2, -2.6))
        self.au_mot("En tout")
        self.play(Write(res[rang("3x + 12 = 3 × (x + 4)", "3x")]),
                  *[Indicate(r[0], color=WHITE, scale_factor=1.05) for r in rangees], run_time=1.0)
        self.au_mot("plus 12 carrés")
        nums = VGroup()
        k = 1
        for r in rangees:
            for q in r[1]:
                nums.add(self.t(str(k), 26).move_to(q))
                k += 1
        self.play(Write(res[rang("3x + 12 = 3 × (x + 4)", "+ 12")]),
                  LaggedStart(*[FadeIn(n) for n in nums], lag_ratio=0.12), run_time=1.3)
        self.au_mot("Mais aussi")
        self.play(FadeOut(nums), run_time=0.3)
        cadres = VGroup(*[SurroundingRectangle(r, color=COUL_FACTEUR, buff=0.06, stroke_width=5)
                          for r in rangees])
        lbls = VGroup(*[ex("x + 4", 36).next_to(r, RIGHT, buff=0.3) for r in rangees])
        for c, l in zip(cadres, lbls):
            self.play(Create(c), FadeIn(l, shift=LEFT * 0.2), run_time=0.5)
        self.au_mot("3 x plus 12 égale")
        self.play(Indicate(res[0:4], color=WHITE, scale_factor=1.15), run_time=0.7)
        self.au_mot("égale 3 fois")
        self.play(Write(res[rang("3x + 12 = 3 × (x + 4)", "= 3 ×")]), Indicate(r3, color=VERT_OK), run_time=0.8)
        self.au_mot("parenthèse, x plus 4")
        par = res[rang("3x + 12 = 3 × (x + 4)", "(x + 4)")]
        self.play(TransformFromCopy(lbls[0], par[1:4]), FadeIn(par[0]), FadeIn(par[4]), run_time=0.9)
        boite = SurroundingRectangle(res[rang("3x + 12 = 3 × (x + 4)", "3 × (x + 4)")], color=VERT_OK, buff=0.15)
        self.play(Create(boite), run_time=0.5)
        self.insister(VGroup(res[rang("3x + 12 = 3 × (x + 4)", "3 × (x + 4)")], boite), 1.25, bord=LEFT)
        self.attendre_voix(marge=1.2)

    # ── 02 : les deux sens ──────────────────────────────────────────────────

    def ecran_sens(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-sens")
        self.titre_ecran("Développer ou factoriser ?")
        prod = ex("3 × (x + 4)", 60, verts=["3"]).move_to(P(-4.0, 0.3))
        som = ex("3x + 12", 60).move_to(P(2.4, 0.3))
        self.play(FadeIn(prod), FadeIn(som))
        haut = CurvedArrow(prod.get_top() + UP * 0.25, som.get_top() + UP * 0.25, angle=-PI / 3,
                           color=BLEU_CALCUL, stroke_width=6)
        bas = CurvedArrow(som.get_bottom() + DOWN * 0.75, prod.get_bottom() + DOWN * 0.75, angle=-PI / 3,
                          color=VERT_OK, stroke_width=6)
        l_dev = self.t("développer", 40, BLEU_CALCUL).next_to(haut, UP, buff=0.12)
        l_fac = self.t("factoriser", 40, VERT_OK).next_to(bas, DOWN, buff=0.12)
        t_prod = self.t("un produit", 30, GREY_A).next_to(prod, DOWN, buff=0.22)
        t_som = self.t("une somme", 30, GREY_A).next_to(som, DOWN, buff=0.22)
        self.au_mot("Développer")
        self.play(Create(haut), FadeIn(l_dev), run_time=1.0)
        self.au_mot("un produit")
        self.play(FadeIn(t_prod), Indicate(prod, color=BLEU_CALCUL), run_time=0.8)
        self.au_mot("en somme")
        self.play(FadeIn(t_som), Indicate(som, color=BLEU_CALCUL), run_time=0.8)
        self.au_mot("Factoriser")
        self.play(Create(bas), FadeIn(l_fac), run_time=1.0)
        self.insister(l_fac, 1.4)
        self.au_mot("une somme en produit")
        self.play(Indicate(som, color=VERT_OK), run_time=0.6)
        self.play(Indicate(prod, color=VERT_OK), run_time=0.6)
        self.au_mot("Même égalité")
        self.play(Write(self.chute("Même égalité, lue dans l'autre sens.", color=BLEU_CALCUL, font_size=36)))
        self.attendre_voix()

    # ── 03 : le facteur commun ──────────────────────────────────────────────

    def ecran_facteur(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-facteur")
        self.titre_ecran("Le facteur commun")
        self.au_mot("je cherche")
        meth = self.t("Je cherche le facteur commun à tous les termes.", 32, BLEU_CALCUL).move_to(P(-0.6, 2.6))
        self.play(FadeIn(meth, shift=DOWN * 0.2))
        T1, T2, T3 = "5x − 15", "= 5 × x − 5 × 3", "= 5 × (x − 3)"
        l2 = ex(T2, 66).move_to(P(-1.0, 0.0))
        l1 = ex(T1, 66).move_to(P(0, 1.4)).align_to(l2[1], LEFT)
        l3 = ex(T3, 66).move_to(P(0, -1.4)).align_to(l2, LEFT)
        l3[1:].next_to(l3[0], RIGHT, buff=0.45)
        self.au_mot("5 x moins 15")
        self.play(Write(l1))
        self.au_mot("5 fois x")
        self.play(Write(l2[rang(T2, "= 5 × x")]))
        self.au_mot("moins 5 fois 3")
        self.play(Write(l2[rang(T2, "− 5 × 3")]))
        self.au_mot("Le facteur commun est 5")
        cinqs = [l2[rang(T2, "5", 0)], l2[rang(T2, "5", 1)]]
        anneaux = VGroup(*[self.anneau(c) for c in cinqs])
        self.play(*[c.animate.set_color(COUL_FACTEUR) for c in cinqs], Create(anneaux), run_time=0.8)
        self.play(*[c.animate.scale(1.5) for c in cinqs], run_time=0.4)
        self.play(*[c.animate.scale(1 / 1.5) for c in cinqs], run_time=0.4)
        self.au_mot("Donc 5 fois")
        l3[rang(T3, "5")].set_color(COUL_FACTEUR)
        self.play(FadeIn(l3[rang(T3, "=")]), run_time=0.3)
        self.sortir(cinqs, l3[rang(T3, "5")])
        self.play(FadeIn(l3[rang(T3, "×")]), run_time=0.3)
        self.au_mot("parenthèse, x moins 3")
        par = l3[rang(T3, "(x − 3)")]
        self.play(FadeIn(par[0]), FadeIn(par[4]),
                  TransformFromCopy(l2[rang(T2, "x")], par[1]),
                  TransformFromCopy(l2[rang(T2, "−")], par[2]),
                  TransformFromCopy(l2[rang(T2, "3")], par[3]), run_time=1.0)
        boite = SurroundingRectangle(l3[1:], color=VERT_OK, buff=0.1)
        self.play(Create(boite), run_time=0.5)
        self.insister(VGroup(l3[1:], boite), 1.25, bord=LEFT)
        self.attendre_voix()

    # ── 04 : une lettre en facteur ──────────────────────────────────────────

    def ecran_lettre(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-lettre")
        self.titre_ecran("Le facteur commun peut être une lettre")
        T1, T2, T3 = "x² + 7x", "= x × x + 7 × x", "= x × (x + 7)"
        l2 = ex(T2, 66).move_to(P(-1.0, 0.3))
        l1 = ex(T1, 66).move_to(P(0, 1.8)).align_to(l2[1], LEFT)
        l3 = ex(T3, 66).move_to(P(0, -1.2)).align_to(l2, LEFT)
        l3[1:].next_to(l3[0], RIGHT, buff=0.45)
        self.au_mot("x au carré plus 7 x")
        self.play(Write(l1))
        self.play(Indicate(l1[0:2], color=COUL_LETTRE, scale_factor=1.3), run_time=0.6)
        self.au_mot("x fois x, plus")
        self.play(Write(l2[rang(T2, "= x × x")]))
        self.au_mot("plus 7 fois x")
        self.play(Write(l2[rang(T2, "+ 7 × x")]))
        self.au_mot("Le facteur commun est x")
        xs = [l2[rang(T2, "x", 0)], l2[rang(T2, "x", 2)]]
        anneaux = VGroup(*[self.anneau(c) for c in xs])
        self.play(*[c.animate.set_color(COUL_FACTEUR) for c in xs], Create(anneaux), run_time=0.8)
        self.play(*[c.animate.scale(1.5) for c in xs], run_time=0.4)
        self.play(*[c.animate.scale(1 / 1.5) for c in xs], run_time=0.4)
        self.au_mot(": x fois")
        l3[rang(T3, "x", 0)].set_color(COUL_FACTEUR)
        self.play(FadeIn(l3[rang(T3, "=")]), run_time=0.3)
        self.sortir(xs, l3[rang(T3, "x", 0)])
        self.play(FadeIn(l3[rang(T3, "×")]), run_time=0.3)
        self.au_mot("parenthèse, x plus 7")
        par = l3[rang(T3, "(x + 7)")]
        self.play(FadeIn(par[0]), FadeIn(par[4]),
                  TransformFromCopy(l2[rang(T2, "x", 1)], par[1]),
                  TransformFromCopy(l2[rang(T2, "+")], par[2]),
                  TransformFromCopy(l2[rang(T2, "7")], par[3]), run_time=1.0)
        boite = SurroundingRectangle(l3[1:], color=VERT_OK, buff=0.1)
        self.play(Create(boite), run_time=0.5)
        self.insister(VGroup(l3[1:], boite), 1.25, bord=LEFT)
        self.attendre_voix()

    # ── 05 : vérifier en développant ────────────────────────────────────────

    def ecran_verifier(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-verifier")
        self.titre_ecran("Toujours vérifier en développant")
        T1 = "6x + 12 = 6 × (x + 12)"
        l1 = ex(T1, 50).move_to(P(-1.4, 1.5))
        eleve = self.t("Un élève écrit :", 30, ORANGE_RETENUE).next_to(l1, UP, buff=0.35).align_to(l1, LEFT)
        self.au_mot("Un élève écrit")
        self.play(FadeIn(eleve))
        self.au_mot("6 x plus 12 égale")
        self.play(Write(l1[rang(T1, "6x + 12")]))
        self.au_mot("égale 6 fois")
        self.play(Write(l1[rang(T1, "= 6 × (x + 12)")]))
        self.au_mot("Je développe")
        six = l1[rang(T1, "6", 1)]
        fx = CurvedArrow(six.get_top() + UP * 0.1, l1[rang(T1, "x", 1)].get_top() + UP * 0.1,
                         angle=-PI / 2.2, color=BLEU_CALCUL, stroke_width=4, tip_length=0.18)
        f12 = CurvedArrow(six.get_top() + UP * 0.1, l1[rang(T1, "12", 1)].get_top() + UP * 0.1,
                          angle=-PI / 2.6, color=BLEU_CALCUL, stroke_width=4, tip_length=0.18)
        self.play(Create(fx), run_time=0.6)
        self.play(Create(f12), run_time=0.6)
        T2 = "= 6x + 72"
        l2 = ex(T2, 50).next_to(l1, DOWN, buff=0.55)
        l2.align_to(l1[rang(T1, "=")], LEFT)
        self.au_mot("6 x plus 72")
        self.play(Write(l2))
        self.insister(l2[rang(T2, "72")])
        self.au_mot("Ce n'est pas")
        neq = VGroup(self.t("≠", 50, ROUGE_ERREUR), self.t("6x  +  12", 50, ROUGE_ERREUR)).arrange(RIGHT, buff=0.25)
        neq.next_to(l2, RIGHT, buff=0.35)
        self.play(FadeIn(neq))
        self.au_mot("c'est faux")
        faux_droite = l1[rang(T1, "6 × (x + 12)")]
        barre = self.barrer(faux_droite)
        faux = self.t("faux", 40, ROUGE_ERREUR).next_to(l1, RIGHT, buff=0.35)
        self.play(Create(barre), FadeIn(faux), l1[rang(T1, "12", 1)].animate.set_color(ROUGE_ERREUR), run_time=0.7)
        self.au_mot("La bonne réponse")
        T3 = "6x + 12 = 6 × (x + 2)"
        l3 = ex(T3, 50, verts=[("6", 1)]).move_to(P(-0.6, -1.9)).align_to(l1, LEFT)
        bonne = self.t("La bonne réponse :", 30, VERT_OK).next_to(l3, UP, buff=0.3).align_to(l3, LEFT)
        self.play(FadeIn(bonne), Write(l3[rang(T3, "6x + 12 =")]), run_time=0.9)
        self.au_mot("6 fois, parenthèse, x plus 2")
        self.play(Write(l3[rang(T3, "6 × (x + 2)")]))
        boite = SurroundingRectangle(l3[rang(T3, "6 × (x + 2)")], color=VERT_OK, buff=0.15)
        self.play(Create(boite), run_time=0.5)
        self.insister(VGroup(l3[rang(T3, "6 × (x + 2)")], boite), 1.25, bord=LEFT)
        self.attendre_voix()

    # ── 06 : à quoi ça sert ─────────────────────────────────────────────────

    def porte(self, centre, haut_txt, bas_txt=None, largeur=3.4, hauteur=2.3):
        cadre = Rectangle(width=largeur, height=hauteur, stroke_color=WHITE, stroke_width=4).move_to(centre)
        if bas_txt:
            contenu = VGroup(ex(haut_txt, 26), ex(bas_txt, 46, color=VERT_OK)).arrange(DOWN, buff=0.3)
        else:
            contenu = ex(haut_txt, 46, color=VERT_OK)
        contenu.move_to(cadre).shift(RIGHT * 0.12)
        panneau = Rectangle(width=largeur - 0.1, height=hauteur - 0.1, stroke_color="#5C3A1E", stroke_width=3,
                            fill_color=BOIS, fill_opacity=1).move_to(cadre)
        poignee = Dot(panneau.get_right() + LEFT * 0.28, radius=0.08, color=JAUNE_TITRE)
        return cadre, contenu, VGroup(panneau, poignee)

    def ecran_utilite(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-utilite")
        self.titre_ecran("À quoi ça sert ?")
        self.au_mot("Un produit est nul")
        regle = self.t("Un produit est nul si l'un de ses facteurs est nul.", 32, BLEU_CALCUL).move_to(P(-0.6, 2.6))
        self.play(FadeIn(regle, shift=DOWN * 0.2))
        T1, T2 = "x² − 3x = 0", "x × (x − 3) = 0"
        l1 = ex(T1, 54).move_to(P(-0.8, 1.6))
        l2 = ex(T2, 54, verts=[("x", 0)]).move_to(P(-0.8, 0.5))
        self.au_mot("x au carré moins 3 x")
        self.play(Write(l1))
        self.au_mot("devient x fois")
        self.play(Write(l2[rang(T2, "x ×")]))
        self.au_mot("parenthèse, x moins 3")
        self.play(Write(l2[rang(T2, "(x − 3)")]))
        self.play(Write(l2[rang(T2, "= 0")]), run_time=0.6)
        c1, t1, p1 = self.porte(P(-4.0, -1.95), "x = 0")
        c2, t2, p2 = self.porte(P(2.2, -1.95), "x − 3 = 0", "x = 3")
        ou = self.t("ou", 44, JAUNE_TITRE).move_to(P(-0.9, -1.95))
        f1 = Arrow(l2[rang(T2, "x", 0)].get_bottom(), c1.get_top(), buff=0.1, color=VERT_OK, stroke_width=5)
        f2 = Arrow(l2[rang(T2, "(x − 3)")].get_bottom(), c2.get_top(), buff=0.1, color=WHITE, stroke_width=5)
        self.add(t1, t2)
        self.play(FadeIn(c1), FadeIn(p1), FadeIn(c2), FadeIn(p2), GrowArrow(f1), GrowArrow(f2), run_time=0.8)
        self.au_mot("donc x égale 0")
        self.play(p1.animate.stretch(0.06, 0, about_edge=LEFT), run_time=0.8)
        self.insister(t1, 1.35)
        self.au_mot("ou x égale 3")
        self.play(FadeIn(ou), p2.animate.stretch(0.06, 0, about_edge=LEFT), run_time=0.8)
        self.insister(t2[1], 1.35)
        self.attendre_voix()

    # ── 07 : défi ───────────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        self.au_mot("Factorise")
        self.play(FadeIn(self.t("Factorise :", 40, BLEU_CALCUL).move_to(P(-0.6, 2.0))))
        a = ex("4x + 20", 80).move_to(P(-0.6, 0.85))
        b = ex("2x² − 6x", 80).move_to(P(-0.6, -0.9))
        self.au_mot("4 x plus 20")
        self.play(Write(a))
        self.au_mot("2 x au carré moins 6 x")
        self.play(Write(b))
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=40)))
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("07b-correction")
        self.titre_ecran("Correction")
        TA = "4x + 20 = 4 × (x + 5)"
        la = ex(TA, 50, verts=[("4", 1)]).move_to(P(-0.8, 2.1))
        self.au_mot("4 x plus 20")
        self.play(Write(la[rang(TA, "4x + 20")]))
        self.au_mot("4 fois, parenthèse")
        self.play(Write(la[rang(TA, "= 4 × (x + 5)")]))
        ba = SurroundingRectangle(la[rang(TA, "4 × (x + 5)")], color=VERT_OK, buff=0.12)
        self.play(Create(ba), run_time=0.5)
        TB, TC = "2x² − 6x = 2x × x − 2x × 3", "= 2x × (x − 3)"
        lb = ex(TB, 50).move_to(P(-0.8, 0.3))
        lc = ex(TC, 50, verts=["2x"])
        lc.next_to(lb, DOWN, buff=0.8)
        lc.shift(RIGHT * (lb[rang(TB, "=")].get_left()[0] - lc[0].get_left()[0]))
        lc[1:].next_to(lc[0], RIGHT, buff=0.35)
        self.au_mot("2 x au carré moins 6 x")
        self.play(Write(lb[rang(TB, "2x² − 6x")]))
        self.au_mot("le facteur commun est 2 x")
        self.play(Write(lb[rang(TB, "= 2x × x − 2x × 3")]), run_time=1.0)
        deux = [lb[rang(TB, "2x", 1)], lb[rang(TB, "2x", 2)]]
        anneaux = VGroup(*[self.anneau(d) for d in deux])
        self.play(*[d.animate.set_color(COUL_FACTEUR) for d in deux], Create(anneaux), run_time=0.7)
        self.au_mot("2 x fois")
        self.play(FadeIn(lc[rang(TC, "=")]), run_time=0.3)
        self.sortir(deux, lc[rang(TC, "2x")], run_time=1.0)
        self.play(FadeIn(lc[rang(TC, "×")]), run_time=0.3)
        self.au_mot("parenthèse, x moins 3")
        self.play(Write(lc[rang(TC, "(x − 3)")]), run_time=0.8)
        bc = SurroundingRectangle(lc[1:], color=VERT_OK, buff=0.08)
        self.play(Create(bc), run_time=0.5)
        self.insister(VGroup(lc[1:], bc), 1.25, bord=LEFT)
        self.attendre_voix(marge=1.5)

    # ── 08 : ce que tu as appris (règle du 13/10 : des affirmations, pas des questions) ────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-finale")
        self.play(Write(self.t("Ce que tu as appris", 46, JAUNE_TITRE).to_edge(UP)))
        questions = [
            ("Factoriser, c'est trouver", "Trouver le facteur commun, nombre ou lettre."),
            ("On écrit la forme", "Écrire la forme factorisée."),
            ("Et on vérifie", "Vérifier toujours en développant."),
        ]
        lignes = VGroup(*[VGroup(self.coche(), self.t(txt, 36)).arrange(RIGHT, buff=0.3)
                          for _, txt in questions])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.55).move_to(P(-0.3, 0.5))
        for (mot, _), l in zip(questions, lignes):
            self.au_mot(mot)
            self.play(FadeIn(l[1], shift=RIGHT * 0.2), run_time=0.6)
            self.play(Create(l[0]), run_time=0.4)
        self.au_mot("L'épisode 6")
        self.play(Write(self.chute("Épisode 6 : les identités remarquables", color=VERT_OK, font_size=38)))
        self.attendre_voix(marge=1.0)

    # ── déroulé ─────────────────────────────────────────────────────────────

    def construct(self):
        self.page_de_garde()
        self.ecran_tablette()
        self.ecran_sens()
        self.ecran_facteur()
        self.ecran_lettre()
        self.ecran_verifier()
        self.ecran_utilite()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="09-abonne")
