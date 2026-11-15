# aire_perimetre_rectangle.py
# EleveAI — Maths 6e — série « Périmètre », épisode P1 : LES FORMULES DU PÉRIMÈTRE (rectangle, carré)
# (micro aire_perimetre_rectangle, aussi aire_perimetre_carre ; notion aire_perimetre), AVEC VOIX.
# Paysage 16:9, CEINTURE VERTE. Short jumeau : film Ti Margo (guirlande d'une fenêtre carrée de 1,2 m : 4,8 m → A).
# Décor et métier : Lucas, PAYSAGISTE (centres : nature-ecologie, construction).
# Écrans : 02 (jardin 15 × 9 : P = 2 × (L + l) = 48 m), 03 (potager carré 6,5 m : P = 4 × c = 26 m),
# 04 (massif 12 m × 80 cm : même unité d'abord → 25,6 m), 06 (piège : les parenthèses),
# questions 05 (B) et 07 (A), défi 08 (18 m × 950 cm, portail 3 m → 52 m).
# Voix : manim/voix/6e-aire-perimetre-rectangle.json (validée le 15/11, Julie, débit −6) ;
# marques : python manim/scripts/6e/aire_perimetre_marques.py rectangle
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/6e/aire_perimetre_rectangle.py AirePerimetreRectangle6e
# python -m manim render -qh --disable_caching manim/scripts/6e/aire_perimetre_rectangle.py AirePerimetreRectangle6e -o eleveai-maths-6e-aire-perimetre-rectangle --media_dir manim/scripts/6e/media-aire-perimetre-01
# Sortie : manim/sorties/6e/maths/perimetre/01-rectangle/eleveai-maths-6e-aire-perimetre-rectangle.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from aire_perimetre_6e_commun import *  # noqa: E402,F403


def cloture(p, sw=8):
    return tour(p, CLOTURE, sw)


