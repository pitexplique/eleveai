# suite_termes.py
# EleveAI — Maths 1re spé (programme 2026) — paysage « Suites : calculer un
# terme » (16:9), ceinture VERTE. Série SUITES, épisode 18. Vidéo COMMUNE : sert
# aussi la Tle (suite_calculer_termes).
# Micro du coach : suite_termes (lib/tutor-v4/questionBank/premiere-spe/maths/
# suites.bank.ts + suites-renfort.ts : « terme », « lireNuage », « un1 »,
# « rangValeur »).
#
# Ce que demande le coach → écran :
#   · calculer uₖ avec une forme explicite (remplacer n)       → 02, 04-question ;
#   · lire un terme sur le nuage : abscisse n, ordonnée uₙ    → 03-graphique ;
#   · uₙ₊₁ : on remplace n par (n + 1) partout (pas uₙ + 1)   → 05-piege, 09b ;
#   · une récurrence : de proche en proche                    → 06-recurrence ;
#   · trouver le RANG n tel que uₙ = valeur, un seuil         → 07-rang, 08-question.
# Clé de voix → écran :
#   00-garde (les barres des niveaux, le saut direct au 9) · 01 Chloé, game
#   designer : uₙ = 2n² + 10, départ n = 0 · 02 u₃ = 2 × 3² + 10 = 28 · 03 le
#   nuage, (3 ; 28) · 04/04b question (B : 60) · 05 le piège uₙ₊₁ · 06 le bonus
#   vₙ₊₁ = 2vₙ + 1, v₀ = 4 → 9, 19, 39 · 07 uₙ = 172 → n = 9 · 08/08b question
#   (C : 7) · 09/09b défi uₙ = 5n − 3 (47 ; 5n + 2 ; 15) · 10 « Ce que tu as
#   appris » · 11 fin.
# Code couleur (module commun) : bleu = termes, orange = calculs et raison,
# vert = juste, rouge = piège ; violet = le RANG n (comme l'ép. 17).
# Voix : manim/voix/premiere-spe-suite-termes.json (débit −6), calée mot à mot
# par suite_termes_marques.json.
# Contrôle : AUDIT=1 BORDS=1 python -m manim render --dry_run …
# python -m manim render -qh --disable_caching manim/scripts/premiere/suite_termes.py SuiteTermes1reSpe -o eleveai-maths-premiere-spe-suite-termes --media_dir manim/scripts/premiere/media-suite-termes
# Sortie : manim/sorties/premiere-spe/maths/suites/18-termes/

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from suites_commun import *  # noqa: E402,F403
from suite_arith_graphique import OutilsGraphique, Repere  # noqa: E402  (ép. 07)
from suite_geo_reconnaitre import AuditMilliers  # noqa: E402  (ép. 09)
from suite_geo_terme_rang import OutilsEp12  # noqa: E402  (ép. 12)
from suite_geo_interpreter import SuiteGeoInterpreter1re as _E16  # noqa: E402  (ép. 16 : calc, boutons_ligne)

# ── les affirmations de la voix, vérifiées ──────────────────────────────────
U = lambda n: 2 * n * n + 10  # noqa: E731
assert U(0) == 10 and U(3) == 28 and U(5) == 60 and 5 ** 2 == 25 and 2 * 25 == 50   # question 1 : B
assert U(9) == 172 and 172 - 10 == 162 and 162 // 2 == 81 and 9 * 9 == 81            # le rang : n = 9
assert U(6) == 82 and U(7) == 108 and 2 * 45 + 10 == 100                              # question 2 : C
assert 2 * 4 + 1 == 9 and 2 * 9 + 1 == 19 and 2 * 19 + 1 == 39                       # le bonus
assert 5 * 10 - 3 == 47 and all(5 * (n + 1) - 3 == 5 * n + 2 for n in range(9)) and (72 + 3) / 5 == 15  # défi

RANG = "#A855F7"                                                           # le rang n (violet)
PEAU, SWEAT, CHEVEUX = "#8d5524", "#7C3AED", "#1f1300"


# ── les dessins de l'épisode ────────────────────────────────────────────────

def chloe(s=1.0):
    """Chloé, game designer : cheveux longs, sweat violet, un casque audio."""
    cheveux = RoundedRectangle(width=0.66, height=0.8, corner_radius=0.3, fill_color=CHEVEUX, fill_opacity=1,
                               stroke_width=0).move_to(P(0, 0.88))
    tete = Circle(radius=0.26, fill_color=PEAU, fill_opacity=1, stroke_width=0).move_to(P(0, 0.98))
    frange = Sector(radius=0.28, angle=PI, start_angle=0, fill_color=CHEVEUX, fill_opacity=1,
                    stroke_width=0).move_to(P(0, 1.16))
    casque = Arc(radius=0.36, start_angle=0.15, angle=PI - 0.3, color="#E2E8F0", stroke_width=6).move_to(P(0, 1.22))
    ecouteurs = VGroup(*[RoundedRectangle(width=0.14, height=0.26, corner_radius=0.05, fill_color="#E2E8F0",
                                          fill_opacity=1, stroke_width=0).move_to(P(x, 0.98)) for x in (-0.33, 0.33)])
    corps = RoundedRectangle(width=0.95, height=1.15, corner_radius=0.25, fill_color=SWEAT, fill_opacity=1,
                             stroke_width=0).move_to(P(0, 0.12))
    return VGroup(cheveux, corps, tete, frange, casque, ecouteurs).scale(s)


