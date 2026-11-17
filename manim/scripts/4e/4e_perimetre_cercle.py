# 4e_perimetre_cercle.py
# EleveAI — Maths 4e — série « Périmètre, aire, volume, solides », épisode P2 : LA LONGUEUR D'UN CERCLE
# (nourrit la 4e `aire_perimetre_figure` ; micro 3e `aire_perimetre_cercle`), AVEC VOIX.
# Paysage 16:9, CEINTURE VERTE. Vidéo COMMUNE avec la 3e : à brancher par `aussi`.
# Décor et métier : Marc, PISCINISTE — la margelle d'un bassin rond (centres nature-ecologie, argent-budget).
# Mapping micro → écrans : 02 (la ficelle : le tour fait un peu plus de trois diamètres, c'est π),
# 03 (la formule : π × diamètre, ou 2 × π × rayon), 04 (le bassin de 4 m : 4π ≈ 12,6 m),
# 06 (piège : rayon ou diamètre), questions 05 (B : 6π m) et 07 (C : 5π m),
# défi 08 (rayon 3 + 1 = 4 m, 2 × π × 4 = 8π ≈ 25,1 m, × 40 € ≈ 1 005 €).
# ⛔ Les milliers s'écrivent avec une ESPACE INSÉCABLE (U+00A0) : sinon l'audit lit « 1005 ».
# Voix : manim/voix/4e-perimetre-cercle.json ; marques : 4e_perimetre_cercle_marques.json.
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/4e_perimetre_cercle.py PerimetreCercle4e
# Sortie : manim/sorties/4e/maths/perimetre/22-perimetre-cercle/

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from volume_4e_commun import *  # noqa: E402,F403
from volume_4e_commun import cercle, marc, Paysage4e, CERCLE_C  # noqa: E402

TOUR_C = ORANGE_RETENUE
EAU_C, EAU_B = "#38bdf8", "#0c4a6e"
MARGELLE_C = "#d6b98c"


def bassin(r, u, o=ORIGIN, sw=6):
    """Un bassin rond vu de dessus : l'eau, et la margelle (l'anneau) autour.
    Attributs : .eau .margelle .centre .r"""
    eau = Circle(radius=r * u, fill_color=EAU_C, fill_opacity=0.55, stroke_color=EAU_B,
                 stroke_width=sw * 0.6).move_to(o)
    marg = Annulus(inner_radius=r * u, outer_radius=r * u * 1.14, fill_color=MARGELLE_C,
                   fill_opacity=0.95, stroke_width=0).move_to(o)
    g = VGroup(eau, marg)
    g.eau, g.margelle, g.centre, g.r, g.u = eau, marg, o, r, u
    return g


def ficelle(r, u, o=ORIGIN, couleur=TOUR_C, sw=8):
    """La ficelle : le cercle à enrouler, et le segment déroulé de même longueur (2πr)."""
    c = Circle(radius=r * u, color=couleur, stroke_width=sw).move_to(o)
    droit = Line(ORIGIN, RIGHT * 2 * PI * r * u).set_stroke(couleur, sw)
    return c, droit


