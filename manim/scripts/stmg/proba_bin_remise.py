# proba_bin_remise.py
# EleveAI — Maths STMG ET Maths Tle spé — lot « LOI BINOMIALE » :
# AVEC OU SANS REMISE : BINOMIALE OU PAS ? (micros : vaT_bin_contre_exemple en
# STMG, notion va_binomiale_reconnaitre ; binomiale_schema en Tle spé, notion
# loi_binomiale), AVEC VOIX.
# Paysage 16:9 : STMG ceinture BLEUE, Tle spé ceinture NOIRE. Short jumeau :
# proba_bin_remise_short.py (STMG jaune, Tle orange).
#
# ⭐⭐ UNE voix, UN script, DEUX rendus : ProbaBinRemiseBase porte toutes les
# scènes ; les sous-classes ne changent que l'identité et la ceinture.
#
# ⭐ La figure est l'ARBRE DE BERNOULLI du coach (`arbreBernoulliCanvas` de la
# banque Tle, kind « arbre_proba » : S / E, probabilités sur les branches) :
# carte blanche, branches grises, probabilités en bleu, chemin allumé en
# orange. La micro STMG n'a pas de figure (exprès : l'arbre donnerait la
# réponse) ; la vidéo prend donc l'arbre de la Tle, commun aux deux.
# ⛔ PAS D'ÉCART : seules les probabilités DITES s'écrivent (0,2 sur les
# branches S avec remise ; 4/20 puis 3/19 sans remise ; 8/32 puis 7/31) ; les
# branches E restent sans nombre.
#
# Écrans : 00 garde · 01 le lot (20 ampoules LED, 4 défectueuses, on en prend
# 3, X) · 02 avec remise (4/20 = 0,2 à chaque tirage, B(3 ; 0,2)) · 03 sans
# remise (4/20 puis 3/19) · 04 grand stock (10 000 : ≈ avec remise) · 05 le
# piège (les deux conditions) · 06 défi (2 cartes sur 32, sans remise) ·
# 06b correction (8/32 puis 7/31) · 07 ce que tu as appris · 08 fin.
#
# Voix : manim/voix/stmg-terminale-proba-bin-remise.json (débit −7).
# Rendus (depuis la racine ; media à soi, sinon WinError 32) :
# python -m manim render -qh --disable_caching manim/scripts/stmg/proba_bin_remise.py ProbaBinRemiseSTMG -o eleveai-maths-stmg-proba-bin-remise --media_dir manim/scripts/stmg/media-bin_remise
# python -m manim render -qh --disable_caching manim/scripts/stmg/proba_bin_remise.py ProbaBinRemiseTerminale -o eleveai-maths-terminale-proba-bin-remise --media_dir manim/scripts/stmg/media-bin_remise
# Puis copier dans manim/sorties/stmg/maths/probabilites/39-bin-remise/ et
# manim/sorties/terminale/maths/probabilites/12-bin-schema/.

import sys
from itertools import product
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "seconde"))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "premiere"))

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Notion6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402
from proba_pc_conditionnelle import BORD, BRANCHE, CHEMIN, ENCRE, PROBA, frac, suite  # noqa: E402

LED = "#FDE047"          # l'ampoule qui marche : jaune
LED_BORD = "#CA8A04"
DEF = "#64748B"          # l'ampoule défectueuse : grise, fêlée
DEF_BORD = "#334155"
CULOT = "#94A3B8"
CAISSE = "#7C4A2D"
BLEU_FR = "#60A5FA"      # les fractions recopiées hors de la carte


def P(x, y):
    return np.array([x, y, 0.0])


# ── les dessins : ampoules, lot, stock ──────────────────────────────────────

def ampoule(defect=False, s=1.0):
    """Une ampoule LED : le globe, le culot ; défectueuse = grise et fêlée."""
    c, b = (DEF, DEF_BORD) if defect else (LED, LED_BORD)
    globe = Circle(radius=0.22, fill_color=c, fill_opacity=1, stroke_color=b, stroke_width=2).move_to(P(0, 0.08))
    col = Polygon(P(-0.12, -0.1), P(0.12, -0.1), P(0.08, -0.2), P(-0.08, -0.2), fill_color=c, fill_opacity=1,
                  stroke_color=b, stroke_width=2)
    culot = RoundedRectangle(width=0.18, height=0.14, corner_radius=0.03, fill_color=CULOT, fill_opacity=1,
                             stroke_width=0).move_to(P(0, -0.27))
    g = VGroup(col, globe, culot)
    if defect:
        fele = VMobject(stroke_color="#0F172A", stroke_width=2.5)
        fele.set_points_as_corners([P(-0.06, 0.26), P(0.03, 0.12), P(-0.04, 0.04), P(0.06, -0.06)])
        g.add(fele)
    return g.scale(s)


