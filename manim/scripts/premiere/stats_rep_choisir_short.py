# stats_rep_choisir_short.py
# EleveAI — Maths 1re — short jumeau de la série « Statistiques », lycée,
# épisode 09 : choisir la représentation. CEINTURE ORANGE (un cran sous la
# paysage verte). Il AMUSE : « Camembert ou barres ? »
#   · en HAUT la manette et « plusieurs réponses ! » ; en BAS les barres du
#     coach qui poussent (smartphone 56 %, console de salon 45 %, ordinateur 38 %) ;
#   · question-pause (oui / non, plus de 100 % / oui en arrondissant) ;
#   · fin : + console portable 23 % + tablette 22 % → quel total ? « Réponds en
#     commentaire ! » (réponse attendue : 184 %).
# Source : SELL, « L'essentiel du jeu vidéo », mars 2025, p. 56 (voir
# stats_rep_choisir.py). Centres d'intérêt : jeux-video.
#
# Voix : manim/voix/1re-stats-rep-choisir-short.json (débit −7) ; calage :
# manim/scripts/premiere/stats_rep_choisir_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/premiere/stats_rep_choisir_short.py StatsRepChoisirShort -o eleveai-maths-premiere-commun-stats-rep-choisir-short --media_dir manim/scripts/premiere/media-stats-rep-choisir-short
# Sortie : manim/sorties/premiere-commun/maths/statistiques/09-rep-choisir/

import importlib.util
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "stmg"))

from stats_lycee_i1_commun import *  # noqa: E402,F403

_spec = importlib.util.spec_from_file_location("premiere_stats_rep_choisir",
                                               Path(__file__).resolve().parent / "stats_rep_choisir.py")
_ep = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(_ep)
manette, icone, BLEU_B = _ep.manette, _ep.icone, _ep.BLEU_B


class StatsRepChoisirShort(ShortI1):
    nom_voix = "1re-stats-rep-choisir-short"
    fichier_marques = "stats_rep_choisir_short_marques.json"

    def graphe(self, n=3):
        noms = [x.replace("|", "\n") for x in ["Smart-|phone", "Console|salon", "Ordi-|nateur", "Console|port.",
                                                "Tablette"]][:n]
        g = Barres(noms, [56, 45, 38, 23, 22][:n], pas=10, maxi=60, couleurs=[BLEU_B] * n, nom_axe="%",
                   titre="Sur quel support ?", largeur=2.8 if n == 3 else 3.4, hauteur=2.1, fs=24)
        return caser(g, -1.95, 1.95, -3.0, 0.75)

    def valeur(self, g, k, v):
        return texte(f"{v} %" if g.n == 3 else f"{v}", 22, NUIT).next_to(g.barres[k], UP, buff=0.05)

    def haut(self, mob):
        if mob.width > 2.5:
            mob.scale_to_fit_width(2.5)
        return mob.move_to(P(0.62, 1.5))

    def construct(self):
        margo = self.margo_bas()
        titre, badge = self.entete_short("Camembert ou barres ?", ceinture="orange")
        self.add(badge)
        m = manette(0.75).move_to(P(-1.35, 1.5))
        g = self.graphe()

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        self.play(Write(titre), FadeIn(m, shift=UP * 0.2), FadeIn(g.fond), run_time=0.6)
        self.au_mot("plusieurs réponses")
        pl = self.haut(VGroup(self.t("plusieurs", 34, AMBRE), self.t("réponses !", 34, AMBRE)).arrange(DOWN, buff=0.08))
        self.play(FadeIn(pl, scale=0.7), run_time=0.3)
        self.insister(pl, 1.06)
        self.attendre_voix(marge=0.1)

        # ── 01 : trois barres ──
        self.dire("01-image")
        for k, (mot, v) in enumerate([("Smartphone : 56", 56), ("salon : 45", 45), ("Ordinateur : 38", 38)]):
            self.au_mot(mot)
            self.play(g.pousser(indices=[k], run_time=0.45), run_time=0.45)
            self.add(g.barres[k])
            self.play(FadeIn(self.valeur(g, k, v), scale=1.3), run_time=0.2)
        self.attendre_voix(marge=0.1)

        # ── 02 : la question-pause ──
        tout = Group(*[x for x in self.mobjects if x is not badge and x is not margo])
        self.play(FadeOut(tout), run_time=0.3)
        ecran = self.question_short("02-question", "02b-reponse", ["Peut-on en faire", "un camembert ?"],
                                    ["oui", "non : plus de 100 %", "oui, en arrondissant"], 1,
                                    ["56 + 45 + 38 = 139 %"], ys=(-0.12, -0.97, -1.82), y_bas=-2.58)
        self.play(FadeOut(ecran), run_time=0.3)

        # ── 03 : la question en commentaire ──
        self.dire("03-question")
        g2 = self.graphe(5)
        self.add(titre)
        self.play(FadeIn(g2.fond), g2.pousser(indices=[0, 1, 2], run_time=0.5), run_time=0.5)
        self.add(*[g2.barres[k] for k in range(3)], *[self.valeur(g2, k, v) for k, v in enumerate([56, 45, 38])])
        for k, (mot, v) in enumerate([("23 %", 23), ("22 %", 22)], start=3):
            self.au_mot(mot)
            self.play(g2.pousser(indices=[k], run_time=0.45), run_time=0.45)
            self.add(g2.barres[k])
            self.play(FadeIn(self.valeur(g2, k, v), scale=1.3), run_time=0.2)
        self.au_mot("Quel total")
        l2 = self.borne(self.t("Total des 5 ?", 38, ORANGE_RETENUE)).move_to(P(0, 1.85))
        self.play(FadeIn(l2, scale=0.8), run_time=0.4)
        self.insister(l2, 1.12)
        self.au_mot("Réponds en commentaire")
        appel = self.borne(self.t("Réponds en commentaire !", 30, VERT_OK)).move_to(P(0, 1.2))
        self.play(FadeIn(appel, scale=0.7), run_time=0.35)
        self.insister(appel, 1.1, 0.25)
        self.attendre_voix(marge=1.5)
