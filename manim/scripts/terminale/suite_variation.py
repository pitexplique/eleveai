# suite_variation.py
# EleveAI — Maths Terminale (spé) — paysage « Sens de variation d'une suite »
# (16:9), ceinture VERTE. Série SUITES du lycée, épisode 30.
# Micro du coach : suite_variation (notion suite_numerique) :
# lib/tutor-v4/questionBank/terminale-spe/maths/suites.bank.ts + suites-renfort.ts.
#
# Ce que demande le coach → écran :
#   · signe de uₙ₊₁ − uₙ : ≥ 0 croissante, ≤ 0 décroissante (fixed_1, fixed_2,
#     h1, h2, varDiff)                                            → 02-difference ;
#   · formule explicite (varExpl : 800 × 0,97ⁿ)                   → 03-glacier ;
#   · uₙ₊₁ − uₙ = 2n + 5 (varDiff, h3)                            → 04-question (A) ;
#   · termes positifs : uₙ₊₁ / uₙ comparé à 1 (varQuotient)        → 05-quotient ;
#   · géométrique : q ET le signe de u₀ (varGeo, h5)               → 06-piege ;
#   · q < 0 : ni croissante ni décroissante (varGeo, NIM)          → 07-question (B) ;
#   · monotone à partir d'un rang (varRang : n² − 6n)              → 08 défi + correction ;
#   · lecture d'un nuage (varNuage) : chaque écran a son nuage de points et la
#     bande des écarts uₙ₊₁ − uₙ (barres orange au-dessus ou au-dessous de 0).
# Clé de voix → écran :
#   00-garde (un nuage qui monte « + », un nuage qui descend « − ») · 01 Nadia,
#   glaciologue : le glacier des Alpes, 800 millions de m³, − 3 % par an, le
#   rapport « sans exception » · 02 la méthode : signe de uₙ₊₁ − uₙ, deux nuages
#   et leurs barres d'écarts · 03 le glacier : uₙ = 800 × 0,97ⁿ, écart − 0,03 uₙ ·
#   04/04b question (A : croissante) · 05 le quotient comparé à 1 (la jauge,
#   0,97 < 1) · 06 le piège : u₀ = −5, q = 2 (− 5, − 10, − 20) · 07/07b question
#   (B : ni croissante ni décroissante : 3, − 6, 12) · 08/08b défi n² − 6n :
#   croissante à partir du rang 3 · 09 « Ce que tu as appris » · 10 fin.
# Code couleur (module commun) : bleu = termes, orange = écarts et raison,
# vert = juste (et le signe +), rouge = piège (et le signe −). ⛔ Pas de LaTeX.
# Voix : manim/voix/terminale-suite-variation.json (débit −6), calée mot à mot
# par suite_variation_marques.json.
# Contrôle : AUDIT=1 BORDS=1 python -m manim render --dry_run …
# python -m manim render -qh --disable_caching manim/scripts/terminale/suite_variation.py SuiteVariationTle -o eleveai-maths-terminale-suite-variation --media_dir manim/scripts/terminale/media-suite-variation
# Sortie : manim/sorties/terminale/maths/suites/30-variation/

import sys
from pathlib import Path

_ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(_ICI))
sys.path.insert(1, str(_ICI.parent / "premiere"))

from suites_commun import *  # noqa: E402,F403

# ── les affirmations de la voix, vérifiées ──────────────────────────────────
GLACIER = [800 * 0.97 ** n for n in range(9)]
for a, b in zip(GLACIER, GLACIER[1:]):
    assert abs((b - a) - (-0.03 * a)) < 1e-9 and b - a < 0          # écart −0,03 uₙ < 0
    assert abs(b / a - 0.97) < 1e-12                                  # quotient 0,97 < 1
assert all(2 * n + 5 > 0 for n in range(100))                         # question 1 : A
PIEGE_T = [-5 * 2 ** n for n in range(3)]
assert PIEGE_T == [-5, -10, -20]                                      # q = 2 > 1, et ça décroît
Q2 = [3 * (-2) ** n for n in range(3)]
assert Q2 == [3, -6, 12]                                              # question 2 : B
DEFI = [n * n - 6 * n for n in range(8)]
ECARTS_DEFI = [b - a for a, b in zip(DEFI, DEFI[1:])]
assert ECARTS_DEFI == [2 * n - 5 for n in range(7)]
assert DEFI[2:5] == [-8, -9, -8] and all(e > 0 for e in ECARTS_DEFI[3:]) and ECARTS_DEFI[2] < 0
MONTE = [1.0, 1.8, 2.9, 3.6, 4.8, 5.5]
DESCEND = [5.5, 4.6, 4.1, 2.9, 2.2, 1.0]

PEAU, PARKA, GLACE, ROCHE = "#c68642", "#DB2777", "#BAE6FD", "#64748b"


def nadia(s=1.0):
    """Nadia, glaciologue : parka rose, bonnet blanc, la perche de mesure."""
    tete = Circle(radius=0.3, fill_color=PEAU, fill_opacity=1, stroke_width=0).move_to(P(0, 1.05))
    bonnet = Sector(radius=0.33, start_angle=0, angle=PI, fill_color=WHITE, fill_opacity=1,
                    stroke_width=0).move_to(P(0, 1.3))
    pompon = Dot(P(0, 1.5), radius=0.08, color=WHITE)
    corps = RoundedRectangle(width=1.05, height=1.25, corner_radius=0.3, fill_color=PARKA, fill_opacity=1,
                             stroke_width=0).move_to(P(0, 0.12))
    bras = Line(P(0.32, 0.4), P(0.7, 0.55), stroke_color=PARKA, stroke_width=14)
    perche = Line(P(0.78, -0.55), P(0.78, 1.65), stroke_color=JAUNE_TITRE, stroke_width=6)
    traits = VGroup(*[Line(P(0.7, y), P(0.86, y), stroke_color=GREY_D, stroke_width=3)
                      for y in (-0.2, 0.3, 0.8, 1.3)])
    return VGroup(perche, traits, corps, bras, tete, bonnet, pompon).scale(s)


