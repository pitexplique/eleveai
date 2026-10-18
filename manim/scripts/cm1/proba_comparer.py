# proba_comparer.py
# EleveAI — Maths CM1 — série « Probabilités », épisode 3 : qui a le plus de
# chances ? (micro : probabilite_comparer), AVEC VOIX. Paysage 16:9,
# CEINTURE BLANCHE. Short jumeau : proba_comparer_short.py (5 fraises contre 2).
#
# ⭐ Les FIGURES DU COACH (lib/tutor-v4/components/ProbabilitesCanvas.tsx,
# banque cm1/maths/probabilites.bank.ts, micro probabilite_comparer,
# canvasUrne / billesVariablesCanvas) :
#   · « billes » : carte blanche, les objets en grille de
#     min(6, max(3, ⌈√n⌉)) colonnes, rangés couleur par couleur ; cercle de la
#     couleur du coach (#ef4444 rouge, #eab308 jaune, #22c55e vert), bord bleu
#     nuit, la lettre de la couleur en blanc cerclée de nuit (R, J, V) ;
#   · comme à l'épisode 1, la carte blanche EST le sac (col et lien) ; ici les
#     bonbons sont les billes du coach avec deux papillotes (fraise = R rouge,
#     citron = J jaune) ; le défi reprend les billes V / J.
# ⛔ PAS D'ÉCART (17/10) : un nombre n'apparaît qu'au moment où la voix le dit ;
# seuls les mots-étiquettes (fraise, citron, en tout…) s'écrivent en plus.
# CM1 : très peu de texte, gros caractères, le dessin porte tout.
#
# Écrans : 00 garde · 01 deux sacs (3 F + 1 C / 1 F + 3 C) · 02 comparer (4 et
# 4, puis 3 contre 1) · 03 la méthode (en tout, pareil, ceux que je veux) · 04
# autant (2 + 2 et 2 + 2) · 05 le piège (5 F + 20 C contre 2 F + 1 C) · 06 défi
# (sac rouge / sac bleu) · 06b correction · 07 ce que tu as appris · 08 abonnement.
#
# Voix : manim/voix/cm1-proba-comparer.json (débit −10).
# Rendu : python -m manim render -qh --disable_caching manim/scripts/cm1/proba_comparer.py ProbaComparerCM1 -o eleveai-maths-cm1-proba-comparer --media_dir manim/scripts/cm1/media
# Puis copier le mp4 dans manim/sorties/cm1/maths/probabilites/03-comparer/.

import math
import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "seconde"))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "annonce"))

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Notion6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

# les couleurs du coach (probabilites.bank.ts, COULEURS)
COACH = {"R": "#ef4444", "J": "#eab308", "V": "#22c55e", "B": "#3b82f6"}
NUIT = "#0f172a"
CARTE = "#f8fafc"
BORD = "#cbd5e1"
GOUT = {"R": "fraise", "J": "citron"}


class NotionCM1(Notion6e):
    identite = "Maths CM1 — EleveAI"


def P(x, y):
    return np.array([x, y, 0.0])


# ── les dessins du coach ────────────────────────────────────────────────────

def bille_coach(code, r=0.36):
    """Une bille du canvas « billes » : couleur du coach, bord nuit, lettre blanche cerclée de nuit."""
    c = Circle(radius=r, fill_color=COACH[code], fill_opacity=1, stroke_color=NUIT, stroke_width=3)
    lettre = Text(code, font_size=int(r * 80), color=WHITE, weight=BOLD).move_to(c)
    lettre.set_stroke(NUIT, width=2.5, background=True)
    return VGroup(c, lettre)


def bonbon(code, r=0.3):
    """Un bonbon : la bille du coach et ses deux papillotes (fraise R, citron J)."""
    b = bille_coach(code, r)
    pap = VGroup()
    for s in (-1, 1):
        pap.add(Polygon(P(s * r * 0.8, 0), P(s * r * 1.55, r * 0.55), P(s * r * 1.55, -r * 0.55),
                        fill_color=COACH[code], fill_opacity=1, stroke_color=NUIT, stroke_width=2.5))
    return VGroup(pap, b)


