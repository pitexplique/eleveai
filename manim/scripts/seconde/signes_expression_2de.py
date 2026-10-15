# signes_expression_2de.py
# EleveAI — Maths seconde — Signe d'une expression et tableau de signes
# (notion signes_expression_2de), AVEC VOIX. CEINTURE VERTE.
#
# ⭐ 11/10/2026 : demandée par Frédéric avec « la mer négatif et l'air
# positif ». L'image : le saut d'un dauphin au large de Saint-Leu, altitude
# h(t) = (3 − t)(t − 1) sur [0 ; 4]. Sous l'eau : −, dans l'air : +.
# Voix validée : manim/voix/seconde-signes-expression.json (débit −4, lycée).
#
# ⭐ LES CEINTURES (Frédéric, 11/10) : chaque vidéo affiche son niveau, de la
# blanche à la noire. Celle-ci est VERTE (produit, quotient, défi). La blanche
# est le short purement visuel du dauphin (signes_short_dauphin.py).
#
# ⭐ LES COULEURS DES SIGNES SONT CELLES DU DAUPHIN : « + » en bleu (dans
# l'air), « − » en orange (sous l'eau). Le même code dans les deux vidéos.
#
# Mapping micro-compétences (coach 2de) → écrans :
# - signes_premier_degre       → 04-premier-degre
# - signes_produit             → 05-placer, 06-produit, 06b-verifier
# - signes_quotient            → 09-quotient, 09b-quotient-signes
# - signes_resoudre_equation   → 02-courbe (lecture), 07-equation
# - signes_resoudre_inequation → 08-inequation, 08b-inequation-large, 10-defi
#
# ⛔ Axes SANS include_numbers (LaTeX absent) : graduations posées à la main.
#
# Rendu : python -m manim render -qh --disable_caching manim/scripts/seconde/signes_expression_2de.py SignesExpression -o eleveai-maths-seconde-signes-expression --media_dir manim/scripts/seconde/media

import math
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from manim import *

from charte import *
from gabarit_sixieme import Notion6e

PLUS = BLEU_CALCUL       # dans l'air
MOINS = ORANGE_RETENUE   # sous l'eau
MER = "#1E3A8A"

CEINTURES = [
    ("blanche", "#F5F5F5"), ("jaune", "#FACC15"), ("orange", "#F97316"),
    ("verte", "#22C55E"), ("bleue", "#3B82F6"), ("marron", "#8B5A2B"),
    ("noire", "#1A1A1A"),
]

OBJECTIFS = [
    "Trouver le signe de ax + b",
    "Dresser le tableau de signes d'un produit et d'un quotient",
    "Résoudre une équation et une inéquation",
]


def h(t):
    return (3 - t) * (t - 1)


# ── les dessins partagés avec le short ─────────────────────────────────────

def dauphin(couleur="#8FB8DE"):
    """Un dauphin dessiné, tourné vers la droite (+x), longueur ~1,4."""
    corps = Ellipse(width=1.0, height=0.3).set_fill(couleur, 1).set_stroke(width=0)
    rostre = Polygon([0.46, 0.04, 0], [0.7, -0.02, 0], [0.46, -0.08, 0])
    aileron = Polygon([-0.08, 0.12, 0], [0.14, 0.12, 0], [-0.16, 0.34, 0])
    queue = Polygon([-0.44, 0.0, 0], [-0.7, 0.2, 0], [-0.6, 0.0, 0], [-0.7, -0.2, 0])
    nageoire = Polygon([0.12, -0.1, 0], [0.26, -0.1, 0], [0.04, -0.28, 0])
    for p in (rostre, aileron, queue, nageoire):
        p.set_fill(couleur, 1).set_stroke(width=0)
    oeil = Dot([0.32, 0.03, 0], radius=0.028, color="#0B1020")
    return VGroup(queue, corps, rostre, aileron, nageoire, oeil)


def ceinture(couleur, largeur=1.5):
    """Une ceinture de judo DESSINÉE : la bande, le nœud, les deux pans."""
    trait = dict(color=WHITE, width=1.5)
    bande = Rectangle(width=largeur, height=0.24).set_fill(couleur, 1).set_stroke(**trait)
    noeud = Square(0.3).set_fill(couleur, 1).set_stroke(**trait)
    pan_g = Polygon([-0.08, -0.12, 0], [-0.3, -0.62, 0], [-0.14, -0.66, 0], [0.02, -0.14, 0])
    pan_d = Polygon([0.08, -0.12, 0], [0.3, -0.62, 0], [0.14, -0.66, 0], [-0.02, -0.14, 0])
    for p in (pan_g, pan_d):
        p.set_fill(couleur, 1).set_stroke(**trait)
    return VGroup(bande, pan_g, pan_d, noeud)


