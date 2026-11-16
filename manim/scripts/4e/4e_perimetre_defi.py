# 4e_perimetre_defi.py
# EleveAI — Maths 4e — série « Périmètre, aire, volume, solides », épisode P5 : DÉFIS SUR LES PÉRIMÈTRES
# (micro aire_perimetre_defi, 4e ET 3e), AVEC VOIX. Paysage 16:9, CEINTURE BLEUE.
# Vidéo COMMUNE avec la 3e : à brancher par `aussi`.
# Décor et métier : Thierry, ÉLEVEUR — le grillage de l'enclos des chèvres
# (centres animaux, nature-ecologie).
# Mapping micro → écrans : 02 (le tour d'un demi-disque, c'est l'arc PLUS le diamètre),
# 03 (31,4 + 20 ≈ 51,4 m), 04 (même aire, pas même tour : le carré de 400 m² fait 80 m de tour),
# 06 (piège : plus la figure est ronde, moins il faut de grillage), questions 05 (C : 10π + 20 m)
# et 07 (B : 20 m), défi 08 (100 m de grillage : le rond donne 796 m², le carré 625 m²).
# Voix : manim/voix/4e-perimetre-defi.json ; marques : 4e_perimetre_defi_marques.json.
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/4e_perimetre_defi.py PerimetreDefi4e
# Sortie : manim/sorties/4e/maths/perimetre/25-perimetre-defi/

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from volume_4e_commun import *  # noqa: E402,F403
from volume_4e_commun import cercle, demi_disque, thierry, Paysage4e  # noqa: E402

TOUR_C = ORANGE_RETENUE
HERBE_C, HERBE_B = "#4d7c0f", "#a3e635"
GRILLAGE_C = "#cbd5e1"


def chevre(s=1.0, couleur="#f1f5f9", corne="#78350f"):
    """Une chèvre vue de côté, en trois traits : le corps, la tête, deux cornes, quatre pattes."""
    corps = Ellipse(width=0.42 * s, height=0.24 * s, fill_color=couleur, fill_opacity=1,
                    stroke_width=0)
    tete = Circle(radius=0.11 * s, fill_color=couleur, fill_opacity=1,
                  stroke_width=0).move_to(P(0.24 * s, 0.1 * s))
    cornes = VGroup(*[Line(tete.get_center() + P(dx * 0.05 * s, 0.07 * s),
                           tete.get_center() + P(dx * 0.09 * s, 0.19 * s)).set_stroke(corne, 2.5 * s)
                      for dx in (-1, 1)])
    pattes = VGroup(*[Line(P(x * s, -0.1 * s), P(x * s, -0.26 * s)).set_stroke(couleur, 3 * s)
                      for x in (-0.14, -0.05, 0.08, 0.16)])
    g = VGroup(pattes, corps, tete, cornes)
    return g


def enclos_carre(cote, u, o=ORIGIN, sw=7):
    """Un enclos carré : l'herbe, et le grillage (le tour) autour. o = le centre."""
    c = cote * u
    herbe = Square(side_length=c, fill_color=HERBE_C, fill_opacity=0.45, stroke_width=0).move_to(o)
    gril = Square(side_length=c, stroke_color=TOUR_C, stroke_width=sw, fill_opacity=0).move_to(o)
    g = VGroup(herbe, gril)
    g.herbe, g.grillage, g.cote = herbe, gril, c
    return g


def enclos_rond(r, u, o=ORIGIN, sw=7):
    """Un enclos rond : l'herbe, et le grillage autour. o = le centre."""
    herbe = Circle(radius=r * u, fill_color=HERBE_C, fill_opacity=0.45, stroke_width=0).move_to(o)
    gril = Circle(radius=r * u, stroke_color=TOUR_C, stroke_width=sw, fill_opacity=0).move_to(o)
    g = VGroup(herbe, gril)
    g.herbe, g.grillage, g.r = herbe, gril, r * u
    return g


