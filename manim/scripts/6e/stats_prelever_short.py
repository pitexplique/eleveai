# stats_prelever_short.py
# EleveAI — Maths 6e — short jumeau de la série « Statistiques », épisode 02 :
# prélever une information. CEINTURE BLANCHE. Il AMUSE : « 4 euros la tomate ?
# Ou 4 euros le kilo ? »
#   · en HAUT le marché : UNE tomate et UN sac de 1 kg, chacun avec son
#     étiquette « 4 € » ; lequel dit vrai ?
#   · en BAS, EN MÊME TEMPS, le tableau du coach (`tableau_donnees`) : son
#     titre « Prix d'un kilogramme » s'allume, la case des tomates se remplit
#     (4) au mot, et une flèche monte de la case jusqu'au sac (le bon) ;
#   · fin : deux sacs de 1 kg, « 2 kg = ? € », « Réponds en commentaire ! ».
# ⛔ PAS D'ÉCART : un nombre n'apparaît qu'au moment où la voix le dit.
# Ti-Margo en bas (margo_bas).
#
# Voix : manim/voix/6e-stats-prelever-short.json (débit −10), WAV dans
# public/sons/6e-stats-prelever-short/ ; calage mot à mot :
# manim/scripts/6e/stats_prelever_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/6e/stats_prelever_short.py StatsPreleverShort6e -o eleveai-maths-6e-stats-prelever-short --media_dir manim/scripts/6e/media-prelever-short
# Sortie : manim/sorties/6e/maths/statistiques/02-prelever/eleveai-maths-6e-stats-prelever-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats6_lotc_commun import *  # noqa: E402,F403
from stats_prelever import etiquette_prix, sac, tomate  # noqa: E402
from canvas_stats import AMBRE, Tableau  # noqa: E402

Y_IMG, Y_LAB = 0.95, 0.22  # la ligne des dessins, la ligne de leurs légendes
XG, XD = -1.1, 1.1     # la tomate à gauche, le sac à droite


class StatsPreleverShort6e(MotsCales6, OutilsShort, Short6e):
    nom_voix = "6e-stats-prelever-short"
    fichier_marques = "stats_prelever_short_marques.json"

    def construct(self):
        self.margo_bas()
        titre, badge = self.entete_short("Au marché")
        self.add(badge)
        tab = Tableau(["en euros"], [[None]], libelles=["Tomates"], coin="Produit", largeur_case=1.55,
                      largeur_libelle=1.95, hauteur=0.66, fs=25, titre="Prix d'un kilogramme")
        ic = tomate(0.16).move_to(tab.libelles[0][0].get_left() + RIGHT * 0.3)
        tab.libelles[0][1].next_to(ic, RIGHT, buff=0.12)
        tab.add(ic)
        self.borne(tab, 0.3).move_to(P(0, -1.78))

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        self.au_mot("4 euros la tomate")
        une = tomate(0.42).move_to(P(XG, Y_IMG))
        e1 = etiquette_prix("4 €").scale(0.95).next_to(une, UP, buff=0.18)
        l1 = self.t("la tomate ?", 26).move_to(P(XG, Y_LAB - 0.15))
        self.play(FadeIn(titre), FadeIn(une, scale=0.5), FadeIn(e1, shift=DOWN * 0.2), FadeIn(l1), run_time=0.4)
        self.au_mot("Ou 4 euros le kilo")
        s = sac("1 kg", tomate, 0.95).move_to(P(XD, Y_IMG - 0.05))
        e2 = etiquette_prix("4 €").scale(0.95).next_to(s, UP, buff=0.12)
        l2 = self.t("le kilo ?", 26).move_to(P(XD, Y_LAB - 0.15))
        self.play(FadeIn(s, shift=UP * 0.2), FadeIn(e2, shift=DOWN * 0.2), FadeIn(l2), run_time=0.4)
        self.insister(VGroup(e1, e2), 1.15)
        self.attendre_voix(marge=0.1)

        # ── 01 : le titre du tableau le dit ──
        self.dire("01-image")
        self.au_mot("Le titre du tableau")
        self.play(FadeIn(tab, shift=UP * 0.3), run_time=0.5)
        self.au_mot("prix d'un kilogramme")
        cadre = SurroundingRectangle(tab.titre, color=AMBRE, buff=0.08, corner_radius=0.06, stroke_width=5)
        self.play(Create(cadre), run_time=0.3)
        self.insister(VGroup(tab.titre, cadre), 1.2)
        self.au_mot("4 euros, c'est pour un kilo")
        self.play(tab.remplir(0, 0, 4), run_time=0.35)
        self.play(*tab.allumer_case(0, 0), run_time=0.3)
        fl = Arrow(tab.case(0, 0).get_top() + UP * 0.05, P(tab.case(0, 0).get_center()[0], Y_LAB - 0.45), buff=0.05, color=AMBRE,
                   stroke_width=7, max_tip_length_to_length_ratio=0.15)
        ok = self.coche(VERT_OK, 0.22).next_to(l2, RIGHT, buff=0.1)
        self.play(GrowArrow(fl), FadeOut(l2), run_time=0.4)
        l2b = self.t("1 kg", 28, VERT_OK).move_to(P(XD, Y_LAB - 0.15))
        ok.next_to(l2b, RIGHT, buff=0.12)
        self.play(FadeIn(l2b, scale=1.4), Create(ok), run_time=0.3)
        self.insister(VGroup(s, e2), 1.15)
        self.au_mot("pas pour une seule")
        x = croix(VGroup(une, e1).copy().scale(1.05), sw=7)
        self.play(Create(x), l1.animate.set_color(ROUGE_ERREUR), run_time=0.4)
        self.attendre_voix(marge=0.3)

        # ── 02 : la question ──
        self.dire("02-question")
        self.au_mot("À 4 euros le kilogramme")
        self.play(FadeOut(VGroup(une, e1, x, l1, fl, l2b, ok, tab, cadre), shift=UP * 0.2),
                  VGroup(s, e2).animate.move_to(P(-1.05, Y_IMG + 0.05)), run_time=0.45)
        self.au_mot("2 kilogrammes")
        s2 = VGroup(s.copy(), e2.copy()).move_to(P(1.05, Y_IMG + 0.05))
        self.play(FadeIn(s2, shift=LEFT * 0.4), run_time=0.4)
        q = self.ligne([("2 kg", AMBRE), ("=", WHITE), ("?", ORANGE_RETENUE), ("€", WHITE)], 40)
        q.move_to(P(0, -0.55))
        self.play(FadeIn(q, scale=0.7), run_time=0.35)
        self.insister(q[2], 1.5)
        self.au_mot("Réponds en commentaire")
        appel = self.borne(self.t("Réponds en commentaire !", 32, VERT_OK)).move_to(P(0, -2.55))
        appel.move_to(P(0, -1.6))
        self.play(FadeIn(appel, scale=0.7), run_time=0.35)
        self.insister(appel, 1.1, 0.25)
        self.attendre_voix(marge=1.5)
