# suite_variation_spe.py
# EleveAI — Maths 1re spé (programme 2026) — paysage « Sens de variation d'une
# suite » (16:9), ceinture VERTE. Série SUITES, épisode 23.
# Micro du coach : suite_variation (lib/tutor-v4/questionBank/premiere-spe/maths/
# suites.bank.ts + suites-renfort.ts : « variation » (genVarExpl, genVarDiff,
# genVarAG), « varGraphe » ; indice H_VAR : « Étudie le signe de uₙ₊₁ − uₙ (ou
# compare uₙ₊₁ ÷ uₙ à 1 si les termes sont positifs) »).
#
# Ce que demande le coach → écran :
#   · la définition : uₙ₊₁ ≥ uₙ pour tout n (croissante), ≤ (décroissante)  → 02 ;
#   · le signe de uₙ₊₁ − uₙ (uₙ = n² + 3 ; uₙ₊₁ = uₙ − n² − 1)               → 03, 05 ;
#   · le quotient uₙ₊₁ ÷ uₙ comparé à 1 (termes strictement positifs)       → 04 ;
#   · géométrique : q ET le signe de u₀ ; q négatif : ni l'un ni l'autre   → 06, 07 ;
#   · « à partir de quel rang » : 3n − 10 ≥ 0 → n ≥ 4                      → 08, 08b.
# Clé de voix → écran :
#   00-garde (deux petits nuages : monte, descend) · 01 Rania, technicienne de
#   laboratoire : la dilution (÷ 2, 80 mg/L) · 02 définition (deux cartes) ·
#   03 méthode 1 (n² + 3 → 2n + 1) · 04 méthode 2 (× 0,5 : 80, 40, 20, 10) ·
#   05/05b question (C : décroissante) · 06 le piège (u₀ = −5, q = 2) ·
#   07/07b question (A : ni croissante ni décroissante) · 08/08b défi (rang 4) ·
#   09 « Ce que tu as appris » · 10 fin.
# Code couleur (module commun) : bleu = termes, orange = raison, écarts et
# quotient, vert = juste (croissante), rouge = piège ; violet = le rang n.
# Voix : manim/voix/premiere-spe-suite-variation.json (débit −6), calée mot à mot
# par suite_variation_spe_marques.json.
# Contrôle : AUDIT=1 BORDS=1 python -m manim render --dry_run …
# python -m manim render -qh --disable_caching manim/scripts/premiere/suite_variation_spe.py SuiteVariation1reSpe -o eleveai-maths-premiere-spe-suite-variation --media_dir manim/scripts/premiere/media-suite-variation-spe
# Sortie : manim/sorties/premiere-spe/maths/suites/23-variation/

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from suites_commun import *  # noqa: E402,F403
from suite_arith_graphique import OutilsGraphique  # noqa: E402  (ép. 07)
from suite_geo_reconnaitre import AuditMilliers  # noqa: E402  (ép. 09)
from suite_geo_terme_rang import OutilsEp12  # noqa: E402  (ép. 12)
from suite_geo_interpreter import SuiteGeoInterpreter1re as _E16  # noqa: E402  (ép. 16 : calc, fleche)
from suite_modeliser import SuiteModeliser1reSpe as _P21  # noqa: E402  (ép. 21 : ligne sans ligature)

# ── les affirmations de la voix, vérifiées ──────────────────────────────────
U3 = lambda n: n ** 2 + 3  # noqa: E731
assert all(U3(n + 1) - U3(n) == 2 * n + 1 > 0 for n in range(50))           # méthode 1 : croissante
C = [80, 40, 20, 10]
assert all(C[k + 1] / C[k] == 0.5 for k in range(3))                        # méthode 2 : 0,5 < 1
assert all(-(n ** 2) - 1 < 0 for n in range(50))                            # question 1 : C
G = [-5 * 2 ** k for k in range(3)]
assert G == [-5, -10, -20] and G[1] < G[0]                                  # le piège
Q2 = [6 * (-2) ** k for k in range(3)]
assert Q2 == [6, -12, 24]                                                   # question 2 : A
D = lambda n: 3 * n - 10  # noqa: E731
assert [n for n in range(20) if D(n) >= 0][0] == 4 and abs(10 / 3 - 3.33) < 0.01   # défi : rang 4
UD = [30]
for n in range(7):
    UD.append(UD[-1] + D(n))
