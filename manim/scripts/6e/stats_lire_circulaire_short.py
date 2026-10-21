# stats_lire_circulaire_short.py
# EleveAI — Maths 6e — short jumeau de la série « Statistiques », épisode 07 :
# lire un diagramme circulaire. CEINTURE JAUNE (un cran sous la paysage verte :
# on lit une moitié et des quarts, la division reste en commentaire). Il AMUSE :
# « Ton assiette de cari : quelle part pour le riz ? »
#   · en HAUT, la vraie assiette se remplit (légumes, riz, cari de poulet) ;
#   · en BAS, EN MÊME TEMPS, le camembert du coach (manim/canvas_stats.py) :
#     chaque part pousse au moment où l'aliment arrive dans l'assiette ;
#   · fin : 800 g, la part du riz marquée « ? », « Réponds en commentaire ! ».
# ⛔ PAS D'ÉCART : un nombre n'apparaît qu'au moment où la voix le dit.
#
# Voix : manim/voix/6e-stats-lire-circulaire-short.json (débit −10), WAV dans
# public/sons/6e-stats-lire-circulaire-short/ ; calage mot à mot :
# manim/scripts/6e/stats_lire_circulaire_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/6e/stats_lire_circulaire_short.py StatsLireCirculaireShort6e -o eleveai-maths-6e-stats-lire-circulaire-short --media_dir manim/scripts/6e/media-lire-circulaire-short
# Sortie : manim/sorties/6e/maths/statistiques/07-lire-circulaire/eleveai-maths-6e-stats-lire-circulaire-short.mp4

import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parent))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "cm1"))

from stats_graphique_completer import MotsCalesDossier, P  # noqa: E402
from stats_lire_circulaire import COUL, assiette, devant  # noqa: E402

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from canvas_stats import AMBRE, Camembert  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

C_ASS = P(-1.35, 1.6)   # l'assiette, en haut à gauche
X_TXT = -0.5            # le bord gauche des phrases, à droite de l'assiette
C_DISQUE = P(0, -1.25)  # le camembert, en bas


def nourriture(centre, r, debut, angle, sorte):
    """Une part d'aliment dans l'assiette : un secteur coloré et sa texture."""
    fond = {"legumes": "#16a34a", "riz": "#f8fafc", "cari": "#c2410c"}[sorte]
    s = Sector(radius=r, start_angle=debut, angle=angle, fill_color=fond, fill_opacity=1, stroke_color=WHITE,
               stroke_width=2).move_arc_center_to(centre)
    rng = np.random.default_rng({"legumes": 1, "riz": 2, "cari": 3}[sorte])
    bouts = VGroup()
    for _ in range(14 if sorte == "riz" else 8):
        a = debut + angle * rng.uniform(0.12, 0.88)
        d = r * rng.uniform(0.25, 0.85)
        p = centre + d * np.array([np.cos(a), np.sin(a), 0])
        if sorte == "riz":
            bouts.add(Ellipse(width=0.07, height=0.035, fill_color="#cbd5e1", fill_opacity=1, stroke_width=0)
                      .rotate(rng.uniform(0, PI)).move_to(p))
        elif sorte == "legumes":
            bouts.add(Circle(radius=0.045, fill_color="#86efac", fill_opacity=1, stroke_width=0).move_to(p))
        else:
            bouts.add(RoundedRectangle(width=0.1, height=0.08, corner_radius=0.03, fill_color="#fdba74",
                                       fill_opacity=1, stroke_width=0).move_to(p))
    return VGroup(s, bouts)


