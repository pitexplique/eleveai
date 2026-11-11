# suite_arith_interpreter.py
# EleveAI — Maths 1re (sans spé, programme 2026) — paysage « Suite arithmétique :
# interpréter » (16:9), ceinture VERTE. Série SUITES, épisode 08.
# Micro du coach : lin_suite_interpreter (notion lin_suite_terme_general) :
# lib/tutor-v4/questionBank/premiere/maths/suites-arithmetiques.bank.ts (tpl_1 :
# « que représente u₇ ? », piège « arbres plantés » et décalage d'un an)
# + suites-arithmetiques-renfort.ts (aInterpTerme, aInterpRang, aInterpRaison,
# aInterpSeuil, aInterpMotif).
#
# Ce que demande le coach → écran :
#   · aInterpRaison (que représente u₀, que représente r dans uₙ = a + bn)
#                                                   → 02-formule, 04-question (B) ;
#   · aInterpTerme (que signifie uₖ = V : une valeur, pas l'augmentation)
#                                                   → 03-terme (le piège du gain) ;
#   · aInterpSeuil (premier rang n tel que uₙ > S)  → 05-seuil, 06-piege (17 → 18) ;
#   · aInterpRang (l'indice ↔ l'année, départ u₀ ou u₁) → 07-annee (+ le short) ;
#   · aInterpMotif (l'étape qui utilise N carreaux, la plus grande étape)
#                                                   → 08-motif, 09-question (C), 10 défi.
# Clé de voix → écran :
#   00-garde (un marcheur sur un chemin, des pas égaux en orange) · 01 Clara,
#   kinésithérapeute ; Bastien opéré du genou : 400 m au départ, + 150 m chaque
#   semaine, le lycée à 3 km · 02 uₙ = 400 + 150n : chaque morceau relié au
#   dessin (400 → la barre bleue du départ, 150 → le morceau orange de chaque
#   semaine, n → les semaines) · 03 u₁₀ = 1 900 m (valeur totale) ; le gain
#   1 500 m barré comme valeur de u₁₀ · 04/04b question (B : livres ajoutés
#   chaque année) · 05 400 + 150n ≥ 3 000 → n ≈ 17,3 · 06 le piège : u₁₇ =
#   2 950 (il manque 50 m), u₁₈ = 3 100 → 18 semaines · 07 l'indice → une date
#   (u₀ en 2026 : u₇ en 2033 ; u₁ en 2026 : u₇ en 2032) · 08 le T de carreaux
#   (4, 7, 10 : + 3) uₙ = 4 + 3 × (n − 1) · 09/09b question (C : étape 20) ·
#   10/10b défi la croix (5, 9, 13 ; 150 carreaux → étape 37) · 11 « Ce que tu
#   as appris » · 12 fin.
# Code couleur (module commun) : bleu = termes (et la distance de départ),
# orange = raison et ce qui s'ajoute, vert = juste, rouge = piège. Pas de LaTeX.
# Voix : manim/voix/premiere-suite-arith-interpreter.json (débit −6), calée mot
# à mot par suite_arith_interpreter_marques.json (cues doubles datées par
# manim/scripts/4e/equation_commun.py).
# Contrôle : AUDIT=1 BORDS=1 python -m manim render --dry_run …
# python -m manim render -qh --disable_caching manim/scripts/premiere/suite_arith_interpreter.py SuiteArithInterpreter1re -o eleveai-maths-premiere-suite-arith-interpreter --media_dir manim/scripts/premiere/media-suite-arith-interpreter
# Sortie : manim/sorties/premiere/maths/suites/08-arith-interpreter/

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from suites_commun import *  # noqa: E402,F403

# ── les affirmations de la voix, vérifiées ──────────────────────────────────
U0, R, CIBLE = 400, 150, 3000
assert U0 + R * 10 == 1900 and R * 10 == 1500
assert (CIBLE - U0) == 2600 and abs(2600 / 150 - 17.33) < 0.01
assert U0 + R * 17 == 2950 and R * 17 == 2550 and CIBLE - 2950 == 50 and U0 + R * 18 == 3100
assert 2026 + 7 == 2033 and 2026 + (7 - 1) == 2032
T_ETAPES = [4, 7, 10]
assert all(4 + 3 * (n - 1) == v for n, v in zip((1, 2, 3), T_ETAPES))
assert (2 * 1 + 1) + 1 == 4 and (2 * 2 + 1) + 2 == 7 and (2 * 3 + 1) + 3 == 10   # la barre + le pied
assert 4 + 3 * (20 - 1) == 61 and 61 - 4 == 57 and 57 // 3 == 19                # réponse C : 20
CROIX = [5, 9, 13]
assert all(5 + 4 * (n - 1) == v for n, v in zip((1, 2, 3), CROIX))
assert 5 + 4 * 36 == 149 and 4 * 36 == 144 and 5 + 4 * 37 == 153 and 149 <= 150 < 153   # étape 37

PEAU, PEAU2, CHEVEUX = "#8d5524", "#c68642", "#1f1300"
TUNIQUE, JEAN, PIERRE, TOIT = "#14B8A6", "#1D4ED8", "#CBD5E1", "#B91C1C"
SOL = "#57534E"


def clara(s=1.0):
    """Clara, kinésithérapeute : tunique turquoise, chignon."""
    chignon = Circle(radius=0.14, fill_color=CHEVEUX, fill_opacity=1, stroke_width=0).move_to(P(0, 1.42))
    cheveux = Circle(radius=0.31, fill_color=CHEVEUX, fill_opacity=1, stroke_width=0).move_to(P(0, 1.1))
    tete = Circle(radius=0.27, fill_color=PEAU2, fill_opacity=1, stroke_width=0).move_to(P(0, 1.02))
    corps = RoundedRectangle(width=1.0, height=1.2, corner_radius=0.25, fill_color=TUNIQUE, fill_opacity=1,
                             stroke_width=0).move_to(P(0, 0.12))
    col = Polygon(P(-0.18, 0.72), P(0.18, 0.72), P(0, 0.45), fill_color=WHITE, fill_opacity=1, stroke_width=0)
    croix_ = VGroup(Rectangle(width=0.2, height=0.06), Rectangle(width=0.06, height=0.2)).set_fill(WHITE, 1)
    croix_.set_stroke(width=0).move_to(P(0.25, 0.3))
    return VGroup(corps, col, croix_, chignon, cheveux, tete).scale(s)


