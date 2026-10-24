# stats_tab_lire_short.py
# EleveAI — Maths 1re / STMG — short jumeau de la série « Statistiques », lycée,
# épisode « lire un tableau croisé ». CEINTURE BLANCHE. Il AMUSE :
# « Les femmes Nobel en sciences : plus nombreuses depuis 2000 que pendant tout
# le siècle d'avant ? »
#   · en HAUT la médaille Nobel ; en BAS le tableau croisé du coach : la marge
#     « 1901 à 1999 » (11) s'allume, puis « 2000 à 2025 » est un « ? » ;
#   · question-pause (16, 27 ou 5 ?), réponse : la colonne se remplit 3 + 5 + 8 ;
#   · fin : médecine, 14 au total dont 8 depuis 2000 → « Réponds en commentaire ! ».
# Source : lauréates des prix Nobel 1901-2025 (voir stats_tab_lire.py).
# Centres d'intérêt : histoire-geographie, sciences.
#
# Voix : manim/voix/lycee-stats-tab-lire-short.json (débit −7) ; calage :
# manim/scripts/stmg/stats_tab_lire_short_marques.json.
# Le short n'affiche aucune classe : rendu UNE fois, copié sous les deux noms.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/stats_tab_lire_short.py StatsTabLireShort -o eleveai-maths-stmg-stats-tab-lire-short --media_dir manim/scripts/stmg/media-stats-tab-lire-short
# Sorties : manim/sorties/stmg/maths/statistiques/05-tab-lire/eleveai-maths-stmg-stats-tab-lire-short.mp4
#           manim/sorties/premiere-commun/maths/statistiques/04-tab-lire/eleveai-maths-premiere-commun-stats-tab-lire-short.mp4 (copie)

import importlib.util
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats_lycee_h1_commun import *  # noqa: E402,F403

_spec = importlib.util.spec_from_file_location("stmg_stats_tab_lire",
                                               Path(__file__).resolve().parent / "stats_tab_lire.py")
_ep = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(_ep)
LIGNES, VALEURS, medaille_nobel = _ep.LIGNES, _ep.VALEURS, _ep.medaille_nobel

Y_TXT = 1.55
COLS = ["1901-1999", "2000-2025", "Total"]


class StatsTabLireShort(ShortLycee):
    nom_voix = "lycee-stats-tab-lire-short"
    fichier_marques = "stats_tab_lire_short_marques.json"

    def tableau(self, lignes):
        t = Tableau(COLS, lignes, libelles=LIGNES, coin="", largeur_case=1.2, largeur_libelle=1.35, hauteur=0.7,
                    fs=24, titre="Femmes Nobel")
        return caser(textes_devant(t), -2.0, 2.0, -2.8, 1.0)

    def construct(self):
        margo = self.margo_bas()
        titre, badge = self.entete_short("Plus de femmes Nobel ?")
        self.add(badge)
        vide = [[None] * 3 for _ in range(4)]
        t = self.tableau(vide)
        med = medaille_nobel(0.28).move_to(P(-1.75, Y_TXT))

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        self.au_mot("Les femmes Nobel")
        self.play(Write(titre), FadeIn(med, shift=DOWN * 0.2), FadeIn(t, shift=UP * 0.2), run_time=0.6)
        self.au_mot("depuis 2000")
        self.play(*teinter_colonne(t, 1, BLEU_PALE), run_time=0.4)
        self.au_mot("tout le siècle d'avant")
        self.play(*teinter_colonne(t, 0), run_time=0.4)
        self.attendre_voix(marge=0.1)

        # ── 01 : 11, puis « ? » ──
        self.dire("01-image")
        self.au_mot(": 11 prix")
        l1 = self.ligne([("1901-1999 :", WHITE), ("11", JAUNE_TITRE)], 30).move_to(P(0.45, Y_TXT + 0.25))
        self.play(remplir(t, 3, 0, 11), *allumer(t, 3, 0), FadeIn(l1), run_time=0.5)
        self.insister(t.cases[3][0], 1.3)
        self.au_mot("Et de 2000 à 2025")
        l2 = self.ligne([("2000-2025 :", WHITE), ("?", ORANGE_RETENUE)], 30).move_to(P(0.45, Y_TXT - 0.35))
        self.play(remplir(t, 3, 1, "?"), FadeIn(l2), run_time=0.5)
        self.insister(l2[1], 1.5)
        self.attendre_voix(marge=0.1)

        # ── 02 : la question-pause ──
        tout = Group(*[m for m in self.mobjects if m is not badge and m is not margo])
        self.play(FadeOut(tout), run_time=0.3)
        ecran = self.question_short("02-question", "02b-reponse", ["Combien de 2000 à 2025 ?"],
                                    ["16", "27", "5"], 0, ["3 + 5 + 8 = 16", "27 : tout ; 5 : la chimie seule"])
        self.play(FadeOut(ecran), run_time=0.3)

        # ── 03 : la médecine, la question en commentaire ──
        self.dire("03-question")
        lignes = [[None] * 3, [None] * 3, ["?", 8, 14], [11, 16, 27]]
        t2 = self.tableau(lignes)
        self.add(titre)
        self.play(FadeIn(t2), run_time=0.3)
        self.au_mot("14 prix au total")
        l3 = self.ligne([("Médecine :", WHITE), ("14", JAUNE_TITRE)], 34).move_to(P(0, Y_TXT + 0.25))
        self.play(*allumer(t2, 2, 2), FadeIn(l3), run_time=0.4)
        self.au_mot("dont 8 depuis 2000")
        l4 = self.ligne([("dont", WHITE), ("8", BLEU_CALCUL), ("depuis 2000", WHITE)], 32).move_to(P(0, Y_TXT - 0.35))
        self.play(*allumer(t2, 2, 1), FadeIn(l4), run_time=0.4)
        self.au_mot("Combien avant 2000")
        self.play(*allumer(t2, 2, 0), run_time=0.3)
        self.insister(t2.cases[2][0], 1.4)
        self.au_mot("Réponds en commentaire")
        appel = self.borne(self.t("Réponds en commentaire !", 30, VERT_OK)).move_to(P(0, -3.0))
        self.play(FadeOut(l3), FadeOut(l4), run_time=0.2)
        appel.move_to(P(0, Y_TXT))
        self.play(FadeIn(appel, scale=0.7), run_time=0.35)
        self.insister(appel, 1.1, 0.25)
        self.attendre_voix(marge=1.5)
