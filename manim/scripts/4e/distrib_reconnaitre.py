# distrib_reconnaitre.py
# EleveAI — Maths 4e — série DISTRIBUTIVITÉ, épisode 04 : RECONNAÎTRE une expression à développer.
# Paysage 16:9, AVEC VOIX, ceinture JAUNE. Micro : litteral_distributivite_reconnaitre.
# Métier : Karim, cuisinier de cantine (toque blanche).
# Écrans (micro litteral_distributivite_reconnaitre partout) : garde (00) ; les 4 tables de la
# cantine et les deux listes (01) ; les deux ont raison : un produit, une somme (02) ; la dernière
# opération (03) ; la règle : quand développer (04) ; QUESTION 1 (04q, réponse C) ; le piège
# 3 + (x + 1) (05) ; une expression déjà développée (06) ; QUESTION 2 (06q, réponse A) ;
# défi (07) et correction (07b) ; ce que tu as appris (08) ; fin du 05/11 (09).
# Code couleur : x bleu (les crêpes) ; le nombre qui se distribue orange ; les compotes orange ;
# juste vert ; piège rouge.
# Voix : manim/voix/4e-distrib-reconnaitre.json ; marques : distrib_reconnaitre_marques.json.
#
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/distrib_reconnaitre.py DistribReconnaitre4e --media_dir manim/scripts/4e/media-dist-04-audit
# Rendu : python -m manim render -qh --disable_caching manim/scripts/4e/distrib_reconnaitre.py DistribReconnaitre4e -o eleveai-maths-4e-distrib-reconnaitre --media_dir manim/scripts/4e/media-dist-04
# Sortie : manim/sorties/4e/maths/distributivite/04-reconnaitre/eleveai-maths-4e-distrib-reconnaitre.mp4

import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI))

from relatif_commun import *  # noqa: E402,F403

PAROLE["²"] = "carré"  # « x au carré » : le ² se pose sur « carré »

FACTEUR = OPERATION  # le nombre qui se distribue
BOIS = "#78350f"
PAPIER = "#1e293b"
GRIS = "#94a3b8"


def D(s, fs=56, couleur=WHITE, lettres="x", audit=True):
    """Une expression : la lettre en bleu."""
    return E(s, fs, couleur, lettres=lettres, audit=audit)


def idx(e, mot, n=1):
    """L'indice du n-ième atome dont le texte est `mot`."""
    k = 0
    for i, a in enumerate(e.atomes):
        if a.original_text == mot:
            k += 1
            if k == n:
                return i
    raise ValueError(mot)


def compote(s=1.0):
    pot = Polygon(P(-0.11, 0.1), P(0.11, 0.1), P(0.08, -0.12), P(-0.08, -0.12), fill_color=OPERATION, fill_opacity=1,
                  stroke_width=0)
    cou = Ellipse(width=0.24, height=0.07, fill_color="#fdba74", fill_opacity=1, stroke_width=0).move_to(P(0, 0.1))
    return VGroup(pot, cou).scale(s)


def plateau(s=1.0):
    """Une table de la cantine : un plateau, x crêpes (pile bleue) et 2 compotes (orange)."""
    tray = RoundedRectangle(width=1.5, height=0.8, corner_radius=0.12, fill_color=BOIS, fill_opacity=1,
                            stroke_color="#b45309", stroke_width=3)
    pile = VGroup(*[Ellipse(width=0.62, height=0.15, fill_color=INCONNUE, fill_opacity=1, stroke_color="#1e3a8a",
                            stroke_width=2).move_to(P(-0.33, -0.17 + 0.085 * k)) for k in range(4)])
    lab = T("x", 30, WHITE, audit=False, gras=True).next_to(pile, UP, buff=0.0).shift(DOWN * 0.04)
    crepes = VGroup(pile, lab)
    pots = VGroup(compote().move_to(P(0.25, -0.02)), compote().move_to(P(0.53, -0.02)))
    g = VGroup(tray, crepes, pots).scale(s)
    g.tray, g.crepes, g.pots = tray, crepes, pots
    return g


