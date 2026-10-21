# stats_tableau_lire_short.py
# EleveAI — Maths CM1 / CM2 — short jumeau de la série « Statistiques »,
# épisode 01 : lire un tableau. CEINTURE BLANCHE. Il AMUSE : « Sur quelle
# plage les tortues aiment-elles le plus nager ? »
#   · en HAUT, au-dessus de chaque colonne, les tortues de la plage arrivent
#     (12, 7, 4) ;
#   · en BAS, EN MÊME TEMPS, la colonne du tableau du coach (canvas_stats.Tableau)
#     se remplit : la case s'allume quand ses tortues tombent juste au-dessus ;
#   · fin : 4 tortues de Saint-Leu « font la paire » avec l'Étang-Salé, les
#     autres sont marquées « ? », « Réponds en commentaire ! ».
# ⛔ PAS D'ÉCART : un nombre n'apparaît qu'au mot où la voix le dit (les
# noms des plages sont des étiquettes). Ti-Margo en bas (margo_bas).
#
# Voix : manim/voix/cm-stats-tableau-lire-short.json (débit −10), WAV dans
# public/sons/cm-stats-tableau-lire-short/ ; calage mot à mot :
# manim/scripts/cm1/statscm_tableau_lire_short_marques.json.
# Le short n'affiche aucune classe : rendu UNE fois, copié sous les deux noms.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/cm1/stats_tableau_lire_short.py StatsTableauLireShort -o eleveai-maths-cm1-stats-tableau-lire-short --media_dir manim/scripts/cm1/media-tableau-lire-short
# Sorties : manim/sorties/cm1/maths/statistiques/01-tableau-lire/eleveai-maths-cm1-stats-tableau-lire-short.mp4
#           manim/sorties/cm2/maths/statistiques/01-tableau-lire/eleveai-maths-cm2-stats-tableau-lire-short.mp4 (copie)

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats_tableau_commun import P, BaseTableauShort, allumer, eteindre, remplir, textes_devant  # noqa: E402
from stats_tableau_lire import PLAGES, SABLE, tortue  # noqa: E402

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from canvas_stats import AMBRE as AMBRE_Q, BORD_TABLEAU, Tableau  # noqa: E402

FEVRIER = [12, 7, 4]
Y_TXT = 1.98      # la ligne de texte, sous l'échelle des ceintures
BASE_PILE = -0.15  # le bas des piles de tortues


