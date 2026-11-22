# ident_reconnaitre.py
# EleveAI — Maths 4e — série IDENTITÉS REMARQUABLES, épisode 02 : RECONNAÎTRE les trois formes.
# Paysage 16:9, AVEC VOIX, ceinture JAUNE. Micro : litteral_identite_reconnaitre (tous les écrans).
# Métier : Karim, comptable dans un magasin de vélos (49 × 51 = 2 499 de tête).
# Centres : argent-budget (la comptabilité), transports (les vélos).
# Écrans : garde « Les trois formes » (00) ; Karim et 49 × 51 (01) ; les trois FAMILLES en cartes,
# chacune avec son carré / rectangle découpé (02) ; (x + 7)(x + 7) rangé dans la 1re (03) ;
# (2x − 3)² rangé dans la 2e, a = 2x et b = 3 (04) ; QUESTION 1 (04q, réponse A) ;
# (x + 8)(x − 8) dans la 3e, puis le secret de Karim : (50 − 1)(50 + 1) = 50² − 1² = 2 499 (05) ;
# le piège (x + 3)(x + 5) rangé dans « Aucune » (06) ; QUESTION 2 (06q, réponse C) ;
# défi : trois expressions à ranger (07) et correction (07b) ; ce que tu as appris (08) ;
# fin commune (09, manim/fin_commune.py).
# Code couleur : x bleu (série distributivité / factorisation) ; une couleur par famille
# (1 turquoise, 2 rose, 3 violet, « Aucune » gris) ; dans les carrés découpés, a² bleu,
# les bandes a·b orange, b² vert ; juste vert, piège rouge.
# Les cartes des familles restent en haut de l'écran d'un exemple à l'autre (rappel, sans audit) :
# chaque exemple vient s'y RANGER (une « puce » sous la forme de sa famille).
# Voix : manim/voix/4e-identites-reconnaitre.json (validée) ; marques : ident_reconnaitre_marques.json.
#
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/ident_reconnaitre.py IdentReconnaitre4e --media_dir manim/scripts/4e/media-ident-02-audit
# Rendu : python -m manim render -qh --disable_caching manim/scripts/4e/ident_reconnaitre.py IdentReconnaitre4e -o eleveai-maths-4e-identites-reconnaitre --media_dir manim/scripts/4e/media-ident-02
# Sortie : manim/sorties/4e/maths/identites/02-reconnaitre/eleveai-maths-4e-identites-reconnaitre.mp4

import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI))

from relatif_commun import *  # noqa: E402,F403
from equation_commun import PAROLE  # noqa: E402
from fin_commune import ecran_fin  # noqa: E402

PAROLE["²"] = "carré"

FAM = ["#2dd4bf", "#f472b6", "#a78bfa", "#94a3b8"]  # les trois formes, puis « Aucune »
FORMES = ["(a + b)²", "(a − b)²", "(a + b)(a − b)"]
C_A2 = "#3b82f6"   # a²
C_AB = OPERATION   # les bandes a·b
C_B2 = VERT_OK     # b²
PAPIER = "#f8fafc"
ENCRE = "#0f172a"


def D(s, fs=56, couleur=WHITE, lettres="xy", audit=True):
    """Une expression : les lettres en bleu."""
    return E(s, fs, couleur, lettres=lettres, audit=audit)


def forme(k, fs=30, audit=False):
    """La forme k écrite avec a et b (blancs), ses signes dans la couleur de la famille."""
    e = D(FORMES[k], fs, lettres="", audit=audit)
    for a in e.atomes:
        if a.original_text in "+−":
            a.set_color(FAM[k])
    return e


def carte_famille(k, puces=(), w=3.0, h=1.8, fs=30):
    """La carte d'une famille : badge, forme (ou « Aucune »), et les exemples déjà rangés."""
    col = FAM[k]
    cadre = RoundedRectangle(width=w, height=h, corner_radius=0.14, stroke_color=col, stroke_width=4,
                             fill_color=FOND_CARTE, fill_opacity=1)
    g = VGroup(cadre)
    haut = cadre.get_top() + DOWN * 0.42
    if k < 3:
        rond = Circle(radius=0.2, fill_color=col, fill_opacity=1, stroke_width=0)
        num = T(str(k + 1), 24, "#0b1220", audit=False, gras=True).move_to(rond)
        badge = VGroup(rond, num).move_to(P(cadre.get_left()[0] + 0.36, haut[1]))
        ex = forme(k, fs)
        if ex.width > w - 0.95:
            ex.scale_to_fit_width(w - 0.95)
        ex.move_to(P(badge.get_right()[0] + 0.15 + ex.width / 2, haut[1]))
        g.add(badge, ex)
    else:
        ex = T("Aucune", fs, col, audit=False, gras=True).move_to(haut)
        g.add(ex)
    g.cadre, g.ex, g.n = cadre, ex, 0
    g.slot = lambda i: cadre.get_top() + DOWN * (1.0 + 0.45 * i)
    for s in puces:
        p = puce(s).move_to(g.slot(g.n))
        g.add(p)
        g.n += 1
    return g


