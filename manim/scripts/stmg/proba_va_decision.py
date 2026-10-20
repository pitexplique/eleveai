# proba_va_decision.py
# EleveAI — Maths STMG — série « Probabilités » : CHOISIR AVEC L'ESPÉRANCE
# (micro va_esp_decision, notion va_esperance), AVEC VOIX.
# Paysage 16:9, CEINTURE BLEUE. Short jumeau : proba_va_decision_short.py
# (ceinture jaune : « 500 € sûrs, ou 2 000 € avec 30 % de chances ? »).
#
# Contexte écologie / business : un commerçant choisit un contrat
# d'électricité verte. A : 500 € sûrs ; B : 2 000 € avec 0,3, rien sinon.
#
# ⭐ Les figures du coach :
#   · « Les deux options » (tableau_donnees du coach : en-tête sombre,
#     libellés bleu clair, cases blanches) → ici les deux COLONNES « Contrat A /
#     Contrat B », cartes blanches, montant et probabilité ;
#   · la loi du gain de B (canvasLoi → tableau « xᵢ | 2 000 | 0 », ligne
#     « P(X = xᵢ) »), colonne allumée en jaune quand la voix la lit.
# Plus : 10 années dessinées (3 pleines, 7 vides) pour le risque, et une
# BALANCE qui penche vers l'espérance la plus grande.
# ⛔ PAS D'ÉCART : chaque nombre n'apparaît que quand la voix le dit.
#
# Écrans : 00 garde · 01 les deux contrats · 02 l'espérance de B · 03 comparer
# (la balance) · 04 le risque (10 années) · 05 le piège · 06 défi (contrat C) ·
# 06b correction · 07 ce que tu as appris · 08 fin « Entraîne-toi sur eleveai.fr ».
#
# Voix : manim/voix/stmg-proba-va-decision.json (débit −7).
# Rendu (media à soi : WinError 32 sinon) :
# python -m manim render -qh --disable_caching manim/scripts/stmg/proba_va_decision.py ProbaVaDecisionSTMG -o eleveai-maths-stmg-proba-va-decision --media_dir manim/scripts/stmg/media-va_decision
# Puis copier dans manim/sorties/stmg/maths/probabilites/30-va-decision/.

import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "seconde"))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "premiere"))
sys.path.insert(0, str(Path(__file__).resolve().parent))

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Notion6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402
from proba_pc_conditionnelle import ANNEAU, BORD, ENCRE, ENTETE, LIBELLE, SURLIGNE, suite  # noqa: E402
from proba_va_esperance import TableauLoi, lab_p, lab_xi  # noqa: E402

COUL_A = "#22C55E"      # contrat A : vert (le sûr)
COUL_B = "#3B82F6"      # contrat B : bleu (le pari)
COUL_C = "#F97316"      # contrat C (le défi) : orange
CARTE_BORD = "#E2E8F0"
VIDE = "#334155"        # une année vide
OR = "#FACC15"          # une pièce


def P(x, y):
    return np.array([x, y, 0.0])


def eclair(h=0.5, color=YELLOW):
    """Un petit éclair (l'électricité verte)."""
    pts = [P(0.08, 0.5), P(-0.22, -0.02), P(0.0, -0.02), P(-0.1, -0.5), P(0.24, 0.08), P(0.02, 0.08)]
    e = Polygon(*pts, fill_color=color, fill_opacity=1, stroke_color=ENCRE, stroke_width=1.5)
    return e.scale_to_fit_height(h)


def feuille(h=0.45, color=COUL_A):
    """Une feuille (le vert)."""
    f = VMobject(fill_color=color, fill_opacity=1, stroke_color=ENCRE, stroke_width=1.5)
    f.set_points_smoothly([P(0, -0.5), P(0.32, -0.05), P(0.18, 0.35), P(0, 0.5), P(-0.18, 0.35),
                           P(-0.32, -0.05), P(0, -0.5)])
    nerv = Line(P(0, -0.5), P(0, 0.4), stroke_color=ENCRE, stroke_width=1.5)
    return VGroup(f, nerv).rotate(-0.5).scale_to_fit_height(h)


