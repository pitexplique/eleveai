# suite_bornee.py
# EleveAI — Maths Terminale (spé) — paysage « Suite bornée » (16:9), ceinture
# VERTE. Série SUITES du lycée, épisode 31.
# Micro du coach : suite_bornee (notion suite_numerique) :
# lib/tutor-v4/questionBank/terminale-spe/maths/suites.bank.ts + suites-renfort.ts.
#
# Ce que demande le coach → écran :
#   · définitions majorée / minorée / bornée (fixed_1, h1, borneDef)  → 02 ;
#   · un majorant parmi des nombres : a − c/(n + 1) (majorant : « un
#     majorant doit dépasser TOUS les termes, même les derniers »)    → 03, 04 (C : 100) ;
#   · croissante donc minorée par u₀ (fixed_2)                        → 03 ;
#   · encadrement avec sin / cos (borneTrig : a + b sin(n))           → 05, 08 défi ;
#   · bornée n'est pas convergente : (−1)ⁿ (fixed_3)                  → 06-piege ;
#   · laquelle n'est PAS bornée (borneQuelle : √n, 5 × 0,8ⁿ, 2 cos(n)) → 07 (B : √n) ;
#   · majorée ne tend pas vers +∞ (open_1) : le plafond qui bloque    → 02, 03.
# Clé de voix → écran :
#   00-garde (le nuage des termes coincé entre un plafond et un plancher)
#   · 01 Clara, ingénieure du son : la scène, la platine du DJ, le niveau minute
#   par minute sous le trait rouge « au plus 102 dB » · 02 définitions : le
#   plafond M descend et bute sur le nuage, le plancher m monte, la bande ·
#   03 uₙ = 100 − 4/(n + 1) : le point qui monte et bute contre le plafond 100,
#   un 2e plafond (102), le plancher u₀ = 96 · 04/04b question (C : 100 ; u₇ =
#   99,5 passe les traits 98 et 99) · 05 vₙ = 4 + 2 sin(n) : le caisson de basses,
#   les points qui sautent entre 2 et 6 · 06 le piège : (−1)ⁿ bornée sans limite,
#   majorée par 100 sans atteindre 100 · 07/07b question (B : √n perce tous les
#   plafonds) · 08/08b défi wₙ = 7 − 3 cos(n) → 4 ≤ wₙ ≤ 10 · 09 « Ce que tu as
#   appris » · 10 fin.
# Code couleur (module commun) : bleu = termes, orange = les bornes (plafond,
# plancher) et les écarts, vert = juste, rouge = piège. ⛔ Pas de LaTeX.
# Voix : manim/voix/terminale-suite-bornee.json (débit −6), calée mot à mot
# par suite_bornee_marques.json.
# Contrôle : AUDIT=1 BORDS=1 python -m manim render --dry_run …
# python -m manim render -qh --disable_caching manim/scripts/terminale/suite_bornee.py SuiteBorneeTle -o eleveai-maths-terminale-suite-bornee --media_dir manim/scripts/terminale/media-suite-bornee
# Sortie : manim/sorties/terminale/maths/suites/31-bornee/

import math
import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI))
sys.path.insert(1, str(ICI.parent / "premiere"))

from suites_commun import *  # noqa: E402,F403

# ── les affirmations de la voix, vérifiées ──────────────────────────────────
SON = [100 - 4 / (n + 1) for n in range(40)]
assert all(x <= 100 for x in SON) and all(b > a for a, b in zip(SON, SON[1:]))  # majorée, croissante
assert SON[0] == 96 and abs(SON[7] - 99.5) < 1e-12                             # u₀ = 96 ; u₇ = 99,5
assert SON[7] > 99 > 98                                                        # question 1 : C (100)
BASSES = [4 + 2 * math.sin(n) for n in range(15)]
assert all(2 <= v <= 6 for v in BASSES)
assert max(abs(v - 4) for v in BASSES) > 1.9                                   # ne se stabilise jamais
ALT = [(-1) ** n for n in range(8)]
RAC = [math.sqrt(n) for n in range(26)]
assert RAC[25] == 5 and all(0 <= r for r in RAC)                               # question 2 : B (√n)
assert all(0 < 5 * 0.8 ** n <= 5 and -2 <= 2 * math.cos(n) <= 2 for n in range(200))
DEFI = [7 - 3 * math.cos(n) for n in range(15)]
assert all(4 <= w <= 10 for w in DEFI)                                         # le défi : 4 ≤ wₙ ≤ 10

PEAU, VESTE, CASQUE = "#c68642", "#be185d", "#e2e8f0"
INDICES = set("₀₁₂₃₄₅₆₇₈₉₊₋ₖₙₚ")
_GL = {}


def nb_glyphes(mot):
    """Le nombre de glyphes d'un mot (« fi », « ffi », « fl » : une ligature)."""
    if mot not in _GL:
        _GL[mot] = len(Text(mot, font_size=30))
    return _GL[mot]


def glyphes(texte):
    """Les caractères de chaque glyphe ('?' pour les glyphes d'une ligature)."""
    out = []
    for mot in texte.split():
        n = nb_glyphes(mot)
        out += list(mot) if n == len(mot) else ["?"] * n
    return out


def grossir_indices(t, texte, k=1.3):
    """Les indices Unicode (police de secours) sortent trop petits : chacun × k,
    et la suite de la ligne glisse d'autant (les espaces restent égales)."""
    car = glyphes(texte)
    gl = t.submobjects
    if len(gl) != len(car):
        return t
    for i, c in enumerate(car):
        if c in INDICES:
            w = gl[i].width
            gl[i].scale(k, about_edge=LEFT)
            d = gl[i].width - w
            for j in range(i + 1, len(gl)):
                gl[j].shift(RIGHT * d)
    return t


