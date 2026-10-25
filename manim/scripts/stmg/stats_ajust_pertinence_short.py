# stats_ajust_pertinence_short.py
# EleveAI — Maths STMG — short jumeau de 20-ajust-pertinence. CEINTURE ORANGE
# (un cran sous la paysage verte). Il AMUSE : « Droite ou courbe ? »
#   · en HAUT, la note de musique (Spotify) puis la voiture électrique, et le
#     nombre du moment ; EN MÊME TEMPS, en bas, le point apparaît dans le nuage ;
#   · Spotify : +28 environ par an, une droite ; les voitures électriques : les
#     écarts explosent (110,9 en 2020), une courbe ;
#   · 1 question-pause (3 s) : lequel se résume par une droite ? ;
#   · fin : 268 + 28 = ? en 2026, à répondre en commentaire (en vrai : 293).
# ⭐ Données RÉELLES : voir l'en-tête de stats_ajust_pertinence.py.
# ⛔ PAS D'ÉCART : un nombre n'apparaît qu'au mot où la voix le dit.
#
# Voix : manim/voix/stmg-stats-ajust-pertinence-short.json (débit −7) ; marques :
# manim/scripts/stmg/stats_ajust_pertinence_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/stats_ajust_pertinence_short.py StatsAjustPertinenceShort -o eleveai-maths-stmg-stats-ajust-pertinence-short --media_dir manim/scripts/stmg/media-stats-ajust-pertinence-short
# Sortie : manim/sorties/stmg/maths/statistiques/20-ajust-pertinence/eleveai-maths-stmg-stats-ajust-pertinence-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats_lycee_j1_commun import *  # noqa: E402,F403
from stats_ajust_pertinence import AN_S, AN_V, SPOT, VE, note_musique, voiture  # noqa: E402

Y_IMG = 1.7


