# stats_tableau_commun.py
# EleveAI — série « Statistiques », cycle 3, LOT DES TABLEAUX (CM 01 → 04,
# 6e 01 et 03). Les petits outils partagés par ces six épisodes, pour ne pas
# les recopier six fois. ⛔ Ce n'est PAS canvas_stats.py (qu'on ne modifie
# pas) : on l'importe et on y ajoute, ici, ce qui manque aux tableaux :
#   · remplir() qui garde le nombre AU-DESSUS d'une case allumée (sinon le
#     fond jaune, passé en z_index 1, recouvre le nombre neuf) ;
#   · teinter() : une ligne ou une colonne TEINTÉE (sans anneau), pour que
#     la case du croisement, elle, garde l'anneau du coach ;
#   · fleche_ligne() / fleche_colonne() : le geste « je prends la ligne »,
#     « je prends la colonne » se VOIT ;
#   · la base des paysages (t, col, ligne, insister, page_abonnement, garde).
# Le calage mot à mot (MotsCales) vient du pilote : stats_graphique_lire.py.

import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parent))
sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "seconde"))

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from canvas_stats import AMBRE, ANNEAU, CASE_ALLUMEE, NUIT, ORANGE_Q  # noqa: E402
from gabarit_sixieme import Notion6e, Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402
from stats_graphique_lire import MotsCales, croix  # noqa: E402,F401

PALE = "#fde68a"     # amber-200 : une ligne / une colonne teintée
BLEU_PALE = "#bfdbfe"  # blue-200 : la deuxième direction (colonne), si on veut les distinguer


def P(x, y):
    return np.array([x, y, 0.0])


# ── les gestes sur un Tableau de canvas_stats ───────────────────────────────

def remplir(tab, r, c, v, color=NUIT):
    """tab.remplir(), et le nombre neuf passe au-dessus du fond (z_index 4)."""
    anim = tab.remplir(r, c, v, color)
    tab.cases[r][c][1].set_z_index(4)
    return anim


def textes_devant(tab):
    """Tous les nombres du tableau devant les fonds (à appeler une fois)."""
    for rang in tab.cases:
        for cs in rang:
            cs[1].set_z_index(4)
    return tab


def teinter(tab, coords, couleur=PALE):
    """Les cases `coords` prennent une teinte, sans anneau. Liste d'animations."""
    return [tab.case(r, c).animate.set_fill(couleur) for r, c in coords]


def teinter_ligne(tab, r, couleur=PALE):
    return teinter(tab, [(r, c) for c in range(len(tab.cases[r]))], couleur)


def teinter_colonne(tab, c, couleur=PALE):
    return teinter(tab, [(r, c) for r in range(len(tab.cases))], couleur)


def allumer(tab, r, c, couleur=CASE_ALLUMEE, anneau=ANNEAU):
    """La case du coach : jaune et anneau, au-dessus des voisines. Liste d'animations."""
    tab.case(r, c).set_z_index(3)
    return [tab.case(r, c).animate.set_fill(couleur).set_stroke(anneau, width=8)]


def eteindre(tab):
    anims = tab.eteindre()
    textes_devant(tab)
    return anims


def fleche_ligne(tab, r, c_fin=None, couleur=AMBRE, dy=-0.33):
    """« Je prends la ligne » : une flèche du libellé jusqu'à la case c_fin (ou au
    bout), un peu SOUS le milieu de la ligne pour ne pas cacher les nombres."""
    c_fin = len(tab.cases[r]) - 1 if c_fin is None else c_fin
    y = tab.case(r, 0).get_center()[1] + dy
    x0 = tab.libelles[r].get_left()[0] + 0.15 if len(tab.libelles) else tab.case(r, 0).get_left()[0] + 0.1
    x1 = tab.case(r, c_fin).get_center()[0] + 0.25
    a = Arrow(P(x0, y), P(x1, y), buff=0, color=couleur, stroke_width=7, max_tip_length_to_length_ratio=0.12)
    return a.set_z_index(6)


def fleche_colonne(tab, c, r_fin=None, couleur=AMBRE, dx=-0.55):
    """« Je prends la colonne » : une flèche de l'en-tête jusqu'à la case r_fin,
    un peu À GAUCHE du milieu de la colonne pour ne pas cacher les nombres."""
    r_fin = len(tab.cases) - 1 if r_fin is None else r_fin
    x = tab.case(0, c).get_center()[0] + dx
    y0 = tab.tetes[c].get_top()[1] - 0.08
    y1 = tab.case(r_fin, c).get_center()[1] - 0.2
    a = Arrow(P(x, y0), P(x, y1), buff=0, color=couleur, stroke_width=7, max_tip_length_to_length_ratio=0.15)
    return a.set_z_index(6)