def eclat(a, couleur=LED):
    """Le halo d'une ampoule qui marche (pour la faire briller)."""
    return Circle(radius=a.width * 0.75, fill_color=couleur, fill_opacity=0.25, stroke_width=0).move_to(a[1])


class Lot(VGroup):
    """La caisse de 20 ampoules (5 × 4), dont 4 défectueuses mêlées."""

    DEFECT = (2, 8, 11, 17)

    def __init__(self, s=1.0, **kw):
        super().__init__(**kw)
        self.ampoules = VGroup()
        for i in range(20):
            r, c = divmod(i, 5)
            self.ampoules.add(ampoule(i in self.DEFECT).move_to(P(-1.2 + 0.6 * c, 0.95 - 0.66 * r)))
        self.caisse = RoundedRectangle(width=3.4, height=3.05, corner_radius=0.12, fill_color=CAISSE,
                                       fill_opacity=0.25, stroke_color=CAISSE, stroke_width=4)
        self.caisse.move_to(self.ampoules)
        self.add(self.caisse, self.ampoules)
        self.scale(s)

    def defect(self):
        return [a for i, a in enumerate(self.ampoules) if i in self.DEFECT]

    def bonnes(self):
        return [a for i, a in enumerate(self.ampoules) if i not in self.DEFECT]


def stock(cols=30, rangs=12, pas=0.17):
    """Le grand stock : une foule de petites ampoules (le dessin ne compte rien)."""
    g = VGroup()
    g.defect = []
    rng = np.random.default_rng(7)
    for r in range(rangs):
        for c in range(cols):
            d = rng.random() < 0.2
            g.defect.append(d)
            g.add(Dot(P(c * pas, -r * pas), radius=0.055, color=DEF if d else LED))
    cadre = RoundedRectangle(width=g.width + 0.4, height=g.height + 0.4, corner_radius=0.12, fill_color=CAISSE,
                             fill_opacity=0.2, stroke_color=CAISSE, stroke_width=4).move_to(g)
    return VGroup(cadre, g)


def carte_jeu(coeur=True, s=1.0, dos=False):
    """Une carte : blanche avec un cœur rouge dessiné, ou de dos (bleue)."""
    fond = RoundedRectangle(width=0.7, height=1.0, corner_radius=0.07, fill_color="#1D4ED8" if dos else WHITE,
                            fill_opacity=1, stroke_color="#CBD5E1", stroke_width=2)
    g = VGroup(fond)
    if dos:
        g.add(RoundedRectangle(width=0.54, height=0.84, corner_radius=0.05, stroke_color="#93C5FD",
                               stroke_width=2).move_to(fond))
    elif coeur:
        g.add(dessin_coeur(0.42).move_to(fond))
    else:
        g.add(dessin_pique(0.38).move_to(fond))
    return g.scale(s)


def dessin_coeur(t=0.4, couleur="#DC2626"):
    """Un cœur DESSINÉ (deux disques et un triangle), jamais un caractère."""
    r = t * 0.3
    g1 = Circle(radius=r, fill_color=couleur, fill_opacity=1, stroke_width=0).move_to(P(-r * 0.95, r * 0.6))
    g2 = g1.copy().move_to(P(r * 0.95, r * 0.6))
    tri = Polygon(P(-2 * r * 0.98, r * 0.35), P(2 * r * 0.98, r * 0.35), P(0, -t * 0.62), fill_color=couleur,
                  fill_opacity=1, stroke_width=0)
    return VGroup(g1, g2, tri)


def dessin_pique(t=0.4):
    """Un pique noir : le cœur renversé, et sa queue."""
    c = dessin_coeur(t, "#0F172A").rotate(PI)
    q = Polygon(P(0, -t * 0.1), P(t * 0.18, -t * 0.55), P(-t * 0.18, -t * 0.55), fill_color="#0F172A",
                fill_opacity=1, stroke_width=0)
    return VGroup(c, q.move_to(c.get_bottom() + DOWN * 0.08))


# ── l'ARBRE DE BERNOULLI du coach (arbre_proba : S / E) ─────────────────────

