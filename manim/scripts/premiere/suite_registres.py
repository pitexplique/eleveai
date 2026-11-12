# suite_registres.py
# EleveAI — Maths 1re spé (programme 2026) — paysage « Suites : des mots aux
# symboles » (16:9), ceinture VERTE. Série SUITES, épisode 17.
# Micro du coach : suite_registres (lib/tutor-v4/questionBank/premiere-spe/maths/
# suites.bank.ts + suites-renfort.ts) : lire uₙ en français (rang / valeur),
# traduire une phrase en relation de récurrence (+ r, × coefficient), relier un
# rang à une année, voir où commence la suite (u₀ ou u₁).
#
# Ce que demande le coach → écran :
#   · uₙ = 180 en français : le rang n compte, uₙ est la valeur → 02, 03, 04-question ;
#   · « + 15 chaque année » → uₙ₊₁ = uₙ + 15 ; « + 10 % » → × 1,1    → 05-recurrence ;
#   · « − 5 % » → × 0,95 (erreurs typiques : − 5, × 0,05)           → 08-question ;
#   · le rang ↔ l'année, et le départ à u₁ (tout décale)            → 06-annee, 07-piege ;
#   · deux étapes dans l'ordre (− 10 % puis + 30)                   → 09 défi, 09b.
# Clé de voix → écran :
#   00-garde (une bulle de mots ↔ uₙ) · 01 Sofiane, directeur d'une école de
#   musique : 120 élèves en 2026, la classe de guitare, + 15 par an · 02 uₙ, le
#   rang (violet) et la valeur (bleu), u₀ = 120 · 03 u₄ = 180 se lit… ; la frise
#   et ses 4 sauts « + 15 » · 04/04b question (C) · 05 uₙ → uₙ₊₁ : « + 15 » puis
#   « × 1,1 » · 06 u₇ ↔ 2033 sur la frise · 07 le piège : départ à u₁, tout se
#   décale ; uₙ = 120 + 15 × (n − 1) · 08/08b question (A : × 0,95) · 09/09b défi
#   de la lettre d'information (× 0,9 puis + 30 ; u₁ = 210) · 10 « Ce que tu as
#   appris » · 11 fin.
# Code couleur (module commun) : bleu = termes (valeurs), orange = raison et
# évolutions, vert = juste, rouge = piège ; violet = le RANG (propre à l'épisode).
# Voix : manim/voix/premiere-spe-suite-registres.json (débit −6), calée mot à mot
# par suite_registres_marques.json.
# Contrôle : AUDIT=1 BORDS=1 python -m manim render --dry_run …
# python -m manim render -qh --disable_caching manim/scripts/premiere/suite_registres.py SuiteRegistres1reSpe -o eleveai-maths-premiere-spe-suite-registres --media_dir manim/scripts/premiere/media-suite-registres
# Sortie : manim/sorties/premiere-spe/maths/suites/17-registres/

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from suites_commun import *  # noqa: E402,F403
from suite_arith_graphique import OutilsGraphique  # noqa: E402  (ép. 07)
from suite_geo_reconnaitre import AuditMilliers, points_disque  # noqa: E402  (ép. 09)
from suite_geo_terme_rang import OutilsEp12  # noqa: E402  (ép. 12)
from suite_geo_interpreter import SuiteGeoInterpreter1re as _E16  # noqa: E402  (ép. 16 : calc, boutons_ligne)

# ── les affirmations de la voix, vérifiées ──────────────────────────────────
assert 120 + 4 * 15 == 180 and 120 + 6 * 15 == 210                       # u₄ = 180 ; question 1 : C (u₆ = 210)
assert abs(120 * 1.1 - 132) < 1e-9 and 2026 + 7 == 2033
assert 120 + 15 * (8 - 1) == 120 + 15 * 7                                  # le piège : u₈ (départ u₁) = u₇ (départ u₀)
assert abs(1 - 0.05 - 0.95) < 1e-9                                         # question 2 : A
assert 0.9 * 200 + 30 == 210 and 0.9 * 200 == 180                          # défi : u₁ = 210

RANG = "#A855F7"                                                           # le rang n (violet)
PEAU, PULL, BOIS_G = "#c68642", "#0F766E", "#B45309"


# ── les dessins de l'épisode ────────────────────────────────────────────────

