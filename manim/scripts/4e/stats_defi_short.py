# stats_defi_short.py
# EleveAI — Maths 4e — short jumeau de la série « Statistiques », épisode 11 :
# défis sur les indicateurs. CEINTURE VERTE (un cran sous la paysage bleue). Il
# AMUSE : « Combien de buts cachés ? »
#   · en HAUT, le ballon saute au-dessus de chaque saison et le calcul s'écrit ;
#   · en BAS, EN MÊME TEMPS, les saisons de Michael Olise (`stat_graph` barres du
#     coach, manim/canvas_stats.py) ; la 5e barre est un « ? » qui pousse à 15
#     quand la voix dit 15 (8,2 × 5 = 41, 41 − 26 = 15) ;
#   · fin : « moyenne de 9 sur 6 saisons : combien en 6e saison ? » (54 − 41 = 13),
#     « Réponds en commentaire ! ».
# ⭐ Données RÉELLES (sources et date : voir l'en-tête de stats_defi.py, 4e).
# ⛔ PAS D'ÉCART : un nombre n'apparaît qu'au mot où la voix le dit.
#
# Voix : manim/voix/4e-stats-defi-short.json (débit −10) ; marques :
# manim/scripts/4e/stats_defi_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/4e/stats_defi_short.py StatsDefiShort4e -o eleveai-maths-4e-stats-defi-short --media_dir manim/scripts/4e/media-defi-short
# Sortie : manim/sorties/4e/maths/statistiques/11-defi/eleveai-maths-4e-stats-defi-short.mp4

import importlib.util
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats4e_lote_commun import *  # noqa: E402,F403

# ⚠️ manim/scripts/6e/stats_defi.py porte le même nom : on charge le NÔTRE par son chemin
_spec = importlib.util.spec_from_file_location("stats_defi_4e", Path(__file__).resolve().parent / "stats_defi.py")
_m = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(_m)
SAISONS, BUTS, COUL, ballon = _m.SAISONS, _m.BUTS, _m.COUL, _m.ballon

Y_IMG, Y_TXT = 1.75, 1.0
HAUT_CARTE = 0.45