class ArbreSE(VGroup):
    """Carte blanche du coach, `niv` niveaux ; un nœud = le chemin qui y mène
    (tuple de booléens, True = S). Seuls la carte, le titre, la légende et le
    départ sont posés ; les niveaux poussent avec `pousser`, les nombres avec
    `nombre`."""

    def __init__(self, niv=3, dx=2.0, h=0.56, fs=30, titre="Schéma de Bernoulli", legende="S : défectueuse",
                 entetes=("1re", "2e", "3e"), **kw):
        super().__init__(**kw)
        self.niv = niv
        self.pos = {(): P(0, 0)}
        for L in range(1, niv + 1):
            for c in product((True, False), repeat=L):
                i = int("".join("0" if g else "1" for g in c), 2)
                bloc = 2 ** (niv - L)
                ys = [((2 ** niv - 1) / 2 - j) * h for j in range(i * bloc, (i + 1) * bloc)]
                self.pos[c] = P(L * dx, sum(ys) / len(ys))
        self.branches, self.lab, self.nb = {}, {}, {}
        for c, v in self.pos.items():
            if not c:
                continue
            u = self.pos[c[:-1]]
            d = (v - u) / np.linalg.norm(v - u)
            self.branches[c] = Line(u + d * (0.12 if len(c) == 1 else 0.28), v - d * 0.28, color=BRANCHE,
                                    stroke_width=4)
            self.lab[c] = Text("S" if c[-1] else "E", font_size=fs, color=ENCRE, weight=BOLD).move_to(v)
        self.depart = Dot(self.pos[()], radius=0.07, color=ENCRE)
        self.bas = VGroup()
        y = -(2 ** niv - 1) / 2 * h - 0.6
        for L, mot in zip(range(1, niv + 1), entetes):
            self.bas.add(Text(mot, font_size=20, color=BRANCHE).move_to(P((L - 0.5) * dx, y)))
        tout = VGroup(self.depart, *self.branches.values(), *self.lab.values(), self.bas)
        self.leg = Text(legende, font_size=22, color=ENCRE)
        self.carte = RoundedRectangle(width=tout.width + 1.4, height=tout.height + 1.95, corner_radius=0.2,
                                      fill_color=WHITE, fill_opacity=1, stroke_color=BORD, stroke_width=2)
        self.carte.move_to(tout).shift(UP * 0.3)
        self.titre = Text(titre, font_size=22, color=ENCRE, weight=BOLD)
        self.titre.next_to(self.carte.get_top(), DOWN, buff=0.14)
        self.leg.next_to(self.carte.get_bottom(), UP, buff=0.14)
        # tout est dans le groupe pour l'échelle ; `ProbaBinRemiseBase.arbre` retire le non-posé
        self.add(self.carte, self.titre, self.leg, self.depart, self.bas, *self.branches.values(),
                 *self.lab.values())
        self.vus = set()

    def niveau(self, L):
        return [c for c in self.pos if len(c) == L]

    def pousser(self, L, sous=None, run_time=0.8):
        """Le niveau L pousse (sous=(True,) : seulement sous S)."""
        cs = [c for c in self.niveau(L) if sous is None or c[:len(sous)] == sous]
        self.vus |= set(cs)
        return Succession(AnimationGroup(*[Create(self.branches[c]) for c in cs], run_time=run_time * 0.6),
                          AnimationGroup(*[FadeIn(self.lab[c], scale=1.4) for c in cs], run_time=run_time * 0.4))

    def poser(self, L, sous=None):
        cs = [c for c in self.niveau(L) if sous is None or c[:len(sous)] == sous]
        self.vus |= set(cs)
        self.add(*[self.branches[c] for c in cs], *[self.lab[c] for c in cs])

    def nombre(self, c, n, d=None, fs=24, buff=0.06):
        """Le nombre de la branche c : n/d empilée (d donné) ou le décimal n, en bleu."""
        t = frac(n, d, fs, PROBA, sw=2.5) if d else Text(n, font_size=fs, color=PROBA, weight=BOLD)
        br = self.branches[c]
        u, v = br.get_start(), br.get_end()
        dd = (v - u) / np.linalg.norm(v - u)
        nn = np.array([-dd[1], dd[0], 0.0])
        if (nn[1] < 0) == c[-1]:
            nn = -nn
        demi = abs(nn[0]) * t.width / 2 + abs(nn[1]) * t.height / 2
        t.move_to((u + v) / 2 + nn * (demi + buff))
        self.nb[c] = t
        return t

    def etat(self, chemins=None, op=0.18):
        """Allume les chemins (orange épais), estompe le reste ; None : tout normal."""
        on_b = set() if chemins is None else {ch[:k] for ch in chemins for k in range(1, len(ch) + 1)}
        anims = []
        for c in self.vus:
            br = self.branches[c]
            if chemins is None:
                anims.append(br.animate.set_stroke(BRANCHE, 4, opacity=1))
            elif c in on_b:
                anims.append(br.animate.set_stroke(CHEMIN, 9, opacity=1))
            else:
                anims.append(br.animate.set_stroke(BRANCHE, 4, opacity=op))
            on = chemins is None or c in on_b
            anims.append(self.lab[c].animate.set_opacity(1 if on else op))
            if c in self.nb:   # posé dès qu'on l'a demandé (la scène l'affiche aussitôt)
                anims.append(self.nb[c].animate.set_opacity(1 if on else op))
        return anims


