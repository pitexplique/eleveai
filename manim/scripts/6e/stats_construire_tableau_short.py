# stats_construire_tableau_short.py
# EleveAI — Maths 6e — short jumeau de la série « Statistiques », épisode 03 :
# construire un tableau d'effectifs. CEINTURE JAUNE (un cran sous la paysage
# orange). Il AMUSE : « Le papangue est rare : sur 25 oiseaux, combien ? »
#   · en HAUT, les oiseaux de la ravine se rangent en files, une file par
#     espèce, au moment où la voix les compte ; le papangue est seul dans la sienne ;
#   · en BAS, EN MÊME TEMPS, la colonne « Effectif » du tableau du coach se
#     remplit, ligne par ligne, dans le même ordre que les files ;
#   · fin : la file des oiseaux blancs contre celle des tec-tec, le bout qui
#     dépasse marqué « ? », « Réponds en commentaire ! ».
# ⛔ PAS D'ÉCART : un nombre n'apparaît qu'au mot où la voix le dit.
#
# Voix : manim/voix/6e-stats-construire-tableau-short.json (débit −10), WAV dans
# public/sons/6e-stats-construire-tableau-short/ ; calage mot à mot :
# manim/scripts/6e/stats6_construire_tableau_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/6e/stats_construire_tableau_short.py StatsConstruireTableauShort6e -o eleveai-maths-6e-stats-construire-tableau-short --media_dir manim/scripts/6e/media-stats-construire-tableau-short
# Sortie : manim/sorties/6e/maths/statistiques/03-construire-tableau/eleveai-maths-6e-stats-construire-tableau-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "cm1"))
sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats_tableau_commun import P, BaseTableauShort, allumer, eteindre, remplir, textes_devant  # noqa: E402
from stats_construire_tableau import COUL_OISEAU, ESPECES, oiseau  # noqa: E402

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from canvas_stats import AMBRE, Tableau  # noqa: E402

Y_TXT = 1.98
# l'ordre de la voix : blanc 9, tec-tec 7, merle 5, Vierge 3, papangue 1
ORDRE_S = [1, 0, 2, 4, 3]
EFF_S = [9, 7, 5, 3, 1]
Y_FILES = [1.5, 1.2, 0.9, 0.6, 0.3]
X0, DX = -1.75, 0.38


