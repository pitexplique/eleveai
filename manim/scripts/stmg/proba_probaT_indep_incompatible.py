# proba_probaT_indep_incompatible.py
# EleveAI — Maths STMG ET Maths 1re (tronc commun) — série « Probabilités » :
# INDÉPENDANTS OU INCOMPATIBLES, deux mots qu'on confond (micros :
# probaT_indep_incompatible en STMG, alea_indep_incompatible en 1re), AVEC VOIX.
# Paysage 16:9, CEINTURE BLEUE. Short jumeau : proba_probaT_indep_incompatible_short.py
# (ceinture jaune, une pièce : pile et face).
#
# ⭐⭐ UNE voix, UN script, DEUX rendus (Frédéric, 18/10 : « pour vendre en
# pack ») : ProbaIndepIncompatibleBase porte toutes les scènes ; les deux
# sous-classes ne changent que l'identité. La voix ne cite aucune classe.
#
# ⭐ La figure est la ROUE du coach (canvas `probabilites`, variante « roue » de
# ProbabilitesCanvas.tsx : carte blanche, parts cerclées d'encre, départ en
# haut dans le sens horaire, étiquettes blanches liserées, moyeu et pointe
# noirs). Les banques des deux micros n'ont pas de canvas : on reprend la roue,
# avec 10 cases égales numérotées de 1 à 10.
#   · A « pair » : les cases se REMPLISSENT en bleu ; C « 1 ou 3 » en orange ;
#   · B « 4 ou moins » : une COURONNE verte autour des cases 1 à 4, pour que
#     les cases 2 et 4 (bleues ET cerclées de vert) se voient communes ;
#   · D « 10 » (défi) : une couronne violette autour de la case 10.
# ⛔ PAS D'ÉCART : chaque nombre n'apparaît que quand la voix le dit.
#
# Écrans : 00 garde · 01 la roue · 02 incompatibles : A et C, A ∩ C vide, 0 ·
# 03 indépendants : A et B, 2 et 4, 0,5 × 0,4 = 0,2 · 04 A et C : 0,1 contre 0,
# « ≠ » · 05 pourquoi : la roue tombe sur un pair, 1 et 3 s'éteignent ·
# 06 le piège, les deux colonnes · 07 défi (D : « 10 ») · 07b correction ·
# 08 ce que tu as appris · 09 fin : « Entraîne-toi sur eleveai.fr » (règle du 19/10).
#
# Voix : manim/voix/stmg-premiere-proba-indep-incompatible.json (Julie, débit −7).
# Rendus (media à soi : des rendus parallèles dans le même media → WinError 32) :
# python -m manim render -qh --disable_caching manim/scripts/stmg/proba_probaT_indep_incompatible.py ProbaIndepIncompatibleSTMG -o eleveai-maths-stmg-proba-indep-incompatible --media_dir manim/scripts/stmg/media-probaT_indep_incompatible
# python -m manim render -qh --disable_caching manim/scripts/stmg/proba_probaT_indep_incompatible.py ProbaIndepIncompatiblePremiere -o eleveai-maths-premiere-commun-proba-indep-incompatible --media_dir manim/scripts/stmg/media-probaT_indep_incompatible
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/proba_probaT_indep_incompatible_short.py ShortProbaIndepIncompatibleSTMG -o eleveai-maths-stmg-proba-indep-incompatible-short --media_dir manim/scripts/stmg/media-probaT_indep_incompatible
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/proba_probaT_indep_incompatible_short.py ShortProbaIndepIncompatiblePremiere -o eleveai-maths-premiere-commun-proba-indep-incompatible-short --media_dir manim/scripts/stmg/media-probaT_indep_incompatible
# Puis copier dans manim/sorties/stmg/maths/probabilites/16-indep-incompatible/ et
# manim/sorties/premiere-commun/maths/probabilites/16-indep-incompatible/.

import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "seconde"))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "premiere"))

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Notion6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402
from proba_pc_conditionnelle import ENCRE, PROBA, suite  # noqa: E402

# Les couleurs de la roue (palette du coach : resolveColor)
NEUTRE = "#94A3B8"      # une case encore sans événement
COUL_A = "#3B82F6"      # A : « pair »
COUL_C = "#F97316"      # C : « 1 ou 3 »
COUL_B = "#22C55E"      # B : « 4 ou moins »
COUL_D = "#A855F7"      # D : « 10 »
ETEINTE = "#334155"     # une case exclue (« on SAIT »)
CARTE_BORD = "#E2E8F0"
COMMUN = "#FDE047"      # le clignotement des cases communes


