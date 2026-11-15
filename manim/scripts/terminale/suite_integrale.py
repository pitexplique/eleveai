# suite_integrale.py
# EleveAI — Maths Terminale (spé) — paysage « Une suite d'intégrales »
# (16:9), ceinture VERTE. Série SUITES du lycée, épisode 41.
# Micro du coach : integrale_suite (notion primitive_integrale) :
# lib/tutor-v4/questionBank/terminale-spe/maths/integrales-encadrement.bank.ts.
#
# Ce que demande le coach → écran :
#   · calculer le terme de rang k en remplaçant n (tpl_1)                      → 03, 04 (A) ;
#   · le sens de variation : comparer les fonctions sur l'intervalle, puis
#     intégrer l'inégalité (tpl_3, « sur [0 ; 1], xⁿ⁺¹ ≤ xⁿ »)                → 05, 08 (C) ;
#   · le piège : hors de [0 ; 1] l'inégalité s'inverse                        → 06 ;
#   · la limite : on encadre, ou on calcule directement (tpl_4)               → 07, 11b ;
#   · la relation de récurrence par intégration par parties (tpl_5 : on pose
#     u(x) = xⁿ⁺¹ et v′(x) = eˣ ; Jₙ₊₁ = e − (n + 1)Jₙ)                      → 09, 10 ;
#   · appliquer la relation de proche en proche depuis J₀ (tpl_6)             → 11, 11b ;
#   · une situation concrète (Marius et le béton de sa rampe)                 → 01, 02, 07.
# Clé de voix → écran :
#   00-garde (les trois profils superposés, l'aire qui maigrit) · 01 Marius,
#   concepteur de skateparks : la rampe d'un mètre, les trois profils y = x,
#   y = x², y = x³, le béton à couler · 02 l'aire sous la courbe, Iₙ = ∫₀¹ xⁿ dx,
#   le béton qui maigrit quand n grandit · 03 le calcul : la primitive, Iₙ =
#   1/(n + 1), puis 1/2, 1/3, 1/4 (chaque aire hachurée à son tour) · 04/04b
#   question (A : 1/5 ; l'aire sous x⁴) · 05 les variations : xⁿ⁺¹ ≤ xⁿ, la
#   tranche orange en moins, Iₙ₊₁ ≤ Iₙ · 06 le piège : x = 2 (2² = 4, ça monte)
#   et x = 0,5 (0,5² = 0,25, ça descend), deux droites graduées côte à côte ·
#   07 la limite : le nuage (n ; Iₙ) qui descend vers 0, et la rampe qui devient
#   un mur · 08/08b question (C : sur [0 ; 1], xⁿ⁺¹ ≤ xⁿ ; intégrer conserve
#   l'ordre) · 09 au bac : ce qui ne se calcule pas, la chaîne J₀ → J₁ → J₂ → J₃,
#   Jₙ = ∫₀¹ xⁿ eˣ dx · 10 l'intégration par parties, LIGNE À LIGNE ·
#   11/11b défi : J₂ = e − 2 ≈ 0,72, puis 0 ≤ Jₙ ≤ e/(n + 1) → 0 ·
#   12 « Ce que tu as appris » · 13 fin.
# Code couleur (module commun) : bleu = les termes Iₙ (l'aire, le béton),
# orange = ce qui varie (la borne, la tranche en moins, n), vert = juste
# (la limite, le résultat), rouge = piège.
# ⛔ Pas de LaTeX. Voix : manim/voix/terminale-suite-integrale.json (débit −6),
# calée mot à mot par suite_integrale_marques.json.
# ⚠️ Paysage LONGUE (voix ≈ 5 min 30) et c'est VOULU : le micro demande les
#   variations, la limite ET la récurrence, et l'intégration par parties n'est
#   pas coupée (accord de Frédéric, 15/11 ; mêmes cas aux ép. 27 et 32).
# Contrôle : AUDIT=1 BORDS=1 python -m manim render --dry_run …
#   (BORDS=1 vérifie aussi que rien n'approche Ti-Margo à moins de 0,15 : MARGO)
# python -m manim render -qh --disable_caching manim/scripts/terminale/suite_integrale.py SuiteIntegraleTle -o eleveai-maths-terminale-suite-integrale --media_dir manim/scripts/terminale/media-suite-integrale
# Sortie : manim/sorties/terminale/maths/suites/41-integrale/

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
I = {n: 1 / (n + 1) for n in range(1, 4000)}                        # Iₙ = ∫₀¹ xⁿ dx
assert (I[1], I[2], I[3], I[4]) == (1 / 2, 1 / 3, 1 / 4, 1 / 5)     # 03, 04 (A : 1/5)
assert all(I[n + 1] < I[n] for n in range(1, 3999))                 # 05 : décroissante
assert all(x ** 3 <= x ** 2 for x in [k / 100 for k in range(101)])  # 05 : xⁿ⁺¹ ≤ xⁿ sur [0 ; 1]
assert 2 ** 2 == 4 > 2 and 0.5 ** 2 == 0.25 < 0.5                   # 06 : le piège
assert I[3999] < 1e-3                                               # 07 : Iₙ → 0


def _J(n, pas=40000):
    """Jₙ = ∫₀¹ xⁿ eˣ dx, par la méthode des rectangles (points milieux)."""
    return sum(((k + 0.5) / pas) ** n * math.exp((k + 0.5) / pas) for k in range(pas)) / pas


J = {n: _J(n) for n in range(5)}
JP = {n: _J(n, 4000) for n in range(1, 13)}         # les points du nuage de la correction
assert abs(J[0] - (math.e - 1)) < 1e-6 and abs(J[1] - 1) < 1e-6     # 11b : J₀ = e − 1, J₁ = 1
assert abs(J[2] - (math.e - 2)) < 1e-6 and round(math.e - 2, 2) == 0.72   # 11b : J₂ ≈ 0,72
assert all(abs(J[n + 1] - (math.e - (n + 1) * J[n])) < 1e-6 for n in range(4))   # 10 : la relation
assert all(0 <= J[n] <= math.e / (n + 1) + 1e-9 for n in range(5))  # 11b : l'encadrement
assert math.e / 4000 < 1e-3                                         # 11b : Jₙ → 0

PEAU, PEAU2 = "#c68642", "#8d5524"
BETON, PLANCHE = "#94a3b8", "#b45309"


# ── les dessins de l'épisode ───────────────────────────────────────────────

def marius(s=1.0):
    """Marius, concepteur de skateparks : casque, tee-shirt jaune, mètre à la ceinture."""
    casque = Sector(radius=0.31, angle=PI, start_angle=0, fill_color="#16a34a", fill_opacity=1,
                    stroke_width=0).move_to(P(0, 1.16))
    tete = Circle(radius=0.27, fill_color=PEAU, fill_opacity=1, stroke_width=0).move_to(P(0, 1.0))
    corps = RoundedRectangle(width=0.95, height=1.15, corner_radius=0.25, fill_color="#eab308", fill_opacity=1,
                             stroke_width=0).move_to(P(0, 0.12))
    metre = RoundedRectangle(width=0.26, height=0.2, corner_radius=0.05, fill_color="#0f172a", fill_opacity=1,
                             stroke_width=0).move_to(P(0.28, -0.3))
    return VGroup(corps, metre, tete, casque).scale(s)


def planche(s=1.0, couleur=PLANCHE):
    """Une planche de skate vue de profil : le plateau et ses deux roues."""
    deck = RoundedRectangle(width=1.0, height=0.12, corner_radius=0.06, fill_color=couleur, fill_opacity=1,
                            stroke_width=0)
    roues = VGroup(*[Circle(radius=0.08, fill_color=GREY_A, fill_opacity=1, stroke_width=0).move_to(P(x, -0.14))
                     for x in (-0.3, 0.3)])
    return VGroup(deck, roues).scale(s)


