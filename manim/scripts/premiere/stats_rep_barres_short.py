# stats_rep_barres_short.py
# EleveAI — Maths 1re — short jumeau de la série « Statistiques », lycée,
# épisode 07 : lire un diagramme en barres croisé. CEINTURE JAUNE (un cran sous
# la paysage orange). Il AMUSE : « L'IA chaque jour : les ados ou les jeunes
# adultes ? »
#   · en HAUT le téléphone et sa bulle d'IA ; en BAS le diagramme du coach qui
#     pousse barre après barre (12-17 : 26 %, 18-24 : 51 %) ;
#   · question-pause (74, 26 ou 49 % ?) : l'autre part du groupe = 100 − la barre ;
#   · fin : les 60 ans et plus (17 %), sur 200 personnes → « Réponds en commentaire ! »
#     (réponse attendue : 200 × 0,17 = 34).
# Source : Baromètre du numérique 2026 (Crédoc, enquête de juin 2025), voir
# stats_rep_barres.py. Centres d'intérêt : technologie-ia.
#
# Voix : manim/voix/1re-stats-rep-barres-short.json (débit −7) ; calage :
# manim/scripts/premiere/stats_rep_barres_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/premiere/stats_rep_barres_short.py StatsRepBarresShort -o eleveai-maths-premiere-commun-stats-rep-barres-short --media_dir manim/scripts/premiere/media-stats-rep-barres-short
# Sortie : manim/sorties/premiere-commun/maths/statistiques/07-rep-barres/

import importlib.util
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "stmg"))

from stats_lycee_i1_commun import *  # noqa: E402,F403

_spec = importlib.util.spec_from_file_location("premiere_stats_rep_barres",
                                               Path(__file__).resolve().parent / "stats_rep_barres.py")
_ep = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(_ep)
telephone, VIOLET_B = _ep.telephone, _ep.VIOLET_B

Y_TXT = 1.45


class StatsRepBarresShort(ShortI1):
    nom_voix = "1re-stats-rep-barres-short"
    fichier_marques = "stats_rep_barres_short_marques.json"

    def graphe(self):
        g = Barres(["12-17", "18-24", "60 +"], [26, 51, 17], pas=10, sous_pas=5, maxi=60, couleurs=[VIOLET_B] * 3,
                   nom_axe="%", largeur=2.5, hauteur=2.2, fs=24, colonne_lue=True,
                   titre="IA chaque jour (en %)")
        return caser(g, -1.95, 1.95, -3.0, 0.75)

    def construct(self):
        margo = self.margo_bas()
        titre, badge = self.entete_short("L'IA chaque jour ?", ceinture="jaune")
        self.add(badge)
        tel = telephone(1.3).move_to(P(-1.5, 1.45))
        g = self.graphe()

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        self.play(Write(titre), FadeIn(tel, shift=UP * 0.2), FadeIn(g.fond), run_time=0.6)
        self.au_mot("les ados")
        q = VGroup(self.t("les ados", 32, AMBRE), self.t("ou les", 28), self.t("jeunes adultes ?", 32, BLEU_CALCUL))
        q.arrange(DOWN, buff=0.08)
        self.caser_haut(q)
        self.play(FadeIn(q[0], shift=LEFT * 0.2), run_time=0.3)
        self.au_mot("les jeunes adultes")
        self.play(FadeIn(q[1:], shift=LEFT * 0.2), run_time=0.3)
        self.attendre_voix(marge=0.1)

        # ── 01 : les deux barres ──
        self.dire("01-image")
        self.au_mot("26 %")
        self.play(g.pousser(indices=[0], run_time=0.6), run_time=0.6)
        self.play(FadeIn(g.lu(26), scale=1.5), Create(g.vers_axe(0, jusqu_au_lu=True)), run_time=0.4)
        self.au_mot("51 %")
        self.play(g.pousser(indices=[1], run_time=0.6), run_time=0.6)
        self.play(FadeIn(g.lu(51), scale=1.5), Create(g.vers_axe(1, jusqu_au_lu=True)), run_time=0.4)
        self.au_mot("Chaque barre se lit")
        dans = self.caser_haut(self.bloc_s(["une barre :", "une part DANS", "son groupe"], 32))
        self.play(FadeOut(q), FadeIn(dans, scale=0.8), run_time=0.4)
        self.insister(dans, 1.1)
        self.attendre_voix(marge=0.1)

        # ── 02 : la question-pause ──
        tout = Group(*[m for m in self.mobjects if m is not badge and m is not margo])
        self.play(FadeOut(tout), run_time=0.3)
        ecran = self.question_short("02-question", "02b-reponse", ["12-17 ans : qui ne", "s'en sert pas ?"],
                                    ["74 %", "26 %", "49 %"], 0, ["100 − 26 = 74 %"], ys=(-0.12, -0.97, -1.82), y_bas=-2.58)
        self.play(FadeOut(ecran), run_time=0.3)

        # ── 03 : la question en commentaire ──
        self.dire("03-question")
        g2 = self.graphe()
        self.add(titre)
        self.play(FadeIn(g2.fond), run_time=0.3)
        self.play(g2.pousser(indices=[0, 1], run_time=0.5), run_time=0.5)
        self.au_mot("17 %")
        self.play(g2.pousser(indices=[2], run_time=0.5), run_time=0.5)
        self.play(FadeIn(g2.lu(17), scale=1.5), Create(g2.vers_axe(2, jusqu_au_lu=True)), g2.focus(2, 0.35),
                  run_time=0.4)
        self.au_mot("Sur 200 personnes")
        l1 = self.borne(self.ligne([("200", AMBRE), ("personnes de 60 +", WHITE)], 30)).move_to(P(0, 2.0))
        self.play(FadeIn(l1, shift=DOWN * 0.15), run_time=0.4)
        self.au_mot("combien s'en servent")
        l2 = self.ligne([("combien chaque jour ?", ORANGE_RETENUE)], 32).move_to(P(0, 1.45))
        self.play(FadeIn(l2, scale=0.8), run_time=0.4)
        self.insister(l2, 1.12)
        self.au_mot("Réponds en commentaire")
        appel = self.borne(self.t("Réponds en commentaire !", 30, VERT_OK)).move_to(P(0, 0.95))
        self.play(FadeIn(appel, scale=0.7), run_time=0.35)
        self.insister(appel, 1.1, 0.25)
        self.attendre_voix(marge=1.5)

    def caser_haut(self, mob):
        """La bande du haut, à droite du téléphone : de x = -0,95 à 2,0."""
        if mob.width > 2.9:
            mob.scale_to_fit_width(2.9)
        return mob.move_to(P(0.52, 1.45))

    def bloc_s(self, lignes, fs=30, color=WHITE):
        return VGroup(*[self.t(s, fs, color) for s in lignes]).arrange(DOWN, buff=0.08)