def puce(s, fs=26):
    p = D(s, fs, audit=False)
    if p.width > 2.6:
        p.scale_to_fit_width(2.6)
    return p


def carre_plus(c=1.0, b=0.45):
    """Le carré de côté a + b découpé : a² bleu, deux bandes a·b orange, b² vert."""
    a = c
    A2 = Square(a).set_fill(C_A2, 0.9)
    r1 = Rectangle(width=b, height=a).set_fill(C_AB, 0.9).next_to(A2, RIGHT, buff=0)
    r2 = Rectangle(width=a, height=b).set_fill(C_AB, 0.9).next_to(A2, DOWN, buff=0)
    B2 = Square(b).set_fill(C_B2, 0.9).next_to(r1, DOWN, buff=0)
    g = VGroup(A2, r1, r2, B2)
    g.set_stroke(WHITE, 2)
    return g


def carre_moins(c=1.45, b=0.45):
    """Le carré de côté a, d'où l'on retire deux bandes de largeur b : reste (a − b)², en bleu."""
    a = c
    tout = Square(a).set_stroke("#cbd5e1", 2)
    reste = Square(a - b).set_fill(C_A2, 0.9).set_stroke(WHITE, 2).align_to(tout, UL)
    r1 = Rectangle(width=b, height=a - b).set_fill(C_AB, 0.25).set_stroke(C_AB, 2).next_to(reste, RIGHT, buff=0)
    r2 = Rectangle(width=a - b, height=b).set_fill(C_AB, 0.25).set_stroke(C_AB, 2).next_to(reste, DOWN, buff=0)
    B2 = Square(b).set_fill(C_B2, 0.35).set_stroke(C_B2, 2).next_to(r1, DOWN, buff=0)
    return VGroup(tout, r1, r2, B2, reste)


def rect_produit(a=1.1, b=0.4):
    """Le rectangle a + b par a − b : la partie a(a − b) bleue, la partie b(a − b) orange."""
    h = a - b
    g1 = Rectangle(width=a, height=h).set_fill(C_A2, 0.9)
    g2 = Rectangle(width=b, height=h).set_fill(C_AB, 0.9).next_to(g1, RIGHT, buff=0)
    trou = DashedVMobject(Rectangle(width=a + b, height=b), num_dashes=24).set_stroke("#cbd5e1", 2)
    trou.next_to(VGroup(g1, g2), UP, buff=0)
    g = VGroup(g1, g2)
    g.set_stroke(WHITE, 2)
    return VGroup(g, trou)


def velo(s=1.0):
    """Un vélo : deux roues, le cadre, la selle et le guidon."""
    r = 0.42
    ar, av = P(-0.75, 0), P(0.75, 0)
    roues = VGroup(*[Circle(radius=r, stroke_color="#cbd5e1", stroke_width=5).move_to(c) for c in (ar, av)])
    pedale, selle, guidon = P(-0.05, 0), P(-0.3, 0.62), P(0.5, 0.72)
    cadre = VGroup(Line(ar, pedale), Line(pedale, selle), Line(selle, ar), Line(selle + P(0.1, -0.05), guidon + P(-0.05, -0.12)),
                   Line(pedale, guidon + P(-0.05, -0.12)), Line(guidon, av)).set_stroke(FAM[0], 6)
    siege = RoundedRectangle(width=0.36, height=0.09, corner_radius=0.04, fill_color="#e2e8f0", fill_opacity=1,
                             stroke_width=0).move_to(selle + UP * 0.06)
    poignee = Line(guidon + P(-0.12, 0.04), guidon + P(0.14, 0.04), color="#e2e8f0", stroke_width=6)
    return VGroup(roues, cadre, siege, poignee).scale(s)


def calculatrice(s=1.0):
    corps = RoundedRectangle(width=0.9, height=1.25, corner_radius=0.08, fill_color="#334155", fill_opacity=1,
                             stroke_color="#94a3b8", stroke_width=3)
    ecr = Rectangle(width=0.66, height=0.26, fill_color="#bbf7d0", fill_opacity=1, stroke_width=0)
    ecr.move_to(corps.get_top() + DOWN * 0.25)
    touches = VGroup(*[Square(0.15, fill_color="#e2e8f0", fill_opacity=1, stroke_width=0) for _ in range(9)])
    touches.arrange_in_grid(3, 3, buff=0.07).next_to(ecr, DOWN, buff=0.12)
    return VGroup(corps, ecr, touches).scale(s)


