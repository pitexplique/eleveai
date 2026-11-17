# 3e_volume_boule_short.py
# EleveAI — Maths 3e — SHORT de l'épisode T1 « le volume d'une boule » (micro 3e volume_boule).
# ⛔ EN MANIM, PAS EN DESSIN ANIMÉ (REGLES.md 09/11 ; Frédéric, 16/11), et avec un DÉFI.
# CEINTURE BLANCHE, 9:16. Le défi : tu souffles 4 litres dans un ballon — quel rayon fait-il ?
# Réponse B (10 cm : 4 × π × 1 000 ÷ 3 ≈ 4 189 cm³, soit 4,2 L).
# ⛔ La phrase de réponse ne porte que les nombres dits APRÈS le premier point de la voix (4,2).
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/4e/3e_volume_boule_short.py ShortVolumeBoule3e
# ⛔ Contrôler le COMPTEUR sur le MP4 (barre de 3 s entière, dans la carte, rien par-dessus).

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from volume_4e_short_commun import *  # noqa: E402,F403
from volume_4e_short_commun import Short4e, sans_audit, Y_ACCROCHE  # noqa: E402
from volume_4e_commun import boule  # noqa: E402

BALLON_C, BALLON_B = "#f472b6", "#831843"
POUMON_C, POUMON_B = "#fb7185", "#881337"
AIR_C = "#7dd3fc"


def ballon(r, o=ORIGIN, sw=4):
    """Le ballon : une boule rose et son embout."""
    b = boule(r, 1.0, o, couleur=BALLON_C, bord=BALLON_B, sw=sw)
    col = Polygon(o + P(-0.09, -r), o + P(0.09, -r), o + P(0.14, -r - 0.34), o + P(-0.14, -r - 0.34),
                  fill_color=BALLON_B, fill_opacity=1, stroke_width=0)
    b.add(col)
    b.embout = col
    return b


def poumons(s=1.0, o=ORIGIN, sw=4):
    """Deux poumons schématiques et leur trachée."""
    g = Ellipse(width=0.8 * s, height=1.3 * s, fill_color=POUMON_C, fill_opacity=0.85,
                stroke_color=POUMON_B, stroke_width=sw).move_to(o + P(-0.46 * s, 0))
    d = Ellipse(width=0.8 * s, height=1.3 * s, fill_color=POUMON_C, fill_opacity=0.85,
                stroke_color=POUMON_B, stroke_width=sw).move_to(o + P(0.46 * s, 0))
    tr = VGroup(Line(o + P(0, 0.92 * s), o + P(0, 0.4 * s)),
                Line(o + P(0, 0.4 * s), o + P(-0.38 * s, 0.18 * s)),
                Line(o + P(0, 0.4 * s), o + P(0.38 * s, 0.18 * s))).set_stroke(AIR_C, sw + 2)
    v = VGroup(g, d, tr)
    v.gauche, v.droit, v.trachee = g, d, tr
    return v


