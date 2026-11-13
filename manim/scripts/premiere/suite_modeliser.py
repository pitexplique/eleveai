# suite_modeliser.py
# EleveAI — Maths 1re spé (programme 2026) — paysage « Modéliser par une suite »
# (16:9), ceinture VERTE. Série SUITES, épisode 21.
# Micro du coach : suite_modeliser (lib/tutor-v4/questionBank/premiere-spe/maths/
# suites.bank.ts + suites-renfort.ts : « motif », « motifFormule », « nature »,
# « denombre », « terme », « seuilCtx »).
#
# Ce que demande le coach → écran :
#   · un motif de figures : compter ce qu'on ajoute d'une figure à l'autre  → 01, 02 ;
#   · trouver uₙ et la TESTER sur les figures 1, 2 et 3 (motifFormule)       → 03, 07-piege ;
#   · calculer un terme du modèle (terme)                                     → 04-question ;
#   · résoudre uₙ = la valeur : le rang (seuilCtx, motif ★5)                  → 05-rang, 09b ;
#   · la nature : + fixe → arithmétique ; % → géométrique ; × puis + → ni l'un
#     ni l'autre (nature)                                                     → 06, 08-question ;
#   · le défi : la bordure de dalles (motif + rang)                           → 09, 09b.
# Clé de voix → écran :
#   00-garde (les tables 1, 2, 3) · 01 Lina, cheffe de salle : 4, 6, 8 chaises ·
#   02 uₙ, + 2, arithmétique de raison 2 · 03 pourquoi 2 : 2n + 2, le test ·
#   04/04b question (B : 52) · 05 40 personnes → n = 19 · 06 × 1,1 ; × et + ·
#   07 le piège 4n · 08/08b question (A : géométrique de raison 1,2) · 09/09b
#   défi des dalles (4n + 4, figure 24) · 10 « Ce que tu as appris » · 11 fin.
# Code couleur (module commun) : bleu = termes (les chaises), orange = raison et
# écarts, vert = juste, rouge = piège ; violet = le RANG n (comme l'ép. 18).
# Voix : manim/voix/premiere-spe-suite-modeliser.json (débit −6), calée mot à mot
# par suite_modeliser_marques.json.
# Contrôle : AUDIT=1 BORDS=1 python -m manim render --dry_run …
# python -m manim render -qh --disable_caching manim/scripts/premiere/suite_modeliser.py SuiteModeliser1reSpe -o eleveai-maths-premiere-spe-suite-modeliser --media_dir manim/scripts/premiere/media-suite-modeliser
# Sortie : manim/sorties/premiere-spe/maths/suites/21-modeliser/

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from suites_commun import *  # noqa: E402,F403
from suite_arith_graphique import OutilsGraphique  # noqa: E402  (ép. 07)
from suite_geo_reconnaitre import AuditMilliers  # noqa: E402  (ép. 09)
from suite_geo_terme_rang import EXPOSANTS, OutilsEp12  # noqa: E402  (ép. 12)
from suite_geo_interpreter import SuiteGeoInterpreter1re as _E16  # noqa: E402  (ép. 16 : calc, boutons_ligne)

# ── les affirmations de la voix, vérifiées ──────────────────────────────────
U = lambda n: 2 * n + 2  # noqa: E731
assert [U(1), U(2), U(3)] == [4, 6, 8]                                   # 1, 2, 3 tables
assert U(25) == 52 and 4 * 25 == 100 and U(26) == 54                    # question 1 : B (leurres 100, 54)
assert (40 - 2) == 38 and 38 // 2 == 19 and U(19) == 40                 # 40 personnes → 19 tables
assert 4 * 2 == 8 and 4 * 2 != U(2)                                     # le piège 4n
assert abs(1 + 0.2 - 1.2) < 1e-12                                       # question 2 : A
D = lambda n: (n + 2) ** 2 - n ** 2  # noqa: E731  les dalles noires de la bordure
assert [D(1), D(2), D(3)] == [8, 12, 16] and all(D(n) == 4 * n + 4 for n in range(1, 30))
assert 100 - 4 == 96 and 96 // 4 == 24 and D(24) == 100                 # défi : figure 24

RANG = "#A855F7"                                                         # le rang n (violet)
BOIS, BOIS_BORD = "#A16207", "#FDE68A"
PEAU, CHEVEUX, CHEMISE, GILET = "#c68642", "#1f1300", "#E2E8F0", "#334155"
DALLE_NOIRE, DALLE_CLAIRE = "#111827", "#CBD5E1"


# ── les dessins de l'épisode ────────────────────────────────────────────────