def P(x, y):
    return np.array([x, y, 0.0])


CENTRE = P(-4.1, -0.25)
CRAN = TAU / 10


def etiquette_blanche(texte, fs):
    t = Text(texte, font_size=fs, color=WHITE, weight=BOLD)
    t.set_stroke(ENCRE, width=4, background=True)
    return t


class Roue(VGroup):
    """La roue du coach, 10 cases égales : case n (1 à 10) part du haut, sens horaire.
    self.cases[n - 1] = la part n ; self.disque = parts + numéros (ce qui tourne)."""

    def __init__(self, centre=CENTRE, r=1.55, fs=30, carte=True, **kw):
        super().__init__(**kw)
        self.c, self.r = centre, r
        self.cases, self.nums = VGroup(), VGroup()
        for i in range(10):
            a0 = PI / 2 - i * CRAN
            s = AnnularSector(inner_radius=0, outer_radius=r, angle=-CRAN, start_angle=a0, fill_color=NEUTRE,
                              fill_opacity=1, stroke_color=ENCRE, stroke_width=3)
            s.shift(centre)
            m = a0 - CRAN / 2
            n = etiquette_blanche(str(i + 1), fs).move_to(centre + P(0.68 * r * np.cos(m), 0.68 * r * np.sin(m)))
            n.set_z_index(2)   # au-dessus des cases, même quand une case s'anime
            self.cases.add(s)
            self.nums.add(n)
        self.disque = VGroup(self.cases, self.nums)
        self.moyeu = Dot(centre, radius=0.08, color=ENCRE)
        self.pointe = Polygon(P(0, 0), P(-0.17, 0.3), P(0.17, 0.3), fill_color=ENCRE, fill_opacity=1,
                              stroke_color=WHITE, stroke_width=1.5).move_to(centre + UP * (r + 0.33), aligned_edge=DOWN)
        self.carte = RoundedRectangle(width=2 * r + 0.95, height=2 * r + 1.25, corner_radius=0.2, fill_color=WHITE,
                                      fill_opacity=1, stroke_color=CARTE_BORD, stroke_width=2)
        self.carte.move_to(centre + UP * 0.14)
        if carte:
            self.add(self.carte)
        self.add(self.disque, self.moyeu, self.pointe)

    def case(self, n):
        return self.cases[n - 1]

    def colorer(self, numeros, couleur):
        return [self.case(n).animate.set_fill(couleur, opacity=1) for n in numeros]

    def peint(self, numeros, couleur):
        """Même chose, sans animation (un écran qui repart d'une roue déjà coloriée)."""
        for n in numeros:
            self.case(n).set_fill(couleur, opacity=1)
        return self

    def couronne(self, numeros, couleur, e=0.24):
        """Une couronne autour des cases `numeros` (pas encore ajoutée à la scène)."""
        g = VGroup()
        for n in numeros:
            a0 = PI / 2 - (n - 1) * CRAN
            g.add(AnnularSector(inner_radius=self.r + 0.06, outer_radius=self.r + 0.06 + e, angle=-CRAN,
                                start_angle=a0, fill_color=couleur, fill_opacity=1, stroke_color=ENCRE,
                                stroke_width=1.5).shift(self.c))
        return g

    def clignote(self, scene, numeros, fois=2, couleur=COMMUN):
        """Les cases `numeros` clignotent (liseré jaune épais), puis gardent le liseré."""
        bords = VGroup(*[self.case(n).copy().set_fill(opacity=0).set_stroke(couleur, 9) for n in numeros])
        bords.set_z_index(3)
        for _ in range(fois):
            scene.play(FadeIn(bords), run_time=0.22)
            scene.play(FadeOut(bords), run_time=0.22)
        scene.play(FadeIn(bords), run_time=0.22)
        return bords

    def lancer(self, scene, arrivee, tours=2, run_time=2.0):
        """La roue tourne (sens horaire) et s'arrête la case `arrivee` sous la pointe."""
        milieu = (arrivee - 0.5) * CRAN          # de combien la case est à droite du haut
        angle = -(tours * TAU + (TAU - milieu))
        depart = self.disque.copy()

        def tourne(m, a):
            # les numéros restent DROITS : ils tournent avec la roue, puis sur eux-mêmes en sens inverse
            m.become(depart)
            m.rotate(angle * a, about_point=self.c)
            for n in m[1]:
                n.rotate(-angle * a)

        scene.play(UpdateFromAlphaFunc(self.disque, tourne), run_time=run_time,
                   rate_func=rate_functions.ease_out_cubic)