def sofiane(s=1.0):
    """Sofiane, directeur de l'école de musique : pull vert, une partition."""
    tete = Circle(radius=0.27, fill_color=PEAU, fill_opacity=1, stroke_width=0).move_to(P(0, 0.98))
    cheveux = Sector(radius=0.29, angle=PI, start_angle=0, fill_color="#1f1300", fill_opacity=1,
                     stroke_width=0).move_to(P(0, 1.17))
    corps = RoundedRectangle(width=0.95, height=1.15, corner_radius=0.25, fill_color=PULL, fill_opacity=1,
                             stroke_width=0).move_to(P(0, 0.12))
    part = RoundedRectangle(width=0.46, height=0.58, corner_radius=0.04, fill_color="#F8FAFC", fill_opacity=1,
                            stroke_color=GREY_B, stroke_width=2).move_to(P(0.68, 0.12))
    portee = VGroup(*[Line(P(0.5, y), P(0.86, y), stroke_color=GREY_D, stroke_width=1.5)
                      for y in (0.3, 0.22, 0.14, 0.06, -0.02)])
    note = VGroup(Dot(P(0.62, 0.02), radius=0.05, color="#111827"),
                  Line(P(0.66, 0.02), P(0.66, 0.28), stroke_color="#111827", stroke_width=2))
    return VGroup(corps, tete, cheveux, part, portee, note).scale(s)


def ecole(s=1.0):
    """L'école de musique : le bâtiment, le toit, la porte, une grande note."""
    murs = Rectangle(width=2.4, height=1.4, fill_color="#FDE68A", fill_opacity=1, stroke_width=0)
    toit = Polygon(P(-1.4, 0.7), P(1.4, 0.7), P(0, 1.45), fill_color="#B91C1C", fill_opacity=1, stroke_width=0)
    porte = RoundedRectangle(width=0.42, height=0.7, corner_radius=0.08, fill_color=BOIS_G, fill_opacity=1,
                             stroke_width=0).move_to(P(0, -0.35))
    fen = VGroup(*[Square(0.36, fill_color="#93C5FD", fill_opacity=1, stroke_width=0).move_to(P(x, 0.2))
                   for x in (-0.75, 0.75)])
    note = VGroup(Dot(P(-0.07, 0.95), radius=0.09, color="#111827"),
                  Line(P(0.0, 0.95), P(0.0, 1.25), stroke_color="#111827", stroke_width=4),
                  Line(P(0.0, 1.25), P(0.16, 1.15), stroke_color="#111827", stroke_width=4))
    return VGroup(murs, toit, porte, fen, note).scale(s)


def guitare(s=1.0):
    """Une guitare : la caisse en huit, la rosace, le manche."""
    bas = Circle(radius=0.32, fill_color=BOIS_G, fill_opacity=1, stroke_width=0).move_to(P(0, -0.2))
    haut = Circle(radius=0.24, fill_color=BOIS_G, fill_opacity=1, stroke_width=0).move_to(P(0, 0.2))
    rosace = Circle(radius=0.08, fill_color="#111827", fill_opacity=1, stroke_width=0).move_to(P(0, -0.08))
    manche = Rectangle(width=0.1, height=0.8, fill_color="#78350F", fill_opacity=1, stroke_width=0).move_to(P(0, 0.75))
    tete = Rectangle(width=0.18, height=0.16, fill_color="#78350F", fill_opacity=1, stroke_width=0).move_to(P(0, 1.2))
    return VGroup(bas, haut, rosace, manche, tete).rotate(-0.35).scale(s)


