# stats_ecart_type_short.py
# EleveAI — Maths 2de — short jumeau de l'épisode 08 « L'écart type » (micro
# stat_ecart_type). CEINTURE ORANGE (un cran sous la paysage verte : on VOIT
# la dispersion, sans calcul). Il AMUSE : deux thermomètres, mois après mois.
#   · en HAUT, le thermomètre de Brest et celui de Strasbourg montent et
#     descendent au fil des 12 mois ;
#   · en BAS, EN MÊME TEMPS, les deux courbes du coach (canvas_stats.Courbe)
#     se tracent point par point : celle de Brest reste serrée, celle de
#     Strasbourg fait le grand écart ;
#   · une question-pause (3 s) : quelle ville a le plus grand écart type ?
#   · fin : « à Brest, moyenne 11,7 et écart type 3,7 : la moyenne moins l'écart type ? » en commentaire (8).
# Données réelles (voir stats_ecart_type.py) : normales Météo-France 1991-2020.
# ⛔ PAS D'ÉCART : un nombre n'apparaît qu'au moment où la voix le dit.
# Voix : manim/voix/2de-stats-ecart-type-short.json (débit −10) ;
# calage : manim/scripts/seconde/stats_ecart_type_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/seconde/stats_ecart_type_short.py StatsEcartTypeShort -o eleveai-maths-seconde-stats-ecart-type-short --media_dir manim/scripts/seconde/media-stats-ecart-type-short
# Sortie : manim/sorties/seconde/maths/statistiques/08-ecart-type/eleveai-maths-seconde-stats-ecart-type-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats2de_g2_commun import *  # noqa: E402,F401,F403

BREST = [7.1, 7.1, 8.6, 10.1, 12.8, 15.3, 17, 17.1, 15.4, 12.8, 9.8, 7.7]
STRAS = [2.5, 3.6, 7.4, 11.3, 15.5, 18.9, 20.6, 20.3, 16.1, 11.5, 6.3, 3.3]
MOIS = list("JFMAMJJASOND")
BLEU_B = "#3b82f6"
ORANGE_S = "#f97316"
H = 1.9          # la hauteur de la tige = 25 °C
Y0 = 0.1         # le bas de la tige


