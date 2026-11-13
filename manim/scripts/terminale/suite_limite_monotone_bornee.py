# suite_limite_monotone_bornee.py
# EleveAI — Maths Terminale (spé) — paysage « Convergence monotone »
# (16:9), ceinture VERTE. Série SUITES du lycée, épisode 37.
# Micro du coach : limite_suite_monotone_bornee (notion limite_suite) :
# lib/tutor-v4/questionBank/terminale-spe/maths/limites-suites.bank.ts + limites-suites-renfort.ts.
#
# Ce que demande le coach → écran :
#   · croissante et majorée, décroissante et minorée : elle converge (fixed_1,
#     fixed_2, h1, h2, tcm)                                                    → 03, 08b ;
#   · le théorème ne donne PAS la valeur : un majorant n'est pas forcément la
#     limite (tcm « converge vers M », tcmHypo t = 2, tcmSituation, open_2)    → 04 (B), 06 ;
#   · l'hypothèse qui manque : décroissante → il faut minorée ; « croissante et
#     minorée » n'apprend rien (tcmHypo, tcm)                                  → 06, 07 (A) ;
#   · la limite par le point fixe ℓ = f(ℓ) (tcmPointFixe)                      → 05, 08b ;
#   · une situation concrète (tcmSituation : l'hydrologue et son réservoir)    → 01, 02.
# Clé de voix → écran :
#   00-garde (les termes qui montent sous un plafond) · 01 Yohan, hydrologue :
#   le lac du barrage, − 20 % vers la rivière, + 4 de pluie · 02 le modèle
#   u₀ = 5, uₙ₊₁ = 0,8uₙ + 4, uₙ ≤ uₙ₊₁ ≤ 20 (le nuage sous le plafond 20) ·
#   03 le théorème (deux cartes : monte sous un plafond, descend sur un
#   plancher) · 04/04b question (B : converge, limite inconnue ; le plafond 50
#   et la vraie limite dessous) · 05 le point fixe ℓ = 0,8ℓ + 4 → 20 · 06 le
#   piège : le plafond 30, la limite 20, le plancher u₀ · 07/07b question (A :
#   minorée ; la suite qui descend sur son plancher) · 08/08b défi
#   uₙ₊₁ = 0,5uₙ + 2 (plancher 3, limite 4) · 09 « Ce que tu as appris » · 10 fin.
# Code couleur (module commun) : bleu = uₙ, orange = les bornes (plafond,
# plancher), vert = juste (la limite), rouge = piège.
# ⛔ Pas de LaTeX. Voix : manim/voix/terminale-suite-limite-monotone-bornee.json
# (débit −6), calée mot à mot par suite_limite_monotone_bornee_marques.json.
# Contrôle : AUDIT=1 BORDS=1 python -m manim render --dry_run …  (BORDS=1 : MARGO aussi)
# python -m manim render -qh --disable_caching manim/scripts/terminale/suite_limite_monotone_bornee.py SuiteLimiteMonotoneBorneeTle -o eleveai-maths-terminale-suite-limite-monotone-bornee --media_dir manim/scripts/terminale/media-suite-limite-monotone-bornee
# Sortie : manim/sorties/terminale/maths/suites/37-limite-monotone-bornee/

import math
import os
import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI))
sys.path.insert(1, str(ICI.parent / "premiere"))

from suites_commun import *  # noqa: E402,F403
from suite_limite_calculer import OutilsCalcul  # noqa: E402
from suite_limite_interpreter import glyphes  # noqa: E402
from suite_limite_operations import VerifMargo  # noqa: E402


def recurrente(u0, a, b, nb=60):
    v = [u0]
    for _ in range(nb):
        v.append(a * v[-1] + b)
    return v


# ── les affirmations de la voix, vérifiées ──────────────────────────────────
U = recurrente(5, 0.8, 4)                                                    # 01, 02 : le lac de Yohan
assert U[0] == 5 and abs(U[1] - 8) < 1e-9                                   # 5, puis 0,8 × 5 + 4 = 8
assert all(U[n] <= U[n + 1] <= 20 for n in range(59))                       # 02 : croissante, majorée par 20
assert abs(U[59] - 20) < 1e-4 and abs(0.2 * 20 - 4) < 1e-12 and abs(0.8 * 20 + 4 - 20) < 1e-12   # 05 : ℓ = 20
assert all(x <= 30 for x in U) and all(x >= U[0] for x in U)                # 06 : ≤ 30 aussi ; minorée par u₀
Q1 = [35 - 25 * 0.75 ** n for n in range(40)]                               # 04b : une suite sous le plafond 50
assert all(Q1[n] <= Q1[n + 1] <= 50 for n in range(39)) and abs(Q1[39] - 35) < 0.01   # sa limite : 35, pas 50
D7 = [3 + 6 * 0.7 ** n for n in range(40)]                                  # 07b : elle descend sur un plancher
assert all(D7[n + 1] <= D7[n] for n in range(39)) and min(D7) >= 3
V = recurrente(10, 0.5, 2)                                                  # 08 : le défi
assert all(V[n + 1] <= V[n] and V[n] >= 3 for n in range(59))               # décroissante, minorée par 3
assert abs(V[59] - 4) < 1e-9 and abs(0.5 * 4 + 2 - 4) < 1e-12 and abs(2 / 0.5 - 4) < 1e-12   # 08b : ℓ = 4
G0 = [9 - 6 * 0.65 ** n for n in range(14)]                                 # 03 : la carte « monte »
G1 = [3 + 6 * 0.65 ** n for n in range(14)]                                 # 03 : la carte « descend »
assert max(G0) <= 10.5 and min(G1) >= 1.5

