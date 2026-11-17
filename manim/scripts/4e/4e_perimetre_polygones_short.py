# 4e_perimetre_polygones_short.py
# EleveAI — Maths 4e — SHORT de l'épisode P1 « le périmètre des polygones » (micro aire_perimetre_triangle).
# ⛔ EN MANIM, PAS EN DESSIN ANIMÉ (REGLES.md 09/11 ; Frédéric, 16/11), et avec un DÉFI.
# CEINTURE BLANCHE, 9:16. Le défi : la rampe triangulaire du skatepark, 8 m, 6 m, 10 m — combien
# de mètres de bordure ? Réponse C (24 m : on additionne les trois côtés).
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/4e/4e_perimetre_polygones_short.py ShortPerimetrePolygones4e
# ⛔ Contrôler le COMPTEUR sur le MP4 (barre de 3 s entière, dans la carte, rien par-dessus).

import math
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from volume_4e_short_commun import *  # noqa: E402,F403
from volume_4e_short_commun import Short4e, sans_audit, Y_ACCROCHE  # noqa: E402

TOUR_C = ORANGE_RETENUE
SOL_C, SOL_B = "#475569", "#94a3b8"


def triangle_cotes(a, b, c, u, o=ORIGIN, fond=SOL_C, bord=SOL_B, sw=4, op=0.45):
    """Un triangle de côtés a (la base), b (à gauche) et c (à droite) ; o = le milieu de la base.
    Attributs : .contour .A .B .C"""
    x = (a * a + b * b - c * c) / (2 * a)
    y = math.sqrt(max(0.0, b * b - x * x))
    A = o + P(-a * u / 2, 0)
    B = o + P(a * u / 2, 0)
    C = o + P(-a * u / 2 + x * u, y * u)
    t = Polygon(A, B, C, fill_color=fond, fill_opacity=op, stroke_color=bord, stroke_width=sw)
    t.contour = Polygon(A, B, C, stroke_color=TOUR_C, stroke_width=8, fill_opacity=0)
    t.A, t.B, t.C = A, B, C
    return t


