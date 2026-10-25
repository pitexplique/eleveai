# stats_mc_calculer_short.py
# EleveAI — Maths STMG — short jumeau de l'épisode 28 « Calculer la somme des
# carrés des écarts ». CEINTURE ORANGE (un cran sous la paysage verte).
# Il AMUSE : « le point qui pèse lourd » :
#   · EN HAUT, les écarts deviennent de VRAIS carrés qui poussent ; EN BAS, au
#     même instant, la case « Carré » du tableur se remplit (même couleur rose) ;
#   · surprise : l'écart −4 pèse 16 à lui seul, plus de la moitié de 26 ;
#   · 1 question-pause (3 s) : (−3)² = −9, 9 ou −6 ? ;
#   · fin : écarts 2, −2, 1, 0 : la somme des carrés ? (réponse : 9).
# ⭐ Données RÉELLES : voir l'en-tête de stats_mc_calculer.py (Insee, naissances).
# Centres d'intérêt : corps-sante.
# ⛔ PAS D'ÉCART : un nombre n'apparaît qu'au mot où la voix le dit.
#
# Voix : manim/voix/stmg-stats-mc-calculer-short.json (débit −7) ; marques :
# manim/scripts/stmg/stats_mc_calculer_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/stats_mc_calculer_short.py StatsMcCalculerShort -o eleveai-maths-stmg-stats-mc-calculer-short --media_dir manim/scripts/stmg/media-stats-mc-calculer-short
# Sortie : manim/sorties/stmg/maths/statistiques/28-mc-calculer/eleveai-maths-stmg-stats-mc-calculer-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats_lycee_j2_commun import *  # noqa: E402,F403

ECARTS = [1, -3, -4, 0]
K = 0.24  # côté d'un carré par unité d'écart (le carré de −4 : 0,96)


def txt_e(e):
    return "0" if e == 0 else (f"+{e}" if e > 0 else f"−{-e}")


class StatsMcCalculerShort(ShortJ2):
    nom_voix = "stmg-stats-mc-calculer-short"
    fichier_marques = "stats_mc_calculer_short_marques.json"

    def table(self, ecarts):
        tb = tableur(["1", "2", "3", "4"], [[None] * 4, [None] * 4], ["Écart", "Carré"], coin="Point",
                     largeur_case=0.95, largeur_libelle=1.55, hauteur=0.72, fs=30)
        tb.scale_to_fit_width(config.frame_width - 0.5)
        return tb.move_to(P(0, -0.35))

    def carre(self, tb, j, e):
        """Le carré de l'écart e, au-dessus de la colonne j du tableau."""
        c = max(abs(e) * K, 0.02)
        sq = Square(side_length=c, stroke_color=ROSE_C, stroke_width=3, fill_color=ROSE_C, fill_opacity=0.45)
        return sq.move_to(P(tb.case(0, j).get_x(), 0.75 + c / 2))

    def construct(self):
        self.margo_bas()
        titre, badge = self.entete_short("Le point qui pèse lourd", "orange")
        self.add(badge)
        garder = [badge, titre, self.mobjects[0]]
        tb = self.table(ECARTS)

        # ── 00 : les quatre écarts ──
        self.dire("00-accroche")
        self.play(Write(titre), FadeIn(tb), run_time=0.25)
        self.au_mot("une droite")
        for j, mot in enumerate(["plus 1", "moins 3", "moins 4", "et 0"]):
            self.au_mot(mot)
            self.play(remplir(tb, 0, j, txt_e(ECARTS[j]), "#b45309"), run_time=0.3)
        self.au_mot("Lequel pèse le plus")
        q = self.borne(self.t("Lequel pèse le plus ?", 32, JAUNE_TITRE)).move_to(P(0, 1.6))
        self.play(FadeIn(q, scale=0.7), run_time=0.35)
        self.attendre_voix(marge=0.1)

        # ── 01 : les carrés poussent (en haut) pendant que les cases se remplissent (en bas) ──
        self.dire("01-image")
        self.au_mot("Au carré")
        self.play(FadeOut(q), run_time=0.2)
        sqs = VGroup()
        for j, mot in enumerate(["1, 9", "9, 16", "16 et", "0. Le"]):
            self.au_mot(mot)
            sq = self.carre(tb, j, ECARTS[j])
            sqs.add(sq)
            self.play(GrowFromEdge(sq, DOWN), remplir(tb, 1, j, ECARTS[j] ** 2, ROSE_C), run_time=0.35)
        self.au_mot("Le moins 4 pèse 16")
        self.play(*tb.allumer_colonne(2), Indicate(sqs[2], color=ROSE_C, scale_factor=1.2), run_time=0.5)
        t = self.ligne([("16", ROSE_CLAIR), ("sur", WHITE), ("26", VERT_OK), (": plus de la moitié !", WHITE)], 28)
        t.move_to(P(0, -1.9))
        self.play(FadeIn(t, shift=UP * 0.1), run_time=0.4)
        self.insister(t[2], 1.4)
        self.attendre_voix(marge=0.2)
        self.vider(garder)

        # ── 02 : la question-pause (3 s) ──
        self.question_pause("02-question", "02b-reponse", ["Un écart de −3,", "au carré, ça fait ?"],
                            ["−9", "9", "−6"], 1, ["Un carré n'est", "jamais négatif."], mot_q="Un écart de moins 3")
        self.vider(garder)

        # ── 03 : la question en commentaire ──
        self.dire("03-question")
        tb2 = self.table([2, -2, 1, 0])
        self.play(FadeIn(tb2), run_time=0.35)
        for j, (e, mot) in enumerate(zip([2, -2, 1, 0], ["sont 2", "moins 2", "1 et", "et 0"])):
            self.au_mot(mot)
            self.play(remplir(tb2, 0, j, txt_e(e), "#b45309"), remplir(tb2, 1, j, "?"), run_time=0.3)
        self.au_mot("Quelle est la somme")
        q2 = self.ligne([("Somme des carrés =", WHITE), ("?", ORANGE_RETENUE)], 32).move_to(P(0, 1.6))
        self.play(FadeIn(q2, shift=DOWN * 0.1), run_time=0.35)
        self.insister(q2[1], 1.6)
        self.appel_commentaire(y=-1.9)