class PerimetreCercle4e(Paysage4e):
    nom_voix = "4e-perimetre-cercle"
    fichier_marques = "4e_perimetre_cercle_marques.json"
    ceinture = "verte"

    # ── 00 ──────────────────────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("La longueur d'un cercle", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("La longueur d'un cercle")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q = self.bloc(["Combien mesure", "le tour d'un rond ?"], 38)
        q.move_to(P(0, 0.35)).align_to(P(-6.2, 0), LEFT)
        b = bassin(1.1, 1.0, P(3.8, -0.5))
        self.au_mot("Combien mesure")
        self.play(FadeIn(q[0], shift=UP * 0.2), FadeIn(b, scale=0.85), run_time=0.5)
        self.au_mot("le tour d'un rond")
        tour = Circle(radius=1.25, color=TOUR_C, stroke_width=9).move_to(P(3.8, -0.5))
        self.play(FadeIn(q[1], shift=UP * 0.2), Create(tour), run_time=0.9)
        self.attendre_voix(marge=0.6)

    # ── 01 ──────────────────────────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        p = marc(1.0).move_to(P(-5.2, 0.4))
        self.au_mot("Voici Marc")
        nom = self.t("Marc", 40, BLEU_CALCUL).next_to(p, UP, buff=0.25)
        self.play(FadeIn(p, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("Il installe des piscines")
        met = self.t("pisciniste", 24, BLEU_CALCUL).next_to(p, DOWN, buff=0.2)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.4)
        x = -2.8
        b = bassin(1.25, 1.0, P(4.0, -1.1))
        l1 = self.bloc(["Autour d'un bassin rond,", "il pose la margelle :"], 30, WHITE)
        self.col(l1, 2.0, x)
        self.au_mot("Autour d'un bassin rond")
        self.play(FadeIn(l1[0], shift=UP * 0.1), FadeIn(b.eau, scale=0.9), run_time=0.7)
        self.au_mot("il pose la margelle")
        self.play(FadeIn(l1[1], shift=UP * 0.1), FadeIn(b.margelle), run_time=0.7)
        l2 = self.t("la bordure sur laquelle on s'assoit.", 30, MARGELLE_C)
        self.col(l2, 0.9, x)
        self.au_mot("la bordure sur laquelle on s'assoit")
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.55)
        l3 = self.t("Elle se vend au mètre.", 32, WHITE)
        self.col(l3, -0.1, x)
        self.au_mot("Elle se vend au mètre")
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.5)
        l4 = self.bloc(["Combien de mètres", "faut-il commander ?"], 32, JAUNE_TITRE)
        self.col(l4, -1.4, x)
        self.au_mot("Combien de mètres")
        self.play(FadeIn(l4, shift=UP * 0.1), run_time=0.6)
        self.attendre_voix()

    # ── 02 : la ficelle et le nombre pi ─────────────────────────────────────
    def ecran_pi(self):
        self.ecran("02-le-nombre-pi")
        u = 1.0
        r = 0.7
        o = P(-4.6, 1.3)
        b = bassin(r, u, o)
        self.add(b)
        self.au_mot("Marc enroule une ficelle autour du bassin")
        tit = self.t("La ficelle", 46, JAUNE_TITRE).move_to(P(0, 3.15))
        c, droit = ficelle(r, u, o)
        self.play(Write(tit), Create(c), run_time=1.0)
        droit.move_to(P(-1.0, -0.4)).align_to(P(-6.2, 0), LEFT)
        self.au_mot("puis il la déroule")
        self.play(ReplacementTransform(c, droit), run_time=1.0)
        # les trois diamètres posés sous la ficelle déroulée
        d = 2 * r * u
        g = droit.get_left()
        # ⭐ Trois diamètres bout à bout font UNE ligne à l'œil : on les sépare par des barres et
        #    on alterne les teintes, sinon l'élève ne peut pas les compter.
        teintes = (BASE_C, "#7dd3fc", BASE_C)
        diam = VGroup()
        for k in range(3):
            a = g + RIGHT * k * d + DOWN * 0.45
            b = g + RIGHT * (k + 1) * d + DOWN * 0.45
            diam.add(VGroup(Line(a, b).set_stroke(teintes[k], 9),
                            Line(a + DOWN * 0.13, a + UP * 0.13).set_stroke(WHITE, 4),
                            Line(b + DOWN * 0.13, b + UP * 0.13).set_stroke(WHITE, 4)))
        reste = Line(g + RIGHT * 3 * d + DOWN * 0.45,
                     g + RIGHT * 2 * PI * r * u + DOWN * 0.45).set_stroke(ROUGE_ERREUR, 9)
        x = 0.6
        l1 = self.bloc(["Le tour fait un peu plus", "de trois fois le diamètre."], 30, BASE_C)
        self.col(l1, 2.0, x)
        self.au_mot("Le tour fait un peu plus")
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.45)
        self.au_mot("de trois fois le diamètre")
        self.play(FadeIn(l1[1], shift=UP * 0.1),
                  LaggedStart(*[Create(s) for s in diam], lag_ratio=0.3), run_time=1.1)
        self.play(Create(reste), run_time=0.4)
        l2 = self.ligne([("Un peu plus de trois :", WHITE), ("c'est π,", JAUNE_TITRE)], 32, buff=0.18)
        self.col(l2, 0.8, x)
        self.au_mot("Un peu plus de trois")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.4)
        self.au_mot("c'est pi")
        self.play(FadeIn(l2[1], scale=1.2), run_time=0.45)
        l3 = self.t("environ 3,14.", 40, VERT_OK)
        self.col(l3, -0.2, x)
        self.au_mot("environ 3,14")
        self.play(FadeIn(l3, scale=1.15), run_time=0.5)
        self.insister(l3, 1.08, 0.25)
        l4 = self.bloc(["Ce nombre est le même pour", "tous les cercles du monde."], 30, WHITE)
        self.col(l4, -1.6, x)
        self.au_mot("Ce nombre est le même")
        self.play(FadeIn(l4, shift=UP * 0.1), run_time=0.6)
        self.attendre_voix()

    # ── 03 : la formule ─────────────────────────────────────────────────────
    def ecran_formule(self):
        self.ecran("03-formule")
        u = 1.0
        o = P(-4.4, 0.2)
        c = cercle(1.2, u, o)
        self.add(c)
        self.au_mot("La longueur d'un cercle")
        tit = self.t("La formule", 46, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.45)
        cadre = RoundedRectangle(width=6.4, height=1.4, corner_radius=0.2, stroke_color=JAUNE_TITRE,
                                 stroke_width=5, fill_color="#052e16", fill_opacity=0.5).move_to(P(2.2, 1.4))
        f = self.ligne([("π", JAUNE_TITRE), ("× diamètre", BASE_C)], 40, buff=0.2)
        f.move_to(cadre.get_center())
        self.au_mot("pi fois le diamètre")
        self.play(FadeIn(cadre), Create(c.diam_trait), run_time=0.5)
        self.play(FadeIn(f, scale=1.1), run_time=0.5)
        x = 0.0
        l1 = self.bloc(["Et comme le diamètre", "vaut deux rayons,"], 30, WHITE)
        self.col(l1, -0.1, x)
        self.au_mot("Et comme le diamètre vaut deux rayons")
        self.play(FadeIn(l1, shift=UP * 0.1), Create(c.rayon_trait), run_time=0.7)
        cadre2 = RoundedRectangle(width=6.4, height=1.4, corner_radius=0.2, stroke_color=VERT_OK,
                                  stroke_width=5, fill_color="#052e16", fill_opacity=0.5).move_to(P(2.2, -1.7))
        f2 = self.ligne([("2", BLEU_D), ("× π", JAUNE_TITRE), ("× rayon", BASE_C)], 40, buff=0.2)
        f2.move_to(cadre2.get_center())
        self.au_mot("on l'écrit aussi 2 fois pi fois le rayon")
        self.play(FadeIn(cadre2), run_time=0.4)
        self.play(FadeIn(f2, scale=1.1), run_time=0.6)
        self.insister(f2, 1.06, 0.25)
        self.attendre_voix()

    # ── 04 : le bassin de Marc ──────────────────────────────────────────────
    def ecran_exemple(self):
        self.ecran("04-exemple")
        u = 1.0
        o = P(-4.3, 0.0)
        b = bassin(1.1, u, o)
        self.au_mot("Le bassin de Marc")
        tit = self.t("Le bassin de Marc", 44, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), FadeIn(b, scale=0.9), run_time=0.7)
        diam = Line(o + LEFT * 1.1 * u, o + RIGHT * 1.1 * u).set_stroke(BASE_C, 8)
        x = -0.4
        # ⛔ « 4 » et « diamètre » séparés : ensemble, le 4 attend « diamètre » et s'écrit en retard.
        l1 = self.ligne([("4 m", BASE_C), ("de diamètre.", BASE_C)], 34, buff=0.16)
        self.col(l1, 2.0, x)
        self.au_mot("4 mètres")
        self.play(FadeIn(l1[0], shift=UP * 0.1), Create(diam), run_time=0.5)
        self.au_mot("de diamètre")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.3)
        l2 = self.ligne([("Sa longueur :", WHITE), ("π × 4", BLEU_D), ("= 4π m", VERT_OK)], 34, buff=0.18)
        self.col(l2, 0.9, x)
        self.au_mot("Sa longueur")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("pi fois 4")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.35)
        self.au_mot("4 pi mètres")
        self.play(FadeIn(l2[2], shift=UP * 0.1), run_time=0.4)
        l3 = self.ligne([("Environ", WHITE), ("12,6 m", VERT_OK), ("de margelle.", MARGELLE_C)],
                        34, buff=0.18)
        self.col(l3, -0.4, x)
        self.au_mot("Environ")
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("12,6 mètres")
        self.play(FadeIn(l3[1], scale=1.2), run_time=0.45)
        self.play(FadeIn(l3[2], shift=UP * 0.1), run_time=0.3)
        self.insister(l3[1], 1.1, 0.25)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (réponse B) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        u = 0.85
        o = P(-4.6, 1.3)
        c = cercle(1.1, u, o)
        ray = Line(o, o + RIGHT * 1.1 * u).set_stroke(BASE_C, 7)
        e = hors_audit(sur_fond(self.t("rayon 3 m", 22, BASE_C))).next_to(ray, UP, buff=0.08)

        def avant_q(sc):
            sc.play(FadeIn(c), Create(ray), FadeIn(e), run_time=0.6)

        self.question_gauche("05-question", "05b-reponse",
                             ["La longueur du cercle ?"],
                             [self.choix("3π m"), self.choix("6π m"), self.choix("9π m")], 1,
                             ["2 × π × 3 = 6π m.", "9π : l'aire du disque,", "pas le tour."],
                             -0.3,
                             couper={0: ("2", "× π", "× 3", "= 6π m."),
                                     1: ("9π :", "l'aire du disque,")},
                             avant_q=avant_q)

    # ── 06 : le piège ───────────────────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege", 0.65)
        tit = self.t("Attention au piège !", 48, ORANGE_Q).move_to(P(0, 3.15))
        self.au_mot("Attention au piège")
        self.play(Write(tit), run_time=0.4)
        u = 1.0
        o = P(-4.3, 0.1)
        c = cercle(1.2, u, o)
        self.add(c)
        x = -1.2
        l1 = self.bloc(["Rayon ou diamètre : il faut savoir", "lequel on te donne."], 30, ROUGE_ERREUR)
        self.col(l1, 2.0, x)
        self.au_mot("Rayon ou diamètre")
        self.play(FadeIn(l1[0], shift=UP * 0.1), Create(c.rayon_trait), run_time=0.7)
        self.au_mot("lequel on te donne")
        self.play(FadeIn(l1[1], shift=UP * 0.1), Create(c.diam_trait), run_time=0.6)
        l2 = self.bloc(["Avec le diamètre, on multiplie", "par π une seule fois."], 30, BASE_C)
        self.col(l2, 0.8, x)
        self.au_mot("Avec le diamètre")
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.7)
        l3 = self.bloc(["Avec le rayon, on multiplie", "par 2 et par π."], 32, VERT_OK)
        self.col(l3, -0.6, x)
        self.au_mot("Avec le rayon")
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.7)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (réponse C) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        u = 0.85
        o = P(-4.6, 1.3)
        b = bassin(1.1, u, o)
        dia = Line(o + LEFT * 1.1 * u, o + RIGHT * 1.1 * u).set_stroke(BASE_C, 7)
        e = hors_audit(sur_fond(self.t("diamètre 5 m", 22, BASE_C))).next_to(dia, UP, buff=0.08)

        def avant_q(sc):
            sc.play(FadeIn(b), Create(dia), FadeIn(e), run_time=0.6)

        self.question_gauche("07-question", "07b-reponse",
                             ["La longueur du bassin ?"],
                             [self.choix("10π m"), self.choix("25π m"), self.choix("5π m")], 2,
                             ["π × 5 = 5π m.", "10π : le diamètre pris", "pour un rayon."],
                             -0.3,
                             couper={0: ("π × 5", "= 5π m."),
                                     1: ("10π :", "le diamètre pris")},
                             avant_q=avant_q)

    # ── 08 : le défi ────────────────────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        u = 0.85
        o = P(-4.0, -0.2)
        b = bassin(1.2, u, o)
        x = 0.9
        l0 = self.t("Le bassin fait 6 m de diamètre.", 30, BASE_C)
        self.col(l0, 2.0, x)
        self.au_mot("Le bassin fait 6 mètres de diamètre")
        dia = Line(o + LEFT * 1.2 * u, o + RIGHT * 1.2 * u).set_stroke(BASE_C, 7)
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(b, scale=0.9), Create(dia), run_time=0.9)
        barr = Circle(radius=(1.2 + 1.0) * u, color=TOUR_C, stroke_width=7).move_to(o)
        l1 = self.bloc(["Marc pose une barrière", "à 1 mètre du bord, tout autour."], 30, TOUR_C)
        self.col(l1, 1.0, x)
        self.au_mot("Marc pose une barrière de sécurité")
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.45)
        self.au_mot("à 1 mètre du bord")
        self.play(FadeIn(l1[1], shift=UP * 0.1), Create(barr), run_time=0.9)
        # ⛔ « Elle coûte » attendait le « elle » de « Combien coûte-t-elle », à la fin de la voix.
        l2 = self.ligne([("Prix :", WHITE), ("40 €", JAUNE_TITRE), ("le mètre.", JAUNE_TITRE)],
                        32, buff=0.16)
        self.col(l2, -0.2, x)
        self.au_mot("coûte 40 euros")
        self.play(FadeIn(l2[0], shift=UP * 0.1), FadeIn(l2[1], shift=UP * 0.1), run_time=0.45)
        self.au_mot("le mètre")
        self.play(FadeIn(l2[2], shift=UP * 0.1), run_time=0.3)
        l3 = self.t("Combien coûte-t-elle ?", 34, JAUNE_TITRE)
        self.col(l3, -1.3, x)
        self.au_mot("Combien coûte-t-elle")
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.5)
        self.pause_defi(y=-2.9)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        u = 0.72
        o = P(-4.8, 0.6)
        b = bassin(1.2, u, o)
        barr = Circle(radius=(1.2 + 1.0) * u, color=TOUR_C, stroke_width=6).move_to(o)
        self.add(b, barr)
        x = -2.4
        l1 = self.ligne([("Le rayon :", BASE_C), ("6", BLEU_D), ("÷ 2", BLEU_D), ("= 3 m", VERT_OK)],
                        30, buff=0.16)
        self.col(l1, 2.1, x)
        self.au_mot("Le rayon du bassin")
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.35)
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.25)
        self.play(FadeIn(l1[2], shift=UP * 0.1), run_time=0.25)
        self.au_mot("3 mètres")
        self.play(FadeIn(l1[3], shift=UP * 0.1), run_time=0.35)
        l2 = self.ligne([("La barrière :", TOUR_C), ("1 m", WHITE), ("plus loin,", WHITE),
                         ("rayon 4 m.", VERT_OK)], 30, buff=0.14)
        self.col(l2, 1.2, x)
        self.au_mot("La barrière est")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("1 mètre")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("plus loin")
        self.play(FadeIn(l2[2], shift=UP * 0.1), run_time=0.3)
        self.au_mot("rayon 4 mètres")
        self.play(FadeIn(l2[3], shift=UP * 0.1), run_time=0.4)
        l3 = self.ligne([("2 × π", BLEU_D), ("× 4", BLEU_D), ("= 8π", VERT_OK), ("≈ 25,1 m", VERT_OK)],
                        30, buff=0.16)
        self.col(l3, 0.3, x)
        self.au_mot("2 fois pi")
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("fois 4,")
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("8 pi")
        self.play(FadeIn(l3[2], shift=UP * 0.1), run_time=0.3)
        self.au_mot("environ 25,1 mètres")
        self.play(FadeIn(l3[3], shift=UP * 0.1), run_time=0.4)
        l4 = self.ligne([("Le prix :", JAUNE_TITRE), ("25,1", BLEU_D), ("× 40", BLEU_D),
                         ("≈ 1 005 €", VERT_OK)], 32, buff=0.16)
        self.col(l4, -0.8, x)
        self.au_mot("Le prix")
        self.play(FadeIn(l4[0], shift=UP * 0.1), run_time=0.35)
        self.play(FadeIn(l4[1], shift=UP * 0.1), run_time=0.3)
        self.play(FadeIn(l4[2], shift=UP * 0.1), run_time=0.3)
        self.au_mot("environ 1 005 euros")
        self.play(FadeIn(l4[3], scale=1.2), run_time=0.45)
        self.insister(l4[3], 1.1, 0.25)
        self.attendre_voix()

    # ── 09 ──────────────────────────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        fig = bassin(1.0, 0.85, ORIGIN)
        lignes = self.finale_gauche(fig, textes=[
            ("La longueur d'un cercle vaut", "π fois son diamètre,"),
            ("ou 2 fois π", "fois son rayon."),
            ("π vaut environ 3,14 :", "un peu plus de trois diamètres.")], fs=28)
        self.add(fig)
        self.au_mot("La longueur d'un cercle vaut")
        self.montrer_ligne(lignes[0], Indicate(fig.margelle, color=MARGELLE_C, scale_factor=1.06))
        self.au_mot("ou 2 fois pi")
        self.montrer_ligne(lignes[1])
        self.au_mot("Pi vaut environ 3,14")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_pi()
        self.ecran_formule()
        self.ecran_exemple()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")
