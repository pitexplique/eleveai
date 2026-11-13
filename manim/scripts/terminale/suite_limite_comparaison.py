# suite_limite_comparaison.py
# EleveAI — Maths Terminale (spé) — paysage « Comparaison et gendarmes »
# (16:9), ceinture VERTE. Série SUITES du lycée, épisode 36.
# Micro du coach : limite_suite_comparaison (notion limite_suite) :
# lib/tutor-v4/questionBank/terminale-spe/maths/limites-suites.bank.ts + limites-suites-renfort.ts.
#
# Ce que demande le coach → écran :
#   · encadrer un terme qui oscille : −1 ≤ sin(n) ≤ 1 (encTrig)                → 02, 08b ;
#   · le théorème des gendarmes : bornes de MÊME limite (fixed_1, gendarmes)   → 03, 04 (A) ;
#   · le théorème de comparaison vers ±∞ : minorer, majorer (compMinore, h1)  → 05, 08b ;
#   · le piège : majorer par une suite → +∞ ne dit rien ; bornes de limites
#     différentes : on ne conclut pas (gendarmesPiege, fixed_3)                → 06, 07 (C) ;
#   · une situation concrète (compConcret)                                    → 01, 08 défi.
# Clé de voix → écran :
#   00-garde (le nuage coincé entre deux bornes qui se resserrent) · 01 Alice,
#   astrophysicienne : l'étoile qui scintille, le signal qui oscille, la moyenne
#   → ? · 02 encadrer : uₙ = 2 + sin(n)/n, la vague sin(n) entre −1 et 1, puis
#   2 − 1/n ≤ uₙ ≤ 2 + 1/n · 03 les gendarmes : les deux bornes (orange) qui se
#   resserrent sur 2, deux gendarmes qui escortent le point bleu · 04/04b
#   question (A : 5) · 05 la comparaison : le plancher n − 3 qui monte et pousse
#   uₙ = n + 3cos(n) vers +∞ · 06 le piège : sous le plafond y = n, trois suites
#   → 0, → 7, → −∞ · 07/07b question (C : bornes → 1 et → 3, l'écart ne se ferme
#   pas) · 08/08b défi vₙ = −n² + 4sin(n) (le plafond qui plonge) et
#   wₙ = 1 + 2cos(n)/n (l'entonnoir vers 1) · 09 « Ce que tu as appris » · 10 fin.
# Code couleur (module commun) : bleu = uₙ, orange = les bornes (gendarmes,
# plancher, plafond), vert = juste (la limite), rouge = piège.
# ⛔ Pas de LaTeX. Voix : manim/voix/terminale-suite-limite-comparaison.json
# (débit −6), calée mot à mot par suite_limite_comparaison_marques.json.
# Contrôle : AUDIT=1 BORDS=1 python -m manim render --dry_run …
#   (BORDS=1 vérifie aussi que rien n'approche Ti-Margo à moins de 0,15 : MARGO)
# python -m manim render -qh --disable_caching manim/scripts/terminale/suite_limite_comparaison.py SuiteLimiteComparaisonTle -o eleveai-maths-terminale-suite-limite-comparaison --media_dir manim/scripts/terminale/media-suite-limite-comparaison
# Sortie : manim/sorties/terminale/maths/suites/36-limite-comparaison/

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

# ── les affirmations de la voix, vérifiées ──────────────────────────────────
NS = range(1, 2000)
U = {n: 2 + math.sin(n) / n for n in NS}                                     # 02 : la moyenne d'Alice
assert all(2 - 1 / n <= U[n] <= 2 + 1 / n for n in NS) and abs(U[1999] - 2) < 1e-3   # 02, 03 : → 2
assert 3 / 1999 < 2e-3 and 1 / 1999 ** 2 < 1e-6                                # 04 : bornes → 5 (A)
C5 = {n: n + 3 * math.cos(n) for n in NS}
assert all(C5[n] >= n - 3 for n in NS)                                        # 05 : uₙ ≥ n − 3 → +∞
P6 = {"0": lambda n: 6 * n / (n * n + 5), "7": lambda n: 7 * n / (n + 6), "−∞": lambda n: -n}
assert all(f(n) <= n for f in P6.values() for n in NS)                        # 06 : toutes sous y = n
assert abs(P6["7"](10 ** 6) - 7) < 1e-4 and P6["0"](10 ** 6) < 1e-5
assert (1 - 1 / 10 ** 6, 3 + 1 / 10 ** 6) and 1 != 3                          # 07 : bornes → 1 et → 3 (C)
V8 = {n: -n * n + 4 * math.sin(n) for n in NS}
assert all(V8[n] <= -n * n + 4 for n in NS)                                   # 08b : vₙ → −∞
W8 = {n: 1 + 2 * math.cos(n) / n for n in NS}
assert all(1 - 2 / n <= W8[n] <= 1 + 2 / n for n in NS)                       # 08b : wₙ → 1

PEAU, PEAU2 = "#c68642", "#8d5524"
NUIT = "#1e1b4b"
KEPI = "#1e3a8a"


# ── les dessins de l'épisode ───────────────────────────────────────────────

