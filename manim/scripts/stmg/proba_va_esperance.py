# proba_va_esperance.py
# EleveAI — Maths STMG ET Maths 1re spécialité — série « Probabilités » :
# L'ESPÉRANCE, le gain moyen (micros : va_esp_calculer en STMG, va_esperance
# en 1re spé), AVEC VOIX.
# Paysage 16:9, CEINTURE BLEUE. Short jumeau : proba_va_esperance_short.py
# (ceinture jaune, un dé : 21 ÷ 6 = 3,5, « aucune face ne donne 3,5 »).
#
# ⭐⭐ UNE voix, UN script, DEUX rendus (Frédéric, 18/10 : « pour vendre en
# pack ») : ProbaVaEsperanceBase porte toutes les scènes ; les deux
# sous-classes ne changent que l'identité. La voix ne cite aucune classe.
#
# ⭐ La figure est le TABLEAU DE LOI du coach (canvasLoi → tableau_donnees :
# en-tête sombre « xᵢ | 0 | 2 | 10 », ligne « P(X = xᵢ) » au libellé bleu
# clair, cases blanches, colonne allumée en jaune), à côté de la ROUE de la
# kermesse (style de la roue du coach : carte blanche, parts cerclées d'encre,
# départ en haut dans le sens horaire, étiquettes blanches liserées).
# Secteurs proportionnels : 0 € (0,6), 2 € (0,3), 10 € (0,1, le petit).
#   · 03 : une 3e ligne « xᵢ × P » se remplit colonne par colonne (0 ; 0,6 ; 1),
#     puis la somme 1,6 = E(X) ;
#   · 05 : « (0 + 2 + 10) ÷ 3 = 4 » barré, le secteur 10 € clignote.
# ⛔ PAS D'ÉCART : chaque nombre n'apparaît que quand la voix le dit.
#
# Écrans : 00 garde · 01 la roue et sa loi · 02 la formule · 03 le calcul ·
# 04 le sens (1,60 € par partie) · 05 le piège · 06 défi (0 € / 4 €) ·
# 06b correction · 07 ce que tu as appris · 08 fin « Entraîne-toi sur eleveai.fr ».
#
# Voix : manim/voix/stmg-premiere-spe-proba-va-esperance.json (Julie, débit −7).
# Rendus (media à soi : des rendus parallèles dans le même media → WinError 32) :
# python -m manim render -qh --disable_caching manim/scripts/stmg/proba_va_esperance.py ProbaVaEsperanceSTMG -o eleveai-maths-stmg-proba-va-esperance --media_dir manim/scripts/stmg/media-va_esperance
# python -m manim render -qh --disable_caching manim/scripts/stmg/proba_va_esperance.py ProbaVaEsperancePremiereSpe -o eleveai-maths-premiere-proba-va-esperance --media_dir manim/scripts/stmg/media-va_esperance
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/proba_va_esperance_short.py ShortProbaVaEsperanceSTMG -o eleveai-maths-stmg-proba-va-esperance-short --media_dir manim/scripts/stmg/media-va_esperance
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/proba_va_esperance_short.py ShortProbaVaEsperancePremiereSpe -o eleveai-maths-premiere-proba-va-esperance-short --media_dir manim/scripts/stmg/media-va_esperance
# Puis copier dans manim/sorties/stmg/maths/probabilites/25-va-esperance/ et
# manim/sorties/premiere/maths/probabilites/25-va-esperance/.

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
from proba_pc_conditionnelle import ANNEAU, BORD, ENCRE, ENTETE, LIBELLE, SURLIGNE, suite  # noqa: E402

# Les couleurs de la roue (palette du coach : resolveColor)
COUL_0 = "#94A3B8"      # 0 € : gris
COUL_2 = "#3B82F6"      # 2 € : bleu
COUL_10 = "#F97316"     # 10 € : orange (le petit secteur)
COUL_4 = "#22C55E"      # 4 € (le défi) : vert
CARTE_BORD = "#E2E8F0"
COMMUN = "#FDE047"      # le clignotement


def P(x, y):
    return np.array([x, y, 0.0])