PEAU = "#a16207"
EAU, EAU2 = "#38bdf8", "#0369a1"
BETON = "#94a3b8"


# ── les dessins de l'épisode ───────────────────────────────────────────────

def yohan(s=1.0):
    """Yohan, hydrologue : casquette, gilet orange de terrain, une règle graduée à la main."""
    tete = Circle(radius=0.27, fill_color=PEAU, fill_opacity=1, stroke_width=0).move_to(P(0, 1.0))
    cas = Sector(radius=0.3, angle=PI, start_angle=0, fill_color="#0f766e", fill_opacity=1,
                 stroke_width=0).move_to(P(0, 1.2))
    visiere = Rectangle(width=0.32, height=0.06, fill_color="#0f766e", fill_opacity=1, stroke_width=0).move_to(
        P(0.24, 1.13))
    corps = RoundedRectangle(width=0.95, height=1.15, corner_radius=0.25, fill_color="#1e3a8a", fill_opacity=1,
                             stroke_width=0).move_to(P(0, 0.12))
    gilet = VGroup(Rectangle(width=0.2, height=1.0, fill_color=ORANGE_RETENUE, fill_opacity=1, stroke_width=0)
                   .move_to(P(-0.26, 0.12)),
                   Rectangle(width=0.2, height=1.0, fill_color=ORANGE_RETENUE, fill_opacity=1, stroke_width=0)
                   .move_to(P(0.26, 0.12)))
    regle = VGroup(Rectangle(width=0.1, height=1.3, fill_color=WHITE, fill_opacity=1, stroke_width=0)
                   .move_to(P(0.62, 0.25)),
                   *[Line(P(0.57, -0.3 + 0.22 * k), P(0.67, -0.3 + 0.22 * k), stroke_color="#0f172a",
                          stroke_width=2) for k in range(6)])
    return VGroup(corps, gilet, tete, cas, visiere, regle).scale(s)


class Barrage(VGroup):
    """Le lac du barrage (de profil) : la berge à gauche, le mur à droite, l'eau
    dont le niveau suit un volume (0 → 25), la rivière en aval, le nuage."""

    def __init__(self, x0=-0.4, x1=3.5, yb=0.45, yc=2.85, **kw):
        super().__init__(**kw)
        self.x0, self.x1, self.yb, self.yc = x0, x1, yb, yc
        self.berge = Line(P(x0 - 1.0, yc + 0.15), P(x0, yb), stroke_color="#a8a29e", stroke_width=6)
        self.fond = Line(P(x0, yb), P(x1, yb), stroke_color="#a8a29e", stroke_width=6)
        self.mur = Polygon(P(x1, yb - 0.05), P(x1, yc), P(x1 + 0.3, yc), P(x1 + 0.6, yb - 0.05),
                           fill_color=BETON, fill_opacity=1, stroke_width=0)
        self.add(self.berge, self.fond, self.mur)

    def y(self, v):
        return self.yb + (self.yc - 0.15 - self.yb) * v / 25

    def eau(self, v_t):
        def dessin():
            y = self.y(v_t.get_value())
            xg = self.x0 - (y - self.yb) / (self.yc + 0.15 - self.yb) * 1.0
            return Polygon(P(self.x0, self.yb), P(self.x1, self.yb), P(self.x1, y), P(xg, y), fill_color=EAU2,
                           fill_opacity=0.9, stroke_color=EAU, stroke_width=3)
        return always_redraw(dessin)


def nuage(s=1.0):
    return VGroup(*[Circle(radius=r, fill_color="#cbd5e1", fill_opacity=1, stroke_width=0).move_to(P(x, y))
                    for x, y, r in ((-0.35, 0, 0.24), (0, 0.12, 0.32), (0.38, 0, 0.25), (0.05, -0.08, 0.26))]).scale(s)


def pluie(centre, larg=1.0, h=0.7, nb=7):
    """Des gouttes qui tombent sous le nuage (updater : elles reviennent en haut)."""
    gouttes = VGroup(*[Line(P(0, 0), P(-0.05, -0.16), stroke_color=EAU, stroke_width=4) for _ in range(nb)])
    cx, cy = centre[0], centre[1]
    for k, g in enumerate(gouttes):
        g.phase = (k * 0.37) % 1.0
        g.dx = -larg / 2 + larg * k / max(nb - 1, 1)

    def maj(m, dt):
        for g in m:
            g.phase = (g.phase + 0.9 * dt) % 1.0
            g.move_to(P(cx + g.dx, cy - h * g.phase))
    gouttes.add_updater(maj)
    maj(gouttes, 0)
    return gouttes


class CadreAvecTexte:
    """Les boutons A / B / C : chaque bouton arrive ENTIER (cadre, lettre et tout
    son texte d'un coup) au début de sa lecture : jamais un cadre vide ou à moitié."""

    def q_montrer_choix(self, cartes):
        att = getattr(self, "_attente_q", None)
        for c, L in zip(cartes, "ABC"):
            self.suivre(f"{L} : ")
            if att is not None:          # le dessin d'attente reste jusqu'à « A : », et part AVANT les cadres
                self._attente_q = None
                self.play(FadeOut(att, shift=DOWN * 0.15), run_time=0.2)
                att = None
            corps = c[1][1]
            ex = [e for e in getattr(corps, "extraits", []) if e]
            for e in ex:                  # le curseur suit la voix…
                self.suivre(e)
                break
            self.play(FadeIn(c, shift=RIGHT * 0.12), run_time=0.25)   # …mais le bouton arrive ENTIER
            for e in ex[1:]:
                self.suivre(e)


