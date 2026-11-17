# 3e_section_sphere_short.py
# EleveAI — Maths 3e — SHORT de l'épisode T6 « la section d'une sphère » (micro 3e section_sphere).
# ⛔ EN MANIM, PAS EN DESSIN ANIMÉ (REGLES.md 09/11 ; Frédéric, 16/11), et avec un DÉFI.
# CEINTURE BLANCHE, 9:16. Le défi : sur le globe, l'équateur et un parallèle près du pôle — lequel
# est le plus grand cercle ? Réponse A (l'équateur passe par le centre).
# ⛔ La voix de réponse n'a aucun nombre : la phrase de réponse n'en porte aucun non plus.
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/4e/3e_section_sphere_short.py ShortSectionSphere3e
# ⛔ Contrôler le COMPTEUR sur le MP4 (barre de 3 s entière, dans la carte, rien par-dessus).

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from volume_4e_short_commun import *  # noqa: E402,F403
from volume_4e_short_commun import Short4e, sans_audit, Y_ACCROCHE  # noqa: E402
from volume_4e_commun import boule  # noqa: E402

GLOBE_C, GLOBE_B = "#2563eb", "#0c4a6e"
EQUA_C = "#facc15"
PARA_C = "#22d3ee"


def globe(r, o=ORIGIN, sw=4):
    """Un globe : la boule bleue et son équateur (jaune)."""
    b = boule(r, 1.0, o, couleur=GLOBE_C, bord=GLOBE_B, sw=sw)
    eq = Ellipse(width=2 * r, height=2 * r * 0.3, stroke_color=EQUA_C, stroke_width=sw + 2,
                 fill_opacity=0).move_to(o)
    g = VGroup(b, eq)
    g.boule_, g.equateur_t, g.centre, g.r = b, eq, o, r
    return g


def parallele(g, k, couleur=PARA_C, sw=4):
    """Le parallèle à la hauteur relative k (−1 … 1) sur le globe g."""
    rk = g.r * (1 - k * k) ** 0.5
    return Ellipse(width=2 * rk, height=2 * rk * 0.3, stroke_color=couleur, stroke_width=sw,
                   fill_opacity=0).move_to(g.centre + UP * k * g.r)


class ShortSectionSphere3e(Short4e):
    nom_voix = "3e-section-sphere-short"
    fichier_marques = "3e_section_sphere_short_marques.json"

    def construct(self):
        self.margo_bas()

        # ── 00 : deux cercles sur le globe ─────────────────────────────────
        self.dire("00-accroche")
        self.ouverture("Équateur ou parallèle ?", fs=28)
        gl = globe(1.25, P(0, 0.2))
        self.add(gl.boule_)
        self.au_mot("deux cercles")
        self.play(Create(gl.equateur_t), run_time=0.7)
        self.au_mot("tout près du pôle")
        par = parallele(gl, 0.86)
        self.play(Create(par), run_time=0.7)
        et = VGroup(sans_audit(self.t("l'équateur", 24, EQUA_C)),
                    sans_audit(self.t("le parallèle", 24, PARA_C)))
        et[0].move_to(P(0, -1.6))
        et[1].move_to(P(0, -2.2))
        self.play(FadeIn(et), run_time=0.5)
        self.attendre_voix(marge=0.2)

        # ── 01 : le défi ────────────────────────────────────────────────────
        self.dire("01-defi")
        self.au_mot("Lequel est le plus grand")
        q = self.accroche("le plus grand ?", fs=30, couleur=JAUNE_TITRE, y=-2.8)
        self.play(FadeIn(q, scale=1.15),
                  Indicate(gl.equateur_t, color=EQUA_C, scale_factor=1.1),
                  Indicate(par, color=PARA_C, scale_factor=1.25), run_time=1.0)
        self.attendre_voix(marge=0.25)

        # ── 02 : la question-pause (3 s) — réponse A ───────────────────────
        # ⛔ Le mot de la carte (« plus ») est ABSENT de la voix : elle se pose juste après
        #    « Question ! », sans attendre un choix.
        self.ecran_question("02-question", "02b-reponse",
                            ["Le plus grand cercle ?"],
                            ["l'équateur", "le parallèle", "les deux pareil"], 0,
                            ["L'équateur passe par le centre.", "Plus loin du centre,",
                             "plus le cercle rétrécit."],
                            x_col=0.0)

        # ── 03 : près du pôle, presque plus rien ───────────────────────────
        self.clear()
        self.margo_bas()
        self.dire("03-visuel")
        tit = self.grand("Près du pôle", font_size=34, color=JAUNE_TITRE).move_to(P(0, 3.3))
        self.add(tit)
        gl = globe(1.3, P(0, 0.6))
        self.add(gl.boule_, gl.equateur_t)
        self.au_mot("Près du pôle")
        hauts = VGroup(*[parallele(gl, k) for k in (0.55, 0.78, 0.93)])
        self.play(LaggedStart(*[Create(e) for e in hauts], lag_ratio=0.3), run_time=1.2)
        self.au_mot("presque plus rien")
        res = self.t("presque plus rien", 28, VERT_OK).move_to(P(0, -1.9))
        self.play(FadeIn(res, scale=1.15), Indicate(hauts[2], color=PARA_C, scale_factor=1.6),
                  run_time=0.9)
        self.attendre_voix(marge=0.3)

        # ── 04 : la question en commentaire ────────────────────────────────
        self.clear()
        self.margo_bas()
        self.dire("04-commentaire")
        self.play(FadeIn(self.grand("À toi !", font_size=50, color=JAUNE_TITRE).move_to(P(0, 3.2))),
                  run_time=0.4)
        gl = globe(1.2, P(0, 0.8))
        self.add(gl.boule_)
        self.au_mot("que devient la section")
        self.play(Indicate(gl.boule_, color=GLOBE_C, scale_factor=1.05), run_time=0.6)
        self.au_mot("sans la traverser")
        tang = Line(P(-1.8, 2.0), P(1.8, 2.0), color=JAUNE_TITRE, stroke_width=6)
        touche = self.t("le plan touche,", 26, JAUNE_TITRE).move_to(P(0, -0.9))
        self.play(Create(tang), FadeIn(touche, shift=UP * 0.1), run_time=0.9)
        sq = self.t("il ne traverse pas.", 26, JAUNE_TITRE).move_to(P(0, -1.6))
        self.play(FadeIn(sq, shift=UP * 0.1), run_time=0.45)
        self.au_mot("Réponds en commentaire")
                # ⛔ Rien ne descend sous y = −3,0 dans un short : Ti-Margo occupe la bande basse
        #    (centré en −3,45, environ 0,55 de haut). Le commentaire fait 0,8 de haut.
        self.play(FadeIn(self.commentaire(y=-2.6)), run_time=0.4)
        self.attendre_voix(marge=0.3)

        # ── 05 ──────────────────────────────────────────────────────────────
        self.page_abonnement("05-abonne")