def piece(r=0.22):
    """Une pièce d'or « € »."""
    c = Circle(radius=r, fill_color=OR, fill_opacity=1, stroke_color="#A16207", stroke_width=2)
    e = Text("€", font_size=int(r * 90), color="#713F12", weight=BOLD).move_to(c)
    return VGroup(c, e)


class Carte(VGroup):
    """Une carte de contrat : bandeau coloré « Contrat X » + éclair, corps blanc.
    On y pose des lignes de texte (encre) par `ligne(k, mob)`."""

    def __init__(self, nom, couleur, centre, w=4.2, h=3.9, **kw):
        super().__init__(**kw)
        self.c, self.w, self.h = centre, w, h
        self.corps = RoundedRectangle(width=w, height=h, corner_radius=0.2, fill_color=WHITE, fill_opacity=1,
                                      stroke_color=CARTE_BORD, stroke_width=2).move_to(centre)
        self.bande = Rectangle(width=w, height=0.8, fill_color=couleur, fill_opacity=1, stroke_width=0)
        self.bande.move_to(self.corps.get_top() + DOWN * 0.4)
        self.titre = Text(f"Contrat {nom}", font_size=34, color=WHITE, weight=BOLD).move_to(self.bande)
        self.titre.set_stroke(ENCRE, width=3, background=True)
        self.icone = VGroup(eclair(0.5), feuille(0.42)).arrange(RIGHT, buff=0.05)
        self.icone.next_to(self.titre, LEFT, buff=0.18)
        VGroup(self.icone, self.titre).move_to(self.bande)
        self.add(self.corps, self.bande, self.icone, self.titre)

    def y(self, k):
        """Le centre de la ligne k du corps (0 = la première sous le bandeau)."""
        return self.bande.get_bottom()[1] - 0.6 - 0.85 * k

    def poser(self, k, mob):
        mob.move_to(P(self.c[0], self.y(k)))
        if mob.width > self.w - 0.3:
            mob.scale_to_fit_width(self.w - 0.3)
        return mob


def encre(texte, fs=36, color=ENCRE, weight=BOLD):
    return Text(texte, font_size=fs, color=color, weight=weight)


class Balance(VGroup):
    """Une balance à deux plateaux. `self.angle` (ValueTracker, radians) incline
    le fléau autour du pivot ; angle < 0 : le plateau de DROITE descend.
    Les plateaux restent horizontaux et suivent les bouts du fléau (updaters).
    `charger(k, mob)` pose un objet sur le plateau k (0 gauche, 1 droite)."""

    def __init__(self, pivot=P(0, 0.6), L=2.3, haut=2.4, d=1.25, couleurs=(COUL_A, COUL_B), **kw):
        super().__init__(**kw)
        self.pivot, self.L, self.d = pivot, L, d
        self.angle = ValueTracker(0.0)
        pied = Polygon(pivot + P(0, 0.05), pivot + P(-0.28, -haut), pivot + P(0.28, -haut),
                       fill_color=GREY_C, fill_opacity=1, stroke_color=GREY_D, stroke_width=2)
        socle = RoundedRectangle(width=2.2, height=0.22, corner_radius=0.08, fill_color=GREY_D, fill_opacity=1,
                                 stroke_color=GREY_C, stroke_width=2).move_to(pivot + P(0, -haut - 0.08))
        self.pied = VGroup(pied, socle)
        self.fleau = Line(pivot + LEFT * L, pivot + RIGHT * L, stroke_width=9, color=GREY_B)
        self.fleau.add_updater(lambda m: m.become(self._fleau()))
        self.axe = Dot(pivot, radius=0.1, color=JAUNE_TITRE).set_z_index(2)
        self.plateaux = VGroup()
        for k, coul in enumerate(couleurs):
            ancre = Dot(ORIGIN, radius=0.01, fill_opacity=0, stroke_width=0)
            fils = VGroup(Line(ORIGIN, P(-0.85, -d), stroke_width=2.5, color=GREY_B),
                          Line(ORIGIN, P(0.85, -d), stroke_width=2.5, color=GREY_B))
            bol = Polygon(P(-1.0, -d), P(1.0, -d), P(0.7, -d - 0.22), P(-0.7, -d - 0.22),
                          fill_color=coul, fill_opacity=1, stroke_color=WHITE, stroke_width=2)
            g = VGroup(ancre, fils, bol)
            g.shift(self.bout(k) - ancre.get_center())
            g.add_updater(lambda m, k=k: m.shift(self.bout(k) - m[0].get_center()))
            self.plateaux.add(g)
        self.add(self.pied, self.plateaux, self.fleau, self.axe)

    def bout(self, k):
        a = self.angle.get_value()
        s = -1 if k == 0 else 1
        return self.pivot + s * self.L * P(np.cos(a), np.sin(a))

    def _fleau(self):
        return Line(self.bout(0), self.bout(1), stroke_width=9, color=GREY_B)

    def charger(self, k, mob):
        """Pose `mob` sur le plateau k (sans animation : à faire apparaître ensuite)."""
        bol = self.plateaux[k][2]
        mob.next_to(bol, UP, buff=0.06)
        self.plateaux[k].add(mob)
        return mob

    def pencher(self, angle):
        return self.angle.animate.set_value(angle)


