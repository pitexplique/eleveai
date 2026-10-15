# analyse_graphique_2de.py
# EleveAI — Maths seconde — Analyse graphique d'une fonction
# (notion analyse_graphique_2de), AVEC VOIX. CEINTURE VERTE.
#
# ⭐ 12/10/2026 : la paysage de la notion créée le même jour dans le coach
# (image, antécédents, tableau de signes, tableau de variations, équation,
# inéquation — tout lu sur une courbe). Voix validée (« go ») :
# manim/voix/seconde-analyse-graphique.json (débit −4).
# L'image : une nuit de juillet au sommet du Piton des Neiges. T(t) en °C,
# t en heures depuis 20 h, sur [0 ; 10]. Valeurs aux graduations :
#   6, 4, 3, 2, 0, −1, −2, −3, −2, 0, 3
# zéros en 4 (minuit) et 9 (5 h), minimum −3 en 7 (3 h). Tout se lit sur le
# quadrillage, comme dans le coach (même interpolation monotone).
#
# ⭐ UNE SEULE COURBE pour toute la vidéo : elle reste à gauche, chaque écran
# pose ses tracés et ses notes à droite, puis les retire.
#
# Mapping micro-compétences (coach 2de) → écrans :
# - graph_image               → 02-image, 04-piege-axes
# - graph_antecedent          → 03-antecedent
# - graph_resoudre_equation   → 05-equation
# - graph_tableau_signes      → 06-signes, 06b-piege-signes
# - graph_tableau_variations  → 07-variations, 07b-piege-tableaux
# - graph_resoudre_inequation → 08-inequation, 08b-rediger, 09-defi
#
# Rendu : python -m manim render -qh --disable_caching manim/scripts/seconde/analyse_graphique_2de.py AnalyseGraphique -o eleveai-maths-seconde-analyse-graphique --media_dir manim/scripts/seconde/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parent))

from manim import *

from charte import *
from signes_expression_2de import MOINS, PLUS, NotionSecondeVoix, Tableau, echelle_ceintures

YS = [6, 4, 3, 2, 0, -1, -2, -3, -2, 0, 3]

OBJECTIFS = [
    "Lire une image et des antécédents",
    "Dresser le tableau de signes et le tableau de variations",
    "Résoudre graphiquement une équation et une inéquation",
]


def _pentes():
    d = [YS[i + 1] - YS[i] for i in range(len(YS) - 1)]
    m = []
    for i in range(len(YS)):
        if i == 0:
            m.append(d[0])
        elif i == len(YS) - 1:
            m.append(d[-1])
        elif d[i - 1] * d[i] <= 0:
            m.append(0.0)
        else:
            m.append(2 / (1 / d[i - 1] + 1 / d[i]))
    return m


M = _pentes()


def T(t):
    """L'interpolation monotone de Fritsch–Carlson — la même que le coach."""
    i = min(max(int(t), 0), len(YS) - 2)
    s = t - i
    return ((2 * s**3 - 3 * s**2 + 1) * YS[i] + (s**3 - 2 * s**2 + s) * M[i]
            + (-2 * s**3 + 3 * s**2) * YS[i + 1] + (s**3 - s**2) * M[i + 1])