def echelle_ceintures(nom, largeur=0.9, buff=0.18):
    """Les sept ceintures, blanche → noire ; celle du jour grandie et nommée."""
    groupe = VGroup()
    for n, c in CEINTURES:
        b = ceinture(c, largeur)
        if n != nom:
            b.set_opacity(0.35)
        groupe.add(b)
    groupe.arrange(RIGHT, buff=buff)
    i = [n for n, _ in CEINTURES].index(nom)
    groupe[i].set_opacity(1).scale(1.35)
    groupe.arrange(RIGHT, buff=buff, aligned_edge=UP)
    lbl = Text(f"Ceinture {nom}", font_size=24, color=dict(CEINTURES)[nom] if nom != "noire" else WHITE)
    lbl.next_to(groupe[i], DOWN, buff=0.12)
    return VGroup(groupe, lbl)


class Tableau:
    """Un tableau de signes, construit ligne par ligne.

    Les cases se repèrent par un demi-indice k : k pair = sous une VALEUR de la
    première ligne, k impair = dans l'INTERVALLE entre deux valeurs.
    ⛔ « ‖ » se dessine (deux traits sur toute la hauteur) : c'est une valeur
    interdite, pas un zéro.
    """

    def __init__(self, valeurs, centre_x=-0.6, y_haut=2.6, larg_lab=2.2,
                 pas=2.4, h=0.78, fs=34, marge=0.6):
        self.valeurs, self.pas, self.h, self.fs = valeurs, pas, h, fs
        n = len(valeurs)
        total = larg_lab + pas * (n - 1) + 2 * marge
        self.xg = centre_x - total / 2
        self.xs = self.xg + larg_lab
        self.xd = self.xg + total
        self.x0 = self.xs + marge
        self.y_haut = y_haut
        self.n = n

    def x(self, k):
        return self.x0 + k * self.pas / 2

    def y(self, r):
        return self.y_haut - self.h / 2 - r * self.h

    def ligne(self, r, etiquette, color=WHITE):
        """Le cadre d'une ligne, son étiquette, et ses traits verticaux."""
        cy = self.y(r)
        cadre = Rectangle(width=self.xd - self.xg, height=self.h, stroke_width=2,
                          color=WHITE).move_to([(self.xg + self.xd) / 2, cy, 0])
        sep = Line([self.xs, cy - self.h / 2, 0], [self.xs, cy + self.h / 2, 0], stroke_width=2)
        lab = Text(etiquette, font_size=self.fs - 2, color=color).move_to([(self.xg + self.xs) / 2, cy, 0])
        if lab.width > self.xs - self.xg - 0.2:
            lab.scale_to_fit_width(self.xs - self.xg - 0.2)
        traits = VGroup()
        if r > 0:
            for i in range(1, self.n - 1):
                traits.add(Line([self.x(2 * i), cy - self.h / 2, 0], [self.x(2 * i), cy + self.h / 2, 0],
                                stroke_width=1.5, color=GREY_B))
        return VGroup(cadre, sep, lab, traits)

    def valeur(self, i, color=WHITE):
        return Text(self.valeurs[i], font_size=self.fs, color=color).move_to([self.x(2 * i), self.y(0), 0])

    def case(self, r, k, s):
        cy = self.y(r)
        if s == "‖":
            return VGroup(*[Line([self.x(k) + dx, cy - self.h / 2, 0], [self.x(k) + dx, cy + self.h / 2, 0],
                                 stroke_width=3.5, color=WHITE) for dx in (-0.06, 0.06)])
        couleur = {"+": PLUS, "−": MOINS}.get(s, WHITE)
        t = Text(s, font_size=self.fs + (6 if s in "+−" else 0), color=couleur).move_to([self.x(k), cy, 0])
        if s == "0":
            fond = Rectangle(width=t.width + 0.16, height=t.height + 0.12).set_fill(BLACK, 1).set_stroke(width=0)
            return VGroup(fond.move_to(t), t)
        return t

    def colonne(self, r, k1, k2, color):
        """Un cadre autour des cases k1..k2 de la ligne r."""
        x1 = self.x(k1) - self.pas / 2 + 0.08 if k1 % 2 else self.x(k1) - 0.25
        x2 = self.x(k2) + self.pas / 2 - 0.08 if k2 % 2 else self.x(k2) + 0.25
        return Rectangle(width=x2 - x1, height=self.h - 0.1, color=color, stroke_width=4).move_to(
            [(x1 + x2) / 2, self.y(r), 0])


class NotionSecondeVoix(Notion6e):
    identite = "Maths seconde — EleveAI"


