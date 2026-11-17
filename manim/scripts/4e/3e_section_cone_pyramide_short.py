# 3e_section_cone_pyramide_short.py
# EleveAI — Maths 3e — SHORT de l'épisode T5 « la section d'un cône et d'une pyramide »
# (micro 3e section_cone_pyramide).
# ⛔ EN MANIM, PAS EN DESSIN ANIMÉ (REGLES.md 09/11 ; Frédéric, 16/11), et avec un DÉFI.
# CEINTURE BLANCHE, 9:16. Le défi : Jade coupe son volcan à mi-hauteur — quel rayon pour le disque
# de la coupe ? Réponse C (la moitié ; c'est l'AIRE qui serait divisée par 4).
# ⛔ « 1 000 » est écrit en sans_audit : dans un short, l'audit efface l'espace des milliers et ne
#    retrouve plus le nombre dans la voix (leçon 29).
# ⛔ Après le premier point de la voix de réponse, il ne reste que « 4 » : la phrase de réponse ne
#    porte que ce nombre-là (leçon 28).
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/4e/3e_section_cone_pyramide_short.py ShortSectionConePyramide3e
# ⛔ Contrôler le COMPTEUR sur le MP4 (barre de 3 s entière, dans la carte, rien par-dessus).

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from volume_4e_short_commun import *  # noqa: E402,F403
from volume_4e_short_commun import Short4e, sans_audit, Y_ACCROCHE  # noqa: E402
from volume_4e_commun import cone  # noqa: E402

ROCHE_C, ROCHE_D, ROCHE_B = "#7f1d1d", "#b91c1c", "#450a0a"
LAVE_C = "#f97316"
PLAN_C = "#facc15"
SECTION_C = "#22d3ee"


def volcan(r, haut, u, o=ORIGIN, sw=3):
    """Le volcan : un cône de roche et son cratère."""
    c = cone(r, haut, u, o, corps=ROCHE_C, disque=ROCHE_D, bord=ROCHE_B, sw=sw)
    cr = Ellipse(width=0.42 * r * u, height=0.42 * r * u * 0.32, fill_color="#1c1917",
                 fill_opacity=1, stroke_color=LAVE_C, stroke_width=sw).move_to(c.S)
    c.add(cr)
    c.cratere = cr
    return c


def section_cone(c, k, couleur=SECTION_C, op=0.55, sw=4):
    """La section d'un cône à la fraction k de sa hauteur : une ellipse de rayon (1 − k) × r."""
    rk = (1 - k) * c.r * c.u
    centre = c.o + UP * k * c.haut * c.u
    e = Ellipse(width=2 * rk, height=2 * rk * 0.32, fill_color=couleur, fill_opacity=op,
                stroke_color=couleur, stroke_width=sw).move_to(centre)
    e.rk, e.centre_s = rk, centre
    return e


