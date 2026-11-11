# suite_recurrence_preuve.py
# EleveAI — Maths Terminale (spé) — paysage « Raisonnement par récurrence »
# (16:9), ceinture VERTE. Série SUITES, épisode 29.
# Micro du coach : suite_recurrence_preuve (notion suite_numerique) :
# lib/tutor-v4/questionBank/terminale-spe/maths/suites.bank.ts
# + suites-renfort.ts.
#
# Ce que demande le coach → écran :
#   · l'ordre des trois étapes (h1, fixed_1, open_1)               → 03, 04, 05, 12 ;
#   · l'initialisation au PREMIER rang (h3, valeurInit)            → 03, 09 ;
#   · l'hypothèse : P(k) pour UN entier k (genHypothese, fixed_3)  → 04, 06 ;
#   · le calcul d'hérédité (heredCalcul : × a positif, + b)        → 04, 11b ;
#   · l'étape qui manque (genEtapeManque)                          → 08 ;
#   · l'hérédité seule ne suffit pas (h5, open_2, genEtapeFausse)  → 07 ;
#   · la conclusion à partir du rang de l'initialisation (conclRang) → 09, 10.
# Clé de voix → écran :
#   00-garde (l'escalier qu'on monte marche après marche, échelle des ceintures)
#   · 01 Sami, technicien de maintenance : la piscine, la jauge de chlore (la
#   nuit en enlève la moitié, la machine ajoute 1 mg/L), le trait rouge 2 mg/L
#   · 02 le modèle u₀ = 1, uₙ₊₁ = 0,5 uₙ + 1, la machine « × 0,5 » puis « + 1 »,
#   P(n) : uₙ ≤ 2 · 03 l'initialisation (bloc 1, la 1re marche s'allume)
#   · 04 l'hérédité (bloc 2, de la marche k à la marche k + 1) · 05 la
#   conclusion (bloc 3, on monte tout l'escalier) · 06/06b question (B : uₖ ≤ 2
#   pour UN k) · 07 le piège : les dominos qui ne tombent pas (u₀ = 3) · 08/08b
#   question (C : il manque l'initialisation) · 09 à partir d'un rang : 2ⁿ ≥ n²,
#   l'escalier commence à la marche 4 · 10/10b question (A : n ≥ 4) · 11/11b
#   défi u₀ = 2, uₙ₊₁ = 0,5 uₙ + 3, uₙ ≤ 6 · 12 « Ce que tu as appris » · 13 fin.
# Code couleur (module commun) : bleu = termes, orange = les opérations (× 0,5,
# + 1), vert = juste (marche validée), rouge = piège. ⛔ Pas de LaTeX.
# Voix : manim/voix/terminale-suite-recurrence-preuve.json (débit −6),
# calée mot à mot par suite_recurrence_preuve_marques.json.
# Contrôle : AUDIT=1 BORDS=1 python -m manim render --dry_run …
# python -m manim render -qh --disable_caching manim/scripts/terminale/suite_recurrence_preuve.py SuiteRecurrencePreuveTle -o eleveai-maths-terminale-suite-recurrence-preuve --media_dir manim/scripts/terminale/media-suite-recurrence-preuve
# Sortie : manim/sorties/terminale/maths/suites/29-recurrence-preuve/

import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI))
sys.path.insert(1, str(ICI.parent / "premiere"))

from suites_commun import *  # noqa: E402,F403

# ── les affirmations de la voix, vérifiées ──────────────────────────────────
f = lambda x: 0.5 * x + 1  # noqa: E731
u_ = [1.0]
for _ in range(30):
    u_.append(f(u_[-1]))
assert all(v <= 2 for v in u_)                                     # Sami : jamais plus de 2
assert all(0.5 * x <= 1 and 0.5 * x + 1 <= 2 for x in (2, 1.5, 0))  # l'hérédité
assert 3 > 2 and f(3) > 2                                          # le piège : u₀ = 3
assert 2 ** 4 == 16 == 4 ** 2 and 2 ** 3 == 8 < 9 == 3 ** 2       # à partir du rang 4
assert all(2 ** n >= n * n for n in range(4, 40))
g = lambda x: 0.5 * x + 3  # noqa: E731
assert 2 <= 6 and 0.5 * 6 == 3 and g(6) == 6                       # le défi
v_ = [2.0]
for _ in range(30):
    v_.append(g(v_[-1]))
assert all(v <= 6 for v in v_)

EAU, CHLORE, PEAU = "#0EA5E9", "#A3E635", "#8d5524"
BLOC_W, BLOC_H, Y_BLOC = 3.9, 0.72, 3.1
ETAPES = ("Initialisation", "Hérédité", "Conclusion")


def bonhomme(s=1.0, couleur=TERME):
    """Le grimpeur de l'escalier (pieds sur l'origine)."""
    k = dict(stroke_color=WHITE, stroke_width=5)
    tete = Circle(radius=0.12, fill_color=PEAU, fill_opacity=1, stroke_width=0).move_to(P(0, 0.78))
    corps = Line(P(0, 0.64), P(0, 0.32), stroke_color=couleur, stroke_width=9)
    j1 = VMobject(**k).set_points_as_corners([P(0, 0.32), P(0.1, 0.16), P(0.12, 0.0)])
    j2 = VMobject(**k).set_points_as_corners([P(0, 0.32), P(-0.08, 0.15), P(-0.12, 0.0)])
    b1 = VMobject(**k).set_points_as_corners([P(0, 0.58), P(0.14, 0.44), P(0.22, 0.56)])
    b2 = VMobject(**k).set_points_as_corners([P(0, 0.58), P(-0.14, 0.44), P(-0.2, 0.34)])
    return VGroup(j1, j2, corps, b1, b2, tete).scale(s, about_point=ORIGIN)


class Escalier(VGroup):
    """n marches de largeur w, hauteur h, la 1re posée en (x0, y0).
    self.marches[k] : le dessus de la marche k ; self.pied(k) : où poser le grimpeur."""

    def __init__(self, n, x0, y0, w=0.85, h=0.5, couleur=GREY_B, **kw):
        super().__init__(**kw)
        self.n, self.x0, self.y0, self.w, self.h = n, x0, y0, w, h
        self.marches, self.contremarches = VGroup(), VGroup()
        for k in range(n):
            self.marches.add(Line(P(x0 + k * w, y0 + k * h), P(x0 + (k + 1) * w, y0 + k * h), stroke_width=6,
                                  color=couleur))
            if k < n - 1:
                self.contremarches.add(Line(P(x0 + (k + 1) * w, y0 + k * h), P(x0 + (k + 1) * w, y0 + (k + 1) * h),
                                            stroke_width=3, color=GREY_D))
        self.add(self.contremarches, self.marches)

    def pied(self, k):
        return P(self.x0 + (k + 0.5) * self.w, self.y0 + k * self.h + 0.03)

    def etiquette(self, k, texte, fs=26, couleur=GREY_A, audit=False):
        t = Text(texte, font_size=fs, color=couleur).next_to(self.marches[k], DOWN, buff=0.12)
        if not audit:
            t._pas_audit = True
        return t

    def fleche(self, k, j=None, couleur=RAISON):
        """La flèche « de la marche k à la marche j » (au-dessus des marches)."""
        j = k + 1 if j is None else j
        a, b = self.pied(k) + UP * 1.0, self.pied(j) + UP * 1.0
        return CurvedArrow(a, b, angle=-PI / 2.6, color=couleur, stroke_width=4, tip_length=0.15)