def clara(s=1.0):
    """Clara, ingénieure du son : un casque audio sur les oreilles, veste rose."""
    tete = Circle(radius=0.3, fill_color=PEAU, fill_opacity=1, stroke_width=0).move_to(P(0, 1.05))
    cheveux = Sector(radius=0.33, angle=PI, start_angle=0, fill_color="#3b1f0e", fill_opacity=1,
                     stroke_width=0).move_to(P(0, 1.22))
    arceau = Arc(radius=0.36, start_angle=0.1, angle=PI - 0.2, stroke_color=CASQUE, stroke_width=7).move_to(
        P(0, 1.27))
    ecout = VGroup(*[RoundedRectangle(width=0.16, height=0.28, corner_radius=0.06, fill_color=CASQUE,
                                      fill_opacity=1, stroke_width=0).move_to(P(dx, 1.02)) for dx in (-0.33, 0.33)])
    corps = RoundedRectangle(width=1.0, height=1.2, corner_radius=0.3, fill_color=VESTE, fill_opacity=1,
                             stroke_width=0).move_to(P(0, 0.12))
    return VGroup(corps, tete, cheveux, arceau, ecout).scale(s)


def enceinte(l=0.62, h=1.1):
    caisse = RoundedRectangle(width=l, height=h, corner_radius=0.06, fill_color="#1e293b", fill_opacity=1,
                              stroke_color=GREY_B, stroke_width=2)
    hp = Circle(radius=l * 0.32, stroke_color=GREY_A, stroke_width=3, fill_color="#334155",
                fill_opacity=1).move_to(caisse.get_center() + DOWN * h * 0.17)
    tw = Circle(radius=l * 0.12, stroke_color=GREY_A, stroke_width=2).move_to(caisse.get_center() + UP * h * 0.27)
    return VGroup(caisse, hp, tw)


def platine(l=2.4):
    """La table du DJ : deux platines qui tournent (g[1], g[2]) et une console."""
    table = RoundedRectangle(width=l, height=0.62, corner_radius=0.08, fill_color="#0f172a", fill_opacity=1,
                             stroke_color=GREY_B, stroke_width=2)
    disques = [VGroup(Circle(radius=0.24, stroke_color=GREY_A, stroke_width=3, fill_color="#111827",
                             fill_opacity=1),
                      Line(ORIGIN, UP * 0.2, stroke_color=RAISON, stroke_width=3)).move_to(
        table.get_center() + RIGHT * dx) for dx in (-0.75, 0.75)]
    curseurs = VGroup(*[Line(P(dx, -0.16), P(dx, 0.16), stroke_color=GREY_B, stroke_width=3)
                        for dx in (-0.18, 0, 0.18)]).move_to(table)
    return VGroup(table, *disques, curseurs)


def caisson(l=1.0):
    """Le caisson de basses : g[1] = la membrane (elle vibre)."""
    caisse = RoundedRectangle(width=l, height=l * 1.1, corner_radius=0.08, fill_color="#1e293b", fill_opacity=1,
                              stroke_color=GREY_B, stroke_width=2)
    mb = Circle(radius=l * 0.36, stroke_color=RAISON, stroke_width=4, fill_color="#334155", fill_opacity=1)
    return VGroup(caisse, mb.move_to(caisse), Dot(caisse.get_center(), radius=0.06, color=GREY_A))


def faisceau(sommet, angle, couleur, long=2.6, ouv=0.1):
    """Un faisceau de projecteur (triangle pâle) qui part du sommet."""
    d1 = np.array([math.sin(angle - ouv), -math.cos(angle - ouv), 0]) * long
    d2 = np.array([math.sin(angle + ouv), -math.cos(angle + ouv), 0]) * long
    return Polygon(sommet, sommet + d1, sommet + d2, stroke_width=0, fill_color=couleur, fill_opacity=0.3)


