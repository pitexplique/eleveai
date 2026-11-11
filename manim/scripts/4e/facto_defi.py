# facto_defi.py
# EleveAI — Maths 4e — série FACTORISATION, épisode 05 : les DÉFIS de factorisation.
# Paysage 16:9, AVEC VOIX, ceinture VERTE. Micro : litteral_factoriser (tous les écrans).
# Métier : Malik, comptable d'un club de football. Centres : sport.
# Écrans : garde (00) ; les 8 tenues de Malik (01) ; 8x + 96 = 8(x + 12), la forme factorisée
# raconte la situation (02) ; QUESTION 1 (02q, réponse B) ; corriger deux erreurs (03) ;
# un facteur négatif, −4x − 20 = −4(x + 5) (04) ; QUESTION 2 (04q, réponse A) ;
# défi des 9 jardinières (05) et correction (05b) ; ce que tu as appris (06) ; fin du 05/11 (07).
# Code couleur (celui de la série) : x bleu ; le FACTEUR COMMUN et ses flèches orange ;
# juste vert ; faux / piège rouge.
# Voix : manim/voix/4e-facto-defi.json (validée le 11/11) ; marques : facto_defi_marques.json.
#
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/facto_defi.py FactoDefi4e --media_dir manim/scripts/4e/media-facto-05-audit
# Rendu : python -m manim render -qh --disable_caching manim/scripts/4e/facto_defi.py FactoDefi4e -o eleveai-maths-4e-facto-defi --media_dir manim/scripts/4e/media-facto-05
# Sortie : manim/sorties/4e/maths/factorisation/05-defi/eleveai-maths-4e-facto-defi.mp4

import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI))

from relatif_commun import *  # noqa: E402,F403
from equation_commun import PAROLE  # noqa: E402
from equation_resoudre_distributivite import Bloc, BLEU_BLOC  # noqa: E402
from frac_lotc_commun import personne  # noqa: E402

PAROLE["²"] = "carré"

FACTEUR = OPERATION  # le facteur commun
MAILLOT = BLEU_BLOC
SHORT_F = "#e2e8f0"
TERRE = "#78350f"
MENTHE = "#22c55e"
OR = "#fbbf24"


def D(s, fs=56, couleur=WHITE, lettres="xy", audit=True):
    """Une expression : les lettres en bleu."""
    return E(s, fs, couleur, lettres=lettres, audit=audit)


def tenue(s=1.0):
    """Une tenue : le maillot (bleu, son prix x) au-dessus du short (clair, 12) ; .px et .p12 posés plus tard."""
    m = Polygon(*[P(a, b) for a, b in ((-0.14, 0.34), (-0.42, 0.22), (-0.5, 0.0), (-0.32, -0.05), (-0.3, -0.36),
                                       (0.3, -0.36), (0.32, -0.05), (0.5, 0.0), (0.42, 0.22), (0.14, 0.34), (0, 0.25))],
                fill_color=MAILLOT, fill_opacity=1, stroke_color=WHITE, stroke_width=2)
    sh = Polygon(*[P(a, b) for a, b in ((-0.3, 0.14), (0.3, 0.14), (0.34, -0.24), (0.06, -0.24), (0, -0.07),
                                        (-0.06, -0.24), (-0.34, -0.24))],
                 fill_color=SHORT_F, fill_opacity=1, stroke_color="#94a3b8", stroke_width=2)
    sh.next_to(m, DOWN, buff=0.06)
    px = T("x", 30, WHITE, audit=False, gras=True).move_to(m.get_center() + DOWN * 0.04)
    p12 = T("12", 20, "#0f172a", audit=False, gras=True).move_to(sh.get_center() + UP * 0.04)
    g = VGroup(m, sh, px, p12)
    g.scale(s)
    g.m, g.sh, g.px, g.p12 = m, sh, px, p12
    return g


