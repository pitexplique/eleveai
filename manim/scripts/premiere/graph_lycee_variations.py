# graph_lycee_variations.py
# EleveAI — Maths 1re et STMG (automatismes, épreuve anticipée SANS calculatrice)
# série « Graphiques », épisode 02 : LE TABLEAU DE VARIATIONS LU SUR UNE COURBE.
# Paysage, CEINTURE JAUNE, pas de short.
# Deux sous-classes : GraphLyceeVariationsPremiere (« Maths 1re — EleveAI ») et
# GraphLyceeVariationsStmg (« Maths STMG — EleveAI », garde seule, GARDE_SEULE=1,
# PAS rendue pour l'instant).
# ⭐ Méthode : on parcourt la courbe de gauche à droite ; première ligne : les bornes
# et les x où la courbe change de sens ; deuxième ligne : les flèches et les valeurs
# au bout. Les intervalles se lisent sur les x, les valeurs sur les y.
# ⭐ Le dessin : le PROFIL D'ALTITUDE d'un trail (x en km de 0 à 10, y en m),
# (0 ; 200) → (4 ; 800) → (7 ; 300) → (10 ; 500), courbe lisse monotone entre eux,
# à gauche toute la vidéo ; montée en VERT, descente en ORANGE ; le tableau à droite.
# ⭐ Fil rouge (erreurs) : question 1 (C) : B donne des altitudes ; piège 07 :
# « croissante de 200 à 800 » barré ; question 2 (B) : A lit la dernière colonne,
# C inverse les deux lignes.
# Décor et métiers : SPORT (trail) : entraîneur, géomètre, data analyst du sport.
# Écrans : 00 garde · 01 situation · 02 question du jour · 03 parcourir · 04 tableau ·
# 05 extremums · 06 QUESTION 1 (C) · 07 piège · 08 QUESTION 2 (B) · 09 défi ·
# 09b correction · 10 ce que tu as appris · 11 fin.
# Voix : manim/voix/lycee-graph-variations.json (validée par Frédéric le 24/11,
# débit −10) ; WAV : public/sons/lycee-graph-variations/ ; marques :
# graph_lycee_variations_marques.json (marques_dump.ps1 + convertisseur à seuil 0,5 s).
# Outils (non modifiés) : la base PropLyceeEvoAdditifBase (prop_lycee_evo_additif.py),
# fin_commune.ecran_fin.
#
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/premiere/graph_lycee_variations.py GraphLyceeVariationsPremiere
# Brouillon : python -m manim render -ql --disable_caching manim/scripts/premiere/graph_lycee_variations.py GraphLyceeVariationsPremiere -o eleveai-maths-premiere-graph-variations --media_dir manim/scripts/premiere/media-graph-lycee-variations
# Garde STMG seule : GARDE_SEULE=1 … GraphLyceeVariationsStmg -o garde-stmg-graph-variations

import os
import sys
from pathlib import Path
import importlib.util

_ICI = Path(__file__).resolve().parent


def _charger(nom, chemin):
    spec = importlib.util.spec_from_file_location(nom, chemin)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


_evo = _charger("prop_lycee_evo_additif", _ICI / "prop_lycee_evo_additif.py")
from prop_ratio_ecrire import *  # noqa: E402,F403  (prop_commun, couleurs, P…)

sys.path.insert(0, str(_ICI))  # le dossier du script EN TÊTE

from fin_commune import ecran_fin  # noqa: E402

Base = _evo.PropLyceeEvoAdditifBase
gras, sans = _evo.gras, _evo.sans

COURBE = "#60a5fa"      # le profil
MONTE = VERT_OK         # la montée (croissante)
DESC = ORANGE_RETENUE   # la descente (décroissante)
GRILLE = "#334155"
FAUX = "#ef4444"


def hermite(X, Y, M):
    """La courbe lisse et monotone par morceaux qui passe par (X[i] ; Y[i])."""
    def g(x):
        i = 0
        while i < len(X) - 2 and x > X[i + 1]:
            i += 1
        h = X[i + 1] - X[i]
        s = (x - X[i]) / h
        return ((2 * s ** 3 - 3 * s ** 2 + 1) * Y[i] + (s ** 3 - 2 * s ** 2 + s) * h * M[i]
                + (-2 * s ** 3 + 3 * s ** 2) * Y[i + 1] + (s ** 3 - s ** 2) * h * M[i + 1])
    return g


ALT = hermite([0, 4, 7, 10], [200, 800, 300, 500], [150, 0, 0, 200 / 3])
DEFI = hermite([0, 2, 5], [3, -2, 4], [-2.5, 0, 2])


def mn(v):
    return str(v).replace("-", "−")