class SignesExpression(NotionSecondeVoix):
    nom_voix = "seconde-signes-expression"

    def t(self, texte, font_size=34, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    # ── notes sous le tableau ───────────────────────────────────────────────

    def note(self, texte, ligne, color=WHITE, font_size=32, ys=(-1.45, -2.2, -2.95), x=-0.6):
        n = self.t(texte, font_size, color)
        if n.width > 10.4:
            n.scale_to_fit_width(10.4)
        n.move_to([x, ys[ligne], 0])
        self.play(FadeIn(n, shift=UP * 0.12))
        self._notes.add(n)
        return n

    def effacer_notes(self):
        if len(self._notes):
            self.play(FadeOut(self._notes))
        self._notes = VGroup()

    def formule_h(self, font_size=40):
        g = VGroup(self.t("h(t) =", font_size, BLEU_CALCUL), self.t("(3 − t)", font_size, BLEU_CALCUL),
                   self.t("(t − 1)", font_size, BLEU_CALCUL)).arrange(RIGHT, buff=0.12)
        g[1:].shift(RIGHT * font_size * 0.006)
        return g

    def axes_dauphin(self, centre=(-2.9, -0.2), x_len=6.6, y_len=5.0):
        ax = Axes(x_range=[0, 4.2, 1], y_range=[-3.3, 1.6, 1], x_length=x_len, y_length=y_len,
                  tips=False, axis_config={"stroke_width": 2}).move_to([centre[0], centre[1], 0])
        mer = Polygon(ax.c2p(0, 0), ax.c2p(4.2, 0), ax.c2p(4.2, -3.3), ax.c2p(0, -3.3))
        mer.set_fill(MER, 0.45).set_stroke(width=0)
        labs = VGroup(*[self.t(str(v), 24).next_to(ax.c2p(v, 0), UP if v else UL, buff=0.1) for v in (1, 2, 3, 4)],
                      *[self.t(str(v).replace("-", "−"), 24).next_to(ax.c2p(0, v), LEFT, buff=0.12)
                        for v in (-3, -2, -1, 1)],
                      self.t("t (s)", 24).next_to(ax.c2p(4.2, 0), DOWN, buff=0.15),
                      self.t("h (m)", 24).next_to(ax.c2p(0, 1.6), RIGHT, buff=0.12))
        return ax, mer, labs

    def dauphin_sur(self, ax, tr, echelle=0.55, couleurs=True):
        def fabrique():
            tt = tr.get_value()
            p1, p2 = ax.c2p(tt - 0.01, h(tt - 0.01)), ax.c2p(tt + 0.01, h(tt + 0.01))
            ang = math.atan2(p2[1] - p1[1], p2[0] - p1[0])
            c = (PLUS if h(tt) > 0 else MOINS) if couleurs else "#8FB8DE"
            return dauphin(c).scale(echelle).rotate(ang).move_to(ax.c2p(tt, h(tt)))
        return always_redraw(fabrique)

    # ── 00 ──────────────────────────────────────────────────────────────────

    def page_de_garde(self, voix="00-garde"):
        self.clear()
        self.add_mascotte(scale=0.7)
        self.dire(voix)
        titre = self.t("Le tableau de signes", 52, JAUNE_TITRE).to_edge(UP, buff=0.35)
        identite = self.t(self.identite, 26).next_to(titre, DOWN, buff=0.22)
        echelle = echelle_ceintures("verte", largeur=0.55, buff=0.12).move_to([3.9, 0.3, 0])
        q = self.t("Pendant combien de temps est-il dans l'air ?", 34, BLEU_CALCUL).move_to([-0.6, 1.95, 0])
        y_mer = -1.1
        surface = Line([-7.1, y_mer, 0], [7.1, y_mer, 0], color=BLEU_CALCUL, stroke_width=3)
        mer = Rectangle(width=14.3, height=3.2).set_fill(MER, 0.5).set_stroke(width=0).move_to([0, y_mer - 1.6, 0])
        lieu = self.t("Saint-Leu", 24, WHITE).move_to([-6.0, y_mer + 0.3, 0])
        self.add(mer)
        self.play(Write(titre), FadeIn(identite), FadeIn(q), Create(surface), FadeIn(echelle), FadeIn(lieu), run_time=1.0)
        pos = lambda tt: np.array([-5.4 + 2.2 * tt, y_mer + 0.8 * h(tt), 0])
        tr = ValueTracker(0.0)

        def fabrique():
            tt = tr.get_value()
            a, b = pos(tt - 0.01), pos(tt + 0.01)
            c = PLUS if h(tt) > 0 else MOINS
            return dauphin(c).scale(0.7).rotate(math.atan2(b[1] - a[1], b[0] - a[0])).move_to(pos(tt))
        d = always_redraw(fabrique)
        self.au_mot("un dauphin saute")
        self.add(d)
        self.play(tr.animate.set_value(4.0), run_time=3.2, rate_func=linear)
        d.clear_updaters()
        self.play(FadeOut(d))
        self.au_mot("Et quand est-il")
        self.play(FadeIn(self.t("Et quand est-il sous l'eau ?", 34, MOINS).move_to([-0.6, 1.3, 0])))
        self.au_mot("Les maths, ça sert")
        self.play(Write(self.chute("Les maths, ça sert à rien… sauf à savoir où est le dauphin.",
                                   color=JAUNE_TITRE, font_size=28)))
        self.attendre_voix()

    # ── 01 ──────────────────────────────────────────────────────────────────

    def ecran_intuition(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-intuition")
        self.titre_ecran("1. Sous l'eau ou dans l'air ?")
        y0 = -0.2
        mer = Rectangle(width=14.3, height=3.6).set_fill(MER, 0.5).set_stroke(width=0).move_to([0, y0 - 1.8, 0])
        surface = Line([-7.1, y0, 0], [7.1, y0, 0], color=WHITE, stroke_width=3)
        self.play(FadeIn(mer), Create(surface))
        self.play(FadeIn(self.t("surface de la mer : 0", 28).move_to([3.6, y0 + 0.3, 0])))
        self.au_mot("L'altitude du dauphin")
        self.play(FadeIn(self.t("h(t) : altitude en mètres     t : temps en secondes", 30, BLEU_CALCUL).move_to([-0.6, 2.4, 0])))
        self.au_mot("Sous l'eau, l'altitude")
        d1 = dauphin(MOINS).scale(0.9).move_to([-3.6, y0 - 1.5, 0])
        self.play(FadeIn(d1), FadeIn(self.t("−", 90, MOINS).move_to([-1.6, y0 - 1.5, 0])),
                  FadeIn(self.t("h(t) < 0", 36, MOINS).move_to([0.6, y0 - 1.5, 0])))
        self.au_mot("Dans l'air, elle")
        d2 = dauphin(PLUS).scale(0.9).rotate(0.4).move_to([-3.6, y0 + 1.2, 0])
        self.play(FadeIn(d2), FadeIn(self.t("+", 90, PLUS).move_to([-1.6, y0 + 1.2, 0])),
                  FadeIn(self.t("h(t) > 0", 36, PLUS).move_to([0.6, y0 + 1.2, 0])))
        self.au_mot("quand il traverse")
        d3 = dauphin(WHITE).scale(0.9).rotate(PI / 2.6).move_to([-6.0, y0, 0])
        self.play(FadeIn(d3), FadeIn(self.t("h(t) = 0", 36).move_to([-4.6, y0 + 0.45, 0])))
        self.au_mot("Le signe de h, c'est")
        self.play(Write(self.chute("Le signe de h, c'est l'endroit où se trouve le dauphin.", color=JAUNE_TITRE, font_size=28)))
        self.attendre_voix()

    # ── 02 ──────────────────────────────────────────────────────────────────

    def ecran_courbe(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-courbe")
        self.titre_ecran("2. Lire le signe sur la courbe")
        ax, mer, labs = self.axes_dauphin()
        courbe = ax.plot(h, x_range=[0, 4], color=WHITE, stroke_width=4)
        self.au_mot("Voici sa trajectoire")
        self.play(FadeIn(mer), Create(ax), FadeIn(labs))
        x_n = 4.3
        self.au_mot("À 0, il est à 3 mètres")
        self.play(FadeIn(Dot(ax.c2p(0, -3), color=MOINS, radius=0.1)),
                  FadeIn(self.t("h(0) = −3", 34, MOINS).move_to([x_n, 1.8, 0])))
        tr = ValueTracker(0.0)
        d = self.dauphin_sur(ax, tr)
        self.add(d)
        self.au_mot("Il sort de l'eau à 1 seconde")
        self.play(Create(courbe, rate_func=linear), tr.animate(rate_func=linear).set_value(4.0), run_time=3.0)
        self.play(FadeIn(Dot(ax.c2p(1, 0), color=WHITE, radius=0.1)), FadeIn(self.t("sort à 1 s", 32).move_to([x_n, 1.0, 0])))
        self.au_mot("monte jusqu'à 1 mètre")
        self.play(FadeIn(Dot(ax.c2p(2, 1), color=PLUS, radius=0.1)), FadeIn(self.t("monte à 1 m", 32, PLUS).move_to([x_n, 0.2, 0])))
        self.au_mot("replonge à 3 secondes")
        self.play(FadeIn(Dot(ax.c2p(3, 0), color=WHITE, radius=0.1)), FadeIn(self.t("replonge à 3 s", 32).move_to([x_n, -0.6, 0])))
        d.clear_updaters()
        self.au_mot("Lire un signe sur une courbe")
        self.play(Write(self.chute("Lire un signe : de quel côté de l'axe est la courbe ?", color=JAUNE_TITRE, font_size=28)))
        self.attendre_voix()
        self._ax, self._mer, self._labs, self._courbe = ax, mer, labs, courbe

    def ecran_piege_courbe(self):
        self.clear()
        self.add_mascotte()
        self.dire("02b-piege-courbe")
        self.add(self._mer, self._ax, self._labs, self._courbe)
        self.play(Write(self.t("Attention au piège", 40, ORANGE_RETENUE).to_edge(UP)))
        ax = self._ax
        self.au_mot("Entre 2 et 3 secondes")
        morceau = ax.plot(h, x_range=[2, 3], color=JAUNE_TITRE, stroke_width=9)
        self.play(Create(morceau))
        self.play(FadeIn(self.t("de 2 à 3 s : il descend…", 32, JAUNE_TITRE).move_to([4.2, 1.6, 0])))
        self.au_mot("il est encore dans l'air")
        self.play(FadeIn(self.t("… mais h(t) > 0", 34, PLUS).move_to([4.2, 0.9, 0])))
        self.au_mot("La courbe descend ne veut pas")
        faux = self.t("« descend » ≠ « négative »", 34, ROUGE_ERREUR).move_to([4.2, 0.0, 0])
        self.play(Write(faux))
        self.au_mot("Descendre, c'est une variation")
        self.play(FadeIn(self.t("descendre = une variation", 30).move_to([4.2, -0.9, 0])))
        self.au_mot("Être sous l'axe, c'est un signe")
        self.play(FadeIn(self.t("sous l'axe = un signe", 30, MOINS).move_to([4.2, -1.6, 0])))
        self.attendre_voix()

    # ── 03 ──────────────────────────────────────────────────────────────────

    def ecran_formule(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-formule")
        self.titre_ecran("3. La formule")
        f = self.formule_h(72).move_to([-0.6, 1.0, 0])
        self.au_mot("h de t égale, entre parenthèses")
        self.play(Write(f))
        self.au_mot("C'est un produit de deux facteurs")
        for i, nom in ((1, "facteur 1"), (2, "facteur 2")):
            b = Brace(f[i], DOWN, color=JAUNE_TITRE)
            self.play(GrowFromCenter(b), FadeIn(self.t(nom, 30, JAUNE_TITRE).next_to(b, DOWN, buff=0.12)))
        self.play(FadeIn(self.t("un produit", 36, JAUNE_TITRE).move_to([-0.6, 2.3, 0])))
        self.au_mot("on étudie chaque facteur")
        self.play(Write(self.chute("Le signe de chaque facteur, puis on multiplie.", color=VERT_OK, font_size=30)))
        self.attendre_voix()

    # ── 04 ──────────────────────────────────────────────────────────────────

    def droite_signe(self, cx, cy, monte, racine):
        axe = Line([cx - 2.0, cy, 0], [cx + 2.0, cy, 0], stroke_width=2)
        s = 1 if monte else -1
        dr = Line([cx - 1.5, cy - 0.8 * s, 0], [cx + 1.5, cy + 0.8 * s, 0], color=JAUNE_TITRE, stroke_width=5)
        r = Dot([cx, cy, 0], radius=0.09)
        rl = self.t(racine, 28).next_to(r, DOWN if monte else UP, buff=0.18).shift(RIGHT * 0.25)
        g_sig, d_sig = ("−", "+") if monte else ("+", "−")
        sg = self.t(g_sig, 60, MOINS if monte else PLUS).move_to([cx - 1.2, cy + (-0.9 if monte else 0.9), 0])
        sd = self.t(d_sig, 60, PLUS if monte else MOINS).move_to([cx + 1.2, cy + (0.9 if monte else -0.9), 0])
        return VGroup(axe, dr, r, rl), VGroup(sg, sd)

    def ecran_premier_degre(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-premier-degre")
        self.titre_ecran("4. Le signe de ax + b")
        self.au_mot("On cherche d'abord où il s'annule")
        self.play(FadeIn(self.t("1) où s'annule-t-il ?   2) quel est le signe de a ?", 30, JAUNE_TITRE).move_to([-0.6, 2.55, 0])))
        xg, xd = -3.7, 2.5
        self.au_mot("t moins 1 égale 0 pour t égale 1")
        self.play(FadeIn(self.t("t − 1 = 0  pour  t = 1", 34, BLEU_CALCUL).move_to([xg, 1.75, 0])))
        self.au_mot("Ici a égale 1, positif")
        self.play(FadeIn(self.t("a = 1 > 0 : la droite monte", 30).move_to([xg, 1.1, 0])))
        dessin, signes = self.droite_signe(xg, -0.6, True, "1")
        self.play(Create(dessin))
        self.au_mot("donc moins, puis plus")
        self.play(FadeIn(signes))
        self.play(FadeIn(self.t("−  puis  +", 34).move_to([xg, -2.3, 0])))
        self.au_mot("Ensuite, 3 moins t égale 0")
        self.play(FadeIn(self.t("3 − t = 0  pour  t = 3", 34, BLEU_CALCUL).move_to([xd, 1.75, 0])))
        self.au_mot("Mais ici a égale moins 1")
        self.play(FadeIn(self.t("a = −1 < 0 : la droite descend", 30, ORANGE_RETENUE).move_to([xd, 1.1, 0])))
        dessin2, signes2 = self.droite_signe(xd, -0.6, False, "3")
        self.play(Create(dessin2))
        self.au_mot("donc plus, puis moins")
        self.play(FadeIn(signes2))
        self.play(FadeIn(self.t("+  puis  −", 34).move_to([xd, -2.3, 0])))
        self.au_mot("C'est le signe de a qui décide")
        self.play(Write(self.chute("C'est le signe de a qui décide — pas toujours « − puis + ».",
                                   color=ORANGE_RETENUE, font_size=28)))
        self.attendre_voix()

    # ── 05 → 08b : LE tableau du dauphin, qui reste à l'écran ────────────────

    def ecran_placer(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-placer")
        self._notes = VGroup()
        f = self.formule_h(40).move_to([-0.6, 3.35, 0])
        self.play(FadeIn(f))
        T = Tableau(["0", "1", "3", "4"])
        self.au_mot("Première ligne")
        l0 = T.ligne(0, "t")
        self.play(Create(l0[0]), Create(l0[1]), FadeIn(l0[2]))
        self.au_mot("0, puis 1, puis 3, puis 4")
        vals = VGroup(*[T.valeur(i) for i in range(4)])
        for v in vals:
            self.play(FadeIn(v, scale=1.3), run_time=0.4)
        self.au_mot("Attention : dans la formule")
        self.play(Indicate(f[1], color=ORANGE_RETENUE, scale_factor=1.2))
        self.note("dans la formule, le 3 est écrit en premier…", 0, ORANGE_RETENUE)
        self.au_mot("1 vient avant 3")
        self.play(Indicate(vals[1], color=JAUNE_TITRE), Indicate(vals[2], color=JAUNE_TITRE))
        self.note("… mais dans le tableau : ordre croissant, 1 < 3", 1, JAUNE_TITRE)
        self.au_mot("Sans contexte")
        self.note("ici t va de 0 à 4 ; sans contexte : de −∞ à +∞", 2)
        self.attendre_voix()
        self._f, self._T, self._l0, self._vals = f, T, l0, vals

    def ecran_produit(self):
        self.dire("06-produit")
        self.effacer_notes()
        T = self._T
        self.au_mot("3 moins t : plus, plus")
        l1 = T.ligne(1, "3 − t")
        self.play(Create(l1))
        c1 = VGroup(T.case(1, 1, "+"), T.case(1, 3, "+"), T.case(1, 4, "0"), T.case(1, 5, "−"))
        for c in c1:
            self.play(FadeIn(c, scale=1.3), run_time=0.45)
        self.au_mot("t moins 1 : moins, 0")
        l2 = T.ligne(2, "t − 1")
        self.play(Create(l2))
        c2 = VGroup(T.case(2, 1, "−"), T.case(2, 2, "0"), T.case(2, 3, "+"), T.case(2, 5, "+"))
        for c in c2:
            self.play(FadeIn(c, scale=1.3), run_time=0.45)
        self.au_mot("Dernière ligne, le produit")
        l3 = T.ligne(3, "h(t)", JAUNE_TITRE)
        self.play(Create(l3))
        regles = [("Plus fois moins : moins.", 1, "−", "+ × − = −", -4.0),
                  ("Plus fois plus : plus.", 3, "+", "+ × + = +", -0.6),
                  ("Moins fois plus : moins.", 5, "−", "− × + = −", 2.8)]
        prod = VGroup()
        for mot, k, s, txt, xn in regles:
            self.au_mot(mot)
            cadre = Rectangle(width=T.pas - 0.2, height=3 * T.h - 0.1, color=JAUNE_TITRE, stroke_width=3).move_to(
                [T.x(k), T.y(2), 0])
            c = T.case(3, k, s)
            self.play(Create(cadre), run_time=0.35)
            self.play(FadeIn(c, scale=1.4), FadeIn(self.note_libre(txt, xn)), run_time=0.5)
            self.play(FadeOut(cadre), run_time=0.25)
            prod.add(c)
        self.au_mot("Et un 0 sous chaque valeur")
        zeros = VGroup(T.case(3, 2, "0"), T.case(3, 4, "0"))
        self.play(LaggedStart(*[FadeIn(z, scale=1.5) for z in zeros], lag_ratio=0.4))
        self.attendre_voix()
        self._lignes = VGroup(l1, l2, l3, c1, c2, prod, zeros)
        self._prod, self._zeros = prod, zeros

    def note_libre(self, texte, x, y=-1.45, color=WHITE):
        n = self.t(texte, 32, color).move_to([x, y, 0])
        self._notes.add(n)
        return n

    def ecran_verifier(self):
        self.dire("06b-verifier")
        self.effacer_notes()
        T = self._T
        y = T.y(3) - T.h / 2 - 0.35
        lieux = [("Moins entre 0 et 1", 1, "sous l'eau", MOINS), ("Plus entre 1 et 3", 3, "dans l'air", PLUS),
                 ("Moins entre 3 et 4", 5, "sous l'eau", MOINS)]
        self._lieux = VGroup()
        for mot, k, txt, c in lieux:
            self.au_mot(mot)
            d = dauphin(c).scale(0.35).move_to([T.x(k), y - 0.45, 0])
            l = self.t(txt, 26, c).move_to([T.x(k), y, 0])
            self.play(FadeIn(l), FadeIn(d), Indicate(self._prod[(k - 1) // 2], color=c))
            self._lieux.add(l, d)
        self.au_mot("Le tableau dit exactement")
        self._chute = self.chute("Le tableau dit ce que montre la courbe.", color=VERT_OK, font_size=30)
        self.play(Write(self._chute))
        self.attendre_voix()

    def ecran_equation(self):
        self.dire("07-equation")
        self.play(FadeOut(self._lieux), FadeOut(self._chute))
        T = self._T
        self._titre_q = self.t("h(t) = 0", 36, JAUNE_TITRE).move_to([-0.6, 3.35, 0])
        self.play(FadeIn(self._titre_q), FadeOut(self._f))
        self.au_mot("On lit les zéros")
        self.play(*[Indicate(z, color=JAUNE_TITRE, scale_factor=1.6) for z in self._zeros])
        self._cadres = VGroup(*[T.colonne(3, k, k, JAUNE_TITRE) for k in (2, 4)])
        self.play(Create(self._cadres))
        self.note("h(t) = 0  pour  t = 1  et  t = 3", 0, JAUNE_TITRE, ys=(-1.6, -2.4, -3.1))
        self.au_mot("Les solutions sont 1 et 3")
        self.note("Solutions : 1 et 3", 1, VERT_OK, font_size=38, ys=(-1.6, -2.4, -3.1))
        self.attendre_voix()

    def ecran_inequation(self):
        self.dire("08-inequation")
        self.effacer_notes()
        T = self._T
        nouveau = self.t("h(t) > 0", 36, PLUS).move_to(self._titre_q)
        self.play(FadeOut(self._cadres), Transform(self._titre_q, nouveau))
        self.au_mot("On choisit les colonnes où il y a un plus")
        cad = T.colonne(3, 3, 3, PLUS)
        self.play(Create(cad), Indicate(self._prod[1], color=PLUS, scale_factor=1.5))
        self.note("h(t) > 0  pour  t ∈ ]1 ; 3[", 0, PLUS, font_size=38, ys=(-1.6, -2.4, -3.1))
        self.au_mot("Les crochets sont tournés")
        self.note("en 1 et en 3, h vaut 0 : pas strictement positif", 1, WHITE, font_size=30, ys=(-1.6, -2.4, -3.1))
        self.au_mot("Le dauphin est dans l'air pendant")
        self.note("dans l'air pendant 2 secondes", 2, VERT_OK, font_size=32, ys=(-1.6, -2.4, -3.1))
        self.attendre_voix()
        self._cad = cad

    def ecran_inequation_large(self):
        self.dire("08b-inequation-large")
        self.effacer_notes()
        T = self._T
        nouveau = self.t("h(t) ≤ 0", 36, MOINS).move_to(self._titre_q)
        self.play(FadeOut(self._cad), Transform(self._titre_q, nouveau))
        self.au_mot("Les colonnes avec un moins")
        cads = VGroup(T.colonne(3, 1, 2, MOINS), T.colonne(3, 4, 5, MOINS))
        self.play(Create(cads))
        self.au_mot("de 0 à 1, union")
        self.note("h(t) ≤ 0  pour  t ∈ [0 ; 1] ∪ [3 ; 4]", 0, MOINS, font_size=38, ys=(-1.6, -2.4, -3.1))
        self.au_mot("Une inégalité large garde")
        self.note("inégalité large : on garde les zéros", 1, JAUNE_TITRE, font_size=32, ys=(-1.6, -2.4, -3.1))
        self.attendre_voix()

    # ── 09 : le quotient ────────────────────────────────────────────────────

    def ecran_quotient(self):
        self.clear()
        self.add_mascotte()
        self.dire("09-quotient")
        self._notes = VGroup()
        self.play(Write(self.t("5. Et pour un quotient ?", 40, JAUNE_TITRE).to_corner(UL, buff=0.4)))
        self.au_mot("q de x égale x moins 1")
        frac = VGroup(self.t("q(x) =", 40, BLEU_CALCUL), self.fraction("x − 1", "x + 2", font_size=40, color=BLEU_CALCUL)
                      ).arrange(RIGHT, buff=0.25).move_to([-5.0, 1.95, 0])
        self.play(Write(frac))
        xn = -3.0
        self.au_mot("Le numérateur s'annule en 1")
        self.play(FadeIn(self.t("x − 1 = 0  pour  x = 1  →  un 0", 30).move_to([0, 2.75, 0], aligned_edge=LEFT).shift(RIGHT * xn)))
        self.au_mot("Le dénominateur s'annule en moins 2")
        self.play(FadeIn(self.t("x + 2 = 0  pour  x = −2  →  double barre ‖", 30, ORANGE_RETENUE).move_to([0, 2.05, 0], aligned_edge=LEFT).shift(RIGHT * xn)))
        self.au_mot("On ne divise jamais par 0")
        self.play(FadeIn(self.t("on ne divise jamais par 0 : −2 est interdite", 28, ROUGE_ERREUR).move_to([0, 1.35, 0], aligned_edge=LEFT).shift(RIGHT * xn)))
        T = Tableau(["−∞", "−2", "1", "+∞"], y_haut=0.85, h=0.75)
        self.au_mot("Première ligne")
        l0 = T.ligne(0, "x")
        self.play(Create(l0[0]), Create(l0[1]), FadeIn(l0[2]))
        for i in range(4):
            self.play(FadeIn(T.valeur(i), scale=1.3), run_time=0.35)
        self.attendre_voix()
        self._Tq = T

    def ecran_quotient_signes(self):
        self.dire("09b-quotient-signes")
        T = self._Tq
        rangs = [("x moins 1 : moins", 1, "x − 1", WHITE, [(1, "−"), (3, "−"), (4, "0"), (5, "+")]),
                 ("x plus 2 : moins, 0", 2, "x + 2", WHITE, [(1, "−"), (2, "0"), (3, "+"), (5, "+")]),
                 ("Le quotient, avec la même", 3, "q(x)", JAUNE_TITRE, [(1, "+"), (2, "‖"), (3, "−"), (4, "0"), (5, "+")])]
        cases_q = {}
        for mot, r, lab, c, cases in rangs:
            self.au_mot(mot)
            self.play(Create(T.ligne(r, lab, c)))
            for k, s in cases:
                m = T.case(r, k, s)
                self.play(FadeIn(m, scale=1.3) if s != "‖" else Create(m), run_time=0.4)
                if r == 3:
                    cases_q[k] = m
        self.play(Indicate(cases_q[2], color=ROUGE_ERREUR, scale_factor=1.4))
        self.au_mot("Pour q de x supérieur")
        self.play(Create(T.colonne(3, 1, 1, PLUS)), Create(T.colonne(3, 4, 5, PLUS)))
        self.note("q(x) ≥ 0  pour  x ∈ ]−∞ ; −2[ ∪ [1 ; +∞[", 0, PLUS, font_size=36, ys=(-2.5, -3.2, -3.2))
        self.au_mot("Moins 2 reste exclu")
        self.note("−2 reste exclu, même avec ≥ : q n'y existe pas", 1, ROUGE_ERREUR, font_size=30, ys=(-2.5, -3.2, -3.2))
        self.attendre_voix()

    # ── 10 : le défi ────────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("10-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        self.au_mot("g de x égale")
        self.play(GrowFromCenter(self.t("g(x) = (4 − 2x)(x + 3)", 72, BLEU_CALCUL).move_to([-0.6, 1.3, 0])))
        self.au_mot("Dresse son tableau")
        self.play(FadeIn(self.t("1. Dresse son tableau de signes", 36).move_to([-0.6, 0.1, 0])))
        self.au_mot("puis résous")
        self.play(FadeIn(self.t("2. Résous  g(x) < 0", 36).move_to([-0.6, -0.65, 0])))
        self.au_mot("Attention au signe de a")
        self.play(FadeIn(self.t("attention : le signe de a, l'ordre des valeurs", 30, ORANGE_RETENUE).move_to([-0.6, -1.5, 0])))
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=36)))
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("10b-correction")
        self._notes = VGroup()
        self.play(Write(self.t("Correction", 40, JAUNE_TITRE).to_corner(UL, buff=0.4)))
        self.au_mot("4 moins 2 x s'annule en 2")
        self.play(FadeIn(self.t("4 − 2x = 0 pour x = 2 ;  a = −2 < 0 : + puis −", 30, ORANGE_RETENUE).move_to([0.6, 2.75, 0])))
        self.au_mot("x plus 3 s'annule en moins 3")
        self.play(FadeIn(self.t("x + 3 = 0 pour x = −3 ;  a = 1 > 0 : − puis +", 30).move_to([0.6, 2.15, 0])))
        T = Tableau(["−∞", "−3", "2", "+∞"], y_haut=1.65, h=0.75)
        self.au_mot("Première ligne")
        self.play(Create(T.ligne(0, "x")))
        self.play(*[FadeIn(T.valeur(i)) for i in range(4)])
        self.play(Create(T.ligne(1, "4 − 2x")), *[FadeIn(T.case(1, k, s)) for k, s in [(1, "+"), (3, "+"), (4, "0"), (5, "−")]])
        self.play(Create(T.ligne(2, "x + 3")), *[FadeIn(T.case(2, k, s)) for k, s in [(1, "−"), (2, "0"), (3, "+"), (5, "+")]])
        self.au_mot("Le produit : moins")
        self.play(Create(T.ligne(3, "g(x)", JAUNE_TITRE)))
        for k, s in [(1, "−"), (2, "0"), (3, "+"), (4, "0"), (5, "−")]:
            self.play(FadeIn(T.case(3, k, s), scale=1.3), run_time=0.35)
        self.au_mot("g de x strictement inférieur à 0 :")
        self.play(Create(T.colonne(3, 1, 1, MOINS)), Create(T.colonne(3, 5, 5, MOINS)))
        self.note("g(x) < 0  pour  x ∈ ]−∞ ; −3[ ∪ ]2 ; +∞[", 0, MOINS, font_size=38, ys=(-2.3, -3.0, -3.0))
        self.attendre_voix()

    def construct(self):
        self.page_de_garde()
        self.page_objectifs(OBJECTIFS)
        self.ecran_intuition()
        self.ecran_courbe()
        self.ecran_piege_courbe()
        self.ecran_formule()
        self.ecran_premier_degre()
        self.ecran_placer()
        self.ecran_produit()
        self.ecran_verifier()
        self.ecran_equation()
        self.ecran_inequation()
        self.ecran_inequation_large()
        self.ecran_quotient()
        self.ecran_quotient_signes()
        self.ecran_defi()
        self.ecran_correction()
        self.page_finale(
            points=[
                "Le signe de ax + b dépend du signe de a",
                "Les valeurs : ordre croissant, pas l'ordre de la formule",
                "Un 0 si ça s'annule, une double barre ‖ si le dénominateur s'annule",
            ],
            rappel="Piège : « la courbe descend » ne veut pas dire « négative ».",
            voix="11-finale",
        )
        self.page_abonnement(voix="12-abonne")
