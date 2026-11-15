# suite_exp_geo.py
# EleveAI — Maths 1re spé — paysage « La suite e puissance n a est géométrique »
# (16:9), ceinture VERTE. Série SUITES du lycée, épisode 40.
# Micro du coach : exp_suite_geo (notion exponentielle) :
# lib/tutor-v4/questionBank/premiere-spe/maths/exponentielle.bank.ts
# (fixed_1 à fixed_5, open_1, open_2, tpl_1).
#
# Ce que demande le coach → écran :
#   · le quotient de deux termes qui se suivent, la relation fonctionnelle
#     (open_1, tpl_1)                                             → 03, 04 ;
#   · (eⁿᵃ) est géométrique de raison eᵃ (fixed_1)                → 05, 06 (C) ;
#   · son premier terme : u₀ = e⁰ = 1 (fixed_4)                    → 07 ;
#   · le piège : pour e²ⁿ la raison est e² ≈ 7,39, pas 2 (fixed_2) → 08 ;
#   · raison entre 0 et 1 → décroissante, mais > 0 (fixed_3,
#     open_2)                                                      → 09 (B) ;
#   · un contexte réel : par quel nombre multiplie-t-on chaque
#     heure / chaque mois ? (fixed_5)                              → 01, 02, 10 défi.
# Clé de voix → écran :
#   00-garde (la courbe qui descend, les relevés aux heures entières) ·
#   01 Soraya, pharmacienne hospitalière : la poche, l'horloge, C(t) = 400 e^(−0,3t) ·
#   02 les quatre relevés qui se posent sur la courbe et remplissent les cases ·
#   03 la suite uₙ = 400 e^(−0,3n), le nuage qui descend, « toujours le même
#   nombre ? » · 04 le quotient et la relation fonctionnelle · 05 géométrique de
#   raison e^(−0,3) ≈ 0,74, « × 0,74 » qui saute de case en case, − 26 % par
#   heure · 06/06b question (C : raison eᵃ) · 07 u₀ = e⁰ = 1, trois courbes qui
#   partent toutes de 1 · 08 le piège : e² ≈ 7,39 contre 2 · 09/09b question
#   (B : raison ≈ 0,61, décroissante) · 10/10b défi : e^(−0,2) ≈ 0,82 (− 18 %)
#   contre e^(−0,5) ≈ 0,61 (− 39 %) · 11 « Ce que tu as appris » · 12 fin.
# Code couleur (module commun) : bleu = les termes uₙ, orange = la raison et les
# exposants, vert = juste, rouge = le piège.
# ⛔ Pas de LaTeX, et AUCUN exposant Unicode : les puissances sont COMPOSÉES
# (puissance()), comme dans exponentielle.py.
# Voix : manim/voix/premiere-spe-suite-exp-geo.json (débit −6), calée mot à mot
# par suite_exp_geo_marques.json.
# Contrôle : AUDIT=1 BORDS=1 python -m manim render --dry_run …
# python -m manim render -qh --disable_caching manim/scripts/premiere/suite_exp_geo.py SuiteExpGeo1reSpe -o eleveai-maths-premiere-spe-suite-exp-geo --media_dir manim/scripts/premiere/media-suite-exp-geo
# Sortie : manim/sorties/premiere-spe/maths/suites/40-exp-geo/

import math
import os
import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI))

from suites_commun import *  # noqa: E402,F403
from suite_arith_graphique import OutilsGraphique, nuage_mini  # noqa: E402  (ép. 07)
from suite_geo_reconnaitre import AuditMilliers  # noqa: E402  (ép. 09)
from suite_geo_terme_rang import OutilsEp12  # noqa: E402  (ép. 12)
from suite_geo_interpreter import SuiteGeoInterpreter1re as _E16  # noqa: E402  (ép. 16)
from suite_modeliser import SuiteModeliser1reSpe as _P21  # noqa: E402  (ép. 21 : ligne sans ligature)
from suite_limite_interpreter import glyphes  # noqa: E402  (ép. 34 : la ligne de base)
from suite_evolution import Bords6  # noqa: E402  (ép. 22 : 6 % de marge pour les textes, 13/11)

# ── les affirmations de la voix, vérifiées ──────────────────────────────────
proche = lambda a, b, e=5e-4: abs(a - b) < e  # noqa: E731
C = {n: 400 * math.exp(-0.3 * n) for n in range(0, 13)}
assert [round(C[n], 1) for n in range(4)] == [400.0, 296.3, 219.5, 162.6]        # 02 : les relevés
assert all(proche(C[n + 1] / C[n], math.exp(-0.3), 1e-12) for n in range(12))     # 04 : quotient constant
assert proche(round(math.exp(-0.3), 2), 0.74) and proche(round(100 - 100 * math.exp(-0.3)), 26)   # 05
assert proche(math.exp(0), 1)                                                     # 07 : e⁰ = 1
assert proche(round(math.exp(2), 2), 7.39) and math.exp(2) > 7 > 2                # 08 : le piège
assert proche(round(math.exp(-0.5), 2), 0.61) and 0 < math.exp(-0.5) < 1          # 09 : B
assert proche(round(math.exp(-0.2), 2), 0.82) and proche(round(100 - 100 * math.exp(-0.2)), 18)   # 10b
assert proche(round(100 - 100 * math.exp(-0.5)), 39) and math.exp(-0.5) < math.exp(-0.2)          # 10b

PEAU, CHEVEUX = "#c68642", "#2b1a0f"
BLOUSE, VERRE = "#f1f5f9", "#93c5fd"
VERT_PHARMA, BOIS = "#16a34a", "#a16207"


# ── les dessins de l'épisode ────────────────────────────────────────────────

def soraya(s=1.0):
    """Soraya, pharmacienne hospitalière : blouse blanche, chignon, croix verte."""
    chignon = Circle(radius=0.16, fill_color=CHEVEUX, fill_opacity=1, stroke_width=0).move_to(P(-0.26, 1.2))
    cheveux = Sector(radius=0.29, angle=PI, start_angle=0, fill_color=CHEVEUX, fill_opacity=1,
                     stroke_width=0).move_to(P(0, 1.14))
    tete = Circle(radius=0.27, fill_color=PEAU, fill_opacity=1, stroke_width=0).move_to(P(0, 0.98))
    corps = RoundedRectangle(width=0.98, height=1.18, corner_radius=0.26, fill_color=BLOUSE, fill_opacity=1,
                             stroke_width=0).move_to(P(0, 0.1))
    col = Polygon(P(-0.16, 0.65), P(0.16, 0.65), P(0, 0.3), fill_color="#cbd5e1", fill_opacity=1, stroke_width=0)
    croix = VGroup(Rectangle(width=0.22, height=0.08, fill_color=VERT_PHARMA, fill_opacity=1, stroke_width=0),
                   Rectangle(width=0.08, height=0.22, fill_color=VERT_PHARMA, fill_opacity=1,
                             stroke_width=0)).move_to(P(0.26, 0.3))
    return VGroup(corps, col, croix, chignon, tete, cheveux).scale(s)