def poids(texte, couleur, fs=34):
    """Un poids posé sur un plateau : un bloc sombre, le texte en couleur."""
    t = Text(texte, font_size=fs, color=couleur, weight=BOLD)
    fond = RoundedRectangle(width=t.width + 0.35, height=t.height + 0.3, corner_radius=0.1, fill_color=ENTETE,
                            fill_opacity=1, stroke_color=couleur, stroke_width=3)
    return VGroup(fond, t.move_to(fond))


class Annees(VGroup):
    """10 années en 2 rangées de 5 cases. Les cases « pleines » (indices de
    PLEINES) reçoivent une pièce ; les autres restent vides (grisées, croix)."""

    PLEINES = (1, 5, 8)

    def __init__(self, centre=P(0, 0), cote=0.95, pas=1.15, **kw):
        super().__init__(**kw)
        self.cases, self.pieces, self.croix = VGroup(), VGroup(), VGroup()
        for n in range(10):
            x = centre[0] + pas * (n % 5 - 2)
            y = centre[1] + pas * (0.5 - n // 5)
            c = RoundedRectangle(width=cote, height=cote, corner_radius=0.12, fill_color=WHITE, fill_opacity=0.08,
                                 stroke_color=GREY_B, stroke_width=2.5).move_to(P(x, y))
            self.cases.add(c)
            if n in self.PLEINES:
                self.pieces.add(piece(cote * 0.3).move_to(c))
            else:
                k = cote * 0.22
                self.croix.add(VGroup(Line(P(-k, -k), P(k, k)), Line(P(-k, k), P(k, -k)))
                               .set_stroke(ROUGE_ERREUR, 5).move_to(c))
        self.add(self.cases)

    def vides(self):
        return VGroup(*[c for n, c in enumerate(self.cases) if n not in self.PLEINES])

    def pleines(self):
        return VGroup(*[c for n, c in enumerate(self.cases) if n in self.PLEINES])


X0 = -1.4   # le bord gauche de la colonne de droite


class ProbaVaDecisionBase(Notion6e):
    """Toutes les scènes ; les sous-classes ne changent que l'identité."""

    nom_voix = "stmg-proba-va-decision"
    identite = "Maths — EleveAI"

    def t(self, texte, font_size=36, color=WHITE, weight=NORMAL):
        return Text(texte, font_size=font_size, color=color, weight=weight)

    def insister(self, mob, run_time=0.3, bord=None):
        """Agrandir puis rétrécir (×1,5 puis ÷1,5), jamais de zoom de caméra."""
        self.play(mob.animate.scale(1.5, about_edge=bord), run_time=run_time)
        self.play(mob.animate.scale(1 / 1.5, about_edge=bord), run_time=run_time)

    def calcul(self, morceaux, fs=44, buff=0.16):
        """Une ligne de calcul ; morceaux = [(texte, couleur), …]."""
        return suite(*[self.t(x, fs, c) for x, c in morceaux], buff=buff)

    def gauche(self, mob, y):
        return mob.move_to(P(X0, y), aligned_edge=LEFT)

    # les contenus des cartes : trois lignes chacune
    def lignes_A(self, carte):
        return [carte.poser(0, encre("500 €", 54, "#15803D")),
                carte.poser(1, encre("économie sûre", 34)),
                carte.poser(2, encre("par an", 30, GREY_D, NORMAL))]

    def lignes_B(self, carte):
        return [carte.poser(0, encre("2 000 €", 54, "#1D4ED8")),
                carte.poser(1, encre("avec probabilité 0,3", 30)),
                carte.poser(2, encre("rien sinon", 30, ROUGE_ERREUR))]

    def lignes_C(self, carte):
        return [carte.poser(0, encre("1 000 €", 54, "#C2410C")),
                carte.poser(1, encre("avec probabilité 0,6", 30)),
                carte.poser(2, encre("perte de 200 € sinon", 30, ROUGE_ERREUR))]

    def carte_pleine(self, nom, centre, w=4.2, h=3.9):
        coul = {"A": COUL_A, "B": COUL_B, "C": COUL_C}[nom]
        c = Carte(nom, coul, centre, w, h)
        lignes = {"A": self.lignes_A, "B": self.lignes_B, "C": self.lignes_C}[nom](c)
        c.lignes = VGroup(*lignes)
        c.add(c.lignes)
        return c

    def tableau(self, valeurs, larg=1.6):
        return TableauLoi([lab_xi(), lab_p()], valeurs, coin=P(X0, 2.45), larg=larg)

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("Choisir avec l'espérance", 50, JAUNE_TITRE).to_edge(UP, buff=0.6)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.22)
        ech = echelle_ceintures("bleue").move_to(P(-0.6, -2.85))
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech), run_time=1.0)
        b = Balance(pivot=P(-0.6, 0.75), L=1.7, haut=1.85, d=0.85)
        self.charger_lettres(b, 26)
        self.play(FadeIn(b, scale=0.7), run_time=0.5)
        self.play(b.pencher(0.2), run_time=0.45)
        self.play(b.pencher(-0.2), run_time=0.6)
        self.attendre_voix(marge=1.0)

    def charger_lettres(self, b, fs=30):
        """« A » et « B » posés sur les plateaux (étiquettes, pas des nombres)."""
        for k, (nom, coul) in enumerate([("A", COUL_A), ("B", COUL_B)]):
            b.charger(k, poids(nom, coul, fs))

    # ── 01 : les deux contrats ──────────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.titre_ecran("Deux contrats d'électricité verte")
        icone = VGroup(eclair(1.6), feuille(1.4, COUL_A)).arrange(RIGHT, buff=0.2).move_to(P(-0.6, -0.2))
        self.au_mot("électricité verte")
        self.play(FadeIn(icone, scale=0.5), run_time=0.6)
        self.play(Wiggle(icone), run_time=0.8)
        A = Carte("A", COUL_A, P(-3.6, -0.35), 4.4, 4.1)
        B = Carte("B", COUL_B, P(1.3, -0.35), 4.4, 4.1)
        la, lb = self.lignes_A(A), self.lignes_B(B)
        self.au_mot("Contrat A")
        self.play(FadeOut(icone, scale=0.5), FadeIn(A, shift=UP * 0.2), run_time=0.6)
        self.au_mot("une économie sûre")
        self.play(FadeIn(la[1], shift=UP * 0.1), run_time=0.4)
        self.au_mot("500 euros")
        self.play(FadeIn(la[0], scale=1.6), run_time=0.4)
        self.au_mot("par an")
        self.play(FadeIn(la[2], shift=UP * 0.1), run_time=0.4)
        self.au_mot("Contrat B")
        self.play(FadeIn(B, shift=UP * 0.2), run_time=0.6)
        self.au_mot("2 000 euros")
        self.play(FadeIn(lb[0], scale=1.6), run_time=0.4)
        self.au_mot("probabilité de 0,3")
        self.play(FadeIn(lb[1], shift=UP * 0.1), run_time=0.4)
        self.au_mot("rien sinon")
        self.play(FadeIn(lb[2], shift=UP * 0.1), run_time=0.4)
        self.attendre_voix()

    # ── 02 : l'espérance de B, avec sa loi ──────────────────────────────────

    def ecran_esperance(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-esperance")
        self.titre_ecran("L'espérance de B")
        B = self.carte_pleine("B", P(-4.45, -0.2), 3.9, 3.9)
        tab = self.tableau([["2 000", "0"], ["0,3", "0,7"]])
        self.play(FadeIn(B, shift=RIGHT * 0.2), FadeIn(tab, shift=DOWN * 0.1), run_time=0.6)
        l1 = self.gauche(self.calcul([("E(B)", JAUNE_TITRE), ("=", WHITE), ("2 000", WHITE), ("×", WHITE),
                                      ("0,3", BLEU_CALCUL), ("+", WHITE), ("0", WHITE), ("×", WHITE),
                                      ("0,7", BLEU_CALCUL)], 40), -0.3)
        self.au_mot("2 000 fois 0,3")
        self.play(tab.poser(0, 0), tab.poser(1, 0), *tab.allumer(0), Indicate(B.lignes[0], color=COUL_B),
                  run_time=0.5)
        self.play(FadeIn(l1[:2]), TransformFromCopy(tab.val[0][0], l1[2]), FadeIn(l1[3]),
                  TransformFromCopy(tab.val[1][0], l1[4]), run_time=0.6)
        self.au_mot("plus 0 fois")
        self.play(*tab.eteindre(0), *tab.allumer(1), tab.poser(0, 1), Indicate(B.lignes[2], color=ROUGE_ERREUR),
                  FadeIn(l1[5]), run_time=0.45)
        self.play(TransformFromCopy(tab.val[0][1], l1[6]), FadeIn(l1[7]), run_time=0.35)
        self.au_mot("0,7")
        self.play(tab.poser(1, 1), run_time=0.35)
        self.play(TransformFromCopy(tab.val[1][1], l1[8]), run_time=0.4)
        self.au_mot("600 euros")
        l2 = self.calcul([("=", WHITE), ("600 €", JAUNE_TITRE)], 52, buff=0.32).move_to(P(0, -1.35))
        l2.align_to(l1[1], LEFT)
        cadre = SurroundingRectangle(l2[1], color=JAUNE_TITRE, buff=0.16, stroke_width=4, corner_radius=0.08)
        self.play(*tab.eteindre(1), FadeIn(l2[0]), FadeIn(l2[1], scale=1.8), run_time=0.45)
        self.play(Create(cadre), run_time=0.3)
        self.insister(l2[1], 0.25)
        self.attendre_voix()

    # ── 03 : comparer : la balance penche vers B ────────────────────────────

    def ecran_comparer(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-comparer")
        self.titre_ecran("Comparer")
        b = Balance(pivot=P(-0.6, 1.3), L=2.7, haut=2.7, d=1.25)
        self.play(FadeIn(b, scale=0.8), run_time=0.5)
        pa = b.charger(0, poids("A : 500 €", COUL_A, 34))
        pb = b.charger(1, poids("B : 600 €", COUL_B, 34))
        pa.set_opacity(0)
        pb.set_opacity(0)
        self.au_mot("A rapporte 500")
        self.play(pa.animate.set_opacity(1), run_time=0.4)
        self.au_mot("en moyenne 600")
        self.play(pb.animate.set_opacity(1), run_time=0.4)
        moy = self.t("en moyenne", 26, COUL_B)
        moy.add_updater(lambda m: m.next_to(b.plateaux[1][2], DOWN, buff=0.12))
        self.add(moy)
        self.play(b.pencher(-0.2), run_time=1.0, rate_func=rate_functions.ease_out_bounce)
        self.au_mot("Sur de nombreuses")
        c1 = self.t("Sur de nombreuses années :", 34)
        c2 = self.t("B est plus intéressant", 34, VERT_OK, BOLD)
        VGroup(c1, c2).arrange(DOWN, buff=0.18).move_to(P(-0.6, -2.55))
        self.play(FadeIn(c1, shift=UP * 0.1), run_time=0.4)
        self.au_mot("B est plus")
        self.play(FadeIn(c2, shift=UP * 0.1), Indicate(pb, color=VERT_OK), run_time=0.6)
        self.attendre_voix()

    # ── 04 : le risque : 10 années, 7 sans rien ─────────────────────────────

    def ecran_risque(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-risque")
        self.titre_ecran("Le risque de B")
        an = Annees(centre=P(-0.6, 1.1))
        self.play(LaggedStart(*[FadeIn(c, scale=0.6) for c in an.cases], lag_ratio=0.08), run_time=0.6)
        for n, c in enumerate(an.cases):
            if n in Annees.PLEINES:
                pc = an.pieces[Annees.PLEINES.index(n)]
                self.play(c.animate.set_fill(COUL_B, 0.9), FadeIn(pc, scale=1.8), run_time=0.09)
            else:
                cr = an.croix[n - sum(1 for p in Annees.PLEINES if p < n)]
                self.play(c.animate.set_fill(VIDE, 1), Create(cr), run_time=0.09)
        self.au_mot("7 années sur 10")
        l1 = suite(self.t("7 années sur 10", 40, ROUGE_ERREUR, BOLD), self.t(": on ne gagne rien", 38), buff=0.2)
        l1.move_to(P(-0.6, -0.75))
        self.play(FadeIn(l1[0], scale=1.4), *[Indicate(c, color=ROUGE_ERREUR, scale_factor=1.12)
                                             for c in an.vides()], run_time=0.7)
        self.au_mot("on ne gagne rien")
        self.play(FadeIn(l1[1], shift=LEFT * 0.2), run_time=0.4)
        self.au_mot("L'espérance dit")
        l2 = suite(self.t("L'espérance :", 36, JAUNE_TITRE, BOLD), self.t("ce qui se passe en moyenne", 36, VERT_OK),
                   buff=0.2).move_to(P(-0.6, -1.7))
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.5)
        self.au_mot("pas chaque année")
        l3 = self.t("pas chaque année", 38, ROUGE_ERREUR, BOLD).next_to(l2, DOWN, buff=0.3).align_to(l2[1], LEFT)
        self.play(FadeIn(l3, scale=1.3), run_time=0.4)
        self.insister(l3, 0.25, LEFT)
        self.attendre_voix()

    # ── 05 : le piège : la plus grosse somme ────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-piege")
        self.titre_ecran("Le piège")
        A = self.carte_pleine("A", P(-3.6, 0.55), 4.2, 3.6)
        B = self.carte_pleine("B", P(1.1, 0.55), 4.2, 3.6)
        self.add(A, B)
        self.au_mot("la plus grosse somme")
        l1 = self.gauche(self.t("La plus grosse somme ?", 38, ORANGE_RETENUE), -1.85).set_x(-1.25)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.5)
        self.au_mot("2 000 euros")
        rond = SurroundingRectangle(B.lignes[0], color=ROUGE_ERREUR, buff=0.12, stroke_width=5, corner_radius=0.1)
        self.play(Create(rond), run_time=0.4)
        self.insister(B.lignes[0], 0.25)
        barre = Line(l1.get_left() + LEFT * 0.1, l1.get_right() + RIGHT * 0.1, color=ROUGE_ERREUR, stroke_width=7)
        self.play(Create(barre), run_time=0.4)
        self.au_mot("Ce qui compte")
        l2 = suite(self.t("Ce qui compte :", 36), self.t("somme × probabilité", 40, VERT_OK, BOLD), buff=0.22)
        l2.move_to(P(-1.25, -2.75))
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.4)
        self.au_mot("la somme multipliée")
        self.play(FadeIn(l2[1], scale=1.3), FadeOut(rond), Indicate(A.lignes[0], color=VERT_OK),
                  Indicate(B.lignes[1], color=VERT_OK), run_time=0.7)
        self.attendre_voix()

    # ── 06 : défi : le contrat C ────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("06-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        C = Carte("C", COUL_C, P(-4.45, -0.2), 3.9, 3.9)
        lc = self.lignes_C(C)
        tab = self.tableau([["1 000", "−200"], ["0,6", "?"]])
        tab.val[1][1].set_color(ORANGE_RETENUE)
        self.au_mot("Contrat C")
        self.play(FadeIn(C, shift=RIGHT * 0.2), FadeIn(tab, shift=DOWN * 0.1), run_time=0.6)
        self.au_mot("1 000 euros")
        self.play(FadeIn(lc[0], scale=1.6), tab.poser(0, 0), run_time=0.45)
        self.au_mot("0,6")
        self.play(FadeIn(lc[1], shift=UP * 0.1), tab.poser(1, 0), run_time=0.45)
        self.au_mot("perte de 200")
        self.play(FadeIn(lc[2], shift=UP * 0.1), tab.poser(0, 1), run_time=0.45)
        self.play(tab.poser(1, 1), run_time=0.3)
        self.au_mot("Quelle est son espérance")
        q = self.gauche(self.calcul([("E(C)", JAUNE_TITRE), ("=", WHITE), ("?", ORANGE_RETENUE)], 60), -0.45)
        self.play(FadeIn(q, scale=1.3), run_time=0.5)
        self.insister(q[2], 0.25)
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=36)))
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("06b-correction")
        self.titre_ecran("Correction")
        C = self.carte_pleine("C", P(-4.45, -0.2), 3.9, 3.9)
        tab = self.tableau([["1 000", "−200"], ["0,6", "0,4"]])
        tab.tout(lignes=[0])
        tab.add(tab.val[1][0])
        self.add(C, tab)
        l1 = self.gauche(self.calcul([("E(C)", JAUNE_TITRE), ("=", WHITE), ("1 000", WHITE), ("×", WHITE),
                                      ("0,6", BLEU_CALCUL), ("−", WHITE), ("200", WHITE), ("×", WHITE),
                                      ("0,4", BLEU_CALCUL)], 40), -0.3)
        self.au_mot("1 000 fois 0,6")
        self.play(*tab.allumer(0), FadeIn(l1[:2]), TransformFromCopy(tab.val[0][0], l1[2]), FadeIn(l1[3]),
                  TransformFromCopy(tab.val[1][0], l1[4]), run_time=0.6)
        self.au_mot("moins 200 fois")
        self.play(*tab.eteindre(0), *tab.allumer(1), FadeIn(l1[5]), FadeIn(l1[6], scale=1.4), FadeIn(l1[7]),
                  Indicate(C.lignes[2], color=ROUGE_ERREUR), run_time=0.55)
        self.au_mot("0,4")
        self.play(tab.poser(1, 1), run_time=0.35)
        self.play(TransformFromCopy(tab.val[1][1], l1[8]), run_time=0.4)
        l2 = self.calcul([("=", WHITE), ("600", WHITE), ("−", WHITE), ("80", WHITE), ("=", WHITE),
                          ("520 €", JAUNE_TITRE)], 44, buff=0.24).move_to(P(0, -1.3))
        l2.align_to(l1[1], LEFT)
        self.au_mot("600 moins 80")
        self.play(*tab.eteindre(1), FadeIn(l2[:4], shift=UP * 0.1), run_time=0.5)
        self.au_mot("520 euros")
        cadre = SurroundingRectangle(l2[5], color=JAUNE_TITRE, buff=0.15, stroke_width=4, corner_radius=0.08)
        self.play(FadeIn(l2[4]), FadeIn(l2[5], scale=1.8), run_time=0.4)
        self.play(Create(cadre), run_time=0.3)
        self.au_mot("B reste le meilleur")
        fin = self.chute("B reste le meilleur en moyenne", color=VERT_OK, font_size=38)
        self.play(FadeIn(fin, shift=UP * 0.1), run_time=0.5)
        self.attendre_voix()

    # ── 07 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)))
        fs = 42
        items = [
            (self.t("Pour comparer deux options,", fs), self.t("on compare leurs espérances", fs, JAUNE_TITRE, BOLD)),
            (suite(self.t("L'espérance :", fs, JAUNE_TITRE, BOLD), self.t("le gain moyen", fs, VERT_OK, BOLD),
                   buff=0.18), self.t("sur le long terme", fs)),
            (self.t("Pas le gain sûr", fs, ROUGE_ERREUR, BOLD), None),
        ]
        blocs = VGroup()
        for haut, bas in items:
            txt = VGroup(haut, bas).arrange(DOWN, aligned_edge=LEFT, buff=0.16) if bas else VGroup(haut)
            blocs.add(VGroup(self.coche(), txt).arrange(RIGHT, buff=0.3, aligned_edge=UP))
        blocs.arrange(DOWN, aligned_edge=LEFT, buff=0.5)
        if blocs.width > 11.0:
            blocs.scale_to_fit_width(11.0)
        blocs.move_to(P(-0.8, -0.1))
        for b in blocs:
            b[0].shift(DOWN * 0.12)
        reperes = [("Pour comparer", "on compare leurs"), ("L'espérance donne", "sur le long terme"),
                   ("pas le gain sûr", None)]
        for (m1, m2), b in zip(reperes, blocs):
            self.au_mot(m1)
            self.play(FadeIn(b[1][0], shift=RIGHT * 0.2), *([] if m2 else [Create(b[0])]), run_time=0.5)
            if m2:
                self.au_mot(m2)
                self.play(FadeIn(b[1][1], shift=RIGHT * 0.2), Create(b[0]), run_time=0.5)
        self.attendre_voix(marge=1.0)

    # ── 08 : l'écran de fin (règle du 19/10) ────────────────────────────────

    def page_abonnement(self, voix="08-abonne"):
        """« Entraîne-toi sur » + eleveai.fr encadré, puis « Abonne-toi ! » +
        @eleveai974. Rien d'autre : la voix ne parle plus du coach."""
        self.clear()
        self.dire(voix)
        self.add_mascotte(scale=0.9)
        entraine = self.t("Entraîne-toi sur", 46, JAUNE_TITRE).move_to(P(0, 2.05))
        site = self.t("eleveai.fr", 62, BLEU_CALCUL).move_to(P(0, 1.0))
        cadre = SurroundingRectangle(site, color=BLEU_CALCUL, buff=0.26, stroke_width=3)
        abonne = self.t("Abonne-toi !", 44, VERT_OK).move_to(P(0, -0.6))
        poignee = self.t("@eleveai974", 48, VERT_OK).move_to(P(0, -1.6))
        self.play(Write(entraine), run_time=0.6)
        self.au_mot("éleveai")
        self.play(GrowFromCenter(site), Create(cadre), run_time=0.6)
        self.au_mot("abonne-toi")
        self.play(FadeIn(abonne, shift=UP * 0.15), run_time=0.4)
        self.play(GrowFromCenter(poignee), run_time=0.4)
        self.play(Flash(poignee, color=VERT_OK, line_length=0.3))
        self.attendre_voix(marge=1.4)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_esperance()
        self.ecran_comparer()
        self.ecran_risque()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement()


class ProbaVaDecisionSTMG(ProbaVaDecisionBase):
    identite = "Maths STMG — EleveAI"
