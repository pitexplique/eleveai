# stats_boite_short.py
# EleveAI — Maths STMG — short jumeau de la série « Statistiques », lycée,
# épisode 03 : lire un diagramme en boîte. CEINTURE BLANCHE. Il AMUSE :
# « Le salaire minimum en Europe : où est la France ? »
#   · en HAUT le billet et les deux extrêmes (551 €, 2 638 €) ; en BAS la boîte
#     du coach, qui se dessine ; la médiane (1 007,5) puis Q3 (1 802 = la France) ;
#   · question-pause (un quart / la moitié / trois quarts) ;
#   · fin : Q1 = 826 → l'écart interquartile ? « Réponds en commentaire ! »
#     (réponse attendue : 1 802 − 826 = 976 €).
# Source : Eurostat, salaires minimums au 1er janvier 2025 (voir stats_boite.py).
# Centres d'intérêt : argent-budget, histoire-geographie.
#
# Voix : manim/voix/stmg-stats-boite-short.json (débit −7) ; calage :
# manim/scripts/stmg/stats_boite_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/stats_boite_short.py StatsBoiteShort -o eleveai-maths-stmg-stats-boite-short --media_dir manim/scripts/stmg/media-stats-boite-short
# Sortie : manim/sorties/stmg/maths/statistiques/03-boite/

import importlib.util
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats_lycee_i1_commun import *  # noqa: E402,F403

_spec = importlib.util.spec_from_file_location("stmg_stats_boite", Path(__file__).resolve().parent / "stats_boite.py")
_ep = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(_ep)
CINQ, billet = _ep.CINQ, _ep.billet


class StatsBoiteShort(ShortI1):
    nom_voix = "stmg-stats-boite-short"
    fichier_marques = "stats_boite_short_marques.json"

    def figure(self):
        ax = AxeBoite(500, 2750, 1000, L=3.6, fs=24)
        b = Boite(ax, **CINQ, dy=1.05, h=0.6, fs=24)
        g, carte, t = carte_boite(ax, [b], "Salaire minimum (€)", fs=26)
        g.ax, g.b = ax, b
        return caser(g, -1.95, 1.95, -2.9, 0.6)

    def construct(self):
        margo = self.margo_bas()
        titre, badge = self.entete_short("SMIC en Europe", ceinture="blanche")
        self.add(badge)
        bi = billet(0.55).move_to(P(0, 1.85))
        g = self.figure()
        b = g.b

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        self.play(Write(titre), FadeIn(bi, scale=0.6), FadeIn(g[0]), FadeIn(g.ax), FadeIn(g[1][-1]), run_time=0.6)
        self.au_mot("551")
        n1 = b.nombre("mini")
        self.play(Create(VGroup(b.bout_g, b.moust_g)), FadeIn(n1, scale=1.4), run_time=0.5)
        self.au_mot("2 638")
        n2 = b.nombre("maxi")
        self.play(Create(VGroup(b.bout_d, b.moust_d)), FadeIn(n2, scale=1.4), run_time=0.5)
        self.au_mot("Et la France")
        fr_ = self.t("Et la France ?", 34, BLEU_CALCUL).move_to(P(0, 1.1))
        self.play(FadeIn(fr_, scale=0.8), run_time=0.4)
        self.attendre_voix(marge=0.1)

        # ── 01 : la boîte, la médiane, Q3 ──
        self.dire("01-image")
        self.au_mot("la boîte")
        self.play(FadeOut(fr_), Create(b.corps), run_time=0.6)
        self.au_mot("La médiane")
        self.play(Create(b.med), run_time=0.3)
        self.au_mot("1 007,5")
        self.play(FadeIn(b.nombre("me", etage=1), scale=1.4), run_time=0.3)
        self.au_mot("1 802")
        n3 = b.nombre("q3")
        self.play(FadeIn(n3, scale=1.4), Indicate(b.corps, color=AMBRE, scale_factor=1.04), run_time=0.4)
        self.au_mot("pile le salaire minimum français")
        x = g.ax.x(1802)[0]
        fr2 = Text("France", font_size=26, color=BLEU_CALCUL, weight=BOLD).move_to(P(x, b.y - b.h / 2 - 0.25))
        self.play(FadeIn(fr2, shift=UP * 0.1), run_time=0.4)
        self.attendre_voix(marge=0.1)

        # ── 02 : la question-pause ──
        tout = Group(*[m for m in self.mobjects if m is not badge and m is not margo])
        self.play(FadeOut(tout), run_time=0.3)
        ecran = self.question_short("02-question", "02b-reponse", ["Part des pays qui paient", "au moins autant ?"],
                                    ["≈ un quart", "≈ la moitié", "≈ trois quarts"], 0, ["1 802 = Q3 : ≈ 1/4 au-dessus"],
                                    ys=(-0.12, -0.97, -1.82), y_bas=-2.58)
        self.play(FadeOut(ecran), run_time=0.3)

        # ── 03 : la question en commentaire ──
        self.dire("03-question")
        g2 = self.figure()
        self.add(titre)
        self.play(FadeIn(g2), FadeIn(g2.b.nombre("q3")), run_time=0.4)
        self.au_mot("826")
        self.play(FadeIn(g2.b.nombre("q1"), scale=1.4), run_time=0.4)
        self.au_mot("Quel est l'écart")
        a = g2.b.accolade("q1", "q3", "Q3 − Q1 = ?", couleur=ORANGE_RETENUE)
        l = self.t("l'écart interquartile ?", 32, ORANGE_RETENUE).move_to(P(0, 1.7))
        self.borne(l)
        self.play(FadeIn(a), FadeIn(l, scale=0.8), run_time=0.5)
        self.insister(l, 1.1)
        self.au_mot("Réponds en commentaire")
        appel = self.borne(self.t("Réponds en commentaire !", 30, VERT_OK)).move_to(P(0, 1.05))
        self.play(FadeIn(appel, scale=0.7), run_time=0.35)
        self.insister(appel, 1.1, 0.25)
        self.attendre_voix(marge=1.5)
