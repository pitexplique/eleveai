# stats_choisir_representation_short.py
# EleveAI — Maths 5e — short jumeau de la série « Statistiques » (cycle 4),
# épisode 06 : choisir une représentation. CEINTURE JAUNE (un cran sous la
# paysage verte). Il AMUSE : « Des ventes mois par mois… en camembert ?! Raté ! »
#   · en HAUT, le camembert raté des ventes de janvier à juin ;
#   · en BAS, EN MÊME TEMPS, la courbe du coach : chaque point apparaît au mot
#     (20, 25, 35, 30, 45, 60) pendant que la part du même mois s'allume en haut ;
#   · fin : la baisse d'avril marquée « ? » (réponse : 35 − 30 = 5 robes).
# ⛔ PAS D'ÉCART : un nombre n'apparaît qu'au moment où la voix le dit.
# Voix : manim/voix/5e-stats-choisir-representation-short.json ; calage :
# manim/scripts/5e/stats5_choisir_representation_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/5e/stats_choisir_representation_short.py StatsChoisirRepresentationShort5e -o eleveai-maths-5e-stats-choisir-representation-short --media_dir manim/scripts/5e/media-choisir-representation-short
# Sortie : manim/sorties/5e/maths/statistiques/06-choisir-representation/eleveai-maths-5e-stats-choisir-representation-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats5_lotd_commun import *  # noqa: E402,F403
from stats_choisir_representation import MOIS, VENTES  # noqa: E402

Y_TXT = 0.0


class StatsChoisirRepresentationShort5e(Short5):
    nom_voix = "5e-stats-choisir-representation-short"
    fichier_marques = "stats5_choisir_representation_short_marques.json"

    def construct(self):
        self.margo_bas()
        titre, badge = self.entete_short("Graphique raté ?", "jaune")
        self.add(badge)
        cam = Camembert(MOIS, VENTES, rayon=0.72, fs=20, carte=False, centre=P(0, 1.1))
        cb = Courbe(MOIS, VENTES, pas=10, maxi=60, nom_axe="Robes", largeur=3.0, hauteur=1.7, fs=20)
        cb.scale_to_fit_height(2.05).move_to(P(0, -1.88))

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        self.play(FadeIn(titre), run_time=0.3)
        self.au_mot("de janvier à juin")
        self.play(cam.apparaitre(run_time=1.0))
        self.au_mot("en camembert")
        self.play(Wiggle(cam), run_time=0.6)
        self.au_mot("bien choisi")
        q = self.t("Bien choisi ?", 40, ORANGE_RETENUE).move_to(P(0, Y_TXT))
        self.play(FadeIn(q, scale=0.6), run_time=0.35)
        self.insister(q, 1.15)
        self.attendre_voix(marge=0.1)

        # ── 01 : raté ! la courbe ──
        self.dire("01-image")
        self.au_mot("Raté")
        x = croix(cam.parts, sw=7)
        rate = self.t("Raté !", 50, ROUGE_ERREUR).move_to(P(0, Y_TXT))
        self.play(FadeOut(q), FadeIn(rate, scale=1.6), Create(x), run_time=0.4)
        self.au_mot("les parts d'un tout")
        pt = self.t("parts d'un tout ?", 36, ORANGE_RETENUE).move_to(P(0, Y_TXT))
        self.play(FadeOut(rate), FadeIn(pt), run_time=0.3)
        self.au_mot("il faut une courbe")
        ev = self.ligne([("une évolution :", WHITE), ("une courbe", AMBRE)], 34).move_to(P(0, Y_TXT))
        self.play(FadeOut(pt), FadeIn(ev), FadeIn(cb.fond, shift=UP * 0.2), FadeOut(x), run_time=0.45)
        idx = self.positions("une courbe :", 6)
        prec = None
        for i, k in enumerate(idx):
            self.au_pos(k)
            anims = [FadeIn(cb.ronds[i], scale=0.3), cam.focus(i, 0.25)]
            v = texte(VENTES[i], 22, NUIT).set_stroke(WHITE, 4, background=True).next_to(cb.ronds[i], UP, buff=0.06)
            anims.append(FadeIn(v, scale=1.5))
            if prec is not None:
                s = Line(prec, cb.ronds[i].get_center(), stroke_color=cb.couleur, stroke_width=5)
                anims.append(Create(s))
            self.play(*anims, run_time=0.25)
            self.bring_to_front(*cb.ronds[:i + 1])
            prec = cb.ronds[i].get_center()
        self.au_mot("ça monte")
        fl = Arrow(cb.ronds[0].get_center() + DOWN * 0.25, cb.ronds[5].get_center() + DOWN * 0.25, buff=0.1,
                   color=VERT_OK, stroke_width=5)
        mt = self.t("Ça monte !", 42, VERT_OK).move_to(P(0, Y_TXT))
        self.play(GrowArrow(fl), FadeOut(ev), FadeIn(mt, scale=0.7), cam.rallumer(), run_time=0.5)
        self.attendre_voix(marge=0.3)

        # ── 02 : la question ──
        self.dire("02-question")
        self.au_mot("En avril")
        av = self.ligne([("avril :", WHITE), ("−", ROUGE_ERREUR), ("?", ORANGE_RETENUE), ("robes", WHITE)], 38)
        av.move_to(P(0, Y_TXT))
        self.play(FadeOut(mt), FadeOut(fl), cb.focus(3, 0.4), cam.focus(3, 0.3), FadeIn(av), run_time=0.45)
        self.au_mot("de combien de robes")
        self.insister(av[2], 1.7)
        self.au_mot("Réponds en commentaire")
        appel = self.borne(self.t("Réponds en commentaire !", 34, VERT_OK)).move_to(P(0, Y_TXT - 0.47))
        self.play(FadeIn(appel, scale=0.7), run_time=0.35)
        self.insister(appel, 1.1, 0.25)
        self.attendre_voix(marge=1.5)
