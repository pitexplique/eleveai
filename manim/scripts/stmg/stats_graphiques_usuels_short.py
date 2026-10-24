# stats_graphiques_usuels_short.py
# EleveAI — Maths 1re / STMG — short jumeau de la série « Statistiques », lycée,
# épisode 02 : les diagrammes usuels. CEINTURE BLANCHE. Il AMUSE :
# « Films français contre films américains : qui gagne au cinéma ? »
#   · en HAUT, le duel (clap, « Français » contre « Américains ») ;
#   · en BAS, le camembert du coach : 2023 (41,2 % contre 40,1 %, les Américains
#     gagnent de justesse) ; question-pause « et en 2024 ? » ; puis le camembert
#     se transforme en celui de 2024 (44,4 % contre 36,7 %).
#   · fin : 18,9 % de 181,3 millions, « Réponds en commentaire ! ».
# Source : CNC, bilan 2024 (lu le 24/10/2026). Centres d'intérêt : cinema-series.
#
# Voix : manim/voix/lycee-stats-graphiques-usuels-short.json (débit −7) ; calage :
# manim/scripts/stmg/stats_graphiques_usuels_short_marques.json.
# Le short n'affiche aucune classe : rendu UNE fois, copié sous les deux noms.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/stats_graphiques_usuels_short.py StatsGraphiquesUsuelsShort -o eleveai-maths-stmg-stats-diagrammes-usuels-short --media_dir manim/scripts/stmg/media-stats-graphiques-usuels-short
# Sorties : manim/sorties/stmg/maths/statistiques/02-diagrammes-usuels/eleveai-maths-stmg-stats-diagrammes-usuels-short.mp4
#           manim/sorties/premiere-commun/maths/statistiques/02-graphiques-usuels/eleveai-maths-premiere-commun-stats-graphiques-usuels-short.mp4 (copie)

import importlib.util
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats_lycee_h1_commun import *  # noqa: E402,F403

_spec = importlib.util.spec_from_file_location("stmg_stats_graphiques_usuels",
                                               Path(__file__).resolve().parent / "stats_graphiques_usuels.py")
_ep = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(_ep)
NOMS, P23, P24, COUL = _ep.NOMS, _ep.P23, _ep.P24, _ep.COUL

Y_TXT = 1.5
C_CAM = P(0, -0.85)


def clap(s=0.5):
    """Un clap de cinéma : la planche, le bras rayé."""
    planche = Rectangle(width=2 * s, height=1.3 * s, fill_color="#111827", fill_opacity=1, stroke_color=WHITE,
                        stroke_width=3)
    bras = Rectangle(width=2 * s, height=0.32 * s, fill_color=WHITE, fill_opacity=1, stroke_width=0)
    bras.next_to(planche, UP, buff=0.04).rotate(0.25, about_point=planche.get_corner(UL) + UP * 0.04)
    raies = VGroup(*[Line(UP * 0.15 * s, DOWN * 0.15 * s, color="#111827", stroke_width=6).rotate(-0.6)
                     .move_to(bras.get_center() + (k - 1.5) * 0.45 * s * RIGHT) for k in range(4)])
    raies.rotate(0.25, about_point=bras.get_center())
    return VGroup(planche, bras, raies)