def montagne(s=1.0):
    """Le glacier : la montagne grise et sa calotte de glace (renvoyées à part)."""
    roche = Polygon(P(-2.0, -0.9), P(0.15, 1.9), P(2.1, -0.9), fill_color=ROCHE, fill_opacity=1, stroke_width=0)
    glace = Polygon(P(0.15, 1.9), P(-0.95, 0.48), P(-0.5, 0.62), P(-0.2, 0.4), P(0.2, 0.62), P(0.6, 0.38),
                    P(1.2, 0.55), fill_color=GLACE, fill_opacity=1, stroke_width=0)
    return VGroup(roche, glace).scale(s)


def signe(texte, couleur, r=0.32, fs=44):
    """Le signe qui s'allume : « + » (vert) ou « − » (rouge) dans un rond."""
    rond = Circle(radius=r, stroke_color=couleur, stroke_width=5, fill_color=FOND_CARTE, fill_opacity=1)
    return VGroup(rond, Text(texte, font_size=fs, color=couleur, weight=BOLD).move_to(rond))


def bande_ecarts(nu, ecarts, y0, k, debut=0, larg=0.22, couleur=RAISON):
    """La bande des écarts uₙ₊₁ − uₙ, juste sous le nuage : une ligne du 0 en
    pointillés, et pour chaque écart une barre orange (au-dessus si positif,
    au-dessous si négatif), entre le point n et le point n + 1."""
    x0, x1 = nu.G(nu.na, 0)[0], nu.G(nu.nb, 0)[0]
    zero = DashedLine(P(x0, y0), P(x1, y0), color=GREY_B, stroke_width=2, dash_length=0.08)
    barres = VGroup()
    for j, e in enumerate(ecarts):
        x = nu.G(debut + j + 0.5, 0)[0]
        h = max(abs(e) * k, 0.03)
        b = Rectangle(width=larg, height=h, fill_color=couleur, fill_opacity=1, stroke_width=0)
        b.move_to(P(x, y0 + (h / 2 if e > 0 else -h / 2)))
        barres.add(b)
    return zero, barres


def nuage_mini(nr, ur, bg, hd, valeurs, couleur=TERME, r=0.08, nom_u="uₙ"):
    nu = NuageTermes(nr, ur, bg, hd, nom_u=nom_u, fs=24)
    pts = [nu.point(k, v, couleur, r) for k, v in enumerate(valeurs)]
    return nu, pts


def tendance(nu, a, b, couleur):
    """La flèche de tendance, posée un peu au-dessus des points (a, b sont (n, u))."""
    return Arrow(nu.G(*a), nu.G(*b), buff=0, color=couleur, stroke_width=5, tip_length=0.2,
                 max_tip_length_to_length_ratio=0.15)


