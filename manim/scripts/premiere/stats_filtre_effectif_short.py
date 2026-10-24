# stats_filtre_effectif_short.py
# EleveAI — Maths 1re — short jumeau de la série « Statistiques », lycée,
# épisode 18 : l'effectif d'un filtre. CEINTURE VERTE (un cran sous la paysage
# bleue). Il AMUSE : « Patrimoine en danger ».
#   · en HAUT le temple ; en BAS le tableau croisé du coach (Naturel / Culturel
#     × En péril / Hors péril, avec ses marges) ;
#   · question-pause (294 / 282 / 12) : OU = ligne + colonne − la case commune ;
#   · fin : culturels 991 dont 42 en péril → combien hors péril ? « Réponds en
#     commentaire ! » (réponse attendue : 949).
# Source : Unesco, Liste du patrimoine mondial (XML, 1 273 biens), voir
# stats_filtre_effectif.py. Centres d'intérêt : histoire-geographie, art-design.
#
# Voix : manim/voix/1re-stats-filtre-effectif-short.json (débit −7) ; calage :
# manim/scripts/premiere/stats_filtre_effectif_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/premiere/stats_filtre_effectif_short.py StatsFiltreEffectifShort -o eleveai-maths-premiere-commun-stats-filtre-effectif-short --media_dir manim/scripts/premiere/media-stats-filtre-effectif-short
# Sortie : manim/sorties/premiere-commun/maths/statistiques/18-filtre-effectif/

import importlib.util
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "stmg"))

from stats_lycee_i1_commun import *  # noqa: E402,F403

_spec = importlib.util.spec_from_file_location("premiere_stats_filtre_effectif",
                                               Path(__file__).resolve().parent / "stats_filtre_effectif.py")
_ep = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(_ep)
temple, VIOLET_P, ORANGE_P = _ep.temple, _ep.VIOLET_P, _ep.ORANGE_P


class StatsFiltreEffectifShort(ShortI1):
    nom_voix = "1re-stats-filtre-effectif-short"
    fichier_marques = "stats_filtre_effectif_short_marques.json"

    VALS = [[12, 228, 240], [42, 949, 991], [0, 42, 42], [54, 1219, 1273]]

    def tab(self):
        """Le tableau croisé du coach, VIDE : chaque nombre s'écrit au mot (remplir)."""
        t = Tableau(["Péril", "Hors", "Total"], [[None] * 3 for _ in range(4)],
                    libelles=["Naturel", "Culturel", "Mixte", "Total"], coin="", largeur_case=1.3,
                    largeur_libelle=1.9, hauteur=0.72, fs=26)
        return caser(textes_devant(t), -1.95, 1.95, -2.9, 0.6)

    def montre(self, t, r, c):
        return remplir(t, r, c, self.VALS[r][c])

    def construct(self):
        margo = self.margo_bas()
        titre, badge = self.entete_short("Patrimoine en danger", ceinture="verte")
        self.add(badge)
        tp = temple(1.0).move_to(P(-1.2, 1.5))
        t = self.tab()

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        self.play(Write(titre), FadeIn(tp, shift=UP * 0.2), FadeIn(t), run_time=0.6)
        self.au_mot("1 273")
        n = self.t("1 273", 44, JAUNE_TITRE).move_to(P(0.8, 1.6))
        self.play(FadeIn(n, scale=0.6), self.montre(t, 3, 2), run_time=0.4)
        self.au_mot("naturelles")
        self.play(Indicate(t.libelles[0], color=AMBRE), run_time=0.4)
        self.au_mot("en danger")
        self.play(Indicate(t.tetes[0], color=AMBRE), run_time=0.4)
        self.attendre_voix(marge=0.1)

        # ── 01 : les marges et la case commune ──
        self.dire("01-image")
        self.au_mot("Naturels : 240")
        self.play(*teinter_ligne(t, 0, VIOLET_P), self.montre(t, 0, 2), run_time=0.4)
        self.au_mot("En péril : 54")
        self.play(*teinter_colonne(t, 0, ORANGE_P), self.montre(t, 3, 0), run_time=0.4)
        self.au_mot("Et 12")
        self.play(*allumer(t, 0, 0), self.montre(t, 0, 0), run_time=0.4)
        self.insister(t.cases[0][0], 1.4)
        self.attendre_voix(marge=0.1)

        # ── 02 : la question-pause ──
        tout = Group(*[m for m in self.mobjects if m is not badge and m is not margo])
        self.play(FadeOut(tout), run_time=0.3)
        ecran = self.question_short("02-question", "02b-reponse", ["Naturel OU en péril :", "combien de biens ?"],
                                    ["294", "282", "12"], 1, ["240 + 54 − 12 = 282"], ys=(-0.12, -0.97, -1.82), y_bas=-2.58)
        self.play(FadeOut(ecran), run_time=0.3)

        # ── 03 : la question en commentaire ──
        self.dire("03-question")
        t2 = self.tab()
        self.add(titre)
        self.play(FadeIn(t2), run_time=0.3)
        self.au_mot("991")
        self.play(*teinter_ligne(t2, 1, VIOLET_P), self.montre(t2, 1, 2), run_time=0.4)
        self.au_mot("42")
        self.play(*allumer(t2, 1, 0), self.montre(t2, 1, 0), run_time=0.4)
        self.au_mot("ne sont pas en péril")
        self.play(remplir(t2, 1, 1, "?"), run_time=0.4)
        self.insister(t2.cases[1][1], 1.4)
        l = self.t("hors péril ?", 38, ORANGE_RETENUE).move_to(P(0, 1.75))
        self.play(FadeIn(l, scale=0.8), run_time=0.3)
        self.au_mot("Réponds en commentaire")
        appel = self.borne(self.t("Réponds en commentaire !", 30, VERT_OK)).move_to(P(0, 1.1))
        self.play(FadeIn(appel, scale=0.7), run_time=0.35)
        self.insister(appel, 1.1, 0.25)
        self.attendre_voix(marge=1.5)
