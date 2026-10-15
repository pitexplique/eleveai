# proba_comparer.py
# EleveAI — Maths 4e — Probabilités, épisode 7 : comparer des probabilités, AVEC VOIX.
# Paysage 16:9, CEINTURE ORANGE. Short jumeau : proba_comparer_short.py (ceinture jaune).
#
# ⭐ LE DESSIN QUI PORTE TOUT : deux bassins de pêche aux canards à la kermesse
# (stand A : 10 canards dont 3 gagnants marqués d'une étoile ; stand B : 20 dont 5),
# puis deux JAUGES de pourcentage côte à côte (30 % contre 25 %), une balance
# qui penche, deux bandes 6/20 et 5/20 ; le défi avec deux sacs de billes.
#
# Voix : manim/voix/4e-proba-comparer.json (Julie, débit −7).
# Rendu : python -m manim render -qh --disable_caching manim/scripts/4e/proba_comparer.py ProbaComparer4e -o eleveai-maths-4e-proba-comparer --media_dir manim/scripts/4e/media
# Puis copier le mp4 dans manim/sorties/4e/maths/probabilites/07-comparer/.

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
from annonce_probabilites import BILLE_BLEUE, BILLE_ROUGE, bille, sac_vide  # noqa: E402

JAUNE_CANARD = "#FACC15"
BORD_CANARD = "#A16207"
BEC = "#F97316"
ETOILE = "#DC2626"
EAU = "#0EA5E9"
EAU_BORD = "#7DD3FC"


class Notion4e(Notion6e):
    identite = "Maths 4e — EleveAI"


def P(x, y):
    return np.array([x, y, 0.0])


# ── les dessins communs (paysage et short) ──────────────────────────────────

def etoile(r=0.11, couleur=ETOILE):
    return Star(n=5, outer_radius=r, inner_radius=r * 0.42, fill_color=couleur, fill_opacity=1,
                stroke_color=WHITE, stroke_width=1)


def canard(s=1.0, gagnant=False, visible_etoile=True):
    """Un canard en plastique vu de profil ; un gagnant porte une étoile rouge."""
    queue = Polygon(P(-0.27, 0.03), P(-0.42, 0.17), P(-0.22, 0.12), fill_color=JAUNE_CANARD,
                    fill_opacity=1, stroke_color=BORD_CANARD, stroke_width=2)
    corps = Ellipse(width=0.62, height=0.36, fill_color=JAUNE_CANARD, fill_opacity=1,
                    stroke_color=BORD_CANARD, stroke_width=2)
    tete = Circle(radius=0.13, fill_color=JAUNE_CANARD, fill_opacity=1, stroke_color=BORD_CANARD,
                  stroke_width=2).move_to(P(0.2, 0.22))
    bec = Polygon(P(0.31, 0.25), P(0.45, 0.2), P(0.31, 0.16), fill_color=BEC, fill_opacity=1,
                  stroke_color=BEC, stroke_width=1)
    oeil = Dot(P(0.23, 0.26), radius=0.025, color="#111827")
    g = VGroup(queue, corps, tete, bec, oeil)
    if gagnant:
        e = etoile(0.15).move_to(P(-0.04, -0.02))
        if not visible_etoile:
            e.set_opacity(0)
        g.add(e)
    return g.scale(s)


def rangs_gagnants(n, g):
    """Les places des gagnants, réparties dans le bassin (pas tous au même bout)."""
    return {int((k + 0.5) * n / g) for k in range(g)}


def bassin(n, g, cols, s=1.0, etoiles_visibles=True):
    """Un bassin d'eau : [eau, canards]. Les gagnants portent une étoile."""
    rows = math.ceil(n / cols)
    dx, dy = 0.8, 0.56
    larg, haut = cols * dx + 0.4, rows * dy + 0.4
    eau = RoundedRectangle(width=larg, height=haut, corner_radius=0.3, fill_color=EAU, fill_opacity=0.35,
                           stroke_color=EAU_BORD, stroke_width=3)
    vagues = VGroup(*[Arc(radius=0.12, start_angle=PI, angle=-PI, stroke_color=EAU_BORD, stroke_width=1.5,
                          stroke_opacity=0.6).move_to(P(-larg / 2 + 0.3 + 0.5 * k, -haut / 2 + 0.12))
                      for k in range(int((larg - 0.4) / 0.5))])
    gagn = rangs_gagnants(n, g)
    canards = VGroup()
    for k in range(n):
        r, c = divmod(k, cols)
        x = -larg / 2 + 0.2 + dx * (c + 0.5)
        y = haut / 2 - 0.2 - dy * (r + 0.5)
        canards.add(canard(1.0, k in gagn, etoiles_visibles).move_to(P(x, y)))
    return VGroup(eau, canards, vagues).scale(s)