# ── les petits dessins ─────────────────────────────────────────────────────
def coureuse(s=1.0, couleur="#f472b6"):
    """Une petite silhouette qui court (pieds en ORIGIN)."""
    sw = 6
    tete = Circle(radius=0.09, fill_color=couleur, fill_opacity=1, stroke_width=0).move_to(P(0.04, 0.62))
    corps = Line(P(0.02, 0.52), P(-0.03, 0.28), color=couleur, stroke_width=sw)
    bras = VGroup(Line(P(0.01, 0.46), P(0.16, 0.36), color=couleur, stroke_width=sw),
                  Line(P(0.01, 0.46), P(-0.14, 0.38), color=couleur, stroke_width=sw))
    jambes = VGroup(Line(P(-0.03, 0.28), P(0.12, 0.12), color=couleur, stroke_width=sw),
                    Line(P(0.12, 0.12), P(0.1, 0.0), color=couleur, stroke_width=sw),
                    Line(P(-0.03, 0.28), P(-0.15, 0.1), color=couleur, stroke_width=sw),
                    Line(P(-0.15, 0.1), P(-0.24, 0.07), color=couleur, stroke_width=sw))
    return VGroup(tete, corps, bras, jambes).scale(s, about_point=ORIGIN)


def montre_gps(s=1.0):
    bracelet = RoundedRectangle(width=0.36, height=1.1, corner_radius=0.12, fill_color="#334155", fill_opacity=1,
                                stroke_width=0)
    cadran = Circle(radius=0.34, fill_color="#0f172a", fill_opacity=1, stroke_color=GREY_A, stroke_width=4)
    pic = VMobject(color=VERT_OK, stroke_width=4).set_points_as_corners(
        [P(-0.22, -0.1), P(-0.08, 0.1), P(0.04, -0.04), P(0.2, 0.12)])
    return VGroup(bracelet, cadran, pic).scale(s)


def chrono(s=1.0):
    c = Circle(radius=0.32, stroke_color=WHITE, stroke_width=5)
    b = Rectangle(width=0.12, height=0.1, fill_color=WHITE, fill_opacity=1, stroke_width=0).next_to(c, UP, buff=0.02)
    a = Line(ORIGIN, P(0.14, 0.16), color=AMBRE, stroke_width=5)
    return VGroup(c, b, a).scale(s)


def trepied(s=1.0):
    t = Rectangle(width=0.4, height=0.18, fill_color=AMBRE, fill_opacity=1, stroke_width=0).move_to(P(0, 0.3))
    pieds = VGroup(*[Line(P(0, 0.2), P(dx, -0.35), color=GREY_A, stroke_width=5) for dx in (-0.3, 0, 0.3)])
    return VGroup(pieds, t).scale(s)


def barres(s=1.0):
    return VGroup(*[Rectangle(width=0.16, height=h, fill_color=c, fill_opacity=1, stroke_width=0)
                    .move_to(P(-0.27 + 0.27 * i, -0.3 + h / 2)) for i, (h, c) in
                    enumerate(((0.3, COURBE), (0.6, VERT_OK), (0.45, AMBRE)))]).scale(s)


class Repere(VGroup):
    """Quadrillage + axes (nombres des axes : lus, jamais dits)."""

    def __init__(self, xr, yr, xl, yl, centre, xs, ys, pas_y=1, fs=18, nom_x="x", nom_y="y", **kw):
        super().__init__(**kw)
        ax = Axes(x_range=[xr[0], xr[1], 1], y_range=[yr[0], yr[1], pas_y], x_length=xl, y_length=yl, tips=True,
                  axis_config={"stroke_width": 2.5, "color": GREY_A, "tip_width": 0.16, "tip_height": 0.16,
                               "include_ticks": False})
        ax.shift(centre - ax.get_center())
        self.ax = ax
        y0 = max(yr[0], 0) if yr[0] >= 0 else yr[0]
        grille = VGroup(*[Line(ax.c2p(x, yr[0]), ax.c2p(x, yr[1] - 0.2 * pas_y), stroke_width=1.2, color=GRILLE)
                          for x in xs if x != 0],
                        *[Line(ax.c2p(xr[0], y), ax.c2p(xr[1] - 0.2, y), stroke_width=1.2, color=GRILLE)
                          for y in ys if y != 0])
        labs = VGroup()
        for x in xs:
            if x != 0:
                labs.add(Text(mn(x), font_size=fs, color=GREY_B).next_to(ax.c2p(x, 0), DOWN, buff=0.08))
        for y in ys:
            if y != 0:
                labs.add(Text(mn(y), font_size=fs, color=GREY_B).next_to(ax.c2p(0, y), LEFT, buff=0.08))
        labs.add(Text("0", font_size=fs, color=GREY_B).next_to(ax.c2p(0, 0), DL, buff=0.05))
        sans(labs)
        self.nx = Text(nom_x, font_size=22, color=GREY_A).next_to(ax.c2p(xr[1], 0), UP, buff=0.1)
        self.nx.align_to(ax.c2p(xr[1], 0), RIGHT)
        self.ny = Text(nom_y, font_size=22, color=GREY_A).next_to(ax.c2p(0, yr[1]), RIGHT, buff=0.12)
        self.ny.shift(DOWN * 0.1)
        self.grille, self.labs = grille, labs
        self.add(grille, ax, labs, self.nx, self.ny)

    def p(self, x, y):
        return self.ax.c2p(x, y)


