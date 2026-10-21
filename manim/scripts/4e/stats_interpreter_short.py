# stats_interpreter_short.py
# EleveAI — Maths 4e — short jumeau de la série « Statistiques », épisode 09 :
# interpréter des indicateurs. CEINTURE ORANGE (un cran sous la paysage verte).
# Il AMUSE : « Mbappé, 162 buts en 6 saisons : combien par saison ? »
#   · en HAUT, le ballon saute au-dessus de chaque saison au moment où
#   · en BAS, EN MÊME TEMPS, sa barre pousse (`stat_graph` barres du coach,
#     manim/canvas_stats.py) et son nombre de buts s'écrit au mot dit ;
#   · 162 ÷ 6 = 27 : la ligne de la moyenne ; la saison à 18 est celle du Covid ;
#     fin : « sans elle, quelle moyenne ? » (144 ÷ 5 = 28,8), « Réponds en commentaire ! ».
# ⭐ Données RÉELLES (Wikipédia, vérifiées le 21/10/2026) : voir stats_interpreter.py.
# ⛔ PAS D'ÉCART : un nombre n'apparaît qu'au mot où la voix le dit.
#
# Voix : manim/voix/4e-stats-interpreter-short.json (débit −10) ; marques :
# manim/scripts/4e/stats_interpreter_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/4e/stats_interpreter_short.py StatsInterpreterShort4e -o eleveai-maths-4e-stats-interpreter-short --media_dir manim/scripts/4e/media-interpreter-short
# Sortie : manim/sorties/4e/maths/statistiques/09-interpreter/eleveai-maths-4e-stats-interpreter-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats4e_lote_commun import *  # noqa: E402,F403
import importlib.util  # noqa: E402

# ⚠️ manim/scripts/6e/stats_interpreter.py porte le même nom : on charge le NÔTRE par son chemin
_spec = importlib.util.spec_from_file_location("stats_interpreter_4e", Path(__file__).resolve().parent /
                                               "stats_interpreter.py")
_m = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(_m)
BUTS, PSG, SAISONS, ballon = _m.BUTS, _m.PSG, _m.SAISONS, _m.ballon

Y_IMG, Y_TXT = 1.75, 1.0
HAUT_CARTE = 0.45


