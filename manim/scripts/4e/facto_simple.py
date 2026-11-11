# facto_simple.py
# EleveAI — Maths 4e — série FACTORISATION, épisode 02 : FACTORISER une somme simple.
# Paysage 16:9, AVEC VOIX, ceinture JAUNE. Micro : litteral_factoriser (tous les écrans).
# Métier : Maya, développeuse. Centres : numérique.
# Écrans : garde (00) ; le programme de Maya, 9 × 37 + 9 × 63 = 9 × (37 + 63) (01) ;
# la méthode sur 3x + 21 (02) ; avant / après : une somme devient un produit (03) ;
# QUESTION 1 (03q, réponse C) ; avec un moins, 2x − 18 (04) ; le piège 6x + 6, il reste 1 (05) ;
# une lettre en facteur, x² + 5x et ses deux rectangles (06) ; QUESTION 2 (06q, réponse A) ;
# défi 7x − 56 (07) et correction (07b) ; ce que tu as appris (08) ; fin du 05/11 (09).
# Code couleur (celui de la série) : x bleu ; le FACTEUR COMMUN orange ; juste vert ; piège rouge.
# Voix : manim/voix/4e-facto-simple.json (validée le 11/11) ; marques : facto_simple_marques.json.
#
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/facto_simple.py FactoSimple4e --media_dir manim/scripts/4e/media-facto-02-audit
# Rendu : python -m manim render -qh --disable_caching manim/scripts/4e/facto_simple.py FactoSimple4e -o eleveai-maths-4e-facto-simple --media_dir manim/scripts/4e/media-facto-02
# Sortie : manim/sorties/4e/maths/factorisation/02-simple/eleveai-maths-4e-facto-simple.mp4

import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI))

from relatif_commun import *  # noqa: E402,F403
from equation_commun import PAROLE  # noqa: E402

PAROLE["²"] = "carré"

FACTEUR = OPERATION  # le facteur commun
CARRE = "#2563eb"
RECT = "#1d4ed8"


def D(s, fs=56, couleur=WHITE, lettres="xy", audit=True):
    """Une expression : les lettres en bleu."""
    return E(s, fs, couleur, lettres=lettres, audit=audit)


class Morceau:
    """Une partie des atomes d'une expression, à poser au mot avec dire_eq."""

    def __init__(self, atomes, s):
        self.atomes = list(atomes)
        self.s = s


def maya(s=0.78):
    """Maya, développeuse : sweat violet et ordinateur portable."""
    m = Metier(["Maya", "développeuse"], fs=32, peau="#c68642", tenue="#7c3aed", cheveux="#111827", longs=True, s=s)
    m.nom.arrange(DOWN, buff=0.12)
    p = m.perso
    ecr = RoundedRectangle(width=0.62 * s, height=0.42 * s, corner_radius=0.03, fill_color="#0f172a", fill_opacity=1,
                           stroke_color="#cbd5e1", stroke_width=3)
    lignes = VGroup(*[Line(P(-0.18, 0), P(0.1 - 0.08 * k, 0), color=c, stroke_width=3).shift(DOWN * 0.09 * k)
                      for k, c in enumerate(("#22c55e", "#93c5fd", "#f59e0b"))]).scale(s)
    lignes.move_to(ecr)
    base = RoundedRectangle(width=0.78 * s, height=0.07 * s, corner_radius=0.02, fill_color="#cbd5e1", fill_opacity=1,
                            stroke_width=0).next_to(ecr, DOWN, buff=0)
    pc = VGroup(ecr, lignes, base).move_to(p.get_center() + P(0.05, -0.55) * s)
    p.add(pc)
    return m


def ecran_code(w=8.4, h=2.9):
    """L'éditeur de code de Maya : la fenêtre, sa barre et ses trois boutons."""
    fond = RoundedRectangle(width=w, height=h, corner_radius=0.12, fill_color="#0b1220", fill_opacity=1,
                            stroke_color="#475569", stroke_width=3)
    barre = Rectangle(width=w - 0.12, height=0.34, fill_color="#1e293b", fill_opacity=1, stroke_width=0)
    barre.move_to(fond.get_top() + DOWN * 0.23)
    pts = VGroup(*[Circle(radius=0.07, fill_color=c, fill_opacity=1, stroke_width=0)
                   for c in ("#ef4444", "#f59e0b", "#22c55e")]).arrange(RIGHT, buff=0.1)
    pts.move_to(barre).align_to(barre, LEFT).shift(RIGHT * 0.18)
    nom = T("calcul.py", 22, "#94a3b8", audit=False).next_to(pts, RIGHT, buff=0.3)
    return VGroup(fond, barre, pts, nom)


