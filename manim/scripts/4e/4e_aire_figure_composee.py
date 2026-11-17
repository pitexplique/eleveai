# 4e_aire_figure_composee.py
# EleveAI — Maths 4e — série « Périmètre, aire, volume, solides », épisode A3 : L'AIRE D'UNE FIGURE
# COMPOSÉE (micro aire_figure ; 3e aire_figure_composee), AVEC VOIX. Paysage 16:9, CEINTURE VERTE.
# Vidéo COMMUNE avec la 3e : à brancher par `aussi`.
# Décor et métier : Hugo, PAYSAGISTE — le gazon de la cour du collège, en forme de L
# (centres nature-ecologie, sport).
# Mapping micro → écrans : 02 (découper le L en deux rectangles : 10 × 6 et 4 × 3),
# 03 (60 + 12 = 72 m²), 04 (l'autre méthode : partir du grand rectangle et enlever le manquant),
# 06 (piège : on ne compte jamais deux fois, et le trait tracé ne change pas l'aire),
# questions 05 (B : 72 m²) et 07 (C : 84 m²), défi 08 (72 − 12,6 ≈ 59,4 m², × 28 € ≈ 1 663 €).
# ⛔ Les milliers s'écrivent avec une ESPACE INSÉCABLE (U+00A0).
# Voix : manim/voix/4e-aire-figure-composee.json ; marques : 4e_aire_figure_composee_marques.json.
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/4e_aire_figure_composee.py AireFigureComposee4e
# Sortie : manim/sorties/4e/maths/aire/28-aire-figure-composee/

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from volume_4e_commun import *  # noqa: E402,F403
from volume_4e_commun import figure_L, cercle, hugo, Paysage4e  # noqa: E402

GAZON_C, GAZON_B = "#4ade80", "#15803d"
ARBRE_C = "#065f46"
AIRE2_C = "#38bdf8"


def cour_en_L(u, o=ORIGIN, couleur=GAZON_C, bord=GAZON_B, sw=5, op=0.65):
    """La cour en L : un rectangle 10 × 9 dont on a enlevé un 6 × 3 au coin haut-droit.
    Elle se découpe en un 10 × 6 (en bas) et un 4 × 3 (en haut à gauche).
    Attributs : .trait (la découpe horizontale) .bas .haut (les deux rectangles) .o .u"""
    L = figure_L(10, 9, 6, 3, u, o, couleur=couleur, bord=bord, sw=sw, op=op)
    L.trait = DashedLine(o + P(0, 6 * u), o + P(4 * u, 6 * u), color=WHITE, stroke_width=4,
                         dash_length=0.12)
    L.bas = Rectangle(width=10 * u, height=6 * u, fill_color=AIRE2_C, fill_opacity=0.35,
                      stroke_width=0).move_to(o + P(5 * u, 3 * u))
    L.haut = Rectangle(width=4 * u, height=3 * u, fill_color=JAUNE_TITRE, fill_opacity=0.35,
                       stroke_width=0).move_to(o + P(2 * u, 7.5 * u))
    L.grand = Rectangle(width=10 * u, height=9 * u, stroke_color=ORANGE_Q, stroke_width=5,
                        fill_opacity=0).move_to(o + P(5 * u, 4.5 * u))
    L.manque = Rectangle(width=6 * u, height=3 * u, fill_color=ROUGE_ERREUR, fill_opacity=0.3,
                         stroke_color=ROUGE_ERREUR, stroke_width=4).move_to(o + P(7 * u, 7.5 * u))
    return L


def arbre(s=1.0):
    """Un petit arbre : le tronc et la houppe."""
    tronc = Rectangle(width=0.07 * s, height=0.18 * s, fill_color="#78350f", fill_opacity=1,
                      stroke_width=0)
    houppe = Circle(radius=0.16 * s, fill_color=ARBRE_C, fill_opacity=1,
                    stroke_width=0).move_to(UP * 0.2 * s)
    return VGroup(tronc, houppe)


