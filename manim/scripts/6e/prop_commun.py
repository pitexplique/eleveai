# prop_commun.py
# EleveAI — série « Proportionnalité » (6e et 4e, 31/10/2026) : les BASES DE
# SCÈNE communes à tous les épisodes. Pas de scène ici. Créé par le pilote
# 6e 01-reconnaitre, lecture seule pour les épisodes suivants (comme
# manim/canvas_proportion.py, qui porte les FIGURES et l'AUDIT).
#
# ⭐ Repris SANS LES MODIFIER (import) : frac_lotc_commun.py (PaysageLotC /
#   ShortLotC : synchro par jetons resserrée, question_pause() avec compte à
#   rebours 5 s / 3 s, rep() / rep_fin() pour la réponse au mot, calc(),
#   montrer_ligne(), finale_colonne() « Ce que tu as appris » titre EN HAUT
#   ET CENTRÉ, page_abonnement() du 19/10, marges ≥ 3 %, personne()).
# ⭐ Ajouté ici :
#   · AuditSynchro (canvas_proportion) EN TÊTE des bases : AUDIT=1 BORDS=1 ;
#   · PaysageProp (« Maths 6e — EleveAI », ceinture verte) et ShortProp
#     (ceinture blanche) ; une 4e change `identite` / `ceinture` ;
#   · tampon(texte, couleur) : le verdict « Proportionnel » / « Pas
#     proportionnel » encadré, toujours le même d'un épisode à l'autre.
#
# Usage dans un épisode (manim/scripts/<classe>/prop_<slug>.py) :
#   sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "6e"))
#   from prop_commun import *        # PaysageProp, ShortProp, TableauProp, Unite…
#   class PropTableBase(PaysageProp):
#       nom_voix = "6e-prop-table"; fichier_marques = "prop_table_marques.json"

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
sys.path.insert(0, str(Path(__file__).resolve().parents[2]))  # manim/

from frac_lotc_commun import *  # noqa: E402,F401,F403
from canvas_proportion import *  # noqa: E402,F401,F403


class _Verdicts:
    def tampon(self, s, couleur=VERT_OK, fs=40):
        """Le verdict encadré (« Proportionnel ! », « Pas proportionnel ! ») :
        renvoyé, non ajouté ; la scène le pose au mot (FadeIn scale) puis insiste."""
        t = Text(s, font_size=fs, color=couleur, weight=BOLD)
        cadre = SurroundingRectangle(t, color=couleur, buff=0.18, corner_radius=0.12, stroke_width=5)
        g = VGroup(cadre, t)
        g.texte = t
        return g


    def ligne_rep(self, i, morceaux, fs=None):
        """Dans autres_r d'une question-pause : la ligne i de la phrase de
        réponse, recoupée en MORCEAUX (Text) posés à la même place ; le script
        joue chaque morceau AU MOT avec son geste sur la figure, puis appelle
        rep_fini() pour que question_pause ne rejoue pas la phrase."""
        ref = self.ph_q[i]
        fs = fs or (30 if config.frame_width > 8 else 26)
        lg = self.ligne([(m, VERT_OK) for m in morceaux], fs, buff=0.14)
        if lg.width > config.frame_width - 0.9:
            lg.scale_to_fit_width(config.frame_width - 0.9)
        lg.move_to(ref)
        if config.frame_width > 8:
            lg.align_to(ref, LEFT)
            if lg.get_bottom()[1] < -1.85 and lg.get_right()[0] > 5.2:  # Ti-Margo, en bas à droite
                g = lg.get_left()[0]
                lg.scale_to_fit_width(5.2 - g).align_to(P(g, 0), LEFT)
        return lg

    def rep_fini(self):
        self.ph_q.submobjects = []


class PaysageProp(AuditSynchro, _Verdicts, PaysageLotC):
    identite = "Maths 6e — EleveAI"
    ceinture = "verte"

    def finale_colonne(self, textes, fs=38, figure=None):
        """Celle du lot H2 (stmg/stats_lycee_h2_commun.py), recopiée avec le
        titre à 0,45 du haut (marge de 3 %, BORDS=1) : « Ce que tu as appris »
        EN HAUT ET CENTRÉ, la figure (déjà posée) recadrée dessous à gauche,
        les lignes (coche + bloc) renvoyées pour montrer_ligne() au mot."""
        tit = self.t("Ce que tu as appris", 46, JAUNE_TITRE).to_edge(UP, buff=0.45)
        if figure is not None:
            self.cadrer(figure, droite=self.XL - 0.3, haut=tit.get_bottom()[1] - 0.25)
        self.play(Write(tit), run_time=0.7)
        lignes = VGroup()
        for morceaux in textes:
            bloc = VGroup(*[self.t(x, fs) for x in morceaux]).arrange(DOWN, aligned_edge=LEFT, buff=0.1)
            lignes.add(VGroup(self.coche(), bloc).arrange(RIGHT, buff=0.25))
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.42)
        xl = self.XL if figure is None else min(self.XL, figure.get_right()[0] + 0.45)
        largeur = self.BORD_X - 0.05 - xl
        if lignes.width > largeur:
            lignes.scale_to_fit_width(largeur)
        if lignes.height > 4.3:
            lignes.scale_to_fit_height(4.3)
        lignes.align_to(P(xl, 0), LEFT).align_to(P(0, 2.45), UP)
        return lignes


class ShortProp(AuditSynchro, _Verdicts, ShortLotC):
    ceinture = "blanche"
