# stats_tab_completer_short.py
# EleveAI — Maths 1re / STMG — short jumeau de la série « Statistiques », lycée,
# épisode « compléter un tableau croisé ». CEINTURE BLANCHE. Il AMUSE :
# « 2024 : record de fusées ! Mais combien ont raté leur mission ? »
#   · en HAUT la fusée qui décolle ; en BAS la ligne « Total » du tableau du
#     coach : 261 | 253 | « ? » ;
#   · question-pause (8, 253 ou 514 ?) : la marge est une somme, on soustrait ;
#   · fin : la Chine, 68 lancements dont 3 ratés → « Réponds en commentaire ! ».
# Source : Wikipédia « 2024 in spaceflight » (voir stats_tab_completer.py).
# Centres d'intérêt : espace, technologie-ia.
#
# Voix : manim/voix/lycee-stats-tab-completer-short.json (débit −7) ; calage :
# manim/scripts/stmg/stats_tab_completer_short_marques.json.
# Le short n'affiche aucune classe : rendu UNE fois, copié sous les deux noms.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/stats_tab_completer_short.py StatsTabCompleterShort -o eleveai-maths-stmg-stats-tab-completer-short --media_dir manim/scripts/stmg/media-stats-tab-completer-short
# Sorties : manim/sorties/stmg/maths/statistiques/07-tab-completer/eleveai-maths-stmg-stats-tab-completer-short.mp4
#           manim/sorties/premiere-commun/maths/statistiques/05-tab-completer/eleveai-maths-premiere-commun-stats-tab-completer-short.mp4 (copie)

import importlib.util
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats_lycee_h1_commun import *  # noqa: E402,F403

_spec = importlib.util.spec_from_file_location("stmg_stats_tab_completer",
                                               Path(__file__).resolve().parent / "stats_tab_completer.py")
_ep = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(_ep)
fusee = _ep.fusee

Y_TXT = 1.55


class StatsTabCompleterShort(ShortLycee):
    nom_voix = "lycee-stats-tab-completer-short"
    fichier_marques = "stats_tab_completer_short_marques.json"

    def ligne_tab(self, libelle, valeurs, titre):
        t = Tableau(["Réussis", "Ratés", "Total"], [valeurs], libelles=[libelle], coin="", largeur_case=1.25,
                    largeur_libelle=1.3, hauteur=0.8, fs=26, titre=titre)
        return caser(textes_devant(t), -2.0, 2.0, -2.4, -0.6)

    def construct(self):
        margo = self.margo_bas()
        titre, badge = self.entete_short("Record de fusées !")
        self.add(badge)
        f = fusee(1.0).move_to(P(-1.5, -0.1))
        t = self.ligne_tab("2024", [None, None, None], "Lancements orbitaux")

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        self.play(Write(titre), FadeIn(f), FadeIn(t), run_time=0.5)
        self.au_mot("record de fusées")
        self.play(f.animate.shift(UP * 1.6), run_time=1.0, rate_func=rush_into)
        self.au_mot("combien ont raté")
        q = self.t("raté ?", 40, ORANGE_RETENUE).move_to(P(0.6, Y_TXT))
        self.play(FadeIn(q, scale=0.6), run_time=0.3)
        self.attendre_voix(marge=0.1)

        # ── 01 : 261, 253, la case manquante ──
        self.dire("01-image")
        self.au_mot("261 lancements")
        self.play(FadeOut(q), remplir(t, 0, 2, 261), *allumer(t, 0, 2), run_time=0.4)
        self.au_mot("253 réussis")
        self.play(remplir(t, 0, 0, 253), *allumer(t, 0, 0), run_time=0.4)
        self.au_mot("Il manque une case")
        self.play(remplir(t, 0, 1, "?"), run_time=0.4)
        self.insister(t.cases[0][1], 1.5)
        self.attendre_voix(marge=0.1)

        # ── 02 : la question-pause ──
        tout = Group(*[m for m in self.mobjects if m is not badge and m is not margo])
        self.play(FadeOut(tout), run_time=0.3)
        ecran = self.question_short("02-question", "02b-reponse", ["Combien de ratés ?"], ["8", "253", "514"], 0,
                                    ["261 − 253 = 8", "514 : on a additionné !"])
        self.play(FadeOut(ecran), run_time=0.3)

        # ── 03 : la Chine, la question en commentaire ──
        self.dire("03-question")
        t2 = self.ligne_tab("Chine", [None, None, None], "Lancements 2024")
        self.add(titre)
        self.play(FadeIn(t2), run_time=0.3)
        self.au_mot("68 lancements")
        self.play(remplir(t2, 0, 2, 68), *allumer(t2, 0, 2), run_time=0.4)
        self.au_mot("dont 3 ratés")
        self.play(remplir(t2, 0, 1, 3), *allumer(t2, 0, 1), run_time=0.4)
        self.au_mot("Combien de réussis")
        self.play(remplir(t2, 0, 0, "?"), run_time=0.4)
        self.insister(t2.cases[0][0], 1.5)
        self.au_mot("Réponds en commentaire")
        appel = self.borne(self.t("Réponds en commentaire !", 30, VERT_OK)).move_to(P(0, Y_TXT))
        self.play(FadeIn(appel, scale=0.7), run_time=0.35)
        self.insister(appel, 1.1, 0.25)
        self.attendre_voix(marge=1.5)
