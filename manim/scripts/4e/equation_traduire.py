# equation_traduire.py
# EleveAI — Maths 4e — série « Équations », épisode 02 : TRADUIRE PAR UNE ÉQUATION.
# Paysage 16:9, AVEC VOIX, ceinture JAUNE. Micro : equation_traduire.
# Décor et métier : CINÉMA (Camille, monteuse, la timeline de montage). Centres :
# cinema-series.
# Écrans : garde (00) ; la timeline, x + 3 = 11 (01) ; le dictionnaire, chaque mot
# s'envole vers son symbole (02) ; l'exemple découpé (03) ; QUESTION 1 (03q) ; l'ordre,
# en barres (04) ; le piège 2x − 4 contre 2(x − 4), en barres (05) ; QUESTION 2 (05q) ;
# défi (06) et correction sur la même timeline (06b) ; ce que tu as appris (07) ; fin (08).
# Voix : manim/voix/4e-equation-traduire.json (validée, débit −6) ; marques :
# equation_traduire_marques.json.
# Code couleur : bleu = x ; jaune = le signe égal ; violet = un bloc connu de la
# timeline ; orange = ce qu'on retire ; vert = juste ; rouge = piège.
#
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/equation_traduire.py EquationTraduire4e
# Rendu : python -m manim render -qh --disable_caching manim/scripts/4e/equation_traduire.py EquationTraduire4e -o eleveai-maths-4e-equation-traduire --media_dir manim/scripts/4e/media-eq-02
# Sortie : manim/sorties/4e/maths/equations/02-traduire/eleveai-maths-4e-equation-traduire.mp4

import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI))  # le dossier du script EN TÊTE

from equation_commun import *  # noqa: E402,F403

VIOLET = "#a78bfa"
FOND_X, FOND_V, FOND_O = "#1e3a8a", "#3b2a78", "#7c2d12"
GRIS_P = "#334155"
GRIS_V = "#cbd5e1"


def bloc(w, s=None, h=0.82, fond=FOND_X, trait=None, c=None, fs=36, audit=True):
    """Un bloc de la timeline ou d'une barre : .boite et .txt (s'il a un texte)."""
    trait = trait or (INCONNUE if fond == FOND_X else VIOLET if fond == FOND_V else OPERATION)
    g = VGroup()
    g.boite = Rectangle(width=w, height=h, fill_color=fond, fill_opacity=1, stroke_color=trait, stroke_width=3)
    g.add(g.boite)
    g.txt = None
    if s:
        g.txt = T(s, fs, c or (CIEL if fond == FOND_X else WHITE), audit).move_to(g.boite)
        g.add(g.txt)
    return g


def rangee(*blocs, x0=0.0, y=0.0):
    """Les blocs bout à bout, le premier commence en x0."""
    g = VGroup(*blocs).arrange(RIGHT, buff=0)
    g.move_to(P(0, y)).align_to(P(x0, 0), LEFT)
    return g


class Piste(VGroup):
    """La timeline de montage : le fond de piste et une graduation par minute."""

    def __init__(self, x0, u, n, y, h=0.82, **kw):
        super().__init__(**kw)
        self.x0, self.u, self.n, self.y, self.h = x0, u, n, y, h
        self.fond = Rectangle(width=u * n + 0.16, height=h + 0.16, fill_color="#0b1220", fill_opacity=1,
                              stroke_color="#475569", stroke_width=2).move_to(P(x0 + u * n / 2, y))
        self.traits = VGroup(*[Line(P(x0 + u * k, y - h / 2 - 0.08), P(x0 + u * k, y - h / 2 - 0.2),
                                    color="#64748b", stroke_width=2) for k in range(n + 1)])
        self.add(self.fond, self.traits)

    def total(self, s, couleur=WHITE, fs=34, audit=True):
        """La flèche double au-dessus de la piste et son texte : (flèche, texte)."""
        yf = self.y + self.h / 2 + 0.34
        f = DoubleArrow(P(self.x0, yf), P(self.x0 + self.u * self.n, yf), color=couleur, stroke_width=4, buff=0,
                        tip_length=0.2)
        t = T(s, fs, couleur, audit, gras=True)
        fond = BackgroundRectangle(t, color=BLACK, fill_opacity=1, buff=0.08)
        lab = VGroup(fond, t).move_to(f)
        return f, lab