assert UD == [30, 20, 13, 9, 8, 10, 15, 23]                                 # le nuage du défi (sans nombre)

RANG = "#A855F7"
PEAU, CHEVEUX, BLOUSE = "#8d5524", "#1f1300", "#F1F5F9"


# ── les dessins de l'épisode ────────────────────────────────────────────────

def rania(s=1.0):
    """Rania, technicienne de laboratoire : blouse blanche, lunettes, cheveux tressés."""
    tresse = RoundedRectangle(width=0.2, height=0.7, corner_radius=0.1, fill_color=CHEVEUX, fill_opacity=1,
                              stroke_width=0).move_to(P(0.28, 0.75))
    tete = Circle(radius=0.27, fill_color=PEAU, fill_opacity=1, stroke_width=0).move_to(P(0, 1.0))
    cheveux = Sector(radius=0.29, angle=PI, start_angle=0, fill_color=CHEVEUX, fill_opacity=1,
                     stroke_width=0).move_to(P(0, 1.16))
    lunettes = VGroup(*[Circle(radius=0.075, stroke_color="#7DD3FC", stroke_width=3).move_to(P(dx, 0.98))
                        for dx in (-0.1, 0.1)])
    blouse = RoundedRectangle(width=1.0, height=1.2, corner_radius=0.25, fill_color=BLOUSE, fill_opacity=1,
                              stroke_width=0).move_to(P(0, 0.1))
    col = Polygon(P(-0.16, 0.7), P(0.16, 0.7), P(0, 0.4), fill_color="#94A3B8", fill_opacity=1, stroke_width=0)
    poche = Rectangle(width=0.24, height=0.18, stroke_color="#94A3B8", stroke_width=2).move_to(P(-0.24, 0.1))
    stylo = Line(P(-0.2, 0.1), P(-0.2, 0.3), stroke_color=TERME, stroke_width=3)
    return VGroup(tresse, blouse, col, poche, stylo, tete, cheveux, lunettes).scale(s)


def flacon(k, s=1.0, couleur=TERME):
    """Un erlenmeyer ; le liquide a l'opacité k (la concentration)."""
    col = Rectangle(width=0.24, height=0.36, stroke_color=GREY_A, stroke_width=3).move_to(P(0, 0.53))
    corps = Polygon(P(-0.12, 0.35), P(0.12, 0.35), P(0.48, -0.5), P(-0.48, -0.5), stroke_color=GREY_A,
                    stroke_width=3, fill_opacity=0)
    liquide = Polygon(P(-0.3, -0.08), P(0.3, -0.08), P(0.44, -0.44), P(-0.44, -0.44), fill_color=couleur,
                      fill_opacity=k, stroke_width=0)
    g = VGroup(liquide, corps, col).scale(s)
    g.liquide = liquide
    return g


class MiniNuage(VGroup):
    """Un petit nuage de points SANS nombre (un coin d'axes, des points qui ne
    touchent pas les axes : 0,3 de marge). self.pts ; self.fleches(couleur)."""

    def __init__(self, vals, largeur, hauteur, centre, couleur=TERME, r=0.08, **kw):
        super().__init__(**kw)
        c = np.array(centre, dtype=float)
        x0, y0 = c[0] - largeur / 2, c[1] - hauteur / 2
        vmin, vmax = min(vals), max(vals)
        n = len(vals)
        self.G = lambda k, v: P(x0 + 0.35 + k * (largeur - 0.6) / max(n - 1, 1),  # noqa: E731
                                y0 + 0.3 + (v - vmin) / max(vmax - vmin, 1e-9) * (hauteur - 0.55))
        k = dict(buff=0, stroke_width=2.5, color=GREY_B, tip_length=0.14, max_tip_length_to_length_ratio=0.12)
        self.axes = VGroup(Arrow(P(x0, y0), P(x0 + largeur, y0), **k), Arrow(P(x0, y0), P(x0, y0 + hauteur), **k))
        self.pts = VGroup(*[Dot(self.G(i, v), radius=r, color=couleur) for i, v in enumerate(vals)])
        self.add(self.axes, self.pts)

    def fleches(self, couleur, sw=4):
        """Une petite flèche d'un point au suivant."""
        return VGroup(*[Arrow(a.get_center(), b.get_center(), buff=0.13, stroke_width=sw, color=couleur,
                              tip_length=0.13, max_tip_length_to_length_ratio=0.4)
                        for a, b in zip(self.pts, self.pts[1:])])


