# 4e_aire_probleme.py
# EleveAI — Maths 4e — série « Périmètre, aire, volume, solides », épisode A4 : UN PROBLÈME D'AIRE
# (micro aire_probleme, notion aire_surface), AVEC VOIX. Paysage 16:9, CEINTURE VERTE.
# Décor et métier : Salomé, CARRELEUSE — la terrasse autour d'une piscine
# (centres argent-budget, art-design).
# Mapping micro → écrans : 02 (le grand rectangle : 12 × 8 = 96 m²), 03 (le trou : 8 × 4 = 32 m²),
# 04 (96 − 32 = 64 m²), 06 (piège : on arrondit toujours AU-DESSUS pour les paquets),
# questions 05 (C : 64 m²) et 07 (A : 43 paquets), défi 08 (terrain carré 8 × 8 moins un bassin
# rond de 4 m de diamètre : 64 − 12,6 ≈ 51,4 m², × 35 € ≈ 1 799 €).
# ⛔ Les milliers s'écrivent avec une ESPACE INSÉCABLE (U+00A0).
# Voix : manim/voix/4e-aire-probleme.json ; marques : 4e_aire_probleme_marques.json.
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/4e_aire_probleme.py AireProbleme4e
# Sortie : manim/sorties/4e/maths/aire/29-aire-probleme/

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from volume_4e_commun import *  # noqa: E402,F403
from volume_4e_commun import salome, Paysage4e  # noqa: E402

CARRELAGE_C, CARRELAGE_B = "#d6d3d1", "#57534e"
EAU_C, EAU_B = "#38bdf8", "#0c4a6e"


def terrasse(L, H, u, o=ORIGIN, sw=5):
    """Le terrain entier, carrelé. o = le coin bas-gauche. Attributs : .sol"""
    sol = Rectangle(width=L * u, height=H * u, fill_color=CARRELAGE_C, fill_opacity=0.45,
                    stroke_color=CARRELAGE_B, stroke_width=sw).move_to(o + P(L * u / 2, H * u / 2))
    g = VGroup(sol)
    g.sol, g.o, g.u, g.L, g.H = sol, o, u, L, H
    return g


def bassin_rect(l, h, u, o=ORIGIN, sw=5):
    """Le bassin rectangulaire (l'eau), qu'on ne carrèle pas. o = son coin bas-gauche."""
    return Rectangle(width=l * u, height=h * u, fill_color=EAU_C, fill_opacity=0.7,
                     stroke_color=EAU_B, stroke_width=sw).move_to(o + P(l * u / 2, h * u / 2))


def bassin_rond(r, u, o=ORIGIN, sw=5):
    """Le bassin rond (l'eau). o = son centre. Attributs : .rayon_trait .diam_trait"""
    c = Circle(radius=r * u, fill_color=EAU_C, fill_opacity=0.7, stroke_color=EAU_B,
               stroke_width=sw).move_to(o)
    c.rayon_trait = Line(o, o + P(r * u, 0), color=BASE_C, stroke_width=7)
    c.diam_trait = Line(o + P(-r * u, 0), o + P(r * u, 0), color=BASE_C, stroke_width=7)
    return c


