# 4e_aire_rectangle_carre.py
# EleveAI — Maths 4e — série « Périmètre, aire, volume, solides », épisode A1 : L'AIRE D'UN RECTANGLE
# ET D'UN CARRÉ (micros aire_rectangle et aire_carre, notion aire_surface), AVEC VOIX.
# Paysage 16:9, CEINTURE JAUNE.
# Décor et métier : Noé, RÉPARATEUR DE SMARTPHONES — le film de protection d'un écran
# (centres technologie-ia, argent-budget).
# Mapping micro → écrans : 02 (quadriller : 7 rangées de 14 carrés = 98), 03 (longueur × largeur),
# 04 (le carré : côté × côté), 06 (piège : des centimètres carrés, et même tour ≠ même surface),
# questions 05 (B : 105 cm²) et 07 (A : 81 cm²), défi 08 (210 cm² sur des feuilles de 150 :
# 2 feuilles, 24 €).
# Voix : manim/voix/4e-aire-rectangle-carre.json ; marques : 4e_aire_rectangle_carre_marques.json.
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/4e_aire_rectangle_carre.py AireRectangleCarre4e
# Sortie : manim/sorties/4e/maths/aire/26-aire-rectangle-carre/

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from volume_4e_commun import *  # noqa: E402,F403
from volume_4e_commun import noe, Paysage4e  # noqa: E402

AIRE_C, AIRE_B = "#38bdf8", "#0c4a6e"      # la surface
TOUR_C = ORANGE_RETENUE                     # le tour, quand on l'oppose à l'aire
FILM_C = "#a7f3d0"
BOITIER = "#1e293b"


def smartphone(l, h, u, o=ORIGIN, sw=4):
    """Un smartphone vu de face : le boîtier, et l'écran dedans. o = le centre.
    Attributs : .ecran .boitier"""
    L, H = l * u, h * u
    boit = RoundedRectangle(width=L * 1.18, height=H * 1.12, corner_radius=0.12 * u,
                            fill_color=BOITIER, fill_opacity=1, stroke_color="#64748b",
                            stroke_width=sw).move_to(o)
    ecr = Rectangle(width=L, height=H, fill_color=AIRE_C, fill_opacity=0.5, stroke_color=AIRE_B,
                    stroke_width=sw * 0.8).move_to(o)
    g = VGroup(boit, ecr)
    g.boitier, g.ecran, g.L, g.H, g.o = boit, ecr, L, H, o
    return g


def quadrillage(l, h, u, o=ORIGIN, couleur=AIRE_C, sw=1.5):
    """Le quadrillage en carrés de 1 unité : l × h petites cases. o = le centre du rectangle."""
    L, H = l * u, h * u
    g = VGroup()
    for i in range(l):
        for j in range(h):
            g.add(Square(side_length=u, fill_color=couleur, fill_opacity=0.35,
                         stroke_color=WHITE, stroke_width=sw)
                  .move_to(o + P(-L / 2 + (i + 0.5) * u, -H / 2 + (j + 0.5) * u)))
    return g