def rangee(n, c=0.7):
    """n tables carrées accolées en ligne, une chaise (bleue) par côté libre.
    g.tables, g.haut[k], g.bas[k] (les chaises de la table k), g.bouts (2)."""
    w, h, e = 0.6 * c, 0.24 * c, 0.1 * c
    tables = VGroup(*[Square(c, fill_color=BOIS, fill_opacity=1, stroke_color=BOIS_BORD, stroke_width=2)
                      .move_to(P((k - (n - 1) / 2) * c, 0)) for k in range(n)])

    def chaise(x, y, vertical=False):
        return RoundedRectangle(width=h if vertical else w, height=w if vertical else h, corner_radius=h * 0.4,
                                fill_color=TERME, fill_opacity=1, stroke_width=0).move_to(P(x, y))
    haut = VGroup(*[chaise(t.get_x(), c / 2 + e + h / 2) for t in tables])
    bas = VGroup(*[chaise(t.get_x(), -c / 2 - e - h / 2) for t in tables])
    bouts = VGroup(*[chaise(s * (n * c / 2 + e + h / 2), 0, True) for s in (-1, 1)])
    g = VGroup(tables, haut, bas, bouts)
    g.tables, g.haut, g.bas, g.bouts = tables, haut, bas, bouts
    g.chaises = VGroup(*haut, *bas, *bouts)
    return g


def bordure(n, s=0.3):
    """Le carré de n × n dalles claires entouré d'une bordure de dalles noires.
    g.cotes (les dalles noires hors coins), g.coins (4), g.interieur."""
    N = n + 2
    cotes, coins, inter = VGroup(), VGroup(), VGroup()
    for i in range(N):
        for j in range(N):
            bord_i, bord_j = i in (0, N - 1), j in (0, N - 1)
            d = Square(s, stroke_color="#9CA3AF", stroke_width=1.5, fill_opacity=1,
                       fill_color=DALLE_NOIRE if (bord_i or bord_j) else DALLE_CLAIRE)
            d.move_to(P((j - (N - 1) / 2) * s, ((N - 1) / 2 - i) * s))
            (coins if (bord_i and bord_j) else cotes if (bord_i or bord_j) else inter).add(d)
    g = VGroup(inter, cotes, coins)
    g.cotes, g.coins, g.interieur = cotes, coins, inter
    return g


def lina(s=1.0):
    """Lina, cheffe de salle : chignon, chemise claire, gilet sombre, nœud orange."""
    chignon = Circle(radius=0.15, fill_color=CHEVEUX, fill_opacity=1, stroke_width=0).move_to(P(0, 1.32))
    tete = Circle(radius=0.26, fill_color=PEAU, fill_opacity=1, stroke_width=0).move_to(P(0, 0.98))
    frange = Sector(radius=0.28, angle=PI, start_angle=0, fill_color=CHEVEUX, fill_opacity=1,
                    stroke_width=0).move_to(P(0, 1.14))
    corps = RoundedRectangle(width=0.95, height=1.15, corner_radius=0.25, fill_color=CHEMISE, fill_opacity=1,
                             stroke_width=0).move_to(P(0, 0.12))
    gilet = VGroup(*[Polygon(P(sx * 0.47, 0.52), P(sx * 0.1, 0.52), P(sx * 0.1, -0.45), P(sx * 0.47, -0.45),
                             fill_color=GILET, fill_opacity=1, stroke_width=0) for sx in (-1, 1)])
    noeud = VGroup(Triangle(fill_color=RAISON, fill_opacity=1, stroke_width=0).scale(0.08).rotate(-PI / 2)
                   .move_to(P(-0.06, 0.55)),
                   Triangle(fill_color=RAISON, fill_opacity=1, stroke_width=0).scale(0.08).rotate(PI / 2)
                   .move_to(P(0.06, 0.55)))
    return VGroup(chignon, corps, gilet, noeud, tete, frange).scale(s)


def assiette(s=1.0):
    """Une assiette entre une fourchette et un couteau (les couverts servis)."""
    a = VGroup(Circle(radius=0.48, fill_color="#F8FAFC", fill_opacity=1, stroke_color=GREY_B, stroke_width=2),
               Circle(radius=0.32, stroke_color=GREY_B, stroke_width=2))
    fourchette = VGroup(Line(P(-0.7, -0.4), P(-0.7, 0.2)),
                        *[Line(P(-0.7 + dx, 0.2), P(-0.7 + dx, 0.45)) for dx in (-0.08, 0, 0.08)],
                        Line(P(-0.78, 0.2), P(-0.62, 0.2))).set_stroke(GREY_A, 4)
    couteau = VGroup(Line(P(0.7, -0.4), P(0.7, 0.45)).set_stroke(GREY_A, 4),
                     Polygon(P(0.7, 0.45), P(0.8, 0.3), P(0.8, -0.05), P(0.7, -0.05), fill_color=GREY_A,
                             fill_opacity=1, stroke_width=0))
    return VGroup(fourchette, a, couteau).scale(s)