class SuiteLimiteMonotoneBorneeTle(CadreAvecTexte, VerifMargo, OutilsCalcul, PaysageSuites):
    fichier_marques = "suite_limite_monotone_bornee_marques.json"
    nom_voix = "terminale-suite-limite-monotone-bornee"
    identite = "Maths Tle — EleveAI"
    ceinture = "verte"
    largeur_bouton = 8.6
    hauteur_bouton = 0.72
    buff_boutons = 0.12
    place_coche = 1.2
    y_tete_question = 3.2

    def bouton(self, lettre, corps, largeur, fs):
        """Le bouton du module (indices agrandis), marge intérieure ≥ 20 px autour du texte."""
        if isinstance(corps, str):
            corps = self.t(corps, fs, WHITE, 1e9)
        b = super().bouton(lettre, corps, largeur, fs)
        cadre, ligne = b
        h = max(self.hauteur_bouton, ligne.height + 0.32)
        if cadre.height < h:
            cadre.stretch_to_fit_height(h)
            ligne.move_to(cadre).align_to(cadre.get_left() + RIGHT * 0.2, LEFT)
        return b

    def ligne(self, morceaux, y, x=-6.2, fs=40, avec=(), larg=None, avec_k=None, rt=0.25):
        g = self.construire(morceaux, fs, larg).move_to(P(0, y))
        if x is not None:
            g.align_to(P(x, 0), LEFT)
        return self.montrer(g, avec, rt=rt, avec_k=avec_k)

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

    def trait_u(self, nu, v, couleur=JUSTE, texte=None, fs=28, droite=None, buff=0.14, dessus=None):
        """Un trait pointillé à la hauteur v ; son nombre à GAUCHE de l'axe (texte),
        son nom à DROITE du bout du trait (droite) : jamais sur un axe ni un point."""
        y = nu.G(nu.na, v)[1]
        tr = DashedLine(P(nu.ax_u.get_center()[0], y), P(nu.X1 + 0.1, y), color=couleur, stroke_width=3.5,
                        dash_length=0.1)
        g = VGroup(tr)
        if texte:
            g.add(self.t(texte, fs, couleur, audit=False).next_to(tr, LEFT, buff=buff))
        if droite:
            g.add(self.t(droite, fs, couleur, audit=False).next_to(tr, RIGHT, buff=0.14))
        if dessus:       # au-dessus du bout du trait, avec un écart net : hors des points et du pointillé
            g.add(self.t(dessus, fs, couleur, audit=False).next_to(tr, UP, buff=0.36).align_to(tr, RIGHT))
        return g

    def montrer_trait(self, tr):
        return [Create(tr[0]), *[FadeIn(m, shift=LEFT * 0.1) for m in tr[1:]]]

    def points(self, nu, valeurs, couleur=TERME, r=0.075):
        return VGroup(*[nu.point(n, v, couleur, r) for n, v in enumerate(valeurs)])

    def pousser(self, pts, lag=0.1):
        return LaggedStart(*[GrowFromCenter(d) for d in pts], lag_ratio=lag)

    def graduer(self, nu, ns, fs=24):
        for n in ns:
            nu.add(nu.graduation_n(n, str(n), fs))
        return [FadeIn(g) for g in nu[4:]]

    # ── 00 : la garde : les termes montent sous un plafond ─────────────────

    def ecran_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        ech = echelle_ceintures(self.ceinture).move_to(P(-0.6, 0)).align_to(P(0, -3.45), DOWN)
        self.add(ech)
        tit = self.t("Convergence monotone", 64, JAUNE_TITRE).to_edge(UP, buff=0.5)
        self.au_mot("convergence")
        self.play(Write(tit), run_time=0.7)
        y = tit.get_bottom()[1] - 0.45
        nu = NuageTermes((0, 12.6), (0, 12), P(-3.9, -1.65), P(2.4, 0.1), fs=24)
        plaf = DashedLine(nu.G(0, 11.2), nu.G(12.7, 11.2), color=RAISON, stroke_width=4, dash_length=0.1)
        pts = self.points(nu, [8 - 6 * 0.7 ** n for n in range(13)])
        lim = DashedLine(nu.G(0, 8), nu.G(12.7, 8), color=JUSTE, stroke_width=3.5, dash_length=0.1)
        qm = self.t("?", 40, JUSTE, audit=False).next_to(lim, RIGHT, buff=0.15)
        self.ligne([("Une suite qui", WHITE, "Une suite"), ("monte", TERME, "monte")], y, x=None, fs=40,
                   avec_k={1: self.axes(nu, [self.pousser(pts[:5])])}, rt=0.5)
        self.ligne([("sans jamais dépasser", WHITE, "sans jamais"), ("un plafond", RAISON, "un plafond")], y - 0.62,
                   x=None, fs=40, avec_k={1: [Create(plaf), self.pousser(pts[5:])]}, rt=0.6)
        self.ligne([("finit-elle par", WHITE, "finit-elle"), ("se stabiliser ?", JUSTE, "se stabiliser")], y - 1.24,
                   x=None, fs=40, avec_k={1: [Create(lim), FadeIn(qm, scale=1.4)]}, rt=0.5)
        ident = self.t(self.identite, 26, GREY_A).move_to(P(4.6, -1.0))
        self.play(FadeIn(ident), run_time=0.3)
        self.attendre_voix(marge=0.9)

    # ── 01 : Yohan, hydrologue : le lac du barrage ─────────────────────────

    def ecran_situation(self):
        self.nouvel_ecran("01-situation")
        perso = yohan(0.85).move_to(P(-5.0, 2.35))
        nom = self.t("Yohan", 40, JAUNE_TITRE).next_to(perso, DOWN, buff=0.15)
        metier = self.t("hydrologue", 30, TERME).next_to(nom, DOWN, buff=0.1)
        self.au_mot("Yohan")
        self.play(FadeIn(perso, shift=UP * 0.2), FadeIn(nom, shift=UP * 0.1), run_time=0.45)
        self.au_mot("hydrologue")
        self.play(FadeIn(metier, shift=UP * 0.1), run_time=0.3)
        cad = self.carte(7.6, 3.35, P(2.55, 1.72), GREY_B)
        bar = Barrage(x0=0.2, x1=3.6, yb=0.55, yc=2.95)
        v_t = ValueTracker(0.0)
        eau = bar.eau(v_t)
        self.au_mot("le lac d'un barrage")
        self.play(FadeIn(cad), FadeIn(bar), run_time=0.4)
        self.add(eau)
        x0 = -6.2
        self.ligne([("Au départ :", WHITE, "Au départ"), ("5 millions de m³ d'eau.", TERME, "5 millions")], -0.45,
                   x=x0, fs=38, avec_k={1: [v_t.animate.set_value(5)]}, rt=0.5)
        sortie = Arrow(P(4.2, 0.85), P(5.95, 0.85), buff=0, color=RAISON, stroke_width=6, tip_length=0.2)
        riv = self.t("rivière", 26, EAU, audit=False).next_to(sortie, DOWN, buff=0.08)
        moins = self.t("− 20 %", 30, RAISON).next_to(sortie, UP, buff=0.1)
        self.ligne([("Chaque mois,", WHITE, "Chaque mois"), ("20 %", RAISON, "20 %"),
                    ("de l'eau est relâchée,", WHITE, "de l'eau")], -1.1, x=x0, fs=38,
                   avec_k={1: [GrowArrow(sortie), FadeIn(moins, scale=1.3)], 2: [FadeIn(riv)]}, rt=0.4)
        nu_ = nuage(0.75).move_to(P(1.5, 2.42))
        plus = self.t("+ 4", 32, RAISON).next_to(nu_, RIGHT, buff=0.15)
        gouttes = pluie(P(1.5, 2.12), larg=0.7, h=0.4)
        self.ligne([("et les pluies en apportent", WHITE, "et les pluies"), ("4 millions.", RAISON, "4 millions")],
                   -1.75, x=x0, fs=38, avec_k={0: [FadeIn(nu_), FadeIn(gouttes)], 1: [FadeIn(plus, scale=1.3)]})
        self.play(v_t.animate.set_value(12), run_time=1.2)
        crete = DashedLine(P(bar.x0 - 0.9, bar.yc), P(bar.x1 + 0.3, bar.yc), color=PIEGE, stroke_width=3,
                           dash_length=0.08)
        self.ligne([("Le lac va-t-il", JAUNE_TITRE, "si le lac"), ("déborder ?", PIEGE, "déborder")], -2.5, x=x0,
                   fs=40, avec_k={1: [Create(crete)]})
        self.ligne([("À quel niveau va-t-il se stabiliser ?", JAUNE_TITRE, "et à quel")], -3.15, x=x0, fs=40,
                   avec=[v_t.animate.set_value(17)], rt=1.0)
        self.attendre_voix(marge=0.5)
        gouttes.clear_updaters()

    # ── 02 : le modèle : u₀ = 5, uₙ₊₁ = 0,8uₙ + 4, sous le plafond 20 ──────

    def nuage_lac(self, bg=P(2.4, -2.45), hd=P(4.85, 2.05), nb=13, ub=22):
        nu = NuageTermes((0, nb), (0, ub), bg, hd, fs=26)
        grads = self.graduer(nu, (5, 10))
        return nu, grads

    def ecran_modele(self):
        self.nouvel_ecran("02-modele")
        self.titre("Le modèle de Yohan", JAUNE_TITRE, 46, extrait="On note")
        nu, grads = self.nuage_lac()
        pts = self.points(nu, U[:13])
        plaf = self.trait_u(nu, 20, RAISON, "20")
        self.ligne([("uₙ :", TERME, "u indice n"), ("le volume au mois", WHITE, "le volume"), ("n", TERME, None)],
                   2.2, fs=40, avec_k={0: self.axes(nu, grads)}, rt=0.5)
        self.ligne([("en millions de m³,", GREY_A, "en millions"), ("n ≥", GREY_A, "à partir"), ("0", GREY_A, "égale 0")], 1.55, fs=36)
        self.ligne([("u₀ =", TERME, "u indice 0"), ("5", WHITE, "égale 5")], 0.7, fs=44,
                   avec_k={1: [GrowFromCenter(pts[0])]})
        self.ligne([("uₙ₊₁ =", TERME, "u indice n plus 1"), ("0,8uₙ", WHITE, "0,8"), ("+ 4", RAISON, "plus 4")],
                   -0.1, fs=44, avec_k={2: [self.pousser(pts[1:4], 0.3)]}, rt=0.6)
        self.ligne([("Par récurrence :", JAUNE_TITRE, "Par récurrence")], -0.95, fs=38,
                   avec_k={0: [self.pousser(pts[4:], 0.12)]}, rt=0.8)
        self.ligne([("uₙ ≤", TERME, "on démontre"), ("uₙ₊₁", TERME, "inférieur ou égal à u"), ("≤ 20", RAISON, "à 20")],
                   -1.65, fs=44, avec_k={2: self.montrer_trait(plaf)}, rt=0.5)
        self.ligne([("la suite est", WHITE, "la suite est"), ("croissante,", TERME, "croissante")], -2.45, fs=38,
                   avec_k={1: [Indicate(pts, color=TERME, scale_factor=1.3)]}, rt=0.5)
        self.ligne([("et", WHITE, None), ("majorée par 20.", RAISON, "majorée")], -3.1, fs=38,
                   avec_k={0: [Indicate(plaf, color=RAISON, scale_factor=1.05)]}, rt=0.5)
        self.attendre_voix(marge=0.6)

    # ── 03 : le théorème : deux cartes, monter sous un plafond, descendre sur un plancher ──

    def carte_theoreme(self, x, valeurs, borne, lim):
        """Une carte : un petit nuage, sa borne (orange), sa limite (vert)."""
        cad = self.carte(6.1, 4.55, P(x, 0.32), GREY_B)
        nu = NuageTermes((0, 13), (0, 11), P(x - 2.5, 0.7), P(x + 2.1, 1.85), fs=24)
        pts = self.points(nu, valeurs, TERME, 0.065)
        b = DashedLine(nu.G(0, borne), nu.G(13.2, borne), color=RAISON, stroke_width=4, dash_length=0.1)
        l = DashedLine(nu.G(0, lim), nu.G(13.2, lim), color=JUSTE, stroke_width=3, dash_length=0.08)
        return cad, nu, pts, b, l

    def ecran_theoreme(self):
        self.nouvel_ecran("03-theoreme")
        self.titre("Le théorème de convergence monotone", JAUNE_TITRE, 46, extrait="Le théorème")
        c1, n1, p1, b1, l1 = self.carte_theoreme(-3.25, G0, 10.2, 9)
        c2, n2, p2, b2, l2 = self.carte_theoreme(3.25, G1, 1.6, 3)
        t1 = VGroup(self.construire([("croissante", TERME, "une suite croissante")], 38),
                    self.construire([("et majorée :", RAISON, "et majorée")], 38),
                    self.construire([("elle converge", JUSTE, "converge")], 38)).arrange(DOWN, buff=0.2)
        t2 = VGroup(self.construire([("décroissante", TERME, "Une suite décroissante")], 38),
                    self.construire([("et minorée :", RAISON, "et minorée")], 38),
                    self.construire([("elle converge aussi", JUSTE, "converge aussi")], 38)).arrange(DOWN, buff=0.2)
        for g, x in ((t1, -3.25), (t2, 3.25)):
            for l in g:
                l.align_to(g, LEFT)
            g.move_to(P(0, -0.95)).align_to(P(x - 2.65, 0), LEFT)
        self.play(FadeIn(c1), FadeIn(c2), *self.axes(n1), *self.axes(n2), run_time=0.4)
        self.montrer(t1[0], avec=[self.pousser(p1, 0.06)], rt=0.7)
        self.montrer(t1[1], avec=[Create(b1)], rt=0.4)
        self.montrer(t1[2], avec=[Create(l1)], rt=0.4)
        self.montrer(t2[0], avec=[self.pousser(p2, 0.06)], rt=0.7)
        self.montrer(t2[1], avec=[Create(b2)], rt=0.4)
        self.montrer(t2[2], avec=[Create(l2)], rt=0.4)
        f1 = self.ligne([("Le lac de Yohan se stabilise donc", WHITE, "Le lac")], -2.45, fs=40)
        f2 = self.ligne([("vers un volume", WHITE, "vers un volume"), ("ℓ.", JUSTE, None)], -3.06, fs=40)
        self.play(FadeIn(self.encadre(VGroup(f1, f2), JUSTE, 0.22)), run_time=0.3)   # une vraie marge intérieure
        self.attendre_voix(marge=0.6)

    # ── 04 : question-pause n° 1 → B (converge, mais limite inconnue) ──────

    def ecran_question1(self):
        g2 = self.construire([("Une suite est", WHITE, None), ("croissante", TERME, "croissante"),
                              ("et majorée par", RAISON, "majorée"), ("50.", RAISON, "50")], 40)
        g3 = self.construire([("Que peut-on conclure ?", WHITE, "Que peut-on")], 40)
        cA = self.choix([("elle converge vers", "elle converge"), ("50", "50")], 40)
        cB = self.choix_lignes([[("elle converge, mais on ne", "elle converge, mais")],
                                [("connaît pas encore sa limite", "connaît pas")]], 40)
        cC = self.choix([("elle tend vers +∞", "elle tend")], 40)
        # le 1er morceau arrive AVEC le titre « Question ! » (jamais le titre seul)
        q = self.question_lignes("04-question", [g2, g3], [cA, cB, cC], 1, fs=40, largeur=10.6)
        self.dire("04b-reponse")
        ok = self.q_reponse(q, 1)
        bon = VGroup(q.cartes[1], ok)
        self.play(FadeOut(q.cartes[0]), FadeOut(q.cartes[2]), FadeOut(q.question), FadeOut(q.tete), run_time=0.25)
        self.play(bon.animate.scale(0.82).move_to(P(0, 2.55)), run_time=0.3)     # l'un APRÈS l'autre : jamais deux états
        nu = NuageTermes((0, 13), (0, 56), P(2.3, -2.6), P(4.35, 1.05), fs=26)
        pts = self.points(nu, Q1[:13])
        plaf = self.trait_u(nu, 50, RAISON, "50", droite="majorant")
        lim = self.trait_u(nu, 35, JUSTE, droite="la limite")
        self.ligne([("Le théorème donne", WHITE, "Le théorème")], 0.85, fs=40, avec_k={0: self.axes(nu)})
        self.ligne([("la convergence,", JUSTE, "la convergence")], 0.2, fs=40)
        self.ligne([("pas la valeur :", PIEGE, "pas la valeur")], -0.45, fs=40)
        self.ligne([("50", RAISON, "50 est"), ("est un majorant,", RAISON, "un majorant")], -1.35, fs=40,
                   avec_k={0: [Create(plaf[0]), FadeIn(plaf[1])], 1: [FadeIn(plaf[2], shift=LEFT * 0.1)]})
        fin = self.ligne([("pas forcément", WHITE, "pas forcément"), ("la limite.", JUSTE, "la limite")], -2.05,
                         fs=40, avec_k={0: [self.pousser(pts, 0.08)], 1: self.montrer_trait(lim)}, rt=0.8)
        self.insister(VGroup(plaf, lim), 1.04)
        self.attendre_voix(marge=0.6)

    # ── 05 : le point fixe : ℓ = 0,8ℓ + 4, donc ℓ = 20 ─────────────────────

    def ecran_point_fixe(self):
        self.nouvel_ecran("05-point-fixe")
        self.titre("Trouver la limite ℓ", JAUNE_TITRE, 46, extrait="Pour trouver")
        nu, grads = self.nuage_lac(nb=16)
        pts = self.points(nu, U[:17])
        lim = self.trait_u(nu, 20, JUSTE, "20")
        self.ligne([("On passe à la limite dans", WHITE, "on passe")], 2.2, fs=38,
                   avec_k={0: self.axes(nu, grads + [self.pousser(pts, 0.08)])}, rt=1.0)
        self.ligne([("uₙ₊₁ =", TERME, "dans u"), ("0,8uₙ", WHITE, "0,8"), ("+ 4 :", WHITE, "plus 4")], 1.45, fs=44)
        self.ligne([("ℓ =", JUSTE, "l égale"), ("0,8ℓ", WHITE, "0,8 l"), ("+ 4", WHITE, "plus 4")], 0.55, fs=48)
        self.ligne([("donc", GREY_A, "Donc"), ("0,2ℓ =", WHITE, "0,2"), ("4,", WHITE, "4")], -0.35, fs=48)
        fin = self.ligne([("ℓ = 20", JUSTE, "l égale 20")], -1.3, fs=52, avec_k={0: self.montrer_trait(lim)})
        self.play(FadeIn(self.encadre(fin, JUSTE, 0.16)), run_time=0.3)
        self.ligne([("Le lac se stabilise à", WHITE, "Le lac")], -2.35, fs=40)
        self.ligne([("20 millions de m³.", JUSTE, "à 20")], -3.0, fs=40,
                   avec_k={0: [Indicate(pts[8:], color=JUSTE, scale_factor=1.3)]}, rt=0.5)
        self.attendre_voix(marge=0.6)

    # ── 06 : le piège : le plafond 30, la vraie limite 20, le plancher u₀ ──

    def ecran_piege(self):
        self.nouvel_ecran("06-piege")
        tit = self.t("Voilà le piège !", 46, PIEGE).move_to(P(0, 3.15))
        self.au_mot("piège")
        self.play(FadeIn(tit, scale=1.3), run_time=0.35)
        nu = NuageTermes((0, 13), (0, 33), P(2.55, -2.55), P(4.85, 2.25), fs=26)
        grads = self.graduer(nu, (5, 10))
        pts = self.points(nu, U[:14])
        p30 = self.trait_u(nu, 30, RAISON, "30")
        l20 = self.trait_u(nu, 20, JUSTE, "20")
        u0 = self.trait_u(nu, 5, PIEGE, "u₀", buff=0.26)
        fs = 36
        self.ligne([("Si Yohan avait seulement", WHITE, "Si Yohan")], 2.35, fs=fs, avec_k={0: self.axes(nu, grads)})
        self.ligne([("prouvé", WHITE, "prouvé"), ("uₙ ≤", TERME, "que u"), ("30,", RAISON, "à 30")], 1.77, fs=fs,
                   avec_k={2: self.montrer_trait(p30)})
        self.ligne([("elle convergerait aussi…", WHITE, "la suite convergerait")], 1.19, fs=fs,
                   avec_k={0: [self.pousser(pts, 0.08)]}, rt=0.8)
        self.ligne([("mais pas vers 30 :", PIEGE, "mais pas")], 0.61, fs=fs,
                   avec_k={0: [Indicate(p30, color=PIEGE, scale_factor=1.04)]})
        self.ligne([("la limite resterait", JUSTE, "la limite"), ("20.", JUSTE, "20")], 0.03, fs=fs,
                   avec_k={1: self.montrer_trait(l20)})
        self.ligne([("Et « croissante et minorée »", JAUNE_TITRE, "Et « croissante")], -0.75, fs=fs)
        self.ligne([("n'apprend rien :", PIEGE, "n'apprend")], -1.33, fs=fs)
        self.ligne([("une suite croissante est", WHITE, "une suite croissante")], -1.91, fs=fs)
        self.ligne([("toujours minorée par", WHITE, "toujours minorée")], -2.49, fs=fs)
        self.ligne([("son premier terme", WHITE, "son premier"), ("u₀.", PIEGE, None)], -3.07, fs=fs,
                   avec_k={0: [*self.montrer_trait(u0), Indicate(pts[0], color=PIEGE, scale_factor=1.6)]}, rt=0.5)
        self.attendre_voix(marge=0.6)

    # ── 07 : question-pause n° 2 → A (décroissante : il faut minorée) ──────

    def ecran_question2(self):
        g1 = self.construire([("On sait seulement qu'une suite est", WHITE, None),
                              ("décroissante.", TERME, "décroissante")], 38)
        g2 = self.construire([("Pour appliquer le théorème,", WHITE, "Pour appliquer")], 38)
        g3 = self.construire([("que faut-il encore démontrer ?", WHITE, "que faut-il")], 38)
        cA = self.choix([("qu'elle est minorée", "qu'elle est minorée")], 40)
        cB = self.choix([("qu'elle est majorée", "qu'elle est majorée")], 40)
        cC = self.choix([("que sa limite est finie", "que sa limite")], 40)
        q = self.question_lignes("07-question", [g1, g2, g3], [cA, cB, cC], 0, fs=40)
        self.dire("07b-reponse")
        ok = self.q_reponse(q, 0)
        self.play(FadeOut(q.cartes[1]), FadeOut(q.question), FadeOut(q.tete), run_time=0.25)
        self.play(VGroup(q.cartes[0], ok).animate.scale(0.9).move_to(P(-1.6, 2.55)),
                  q.cartes[2].animate.scale(0.9).move_to(P(-1.6, 1.6)), run_time=0.3)
        nu = NuageTermes((0, 13), (0, 10), P(2.4, -2.6), P(4.85, 0.35), fs=26)
        pts = self.points(nu, D7[:14])
        plan = self.trait_u(nu, 3, RAISON)
        lp = self.t("plancher", 28, RAISON, audit=False).next_to(nu.G(10.6, 3), DOWN, buff=0.22)
        self.ligne([("Une suite qui", WHITE, "Une suite qui"), ("descend", TERME, "descend")], 0.45, fs=38,
                   avec_k={0: self.axes(nu), 1: [self.pousser(pts, 0.04)]}, rt=0.4)
        self.ligne([("a besoin d'un", WHITE, "a besoin"), ("plancher :", RAISON, "plancher")], -0.2, fs=38,
                   avec_k={1: [Create(plan[0]), FadeIn(lp, shift=UP * 0.1)]}, rt=0.4)
        fin = self.ligne([("elle doit être", WHITE, "elle doit"), ("minorée.", JUSTE, "minorée")], -0.98, fs=40)
        self.play(FadeIn(self.encadre(fin, JUSTE, 0.14)), run_time=0.3)
        corpsC = q.cartes[2][1][1]
        raie = self.rayer(corpsC)
        self.ligne([("« Sa limite est finie » :", PIEGE, "Sa limite")], -1.92, fs=38, avec_k={0: [Create(raie)]})
        self.ligne([("c'est justement", WHITE, "c'est justement")], -2.52, fs=38)
        self.ligne([("ce qu'on veut prouver.", PIEGE, "ce qu'on veut")], -3.1, fs=38)
        self.attendre_voix(marge=0.6)

    # ── 08 : le défi : u₀ = 10, uₙ₊₁ = 0,5uₙ + 2, minorée par 3 ────────────

    def ecran_defi(self):
        self.nouvel_ecran("08-defi")
        tit = self.titre("À toi de jouer !", JAUNE_TITRE, 48, extrait="À toi")
        nu = NuageTermes((0, 10.5), (0, 11), P(2.5, -2.5), P(4.85, 2.25), fs=26)
        grads = self.graduer(nu, (5, 10))
        pts = self.points(nu, V[:5])
        p3 = self.trait_u(nu, 3, RAISON, "3")
        qm = self.t("?", 48, JUSTE, audit=False).move_to(nu.G(9, 5.6))
        self.ligne([("Soit", WHITE, "Soit u"), ("u₀ =", TERME, None), ("10", WHITE, "10"), ("et, pour tout", WHITE, "et, pour")],
                   2.2, fs=40, avec_k={2: self.axes(nu, grads + [GrowFromCenter(pts[0])])})
        self.ligne([("entier naturel", WHITE, "entier naturel"), ("n :", TERME, None)], 1.55, fs=40)
        self.ligne([("uₙ₊₁ =", TERME, "u indice n plus 1"), ("0,5uₙ", WHITE, "0,5"), ("+ 2.", RAISON, "plus 2")],
                   0.7, fs=46)
        self.ligne([("On admet :", GREY_A, "On admet"), ("décroissante", TERME, "décroissante")], -0.2, fs=40,
                   avec_k={1: [self.pousser(pts[1:], 0.2)]}, rt=0.6)
        self.ligne([("et minorée par", RAISON, "minorée"), ("3.", RAISON, "3")], -0.85, fs=40,
                   avec_k={1: self.montrer_trait(p3)})
        self.ligne([("Que peut-on conclure ?", JAUNE_TITRE, "Que peut-on")], -1.65, fs=40,
                   avec_k={0: [FadeIn(qm, scale=1.4)]})
        self.ligne([("Et quelle est sa limite ?", JAUNE_TITRE, "Et quelle")], -2.3, fs=40)
        self.defi_pause(-3.05, x=-2.2)
        self._defi = (tit, nu, grads, pts, p3, qm)

    def ecran_correction(self):
        self.dire("08b-correction")
        tit, nu, grads, pts, p3, qm = self._defi
        garder = {id(x) for m in (tit, nu, p3, pts, self._margo) for x in m.get_family()}
        self.au_mot("Correction")
        cor = self.t("Correction", 46, JUSTE).move_to(tit)
        autres = [m for m in self.mobjects if id(m) not in garder]
        self.play(*[FadeOut(m) for m in autres], ReplacementTransform(tit, cor), run_time=0.4)
        self.remove(*autres)
        suite = self.points(nu, V[:11])
        l4 = self.trait_u(nu, 4, JUSTE, dessus="ℓ = 4")
        fs = 38
        self.ligne([("Décroissante et minorée", WHITE, "Décroissante")], 2.25, fs=fs)
        self.ligne([("par", WHITE, None), ("3 :", RAISON, "3"), ("d'après le théorème", WHITE, "d'après")], 1.65, fs=fs)
        self.ligne([("de convergence monotone,", WHITE, "convergence monotone")], 1.05, fs=fs)
        self.ligne([("la suite converge vers", WHITE, "la suite converge"), ("ℓ.", JUSTE, "un réel")], 0.45, fs=fs,
                   avec_k={0: [self.pousser(suite[5:], 0.12)]}, rt=0.7)
        self.ligne([("Puis", GREY_A, "Puis"), ("ℓ =", JUSTE, "l égale"), ("0,5ℓ", WHITE, "0,5"), ("+ 2,", WHITE, "plus 2")],
                   -0.3, fs=44)
        self.ligne([("donc", GREY_A, "donc"), ("0,5ℓ =", WHITE, "0,5 l"), ("2,", WHITE, "2")], -0.95, fs=44)
        self.ligne([("et", GREY_A, "et l"), ("ℓ = 4.", JUSTE, "égale 4")], -1.6, fs=44, avec_k={1: self.montrer_trait(l4)})
        f1 = self.ligne([("La limite est", WHITE, "La limite"), ("4,", JUSTE, "est 4")], -2.45, fs=40)
        f2 = self.ligne([("et non le minorant", PIEGE, "et non"), ("3.", RAISON, "minorant 3")], -3.06, fs=40,
                        avec_k={1: [Indicate(p3, color=RAISON, scale_factor=1.05)]})
        self.play(FadeIn(self.encadre(VGroup(f1, f2), JUSTE, 0.22)), run_time=0.3)   # une vraie marge intérieure
        self.attendre_voix(marge=0.6)

    # ── 09 : ce que tu as appris ───────────────────────────────────────────

    def ecran_appris(self):
        def base(l):
            """La ligne de base : le bas d'une lettre sans jambage (a, e, n, o…), sinon le bas de la ligne."""
            gl = [m for morceau in l for m in morceau]
            car = glyphes(" ".join(l.textes))
            k = next((i for i, c in enumerate(car) if c in "acemnorsuvwxz0123456789"), None)
            return gl[k].get_bottom()[1] if k is not None else l.get_bottom()[1]
        J = JAUNE_TITRE
        points = [[[("Croissante et majorée,", WHITE, "Croissante")],
                   [("ou décroissante et minorée :", WHITE, "ou décroissante")],
                   [("la suite converge.", JUSTE, "la suite converge")]],
                  [[("Le théorème ne donne pas la limite :", WHITE, "Le théorème")],
                   [("on la trouve ensuite, souvent", WHITE, "on la trouve")],
                   [("en résolvant", WHITE, "en résolvant"), ("ℓ = f(ℓ).", J, "l égale")]],
                  [[("Et un majorant n'est pas", WHITE, "Et un majorant")],
                   [("forcément la limite.", J, "forcément")]]]
        self.nouvel_ecran("09-finale", margo=0.65)
        self.au_mot("Ce que tu as appris")
        tit = self.t("Ce que tu as appris", 46, J).to_edge(UP, buff=0.45)
        self.play(Write(tit), run_time=0.7)
        blocs = []
        for pt in points:
            lignes = VGroup(*[self.construire(l, 42, 1e9) for l in pt]).arrange(DOWN, aligned_edge=LEFT, buff=0.14)
            for k, l in enumerate(lignes):      # même pas entre les lignes de base
                if k:
                    l.shift(UP * (base(lignes[0]) - 0.6 * k - base(l)))
            blocs.append(VGroup(self.coche(), lignes).arrange(RIGHT, buff=0.3, aligned_edge=UP))
        tout = VGroup(*blocs).arrange(DOWN, aligned_edge=LEFT, buff=0.42)
        if tout.width > 11.0:
            tout.scale_to_fit_width(11.0)
        if tout.height > 6.0:
            tout.scale_to_fit_height(6.0)
        tout.move_to(P(-0.4, -0.45))
        for bloc in blocs:
            for k, l in enumerate(bloc[1]):
                self.montrer(l, rt=0.3, avec_k={0: [Create(bloc[0])]} if k == 0 else None)
        self.attendre_voix(marge=0.8)

    def construct(self):
        ecrans = [self.ecran_garde, self.ecran_situation, self.ecran_modele, self.ecran_theoreme,
                  self.ecran_question1, self.ecran_point_fixe, self.ecran_piege, self.ecran_question2,
                  self.ecran_defi, self.ecran_correction, self.ecran_appris, lambda: self.fin("10-abonne")]
        choix = os.environ.get("ECRANS")          # contrôle rapide : ECRANS=5,6 (jamais au rendu final)
        for k, e in enumerate(ecrans):
            if not choix or str(k) in choix.split(",") or (e == self.ecran_correction and "8" in choix.split(",")):
                e()