class ShortPerimetrePolygones4e(Short4e):
    nom_voix = "4e-perimetre-polygones-short"
    fichier_marques = "4e_perimetre_polygones_short_marques.json"

    def construct(self):
        self.margo_bas()

        # ── 00 : la rampe triangulaire ─────────────────────────────────────
        self.dire("00-accroche")
        self.au_mot("Au coin du skatepark")
        tit = self.grand("Le triangle du skatepark", font_size=28, color=JAUNE_TITRE).move_to(P(0, 3.3))
        tr = triangle_cotes(8, 6, 10, 0.26, P(0, -0.5))
        self.play(FadeIn(tit), FadeIn(self.echelle_short()), FadeIn(tr, scale=0.9), run_time=0.8)
        e8 = sans_audit(self.t("8 m", 24, BASE_C)).next_to(tr, DOWN, buff=0.12)
        e6 = sans_audit(self.t("6 m", 24, BASE_C)).next_to(Line(tr.A, tr.C), LEFT, buff=0.1)
        # ⛔ next_to(…, RIGHT) sur l'hypoténuse sortait du cadre : l'étiquette se pose au MILIEU
        #    du côté, décalée vers l'extérieur.
        e10 = sans_audit(self.t("10 m", 24, BASE_C)).move_to((tr.B + tr.C) / 2 + P(0.42, 0.26))
        self.au_mot("8 mètres")
        self.play(FadeIn(e8), run_time=0.35)
        self.au_mot("6 mètres")
        self.play(FadeIn(e6), run_time=0.35)
        self.au_mot("10 mètres")
        self.play(FadeIn(e10), run_time=0.35)
        self.attendre_voix(marge=0.2)

        # ── 01 : le défi ────────────────────────────────────────────────────
        self.dire("01-defi")
        self.au_mot("une bordure tout autour")
        self.play(Create(tr.contour), run_time=1.0)
        self.au_mot("Combien de mètres")
        q = self.accroche("Combien de mètres ?", fs=28, couleur=JAUNE_TITRE, y=Y_ACCROCHE)
        self.play(FadeIn(q), run_time=0.45)
        self.attendre_voix(marge=0.25)

        # ── 02 : la question-pause (3 s) — réponse C ───────────────────────
        # ⛔ Un nombre par morceau, et aucun qui revienne plus loin dans la voix : « 8 » et « 6 »
        #    reviennent dans « 8 fois 6 », ils feraient attendre la ligne et arriver les autres en retard.
        self.ecran_question("02-question", "02b-reponse",
                            ["La bordure du triangle ?"],
                            ["48 m", "14 m", "24 m"], 2,
                            ["On additionne les trois côtés.", ["48 :", "une aire."],
                             ["14 :", "deux côtés oubliés."]],
                            x_col=0.0)

        # ── 03 : trois côtés, une addition ─────────────────────────────────
        self.clear()
        self.margo_bas()
        self.dire("03-visuel")
        tit = self.grand("Trois côtés", font_size=34, color=JAUNE_TITRE).move_to(P(0, 3.3))
        self.add(tit)
        tr2 = triangle_cotes(8, 6, 10, 0.26, P(0, 0.9))
        self.add(tr2, tr2.contour)
        self.add(sans_audit(self.t("8 m", 22, BASE_C)).next_to(tr2, DOWN, buff=0.1))
        self.add(sans_audit(self.t("6 m", 22, BASE_C)).next_to(Line(tr2.A, tr2.C), LEFT, buff=0.1))
        self.add(sans_audit(self.t("10 m", 22, BASE_C)).move_to((tr2.B + tr2.C) / 2 + P(0.4, 0.24)))
        self.au_mot("une addition")
        # (les trois côtés sont LUS sur la figure, la voix ne les redit pas : hors audit)
        calc = sans_audit(self.t("8 + 6 + 10", 34, BLEU_D)).move_to(P(0, -1.3))
        self.play(FadeIn(calc, shift=UP * 0.15), run_time=0.5)
        self.au_mot("24 mètres")
        res = self.grand("= 24 m", font_size=40, color=VERT_OK).move_to(P(0, -2.3))
        self.play(FadeIn(res, scale=1.2), run_time=0.5)
        self.attendre_voix(marge=0.3)

        # ── 04 : la question en commentaire ────────────────────────────────
        self.clear()
        # ⛔ Pas de margo_bas() sur CET écran : Ti-Margo occupe y ∈ [-3.85, -3.02]
        # et sa tête couvrait une lettre de « @eleveai974 » (17/11). Le gabarit le dit
        # lui-même : dans la bande basse il ne porte aucune information, il peut être
        # masqué sans rien coûter. Il reste présent sur l'écran d'abonnement.
        self.dire("04-commentaire")
        self.play(FadeIn(self.grand("À toi !", font_size=50, color=JAUNE_TITRE).move_to(P(0, 3.2))),
                  run_time=0.4)
        tr3 = triangle_cotes(12, 5, 13, 0.19, P(0, 0.4))
        self.au_mot("un triangle de 5 mètres")
        self.play(FadeIn(tr3, scale=0.9), Create(tr3.contour), run_time=0.8)
        a5 = self.t("5 m", 24, BASE_C).next_to(Line(tr3.A, tr3.C), LEFT, buff=0.1)
        self.play(FadeIn(a5), run_time=0.3)
        self.au_mot("12 mètres")
        a12 = self.t("12 m", 24, BASE_C).next_to(tr3, DOWN, buff=0.12)
        self.play(FadeIn(a12), run_time=0.3)
        self.au_mot("13 mètres")
        a13 = self.t("13 m", 24, BASE_C).move_to((tr3.B + tr3.C) / 2 + P(0.42, 0.26))
        self.play(FadeIn(a13), run_time=0.3)
        self.au_mot("Son périmètre")
        per = self.t("son périmètre ?", 28, TOUR_C).move_to(P(0, -1.8))
        self.play(FadeIn(per, scale=1.15), run_time=0.4)
        self.au_mot("Réponds en commentaire")
        self.play(FadeIn(self.commentaire(y=-2.9)), run_time=0.4)
        self.attendre_voix(marge=0.3)

        # ── 05 ──────────────────────────────────────────────────────────────
        self.page_abonnement("05-abonne")
