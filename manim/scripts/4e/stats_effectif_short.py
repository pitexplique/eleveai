# stats_effectif_short.py
# EleveAI — Maths 4e — short jumeau de la série « Statistiques », épisode 03 :
# déterminer un effectif. CEINTURE JAUNE (un cran sous la paysage orange). Il
# AMUSE : un quiz, « combien de portées ont 7 chiots ? »
#   · en HAUT, la portée de v chiots (v têtes de chiot) apparaît au moment où
#   · en BAS, EN MÊME TEMPS, le bâton de la valeur v pousse dans le diagramme du
#     coach (`stat_graph` bâtons, manim/canvas_stats.py) et son effectif s'écrit
#     au-dessus au mot où la voix le dit ;
#   · 2 + 3 + 4 + 2 + 1 = 12 : le compte est bon ; fin : « au moins 7 chiots ? »
#     (réponse 4 + 2 + 1 = 7), « Réponds en commentaire ! ».
# ⛔ PAS D'ÉCART : un nombre n'apparaît qu'au mot où la voix le dit (les nombres
# des axes sont des étiquettes). Ti-Margo en bas (margo_bas).
#
# Voix : manim/voix/4e-stats-effectif-short.json (débit −10), WAV dans
# public/sons/4e-stats-effectif-short/ ; marques : stats_effectif_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/4e/stats_effectif_short.py StatsEffectifShort4e -o eleveai-maths-4e-stats-effectif-short --media_dir manim/scripts/4e/media-effectif-short
# Sortie : manim/sorties/4e/maths/statistiques/03-effectif/eleveai-maths-4e-stats-effectif-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats4e_lote_commun import *  # noqa: E402,F403
from stats_effectif import DOR, EFF, VALEURS, chiot  # noqa: E402

Y_IMG, Y_TXT = 1.7, 1.0
HAUT_CARTE = 0.55