class AnalyseGraphique(NotionSecondeVoix):
    nom_voix = "seconde-analyse-graphique"
    XN = 3.75  # le centre de la colonne de droite

    def t(self, texte, font_size=32, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    # ── la colonne de droite ────────────────────────────────────────────────

    def note(self, texte, y, color=WHITE, font_size=30):
        n = self.t(texte, font_size, color)
        if n.width > 6.2:
            n.scale_to_fit_width(6.2)
        n.move_to([self.XN, y, 0])
        self.play(FadeIn(n, shift=UP * 0.1))
        self._notes.add(n)
        return n

    def marque(self, *mobs, anim=Create):
        self.play(*[anim(m) for m in mobs])
        self._marques.add(*mobs)

    def nettoyer(self):
        tout = VGroup(*self._notes, *self._marques)
        if self._titre is not None:
            tout.add(self._titre)
        if len(tout):
            self.play(FadeOut(tout), run_time=0.5)
        self._notes, self._marques, self._titre = VGroup(), VGroup(), None

    def titre(self, texte, color=JAUNE_TITRE):
        self._titre = self.t(texte, 36, color)
        if self._titre.width > 6.4:
            self._titre.scale_to_fit_width(6.4)
        self._titre.move_to([self.XN, 3.35, 0])
        self.play(Write(self._titre))

    def p(self, t, y):
        return self.ax.c2p(t, y)

    def pointille(self, a, b, color=ROUGE_ERREUR):
        return DashedLine(a, b, color=color, stroke_width=3, dash_length=0.12)

    # ── 00 ──────────────────────────────────────────────────────────────────

    def page_de_garde(self, voix="00-garde"):
        self.clear()
        self.add_mascotte(scale=0.7)
        self.dire(voix)
        titre = self.t("Analyse graphique", 54, JAUNE_TITRE).to_edge(UP, buff=0.35)
        identite = self.t(self.identite, 26).next_to(titre, DOWN, buff=0.2)
        q = self.t("À quelle heure va-t-il geler ?", 38, BLEU_CALCUL).move_to([-0.6, 1.55, 0])
        piton = Polygon([-6.6, -2.65, 0], [-3.2, 0.2, 0], [-2.6, -0.1, 0], [0.2, -2.65, 0],
                        color="#64748B").set_fill("#334155", 1)
        neige = Polygon([-3.2, 0.2, 0], [-3.9, -0.5, 0], [-3.3, -0.35, 0], [-2.9, -0.6, 0], [-2.6, -0.1, 0],
                        color=WHITE).set_fill(WHITE, 1)
        lieu = self.t("Piton des Neiges, 3 070 m", 26).move_to([-3.2, 0.6, 0])
        self.play(Write(titre), FadeIn(identite), FadeIn(q), FadeIn(piton), FadeIn(neige), run_time=1.0)
        self.play(FadeIn(lieu))
        self.au_mot("il fait 6 degrés")
        self.play(FadeIn(self.t("20 h : 6 °C", 40, BLEU_CALCUL).move_to([2.6, 0.45, 0])))
        self.au_mot("Et pendant combien")
        self.play(FadeIn(self.t("Et pendant combien de temps ?", 34, MOINS).move_to([2.6, -0.4, 0])))
        self.au_mot("Les maths, ça sert")
        echelle = echelle_ceintures("verte", largeur=0.55, buff=0.12).move_to([3.0, -1.75, 0])
        self.play(FadeIn(echelle),
                  Write(self.chute("Les maths, ça sert à rien… sauf à savoir quand il gèle.", color=JAUNE_TITRE, font_size=28)))
        self.attendre_voix()

    # ── 01 : la courbe, qui restera ─────────────────────────────────────────

    def ecran_courbe(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-courbe")
        self._notes, self._marques, self._titre = VGroup(), VGroup(), None
        ax = Axes(x_range=[0, 10.6, 1], y_range=[-4, 7, 1], x_length=6.6, y_length=5.8, tips=False,
                  axis_config={"stroke_width": 2}).move_to([-3.4, -0.45, 0])
        self.ax = ax
        grille = VGroup(*[Line(ax.c2p(x, -4), ax.c2p(x, 7), stroke_width=1, color=GREY_D) for x in range(1, 11)],
                        *[Line(ax.c2p(0, y), ax.c2p(10.6, y), stroke_width=1, color=GREY_D) for y in range(-4, 8) if y])
        labs = VGroup(*[self.t(str(x), 20).next_to(ax.c2p(x, 0), DOWN, buff=0.1) for x in range(1, 11)],
                      self.t("0", 20).next_to(ax.c2p(0, 0), DL, buff=0.06),
                      *[self.t(str(y).replace("-", "−"), 20).next_to(ax.c2p(0, y), LEFT, buff=0.1) for y in range(-3, 7) if y],
                      self.t("t (h)", 22).next_to(ax.c2p(10.6, 0), UP, buff=0.12),
                      self.t("T (°C)", 22).next_to(ax.c2p(0, 7), RIGHT, buff=0.12))
        self.courbe = ax.plot(T, x_range=[0, 10], color=WHITE, stroke_width=5)
        self.titre("1. La courbe de la température")
        self.play(FadeIn(grille), Create(ax), FadeIn(labs))
        self.au_mot("Voici la courbe")
        self.play(Create(self.courbe), run_time=2.0)
        self.au_mot("t égale 0, c'est 20 heures")
        self.note("t = 0  →  20 h", 2.2, BLEU_CALCUL)
        self.au_mot("t égale 10, c'est 6 heures")
        self.note("t = 10  →  6 h du matin", 1.45, BLEU_CALCUL)
        self.au_mot("Chaque point de la courbe")
        self.note("un point = (heure ; température)", 0.4, JAUNE_TITRE)
        self.note("abscisse : l'heure", -0.35)
        self.note("ordonnée : la température", -1.1)
        self.attendre_voix()

    # ── 02 ──────────────────────────────────────────────────────────────────

    def ecran_image(self):
        self.dire("02-image")
        self.nettoyer()
        self.titre("2. L'image")
        self.au_mot("à 22 heures, donc à t égale 2")
        self.note("22 h  →  t = 2", 2.2, BLEU_CALCUL)
        self.au_mot("On part de 2")
        self.marque(Dot(self.p(2, 0), color=BLEU_CALCUL, radius=0.09))
        self.au_mot("on monte jusqu'à la courbe")
        self.marque(self.pointille(self.p(2, 0), self.p(2, 3)))
        self.marque(Dot(self.p(2, 3), color=JAUNE_TITRE, radius=0.1), anim=FadeIn)
        self.au_mot("on va lire sur l'axe vertical")
        self.marque(self.pointille(self.p(2, 3), self.p(0, 3)))
        self.marque(Circle(radius=0.22, color=VERT_OK).move_to(self.p(0, 3)))
        self.au_mot("T de 2 égale 3")
        self.note("T(2) = 3", 1.2, VERT_OK, font_size=44)
        self.au_mot("L'image se lit toujours")
        self.note("l'image se lit sur l'axe vertical", 0.2, JAUNE_TITRE)
        self.attendre_voix()

    # ── 03 ──────────────────────────────────────────────────────────────────

    def ecran_antecedent(self):
        self.dire("03-antecedent")
        self.nettoyer()
        self.titre("3. Les antécédents")
        self.au_mot("À quelle heure fait-il moins 2")
        self.note("T(t) = −2 : à quelle heure ?", 2.2, BLEU_CALCUL)
        self.au_mot("On part de moins 2")
        self.marque(Dot(self.p(0, -2), color=BLEU_CALCUL, radius=0.09))
        self.au_mot("on trace une droite horizontale")
        self.marque(self.pointille(self.p(0, -2), self.p(10.4, -2)))
        self.au_mot("Il y en a deux")
        for x in (6, 8):
            self.marque(Dot(self.p(x, -2), color=JAUNE_TITRE, radius=0.1), anim=FadeIn)
            self.marque(self.pointille(self.p(x, -2), self.p(x, 0), color=JAUNE_TITRE))
        self.note("t = 6  et  t = 8", 1.35, JAUNE_TITRE, font_size=38)
        self.au_mot("Moins 2 a deux antécédents")
        self.note("−2 a deux antécédents : 6 et 8", 0.5, VERT_OK)
        self.au_mot("Une image est unique")
        self.note("une image : unique", -0.4)
        self.note("des antécédents : plusieurs… ou aucun", -1.1)
        self.attendre_voix()

    # ── 04 ──────────────────────────────────────────────────────────────────

    def ecran_piege_axes(self):
        self.dire("04-piege-axes")
        self.nettoyer()
        self.titre("Piège n° 1 : le mauvais axe", ORANGE_RETENUE)
        self.au_mot("L'image, c'est une ordonnée")
        axe_v = Line(self.p(0, -4), self.p(0, 7), color=VERT_OK, stroke_width=8)
        self.marque(axe_v)
        self.note("image  =  ordonnée (axe vertical)", 2.1, VERT_OK)
        self.au_mot("Un antécédent, c'est une abscisse")
        axe_h = Line(self.p(0, 0), self.p(10.6, 0), color=BLEU_CALCUL, stroke_width=8)
        self.marque(axe_h)
        self.note("antécédent  =  abscisse (axe horizontal)", 1.3, BLEU_CALCUL)
        self.au_mot("Si on te demande T de 2")
        self.note("T(2) = 2 ?", 0.2, ROUGE_ERREUR, font_size=44)
        self.au_mot("tu as lu le mauvais axe")
        self.note("faux : 2 est l'abscisse ; T(2) = 3", -0.7, ROUGE_ERREUR)
        self.attendre_voix()

    # ── 05 ──────────────────────────────────────────────────────────────────

    def ecran_equation(self):
        self.dire("05-equation")
        self.nettoyer()
        self.titre("4. Résoudre T(t) = 0")
        self.au_mot("Résoudre l'équation")
        self.note("T(t) = 0 : quand fait-il 0 °C ?", 2.2, BLEU_CALCUL)
        self.au_mot("On regarde où la courbe coupe")
        for x in (4, 9):
            d = Dot(self.p(x, 0), color=JAUNE_TITRE, radius=0.11)
            self.marque(d, anim=FadeIn)
            self.play(Flash(d, color=JAUNE_TITRE), run_time=0.5)
        self.note("t = 4  et  t = 9", 1.35, JAUNE_TITRE, font_size=38)
        self.au_mot("Les solutions sont 4 et 9")
        self.note("S = {4 ; 9}", 0.45, VERT_OK, font_size=44)
        self.au_mot("à minuit, et à 5 heures")
        self.note("t = 4 → minuit     t = 9 → 5 h", -0.5)
        self.attendre_voix()

    # ── 06 ──────────────────────────────────────────────────────────────────

    def ecran_signes(self):
        self.dire("06-signes")
        self.nettoyer()
        self.titre("5. Le tableau de signes")
        self.au_mot("Au-dessus de l'axe")
        haut = VGroup(self.ax.plot(T, x_range=[0, 4], color=PLUS, stroke_width=8),
                      self.ax.plot(T, x_range=[9, 10], color=PLUS, stroke_width=8))
        self.marque(haut)
        self.au_mot("En dessous, elle est négative")
        bas = self.ax.plot(T, x_range=[4, 9], color=MOINS, stroke_width=8)
        self.marque(bas)
        self.au_mot("Sur l'axe : zéro")
        self.marque(*[Dot(self.p(x, 0), color=WHITE, radius=0.1) for x in (4, 9)], anim=FadeIn)
        Tb = Tableau(["0", "4", "9", "10"], centre_x=self.XN, y_haut=2.75, larg_lab=1.1, pas=1.45, h=0.72, fs=30, marge=0.35)
        self.au_mot("Première ligne")
        l0 = Tb.ligne(0, "t")
        self.marque(l0)
        for i in range(4):
            self.marque(Tb.valeur(i, JAUNE_TITRE if i in (1, 2) else WHITE), anim=FadeIn)
        self.note("les bornes, et les zéros", 0.75, JAUNE_TITRE, font_size=28)
        self.au_mot("Deuxième ligne")
        self.marque(Tb.ligne(1, "T(t)"))
        for k, s in [(1, "+"), (2, "0"), (3, "−"), (4, "0"), (5, "+")]:
            self.marque(Tb.case(1, k, s), anim=FadeIn)
        self.attendre_voix()

    def ecran_piege_signes(self):
        self.dire("06b-piege-signes")
        self.play(FadeOut(self._notes))
        self._notes = VGroup()
        self.au_mot("entre 0 et 4, la courbe descend")
        jaune = self.ax.plot(T, x_range=[0, 4], color=JAUNE_TITRE, stroke_width=10)
        self.marque(jaune)
        self.note("de 0 à 4 : la courbe descend…", 0.6, JAUNE_TITRE)
        self.au_mot("Pourtant, la température est positive")
        self.note("… mais T(t) > 0 : au-dessus de l'axe", -0.15, PLUS)
        self.au_mot("Descendre, ce n'est pas")
        self.note("descendre ≠ être négatif", -1.0, ORANGE_RETENUE, font_size=36)
        self.attendre_voix()

    # ── 07 ──────────────────────────────────────────────────────────────────

    def tableau_variations(self, cx=3.75, y_haut=2.75):
        larg_lab, pas, marge, h0, h1 = 1.1, 2.0, 0.45, 0.72, 1.7
        xg = cx - (larg_lab + 2 * pas + 2 * marge) / 2
        xs = xg + larg_lab
        xd = xs + 2 * pas + 2 * marge
        xv = [xs + marge + i * pas for i in range(3)]
        y0 = y_haut - h0 / 2
        y1 = y_haut - h0 - h1 / 2
        cadre0 = Rectangle(width=xd - xg, height=h0).move_to([(xg + xd) / 2, y0, 0]).set_stroke(WHITE, 2)
        cadre1 = Rectangle(width=xd - xg, height=h1).move_to([(xg + xd) / 2, y1, 0]).set_stroke(WHITE, 2)
        sep = Line([xs, y_haut, 0], [xs, y_haut - h0 - h1, 0], stroke_width=2)
        lab0 = self.t("t", 30).move_to([(xg + xs) / 2, y0, 0])
        lab1 = self.t("T(t)", 30).move_to([(xg + xs) / 2, y1, 0])
        vals0 = [self.t(v, 30, JAUNE_TITRE if v == "7" else WHITE).move_to([x, y0, 0]) for v, x in zip(["0", "7", "10"], xv)]
        hauts = [(xv[0], y1 + 0.55, "6"), (xv[1], y1 - 0.55, "−3"), (xv[2], y1 + 0.55, "3")]
        vals1 = [self.t(v, 32, BLEU_CALCUL).move_to([x, y, 0]) for x, y, v in hauts]
        f1 = Arrow(vals1[0].get_corner(DR), vals1[1].get_corner(UL), buff=0.12, stroke_width=4, color=MOINS)
        f2 = Arrow(vals1[1].get_corner(UR), vals1[2].get_corner(DL), buff=0.12, stroke_width=4, color=PLUS)
        return VGroup(cadre0, cadre1, sep, lab0, lab1), vals0, vals1, (f1, f2)

    def ecran_variations(self):
        self.dire("07-variations")
        self.nettoyer()
        self.titre("6. Le tableau de variations")
        self.au_mot("dit où la courbe monte")
        self.marque(self.ax.plot(T, x_range=[0, 7], color=MOINS, stroke_width=8),
                    self.ax.plot(T, x_range=[7, 10], color=PLUS, stroke_width=8))
        cadre, vals0, vals1, (f1, f2) = self.tableau_variations()
        self.au_mot("Première ligne")
        self.marque(cadre)
        for v in vals0:
            self.marque(v, anim=FadeIn)
        self.note("les bornes, et le sommet", -0.15, JAUNE_TITRE, font_size=28)
        self.au_mot("La température descend de 6")
        self.marque(vals1[0], vals1[1], anim=FadeIn)
        self.marque(f1, anim=GrowArrow)
        self.au_mot("puis remonte jusqu'à 3")
        self.marque(vals1[2], anim=FadeIn)
        self.marque(f2, anim=GrowArrow)
        self.au_mot("Le minimum vaut moins 3")
        d = Dot(self.p(7, -3), color=JAUNE_TITRE, radius=0.12)
        self.marque(d, anim=FadeIn)
        self.play(Flash(d, color=JAUNE_TITRE), run_time=0.5)
        self.note("minimum : −3 °C en t = 7 (3 h)", -0.95, VERT_OK)
        self.attendre_voix()

    def ecran_piege_tableaux(self):
        self.dire("07b-piege-tableaux")
        self.nettoyer()
        self.titre("Piège n° 2 : les deux tableaux", ORANGE_RETENUE)
        self.au_mot("Dans le tableau de signes")
        z = VGroup(*[Dot(self.p(x, 0), color=WHITE, radius=0.11) for x in (4, 9)])
        self.marque(z, anim=FadeIn)
        self.note("signes : les ZÉROS", 2.0, PLUS, font_size=36)
        self.note("t : 0  |  4  |  9  |  10", 1.3)
        self.au_mot("Dans le tableau de variations")
        self.marque(Dot(self.p(7, -3), color=JAUNE_TITRE, radius=0.12), anim=FadeIn)
        self.note("variations : les SOMMETS", 0.2, JAUNE_TITRE, font_size=36)
        self.note("t : 0  |  7  |  10", -0.5)
        self.attendre_voix()

    # ── 08 ──────────────────────────────────────────────────────────────────

    def ecran_inequation(self):
        self.dire("08-inequation")
        self.nettoyer()
        self.titre("7. Résoudre T(t) < 0")
        self.au_mot("c'est chercher quand il gèle")
        self.note("T(t) < 0 : quand gèle-t-il ?", 2.2, BLEU_CALCUL)
        self.au_mot("On garde la partie de la courbe sous l'axe")
        self.marque(self.ax.plot(T, x_range=[4, 9], color=MOINS, stroke_width=9))
        seg = Line(self.p(4, 0), self.p(9, 0), color=MOINS, stroke_width=9)
        self.marque(seg)
        self.marque(self.t("]", 44, MOINS).move_to(self.p(4, 0)), self.t("[", 44, MOINS).move_to(self.p(9, 0)), anim=FadeIn)
        self.note("S = ]4 ; 9[", 1.3, VERT_OK, font_size=44)
        self.au_mot("Les crochets sont ouverts")
        self.note("crochets ouverts : T = 0 en 4 et en 9", 0.4)
        self.note("et 0 n'est pas strictement négatif", -0.3)
        self.au_mot("Il gèle de minuit")
        self.note("il gèle de minuit à 5 h : 5 heures", -1.15, JAUNE_TITRE)
        self.attendre_voix()

    def ecran_rediger(self):
        self.dire("08b-rediger")
        self.play(FadeOut(self._notes))
        self._notes = VGroup()
        self.au_mot("Pour rédiger")
        lignes = VGroup(self.t("Par lecture graphique,", 30),
                        self.t("l'ensemble des solutions", 30),
                        self.t("de T(t) < 0 est ]4 ; 9[.", 30, VERT_OK)).arrange(DOWN, buff=0.2, aligned_edge=LEFT)
        lignes.move_to([self.XN, 1.0, 0])
        cadre = SurroundingRectangle(lignes, color=JAUNE_TITRE, buff=0.3)
        self.play(Create(cadre), Write(lignes), run_time=2.0)
        self._notes.add(lignes, cadre)
        self.attendre_voix()

    # ── 09 ──────────────────────────────────────────────────────────────────

    def ecran_defi(self):
        self.dire("09-defi")
        self.nettoyer()
        self.titre("À toi de jouer")
        self.au_mot("Résous graphiquement")
        self.note("Résous  T(t) ≤ −2", 2.0, BLEU_CALCUL, font_size=44)
        self.au_mot("Pendant combien de temps")
        self.note("Combien de temps fait-il", 1.0)
        self.note("−2 °C, ou plus froid ?", 0.35)
        self.au_mot("Mets pause")
        self.note("Mets pause, et cherche !", -0.9, ORANGE_RETENUE, font_size=40)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.dire("09b-correction")
        self.nettoyer()
        self.titre("Correction")
        self.au_mot("On trace la droite horizontale")
        self.marque(self.pointille(self.p(0, -2), self.p(10.4, -2)))
        self.au_mot("Elle coupe la courbe en 6 et en 8")
        for x in (6, 8):
            self.marque(Dot(self.p(x, -2), color=JAUNE_TITRE, radius=0.1), anim=FadeIn)
        self.note("la droite y = −2 coupe en 6 et en 8", 2.2)
        self.au_mot("Entre les deux, la courbe est en dessous")
        self.marque(self.ax.plot(T, x_range=[6, 8], color=MOINS, stroke_width=9))
        self.au_mot("L'inégalité est large")
        self.note("inégalité large : on garde 6 et 8", 1.4, JAUNE_TITRE)
        self.marque(Line(self.p(6, 0), self.p(8, 0), color=MOINS, stroke_width=9))
        self.marque(self.t("[", 44, MOINS).move_to(self.p(6, 0)), self.t("]", 44, MOINS).move_to(self.p(8, 0)), anim=FadeIn)
        self.au_mot("L'ensemble des solutions est l'intervalle fermé")
        self.note("S = [6 ; 8]", 0.5, VERT_OK, font_size=44)
        self.au_mot("de 2 heures à 4 heures")
        self.note("de 2 h à 4 h du matin : 2 heures", -0.4)
        self.attendre_voix()

    def construct(self):
        self.page_de_garde()
        self.page_objectifs(OBJECTIFS)
        self.ecran_courbe()
        self.ecran_image()
        self.ecran_antecedent()
        self.ecran_piege_axes()
        self.ecran_equation()
        self.ecran_signes()
        self.ecran_piege_signes()
        self.ecran_variations()
        self.ecran_piege_tableaux()
        self.ecran_inequation()
        self.ecran_rediger()
        self.ecran_defi()
        self.ecran_correction()
        self.page_finale(
            points=[
                "Image : axe vertical ; antécédent : axe horizontal",
                "Signes : les zéros ; variations : les sommets",
                "Inéquation : le bon côté, les bons crochets",
            ],
            rappel="Piège : « la courbe descend » ne veut pas dire « négative ».",
            voix="10-finale",
        )
        self.page_abonnement(voix="11-abonne")
