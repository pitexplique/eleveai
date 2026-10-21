# stats_tableau_completer_short.py
# EleveAI — Maths CM1 / CM2 — short jumeau de la série « Statistiques »,
# épisode 02 : compléter un tableau. CEINTURE JAUNE (un cran sous la
# paysage orange : une seule soustraction, qu'on VOIT). Il AMUSE : « 50
# bouchons, la première classe en trouve 30… et la deuxième ? »
#   · en HAUT, les 50 bouchons de la plage (10 × 5) ; les 30 de la première
#     classe deviennent bleus, puis partent : il en reste 20, orange ;
#   · en BAS, EN MÊME TEMPS, la ligne du tableau du coach se remplit
#     (Total 50, Classe 1 30, Classe 2 « ? » puis 20) ;
#   · fin : 75 en tout, 48 pour la première classe, la barre « ? »,
#     « Réponds en commentaire ! ».
# ⛔ PAS D'ÉCART : un nombre n'apparaît qu'au mot où la voix le dit.
#
# Voix : manim/voix/cm-stats-tableau-completer-short.json (débit −10), WAV dans
# public/sons/cm-stats-tableau-completer-short/ ; calage mot à mot :
# manim/scripts/cm1/statscm_tableau_completer_short_marques.json.
# Le short n'affiche aucune classe : rendu UNE fois, copié sous les deux noms.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/cm1/stats_tableau_completer_short.py StatsTableauCompleterShort -o eleveai-maths-cm1-stats-tableau-completer-short --media_dir manim/scripts/cm1/media-tableau-completer-short
# Sorties : manim/sorties/cm1/maths/statistiques/02-tableau-completer/eleveai-maths-cm1-stats-tableau-completer-short.mp4
#           manim/sorties/cm2/maths/statistiques/02-tableau-completer/eleveai-maths-cm2-stats-tableau-completer-short.mp4 (copie)

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats_tableau_commun import P, BaseTableauShort, allumer, eteindre, remplir, textes_devant  # noqa: E402
from stats_tableau_completer import COLONNES, CONNU, MANQUE  # noqa: E402

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from canvas_stats import ORANGE_Q, Tableau  # noqa: E402

Y_TXT = 1.98
ROUGE_B = "#ef4444"   # un bouchon de la plage


