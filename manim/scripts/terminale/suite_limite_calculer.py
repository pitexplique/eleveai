# suite_limite_calculer.py
# EleveAI — Maths Terminale (spé) — paysage « Calculer la limite d'une suite »
# (16:9), ceinture VERTE. Série SUITES du lycée, épisode 34.
# Micro du coach : limite_suite_calculer (notion limite_suite) :
# lib/tutor-v4/questionBank/terminale-spe/maths/limites-suites.bank.ts + limites-suites-renfort.ts.
#
# Ce que demande le coach → écran :
#   · les limites de référence n, n², √n, 1/n, 1/n² (fixed_1, fixed_2, h1, h2, genLimRef) → 02 ;
#   · qⁿ selon q (fixed_4, tpl_2, h3, h4, genLimGeo)                              → 02, 09 (w) ;
#   · un polynôme : on factorise par le terme de plus haut degré (genLimPoly)    → 03, 04 (B) ;
#   · un quotient : on factorise en haut et en bas, coefficients dominants
#     (genLimRat, genLimRatCourt ; le piège des constantes b/d)                  → 05, 06 (A), 09 (v) ;
#   · a + k/n → a (fixed_3, tpl_1)                                               → 09 (u) ;
#   · croissances comparées n²/2ⁿ → 0 (genLimExpo, « un data scientist »)        → 07 ;
#   · « forme indéterminée » ne veut pas dire « pas de limite » (IND.fi)         → 08.
# Clé de voix → écran :
#   00-garde (la course n² contre 2ⁿ) · 01 Mehdi, data scientist : son ordinateur,
#   le réseau de neurones, les deux algorithmes, la pluie de données · 02 les
#   limites de référence : un nuage qui change de forme à chaque famille · 03 le
#   premier algorithme n² − 100 n : terme dominant encadré, factorisation, le nuage
#   qui plonge puis explose · 04/04b question (B : −∞) · 05 le quotient (3n + 1)/(n + 2)
#   → 3 · 06/06b question (A : 2), le piège des constantes · 07 croissances comparées :
#   2ⁿ écrase n², l'ordinateur qui explose · 08 le piège : le panneau, factoriser →
#   simplifier → conclure · 09/09b défi u, v, w (5, 0, 4) · 10 « Ce que tu as appris » · 11 fin.
# Code couleur (module commun) : bleu = termes, orange = ce qui fond ou la raison,
# jaune = le terme dominant, vert = juste, rouge = piège.
# ⛔ Pas de LaTeX. Voix : manim/voix/terminale-suite-limite-calculer.json (débit −6),
# calée mot à mot par suite_limite_calculer_marques.json.
# Contrôle : AUDIT=1 BORDS=1 python -m manim render --dry_run …
# python -m manim render -qh --disable_caching manim/scripts/terminale/suite_limite_calculer.py SuiteLimiteCalculerTle -o eleveai-maths-terminale-suite-limite-calculer --media_dir manim/scripts/terminale/media-suite-limite-calculer
# Sortie : manim/sorties/terminale/maths/suites/34-limite-calculer/

import math
import os
import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI))
sys.path.insert(1, str(ICI.parent / "premiere"))

from suites_commun import *  # noqa: E402,F403
from suite_limite_interpreter import OutilsLimite, glyphes  # noqa: E402

# ── les affirmations de la voix, vérifiées ──────────────────────────────────
POLY = [n * n - 100 * n for n in range(0, 201, 10)]
assert min(POLY) == -2500 and POLY[-1] == 20000                      # plonge, puis explose
Q1 = [-2 * n ** 3 + 5 * n * n for n in range(8)]
assert Q1[:3] == [0, 3, 4] and all(Q1[k + 1] < Q1[k] for k in range(2, 7))   # la réponse B : −∞
QUO = [(3 * n + 1) / (n + 2) for n in range(40)]
assert QUO[0] == 0.5 and all(q < 3 for q in QUO) and 3 - QUO[39] < 0.15     # → 3
Q2 = [(4 * n * n - 1) / (2 * n * n + 7) for n in range(40)]
assert abs(Q2[0] + 1 / 7) < 1e-12 and all(q < 2 for q in Q2) and 2 - Q2[39] < 0.01  # la réponse A : 2
assert [n * n for n in (4, 10, 20)] == [16, 100, 400] and [2 ** n for n in (4, 10, 20)] == [16, 1024, 1048576]
assert all(n * n < 2 ** n for n in range(5, 60)) and 30 ** 2 / 2 ** 30 < 1e-6   # n²/2ⁿ → 0
DU = [5 - 3 / n ** 2 for n in range(1, 30)]
DV = [(2 * n + 1) / (n * n + 3) for n in range(1, 30)]
DW = [3 * 0.5 ** n + 4 for n in range(1, 30)]
assert DU[0] == 2 and 5 - DU[-1] < 0.01 and DV[-1] < 0.08 and DW[-1] - 4 < 1e-6  # le défi : 5, 0, 4

PEAU, SWEAT, CIEL, NUIT = "#a0522d", "#0d9488", "#38BDF8", "#0f172a"


# ── les dessins de l'épisode ───────────────────────────────────────────────

def mehdi(s=1.0):
    """Mehdi, data scientist : sweat à capuche vert d'eau, lunettes, badge."""
    tete = Circle(radius=0.28, fill_color=PEAU, fill_opacity=1, stroke_width=0).move_to(P(0, 1.0))
    cheveux = Sector(radius=0.3, angle=PI, start_angle=0, fill_color="#1c1917", fill_opacity=1,
                     stroke_width=0).move_to(P(0, 1.17))
    lunettes = VGroup(*[Circle(radius=0.08, stroke_color="#0f172a", stroke_width=2.5).move_to(P(x, 1.0))
                        for x in (-0.11, 0.11)])
    capuche = RoundedRectangle(width=0.72, height=0.3, corner_radius=0.12, fill_color="#0f766e", fill_opacity=1,
                               stroke_width=0).move_to(P(0, 0.66))
    corps = RoundedRectangle(width=0.98, height=1.15, corner_radius=0.26, fill_color=SWEAT, fill_opacity=1,
                             stroke_width=0).move_to(P(0, 0.12))
    badge = RoundedRectangle(width=0.2, height=0.26, corner_radius=0.04, fill_color=WHITE, fill_opacity=1,
                             stroke_width=0).move_to(P(0.24, 0.25))
    poche = RoundedRectangle(width=0.5, height=0.18, corner_radius=0.06, fill_color="#0f766e", fill_opacity=1,
                             stroke_width=0).move_to(P(0, -0.2))
    return VGroup(corps, capuche, poche, badge, tete, cheveux, lunettes).scale(s)


