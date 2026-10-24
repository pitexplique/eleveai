# stats_tab_construire_short.py
# EleveAI — Maths 1re / STMG — short jumeau de la série « Statistiques », lycée,
# épisode « dresser un tableau croisé ». CEINTURE BLANCHE. Il AMUSE :
# « À l'Eurovision, faut-il chanter en anglais pour gagner ? »
#   · en HAUT la note de musique ; en BAS le tableau croisé du coach : les 8
#     vainqueurs (2017-2025) se rangent, 5 en anglais ;
#   · question-pause (3, 5 ou 13 ?) : la marge « autre langue » = 8 − 5 ;
#   · fin : « 5 sur 8, quel pourcentage ? Réponds en commentaire ! ».
# Données : vainqueurs de l'Eurovision 2017-2025 (voir stats_tab_construire.py).
# Centres d'intérêt : musique.
#
# Voix : manim/voix/lycee-stats-tab-construire-short.json (débit −7) ; calage :
# manim/scripts/stmg/stats_tab_construire_short_marques.json.
# Le short n'affiche aucune classe : rendu UNE fois, copié sous les deux noms.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/stats_tab_construire_short.py StatsTabConstruireShort -o eleveai-maths-stmg-stats-tab-dresser-short --media_dir manim/scripts/stmg/media-stats-tab-construire-short
# Sorties : manim/sorties/stmg/maths/statistiques/08-tab-dresser/eleveai-maths-stmg-stats-tab-dresser-short.mp4
#           manim/sorties/premiere-commun/maths/statistiques/06-tab-construire/eleveai-maths-premiere-commun-stats-tab-construire-short.mp4 (copie)

import importlib.util
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats_lycee_h1_commun import *  # noqa: E402,F403

_spec = importlib.util.spec_from_file_location("stmg_stats_tab_construire",
                                               Path(__file__).resolve().parent / "stats_tab_construire.py")
_ep = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(_ep)
LANGUES, FORMATS, note = _ep.LANGUES, _ep.FORMATS, _ep.note

Y_TXT = 1.55


class StatsTabConstruireShort(ShortLycee):
    nom_voix = "lycee-stats-tab-construire-short"
    fichier_marques = "stats_tab_construire_short_marques.json"

    def croise(self, lignes):
        t = Tableau(FORMATS, lignes, libelles=LANGUES, coin="", largeur_case=1.15, largeur_libelle=1.9,
                    hauteur=0.75, fs=24, titre="Eurovision 2017-2025")
        return caser(textes_devant(t), -2.0, 2.0, -2.8, 0.9)

    def construct(self):
        margo = self.margo_bas()
        titre, badge = self.entete_short("Gagner en anglais ?")
        self.add(badge)
        n = note(0.55).move_to(P(-1.6, Y_TXT))
        t = self.croise([[None] * 3 for _ in range(3)])

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        self.au_mot("l'Eurovision")
        self.play(Write(titre), FadeIn(n, shift=UP * 0.2), FadeIn(t, shift=UP * 0.2), run_time=0.6)
        self.au_mot("chanter en anglais")
        q = self.t("anglais ?", 40, ORANGE_RETENUE).move_to(P(0.5, Y_TXT))
        self.play(FadeIn(q, scale=0.6), *teinter_ligne(t, 0), run_time=0.4)
        self.attendre_voix(marge=0.1)

        # ── 01 : 8 vainqueurs, 5 en anglais ──
        self.dire("01-image")
        self.au_mot("8 vainqueurs")
        self.play(FadeOut(q), remplir(t, 2, 2, 8), *allumer(t, 2, 2), run_time=0.4)
        self.au_mot("Je range chacun")
        traits = VGroup()
        for (r, c), n_traits in (((0, 0), 5), ((1, 0), 1), ((1, 1), 2)):
            case = t.case(r, c)
            for k in range(n_traits):
                x = case.get_left()[0] + case.width * (0.18 + 0.14 * k)
                traits.add(Line(P(x, case.get_center()[1] - case.height * 0.25),
                                P(x, case.get_center()[1] + case.height * 0.25), color=NUIT,
                                stroke_width=4).set_z_index(6))
        self.play(LaggedStart(*[Create(m) for m in traits], lag_ratio=0.25), run_time=1.6)
        self.au_mot("5 en anglais")
        self.play(remplir(t, 0, 2, 5), *allumer(t, 0, 2), run_time=0.4)
        self.insister(t.cases[0][2], 1.4)
        self.attendre_voix(marge=0.1)

        # ── 02 : la question-pause ──
        tout = Group(*[m for m in self.mobjects if m is not badge and m is not margo])
        self.play(FadeOut(tout), run_time=0.3)
        ecran = self.question_short("02-question", "02b-reponse", ["Dans une autre langue ?"], ["3", "5", "13"], 0,
                                    ["8 − 5 = 3", "13 : on a additionné"])
        self.play(FadeOut(ecran), run_time=0.3)

        # ── 03 : la question en commentaire ──
        self.dire("03-question")
        t2 = self.croise([[5, 0, 5], [1, 2, 3], [6, 2, 8]])
        self.add(titre)
        self.au_mot("5 vainqueurs sur 8")
        l1 = self.ligne([("5", VERT_OK), ("sur", WHITE), ("8", JAUNE_TITRE), ("→", WHITE), ("? %", ORANGE_RETENUE)], 38)
        l1.move_to(P(0, Y_TXT + 0.25))
        self.play(FadeIn(t2), FadeIn(l1), *allumer(t2, 0, 2), run_time=0.5)
        self.au_mot("Quel pourcentage")
        self.insister(l1[4], 1.5)
        self.au_mot("Réponds en commentaire")
        appel = self.borne(self.t("Réponds en commentaire !", 30, VERT_OK)).move_to(P(0, Y_TXT - 0.35))
        self.play(FadeIn(appel, scale=0.7), run_time=0.35)
        self.insister(appel, 1.1, 0.25)
        self.attendre_voix(marge=1.5)