class StatsTableauCompleterShort(BaseTableauShort):
    nom_voix = "cm-stats-tableau-completer-short"
    fichier_marques = "statscm_tableau_completer_short_marques.json"

    def legende(self, s, color=WHITE, fs=36):
        return self.borne(self.t(s, fs, color)).move_to(P(0, Y_TXT))

    def tableau(self):
        tab = Tableau(COLONNES, [[None] * 3], largeur_case=1.45, hauteur=0.8, fs=30, titre="Bouchons", centre=P(0, -1.4))
        tab.scale_to_fit_width(config.frame_width - 0.3)
        return textes_devant(tab.move_to(P(0, -1.5)))

    def bouchons(self, n=50):
        """n bouchons rouges, 10 par rangée, du haut vers le bas."""
        g = VGroup()
        for k in range(n):
            b = VGroup(Circle(radius=0.14, fill_color=ROUGE_B, fill_opacity=1, stroke_color=WHITE, stroke_width=2),
                       Circle(radius=0.07, stroke_color=WHITE, stroke_width=1.5))
            g.add(b.move_to(P(-1.62 + (k % 10) * 0.36, 1.35 - (k // 10) * 0.36)))
        return g

    def construct(self):
        self.margo_bas()
        titre = self.entete_short("La case vide", "jaune")
        tab = self.tableau()

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        self.play(Write(titre), FadeIn(tab, shift=UP * 0.2), run_time=0.5)
        self.au_mot("50 bouchons")
        bs = self.bouchons()
        cap = self.legende("50 bouchons", ROUGE_B, 42)
        self.play(LaggedStart(*[FadeIn(b, scale=0.3) for b in bs], lag_ratio=0.015), FadeIn(cap, shift=UP * 0.2),
                  remplir(tab, 0, 2, 50), *allumer(tab, 0, 2), run_time=0.9)
        self.au_mot("30.")
        cap2 = self.legende("La première : 30", CONNU, 40)
        self.play(FadeOut(cap, shift=UP * 0.2), FadeIn(cap2, shift=UP * 0.2), *eteindre(tab), run_time=0.3)
        self.play(*[b[0].animate.set_fill(CONNU) for b in bs[:30]], remplir(tab, 0, 0, 30), *allumer(tab, 0, 0),
                  run_time=0.5)
        self.au_mot("Et la deuxième")
        cap3 = self.legende("Et la deuxième ?", ORANGE_RETENUE, 42)
        self.play(FadeOut(cap2, shift=UP * 0.2), FadeIn(cap3, shift=UP * 0.2), *eteindre(tab), run_time=0.3)
        self.play(remplir(tab, 0, 1, "?"), *allumer(tab, 0, 1, anneau=ORANGE_Q),
                  *[b[0].animate.set_fill(MANQUE) for b in bs[30:]], run_time=0.4)
        self.insister(tab.texte_case(0, 1), 1.5)
        self.attendre_voix(marge=0.1)

        # ── 01 : 50 − 30 = 20, et je vérifie ──
        self.dire("01-image")
        moins = VGroup(self.t("50", 50, ROUGE_B), self.t("−", 50), self.t("30", 50, CONNU), self.t("=", 50),
                       self.t("20", 50, ORANGE_RETENUE)).arrange(RIGHT, buff=0.2)
        self.borne(moins).move_to(P(0, Y_TXT))
        self.au_mot("50 moins")
        self.play(FadeOut(cap3, shift=UP * 0.2), FadeIn(moins[:2], scale=1.3), run_time=0.3)
        self.au_mot("30, égale")
        self.play(FadeIn(moins[2:4], scale=1.3), *[b.animate.set_opacity(0.15) for b in bs[:30]], run_time=0.4)
        self.au_mot("20 !")
        self.play(FadeIn(moins[4], scale=1.6), remplir(tab, 0, 1, 20), *allumer(tab, 0, 1),
                  Indicate(VGroup(*bs[30:]), color=ORANGE_RETENUE, scale_factor=1.1), run_time=0.5)
        self.insister(moins[4], 1.4)
        self.au_mot("Je vérifie")
        plus = VGroup(self.t("30", 50, CONNU), self.t("+", 50), self.t("20", 50, ORANGE_RETENUE), self.t("=", 50),
                      self.t("50", 50, ROUGE_B)).arrange(RIGHT, buff=0.2)
        self.borne(plus).move_to(P(0, Y_TXT))
        self.play(FadeOut(moins, shift=UP * 0.2), *[b.animate.set_opacity(1) for b in bs[:30]], run_time=0.35)
        self.au_mot("30 plus")
        self.play(FadeIn(plus[:2], scale=1.3), run_time=0.3)
        self.au_mot("20, égale")
        self.play(FadeIn(plus[2:4], scale=1.3), run_time=0.3)
        self.au_mot("50.")
        coche = self.coche(VERT_OK, 0.22).next_to(tab, UP, buff=0.12).align_to(tab, RIGHT)
        self.play(FadeIn(plus[4], scale=1.6), *allumer(tab, 0, 2), run_time=0.4)
        self.au_mot("La case vide est trouvée")
        cap4 = self.legende("Case trouvée !", VERT_OK, 44)
        self.play(FadeOut(plus, shift=UP * 0.2), FadeIn(cap4, scale=0.7), Create(coche), run_time=0.4)
        self.insister(cap4, 1.12)
        self.attendre_voix(marge=0.3)

        # ── 02 : la question, 75 et 48 ──
        self.dire("02-question")
        self.au_mot("75,")
        self.play(FadeOut(VGroup(bs, coche)), FadeOut(cap4), *eteindre(tab), run_time=0.3)
        L, x0 = 3.9, -1.95
        haut = Rectangle(width=L, height=0.5, fill_color="#7f1d1d", fill_opacity=0.9, stroke_color=ROUGE_B,
                         stroke_width=3).move_to(P(x0 + L / 2, 1.2))
        t75 = self.t("75 en tout", 32).move_to(haut)
        self.play(GrowFromEdge(haut, LEFT), FadeIn(t75), remplir(tab, 0, 2, 75), remplir(tab, 0, 0, None),
                  remplir(tab, 0, 1, None), *allumer(tab, 0, 2), run_time=0.5)
        self.au_mot("48 pour")
        w48 = L * 48 / 75
        b48 = Rectangle(width=w48, height=0.5, fill_color="#1e3a8a", fill_opacity=0.9, stroke_color=CONNU,
                        stroke_width=3).move_to(P(x0 + w48 / 2, 0.5))
        t48 = self.t("48", 34).move_to(b48)
        self.play(GrowFromEdge(b48, LEFT), FadeIn(t48), remplir(tab, 0, 0, 48), run_time=0.45)
        self.au_mot("combien pour la deuxième")
        bq = Rectangle(width=L - w48, height=0.5, fill_color="#7c2d12", fill_opacity=0.9, stroke_color=MANQUE,
                       stroke_width=3).next_to(b48, RIGHT, buff=0)
        tq = self.t("?", 40).move_to(bq)
        self.play(GrowFromEdge(bq, LEFT), FadeIn(tq, scale=1.5), remplir(tab, 0, 1, "?"),
                  *allumer(tab, 0, 1, anneau=ORANGE_Q), run_time=0.45)
        self.insister(VGroup(bq, tq), 1.15)
        self.au_mot("Réponds en commentaire")
        appel = self.legende("Réponds en commentaire !", VERT_OK, 32)
        self.play(FadeIn(appel, scale=0.7), run_time=0.35)
        self.insister(appel, 1.1, 0.25)
        self.attendre_voix(marge=1.5)
