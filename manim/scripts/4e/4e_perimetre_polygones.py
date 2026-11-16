# 4e_perimetre_polygones.py
# EleveAI — Maths 4e — série « Périmètre, aire, volume, solides », épisode P1 : LE PÉRIMÈTRE DES POLYGONES
# (micros aire_perimetre_comprendre, _rectangle, _carre, _triangle ; notion aire_perimetre), AVEC VOIX.
# Paysage 16:9, CEINTURE JAUNE. Vidéo COMMUNE avec la 3e (micros comprendre et polygone) : `aussi`.
# Décor et métier : Nour, GÉOMÈTRE-TOPOGRAPHE — borner un skatepark (centres sport, technologie-ia).
# Mapping micro → écrans : 02 (le périmètre est la longueur du tour, l'intérieur ne compte pas),
# 03 (le rectangle : 20 + 12 + 20 + 12 = 64, et le raccourci (20 + 12) × 2), 04 (le carré : côté × 4 ;
# le triangle : la somme des trois côtés), 06 (piège : des mètres, jamais des mètres carrés),
# questions 05 (A : 34 m) et 07 (B : 28 m), défi 08 (64 − 3 = 61 m, × 25 € = 1 525 €).
# ⛔ Les milliers s'écrivent avec une ESPACE INSÉCABLE (U+00A0) : l'audit efface l'espace ordinaire
#    et l'espace fine, « 1 525 » deviendrait « 1525 », introuvable dans la voix (AUDIT-ABSENT).
# Voix : manim/voix/4e-perimetre-polygones.json ; marques : 4e_perimetre_polygones_marques.json.
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/4e_perimetre_polygones.py PerimetrePolygones4e
# Sortie : manim/sorties/4e/maths/perimetre/21-perimetre-polygones/

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from volume_4e_commun import *  # noqa: E402,F403
from volume_4e_commun import nour, Paysage4e  # noqa: E402

TOUR_C = ORANGE_RETENUE          # le tour (le périmètre), orange dans toute la série
SOL_C, SOL_B = "#475569", "#94a3b8"   # le terrain
AIRE_C = "#38bdf8"                # l'aire, quand on la montre pour l'opposer au tour


def terrain(l, h, u, o=ORIGIN, fond=SOL_C, bord=SOL_B, sw=5, op=0.45):
    """Un terrain rectangulaire (le skatepark) ; o = son CENTRE.
    Attributs : .contour (le tour, à repasser en orange) .sommets"""
    r = Rectangle(width=l * u, height=h * u, fill_color=fond, fill_opacity=op,
                  stroke_color=bord, stroke_width=sw).move_to(o)
    r.contour = Rectangle(width=l * u, height=h * u, stroke_color=TOUR_C, stroke_width=9).move_to(o)
    r.sommets = [r.get_corner(d) for d in (DL, DR, UR, UL)]
    r.u, r.l, r.h = u, l, h
    return r


def triangle_cotes(a, b, c, u, o=ORIGIN, fond=SOL_C, bord=SOL_B, sw=5, op=0.45):
    """Un triangle dont on connaît les trois côtés (a en bas), posé sur sa base ; o = milieu de la base.
    Attributs : .contour .A .B .C"""
    import math
    x = (a * a + b * b - c * c) / (2 * a)
    y = math.sqrt(max(0.0, b * b - x * x))
    A = o + P(-a * u / 2, 0)
    B = o + P(a * u / 2, 0)
    C = o + P(-a * u / 2 + x * u, y * u)
    t = Polygon(A, B, C, fill_color=fond, fill_opacity=op, stroke_color=bord, stroke_width=sw)
    t.contour = Polygon(A, B, C, stroke_color=TOUR_C, stroke_width=9, fill_opacity=0)
    t.A, t.B, t.C = A, B, C
    return t