class StatsGraphiquesUsuelsShort(ShortLycee):
    nom_voix = "lycee-stats-graphiques-usuels-short"
    fichier_marques = "stats_graphiques_usuels_short_marques.json"

    def cam(self, valeurs, annee):
        c = Camembert(NOMS, valeurs, rayon=1.15, couleurs=COUL, titre=f"Entrées {annee} (en %)", fs=24)
        for t in c.textes:
            t.set_z_index(5)
        return caser(c, -2.0, 2.0, -2.8, 0.95)

    def pct(self, c, i, v):
        t = texte(f"{fr(v)} %", 24, NUIT).set_stroke(WHITE, width=5, background=True)
        return t.next_to(c.textes[i], UP if i == 2 else DOWN, buff=0.05).set_z_index(5)

    def construct(self):
        margo = self.margo_bas()
        titre, badge = self.entete_short("Qui gagne au ciné ?")
        self.add(badge)
        c23 = self.cam(P23, 2023)
        duel = VGroup(self.t("Français", 32, COUL[0]), clap(0.32), self.t("Américains", 32, COUL[1]))
        duel.arrange(RIGHT, buff=0.25).move_to(P(0, Y_TXT + 0.4))
        self.borne(duel)

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        self.au_mot("Films français")
        self.play(Write(titre), FadeIn(duel[0], shift=RIGHT * 0.3), FadeIn(duel[1], scale=0.5), run_time=0.5)
        self.au_mot("films américains")
        self.play(FadeIn(duel[2], shift=LEFT * 0.3), run_time=0.4)
        self.au_mot("qui gagne")
        self.play(FadeIn(c23.fond), c23.apparaitre(run_time=1.0))
        self.attendre_voix(marge=0.1)

        # ── 01 : 2023 ──
        self.dire("01-image")
        self.au_mot("41,2 %")
        p1 = self.pct(c23, 1, P23[1])
        self.play(c23.focus(1, 0.4), FadeIn(p1, scale=1.6), run_time=0.4)
        self.au_mot("40,1 %")
        p0 = self.pct(c23, 0, P23[0])
        self.play(c23.allumer(0), FadeIn(p0, scale=1.6), run_time=0.4)
        self.au_mot("Les Américains gagnent")
        win = self.t("de justesse !", 30, ORANGE_RETENUE).next_to(duel, DOWN, buff=0.12)
        self.play(c23.focus(1, 0.4), Indicate(duel[2], color=WHITE, scale_factor=1.3), FadeIn(win), run_time=0.5)
        self.attendre_voix(marge=0.1)

        # ── 02 : la question-pause ──
        tout = Group(*[m for m in self.mobjects if m is not badge and m is not margo])
        self.play(FadeOut(tout), run_time=0.3)
        ecran = self.question_short("02-question", "02b-reponse", ["Et en 2024, qui gagne ?"],
                                    ["les films français", "les films américains", "les autres films"], 0,
                                    ["44,4 % contre 36,7 %", "autres films : 18,9 %"])
        self.play(FadeOut(ecran), run_time=0.3)

        # ── 03 : 2024, la question en commentaire ──
        self.dire("03-question")
        c24 = self.cam(P24, 2024)
        self.add(titre)
        self.play(FadeIn(c23.fond), FadeIn(c23.parts), FadeIn(c23.textes), run_time=0.2)
        self.au_mot("En 2024")
        self.play(Transform(c23.parts, c24.parts), Transform(c23.textes, c24.textes),
                  Transform(c23.titre, c24.titre), run_time=1.0)
        self.remove(c23.parts, c23.textes, c23.fond)
        self.add(c24)
        self.au_mot("181,3 millions")
        l1 = self.ligne([("181,3", JAUNE_TITRE), ("millions d'entrées", WHITE)], 32).move_to(P(0, Y_TXT + 0.35))
        self.play(FadeIn(l1, scale=0.7), run_time=0.4)
        self.au_mot("18,9 %")
        p2 = self.pct(c24, 2, P24[2])
        l2 = self.ligne([("18,9 %", COUL[2]), ("de", WHITE), ("181,3 M", JAUNE_TITRE), ("= ?", ORANGE_RETENUE)], 34)
        l2.move_to(P(0, Y_TXT - 0.3))
        self.play(c24.focus(2, 0.4), FadeIn(p2, scale=1.6), FadeIn(l2), run_time=0.4)
        self.insister(l2[3], 1.5)
        self.au_mot("Réponds en commentaire")
        appel = self.borne(self.t("Réponds en commentaire !", 30, VERT_OK)).move_to(l1)
        self.play(FadeOut(l1), FadeIn(appel, scale=0.7), run_time=0.35)
        self.insister(appel, 1.1, 0.25)
        self.attendre_voix(marge=1.5)