class AirePerimetreRectangle6e(PaysagePerimetre6e):
    nom_voix = "6e-aire-perimetre-rectangle"
    fichier_marques = "aire_perimetre_rectangle_marques.json"
    ceinture = "verte"

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Les formules du périmètre", self.identite, self.ceinture, y_ech=-2.45)
        r = rect(15, 9, 0.16, P(3.2, 0.5))
        c = rect(6.5, 6.5, 0.2, P(5.6, 0.5), TERRE, TERRE_B)
        self.au_mot("Les formules du périmètre")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), FadeIn(r), FadeIn(c), run_time=0.7)
        q = self.bloc(["Le rectangle et le carré,", "en une ligne."], 34)
        q.move_to(P(0, 0.3)).align_to(P(-6.2, 0), LEFT)
        self.au_mot("Le rectangle et le carré")
        self.play(FadeIn(q, shift=UP * 0.2), Create(cloture(r, 6)), Create(cloture(c, 6)), run_time=0.7)
        self.attendre_voix(marge=0.6)

    # ── 01 : Lucas, paysagiste ──────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        lu = lucas(1.0).move_to(P(-5.3, 0.1))
        self.au_mot("Voici Lucas")
        nom = self.t("Lucas", 42, CLOTURE).next_to(lu, UP, buff=0.2)
        self.play(FadeIn(lu, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("paysagiste")
        met = self.t("paysagiste", 30, CLOTURE).next_to(lu, DOWN, buff=0.15)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.35)
        p = rect(15, 9, 0.3, P(0.9, 0.9))
        arbres = VGroup(*[Circle(radius=0.28, fill_color="#22c55e", fill_opacity=1, stroke_color="#14532d",
                                 stroke_width=3).move_to(p.get_center() + P(dx, dy))
                          for dx, dy in ((-1.4, 0.4), (0.2, -0.3), (1.5, 0.5))])
        self.au_mot("il dessine et plante des jardins")
        self.play(FadeIn(p, scale=1.1), LaggedStart(*[GrowFromCenter(a) for a in arbres], lag_ratio=0.3),
                  run_time=0.8)
        self.au_mot("poser une clôture")
        self.play(Create(cloture(p, 9)), run_time=1.2)
        self.au_mot("il calcule toujours sa longueur")
        q = self.t("Quelle longueur de clôture ?", 36, JAUNE_TITRE).move_to(P(0.9, -1.5))
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.4)
        self.au_mot("il utilise une formule")
        f = self.t("Une formule !", 40, VERT_OK).move_to(P(0.9, -2.3))
        self.play(FadeIn(f, scale=1.2), run_time=0.4)
        self.attendre_voix()

    # ── 02 : le rectangle, P = 2 × (L + l) ─────────────────────────────────
    def ecran_rectangle(self):
        self.ecran("02-rectangle")
        p = rect(15, 9, 0.3, P(-3.5, 0.5))
        et = etiquettes(p, ["15 m", "9 m"], cotes=[0, 1], fs=28)
        self.au_mot("Un jardin rectangulaire")
        self.play(FadeIn(p, scale=1.1), run_time=0.4)
        self.au_mot("15 mètres de long")
        self.play(FadeIn(et[0], scale=1.3), run_time=0.3)
        self.au_mot("9 mètres de large")
        self.play(FadeIn(et[1], scale=1.3), run_time=0.3)
        self.au_mot("deux longueurs et deux largeurs")
        l0 = self.bloc(["Deux longueurs", "et deux largeurs."], 28, GRAY_B)
        self.col(l0, 2.55)
        self.play(FadeIn(l0, shift=UP * 0.1), *[Create(cote_tour(p, k)) for k in range(4)], run_time=0.45)
        self.au_mot("P égale 2 fois")
        f = self.t("P = 2 × (L + l)", 46, JAUNE_TITRE)
        self.col(f, 1.55)
        cadre = SurroundingRectangle(f, color=JAUNE_TITRE, buff=0.16, corner_radius=0.12, stroke_width=4)
        self.play(FadeIn(f, shift=UP * 0.1), Create(cadre), run_time=0.5)
        self.au_mot("L, c'est la longueur")
        d1 = self.t("L : la longueur", 30, ROSE_D)
        self.col(d1, 0.6)
        self.play(FadeIn(d1, shift=UP * 0.1), run_time=0.3)
        self.au_mot("l, c'est la largeur")
        d2 = self.t("l : la largeur", 30, ROSE_D)
        self.col(d2, 0.05)
        self.play(FadeIn(d2, shift=UP * 0.1), run_time=0.3)
        self.au_mot("15 plus 9")
        a = self.t("15 + 9", 42, BLEU_D)
        self.col(a, -0.75)
        self.play(FadeIn(a, shift=UP * 0.1), run_time=0.3)
        self.au_mot("24")
        a2 = self.t("= 24", 42, VERT_OK).next_to(a, RIGHT, buff=0.25)
        self.play(FadeIn(a2, shift=UP * 0.1), run_time=0.3)
        self.au_mot("Fois 2")
        b = self.ligne([("× 2", BLEU_D), ("= 48 m", VERT_OK)], 42, buff=0.25)
        b.next_to(a2, DOWN, buff=0.3)
        b.shift(RIGHT * (a2.get_left()[0] - b[1].get_left()[0]))
        self.play(FadeIn(b[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("48 mètres de clôture")
        self.play(FadeIn(b[1], shift=UP * 0.1), Create(cloture(p, 9)), run_time=0.45)
        self.attendre_voix()

    # ── 03 : le carré, P = 4 × c ────────────────────────────────────────────
    def ecran_carre(self):
        self.ecran("03-carre")
        p = rect(6.5, 6.5, 0.5, P(-3.5, 0.4), TERRE, TERRE_B)
        cc = etiquettes(p, ["c"] * 4, fs=32, couleur=ROSE_D)
        self.au_mot("Un potager carré")
        l0 = self.t("Un potager carré", 36, JAUNE_TITRE)
        self.col(l0, 2.45)
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(p, scale=1.1), run_time=0.45)
        self.au_mot("4 côtés égaux")
        l1 = self.t("4 côtés égaux", 34)
        self.col(l1, 1.8)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.3)
        self.au_mot("Si son côté mesure c")
        self.play(FadeIn(cc, scale=1.3), run_time=0.4)
        self.au_mot("P égale 4 fois c")
        f = self.t("P = 4 × c", 46, JAUNE_TITRE)
        self.col(f, 0.9)
        cadre = SurroundingRectangle(f, color=JAUNE_TITRE, buff=0.16, corner_radius=0.12, stroke_width=4)
        self.play(FadeIn(f, shift=UP * 0.1), Create(cadre), Create(cloture(p, 8)), run_time=0.5)
        self.au_mot("6,5 mètres")
        six = etiquettes(p, ["6,5 m"], cotes=[0], fs=28)
        l2 = self.ligne([("6,5 m", WHITE), ("de côté", WHITE)], 34, buff=0.2)
        self.col(l2, -0.05)
        self.play(FadeOut(cc[0]), FadeIn(six, scale=1.3), FadeIn(l2, shift=UP * 0.1), run_time=0.4)
        self.au_mot("4 fois 6,5")
        a = self.t("4 × 6,5", 44, BLEU_D)
        self.col(a, -0.9)
        self.play(FadeIn(a, shift=UP * 0.1), run_time=0.3)
        self.au_mot("26 mètres")
        a2 = self.t("= 26 m", 44, VERT_OK).next_to(a, RIGHT, buff=0.25)
        self.play(FadeIn(a2, scale=1.1), run_time=0.35)
        self.attendre_voix()

    # ── 04 : la même unité d'abord ──────────────────────────────────────────
    def ecran_unites(self):
        self.ecran("04-unites")
        self.au_mot("Avant d'utiliser la formule")
        l0 = self.t("Avant la formule :", 34, GRAY_B)
        self.col(l0, 2.5)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.3)
        self.au_mot("dans la même unité")
        l1 = self.t("la même unité !", 38, ROUGE_ERREUR)
        self.col(l1, 1.85)
        self.play(FadeIn(l1, scale=1.1), run_time=0.35)
        p = rect(12, 2, 0.36, P(-3.5, 0.6), MASSIF, MASSIF_B)
        et = etiquettes(p, ["12 m", "80 cm"], cotes=[0, 1], fs=26)
        self.au_mot("Un massif de fleurs")
        self.play(FadeIn(p, scale=1.1), run_time=0.4)
        self.au_mot("12 mètres")
        self.play(FadeIn(et[0], scale=1.3), run_time=0.25)
        self.au_mot("80 centimètres")
        self.play(FadeIn(et[1], scale=1.3), run_time=0.25)
        self.au_mot("80 centimètres", 2)
        c = self.ligne([("80 cm", ROSE_D), ("= 0,8 m", VERT_OK)], 38, buff=0.25)
        self.col(c, 1.0)
        huit = etiquette(p, 1, "0,8 m", 26, VERT_OK)
        self.play(FadeIn(c[0], shift=UP * 0.1), Indicate(et[1], scale_factor=1.3), run_time=0.35)
        self.au_mot("c'est 0,8 mètre")
        self.play(FadeIn(c[1], shift=UP * 0.1), FadeOut(et[1]), FadeIn(huit, scale=1.3), run_time=0.4)
        self.au_mot("12 plus 0,8")
        a = self.t("12 + 0,8", 42, BLEU_D)
        self.col(a, 0.05)
        self.play(FadeIn(a, shift=UP * 0.1), run_time=0.3)
        self.au_mot("12,8")
        a2 = self.t("= 12,8", 42, VERT_OK).next_to(a, RIGHT, buff=0.25)
        self.play(FadeIn(a2, shift=UP * 0.1), run_time=0.3)
        self.au_mot("Fois 2")
        b = self.ligne([("× 2", BLEU_D), ("= 25,6 m", VERT_OK)], 42, buff=0.25)
        b.next_to(a2, DOWN, buff=0.3)
        b.shift(RIGHT * (a2.get_left()[0] - b[1].get_left()[0]))
        self.play(FadeIn(b[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("25,6 mètres")
        self.play(FadeIn(b[1], shift=UP * 0.1), Create(cloture(p, 7)), run_time=0.45)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (réponse B) ─────────────────────────────────────────
    def figure_q1(self):
        p = poly(pts_rect(7, 4, 0.42), CARREAU, CARREAU_B).move_to(P(-3.7, 1.55))
        return VGroup(p, etiquettes(p, ["7 cm", "4 cm"], cotes=[0, 1], fs=26))

    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        g = self.figure_q1()

        def autres_q(sc):
            sc.play(FadeIn(g), run_time=0.35)

        def apres(sc):
            sc.play(Create(tour(g[0])), run_time=0.6)

        self.question_gauche("05-question", "05b-reponse",
                             ["Un rectangle mesure", "7 cm sur 4 cm.", "Quel est son périmètre ?"],
                             [self.choix("11 cm"), self.choix("22 cm"), self.choix("28 cm")], 1,
                             ["7 + 4 = 11,", "× 2 = 22 cm.", "28 = 7 × 4 :", "ce n'est pas le tour."],
                             -0.45, mot_q="Un rectangle", autres_q=autres_q, autres_r=apres)

    # ── 06 : le piège des parenthèses ───────────────────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        self.au_mot("Attention")
        tit = self.t("Attention au piège !", 46, ROUGE_ERREUR)
        gauche(tit, -6.2, 3.05)
        self.play(Write(tit), run_time=0.35)
        p = rect(15, 9, 0.27, P(-3.5, 0.2))
        et = etiquettes(p, ["15 m", "9 m", "15 m", "9 m"], fs=26)
        self.add(p, et)
        self.au_mot("les parenthèses comptent")
        l0 = self.t("Les parenthèses comptent !", 32, JAUNE_TITRE)
        self.col(l0, 2.2)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.35)
        self.au_mot("2 fois 15 plus 9")
        a = self.t("2 × 15 + 9", 40, ROUGE_ERREUR)
        self.col(a, 1.35)
        self.play(FadeIn(a, shift=UP * 0.1), run_time=0.3)
        self.au_mot("30 plus 9")
        a2 = self.t("= 30 + 9", 40, ROUGE_ERREUR).next_to(a, DOWN, buff=0.22).align_to(a, LEFT)
        self.play(FadeIn(a2, shift=UP * 0.1), Create(cote_tour(p, 0, ROUGE_ERREUR, 10)),
                  Create(cote_tour(p, 2, ROUGE_ERREUR, 10)), Create(cote_tour(p, 1, ROUGE_ERREUR, 10)), run_time=0.45)
        self.au_mot("39")
        a3 = self.t("= 39", 40, ROUGE_ERREUR).next_to(a2, RIGHT, buff=0.25)
        self.play(FadeIn(a3, shift=UP * 0.1), run_time=0.25)
        self.au_mot("c'est faux")
        barre = Line(a2.get_left() + LEFT * 0.05, a3.get_right() + RIGHT * 0.05, color=ROUGE_ERREUR,
                     stroke_width=6)
        self.play(Create(barre), run_time=0.25)
        self.au_mot("on a oublié une largeur")
        l1 = self.t("Une largeur oubliée !", 32, ROUGE_ERREUR)
        self.col(l1, -0.35)
        self.play(FadeIn(l1, shift=UP * 0.1), Indicate(et[3], color=ROUGE_ERREUR, scale_factor=1.4), run_time=0.5)
        self.au_mot("Avec les parenthèses")
        f = hors_audit(self.t("2 × (15 + 9)", 40, VERT_OK))
        self.col(f, -1.15)
        self.play(FadeIn(f, shift=UP * 0.1), run_time=0.35)
        self.au_mot("15 plus 9, 24")
        b = self.t("= 2 × 24", 40, VERT_OK).next_to(f, DOWN, buff=0.22).align_to(f, LEFT)
        self.play(FadeIn(b, shift=UP * 0.1), run_time=0.3)
        self.au_mot("48")
        b2 = self.t("= 48", 40, VERT_OK).next_to(b, RIGHT, buff=0.25)
        self.play(FadeIn(b2, scale=1.1), Create(cloture(p, 9)), run_time=0.4)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (réponse A) ─────────────────────────────────────────
    def figure_q2(self):
        p = poly(pts_rect(2.5, 2.5, 0.8), TERRE, TERRE_B).move_to(P(-3.7, 1.55))
        return VGroup(p, etiquettes(p, ["2,5 cm"], cotes=[0], fs=26))

    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        g = self.figure_q2()

        def autres_q(sc):
            sc.play(FadeIn(g), run_time=0.35)

        def apres(sc):
            sc.play(Create(tour(g[0])), run_time=0.6)

        self.question_gauche("07-question", "07b-reponse",
                             ["Un carré a 2,5 cm de côté.", "Quel est son périmètre ?"],
                             [self.choix("10 cm"), self.choix("6,25 cm"), self.choix("5 cm")], 0,
                             ["P = 4 × c :", "4 × 2,5 = 10 cm.", "6,25 = 2,5 × 2,5 :", "c'est son aire,",
                              "pas son tour."],
                             -0.45, mot_q="Un carré", autres_q=autres_q, autres_r=apres)

    # ── 08 : le défi (18 m sur 950 cm, portail de 3 m) ──────────────────────
    def figure_defi(self, pos=P(-4.1, 0.45)):
        p = rect(18, 9.5, 0.24, pos)
        et = etiquettes(p, ["18 m", "950 cm"], cotes=[0, 1], fs=26)
        v = p.get_vertices()
        a = v[2] + (v[3] - v[2]) * 0.4
        b = a + (v[3] - v[2]) / 18 * 3
        portail = Line(a, b, color="#fde047", stroke_width=12)
        return p, et, portail, (a, b)

    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        p, et, portail, _ = self.figure_defi()
        self.au_mot("un jardin rectangulaire")
        l0 = self.t("Un jardin rectangulaire :", 32)
        self.col(l0, 2.2, 0.35)
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(p, scale=1.1), run_time=0.45)
        self.au_mot("18 mètres sur 950 centimètres")
        l0b = self.t("18 m sur 950 cm", 34, JAUNE_TITRE)
        self.col(l0b, 1.6, 0.35)
        self.play(FadeIn(l0b, shift=UP * 0.1), FadeIn(et), run_time=0.35)
        self.au_mot("un portail de 3 mètres")
        l1 = self.bloc(["Un portail de 3 m", "sans clôture."], 34)
        self.col(l1, 0.65, 0.35)
        self.play(FadeIn(l1, shift=UP * 0.1), Create(portail), run_time=0.5)
        self.au_mot("Combien de mètres de clôture")
        q = self.bloc(["Combien de mètres", "de clôture ?"], 38, JAUNE_TITRE)
        self.col(q, -0.6, 0.35)
        self.play(FadeIn(q, shift=UP * 0.1), Wiggle(portail), run_time=0.5)
        self.pause_defi(y=-1.9)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        p, et, portail, (a_, b_) = self.figure_defi()
        self.add(p, et, portail)
        self.au_mot("950 centimètres")
        c = self.ligne([("950 cm", ROSE_D), ("= 9,5 m", VERT_OK)], 36, buff=0.22)
        self.col(c, 2.35, 0.35)
        neuf = etiquette(p, 1, "9,5 m", 26, VERT_OK)
        self.play(FadeIn(c[0], shift=UP * 0.1), Indicate(et[1], scale_factor=1.3), run_time=0.35)
        self.au_mot("9,5 mètres")
        self.play(FadeIn(c[1], shift=UP * 0.1), FadeOut(et[1]), FadeIn(neuf, scale=1.3), run_time=0.4)
        self.au_mot("18 plus 9,5")
        f = self.t("P = 2 × (18 + 9,5)", 36, BLEU_D)
        self.col(f, 1.6, 0.35)
        self.play(FadeIn(f, shift=UP * 0.1), run_time=0.35)
        self.au_mot("2 fois 27,5")
        a = self.t("= 2 × 27,5", 36, BLEU_D)
        self.col(a, 0.95, 0.35)
        self.play(FadeIn(a, shift=UP * 0.1), run_time=0.3)
        self.au_mot("55 mètres")
        a2 = self.t("= 55 m", 36, VERT_OK).next_to(a, RIGHT, buff=0.2)
        v = p.get_vertices()
        clo = VMobject().set_points_as_corners([b_, v[3], v[0], v[1], v[2], a_]).set_stroke(CLOTURE, 8)
        self.play(FadeIn(a2, shift=UP * 0.1), Create(clo), run_time=0.6)
        self.au_mot("Moins le portail")
        l1 = self.t("Moins le portail :", 32, ROSE_D)
        self.col(l1, 0.15, 0.35)
        self.play(FadeIn(l1, shift=UP * 0.1), Indicate(portail, color=YELLOW, scale_factor=1.2), run_time=0.45)
        self.au_mot("55 moins 3")
        d = self.t("55 − 3", 40, BLEU_D)
        self.col(d, -0.55, 0.35)
        self.play(FadeIn(d, shift=UP * 0.1), run_time=0.3)
        self.au_mot("52 mètres de clôture")
        d2 = self.t("= 52 m", 40, VERT_OK).next_to(d, RIGHT, buff=0.2)
        self.play(FadeIn(d2, shift=UP * 0.1), run_time=0.3)
        res = hors_audit(self.t("52 m de clôture", 38, VERT_OK))
        self.col(res, -1.4, 0.35)
        cadre = SurroundingRectangle(res, color=VERT_OK, buff=0.18, corner_radius=0.12, stroke_width=4)
        self.play(FadeIn(res, scale=1.1), Create(cadre), run_time=0.45)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        r = rect(15, 9, 0.13, P(0, 0.85))
        c = rect(6.5, 6.5, 0.2, P(0, -0.85), TERRE, TERRE_B)
        fig = VGroup(r, cloture(r, 6), c, cloture(c, 6))
        lignes = self.finale_gauche(fig, textes=[
            ("Rectangle :", "P = 2 × (L + l)"),
            ("Carré :", "P = 4 × c"),
            ("Même unité,", "et les parenthèses d'abord !")], fs=30)
        self.add(fig)
        self.au_mot("Rectangle")
        self.montrer_ligne(lignes[0], Indicate(r, scale_factor=1.05))
        self.au_mot("Carré")
        self.montrer_ligne(lignes[1], Indicate(c, scale_factor=1.05))
        self.au_mot("Toutes les longueurs")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_rectangle()
        self.ecran_carre()
        self.ecran_unites()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")