class StatsAjustPertinenceShort(ShortJ1):
    nom_voix = "stmg-stats-ajust-pertinence-short"
    fichier_marques = "stats_ajust_pertinence_short_marques.json"

    def n_spot(self, extra=False):
        n = Nuage(AN_S, SPOT, 2018, 2026, 0, 300, pas_x=2, pas_y=100, fin_x=1, fin_y=50, largeur=3.1, hauteur=2.6,
                  fs=19, nom_x="Année", nom_y="Abonnés (millions)")
        return self.caser_nuage(annees(n))

    def n_ve(self):
        n = Nuage(AN_V, VE, 2014, 2021, 0, 120, pas_x=2, pas_y=40, fin_x=1, fin_y=20, largeur=3.1, hauteur=2.6,
                  fs=19, nom_x="Année", nom_y="Voitures (milliers)")
        return self.caser_nuage(annees(n))

    def construct(self):
        self.margo_bas()
        titre, badge = self.entete_short("Droite ou courbe ?", "orange")
        self.add(badge)
        garder = [badge, titre, self.mobjects[0]]

        # ── 00 : Spotify ──
        n = self.n_spot()
        self.dire("00-accroche")
        self.play(Write(titre), run_time=0.6)
        garder = [badge, titre, self.mobjects[0]]
        self.au_mot("Spotify")
        icone = note_musique(0.55).move_to(P(-1.55, Y_IMG + 0.05))
        t0 = self.ligne([("Spotify", "#22c55e")], 34).move_to(P(0.35, Y_IMG + 0.2))
        self.play(FadeIn(icone, scale=0.5), FadeIn(t0), FadeIn(n.fond), run_time=0.5)
        self.au_mot("100 millions")
        t1 = self.ligne([("100", VIOLET_CLAIR), ("millions", WHITE)], 30).move_to(P(0.35, Y_IMG - 0.3))
        self.play(FadeIn(n.ronds[0], scale=3), FadeIn(t1), run_time=0.4)
        self.au_mot("268 millions")
        t2 = self.ligne([("100", VIOLET_CLAIR), ("→", WHITE), ("268", VIOLET_CLAIR)], 30).move_to(P(0.35, Y_IMG - 0.3))
        self.play(LaggedStart(*[FadeIn(n.ronds[i], scale=3) for i in range(1, 7)], lag_ratio=0.25),
                  FadeOut(t1), FadeIn(t2), run_time=1.0)
        self.au_mot("à peu près 28 de plus")
        self.au_mot("28 de plus")
        t3 = self.ligne([("≈ +28 par an", VERT_OK)], 30).move_to(P(0.35, Y_IMG - 0.3))
        self.play(FadeOut(t2), FadeIn(t3), run_time=0.4)
        self.play(Create(droite(n, 27.643, 100.929 - 27.643 * 2019, sw=5)), run_time=0.6)
        self.attendre_voix(marge=0.1)
        self.vider(garder)

        # ── 01 : les voitures électriques ──
        self.dire("01-image")
        m = self.n_ve()
        vo = voiture(0.85).move_to(P(-1.55, Y_IMG + 0.1))
        self.play(FadeIn(m.fond), FadeIn(vo, shift=RIGHT * 0.3), run_time=0.5)
        self.au_mot("17,3 milliers")
        u = self.ligne([("17,3", VIOLET_CLAIR), ("milliers", WHITE)], 30).move_to(P(0.45, Y_IMG + 0.1))
        self.play(FadeIn(m.ronds[0], scale=3), FadeIn(u), run_time=0.4)
        self.au_mot("42,8 en")
        u2 = self.ligne([("42,8", VIOLET_CLAIR), ("en 2019", WHITE)], 30).move_to(P(0.45, Y_IMG + 0.1))
        self.play(LaggedStart(*[FadeIn(m.ronds[i], scale=3) for i in range(1, 5)], lag_ratio=0.2), FadeOut(u),
                  FadeIn(u2[0]), run_time=0.6)
        self.au_mot("2019")
        self.play(FadeIn(u2[1]), run_time=0.25)
        self.au_mot("110,9")
        u3 = self.ligne([("110,9", ORANGE_RETENUE), ("en 2020 !", WHITE)], 30).move_to(P(0.6, Y_IMG + 0.1))
        self.play(FadeIn(m.ronds[5], scale=4), FadeOut(u2), FadeIn(u3[0]), run_time=0.4)
        self.au_mot("2020")
        self.play(FadeIn(u3[1]), run_time=0.25)
        self.play(Flash(m.ronds[5], color=AMBRE), run_time=0.35)
        self.au_mot("Les écarts explosent")
        courbe = VMobject(color=ORANGE_RETENUE, stroke_width=5).set_points_smoothly([m.p(x, y) for x, y in zip(AN_V, VE)])
        u4 = self.ligne([("une courbe !", ORANGE_RETENUE)], 32).move_to(P(0.45, Y_IMG - 0.45))
        self.play(Create(courbe), FadeIn(u4), run_time=0.8)
        self.attendre_voix(marge=0.2)
        self.vider(garder)

        # ── 02 : la question-pause (3 s) ──
        self.question_pause("02-question", "02b-reponse", ["Lequel se résume", "par une droite ?"],
                            ["Spotify", "les voitures électriques", "les deux"], 0,
                            ["Écarts voisins : une droite.", "Écarts qui explosent : une courbe."], mot_q="Lequel",
                            mots_choix=["Spotify", "les voitures", "les deux"],
                            mots_ph=["Des écarts voisins", "Des écarts qui"])
        self.vider(garder)

        # ── 03 : 2026, en commentaire ──
        self.dire("03-question")
        n2 = self.n_spot()
        self.play(FadeIn(n2), Create(droite(n2, 27.643, 100.929 - 27.643 * 2019, sw=5)), run_time=0.5)
        self.au_mot("28 millions de plus")
        t5 = self.ligne([("+28", VERT_OK), ("par an →", WHITE), ("2026 :", WHITE), ("?", ORANGE_RETENUE)], 36)
        t5.move_to(P(0, Y_IMG + 0.2))
        self.play(FadeIn(t5[:2], shift=UP * 0.1), run_time=0.4)
        self.au_mot("2026")
        self.play(FadeIn(t5[2:]), Create(n2.verticale(2026)), FadeIn(lu_annee(n2, 2026), scale=1.4), run_time=0.45)
        self.insister(t5[3], 1.5)
        self.appel_commentaire()