class AireProbleme4e(Paysage4e):
    nom_voix = "4e-aire-probleme"
    fichier_marques = "4e_aire_probleme_marques.json"
    ceinture = "verte"

    # ── 00 ──────────────────────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Un problème d'aire", self.identite, self.ceinture,
                                       y_ech=-2.45)
        self.au_mot("Un problème d'aire")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q = self.bloc(["Combien de carrelage", "autour d'un bassin ?"], 38)
        q.move_to(P(0, 0.35)).align_to(P(-6.2, 0), LEFT)
        u = 0.3
        o = P(2.6, -1.7)
        te = terrasse(12, 8, u, o)
        ba = bassin_rect(8, 4, u, o + P(2 * u, 2 * u))
        self.au_mot("Combien de carrelage")
        self.play(FadeIn(q[0], shift=UP * 0.2), FadeIn(te, scale=0.85), run_time=0.5)
        self.au_mot("autour d'un bassin")
        self.play(FadeIn(q[1], shift=UP * 0.2), FadeIn(ba, scale=0.85), run_time=0.7)
        self.attendre_voix(marge=0.6)

    # ── 01 ──────────────────────────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        p = salome(1.0).move_to(P(-5.2, 0.4))
        self.au_mot("Voici Salomé")
        nom = self.t("Salomé", 40, BLEU_CALCUL).next_to(p, UP, buff=0.25)
        self.play(FadeIn(p, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("Elle est carreleuse")
        met = self.t("carreleuse", 24, BLEU_CALCUL).next_to(p, DOWN, buff=0.2)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.4)
        x = -2.8
        u = 0.3
        o = P(3.0, -2.0)
        te = terrasse(12, 8, u, o)
        ba = bassin_rect(8, 4, u, o + P(2 * u, 2 * u))
        l1 = self.bloc(["Autour d'une piscine,", "elle pose une terrasse."], 32, WHITE)
        self.col(l1, 2.0, x)
        self.au_mot("Autour d'une piscine")
        self.play(FadeIn(l1[0], shift=UP * 0.1), FadeIn(ba, scale=0.9), run_time=0.7)
        self.au_mot("elle pose une terrasse")
        self.play(FadeIn(l1[1], shift=UP * 0.1), FadeIn(te), run_time=0.7)
        self.bring_to_front(ba)
        l2 = self.bloc(["Le bassin, lui, n'est pas carrelé :", "c'est de l'eau."], 30, EAU_C)
        self.col(l2, 0.8, x)
        self.au_mot("Le bassin, lui, n'est pas carrelé")
        self.play(FadeIn(l2[0], shift=UP * 0.1), Indicate(ba, color=EAU_C, scale_factor=1.06),
                  run_time=0.8)
        self.au_mot("c'est de l'eau")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.4)
        l3 = self.bloc(["Combien de mètres carrés", "de carrelage faut-il ?"], 32, JAUNE_TITRE)
        self.col(l3, -0.7, x)
        self.au_mot("Combien de mètres carrés")
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.7)
        self.attendre_voix()

    # ── 02 : le grand rectangle ─────────────────────────────────────────────
    def ecran_le_grand(self):
        self.ecran("02-le-grand")
        u = 0.4
        o = P(-6.0, -1.6)
        te = terrasse(12, 8, u, o)
        self.add(te)
        self.au_mot("Le terrain entier")
        tit = self.t("Le terrain entier", 46, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.5)
        c12 = hors_audit(sur_fond(self.t("12 m", 24, BASE_C))).next_to(te.sol, DOWN, buff=0.12)
        c8 = hors_audit(sur_fond(self.t("8 m", 24, BASE_C))).next_to(te.sol, RIGHT, buff=0.12)
        x = 0.8
        l1 = self.ligne([("un rectangle de", WHITE), ("12 m", BASE_C), ("sur 8.", BASE_C)],
                        32, buff=0.14)
        self.col(l1, 2.0, x)
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("12 mètres")
        self.play(FadeIn(l1[1], shift=UP * 0.1), FadeIn(c12), run_time=0.45)
        self.au_mot("sur 8.")
        self.play(FadeIn(l1[2], shift=UP * 0.1), FadeIn(c8), run_time=0.4)
        l2 = self.ligne([("Son aire :", WHITE), ("12", BLEU_D), ("× 8", BLEU_D),
                         ("= 96 m²", VERT_OK)], 36, buff=0.16)
        self.col(l2, 0.5, x)
        self.au_mot("Son aire")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.3)
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.28)
        self.play(FadeIn(l2[2], shift=UP * 0.1), run_time=0.28)
        self.au_mot("96 mètres carrés")
        self.play(FadeIn(l2[3], scale=1.2), run_time=0.5)
        self.insister(l2[3], 1.1, 0.25)
        self.attendre_voix()

    # ── 03 : le trou ────────────────────────────────────────────────────────
    def ecran_le_trou(self):
        self.ecran("03-le-trou")
        u = 0.4
        o = P(-6.0, -1.6)
        te = terrasse(12, 8, u, o)
        ba = bassin_rect(8, 4, u, o + P(2 * u, 2 * u))
        self.add(te)
        self.au_mot("Le bassin est un rectangle")
        tit = self.t("Le bassin", 46, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), FadeIn(ba), run_time=0.7)
        b8 = hors_audit(sur_fond(self.t("8 m", 22, EAU_C))).next_to(ba, DOWN, buff=0.1)
        b4 = hors_audit(sur_fond(self.t("4 m", 22, EAU_C))).next_to(ba, RIGHT, buff=0.1)
        x = 0.8
        l1 = self.ligne([("de", WHITE), ("8 m", EAU_C), ("sur 4.", EAU_C)], 32, buff=0.14)
        self.col(l1, 2.0, x)
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.25)
        self.au_mot("8 mètres")
        self.play(FadeIn(l1[1], shift=UP * 0.1), FadeIn(b8), run_time=0.45)
        self.au_mot("sur 4.")
        self.play(FadeIn(l1[2], shift=UP * 0.1), FadeIn(b4), run_time=0.4)
        l2 = self.ligne([("Son aire :", WHITE), ("8", BLEU_D), ("× 4", BLEU_D),
                         ("= 32 m²", VERT_OK)], 34, buff=0.16)
        self.col(l2, 0.9, x)
        self.au_mot("Son aire")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.3)
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.28)
        self.play(FadeIn(l2[2], shift=UP * 0.1), run_time=0.28)
        self.au_mot("32 mètres carrés")
        self.play(FadeIn(l2[3], shift=UP * 0.1), run_time=0.45)
        l3 = self.bloc(["Cette surface-là", "ne reçoit pas de carrelage."], 32, ROUGE_ERREUR)
        self.col(l3, -0.5, x)
        self.au_mot("Cette surface-là")
        self.play(FadeIn(l3, shift=UP * 0.1), Indicate(ba, color=EAU_C, scale_factor=1.06),
                  run_time=0.8)
        self.attendre_voix()

    # ── 04 : soustraire ─────────────────────────────────────────────────────
    def ecran_soustraire(self):
        self.ecran("04-soustraire")
        u = 0.42
        o = P(-6.0, -1.0)
        te = terrasse(12, 8, u, o)
        ba = bassin_rect(8, 4, u, o + P(2 * u, 2 * u))
        self.add(te, ba)
        self.au_mot("La terrasse, c'est tout le reste")
        tit = self.t("Tout le reste", 46, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), Indicate(te.sol, color=CARRELAGE_C, scale_factor=1.04), run_time=0.9)
        x = 1.0
        l1 = self.ligne([("96", BLEU_D), ("− 32", BLEU_D), ("= 64 m²", VERT_OK)], 44, buff=0.2)
        self.col(l1, 1.0, x)
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.3)
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("64 mètres carrés")
        self.play(FadeIn(l1[2], scale=1.25), run_time=0.55)
        self.insister(l1[2], 1.1, 0.3)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (réponse C) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        u = 0.26
        o = P(-5.6, 0.5)
        te = terrasse(12, 8, u, o)
        ba = bassin_rect(8, 4, u, o + P(2 * u, 2 * u))
        e = VGroup(hors_audit(sur_fond(self.t("12 × 8", 20, BASE_C))).next_to(te.sol, DOWN, buff=0.08),
                   hors_audit(sur_fond(self.t("8 × 4", 20, EAU_C))).move_to(ba.get_center()))

        def avant_q(sc):
            sc.play(FadeIn(te), FadeIn(ba), FadeIn(e), run_time=0.7)

        self.question_gauche("05-question", "05b-reponse",
                             ["L'aire de la terrasse ?"],
                             [self.choix("96 m²"), self.choix("32 m²"), self.choix("64 m²")], 2,
                             ["96 − 32 = 64 m².", "96 : le terrain entier,", "bassin compris."],
                             -0.3,
                             couper={0: ("96", "− 32", "= 64 m²."),
                                     1: ("96 :", "le terrain entier,")},
                             avant_q=avant_q)

    # ── 06 : le piège ───────────────────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege", 0.65)
        tit = self.t("Attention au piège !", 48, ORANGE_Q).move_to(P(0, 3.15))
        self.au_mot("Attention au piège")
        self.play(Write(tit), run_time=0.4)
        x = -0.6
        paquets = VGroup(*[Rectangle(width=0.7, height=0.5, fill_color=CARRELAGE_C, fill_opacity=0.5,
                                     stroke_color=CARRELAGE_B, stroke_width=3)
                           .move_to(P(-5.6 + (k % 3) * 0.85, -1.3 - (k // 3) * 0.65))
                           for k in range(6)])
        l1 = self.t("Le carrelage se vend par paquets.", 30, WHITE)
        self.col(l1, 2.0, x)
        self.au_mot("Le carrelage se vend par paquets")
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(paquets), run_time=0.9)
        l2 = self.bloc(["Quand le calcul tombe entre deux paquets,", "on arrondit toujours au-dessus :"],
                       28, JAUNE_TITRE)
        self.col(l2, 1.0, x)
        self.au_mot("Quand le calcul tombe")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.55)
        self.au_mot("on arrondit toujours au-dessus")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.5)
        demi = Rectangle(width=0.35, height=0.5, fill_color=ROUGE_ERREUR, fill_opacity=0.5,
                         stroke_color=ROUGE_ERREUR, stroke_width=3).move_to(P(-4.3, -2.6))
        l3 = self.bloc(["un demi-paquet manquant,", "c'est un trou dans la terrasse."], 32, ROUGE_ERREUR)
        self.col(l3, -0.5, x)
        self.au_mot("un demi-paquet manquant")
        self.play(FadeIn(l3[0], shift=UP * 0.1), FadeIn(demi), run_time=0.7)
        self.au_mot("c'est un trou dans la terrasse")
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.5)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (réponse A) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        paquets = VGroup(*[Rectangle(width=0.55, height=0.4, fill_color=CARRELAGE_C, fill_opacity=0.5,
                                     stroke_color=CARRELAGE_B, stroke_width=3)
                           .move_to(P(-5.6 + (k % 4) * 0.68, 1.6 - (k // 4) * 0.52))
                           for k in range(8)])
        e = hors_audit(sur_fond(self.t("1 paquet = 1,5 m²", 22, JAUNE_TITRE))).move_to(P(-4.6, 0.2))

        def avant_q(sc):
            sc.play(FadeIn(paquets), FadeIn(e), run_time=0.7)

        self.question_gauche("07-question", "07b-reponse",
                             ["Combien de paquets", "pour 64 m² ?"],
                             [self.choix("43 paquets"), self.choix("42 paquets"),
                              self.choix("96 paquets")], 0,
                             ["64 ÷ 1,5 ≈ 42,7.", "On n'achète pas 42,7 paquets :",
                              "il en faut 43."],
                             -0.3,
                             # ⛔ « 43. » seul est pris pour une numérotation (_ENUM) et sort de la
                             # synchro : la ligne reste entière, le nombre collé à son verbe.
                             couper={0: ("64", "÷ 1,5", "≈ 42,7.")},
                             avant_q=avant_q)

    # ── 08 : le défi ────────────────────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        u = 0.42
        o = P(-5.6, -2.0)
        te = terrasse(8, 8, u, o)
        ba = bassin_rond(2, u, o + P(4 * u, 4 * u))
        x = 0.9
        l0 = self.ligne([("Terrain carré de", WHITE), ("8 m", BASE_C), ("de côté,", BASE_C)],
                        30, buff=0.14)
        self.col(l0, 2.0, x)
        self.au_mot("terrain carré")
        self.play(FadeIn(l0[0], shift=UP * 0.1), FadeIn(te, scale=0.9), run_time=0.8)
        self.au_mot("8 mètres")
        self.play(FadeIn(l0[1], shift=UP * 0.1), run_time=0.35)
        self.au_mot("de côté")
        self.play(FadeIn(l0[2], shift=UP * 0.1), run_time=0.3)
        l1 = self.ligne([("bassin rond de", EAU_C), ("4 m", EAU_C), ("de diamètre.", EAU_C)],
                        30, buff=0.14)
        self.col(l1, 1.0, x)
        self.au_mot("bassin rond")
        self.play(FadeIn(l1[0], shift=UP * 0.1), FadeIn(ba, scale=0.9), run_time=0.7)
        self.au_mot("4 mètres")
        self.play(FadeIn(l1[1], shift=UP * 0.1), Create(ba.diam_trait), run_time=0.45)
        self.au_mot("de diamètre")
        self.play(FadeIn(l1[2], shift=UP * 0.1), run_time=0.3)
        l2 = self.ligne([("Le carrelage :", WHITE), ("35 €", JAUNE_TITRE), ("le m².", JAUNE_TITRE)],
                        32, buff=0.14)
        self.col(l2, 0.0, x)
        self.au_mot("Le carrelage coûte")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("35 euros")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.35)
        self.au_mot("le mètre carré")
        self.play(FadeIn(l2[2], shift=UP * 0.1), run_time=0.3)
        l3 = self.t("Quel est le prix ?", 34, JAUNE_TITRE)
        self.col(l3, -1.1, x)
        self.au_mot("Quel est le prix")
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.5)
        self.pause_defi(y=-2.9)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        u = 0.3
        o = P(-5.6, -1.2)
        te = terrasse(8, 8, u, o)
        ba = bassin_rond(2, u, o + P(4 * u, 4 * u))
        self.add(te, ba)
        x = -2.6
        l1 = self.ligne([("Le terrain :", WHITE), ("8", BLEU_D), ("× 8", BLEU_D),
                         ("= 64 m²", VERT_OK)], 30, buff=0.14)
        self.col(l1, 2.1, x)
        self.au_mot("Le terrain")
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.3)
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.28)
        self.play(FadeIn(l1[2], shift=UP * 0.1), run_time=0.28)
        self.au_mot("64 mètres carrés")
        self.play(FadeIn(l1[3], shift=UP * 0.1), run_time=0.4)
        l2 = self.ligne([("Le bassin :", EAU_C), ("rayon 2,", BLEU_D), ("π × 2", BLEU_D),
                         ("× 2", BLEU_D), ("= 4π", VERT_OK)], 28, buff=0.12)
        self.col(l2, 1.2, x)
        self.au_mot("Le bassin")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("rayon 2,")
        self.play(FadeIn(l2[1], shift=UP * 0.1), Create(ba.rayon_trait), run_time=0.45)
        self.au_mot("pi fois 2")
        self.play(FadeIn(l2[2], shift=UP * 0.1), run_time=0.28)
        self.au_mot("fois 2,")
        self.play(FadeIn(l2[3], shift=UP * 0.1), run_time=0.28)
        self.au_mot("4 pi")
        self.play(FadeIn(l2[4], shift=UP * 0.1), run_time=0.3)
        l2b = self.ligne([("environ", WHITE), ("12,6 m².", VERT_OK)], 30, buff=0.16)
        self.col(l2b, 0.3, x)
        self.au_mot("environ 12,6")
        self.play(FadeIn(l2b, shift=UP * 0.1), run_time=0.45)
        l3 = self.ligne([("La terrasse :", CARRELAGE_C), ("64", BLEU_D), ("− 12,6", BLEU_D),
                         ("≈ 51,4 m²", VERT_OK)], 30, buff=0.12)
        self.col(l3, -0.6, x)
        self.au_mot("La terrasse")
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.3)
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.28)
        self.play(FadeIn(l3[2], shift=UP * 0.1), run_time=0.28)
        self.au_mot("environ 51,4")
        self.play(FadeIn(l3[3], shift=UP * 0.1), run_time=0.4)
        l4 = self.ligne([("Le prix :", JAUNE_TITRE), ("51,4", BLEU_D), ("× 35", BLEU_D),
                         ("≈ 1 799 €", VERT_OK)], 32, buff=0.14)
        self.col(l4, -1.6, x)
        self.au_mot("Le prix")
        self.play(FadeIn(l4[0], shift=UP * 0.1), run_time=0.3)
        self.play(FadeIn(l4[1], shift=UP * 0.1), run_time=0.28)
        self.play(FadeIn(l4[2], shift=UP * 0.1), run_time=0.28)
        self.au_mot("environ 1 799 euros")
        self.play(FadeIn(l4[3], scale=1.2), run_time=0.45)
        self.insister(l4[3], 1.1, 0.25)
        self.attendre_voix()

    # ── 09 ──────────────────────────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        u = 0.22
        o = P(-1.3, -0.9)
        fig = VGroup(terrasse(12, 8, u, o), bassin_rect(8, 4, u, o + P(2 * u, 2 * u)))
        lignes = self.finale_gauche(fig, textes=[
            ("Pour une surface percée, on calcule", "le grand, puis on enlève le trou."),
            ("On arrondit toujours au-dessus", "pour les paquets."),
            ("Et on vérifie que la réponse", "est en mètres carrés.")], fs=28)
        self.add(fig)
        self.au_mot("Pour une surface percée")
        self.montrer_ligne(lignes[0], Indicate(fig[0], color=CARRELAGE_C, scale_factor=1.05))
        self.au_mot("On arrondit toujours au-dessus")
        self.montrer_ligne(lignes[1])
        self.au_mot("Et on vérifie que la réponse")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_le_grand()
        self.ecran_le_trou()
        self.ecran_soustraire()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")