def jardiniere(s=1.0):
    """Une jardinière : le bac de terre, le bloc bleu x (les fraisiers) et 5 feuilles de menthe."""
    bac = Polygon(P(-0.48, 0.0), P(0.48, 0.0), P(0.4, -0.34), P(-0.4, -0.34), fill_color=TERRE, fill_opacity=1,
                  stroke_color="#a16207", stroke_width=2)
    fx = Bloc(0.4, 0.36, MAILLOT, "x", 24).move_to(P(-0.22, 0.22))
    f5 = VGroup(*[Circle(radius=0.065, fill_color=MENTHE, fill_opacity=1, stroke_width=0).move_to(P(a, b))
                  for a, b in ((0.1, 0.1), (0.24, 0.1), (0.38, 0.1), (0.17, 0.24), (0.31, 0.24))])
    g = VGroup(bac, fx, f5)
    g.scale(s, about_point=bac.get_center())
    g.fx, g.f5 = fx, f5
    return g


def trophee(s=1.0):
    """La coupe des champions."""
    coupe = Polygon(P(-0.3, 0.32), P(0.3, 0.32), P(0.16, -0.06), P(-0.16, -0.06), fill_color=OR, fill_opacity=1,
                    stroke_width=0)
    anses = VGroup(Arc(radius=0.13, start_angle=PI / 2, angle=PI, arc_center=P(-0.3, 0.17), stroke_color=OR, stroke_width=6),
                   Arc(radius=0.13, start_angle=-PI / 2, angle=PI, arc_center=P(0.3, 0.17), stroke_color=OR, stroke_width=6))
    pied = Rectangle(width=0.08, height=0.16, fill_color=OR, fill_opacity=1, stroke_width=0).move_to(P(0, -0.14))
    socle = Rectangle(width=0.36, height=0.1, fill_color="#a16207", fill_opacity=1, stroke_width=0).move_to(P(0, -0.27))
    return VGroup(anses, coupe, pied, socle).scale(s)


def ballon(r=0.26):
    b = Circle(radius=r, fill_color=WHITE, fill_opacity=1, stroke_color="#0f172a", stroke_width=2)
    p = RegularPolygon(5, fill_color="#0f172a", fill_opacity=1, stroke_width=0).scale(r * 0.38).move_to(b)
    return VGroup(b, p)


def malik(s=0.78):
    """Malik, comptable : chemise bleu nuit, une tablette de comptes à la main."""
    m = Metier(["Malik", "comptable"], fs=32, peau="#8d5524", tenue="#1e3a8a", cheveux="#111827", s=s)
    m.nom.arrange(DOWN, buff=0.12)
    p = m.perso
    tab = RoundedRectangle(width=0.34 * s, height=0.44 * s, corner_radius=0.03, fill_color="#e2e8f0", fill_opacity=1,
                           stroke_color="#475569", stroke_width=3).move_to(p.get_center() + P(0.4, -0.3) * s)
    lignes = VGroup(*[Line(P(-0.1, 0), P(0.1, 0), color="#475569", stroke_width=2).move_to(tab.get_center() + UP * dy * s)
                      for dy in (0.1, 0.0, -0.1)])
    p.add(tab, lignes)
    return m