def alice(s=1.0):
    """Alice, astrophysicienne : chignon, pull violet, un badge étoile."""
    chignon = Circle(radius=0.17, fill_color="#3f2a1d", fill_opacity=1, stroke_width=0).move_to(P(0, 1.38))
    cheveux = Sector(radius=0.3, angle=PI, start_angle=0, fill_color="#3f2a1d", fill_opacity=1,
                     stroke_width=0).move_to(P(0, 1.18))
    tete = Circle(radius=0.27, fill_color=PEAU, fill_opacity=1, stroke_width=0).move_to(P(0, 1.0))
    corps = RoundedRectangle(width=0.95, height=1.15, corner_radius=0.25, fill_color="#7c3aed", fill_opacity=1,
                             stroke_width=0).move_to(P(0, 0.12))
    badge = Star(5, outer_radius=0.13, inner_radius=0.06, fill_color=JAUNE_TITRE, fill_opacity=1,
                 stroke_width=0).move_to(P(0.22, 0.38))
    return VGroup(corps, chignon, tete, cheveux, badge).scale(s)


def telescope(s=1.0):
    """Une lunette astronomique sur son trépied, pointée vers le haut à droite."""
    k = dict(stroke_color=GREY_A, stroke_width=4)
    tube = RoundedRectangle(width=1.5, height=0.32, corner_radius=0.08, fill_color="#cbd5e1", fill_opacity=1,
                            stroke_width=0).rotate(0.55).move_to(P(0.1, 0.55))
    bout = RoundedRectangle(width=0.22, height=0.42, corner_radius=0.05, fill_color=GREY_B, fill_opacity=1,
                            stroke_width=0).rotate(0.55).move_to(P(0.72, 0.93))
    pieds = VGroup(Line(P(0, 0.4), P(-0.45, -0.55), **k), Line(P(0, 0.4), P(0.4, -0.55), **k),
                   Line(P(0, 0.4), P(0, -0.55), **k))
    return VGroup(pieds, tube, bout).scale(s)


def etoile(r=0.4, couleur=JAUNE_TITRE):
    return Star(5, outer_radius=r, inner_radius=0.42 * r, fill_color=couleur, fill_opacity=1, stroke_width=0)


def scintiller(m, vitesse=5.0, ampli=0.18):
    """L'étoile grossit et rapetisse doucement (updater)."""
    m.t, m.base = 0.0, m.copy()

    def maj(x, dt):
        x.t += dt
        x.become(x.base.copy().scale(1 + ampli * math.sin(vitesse * x.t)))
    m.add_updater(maj)
    return m


def gendarme(s=1.0):
    """Un gendarme : képi bleu nuit à visière, tête, veste bleue, ceinturon blanc."""
    corps = RoundedRectangle(width=0.8, height=0.9, corner_radius=0.2, fill_color="#1d4ed8", fill_opacity=1,
                             stroke_width=0).move_to(P(0, 0))
    ceint = Rectangle(width=0.8, height=0.08, fill_color=WHITE, fill_opacity=1, stroke_width=0).move_to(P(0, -0.12))
    tete = Circle(radius=0.23, fill_color=PEAU2, fill_opacity=1, stroke_width=0).move_to(P(0, 0.66))
    kepi = Polygon(P(-0.2, 0.8), P(0.2, 0.8), P(0.17, 1.08), P(-0.17, 1.08), fill_color=KEPI, fill_opacity=1,
                   stroke_width=0)
    visiere = Rectangle(width=0.5, height=0.06, fill_color="#0f172a", fill_opacity=1, stroke_width=0).move_to(
        P(0.03, 0.8))
    bande = Rectangle(width=0.34, height=0.05, fill_color=PIEGE, fill_opacity=1, stroke_width=0).move_to(P(0, 0.9))
    return VGroup(corps, ceint, tete, kepi, bande, visiere).scale(s)


def vague(x0, x1, y0, h, couleur=TERME, per=1.1):
    """La vague sin entre y0 − h et y0 + h (de x0 à x1)."""
    return ParametricFunction(lambda t: P(t, y0 + h * math.sin(TAU * (t - x0) / per)), t_range=[x0, x1, 0.02],
                              color=couleur, stroke_width=5)