class ProbaBinRemiseBase(Notion6e):
    """Toutes les scènes ; les sous-classes ne changent que identité et ceinture."""

    nom_voix = "stmg-terminale-proba-bin-remise"
    identite = "Maths — EleveAI"
    ceinture = "bleue"

    def t(self, texte, font_size=36, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def insister(self, mob, run_time=0.3):
        self.play(mob.animate.scale(1.5), run_time=run_time)
        self.play(mob.animate.scale(1 / 1.5), run_time=run_time)

    def arbre(self, niv=3, centre=P(1.6, -0.1), echelle=0.9, **kw):
        a = ArbreSE(niv, **kw).scale(echelle).move_to(centre)
        a.remove(*a.branches.values(), *a.lab.values())   # placés, pas encore posés
        a.fs_nb = int((28 if niv == 3 else 34) * echelle)   # lisible sur un téléphone
        return a

    def ligne(self, morceaux, fs=48, buff=0.2):
        """("f", n, d) = fraction empilée ; (texte, couleur) sinon."""
        objs = [frac(m[1], m[2], fs, BLEU_FR if len(m) < 4 else m[3]) if m[0] == "f" else self.t(m[0], fs, m[1])
                for m in morceaux]
        return suite(*objs, buff=buff)

    def sortir(self, a, cible, k=1.3, run_time=0.6):
        return a.animate(run_time=run_time).move_to(cible).scale(k)

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("Avec ou sans remise ?", 52, JAUNE_TITRE).to_edge(UP, buff=0.55)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.2)
        ech = echelle_ceintures(self.ceinture).move_to(P(-0.6, -2.85))
        l1 = Lot(0.72).move_to(P(-3.6, 0.0))
        l2 = Lot(0.72).move_to(P(2.0, 0.0))
        m1 = self.t("Avec remise", 32, VERT_OK).next_to(l1, DOWN, buff=0.25)
        m2 = self.t("Sans remise", 32, ORANGE_RETENUE).next_to(l2, DOWN, buff=0.25)
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech), FadeIn(l1), FadeIn(l2),
                  FadeIn(m1), FadeIn(m2), run_time=0.9)
        a1, a2 = l1.defect()[0], l2.defect()[0]
        place1 = a1.get_center()
        dehors1 = l1.get_right() + P(0.55, 0.6)
        self.play(self.sortir(a1, dehors1, 1.3, 0.4), self.sortir(a2, l2.get_right() + P(0.55, 0.6), 1.3, 0.4))
        retour = CurvedArrow(dehors1 + P(0.05, -0.3), l1.get_right() + P(-0.1, -0.2), angle=-1.6, color=VERT_OK,
                             stroke_width=5, tip_length=0.18)
        self.play(Create(retour), a1.animate.move_to(place1).scale(1 / 1.3), run_time=0.5)
        self.au_mot("binomiale ou pas")
        q = self.t("Binomiale ou pas ?", 40, BLEU_CALCUL).move_to(P(-0.8, 1.95))
        q.next_to(identite, DOWN, buff=0.25)
        l1.add(a1)
        self.play(FadeIn(q, scale=1.3), run_time=0.5)
        self.play(Indicate(m1, color=VERT_OK), Indicate(m2, color=ORANGE_RETENUE), run_time=0.6)
        self.attendre_voix(marge=1.0)

    # ── 01 : le lot ─────────────────────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.titre_ecran("Le contrôle des ampoules")
        lot = Lot(1.25).move_to(P(-3.6, -0.35))
        self.play(FadeIn(lot.caisse), run_time=0.3)
        self.au_mot("20 ampoules LED")
        cibles = [a.get_center() for a in lot.ampoules]
        for a in lot.ampoules:
            a.shift(UP * 3.5)
        l20 = self.t("20 ampoules LED", 42).move_to(P(2.4, 2.1))
        self.play(LaggedStart(*[a.animate.move_to(c) for a, c in zip(lot.ampoules, cibles)], lag_ratio=0.05),
                  FadeIn(l20, shift=LEFT * 0.2), run_time=1.1)
        self.au_mot("4 ampoules défectueuses")
        l4 = suite(ampoule(True, 1.3), self.t("4", 50, JAUNE_TITRE), self.t("défectueuses", 38, CULOT), buff=0.25)
        l4.move_to(P(2.4, 0.95))
        self.play(FadeIn(l4, shift=LEFT * 0.2), *[Indicate(a, color=RED, scale_factor=1.5) for a in lot.defect()],
                  run_time=0.8)
        self.au_mot("en prend 3")
        l3 = suite(self.t("On en prend", 36), self.t("3", 50, JAUNE_TITRE), buff=0.25).move_to(P(2.4, -0.1))
        self.play(FadeIn(l3, shift=LEFT * 0.2), run_time=0.5)
        self.au_mot("l'une après l'autre")
        prises = [lot.ampoules[i] for i in (6, 11, 18)]
        for k, a in enumerate(prises):
            self.play(self.sortir(a, P(1.4 + 1.0 * k, -1.2), 1.15, 0.45))
        self.au_mot("X compte")
        x = VGroup(suite(self.t("X", 40, JAUNE_TITRE), self.t("compte les ampoules", 32), buff=0.2),
                   self.t("défectueuses", 32, CULOT)).arrange(DOWN, buff=0.1).move_to(P(2.3, -2.55))
        self.play(FadeIn(x, shift=UP * 0.15), Indicate(prises[1], color=RED, scale_factor=1.4), run_time=0.7)
        self.attendre_voix()

    # ── 02 : avec remise : 0,2 à chaque tirage, B(3 ; 0,2) ──────────────────

    def ecran_avec(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-avec")
        self.titre_ecran("Avec remise")
        lot = Lot(0.7).move_to(P(-4.95, 1.55))
        a = self.arbre(3, centre=P(1.9, -0.4), echelle=0.86, dx=1.6, h=0.58)
        self.add(lot, a)
        self.au_mot("on remet l'ampoule")
        b = lot.defect()[1]
        place = b.get_center()
        dehors = lot.get_corner(UR) + P(0.45, 0.1)
        self.play(self.sortir(b, dehors, 1.4, 0.5))
        retour = CurvedArrow(dehors + P(0.1, -0.35), lot.get_right() + P(-0.12, -0.35), angle=-1.6, color=VERT_OK,
                             stroke_width=5, tip_length=0.18)
        remet = self.t("on la remet", 32, VERT_OK).move_to(P(-4.95, 0.15))
        self.play(Create(retour), b.animate.move_to(place).scale(1 / 1.4), FadeIn(remet, shift=UP * 0.1),
                  run_time=0.8)
        self.au_mot("avant de tirer la suivante")
        self.play(Indicate(lot.caisse, color=VERT_OK, scale_factor=1.04), run_time=0.6)
        self.au_mot("À chaque tirage")
        for L in (1, 2, 3):
            self.play(a.pousser(L, run_time=0.6))
        self.au_mot("4 sur 20")
        calc = self.ligne([("f", "4", "20"), ("=", WHITE), ("0,2", BLEU_FR)], 46)
        calc.move_to(P(-4.95, -0.78))
        self.play(FadeIn(calc[0], scale=1.4), *[Indicate(x, color=RED, scale_factor=1.4) for x in lot.defect()],
                  run_time=0.7)
        self.au_mot("soit 0,2")
        self.play(FadeIn(calc[1]), FadeIn(calc[2], scale=1.6), run_time=0.5)
        self.play(*[TransformFromCopy(calc[2], a.nombre(c, "0,2", fs=a.fs_nb)) for c in a.pos if c and c[-1]],
                  run_time=0.8)
        self.au_mot("indépendants")
        ind = VGroup(self.t("tirages", 30), self.t("indépendants", 32, VERT_OK)).arrange(DOWN, buff=0.06)
        ind.move_to(P(-4.95, -2.05))
        self.play(FadeIn(ind, scale=1.3), run_time=0.5)
        self.au_mot("X suit B")
        loi = suite(self.t("X suit", 36), self.t("B(3 ; 0,2)", 44, JAUNE_TITRE), buff=0.2)
        loi.move_to(P(-4.7, -3.15))
        self.play(FadeIn(loi[0], shift=UP * 0.1), Write(loi[1]), run_time=0.8)
        self.insister(loi[1])
        self.attendre_voix()

    # ── 03 : sans remise : 4/20 puis 3/19 ───────────────────────────────────

    def ecran_sans(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-sans")
        self.titre_ecran("Sans remise")
        lot = Lot(0.75).move_to(P(-4.85, 1.05))
        a = self.arbre(2, centre=P(1.7, -0.15), echelle=1.0, dx=2.3, h=0.85, titre="Sans remise",
                       entetes=("1re", "2e"))
        self.add(lot, a)
        self.au_mot("la première est défectueuse")
        b = lot.defect()[1]
        dehors = lot.get_corner(UR) + P(0.45, 0.1)
        self.play(self.sortir(b, dehors, 1.4, 0.5))
        garde = self.t("pas remise", 32, ORANGE_RETENUE).next_to(lot, DOWN, buff=0.3)
        self.play(FadeIn(garde, shift=UP * 0.1), Wiggle(b), run_time=0.6)
        self.play(a.pousser(1), run_time=0.7)
        self.au_mot("4 sur 20")
        f1 = a.nombre((True,), "4", "20", fs=a.fs_nb)
        self.play(FadeIn(f1, scale=1.6), run_time=0.5)
        self.au_mot("Si elle l'est")
        self.play(a.pousser(2, sous=(True,)), run_time=0.7)
        self.play(*a.etat([(True, True)]), run_time=0.4)
        self.au_mot("3 sur 19")
        f2 = a.nombre((True, True), "3", "19", fs=a.fs_nb)
        reste = [x for x in lot.defect() if x is not b]
        self.play(FadeIn(f2, scale=1.6), *[Indicate(x, color=RED, scale_factor=1.5) for x in reste], run_time=0.7)
        self.insister(f2)
        self.au_mot("La probabilité change")
        g1, g2 = frac("4", "20", 44, BLEU_FR), frac("3", "19", 44, BLEU_FR)
        fl = Arrow(LEFT * 0.5, RIGHT * 0.5, color=ORANGE_RETENUE, buff=0, stroke_width=6)
        cmp_ = suite(g1, fl, g2, buff=0.25).next_to(garde, DOWN, buff=0.45)
        self.play(TransformFromCopy(f1, g1), TransformFromCopy(f2, g2), GrowArrow(fl), run_time=0.8)
        chg = self.t("change", 34, ORANGE_RETENUE).next_to(cmp_, DOWN, buff=0.2)
        self.play(FadeIn(chg, scale=1.3), run_time=0.4)
        self.au_mot("ce n'est pas")
        non = self.t("Pas un schéma de Bernoulli", 38, ORANGE_RETENUE).next_to(a.carte, DOWN, buff=0.35)
        non.set_x(0.4)
        self.play(FadeIn(non, shift=UP * 0.15), run_time=0.6)
        self.insister(non, 0.25)
        self.attendre_voix()

    # ── 04 : un très grand stock ≈ avec remise ──────────────────────────────

    def ecran_grand(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-grand")
        self.titre_ecran("Un très grand stock")
        st = stock().scale_to_fit_width(6.2).move_to(P(-3.1, 0.55))
        self.au_mot("10 000 ampoules")
        self.play(FadeIn(st[0]), LaggedStart(*[FadeIn(d, scale=0.3) for d in st[1]], lag_ratio=0.004),
                  run_time=1.2)
        l10 = self.t("10 000 ampoules", 44).move_to(P(3.4, 2.0))
        self.play(FadeIn(l10, shift=LEFT * 0.2), run_time=0.5)
        self.au_mot("en prendre 3")
        prises = [st[1][i] for i in (40, 155, 290)]
        grosses = VGroup(*[ampoule(st[1].defect[i], 1.2) for i in (40, 155, 290)])
        grosses.arrange(RIGHT, buff=0.45).move_to(P(3.4, 0.75))
        l3 = suite(self.t("on en prend", 34), self.t("3", 46, JAUNE_TITRE), buff=0.2).next_to(grosses, DOWN, buff=0.3)
        self.play(*[ReplacementTransform(p.copy(), g) for p, g in zip(prises, grosses)],
                  *[p.animate.set_opacity(0.15) for p in prises], FadeIn(l3), run_time=0.9)
        self.au_mot("presque rien")
        pr = self.t("presque rien ne change", 34, BLEU_CALCUL).next_to(st, DOWN, buff=0.35)
        self.play(FadeIn(pr, shift=UP * 0.1), Indicate(st[1], color=WHITE, scale_factor=1.02), run_time=0.7)
        self.au_mot("On assimile")
        eq = suite(self.t("sans remise", 40, ORANGE_RETENUE), self.t("≈", 54), self.t("avec remise", 40, VERT_OK),
                   buff=0.3).move_to(P(-0.6, -2.75))
        self.play(FadeIn(eq[0], shift=RIGHT * 0.2), FadeIn(eq[1], scale=1.8), run_time=0.6)
        self.au_mot("tirage avec remise")
        self.play(FadeIn(eq[2], shift=LEFT * 0.2), run_time=0.5)
        self.insister(eq[1])
        self.attendre_voix()

    # ── 05 : le piège ───────────────────────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-piege")
        self.titre_ecran("Le piège")
        self.au_mot("binomiale")
        rep = VGroup(*[ampoule(i == 1, 1.1) for i in range(3)]).arrange(RIGHT, buff=0.35)
        boucle = Arc(radius=0.55, start_angle=-0.3, angle=4.9, color=BLEU_CALCUL, stroke_width=5).add_tip(
            tip_length=0.18)
        gauche = suite(rep, boucle, buff=0.4)
        faux = self.t("« binomiale »", 44, WHITE)
        haut = suite(gauche, Arrow(LEFT * 0.6, RIGHT * 0.6, color=WHITE, buff=0, stroke_width=5), faux, buff=0.35)
        haut.move_to(P(-0.4, 1.95))
        self.play(FadeIn(faux, scale=1.3), run_time=0.5)
        self.au_mot("dès qu'on répète")
        self.play(FadeIn(rep, lag_ratio=0.3), Create(boucle), GrowArrow(haut[1]), run_time=0.8)
        barre = Line(faux.get_corner(DL) + P(-0.1, -0.05), faux.get_corner(UR) + P(0.1, 0.05), color=ROUGE_ERREUR,
                     stroke_width=8)
        self.play(Create(barre), faux.animate.set_opacity(0.55), run_time=0.4)
        self.au_mot("Il faut")
        il = self.t("Il faut :", 42, JAUNE_TITRE).move_to(P(-4.3, 0.35))
        self.play(FadeIn(il, shift=RIGHT * 0.2), run_time=0.4)
        c1 = VGroup(self.coche(taille=0.3), self.t("la même probabilité de succès", 38))
        c2 = VGroup(self.coche(taille=0.3), self.t("des épreuves indépendantes", 38))
        for c in (c1, c2):
            c.arrange(RIGHT, buff=0.35)
        bloc = VGroup(c1, c2).arrange(DOWN, aligned_edge=LEFT, buff=0.55).next_to(il, DOWN, buff=0.45)
        bloc.align_to(il, LEFT).shift(RIGHT * 0.6)
        self.au_mot("la probabilité de succès")
        self.play(FadeIn(c1[1], shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("reste la même")
        self.play(Create(c1[0]), run_time=0.4)
        self.insister(c1[1], 0.25)
        self.au_mot("indépendantes")
        self.play(FadeIn(c2[1], shift=RIGHT * 0.2), run_time=0.5)
        self.play(Create(c2[0]), run_time=0.4)
        self.insister(c2[1], 0.25)
        self.attendre_voix()

    # ── 06 : défi : 2 cartes sans remise dans un jeu de 32 ──────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("06-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        paquet = VGroup(*[carte_jeu(dos=True, s=1.9).shift(P(0.035 * k, 0.035 * k)) for k in range(8)])
        paquet.move_to(P(-4.4, 0.3))
        self.play(FadeIn(paquet, lag_ratio=0.1), run_time=0.6)
        self.au_mot("On tire 2 cartes")
        c1 = carte_jeu(True, 1.9).move_to(paquet.get_center())
        c2 = carte_jeu(False, 1.9).move_to(paquet.get_center())
        l1 = suite(self.t("On tire", 38), self.t("2", 48, JAUNE_TITRE), self.t("cartes", 38), buff=0.2)
        l1.move_to(P(2.6, 2.0))
        self.play(c1.animate.move_to(P(-2.2, 1.15)), FadeIn(l1, shift=LEFT * 0.2), run_time=0.6)
        self.play(c2.animate.move_to(P(-2.2, -0.9)), run_time=0.5)
        self.au_mot("sans remise")
        l2 = self.t("sans remise", 40, ORANGE_RETENUE).next_to(l1, DOWN, buff=0.35)
        self.play(FadeIn(l2, scale=1.3), run_time=0.5)
        self.au_mot("jeu de 32")
        l3 = suite(self.t("dans un jeu de", 36), self.t("32", 48, JAUNE_TITRE), buff=0.2).next_to(l2, DOWN, buff=0.35)
        self.play(FadeIn(l3, shift=LEFT * 0.2), Indicate(paquet, color=WHITE, scale_factor=1.05), run_time=0.6)
        self.au_mot("X compte les cœurs")
        l4 = suite(self.t("X", 42, JAUNE_TITRE), self.t("compte les cœurs", 36), dessin_coeur(0.4), buff=0.2)
        l4.next_to(l3, DOWN, buff=0.35)
        self.play(FadeIn(l4, shift=LEFT * 0.2), Indicate(c1, color=RED, scale_factor=1.15), run_time=0.6)
        self.au_mot("Loi binomiale")
        l5 = self.t("Loi binomiale ?", 46, BLEU_CALCUL).next_to(l4, DOWN, buff=0.45)
        self.play(FadeIn(l5, scale=1.3), run_time=0.5)
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=36)))
        self.attendre_voix(marge=2.0)

    # ── 06b : correction : 8/32 puis 7/31 ───────────────────────────────────

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("06b-correction")
        self.titre_ecran("Correction")
        a = self.arbre(2, centre=P(2.0, -0.15), echelle=1.0, dx=2.3, h=0.85, titre="Sans remise", legende="S : cœur",
                       entetes=("1re carte", "2e carte"))
        self.add(a)
        self.au_mot("Non")
        non = self.t("Non", 72, ROUGE_ERREUR).move_to(P(-4.6, 1.7))
        self.play(FadeIn(non, scale=1.8), run_time=0.4)
        self.play(a.pousser(1), run_time=0.7)
        self.au_mot("8 sur 32")
        f1 = a.nombre((True,), "8", "32", fs=a.fs_nb)
        self.play(FadeIn(f1, scale=1.6), run_time=0.5)
        self.au_mot("Si on l'a tiré")
        self.play(a.pousser(2, sous=(True,)), run_time=0.7)
        self.play(*a.etat([(True, True)]), run_time=0.4)
        self.au_mot("7 sur 31")
        f2 = a.nombre((True, True), "7", "31", fs=a.fs_nb)
        self.play(FadeIn(f2, scale=1.6), run_time=0.5)
        self.insister(f2)
        self.au_mot("La probabilité change")
        g1, g2 = frac("8", "32", 44, BLEU_FR), frac("7", "31", 44, BLEU_FR)
        fl = Arrow(LEFT * 0.5, RIGHT * 0.5, color=ORANGE_RETENUE, buff=0, stroke_width=6)
        cmp_ = suite(g1, fl, g2, buff=0.25).move_to(P(-4.6, 0.0))
        self.play(TransformFromCopy(f1, g1), TransformFromCopy(f2, g2), GrowArrow(fl), run_time=0.8)
        chg = self.t("change", 34, ORANGE_RETENUE).next_to(cmp_, DOWN, buff=0.2)
        self.play(FadeIn(chg, scale=1.3), run_time=0.4)
        self.insister(non, 0.25)
        self.attendre_voix()

    # ── 07 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)))
        fs = 42
        ta = self.t("Avec remise :", 46, VERT_OK)
        ts = self.t("Sans remise :", 46, ORANGE_RETENUE)
        mots = ["épreuves indépendantes", "loi binomiale", "la probabilité change", "pas de loi binomiale",
                "sauf si le stock est très grand"]
        lignes = [VGroup(self.coche(), self.t(m, fs)).arrange(RIGHT, buff=0.3) for m in mots]
        bloc_a = VGroup(ta, *lignes[:2]).arrange(DOWN, aligned_edge=LEFT, buff=0.22)
        bloc_s = VGroup(ts, *lignes[2:]).arrange(DOWN, aligned_edge=LEFT, buff=0.22)
        for l in lignes:
            l.shift(RIGHT * 0.4)
        tout = VGroup(bloc_a, bloc_s).arrange(DOWN, aligned_edge=LEFT, buff=0.45)
        if tout.width > 10.6:
            tout.scale_to_fit_width(10.6)
        tout.move_to(P(-0.9, -0.45))
        self.au_mot("Avec remise")
        self.play(FadeIn(ta, shift=RIGHT * 0.2), run_time=0.5)
        reperes = ["épreuves indépendantes", "loi binomiale", "la probabilité change", "pas de loi binomiale",
                   "sauf si"]
        for i, (mot, l) in enumerate(zip(reperes, lignes)):
            self.au_mot(mot)
            if i == 2:
                self.play(FadeIn(ts, shift=RIGHT * 0.2), run_time=0.4)
            self.play(FadeIn(l[1], shift=RIGHT * 0.2), run_time=0.5)
            self.play(Create(l[0]), run_time=0.3)
        self.attendre_voix(marge=1.0)

    # ── 08 : l'écran de fin (il écrit ce que dit la voix) ───────────────────

    def ecran_fin(self, voix="08-abonne"):
        self.clear()
        self.dire(voix)
        self.add_mascotte(scale=0.9)
        entraine = self.t("Entraîne-toi sur", 46, JAUNE_TITRE).move_to(P(0, 2.05))
        site = self.t("eleveai.fr", 62, BLEU_CALCUL).move_to(P(0, 0.95))
        cadre = SurroundingRectangle(site, color=BLEU_CALCUL, buff=0.28, stroke_width=3)
        abonne = self.t("Abonne-toi !", 46, VERT_OK).move_to(P(0, -0.6))
        poignee = self.t("@eleveai974", 50, VERT_OK).move_to(P(0, -1.6))
        self.play(Write(entraine), run_time=0.7)
        self.play(GrowFromCenter(site), Create(cadre), run_time=0.7)
        self.au_mot("Et abonne-toi")
        self.play(FadeIn(abonne, shift=UP * 0.15), run_time=0.5)
        self.play(GrowFromCenter(poignee), run_time=0.5)
        self.play(Flash(poignee, color=VERT_OK, line_length=0.3))
        self.attendre_voix(marge=1.4)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_avec()
        self.ecran_sans()
        self.ecran_grand()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.ecran_fin()


class ProbaBinRemiseSTMG(ProbaBinRemiseBase):
    identite = "Maths STMG — EleveAI"
    ceinture = "bleue"


class ProbaBinRemiseTerminale(ProbaBinRemiseBase):
    identite = "Maths Tle spé — EleveAI"
    ceinture = "noire"
