# graph_lycee_appartenance.py
# EleveAI — Maths 1re et STMG (automatismes, épreuve anticipée SANS calculatrice)
# série « Graphiques », épisode 01 : UN POINT EST-IL SUR LA COURBE ?
# Paysage, CEINTURE JAUNE, pas de short.
# Deux sous-classes : GraphLyceeAppartenancePremiere (« Maths 1re — EleveAI ») et
# GraphLyceeAppartenanceStmg (« Maths STMG — EleveAI », garde seule, GARDE_SEULE=1,
# PAS rendue pour l'instant).
# ⭐ Méthode : on remplace x par l'abscisse dans l'équation, on calcule, on compare
# à l'ordonnée. Le carré passe avant le signe moins : −(−1)² = −1.
# ⭐ Le dessin : UNE SEULE COURBE y = −x² + 4x sur [−1 ; 5], sur quadrillage, à
# gauche toute la vidéo ; les calculs dans la colonne de droite. Le personnage du
# jeu vidéo saute le long de la courbe et attrape la pièce d'or (3 ; 3).
# ⭐ Fil rouge (erreurs) : question 1 (1 ; 4) : B (on trouve 3, le point est
# au-dessus) ; piège 07 : −(−1)² = −1 et non + 1 ; question 2 (y = 2x² − 3) : A,
# B oublie le carré, C met au carré 2 × (−1).
# Décor et métiers : JEUX VIDÉO : développeuse de jeux, architecte, ingénieur.
# Écrans : 00 garde · 01 situation · 02 question du jour · 03 remplacer · 04 comparer ·
# 05 la règle · 06 QUESTION 1 (B) · 07 piège · 08 coordonnées (sommet) ·
# 09 QUESTION 2 (A) · 10 défi · 10b correction · 11 ce que tu as appris · 12 fin.
# Voix : manim/voix/lycee-graph-appartenance.json (validée par Frédéric le 24/11,
# débit −10) ; WAV : public/sons/lycee-graph-appartenance/ ; marques :
# graph_lycee_appartenance_marques.json (marques_dump.ps1 + convertisseur à seuil 0,5 s).
# Outils (non modifiés) : la base PropLyceeEvoAdditifBase de l'épisode « évolutions »
# 07 (prop_lycee_evo_additif.py), fin_commune.ecran_fin.
#
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/premiere/graph_lycee_appartenance.py GraphLyceeAppartenancePremiere
# Brouillon : python -m manim render -ql --disable_caching manim/scripts/premiere/graph_lycee_appartenance.py GraphLyceeAppartenancePremiere -o eleveai-maths-premiere-graph-appartenance --media_dir manim/scripts/premiere/media-graph-lycee-appartenance
# Garde STMG seule : GARDE_SEULE=1 … GraphLyceeAppartenanceStmg -o garde-stmg-graph-appartenance

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
PropPourcentageCoefficientBase = _evo.PropPourcentageCoefficientBase
gras, sans = _evo.gras, _evo.sans

OR = "#fbbf24"          # la pièce d'or
OR_F = "#b45309"
COURBE = "#60a5fa"      # la courbe du saut
GRILLE = "#334155"
ORANGE_V = "#f97316"    # la verticale de lecture (abscisse)
VIOLET_H = "#a78bfa"    # l'horizontale de lecture (ordonnée)
FAUX = "#ef4444"


def f(x):
    return -x * x + 4 * x


def coord(a, b):
    """« (3 ; 3) », les moins typographiques."""
    return f"({a} ; {b})".replace("-", "−")


# ── les petits dessins ─────────────────────────────────────────────────────
def personnage(s=1.0):
    """Le héros du jeu : une tête ronde, un corps, deux jambes (pieds en ORIGIN)."""
    jambes = VGroup(Line(P(-0.08, 0.0), P(-0.04, 0.22), color="#1e3a8a", stroke_width=6),
                    Line(P(0.08, 0.0), P(0.04, 0.22), color="#1e3a8a", stroke_width=6))
    corps = RoundedRectangle(width=0.26, height=0.3, corner_radius=0.07, fill_color="#ef4444", fill_opacity=1,
                             stroke_width=0).move_to(P(0, 0.36))
    tete = Circle(radius=0.12, fill_color="#f1c27d", fill_opacity=1, stroke_width=0).move_to(P(0, 0.62))
    casq = Arc(radius=0.13, start_angle=0.1, angle=PI - 0.2, color="#ef4444", stroke_width=6).move_to(P(0, 0.7))
    g = VGroup(jambes, corps, tete, casq).scale(s, about_point=ORIGIN)
    return g