def groupe_personnes(n=40, cols=8, pas=0.3, r=0.09):
    """n petites personnes (tête + épaules), en grille."""
    teintes = ["#c68642", "#8d5524", "#f1c27d", "#5c3a21"]
    g = VGroup()
    for k in range(n):
        x, y = (k % cols - (cols - 1) / 2) * pas, -(k // cols) * pas
        g.add(VGroup(Sector(radius=r * 1.25, angle=PI, start_angle=0, fill_color=[TERME, JUSTE, RAISON][k % 3],
                            fill_opacity=1, stroke_width=0).move_to(P(x, y - r * 0.9)),
                     Circle(radius=r * 0.75, fill_color=teintes[k % 4], fill_opacity=1, stroke_width=0)
                     .move_to(P(x, y + r * 0.35))))
    return g


class SuiteModeliser1reSpe(AuditMilliers, OutilsEp12, OutilsGraphique, PaysageSuites):
    fichier_marques = "suite_modeliser_marques.json"
    nom_voix = "premiere-spe-suite-modeliser"
    identite = "Maths 1re spé — EleveAI"
    ceinture = "verte"
    calc = _E16.calc
    fleche = _E16.fleche
    boutons_ligne = _E16.boutons_ligne

    def ligne(self, morceaux, fs=44):
        """Comme l'ép. 12, mais SANS ligature (« fi » de « figures » = 2 glyphes)."""
        texte = ""
        for m in morceaux:
            texte += ("" if not texte or m[0][0] in EXPOSANTS else " ") + m[0]
        tx = Text(texte, font_size=fs, color=WHITE, disable_ligatures=True)
        tx._pas_audit = True
        avec_espaces = len(tx) == len(texte)  # sans ligature, Manim garde une forme (vide) par espace
        k, parts = 0, []
        for j, m in enumerate(morceaux):
            if avec_espaces and j > 0 and m[0][0] not in EXPOSANTS:
                k += 1
            t = m[0] if avec_espaces else m[0].replace(" ", "")
            n = len(t)
            g = VGroup(*tx[k:k + n])
            g.set_color(m[1])
            for sous, coul in (m[3] if len(m) > 3 and m[3] else {}).items():
                ss = sous if avec_espaces else sous.replace(" ", "")
                i = t.find(ss)
                VGroup(*tx[k + i:k + i + len(ss)]).set_color(coul)
            g.original_text = m[0]
            parts.append(g)
            k += n
        assert k == len(tx), (k, len(tx), [m[0] for m in morceaux])
        return tx, parts

    def figure(self, n, centre, c=0.7, chaises=True):
        g = rangee(n, c).move_to(centre)
        if not chaises:
            g.chaises.set_opacity(0)
        return g

    def montrer_tables(self, g, run_time=0.35):
        self.play(LaggedStart(*[FadeIn(t, scale=0.7) for t in g.tables], lag_ratio=0.2), run_time=run_time)

    def montrer_chaises(self, g, run_time=0.35):
        g.chaises.set_opacity(1)
        self.play(LaggedStart(*[GrowFromCenter(ch) for ch in g.chaises], lag_ratio=0.08), run_time=run_time)

    # ── 00 : la garde ──────────────────────────────────────────────────────

    def dessin_garde(self):
        """Les figures 1, 2 et 3 : les tables, puis leurs chaises."""
        figs = [self.figure(n, P(x, -0.9), c=0.55) for n, x in ((1, -3.4), (2, -0.6), (3, 2.5))]
        self.play(LaggedStart(*[FadeIn(f.tables, scale=0.8) for f in figs], lag_ratio=0.3), run_time=0.6)
        self.play(LaggedStart(*[LaggedStart(*[GrowFromCenter(ch) for ch in f.chaises], lag_ratio=0.1) for f in figs],
                              lag_ratio=0.3), run_time=0.8)

    def ecran_garde(self):
        self.garde("Modéliser",
                   [("par une suite", "par une suite", TERME),
                    ("Comment trouver une formule", "Comment trouver"),
                    ("qui marche pour toutes les figures ?", "qui marche")],
                   dessin=self.dessin_garde)

    # ── 01 : Lina, cheffe de salle : 4, 6, 8 chaises ───────────────────────

    def ecran_situation(self):
        self.nouvel_ecran("01-situation")
        x = -5.0
        pers = lina(0.9).move_to(P(x, 2.15))
        nom = self.t("Lina", 44, JAUNE_TITRE).move_to(P(x, 0.72))
        met = self.t("cheffe de salle", 32, TERME).move_to(P(x, 0.14))
        self.au_mot("Lina")
        self.play(FadeIn(pers, shift=UP * 0.2), FadeIn(nom, shift=UP * 0.1), run_time=0.5)
        self.au_mot("cheffe de salle")
        self.play(FadeIn(met, shift=UP * 0.1), run_time=0.3)
        self.calc([("Pour les grands groupes :", WHITE, "Pour les grands groupes")], 2.6, centre=1.15, fs=38, larg=8.6)
        self.calc([("des tables carrées en ligne,", WHITE, "tables carrées")], 1.95, centre=1.15, fs=38, larg=8.6)
        self.calc([("une chaise sur chaque", WHITE, "une chaise"), ("côté libre", TERME, "côté libre")], 1.3,
                  centre=1.15, fs=38, larg=8.6)
        y, xs = -0.85, (-4.55, -1.45, 2.45)
        for n, xc in zip((1, 2, 3), xs):
            g = self.figure(n, P(xc, y), chaises=False)
            mot = "table" if n == 1 else "tables"
            l1 = self.t(f"{n} {mot}", 34, WHITE).move_to(P(xc, -2.05))
            l2 = self.t(f"{U(n)} chaises", 34, TERME).move_to(P(xc, -2.7))
            self.suivre(f"{n} {mot}")
            self.add(g)
            self.play(LaggedStart(*[FadeIn(t, scale=0.7) for t in g.tables], lag_ratio=0.2),
                      FadeIn(l1, shift=UP * 0.1), run_time=0.35)
            self.suivre(f"{U(n)} chaises")
            g.chaises.set_opacity(1)
            self.play(LaggedStart(*[GrowFromCenter(ch) for ch in g.chaises], lag_ratio=0.08), FadeIn(l2, scale=1.2),
                      run_time=0.4)
        self.attendre_voix(marge=0.5)

    # ── 02 : observer : + 2 à chaque table ─────────────────────────────────

    def ecran_observer(self):
        self.nouvel_ecran("02-observer")
        self.calc([("uₙ :", TERME, "u indice n", {"ₙ": RANG}), ("le nombre de chaises", WHITE, "le nombre de chaises"),
                   ("pour", WHITE, None), ("n tables", RANG, "n tables")], 3.0, centre=0, fs=42, larg=12)
        self.calc([("à partir de", WHITE, "à partir de"), ("n = 1", RANG, "1")], 2.3, centre=0, fs=38, larg=12)
        xs = (-3.4, 0.0, 3.4)
        figs = [self.figure(n, P(x, 1.15), c=0.55) for n, x in zip((1, 2, 3), xs)]
        lg = LigneTermes(["4", "6", "8"], xs=xs, centre=P(0, -0.75), largeur=1.3, hauteur=0.85, fs=46,
                         noms=["u₁", "u₂", "u₃"], fs_noms=32)
        arcs = [lg.saut(k, "+ 2", cote=UP, fs=36) for k in range(2)]

        def case(k):
            self.play(FadeIn(figs[k], scale=0.9), FadeIn(lg.cases[k][0], scale=0.8), FadeIn(lg.cases[k][1], scale=1.4),
                      FadeIn(lg.noms[k], shift=UP * 0.08), run_time=0.35)
        self.suivre("4")
        case(0)
        self.suivre("6")
        case(1)
        self.play(Create(arcs[0][0]), run_time=0.3)
        self.suivre("6")
        self.play(Indicate(lg.cases[1], color=TERME, scale_factor=1.1), run_time=0.3)
        self.suivre("8")
        case(2)
        self.play(Create(arcs[1][0]), run_time=0.3)
        self.suivre("ajoute")
        self.suivre("2")
        neuves = VGroup(*[VGroup(f.haut[-1], f.bas[-1]) for f in figs[1:]])
        self.play(*[FadeIn(a[1], scale=1.4) for a in arcs], neuves.animate.set_color(RAISON), run_time=0.35)
        self.au_mot("table en plus")
        self.play(*[Indicate(f.tables[-1], color=RAISON, scale_factor=1.15) for f in figs[1:]], run_time=0.5)
        self.calc([("C'est une suite arithmétique", WHITE, "suite arithmétique"), ("de raison 2", RAISON, "raison 2")],
                  -2.45, centre=-0.5, fs=42, larg=10.4)
        self.attendre_voix(marge=0.5)

    # ── 03 : pourquoi 2 : uₙ = 2n + 2, puis le test ────────────────────────

    def ecran_formule(self):
        self.nouvel_ecran("03-formule")
        self.calc([("Pourquoi", JAUNE_TITRE, "Pourquoi"), ("+ 2 ?", JAUNE_TITRE, "2")], 3.2, centre=0, fs=46, larg=8)
        g = self.figure(4, P(-3.0, 1.5), c=0.72)
        self.play(FadeIn(g, scale=0.9), run_time=0.35)
        xd, ld = 3.2, 6.2
        self.calc([("Chaque table :", WHITE, "Chaque table")], 2.4, centre=xd, fs=36, larg=ld)
        self.calc([("une en haut,", WHITE, "en haut"), ("une en bas", WHITE, "en bas")], 1.8, centre=xd,
                  fs=36, larg=ld, avec_morceau={0: [g.haut.animate.set_color(RAISON)], 1: [g.bas.animate.set_color(RAISON)]})
        self.calc([("→", WHITE, None), ("2n", RAISON, "2 n chaises", {"n": RANG}), ("chaises", WHITE, None)], 1.2,
                  centre=xd, fs=36, larg=ld)
        self.calc([("Une à chaque bout :", WHITE, "à chaque bout"), ("+ 2", JUSTE, "2")], 0.6, centre=xd, fs=36,
                  larg=ld, avec=[g.bouts.animate.set_color(JUSTE)])
        f = self.calc([("uₙ =", TERME, "u indice n égale", {"ₙ": RANG}), ("2n", RAISON, "2 n", {"n": RANG}),
                       ("+ 2", JUSTE, "plus 2")], -0.55, centre=0, fs=62, larg=8)
        self.play(Create(self.encadre(f, TERME, 0.2)), run_time=0.35)
        tests = self.calc([("On teste :", JAUNE_TITRE, "On teste"), ("u₁ =", TERME, "u indice 1"), ("4", WHITE, "4"),
                           (";", GREY_B, None), ("u₂ =", TERME, "u indice 2"), ("6", WHITE, "6"), (";", GREY_B, None),
                           ("u₃ =", TERME, "u indice 3"), ("8", WHITE, "8")], -1.8, centre=-0.3, fs=44, larg=11)
        ok = self.calc([("Ça marche !", JUSTE, "Ça marche")], -2.75, centre=-0.3, fs=44, larg=6)
        coche = self.coche(JUSTE, 0.24).next_to(ok, RIGHT, buff=0.3)
        self.play(Create(coche), Indicate(tests[2], color=JUSTE), Indicate(tests[5], color=JUSTE),
                  Indicate(tests[8], color=JUSTE), run_time=0.45)
        self.attendre_voix(marge=0.5)

    # ── 04 : question-pause n° 1 : 25 tables → B (52) ──────────────────────

    def ecran_question1(self):
        cartes = self.boutons_ligne(["100", "52", "54"], y=0.15)

        def e1():
            self.calc([("Combien de chaises", WHITE, "Combien de chaises"), ("pour 25 tables ?", TERME, "25")], 2.3,
                      centre=0, fs=50, larg=12)
            rap, _ = self.ligne([("uₙ =", TERME, None, {"ₙ": RANG}), ("2n", RAISON, None, {"n": RANG}), ("+ 2", JUSTE)], 44)
            rap.move_to(P(0, 1.45))
            self.play(FadeIn(rap, shift=UP * 0.1), run_time=0.25)

        q = self.question_libre("04-question", [e1], cartes, P(0, -1.1))
        self.dire("04b-reponse")
        self.au_mot("Réponse B")
        self.q_reponse(q, 1)
        c = self.calc([("u₂₅ =", TERME, "u indice 25"), ("2 ×", WHITE, "2 fois"), ("25", WHITE, "25"),
                       ("+ 2", WHITE, "plus 2"), ("=", WHITE, None), ("52", JUSTE, "52")], -1.3, centre=-0.6, fs=46,
                      larg=9)
        self.play(c[-1].animate.shift(RIGHT * 0.15), run_time=0.15)
        self.play(Create(self.encadre(c[-1], JUSTE, 0.14)), run_time=0.3)
        g = self.figure(2, P(4.0, -2.55), c=0.62)
        joint = DashedLine(g.tables[0].get_corner(UR), g.tables[0].get_corner(DR), color=PIEGE, stroke_width=6,
                           dash_length=0.08)
        pas4 = self.calc([("Pas", PIEGE, "Pas 4"), ("4 ×", PIEGE, None), ("25", PIEGE, "25"), (":", WHITE, None)], -2.3,
                         centre=-1.6, fs=40, larg=6, avec=[FadeIn(g, scale=0.9)])
        self.play(Create(self.barre_lisible(VGroup(pas4[1], pas4[2]))), run_time=0.3)
        self.calc([("les côtés accolés", RAISON, "les côtés accolés"), ("n'ont pas de chaise", WHITE, "n'ont pas")],
                  -3.0, centre=-1.6, fs=40, larg=8.2, avec=[Create(joint)])
        self.play(Indicate(joint, color=PIEGE, scale_factor=1.2), run_time=0.4)
        self.attendre_voix(marge=0.6)

    # ── 05 : le rang : 40 personnes → 19 tables ────────────────────────────

    def ecran_rang(self):
        self.nouvel_ecran("05-rang")
        foule = groupe_personnes().move_to(P(4.4, 1.35))
        self.calc([("Un groupe de", JAUNE_TITRE, "un groupe de"), ("40 personnes ?", JAUNE_TITRE, "40")], 3.2, centre=0,
                  fs=46, larg=11, avec=[LaggedStart(*[FadeIn(p, scale=0.5) for p in foule], lag_ratio=0.03)])
        xc, fs = -1.9, 46
        self.calc([("On cherche", WHITE, "On cherche"), ("n", RANG, "n tel"), ("tel que", WHITE, None)], 2.2,
                  centre=xc, fs=38, larg=8)
        self.calc([("2n + 2", WHITE, "2 n plus 2", {"n": RANG}), ("=", WHITE, "égale"), ("40", TERME, "40")], 1.3,
                  centre=xc, fs=fs, larg=7)
        l2 = self.calc([("2n", WHITE, "2 n égale", {"n": RANG}), ("=", WHITE, None), ("38", TERME, "38")], 0.4,
                       centre=xc, fs=fs, larg=7)
        m1 = self.t("− 2", 34, RAISON).next_to(l2, LEFT, buff=0.7)
        self.play(FadeIn(m1, shift=RIGHT * 0.1), run_time=0.2)
        l3 = self.calc([("n =", RANG, "et n égale"), ("19", JUSTE, "19")], -0.5, centre=xc, fs=fs, larg=7)
        m2 = self.t("÷ 2", 34, RAISON).next_to(l3, LEFT, buff=0.7).align_to(m1, RIGHT)
        self.play(FadeIn(m2, shift=RIGHT * 0.1), Create(self.encadre(l3, JUSTE, 0.16)), run_time=0.3)
        rg = self.figure(19, P(-1.4, -2.65), c=0.33)
        self.calc([("Il faut", WHITE, "Il faut"), ("19 tables", JUSTE, "19 tables")], -1.5, centre=xc, fs=44, larg=7,
                  avec=[LaggedStart(*[FadeIn(t, scale=0.6) for t in rg.tables], lag_ratio=0.05)])
        self.play(LaggedStart(*[GrowFromCenter(ch) for ch in rg.chaises], lag_ratio=0.02),
                  Indicate(foule, color=JUSTE, scale_factor=1.05), run_time=0.8)
        self.attendre_voix(marge=0.5)

    # ── 06 : la nature : on ne modélise pas toujours en ajoutant ───────────

    def ecran_nature(self):
        self.nouvel_ecran("06-nature")
        self.titre("Pas toujours en ajoutant", JAUNE_TITRE, 46, extrait="pas toujours", y=3.2)
        xg, xd, larg = -3.3, 3.3, 5.6
        cg = self.carte(6.1, 4.6, P(xg, 0.22), TERME)
        cd = self.carte(6.1, 4.6, P(xd, 0.22), RAISON)
        self.play(FadeIn(cg), FadeIn(cd), run_time=0.3)
        fs, larg = 36, 5.3
        self.calc([("Réservations :", WHITE, "réservations")], 2.12, centre=xg, fs=fs, larg=larg)
        self.calc([("+ 10 % par mois", RAISON, "10 %")], 1.52, centre=xg, fs=fs, larg=larg)
        self.calc([("on multiplie par", WHITE, "on multiplie par"), ("1,1", RAISON, "1,1")], 0.92, centre=xg, fs=fs,
                  larg=larg)
        bars = VGroup(*[Rectangle(width=0.5, height=0.55 * 1.1 ** k, fill_color=TERME, fill_opacity=1, stroke_width=0)
                        .move_to(P(xg - 1.6 + 0.8 * k, -0.95), aligned_edge=DOWN) for k in range(5)])
        self.play(LaggedStart(*[GrowFromEdge(b, DOWN) for b in bars], lag_ratio=0.25), run_time=0.7)
        self.calc([("suite géométrique", JUSTE, "suite géométrique")], -1.55, centre=xg, fs=42, larg=larg)
        self.calc([("Clients :", WHITE, "Si on perd"), ("− 10 %,", RAISON, "10 %")], 2.12, centre=xd, fs=fs, larg=larg)
        self.calc([("puis + 20", RAISON, "20")], 1.52, centre=xd, fs=fs, larg=larg)
        self.calc([("on multiplie", WHITE, "on multiplie ET"), ("ET", JAUNE_TITRE, None)], 0.92, centre=xd, fs=fs,
                  larg=larg)
        self.calc([("on ajoute", WHITE, "on ajoute")], 0.32, centre=xd, fs=fs, larg=larg)
        self._machine(xd)
        self.calc([("ni arithmétique,", JAUNE_TITRE, "ni arithmétique")], -1.17, centre=xd, fs=38, larg=larg)
        self.calc([("ni géométrique", JAUNE_TITRE, "ni géométrique")], -1.7, centre=xd, fs=38, larg=larg)
        self.attendre_voix(marge=0.5)

    def _machine(self, x):
        """uₙ → × → + → uₙ₊₁ : deux opérations à la suite (sans nombre)."""
        bloc = lambda t, c, w: VGroup(RoundedRectangle(width=w, height=0.74, corner_radius=0.1, stroke_color=c,  # noqa
                                                       stroke_width=3, fill_color=FOND_CARTE, fill_opacity=1),
                                      Text(t, font_size=40, color=c if t in "×+" else WHITE))
        els = [bloc("uₙ", TERME, 1.0), bloc("×", RAISON, 0.72), bloc("+", RAISON, 0.72), bloc("uₙ₊₁", TERME, 1.4)]
        for e in els:
            e[1].move_to(e[0])
        g = VGroup(*els).arrange(RIGHT, buff=0.34).move_to(P(x, -0.42))
        fl = VGroup(*[Arrow(els[k].get_right(), els[k + 1].get_left(), buff=0.06, stroke_width=4, color=GREY_A,
                            max_tip_length_to_length_ratio=0.35) for k in range(3)])
        self.play(LaggedStart(*[FadeIn(e, scale=0.8) for e in els], *[GrowArrow(f) for f in fl], lag_ratio=0.15),
                  run_time=0.6)

    # ── 07 : le piège : 4n ─────────────────────────────────────────────────

    def ecran_piege(self):
        self.nouvel_ecran("07-piege")
        self.titre("Le piège !", PIEGE, 48, extrait="piège", y=3.2)
        self.calc([("La formule", WHITE, "La formule"), ("4n", PIEGE, "4 n", {"n": RANG}), ("?", PIEGE, None)], 2.3,
                  centre=0, fs=50, larg=8)
        xa, xb = -3.3, 2.9
        f1 = self.figure(1, P(xa, 0.85))
        f2 = self.figure(2, P(xb, 0.85))
        self.calc([("1 table :", WHITE, "1 table"), ("4 chaises", JUSTE, "4 chaises")], -0.45, centre=xa, fs=38, larg=5.4,
                  avec_morceau={0: [FadeIn(f1, scale=0.9)]})
        ok = self.coche(JUSTE, 0.24).move_to(P(xa, -1.15))
        self.play(Create(ok), Indicate(f1.chaises, color=JUSTE, scale_factor=1.15), run_time=0.35)
        faux = self.calc([("2 tables :", WHITE, "2 tables"), ("4n donne", PIEGE, "elle donne"), ("8", PIEGE, "8")], -0.45,
                         centre=xb, fs=38, larg=5.8, avec_morceau={0: [FadeIn(f2, scale=0.9)]})
        self.calc([("il y en a", WHITE, "il y en a"), ("6", JUSTE, "6")], -1.15, centre=xb, fs=38, larg=5.4,
                  avec=[Indicate(f2.chaises, color=JUSTE, scale_factor=1.15)])
        self.play(Create(self.barre_lisible(VGroup(faux[1], faux[2]))), run_time=0.3)
        self.calc([("Une formule doit marcher", JAUNE_TITRE, "Une formule doit")], -1.9, centre=-0.6, fs=38, larg=10)
        self.calc([("pour toutes les figures :", JAUNE_TITRE, "toutes les figures")], -2.48, centre=-0.6, fs=38, larg=10)
        self.calc([("teste-la sur les figures", WHITE, "teste-la"), ("1,", TERME, "1"), ("2", TERME, "2"),
                   ("et 3", TERME, "3")], -3.06, centre=-0.6, fs=38, larg=10)
        self.attendre_voix(marge=0.5)

    # ── 08 : question-pause n° 2 : + 20 % → A (géométrique de raison 1,2) ──

    def ecran_question2(self):
        fs = 38
        corps = [self.t(c, fs, WHITE, 1e9) for c in
                 ("géométrique de raison 1,2", "arithmétique de raison 20", "géométrique de raison 0,2")]
        cartes = VGroup(*[self.bouton(Ln, c, 9.2, fs) for Ln, c in zip("ABC", corps)]).arrange(DOWN, buff=0.16)
        cartes.move_to(P(0.5, -0.6))

        def e1():
            self.calc([("Le nombre de couverts servis augmente", WHITE, "Le nombre de couverts")], 2.5, centre=0,
                      fs=fs, larg=12)
            self.calc([("de 20 % chaque mois.", WHITE, "20")], 1.95, centre=0, fs=fs, larg=12)
            self.calc([("Quelle est la nature de la suite ?", JAUNE_TITRE, "Quelle est")], 1.4, centre=0, fs=fs,
                      larg=12)

        def dessin():
            self.play(FadeIn(assiette(0.8).move_to(P(-5.45, -0.6)), scale=0.8), run_time=0.3)

        q = self.question_libre("08-question", [e1], cartes, P(0.5, -2.5), dessin=dessin)
        self.dire("08b-reponse")
        self.au_mot("Réponse A")
        self.q_reponse(q, 0)
        y = q.cartes.get_bottom()[1] - 0.6
        c = self.calc([("+ 20 %", RAISON, "20 %"), ("→", WHITE, None), ("× (1", WHITE, "multiplier par 1"),
                       ("+ 0,2)", WHITE, "0,2"), ("=", WHITE, None), ("× 1,2", JUSTE, "soit 1,2")], y, centre=-0.4, fs=46,
                      larg=10)
        self.play(Create(self.encadre(c[-1], JUSTE, 0.12)), run_time=0.3)
        self.attendre_voix(marge=0.5)

    # ── 09 : le défi : la bordure de dalles noires ─────────────────────────

    def ecran_defi(self):
        self.nouvel_ecran("09-defi")
        tit = self.titre("À toi de jouer !", JAUNE_TITRE, 46, extrait="À toi", y=3.2)
        l1 = self.calc([("Un carreleur entoure un carré de", WHITE, "Un carreleur"),
                        ("n × n dalles", RANG, "n dalles sur")], 2.35, centre=0, fs=38, larg=12)
        l2 = self.calc([("d'une bordure de", WHITE, "d'une bordure"), ("dalles noires", WHITE, "dalles noires")], 1.7,
                       centre=0, fs=38, larg=12)
        xs = (-4.1, -0.5, 3.2)
        figs = [bordure(n).move_to(P(x, 0.45)) for n, x in zip((1, 2, 3), xs)]
        labs = []
        for n, (f, x) in enumerate(zip(figs, xs), start=1):
            self.suivre(f"Figure {n}")
            self.play(FadeIn(f.interieur, scale=0.8), LaggedStart(*[FadeIn(d, scale=0.6) for d in [*f.cotes, *f.coins]],
                                                                  lag_ratio=0.03), run_time=0.45)
            labs.append(self.calc([(f"Figure {n} :", WHITE, None), (str(D(n)), TERME, str(D(n)))], -0.75, centre=x,
                                  fs=36, larg=3))
        taches = self.calc([("Trouve", WHITE, "Trouve"), ("uₙ,", TERME, "u indice n", {"ₙ": RANG}),
                            ("puis la figure qui utilise", WHITE, "puis la figure"), ("100 dalles noires", TERME, "100")],
                           -1.65, centre=-0.4, fs=40, larg=12.4)
        self.defi_pause(-2.65, x=-1.0)
        self._defi = (tit, figs, labs, [l1, l2, taches])

    def ecran_correction(self):
        self.dire("09b-correction")
        tit, figs, labs, efface = self._defi
        self.au_mot("Correction")
        cor = self.t("Correction", 46, JUSTE).move_to(tit)
        haut = VGroup(*figs, *labs)
        self.play(ReplacementTransform(tit, cor), *[FadeOut(m) for m in efface], haut.animate.shift(UP * 1.3),
                  run_time=0.5)
        self.remove(*efface)
        sauts = []
        for a, b in zip(figs, figs[1:]):
            fl = self.fleche(a.get_right() + RIGHT * 0.1, b.get_left() + LEFT * 0.1, RAISON)
            lab = self.t("+ 4", 36, RAISON).next_to(fl, UP, buff=0.12)
            sauts.append(VGroup(fl, lab))
        self.suivre("4 dalles")
        self.play(*[GrowArrow(s[0]) for s in sauts], *[FadeIn(s[1], scale=1.3) for s in sauts], run_time=0.4)
        f3 = figs[2]
        self.calc([("4 côtés de", WHITE, "4 côtés"), ("n dalles", RAISON, "n dalles", {"n": RANG}),
                   ("+ 4 coins", JUSTE, "les 4 coins")], -0.3, centre=-0.6, fs=40, larg=10,
                  avec_morceau={1: [f3.cotes.animate.set_fill(RAISON)], 2: [f3.coins.animate.set_fill(JUSTE)]})
        f = self.calc([("uₙ =", TERME, "u indice n égale", {"ₙ": RANG}), ("4n + 4", WHITE, "4 n plus 4", {"n": RANG})],
                      -1.15, centre=-3.4, fs=50, larg=6)
        self.play(Create(self.encadre(f, TERME, 0.16)), run_time=0.3)
        v = self.calc([("On vérifie :", JAUNE_TITRE, "On vérifie"), ("u₁ =", TERME, "u indice 1"), ("8", JUSTE, "8")],
                      -1.15, centre=2.7, fs=42, larg=5.6, avec_morceau={2: [Indicate(labs[0][1], color=JUSTE)]})
        self.play(Create(self.coche(JUSTE, 0.22).next_to(v, RIGHT, buff=0.25)), run_time=0.25)
        c3 = self.calc([("4n + 4 =", WHITE, "Puis 4 n", {"n": RANG}), ("100", TERME, "100"),
                        ("→ 4n =", WHITE, "donne 4 n", {"n": RANG}), ("96", WHITE, "96"), ("→", WHITE, None),
                        ("n =", RANG, "et n égale"), ("24", JUSTE, "24")], -2.05, centre=-0.6, fs=44, larg=11)
        self.play(VGroup(c3[-2], c3[-1]).animate.shift(RIGHT * 0.15), run_time=0.15)
        self.play(Create(self.encadre(VGroup(c3[-2], c3[-1]), JUSTE, 0.12)), run_time=0.3)
        fin = self.calc([("c'est la figure", WHITE, "c'est la figure"), ("24", JUSTE, "24")], -2.95, centre=-1.0, fs=44,
                        larg=7)
        self.play(fin[-1].animate.shift(RIGHT * 0.15), run_time=0.15)
        self.play(Create(self.encadre(fin[-1], JUSTE, 0.12)), run_time=0.3)
        self.attendre_voix(marge=0.6)

    # ── 10 : ce que tu as appris ───────────────────────────────────────────

    def ecran_appris(self):
        fs = 44
        tc = lambda s, d: Text(s, font_size=fs, color=WHITE, t2c=d)  # noqa: E731
        p1 = [tc("On regarde ce qui change", {"ce qui change": RAISON}), tc("d'une étape à la suivante.", {})]
        p2 = [tc("On ajoute toujours pareil : arithmétique ;", {"On ajoute": RAISON, "arithmétique": TERME}),
              tc("on multiplie toujours pareil : géométrique.", {"on multiplie": RAISON, "géométrique": TERME})]
        p3 = [tc("On écrit uₙ, on la teste", {"uₙ": TERME, "on la teste": JUSTE}),
              tc("sur les premières figures,", {}),
              tc("puis on calcule un terme", {"un terme": TERME}), tc("ou on trouve un rang.", {"un rang": RANG})]
        for l in p1 + p2 + p3:
            l._pas_audit = True
        self.finale([(p1, ["on regarde", "d'une étape"]), (p2, ["on ajoute", "on multiplie"]),
                     (p3, ["On écrit", "sur les premières", "puis on s'en sert", "trouver un rang"])], cle="10-finale")

    def construct(self):
        self.ecran_garde()
        self.ecran_situation()
        self.ecran_observer()
        self.ecran_formule()
        self.ecran_question1()
        self.ecran_rang()
        self.ecran_nature()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_appris()
        self.fin("11-abonne")
