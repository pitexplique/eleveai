# proba_va_ecart_type.py
# EleveAI — Maths 1re spécialité (micro va_ecart_type, notion variables_aleatoires)
# — série « Probabilités » : CALCULER ET INTERPRÉTER UN ÉCART-TYPE, AVEC VOIX.
# Paysage 16:9, ceinture MARRON. Short jumeau : proba_va_ecart_type_short.py (orange).
#
# ⭐ Suite de « Calculer une variance » (proba_va_variance.py) : on repart de
# la roue de la kermesse, V(X) = 8,64 (des €²), σ = √8,64 ≈ 2,94 €. Puis DEUX
# PLACEMENTS de même espérance (30 €) mais de risque différent (économie) :
#   A : 20 € ou 40 €, 0,5 chacun → écarts ±10, V = 100, σ = 10 € ;
#   B : −60 € ou 120 €, 0,5 chacun → écarts ±90, V = 8 100, σ = 90 € (9 fois plus).
#   Défi C : −10 € ou 70 € → E = 30, écarts ±40, V = 1 600, σ = 40 €.
# Nombres calculés en Python (fractions exactes ; √8,64 = 2,9394…).
#
# ⭐ Les figures du coach (banque premiere-spe/maths/variables-aleatoires) :
#   · le `stat_graph` « bâtons » (« Loi de probabilité de X » : carte blanche,
#     axe, un bâton gris à pastille par valeur, la probabilité au-dessus) — sur
#     un axe À L'ÉCHELLE commun aux placements, pour VOIR la dispersion :
#     l'espérance en pointillés orange, les écarts en flèches, la bande
#     « E ± σ » qui s'allume ;
#   · la roue de la kermesse (style de la roue du coach) pour le rappel.
# ⛔ PAS D'ÉCART : un nombre ne s'écrit que quand la voix le dit (ou en
#   rappel d'un nombre déjà dit).
#
# Écrans : 00 garde · 01 rappel (8,64 €²) · 02 σ = √V · 03 deux placements ·
# 04 même espérance · 05 σ de A · 06 σ de B · 07 interpréter · 08 piège ·
# 09 défi · 09b correction · 10 ce que tu as appris · 11 fin.
#
# Voix : manim/voix/premiere-proba-va-ecart-type.json (Julie, débit −6), calée
# mot à mot par proba_va_ecart_type_marques.json.
# python -m manim render -qh --disable_caching manim/scripts/premiere/proba_va_ecart_type.py ProbaVaEcartTypePremiereSpe -o eleveai-maths-premiere-proba-va-ecart-type --media_dir manim/scripts/premiere/media-va_ecart_type-1s
# Sortie : manim/sorties/premiere/maths/probabilites/41-va-ecart-type/

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from proba_va_variance import (  # noqa: E402
    BATON, COMMUN, ENCRE, MOINS, ROUE, BatonsReels, P, ProbaVaVarianceBase, RoueKermesse, suite,
)

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

COUL_A = "#3B82F6"      # placement A : bleu (prudent)
COUL_B = "#F97316"      # placement B : orange (risqué)
COUL_C = "#22C55E"      # placement C (le défi) : vert
XMIN, XMAX = -75, 135   # l'axe commun des placements (en €)
XD = 1.15               # le bord gauche de la colonne de droite
XC = -3.0               # le centre des cartes (colonne de gauche)


def nombre(v):
    """−60 avec le vrai signe moins ; 8 100 avec une espace fine."""
    s = f"{abs(v):,}".replace(",", " ")
    return (MOINS if v < 0 else "") + s