class PerimetreDefi4e(Paysage4e):
    nom_voix = "4e-perimetre-defi"
    fichier_marques = "4e_perimetre_defi_marques.json"
    ceinture = "bleue"

    # ── 00 ──────────────────────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Défis sur les périmètres", self.identite, self.ceinture,
                                       y_ech=-2.45)
        self.au_mot("Défis sur les périmètres")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q = self.bloc(["Combien de grillage", "pour un enclos ?"], 38)
        q.move_to(P(0, 0.35)).align_to(P(-6.2, 0), LEFT)
        en = enclos_rond(1.2, 1.0, P(3.9, -0.5))
        ch = VGroup(*[chevre(1.0).move_to(P(3.9, -0.5) + P(dx, dy))
                      for dx, dy in ((-0.45, 0.2), (0.35, -0.25))])
        self.au_mot("Combien de grillage")
        self.play(FadeIn(q[0], shift=UP * 0.2), FadeIn(en, scale=0.85), run_time=0.5)
        self.au_mot("pour un enclos")
        self.play(FadeIn(q[1], shift=UP * 0.2), FadeIn(ch), run_time=0.7)
        self.attendre_voix(marge=0.6)

    # ── 01 ──────────────────────────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        p = thierry(1.0).move_to(P(-5.2, 0.4))
        self.au_mot("Voici Thierry")
        nom = self.t("Thierry", 40, BLEU_CALCUL).next_to(p, UP, buff=0.25)
        self.play(FadeIn(p, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("Il est éleveur")
        met = self.t("éleveur", 24, BLEU_CALCUL).next_to(p, DOWN, buff=0.2)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.4)
        x = -2.8
        en = enclos_rond(1.1, 1.0, P(4.2, -1.3))
        ch = VGroup(*[chevre(1.0).move_to(P(4.2, -1.3) + P(dx, dy))
                      for dx, dy in ((-0.4, 0.25), (0.3, -0.2), (0.1, 0.5))])
        l1 = self.t("Il veut agrandir l'enclos de ses chèvres.", 28, WHITE)
        self.col(l1, 2.0, x)
        self.au_mot("Il veut agrandir l'enclos")
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(en, scale=0.9), FadeIn(ch), run_time=0.9)
        l2 = self.t("Le grillage coûte cher :", 32, TOUR_C)
        self.col(l2, 0.9, x)
        self.au_mot("Le grillage coûte cher")
        self.play(FadeIn(l2, shift=UP * 0.1), Indicate(en.grillage, color=TOUR_C, scale_factor=1.05),
                  run_time=0.7)
        l3 = self.bloc(["il doit calculer juste, sans en", "commander trop ni trop peu."], 30, JAUNE_TITRE)
        self.col(l3, -0.3, x)
        self.au_mot("il doit calculer juste")
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.7)
        self.attendre_voix()

    # ── 02 : le demi-disque ─────────────────────────────────────────────────
    def ecran_demi_disque(self):
        self.ecran("02-le-demi-disque")
        u = 1.0
        dd = demi_disque(1.3, u, P(-4.0, -0.9), couleur=HERBE_C, bord=HERBE_B)
        self.add(dd.forme)
        self.au_mot("Le premier enclos est un demi-disque")
        tit = self.t("Le demi-disque", 46, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.5)
        x = -0.4
        l1 = self.ligne([("de", WHITE), ("10 m", BASE_C), ("de rayon.", BASE_C)], 32, buff=0.14)
        self.col(l1, 2.0, x)
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.25)
        self.au_mot("10 mètres")
        ray = Line(P(-4.0, -0.9), P(-4.0, -0.9) + UP * 1.3 * u).set_stroke(BASE_C, 7)
        self.play(FadeIn(l1[1], shift=UP * 0.1), Create(ray), run_time=0.5)
        self.au_mot("de rayon")
        self.play(FadeIn(l1[2], shift=UP * 0.1), run_time=0.3)
        l2 = self.bloc(["Attention : le tour d'un demi-disque,", "ce n'est pas seulement l'arc."],
                       28, ROUGE_ERREUR)
        self.col(l2, 1.0, x)
        self.au_mot("Attention")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.5)
        self.au_mot("ce n'est pas seulement l'arc")
        self.play(FadeIn(l2[1], shift=UP * 0.1), Create(dd.arc.copy().set_stroke(TOUR_C, 9)),
                  run_time=0.8)
        l3 = self.ligne([("C'est l'arc,", TOUR_C), ("plus le diamètre qui le ferme.", VERT_OK)],
                        28, buff=0.16)
        self.col(l3, -0.4, x)
        self.au_mot("C'est l'arc")
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.4)
        self.au_mot("plus le diamètre qui le ferme")
        self.play(FadeIn(l3[1], shift=UP * 0.1), Create(dd.diam.copy().set_stroke(VERT_OK, 9)),
                  run_time=0.8)
        self.attendre_voix()

    # ── 03 : le calcul ──────────────────────────────────────────────────────
    def ecran_calcul(self):
        self.ecran("03-calcul")
        u = 0.95
        dd = demi_disque(1.3, u, P(-4.4, -0.9), couleur=HERBE_C, bord=HERBE_B)
        self.add(dd)
        self.au_mot("L'arc")
        tit = self.t("Le tour complet", 46, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.3)
        x = -0.6
        l1 = self.ligne([("L'arc :", TOUR_C), ("π × 20", BLEU_D), ("÷ 2", BLEU_D),
                         ("= 10π m", VERT_OK)], 30, buff=0.14)
        self.col(l1, 2.0, x)
        # ⛔ « L'arc : » n'a aucun mot de 4 lettres : le gabarit ne l'attend pas, donc l'écran
        #    démarre tout de suite et « pi fois 20 » arrivait déjà en retard. Animations courtes.
        self.play(FadeIn(l1[0], shift=UP * 0.1), Create(dd.arc.copy().set_stroke(TOUR_C, 9)),
                  run_time=0.4)
        self.au_mot("pi fois 20")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("divisé par 2")
        self.play(FadeIn(l1[2], shift=UP * 0.1), run_time=0.3)
        self.au_mot("10 pi mètres")
        self.play(FadeIn(l1[3], shift=UP * 0.1), run_time=0.35)
        l1b = self.ligne([("environ", WHITE), ("31,4.", VERT_OK)], 30, buff=0.16)
        self.col(l1b, 1.1, x)
        self.au_mot("environ 31,4")
        self.play(FadeIn(l1b, shift=UP * 0.1), run_time=0.45)
        l2 = self.ligne([("Le diamètre :", VERT_OK), ("20 m.", VERT_OK)], 30, buff=0.16)
        self.col(l2, 0.2, x)
        self.au_mot("Le diamètre")
        self.play(FadeIn(l2[0], shift=UP * 0.1), Create(dd.diam.copy().set_stroke(VERT_OK, 9)),
                  run_time=0.6)
        self.au_mot("20 mètres.")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.35)
        l3 = self.ligne([("Le tour complet :", JAUNE_TITRE), ("31,4", BLEU_D), ("+ 20", BLEU_D),
                         ("≈ 51,4 m", VERT_OK)], 30, buff=0.14)
        self.col(l3, -0.9, x)
        self.au_mot("Le tour complet")
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.35)
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.3)
        self.play(FadeIn(l3[2], shift=UP * 0.1), run_time=0.3)
        self.au_mot("environ 51,4 mètres")
        self.play(FadeIn(l3[3], scale=1.2), run_time=0.45)
        self.insister(l3[3], 1.1, 0.25)
        self.attendre_voix()

    # ── 04 : comparer avec le carré ─────────────────────────────────────────
    def ecran_comparer(self):
        self.ecran("04-comparer")
        u = 0.85
        self.au_mot("Thierry hésite avec un enclos carré")
        tit = self.t("Même aire, autre tour", 44, JAUNE_TITRE).move_to(P(0, 3.15))
        ca = enclos_carre(2.2, u, P(-4.3, -0.2))
        self.play(Write(tit), FadeIn(ca, scale=0.9), run_time=0.8)
        x = -1.4
        l1 = self.ligne([("Un carré de", WHITE), ("400 m²", BASE_C), ("a un côté de", WHITE),
                         ("20 m,", VERT_OK)], 28, buff=0.12)
        self.col(l1, 1.9, x)
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("400 mètres carrés")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.35)
        self.au_mot("a un côté")
        self.play(FadeIn(l1[2], shift=UP * 0.1), run_time=0.3)
        self.au_mot("de 20 mètres")
        self.play(FadeIn(l1[3], shift=UP * 0.1), run_time=0.35)
        l2 = self.ligne([("donc un tour de", WHITE), ("80 m.", TOUR_C)], 32, buff=0.16)
        self.col(l2, 0.8, x)
        self.au_mot("donc un tour")
        self.play(FadeIn(l2[0], shift=UP * 0.1), Create(ca.grillage.copy().set_stroke(TOUR_C, 10)),
                  run_time=0.8)
        self.au_mot("de 80 mètres")
        self.play(FadeIn(l2[1], scale=1.15), run_time=0.4)
        l3 = self.ligne([("Même place pour les chèvres,", WHITE)], 30)
        self.col(l3, -0.5, x)
        ch = VGroup(*[chevre(1.0).move_to(P(-4.3, -0.2) + P(dx, dy))
                      for dx, dy in ((-0.5, 0.3), (0.4, -0.3), (0.0, -0.05))])
        self.au_mot("Même place pour les chèvres")
        self.play(FadeIn(l3, shift=UP * 0.1), FadeIn(ch), run_time=0.7)
        l4 = self.t("bien plus de grillage.", 34, ROUGE_ERREUR)
        self.col(l4, -1.5, x)
        self.au_mot("bien plus de grillage")
        self.play(FadeIn(l4, scale=1.12), run_time=0.5)
        self.insister(l4, 1.08, 0.25)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (réponse C) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        u = 0.85
        dd = demi_disque(1.2, u, P(-4.4, 0.5), couleur=HERBE_C, bord=HERBE_B)
        e = hors_audit(sur_fond(self.t("rayon 10 m", 22, BASE_C))).next_to(dd, DOWN, buff=0.12)

        def avant_q(sc):
            sc.play(FadeIn(dd), FadeIn(e), run_time=0.6)

        self.question_gauche("05-question", "05b-reponse",
                             ["Le tour du demi-disque ?"],
                             [self.choix("10π m"), self.choix("20π m"),
                              self.choix("10π + 20 m")], 2,
                             ["L'arc fait 10π m,", "et le diamètre de 20 m", "ferme la figure."],
                             -0.3,
                             couper={0: ("L'arc fait", "10π m,"),
                                     1: ("et le diamètre de", "20 m")},
                             avant_q=avant_q)

    # ── 06 : le piège ───────────────────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege", 0.65)
        tit = self.t("Attention au piège !", 48, ORANGE_Q).move_to(P(0, 3.15))
        self.au_mot("Attention au piège")
        self.play(Write(tit), run_time=0.4)
        u = 0.75
        ca = enclos_carre(2.4, u, P(-4.6, 0.6))
        ro = enclos_rond(1.1, u, P(-4.6, -1.9))
        x = -1.6
        l1 = self.bloc(["Deux enclos de même aire", "n'ont pas le même tour."], 32, ROUGE_ERREUR)
        self.col(l1, 2.0, x)
        self.au_mot("Deux enclos de même aire")
        self.play(FadeIn(l1[0], shift=UP * 0.1), FadeIn(ca), run_time=0.7)
        self.au_mot("n'ont pas le même tour")
        self.play(FadeIn(l1[1], shift=UP * 0.1), FadeIn(ro), run_time=0.7)
        l2 = self.bloc(["Plus la figure est ronde,", "moins il faut de grillage"], 32, VERT_OK)
        self.col(l2, 0.6, x)
        self.au_mot("Plus la figure est ronde")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.45)
        self.au_mot("moins il faut de grillage")
        self.play(FadeIn(l2[1], shift=UP * 0.1), Indicate(ro.grillage, color=TOUR_C, scale_factor=1.08),
                  run_time=0.7)
        l3 = self.t("pour la même surface.", 34, VERT_OK)
        self.col(l3, -0.7, x)
        self.au_mot("pour la même surface")
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.5)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (réponse B) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        u = 0.85
        ca = enclos_carre(2.2, u, P(-4.5, 1.2))
        e = hors_audit(sur_fond(self.t("aire 400 m²", 22, BASE_C))).next_to(ca, DOWN, buff=0.12)

        def avant_q(sc):
            sc.play(FadeIn(ca), FadeIn(e), run_time=0.6)

        self.question_gauche("07-question", "07b-reponse",
                             ["Son côté ?"],
                             [self.choix("100 m"), self.choix("20 m"), self.choix("40 m")], 1,
                             ["20 × 20 = 400 m².", "100 : 400 ÷ 4,", "le quart du tour."],
                             -0.3,
                             couper={0: ("20", "× 20", "= 400 m²."),
                                     1: ("100 :", "400", "÷ 4,")},
                             avant_q=avant_q)

    # ── 08 : le défi ────────────────────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        u = 0.8
        ca = enclos_carre(2.2, u, P(-4.7, 0.9))
        ro = enclos_rond(1.1, u, P(-4.7, -1.8))
        x = -0.6
        l0 = self.ligne([("Thierry a", WHITE), ("100 m", TOUR_C), ("de grillage.", TOUR_C)],
                        32, buff=0.14)
        self.col(l0, 2.0, x)
        self.au_mot("Thierry a")
        self.play(FadeIn(l0[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("100 mètres")
        self.play(FadeIn(l0[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("de grillage")
        self.play(FadeIn(l0[2], shift=UP * 0.1), run_time=0.3)
        l1 = self.bloc(["Il hésite entre un enclos carré", "et un enclos rond,"], 30, WHITE)
        self.col(l1, 1.0, x)
        self.au_mot("Il hésite entre un enclos carré")
        self.play(FadeIn(l1[0], shift=UP * 0.1), FadeIn(ca), run_time=0.8)
        self.au_mot("et un enclos rond")
        self.play(FadeIn(l1[1], shift=UP * 0.1), FadeIn(ro), run_time=0.8)
        l2 = self.t("en utilisant tout le grillage.", 30, TOUR_C)
        self.col(l2, 0.0, x)
        self.au_mot("en utilisant tout le grillage")
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.5)
        l3 = self.bloc(["Lequel donne le plus de place", "à ses chèvres ?"], 32, JAUNE_TITRE)
        self.col(l3, -1.2, x)
        self.au_mot("Lequel donne le plus de place")
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.7)
        self.pause_defi(y=-2.9)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        u = 0.55
        ca = enclos_carre(2.4, u, P(-5.4, 1.4))
        ro = enclos_rond(1.3, u, P(-5.4, -1.4))
        self.add(ca, ro)
        x = -3.4
        l1 = self.ligne([("Le carré :", WHITE), ("100", BLEU_D), ("÷ 4", BLEU_D),
                         ("= côté 25 m.", VERT_OK)], 28, buff=0.12)
        self.col(l1, 2.2, x)
        self.au_mot("Le carré")
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.3)
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.28)
        self.play(FadeIn(l1[2], shift=UP * 0.1), run_time=0.28)
        self.au_mot("côté 25 mètres")
        self.play(FadeIn(l1[3], shift=UP * 0.1), run_time=0.35)
        l2 = self.ligne([("Son aire :", BASE_C), ("25", BLEU_D), ("× 25", BLEU_D),
                         ("= 625 m².", VERT_OK)], 28, buff=0.12)
        self.col(l2, 1.4, x)
        self.au_mot("Son aire")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.3)
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.28)
        self.play(FadeIn(l2[2], shift=UP * 0.1), run_time=0.28)
        self.au_mot("625 mètres carrés")
        self.play(FadeIn(l2[3], shift=UP * 0.1), run_time=0.35)
        l3 = self.ligne([("Le rond :", WHITE), ("rayon ≈ 15,9 m.", VERT_OK)], 28, buff=0.14)
        self.col(l3, 0.5, x)
        self.au_mot("Le rond")
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("le rayon vaut environ 15,9 mètres")
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.4)
        l4 = self.ligne([("Son aire :", BASE_C), ("π × 15,9", BLEU_D), ("× 15,9", BLEU_D),
                         ("≈ 796 m².", VERT_OK)], 28, buff=0.12)
        self.col(l4, -0.3, x)
        self.au_mot("Son aire : pi fois")
        self.play(FadeIn(l4[0], shift=UP * 0.1), run_time=0.3)
        self.play(FadeIn(l4[1], shift=UP * 0.1), run_time=0.3)
        self.play(FadeIn(l4[2], shift=UP * 0.1), run_time=0.3)
        self.au_mot("environ 796 mètres carrés")
        self.play(FadeIn(l4[3], shift=UP * 0.1), run_time=0.4)
        l5 = self.ligne([("Le rond gagne,", VERT_OK), ("de 170 m².", VERT_OK)], 32, buff=0.16)
        self.col(l5, -1.4, x)
        self.au_mot("Le rond gagne")
        self.play(FadeIn(l5[0], scale=1.12), Indicate(ro.grillage, color=TOUR_C, scale_factor=1.08),
                  run_time=0.6)
        self.au_mot("de 170 mètres carrés")
        self.play(FadeIn(l5[1], shift=UP * 0.1), run_time=0.4)
        self.insister(l5[0], 1.08, 0.25)
        self.attendre_voix()

    # ── 09 ──────────────────────────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        fig = demi_disque(1.0, 0.9, ORIGIN, couleur=HERBE_C, bord=HERBE_B)
        lignes = self.finale_gauche(fig, textes=[
            ("Le tour d'un demi-disque", "comprend son diamètre."),
            ("À grillage égal, le rond donne", "plus de place que le carré."),
            ("Et l'aire ne se déduit jamais", "du périmètre tout seul.")], fs=28)
        self.add(fig)
        self.au_mot("Le tour d'un demi-disque")
        self.montrer_ligne(lignes[0], Indicate(fig.diam, color=VERT_OK, scale_factor=1.05))
        self.au_mot("À grillage égal")
        self.montrer_ligne(lignes[1])
        self.au_mot("Et l'aire ne se déduit jamais")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_demi_disque()
        self.ecran_calcul()
        self.ecran_comparer()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")