def etiquette_blanche(texte, fs):
    t = Text(texte, font_size=fs, color=WHITE, weight=BOLD)
    t.set_stroke(ENCRE, width=4, background=True)
    return t


def xi(fs=28, color=WHITE, weight=BOLD):
    """« xᵢ » : un x et un petit i en indice (dessiné, sans dépendre de la police)."""
    x = Text("x", font_size=fs, color=color, weight=weight)
    i = Text("i", font_size=int(fs * 0.62), color=color, weight=weight)
    i.next_to(x, RIGHT, buff=0.02).align_to(x, DOWN).shift(DOWN * fs * 0.0045)
    return VGroup(x, i)


class RoueKermesse(VGroup):
    """La roue de la kermesse : secteurs proportionnels à leurs probabilités,
    du haut dans le sens horaire. secteurs = [(étiquette, proba, couleur), …].
    self.parts[k] / self.etiq[k] ; self.disque = parts + étiquettes (ce qui tourne).
    Les étiquettes (des nombres) ne sont PAS ajoutées : on les pose quand la voix les dit."""

    def __init__(self, secteurs, centre=P(-4.55, -0.35), r=1.6, fs=30, carte=True, **kw):
        super().__init__(**kw)
        self.c, self.r = centre, r
        self.parts, self.etiq = VGroup(), VGroup()
        self.angles = []
        a0 = PI / 2
        for nom, p, coul in secteurs:
            ang = TAU * p
            s = AnnularSector(inner_radius=0, outer_radius=r, angle=-ang, start_angle=a0, fill_color=coul,
                              fill_opacity=1, stroke_color=ENCRE, stroke_width=3).shift(centre)
            m = a0 - ang / 2
            k = 0.62 if p >= 0.2 else 0.72
            e = etiquette_blanche(nom, fs if p >= 0.2 else int(fs * 0.8))
            e.move_to(centre + P(k * r * np.cos(m), k * r * np.sin(m))).set_z_index(2)
            self.parts.add(s)
            self.etiq.add(e)
            self.angles.append((a0, ang))
            a0 -= ang
        self.disque = VGroup(self.parts, self.etiq)
        self.moyeu = Dot(centre, radius=0.08, color=ENCRE).set_z_index(3)
        self.pointe = Polygon(P(0, 0), P(-0.17, 0.3), P(0.17, 0.3), fill_color=ENCRE, fill_opacity=1,
                              stroke_color=WHITE, stroke_width=1.5).move_to(centre + UP * (r + 0.33),
                                                                            aligned_edge=DOWN)
        self.carte = RoundedRectangle(width=2 * r + 0.95, height=2 * r + 1.25, corner_radius=0.2,
                                      fill_color=WHITE, fill_opacity=1, stroke_color=CARTE_BORD, stroke_width=2)
        self.carte.move_to(centre + UP * 0.14)
        if carte:
            self.add(self.carte)
        self.add(self.parts, self.moyeu, self.pointe)

    def tout(self):
        """La roue complète, étiquettes comprises (un écran qui repart d'une roue déjà vue)."""
        self.add(self.etiq)
        return self

    def clignote(self, scene, k, fois=3, couleur=COMMUN):
        bord = self.parts[k].copy().set_fill(opacity=0).set_stroke(couleur, 10).set_z_index(4)
        for _ in range(fois):
            scene.play(FadeIn(bord), run_time=0.2)
            scene.play(FadeOut(bord), run_time=0.2)
        scene.play(FadeIn(bord), run_time=0.2)
        return bord

    def tourner(self, scene, tours=2.0, run_time=2.0):
        """La roue tourne (sens horaire) ; les étiquettes restent droites."""
        angle = -tours * TAU
        depart = self.disque.copy()

        def f(m, a):
            m.become(depart)
            m.rotate(angle * a, about_point=self.c)
            for e in m[1]:
                e.rotate(-angle * a)

        scene.play(UpdateFromAlphaFunc(self.disque, f), run_time=run_time,
                   rate_func=rate_functions.ease_out_cubic)