class TabVar(VGroup):
    """Le tableau de variations : self.cadre, self.vx[i], self.vf[i], self.fl[i]
    (rien n'est joué ici)."""

    def __init__(self, xs, fs_, hauts, cx, y_haut, pas=1.15, larg_lab=1.0, marge=0.55, h0=0.62, h1=1.7, fs=28,
                 lab_f="f(x)", **kw):
        super().__init__(**kw)
        n = len(xs)
        w = larg_lab + 2 * marge + (n - 1) * pas
        xg = cx - w / 2
        xsep = xg + larg_lab
        xd = xg + w
        xv = [xsep + marge + i * pas for i in range(n)]
        y0 = y_haut - h0 / 2
        y1 = y_haut - h0 - h1 / 2
        r0 = Rectangle(width=w, height=h0).move_to(P((xg + xd) / 2, y0)).set_stroke(WHITE, 2.5)
        r1 = Rectangle(width=w, height=h1).move_to(P((xg + xd) / 2, y1)).set_stroke(WHITE, 2.5)
        sep = Line(P(xsep, y_haut), P(xsep, y_haut - h0 - h1), color=WHITE, stroke_width=2.5)
        l0 = Text("x", font_size=fs, color=WHITE).move_to(P((xg + xsep) / 2, y0))
        l1 = Text(lab_f, font_size=fs, color=WHITE).move_to(P((xg + xsep) / 2, y1))
        sans(VGroup(l0, l1))
        self.cadre = VGroup(r0, r1, sep, l0, l1)
        self.vx = [Text(mn(v), font_size=fs, color=JAUNE_TITRE).move_to(P(x, y0)) for v, x in zip(xs, xv)]
        self.vf = []
        for v, x, hh in zip(fs_, xv, hauts):
            yy = y1 + (h1 / 2 - 0.3) * (1 if hh else -1)
            self.vf.append(Text(mn(v), font_size=fs + 2, color=BLEU_CALCUL).move_to(P(x, yy)))
        self.fl = []
        for i in range(n - 1):
            a, b = self.vf[i], self.vf[i + 1]
            monte = hauts[i + 1]
            pa = a.get_corner(UR if monte else DR) + (RIGHT * 0.05)
            pb = b.get_corner(DL if monte else UL) + (LEFT * 0.05)
            self.fl.append(Arrow(pa, pb, buff=0.08, stroke_width=5, color=MONTE if monte else DESC,
                                 max_tip_length_to_length_ratio=0.18))
        self.xv, self.y0, self.y1 = xv, y0, y1
        self.add(self.cadre, *self.vx, *self.vf, *self.fl)