class AireFigureComposee4e(Paysage4e):
    nom_voix = "4e-aire-figure-composee"
    fichier_marques = "4e_aire_figure_composee_marques.json"
    ceinture = "verte"

    # ── 00 ──────────────────────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Les aires composées", self.identite, self.ceinture,
                                       y_ech=-2.45)
        self.au_mot("L'aire d'une figure composée")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q = self.bloc(["Comment mesurer une surface", "qui n'est pas un rectangle ?"], 34)
        q.move_to(P(0, 0.35)).align_to(P(-6.2, 0), LEFT)
        L = cour_en_L(0.26, P(3.6, -1.9))   # ⛔ à 2.6 le L touchait la question
        self.au_mot("Comment mesurer une surface")
        self.play(FadeIn(q[0], shift=UP * 0.2), FadeIn(L, scale=0.85), run_time=0.5)
        self.au_mot("qui n'est pas un rectangle")
        self.play(FadeIn(q[1], shift=UP * 0.2), Indicate(L, color=GAZON_C, scale_factor=1.05),
                  run_time=0.7)
        self.attendre_voix(marge=0.6)

    # ── 01 ──────────────────────────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        p = hugo(1.0).move_to(P(-5.2, 0.4))
        self.au_mot("Voici Hugo")
        nom = self.t("Hugo", 40, BLEU_CALCUL).next_to(p, UP, buff=0.25)
        self.play(FadeIn(p, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("Il est paysagiste")
        met = self.t("paysagiste", 24, BLEU_CALCUL).next_to(p, DOWN, buff=0.2)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.4)
        x = -2.8
        L = cour_en_L(0.24, P(4.15, -2.1))   # ⛔ à 3.4 le L mordait sur la colonne de texte
        l1 = self.bloc(["Le collège veut du gazon", "synthétique dans sa cour."], 30, WHITE)
        self.col(l1, 2.0, x)
        self.au_mot("Le collège veut du gazon")
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(L, scale=0.9), run_time=0.8)
        l2 = self.t("La cour a la forme d'un L :", 32, GAZON_C)
        self.col(l2, 0.9, x)
        self.au_mot("La cour a la forme d'un L")
        self.play(FadeIn(l2, shift=UP * 0.1), Indicate(L, color=GAZON_C, scale_factor=1.05),
                  run_time=0.7)
        l3 = self.t("ce n'est ni un rectangle, ni un carré.", 28, ROUGE_ERREUR)
        self.col(l3, 0.0, x)
        self.au_mot("ce n'est ni un rectangle")
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.55)
        l4 = self.bloc(["Combien de mètres carrés", "faut-il commander ?"], 32, JAUNE_TITRE)
        self.col(l4, -1.2, x)
        self.au_mot("Combien de mètres carrés")
        self.play(FadeIn(l4, shift=UP * 0.1), run_time=0.7)
        self.attendre_voix()

    # ── 02 : découper ───────────────────────────────────────────────────────
    def ecran_decouper(self):
        self.ecran("02-decouper")
        u = 0.36
        L = cour_en_L(u, P(-5.8, -1.7))
        self.add(L)
        self.au_mot("La méthode")
        # ⛔ le titre redit « découpe », le mot que la ligne suivante attend : hors_audit.
        tit = hors_audit(self.t("On découpe en rectangles", 42, JAUNE_TITRE)).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.55)
        x = 0.2
        l1 = self.t("on découpe la figure en rectangles.", 28, WHITE)
        self.col(l1, 2.0, x)
        self.au_mot("on découpe la figure")
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.5)
        l2 = self.bloc(["Hugo trace un trait,", "et le L devient deux rectangles :"], 30, WHITE)
        self.col(l2, 1.0, x)
        self.au_mot("Hugo trace un trait")
        self.play(FadeIn(l2[0], shift=UP * 0.1), Create(L.trait), run_time=0.8)
        self.au_mot("et le L devient deux rectangles")
        self.play(FadeIn(l2[1], shift=UP * 0.1), FadeIn(L.bas), FadeIn(L.haut), run_time=0.8)
        l3 = self.ligne([("un de", WHITE), ("10 m", AIRE2_C), ("sur 6,", AIRE2_C)], 32, buff=0.14)
        self.col(l3, -0.3, x)
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.25)
        self.au_mot("10 mètres")
        self.play(FadeIn(l3[1], shift=UP * 0.1), Indicate(L.bas, color=AIRE2_C, scale_factor=1.05),
                  run_time=0.5)
        self.au_mot("sur 6,")
        self.play(FadeIn(l3[2], shift=UP * 0.1), run_time=0.3)
        l4 = self.ligne([("un autre de", WHITE), ("4 m", JAUNE_TITRE), ("sur 3.", JAUNE_TITRE)],
                        32, buff=0.14)
        self.col(l4, -1.3, x)
        self.play(FadeIn(l4[0], shift=UP * 0.1), run_time=0.25)
        self.au_mot("4 mètres")
        self.play(FadeIn(l4[1], shift=UP * 0.1), Indicate(L.haut, color=JAUNE_TITRE, scale_factor=1.08),
                  run_time=0.5)
        self.au_mot("sur 3.")
        self.play(FadeIn(l4[2], shift=UP * 0.1), run_time=0.3)
        self.attendre_voix()

    # ── 03 : additionner ────────────────────────────────────────────────────
    def ecran_additionner(self):
        self.ecran("03-additionner")
        u = 0.34
        L = cour_en_L(u, P(-5.6, -1.6))
        self.add(L, L.trait, L.bas, L.haut)
        self.au_mot("Le premier")
        tit = self.t("On additionne", 46, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.45)
        x = 0.4
        l1 = self.ligne([("Le premier :", AIRE2_C), ("10", BLEU_D), ("× 6", BLEU_D),
                         ("= 60 m²", VERT_OK)], 32, buff=0.14)
        self.col(l1, 2.0, x)
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.3)
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.28)
        self.play(FadeIn(l1[2], shift=UP * 0.1), run_time=0.28)
        self.au_mot("60 mètres carrés")
        self.play(FadeIn(l1[3], shift=UP * 0.1), run_time=0.4)
        l2 = self.ligne([("Le second :", JAUNE_TITRE), ("4", BLEU_D), ("× 3", BLEU_D),
                         ("= 12 m²", VERT_OK)], 32, buff=0.14)
        self.col(l2, 0.9, x)
        self.au_mot("Le second")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.3)
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.28)
        self.play(FadeIn(l2[2], shift=UP * 0.1), run_time=0.28)
        self.au_mot("12 mètres carrés")
        self.play(FadeIn(l2[3], shift=UP * 0.1), run_time=0.4)
        l3 = self.ligne([("En tout :", WHITE), ("60", BLEU_D), ("+ 12", BLEU_D),
                         ("= 72 m²", VERT_OK)], 36, buff=0.16)
        self.col(l3, -0.5, x)
        self.au_mot("En tout")
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.3)
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.28)
        self.play(FadeIn(l3[2], shift=UP * 0.1), run_time=0.28)
        self.au_mot("72 mètres carrés")
        self.play(FadeIn(l3[3], scale=1.2), run_time=0.5)
        self.insister(l3[3], 1.1, 0.25)
        self.attendre_voix()

    # ── 04 : l'autre méthode ────────────────────────────────────────────────
    def ecran_soustraire(self):
        self.ecran("04-soustraire")
        u = 0.34
        L = cour_en_L(u, P(-5.4, -1.6))
        self.add(L)
        self.au_mot("Il y a une autre façon de faire")
        tit = self.t("L'autre façon", 46, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.45)
        x = 0.4
        l1 = self.bloc(["partir du grand rectangle", "et enlever le morceau manquant."], 30, ORANGE_Q)
        self.col(l1, 2.0, x)
        self.au_mot("partir du grand rectangle")
        self.play(FadeIn(l1[0], shift=UP * 0.1), Create(L.grand), run_time=0.9)
        self.au_mot("et enlever le morceau manquant")
        self.play(FadeIn(l1[1], shift=UP * 0.1), FadeIn(L.manque), run_time=0.8)
        l2 = self.bloc(["Les deux méthodes donnent", "le même résultat."], 32, VERT_OK)
        self.col(l2, 0.6, x)
        self.au_mot("Les deux méthodes donnent")
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.7)
        l3 = self.bloc(["On choisit la plus simple", "à calculer."], 32, JAUNE_TITRE)
        self.col(l3, -0.8, x)
        self.au_mot("On choisit la plus simple")
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.7)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (réponse B) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        u = 0.26
        L = cour_en_L(u, P(-5.6, 0.0))
        e = VGroup(hors_audit(sur_fond(self.t("10 × 6", 22, AIRE2_C))).move_to(L.bas.get_center()),
                   hors_audit(sur_fond(self.t("4 × 3", 22, JAUNE_TITRE))).move_to(L.haut.get_center()))

        def avant_q(sc):
            sc.play(FadeIn(L), FadeIn(L.trait), FadeIn(L.bas), FadeIn(L.haut), FadeIn(e),
                    run_time=0.8)

        self.question_gauche("05-question", "05b-reponse",
                             ["L'aire totale ?"],
                             [self.choix("23 m²"), self.choix("72 m²"), self.choix("60 m²")], 1,
                             ["60 + 12 = 72 m².", "23 : une addition de longueurs.",
                              "60 : le deuxième morceau oublié."],
                             -0.3,
                             couper={0: ("60", "+ 12", "= 72 m²."),
                                     1: ("23 :", "une addition de longueurs."),
                                     2: ("60 :", "le deuxième morceau oublié.")},
                             avant_q=avant_q)

    # ── 06 : le piège ───────────────────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege", 0.65)
        tit = self.t("Attention au piège !", 48, ORANGE_Q).move_to(P(0, 3.15))
        self.au_mot("Attention au piège")
        self.play(Write(tit), run_time=0.4)
        u = 0.3
        L = cour_en_L(u, P(-5.4, -1.4))
        self.add(L)
        x = -0.4
        l1 = self.bloc(["Quand on découpe, on ne compte", "jamais deux fois la partie commune."],
                       28, ROUGE_ERREUR)
        self.col(l1, 2.0, x)
        self.au_mot("Quand on découpe")
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(L.bas), FadeIn(L.haut), run_time=0.9)
        l2 = self.bloc(["Et le trait qu'on a tracé", "ne change pas l'aire :"], 30, WHITE)
        self.col(l2, 0.8, x)
        self.au_mot("Et le trait qu'on a tracé")
        self.play(FadeIn(l2[0], shift=UP * 0.1), Create(L.trait), run_time=0.8)
        self.au_mot("ne change pas l'aire")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.45)
        l3 = self.t("il n'est là que pour nous aider.", 32, VERT_OK)
        self.col(l3, -0.4, x)
        self.au_mot("il n'est là que pour nous aider")
        self.play(FadeIn(l3, shift=UP * 0.1), FadeOut(L.trait), run_time=0.8)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (réponse C) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        u = 0.22
        o = P(-5.4, -0.2)
        ca = Square(side_length=10 * u, fill_color=GAZON_C, fill_opacity=0.6, stroke_color=GAZON_B,
                    stroke_width=5).move_to(o + P(5 * u, 5 * u))
        trou = Square(side_length=4 * u, fill_color="#0b1220", fill_opacity=1, stroke_color=ROUGE_ERREUR,
                      stroke_width=4).move_to(o + P(8 * u, 8 * u))
        e = VGroup(hors_audit(sur_fond(self.t("10 m", 20, BASE_C))).next_to(ca, DOWN, buff=0.08),
                   hors_audit(sur_fond(self.t("4 m", 20, ROUGE_ERREUR))).next_to(trou, RIGHT, buff=0.08))

        def avant_q(sc):
            sc.play(FadeIn(ca), FadeIn(trou), FadeIn(e), run_time=0.7)

        self.question_gauche("07-question", "07b-reponse",
                             ["L'aire restante ?"],
                             [self.choix("100 m²"), self.choix("96 m²"), self.choix("84 m²")], 2,
                             ["10 × 10 = 100.", "Moins 4 × 4 = 16.", "100 − 16 = 84 m²."],
                             -0.3,
                             couper={0: ("10", "× 10", "= 100."),
                                     1: ("Moins 4", "× 4", "= 16."),
                                     2: ("100", "− 16", "= 84 m².")},
                             avant_q=avant_q)

    # ── 08 : le défi ────────────────────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        u = 0.3
        L = cour_en_L(u, P(-5.4, -1.6))
        rond = Circle(radius=2 * u, fill_color=ARBRE_C, fill_opacity=0.7, stroke_color="#064e3b",
                      stroke_width=4).move_to(L.o + P(5 * u, 3 * u))
        arbres = VGroup(*[arbre(0.9).move_to(rond.get_center() + P(dx, dy))
                          for dx, dy in ((-0.2, -0.05), (0.18, 0.08))])
        x = 0.8
        l0 = self.ligne([("La cour fait", WHITE), ("72 m²,", GAZON_C)], 32, buff=0.16)
        self.col(l0, 2.0, x)
        self.au_mot("La cour fait")
        self.play(FadeIn(l0[0], shift=UP * 0.1), FadeIn(L, scale=0.9), run_time=0.8)
        self.au_mot("72 mètres carrés")
        self.play(FadeIn(l0[1], shift=UP * 0.1), run_time=0.4)
        l1 = self.bloc(["et un rond-point planté d'arbres", "occupe un disque de 2 m de rayon,"],
                       28, ARBRE_C)
        self.col(l1, 1.0, x)
        self.au_mot("et un rond-point planté d'arbres")
        self.play(FadeIn(l1[0], shift=UP * 0.1), FadeIn(rond), FadeIn(arbres), run_time=0.9)
        self.au_mot("occupe un disque")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.5)
        l2 = self.t("qu'on ne gazonne pas.", 30, ROUGE_ERREUR)
        self.col(l2, 0.0, x)
        self.au_mot("qu'on ne gazonne pas")
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.45)
        l3 = self.ligne([("Le gazon :", WHITE), ("28 €", JAUNE_TITRE), ("le m².", JAUNE_TITRE)],
                        32, buff=0.14)
        self.col(l3, -0.9, x)
        self.au_mot("Le gazon coûte")
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("28 euros")
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.35)
        self.au_mot("le mètre carré")
        self.play(FadeIn(l3[2], shift=UP * 0.1), run_time=0.3)
        l4 = self.t("Quel est le prix ?", 34, JAUNE_TITRE)
        self.col(l4, -1.9, x)
        self.au_mot("Quel est le prix")
        self.play(FadeIn(l4, shift=UP * 0.1), run_time=0.5)
        self.pause_defi(y=-2.9)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        u = 0.24
        L = cour_en_L(u, P(-5.6, -1.1))
        rond = Circle(radius=2 * u, fill_color=ARBRE_C, fill_opacity=0.7, stroke_color="#064e3b",
                      stroke_width=4).move_to(L.o + P(5 * u, 3 * u))
        self.add(L, rond)
        x = -2.4
        l1 = self.ligne([("Le disque :", ARBRE_C), ("π × 2", BLEU_D), ("× 2", BLEU_D),
                         ("= 4π", VERT_OK)], 30, buff=0.14)
        self.col(l1, 2.1, x)
        self.au_mot("Le disque")
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("pi fois 2")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("fois 2,")
        self.play(FadeIn(l1[2], shift=UP * 0.1), run_time=0.3)
        self.au_mot("4 pi")
        self.play(FadeIn(l1[3], shift=UP * 0.1), run_time=0.3)
        l1b = self.ligne([("environ", WHITE), ("12,6 m².", VERT_OK)], 30, buff=0.16)
        self.col(l1b, 1.2, x)
        self.au_mot("environ 12,6")
        self.play(FadeIn(l1b, shift=UP * 0.1), run_time=0.45)
        l2 = self.ligne([("À gazonner :", GAZON_C), ("72", BLEU_D), ("− 12,6", BLEU_D),
                         ("≈ 59,4 m²", VERT_OK)], 30, buff=0.14)
        self.col(l2, 0.3, x)
        self.au_mot("La surface à gazonner")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.35)
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.28)
        self.play(FadeIn(l2[2], shift=UP * 0.1), run_time=0.28)
        self.au_mot("environ 59,4 mètres carrés")
        self.play(FadeIn(l2[3], shift=UP * 0.1), run_time=0.4)
        l3 = self.ligne([("Le prix :", JAUNE_TITRE), ("59,4", BLEU_D), ("× 28", BLEU_D),
                         ("≈ 1 663 €", VERT_OK)], 32, buff=0.14)
        self.col(l3, -0.9, x)
        self.au_mot("Le prix")
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.35)
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.28)
        self.play(FadeIn(l3[2], shift=UP * 0.1), run_time=0.28)
        self.au_mot("environ 1 663 euros")
        self.play(FadeIn(l3[3], scale=1.2), run_time=0.45)
        self.insister(l3[3], 1.1, 0.25)
        self.attendre_voix()

    # ── 09 ──────────────────────────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        fig = cour_en_L(0.22, ORIGIN)
        lignes = self.finale_gauche(fig, textes=[
            ("Une figure composée se découpe", "en figures simples."),
            ("On additionne les morceaux,", "ou on enlève ce qui manque."),
            ("Et les traits de découpe", "ne changent pas l'aire.")], fs=28)
        self.add(fig)
        self.au_mot("Une figure composée se découpe")
        self.montrer_ligne(lignes[0], Indicate(fig, color=GAZON_C, scale_factor=1.05))
        self.au_mot("On additionne les morceaux")
        self.montrer_ligne(lignes[1])
        self.au_mot("Et les traits de découpe")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_decouper()
        self.ecran_additionner()
        self.ecran_soustraire()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")