def eleves(n, x0, y0, par_rang=12, pas=0.17, couleur=TERME, r=0.055):
    """n élèves en points, rangés par rangs de 12 (de bas en haut)."""
    return VGroup(*[Dot(P(x0 + (k % par_rang) * pas, y0 + (k // par_rang) * pas), radius=r, color=couleur)
                    for k in range(n)])


def bulle(larg=2.2, haut=1.0):
    """Une bulle de paroles (les mots), avec trois traits de texte."""
    b = RoundedRectangle(width=larg, height=haut, corner_radius=0.3, fill_color="#F8FAFC", fill_opacity=1,
                         stroke_width=0)
    q = Polygon(P(-larg / 2 + 0.35, -haut / 2 + 0.02), P(-larg / 2 + 0.7, -haut / 2 + 0.02),
                P(-larg / 2 + 0.2, -haut / 2 - 0.35), fill_color="#F8FAFC", fill_opacity=1, stroke_width=0)
    traits = VGroup(*[Line(P(-larg / 2 + 0.3, y), P(larg / 2 - 0.3 - d, y), stroke_color=GREY_D, stroke_width=5)
                      for y, d in ((0.2, 0), (0.0, 0.3), (-0.2, 0.6))])
    return VGroup(b, q, traits)


def lettre_info(s=1.0):
    """La lettre d'information : une enveloppe ouverte et sa feuille."""
    env = Rectangle(width=1.5, height=0.95, fill_color="#E2E8F0", fill_opacity=1, stroke_color=GREY_B, stroke_width=2)
    rabat = Polygon(P(-0.75, 0.475), P(0.75, 0.475), P(0, -0.05), fill_color="#CBD5E1", fill_opacity=1,
                    stroke_color=GREY_B, stroke_width=2)
    feuille = Rectangle(width=1.1, height=0.8, fill_color="#FEF3C7", fill_opacity=1, stroke_width=0).move_to(P(0, 0.6))
    lignes = VGroup(*[Line(P(-0.4, y), P(0.4, y), stroke_color=GREY_D, stroke_width=2) for y in (0.85, 0.7, 0.55)])
    return VGroup(feuille, lignes, env, rabat).scale(s)


class SuiteRegistres1reSpe(AuditMilliers, OutilsEp12, OutilsGraphique, PaysageSuites):
    fichier_marques = "suite_registres_marques.json"
    nom_voix = "premiere-spe-suite-registres"
    identite = "Maths 1re spé — EleveAI"
    ceinture = "verte"
    XG = -3.3
    calc = _E16.calc
    fleche = _E16.fleche
    boutons_ligne = _E16.boutons_ligne

    def frise(self, n, y, x0=-4.55, pas=1.3, noms=None, couleur=TERME):
        """La frise des rangs 0 … n−1 : un axe, des traits, les noms dessous."""
        ticks = VGroup(*[Line(P(x0 + pas * k, y - 0.12), P(x0 + pas * k, y + 0.12), stroke_width=3, color=GREY_B)
                         for k in range(n)])
        axe = Line(P(x0 - 0.3, y), P(x0 + (n - 1) * pas + 0.3, y), stroke_width=3, color=GREY_B)
        nms = VGroup(*[self.t(nm, 32, couleur).next_to(ticks[k], DOWN, buff=0.12) for k, nm in (noms or [])])
        return axe, ticks, nms

    def sauter(self, lg, i, texte, j=None, cote=DOWN, couleur=RAISON, fs=None, run_time=0.3):
        """Comme le module commun, mais le texte vient AVEC la flèche (au mot dit)."""
        sa = lg.saut(i, texte, j, cote, couleur, fs)
        self.play(Create(sa[0]), FadeIn(sa[1], scale=1.3), run_time=run_time)
        lg.sauts[i] = sa
        return sa

    def sauts(self, ticks, i, j, texte=None, couleur=RAISON, fs=28):
        """Les petits sauts d'un trait au suivant, de i à j (texte au-dessus de chacun)."""
        g = VGroup()
        for k in range(i, j):
            a, b = ticks[k].get_top() + UP * 0.05, ticks[k + 1].get_top() + UP * 0.05
            arc = ArcBetweenPoints(a, b, angle=-PI / 2.2, color=couleur, stroke_width=4)
            el = VGroup(arc)
            if texte:
                el.add(self.t(texte, fs, couleur).next_to(arc, UP, buff=0.05))
            g.add(el)
        return g

    # ── 00 : la garde ──────────────────────────────────────────────────────

    def dessin_garde(self):
        """Une bulle de mots ↔ le symbole uₙ (les deux registres)."""
        bl = bulle(2.0, 0.9).move_to(P(-2.6, -1.15))
        un = self.t("uₙ", 72, TERME).move_to(P(1.4, -1.15))
        dbl = DoubleArrow(P(-1.4, -1.15), P(0.6, -1.15), buff=0, color=RAISON, stroke_width=5, tip_length=0.2)
        self.play(FadeIn(bl, shift=RIGHT * 0.2), run_time=0.35)
        self.play(GrowFromCenter(dbl), FadeIn(un, scale=1.3), run_time=0.45)

    def ecran_garde(self):
        self.garde("Suites",
                   [("des mots aux symboles", "des mots", TERME),
                    ("Que veut dire, en français,", "Que veut"),
                    ("u₄ = 180 ?", "180")],
                   dessin=self.dessin_garde)

    # ── 01 : Sofiane et l'école de musique ─────────────────────────────────

    def ecran_situation(self):
        self.nouvel_ecran("01-situation")
        x = -4.5
        pers = sofiane(1.05).move_to(P(x, 1.95))
        nom = self.t("Sofiane", 44, JAUNE_TITRE).move_to(P(x, 0.72))
        met = [self.t("directeur d'une", 30, TERME), self.t("école de musique", 30, TERME)]
        met[0].move_to(P(x, 0.15))
        met[1].move_to(P(x, -0.3))
        self.au_mot("Sofiane")
        self.play(FadeIn(pers, shift=UP * 0.2), FadeIn(nom, shift=UP * 0.1), run_time=0.5)
        self.au_mot("dirige")
        ec = ecole(1.0).move_to(P(0.2, 1.75))
        self.play(FadeIn(met[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("école de musique")
        self.play(FadeIn(met[1], shift=UP * 0.1), FadeIn(ec, shift=UP * 0.15), run_time=0.4)
        x0, y0 = 2.0, 1.15
        el = eleves(120, x0, y0)
        self.au_mot("rentrée")
        self.calc([("Rentrée 2026 :", WHITE, "2026"), ("120 élèves", TERME, "120")], -0.35, centre=3.1, fs=36, larg=6.6,
                  avec_morceau={1: [LaggedStart(*[GrowFromCenter(d) for d in el], lag_ratio=0.01)]})
        g = guitare(0.8).move_to(P(-1.6, -1.55))
        self.au_mot("guitare")
        lg = self.t("une classe de guitare", 32, GREY_A).next_to(g, RIGHT, buff=0.3)
        self.play(FadeIn(g, shift=UP * 0.15), FadeIn(lg, shift=LEFT * 0.1), run_time=0.45)
        nv = eleves(15, x0, y0 + 10 * 0.17, couleur=RAISON)
        self.suivre("15")
        c = self.calc([("+ 15 élèves", RAISON, None), ("chaque année", RAISON, "chaque année")], -2.75, centre=0.5,
                      fs=40, larg=9, avec_morceau={0: [LaggedStart(*[GrowFromCenter(d) for d in nv], lag_ratio=0.05)]})
        self.play(Indicate(nv, color=RAISON, scale_factor=1.3), run_time=0.4)
        self.attendre_voix(marge=0.5)

    # ── 02 : la notation : le rang et la valeur ────────────────────────────

    def ecran_notation(self):
        self.nouvel_ecran("02-notation")
        self.calc([("uₙ :", TERME, "u indice n"), ("le nombre d'élèves après", WHITE, "le nombre"),
                   ("n années", RANG, "après n années")], 2.95, centre=0, fs=40, larg=12.4)
        self.calc([("La suite commence à", WHITE, "La suite"), ("n = 0 :", RANG, "n égale 0"), ("u₀ = 120", TERME, "120")],
                  2.2, centre=0, fs=40, larg=12.4)
        gu = self.t("u", 170, TERME).move_to(P(-0.6, -0.1))
        gn = self.t("n", 100, RANG).next_to(gu, RIGHT, buff=0.05).align_to(gu, DOWN).shift(DOWN * 0.35)
        self.au_mot("n, c'est le rang")
        self.play(FadeIn(gu, scale=1.2), FadeIn(gn, scale=1.4), run_time=0.4)
        r1 = VGroup(self.t("le rang :", 38, RANG), self.t("le nombre d'années", 32, RANG),
                    self.t("écoulées", 32, RANG)).arrange(DOWN, buff=0.1).move_to(P(4.3, -0.9))
        f1 = self.fleche(gn.get_right() + RIGHT * 0.1, r1.get_left() + LEFT * 0.05, RANG)
        self.play(GrowArrow(f1), FadeIn(r1[0], shift=LEFT * 0.1), Indicate(gn, color=RANG, scale_factor=1.3),
                  run_time=0.4)
        self.au_mot("le nombre d'années")
        self.play(FadeIn(r1[1:], shift=LEFT * 0.1), run_time=0.35)
        self.au_mot("u indice n, c'est la valeur")
        r2 = VGroup(self.t("la valeur :", 38, TERME), self.t("le nombre d'élèves", 32, TERME)).arrange(DOWN, buff=0.1)
        r2.move_to(P(-4.4, -0.9))
        f2 = self.fleche(gu.get_left() + LEFT * 0.1, r2.get_right() + RIGHT * 0.05, TERME)
        self.play(GrowArrow(f2), FadeIn(r2[0], shift=RIGHT * 0.1), Indicate(gu, color=TERME, scale_factor=1.15),
                  run_time=0.4)
        self.au_mot("le nombre d'élèves", n=2)
        self.play(FadeIn(r2[1], shift=RIGHT * 0.1), run_time=0.35)
        self.attendre_voix(marge=0.5)

    # ── 03 : u₄ = 180 se lit… ──────────────────────────────────────────────

    def ecran_egalite(self):
        self.nouvel_ecran("03-egalite")
        eg, (a, c) = self.ligne([("u₄", TERME, None, {"₄": RANG}), ("= 180", TERME)], 96)
        eg.move_to(P(0, 2.45))
        b = a[1]
        self.au_mot("u indice 4")
        self.play(FadeIn(a, scale=1.2), run_time=0.3)
        self.suivre("180")
        self.play(FadeIn(c, scale=1.2), run_time=0.3)
        self.au_mot("après")
        self.suivre("4")
        l1 = self.t("après 4 années,", 38, RANG).move_to(P(-3.75, 0.95))
        l2 = self.t("l'école compte 180 élèves", 38, TERME).move_to(P(2.8, 0.95))
        f1 = self.fleche(b.get_bottom() + DOWN * 0.05, l1.get_top() + UP * 0.05, RANG)
        self.play(GrowArrow(f1), FadeIn(l1, shift=DOWN * 0.1), run_time=0.4)
        self.au_mot("l'école compte")
        self.suivre("180")
        f2 = self.fleche(c.get_bottom() + DOWN * 0.05, l2.get_top() + UP * 0.05, TERME)
        self.play(GrowArrow(f2), FadeIn(l2, shift=DOWN * 0.1), run_time=0.4)
        axe, ticks, nms = self.frise(5, -0.75, x0=-3.6, pas=1.8, noms=[(0, "u₀"), (4, "u₄")])
        v0 = self.t("120", 34, TERME).next_to(nms[0], DOWN, buff=0.1)
        v4 = self.t("180", 34, JUSTE).next_to(nms[1], DOWN, buff=0.1)
        self.au_mot("En effet")
        self.play(Create(axe), Create(ticks), FadeIn(nms), run_time=0.4)
        sa = self.sauts(ticks, 0, 4, "+ 15", fs=30)
        self.calc([("120", TERME, "120"), ("+ 4 ×", RAISON, "4 fois"), ("15", RAISON, "15"), ("=", WHITE, "égale"),
                   ("180", JUSTE, "180")], -2.55, centre=-0.4, fs=48, larg=10,
                  avec_morceau={0: [FadeIn(v0, scale=1.2)],
                                2: [LaggedStart(*[Create(s) for s in sa], lag_ratio=0.3)],
                                4: [FadeIn(v4, scale=1.3)]})
        self.attendre_voix(marge=0.5)

    # ── 04 : question-pause n° 1 : u₆ = 210 → C ────────────────────────────

    def ecran_question1(self):
        fs = 36
        corps = [self.morceaux(p, fs) for p in (
            [("après 210 années,", WHITE, "210"), ("il y a 6 élèves", WHITE, "6")],
            [("après 7 années,", WHITE, "7"), ("il y a 210 élèves", WHITE, "210")],
            [("après 6 années,", WHITE, "6"), ("il y a 210 élèves", WHITE, "210")])]
        larg = 11.4
        place = larg - self.place_coche - 0.5 * fs / 32 - 0.45
        f = min(1.0, place / max(c.width for c in corps))
        for c in corps:
            c.scale(f)
        cartes = VGroup(*[self.bouton(L, c, larg, fs) for L, c in zip("ABC", corps)])
        cartes.arrange(DOWN, buff=0.16).move_to(P(-0.3, 0)).align_to(P(0, 1.65), UP)

        def e1():
            self.calc([("Que veut dire", WHITE, "Que veut"), ("u₆ =", TERME, "u indice 6"), ("210 ?", TERME, "210")],
                      2.3, centre=-0.3, fs=46, larg=11)

        q = self.question_libre("04-question", [e1], cartes, P(-0.3, cartes.get_bottom()[1] - 0.45))
        self.dire("04b-reponse")
        self.au_mot("Réponse C")
        self.q_reponse(q, 2)
        self.calc([("L'indice 6", RANG, "L'indice 6"), ("compte les années ;", RANG, "compte")], -1.75, centre=-0.3,
                  fs=40, larg=11)
        c2 = self.calc([("210 :", TERME, "210"), ("la valeur, le nombre d'élèves", TERME, "la valeur")], -2.45,
                       centre=-0.3, fs=40, larg=11)
        self.attendre_voix(marge=0.6)

    # ── 05 : d'une année à la suivante : + 15, ou × 1,1 ────────────────────

    def ecran_recurrence(self):
        self.nouvel_ecran("05-recurrence")
        self.titre("D'une année à la suivante", JAUNE_TITRE, 44, extrait="Pour passer", y=3.2)
        l1 = LigneTermes(["uₙ", "uₙ₊₁"], centre=P(-3.6, 1.25), pas=2.8, largeur=1.5, hauteur=0.9, fs=40)
        self.play(*[FadeIn(c) for c in l1.cases], run_time=0.35)
        self.au_mot("on ajoute")
        self.suivre("15")
        s1 = self.sauter(l1, 0, "+ 15", cote=UP)
        self.calc([("uₙ₊₁ =", TERME, "u indice n plus 1 égale"), ("uₙ", TERME, None), ("+ 15", RAISON, "plus 15")], 1.25,
                  centre=2.75, fs=50, larg=6.6)
        sep = DashedLine(P(-6.2, 0.0), P(6.2, 0.0), color=GREY_D, stroke_width=2, dash_length=0.12)
        self.au_mot("Et si")
        self.play(Create(sep), run_time=0.3)
        h = self.calc([("Et si l'école gagnait", WHITE, None), ("+ 10 %", RAISON, "10 %"), ("chaque année…", WHITE,
                                                                                         "chaque année")],
                      -0.6, centre=0, fs=38, larg=12)
        l2 = LigneTermes(["uₙ", "uₙ₊₁"], centre=P(-3.6, -2.4), pas=2.8, largeur=1.5, hauteur=0.9, fs=40)
        self.au_mot("on multiplierait")
        self.play(*[FadeIn(c) for c in l2.cases], run_time=0.35)
        self.suivre("1,1")
        s2 = self.sauter(l2, 0, "× 1,1", cote=UP)
        self.calc([("uₙ₊₁ =", TERME, "u indice n plus 1 égale"), ("1,1", RAISON, "1,1 fois"), ("× uₙ", TERME, None)],
                  -2.4, centre=2.5, fs=50, larg=6.0)
        self.attendre_voix(marge=0.6)

    # ── 06 : quelle année pour u₇ ? ────────────────────────────────────────

    def ecran_annee(self):
        self.nouvel_ecran("06-annee")
        self.titre("Quelle année correspond à u₇ ?", JAUNE_TITRE, 44, extrait="Quelle année", y=3.2)
        axe, ticks, _ = self.frise(8, 0.6)
        nms = VGroup(*[self.t(u(k), 32, TERME).next_to(ticks[k], DOWN, buff=0.12) for k in range(8)])
        self.play(Create(axe), Create(ticks), FadeIn(nms), run_time=0.45)
        self.au_mot("u indice 0, c'est")
        self.suivre("2026")
        a0 = self.t("2026", 34, WHITE).next_to(ticks[0], UP, buff=0.6)
        self.play(FadeIn(a0, scale=1.2), Indicate(nms[0], color=TERME, scale_factor=1.3), run_time=0.35)
        self.au_mot("7 années plus tard")
        sa = self.sauts(ticks, 0, 7)
        self.play(LaggedStart(*[Create(x) for x in sa], lag_ratio=0.5), run_time=1.0)
        l = self.calc([("+ 7 années", RAISON, None)], -0.6, centre=0, fs=42)
        self.suivre("2033")
        a7 = self.t("2033", 34, JUSTE).next_to(ticks[7], UP, buff=0.6)
        c = self.calc([("u₇", TERME, None), ("↔", WHITE, None), ("2026 + 7 = 2033", JUSTE, None)], -1.6, centre=0,
                      fs=48, avec=[FadeIn(a7, scale=1.3), Indicate(nms[7], color=JUSTE, scale_factor=1.3)])
        self.play(Create(self.encadre(c, JUSTE, 0.15)), run_time=0.3)
        self.attendre_voix(marge=0.6)

    # ── 07 : le piège : la suite commence à u₁ ─────────────────────────────

    def ecran_piege(self):
        self.nouvel_ecran("07-piege")
        self.titre("Le piège !", PIEGE, 48, extrait="piège", y=3.2)
        y1, y2 = 1.75, -0.05
        axe, ticks, _ = self.frise(8, y1)
        haut = VGroup(*[self.t(u(k), 30, TERME).next_to(ticks[k], DOWN, buff=0.1) for k in range(8)])
        ans = VGroup(self.t("2026", 30, WHITE).next_to(ticks[0], UP, buff=0.15),
                     self.t("2033", 30, WHITE).next_to(ticks[7], UP, buff=0.15))
        self.play(Create(axe), Create(ticks), FadeIn(haut), run_time=0.4)
        bas = VGroup(*[self.t(u(k + 1), 30, PIEGE).move_to(haut[k]).shift(P(0, y2 - y1)) for k in range(8)])
        self.au_mot("u indice 1 correspond")
        self.suivre("2026")
        self.play(FadeIn(ans[0], scale=1.2), run_time=0.3)
        self.au_mot("tout se décale")
        self.play(*[TransformFromCopy(haut[k], bas[k]) for k in range(8)], run_time=0.8)
        self.suivre("2033")
        self.play(FadeIn(ans[1], scale=1.2), run_time=0.3)
        self.au_mot("devient u indice 8")
        cad = self.encadre(VGroup(ans[1], haut[7], bas[7]), PIEGE, 0.12)
        self.play(Create(cad), Indicate(bas[7], color=PIEGE, scale_factor=1.4), run_time=0.4)
        self.au_mot("la formule devient")
        self.calc([("uₙ =", PIEGE, "u indice n égale"), ("120", WHITE, "120"), ("+ 15", RAISON, "plus 15"),
                   ("× (n − 1)", PIEGE, "n moins 1")], -1.3, centre=0, fs=52, larg=11)
        self.au_mot("Regarde toujours")
        r = self.t("Regarde toujours où commence la suite !", 38, JAUNE_TITRE).move_to(P(-0.9, -2.5))
        self.play(FadeIn(r, shift=UP * 0.1), run_time=0.4)
        self.attendre_voix(marge=0.6)

    # ── 08 : question-pause n° 2 : − 5 % → A (× 0,95) ──────────────────────

    def ecran_question2(self):
        xb = -2.4
        fs = 42
        corps = [self.t(c, fs, WHITE, 1e9) for c in ("uₙ₊₁ = 0,95 × uₙ", "uₙ₊₁ = uₙ − 5", "uₙ₊₁ = 0,05 × uₙ")]
        larg = 7.4
        place = larg - self.place_coche - 0.5 * fs / 32 - 0.45
        f = min(1.0, place / max(c.width for c in corps))
        for c in corps:
            c.scale(f)
        cartes = VGroup(*[self.bouton(L, c, larg, fs) for L, c in zip("ABC", corps)])
        cartes.arrange(DOWN, buff=0.16).move_to(P(xb, 0)).align_to(P(0, 0.7), UP)

        def e1():
            self.calc([("Un orchestre perd", WHITE, "Un orchestre"), ("5 %", RAISON, "5 %"),
                       ("de ses abonnés chaque année.", WHITE, "de ses abonnés")], 2.35, centre=-0.3, fs=38, larg=12)
            self.calc([("uₙ :", TERME, "u indice n"), ("le nombre d'abonnés après", WHITE, "le nombre"),
                       ("n années.", RANG, "après n années")], 1.75, centre=-0.3, fs=38, larg=12)
            self.calc([("Quelle relation convient ?", RAISON, "Quelle relation")], 1.15, centre=-0.3, fs=40, larg=12)

        q = self.question_libre("08-question", [e1], cartes, P(xb, cartes.get_bottom()[1] - 0.42))
        self.dire("08b-reponse")
        self.au_mot("Réponse A")
        self.q_reponse(q, 0)
        x = 4.3
        self.calc([("− 5 %", RAISON, "Diminuer de 5 %")], 0.4, centre=x, fs=46, larg=4.4)
        self.calc([("× (1 − 0,05)", RAISON, "multiplier par 1 moins")], -0.4, centre=x, fs=44, larg=4.4)
        c = self.calc([("= × 0,95", JUSTE, "0,95")], -1.2, centre=x, fs=50, larg=4.4)
        self.play(Create(self.encadre(c, JUSTE, 0.14)), Indicate(cartes[0], color=JUSTE, scale_factor=1.03),
                  run_time=0.35)
        self.attendre_voix(marge=0.6)

    # ── 09 : le défi de la lettre d'information ────────────────────────────

    def ecran_defi(self):
        self.nouvel_ecran("09-defi")
        tit = self.titre("À toi de jouer !", JAUNE_TITRE, 46, extrait="À toi", y=3.2)
        lt = lettre_info(1.0).move_to(P(4.35, 1.75))
        ab = eleves(20, 2.9, -0.15, par_rang=10, pas=0.3, r=0.09)
        xc, L = -2.2, 8.2
        self.au_mot("La lettre")
        self.calc([("La lettre d'information de l'école", WHITE, None)], 2.3, centre=xc, fs=36, larg=L,
                  avec=[FadeIn(lt, shift=UP * 0.15)])
        self.calc([("compte", WHITE, "compte"), ("200 abonnés :", TERME, "200"), ("u₀ = 200", TERME, "u indice 0")],
                  1.7, centre=xc, fs=36, larg=L, avec_morceau={1: [LaggedStart(*[GrowFromCenter(d) for d in ab],
                                                                               lag_ratio=0.05)]})
        partent = ab[18:]
        self.calc([("Chaque mois,", WHITE, "Chaque mois"), ("10 %", RAISON, "10 %"), ("se désinscrivent,", WHITE,
                                                                                    "se désinscrivent")],
                  1.0, centre=xc, fs=36, larg=L, avec_morceau={2: [partent.animate.set_color(PIEGE)]})
        self.play(FadeOut(partent, shift=RIGHT * 0.5), run_time=0.3)
        nv = VGroup(*[Dot(P(2.9 + 0.3 * k, 0.45), radius=0.09, color=RAISON) for k in range(3)])
        self.calc([("puis", WHITE, "puis"), ("30", RAISON, "30"), ("nouveaux s'inscrivent.", WHITE, "nouveaux")],
                  0.4, centre=xc, fs=36, larg=L, avec_morceau={1: [LaggedStart(*[FadeIn(d, shift=DOWN * 0.3)
                                                                               for d in nv], lag_ratio=0.3)]})
        self.calc([("Écris", JAUNE_TITRE, "Écris"), ("uₙ₊₁", TERME, "u indice n plus 1"),
                   ("en fonction de", JAUNE_TITRE, "en fonction"), ("uₙ,", TERME, None)], -0.55, centre=xc, fs=36,
                  larg=L)
        self.calc([("puis calcule", JAUNE_TITRE, "puis calcule"), ("u₁.", TERME, "u indice 1")], -1.2, centre=xc,
                  fs=36, larg=L)
        self.defi_pause(-2.2, x=-1.5)
        self._defi = (tit, [m for m in self.mobjects if m is not tit and m is not self._margo])

    def ecran_correction(self):
        self.dire("09b-correction")
        tit, efface = self._defi
        self.au_mot("Correction")
        cor = self.t("Correction", 46, JUSTE).move_to(tit)
        self.play(ReplacementTransform(tit, cor), *[FadeOut(m) for m in efface], run_time=0.45)
        self.remove(*efface)
        lg = LigneTermes(["uₙ", "", "uₙ₊₁"], centre=P(-2.2, 1.3), pas=2.6, largeur=1.4, hauteur=0.85, fs=40)
        self.play(FadeIn(lg.cases[0]), run_time=0.25)
        self.au_mot("multiplier par")
        self.suivre("0,9")
        self.play(FadeIn(lg.cases[1]), run_time=0.2)
        self.sauter(lg, 0, "× 0,9", cote=UP)
        self.au_mot("on ajoute")
        self.suivre("30")
        self.play(FadeIn(lg.cases[2]), run_time=0.2)
        self.sauter(lg, 1, "+ 30", cote=UP)
        self.calc([("uₙ₊₁ =", TERME, "u indice n plus 1 égale"), ("0,9", RAISON, "0,9 fois"), ("× uₙ", TERME, None),
                   ("+ 30", RAISON, "plus 30")], 0.25, centre=-0.3, fs=52, larg=11)
        self.au_mot("d'abord")
        o1 = self.calc([("d'abord", WHITE, None), ("le pourcentage", RAISON, "le pourcentage")], -0.55, centre=-3.2,
                       fs=36, larg=6.2)
        self.play(Indicate(lg.sauts[0], color=RAISON, scale_factor=1.2), run_time=0.3)
        o2 = self.calc([("ensuite", WHITE, "ensuite"), ("l'ajout", RAISON, "l'ajout")], -0.55, centre=2.9, fs=36,
                       larg=6.2, avec=[Indicate(lg.sauts[1], color=RAISON, scale_factor=1.2)])
        self.calc([("u₁ =", TERME, "u indice 1 égale"), ("0,9 × 200 + 30", WHITE, "200")], -1.35, centre=-0.3, fs=46,
                  larg=11)
        c = self.calc([("=", WHITE, "égale"), ("180 + 30", WHITE, "180"), ("=", WHITE, "égale"), ("210", JUSTE, "210")],
                      -2.25, centre=-0.3, fs=46, larg=11)
        self.play(Create(self.encadre(c[-1], JUSTE, 0.12)), run_time=0.3)
        self.attendre_voix(marge=0.6)

    # ── 10 : ce que tu as appris ───────────────────────────────────────────

    def ecran_appris(self):
        fs = 38
        tc = lambda s, d: Text(s, font_size=fs, color=WHITE, t2c=d)  # noqa: E731
        p1 = [tc("Dans uₙ, n est le rang et uₙ la valeur.", {"n est le rang": RANG, "uₙ la valeur": TERME})]
        p2 = [tc("Ajouter toujours le même nombre r : uₙ₊₁ = uₙ + r.", {"uₙ₊₁ = uₙ + r": RAISON})]
        p3 = [tc("Un pourcentage fixe : on multiplie par le coefficient.", {"on multiplie": RAISON})]
        a4, (b4, b4b, c4) = self.ligne([("Regarde toujours si la suite commence", WHITE), ("à 0", RANG),
                                        ("ou à 1.", WHITE, None, {"1": RANG})], fs)
        a4.morceaux = [(b4, "regarde toujours"), (b4b, "à 0"), (c4, "à 1")]
        self.finale([([p1[0]], ["Dans u indice n"]), (p2, ["Ajouter"]), (p3, ["Un pourcentage"]),
                     ([a4], [None])], cle="10-finale")

    def finale(self, points, cle="10-finale", fs=38):
        """Comme le module commun ; une ligne qui a .morceaux = [(partie, extrait), …]
        se montre partie par partie, chacune quand la voix la dit."""
        self.nouvel_ecran(cle, margo=0.65)
        self.au_mot("Ce que tu as appris")
        tit = self.t("Ce que tu as appris", 46, JAUNE_TITRE).to_edge(UP, buff=0.45)
        self.play(Write(tit), run_time=0.7)
        blocs = []
        for lignes, _ in points:
            b = VGroup(*lignes).arrange(DOWN, aligned_edge=LEFT, buff=0.12)
            blocs.append(VGroup(self.coche(), b).arrange(RIGHT, buff=0.3, aligned_edge=UP))
        tout = VGroup(*blocs).arrange(DOWN, aligned_edge=LEFT, buff=0.45)
        if tout.width > 11.4:
            tout.scale_to_fit_width(11.4)
        tout.move_to(P(-0.4, -0.35))
        for bloc, (lignes, extraits) in zip(blocs, points):
            for k, (l, ex) in enumerate(zip(lignes, extraits)):
                parts = getattr(l, "morceaux", None) or [(l, ex)]
                for k2, (m, e) in enumerate(parts):
                    if e:
                        self.au_mot(e)
                    anims = [FadeIn(m, shift=RIGHT * 0.2)]
                    if k == 0 and k2 == 0:
                        anims.append(Create(bloc[0]))
                    self.play(*anims, run_time=0.45)
        self.attendre_voix(marge=0.8)
        return tout

    def construct(self):
        self.ecran_garde()
        self.ecran_situation()
        self.ecran_notation()
        self.ecran_egalite()
        self.ecran_question1()
        self.ecran_recurrence()
        self.ecran_annee()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_appris()
        self.fin("11-abonne")
