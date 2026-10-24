# stats_lycee_i2_commun.py
# EleveAI — Maths STMG — série « Statistiques », LYCÉE, lot I2 (24/10/2026) :
# les OUTILS COMMUNS des quatre épisodes de STMG sur les FRÉQUENCES d'un
# tableau croisé (notion donnees_frequences) :
#   09-freq-marginale (don_freq_marginale), 10-freq-conditionnelle
#   (don_freq_conditionnelle), 11-freq-completer (don_freq_completer),
#   12-freq-interpreter (don_freq_interpreter). Pas de scène ici.
#
# ⭐ Repris SANS LES MODIFIER : stats_lycee_h1_commun.py (question-pause,
#   caser(), contrôle BORDS=1, PaysageLycee / ShortLycee, marques lues dans
#   manim/scripts/stmg/) et, par lui, canvas_stats.Tableau (le `tableau_donnees`
#   du coach : canvasTableau de donnees-croisees.bank.ts, marges « Total »).
# ⭐ Ajouté ici, le CODE COULEUR de toute la série des fréquences :
#   · la POPULATION DE RÉFÉRENCE (le dénominateur) est teintée en BLEU pâle
#     dans le tableau, et son effectif s'écrit en BLEU sous la barre de fraction ;
#   · l'effectif du NUMÉRATEUR est la case allumée (jaune, anneau ambre), et il
#     s'écrit en AMBRE au-dessus de la barre.
#   Le même code sert la paysage et le short de chaque épisode.

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats_lycee_h1_commun import *  # noqa: E402,F401,F403

C_NUM = AMBRE          # le numérateur (la case allumée)
C_DEN = "#60a5fa"      # le dénominateur (bleu lisible sur fond noir)
REF = "#bfdbfe"        # la population de référence, teintée dans le tableau


def croise_i2(colonnes, lignes_noms, vals, trous=(), vides=(), titre=None, coin="", largeur_case=1.55,
              largeur_libelle=2.3, hauteur=0.8, fs=28):
    """Le tableau croisé du coach AVEC ses marges, à partir de la grille
    COMPLÈTE `vals` (chaînes, marges comprises). trous : cases « ? » (orange) ;
    vides : cases laissées blanches. Les nombres passent devant les fonds."""
    lignes = [["?" if (r, c) in trous else (None if (r, c) in vides else v) for c, v in enumerate(rang)]
              for r, rang in enumerate(vals)]
    t = Tableau(colonnes, lignes, libelles=lignes_noms, coin=coin, largeur_case=largeur_case,
                largeur_libelle=largeur_libelle, hauteur=hauteur, fs=fs, titre=titre)
    return textes_devant(t)


def frac(num, den, fs=44, cn=C_NUM, cd=C_DEN):
    """Une fraction écrite à la main : numérateur, barre, dénominateur.
    Morceaux : .num .barre .den"""
    n = Text(num, font_size=fs, color=cn)
    d = Text(den, font_size=fs, color=cd)
    w = max(n.width, d.width) + 0.2
    b = Line(LEFT * w / 2, RIGHT * w / 2, color=WHITE, stroke_width=4)
    n.next_to(b, UP, buff=0.12)
    d.next_to(b, DOWN, buff=0.12)
    g = VGroup(n, b, d)
    g.num, g.barre, g.den = n, b, d
    return g


def egal(fr_, *morceaux, fs=44):
    """« fraction = morceau = morceau » sur une ligne ; morceaux : (texte, couleur)."""
    g = VGroup(fr_)
    for s, c in morceaux:
        g.add(Text(s, font_size=fs, color=c))
    return g.arrange(RIGHT, buff=0.25)


def ref_ligne(t, r):
    """La ligne r devient la population de référence (teinte bleue). Animations."""
    return teinter_ligne(t, r, REF)


def ref_colonne(t, c):
    return teinter_colonne(t, c, REF)


def num_case(t, r, c):
    """La case du numérateur : jaune et anneau, au-dessus. Animations."""
    return allumer(t, r, c)


class PaysageI2(PaysageLycee):
    """La paysage du lot I2 : le tableau à gauche, la colonne de droite à XL."""

    identite = "Maths STMG — EleveAI"
    ceinture = "verte"
    XL = 1.0
    Y_MIN_DROITE = -1.75  # sous cette ligne, Ti-Margo occupe le coin droit

    def placer_tab(self, t, droite=0.6, haut=3.0, bas=-3.3):
        return caser(t, -6.6, droite, bas, haut)

    def calc(self, mob, y, xl=None):
        """Un calcul dans la colonne de droite ; jamais sur Ti-Margo."""
        self.col(mob, y, xl)
        if mob.get_bottom()[1] < self.Y_MIN_DROITE and mob.get_right()[0] > 5.2:
            mob.scale_to_fit_width(5.2 - (self.XL if xl is None else xl)).align_to(
                P(self.XL if xl is None else xl, 0), LEFT)
        return mob

    def pause_defi(self, y=-1.2):
        g = VGroup(icone_pause(0.36), self.t("Mets pause, et cherche !", 34, ORANGE_RETENUE)).arrange(RIGHT, buff=0.2)
        return self.col(g, y)

    def choix2(self, l1, l2, fs=30):
        """Un choix sur deux lignes (pour les phrases de presse)."""
        return VGroup(self.t(l1, fs), self.t(l2, fs)).arrange(DOWN, aligned_edge=LEFT, buff=0.08)

    def question_large(self, cle_q, cle_r, question, choix, bonne, explication, **kw):
        """Une question-pause en PLEINE largeur (sans figure) : pour les phrases."""
        opts = dict(x0=-5.6, largeur=10.6, ys=(0.8, -0.3, -1.4), y_bas=-2.4, fs=36, fs_choix=32,
                    rebours_centre=P(5.2, 3.1))
        opts.update(kw)
        return self.question_pause(cle_q, cle_r, question, choix, bonne, explication, **opts)


class ShortI2(ShortLycee):
    """Le short du lot I2 (9:16, cadre 4,5 × 8) : titre et ceintures en haut,
    l'image au milieu (y de 2,1 à 0,1), la figure en bas (y de -0,5 à -2,6)."""

    def tab_bas(self, t, haut=-0.45, bas=-2.6):
        return caser(t, -2.0, 2.0, bas, haut)