def bastien(s=1.0):
    """Bastien, 16 ans : sweat, jean, une genouillère orange au genou droit."""
    cheveux = Circle(radius=0.3, fill_color=CHEVEUX, fill_opacity=1, stroke_width=0).move_to(P(0, 1.36))
    tete = Circle(radius=0.27, fill_color=PEAU, fill_opacity=1, stroke_width=0).move_to(P(0, 1.28))
    corps = RoundedRectangle(width=0.9, height=0.95, corner_radius=0.25, fill_color="#7C3AED", fill_opacity=1,
                             stroke_width=0).move_to(P(0, 0.55))
    j1 = Line(P(-0.2, 0.12), P(-0.24, -0.75), stroke_color=JEAN, stroke_width=16)
    j2 = Line(P(0.2, 0.12), P(0.26, -0.75), stroke_color=JEAN, stroke_width=16)
    genou = RoundedRectangle(width=0.26, height=0.22, corner_radius=0.06, fill_color=RAISON, fill_opacity=1,
                             stroke_width=0).move_to(P(0.23, -0.33))
    return VGroup(j1, j2, genou, corps, cheveux, tete).scale(s)


def marcheur(s=1.0, couleur="#7C3AED"):
    """Un petit marcheur de profil (Bastien sur le chemin), pieds sur l'origine."""
    k = dict(stroke_color=WHITE, stroke_width=5)
    tete = Circle(radius=0.11, fill_color=PEAU, fill_opacity=1, stroke_width=0).move_to(P(0.02, 0.86))
    corps = Line(P(0.02, 0.74), P(0.0, 0.4), stroke_color=couleur, stroke_width=10)
    j1 = VMobject(**k).set_points_as_corners([P(0.0, 0.4), P(0.1, 0.2), P(0.16, 0.0)])
    j2 = VMobject(**k).set_points_as_corners([P(0.0, 0.4), P(-0.06, 0.2), P(-0.14, 0.0)])
    b1 = VMobject(**k).set_points_as_corners([P(0.02, 0.68), P(0.12, 0.52), P(0.16, 0.42)])
    b2 = VMobject(**k).set_points_as_corners([P(0.02, 0.68), P(-0.08, 0.52), P(-0.12, 0.42)])
    return VGroup(j1, j2, corps, b1, b2, tete).scale(s, about_point=ORIGIN)


def lycee(s=1.0):
    """Le lycée : un bâtiment, un toit, des fenêtres, une porte, un drapeau."""
    mur = Rectangle(width=1.5, height=0.8, fill_color=PIERRE, fill_opacity=1, stroke_width=0)
    toit = Polygon(P(-0.85, 0.4), P(0.85, 0.4), P(0, 0.75), fill_color=TOIT, fill_opacity=1, stroke_width=0)
    fen = VGroup(*[Square(0.16, fill_color="#1E3A8A", fill_opacity=1, stroke_width=0).move_to(P(x, 0.15))
                   for x in (-0.5, -0.2, 0.2, 0.5)])
    porte = Rectangle(width=0.24, height=0.36, fill_color="#78350F", fill_opacity=1, stroke_width=0).move_to(
        P(0, -0.22))
    mat = Line(P(0, 0.72), P(0, 1.15), stroke_color=GREY_B, stroke_width=3)
    drap = Polygon(P(0, 1.15), P(0.32, 1.06), P(0, 0.97), fill_color=JUSTE, fill_opacity=1, stroke_width=0)
    return VGroup(mur, toit, fen, porte, mat, drap).scale(s)


class Chemin:
    """Un chemin horizontal : x = x0 + k × distance (m), à la hauteur y.
    barre(a, b, couleur) : le morceau de a m à b m (épais, plein)."""

    def __init__(self, x0, k, y, h=0.26):
        self.x0, self.k, self.y, self.h = x0, k, y, h

    def X(self, d):
        return self.x0 + self.k * d

    def sol(self, a, b, couleur=SOL):
        return Line(P(self.X(a), self.y), P(self.X(b), self.y), stroke_color=couleur, stroke_width=3)

    def barre(self, a, b, couleur):
        return Rectangle(width=self.k * (b - a), height=self.h, fill_color=couleur, fill_opacity=1,
                         stroke_color=FOND_CARTE, stroke_width=1.5).move_to(P(self.X((a + b) / 2), self.y))


def carreau(x, y, cote, couleur):
    return Square(cote, fill_color=couleur, fill_opacity=1, stroke_color=WHITE, stroke_width=1.5).move_to(P(x, y))


def motif_t(etape, cote=0.4, x=0.0, y_haut=0.0):
    """Le T de l'étape k : une barre de 2k + 1 carreaux, un pied de k carreaux.
    Les 3 carreaux neufs (un de chaque côté de la barre, un au pied) à part."""
    anciens, neufs = VGroup(), VGroup()
    for i in range(-etape, etape + 1):
        neuf = etape > 1 and abs(i) == etape
        (neufs if neuf else anciens).add(carreau(x + i * cote, y_haut, cote, RAISON if neuf else TERME))
    for j in range(1, etape + 1):
        neuf = etape > 1 and j == etape
        (neufs if neuf else anciens).add(carreau(x, y_haut - j * cote, cote, RAISON if neuf else TERME))
    return VGroup(anciens, neufs)


def motif_croix(etape, cote=0.34, x=0.0, y=0.0):
    """La croix de l'étape k : un carreau central, 4 bras de k carreaux ; le
    carreau au bout de chaque bras (neuf) à part (comme le pilote)."""
    anciens, neufs = VGroup(carreau(x, y, cote, TERME)), VGroup()
    for (di, dj) in ((1, 0), (-1, 0), (0, 1), (0, -1)):
        for k in range(1, etape + 1):
            neuf = k == etape and etape > 1
            (neufs if neuf else anciens).add(carreau(x + di * k * cote, y + dj * k * cote, cote,
                                                     RAISON if neuf else TERME))
    return VGroup(anciens, neufs)


class Morceaux(VGroup):
    """Une ligne en plusieurs Text, chacun montré quand la voix dit son extrait
    (dans poser_question : self.montrer_liste lit .extraits)."""

    def __init__(self, morceaux, fs=38, buff=0.18, **kw):
        super().__init__(**kw)
        self.nombres, self.seps, self.extraits = [], [], []
        for k, (texte, couleur, ex) in enumerate(morceaux):
            t = Text(texte, font_size=fs, color=couleur)
            self.add(t)
            self.nombres.append(t)
            self.extraits.append(ex)
            if k < len(morceaux) - 1:
                s = Dot(radius=0.001, fill_opacity=0, stroke_width=0)
                self.seps.append(s)
        self.arrange(RIGHT, buff=buff)
        for k, s in enumerate(self.seps):
            s.move_to(self.nombres[k].get_right())
            self.add(s)