class Rampe(VGroup):
    """Le profil de la rampe : le repère [0 ; 1] × [0 ; 1] (le sol et le haut
    de la rampe), les courbes y = xⁿ et le BÉTON coulé dessous.
    self.G(x, y) : le point de l'écran ; self.profil(n) ; self.beton(n)."""

    def __init__(self, bg, hd, fs=24, nombres=False, ymax=1.0, **kw):
        super().__init__(**kw)
        self.X0, self.Y0 = float(bg[0]), float(bg[1])
        self.X1, self.Y1 = float(hd[0]), float(hd[1])
        self.ymax = float(ymax)
        k = dict(buff=0, stroke_width=2.5, color=GREY_B, tip_length=0.16, max_tip_length_to_length_ratio=0.1)
        self.ax_x = Arrow(P(self.X0, self.Y0), P(self.X1 + 0.3, self.Y0), **k)
        self.ax_y = Arrow(P(self.X0, self.Y0), P(self.X0, self.Y1 + 0.3), **k)
        self.lab_x = self._gris("x", fs).next_to(self.ax_x, RIGHT, buff=0.08)
        self.lab_y = self._gris("y", fs).next_to(self.ax_y, UP, buff=0.06)
        self.add(self.ax_x, self.ax_y, self.lab_x, self.lab_y)
        self.cadre = VGroup(DashedLine(self.G(1, 0), self.G(1, self.ymax), dash_length=0.09))
        if abs(self.ymax - 1) < 1e-9:
            self.cadre.add(DashedLine(self.G(0, 1), self.G(1, 1), dash_length=0.09))
        self.cadre.set_stroke(GREY_B, 2)
        if nombres:
            self.nombres = VGroup(self._gris("0", fs).next_to(self.G(0, 0), DL, buff=0.1),
                                  self._gris("1", fs).next_to(self.G(1, 0), DOWN, buff=0.12),
                                  self._gris("1", fs).next_to(self.G(0, 1), LEFT, buff=0.12))
        else:
            self.nombres = VGroup()

    @staticmethod
    def _gris(texte, fs):
        """Une donnée du repère : NON auditée (on la LIT, elle ne conclut rien)."""
        t = Text(texte, font_size=fs, color=GREY_A)
        t._pas_audit = True
        return t

    def G(self, x, y):
        return P(self.X0 + x * (self.X1 - self.X0), self.Y0 + y / self.ymax * (self.Y1 - self.Y0))

    def courbe(self, f, couleur=GREY_A, sw=4.5, x1=1.0):
        return ParametricFunction(lambda t: self.G(t, f(t)), t_range=[0, x1, 0.01], color=couleur, stroke_width=sw)

    def aire(self, f, couleur=TERME, op=0.22, nb=15, sw=2.4):
        """L'aire sous la courbe : le fond, puis les hachures verticales (le béton)."""
        bord = [self.G(x, f(x)) for x in np.linspace(0, 1, 70)]
        fond = Polygon(*bord, self.G(1, 0), fill_color=couleur, fill_opacity=op, stroke_width=0)
        hach = VGroup(*[Line(self.G(x, 0), self.G(x, f(x))) for x in np.linspace(0.07, 0.985, nb)])
        hach.set_stroke(couleur, sw, opacity=0.8)
        return VGroup(fond, hach)

    def profil(self, n, couleur=TERME, sw=5, x1=1.0):
        return self.courbe(lambda t: t ** n, couleur, sw, x1)

    def beton(self, n, couleur=TERME, op=0.22, nb=15, sw=2.4):
        """Le béton coulé sous la courbe y = xⁿ."""
        return self.aire(lambda x: x ** n, couleur, op, nb, sw)

    def tranche(self, n, couleur=RAISON, op=0.55):
        """La tranche de béton ÉCONOMISÉE entre y = xⁿ et y = xⁿ⁺¹."""
        haut = [self.G(x, x ** n) for x in np.linspace(0, 1, 70)]
        bas = [self.G(x, x ** (n + 1)) for x in np.linspace(1, 0, 70)]
        return Polygon(*haut, *bas, fill_color=couleur, fill_opacity=op, stroke_width=0)


def mur(s=1.0):
    """La rampe devenue un mur : un pan vertical hachuré, la planche au pied."""
    pan = Rectangle(width=0.5, height=1.5, fill_color=BETON, fill_opacity=0.3, stroke_color=BETON, stroke_width=3)
    pan.move_to(P(0.45, 0.75))
    hach = VGroup(*[Line(P(0.2, y), P(0.7, y)) for y in np.linspace(0.12, 1.42, 7)]).set_stroke(BETON, 2, opacity=0.7)
    sol = Line(P(-0.9, 0), P(0.9, 0), stroke_color=GREY_B, stroke_width=3)
    pl = planche(0.85).move_to(P(-0.42, 0.14))
    return VGroup(sol, pan, hach, pl).scale(s)


def regle_graduee(x0, x1, y, vmax, fs=24, nb=None):
    """Une droite graduée de 0 à vmax, de x0 à x1 : g.X(v) donne l'abscisse."""
    g = VGroup()
    g.X = lambda v: x0 + v / vmax * (x1 - x0)
    g.add(Arrow(P(x0, y), P(x1 + 0.22, y), buff=0, stroke_width=2.5, color=GREY_B, tip_length=0.14,
                max_tip_length_to_length_ratio=0.1))
    for v in (nb or range(0, int(vmax) + 1)):
        tr = Line(P(g.X(v), y - 0.09), P(g.X(v), y + 0.09), stroke_width=2, color=GREY_B)
        t = Text(str(v), font_size=fs, color=GREY_A).next_to(tr, DOWN, buff=0.08)
        t._pas_audit = True
        g.add(tr, t)
    return g