class Bords6:
    """Le contrôle des 6 % de marge latérale (paysage et short)."""

    def play(self, *a, **k):
        """BORDS6=1 : signale tout objet à moins de 6 % des bords GAUCHE et DROIT (Ti-Margo excepté)."""
        super().play(*a, **k)
        if os.environ.get("BORDS6"):
            lx = config.frame_width * 0.44
            vus = self.__dict__.setdefault("_vus6", set())
            for mob in self.mobjects:
                if mob is getattr(self, "_margo", None) or type(mob).__name__.startswith("Mascotte"):
                    continue
                for f in [mob, *mob.submobjects]:
                    if not f.has_points() and not f.submobjects or f.get_fill_opacity() < 0.05 and f.get_stroke_opacity() < 0.05:
                        continue
                    g, d = f.get_left()[0], f.get_right()[0]
                    if g < -lx - 1e-3 or d > lx + 1e-3:
                        cle = (getattr(self, "_cle_voix", "?"), type(f).__name__, round(g, 2), round(d, 2))
                        if cle not in vus:
                            vus.add(cle)
                            print(f"BORD6 {cle}", flush=True)


class SuiteVariation1reSpe(Bords6, AuditMilliers, OutilsEp12, OutilsGraphique, PaysageSuites):
    fichier_marques = "suite_variation_spe_marques.json"
    nom_voix = "premiere-spe-suite-variation"
    identite = "Maths 1re spé — EleveAI"
    ceinture = "verte"
    largeur_texte = 12.0          # 6 % de marge latérale (rien au-delà de x = ±6,25)
    k_allumer = 1.08
    calc = _E16.calc
    fleche = _E16.fleche
    ligne = _P21.ligne

    # ── 00 : la garde ──────────────────────────────────────────────────────

    def dessin_garde(self):
        """Deux petits nuages : l'un monte (vert), l'autre descend (orange)."""
        a = MiniNuage([1, 1.8, 2.5, 3.6, 4.4], 2.6, 1.15, P(-3.2, -0.95), TERME)
        b = MiniNuage([4.4, 3.4, 2.7, 1.8, 1.0], 2.6, 1.15, P(1.9, -0.95), TERME)
        self.play(FadeIn(a.axes), FadeIn(b.axes), run_time=0.3)
        self.play(LaggedStart(*[GrowFromCenter(p) for p in [*a.pts, *b.pts]], lag_ratio=0.1), run_time=0.7)
        self.play(LaggedStart(*[GrowArrow(f) for f in a.fleches(JUSTE)], lag_ratio=0.2),
                  LaggedStart(*[GrowArrow(f) for f in b.fleches(RAISON)], lag_ratio=0.2), run_time=0.7)

    def ecran_garde(self):
        self.garde("Sens de variation",
                   [("d'une suite", "d'une suite", TERME),
                    ("Comment prouver qu'une suite", "Comment prouver"),
                    ("monte toujours, ou descend toujours ?", "monte toujours")],
                   dessin=self.dessin_garde, extrait_titre="Sens de variation")

    # ── 01 : Rania, technicienne de laboratoire : la dilution ──────────────

    def flacons(self, ks, xs, y, s=1.0):
        return [flacon(k, s).move_to(P(x, y)) for k, x in zip(ks, xs)]

    def ecran_situation(self):
        self.nouvel_ecran("01-situation")
        x = -4.75
        pers = rania(0.9).move_to(P(x, 1.95))
        nom = self.t("Rania", 44, JAUNE_TITRE).move_to(P(x, 0.55))
        met = VGroup(self.t("technicienne", 30, TERME), self.t("de laboratoire", 30, TERME)).arrange(DOWN, buff=0.1)
        met.move_to(P(x, -0.25))
        self.au_mot("Rania")
        self.play(FadeIn(pers, shift=UP * 0.2), FadeIn(nom, shift=UP * 0.1), run_time=0.5)
        self.au_mot("technicienne")
        self.play(FadeIn(met, shift=UP * 0.1), run_time=0.3)
        xc, lc = 1.55, 8.9
        xs, yf = (-2.5, 0.05, 2.6, 5.15), -1.55
        fl = self.flacons([0.95, 0.5, 0.26, 0.13], xs, yf, 1.05)
        self.calc([("Elle dilue une solution :", WHITE, "Elle dilue")], 2.6, centre=xc, fs=38, larg=lc,
                  avec=[FadeIn(fl[0][1:], scale=0.9)])
        self.calc([("à chaque étape,", WHITE, "à chaque étape")], 2.0, centre=xc, fs=38, larg=lc,
                  avec=[LaggedStart(*[FadeIn(f[1:], scale=0.9) for f in fl[1:]], lag_ratio=0.25)])
        fls = [self.fleche(P(a + 0.6, yf), P(b - 0.6, yf), RAISON) for a, b in zip(xs, xs[1:])]
        labs = [self.t("÷ 2", 34, RAISON).next_to(f, UP, buff=0.12) for f in fls]
        self.calc([("la concentration est", WHITE, "la concentration"), ("divisée par 2", RAISON, "2")], 1.4,
                  centre=xc, fs=38, larg=lc, avec=[*[GrowArrow(f) for f in fls], *[FadeIn(l, scale=1.3) for l in labs]])
        self.play(LaggedStart(*[FadeIn(f.liquide) for f in fl[1:]], lag_ratio=0.3), run_time=0.8)
        lab80 = self.t("80 mg/L", 36, TERME).next_to(fl[0], DOWN, buff=0.22)
        self.suivre("80")
        self.play(FadeIn(fl[0].liquide), FadeIn(lab80, scale=1.3), run_time=0.35)
        self.insister(lab80, 1.15)
        self.attendre_voix(marge=0.5)

    # ── 02 : la définition : deux cartes ───────────────────────────────────

    def carte_def(self, x, couleur, titre, vals, extrait, formule, ex_formule, n_tout):
        cd = self.carte(6.0, 4.9, P(x, 0.6), couleur)
        tit = self.t(titre, 44, couleur).move_to(P(x, 2.55))
        nu = MiniNuage(vals, 4.4, 2.2, P(x, 0.75), TERME, r=0.09)
        self.au_mot(extrait)
        self.play(FadeIn(cd), FadeIn(tit, shift=DOWN * 0.1), FadeIn(nu.axes), run_time=0.4)
        return cd, tit, nu

    def ecran_definition(self):
        self.nouvel_ecran("02-definition")
        xg, xd = -3.2, 3.2
        cg, tg, ng = self.carte_def(xg, JUSTE, "Croissante", [1, 2.1, 2.1, 3.3, 4.4], "croissante", None, None, 1)
        self.au_mot("chaque terme")
        self.play(LaggedStart(*[GrowFromCenter(p) for p in ng.pts], lag_ratio=0.25), run_time=0.8)
        fg = ng.fleches(JUSTE)
        self.au_mot("plus grand")
        self.play(LaggedStart(*[GrowArrow(f) for f in fg], lag_ratio=0.25), run_time=0.7)
        self.au_mot("ou égal")
        plat = Line(ng.pts[1].get_center(), ng.pts[2].get_center(), stroke_color=JAUNE_TITRE, stroke_width=8)
        self.play(Create(plat), Indicate(VGroup(ng.pts[1], ng.pts[2]), color=JAUNE_TITRE, scale_factor=1.6),
                  run_time=0.45)
        self.calc([("uₙ₊₁ ≥ uₙ", TERME, "u indice n plus 1 supérieur")], -0.85, centre=xg, fs=50, larg=5.4)
        self.calc([("pour tout n", WHITE, "pour tout n")], -1.45, centre=xg, fs=36, larg=5.4)
        cd, td, nd = self.carte_def(xd, RAISON, "Décroissante", [4.4, 3.5, 2.6, 1.8, 1.0], "décroissante", None,
                                    None, 2)
        fd = nd.fleches(RAISON)
        self.play(LaggedStart(*[GrowFromCenter(p) for p in nd.pts], lag_ratio=0.2),
                  LaggedStart(*[GrowArrow(f) for f in fd], lag_ratio=0.2), run_time=0.8)
        self.calc([("uₙ₊₁ ≤ uₙ", TERME, "u indice n plus 1 inférieur")], -0.85, centre=xd, fs=50, larg=5.4)
        self.calc([("pour tout n", WHITE, "pour tout n")], -1.45, centre=xd, fs=36, larg=5.4)
        self.attendre_voix(marge=0.5)

    # ── 03 : méthode 1 : le signe de uₙ₊₁ − uₙ ──────────────────────────────

    def ecran_difference(self):
        self.nouvel_ecran("03-difference")
        self.calc([("Méthode 1 :", JAUNE_TITRE, "1"), ("le signe de", WHITE, "le signe"),
                   ("uₙ₊₁ − uₙ", TERME, "u indice n plus 1 moins")], 3.2, centre=0, fs=46, larg=12)
        xg, lg = -2.55, 7.2
        nu = MiniNuage([U3(n) for n in range(5)], 3.6, 3.2, P(3.55, -0.3), TERME, r=0.1)
        self.calc([("Exemple :", WHITE, "Par exemple"), ("uₙ =", TERME, "u indice n égale"),
                   ("n² + 3", WHITE, "3")], 1.9, centre=xg, fs=44, larg=lg,
                  avec=[FadeIn(nu.axes)])
        self.play(LaggedStart(*[GrowFromCenter(p) for p in nu.pts], lag_ratio=0.25), run_time=0.8)
        f = self.calc([("uₙ₊₁ − uₙ =", TERME, "u indice n plus 1 moins"), ("2n + 1", JUSTE, "2 n plus 1")], 0.75,
                      centre=xg, fs=52, larg=lg)
        self.play(Create(self.encadre(f, TERME, 0.18)), run_time=0.3)
        fl = nu.fleches(JUSTE, 5)
        self.calc([("c'est", WHITE, "c'est positif"), ("positif", JUSTE, None), ("pour tout n", WHITE, "pour tout n")],
                  -0.45, centre=xg, fs=44, larg=lg, avec=[LaggedStart(*[GrowArrow(a) for a in fl], lag_ratio=0.25)])
        c = self.calc([("La suite est", WHITE, "La suite est"), ("croissante", JUSTE, "croissante")], -1.6,
                      centre=xg, fs=48, larg=lg)
        self.play(Indicate(c[1], color=JUSTE, scale_factor=1.12), Indicate(nu.pts, color=JUSTE), run_time=0.5)
        self.attendre_voix(marge=0.5)

    # ── 04 : méthode 2 : le quotient comparé à 1 ───────────────────────────

    def ecran_quotient(self):
        self.nouvel_ecran("04-quotient")
        xs, yf = (-4.2, -1.4, 1.4, 4.2), -1.55
        fl = self.flacons([0.95, 0.5, 0.26, 0.13], xs, yf, 1.05)
        self.calc([("Méthode 2 :", JAUNE_TITRE, "2"), ("termes strictement positifs", WHITE, "strictement positifs")],
                  3.2, centre=0, fs=44, larg=12, avec=[LaggedStart(*[FadeIn(f, scale=0.9) for f in fl], lag_ratio=0.15)])
        self.calc([("on compare", WHITE, "on compare"), ("uₙ₊₁ ÷ uₙ", TERME, "u indice n plus 1 divisé"),
                   ("à 1", RAISON, "1")], 2.3, centre=0, fs=50, larg=12)
        fls = [self.fleche(P(a + 0.62, yf), P(b - 0.62, yf), RAISON) for a, b in zip(xs, xs[1:])]
        labs = [self.t("× 0,5", 32, RAISON).next_to(f, UP, buff=0.1) for f in fls]
        self.calc([("Rania :", JAUNE_TITRE, "dilution de Rania"), ("uₙ₊₁ ÷ uₙ =", TERME, "ce quotient"),
                   ("0,5", RAISON, "0,5")], 1.2, centre=0, fs=46, larg=12,
                  avec_morceau={2: [*[GrowArrow(f) for f in fls], *[FadeIn(l, scale=1.3) for l in labs]]})
        self.calc([("0,5 < 1", RAISON, "1"), ("→ la concentration est", WHITE, "La concentration"),
                   ("décroissante", JUSTE, "décroissante")], 0.25, centre=0, fs=40, larg=12)
        for f, v in zip(fl, C):
            lab = self.t(str(v), 40, TERME).next_to(f, DOWN, buff=0.2)
            self.suivre(str(v))
            self.play(FadeIn(lab, scale=1.4), Indicate(f.liquide, color=TERME, scale_factor=1.08), run_time=0.25)
        self.attendre_voix(marge=0.5)

    # ── les questions-pauses : boutons en colonne, les mots à la taille de la question ──

    def cartes_mots(self, textes, y, fs=40, largeur=11.0):
        corps = [self.t(c, fs, WHITE, 1e9) for c in textes]
        cartes = VGroup(*[self.bouton(Ln, c, largeur, fs) for Ln, c in zip("ABC", corps)]).arrange(DOWN, buff=0.18)
        cartes.move_to(P(0, y))
        return cartes

    # ── 05 : question-pause n° 1 : uₙ₊₁ = uₙ − n² − 1 → C (décroissante) ──

    def ecran_question1(self):
        cartes = self.cartes_mots(["croissante", "ni croissante ni décroissante", "décroissante"], -0.5)

        def e1():
            self.calc([("Pour tout n,", WHITE, "Pour tout n"), ("uₙ₊₁ = uₙ", TERME, "u indice n plus 1"),
                       ("− n² − 1", RAISON, "au carré moins 1")], 2.4, centre=0, fs=48, larg=12)
            self.calc([("La suite est :", JAUNE_TITRE, "La suite est")], 1.55, centre=0, fs=42, larg=12)

        q = self.question_libre("05-question", [e1], cartes, P(0, -2.55))
        self.dire("05b-reponse")
        self.au_mot("Réponse C")
        self.q_reponse(q, 2)
        c = self.calc([("uₙ₊₁ − uₙ =", TERME, "moins u indice n égale"), ("−n² − 1", RAISON, "au carré moins 1"),
                       (":", WHITE, None), ("négatif", PIEGE, "négatif"), ("pour tout n", WHITE, "pour tout n")],
                      -2.55, centre=-0.4, fs=42, larg=10.8)
        self.play(Indicate(c[3], color=PIEGE, scale_factor=1.15), run_time=0.4)
        self.attendre_voix(marge=0.6)

    # ── 06 : le piège : u₀ = −5 et q = 2 ───────────────────────────────────

    def ecran_piege(self):
        self.nouvel_ecran("06-piege")
        self.titre("Le piège !", PIEGE, 48, extrait="piège", y=3.2)
        self.calc([("Pour une suite géométrique,", WHITE, "Pour une suite géométrique")], 2.35, centre=0, fs=40,
                  larg=12)
        self.calc([("regarde", WHITE, "regarde"), ("q", RAISON, "q ET"), ("ET", JAUNE_TITRE, None),
                   ("le signe du premier terme", TERME, "le signe")], 1.7, centre=0, fs=40, larg=12)
        self.calc([("u₀ =", TERME, "u indice 0"), ("−5", WHITE, "5"), ("et", WHITE, None), ("q =", RAISON, "q égale"),
                   ("2", RAISON, "2")], 0.75, centre=0, fs=46, larg=12)
        lg = LigneTermes(["−5", "−10", "−20"], centre=P(-0.3, -0.45), pas=2.5, largeur=1.5, hauteur=0.9, fs=46)
        for k, v in enumerate(("5", "10", "20")):
            self.suivre(v)
            self.montrer_case(lg, k)
            if k < 2:
                self.sauter(lg, k, "× 2", cote=DOWN, fs=34)
        fd = Arrow(P(4.0, 0.0), P(5.1, -0.9), buff=0, stroke_width=7, color=PIEGE, max_tip_length_to_length_ratio=0.3)
        self.calc([("q > 1,", RAISON, "1"), ("et pourtant", WHITE, "et pourtant"),
                   ("la suite est décroissante !", PIEGE, "décroissante")], -2.4, centre=-0.4, fs=42, larg=11,
                  avec=[GrowArrow(fd)])
        self.play(*self.allumer_cases(lg, range(3), PIEGE), run_time=0.4)
        self.attendre_voix(marge=0.5)

    # ── 07 : question-pause n° 2 : u₀ = 6, uₙ₊₁ = −2 × uₙ → A ──────────────

    def ecran_question2(self):
        cartes = self.cartes_mots(["ni croissante ni décroissante", "croissante", "décroissante"], -0.5)

        def e1():
            self.calc([("u₀ =", TERME, "u indice 0"), ("6", WHITE, "6"), ("et", WHITE, None),
                       ("uₙ₊₁ =", TERME, "u indice n plus 1"), ("−2 × uₙ", RAISON, "2")], 2.4, centre=0, fs=48, larg=12)
            self.calc([("La suite est :", JAUNE_TITRE, "La suite est")], 1.55, centre=0, fs=42, larg=12)

        q = self.question_libre("07-question", [e1], cartes, P(0, -2.55))
        self.dire("07b-reponse")
        self.au_mot("Réponse A")
        self.q_reponse(q, 0)
        c = self.calc([("6 ;", WHITE, "6"), ("−12 ;", WHITE, "12"), ("24", WHITE, "24"), (":", WHITE, None),
                       ("le signe change", RAISON, "changent de signe")], -2.55, centre=-0.4, fs=44, larg=10.8)
        self.au_mot("montent")
        self.play(Indicate(c[1], color=JUSTE, scale_factor=1.2), run_time=0.35)
        self.au_mot("descendent")
        self.play(Indicate(c[2], color=RAISON, scale_factor=1.2), run_time=0.35)
        self.attendre_voix(marge=0.6)

    # ── 08 : le défi : uₙ₊₁ − uₙ = 3n − 10 ─────────────────────────────────

    def nuage_defi(self):
        nu = NuageTermes((0, 8.0), (0, 32), P(2.5, -0.95), P(5.55, 1.75), fs=30)
        nu.pts = VGroup(*[nu.point(n + 0.5, v, r=0.1) for n, v in enumerate(UD)])
        return nu

    def ecran_defi(self):
        self.nouvel_ecran("08-defi")
        tit = self.titre("À toi de jouer !", JAUNE_TITRE, 46, extrait="À toi", y=3.2)
        xg, lg = -2.5, 7.4
        nu = self.nuage_defi()
        l1 = self.calc([("Pour tout entier naturel n :", WHITE, "Pour tout entier")], 2.2, centre=xg, fs=38, larg=lg)
        f = self.calc([("uₙ₊₁ − uₙ =", TERME, "u indice n plus 1 moins"), ("3n − 10", RAISON, "10")], 1.3,
                      centre=xg, fs=50, larg=lg)
        cad = self.encadre(f, TERME, 0.18)
        self.play(Create(cad), Create(nu.ax_n), Create(nu.ax_u), FadeIn(nu.lab_n), FadeIn(nu.lab_u),
                  LaggedStart(*[GrowFromCenter(p) for p in nu.pts], lag_ratio=0.15), run_time=0.7)
        l3 = self.calc([("À partir de quel rang n", JAUNE_TITRE, "À partir de quel rang")], 0.15, centre=xg, fs=40,
                       larg=lg)
        qm = self.t("?", 56, RAISON).next_to(nu.pts[4], UP, buff=0.35)
        self.play(FadeIn(qm, scale=1.5), run_time=0.3)
        l4 = self.calc([("a-t-on", WHITE, "a-t-on"), ("uₙ₊₁ ≥ uₙ ?", TERME, "u indice n plus 1 supérieur")], -0.55,
                       centre=xg, fs=44, larg=lg)
        self.defi_pause(-1.85, x=-1.6)
        self._defi = (tit, nu, qm, [l1, l3, l4], f, cad)

    def ecran_correction(self):
        self.dire("08b-correction")
        tit, nu, qm, efface, f, cad = self._defi
        self.au_mot("Correction")
        cor = self.t("Correction", 46, JUSTE).move_to(tit)
        self.play(ReplacementTransform(tit, cor), *[FadeOut(m) for m in [*efface, f, cad, qm]], run_time=0.4)
        self.remove(*efface, f, cad, qm)
        xg, lg = -2.5, 7.4
        self.calc([("uₙ₊₁ ≥ uₙ", TERME, "u indice n plus 1 supérieur"), ("revient à", WHITE, "revient à")], 2.2,
                  centre=xg, fs=42, larg=lg)
        self.calc([("3n − 10 ≥", RAISON, "10"), ("0", RAISON, "0")], 1.45, centre=xg, fs=48, larg=lg)
        self.calc([("donc", WHITE, "donc"), ("n ≥", WHITE, None), ("10 ÷ 3", WHITE, "10 sur 3"),
                   ("≈ 3,33", RAISON, "3,33")], 0.6, centre=xg, fs=44, larg=lg)
        self.calc([("Le plus petit entier", WHITE, "Le plus petit entier")], -0.3, centre=xg, fs=42, larg=lg)
        c4 = self.calc([("qui convient :", WHITE, "qui convient"), ("4", JUSTE, "4")], -0.95, centre=xg, fs=42, larg=lg)
        self.play(c4[-1].animate.shift(RIGHT * 0.12), run_time=0.12)
        self.play(Create(self.encadre(c4[-1], JUSTE, 0.12)), run_time=0.3)
        x4 = nu.G(4.5, 0)[0]
        trait = DashedLine(P(x4, nu.G(0, 0)[1]), P(x4, nu.G(0, 30)[1]), color=JUSTE, stroke_width=3, dash_length=0.1)
        grad = nu.graduation_n(4.5, "4", fs=30)
        c = self.calc([("La suite est croissante", JUSTE, "la suite est croissante"), ("à partir du rang", JUSTE, "à partir"),
                       ("4", JUSTE, "4")], -1.95, centre=-0.3, fs=40, larg=11.6)
        self.play(Create(trait), FadeIn(grad), *[p.animate.set_color(JUSTE).scale(1.25) for p in nu.pts[4:]],
                  run_time=0.5)
        self.play(Indicate(c, color=JUSTE, scale_factor=1.05), run_time=0.45)
        self.attendre_voix(marge=0.6)

    # ── 09 : ce que tu as appris ───────────────────────────────────────────

    def ecran_appris(self):
        fs = 44
        tc = lambda s, d: Text(s, font_size=fs, color=WHITE, t2c=d)  # noqa: E731
        p1 = [tc("Sens de variation : on étudie", {"Sens de variation": JAUNE_TITRE}),
              tc("le signe de uₙ₊₁ − uₙ.", {"uₙ₊₁ − uₙ": TERME})]
        p2 = [tc("Termes positifs : on peut comparer", {"Termes positifs": JAUNE_TITRE}),
              tc("le quotient uₙ₊₁ ÷ uₙ à 1.", {"uₙ₊₁ ÷ uₙ": RAISON})]
        p3 = [tc("Suite géométrique : la raison q", {"Suite géométrique": JAUNE_TITRE, "raison q": RAISON}),
              tc("ET le signe du premier terme.", {"premier terme": TERME})]
        for l in p1 + p2 + p3:
            l._pas_audit = True
        self.finale([(p1, ["Pour le sens", "le signe"]), (p2, ["Pour des termes positifs", "à 1"]),
                     (p3, ["pour une suite géométrique", "et le signe"])], cle="09-finale")

    def construct(self):
        self.ecran_garde()
        self.ecran_situation()
        self.ecran_definition()
        self.ecran_difference()
        self.ecran_quotient()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_appris()
        self.fin("10-abonne")