class CartePlacement(BatonsReels):
    """Le stat_graph « bâtons » d'un placement : deux gains, 0,5 chacun."""

    def __init__(self, nom, valeurs, couleur, centre, larg=7.4, haut=2.7):
        # bâtons bas (hmax 0,95) : au-dessus, la bande du titre et le « 30 » de l'espérance
        super().__init__(valeurs, [0.5] * len(valeurs), XMIN, XMAX, centre=centre, larg=larg, haut=haut,
                         titre=f"Placement {nom} : gain en €", couleur=couleur, pmax=0.5, fs=26, hmax=0.8)
        self.valeurs = valeurs
        self.couleur = couleur
        # le titre à gauche : le milieu du haut de la carte est pris par la ligne E = 30
        self.titre.scale(24 / 22).align_to(self.carte, LEFT).shift(RIGHT * 0.25)
        # le zéro de l'axe : une petite graduation (sans nombre)
        self.add(Line(self.pied(0) + DOWN * 0.08, self.pied(0) + UP * 0.08, color=ENCRE, stroke_width=2.5))
        self.probas = VGroup(*[Text("0,5", font_size=22, color=ENCRE, weight=BOLD).next_to(bt[1], UP, buff=0.06)
                               for bt in self.batons])
        # la bande E ± σ (z 1) passe SUR la carte blanche, SOUS les bâtons (z 2)
        for m in (self.batons, self.probas, self.etiq):
            m.set_z_index(2)

    def lab_e(self, le, texte="30"):
        """L'espérance écrite en haut de sa ligne pointillée."""
        return Text(texte, font_size=24, color=ORANGE_RETENUE, weight=BOLD).next_to(le, RIGHT, buff=0.06).align_to(
            le, UP)

    def bande(self, e, s):
        """La bande « E ± σ », bleu clair, derrière les bâtons."""
        h = self.batons[0][1].get_center()[1] - self.y0
        r = Rectangle(width=self.x(e + s) - self.x(e - s), height=h + 0.1, fill_color=BLEU_CALCUL,
                      fill_opacity=0.28, stroke_width=0).move_to(P(self.x(e), self.y0 + (h + 0.1) / 2))
        return r.set_z_index(1)

    def tout(self, etiq=True, probas=True):
        if etiq:
            self.add(self.etiq)
        if probas:
            self.add(self.probas)
        return self