def feuille(w=3.4, h=1.6):
    """Une feuille de liste (carnet à spirale)."""
    r = RoundedRectangle(width=w, height=h, corner_radius=0.1, fill_color=PAPIER, fill_opacity=1,
                         stroke_color="#cbd5e1", stroke_width=3)
    sp = VGroup(*[Circle(radius=0.06, stroke_color="#cbd5e1", stroke_width=3)
                  .move_to(r.get_top() + P(-w / 2 + 0.4 + k * (w - 0.8) / 5, 0)) for k in range(6)])
    g = VGroup(r, sp)
    g.r = r
    return g


def karim(s=0.78):
    """Karim : veste blanche et toque de cuisinier."""
    m = Metier(["Karim", "cuisinier"], fs=36, peau="#8d5524", tenue="#e5e7eb", cheveux="#1f2937", s=s)
    m.nom.arrange(DOWN, buff=0.12)
    p = m.perso
    h = p.tete.get_top()
    bande = Rectangle(width=0.66 * s, height=0.2 * s, fill_color=WHITE, fill_opacity=1, stroke_color="#cbd5e1",
                      stroke_width=2).move_to(h + DOWN * 0.02 * s)
    bouffe = VGroup(*[Circle(radius=0.2 * s, fill_color=WHITE, fill_opacity=1, stroke_width=0)
                      .move_to(h + P(dx * s, 0.2 * s)) for dx in (-0.2, 0, 0.2)])
    boutons = VGroup(*[Dot(p.corps.get_center() + P(0, dy * s), radius=0.04 * s, color="#475569") for dy in (0.35, 0, -0.35)])
    p.add(bouffe, bande, boutons)
    return m