def doigt(couleur=ORANGE_RETENUE, r=0.13):
    """Le doigt qui suit la ligne : un rond orange cerclé de blanc."""
    return Dot(radius=r, color=couleur).set_stroke(WHITE, 3).set_z_index(7)


# ── la base des paysages du lot ─────────────────────────────────────────────

class BaseTableauPaysage(MotsCales, Notion6e):
    """Les outils communs : textes, colonne de droite, insister, page de fin.
    Une sous-classe fixe nom_voix, fichier_marques, identite, XL (le bord gauche
    de la colonne de droite) et construct()."""

    identite = "Maths CM1 — EleveAI"
    XL = 1.2

    def t(self, s, fs=40, color=WHITE):
        return Text(s, font_size=fs, color=color)

    def col(self, mob, y, xl=None):
        """Pose mob dans la colonne de droite, calé à gauche, sans déborder."""
        xl = self.XL if xl is None else xl
        mob.move_to(P(0, y)).align_to(P(xl, 0), LEFT)
        if mob.get_right()[0] > 6.75:
            mob.scale_to_fit_width(6.75 - xl).align_to(P(xl, 0), LEFT)
        return mob

    def ligne(self, morceaux, fs=40, buff=0.2):
        """Une ligne de morceaux colorés ; ligne[i] = i-ème morceau."""
        return VGroup(*[self.t(m, fs, c) for m, c in morceaux]).arrange(RIGHT, buff=buff)

    def bloc(self, lignes, fs=38, color=WHITE, buff=0.14):
        """Plusieurs lignes calées à gauche."""
        return VGroup(*[self.t(s, fs, color) for s in lignes]).arrange(DOWN, aligned_edge=LEFT, buff=buff)

    def insister(self, mob, k=1.5, run_time=0.35):
        """AGRANDIR puis rétrécir (la règle du 07/10)."""
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def encadre(self, mob, couleur=VERT_OK):
        return SurroundingRectangle(mob, color=couleur, buff=0.2, corner_radius=0.12, stroke_width=5)

    def garde(self, titre, ceinture, voix="00-garde"):
        """Titre, identité, échelle des ceintures. Renvoie (titre, identite, echelle)."""
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire(voix)
        ti = self.t(titre, 56, JAUNE_TITRE).to_edge(UP, buff=0.55)
        ident = self.t(self.identite, 28).next_to(ti, DOWN, buff=0.22)
        ech = echelle_ceintures(ceinture).move_to(P(-0.6, -2.85))
        return ti, ident, ech

    def finale(self, lignes_txt, ys=(1.65, 0.3, -0.95), fs=38, x_max=6.7):
        """« Ce que tu as appris » : le titre, et les lignes (coche + bloc) NON
        jouées, posées dans la colonne de droite. Renvoie la liste des lignes."""
        self.play(Write(self.t("Ce que tu as appris", 46, JAUNE_TITRE).to_edge(UP, buff=0.3)), run_time=0.7)
        lignes = [VGroup(self.coche(), self.bloc(txt, fs)).arrange(RIGHT, buff=0.3) for txt in lignes_txt]
        k = min(1.0, (x_max - self.XL) / max(lg.width for lg in lignes))  # la MÊME taille pour toutes
        for lg, y in zip(lignes, ys):
            lg.scale(k).move_to(P(0, y)).align_to(P(self.XL, 0), LEFT)
        return lignes

    def page_abonnement(self, voix="09-abonne"):
        """« Entraîne-toi sur » + eleveai.fr encadré, puis « Abonne-toi ! » +
        @eleveai974 (règle du 19/10, comme le pilote)."""
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


class BaseTableauShort(MotsCales, Short6e):
    """Les outils des shorts : textes bornés à la largeur, insister, échelle."""

    def t(self, s, fs=34, color=WHITE):
        return Text(s, font_size=fs, color=color)

    def borne(self, mob, marge=0.4):
        if mob.width > config.frame_width - marge:
            mob.scale_to_fit_width(config.frame_width - marge)
        return mob

    def insister(self, mob, k=1.3, run_time=0.2):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def entete_short(self, titre, ceinture, fs=46):
        """Le titre (non joué) et l'échelle entière des ceintures (ajoutée)."""
        ti = self.borne(self.t(titre, fs, JAUNE_TITRE)).move_to(P(0, 3.45))
        ech = echelle_ceintures(ceinture).scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.62))
        self.add(ech)
        return ti