def piece(r=0.17):
    return VGroup(Circle(radius=r, fill_color=OR, fill_opacity=1, stroke_color=OR_F, stroke_width=3),
                  Circle(radius=r * 0.6, stroke_color=OR_F, stroke_width=2))


def manette(s=1.0):
    corps = RoundedRectangle(width=1.0, height=0.5, corner_radius=0.22, fill_color="#475569", fill_opacity=1,
                             stroke_width=0)
    croix_ = VGroup(Rectangle(width=0.26, height=0.08, fill_color=WHITE, fill_opacity=1, stroke_width=0),
                    Rectangle(width=0.08, height=0.26, fill_color=WHITE, fill_opacity=1, stroke_width=0)
                    ).move_to(P(-0.25, 0))
    b = VGroup(Dot(P(0.22, 0.07), radius=0.05, color="#22c55e"), Dot(P(0.32, -0.05), radius=0.05, color=FAUX))
    return VGroup(corps, croix_, b).scale(s)


def arche(s=1.0):
    a = Arc(radius=0.45, start_angle=0, angle=PI, color="#e2e8f0", stroke_width=8)
    pieds = VGroup(Line(P(-0.45, 0), P(-0.45, -0.3), color="#e2e8f0", stroke_width=8),
                   Line(P(0.45, 0), P(0.45, -0.3), color="#e2e8f0", stroke_width=8))
    return VGroup(a, pieds).scale(s)


def pont(s=1.0):
    tab = Line(P(-0.6, 0.0), P(0.6, 0.0), color="#94a3b8", stroke_width=8)
    arc_ = ArcBetweenPoints(P(-0.55, -0.3), P(0.55, -0.3), angle=-PI * 0.7, color="#94a3b8", stroke_width=5)
    eau = Line(P(-0.65, -0.32), P(0.65, -0.32), color=COURBE, stroke_width=4)
    return VGroup(tab, arc_, eau).scale(s)


class Repere(VGroup):
    """Le quadrillage et les axes de la courbe (nombres des axes : lus, jamais dits)."""

    def __init__(self, xr=(-2.9, 5.6), yr=(-5.6, 4.8), xl=6.2, yl=6.45, centre=P(-3.3, -0.3), xs=range(-2, 6),
                 ys=range(-5, 5), fs=20, sans_y=(), **kw):
        super().__init__(**kw)
        ax = Axes(x_range=[xr[0], xr[1], 1], y_range=[yr[0], yr[1], 1], x_length=xl, y_length=yl, tips=True,
                  axis_config={"stroke_width": 2.5, "color": GREY_A, "tip_width": 0.16, "tip_height": 0.16,
                               "include_ticks": False})
        ax.shift(centre - ax.get_center())
        self.ax = ax
        grille = VGroup(*[Line(ax.c2p(x, yr[0]), ax.c2p(x, yr[1] - 0.2), stroke_width=1.2, color=GRILLE)
                          for x in xs if x != 0],
                        *[Line(ax.c2p(xr[0], y), ax.c2p(xr[1] - 0.2, y), stroke_width=1.2, color=GRILLE)
                          for y in ys if y != 0])
        labs = VGroup()
        for x in xs:
            if x != 0:
                labs.add(Text(str(x).replace("-", "−"), font_size=fs, color=GREY_B)
                         .next_to(ax.c2p(x, 0), DOWN, buff=0.08).shift(LEFT * (0.06 if x < 0 else 0)))
        for y in ys:
            if y != 0 and y not in sans_y:  # les négatifs à DROITE de l'axe : la courbe passe à gauche
                labs.add(Text(str(y).replace("-", "−"), font_size=fs, color=GREY_B)
                         .next_to(ax.c2p(0, y), LEFT if y > 0 else RIGHT, buff=0.08))
        labs.add(Text("0", font_size=fs, color=GREY_B).next_to(ax.c2p(0, 0), DL, buff=0.05))
        nx = Text("x", font_size=24, color=GREY_A).next_to(ax.c2p(xr[1], 0), UP, buff=0.1).shift(LEFT * 0.1)
        ny = Text("y", font_size=24, color=GREY_A).next_to(ax.c2p(0, yr[1]), RIGHT, buff=0.12).shift(DOWN * 0.1)
        sans(labs)
        sans(VGroup(nx, ny))
        self.grille, self.labs = grille, labs
        self.add(grille, ax, labs, nx, ny)

    def p(self, x, y):
        return self.ax.c2p(x, y)