def etoiles_de(b):
    """Les étoiles des canards gagnants d'un bassin."""
    return VGroup(*[c[5] for c in b[1] if len(c) > 5])


def flotter(groupe, amp=0.035, vitesse=3.0):
    """Les canards dodelinent sur l'eau (updater par décalage, chacun son rythme)."""
    for i, m in enumerate(groupe):
        etat = {"t": i * 0.7, "y": 0.0}

        def maj(mob, dt, etat=etat):
            etat["t"] += dt
            y = amp * math.sin(etat["t"] * vitesse)
            mob.shift(UP * (y - etat["y"]))
            etat["y"] = y

        m.add_updater(maj)


def arreter(groupe):
    for m in groupe:
        m.clear_updaters()


def jauge(pct, h=3.4, w=0.85, couleur=VERT_OK):
    """Une jauge verticale de 0 à 100 % : [cadre, graduations, remplissage]."""
    cadre = Rectangle(width=w, height=h, stroke_color=WHITE, stroke_width=3)
    grad = VGroup(*[Line(P(-w / 2, -h / 2 + h * k / 10), P(-w / 2 + (0.22 if k % 5 else 0.36), -h / 2 + h * k / 10),
                         stroke_color=GREY_B, stroke_width=2) for k in range(1, 10)])
    rempli = Rectangle(width=w, height=max(h * pct / 100, 0.01), stroke_width=0, fill_color=couleur,
                       fill_opacity=0.85)
    rempli.move_to(P(0, -h / 2 + rempli.height / 2))
    return VGroup(cadre, grad, rempli)


def bande(parts, largeur=6.0, hauteur=0.6):
    cw = largeur / parts
    return VGroup(*[Rectangle(width=cw, height=hauteur, stroke_width=2, stroke_color=WHITE,
                              fill_color=JAUNE_CANARD, fill_opacity=0).move_to(P(-largeur / 2 + cw * (i + 0.5), 0))
                    for i in range(parts)])


def sac_billes(rouges, bleues, larg=2.4, haut=2.4, cols=3, r=0.24):
    """Un sac transparent et ses billes : [sac, billes] (les rouges d'abord)."""
    sac = sac_vide(larg, haut)
    n = rouges + bleues
    rows = math.ceil(n / cols)
    billes = VGroup()
    for k in range(n):
        rr, c = divmod(k, cols)
        dans_rang = min(cols, n - rr * cols)
        x = (c - (dans_rang - 1) / 2) * (2 * r + 0.14)
        y = -haut / 2 + 0.45 + rr * (2 * r + 0.12)
        billes.add(bille(BILLE_ROUGE if k < rouges else BILLE_BLEUE, r).move_to(P(x, y)))
    return VGroup(sac, billes)