class ShortVolumeBoule3e(Short4e):
    nom_voix = "3e-volume-boule-short"
    fichier_marques = "3e_volume_boule_short_marques.json"

    def construct(self):
        self.margo_bas()

        # ── 00 : souffler tout l'air de ses poumons ────────────────────────
        self.dire("00-accroche")
        self.ouverture("Tout l'air de tes poumons", fs=28)
        pou = poumons(1.1, P(0, 1.1))
        self.play(FadeIn(pou, scale=0.85), run_time=0.6)
        b = ballon(0.85, P(0, -1.2))
        self.au_mot("dans un ballon")
        self.play(FadeIn(b, scale=0.7), Indicate(pou.trachee, color=AIR_C, scale_factor=1.12),
                  run_time=0.8)
        self.au_mot("4 litres")
        lit = self.t("environ 4 litres", 28, VERT_OK).move_to(P(0, -2.6))
        self.play(FadeIn(lit, scale=1.15), run_time=0.5)
        self.attendre_voix(marge=0.2)

        # ── 01 : le défi ────────────────────────────────────────────────────
        self.dire("01-defi")
        self.play(FadeOut(pou), FadeOut(lit), run_time=0.3)
        self.au_mot("Quel rayon")
        self.play(b.animate.move_to(P(0, 0.2)), run_time=0.5)
        ray = Line(b.centre, b.centre + P(0.85, 0), color=BASE_C, stroke_width=7).shift(UP * 1.4)
        self.play(Create(ray), run_time=0.5)
        self.au_mot("une fois gonflé")
        q = self.accroche("son rayon ?", fs=30, couleur=JAUNE_TITRE, y=-2.0)
        self.play(FadeIn(q, scale=1.15), run_time=0.45)
        self.attendre_voix(marge=0.25)

        # ── 02 : la question-pause (3 s) — réponse B ───────────────────────
        # ⛔ Les mots de la carte sont ABSENTS de la voix (« son », « rayon ») : la carte se pose
        #    juste après « Question ! », sans attendre un choix.
        self.ecran_question("02-question", "02b-reponse",
                            ["Son rayon ?"],
                            ["5 cm", "10 cm", "20 cm"], 1,
                            ["Ce ballon tient", ["4,2", "litres d'air."]],
                            x_col=0.0)

        # ── 03 : 20 cm de large, c'est une respiration ─────────────────────
        self.clear()
        self.margo_bas()
        self.dire("03-visuel")
        tit = self.grand("Une respiration", font_size=34, color=JAUNE_TITRE).move_to(P(0, 3.3))
        self.add(tit)
        b = ballon(0.95, P(0, 1.2))
        self.au_mot("Un ballon")
        self.play(FadeIn(b, scale=0.8), run_time=0.6)
        self.au_mot("20 centimètres")
        diam = Line(b.centre + P(-0.95, 0), b.centre + P(0.95, 0), color=BASE_C, stroke_width=7)
        d20 = self.t("20 cm de large", 26, BASE_C).move_to(P(0, -0.3))
        self.play(Create(diam), FadeIn(d20, shift=UP * 0.1), run_time=0.7)
        self.au_mot("c'est une respiration")
        pou = poumons(1.0, P(0, -1.6))
        resp = self.t("une respiration", 28, VERT_OK).move_to(P(0, -2.65))
        self.play(FadeIn(pou, scale=0.85), FadeIn(resp, scale=1.15), run_time=0.9)
        self.attendre_voix(marge=0.3)

        # ── 04 : la question en commentaire ────────────────────────────────
        self.clear()
        self.margo_bas()
        self.dire("04-commentaire")
        self.play(FadeIn(self.grand("À toi !", font_size=50, color=JAUNE_TITRE).move_to(P(0, 3.2))),
                  run_time=0.4)
        self.au_mot("un ballon")
        pb = ballon(0.55, P(0, 1.3))
        self.play(FadeIn(pb, scale=0.8), run_time=0.6)
        self.au_mot("5 centimètres")
        ray = Line(pb.centre, pb.centre + P(0.55, 0), color=BASE_C, stroke_width=6)
        r5 = self.t("rayon 5 cm", 30, BASE_C).move_to(P(0, -0.3))
        self.play(Create(ray), FadeIn(r5, scale=1.1), run_time=0.6)
        self.au_mot("Combien de litres")
        lq = self.t("combien de litres ?", 30, JAUNE_TITRE).move_to(P(0, -1.3))
        self.play(FadeIn(lq, scale=1.12), run_time=0.45)
        self.au_mot("Réponds en commentaire")
                # ⛔ Rien ne descend sous y = −3,0 dans un short : Ti-Margo occupe la bande basse
        #    Ses PIXELS s'arrêtent à y = −3,02 (sa boîte, elle, monte à −2,92 : elle a du
        #    vide en haut). Le commentaire fait 0,852 de haut, donc −2,45 ; une phrase
        #    seule fait 0,36, donc −2,65. ⛔ À −2,6 le commentaire TOUCHE encore.
        self.play(FadeIn(self.commentaire(y=-2.45)), run_time=0.4)
        self.attendre_voix(marge=0.3)

        # ── 05 ──────────────────────────────────────────────────────────────
        self.page_abonnement("05-abonne")