X0 = -1.25   # le bord gauche de la colonne de droite (la roue occupe la gauche)


class ProbaIndepIncompatibleBase(Notion6e):
    """Toutes les scènes ; les sous-classes ne changent que l'identité."""

    nom_voix = "stmg-premiere-proba-indep-incompatible"
    identite = "Maths — EleveAI"
    ceinture = "bleue"

    def t(self, texte, font_size=36, color=WHITE, weight=NORMAL):
        return Text(texte, font_size=font_size, color=color, weight=weight)

    def insister(self, mob, run_time=0.4, bord=None):
        """Agrandir puis rétrécir ; bord=LEFT pour une ligne calée à gauche (elle ne mord pas la roue)."""
        self.play(mob.animate.scale(1.5, about_edge=bord), run_time=run_time)
        self.play(mob.animate.scale(1 / 1.5, about_edge=bord), run_time=run_time)

    def calcul(self, morceaux, fs=44, buff=0.18):
        """Une ligne de calcul ; morceaux = [(texte, couleur), …]."""
        return suite(*[self.t(x, fs, c) for x, c in morceaux], buff=buff)

    def evt(self, lt, phrase, couleur, fs=32):
        """« A : « pair » » : la lettre en gras, à la couleur de ses cases."""
        return suite(self.t(lt, fs + 6, couleur, BOLD), self.t(":", fs), self.t(phrase, fs), buff=0.14)

    def gauche(self, mob, y):
        return mob.move_to(P(X0, y), aligned_edge=LEFT)

    def roue(self, pairs=False, c=False):
        r = Roue()
        if pairs:
            r.peint([2, 4, 6, 8, 10], COUL_A)
        if c:
            r.peint([1, 3], COUL_C)
        return r

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("Indépendants ou incompatibles ?", 48, JAUNE_TITRE)
        if titre.width > 12.6:
            titre.scale_to_fit_width(12.6)
        titre.to_edge(UP, buff=0.6)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.22)
        ech = echelle_ceintures(self.ceinture).move_to(P(-0.6, -2.75))
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech), run_time=1.0)
        g1 = self.t("Indépendants", 52, COUL_B, BOLD).move_to(P(-3.3, 0.3))
        g2 = self.t("Incompatibles", 52, COUL_C, BOLD).move_to(P(3.0, 0.3))
        self.play(FadeIn(g1, shift=RIGHT * 0.4), run_time=0.6)
        self.au_mot("incompatibles")
        self.play(FadeIn(g2, shift=LEFT * 0.4), run_time=0.6)
        self.au_mot("deux mots qu'on confond")
        p1, p2 = g1.get_center(), g2.get_center()
        self.play(g1.animate.move_to(p2), g2.animate.move_to(p1), path_arc=PI / 2, run_time=0.9)
        q = self.t("?", 90, ORANGE_RETENUE, BOLD).move_to(P(-0.15, 0.3))
        self.play(FadeIn(q, scale=2.5), run_time=0.4)
        self.play(g1.animate.move_to(p1), g2.animate.move_to(p2), path_arc=PI / 2, run_time=0.9)
        self.attendre_voix(marge=1.0)

    # ── 01 : la roue ────────────────────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.titre_ecran("La roue")
        r = Roue()
        self.play(FadeIn(r.carte), FadeIn(r.moyeu), FadeIn(r.pointe), run_time=0.5)
        self.au_mot("10 cases")
        dix = self.gauche(self.t("10 cases", 56, JAUNE_TITRE), 1.55)
        self.play(LaggedStart(*[FadeIn(s, scale=0.6) for s in r.cases], lag_ratio=0.12),
                  FadeIn(dix, scale=1.5), run_time=1.0)
        self.au_mot("numérotées")
        num = self.gauche(self.t("numérotées de 1 à 10", 36), 0.6)
        self.play(FadeIn(num, shift=UP * 0.1), run_time=0.4)
        self.play(LaggedStart(*[FadeIn(n, scale=1.6) for n in r.nums], lag_ratio=0.18), run_time=1.6)
        self.au_mot("toutes de même taille")
        taille = self.gauche(self.t("toutes de même taille", 36), -0.25)
        self.play(FadeIn(taille, shift=UP * 0.1), run_time=0.4)
        self.play(*[Indicate(r.case(n), color=COMMUN, scale_factor=1.06) for n in (1, 6)], run_time=0.8)
        self.au_mot("On la fait tourner")
        tour = self.gauche(self.t("On la fait tourner une fois", 36, BLEU_CALCUL), -1.1)
        self.play(FadeIn(tour, shift=UP * 0.1), run_time=0.4)
        self.play(Rotate(r.disque, -2 * TAU, about_point=r.c), run_time=2.0,
                  rate_func=rate_functions.ease_in_out_sine)
        self.attendre_voix()

    # ── 02 : incompatibles ──────────────────────────────────────────────────

    def ecran_incompatibles(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-incompatibles")
        self.titre_ecran("Incompatibles")
        r = self.roue()
        self.add(r)
        self.au_mot("ils ne peuvent pas")
        defi = self.gauche(self.t("ne peuvent pas arriver ensemble", 32, COUL_C), 2.05)
        self.play(FadeIn(defi, shift=UP * 0.1), run_time=0.5)
        self.au_mot("le numéro est pair")
        ea = self.gauche(self.evt("A", "« le numéro est pair »", COUL_A), 1.1)
        self.play(FadeIn(ea, shift=UP * 0.1), LaggedStart(*r.colorer([2, 4, 6, 8, 10], COUL_A), lag_ratio=0.2),
                  run_time=1.0)
        self.au_mot("le numéro est 1 ou 3")
        ec = self.gauche(self.evt("C", "« le numéro est 1 ou 3 »", COUL_C), 0.25)
        self.play(FadeIn(ec, shift=UP * 0.1), LaggedStart(*r.colorer([1, 3], COUL_C), lag_ratio=0.3), run_time=0.9)
        self.au_mot("Aucun numéro")
        self.play(*[Indicate(r.case(n), color=COUL_A, scale_factor=1.08) for n in (2, 4, 6, 8, 10)], run_time=0.7)
        self.play(*[Indicate(r.case(n), color=COUL_C, scale_factor=1.08) for n in (1, 3)], run_time=0.7)
        self.au_mot("A inter C est vide")
        vide = self.gauche(self.t("A ∩ C est vide", 42), -0.75)
        self.play(FadeIn(vide, shift=UP * 0.1), run_time=0.5)
        self.au_mot("P de A inter C")
        pz = self.gauche(self.calcul([("P(A ∩ C)", WHITE), ("=", WHITE), ("0", JAUNE_TITRE)], 52), -1.75)
        self.play(FadeIn(pz[:2], shift=UP * 0.1), run_time=0.5)
        self.au_mot("égale 0")
        cadre = SurroundingRectangle(pz, color=JAUNE_TITRE, buff=0.2, stroke_width=4, corner_radius=0.1)
        self.play(FadeIn(pz[2], scale=1.8), run_time=0.4)
        self.play(Create(cadre), run_time=0.4)
        self.insister(pz[2], 0.25)
        self.attendre_voix()

    # ── 03 : indépendants ───────────────────────────────────────────────────

    def ecran_independants(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-independants")
        self.titre_ecran("Indépendants")
        r = self.roue()
        self.add(r)
        self.au_mot("savoir l'un")
        d1 = self.gauche(self.t("savoir l'un ne change pas", 30, COUL_B), 2.2)
        d2 = self.gauche(self.t("la probabilité de l'autre", 30, COUL_B), 1.72)
        self.play(FadeIn(d1, shift=UP * 0.1), run_time=0.4)
        self.play(FadeIn(d2, shift=UP * 0.1), run_time=0.4)
        xn = 3.55   # la colonne des probabilités
        self.au_mot("A : « pair »")
        ea = self.gauche(self.evt("A", "« pair »", COUL_A), 0.9)
        self.play(FadeIn(ea, shift=UP * 0.1), LaggedStart(*r.colorer([2, 4, 6, 8, 10], COUL_A), lag_ratio=0.2),
                  run_time=1.0)
        self.au_mot("0,5")
        n05 = self.t("0,5", 40, BLEU_CALCUL, BOLD).move_to(P(xn, 0.9), aligned_edge=LEFT)
        self.play(FadeIn(n05, scale=1.6), run_time=0.4)
        self.au_mot("B : « 4 ou moins »")
        eb = self.gauche(self.evt("B", "« 4 ou moins »", COUL_B), 0.1)
        cb = r.couronne([1, 2, 3, 4], COUL_B)
        self.play(FadeIn(eb, shift=UP * 0.1), LaggedStart(*[FadeIn(s, scale=1.1) for s in cb], lag_ratio=0.25),
                  run_time=1.0)
        self.au_mot("0,4")
        n04 = self.t("0,4", 40, BLEU_CALCUL, BOLD).move_to(P(xn, 0.1), aligned_edge=LEFT)
        self.play(FadeIn(n04, scale=1.6), run_time=0.4)
        self.au_mot("A inter B")
        eab = self.gauche(self.t("A ∩ B :", 36), -0.7)
        self.play(FadeIn(eab, shift=UP * 0.1), run_time=0.4)
        self.au_mot("les numéros 2 et 4")
        deux = self.t("2 et 4", 36, COMMUN).next_to(eab, RIGHT, buff=0.2)
        self.play(FadeIn(deux, shift=UP * 0.1), run_time=0.3)
        bords = r.clignote(self, [2, 4])
        self.au_mot("soit 0,2")
        n02 = self.t("0,2", 40, BLEU_CALCUL, BOLD).move_to(P(xn, -0.7), aligned_edge=LEFT)
        self.play(FadeIn(n02, scale=1.6), run_time=0.4)
        self.au_mot("Et 0,5 fois")
        l = self.gauche(self.calcul([("0,5", BLEU_CALCUL), ("×", WHITE), ("0,4", BLEU_CALCUL), ("=", WHITE),
                                     ("0,2", JAUNE_TITRE)], 46), -1.6)
        self.play(TransformFromCopy(n05, l[0]), FadeIn(l[1]), run_time=0.6)
        self.au_mot("0,4, égale")
        self.play(TransformFromCopy(n04, l[2]), run_time=0.5)
        self.au_mot("égale 0,2")
        self.play(FadeIn(l[3]), FadeIn(l[4], scale=1.6), run_time=0.5)
        self.play(Indicate(n02, color=JAUNE_TITRE, scale_factor=1.4), Indicate(l[4], scale_factor=1.4), run_time=0.7)
        self.au_mot("A et B sont indépendants")
        fin = suite(self.coche(taille=0.24), self.t("A et B sont indépendants", 30, VERT_OK), buff=0.22)
        self.gauche(fin, -2.35)
        self.play(FadeIn(fin[1], shift=UP * 0.1), Create(fin[0]), run_time=0.6)
        self.attendre_voix()

    # ── 04 : A et C : incompatibles, donc pas indépendants ──────────────────

    def ecran_ensemble(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-ensemble")
        self.titre_ecran("Et A et C ?")
        r = self.roue(pairs=True, c=True)
        self.add(r)
        self.au_mot("Ils sont incompatibles")
        inc = self.gauche(suite(self.t("A et C :", 36), self.t("incompatibles", 36, COUL_C), buff=0.2), 2.1)
        self.play(FadeIn(inc, shift=UP * 0.1), run_time=0.5)
        self.au_mot("Sont-ils aussi")
        q = self.gauche(self.t("Aussi indépendants ?", 36, COUL_B), 1.3)
        self.play(FadeIn(q, shift=UP * 0.1), run_time=0.5)
        self.au_mot("P de A fois P de C")
        prod = self.gauche(self.t("P(A) × P(C)", 42), 0.4)
        self.play(FadeIn(prod, shift=UP * 0.1), run_time=0.5)
        l = self.gauche(self.calcul([("=", WHITE), ("0,5", BLEU_CALCUL), ("×", WHITE), ("0,2", BLEU_CALCUL),
                                     ("=", WHITE), ("0,1", JAUNE_TITRE)], 42), -0.4)
        self.au_mot("0,5 fois")
        self.play(FadeIn(l[0]), FadeIn(l[1], scale=1.5), FadeIn(l[2]),
                  *[Indicate(r.case(n), color=COUL_A, scale_factor=1.06) for n in (2, 4, 6, 8, 10)], run_time=0.7)
        self.au_mot("0,2, égale")
        self.play(FadeIn(l[3], scale=1.5), *[Indicate(r.case(n), color=COUL_C, scale_factor=1.06) for n in (1, 3)],
                  run_time=0.6)
        self.au_mot("égale 0,1")
        self.play(FadeIn(l[4]), FadeIn(l[5], scale=1.6), run_time=0.5)
        self.au_mot("Mais P de A inter C")
        pz = self.gauche(self.calcul([("P(A ∩ C)", WHITE), ("=", WHITE), ("0", JAUNE_TITRE)], 42), -1.3)
        self.play(FadeIn(pz, shift=UP * 0.1), run_time=0.6)
        self.au_mot("0 n'est pas 0,1")
        neq = self.gauche(self.calcul([("0", JAUNE_TITRE), ("≠", ROUGE_ERREUR), ("0,1", JAUNE_TITRE)], 56, 0.3), -2.3)
        self.play(TransformFromCopy(pz[2], neq[0]), TransformFromCopy(l[5], neq[2]), run_time=0.7)
        self.play(FadeIn(neq[1], scale=2.5), run_time=0.4)
        self.insister(neq[1], 0.3)
        self.au_mot("ils ne sont pas indépendants")
        non = self.gauche(self.t("Pas indépendants !", 40, ROUGE_ERREUR, BOLD), 1.3)
        self.play(ReplacementTransform(q, non), run_time=0.6)
        self.insister(non, 0.3, LEFT)
        self.attendre_voix()

    # ── 05 : pourquoi : savoir A change tout pour C ─────────────────────────

    def ecran_pourquoi(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-pourquoi")
        self.titre_ecran("Pourquoi ?")
        r = self.roue(pairs=True, c=True)
        self.add(r)
        self.au_mot("si la roue tombe")
        l1 = self.gauche(self.t("La roue tombe sur un pair", 34, COUL_A), 2.05)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.4)
        r.lancer(self, 6, tours=2, run_time=2.2)
        self.play(Indicate(r.case(6), color=COMMUN, scale_factor=1.12), run_time=0.6)
        self.au_mot("on SAIT")
        l2 = self.gauche(suite(self.t("On SAIT :", 36, ORANGE_RETENUE, BOLD), self.t("ni 1 ni 3", 36), buff=0.22),
                         1.15)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.5)
        croix = VGroup()
        for n in (1, 3):
            c = r.nums[n - 1].get_center()
            croix.add(VGroup(Line(c + P(-0.22, -0.22), c + P(0.22, 0.22)), Line(c + P(-0.22, 0.22), c + P(0.22, -0.22)))
                      .set_stroke(ROUGE_ERREUR, 6).set_z_index(4))
        self.play(*[r.case(n).animate.set_fill(ETEINTE, opacity=1) for n in (1, 3)],
                  *[r.nums[n - 1].animate.set_opacity(0.35) for n in (1, 3)], run_time=0.8)
        self.play(Create(croix), run_time=0.5)
        self.au_mot("Savoir A change tout")
        l3 = self.gauche(self.t("Savoir A change tout pour C", 36, JAUNE_TITRE), 0.2)
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.5)
        self.insister(l3, 0.3, LEFT)
        self.au_mot("Des événements incompatibles")
        l4 = self.gauche(self.t("Incompatibles : ils se renseignent", 32, COUL_C), -0.75)
        self.play(FadeIn(l4, shift=UP * 0.1), run_time=0.5)
        self.au_mot("ils ne sont pas indépendants")
        l5 = self.gauche(self.t("Pas indépendants !", 42, ROUGE_ERREUR, BOLD), -1.65)
        self.play(FadeIn(l5, scale=1.4), run_time=0.5)
        self.attendre_voix()

    # ── 06 : le piège ; les deux colonnes ───────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-piege")
        self.titre_ecran("Le piège")
        self.au_mot("penser qu'incompatible")
        faux = self.t("Incompatible = indépendant ?", 42, ORANGE_RETENUE).move_to(P(-0.6, 2.2))
        self.play(FadeIn(faux, shift=UP * 0.15), run_time=0.6)
        self.au_mot("sans lien")
        lien = self.t("« sans lien » ?", 34).move_to(P(-0.6, 1.4))
        self.play(FadeIn(lien, shift=UP * 0.1), run_time=0.5)
        self.au_mot("C'est presque le contraire")
        barre = Line(faux.get_left() + LEFT * 0.1, faux.get_right() + RIGHT * 0.1, color=ROUGE_ERREUR, stroke_width=7)
        contraire = self.t("Presque le contraire !", 44, ROUGE_ERREUR, BOLD).move_to(P(-0.6, 1.4))
        self.play(Create(barre), ReplacementTransform(lien, contraire), run_time=0.6)
        self.insister(contraire, 0.3)
        xg, xd = -3.85, 2.1
        cg = RoundedRectangle(width=5.0, height=2.1, corner_radius=0.18, stroke_color=COUL_C, stroke_width=4,
                              fill_color=COUL_C, fill_opacity=0.08).move_to(P(xg, -0.75))
        cd = RoundedRectangle(width=6.4, height=2.1, corner_radius=0.18, stroke_color=COUL_B, stroke_width=4,
                              fill_color=COUL_B, fill_opacity=0.08).move_to(P(xd, -0.75))
        hg = self.t("Incompatibles", 40, COUL_C, BOLD).move_to(P(xg, -0.25))
        hd = self.t("Indépendants", 40, COUL_B, BOLD).move_to(P(xd, -0.25))
        fg = self.calcul([("P(A ∩ B)", WHITE), ("=", WHITE), ("0", JAUNE_TITRE)], 36).move_to(P(xg, -1.2))
        fd = self.calcul([("P(A ∩ B)", WHITE), ("=", WHITE), ("P(A) × P(B)", JAUNE_TITRE)], 36).move_to(P(xd, -1.2))
        self.au_mot("Incompatibles : P")
        self.play(Create(cg), FadeIn(hg, shift=UP * 0.1), run_time=0.6)
        self.play(FadeIn(fg[:2]), run_time=0.4)
        self.au_mot("égale 0.")
        self.play(FadeIn(fg[2], scale=1.6), run_time=0.4)
        self.au_mot("Indépendants : P")
        self.play(Create(cd), FadeIn(hd, shift=UP * 0.1), run_time=0.6)
        self.play(FadeIn(fd[:2]), run_time=0.4)
        self.au_mot("égale P de A fois")
        self.play(FadeIn(fd[2], scale=1.3), run_time=0.6)
        self.attendre_voix()

    # ── 07 : défi : D « le numéro est 10 » ──────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        r = self.roue()
        self.play(FadeIn(r), run_time=0.5)
        self.au_mot("le numéro est 10")
        ed = self.gauche(self.evt("D", "« le numéro est 10 »", COUL_D, 34), 1.7)
        cd = r.couronne([10], COUL_D)
        self.play(FadeIn(ed, shift=UP * 0.1), FadeIn(cd, scale=1.1), run_time=0.7)
        self.play(Indicate(r.case(10), color=COUL_D, scale_factor=1.1), run_time=0.6)
        self.au_mot("A, pair")
        ea = self.gauche(self.evt("A", "« pair »", COUL_A, 34), 0.85)
        self.play(FadeIn(ea, shift=UP * 0.1), LaggedStart(*r.colorer([2, 4, 6, 8, 10], COUL_A), lag_ratio=0.2),
                  run_time=1.0)
        self.au_mot("sont-ils incompatibles")
        q1 = self.gauche(self.t("Incompatibles ?", 40, COUL_C), -0.15)
        self.play(FadeIn(q1, shift=UP * 0.1), run_time=0.5)
        self.au_mot("Indépendants ?")
        q2 = self.gauche(self.t("Indépendants ?", 40, COUL_B), -1.0)
        self.play(FadeIn(q2, shift=UP * 0.1), run_time=0.5)
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=36)))
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("07b-correction")
        self.titre_ecran("Correction")
        r = self.roue(pairs=True)
        cd = r.couronne([10], COUL_D)
        self.add(r, cd)
        self.au_mot("10 est pair")
        l1 = self.gauche(self.t("10 est pair", 36, COUL_A), 2.15)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.4)
        r.clignote(self, [10])
        self.au_mot("peuvent arriver ensemble")
        l2 = self.gauche(self.t("A et D peuvent arriver ensemble", 32), 1.45)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.5)
        self.au_mot("ils ne sont pas incompatibles")
        l3 = self.gauche(self.t("Pas incompatibles", 38, COUL_C, BOLD), 0.75)
        self.play(FadeIn(l3, scale=1.3), run_time=0.5)
        self.au_mot("P de A inter D")
        l4 = self.gauche(self.calcul([("P(A ∩ D)", WHITE), ("=", WHITE), ("0,1", JAUNE_TITRE)], 40), -0.1)
        self.play(FadeIn(l4[:2], shift=UP * 0.1), run_time=0.5)
        self.au_mot("égale 0,1")
        self.play(FadeIn(l4[2], scale=1.6), Indicate(r.case(10), color=COMMUN, scale_factor=1.12), run_time=0.6)
        self.au_mot("P de A fois P de D")
        l5 = self.gauche(self.calcul([("P(A) × P(D)", WHITE), ("=", WHITE), ("0,5", BLEU_CALCUL), ("×", WHITE),
                                      ("0,1", BLEU_CALCUL), ("=", WHITE), ("0,05", JAUNE_TITRE)], 36, 0.15), -0.95)
        self.play(FadeIn(l5[0], shift=UP * 0.1), run_time=0.5)
        self.au_mot("0,5 fois")
        self.play(FadeIn(l5[1]), FadeIn(l5[2], scale=1.5), FadeIn(l5[3]), run_time=0.5)
        self.au_mot("0,1, égale")
        self.play(FadeIn(l5[4], scale=1.5), run_time=0.4)
        self.au_mot("égale 0,05")
        self.play(FadeIn(l5[5]), FadeIn(l5[6], scale=1.6), run_time=0.5)
        self.au_mot("Ils ne sont pas indépendants")
        l6 = self.gauche(self.t("Pas indépendants non plus", 38, ROUGE_ERREUR, BOLD), -1.85)
        self.play(Indicate(l4[2], color=JAUNE_TITRE, scale_factor=1.4), Indicate(l5[6], scale_factor=1.4),
                  run_time=0.6)
        self.play(FadeIn(l6, scale=1.3), run_time=0.5)
        self.attendre_voix()

    # ── 08 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)))
        fs = 38
        items = [
            (suite(self.t("Incompatibles :", fs, COUL_C, BOLD), self.t("impossible ensemble", fs), buff=0.18),
             self.t("P(A ∩ B) = 0", fs, JAUNE_TITRE)),
            (suite(self.t("Indépendants :", fs, COUL_B, BOLD), self.t("savoir l'un ne change rien", fs), buff=0.18),
             self.t("P(A ∩ B) = P(A) × P(B)", fs, JAUNE_TITRE)),
            (self.t("Incompatibles, de probabilités non nulles :", fs),
             self.t("jamais indépendants", fs, ROUGE_ERREUR, BOLD)),
        ]
        blocs = VGroup()
        for haut, bas in items:
            txt = VGroup(haut, bas).arrange(DOWN, aligned_edge=LEFT, buff=0.16)
            blocs.add(VGroup(self.coche(), txt).arrange(RIGHT, buff=0.3, aligned_edge=UP))
        blocs.arrange(DOWN, aligned_edge=LEFT, buff=0.5)
        if blocs.width > 11.4:
            blocs.scale_to_fit_width(11.4)
        blocs.move_to(P(-0.6, -0.1))
        for b in blocs:
            b[0].shift(DOWN * 0.12)
        reperes = [("Incompatibles : impossible", "égale 0."), ("Indépendants : savoir", "égale P de A fois"),
                   ("Deux événements incompatibles", "ne sont jamais")]
        for (m1, m2), b in zip(reperes, blocs):
            self.au_mot(m1)
            self.play(FadeIn(b[1][0], shift=RIGHT * 0.2), run_time=0.6)
            self.au_mot(m2)
            self.play(FadeIn(b[1][1], shift=RIGHT * 0.2), Create(b[0]), run_time=0.6)
        self.attendre_voix(marge=1.0)

    # ── 09 : l'écran de fin (règle du 19/10) ────────────────────────────────

    def page_abonnement(self, voix="09-abonne"):
        """« Entraîne-toi sur » + eleveai.fr encadré, puis « Abonne-toi ! » +
        @eleveai974 : exactement ce que dit la voix (plus « le coach »)."""
        self.clear()
        self.dire(voix)
        self.add_mascotte(scale=0.9)
        entraine = self.t("Entraîne-toi sur", 46, JAUNE_TITRE).move_to(P(0, 2.05))
        site = self.t("eleveai.fr", 62, BLEU_CALCUL).move_to(P(0, 1.0))
        cadre = SurroundingRectangle(site, color=BLEU_CALCUL, buff=0.26, stroke_width=3)
        abonne = self.t("Abonne-toi !", 44, VERT_OK).move_to(P(0, -0.6))
        poignee = self.t("@eleveai974", 48, VERT_OK).move_to(P(0, -1.55))
        self.play(Write(entraine), run_time=0.8)
        self.play(GrowFromCenter(site), Create(cadre), run_time=0.8)
        self.au_mot("Et abonne-toi")
        self.play(FadeIn(abonne, shift=UP * 0.15), run_time=0.5)
        self.play(GrowFromCenter(poignee), run_time=0.6)
        self.play(Flash(poignee, color=VERT_OK, line_length=0.3))
        self.attendre_voix(marge=1.4)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_incompatibles()
        self.ecran_independants()
        self.ecran_ensemble()
        self.ecran_pourquoi()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement()


class ProbaIndepIncompatibleSTMG(ProbaIndepIncompatibleBase):
    identite = "Maths STMG — EleveAI"


class ProbaIndepIncompatiblePremiere(ProbaIndepIncompatibleBase):
    identite = "Maths 1re — EleveAI"


# 19/10 : la même vidéo pour la 1re SPÉ (micro jumelle, pack par classe).
class ProbaIndepIncompatiblePremiereSpe(ProbaIndepIncompatibleBase):
    identite = "Maths 1re spé — EleveAI"
    ceinture = "marron"