class PerimetrePolygones4e(Paysage4e):
    nom_voix = "4e-perimetre-polygones"
    fichier_marques = "4e_perimetre_polygones_marques.json"
    ceinture = "jaune"

    # ── 00 ──────────────────────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Le périmètre", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Le périmètre")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q = self.bloc(["Combien mesure", "le tour d'une figure ?"], 38)
        q.move_to(P(0, 0.35)).align_to(P(-6.2, 0), LEFT)
        t = terrain(3.0, 1.9, 0.85, P(3.6, -0.6))
        self.au_mot("Combien mesure")
        self.play(FadeIn(q[0], shift=UP * 0.2), FadeIn(t, scale=0.85), run_time=0.5)
        self.au_mot("le tour d'une figure")
        self.play(FadeIn(q[1], shift=UP * 0.2), Create(t.contour), run_time=0.8)
        self.attendre_voix(marge=0.6)

    # ── 01 ──────────────────────────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        p = nour(1.0).move_to(P(-5.2, 0.4))
        self.au_mot("Voici Nour")
        nom = self.t("Nour", 40, BLEU_CALCUL).next_to(p, UP, buff=0.25)
        self.play(FadeIn(p, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("géomètre-topographe")
        met = self.t("géomètre", 24, BLEU_CALCUL).next_to(p, DOWN, buff=0.2)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.4)
        x = -2.8
        l1 = self.t("elle mesure les terrains.", 32, WHITE)
        self.col(l1, 2.0, x)
        self.au_mot("elle mesure les terrains")
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.45)
        t = terrain(2.8, 1.8, 0.8, P(5.0, -1.8))   # ⛔ plus à gauche, il mordait sur le texte
        l2 = self.t("La commune veut un skatepark.", 32, WHITE)
        self.col(l2, 1.1, x)
        self.au_mot("La commune veut un skatepark")
        self.play(FadeIn(l2, shift=UP * 0.1), FadeIn(t, scale=0.9), run_time=0.7)
        l3 = self.bloc(["Avant les travaux, Nour doit", "borner le terrain"], 30, WHITE)
        self.col(l3, 0.1, x)
        self.au_mot("Avant les travaux")
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.55)
        l4 = self.bloc(["et dire combien de mètres", "de barrière il faudra."], 32, TOUR_C)
        self.col(l4, -1.3, x)
        self.au_mot("et dire combien de mètres")
        self.play(FadeIn(l4, shift=UP * 0.1), Create(t.contour), run_time=0.9)
        self.attendre_voix()

    # ── 02 : le périmètre, c'est le tour ────────────────────────────────────
    def ecran_comprendre(self):
        self.ecran("02-comprendre")
        u = 0.95
        t = terrain(3.4, 2.2, u, P(-3.4, -0.6))
        self.add(t)
        self.au_mot("Le périmètre, c'est la longueur du tour")
        tit = self.t("La longueur du tour", 44, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), Create(t.contour), run_time=0.9)
        x = 0.9
        l1 = self.bloc(["Nour marche le long du bord,", "et elle additionne tout", "ce qu'elle parcourt."], 30, WHITE)
        self.col(l1, 1.9, x)
        self.au_mot("Nour marche le long du bord")
        d = Dot(t.sommets[0], radius=0.11, color=TOUR_C)
        self.add(d)
        self.play(FadeIn(l1, shift=UP * 0.1),
                  MoveAlongPath(d, t.contour.copy()), run_time=2.0)
        l2 = self.bloc(["Rien de ce qui est à l'intérieur", "ne compte."], 32, ROUGE_ERREUR)
        self.col(l2, -0.6, x)
        dedans = Rectangle(width=2.2 * u, height=1.2 * u, fill_color=AIRE_C, fill_opacity=0.3,
                           stroke_width=0).move_to(t.get_center())
        self.au_mot("Rien de ce qui est à l'intérieur")
        self.play(FadeIn(l2, shift=UP * 0.1), FadeIn(dedans), run_time=0.7)
        self.play(FadeOut(dedans), Indicate(t.contour, color=TOUR_C, scale_factor=1.03), run_time=0.7)
        self.attendre_voix()

    # ── 03 : le rectangle ───────────────────────────────────────────────────
    def ecran_rectangle(self):
        self.ecran("03-rectangle")
        u = 1.0
        t = terrain(3.0, 1.8, u, P(-3.9, 1.2))
        self.add(t, t.contour)
        self.au_mot("Le terrain est un rectangle")
        tit = self.t("Le rectangle", 44, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.45)
        c20 = hors_audit(sur_fond(self.t("20 m", 24, BASE_C))).next_to(t, DOWN, buff=0.1)
        c12 = hors_audit(sur_fond(self.t("12 m", 24, BASE_C))).next_to(t, RIGHT, buff=0.1)
        self.au_mot("de 20 mètres")
        self.play(FadeIn(c20), run_time=0.35)
        self.au_mot("sur 12")
        self.play(FadeIn(c12), run_time=0.35)
        x = 0.4
        l1 = self.ligne([("Le tour :", TOUR_C), ("20", BLEU_D), ("+ 12", BLEU_D), ("+ 20", BLEU_D),
                         ("+ 12", BLEU_D), ("= 64 m", VERT_OK)], 30, buff=0.14)
        self.col(l1, 1.6, x)
        self.au_mot("Le tour")
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.3)
        for k in range(1, 5):
            self.play(FadeIn(l1[k], shift=UP * 0.1), run_time=0.25)
        self.au_mot("64 mètres")
        self.play(FadeIn(l1[5], shift=UP * 0.1), run_time=0.35)
        l2 = self.t("Plus court :", 32, VERT_OK)
        self.col(l2, 0.4, x)
        self.au_mot("Plus court")
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.35)
        l3 = self.ligne([("20", BLEU_D), ("+ 12", BLEU_D), ("= 32", BLEU_D), ("× 2", BLEU_D),
                         ("= 64 m", VERT_OK)], 34, buff=0.16)
        self.col(l3, -0.6, x)
        for k in range(4):
            self.play(FadeIn(l3[k], shift=UP * 0.1), run_time=0.25)
        self.play(FadeIn(l3[4], scale=1.15), run_time=0.35)
        self.insister(l3[4], 1.08, 0.25)
        self.attendre_voix()

    # ── 04 : le carré et le triangle ────────────────────────────────────────
    def ecran_carre_triangle(self):
        self.ecran("04-carre-triangle")
        u = 1.0
        self.au_mot("Si la figure est un carré")
        tit = self.t("Le carré et le triangle", 44, JAUNE_TITRE).move_to(P(0, 3.15))
        ca = terrain(1.8, 1.8, u, P(-4.4, 1.0))
        self.play(Write(tit), FadeIn(ca, scale=0.9), Create(ca.contour), run_time=0.9)
        x = -1.9
        l1 = self.t("les quatre côtés sont égaux :", 30, WHITE)
        self.col(l1, 1.9, x)
        self.au_mot("les quatre côtés sont égaux")
        marques = VGroup(*[Line(ORIGIN, RIGHT * 0.18).rotate(a).set_stroke(TOUR_C, 6)
                           for a in (0, PI / 2, 0, PI / 2)])
        for m, s in zip(marques, (ca.get_bottom(), ca.get_right(), ca.get_top(), ca.get_left())):
            m.move_to(s)
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(marques), run_time=0.6)
        l2 = self.t("côté × 4.", 40, VERT_OK)
        self.col(l2, 1.0, x)
        self.au_mot("côté fois 4")
        self.play(FadeIn(l2, scale=1.15), run_time=0.5)
        tr = triangle_cotes(2.0, 1.6, 1.4, u, P(-4.2, -2.4))
        l3 = self.bloc(["Si c'est un triangle,", "on additionne ses trois côtés,"], 30, WHITE)
        self.col(l3, -0.2, x)
        self.au_mot("Si c'est un triangle")
        self.play(FadeIn(l3[0], shift=UP * 0.1), FadeIn(tr, scale=0.9), run_time=0.7)
        self.au_mot("on additionne ses trois côtés")
        self.play(FadeIn(l3[1], shift=UP * 0.1), Create(tr.contour), run_time=0.8)
        l4 = self.t("et il n'y a pas de raccourci.", 32, ORANGE_Q)
        self.col(l4, -1.6, x)
        self.au_mot("et il n'y a pas de raccourci")
        self.play(FadeIn(l4, shift=UP * 0.1), run_time=0.5)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (réponse A) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        u = 0.85
        t = terrain(2.6, 1.3, u, P(-4.4, 1.3))
        cotes = VGroup(
            hors_audit(sur_fond(self.t("12 m", 22, BASE_C))).next_to(t, DOWN, buff=0.08),
            hors_audit(sur_fond(self.t("5 m", 22, BASE_C))).next_to(t, RIGHT, buff=0.08))

        def avant_q(sc):
            sc.play(FadeIn(t), Create(t.contour), FadeIn(cotes), run_time=0.6)

        self.question_gauche("05-question", "05b-reponse",
                             ["Le périmètre ?"],
                             [self.choix("34 m"), self.choix("60 m"), self.choix("17 m")], 0,
                             ["12 + 5 = 17, × 2 = 34 m.", "60 : c'est l'aire.",
                              "17 : le tour n'est pas fini."],
                             -0.3,
                             couper={0: ("12", "+ 5", "= 17,", "× 2", "= 34 m."),
                                     1: ("60 :", "c'est l'aire."),
                                     2: ("17 :", "le tour n'est pas fini.")},
                             avant_q=avant_q)

    # ── 06 : le piège ───────────────────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege", 0.65)
        tit = self.t("Attention au piège !", 48, ORANGE_Q).move_to(P(0, 3.15))
        self.au_mot("Attention au piège")
        self.play(Write(tit), run_time=0.4)
        x = -1.4
        u = 0.9
        t = terrain(2.6, 1.6, u, P(-4.2, 0.2))
        self.add(t)
        l1 = self.bloc(["Un périmètre se mesure en mètres,", "jamais en mètres carrés."], 30, ROUGE_ERREUR)
        self.col(l1, 2.0, x)
        self.au_mot("Un périmètre se mesure en mètres")
        self.play(FadeIn(l1[0], shift=UP * 0.1), Create(t.contour), run_time=0.8)
        self.au_mot("jamais en mètres carrés")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.45)
        l2 = self.t("Le mètre carré, c'est pour la surface.", 30, AIRE_C)
        self.col(l2, 0.8, x)
        dedans = Rectangle(width=2.6 * u, height=1.6 * u, fill_color=AIRE_C, fill_opacity=0.35,
                           stroke_width=0).move_to(t.get_center())
        self.au_mot("Le mètre carré, c'est pour la surface")
        self.play(FadeIn(l2, shift=UP * 0.1), FadeIn(dedans), run_time=0.7)
        l3 = self.bloc(["Si ta réponse est en mètres carrés,", "tu as calculé autre chose."], 32, VERT_OK)
        self.col(l3, -0.5, x)
        self.au_mot("Si ta réponse est en mètres carrés")
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.7)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (réponse B) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        u = 0.85
        ca = terrain(1.9, 1.9, u, P(-4.5, 1.3))
        cote = hors_audit(sur_fond(self.t("7 m", 22, BASE_C))).next_to(ca, DOWN, buff=0.08)

        def avant_q(sc):
            sc.play(FadeIn(ca), Create(ca.contour), FadeIn(cote), run_time=0.6)

        self.question_gauche("07-question", "07b-reponse",
                             ["Le périmètre du carré ?"],
                             [self.choix("49 m"), self.choix("28 m"), self.choix("14 m")], 1,
                             ["7 × 4 = 28 m.", "49 = 7 × 7 : c'est l'aire.",
                              "14 : seulement deux côtés."],
                             -0.3,
                             couper={0: ("7", "× 4", "= 28 m."),
                                     1: ("49", "= 7", "× 7 :", "c'est l'aire."),
                                     2: ("14 :", "seulement deux côtés.")},
                             avant_q=avant_q)

    # ── 08 : le défi ────────────────────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        u = 0.95
        t = terrain(3.0, 1.9, u, P(-4.0, 0.3))
        x = 0.9
        l0 = self.ligne([("Le skatepark :", WHITE), ("20 m", BASE_C), ("sur 12 m.", BASE_C)], 30, buff=0.14)
        self.col(l0, 2.0, x)
        self.au_mot("Le skatepark est un rectangle")
        self.play(FadeIn(l0[0], shift=UP * 0.1), FadeIn(t, scale=0.9), Create(t.contour), run_time=0.9)
        self.au_mot("de 20 mètres")
        self.play(FadeIn(l0[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("sur 12")
        self.play(FadeIn(l0[2], shift=UP * 0.1), run_time=0.3)
        entree = Line(t.get_corner(DL) + RIGHT * 0.9, t.get_corner(DL) + RIGHT * 1.5).set_stroke(
            "#0f172a", 11)
        l1 = self.ligne([("Barrière tout autour,", TOUR_C), ("sauf une entrée de 3 m.", ROUGE_ERREUR)],
                        30, buff=0.14)
        self.col(l1, 1.0, x)
        self.au_mot("Nour pose une barrière tout autour")
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.4)
        self.au_mot("sauf une entrée de 3 mètres")
        self.play(FadeIn(l1[1], shift=UP * 0.1), Create(entree), run_time=0.6)
        # ⛔ « Elle coûte » attendait le « elle » de « va-t-elle coûter », tout à la fin de la voix :
        #    un mot de 4 lettres qui revient plus loin décale TOUT l'écran. Et « 25 » et « mètre »
        #    se séparent, sinon le 25 attend « le mètre » et s'écrit 3 s trop tard.
        l2 = self.ligne([("Prix :", WHITE), ("25 €", JAUNE_TITRE), ("le mètre.", JAUNE_TITRE)],
                        32, buff=0.16)
        self.col(l2, -0.1, x)
        self.au_mot("coûte 25 euros")
        self.play(FadeIn(l2[0], shift=UP * 0.1), FadeIn(l2[1], shift=UP * 0.1), run_time=0.4)
        self.au_mot("le mètre")
        self.play(FadeIn(l2[2], shift=UP * 0.1), run_time=0.3)
        l3 = self.t("Combien va-t-elle coûter ?", 34, JAUNE_TITRE)
        self.col(l3, -1.3, x)
        self.au_mot("Combien va-t-elle coûter")
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.5)
        self.pause_defi(y=-2.9)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        u = 0.8
        t = terrain(3.0, 1.9, u, P(-4.4, 1.1))
        self.add(t, t.contour)
        x = -1.1
        l1 = self.ligne([("Le tour :", TOUR_C), ("20", BLEU_D), ("+ 12", BLEU_D), ("= 32", BLEU_D),
                         ("× 2", BLEU_D), ("= 64 m", VERT_OK)], 30, buff=0.14)
        self.col(l1, 2.1, x)
        self.au_mot("Le tour")
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.3)
        for k in range(1, 5):
            self.play(FadeIn(l1[k], shift=UP * 0.1), run_time=0.25)
        self.au_mot("64 mètres")
        self.play(FadeIn(l1[5], shift=UP * 0.1), run_time=0.35)
        l2 = self.ligne([("Moins l'entrée :", WHITE), ("64", BLEU_D), ("− 3", BLEU_D),
                         ("= 61 m", VERT_OK)], 30, buff=0.16)
        self.col(l2, 1.1, x)
        self.au_mot("Moins l'entrée")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.35)
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.25)
        self.play(FadeIn(l2[2], shift=UP * 0.1), run_time=0.25)
        self.au_mot("61 mètres de barrière")
        self.play(FadeIn(l2[3], shift=UP * 0.1), run_time=0.35)
        l3 = self.ligne([("Le prix :", JAUNE_TITRE), ("61", BLEU_D), ("× 25", BLEU_D),
                         ("= 1 525 €", VERT_OK)], 34, buff=0.16)
        self.col(l3, -0.2, x)
        self.au_mot("Le prix")
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.35)
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.25)
        self.play(FadeIn(l3[2], shift=UP * 0.1), run_time=0.25)
        self.au_mot("1 525 euros")
        self.play(FadeIn(l3[3], scale=1.2), run_time=0.45)
        self.insister(l3[3], 1.1, 0.25)
        self.attendre_voix()

    # ── 09 ──────────────────────────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        fig = terrain(2.0, 1.3, 0.85, ORIGIN)
        fig.add(fig.contour)
        lignes = self.finale_gauche(fig, textes=[
            ("Le périmètre", "est la longueur du tour."),
            ("Rectangle : longueur plus largeur,", "fois 2. Carré : côté fois 4."),
            ("Triangle : on additionne", "les trois côtés.")], fs=28)
        self.add(fig)
        self.au_mot("Le périmètre est la longueur du tour")
        self.montrer_ligne(lignes[0], Indicate(fig.contour, color=TOUR_C, scale_factor=1.05))
        self.au_mot("Pour un rectangle")
        self.montrer_ligne(lignes[1])
        self.au_mot("Pour un triangle")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_comprendre()
        self.ecran_rectangle()
        self.ecran_carre_triangle()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")
