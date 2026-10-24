# stats_rep_circulaire_short.py
# EleveAI — Maths 1re — short jumeau de la série « Statistiques », lycée,
# épisode 08 : lire un diagramme circulaire. CEINTURE ORANGE (un cran sous la
# paysage verte). Il AMUSE : « D'où vient le courant ? »
#   · en HAUT le pylône électrique ; en BAS le camembert du coach, le secteur
#     du nucléaire allumé et son angle (241,2°) ;
#   · question-pause (67 %, 241 % ou 33 % ?) : 1 % = 3,6° ;
#   · fin : l'hydraulique mesure 50,4° → quelle part ? « Réponds en commentaire ! »
#     (réponse attendue : 50,4 ÷ 3,6 = 14 %).
# Source : bilan électrique 2024 de RTE (AFP, 20/01/2025), voir
# stats_rep_circulaire.py. Centres d'intérêt : nature-ecologie, sciences.
#
# Voix : manim/voix/1re-stats-rep-circulaire-short.json (débit −7) ; calage :
# manim/scripts/premiere/stats_rep_circulaire_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/premiere/stats_rep_circulaire_short.py StatsRepCirculaireShort -o eleveai-maths-premiere-commun-stats-rep-circulaire-short --media_dir manim/scripts/premiere/media-stats-rep-circulaire-short
# Sortie : manim/sorties/premiere-commun/maths/statistiques/08-rep-circulaire/

import importlib.util
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "stmg"))

from stats_lycee_i1_commun import *  # noqa: E402,F403

_spec = importlib.util.spec_from_file_location("premiere_stats_rep_circulaire",
                                               Path(__file__).resolve().parent / "stats_rep_circulaire.py")
_ep = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(_ep)
NOMS, PARTS, COUL, pylone, eclair = _ep.NOMS, _ep.PARTS, _ep.COUL, _ep.pylone, _ep.eclair


class StatsRepCirculaireShort(ShortI1):
    nom_voix = "1re-stats-rep-circulaire-short"
    fichier_marques = "stats_rep_circulaire_short_marques.json"

    def cam(self):
        c = Camembert(NOMS, PARTS, rayon=1.3, couleurs=COUL, titre="Électricité 2024", fs=26,
                      montrer_etiquettes=False, carte=False)
        leg = VGroup(*[VGroup(Square(0.22, fill_color=COUL[i], fill_opacity=1, stroke_color=NUIT, stroke_width=1),
                              texte(NOMS[i], 22, NUIT)).arrange(RIGHT, buff=0.1) for i in range(4)])
        leg.arrange_in_grid(rows=2, cols=2, buff=(0.3, 0.12), col_alignments="ll").next_to(c, DOWN, buff=0.25)
        c.add(leg)
        c.leg = leg
        c.carte = carte_autour(VGroup(*c.submobjects), marge=0.3)
        c.add_to_back(c.carte)
        return caser(c, -1.95, 1.95, -3.0, 0.8)

    def arc(self, c, i, txt=None):
        debut = PI / 2 - sum(PARTS[:i]) / 100 * TAU
        return arc_angle(c.centre, c._rayon() * 0.38, debut, -PARTS[i] / 100 * TAU, "#c2410c", txt, 26).set_z_index(6)

    def haut(self, mob):
        if mob.width > 2.5:
            mob.scale_to_fit_width(2.5)
        return mob.move_to(P(0.75, 1.5))

    def construct(self):
        margo = self.margo_bas()
        titre, badge = self.entete_short("D'où vient le courant ?", ceinture="orange")
        self.add(badge)
        py = pylone(1.0).move_to(P(-1.2, 1.5))
        c = self.cam()

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        self.play(Write(titre), FadeIn(py, shift=UP * 0.2), FadeIn(c.fond), FadeIn(c.leg), run_time=0.6)
        self.play(c.apparaitre(run_time=1.0))
        self.au_mot("un secteur est énorme")
        self.play(c.focus(0, 0.35), run_time=0.4)
        self.au_mot("le nucléaire")
        nuc = self.haut(self.t("le nucléaire !", 36, "#fcd34d"))
        self.play(FadeIn(nuc, scale=0.7), run_time=0.3)
        self.insister(nuc, 1.04)
        self.attendre_voix(marge=0.1)

        # ── 01 : son angle ──
        self.dire("01-image")
        self.au_mot("241,2")
        a = self.arc(c, 0, "241,2°")
        ang = self.haut(self.ligne([("angle :", WHITE), ("241,2°", AMBRE)], 34))
        self.play(FadeOut(nuc), Create(a[0]), FadeIn(a[1]), FadeIn(ang), run_time=0.6)
        self.au_mot("360 degrés")
        tout = self.haut(VGroup(self.ligne([("disque :", WHITE), ("360°", AMBRE)], 32),
                                self.ligne([("=", WHITE), ("100 %", VERT_OK)], 32)).arrange(DOWN, buff=0.1))
        self.play(FadeOut(ang), FadeIn(tout), Indicate(c.parts, color=AMBRE, scale_factor=1.05), run_time=0.8)
        self.attendre_voix(marge=0.1)

        # ── 02 : la question-pause ──
        reste = Group(*[m for m in self.mobjects if m is not badge and m is not margo])
        self.play(FadeOut(reste), run_time=0.3)
        ecran = self.question_short("02-question", "02b-reponse", ["Nucléaire : 241,2°.", "Quelle part ?"],
                                    ["67 %", "241 %", "33 %"], 0, ["241,2 ÷ 3,6 = 67 %"], ys=(-0.12, -0.97, -1.82), y_bas=-2.58)
        self.play(FadeOut(ecran), run_time=0.3)

        # ── 03 : la question en commentaire ──
        self.dire("03-question")
        c2 = self.cam()
        self.add(titre)
        self.play(FadeIn(c2), run_time=0.3)
        self.au_mot("L'hydraulique")
        self.play(c2.focus(1, 0.35), run_time=0.4)
        self.au_mot("50,4")
        a2 = self.arc(c2, 1, "50,4°")
        l1 = self.borne(self.ligne([("Hydraulique :", WHITE), ("50,4°", AMBRE)], 32)).move_to(P(0, 2.0))
        self.play(Create(a2[0]), FadeIn(a2[1]), FadeIn(l1, shift=DOWN * 0.15), run_time=0.5)
        self.au_mot("Quelle part")
        l2 = self.t("quelle part ?", 36, ORANGE_RETENUE).move_to(P(0, 1.45))
        self.play(FadeIn(l2, scale=0.8), run_time=0.4)
        self.insister(l2, 1.12)
        self.au_mot("Réponds en commentaire")
        appel = self.borne(self.t("Réponds en commentaire !", 30, VERT_OK)).move_to(P(0, 0.98))
        self.play(FadeIn(appel, scale=0.7), run_time=0.35)
        self.insister(appel, 1.1, 0.25)
        self.attendre_voix(marge=1.5)
