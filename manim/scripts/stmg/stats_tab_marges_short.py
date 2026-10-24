# stats_tab_marges_short.py
# EleveAI — Maths STMG — short jumeau de la série « Statistiques », lycée,
# épisode 06 : les marges d'un tableau croisé. CEINTURE BLANCHE. Il AMUSE :
# « Plus de femmes que d'hommes chez les médecins ? »
#   · en HAUT la croix de la santé ; en BAS la colonne « Femmes » du tableau du
#     coach (52, 67, et la marge « ? ») ;
#   · question-pause (119 / 100 / 52) : la marge d'une colonne, on la DESCEND ;
#   · fin : les hommes, 48 et 70 → combien en tout ? « Réponds en commentaire ! »
#     (réponse attendue : 118 milliers ; 119 > 118 : de justesse).
# Source : DREES, médecins au 1er janvier 2025 (voir stats_tab_marges.py).
# Centres d'intérêt : corps-sante.
#
# Voix : manim/voix/stmg-stats-tab-marges-short.json (débit −7) ; calage :
# manim/scripts/stmg/stats_tab_marges_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/stats_tab_marges_short.py StatsTabMargesShort -o eleveai-maths-stmg-stats-tab-marges-short --media_dir manim/scripts/stmg/media-stats-tab-marges-short
# Sortie : manim/sorties/stmg/maths/statistiques/06-tab-marges/

import importlib.util
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats_lycee_i1_commun import *  # noqa: E402,F403

_spec = importlib.util.spec_from_file_location("stmg_stats_tab_marges",
                                               Path(__file__).resolve().parent / "stats_tab_marges.py")
_ep = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(_ep)
croix_medicale, ROSE_P = _ep.croix_medicale, _ep.ROSE_P


class StatsTabMargesShort(ShortI1):
    nom_voix = "stmg-stats-tab-marges-short"
    fichier_marques = "stats_tab_marges_short_marques.json"

    def tab(self, entete, valeurs):
        t = Tableau([entete], [[v] for v in valeurs], libelles=["Généralistes", "Spécialistes", "Total"], coin="",
                    largeur_case=1.45, largeur_libelle=2.3, hauteur=0.8, fs=26, titre="Médecins (milliers)")
        return caser(textes_devant(t), -1.95, 1.95, -2.9, 0.55)

    def construct(self):
        margo = self.margo_bas()
        titre, badge = self.entete_short("Femmes médecins ?", ceinture="blanche")
        self.add(badge)
        cr = croix_medicale(0.75).move_to(P(0, 1.55))
        t = self.tab("Femmes", [None, None, None])

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        self.play(Write(titre), FadeIn(cr, scale=0.6), FadeIn(t), run_time=0.6)
        self.au_mot("Vérifions")
        self.play(Indicate(cr, color=AMBRE), run_time=0.5)
        self.attendre_voix(marge=0.1)

        # ── 01 : deux cases ──
        self.dire("01-image")
        self.au_mot("52 milliers")
        self.play(remplir(t, 0, 0, 52), *allumer(t, 0, 0), run_time=0.4)
        self.au_mot("67 milliers")
        self.play(*eteindre(t), run_time=0.15)
        self.play(remplir(t, 1, 0, 67), *allumer(t, 1, 0), run_time=0.4)
        self.play(remplir(t, 2, 0, "?"), run_time=0.3)
        self.insister(t.cases[2][0], 1.4)
        self.attendre_voix(marge=0.1)

        # ── 02 : la question-pause ──
        tout = Group(*[m for m in self.mobjects if m is not badge and m is not margo])
        self.play(FadeOut(tout), run_time=0.3)
        ecran = self.question_short("02-question", "02b-reponse", ["Combien de femmes", "médecins en tout ?"],
                                    ["119 milliers", "100 milliers", "52 milliers"], 0, ["je descends : 52 + 67 = 119"],
                                    ys=(-0.12, -0.97, -1.82), y_bas=-2.58)
        self.play(FadeOut(ecran), run_time=0.3)

        # ── 03 : la question en commentaire ──
        self.dire("03-question")
        t2 = self.tab("Hommes", [None, None, None])
        self.add(titre)
        self.play(FadeIn(t2), run_time=0.3)
        self.au_mot("48 milliers")
        self.play(remplir(t2, 0, 0, 48), *allumer(t2, 0, 0), run_time=0.4)
        self.au_mot("70 milliers")
        self.play(*eteindre(t2), run_time=0.15)
        self.play(remplir(t2, 1, 0, 70), *allumer(t2, 1, 0), run_time=0.4)
        self.au_mot("Combien d'hommes")
        self.play(remplir(t2, 2, 0, "?"), run_time=0.3)
        self.insister(t2.cases[2][0], 1.4)
        l = self.t("en tout ?", 38, ORANGE_RETENUE).move_to(P(0, 1.75))
        self.play(FadeIn(l, scale=0.8), run_time=0.3)
        self.au_mot("Réponds en commentaire")
        appel = self.borne(self.t("Réponds en commentaire !", 30, VERT_OK)).move_to(P(0, 1.1))
        self.play(FadeIn(appel, scale=0.7), run_time=0.35)
        self.insister(appel, 1.1, 0.25)
        self.attendre_voix(marge=1.5)