def domino(x, y0, h=1.1, w=0.26, couleur=TERME):
    return Rectangle(width=w, height=h, fill_color=couleur, fill_opacity=0.9, stroke_color=WHITE,
                     stroke_width=2).move_to(P(x, y0 + h / 2))


def sami(s=1.0):
    """Sami, technicien de maintenance : casquette, combinaison, clé à molette."""
    tete = Circle(radius=0.28, fill_color=PEAU, fill_opacity=1, stroke_width=0).move_to(P(0, 1.0))
    casq = Sector(radius=0.3, angle=PI, start_angle=0, fill_color=RAISON, fill_opacity=1,
                  stroke_width=0).move_to(P(0, 1.2))
    visiere = RoundedRectangle(width=0.36, height=0.07, corner_radius=0.03, fill_color=RAISON, fill_opacity=1,
                               stroke_width=0).move_to(P(0.2, 1.17))
    corps = RoundedRectangle(width=0.95, height=1.15, corner_radius=0.25, fill_color="#1E3A8A", fill_opacity=1,
                             stroke_width=0).move_to(P(0, 0.12))
    bande = Rectangle(width=0.95, height=0.08, fill_color="#FACC15", fill_opacity=1, stroke_width=0).move_to(
        P(0, 0.05))
    manche = Line(P(0.4, 0.5), P(0.75, 0.15), stroke_color="#1E3A8A", stroke_width=12)
    cle = VGroup(Line(P(0.75, 0.15), P(0.95, -0.25), stroke_color=GREY_A, stroke_width=8),
                 Arc(radius=0.1, start_angle=-PI / 3, angle=4 * PI / 3, stroke_color=GREY_A,
                     stroke_width=7).move_to(P(1.0, -0.33)))
    return VGroup(corps, bande, manche, cle, tete, casq, visiere).scale(s)


def lune(r=0.3):
    a = Circle(radius=r, fill_color="#FDE68A", fill_opacity=1, stroke_width=0)
    b = Circle(radius=r * 0.85, fill_color=BLACK, fill_opacity=1, stroke_width=0).shift(P(r * 0.45, r * 0.2))
    return VGroup(a, b)


def machine(s=1.0):
    """La pompe doseuse : un boîtier, un voyant, un tuyau."""
    boite = RoundedRectangle(width=0.8, height=0.6, corner_radius=0.08, fill_color=GREY_D, fill_opacity=1,
                             stroke_color=GREY_B, stroke_width=2)
    voyant = Dot(boite.get_center() + P(-0.2, 0.1), radius=0.07, color=CHLORE)
    ecran = Rectangle(width=0.3, height=0.16, fill_color="#0f172a", fill_opacity=1, stroke_width=0).move_to(
        boite.get_center() + P(0.15, 0.1))
    return VGroup(boite, voyant, ecran).scale(s)


