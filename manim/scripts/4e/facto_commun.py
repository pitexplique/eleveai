# facto_commun.py
# EleveAI — Maths 4e — série FACTORISATION, épisode 01 : repérer le FACTEUR COMMUN. PILOTE de la série.
# Paysage 16:9, AVEC VOIX, ceinture JAUNE. Micro : litteral_facteur_commun (tous les écrans).
# Métier : Inès, logisticienne. Centres : transports.
# Écrans : garde (00) ; les 5 camions d'Inès (01) ; chaque terme comme un produit, 5x + 10 (02) ;
# une lettre en facteur, x² + 7x et ses deux rectangles (03) ; QUESTION 1 (03q, réponse A) ;
# le piège 6x + 9 : pas 6 (04) ; le x absent de 3x + 5 (05) ; QUESTION 2 (05q, réponse B) ;
# défi 10x + 15 (06) et correction (06b) ; ce que tu as appris (07) ; fin du 05/11 (08).
# Code couleur (celui de la série distributivité) : x bleu ; le FACTEUR COMMUN orange (les cabines
# des camions aussi : leur nombre est le facteur commun) ; juste vert ; piège rouge.
# Voix : manim/voix/4e-facto-commun.json (validée le 11/11) ; marques : facto_commun_marques.json.
#
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/facto_commun.py FactoCommun4e --media_dir manim/scripts/4e/media-facto-01-audit
# Rendu : python -m manim render -qh --disable_caching manim/scripts/4e/facto_commun.py FactoCommun4e -o eleveai-maths-4e-facto-commun --media_dir manim/scripts/4e/media-facto-01
# Sortie : manim/sorties/4e/maths/factorisation/01-commun/eleveai-maths-4e-facto-commun.mp4

import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI))

from relatif_commun import *  # noqa: E402,F403
from equation_commun import PAROLE  # noqa: E402
from equation_resoudre_distributivite import Bloc, BLEU_BLOC  # noqa: E402

PAROLE["²"] = "carré"

FACTEUR = OPERATION  # le facteur commun
RIZ = BLEU_BLOC
EAU = "#0f766e"
CAISSE = "#1e293b"


def D(s, fs=56, couleur=WHITE, lettres="xy", audit=True):
    """Une expression : les lettres en bleu."""
    return E(s, fs, couleur, lettres=lettres, audit=audit)


def camion(s=1.0):
    """Un camion : la caisse (sombre), la cabine orange, deux roues ; .riz et .eau, chargés plus tard."""
    caisse = RoundedRectangle(width=1.36, height=0.86, corner_radius=0.05, stroke_color="#cbd5e1", stroke_width=3,
                              fill_color=CAISSE, fill_opacity=1)
    cabine = RoundedRectangle(width=0.5, height=0.6, corner_radius=0.08, fill_color=FACTEUR, fill_opacity=1,
                              stroke_width=0)
    cabine.next_to(caisse, RIGHT, buff=0.04).align_to(caisse, DOWN)
    vitre = Rectangle(width=0.24, height=0.2, fill_color="#bae6fd", fill_opacity=1, stroke_width=0)
    vitre.move_to(cabine.get_corner(UR) + P(-0.16, -0.16))
    roues = VGroup(*[Circle(radius=0.13, fill_color="#0f172a", fill_opacity=1, stroke_color="#94a3b8", stroke_width=3)
                     .move_to(P(x, caisse.get_bottom()[1] - 0.06)) for x in (caisse.get_left()[0] + 0.32, cabine.get_center()[0])])
    g = VGroup(caisse, cabine, vitre, roues)
    riz = Bloc(0.62, 0.52, RIZ, "x", 24).move_to(caisse.get_center() + P(-0.25, -0.08))
    e1 = Square(0.24, fill_color=EAU, fill_opacity=1, stroke_color=WHITE, stroke_width=2)
    e2 = e1.copy()
    eau = VGroup(e1, e2).arrange(UP, buff=0.04).next_to(riz, RIGHT, buff=0.1).align_to(riz, DOWN)
    g.add(riz, eau)
    g.scale(s, about_point=caisse.get_center())
    g.riz, g.eau = riz, eau
    return g


def vider_caisse(cams):
    """Les camions entrent vides : leurs palettes (déjà à leur place) sont retirées du groupe."""
    for c in cams:
        c.remove(c.riz, c.eau)