class SuiteIntegraleTle(VerifMargo, OutilsCalcul, PaysageSuites):
    fichier_marques = "suite_integrale_marques.json"
    nom_voix = "terminale-suite-integrale"
    identite = "Maths Tle spé — EleveAI"
    ceinture = "verte"
    largeur_bouton = 9.0
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

    def bornes(self, g, k=1.3):
        """Rend sa taille à la borne ₀ d'un « ∫₀¹ » ou d'un « ]₀¹ » : grossir_indices
        agrandit les indices Unicode de 30 % (il le faut pour uₙ, c'est trop pour
        la borne d'une intégrale, qui doit rester plus petite que le ¹ du haut)."""
        for i, tx in enumerate(getattr(g, "textes", [])):
            if "₀¹" not in tx:
                continue
            j = len(tx[:tx.index("₀¹")].replace(" ", ""))     # les espaces ne sont pas des glyphes
            gl = g[i][j]
            w0 = gl.width
            gl.scale(1 / k, about_edge=LEFT)
            suite = [m for m in g[i][j + 1:]] + [m for m in g[i + 1:]]
            VGroup(*suite).shift(LEFT * (w0 - gl.width))
        return g

    def ligne(self, morceaux, y, x=None, fs=40, avec=(), larg=None, avec_k=None, rt=0.25):
        g = self.bornes(self.construire(morceaux, fs, larg)).move_to(P(0, y))
        if x is not None:
            g.align_to(P(x, 0), LEFT)
        return self.montrer(g, avec, rt=rt, avec_k=avec_k)

    def lmaths(self, segs, y, x=None, fs=44, avec=(), avec_k=None, rt=0.25, montrer=True, ecart=0.12, larg=None):
        g = self.bornes(self.ligne_maths(segs, fs, ecart=ecart))
        if larg and g.width > larg:
            g.scale_to_fit_width(larg)
        g.move_to(P(0, y))
        if x is not None:
            g.align_to(P(x, 0), LEFT)
        return self.montrer(g, avec, rt=rt, avec_k=avec_k) if montrer else g

    def choix_maths(self, segs, fs=40):
        """Un corps de bouton AVEC fractions : chaque morceau quand la voix le dit."""
        g = self.ligne_maths(segs, fs)
        g.nombres, g.seps = list(g), [VMobject() for _ in g[1:]]
        return g

    def question_lignes(self, cle, groupes, choix, bonne, **kw):
        """poser_question, chaque ligne de la question en morceaux, chaque morceau à sa voix."""
        liste = [(g, None) for g in groupes]

        def dessin():
            for g in groupes:
                self.montrer(g, rt=0.22)
            liste.clear()
        return self.poser_question(cle, liste, choix, bonne, dessin=dessin, **kw)

    def bloc_lim(self, corps, valeur, fs=44, couleur=JUSTE):
        """« lim Iₙ = 0 », avec « n → +∞ » écrit sous le « lim »."""
        lim = self.t("lim", fs, WHITE, 1e9)
        sous = self.t("n → +∞", int(fs * 0.55), RAISON, 1e9, audit=False).next_to(lim, DOWN, buff=0.06)
        droite = self.t(f"{corps} = {valeur}", fs, couleur, 1e9)
        g = VGroup(VGroup(lim, sous), droite).arrange(RIGHT, buff=0.3)
        droite.shift(UP * (lim.get_bottom()[1] - droite.get_bottom()[1]))
        g.lim, g.sous, g.droite = lim, sous, droite
        return g

    def socle(self, ra, extra=()):
        """Les animations d'ouverture d'un repère de rampe : les axes, le cadre."""
        return [Create(ra.ax_x), Create(ra.ax_y), FadeIn(ra.lab_x), FadeIn(ra.lab_y), FadeIn(ra.cadre),
                FadeIn(ra.nombres), *extra]

    def axes(self, nu, extra=()):
        return [Create(nu.ax_n), Create(nu.ax_u), FadeIn(nu.lab_n), FadeIn(nu.lab_u), *extra]

    def etiquette(self, ra, n, texte, x=0.62, buff=0.14, cote=UL, fs=26, couleur=GREY_A):
        """L'étiquette d'un profil, posée le long de sa courbe (donnée du dessin)."""
        t = self.t(texte, fs, couleur, 1e9, audit=False)
        return t.next_to(ra.G(x, x ** n), cote, buff=buff)

    def points_nuage(self, nu, f, ns, couleur=TERME, r=0.075):
        return VGroup(*[nu.point(n, f(n), couleur, r) for n in ns])

    # ── 00 : la garde : les trois profils, le béton qui maigrit ────────────

    def ecran_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        ech = echelle_ceintures(self.ceinture).move_to(P(-0.6, 0)).align_to(P(0, -3.45), DOWN)
        self.add(ech)
        tit = self.t("Une suite d'intégrales", 64, JAUNE_TITRE).to_edge(UP, buff=0.5)
        self.au_mot("Une suite")
        self.play(Write(tit), run_time=0.7)
        y = tit.get_bottom()[1] - 0.5
        ident = self.t(self.identite, 26, GREY_A).move_to(P(0, y - 1.25))
        # le repère commence SOUS l'identité (la flèche de l'axe et son « y » comprises)
        ra = Rampe(P(-1.6, -1.75), P(1.6, ident.get_bottom()[1] - 0.85))   # l'échelle commence à −1,98
        profils = VGroup(*[ra.profil(n, GREY_A, 4) for n in (1, 2, 3)])
        n_t = ValueTracker(1.0)
        beton = always_redraw(lambda: ra.beton(n_t.get_value()))
        self.ligne([("Comment étudier une suite", WHITE, "Comment")], y, fs=40,
                   avec_k={0: self.socle(ra, [LaggedStart(*[Create(c) for c in profils], lag_ratio=0.2)])}, rt=0.7)
        self.ligne([("dont chaque terme est", WHITE, "dont chaque"), ("une aire ?", JAUNE_TITRE, "une aire")],
                   y - 0.66, fs=40, avec_k={1: [FadeIn(beton)]}, rt=0.5)
        self.play(FadeIn(ident), n_t.animate.set_value(3.0), run_time=1.0)
        self.attendre_voix(marge=0.9)
        beton.clear_updaters()

    # ── 01 : Marius, concepteur de skateparks : la rampe et son béton ──────

    def ecran_situation(self):
        self.nouvel_ecran("01-situation")
        perso = marius(0.9).move_to(P(-5.8, 2.45))
        nom = self.t("Marius", 40, JAUNE_TITRE).move_to(P(-3.6, 2.85))
        met1 = self.t("concepteur", 30, TERME).move_to(P(-3.6, 2.35))
        met2 = self.t("de skateparks", 30, TERME).move_to(P(-3.6, 1.9))
        self.au_mot("Marius")
        self.play(FadeIn(perso, shift=UP * 0.2), FadeIn(nom, shift=UP * 0.1), run_time=0.45)
        self.au_mot("skateparks")
        self.play(FadeIn(met1, shift=UP * 0.1), FadeIn(met2, shift=UP * 0.1), run_time=0.4)
        x0, L = -6.2, 7.0
        ra = Rampe(P(1.7, -1.0), P(4.5, 1.8))
        cl = VGroup(DoubleArrow(ra.G(0, 0), ra.G(1, 0), buff=0, color=GREY_A, stroke_width=4,
                                tip_length=0.16).shift(DOWN * 0.3))
        cl.add(self.t("un mètre", 24, GREY_A, 1e9, audit=False).next_to(cl[0], DOWN, buff=0.08))
        ch = VGroup(DoubleArrow(ra.G(1, 0), ra.G(1, 1), buff=0, color=GREY_A, stroke_width=4,
                                tip_length=0.16).shift(RIGHT * 0.25))
        ch.add(self.t("un mètre", 24, GREY_A, 1e9, audit=False).next_to(ch[0], RIGHT, buff=0.1)
               .shift(DOWN * 0.8))      # plus bas que l'étiquette « y = x³ »
        self.ligne([("Une rampe d'un mètre de long,", WHITE, "Pour une rampe")], 1.15, x=x0, fs=38, larg=L,
                   avec_k={0: self.socle(ra, [FadeIn(cl)])}, rt=0.5)
        self.ligne([("d'un mètre de haut.", WHITE, "de haut")], 0.45, x=x0, fs=38, larg=L,
                   avec_k={0: [FadeIn(ch)]})
        self.ligne([("Il a le choix du profil :", WHITE, "il a le choix")], -0.25, x=x0, fs=38, larg=L)
        pl = planche(0.75).move_to(ra.G(0.86, 0.86) + UP * 0.16)
        courbes, etiq = [], []
        for n, xe, cote in ((1, 0.30, UL), (2, 0.60, DR), (3, 0.88, DR)):   # bien séparées : les
            courbes.append(ra.profil(n, GREY_A, 4.5))                       # courbes se rejoignent en (1 ; 1)
            etiq.append(self.etiquette(ra, n, ["y = x", "y = x²", "y = x³"][n - 1], xe, cote=cote))
        self.ligne([("y = x,", WHITE, "y égale x,"), ("y = x²,", WHITE, "y égale x au carré"),
                    ("y = x³", WHITE, "y égale x puissance 3")], -1.0, x=x0, fs=42, larg=L,
                   avec_k={0: [Create(courbes[0]), FadeIn(etiq[0]), FadeIn(pl, shift=UP * 0.2)],
                           1: [Create(courbes[1]), FadeIn(etiq[1])],
                           2: [Create(courbes[2]), FadeIn(etiq[2])]}, rt=0.45)
        beton = ra.beton(1)
        self.ligne([("Sous la rampe,", WHITE, "Sous la rampe"), ("il faut couler du béton.", TERME, "il faut couler")],
                   -1.75, x=x0, fs=38, larg=L, avec_k={1: [FadeIn(beton)]}, rt=0.5)
        fin = self.ligne([("Quel profil en demande le moins ?", JAUNE_TITRE, "Quel profil")], -2.5, x=x0, fs=40,
                         larg=L)
        self.play(Indicate(fin, color=JAUNE_TITRE, scale_factor=1.06), run_time=0.5)
        self.attendre_voix(marge=0.6)

    # ── 02 : l'aire sous la courbe : Iₙ = ∫₀¹ xⁿ dx ────────────────────────

    def ecran_aire(self):
        self.nouvel_ecran("02-aire")
        self.titre("L'aire sous la courbe", JAUNE_TITRE, 46, extrait="Le béton")
        x0, L = -6.2, 6.6
        ra = Rampe(P(1.6, -2.1), P(4.3, 0.9), nombres=True)
        self.ligne([("Le béton, c'est l'aire", TERME, "c'est l'aire")], 2.2, x=x0, fs=40, larg=L,
                   avec_k={0: self.socle(ra)}, rt=0.5)
        self.ligne([("sous la courbe,", WHITE, "sous la courbe"), ("entre 0", RAISON, "entre 0"),
                    ("et 1.", RAISON, "et 1")], 1.5, x=x0, fs=40, larg=L)
        self.lmaths([("t", [("Iₙ =", TERME, "I indice n"), ("∫₀¹", WHITE, "l'intégrale"),
                            ("xⁿ", WHITE, "x puissance n"), ("dx", GREY_A, "d x")])], 0.4, x=x0, fs=50)
        profils = VGroup(*[ra.profil(n, GREY_A, 4.5) for n in (1, 2, 3)])
        n_t = ValueTracker(1.0)
        beton = always_redraw(lambda: ra.beton(n_t.get_value()))
        self.ligne([("Les trois profils se superposent :", WHITE, "Regarde les trois")], -0.7, x=x0, fs=38, larg=L,
                   avec_k={0: [LaggedStart(*[Create(c) for c in profils], lag_ratio=0.25)]}, rt=0.8)
        self.ligne([("plus", WHITE, "plus n est grand"), ("n", RAISON, None), ("est grand,", WHITE, None)], -1.45,
                   x=x0, fs=38, larg=L, avec_k={0: [FadeIn(beton)]})
        self.ligne([("plus la courbe reste collée au sol,", WHITE, "plus la courbe reste")], -2.2, x=x0, fs=38, larg=L,
                   avec=[n_t.animate.set_value(3.0)], rt=1.2)
        fin = self.ligne([("plus l'aire sous elle", TERME, "plus l'aire sous elle"),
                          ("est petite.", JUSTE, "est petite")], -2.95, x=x0, fs=38, larg=L)
        self.play(FadeIn(self.encadre(fin, JUSTE, 0.16)), Indicate(beton, color=TERME, scale_factor=1.05),
                  run_time=0.5)
        self.attendre_voix(marge=0.6)
        beton.clear_updaters()

    # ── 03 : le calcul : la primitive, puis 1/2, 1/3, 1/4 ──────────────────

    def ecran_calcul(self):
        self.nouvel_ecran("03-calcul")
        self.titre("On calcule", JAUNE_TITRE, 46, extrait="On calcule")
        x0 = -6.2
        ra = Rampe(P(2.0, -1.9), P(4.4, 0.5), nombres=True)
        profils = VGroup(*[ra.profil(n, GREY_A, 4) for n in (1, 2, 3)])
        self.lmaths([("t", [("Une primitive de", WHITE, "Une primitive"), ("xⁿ", TERME, "x puissance n"),
                            ("est", WHITE, "est")]),
                     ("f", [("xⁿ⁺¹", WHITE, "x puissance n plus 1")], [("n + 1", WHITE, "divisé par n plus 1")])],
                    2.25, x=x0, fs=44, avec_k={0: self.socle(ra, [LaggedStart(*[Create(c) for c in profils],
                                                                              lag_ratio=0.2)])}, rt=0.6)
        g = self.lmaths([("t", [("donc", GREY_A, "Donc"), ("Iₙ =", TERME, "I indice n")]),
                         ("f", [("1", JUSTE, "égale 1")], [("n + 1", JUSTE, "divisé par n plus 1")])],
                        0.95, x=x0, fs=48)
        self.play(FadeIn(self.encadre(g, JUSTE, 0.16)), run_time=0.3)
        betons = [ra.beton(n, TERME, 0.16 + 0.1 * n, 13 + 2 * n) for n in (1, 2, 3)]
        for k, (lettre, num, den) in enumerate((("I₁ =", "1", "2"), ("I₂ =", "1", "3"), ("I₃ =", "1", "4"))):
            self.lmaths([("t", [(lettre, TERME, f"I indice {k + 1}")]),
                         ("f", [(num, WHITE, "égale 1")], [(den, WHITE, f"par {den}")])],
                        -0.7 - 1.08 * k, x=x0, fs=38, ecart=0.07,
                        avec_k={1: [FadeIn(betons[k])]}, rt=0.45)
        self.play(Indicate(betons[2], color=TERME, scale_factor=1.06), run_time=0.5)
        self.attendre_voix(marge=0.6)

    # ── 04 : question-pause n° 1 → A (I₄ = 1/5) ────────────────────────────

    def ecran_question1(self):
        g = self.construire([("Combien vaut", WHITE, "Combien vaut"), ("I₄ ?", TERME, "I indice 4")], 44)
        choix = [self.choix_maths([("f", [("1", WHITE, "1")], [(d, WHITE, d)])], 40) for d in ("5", "3", "4")]
        q = self.question_lignes("04-question", [g], choix, 0, fs=40)
        self.dire("04b-reponse")
        ok = self.q_reponse(q, 0)
        self.play(FadeOut(q.tete), FadeOut(q.cartes[1]), FadeOut(q.cartes[2]), FadeOut(g),
                  VGroup(q.cartes[0], ok).animate.move_to(P(0, 2.75)), run_time=0.35)
        x0 = -6.2
        ra = Rampe(P(1.9, -2.1), P(4.4, 0.4), nombres=True)
        courbe = ra.profil(4, GREY_A, 4.5)
        beton = ra.beton(4)
        self.lmaths([("t", [("Iₙ =", TERME, "I indice n")]),
                     ("f", [("1", WHITE, "égale 1")], [("n + 1", WHITE, "divisé par n plus 1")])],
                    0.75, x=x0, fs=48, avec_k={0: self.socle(ra, [Create(courbe)])}, rt=0.5)
        fin = self.lmaths([("t", [("donc", GREY_A, "donc"), ("I₄ =", TERME, "I indice 4")]),
                           ("f", [("1", JUSTE, "égale 1")], [("5", JUSTE, "par 5")])], -1.4, x=x0, fs=52,
                          avec_k={2: [FadeIn(beton)]}, rt=0.5)
        self.play(FadeIn(self.encadre(fin, JUSTE, 0.18)), Indicate(beton, color=TERME, scale_factor=1.06),
                  run_time=0.45)
        self.attendre_voix(marge=0.6)

    # ── 05 : les variations : xⁿ⁺¹ ≤ xⁿ sur [0 ; 1], donc Iₙ₊₁ ≤ Iₙ ────────

    def ecran_variations(self):
        self.nouvel_ecran("05-variations")
        self.titre("Les variations, sans calculer", JAUNE_TITRE, 46, extrait="Les variations")
        x0, L = -6.2, 6.6
        ra = Rampe(P(1.7, -2.0), P(4.4, 1.0), nombres=True)
        seg = Line(ra.G(0, 0), ra.G(1, 0), stroke_color=RAISON, stroke_width=8)
        haut, bas = ra.profil(2, GREY_A, 4.5), ra.profil(3, GREY_A, 4.5)
        e_h = self.etiquette(ra, 2, "xⁿ", 0.55, cote=UL, couleur=WHITE)
        e_b = self.etiquette(ra, 3, "xⁿ⁺¹", 0.85, cote=DR, buff=0.1, couleur=WHITE)
        tr = ra.tranche(2)
        beton = ra.beton(3)
        self.ligne([("Sur l'intervalle", WHITE, "Sur l'intervalle"), ("[0 ; 1] :", RAISON, "0 ; 1")], 2.2, x=x0,
                   fs=40, larg=L, avec_k={0: self.socle(ra)}, rt=0.5)
        self.ligne([("0 ≤ x ≤ 1", WHITE, "compris entre 0 et 1")], 1.5, x=x0, fs=44, larg=L,
                   avec_k={0: [Create(seg)]})
        self.ligne([("donc", GREY_A, "donc"), ("xⁿ⁺¹", RAISON, "x puissance n plus 1"),
                    ("≤", WHITE, "est inférieur"), ("xⁿ", TERME, "à x puissance n")], 0.7, x=x0, fs=46, larg=L,
                   avec_k={1: [Create(bas), FadeIn(e_b)], 3: [Create(haut), FadeIn(e_h)]}, rt=0.5)
        self.ligne([("Une courbe en dessous de l'autre,", WHITE, "Une courbe")], -0.3, x=x0, fs=38, larg=L,
                   avec_k={0: [FadeIn(tr)]})
        self.ligne([("c'est une aire plus petite :", TERME, "c'est une aire")], -1.05, x=x0, fs=38, larg=L,
                   avec_k={0: [FadeIn(beton)]})
        fin = self.ligne([("Iₙ₊₁", RAISON, "I indice n plus 1"), ("≤", WHITE, "est inférieur"),
                          ("Iₙ", TERME, "à I indice n")], -1.95, x=x0, fs=50, larg=L)
        self.play(FadeIn(self.encadre(fin, JUSTE, 0.16)), Indicate(tr, color=RAISON, scale_factor=1.05),
                  run_time=0.45)
        self.ligne([("La suite est", WHITE, "La suite est"), ("décroissante.", JUSTE, "décroissante")], -2.95, x=x0,
                   fs=44, larg=L)
        self.attendre_voix(marge=0.6)

    # ── 06 : le piège : hors de [0 ; 1], l'inégalité s'inverse ─────────────

    def cas_piege(self, centre, couleur, vmax, depart, arrivee, nb=None):
        """Une carte « un cas » : la droite graduée, le point de départ (bleu)
        et la flèche orange qui va vers le carré."""
        carte = self.carte(5.2, 1.85, centre, couleur)
        y = centre[1] - 0.45
        r = regle_graduee(centre[0] - 2.1, centre[0] + 1.8, y, vmax, 24, nb)
        extra = VGroup(*[Line(P(r.X(v), y - 0.07), P(r.X(v), y + 0.07), stroke_width=2, color=GREY_B)
                         for v in ((0.25, 0.5) if vmax == 1 else ())])
        pt = Dot(P(r.X(depart), y), radius=0.085, color=TERME)
        fl = Arrow(P(r.X(depart), y + 0.3), P(r.X(arrivee), y + 0.3), buff=0, color=RAISON, stroke_width=5,
                   tip_length=0.18)
        return carte, VGroup(r, extra), VGroup(pt, fl)

    def ecran_piege(self):
        self.nouvel_ecran("06-piege")
        tit = self.t("Voilà le piège !", 46, PIEGE).move_to(P(0, 3.15))
        self.au_mot("piège")
        self.play(FadeIn(tit, scale=1.3), run_time=0.35)
        x0, L = -6.2, 6.0
        c1, r1, m1 = self.cas_piege(P(3.6, 1.45), PIEGE, 4, 2, 4)
        c2, r2, m2 = self.cas_piege(P(3.6, -0.75), JUSTE, 1, 0.5, 0.25, nb=(0, 1))
        self.ligne([("Ailleurs,", WHITE, "Ailleurs")], 2.25, x=x0, fs=40, larg=L)
        self.ligne([("xⁿ⁺¹ >", PIEGE, "x puissance n plus 1"), ("xⁿ", PIEGE, "que x puissance n")], 1.5, x=x0, fs=46,
                   larg=L, avec_k={0: [FadeIn(c1), FadeIn(r1)]}, rt=0.4)
        self.ligne([("2²", PIEGE, "2 au carré"), ("= 4", PIEGE, "égale 4"), (">", WHITE, "c'est plus"),
                    ("2", PIEGE, "que 2")], 1.95, x=1.45, fs=38, larg=4.4,
                   avec_k={1: [FadeIn(m1[0], scale=1.4)], 3: [GrowArrow(m1[1])]}, rt=0.4)
        self.ligne([("Mais ici,", WHITE, "Mais ici"), ("entre 0 et 1,", RAISON, "entre 0 et 1")], 0.5, x=x0, fs=40,
                   larg=L, avec_k={1: [FadeIn(c2), FadeIn(r2)]}, rt=0.4)
        self.ligne([("tout s'inverse.", JAUNE_TITRE, "tout s'inverse")], -0.2, x=x0, fs=44, larg=L)
        self.ligne([("0,5²", JUSTE, "0,5 au carré"), ("= 0,25", JUSTE, "égale 0,25"), ("<", WHITE, "c'est MOINS"),
                    ("0,5", JUSTE, "que 0,5")], -0.25, x=1.45, fs=38, larg=4.4,
                   avec_k={1: [FadeIn(m2[0], scale=1.4)], 3: [GrowArrow(m2[1])]}, rt=0.4)
        self.ligne([("Le sens de variation se joue", WHITE, "Le sens de variation")], -2.35, x=x0, fs=40, larg=10.0)
        fin = self.ligne([("sur l'intervalle,", JAUNE_TITRE, "sur l'intervalle"),
                          ("jamais sur l'habitude.", WHITE, "jamais")], -3.05, x=x0, fs=40, larg=10.0)
        self.insister(fin, 1.06)
        self.attendre_voix(marge=0.6)

    # ── 07 : la limite : le nuage descend vers 0, la rampe devient un mur ──

    def ecran_limite(self):
        self.nouvel_ecran("07-limite")
        self.titre("La limite", JAUNE_TITRE, 46, extrait="La limite")
        x0, L = -6.2, 6.4
        nu = NuageTermes((0, 13.0), (-0.08, 0.62), P(1.7, -0.1), P(4.4, 2.2), nom_u="Iₙ", fs=24)
        for n in (5, 10):
            nu.add(nu.graduation_n(n, str(n), 22))
        pts = self.points_nuage(nu, lambda n: I[n], range(1, 13))
        zero = self.t("0", 28, JUSTE, 1e9).next_to(nu.G(0, 0), LEFT, buff=0.15)
        bas = Arrow(nu.G(12.4, 0.26), nu.G(12.4, 0.035), buff=0, color=JUSTE, stroke_width=5, tip_length=0.16)
        le_mur = mur(1.0).move_to(P(3.1, -1.95))
        croix = self.barrer(le_mur[3], PIEGE, 0.06)
        self.lmaths([("t", [("Iₙ =", TERME, "I indice n")]),
                     ("f", [("1", WHITE, "égale 1")], [("n + 1", WHITE, "divisé par n plus 1")])], 2.3, x=x0, fs=46,
                    avec_k={0: self.axes(nu, [FadeIn(g) for g in nu[4:]])}, rt=0.5)
        self.ligne([("n + 1", RAISON, "et n plus 1"), ("→ +∞", RAISON, "tend vers plus l'infini")], 1.2, x=x0, fs=46,
                   larg=L, avec_k={1: [LaggedStart(*[GrowFromCenter(d) for d in pts], lag_ratio=0.1)]}, rt=1.0)
        bl = self.bloc_lim("Iₙ", "0", 48).move_to(P(0, 0.1))
        bl.align_to(P(x0, 0), LEFT)
        self.au_mot("quand n tend")
        self.play(FadeIn(bl[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("0")          # le MOT « 0 » (et pas « est ») : 0 s d'avance sur le nombre
        self.play(FadeIn(bl.droite, shift=RIGHT * 0.15), FadeIn(zero, scale=1.4), GrowArrow(bas),
                  nu.ax_n.animate.set_color(JUSTE), run_time=0.5)
        self.play(FadeIn(self.encadre(bl, JUSTE, 0.18)), run_time=0.3)
        # quatre lignes courtes : aucune n'est rétrécie, toutes à la même taille
        self.ligne([("Le béton devient aussi petit", TERME, "on rend le béton")], -1.15, x=x0, fs=38, larg=L)
        self.ligne([("qu'on veut,", WHITE, "qu'on veut")], -1.8, x=x0, fs=38, larg=L)
        self.ligne([("mais la rampe devient un mur,", PIEGE, "mais la rampe")], -2.45, x=x0, fs=38, larg=L,
                   avec_k={0: [FadeIn(le_mur, shift=UP * 0.15)]}, rt=0.5)
        self.ligne([("et plus personne ne la descend.", WHITE, "plus personne")], -3.1, x=x0, fs=38, larg=L,
                   avec_k={0: [Create(croix)]}, rt=0.5)
        self.attendre_voix(marge=0.6)

    # ── 08 : question-pause n° 2 → C (sur [0 ; 1], xⁿ⁺¹ ≤ xⁿ) ──────────────

    def ecran_question2(self):
        g = self.construire([("Pourquoi la suite", WHITE, "Pourquoi la suite"), ("Iₙ", TERME, "I indice n"),
                             ("est-elle décroissante ?", WHITE, "est-elle")], 42)
        choix = [self.choix_lignes([[("l'aire devient", "l'aire devient")], [("négative", "négative")]], 34),
                 self.choix_lignes([[("1/(n + 1) est une somme", "1 divisé")], [("de n termes", "de n termes")]], 34),
                 self.choix_lignes([[("sur [0 ; 1],", "sur l'intervalle 0 ; 1")],
                                    [("xⁿ⁺¹ ≤ xⁿ", "x puissance n plus 1")]], 34)]
        q = self.question_lignes("08-question", [g], choix, 2, fs=36)
        self.dire("08b-reponse")
        ok = self.q_reponse(q, 2)
        self.play(FadeOut(q.tete), FadeOut(q.cartes[0]), FadeOut(q.cartes[1]), FadeOut(g),
                  VGroup(q.cartes[2], ok).animate.move_to(P(0, 2.75)), run_time=0.35)
        x0, L = -6.2, 6.6
        ra = Rampe(P(2.2, -2.0), P(4.4, 0.4), nombres=True)
        haut, bas = ra.profil(2, GREY_A, 4.5), ra.profil(3, GREY_A, 4.5)
        tr, beton = ra.tranche(2), ra.beton(3)
        self.ligne([("On compare les deux fonctions", WHITE, "On compare")], 0.85, x=x0, fs=40, larg=L,
                   avec_k={0: self.socle(ra, [Create(haut), Create(bas)])}, rt=0.6)
        self.ligne([("sur l'intervalle,", RAISON, "sur l'intervalle")], 0.1, x=x0, fs=40, larg=L,
                   avec_k={0: [FadeIn(tr)]})
        self.ligne([("puis on intègre l'inégalité.", WHITE, "puis on intègre")], -0.65, x=x0, fs=40, larg=L,
                   avec_k={0: [FadeIn(beton)]})
        fin = self.ligne([("Intégrer conserve l'ordre.", JUSTE, "intégrer conserve")], -1.85, x=x0, fs=44, larg=L)
        self.play(FadeIn(self.encadre(fin, JUSTE, 0.16)), Indicate(beton, color=TERME, scale_factor=1.06),
                  run_time=0.45)
        self.attendre_voix(marge=0.6)

    # ── 09 : au bac, ce qui ne se calcule pas : une relation de récurrence ──

    def ecran_pourquoi(self):
        self.nouvel_ecran("09-pourquoi")
        self.titre("Quand ça ne se calcule pas", JAUNE_TITRE, 46, extrait="Au bac")
        lg = LigneTermes(["J₀", "J₁", "J₂", "J₃"], centre=P(0, -2.9), pas=1.75, largeur=1.3, hauteur=0.8, fs=38)
        fl = VGroup(*[Arrow(lg.cases[i][0].get_right(), lg.cases[i + 1][0].get_left(), buff=0.07, color=RAISON,
                            stroke_width=4, tip_length=0.15) for i in range(3)])
        self.ligne([("Au bac, on te donne souvent", WHITE, "on te donne")], 2.3, fs=40)
        self.ligne([("une suite d'intégrales", TERME, "une suite d'intégrales"),
                    ("qu'on ne sait", WHITE, "qu'on ne sait"), ("PAS", PIEGE, "PAS"),
                    ("calculer.", WHITE, "calculer")], 1.6, fs=40)
        self.ligne([("On cherche une", WHITE, "On cherche alors"),
                    ("relation de récurrence :", JAUNE_TITRE, "une relation")], 0.8, fs=42)
        self.ligne([("une égalité qui donne un terme", WHITE, "une égalité")], 0.05, fs=40,
                   avec_k={0: [LaggedStart(*[FadeIn(c, scale=0.85) for c in lg.cases], lag_ratio=0.15)]}, rt=0.7)
        self.ligne([("à partir du précédent.", WHITE, "à partir")], -0.65, fs=40,
                   avec_k={0: [LaggedStart(*[GrowArrow(a) for a in fl], lag_ratio=0.2)]}, rt=0.8)
        g = self.lmaths([("t", [("Jₙ =", TERME, "J indice n"), ("∫₀¹", WHITE, "l'intégrale"),
                                ("xⁿ eˣ", WHITE, "x puissance n"), ("dx", GREY_A, "d x")])], -1.65, fs=54)
        self.play(FadeIn(self.encadre(g, TERME, 0.18)), run_time=0.3)
        self.attendre_voix(marge=0.6)

    # ── 10 : l'intégration par parties, LIGNE À LIGNE ──────────────────────

    def ecran_ipp(self):
        self.nouvel_ecran("10-ipp")
        self.titre("Une intégration par parties", JAUNE_TITRE, 46, extrait="On intègre par parties")
        x0, L = -6.4, 7.5
        rec = self.carte(5.1, 1.05, P(3.8, 2.3), GREY_B)
        fr = self.t("∫ u v′ = [u v] − ∫ u′ v", 36, WHITE, 4.7, audit=False).move_to(rec)
        ra = Rampe(P(2.3, -2.2), P(4.3, 0.8), ymax=math.e)
        f = lambda x: x ** 2 * math.exp(x)  # noqa: E731  l'allure de xⁿ eˣ sur [0 ; 1]
        cb, air = ra.courbe(f, GREY_A, 4.5), ra.aire(f)
        lab = self.t("Jₙ", 32, TERME, 1e9, audit=False).move_to(ra.G(0.72, 0.55))
        self.play(FadeIn(rec), FadeIn(fr), run_time=0.4)
        self.lmaths([("t", [("Jₙ₊₁ =", TERME, "le terme de rang"), ("∫₀¹", WHITE, None), ("xⁿ⁺¹ eˣ", WHITE, None),
                            ("dx", GREY_A, None)])], 2.25, x=x0, fs=44,
                    avec_k={0: self.socle(ra, [Create(cb)])}, rt=0.5)
        self.ligne([("on pose", GREY_A, "On pose"), ("u(x) =", RAISON, "u de x"),
                    ("xⁿ⁺¹", RAISON, "égale x puissance n plus 1")], 1.45, x=x0, fs=42, larg=L)
        self.ligne([("et", GREY_A, "et v prime"), ("v′(x) =", RAISON, "de x"),
                    ("eˣ", RAISON, "égale e puissance x")], 0.7, x=x0, fs=42, larg=L)
        self.ligne([("[xⁿ⁺¹ eˣ]₀¹ =", WHITE, "Le crochet"), ("e", JUSTE, "vaut e")], -0.1, x=x0, fs=42, larg=L)
        self.ligne([("−", WHITE, "Et dans l'intégrale"), ("∫₀¹ (n + 1) xⁿ eˣ dx", WHITE, "qui reste")], -0.9, x=x0,
                   fs=42, larg=L, avec_k={1: [FadeIn(air)]}, rt=0.5)
        self.ligne([("= −", GREY_A, "on reconnaît"), ("(n + 1)", RAISON, "multiplié par n plus 1"),
                    ("Jₙ", TERME, None)], -1.7, x=x0, fs=42, larg=L, avec_k={1: [FadeIn(lab, scale=1.4)]})
        fin = self.ligne([("Jₙ₊₁ =", TERME, "Résultat"), ("e − (n + 1)", JUSTE, "égale e moins"),
                          ("Jₙ", TERME, None)], -2.55, x=x0, fs=46, larg=L)
        self.play(FadeIn(self.encadre(fin, JUSTE, 0.14)), run_time=0.3)
        self.attendre_voix(marge=0.6)

    # ── 11 : le défi : J₂, puis la limite de Jₙ ────────────────────────────

    def ecran_defi(self):
        self.nouvel_ecran("11-defi")
        tit = self.titre("À toi de jouer !", JAUNE_TITRE, 48, extrait="À toi")
        x0, L = -6.2, 6.6
        lg = LigneTermes(["e − 1", "?", "?"], noms=["J₀", "J₁", "J₂"], centre=P(3.3, 1.3), pas=1.62, largeur=1.36,
                         hauteur=0.86, fs=34, fs_noms=28)
        fl = VGroup(*[Arrow(lg.cases[i][0].get_right(), lg.cases[i + 1][0].get_left(), buff=0.07, color=RAISON,
                            stroke_width=4, tip_length=0.15) for i in range(2)])
        vers = Arrow(lg.cases[2][0].get_bottom() + DOWN * 0.8, lg.cases[2][0].get_bottom() + DOWN * 1.5, buff=0,
                     color=JUSTE, stroke_width=5, tip_length=0.18)
        qm = self.t("?", 72, JUSTE, 1e9, audit=False).next_to(vers, DOWN, buff=0.12)
        self.ligne([("On garde", WHITE, "On garde"), ("Jₙ = ∫₀¹ xⁿ eˣ dx,", TERME, "J indice n")], 2.2, x=x0, fs=40,
                   larg=L)
        self.ligne([("Jₙ₊₁ =", TERME, "avec J indice n plus 1"), ("e − (n + 1)", RAISON, "égale e moins"),
                    ("Jₙ", TERME, None)], 1.3, x=x0, fs=44, larg=L)
        self.ligne([("J₀ =", TERME, "et J indice 0"), ("e −", RAISON, "égale e moins"), ("1", RAISON, "1")], 0.4,
                   x=x0, fs=44, larg=L,
                   avec_k={2: [FadeIn(lg.cases[0], scale=0.85), FadeIn(lg.noms[0], shift=UP * 0.08)]}, rt=0.45)
        self.ligne([("Première étape :", JAUNE_TITRE, "Première étape"), ("calcule", WHITE, "calcule"),
                    ("J₂.", TERME, "J indice 2")], -0.55, x=x0, fs=42, larg=L,
                   avec_k={2: [LaggedStart(*[FadeIn(VGroup(lg.cases[i], lg.noms[i]), scale=0.85) for i in (1, 2)],
                                           lag_ratio=0.2), LaggedStart(*[GrowArrow(a) for a in fl], lag_ratio=0.2)]},
                   rt=0.7)
        self.ligne([("Deuxième étape :", JAUNE_TITRE, "Deuxième étape")], -1.35, x=x0, fs=42, larg=L)
        self.ligne([("vers quoi tend", WHITE, "vers quoi tend"), ("Jₙ ?", TERME, "J indice n ?")], -2.1, x=x0, fs=42,
                   larg=L, avec_k={1: [GrowArrow(vers), FadeIn(qm, scale=0.6)]}, rt=0.6)
        self.defi_pause(-3.0, x=-1.6)
        self._defi = tit

    def ecran_correction(self):
        self.dire("11b-correction")
        tit = self._defi
        self.au_mot("Correction")
        cor = self.t("Correction", 46, JUSTE).move_to(tit)
        autres = [m for m in self.mobjects if m is not tit and m is not self._margo]
        for m in autres:
            m.clear_updaters()
        self.play(*[FadeOut(m) for m in autres], ReplacementTransform(tit, cor), run_time=0.4)
        self.remove(*autres)
        x0, L = -6.2, 6.8
        lg = LigneTermes(["e − 1", "1", "e − 2"], noms=["J₀", "J₁", "J₂"], centre=P(3.3, 1.3), pas=1.7, largeur=1.45,
                         hauteur=0.86, fs=34, fs_noms=28)
        fl = VGroup(*[Arrow(lg.cases[i][0].get_right(), lg.cases[i + 1][0].get_left(), buff=0.07, color=RAISON,
                            stroke_width=4, tip_length=0.15) for i in range(2)])
        self.ligne([("Pour n = 0 :", GREY_A, "Pour n égale 0"), ("J₁ =", TERME, "J indice 1"),
                    ("e −", RAISON, "égale e moins"), ("J₀", TERME, "J indice 0")], 2.3, x=x0, fs=42, larg=L,
                   rt=0.45)
        self.ligne([("Comme", GREY_A, "Comme"), ("J₀ =", RAISON, "J indice 0"), ("e −", RAISON, "égale e moins"),
                    ("1,", RAISON, "1")], 1.45, x=x0, fs=42, larg=L,
                   avec_k={3: [FadeIn(lg.cases[0], scale=0.85), FadeIn(lg.noms[0], shift=UP * 0.08)]}, rt=0.45)
        self.ligne([("on trouve", GREY_A, "on trouve"), ("J₁ =", JUSTE, "J indice 1 égale"), ("1.", JUSTE, "1")], 0.6,
                   x=x0, fs=44, larg=L,
                   avec_k={2: [FadeIn(lg.cases[1], scale=0.85), FadeIn(lg.noms[1], shift=UP * 0.08),
                               GrowArrow(fl[0])]}, rt=0.5)
        self.ligne([("Pour n = 1 :", GREY_A, "Pour n égale 1"), ("J₂ =", TERME, "J indice 2"),
                    ("e − 2 ×", RAISON, "égale e moins 2"), ("J₁", TERME, "fois J indice 1")], -0.3, x=x0, fs=42,
                   larg=L)
        f1 = self.ligne([("= e −", JUSTE, "c'est-à-dire e moins"), ("2", JUSTE, "2"),
                         ("≈ 0,72", JUSTE, "environ 0,72")], -1.25, x=x0, fs=44, larg=L,
                        avec_k={1: [FadeIn(lg.cases[2], scale=0.85), FadeIn(lg.noms[2], shift=UP * 0.08),
                                    GrowArrow(fl[1])]}, rt=0.5)
        self.play(FadeIn(self.encadre(f1, JUSTE, 0.16)), run_time=0.3)
        # ── la limite : l'encadrement 0 ≤ Jₙ ≤ e/(n + 1) ──
        self.au_mot("Pour la limite")
        vieux = [m for m in self.mobjects if m is not cor and m is not self._margo]
        self.play(*[FadeOut(m) for m in vieux], run_time=0.3)
        self.remove(*vieux)
        nu = NuageTermes((0, 13.0), (-0.3, 2.1), P(1.9, -2.2), P(4.4, 1.6), nom_u="Jₙ", fs=24)
        for n in (5, 10):
            nu.add(nu.graduation_n(n, str(n), 22))
        borne = ParametricFunction(lambda t: nu.G(t, math.e / (t + 1)), t_range=[math.e / 2.1 - 1, 12.6, 0.02],
                                   color=RAISON, stroke_width=4.5)      # part du HAUT du repère, sans déborder
        pts = self.points_nuage(nu, lambda n: JP[n], range(1, 13))
        self.ligne([("Sur [0 ; 1] :", RAISON, "sur l'intervalle 0 ; 1"), ("eˣ ≤ e,", WHITE, "e puissance x")], 2.3,
                   x=x0, fs=44, larg=L, avec_k={0: self.axes(nu, [FadeIn(g) for g in nu[4:]])}, rt=0.5)
        self.lmaths([("t", [("donc", GREY_A, "donc"), ("0 ≤", RAISON, "0 est inférieur"),
                            ("Jₙ", TERME, "à J indice n"), ("≤", WHITE, "lui-même inférieur")]),
                     ("f", [("e", RAISON, "à e")], [("n + 1", RAISON, "divisé par n plus 1")])], 1.1, x=x0, fs=48,
                    avec_k={4: [Create(borne)], 5: [LaggedStart(*[GrowFromCenter(d) for d in pts], lag_ratio=0.09)]},
                    rt=0.9)
        self.ligne([("Les deux bornes", RAISON, "Les deux bornes"), ("→ 0 :", JUSTE, "tendent vers 0")], -0.4, x=x0,
                   fs=44, larg=L, avec_k={1: [nu.ax_n.animate.set_color(JUSTE)]})
        bl = self.bloc_lim("Jₙ", "0", 50).move_to(P(0, -1.65))
        bl.align_to(P(x0, 0), LEFT)
        self.au_mot("la limite de J indice n")
        self.play(FadeIn(bl[0], shift=UP * 0.1), run_time=0.35)
        self.suivre("0")          # le MOT « 0 » de « est 0 » : 0 s d'avance sur le nombre
        self.play(FadeIn(bl.droite, shift=RIGHT * 0.15), run_time=0.35)
        self.play(FadeIn(self.encadre(bl, JUSTE, 0.18)), run_time=0.3)
        self.attendre_voix(marge=0.6)

    # ── 12 : ce que tu as appris ───────────────────────────────────────────

    def ecran_appris(self):
        def base(l):
            """La ligne de base : le bas d'une lettre sans jambage (a, e, n, o…), sinon le bas de la ligne."""
            gl = [m for morceau in l for m in morceau]
            car = glyphes(" ".join(l.textes))
            k = next((i for i, c in enumerate(car) if c in "acemnorsuvwxz0123456789"), None)
            return gl[k].get_bottom()[1] if k is not None else l.get_bottom()[1]
        J_ = JAUNE_TITRE
        points = [[[("Une suite d'intégrales s'étudie", WHITE, "Une suite d'intégrales")],
                   [("le plus souvent", WHITE, "le plus souvent"), ("SANS la calculer.", J_, "SANS")]],
                  [[("Variations :", J_, "Pour les variations"), ("on compare les fonctions", WHITE, "on compare")],
                   [("sur l'intervalle,", WHITE, "sur l'intervalle"),
                    ("puis on intègre l'inégalité.", WHITE, "puis on intègre")]],
                  [[("Limite :", J_, "Pour la limite"), ("on encadre.", WHITE, "on encadre")]],
                  [[("Rien ne se calcule ?", WHITE, "quand rien ne se calcule"),
                    ("Une intégration", WHITE, "une intégration")],
                   [("par parties donne une", WHITE, "par parties"),
                    ("relation de récurrence.", JUSTE, "une relation de récurrence")]]]
        self.nouvel_ecran("12-finale", margo=0.65)
        self.au_mot("Ce que tu as appris")
        tit = self.t("Ce que tu as appris", 46, J_).to_edge(UP, buff=0.45)
        self.play(Write(tit), run_time=0.7)
        blocs = []
        for pt in points:
            lignes = VGroup(*[self.construire(l, 40, 1e9) for l in pt]).arrange(DOWN, aligned_edge=LEFT, buff=0.14)
            for k, l in enumerate(lignes):      # même pas entre les lignes de base
                if k:
                    l.shift(UP * (base(lignes[0]) - 0.58 * k - base(l)))
            blocs.append(VGroup(self.coche(), lignes).arrange(RIGHT, buff=0.3, aligned_edge=UP))
        tout = VGroup(*blocs).arrange(DOWN, aligned_edge=LEFT, buff=0.38)
        if tout.width > 10.4:
            tout.scale_to_fit_width(10.4)
        if tout.height > 5.9:
            tout.scale_to_fit_height(5.9)
        tout.move_to(P(-0.8, -0.5))        # 0,15 d'air à gauche de Ti-Margo (BORDS=1 : MARGO)
        for bloc in blocs:
            for k, l in enumerate(bloc[1]):
                self.montrer(l, rt=0.3, avec_k={0: [Create(bloc[0])]} if k == 0 else None)
        self.attendre_voix(marge=0.8)

    def construct(self):
        ecrans = [self.ecran_garde, self.ecran_situation, self.ecran_aire, self.ecran_calcul, self.ecran_question1,
                  self.ecran_variations, self.ecran_piege, self.ecran_limite, self.ecran_question2,
                  self.ecran_pourquoi, self.ecran_ipp, self.ecran_defi, self.ecran_correction, self.ecran_appris,
                  lambda: self.fin("13-abonne")]
        choix = os.environ.get("ECRANS")          # contrôle rapide : ECRANS=5,6 (jamais au rendu final)
        for k, e in enumerate(ecrans):
            if not choix or str(k) in choix.split(",") or (e == self.ecran_correction and "11" in choix.split(",")):
                e()