class Clap(VGroup):
    """Le clap de cinéma, dessiné."""

    def __init__(self, w=2.0, **kw):
        super().__init__(**kw)
        h = w * 0.62
        self.corps = RoundedRectangle(width=w, height=h, corner_radius=0.05 * w, fill_color="#1f2937", fill_opacity=1,
                                      stroke_color=WHITE, stroke_width=3)
        lignes = VGroup(*[Line(P(-w * 0.4, y * h), P(w * 0.4, y * h), color="#94a3b8", stroke_width=2)
                          for y in (0.12, -0.12, -0.32)])
        haut = Rectangle(width=w, height=h * 0.26, fill_color=WHITE, fill_opacity=1, stroke_color=WHITE, stroke_width=2)
        haut.next_to(self.corps, UP, buff=0.03)
        for k in range(4):
            haut_b = Polygon(P(-w / 2 + k * w / 4 + 0.03, 0), P(-w / 2 + k * w / 4 + w / 8 + 0.03, 0),
                             P(-w / 2 + k * w / 4 + w / 4, h * 0.26), P(-w / 2 + k * w / 4 + w / 8, h * 0.26),
                             fill_color="#111827", fill_opacity=1, stroke_width=0)
            haut_b.shift(haut.get_corner(DL) - P(-w / 2, 0))
            haut = VGroup(haut, haut_b) if k == 0 else VGroup(*haut.submobjects, haut_b)
        self.barre = haut
        self.add(self.corps, lignes, self.barre)


class Livre(VGroup):
    """Le dictionnaire ouvert, dessiné."""

    def __init__(self, w=1.5, **kw):
        super().__init__(**kw)
        h = w * 0.62
        g = Polygon(P(0, -h / 2), P(-w / 2, -h / 2 + 0.1), P(-w / 2, h / 2), P(0, h / 2 - 0.1), fill_color="#fef3c7",
                    fill_opacity=1, stroke_color="#92400e", stroke_width=3)
        d = g.copy().flip(UP, about_point=ORIGIN)
        traits = VGroup()
        for s in (-1, 1):
            for k in range(3):
                traits.add(Line(P(s * w * 0.1, h * (0.18 - 0.2 * k)), P(s * w * 0.42, h * (0.24 - 0.2 * k)),
                                color="#b45309", stroke_width=2))
        self.add(g, d, traits)