def portable(s=1.0, reseau=True):
    """L'ordinateur de Mehdi : écran sombre (g.ecran), clavier, et un petit réseau
    de neurones (g.noeuds, g.liens) sur l'écran."""
    ecran = RoundedRectangle(width=2.0, height=1.3, corner_radius=0.1, fill_color=NUIT, fill_opacity=1,
                             stroke_color=GREY_B, stroke_width=3)
    base = Polygon(P(-1.15, -0.72), P(1.15, -0.72), P(1.3, -0.9), P(-1.3, -0.9), fill_color=GREY_C,
                   fill_opacity=1, stroke_width=0)
    g = VGroup(ecran, base)
    g.ecran = ecran
    g.noeuds, g.liens = VGroup(), VGroup()
    if reseau:
        couches = [[0.3, -0.3], [0.4, 0.0, -0.4], [0.2, -0.2]]
        pos = [[P(-0.6 + 0.6 * i, y) for y in c] for i, c in enumerate(couches)]
        for i in range(2):
            for a in pos[i]:
                for b in pos[i + 1]:
                    g.liens.add(Line(a, b, stroke_color=GREY_B, stroke_width=1.5))
        for c in pos:
            for p in c:
                g.noeuds.add(Dot(p, radius=0.07, color=CIEL))
        g.add(g.liens, g.noeuds)
    return g.scale(s)