class ProbaVaEcartTypeBase(ProbaVaVarianceBase):
    ceinture = "marron"
    nom_voix = "premiere-proba-va-ecart-type"
    fichier_marques = "proba_va_ecart_type_marques.json"
    identite = "Maths 1re spé — EleveAI"

    def droite(self, mob, y):
        if mob.width > 7.0 - XD - 0.2:
            mob.scale_to_fit_width(7.0 - XD - 0.2)
        return mob.move_to(P(XD, y), aligned_edge=LEFT)

    def cartes(self):
        a = CartePlacement("A", [20, 40], COUL_A, P(XC, 1.3))
        b = CartePlacement("B", [-60, 120], COUL_B, P(XC, -1.5))
        return a, b

    def cartes_esperance(self):
        """Les deux cartes complètes, l'espérance 30 tracée (état après l'écran 04)."""
        a, b = self.cartes()
        a.tout(), b.tout()
        la, lb = a.ligne_e(30), b.ligne_e(30)
        return a, b, VGroup(la, a.lab_e(la)), VGroup(lb, b.lab_e(lb))

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("L'écart-type : mesurer le risque", 48, JAUNE_TITRE).to_edge(UP, buff=0.6)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.22)
        ech = echelle_ceintures(self.ceinture).move_to(P(-0.6, -2.85))
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech), run_time=1.0)
        a = CartePlacement("A", [20, 40], COUL_A, P(-0.6, 0.55), larg=6.4, haut=1.9)
        b = CartePlacement("B", [-60, 120], COUL_B, P(-0.6, -1.05) + DOWN * 0.0, larg=6.4, haut=1.9)
        a.remove(a.titre)
        b.remove(b.titre)
        VGroup(a, b).arrange(RIGHT, buff=0.3).scale(0.85).move_to(P(-0.6, -0.4))
        self.play(FadeIn(a, shift=UP * 0.2), FadeIn(b, shift=UP * 0.2), run_time=0.6)
        self.play(*[Wiggle(bt) for bt in b.batons], run_time=0.8)
        self.attendre_voix(marge=0.8)

    # ── 01 : rappel : V(X) = 8,64… des euros au carré ───────────────────────

    def ecran_rappel(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-rappel")
        r = RoueKermesse(ROUE).tout()
        self.titre_vite("La roue de la kermesse", FadeIn(r, scale=0.8))
        self.au_mot("variance 8,64")
        v = self.gauche(self.calcul([("V(X)", JAUNE_TITRE), ("=", WHITE), ("8,64", JAUNE_TITRE)], 60), 1.6)
        self.play(FadeIn(v, shift=UP * 0.1), run_time=0.5)
        self.au_mot("Mais 8,64 quoi")
        q = self.gauche(self.t("8,64 quoi ?", 44, ORANGE_RETENUE), 0.4)
        self.play(FadeIn(q, scale=1.3), run_time=0.4)
        self.au_mot("Des euros au carré")
        unite = self.t("€²", 60, ORANGE_RETENUE, BOLD).next_to(v, RIGHT, buff=0.25)
        dit = self.gauche(suite(self.t("Des", 44), self.t("euros au carré !", 44, ORANGE_RETENUE, BOLD), buff=0.2),
                          -0.65)
        self.play(FadeIn(dit, shift=UP * 0.1), FadeIn(unite, scale=1.8), run_time=0.5)
        self.insister(unite, 0.25)
        self.au_mot("Ça ne se lit pas")
        nl = self.gauche(self.t("Ça ne se lit pas.", 40, ROUGE_ERREUR, BOLD), -1.75)
        self.play(FadeIn(nl, shift=UP * 0.1), run_time=0.4)
        r.tourner(self, tours=1.0, run_time=1.0)
        self.attendre_voix()

    # ── 02 : σ = √V, dans la même unité que X ──────────────────────────────

    def ecran_formule(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-formule")
        r = RoueKermesse(ROUE).tout()
        self.titre_vite("L'écart-type", FadeIn(r))
        self.au_mot("sigma de X")
        sx = self.gauche(self.t("σ(X)", 64, JAUNE_TITRE, BOLD), 1.6)
        self.play(FadeIn(sx, scale=1.6), run_time=0.45)
        self.au_mot("la racine de la variance")
        f = suite(self.t("=", 60), self.t("√V(X)", 60, BLEU_CALCUL, BOLD), buff=0.25).next_to(sx, RIGHT, buff=0.25)
        cadre = SurroundingRectangle(VGroup(sx, f), color=JAUNE_TITRE, buff=0.2, stroke_width=4, corner_radius=0.1)
        self.play(FadeIn(f, shift=LEFT * 0.2), run_time=0.5)
        self.play(Create(cadre), run_time=0.3)
        self.insister(f[1], 0.25, LEFT)
        self.au_mot("Racine de 8,64")
        c = self.gauche(self.calcul([("√8,64", BLEU_CALCUL), ("≈", WHITE), ("2,94 €", JAUNE_TITRE)], 54), 0.0)
        self.play(FadeIn(c[0], scale=1.4), run_time=0.4)
        self.au_mot("2,94 euros")
        self.play(FadeIn(c[1]), FadeIn(c[2], scale=1.8), run_time=0.45)
        self.au_mot("En euros")
        u = self.gauche(suite(self.t("En", 40), self.t("euros", 40, VERT_OK, BOLD), self.t(", comme X", 40), buff=0.18),
                        -1.3)
        u[2].shift(LEFT * 0.12)
        self.play(FadeIn(u, shift=UP * 0.1), Indicate(c[2], color=VERT_OK), run_time=0.6)
        self.attendre_voix()

    # ── 03 : deux placements sur un an ──────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-situation")
        a, b = self.cartes()
        for c in (a, b):
            c.remove(c.batons)
        self.titre_vite("Deux placements sur un an", run_time=0.6)
        self.au_mot("conseiller")
        metier = self.droite(VGroup(self.t("Conseiller", 34, BLEU_CALCUL), self.t("en placements", 34, BLEU_CALCUL))
                             .arrange(DOWN, aligned_edge=LEFT, buff=0.1), 2.0)
        self.play(FadeIn(metier, shift=LEFT * 0.2), run_time=0.4)
        for c, mots in [(a, ["A : gagner", "20 ou", "40 euros"]), (b, ["B : perdre", "perdre 60", "120 euros"])]:
            self.au_mot(mots[0])
            self.play(FadeIn(c, shift=RIGHT * 0.2), run_time=0.45)
            for k, mot in enumerate(mots[1:]):
                self.au_mot(mot)
                self.play(GrowFromEdge(c.batons[k], DOWN), FadeIn(c.etiq[k], scale=1.6), run_time=0.4)
                c.add(c.batons[k])
        self.au_mot("une chance sur deux")
        ch = self.droite(self.t("1 chance sur 2", 38, WHITE), 0.6)
        self.play(FadeIn(ch, shift=LEFT * 0.2), run_time=0.4)
        self.au_mot("0,5.")
        p = self.droite(suite(self.t("p =", 44), self.t("0,5", 48, BLEU_CALCUL, BOLD), buff=0.2), -0.35)
        self.play(FadeIn(p, scale=1.3), *[FadeIn(t, scale=1.6) for t in [*a.probas, *b.probas]], run_time=0.5)
        self.attendre_voix()

    # ── 04 : la même espérance : 30 € ───────────────────────────────────────

    def ecran_esperance(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-esperance")
        a, b = self.cartes()
        a.tout(), b.tout()
        self.add(a, b)
        self.titre_vite("L'espérance", run_time=0.5)
        fs = 34
        for c, y, morceaux, mots in [
            (a, 1.75, [("0,5", BLEU_CALCUL), ("×", WHITE), ("20", WHITE), ("+", WHITE), ("0,5", BLEU_CALCUL),
                       ("×", WHITE), ("40", WHITE)], ["0,5 fois 20", "plus 0,5 fois 40", ": 30."]),
            (b, -1.05, [("0,5", BLEU_CALCUL), ("×", WHITE), (f"({MOINS}60)", WHITE), ("+", WHITE),
                        ("0,5", BLEU_CALCUL), ("×", WHITE), ("120", WHITE)],
             ["0,5 fois moins 60", "plus 0,5 fois 120", "120 : 30"]),
        ]:
            l = self.droite(self.calcul(morceaux, fs, buff=0.1), y)
            self.au_mot(mots[0])
            self.play(FadeIn(l[:3], shift=UP * 0.1), Indicate(c.batons[0], color=COMMUN), run_time=0.4)
            self.au_mot(mots[1])
            self.play(FadeIn(l[3:], shift=UP * 0.1), Indicate(c.batons[1], color=COMMUN), run_time=0.4)
            self.au_mot(mots[2])
            r = self.droite(self.calcul([("E", JAUNE_TITRE), ("=", WHITE), ("30 €", JAUNE_TITRE)], 46), y - 0.7)
            le = c.ligne_e(30)
            e30 = c.lab_e(le)
            self.play(FadeIn(r, scale=1.3), Create(le), FadeIn(e30), run_time=0.5)
        self.au_mot("Même espérance")
        meme = self.droite(self.t("Même espérance !", 40, VERT_OK, BOLD), 0.3)
        self.play(FadeIn(meme, scale=1.3), run_time=0.45)
        self.insister(meme, 0.25, LEFT)
        self.attendre_voix()

    # ── 05 / 06 : l'écart-type de A, puis de B ──────────────────────────────

    def sigma(self, c, autre, voix, d, ys, rappel=None, extraits=None):
        """Écarts ±d sur la carte c (flèches), puis la colonne de droite :
        écarts, carré, V, σ ; la bande E ± σ s'allume. `autre` s'estompe."""
        m = extraits
        hauteur = (c.batons[0][1].get_center()[1] - c.y0) * 0.45
        fl = [c.fleche(30, 30 - d, hauteur, ROUGE_ERREUR), c.fleche(30, 30 + d, hauteur, ROUGE_ERREUR)]
        y1, y2, y3, y4 = ys
        ec = self.droite(self.calcul([("Écarts :", WHITE), (MOINS + str(d), ROUGE_ERREUR), ("et", WHITE),
                                      (str(d), ROUGE_ERREUR)], 40, buff=0.18), y1)
        self.au_mot(m[0])
        self.play(GrowArrow(fl[0]), FadeIn(ec[:2], shift=UP * 0.1), run_time=0.4)
        self.au_mot(m[1])
        self.play(GrowArrow(fl[1]), FadeIn(ec[2:], shift=UP * 0.1), run_time=0.4)
        car = self.droite(self.calcul([("Au carré :", WHITE), (nombre(d * d), JAUNE_TITRE)], 40, buff=0.2), y2)
        self.au_mot(m[2])
        self.play(FadeIn(car, shift=UP * 0.1), run_time=0.4)
        v = self.droite(self.calcul([("V", JAUNE_TITRE), ("=", WHITE), (nombre(d * d), JAUNE_TITRE)], 44), y3)
        self.au_mot(m[3])
        self.play(FadeIn(v, shift=UP * 0.1), run_time=0.4)
        s = self.droite(self.calcul([("σ", JAUNE_TITRE), ("=", WHITE), (f"√{nombre(d * d)}", BLEU_CALCUL),
                                     ("=", WHITE), (f"{d} €", JAUNE_TITRE)], 46), y4)
        cadre = SurroundingRectangle(s, color=JAUNE_TITRE, buff=0.16, stroke_width=4, corner_radius=0.1)
        band = c.bande(30, d)
        self.au_mot(m[4])
        self.play(FadeIn(s[:3], shift=UP * 0.1), run_time=0.35)
        self.au_mot(m[5])
        self.play(FadeIn(s[3:], scale=1.4), Create(cadre), FadeIn(band), run_time=0.5)
        self.insister(s[4], 0.25)
        return fl, band

    def ecran_sigma_a(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-sigma-a")
        a, b, la, lb = self.cartes_esperance()
        self.add(a, b, la, lb)
        self.titre_vite("L'écart-type de A", VGroup(b, lb).animate.set_opacity(0.3), run_time=0.6)
        self.sigma(a, b, "05", 10, (1.9, 1.2, 0.5, -0.3),
                   extraits=["moins 10", "et 10.", "Au carré", "V égale", "sigma égale", "10 euros"])
        self.attendre_voix()

    def ecran_sigma_b(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-sigma-b")
        a, b, la, lb = self.cartes_esperance()
        self.add(a, b, la, lb, a.bande(30, 10))
        rap = self.droite(self.calcul([("σ(A)", COUL_A), ("=", WHITE), ("10 €", COUL_A)], 34), 2.1)
        self.add(rap)
        self.titre_vite("L'écart-type de B", VGroup(a, la).animate.set_opacity(0.3), run_time=0.6)
        self.sigma(b, a, "06", 90, (1.25, 0.55, -0.15, -0.95),
                   extraits=["moins 90", "et 90.", "Au carré", "V égale", "sigma égale", "90 euros"])
        self.attendre_voix()

    # ── 07 : interpréter : même gain moyen, B plus risqué ───────────────────

    def ecran_interpreter(self):
        self.clear()
        self.add_mascotte()
        self.dire("07-interpreter")
        a, b, la, lb = self.cartes_esperance()
        ba, bb = a.bande(30, 10), b.bande(30, 90)
        self.add(ba, bb, a, b, la, lb)
        ra = self.droite(self.calcul([("σ(A)", COUL_A), ("=", WHITE), ("10 €", COUL_A)], 40), 2.0)
        rb = self.droite(self.calcul([("σ(B)", COUL_B), ("=", WHITE), ("90 €", COUL_B)], 40), 1.25)
        self.titre_vite("Interpréter", FadeIn(ra), FadeIn(rb), run_time=0.6)
        self.au_mot("9 fois plus grand")
        neuf = self.droite(self.calcul([("90", COUL_B), ("=", WHITE), ("9", JAUNE_TITRE), ("×", WHITE),
                                        ("10", COUL_A)], 46), 0.45)
        self.play(TransformFromCopy(rb[2], neuf[0]), FadeIn(neuf[1:4]), TransformFromCopy(ra[2], neuf[4]),
                  run_time=0.6)
        self.insister(neuf[2], 0.25)
        self.au_mot("B s'éloigne")
        self.play(bb.animate.set_fill(opacity=0.5), *[Indicate(bt, color=COMMUN, scale_factor=1.2)
                                                      for bt in b.batons], run_time=0.8)
        self.play(bb.animate.set_fill(opacity=0.28), run_time=0.3)
        self.au_mot("B est plus risqué")
        risque = self.droite(self.t("B : plus risqué !", 42, COUL_B, BOLD), -0.4)
        self.play(FadeIn(risque, scale=1.3), Wiggle(VGroup(b.batons)), run_time=0.6)
        self.au_mot("En économie")
        eco = self.droite(self.t("En économie :", 34), -1.2)
        res = self.droite(self.t("écart-type = risque", 40, VERT_OK, BOLD), -1.85)
        cadre = SurroundingRectangle(res, color=VERT_OK, buff=0.15, stroke_width=3, corner_radius=0.08)
        self.play(FadeIn(eco, shift=UP * 0.1), run_time=0.35)
        self.au_mot("mesure le risque")
        self.play(FadeIn(res, shift=UP * 0.1), Create(cadre), run_time=0.5)
        self.attendre_voix()

    # ── 08 : le piège : oublier la racine ───────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("08-piege")
        b = CartePlacement("B", [-60, 120], COUL_B, P(XC, 1.3)).tout()
        lb = b.ligne_e(30)
        self.add(b.bande(30, 90), b, lb, b.lab_e(lb))
        o = self.droite(VGroup(self.t("Oublier", 40, ORANGE_RETENUE, BOLD), self.t("la racine", 40, ORANGE_RETENUE, BOLD))
                        .arrange(DOWN, aligned_edge=LEFT, buff=0.14), 1.6)
        self.titre_vite("Le piège", FadeIn(o, shift=LEFT * 0.2), run_time=0.6)
        XG = -6.6
        self.au_mot("Le risque de B")
        l1 = self.gauche(self.calcul([("Risque de B", WHITE), ("=", WHITE), ("8\u202f100 € ?", ROUGE_ERREUR)], 42),
                         -0.55, XG)
        self.play(FadeIn(l1[:2], shift=UP * 0.1), run_time=0.35)
        self.au_mot("8100 euros")
        self.play(FadeIn(l1[2], scale=1.4), run_time=0.35)
        self.au_mot("Faux")
        barre = Line(l1.get_left() + LEFT * 0.1, l1.get_right() + RIGHT * 0.1, color=ROUGE_ERREUR, stroke_width=7)
        faux = self.t("Faux !", 46, ROUGE_ERREUR, BOLD).next_to(l1, RIGHT, buff=0.4)
        self.play(Create(barre), FadeIn(faux, scale=1.6), run_time=0.45)
        self.au_mot("8100, ce sont")
        l2 = self.gauche(suite(self.t("8\u202f100 :", 42, WHITE), self.t("des euros au carré", 42, ORANGE_RETENUE),
                               buff=0.2), -1.45, XG)
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("des euros au carré")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.4)
        self.au_mot("L'écart-type")
        l3 = self.gauche(self.calcul([("σ(B)", JAUNE_TITRE), ("=", WHITE), ("√8\u202f100", BLEU_CALCUL), ("=", WHITE),
                                      ("90 €", VERT_OK)], 50), -2.45, XG)
        cadre = SurroundingRectangle(l3, color=VERT_OK, buff=0.16, stroke_width=4, corner_radius=0.1)
        self.play(FadeIn(l3[:3], shift=UP * 0.1), run_time=0.4)
        self.au_mot("90 euros")
        self.play(FadeIn(l3[3:], scale=1.4), Create(cadre), run_time=0.5)
        self.insister(l3[4], 0.25)
        self.attendre_voix()

    # ── 09 : défi : le placement C ──────────────────────────────────────────

    def carte_c(self):
        return CartePlacement("C", [-10, 70], COUL_C, P(XC, 0.9))

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("09-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)), run_time=0.6)
        c = self.carte_c()
        c.remove(c.batons)
        self.au_mot("Placement C")
        self.play(FadeIn(c, shift=RIGHT * 0.2), run_time=0.4)
        for k, mot in enumerate(["perdre 10", "70 euros"]):
            self.au_mot(mot)
            self.play(GrowFromEdge(c.batons[k], DOWN), FadeIn(c.etiq[k], scale=1.6), run_time=0.4)
            c.add(c.batons[k])
        self.au_mot("une chance sur deux")
        self.play(*[FadeIn(t, scale=1.6) for t in c.probas], run_time=0.4)
        self.au_mot("Espérance")
        le = c.ligne_e(30)
        e = self.droite(self.calcul([("E", JAUNE_TITRE), ("=", WHITE), ("30 €", JAUNE_TITRE)], 50), 1.6)
        self.play(FadeIn(e[:2]), run_time=0.2)
        self.au_mot(": 30.")
        self.play(FadeIn(e[2], scale=1.6), Create(le), FadeIn(c.lab_e(le)), run_time=0.45)
        self.au_mot("Son écart-type")
        q = self.droite(self.calcul([("σ(C)", JAUNE_TITRE), ("=", WHITE), ("?", ORANGE_RETENUE)], 62), 0.4)
        self.play(FadeIn(q, scale=1.3), run_time=0.45)
        self.insister(q[2], 0.25)
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=36)))
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("09b-correction")
        c = self.carte_c().tout()
        le = c.ligne_e(30)
        self.add(c, le, c.lab_e(le))
        self.titre_vite("Correction", run_time=0.5)
        self.sigma(c, None, "09b", 40, (1.9, 1.2, 0.5, -0.3),
                   extraits=["moins 40", "et 40.", "Au carré", "V égale", "sigma égale", "40 euros"])
        self.au_mot("entre A et B")
        # le classement des risques : trois barres de longueur σ (A, C, B)
        k = 5.4 / 90
        barres = VGroup()
        for nom, s, coul in [("A", 10, COUL_A), ("C", 40, COUL_C), ("B", 90, COUL_B)]:
            lab = self.t(nom, 36, coul, BOLD)
            bar = Rectangle(width=s * k, height=0.32, fill_color=coul, fill_opacity=1, stroke_width=0)
            barres.add(VGroup(lab, bar).arrange(RIGHT, buff=0.2, aligned_edge=DOWN))
        barres.arrange(DOWN, aligned_edge=LEFT, buff=0.2).move_to(P(-6.3, -1.0), aligned_edge=UP + LEFT)
        for g in barres:
            g[1].move_to(P(-5.8, g[0].get_center()[1]), aligned_edge=LEFT)
        entre = self.droite(self.t("Entre A et B !", 40, VERT_OK, BOLD), -1.3)
        self.play(LaggedStart(*[FadeIn(g[0]) for g in barres], *[GrowFromEdge(g[1], LEFT) for g in barres],
                              lag_ratio=0.1), FadeIn(entre, scale=1.3), run_time=0.8)
        self.play(Indicate(barres[1], color=COMMUN, scale_factor=1.1), run_time=0.5)
        self.attendre_voix()

    # ── 10 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("10-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)), run_time=0.6)
        fs = 38
        items = [
            (suite(self.t("σ(X) = √V(X)", fs, JAUNE_TITRE, BOLD), self.t(": la racine de la variance", fs), buff=0.18),
             self.t("dans l'unité de X", fs)),
            (self.t("À espérance égale,", fs, VERT_OK, BOLD), self.t("le plus grand écart-type = le plus risqué", fs)),
        ]
        blocs = VGroup()
        for haut, bas in items:
            txt = VGroup(haut, bas).arrange(DOWN, aligned_edge=LEFT, buff=0.16)
            blocs.add(VGroup(self.coche(), txt).arrange(RIGHT, buff=0.3, aligned_edge=UP))
        blocs.arrange(DOWN, aligned_edge=LEFT, buff=0.55)
        if blocs.width > 11.0:
            blocs.scale_to_fit_width(11.0)
        blocs.move_to(P(-0.8, 0.4))
        for b in blocs:
            b[0].shift(DOWN * 0.12)
        for (m1, m2), b in zip([("L'écart-type, c'est", "dans l'unité"), ("À espérance égale", "le plus grand")],
                               blocs):
            self.au_mot(m1)
            self.play(FadeIn(b[1][0], shift=RIGHT * 0.2), run_time=0.5)
            self.au_mot(m2)
            self.play(FadeIn(b[1][1], shift=RIGHT * 0.2), Create(b[0]), run_time=0.5)
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_rappel()
        self.ecran_formule()
        self.ecran_situation()
        self.ecran_esperance()
        self.ecran_sigma_a()
        self.ecran_sigma_b()
        self.ecran_interpreter()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="11-abonne")


class ProbaVaEcartTypePremiereSpe(ProbaVaEcartTypeBase):
    identite = "Maths 1re spé — EleveAI"


class ProbaVaEcartTypeTerminale(ProbaVaEcartTypeBase):
    identite = "Maths Tle spé — EleveAI"
    ceinture = "noire"
