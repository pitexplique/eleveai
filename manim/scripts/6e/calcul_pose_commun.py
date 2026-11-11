# calcul_pose_commun.py
# EleveAI — Maths 6e — série « Calcul posé » (notion entier_calcul_pose, 11/11/2026) :
# ce qui sert aux 5 paysages. Base : PaysageDecimal (decimal_commun : synchro, audit,
# question-pause, finale, fin) et la Pose en colonnes de decimal_additionner.
# Rangs : 3 milliers, 2 centaines, 1 dizaines, 0 unités. Une couleur par rang, toujours la même.

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from decimal_commun import *  # noqa: E402,F401,F403
from decimal_additionner import Pose as _Pose  # noqa: E402

COUL_RANG_E = {3: "#a78bfa", 2: ROSE_D, 1: AMBRE_D, 0: BLEU_D}
NOM_RANG = {3: "milliers", 2: "centaines", 1: "dizaines", 0: "unités"}
MOINS = "−"


class Pose(_Pose):
    """La pose de decimal_additionner, pour des entiers (pas de virgule), colonnes colorées
    par rang (unités bleues, dizaines ambre, centaines roses)."""

    def colonne(self, r, i0=0, i1=None):
        c = super().colonne(r, i0, i1)
        return c.set_stroke(COUL_RANG_E.get(r, WHITE), 5)

    def entete(self, r, fs=30):
        """L'initiale du rang (u, d, c, m) au-dessus de la colonne."""
        t = Text(NOM_RANG[r][0], font_size=fs, color=COUL_RANG_E[r], weight=BOLD)
        return hors_audit(t).move_to(self.pt(r, 0) + UP * self.hl * 0.95)

    def place(self, s, r, i, couleur=WHITE, fs=None):
        """Un chiffre posé à la main (mauvaise pose, chiffre cassé), hors audit."""
        return self._t(s, r, i, couleur, fs)

    def barrer(self, m, couleur=ROUGE_ERREUR):
        return Line(m.get_corner(DL) + LEFT * 0.05, m.get_corner(UR) + RIGHT * 0.05, color=couleur, stroke_width=6)


def nadia(s=1.0):
    """Nadia, comptable : veste bleu nuit, cheveux longs, lunettes."""
    p = visage(personne(peau="#c68642", tenue="#1e3a8a", cheveux="#1f2937", longs=True, s=s))
    c, r = p.tete.get_center(), p.tete.width / 2
    lun = VGroup(*[Circle(radius=0.22 * r, stroke_color="#111827", stroke_width=3).move_to(c + P(x * r, -0.18 * r))
                   for x in (-0.36, 0.36)])
    p.add(lun)
    return p


def facture(mot, s=1.0, couleur="#fef3c7"):
    """Une facture : feuille, en-tête, lignes grises ; le montant s'écrit à côté, au mot."""
    f = RoundedRectangle(width=1.5 * s, height=1.9 * s, corner_radius=0.1 * s, fill_color=couleur, fill_opacity=1,
                         stroke_color="#a8a29e", stroke_width=3)
    t = hors_audit(Text(mot, font_size=int(20 * s), color="#1e3a8a", weight=BOLD))
    if t.width > f.width * 0.86:
        t.scale_to_fit_width(f.width * 0.86)
    t.move_to(f.get_top() + DOWN * 0.3 * s)
    traits = VGroup(*[Line(P(-0.5 * s, 0), P(0.5 * s, 0), color="#a8a29e", stroke_width=3)
                      .move_to(f.get_center() + DOWN * (0.05 + 0.3 * k) * s) for k in range(3)])
    return VGroup(f, t, traits)


def cube(c=BLEU_D, a=0.26):
    return Square(a, fill_color=c, fill_opacity=1, stroke_color=WHITE, stroke_width=1.5)




def gauche(m, x, y):
    """Pose m avec son bord gauche en x, centré en hauteur sur y (sans le rétrécir)."""
    m.move_to(P(0, y))
    m.align_to(P(x, 0), LEFT)
    return m


class _Aides:
    def rep_bas(self, i, morceaux, fs=32, x=-6.2, y0=-1.6, pas=0.62):
        """Dans une question-pause, la ligne i de l'explication, en bas à gauche, en grand
        (ligne_rep la rétrécit à côté de Ti-Margo). Morceaux : textes ou (texte, couleur)."""
        mx = [(m, VERT_OK) if isinstance(m, str) else m for m in morceaux]
        lg = self.ligne(mx, fs, buff=0.14)
        return gauche(lg, x, y0 - pas * i)

    def finale_gauche(self, figure, textes, fs=36, x_fig=-4.6, xl=-2.3):
        """« Ce que tu as appris » : titre en haut et centré, la figure à gauche, les lignes
        (coche + texte) à droite, en grand. Renvoie les lignes pour montrer_ligne()."""
        tit = self.t("Ce que tu as appris", 46, JAUNE_TITRE).to_edge(UP, buff=0.45)
        figure.move_to(P(x_fig, -0.2))
        self.play(Write(tit), run_time=0.7)
        lignes = VGroup()
        for morceaux in textes:
            bloc = VGroup(*[self.t(s, fs) for s in morceaux]).arrange(DOWN, aligned_edge=LEFT, buff=0.1)
            lignes.add(VGroup(self.coche(), bloc).arrange(RIGHT, buff=0.25))
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.45)
        largeur = 6.6 - xl
        if lignes.width > largeur:
            lignes.scale_to_fit_width(largeur)
        lignes.move_to(P(0, -0.1)).align_to(P(xl, 0), LEFT)
        return lignes


class PaysageCalculPose(_Aides, PaysageDecimal):
    pass