def poche(s=1.0, niveau=0.62):
    """Une poche de perfusion : la poche, le liquide, le tube et une goutte."""
    sac = RoundedRectangle(width=0.78, height=1.25, corner_radius=0.18, stroke_color=GREY_B, stroke_width=3,
                           fill_color="#0b1220", fill_opacity=1).move_to(P(0, 0.5))
    h = 1.05 * niveau
    liquide = RoundedRectangle(width=0.64, height=h, corner_radius=0.12, fill_color=TERME, fill_opacity=0.85,
                               stroke_width=0)
    liquide.move_to(P(0, 0.5 - (1.25 - 0.2) / 2 + h / 2))
    anneau = Circle(radius=0.08, stroke_color=GREY_B, stroke_width=3).move_to(P(0, 1.25))
    tube = Line(P(0, -0.13), P(0, -0.95), stroke_color=GREY_B, stroke_width=3)
    goutte = Circle(radius=0.07, fill_color=TERME, fill_opacity=1, stroke_width=0).move_to(P(0, -0.62))
    g = VGroup(anneau, sac, liquide, tube, goutte).scale(s)
    g.goutte, g.liquide = goutte, liquide
    return g


def horloge(s=1.0, heure=0.0):
    """Une horloge schématique : cadran, quatre repères, deux aiguilles."""
    cadran = Circle(radius=0.6, stroke_color=GREY_A, stroke_width=4, fill_color="#0b1220", fill_opacity=1)
    rep = VGroup(*[Line(P(0.46 * math.cos(a), 0.46 * math.sin(a)), P(0.55 * math.cos(a), 0.55 * math.sin(a)),
                        stroke_color=GREY_B, stroke_width=3) for a in (0, PI / 2, PI, 3 * PI / 2)])
    ang = PI / 2 - TAU * (heure % 12) / 12
    gde = Line(ORIGIN, P(0.4 * math.cos(ang), 0.4 * math.sin(ang)), stroke_color=RAISON, stroke_width=5)
    pte = Line(ORIGIN, P(0, 0.26), stroke_color=WHITE, stroke_width=4)
    axe = Dot(ORIGIN, radius=0.05, color=WHITE)
    g = VGroup(cadran, rep, pte, gde, axe).scale(s)
    g.aiguille = gde
    return g


def mortier(s=1.0):
    """Le pictogramme du métier : un mortier et son pilon."""
    bol = VGroup(Sector(radius=0.44, angle=PI, start_angle=PI, fill_color="#94a3b8", fill_opacity=1, stroke_width=0),
                 Rectangle(width=0.98, height=0.09, fill_color="#cbd5e1", fill_opacity=1, stroke_width=0))
    bol[1].move_to(P(0, 0.02))
    pied = Rectangle(width=0.5, height=0.1, fill_color="#64748b", fill_opacity=1, stroke_width=0).move_to(P(0, -0.46))
    pilon = VGroup(Rectangle(width=0.09, height=0.62, fill_color=BOIS, fill_opacity=1, stroke_width=0),
                   Circle(radius=0.1, fill_color=BOIS, fill_opacity=1, stroke_width=0).shift(DOWN * 0.33))
    pilon.rotate(-0.4).move_to(P(0.24, 0.3))
    return VGroup(pied, bol, pilon).scale(s)


def flacon(s=1.0, couleur=TERME, niveau=0.55):
    """Un flacon de médicament : bouchon, verre, liquide."""
    verre = RoundedRectangle(width=0.56, height=0.92, corner_radius=0.1, stroke_color=VERRE, stroke_width=3,
                             fill_color="#0b1220", fill_opacity=1).move_to(P(0, 0))
    h = max(0.08, 0.78 * niveau)
    liq = RoundedRectangle(width=0.44, height=h, corner_radius=0.07, fill_color=couleur, fill_opacity=0.85,
                           stroke_width=0).move_to(P(0, -0.39 + h / 2))
    goulot = Rectangle(width=0.24, height=0.14, fill_color="#0b1220", stroke_color=VERRE, stroke_width=3,
                       fill_opacity=1).move_to(P(0, 0.52))
    bouchon = RoundedRectangle(width=0.32, height=0.16, corner_radius=0.05, fill_color=RAISON, fill_opacity=1,
                               stroke_width=0).move_to(P(0, 0.66))
    g = VGroup(verre, liq, goulot, bouchon).scale(s)
    g.liq = liq
    return g


