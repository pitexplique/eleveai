# stats_enquete_planifier_short.py
# EleveAI — Maths 6e — short jumeau de la série « Statistiques », épisode 04 :
# planifier une enquête. CEINTURE BLANCHE. Il AMUSE : « 9 joueurs sur 10
# adorent mon jeu ! » … mais qui a répondu ?
#   · en HAUT la vidéo publicitaire du jeu (manette, bandeau « 9 sur 10 ») ;
#   · en BAS, EN MÊME TEMPS, les 10 joueurs interrogés (9 cœurs) ; puis on
#     recule : ce sont 10 abonnés de la chaîne, perdus dans une foule grise
#     (l'échantillon biaisé) ;
#   · fin : le collège (4 couleurs), A = tes amis (un petit groupe) ou B = des
#     élèves de chaque classe tirés au hasard ? « Réponds en commentaire ! ».
# ⛔ PAS D'ÉCART : un nombre n'apparaît qu'au moment où la voix le dit.
# Ti-Margo en bas (margo_bas).
#
# Voix : manim/voix/6e-stats-enquete-planifier-short.json (débit −10), WAV dans
# public/sons/6e-stats-enquete-planifier-short/ ; calage mot à mot :
# manim/scripts/6e/stats_enquete_planifier_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/6e/stats_enquete_planifier_short.py StatsEnquetePlanifierShort6e -o eleveai-maths-6e-stats-enquete-planifier-short --media_dir manim/scripts/6e/media-enquete-planifier-short
# Sortie : manim/sorties/6e/maths/statistiques/04-enquete-planifier/eleveai-maths-6e-stats-enquete-planifier-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats6_lotc_commun import *  # noqa: E402,F403
from stats_enquete_planifier import C_NIV, GRIS_PT, college, tirage  # noqa: E402
from canvas_stats import AMBRE, NUIT  # noqa: E402

Y_TXT = 0.12


def manette(s=1.0):
    corps = RoundedRectangle(width=1.6, height=0.8, corner_radius=0.38, fill_color="#334155", fill_opacity=1,
                             stroke_color=WHITE, stroke_width=3)
    croix_d = VGroup(Rectangle(width=0.36, height=0.1), Rectangle(width=0.1, height=0.36)).set_fill(
        WHITE, 1).set_stroke(width=0).move_to(P(-0.42, 0))
    boutons = VGroup(*[Dot(P(0.42 + dx, dy), radius=0.07, color=c) for dx, dy, c in
                       ((0.13, 0, "#ef4444"), (-0.13, 0, "#22c55e"), (0, 0.13, "#facc15"), (0, -0.13, "#3b82f6"))])
    return VGroup(corps, croix_d, boutons).scale(s)


def joueur(c="#94a3b8", r=0.14):
    tete = Circle(radius=r, fill_color=c, fill_opacity=1, stroke_width=0)
    corps = RoundedRectangle(width=2.4 * r, height=2.6 * r, corner_radius=r, fill_color=c, fill_opacity=1,
                             stroke_width=0).next_to(tete, DOWN, buff=0.03)
    return VGroup(tete, corps)


def coeur(s=0.2, c="#f43f5e"):
    g = VGroup(Circle(radius=0.5, fill_color=c, fill_opacity=1, stroke_width=0).shift(P(-0.35, 0.2)),
               Circle(radius=0.5, fill_color=c, fill_opacity=1, stroke_width=0).shift(P(0.35, 0.2)),
               Polygon(P(-0.83, 0.05), P(0.83, 0.05), P(0, -0.95), fill_color=c, fill_opacity=1, stroke_width=0))
    return g.scale(s)