class StatsEffectifShort4e(Short4e):
    nom_voix = "4e-stats-effectif-short"
    fichier_marques = "stats_effectif_short_marques.json"

    def graphe(self):
        g = Barres([str(v) for v in VALEURS], EFF, pas=1, maxi=5, batons=True, nom_axe="Portées", largeur=3.4,
                   hauteur=2.0, fs=24, couleurs=[DOR] * 5)
        if g.height > 3.3:
            g.scale_to_fit_height(3.3)
        return g.move_to(P(0, HAUT_CARTE - g.height / 2))

    def portee(self, v):
        """v têtes de chiot côte à côte (une portée)."""
        g = VGroup(*[chiot(0.2) for _ in range(v)]).arrange(RIGHT, buff=0.06)
        return self.borne(g, 0.3).move_to(P(0, Y_IMG))

    def construct(self):
        self.margo_bas()
        titre, badge = self.entete_short("Quiz des chiots", "jaune")
        self.add(badge)
        g = self.graphe()

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        self.au_mot("Quiz")
        self.play(Write(titre), FadeIn(g.fond), run_time=0.5)
        self.au_mot("12 portées")
        douze = VGroup(*[chiot(0.17) for _ in range(12)]).arrange_in_grid(rows=2, cols=6, buff=(0.12, 0.08))
        douze.move_to(P(0, Y_IMG))
        nb = self.ligne([("12", AMBRE), ("portées", WHITE)], 34).move_to(P(0, Y_TXT))
        self.play(LaggedStart(*[FadeIn(c, scale=0.5) for c in douze], lag_ratio=0.05), FadeIn(nb), run_time=0.8)
        self.au_mot("Combien de portées ont 7")
        q = self.ligne([("7 chiots :", WHITE), ("?", ORANGE_RETENUE), ("portées", WHITE)], 34).move_to(P(0, Y_TXT))
        self.play(FadeOut(nb, shift=UP * 0.2), FadeIn(q, shift=UP * 0.2), Indicate(g.etiquettes[2], color=AMBRE),
                  run_time=0.4)
        self.insister(q[1], 1.5)
        self.attendre_voix(marge=0.1)

        # ── 01 : les bâtons poussent ──
        self.dire("01-image")
        self.au_mot("On fait pousser")
        self.play(FadeOut(douze), FadeOut(q), run_time=0.3)
        img, txt = None, None
        mots = [("5 chiots", "2 portées", 1), ("6 chiots", "3. 7", 1), ("7 chiots", "4, le", 1),
                ("8 chiots", "2. 9", 1), ("9 chiots", "1. Et", 1)]
        vals = VGroup()
        for i, (m_val, m_eff, n) in enumerate(mots):
            self.au_mot(m_val)
            neuf = self.portee(VALEURS[i])
            t = self.ligne([(f"{VALEURS[i]} chiots", AMBRE)], 34).move_to(P(0, Y_TXT))
            anims = [FadeIn(neuf, shift=DOWN * 0.2), FadeIn(t), Indicate(g.etiquettes[i], color=AMBRE)]
            if img is not None:
                anims += [FadeOut(img), FadeOut(txt)]
            self.play(*anims, run_time=0.3)
            img, txt = neuf, t
            self.au_mot(m_eff, n)
            v = g.valeur(i, fs=28)
            vals.add(v)
            self.play(g.pousser(i, run_time=0.3), FadeIn(v, scale=1.8, run_time=0.3), run_time=0.3)
            if i == 2:
                self.au_mot("le plus haut")
                self.insister(VGroup(g.barres[2], v), 1.15)
        somme = self.ligne([("2", WHITE), ("+", WHITE), ("3", WHITE), ("+", WHITE), ("4", WHITE), ("+", WHITE),
                            ("2", WHITE), ("+", WHITE), ("1", WHITE)], 40, 0.1).move_to(P(0, Y_IMG))
        for k, mot in enumerate(["2 plus 3", "3 plus 4", "4 plus 2", "2 plus 1", "1, égale"]):
            self.au_mot(mot)
            morceaux = [somme[2 * k]] + ([somme[2 * k - 1]] if k else [])
            extra = [FadeOut(img), FadeOut(txt)] if k == 0 else []
            self.play(*[FadeIn(m, scale=1.4) for m in morceaux], Indicate(vals[k], color=AMBRE), *extra, run_time=0.22)
        self.au_mot("12 : le compte")
        tot = self.ligne([("=", WHITE), ("12", VERT_OK), ("portées", WHITE)], 40).move_to(P(0, Y_TXT))
        self.play(FadeIn(tot, scale=0.7), run_time=0.3)
        ok = self.coche(VERT_OK, 0.24).next_to(tot, RIGHT, buff=0.15)
        self.au_mot("le compte est bon")
        self.play(Create(ok), run_time=0.3)
        self.insister(tot[1], 1.3)
        self.attendre_voix(marge=0.3)

        # ── 02 : la question ──
        self.dire("02-question")
        self.au_mot("combien de portées")
        self.play(FadeOut(VGroup(somme, tot, ok), shift=UP * 0.2), run_time=0.3)
        q1 = self.ligne([("au moins", WHITE), ("7", AMBRE), ("chiots", WHITE), ("?", ORANGE_RETENUE)], 38)
        q1.move_to(P(0, Y_IMG))
        pq = q1[3]
        q1[3].set_opacity(0)
        self.play(FadeIn(q1, shift=DOWN * 0.2), run_time=0.35)
        self.au_mot("au moins 7")
        self.play(g.estomper([2, 3, 4], 0.25), vals[0].animate.set_opacity(0.25), vals[1].animate.set_opacity(0.25),
                  run_time=0.4)
        self.play(pq.animate.set_opacity(1).scale(1.3), run_time=0.3)
        self.insister(pq, 1.4)
        self.au_mot("Réponds en commentaire")
        appel = self.borne(self.t("Réponds en commentaire !", 34, VERT_OK)).move_to(P(0, Y_TXT))
        self.play(FadeIn(appel, scale=0.7), run_time=0.35)
        self.insister(appel, 1.1, 0.25)
        self.attendre_voix(marge=1.5)