class EquationTraduire4e(PaysageEq):
    nom_voix = "4e-equation-traduire"
    fichier_marques = "equation_traduire_marques.json"
    identite = "Maths 4e — EleveAI"
    ceinture = "jaune"

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Traduire par une équation", self.identite, self.ceinture, y_ech=-2.65)
        for m in (titre, ident):
            m.sans_synchro = True
        ident._pas_audit = True
        self.au("Traduire", Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), rt=0.7)
        c = Clap(2.2).move_to(P(-5.0, 0.3))
        q = VGroup(T("Comment passer d'une phrase", 42), T("à une équation ?", 42, BLEU_CALCUL))
        q.arrange(DOWN, buff=0.18).move_to(P(1.3, 0.35))
        self.au("Comment", FadeIn(q[0], shift=RIGHT * 0.2), FadeIn(c, scale=0.7), rt=0.4)
        self.au("à une", FadeIn(q[1], shift=RIGHT * 0.2), rt=0.35)
        self.attendre_voix(marge=0.6)

    # ── 01 : la timeline de Camille ─────────────────────────────────────────
    def ecran_monteuse(self):
        self.ecran("01-monteuse")
        m = Metier(["Camille", "monteuse de cinéma"], fs=32, peau="#e0ac69", tenue="#db2777", longs=True, s=0.75)
        m.perso.move_to(P(-5.6, 2.55))
        m.nom.arrange(DOWN, aligned_edge=LEFT, buff=0.1).next_to(m.perso, RIGHT, buff=0.3)
        c = Clap(1.35).move_to(P(3.6, 2.6))
        self.au("Camille", FadeIn(m.perso, shift=UP * 0.3), FadeIn(m.nom[0], shift=UP * 0.1), rt=0.4)
        self.au("monteuse", FadeIn(m.nom[1], shift=UP * 0.1), FadeIn(c, scale=0.7), rt=0.35)
        # la timeline : 1 minute = 0,95
        p = Piste(-5.6, 0.95, 11, 0.55)
        film = bloc(p.u * 8, "court métrage", fs=32).move_to(P(p.x0 + p.u * 4, p.y))
        gen = bloc(p.u * 3, "3 min", fond=FOND_V, fs=32).move_to(P(p.x0 + p.u * 9.5, p.y))
        gen_mot = T("générique", 22, "#ddd6fe").move_to(P(gen.get_x(), p.y - 0.2))
        gen.txt.scale(0.85).move_to(P(gen.get_x(), p.y + 0.19))
        tete = Line(P(p.x0, p.y + 0.55), P(p.x0, p.y - 0.55), color=PIEGE, stroke_width=4)
        self.au("assemble", FadeIn(p), FadeIn(tete), rt=0.3)
        self.au("court métrage", GrowFromEdge(film, LEFT), tete.animate.move_to(P(p.x0 + p.u * 8, p.y)), rt=0.9)
        self.au("3 minutes", FadeIn(gen, shift=LEFT * 0.9), rt=0.35)
        self.au("générique", FadeIn(gen_mot, shift=UP * 0.1), rt=0.3)
        fl, lab = p.total("11 min")
        self.au("11 minutes", GrowFromCenter(fl), FadeIn(lab, scale=1.3), tete.animate.move_to(P(p.x0 + p.u * 11, p.y)), rt=0.45)
        q = T("Combien dure le film sans le générique ?", 38, JAUNE_TITRE).move_to(P(-0.6, -0.5))
        self.au("Combien", FadeIn(q, shift=UP * 0.15), FadeOut(tete), rt=0.4)
        x = T("x", 62, INCONNUE, gras=True).move_to(film)
        self.au("x. Un", ReplacementTransform(film.txt, x), film.boite.animate.set_fill("#1d4ed8", 1), rt=0.35)
        self.insister(x, 1.4, 0.18)
        ph = Eq("Un nombre x augmenté de 3 vaut 11.", 40, lettres="x").move_to(P(-0.6, -1.3))
        self.dire_eq(ph, "Un nombre x augmenté de 3 vaut 11.", echelle=1.0, rt=0.16)
        e = Eq("x + 3 = 11", 78).move_to(P(-0.6, -2.5))
        e.atomes[2].set_color(VIOLET)
        e.egal.set_color(EGAL)
        self.dire_eq(e, "x plus 3 égale 11.")
        cad = self.encadrer(e, buff=0.16)
        self.play(Create(cad), run_time=0.25)
        self.attendre_voix(marge=0.6)

    # ── 02 : le dictionnaire : chaque mot s'envole vers son symbole ─────────
    def envol(self, mots, sym_pos, extrait, n=1):
        """La copie des mots vole vers son symbole et arrive quand la voix le dit,
        la flèche pousse en même temps."""
        d = self.t_mot(extrait, n)
        y = mots.get_y()
        fl = Arrow(P(0.15, y), P(1.45, y), color=OPERATION, stroke_width=6, buff=0, tip_length=0.2)
        c = mots.copy().set_color(OPERATION)
        for f in c.get_family():
            f._pas_audit = True
        self.play(c.animate.move_to(sym_pos).scale(0.5).set_opacity(0), GrowArrow(fl), run_time=max(0.12, d - 0.02))
        self.remove(c)

    def ecran_dictionnaire(self):
        self.ecran("02-dictionnaire")
        tit = Eq("Les mots se traduisent un par un.", 42, JAUNE_TITRE, lettres="").move_to(P(-0.9, 3.12))
        self.dire_eq(tit, "Les mots se traduisent un par un.", echelle=1.0, rt=0.16)
        lv = Livre(1.5).move_to(P(5.55, 1.0))
        self.play(FadeIn(lv, scale=0.7), run_time=0.3)
        XM, XS = -2.9, 2.75
        rangs = [("Augmenté de", "Augmenté de :", "+", "plus."),
                 ("Diminué de", "Diminué de :", "−", "moins."),
                 ("Le double de x", "Le double de x :", "2x", "2 x."),
                 ("Le triple de x", "Le triple de x :", "3x", "3 x."),
                 ("Vaut, ou est égal à", "Vaut, ou est égal à :", "=", "signe égal.")]
        for k, (mots, ph, sym, ph_s) in enumerate(rangs):
            y = 2.1 - k * 1.05
            carte = RoundedRectangle(width=5.9, height=0.86, corner_radius=0.1, stroke_color="#64748b", stroke_width=2,
                                     fill_color="#0b1220", fill_opacity=1).move_to(P(XM, y))
            carte2 = RoundedRectangle(width=2.4, height=0.86, corner_radius=0.1, stroke_color="#64748b", stroke_width=2,
                                      fill_color="#0b1220", fill_opacity=1).move_to(P(XS, y))
            e = Eq(mots, 40, lettres="x").move_to(carte)
            self.play(FadeIn(carte, shift=RIGHT * 0.2), FadeIn(carte2, shift=LEFT * 0.2), run_time=0.14)
            self.dire_eq(e, ph, echelle=1.0, rt=0.18)
            self.envol(e, P(XS, y), ph_s)
            s = Eq(sym, 58).move_to(carte2)
            if sym == "=":
                s.set_color(EGAL)
                self.au("signe égal.", FadeIn(s, scale=1.5), rt=0.3)
            else:
                self.dire_eq(s, ph_s)
            self.insister(s, 1.25, 0.12)
        self.attendre_voix(marge=0.6)

    # ── 03 : l'exemple découpé, morceau par morceau ─────────────────────────
    def ecran_exemple(self):
        self.ecran("03-exemple")
        ph = Eq("Le double de x est égal à 14.", 54, lettres="x").move_to(P(-0.5, 2.85))
        self.dire_eq(ph, "Le double de x est égal à 14.", echelle=1.0, rt=0.18)
        a = ph.atomes
        m1, m2, m3 = VGroup(*a[:4]), VGroup(*a[4:7]), a[7]

        def morceau(m, c):
            b = m.get_bottom()[1] - 0.14
            s = Line(P(m.get_left()[0], b), P(m.get_right()[0], b), color=c, stroke_width=6)
            f = Arrow(P(m.get_x(), b - 0.05), P(m.get_x(), 1.0), color=c, stroke_width=5, buff=0, tip_length=0.2)
            return s, f

        s1, f1 = morceau(m1, INCONNUE)
        s2, f2 = morceau(m2, EGAL)
        s3, f3 = morceau(m3, WHITE)
        self.au("Le double de x :", Create(s1), GrowArrow(f1), rt=0.35)
        y = 0.42
        d = Eq("2x", 72).move_to(P(m1.get_x(), y))
        self.dire_eq(d, "2 x.")
        self.au("Est égal", Create(s2), GrowArrow(f2), rt=0.35)
        eg = T("=", 72, EGAL).move_to(P(m2.get_x(), y))
        self.au("signe égal.", FadeIn(eg, scale=1.5), rt=0.3)
        self.au("14 : 14", Create(s3), GrowArrow(f3), rt=0.3)
        q = Eq("14", 72).move_to(P(m3.get_x(), y))
        self.dire_eq(q, "14.", n=2)
        ec = T("On écrit :", 40, CIEL).move_to(P(-4.3, -1.6))
        self.au("On écrit", FadeIn(ec, shift=RIGHT * 0.2), rt=0.3)
        e = Eq("2x = 14", 92).move_to(P(0.3, -1.6))
        e.egal.set_color(EGAL)
        self.dire_eq(e, "2 x égale 14.")
        cad = self.encadrer(e, buff=0.18)
        self.play(Create(cad), run_time=0.25)
        self.insister(VGroup(e, cad), 1.1, 0.2)
        self.attendre_voix(marge=0.6)

    # ── 03q : QUESTION 1 ─────────────────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        c = Clap(2.6).move_to(P(-3.0, 0.2))
        self.add(c)
        e = Eq("3x = 21", 76).move_to(P(-3.0, 2.4))
        e.egal.set_color(EGAL)
        l0 = T("Le triple de x, c'est", 34, VERT_OK).move_to(P(-3.0, 1.34))
        trois = rangee(*[bloc(1.55, "x") for _ in range(3)], x0=-5.3, y=0.5)
        t1 = T("3 fois x,", 34, VERT_OK).next_to(trois, DOWN, buff=0.14)
        x_b, tr_b = bloc(1.55, "x"), bloc(0.75, "3", fond=FOND_V)
        faux = rangee(x_b, tr_b, x0=-4.15, y=-1.2)
        t2 = T("pas x plus 3.", 34, PIEGE).next_to(faux, DOWN, buff=0.14)
        for f in tr_b.get_family():
            f._pas_audit = True

        def avant(sc):
            sc.eq_dans_q(0, "Le triple de x vaut 21.", "Le triple de x vaut 21.", lettres="x", fs=36)

        def apres(sc):
            sc.rep(0)
            sc.dire_eq(e, "3 x égale 21.", avec=[FadeOut(c)])
            sc.au("Le triple", FadeIn(l0, shift=UP * 0.1), FadeIn(trois, shift=UP * 0.2), rt=0.3)
            sc.au("3 fois x,", FadeIn(t1, shift=UP * 0.1), rt=0.25)
            sc.au("pas x plus", FadeIn(x_b, shift=UP * 0.2), rt=0.25)
            sc.au("3.", FadeIn(tr_b, shift=LEFT * 0.3), FadeIn(t2, shift=UP * 0.1), rt=0.25)
            sc.play(Create(sc.barrer(faux)), run_time=0.25)
            sc.rep_fin()

        self.question_pause("03q-question", "03r-reponse", ["Le triple de x vaut 21.", "Quelle équation ?"],
                            [Eq("x + 3 = 21", 34), Eq("3x = 21", 34), Eq("x = 3 × 21", 34)], 1,
                            ["Réponse B."],
                            avant_q=avant, autres_r=apres)

    # ── 04 : attention à l'ordre, en barres (x vaut 7 : la barre restante vaut bien 10) ──
    def ecran_ordre(self):
        self.ecran("04-ordre")
        tit = T("Attention à l'ordre.", 42, OPERATION).move_to(P(-0.4, 3.2))
        self.au("Attention", FadeIn(tit, scale=1.2), rt=0.3)
        ph = Eq("Le double de x diminué de 4 vaut 10.", 42, lettres="x").move_to(P(-0.4, 2.5))
        self.dire_eq(ph, "Le double de x diminué de 4 vaut 10.", echelle=1.0, rt=0.16)
        U, XB = 0.38, -0.4
        Y1, Y2 = 1.05, -0.65
        l1 = Eq("On prend d'abord le double :", 27, lettres="").move_to(P(-3.55, Y1 + 0.42))
        self.dire_eq(l1, "On prend d'abord le double :", echelle=1.0, rt=0.14)
        b1, b2 = bloc(7 * U, "x"), bloc(7 * U, "x")
        r1 = rangee(b1, b2, x0=XB, y=Y1)
        self.play(GrowFromEdge(b1, LEFT), run_time=0.2)
        self.play(GrowFromEdge(b2, LEFT), run_time=0.2)
        d = Eq("2x", 60).move_to(P(-3.55, Y1 - 0.3))
        self.dire_eq(d, "2 x.")
        # la 2e ligne : le double redescend, on en retire 4
        r2 = r1.copy().move_to(P(r1.get_x(), Y2))
        r2[1][1].shift(LEFT * 0.76)  # le x ne passe pas sous le 4
        l2 = Eq("Puis on retire 4 :", 27, lettres="").move_to(P(-3.55, Y2 + 0.42))
        self.play(TransformFromCopy(r1, r2), run_time=0.35)
        self.dire_eq(l2, "Puis on retire 4 :", echelle=1.0, rt=0.14)
        k = bloc(4 * U, "4", fond=FOND_O, trait=OPERATION, c=WHITE, audit=False)
        k.move_to(P(r2.get_right()[0] - 2 * U, Y2))
        self.play(FadeIn(k), run_time=0.2)
        self.insister(k, 1.15, 0.15)
        e2 = Eq("2x − 4", 60).move_to(P(-3.55, Y2 - 0.3))
        self.dire_eq(e2, "2 x moins 4.")
        ec = T("On écrit :", 38, CIEL).move_to(P(-5.2, -2.6))
        self.au("On écrit", FadeIn(ec, shift=RIGHT * 0.2), rt=0.3)
        e = Eq("2x − 4 = 10", 78).move_to(P(0.0, -2.6))
        e.egal.set_color(EGAL)
        self.dire_eq(e, "2 x moins 4 égale 10.")
        yf = Y2 - 0.58  # la flèche s'arrête pile au bord du 4 : il reste 10
        fl = DoubleArrow(P(XB, yf), P(XB + 10 * U, yf), color=VERT_OK, stroke_width=4, buff=0, tip_length=0.18)
        dix = T("10", 32, VERT_OK).next_to(fl, DOWN, buff=0.07)
        self.play(GrowFromCenter(fl), FadeIn(dix, scale=1.3), run_time=0.2)
        self.attendre_voix(marge=0.6)

    # ── 05 : le piège : 2x − 4 contre 2(x − 4), en barres ───────────────────
    def ecran_piege(self):
        self.ecran("05-piege")
        tit = T("Le piège :", 44, PIEGE, gras=True).move_to(P(-4.5, 3.15))
        self.au("Le piège", FadeIn(tit, scale=1.3), rt=0.3)
        d = Eq("mettre des parenthèses au hasard.", 38, lettres="").next_to(tit, RIGHT, buff=0.3)
        self.dire_eq(d, "mettre des parenthèses au hasard.", echelle=1.0, rt=0.14)
        XG, XD, YB = -3.45, 3.25, -0.5
        sep = Line(P(-0.1, 2.5), P(-0.1, -1.0), color=GRIS_P, stroke_width=3)
        self.play(Create(sep), run_time=0.2)
        U, Xb = 0.3, 7 * 0.3
        # à gauche
        e1 = Eq("2x − 4", 72).move_to(P(XG, 2.05))
        self.dire_eq(e1, "2 x moins 4,")
        a1 = Eq("le double de x,", 32, lettres="x").move_to(P(XG, 1.2))
        a2 = Eq("puis moins 4", 32, OPERATION, lettres="").move_to(P(XG, 0.72))
        rg = rangee(bloc(Xb, "x", h=0.74), bloc(Xb, "x", h=0.74), x0=XG - Xb, y=YB)
        self.dire_eq(a1, "le double de x,", echelle=1.0, rt=0.14, avec=[FadeIn(rg, shift=UP * 0.15)])
        rg[1][1].shift(LEFT * 2 * U)  # le x ne passe pas sous le 4
        kg = bloc(4 * U, "4", h=0.74, fond=FOND_O, c=WHITE, audit=False).move_to(P(rg.get_right()[0] - 2 * U, YB))
        self.dire_eq(a2, "puis moins 4", echelle=1.0, rt=0.14)
        self.play(FadeIn(kg, scale=1.2), run_time=0.2)
        # à droite
        e2 = Eq("2(x − 4)", 72).move_to(P(XD, 2.05))
        par = [e2.atomes[1], e2.atomes[5]]
        self.dire_eq(e2, "2 fois x moins 4", sauf=par)
        self.au("parenthèses, c'est", FadeIn(par[0], scale=1.8), FadeIn(par[1], scale=1.8), rt=0.3)
        self.play(*[p.animate.set_color(PIEGE) for p in par], run_time=0.15)
        b1 = Eq("le double de la", 32, lettres="")
        b1b = T("différence", 32)  # « ff » est une ligature : une Eq ne peut pas compter ses lettres
        VGroup(b1, b1b).arrange(RIGHT, buff=0.14, aligned_edge=DOWN).move_to(P(XD, 1.2))
        b2 = Eq("entre x et 4", 32, OPERATION, lettres="x").move_to(P(XD, 0.72))
        rd = rangee(bloc(Xb, "x", h=0.74), bloc(Xb, "x", h=0.74), x0=XD - Xb, y=YB)
        kd = [bloc(4 * U, "4", h=0.74, fond=FOND_O, c=WHITE, audit=False)
              .move_to(P(rd[i].get_right()[0] - 2 * U, YB)) for i in (0, 1)]
        for i in (0, 1):
            rd[i].txt.shift(LEFT * 2 * U)
        self.dire_eq(b1, "le double de la", n=1, echelle=1.0, rt=0.14, avec=[FadeIn(rd, shift=UP * 0.15)])
        self.au("différence", FadeIn(b1b), rt=0.2)
        self.dire_eq(b2, "entre x et 4", echelle=1.0, rt=0.14)
        self.play(FadeIn(kd[0], scale=1.2), FadeIn(kd[1], scale=1.2), run_time=0.2)
        # la conclusion
        fin = Eq("Ce n'est pas la même phrase.", 46, VERT_OK, lettres="").move_to(P(-0.4, -2.2))
        self.dire_eq(fin, "Ce n'est pas la même phrase.", echelle=1.0, rt=0.13)
        rond = Circle(radius=0.42, fill_color=BLACK, fill_opacity=1, stroke_color=PIEGE, stroke_width=4).move_to(P(-0.1, YB))
        ne = T("≠", 60, PIEGE, audit=False, gras=True).move_to(rond)
        self.play(FadeIn(rond, scale=1.4), FadeIn(ne, scale=1.4), run_time=0.25)
        self.insister(VGroup(rond, ne), 1.25, 0.18)
        self.attendre_voix(marge=0.7)

    # ── 05q : QUESTION 2 ─────────────────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        c = Clap(2.6).move_to(P(-3.0, 0.2))
        self.add(c)
        d1, d2 = bloc(1.9, "x"), bloc(1.9, "x")
        rg = rangee(d1, d2, x0=-5.3, y=0.75)
        l1 = T("On prend le double,", 34, CIEL).next_to(rg, UP, buff=0.14)
        un = bloc(0.6, "1", fond=FOND_V, audit=False).move_to(P(rg.get_right()[0] + 0.3, -0.75))
        rg2 = rg.copy().move_to(P(rg.get_x(), -0.75))
        l2 = T("puis on ajoute 1.", 34, VIOLET).next_to(VGroup(rg2, un), DOWN, buff=0.14)

        def avant(sc):
            sc.eq_dans_q(0, "Le double de x", "Le double de x", lettres="x", fs=36)
            sc.eq_dans_q(0, "augmenté de 1 vaut 9.", "augmenté de 1 vaut 9.", lettres="", fs=36)

        def apres(sc):
            sc.rep(0)
            sc.au("On prend", FadeOut(c), FadeIn(rg, shift=UP * 0.2), FadeIn(l1, shift=UP * 0.1), rt=0.3)
            sc.au("puis on", TransformFromCopy(rg, rg2), rt=0.3)
            sc.au("1.", FadeIn(un, shift=LEFT * 0.4), FadeIn(l2, shift=UP * 0.1), rt=0.25)
            sc.insister(un, 1.25, 0.12)
            sc.rep_fin()

        self.question_pause("05q-question", "05r-reponse", ["Le double de x", "augmenté de 1 vaut 9.", "Quelle équation ?"],
                            [Eq("2x + 1 = 9", 34), Eq("2(x + 1) = 9", 34), Eq("2 + x + 1 = 9", 34)], 0,
                            ["Réponse A."],
                            avant_q=avant, autres_r=apres)

    # ── 06 : le défi, sur la timeline (x vaut 5, jamais dit ni écrit) ───────
    def ecran_defi(self):
        self.ecran("06-defi", 0.5)
        tit = T("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(-0.4, 3.15))
        self.au("À toi", Write(tit), rt=0.5)
        p = Piste(-5.75, 0.62, 17, 1.3)
        ba = [bloc(p.u * 5, fs=44).move_to(P(p.x0 + p.u * (2.5 + 5 * k), p.y)) for k in range(3)]
        pres = bloc(p.u * 2, "2 min", fond=FOND_V, fs=24).move_to(P(p.x0 + p.u * 16, p.y))
        l1 = Eq("Camille monte 3 bandes-annonces", 34, lettres="").move_to(P(-0.55, 0.15))
        l1b = Eq("de même durée,", 34, lettres="")
        l1c = Eq("x minutes chacune.", 34, lettres="x")
        VGroup(l1b, l1c).arrange(RIGHT, buff=0.2).move_to(P(-0.55, -0.4))
        self.au("Camille", FadeIn(p), rt=0.25)
        self.dire_eq(l1, "Camille monte 3 bandes-annonces", echelle=1.0, rt=0.14)
        self.play(*[GrowFromEdge(b, LEFT) for b in ba], run_time=0.2)
        self.dire_eq(l1b, "de même durée,", echelle=1.0, rt=0.14)
        xs = [T("x", 44, CIEL, gras=True).move_to(b) for b in ba]
        self.dire_eq(l1c, "x minutes chacune.", echelle=1.0, rt=0.14, avec=[FadeIn(x, scale=1.5) for x in xs])
        l2 = Eq("Elle ajoute", 34, lettres="")
        l2b = Eq("2 minutes de présentation.", 34, lettres="")
        VGroup(l2, l2b).arrange(RIGHT, buff=0.2).move_to(P(-0.55, -0.95))
        self.dire_eq(l2, "Elle ajoute", echelle=1.0, rt=0.14)
        self.dire_eq(l2b, "2 minutes de présentation.", echelle=1.0, rt=0.14, avec=[FadeIn(pres, shift=LEFT * 0.5)])
        l3 = Eq("En tout,", 34, lettres="")
        l3b = Eq("17 minutes.", 34, lettres="")
        VGroup(l3, l3b).arrange(RIGHT, buff=0.2).move_to(P(-0.55, -1.5))
        self.dire_eq(l3, "En tout,", echelle=1.0, rt=0.14)
        fl, lab = p.total("17 min")
        self.dire_eq(l3b, "17 minutes.", echelle=1.0, rt=0.14, avec=[GrowFromCenter(fl), FadeIn(lab, scale=1.3)])
        ecr = T("Écris l'équation.", 46, JAUNE_TITRE).move_to(P(-0.55, -2.25))
        self.au("Écris", FadeIn(ecr, scale=1.15), rt=0.3)
        pz = T("Mets pause, et cherche !", 34, ORANGE_RETENUE).move_to(P(-0.55, -2.95))
        self.au("Mets pause", Write(pz), rt=0.7)
        self.defi = {"p": p, "ba": ba, "pres": pres, "fl": fl, "lab": lab, "tit": tit,
                     "textes": VGroup(l1, l1b, l1c, l2, l2b, l3, l3b, ecr, pz)}
        self.attendre_voix(marge=2.0)

    # ── 06b : la correction, sur la même timeline ───────────────────────────
    def ecran_correction(self):
        self.dire("06b-correction")
        d = self.defi
        p = d["p"]
        tit = T("Correction", 50, JAUNE_TITRE).move_to(P(-0.4, 3.15))
        self.au("Correction", FadeOut(d["textes"]), ReplacementTransform(d["tit"], tit), rt=0.4)
        yb = p.y - p.h / 2 - 0.32

        def crochet(x1, x2, c):
            return VGroup(Line(P(x1, yb), P(x2, yb), color=c, stroke_width=5),
                          Line(P(x1, yb), P(x1, yb + 0.12), color=c, stroke_width=5),
                          Line(P(x2, yb), P(x2, yb + 0.12), color=c, stroke_width=5))

        e = Eq("3x + 2 = 17", 84).move_to(P(-0.6, -0.55))
        e.egal.set_color(EGAL)
        a = e.atomes
        cr1 = crochet(p.x0, p.x0 + p.u * 15, INCONNUE)
        self.au("3 bandes-annonces", *[b.boite.animate.set_fill("#1d4ed8", 1) for b in d["ba"]], rt=0.3)
        self.dire_eq(e, "3 x.", sauf=a[2:], avec=[Create(cr1)])
        cr2 = crochet(p.x0 + p.u * 15, p.x0 + p.u * 17, VIOLET)
        self.au("Plus 2 minutes", Create(cr2), d["pres"].boite.animate.set_fill("#5b21b6", 1), rt=0.3)
        self.dire_eq(e, "3 x plus 2.", sauf=[a[0], a[1], a[4], a[5]])
        a[3].set_color(VIOLET)
        self.au("En tout", d["fl"].animate.set_color(VERT_OK), d["lab"][1].animate.set_color(VERT_OK), rt=0.3)
        self.dire_eq(e, "3 x plus 2 égale 17.", sauf=a[:4])
        cad = self.encadrer(e, buff=0.16)
        self.play(Create(cad), run_time=0.22)
        n1 = T("On ne demande pas encore de la résoudre.", 34, GRIS_V).move_to(P(-0.6, -1.65))
        self.au("On ne demande", FadeIn(n1, shift=UP * 0.12), rt=0.35)
        n2 = T("Écrire l'équation, c'est déjà la moitié du travail.", 34, VERT_OK).move_to(P(-0.6, -2.25))
        self.au("Écrire", FadeIn(n2, shift=UP * 0.12), rt=0.35)
        jauge = RoundedRectangle(width=4.0, height=0.3, corner_radius=0.08, stroke_color=VERT_OK, stroke_width=3).move_to(P(-0.6, -2.95))
        plein = Rectangle(width=2.0, height=0.26, fill_color=VERT_OK, fill_opacity=1, stroke_width=0)
        plein.move_to(jauge).align_to(jauge, LEFT)
        self.play(Create(jauge), run_time=0.15)
        self.au("moitié", GrowFromEdge(plein, LEFT), rt=0.45)
        self.attendre_voix(marge=0.6)

    # ── 07 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("07-finale", 0.5)
        h = 0.72
        r = rangee(bloc(3.2, "x", h=h, audit=False), bloc(1.2, "3", h=h, fond=FOND_V, audit=False))
        e = Eq("x + 3 = 11", 52).sans_audit()
        e.atomes[2].set_color(VIOLET)
        e.egal.set_color(EGAL)
        c = Clap(1.9)
        fig = VGroup(c, r, e).arrange(DOWN, buff=0.5)
        lignes = self.finale_colonne([["On nomme x ce qu'on cherche."],
                                      ["On traduit la phrase", "morceau par morceau."],
                                      ["Le double donne 2x,", "augmenté de donne plus,", "vaut donne le signe égal."]],
                                     fs=36, figure=fig)
        self.play(FadeIn(fig), run_time=0.3)
        for lg in lignes:
            self.montrer_ligne(lg)
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_monteuse()
        self.ecran_dictionnaire()
        self.ecran_exemple()
        self.ecran_question1()
        self.ecran_ordre()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("08-abonne")
