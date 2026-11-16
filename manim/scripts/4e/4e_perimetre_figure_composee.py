# 4e_perimetre_figure_composee.py
# EleveAI — Maths 4e — série « Périmètre, aire, volume, solides », épisode P3 : LE PÉRIMÈTRE D'UNE
# FIGURE COMPOSÉE (micro aire_perimetre_figure ; 3e aire_perimetre_figure_composee), AVEC VOIX.
# Paysage 16:9, CEINTURE VERTE. Vidéo COMMUNE avec la 3e : à brancher par `aussi`.
# Décor et métier : Zahia, CONCEPTRICE DE PISTES DE BMX (centres sport, art-design).
# Mapping micro → écrans : 02 (on part d'un point, on fait le tour, un trait intérieur ne compte pas),
# 03 (l'arc du demi-cercle : π × 20 ÷ 2 = 10π ≈ 31,4 m), 04 (30 + 20 + 30 = 80, plus le virage),
# 06 (piège : le trait de coupe est sur le dessin, pas sur le contour), questions 05 (C : 5π m)
# et 07 (A : ne compte pas), défi 08 (60 + 31,4 ≈ 91,4 m, × 18 € ≈ 1 645 €).
# ⛔ Les milliers s'écrivent avec une ESPACE INSÉCABLE (U+00A0).
# Voix : manim/voix/4e-perimetre-figure-composee.json ; marques : 4e_perimetre_figure_composee_marques.json.
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/4e_perimetre_figure_composee.py PerimetreFigureComposee4e
# Sortie : manim/sorties/4e/maths/perimetre/23-perimetre-figure-composee/

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from volume_4e_commun import *  # noqa: E402,F403
from volume_4e_commun import piste, demi_disque, zahia, Paysage4e  # noqa: E402

TOUR_C = ORANGE_RETENUE
PISTE_C, PISTE_B = "#fb923c", "#7c2d12"