class FactoSimple4e(PaysageRel):
    nom_voix = "4e-facto-simple"
    fichier_marques = "facto_simple_marques.json"
    ceinture = "jaune"

    def cadre(self, m, couleur=CIEL, buff=0.12):
        return SurroundingRectangle(m, color=couleur, buff=buff, stroke_width=3, corner_radius=0.08)

    def poser_droite(self, g, k, phrase, gauche_avant=True):
        """g = « somme = produit » : la somme (rappel) d'un coup, puis le produit (atomes k…) au mot."""
        gauche = VGroup(*g.atomes[:k])
        for a in g.atomes[:k]:
            a._pas_audit = True  # la somme de départ : un rappel
        if gauche_avant:
            self.play(FadeIn(gauche, shift=RIGHT * 0.2), run_time=0.3)
        self.dire_eq(Morceau(g.atomes[k:], g.s), phrase, echelle=1.2)

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Factoriser", self.identite, self.ceinture, y_ech=-2.65)
        for m in (titre, ident):
            m.sans_synchro = True
        ident._pas_audit = True
        self.au("Factoriser", Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), rt=0.7)
        s = D("3x + 21", 72, audit=False).move_to(P(-4.0, 1.2))
        p = D("3(x + 7)", 72, audit=False).move_to(P(-4.0, -0.9))
        p.atomes[0].set_color(FACTEUR)
        fl = Arrow(s.get_bottom(), p.get_top(), buff=0.12, color=FACTEUR, stroke_width=6,
                   max_tip_length_to_length_ratio=0.3)
        l1 = self.lg("Comment transformer", 2.9, 0.95, 44, maxw=7.0)
        self.dit(l1, "Comment transformer", avec=[FadeIn(s, shift=UP * 0.2)])
        l1b = self.lg("une somme", 2.9, 0.2, 44, maxw=7.0)
        self.dit(l1b, "une somme")
        l2 = self.lg("en produit ?", 2.9, -0.6, 52, JAUNE_TITRE, maxw=7.0)
        self.dit(l2, "en produit ?", avec=[GrowArrow(fl), FadeIn(p, shift=DOWN * 0.2)])
        self.insister(l2, 1.12, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 01 : le programme de Maya ───────────────────────────────────────────
    def ecran_developpeuse(self):
        self.ecran("01-developpeuse")
        m = maya(0.92)
        m.perso.move_to(P(-4.9, 0.55))
        m.nom.next_to(m.perso, UP, buff=0.14).set_x(-4.9)
        self.au("Maya", FadeIn(m.perso, shift=UP * 0.3), FadeIn(m.nom[0], shift=UP * 0.1), rt=0.35)
        self.au("développeuse", FadeIn(m.nom[1], shift=UP * 0.1), rt=0.3)
        ecr = ecran_code(8.4, 3.1).move_to(P(1.15, 0.95))
        l1 = self.lg("Son programme doit calculer", 1.15, 3.0, 38, CIEL, maxw=8.2)
        self.dit(l1, "Son programme doit calculer", avec=[FadeIn(ecr, shift=UP * 0.2)])
        e1 = D("9 × 37 + 9 × 63", 54).move_to(P(1.15, 1.65))
        self.dire_eq(e1, "9 fois 37, plus 9 fois 63.", echelle=1.2)
        l2 = self.lg("Ça fait deux multiplications.", 1.15, -1.2, 38, maxw=8.4)
        self.dit(l2, "Ça fait deux multiplications.",
                 avec=[Circumscribe(e1.atomes[1], color=CIEL, buff=0.06), Circumscribe(e1.atomes[5], color=CIEL, buff=0.06)])
        neufs = VGroup(e1.atomes[0], e1.atomes[4])
        l3 = self.lg("Maya repère le facteur commun :", 0, 0, 36, maxw=8.6)
        l3b = self.lg("9.", 0, 0, 44, FACTEUR, maxw=1)
        VGroup(l3, l3b).arrange(RIGHT, buff=0.25).move_to(P(1.4, -1.92))
        self.dit(l3, "Maya repère le facteur commun :")
        self.dit(l3b, "commun : 9.", avec=[neufs.animate.set_color(FACTEUR)])
        self.play(Circumscribe(e1.atomes[0], color=FACTEUR, buff=0.08), Circumscribe(e1.atomes[4], color=FACTEUR, buff=0.08),
                  run_time=0.25)
        e2 = D("9 × (37 + 63)", 54).move_to(P(1.15, 0.85))
        e2.atomes[0].set_color(FACTEUR)
        self.au("Elle écrit", e1.animate.set_opacity(0.45), rt=0.3)
        self.dire_eq(e2, "9 fois, entre parenthèses, 37 plus 63.", echelle=1.2)
        e3 = D("= 9 × 100 = 900", 54)
        e3.move_to(P(1.15, 0.05))
        self.dire_eq(e3, "C'est 9 fois 100 : 900.", echelle=1.2)
        self.play(e3.atomes[-1].animate.set_color(VERT_OK), run_time=0.15)
        l4 = self.lg("Une seule multiplication, et de tête !", 0.7, -2.72, 36, VERT_OK, maxw=9.6)
        self.dit(l4, "Une seule multiplication, et de tête !",
                 avec=[Circumscribe(VGroup(e2.atomes[1]), color=VERT_OK, buff=0.06)])
        self.insister(l4, 1.08, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 02 : la méthode sur 3x + 21 ─────────────────────────────────────────
    def ecran_methode(self):
        self.ecran("02-methode")
        tit = self.lg("Avec une lettre, c'est pareil.", 0, 3.05, 44, JAUNE_TITRE, maxw=11)
        self.dit(tit, "Avec une lettre, c'est pareil.")
        f = self.lg("Factorisons", 0, 0, 40, maxw=4)
        e = D("3x + 21.", 60)
        VGroup(f, e).arrange(RIGHT, buff=0.4).move_to(P(0, 2.15))
        self.dit(f, "Factorisons")
        self.dire_eq(e, "3 x plus 21.", echelle=1.2)
        d = self.lg("D'abord, le facteur commun :", 0, 1.25, 38, CIEL, maxw=10)
        self.dit(d, "D'abord, le facteur commun :")
        a = D("3x = 3 × x", 52).move_to(P(-3.3, 0.4))
        self.dire_eq(a, "3 x, c'est 3 fois x,")
        b = D("21 = 3 × 7", 52).move_to(P(3.3, 0.4))
        self.dire_eq(b, "21, c'est 3 fois 7.")
        trois = VGroup(a.atomes[3], b.atomes[2])
        r = self.lg("Le facteur commun est 3.", 0, -0.5, 46, JAUNE_TITRE, maxw=10)
        self.dit(r, "Le facteur commun est 3.", avec=[trois.animate.set_color(FACTEUR)])
        self.play(Circumscribe(a.atomes[3], color=FACTEUR, buff=0.1), Circumscribe(b.atomes[2], color=FACTEUR, buff=0.1),
                  run_time=0.5)
        # la construction, pièce par pièce, à droite
        c = D("3(x + 7)", 66, audit=False).move_to(P(3.6, -1.75))
        c.atomes[0].set_color(FACTEUR)
        l5 = self.lg("On l'écrit devant", 0, 0, 36, maxw=4.6)
        l5b = self.lg("la parenthèse.", 0, 0, 36, maxw=4.0)
        VGroup(l5, l5b).arrange(RIGHT, buff=0.25).move_to(P(-2.55, -1.45))
        self.dit(l5, "On l'écrit devant")
        self.play(TransformFromCopy(a.atomes[3], c.atomes[0]), run_time=0.4)
        self.dit(l5b, "la parenthèse.", avec=[FadeIn(VGroup(c.atomes[1], c.atomes[5]), scale=1.3)])
        l6a = self.lg("Dans la parenthèse,", 0, 0, 36, maxw=5.5)
        l6b = self.lg("on met ce qui reste :", 0, 0, 36, maxw=5.5)
        l6 = VGroup(l6a, l6b).arrange(DOWN, aligned_edge=LEFT, buff=0.18)
        l6.align_to(l5, LEFT).set_y(-2.4)
        self.dit(l6a, "Dans la parenthèse,")
        self.dit(l6b, "on met ce qui reste :",
                 avec=[a.atomes[5].animate.set_color(CIEL), b.atomes[4].animate.set_color(CIEL)])
        self.dire_eq(Morceau(c.atomes[2:5], "x + 7"), "reste : x plus 7.", echelle=1.3,
                     avec=[Circumscribe(a.atomes[5], color=CIEL, buff=0.08), Circumscribe(b.atomes[4], color=CIEL, buff=0.08)])
        # Donc : l'égalité entière, en bas
        g = D("3x + 21 = 3(x + 7)", 62).move_to(P(-0.4, -2.0))
        g.atomes[5].set_color(FACTEUR)
        for a_ in g.atomes[5:]:
            a_._pas_audit = True  # le produit déjà construit, qui glisse à sa place
        self.au("Donc", FadeOut(VGroup(l5, l5b, l6)), rt=0.3)
        self.dire_eq(Morceau(g.atomes[:5], "3x + 21 ="), "Donc 3 x plus 21 égale", echelle=1.2)
        self.au("égale 3 fois", *[ReplacementTransform(c.atomes[i], g.atomes[5 + i]) for i in range(6)], rt=0.6)
        self.play(Create(self.cadre_ok(g, 0.16)), run_time=0.25)
        self.insister(VGroup(*g.atomes[5:]), 1.12, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 03 : avant / après ──────────────────────────────────────────────────
    def ecran_produit(self):
        self.ecran("03-produit")
        s = D("3x + 21", 66, audit=False).move_to(P(-3.7, 1.75))
        p = D("3(x + 7)", 66, audit=False).move_to(P(3.7, 1.75))
        p.atomes[0].set_color(FACTEUR)
        av = self.lg("Avant :", -3.7, 2.85, 40, CIEL, maxw=3)
        self.dit(av, "Avant :", avec=[FadeIn(s, shift=UP * 0.2)])
        bs = Brace(s, DOWN, buff=0.15, color=CIEL)
        ls1 = self.lg("une somme", 0, 0, 34, maxw=4).next_to(bs, DOWN, buff=0.12)
        ls2 = self.lg("de deux termes.", 0, 0, 34, maxw=4).next_to(ls1, DOWN, buff=0.12)
        self.dit(ls1, "une somme", avec=[GrowFromCenter(bs)])
        self.dit(ls2, "de deux termes.")
        c1, c2 = self.cadre(VGroup(s.atomes[0], s.atomes[1])), self.cadre(s.atomes[3])
        self.play(Create(c1), Create(c2), run_time=0.3)
        fl = Arrow(P(-1.75, 1.95), P(1.45, 1.95), buff=0, color=FACTEUR, stroke_width=6,
                   max_tip_length_to_length_ratio=0.15)
        ap = self.lg("Après :", 3.7, 2.85, 40, CIEL, maxw=3)
        self.dit(ap, "Après :", avec=[GrowArrow(fl), FadeIn(p, shift=UP * 0.2)])
        bp = Brace(p, DOWN, buff=0.15, color=FACTEUR)
        lp1 = self.lg("un produit,", 0, 0, 34, maxw=4).next_to(bp, DOWN, buff=0.12)
        lp2 = self.lg("3 fois une parenthèse.", 0, 0, 34, maxw=5.6).next_to(lp1, DOWN, buff=0.12)
        self.dit(lp1, "un produit,", avec=[GrowFromCenter(bp)])
        self.dit(lp2, "3 fois une parenthèse.",
                 avec=[Circumscribe(p.atomes[0], color=FACTEUR, buff=0.08),
                       Circumscribe(VGroup(*p.atomes[1:]), color=WHITE, buff=0.08)])
        tf = T("factoriser", 30, FACTEUR).next_to(fl, UP, buff=0.12)
        fac1 = self.lg("Factoriser, c'est transformer", 0, -0.75, 44, JAUNE_TITRE, maxw=12)
        fac2 = self.lg("une somme en produit.", 0, -1.45, 44, JAUNE_TITRE, maxw=12)
        fac = VGroup(fac1, fac2)
        self.dit(fac1, "Factoriser, c'est transformer", avec=[FadeIn(tf, shift=DOWN * 0.1)])
        self.dit(fac2, "une somme en produit.")
        self.insister(fac, 1.06, 0.2)
        fl2 = Arrow(P(1.45, 1.45), P(-1.75, 1.45), buff=0, color=CIEL, stroke_width=6,
                    max_tip_length_to_length_ratio=0.15)
        td = T("développer", 30, CIEL).next_to(fl2, DOWN, buff=0.12)
        dev = self.lg("C'est le chemin inverse de développer.", 0, -2.45, 40, maxw=11.6)
        self.dit(dev, "C'est le chemin inverse de")
        self.au("développer", GrowArrow(fl2), FadeIn(td, shift=UP * 0.1), rt=0.4)
        self.insister(VGroup(fl2, td), 1.15, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 03q : QUESTION 1 (réponse C) ────────────────────────────────────────
    def figure_q(self, s, gauche, droite, i_g, i_d, k):
        """La figure d'une question : l'expression, et sous chaque terme son produit (posé avec la réponse)."""
        e = D(s, 76, audit=False).move_to(P(-3.6, 1.0))
        a = D(gauche, 46, audit=False)
        b = D(droite, 46, audit=False)
        a.next_to(e.atomes[i_g], DOWN, buff=0.75)
        b.next_to(e.atomes[i_d], DOWN, buff=0.75)
        if b.get_left()[0] < a.get_right()[0] + 0.4:
            b.shift(RIGHT * (a.get_right()[0] + 0.4 - b.get_left()[0]))
        for m, j in ((a, k[0]), (b, k[1])):
            m.atomes[j].set_color(FACTEUR)
        return e, a, b

    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        self.XL = 0.6
        e, a, b = self.figure_q("5x + 35", "5 × x", "5 × 7", 0, 3, (0, 0))

        def avant(sc):
            sc.eq_dans_q(0, "Factorise 5x + 35.", "Factorise 5 x plus 35.", lettres="x", fs=36)
            sc.play(FadeIn(e, shift=UP * 0.2), run_time=0.3)

        def apres(sc):
            sc.ph_eq(0, "Réponse C : 5(x + 7).", "Réponse C : 5 fois, entre parenthèses, x plus 7.", lettres="x",
                     premier=True)
            sc.ph_eq(1, "35 = 5 × 7 :", "35, c'est 5 fois 7 :", avec=[FadeIn(a, shift=DOWN * 0.2), FadeIn(b, shift=DOWN * 0.2)])
            sc.ph_eq(2, "On écrit 7, pas 35.", "on écrit 7, pas 35.",
                     avec=[Circumscribe(b.atomes[2], color=VERT_OK, buff=0.08)])
            sc.rep_fini()

        self.question_pause("03q-question", "03r-reponse", ["Factorise 5x + 35."],
                            [Eq("5(x + 35)", 34), Eq("x(5 + 35)", 34), Eq("5(x + 7)", 34)], 2,
                            ["Réponse C : 5(x + 7).", "35 = 5 × 7 :", "On écrit 7, pas 35."],
                            avant_q=avant, autres_r=apres)
        self.XL = type(self).XL

    # ── 04 : avec un moins ──────────────────────────────────────────────────
    def ecran_moins(self):
        self.ecran("04-moins")
        t = self.lg("Avec un moins :", 0, 0, 46, JAUNE_TITRE, maxw=5)
        e = D("2x − 18.", 66)
        VGroup(t, e).arrange(RIGHT, buff=0.45).move_to(P(-0.3, 2.9))
        self.dit(t, "Avec un moins :")
        self.dire_eq(e, "2 x moins 18.", echelle=1.2)
        a = D("2x = 2 × x", 52).move_to(P(-3.3, 1.6))
        self.dire_eq(a, "2 x, c'est 2 fois x.")
        b = D("18 = 2 × 9", 52).move_to(P(3.3, 1.6))
        self.dire_eq(b, "18, c'est 2 fois 9.")
        deux = VGroup(a.atomes[3], b.atomes[2])
        self.play(deux.animate.set_color(FACTEUR), Circumscribe(a.atomes[3], color=FACTEUR, buff=0.1),
                  Circumscribe(b.atomes[2], color=FACTEUR, buff=0.1), run_time=0.5)
        l = self.lg("Le moins reste dans la parenthèse :", 0, 0.35, 42, maxw=11)
        self.dit(l, "Le moins reste dans la parenthèse :", avec=[e.atomes[2].animate.set_color(JAUNE_TITRE)])
        g = D("2x − 18 = 2(x − 9)", 66).move_to(P(0, -1.1))
        g.atomes[5].set_color(FACTEUR)
        self.poser_droite(g, 5, "2 fois, entre parenthèses, x moins 9.")
        m1, m2 = g.atomes[2], g.atomes[8]
        fm = CurvedArrow(m1.get_bottom() + DOWN * 0.15, m2.get_bottom() + DOWN * 0.15, angle=PI / 3.2,
                         color=JAUNE_TITRE, stroke_width=5, tip_length=0.16)
        self.play(m1.animate.set_color(JAUNE_TITRE), m2.animate.set_color(JAUNE_TITRE), Create(fm), run_time=0.5)
        self.play(Create(self.cadre_ok(g, 0.16)), run_time=0.25)
        self.insister(VGroup(m2, g.atomes[9]), 1.35, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 05 : le piège 6x + 6 ────────────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("05-piege")
        tit = T("Le piège :", 48, PIEGE, gras=True)
        e = D("6x + 6.", 70)
        VGroup(tit, e).arrange(RIGHT, buff=0.5).move_to(P(-0.4, 3.0))
        self.au("Le piège", FadeIn(tit, scale=1.3), rt=0.25)
        self.dire_eq(e, "6 x plus 6.", echelle=1.2)
        a = D("6x = 6 × x", 52).move_to(P(-3.3, 1.8))
        self.dire_eq(a, "6 x, c'est 6 fois x.")
        b = D("6 = 6 × 1", 52).move_to(P(3.3, 1.8))
        self.dire_eq(b, "6, c'est 6 fois 1 !")
        six = VGroup(a.atomes[3], b.atomes[2])
        self.play(six.animate.set_color(FACTEUR), b.atomes[4].animate.set_color(VERT_OK), run_time=0.25)
        self.insister(b.atomes[4], 1.6, 0.18)
        l = self.lg("Il reste 1 dans la parenthèse :", 0, 0.65, 42, JAUNE_TITRE, maxw=11)
        self.dit(l, "Il reste 1 dans la parenthèse :")
        g = D("6x + 6 = 6(x + 1)", 66).move_to(P(0, -0.5))
        g.atomes[5].set_color(FACTEUR)
        self.poser_droite(g, 5, "6 fois, entre parenthèses, x plus 1.")
        self.play(g.atomes[9].animate.set_color(VERT_OK), Create(self.cadre_ok(g, 0.16)), run_time=0.25)
        s1 = self.lg("Sans le 1, on ne retrouverait que 6x :", -1.4, -1.85, 36, lettres="x", maxw=9.4)
        faux = D("6(x) = 6x", 50, couleur=PIEGE, lettres="", audit=False).move_to(P(3.7, -2.65))
        self.dit(s1, "Sans le 1, on ne retrouverait que 6 x :", avec=[FadeIn(faux, shift=LEFT * 0.2)])
        self.play(Create(self.barrer(faux)), run_time=0.25)
        s2 = self.lg("le 6 aurait disparu.", -2.6, -2.65, 42, PIEGE, maxw=6.0)
        trou = DashedVMobject(SurroundingRectangle(e.atomes[3], buff=0.1, color=PIEGE, stroke_width=4), num_dashes=18)
        self.dit(s2, "le 6 aurait disparu.", avec=[Create(trou)])
        self.play(Wiggle(e.atomes[3]), run_time=0.5)
        self.attendre_voix(marge=0.8)

    # ── 06 : une lettre en facteur ──────────────────────────────────────────
    def ecran_lettre(self):
        self.ecran("06-lettre")
        tit = self.lg("Le facteur commun peut être une lettre.", 0, 3.05, 42, JAUNE_TITRE, maxw=12.4)
        self.dit(tit, "Le facteur commun peut être une lettre.")
        e = D("x² + 5x.", 66).move_to(P(-3.6, 1.95))
        self.dire_eq(e, "x au carré plus 5 x.", echelle=1.2)
        # les deux rectangles : x par x (l'aire x²) et x par 5 (l'aire 5x), même hauteur x
        u, hx = 0.4, 1.75
        g0 = P(0.75, -0.55)
        carre = Rectangle(width=hx, height=hx, fill_color=CARRE, fill_opacity=0.85, stroke_color=WHITE, stroke_width=3)
        carre.move_to(g0 + P(hx / 2, hx / 2))
        rect = Rectangle(width=5 * u, height=hx, fill_color=RECT, fill_opacity=0.55, stroke_color=WHITE, stroke_width=3)
        rect.next_to(carre, RIGHT, buff=0.75)
        in1 = D("x²", 46, audit=False).move_to(carre)
        in2 = D("5x", 46, audit=False).move_to(rect)
        h1 = D("x", 36, audit=False).next_to(carre, UP, buff=0.1)
        h2 = T("5", 36, WHITE, audit=False).next_to(rect, UP, buff=0.1)
        a = D("x² = x × x", 52).move_to(P(-3.6, 0.7))
        self.poser_avec(a, "x au carré, c'est x fois x,", {0: lambda: [FadeIn(carre), FadeIn(h1)], 1: lambda: [FadeIn(in1)]})
        b = D("5x = 5 × x", 52).move_to(P(-3.6, -0.35))
        self.dire_eq(b, "5 x, c'est 5 fois x.", avec=[FadeIn(rect), FadeIn(in2), FadeIn(h2)])
        c1 = D("x", 40, FACTEUR, lettres="", audit=False).next_to(carre, LEFT, buff=0.12)
        c2 = D("x", 40, FACTEUR, lettres="", audit=False).next_to(rect, LEFT, buff=0.12)
        cotes = VGroup(Line(carre.get_corner(DL), carre.get_corner(UL), color=FACTEUR, stroke_width=9),
                       Line(rect.get_corner(DL), rect.get_corner(UL), color=FACTEUR, stroke_width=9))
        xs = VGroup(a.atomes[5], b.atomes[5])
        l = self.lg("On sort le x devant :", -3.6, -1.35, 40, lettres="", maxw=6.0)
        self.dit(l, "On sort le x devant :", avec=[xs.animate.set_color(FACTEUR), Create(cotes), FadeIn(c1), FadeIn(c2)])
        g = D("x² + 5x = x(x + 5)", 62).move_to(P(-1.0, -2.45))
        g.atomes[6].set_color(FACTEUR)
        # les deux rectangles se collent : un seul rectangle, de hauteur x et de longueur x + 5
        d = carre.get_right()[0] - rect.get_left()[0]
        accol = Brace(VGroup(carre, rect.copy().shift(RIGHT * d)), UP, buff=0.1, color=CIEL)
        for a_ in g.atomes[:6]:
            a_._pas_audit = True  # la somme de départ : un rappel
        self.play(FadeIn(VGroup(*g.atomes[:6]), shift=RIGHT * 0.2), run_time=0.3)
        self.dire_eq(Morceau(g.atomes[6:], "x(x + 5)"), "devant : x fois, entre parenthèses, x plus 5.", echelle=1.2,
                     avec=[VGroup(rect, in2, h2).animate.shift(RIGHT * d), FadeOut(c2), FadeOut(cotes[1])])
        lx5 = D("x + 5", 36, audit=False).next_to(accol, UP, buff=0.08)
        self.play(GrowFromCenter(accol), FadeOut(VGroup(h1, h2)), FadeIn(lx5), run_time=0.4)
        self.play(Create(self.cadre_ok(g, 0.16)), run_time=0.25)
        self.insister(VGroup(*g.atomes[6:]), 1.12, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 06q : QUESTION 2 (réponse A) ────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        self.XL = 0.6
        e, a, b = self.figure_q("y² + 8y", "y × y", "8 × y", 0, 3, (0, 2))

        def avant(sc):
            sc.eq_dans_q(0, "Factorise y² + 8y.", "Factorise y au carré plus 8 y.", lettres="y", fs=36)
            sc.play(FadeIn(e, shift=UP * 0.2), run_time=0.3)

        def apres(sc):
            sc.ph_eq(0, "Réponse A : y(y + 8).", "Réponse A : y fois, entre parenthèses, y plus 8.", lettres="y",
                     premier=True)
            sc.ph_eq(1, "Le y sort devant :", "Le y sort devant :", lettres="y",
                     avec=[FadeIn(a, shift=DOWN * 0.2), FadeIn(b, shift=DOWN * 0.2)])
            sc.ph_eq(2, "Il reste y et 8.", "il reste y et 8.", lettres="y",
                     avec=[Circumscribe(VGroup(a.atomes[0], b.atomes[2]), color=FACTEUR, buff=0.1)])
            sc.rep_fini()

        self.question_pause("06q-question", "06r-reponse", ["Factorise y² + 8y."],
                            [Eq("y(y + 8)", 34), Eq("y(y + 8y)", 34), Eq("8(y² + y)", 34)], 0,
                            ["Réponse A : y(y + 8).", "Le y sort devant :", "Il reste y et 8."],
                            avant_q=avant, autres_r=apres)
        self.XL = type(self).XL

    # ── 07 : le défi ────────────────────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("07-defi")
        tit = T("À toi de jouer !", 56, JAUNE_TITRE).move_to(P(0, 2.9))
        self.au("À toi", Write(tit), rt=0.5)
        f = self.lg("Factorise", 0, 0, 50, CIEL, maxw=4)
        e = D("7x − 56", 84)
        VGroup(f, e).arrange(RIGHT, buff=0.5).move_to(P(-0.6, 1.0))
        self.dit(f, "Factorise")
        self.dire_eq(e, "7 x moins 56.", echelle=1.15)
        q = T("= ?", 84, JAUNE_TITRE, audit=False).next_to(e, RIGHT, buff=0.35)
        self.play(FadeIn(q, scale=1.3), run_time=0.2)
        pz = T("Mets pause, et cherche !", 50, ORANGE_RETENUE).move_to(P(-0.4, -1.4))
        self.au("Mets pause", Write(pz), rt=0.5)
        self.defi = dict(tit=tit, f=f, e=e, q=q, pz=pz)
        self.attendre_voix(marge=2.0)

    # ── 07b : la correction ─────────────────────────────────────────────────
    def ecran_correction(self):
        d = self.defi
        self.dire("07b-correction")
        tit = T("Correction", 50, JAUNE_TITRE).move_to(P(0, 2.9))
        e = d["e"]
        self.au("Correction", ReplacementTransform(d["tit"], tit), FadeOut(d["pz"]), FadeOut(d["q"]), FadeOut(d["f"]),
                e.animate.scale(0.75).move_to(P(0, 1.85)), rt=0.4)
        a = D("7x = 7 × x", 52).move_to(P(-3.3, 0.6))
        self.dire_eq(a, "7 x, c'est 7 fois x.")
        b = D("56 = 7 × 8", 52).move_to(P(3.3, 0.6))
        self.dire_eq(b, "56, c'est 7 fois 8.")
        sept = VGroup(a.atomes[3], b.atomes[2])
        self.play(sept.animate.set_color(FACTEUR), Circumscribe(a.atomes[3], color=FACTEUR, buff=0.1),
                  Circumscribe(b.atomes[2], color=FACTEUR, buff=0.1), run_time=0.5)
        r = self.lg("Résultat : 7(x − 8).", 0, -0.75, 58, VERT_OK, lettres="", maxw=10)
        self.dit(r, "Résultat : 7 fois, entre parenthèses, x moins 8.")
        self.play(r.atomes[2].animate.set_color(FACTEUR), Create(self.cadre_ok(r, 0.18)), run_time=0.25)
        self.insister(r, 1.08, 0.2)
        l = self.lg("Le moins reste dans la parenthèse.", 0, -2.2, 42, maxw=11)
        self.dit(l, "Le moins reste dans la parenthèse.",
                 avec=[e.atomes[2].animate.set_color(JAUNE_TITRE), r.atomes[5].animate.set_color(JAUNE_TITRE)])
        self.insister(r.atomes[5], 1.6, 0.18)
        self.attendre_voix(marge=1.2)

    # ── 08 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("08-finale", 0.5)
        s = D("3x + 21", 54, audit=False)
        p = D("3(x + 7)", 54, audit=False)
        p.atomes[0].set_color(FACTEUR)
        VGroup(s, p).arrange(DOWN, buff=1.0)
        fl = Arrow(s.get_bottom(), p.get_top(), buff=0.1, color=FACTEUR, stroke_width=5,
                   max_tip_length_to_length_ratio=0.25)
        tf = T("factoriser", 28, FACTEUR, audit=False).next_to(fl, RIGHT, buff=0.15)
        ecr = ecran_code(2.6, 1.0).next_to(p, DOWN, buff=0.5)
        code = D("9 × (37 + 63)", 28, audit=False).move_to(ecr[0]).shift(DOWN * 0.13)
        code.atomes[0].set_color(FACTEUR)
        fig = VGroup(s, fl, tf, p, ecr, code)
        lignes = self.finale_colonne([["Factoriser, c'est transformer", "une somme en produit."],
                                      ["On écrit le facteur commun", "devant la parenthèse,", "et ce qui reste dedans."],
                                      ["Si un terme est le facteur", "lui-même, il reste 1."]],
                                     fs=38, figure=fig)
        self.play(FadeIn(fig), run_time=0.3)
        self.au("Factoriser, c'est")
        self.montrer_ligne(lignes[0])
        self.au("On écrit")
        self.montrer_ligne(lignes[1])
        self.au("Si un terme", Create(lignes[2][0]), FadeIn(lignes[2][1][0], shift=RIGHT * 0.2), rt=0.5)
        self.au("1.", FadeIn(lignes[2][1][1], shift=RIGHT * 0.2), rt=0.3)
        self.attendre_voix(marge=1.2)

    def construct(self):
        self.page_de_garde()
        self.ecran_developpeuse()
        self.ecran_methode()
        self.ecran_produit()
        self.ecran_question1()
        self.ecran_moins()
        self.ecran_piege()
        self.ecran_lettre()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("09-abonne")
