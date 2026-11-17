# 3e_section_cylindre_short.py
# EleveAI — Maths 3e — SHORT de l'épisode T4 « la section d'un cylindre » (micro 3e section_cylindre).
# ⛔ EN MANIM, PAS EN DESSIN ANIMÉ (REGLES.md 09/11 ; Frédéric, 16/11), et avec un DÉFI.
# CEINTURE BLANCHE, 9:16. Le défi : Oscar coupe un tube de 3 cm de rayon bien en travers — si le
# tube était plein, quelle serait l'aire de la coupe ? Réponse C (9π cm² ; 6π, c'est le tour).
# ⛔ Après le premier point de la voix de réponse, il ne reste que « 6 » : la phrase de réponse ne
#    porte que ce nombre-là, dans un morceau à lui (leçon 28).
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/4e/3e_section_cylindre_short.py ShortSectionCylindre3e
# ⛔ Contrôler le COMPTEUR sur le MP4 (barre de 3 s entière, dans la carte, rien par-dessus).

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from volume_4e_short_commun import *  # noqa: E402,F403
from volume_4e_short_commun import Short4e, sans_audit, Y_ACCROCHE  # noqa: E402
from volume_4e_commun import point3, cylindre  # noqa: E402

METAL_C, METAL_D, METAL_B = "#94a3b8", "#cbd5e1", "#334155"
PLAN_C = "#facc15"
SECTION_C = "#22d3ee"


def tube(r, h, u, o=ORIGIN, sw=3):
    return cylindre(r, h, u, o, corps=METAL_C, dessus=METAL_D, bord=METAL_B, sw=sw)


def plan_travers(l, p, u, o=ORIGIN, couleur=PLAN_C, op=0.3, sw=3):
    q = lambda x, y: point3(o, u, x, y, 0)  # noqa: E731
    return Polygon(q(0, 0), q(l, 0), q(l, p), q(0, p), fill_color=couleur, fill_opacity=op,
                   stroke_color=couleur, stroke_width=sw)


def disque_plat(r, o=ORIGIN, sw=4, couleur=SECTION_C):
    d = Circle(radius=r, fill_color=couleur, fill_opacity=0.35, stroke_color=couleur,
               stroke_width=sw).move_to(o)
    d.centre, d.r = o, r
    return d


def couronne(re, ri, o=ORIGIN, sw=4):
    metal = Annulus(inner_radius=ri, outer_radius=re, fill_color=METAL_C, fill_opacity=0.9,
                    stroke_color=METAL_B, stroke_width=sw).move_to(o)
    trou = Circle(radius=ri, fill_color=BLACK, fill_opacity=1, stroke_color=METAL_B,
                  stroke_width=sw * 0.7).move_to(o)
    g = VGroup(trou, metal)
    g.metal, g.trou, g.centre = metal, trou, o
    return g