class StatsConstruireTableauShort6e(BaseTableauShort):
    nom_voix = "6e-stats-construire-tableau-short"
    fichier_marques = "stats6_construire_tableau_short_marques.json"

    def legende(self, s, color=WHITE, fs=36):
        return self.borne(self.t(s, fs, color)).move_to(P(0, Y_TXT))

    def file(self, j):
        """La file j (ordre de la voix) : EFF_S[j] oiseaux de l'espèce ORDRE_S[j]."""
        i = ORDRE_S[j]
        return VGroup(*[oiseau(COUL_OISEAU[i], 0.42).move_to(P(X0 + k * DX, Y_FILES[j])) for k in range(EFF_S[j])])

    def construct(self):
        self.margo_bas()
        titre = self.entete_short("Le papangue", "jaune")
        tab = Tableau(["Effectif"], [[None]] * 5, libelles=[ESPECES[i] for i in ORDRE_S], coin="Espèce",
                      largeur_case=1.3, largeur_libelle=2.7, hauteur=0.45, fs=24)
        tab.scale_to_fit_width(4.0)
        textes_devant(tab.move_to(P(0, -1.38)))

        # ── 00 : l'accroche, le papangue est rare ──
        self.dire("00-accroche")
        pap = oiseau(COUL_OISEAU[3], 1.6).move_to(P(0, 0.9))
        self.play(Write(titre), FadeIn(pap, shift=RIGHT * 0.5), run_time=0.6)
        self.au_mot("le rapace")
        rap = self.legende("Le rapace de La Réunion", "#fdba74", 32)
        self.play(FadeIn(rap, shift=UP * 0.2), run_time=0.35)
        self.au_mot("est rare")
        rare = self.legende("Il est rare !", ORANGE_RETENUE, 42)
        self.play(FadeOut(rap, shift=UP * 0.2), FadeIn(rare, shift=UP * 0.2), run_time=0.35)
        self.au_mot("25 oiseaux")
        sur = self.legende("Sur 25 oiseaux…", WHITE, 40)
        self.play(FadeOut(rare, shift=UP * 0.2), FadeIn(sur, shift=UP * 0.2), FadeIn(tab, shift=UP * 0.2),
                  pap.animate.scale(0.42 / 1.6).move_to(P(X0, Y_FILES[4])), run_time=0.6)
        self.au_mot("combien de papangues")
        cb = self.legende("combien de papangues ?", ORANGE_RETENUE, 36)
        self.play(FadeOut(sur, shift=UP * 0.2), FadeIn(cb, shift=UP * 0.2), Indicate(pap, scale_factor=1.6),
                  run_time=0.5)
        self.attendre_voix(marge=0.1)

        # ── 01 : le tableau le dit ──
        self.dire("01-image")
        self.au_mot("Le tableau le dit")
        dit = self.legende("Le tableau le dit :", BLEU_CALCUL, 38)
        self.play(FadeOut(cb, shift=UP * 0.2), FadeIn(dit, shift=UP * 0.2), run_time=0.35)
        files = []
        for j, extrait in enumerate(("9 oiseaux", "7 tec-tec", "5 merles", "3 oiseaux")):
            self.au_mot(extrait)
            f = self.file(j)
            self.play(LaggedStart(*[FadeIn(o, shift=RIGHT * 0.4) for o in f], lag_ratio=0.08),
                      remplir(tab, j, 0, EFF_S[j]), *allumer(tab, j, 0), run_time=0.6)
            files.append(f)
        self.au_mot("un seul papangue")
        seul = self.legende("un seul papangue !", "#fdba74", 38)
        self.play(FadeOut(dit, shift=UP * 0.2), FadeIn(seul, scale=0.7), Indicate(pap, scale_factor=1.8),
                  remplir(tab, 4, 0, 1), *allumer(tab, 4, 0), run_time=0.5)
        self.au_mot("1 sur 25")
        sur25 = self.legende("1 sur 25", "#fdba74", 50)
        self.play(FadeOut(seul, shift=UP * 0.2), FadeIn(sur25, scale=0.7), run_time=0.35)
        self.insister(sur25, 1.15)
        self.attendre_voix(marge=0.3)

        # ── 02 : la question, blancs contre tec-tec ──
        self.dire("02-question")
        self.au_mot("combien d'oiseaux blancs")
        cbien = self.legende("Combien de plus ?", ORANGE_RETENUE, 40)
        self.play(FadeOut(sur25, shift=UP * 0.2), FadeIn(cbien, shift=UP * 0.2), *eteindre(tab),
                  *[f.animate.set_opacity(0.2) for f in files[2:]], pap.animate.set_opacity(0.2), run_time=0.4)
        self.play(*allumer(tab, 0, 0), *allumer(tab, 1, 0), run_time=0.3)
        self.au_mot("que de tec-tec")
        bout = VGroup(*files[0][7:])
        cadre = SurroundingRectangle(bout, color=ORANGE_RETENUE, buff=0.05, corner_radius=0.06, stroke_width=5)
        lim = DashedLine(P(X0 + 6.5 * DX, Y_FILES[1] - 0.2), P(X0 + 6.5 * DX, Y_FILES[0] + 0.25), color=AMBRE,
                         stroke_width=4, dash_length=0.08)
        pq = self.t("?", 40, ORANGE_RETENUE).next_to(cadre, DOWN, buff=0.04)
        self.play(Create(lim), Create(cadre), FadeIn(pq, scale=1.5), run_time=0.5)
        self.insister(pq, 1.4)
        self.au_mot("Réponds en commentaire")
        appel = self.legende("Réponds en commentaire !", VERT_OK, 32)
        self.play(FadeOut(cbien, shift=UP * 0.2), FadeIn(appel, scale=0.7), run_time=0.35)
        self.insister(appel, 1.1, 0.25)
        self.attendre_voix(marge=1.5)