class SuiteBorneeTle(PaysageSuites):
    fichier_marques = "suite_bornee_marques.json"
    nom_voix = "terminale-suite-bornee"
    identite = "Maths Tle — EleveAI"
    ceinture = "verte"
    place_coche = 0.75

    # ── outils de l'épisode ────────────────────────────────────────────────

    def t(self, texte, fs=36, color=WHITE, larg=None, audit=True):
        """Comme le module commun, avec les indices agrandis (× 1,3)."""
        t = grossir_indices(Text(texte, font_size=fs, color=color), texte)
        larg = larg or self.largeur_texte
        if t.width > larg:
            t.scale_to_fit_width(larg)
        if not audit:
            t._pas_audit = True
        return t

    def construire(self, morceaux, fs=40, larg=None, ordre=None):
        """UNE ligne = UN seul Text (espaces régulières, même ligne de base),
        coupé en morceaux colorés [(texte, couleur, extrait), …] ; ordre : l'ordre
        de la voix (par défaut celui de la ligne)."""
        tout = self.t(" ".join(m for m, _, _ in morceaux), fs, WHITE, larg)
        g, i = VGroup(), 0
        for m, c, _ in morceaux:
            n = len(glyphes(m))
            g.add(VGroup(*tout.submobjects[i:i + n]).set_color(c))
            i += n
        g.extraits = [ex for _, _, ex in morceaux]
        g.ordre = ordre or list(range(len(morceaux)))
        return g

    def montrer(self, g, avec=(), rt=0.25, avec_k=None):
        """Chaque morceau quand la voix dit son extrait (None : avec le précédent) ;
        avec_k = {k: [animations]} : jouées avec le morceau k."""
        avec_k = avec_k or {}
        paquet = []

        def jouer(fin=()):
            anims = [FadeIn(g[k], shift=UP * 0.1) for k in paquet]
            for k in paquet:
                anims += list(avec_k.get(k, ()))
            self.play(*anims, *fin, run_time=rt if fin else 0.22)
        for k in g.ordre:
            ex = g.extraits[k]
            if ex is not None and paquet:
                jouer()
                paquet = []
            if ex is not None:
                self.suivre(ex)
            paquet.append(k)
        jouer(list(avec) or [Wait(0.01)])
        return g

    def ligne(self, morceaux, y, x=None, fs=40, avec=(), ordre=None, larg=None, avec_k=None, rt=0.25):
        g = self.construire(morceaux, fs, larg, ordre).move_to(P(0, y))
        if x is not None:
            g.align_to(P(x, 0), LEFT)
        return self.montrer(g, avec, rt=rt, avec_k=avec_k)

    def choix(self, pieces, fs=44):
        """Le corps d'un bouton en morceaux [(texte, extrait), …] : chaque
        morceau quand la voix le dit (q_montrer_choix → montrer_liste)."""
        g = self.construire([(m, WHITE, ex) for m, ex in pieces], fs, 1e9)
        g.nombres, g.seps = list(g), [VMobject() for _ in g[1:]]
        return g

    def montrer_liste(self, g, extraits=None, run_time=0.18):
        return super().montrer_liste(g, extraits or getattr(g, "extraits", None), run_time)

    def poser_nuage(self, nu, rt=0.4):
        self.play(Create(nu.ax_n), Create(nu.ax_u), FadeIn(nu.lab_n), FadeIn(nu.lab_u), run_time=rt)

    def trait(self, nu, v, couleur=RAISON, texte=None, fs=26, audit=True, dash=0.12):
        """Un plafond (ou un plancher) : un pointillé horizontal à la hauteur v,
        son nombre à gauche de l'axe."""
        tr = DashedLine(P(nu.ax_u.get_center()[0], nu.G(0, v)[1]), P(nu.X1 + 0.1, nu.G(0, v)[1]), color=couleur,
                        stroke_width=4, dash_length=dash)
        g = VGroup(tr)
        if texte:
            lab = self.t(texte, fs, couleur, audit=audit).next_to(tr, LEFT, buff=0.15)
            g.add(lab)
        return g

    def descendre(self, tr, depuis, rt=0.5, avec=()):
        """Le plafond arrive d'en haut (ou le plancher d'en bas) et se pose."""
        cible = tr.get_center()
        tr.shift(depuis)
        self.play(FadeIn(tr), tr.animate.move_to(cible), *avec, run_time=rt, rate_func=rush_into)

    # ── 00 : la garde ──────────────────────────────────────────────────────

    def nuage_garde(self):
        vals = [3.2, 6.8, 4.1, 7.5, 2.9, 6.2, 5.0, 7.4, 3.4, 6.6, 4.4, 7.0]
        y1 = self._y_garde - 0.15
        nu = NuageTermes((0, 11.6), (0, 10), P(-4.2, y1 - 1.25), P(3.2, y1 - 0.1), fs=24)
        pts = [nu.point(k, v, r=0.08) for k, v in enumerate(vals)]
        self.poser_nuage(nu, 0.3)
        self.play(LaggedStart(*[GrowFromCenter(d) for d in pts], lag_ratio=0.3), run_time=1.0)
        haut, bas = self.trait(nu, 8.4), self.trait(nu, 1.9)
        self.descendre(haut, UP * 0.5)
        self.descendre(bas, DOWN * 0.3)
        bande = Rectangle(width=haut.width, height=haut.get_center()[1] - bas.get_center()[1], stroke_width=0,
                          fill_color=JUSTE, fill_opacity=0.12).move_to((haut.get_center() + bas.get_center()) / 2)
        self.play(FadeIn(bande), *[Indicate(d, color=TERME, scale_factor=1.5) for d in pts], run_time=0.6)

    def ecran_garde(self):
        self.garde("Suite bornée",
                   [("Comment être sûr qu'une suite", "Comment"),
                    ("ne dépassera jamais une valeur,", "ne dépassera"),
                    ("ni vers le haut, ni vers le bas ?", "ni vers le haut")],
                   dessin=self.nuage_garde, extrait_titre="Suite bornée")

    # ── 01 : Clara, ingénieure du son ──────────────────────────────────────

    def ecran_situation(self):
        self.nouvel_ecran("01-situation")
        perso = clara(1.1).move_to(P(-5.05, 0.85))
        nom = self.t("Clara", 42, JAUNE_TITRE).next_to(perso, DOWN, buff=0.3)
        met = VGroup(self.t("ingénieure", 30, TERME), self.t("du son", 30, TERME)).arrange(DOWN, buff=0.06)
        met.next_to(nom, DOWN, buff=0.12)
        self.au_mot("Clara")
        self.play(FadeIn(perso, shift=UP * 0.2), FadeIn(nom, shift=UP * 0.1), run_time=0.45)
        self.au_mot("ingénieure")
        self.play(FadeIn(met, shift=UP * 0.1), run_time=0.35)
        # la scène du festival : deux enceintes, des projecteurs
        e1, e2 = enceinte().move_to(P(-2.85, -0.45)), enceinte().move_to(P(-0.25, -0.45))
        som = P(-1.55, 2.75)
        fx = VGroup(*[faisceau(som, a, c) for a, c in ((-0.45, TERME), (0.0, "#a855f7"), (0.45, JUSTE))])
        self.au_mot("festivals")
        self.play(FadeIn(e1, shift=UP * 0.2), FadeIn(e2, shift=UP * 0.2), FadeIn(fx), run_time=0.5)
        fx.add_updater(lambda m, dt: m.rotate(0.35 * math.sin(self.renderer.time * 2.2) * dt, about_point=som))
        for e in (e1, e2):
            e[1].add_updater(lambda m, dt: m.set(width=0.4 * (1 + 0.08 * math.sin(self.renderer.time * 14))))
        # le graphique du niveau sonore, la limite de la loi
        nu = NuageTermes((0, 10.4), (90, 104), P(1.6, -1.95), P(5.5, 1.55), nom_u="dB", fs=26)
        self.au_mot("La loi")
        loi = self.t("La loi :", 32, GREY_A)
        l102 = self.t("au plus 102 dB", 32, PIEGE)
        VGroup(loi, l102).arrange(RIGHT, buff=0.2).move_to(P(3.75, 2.45))
        self.play(FadeIn(loi, shift=DOWN * 0.1), run_time=0.3)
        self.suivre("102")
        lim = DashedLine(nu.G(0, 102), nu.G(10.4, 102), color=PIEGE, stroke_width=5, dash_length=0.14)
        self.play(FadeIn(l102, scale=1.2), Create(nu.ax_n), Create(nu.ax_u), FadeIn(nu.lab_n), FadeIn(nu.lab_u),
                  Create(lim), run_time=0.45)
        self.insister(l102, 1.12)
        self.au_mot("set d'un DJ")
        pl = platine().move_to(P(-1.55, -1.75))
        self.play(FadeIn(pl, shift=UP * 0.15), run_time=0.4)
        for d in pl[1:3]:
            d.add_updater(lambda m, dt: m.rotate(-3.0 * dt))
        self.au_mot("minute après")
        barres = VGroup(*[Rectangle(width=0.3, height=nu.G(0, v)[1] - nu.G(0, 90)[1], stroke_width=0,
                                    fill_color=TERME, fill_opacity=0.9).move_to(nu.G(k + 0.6, 90), aligned_edge=DOWN)
                          for k, v in enumerate(SON[:10])])
        self.play(LaggedStart(*[GrowFromEdge(b, DOWN) for b in barres], lag_ratio=0.35), run_time=1.8)
        self.au_mot("jamais franchie")
        pq = self.t("?", 64, RAISON).move_to(nu.G(9.6, 103.2) + UP * 0.35)
        self.play(Indicate(lim, color=PIEGE, scale_factor=1.05), FadeIn(pq, scale=1.5), run_time=0.6)
        self.attendre_voix(marge=0.5)

    # ── 02 : majorée, minorée, bornée ──────────────────────────────────────

    def ecran_definitions(self):
        self.nouvel_ecran("02-definitions")
        J, x0 = JAUNE_TITRE, -6.3
        vals = [3.0, 6.9, 4.3, 7.6, 2.7, 6.1, 5.2, 7.3, 3.5, 6.6, 4.5, 7.1]
        nu = NuageTermes((0, 11.6), (0, 10), P(1.2, -2.2), P(5.5, 2.3), fs=26)
        pts = [nu.point(k, v) for k, v in enumerate(vals)]
        self.au_mot("Une suite")
        self.play(Create(nu.ax_n), Create(nu.ax_u), FadeIn(nu.lab_n), FadeIn(nu.lab_u),
                  LaggedStart(*[GrowFromCenter(d) for d in pts], lag_ratio=0.2), run_time=0.55)
        haut, bas = self.trait(nu, 8.5, texte="M", fs=34), self.trait(nu, 1.7, texte="m", fs=34)
        cible = haut.get_center()
        haut.shift(UP * 1.3)
        self.ligne([("Majorée par M :", J, "majorée")], 2.5, x=x0, fs=40,
                   avec=[FadeIn(haut), haut.animate.move_to(cible)])
        self.ligne([("uₙ ≤ M", TERME, "u indice n est inférieur"), ("pour TOUT n", RAISON, "pour TOUT")], 1.85, x=x0,
                   fs=40, avec=[LaggedStart(*[Indicate(d, color=RAISON, scale_factor=1.6) for d in pts], lag_ratio=0.1)])
        cible = bas.get_center()
        bas.shift(DOWN * 0.9)
        self.ligne([("Minorée par m :", J, "minorée")], 0.75, x=x0, fs=40,
                   avec=[FadeIn(bas), bas.animate.move_to(cible)])
        self.ligne([("uₙ ≥ m", TERME, "u indice n est supérieur"), ("pour tout n", RAISON, "pour tout n")], 0.1, x=x0,
                   fs=40)
        bande = Rectangle(width=haut[0].width, height=haut.get_center()[1] - bas.get_center()[1], stroke_width=0,
                          fill_color=JUSTE, fill_opacity=0.14)
        bande.move_to(P(haut[0].get_center()[0], (haut[0].get_center()[1] + bas[0].get_center()[1]) / 2))
        g = self.ligne([("Bornée :", J, "bornée"), ("les deux à la fois", JUSTE, "les deux")], -1.05, x=x0, fs=36,
                       avec=[FadeIn(bande)])
        cad = self.encadre(g, JUSTE, 0.2)
        self.play(Create(cad), Indicate(haut, color=RAISON), Indicate(bas, color=RAISON), run_time=0.5)
        self.attendre_voix(marge=0.6)

    # ── 03 : le son de Clara : uₙ = 100 − 4/(n + 1) ────────────────────────

    def ecran_son(self):
        self.nouvel_ecran("03-son")
        x0 = -6.3
        nu = NuageTermes((0, 10.6), (94, 103), P(1.7, -2.0), P(5.6, 2.0), nom_u="uₙ", fs=26)
        pts = [nu.point(k, v, r=0.08) for k, v in enumerate(SON[:11])]
        self.ligne([("Le niveau à la minute n", GREY_A, "Le niveau"), ("(n entier naturel) :", GREY_A, "pour n entier")],
                   2.85, x=x0, fs=32, avec=[Create(nu.ax_n), Create(nu.ax_u), FadeIn(nu.lab_n), FadeIn(nu.lab_u)])
        self.ligne([("uₙ =", TERME, "u indice n égale"), ("100", WHITE, "100"), ("− 4/(n", RAISON, "4 sur"),
                    ("+ 1)", RAISON, "1")], 2.05, x=x0, fs=46, rt=0.9,
                   avec=[LaggedStart(*[GrowFromCenter(d) for d in pts], lag_ratio=0.4)])   # le point qui monte
        self.ligne([("4/(n", RAISON, "4 sur"), ("+ 1)", RAISON, "1"), ("> 0", WHITE, "positif")], 1.32, x=x0, fs=40)
        p100 = self.trait(nu, 100, texte="100")
        cible = p100.get_center()
        p100.shift(UP * 0.9)
        self.ligne([("donc", GREY_A, "donc"), ("uₙ ≤", TERME, "u indice n est inférieur"), ("100", WHITE, "100")],
                   0.62, x=x0, fs=40, avec=[FadeIn(p100), p100.animate.move_to(cible)])
        # il bute contre le plafond : les derniers points touchent presque le trait
        self.play(*[Indicate(d, color=RAISON, scale_factor=1.6) for d in pts[6:]], run_time=0.5)
        self.ligne([("majorée par", JUSTE, "majorée"), ("100,", JUSTE, "100")], -0.08, x=x0, fs=40)
        p102 = self.trait(nu, 102, GREY_A, texte="102")
        self.ligne([("et donc aussi par", WHITE, "et donc aussi"), ("102", WHITE, "102")], -0.7, x=x0, fs=40,
                   avec=[FadeIn(p102, shift=DOWN * 0.3)])
        self.ligne([("croissante,", WHITE, "croissante"), ("donc minorée", JUSTE, "donc minorée")], -1.42, x=x0, fs=40)
        p96 = self.trait(nu, 96, texte="96")
        cible = p96.get_center()
        p96.shift(DOWN * 0.6)
        self.ligne([("par", JUSTE, "par u"), ("u₀ =", TERME, None), ("96", WHITE, "96")], -2.04, x=x0, fs=40,
                   avec=[FadeIn(p96), p96.animate.move_to(cible), Indicate(pts[0], color=RAISON, scale_factor=1.8)])
        bande = Rectangle(width=p100[0].width, height=p100[0].get_center()[1] - p96[0].get_center()[1],
                          stroke_width=0, fill_color=JUSTE, fill_opacity=0.14)
        bande.move_to(P(p100[0].get_center()[0], (p100[0].get_center()[1] + p96[0].get_center()[1]) / 2))
        g = self.ligne([("bornée :", JUSTE, "bornée"), ("96", WHITE, "entre 96"), ("≤ uₙ ≤", TERME, None),
                        ("100", WHITE, "100")], -2.85, x=x0 + 0.2, fs=42, avec=[FadeIn(bande)])
        cad = self.encadre(g, JUSTE, 0.2)
        self.play(Create(cad), run_time=0.3)
        self.insister(VGroup(g, cad), 1.08)
        self.attendre_voix(marge=0.6)

    # ── 04 : question-pause n° 1 : un majorant → C (100) ───────────────────

    def ecran_question1(self):
        g1 = self.construire([("Pour", WHITE, "Pour u"), ("uₙ =", TERME, None), ("100", WHITE, "100"),
                              ("− 4/(n", RAISON, "4 sur"), ("+ 1),", RAISON, "1")], 40)
        g2 = self.construire([("lequel de ces nombres est un majorant ?", WHITE, "lequel")], 40)
        liste = [(g1, None), (g2, None)]

        def dessin():
            self.montrer(g1)
            self.montrer(g2)
            liste.clear()                      # poser_question ne les remontre pas
        q = self.poser_question("04-question", liste, ["99", "98", "100"], 2, en_ligne=True, largeur=3.4, fs=44,
                                dessin=dessin)
        self.dire("04b-reponse")
        self.q_reponse(q, 2)
        cA, cB = q.cartes[0], q.cartes[1]
        nu = NuageTermes((0, 10.6), (97.5, 100.5), P(2.0, -2.0), P(5.3, -0.65), fs=26)
        pts = [nu.point(k, v, r=0.07) for k, v in enumerate(SON[:11]) if k >= 1]
        pts = [None] + pts
        t98, t99 = self.trait(nu, 98, PIEGE, "98"), self.trait(nu, 99, PIEGE, "99")
        t100 = self.trait(nu, 100, JUSTE, "100", audit=False)
        x0 = -6.2
        for d in pts[1:]:
            d.set_opacity(0)
        self.add(*pts[1:])
        self.ligne([("u₇ =", TERME, "u indice 7"), ("99,5", WHITE, "99,5")], -0.45, x=x0, fs=46,
                   avec_k={0: [Create(nu.ax_n), Create(nu.ax_u), FadeIn(nu.lab_n), FadeIn(nu.lab_u),
                               *[d.animate.set_opacity(1) for d in pts[1:]]],
                           1: [pts[7].animate.scale(1.8).set_color(RAISON)]})
        e2 = self.construire([("il dépasse", PIEGE, "il dépasse"), ("98", PIEGE, "98"), ("et", PIEGE, None),
                              ("99", PIEGE, "99")], 42).move_to(P(0, -1.35)).align_to(P(x0, 0), LEFT)
        self.suivre("il dépasse")
        self.play(FadeIn(e2[0], shift=UP * 0.1), run_time=0.2)
        self.suivre("98")
        self.play(FadeIn(e2[1], scale=1.3), FadeIn(e2[2]), Create(t98), Create(self.barrer(cB[1][1])), run_time=0.22)
        self.suivre("99")
        self.play(FadeIn(e2[3], scale=1.3), Create(t99), Create(self.barrer(cA[1][1])), run_time=0.3)
        e3 = self.construire([("Un majorant doit dépasser", WHITE, "Un majorant"), ("TOUS les termes,", JUSTE, "TOUS")],
                             36).move_to(P(-0.7, -2.55))
        self.montrer(e3, avec=[Create(t100)])
        e4 = self.construire([("même les derniers.", JUSTE, "même les derniers")], 36).move_to(P(-0.7, -3.15))
        self.montrer(e4, avec=[*[Indicate(d, color=JUSTE, scale_factor=1.5) for d in pts[8:]]])
        self.attendre_voix(marge=0.6)

    # ── 05 : les basses : vₙ = 4 + 2 sin(n) ────────────────────────────────

    def ecran_oscille(self):
        self.nouvel_ecran("05-oscille")
        x0 = -6.3
        cs = caisson(0.9).move_to(P(-6.1, 2.35))
        ondes = VGroup(*[Arc(radius=0.3 + 0.18 * k, start_angle=-PI / 4, angle=PI / 2, stroke_color=RAISON,
                             stroke_width=3).move_to(cs.get_right() + RIGHT * (0.15 + 0.1 * k)) for k in range(2)])
        self.au_mot("deuxième machine")
        self.play(FadeIn(cs, scale=0.8), run_time=0.35)
        self.au_mot("vibrer")
        self.play(FadeIn(ondes), run_time=0.3)
        cs[1].add_updater(lambda m, dt: m.set(width=0.68 * (1 + 0.1 * math.sin(self.renderer.time * 18))))
        nu = NuageTermes((0, 14.6), (0, 7.4), P(2.0, -2.1), P(5.6, 2.2), nom_u="vₙ", fs=26)
        pts = [nu.point(k, v, r=0.08) for k, v in enumerate(BASSES)]
        self.ligne([("vₙ =", TERME, "v indice n égale"), ("4", WHITE, "4"), ("+ 2 sin(n)", RAISON, "2 sinus")], 2.35,
                   x=-4.55, fs=46, avec=[Create(nu.ax_n), Create(nu.ax_u), FadeIn(nu.lab_n), FadeIn(nu.lab_u)])
        self.play(LaggedStart(*[GrowFromCenter(d) for d in pts], lag_ratio=0.3), run_time=1.3)
        self.ligne([("−1 ≤", WHITE, "moins 1"), ("sin(n)", RAISON, "Comme sinus"), ("≤ 1,", WHITE, "et 1")], 1.3,
                   x=x0, fs=42, ordre=[1, 0, 2])
        self.ligne([("−2 ≤", WHITE, "moins 2"), ("2 sin(n)", RAISON, "2 sinus de n est"), ("≤ 2,", WHITE, "et 2")],
                   0.45, x=x0, fs=42, ordre=[1, 0, 2])
        p2, p6 = self.trait(nu, 2, texte="2"), self.trait(nu, 6, texte="6")
        g = self.ligne([("2 ≤", WHITE, "2 et"), ("vₙ", TERME, "et v indice n"), ("≤ 6", WHITE, "6")], -0.5, x=x0,
                       fs=46, ordre=[1, 0, 2], avec_k={0: [FadeIn(p2, shift=UP * 0.3)], 2: [FadeIn(p6, shift=DOWN * 0.3)]})
        cad = self.encadre(g, JUSTE, 0.18)
        self.play(Create(cad), run_time=0.3)
        bande = Rectangle(width=p6[0].width, height=p6[0].get_center()[1] - p2[0].get_center()[1], stroke_width=0,
                          fill_color=JUSTE, fill_opacity=0.14)
        bande.move_to(P(p6[0].get_center()[0], (p6[0].get_center()[1] + p2[0].get_center()[1]) / 2))
        self.ligne([("La suite est bornée,", JUSTE, "La suite est bornée")], -1.5, x=x0, fs=42, avec=[FadeIn(bande)])
        zig = VMobject(stroke_color=GREY_B, stroke_width=2).set_points_as_corners([d.get_center() for d in pts])
        self.ligne([("même si elle ne se stabilise jamais", WHITE, "même si")], -2.25, x=x0, fs=32,
                   avec=[Create(zig)])
        self.play(LaggedStart(*[Indicate(d, color=RAISON, scale_factor=1.6) for d in pts], lag_ratio=0.12),
                  run_time=1.2)
        self.attendre_voix(marge=0.6)

    # ── 06 : le piège : bornée n'est pas convergente ───────────────────────

    def ecran_piege(self):
        self.nouvel_ecran("06-piege")
        tit = self.t("Le piège !", 46, PIEGE).move_to(P(0, 3.15))
        self.au_mot("piège")
        self.play(FadeIn(tit, scale=1.3), run_time=0.35)
        self.ligne([("Bornée", JUSTE, "Bornée"), ("ne veut pas dire", PIEGE, "ne veut pas"),
                    ("convergente", WHITE, "convergente")], 2.35, fs=42)
        # à gauche : (−1)ⁿ
        x0 = -6.2
        nu = NuageTermes((0, 7.6), (-1.6, 1.6), P(-5.75, -3.0), P(-1.2, -0.55), nom_u="uₙ", fs=26)
        pts = [nu.point(k, v, r=0.09) for k, v in enumerate(ALT)]
        f = self.construire([("(−1)ⁿ :", TERME, "moins 1 puissance")], 44).move_to(P(0, 1.35)).align_to(P(x0, 0),
                                                                                                    LEFT)
        lg = LigneTermes(["−1", "1", "−1"], xs=(-3.85, -2.75, -1.65), centre=P(0, 1.35), largeur=0.95, hauteur=0.66,
                         fs=36)
        self.montrer(f, avec=[Create(nu.ax_n), Create(nu.ax_u)])

        def point(i):
            self.play(GrowFromCenter(pts[i]), run_time=0.2)
        self.remplir_ligne(lg, ["1", "1", "1"], apres=point)
        h1, b1 = self.trait(nu, 1, texte="1", audit=False), self.trait(nu, -1, texte="−1", audit=False)
        zig = VMobject(stroke_color=GREY_B, stroke_width=2).set_points_as_corners([d.get_center() for d in pts])
        self.ligne([("bornée,", JUSTE, "elle est bornée"), ("et pas de limite", PIEGE, "pas de limite")], 0.45, x=x0,
                   fs=38, avec_k={0: [FadeIn(h1), FadeIn(b1), *[GrowFromCenter(d) for d in pts[3:]]], 1: [Create(zig)]})
        self.play(*[Wiggle(d, scale_value=1.4) for d in pts], run_time=0.6)
        # à droite : majorée par 100, sans jamais atteindre 100
        xr = 3.55
        nr = NuageTermes((0, 10.6), (94, 101), P(1.5, -3.0), P(5.2, -0.75), nom_u="uₙ", fs=26)
        pr = [nr.point(k, v, r=0.07) for k, v in enumerate(SON[:11])]
        p100 = self.trait(nr, 100, texte="100", audit=False)
        r1 = self.construire([("Majorée par", WHITE, "Et majorée"), ("100", WHITE, "100")], 36).move_to(P(xr, 1.4))
        self.montrer(r1, avec=[Create(nr.ax_n), Create(nr.ax_u), FadeIn(p100),
                               LaggedStart(*[GrowFromCenter(d) for d in pr], lag_ratio=0.2)])
        r2 = self.construire([("ne veut pas dire", PIEGE, "ne veut pas dire que")], 36).move_to(P(xr, 0.8))
        r3 = self.construire([("« atteint", PIEGE, "atteint"), ("100 »", PIEGE, "100")], 36).move_to(P(xr, 0.25))
        haut = nr.G(10, 100)
        ecart = DoubleArrow(pr[10].get_center() + UP * 0.1, haut + DOWN * 0.03, buff=0, color=PIEGE, stroke_width=4,
                            tip_length=0.12, max_tip_length_to_length_ratio=0.5)
        self.montrer(r2)
        self.montrer(r3, avec_k={1: [GrowFromCenter(ecart)]})
        self.play(Indicate(ecart, color=PIEGE, scale_factor=1.3), run_time=0.5)
        self.attendre_voix(marge=0.6)

    # ── 07 : question-pause n° 2 : laquelle n'est PAS bornée ? → B (√n) ────

    def ecran_question2(self):
        q = self.poser_question("07-question",
                                [(self.t("Laquelle de ces suites, définies pour n entier naturel,", 38), "Laquelle"),
                                 (self.t("n'est PAS bornée ?", 42, PIEGE), "n'est PAS")],
                                [self.choix([("5 ×", "5"), ("0,8ⁿ", "0,8")]), "√n", "2 cos(n)"], 1, en_ligne=True, largeur=4.0, fs=44)
        self.dire("07b-reponse")
        self.q_reponse(q, 1)
        self.play(FadeOut(q.cartes[0]), FadeOut(q.cartes[2]), run_time=0.25)
        x0 = -6.2
        nu = NuageTermes((0, 26), (0, 5.6), P(2.2, -2.9), P(4.95, -0.8), nom_u="√n", fs=26)
        pts = [nu.point(k, v, r=0.06) for k, v in enumerate(RAC)]
        self.ligne([("√n", TERME, "Racine de n"), ("est minorée par", JUSTE, "est minorée"), ("0", JUSTE, "0")], -0.4,
                   x=x0, fs=40, avec_k={0: [Create(nu.ax_n), Create(nu.ax_u), FadeIn(nu.lab_n), FadeIn(nu.lab_u),
                                            LaggedStart(*[GrowFromCenter(d) for d in pts], lag_ratio=0.1)]})
        self.ligne([("mais elle dépasse tout nombre :", WHITE, "elle dépasse")], -1.35, x=x0, fs=36)
        for v in (2.2, 3.6, 4.7):           # chaque plafond est percé, plus haut encore
            tr = self.trait(nu, v, PIEGE)
            self.play(FadeIn(tr, shift=DOWN * 0.2), run_time=0.15)
            dessus = [d for d, r in zip(pts, RAC) if r > v]
            self.play(*[d.animate.set_color(PIEGE) for d in dessus], tr.animate.set_opacity(0.35), run_time=0.2)
        cx = self.barrer(Square(0.4))
        g = self.construire([("elle n'est pas majorée", PIEGE, "pas majorée")], 46)
        VGroup(cx, g).arrange(RIGHT, buff=0.25).move_to(P(0, -2.35)).align_to(P(x0, 0), LEFT)
        self.montrer(g, avec=[Create(cx)])
        self.insister(g, 1.1)
        self.attendre_voix(marge=0.6)

    # ── 08 : le défi : wₙ = 7 − 3 cos(n) ───────────────────────────────────

    def ecran_defi(self):
        self.nouvel_ecran("08-defi")
        tit = self.titre("À toi de jouer !", JAUNE_TITRE, 48, extrait="À toi")
        self.au_mot("Pour n")
        d1 = self.t("Pour n entier naturel :", 34, GREY_A).move_to(P(0, 2.4))
        self.play(FadeIn(d1, shift=DOWN * 0.1), run_time=0.3)
        d2 = self.ligne([("wₙ =", TERME, "w indice n égale"), ("7", WHITE, "7"), ("− 3 cos(n)", RAISON, "3 cosinus")],
                        1.6, fs=50)
        d3 = self.ligne([("Trouve un encadrement de", WHITE, "Trouve"), ("wₙ", TERME, "w indice n valable"),
                         ("valable pour tout n", WHITE, None)], 0.7, fs=38)
        # le dessin : « ? ≤ wₙ ≤ ? » et le nuage entre deux traits inconnus
        b1, b2 = [VGroup(self.carte(1.0, 0.85, ORIGIN, RAISON), self.t("?", 52, RAISON)) for _ in range(2)]
        mil = self.t("≤  wₙ  ≤", 48, TERME)
        enc = VGroup(b1, mil, b2).arrange(RIGHT, buff=0.3).move_to(P(-2.9, -0.85))
        nu = NuageTermes((0, 14.6), (0, 11.5), P(1.3, -1.95), P(5.4, -0.2), nom_u="wₙ", fs=26)
        pts = [nu.point(k, v, r=0.07) for k, v in enumerate(DEFI)]
        h, b = self.trait(nu, 10, texte="?", fs=32), self.trait(nu, 4, texte="?", fs=32)
        self.play(FadeIn(enc, shift=UP * 0.15), Create(nu.ax_n), Create(nu.ax_u), FadeIn(nu.lab_n), FadeIn(nu.lab_u),
                  run_time=0.4)
        self.play(LaggedStart(*[GrowFromCenter(d) for d in pts], lag_ratio=0.2), FadeIn(h), FadeIn(b), run_time=0.8)
        self.defi_pause(-2.65, x=-0.6)
        self._defi = (tit, d1, d2, d3, enc, nu, pts, h, b)

    def ecran_correction(self):
        self.dire("08b-correction")
        tit, d1, d2, d3, enc, nu, pts, h, b = self._defi
        self.au_mot("Correction")
        cor = self.t("Correction", 46, JUSTE).move_to(tit)
        self.play(FadeOut(d1), FadeOut(d3), FadeOut(enc), ReplacementTransform(tit, cor),
                  d2.animate.scale(0.85).move_to(P(-3.2, 2.3)), run_time=0.4)
        x0 = -6.2
        self.ligne([("−1 ≤", WHITE, "moins 1"), ("cos(n)", RAISON, "Cosinus de n"), ("≤ 1", WHITE, "et 1")], 1.35,
                   x=x0, fs=42, ordre=[1, 0, 2])
        self.ligne([("−3 ≤", WHITE, "moins 3"), ("−3 cos(n)", RAISON, "moins 3 cosinus"), ("≤ 3", WHITE, "et 3")],
                   0.5, x=x0, fs=42, ordre=[1, 0, 2])
        p4, p10 = self.trait(nu, 4, texte="4", fs=28), self.trait(nu, 10, texte="10", fs=28)
        self.ligne([("4 ≤", WHITE, "4 et"), ("wₙ", TERME, "et w indice n"), ("≤ 10", WHITE, "10")], -0.4, x=x0,
                   fs=42, ordre=[1, 0, 2], avec_k={0: [FadeOut(b), FadeIn(p4, shift=UP * 0.2)],
                                                   2: [FadeOut(h), FadeIn(p10, shift=DOWN * 0.2)]})
        bande = Rectangle(width=p10[0].width, height=p10[0].get_center()[1] - p4[0].get_center()[1], stroke_width=0,
                          fill_color=JUSTE, fill_opacity=0.14)
        bande.move_to(P(p10[0].get_center()[0], (p10[0].get_center()[1] + p4[0].get_center()[1]) / 2))
        g = self.construire([("bornée :", JUSTE, "bornée"), ("4", WHITE, "4 inférieur"), ("≤ wₙ ≤", TERME, None),
                             ("10", WHITE, "10")], 50).move_to(P(-0.6, -2.75))
        self.montrer(g, avec=[FadeIn(bande)])
        cad = self.encadre(g, JUSTE, 0.22)
        self.play(Create(cad), *[Indicate(d, color=JUSTE, scale_factor=1.4) for d in pts], run_time=0.5)
        self.insister(VGroup(g, cad), 1.08)
        self.attendre_voix(marge=0.6)

    # ── 09 : ce que tu as appris ───────────────────────────────────────────

    def ecran_appris(self):
        J, fs = JAUNE_TITRE, 44
        points = [[("Majorée :", J, "Majorée"), ("sous un nombre fixe, pour tous les rangs.", WHITE, "sous")],
                  [("Minorée :", J, "Minorée"), ("au-dessus d'un nombre fixe.", WHITE, "au-dessus")],
                  [("Bornée :", J, "Bornée"), ("les deux.", WHITE, "les deux")],
                  [("Pour sinus et cosinus, on part de", WHITE, "Pour sinus"), ("−1", RAISON, "moins 1"),
                   ("et", WHITE, None), ("1.", RAISON, "et 1")],
                  [("Une suite bornée", WHITE, "Et une suite"), ("n'a pas forcément de limite.", PIEGE, "n'a pas")]]
        self.nouvel_ecran("09-finale", margo=0.65)
        self.au_mot("Ce que tu as appris")
        tit = self.t("Ce que tu as appris", 46, J).to_edge(UP, buff=0.45)
        self.play(Write(tit), run_time=0.7)
        blocs = []
        for pt in points:
            l = self.construire(pt, fs, 1e9)
            blocs.append(VGroup(self.coche(), l).arrange(RIGHT, buff=0.3))
        tout = VGroup(*blocs).arrange(DOWN, aligned_edge=LEFT, buff=0.5)
        if tout.width > 12.2:
            tout.scale_to_fit_width(12.2)
        tout.move_to(P(-0.3, 0)).align_to(P(0, tit.get_bottom()[1] - 0.6), UP)
        for bloc in blocs:
            self.montrer(bloc[1], avec_k={0: [Create(bloc[0])]}, rt=0.4)
        self.attendre_voix(marge=0.8)

    def construct(self):
        ecrans = [self.ecran_garde, self.ecran_situation, self.ecran_definitions, self.ecran_son,
                  self.ecran_question1, self.ecran_oscille, self.ecran_piege, self.ecran_question2,
                  self.ecran_defi, self.ecran_correction, self.ecran_appris, lambda: self.fin("10-abonne")]
        choix = os.environ.get("ECRANS")          # contrôle rapide : ECRANS=5,6 (jamais au rendu final)
        for k, e in enumerate(ecrans):
            if not choix or str(k) in choix.split(",") or (k == 9 and "8" in choix.split(",")):
                e()