class StatsInterpreterShort4e(Short4e):
    nom_voix = "4e-stats-interpreter-short"
    fichier_marques = "stats_interpreter_short_marques.json"

    def graphe(self):
        g = Barres(SAISONS, BUTS, pas=10, sous_pas=5, maxi=40, couleurs=[PSG] * 6, nom_axe="Buts", largeur=3.7,
                   hauteur=2.1, fs=20)
        slot = 3.7 / 6
        for e, c in zip(g.etiquettes, SAISONS):  # « 18-19 » : presque toute la case
            neuf = texte(c, 19)
            neuf.scale_to_fit_width(min(neuf.width, slot * 0.82)).move_to(e).align_to(e, UP)
            e.become(neuf)
        if g.width > 4.35:
            g.scale_to_fit_width(4.35)
        return g.move_to(P(0, HAUT_CARTE - g.height / 2))

    def construct(self):
        self.margo_bas()
        titre, badge = self.entete_short("Mbappé au PSG", "orange")
        self.add(badge)
        g = self.graphe()
        b = ballon(0.3)

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        self.play(Write(titre), FadeIn(g.fond), run_time=0.5)
        self.au_mot("162 buts")
        l = self.ligne([("162", AMBRE), ("buts", WHITE)], 40).move_to(P(0, Y_IMG))
        self.play(FadeIn(l, scale=0.8), run_time=0.35)
        self.au_mot("6 saisons")
        l2 = self.ligne([("en", WHITE), ("6", AMBRE), ("saisons", WHITE)], 38).move_to(P(0, Y_TXT))
        self.play(FadeIn(l2, shift=UP * 0.2), run_time=0.35)
        self.au_mot("Combien par saison")
        q = self.ligne([("par saison :", WHITE), ("?", ORANGE_RETENUE)], 40).move_to(P(0, Y_TXT))
        self.play(FadeOut(l2), FadeIn(q, shift=UP * 0.2), run_time=0.35)
        self.insister(q[1], 1.5)
        self.attendre_voix(marge=0.1)

        # ── 01 : les barres poussent ──
        self.dire("01-image")
        self.au_mot("Les barres poussent")
        b.move_to(P(g.point(0)[0], Y_IMG))
        self.play(FadeOut(l), FadeOut(q), FadeIn(b, shift=DOWN * 0.3), run_time=0.35)
        vals = VGroup()
        for i, mot in enumerate(["33", "18", "27", "28", "29", "27, Je"]):
            if i == 5:
                self.au_mot("27. Je")
            else:
                self.au_mot(mot)
            v = g.valeur(i, fs=24)
            vals.add(v)
            x = g.point(i)[0]
            saut = b.animate(path_arc=-PI / 2).move_to(P(x, Y_IMG)) if i else Indicate(b)
            self.play(saut, g.pousser(i, run_time=0.3), FadeIn(v, scale=1.6, run_time=0.3), run_time=0.3)
        self.au_mot("162 divisé par 6")
        c = self.ligne([("162", AMBRE), ("÷", WHITE), ("6", AMBRE)], 44).move_to(P(0, Y_TXT))
        self.play(FadeOut(b), FadeIn(c, shift=UP * 0.2), run_time=0.35)
        self.au_mot("égale 27")
        r = self.ligne([("=", WHITE), ("27", VERT_OK)], 44).next_to(c, RIGHT, buff=0.15)
        VGroup(c, r).move_to(P(0, Y_TXT))
        y27 = g.y_axe(27)
        ligne = DashedLine(y27, P(g.barres[-1].get_right()[0] + 0.1, y27[1]), color=VERT_OK, stroke_width=5,
                           dash_length=0.12)
        self.play(FadeIn(r, scale=1.4), Create(ligne), run_time=0.5)
        self.au_mot("La moyenne, c'est 27")
        moy = self.ligne([("moyenne :", VERT_OK), ("27", VERT_OK), ("buts", WHITE)], 40).move_to(P(0, Y_IMG))
        self.play(FadeIn(moy, shift=DOWN * 0.2), run_time=0.35)
        self.insister(moy[1], 1.3)
        self.au_mot("la saison à 18")
        self.play(g.focus(1, 0.35), Indicate(vals[1], color=ORANGE_RETENUE, scale_factor=1.6), run_time=0.5)
        self.au_mot("celle du Covid")
        cov = self.ligne([("Covid :", ORANGE_RETENUE), ("arrêtée en mars", WHITE)], 34).move_to(P(0, Y_IMG))
        self.play(FadeOut(moy), FadeIn(cov, scale=0.8), run_time=0.35)
        self.attendre_voix(marge=0.3)

        # ── 02 : la question ──
        self.dire("02-question")
        self.au_mot("sans la saison du Covid")
        x = croix(VGroup(g.barres[1], vals[1]), sw=5)
        self.play(Create(x), g.rallumer(), run_time=0.4)
        self.play(g.estomper([0, 2, 3, 4, 5], 0.25), run_time=0.3)
        self.au_mot("moyenne des 5 autres")
        q2 = self.ligne([("5 saisons :", WHITE), ("moyenne", VERT_OK), ("?", ORANGE_RETENUE)], 38)
        q2.move_to(P(0, Y_IMG))
        self.play(FadeOut(cov), FadeOut(VGroup(c, r)), FadeIn(q2, shift=DOWN * 0.2), run_time=0.4)
        self.insister(q2[2], 1.5)
        self.au_mot("Réponds en commentaire")
        appel = self.borne(self.t("Réponds en commentaire !", 34, VERT_OK)).move_to(P(0, Y_TXT))
        self.play(FadeIn(appel, scale=0.7), run_time=0.35)
        self.insister(appel, 1.1, 0.25)
        self.attendre_voix(marge=1.5)