class TableauLoi(VGroup):
    """Le tableau de loi du coach : en-tête sombre « xᵢ | valeurs », puis les
    lignes à libellé bleu clair et cases blanches. TOUTES les cases de nombres
    sont vides au départ : `poser(r, j)` écrit le nombre (r = 0 : l'en-tête).
    lignes = libellés (Mobjects) ; valeurs[r][j] = texte (r = 0 : les xᵢ)."""

    def __init__(self, lignes, valeurs, coin=P(-1.6, 2.55), larg_lab=2.9, larg=1.45, h=0.72, fs=28, **kw):
        super().__init__(**kw)
        nl, nc = len(lignes), len(valeurs[0])
        self.rect = [[None] * (nc + 1) for _ in range(nl)]
        self.fonds, self.labs = VGroup(), VGroup()
        for r in range(nl):
            for c in range(nc + 1):
                coul = ENTETE if r == 0 else (LIBELLE if c == 0 else WHITE)
                w = larg_lab if c == 0 else larg
                x = coin[0] + (larg_lab / 2 if c == 0 else larg_lab + larg * (c - 0.5))
                y = coin[1] - h * (r + 0.5)
                rc = Rectangle(width=w, height=h, fill_color=coul, fill_opacity=1, stroke_color=BORD,
                               stroke_width=2).move_to(P(x, y))
                self.rect[r][c] = rc
                self.fonds.add(rc)
        for r, lab in enumerate(lignes):
            lab.move_to(self.rect[r][0]).set_z_index(3)
            if lab.width > larg_lab - 0.2:
                lab.scale_to_fit_width(larg_lab - 0.2)
            self.labs.add(lab)
        self.val = [[Text(v, font_size=int(fs * 1.15), color=WHITE if r == 0 else ENCRE, weight=BOLD)
                     .move_to(self.rect[r][j + 1]).set_z_index(3) for j, v in enumerate(ligne)]
                    for r, ligne in enumerate(valeurs)]
        self.add(self.fonds, self.labs)

    def case(self, r, j):
        return self.rect[r][j + 1]

    def poser(self, r, j):
        return FadeIn(self.val[r][j], scale=1.6)

    def tout(self, lignes=None):
        """Toutes les cases (des lignes données) déjà écrites, sans animation."""
        for r, ligne in enumerate(self.val):
            if lignes is None or r in lignes:
                for t in ligne:
                    self.add(t)
        return self

    def allumer(self, j, rangs=None):
        """La colonne j en jaune (cases blanches seulement), comme le coach."""
        rangs = range(1, len(self.rect)) if rangs is None else rangs
        return [self.case(r, j).animate.set_fill(SURLIGNE, 1).set_stroke(ANNEAU, 5) for r in rangs]

    def eteindre(self, j, rangs=None):
        rangs = range(1, len(self.rect)) if rangs is None else rangs
        return [self.case(r, j).animate.set_fill(WHITE, 1).set_stroke(BORD, 2) for r in rangs]


def lab_xi(fs=28):
    return xi(fs, WHITE)


def avec_indice(texte, k, fs, color=ENCRE):
    """Le caractère n° k (un « x », espaces non comptés) de `texte` reçoit un petit « i »
    en indice, posé sur la ligne de base du x ; la suite glisse à droite."""
    t = Text(texte, font_size=fs, color=color, weight=BOLD)
    x = t[k]
    i = Text("i", font_size=int(fs * 0.62), color=color, weight=BOLD)
    i.next_to(x, RIGHT, buff=0.02).align_to(x, DOWN).shift(DOWN * fs * 0.004)
    dx = i.get_right()[0] - x.get_right()[0] + 0.03
    for c in t[k + 1:]:
        c.shift(RIGHT * dx)
    return VGroup(t, i)


def lab_p(fs=26):
    """« P(X = xᵢ) » en encre, gras."""
    return avec_indice("P(X = x)", 4, fs)


def lab_prod(fs=26):
    """« xᵢ × P » en encre, gras."""
    return avec_indice("x × P", 0, fs)


X0 = -1.6   # le bord gauche de la colonne de droite (la roue occupe la gauche)
ROUE = [("0 €", 0.6, COUL_0), ("2 €", 0.3, COUL_2), ("10 €", 0.1, COUL_10)]
LOI = [["0", "2", "10"], ["0,6", "0,3", "0,1"], ["0", "0,6", "1"]]