class FactoDefi4e(PaysageRel):
    nom_voix = "4e-facto-defi"
    fichier_marques = "facto_defi_marques.json"
    ceinture = "verte"

    def cadre(self, m, couleur=CIEL, buff=0.12):
        return SurroundingRectangle(m, color=couleur, buff=buff, stroke_width=3, corner_radius=0.08)

    def fleche_arc(self, a, b, couleur=None, angle=-1.2, sw=5):
        return CurvedArrow(a.get_top() + UP * 0.1, b.get_top() + UP * 0.12, angle=angle, color=couleur or FACTEUR,
                           stroke_width=sw, tip_length=0.16)

    def eq_dans_q(self, i, s, phrase, n=1, fs=None, lettres="xytn", couleur=WHITE):
        """Comme le module commun, mais en E (sans ligature : « filles » ne plante plus)."""
        ref = self.q_q[i]
        e = E(s, fs or 34, couleur=couleur, lettres=lettres)
        e.scale_to_fit_height(ref.height).move_to(ref)
        self.q_q.remove(ref)
        self.dire_eq(e, phrase, n)
        return e

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Défis de factorisation", self.identite, self.ceinture, y_ech=-2.65)
        for m in (titre, ident):
            m.sans_synchro = True
        ident._pas_audit = True
        self.au("Défis", Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), rt=0.7)
        e = D("7x + 7 = 7x", 60, audit=False).move_to(P(-4.0, 0.3))
        loupe = VGroup(Circle(radius=0.62, color=JAUNE_TITRE, stroke_width=6),
                       Line(P(0.44, -0.44), P(0.8, -0.8), color=JAUNE_TITRE, stroke_width=10))
        l1 = self.lg("Sauras-tu repérer les erreurs,", 2.6, 0.6, 42, maxw=7.2)
        self.dit(l1, "Sauras-tu repérer les erreurs,", avec=[FadeIn(e, shift=UP * 0.2)])
        loupe.shift(VGroup(*e.atomes[5:]).get_center() - loupe[0].get_center())
        ba = self.barrer(VGroup(*e.atomes[5:]))
        self.play(Create(loupe), run_time=0.3)
        self.play(VGroup(*e.atomes[5:]).animate.set_color(PIEGE), Create(ba), run_time=0.3)
        l2 = self.lg("et factoriser un vrai problème ?", 2.6, -0.2, 44, JAUNE_TITRE, maxw=7.2)
        self.dit(l2, "et factoriser un vrai problème ?")
        self.insister(l2, 1.08, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 01 : les 8 tenues de Malik ──────────────────────────────────────────
    def ecran_comptable(self):
        self.ecran("01-comptable")
        m = malik()
        m.perso.move_to(P(-5.3, 1.0))
        m.nom.next_to(m.perso, UP, buff=0.14).set_x(-5.3)
        self.au("Malik", FadeIn(m.perso, shift=UP * 0.3), FadeIn(m.nom[0], shift=UP * 0.1), rt=0.35)
        self.au("comptable", FadeIn(m.nom[1], shift=UP * 0.1), rt=0.3)
        bal = ballon().move_to(P(-4.45, 0.05))
        l1 = self.lg("dans un club de football.", 0.9, 2.95, 38, maxw=8.4)
        self.dit(l1, "dans un club de football.", avec=[FadeIn(bal, shift=LEFT * 0.3)])
        ts = VGroup(*[tenue() for _ in range(8)]).arrange(RIGHT, buff=0.2).move_to(P(0.55, -0.55))
        for t in ts:
            t.remove(t.px, t.p12)
        l2 = self.lg("Le club achète 8 tenues.", 0.9, 2.25, 38, CIEL, maxw=8.4)
        self.dit(l2, "Le club achète 8 tenues.",
                 avec=[LaggedStart(*[FadeIn(t, shift=DOWN * 0.3) for t in ts], lag_ratio=0.12)])
        l3 = self.lg("Chaque tenue :", 0.9, 1.55, 36, maxw=8.4)
        self.dit(l3, "Chaque tenue :", avec=[Circumscribe(ts[0], color=WHITE)])
        l4 = self.lg("un maillot à x euros,", 0, 0, 36, lettres="x", maxw=4.8)
        l5 = self.lg("et un short à 12 euros.", 0, 0, 36, maxw=5.0)
        VGroup(l4, l5).arrange(RIGHT, buff=0.35).move_to(P(0.9, 0.75))
        self.dit(l4, "un maillot à x euros,", avec=[LaggedStart(*[FadeIn(t.px, scale=0.6) for t in ts], lag_ratio=0.08)])
        self.dit(l5, "et un short à 12 euros.", avec=[LaggedStart(*[FadeIn(t.p12, scale=0.6) for t in ts], lag_ratio=0.08)])
        t1 = self.lg("Le prix total :", 0, 0, 40, maxw=4)
        t2 = self.lg("8x + 96 euros.", 0, 0, 44, lettres="x", maxw=5)
        VGroup(t1, t2).arrange(RIGHT, buff=0.35).move_to(P(0.2, -1.95))
        self.dit(t1, "Le prix total :")
        self.dit(t2, "8 x plus 96 euros.", avec=[Circumscribe(VGroup(*[t.m for t in ts]), color=CIEL, buff=0.06)])
        self.play(Circumscribe(VGroup(*[t.sh for t in ts]), color=CIEL, buff=0.06), run_time=0.5)
        l6 = self.lg("Malik veut l'écrire comme un produit.", -0.6, -2.85, 40, JAUNE_TITRE, maxw=9.6)
        self.dit(l6, "Malik veut l'écrire comme un produit.")
        self.insister(l6, 1.06, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 02 : factoriser, et lire la situation ───────────────────────────────
    def ecran_factoriser(self):
        self.ecran("02-factoriser")
        a = D("96 = 8 × 12", 54).move_to(P(-3.5, 2.85))
        self.dire_eq(a, "96, c'est 8 fois 12.")
        l1 = self.lg("Le facteur commun est 8 :", 3.0, 2.95, 38, maxw=6.4)
        self.dit(l1, "Le facteur commun est 8 :", avec=[a.atomes[2].animate.set_color(FACTEUR)])
        l2 = self.lg("le nombre de tenues.", 3.0, 2.3, 38, CIEL, maxw=6.4)
        self.dit(l2, "le nombre de tenues.")
        g = D("8x + 96 = 8(x + 12)", 66).move_to(P(0, 0.75))
        self.dire_eq(g, "8 x plus 96 égale 8 fois, entre parenthèses, x plus 12.", echelle=1.15)
        self.play(g.egal.animate.set_color(EGAL), g.atomes[5].animate.set_color(FACTEUR),
                  g.atomes[0].animate.set_color(FACTEUR), run_time=0.2)
        f1 = self.fleche_arc(g.atomes[5], g.atomes[7], angle=-1.7)
        f2 = self.fleche_arc(g.atomes[5], g.atomes[9], angle=-1.2)
        self.play(Create(f1), Create(f2), run_time=0.4)
        b1 = Brace(g.atomes[5], DOWN, buff=0.14, color=FACTEUR)
        b2 = Brace(VGroup(*g.atomes[6:]), DOWN, buff=0.14, color=CIEL)
        e1 = self.lg("8 tenues", 0, 0, 38, FACTEUR, maxw=3)
        e2 = self.lg("le prix d'une tenue", 0, 0, 38, CIEL, maxw=5)
        fois = self.lg("fois", 0, 0, 38, maxw=2)
        e2.next_to(b2, DOWN, buff=0.75)
        fois.next_to(e2, LEFT, buff=0.35)
        e1.next_to(fois, LEFT, buff=0.35)
        t1 = Line(b1.get_bottom() + DOWN * 0.05, e1.get_top() + UP * 0.08, color=FACTEUR, stroke_width=3)
        t2 = Line(b2.get_bottom() + DOWN * 0.05, e2.get_top() + UP * 0.08, color=CIEL, stroke_width=3)
        self.dit(e1, "8 tenues,", avec=[GrowFromCenter(b1), Create(t1)])
        self.dit(fois, "fois le prix")
        self.dit(e2, "le prix d'une tenue.", avec=[GrowFromCenter(b2), Create(t2)])
        mini = tenue(0.62).next_to(e2, RIGHT, buff=0.3)
        self.play(FadeIn(mini, shift=LEFT * 0.2), run_time=0.3)
        r = self.lg("La forme factorisée raconte la situation !", -0.4, -2.55, 46, JAUNE_TITRE, maxw=10.6)
        self.dit(r, "La forme factorisée raconte la situation !")
        self.insister(r, 1.06, 0.2)
        self.attendre_voix(marge=0.8)

    # ── questions : la figure à gauche ──────────────────────────────────────
    def figure_q(self, s, gauche, droite, i_g, i_d, kg, kd, x=-3.6, fs_p=46, ecart=0.55):
        """L'expression, et sous chaque terme son produit (posé avec la réponse) ; kg, kd : les atomes du facteur."""
        e = D(s, 76, audit=False).move_to(P(x, 1.0))
        a = D(gauche, fs_p, audit=False)
        b = D(droite, fs_p, audit=False)
        a.next_to(e.atomes[i_g], DOWN, buff=0.75)
        b.next_to(e.atomes[i_d], DOWN, buff=0.75)
        if b.get_left()[0] < a.get_right()[0] + ecart:
            b.shift(RIGHT * (a.get_right()[0] + ecart - b.get_left()[0]))
        g = VGroup(a, b)
        if g.get_left()[0] < -6.3:
            g.shift(RIGHT * (-6.3 - g.get_left()[0]))
        for m, ks in ((a, kg), (b, kd)):
            for j in ks:
                m.atomes[j].set_color(FACTEUR)
        return e, a, b

    # ── 02q : QUESTION 1 (réponse B) ────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        self.XL = -0.9
        e, a, b = self.figure_q("6x + 24", "6 × x", "6 × 4", 0, 3, (0,), (0,), x=-4.5)

        def avant(sc):
            sc.eq_dans_q(0, "Une classe forme 6 équipes,", "Une classe forme 6 équipes,", lettres="", fs=36)
            sc.eq_dans_q(0, "avec x filles et 4 garçons par équipe.", "avec x filles et 4 garçons par équipe.",
                         lettres="x", fs=36)
            sc.eq_dans_q(0, "Le nombre d'élèves : 6x + 24.", "Le nombre d'élèves : 6 x plus 24.", lettres="x", fs=36)
            sc.play(FadeIn(e, shift=UP * 0.2), run_time=0.3)
            sc.eq_dans_q(0, "Sa forme factorisée ?", "Sa forme factorisée ?", lettres="", fs=36)

        def apres(sc):
            sc.ph_eq(0, "Réponse B : 6(x + 4).", "Réponse B : 6 fois, entre parenthèses, x plus 4.", lettres="x",
                     premier=True, avec=[FadeIn(a, shift=DOWN * 0.2), FadeIn(b, shift=DOWN * 0.2)])
            sc.ph_eq(1, "6 équipes, de x + 4 élèves.", "6 équipes, de x plus 4 élèves.", lettres="x")
            sc.play(Circumscribe(VGroup(a.atomes[0], b.atomes[0]), color=FACTEUR, buff=0.1), run_time=0.5)
            sc.rep_fini()

        self.question_pause("02q-question", "02r-reponse",
                            ["Une classe forme 6 équipes,", "avec x filles et 4 garçons par équipe.",
                             "Le nombre d'élèves : 6x + 24.", "Sa forme factorisée ?"],
                            [Eq("6(x + 24)", 34), Eq("6(x + 4)", 34), Eq("x(6 + 24)", 34)], 1,
                            ["Réponse B : 6(x + 4).", "6 équipes, de x + 4 élèves."],
                            avant_q=avant, autres_r=apres)
        self.XL = type(self).XL

    # ── 03 : corriger les erreurs ───────────────────────────────────────────
    def ecran_erreurs(self):
        self.ecran("03-erreurs")
        tit = self.lg("Corrige les erreurs.", 0, 3.1, 46, JAUNE_TITRE, maxw=8)
        self.dit(tit, "Corrige les erreurs.")
        sep = DashedLine(P(0, 2.55), P(0, -2.3), color="#475569", stroke_width=3)
        self.play(Create(sep), run_time=0.3)
        # à gauche : 7x + 7 = 7x
        h1 = self.lg("Un élève écrit :", -3.4, 2.2, 36, CIEL, maxw=6)
        self.dit(h1, "Un élève écrit :")
        w1 = D("7x + 7 = 7x", 54).move_to(P(-3.4, 1.35))
        self.dire_eq(w1, "7 x plus 7 égale 7 x.")
        f1 = self.lg("Faux : 7 = 7 × 1.", -3.4, 0.4, 38, maxw=6)
        f1.atomes[0].set_color(PIEGE)
        ba1 = self.barrer(VGroup(*w1.atomes[5:]))
        self.dit(f1, "Faux : 7, c'est 7 fois 1.",
                 avec=[VGroup(*w1.atomes[5:]).animate.set_color(PIEGE), Create(ba1)])
        self.play(Circumscribe(f1.atomes[-2], color=FACTEUR, buff=0.08), run_time=0.4)
        g1 = self.lg("La bonne réponse :", -3.4, -0.55, 36, maxw=6)
        self.dit(g1, "La bonne réponse :")
        r1 = D("7(x + 1)", 58, VERT_OK).move_to(P(-3.4, -1.5))
        self.dire_eq(r1, "7 fois, entre parenthèses, x plus 1.")
        r1.atomes[0].set_color(FACTEUR)
        self.play(Create(self.cadre_ok(r1, 0.15)), Circumscribe(r1.atomes[4], color=FACTEUR, buff=0.08), run_time=0.4)
        # à droite : x² + 4x = x(x + 4x)
        h2 = self.lg("Une élève écrit :", 3.4, 2.2, 36, CIEL, maxw=6)
        self.dit(h2, "Une élève écrit :")
        w2 = D("x² + 4x = x(x + 4x)", 48)
        if w2.width > 5.6:
            w2.scale_to_fit_width(5.6)
        w2.move_to(P(3.4, 1.35))
        self.dire_eq(w2, "x au carré plus 4 x égale x fois, entre parenthèses, x plus 4 x.")
        f2 = self.lg("Faux : le x est déjà sorti.", 3.4, 0.4, 38, lettres="", maxw=6)
        f2.atomes[0].set_color(PIEGE)
        f2.atomes[3].set_color(FACTEUR)
        ba2 = self.barrer(w2.atomes[11])
        self.dit(f2, "Faux : le x est déjà sorti.",
                 avec=[w2.atomes[11].animate.set_color(PIEGE), w2.atomes[6].animate.set_color(FACTEUR)])
        self.play(Create(ba2), Circumscribe(w2.atomes[6], color=FACTEUR, buff=0.08), run_time=0.4)
        g2 = self.lg("La bonne réponse :", 3.4, -0.55, 36, maxw=6)
        self.dit(g2, "La bonne réponse :", n=2)
        r2 = D("x(x + 4)", 58, VERT_OK).move_to(P(3.4, -1.5))
        self.dire_eq(r2, "x fois, entre parenthèses, x plus 4.")
        r2.atomes[0].set_color(FACTEUR)
        self.play(Create(self.cadre_ok(r2, 0.15)), run_time=0.25)
        self.insister(VGroup(r1, r2), 1.08, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 04 : un facteur négatif ─────────────────────────────────────────────
    def ecran_negatif(self):
        self.ecran("04-negatif")
        tit = self.lg("Le défi des champions :", -0.5, 3.15, 46, JAUNE_TITRE, maxw=8)
        cup = trophee(1.0).next_to(tit, RIGHT, buff=0.4)
        self.dit(tit, "Le défi des champions :", avec=[FadeIn(cup, scale=1.3)])
        st = self.lg("un nombre négatif en facteur.", 0, 2.4, 40, CIEL, maxw=10)
        self.dit(st, "un nombre négatif en facteur.")
        e = D("−4x − 20", 72).move_to(P(-3.6, 1.05))
        self.dire_eq(e, "Moins 4 x moins 20.", echelle=1.2)
        a = D("−4x = −4 × x", 50).mis_sur_egal(2.6, 1.45)
        self.dire_eq(a, "Moins 4 x, c'est moins 4 fois x.")
        b = D("−20 = −4 × 5", 50).mis_sur_egal(2.6, 0.6)
        self.dire_eq(b, "Moins 20, c'est moins 4 fois 5.")
        quatre = VGroup(a.atomes[4], a.atomes[5], b.atomes[3], b.atomes[4])
        self.play(quatre.animate.set_color(FACTEUR), run_time=0.2)
        donc = self.lg("Donc", 0, 0, 44, maxw=2)
        r = D("−4(x + 5)", 66, VERT_OK)
        VGroup(donc, r).arrange(RIGHT, buff=0.4).move_to(P(-0.6, -0.55))
        self.dit(donc, "Donc")
        self.dire_eq(r, "moins 4 fois, entre parenthèses, x plus 5.")
        VGroup(r.atomes[0], r.atomes[1]).set_color(FACTEUR)
        self.play(Create(self.cadre_ok(r, 0.15)), run_time=0.25)
        l1 = self.lg("Dans la parenthèse, le signe du 5 a changé :", -0.4, -1.8, 38, maxw=10.4)
        fl = CurvedArrow(e.atomes[3].get_bottom() + DOWN * 0.1, r.atomes[4].get_top() + UP * 0.3, angle=0.6,
                         color=PIEGE, stroke_width=4, tip_length=0.16)
        self.dit(l1, "Dans la parenthèse, le signe du 5 a changé :",
                 avec=[Circumscribe(e.atomes[3], color=PIEGE, buff=0.08)])
        self.play(Create(fl), Circumscribe(r.atomes[4], color=PIEGE, buff=0.08), run_time=0.5)
        l2 = self.lg("c'est le piège.", -0.4, -2.55, 46, PIEGE, maxw=8)
        self.dit(l2, "c'est le piège.")
        self.insister(l2, 1.1, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 04q : QUESTION 2 (réponse A) ────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        self.XL = 0.6
        e, a, b = self.figure_q("−3x + 12", "−3 × x", "−3 × (−4)", 1, 4, (0, 1), (0, 1), fs_p=42, ecart=0.95)

        def avant(sc):
            sc.eq_dans_q(0, "Mets −3 en facteur", "Mets moins 3 en facteur", lettres="", fs=36)
            sc.eq_dans_q(0, "dans −3x + 12.", "dans moins 3 x plus 12.", lettres="x", fs=36)
            sc.play(FadeIn(e, shift=UP * 0.2), run_time=0.3)

        def apres(sc):
            sc.ph_eq(0, "Réponse A : −3(x − 4).", "Réponse A : moins 3 fois, entre parenthèses, x moins 4.", lettres="x",
                     premier=True, avec=[FadeIn(a, shift=DOWN * 0.2)])
            sc.ph_eq(1, "−3 × (−4) = +12.", "Moins 3 fois moins 4 : plus 12.", avec=[FadeIn(b, shift=DOWN * 0.2)])
            sc.play(Circumscribe(VGroup(a.atomes[0], a.atomes[1]), color=FACTEUR, buff=0.08),
                    Circumscribe(VGroup(b.atomes[0], b.atomes[1]), color=FACTEUR, buff=0.08), run_time=0.5)
            sc.rep_fini()

        self.question_pause("04q-question", "04r-reponse", ["Mets −3 en facteur", "dans −3x + 12."],
                            [Eq("−3(x − 4)", 34), Eq("−3(x + 4)", 34), Eq("3(x − 4)", 34)], 0,
                            ["Réponse A : −3(x − 4).", "−3 × (−4) = +12."],
                            avant_q=avant, autres_r=apres)
        self.XL = type(self).XL

    # ── 05 : le défi ────────────────────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("05-defi")
        tit = T("À toi de jouer !", 56, JAUNE_TITRE).move_to(P(0, 2.95))
        self.au("À toi", Write(tit), rt=0.5)
        jar = personne(peau="#e0ac69", tenue="#15803d", cheveux="#3f2a14", s=0.6).move_to(P(-5.55, 0.15))
        chap = VGroup(Rectangle(width=0.62, height=0.06, fill_color="#a16207", fill_opacity=1, stroke_width=0),
                      RoundedRectangle(width=0.36, height=0.2, corner_radius=0.05, fill_color="#a16207", fill_opacity=1,
                                       stroke_width=0))
        chap[1].next_to(chap[0], UP, buff=0)
        chap.next_to(jar.tete, UP, buff=-0.08)
        jar.add(chap)
        l1 = self.lg("Un jardinier prépare 9 jardinières.", 0.9, 1.95, 38, CIEL, maxw=9)
        js = VGroup(*[jardiniere() for _ in range(9)]).arrange(RIGHT, buff=0.16).move_to(P(0.6, -0.45))
        for j in js:
            j.remove(j.fx, j.f5)
        self.dit(l1, "Un jardinier prépare 9 jardinières.",
                 avec=[FadeIn(jar, shift=UP * 0.2), LaggedStart(*[FadeIn(j, shift=UP * 0.2) for j in js], lag_ratio=0.1)])
        l2 = self.lg("Dans chacune : x plants de fraisiers,", 0.9, 1.25, 38, lettres="x", maxw=9)
        l3 = self.lg("et 5 plants de menthe.", 0.9, 0.6, 38, maxw=9)
        self.dit(l2, "Dans chacune : x plants de fraisiers,",
                 avec=[LaggedStart(*[FadeIn(j.fx, scale=0.6) for j in js], lag_ratio=0.08)])
        self.dit(l3, "et 5 plants de menthe.", avec=[LaggedStart(*[FadeIn(j.f5, scale=0.6) for j in js], lag_ratio=0.08)])
        for j in js:  # les plants suivent leur bac quand la correction le déplace
            j.add(j.fx, j.f5)
        l4 = self.lg("Écris le nombre total de plants,", -0.3, -1.4, 40, maxw=10)
        l5 = self.lg("puis factorise-le.", -0.3, -2.05, 42, JAUNE_TITRE, maxw=10)
        self.dit(l4, "Écris le nombre total de plants,")
        self.dit(l5, "puis factorise-le.")
        pz = T("Mets pause, et cherche !", 48, ORANGE_RETENUE).move_to(P(-0.4, -2.85))
        self.au("Mets pause", Write(pz), rt=0.5)
        self.defi = dict(tit=tit, jar=jar, js=js, txt=VGroup(l1, l2, l3, l4, l5), pz=pz)
        self.attendre_voix(marge=2.0)

    # ── 05b : la correction ─────────────────────────────────────────────────
    def ecran_correction(self):
        d = self.defi
        self.dire("05b-correction")
        tit = T("Correction", 50, JAUNE_TITRE).move_to(P(0, 2.95))
        js = d["js"]
        self.au("Correction", ReplacementTransform(d["tit"], tit), FadeOut(d["pz"]), FadeOut(d["txt"]), FadeOut(d["jar"]),
                js.animate.scale(0.75).move_to(P(0, 1.85)), rt=0.4)
        t1 = self.lg("Le total :", 0, 0, 40, maxw=3)
        t2 = D("9x + 45.", 54)
        VGroup(t1, t2).arrange(RIGHT, buff=0.3).move_to(P(-3.3, 0.55))
        self.dit(t1, "Le total :")
        self.dire_eq(t2, "9 x plus 45.", avec=[Circumscribe(VGroup(*[j.fx for j in js]), color=CIEL, buff=0.05)])
        self.play(Circumscribe(VGroup(*[j.f5 for j in js]), color=MENTHE, buff=0.05), run_time=0.4)
        b = D("45 = 9 × 5", 54).move_to(P(3.3, 0.55))
        self.dire_eq(b, "45, c'est 9 fois 5.")
        self.play(b.atomes[2].animate.set_color(FACTEUR), t2.atomes[0].animate.set_color(FACTEUR), run_time=0.2)
        donc = self.lg("Donc", 0, 0, 46, maxw=2)
        r = D("9(x + 5)", 70, VERT_OK)
        VGroup(donc, r).arrange(RIGHT, buff=0.4).move_to(P(-0.4, -0.85))
        self.dit(donc, "Donc")
        self.dire_eq(r, "9 fois, entre parenthèses, x plus 5 :")
        r.atomes[0].set_color(FACTEUR)
        self.play(Create(self.cadre_ok(r, 0.16)), run_time=0.2)
        c1 = self.lg("9 jardinières,", 0, 0, 40, FACTEUR, maxw=4)
        c2 = self.lg("de x + 5 plants.", 0, 0, 40, CIEL, lettres="x", maxw=5)
        VGroup(c1, c2).arrange(RIGHT, buff=0.35).move_to(P(-0.4, -2.2))
        self.dit(c1, "9 jardinières,", avec=[Circumscribe(js, color=FACTEUR, buff=0.08)])
        self.dit(c2, "de x plus 5 plants.")
        self.insister(r, 1.1, 0.2)
        self.attendre_voix(marge=1.2)

    # ── 06 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("06-finale", 0.5)
        e = D("8x + 96", 44, audit=False)
        f = D("= 8(x + 12)", 44, audit=False).next_to(e, DOWN, buff=0.3)
        f.atomes[1].set_color(FACTEUR)
        t = tenue(0.8)
        huit = T("× 8", 40, FACTEUR, audit=False)
        VGroup(t, huit).arrange(RIGHT, buff=0.25).next_to(f, DOWN, buff=0.45)
        n = D("−4(x + 5)", 44, audit=False).next_to(VGroup(t, huit), DOWN, buff=0.5)
        n.atomes[4].set_color(PIEGE)
        VGroup(n.atomes[0], n.atomes[1]).set_color(FACTEUR)
        fig = VGroup(e, f, t, huit, n)
        self.XL = -2.6  # une colonne de texte plus large : les lignes gardent leur taille
        self.BORD_X = 6.35  # et une marge à droite : le texte ne frôle plus le bord
        lignes = self.finale_colonne([["La forme factorisée raconte souvent", "la situation : le nombre de groupes,",
                                       "fois ce qu'il y a dans un groupe."],
                                      ["Développer permet de", "trouver les erreurs."],
                                      ["Avec un facteur négatif, les signes", "de la parenthèse changent."]],
                                     fs=38, figure=fig)
        self.play(FadeIn(fig), run_time=0.3)
        for lg in lignes:
            self.montrer_ligne(lg)
        self.attendre_voix(marge=1.2)
        self.XL = type(self).XL
        self.BORD_X = type(self).BORD_X

    def construct(self):
        self.page_de_garde()
        self.ecran_comptable()
        self.ecran_factoriser()
        self.ecran_question1()
        self.ecran_erreurs()
        self.ecran_negatif()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("07-abonne")
