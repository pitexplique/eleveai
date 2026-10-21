# stats_lire_tableau_short.py
# EleveAI — Maths 5e / 4e — short jumeau de la série « Statistiques » (cycle 4),
# épisode commun « lire un tableau ». CEINTURE BLANCHE. Il AMUSE :
# « À Noël, les vols vers Paris doublent ? Faux ! »
#   · en HAUT, les avions : 28 petits avions en avril, 42 en décembre (un
#     avion = un vol : on peut les compter), qui apparaissent au mot ;
#   · en BAS, EN MÊME TEMPS, le tableau du coach (`tableau_donnees`, colonne
#     Paris) : 28 et 42 s'écrivent au mot ; les 14 avions de plus s'allument ;
#   · fin : « pour doubler, combien de vols ? » (réponse : 56).
# ⛔ PAS D'ÉCART : un nombre n'apparaît qu'au moment où la voix le dit.
# Le short n'affiche aucune classe : rendu UNE fois, copié sous les deux noms.
# Voix : manim/voix/5e-stats-lire-tableau-short.json ; calage :
# manim/scripts/5e/stats5_lire_tableau_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/5e/stats_lire_tableau_short.py StatsLireTableauShort -o eleveai-maths-5e-stats-lire-tableau-short --media_dir manim/scripts/5e/media-lire-tableau-short
# Sorties : manim/sorties/5e/maths/statistiques/02-lire-tableau/eleveai-maths-5e-stats-lire-tableau-short.mp4
#           manim/sorties/4e/maths/statistiques/01-lire-tableau/eleveai-maths-4e-stats-lire-tableau-short.mp4 (copie)

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats5_lotd_commun import *  # noqa: E402,F403
from stats_lire_tableau import avion  # noqa: E402

Y_TXT = 0.0
Y2 = -0.55


def flotte(n, cols=7, s=0.075, couleur=WHITE):
    """n petits avions rangés par lignes de `cols`."""
    g = VGroup(*[avion(s, couleur) for _ in range(n)])
    return g.arrange_in_grid(cols=cols, buff=(0.05, 0.07))


class StatsLireTableauShort(Short5):
    nom_voix = "5e-stats-lire-tableau-short"
    fichier_marques = "stats5_lire_tableau_short_marques.json"

    def construct(self):
        self.margo_bas()
        titre, badge = self.entete_short("Noël en avion", "blanche")
        self.add(badge)
        av_a = flotte(28).move_to(P(-1.1, 2.05), aligned_edge=UP)
        av_d = flotte(42).move_to(P(1.1, 2.05), aligned_edge=UP)
        la = self.t("Avril", 28).next_to(av_d, DOWN, buff=0.15).set_x(av_a.get_x())
        ld = self.t("Décembre", 28).next_to(av_d, DOWN, buff=0.15)
        tab = Tableau(["Paris"], [[28], [42]], libelles=["Avril", "Décembre"], coin="Vols", largeur_case=1.3,
                      largeur_libelle=2.0, hauteur=0.7, fs=30)
        tab.scale_to_fit_width(3.0).move_to(P(0, -1.95))
        textes_devant(tab)
        for r in range(2):
            tab.texte_case(r, 0).set_opacity(0)

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        grand = avion(0.55, JAUNE_TITRE).move_to(P(-2.6, 0.6))
        self.play(FadeIn(titre), run_time=0.3)
        self.play(grand.animate.move_to(P(2.6, 1.6)).rotate(0.3), run_time=1.6)
        self.remove(grand)
        self.au_mot("vers Paris")
        self.play(FadeIn(tab, shift=UP * 0.2), run_time=0.4)
        self.au_mot("doublent")
        q = self.ligne([("en décembre :", WHITE), ("× 2", ORANGE_RETENUE), ("?", ORANGE_RETENUE)], 38).move_to(P(0, Y_TXT))
        self.play(FadeIn(q, scale=0.7), run_time=0.35)
        self.au_mot("Vrai ou faux")
        vf = self.t("Vrai ou faux ?", 42, ORANGE_RETENUE).move_to(P(0, Y2))
        self.play(FadeIn(vf, scale=0.6), run_time=0.35)
        self.insister(vf, 1.15)
        self.attendre_voix(marge=0.1)

        # ── 01 : faux ! ──
        self.dire("01-image")
        self.au_mot("Faux")
        faux = self.t("Faux !", 52, ROUGE_ERREUR).move_to(P(0, Y_TXT))
        self.play(FadeOut(vf), FadeOut(q), FadeIn(faux, scale=1.6), run_time=0.35)
        self.insister(faux, 1.2)
        self.au_mot("En avril")
        self.play(FadeOut(faux), FadeIn(la), *allumer(tab, 0, 0), run_time=0.3)
        self.au_mot("28 vols")
        self.play(tab.texte_case(0, 0).animate.set_opacity(1),
                  LaggedStart(*[FadeIn(a, scale=0.3) for a in av_a], lag_ratio=0.03), run_time=1.0)
        self.au_mot("En décembre")
        self.play(*eteindre(tab), run_time=0.15)
        self.play(FadeIn(ld), *allumer(tab, 1, 0), run_time=0.3)
        self.au_mot("42.")
        self.play(tab.texte_case(1, 0).animate.set_opacity(1),
                  LaggedStart(*[FadeIn(a, scale=0.3) for a in av_d], lag_ratio=0.02), run_time=1.0)
        self.au_mot("14 de plus")
        plus = self.ligne([("14", VERT_OK), ("de plus", WHITE)], 42).move_to(P(0, Y_TXT))
        self.play(FadeIn(plus, scale=0.7), *[a.animate.set_color(VERT_OK) for a in av_d[28:]], run_time=0.5)
        self.insister(plus[0], 1.5)
        self.au_mot("pas le double")
        pd = self.t("pas le double !", 40, ORANGE_RETENUE).move_to(P(0, Y2))
        self.play(FadeIn(pd, shift=UP * 0.2), run_time=0.35)
        self.attendre_voix(marge=0.3)

        # ── 02 : la question ──
        self.dire("02-question")
        self.au_mot("Pour doubler")
        dbl = self.ligne([("Pour doubler :", WHITE), ("?", ORANGE_RETENUE), ("vols", WHITE)], 38).move_to(P(0, Y_TXT))
        self.play(FadeOut(plus), FadeOut(pd), FadeIn(dbl, shift=UP * 0.2), *eteindre(tab), run_time=0.4)
        self.insister(dbl[1], 1.7)
        self.au_mot("Réponds en commentaire")
        appel = self.borne(self.t("Réponds en commentaire !", 34, VERT_OK)).move_to(P(0, Y2))
        self.play(FadeIn(appel, scale=0.7), run_time=0.35)
        self.insister(appel, 1.1, 0.25)
        self.attendre_voix(marge=1.5)