class ProbaVaEsperanceBase(Notion6e):
    """Toutes les scènes ; les sous-classes ne changent que l'identité."""

    nom_voix = "stmg-premiere-spe-proba-va-esperance"
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

    def tableau(self, prod=False, valeurs=LOI):
        lignes = [lab_xi(), lab_p()] + ([lab_prod()] if prod else [])
        return TableauLoi(lignes, valeurs[:len(lignes)])

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("L'espérance : le gain moyen", 50, JAUNE_TITRE).to_edge(UP, buff=0.6)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.22)
        ech = echelle_ceintures("bleue").move_to(P(-0.6, -2.85))
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech), run_time=1.0)
        r = RoueKermesse(ROUE, centre=P(-0.6, -0.15), r=1.05, fs=24, carte=False)
        self.play(FadeIn(r, scale=0.6), run_time=0.5)
        r.tourner(self, tours=1.5, run_time=1.6)
        self.attendre_voix(marge=1.0)

    # ── 01 : la roue de la kermesse et sa loi ───────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.titre_ecran("La roue de la kermesse")
        r = RoueKermesse(ROUE)
        self.play(FadeIn(r, scale=0.8), run_time=0.6)
        self.au_mot("X, le gain")
        tab = self.tableau()
        gain = self.gauche(suite(self.t("X", 40, JAUNE_TITRE, BOLD), self.t(": le gain", 36), buff=0.18), -0.6)
        self.play(FadeIn(gain, shift=UP * 0.1), FadeIn(tab, shift=DOWN * 0.1), run_time=0.7)
        for k, (m_val, m_p) in enumerate([("0 euro", "0,6"), ("2 euros", "0,3"), ("10 euros", "0,1")]):
            self.au_mot(m_val)
            self.play(tab.poser(0, k), FadeIn(r.etiq[k], scale=1.6),
                      Indicate(r.parts[k], color=COMMUN, scale_factor=1.05), run_time=0.5)
            self.au_mot(m_p)
            self.play(tab.poser(1, k), run_time=0.4)
        self.attendre_voix()

    # ── 02 : la formule ─────────────────────────────────────────────────────

    def ecran_formule(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-formule")
        self.titre_ecran("L'espérance")
        r = RoueKermesse(ROUE).tout()
        tab = self.tableau().tout()
        self.add(r, tab)
        self.au_mot("notée E de X")
        ex = self.gauche(self.t("E(X)", 60, JAUNE_TITRE, BOLD), -0.25)
        self.play(FadeIn(ex, scale=1.6), run_time=0.5)
        self.insister(ex, 0.25, LEFT)
        self.au_mot("on multiplie")
        l1 = self.gauche(self.calcul([("chaque valeur", WHITE), ("×", JAUNE_TITRE), ("sa probabilité", WHITE)],
                                     36), -1.2)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.5)
        for j in range(3):
            self.play(*tab.allumer(j, [1]), Indicate(tab.val[0][j], color=COMMUN), run_time=0.35)
            self.play(*tab.eteindre(j, [1]), run_time=0.25)
        self.au_mot("et on additionne")
        l2 = self.gauche(self.calcul([("et on additionne", WHITE), ("+", JAUNE_TITRE)], 36), -2.05)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.5)
        self.attendre_voix()

    # ── 03 : le calcul : la 3e ligne, colonne par colonne, puis la somme ────

    def ecran_calcul(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-calcul")
        self.titre_ecran("Le calcul")
        r = RoueKermesse(ROUE).tout()
        tab = self.tableau(prod=True).tout(lignes=[0, 1])
        lab3 = tab.labs[2]
        tab.labs.remove(lab3)
        rang3 = VGroup(tab.rect[2][0], *[tab.case(2, j) for j in range(3)])
        tab.fonds.remove(*rang3)
        self.add(r, tab)
        self.play(FadeIn(rang3, shift=DOWN * 0.15), FadeIn(lab3), run_time=0.5)
        reperes = [("0 fois 0,6", "égale 0.", ("0", "0,6", "0")),
                   ("2 fois 0,3", "égale 0,6", ("2", "0,3", "0,6")),
                   ("10 fois 0,1", "égale 1.", ("10", "0,1", "1"))]
        ligne = None
        for j, (m1, m2, (a, b, c)) in enumerate(reperes):
            self.au_mot(m1)
            l = self.gauche(self.calcul([(a, WHITE), ("×", WHITE), (b, BLEU_CALCUL), ("=", WHITE),
                                         (c, JAUNE_TITRE)], 46), -0.35)
            anims = [FadeOut(ligne, shift=UP * 0.2)] if ligne is not None else []
            if j > 0:
                anims += tab.eteindre(j - 1, [1, 2])
            self.play(*anims, *tab.allumer(j, [1, 2]), TransformFromCopy(tab.val[0][j], l[0]), FadeIn(l[1]),
                      TransformFromCopy(tab.val[1][j], l[2]), run_time=0.6)
            self.au_mot(m2)
            self.play(FadeIn(l[3]), FadeIn(l[4], scale=1.6), run_time=0.4)
            self.play(TransformFromCopy(l[4], tab.val[2][j]), run_time=0.5)
            ligne = l
        self.au_mot("On additionne")
        self.play(FadeOut(ligne, shift=UP * 0.2), *tab.eteindre(2, [1, 2]), run_time=0.4)
        self.play(*[tab.case(2, j).animate.set_fill(SURLIGNE, 1).set_stroke(ANNEAU, 5) for j in range(3)],
                  run_time=0.4)
        s = self.gauche(self.calcul([("0", WHITE), ("+", WHITE), ("0,6", WHITE), ("+", WHITE), ("1", WHITE),
                                     ("=", WHITE), ("1,6", JAUNE_TITRE)], 46), -0.35)
        self.au_mot("0 plus 0,6")
        self.play(TransformFromCopy(tab.val[2][0], s[0]), FadeIn(s[1]), TransformFromCopy(tab.val[2][1], s[2]),
                  run_time=0.5)
        self.au_mot("plus 1, égale")
        self.play(FadeIn(s[3]), TransformFromCopy(tab.val[2][2], s[4]), run_time=0.4)
        self.au_mot("égale 1,6")
        self.play(FadeIn(s[5]), FadeIn(s[6], scale=1.6), run_time=0.4)
        self.au_mot("E de X égale 1,6")
        ex = self.gauche(self.calcul([("E(X)", JAUNE_TITRE), ("=", WHITE), ("1,6 €", JAUNE_TITRE)], 56), -1.5)
        cadre = SurroundingRectangle(ex, color=JAUNE_TITRE, buff=0.2, stroke_width=4, corner_radius=0.1)
        self.play(FadeIn(ex[:2], shift=UP * 0.1), TransformFromCopy(s[6], ex[2]), run_time=0.6)
        self.play(Create(cadre), run_time=0.4)
        self.insister(ex[2], 0.25)
        self.attendre_voix()

    # ── 04 : le sens : 1,60 € en moyenne par partie ─────────────────────────

    def ecran_sens(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-sens")
        self.titre_ecran("Ça veut dire quoi ?")
        r = RoueKermesse(ROUE).tout()
        self.add(r)
        self.au_mot("Si on joue")
        l1 = self.gauche(self.t("On joue un très grand nombre de fois", 30, BLEU_CALCUL), 1.9)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.5)
        for k in range(3):
            r.tourner(self, tours=1.2 + 0.3 * k, run_time=0.9)
        self.au_mot("en moyenne")
        l2 = self.gauche(self.t("En moyenne :", 40), 0.6)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.4)
        self.au_mot("1,60 euro")
        l3 = self.gauche(suite(self.t("1,60 €", 66, JAUNE_TITRE, BOLD), self.t("par partie", 44), buff=0.3), -0.55)
        cadre = SurroundingRectangle(l3, color=JAUNE_TITRE, buff=0.22, stroke_width=4, corner_radius=0.1)
        self.play(FadeIn(l3[0], scale=1.8), run_time=0.5)
        self.play(FadeIn(l3[1], shift=LEFT * 0.2), Create(cadre), run_time=0.5)
        self.insister(l3[0], 0.25)
        r.tourner(self, tours=1.0, run_time=1.0)
        self.attendre_voix()

    # ── 05 : le piège : la moyenne des valeurs ──────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-piege")
        self.titre_ecran("Le piège")
        r = RoueKermesse(ROUE).tout()
        tab = self.tableau().tout()
        self.add(r, tab)
        self.au_mot("faire la moyenne")
        l1 = self.gauche(self.t("La moyenne des valeurs ?", 38, ORANGE_RETENUE), 0.35)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.5)
        l2 = self.gauche(self.calcul([("(0", WHITE), ("+", WHITE), ("2", WHITE), ("+", WHITE), ("10)", WHITE),
                                      ("÷", WHITE), ("3", WHITE), ("=", WHITE), ("4", ROUGE_ERREUR)], 44), -0.5)
        self.au_mot("0 plus 2")
        self.play(TransformFromCopy(tab.val[0][0], l2[0]), FadeIn(l2[1]), TransformFromCopy(tab.val[0][1], l2[2]),
                  run_time=0.5)
        self.au_mot("plus 10")
        self.play(FadeIn(l2[3]), TransformFromCopy(tab.val[0][2], l2[4]), run_time=0.4)
        self.au_mot("divisé par 3")
        self.play(FadeIn(l2[5]), FadeIn(l2[6], scale=1.5), run_time=0.4)
        self.au_mot(": 4")
        self.play(FadeIn(l2[7]), FadeIn(l2[8], scale=1.8), run_time=0.4)
        self.au_mot("Faux")
        barre = Line(l2.get_left() + LEFT * 0.1, l2.get_right() + RIGHT * 0.1, color=ROUGE_ERREUR, stroke_width=7)
        faux = self.t("Faux !", 46, ROUGE_ERREUR, BOLD).next_to(l2, RIGHT, buff=0.4)
        self.play(Create(barre), FadeIn(faux, scale=1.6), run_time=0.5)
        self.au_mot("Le 10 est rare")
        rare = self.gauche(self.t("Le 10 est rare", 32, COUL_10), -1.35)
        self.play(FadeIn(rare, shift=UP * 0.1), *tab.allumer(2, [1]), run_time=0.5)
        r.clignote(self, 2)
        self.au_mot("il doit peser moins")
        moins = self.t(": il doit peser moins", 32).next_to(rare, RIGHT, buff=0.15)
        self.play(FadeIn(moins, shift=UP * 0.1), run_time=0.5)
        self.au_mot("on multiplie par les probabilités")
        bon = self.gauche(self.t("On multiplie par les probabilités", 30, VERT_OK), -2.15)
        self.play(FadeIn(bon, scale=1.2), *tab.eteindre(2, [1]), *[Indicate(tab.val[1][j], color=VERT_OK)
                                                                    for j in range(3)], run_time=0.7)
        self.attendre_voix()

    # ── 06 : défi : une autre roue, 0 € / 4 € ───────────────────────────────

    def roue_defi(self):
        return RoueKermesse([("0 €", 0.5, COUL_0), ("4 €", 0.5, COUL_4)])

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("06-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        self.au_mot("Une autre roue")
        r = self.roue_defi()
        tab = self.tableau(valeurs=[["0", "4"], ["0,5", "0,5"]])
        self.play(FadeIn(r, scale=0.8), FadeIn(tab, shift=DOWN * 0.1), run_time=0.6)
        for k, (m_val, m_p) in enumerate([("0 euro", "0,5"), ("4 euros", "avec 0,5.")]):
            self.au_mot(m_val)
            self.play(tab.poser(0, k), FadeIn(r.etiq[k], scale=1.6), run_time=0.5)
            self.au_mot(m_p)
            self.play(tab.poser(1, k), run_time=0.4)
        self.au_mot("Quelle est l'espérance")
        q = self.gauche(self.calcul([("E(X)", JAUNE_TITRE), ("=", WHITE), ("?", ORANGE_RETENUE)], 60), -0.3)
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
        r = self.roue_defi().tout()
        tab = self.tableau(valeurs=[["0", "4"], ["0,5", "0,5"]]).tout()
        self.add(r, tab)
        l1 = self.gauche(self.calcul([("E(X)", JAUNE_TITRE), ("=", WHITE), ("0", WHITE), ("×", WHITE),
                                      ("0,5", BLEU_CALCUL), ("+", WHITE), ("4", WHITE), ("×", WHITE),
                                      ("0,5", BLEU_CALCUL)], 44), 0.15)
        self.au_mot("0 fois 0,5")
        self.play(FadeIn(l1[:2]), *tab.allumer(0), TransformFromCopy(tab.val[0][0], l1[2]), FadeIn(l1[3]),
                  TransformFromCopy(tab.val[1][0], l1[4]), run_time=0.6)
        self.au_mot("plus 4 fois")
        self.play(*tab.eteindre(0), *tab.allumer(1), FadeIn(l1[5]), TransformFromCopy(tab.val[0][1], l1[6]),
                  FadeIn(l1[7]), TransformFromCopy(tab.val[1][1], l1[8]), run_time=0.6)
        l2 = self.calcul([("=", WHITE), ("0", WHITE), ("+", WHITE), ("2", WHITE), ("=", WHITE),
                          ("2", JAUNE_TITRE)], 44)
        l2.move_to(P(0, -0.8)).align_to(l1[1], LEFT)
        self.au_mot("0 plus 2")
        self.play(*tab.eteindre(1), FadeIn(l2[:4], shift=UP * 0.1), run_time=0.5)
        self.au_mot("égale 2")
        cadre = SurroundingRectangle(l2[5], color=JAUNE_TITRE, buff=0.15, stroke_width=4, corner_radius=0.08)
        self.play(FadeIn(l2[4]), FadeIn(l2[5], scale=1.8), run_time=0.4)
        self.play(Create(cadre), run_time=0.3)
        self.au_mot("En moyenne")
        l3 = self.gauche(suite(self.t("En moyenne :", 36), self.t("2 €", 48, JAUNE_TITRE, BOLD),
                               self.t("par partie", 36), buff=0.22), -1.9)
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.4)
        self.play(TransformFromCopy(l2[5], l3[1]), FadeIn(l3[2]), run_time=0.6)
        r.tourner(self, tours=1.5, run_time=1.4)
        self.attendre_voix()

    # ── 07 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)))
        fs = 38
        items = [
            (suite(self.t("E(X) :", fs, JAUNE_TITRE, BOLD), self.t("chaque valeur × sa probabilité,", fs),
                   buff=0.18), self.t("puis la somme", fs)),
            (self.t("La valeur moyenne", fs, VERT_OK, BOLD), self.t("sur un grand nombre de parties", fs)),
            (self.t("Jamais", fs, ROUGE_ERREUR, BOLD), self.t("la simple moyenne des valeurs", fs)),
        ]
        blocs = VGroup()
        for haut, bas in items:
            txt = VGroup(haut, bas).arrange(DOWN, aligned_edge=LEFT, buff=0.16)
            blocs.add(VGroup(self.coche(), txt).arrange(RIGHT, buff=0.3, aligned_edge=UP))
        blocs.arrange(DOWN, aligned_edge=LEFT, buff=0.45)
        if blocs.width > 11.0:
            blocs.scale_to_fit_width(11.0)
        blocs.move_to(P(-0.8, 0.35))
        for b in blocs:
            b[0].shift(DOWN * 0.12)
        reperes = [("E de X : chaque", "puis la somme"), ("la valeur moyenne", "sur un grand nombre"),
                   ("Jamais la simple", "moyenne des valeurs")]
        for (m1, m2), b in zip(reperes, blocs):
            self.au_mot(m1)
            self.play(FadeIn(b[1][0], shift=RIGHT * 0.2), run_time=0.5)
            self.au_mot(m2)
            self.play(FadeIn(b[1][1], shift=RIGHT * 0.2), Create(b[0]), run_time=0.5)
        self.au_mot("Prochaine vidéo")
        self.play(Write(self.chute("Prochaine vidéo : un jeu est-il équitable ?", font_size=32)))
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
        self.ecran_formule()
        self.ecran_calcul()
        self.ecran_sens()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement()


class ProbaVaEsperanceSTMG(ProbaVaEsperanceBase):
    identite = "Maths STMG — EleveAI"


class ProbaVaEsperancePremiereSpe(ProbaVaEsperanceBase):
    identite = "Maths 1re spé — EleveAI"