class DessinsComparer:
    def t(self, texte, font_size=36, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def ligne(self, morceaux, font_size=40, buff=0.22):
        g = VGroup()
        for m, c in morceaux:
            g.add(m if isinstance(m, Mobject) else self.t(m, font_size, c))
        return g.arrange(RIGHT, buff=buff)

    def insister(self, mob, run_time=0.4):
        self.play(mob.animate.scale(1.5), run_time=run_time)
        self.play(mob.animate.scale(1 / 1.5), run_time=run_time)

    def barrer(self, mob, color=ROUGE_ERREUR):
        return Line(mob.get_corner(DL) + LEFT * 0.08, mob.get_corner(UR) + RIGHT * 0.08,
                    stroke_width=6, color=color)


class ProbaComparer4e(DessinsComparer, Notion4e):
    nom_voix = "4e-proba-comparer"

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("Comparer des probabilités", 52, JAUNE_TITRE).to_edge(UP, buff=0.7)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.25)
        ech = echelle_ceintures("orange").move_to(P(-0.6, -2.5))
        a = bassin(10, 3, 5, 0.62).move_to(P(-4.2, -0.35))
        b = bassin(20, 5, 10, 0.62).move_to(P(1.4, -0.35))
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech), run_time=1.0)
        self.play(FadeIn(a, shift=UP * 0.2), FadeIn(b, shift=UP * 0.2), run_time=0.6)
        flotter(a[1])
        flotter(b[1])
        self.au_mot("Quel jeu")
        q = self.t("Quel jeu est le plus favorable ?", 42, BLEU_CALCUL).move_to(P(-0.6, 0.95))
        self.play(FadeIn(q, scale=0.8), run_time=0.5)
        self.insister(q, 0.35)
        self.attendre_voix(marge=1.0)
        arreter(a[1])
        arreter(b[1])

    # ── 01 : la kermesse ────────────────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.titre_ecran("La pêche aux canards de la kermesse")
        a = bassin(10, 3, 5, 0.85, etoiles_visibles=False).move_to(P(-4.8, 0.95))
        b = bassin(20, 5, 10, 0.85, etoiles_visibles=False).move_to(P(1.35, 0.95))
        la = self.t("Stand A", 36, JAUNE_TITRE).next_to(a, UP, buff=0.22)
        lb = self.t("Stand B", 36, JAUNE_TITRE).next_to(b, UP, buff=0.22)
        for bx in (a, b):
            bx[1].set_opacity(0)
            for c in bx[1]:
                c.set_opacity(0)

        self.au_mot("deux stands")
        self.play(FadeIn(a[0]), FadeIn(a[2]), FadeIn(b[0]), FadeIn(b[2]), run_time=0.6)

        self.au_mot("Stand A : 10")
        self.play(FadeIn(la), run_time=0.3)
        ca = self.ligne([("10", JAUNE_TITRE), ("canards", WHITE)], 34, 0.15).next_to(a, DOWN, buff=0.35)
        self.play(LaggedStart(*[c[:5].animate.set_opacity(1) for c in a[1]], lag_ratio=0.1),
                  FadeIn(ca), run_time=1.0)
        flotter(a[1])
        self.au_mot("dont 3")
        ga = self.ligne([("dont", WHITE), ("3", JAUNE_TITRE), (etoile(0.16), None), ("gagnants", WHITE)], 34, 0.15)
        ga.next_to(ca, DOWN, buff=0.25)
        ea = etoiles_de(a)
        self.play(*[e.animate.set_opacity(1) for e in ea], FadeIn(ga), run_time=0.6)
        self.play(*[Flash(e, color=ETOILE, line_length=0.15, flash_radius=0.2) for e in ea], run_time=0.5)

        self.au_mot("Stand B : 20")
        self.play(FadeIn(lb), run_time=0.3)
        cb = self.ligne([("20", JAUNE_TITRE), ("canards", WHITE)], 34, 0.15).next_to(b, DOWN, buff=0.35)
        self.play(LaggedStart(*[c[:5].animate.set_opacity(1) for c in b[1]], lag_ratio=0.06),
                  FadeIn(cb), run_time=1.2)
        flotter(b[1])
        self.au_mot("dont 5")
        gb = self.ligne([("dont", WHITE), ("5", JAUNE_TITRE), (etoile(0.16), None), ("gagnants", WHITE)], 34, 0.15)
        gb.next_to(cb, DOWN, buff=0.25)
        eb = etoiles_de(b)
        self.play(*[e.animate.set_opacity(1) for e in eb], FadeIn(gb), run_time=0.6)
        self.play(*[Flash(e, color=ETOILE, line_length=0.15, flash_radius=0.2) for e in eb], run_time=0.5)

        self.au_mot("Le stand B a plus")
        plus = self.ligne([("5", JAUNE_TITRE), (etoile(0.2), None), (">", BLEU_CALCUL), ("3", JAUNE_TITRE),
                           (etoile(0.2), None)], 48, 0.2).move_to(P(-0.6, -1.75))
        self.play(FadeIn(plus, scale=0.7), run_time=0.5)
        self.insister(plus, 0.35)
        self.au_mot("Faut-il")
        self.play(Write(self.chute("Faut-il aller au stand B ?", color=BLEU_CALCUL, font_size=38)),
                  Wiggle(lb), run_time=1.0)
        self.attendre_voix()
        arreter(a[1])
        arreter(b[1])

    # ── 02 : on calcule ─────────────────────────────────────────────────────

    def ecran_calcul(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-calcul")
        self.titre_ecran("On calcule")
        a = bassin(10, 3, 5, 0.55).move_to(P(-4.8, 1.45))
        b = bassin(20, 5, 5, 0.55).move_to(P(-4.8, -0.95))
        la = self.t("A", 34, JAUNE_TITRE).next_to(a, LEFT, buff=0.2)
        lb = self.t("B", 34, JAUNE_TITRE).next_to(b, LEFT, buff=0.2)
        self.add(a, b, la, lb)

        self.au_mot("Stand A : 3")
        fa = self.ligne([("Stand A :", WHITE), (self.fraction(3, 10, 46, JAUNE_TITRE), None)], 40, 0.3)
        fa.move_to(P(-0.6, 1.45))
        self.play(FadeIn(fa[0]), FadeIn(fa[1], shift=LEFT * 0.2), run_time=0.6)
        self.play(Indicate(etoiles_de(a), color=WHITE, scale_factor=1.6), run_time=0.6)

        self.au_mot("Stand B : 5")
        fb = self.ligne([("Stand B :", WHITE), (self.fraction(5, 20, 46, JAUNE_TITRE), None)], 40, 0.3)
        fb.move_to(P(-0.6, -0.95))
        self.play(FadeIn(fb[0]), FadeIn(fb[1], shift=LEFT * 0.2), run_time=0.6)
        self.play(Indicate(etoiles_de(b), color=WHITE, scale_factor=1.6), run_time=0.6)

        self.au_mot("Pour comparer")
        ja = jauge(0, 3.4, 0.8).move_to(P(3.0, 0.25))
        jb = jauge(0, 3.4, 0.8).move_to(P(4.5, 0.25))
        qa = self.t("? %", 32, BLEU_CALCUL).next_to(ja, UP, buff=0.15)
        qb = self.t("? %", 32, BLEU_CALCUL).next_to(jb, UP, buff=0.15)
        lja = self.t("A", 30, JAUNE_TITRE).next_to(ja, DOWN, buff=0.15)
        ljb = self.t("B", 30, JAUNE_TITRE).next_to(jb, DOWN, buff=0.15)
        self.play(Create(ja[0]), Create(jb[0]), FadeIn(ja[1]), FadeIn(jb[1]), FadeIn(lja), FadeIn(ljb), run_time=0.7)
        self.au_mot("en pourcentage")
        self.play(FadeIn(qa, scale=0.6), FadeIn(qb, scale=0.6), run_time=0.4)
        self.play(Write(self.chute("Pour comparer : en pourcentage.", color=BLEU_CALCUL, font_size=38)))
        self.insister(VGroup(qa, qb), 0.3)
        self.attendre_voix()

    # ── 03 : les pourcentages ───────────────────────────────────────────────

    def ecran_pourcentages(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-pourcentages")
        self.titre_ecran("En pourcentage")
        ja = jauge(30, 3.6, 0.85).move_to(P(3.0, 0.25))
        jb = jauge(25, 3.6, 0.85).move_to(P(4.5, 0.25))
        lja = self.t("A", 30, JAUNE_TITRE).next_to(ja, DOWN, buff=0.15)
        ljb = self.t("B", 30, JAUNE_TITRE).next_to(jb, DOWN, buff=0.15)
        self.add(ja[0], ja[1], jb[0], jb[1], lja, ljb)

        def calcul(lettre, a, b, dec, pct, y):
            morceaux = [self.t(f"{lettre} :", 40, JAUNE_TITRE), self.t(f"{a} ÷ {b}", 44),
                        self.t(f"= {dec}", 44), self.t(f"= {pct} %", 44, VERT_OK)]
            return VGroup(*morceaux).arrange(RIGHT, buff=0.3).move_to(P(-2.6, y)).align_to(P(-6.3, 0), LEFT)

        la = calcul("A", 3, 10, "0,3", 30, 1.5)
        lb = calcul("B", 5, 20, "0,25", 25, 0.2)

        self.au_mot("3 divisé par 10")
        self.play(FadeIn(la[0]), Write(la[1]), run_time=0.6)
        self.au_mot("égale 0,3")
        self.play(Write(la[2]), run_time=0.5)
        self.au_mot("30 %. 5")
        pa = self.t("30 %", 32, VERT_OK).next_to(ja, UP, buff=0.15)
        self.play(Write(la[3]), GrowFromEdge(ja[2], DOWN), FadeIn(pa), run_time=0.8)

        self.au_mot("5 divisé par 20")
        self.play(FadeIn(lb[0]), Write(lb[1]), run_time=0.6)
        self.au_mot("égale 0,25")
        self.play(Write(lb[2]), run_time=0.5)
        self.au_mot("25 %. 30")
        pb = self.t("25 %", 32, VERT_OK).next_to(jb, UP, buff=0.15)
        self.play(Write(lb[3]), GrowFromEdge(jb[2], DOWN), FadeIn(pb), run_time=0.8)

        self.au_mot("30 % est plus grand")
        comp = self.ligne([("30 %", VERT_OK), (">", WHITE), ("25 %", VERT_OK)], 56, 0.3).move_to(P(-2.4, -1.2))
        niveau = DashedLine(P(ja.get_left()[0] - 0.1, ja[2].get_top()[1]), P(jb.get_right()[0] + 0.1, ja[2].get_top()[1]),
                            color=BLEU_CALCUL, stroke_width=3)
        self.play(FadeIn(comp, scale=0.7), Create(niveau), run_time=0.6)
        self.insister(comp)

        self.au_mot("Le stand A est")
        cadre = SurroundingRectangle(VGroup(ja, pa, lja), color=VERT_OK, buff=0.12, stroke_width=4)
        self.play(Write(self.chute("Le stand A est plus favorable !", color=VERT_OK, font_size=40)),
                  Create(cadre), run_time=0.9)
        self.attendre_voix()

    # ── 04 : la méthode ─────────────────────────────────────────────────────

    def balance(self, ang, cx=4.25, cy=-0.55, la="", lb=""):
        """Une balance : le fléau tourne de `ang` (positif : le plateau gauche descend)."""
        pivot = P(cx, cy)
        demi = 1.25
        g = P(cx - demi * math.cos(ang), cy - demi * math.sin(ang))
        d = P(cx + demi * math.cos(ang), cy + demi * math.sin(ang))
        pied = VGroup(Line(pivot, P(cx, cy - 1.7), stroke_width=6, color=GREY_B),
                      Polygon(P(cx - 0.6, cy - 1.9), P(cx + 0.6, cy - 1.9), P(cx, cy - 1.6),
                              fill_color=GREY_B, fill_opacity=1, stroke_width=0))
        fleau = Line(g, d, stroke_width=7, color=WHITE)
        g_obj = VGroup(pied, fleau, Dot(pivot, radius=0.08, color=JAUNE_TITRE))
        for bout, lab in ((g, la), (d, lb)):
            fils = VGroup(Line(bout, bout + P(-0.4, -0.75)), Line(bout, bout + P(0.4, -0.75))).set_stroke(GREY_B, 2)
            plateau = Arc(radius=0.55, start_angle=PI, angle=PI, stroke_color=WHITE, stroke_width=4)
            plateau.move_to(bout + P(0, -0.88))
            g_obj.add(fils, plateau)
            if lab:
                g_obj.add(Text(lab, font_size=24, color=VERT_OK, weight=BOLD).move_to(bout + P(0, -1.42)))
        return g_obj

    def ecran_methode(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-methode")
        self.titre_ecran("La méthode")
        x0 = -6.3
        ang = ValueTracker(0.0)
        labels = {"a": "A", "b": "B"}
        bal = always_redraw(lambda: self.balance(ang.get_value(), la=labels["a"], lb=labels["b"]))
        self.add(bal)

        self.au_mot("calculer chaque")
        e1 = self.t("1. Calculer chaque probabilité.", 34).move_to(P(0, 2.3)).align_to(P(x0, 0), LEFT)
        self.play(FadeIn(e1, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("puis les écrire")
        e2 = self.t("2. Les écrire de la même façon :", 34).move_to(P(0, 1.35)).align_to(P(x0, 0), LEFT)
        self.play(FadeIn(e2, shift=RIGHT * 0.2), run_time=0.5)

        def forme(titre, contenu):
            tt = self.t(titre, 24, GREY_B)
            return VGroup(tt, contenu).arrange(DOWN, buff=0.18)

        f1 = forme("en pourcentage", self.ligne([("30 %", VERT_OK), ("et", WHITE), ("25 %", VERT_OK)], 32, 0.18))
        f2 = forme("en décimal", self.ligne([("0,3", VERT_OK), ("et", WHITE), ("0,25", VERT_OK)], 32, 0.18))
        f3 = forme("même dénominateur", self.ligne([(self.fraction(6, 20, 32, VERT_OK), None), ("et", WHITE),
                                                    (self.fraction(5, 20, 32, VERT_OK), None)], 32, 0.18))
        formes = VGroup(f1, f2, f3).arrange(RIGHT, buff=0.55, aligned_edge=UP)
        formes.move_to(P(0, 0.2)).align_to(P(x0 + 0.5, 0), LEFT)
        self.au_mot("En pourcentage")
        labels["a"], labels["b"] = "30 %", "25 %"
        self.play(FadeIn(f1, shift=UP * 0.2), run_time=0.5)
        self.au_mot("en décimal")
        self.play(FadeIn(f2, shift=UP * 0.2), run_time=0.5)
        self.au_mot("ou en fractions")
        self.play(FadeIn(f3, shift=UP * 0.2), run_time=0.5)

        self.au_mot("Ensuite seulement")
        e3 = self.t("3. Ensuite seulement, comparer.", 34, JAUNE_TITRE).move_to(P(0, -1.05)).align_to(P(x0, 0), LEFT)
        self.play(FadeIn(e3, shift=RIGHT * 0.2), run_time=0.5)
        self.play(ang.animate.set_value(0.28), run_time=1.0, rate_func=rate_functions.ease_out_bounce)
        bal.clear_updaters()
        self.insister(e3, 0.35)
        self.attendre_voix()

    # ── 05 : avec des fractions ─────────────────────────────────────────────

    def ecran_fractions(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-fractions")
        self.titre_ecran("Autre façon : même dénominateur")
        L, xb = 7.0, -2.2
        ba = bande(10, L).move_to(P(xb, 1.3))
        bb = bande(20, L).move_to(P(xb, -0.55))
        la = self.t("A", 34, JAUNE_TITRE).next_to(ba, LEFT, buff=0.25)
        lb = self.t("B", 34, JAUNE_TITRE).next_to(bb, LEFT, buff=0.25)

        self.au_mot("3 sur 10, c'est")
        fa = self.fraction(3, 10, 44, JAUNE_TITRE).next_to(ba, RIGHT, buff=0.5)
        self.play(FadeIn(la), Create(ba), run_time=0.5)
        self.play(LaggedStart(*[c.animate.set_fill(JAUNE_CANARD, 0.9) for c in ba[:3]], lag_ratio=0.2),
                  FadeIn(fa, shift=LEFT * 0.2), run_time=0.8)

        self.au_mot("c'est 6 sur 20")
        coupes = VGroup(*[Line(c.get_top(), c.get_bottom(), stroke_width=2, color=WHITE) for c in ba])
        eg = self.t("=", 44).next_to(fa, RIGHT, buff=0.25)
        f6 = self.fraction(6, 20, 44, VERT_OK).next_to(eg, RIGHT, buff=0.25)
        self.play(Create(coupes), run_time=0.7)
        self.play(FadeIn(eg), FadeIn(f6, shift=LEFT * 0.2), run_time=0.5)
        self.insister(f6, 0.35)

        self.au_mot("Et 6 sur 20")
        fb = self.fraction(5, 20, 44, JAUNE_TITRE).next_to(bb, RIGHT, buff=0.5)
        self.play(FadeIn(lb), Create(bb), run_time=0.5)
        self.play(LaggedStart(*[c.animate.set_fill(JAUNE_CANARD, 0.9) for c in bb[:5]], lag_ratio=0.12),
                  FadeIn(fb, shift=LEFT * 0.2), run_time=0.8)
        self.au_mot("plus grand que 5")
        x6 = ba[2].get_right()[0]
        x5 = bb[4].get_right()[0]
        t6 = DashedLine(P(x6, 1.75), P(x6, -1.0), color=VERT_OK, stroke_width=3)
        t5 = DashedLine(P(x5, -0.1), P(x5, -1.0), color=JAUNE_TITRE, stroke_width=3)
        comp = self.ligne([(self.fraction(6, 20, 48, VERT_OK), None), (">", WHITE),
                           (self.fraction(5, 20, 48, JAUNE_TITRE), None)], 56, 0.35).move_to(P(xb, -2.0))
        self.play(Create(t6), Create(t5), FadeIn(comp, scale=0.7), run_time=0.8)
        self.insister(comp[1], 0.3)

        self.au_mot("Même conclusion")
        self.play(Write(self.chute("Même conclusion : le stand A.", color=VERT_OK, font_size=38)))
        self.attendre_voix()

    # ── 06 : le piège ───────────────────────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-piege")
        self.titre_ecran("Le piège", font_size=44)
        s, dx = 0.8, 0.58
        x0 = -6.0

        def rang(n, g, y, par_rang=10):
            cs = VGroup()
            for k in range(n):
                r, c = divmod(k, par_rang)
                cs.add(canard(s, k < g).move_to(P(x0 + dx * c, y - 0.5 * r)))
            return cs

        ca = rang(10, 3, 1.5)
        cb = rang(20, 5, 0.1)
        la = self.t("A", 34, JAUNE_TITRE).next_to(ca, LEFT, buff=0.2)
        lb = self.t("B", 34, JAUNE_TITRE).next_to(cb[0], LEFT, buff=0.2)
        na = self.t("3", 44, JAUNE_TITRE).move_to(P(0.3, 1.5))
        nb = self.t("5", 44, JAUNE_TITRE).move_to(P(0.3, -0.15))

        self.au_mot("regarder seulement")
        self.play(FadeIn(la), FadeIn(lb), LaggedStart(*[FadeIn(c, shift=DOWN * 0.2) for c in ca[:3]], lag_ratio=0.2),
                  LaggedStart(*[FadeIn(c, shift=DOWN * 0.2) for c in cb[:5]], lag_ratio=0.15), run_time=1.0)
        self.play(FadeIn(na), FadeIn(nb), run_time=0.4)

        self.au_mot("5, c'est plus")
        comp = self.ligne([("5", JAUNE_TITRE), (">", BLEU_CALCUL), ("3", JAUNE_TITRE)], 60, 0.3).move_to(P(3.3, 1.3))
        donc = self.t("donc B ?", 44, BLEU_CALCUL).move_to(P(3.3, 0.2))
        self.play(FadeIn(comp, scale=0.7), run_time=0.5)
        self.play(FadeIn(donc), run_time=0.4)

        self.au_mot("Mais il faut")
        self.play(Create(self.barrer(donc)), donc.animate.set_color(ROUGE_ERREUR), run_time=0.5)
        self.play(LaggedStart(*[FadeIn(c) for c in ca[3:]], lag_ratio=0.08),
                  LaggedStart(*[FadeIn(c) for c in cb[5:]], lag_ratio=0.04), run_time=1.2)
        fa = self.fraction(3, 10, 40, JAUNE_TITRE).move_to(na)
        fb = self.fraction(5, 20, 40, JAUNE_TITRE).move_to(nb).shift(DOWN * 0.2)
        self.play(ReplacementTransform(na, fa), ReplacementTransform(nb, fb), run_time=0.6)
        ch = self.chute("Il faut regarder sur combien !", color=ORANGE_RETENUE, font_size=40)
        self.play(Write(ch), run_time=0.8)
        self.insister(ch, 0.35)
        self.attendre_voix()

    # ── 07 : le défi ────────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte()
        self.dire("07-defi")
        self.titre_ecran("À toi de jouer")
        sa = sac_billes(2, 3).move_to(P(-4.3, 0.8))
        sb = sac_billes(3, 5).move_to(P(-0.6, 0.8))
        for s in (sa, sb):
            s[1].set_opacity(0)
        self.play(FadeIn(sa[0], shift=UP * 0.2), FadeIn(sb[0], shift=UP * 0.2), run_time=0.6)

        self.au_mot("Tu veux une bille rouge")
        veux = self.ligne([("Tu veux une", BLEU_CALCUL), (bille(BILLE_ROUGE, 0.32), None)], 36, 0.25)
        veux.move_to(P(3.7, 1.8))
        self.play(FadeIn(veux, shift=DOWN * 0.2), run_time=0.5)
        self.insister(veux[1], 0.3)

        def montrer(sac, lettre, r, n, extrait):
            self.au_mot(extrait)
            nom = self.t(f"Sac {lettre}", 36, JAUNE_TITRE).next_to(sac, UP, buff=0.25)
            txt = VGroup(self.ligne([(str(r), JAUNE_TITRE), ("rouges", BILLE_ROUGE)], 32, 0.14),
                         self.ligne([("sur", WHITE), (str(n), JAUNE_TITRE), ("billes", WHITE)], 32, 0.14))
            txt.arrange(DOWN, buff=0.15).next_to(sac, DOWN, buff=0.3)
            hauts = [b.copy().shift(UP * 2.6).set_opacity(1) for b in sac[1]]
            self.play(FadeIn(nom), Indicate(sac[0], color=WHITE, scale_factor=1.08), run_time=0.4)
            self.play(LaggedStart(*[Transform(h, b.copy().set_opacity(1)) for h, b in zip(hauts, sac[1])],
                                  lag_ratio=0.12), FadeIn(txt), run_time=1.0, rate_func=rate_functions.ease_out_bounce)
            self.remove(*hauts)
            sac[1].set_opacity(1)
            self.add(sac[1])
            return txt

        montrer(sa, "A", 2, 5, "Sac A : 2")
        montrer(sb, "B", 3, 8, "Sac B : 3")

        self.au_mot("Quel sac")
        q = self.t("A ou B ?", 52, JAUNE_TITRE).move_to(P(3.7, 0.4))
        self.play(FadeIn(q, scale=0.7), Wiggle(sa), Wiggle(sb), run_time=0.9)
        self.au_mot("Mets pause")
        ch = self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=38)
        self.play(Write(ch), run_time=0.8)
        self.insister(ch, 0.35)
        self.attendre_voix(marge=2.5)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("07b-correction")
        self.titre_ecran("Correction")
        sa = sac_billes(2, 3).scale(0.55).move_to(P(-5.9, 1.0))
        sb = sac_billes(3, 5).scale(0.55).move_to(P(-5.9, -1.25))
        la = self.t("A", 32, JAUNE_TITRE).next_to(sa, UP, buff=0.1)
        lb = self.t("B", 32, JAUNE_TITRE).next_to(sb, UP, buff=0.1)
        self.add(sa, sb, la, lb)
        ja = jauge(40, 3.6, 0.8).move_to(P(3.0, 0.2))
        jb = jauge(37.5, 3.6, 0.8).move_to(P(4.5, 0.2))
        lja = self.t("A", 30, JAUNE_TITRE).next_to(ja, DOWN, buff=0.15)
        ljb = self.t("B", 30, JAUNE_TITRE).next_to(jb, DOWN, buff=0.15)
        self.add(ja[0], ja[1], jb[0], jb[1], lja, ljb)

        def calcul(a, b, dec, pct, y):
            g = VGroup(self.t(f"{a} ÷ {b}", 42), self.t(f"= {dec}", 42), self.t(f"= {pct} %", 42, VERT_OK))
            return g.arrange(RIGHT, buff=0.28).move_to(P(0, y)).align_to(P(-4.6, 0), LEFT)

        ca = calcul(2, 5, "0,4", "40", 0.85)
        cb = calcul(3, 8, "0,375", "37,5", -1.4)
        ca.align_to(cb, LEFT)

        self.au_mot("2 divisé par 5")
        self.play(Write(ca[0]), Indicate(sa[1][:2], color=WHITE, scale_factor=1.3), run_time=0.6)
        self.au_mot("égale 0,4")
        self.play(Write(ca[1]), run_time=0.5)
        self.au_mot("40 %")
        pa = self.t("40 %", 30, VERT_OK).next_to(ja, UP, buff=0.15)
        self.play(Write(ca[2]), GrowFromEdge(ja[2], DOWN), FadeIn(pa), run_time=0.8)

        self.au_mot("3 divisé par 8")
        self.play(Write(cb[0]), Indicate(sb[1][:3], color=WHITE, scale_factor=1.3), run_time=0.6)
        self.au_mot("égale 0,375")
        self.play(Write(cb[1]), run_time=0.5)
        self.au_mot("37,5 %")
        pb = self.t("37,5 %", 30, VERT_OK).next_to(jb, UP, buff=0.15)
        self.play(Write(cb[2]), GrowFromEdge(jb[2], DOWN), FadeIn(pb), run_time=0.8)
        self.play(Indicate(pa, color=WHITE, scale_factor=1.5), run_time=0.6)

        self.au_mot("Le sac A")
        cadre = SurroundingRectangle(VGroup(ja, pa, lja), color=VERT_OK, buff=0.12, stroke_width=4)
        self.play(Write(self.chute("Le sac A est plus favorable.", color=VERT_OK, font_size=40)), Create(cadre),
                  run_time=0.9)
        self.attendre_voix()

    # ── 08 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)))
        acquis = [
            ("on les calcule", "On calcule chaque probabilité."),
            ("on les écrit", "On les écrit de la même façon."),
            ("puis on compare", "Puis on compare."),
            ("Le nombre de gagnants", "Le nombre de gagnants seul ne suffit pas."),
        ]
        lignes = VGroup(*[VGroup(self.coche(), self.t(txt, 38)).arrange(RIGHT, buff=0.3) for _, txt in acquis])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.6)
        lignes.move_to(P(-0.8, 0.3))
        for (mot, _), l in zip(acquis, lignes):
            self.au_mot(mot)
            self.play(Create(l[0]), FadeIn(l[1], shift=RIGHT * 0.2), run_time=0.6)
        self.au_mot("L'épisode 8")
        self.play(Write(self.chute("Épisode 8 : le défi", color=VERT_OK, font_size=38)))
        self.attendre_voix(marge=1.0)

    # ── déroulé ─────────────────────────────────────────────────────────────

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_calcul()
        self.ecran_pourcentages()
        self.ecran_methode()
        self.ecran_fractions()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="09-abonne")