class DistribReconnaitre4e(PaysageRel):
    nom_voix = "4e-distrib-reconnaitre"
    fichier_marques = "distrib_reconnaitre_marques.json"
    ceinture = "jaune"

    def fleche_arc(self, a, b, couleur=None, angle=-1.2, sw=5):
        return CurvedArrow(a.get_top() + UP * 0.1, b.get_top() + UP * 0.12, angle=angle, color=couleur or FACTEUR,
                           stroke_width=sw, tip_length=0.16)

    def rond(self, m, couleur, r=None):
        """Un cercle autour d'un signe (l'opération qu'on montre)."""
        return Circle(radius=r or max(m.width, m.height) * 0.5 + 0.14, color=couleur, stroke_width=5).move_to(m)

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Développer ou pas ?", self.identite, self.ceinture, y_ech=-2.65)
        for m in (titre, ident):
            m.sans_synchro = True
        ident._pas_audit = True
        self.au("Développer", Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), rt=0.7)
        e1 = D("4(x + 2)", 72, audit=False).move_to(P(-4.4, 0.75))
        e1.atomes[0].set_color(FACTEUR)
        e2 = D("4x + 8", 72, audit=False).move_to(P(-4.4, -0.45))
        q = T("?", 72, JAUNE_TITRE, audit=False, gras=True).move_to(P(-1.9, 0.15))
        l1 = self.lg("Comment reconnaître", 3.0, 0.6, 42, maxw=6.4)
        self.dit(l1, "Comment reconnaître", avec=[FadeIn(e1, shift=UP * 0.2), FadeIn(e2, shift=UP * 0.2)])
        self.play(FadeIn(q, scale=1.4), run_time=0.25)
        l2 = self.lg("une expression à développer ?", 3.0, -0.15, 44, JAUNE_TITRE, maxw=6.6)
        self.dit(l2, "une expression à développer ?")
        self.insister(l2, 1.1, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 01 : la cantine de Karim ────────────────────────────────────────────
    def ecran_cantine(self):
        self.ecran("01-cantine")
        m = karim()
        m.perso.move_to(P(-5.55, 0.95))
        m.nom.scale(0.85).next_to(m.perso, UP, buff=0.32).set_x(-5.55)
        self.au("Karim", FadeIn(m.perso, shift=UP * 0.3), FadeIn(m.nom[0], shift=UP * 0.1), rt=0.35)
        self.au("cuisinier", FadeIn(m.nom[1], shift=UP * 0.1), rt=0.3)
        tables = VGroup(*[plateau(0.95) for _ in range(4)]).arrange(RIGHT, buff=0.32).move_to(P(-1.35, 0.75))
        for t in tables:
            t.crepes.set_opacity(0)
            t.pots.set_opacity(0)
        l1 = self.lg("Pour 4 tables, il prévoit x crêpes", 0.6, 3.05, 38, lettres="x", maxw=10.0)
        self.poser_avec(l1, "Pour 4 tables, il prévoit x crêpes", {
            idx(l1, "tables"): lambda: [LaggedStart(*[FadeIn(t.tray, shift=UP * 0.2) for t in tables], lag_ratio=0.2)],
            idx(l1, "x"): lambda: [t.crepes.animate.set_opacity(1) for t in tables]})
        l2 = self.lg("et 2 compotes par table.", 0.6, 2.4, 38, maxw=10.0)
        self.poser_avec(l2, "et 2 compotes par table.", {
            idx(l2, "compotes"): lambda: [t.pots.animate.set_opacity(1) for t in tables]})
        f1 = feuille().move_to(P(-3.7, -2.1))
        f2 = feuille().move_to(P(1.5, -2.1))
        c1 = self.lg("Sur sa liste, il écrit :", -3.7, -0.85, 32, CIEL, maxw=4.4)
        self.dit(c1, "Sur sa liste, il écrit :", avec=[FadeIn(f1, shift=UP * 0.2)])
        e1 = D("4(x + 2)", 60).move_to(f1.r.get_center() + DOWN * 0.08)
        self.dire_eq(e1, "4 fois, entre parenthèses, x plus 2.", echelle=1.2)
        self.play(e1.atomes[0].animate.set_color(FACTEUR), run_time=0.12)
        c2 = self.lg("Son collègue écrit :", 1.5, -0.85, 32, CIEL, maxw=4.4)
        self.dit(c2, "Son collègue écrit :", avec=[FadeIn(f2, shift=UP * 0.2)])
        e2 = D("4x + 8", 60).move_to(f2.r.get_center() + DOWN * 0.08)
        self.dire_eq(e2, "4 x plus 8.", echelle=1.2)
        q = self.lg("Qui a raison ?", 4.55, 0.75, 50, JAUNE_TITRE, maxw=3.5)
        self.dit(q, "Qui a raison ?")
        self.insister(q, 1.1, 0.2)
        self.attendre_voix(marge=0.8)
        self.f = dict(f1=f1, f2=f2, e1=e1, e2=e2, autres=VGroup(m, tables, l1, l2, c1, c2, q))

    # ── 02 : les deux ont raison ────────────────────────────────────────────
    def ecran_deux(self):
        f = self.f
        self.dire("02-deux")
        g1, g2 = VGroup(f["f1"], f["e1"]), VGroup(f["f2"], f["e2"])
        ok = self.lg("Les deux !", 0, 3.05, 56, VERT_OK, maxw=8)
        self.dit(ok, "Les deux !", avec=[FadeOut(f["autres"]), g1.animate.move_to(P(-3.3, 0.95)),
                                         g2.animate.move_to(P(3.3, 0.95))])
        k1 = self.coche(VERT_OK, 0.26).move_to(f["f1"].r.get_corner(UR) + P(-0.38, -0.38))
        k2 = self.coche(VERT_OK, 0.26).move_to(f["f2"].r.get_corner(UR) + P(-0.38, -0.38))
        self.play(Create(k1), Create(k2), f["f1"].r.animate.set_stroke(VERT_OK), f["f2"].r.animate.set_stroke(VERT_OK),
                  run_time=0.3)
        # la même quantité : 4 plateaux, ou les crêpes et les compotes rangées
        mini = VGroup(*[plateau(0.5) for _ in range(4)]).arrange(RIGHT, buff=0.12).move_to(P(-3.3, -0.55))
        acc = Brace(mini, DOWN, buff=0.08, color=FACTEUR)
        crepes = VGroup(*[plateau(0.5).crepes for _ in range(4)]).arrange(RIGHT, buff=0.12)
        pots = VGroup(*[compote(0.85) for _ in range(8)]).arrange(RIGHT, buff=0.06)
        rang = VGroup(crepes, pots).arrange(RIGHT, buff=0.3).move_to(P(3.3, -0.55))
        l1 = self.lg("C'est la même quantité, écrite de deux façons.", 0, 2.2, 38, maxw=12)
        self.poser_avec(l1, "C'est la même quantité, écrite de deux façons.", {
            idx(l1, "quantité"): lambda: [FadeIn(mini, shift=UP * 0.15), FadeIn(rang, shift=UP * 0.15)]})
        self.play(GrowFromCenter(acc), run_time=0.25)
        self.au("4 fois", Circumscribe(f["e1"], color=CIEL), rt=0.5)
        p = self.lg("un produit", -3.3, -1.75, 46, CIEL, maxw=5)
        self.dit(p, "un produit.")
        cp = self.cadre_ok(p, 0.15).set_color(CIEL)
        self.play(Create(cp), run_time=0.2)
        self.au("4 x plus 8", Circumscribe(f["e2"], color=VERT_OK), rt=0.5)
        s = self.lg("une somme", 3.3, -1.75, 46, VERT_OK, maxw=5)
        self.dit(s, "une somme.")
        cs = self.cadre_ok(s, 0.15)
        self.play(Create(cs), run_time=0.2)
        self.insister(VGroup(p, s), 1.08, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 03 : la dernière opération ──────────────────────────────────────────
    def ecran_derniere(self):
        self.ecran("03-derniere")
        tit = self.lg("Comment savoir ?", 0, 3.15, 48, JAUNE_TITRE, maxw=10)
        self.dit(tit, "Comment savoir ?")
        sous = self.lg("On regarde la dernière opération.", 0, 2.45, 40, CIEL, maxw=11)
        self.dit(sous, "On regarde la dernière opération.")
        self.insister(VGroup(*sous.atomes[3:5]), 1.2, 0.18)
        sep = DashedLine(P(0, 1.75), P(0, -2.55), color=GRIS, stroke_width=2)
        self.play(Create(sep), run_time=0.25)
        # à gauche : 4(x + 2), avec son « fois » écrit
        e1 = D("4 × (x + 2)", 64).move_to(P(-3.4, 0.7))
        self.dire_eq(e1, "4 fois, entre parenthèses, x plus 2", echelle=1.2)
        self.play(e1.atomes[0].animate.set_color(FACTEUR), run_time=0.12)
        par = VGroup(*e1.atomes[2:7])
        rp = DashedVMobject(SurroundingRectangle(par, color=JAUNE_TITRE, buff=0.1, stroke_width=4), num_dashes=40)
        d1 = self.lg("d'abord", par.get_x(), 1.55, 32, JAUNE_TITRE, maxw=3)
        self.dit(d1, "d'abord", avec=[Create(rp)])
        self.au("la parenthèse", par.animate.scale(1.12), rt=0.2)
        self.play(par.animate.scale(1 / 1.12), run_time=0.2)
        fois = e1.atomes[1]
        rf = self.rond(fois, FACTEUR)
        d2 = self.lg("puis", fois.get_x(), 1.55, 32, FACTEUR, maxw=2)
        self.dit(d2, "puis", avec=[Create(rf)])
        self.insister(VGroup(fois, rf), 1.3, 0.18)
        a1 = self.lg("la dernière opération est", -3.4, -0.5, 34, maxw=6.2)
        self.dit(a1, "la dernière opération est", n=1)
        a2 = self.lg("une multiplication.", -3.4, -1.1, 40, FACTEUR, maxw=6.2)
        self.dit(a2, "une multiplication.")
        v1 = self.lg("C'est un produit.", -3.4, -2.05, 44, CIEL, maxw=6.0)
        self.dit(v1, "C'est un produit.")
        cv1 = self.cadre_ok(v1, 0.15).set_color(CIEL)
        self.play(Create(cv1), run_time=0.2)
        # à droite : 4x + 8
        e2 = D("4x + 8", 64).move_to(P(3.0, 0.7))
        self.dire_eq(e2, "4 x plus 8", echelle=1.2)
        plus = e2.atomes[2]
        b1 = self.lg("la dernière opération est", 3.0, -0.5, 34, maxw=5.4)
        rpl = self.rond(plus, VERT_OK)
        self.dit(b1, "la dernière opération est", n=2)
        b2 = self.lg("une addition.", 3.0, -1.1, 40, VERT_OK, maxw=5.4)
        self.dit(b2, "une addition.", avec=[Create(rpl)])
        self.insister(VGroup(plus, rpl), 1.3, 0.15)
        v2 = self.lg("C'est une somme.", 3.0, -2.05, 44, VERT_OK, maxw=4.6)
        self.dit(v2, "C'est une somme.")
        cv2 = self.cadre_ok(v2, 0.15)
        self.play(Create(cv2), run_time=0.2)
        self.attendre_voix(marge=0.8)

    # ── 04 : la règle ───────────────────────────────────────────────────────
    def ecran_regle(self):
        self.ecran("04-regle")
        e1 = D("4(x + 2)", 64, audit=False).move_to(P(-3.6, 1.55))
        e1.atomes[0].set_color(FACTEUR)
        e2 = D("4x + 8", 64, audit=False).move_to(P(3.6, 1.55))
        fl = Arrow(P(-1.5, 1.55), P(1.5, 1.55), color=FACTEUR, stroke_width=6, buff=0)
        ld = T("développer", 30, FACTEUR, audit=False).next_to(fl, UP, buff=0.1)
        lp = T("produit", 34, CIEL, audit=False).next_to(e1, DOWN, buff=0.25)
        ls = T("somme", 34, VERT_OK, audit=False).next_to(e2, DOWN, buff=0.25)
        l0 = self.lg("Développer, c'est passer du produit à la somme.", 0, 3.05, 42, JAUNE_TITRE, maxw=12.5)
        self.poser_avec(l0, "Développer, c'est passer du produit à la somme.", {
            idx(l0, "passer"): lambda: [GrowArrow(fl), FadeIn(ld)],
            idx(l0, "produit"): lambda: [FadeIn(e1, shift=RIGHT * 0.2), FadeIn(lp)],
            idx(l0, "somme"): lambda: [FadeIn(e2, shift=LEFT * 0.2), FadeIn(ls)]})
        r1 = self.lg("Il faut développer quand un nombre", -0.5, -0.3, 38, maxw=11.5)
        self.poser_avec(r1, "Il faut développer quand un nombre", {
            idx(r1, "nombre"): lambda: [e1.atomes[0].animate.scale(1.4)]})
        self.play(e1.atomes[0].animate.scale(1 / 1.4), run_time=0.2)
        par = VGroup(e1.atomes[1], e1.atomes[5])
        r2 = self.lg("multiplie une parenthèse qui contient", -0.5, -0.95, 38, maxw=11.5)
        self.poser_avec(r2, "multiplie une parenthèse qui contient", {
            idx(r2, "parenthèse"): lambda: [par.animate.set_color(JAUNE_TITRE).scale(1.2)]})
        self.play(par.animate.scale(1 / 1.2), run_time=0.2)
        r3 = self.lg("une addition ou une soustraction.", -0.5, -1.6, 38, maxw=11.5)
        rpl = self.rond(e1.atomes[3], VERT_OK)
        self.poser_avec(r3, "une addition ou une soustraction.", {
            idx(r3, "addition"): lambda: [Create(rpl)]})
        cad = SurroundingRectangle(VGroup(r1, r2, r3), color=CIEL, buff=0.22, stroke_width=4, corner_radius=0.1)
        self.play(Create(cad), run_time=0.3)
        self.attendre_voix(marge=0.8)

    # ── 04q : QUESTION 1 (réponse C) ────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        self.XL = 0.6
        m = karim(0.7)
        m.perso.move_to(P(-4.9, -0.4))
        fe = feuille(2.9, 1.4).move_to(P(-2.2, 0.9))
        ex = D("4(x + 2)", 50, audit=False).move_to(fe.r.get_center() + DOWN * 0.08)
        ex.atomes[0].set_color(FACTEUR)
        q = T("?", 80, JAUNE_TITRE, audit=False, gras=True).move_to(P(-2.2, -0.75))

        def avant(sc):
            sc.eq_dans_q(0, "Laquelle faut-il développer ?", "Laquelle faut-il développer ?", lettres="", fs=36)
            sc.play(FadeIn(m.perso, shift=UP * 0.2), FadeIn(fe), FadeIn(ex), FadeIn(q, scale=1.3), run_time=0.3)

        def apres(sc):
            sc.ph_eq(0, "Réponse C.", "Réponse C.", premier=True)
            sc.ph_eq(1, "Le 2 multiplie une parenthèse :", "Le 2 multiplie une parenthèse :")
            sc.ph_eq(2, "c'est un produit.", "c'est un produit.")
            sc.rep_fini()

        self.question_pause("04q-question", "04r-reponse", ["Laquelle faut-il développer ?"],
                            [Eq("5x + 7", 34), Eq("3x − 1", 34), Eq("2(x + 6)", 34)], 2,
                            ["Réponse C.", "Le 2 multiplie une parenthèse :", "c'est un produit."],
                            avant_q=avant, autres_r=apres)
        self.XL = type(self).XL

    # ── 05 : le piège ───────────────────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("05-piege")
        tit = T("Le piège :", 46, PIEGE, gras=True).move_to(P(-4.9, 3.1))
        self.au("Le piège", FadeIn(tit, scale=1.3), rt=0.25)
        e = D("3 + (x + 1)", 76).move_to(P(-3.4, 1.35))
        self.dire_eq(e, "3 plus, entre parenthèses, x plus 1.", echelle=1.15)
        par = VGroup(e.atomes[2], e.atomes[6])
        plus = e.atomes[1]
        l1 = self.lg("Il y a une parenthèse,", 3.3, 2.35, 36, maxw=6.0)
        self.dit(l1, "Il y a une parenthèse,", avec=[par.animate.set_color(JAUNE_TITRE)])
        rp = self.rond(plus, PIEGE)
        l2 = self.lg("mais rien ne la multiplie :", 3.3, 1.75, 36, maxw=6.0)
        self.dit(l2, "mais rien ne la multiplie :", avec=[Create(rp)])
        self.insister(VGroup(plus, rp), 1.3, 0.18)
        l3 = self.lg("la dernière opération", 3.3, 1.15, 36, maxw=6.0)
        self.dit(l3, "la dernière opération")
        l4 = self.lg("est une addition.", 3.3, 0.55, 36, PIEGE, maxw=6.0)
        self.dit(l4, "est une addition.")
        # la fausse distribution, barrée
        f1 = self.fleche_arc(e.atomes[0], e.atomes[3], angle=-1.5)
        f2 = self.fleche_arc(e.atomes[0], e.atomes[5], angle=-1.15)
        l5 = self.lg("Pas de distributivité :", -3.4, -0.2, 42, PIEGE, maxw=6.2)
        self.dit(l5, "Pas de distributivité :", avec=[Create(f1), Create(f2)])
        croix = VGroup(Line(P(-0.3, -0.3), P(0.3, 0.3)), Line(P(-0.3, 0.3), P(0.3, -0.3))).set_stroke(PIEGE, 8)
        croix.move_to(VGroup(f1, f2).get_top() + DOWN * 0.22)
        self.play(Create(croix), VGroup(f1, f2).animate.set_stroke(opacity=0.4), run_time=0.3)
        l6 = self.lg("on enlève la parenthèse,", -3.4, -0.95, 38, maxw=6.2)
        e2 = D("3 + x + 1", 60).sans_audit().move_to(P(3.3, -0.95))
        self.dit(l6, "on enlève la parenthèse,")
        self.play(TransformFromCopy(VGroup(*[a for i, a in enumerate(e.atomes) if i not in (2, 6)]), e2),
                  run_time=0.5)
        r = self.lg("et on trouve x + 4.", -0.6, -2.2, 50, VERT_OK, lettres="", maxw=9)
        r.atomes[3].shift(RIGHT * 0.25); r.atomes[4].shift(RIGHT * 0.25); r.atomes[5].shift(RIGHT * 0.25); r.atomes[6].shift(RIGHT * 0.25)
        self.dit(r, "et on trouve x plus 4.")
        cr = self.cadre_ok(VGroup(*r.atomes[3:6]), 0.14)
        self.play(Create(cr), run_time=0.2)
        self.insister(VGroup(*r.atomes[3:6]), 1.15, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 06 : déjà développée ────────────────────────────────────────────────
    def ecran_developpee(self):
        self.ecran("06-developpee")
        tit = self.lg("Et une expression déjà développée ?", 0, 3.1, 46, JAUNE_TITRE, maxw=12)
        self.dit(tit, "Et une expression déjà développée ?")
        l1 = self.lg("C'est une somme, sans parenthèse à distribuer.", 0, 2.2, 40, maxw=12)
        self.dit(l1, "C'est une somme, sans parenthèse à distribuer.")
        self.insister(VGroup(*l1.atomes[4:6]), 1.2, 0.18)
        f1 = feuille(4.0, 1.7).move_to(P(-3.2, 0.2))
        f2 = feuille(4.0, 1.7).move_to(P(3.0, 0.2))
        co = self.lg("Comme", -6.0 + 0.9, 1.35, 34, CIEL, maxw=2.2)
        self.dit(co, "Comme", avec=[FadeIn(f1, shift=UP * 0.15)])
        e1 = D("4x + 8", 64).move_to(f1.r.get_center() + DOWN * 0.08)
        self.dire_eq(e1, "4 x plus 8,", echelle=1.2)
        ou = self.lg("ou", -0.1, 0.2, 38, CIEL, maxw=1)
        self.dit(ou, "ou x au", avec=[FadeIn(f2, shift=UP * 0.15)])
        e2 = D("x² + 3x", 64).move_to(f2.r.get_center() + DOWN * 0.08)
        self.dire_eq(e2, "x au carré plus 3 x.", echelle=1.2)
        r1 = self.rond(e1.atomes[2], VERT_OK)
        r2 = self.rond(e2.atomes[2], VERT_OK)
        s1 = T("une somme", 36, VERT_OK, audit=False).move_to(P(-3.2, -1.25))
        s2 = T("une somme", 36, VERT_OK, audit=False).move_to(P(3.0, -1.25))
        k1 = self.coche(VERT_OK, 0.24).move_to(f1.r.get_corner(UR) + P(-0.36, -0.36))
        k2 = self.coche(VERT_OK, 0.24).move_to(f2.r.get_corner(UR) + P(-0.36, -0.36))
        self.play(Create(r1), Create(r2), FadeIn(s1, shift=UP * 0.1), FadeIn(s2, shift=UP * 0.1), Create(k1), Create(k2),
                  run_time=0.4)
        self.attendre_voix(marge=0.8)

    # ── 06q : QUESTION 2 (réponse A) ────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        self.XL = 0.6
        pl = plateau(1.5).move_to(P(-3.5, 0.9))
        fe = feuille(3.4, 1.4).move_to(P(-3.5, -1.0))
        ex = D("4x + 8", 50, audit=False).move_to(fe.r.get_center() + DOWN * 0.08)
        k = self.coche(VERT_OK, 0.22).move_to(fe.r.get_corner(UR) + P(-0.34, -0.34))

        def avant(sc):
            sc.eq_dans_q(0, "Laquelle est déjà développée ?", "Laquelle est déjà développée ?", lettres="", fs=36)
            sc.play(FadeIn(pl, shift=UP * 0.2), FadeIn(fe), FadeIn(ex), Create(k), run_time=0.3)

        def apres(sc):
            sc.ph_eq(0, "Réponse A : 7x − 2.", "Réponse A : 7 x moins 2.", lettres="x", premier=True)
            sc.ph_eq(1, "C'est une somme :", "C'est une somme :")
            sc.ph_eq(2, "plus rien à distribuer.", "plus rien à distribuer.")
            sc.rep_fini()

        self.question_pause("06q-question", "06r-reponse", ["Laquelle est déjà développée ?"],
                            [Eq("7x − 2", 34), Eq("7(x − 2)", 34), Eq("x(x + 1)", 34)], 0,
                            ["Réponse A : 7x − 2.", "C'est une somme :", "plus rien à distribuer."],
                            avant_q=avant, autres_r=apres)
        self.XL = type(self).XL

    # ── 07 : le défi ────────────────────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("07-defi")
        tit = T("À toi de jouer !", 56, JAUNE_TITRE).move_to(P(0, 3.0))
        self.au("À toi", Write(tit), rt=0.5)
        f1 = feuille(3.8, 2.1).move_to(P(-3.3, 1.05))
        f2 = feuille(3.8, 2.1).move_to(P(3.3, 1.05))
        e1 = D("6(x + 1)", 64).move_to(f1.r.get_center() + DOWN * 0.5)
        self.dire_eq(e1, "6 fois, entre parenthèses, x plus 1,", echelle=1.2, avec=[FadeIn(f1, shift=UP * 0.15)])
        self.play(e1.atomes[0].animate.set_color(FACTEUR), run_time=0.12)
        e2 = D("6x + 1", 64).move_to(f2.r.get_center() + DOWN * 0.5)
        et = self.lg("et", 0, 1.15, 38, CIEL, maxw=1)
        self.dit(et, "1, et 6", avec=[FadeIn(f2, shift=UP * 0.15)])
        self.dire_eq(e2, "6 x plus 1.", echelle=1.2)
        q1 = self.lg("Laquelle est un produit ?", 0, -0.55, 44, CIEL, maxw=10)
        self.dit(q1, "Laquelle est un produit ?")
        q2 = self.lg("Sont-elles égales ?", 0, -1.3, 44, maxw=10)
        eg = T("= ?", 60, JAUNE_TITRE, audit=False).move_to(P(0, 1.15))
        self.dit(q2, "Sont-elles égales ?", avec=[FadeOut(et), FadeIn(eg, scale=1.3)])
        pz = T("Mets pause, et cherche !", 50, ORANGE_RETENUE).move_to(P(-0.4, -2.4))
        self.au("Mets pause", Write(pz), rt=0.5)
        self.defi = dict(tit=tit, f1=f1, f2=f2, e1=e1, e2=e2, q=VGroup(q1, q2, eg), pz=pz)
        self.attendre_voix(marge=2.0)

    # ── 07b : la correction ─────────────────────────────────────────────────
    def ecran_correction(self):
        d = self.defi
        self.dire("07b-correction")
        tit = T("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.0))
        self.au("Correction", ReplacementTransform(d["tit"], tit), FadeOut(d["pz"]), FadeOut(d["q"]), rt=0.4)
        e1 = d["e1"]
        lp = self.lg("Le produit", -3.3, -0.3, 40, CIEL, maxw=4)
        self.dit(lp, "Le produit,", avec=[d["f1"].r.animate.set_stroke(CIEL, width=5)])
        self.au("c'est 6", Circumscribe(VGroup(d["f1"], e1), color=CIEL), rt=0.5)
        fl = VGroup(self.fleche_arc(e1.atomes[0], e1.atomes[2], angle=-1.6),
                    self.fleche_arc(e1.atomes[0], e1.atomes[4], angle=-1.15))
        dv = self.lg("Développé, il donne", -3.6, -1.15, 38, maxw=5.6)
        self.dit(dv, "Développé, il donne", avec=[Create(fl)])
        r = D("6x + 6 ≠ 6x + 1", 56).move_to(P(2.75, -1.15))
        for a in r.atomes[:4]:
            if a.original_text != "x":
                a.set_color(VERT_OK)
        ne = r.atomes[4]
        ne.set_color(PIEGE)
        self.dire_eq(r, "6 x plus 6, pas 6 x plus 1.", echelle=1.15)
        self.insister(ne, 1.5, 0.18)
        v = self.lg("Elles ne sont pas égales.", -0.4, -2.35, 50, PIEGE, maxw=10)
        self.dit(v, "Elles ne sont pas égales.")
        self.insister(v, 1.08, 0.2)
        self.attendre_voix(marge=1.2)

    # ── 08 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("08-finale", 0.5)
        e1 = D("4(x + 2)", 54, audit=False)
        e1.atomes[0].set_color(FACTEUR)
        p = T("un produit", 30, CIEL, audit=False).next_to(e1, DOWN, buff=0.18)
        e2 = D("4x + 8", 54, audit=False).next_to(p, DOWN, buff=0.55)
        s = T("une somme", 30, VERT_OK, audit=False).next_to(e2, DOWN, buff=0.26)
        fig = VGroup(e1, p, e2, s)
        self.XL = -2.0  # la figure est étroite : les lignes gardent leur taille
        lignes = self.finale_colonne([["Un produit finit", "par une multiplication,"],
                                      ["une somme", "par une addition."],
                                      ["Un nombre devant une parenthèse :", "il faut développer."]],
                                     fs=36, figure=fig)
        self.play(FadeIn(fig), run_time=0.3)
        for lg in lignes:
            self.montrer_ligne(lg)
        self.attendre_voix(marge=1.2)
        self.XL = type(self).XL

    def construct(self):
        self.page_de_garde()
        self.ecran_cantine()
        self.ecran_deux()
        self.ecran_derniere()
        self.ecran_regle()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_developpee()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("09-abonne")