class AireRectangleCarre4e(Paysage4e):
    nom_voix = "4e-aire-rectangle-carre"
    fichier_marques = "4e_aire_rectangle_carre_marques.json"
    ceinture = "jaune"

    # ── 00 ──────────────────────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("L'aire d'un rectangle", self.identite, self.ceinture,
                                       y_ech=-2.45)
        self.au_mot("L'aire d'un rectangle")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q = self.bloc(["Combien de place", "prend une surface ?"], 38)
        q.move_to(P(0, 0.35)).align_to(P(-6.2, 0), LEFT)
        sp = smartphone(1.5, 2.6, 0.75, P(4.2, -0.4))
        self.au_mot("Combien de place")
        self.play(FadeIn(q[0], shift=UP * 0.2), FadeIn(sp, scale=0.85), run_time=0.5)
        self.au_mot("prend une surface")
        self.play(FadeIn(q[1], shift=UP * 0.2), Indicate(sp.ecran, color=AIRE_C, scale_factor=1.06),
                  run_time=0.7)
        self.attendre_voix(marge=0.6)

    # ── 01 ──────────────────────────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        p = noe(1.0).move_to(P(-5.2, 0.4))
        self.au_mot("Voici Noé")
        nom = self.t("Noé", 40, BLEU_CALCUL).next_to(p, UP, buff=0.25)
        self.play(FadeIn(p, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("Il répare des smartphones")
        met = self.t("réparateur", 24, BLEU_CALCUL).next_to(p, DOWN, buff=0.2)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.4)
        x = -2.8
        sp = smartphone(1.5, 2.6, 0.7, P(5.4, -0.3))   # ⛔ à 4.3 il mordait sur la colonne
        l1 = self.bloc(["Quand un écran est cassé,", "il découpe un film de protection"], 28, WHITE)
        self.col(l1, 2.0, x)
        self.au_mot("Quand un écran est cassé")
        self.play(FadeIn(l1[0], shift=UP * 0.1), FadeIn(sp, scale=0.9), run_time=0.8)
        self.au_mot("il découpe un film de protection")
        film = Rectangle(width=sp.L, height=sp.H, fill_color=FILM_C, fill_opacity=0.35,
                         stroke_color=FILM_C, stroke_width=4).move_to(sp.o)
        self.play(FadeIn(l1[1], shift=UP * 0.1), FadeIn(film, shift=DOWN * 0.3), run_time=0.8)
        l2 = self.t("à la bonne taille.", 30, FILM_C)
        self.col(l2, 0.9, x)
        self.au_mot("à la bonne taille")
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.4)
        l3 = self.t("Le film se vend au centimètre carré :", 28, WHITE)
        self.col(l3, 0.1, x)
        self.au_mot("Le film se vend au centimètre carré")
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.55)
        l4 = self.bloc(["il doit calculer la surface", "de l'écran."], 32, JAUNE_TITRE)
        self.col(l4, -1.1, x)
        self.au_mot("il doit calculer la surface")
        self.play(FadeIn(l4, shift=UP * 0.1), run_time=0.6)
        self.attendre_voix()

    # ── 02 : compter les carrés ─────────────────────────────────────────────
    def ecran_compter(self):
        self.ecran("02-compter")
        u = 0.3
        o = P(-3.4, 0.0)
        self.au_mot("L'écran mesure 14 centimètres")
        # ⛔ le titre redit « quadrille », prononcé 3 s plus tard : hors_audit, sinon tout l'écran
        #    attend ce mot-là et le reste part en retard.
        tit = hors_audit(self.t("On quadrille", 46, JAUNE_TITRE)).move_to(P(0, 3.15))
        rect = Rectangle(width=14 * u, height=7 * u, fill_color=AIRE_C, fill_opacity=0.4,
                         stroke_color=AIRE_B, stroke_width=5).move_to(o)
        self.play(Write(tit), FadeIn(rect, scale=0.9), run_time=0.5)
        c14 = hors_audit(sur_fond(self.t("14 cm", 24, BASE_C))).next_to(rect, DOWN, buff=0.12)
        c7 = hors_audit(sur_fond(self.t("7 cm", 24, BASE_C))).next_to(rect, LEFT, buff=0.12)
        self.play(FadeIn(c14), run_time=0.25)
        self.au_mot("sur 7.")
        self.play(FadeIn(c7), run_time=0.25)
        x = 1.6
        l1 = self.t("Noé le quadrille en carrés", 28, WHITE)
        self.col(l1, 2.0, x)
        q = quadrillage(14, 7, u, o)
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(q), run_time=0.7)
        # ⛔ « 1 » et « centimètre » séparés : ensemble, le 1 attendait « centimètre ».
        l1b = self.ligne([("de 1", WHITE), ("centimètre de côté.", WHITE)], 28, buff=0.14)
        self.col(l1b, 1.4, x)
        self.au_mot("de 1 centimètre")
        self.play(FadeIn(l1b[0], shift=UP * 0.1),
                  Indicate(q[0], color=JAUNE_TITRE, scale_factor=1.6), run_time=0.5)
        self.play(FadeIn(l1b[1], shift=UP * 0.1), run_time=0.3)
        l2 = self.ligne([("Sept rangées de", WHITE), ("14 carrés :", BASE_C)], 30, buff=0.16)
        self.col(l2, 0.5, x)
        self.au_mot("Sept rangées")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("de 14 carrés")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.4)
        l3 = self.t("98 carrés.", 40, VERT_OK)
        self.col(l3, -0.4, x)
        self.au_mot("98 carrés")
        self.play(FadeIn(l3, scale=1.2), run_time=0.5)
        l4 = self.ligne([("L'aire est de", WHITE), ("98 cm².", VERT_OK)], 32, buff=0.16)
        self.col(l4, -1.5, x)
        self.au_mot("L'aire est de")
        self.play(FadeIn(l4[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("98 centimètres carrés")
        self.play(FadeIn(l4[1], shift=UP * 0.1), run_time=0.4)
        self.insister(l4[1], 1.1, 0.25)
        self.attendre_voix()

    # ── 03 : la formule ─────────────────────────────────────────────────────
    def ecran_formule(self):
        self.ecran("03-formule")
        u = 0.32
        o = P(-4.0, 0.3)
        rect = Rectangle(width=14 * u, height=7 * u, fill_color=AIRE_C, fill_opacity=0.4,
                         stroke_color=AIRE_B, stroke_width=5).move_to(o)
        self.add(rect)
        self.au_mot("On n'a pas besoin de compter")
        tit = self.t("La formule", 46, JAUNE_TITRE).move_to(P(0, 3.15))
        l1 = self.t("à chaque fois.", 30, WHITE)
        x = 1.2
        self.col(l1, 2.0, x)
        self.play(Write(tit), FadeIn(l1, shift=UP * 0.1), run_time=0.7)
        cadre = RoundedRectangle(width=6.2, height=1.3, corner_radius=0.18, stroke_color=JAUNE_TITRE,
                                 stroke_width=5, fill_color="#082f49", fill_opacity=0.6)
        cadre.move_to(P(2.6, 0.9))
        f = self.ligne([("longueur", BASE_C), ("× largeur", BASE_C)], 36, buff=0.2)
        f.move_to(cadre.get_center())
        self.au_mot("Aire d'un rectangle")
        self.play(FadeIn(cadre), run_time=0.4)
        self.au_mot("longueur fois largeur")
        self.play(FadeIn(f, scale=1.1), run_time=0.6)
        l2 = self.ligne([("14", BLEU_D), ("× 7", BLEU_D), ("= 98 cm²", VERT_OK)], 38, buff=0.18)
        self.col(l2, -0.8, x)
        self.au_mot("14 fois 7")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.3)
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("98 centimètres carrés")
        self.play(FadeIn(l2[2], scale=1.2), run_time=0.5)
        self.insister(l2[2], 1.08, 0.25)
        self.attendre_voix()

    # ── 04 : le carré ───────────────────────────────────────────────────────
    def ecran_le_carre(self):
        self.ecran("04-le-carre")
        u = 0.45
        self.au_mot("Le carré est un rectangle")
        tit = self.t("Le carré", 46, JAUNE_TITRE).move_to(P(0, 3.15))
        ca = Square(side_length=9 * u * 0.55, fill_color=AIRE_C, fill_opacity=0.4,
                    stroke_color=AIRE_B, stroke_width=5).move_to(P(-4.2, 0.2))
        self.play(Write(tit), FadeIn(ca, scale=0.9), run_time=0.45)
        x = -0.8
        l1 = self.t("dont les côtés sont égaux.", 30, WHITE)
        self.col(l1, 2.0, x)
        self.au_mot("dont les côtés sont égaux")
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.3)
        l2 = self.ligne([("Son aire :", WHITE), ("côté × côté.", VERT_OK)], 34, buff=0.18)
        self.col(l2, 1.0, x)
        self.au_mot("Son aire")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.25)
        self.au_mot("côté fois côté")
        self.play(FadeIn(l2[1], scale=1.12), run_time=0.3)
        c9 = hors_audit(sur_fond(self.t("9 cm", 24, BASE_C))).next_to(ca, DOWN, buff=0.12)
        l3 = self.ligne([("Un carré de", WHITE), ("9 cm :", BASE_C)], 32, buff=0.16)
        self.col(l3, 0.0, x)
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.2)
        self.au_mot("9 centimètres")
        self.play(FadeIn(l3[1], shift=UP * 0.1), FadeIn(c9), run_time=0.3)
        # ⭐ « 9 × 9 » reste d'un seul tenant : la voix dit « 9 fois 9 » en trois dixièmes de
        #    seconde, trop vite pour deux morceaux (le second arrivait toujours en retard).
        l4 = self.ligne([("9 × 9", BLEU_D), ("= 81 cm²", VERT_OK)], 38, buff=0.2)
        self.col(l4, -1.1, x)
        self.au_mot("9 fois 9")
        self.play(FadeIn(l4[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("81 centimètres carrés")
        self.play(FadeIn(l4[1], scale=1.2), run_time=0.5)
        self.insister(l4[1], 1.08, 0.25)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (réponse B) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        u = 0.24
        o = P(-3.8, 1.3)
        rect = Rectangle(width=15 * u, height=7 * u, fill_color=AIRE_C, fill_opacity=0.4,
                         stroke_color=AIRE_B, stroke_width=5).move_to(o)
        cotes = VGroup(hors_audit(sur_fond(self.t("15 cm", 22, BASE_C))).next_to(rect, DOWN, buff=0.1),
                       hors_audit(sur_fond(self.t("7 cm", 22, BASE_C))).next_to(rect, LEFT, buff=0.1))

        def avant_q(sc):
            sc.play(FadeIn(rect), FadeIn(cotes), run_time=0.6)

        self.question_gauche("05-question", "05b-reponse",
                             ["L'aire de l'écran ?"],
                             [self.choix("44 cm²"), self.choix("105 cm²"), self.choix("22 cm²")], 1,
                             ["15 × 7 = 105 cm².", "44 : le périmètre.",
                              "22 : longueur plus largeur."],
                             -0.3,
                             couper={0: ("15", "× 7", "= 105 cm²."),
                                     1: ("44 :", "le périmètre."),
                                     2: ("22 :", "longueur plus largeur.")},
                             avant_q=avant_q)

    # ── 06 : le piège ───────────────────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege", 0.65)
        tit = self.t("Attention au piège !", 48, ORANGE_Q).move_to(P(0, 3.15))
        self.au_mot("Attention au piège")
        self.play(Write(tit), run_time=0.4)
        u = 0.3
        x = -0.9
        r1 = Rectangle(width=10 * u, height=4 * u, fill_color=AIRE_C, fill_opacity=0.4,
                       stroke_color=TOUR_C, stroke_width=7).move_to(P(-4.4, 0.9))
        r2 = Rectangle(width=7 * u, height=7 * u, fill_color=AIRE_C, fill_opacity=0.4,
                       stroke_color=TOUR_C, stroke_width=7).move_to(P(-4.4, -1.7))
        l1 = self.bloc(["L'aire se mesure en centimètres carrés,", "le tour en centimètres."],
                       28, ROUGE_ERREUR)
        self.col(l1, 2.0, x)
        self.au_mot("L'aire se mesure")
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.5)
        self.au_mot("le tour en centimètres")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.45)
        l2 = self.bloc(["Deux écrans de même tour", "peuvent avoir des surfaces différentes."],
                       28, VERT_OK)
        self.col(l2, 0.8, x)
        self.au_mot("Deux écrans de même tour")
        self.play(FadeIn(l2[0], shift=UP * 0.1), FadeIn(r1), FadeIn(r2), run_time=0.9)
        self.au_mot("peuvent avoir des surfaces différentes")
        aires = VGroup(hors_audit(self.t("40 cm²", 26, AIRE_C)).next_to(r1, RIGHT, buff=0.3),
                       hors_audit(self.t("49 cm²", 26, AIRE_C)).next_to(r2, RIGHT, buff=0.3))
        self.play(FadeIn(l2[1], shift=UP * 0.1), FadeIn(aires), run_time=0.9)
        tours = hors_audit(self.t("même tour : 28 cm", 26, TOUR_C)).move_to(P(-3.9, -3.1))
        self.play(FadeIn(tours), run_time=0.45)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (réponse A) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        u = 0.22
        ca = Square(side_length=9 * u, fill_color=AIRE_C, fill_opacity=0.4, stroke_color=AIRE_B,
                    stroke_width=5).move_to(P(-4.8, 1.3))
        e = hors_audit(sur_fond(self.t("côté 9 cm", 22, BASE_C))).next_to(ca, DOWN, buff=0.1)

        def avant_q(sc):
            sc.play(FadeIn(ca), FadeIn(e), run_time=0.6)

        self.question_gauche("07-question", "07b-reponse",
                             ["L'aire du carré ?"],
                             [self.choix("81 cm²"), self.choix("36 cm²"), self.choix("18 cm²")], 0,
                             ["9 × 9 = 81 cm².", "36 : le périmètre, 9 × 4."],
                             -0.3,
                             couper={0: ("9", "× 9", "= 81 cm²."),
                                     1: ("36 :", "le périmètre,", "9 × 4.")},
                             avant_q=avant_q)

    # ── 08 : le défi ────────────────────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        u = 0.28
        deux = VGroup(*[Rectangle(width=15 * u, height=7 * u, fill_color=AIRE_C, fill_opacity=0.4,
                                  stroke_color=AIRE_B, stroke_width=5).move_to(P(-4.2, y))
                        for y in (1.2, -0.9)])
        x = 0.6
        l0 = self.ligne([("Deux écrans de", WHITE), ("15 cm", BASE_C), ("sur 7.", BASE_C)],
                        30, buff=0.14)
        self.col(l0, 2.0, x)
        self.au_mot("deux écrans")
        self.play(FadeIn(l0[0], shift=UP * 0.1), FadeIn(deux), run_time=0.8)
        self.au_mot("15 centimètres")
        self.play(FadeIn(l0[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("sur 7.")
        self.play(FadeIn(l0[2], shift=UP * 0.1), run_time=0.3)
        l1 = self.ligne([("Le film : feuilles de", WHITE), ("150 cm²,", FILM_C)], 30, buff=0.16)
        self.col(l1, 1.0, x)
        self.au_mot("Le film se vend par feuilles")
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.4)
        self.au_mot("150 centimètres carrés")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.4)
        l2 = self.ligne([("à", WHITE), ("12 €", JAUNE_TITRE), ("la feuille.", JAUNE_TITRE)],
                        32, buff=0.14)
        self.col(l2, 0.1, x)
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.25)
        self.au_mot("12 euros")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.35)
        self.au_mot("la feuille")
        self.play(FadeIn(l2[2], shift=UP * 0.1), run_time=0.3)
        l3 = self.bloc(["Combien de feuilles,", "et combien ça coûte ?"], 32, JAUNE_TITRE)
        self.col(l3, -1.2, x)
        self.au_mot("Combien de feuilles")
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.7)
        self.pause_defi(y=-2.9)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        u = 0.2
        deux = VGroup(*[Rectangle(width=15 * u, height=7 * u, fill_color=AIRE_C, fill_opacity=0.4,
                                  stroke_color=AIRE_B, stroke_width=4).move_to(P(-5.0, y))
                        for y in (1.4, -0.3)])
        self.add(deux)
        x = -3.0
        l1 = self.ligne([("Un écran :", WHITE), ("15", BLEU_D), ("× 7", BLEU_D),
                         ("= 105 cm².", VERT_OK)], 30, buff=0.14)
        self.col(l1, 2.1, x)
        self.au_mot("Un écran")
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.35)
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.28)
        self.play(FadeIn(l1[2], shift=UP * 0.1), run_time=0.28)
        self.au_mot("105 centimètres carrés")
        self.play(FadeIn(l1[3], shift=UP * 0.1), run_time=0.35)
        l2 = self.ligne([("Deux écrans :", WHITE), ("105", BLEU_D), ("× 2", BLEU_D),
                         ("= 210 cm².", VERT_OK)], 30, buff=0.14)
        self.col(l2, 1.2, x)
        self.au_mot("Deux écrans")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.35)
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.28)
        self.play(FadeIn(l2[2], shift=UP * 0.1), run_time=0.28)
        self.au_mot("210 centimètres carrés")
        self.play(FadeIn(l2[3], shift=UP * 0.1), run_time=0.35)
        l3 = self.ligne([("Une feuille couvre", WHITE), ("150 :", FILM_C), ("il en faut 2.", VERT_OK)],
                        30, buff=0.14)
        self.col(l3, 0.3, x)
        self.au_mot("Une feuille couvre")
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("150 :")
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("il en faut 2")
        self.play(FadeIn(l3[2], shift=UP * 0.1), run_time=0.4)
        l4 = self.ligne([("Le prix :", JAUNE_TITRE), ("12", BLEU_D), ("× 2", BLEU_D),
                         ("= 24 €.", VERT_OK)], 34, buff=0.16)
        self.col(l4, -0.8, x)
        self.au_mot("Le prix")
        self.play(FadeIn(l4[0], shift=UP * 0.1), run_time=0.35)
        self.play(FadeIn(l4[1], shift=UP * 0.1), run_time=0.28)
        self.play(FadeIn(l4[2], shift=UP * 0.1), run_time=0.28)
        self.au_mot("24 euros")
        self.play(FadeIn(l4[3], scale=1.2), run_time=0.45)
        self.insister(l4[3], 1.1, 0.25)
        self.attendre_voix()

    # ── 09 ──────────────────────────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        fig = VGroup(Rectangle(width=2.0, height=1.0, fill_color=AIRE_C, fill_opacity=0.4,
                               stroke_color=AIRE_B, stroke_width=5),
                     Square(side_length=1.0, fill_color=AIRE_C, fill_opacity=0.4,
                            stroke_color=AIRE_B, stroke_width=5))
        fig.arrange(DOWN, buff=0.35)
        lignes = self.finale_gauche(fig, textes=[
            ("L'aire d'un rectangle", "est longueur fois largeur."),
            ("L'aire d'un carré", "est côté fois côté."),
            ("Une aire se mesure", "en unités carrées.")], fs=28)
        self.add(fig)
        self.au_mot("L'aire d'un rectangle")
        self.montrer_ligne(lignes[0], Indicate(fig[0], color=AIRE_C, scale_factor=1.06))
        self.au_mot("L'aire d'un carré")
        self.montrer_ligne(lignes[1], Indicate(fig[1], color=AIRE_C, scale_factor=1.08))
        self.au_mot("Une aire se mesure")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_compter()
        self.ecran_formule()
        self.ecran_le_carre()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")