class SuiteLimiteComparaisonTle(VerifMargo, OutilsCalcul, PaysageSuites):
    fichier_marques = "suite_limite_comparaison_marques.json"
    nom_voix = "terminale-suite-limite-comparaison"
    identite = "Maths Tle — EleveAI"
    ceinture = "verte"
    largeur_bouton = 8.6
    hauteur_bouton = 0.7
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

    def ligne(self, morceaux, y, x=None, fs=40, avec=(), larg=None, avec_k=None, rt=0.25):
        g = self.construire(morceaux, fs, larg).move_to(P(0, y))
        if x is not None:
            g.align_to(P(x, 0), LEFT)
        return self.montrer(g, avec, rt=rt, avec_k=avec_k)

    def lmaths(self, segs, y, x=None, fs=44, avec=(), avec_k=None, rt=0.25, montrer=True, ecart=0.12):
        g = self.ligne_maths(segs, fs, ecart=ecart).move_to(P(0, y))
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

    def trait_u(self, nu, v, couleur=JUSTE, texte=None, fs=26, buff=0.12):
        """Un trait horizontal pointillé à la hauteur v (et son nombre, à gauche de l'axe)."""
        y = nu.G(nu.na, v)[1]
        tr = DashedLine(P(nu.ax_u.get_center()[0], y), P(nu.X1 + 0.1, y), color=couleur, stroke_width=3.5,
                        dash_length=0.1)
        g = VGroup(tr)
        if texte:
            g.add(self.t(texte, fs, couleur, audit=False).next_to(tr, LEFT, buff=buff))
        return g

    def courbe(self, nu, f, n0, n1, couleur=RAISON, sw=4):
        """La courbe d'une borne (n réel de n0 à n1)."""
        return ParametricFunction(lambda t: nu.G(t, f(t)), t_range=[n0, max(n1, n0 + 0.02), 0.02], color=couleur,
                                  stroke_width=sw)

    def points(self, nu, f, ns, couleur=TERME, r=0.075):
        return VGroup(*[nu.point(n, f(n), couleur, r) for n in ns])

    def avancer(self, k_t, fin, vitesse):
        """k_t monte tout seul (vitesse par seconde) jusqu'à fin, pendant les écrans suivants."""
        moteur = VMobject()

        def maj(m, dt):
            k_t.set_value(min(fin, k_t.get_value() + vitesse * dt))
        moteur.add_updater(maj)
        self.add(moteur)
        return moteur

    # ── 00 : la garde : la suite coincée entre deux bornes ─────────────────

    def ecran_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        ech = echelle_ceintures(self.ceinture).move_to(P(-0.6, 0)).align_to(P(0, -3.45), DOWN)
        self.add(ech)
        tit = self.t("Comparaison et gendarmes", 64, JAUNE_TITRE).to_edge(UP, buff=0.5)
        self.au_mot("Comparaison")
        self.play(Write(tit), run_time=0.7)
        y = tit.get_bottom()[1] - 0.5
        nu = NuageTermes((0, 12.6), (0.75, 3.25), P(-3.9, -1.6), P(2.4, 0.4), fs=24)
        hb = self.courbe(nu, lambda t: 2 + 1 / t, 1, 12.3)
        bb = self.courbe(nu, lambda t: 2 - 1 / t, 1, 12.3)
        pts = self.points(nu, lambda n: U[n], range(1, 13))
        g1 = gendarme(0.24).next_to(nu.G(12.3, 2 + 1 / 12.3), UP, buff=0.02)
        g2 = gendarme(0.24).next_to(nu.G(12.3, 2 - 1 / 12.3), DOWN, buff=0.02)
        self.ligne([("Comment trouver la limite d'une suite", WHITE, "Comment")], y, fs=40,
                   avec_k={0: self.axes(nu, [Create(hb), Create(bb)])}, rt=0.6)
        self.ligne([("qu'on ne sait pas", WHITE, "qu'on ne sait"), ("calculer directement ?", JAUNE_TITRE,
                                                                  "calculer")], y - 0.66, fs=40,
                   avec_k={1: [LaggedStart(*[GrowFromCenter(d) for d in pts], lag_ratio=0.12)]}, rt=0.9)
        ident = self.t(self.identite, 26, GREY_A).move_to(P(0, y - 1.25))
        self.play(FadeIn(ident), FadeIn(g1, shift=LEFT * 0.3), FadeIn(g2, shift=LEFT * 0.3), run_time=0.45)
        self.attendre_voix(marge=0.9)

    # ── 01 : Alice, astrophysicienne : l'étoile, le signal qui oscille ─────

    def ecran_situation(self):
        self.nouvel_ecran("01-situation")
        perso = alice(0.85).move_to(P(-4.8, 2.4))
        nom = self.t("Alice", 40, JAUNE_TITRE).next_to(perso, DOWN, buff=0.15)
        metier = self.t("astrophysicienne", 30, TERME).next_to(nom, DOWN, buff=0.1)
        self.au_mot("Alice")
        self.play(FadeIn(perso, shift=UP * 0.2), FadeIn(nom, shift=UP * 0.1), run_time=0.45)
        tel = telescope(1.0).move_to(P(-2.0, 1.75))
        self.au_mot("astrophysicienne")
        self.play(FadeIn(metier, shift=UP * 0.1), FadeIn(tel, shift=UP * 0.15), run_time=0.4)
        et = scintiller(etoile(0.42).move_to(P(0.0, 3.1)))
        rayon = DashedLine(P(-0.25, 2.85), P(-1.3, 2.2), color=JAUNE_TITRE, stroke_width=3, dash_length=0.08)
        self.au_mot("la lumière")
        self.play(GrowFromCenter(et), Create(rayon), run_time=0.45)
        # le signal : une vague qui ondule dans un cadre
        cad = self.carte(4.9, 2.3, P(3.85, 1.85), GREY_B)
        lsig = self.t("signal", 28, GREY_A).next_to(cad, UP, buff=0.1).align_to(cad, LEFT).shift(RIGHT * 0.2)
        ph = ValueTracker(0.0)

        def onde():
            return ParametricFunction(lambda t: P(t, 1.85 + 0.75 * math.sin(4.2 * t + ph.get_value())
                                                  * (0.6 + 0.4 * math.sin(1.7 * t))),
                                      t_range=[1.6, 6.1, 0.02], color=TERME, stroke_width=4)
        sig = always_redraw(onde)
        x0 = -6.2
        self.ligne([("Chaque nuit, le signal oscille,", WHITE, "Chaque nuit")], -0.5, x=x0, fs=40,
                   avec_k={0: [FadeIn(cad), FadeIn(lsig), Create(sig)]}, rt=0.5)
        moteur = VMobject().add_updater(lambda m, dt: ph.increment_value(3.0 * dt))
        self.add(moteur)
        self.ligne([("à cause de l'atmosphère.", GREY_A, "à cause")], -1.15, x=x0, fs=38)
        moy = DashedLine(P(1.6, 1.85), P(5.6, 1.85), color=JUSTE, stroke_width=4, dash_length=0.12)
        qm = self.t("?", 48, JUSTE, audit=False).next_to(moy, RIGHT, buff=0.12)
        self.ligne([("Vers quelle valeur", JAUNE_TITRE, "vers quelle"), ("la moyenne", JUSTE, "la moyenne")], -1.9,
                   x=x0, fs=40, avec_k={1: [Create(moy), FadeIn(qm, scale=1.4)]})
        self.ligne([("de ses mesures se stabilise,", JAUNE_TITRE, "de ses")], -2.55, x=x0, fs=40)
        self.ligne([("malgré ces oscillations ?", JAUNE_TITRE, "malgré")], -3.2, x=x0, fs=40)
        self.play(Indicate(qm, color=JUSTE, scale_factor=1.3), run_time=0.5)
        self.attendre_voix(marge=0.5)
        moteur.clear_updaters()

    # ── 02 : encadrer : uₙ = 2 + sin(n)/n, la vague entre −1 et 1 ──────────

    def ecran_encadrer(self):
        self.nouvel_ecran("02-encadrer")
        self.titre("Encadrer la suite", JAUNE_TITRE, 46, extrait="Sa moyenne")
        x0 = -6.2
        self.ligne([("Sa moyenne après", WHITE, "après n"), ("n", TERME, None), ("nuits,", WHITE, "nuits"),
                    ("pour", WHITE, "pour n"), ("n ≥ 1 :", GREY_A, "égal à 1")], 2.25, x=x0, fs=40)
        self.lmaths([("t", [("uₙ =", TERME, "u indice n"), ("2 +", WHITE, "2 plus")]),
                     ("f", [("sin(n)", WHITE, "sinus de n sur")], [("n", WHITE, None)])], 1.15, x=x0, fs=48)
        # la vague sin(n), coincée entre les traits −1 et 1
        X0, X1, YC, H = 1.3, 6.0, -0.15, 0.62
        haut = DashedLine(P(X0, YC + H), P(X1, YC + H), color=RAISON, stroke_width=4, dash_length=0.1)
        bas = DashedLine(P(X0, YC - H), P(X1, YC - H), color=RAISON, stroke_width=4, dash_length=0.1)
        l1 = self.t("1", 32, RAISON, audit=False).next_to(haut, LEFT, buff=0.15)
        lm1 = self.t("−1", 32, RAISON, audit=False).next_to(bas, LEFT, buff=0.15)
        ph = ValueTracker(0.0)
        vg = always_redraw(lambda: ParametricFunction(
            lambda t: P(t, YC + H * math.sin(3.1 * t + ph.get_value())), t_range=[X0 + 0.05, X1 - 0.05, 0.02],
            color=WHITE, stroke_width=4))
        self.au_mot("Sinus de n est")
        self.play(Create(vg), run_time=0.5)
        moteur = VMobject().add_updater(lambda m, dt: ph.increment_value(2.2 * dt))
        self.add(moteur)
        self.ligne([("−1 ≤", RAISON, "moins 1"), ("sin(n)", WHITE, None), ("≤ 1", RAISON, "et 1")], -0.15, x=x0,
                   fs=46, avec_k={0: [Create(bas), FadeIn(lm1)], 2: [Create(haut), FadeIn(l1)]}, rt=0.4)
        g = self.lmaths([("t", [("donc", GREY_A, "Donc"), ("2 −", RAISON, "2 moins")]),
                         ("f", [("1", RAISON, "1 sur")], [("n", RAISON, None)]),
                         ("t", [("≤", WHITE, None), ("uₙ", TERME, None), ("≤", WHITE, None), ("2 +", RAISON, "2 plus")]),
                         ("f", [("1", RAISON, "1 sur")], [("n", RAISON, None)])], -1.6, x=x0, fs=48)
        self.play(Indicate(VGroup(*g[1:4]), color=RAISON, scale_factor=1.06),
                  Indicate(VGroup(*g[-3:]), color=RAISON, scale_factor=1.06), run_time=0.6)
        self.attendre_voix(marge=0.6)
        moteur.clear_updaters()

    # ── 03 : les gendarmes : les bornes se resserrent, la suite est escortée ──

    def scene_gendarmes(self, nu, f_bas, f_haut, f_u, k_t, n_fin, s=0.3):
        """Les deux bornes tracées jusqu'à k, deux gendarmes au bout (dessus, dessous),
        les termes déjà passés, et le point bleu entre les gendarmes."""
        def dessin():
            k = k_t.get_value()
            g = VGroup(self.courbe(nu, f_haut, 1, k), self.courbe(nu, f_bas, 1, k))
            g.add(*[nu.point(n, f_u(n), TERME, 0.07) for n in range(1, int(k + 1e-6) + 1)])
            g.add(gendarme(s).next_to(nu.G(k, f_haut(k)), UP, buff=0.03),
                  gendarme(s).next_to(nu.G(k, f_bas(k)), DOWN, buff=0.03),
                  Dot(nu.G(k, f_u(k)), radius=0.1, color=TERME))
            return g
        return always_redraw(dessin)

    def ecran_gendarmes(self):
        self.nouvel_ecran("03-gendarmes")
        tit = self.t("Le théorème des gendarmes", 46, JAUNE_TITRE).move_to(P(0, 3.15))
        x0 = -6.2
        nu = NuageTermes((0, 13.0), (0.55, 3.45), P(1.95, -2.25), P(4.75, 2.15), fs=26)
        for n in (5, 10):
            nu.add(nu.graduation_n(n, str(n), 24))
        k_t = ValueTracker(1.0)
        sc = self.scene_gendarmes(nu, lambda t: 2 - 1 / t, lambda t: 2 + 1 / t, lambda t: 2 + math.sin(t) / t, k_t, 12.6)
        self.ligne([("Les deux bornes", RAISON, "Les deux bornes"), ("→ 2", JUSTE, "vers 2")], 2.2, x=x0, fs=44,
                   avec_k={0: [FadeIn(tit, shift=DOWN * 0.1), *self.axes(nu, [FadeIn(g) for g in nu[4:]]), FadeIn(sc)]},
                   rt=0.4)
        moteur = self.avancer(k_t, 12.6, 2.4)
        self.ligne([("Théorème des gendarmes :", JAUNE_TITRE, "Théorème")], 1.3, x=x0, fs=38)
        self.ligne([("si une suite est coincée", WHITE, "si une suite")], 0.55, x=x0, fs=38)
        self.ligne([("entre deux suites", WHITE, "entre deux")], -0.1, x=x0, fs=38)
        self.ligne([("qui ont la", WHITE, "qui ont"), ("même limite,", JAUNE_TITRE, "MÊME")], -0.75, x=x0, fs=38)
        self.ligne([("elle a aussi cette limite.", WHITE, "elle a aussi")], -1.4, x=x0, fs=38)
        l2 = self.trait_u(nu, 2, JUSTE, "2", 28)
        fin = self.ligne([("uₙ", TERME, "Donc u"), ("converge vers", JUSTE, "converge"),
                          ("2", JUSTE, "vers 2")], -2.35, x=x0, fs=42, avec_k={3: [Create(l2[0]), FadeIn(l2[1])]})
        self.play(FadeIn(self.encadre(fin, JUSTE, 0.16)), run_time=0.3)
        self.attendre_voix(marge=0.6)
        moteur.clear_updaters()
        sc.clear_updaters()

    # ── 04 : question-pause n° 1 → A (5 − 3/n ≤ uₙ ≤ 5 + 1/n² : → 5) ──────

    def entonnoir(self, f_bas, f_haut, f_u, ur, cible=None, bg=P(2.1, -2.3), hd=P(4.8, 0.95), n_fin=12.6):
        """Un petit repère : les deux bornes tracées en entier, les termes, deux gendarmes au bout ;
        renvoie (nu, groupe des bornes, termes, gendarmes, trait de la limite)."""
        nu = NuageTermes((0, 13.0), ur, bg, hd, fs=24)
        bornes = VGroup(self.courbe(nu, f_haut, 1, n_fin), self.courbe(nu, f_bas, 1, n_fin))
        termes = self.points(nu, f_u, range(1, 13))
        gd = VGroup(gendarme(0.27).next_to(nu.G(n_fin, f_haut(n_fin)), UP, buff=0.03),
                    gendarme(0.27).next_to(nu.G(n_fin, f_bas(n_fin)), DOWN, buff=0.03))
        lim = self.trait_u(nu, cible, JUSTE, str(cible), 28) if cible is not None else None
        return nu, bornes, termes, gd, lim

    def ecran_question1(self):
        g2 = self.ligne_maths([("t", [("Pour tout", WHITE, "Pour tout"), ("n ≥ 1 :", GREY_A, "égal à 1"), ("5 −", RAISON, "5 moins")]), ("f", [("3", RAISON, "3 sur")], [("n", RAISON, None)]),
                               ("t", [("≤", WHITE, "inférieur ou égal à u"), ("uₙ", TERME, None),
                                      ("≤", WHITE, "inférieur ou égal à 5"), ("5 +", RAISON, None)]),
                               ("f", [("1", RAISON, "1 sur")], [("n²", RAISON, None)])], 44)
        g3 = self.construire([("La limite de", WHITE, "La limite"), ("uₙ", TERME, None), ("est :", WHITE, "est")], 40)
        q = self.question_lignes("04-question", [g2, g3], ["5", "2", "on ne peut pas conclure"], 0, fs=40)
        self.dire("04b-reponse")
        ok = self.q_reponse(q, 0)
        self.play(FadeOut(q.cartes[1]), FadeOut(q.cartes[2]), FadeOut(VGroup(*g2[:2])), FadeOut(g3),
                  VGroup(q.cartes[0], ok).animate.move_to(P(0, 2.4)),
                  VGroup(*g2[2:]).animate.move_to(P(0, 0.95)).align_to(P(-6.0, 0), LEFT), run_time=0.35)
        x0 = -6.2
        nu, bornes, termes, gd, lim = self.entonnoir(lambda t: 5 - 3 / t, lambda t: 5 + 1 / t ** 2,
                                                     lambda n: 5 + math.sin(n) / n ** 2, (1.4, 6.5), 5)
        self.ligne([("Les deux bornes", RAISON, "Les deux bornes"), ("→ 5 :", JUSTE, "vers 5")], -0.4, x=x0, fs=44,
                   avec_k={0: self.axes(nu, [Create(bornes), Indicate(VGroup(*g2[2:]), color=RAISON, scale_factor=1.04)]),
                           1: [Create(lim[0]), FadeIn(lim[1])]}, rt=0.5)
        self.ligne([("par les gendarmes,", JAUNE_TITRE, "par les gendarmes")], -1.3, x=x0, fs=42,
                   avec_k={0: [FadeIn(gd, shift=LEFT * 0.3), LaggedStart(*[GrowFromCenter(d) for d in termes],
                                                                         lag_ratio=0.08)]}, rt=0.7)
        fin = self.ligne([("uₙ", TERME, "u indice n"), ("converge vers", JUSTE, "converge"), ("5", JUSTE, "vers 5")],
                         -2.25, x=x0, fs=46)
        self.play(FadeIn(self.encadre(fin, JUSTE, 0.16)), run_time=0.3)
        self.attendre_voix(marge=0.6)

    # ── 05 : la comparaison : le plancher n − 3 pousse uₙ vers +∞ ─────────

    def ecran_comparaison(self):
        self.nouvel_ecran("05-comparaison")
        self.titre("Vers l'infini : un seul côté suffit", JAUNE_TITRE, 46)
        x0 = -6.2
        nu = NuageTermes((0, 13.0), (-3.5, 16.5), P(2.3, -2.0), P(5.4, 2.2), fs=26)
        for n in (5, 10):
            nu.add(nu.graduation_n(n, str(n), 24))
        k_t = ValueTracker(0.0)

        def dessin():
            k = k_t.get_value()
            g = VGroup(self.courbe(nu, lambda t: t - 3, 0, k, RAISON, 5))
            g.add(*[nu.point(n, C5[n], TERME, 0.075) for n in range(1, int(k + 1e-6) + 1)])
            return g
        sc = always_redraw(dessin)
        lab = self.t("n − 3", 30, RAISON, audit=False).next_to(nu.G(11, 8), DR, buff=0.35)
        haut = Arrow(nu.G(12.9, 9) + RIGHT * 0.25, nu.G(12.9, 16.5) + RIGHT * 0.25, buff=0, color=JUSTE,
                     stroke_width=6, tip_length=0.2)
        self.ligne([("Prends", WHITE, "Prends"), ("uₙ =", TERME, "u indice n"), ("n + 3cos(n).", WHITE, "n plus 3")],
                   2.2, x=x0, fs=40, avec_k={0: self.axes(nu, [FadeIn(g) for g in nu[4:]])})
        self.ligne([("cos(n) ≥", WHITE, "Cosinus de n est"), ("−1,", RAISON, "moins 1")], 1.35, x=x0, fs=44)
        self.add(sc)
        self.ligne([("donc", GREY_A, "donc u"), ("uₙ ≥", TERME, None), ("n − 3", RAISON, "n moins 3"),
                    ("→ +∞.", JUSTE, "qui tend")], 0.5, x=x0, fs=44,
                   avec_k={2: [k_t.animate.set_value(6), FadeIn(lab)], 3: [k_t.animate.set_value(12.6)]}, rt=1.2)
        self.ligne([("Théorème de comparaison :", JAUNE_TITRE, "Théorème de comparaison")], -0.4, x=x0, fs=38)
        fin = self.ligne([("uₙ → +∞", JUSTE, "u indice n tend")], -1.25, x=x0, fs=48,
                         avec_k={0: [GrowArrow(haut)]})
        self.play(FadeIn(self.encadre(fin, JUSTE, 0.16)), run_time=0.3)
        self.ligne([("Pour +∞, on", WHITE, "Pour plus"), ("minore ;", RAISON, "minore")], -2.3, x=x0, fs=42)
        self.ligne([("pour −∞, on", WHITE, "pour moins"), ("majore.", RAISON, "majore")], -3.05, x=x0, fs=42)
        self.attendre_voix(marge=0.6)
        sc.clear_updaters()

    # ── 06 : le piège : sous le plafond y = n, tout est possible ───────────

    def ecran_piege(self):
        self.nouvel_ecran("06-piege")
        tit = self.t("Voilà le piège !", 46, PIEGE).move_to(P(0, 3.15))
        self.au_mot("piège")
        self.play(FadeIn(tit, scale=1.3), run_time=0.35)
        x0 = -6.2
        nu = NuageTermes((0, 13.0), (-13.0, 13.0), P(2.55, -2.35), P(5.3, 2.3), fs=26)
        plafond = self.courbe(nu, lambda t: t, 0, 12.6, RAISON, 5)
        lp = self.t("n", 30, RAISON, audit=False).next_to(nu.G(12.6, 12.6), RIGHT, buff=0.12)
        self.ligne([("Être plus petite qu'une suite", WHITE, "Être plus petite")], 2.2, x=x0, fs=37)
        self.ligne([("qui tend vers +∞", WHITE, "qui tend"), ("ne dit rien.", PIEGE, "ne dit rien")], 1.5, x=x0, fs=37,
                   avec_k={0: self.axes(nu, [Create(plafond), FadeIn(lp)])}, rt=0.5)
        self.ligne([("Si", WHITE, "Si u"), ("uₙ ≤ n,", TERME, "inférieur"), ("uₙ peut tendre", WHITE, "peut tendre")],
                   0.6, x=x0, fs=37)
        series = []
        for cle, f in P6.items():
            pts = self.points(nu, f, range(1, 13), TERME, 0.07)
            series.append(pts)
        y0, y7 = nu.G(10.5, P6["0"](10.5))[1], nu.G(10.5, P6["7"](10.5))[1]
        e0 = self.t("→ 0", 28, JUSTE, audit=False).move_to(P(nu.G(10.5, 0)[0], (y0 + y7) / 2))
        e7 = self.t("→ 7", 30, JUSTE, audit=False).next_to(nu.G(12.6, 7 * 12 / 18), RIGHT, buff=0.12)
        em = self.t("→ −∞", 30, JUSTE, audit=False).next_to(nu.G(8, -9.5), LEFT, buff=0.1)
        lag = lambda pts: LaggedStart(*[GrowFromCenter(d) for d in pts], lag_ratio=0.08)  # noqa: E731
        self.ligne([("vers 0,", JUSTE, "vers 0"), ("vers 7,", JUSTE, "vers 7"), ("ou vers −∞.", JUSTE, "ou vers moins")],
                   -0.2, x=x0, fs=38, avec_k={0: [lag(series[0]), FadeIn(e0)], 1: [lag(series[1]), FadeIn(e7)],
                                                    2: [lag(series[2]), FadeIn(em)]}, rt=0.6)
        self.ligne([("Et pour les gendarmes,", WHITE, "Et pour les")], -1.25, x=x0, fs=37)
        self.ligne([("les deux bornes doivent avoir", WHITE, "les deux bornes")], -1.95, x=x0, fs=37)
        fin = self.ligne([("la même limite.", JAUNE_TITRE, "la même limite")], -2.75, x=x0, fs=44)
        self.insister(fin, 1.08)
        self.attendre_voix(marge=0.6)

    # ── 07 : question-pause n° 2 → C (bornes → 1 et → 3 : on ne conclut pas) ──

    def ecran_question2(self):
        g2 = self.ligne_maths([("t", [("Pour tout", WHITE, "Pour tout"), ("n ≥ 1 :", GREY_A, "égal à 1"), ("1 −", RAISON, "1 moins")]), ("f", [("1", RAISON, "1 sur")], [("n", RAISON, None)]),
                               ("t", [("≤", WHITE, "inférieur ou égal à u"), ("uₙ", TERME, None),
                                      ("≤", WHITE, "inférieur ou égal à 3"), ("3 +", RAISON, None)]),
                               ("f", [("1", RAISON, "1 sur")], [("n", RAISON, None)])], 44)
        g3 = self.construire([("Que peut-on affirmer ?", WHITE, "Que peut-on")], 40)
        q = self.question_lignes("07-question", [g2, g3],
                                 ["uₙ converge vers 2", "uₙ converge vers 1", "on ne peut pas conclure"],
                                 2, fs=40)
        self.dire("07b-reponse")
        ok = self.q_reponse(q, 2)
        self.play(FadeOut(q.cartes[0]), FadeOut(q.cartes[1]), FadeOut(VGroup(*g2[:2])), FadeOut(g3),
                  VGroup(q.cartes[2], ok).animate.move_to(P(0, 2.4)),
                  VGroup(*g2[2:]).animate.move_to(P(0, 0.95)).align_to(P(-6.0, 0), LEFT), run_time=0.35)
        x0 = -6.2
        nu, bornes, termes, gd, _ = self.entonnoir(lambda t: 1 - 1 / t, lambda t: 3 + 1 / t,
                                                   lambda n: 2 + math.cos(1.7 * n), (-0.3, 4.3))
        t1, t3 = self.trait_u(nu, 1, RAISON, "1", 28), self.trait_u(nu, 3, RAISON, "3", 28)
        ecart = DoubleArrow(nu.G(12.6, 1.12), nu.G(12.6, 2.88), buff=0, color=PIEGE, stroke_width=5,
                            tip_length=0.16).shift(RIGHT * 0.32)
        self.ligne([("Les bornes", RAISON, "Les bornes"), ("→ 1", RAISON, "vers 1"), ("et", WHITE, None),
                    ("→ 3 :", RAISON, "vers 3")], -0.4, x=x0, fs=44,
                   avec_k={0: self.axes(nu, [Create(bornes), FadeIn(gd, shift=LEFT * 0.3)]),
                           1: [Create(t1[0]), FadeIn(t1[1])], 3: [Create(t3[0]), FadeIn(t3[1])]}, rt=0.45)
        self.ligne([("deux limites différentes,", PIEGE, "deux limites")], -1.3, x=x0, fs=42,
                   avec_k={0: [GrowFromCenter(ecart), LaggedStart(*[GrowFromCenter(d) for d in termes],
                                                                   lag_ratio=0.08)]}, rt=0.7)
        fin1 = self.ligne([("les gendarmes", PIEGE, "les gendarmes")], -2.2, x=x0, fs=40)
        fin = VGroup(fin1, self.ligne([("ne s'appliquent pas.", PIEGE, "ne s'appliquent")], -2.85, x=x0, fs=40))
        self.play(FadeIn(self.encadre(fin, PIEGE, 0.16)), Indicate(ecart, color=PIEGE, scale_factor=1.15),
                  run_time=0.45)
        self.attendre_voix(marge=0.6)

    # ── 08 : le défi : vₙ = −n² + 4sin(n) et wₙ = 1 + 2cos(n)/n ────────────

    def ecran_defi(self):
        self.nouvel_ecran("08-defi")
        tit = self.titre("À toi de jouer !", JAUNE_TITRE, 48, extrait="À toi")
        x0 = -6.2
        tel = telescope(0.9).move_to(P(5.0, 1.75))
        et = scintiller(etoile(0.36).move_to(P(6.05, 2.75)))
        self.ligne([("Pour", WHITE, "Pour n"), ("n ≥ 1,", GREY_A, "égal à 1"), ("trouve la limite de", WHITE, "trouve")],
                   2.2, x=x0, fs=40, avec_k={0: [FadeIn(tel, shift=UP * 0.15), GrowFromCenter(et)]})
        self.ligne([("vₙ =", TERME, "v indice n"), ("−n²", WHITE, "moins n"), ("+ 4sin(n).", WHITE, "plus 4")], 1.25,
                   x=x0, fs=48)
        self.lmaths([("t", [("Puis celle de", WHITE, "Puis celle"), ("wₙ =", TERME, "w indice n"), ("1 +", WHITE, "1 plus")]),
                     ("f", [("2cos(n)", WHITE, "2 cosinus")], [("n", WHITE, None)])], -0.05, x=x0, fs=48)
        self.defi_pause(-2.0, x=-1.8)
        self._defi = (tit, et)

    def ecran_correction(self):
        self.dire("08b-correction")
        tit, et = self._defi
        et.clear_updaters()
        self.au_mot("Correction")
        cor = self.t("Correction", 46, JUSTE).move_to(tit)
        autres = [m for m in self.mobjects if m is not tit and m is not self._margo]
        self.play(*[FadeOut(m) for m in autres], ReplacementTransform(tit, cor), run_time=0.4)
        self.remove(*autres)
        x0 = -6.2
        # vₙ : sous le plafond 4 − n² qui plonge
        nu = NuageTermes((0, 8.6), (-68, 8), P(2.5, -2.1), P(5.0, 2.3), fs=26)
        plaf = self.courbe(nu, lambda t: 4 - t * t, 0, 8.4, RAISON, 5)
        pts = self.points(nu, lambda n: V8[n], range(1, 9))
        bas = Arrow(nu.G(8.6, -30) + RIGHT * 0.3, nu.G(8.6, -66) + RIGHT * 0.3, buff=0, color=JUSTE, stroke_width=6,
                    tip_length=0.2)
        self.ligne([("sin(n) ≤", WHITE, "Sinus de n est"), ("1,", WHITE, "égal à 1"), ("donc", GREY_A, "donc")], 2.2,
                   x=x0, fs=42, avec_k={0: self.axes(nu)})
        self.ligne([("vₙ ≤", TERME, "v indice n est"), ("−n²", RAISON, "moins n au carré"), ("+ 4", RAISON, "plus 4"),
                    ("→ −∞ :", JUSTE, "qui tend")], 1.4, x=x0, fs=44,
                   avec_k={1: [Create(plaf)], 3: [LaggedStart(*[GrowFromCenter(d) for d in pts], lag_ratio=0.1)]},
                   rt=0.6)
        fin1 = self.ligne([("vₙ → −∞", JUSTE, "v indice n tend")], 0.55, x=x0, fs=46, avec_k={0: [GrowArrow(bas)]})
        self.play(FadeIn(self.encadre(fin1, JUSTE, 0.14)), run_time=0.3)
        # wₙ : l'entonnoir vers 1
        self.au_mot("Pour w")
        self.play(*[FadeOut(m) for m in (nu.ax_n, nu.ax_u, nu.lab_n, nu.lab_u, plaf, pts, bas)], run_time=0.25)
        nw, bornes, termes, gd, lim = self.entonnoir(lambda t: 1 - 2 / t, lambda t: 1 + 2 / t,
                                                     lambda n: W8[n], (-1.4, 3.4), 1, bg=P(2.85, -2.1), hd=P(5.0, 2.0))
        g = self.lmaths([("t", [("Pour wₙ :", GREY_A, None), ("1 −", RAISON, "1 moins")]),
                         ("f", [("2", RAISON, "2 sur")], [("n", RAISON, None)]),
                         ("t", [("≤", WHITE, "inférieur ou égal à w"), ("wₙ", TERME, None),
                                ("≤", WHITE, "inférieur ou égal à 1"), ("1 +", RAISON, None)]),
                         ("f", [("2", RAISON, "2 sur")], [("n", RAISON, None)])], -0.6, x=x0, fs=38,
                        avec_k={1: self.axes(nw, [Create(bornes)])}, rt=0.5)
        self.ligne([("Les deux bornes", RAISON, "Les deux bornes"), ("→ 1 :", JUSTE, "vers 1")], -1.75, x=x0, fs=42,
                   avec_k={0: [FadeIn(gd, shift=LEFT * 0.3), LaggedStart(*[GrowFromCenter(d) for d in termes],
                                                                         lag_ratio=0.08)],
                           1: [Create(lim[0]), FadeIn(lim[1])]}, rt=0.6)
        fin2 = self.ligne([("wₙ", TERME, "w indice n"), ("converge vers", JUSTE, "converge"), ("1", JUSTE, "vers 1")],
                          -2.78, x=x0, fs=44)
        self.play(FadeIn(self.encadre(fin2, JUSTE, 0.14)), run_time=0.3)
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
        points = [[[("Pour", WHITE, "Pour plus"), ("+∞,", J, None), ("on minore par une suite", WHITE, "on minore")],
                   [("qui tend vers", WHITE, "qui tend"), ("+∞ ;", J, None)],
                   [("pour", WHITE, "pour moins"), ("−∞,", J, None), ("on majore.", WHITE, "on majore")]],
                  [[("Pour une limite finie, on encadre", WHITE, "Pour une limite")],
                   [("entre deux suites de", WHITE, "entre deux"), ("même limite :", J, "même limite")],
                   [("ce sont les gendarmes.", JUSTE, "ce sont")]],
                  [[("sin(n) et cos(n) restent", WHITE, "Et sinus")],
                   [("entre", WHITE, "restent entre"), ("−1", J, "moins 1"), ("et", WHITE, None), ("1.", J, "et 1")]]]
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
        ecrans = [self.ecran_garde, self.ecran_situation, self.ecran_encadrer, self.ecran_gendarmes,
                  self.ecran_question1, self.ecran_comparaison, self.ecran_piege, self.ecran_question2,
                  self.ecran_defi, self.ecran_correction, self.ecran_appris, lambda: self.fin("10-abonne")]
        choix = os.environ.get("ECRANS")          # contrôle rapide : ECRANS=5,6 (jamais au rendu final)
        for k, e in enumerate(ecrans):
            if not choix or str(k) in choix.split(",") or (e == self.ecran_correction and "8" in choix.split(",")):
                e()