class PerimetreFigureComposee4e(Paysage4e):
    nom_voix = "4e-perimetre-figure-composee"
    fichier_marques = "4e_perimetre_figure_composee_marques.json"
    ceinture = "verte"

    def la_piste(self, droit=3.0, r=1.0, u=1.0, o=ORIGIN):
        """La piste de Zahia : trois lignes droites et un virage en demi-cercle."""
        return piste(droit, r, u, o, couleur=PISTE_C, bord=PISTE_B)

    # ── 00 ──────────────────────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Les figures composées", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Le périmètre d'une figure composée")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q = self.bloc(["Que compte-t-on,", "et que laisse-t-on ?"], 38)
        q.move_to(P(0, 0.35)).align_to(P(-6.2, 0), LEFT)
        pi_ = self.la_piste(2.2, 0.85, 0.9, P(1.8, -1.4))
        self.au_mot("Que compte-t-on")
        self.play(FadeIn(q[0], shift=UP * 0.2), FadeIn(pi_, scale=0.85), run_time=0.5)
        self.au_mot("et que laisse-t-on")
        self.play(FadeIn(q[1], shift=UP * 0.2), Indicate(pi_.arc, color=TOUR_C, scale_factor=1.05),
                  run_time=0.7)
        self.attendre_voix(marge=0.6)

    # ── 01 ──────────────────────────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        p = zahia(1.0).move_to(P(-5.2, 0.4))
        self.au_mot("Voici Zahia")
        nom = self.t("Zahia", 40, BLEU_CALCUL).next_to(p, UP, buff=0.25)
        self.play(FadeIn(p, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("Elle dessine des pistes de BMX")
        met = self.t("pistes de BMX", 22, BLEU_CALCUL).next_to(p, DOWN, buff=0.2)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.4)
        x = -2.8
        pi_ = self.la_piste(2.4, 0.9, 0.95, P(1.6, -2.2))
        l1 = self.bloc(["Sa piste a trois lignes droites", "et un virage arrondi."], 30, WHITE)
        self.col(l1, 2.0, x)
        self.au_mot("Sa piste a trois lignes droites")
        self.play(FadeIn(l1[0], shift=UP * 0.1), FadeIn(pi_.fond), Create(pi_.droits), run_time=0.9)
        self.au_mot("et un virage arrondi")
        self.play(FadeIn(l1[1], shift=UP * 0.1), Create(pi_.arc), run_time=0.8)
        l2 = self.t("Il faut une bordure tout autour.", 32, TOUR_C)
        self.col(l2, 0.8, x)
        self.au_mot("Il faut une bordure tout autour")
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.55)
        l3 = self.t("Combien de mètres ?", 36, JAUNE_TITRE)
        self.col(l3, -0.3, x)
        self.au_mot("Combien de mètres")
        self.play(FadeIn(l3, scale=1.1), run_time=0.5)
        self.attendre_voix()

    # ── 02 : faire le tour ──────────────────────────────────────────────────
    def ecran_faire_le_tour(self):
        self.ecran("02-faire-le-tour")
        u = 1.0
        pi_ = self.la_piste(2.6, 1.0, u, P(-6.0, -1.0))
        self.add(pi_)
        self.au_mot("La méthode est simple")
        tit = self.t("Faire le tour", 46, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.5)
        x = 0.9
        l1 = self.bloc(["On part d'un point,", "on fait le tour,"], 30, WHITE)
        self.col(l1, 2.0, x)
        self.au_mot("on part d'un point")
        d = Dot(pi_.coins[0], radius=0.11, color=TOUR_C)
        self.play(FadeIn(l1[0], shift=UP * 0.1), FadeIn(d, scale=0.6), run_time=0.5)
        contour = VGroup(pi_.droits.copy(), pi_.arc.copy()).set_stroke(TOUR_C, 9)
        self.au_mot("on fait le tour")
        self.play(FadeIn(l1[1], shift=UP * 0.1), Create(contour), run_time=1.1)
        l2 = self.t("et on additionne tout ce qu'on parcourt.", 28, VERT_OK)
        self.col(l2, 0.9, x)
        self.au_mot("et on additionne tout")
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.5)
        coupe = DashedLine(pi_.coins[1], pi_.coins[2], color=WHITE, stroke_width=4, dash_length=0.12)
        l3 = self.bloc(["Un trait qui passe à l'intérieur", "ne compte pas :"], 30, ROUGE_ERREUR)
        self.col(l3, -0.2, x)
        self.au_mot("Un trait qui passe à l'intérieur")
        self.play(FadeIn(l3[0], shift=UP * 0.1), Create(coupe), run_time=0.8)
        self.au_mot("ne compte pas")
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.4)
        l4 = self.t("on ne marche pas dessus.", 32, ROUGE_ERREUR)
        self.col(l4, -1.5, x)
        self.au_mot("on ne marche pas dessus")
        self.play(FadeIn(l4, shift=UP * 0.1), FadeOut(coupe), run_time=0.7)
        self.attendre_voix()

    # ── 03 : le demi-cercle ─────────────────────────────────────────────────
    def ecran_demi_cercle(self):
        self.ecran("03-le-demi-cercle")
        u = 1.0
        dd = demi_disque(1.1, u, P(-4.2, -0.6), couleur=PISTE_C, bord=PISTE_B)
        self.add(dd)
        self.au_mot("Le virage est un demi-cercle")
        tit = self.t("Le virage", 46, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.45)
        x = -0.8
        l1 = self.ligne([("Un demi-cercle de", WHITE), ("20 m", BASE_C), ("de diamètre.", BASE_C)],
                        30, buff=0.14)
        self.col(l1, 2.0, x)
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("20 mètres")
        self.play(FadeIn(l1[1], shift=UP * 0.1), Create(dd.diam), run_time=0.5)
        self.au_mot("de diamètre")
        self.play(FadeIn(l1[2], shift=UP * 0.1), run_time=0.3)
        l2 = self.ligne([("Un cercle entier :", WHITE), ("π × 20", BLEU_D)], 30, buff=0.16)
        self.col(l2, 1.1, x)
        self.au_mot("Un cercle entier")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("pi fois 20")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.4)
        l3 = self.ligne([("La moitié :", WHITE), ("π × 20", BLEU_D), ("÷ 2", BLEU_D),
                         ("= 10π m", VERT_OK)], 30, buff=0.14)
        self.col(l3, 0.2, x)
        self.au_mot("La moitié")
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.35)
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("divisé par 2")
        self.play(FadeIn(l3[2], shift=UP * 0.1), run_time=0.3)
        self.au_mot("10 pi mètres")
        self.play(FadeIn(l3[3], shift=UP * 0.1), Indicate(dd.arc, color=TOUR_C, scale_factor=1.04),
                  run_time=0.55)
        l4 = self.ligne([("Environ", WHITE), ("31,4 m", VERT_OK)], 36, buff=0.18)
        self.col(l4, -1.0, x)
        self.au_mot("Environ")
        self.play(FadeIn(l4[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("31,4 mètres")
        self.play(FadeIn(l4[1], scale=1.2), run_time=0.45)
        self.insister(l4[1], 1.1, 0.25)
        self.attendre_voix()

    # ── 04 : additionner ────────────────────────────────────────────────────
    def ecran_additionner(self):
        self.ecran("04-additionner")
        u = 1.0
        pi_ = self.la_piste(3.0, 1.0, u, P(-6.0, -1.1))
        self.add(pi_)
        self.au_mot("Les trois lignes droites")
        tit = self.t("On additionne", 46, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), Create(pi_.droits.copy().set_stroke(TOUR_C, 9)), run_time=0.9)
        x = 0.6
        l1 = self.ligne([("Les droites :", WHITE), ("30", BLEU_D), ("+ 20", BLEU_D), ("+ 30", BLEU_D),
                         ("= 80 m", VERT_OK)], 30, buff=0.14)
        self.col(l1, 2.0, x)
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.3)
        for k in range(1, 4):
            self.play(FadeIn(l1[k], shift=UP * 0.1), run_time=0.25)
        self.au_mot("soit 80 mètres")
        self.play(FadeIn(l1[4], shift=UP * 0.1), run_time=0.4)
        l2 = self.ligne([("Plus le virage :", TOUR_C), ("80", BLEU_D), ("+ 31,4", BLEU_D)],
                        30, buff=0.16)
        self.col(l2, 1.0, x)
        self.au_mot("Plus le virage")
        self.play(FadeIn(l2[0], shift=UP * 0.1), Create(pi_.arc.copy().set_stroke(TOUR_C, 9)),
                  run_time=0.7)
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.3)
        self.play(FadeIn(l2[2], shift=UP * 0.1), run_time=0.3)
        l3 = self.ligne([("≈ 111,4 m", VERT_OK), ("de bordure.", TOUR_C)], 36, buff=0.18)
        self.col(l3, -0.1, x)
        self.au_mot("environ 111,4 mètres")
        self.play(FadeIn(l3[0], scale=1.2), run_time=0.5)
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.3)
        self.insister(l3[0], 1.08, 0.25)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (réponse C) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        u = 0.9
        dd = demi_disque(1.0, u, P(-4.6, 0.7), couleur=PISTE_C, bord=PISTE_B)
        e = hors_audit(sur_fond(self.t("diamètre 10 m", 22, BASE_C))).next_to(dd, DOWN, buff=0.1)

        def avant_q(sc):
            sc.play(FadeIn(dd), FadeIn(e), run_time=0.6)

        self.question_gauche("05-question", "05b-reponse",
                             ["La longueur de l'arc ?"],
                             [self.choix("10π m"), self.choix("100π m"), self.choix("5π m")], 2,
                             ["π × 10 ÷ 2 = 5π m.", "10π : le cercle entier."],
                             -0.3,
                             couper={0: ("π × 10", "÷ 2", "= 5π m."),
                                     1: ("10π :", "le cercle entier.")},
                             avant_q=avant_q)

    # ── 06 : le piège ───────────────────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege", 0.65)
        tit = self.t("Attention au piège !", 48, ORANGE_Q).move_to(P(0, 3.15))
        self.au_mot("Attention au piège")
        self.play(Write(tit), run_time=0.4)
        u = 0.95
        pi_ = self.la_piste(2.6, 0.95, u, P(-6.0, -1.2))
        self.add(pi_)
        x = 0.7
        l1 = self.bloc(["Quand on coupe une figure", "en deux morceaux pour calculer,"], 30, WHITE)
        self.col(l1, 2.0, x)
        self.au_mot("Quand on coupe une figure")
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.7)
        coupe = DashedLine(pi_.coins[1], pi_.coins[2], color=ROUGE_ERREUR, stroke_width=6,
                           dash_length=0.12)
        l2 = self.bloc(["le trait de coupe apparaît", "sur le dessin,"], 30, ROUGE_ERREUR)
        self.col(l2, 0.9, x)
        self.au_mot("le trait de coupe apparaît")
        self.play(FadeIn(l2, shift=UP * 0.1), Create(coupe), run_time=0.8)
        l3 = self.t("mais il n'est pas sur le contour.", 30, VERT_OK)
        self.col(l3, -0.2, x)
        self.au_mot("mais il n'est pas sur le contour")
        self.play(FadeIn(l3, shift=UP * 0.1),
                  Create(VGroup(pi_.droits.copy(), pi_.arc.copy()).set_stroke(TOUR_C, 9)),
                  run_time=1.0)
        l4 = self.t("Il ne compte pas dans le périmètre.", 30, VERT_OK)
        self.col(l4, -1.2, x)
        self.au_mot("Il ne compte pas dans le périmètre")
        self.play(FadeIn(l4, shift=UP * 0.1), FadeOut(coupe), run_time=0.7)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (réponse A) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        u = 0.8
        pi_ = self.la_piste(2.4, 0.9, u, P(-6.0, 0.4))
        coupe = DashedLine(pi_.coins[1], pi_.coins[2], color=ROUGE_ERREUR, stroke_width=6,
                           dash_length=0.12)

        def avant_q(sc):
            sc.play(FadeIn(pi_), Create(coupe), run_time=0.7)

        self.question_gauche("07-question", "07b-reponse",
                             ["Le trait intérieur…"],
                             [self.choix("ne compte pas"), self.choix("compte une fois"),
                              self.choix("compte deux fois")], 0,
                             ["Le périmètre, c'est le tour :", "seul ce qui est sur le bord compte."],
                             -0.3, avant_q=avant_q)

    # ── 08 : le défi ────────────────────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        u = 1.0
        pi_ = self.la_piste(2.0, 1.0, u, P(-5.8, -0.9))
        x = 0.4
        l0 = self.ligne([("La piste :", WHITE), ("trois côtés de 20 m,", BASE_C)], 30, buff=0.16)
        self.col(l0, 2.0, x)
        self.au_mot("La piste de Zahia")
        self.play(FadeIn(l0[0], shift=UP * 0.1), FadeIn(pi_, scale=0.9), run_time=0.8)
        self.au_mot("trois côtés droits de 20 mètres")
        self.play(FadeIn(l0[1], shift=UP * 0.1), Create(pi_.droits.copy().set_stroke(TOUR_C, 9)),
                  run_time=0.8)
        l1 = self.ligne([("et un demi-cercle de", WHITE), ("20 m", BASE_C), ("pour fermer.", WHITE)],
                        30, buff=0.14)
        self.col(l1, 1.0, x)
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("20 mètres de diamètre pour fermer")
        self.play(FadeIn(l1[1], shift=UP * 0.1), Create(pi_.arc.copy().set_stroke(TOUR_C, 9)),
                  run_time=0.7)
        self.play(FadeIn(l1[2], shift=UP * 0.1), run_time=0.3)
        # ⛔ « Prix : » attendait le « prix » de « Quel est le prix ? », à la fin de la voix :
        #    l'étiquette prend un premier mot long dit AU BON ENDROIT (« bordure »).
        l2 = self.ligne([("La bordure :", WHITE), ("18 €", JAUNE_TITRE), ("le mètre.", JAUNE_TITRE)],
                        32, buff=0.16)
        self.col(l2, -0.1, x)
        self.au_mot("La bordure coûte")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("18 euros")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("le mètre")
        self.play(FadeIn(l2[2], shift=UP * 0.1), run_time=0.3)
        l3 = self.t("Quel est le prix ?", 34, JAUNE_TITRE)
        self.col(l3, -1.2, x)
        self.au_mot("Quel est le prix")
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.5)
        self.pause_defi(y=-2.9)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        u = 0.75
        pi_ = self.la_piste(2.0, 1.0, u, P(-5.9, 0.4))
        self.add(pi_)
        x = -2.4
        l1 = self.ligne([("Les droites :", WHITE), ("20", BLEU_D), ("× 3", BLEU_D), ("= 60 m", VERT_OK)],
                        30, buff=0.16)
        self.col(l1, 2.1, x)
        self.au_mot("Les droites")
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.35)
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.25)
        self.play(FadeIn(l1[2], shift=UP * 0.1), run_time=0.25)
        self.au_mot("60 mètres")
        self.play(FadeIn(l1[3], shift=UP * 0.1), run_time=0.35)
        l2 = self.ligne([("Le demi-cercle :", PISTE_C), ("π × 20", BLEU_D), ("÷ 2", BLEU_D),
                         ("≈ 31,4 m", VERT_OK)], 30, buff=0.14)
        self.col(l2, 1.2, x)
        self.au_mot("Le demi-cercle")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("pi fois 20")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("divisé par 2")
        self.play(FadeIn(l2[2], shift=UP * 0.1), run_time=0.3)
        self.au_mot("environ 31,4 mètres")
        self.play(FadeIn(l2[3], shift=UP * 0.1), run_time=0.4)
        l3 = self.ligne([("Le tour :", TOUR_C), ("60", BLEU_D), ("+ 31,4", BLEU_D),
                         ("≈ 91,4 m", VERT_OK)], 30, buff=0.16)
        self.col(l3, 0.3, x)
        self.au_mot("Le tour")
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.35)
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.25)
        self.play(FadeIn(l3[2], shift=UP * 0.1), run_time=0.25)
        self.au_mot("environ 91,4 mètres")
        self.play(FadeIn(l3[3], shift=UP * 0.1), run_time=0.4)
        l4 = self.ligne([("Le prix :", JAUNE_TITRE), ("91,4", BLEU_D), ("× 18", BLEU_D),
                         ("≈ 1 645 €", VERT_OK)], 32, buff=0.14)
        self.col(l4, -0.7, x)
        self.au_mot("Le prix")
        self.play(FadeIn(l4[0], shift=UP * 0.1), run_time=0.35)
        self.play(FadeIn(l4[1], shift=UP * 0.1), run_time=0.3)
        self.play(FadeIn(l4[2], shift=UP * 0.1), run_time=0.3)
        self.au_mot("environ 1 645 euros")
        self.play(FadeIn(l4[3], scale=1.2), run_time=0.45)
        self.insister(l4[3], 1.1, 0.25)
        self.attendre_voix()

    # ── 09 ──────────────────────────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        fig = self.la_piste(1.8, 0.8, 0.8, ORIGIN)
        lignes = self.finale_gauche(fig, textes=[
            ("Le périmètre d'une figure composée", "s'obtient en faisant le tour."),
            ("Un demi-cercle vaut π fois", "le diamètre, divisé par 2."),
            ("Les traits intérieurs", "ne comptent pas.")], fs=28)
        self.add(fig)
        self.au_mot("Le périmètre d'une figure composée")
        self.montrer_ligne(lignes[0], Indicate(fig, color=TOUR_C, scale_factor=1.04))
        self.au_mot("Un demi-cercle vaut")
        self.montrer_ligne(lignes[1], Indicate(fig.arc, color=TOUR_C, scale_factor=1.05))
        self.au_mot("Les traits intérieurs")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_faire_le_tour()
        self.ecran_demi_cercle()
        self.ecran_additionner()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")
