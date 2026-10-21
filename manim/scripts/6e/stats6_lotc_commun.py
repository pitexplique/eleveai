# stats6_lotc_commun.py
# EleveAI — Maths 6e — série « Statistiques » : les OUTILS COMMUNS des épisodes
# 02-prelever, 04-enquete-planifier, 05-enquete-mesurer, 08-comparer,
# 09-interpreter et 10-defi (lot C, 21/10/2026). Pas de scène ici.
#
# ⭐ Repris du pilote manim/scripts/cm1/stats_graphique_lire.py :
#   · MotsCales : au_mot() calé sur les MOTS (marques WinRT, débit −10) lus
#     dans manim/scripts/6e/stats_<slug>[_short]_marques.json ;
#   · la mise en page paysage (figure à gauche, colonne de texte à droite) ;
#   · la page de fin du 19/10 (« Entraîne-toi sur » + eleveai.fr, « Abonne-toi ! »).
# Les figures viennent de manim/canvas_stats.py (NON modifié).

import json
import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))            # manim/
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "seconde"))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "cm1"))

from manim import *  # noqa: E402,F401

from charte import *  # noqa: E402,F401
from stats_graphique_lire import MotsCales  # noqa: E402,F401
from gabarit_sixieme import Notion6e, Short6e  # noqa: E402,F401
from signes_expression_2de import echelle_ceintures  # noqa: E402,F401


def P(x, y):
    return np.array([x, y, 0.0])


def croix(mob, color=ROUGE_ERREUR, sw=7):
    return VGroup(Line(mob.get_corner(UL), mob.get_corner(DR)),
                  Line(mob.get_corner(UR), mob.get_corner(DL))).set_stroke(color, sw)


class MotsCales6(MotsCales):
    """MotsCales du pilote, mais les marques sont lues dans manim/scripts/6e/
    (le pilote les cherche à côté de SON fichier, dans cm1/). Une marque
    manquante lève une erreur : un calage ne doit pas retomber en silence sur
    le prorata des caractères."""

    def _marques(self):
        if not hasattr(self, "_cache_marques"):
            ch = Path(__file__).resolve().parent / self.fichier_marques
            self._cache_marques = json.loads(ch.read_text(encoding="utf-8"))
        return self._cache_marques


class OutilsPaysage:
    """Les petits outils de mise en page d'une paysage (16:9)."""

    XL = 0.95  # le bord gauche de la colonne de droite

    def t(self, s, fs=40, color=WHITE):
        return Text(s, font_size=fs, color=color)

    def col(self, mob, y, xl=None):
        """Pose mob dans la colonne de droite, calé à gauche, sans déborder."""
        xl = self.XL if xl is None else xl
        mob.move_to(P(0, y)).align_to(P(xl, 0), LEFT)
        if mob.get_right()[0] > 6.7:
            mob.scale_to_fit_width(6.7 - xl).align_to(P(xl, 0), LEFT)
        return mob

    def ligne(self, morceaux, fs=40, buff=0.2):
        """Une ligne de morceaux colorés ; ligne[i] = i-ème morceau."""
        return VGroup(*[self.t(m, fs, c) for m, c in morceaux]).arrange(RIGHT, buff=buff)

    def bloc(self, lignes, fs=38, color=WHITE, buff=0.14):
        """Plusieurs lignes de texte, alignées à gauche."""
        return VGroup(*[self.t(s, fs, color) for s in lignes]).arrange(DOWN, aligned_edge=LEFT, buff=buff)

    def insister(self, mob, k=1.5, run_time=0.35, about=None):
        """AGRANDIR puis rétrécir (la règle du 07/10 : pas de zoom de caméra)."""
        kw = {"about_point": about} if about is not None else {}
        self.play(mob.animate.scale(k, **kw), run_time=run_time)
        self.play(mob.animate.scale(1 / k, **kw), run_time=run_time)

    def encadrer(self, mob, couleur=VERT_OK, buff=0.2):
        return SurroundingRectangle(mob, color=couleur, buff=buff, corner_radius=0.12, stroke_width=5)

    def garde(self, titre_txt, identite, ceinture, y_ech=-2.85):
        """Le haut de la page de garde : titre, identité, échelle des ceintures
        (renvoyés, non ajoutés)."""
        titre = self.t(titre_txt, 54, JAUNE_TITRE).to_edge(UP, buff=0.55)
        if titre.width > 12.5:
            titre.scale_to_fit_width(12.5)
        ident = self.t(identite, 28).next_to(titre, DOWN, buff=0.22)
        ech = echelle_ceintures(ceinture).move_to(P(-0.6, y_ech))
        return titre, ident, ech

    def finale(self, textes, ys, fs=36):
        """« Ce que tu as appris » : le titre est joué, les lignes (coche + bloc)
        sont renvoyées pour être montrées AU MOT."""
        self.play(Write(self.t("Ce que tu as appris", 46, JAUNE_TITRE).to_edge(UP, buff=0.3)), run_time=0.7)
        lignes = VGroup()
        for morceaux, y in zip(textes, ys):
            bloc = VGroup(*[self.t(s, fs) for s in morceaux]).arrange(DOWN, aligned_edge=LEFT, buff=0.12)
            lg = VGroup(self.coche(), bloc).arrange(RIGHT, buff=0.3)
            lignes.add(self.col(lg, y))
        return lignes

    def montrer_ligne(self, lg, *autres):
        self.play(FadeIn(lg[1], shift=RIGHT * 0.2), Create(lg[0]), *autres, run_time=0.6)

    def page_abonnement(self, voix):
        """« Entraîne-toi sur » + eleveai.fr encadré, puis « Abonne-toi ! » +
        @eleveai974. Rien d'autre (modèle : stmg/proba_au_moins_un.py)."""
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


class OutilsShort:
    """Les petits outils d'un short (9:16, cadre 4,5 × 8)."""

    def t(self, s, fs=36, color=WHITE):
        return Text(s, font_size=fs, color=color)

    def borne(self, mob, marge=0.4):
        if mob.width > config.frame_width - marge:
            mob.scale_to_fit_width(config.frame_width - marge)
        return mob

    def ligne(self, morceaux, fs=36, buff=0.16):
        return self.borne(VGroup(*[self.t(m, fs, c) for m, c in morceaux]).arrange(RIGHT, buff=buff))

    def insister(self, mob, k=1.3, run_time=0.2):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def entete_short(self, titre_txt, ceinture="blanche"):
        """Le titre (y = 3,45) et l'ÉCHELLE ENTIÈRE des ceintures dessous (règle du 13/10)."""
        titre = self.borne(self.t(titre_txt, 48, JAUNE_TITRE), 0.5).move_to(P(0, 3.45))
        badge = echelle_ceintures(ceinture).scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.62))
        return titre, badge