def colonnes(n):
    """La règle du coach : min(6, max(3, ⌈√n⌉)) colonnes."""
    return min(6, max(3, math.ceil(math.sqrt(n))))


class Sac:
    """Le sac du coach : la carte blanche du canvas « billes » + un col et un lien.
    `bord` colore le contour (sac rouge, sac bleu du défi)."""

    def __init__(self, centre, n, cell=1.0, bord=BORD, lien=ORANGE_RETENUE):
        self.cols, self.cell = colonnes(n), cell
        rows = math.ceil(n / self.cols)
        w, h = self.cols * cell + 0.5, rows * cell + 0.5
        self.w, self.h = w, h
        self.corps = RoundedRectangle(width=w, height=h, corner_radius=0.3, fill_color=CARTE, fill_opacity=1,
                                      stroke_color=bord, stroke_width=5)
        self.col = Polygon(P(-w * 0.2, h / 2 - 0.02), P(w * 0.2, h / 2 - 0.02), P(w * 0.11, h / 2 + 0.38),
                           P(-w * 0.11, h / 2 + 0.38), fill_color=CARTE, fill_opacity=1, stroke_color=bord,
                           stroke_width=5)
        noeud = Line(P(-w * 0.16, h / 2 + 0.16), P(w * 0.16, h / 2 + 0.16), color=lien, stroke_width=8)
        self.dessin = VGroup(self.col, self.corps, noeud).shift(centre)
        self.centre = np.array(centre, dtype=float)
        self.x0 = -self.cols * cell / 2 + cell / 2
        self.y0 = rows * cell / 2 - cell / 2
        self.haut = self.centre + P(0, h / 2 + 0.38)
        self.bas = self.centre + P(0, -h / 2)

    def place(self, i):
        return self.centre + P(self.x0 + (i % self.cols) * self.cell, self.y0 - (i // self.cols) * self.cell)

    def objets(self, codes, kind="bonbon", k=0.29):
        f = bonbon if kind == "bonbon" else bille_coach
        return VGroup(*[f(c, self.cell * k).move_to(self.place(i)) for i, c in enumerate(codes)])

    def bordure(self, color, width=7):
        """Le contour s'allume : un calque de traits seuls, posé PAR-DESSUS (les
        objets du sac restent visibles)."""
        calque = VGroup(self.corps.copy(), self.col.copy()).set_fill(opacity=0).set_stroke(color, width)
        return FadeIn(calque)


def codes(**n):
    """codes(R=3, J=1) -> ['R', 'R', 'R', 'J'] (rangés couleur par couleur, comme le coach)."""
    return [c for c, k in n.items() for _ in range(k)]


def compte(n, code, kind="bonbon", font_size=64, r=0.27):
    """« 3 » + l'objet : le nombre dit, à côté de son bonbon (ou de sa bille)."""
    f = bonbon if kind == "bonbon" else bille_coach
    nb = Text(str(n), font_size=font_size, color=COACH[code], weight=BOLD)
    return VGroup(nb, f(code, r)).arrange(RIGHT, buff=0.2 * r / 0.27)


def badge_total(n, font_size=40):
    """Le total d'un sac, dans une pastille bleue posée sur son coin."""
    t = Text(str(n), font_size=font_size, color=WHITE, weight=BOLD)
    c = Circle(radius=max(t.width, t.height) / 2 + 0.2, fill_color=BLEU_CALCUL, fill_opacity=1,
               stroke_color=WHITE, stroke_width=3)
    return VGroup(c, t.move_to(c))


def etiquette(texte, color, font_size=40, fg=BLACK):
    lbl = Text(texte, font_size=font_size, color=fg, weight=BOLD)
    fond = RoundedRectangle(width=lbl.width + 0.5, height=lbl.height + 0.36, corner_radius=0.15,
                            fill_color=color, fill_opacity=1, stroke_width=0)
    return VGroup(fond, lbl.move_to(fond))


XA, XB, YS = -4.1, 0.5, 0.35   # les deux sacs (Ti-Margo occupe le coin bas-droit)
Y_CPT = -1.75                  # la ligne des comptes, sous les sacs


class ProbaComparerCM1(NotionCM1):
    nom_voix = "cm1-proba-comparer"
    XC = -0.6

    def t(self, texte, font_size=40, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def insister(self, mob, run_time=0.35):
        self.play(mob.animate.scale(1.5), run_time=run_time)
        self.play(mob.animate.scale(1 / 1.5), run_time=run_time)

    def pulser(self, objs, k=1.35, run_time=0.25):
        self.play(*[o.animate.scale(k) for o in objs], run_time=run_time)
        self.play(*[o.animate.scale(1 / k) for o in objs], run_time=run_time)

    def deux_sacs(self, ca, cb, kind="bonbon", bord_a=BORD, bord_b=BORD, cell=1.05, xa=XA, xb=XB, y=YS):
        sa = Sac(P(xa, y), len(ca), cell, bord_a)
        sb = Sac(P(xb, y), len(cb), cell, bord_b)
        return sa, sa.objets(ca, kind), sb, sb.objets(cb, kind)

    def tomber(self, objs, run_time=0.25):
        for o in objs:
            self.play(FadeIn(o, shift=DOWN * 1.0), run_time=run_time)

    def ligne_comptes(self, s, items, kind="bonbon", y=Y_CPT, font_size=64):
        """Les comptes sous un sac : [(3, 'R'), (1, 'J')] -> deux groupes côte à côte."""
        g = VGroup(*[compte(n, c, kind, font_size) for n, c in items]).arrange(RIGHT, buff=0.55)
        return g.move_to(P(s.centre[0], y))

    def poser_total(self, s, n):
        b = badge_total(n).move_to(s.corps.get_corner(UL) + P(0.05, -0.05))
        self.play(GrowFromCenter(b), run_time=0.3)
        return b

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("Qui a le plus de chances ?", 58, JAUNE_TITRE).to_edge(UP, buff=0.6)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.25)
        ech = echelle_ceintures("blanche").move_to(P(self.XC, -2.75))
        sa, oa, sb, ob = self.deux_sacs(codes(R=3, J=1), codes(R=1, J=3), cell=0.8, xa=-3.6, xb=1.6, y=-0.2)
        q = self.t("?", 110, ORANGE_RETENUE).move_to(P(-1.0, -0.2))
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech),
                  FadeIn(sa.dessin), FadeIn(sb.dessin), run_time=1.0)
        self.play(LaggedStart(*[FadeIn(o, shift=DOWN * 0.8) for o in [*oa, *ob]], lag_ratio=0.12),
                  FadeIn(q, scale=0.5), run_time=1.0)
        self.attendre_voix(marge=0.8)

    # ── 01 : deux sacs de bonbons ───────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.titre_ecran("Deux sacs de bonbons", 48)
        sa, oa, sb, ob = self.deux_sacs(codes(R=3, J=1), codes(R=1, J=3))
        ca = self.ligne_comptes(sa, [(3, "R"), (1, "J")])
        cb = self.ligne_comptes(sb, [(1, "R"), (3, "J")])
        self.play(FadeIn(sa.dessin, shift=UP * 0.2), FadeIn(sb.dessin, shift=UP * 0.2), run_time=0.5)
        self.au_mot("3 bonbons à la fraise")
        self.tomber(oa[:3])
        self.play(FadeIn(ca[0], scale=0.5), run_time=0.3)
        self.au_mot("1 au citron")
        self.tomber(oa[3:])
        self.play(FadeIn(ca[1], scale=0.5), run_time=0.3)
        self.au_mot("1 à la fraise")
        self.tomber(ob[:1])
        self.play(FadeIn(cb[0], scale=0.5), run_time=0.3)
        self.au_mot("3 au citron")
        self.tomber(ob[1:])
        self.play(FadeIn(cb[1], scale=0.5), run_time=0.3)
        self.au_mot("Tu veux un bonbon")
        envie = bonbon("R", 0.6).move_to(P(4.5, 1.35))
        mot = self.t("fraise", 44, COACH["R"]).next_to(envie, DOWN, buff=0.25)
        self.play(FadeIn(envie, scale=0.4), FadeIn(mot, shift=UP * 0.15), run_time=0.5)
        self.insister(envie, 0.3)
        self.au_mot("Quel sac")
        q = self.t("?", 120, ORANGE_RETENUE).move_to(P(-1.8, 0.35))
        self.play(FadeIn(q, scale=0.5), Wiggle(VGroup(sa.dessin, oa)), Wiggle(VGroup(sb.dessin, ob)),
                  run_time=0.8)
        self.attendre_voix()

    # ── 02 : comparer ───────────────────────────────────────────────────────

    def ecran_comparer(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-comparer")
        self.titre_ecran("Je compare", 48)
        sa, oa, sb, ob = self.deux_sacs(codes(R=3, J=1), codes(R=1, J=3))
        self.add(sa.dessin, oa, sb.dessin, ob)
        self.au_mot("4 bonbons")
        for oo in (oa, ob):  # on compte : un, deux, trois, quatre
            for o in oo:
                self.play(o.animate.scale(1.3), run_time=0.09)
                self.play(o.animate.scale(1 / 1.3), run_time=0.09)
        ta, tb = badge_total(4).move_to(sa.corps.get_corner(UL)), badge_total(4).move_to(sb.corps.get_corner(UL))
        self.play(GrowFromCenter(ta), GrowFromCenter(tb), run_time=0.35)
        self.au_mot("3 à la fraise")
        ca = self.ligne_comptes(sa, [(3, "R")])
        self.play(FadeIn(ca, scale=0.5), run_time=0.3)
        self.pulser(oa[:3])
        self.au_mot("1 seul")
        cb = self.ligne_comptes(sb, [(1, "R")])
        self.play(FadeIn(cb, scale=0.5), run_time=0.3)
        self.pulser(ob[:1])
        self.au_mot("Le premier sac donne")
        self.play(sa.bordure(VERT_OK), VGroup(sb.dessin, ob, cb, tb).animate.set_opacity(0.45), run_time=0.5)
        plus = etiquette("plus de chances", VERT_OK, 40).move_to(P(XA, -2.85))
        self.play(GrowFromCenter(plus), run_time=0.4)
        self.insister(plus, 0.3)
        self.attendre_voix()

    # ── 03 : la méthode ─────────────────────────────────────────────────────

    def ecran_methode(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-methode")
        self.titre_ecran("Pour comparer", 48)
        sa, oa, sb, ob = self.deux_sacs(codes(R=3, J=1), codes(R=1, J=3), cell=0.85, xa=-4.8, xb=-0.9, y=0.5)
        self.play(FadeIn(VGroup(sa.dessin, oa, sb.dessin, ob), shift=UP * 0.2), run_time=0.5)
        XR = 3.6
        self.au_mot("en tout")
        cadres = VGroup(*[SurroundingRectangle(o, color=BLEU_CALCUL, buff=0.12, stroke_width=6) for o in (oa, ob)])
        e1 = etiquette("en tout", BLEU_CALCUL, 42, WHITE).move_to(P(XR, 2.0))
        self.play(Create(cadres), GrowFromCenter(e1), run_time=0.6)
        self.au_mot("Si c'est pareil")
        egal = self.t("=", 100, BLEU_CALCUL).move_to(P(-2.85, 0.5))
        e2 = etiquette("pareil", BLEU_CALCUL, 42, WHITE).move_to(P(XR, 0.8))
        self.play(FadeIn(egal, scale=0.5), GrowFromCenter(e2), run_time=0.5)
        self.insister(egal, 0.25)
        self.au_mot("je compte ceux")
        e3 = VGroup(etiquette("ceux que je veux", COACH["R"], 36, WHITE), bonbon("R", 0.3)).arrange(RIGHT, buff=0.25)
        e3.move_to(P(XR, -0.4))
        ronds = VGroup(*[Circle(radius=0.36, color=JAUNE_TITRE, stroke_width=6).move_to(o)
                         for o in [*oa[:3], ob[0]]])
        self.play(FadeOut(cadres), GrowFromCenter(e3), run_time=0.4)
        for r in ronds:
            self.play(Create(r), run_time=0.22)
        self.au_mot("Plus il y en a")
        self.pulser(oa[:3], 1.4, 0.3)
        self.au_mot("plus j'ai de chances")
        plus = etiquette("plus de chances", VERT_OK, 40).move_to(P(-4.8, -1.75))
        self.play(sa.bordure(VERT_OK), GrowFromCenter(plus), run_time=0.5)
        self.insister(plus, 0.3)
        self.attendre_voix()

    # ── 04 : autant de chances ──────────────────────────────────────────────

    def ecran_autant(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-autant")
        self.titre_ecran("Autant ?", 48)
        sa, oa, sb, ob = self.deux_sacs(codes(R=2, J=2), codes(R=2, J=2))
        self.add(sa.dessin, sb.dessin)
        self.au_mot("2 fraises")
        fa, fb = self.ligne_comptes(sa, [(2, "R")]), self.ligne_comptes(sb, [(2, "R")])
        self.play(*[FadeIn(o, shift=DOWN * 1.0) for o in [*oa[:2], *ob[:2]]], FadeIn(fa, scale=0.5),
                  FadeIn(fb, scale=0.5), run_time=0.5)
        self.au_mot("2 citrons")
        self.play(*[FadeIn(o, shift=DOWN * 1.0) for o in [*oa[2:], *ob[2:]]], run_time=0.5)
        ja, jb = compte(2, "J"), compte(2, "J")
        self.play(fa.animate.shift(LEFT * 0.95), fb.animate.shift(LEFT * 0.95), run_time=0.25)
        ja.next_to(fa, RIGHT, buff=0.55)
        jb.next_to(fb, RIGHT, buff=0.55)
        self.play(FadeIn(ja, scale=0.5), FadeIn(jb, scale=0.5), run_time=0.3)
        self.au_mot("Autant de fraises")
        egal = self.t("=", 100, ORANGE_RETENUE).move_to(P((XA + XB) / 2, YS))
        self.play(FadeIn(egal, scale=0.5), run_time=0.3)
        self.pulser([*oa[:2], *ob[:2]], 1.4, 0.3)
        self.au_mot("autant de bonbons en tout")
        cadres = VGroup(*[SurroundingRectangle(o, color=BLEU_CALCUL, buff=0.12, stroke_width=6) for o in (oa, ob)])
        self.play(Create(cadres), run_time=0.5)
        self.au_mot("autant de chances")
        aut = etiquette("autant de chances", ORANGE_RETENUE, 42).move_to(P((XA + XB) / 2, -2.9))
        self.play(FadeOut(cadres), sa.bordure(ORANGE_RETENUE), sb.bordure(ORANGE_RETENUE), GrowFromCenter(aut),
                  run_time=0.5)
        self.insister(aut, 0.3)
        self.attendre_voix()

    # ── 05 : le piège ───────────────────────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-piege")
        self.titre_ecran("Le piège", 48)
        grand = Sac(P(-4.0, -0.1), 25, 0.6)
        og = grand.objets(codes(R=5, J=20))
        petit = Sac(P(1.6, 1.15), 3, 0.95)
        op = petit.objets(codes(R=2, J=1))
        self.play(FadeIn(grand.dessin, shift=UP * 0.2), FadeIn(petit.dessin, shift=UP * 0.2), run_time=0.5)
        cg = self.ligne_comptes(grand, [(5, "R"), (20, "J")], y=-2.5)
        cp = self.ligne_comptes(petit, [(2, "R"), (1, "J")], y=-0.15)
        self.au_mot("5 fraises")
        self.play(LaggedStart(*[FadeIn(o, shift=DOWN * 0.8) for o in og[:5]], lag_ratio=0.15),
                  FadeIn(cg[0], scale=0.5), run_time=0.7)
        self.au_mot("20 citrons")
        self.play(LaggedStart(*[FadeIn(o, shift=DOWN * 0.8) for o in og[5:]], lag_ratio=0.06),
                  FadeIn(cg[1], scale=0.5), run_time=1.2)
        self.au_mot("2 fraises")
        self.play(LaggedStart(*[FadeIn(o, shift=DOWN * 0.8) for o in op[:2]], lag_ratio=0.3),
                  FadeIn(cp[0], scale=0.5), run_time=0.5)
        self.au_mot("1 citron")
        self.play(FadeIn(op[2], shift=DOWN * 0.8), FadeIn(cp[1], scale=0.5), run_time=0.4)
        self.au_mot("5, c'est plus")
        cmp_ = self.t("5 > 2", 72, WHITE).move_to(P(1.6, -1.35))
        cmp_[0].set_color(COACH["R"])
        cmp_[2].set_color(COACH["R"])
        self.play(Indicate(cg[0], color=WHITE, scale_factor=1.3), Indicate(cp[0], color=WHITE, scale_factor=1.3),
                  FadeIn(cmp_, scale=0.6), run_time=0.6)
        self.au_mot("surtout des citrons")
        self.pulser(og[5:], 1.3, 0.3)
        st = self.t("surtout des citrons !", 40, COACH["J"])
        fl = Arrow(P(0.0, 0), P(-1.5, 0), buff=0, color=COACH["J"], stroke_width=6)
        sc = VGroup(fl, st).arrange(RIGHT, buff=0.2)
        sc.shift(P(-2.05, -1.35) - fl.get_end())
        self.play(FadeOut(cmp_), FadeIn(sc, shift=LEFT * 0.2), run_time=0.4)
        self.insister(cg[1], 0.3)
        self.au_mot("Le petit sac donne")
        plus = etiquette("plus de chances", VERT_OK, 40).move_to(P(1.6, -2.5))
        self.play(petit.bordure(VERT_OK), GrowFromCenter(plus), run_time=0.5)
        self.pulser(op[:2], 1.4, 0.3)
        self.insister(plus, 0.3)
        self.attendre_voix()

    # ── 06 : défi ───────────────────────────────────────────────────────────

    def scene_defi(self):
        sa, oa, sb, ob = self.deux_sacs(codes(V=2, J=2), codes(V=3, J=1), "bille", COACH["R"], COACH["B"])
        la = self.t("sac rouge", 36, COACH["R"]).move_to(P(XA, -1.35))
        lb = self.t("sac bleu", 36, COACH["B"]).move_to(P(XB, -1.35))
        lb.shift(UP * (la[0].get_bottom()[1] - lb[0].get_bottom()[1]))  # même ligne de base
        ca = self.ligne_comptes(sa, [(2, "V"), (2, "J")], "bille", y=-2.15, font_size=56)
        cb = self.ligne_comptes(sb, [(3, "V"), (1, "J")], "bille", y=-2.15, font_size=56)
        return sa, oa, sb, ob, la, lb, ca, cb

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("06-defi")
        self.play(Write(self.t("À toi de jouer", 48, JAUNE_TITRE).to_edge(UP)))
        sa, oa, sb, ob, la, lb, ca, cb = self.scene_defi()
        self.au_mot("Sac rouge")
        self.play(FadeIn(sa.dessin, shift=UP * 0.2), FadeIn(la), run_time=0.4)
        self.au_mot("2 billes vertes")
        self.play(*[FadeIn(o, shift=DOWN) for o in oa[:2]], FadeIn(ca[0], scale=0.5), run_time=0.4)
        self.au_mot("2 billes jaunes")
        self.play(*[FadeIn(o, shift=DOWN) for o in oa[2:]], FadeIn(ca[1], scale=0.5), run_time=0.4)
        self.au_mot("Sac bleu")
        self.play(FadeIn(sb.dessin, shift=UP * 0.2), FadeIn(lb), run_time=0.4)
        self.au_mot("3 billes vertes")
        self.play(*[FadeIn(o, shift=DOWN) for o in ob[:3]], FadeIn(cb[0], scale=0.5), run_time=0.4)
        self.au_mot("1 bille jaune")
        self.play(FadeIn(ob[3], shift=DOWN), FadeIn(cb[1], scale=0.5), run_time=0.4)
        self.au_mot("Pour tirer une verte")
        v = bille_coach("V", 0.55).move_to(P(4.3, 1.4))
        q = self.t("?", 96, ORANGE_RETENUE).next_to(v, RIGHT, buff=0.25)
        self.play(FadeIn(v, scale=0.4), FadeIn(q), run_time=0.4)
        self.insister(v, 0.3)
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=40)))
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("06b-correction")
        self.titre_ecran("Correction", 48)
        sa, oa, sb, ob, la, lb, ca, cb = self.scene_defi()
        self.add(sa.dessin, oa, sb.dessin, ob, la, lb)
        self.au_mot("4 billes")
        for oo in (oa, ob):
            for o in oo:
                self.play(o.animate.scale(1.3), run_time=0.08)
                self.play(o.animate.scale(1 / 1.3), run_time=0.08)
        ta, tb = badge_total(4).move_to(sa.corps.get_corner(UL)), badge_total(4).move_to(sb.corps.get_corner(UL))
        self.play(GrowFromCenter(ta), GrowFromCenter(tb), run_time=0.35)
        self.au_mot("3 vertes")
        self.play(FadeIn(cb[0], scale=0.5), run_time=0.3)
        self.pulser(ob[:3])
        self.au_mot("seulement 2")
        self.play(FadeIn(ca[0], scale=0.5), run_time=0.3)
        self.pulser(oa[:2])
        self.au_mot("Je choisis le sac bleu")
        ok = self.coche(taille=0.5).move_to(P(3.4, 0.4))
        self.play(sb.bordure(VERT_OK, 9), VGroup(sa.dessin, oa, la, ca[0], ta).animate.set_opacity(0.45),
                  Create(ok), run_time=0.5)
        self.insister(VGroup(sb.dessin, ob), 0.3)
        self.attendre_voix()

    # ── 07 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-finale")
        self.play(Write(self.t("Ce que tu as appris", 46, JAUNE_TITRE).to_edge(UP)))
        acquis = [("je regarde d'abord", "D'abord : combien en tout ?", WHITE),
                  ("Puis je compte", "Puis : ceux que je veux.", WHITE),
                  ("Attention", "Beaucoup : pas toujours plus de chances !", ORANGE_RETENUE)]
        lignes = VGroup(*[VGroup(self.coche(), self.t(txt, 46, c)).arrange(RIGHT, buff=0.3) for _, txt, c in acquis])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.5)
        if lignes.width > 11.5:
            lignes.scale_to_fit_width(11.5)
        lignes.move_to(P(self.XC, 1.25))
        grand = Sac(P(-3.2, -1.6), 25, 0.32)
        og = grand.objets(codes(R=5, J=20))
        petit = Sac(P(0.0, -1.35), 3, 0.55)
        op = petit.objets(codes(R=2, J=1))
        for k, ((ex, _, _), l) in enumerate(zip(acquis, lignes)):
            self.au_mot(ex)
            self.play(FadeIn(l[1], shift=RIGHT * 0.2), run_time=0.5)
            self.play(Create(l[0]), run_time=0.35)
            if k == 2:
                self.play(FadeIn(VGroup(grand.dessin, og, petit.dessin, op), shift=UP * 0.2), run_time=0.5)
                self.play(petit.bordure(VERT_OK), run_time=0.3)
                self.pulser(op[:2], 1.4, 0.25)
        self.au_mot("L'épisode 4")
        self.play(Write(self.chute("Épisode 4 : la roue, le dé et le sac", color=VERT_OK, font_size=40)))
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_comparer()
        self.ecran_methode()
        self.ecran_autant()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="08-abonne")