class StatsTableauLireShort(BaseTableauShort):
    nom_voix = "cm-stats-tableau-lire-short"
    fichier_marques = "statscm_tableau_lire_short_marques.json"

    def tableau(self):
        tab = Tableau(PLAGES, [[None] * 3], largeur_case=1.45, hauteur=0.8, fs=30, centre=P(0, -1.4))
        tab.scale_to_fit_width(config.frame_width - 0.25)
        return textes_devant(tab.move_to(P(0, -1.45)))

    def pile(self, n, x):
        """n tortues, rangées par 4 de bas en haut, centrées sur la colonne x :
        les 4 de l'Étang-Salé sont à la hauteur de la 1re rangée de Saint-Leu."""
        g = VGroup()
        for k in range(n):
            g.add(tortue(0.2).move_to(P(x + (k % 4 - 1.5) * 0.27, BASE_PILE + 0.2 + (k // 4) * 0.34)))
        return g

    def legende(self, s, color=WHITE, fs=34):
        return self.borne(self.t(s, fs, color)).move_to(P(0, Y_TXT))

    def construct(self):
        self.margo_bas()
        titre = self.entete_short("Tortues vertes", "blanche")
        tab = self.tableau()
        xs = [tab.case(0, c).get_center()[0] for c in range(3)]
        sable = Line(P(-2.1, BASE_PILE - 0.02), P(2.1, BASE_PILE - 0.02), color=SABLE, stroke_width=6)

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        self.play(Write(titre), FadeIn(tab, shift=UP * 0.2), Create(sable), run_time=0.6)
        self.au_mot("quelle plage")
        q = self.legende("Quelle plage ?", ORANGE_RETENUE, 40)
        marques = VGroup(*[self.t("?", 60, ORANGE_RETENUE).move_to(P(x, 0.75)) for x in xs])
        self.play(FadeIn(q, shift=UP * 0.2), LaggedStart(*[FadeIn(m, scale=0.4) for m in marques], lag_ratio=0.25),
                  run_time=0.7)
        self.au_mot("le plus nager")
        self.play(LaggedStart(*[Indicate(tab.tetes[c][1], color=ORANGE_RETENUE, scale_factor=1.15) for c in range(3)],
                              lag_ratio=0.2), run_time=0.8)
        self.attendre_voix(marge=0.1)

        # ── 01 : les tortues arrivent, la colonne se remplit ──
        self.dire("01-image")
        self.au_mot("La biologiste")
        bio = self.legende("La biologiste a compté", BLEU_CALCUL, 32)
        self.play(FadeOut(q, shift=UP * 0.2), FadeIn(bio, shift=UP * 0.2), FadeOut(marques), run_time=0.35)
        self.au_mot("En février")
        fev = self.legende("En février", BLEU_CALCUL, 42)
        self.play(FadeOut(bio, shift=UP * 0.2), FadeIn(fev, shift=UP * 0.2), run_time=0.35)
        piles = []
        for c, mot in enumerate(["12 tortues", "7 à", "4 à"]):
            self.au_mot(mot)
            p = self.pile(FEVRIER[c], xs[c])
            anims = [LaggedStart(*[FadeIn(t, shift=DOWN * 0.6) for t in p], lag_ratio=0.08), remplir(tab, 0, c, FEVRIER[c])]
            anims += allumer(tab, 0, c)
            if c > 0:
                anims += [tab.case(0, c - 1).animate.set_fill(WHITE).set_stroke(BORD_TABLEAU, width=2.5)]
            self.play(*anims, run_time=0.75)
            piles.append(p)
        self.au_mot("Saint-Leu gagne")
        gagne = self.legende("Saint-Leu gagne !", VERT_OK, 40)
        self.play(FadeOut(fev, shift=UP * 0.2), FadeIn(gagne, scale=0.7),
                  tab.case(0, 2).animate.set_fill(WHITE).set_stroke(BORD_TABLEAU, width=2.5), *allumer(tab, 0, 0),
                  run_time=0.4)
        self.insister(VGroup(piles[0], tab.cases[0][0]), 1.12)
        self.attendre_voix(marge=0.3)

        # ── 02 : la question ──
        self.dire("02-question")
        self.au_mot("combien de tortues de plus")
        cbien = self.legende("Combien de plus ?", ORANGE_RETENUE, 38)
        self.play(FadeOut(gagne, shift=UP * 0.2), FadeIn(cbien, shift=UP * 0.2), piles[1].animate.set_opacity(0.25),
                  *eteindre(tab), run_time=0.4)
        self.au_mot("qu'à l'Étang-Salé")
        paires = VGroup(*piles[0][:4])
        self.play(paires.animate.set_opacity(0.3), Indicate(piles[2], color=WHITE), *allumer(tab, 0, 2), run_time=0.6)
        niveau = DashedLine(P(xs[2] + 0.6, BASE_PILE + 0.37), P(xs[0] - 0.6, BASE_PILE + 0.37), color=AMBRE_Q,
                            stroke_width=4, dash_length=0.1)
        self.play(Create(niveau), run_time=0.4)
        reste = VGroup(*piles[0][4:])
        cadre = SurroundingRectangle(reste, color=ORANGE_RETENUE, buff=0.06, corner_radius=0.08, stroke_width=4)
        pq = self.t("?", 56, ORANGE_RETENUE).set_stroke(BLACK, 4, background=True).move_to(cadre.get_center())
        self.play(Create(cadre), FadeIn(pq, scale=1.6), *allumer(tab, 0, 0), run_time=0.4)
        self.insister(pq, 1.4)
        self.au_mot("Réponds en commentaire")
        appel = self.legende("Réponds en commentaire !", VERT_OK, 32)
        self.play(FadeOut(cbien, shift=UP * 0.2), FadeIn(appel, scale=0.7), run_time=0.35)
        self.insister(appel, 1.1, 0.25)
        self.attendre_voix(marge=1.5)