class ShortSectionCylindre3e(Short4e):
    nom_voix = "3e-section-cylindre-short"
    fichier_marques = "3e_section_cylindre_short_marques.json"

    def construct(self):
        self.margo_bas()

        # ── 00 : le tube coupé en travers ──────────────────────────────────
        self.dire("00-accroche")
        self.ouverture("Le bout du tube", fs=34)
        tb = tube(0.55, 2.0, 0.8, P(0, -0.9))
        self.add(tb)
        self.au_mot("3 centimètres de rayon")
        ray = Line(tb.o + UP * 1.6, tb.o + UP * 1.6 + P(0.44, 0)).set_stroke(BASE_C, 6)
        e3 = sans_audit(self.t("3 cm", 24, BASE_C)).next_to(ray, RIGHT, buff=0.12)
        self.play(Create(ray), FadeIn(e3), run_time=0.6)
        self.au_mot("bien en travers")
        pl = plan_travers(1.4, 1.1, 0.8, P(-0.56, 0.1))
        self.play(FadeIn(pl, shift=DOWN * 0.25), run_time=0.7)
        self.attendre_voix(marge=0.2)

        # ── 01 : le défi ────────────────────────────────────────────────────
        self.dire("01-defi")
        self.au_mot("Si le tube était plein")
        d = disque_plat(0.75, P(0, -2.2))
        self.play(FadeIn(d, scale=0.8), run_time=0.7)
        self.au_mot("l'aire de la coupe")
        q = self.accroche("son aire ?", fs=30, couleur=JAUNE_TITRE, y=Y_ACCROCHE)
        self.play(FadeIn(q, scale=1.15), Indicate(d, color=SECTION_C, scale_factor=1.1),
                  run_time=0.8)
        self.attendre_voix(marge=0.25)

        # ── 02 : la question-pause (3 s) — réponse C ───────────────────────
        # ⛔ Le mot de la carte (« aire ») est ABSENT de la voix : elle se pose juste après
        #    « Question ! », sans attendre un choix.
        self.ecran_question("02-question", "02b-reponse",
                            ["L'aire de la coupe ?"],
                            ["6π cm²", "3π cm²", "9π cm²"], 2,
                            ["π × rayon × rayon.", ["6π", "c'est le tour du cercle."]],
                            x_col=0.0)

        # ── 03 : en travers un disque, dans la longueur un rectangle ───────
        self.clear()
        self.margo_bas()
        self.dire("03-visuel")
        tit = self.grand("Deux coupes", font_size=34, color=JAUNE_TITRE).move_to(P(0, 3.3))
        self.add(tit)
        self.au_mot("En travers")
        tb1 = tube(0.5, 1.4, 0.8, P(-1.1, 1.0))
        pl1 = plan_travers(1.3, 1.0, 0.8, P(-1.62, 1.6))
        d = disque_plat(0.5, P(1.1, 1.6))
        self.play(FadeIn(tb1), FadeIn(pl1), run_time=0.6)
        self.au_mot("un disque")
        self.play(FadeIn(d, scale=0.8), run_time=0.5)
        self.au_mot("Dans la longueur")
        tb2 = tube(0.5, 1.4, 0.8, P(-1.1, -1.9))
        pl2 = Rectangle(width=0.26, height=1.5, fill_color=PLAN_C, fill_opacity=0.28,
                        stroke_color=PLAN_C, stroke_width=3).move_to(P(-1.1, -1.35))
        r = Rectangle(width=0.8, height=1.12, fill_color=SECTION_C, fill_opacity=0.35,
                      stroke_color=SECTION_C, stroke_width=4).move_to(P(1.1, -1.3))
        self.play(FadeIn(tb2), FadeIn(pl2), run_time=0.6)
        self.au_mot("un rectangle")
        self.play(FadeIn(r, scale=0.8), run_time=0.6)
        self.attendre_voix(marge=0.3)

        # ── 04 : la question en commentaire ────────────────────────────────
        self.clear()
        self.margo_bas()
        self.dire("04-commentaire")
        self.play(FadeIn(self.grand("À toi !", font_size=50, color=JAUNE_TITRE).move_to(P(0, 3.2))),
                  run_time=0.4)
        self.au_mot("la section d'un tube")
        co = couronne(0.85, 0.65, P(0, 1.1))
        self.play(FadeIn(co, scale=0.85), run_time=0.7)
        self.au_mot("en tenant compte du vide")
        vide = self.t("le vide compte", 26, ROUGE_ERREUR).move_to(P(0, -0.5))
        self.play(FadeIn(vide, scale=1.1), Indicate(co.trou, color=ROUGE_ERREUR, scale_factor=1.2),
                  run_time=0.8)
        fq = self.t("quelle forme ?", 30, JAUNE_TITRE).move_to(P(0, -1.5))
        self.play(FadeIn(fq, scale=1.1), run_time=0.5)
        self.au_mot("Réponds en commentaire")
                # ⛔ Rien ne descend sous y = −3,0 dans un short : Ti-Margo occupe la bande basse
        #    (centré en −3,45, environ 0,55 de haut). Le commentaire fait 0,8 de haut.
        self.play(FadeIn(self.commentaire(y=-2.6)), run_time=0.4)
        self.attendre_voix(marge=0.3)

        # ── 05 ──────────────────────────────────────────────────────────────
        self.page_abonnement("05-abonne")
