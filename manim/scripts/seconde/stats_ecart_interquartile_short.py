# stats_ecart_interquartile_short.py
# EleveAI — Maths 2de — short jumeau de l'épisode 06 « L'écart interquartile »
# (micro stat_ecart_interquartile). CEINTURE ORANGE (un cran sous la paysage
# verte : on VOIT la boîte, une seule soustraction). Il AMUSE : la pluie de
# Saint-Denis, mois par mois, dans 12 tubes.
#   · en HAUT, 12 pluviomètres (un par mois) qui se remplissent, puis se rangent ;
#   · en BAS, EN MÊME TEMPS, la droite graduée et la boîte : le 3e tube et le
#     9e tube descendent, en pointillé, sur Q1 et Q3 ;
#   · une question-pause (3 s) : la largeur de la boîte (pièges : l'étendue 236,
#     la somme 211) ;
#   · fin : « à Paris, Q1 = 45 et Q3 = 58 : l'écart interquartile ? » en
#     commentaire (13).
# Données réelles (voir stats_ecart_interquartile.py) : normales Météo-France
# 1991-2020, Saint-Denis Gillot-aéroport, arrondies au millimètre.
# ⛔ PAS D'ÉCART : un nombre n'apparaît qu'au moment où la voix le dit.
# Voix : manim/voix/2de-stats-ecart-interquartile-short.json (débit −10) ;
# calage : manim/scripts/seconde/stats_ecart_interquartile_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/seconde/stats_ecart_interquartile_short.py StatsEcartInterquartileShort -o eleveai-maths-seconde-stats-ecart-interquartile-short --media_dir manim/scripts/seconde/media-stats-ecart-interquartile-short
# Sortie : manim/sorties/seconde/maths/statistiques/06-ecart-interquartile/eleveai-maths-seconde-stats-ecart-interquartile-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats2de_g2_commun import *  # noqa: E402,F401,F403

MOIS = [270, 279, 265, 133, 96, 67, 51, 55, 49, 43, 63, 160]      # janvier → décembre
INITIALES = "JFMAMJJASOND"
ORDRE = sorted(range(12), key=lambda i: (MOIS[i], i))
VERT_R = "#34d399"
H_TUBE = 1.9
Y_TUBE = 0.75     # le centre des tubes