def donnees(nb=24, cote=0.16, col=6):
    """Les données : des petits carrés bleus rangés en grille."""
    return VGroup(*[Square(cote, fill_color=CIEL, fill_opacity=0.85, stroke_width=0)
                    .move_to(P((k % col) * cote * 1.35, -(k // col) * cote * 1.35)) for k in range(nb)])


def panneau(s=1.0):
    """Le panneau « attention » : triangle jaune bordé de rouge, point d'exclamation."""
    tri = Triangle(fill_color="#FACC15", fill_opacity=1, stroke_color=PIEGE, stroke_width=8).scale(0.8)
    barre = RoundedRectangle(width=0.12, height=0.42, corner_radius=0.05, fill_color=NUIT, fill_opacity=1,
                             stroke_width=0).move_to(tri.get_center() + UP * 0.05)
    pt = Dot(tri.get_center() + DOWN * 0.3, radius=0.07, color=NUIT)
    return VGroup(tri, barre, pt).scale(s)


def explosion(s=1.0):
    etoile = Star(n=10, outer_radius=0.5, inner_radius=0.26, fill_color="#F97316", fill_opacity=1, stroke_width=0)
    coeur = Star(n=8, outer_radius=0.28, inner_radius=0.15, fill_color="#FACC15", fill_opacity=1, stroke_width=0)
    return VGroup(etoile, coeur).scale(s)


# ── les outils : une ligne mathématique, avec ses fractions ────────────────

class OutilsCalcul(OutilsLimite):
    """Les outils de l'ép. 33 + les fractions empilées sur la même ligne."""

    _esp = {}

    def espace(self, fs):
        if fs not in self._esp:
            self._esp[fs] = Text("a a", font_size=fs).width - Text("aa", font_size=fs).width
        return self._esp[fs]

    def couper(self, texte, pieces, fs=40, choix=False):
        """UN Text coupé en morceaux SANS espace entre eux (« −1/7 » : « −1 » au
        « 1 », « /7 » au « 7 ») ; pieces = [(nb de glyphes ou None = le reste,
        couleur, extrait), …]. choix=True : prêt pour un bouton (nombres, seps)."""
        t = self.t(texte, fs, WHITE, 1e9)
        car = glyphes(texte)
        g, i = VGroup(), 0
        g.extraits, g.textes = [], []
        for n, c, ex in pieces:
            n = len(car) - i if n is None else n
            g.add(VGroup(*t.submobjects[i:i + n]).set_color(c))
            g.extraits.append(ex)
            g.textes.append("".join(car[i:i + n]))
            i += n
        if choix:
            g.nombres, g.seps = list(g), [VMobject() for _ in g[1:]]
        return g

    def ligne_maths(self, segs, fs=44, couleur_barre=WHITE):
        """Une ligne = des segments ("t", morceaux) ou ("f", morceaux du haut, morceaux
        du bas). Chaque texte est UN Text en morceaux ; les signes (=, +, →) sont centrés
        sur la barre des fractions. Renvoie un VGroup PLAT de morceaux (la barre va avec
        le 1er morceau du haut), avec .extraits, .textes et .blocs."""
        blocs = []
        for s in segs:
            if s[0] == "t":
                blocs.append(("t", self.construire(s[1], fs, 1e9)))
            else:
                n, d = self.construire(s[1], fs, 1e9), self.construire(s[2], fs, 1e9)
                w = max(n.width, d.width) + 0.26 * fs / 44
                bar = Line(LEFT * w / 2, RIGHT * w / 2, stroke_width=3.5 * fs / 44, color=couleur_barre)
                n.next_to(bar, UP, buff=0.12 * fs / 44)
                d.next_to(bar, DOWN, buff=0.12 * fs / 44)
                blocs.append(("f", VGroup(n, bar, d)))
        VGroup(*[b for _, b in blocs]).arrange(RIGHT, buff=self.espace(fs))
        fr_ = [b for k, b in blocs if k == "f"]
        if fr_:
            yb = fr_[0][1].get_center()[1]
            for k, b in blocs:
                if k == "f":
                    b.shift(UP * (yb - b[1].get_center()[1]))
                    continue
                gl = [m for morceau in b for m in morceau]
                car = glyphes(" ".join(b.textes))
                i = next((j for j, c in enumerate(car) if c in "=→+−×<>≥≤÷"), None)
                if i is not None and len(gl) == len(car):
                    b.shift(UP * (yb - gl[i].get_center()[1]))
                else:
                    j = next((j for j, c in enumerate(car) if c in "acemnorsuvwxz"), 0)
                    b.shift(UP * (yb - gl[j].get_center()[1] - 0.06 * fs / 44))
        g = VGroup()
        g.extraits, g.textes, g.blocs = [], [], [b for _, b in blocs]
        for k, b in blocs:
            if k == "t":
                for m, ex, tx in zip(b, b.extraits, b.textes):
                    g.add(m)
                    g.extraits.append(ex)
                    g.textes.append(tx)
            else:
                n, bar, d = b
                for j, (m, ex, tx) in enumerate(zip(n, n.extraits, n.textes)):
                    g.add(VGroup(m, bar) if j == 0 else m)
                    g.extraits.append(ex)
                    g.textes.append(tx)
                for m, ex, tx in zip(d, d.extraits, d.textes):
                    g.add(m)
                    g.extraits.append(ex)
                    g.textes.append(tx)
        return g


class SuiteLimiteCalculerTle(OutilsCalcul, PaysageSuites):
    fichier_marques = "suite_limite_calculer_marques.json"
    nom_voix = "terminale-suite-limite-calculer"
    identite = "Maths Tle — EleveAI"
    ceinture = "verte"
    largeur_bouton = 7.2
    hauteur_bouton = 0.8
    place_coche = 1.2

    def bouton(self, lettre, corps, largeur, fs):
        """Le bouton du module, avec une marge intérieure d'au moins 20 px autour du texte."""
        b = super().bouton(lettre, corps, largeur, fs)
        cadre, ligne = b
        h = max(self.hauteur_bouton, ligne.height + 0.4)
        if cadre.height < h:
            cadre.stretch_to_fit_height(h)
            ligne.move_to(cadre).align_to(cadre.get_left() + RIGHT * 0.2, LEFT)
        return b

    def ligne(self, morceaux, y, x=None, fs=40, avec=(), larg=None, avec_k=None, rt=0.25):
        g = self.construire(morceaux, fs, larg).move_to(P(0, y))
        if x is not None:
            g.align_to(P(x, 0), LEFT)
        return self.montrer(g, avec, rt=rt, avec_k=avec_k)

    def lmaths(self, segs, y, x=None, fs=44, avec=(), avec_k=None, rt=0.25, montrer=True):
        g = self.ligne_maths(segs, fs).move_to(P(0, y))
        if x is not None:
            g.align_to(P(x, 0), LEFT)
        return self.montrer(g, avec, rt=rt, avec_k=avec_k) if montrer else g

    def question_lignes(self, cle, groupes, choix, bonne, **kw):
        """poser_question, chaque ligne de la question en morceaux, chaque morceau à sa voix."""
        liste = [(g, None) for g in groupes]

        def dessin():
            for g in groupes:
                self.montrer(g, rt=0.22)
            liste.clear()
        return self.poser_question(cle, liste, choix, bonne, dessin=dessin, **kw)

    def axes(self, nu, extra=()):
        return [Create(nu.ax_n), Create(nu.ax_u), FadeIn(nu.lab_n), FadeIn(nu.lab_u), *extra]

    def trait_u(self, nu, v, couleur=GREY_B, texte=None, fs=26, x1=None, buff=0.12):
        """Un trait horizontal pointillé à la hauteur v (et son nombre, à gauche de l'axe)."""
        y = nu.G(nu.na, v)[1]
        tr = DashedLine(P(nu.ax_u.get_center()[0], y), P(x1 if x1 is not None else nu.X1 + 0.1, y), color=couleur,
                        stroke_width=3.5, dash_length=0.1)
        g = VGroup(tr)
        if texte:
            g.add(self.t(texte, fs, couleur, audit=False).next_to(tr, LEFT, buff=buff))
        return g

    def dominant(self, m, couleur=JAUNE_TITRE, buff=0.1):
        """Le terme dominant : un cadre jaune, sans mordre sur ses voisins."""
        return SurroundingRectangle(m, color=couleur, buff=buff, stroke_width=4, corner_radius=0.08)

    # ── 00 : la garde : la course n² contre 2ⁿ ──────────────────────────────

    def course_garde(self):
        nu = NuageTermes((0, 10.5), (0, 1100), P(-4.8, -1.75), P(2.6, 0.4), fs=24)
        bleus = [nu.point(n, n * n, r=0.07) for n in range(11)]
        oranges = [nu.point(n, 2 ** n, RAISON, r=0.07) for n in range(11)]
        ln = self.t("n²", 30, TERME, audit=False).next_to(bleus[-1], UP, buff=0.2)
        l2 = self.t("2ⁿ", 30, RAISON, audit=False).next_to(oranges[-1], LEFT, buff=0.3)
        self.play(*self.axes(nu), run_time=0.35)
        self.play(LaggedStart(*[GrowFromCenter(d) for d in bleus], lag_ratio=0.12), FadeIn(ln), run_time=0.9)
        self.play(LaggedStart(*[GrowFromCenter(d) for d in oranges], lag_ratio=0.12), FadeIn(l2), run_time=0.9)
        self.play(Flash(oranges[-1], color=RAISON, line_length=0.18), Indicate(l2, color=RAISON), run_time=0.5)

    def ecran_garde(self):
        self.garde("Calculer la limite d'une suite",
                   [("Quand n devient énorme,", "Quand"), ("quel terme gagne ?", "quel terme", JAUNE_TITRE)],
                   dessin=self.course_garde, extrait_titre="Calculer")

    # ── 01 : Mehdi, data scientist, ses deux algorithmes ───────────────────

    def ecran_situation(self):
        self.nouvel_ecran("01-situation")
        perso = mehdi(0.9).move_to(P(-4.6, 2.1))
        nom = self.t("Mehdi", 42, JAUNE_TITRE).next_to(perso, DOWN, buff=0.22)
        metier = self.t("data scientist", 34, TERME).next_to(nom, DOWN, buff=0.12)
        self.au_mot("Mehdi")
        self.play(FadeIn(perso, shift=UP * 0.2), FadeIn(nom, shift=UP * 0.1), run_time=0.45)
        pc = portable(1.15).move_to(P(-0.9, 1.75))
        self.au_mot("data scientist")
        self.play(FadeIn(metier, shift=UP * 0.1), FadeIn(pc, shift=UP * 0.15), run_time=0.45)
        self.au_mot("intelligences")
        self.play(LaggedStart(*[Indicate(nd, color=JAUNE_TITRE, scale_factor=1.6) for nd in pc.noeuds],
                              lag_ratio=0.15), run_time=1.2)
        # les données : n petits carrés
        dn = donnees(24).move_to(P(3.7, 2.05))
        ldn = self.construire([("n", TERME, "n données"), ("données", WHITE, None)], 34).next_to(dn, DOWN, buff=0.25)
        self.au_mot("n données")
        self.play(LaggedStart(*[FadeIn(c, scale=0.5) for c in dn], lag_ratio=0.03), FadeIn(ldn), run_time=0.5)
        x0 = -6.2
        self.ligne([("Premier algorithme :", GREY_A, "un premier"), ("n²", TERME, "n au carré"),
                    ("− 100 n", TERME, "100"), ("opérations", GREY_A, "opérations")], -0.55, x=x0, fs=40)
        self.ligne([("Second algorithme :", GREY_A, "un second"), ("2ⁿ", RAISON, "2 puissance"),
                    ("opérations", GREY_A, None)], -1.35, x=x0, fs=40)
        # la pluie de données : des millions de petits carrés tombent dans l'ordinateur
        pluie = VGroup(*[Square(0.09, fill_color=CIEL, fill_opacity=0.9, stroke_width=0).move_to(
            P(2.3 + 0.27 * (k % 12), 3.0 - 0.14 * (k // 12))) for k in range(24)])
        self.ligne([("Des millions de données :", WHITE, "des millions")], -2.35, x=x0, fs=40,
                   avec_k={0: [Transform(dn, pluie)]})
        self.play(LaggedStart(*[c.animate.move_to(pc.ecran.get_center()).scale(0.3).set_opacity(0) for c in dn],
                              lag_ratio=0.02), ldn.animate.move_to(pc.get_bottom() + DOWN * 0.3), run_time=0.9)
        self.remove(dn)
        q = self.ligne([("lequel va exploser ?", JAUNE_TITRE, "lequel")], -3.05, x=x0, fs=42)
        self.play(Wiggle(pc, scale_value=1.06), run_time=0.6)
        self.insister(q, 1.08)
        self.attendre_voix(marge=0.5)

    # ── 02 : les limites de référence : un nuage qui change de forme ───────

    def ecran_references(self):
        self.nouvel_ecran("02-references")
        self.titre("Les limites de référence", JAUNE_TITRE, 46, extrait="Les limites")
        x0 = -6.2
        nu = NuageTermes((0, 10.5), (-1.45, 3.2), P(2.75, -1.85), P(5.6, 2.05), fs=26)
        fam = [[3.0 * (n / 10) ** 2 for n in range(1, 11)], [2.6 / n for n in range(1, 11)],
               [2.6 * 0.62 ** n for n in range(1, 11)], [0.09 * 1.42 ** n for n in range(1, 11)],
               [0.3 * (-1.18) ** n for n in range(1, 11)]]
        couls = [TERME, TERME, TERME, TERME, PIEGE]

        def pts(k):
            return VGroup(*[nu.point(n + 1, v, couls[k], r=0.075) for n, v in enumerate(fam[k])])
        p = pts(0)
        haut = Arrow(P(6.05, 0.7), P(6.05, 2.05), buff=0, color=JUSTE, stroke_width=6, tip_length=0.2)
        self.ligne([("n,", TERME, "n, n"), ("n²", TERME, "carré"), ("et", WHITE, None), ("√n", TERME, "racine"),
                    ("→ +∞", JUSTE, "plus l'infini")], 2.1, x=x0, fs=40,
                   avec_k={0: self.axes(nu, [LaggedStart(*[GrowFromCenter(d) for d in p], lag_ratio=0.1)]),
                           4: [GrowArrow(haut)]})
        zero = Line(nu.G(0, 0), nu.G(10.5, 0), color=JUSTE, stroke_width=6)
        self.ligne([("1/n", TERME, "1 sur n"), ("et", WHITE, None), ("1/n²", TERME, "1 sur n au carré"), ("→ 0", JUSTE, "0")],
                   1.25, x=x0, fs=40, avec_k={0: [FadeOut(haut), Transform(p, pts(1))], 3: [Create(zero)]})
        self.ligne([("qⁿ", RAISON, "q puissance"), ("→ 0", JUSTE, "0"), ("si", WHITE, "si q"),
                    ("−1 <", RAISON, "moins"), ("q", RAISON, None), ("< 1", RAISON, "1,")], 0.4, x=x0, fs=40,
                   avec_k={0: [Transform(p, pts(2))], 1: [Indicate(zero, color=JUSTE)]})
        self.ligne([("qⁿ", RAISON, "vers plus"), ("→ +∞", JUSTE, None), ("si", WHITE, "si q est plus"),
                    ("q >", RAISON, "grand"), ("1", RAISON, "1")], -0.45, x=x0, fs=40,
                   avec_k={0: [FadeOut(zero), Transform(p, pts(3)), GrowArrow(haut)]})
        self.ligne([("si", WHITE, "Si q"), ("q ≤", RAISON, "inférieur"), ("−1", RAISON, "moins 1"), (":", WHITE, None),
                    ("pas de limite", PIEGE, "il n'y a")], -1.3, x=x0, fs=40,
                   avec_k={0: [FadeOut(haut), Transform(p, pts(4))]})
        self.play(LaggedStart(*[Indicate(d, color=PIEGE, scale_factor=1.5) for d in p], lag_ratio=0.1), run_time=0.9)
        self.attendre_voix(marge=0.6)

    # ── 03 : le premier algorithme n² − 100 n : factoriser par le terme dominant ──

    def ecran_polynome(self):
        self.nouvel_ecran("03-polynome")
        pc = portable(0.42, reseau=False).move_to(P(-3.55, 3.12))
        tit = self.t("Premier algorithme", 46, JAUNE_TITRE).move_to(P(0.3, 3.15))
        self.au_mot("Premier")
        self.play(FadeIn(tit, shift=DOWN * 0.1), FadeIn(pc), run_time=0.4)
        x0 = -6.2
        nu = NuageTermes((0, 205), (-2500, 20000), P(2.95, 0.75), P(5.75, 2.3), fs=24)
        pts = [nu.point(10 * k, v, r=0.06) for k, v in enumerate(POLY)]
        l1 = self.ligne([("n²", TERME, "n au carré"), ("− 100 n", RAISON, "100")], 2.15, x=x0, fs=50,
                        avec_k={1: self.axes(nu, [LaggedStart(*[GrowFromCenter(d) for d in pts], lag_ratio=0.06)])})
        self.ligne([("On obtient", WHITE, "On obtient"), ("« +∞", PIEGE, "plus"), ("− (+∞) »", PIEGE, "moins plus")],
                   1.25, x=x0, fs=40)
        self.ligne([("On factorise par le terme", WHITE, "on factorise")], 0.45, x=x0, fs=38)
        cad = self.dominant(l1[0], buff=0.12)
        self.ligne([("de plus haut degré :", JAUNE_TITRE, "de plus haut")], -0.2, x=x0, fs=38,
                   avec_k={0: [Create(cad), Indicate(l1[0], color=JAUNE_TITRE, scale_factor=1.25)]})
        f = self.lmaths([("t", [("n²", WHITE, "n au carré"), ("−", WHITE, None), ("100 n", WHITE, "100"), ("=", WHITE, "égale"),
                                ("n²", JAUNE_TITRE, "n au carré"), ("×", WHITE, "fois"),
                                ("(1 −", RAISON, "1 moins"), ("100/n)", RAISON, "100 sur")])], -1.25, x=-5.4, fs=46)
        f1 = Arrow(f[4].get_bottom() + DOWN * 0.08, f[4].get_bottom() + DOWN * 0.62, buff=0, color=JUSTE,
                   stroke_width=5, tip_length=0.16)
        par = VGroup(f[6], f[7])
        f2 = Arrow(par.get_bottom() + DOWN * 0.08, par.get_bottom() + DOWN * 0.62, buff=0, color=JUSTE,
                   stroke_width=5, tip_length=0.16)
        li = self.t("+∞", 40, JUSTE).next_to(f1, DOWN, buff=0.08)
        l_1 = self.t("1", 40, JUSTE).next_to(f2, DOWN, buff=0.08)
        self.au_mot("tend vers plus")
        self.play(GrowArrow(f1), FadeIn(li, shift=DOWN * 0.1), run_time=0.3)
        self.suivre("1")
        self.play(GrowArrow(f2), FadeIn(l_1, shift=DOWN * 0.1), run_time=0.3)
        fin = self.ligne([("La limite est", JUSTE, "la limite"), ("+∞", JUSTE, "plus l'infini")], -3.0, x=-3.2, fs=44)
        self.play(Create(self.encadre(fin, JUSTE, 0.16)), *[d.animate.set_color(JUSTE) for d in pts[11:]],
                  run_time=0.35)
        self.attendre_voix(marge=0.6)

    # ── 04 : question-pause n° 1 → B (−∞) ──────────────────────────────────

    def ecran_question1(self):
        g = self.construire([("Pour", WHITE, "Pour u"), ("uₙ =", TERME, None), ("−2n³", WHITE, "2 n au cube"),
                             ("+ 5n²,", WHITE, "5 n"), ("la limite est :", WHITE, "la limite")], 42)
        q = self.question_lignes("04-question", [g], ["+∞", "−∞", "on ne peut pas conclure"], 1, fs=40, largeur=8.4)
        self.dire("04b-reponse")
        ok = self.q_reponse(q, 1)
        self.play(FadeOut(q.cartes[0]), FadeOut(q.cartes[2]),
                  VGroup(q.cartes[1], ok).animate.move_to(P(0, q.question.get_bottom()[1] - 0.75)), run_time=0.3)
        x0 = -6.2
        yb = q.question.get_bottom()[1] - 0.75 - q.cartes[1].height / 2
        cad = self.dominant(g[2], buff=0.08)
        nu = NuageTermes((0, 5.5), (-135, 12), P(2.75, -1.95), P(5.6, yb - 1.25), fs=24)
        pts = [nu.point(n, Q1[n], r=0.075) for n in range(6)]
        self.ligne([("Le terme de plus haut degré,", WHITE, "Le terme")], yb - 0.5, x=x0, fs=40,
                   avec_k={0: [Create(cad)]})
        self.ligne([("−2n³,", JAUNE_TITRE, "2 n au cube"), ("l'emporte :", WHITE, "l'emporte")], yb - 1.25, x=x0, fs=42,
                   avec_k={0: [Indicate(g[2], color=JAUNE_TITRE, scale_factor=1.25)],
                           1: self.axes(nu, [LaggedStart(*[GrowFromCenter(d) for d in pts], lag_ratio=0.12)])})
        bas = Arrow(nu.G(5.5, -45) + RIGHT * 0.3, nu.G(5.5, -130) + RIGHT * 0.3, buff=0, color=JUSTE, stroke_width=6, tip_length=0.2)
        fin = self.ligne([("il tend vers", JUSTE, "il tend"), ("−∞", JUSTE, "moins l'infini")], yb - 2.15, x=x0 + 0.2,
                         fs=44, avec_k={1: [GrowArrow(bas), *[d.animate.set_color(JUSTE) for d in pts[3:]]]})
        self.play(Create(self.encadre(fin, JUSTE, 0.16)), run_time=0.3)
        self.attendre_voix(marge=0.6)

    # ── 05 : le quotient (3n + 1)/(n + 2) → 3 ──────────────────────────────

    def ecran_quotient(self):
        self.nouvel_ecran("05-quotient")
        self.titre("Un quotient", JAUNE_TITRE, 46, extrait="quotient")
        x0 = -6.2
        self.ligne([("On factorise", WHITE, "on factorise"), ("en haut et en bas.", RAISON, "en haut")], 2.42, x=x0,
                   fs=40)
        nu = NuageTermes((0, 20.5), (0, 3.4), P(2.6, -1.35), P(5.6, 1.3), fs=24)
        pts = [nu.point(n, QUO[n], r=0.07) for n in range(21)]
        l3 = self.trait_u(nu, 3, JUSTE, "3")
        r1 = self.lmaths([("t", [("uₙ =", TERME, "u indice")]),
                          ("f", [("3n", WHITE, "3 n"), ("+ 1", WHITE, "1")], [("n", WHITE, "n plus"), ("+ 2", WHITE, "2")])],
                         1.5, x=x0, fs=42,
                         avec_k={4: self.axes(nu, [LaggedStart(*[GrowFromCenter(d) for d in pts], lag_ratio=0.05)])})
        c1, c2 = self.dominant(r1[1][0], buff=0.08), self.dominant(r1[3], buff=0.08)
        div = self.t("÷ n", 40, RAISON).next_to(r1, RIGHT, buff=0.35)
        self.au_mot("On divise")
        self.play(Create(c1), Create(c2), FadeIn(div, scale=1.3), run_time=0.35)
        r2 = self.lmaths([("t", [("=", WHITE, None)]),
                          ("f", [("3", JAUNE_TITRE, "3 plus"), ("+ 1/n", WHITE, "1 sur")],
                           [("1", JAUNE_TITRE, "1 plus"), ("+ 2/n", WHITE, "2 sur")])], -0.02, fs=42, montrer=False)
        r2.shift(RIGHT * (r1[0][-1].get_center()[0] - r2[0].get_center()[0]))   # « = » sous « = »
        self.montrer(r2)
        fin = self.lmaths([("t", [("La limite est", WHITE, "La limite")]), ("f", [("3", JUSTE, "3")], [("1", JUSTE, "1")]),
                           ("t", [("=", WHITE, None), ("3", JUSTE, "3")])], -1.3, x=x0, fs=40,
                          avec_k={0: [r2[2].animate.set_opacity(0.35), r2[4].animate.set_opacity(0.35)],
                                  4: [Create(l3), *[d.animate.set_color(JUSTE) for d in pts[8:]]]})
        self.play(Create(self.encadre(fin, JUSTE, 0.14)), run_time=0.3)
        self.ligne([("Même degré en haut et en bas :", WHITE, "Même degré"),
                    ("la limite est le", WHITE, "la limite est le")], -2.5, x=x0, fs=36, larg=11.3)
        self.ligne([("quotient des coefficients dominants.", JAUNE_TITRE, "quotient")], -3.1, x=x0, fs=36, larg=11.3,
                   avec_k={1: [Indicate(VGroup(r2[0][0], r2[2]), color=JAUNE_TITRE, scale_factor=1.3)]})
        self.attendre_voix(marge=0.6)

    # ── 06 : question-pause n° 2 → A (2) ; le piège des constantes ─────────

    def ecran_question2(self):
        g = self.ligne_maths([("t", [("La limite de", WHITE, "La limite")]),
                              ("f", [("4n²", WHITE, "4 n"), ("− 1", WHITE, "1")], [("2n²", WHITE, "2 n"), ("+ 7", WHITE, "7")]),
                              ("t", [("est :", WHITE, "est :")])], 44)
        q = self.question_lignes("06-question", [g], ["2", self.couper("−1/7", [(2, WHITE, "1"), (2, WHITE, "7")], 40, choix=True), "+∞"],
                                 0, fs=40)
        self.dire("06b-reponse")
        ok = self.q_reponse(q, 0)
        x0 = -6.2
        yc = q.question.get_bottom()[1] - 0.7
        self.play(FadeOut(q.cartes[1]), FadeOut(q.cartes[2]),
                  VGroup(q.cartes[0], ok).animate.move_to(P(x0 + q.cartes[0].width / 2, yc)), run_time=0.3)
        yb = yc - q.cartes[0].height / 2
        c4, c2 = self.dominant(g[1][0], buff=0.04), self.dominant(g[3], buff=0.04)
        nu = NuageTermes((0, 12.5), (-0.45, 2.3), P(2.75, -1.95), P(5.6, 0.2), fs=24)
        pts = [nu.point(n, Q2[n], PIEGE if n == 0 else TERME, r=0.075) for n in range(13)]
        l2 = self.trait_u(nu, 2, JUSTE, "2")
        self.ligne([("Même degré :", WHITE, "Même degré"), ("on garde", WHITE, "on garde")], yb - 0.45, x=x0, fs=40,
                   avec_k={0: self.axes(nu, [LaggedStart(*[GrowFromCenter(d) for d in pts], lag_ratio=0.06)])})
        self.ligne([("les coefficients dominants :", JAUNE_TITRE, "les coefficients")], yb - 1.2, x=x0, fs=40,
                   avec_k={0: [Create(c4), Create(c2)]})
        fin = self.lmaths([("f", [("4", JAUNE_TITRE, "4")], [("2", JAUNE_TITRE, "2")]),
                           ("t", [("=", WHITE, None), ("2", JUSTE, "2")])], yb - 2.3, x=x0 + 0.2, fs=44,
                          avec_k={3: [Create(l2), *[d.animate.set_color(JUSTE) for d in pts[4:]]]})
        self.play(Create(self.encadre(fin, JUSTE, 0.14)), run_time=0.3)
        r1, r7 = self.encadre(g[2], PIEGE, 0.04), self.encadre(g[4], PIEGE, 0.04)
        self.montrer(self.couper("−1/7, c'est le piège des constantes", [(2, PIEGE, "1"), (3, PIEGE, "7"),
                                                                         (None, PIEGE, "c'est le piège")], 40)
                     .move_to(P(0, yb - 3.4)).align_to(P(x0, 0), LEFT), avec_k={0: [Create(r1), Create(r7), Indicate(pts[0], color=PIEGE, scale_factor=1.8)]})
        self.attendre_voix(marge=0.6)

    # ── 07 : croissances comparées : 2ⁿ écrase n² ──────────────────────────

    def ecran_comparees(self):
        self.nouvel_ecran("07-comparees")
        pc = portable(0.42, reseau=False).move_to(P(-4.75, 3.12))
        x0 = -6.2
        tit = self.construire([("Second algorithme :", JAUNE_TITRE, "Second"), ("2ⁿ", RAISON, "2 puissance")], 46)
        tit.move_to(P(0.3, 3.15))
        self.montrer(tit, avec_k={0: [FadeIn(pc)]})
        nu = NuageTermes((0, 10.5), (0, 1100), P(2.55, -1.55), P(5.5, 1.95), fs=24)
        bleus = [nu.point(n, n * n, r=0.07) for n in range(11)]
        oranges = [nu.point(n, 2 ** n, RAISON, r=0.07) for n in range(11)]
        ln = self.t("n²", 32, TERME, audit=False).next_to(bleus[-1], UP, buff=0.22)
        l2 = self.t("2ⁿ", 32, RAISON, audit=False).next_to(oranges[-1], LEFT, buff=0.6)
        self.ligne([("Croissances comparées :", JAUNE_TITRE, "Croissances")], 2.2, x=x0, fs=42,
                   avec_k={0: self.axes(nu)})
        self.ligne([("une exponentielle", RAISON, "une exponentielle"), ("l'emporte", WHITE, "l'emporte")], 1.4,
                   x=x0, fs=40, avec_k={0: [LaggedStart(*[GrowFromCenter(d) for d in oranges], lag_ratio=0.1),
                                            FadeIn(l2)]})
        self.ligne([("sur toute puissance de", WHITE, "sur toute"), ("n.", TERME, "de n")], 0.7, x=x0, fs=40,
                   avec_k={0: [LaggedStart(*[GrowFromCenter(d) for d in bleus], lag_ratio=0.1), FadeIn(ln)]})
        fr_ = self.lmaths([("f", [("n²", TERME, "n au carré sur")], [("2ⁿ", RAISON, "2 puissance")]),
                           ("t", [("→ 0", JUSTE, "0")])], -0.45, x=x0 + 0.2, fs=46)
        self.play(Create(self.encadre(fr_, JUSTE, 0.14)), run_time=0.3)
        self.ligne([("À long terme,", WHITE, "long terme"), ("2ⁿ", RAISON, "2 puissance"), ("écrase", PIEGE, "écrase"),
                    ("n²", TERME, "n au carré")], -1.75, x=x0, fs=42,
                   avec_k={2: [*[d.animate.stretch(0.5, 1) for d in bleus], Indicate(VGroup(*oranges[6:]), color=RAISON)]})
        bo = explosion(0.9).move_to(oranges[-1].get_center() + LEFT * 0.05)
        self.ligne([("C'est le second algorithme qui explose.", PIEGE, "C'est le second")], -2.8, x=x0, fs=40, larg=10.6,
                   avec_k={0: [GrowFromCenter(bo), Flash(oranges[-1], color=PIEGE, line_length=0.3),
                               Wiggle(pc, scale_value=1.2)]})
        self.attendre_voix(marge=0.6)

    # ── 08 : le piège : forme indéterminée ≠ pas de limite ─────────────────

    def ecran_piege(self):
        self.nouvel_ecran("08-piege")
        tit = self.t("Voilà le piège !", 46, PIEGE).move_to(P(0, 3.15))
        self.au_mot("piège")
        self.play(FadeIn(tit, scale=1.3), run_time=0.35)
        self.ligne([("Une forme indéterminée", RAISON, "Une forme"), ("ne veut pas dire", WHITE, "ne veut pas")], 2.2,
                   fs=42)
        pdl = self.ligne([("« pas de limite »", PIEGE, "pas de limite")], 1.4, fs=42)
        self.play(Create(self.rayer(pdl)), run_time=0.3)
        pan = panneau(1.0).move_to(P(-4.7, 0.05))
        f1 = self.lmaths([("t", [("«", RAISON, "Infini")]), ("f", [("∞", RAISON, None)], [("∞", RAISON, "infini »")]),
                          ("t", [("»", RAISON, None)])], 0.05, fs=46, montrer=False).move_to(P(-1.6, 0.05))
        f2 = self.construire([("« ∞ − ∞ »", RAISON, "infini moins")], 46).move_to(P(2.0, 0.05))
        self.montrer(f1, avec_k={0: [FadeIn(pan, scale=0.6)]})
        self.montrer(f2)
        self.ligne([("c'est seulement", WHITE, "c'est seulement"), ("le signal", RAISON, "le signal")], -1.15, fs=40,
                   avec_k={1: [Indicate(pan, color=RAISON, scale_factor=1.2)]})
        self.ligne([("qu'il faut transformer l'écriture :", WHITE, "qu'il faut")], -1.85, fs=40)
        etapes = VGroup()
        for k, (mot, c) in enumerate((("factoriser", TERME), ("simplifier", TERME), ("conclure", JUSTE))):
            t = self.t(mot, 38, c)
            b = RoundedRectangle(width=t.width + 0.6, height=t.height + 0.5, corner_radius=0.14, stroke_color=c,
                                 stroke_width=3, fill_color=FOND_CARTE, fill_opacity=1)
            etapes.add(VGroup(b, t.move_to(b)))
        etapes.arrange(RIGHT, buff=0.9).move_to(P(-0.6, -2.95))
        fls = [Arrow(etapes[k].get_right(), etapes[k + 1].get_left(), buff=0.1, color=GREY_A, stroke_width=4,
                     tip_length=0.18) for k in range(2)]
        for k, ex in enumerate(("factoriser", "simplifier", "conclure")):
            self.au_mot(ex)
            anims = [FadeIn(etapes[k], shift=RIGHT * 0.15)]
            if k:
                anims.append(GrowArrow(fls[k - 1]))
            self.play(*anims, run_time=0.3)
        self.play(Indicate(etapes[2], color=JUSTE, scale_factor=1.1), run_time=0.4)
        self.attendre_voix(marge=0.6)

    # ── 09 : le défi : trois suites, trois limites à trouver ───────────────

    def case_q(self, x, y):
        """La case de la réponse, « ? » orange en attendant la correction."""
        b = RoundedRectangle(width=1.0, height=0.82, corner_radius=0.12, stroke_color=RAISON, stroke_width=3,
                             fill_color=FOND_CARTE, fill_opacity=1).move_to(P(x, y))
        return VGroup(b, self.t("?", 44, RAISON, audit=False).move_to(b))

    def ecran_defi(self):
        self.nouvel_ecran("09-defi")
        x0 = -6.0
        pc = portable(1.3, reseau=False).move_to(P(3.95, 0.15))
        gq = self.t("?", 80, RAISON, audit=False).move_to(pc.ecran)
        tit = self.titre("À toi de jouer !", JAUNE_TITRE, 48, extrait="À toi")
        self.play(FadeIn(pc, shift=UP * 0.15), FadeIn(gq, scale=0.6), run_time=0.35)
        self.ligne([("Pour n ≥", WHITE, "Pour n"), ("1,", WHITE, "1"), ("trouve la limite de chaque suite.", WHITE, "trouve")],
                   2.25, fs=38)
        lignes = []
        specs = [[("t", [("uₙ =", TERME, "u indice"), ("5 −", WHITE, "5")]), ("f", [("3", WHITE, "3")], [("n²", WHITE, "n au carré")])],
                 [("t", [("vₙ =", TERME, "v indice")]),
                  ("f", [("2n", WHITE, "2 n"), ("+ 1", WHITE, "1")], [("n²", WHITE, "n au carré"), ("+ 3", WHITE, "3")])],
                 [("t", [("wₙ =", TERME, "w"), ("3 ×", WHITE, "3 fois"), ("0,5ⁿ", RAISON, "0,5"), ("+ 4", WHITE, "4")])]]
        cases = []
        for k, (sp, y) in enumerate(zip(specs, (1.05, -0.4, -1.75))):
            g = self.lmaths(sp, y, x=x0, fs=42, montrer=False)
            fl = self.t("→", 44, GREY_A).move_to(P(0.0, y))
            c = self.case_q(0.95, y)
            self.montrer(g, avec_k={len(g) - 1: [FadeIn(fl), FadeIn(c, scale=0.8)]})
            lignes.append(g)
            cases.append(c)
        self.play(Indicate(gq, color=RAISON, scale_factor=1.2), run_time=0.4)
        self.defi_pause(-2.95, x=-1.0)
        self._defi = (tit, lignes, cases, VGroup(pc, gq))

    def ecran_correction(self):
        self.dire("09b-correction")
        tit, lignes, cases, pc = self._defi
        self.au_mot("Correction")
        cor = self.t("Correction", 46, JUSTE).move_to(tit)
        self.play(FadeOut(pc), ReplacementTransform(tit, cor), run_time=0.4)
        xr = 1.75

        def repondre(k, texte):
            self.suivre(texte)
            b, q = cases[k]
            v = self.t(texte, 44, JUSTE).move_to(b)
            self.play(FadeOut(q), FadeIn(v, scale=1.4), b.animate.set_stroke(JUSTE, width=5), run_time=0.3)
            self.insister(VGroup(b, v), 1.12, run_time=0.2)
        # u : 3/n² → 0
        u, v_, w = lignes
        self.lmaths([("f", [("3", RAISON, "3")], [("n²", RAISON, "n au carré")]), ("t", [("→ 0", JUSTE, "0")])],
                    1.05, x=xr, fs=40, avec_k={0: [Indicate(VGroup(u[2], u[3]), color=RAISON, scale_factor=1.15)]})
        repondre(0, "5")
        # v : le dénominateur l'emporte
        cden, cnum = self.dominant(VGroup(v_[3], v_[4]), buff=0.035), self.dominant(VGroup(v_[1][0], v_[2]), GREY_A, 0.035)
        self.ligne([("dénominateur :", JAUNE_TITRE, "dénominateur"), ("degré 2", JAUNE_TITRE, "degré 2")], -0.15, x=xr,
                   fs=32, larg=4.85, avec_k={0: [Create(cden)]})
        self.au_mot("l'emporte")
        self.play(Indicate(VGroup(v_[3], v_[4]), color=JAUNE_TITRE, scale_factor=1.12), run_time=0.35)
        self.ligne([("numérateur :", GREY_A, "numérateur"), ("degré 1", GREY_A, "degré 1")], -0.7, x=xr, fs=32, larg=4.85,
                   avec_k={0: [Create(cnum)]})
        self.au_mot("v indice n tend")
        repondre(1, "0")
        # w : 0,5ⁿ → 0
        self.ligne([("0,5ⁿ", RAISON, "0,5"), ("→ 0", JUSTE, "0")], -1.75, x=xr, fs=40,
                   avec_k={0: [Indicate(w[2], color=RAISON, scale_factor=1.2)]})
        self.au_mot("w indice n tend")
        repondre(2, "4")
        self.attendre_voix(marge=0.6)

    # ── 10 : ce que tu as appris ───────────────────────────────────────────

    def ecran_appris(self):
        def base(l):
            gl = [m for morceau in l for m in morceau]
            car = glyphes(" ".join(l.textes))
            k = next(i for i, c in enumerate(car) if c in "acemnorsuvwxz")
            return gl[k].get_bottom()[1]
        J = JAUNE_TITRE
        points = [[[("On part des limites de référence", WHITE, "On part")], [("et de", WHITE, "et de q"), ("qⁿ.", RAISON, None)]],
                  [[("Pour un polynôme ou un quotient,", WHITE, "Pour un")],
                   [("on factorise par", WHITE, "on factorise"), ("le terme qui domine.", J, "le terme")]],
                  [[("L'exponentielle", RAISON, "l'exponentielle"), ("l'emporte", WHITE, "l'emporte")],
                   [("sur toute puissance de n.", WHITE, "sur toute")]]]
        self.nouvel_ecran("10-finale", margo=0.65)
        self.au_mot("Ce que tu as appris")
        tit = self.t("Ce que tu as appris", 46, J).to_edge(UP, buff=0.45)
        self.play(Write(tit), run_time=0.7)
        blocs = []
        for pt in points:
            lignes = VGroup(*[self.construire(l, 44, 1e9) for l in pt]).arrange(DOWN, aligned_edge=LEFT, buff=0.18)
            for k, l in enumerate(lignes):
                if k:
                    l.shift(UP * (base(lignes[0]) - 0.7 * k - base(l)))
            blocs.append(VGroup(self.coche(), lignes).arrange(RIGHT, buff=0.3, aligned_edge=UP))
        tout = VGroup(*blocs).arrange(DOWN, aligned_edge=LEFT, buff=0.5)
        if tout.width > 11.6:
            tout.scale_to_fit_width(11.6)
        if tout.height > 5.8:
            tout.scale_to_fit_height(5.8)
        tout.move_to(P(0, -0.3))
        for bloc in blocs:
            for k, l in enumerate(bloc[1]):
                self.montrer(l, rt=0.3, avec_k={0: [Create(bloc[0])]} if k == 0 else None)
        self.attendre_voix(marge=0.8)

    def construct(self):
        ecrans = [self.ecran_garde, self.ecran_situation, self.ecran_references, self.ecran_polynome,
                  self.ecran_question1, self.ecran_quotient, self.ecran_question2, self.ecran_comparees,
                  self.ecran_piege, self.ecran_defi, self.ecran_correction, self.ecran_appris,
                  lambda: self.fin("11-abonne")]
        choix = os.environ.get("ECRANS")          # contrôle rapide : ECRANS=5,6 (jamais au rendu final)
        for k, e in enumerate(ecrans):
            if not choix or str(k) in choix.split(",") or (e == self.ecran_correction and "9" in choix.split(",")):
                e()