class GraphLyceeVariationsBase(Base):
    nom_voix = "lycee-graph-variations"
    fichier_marques = "graph_lycee_variations_marques.json"
    identite = "Maths 1re — EleveAI"
    ceinture = "jaune"
    XL = 0.95
    XD = 0.95

    # ── la question-pause : la phrase de réponse SOUS les cartes, à droite ──
    def _disposer_q(self, question, choix, phrase):
        tete, q, cartes, pause, rebours, ph = super(Base, self)._disposer_q(question, choix, phrase)
        ph2 = VGroup(*[self.t(x, 30, VERT_OK) for x in phrase]).arrange(DOWN, aligned_edge=LEFT, buff=0.12)
        haut = cartes.get_bottom()[1] - 0.2
        larg = 5.3 - self.XL
        w0 = ph2.width
        if ph2.width > larg:
            ph2.scale_to_fit_width(larg)
        if haut - ph2.height < -3.45:
            ph2.scale_to_fit_height(haut + 3.45)
        self.k_ph = ph2.width / w0
        ph2.align_to(P(self.XL, 0), LEFT).align_to(P(0, haut), UP)
        self.ph_q = ph2
        return tete, q, cartes, pause, rebours, ph2

    def ligne_rep(self, i, morceaux, fs=30):
        ref = self.ph_q[i]
        lg = self.ligne([(m, VERT_OK) for m in morceaux], fs, buff=0.2).scale(getattr(self, "k_ph", 1.0))
        if lg.width > 5.3 - self.XL:
            lg.scale_to_fit_width(5.3 - self.XL)
        if lg.width > ref.width * 1.02 and ref.width > 0.5:
            lg.scale_to_fit_width(ref.width)
        return lg.move_to(ref).align_to(ref, LEFT)

    # ── outils ──────────────────────────────────────────────────────────────
    def titre_d(self, s, mot, couleur=JAUNE_TITRE, fs=42, y=3.1):
        self.au_mot(mot)
        tit = self.col(self.t(s, fs, couleur), y, self.XD)
        self.play(Write(tit), run_time=0.5)
        return tit

    def ld(self, morceaux, y, fs=40, xl=None):
        return self.lc(morceaux, y, fs=fs, xl=self.XD if xl is None else xl, droite=6.3)

    def faire_figure(self):
        R = Repere(xr=(0, 10.7), yr=(0, 960), xl=5.6, yl=5.7, centre=P(-3.2, -0.35), xs=range(1, 11),
                   ys=range(100, 1000, 100), pas_y=100, nom_x="x (km)", nom_y="altitude (m)")
        self.R = R
        self.courbe = R.ax.plot(ALT, x_range=[0, 10], color=COURBE, stroke_width=5)
        self.runner = coureuse(0.85).move_to(R.p(0, 200), aligned_edge=DOWN)
        self.seg = [R.ax.plot(ALT, x_range=[a, b], color=c, stroke_width=9)
                    for a, b, c in ((0, 4, MONTE), (4, 7, DESC), (7, 10, MONTE))]

    def ecran_g(self, cle, *extra, segs=False):
        self.ecran(cle)
        self.add(self.R, self.courbe)
        if segs:
            self.add(*self.seg)
        for m in extra:
            self.add(m)

    def courir(self, x0, x1, rt=1.2, *avec):
        ch = self.R.ax.plot(ALT, x_range=[x0, x1], stroke_width=0)
        h = self.runner

        def maj(m, a):
            m.move_to(ch.point_from_proportion(a), aligned_edge=DOWN)

        self.play(UpdateFromAlphaFunc(h, maj), *avec, run_time=rt, rate_func=linear)

    def table(self, montrer=False):
        T = TabVar([0, 4, 7, 10], [200, 800, 300, 500], [False, True, False, True], cx=3.65, y_haut=2.55)
        if montrer:
            sans(T)
        return T

    def point(self, R, x, y, couleur=JAUNE_TITRE, r=0.1):
        return Dot(R.p(x, y), radius=r, color=couleur, stroke_color=WHITE, stroke_width=2)

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Le tableau de variations", self.identite, self.ceinture, y_ech=-2.45)
        sans(ident)
        sans(ech)
        self.au_mot("Le tableau")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.8)
        g = hermite([0, 1.2, 2.2, 3.2], [0, 1.4, 0.4, 1.0], [1.5, 0, 0, 0.8])
        c = ParametricFunction(lambda t: P(t, g(t)), t_range=[0, 3.2], color=COURBE, stroke_width=6)
        c.move_to(P(-4.0, 0.35))
        T = TabVar(["", "", "", ""], ["", "", "", ""], [False, True, False, True], cx=-0.0, y_haut=0.0)
        fl = VGroup(*[Arrow(P(0, 0), P(0.7, 0.55 * s), buff=0, stroke_width=6, color=MONTE if s > 0 else DESC,
                            max_tip_length_to_length_ratio=0.3) for s in (1, -1, 1)]).arrange(RIGHT, buff=0.25)
        fl.next_to(c, RIGHT, buff=0.6)
        self.play(Create(c), run_time=0.6)
        self.play(LaggedStart(*[GrowArrow(a) for a in fl], lag_ratio=0.3), run_time=0.8)
        L = self.lc([("Le lire", WHITE), ("sur une courbe ?", AMBRE)], -0.85, fs=48, xl=-4.6)
        self.jouer(L, ["Comment le lire", "sur une courbe"])
        self.play(Circumscribe(L, color=AMBRE, buff=0.12), run_time=0.7)
        self.attendre_voix(marge=0.6)

    # ── 01 : la situation : le trail ────────────────────────────────────────
    def ecran_situation(self):
        self.faire_figure()
        self.ecran("01-situation")
        R = self.R
        self.montre("coureuse", FadeIn(R.grille), Create(R.ax), FadeIn(R.labs), FadeIn(R.nx),
                    FadeIn(self.runner, shift=UP * 0.3), rt=0.6)
        m = montre_gps(0.9).move_to(P(self.XD + 0.4, 2.55))
        self.montre("son altitude", FadeIn(R.ny, scale=1.3), FadeIn(m, scale=0.7), rt=0.4)
        ta = self.t("altitude", 40, VERT_OK).next_to(m, RIGHT, buff=0.35)
        self.play(FadeIn(ta, shift=RIGHT * 0.15), Indicate(R.ny, color=VERT_OK), run_time=0.4)
        k = self.ld([("10 km", AMBRE)], 1.55, fs=40, xl=self.XD + 1.0)
        self.jouer(k, ["Sur 10"], {0: [Indicate(R.nx, color=AMBRE)]})
        self.au_mot("la courbe monte")
        rt = max(1.5, self.t_mot("remonte") + 0.5)
        self.courir(0, 10, rt, Create(self.courbe, rate_func=linear))
        for y, ic, nom, mot in ((0.45, chrono(0.85), "entraîneur", "entraîneur"),
                                (-0.6, trepied(0.9), "géomètre", "géomètre"),
                                (-1.65, barres(0.95), "data analyst du sport", "data analyst")):
            ic.move_to(P(self.XD + 0.45, y))
            t = self.t(nom, 30, WHITE).move_to(P(0, y)).align_to(P(self.XD + 1.2, 0), LEFT)
            if t.get_right()[0] > 6.2:
                t.scale_to_fit_width(6.2 - t.get_left()[0]).align_to(P(self.XD + 1.2, 0), LEFT)
            self.montre(mot, FadeIn(ic, scale=0.8), FadeIn(t, shift=RIGHT * 0.15), rt=0.4)
        self.attendre_voix()

    # ── 02 : la question du jour ────────────────────────────────────────────
    def ecran_question_du_jour(self):
        self.ecran_g("02-question-du-jour", self.runner)
        L = self.ld([("Résumer cette courbe", WHITE)], 2.9, fs=44)
        self.jouer(L, ["Comment résumer"])
        L2 = self.ld([("en un seul tableau ?", AMBRE)], 2.1, fs=44)
        self.jouer(L2, ["un seul tableau"])
        T = self.table()
        T.shift(DOWN * 1.1)
        self.play(Create(T.cadre[:3]), FadeIn(T.cadre[3:]), run_time=0.6)
        q = VGroup(*[gras("?", 40, AMBRE).move_to(v) for v in T.vx],
                   *[gras("?", 40, AMBRE).move_to(fl.get_center()) for fl in T.fl])
        self.play(LaggedStart(*[FadeIn(x, scale=1.4) for x in q], lag_ratio=0.1), run_time=0.7)
        self.play(Circumscribe(L2, color=AMBRE, buff=0.12), run_time=0.6)
        self.attendre_voix()

    # ── 03 : parcourir de gauche à droite ───────────────────────────────────
    def ecran_parcourir(self):
        self.ecran_g("03-parcourir", self.runner)
        R = self.R
        self.runner.move_to(R.p(0, 200), aligned_edge=DOWN)
        L = self.ld([("De gauche à droite", WHITE), ("→", AMBRE)], 2.9, fs=42)
        self.jouer(L, ["de gauche", None])
        mots = (("De 0 à 4", "elle monte", "est croissante", "de 0 à 4 km :", "croissante", MONTE, 0, 4, (2.6, 290)),
                ("De 4 à 7", "elle descend", "décroissante", "de 4 à 7 :", "décroissante", DESC, 4, 7, (5.3, 160)),
                ("De 7 à 10", "elle remonte", ("croissante", 3), "de 7 à 10 :", "croissante", MONTE, 7, 10, (8.6, 240)))
        ys = (1.85, 0.85, -0.15)
        for k, (m0, m1, m2, txt, mot_c, c, a, b, xm) in enumerate(mots):
            Lk = self.ld([(txt, WHITE), (mot_c, c)], ys[k], fs=40)
            self.jouer(VGroup(Lk[0]), [m0])
            self.au_mot(m1)
            self.courir(a, b, 1.0, Create(self.seg[k]))
            sous = self.t(mot_c, 22, c).move_to(R.p(*xm))
            sous.set_stroke(BLACK, 4, background=True)
            self.au_mot(*m2) if isinstance(m2, tuple) else self.au_mot(m2)
            self.play(FadeIn(Lk[1], scale=1.2), FadeIn(sous, shift=UP * 0.1), run_time=0.35)
        self.attendre_voix()

    # ── 04 : le tableau se construit ────────────────────────────────────────
    def ecran_tableau(self):
        self.ecran_g("04-tableau", segs=True)
        R = self.R
        self.titre_d("Le tableau de variations", "Le tableau", fs=38)
        T = self.table()
        self.au_mot("Première ligne")
        self.play(Create(T.cadre[0]), Create(T.cadre[2]), FadeIn(T.cadre[3]), run_time=0.5)
        dots = [self.point(R, x, ALT(x), JAUNE_TITRE, 0.09) for x in (4, 7)]
        self.montre("change de sens", *[FadeIn(d, scale=2) for d in dots], rt=0.4)
        for v, e in zip(T.vx, ["0, 4", "4, 7", "7, 10", "10. Deuxième"]):
            self.au_mot(e)
            self.play(FadeIn(v, scale=1.3), run_time=0.25)
        self.au_mot("Deuxième ligne")
        self.play(Create(T.cadre[1]), FadeIn(T.cadre[4]), run_time=0.4)
        for fl, e in zip(T.fl, ["une flèche qui monte", "une qui descend", "une qui monte"]):
            self.montre(e, GrowArrow(fl), rt=0.4)
        for v, e in zip(T.vf, ["200", "800", "300", "500"]):
            self.au_mot(e)
            self.play(FadeIn(v, scale=1.4), run_time=0.25)
        self.play(Circumscribe(VGroup(T.cadre[:3]), color=JAUNE_TITRE, buff=0.08), run_time=0.7)
        self.T = T
        self.attendre_voix()

    # ── 05 : maximum et minimum ─────────────────────────────────────────────
    def ecran_extremums(self):
        self.ecran_g("05-extremums", segs=True)
        R = self.R
        T = self.table(montrer=True)
        self.add(T)
        L1 = self.ld([("maximum :", MONTE), ("800 m", MONTE), ("en x = 4", WHITE)], -0.3, fs=38)
        dmax = self.point(R, 4, 800, MONTE, 0.12)
        self.jouer(L1, ["Le maximum", "800 mètres", "atteint en 4"],
                   {1: [FadeIn(dmax, scale=2), Circumscribe(T.vf[1], color=MONTE, buff=0.08)]})
        L2 = self.ld([("minimum :", AMBRE), ("200 m", AMBRE), ("en x = 0", WHITE)], -1.0, fs=38)
        dmin = self.point(R, 0, 200, AMBRE, 0.12)
        self.jouer(L2, ["Le minimum", "200 mètres", "atteint en 0"],
                   {1: [FadeIn(dmin, scale=2), Circumscribe(T.vf[0], color=AMBRE, buff=0.08)]})
        b300 = self.barrer(T.vf[2])
        x7 = Cross(scale_factor=0.14, stroke_color=FAUX, stroke_width=6).move_to(R.p(7, 300))
        L3 = self.ld([("pas en 7", FAUX)], -1.7, fs=36)
        self.jouer(L3, ["non en 7"], {0: [Create(b300), Create(x7)]})
        self.attendre_voix()

    # ── 06 : QUESTION 1 : où décroissante ? (C) ─────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        R = self.R
        self.add(R, self.courbe, *self.seg)

        def apres(sc):
            l0 = sc.ligne_rep(0, ["Entre 4 et 7 :", "elle descend."])
            l1 = sc.ligne_rep(1, ["A : la montée ;", "B : altitudes."])
            l2 = sc.ligne_rep(2, ["Intervalles : sur les x."])
            axe = Line(R.p(4, 0), R.p(7, 0), color=DESC, stroke_width=12)
            sc.montre("Entre 4", FadeIn(l0[0], shift=UP * 0.15), Create(axe), rt=0.4)
            sc.montre("la courbe descend", FadeIn(l0[1], shift=UP * 0.15),
                      Indicate(sc.seg[1], color=WHITE, scale_factor=1.05), rt=0.4)
            sc.montre("A, c'est", FadeIn(l1[0], shift=UP * 0.15), Create(sc.barrer_choix(0)), rt=0.35)
            sc.montre("et B", FadeIn(l1[1], shift=UP * 0.15), Create(sc.barrer_choix(1)), rt=0.35)
            sc.montre("les intervalles", FadeIn(l2[0], shift=UP * 0.15), rt=0.35)
            sc.rep_fini()

        self.question_pause("06-question", "06b-reponse", ["Sur quel intervalle la", "fonction est-elle décroissante ?"],
                            [self.t("de 0 à 4", 34), self.t("de 300 à 800", 34), self.t("de 4 à 7", 34)], 2,
                            ["Entre 4 et 7 : elle descend.", "A : la montée ; B : altitudes.",
                             "Intervalles : sur les x."],
                            mot_q="Sur quel", autres_r=apres)

    # ── 07 : le piège : l'intervalle se lit sur les x ───────────────────────
    def ecran_piege(self):
        self.ecran_g("07-piege", segs=True)
        R = self.R
        self.titre_d("Attention au piège !", "Attention", couleur=ROUGE_ERREUR, fs=42)
        L1 = self.ld([("croissante de 200 à 800", FAUX)], 2.0, fs=38)
        yax = Line(R.p(0, 200), R.p(0, 800), color=FAUX, stroke_width=12)
        self.jouer(L1, ["croissante de 200"], {0: [Create(yax)]})
        self.play(Create(self.barrer(L1)), run_time=0.3)
        L2 = self.ld([("croissante sur", VERT_OK), ("[0 ; 4]", VERT_OK)], 1.0, fs=44)
        xax = Line(R.p(0, 0), R.p(4, 0), color=VERT_OK, stroke_width=12)
        self.jouer(L2, ["On dit croissante", "l'intervalle de 0"], {1: [Create(xax)]})
        self.play(Create(self.cadre(L2[1])), run_time=0.3)
        L3 = self.ld([("l'intervalle :", AMBRE), ("sur les x", VERT_OK)], -0.1, fs=38)
        self.jouer(L3, ["L'intervalle se lit", "sur les x"], {1: [Indicate(xax, color=WHITE)]})
        L4 = self.ld([("les valeurs :", AMBRE), ("sur les y", BLEU_CALCUL)], -0.9, fs=38)
        self.jouer(L4, ["les valeurs", "sur les y"], {1: [yax.animate.set_color(BLEU_CALCUL)]})
        self.attendre_voix()

    # ── 08 : QUESTION 2 : le maximum dans un tableau (B) ────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        T = TabVar([-3, 1, 4], [2, 6, -1], [False, True, False], cx=-3.4, y_haut=1.4, pas=1.6, larg_lab=1.0,
                   marge=0.7, fs=36)

        def avant(sc):
            sc.montre("Dans ce tableau", Create(T.cadre[:3]), FadeIn(T.cadre[3:]), rt=0.5)
            sc.montre("vaut 2", FadeIn(T.vf[0], scale=1.4), rt=0.3)
            sc.montre("moins 3", FadeIn(T.vx[0], scale=1.4), rt=0.3)
            sc.montre("monte", GrowArrow(T.fl[0]), rt=0.35)
            sc.montre("jusqu'à 6", FadeIn(T.vf[1], scale=1.4), rt=0.3)
            sc.montre("6 en 1", FadeIn(T.vx[1], scale=1.4), rt=0.3)
            sc.montre("descend", GrowArrow(T.fl[1]), rt=0.35)
            sc.montre("jusqu'à moins 1", FadeIn(T.vf[2], scale=1.4), rt=0.3)
            sc.montre("en 4", FadeIn(T.vx[2], scale=1.4), rt=0.3)

        def apres(sc):
            l0 = sc.ligne_rep(0, ["Maximum :", "6, en haut ;"])
            l1 = sc.ligne_rep(1, ["atteint en 1,", "au-dessus."])
            l2 = sc.ligne_rep(2, ["A : dernière colonne ;"])
            l3 = sc.ligne_rep(3, ["C : lignes inversées."])
            sc.montre("Le maximum se lit", FadeIn(l0[0], shift=UP * 0.15), rt=0.35)
            sc.montre("flèches : 6", FadeIn(l0[1], shift=UP * 0.15),
                      Circumscribe(T.vf[1], color=VERT_OK, buff=0.1), T.vf[1].animate.set_color(VERT_OK), rt=0.5)
            sc.montre("atteint en 1", FadeIn(l1[0], shift=UP * 0.15),
                      Circumscribe(T.vx[1], color=VERT_OK, buff=0.1), T.vx[1].animate.set_color(VERT_OK), rt=0.5)
            sc.montre("juste au-dessus", FadeIn(l1[1], shift=UP * 0.15), rt=0.35)
            sc.montre("A lit", FadeIn(l2[0], shift=UP * 0.15), Create(sc.barrer_choix(0)),
                      Indicate(VGroup(T.vx[2], T.vf[2]), color=FAUX), rt=0.4)
            sc.montre("et C", FadeIn(l3[0], shift=UP * 0.15), Create(sc.barrer_choix(2)), rt=0.4)
            sc.rep_fini()

        self.question_pause("08-question", "08b-reponse", ["Quel est le maximum ?"],
                            [self.t("4, atteint en −1", 34), self.t("6, atteint en 1", 34),
                             self.t("1, atteint en 6", 34)], 1,
                            ["Maximum : 6, en haut ;", "atteint en 1, au-dessus.",
                             "A : dernière colonne ;", "C : lignes inversées."],
                            avant_q=avant, autres_r=apres)

    # ── 09 : défi : dresser le tableau ──────────────────────────────────────
    def repere_defi(self):
        R = Repere(xr=(0, 5.7), yr=(-3, 5.6), xl=5.0, yl=5.6, centre=P(-3.6, -0.3), xs=range(1, 6),
                   ys=range(-2, 6), fs=20)
        # le « 1 » de l'axe x au-dessus (la courbe passe dessous), le « 3 » loin du point (0 ; 3)
        R.labs[0].next_to(R.ax.c2p(1, 0), UP, buff=0.08).shift(RIGHT * 0.08)
        R.labs[9].next_to(R.ax.c2p(0, 3), LEFT, buff=0.22)
        return R, R.ax.plot(DEFI, x_range=[0, 2], color=DESC, stroke_width=6), \
            R.ax.plot(DEFI, x_range=[2, 5], color=MONTE, stroke_width=6)

    def table_defi(self):
        return TabVar([0, 2, 5], [3, -2, 4], [True, False, True], cx=3.6, y_haut=2.45, pas=1.6, marge=0.45)

    def ecran_defi(self):
        self.ecran("09-defi", 0.5)
        R, c1, c2 = self.repere_defi()
        self.titre_d("À toi de jouer !", "À toi de jouer", fs=46)
        self.play(FadeIn(R), run_time=0.4)
        d0, d1, d2 = (Dot(R.p(x, y), radius=0.1, color=WHITE) for x, y in ((0, 3), (2, -2), (5, 4)))
        self.montre("part de 3", FadeIn(d0, scale=2), rt=0.35)
        self.au_mot("descend")
        self.play(Create(c1), run_time=0.8)
        self.montre("x égale 2", FadeIn(d1, scale=2), rt=0.3)
        self.au_mot("puis monte")
        self.play(Create(c2), run_time=0.8)
        self.montre("x égale 5", FadeIn(d2, scale=2), rt=0.3)
        T = self.table_defi()
        q = VGroup(*[gras("?", 40, AMBRE).move_to(P(x, T.y0)) for x in T.xv],
                   *[gras("?", 40, AMBRE).move_to(P((T.xv[i] + T.xv[i + 1]) / 2, T.y1)) for i in range(2)])
        self.montre("Dresse", Create(T.cadre[:3]), FadeIn(T.cadre[3:]), rt=0.5)
        self.play(LaggedStart(*[FadeIn(x, scale=1.4) for x in q], lag_ratio=0.1), run_time=0.6)
        self.pause_defi(y=-0.75)

    def ecran_correction(self):
        self.ecran("09b-correction", 0.5)
        R, c1, c2 = self.repere_defi()
        pts = VGroup(*[Dot(R.p(x, y), radius=0.1, color=WHITE) for x, y in ((0, 3), (2, -2), (5, 4))])
        tit = sans(self.t("Correction", 46, JAUNE_TITRE))
        self.col(tit, 3.1, self.XD)
        T = self.table_defi()
        self.add(R, c1, c2, pts, tit, T.cadre)
        for v, e in zip(T.vx, ["ligne : 0", "0, 2", "2, 5"]):
            self.au_mot(e)
            self.play(FadeIn(v, scale=1.3), run_time=0.25)
        self.montre("ligne : 3", FadeIn(T.vf[0], scale=1.4), rt=0.3)
        self.montre("une flèche qui descend", GrowArrow(T.fl[0]), rt=0.4)
        self.montre("vers moins 2", FadeIn(T.vf[1], scale=1.4), rt=0.3)
        self.montre("une flèche qui monte", GrowArrow(T.fl[1]), rt=0.4)
        self.montre("vers 4", FadeIn(T.vf[2], scale=1.4), rt=0.3)
        L1 = self.ld([("décroissante sur", DESC), ("[0 ; 2]", DESC)], -0.75, fs=38)
        x1 = Line(R.p(0, 0), R.p(2, 0), color=DESC, stroke_width=12)
        self.jouer(L1, ["Décroissante", "l'intervalle de 0"], {1: [Create(x1), Indicate(c1, color=WHITE)]})
        L2 = self.ld([("croissante sur", MONTE), ("[2 ; 5]", MONTE)], -1.5, fs=38)
        x2 = Line(R.p(2, 0), R.p(5, 0), color=MONTE, stroke_width=12)
        self.jouer(L2, [("croissante sur", 2), "l'intervalle de 2"], {1: [Create(x2), Indicate(c2, color=WHITE)]})
        self.attendre_voix()

    # ── 10 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("10-finale", 0.65)
        fig = VGroup(self.R, self.courbe, *self.seg)
        self.add(fig)
        self.XL = -0.9  # figure plus petite : le texte gagne de la place (24/11)
        lignes = self.finale_colonne(figure=fig, textes=[
            ("On parcourt la courbe", "de gauche à droite."),
            ("Première ligne : les x", "où elle change de sens."),
            ("Deuxième ligne : des flèches,", "et les valeurs au bout."),
            ("Les intervalles se lisent", "toujours sur les x.")], fs=40)
        self.au_mot("On parcourt")
        self.montrer_ligne(lignes[0])
        self.au_mot("Première ligne")
        self.montrer_ligne(lignes[1])
        self.au_mot("Deuxième ligne")
        self.montrer_ligne(lignes[2])
        self.au_mot("Les intervalles")
        self.montrer_ligne(lignes[3])
        self.attendre_voix(marge=1.0)

    def construct(self):
        ecrans = [self.page_de_garde, self.ecran_situation, self.ecran_question_du_jour, self.ecran_parcourir,
                  self.ecran_tableau, self.ecran_extremums, self.ecran_question1, self.ecran_piege,
                  self.ecran_question2, self.ecran_defi, self.ecran_correction, self.ecran_finale]
        if os.environ.get("GARDE_SEULE") == "1":  # la garde STMG seule (voir l'en-tête)
            ecrans[0]()
            return
        for e in ecrans:
            e()
        ecran_fin(self, "paysage", voix="11-abonne")


class GraphLyceeVariationsPremiere(GraphLyceeVariationsBase):
    identite = "Maths 1re — EleveAI"
    ceinture = "jaune"


class GraphLyceeVariationsStmg(GraphLyceeVariationsBase):
    identite = "Maths STMG — EleveAI"
    ceinture = "jaune"