class StatsEcartInterquartileShort(Short2de):
    nom_voix = "2de-stats-ecart-interquartile-short"
    fichier_marques = "stats_ecart_interquartile_short_marques.json"

    def x_rang(self, k):
        return -1.82 + k * 0.33

    def construct(self):
        self.margo_bas()
        titre, badge = self.entete_short("Pluie à La Réunion", "orange")
        tubes = VGroup(*[tube(H_TUBE, 0.24).move_to(P(self.x_rang(i), Y_TUBE)) for i in range(12)])
        eaux = VGroup(*[eau(tubes[i], MOIS[i] / 300, BLEU_CALCUL) for i in range(12)])
        lettres = VGroup(*[Text(INITIALES[i], font_size=15, color=GRIS).next_to(tubes[i], DOWN, buff=0.08)
                           for i in range(12)])
        ax = AxePoints([], 0, 300, 50, sous_pas=10, longueur=8.0, couleur=VERT_R, fs=34, centre=ORIGIN)
        ax.scale_to_fit_width(4.0).move_to(P(0, -2.05))

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        self.play(Write(titre), FadeIn(badge), run_time=0.7)
        self.au_mot("12 mois")
        self.play(LaggedStart(*[Create(t) for t in tubes], lag_ratio=0.05), FadeIn(lettres), run_time=0.8)
        self.au_mot("Les mois du milieu")
        q = self.ligne([("Les mois du milieu :", WHITE), ("réguliers ?", ORANGE_RETENUE)], 26).move_to(P(0, -0.85))
        self.play(FadeIn(q, shift=UP * 0.2), run_time=0.4)
        self.au_mot("Regarde")
        self.insister(q[1], 1.3)
        self.attendre_voix(marge=0.1)

        # ── 01 : remplir, ranger, la boîte ──
        self.dire("01-image")
        self.au_mot("Chaque tube")
        self.play(FadeOut(q), LaggedStart(*[GrowFromEdge(e, DOWN) for e in eaux], lag_ratio=0.08), run_time=1.4)
        self.au_mot("Je les range")
        cible = {i: k for k, i in enumerate(ORDRE)}
        self.play(*[VGroup(tubes[i], eaux[i], lettres[i]).animate.set_x(self.x_rang(cible[i])) for i in range(12)],
                  run_time=1.2)
        self.play(FadeIn(ax), run_time=0.4)
        bx = Boite(ax, 43, 51, 81.5, 160, 279, y=-1.45, h=0.45, couleur="#059669", fond="#a7f3d0")
        gestes = []
        for k, v, ext in [(2, 51, "du 3e tube"), (8, 160, "au 9e tube")]:
            i = ORDRE[k]
            self.au_mot(ext)
            haut = eaux[i].get_top()
            pt = DashedLine(haut, P(ax.x(v)[0], ax.x(v)[1] + 0.05), color=AMBRE, stroke_width=4, dash_length=0.08)
            val = Text(str(v), font_size=26, color=AMBRE, weight=BOLD).move_to(P(ax.x(v)[0] + (0.25 if v > 100 else -0.25), -0.95))
            self.play(eaux[i].animate.set_fill(AMBRE), Create(pt), run_time=0.6)
            self.au_mot(f"{v} millimètres")
            self.play(FadeIn(val, scale=1.5), run_time=0.35)
            gestes.append(VGroup(pt, val))
        self.play(GrowFromCenter(bx.boite), FadeIn(bx.moust_g), FadeIn(bx.moust_d), FadeIn(bx.bouts),
                  FadeIn(bx.med), run_time=0.7)
        self.insister(bx.boite, 1.12)
        self.attendre_voix(marge=0.2)

        # ── 02 : la question-pause ──
        haut_img = VGroup(tubes, eaux, lettres, gestes[0][0], gestes[1][0])

        def geste():
            return [Indicate(bx.boite, color=VERT_OK, scale_factor=1.1)]

        self.play(FadeOut(haut_img), run_time=0.35)
        t0 = self.question_short("02-question", "02b-reponse", ["Quelle est la largeur", "de la boîte ?"],
                                 ["236", "109", "211"], 1,
                                 [("160 − 51 = 109", VERT_OK, "160 moins 51"),
                                  ("236 : l'étendue", ROUGE_CLAIR, "236, c'est")],
                                 geste=geste, efface=())
        print(f"QUESTION SHORT t = {mmss(t0)}", flush=True)

        # ── 03 : la question en commentaire ──
        self.dire("03-commentaire")
        self.au_mot("à Paris")
        p = self.t("À Paris :", 34, "#60a5fa").move_to(P(0, 1.85))
        self.play(FadeIn(p, shift=DOWN * 0.2), run_time=0.35)
        self.au_mot("Q1 égale 45")
        l1 = self.ligne([("Q1 = 45", AMBRE), ("et", WHITE), ("Q3 = 58", AMBRE)], 32).move_to(P(0, 1.2))
        self.play(FadeIn(l1[0], shift=UP * 0.15), run_time=0.35)
        self.au_mot("Q3 égale 58")
        self.play(FadeIn(l1[1:], shift=UP * 0.15), run_time=0.35)
        self.au_mot("Quel est")
        l2 = self.ligne([("Écart interquartile :", WHITE), ("?", ORANGE_RETENUE)], 30).move_to(P(0, 0.5))
        self.play(FadeIn(l2, shift=UP * 0.15), run_time=0.4)
        self.insister(l2[1], 1.6)
        self.au_mot("Réponds en commentaire")
        appel = self.borne(self.t("Réponds en commentaire !", 30, VERT_OK), 0.9).move_to(P(0, -0.3))
        self.play(FadeIn(appel, scale=0.7), run_time=0.35)
        self.insister(appel, 1.1, 0.25)
        self.attendre_voix(marge=1.5)