class StatsEnquetePlanifierShort6e(MotsCales6, OutilsShort, Short6e):
    nom_voix = "6e-stats-enquete-planifier-short"
    fichier_marques = "stats_enquete_planifier_short_marques.json"

    def construct(self):
        self.margo_bas()
        titre, badge = self.entete_short("Un jeu vidéo")
        self.add(badge)
        ecran = RoundedRectangle(width=3.9, height=1.75, corner_radius=0.15, fill_color="#0b1220", fill_opacity=1,
                                 stroke_color="#64748b", stroke_width=4).move_to(P(0, 1.25))
        lecture = Triangle(fill_color="#ef4444", fill_opacity=1, stroke_width=0).rotate(-PI / 2).scale(0.13)
        lecture.move_to(ecran.get_corner(DL) + P(0.25, 0.22))
        m = manette(0.7).move_to(ecran.get_center() + LEFT * 1.25)
        joueurs = VGroup(*[joueur() for _ in range(10)]).arrange(RIGHT, buff=0.08).move_to(P(0, -0.9))
        coeurs = VGroup(*[coeur(0.11).next_to(j, UP, buff=0.06) for j in joueurs[:9]])

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        self.au_mot("9 joueurs sur 10")
        bandeau = VGroup(self.t("9 joueurs sur 10", 26, WHITE), self.t("adorent !", 30, "#f9a8d4")).arrange(
            DOWN, buff=0.08)
        bandeau.scale_to_fit_width(2.15).move_to(ecran.get_center() + RIGHT * 0.62)
        self.play(FadeIn(titre), FadeIn(VGroup(ecran, lecture, m), scale=0.9), run_time=0.4)
        self.play(FadeIn(bandeau[0], scale=1.4), LaggedStart(*[FadeIn(j, shift=UP * 0.2) for j in joueurs],
                                                             lag_ratio=0.06), run_time=0.7)
        self.au_mot("adorent mon jeu")
        self.play(FadeIn(bandeau[1], scale=1.3), LaggedStart(*[FadeIn(c, scale=0.3) for c in coeurs],
                                                             lag_ratio=0.06), run_time=0.6)
        self.au_mot("On la croit")
        croit = self.t("On la croit ?", 40, ORANGE_RETENUE).move_to(P(0, Y_TXT))
        self.play(FadeIn(croit, scale=0.6), run_time=0.35)
        self.insister(croit, 1.15)
        self.attendre_voix(marge=0.1)

        # ── 01 : qui a répondu ? ──
        self.dire("01-image")
        self.au_mot("Qui a répondu")
        qui = self.borne(self.t("Qui a répondu ?", 38), 0.5).move_to(P(0, Y_TXT))
        self.play(FadeOut(croit, shift=UP * 0.2), FadeIn(qui, shift=UP * 0.2), run_time=0.35)
        self.au_mot("10 abonnés")
        logos = VGroup(*[Triangle(fill_color="#ef4444", fill_opacity=1, stroke_width=0).rotate(-PI / 2).scale(0.06)
                         .move_to(j[1].get_center()) for j in joueurs])
        lab = self.ligne([("10", AMBRE), ("abonnés de la chaîne", WHITE)], 30).next_to(joueurs, DOWN, buff=0.3)
        self.play(joueurs.animate.set_color("#fca5a5"), FadeIn(logos), FadeIn(lab, scale=0.7), run_time=0.45)
        self.au_mot("Évidemment")
        self.play(LaggedStart(*[c.animate.scale(1.6) for c in coeurs], lag_ratio=0.05), run_time=0.5)
        self.play(*[c.animate.scale(1 / 1.6) for c in coeurs], run_time=0.3)
        self.au_mot("Ce n'est pas tout le monde")
        groupe = VGroup(joueurs, coeurs, logos)
        foule = VGroup(*[Dot(radius=0.06, color=GRIS_PT) for _ in range(144)]).arrange_in_grid(9, 16, buff=0.12)
        foule.move_to(P(0, -1.72))  # un vrai espace sous « échantillon biaisé »
        self.play(FadeOut(lab), groupe.animate.scale(0.32).move_to(foule[0].get_center() + P(0.25, -0.15)),
                  run_time=0.6)
        bulle = SurroundingRectangle(groupe, color="#ec4899", buff=0.06, corner_radius=0.08, stroke_width=4)
        trous = VGroup(*[d for d in foule if np.linalg.norm(d.get_center() - groupe.get_center()) < 0.45])
        self.play(FadeIn(VGroup(*[d for d in foule if d not in trous]), lag_ratio=0.01), Create(bulle),
                  run_time=0.8)
        self.au_mot("c'est un échantillon biaisé")
        biais = self.borne(self.t("échantillon biaisé", 36, ROUGE_ERREUR), 0.5).move_to(P(0, Y_TXT))
        self.play(FadeOut(qui), FadeIn(biais, scale=1.4), run_time=0.4)
        self.insister(VGroup(groupe, bulle), 1.5)
        self.attendre_voix(marge=0.3)

        # ── 02 : la question ──
        self.dire("02-question")
        self.au_mot("les élèves de ton collège")
        cols = college(n_col=6, n_lig=9, pas=0.15, r=0.05, gap=0.22).move_to(P(0, -1.25))
        coll = self.t("ton collège", 30, "#94a3b8").next_to(cols, UP, buff=0.12)
        self.play(FadeOut(VGroup(groupe, bulle, biais, trous, ecran, lecture, m, bandeau,
                                 *[d for d in foule if d not in trous])),
                  FadeIn(cols), FadeIn(coll), run_time=0.6)
        self.au_mot("tes amis")
        amis = VGroup(*[cols[1][i] for i in (19, 20, 25, 26, 27)])
        ba = SurroundingRectangle(amis, color=ROUGE_ERREUR, buff=0.06, corner_radius=0.06, stroke_width=4)
        a = self.ligne([("A :", AMBRE), ("tes amis", WHITE)], 36).move_to(P(0, 1.15))
        self.play(Create(ba), amis.animate.scale(1.5), FadeIn(a, shift=UP * 0.2), FadeOut(coll), run_time=0.45)
        self.au_mot("ou des élèves de chaque classe")
        b = VGroup(self.ligne([("B :", AMBRE), ("chaque classe,", WHITE)], 34), self.t("au hasard", 34)).arrange(
            DOWN, buff=0.1).move_to(P(0, 0.2))
        tires = [tirage(cols[k], 6, 3 + k) for k in range(4)]
        self.play(FadeIn(b, shift=UP * 0.2), run_time=0.4)
        self.au_mot("tirés au hasard")
        self.play(LaggedStart(*[p.animate.scale(1.8).set_color(WHITE) for t in tires for p in t], lag_ratio=0.03),
                  run_time=0.8)
        self.au_mot("Réponds en commentaire")
        q = self.t("A ou B ?", 44, ORANGE_RETENUE).move_to(P(0, 1.85)).set_z_index(3)
        appel = self.borne(self.t("Réponds en commentaire !", 32, VERT_OK)).move_to(P(0, -2.45))
        self.play(FadeIn(q, scale=0.6), FadeIn(appel, scale=0.7),
                  run_time=0.4)
        self.insister(q, 1.2, 0.25)
        self.attendre_voix(marge=1.5)