class StatsEcartTypeShort(Short2deG2):
    nom_voix = "2de-stats-ecart-type-short"
    fichier_marques = "stats_ecart_type_short_marques.json"

    def courbes(self):
        kw = dict(pas=5, maxi=25, largeur=4.0, hauteur=1.8, fs=22)
        b = Courbe(MOIS, BREST, couleur=BLEU_B, **kw)
        s = Courbe(MOIS, STRAS, couleur=ORANGE_S, carte=False, **kw)
        s.shift(b.ref_x.get_start() - s.ref_x.get_start())
        grp = VGroup(b, s)
        grp.scale(3.95 / b.width)
        grp.shift(P(0, -1.8) - b.get_center())
        return b, s

    def thermo(self, x, couleur):
        t = thermometre(H, couleur)
        t.shift(P(x, Y0 + H / 2) - t[0].get_center())
        return t

    def liquide(self, t, v, couleur):
        h = max(0.05, H * v / 25)
        return Rectangle(width=0.12, height=h, fill_color=couleur, fill_opacity=1, stroke_width=0).move_to(
            P(t[0].get_x(), Y0 + h / 2))

    def balayer(self, t, liq, serie, couleur, courbe, pt_lu=None):
        """Mois après mois : le liquide prend la valeur du mois, le point de la
        courbe apparaît EN MÊME TEMPS (un curseur relie les deux)."""
        for i, v in enumerate(serie):
            neuf = self.liquide(t, v, couleur)
            an = [Transform(liq, neuf), FadeIn(courbe.ronds[i], scale=0.4)]
            if i > 0:
                seg = Line(courbe.ronds[i - 1].get_center(), courbe.ronds[i].get_center(), color=couleur, stroke_width=5)
                an.append(Create(seg))
                self.segments.add(seg)
            self.play(*an, run_time=0.15)

    def construct(self):
        self.margo_bas()
        titre, badge = self.entete_short("Même climat ?", "orange")
        tb = self.thermo(-1.55, BLEU_B)
        ts = self.thermo(0.55, ORANGE_S)
        nb = Text("Brest", font_size=26, color=BLEU_B).next_to(tb, DOWN, buff=0.1)
        ns = Text("Strasbourg", font_size=26, color=ORANGE_S).next_to(ts, DOWN, buff=0.1)
        b, s = self.courbes()
        self.segments = VGroup()

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        self.play(Write(titre), FadeIn(badge), run_time=0.7)
        self.play(FadeIn(tb, shift=UP * 0.2), FadeIn(ts, shift=UP * 0.2), FadeIn(nb), FadeIn(ns), run_time=0.5)
        self.au_mot("11,7")
        lb = self.liquide(tb, 11.7, BLEU_B)
        vb = Text("11,7 °C", font_size=24, color=WHITE).next_to(tb[0], RIGHT, buff=0.1)
        self.play(GrowFromEdge(lb, DOWN), FadeIn(vb), run_time=0.5)
        self.au_mot("11,4 degrés")
        ls = self.liquide(ts, 11.4, ORANGE_S)
        vs = Text("11,4 °C", font_size=24, color=WHITE).next_to(ts[0], RIGHT, buff=0.1)
        self.play(GrowFromEdge(ls, DOWN), FadeIn(vs), run_time=0.5)
        self.au_mot("Même climat")
        q = Text("moyennes de l'année", font_size=24, color=GRIS).move_to(P(0, -0.95))
        self.play(FadeIn(q), Indicate(titre, color=ORANGE_RETENUE), run_time=0.5)
        self.attendre_voix(marge=0.1)

        # ── 01 : mois après mois ──
        self.dire("01-image")
        self.au_mot("Deux thermomètres")
        self.play(FadeOut(vb), FadeOut(vs), FadeOut(q), FadeIn(b.fond), run_time=0.5)
        self.au_mot("À Brest")
        self.balayer(tb, lb, BREST, BLEU_B, b)
        self.au_mot("de 7,1")
        e1 = VGroup(Text("7,1 →", font_size=24, color=BLEU_B), Text("17,1 °C", font_size=24, color=BLEU_B))
        e1.arrange(DOWN, aligned_edge=LEFT, buff=0.06).next_to(tb[0], RIGHT, buff=0.12)
        e1a, e1b = e1
        self.play(FadeIn(e1a), Indicate(b.ronds[0], color=BLEU_B, scale_factor=1.8), run_time=0.4)
        self.au_mot("à 17,1")
        self.play(FadeIn(e1b), Indicate(b.ronds[7], color=BLEU_B, scale_factor=1.8), run_time=0.4)
        self.au_mot("À Strasbourg")
        self.balayer(ts, ls, STRAS, ORANGE_S, s)
        self.au_mot("de 2,5")
        e2 = VGroup(Text("2,5 →", font_size=24, color=ORANGE_S), Text("20,6 °C", font_size=24, color=ORANGE_S))
        e2.arrange(DOWN, aligned_edge=LEFT, buff=0.06).next_to(ts[0], RIGHT, buff=0.12)
        self.play(FadeIn(e2[0]), Indicate(s.ronds[0], color=ORANGE_S, scale_factor=1.8), run_time=0.4)
        self.au_mot("à 20,6")
        self.play(FadeIn(e2[1]), Indicate(s.ronds[6], color=ORANGE_S, scale_factor=1.8), run_time=0.4)
        self.attendre_voix(marge=0.2)

        # ── 02 : la question-pause ──
        haut = VGroup(tb, ts, lb, ls, nb, ns, e1, e2)

        def geste():
            return [Indicate(s.ronds, color=VERT_OK, scale_factor=1.3)]

        self.play(FadeOut(haut), run_time=0.35)
        t0 = self.question_short("02-question", "02b-reponse", ["Quelle ville a le plus", "grand écart type ?"],
                                 ["Brest", "Strasbourg", "Pareil"], 1,
                                 [("Strasbourg : ses températures", VERT_OK, "Strasbourg ;"),
                                  ("s'éloignent bien plus", VERT_OK, "s'éloignent")],
                                 efface=[VGroup(b.fond, b.ronds, s.ronds, self.segments)], colonne=True)
        print(f"QUESTION SHORT t = {mmss(t0)}", flush=True)

        # ── 03 : la question en commentaire ──
        self.dire("03-commentaire")
        self.au_mot("à Brest")
        l0 = Text("À Brest :", font_size=34, color=BLEU_B).move_to(P(0, 1.95))
        self.play(FadeIn(l0, shift=DOWN * 0.2), run_time=0.35)
        self.au_mot("11,7 et")
        l1 = VGroup(self.t("moyenne = 11,7", 32), self.t("écart type = 3,7", 32)).arrange(DOWN, buff=0.15)
        l1.move_to(P(0, 1.15))
        self.play(FadeIn(l1[0], shift=UP * 0.15), run_time=0.35)
        self.au_mot("3,7")
        self.play(FadeIn(l1[1], shift=UP * 0.15), run_time=0.35)
        self.au_mot("Que vaut")
        l2 = self.ligne([("moyenne − écart type =", AMBRE), ("?", ORANGE_RETENUE)], 30).move_to(P(0, 0.3))
        self.play(FadeIn(l2, shift=UP * 0.15), run_time=0.4)
        self.insister(l2[1], 1.6)
        self.au_mot("Réponds en commentaire")
        appel = self.borne(self.t("Réponds en commentaire !", 30, VERT_OK), 0.9).move_to(P(0, -0.4))
        self.play(FadeIn(appel, scale=0.7), run_time=0.35)
        self.insister(appel, 1.1, 0.25)
        self.attendre_voix(marge=1.5)