class SuiteArithInterpreter1re(PaysageSuites):
    fichier_marques = "suite_arith_interpreter_marques.json"
    nom_voix = "premiere-suite-arith-interpreter"
    identite = "Maths 1re — EleveAI"
    ceinture = "verte"
    k_allumer = 1.04              # les boutons larges de 04 restent dans la marge
    place_coche = 1.0

    # ── outils de l'épisode ────────────────────────────────────────────────

    def montrer_liste(self, g, extraits=None, run_time=0.18):
        """Une liste_nombres (chaque nombre à sa voix) ou des Morceaux (chaque
        morceau à son extrait ; None : avec le précédent)."""
        if not isinstance(g, Morceaux):
            return super().montrer_liste(g, extraits, run_time)
        paquet = []
        for n, ex in zip(g.nombres, g.extraits):
            if ex is not None and paquet:
                self.play(*[FadeIn(p, shift=UP * 0.1) for p in paquet], run_time=run_time)
                paquet = []
            if ex is not None:
                self.suivre(ex)
            paquet.append(n)
        self.play(*[FadeIn(p, shift=UP * 0.1) for p in paquet], run_time=run_time)

    def calcul(self, morceaux, y, x=-6.25, fs=40, avec=(), centre=False, buff=0.18):
        """Un calcul écrit morceau par morceau : [(texte, couleur, extrait), …] ;
        chaque morceau quand la voix dit son extrait (None : avec le précédent)."""
        ts = [self.t(m[0], fs, m[1], 1e9, audit=len(m) < 4) for m in morceaux]  # 4e élément : déjà dit
        g = VGroup(*ts)
        for a, b, ma, mb in zip(ts, ts[1:], morceaux, morceaux[1:]):
            b.next_to(a, RIGHT, buff=self.espace(ma[0], mb[0], fs))
        g.move_to(P(0, y))
        if g.width > self.largeur_texte:
            g.scale_to_fit_width(self.largeur_texte)
        if centre:
            g.move_to(P(x, y))
        else:
            g.align_to(P(x, 0), LEFT)
        paquet = []
        for tx, ex in zip(ts, [m[2] for m in morceaux]):
            if ex is not None and paquet:
                self.play(*[FadeIn(p, shift=UP * 0.1) for p in paquet], run_time=0.2)
                paquet = []
            if ex is not None:
                self.suivre(ex)
            paquet.append(tx)
        self.play(*[FadeIn(p, shift=UP * 0.1) for p in paquet], *avec, run_time=0.25)
        return g

    def espace(self, a, b, fs):
        """L'écart entre deux morceaux = une VRAIE espace de la police entre le
        dernier signe de a et le premier de b (« n ≥ 2 600 », « (n − 1) »,
        « u₃₈ = 153 ») ; « 150 » puis « n » restent collés (150n)."""
        x, y = a.strip()[-1], b.strip()[0]
        if y == "n" and x.isdigit():
            return 0.04
        k = fs / 48
        tout = Text(f"{x} {y}", font_size=48).width
        return max(0.05, (tout - Text(x, font_size=48).width - Text(y, font_size=48).width) * k)

    def fleche(self, a, b, couleur, sw=5):
        return Arrow(a, b, buff=0.08, color=couleur, stroke_width=sw, tip_length=0.2,
                     max_tip_length_to_length_ratio=0.25)

    def avancer(self, mar, x, y, run_time=0.4):
        """Le marcheur avance jusqu'à x (pieds sur y)."""
        self.play(mar.animate.move_to(P(x, y), aligned_edge=DOWN), run_time=run_time, rate_func=linear)

    # ── 00 : la garde ──────────────────────────────────────────────────────

    def pas_egaux(self):
        """Un chemin : la barre bleue du départ, puis des pas orange tous égaux,
        le marcheur avance à chaque pas."""
        ch = Chemin(-4.2, 0.0034, -1.45, h=0.2)
        sol = ch.sol(0, 2300)
        mar = marcheur(0.75).move_to(P(ch.X(0), ch.y + 0.12), aligned_edge=DOWN)
        self.play(Create(sol), FadeIn(mar), run_time=0.35)
        b0 = ch.barre(0, 400, TERME)
        self.play(GrowFromEdge(b0, LEFT), mar.animate.move_to(P(ch.X(400), ch.y + 0.12), aligned_edge=DOWN),
                  run_time=0.4, rate_func=linear)
        for k in range(5):
            b = ch.barre(400 + 300 * k, 700 + 300 * k, RAISON)
            self.play(GrowFromEdge(b, LEFT), mar.animate.move_to(P(ch.X(700 + 300 * k), ch.y + 0.12),
                                                                 aligned_edge=DOWN), run_time=0.22, rate_func=linear)

    def ecran_garde(self):
        self.garde("Suite arithmétique",
                   [("interpréter", "interpréter", TERME),
                    ("Que veut dire chaque nombre d'une formule,", "Que veut"),
                    ("dans la vraie vie ?", "dans la vraie")],
                   dessin=self.pas_egaux)

    # ── 01 : Clara, Bastien et son chemin ──────────────────────────────────

    CH1 = (-6.0, 10.9 / 3000, -1.75)

    def ecran_situation(self):
        self.nouvel_ecran("01-situation")
        cl = clara(1.0).move_to(P(-4.55, 2.1))
        nom = self.t("Clara", 40, JAUNE_TITRE).next_to(cl, DOWN, buff=0.22)
        metier = self.t("kinésithérapeute", 34, TERME, larg=3.9).next_to(nom, DOWN, buff=0.1)
        self.au_mot("Clara")
        self.play(FadeIn(cl, shift=UP * 0.2), FadeIn(nom, shift=UP * 0.1), run_time=0.45)
        self.au_mot("kinésithérapeute")
        self.play(FadeIn(metier, shift=UP * 0.1), run_time=0.35)
        ba = bastien(0.95).move_to(P(-0.85, 1.95))
        nba = self.t("Bastien", 40, JAUNE_TITRE).next_to(ba, DOWN, buff=0.22)
        self.au_mot("Bastien")
        self.play(FadeIn(ba, shift=LEFT * 0.2), FadeIn(nba, shift=UP * 0.1), run_time=0.4)
        self.au_mot("genou")
        self.play(Indicate(ba[2], color=RAISON, scale_factor=1.6), run_time=0.5)
        ch = Chemin(*self.CH1)
        sol = ch.sol(0, 3000)
        mar = marcheur(0.7).move_to(P(ch.X(0) + 0.1, ch.y + 0.13), aligned_edge=DOWN)
        self.au_mot("Au début")
        self.play(Create(sol), FadeIn(mar), run_time=0.4)
        self.suivre("400")
        b0 = ch.barre(0, 400, TERME)
        l400 = self.t("400 m", 34, TERME).next_to(b0, DOWN, buff=0.18)
        self.play(GrowFromEdge(b0, LEFT), FadeIn(l400, scale=1.3), run_time=0.45)
        self.avancer(mar, ch.X(400), ch.y + 0.13, 0.35)
        self.au_mot("Chaque semaine")
        cs = self.t("chaque semaine :", 32, WHITE)
        p150 = self.t("+ 150 m", 36, RAISON)
        VGroup(cs, p150).arrange(RIGHT, buff=0.2).move_to(P(0, ch.y + 1.25)).align_to(P(ch.X(400) - 0.2, 0), LEFT)
        self.play(FadeIn(cs, shift=UP * 0.1), run_time=0.3)
        self.suivre("150")
        pieces = [ch.barre(400 + R * k, 400 + R * (k + 1), RAISON) for k in range(3)]
        self.play(FadeIn(p150, scale=1.3), GrowFromEdge(pieces[0], LEFT), run_time=0.35)
        self.avancer(mar, ch.X(550), ch.y + 0.13, 0.25)
        for k in (1, 2):
            self.play(GrowFromEdge(pieces[k], LEFT), mar.animate.move_to(P(ch.X(400 + R * (k + 1)), ch.y + 0.13),
                                                                         aligned_edge=DOWN),
                      run_time=0.3, rate_func=linear)
        self.au_mot("3 kilomètres")
        ly = lycee(1.0).move_to(P(ch.X(3000) - 0.35, ch.y + 0.68))
        but = DashedLine(P(ch.X(3000), ch.y - 0.3), P(ch.X(3000), ch.y + 1.4), color=JUSTE, stroke_width=3)
        l3 = self.t("3 km", 36, JUSTE).move_to(P(ch.X(3000) - 0.35, ch.y - 0.55))
        q = self.t("Quand marchera-t-il 3 km ?", 40, WHITE, larg=6.4).move_to(P(3.2, 1.9))
        self.play(FadeIn(ly, shift=DOWN * 0.15), Create(but), FadeIn(l3, scale=1.3), FadeIn(q, shift=UP * 0.1),
                  run_time=0.45)
        self.au_mot("lycée")
        self.play(Indicate(ly, color=JUSTE, scale_factor=1.12), Indicate(l3, color=JUSTE), run_time=0.5)
        self.attendre_voix(marge=0.5)

    # ── 02 : la formule, chaque morceau relié au dessin ────────────────────

    CH2 = (-2.62, 0.0087, -1.85)

    def ecran_formule(self):
        self.nouvel_ecran("02-formule")
        l1 = self.calcul([("uₙ :", TERME, "u indice n"), ("la distance marchée", WHITE, "la distance"),
                          ("(en m),", GREY_A, "en mètres")], 3.15, x=0, fs=38, centre=True)
        l2 = self.calcul([("n", WHITE, "n semaines"), ("semaines après le début", WHITE, None)], 2.52, x=0, fs=38,
                         centre=True, buff=0.15)
        l3 = self.calcul([("la suite commence à", GREY_A, "commence"), ("u₀", TERME, "u indice 0")], 1.95, x=0,
                         fs=32, centre=True, buff=0.15)
        f = self.calcul([("uₙ =", WHITE, "u indice n égale"), ("400", TERME, "400"), ("+", WHITE, None),
                         ("150", RAISON, "150"), ("n", WHITE, None)], 0.75, x=0, fs=66, centre=True, buff=0.25)
        self.play(Circumscribe(f[4], color=WHITE, buff=0.08), Circumscribe(l2[0], color=WHITE, buff=0.08),
                  run_time=0.6)
        ch = Chemin(*self.CH2)
        sol = ch.sol(0, 870)
        b0 = ch.barre(0, 400, TERME)
        pieces = [ch.barre(400 + R * k, 400 + R * (k + 1), RAISON) for k in range(3)]
        mar = marcheur(0.6).move_to(P(ch.X(0) - 0.45, ch.y + 0.13), aligned_edge=DOWN)
        self.play(Create(sol), FadeIn(mar), run_time=0.3)
        self.au_mot("400, c'est")
        fl0 = self.fleche(f[1].get_bottom(), b0.get_top(), TERME)
        e0 = VGroup(self.t("400 m :", 34, TERME), self.t("la distance au départ", 34, WHITE)).arrange(RIGHT, buff=0.15)
        e0.next_to(b0, DOWN, buff=0.22).align_to(P(ch.X(0) - 0.6, 0), LEFT)
        self.play(GrowArrow(fl0), Indicate(f[1], color=TERME, scale_factor=1.15), GrowFromEdge(b0, LEFT),
                  FadeIn(e0[0], scale=1.3), run_time=0.5)
        self.au_mot("la distance au départ")
        self.play(FadeIn(e0[1], shift=UP * 0.1), run_time=0.35)
        self.au_mot("150, c'est")
        fl1 = self.fleche(f[3].get_bottom(), pieces[0].get_top(), RAISON)
        e1 = VGroup(self.t("+ 150 m", 36, RAISON), self.t("chaque semaine", 34, WHITE)).arrange(
            DOWN, aligned_edge=LEFT, buff=0.1)
        e1.move_to(P(0, -0.55)).align_to(P(fl1.get_right()[0] + 0.15, 0), LEFT)
        self.play(GrowArrow(fl1), Indicate(f[3], color=RAISON, scale_factor=1.15), GrowFromEdge(pieces[0], LEFT),
                  FadeIn(e1[0], scale=1.3), run_time=0.5)
        self.au_mot("chaque semaine")
        self.play(FadeIn(e1[1], shift=UP * 0.1), run_time=0.3)
        for k in (1, 2):
            self.play(GrowFromEdge(pieces[k], LEFT), Flash(pieces[k], color=RAISON, line_length=0.15), run_time=0.3)
        self.attendre_voix(marge=0.5)

    # ── 03 : un terme est une valeur totale, pas un gain ───────────────────

    CH3 = (-5.6, 0.0052, 1.0)

    def ecran_terme(self):
        self.nouvel_ecran("03-terme")
        c = self.calcul([("u₁₀ =", WHITE, "u indice 10"), ("400", TERME, "400"), ("+", WHITE, None),
                         ("1 500", RAISON, "1 500"), ("=", WHITE, "égale"), ("1 900", JUSTE, "1 900")], 3.0, x=0,
                        fs=52, centre=True)
        ch = Chemin(*self.CH3, h=0.34)
        sol = ch.sol(0, 1900)
        b0 = ch.barre(0, 400, TERME)
        pieces = VGroup(*[ch.barre(400 + R * k, 400 + R * (k + 1), RAISON) for k in range(10)])
        mar = marcheur(0.7).move_to(P(ch.X(0), ch.y + ch.h / 2), aligned_edge=DOWN)
        self.play(Create(sol), GrowFromEdge(b0, LEFT), FadeIn(mar), run_time=0.35)
        self.au_mot("Ça veut dire")
        self.suivre("10")
        l1 = self.t("10 semaines après le début,", 38).move_to(P(0, -1.05))
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.25)
        for k, pc in enumerate(pieces):
            self.play(GrowFromEdge(pc, LEFT), mar.animate.move_to(P(ch.X(400 + R * (k + 1)), ch.y + ch.h / 2),
                                                                  aligned_edge=DOWN), run_time=0.08, rate_func=linear)
        self.au_mot("Bastien marche")
        l2 = VGroup(self.t("Bastien marche", 40, WHITE), self.t("1 900 m", 44, JUSTE)).arrange(RIGHT, buff=0.22)
        l2.move_to(P(0, -1.75))
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.3)
        self.suivre("1 900")
        acc = BraceBetweenPoints(P(ch.X(1900), ch.y + 0.3), P(ch.X(0), ch.y + 0.3), color=JUSTE)
        tot = self.t("u₁₀ = 1 900 m", 36, JUSTE).next_to(acc, UP, buff=0.1)
        cad = self.encadre(l2[1], JUSTE, 0.1)
        self.play(FadeIn(l2[1], scale=1.3), Create(cad), GrowFromCenter(acc), FadeIn(tot), run_time=0.45)
        self.au_mot("Ce n'est pas")
        faux = self.t("u₁₀ = 1 500 m", 38, PIEGE).move_to(P(-3.0, -2.75))
        cx = self.barrer(faux)
        self.play(FadeIn(faux, shift=UP * 0.1), run_time=0.3)
        self.play(Create(cx), run_time=0.3)
        self.au_mot("il a gagné", n=2)
        acg = BraceBetweenPoints(P(ch.X(400), ch.y - 0.3), P(ch.X(1900), ch.y - 0.3), color=RAISON)
        gain = self.t("il a gagné 1 500 m", 34, RAISON).next_to(acg, DOWN, buff=0.1)
        self.play(GrowFromCenter(acg), FadeIn(gain, shift=UP * 0.1), Indicate(pieces, color=RAISON), run_time=0.5)
        self.attendre_voix(marge=0.5)

    # ── 04 : question-pause n° 1 : que veut dire 120 ? → B ──────────────────

    def ecran_question1(self):
        l1 = self.t("Une médiathèque possède", 38)
        l2 = Morceaux([("wₙ = 2 000", TERME, "2 000"), ("+ 120n", RAISON, "120"), ("livres,", WHITE, "livres"),
                       ("en 2026 + n.", WHITE, "2026")], fs=38)
        l3 = Morceaux([("Que veut dire le nombre", RAISON, "Que veut dire"), ("120 ?", RAISON, "120")], fs=38)
        q = self.poser_question("04-question", [(l1, "Une médiathèque"), (l2, None), (l3, None)],
                                ["le nombre de livres en 2026", "le nombre de livres ajoutés chaque année",
                                 "le nombre d'années écoulées"], 1, largeur=12.0, fs=35)
        self.dire("04b-reponse")
        self.q_reponse(q, 1)
        self.au_mot("Le nombre devant n")
        self.play(Circumscribe(l2.nombres[1], color=RAISON, buff=0.08), run_time=0.6)
        self.au_mot("la raison")
        rr = VGroup(self.t("la raison r :", 38, JUSTE), self.t("ce qui s'ajoute chaque année", 38, JUSTE)).arrange(
            RIGHT, buff=0.25)
        rr.move_to(P(-0.4, q.cartes.get_bottom()[1] - 0.5))
        self.play(FadeIn(rr[0], scale=1.3), run_time=0.3)
        self.au_mot("s'ajoute")
        self.play(FadeIn(rr[1], shift=UP * 0.1), run_time=0.35)
        self.insister(rr, 1.08)
        self.attendre_voix(marge=0.5)

    # ── 05 : le seuil : 400 + 150n ≥ 3 000 ─────────────────────────────────

    CH5 = (0.75, 4.75 / 3000, -0.2)

    def ecran_seuil(self):
        self.nouvel_ecran("05-seuil")
        self.calcul([("Et les 3 km,", JAUNE_TITRE, "3 kilomètres"), ("soit 3 000 m ?", JAUNE_TITRE, "3 000")], 3.15,
                    x=0, fs=46, centre=True)
        ch = Chemin(*self.CH5)
        sol = ch.sol(0, 3000)
        b0 = ch.barre(0, 400, TERME)
        mar = marcheur(0.6).move_to(P(ch.X(400), ch.y + ch.h / 2), aligned_edge=DOWN)
        ly = lycee(0.8).move_to(P(ch.X(3000) - 0.25, ch.y + 1.15))
        but = DashedLine(P(ch.X(3000), ch.y - 0.45), P(ch.X(3000), ch.y + 0.5), color=JUSTE, stroke_width=3)
        l3 = self.t("3 000 m", 30, JUSTE).next_to(but, DOWN, buff=0.1)
        self.play(Create(sol), FadeIn(b0), FadeIn(mar), FadeIn(ly), Create(but), FadeIn(l3), run_time=0.4)
        self.calcul([("400", TERME, "400"), ("+ 150n", RAISON, "150"), ("≥ 3 000", JUSTE, "supérieur")], 1.8, x=-6.2,
                    fs=46)
        self.calcul([("150n", RAISON, "150"), ("≥ 2 600", WHITE, "2 600")], 0.85, x=-6.2, fs=46)
        self.calcul([("n ≥", WHITE, "donc n"), ("2 600", WHITE, "2 600"), ("÷ 150", WHITE, "150")], -0.1, x=-6.2,
                    fs=46)
        pieces = VGroup(*[ch.barre(400 + R * k, min(400 + R * (k + 1), 400 + R * 17.33), RAISON) for k in range(18)])
        self.play(LaggedStart(*[GrowFromEdge(p, LEFT) for p in pieces], lag_ratio=0.5),
                  mar.animate.move_to(P(ch.X(2999), ch.y + ch.h / 2), aligned_edge=DOWN), run_time=0.9,
                  rate_func=linear)
        r = self.calcul([("n ≈", RAISON, "environ"), ("17,3", RAISON, "17,3")], -1.1, x=-6.2, fs=52)
        cad = self.encadre(r, RAISON, 0.14)
        self.play(Create(cad), run_time=0.3)
        self.attendre_voix(marge=0.5)

    # ── 06 : le piège : arrondir à 17 ──────────────────────────────────────

    CH6 = (-4.9 - 0.011 * 2400, 0.011)

    def rangee(self, ch, d, y):
        """Une rangée zoomée : la barre de 2 360 m à d (coupée « // » au début)."""
        b = Rectangle(width=ch.X(d) - ch.X(2360), height=0.34, fill_color=TERME, fill_opacity=1, stroke_width=0)
        b.move_to(P((ch.X(d) + ch.X(2360)) / 2, y))
        coupe = VGroup(*[Line(P(-5.05 + dx, y - 0.26), P(-4.9 + dx, y + 0.26), stroke_color=BLACK, stroke_width=7)
                         for dx in (0, 0.13)])
        return VGroup(b, coupe)

    def ecran_piege(self):
        self.nouvel_ecran("06-piege")
        self.titre("Le piège !", PIEGE, 48, extrait="piège")
        ch = Chemin(*self.CH6, 0)
        self.au_mot("Arrondir")
        arr = self.calcul([("Arrondir à", PIEGE, None), ("17 ?", PIEGE, "17")], 2.35, x=-6.2, fs=38)
        x3 = ch.X(3000)
        but = DashedLine(P(x3, 1.95), P(x3, -0.95), color=JUSTE, stroke_width=3)
        l3 = self.t("3 000 m", 30, JUSTE).next_to(but, UP, buff=0.1)
        ly = lycee(0.62).move_to(P(5.55, 2.5))
        self.play(Create(but), FadeIn(l3), FadeIn(ly), run_time=0.35)
        self.au_mot("u indice 17")
        r17 = self.rangee(ch, 2950, 1.35)
        n17 = self.t("u₁₇", 36, TERME).next_to(r17[0], LEFT, buff=0.2)
        self.play(FadeIn(n17), GrowFromEdge(r17[0], LEFT), FadeIn(r17[1]), run_time=0.45)
        self.calcul([("u₁₇ =", WHITE, None), ("400 + 2 550", WHITE, "400"), ("= 2 950", WHITE, "2 950")], 0.62,
                    x=-5.3, fs=36)
        self.au_mot("il manque")
        trou = Rectangle(width=x3 - ch.X(2950), height=0.34, stroke_color=PIEGE, stroke_width=4).move_to(
            P((x3 + ch.X(2950)) / 2, 1.35))
        self.play(Create(trou), run_time=0.3)
        self.calcul([("il manque", PIEGE, None), ("50 m", PIEGE, "50")], 1.35, x=2.15, fs=36)
        self.play(Create(self.barrer(arr)), run_time=0.3)
        self.au_mot("u indice 18")
        r18 = self.rangee(ch, 3100, -0.45)
        n18 = self.t("u₁₈", 36, TERME).next_to(r18[0], LEFT, buff=0.2)
        self.play(FadeIn(n18), GrowFromEdge(r18[0], LEFT), FadeIn(r18[1]), run_time=0.45)
        self.calcul([("u₁₈ =", WHITE, None), ("3 100 :", JUSTE, "3 100"), ("ça y est", JUSTE, "ça y est")], -1.15,
                    x=-5.3, fs=38)
        self.play(Flash(P(x3, -0.45), color=JUSTE, line_length=0.25), run_time=0.4)
        self.au_mot("On prend")
        p1 = self.t("On prend le premier entier qui convient :", 34).move_to(P(-0.6, -2.05))
        self.play(FadeIn(p1, shift=UP * 0.1), run_time=0.35)
        self.au_mot("18 semaines")
        p2 = self.t("18 semaines après le début", 42, JUSTE).move_to(P(-0.6, -2.8))
        cad = self.encadre(p2, JUSTE, 0.14)
        self.play(FadeIn(p2, scale=1.2), Create(cad), run_time=0.4)
        self.insister(VGroup(p2, cad), 1.08)
        self.attendre_voix(marge=0.5)

    # ── 07 : l'indice → une date ───────────────────────────────────────────

    def frise(self, n0, derniere, y):
        """Les cases uₙ₀ … u₇ (noms AU-DESSUS), la 1re et la dernière portent
        leur année ; les autres restent vides."""
        xs = [-5.4 + 1.55 * k for k in range(n0, 8)]
        vals = ["2026"] + [""] * (len(xs) - 2) + [derniere]
        lg = LigneTermes(vals, xs=xs, centre=P(0, y), largeur=1.3, hauteur=0.75, fs=30,
                         noms=[u(k) for k in range(n0, 8)], fs_noms=30)
        for c, nm in zip(lg.cases, lg.noms):
            nm.next_to(c[0], UP, buff=0.1)
        return lg

    def sauts_frise(self, lg, couleur=RAISON):
        for k in range(len(lg.cases) - 1):
            a, b = lg.cases[k][0].get_bottom() + DOWN * 0.08, lg.cases[k + 1][0].get_bottom() + DOWN * 0.08
            fl = CurvedArrow(a, b, angle=4 * np.arctan(2 * 0.22 / np.linalg.norm(b - a)), color=couleur,
                             stroke_width=4, tip_length=0.14)
            self.play(Create(fl), run_time=0.13)

    def ecran_annee(self):
        self.nouvel_ecran("07-annee")
        self.titre("L'indice → une date", JAUNE_TITRE, 46, extrait="traduit")
        la = self.frise(0, "2033", 0.95)
        self.calcul([("Si u₀ correspond à", WHITE, "Si u indice 0"), ("2026 :", TERME, "2026")], 2.3, x=-6.2, fs=38,
                    avec=[*[FadeIn(c[0]) for c in la.cases], *[FadeIn(n) for n in la.noms], FadeIn(la.cases[0][1])])
        self.au_mot("u indice 7")
        self.sauts_frise(la)
        self.suivre("2033")
        self.play(FadeIn(la.cases[-1][1], scale=1.4), *self.allumer_cases(la, [len(la.cases) - 1]), run_time=0.4)
        self.insister(la.cases[-1], 1.15)
        lb = self.frise(1, "2032", -1.75)
        self.calcul([("Si la suite commence à u₁ en", WHITE, "Mais si"), ("2026 :", TERME, "2026")], -0.4, x=-6.2,
                    fs=38, avec=[*[FadeIn(c[0]) for c in lb.cases], *[FadeIn(n) for n in lb.noms],
                                 FadeIn(lb.cases[0][1])])
        self.au_mot("u indice 7", n=2)
        self.sauts_frise(lb)
        self.suivre("2032")
        self.play(FadeIn(lb.cases[-1][1], scale=1.4), *self.allumer_cases(lb, [len(lb.cases) - 1], RAISON),
                  run_time=0.4)
        self.play(Indicate(la.cases[-1], color=JUSTE, scale_factor=1.12),
                  Indicate(lb.cases[-1], color=RAISON, scale_factor=1.12), run_time=0.5)
        self.attendre_voix(marge=0.5)

    # ── 08 : le motif en T ─────────────────────────────────────────────────

    XS_T = (-4.0, -0.6, 3.4)

    def ecran_motif(self):
        self.nouvel_ecran("08-motif")
        self.titre("Un motif se lit comme une suite", JAUNE_TITRE, 44, extrait="Un motif")
        self.au_mot("Clara")
        cl = clara(0.75).move_to(P(-5.95, 1.45))
        self.play(FadeIn(cl, shift=UP * 0.15), run_time=0.35)
        ts = [motif_t(k, 0.4, x, 1.95) for k, x in zip((1, 2, 3), self.XS_T)]
        lg = LigneTermes([str(v) for v in T_ETAPES], xs=self.XS_T, centre=P(0, -0.75), largeur=1.45, hauteur=0.85,
                         fs=50)
        etapes = [self.t(f"étape {k}", 38, GREY_A).move_to(P(x, 0.12)) for k, x in zip((1, 2, 3), self.XS_T)]
        self.au_mot("T en petits")
        self.play(LaggedStart(*[GrowFromCenter(c) for c in ts[0][0]], lag_ratio=0.15), run_time=0.5)
        for k in range(3):
            self.au_mot("Étape", n=k + 1)
            self.suivre(str(k + 1))
            anims = [FadeIn(etapes[k], shift=UP * 0.1)]
            if k:
                anims.insert(0, TransformFromCopy(VGroup(*ts[k - 1][0], *ts[k - 1][1]), ts[k][0]))
            self.play(*anims, run_time=0.35)
            if k:
                self.play(LaggedStart(*[GrowFromCenter(c) for c in ts[k][1]], lag_ratio=0.2), run_time=0.3)
            self.suivre(str(T_ETAPES[k]))
            self.montrer_case(lg, k, run_time=0.3)
        self.au_mot("On ajoute")
        self.suivre("3")
        for k in (0, 1):
            lg.sauts[k] = lg.saut(k, "+ 3", fs=40)
        self.play(*[Create(x[0]) for x in lg.sauts.values()], run_time=0.3)
        self.play(*[FadeIn(x[1], scale=1.4) for x in lg.sauts.values()], run_time=0.2)
        self.au_mot("un de chaque côté")
        self.play(*[Flash(c, color=RAISON, line_length=0.2, num_lines=8) for k in (1, 2) for c in ts[k][1][:2]],
                  *[Indicate(ts[k][1][:2], color=RAISON, scale_factor=1.2) for k in (1, 2)], run_time=0.45)
        self.au_mot("un au pied")
        self.play(*[Flash(ts[k][1][2], color=RAISON, line_length=0.2, num_lines=8) for k in (1, 2)],
                  *[Indicate(ts[k][1][2], color=RAISON, scale_factor=1.3) for k in (1, 2)], run_time=0.45)
        f = self.calcul([("uₙ =", WHITE, "u indice n égale"), ("4", TERME, "4"), ("+ 3 ×", RAISON, "3 fois"),
                         ("(n −", WHITE, "n moins"), ("1)", WHITE, "1")], -2.85, x=-0.8, fs=46, centre=True)
        cad = self.encadre(f, JAUNE_TITRE, 0.14)
        self.play(Create(cad), run_time=0.3)
        self.insister(VGroup(f, cad), 1.08)
        self.attendre_voix(marge=0.5)

    # ── 09 : question-pause n° 2 : l'étape à 61 carreaux → C ───────────────

    def petits_t(self):
        """Les trois T (étapes 1, 2, 3) en petit, au bas de l'écran « Question ! »."""
        g = VGroup(*[motif_t(k, 0.26, x, -1.2) for k, x in zip((1, 2, 3), (-3.6, -0.6, 2.8))])
        pts = self.t("…", 44, GREY_A).move_to(P(4.9, -1.6))
        self._petits_t = VGroup(g, pts)
        self.play(LaggedStart(*[FadeIn(t, shift=UP * 0.15) for t in g], lag_ratio=0.3), FadeIn(pts), run_time=0.5)

    def ecran_question2(self):
        self.place_coche = 0.8        # boutons courts : le texte garde sa taille
        q = self.poser_question("09-question",
                                [(self.t("Quelle étape du T utilise", 40), "Quelle étape"),
                                 (Morceaux([("exactement", RAISON, "exactement"), ("61 carreaux ?", RAISON, "61")], fs=40), None)],
                                ["l'étape 61", "l'étape 21", "l'étape 20"], 2, en_ligne=True, largeur=4.0, fs=46,
                                dessin=self.petits_t)
        self.dire("09b-reponse")
        self.play(FadeOut(self._petits_t), run_time=0.25)
        self.q_reponse(q, 2)
        y0 = q.cartes.get_bottom()[1] - 0.6
        self.calcul([("4", WHITE, "4 plus"), ("+ 3 ×", WHITE, "3 fois"), ("(n −", WHITE, "n moins"), ("1)", WHITE, "1"),
                     ("= 61", WHITE, "61")], y0, x=0, fs=40, centre=True)
        self.calcul([("3 ×", WHITE, "3 fois"), ("(n −", WHITE, "n moins"), ("1)", WHITE, "1"), ("= 57", WHITE, "57")], y0 - 0.8, x=0,
                    fs=40, centre=True)
        self.calcul([("n −", WHITE, "donc n"), ("1", WHITE, "1"), ("= 19", WHITE, "19")], y0 - 1.6, x=0, fs=40, centre=True)
        r = self.calcul([("n = 20", JUSTE, "20")], y0 - 2.45, x=0, fs=48, centre=True)
        cad = self.encadre(r, JUSTE, 0.14)
        self.play(Create(cad), run_time=0.3)
        self.insister(VGroup(r, cad), 1.12)
        self.attendre_voix(marge=0.5)

    # ── 10 : le défi : la croix et ses 150 carreaux ────────────────────────

    XS_CROIX = (-4.3, -0.9, 2.7)

    def ecran_defi(self):
        self.nouvel_ecran("10-defi")
        self.titre("À toi de jouer !", JAUNE_TITRE, 48, extrait="À toi")
        cx = [motif_croix(k, 0.3, x, 1.65) for k, x in zip((1, 2, 3), self.XS_CROIX)]
        self.au_mot("croix")
        self.play(LaggedStart(*[GrowFromCenter(c) for c in cx[0][0]], lag_ratio=0.15), run_time=0.45)
        for k in range(3):
            self.au_mot("étape", n=k + 1)
            self.suivre(str(k + 1))
            avec = [TransformFromCopy(VGroup(*cx[k - 1][0], *cx[k - 1][1]), cx[k][0])] if k else []
            self.calcul([(f"étape {k + 1} :", GREY_A, None)], 0.2, x=self.XS_CROIX[k], fs=36, centre=True, avec=avec)
            avec = [LaggedStart(*[GrowFromCenter(c) for c in cx[k][1]], lag_ratio=0.15)] if k else []
            self.calcul([(f"{CROIX[k]} carreaux", WHITE, str(CROIX[k]))], -0.26, x=self.XS_CROIX[k], fs=36,
                        centre=True, avec=avec)
        self.au_mot("Tu as")
        tas = VGroup(*[carreau(-4.6 + 0.26 * (i % 4), -1.14 + 0.26 * (i // 4), 0.24, RAISON if i % 3 else TERME)
                       for i in range(8)])
        self.calcul([("Tu as", WHITE, None), ("150 carreaux.", RAISON, "150")], -1.01, x=-3.4, fs=40,
                    avec=[LaggedStart(*[FadeIn(c, shift=DOWN * 0.2) for c in tas], lag_ratio=0.1)])
        self.au_mot("Quelle est")
        q = self.paragraphe(["Quelle est la plus grande étape", "que tu peux construire entièrement ?"], 36,
                            buff=0.12, y=-2.0)
        self.play(FadeIn(q, shift=UP * 0.1), run_time=0.35)
        self.defi_pause(-3.05, x=-0.8)

    def ecran_correction(self):
        self.nouvel_ecran("10b-correction")
        self.titre("Correction", JUSTE, 48, extrait="Correction")
        cr = motif_croix(2, 0.42, -4.75, 0.85)
        self.play(FadeIn(cr), run_time=0.3)
        self.au_mot("4 carreaux")
        p4 = self.t("+ 4 carreaux", 36, RAISON).move_to(P(-4.75, -0.6))
        pe = self.t("à chaque étape", 32, WHITE).next_to(p4, DOWN, buff=0.1)
        self.play(FadeIn(p4, scale=1.3), FadeIn(pe, shift=UP * 0.1), run_time=0.35)
        self.au_mot("un au bout")
        self.play(*[Flash(c, color=RAISON, line_length=0.22, num_lines=8) for c in cr[1]],
                  Indicate(cr[1], color=RAISON, scale_factor=1.2), run_time=0.5)
        x = -2.4
        f = self.calcul([("uₙ =", WHITE, "u indice n égale"), ("5", TERME, "5 plus"), ("+ 4 ×", RAISON, "4 fois"),
                         ("(n −", WHITE, "n moins"), ("1)", WHITE, "1")], 1.85, x=x, fs=42)
        self.calcul([("u₃₇ =", WHITE, "u indice 37"), ("5", WHITE, "5 plus"), ("+ 144", WHITE, "144"), ("= 149 :", WHITE, "149"),
                     ("ça passe", JUSTE, "ça passe")], 0.8, x=x, fs=42)
        self.calcul([("u₃₈ =", WHITE, "u indice 38"), ("153 :", WHITE, "153"), ("c'est trop", PIEGE, "c'est trop")],
                    -0.25, x=x, fs=42)
        self.calcul([("La plus grande étape :", WHITE, "La plus grande")], -1.3, x=x, fs=42)
        r = self.calcul([("l'étape", JUSTE, "est l'étape"), ("37", JUSTE, "37")], -2.2, x=1.0, fs=48, centre=True)
        cad = self.encadre(r, JUSTE, 0.14)
        self.play(Create(cad), run_time=0.3)
        self.insister(VGroup(r, cad), 1.12)
        self.attendre_voix(marge=0.5)

    # ── 11 : ce que tu as appris ───────────────────────────────────────────

    def ecran_appris(self):
        fs = 38
        p1 = [VGroup(self.t("Dans", fs), self.t("uₙ = u₀ + rn :", fs, JAUNE_TITRE)).arrange(RIGHT, buff=0.2),
              VGroup(self.t("u₀", fs, TERME), self.t("= la valeur de départ,", fs)).arrange(RIGHT, buff=0.15),
              VGroup(self.t("r", fs, RAISON), self.t("= ce qui s'ajoute à chaque étape.", fs)).arrange(RIGHT, buff=0.15)]
        p2 = [VGroup(self.t("Un terme est une valeur totale,", fs), self.t("pas un gain.", fs, PIEGE)).arrange(
            RIGHT, buff=0.2)]
        p3 = [VGroup(self.t("Pour un seuil :", fs), self.t("le premier entier qui convient.", fs, JUSTE)).arrange(
            RIGHT, buff=0.2)]
        self.finale([(p1, ["Dans u", "est la valeur", "et r ce"]), (p2, ["Un terme"]), (p3, ["pour un seuil"])],
                    cle="11-finale")

    def construct(self):
        self.ecran_garde()
        self.ecran_situation()
        self.ecran_formule()
        self.ecran_terme()
        self.ecran_question1()
        self.ecran_seuil()
        self.ecran_piege()
        self.ecran_annee()
        self.ecran_motif()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_appris()
        self.fin("12-abonne")