def ines(s=0.78):
    """Inès, logisticienne : gilet orange et porte-bloc."""
    m = Metier(["Inès", "logisticienne"], fs=32, peau="#8d5524", tenue="#0f766e", cheveux="#1f2937", longs=True, s=s)
    m.nom.arrange(DOWN, buff=0.12)
    p = m.perso
    gilet = VGroup(*[Rectangle(width=0.46 * s, height=0.05 * s, fill_color="#fbbf24", fill_opacity=1, stroke_width=0)
                     .move_to(p.get_center() + DOWN * dy * s) for dy in (0.1, 0.3)])
    bloc = RoundedRectangle(width=0.32 * s, height=0.42 * s, corner_radius=0.03, fill_color="#e2e8f0", fill_opacity=1,
                            stroke_color="#78350f", stroke_width=3).move_to(p.get_center() + P(0.38, -0.25) * s)
    p.add(gilet, bloc)
    return m


class FactoCommun4e(PaysageRel):
    nom_voix = "4e-facto-commun"
    fichier_marques = "facto_commun_marques.json"
    ceinture = "jaune"

    def cadre(self, m, couleur=CIEL, buff=0.12):
        return SurroundingRectangle(m, color=couleur, buff=buff, stroke_width=3, corner_radius=0.08)

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Le facteur commun", self.identite, self.ceinture, y_ech=-2.65)
        for m in (titre, ident):
            m.sans_synchro = True
        ident._pas_audit = True
        self.au("Le facteur", Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), rt=0.7)
        e = D("5x + 10", 84, audit=False).move_to(P(-4.0, 0.25))
        l1 = self.lg("Comment voir ce qui se répète", 3.0, 0.6, 40, maxw=6.4)
        self.dit(l1, "Comment voir ce qui se répète", avec=[FadeIn(e, shift=UP * 0.2)])
        l2 = self.lg("dans une somme ?", 3.0, -0.15, 48, JAUNE_TITRE, maxw=6.4)
        self.dit(l2, "dans une somme ?")
        self.play(Circumscribe(VGroup(e.atomes[0], e.atomes[1]), color=FACTEUR, buff=0.08),
                  Circumscribe(e.atomes[3], color=FACTEUR, buff=0.08), run_time=0.6)
        self.insister(l2, 1.12, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 01 : les 5 camions d'Inès ───────────────────────────────────────────
    def ecran_logisticienne(self):
        self.ecran("01-logisticienne")
        m = ines()
        m.perso.move_to(P(-5.15, 1.0))
        m.nom.next_to(m.perso, UP, buff=0.14).set_x(-5.15)
        self.au("Inès", FadeIn(m.perso, shift=UP * 0.3), FadeIn(m.nom[0], shift=UP * 0.1), rt=0.35)
        self.au("logisticienne", FadeIn(m.nom[1], shift=UP * 0.1), rt=0.3)
        l1 = self.lg("Elle organise les livraisons d'un entrepôt.", 0.9, 2.95, 36, maxw=8.4)
        self.dit(l1, "Elle organise les livraisons d'un entrepôt.")
        cams = VGroup(*[camion() for _ in range(5)]).arrange(RIGHT, buff=0.36).move_to(P(0, -0.95))
        vider_caisse(cams)
        l2 = self.lg("Ce matin, 5 camions partent.", 0.9, 2.25, 38, CIEL, maxw=8.4)
        self.dit(l2, "Ce matin, 5 camions partent.",
                 avec=[LaggedStart(*[FadeIn(c, shift=LEFT * 0.4) for c in cams], lag_ratio=0.15)])
        l3 = self.lg("Dans chaque camion :", 0.9, 1.55, 36, maxw=8.4)
        self.dit(l3, "Dans chaque camion :", avec=[Circumscribe(cams[0], color=WHITE)])
        l4 = self.lg("x palettes de riz,", 0, 0, 36, lettres="x", maxw=4.6)
        l5 = self.lg("et 2 palettes d'eau.", 0, 0, 36, maxw=5.0)
        VGroup(l4, l5).arrange(RIGHT, buff=0.5).move_to(P(0.6, 0.6))
        self.dit(l4, "x palettes de riz,", avec=[LaggedStart(*[FadeIn(c.riz, scale=0.6) for c in cams], lag_ratio=0.1)])
        self.dit(l5, "et 2 palettes d'eau.", avec=[LaggedStart(*[FadeIn(c.eau, scale=0.6) for c in cams], lag_ratio=0.1)])
        t1 = self.lg("En tout,", 0, 0, 40, maxw=3)
        t2 = self.lg("5x palettes de riz,", 0, 0, 40, lettres="x", maxw=5)
        t3 = self.lg("et 10 palettes d'eau.", 0, 0, 40, maxw=5)
        tot = VGroup(t1, t2, t3).arrange(RIGHT, buff=0.3)
        tot.scale_to_fit_width(min(tot.width, 10.6)).move_to(P(-0.6, -2.55))
        self.dit(t1, "En tout,")
        self.dit(t2, "5 x palettes de riz,", avec=[Circumscribe(VGroup(*[c.riz for c in cams]), color=CIEL, buff=0.06)])
        self.dit(t3, "et 10 palettes d'eau.", avec=[Circumscribe(VGroup(*[c.eau for c in cams]), color=CIEL, buff=0.06)])
        self.insister(VGroup(t2.atomes[0], t2.atomes[1]), 1.3, 0.18)
        self.attendre_voix(marge=0.8)

    # ── 02 : chaque terme comme un produit ──────────────────────────────────
    def ecran_produits(self):
        self.ecran("02-produits")
        l0 = self.lg("Sur sa feuille, Inès écrit", -2.5, 3.0, 38, maxw=6.6)
        self.dit(l0, "Sur sa feuille, Inès écrit")
        e = D("5x + 10", 66).move_to(P(3.3, 3.0))
        self.dire_eq(e, "5 x plus 10.", echelle=1.2)
        l1 = self.lg("Cette somme a deux termes :", -2.3, 1.95, 38, CIEL, maxw=7.0)
        self.dit(l1, "Cette somme a deux termes :")
        c1 = self.cadre(VGroup(e.atomes[0], e.atomes[1]))
        c2 = self.cadre(e.atomes[3])
        self.au("5 x, et", Create(c1), rt=0.25)
        self.au("10. Écrivons", Create(c2), rt=0.25)
        l2 = self.lg("Écrivons chaque terme comme un produit.", 0, 1.05, 38, maxw=11.5)
        self.dit(l2, "Écrivons chaque terme comme un produit.")
        a = D("5x = 5 × x", 56).move_to(P(-3.3, -0.05))
        self.dire_eq(a, "5 x, c'est 5 fois x.")
        b = D("10 = 5 × 2", 56).move_to(P(3.3, -0.05))
        self.dire_eq(b, "10, c'est 5 fois 2.")
        cinq = VGroup(a.atomes[3], b.atomes[2])
        l3 = self.lg("Le 5 revient dans les deux termes :", 0, -1.15, 38, maxw=11)
        self.dit(l3, "Le 5 revient dans les deux termes :", avec=[cinq.animate.set_color(FACTEUR)])
        self.play(Circumscribe(a.atomes[3], color=FACTEUR, buff=0.1), Circumscribe(b.atomes[2], color=FACTEUR, buff=0.1),
                  run_time=0.5)
        l4 = self.lg("c'est le facteur commun.", 0, -1.85, 48, JAUNE_TITRE, maxw=11)
        self.dit(l4, "c'est le facteur commun.")
        self.insister(l4, 1.1, 0.2)
        l5 = self.lg("C'est le nombre de camions !", -3.3, -2.8, 38, CIEL, maxw=6.0)
        mini = VGroup(*[camion(0.42) for _ in range(5)]).arrange(RIGHT, buff=0.12)
        mini.next_to(l5, RIGHT, buff=0.35)
        self.dit(l5, "C'est le nombre de camions !",
                 avec=[LaggedStart(*[FadeIn(c, shift=LEFT * 0.2) for c in mini], lag_ratio=0.12)])
        self.insister(cinq, 1.3, 0.18)
        self.attendre_voix(marge=0.8)

    # ── 03 : une lettre en facteur ──────────────────────────────────────────
    def ecran_lettre(self):
        self.ecran("03-lettre")
        tit = self.lg("Le facteur commun peut aussi être une lettre.", 0, 3.05, 42, JAUNE_TITRE, maxw=12)
        self.dit(tit, "Le facteur commun peut aussi être une lettre.")
        e = D("x² + 7x", 66).move_to(P(-3.6, 1.95))
        self.dire_eq(e, "x au carré plus 7 x.", echelle=1.2)
        # les deux rectangles : x par x (l'aire x²) et x par 7 (l'aire 7x), même hauteur x
        u = 0.36
        hx = 1.75
        g0 = P(0.5, -0.95)
        carre = Rectangle(width=hx, height=hx, fill_color=RIZ, fill_opacity=0.85, stroke_color=WHITE, stroke_width=3)
        carre.move_to(g0 + P(hx / 2, hx / 2))
        rect = Rectangle(width=7 * u, height=hx, fill_color="#1d4ed8", fill_opacity=0.55, stroke_color=WHITE, stroke_width=3)
        rect.next_to(carre, RIGHT, buff=0.75)
        in1 = D("x²", 46, audit=False).move_to(carre)
        in2 = D("7x", 46, audit=False).move_to(rect)
        h1 = D("x", 36, audit=False).next_to(carre, UP, buff=0.1)
        h2 = T("7", 36, WHITE, audit=False).next_to(rect, UP, buff=0.1)
        a = D("x² = x × x", 52).move_to(P(-3.6, 0.65))
        self.poser_avec(a, "x au carré, c'est x fois x.", {0: lambda: [FadeIn(carre), FadeIn(h1)], 1: lambda: [FadeIn(in1)]})
        b = D("7x = 7 × x", 52).move_to(P(-3.6, -0.4))
        self.dire_eq(b, "7 x, c'est 7 fois x.", avec=[FadeIn(rect), FadeIn(in2), FadeIn(h2)])
        c1 = D("x", 40, FACTEUR, lettres="", audit=False).next_to(carre, LEFT, buff=0.12)
        c2 = D("x", 40, FACTEUR, lettres="", audit=False).next_to(rect, LEFT, buff=0.12)
        cotes = VGroup(Line(carre.get_corner(DL), carre.get_corner(UL), color=FACTEUR, stroke_width=9),
                       Line(rect.get_corner(DL), rect.get_corner(UL), color=FACTEUR, stroke_width=9))
        l1 = self.lg("Les deux rectangles ont un côté commun :", 0, 0, 38, maxw=10)
        lx = self.lg("x.", 0, 0, 44, FACTEUR, lettres="")
        VGroup(l1, lx).arrange(RIGHT, buff=0.25).move_to(P(0.2, -1.6))
        self.dit(l1, "Les deux rectangles ont un côté commun :")
        self.dit(lx, "commun : x.", avec=[Create(cotes), FadeIn(c1), FadeIn(c2)])
        xs = VGroup(a.atomes[3], a.atomes[5], b.atomes[5])
        l2 = self.lg("Le x revient dans les deux termes :", -1.5, -2.45, 36, lettres="", maxw=8.4)
        self.dit(l2, "Le x revient dans les deux termes :", avec=[xs.animate.set_color(FACTEUR)])
        l3 = self.lg("x est le facteur commun.", -1.5, -3.1, 42, JAUNE_TITRE, lettres="", maxw=8.4)
        self.dit(l3, "x est le facteur commun.")
        self.insister(l3, 1.1, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 03q : QUESTION 1 (réponse A) ────────────────────────────────────────
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
        e, a, b = self.figure_q("7x + 14", "7 × x", "7 × 2", 0, 3, (0, 0))

        def avant(sc):
            sc.eq_dans_q(0, "Dans 7x + 14,", "Dans 7 x plus 14,", lettres="x", fs=36)
            sc.play(FadeIn(e, shift=UP * 0.2), run_time=0.3)
            sc.eq_dans_q(0, "quel est le facteur commun ?", "quel est le facteur commun ?", lettres="", fs=36)

        def apres(sc):
            sc.ph_eq(0, "Réponse A : 7.", "Réponse A : 7.", premier=True)
            sc.ph_eq(1, "7x = 7 × x,", "7 x, c'est 7 fois x,", lettres="x", avec=[FadeIn(a, shift=DOWN * 0.2)])
            sc.ph_eq(2, "et 14 = 7 × 2.", "et 14, c'est 7 fois 2.", avec=[FadeIn(b, shift=DOWN * 0.2)])
            sc.play(Circumscribe(VGroup(a.atomes[0], b.atomes[0]), color=FACTEUR, buff=0.1), run_time=0.5)
            sc.rep_fini()

        self.question_pause("03q-question", "03r-reponse", ["Dans 7x + 14,", "quel est le facteur commun ?"],
                            [Eq("7", 34), Eq("14", 34), Eq("x", 34)], 0,
                            ["Réponse A : 7.", "7x = 7 × x,", "et 14 = 7 × 2."],
                            avant_q=avant, autres_r=apres)
        self.XL = type(self).XL

    # ── 04 : le piège 6x + 9 ────────────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("04-piege")
        tit = T("Le piège :", 46, PIEGE, gras=True).move_to(P(-5.0, 3.0))
        self.au("Le piège", FadeIn(tit, scale=1.3), rt=0.25)
        l0 = self.lg("prendre le premier nombre qu'on voit.", 1.2, 3.0, 40, maxw=8.6)
        self.dit(l0, "prendre le premier nombre qu'on voit.")
        l1 = self.lg("Dans", -5.4, 1.95, 40, maxw=2)
        self.dit(l1, "Dans")
        e = D("6x + 9,", 64).move_to(P(-3.1, 1.95))
        self.dire_eq(e, "6 x plus 9,", echelle=1.2)
        l2 = self.lg("on a envie de dire 6.", 3.0, 1.95, 40, maxw=6.4)
        self.dit(l2, "on a envie de dire 6.", avec=[e.atomes[0].animate.set_color(PIEGE)])
        # la table de 6 : 9 tombe entre 6 et 12
        pas = 1.3
        x0 = -2.6
        ya = -0.75
        ax = Line(P(x0 - 0.5, ya), P(x0 + 4 * pas + 0.5, ya), color="#94a3b8", stroke_width=3)
        ticks = VGroup(*[Line(P(x0 + k * pas, ya - 0.13), P(x0 + k * pas, ya + 0.13), color="#94a3b8", stroke_width=3) for k in range(5)])
        vals = VGroup(*[T(str(v), 34, WHITE, audit=False).move_to(P(x0 + k * pas, ya - 0.42)) for k, v in enumerate((0, 6, 12, 18, 24))])
        table = T("la table de 6", 30, CIEL, audit=False).next_to(ax, LEFT, buff=0.25)
        l3 = self.lg("Mais 9 n'est pas dans la table de 6 !", 0, 0.85, 42, PIEGE, maxw=11)
        self.dit(l3, "Mais 9 n'est pas dans la table de 6 !")
        neuf = T("9", 38, PIEGE, gras=True, audit=False).move_to(P(x0 + 1.5 * pas, ya + 0.62))
        fl = Arrow(neuf.get_bottom(), P(x0 + 1.5 * pas, ya + 0.03), buff=0.05, color=PIEGE, stroke_width=5,
                   max_tip_length_to_length_ratio=0.35)
        self.play(FadeIn(ax), FadeIn(ticks), FadeIn(vals), FadeIn(table), FadeIn(neuf, shift=DOWN * 0.2), GrowArrow(fl),
                  run_time=0.5)
        self.play(Wiggle(neuf), run_time=0.5)
        self.play(FadeOut(VGroup(ax, ticks, vals, table, neuf, fl)), run_time=0.35)
        a = D("6x = 3 × 2x", 52).move_to(P(-3.3, -0.55))
        self.dire_eq(a, "6 x, c'est 3 fois 2 x.")
        b = D("9 = 3 × 3", 52).move_to(P(3.3, -0.55))
        self.dire_eq(b, "9, c'est 3 fois 3.")
        trois = VGroup(a.atomes[3], b.atomes[2])
        r = self.lg("Le facteur commun, c'est 3.", 0, -1.95, 48, VERT_OK, maxw=10)
        self.dit(r, "Le facteur commun, c'est 3.", avec=[trois.animate.set_color(FACTEUR), e.atomes[0].animate.set_color(WHITE)])
        cr = self.cadre_ok(r, 0.15)
        self.play(Create(cr), run_time=0.2)
        self.insister(trois, 1.35, 0.18)
        self.attendre_voix(marge=0.8)

    # ── 05 : le x absent ────────────────────────────────────────────────────
    def ecran_absent(self):
        self.ecran("05-absent")
        tit = T("Autre piège :", 46, PIEGE, gras=True).move_to(P(-4.4, 3.0))
        self.au("Autre piège", FadeIn(tit, scale=1.3), rt=0.25)
        e = D("3x + 5.", 70).move_to(P(0.6, 3.0))
        self.dire_eq(e, "3 x plus 5.", echelle=1.2)
        g = Bloc(1.8, 1.0, "#1e3a5f", None).move_to(P(-3.4, 1.15))
        d = Bloc(1.8, 1.0, "#1e3a5f", None).move_to(P(3.4, 1.15))
        tg = D("3x", 54, audit=False).move_to(g)
        td = T("5", 54, WHITE, audit=False).move_to(d)
        self.play(FadeIn(g), FadeIn(d), FadeIn(tg), FadeIn(td), run_time=0.3)
        l1 = self.lg("Le x est dans 3x,", -3.4, 0.05, 38, lettres="x", maxw=6.0)
        ok = self.coche(VERT_OK, 0.26).next_to(g, RIGHT, buff=0.18)
        self.dit(l1, "Le x est dans 3 x,", avec=[Circumscribe(tg.atomes[1], color=VERT_OK, buff=0.08)])
        self.play(Create(ok), run_time=0.25)
        l2 = self.lg("mais il n'est pas dans 5.", 3.4, 0.05, 38, maxw=6.0)
        croix = VGroup(Line(P(-0.22, -0.22), P(0.22, 0.22)), Line(P(-0.22, 0.22), P(0.22, -0.22)))
        croix.set_stroke(PIEGE, 8).next_to(d, RIGHT, buff=0.18)
        self.dit(l2, "mais il n'est pas dans 5.")
        self.play(Create(croix), Wiggle(td), run_time=0.45)
        l3 = self.lg("Ici, x n'est pas un facteur commun.", 0, -1.2, 42, PIEGE, lettres="", maxw=11)
        self.dit(l3, "Ici, x n'est pas un facteur commun.")
        l4 = self.lg("Pour être commun,", 0, -2.05, 40, JAUNE_TITRE, maxw=10)
        self.dit(l4, "Pour être commun,")
        l5 = self.lg("il faut être dans chaque terme.", 0, -2.75, 44, JAUNE_TITRE, maxw=10)
        self.dit(l5, "il faut être dans chaque terme.", avec=[Indicate(VGroup(tg, td), color=JAUNE_TITRE, scale_factor=1.1)])
        self.insister(l5, 1.08, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 05q : QUESTION 2 (réponse B) ────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        self.XL = 0.6
        e, a, b = self.figure_q("y² + 3y", "y × y", "3 × y", 0, 3, (0, 2))

        def avant(sc):
            sc.eq_dans_q(0, "Dans y² + 3y,", "Dans y au carré plus 3 y,", lettres="y", fs=36)
            sc.play(FadeIn(e, shift=UP * 0.2), run_time=0.3)
            sc.eq_dans_q(0, "quel est le facteur commun ?", "quel est le facteur commun ?", lettres="", fs=36)

        def apres(sc):
            sc.ph_eq(0, "Réponse B : y.", "Réponse B : y.", lettres="y", premier=True)
            sc.ph_eq(1, "y² = y × y, et 3y = 3 × y.", "y au carré, c'est y fois y, et 3 y, c'est 3 fois y.", lettres="y",
                     avec=[FadeIn(a, shift=DOWN * 0.2)])
            sc.ph_eq(2, "Le 3 n'est pas dans y².", "Le 3 n'est pas dans y au carré.", lettres="y",
                     avec=[FadeIn(b, shift=DOWN * 0.2)])
            sc.play(Circumscribe(VGroup(a.atomes[0], b.atomes[2]), color=FACTEUR, buff=0.1), run_time=0.5)
            sc.rep_fini()

        self.question_pause("05q-question", "05r-reponse", ["Dans y² + 3y,", "quel est le facteur commun ?"],
                            [Eq("3", 34), Eq("y", 34), Eq("y²", 34)], 1,
                            ["Réponse B : y.", "y² = y × y, et 3y = 3 × y.", "Le 3 n'est pas dans y²."],
                            avant_q=avant, autres_r=apres)
        self.XL = type(self).XL

    # ── 06 : le défi ────────────────────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("06-defi")
        tit = T("À toi de jouer !", 56, JAUNE_TITRE).move_to(P(0, 2.9))
        self.au("À toi", Write(tit), rt=0.5)
        l = self.lg("Trouve le facteur commun de", 0, 1.6, 44, CIEL, maxw=11)
        self.dit(l, "Trouve le facteur commun de")
        e = D("10x + 15", 84).move_to(P(-0.4, 0.4))
        self.dire_eq(e, "10 x plus 15.", echelle=1.15)
        q = T("?", 84, JAUNE_TITRE, audit=False).next_to(e, RIGHT, buff=0.4)
        self.play(FadeIn(q, scale=1.3), run_time=0.2)
        pz = T("Mets pause, et cherche !", 50, ORANGE_RETENUE).move_to(P(-0.4, -1.4))
        self.au("Mets pause", Write(pz), rt=0.5)
        self.defi = dict(tit=tit, l=l, e=e, q=q, pz=pz)
        self.attendre_voix(marge=2.0)

    # ── 06b : la correction ─────────────────────────────────────────────────
    def ecran_correction(self):
        d = self.defi
        self.dire("06b-correction")
        tit = T("Correction", 50, JAUNE_TITRE).move_to(P(0, 2.9))
        e = d["e"]
        self.au("Correction", ReplacementTransform(d["tit"], tit), FadeOut(d["pz"]), FadeOut(d["q"]), FadeOut(d["l"]),
                e.animate.scale(0.75).move_to(P(0, 1.85)), rt=0.4)
        a = D("10x = 5 × 2x", 52).move_to(P(-3.3, 0.55))
        self.dire_eq(a, "10 x, c'est 5 fois 2 x.")
        b = D("15 = 5 × 3", 52).move_to(P(3.3, 0.55))
        self.dire_eq(b, "15, c'est 5 fois 3.")
        cinq = VGroup(a.atomes[3], b.atomes[2])
        r = self.lg("Le facteur commun est 5.", 0, -0.75, 54, VERT_OK, maxw=10)
        self.dit(r, "Le facteur commun est 5.", avec=[cinq.animate.set_color(FACTEUR)])
        cr = self.cadre_ok(r, 0.16)
        self.play(Create(cr), run_time=0.2)
        self.insister(cinq, 1.35, 0.18)
        l1 = self.lg("Et pas 10 :", 0, 0, 40, PIEGE, maxw=4)
        l2 = self.lg("15 n'est pas dans la table de 10.", 0, 0, 40, maxw=7.2)
        VGroup(l1, l2).arrange(RIGHT, buff=0.35).move_to(P(-0.5, -2.15))
        self.dit(l1, "Et pas 10 :", avec=[Circumscribe(VGroup(e.atomes[0], e.atomes[1]), color=PIEGE, buff=0.08)])
        self.dit(l2, "15 n'est pas dans la table de 10.")
        self.attendre_voix(marge=1.2)

    # ── 07 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("07-finale", 0.5)
        e = D("5x + 10", 54, audit=False)
        a = D("5 × x", 40, audit=False)
        b = D("5 × 2", 40, audit=False)
        VGroup(a, b).arrange(RIGHT, buff=0.6).next_to(e, DOWN, buff=0.5)
        for m in (a, b):
            m.atomes[0].set_color(FACTEUR)
        fl = VGroup(Arrow(e.atomes[1].get_bottom(), a.get_top(), buff=0.08, color="#94a3b8", stroke_width=3,
                          max_tip_length_to_length_ratio=0.25),
                    Arrow(e.atomes[3].get_bottom(), b.get_top(), buff=0.08, color="#94a3b8", stroke_width=3,
                          max_tip_length_to_length_ratio=0.25))
        cam = camion(0.6).next_to(VGroup(a, b), DOWN, buff=0.45)
        fig = VGroup(e, fl, a, b, cam)
        lignes = self.finale_colonne([["Un facteur commun multiplie", "chaque terme de la somme."],
                                      ["Pour le trouver, on écrit chaque", "terme comme un produit."],
                                      ["Ce peut être un nombre,", "ou une lettre."]],
                                     fs=38, figure=fig)
        self.play(FadeIn(fig), run_time=0.3)
        for lg in lignes:
            self.montrer_ligne(lg)
        self.attendre_voix(marge=1.2)

    def construct(self):
        self.page_de_garde()
        self.ecran_logisticienne()
        self.ecran_produits()
        self.ecran_lettre()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_absent()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("08-abonne")