class GraphLyceeAppartenanceBase(Base):
    nom_voix = "lycee-graph-appartenance"
    fichier_marques = "graph_lycee_appartenance_marques.json"
    identite = "Maths 1re — EleveAI"
    ceinture = "jaune"
    XL = 0.95
    XD = 0.95       # la colonne de droite
    Y_PH = -1.0

    # ── la question-pause : la phrase de réponse SOUS les cartes, à droite ──
    def _disposer_q(self, question, choix, phrase):
        tete, q, cartes, pause, rebours, ph = super(Base, self)._disposer_q(question, choix, phrase)
        ph2 = VGroup(*[self.t(x, 30, VERT_OK) for x in phrase]).arrange(DOWN, aligned_edge=LEFT, buff=0.14)
        haut = cartes.get_bottom()[1] - 0.22
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
        return lg.move_to(ref).align_to(ref, LEFT)

    # ── outils de l'épisode ─────────────────────────────────────────────────
    def titre_d(self, s, mot, couleur=JAUNE_TITRE, fs=42, y=3.1):
        """Un titre en haut de la colonne de droite (la courbe garde la gauche)."""
        self.au_mot(mot)
        tit = self.col(self.t(s, fs, couleur), y, self.XD)
        self.play(Write(tit), run_time=0.5)
        return tit

    def ld(self, morceaux, y, fs=40, xl=None):
        return self.lc(morceaux, y, fs=fs, xl=self.XD if xl is None else xl, droite=6.3)

    def faire_figure(self):
        R = Repere()
        self.R = R
        self.courbe = R.ax.plot(f, x_range=[-1, 5], color=COURBE, stroke_width=5)
        self.heros = personnage(0.75).move_to(R.p(0, 0), aligned_edge=DOWN)
        self.or_ = piece().move_to(R.p(3, 3))

    def ecran_g(self, cle, *extra, courbe=True):
        """Efface, Ti-Margo, la voix, et la courbe remise à gauche (sans animation)."""
        self.ecran(cle)
        self.add(self.R)
        if courbe:
            self.add(self.courbe)
        for m in extra:
            self.add(m)

    def sauter(self, x0, x1, rt=1.2):
        """Le héros saute le long de la courbe, de l'abscisse x0 à x1."""
        ch = self.R.ax.plot(f, x_range=[x0, x1], stroke_width=0)
        h = self.heros

        def maj(m, a):
            m.move_to(ch.point_from_proportion(a), aligned_edge=DOWN)

        self.play(UpdateFromAlphaFunc(h, maj), run_time=rt, rate_func=smooth)

    def point(self, x, y, couleur=JAUNE_TITRE, r=0.1):
        return Dot(self.R.p(x, y), radius=r, color=couleur, stroke_color=WHITE, stroke_width=2)

    def etiq(self, x, y, couleur=JAUNE_TITRE, sens=RIGHT, fs=28):
        t = gras(coord(x, y), fs, couleur).next_to(self.R.p(x, y), sens, buff=0.15)
        t.set_stroke(BLACK, 5, background=True)
        return t

    def etiq2(self, x, y, couleur=JAUNE_TITRE, sens=RIGHT, fs=28):
        """L'étiquette en DEUX morceaux, « (1 ; » puis « 4) » : chaque nombre à son mot."""
        a = gras(f"({x} ;".replace("-", "−"), fs, couleur)
        b = gras(f"{y})".replace("-", "−"), fs, couleur)
        g = VGroup(a, b).arrange(RIGHT, buff=0.12, aligned_edge=DOWN).next_to(self.R.p(x, y), sens, buff=0.15)
        for m in g:
            m.set_stroke(BLACK, 5, background=True)
        return g

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Un point sur une courbe", self.identite, self.ceinture, y_ech=-2.45)
        sans(ident)
        sans(ech)
        self.au_mot("Un point")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.8)
        arc_ = FunctionGraph(lambda x: -0.45 * x * x + 0.9 * x, x_range=[-0.6, 2.6], color=COURBE,
                             stroke_width=6).move_to(P(-3.9, 0.35))
        pt = piece(0.2).move_to(arc_.point_from_proportion(0.7) + UP * 0.05)
        q = gras("?", 60, AMBRE).next_to(pt, UR, buff=0.08)
        self.play(Create(arc_), run_time=0.6)
        self.montre("Comment savoir", FadeIn(pt, scale=1.5), FadeIn(q, scale=1.4), rt=0.45)
        L = self.lc([("Est-il dessus ?", WHITE)], 0.75, fs=50, xl=-0.9)
        self.jouer(L, ["s'il y est"])
        L2 = self.lc([("Sans la tracer !", AMBRE)], -0.35, fs=50, xl=-0.9)
        self.jouer(L2, ["sans la tracer"])
        self.play(Circumscribe(L2, color=AMBRE, buff=0.12), Indicate(pt, color=WHITE, scale_factor=1.5),
                  run_time=0.8)
        self.attendre_voix(marge=0.6)

    # ── 01 : la situation : le saut du jeu vidéo ────────────────────────────
    def ecran_situation(self):
        self.faire_figure()
        self.ecran("01-situation")
        R = self.R
        self.play(FadeIn(R.grille), Create(R.ax), FadeIn(R.labs), FadeIn(R[3:]), run_time=0.8)
        self.montre("un personnage", FadeIn(self.heros, shift=UP * 0.3), rt=0.4)
        self.au_mot("Son saut")
        self.play(Create(self.courbe), run_time=1.4)
        L = self.ld([("y =", WHITE), ("−x²", COURBE), ("+ 4x", COURBE)], 2.9, fs=48)
        self.jouer(L, ["y égale", "moins x", "plus 4"])
        self.play(Circumscribe(L, color=COURBE, buff=0.12), run_time=0.5)
        self.montre("Une pièce d'or", FadeIn(self.or_, scale=2.0), rt=0.4)
        e = self.etiq(3, 3, OR, RIGHT).shift(RIGHT * 0.15 + UP * 0.2)
        self.play(FadeIn(e, scale=1.3), run_time=0.35)
        self.etiq_or = e
        self.play(Flash(self.or_, color=OR), run_time=0.5)
        Q = self.ld([("Va-t-il l'attraper ?", AMBRE)], 1.95, fs=40)
        self.jouer(Q, ["Va-t-il"])
        for y, ic, nom, mot in ((0.75, manette(0.75), "développeuse de jeux", "développeuse"),
                                (-0.35, arche(0.85), "architecte", "architecte"),
                                (-1.45, pont(0.85), "ingénieur", "ingénieur")):
            ic.move_to(P(self.XD + 0.5, y))
            t = self.t(nom, 30, WHITE).move_to(P(0, y)).align_to(P(self.XD + 1.25, 0), LEFT)
            if t.get_right()[0] > 6.2:
                t.scale_to_fit_width(6.2 - t.get_left()[0]).align_to(P(self.XD + 1.25, 0), LEFT)
            self.montre(mot, FadeIn(ic, scale=0.8), FadeIn(t, shift=RIGHT * 0.15), rt=0.4)
        self.attendre_voix()

    # ── 02 : la question du jour ────────────────────────────────────────────
    def ecran_question_du_jour(self):
        self.ecran_g("02-question-du-jour", self.heros, self.or_, self.etiq_or)
        L = self.ld([("Le point", WHITE), ("(3 ; 3)", OR)], 2.0, fs=50)
        self.jouer(L, ["Le point", None])
        L2 = self.ld([("est-il sur la courbe ?", AMBRE)], 1.0, fs=46)
        self.jouer(L2, ["est-il"])
        for _ in range(2):
            self.play(self.or_.animate.set_opacity(0.15), run_time=0.25)
            self.play(self.or_.animate.set_opacity(1), run_time=0.25)
        self.play(Circumscribe(L2, color=AMBRE, buff=0.12), run_time=0.6)
        self.attendre_voix()

    # ── 03 : remplacer x par l'abscisse ─────────────────────────────────────
    def ecran_remplacer(self):
        self.ecran_g("03-remplacer", self.heros, self.or_, self.etiq_or)
        R = self.R
        t = self.ld([("Le point", WHITE), ("(3 ; 3)", OR)], 3.0, fs=44)
        self.jouer(t, ["Le point", None])
        v = DashedLine(R.p(3, 0), R.p(3, 3), color=ORANGE_V, stroke_width=5, dash_length=0.1)
        h = DashedLine(R.p(0, 3), R.p(3, 3), color=VIOLET_H, stroke_width=5, dash_length=0.1)
        La = self.ld([("abscisse :", ORANGE_V), ("3", ORANGE_V)], 2.15, fs=38)
        self.jouer(La, ["abscisse", "est 3"], {0: [Create(v)]})
        Lo = self.ld([("ordonnée :", VIOLET_H), ("3", VIOLET_H)], 1.45, fs=38)
        self.jouer(Lo, ["ordonnée", ("est 3", 2)], {0: [Create(h)]})
        Lx = self.ld([("On remplace x par", WHITE), ("3", ORANGE_V)], 0.7, fs=36)
        self.jouer(Lx, ["On remplace", "par 3"])
        L1 = self.ld([("y =", WHITE), ("−3²", BLEU_CALCUL), ("+ 4 × 3", BLEU_CALCUL)], -0.2, fs=46)
        self.jouer(L1, [None, "Moins 3", "plus 4 fois"])
        L2 = self.ld([("=", WHITE), ("−9", BLEU_CALCUL), ("+ 12", BLEU_CALCUL)], -1.1, fs=46, xl=self.XD + 0.62)
        self.jouer(L2, ["moins 9", None, None])
        L3 = self.ld([("=", WHITE), ("3", VERT_OK)], -2.0, fs=52, xl=self.XD + 0.62)
        self.jouer(L3, ["égale 3", None])
        self.play(Create(self.cadre(L3[1])), run_time=0.3)
        self.insister(L3[1], 1.3, 0.2)
        self.attendre_voix()

    # ── 04 : comparer à l'ordonnée ; le héros attrape la pièce ──────────────
    def ecran_comparer(self):
        self.ecran_g("04-comparer", self.heros, self.or_, self.etiq_or)
        L = self.ld([("on trouve", GREY_B), ("3", VERT_OK), ("=", WHITE), ("3", VIOLET_H)], 2.2, fs=42)
        sans(L[0])
        self.montre("On trouve", FadeIn(L[0], shift=RIGHT * 0.15), rt=0.3)
        self.montre("trouve 3", *[FadeIn(m, shift=RIGHT * 0.15) for m in L[1:]], rt=0.35)
        s1 = self.t("ordonnée du point", 26, VIOLET_H).next_to(L[3], DOWN, buff=0.15)
        s1.align_to(L[3], RIGHT)
        ok = self.coche(VERT_OK, 0.28).next_to(L, RIGHT, buff=0.25)
        self.montre("l'ordonnée", FadeIn(s1, shift=UP * 0.1), Create(ok), rt=0.35)
        tp = self.tampon("Sur la courbe !", VERT_OK, 44)
        self.col(tp, 0.35, self.XD)
        self.montre("est sur la courbe", FadeIn(tp, scale=1.3), rt=0.4)
        self.au_mot("Le personnage")
        self.sauter(0, 3, rt=1.1)
        self.play(Flash(self.or_, color=OR, line_length=0.3, num_lines=12), FadeOut(self.or_, scale=1.6),
                  run_time=0.6)
        self.or_pris = True
        self.attendre_voix()

    # ── 05 : la règle ───────────────────────────────────────────────────────
    def ecran_regle(self):
        self.ecran_g("05-regle", self.heros, self.etiq_or)
        self.titre_d("La règle", "La règle", fs=46)
        b = VGroup(self.t("Un point est sur la courbe", 30, WHITE),
                   self.t("si ses coordonnées", 30, WHITE),
                   self.t("vérifient l'équation.", 30, VERT_OK)).arrange(DOWN, aligned_edge=LEFT, buff=0.14)
        self.col(b, 1.6, self.XD + 0.25)
        if b.get_right()[0] > 6.0:
            b.scale_to_fit_width(6.0 - b.get_left()[0]).align_to(P(self.XD + 0.25, 0), LEFT)
        cad = SurroundingRectangle(b, color=AMBRE, buff=0.22, corner_radius=0.12, stroke_width=4)
        self.au_mot("un point est")
        self.play(FadeIn(b[0], shift=RIGHT * 0.15), Create(cad), run_time=0.4)
        self.montre("si ses", FadeIn(b[1], shift=RIGHT * 0.15), rt=0.35)
        self.montre("vérifient", FadeIn(b[2], shift=RIGHT * 0.15), rt=0.35)
        e1 = self.ld([("→", AMBRE), ("y calculé avec l'abscisse", ORANGE_V)], -0.3, fs=32)
        self.jouer(e1, ["On calcule", None])
        e2 = self.ld([("→", AMBRE), ("comparé à l'ordonnée", VIOLET_H)], -1.1, fs=32)
        self.jouer(e2, ["puis on compare", None])
        self.play(Indicate(self.etiq_or, color=WHITE, scale_factor=1.3), run_time=0.6)
        self.attendre_voix()

    # ── 06 : QUESTION 1 : (1 ; 4) ? (B) ─────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        self.add(self.R, self.courbe, self.heros)
        pt = self.point(1, 4, AMBRE, 0.11)
        e = self.etiq2(1, 4, AMBRE, UP)
        e.align_to(pt, LEFT).shift(LEFT * 0.05)

        def avant(sc):
            sc.play(FadeIn(pt, scale=2.0), FadeIn(e[0], scale=1.3), run_time=0.3)
            sc.play(FadeIn(e[1], scale=1.3), run_time=0.3)

        def apres(sc):
            R = sc.R
            l0 = sc.ligne_rep(0, ["−1² + 4 × 1", "= −1 + 4", "= 3"])
            l1 = sc.ligne_rep(1, ["et pas 4 :", "il est au-dessus."])
            vrai = sc.point(1, 3, VERT_OK, 0.1)
            gap = DashedLine(R.p(1, 3), R.p(1, 4), color=FAUX, stroke_width=5, dash_length=0.08)
            sc.montre("Moins 1 au", FadeIn(l0[0], shift=UP * 0.15), rt=0.35)
            sc.montre("moins 1 plus", FadeIn(l0[1], shift=UP * 0.15), rt=0.35)
            sc.montre("égale 3", FadeIn(l0[2], scale=1.3), FadeIn(vrai, scale=2), rt=0.35)
            sc.montre("et pas 4", FadeIn(l1[0], shift=UP * 0.15), pt.animate.set_color(FAUX),
                      e.animate.set_color(FAUX), Create(gap), rt=0.4)
            sc.montre("au-dessus", FadeIn(l1[1], shift=UP * 0.15), rt=0.35)
            sc.rep_fini()

        self.question_pause("06-question", "06b-reponse", ["Est-il sur", "la courbe ?"],
                            [self.t("oui", 34), self.t("non, on trouve 3", 34), self.t("non, on trouve 5", 34)], 1,
                            ["−1² + 4 × 1 = −1 + 4 = 3", "et pas 4 : il est au-dessus."],
                            avant_q=avant, autres_r=apres)

    # ── 07 : le piège : −(−1)² = −1 ─────────────────────────────────────────
    def ecran_piege(self):
        self.ecran_g("07-piege", self.heros)
        R = self.R
        self.titre_d("Attention au piège !", "Attention", couleur=ROUGE_ERREUR, fs=42)
        Lx = self.ld([("x =", WHITE), ("−1", ORANGE_V)], 2.15, fs=44)
        v = DashedLine(R.p(-1, 0), R.p(-1, -5), color=ORANGE_V, stroke_width=5, dash_length=0.1)
        self.jouer(Lx, ["x égale", "moins 1"], {1: [Create(v)]})
        L1 = self.ld([("−(−1)²", VERT_OK), ("= −1", VERT_OK)], 1.15, fs=46)
        self.jouer(L1, ["parenthèse", ("égale moins 1", 2)])
        faux = gras("+ 1", 42, FAUX).next_to(L1, RIGHT, buff=0.45)
        self.montre("pas plus 1", FadeIn(faux, scale=1.3), rt=0.35)
        self.play(Create(self.barrer(faux)), run_time=0.3)
        L2 = self.ld([("le carré d'abord,", AMBRE), ("le − ensuite", AMBRE)], 0.15, fs=34)
        self.jouer(L2, ["Le carré d'abord", "le signe moins"])
        L3 = self.ld([("y =", WHITE), ("−1 − 4", BLEU_CALCUL), ("= −5", VERT_OK)], -0.85, fs=50)
        pt = self.point(-1, -5, VERT_OK, 0.11)
        e = self.etiq2(-1, -5, VERT_OK, LEFT, fs=20)
        L3[2].shift(RIGHT * 0.15)
        self.jouer(L3, ["On trouve", None, "égale moins 5"],
                   {1: [FadeIn(pt, scale=2), FadeIn(e[0], scale=1.2)], 2: [FadeIn(e[1], scale=1.2)]})
        self.play(Create(self.cadre(L3[2])), Flash(pt.get_center(), color=VERT_OK), run_time=0.5)
        self.attendre_voix()

    # ── 08 : l'équation donne les points qui manquent : le sommet (2 ; 4) ───
    def ecran_coordonnees(self):
        self.ecran_g("08-coordonnees", self.heros)
        R = self.R
        self.titre_d("Trouver un point", "L'équation", fs=42)
        Lx = self.ld([("x =", WHITE), ("2", ORANGE_V)], 2.0, fs=48)
        v = DashedLine(R.p(2, 0), R.p(2, 4), color=ORANGE_V, stroke_width=5, dash_length=0.1)
        self.jouer(Lx, ["d'abscisse", None], {1: [Create(v)]})
        L1 = self.ld([("→", WHITE), ("−4 + 8", BLEU_CALCUL), ("= 4", VERT_OK)], 1.0, fs=50)
        self.jouer(L1, [None, "moins 4", "égale 4"])
        pt = self.point(2, 4, VERT_OK, 0.12)
        e = self.etiq2(2, 4, VERT_OK, UR)
        L2 = self.ld([("le point", WHITE), ("(2 ;", VERT_OK), ("4)", VERT_OK)], -0.05, fs=46)
        L2[2].shift(LEFT * 0.08)
        self.jouer(L2, ["C'est le point", None, None],
                   {1: [FadeIn(pt, scale=2), FadeIn(e[0], scale=1.3)], 2: [FadeIn(e[1], scale=1.3)]})
        L3 = self.ld([("le plus haut du saut", AMBRE)], -1.0, fs=38)
        self.jouer(L3, ["le plus haut"])
        self.play(Flash(pt.get_center(), color=VERT_OK), Indicate(e, color=WHITE), run_time=0.6)
        self.attendre_voix()

    # ── 09 : QUESTION 2 : y = 2x² − 3, abscisse −1 (A) ──────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        R2 = Repere(xr=(-2.4, 2.6), yr=(-3.8, 5.6), xl=4.2, yl=5.4, centre=P(-3.7, -0.55), xs=range(-2, 3),
                    ys=range(-3, 6), fs=20, sans_y=(-3,))
        c2 = R2.ax.plot(lambda x: 2 * x * x - 3, x_range=[-1.9, 1.9], color=VIOLET_H, stroke_width=5)
        eq = gras("y = 2x² − 3", 34, VIOLET_H).move_to(P(-3.7, 2.95)).set_stroke(BLACK, 5, background=True)
        sans(eq)

        def avant(sc):
            sc.play(FadeIn(R2), Create(c2), FadeIn(eq), run_time=0.6)

        def apres(sc):
            l0 = sc.ligne_rep(0, ["2 × 1 − 3", "= −1"])
            l1 = sc.ligne_rep(1, ["B :", "oublie le carré ;"])
            l2 = sc.ligne_rep(2, ["C :", "(2 × (−1))² − 3."])
            pt = Dot(R2.p(-1, -1), radius=0.11, color=VERT_OK, stroke_color=WHITE, stroke_width=2)
            sc.montre("2 fois 1", FadeIn(l0[0], shift=UP * 0.15), rt=0.35)
            sc.montre("égale moins 1", FadeIn(l0[1], scale=1.3), FadeIn(pt, scale=2), rt=0.35)
            sc.montre("B oublie", FadeIn(l1[0], shift=UP * 0.15), Create(sc.barrer_choix(1)), rt=0.35)
            sc.montre("oublie le carré", FadeIn(l1[1], shift=UP * 0.15), rt=0.35)
            sc.montre("et C", FadeIn(l2[0], shift=UP * 0.15), Create(sc.barrer_choix(2)), rt=0.35)
            sc.montre("2 fois moins", FadeIn(l2[1], shift=UP * 0.15), rt=0.35)
            sc.rep_fini()

        self.question_pause("09-question", "09b-reponse",
                            ["Sur y = 2x² − 3, le point", "d'abscisse −1 ?"],
                            [self.t(coord(-1, -1), 34), self.t(coord(-1, -5), 34), self.t(coord(-1, 1), 34)], 0,
                            ["2 × 1 − 3 = −1", "B : oublie le carré ;", "C : (2 × (−1))² − 3."],
                            mot_q="Sur la courbe", avant_q=avant, autres_r=apres)

    # ── 10 : défi : (4 ; 0) ? et l'abscisse 5 ───────────────────────────────
    def ecran_defi(self):
        self.ecran_g("10-defi", self.heros)
        R = self.R
        self.titre_d("À toi de jouer !", "À toi de jouer", fs=46)
        p4 = self.point(4, 0, AMBRE, 0.11)
        e4 = gras("?", 40, AMBRE).next_to(R.p(4, 0), UR, buff=0.12)
        L1 = self.ld([("(4 ; 0)", AMBRE), ("sur la courbe ?", WHITE)], 1.95, fs=44)
        self.jouer(L1, ["Le point 4", "est-il"], {0: [FadeIn(p4, scale=2), FadeIn(e4, scale=1.3)]})
        v = DashedLine(R.p(5, 0), R.p(5, -4.6), color=ORANGE_V, stroke_width=5, dash_length=0.1)
        q5 = gras("?", 40, ORANGE_V).next_to(R.p(5, -2.3), RIGHT, buff=0.12)
        L2 = self.ld([("x = 5", ORANGE_V), ("→ y = ?", WHITE)], 0.75, fs=44)
        self.jouer(L2, ["abscisse 5", None], {0: [Create(v), FadeIn(q5, scale=1.3)]})
        self.pause_defi(y=-0.75)

    def ecran_correction(self):
        self.ecran_g("10b-correction", self.heros)
        R = self.R
        tit = sans(self.t("Correction", 46, JAUNE_TITRE))
        self.col(tit, 3.1, self.XD)
        self.add(tit)
        L1 = self.ld([("−16 + 16", BLEU_CALCUL), ("= 0", VERT_OK)], 2.15, fs=46)
        self.jouer(L1, ["Moins 16", "égale 0"])
        ok = self.coche(VERT_OK, 0.26).next_to(L1, RIGHT, buff=0.3)
        self.play(Create(ok), run_time=0.3)
        p4 = self.point(4, 0, VERT_OK, 0.11)
        L2 = self.ld([("(4 ; 0) :", VERT_OK), ("la fin du saut", AMBRE)], 1.25, fs=40)
        self.jouer(L2, ["le point 4", "la fin du saut"], {0: [FadeIn(p4, scale=2)]})
        self.sauter(0, 4, rt=1.0)
        L3 = self.ld([("x = 5 :", ORANGE_V), ("−25 + 20", BLEU_CALCUL), ("= −5", VERT_OK)], 0.05, fs=44)
        self.jouer(L3, ["Pour 5", "moins 25", "égale moins 5"])
        p5 = self.point(5, -5, VERT_OK, 0.11)
        e5 = self.etiq2(5, -5, VERT_OK, LEFT)
        L4 = self.ld([("le point", WHITE), ("(5 ;", VERT_OK), ("−5)", VERT_OK)], -0.95, fs=44)
        L4[2].shift(LEFT * 0.08)
        self.jouer(L4, ["C'est le point", None, None],
                   {1: [FadeIn(p5, scale=2), FadeIn(e5[0], scale=1.2)], 2: [FadeIn(e5[1], scale=1.2)]})
        self.play(Create(self.cadre(VGroup(L4[1], L4[2]))), run_time=0.3)
        self.attendre_voix()

    # ── 11 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("11-finale", 0.65)
        fig = VGroup(self.R, self.courbe, self.heros)
        self.add(fig)
        self.XL = -0.9  # figure plus petite : le texte gagne de la place (24/11)
        lignes = self.finale_colonne(figure=fig, textes=[
            ("Un point est sur la courbe", "si ses coordonnées", "vérifient l'équation."),
            ("On remplace x par l'abscisse,", "on calcule,", "on compare à l'ordonnée."),
            ("Le carré passe avant", "le signe moins.")], fs=40)
        self.au_mot("Un point est")
        self.montrer_ligne(lignes[0], Indicate(self.courbe, color=WHITE))
        self.au_mot("On remplace")
        self.montrer_ligne(lignes[1])
        self.au_mot("Et le carré")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        ecrans = [self.page_de_garde, self.ecran_situation, self.ecran_question_du_jour, self.ecran_remplacer,
                  self.ecran_comparer, self.ecran_regle, self.ecran_question1, self.ecran_piege,
                  self.ecran_coordonnees, self.ecran_question2, self.ecran_defi, self.ecran_correction,
                  self.ecran_finale]
        if os.environ.get("GARDE_SEULE") == "1":  # la garde STMG seule (voir l'en-tête)
            ecrans[0]()
            return
        for e in ecrans:
            e()
        ecran_fin(self, "paysage", voix="12-abonne")


class GraphLyceeAppartenancePremiere(GraphLyceeAppartenanceBase):
    identite = "Maths 1re — EleveAI"
    ceinture = "jaune"


class GraphLyceeAppartenanceStmg(GraphLyceeAppartenanceBase):
    identite = "Maths STMG — EleveAI"
    ceinture = "jaune"