class SuiteExpGeo1reSpe(Bords6, AuditMilliers, OutilsEp12, OutilsGraphique, PaysageSuites):
    fichier_marques = "suite_exp_geo_marques.json"
    nom_voix = "premiere-spe-suite-exp-geo"
    identite = "Maths 1re spé — EleveAI"
    ceinture = "verte"
    largeur_texte = 12.0          # 6 % de marge à gauche et à droite pour les textes
    calc = _E16.calc
    fleche = _E16.fleche
    boutons_ligne = _E16.boutons_ligne
    ligne = _P21.ligne

    # ── les puissances COMPOSÉES, sur une ligne de base commune ────────────

    def _bas(self, t):
        """L'ordonnée de la ligne de base d'un Text (un glyphe sans jambage)."""
        txt = getattr(t, "original_text", "") or ""
        gl = t.submobjects
        # sans ligature, Manim garde une forme (vide) par espace : on essaie les deux découpages
        for car in (list(txt), glyphes(txt)):
            if len(gl) == len(car):
                k = next((i for i, c in enumerate(car) if c in "acemnorsuvwxz0123456789"), None)
                if k is not None:
                    return gl[k].get_bottom()[1]
        return t.get_bottom()[1]

    def bloc(self, item, fs):
        """("t", texte, couleur, extrait) → un Text ;
        ("e", exposant, couleur, couleur_exposant, extrait) → e puissance …,
        COMPOSÉ (base + exposant plus petit, en haut à droite)."""
        if item[0] == "t":
            g = Text(item[1], font_size=fs, color=item[2], disable_ligatures=True)
            g.original_text = item[1]
            g._pas_audit = True
            return g, g
        g = puissance("e", item[1], fs=fs, color=item[2], c_exp=item[3])
        for m in g:
            m._pas_audit = True
        g.original_text = "e" + item[1]
        return g, g[0]

    def maths(self, items, y, fs=44, centre=0.0, x=None, larg=None, buff=None, avec_item=None, rt=0.3,
              montrer=True):
        """Une ligne qui mêle du texte et des puissances de e composées ; chaque
        item apparaît quand la voix dit son extrait (None : avec le précédent)."""
        avec_item = avec_item or {}
        larg = larg if larg is not None else self.largeur_texte
        buff = buff if buff is not None else self.espace("a", "a", fs)
        blocs, bases = [], []
        for it in items:
            g, b = self.bloc(it, fs)
            blocs.append(g)
            bases.append(b)
        for k in range(1, len(blocs)):
            blocs[k].next_to(blocs[k - 1], RIGHT, buff=buff)
            blocs[k].shift(UP * (self._bas(bases[0]) - self._bas(bases[k])))
        g = VGroup(*blocs)
        if g.width > larg:
            g.scale_to_fit_width(larg)
        g.move_to(P(centre if centre is not None else 0, y))
        if centre is None:
            g.align_to(P(x, 0), LEFT)
        if not montrer:
            return g
        paquet, extra = [], []
        for i, it in enumerate(items):
            ex = it[-1]
            if ex is not None and paquet:
                self.play(*[FadeIn(p, shift=UP * 0.1) for p in paquet], *extra, run_time=0.25)
                paquet, extra = [], []
            if ex is not None:
                self.suivre(ex)
            paquet.append(blocs[i])
            extra += avec_item.get(i, [])
        self.play(*[FadeIn(p, shift=UP * 0.1) for p in paquet], *extra, run_time=rt)
        return g

    def quot(self, items_haut, items_bas, fs=44, centre=0.0, y=0.0):
        """Un quotient : le haut, la barre, le bas (aucun LaTeX)."""
        h = self.maths(items_haut, 0, fs=fs, larg=1e9, montrer=False)
        b = self.maths(items_bas, 0, fs=fs, larg=1e9, montrer=False)
        w = max(h.width, b.width) + 0.3 * fs / 44
        bar = Line(LEFT * w / 2, RIGHT * w / 2, stroke_width=3.5 * fs / 44, color=WHITE)
        h.next_to(bar, UP, buff=0.11 * fs / 44)
        b.next_to(bar, DOWN, buff=0.11 * fs / 44)
        return VGroup(h, bar, b).move_to(P(centre, y))

    def courbe(self, nu, f, t0, t1, couleur=TERME, sw=4.5):
        return ParametricFunction(lambda t: nu.G(t, f(t)), t_range=[t0, t1, 0.02], color=couleur, stroke_width=sw)

    def axes(self, nu, extra=()):
        return [Create(nu.ax_n), Create(nu.ax_u), FadeIn(nu.lab_n), FadeIn(nu.lab_u), *extra]

    def saut_e(self, lg, i, exposant, cote=UP, fs=30, couleur=RAISON, run_time=0.6):
        """Le saut « × e puissance … » d'une case à la suivante (étiquette composée)."""
        s = lg.saut(i, "×", cote=cote, couleur=couleur, fs=fs)
        lab = self.maths([("t", "×", couleur, None), ("e", exposant, couleur, couleur, None)], 0, fs=fs, larg=1e9,
                         montrer=False).move_to(s[1], aligned_edge=LEFT)
        bille = Dot(s[0].get_start(), radius=0.07, color=couleur)
        self.play(Create(s[0]), MoveAlongPath(bille, s[0].copy()), run_time=run_time)
        self.remove(bille)
        self.play(FadeIn(lab, scale=1.4), run_time=0.2)
        return VGroup(s[0], lab)

    # ── 00 : la garde : la courbe qui descend, les relevés aux heures ───────

    def ecran_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        ech = echelle_ceintures(self.ceinture).move_to(P(-0.6, 0)).align_to(P(0, -3.45), DOWN)
        self.add(ech)
        tit = self.maths([("t", "La suite", JAUNE_TITRE, None), ("e", "na", JAUNE_TITRE, RAISON, None)], 0, fs=64,
                         larg=1e9, montrer=False).to_edge(UP, buff=0.5)
        self.au_mot("La suite")
        self.play(Write(tit), run_time=0.7)
        y = tit.get_bottom()[1] - 0.5
        nu = NuageTermes((0, 3.5), (0, 440), P(-4.2, -1.85), P(2.4, -0.2), nom_u="mg", fs=26)
        cb = self.courbe(nu, lambda t: 400 * math.exp(-0.3 * t), 0, 3.4, TERME)
        pts = VGroup(*[nu.point(n, C[n], TERME, 0.095) for n in range(4)])
        bat = VGroup(*[DashedLine(nu.G(n, 0), nu.G(n, C[n]), color=RAISON, stroke_width=2.5, dash_length=0.08)
                       for n in range(1, 4)])
        self.calc([("Pourquoi une exponentielle", WHITE, "Pourquoi")], y, centre=0, fs=40, larg=12)
        self.calc([("relevée", RAISON, "relevée"), ("d'heure en heure", WHITE, "d'heure en heure")], y - 0.66,
                  centre=0, fs=40, larg=12, avec=self.axes(nu, [Create(cb)]))
        self.calc([("cache-t-elle une", WHITE, "cache-t-elle"), ("suite géométrique ?", JAUNE_TITRE, "suite géométrique")],
                  y - 1.32, centre=0, fs=40, larg=12,
                  avec_morceau={1: [LaggedStart(*[GrowFromCenter(d) for d in pts], lag_ratio=0.2),
                                    LaggedStart(*[Create(b) for b in bat], lag_ratio=0.2)]})
        ident = self.t(self.identite, 26, GREY_A, audit=False).move_to(P(0, y - 1.9))
        self.play(FadeIn(ident), run_time=0.3)
        self.attendre_voix(marge=0.9)

    # ── 01 : Soraya, pharmacienne hospitalière ─────────────────────────────

    def ecran_situation(self):
        self.nouvel_ecran("01-situation")
        x = -4.8
        pers = soraya(0.9).move_to(P(x, 1.2))
        nom = self.t("Soraya", 42, JAUNE_TITRE).move_to(P(x, -0.15))
        m1 = self.t("pharmacienne", 28, TERME).move_to(P(x, -0.7))
        m2 = self.t("à l'hôpital", 30, GREY_A).move_to(P(x, -1.16))
        self.au_mot("Soraya")
        self.play(FadeIn(pers, shift=UP * 0.2), FadeIn(nom, shift=UP * 0.1), run_time=0.5)
        mo = mortier(0.9).move_to(P(x, -2.35))
        self.au_mot("pharmacienne")
        self.play(FadeIn(m1, shift=UP * 0.1), FadeIn(m2, shift=UP * 0.1), FadeIn(mo, scale=0.8), run_time=0.4)
        hor = horloge(0.95, heure=2).move_to(P(0.9, 1.05))
        pil = VGroup(RoundedRectangle(width=0.5, height=0.26, corner_radius=0.13, fill_color=WHITE, fill_opacity=1,
                                      stroke_width=0),
                     Line(P(0, -0.13), P(0, 0.13), stroke_color=GREY_B, stroke_width=3)).rotate(0.3)
        pil.move_to(P(2.8, 1.05))
        self.calc([("Elle décide à quelle heure", WHITE, "à quelle heure")], 3.12, centre=0.6, fs=38, larg=10,
                  avec=[FadeIn(hor, scale=0.8)])
        self.calc([("reprendre le comprimé.", WHITE, "reprendre")], 2.52, centre=0.6, fs=38, larg=10,
                  avec=[FadeIn(pil, scale=0.7)])
        po = poche(0.9).move_to(P(-1.6, 1.05))
        self.calc([("Juste après la prise :", WHITE, "Juste après"), ("400 mg", TERME, "400"),
                   ("dans le sang.", WHITE, "dans le sang")], -0.3, centre=1.35, fs=38, larg=9.2,
                  avec_morceau={0: [FadeIn(po, shift=DOWN * 0.2)],
                                1: [po.goutte.animate.shift(DOWN * 0.3).set_opacity(0)]})
        self.calc([("Ensuite, la quantité suit la courbe", WHITE, "la quantité suit")], -1.15, centre=1.35, fs=38,
                  larg=9.2)
        self.maths([("t", "C(t) =", JAUNE_TITRE, "C de t"), ("t", "400 ×", WHITE, "400 fois"),
                    ("e", "−0,3t", WHITE, RAISON, "moins 0,3 t")], -2.15, fs=50, centre=1.2, larg=8.6)
        self.calc([("avec", WHITE, "avec"), ("t en heures.", RAISON, "en heures")], -3.05, centre=1.2, fs=36, larg=7)
        self.attendre_voix(marge=0.5)

    # ── 02 : un relevé chaque heure : les points se posent sur la courbe ────

    def ecran_releves(self):
        self.nouvel_ecran("02-releves")
        self.titre("Un relevé chaque heure", JAUNE_TITRE, 46, extrait="Soraya", y=3.1)
        nu = NuageTermes((0, 3.6), (0, 440), P(-5.85, -0.7), P(-0.6, 2.35), nom_u="mg", fs=26)
        for n in range(1, 4):
            nu.add(nu.graduation_n(n, str(n), 24))
        cb = self.courbe(nu, lambda t: 400 * math.exp(-0.3 * t), 0, 3.5, TERME)
        hor = horloge(1.15).move_to(P(2.9, 1.5))
        lh = self.t("1 heure", 30, RAISON, audit=False).next_to(hor, DOWN, buff=0.2)
        self.au_mot("la courbe")
        self.play(*self.axes(nu), Create(cb), run_time=0.8)
        self.au_mot("chaque heure")
        self.play(FadeIn(hor, scale=0.8), FadeIn(lh, shift=UP * 0.1), *[FadeIn(g) for g in nu[4:]], run_time=0.45)
        lg = LigneTermes(["400", "296,3", "219,5", "162,6"], centre=P(-0.5, -2.1), pas=2.4, largeur=2.05, hauteur=0.85,
                         fs=36, noms=["u₀", "u₁", "u₂", "u₃"], fs_noms=30)
        cx = hor[0].get_center()
        for k, ex in enumerate(("400", "296,3", "219,5", "162,6")):
            self.suivre(ex)
            d = nu.point(k, C[k], TERME, 0.1)
            bat = DashedLine(nu.G(k, 0), nu.G(k, C[k]), color=RAISON, stroke_width=2.5, dash_length=0.08)
            anims = [FadeIn(lg.cases[k][0], scale=0.8), FadeIn(lg.cases[k][1], scale=1.4), FadeIn(lg.noms[k]),
                     GrowFromCenter(d), Create(bat)]
            if k:
                anims.append(Rotate(hor.aiguille, -TAU / 12, about_point=cx))
            self.play(*anims, run_time=0.45)
        self.attendre_voix(marge=0.6)

    # ── 03 : la suite des relevés : le nuage descend, « toujours × ? » ──────

    def ecran_suite(self):
        self.nouvel_ecran("03-suite")
        self.titre("La suite des relevés", JAUNE_TITRE, 46, extrait="Ces relevés", y=3.1)
        nu = NuageTermes((0, 8.4), (0, 440), P(-6.0, -2.7), P(-0.8, 1.15), fs=26)
        for n in (2, 4, 6, 8):
            nu.add(nu.graduation_n(n, str(n), 22))
        pts = VGroup(*[nu.point(n, C[n], TERME, 0.085) for n in range(9)])
        arcs = VGroup()
        for k in (0, 1, 2):
            a = CurvedArrow(nu.G(k, C[k]) + UP * 0.14, nu.G(k + 1, C[k + 1]) + UP * 0.14, angle=-0.9, color=RAISON,
                            stroke_width=3.5, tip_length=0.14)
            arcs.add(a)
        et = self.t("× ?", 34, RAISON, audit=False).next_to(arcs[1], UP, buff=0.1)
        self.maths([("t", "uₙ =", TERME, "u indice n"), ("t", "400 ×", WHITE, "400 fois"),
                    ("e", "−0,3n", WHITE, RAISON, "moins 0,3 n")], 2.25, fs=54, centre=-0.4, larg=9.0,
                   avec_item={0: self.axes(nu, [FadeIn(g) for g in nu[4:]]),
                              2: [LaggedStart(*[GrowFromCenter(d) for d in pts], lag_ratio=0.1)]})
        xq = 3.2
        self.calc([("Passe-t-on d'une heure", WHITE, "qu'on passe")], 0.75, centre=xq, fs=38, larg=5.9)
        self.calc([("à la suivante", WHITE, "à la suivante")], 0.1, centre=xq, fs=38, larg=5.9,
                  avec=[LaggedStart(*[Create(a) for a in arcs], lag_ratio=0.25), FadeIn(et, scale=1.3)])
        self.calc([("en multipliant toujours", WHITE, "en multipliant")], -0.72, centre=xq, fs=38, larg=5.9)
        f = self.calc([("par le même nombre ?", JAUNE_TITRE, "par le même nombre")], -1.4, centre=xq, fs=40, larg=5.9)
        gq = self.t("?", 86, RAISON, audit=False).move_to(P(xq, -2.5))
        self.play(FadeIn(gq, scale=0.7), Indicate(f, color=JAUNE_TITRE, scale_factor=1.06), run_time=0.5)
        self.attendre_voix(marge=0.6)

    # ── 04 : le quotient et la relation fonctionnelle ──────────────────────

    def ecran_quotient(self):
        self.nouvel_ecran("04-quotient")
        self.titre("Le quotient de deux termes", JAUNE_TITRE, 46, extrait="Pour le savoir", y=3.1)
        q = self.quot([("t", "uₙ₊₁", TERME, None)], [("t", "uₙ", TERME, None)], fs=50, centre=-4.6, y=1.5)
        pq = self.t("= ?", 50, RAISON, audit=False).next_to(q, RIGHT, buff=0.25)
        pq.shift(UP * (q[1].get_center()[1] - pq.get_center()[1]))
        self.au_mot("le quotient")
        self.play(FadeIn(q, scale=0.8), FadeIn(pq, scale=1.3), run_time=0.45)
        lg = LigneTermes(["", ""], centre=P(1.9, 1.45), pas=2.45, largeur=2.1, hauteur=0.85, fs=36,
                         noms=["uₙ", "uₙ₊₁"], fs_noms=32)
        self.au_mot("deux termes qui se suivent")
        self.play(*[FadeIn(lg.cases[k][0], scale=0.8) for k in (0, 1)], *[FadeIn(lg.noms[k]) for k in (0, 1)],
                  run_time=0.4)
        s = self.sauter(lg, 0, "× ?", cote=UP, run_time=0.6)
        self.calc([("Relation fonctionnelle :", JAUNE_TITRE, "La relation fonctionnelle")], 0.45, centre=0, fs=42,
                  larg=11)
        self.maths([("e", "−0,3(n+1)", WHITE, RAISON, "moins 0,3 fois n plus 1"), ("t", "=", WHITE, "égale"),
                    ("e", "−0,3n", WHITE, RAISON, "moins 0,3 n,"), ("t", "×", WHITE, "fois e"),
                    ("e", "−0,3", RAISON, RAISON, "moins 0,3.")], -0.5, fs=52, centre=0, larg=11.4)
        fin = self.maths([("t", "Le quotient vaut", WHITE, "Le quotient vaut donc"),
                          ("e", "−0,3", JUSTE, JUSTE, "moins 0,3.")], -1.65, fs=50, centre=-0.3, larg=10.4)
        neuf = self.maths([("t", "×", RAISON, None), ("e", "−0,3", RAISON, RAISON, None)], 0, fs=26, larg=1e9,
                          montrer=False).move_to(s[1])
        self.play(Create(self.encadre(fin, JUSTE, 0.18)), ReplacementTransform(s[1], neuf), run_time=0.4)
        d = self.calc([("Il ne dépend plus de", WHITE, "Il ne dépend"), ("n !", RAISON, "n !")], -2.75, centre=-0.3,
                      fs=44, larg=10.4)
        self.play(Indicate(d, color=RAISON, scale_factor=1.06), run_time=0.45)
        self.attendre_voix(marge=0.6)

    # ── 05 : géométrique de raison e^(−0,3) ≈ 0,74 : « × 0,74 » de case en case ──

    def ecran_conclusion(self):
        self.nouvel_ecran("05-conclusion")
        self.titre("Une suite géométrique", JAUNE_TITRE, 46, extrait="géométrique", y=3.1)
        lg = LigneTermes(["400", "296,3", "219,5", "162,6"], centre=P(-0.4, 0.35), pas=2.5, largeur=2.1, hauteur=0.85,
                         fs=36, noms=["u₀", "u₁", "u₂", "u₃"], fs_noms=30)
        for c in lg.cases:          # les relevés de l'écran 02 : une figure qu'on relit
            c[1]._pas_audit = True
        self.play(FadeIn(lg, shift=UP * 0.1), run_time=0.3)   # AVANT la raison : les sauts suivent « 0,74 » sans retard
        self.maths([("t", "de raison", WHITE, "de raison"), ("e", "−0,3", RAISON, RAISON, "moins 0,3"),
                    ("t", "≈ 0,74", JUSTE, "0,74")], 2.3, fs=52, centre=-0.3, larg=10.4)
        sauts = [lg.saut(k, "× 0,74", cote=UP, fs=30) for k in range(3)]
        self.play(*[AnimationGroup(Create(s[0]), FadeIn(s[1], scale=1.3), lag_ratio=0.45) for s in sauts],
                  run_time=0.5)
        self.calc([("Chaque heure, il reste environ", WHITE, "Chaque heure"), ("74 %", RAISON, "74 %")], -1.3,
                  centre=-0.3, fs=42, larg=11)
        self.calc([("de la quantité de l'heure d'avant.", WHITE, "de la quantité")], -2.05, centre=-0.3, fs=42,
                  larg=11)
        b = self.calc([("une baisse d'environ", WHITE, "une baisse"), ("26 %", JAUNE_TITRE, "26 %"),
                       ("par heure", WHITE, "par heure")], -2.95, centre=-0.5, fs=44, larg=10.6)
        self.play(Create(self.encadre(b, JAUNE_TITRE, 0.16)), run_time=0.35)
        self.attendre_voix(marge=0.6)

    # ── 06 : question-pause n° 1 → C (géométrique de raison eᵃ) ────────────

    def ecran_question1(self):
        fs, largeur = 40, 9.2
        corps = [self.t("arithmétique de raison a", fs, WHITE, 1e9),
                 self.t("géométrique de raison a", fs, WHITE, 1e9),
                 self.maths([("t", "géométrique de raison", WHITE, None), ("e", "a", WHITE, RAISON, None)], 0, fs=fs,
                            larg=1e9, montrer=False)]
        place = largeur - self.place_coche - 0.5 * fs / 32 - 0.45
        f = min(1.0, place / max(c.width for c in corps))
        for c in corps:
            c.scale(f)
        cartes = VGroup(*[self.bouton(L, c, largeur, fs) for L, c in zip("ABC", corps)])
        cartes.arrange(DOWN, buff=0.22).move_to(P(0, -0.6))

        def e1():
            self._q1 = [self.calc([("Pour tout réel", WHITE, "Pour tout réel"), ("a,", RAISON, "a,")], 2.3, centre=0,
                                  fs=44, larg=11),
                        self.maths([("t", "la suite", WHITE, "la suite"), ("t", "uₙ =", TERME, "u indice n"),
                                    ("e", "na", WHITE, RAISON, "n a"), ("t", "est :", WHITE, "est :")], 1.55, fs=48,
                                   centre=0, larg=10.4)]

        q = self.question_libre("06-question", [e1], cartes, P(0, -2.75))
        self.dire("06b-reponse")
        self.au_mot("Réponse C")
        ok = self.q_reponse(q, 2)
        self.play(FadeOut(cartes[0]), FadeOut(cartes[1]), *[FadeOut(m) for m in self._q1], FadeOut(q.tete),
                  VGroup(cartes[2], ok).animate.move_to(P(0, 2.55)), run_time=0.4)
        self.maths([("e", "(n+1)a", WHITE, RAISON, "n plus 1"), ("t", "=", WHITE, "égale"),
                    ("e", "na", WHITE, RAISON, "n a,"), ("t", "×", WHITE, "fois e"),
                    ("e", "a", RAISON, RAISON, "puissance a :")], 1.15, fs=54, centre=0, larg=11)
        lg = LigneTermes(["", ""], centre=P(-0.3, -0.35), pas=2.6, largeur=2.2, hauteur=0.85, fs=36,
                         noms=["uₙ", "uₙ₊₁"], fs_noms=32)
        self.au_mot("d'un terme au suivant")
        self.play(FadeIn(lg, shift=UP * 0.1), run_time=0.35)
        self.calc([("d'un terme au suivant,", WHITE, None)], -1.75, centre=-0.3, fs=42, larg=10.4)
        self.saut_e(lg, 0, "a", cote=UP, fs=32)
        fin = self.maths([("t", "on multiplie par", WHITE, "on multiplie"), ("e", "a", JUSTE, JUSTE, "puissance a.")],
                         -2.6, fs=48, centre=-0.3, larg=10.4)
        self.play(Create(self.encadre(fin, JUSTE, 0.16)), run_time=0.35)
        self.attendre_voix(marge=0.6)

    # ── 07 : le premier terme : u₀ = e⁰ = 1, quel que soit a ───────────────

    def ecran_premier(self):
        self.nouvel_ecran("07-premier")
        self.titre("Le premier terme", JAUNE_TITRE, 46, extrait="premier terme", y=3.1)
        g = self.maths([("t", "u₀ =", TERME, "u indice 0"), ("e", "0 × a", WHITE, RAISON, "0 fois a"),
                        ("t", "=", WHITE, "c'est-à-dire"), ("e", "0", WHITE, RAISON, "e puissance 0,"),
                        ("t", "=", WHITE, "donc"), ("t", "1", JUSTE, "1.")], 1.95, fs=50, centre=None, x=-6.0,
                       larg=7.0)
        self.play(Create(self.encadre(VGroup(*g[3:]), JUSTE, 0.16)), Indicate(g[5], color=JUSTE, scale_factor=1.4),
                  run_time=0.6)
        nu = NuageTermes((0, 4.2), (0, 3.5), P(1.3, -1.35), P(5.3, 2.2), fs=24)
        for n in (1, 2, 3, 4):
            nu.add(nu.graduation_n(n, str(n), 22))
        un = self.trait_un(nu)
        cs, labs = [], []
        for a, coul in ((0.3, TERME), (0.1, VIOLET_ACCENT), (-0.5, RAISON)):
            cs.append(self.courbe(nu, (lambda a: lambda t: math.exp(a * t))(a), 0, 4.1, coul, 4))
            labs.append(self.t(f"a = {fr(a)}", 24, coul, audit=False))
        labs[0].move_to(nu.G(2.95, math.exp(0.3 * 2.95) + 0.5))      # les étiquettes restent DANS le repère
        labs[1].move_to(nu.G(3.3, math.exp(0.1 * 3.3) + 0.42))
        labs[2].move_to(nu.G(3.3, math.exp(-0.5 * 3.3) + 0.34))
        self.calc([("Quelle que soit la valeur de", WHITE, "Quelle que soit"), ("a,", RAISON, "de a")], -2.05,
                  centre=-0.6, fs=42, larg=11,
                  avec_morceau={0: self.axes(nu, [FadeIn(gr) for gr in nu[4:]]),
                                1: [Create(cs[0]), FadeIn(labs[0])]})
        f = self.maths([("t", "la suite", WHITE, "la suite"), ("e", "na", WHITE, RAISON, "n a"),
                        ("t", "démarre à 1.", JUSTE, "démarre à 1")], -2.9, fs=46, centre=-0.6, larg=10.6,
                       avec_item={1: [Create(cs[1]), FadeIn(labs[1]), Create(cs[2]), FadeIn(labs[2])],
                                  2: [Create(un[0]), FadeIn(un[1]), GrowFromCenter(un[2])]})
        self.play(Indicate(un[2], color=JUSTE, scale_factor=1.6), Indicate(VGroup(*f[2:]), color=JUSTE,
                                                                           scale_factor=1.06), run_time=0.5)
        self.attendre_voix(marge=0.6)

    def trait_un(self, nu):
        """Le trait u = 1, son « 1 » et le point (0 ; 1) d'où partent toutes les courbes."""
        y = nu.G(0, 1)[1]
        tr = DashedLine(P(nu.G(0, 1)[0], y), P(nu.X1 + 0.1, y), color=JUSTE, stroke_width=3, dash_length=0.1)
        lab = self.t("1", 26, JUSTE, audit=False).next_to(tr, LEFT, buff=0.1)
        return VGroup(tr, lab, Dot(nu.G(0, 1), radius=0.1, color=JUSTE))

    # ── 08 : le piège : pour e²ⁿ, la raison est e² ≈ 7,39, pas 2 ───────────

    def ecran_piege(self):
        self.nouvel_ecran("08-piege")
        self.titre("Voilà le piège !", PIEGE, 48, extrait="piège", y=3.05)
        self.maths([("t", "Devant", WHITE, "Devant"), ("t", "uₙ =", TERME, "u indice n"),
                    ("e", "2n", WHITE, PIEGE, "e puissance 2 n"), ("t", ":", GREY_A, None)], 2.5, fs=50, centre=0,
                   larg=10.4)
        cr = self.carte(5.1, 1.3, P(-3.35, -0.55), PIEGE)
        tr = self.maths([("t", "raison", WHITE, None), ("t", "2", PIEGE, None)], 0, fs=46, larg=1e9,
                        montrer=False).move_to(cr).shift(LEFT * 0.4)
        cv = self.carte(5.1, 1.3, P(2.35, -0.55), JUSTE)
        self.calc([("un élève annonce une raison de", WHITE, "un élève"), ("2.", PIEGE, "de 2")], 1.82, centre=0,
                  fs=42, larg=11.4, avec_morceau={1: [FadeIn(cr), FadeIn(tr, scale=1.2)]})
        croix = self.croix(P(-1.5, -0.55), 0.3)
        self.calc([("C'est faux.", PIEGE, "C'est faux"), ("Le 2 est dans l'EXPOSANT :", WHITE, "Le 2 est")], 1.18,
                  centre=0, fs=40, larg=11.8, avec_morceau={0: [Create(croix)]})
        self.calc([("il ne sort pas tel quel.", WHITE, "il ne sort pas")], 0.55, centre=0, fs=40, larg=11.8)
        self.au_mot("Ce qui sort")
        self.play(FadeIn(cv), run_time=0.3)
        self.maths([("t", "raison", WHITE, "un facteur"), ("e", "2", JUSTE, JUSTE, "e puissance 2,"),
                    ("t", "≈ 7,39", JUSTE, "environ 7,39")], -0.55, fs=42, centre=2.35, larg=4.7)
        lg = LigneTermes(["1", "7,39"], centre=P(-3.35, -2.5), pas=2.4, largeur=2.0, hauteur=0.78, fs=34,
                         noms=["u₀", "u₁"], fs_noms=28)
        self.suivre("1 et")
        self.montrer_case(lg, 0, run_time=0.35)
        self.suivre("7,39 :")
        self.montrer_case(lg, 1, run_time=0.35)
        s7 = lg.saut(0, "× 7,39", cote=UP, fs=28)
        self.play(Create(s7[0]), FadeIn(s7[1], scale=1.3), run_time=0.4)
        p = self.calc([("on multiplie par", WHITE, "on a bien"), ("7,39,", JUSTE, "par 7,39")], -1.95, centre=2.3,
                      fs=36, larg=5.4)
        f = self.calc([("pas par 2", PIEGE, "pas par 2")], -2.55, centre=2.3, fs=36, larg=5.4)
        self.play(Create(self.barre_lisible(f)), Indicate(p[1], color=JUSTE, scale_factor=1.2), run_time=0.45)
        self.attendre_voix(marge=0.6)

    # ── 09 : question-pause n° 2 → B (raison ≈ 0,61, décroissante) ─────────

    def choix_e(self, rangs, fs=34, buff=0.12):
        """Un corps de bouton sur plusieurs lignes, CHAQUE morceau à sa voix :
        rangs = [[item, …], …] (items de maths()). Renvoie un VGroup plat (.extraits)."""
        rows, pieces, extraits = [], [], []
        for r in rangs:
            g = self.maths(r, 0, fs=fs, larg=1e9, montrer=False)
            rows.append(g)
            for b, it in zip(g, r):
                pieces.append(b)
                extraits.append(it[-1])
        VGroup(*rows).arrange(DOWN, buff=buff, aligned_edge=LEFT)
        g = VGroup(*pieces)
        g.extraits = extraits
        return g

    def ecran_question2(self):
        fs, largeur = 34, 10.2
        corps = [
            self.choix_e([[("t", "géométrique de raison", WHITE, "géométrique"), ("t", "−0,5,", PIEGE, "moins 0,5")],
                          [("t", "et décroissante", WHITE, "et décroissante")]], fs),
            self.choix_e([[("t", "géométrique de raison", WHITE, "géométrique"),
                           ("e", "−0,5", JUSTE, JUSTE, "e puissance moins 0,5")],
                          [("t", "≈ 0,61, et décroissante", WHITE, "environ 0,61")]], fs),
            self.choix_e([[("t", "géométrique de raison", WHITE, "géométrique"),
                           ("e", "−0,5", WHITE, RAISON, "e puissance moins 0,5")],
                          [("t", "et croissante", PIEGE, "et croissante")]], fs)]
        place = largeur - self.place_coche - 0.5 * fs / 32 - 0.45
        f = min(1.0, place / max(c.width for c in corps))
        for c in corps:
            c.scale(f)
        cartes = VGroup(*[self.bouton(L, c, largeur, fs) for L, c in zip("ABC", corps)])
        cartes.arrange(DOWN, buff=0.18).move_to(P(0, -0.5))   # le rebours passe SOUS le bouton C sans le toucher

        def e1():
            self._q2 = [self.maths([("t", "La suite", WHITE, "La suite"), ("t", "vₙ =", TERME, "v indice n"),
                                    ("e", "−0,5n", WHITE, RAISON, "moins 0,5 n"), ("t", "est :", WHITE, "est :")],
                                   2.25, fs=48, centre=0, larg=10.4)]

        q = self.question_libre("09-question", [e1], cartes, P(0, -3.15))
        self.dire("09b-reponse")
        self.au_mot("Réponse B")
        ok = self.q_reponse(q, 1)
        self.play(FadeOut(cartes[0]), FadeOut(cartes[2]), *[FadeOut(m) for m in self._q2], FadeOut(q.tete),
                  VGroup(cartes[1], ok).animate.move_to(P(0, 2.55)), run_time=0.4)
        x0 = -6.0
        nu = NuageTermes((0, 8.4), (-0.12, 1.12), P(1.5, -2.3), P(5.2, 1.35), nom_u="vₙ", fs=24)
        pts = VGroup(*[nu.point(n, math.exp(-0.5 * n), TERME, 0.085) for n in range(9)])
        zero = DashedLine(nu.G(0, 0), nu.G(8.4, 0), color=JUSTE, stroke_width=2.5, dash_length=0.1)
        self.calc([("La raison vaut environ", WHITE, "La raison vaut"), ("0,61", JUSTE, "0,61")], 1.3, x=x0, fs=40,
                  larg=6.5, centre=None, avec_morceau={0: self.axes(nu)})
        g = self.gauge(P(-5.9, -0.4), 4.0, 0.61)
        self.calc([("elle est entre 0 et 1 :", WHITE, "entre 0 et 1")], 0.55, x=x0, fs=40, larg=6.5, centre=None,
                  avec=[FadeIn(g, shift=UP * 0.1)])
        self.calc([("donc chaque terme", WHITE, "chaque terme")], -1.3, x=x0, fs=38, larg=6.5, centre=None,
                  avec_morceau={0: [LaggedStart(*[GrowFromCenter(d) for d in pts], lag_ratio=0.1)]})
        self.calc([("est plus petit que le précédent,", WHITE, "est plus petit")], -2.0, x=x0, fs=38, larg=6.5,
                  centre=None)
        fin = self.calc([("tout en restant", WHITE, "tout en restant"), ("strictement positif.", JUSTE, "strictement")],
                        -2.95, centre=-0.5, fs=42, larg=11, avec_morceau={1: [Create(zero)]})
        self.play(Create(self.encadre(fin, JUSTE, 0.16)), run_time=0.35)
        self.attendre_voix(marge=0.6)

    def gauge(self, gauche, longueur, v, couleur=RAISON):
        """Le segment [0 ; 1] et la raison placée dessus (nombres NON dits : hors audit)."""
        y = gauche[1]
        ax = Line(gauche, gauche + P(longueur, 0), stroke_color=GREY_A, stroke_width=4)
        b0 = Line(gauche + P(0, -0.14), gauche + P(0, 0.14), stroke_color=GREY_A, stroke_width=4)
        b1 = Line(gauche + P(longueur, -0.14), gauche + P(longueur, 0.14), stroke_color=GREY_A, stroke_width=4)
        l0 = self.t("0", 26, GREY_A, audit=False).move_to(P(gauche[0], y - 0.4))
        l1 = self.t("1", 26, GREY_A, audit=False).move_to(P(gauche[0] + longueur, y - 0.4))
        xv = gauche[0] + v * longueur
        pt = Dot(P(xv, y), radius=0.1, color=couleur)
        lv = self.t(fr(v), 28, couleur, audit=False).move_to(P(xv, y + 0.42))
        rempli = Line(gauche, P(xv, y), stroke_color=couleur, stroke_width=8)
        return VGroup(ax, rempli, b0, b1, l0, l1, pt, lv)

    # ── 10 : le défi : deux médicaments, e^(−0,2) et e^(−0,5) ──────────────

    def ecran_defi(self):
        self.nouvel_ecran("10-defi")
        tit = self.titre("À toi de jouer !", JAUNE_TITRE, 48, extrait="À toi", y=3.05)
        self.calc([("Soraya compare", WHITE, "Soraya compare"), ("deux médicaments :", JAUNE_TITRE, "deux médicaments")],
                  2.5, centre=0, fs=42, larg=11.4)
        c1 = self.carte(5.9, 2.2, P(-3.2, 0.85), TERME)
        c2 = self.carte(5.9, 2.2, P(3.2, 0.85), RAISON)
        f1 = flacon(1.15, TERME, 0.8).move_to(P(-5.2, 0.45))
        f2 = flacon(1.15, RAISON, 0.8).move_to(P(1.2, 0.45))
        l1 = self.t("le premier", 32, GREY_A).move_to(P(-3.2, 1.52))
        l2 = self.t("le second", 32, GREY_A).move_to(P(3.2, 1.52))
        self.au_mot("le premier")
        self.play(FadeIn(c1), FadeIn(l1, shift=DOWN * 0.1), FadeIn(f1, scale=0.8), run_time=0.4)
        self.maths([("t", "uₙ =", TERME, "u indice n"), ("e", "−0,2n", WHITE, RAISON, "moins 0,2 n")], 0.45, fs=46,
                   centre=-2.4, larg=4.4)
        self.au_mot("le second")
        self.play(FadeIn(c2), FadeIn(l2, shift=DOWN * 0.1), FadeIn(f2, scale=0.8), run_time=0.4)
        self.maths([("t", "vₙ =", TERME, "v indice n"), ("e", "−0,5n", WHITE, RAISON, "moins 0,5 n")], 0.45, fs=46,
                   centre=4.0, larg=4.4)
        self.calc([("1.", RAISON, "Première étape"), ("la raison de chacun.", WHITE, "la raison")], -0.95, centre=-0.4,
                  fs=42, larg=11)
        self.calc([("2.", RAISON, "Deuxième étape"), ("lequel s'élimine le plus vite,", WHITE, "lequel s'élimine")],
                  -1.72, centre=-0.4, fs=42, larg=11)
        self.calc([("et de combien de % par heure ?", WHITE, "et de combien")], -2.45, centre=-0.4, fs=42, larg=11)
        self.defi_pause(-3.2, x=-0.9)
        self._defi = (tit, [c1, c2, f1, f2, l1, l2], f1, f2)

    def ecran_correction(self):
        self.dire("10b-correction")
        tit, garder, f1, f2 = self._defi
        self.au_mot("Correction")
        cor = self.t("Correction", 46, JUSTE).move_to(tit)
        autres = [m for m in self.mobjects if m is not tit and m is not self._margo and m not in garder]
        self.play(*[FadeOut(m) for m in autres], ReplacementTransform(tit, cor), run_time=0.45)
        self.remove(*autres)
        self.maths([("t", "uₙ =", TERME, None), ("e", "−0,2n", WHITE, RAISON, None)], 0.45, fs=46, centre=-2.4,
                   larg=4.4, rt=0.2)
        self.maths([("t", "vₙ =", TERME, None), ("e", "−0,5n", WHITE, RAISON, None)], 0.45, fs=46, centre=4.0,
                   larg=4.4, rt=0.2)
        self.maths([("t", "raison", WHITE, "a pour raison"), ("e", "−0,2", RAISON, RAISON, "moins 0,2,"),
                    ("t", "≈ 0,82", JUSTE, "0,82")], -0.95, fs=42, centre=-3.2, larg=5.9)
        p1 = self.calc([("il perd environ", WHITE, "il perd"), ("18 %", JAUNE_TITRE, "18 %"), ("par heure.", WHITE, "par heure")],
                       -1.8, centre=-3.2, fs=38, larg=5.9,
                       avec_morceau={1: [f1.liq.animate.stretch(0.82, 1, about_edge=DOWN)]})
        self.maths([("t", "raison", WHITE, "a pour raison"), ("e", "−0,5", RAISON, RAISON, "moins 0,5,"),
                    ("t", "≈ 0,61", JUSTE, "0,61")], -0.95, fs=42, centre=3.2, larg=5.9)
        p2 = self.calc([("il perd environ", WHITE, "il perd"), ("39 %", JAUNE_TITRE, "39 %"), ("par heure.", WHITE, "par heure")],
                       -1.8, centre=3.2, fs=38, larg=5.9,
                       avec_morceau={1: [f2.liq.animate.stretch(0.61, 1, about_edge=DOWN)]})
        fin = self.calc([("c'est", WHITE, "C'est donc"), ("le second", JUSTE, "le second"),
                         ("qui s'élimine le plus vite.", WHITE, "qui s'élimine")], -2.85, centre=-0.5, fs=44, larg=11)
        self.play(Create(self.encadre(fin, JUSTE, 0.16)), Indicate(p2[1], color=JAUNE_TITRE, scale_factor=1.2),
                  run_time=0.5)
        self.attendre_voix(marge=0.6)

    # ── 11 : ce que tu as appris ───────────────────────────────────────────

    def ecran_appris(self):
        fs = 40
        li = lambda items: self.maths(items, 0, fs=fs, larg=1e9, montrer=False)  # noqa: E731
        p1 = [li([("t", "La suite", WHITE, None), ("e", "na", WHITE, RAISON, None),
                  ("t", "est géométrique :", WHITE, None)]),
              li([("t", "sa raison est", WHITE, None), ("e", "a", RAISON, RAISON, None), ("t", ",", GREY_A, None)]),
              li([("t", "et son premier terme est 1.", WHITE, None)])]
        p2 = [li([("t", "On le démontre avec le quotient", WHITE, None)]),
              li([("t", "de deux termes qui se suivent,", WHITE, None)]),
              li([("t", "et la relation fonctionnelle.", WHITE, None)])]
        p3 = [li([("t", "Le nombre de l'exposant", WHITE, None)]),
              li([("t", "ne devient jamais la raison tout seul.", PIEGE, None)])]
        self.finale([(p1, ["La suite e puissance", "sa raison", "son premier terme"]),
                     (p2, ["On le démontre", "de deux termes", "et la relation"]),
                     (p3, ["le nombre écrit", "ne devient jamais"])], cle="11-finale")

    def construct(self):
        ecrans = [self.ecran_garde, self.ecran_situation, self.ecran_releves, self.ecran_suite, self.ecran_quotient,
                  self.ecran_conclusion, self.ecran_question1, self.ecran_premier, self.ecran_piege,
                  self.ecran_question2, self.ecran_defi, self.ecran_correction, self.ecran_appris,
                  lambda: self.fin("12-abonne")]
        choix = os.environ.get("ECRANS")          # contrôle rapide : ECRANS=5,6 (jamais au rendu final)
        for k, e in enumerate(ecrans):
            if not choix or str(k) in choix.split(",") or (e == self.ecran_correction and "10" in choix.split(",")):
                e()