def ecran_jeu(s=1.0):
    """L'écran d'un jeu de plateformes : le cadre, le sol, deux plateformes, le
    héros (un carré), une pièce ; le pied de l'écran."""
    cadre = RoundedRectangle(width=3.2, height=2.0, corner_radius=0.14, fill_color="#0F172A", fill_opacity=1,
                             stroke_color=GREY_B, stroke_width=4)
    sol = Rectangle(width=3.0, height=0.25, fill_color="#16A34A", fill_opacity=1, stroke_width=0).move_to(P(0, -0.78))
    plat = VGroup(*[Rectangle(width=w, height=0.16, fill_color="#B45309", fill_opacity=1, stroke_width=0).move_to(P(x, y))
                    for x, y, w in ((-0.75, -0.25, 0.8), (0.55, 0.25, 0.9))])
    heros = Square(0.3, fill_color=RAISON, fill_opacity=1, stroke_width=0).move_to(P(-0.75, 0.0))
    yeux = VGroup(*[Dot(P(-0.75 + dx, 0.05), radius=0.035, color="#111827") for dx in (-0.06, 0.07)])
    piece = Circle(radius=0.12, fill_color="#FACC15", fill_opacity=1, stroke_width=0).move_to(P(0.6, 0.6))
    pied = Polygon(P(-0.3, -1.0), P(0.3, -1.0), P(0.45, -1.3), P(-0.45, -1.3), fill_color=GREY_D, fill_opacity=1,
                   stroke_width=0)
    g = VGroup(pied, cadre, sol, plat, heros, yeux, piece).scale(s)
    g.heros, g.piece = VGroup(heros, yeux), piece
    return g


def manette(s=1.0):
    """Une manette : le corps, la croix, quatre boutons de couleur."""
    corps = RoundedRectangle(width=2.0, height=1.0, corner_radius=0.45, fill_color="#334155", fill_opacity=1,
                             stroke_width=0)
    croix = VGroup(Rectangle(width=0.42, height=0.13, fill_color="#0F172A", fill_opacity=1, stroke_width=0),
                   Rectangle(width=0.13, height=0.42, fill_color="#0F172A", fill_opacity=1, stroke_width=0))
    croix.move_to(P(-0.5, 0))
    bts = VGroup(*[Circle(radius=0.08, fill_color=c, fill_opacity=1, stroke_width=0).move_to(P(0.5 + dx, dy))
                   for c, dx, dy in ((TERME, 0, 0.16), (JUSTE, 0.16, 0), (PIEGE, 0, -0.16), (RAISON, -0.16, 0))])
    g = VGroup(corps, croix, bts).scale(s)
    g.boutons = bts
    return g


class Jauge(VGroup):
    """La jauge d'expérience : un fond, un remplissage orange (de gauche à droite,
    ou de bas en haut si vertical)."""

    def __init__(self, longueur=3.0, epaisseur=0.36, vertical=False, **kw):
        super().__init__(**kw)
        w, h = (epaisseur, longueur) if vertical else (longueur, epaisseur)
        self.fond = RoundedRectangle(width=w, height=h, corner_radius=0.08, fill_color="#1E293B", fill_opacity=1,
                                     stroke_color=GREY_B, stroke_width=3)
        self.vertical, self.longueur, self.epaisseur = vertical, longueur, epaisseur
        self.plein = self._plein(0.001)
        self.add(self.fond, self.plein)

    def _plein(self, f):
        L = max(self.longueur * f - 0.08, 0.01)
        r = Rectangle(width=self.epaisseur - 0.08 if self.vertical else L,
                      height=L if self.vertical else self.epaisseur - 0.08,
                      fill_color=RAISON, fill_opacity=1, stroke_width=0)
        coin = self.fond.get_corner(DL) + P(0.04, 0.04)
        return r.move_to(coin, aligned_edge=DL)

    def remplir(self, f):
        return Transform(self.plein, self._plein(f))


