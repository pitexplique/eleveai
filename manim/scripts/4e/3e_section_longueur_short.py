# 3e_section_longueur_short.py
# EleveAI — Maths 3e — SHORT de l'épisode T7 « calculer une longueur dans une section »
# (micro 3e section_calculer_longueur).
# ⛔ EN MANIM, PAS EN DESSIN ANIMÉ (REGLES.md 09/11 ; Frédéric, 16/11), et avec un DÉFI.
# CEINTURE BLANCHE, 9:16. Le défi : un cube de 6 cm d'arête, la diagonale d'une face — combien
# mesure-t-elle ? Réponse B (√72 ≈ 8,5 cm ; 12, c'est 6 + 6, et on n'additionne pas les côtés).
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/4e/3e_section_longueur_short.py ShortSectionLongueur3e
# ⛔ Contrôler le COMPTEUR sur le MP4 (barre de 3 s entière, dans la carte, rien par-dessus).

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from volume_4e_short_commun import *  # noqa: E402,F403
from volume_4e_short_commun import Short4e, sans_audit, Y_ACCROCHE  # noqa: E402
from volume_4e_commun import pave  # noqa: E402

HYPO_C = "#f472b6"
FACE_C = "#22d3ee"


def face_carree(c, o=ORIGIN, sw=4):
    """Une face carrée vue à plat, avec sa diagonale et l'angle droit.
    Attributs : .carre .diag .cote_a .cote_b .angle"""
    s = Square(c, fill_color=FACE_C, fill_opacity=0.25, stroke_color=FACE_C,
               stroke_width=sw).move_to(o)
    A, B, C = s.get_corner(DL), s.get_corner(DR), s.get_corner(UR)
    g = VGroup(s)
    g.carre = s
    g.diag = Line(A, C, color=HYPO_C, stroke_width=sw + 2)
    g.cote_a = Line(A, B, color=BASE_C, stroke_width=sw + 2)
    g.cote_b = Line(B, C, color=HAUTEUR_C, stroke_width=sw + 2)
    g.angle = equerre(B, LEFT, UP, 0.16, WHITE)
    g.A, g.B, g.C = A, B, C
    return g


class ShortSectionLongueur3e(Short4e):
    nom_voix = "3e-section-longueur-short"
    fichier_marques = "3e_section_longueur_short_marques.json"

    def construct(self):
        self.margo_bas()

        # ── 00 : le cube et la diagonale d'une face ────────────────────────
        self.dire("00-accroche")
        self.ouverture("La diagonale d'une face", fs=28)
        cb = pave(1.3, 1.3, 1.3, 0.75, P(-0.9, -0.6))
        self.add(cb)
        self.au_mot("6 centimètres d'arête")
        ar = Line(cb.pt(0, 0, 0), cb.pt(1.3, 0, 0)).set_stroke(BASE_C, 6)
        e6 = sans_audit(self.t("6 cm", 24, BASE_C)).next_to(ar, DOWN, buff=0.12)
        self.play(Create(ar), FadeIn(e6), run_time=0.6)
        self.au_mot("la diagonale d'une de ses faces")
        diag = Line(cb.pt(0, 0, 0), cb.pt(1.3, 0, 1.3), color=HYPO_C, stroke_width=7)
        self.play(Create(diag), run_time=0.8)
        self.attendre_voix(marge=0.2)

        # ── 01 : le défi ────────────────────────────────────────────────────
        self.dire("01-defi")
        self.au_mot("Combien mesure")
        fc = face_carree(1.5, P(0, -2.2))
        self.play(FadeIn(fc, scale=0.85), run_time=0.6)
        self.au_mot("cette diagonale")
        q = self.accroche("cette diagonale ?", fs=28, couleur=JAUNE_TITRE, y=-0.6)
        self.play(Create(fc.diag), FadeIn(q, scale=1.1), run_time=0.9)
        self.attendre_voix(marge=0.25)

        # ── 02 : la question-pause (3 s) — réponse B ───────────────────────
        # ⛔ Le mot de la carte (« diagonale ») est ABSENT de la voix : elle se pose juste après
        #    « Question ! », sans attendre un choix.
        self.ecran_question("02-question", "02b-reponse",
                            ["La diagonale ?"],
                            ["12 cm", "environ 8,5 cm", "6 cm"], 1,
                            [["√72", "≈ 8,5 cm."], ["12,", "c'est 6 + 6."]],
                            x_col=0.0)

        # ── 03 : la diagonale dépasse toujours le côté ─────────────────────
        self.clear()
        self.margo_bas()
        self.dire("03-visuel")
        tit = self.grand("Toujours plus longue", font_size=30, color=JAUNE_TITRE).move_to(P(0, 3.3))
        self.add(tit)
        self.au_mot("La face est un carré")
        fc = face_carree(1.7, P(0, 0.9))
        self.play(FadeIn(fc, scale=0.85), Create(fc.cote_a), run_time=0.9)
        self.au_mot("sa diagonale dépasse")
        self.play(Create(fc.diag), FadeIn(fc.angle), run_time=0.8)
        # ⭐ Les deux longueurs mises bout à bout : la diagonale dépasse, et ça se voit.
        cmp = VGroup(Line(ORIGIN, RIGHT * 1.7).set_stroke(BASE_C, 9),
                     Line(ORIGIN, RIGHT * 1.7 * 1.414).set_stroke(HYPO_C, 9))
        cmp.arrange(DOWN, buff=0.38, aligned_edge=LEFT).move_to(P(0, -1.8))
        self.au_mot("toujours son côté")
        self.play(FadeIn(cmp), run_time=0.8)
        self.attendre_voix(marge=0.3)

        # ── 04 : la question en commentaire ────────────────────────────────
        self.clear()
        self.margo_bas()
        self.dire("04-commentaire")
        self.play(FadeIn(self.grand("À toi !", font_size=50, color=JAUNE_TITRE).move_to(P(0, 3.2))),
                  run_time=0.4)
        fc = face_carree(1.8, P(0, 0.8))
        self.play(FadeIn(fc, scale=0.85), run_time=0.6)
        self.au_mot("10 centimètres de côté")
        c10 = self.t("côté 10 cm", 30, BASE_C).move_to(P(0, -0.9))
        self.play(Create(fc.cote_a), FadeIn(c10, scale=1.1), run_time=0.8)
        self.au_mot("Combien mesure sa diagonale")
        dq = self.t("diagonale = ?", 30, HYPO_C).move_to(P(0, -1.8))
        self.play(Create(fc.diag), FadeIn(dq, scale=1.1), run_time=0.9)
        self.au_mot("Réponds en commentaire")
                # ⛔ Rien ne descend sous y = −3,0 dans un short : Ti-Margo occupe la bande basse
        #    Ses PIXELS s'arrêtent à y = −3,02 (sa boîte, elle, monte à −2,92 : elle a du
        #    vide en haut). Le commentaire fait 0,852 de haut, donc −2,45 ; une phrase
        #    seule fait 0,36, donc −2,65. ⛔ À −2,6 le commentaire TOUCHE encore.
        self.play(FadeIn(self.commentaire(y=-2.45)), run_time=0.4)
        self.attendre_voix(marge=0.3)

        # ── 05 ──────────────────────────────────────────────────────────────
        self.page_abonnement("05-abonne")