class SuiteVariationTle(PaysageSuites):
    fichier_marques = "suite_variation_marques.json"
    nom_voix = "terminale-suite-variation"
    identite = "Maths Tle — EleveAI"
    ceinture = "verte"
    largeur_bouton = 9.6
    place_coche = 1.1

    # ── petits outils de l'épisode (ceux de l'ép. 28) ─────────────────────

    def morceaux(self, pieces, fs=34, larg=None):
        """Une ligne coupée en morceaux (chacun son Text, placé EXACTEMENT là où il
        serait dans la ligne entière) : pour montrer chaque morceau à sa voix.
        pieces : [(texte, couleur) ou texte, …] ; les espaces comptent."""
        pieces = [(p, WHITE) if isinstance(p, str) else p for p in pieces]
        entier = Text("".join(p for p, _ in pieces), font_size=fs)
        g, k = VGroup(), 0
        for p, c in pieces:
            if not p.strip():
                continue
            m = Text(p.strip(), font_size=fs, color=c)
            n = len(m)    # glyphes réels : une ligature (« ffi », « fi ») en compte un seul
            m.move_to(VGroup(*entier[k:k + n]))
            g.add(m)
            k += n
        larg = larg or self.largeur_texte
        if g.width > larg:
            g.scale_to_fit_width(larg)
        return g

    def rayer(self, mob, couleur=PIEGE):
        """Barré d'UN trait fin, à mi-hauteur : le texte reste lisible dessous."""
        y = mob.get_center()[1]
        return Line(P(mob.get_left()[0] - 0.08, y), P(mob.get_right()[0] + 0.08, y)).set_stroke(couleur, 3.5)

    def devoiler(self, g, extraits, rt=0.3, avec=()):
        """Chaque morceau quand la voix dit son extrait (None : avec le précédent)."""
        paquet = []
        for m, ex in zip(g, extraits):
            if ex is not None and paquet:
                self.play(*[FadeIn(p, shift=UP * 0.08) for p in paquet], run_time=rt)
                paquet = []
            if ex is not None:
                self.suivre(ex)
            paquet.append(m)
        self.play(*[FadeIn(p, shift=UP * 0.08) for p in paquet], *avec, run_time=rt)
        return g

    def gauche(self, m, y, x=-6.25):
        return m.move_to(P(0, y)).align_to(P(x, 0), LEFT)

    def poser_nuage(self, nu, grads=(), fs=22, rt=0.4):
        for n in grads:
            nu.add(nu.graduation_n(n, str(n), fs))
        self.play(Create(nu.ax_n), Create(nu.ax_u), FadeIn(nu.lab_n), FadeIn(nu.lab_u),
                  *[FadeIn(g) for g in nu[4:]], run_time=rt)

    def poser_points(self, pts, rt=0.6, lag=0.3):
        self.play(LaggedStart(*[GrowFromCenter(d) for d in pts], lag_ratio=lag), run_time=rt)

    def poser_barres(self, zero, barres, rt=0.6):
        self.play(Create(zero), LaggedStart(*[GrowFromEdge(b, DOWN if b.get_center()[1] > zero.get_center()[1]
                                                           else UP) for b in barres], lag_ratio=0.25),
                  run_time=rt)

    def allumer_signe(self, sg):
        self.play(GrowFromCenter(sg), run_time=0.3)
        self.play(Flash(sg, color=sg[0].get_stroke_color(), line_length=0.15, num_lines=10), run_time=0.4)

    # ── 00 : la garde ──────────────────────────────────────────────────────

    def deux_nuages(self):
        """À gauche des points qui montent (+), à droite des points qui descendent (−)."""
        y0, y1 = -1.55, -0.5
        nm, pm = nuage_mini((0, 5.4), (0, 6), P(-5.0, y0), P(-2.2, y1), MONTE)
        nd, pd = nuage_mini((0, 5.4), (0, 6), P(1.6, y0), P(4.4, y1), DESCEND)
        sp, sm = signe("+", JUSTE, 0.28, 38).next_to(nm, LEFT, buff=0.3), signe("−", PIEGE, 0.28, 38).next_to(nd, LEFT,
                                                                                                         buff=0.3)
        self.play(*[Create(m) for m in (nm.ax_n, nm.ax_u, nd.ax_n, nd.ax_u)], run_time=0.3)
        for k in range(6):
            self.play(GrowFromCenter(pm[k]), GrowFromCenter(pd[k]), run_time=0.12)
        fm = tendance(nm, (0.2, 1.9), (5.2, 6.3), JUSTE)
        fd = tendance(nd, (0.2, 6.3), (5.2, 1.9), PIEGE)
        self.play(GrowArrow(fm), GrowArrow(fd), GrowFromCenter(sp), GrowFromCenter(sm), run_time=0.4)

    def ecran_garde(self):
        self.garde("Sens de variation",
                   [("d'une suite", "d'une suite", TERME),
                    ("Comment savoir, à coup sûr,", "Comment"),
                    ("si une suite monte ou descend ?", "si une suite")],
                   dessin=self.deux_nuages, extrait_titre="Sens de variation")

    # ── 01 : Nadia et le glacier ───────────────────────────────────────────

    def ecran_situation(self):
        self.nouvel_ecran("01-situation")
        perso = nadia(1.1).move_to(P(-4.9, 1.0))
        nom = self.t("Nadia", 42, JAUNE_TITRE).next_to(perso, DOWN, buff=0.25)
        metier = self.t("glaciologue", 32, TERME).next_to(nom, DOWN, buff=0.1)
        self.au_mot("Nadia")
        self.play(FadeIn(perso, shift=UP * 0.2), FadeIn(nom, shift=UP * 0.1), run_time=0.45)
        self.au_mot("glaciologue")
        self.play(FadeIn(metier, shift=UP * 0.1), run_time=0.35)
        mt = montagne(1.0).move_to(P(-0.6, 0.85))
        roche, glace = mt
        sommet = glace.get_top()
        alpes = self.t("Alpes", 28, GREY_A).next_to(roche, DOWN, buff=0.12)
        self.au_mot("volume d'un glacier")
        self.play(FadeIn(roche, shift=UP * 0.2), run_time=0.35)
        self.play(FadeIn(glace, scale=0.8), run_time=0.3)
        self.au_mot("Alpes")
        self.play(FadeIn(alpes), run_time=0.25)
        X = 4.3
        an = self.t("année 0", 30, GREY_A).move_to(P(X, 2.15))
        vol = self.t("800 millions", 44).move_to(P(X, 1.5))
        m3 = self.t("de m³ de glace", 30, GLACE).move_to(P(X, 0.92))
        perte = self.t("− 3 % par an", 40, RAISON).move_to(P(X, 0.1))
        self.au_mot("L'année")
        self.suivre("0")
        self.play(FadeIn(an, shift=DOWN * 0.08), run_time=0.25)
        self.suivre("800")
        self.play(GrowFromCenter(vol), run_time=0.3)
        self.au_mot("mètres cubes")
        self.play(FadeIn(m3, shift=UP * 0.08), run_time=0.25)
        self.au_mot("il perd")
        self.suivre("3 %")
        self.play(FadeIn(perte, scale=1.3), run_time=0.3)
        for _ in range(3):                     # la glace fond un peu chaque année
            self.play(glace.animate.scale(0.9, about_point=sommet), Indicate(perte, color=RAISON, scale_factor=1.08),
                      run_time=0.45)
        doc = VGroup(Rectangle(width=0.5, height=0.66, fill_color=WHITE, fill_opacity=1, stroke_width=0),
                     *[Line(P(-0.16, y), P(0.16, y), stroke_color=GREY_D, stroke_width=3) for y in (0.15, 0, -0.15)])
        rap = self.morceaux(["« Le volume baisse ", ("chaque année", JAUNE_TITRE), ", ", ("sans exception", JAUNE_TITRE),
                             ". »"], 34, 10.6)
        ligne = VGroup(doc, rap).arrange(RIGHT, buff=0.3).move_to(P(-0.6, -2.0))
        self.au_mot("rapport")
        self.play(FadeIn(doc, shift=UP * 0.1), run_time=0.3)
        self.devoiler(rap, ["le volume baisse", "chaque année", None, "sans exception", None])
        prouver = self.t("Encore faut-il le prouver !", 40, RAISON).move_to(P(-0.6, -2.85))
        self.au_mot("Encore")
        self.play(FadeIn(prouver, scale=1.2), run_time=0.35)
        self.insister(prouver, 1.1)
        self.attendre_voix(marge=0.5)

    # ── 02 : la méthode générale : le signe de uₙ₊₁ − uₙ ───────────────────

    def colonne(self, x, valeurs, sg, mot_signe, mot_sens, sens, n_tout, couleur, haut):
        """Un nuage, la bande de ses écarts dessous, le signe, puis le sens."""
        nu, pts = nuage_mini((0, 5.4), (0, 6), P(x - 2.0, 0.0), P(x + 1.7, 1.4), valeurs)
        zero, barres = bande_ecarts(nu, [b - a for a, b in zip(valeurs, valeurs[1:])], -0.85, 0.5)
        lab0 = self.t("0", 22, GREY_A, audit=False).next_to(zero, LEFT, buff=0.12)
        s = signe(sg, couleur)
        l1 = VGroup(s, self.t(f"{mot_signe} pour tout n", 34)).arrange(RIGHT, buff=0.25).move_to(P(x, -1.95))
        l2 = self.t(f"la suite est {sens}", 31, JAUNE_TITRE).move_to(P(x, -2.75))
        return nu, pts, zero, lab0, barres, l1, l2

    def ecran_difference(self):
        self.nouvel_ecran("02-difference")
        self.titre("La méthode générale", JAUNE_TITRE, 44, extrait="La méthode")
        l0 = self.morceaux(["On étudie le signe de  ", ("uₙ₊₁ − uₙ", RAISON)], 40).move_to(P(0, 2.4))
        XL, XR = -3.6, 2.6
        cg = self.colonne(XL, MONTE, "+", "positif", "croissante", "croissante", 1, JUSTE, True)
        cd = self.colonne(XR, DESCEND, "−", "négatif", "décroissante", "décroissante", 2, PIEGE, False)
        self.devoiler(l0, ["on étudie", "u indice n plus 1"],
                      avec=[Create(c[0].ax_n) for c in (cg, cd)] + [Create(c[0].ax_u) for c in (cg, cd)]
                      + [FadeIn(c[0].lab_n) for c in (cg, cd)] + [FadeIn(c[0].lab_u) for c in (cg, cd)])
        for c, mot, n_ in ((cg, "positif", 1), (cd, "négatif", 1)):
            nu, pts, zero, lab0, barres, l1, l2 = c
            # le nuage et ses écarts se posent AVANT « S'il est … » (pas de retard sur le signe)
            self.play(LaggedStart(*[GrowFromCenter(d) for d in pts], lag_ratio=0.25), FadeIn(lab0), Create(zero),
                      LaggedStart(*[GrowFromEdge(b, DOWN if e > 0 else UP) for b, e in
                                    zip(barres, [b - a for a, b in zip(MONTE if c is cg else DESCEND,
                                                                       (MONTE if c is cg else DESCEND)[1:])])],
                                  lag_ratio=0.25), run_time=0.6)
            self.au_mot(mot)
            self.allumer_signe(l1[0])
            self.suivre("pour tout")
            self.play(FadeIn(l1[1], shift=UP * 0.08), run_time=0.3)
            self.au_mot("croissante" if c is cg else "décroissante")
            fl = tendance(nu, (0, MONTE[0] + 0.7), (5.2, MONTE[-1] + 0.7), JUSTE) if c is cg else \
                tendance(nu, (0, DESCEND[0] + 0.7), (5.2, DESCEND[-1] + 0.7), PIEGE)
            self.play(FadeIn(l2, shift=UP * 0.08), GrowArrow(fl), run_time=0.4)
        self.attendre_voix(marge=0.6)

    # ── 03 : le glacier : uₙ = 800 × 0,97ⁿ ──────────────────────────────────

    def ecran_glacier(self):
        self.nouvel_ecran("03-glacier")
        self.titre("Le glacier", JAUNE_TITRE, 44, extrait="Pour le glacier")
        l1 = self.gauche(self.morceaux([("uₙ", TERME), " = ", "800", " × ", ("0,97ⁿ", RAISON)], 42), 2.2)
        l1b = self.gauche(self.t("pour n entier naturel", 30, GREY_A), 1.55)
        l2 = self.gauche(self.morceaux([("uₙ₊₁ − uₙ", RAISON), " = ", ("uₙ", TERME), " × ", "(0,97 − ", "1)"], 38),
                         0.7)
        l3 = self.morceaux(["= ", ("−0,03", RAISON), ("uₙ", TERME)], 38)
        l3.move_to(P(0, -0.1)).align_to(l2[1], LEFT)
        l3[2].shift(RIGHT * 0.12)
        l4 = self.gauche(self.morceaux([("uₙ > 0", TERME), "   donc   ", ("uₙ₊₁ − uₙ < 0", RAISON)], 36), -1.0)
        for m in l4:
            m._pas_audit = True               # « positifs », « négative » : dits en mots
        sm = signe("−", PIEGE)
        fin = VGroup(sm, self.t("la suite est décroissante", 40, JUSTE)).arrange(RIGHT, buff=0.3)
        self.gauche(fin, -2.05)
        nu, pts = nuage_mini((0, 8.4), (600, 820), P(1.5, 0.15), P(5.2, 2.2), GLACIER, r=0.075)
        for n in (2, 4, 6, 8):
            nu.add(nu.graduation_n(n, str(n), 20))
        zero, barres = bande_ecarts(nu, [b - a for a, b in zip(GLACIER, GLACIER[1:])], -0.75, 0.03, larg=0.2)
        lab0 = self.t("0", 22, GREY_A, audit=False).next_to(zero, LEFT, buff=0.12)
        self.poser_nuage(nu, rt=0.35)
        self.devoiler(l1, ["u indice n égale", None, "800", None, "0,97"])
        self.poser_points(pts, rt=0.8, lag=0.2)
        self.au_mot("pour n entier")
        self.play(FadeIn(l1b, shift=UP * 0.08), run_time=0.3)
        self.devoiler(l2, ["u indice n plus 1", None, "égale u indice n", None, "0,97", "1"])
        self.devoiler(l3, ["égale moins", "0,03", None])
        self.play(FadeIn(lab0), run_time=0.15)
        self.poser_barres(zero, barres, rt=0.7)
        self.au_mot("Les volumes")
        self.play(FadeIn(l4[0], shift=UP * 0.08), Indicate(VGroup(*pts), color=TERME, scale_factor=1.3), run_time=0.4)
        self.au_mot("donc")
        self.play(FadeIn(l4[1]), run_time=0.2)
        self.au_mot("négative")
        self.play(FadeIn(l4[2], shift=UP * 0.08), Indicate(barres, color=RAISON, scale_factor=1.2), run_time=0.4)
        self.au_mot("la suite est décroissante")
        self.allumer_signe(sm)
        cad = self.encadre(fin[1], JUSTE, 0.12)
        fl = tendance(nu, (0, 830), (8.4, 655), PIEGE)
        self.play(FadeIn(fin[1], shift=UP * 0.08), Create(cad), GrowArrow(fl), run_time=0.45)
        self.attendre_voix(marge=0.6)

    # ── 04 : question-pause n° 1 : uₙ₊₁ − uₙ = 2n + 5 → A (croissante) ─────

    def question_morceaux(self, cle, lignes, choix, bonne, **kw):
        """poser_question, mais chaque ligne de la question est en morceaux,
        chaque morceau dévoilé à sa voix : lignes = [(groupe, [extraits]), …]."""
        liste = [(g, None) for g, _ in lignes]

        def dessin():
            for g, ex in lignes:
                self.devoiler(g, ex, rt=0.22)
            liste.clear()                     # poser_question ne les remontre pas
        return self.poser_question(cle, liste, choix, bonne, dessin=dessin, **kw)

    def ecran_question1(self):
        g1 = self.morceaux(["On sait que  ", ("uₙ₊₁ − uₙ", RAISON), " = ", ("2n", RAISON), (" + 5", RAISON)], 40)
        g2 = self.morceaux(["pour tout entier naturel n.", "  La suite est :"], 38)
        q = self.question_morceaux("04-question",
                                   [(g1, ["On sait", "u indice n plus 1", None, "2", "5"]),
                                    (g2, ["pour tout", "La suite"])],
                                   ["croissante", "décroissante", "ni croissante ni décroissante"], 0)
        self.dire("04b-reponse")
        self.q_reponse(q, 0)
        yb, yc = q.cartes[1].get_center()[1], q.cartes[2].get_center()[1]
        self.play(FadeOut(q.cartes[1]), FadeOut(q.cartes[2]), run_time=0.2)
        e1 = self.morceaux([("2n", RAISON), (" + 5", RAISON), ("  est positif", JUSTE), "  pour tout  ", ("n ≥ ", WHITE),
                            "0"], 40)
        e1.move_to(P(-0.8, yb - 0.1))
        self.devoiler(e1, ["2 n", "5", "est positif", "pour tout", "supérieur ou égal", "0"], rt=0.2)
        e2 = self.t("chaque terme dépasse le précédent", 38, JAUNE_TITRE).move_to(P(-0.8, yc - 0.25))
        # le dessin : la bande des écarts 5, 7, 9, 11… toutes AU-DESSUS du 0
        nu = NuageTermes((0, 6), (0, 1), P(-3.6, -2.95), P(1.6, -2.0))
        zero, barres = bande_ecarts(nu, [2 * n + 5 for n in range(6)], -2.95, 0.07, larg=0.3)
        lab = self.t("uₙ₊₁ − uₙ", 28, RAISON).next_to(zero, LEFT, buff=0.25)
        sp = signe("+", JUSTE).next_to(barres, RIGHT, buff=0.45)
        self.au_mot("chaque terme")
        self.play(FadeIn(e2, shift=UP * 0.08), FadeIn(lab), run_time=0.3)
        self.poser_barres(zero, barres, rt=0.6)
        self.allumer_signe(sp)
        self.attendre_voix(marge=0.6)

    # ── 05 : le quotient comparé à 1 ───────────────────────────────────────

    def ecran_quotient(self):
        self.nouvel_ecran("05-quotient")
        self.titre("Autre outil : le quotient", JAUNE_TITRE, 44, extrait="Autre outil")
        l1 = self.gauche(self.morceaux(["Suite à termes  ", ("strictement positifs", TERME), " :"], 36, 7.3), 2.2)
        l2 = self.gauche(self.morceaux(["on compare  ", ("uₙ₊₁ / uₙ", RAISON), "  à  ", ("1", JAUNE_TITRE)], 40, 6.9), 1.35)
        l3 = self.gauche(self.morceaux([("Glacier :", GREY_A), "  ", ("uₙ₊₁ / uₙ", RAISON), " = ", ("0,97", RAISON)],
                                       40, 6.9), 0.2)
        l4 = self.gauche(self.morceaux([("0,97", RAISON), " < ", ("1", JAUNE_TITRE)], 44), -0.7)
        l4[0]._pas_audit = True               # « 0,97 » : déjà dit, on le compare à 1
        fin = VGroup(self.t("on retrouve une suite", 38), self.t("décroissante", 42, JUSTE))
        fin.arrange(DOWN, aligned_edge=LEFT, buff=0.32)
        self.gauche(fin, -1.95)
        # à droite : deux barres de glace, uₙ et uₙ₊₁ (97 % de uₙ), puis la jauge autour de 1
        Y0, H = -0.9, 2.6
        bn = Rectangle(width=0.8, height=H, fill_color=TERME, fill_opacity=1, stroke_width=0)
        bn.move_to(P(2.75, Y0 + H / 2))
        bs = Rectangle(width=0.8, height=H * 0.97, fill_color=TERME, fill_opacity=1, stroke_width=0)
        bs.move_to(P(4.05, Y0 + H * 0.97 / 2))
        manque = DashedVMobject(Rectangle(width=0.8, height=H * 0.03 + 0.001, stroke_color=RAISON, stroke_width=3),
                                num_dashes=8).move_to(P(4.05, Y0 + H * 0.985))
        nn = self.t("uₙ", 30, TERME).next_to(bn, DOWN, buff=0.12)
        ns = self.t("uₙ₊₁", 30, TERME).next_to(bs, DOWN, buff=0.12).align_to(nn, DOWN)
        XG, YG, L = 3.4, -2.2, 3.6          # la jauge : de 0,9 à 1,1
        def gx(v):
            return XG + (v - 1) / 0.2 * L
        rouge = Line(P(gx(0.9), YG), P(gx(1), YG), stroke_color=PIEGE, stroke_width=8)
        vert = Line(P(gx(1), YG), P(gx(1.1), YG), stroke_color=JUSTE, stroke_width=8)
        tick = Line(P(gx(1), YG - 0.22), P(gx(1), YG + 0.22), stroke_color=JAUNE_TITRE, stroke_width=5)
        un = self.t("1", 32, JAUNE_TITRE).next_to(tick, UP, buff=0.08)
        cur = Triangle(fill_color=RAISON, fill_opacity=1, stroke_width=0).scale(0.15).rotate(PI)
        cur.move_to(P(gx(1), YG + 0.3))
        v97 = self.t("0,97", 30, RAISON).move_to(P(gx(0.97), YG - 0.45))
        self.devoiler(l1, ["pour une suite", "strictement", None])
        self.devoiler(l2, ["on compare", "u indice n plus 1", None, "1"], avec=[FadeIn(bn), FadeIn(bs), FadeIn(nn),
                                                                               FadeIn(ns)])
        self.play(Create(rouge), Create(vert), Create(tick), FadeIn(un), run_time=0.4)
        self.devoiler(l3, ["Pour le glacier", "ce quotient", None, "0,97"],
                      avec=[Create(manque), FadeIn(cur), cur.animate.move_to(P(gx(0.97), YG + 0.3))])
        self.play(FadeIn(v97, shift=UP * 0.08), run_time=0.25)
        self.au_mot("plus petit")
        self.play(FadeIn(l4[0]), FadeIn(l4[1]), Indicate(rouge, color=PIEGE), run_time=0.3)
        self.suivre("1")
        self.play(FadeIn(l4[2], scale=1.3), run_time=0.25)
        self.au_mot("on retrouve")
        cad = self.encadre(fin[1], JUSTE, 0.12)
        self.play(FadeIn(fin[0], shift=UP * 0.08), run_time=0.3)
        self.au_mot("décroissante")
        self.play(FadeIn(fin[1], shift=UP * 0.08), Create(cad), Flash(cur, color=PIEGE, line_length=0.15), run_time=0.4)
        self.attendre_voix(marge=0.6)

    # ── 06 : le piège : q > 1 mais u₀ < 0 ──────────────────────────────────

    def ecran_piege(self):
        self.nouvel_ecran("06-piege")
        tit = self.t("Le piège !", 46, PIEGE).move_to(P(0, 3.15))
        self.au_mot("piège")
        self.play(FadeIn(tit, scale=1.3), run_time=0.35)
        q1 = self.gauche(self.morceaux(["« La raison est plus grande que ", "1", ","], 32, 8.0), 2.35)
        q2 = self.gauche(self.t("donc la suite est croissante »", 32), 1.8)
        self.devoiler(q1, ["La raison", "1", None])
        self.au_mot("donc la suite")
        self.play(FadeIn(q2, shift=UP * 0.08), run_time=0.3)
        self.au_mot("c'est faux")
        self.play(Create(self.rayer(q1)), Create(self.rayer(q2)), run_time=0.35)
        l3 = self.gauche(self.morceaux([("faux", PIEGE), " si le premier terme est ", ("négatif", PIEGE)], 32, 8.0), 1.1)
        self.devoiler(l3, [None, "si le premier", "négatif"])
        l4 = self.gauche(self.morceaux([("u₀", TERME), " = ", ("−5", TERME), "     et     ", ("q = ", RAISON),
                                        ("2", RAISON)], 40), 0.3)
        self.devoiler(l4, ["Avec u indice 0", None, "5", "et une raison", None, "2"], rt=0.2)
        lg = LigneTermes(["−5", "−10", "−20"], xs=(-5.3, -3.6, -1.9), centre=P(0, -0.6), largeur=1.25, hauteur=0.7,
                         fs=36)
        nu = NuageTermes((0, 2.5), (-22, 2), P(2.6, -1.4), P(5.0, 2.2), fs=26)
        for n in (1, 2):
            nu.add(nu.graduation_n(n, str(n), 20))
        pts = [nu.point(k, v) for k, v in enumerate(PIEGE_T)]
        self.poser_nuage(nu, rt=0.3)
        for k, v in enumerate(PIEGE_T):
            self.suivre(str(abs(v)))
            anims = [FadeIn(lg.cases[k][0], scale=0.8), FadeIn(lg.cases[k][1], scale=1.4), GrowFromCenter(pts[k])]
            if k:
                s = lg.saut(k - 1, "× 2", fs=30)
                s[1]._pas_audit = True          # la raison, déjà dite : redessinée sur la flèche
                mar = Line(nu.G(k, PIEGE_T[k - 1]), nu.G(k, v), color=RAISON, stroke_width=6)
                hor = DashedLine(nu.G(k - 1, PIEGE_T[k - 1]), nu.G(k, PIEGE_T[k - 1]), color=GREY_B, stroke_width=2,
                                 dash_length=0.06)
                anims += [Create(s[0]), FadeIn(s[1], scale=1.3), Create(hor), Create(mar)]
            self.play(*anims, run_time=0.35)
        l5 = self.gauche(self.morceaux([("La raison dépasse ", RAISON), ("1", RAISON), ", et pourtant la suite ",
                                        ("décroît", PIEGE)], 36), -2.2)
        l5.set_x(-0.5)
        sm = signe("−", PIEGE, 0.3, 40).move_to(nu.G(0.45, -17))
        fl = tendance(nu, (-0.05, -1.5), (2.4, -18), PIEGE)
        self.devoiler(l5, ["La raison dépasse", "1", "et pourtant", "décroît"], avec=[GrowArrow(fl)])
        self.allumer_signe(sm)
        self.au_mot("Il faut regarder")
        l6 = self.morceaux(["Regarde ", ("la raison", RAISON), (" ET ", JAUNE_TITRE), ("le signe de ", TERME),
                            ("u₀", TERME)], 40)
        l6.move_to(P(-0.5, -3.05))
        self.devoiler(l6, [None, "la raison", "ET", "le signe", None])
        cad = self.encadre(l6, JAUNE_TITRE, 0.12)
        self.play(Create(cad), run_time=0.3)
        self.attendre_voix(marge=0.6)

    # ── 07 : question-pause n° 2 : u₀ = 3, uₙ₊₁ = −2 uₙ → B ────────────────

    def ecran_question2(self):
        g1 = self.morceaux(["Soit  ", ("u₀", TERME), " = 3", "     et     ", ("uₙ₊₁", TERME), " = ", ("−2", RAISON), " ",
                            ("uₙ", TERME)], 42)
        g2 = self.morceaux(["La suite est :"], 38)
        q = self.question_morceaux("07-question",
                                   [(g1, ["Soit u indice 0", None, "3", "et u", None, None, "2", None]),
                                    (g2, ["La suite"])],
                                   ["croissante", "ni croissante ni décroissante", "décroissante"], 1)
        self.dire("07b-reponse")
        ok = self.q_reponse(q, 1)
        self.play(FadeOut(q.cartes[0]), FadeOut(q.cartes[2]), run_time=0.25)   # partis AVANT de monter B
        self.play(VGroup(q.cartes[1], ok).animate.move_to(q.cartes[0]), run_time=0.35)
        y = q.cartes[0].get_center()[1]
        e1 = self.gauche(self.morceaux(["La raison est ", ("négative", PIEGE), "  :  ", ("q = −2", RAISON)], 36, 8.2),
                         y - 1.0, x=-6.1)
        e1[3]._pas_audit = True                 # « moins 2 » : dit dans la question
        lg = LigneTermes(["3", "−6", "12"], xs=(-5.3, -3.6, -1.9), centre=P(0, y - 2.05), largeur=1.2, hauteur=0.7,
                         fs=36)
        nu = NuageTermes((0, 2.5), (-8, 14), P(2.8, -3.0), P(4.85, y - 1.25), fs=26)
        pts = [nu.point(k, v) for k, v in enumerate(Q2)]
        self.devoiler(e1, ["La raison", "négative", None, None])
        self.poser_nuage(nu, rt=0.3)
        for k, v in enumerate(Q2):
            self.suivre(str(abs(v)))
            anims = [FadeIn(lg.cases[k][0], scale=0.8), FadeIn(lg.cases[k][1], scale=1.4), GrowFromCenter(pts[k])]
            if k:
                coul = JUSTE if v > Q2[k - 1] else PIEGE
                anims += [Create(Line(nu.G(k - 0.5, Q2[k - 1]), nu.G(k - 0.5, v), color=RAISON, stroke_width=6)),
                          Create(Line(nu.G(k - 1, Q2[k - 1]), nu.G(k, v), color=coul, stroke_width=3))]
            self.play(*anims, run_time=0.35)
        l3 = self.gauche(self.t("Les termes changent de signe :", 32, larg=8.3), y - 3.05, x=-6.1)
        l4 = self.gauche(self.t("ils montent et descendent tour à tour", 32, JAUNE_TITRE, larg=8.3), y - 3.7, x=-6.1)
        self.au_mot("Les termes")
        self.play(FadeIn(l3, shift=UP * 0.08), run_time=0.3)
        self.au_mot("ils montent")
        self.play(FadeIn(l4, shift=UP * 0.08), run_time=0.3)
        self.attendre_voix(marge=0.6)

    # ── 08 : le défi : uₙ = n² − 6n ─────────────────────────────────────────

    def ecran_defi(self):
        self.nouvel_ecran("08-defi")
        tit = self.titre("À toi de jouer !", JAUNE_TITRE, 48, extrait="À toi")
        f = self.gauche(self.morceaux(["Soit  ", ("uₙ", TERME), " = n²", " − 6n"], 46), 2.1)
        tt = self.gauche(self.t("pour tout entier naturel n", 32, GREY_A), 1.4)
        nu = NuageTermes((0, 7.5), (-10, 8), P(0.9, -0.15), P(5.0, 2.1), fs=26)
        for n in range(1, 8):
            nu.add(nu.graduation_n(n, str(n), 20))
        pts = [nu.point(k, v) for k, v in enumerate(DEFI)]
        pq = self.t("?", 64, RAISON).move_to(nu.G(5.0, -7.6))
        self.devoiler(f, ["Soit u indice n", None, "n au carré", "6"],
                      avec=[Create(nu.ax_n), Create(nu.ax_u), FadeIn(nu.lab_n), FadeIn(nu.lab_u)]
                      + [FadeIn(g) for g in nu[4:]])
        self.poser_points(pts[:3], rt=0.3, lag=0.4)
        self.au_mot("pour tout")
        self.play(FadeIn(tt, shift=UP * 0.08), FadeIn(pq, scale=1.4), run_time=0.35)
        q1 = self.gauche(self.morceaux(["À partir de quel ", ("rang", RAISON)], 40), 0.35)
        q2 = self.gauche(self.morceaux(["la suite est-elle ", ("croissante", RAISON), " ?"], 40), -0.35)
        self.devoiler(q1, ["À partir", "rang"])
        self.devoiler(q2, ["la suite", "croissante", None])
        self.defi_pause(-1.65, x=-2.6)
        self._defi = (tit, f, tt, q1, q2, nu, pts, pq)

    def ecran_correction(self):
        self.dire("08b-correction")
        tit, f, tt, q1, q2, nu, pts, pq = self._defi
        self.au_mot("Correction")
        cor = self.t("Correction", 46, JUSTE).move_to(tit)
        self.play(FadeOut(q1), FadeOut(q2), FadeOut(tt), FadeOut(pq), ReplacementTransform(tit, cor), run_time=0.4)
        c1 = self.gauche(self.morceaux([("uₙ₊₁ − uₙ", RAISON), " = ", "2n", " + 1", " − 6"], 38), 1.3)
        c2 = self.morceaux(["= ", ("2n", RAISON), (" − ", RAISON), ("5", RAISON)], 38)
        c2.move_to(P(0, 0.55)).align_to(c1[1], LEFT)
        c3 = self.gauche(self.morceaux([("positif", JUSTE), " dès que  ", ("n ≥ ", JUSTE), ("3", JUSTE)], 38), -0.3)
        # « Vérifie » sur DEUX lignes, à la taille du reste (38)
        c4 = self.gauche(self.morceaux([("Vérifie :", GREY_A), "  ", ("u₂", TERME), " = −", "8"], 38), -1.05)
        c4b = self.morceaux([("u₃", TERME), " = −", "9", "    ", ("u₄", TERME), " = −", "8"], 38)
        c4b.move_to(P(0, -1.68)).align_to(P(-5.65, 0), LEFT)
        c5 = self.gauche(self.morceaux([("croissante à partir du rang ", JUSTE), ("3", JUSTE)], 40, 6.6), -2.45)
        zero, barres = bande_ecarts(nu, ECARTS_DEFI, -1.55, 0.11, larg=0.24)
        lab0 = self.t("0", 22, GREY_A, audit=False).next_to(zero, LEFT, buff=0.12)
        self.devoiler(c1, ["u indice n plus 1", None, "2", "1", "6"])
        self.poser_points(pts[3:], rt=0.6, lag=0.3)
        self.devoiler(c2, ["égale", "2", None, "5"])
        self.play(FadeIn(lab0), run_time=0.15)
        self.poser_barres(zero, barres, rt=0.8)
        self.devoiler(c3, ["positif", "dès que", "supérieur", "3"])
        sm = signe("−", PIEGE, 0.26, 34).move_to(P(barres[:3].get_center()[0], zero.get_center()[1] + 0.4))
        sp = signe("+", JUSTE, 0.26, 34).next_to(barres, RIGHT, buff=0.2).set_y(-1.1)
        self.play(GrowFromCenter(sm), GrowFromCenter(sp), Indicate(barres[3:], color=JUSTE, scale_factor=1.15),
                  run_time=0.45)
        self.devoiler(c4, ["Vérifie", "u indice 2", None, "8"], rt=0.25)
        self.devoiler(c4b, ["u indice 3", None, "9", "u indice 4", None, "8"], rt=0.25)
        for k in (2, 3, 4):
            pts[k].set_color(JAUNE_TITRE)
        self.play(Indicate(VGroup(*pts[2:5]), color=JAUNE_TITRE, scale_factor=1.5), run_time=0.45)
        self.devoiler(c5, ["La suite est croissante", "3"])
        cad = self.encadre(c5, JUSTE, 0.12)
        rang = DashedLine(nu.G(3, 8), nu.G(3, -10), color=JUSTE, stroke_width=3, dash_length=0.08)
        fl = tendance(nu, (3, -6.5), (7.4, 9.5), JUSTE)
        # les graduations restent lisibles : chaque nombre sur un petit fond noir, PAR-DESSUS les traits
        for g in nu[4:]:
            fond = BackgroundRectangle(g[1], color=BLACK, fill_opacity=1, buff=0.03)
            fond.set_z_index(2)
            g[1].set_z_index(3)
            self.add(fond)
        self.play(Create(cad), Create(rang), GrowArrow(fl), run_time=0.45)
        self.attendre_voix(marge=0.6)

    # ── 09 : ce que tu as appris ───────────────────────────────────────────

    def ecran_appris(self):
        """« Ce que tu as appris » (titre EN HAUT ET CENTRÉ), chaque ligne en morceaux."""
        J = JAUNE_TITRE
        points = [[([("Sens de variation :", J), " le signe de ", ("uₙ₊₁ − uₙ", RAISON)],
                    ["Pour le sens", "le signe", "u indice n plus 1"])],
                  [([("Termes strictement positifs :", J)], ["Pour des termes"]),
                   (["on peut comparer le quotient ", ("uₙ₊₁ / uₙ", RAISON), " à ", ("1", RAISON)],
                    ["on peut comparer", None, None, "1"])],
                  [([("Suite géométrique :", J), " la raison ", ("ET", J)], ["Et pour une suite", "la raison", "ET"]),
                   (["le signe du premier terme"], ["le signe du premier"])]]
        self.nouvel_ecran("09-finale", margo=0.65)
        self.au_mot("Ce que tu as appris")
        tit = self.t("Ce que tu as appris", 46, J).to_edge(UP, buff=0.45)
        self.play(Write(tit), run_time=0.7)
        blocs = []
        for pt in points:
            lignes = VGroup(*[self.morceaux(pc, 38, 1e9) for pc, _ in pt]).arrange(DOWN, aligned_edge=LEFT, buff=0.14)
            blocs.append(VGroup(self.coche(), lignes).arrange(RIGHT, buff=0.3, aligned_edge=UP))
        tout = VGroup(*blocs).arrange(DOWN, aligned_edge=LEFT, buff=0.45)
        if tout.width > 11.4:
            tout.scale_to_fit_width(11.4)
        if tout.height > 5.6:
            tout.scale_to_fit_height(5.6)
        tout.move_to(P(-0.4, -0.4))
        for bloc, pt in zip(blocs, points):
            for k, (l, (_, ex)) in enumerate(zip(bloc[1], pt)):
                self.devoiler(l, ex, rt=0.3, avec=[Create(bloc[0])] if k == 0 else ())
        self.attendre_voix(marge=0.8)

    def construct(self):
        ecrans = [self.ecran_garde, self.ecran_situation, self.ecran_difference, self.ecran_glacier,
                  self.ecran_question1, self.ecran_quotient, self.ecran_piege, self.ecran_question2,
                  self.ecran_defi, self.ecran_correction, self.ecran_appris, lambda: self.fin("10-abonne")]
        choix = os.environ.get("ECRANS")          # contrôle rapide : ECRANS=5,6 (jamais au rendu final)
        for k, e in enumerate(ecrans):
            if not choix or str(k) in choix.split(",") or (e == self.ecran_correction and "8" in choix.split(",")):
                e()