def karim(s=0.78):
    """Karim, comptable : lunettes et chemise bleu nuit."""
    m = Metier(["Karim", "comptable"], fs=32, peau="#a0522d", tenue="#1e3a8a", cheveux="#111827", s=s)
    m.nom.arrange(DOWN, buff=0.12)
    m.perso.add(lunettes(m.perso))
    return m


class IdentReconnaitre4e(PaysageRel):
    nom_voix = "4e-identites-reconnaitre"
    fichier_marques = "ident_reconnaitre_marques.json"
    ceinture = "jaune"

    puces = None  # les exemples déjà rangés : [(famille, expression)]

    def _disposer_q(self, question, choix, phrase):
        """La phrase de réponse sous la figure, à gauche, à 36 pt (relecture HD de la factorisation, 12/11)."""
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        if len(ph.submobjects):
            ph.scale(T(phrase[0], 36, audit=False).height / ph[0].height)
            ph.arrange(DOWN, aligned_edge=LEFT, buff=0.2)
            if ph.width > 6.7:
                ph.scale_to_fit_width(6.7)
            haut = -0.75
            ph.align_to(P(-6.45, 0), LEFT).align_to(P(0, haut), UP)
            if ph.get_bottom()[1] < -3.45:
                ph.scale((haut + 3.45) / ph.height, about_point=P(-6.45, haut))
        return tete, q, cartes, pause, rebours, ph

    def cadre(self, m, couleur=CIEL, buff=0.12):
        return SurroundingRectangle(m, color=couleur, buff=buff, stroke_width=3, corner_radius=0.08)

    # ── les familles ────────────────────────────────────────────────────────
    def familles(self, centres):
        """Les cartes des familles (rappel) aux centres donnés, avec leurs exemples rangés."""
        if self.puces is None:
            self.puces = []
        cartes = VGroup()
        for k, c in enumerate(centres):
            cartes.add(carte_famille(k, [s for j, s in self.puces if j == k]).move_to(c))
        return cartes

    def rangee(self):
        return self.familles([P(x, 2.42) for x in (-4.95, -1.65, 1.65, 4.95)])

    def grille(self):
        return self.familles([P(-4.85, 2.45), P(-1.55, 2.45), P(-4.85, 0.55), P(-1.55, 0.55)])

    def ranger(self, k, s, source, cartes, rt=0.6):
        """L'exemple vient se ranger dans sa famille (une puce sous la forme)."""
        c = cartes[k]
        p = puce(s).move_to(c.slot(c.n))
        c.n += 1
        c.add(p)
        self.puces.append((k, s))
        self.play(TransformFromCopy(source, p), c.cadre.animate.set_stroke(width=8), run_time=rt)
        self.play(c.cadre.animate.set_stroke(width=4), run_time=0.2)
        return p

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Les trois formes", self.identite, self.ceinture, y_ech=-2.65)
        for m in (titre, ident):
            m.sans_synchro = True
        ident._pas_audit = True
        self.au("Les trois", Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), rt=0.7)
        verre = Circle(radius=0.95, stroke_color=CIEL, stroke_width=9, fill_color=FOND_CARTE, fill_opacity=1)
        manche = Line(P(0.68, -0.68), P(1.45, -1.45), stroke_width=16, color="#cbd5e1")
        dedans = T("( )²", 64, JAUNE_TITRE, audit=False).move_to(verre)
        loupe = VGroup(manche, verre, dedans).move_to(P(-4.0, 0.15))
        l1 = self.lg("Comment reconnaître", 2.9, 0.85, 42, maxw=6.6)
        self.dit(l1, "Comment reconnaître", avec=[FadeIn(loupe, scale=0.8)])
        l2 = self.lg("une identité remarquable", 2.9, 0.2, 42, maxw=6.6)
        self.dit(l2, "une identité remarquable")
        l3 = self.lg("au premier coup d'œil ?", 2.9, -0.55, 46, JAUNE_TITRE, maxw=6.6)
        self.dit(l3, "au premier coup d'œil ?")
        self.play(Rotate(loupe, 0.25, about_point=loupe.get_center()), run_time=0.3)
        self.play(Rotate(loupe, -0.25, about_point=loupe.get_center()), run_time=0.3)
        self.insister(l3, 1.1, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 01 : Karim, comptable ───────────────────────────────────────────────
    def ecran_comptable(self):
        self.ecran("01-comptable")
        m = karim()
        m.perso.move_to(P(-5.2, 0.45))
        m.nom.next_to(m.perso, UP, buff=0.14).set_x(-5.2)
        v = velo(1.0).move_to(P(-4.7, -2.45))
        l1 = self.lg("Karim est comptable dans un magasin de vélos.", 1.0, 2.95, 38, maxw=10.2)
        self.poser_avec(l1, "Karim est comptable dans un magasin de vélos.",
                        {0: lambda: [FadeIn(m.perso, shift=UP * 0.3), FadeIn(m.nom[0], shift=UP * 0.1)],
                         2: lambda: [FadeIn(m.nom[1], shift=UP * 0.1)],
                         7: lambda: [FadeIn(v, shift=RIGHT * 0.5)]}, rt=0.12)
        feuille = RoundedRectangle(width=6.0, height=2.3, corner_radius=0.12, fill_color=PAPIER, fill_opacity=1,
                                   stroke_color="#cbd5e1", stroke_width=3).move_to(P(0.6, 0.15))
        lignes = VGroup(*[Line(P(-2.6, y), P(2.6, y), color="#cbd5e1", stroke_width=2) for y in (-0.55, 0.15, 0.85)])
        lignes.move_to(feuille)
        l2 = self.lg("Il doit calculer", -0.9, 2.15, 38, maxw=4.6)
        self.dit(l2, "Il doit calculer", avec=[FadeIn(feuille), FadeIn(lignes)])
        a = D("49 × 51", 66, ENCRE).move_to(P(-0.6, 0.5))
        self.dire_eq(a, "49 fois 51,", echelle=1.15)
        calc = calculatrice().move_to(P(5.0, 0.15))
        cx = VGroup(Line(P(-0.6, -0.75), P(0.6, 0.75)), Line(P(-0.6, 0.75), P(0.6, -0.75))).set_stroke(PIEGE, 9)
        cx.move_to(calc)
        l3 = self.lg("sans calculatrice.", 3.3, 2.15, 38, maxw=4.6)
        self.dit(l3, "sans calculatrice.", avec=[FadeIn(calc, shift=UP * 0.2)])
        self.play(Create(cx), run_time=0.3)
        b = D("= 2 499", 66, "#15803d").next_to(a, DOWN, buff=0.3).align_to(a, LEFT).shift(RIGHT * 0.9)
        self.dire_eq(b, "2 499.", echelle=1.2)
        ok = self.coche(VERT_OK, 0.3).next_to(b, RIGHT, buff=0.35)
        self.play(Create(ok), run_time=0.25)
        l4 = self.lg("Son secret ?", -0.4, -1.75, 44, JAUNE_TITRE, maxw=5)
        self.dit(l4, "Son secret ?")
        l5 = self.lg("Il a reconnu une forme.", -0.4, -2.55, 42, maxw=7)
        self.dit(l5, "Il a reconnu une forme.", avec=[Circumscribe(a, color=FAM[2], buff=0.12)])
        self.insister(l5, 1.08, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 02 : les trois familles ─────────────────────────────────────────────
    def ecran_trois(self):
        self.ecran("02-trois")
        tit = self.lg("Il y a trois formes à reconnaître.", 0, 3.0, 44, JAUNE_TITRE, maxw=11)
        self.dit(tit, "Il y a trois formes à reconnaître.")
        icones = [carre_plus(), carre_moins(), rect_produit()]
        legendes = [[("Deux parenthèses", "Deux parenthèses", 1), ("identiques, avec un +.", "identiques, avec un plus.", 1)],
                    [("Deux parenthèses", "Deux parenthèses", 2), ("identiques, avec un −.", "identiques, avec un moins.", 1)],
                    [("Les mêmes termes,", "Les mêmes termes,", 1), ("avec des signes contraires.", "avec des signes contraires.", 1)]]
        dits = [("Un :", "a plus b, au carré."), ("Deux :", "a moins b, au carré."), ("Trois :", "a plus b, fois a moins b.")]
        for k, x in enumerate((-4.3, 0.0, 4.3)):
            cadre = RoundedRectangle(width=3.95, height=4.3, corner_radius=0.16, stroke_color=FAM[k], stroke_width=5,
                                     fill_color=FOND_CARTE, fill_opacity=1).move_to(P(x, 0.25))
            rond = Circle(radius=0.26, fill_color=FAM[k], fill_opacity=1, stroke_width=0)
            num = T(str(k + 1), 30, "#0b1220", audit=False, gras=True).move_to(rond)
            badge = VGroup(rond, num).move_to(cadre.get_corner(UL) + P(0.42, -0.42))
            mot, ph = dits[k]
            self.au(mot, FadeIn(cadre, shift=UP * 0.2), FadeIn(badge, scale=1.3), rt=0.3)
            ex = forme(k, 48, audit=True)
            if ex.width > 3.4:
                ex.scale_to_fit_width(3.4)
            ex.move_to(P(x, 1.4))
            ic = icones[k].move_to(P(x, 0.0))
            self.dire_eq(ex, ph, echelle=1.15, avec=[FadeIn(ic, scale=0.8)])
            for j, (s, phr, n) in enumerate(legendes[k]):
                lg = self.lg(s, x, -1.0 - 0.45 * j, 28, maxw=3.55)
                self.dit(lg, phr, n=n)
            self.play(Circumscribe(ex, color=FAM[k], buff=0.1), run_time=0.4)
        self.attendre_voix(marge=0.8)

    # ── 03 : (x + 7)(x + 7), la première forme ──────────────────────────────
    def ecran_somme(self):
        self.ecran("03-somme")
        cartes = self.rangee()
        trois = VGroup(*cartes[:3])
        self.play(FadeIn(trois), run_time=0.3)
        e = D("(x + 7)(x + 7)", 72).move_to(P(0, 0.5))
        self.dire_eq(e, "x plus 7, fois x plus 7.", echelle=1.15)
        c1 = self.cadre(VGroup(*e.atomes[0:5]), FAM[0])
        c2 = self.cadre(VGroup(*e.atomes[5:10]), FAM[0])
        l1 = self.lg("Les deux parenthèses sont identiques :", 0, -0.6, 40, maxw=11)
        self.dit(l1, "Les deux parenthèses sont identiques :", avec=[Create(c1), Create(c2)])
        l2 = self.lg("c'est", 0, 0, 44, maxw=3)
        e2 = D("(x + 7)²", 62)
        VGroup(l2, e2).arrange(RIGHT, buff=0.3).move_to(P(-0.4, -1.6))
        self.dit(l2, "c'est")
        self.dire_eq(e2, "x plus 7, au carré.", echelle=1.15)
        l3 = self.lg("C'est la première forme.", -1.0, -2.65, 42, FAM[0], maxw=8)
        self.dit(l3, "C'est la première forme.")
        self.ranger(0, "(x + 7)²", e2, cartes)
        self.attendre_voix(marge=0.8)

    # ── 04 : (2x − 3)², la deuxième forme ───────────────────────────────────
    def ecran_difference(self):
        self.ecran("04-difference")
        cartes = self.rangee()
        self.play(FadeIn(VGroup(*cartes[:3])), run_time=0.3)
        e0 = self.lg("Et (2x − 3)² ?", 0, 0.62, 64, lettres="x", maxw=8)
        self.dire_eq(e0, "Et 2 x moins 3, au carré ?", echelle=1.15)
        e1 = self.lg("C'est (2x − 3)(2x − 3).", 0, -0.38, 50, lettres="x", maxw=10)
        self.dit(e1, "C'est 2 x moins 3, fois 2 x moins 3.")
        c1 = self.cadre(VGroup(*e1.atomes[3:9]), FAM[1])
        c2 = self.cadre(VGroup(*e1.atomes[9:15]), FAM[1])
        l2 = self.lg("Deux parenthèses identiques, avec un − :", 0, -1.3, 38, maxw=11.5)
        self.dit(l2, "Deux parenthèses identiques, avec un moins",
                 avec=[Create(c1), Create(c2), e1.atomes[6].animate.set_color(FAM[1]), e1.atomes[12].animate.set_color(FAM[1])])
        l3 = self.lg("la deuxième forme.", -1.0, -2.0, 42, FAM[1], maxw=8)
        self.dit(l3, "la deuxième forme.")
        self.ranger(1, "(2x − 3)²", VGroup(*e0.atomes[1:8]), cartes)
        l4 = self.lg("Ici, a vaut 2x, et b vaut 3.", -1.0, -2.8, 40, lettres="x", maxw=9)
        l4.atomes[2].set_color(JAUNE_TITRE)
        l4.atomes[8].set_color(CIEL)
        self.poser_avec(l4, "Ici, a vaut 2 x, et b vaut 3.",
                        {2: lambda: [Circumscribe(VGroup(e0.atomes[2], e0.atomes[3]), color=JAUNE_TITRE, buff=0.08)],
                         8: lambda: [Circumscribe(e0.atomes[5], color=CIEL, buff=0.08)]})
        self.attendre_voix(marge=0.8)

    # ── 04q : QUESTION 1 (réponse A) ────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        self.XL = 0.6
        cartes = self.grille()
        trois = VGroup(*cartes[:3])

        def avant(sc):
            sc.eq_dans_q(0, "Quelle est la forme", "Quelle est la forme", lettres="", fs=36)
            sc.play(FadeIn(trois), run_time=0.3)
            sc._qe = sc.eq_dans_q(0, "de (x − 6)² ?", "de x moins 6, au carré ?", lettres="x", fs=36)

        def apres(sc):
            r = sc.ph_eq(0, "Réponse A : (a − b)².", "Réponse A : a moins b, au carré.", premier=True)
            sc.ranger(1, "(x − 6)²", VGroup(*sc._qe.atomes[1:7]), cartes, rt=0.45)
            sc.ph_eq(1, "Les deux parenthèses x − 6", "Les deux parenthèses x moins 6", lettres="x")
            sc.ph_eq(2, "sont identiques, avec un −.", "sont identiques, avec un moins.")
            sc.rep_fini()
            return r

        self.question_pause("04q-question", "04r-reponse", ["Quelle est la forme", "de (x − 6)² ?"],
                            [Eq("(a − b)²", 34, lettres=""), Eq("(a + b)²", 34, lettres=""),
                             Eq("(a + b)(a − b)", 34, lettres="")], 0,
                            ["Réponse A : (a − b)².", "Les deux parenthèses x − 6", "sont identiques, avec un −."],
                            avant_q=avant, autres_r=apres)
        self.XL = type(self).XL

    # ── 05 : (x + 8)(x − 8), la troisième forme, et le secret de Karim ──────
    def ecran_produit(self):
        self.ecran("05-produit")
        cartes = self.rangee()
        self.play(FadeIn(VGroup(*cartes[:3])), run_time=0.3)
        e = D("(x + 8)(x − 8)", 70).move_to(P(0, 0.55))
        self.dire_eq(e, "x plus 8, fois x moins 8.", echelle=1.15)
        l1 = self.lg("Les mêmes termes, x et 8,", 0, -0.45, 40, lettres="x", maxw=10)
        self.poser_avec(l1, "Les mêmes termes, x et 8,",
                        {4: lambda: [Circumscribe(VGroup(e.atomes[1], e.atomes[6]), color=JAUNE_TITRE, buff=0.08)],
                         6: lambda: [Circumscribe(VGroup(e.atomes[3], e.atomes[8]), color=JAUNE_TITRE, buff=0.08)]})
        l2 = self.lg("mais un + d'un côté, et un − de l'autre :", 0, -1.25, 38, maxw=11.5)
        l2.atomes[2].set_color(POS)
        l2.atomes[10].set_color(FAM[1])
        self.poser_avec(l2, "mais un plus d'un côté, et un moins de l'autre :",
                        {2: lambda: [e.atomes[2].animate.set_color(POS)],
                         10: lambda: [e.atomes[7].animate.set_color(FAM[1])]})
        l3 = self.lg("la troisième forme.", -1.0, -2.05, 42, FAM[2], maxw=8)
        self.dit(l3, "la troisième forme.")
        self.ranger(2, "(x + 8)(x − 8)", e, cartes)
        self.play(FadeOut(VGroup(e, l1, l2, l3)), run_time=0.3)
        # le secret de Karim
        k = karim(0.55)
        k.perso.move_to(P(-5.45, -1.0))
        s1 = self.lg("Le secret de Karim, c'est elle :", 0, 1.05, 40, maxw=9)
        s1.align_to(P(-4.4, 0), LEFT)
        self.dit(s1, "Le secret de Karim, c'est elle :", avec=[FadeIn(k.perso, shift=UP * 0.2)])
        self.play(Indicate(cartes[2], color=FAM[2], scale_factor=1.06), run_time=0.45)
        a = D("49 × 51 = (50 − 1)(50 + 1)", 46).move_to(P(0, 0.2)).align_to(P(-4.4, 0), LEFT)
        self.dire_eq(a, "49 fois 51, c'est 50 moins 1, fois 50 plus 1.")
        xg = a.egal.get_center()[0]
        b = D("= 50² − 1²", 46).mis_sur_egal(xg, -0.65)
        self.dire_eq(b, "Elle donne 50 au carré moins 1 au carré :")
        c = D("= 2 500 − 1 = 2 499", 46).mis_sur_egal(xg, -1.5)
        self.dire_eq(c, "2 500 moins 1, 2 499.")
        fin = VGroup(*c.atomes[-3:])
        self.play(fin.animate.set_color(VERT_OK), Create(self.cadre_ok(VGroup(*c.atomes[-2:]), 0.12)), run_time=0.3)
        self.insister(fin, 1.15, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 06 : le piège (x + 3)(x + 5) ────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        cartes = self.rangee()
        self.play(FadeIn(VGroup(*cartes[:3])), run_time=0.3)
        tit = T("Le piège :", 44, PIEGE, gras=True)
        l0 = self.lg("des parenthèses qui se ressemblent,", 0, 0, 40, maxw=8.4)
        VGroup(tit, l0).arrange(RIGHT, buff=0.35).move_to(P(0, 1.0))
        self.au("Le piège", FadeIn(tit, scale=1.3), rt=0.25)
        self.dit(l0, "des parenthèses qui se ressemblent,")
        l1 = self.lg("sans être une identité.", 0, 0.35, 40, maxw=8)
        self.dit(l1, "sans être une identité.")
        e = D("(x + 3)(x + 5)", 64).move_to(P(-2.3, -0.75))
        self.dire_eq(e, "x plus 3, fois x plus 5 :", echelle=1.15)
        n1 = self.lg("les nombres", 3.3, -0.5, 38, PIEGE, maxw=5)
        n2 = self.lg("sont différents.", 3.3, -1.05, 38, PIEGE, maxw=5)
        self.dit(n1, "les nombres", avec=[Circumscribe(e.atomes[3], color=PIEGE, buff=0.08),
                                         Circumscribe(e.atomes[8], color=PIEGE, buff=0.08)])
        self.dit(n2, "sont différents.")
        l3 = self.lg("Ce n'est aucune des trois formes.", -1.0, -2.0, 40, maxw=9)
        self.dit(l3, "Ce n'est aucune des trois formes.")
        self.play(FadeIn(cartes[3], shift=DOWN * 0.2), run_time=0.3)
        self.ranger(3, "(x + 3)(x + 5)", e, cartes, rt=0.5)
        l4 = self.lg("On développe alors par la double", -1.0, -2.65, 38, maxw=9.2)
        self.dit(l4, "On développe alors par la double")
        fl = VGroup()
        for i, j, ang, haut in ((1, 6, -1.0, True), (1, 8, -0.8, True), (3, 6, 0.8, False), (3, 8, 1.0, False)):
            a_, b_ = e.atomes[i], e.atomes[j]
            if haut:
                fl.add(CurvedArrow(a_.get_top() + UP * 0.06, b_.get_top() + UP * 0.06, angle=ang, color=CIEL,
                                   stroke_width=4, tip_length=0.14))
            else:
                fl.add(CurvedArrow(a_.get_bottom() + DOWN * 0.06, b_.get_bottom() + DOWN * 0.06, angle=ang,
                                   color=CIEL, stroke_width=4, tip_length=0.14))
        l5 = self.lg("distributivité, tout simplement.", -1.0, -3.2, 38, maxw=9.2)
        self.dit(l5, "distributivité, tout simplement.", avec=[LaggedStart(*[Create(f) for f in fl], lag_ratio=0.2)])
        self.attendre_voix(marge=0.8)

    # ── 06q : QUESTION 2 (réponse C) ────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        self.XL = 0.6
        cartes = self.grille()

        def avant(sc):
            sc.eq_dans_q(0, "Laquelle est une", "Laquelle est une", lettres="", fs=36)
            sc.play(FadeIn(cartes), run_time=0.3)
            sc.eq_dans_q(0, "identité remarquable ?", "identité remarquable ?", lettres="", fs=36)

        def apres(sc):
            r = sc.ph_eq(0, "Réponse C : (x − 4)(x + 4).", "Réponse C : x moins 4, fois x plus 4.", lettres="x",
                         premier=True)
            sc.ph_eq(1, "Les mêmes termes, x et 4,", "Les mêmes termes, x et 4,", lettres="x")
            sc.ph_eq(2, "avec des signes contraires.", "avec des signes contraires")
            sc.au_mot("la troisième forme")
            sc.ranger(2, "(x − 4)(x + 4)", VGroup(*r.atomes[3:-1]), cartes, rt=0.45)
            sc.rep_fini()

        self.question_pause("06q-question", "06r-reponse", ["Laquelle est une", "identité remarquable ?"],
                            [Eq("(x + 4)(x + 2)", 34), Eq("(x + 4)(2x − 4)", 34), Eq("(x − 4)(x + 4)", 34)], 2,
                            ["Réponse C : (x − 4)(x + 4).", "Les mêmes termes, x et 4,", "avec des signes contraires."],
                            avant_q=avant, autres_r=apres)
        self.XL = type(self).XL

    # ── 07 : le défi ────────────────────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("07-defi")
        bande = self.familles([P(x, -2.35) for x in (-4.75, -1.5, 1.75)])
        tit = T("À toi de jouer !", 56, JAUNE_TITRE).move_to(P(0, 2.95))
        self.au("À toi", Write(tit), FadeIn(bande), rt=0.5)
        l = self.lg("Donne la forme de ces trois expressions.", 0, 1.95, 42, CIEL, maxw=11.5)
        self.dit(l, "Donne la forme de ces trois expressions.")
        es = [D("(3x + 1)²", 56).move_to(P(-4.3, 0.85)), D("(y − 5)(y + 5)", 56).move_to(P(0, 0.85)),
              D("(10 − x)²", 56).move_to(P(4.3, 0.85))]
        for e, ph in zip(es, ("3 x plus 1, au carré.", "y moins 5, fois y plus 5.", "10 moins x, au carré.")):
            if e.width > 3.9:
                e.scale_to_fit_width(3.9)
            self.dire_eq(e, ph, echelle=1.15)
        qs = VGroup(*[T("?", 56, JAUNE_TITRE, audit=False).next_to(e, DOWN, buff=0.25) for e in es])
        self.play(LaggedStart(*[FadeIn(q, scale=1.3) for q in qs], lag_ratio=0.2), run_time=0.4)
        pz = T("Mets pause, et cherche !", 46, ORANGE_RETENUE).move_to(P(0, -0.85))
        self.au("Mets pause", Write(pz), rt=0.5)
        self.defi = dict(tit=tit, l=l, es=es, qs=qs, pz=pz, bande=bande)
        self.attendre_voix(marge=2.0)

    # ── 07b : la correction ─────────────────────────────────────────────────
    def ecran_correction(self):
        d = self.defi
        self.dire("07b-correction")
        tit = T("Correction", 50, JAUNE_TITRE).move_to(P(0, 2.95))
        es, bande = d["es"], d["bande"]
        self.au("Correction", ReplacementTransform(d["tit"], tit), FadeOut(d["pz"]), FadeOut(d["qs"]), FadeOut(d["l"]),
                *[e.animate.shift(UP * 0.75) for e in es], rt=0.4)
        xs = (-4.3, 0.0, 4.3)

        def classer(i, k, mot):
            self.dit(mot, mot.s, avec=[Create(self.cadre(es[i], FAM[k], 0.14))])
            self.play(Indicate(bande[k], color=FAM[k], scale_factor=1.06), run_time=0.4)

        m1 = self.lg("la première forme,", xs[0], 0.7, 32, FAM[0], maxw=4.0)
        classer(0, 0, m1)
        f1 = forme(0, 34, audit=True).move_to(P(xs[0], 0.15))
        self.dire_eq(f1, "a plus b au carré.", echelle=1.1)
        m2 = self.lg("la troisième forme.", xs[1], 0.7, 32, FAM[2], maxw=4.0)
        classer(1, 2, m2)
        m3 = self.lg("la deuxième forme,", xs[2], 0.7, 32, FAM[1], maxw=4.0)
        classer(2, 1, m3)
        f3 = forme(1, 34, audit=True).move_to(P(xs[2], 0.15))
        self.dire_eq(f3, "a moins b au carré,", echelle=1.1)
        ab = self.lg("a = 10 et b = x.", xs[2], -0.45, 32, lettres="x", maxw=4.0)
        ab.atomes[0].set_color(JAUNE_TITRE)
        ab.atomes[4].set_color(CIEL)
        self.dit(ab, "a égale 10 et b égale x.")
        self.insister(ab, 1.1, 0.2)
        self.attendre_voix(marge=1.2)

    # ── 08 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("08-finale", 0.5)
        tit = self.t("Ce que tu as appris", 48, JAUNE_TITRE).to_edge(UP, buff=0.45)
        fig = self.familles([P(-4.85, 1.45), P(-1.55, 1.45), P(-4.85, -0.6), P(-1.55, -0.6)])
        self.au("Ce que tu as appris", Write(tit), rt=0.6)
        self.play(FadeIn(fig), run_time=0.3)
        X0 = 0.85
        plan = [  # (texte, phrase, y, lettres, coche ?)
            ("Deux parenthèses identiques", "Deux parenthèses identiques", 2.3, True),
            ("avec un + : (a + b)²", "avec un plus : a plus b, au carré.", 1.75, False),
            ("Avec un − : (a − b)²", "Avec un moins : a moins b, au carré.", 0.95, True),
            ("Les mêmes termes avec des", "Les mêmes termes avec des", 0.15, True),
            ("signes contraires :", "signes contraires :", -0.4, False),
            ("(a + b)(a − b)", "a plus b, fois a moins b.", -0.95, False),
            ("Sinon, ce n'est pas", "Sinon, ce n'est pas", -1.75, True),
            ("une identité.", "une identité.", -2.3, False),
        ]
        for s, ph, y, coche in plan:
            lg = self.lg(s, 0, y, 34, lettres="", maxw=5.6)
            lg.align_to(P(X0, 0), LEFT)
            for a in lg.atomes:
                if a.original_text in "+−":
                    a.set_color(JAUNE_TITRE)
            avec = []
            if coche:
                c = self.coche().move_to(P(X0 - 0.42, y))
                avec = [Create(c)]
            self.dit(lg, ph, avec=avec)
        self.attendre_voix(marge=1.2)

    def construct(self):
        self.page_de_garde()
        self.ecran_comptable()
        self.ecran_trois()
        self.ecran_somme()
        self.ecran_difference()
        self.ecran_question1()
        self.ecran_produit()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        ecran_fin(self, "paysage", voix="09-abonne")