class StatsLireCirculaireShort6e(MotsCalesDossier, Short6e):
    nom_voix = "6e-stats-lire-circulaire-short"
    fichier_marques = "stats_lire_circulaire_short_marques.json"
    dossier_marques = Path(__file__).resolve().parent

    def t(self, s, fs=34, color=WHITE):
        return Text(s, font_size=fs, color=color)

    def borne(self, mob, marge=0.4):
        if mob.width > config.frame_width - marge:
            mob.scale_to_fit_width(config.frame_width - marge)
        return mob

    def insister(self, mob, k=1.3, run_time=0.2):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def phrase(self, lignes, y):
        """Un petit bloc de 1 ou 2 lignes, à droite de l'assiette, sans déborder."""
        g = VGroup(*[self.t(s, fs, c) for s, fs, c in lignes]).arrange(DOWN, aligned_edge=LEFT, buff=0.1)
        larg = config.frame_width / 2 - 0.15 - X_TXT
        if g.width > larg:
            g.scale_to_fit_width(larg)
        return g.move_to(P(0, y)).align_to(P(X_TXT, 0), LEFT)

    def construct(self):
        self.margo_bas()
        titre = self.borne(self.t("Mon assiette de cari", 40, JAUNE_TITRE), 0.5).move_to(P(0, 3.45))
        badge = echelle_ceintures("jaune").scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.62))
        self.add(badge, titre)
        ass = assiette(0.66).move_to(C_ASS)
        d = devant(Camembert(["Légumes", "Riz", "Cari"], [2, 1, 1], rayon=1.35, couleurs=COUL, fs=26,
                             centre=C_DISQUE))
        r_food = 0.66 * 0.7
        aliments = [nourriture(C_ASS, r_food, PI / 2, -PI, "legumes"),
                    nourriture(C_ASS, r_food, -PI / 2, -PI / 2, "riz"),
                    nourriture(C_ASS, r_food, PI, -PI / 2, "cari")]

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        self.play(FadeIn(ass, scale=0.8), run_time=0.4)
        self.au_mot("quelle part pour le riz")
        q = self.phrase([("Quelle part", 34, WHITE), ("pour le riz ?", 36, ORANGE_RETENUE)], C_ASS[1])
        self.play(FadeIn(q, shift=LEFT * 0.2), run_time=0.4)
        self.insister(q[1], 1.15)
        self.attendre_voix(marge=0.1)

        # ── 01 : l'assiette se remplit, le camembert pousse ──
        self.dire("01-image")
        self.au_mot("Le diététicien")
        dieto = self.phrase([("Le diététicien", 34, BLEU_CALCUL), ("dessine", 34, WHITE), ("l'assiette", 34, WHITE)],
                            C_ASS[1])
        self.play(FadeOut(q), FadeIn(dieto, shift=LEFT * 0.2), FadeIn(d.fond), run_time=0.4)
        phrases = []
        for i, (mot, a, b) in enumerate([("la moitié en légumes", "La moitié :", "légumes"),
                                         ("un quart en riz", "Un quart :", "riz"),
                                         ("un quart en cari", "Un quart :", "cari de poulet")]):
            self.au_mot(mot)
            ph = self.phrase([(a, 36, COUL[i]), (b, 34, WHITE)], C_ASS[1])
            self.play(FadeIn(aliments[i], scale=0.7), GrowFromPoint(d.parts[i], d.centre), FadeIn(d.textes[i]),
                      FadeOut(phrases[-1] if phrases else dieto), FadeIn(ph, shift=LEFT * 0.2), run_time=0.6)
            phrases.append(ph)
        self.au_mot("Le riz, c'est seulement un quart")
        seul = self.phrase([("Le riz :", 36, COUL[1]), ("seulement", 34, VERT_OK), ("un quart !", 36, VERT_OK)],
                           C_ASS[1])
        r = d._rayon()
        quarts = VGroup(d.moitie(), DashedLine(d.centre, d.centre + LEFT * (r + 0.15), color="#0f172a",
                                               stroke_width=5, dash_length=0.14).set_z_index(2))
        self.play(FadeOut(phrases[-1]), FadeIn(seul, shift=LEFT * 0.2), d.focus(1, 0.35), Create(quarts),
                  Indicate(aliments[1], color=WHITE, scale_factor=1.1), run_time=0.6)
        self.play(d.sortir(1, 0.25), run_time=0.35)
        self.insister(seul[1:], 1.1)
        self.attendre_voix(marge=0.3)

        # ── 02 : la question ──
        self.dire("02-question")
        self.au_mot("800 grammes")
        p800 = self.phrase([("Ton assiette :", 34, WHITE), ("800 g", 44, JAUNE_TITRE)], C_ASS[1])
        self.play(FadeOut(seul), FadeIn(p800, shift=LEFT * 0.2), Indicate(ass, color=JAUNE_TITRE), run_time=0.5)
        self.au_mot("combien de grammes de riz")
        point_q = Text("? g", font_size=44, color=ORANGE_RETENUE, weight=BOLD).set_stroke(WHITE, 5, background=True)
        point_q.move_to(d.textes[1]).set_z_index(4)
        q2 = self.phrase([("Combien de", 34, WHITE), ("grammes", 34, WHITE), ("de riz ?", 36, ORANGE_RETENUE)],
                         C_ASS[1])
        self.play(FadeOut(p800), FadeIn(q2, shift=LEFT * 0.2), FadeOut(d.textes[1]), FadeIn(point_q, scale=1.6),
                  run_time=0.5)
        self.insister(point_q, 1.3)
        self.au_mot("Réponds en commentaire")
        appel = self.phrase([("Réponds en", 36, VERT_OK), ("commentaire !", 36, VERT_OK)], C_ASS[1])
        self.play(FadeOut(q2), FadeIn(appel, scale=0.7), run_time=0.4)
        self.insister(appel, 1.1, 0.25)
        self.attendre_voix(marge=1.5)