class StatsDefiShort4e(Short4e):
    nom_voix = "4e-stats-defi-short"
    fichier_marques = "stats_defi_short_marques.json"

    def graphe(self):
        g = Barres(SAISONS[:5], BUTS[:5], pas=5, sous_pas=1, maxi=20, couleurs=COUL[:5], nom_axe="Buts",
                   largeur=3.6, hauteur=2.1, fs=21)
        slot = 3.6 / 5
        for e, c in zip(g.etiquettes, SAISONS[:5]):
            neuf = texte(c, 19)
            neuf.scale_to_fit_width(min(neuf.width, slot * 0.86)).move_to(e).align_to(e, UP)
            e.become(neuf)
        if g.width > 4.35:
            g.scale_to_fit_width(4.35)
        return g.move_to(P(0, HAUT_CARTE - g.height / 2))

    def construct(self):
        self.margo_bas()
        titre, badge = self.entete_short("Les buts cachés", "verte")
        self.add(badge)
        g = self.graphe()
        vals = VGroup(*[g.valeur(i, fs=24) for i in range(5)])
        b = r = Rectangle(width=g.barres[4].width, height=0.75).move_to(g.barres[4].get_bottom(), aligned_edge=DOWN)
        trou = VGroup(DashedVMobject(r, num_dashes=18).set_stroke(ORANGE_Q, 4), texte("?", 30, ORANGE_Q).move_to(r))
        bal = ballon(0.24)

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        self.au_mot("Michael Olise")
        nom = self.t("Michael Olise", 40, JAUNE_TITRE).move_to(P(0, Y_IMG))
        self.play(Write(titre), FadeIn(g.fond), FadeIn(nom), run_time=0.5)
        bal.move_to(P(g.point(0)[0], Y_TXT))
        for i, (mot, n) in enumerate([("2, 2", 1), ("2, 10", 1), ("10 et", 1), ("12 buts", 1)]):
            self.au_mot(mot, n)
            saut = bal.animate(path_arc=-PI / 2).move_to(P(g.point(i)[0], Y_TXT)) if i else FadeIn(bal)
            self.play(saut, g.pousser(i, run_time=0.3), FadeIn(vals[i], scale=1.6, run_time=0.3), run_time=0.3)
        self.au_mot("Moyenne : 6,5")
        m1 = self.ligne([("moyenne :", WHITE), ("6,5", VERT_OK)], 38).move_to(P(0, Y_TXT))
        self.play(FadeOut(bal), FadeIn(m1, shift=UP * 0.2), run_time=0.35)
        self.au_mot("5e saison")
        self.play(Create(trou[0]), FadeIn(trou[1], scale=1.5), run_time=0.4)
        self.au_mot("grimpe à 8,2")
        m2 = self.ligne([("5 saisons :", WHITE), ("8,2", VERT_OK)], 38).move_to(P(0, Y_IMG))
        self.play(FadeOut(nom), FadeIn(m2, shift=DOWN * 0.2), run_time=0.35)
        self.au_mot("Combien de buts cachés")
        self.insister(trou[1], 1.7)
        self.attendre_voix(marge=0.1)

        # ── 01 : les sommes parlent ──
        self.dire("01-image")
        self.au_mot("8,2 fois 5")
        c1 = self.ligne([("8,2", VERT_OK), ("×", WHITE), ("5", WHITE)], 44).move_to(P(0, Y_IMG))
        self.play(FadeOut(m2), FadeIn(c1, shift=DOWN * 0.2), run_time=0.35)
        self.au_mot("égale 41")
        r1 = self.ligne([("=", WHITE), ("41", AMBRE)], 44).next_to(c1, RIGHT, buff=0.15)
        VGroup(c1, r1).move_to(P(0, Y_IMG))
        self.play(FadeIn(r1, scale=1.4), run_time=0.3)
        self.au_mot("Moins les 26")
        c2 = self.ligne([("41", AMBRE), ("−", WHITE), ("26", AMBRE)], 44).move_to(P(0, Y_TXT))
        self.play(FadeOut(m1), FadeIn(c2, shift=UP * 0.2), Indicate(VGroup(*vals[:4]), color=AMBRE), run_time=0.5)
        self.au_mot("15 buts")
        r2 = self.ligne([("=", WHITE), ("15", VERT_OK)], 44).next_to(c2, RIGHT, buff=0.15)
        VGroup(c2, r2).move_to(P(0, Y_TXT))
        self.play(FadeIn(r2, scale=1.4), FadeOut(trou), g.pousser(4, run_time=0.6), run_time=0.6)
        self.play(FadeIn(vals[4], scale=1.8), Flash(vals[4], color=VERT_OK), run_time=0.45)
        self.au_mot("exactement")
        self.insister(VGroup(c2, r2), 1.15)
        ok = self.coche(VERT_OK, 0.26).next_to(r2, RIGHT, buff=0.12)
        self.play(Create(ok), run_time=0.3)
        self.attendre_voix(marge=0.3)

        # ── 02 : la question ──
        self.dire("02-question")
        self.au_mot("sur 6 saisons montait à 9")
        q = self.ligne([("6 saisons :", WHITE), ("moyenne", WHITE), ("9", VERT_OK)], 36).move_to(P(0, 2.0))
        self.play(FadeOut(VGroup(c1, r1, c2, r2, ok), shift=UP * 0.2), FadeIn(q, shift=DOWN * 0.2), run_time=0.4)
        self.au_mot("combien de buts en 6e saison")
        q2 = self.ligne([("6e saison :", WHITE), ("?", ORANGE_RETENUE)], 40).move_to(P(0, 1.42))
        self.play(FadeIn(q2, shift=UP * 0.2), run_time=0.35)
        self.insister(q2[1], 1.5)
        self.au_mot("Réponds en commentaire")
        appel = self.borne(self.t("Réponds en commentaire !", 32, VERT_OK)).move_to(P(0, 0.82))
        self.play(FadeIn(appel, scale=0.7), run_time=0.35)
        self.insister(appel, 1.1, 0.25)
        self.attendre_voix(marge=1.5)