class SuiteRecurrencePreuveTle(PaysageSuites):
    fichier_marques = "suite_recurrence_preuve_marques.json"
    nom_voix = "terminale-suite-recurrence-preuve"
    identite = "Maths Tle — EleveAI"
    ceinture = "verte"

    # ── outils de l'épisode ────────────────────────────────────────────────

    def ecran_garde_bandeau(self, cle):
        """Un nouvel écran qui GARDE le bandeau des trois étapes (et Ti-Margo)."""
        self.dire(cle)
        famille = self._bandeau.get_family()
        self._effacer_ancien(garder=[m for m in self.mobjects if any(m is f for f in famille)])

    def bloc(self, i):
        """Le bloc de l'étape i (cadre seul ; le nom apparaît quand la voix le dit)."""
        x = (i - 1) * (BLOC_W + 0.25)
        cadre = RoundedRectangle(width=BLOC_W, height=BLOC_H, corner_radius=0.14, stroke_color=GREY_D,
                                 stroke_width=3, fill_color=FOND_CARTE, fill_opacity=1).move_to(P(x, Y_BLOC))
        nom = self.t(ETAPES[i], 36, WHITE).move_to(cadre)
        return VGroup(cadre, nom)

    def allumer_bloc(self, i, extrait):
        """L'étape i s'allume (contour jaune épais, son nom) ; les autres passent au vert."""
        b = self._bandeau[i]
        anims = [b[0].animate.set_stroke(JAUNE_TITRE, width=7)]
        for j in range(i):
            anims.append(self._bandeau[j][0].animate.set_stroke(JUSTE, width=4))
        self.au_mot(extrait)
        self.play(*anims, FadeIn(b[1], scale=1.2), run_time=0.4)
        self.insister(b, 1.08)

    def ligne(self, morceaux, y, x=None, fs=40, avec=()):
        """Une ligne écrite morceau par morceau : [(texte, couleur, extrait), …] ;
        chaque morceau quand la voix dit son extrait (None : avec le précédent)."""
        ts = [self.t(m, fs, c) for m, c, _ in morceaux]
        g = VGroup(*ts).arrange(RIGHT, buff=0.18).move_to(P(0, y))
        if x is not None:
            g.align_to(P(x, 0), LEFT)
        paquet = []
        for tx, (_, _, ex) in zip(ts, morceaux):
            if ex is not None and paquet:
                self.play(*[FadeIn(p, shift=UP * 0.1) for p in paquet], run_time=0.2)
                paquet = []
            if ex is not None:
                self.suivre(ex)
            paquet.append(tx)
        self.play(*[FadeIn(p, shift=UP * 0.1) for p in paquet], *avec, run_time=0.25)
        return g

    # ── 00 : la garde ──────────────────────────────────────────────────────

    def escalier_garde(self):
        esc = Escalier(6, -3.3, -1.55, w=0.95, h=0.24)
        pts = Text("…", font_size=40, color=GREY_A).move_to(esc.pied(5) + P(0.95, 0.45))
        bh = bonhomme(0.55).move_to(esc.pied(0), aligned_edge=DOWN)
        self.play(Create(esc), FadeIn(pts), run_time=0.5)
        self.play(FadeIn(bh, shift=DOWN * 0.1), esc.marches[0].animate.set_color(JUSTE), run_time=0.25)
        for k in range(1, 6):
            self.play(bh.animate.move_to(esc.pied(k), aligned_edge=DOWN), esc.marches[k].animate.set_color(JUSTE),
                      run_time=0.22, rate_func=smooth)

    def ecran_garde(self):
        self.garde("Raisonnement par récurrence",
                   [("Comment prouver qu'une chose est vraie", "Comment"),
                    ("pour tous les entiers,", "pour tous", TERME),
                    ("sans les essayer un par un ?", "sans les")],
                   dessin=self.escalier_garde, extrait_titre="Raisonnement")

    # ── 01 : Sami et la piscine ────────────────────────────────────────────

    XG, YG0, KG = 4.75, -2.35, 1.6     # la jauge : abscisse, pied, unités par mg/L

    def niveau(self, v, couleur=CHLORE):
        h = max(v * self.KG, 0.01)
        return Rectangle(width=0.62, height=h, fill_color=couleur, fill_opacity=0.85, stroke_width=0).move_to(
            P(self.XG, self.YG0 + h / 2))

    def ecran_situation(self):
        self.nouvel_ecran("01-situation")
        perso = sami(1.0).move_to(P(-5.0, 0.85))
        nom = self.t("Sami", 42, JAUNE_TITRE).next_to(perso, DOWN, buff=0.3)
        met = VGroup(self.t("technicien", 28, TERME), self.t("de maintenance", 28, TERME)).arrange(DOWN, buff=0.08)
        met.next_to(nom, DOWN, buff=0.12)
        self.au_mot("Sami")
        self.play(FadeIn(perso, shift=UP * 0.2), FadeIn(nom, shift=UP * 0.1), run_time=0.5)
        self.au_mot("technicien")
        self.play(FadeIn(met, shift=UP * 0.1), run_time=0.4)
        # la piscine olympique : le bassin, l'eau, les lignes d'eau
        bassin = RoundedRectangle(width=5.0, height=1.5, corner_radius=0.1, stroke_color=GREY_A, stroke_width=4,
                                  fill_color=EAU, fill_opacity=0.45).move_to(P(-0.55, -1.75))
        lignes = VGroup(*[DashedLine(P(-2.95, y), P(1.85, y), color=WHITE, stroke_width=2, dash_length=0.12)
                          for y in (-1.4, -1.75, -2.1)])
        vagues = VGroup(*[Arc(radius=0.18, start_angle=PI / 6, angle=2 * PI / 3, stroke_color=WHITE,
                              stroke_width=2).move_to(P(-2.4 + 0.9 * k, -1.05)) for k in range(6)])
        self.au_mot("piscine")
        self.play(DrawBorderThenFill(bassin), Create(lignes), run_time=0.6)
        self.play(LaggedStart(*[FadeIn(v, shift=RIGHT * 0.1) for v in vagues], lag_ratio=0.1), run_time=0.4)
        # la jauge de chlore
        tube = RoundedRectangle(width=0.8, height=2.4 * self.KG + 0.1, corner_radius=0.12, stroke_color=GREY_A,
                                stroke_width=3)
        tube.move_to(P(self.XG, 0)).align_to(P(0, self.YG0 - 0.05), DOWN)
        lch = self.t("chlore", 28, CHLORE).next_to(tube, LEFT, buff=0.15).align_to(tube, DOWN)
        self.au_mot("jour")
        self.suivre("0")
        j0 = self.t("jour 0", 36, WHITE).move_to(P(-2.0, -0.45))
        self.play(FadeIn(j0, shift=DOWN * 0.1), Create(tube), FadeIn(lch), run_time=0.4)
        self.au_mot("1 milligramme")
        niv = self.niveau(1)
        l1 = self.t("1 mg/L", 34, WHITE).next_to(niv, LEFT, buff=0.3).align_to(niv, UP)
        self.play(GrowFromEdge(niv, DOWN), FadeIn(l1, shift=LEFT * 0.1), run_time=0.5)
        self.au_mot("Chaque nuit")
        ln = lune(0.32).move_to(P(0.2, 1.75))
        self.play(FadeIn(ln, scale=0.6), run_time=0.4)
        self.au_mot("la moitié")
        moitie = self.t("la moitié disparaît", 32, RAISON).next_to(ln, DOWN, buff=0.2)
        haut = self.niveau(0.5, RAISON).shift(UP * 0.5 * self.KG)
        self.play(FadeIn(moitie, shift=UP * 0.1), FadeIn(haut), Transform(niv, self.niveau(0.5)),
                  FadeOut(l1), run_time=0.4)
        self.play(FadeOut(haut, shift=UP * 0.4), run_time=0.5)
        self.au_mot("la machine")
        mach = machine(1.2).move_to(P(2.85, -0.55))
        tuyau = Line(mach.get_right(), P(self.XG - 0.42, -0.55), stroke_color=GREY_B, stroke_width=5)
        self.play(FadeIn(mach, shift=UP * 0.1), Create(tuyau), run_time=0.4)
        self.au_mot("ajoute")
        self.suivre("1")
        p1 = self.t("+ 1 mg/L", 34, RAISON).next_to(mach, UP, buff=0.2)
        ajout = self.niveau(1, RAISON).shift(UP * 0.5 * self.KG)
        self.play(FadeIn(p1, scale=1.3), GrowFromEdge(ajout, DOWN), run_time=0.45)
        self.play(Transform(niv, self.niveau(1.5)), FadeOut(ajout), run_time=0.3)
        self.au_mot("garantie")
        y2 = self.YG0 + 2 * self.KG
        gar = self.t("Garantie :", 32, JUSTE).move_to(P(self.XG - 0.55, 2.95))
        self.play(FadeIn(gar, shift=DOWN * 0.1), run_time=0.3)
        self.au_mot("2 milligrammes")
        seuil = DashedLine(P(self.XG - 0.6, y2), P(self.XG + 0.6, y2), color=PIEGE, stroke_width=5)
        l2 = self.t("jamais plus de 2 mg/L", 30, PIEGE).move_to(P(self.XG - 0.75, 2.4))
        self.play(Create(seuil), FadeIn(l2, shift=DOWN * 0.1), run_time=0.4)
        self.insister(l2, 1.12)
        v = 1.5
        for _ in range(3):       # les nuits suivantes : le chlore monte, sans passer le trait
            self.play(Transform(niv, self.niveau(v / 2)), Indicate(ln, scale_factor=1.15), run_time=0.35)
            v = v / 2 + 1
            self.play(Transform(niv, self.niveau(v)), Indicate(mach, scale_factor=1.1), run_time=0.35)
        self.attendre_voix(marge=0.5)

    # ── 02 : le modèle ─────────────────────────────────────────────────────

    def ecran_modele(self):
        self.nouvel_ecran("02-modele")
        self.au_mot("On note")
        la = self.t("uₙ : le chlore au jour n (en mg/L)", 40, WHITE).move_to(P(0, 2.75))
        self.play(FadeIn(la, shift=DOWN * 0.1), run_time=0.35)
        self.au_mot("pour tout entier")
        lb = self.t("pour tout entier naturel n", 32, GREY_A).move_to(P(0, 2.12))
        self.play(FadeIn(lb, shift=UP * 0.1), run_time=0.3)
        self.au_mot("égale")
        self.suivre("1")
        u0 = self.t("u₀ = 1", 48, TERME).move_to(P(-4.3, 1.05))
        self.play(FadeIn(u0, scale=1.3), run_time=0.3)
        # la machine : uₙ → × 0,5 (la nuit) → + 1 (la pompe) → uₙ₊₁
        ya = -0.45
        ca = self.carte(1.3, 0.8, P(-3.9, ya), TERME)
        ta = self.t("uₙ", 40, TERME).move_to(ca)
        cm = Circle(radius=0.16, color=GREY_B, stroke_width=3).move_to(P(0, ya))
        cb = self.carte(1.5, 0.8, P(3.9, ya), TERME)
        tb = self.t("uₙ₊₁", 40, TERME).move_to(cb)
        f1 = Arrow(ca.get_right(), cm.get_left(), buff=0.1, color=RAISON, stroke_width=5)
        f2 = Arrow(cm.get_right(), cb.get_left(), buff=0.1, color=RAISON, stroke_width=5)
        e1 = self.t("× 0,5", 36, RAISON).next_to(f1, UP, buff=0.12)
        e2 = self.t("+ 1", 36, RAISON).next_to(f2, UP, buff=0.12)
        i1 = lune(0.24).next_to(f1, DOWN, buff=0.2)
        i2 = machine(0.8).next_to(f2, DOWN, buff=0.2)
        rel = [("uₙ₊₁ =", WHITE, "u indice n plus 1"), ("0,5", RAISON, "0,5"), ("uₙ", WHITE, None),
               ("+ 1", RAISON, "1")]
        ts = [self.t(m, 48, c) for m, c, _ in rel]
        VGroup(*ts).arrange(RIGHT, buff=0.18).move_to(P(1.7, 1.05))
        self.suivre("u indice n plus 1")
        self.play(FadeIn(ts[0], shift=UP * 0.1), FadeIn(ca), FadeIn(ta), FadeIn(cb), FadeIn(tb), run_time=0.3)
        self.suivre("0,5")
        bille = Dot(f1.get_start(), radius=0.08, color=TERME)
        self.play(FadeIn(ts[1], scale=1.3), FadeIn(ts[2]), GrowArrow(f1), FadeIn(e1, scale=1.3), FadeIn(i1),
                  FadeIn(cm), MoveAlongPath(bille, Line(f1.get_start(), f1.get_end())), run_time=0.45)
        self.suivre("1")
        self.play(FadeIn(ts[3], scale=1.3), GrowArrow(f2), FadeIn(e2, scale=1.3), FadeIn(i2),
                  MoveAlongPath(bille, Line(f2.get_start(), f2.get_end())), run_time=0.45)
        self.play(FadeOut(bille, scale=2), Indicate(tb, color=TERME), run_time=0.3)
        self.au_mot("On veut")
        ov = self.t("On veut démontrer :", 36, WHITE).move_to(P(0, -1.75)).align_to(P(-6.2, 0), LEFT)
        self.play(FadeIn(ov, shift=UP * 0.1), run_time=0.3)
        self.au_mot("P de n")
        pn = self.t("P(n) :", 46, JAUNE_TITRE)
        pu = self.t("uₙ ≤ 2", 46, JAUNE_TITRE)
        pp = VGroup(pn, pu).arrange(RIGHT, buff=0.3).move_to(P(0, -2.6)).align_to(P(-5.9, 0), LEFT)
        self.play(FadeIn(pn, shift=UP * 0.1), run_time=0.3)
        self.suivre("2")
        cad = self.encadre(pp, JAUNE_TITRE, 0.16)
        self.play(FadeIn(pu, scale=1.3), Create(cad), run_time=0.35)
        self.au_mot("pour tout entier", n=2)
        pt = self.t("pour tout entier naturel n", 34, JAUNE_TITRE).next_to(cad, RIGHT, buff=0.35)
        self.play(FadeIn(pt, shift=LEFT * 0.1), run_time=0.3)
        self.insister(VGroup(pp, cad), 1.1)
        self.attendre_voix(marge=0.6)

    # ── 03 : l'initialisation ──────────────────────────────────────────────

    def ecran_initialisation(self):
        self.nouvel_ecran("03-initialisation")
        self._bandeau = VGroup(*[self.bloc(i) for i in range(3)])
        self.play(*[FadeIn(b[0]) for b in self._bandeau], run_time=0.3)
        self.allumer_bloc(0, "l'initialisation")
        esc = Escalier(5, 1.55, -2.3, w=0.9, h=0.62)
        pts = Text("…", font_size=40, color=GREY_A).move_to(esc.pied(4) + P(0.55, 0.75))
        self.play(Create(esc), FadeIn(pts), run_time=0.5)
        self.au_mot("premier rang")
        a1 = self.t("Au premier rang :", 38, WHITE)
        a2 = self.t("n = 0", 38, JAUNE_TITRE)
        VGroup(a1, a2).arrange(RIGHT, buff=0.3).move_to(P(0, 1.85)).align_to(P(-6.2, 0), LEFT)
        self.play(FadeIn(a1, shift=UP * 0.1), run_time=0.3)
        self.suivre("0")
        e0 = esc.etiquette(0, "0", 30, JAUNE_TITRE, audit=True)
        bh = bonhomme(0.7).move_to(esc.pied(0), aligned_edge=DOWN)
        self.play(FadeIn(a2, scale=1.3), FadeIn(e0, scale=1.3), FadeIn(bh, shift=DOWN * 0.2), run_time=0.35)
        self.ligne([("u₀ =", WHITE, "u indice 0"), ("1", TERME, "1")], 0.85, x=-6.2, fs=46)
        self.ligne([("1", TERME, "1"), ("≤", WHITE, "inférieur"), ("2", WHITE, "2")], -0.2, x=-6.2, fs=46)
        self.au_mot("P de")
        self.suivre("0")
        ok = VGroup(self.coche(JUSTE, 0.24), self.t("P(0) est vraie", 44, JUSTE)).arrange(RIGHT, buff=0.25)
        ok.move_to(P(0, -1.45)).align_to(P(-6.2, 0), LEFT)
        self.play(Create(ok[0]), FadeIn(ok[1], shift=UP * 0.1), esc.marches[0].animate.set_color(JUSTE),
                  Flash(esc.pied(0) + UP * 0.1, color=JUSTE, line_length=0.25), run_time=0.45)
        self.insister(ok, 1.1)
        self.attendre_voix(marge=0.6)

    # ── 04 : l'hérédité ────────────────────────────────────────────────────

    def operation(self, texte, y, extrait, suite=None):
        """« ↓ × 0,5 » entre deux lignes de la chaîne (à droite) ; suite : (texte, extrait)."""
        fl = Arrow(P(-0.6, y + 0.32), P(-0.6, y - 0.32), buff=0, color=RAISON, stroke_width=5,
                   max_tip_length_to_length_ratio=0.35)
        tx = self.t(texte, 34, RAISON).next_to(fl, RIGHT, buff=0.15)
        self.suivre(extrait)
        self.play(GrowArrow(fl), FadeIn(tx, scale=1.3), run_time=0.3)
        g = VGroup(fl, tx)
        if suite:
            s = self.t(suite[0], 30, GREY_A).next_to(tx, RIGHT, buff=0.2)
            self.suivre(suite[1])
            self.play(FadeIn(s, shift=LEFT * 0.1), run_time=0.25)
            g.add(s)
        return g

    def ecran_heredite(self):
        self.ecran_garde_bandeau("04-heredite")
        self.allumer_bloc(1, "l'hérédité")
        esc = Escalier(3, 3.0, -1.75, w=1.05, h=0.8)
        esc.marches[0].set_stroke(opacity=0.4)
        pts = Text("…", font_size=40, color=GREY_A).move_to(esc.pied(0) + P(-0.75, -0.35))
        self.play(Create(esc), FadeIn(pts), run_time=0.45)
        x0 = -6.2
        bh = bonhomme(0.75).move_to(esc.pied(1), aligned_edge=DOWN)
        l1 = self.ligne([("Supposons", WHITE, "Supposons"), ("P(k)", JAUNE_TITRE, "P de k"),
                         ("vraie", WHITE, "vraie")], 2.1, x=x0, fs=40, avec=[FadeIn(bh, shift=DOWN * 0.2)])
        self.au_mot("pour un entier")
        l2 = self.t("pour un entier naturel k :", 34, GREY_A).move_to(P(0, 1.48)).align_to(P(x0, 0), LEFT)
        ek = esc.etiquette(1, "k", 34, JAUNE_TITRE)
        self.play(FadeIn(l2, shift=UP * 0.1), FadeIn(ek, scale=1.3), run_time=0.3)
        self.ligne([("uₖ", TERME, "u indice k"), ("≤ 2", WHITE, "2")], 0.75, x=x0, fs=44)
        self.operation("× 0,5", 0.3, "0,5", ("positif", "positif"))
        self.ligne([("0,5 uₖ", WHITE, "0,5 u indice k"), ("≤ 1", WHITE, "1")], -0.15, x=x0, fs=44)
        self.operation("+ 1", -0.6, "1")
        self.ligne([("0,5 uₖ", WHITE, "0,5 u indice k"), ("+ 1", WHITE, "1"), ("≤ 2", WHITE, "2")], -1.05, x=x0, fs=44)
        l6 = self.ligne([("c'est-à-dire", GREY_A, "C'est-à-dire"), ("uₖ₊₁", TERME, "u indice k plus 1"),
                         ("≤ 2", WHITE, "2")], -1.9, x=x0, fs=44)
        self.au_mot("P de k plus")
        self.suivre("1")
        fin = VGroup(self.coche(JUSTE, 0.24), self.t("P(k + 1) est vraie", 44, JUSTE)).arrange(RIGHT, buff=0.25)
        fin.move_to(P(0, -2.8)).align_to(P(x0, 0), LEFT)
        fl = esc.fleche(1, 2)
        ek1 = esc.etiquette(2, "k + 1", 34, JAUNE_TITRE, audit=True)
        self.play(Create(fin[0]), FadeIn(fin[1], shift=UP * 0.1), Create(fl), FadeIn(ek1, scale=1.3), run_time=0.4)
        self.play(bh.animate.move_to(esc.pied(2), aligned_edge=DOWN), esc.marches[2].animate.set_color(JUSTE),
                  run_time=0.45, rate_func=smooth)
        self.insister(fin, 1.08)
        self.attendre_voix(marge=0.6)

    # ── 05 : la conclusion ─────────────────────────────────────────────────

    def ecran_conclusion(self):
        self.ecran_garde_bandeau("05-conclusion")
        self.allumer_bloc(2, "la conclusion")
        esc = Escalier(6, 1.5, -2.3, w=0.8, h=0.48)
        pts = Text("…", font_size=40, color=GREY_A).move_to(esc.pied(5) + P(0.2, 0.95))
        self.play(Create(esc), FadeIn(pts), run_time=0.45)
        x0 = -6.2
        self.au_mot("P de")
        self.suivre("0")
        bh = bonhomme(0.6).move_to(esc.pied(0), aligned_edge=DOWN)
        c1 = VGroup(self.coche(JUSTE, 0.2), self.t("P(0) est vraie", 38, JUSTE)).arrange(RIGHT, buff=0.2)
        c1.move_to(P(0, 1.95)).align_to(P(x0, 0), LEFT)
        self.play(Create(c1[0]), FadeIn(c1[1], shift=UP * 0.1), FadeIn(bh, shift=DOWN * 0.2),
                  esc.marches[0].animate.set_color(JUSTE), run_time=0.4)
        self.au_mot("héréditaire")
        c2 = VGroup(self.coche(RAISON, 0.2), self.t("P est héréditaire", 38, RAISON)).arrange(RIGHT, buff=0.2)
        c2.move_to(P(0, 1.2)).align_to(P(x0, 0), LEFT)
        fls = [esc.fleche(k) for k in range(5)]
        self.play(Create(c2[0]), FadeIn(c2[1], shift=UP * 0.1),
                  LaggedStart(*[Create(x) for x in fls], lag_ratio=0.15), run_time=0.7)
        self.au_mot("Donc")
        d1 = self.t("Donc, pour tout entier naturel n :", 36, WHITE).move_to(P(0, 0.2)).align_to(P(x0, 0), LEFT)
        self.play(FadeIn(d1, shift=UP * 0.1), run_time=0.3)
        for k in range(1, 6):    # la montée s'enchaîne : chaque marche devient vraie
            self.play(bh.animate.move_to(esc.pied(k), aligned_edge=DOWN), esc.marches[k].animate.set_color(JUSTE),
                      Indicate(fls[k - 1], color=RAISON, scale_factor=1.1), run_time=0.24, rate_func=smooth)
        self.suivre("2")
        r = self.t("uₙ ≤ 2", 56, JUSTE).move_to(P(-3.2, -0.85))
        cad = self.encadre(r, JUSTE, 0.2)
        self.play(FadeIn(r, scale=1.3), Create(cad), run_time=0.35)
        self.insister(VGroup(r, cad), 1.12)
        self.au_mot("Sami")
        ps = sami(0.55).move_to(P(-5.6, -2.05))
        gs = self.t("Sami peut donner sa garantie", 30, WHITE).next_to(ps, RIGHT, buff=0.3)
        self.play(FadeIn(ps, shift=UP * 0.1), FadeIn(gs, shift=RIGHT * 0.1), run_time=0.4)
        self.attendre_voix(marge=0.6)

    # ── les questions : une « liste » de morceaux, chacun à son extrait ─────

    def montrer_liste(self, g, extraits=None, run_time=0.18):
        return super().montrer_liste(g, extraits or getattr(g, "extraits", None), run_time)

    def morceaux(self, rangees, fs=34, couleur=WHITE):
        """Des lignes de morceaux [[(texte, extrait), …], …] : un VGroup qui se
        montre morceau par morceau dans poser_question (comme une liste)."""
        g = VGroup()
        g.nombres, g.seps, g.extraits = [], [], []
        for r in rangees:
            ts = [self.t(m, fs, couleur) for m, _ in r]
            g.add(VGroup(*ts).arrange(RIGHT, buff=0.16))
            g.nombres += ts
            g.extraits += [ex for _, ex in r]
        g.arrange(DOWN, buff=0.08, aligned_edge=LEFT)
        g.seps = [VMobject() for _ in g.nombres[1:]]
        return g

    # ── 06 : question-pause n° 1 : l'hypothèse de récurrence → B ───────────

    def ecran_question1(self):
        choix = ["on suppose uₙ ≤ 2 pour tout n", "on suppose uₖ ≤ 2 pour un entier k", "on suppose u₀ ≤ 2"]
        q = self.poser_question("06-question",
                                [(self.t("Dans l'hérédité, quelle hypothèse écrit-on ?", 40), "Dans l'hérédité")],
                                choix, 1, largeur=11.4, fs=34)
        y = q.cartes.get_bottom()[1]
        self.dire("06b-reponse")
        self.q_reponse(q, 1)
        self.au_mot("UN rang k")
        e1 = VGroup(self.t("On suppose P à", 38, JUSTE), self.t("UN rang k", 40, JUSTE)).arrange(RIGHT, buff=0.2)
        e1.move_to(P(-0.4, y - 0.5))
        self.play(FadeIn(e1, shift=UP * 0.1), run_time=0.35)
        self.insister(e1[1], 1.2)
        self.au_mot("pour tout n")
        cx = self.barrer(q.cartes[0][1][1])
        e2 = self.t("pour tout n : ce serait admettre", 36, PIEGE).move_to(P(-0.4, y - 1.25))
        self.play(Create(cx), q.cartes[0].animate.set_opacity(0.6), FadeIn(e2, shift=UP * 0.1), run_time=0.4)
        self.au_mot("ce qu'on veut")
        e3 = self.t("ce qu'on veut démontrer !", 36, PIEGE).move_to(P(-0.4, y - 1.85))
        self.play(FadeIn(e3, shift=UP * 0.1), run_time=0.35)
        self.attendre_voix(marge=0.6)

    # ── 07 : le piège : les dominos qui ne démarrent pas ───────────────────

    XS_DOM = [-5.3 + 1.05 * k for k in range(7)]
    Y_DOM = -1.25

    def ecran_piege(self):
        self.nouvel_ecran("07-piege")
        tit = self.t("Le piège !", 46, PIEGE).move_to(P(0, 3.15))
        self.au_mot("piège")
        self.play(FadeIn(tit, scale=1.3), run_time=0.35)
        self.au_mot("L'hérédité seule")
        h1 = self.t("L'hérédité seule ne suffit pas.", 40, WHITE).move_to(P(0, 2.35))
        self.play(FadeIn(h1, shift=UP * 0.1), run_time=0.35)
        sol = Line(P(-5.8, self.Y_DOM), P(1.9, self.Y_DOM), stroke_color=GREY_B, stroke_width=3)
        doms = VGroup(*[domino(x, self.Y_DOM) for x in self.XS_DOM])
        pts = Text("…", font_size=40, color=GREY_A).move_to(P(2.35, self.Y_DOM + 0.3))
        self.au_mot("égale")
        self.suivre("3")
        u0 = self.t("u₀ = 3", 38, WHITE).next_to(doms[0], DOWN, buff=0.25)
        self.play(Create(sol), LaggedStart(*[FadeIn(d, shift=UP * 0.2) for d in doms], lag_ratio=0.1), FadeIn(pts),
                  FadeIn(u0, scale=1.3), run_time=0.6)
        self.au_mot("le même calcul")
        top = self.Y_DOM + 1.1
        fls = [CurvedArrow(P(a + 0.12, top + 0.12), P(b - 0.12, top + 0.12), angle=-PI / 2, color=RAISON,
                           stroke_width=4, tip_length=0.13) for a, b in zip(self.XS_DOM, self.XS_DOM[1:])]
        hl = VGroup(self.t("hérédité", 36, RAISON), self.coche(RAISON, 0.18)).arrange(RIGHT, buff=0.2)
        hl.move_to(P(-2.15, top + 1.05))
        self.play(LaggedStart(*[Create(x) for x in fls], lag_ratio=0.12), FadeIn(hl[0], shift=DOWN * 0.1),
                  Create(hl[1]), run_time=0.7)
        self.au_mot("dépasse")
        self.play(doms[0].animate.set_fill(PIEGE, 0.9), run_time=0.3)
        self.suivre("2")
        sup = self.t("u₀ > 2", 46, PIEGE).move_to(P(4.4, 0.9))
        self.play(FadeIn(sup, scale=1.3), run_time=0.3)
        self.au_mot("fausse")
        cx = self.barrer(Square(0.36))
        ff = VGroup(cx, VGroup(self.t("la propriété", 38, PIEGE), self.t("est fausse", 38, PIEGE)).arrange(
            DOWN, buff=0.08)).arrange(RIGHT, buff=0.25).move_to(P(4.3, -0.1))
        self.play(Create(cx), FadeIn(ff[1], shift=UP * 0.1), run_time=0.35)
        self.au_mot("Sans initialisation")
        pousse = Arrow(P(-6.3, self.Y_DOM + 0.7), P(doms[0].get_left()[0] - 0.05, self.Y_DOM + 0.7), buff=0,
                       color=GREY_B, stroke_width=5, max_tip_length_to_length_ratio=0.4)
        s1 = self.t("Sans initialisation,", 38, PIEGE).move_to(P(-0.9, -2.45))
        self.play(GrowArrow(pousse), FadeIn(s1, shift=UP * 0.1), run_time=0.35)
        self.play(*[Wiggle(d, scale_value=1.03, rotation_angle=0.04 * TAU) for d in doms], run_time=0.6)
        self.au_mot("une récurrence")
        s2 = self.t("une récurrence ne prouve rien.", 38, PIEGE).move_to(P(-0.9, -3.05))
        self.play(FadeIn(s2, shift=UP * 0.1), FadeOut(pousse), run_time=0.35)
        self.insister(VGroup(s1, s2), 1.06)
        self.attendre_voix(marge=0.6)

    # ── 08 : question-pause n° 2 : l'étape qui manque → C ──────────────────

    def ecran_question2(self):
        copie = self.morceaux([[("« Supposons", "Supposons"), ("uₖ ≤ 2.", "2")],
                               [("Alors", "Alors"), ("uₖ₊₁ ≤ 2.", "2")],
                               [("Donc", "Donc"), ("uₙ ≤ 2", "2"), ("pour tout n. »", "pour tout n")]], 30)
        feuille = []

        def papier():
            c = self.carte(copie.width + 0.6, copie.height + 0.35, copie.get_center(), GREY_A)
            c.set_fill("#1e293b", 1)
            feuille.append(c)
            self.play(FadeIn(c), run_time=0.3)

        q = self.poser_question("08-question",
                                [(self.t("Une copie écrit :", 34), "Une copie"), (copie, None),
                                 (self.t("Que manque-t-il ?", 34), "Que manque")],
                                ["la conclusion", "l'hérédité", "l'initialisation"], 2, largeur=6.4, fs=32,
                                dessin=papier, y_tete=3.22, y_question=2.8)
        self.dire("08b-reponse")
        self.q_reponse(q, 2)
        self.play(FadeOut(q.cartes[0]), FadeOut(q.cartes[1]), run_time=0.25)
        self.au_mot("Personne")
        y = q.cartes[0].get_center()[1] - 0.05
        e1 = VGroup(self.barrer(Square(0.3)), self.t("Personne n'a vérifié", 38, PIEGE),
                    self.t("P(0)", 38, PIEGE)).arrange(RIGHT, buff=0.25)
        e1.move_to(P(-0.4, y))
        self.play(Create(e1[0]), FadeIn(e1[1], shift=UP * 0.1), Indicate(feuille[0], color=PIEGE, scale_factor=1.03),
                  run_time=0.4)
        self.suivre("0")
        self.play(FadeIn(e1[2], scale=1.3), run_time=0.25)
        self.au_mot("il manque")
        e2 = self.t("il manque l'initialisation", 40, JUSTE).move_to(P(-0.4, y - 0.75))
        self.play(FadeIn(e2, shift=UP * 0.1), run_time=0.35)
        self.insister(e2, 1.1)
        self.attendre_voix(marge=0.6)

    # ── 09 : à partir d'un certain rang : 2ⁿ ≥ n² ──────────────────────────

    def ecran_rang(self):
        self.nouvel_ecran("09-rang")
        self.titre("À partir d'un certain rang", JAUNE_TITRE, 46, extrait="à partir")
        esc = Escalier(7, 0.55, -2.35, w=0.8, h=0.4)
        labs = VGroup(*[esc.etiquette(k, str(k), 26) for k in range(7)])
        for k in range(4):
            esc.marches[k].set_stroke(GREY_D, opacity=0.8)
        self.play(Create(esc), FadeIn(labs), run_time=0.5)
        self.ligne([("2ⁿ", TERME, "2 puissance n"), ("≥", WHITE, "supérieur"), ("n²", TERME, "n au carré")], 1.6,
                   x=-6.0, fs=56)
        self.au_mot("au rang")
        self.suivre("4")
        r4 = VGroup(self.t("On initialise au", 36, WHITE), self.t("rang 4", 38, JAUNE_TITRE)).arrange(RIGHT, buff=0.2)
        r4.move_to(P(0, 0.55)).align_to(P(-6.0, 0), LEFT)
        bh = bonhomme(0.6).move_to(esc.pied(4), aligned_edge=DOWN)
        self.play(FadeIn(r4, shift=UP * 0.1), esc.marches[4].animate.set_stroke(JAUNE_TITRE, width=8),
                  Indicate(labs[4], color=JAUNE_TITRE, scale_factor=1.6), FadeIn(bh, shift=DOWN * 0.2), run_time=0.4)
        self.ligne([("2⁴ =", WHITE, "2 puissance 4"), ("16", TERME, "16")], -0.5, x=-6.0, fs=44)
        self.ligne([("4² =", WHITE, "4 au carré"), ("16", TERME, "16")], -1.35, x=-6.0, fs=44)
        ok = self.coche(JUSTE, 0.26).move_to(P(-2.6, -0.92))
        self.play(Create(ok), esc.marches[4].animate.set_stroke(JUSTE, width=8), run_time=0.35)
        fls = [esc.fleche(k) for k in (4, 5)]
        for k, x in zip((5, 6), fls):    # puis l'hérédité fait monter, marche après marche
            self.play(Create(x), run_time=0.3)
            self.play(bh.animate.move_to(esc.pied(k), aligned_edge=DOWN), esc.marches[k].animate.set_color(JUSTE),
                      run_time=0.3, rate_func=smooth)
        self.attendre_voix(marge=0.6)

    # ── 10 : question-pause n° 3 : pour quels n ? → A ──────────────────────

    def ecran_question3(self):
        lignes = [(self.t("On initialise au rang 4,", 38), "4"),
                  (self.t("et l'hérédité est prouvée pour tout k ≥ 4.", 38), "4"),
                  (self.t("La propriété est démontrée :", 38, RAISON), "La propriété")]
        q = self.poser_question("10-question", lignes,
                                ["pour tout entier n ≥ 4", "pour tout entier naturel n", "seulement pour n = 4"], 0,
                                largeur=7.6, fs=34)
        self.dire("10b-reponse")
        self.q_reponse(q, 0)
        self.play(FadeOut(q.cartes[1]), FadeOut(q.cartes[2]), run_time=0.25)
        self.au_mot("à partir")
        y = q.cartes[0].get_bottom()[1] - 0.6
        e1 = self.t("à partir du rang de l'initialisation", 38, JUSTE).move_to(P(-0.5, y))
        self.play(FadeIn(e1, shift=UP * 0.1), run_time=0.35)
        self.ligne([("n = 3 :", WHITE, "3"), ("fausse,", PIEGE, "fausse"), ("8", PIEGE, "8"),
                    ("<", PIEGE, "plus petit"), ("9", PIEGE, "9")], y - 0.72, fs=38)
        self.attendre_voix(marge=0.6)

    # ── 11 : le défi ───────────────────────────────────────────────────────

    def ecran_defi(self):
        self.nouvel_ecran("11-defi")
        tit = self.titre("À toi de jouer !", JAUNE_TITRE, 48, extrait="À toi")
        l1 = self.ligne([("u₀ = 2", TERME, "2"), ("et", WHITE, "et,"), ("uₙ₊₁ =", WHITE, "u indice n plus 1"),
                         ("0,5 uₙ", RAISON, "0,5"), ("+ 3", RAISON, "3")], 2.2, fs=44)
        self.au_mot("Démontre")
        l2 = self.t("Démontre par récurrence que", 38, WHITE).move_to(P(0, 1.3))
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.3)
        l3 = self.ligne([("uₙ ≤ 6", JAUNE_TITRE, "6"), ("pour tout entier naturel n", JAUNE_TITRE, "pour tout")],
                        0.55, fs=44)
        cad = self.encadre(l3, JAUNE_TITRE, 0.15)
        self.play(Create(cad), run_time=0.3)
        blocs = VGroup()
        for i in range(3):
            c = RoundedRectangle(width=3.6, height=1.3, corner_radius=0.14, stroke_color=GREY_B, stroke_width=3,
                                 fill_color=FOND_CARTE, fill_opacity=1)
            blocs.add(VGroup(c, Text("?", font_size=56, color=RAISON).move_to(c)))
        blocs.arrange(RIGHT, buff=0.4).move_to(P(-0.4, -1.0))
        self.play(LaggedStart(*[FadeIn(b, shift=UP * 0.15) for b in blocs], lag_ratio=0.2), run_time=0.5)
        self.defi_pause(-2.55, x=-0.6)
        self._defi = (tit, l1, l2, l3, cad, blocs)

    def ecran_correction(self):
        self.dire("11b-correction")
        tit, l1, l2, l3, cad, blocs = self._defi
        self.au_mot("Correction")
        cor = self.t("Correction", 46, JUSTE).move_to(tit)
        enonce = VGroup(l1, VGroup(l3, cad))
        self.play(FadeOut(blocs), FadeOut(l2), ReplacementTransform(tit, cor), run_time=0.35)
        self.play(enonce.animate.scale(0.62).arrange(RIGHT, buff=0.5).move_to(P(0, 2.4)), run_time=0.45)
        x_nom, x_txt = -6.2, -3.05
        rangs = {}

        def etiquette(i, y, extrait):
            b = RoundedRectangle(width=2.95, height=0.62, corner_radius=0.12, stroke_color=JUSTE, stroke_width=3,
                                 fill_color=FOND_CARTE, fill_opacity=1)
            b.move_to(P(0, y)).align_to(P(x_nom, 0), LEFT)
            n = self.t(ETAPES[i], 30, JUSTE, larg=2.7).move_to(b)
            self.au_mot(extrait)
            self.play(FadeIn(b), FadeIn(n, scale=1.2), run_time=0.3)
            rangs[i] = VGroup(b, n)

        etiquette(0, 1.45, "Initialisation")
        self.ligne([("u₀ =", WHITE, "u indice 0"), ("2", WHITE, "2"), ("≤ 6", WHITE, "6"), (": P(0)", JUSTE, "0"), ("vraie", JUSTE, "vraie")], 1.45,
                   x=x_txt, fs=38)
        etiquette(1, 0.55, "Hérédité")
        self.ligne([("Supposons", WHITE, "supposons"), ("uₖ ≤ 6", TERME, "6"),
                    ("pour un entier naturel k.", GREY_A, "pour un entier")], 0.55, x=x_txt, fs=30)
        self.ligne([("Alors", WHITE, "Alors"), ("0,5 uₖ", WHITE, "0,5"), ("≤ 3", WHITE, "3")], -0.2, x=x_txt, fs=38)
        self.ligne([("puis", WHITE, "puis"), ("0,5 uₖ", WHITE, "0,5 u indice k"), ("+ 3", WHITE, "3"), ("≤ 6", WHITE, "6")], -0.9, x=x_txt,
                   fs=38)
        h4 = self.ligne([("uₖ₊₁", JUSTE, "u indice k plus 1"), ("≤ 6", JUSTE, "6")], -1.6, x=x_txt, fs=40)
        etiquette(2, -2.45, "Conclusion")
        fin = self.ligne([("pour tout entier naturel n,", WHITE, "pour tout entier naturel n"),
                          ("uₙ", JUSTE, "u indice n"), ("≤ 6", JUSTE, "6")], -2.45, x=x_txt, fs=34)
        c = self.encadre(fin[1:], JUSTE, 0.12)
        self.play(Create(c), run_time=0.3)
        self.insister(VGroup(*fin[1:], c), 1.12)
        self.attendre_voix(marge=0.6)

    # ── 12 : ce que tu as appris ───────────────────────────────────────────

    def ecran_appris(self):
        fs = 38
        p1 = [self.t("Une récurrence a trois étapes :", fs, JAUNE_TITRE)]
        p2 = [VGroup(self.t("l'initialisation,", fs, JUSTE), self.t("au premier rang ;", fs)).arrange(RIGHT, buff=0.2)]
        p3 = [VGroup(self.t("l'hérédité :", fs, RAISON), self.t("on suppose P(k) pour un entier k,", fs)).arrange(
                  RIGHT, buff=0.2),
              self.t("et on montre P(k + 1) ;", fs)]
        p4 = [VGroup(self.t("puis", fs), self.t("la conclusion.", fs, TERME)).arrange(RIGHT, buff=0.2)]
        self.finale([(p1, ["Une récurrence"]), (p2, ["l'initialisation"]), (p3, ["l'hérédité", "1"]),
                     (p4, ["puis la conclusion"])], cle="12-finale")

    def construct(self):
        self.ecran_garde()
        self.ecran_situation()
        self.ecran_modele()
        self.ecran_initialisation()
        self.ecran_heredite()
        self.ecran_conclusion()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_rang()
        self.ecran_question3()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_appris()
        self.fin("13-abonne")