class ShortSectionConePyramide3e(Short4e):
    nom_voix = "3e-section-cone-pyramide-short"
    fichier_marques = "3e_section_cone_pyramide_short_marques.json"

    def construct(self):
        self.margo_bas()

        # ── 00 : le volcan coupé à mi-hauteur ──────────────────────────────
        self.dire("00-accroche")
        self.ouverture("Le volcan à mi-hauteur", fs=30)
        v = volcan(1.3, 1.8, 0.85, P(0, -1.6))
        self.add(v)
        self.au_mot("coupe son volcan")
        s = section_cone(v, 0.5, couleur=PLAN_C)
        self.play(FadeIn(s, shift=DOWN * 0.2), run_time=0.7)
        self.au_mot("1 000")
        base = Line(v.o, v.o + P(1.3 * 0.85, 0)).set_stroke(BASE_C, 6)
        e1000 = sans_audit(self.t("1 000 m", 24, BASE_C)).next_to(base, DOWN, buff=0.14)
        self.play(Create(base), FadeIn(e1000), run_time=0.7)
        self.attendre_voix(marge=0.2)

        # ── 01 : le défi ────────────────────────────────────────────────────
        self.dire("01-defi")
        self.au_mot("À mi-hauteur")
        self.play(Indicate(s, color=PLAN_C, scale_factor=1.15), run_time=0.7)
        self.au_mot("le rayon du disque")
        ray = Line(s.centre_s, s.centre_s + P(s.rk, 0)).set_stroke(SECTION_C, 6)
        q = self.accroche("son rayon ?", fs=30, couleur=JAUNE_TITRE, y=Y_ACCROCHE)
        self.play(Create(ray), FadeIn(q, scale=1.1), run_time=0.8)
        self.attendre_voix(marge=0.25)

        # ── 02 : la question-pause (3 s) — réponse C ───────────────────────
        # ⛔ Le mot de la carte (« rayon ») est ABSENT de la voix : elle se pose juste après
        #    « Question ! », sans attendre un choix.
        self.ecran_question("02-question", "02b-reponse",
                            ["Le rayon de la coupe ?"],
                            ["le même", "le quart", "la moitié"], 2,
                            ["Le rayon est la moitié.", ["C'est l'aire", "qui serait ÷ 4."]],
                            x_col=0.0)

        # ── 03 : mi-hauteur, demi-rayon ────────────────────────────────────
        self.clear()
        self.margo_bas()
        self.dire("03-visuel")
        tit = self.grand("Mi-hauteur", font_size=34, color=JAUNE_TITRE).move_to(P(0, 3.3))
        self.add(tit)
        v = volcan(1.4, 2.0, 0.9, P(0, -1.3))
        self.add(v)
        self.au_mot("Mi-hauteur")
        hh = DashedLine(v.o, v.S, color=HAUTEUR_C, stroke_width=5, dash_length=0.12)
        s = section_cone(v, 0.5, couleur=PLAN_C)
        self.play(Create(hh), FadeIn(s, shift=DOWN * 0.15), run_time=0.9)
        self.au_mot("demi-rayon")
        rb = Line(v.o, v.o + P(1.4 * 0.9, 0)).set_stroke(BASE_C, 7)
        rs = Line(s.centre_s, s.centre_s + P(s.rk, 0)).set_stroke(SECTION_C, 7)
        self.play(Create(rb), Create(rs), run_time=0.9)
        cmp = VGroup(Line(ORIGIN, RIGHT * 1.26).set_stroke(BASE_C, 8),
                     Line(ORIGIN, RIGHT * 0.63).set_stroke(SECTION_C, 8))
        cmp.arrange(DOWN, buff=0.3, aligned_edge=LEFT).move_to(P(0, -2.65))
        self.play(FadeIn(cmp), run_time=0.6)
        self.attendre_voix(marge=0.3)

        # ── 04 : la question en commentaire ────────────────────────────────
        self.clear()
        self.margo_bas()
        self.dire("04-commentaire")
        self.play(FadeIn(self.grand("À toi !", font_size=50, color=JAUNE_TITRE).move_to(P(0, 3.2))),
                  run_time=0.4)
        v = volcan(1.3, 1.9, 0.85, P(0, -1.0))
        self.add(v)
        self.au_mot("au quart de la hauteur")
        s = section_cone(v, 0.75, couleur=PLAN_C)
        self.play(FadeIn(s, shift=DOWN * 0.15), run_time=0.7)
        self.au_mot("en partant du sommet")
        fl = DoubleArrow(s.centre_s, v.S, color=ORANGE_RETENUE, buff=0, stroke_width=5,
                         tip_length=0.14)
        depuis = self.t("depuis le sommet", 24, ORANGE_RETENUE).move_to(P(0, 2.1))
        self.play(Create(fl), FadeIn(depuis), run_time=0.8)
        self.au_mot("quel est le rapport")
        rq = self.t("quel rapport ?", 30, JAUNE_TITRE).move_to(P(0, -1.8))
        self.play(FadeIn(rq, scale=1.12), run_time=0.5)
        self.au_mot("Réponds en commentaire")
        # ⛔ Rien ne descend sous y = −3,0 dans un short : Ti-Margo occupe la bande basse
        #    Ses PIXELS s'arrêtent à y = −3,02 (sa boîte, elle, monte à −2,92 : elle a du
        #    vide en haut). Le commentaire fait 0,852 de haut, donc −2,45 ; une phrase
        #    seule fait 0,36, donc −2,65. ⛔ À −2,6 le commentaire TOUCHE encore.
        self.play(FadeIn(self.commentaire(y=-2.45)), run_time=0.4)
        self.attendre_voix(marge=0.3)

        # ── 05 ──────────────────────────────────────────────────────────────
        self.page_abonnement("05-abonne")