class SuiteTermes1reSpe(AuditMilliers, OutilsEp12, OutilsGraphique, PaysageSuites):
    fichier_marques = "suite_termes_marques.json"
    nom_voix = "premiere-spe-suite-termes"
    identite = "Maths 1re spé — EleveAI"
    ceinture = "verte"
    calc = _E16.calc
    fleche = _E16.fleche
    boutons_ligne = _E16.boutons_ligne

    def sauter(self, lg, i, texte, j=None, cote=DOWN, couleur=RAISON, fs=None, run_time=0.3):
        """Comme le module commun, mais le texte vient AVEC la flèche (au mot dit)."""
        sa = lg.saut(i, texte, j, cote, couleur, fs)
        self.play(Create(sa[0]), FadeIn(sa[1], scale=1.3), run_time=run_time)
        lg.sauts[i] = sa
        return sa

    def formule_n(self, fs=52, gauche="uₙ =", reste=("2 ×", "n²", "+ 10")):
        """« uₙ = 2 × n² + 10 » en une ligne ; les n en violet (le rang).
        Renvoie (ligne, [morceaux], [les glyphes n])."""
        mx = [(gauche, TERME, None, {"ₙ": RANG})] + [(r, WHITE, None, {"n": RANG} if "n" in r else None) for r in reste]
        tx, parts = self.ligne(mx, fs)
        ns = [parts[0][1]] + [parts[k + 1][0] for k, r in enumerate(reste) if r.startswith("n")]
        return tx, parts, ns

    # ── 00 : la garde ──────────────────────────────────────────────────────

    def dessin_garde(self):
        """Les barres des niveaux 0 à 9 (uₙ = 2n² + 10) et le saut DIRECT au 9."""
        x0, pas, base, k = -4.1, 0.62, -1.85, 1.15 / 172
        bars = VGroup(*[Rectangle(width=0.42, height=max(k * U(n), 0.05), fill_color=TERME, fill_opacity=1,
                                  stroke_width=0).move_to(P(x0 + pas * n, base), aligned_edge=DOWN)
                        for n in range(10)])
        bars[9].set_fill(JUSTE)
        neuf = self.t("9", 34, JUSTE, audit=False).next_to(bars[9], RIGHT, buff=0.15)
        arc = ArcBetweenPoints(bars[0].get_top() + UP * 0.1, bars[9].get_top() + UP * 0.1, angle=-PI / 3,
                               color=RAISON, stroke_width=5)
        bout = Triangle(fill_color=RAISON, fill_opacity=1, stroke_width=0).scale(0.1).rotate(PI)
        bout.move_to(bars[9].get_top() + UP * 0.16)
        self.play(LaggedStart(*[GrowFromEdge(b, DOWN) for b in bars], lag_ratio=0.1), run_time=0.8)
        self.play(Create(arc), FadeIn(bout), FadeIn(neuf, scale=1.3), Indicate(bars[9], color=JUSTE), run_time=0.6)

    def ecran_garde(self):
        self.garde("Suites",
                   [("calculer un terme", "calculer un terme", TERME),
                    ("Comment trouver directement les points", "Comment trouver"),
                    ("du niveau 9, sans passer par tous les autres ?", "9, sans")],
                   dessin=self.dessin_garde)

    # ── 01 : Chloé, game designer ──────────────────────────────────────────

    def ecran_situation(self):
        self.nouvel_ecran("01-situation")
        x = -4.6
        pers = chloe(1.05).move_to(P(x, 1.95))
        nom = self.t("Chloé", 44, JAUNE_TITRE).move_to(P(x, 0.8))
        met = self.t("game designer", 32, TERME).move_to(P(x, 0.12))
        self.au_mot("Chloé")
        self.play(FadeIn(pers, shift=UP * 0.2), FadeIn(nom, shift=UP * 0.1), run_time=0.5)
        self.au_mot("game designer")
        self.play(FadeIn(met, shift=UP * 0.1), run_time=0.3)
        jeu = ecran_jeu(1.0).move_to(P(0.2, 1.75))
        self.au_mot("règle la difficulté")
        self.play(FadeIn(jeu, shift=UP * 0.15), run_time=0.45)
        self.play(jeu.heros.animate.shift(P(1.3, 0.5)), run_time=0.5, rate_func=there_and_back)
        jg = Jauge(2.6, 0.4, vertical=True).move_to(P(4.4, 1.6))
        xp = self.t("XP", 30, RAISON, audit=False).next_to(jg, UP, buff=0.12)
        self.calc([("Au niveau", WHITE, "Au niveau"), ("n,", RANG, None), ("le joueur doit gagner", WHITE, "le joueur"),
                   ("uₙ", TERME, "u indice n"), ("points d'expérience", WHITE, "points d'expérience")],
                  -0.55, centre=0, fs=36, larg=12.4, avec_morceau={4: [FadeIn(jg), FadeIn(xp)]})
        self.play(jg.remplir(0.7), run_time=0.6)
        f = self.calc([("uₙ =", TERME, "avec u indice n"), ("2n²", WHITE, "2 n au carré"), ("+ 10", WHITE, "plus 10")],
                      -1.6, centre=-0.3, fs=60, larg=8)
        f[0][1].set_color(RANG)
        f[1][1].set_color(RANG)
        self.play(Create(self.encadre(f, TERME, 0.2)), run_time=0.35)
        d = self.calc([("Le premier niveau :", WHITE, "Le premier niveau"), ("n = 0", RANG, "0")], -2.85, centre=-0.6,
                      fs=38, larg=10)
        self.au_mot("la suite commence")
        self.play(Indicate(d[1], color=RANG, scale_factor=1.25), run_time=0.45)
        self.attendre_voix(marge=0.5)

    # ── 02 : la forme explicite : u₃ ───────────────────────────────────────

    def ecran_explicite(self):
        self.nouvel_ecran("02-explicite")
        self.titre("Forme explicite", JAUNE_TITRE, 46, extrait="forme explicite", y=3.2)
        self.calc([("uₙ est donné directement", WHITE, "u indice n est donné"),
                   ("en fonction de n", RANG, "en fonction de n")], 2.4, centre=0, fs=36, larg=12)
        xc = -2.4
        f, parts, ns = self.formule_n(52)
        f.move_to(P(xc, 1.3))
        self.play(FadeIn(f, shift=UP * 0.1), run_time=0.35)
        jeu = ecran_jeu(0.8).move_to(P(4.1, 1.0))
        niv = self.t("Niveau 3", 36, RANG).next_to(jeu, DOWN, buff=0.2)
        self.au_mot("Pour le niveau")
        self.suivre("3")
        self.play(FadeIn(jeu, shift=UP * 0.1), FadeIn(niv, scale=1.2), run_time=0.4)
        self.au_mot("on remplace")
        rp = self.t("n → 3", 36, RANG).next_to(f, RIGHT, buff=0.45)
        self.suivre("3")
        self.play(*[Indicate(m, color=RAISON, scale_factor=1.6) for m in ns], FadeIn(rp, scale=1.2), run_time=0.5)
        tx2, p2 = self.ligne([("u₃ =", TERME, None, {"₃": RANG}), ("2 ×", WHITE), ("3²", WHITE, None, {"3": RANG}),
                              ("+ 10", WHITE)], 52)
        tx2.move_to(P(xc, 0.25))
        self.au_mot("u indice 3")
        self.play(FadeIn(p2[0][0]), TransformFromCopy(ns[0], p2[0][1]), FadeIn(p2[0][2:]), run_time=0.35)
        self.suivre("2 fois")
        self.play(FadeIn(p2[1]), run_time=0.2)
        self.suivre("3 au carré")
        self.play(TransformFromCopy(ns[1], p2[2][0]), FadeIn(p2[2][1:]), run_time=0.35)
        self.suivre("plus 10")
        self.play(FadeIn(p2[3]), run_time=0.25)
        self.calc([("3² =", WHITE, "3 au carré"), ("9", RAISON, "9")], -0.75, centre=xc, fs=44, larg=7)
        self.calc([("2 ×", WHITE, "2 fois"), ("9", RAISON, "9"), ("=", WHITE, None), ("18", RAISON, "18")], -1.6,
                  centre=xc, fs=44, larg=7)
        gj = Jauge(3.0, 0.36).move_to(P(4.1, -1.15))
        c = self.calc([("18 + 10", WHITE, "plus 10"), ("=", WHITE, None), ("28 points", JUSTE, "28")], -2.45,
                      centre=xc, fs=44, larg=7, avec=[FadeIn(gj)])
        self.play(c[-1].animate.shift(RIGHT * 0.15), run_time=0.15)
        self.play(Create(self.encadre(c[-1], JUSTE, 0.14)), gj.remplir(28 / 60), Indicate(jeu.piece, color=JUSTE),
                  run_time=0.5)
        self.attendre_voix(marge=0.5)

    # ── 03 : le graphique : (n ; uₙ) ───────────────────────────────────────

    def ecran_graphique(self):
        self.nouvel_ecran("03-graphique")
        self.titre("Sur un graphique", JAUNE_TITRE, 46, extrait="Sur un graphique", y=3.2)
        rep = Repere((0, 4.4), (0, 50), P(0.8, -2.55), P(4.8, 2.1), 10, etiq_u=(20, 40), etiq_n=range(0, 5),
                     fs=30, fs_grad=28, buff_grad=0.12)
        xl = -3.45
        self.au_mot("on place les points")
        pts = VGroup(*[rep.point(n, U(n), r=0.1) for n in range(5)])
        self.play(*rep.anims(), run_time=0.5)
        self.play(LaggedStart(*[GrowFromCenter(d) for d in pts], lag_ratio=0.25), run_time=0.7)
        self.calc([("Points de coordonnées", WHITE, "de coordonnées")], 2.15, centre=xl, fs=38, larg=6.4)
        self.calc([("(", WHITE, "n et"), ("n", RANG, None), (";", WHITE, None), ("uₙ", TERME, "u indice n"),
                   (")", WHITE, None)], 1.45, centre=xl, fs=48, larg=6.4)
        self.calc([("L'abscisse :", RANG, "L'abscisse"), ("le rang,", RANG, "le rang"), ("le niveau", RANG, "le niveau")],
                  0.35, centre=xl, fs=34, larg=6.2, avec=[Indicate(rep.ax_n, color=RANG), Indicate(rep.lab_n, color=RANG)])
        self.calc([("L'ordonnée :", TERME, "L'ordonnée"), ("la valeur,", TERME, "la valeur"),
                   ("les points", TERME, "les points")], -0.45, centre=xl, fs=34, larg=6.2,
                  avec=[Indicate(rep.ax_u, color=TERME), Indicate(rep.lab_u, color=TERME)])
        d = pts[3]
        h = DashedLine(rep.G(0, 28), d.get_center(), color=RAISON, stroke_width=3, dash_length=0.1)
        v = DashedLine(rep.G(3, 0), d.get_center(), color=RAISON, stroke_width=3, dash_length=0.1)
        lab = self.t("(3 ; 28)", 34, JUSTE).next_to(d, UL, buff=0.12).shift(LEFT * 0.15 + UP * 0.1)
        self.calc([("Le point d'abscisse", WHITE, "Le point d'abscisse"), ("3", RANG, "3")], -1.55, centre=xl, fs=38,
                  larg=6.6, avec=[Create(v)])
        self.calc([("est à la hauteur", WHITE, None), ("28", JUSTE, "28")], -2.25, centre=xl, fs=38,
                  larg=6.6, avec=[Create(h), FadeIn(lab, scale=1.2), d.animate.set_color(JUSTE).scale(1.4)])
        self.attendre_voix(marge=0.5)

    # ── 04 : question-pause n° 1 : u₅ = 60 → B ─────────────────────────────

    def ecran_question1(self):
        cartes = self.boutons_ligne(["20", "60", "50"], y=0.2)

        def e1():
            self.calc([("Pour", WHITE, "Pour"), ("uₙ =", TERME, "u indice n égale"), ("2n²", WHITE, "2 n au carré"),
                       ("+ 10,", WHITE, "plus 10")], 2.3, centre=0, fs=46, larg=11)
            self.calc([("combien vaut", WHITE, "combien vaut"), ("u₅ ?", TERME, "u indice 5")], 1.5, centre=0, fs=50,
                      larg=11)

        q = self.question_libre("04-question", [e1], cartes, P(0, -1.05))
        self.dire("04b-reponse")
        self.au_mot("Réponse B")
        self.q_reponse(q, 1)
        self.calc([("5² =", WHITE, "5 au carré"), ("25", RAISON, "25")], -1.35, centre=-4.9, fs=42, larg=3.6)
        self.calc([("2 ×", WHITE, "2 fois"), ("25", RAISON, "25"), ("=", WHITE, None), ("50", RAISON, "50")], -1.35,
                  centre=-0.95, fs=42, larg=3.8)
        c = self.calc([("50", WHITE, None), ("+ 10", WHITE, "plus 10"), ("=", WHITE, None), ("60", JUSTE, "60")], -1.35,
                      centre=3.75, fs=42, larg=4.2)
        self.play(c[-1].animate.shift(RIGHT * 0.12), run_time=0.15)
        self.play(Create(self.encadre(c[-1], JUSTE, 0.12)), run_time=0.3)
        self.calc([("Le carré d'abord,", JAUNE_TITRE, "Le carré"), ("puis ×,", JAUNE_TITRE, "puis la multiplication"),
                   ("puis +", JAUNE_TITRE, "puis l'ajout")], -2.5, centre=-0.6, fs=42, larg=10)
        self.attendre_voix(marge=0.6)

    # ── 05 : le piège : uₙ₊₁ ───────────────────────────────────────────────

    def ecran_piege(self):
        self.nouvel_ecran("05-piege")
        self.titre("Le piège !", PIEGE, 48, extrait="piège", y=3.2)
        e = self.calc([("uₙ₊₁", TERME, "u indice n plus 1"), ("≠", PIEGE, "ce n'est pas"), ("uₙ + 1", PIEGE, "u indice n auquel")],
                      1.95, centre=0, fs=60, larg=9)
        self.au_mot("ajoute 1")
        cx = self.barrer(e[2])
        self.play(Create(cx), run_time=0.35)
        f, parts, ns = self.formule_n(54)
        f.move_to(P(0, 0.45))
        self.au_mot("On remplace")
        self.play(FadeIn(f, shift=UP * 0.1), run_time=0.35)
        self.au_mot("n plus 1, partout")
        tx, p = self.ligne([("uₙ₊₁ =", TERME, None, {"ₙ₊₁": RANG}), ("2 ×", WHITE), ("(n + 1)²", WHITE, None, {"n + 1": RANG}),
                            ("+ 10", WHITE)], 54)
        tx.move_to(P(0, -1.1))
        fls = VGroup(*[self.fleche(m.get_bottom() + DOWN * 0.08, P(m.get_center()[0], -0.62), RAISON) for m in ns])
        self.play(*[Indicate(m, color=RAISON, scale_factor=1.7) for m in ns], run_time=0.45)
        self.au_mot("partout")
        self.play(*[GrowArrow(a) for a in fls], run_time=0.35)
        self.au_mot("u indice n plus 1 égale")
        self.play(FadeIn(p[0][0]), TransformFromCopy(ns[0], p[0][1:4]), FadeIn(p[0][4:]), run_time=0.4)
        self.suivre("2 fois")
        self.play(FadeIn(p[1]), run_time=0.2)
        self.suivre("n plus 1 au carré")
        self.play(TransformFromCopy(ns[1], p[2][1:4]), FadeIn(p[2][0]), FadeIn(p[2][4:]), run_time=0.4)
        self.suivre("plus 10")
        self.play(FadeIn(p[3]), run_time=0.25)
        self.play(Create(self.encadre(tx, JUSTE, 0.2)), run_time=0.35)
        self.attendre_voix(marge=0.5)

    # ── 06 : le bonus : une récurrence ─────────────────────────────────────

    def ecran_recurrence(self):
        self.nouvel_ecran("06-recurrence")
        self.titre("Le bonus de Chloé", JAUNE_TITRE, 46, extrait="bonus", y=3.2)
        lg = LigneTermes(["4", "9", "19", "39"], centre=P(0, -0.45), pas=2.7, largeur=1.35, hauteur=0.85, fs=42,
                         noms=[u(k, "v") for k in range(4)], fs_noms=32)
        self.calc([("Niveau 0 :", WHITE, "0"), ("v₀ =", TERME, "le bonus vaut"), ("4", TERME, "4")], 2.3, centre=-3.4,
                  fs=40, larg=5.6, avec_morceau={2: [FadeIn(lg.cases[0][0], scale=0.8), FadeIn(lg.cases[0][1], scale=1.4),
                                                     FadeIn(lg.noms[0])]})
        self.calc([("À chaque niveau :", WHITE, "à chaque niveau"), ("× 2", RAISON, "double"), ("puis + 1", RAISON, "ajoute 1")],
                  2.3, centre=3.0, fs=38, larg=6.6)
        f = self.calc([("vₙ₊₁ =", TERME, "v indice n plus 1 égale"), ("2vₙ", WHITE, "2 v indice n"), ("+ 1", WHITE, "plus 1")],
                      1.35, centre=-3.0, fs=52, larg=5.6)
        self.play(Create(self.encadre(f, RAISON, 0.16)), run_time=0.3)
        self.calc([("une récurrence :", JAUNE_TITRE, "récurrence")], 1.66, centre=3.1, fs=34, larg=6)
        self.calc([("de proche en proche", RAISON, "de proche en proche")], 1.1, centre=3.1, fs=34, larg=6)
        xc = -0.8
        for k, (a, b) in enumerate(((4, 9), (9, 19))):
            y = -1.75 - 0.72 * k
            sa = lg.saut(k, "× 2 + 1", cote=UP, fs=30, creux=0.22)
            lg.sauts[k] = sa
            self.calc([(u(k + 1, "v") + " =", TERME, f"v indice {k + 1}"), ("2 ×", WHITE, "2 fois"), (str(a), TERME, str(a)),
                       ("+ 1", RAISON, "plus 1"), ("=", WHITE, "égale"), (str(b), JUSTE, str(b))], y, centre=xc, fs=40,
                      larg=8, avec_morceau={1: [Create(sa[0]), FadeIn(sa[1], scale=1.3)],
                                            5: [FadeIn(lg.cases[k + 1][0], scale=0.8),
                                                FadeIn(lg.cases[k + 1][1], scale=1.4), FadeIn(lg.noms[k + 1])]})
        sa = lg.saut(2, "× 2 + 1", cote=UP, fs=30, creux=0.22)
        self.calc([("v₃ =", TERME, "v indice 3"), ("2 × 19 + 1", WHITE, None), ("=", WHITE, None), ("39", JUSTE, "39")],
                  -3.19, centre=xc, fs=40, larg=8,
                  avec_morceau={0: [Create(sa[0]), FadeIn(sa[1], scale=1.3)],
                                3: [FadeIn(lg.cases[3][0], scale=0.8), FadeIn(lg.cases[3][1], scale=1.4), FadeIn(lg.noms[3])]})
        self.play(*self.allumer_cases(lg, [3]), run_time=0.4)
        self.attendre_voix(marge=0.5)

    # ── 07 : dans l'autre sens : le rang ───────────────────────────────────

    def ecran_rang(self):
        self.nouvel_ecran("07-rang")
        self.titre("Dans l'autre sens", JAUNE_TITRE, 46, extrait="Et dans l'autre sens", y=3.2)
        xc = -2.0
        self.calc([("À quel niveau faut-il", WHITE, "à quel niveau"), ("172 points ?", TERME, "172")], 2.3, centre=xc,
                  fs=38, larg=9.0)
        self.calc([("On cherche le rang", WHITE, "On cherche"), ("n", RANG, "rang n"), ("tel que", WHITE, "tel que"),
                   ("uₙ = 172", TERME, "172")], 1.6, centre=xc, fs=38, larg=9.0)
        jg = Jauge(3.0, 0.45, vertical=True).move_to(P(4.4, -0.55))
        niv = self.t("niveau ?", 36, RANG).next_to(jg, UP, buff=0.25)
        self.play(FadeIn(jg), FadeIn(niv), run_time=0.3)
        x1, fs = -1.2, 46
        l1 = self.calc([("2n² + 10", WHITE, "2 n au carré"), ("=", WHITE, "égale"), ("172", TERME, "172")], 0.5,
                       centre=x1, fs=fs, larg=6, avec=[jg.remplir(0.35)])
        l2 = self.calc([("2n²", WHITE, "donc 2 n"), ("=", WHITE, "égale"), ("162", TERME, "162")], -0.35, centre=x1,
                       fs=fs, larg=6, avec=[jg.remplir(0.6)])
        m1 = self.t("− 10", 32, RAISON).next_to(l2, LEFT, buff=0.6)
        self.play(FadeIn(m1, shift=RIGHT * 0.1), run_time=0.2)
        l3 = self.calc([("n²", WHITE, "n au carré"), ("=", WHITE, "égale"), ("81", TERME, "81")], -1.2, centre=x1, fs=fs,
                       larg=6, avec=[jg.remplir(0.8)])
        m2 = self.t("÷ 2", 32, RAISON).next_to(l3, LEFT, buff=0.6).align_to(m1, RIGHT)
        self.play(FadeIn(m2, shift=RIGHT * 0.1), run_time=0.2)
        n9 = self.t("niveau 9", 36, JUSTE).move_to(niv)
        l4 = self.calc([("n =", RANG, "et n égale"), ("9", JUSTE, "9")], -2.05, centre=x1, fs=fs, larg=6,
                       avec=[jg.remplir(1.0)])
        rq = self.t("(n ≥ 0 : c'est un rang)", 30, GREY_A, audit=False).next_to(l4, DOWN, buff=0.3)
        self.play(FadeIn(rq), run_time=0.25)
        self.au_mot("C'est le niveau")
        self.suivre("9")
        self.play(Create(self.encadre(l4, JUSTE, 0.16)), ReplacementTransform(niv, n9), run_time=0.4)
        self.play(Indicate(n9, color=JUSTE, scale_factor=1.2), run_time=0.4)
        self.attendre_voix(marge=0.5)

    # ── 08 : question-pause n° 2 : plus de 100 points → C (7) ──────────────

    def ecran_question2(self):
        cartes = self.boutons_ligne(["45", "6", "7"], y=0.25)

        def e1():
            self.calc([("Avec", WHITE, "Avec"), ("uₙ =", TERME, "u indice n égale"), ("2n²", WHITE, "2 n au carré"),
                       ("+ 10,", WHITE, "plus 10")], 2.35, centre=0, fs=44, larg=11)
            self.calc([("à partir de quel niveau faut-il", WHITE, "à partir"), ("plus de 100 points ?", TERME, "100")],
                      1.6, centre=0, fs=42, larg=12)

        q = self.question_libre("08-question", [e1], cartes, P(0, -0.95))
        self.dire("08b-reponse")
        self.au_mot("Réponse C")
        self.q_reponse(q, 2)
        xb, base, k = 3.3, -2.85, 1.9 / 108
        b6 = Rectangle(width=0.55, height=k * 82, fill_color=PIEGE, fill_opacity=1, stroke_width=0)
        b6.move_to(P(xb, base), aligned_edge=DOWN)
        b7 = Rectangle(width=0.55, height=k * 108, fill_color=JUSTE, fill_opacity=1, stroke_width=0)
        b7.move_to(P(xb + 0.9, base), aligned_edge=DOWN)
        seuil = DashedLine(P(xb - 0.6, base + k * 100), P(xb + 1.5, base + k * 100), color=RAISON, stroke_width=3,
                           dash_length=0.1)
        cent = self.t("100", 30, RAISON).next_to(seuil, LEFT, buff=0.12)
        n6 = self.t("u₆", 30, TERME, audit=False).next_to(b6, DOWN, buff=0.08)
        n7 = self.t("u₇", 30, TERME, audit=False).next_to(b7, DOWN, buff=0.08)
        xc = -2.6
        self.calc([("u₆ =", TERME, "u indice 6"), ("82", WHITE, "82"), (": pas encore", PIEGE, "pas encore")], -1.2,
                  centre=xc, fs=42, larg=7, avec_morceau={1: [GrowFromEdge(b6, DOWN), FadeIn(n6), Create(seuil)]})
        self.calc([("u₇ =", TERME, "u indice 7"), ("108", WHITE, "108"), (": ça dépasse", JUSTE, "ça dépasse"),
                   ("100", JUSTE, "100")], -1.95, centre=xc, fs=42, larg=7,
                  avec_morceau={1: [GrowFromEdge(b7, DOWN), FadeIn(n7)], 3: [FadeIn(cent)]})
        c = self.calc([("Le premier rang qui franchit le seuil :", WHITE, "Le premier rang"), ("7", JUSTE, "7")], -2.75,
                      centre=-1.8, fs=40, larg=8.6)
        self.play(c[-1].animate.shift(RIGHT * 0.12), run_time=0.15)
        self.play(Create(self.encadre(c[-1], JUSTE, 0.12)), Indicate(b7, color=JUSTE), run_time=0.35)
        self.attendre_voix(marge=0.5)

    # ── 09 : le défi : uₙ = 5n − 3 ─────────────────────────────────────────

    def ecran_defi(self):
        self.nouvel_ecran("09-defi")
        tit = self.titre("À toi de jouer !", JAUNE_TITRE, 46, extrait="À toi", y=3.2)
        ma = manette(1.0).move_to(P(4.75, 1.95))
        self.au_mot("Dans un autre jeu")
        self.play(FadeIn(ma, shift=UP * 0.15), run_time=0.35)
        self.calc([("Dans un autre jeu :", WHITE, None), ("uₙ =", TERME, "u indice n égale"), ("5n − 3,", WHITE, "5 n moins 3"),
                   ("pour", WHITE, "pour n"), ("n ≥ 0", RANG, "0")], 2.0, centre=-1.75, fs=38, larg=9.4)
        x, fs = -6.0, 40
        taches = (
            [("1.", JAUNE_TITRE, "Calcule"), ("Calcule", WHITE, None), ("u₁₀.", TERME, "u indice 10")],
            [("2.", JAUNE_TITRE, "Écris"), ("Écris", WHITE, None), ("uₙ₊₁", TERME, "u indice n plus 1"),
             ("en fonction de n.", WHITE, "en fonction")],
            [("3.", JAUNE_TITRE, "Puis trouve"), ("Trouve le rang", WHITE, None), ("n", RANG, "rang n"),
             ("tel que", WHITE, "tel que"), ("uₙ = 72.", TERME, "72")])
        for k, (mx, y) in enumerate(zip(taches, (0.95, 0.1, -0.75))):
            self.calc(mx, y, x=x, fs=fs, larg=9.6,
                      avec_morceau={0: [Indicate(ma.boutons[k], color=WHITE, scale_factor=1.8)]})
        self.defi_pause(-1.9, x=-1.0)
        self._defi = (tit, ma, [m for m in self.mobjects if m is not tit and m is not self._margo and m is not ma])

    def ecran_correction(self):
        self.dire("09b-correction")
        tit, ma, efface = self._defi
        self.au_mot("Correction")
        cor = self.t("Correction", 46, JUSTE).move_to(tit)
        self.play(ReplacementTransform(tit, cor), *[FadeOut(m) for m in efface], run_time=0.45)
        self.remove(*efface)
        x, fs = -6.0, 46
        c1 = self.calc([("1.", JAUNE_TITRE, "u indice 10"), ("u₁₀ =", TERME, None), ("5 ×", WHITE, "5 fois"),
                        ("10", WHITE, "10"), ("− 3", WHITE, "moins 3"), ("=", WHITE, "égale"), ("47", JUSTE, "47")],
                       1.6, x=x, fs=fs, larg=9.6, avec_morceau={6: [Indicate(ma.boutons[0], color=WHITE, scale_factor=1.8)]})
        self.play(c1[-1].animate.shift(RIGHT * 0.15), run_time=0.15)
        self.play(Create(self.encadre(c1[-1], JUSTE, 0.12)), run_time=0.25)
        c2 = self.calc([("2.", JAUNE_TITRE, "u indice n plus 1 égale"), ("uₙ₊₁ =", TERME, None), ("5 ×", WHITE, "5 fois"),
                        ("(n + 1)", RANG, "n plus 1"), ("− 3", WHITE, "moins 3"), ("=", WHITE, "égale"),
                        ("5n + 2", JUSTE, "5 n plus 2")], 0.0, x=x, fs=fs, larg=11.6,
                       avec_morceau={6: [Indicate(ma.boutons[1], color=WHITE, scale_factor=1.8)]})
        self.play(c2[-1].animate.shift(RIGHT * 0.15), run_time=0.15)
        self.play(Create(self.encadre(c2[-1], JUSTE, 0.12)), Indicate(c2[3], color=RANG, scale_factor=1.15),
                  run_time=0.35)
        c3 = self.calc([("3.", JAUNE_TITRE, "Et 5 n moins 3"), ("5n − 3", WHITE, None), ("=", WHITE, "égale"),
                        ("72", WHITE, "72"), ("→ 5n =", WHITE, "donne 5 n"), ("75", WHITE, "75"), ("→", WHITE, "donc n"),
                        ("n =", RANG, None), ("15", JUSTE, "15")], -1.6, x=x, fs=fs, larg=11.6,
                       avec_morceau={8: [Indicate(ma.boutons[2], color=WHITE, scale_factor=1.8)]})
        self.play(VGroup(c3[-2], c3[-1]).animate.shift(RIGHT * 0.15), run_time=0.15)
        self.play(Create(self.encadre(VGroup(c3[-2], c3[-1]), JUSTE, 0.12)), run_time=0.3)
        self.attendre_voix(marge=0.6)

    # ── 10 : ce que tu as appris ───────────────────────────────────────────

    def ecran_appris(self):
        fs = 41
        tc = lambda s, d: Text(s, font_size=fs, color=WHITE, t2c=d)  # noqa: E731
        p1 = [tc("Forme explicite : on remplace n", {"Forme explicite": TERME}),
              tc("par sa valeur, partout.", {"sa valeur": RAISON})]
        p2 = [tc("Récurrence : on avance de proche en proche,", {"Récurrence": TERME, "de proche en proche": RAISON}),
              tc("depuis le premier terme.", {})]
        p3 = [tc("Trouver un rang : on résout uₙ = la valeur ;", {"Trouver un rang": RANG, "uₙ = la valeur": TERME}),
              tc("la réponse est un n.", {"un n": RANG})]
        for l in p1 + p2 + p3:
            l._pas_audit = True
        self.finale([(p1, ["Avec une forme explicite", "par sa valeur"]), (p2, ["Avec une récurrence", "depuis le premier"]),
                     (p3, ["Et pour trouver", "la réponse est"])], cle="10-finale")

    def construct(self):
        self.ecran_garde()
        self.ecran_situation()
        self.ecran_explicite()
        self.ecran_graphique()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_recurrence()
        self.ecran_rang()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_appris()
        self.fin("11-abonne")
