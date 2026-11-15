# aire_perimetre_defi.py
# EleveAI — Maths 6e — série « Périmètre », épisode P2 : DÉFI — QUE DEVIENT LE TOUR QUAND ON CHANGE LES CÔTÉS ?
# (micro aire_perimetre_defi, notion aire_perimetre), AVEC VOIX. Paysage 16:9, CEINTURE BLEUE.
# Short jumeau : film Ti Margo (ruban de 20 cm : la boîte 7 × 3 → C).
# Décor et métier : Chloé, FLEURISTE (centres : art-design, mode).
# Écrans : 01 (boîte 7 × 3 : 20 cm de ruban), 02 (+1 cm à la longueur → +2 cm au tour), 03 (côtés doublés →
# périmètre doublé), 04 (même tour : 9 × 1, 6 × 4, carré de 5), 06 (piège : même tour ≠ même surface, 9 / 25),
# questions 05 (B) et 07 (A), défi 08 (ruban de 24 cm, L = 2 l → 8 × 4).
# Voix : manim/voix/6e-aire-perimetre-defi.json (validée le 15/11, Julie, débit −6) ;
# marques : python manim/scripts/6e/aire_perimetre_marques.py defi
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/6e/aire_perimetre_defi.py AirePerimetreDefi6e
# python -m manim render -qh --disable_caching manim/scripts/6e/aire_perimetre_defi.py AirePerimetreDefi6e -o eleveai-maths-6e-aire-perimetre-defi --media_dir manim/scripts/6e/media-aire-perimetre-02
# Sortie : manim/sorties/6e/maths/perimetre/02-defi/eleveai-maths-6e-aire-perimetre-defi.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from aire_perimetre_6e_commun import *  # noqa: E402,F403

RUBAN = "#facc15"   # le ruban doré : le tour


def boite(L, l, u, pos, fond=BOITE, bord=BOITE_B):
    return rect(L, l, u, pos, fond, bord)


def ruban(p, sw=8):
    return tour(p, RUBAN, sw)


class AirePerimetreDefi6e(PaysagePerimetre6e):
    nom_voix = "6e-aire-perimetre-defi"
    fichier_marques = "aire_perimetre_defi_marques.json"
    ceinture = "bleue"

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Défi de périmètre", self.identite, self.ceinture, y_ech=-2.45)
        b1 = boite(7, 3, 0.3, P(3.4, 0.9))
        b2 = boite(14, 6, 0.3, P(3.4, -0.6), "#c4b5fd", "#4c1d95").scale(0.6).move_to(P(3.4, -0.9))
        self.au_mot("Défi de périmètre")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), FadeIn(b1), FadeIn(b2), run_time=0.7)
        q = self.bloc(["Que devient le tour", "quand on change les côtés ?"], 34)
        q.move_to(P(0, 0.3)).align_to(P(-6.2, 0), LEFT)
        self.au_mot("Que devient le tour")
        self.play(FadeIn(q, shift=UP * 0.2), Create(ruban(b1, 6)), Create(ruban(b2, 6)), run_time=0.7)
        self.attendre_voix(marge=0.6)

    # ── 01 : Chloé, fleuriste ; la boîte 7 × 3 ──────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        ch = chloe(1.0).move_to(P(-5.3, 0.1))
        self.au_mot("Voici Chloé")
        nom = self.t("Chloé", 42, MASSIF).next_to(ch, UP, buff=0.2)
        self.play(FadeIn(ch, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("fleuriste")
        met = self.t("fleuriste", 30, MASSIF).next_to(ch, DOWN, buff=0.15)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.35)
        b = boite(7, 3, 0.45, P(-1.2, 1.2))
        fleurs = VGroup(*[Circle(radius=0.16, fill_color=c, fill_opacity=1, stroke_width=0)
                          .move_to(b.get_top() + P(dx, 0.18)) for dx, c in
                          ((-1.0, "#f43f5e"), (-0.3, "#fde047"), (0.4, "#a855f7"), (1.1, "#f97316"))])
        self.au_mot("boîte de fleurs")
        self.play(FadeIn(b, scale=1.1), FadeIn(fleurs, shift=DOWN * 0.1), run_time=0.5)
        self.au_mot("un ruban qui fait tout le tour")
        self.play(Create(ruban(b, 9)), run_time=1.0)
        et = etiquettes(b, ["7 cm", "3 cm"], cotes=[0, 1], fs=26)
        et[0].shift(UP * 0.35)
        self.au_mot("7 centimètres sur 3 centimètres")
        self.play(FadeIn(et, scale=1.3), run_time=0.35)
        self.au_mot("7 plus 3")
        a = self.t("7 + 3", 42, BLEU_D)
        self.col(a, -0.55)
        self.play(FadeIn(a, shift=UP * 0.1), run_time=0.3)
        self.au_mot("10")
        a2 = self.t("= 10", 42, VERT_OK).next_to(a, RIGHT, buff=0.25)
        self.play(FadeIn(a2, shift=UP * 0.1), run_time=0.3)
        self.au_mot("fois 2")
        b2 = self.ligne([("× 2", BLEU_D), ("= 20 cm", VERT_OK)], 42, buff=0.25)
        b2.next_to(a2, DOWN, buff=0.3)
        b2.shift(RIGHT * (a2.get_left()[0] - b2[1].get_left()[0]))
        self.play(FadeIn(b2[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("20 centimètres de ruban")
        self.play(FadeIn(b2[1], scale=1.1), run_time=0.35)
        self.attendre_voix()

    # ── 02 : +1 cm à la longueur → +2 cm au tour ────────────────────────────
    def ecran_allonger(self):
        self.ecran("02-allonger")
        b = boite(7, 3, 0.55, P(-3.6, 1.0))
        self.add(b, etiquettes(b, ["7 cm", "3 cm"], cotes=[0, 1], fs=26))
        self.au_mot("plus longue d'1 centimètre")
        l0 = self.t("+ 1 cm de longueur", 34, JAUNE_TITRE)
        self.col(l0, 2.45)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.35)
        b8 = boite(8, 3, 0.55, P(-3.6, -1.15), "#c4b5fd", "#4c1d95")
        et8 = etiquettes(b8, ["3 cm", "8 cm"], cotes=[1, 2], fs=26)
        self.au_mot("8 centimètres sur 3")
        self.play(FadeIn(b8, shift=DOWN * 0.2), FadeIn(et8), run_time=0.45)
        self.au_mot("n'augmente pas d'1 centimètre")
        l1 = self.t("Le ruban : pas + 1 cm…", 32, ROUGE_ERREUR)
        self.col(l1, 1.75)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.35)
        self.au_mot("mais de 2")
        l2 = self.t("mais + 2 cm !", 38, VERT_OK)
        self.col(l2, 1.05)
        self.play(FadeIn(l2, scale=1.1), run_time=0.35)
        self.au_mot("8 plus 3")
        a = self.t("8 + 3", 42, BLEU_D)
        self.col(a, 0.2)
        self.play(FadeIn(a, shift=UP * 0.1), run_time=0.3)
        self.au_mot("11")
        a2 = self.t("= 11", 42, VERT_OK).next_to(a, RIGHT, buff=0.25)
        self.play(FadeIn(a2, shift=UP * 0.1), run_time=0.3)
        self.au_mot("fois 2, 22")
        a3 = self.ligne([("× 2", BLEU_D), ("= 22", VERT_OK)], 42, buff=0.25)
        a3.next_to(a2, DOWN, buff=0.3)
        a3.shift(RIGHT * (a2.get_left()[0] - a3[1].get_left()[0]))
        self.play(FadeIn(a3, shift=UP * 0.1), Create(ruban(b8, 8)), run_time=0.4)
        self.au_mot("Pourquoi")
        q = self.t("Pourquoi ?", 36, JAUNE_TITRE)
        self.col(q, -1.4)
        self.play(FadeIn(q, shift=UP * 0.1), run_time=0.3)
        self.au_mot("La longueur apparaît deux fois")
        l3 = self.bloc(["La longueur compte", "deux fois dans le tour."], 30, ROSE_D)
        self.col(l3, -2.15)
        self.play(FadeIn(l3, shift=UP * 0.1), Create(cote_tour(b8, 0, ROSE_D, 10)),
                  Create(cote_tour(b8, 2, ROSE_D, 10)), run_time=0.5)
        self.attendre_voix()

    # ── 03 : tous les côtés doublés → périmètre doublé ─────────────────────
    def ecran_doubler(self):
        self.ecran("03-doubler")
        b = boite(7, 3, 0.3, P(-4.6, 1.6))
        self.add(b, etiquettes(b, ["7", "3"], cotes=[0, 1], fs=24))
        self.au_mot("on double tous les côtés")
        l0 = self.t("On double tous les côtés", 36, JAUNE_TITRE)
        self.col(l0, 2.45)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.35)
        b2 = boite(14, 6, 0.3, P(-3.6, -0.9), "#c4b5fd", "#4c1d95")
        et2 = etiquettes(b2, ["14 cm", "6 cm"], cotes=[0, 1], fs=26)
        self.au_mot("14 centimètres sur 6")
        self.play(TransformFromCopy(b, b2), FadeIn(et2), run_time=0.6)
        self.au_mot("14 plus 6")
        a = self.t("14 + 6", 42, BLEU_D)
        self.col(a, 1.5)
        self.play(FadeIn(a, shift=UP * 0.1), run_time=0.3)
        self.au_mot("20, fois 2")
        a2 = self.t("= 20", 42, VERT_OK).next_to(a, RIGHT, buff=0.25)
        self.play(FadeIn(a2, shift=UP * 0.1), run_time=0.3)
        b3 = self.ligne([("× 2", BLEU_D), ("= 40 cm", VERT_OK)], 42, buff=0.25)
        b3.next_to(a2, DOWN, buff=0.3)
        b3.shift(RIGHT * (a2.get_left()[0] - b3[1].get_left()[0]))
        self.play(FadeIn(b3[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("40 centimètres")
        self.play(FadeIn(b3[1], shift=UP * 0.1), Create(ruban(b2, 8)), run_time=0.45)
        self.au_mot("Le périmètre double aussi")
        l1 = self.t("Le périmètre double aussi !", 32, VERT_OK)
        self.col(l1, -0.3)
        self.play(FadeIn(l1, scale=1.1), run_time=0.35)
        self.au_mot("20 fois 2, 40")
        c = self.t("20 × 2 = 40", 42, VERT_OK)
        self.col(c, -1.1)
        cadre = SurroundingRectangle(c, color=VERT_OK, buff=0.16, corner_radius=0.12, stroke_width=4)
        self.play(FadeIn(c, shift=UP * 0.1), Create(cadre), run_time=0.4)
        self.attendre_voix()

    # ── 04 : même tour, formes différentes ──────────────────────────────────
    def trois_boites(self):
        u = 0.32
        a = boite(9, 1, u, P(-4.2, 1.3))
        b = boite(6, 4, u, P(-4.9, -0.6), "#c4b5fd", "#4c1d95")
        c = boite(5, 5, u, P(-2.5, -0.75), "#fdba74", "#7c2d12")
        return a, b, c

    def ecran_meme_tour(self):
        self.ecran("04-meme-tour")
        self.au_mot("Avec 20 centimètres de ruban")
        l0 = self.ligne([("20 cm", RUBAN), ("de ruban", RUBAN)], 38, buff=0.22)
        self.col(l0, 2.45)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.35)
        a, b, c = self.trois_boites()
        self.au_mot("9 sur 1")
        la = self.t("9 sur 1", 34)
        self.col(la, 1.55)
        self.play(FadeIn(a, scale=1.1), Create(ruban(a, 6)), FadeIn(la, shift=UP * 0.1), run_time=0.45)
        self.au_mot("6 sur 4")
        lb = self.t("6 sur 4", 34)
        self.col(lb, 0.85)
        self.play(FadeIn(b, scale=1.1), Create(ruban(b, 6)), FadeIn(lb, shift=UP * 0.1), run_time=0.45)
        self.au_mot("un carré de 5")
        lc = self.t("un carré de 5", 34)
        self.col(lc, 0.15)
        self.play(FadeIn(c, scale=1.1), Create(ruban(c, 6)), FadeIn(lc, shift=UP * 0.1), run_time=0.45)
        self.au_mot("Même tour")
        res = hors_audit(self.bloc(["Même tour,", "formes différentes."], 38, VERT_OK))
        self.col(res, -1.05)
        cadre = SurroundingRectangle(res, color=VERT_OK, buff=0.18, corner_radius=0.12, stroke_width=4)
        self.play(FadeIn(res, scale=1.1), Create(cadre), run_time=0.45)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (réponse B) ─────────────────────────────────────────
    def figure_q1(self):
        p = poly(pts_rect(6, 6, 0.3), CARREAU, CARREAU_B).move_to(P(-3.7, 1.55))
        return VGroup(p, etiquettes(p, ["6 cm"], cotes=[0], fs=26))

    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        g = self.figure_q1()

        def autres_q(sc):
            sc.play(FadeIn(g), run_time=0.35)

        def apres(sc):
            sc.play(Create(tour(g[0])), run_time=0.6)

        self.question_gauche("05-question", "05b-reponse",
                             ["Un carré a 6 cm de côté.", "On ajoute 1 cm à chaque côté.",
                              "De combien augmente", "son périmètre ?"],
                             [self.choix("1 cm"), self.choix("4 cm"), self.choix("2 cm")], 1,
                             ["Le carré a 4 côtés,", "chacun grandit d'1 cm :", "4 cm de plus.",
                              "6 × 4 = 24 ; 7 × 4 = 28 ;", "28 − 24 = 4."],
                             -0.45, mot_q="Un carré", autres_q=autres_q, autres_r=apres, couper={2: ("4 cm", "de plus.")})

    # ── 06 : le piège (même tour ≠ même surface) ────────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        self.au_mot("Attention")
        tit = self.t("Attention au piège !", 46, ROUGE_ERREUR)
        gauche(tit, -6.2, 3.05)
        self.play(Write(tit), run_time=0.35)
        self.au_mot("Même périmètre ne veut pas dire même surface")
        l0 = self.bloc(["Même périmètre", "≠ même surface !"], 34, JAUNE_TITRE)
        self.col(l0, 2.15)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.4)
        u = 0.42
        a = rect_cases(9, 1, u, "#f9a8d4", BOITE_B).move_to(P(-3.9, 1.5))
        c = rect_cases(5, 5, 0.38, "#fdba74", "#7c2d12").move_to(P(-4.8, -0.95))
        self.au_mot("La boîte de 9 sur 1")
        la = self.t("9 sur 1", 30).next_to(a, UP, buff=0.12)
        self.play(FadeIn(a, scale=1.05), FadeIn(la), run_time=0.4)
        self.au_mot("le carré de 5")
        lc = self.t("carré de 5", 30).next_to(c, RIGHT, buff=0.15).align_to(c, UP)
        self.play(FadeIn(c, scale=1.05), FadeIn(lc), run_time=0.4)
        self.au_mot("le même ruban, 20 centimètres")
        l1 = self.t("Même ruban : 20 cm", 32)
        self.col(l1, 0.85)
        self.play(FadeIn(l1, shift=UP * 0.1), Create(contour(a, RUBAN, 6)), Create(contour(c, RUBAN, 6)),
                  run_time=0.5)
        self.au_mot("bien plus de place pour les fleurs")
        l2 = self.bloc(["Le carré a bien", "plus de place !"], 32, VERT_OK)
        self.col(l2, -0.15)
        self.play(FadeIn(l2, shift=UP * 0.1), Indicate(c, scale_factor=1.05), run_time=0.45)
        self.au_mot("25 carreaux contre 9")
        n1 = numeros(c, 18)
        n2 = numeros(a, 18)
        r = self.t("25 carreaux contre 9", 34, VERT_OK)
        self.col(r, -1.35)
        self.play(FadeIn(n1), FadeIn(n2), FadeIn(r, scale=1.1), run_time=0.5)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (réponse A) ─────────────────────────────────────────
    def figure_q2(self):
        # à la même échelle : le rectangle de départ (10 × 5) et le rectangle doublé (20 × 10), côte à côte
        p = poly(pts_rect(10, 5, 0.2), "#fbbf24", "#92400e").move_to(P(-5.6, 2.0))
        p2 = poly(pts_rect(20, 10, 0.2), "#c4b5fd", "#4c1d95").move_to(P(-2.3, 1.5))
        return VGroup(p, hors_audit(self.t("P = 30 cm", 24, JAUNE_TITRE)).next_to(p, DOWN, buff=0.12), p2)

    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        g = self.figure_q2()

        def autres_q(sc):
            sc.play(FadeIn(g), run_time=0.35)

        def apres(sc):
            sc.play(Create(tour(g[2])), run_time=0.6)

        self.question_gauche("07-question", "07b-reponse",
                             ["Un rectangle a un périmètre", "de 30 cm.", "On double sa longueur",
                              "et sa largeur.", "Quel est son nouveau périmètre ?"],
                             [self.choix("60 cm"), self.choix("32 cm"), self.choix("120 cm")], 0,
                             ["Tous les côtés doublent,", "donc le tour double :", "30 × 2 = 60 cm."],
                             -0.45, mot_q="Un rectangle", autres_q=autres_q, autres_r=apres)

    # ── 08 : le défi (ruban de 24 cm, L = 2 l) ──────────────────────────────
    def figure_defi(self, pos=P(-3.6, 0.5)):
        b = boite(8, 4, 0.4, pos)
        return b, etiquettes(b, ["2 × l", "l"], cotes=[0, 1], fs=28, couleur=ROSE_D)

    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        b, et = self.figure_defi()
        self.au_mot("un ruban de 24 centimètres")
        l0 = self.t("Ruban : 24 cm", 36, RUBAN)
        self.col(l0, 2.2, 0.35)
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(b, scale=1.1), Create(ruban(b, 7)), run_time=0.5)
        self.au_mot("la longueur fait 2 fois la largeur")
        l1 = self.bloc(["longueur =", "2 fois la largeur"], 34)
        self.col(l1, 1.25, 0.35)
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(et), run_time=0.45)
        self.au_mot("Quelles sont les dimensions")
        q = self.bloc(["Quelles sont", "ses dimensions ?"], 38, JAUNE_TITRE)
        self.col(q, -0.2, 0.35)
        self.play(FadeIn(q, shift=UP * 0.1), Wiggle(b), run_time=0.5)
        self.pause_defi(y=-1.9)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        b, et = self.figure_defi()
        self.add(b, ruban(b, 7), et)
        self.au_mot("La moitié du tour")
        l0 = self.t("La moitié du tour :", 32, ROSE_D)
        self.col(l0, 2.35, 0.35)
        self.play(FadeIn(l0, shift=UP * 0.1), Create(cote_tour(b, 0, VERT_OK, 10)), Create(cote_tour(b, 1, VERT_OK, 10)),
                  run_time=0.45)
        self.au_mot("24 divisé par 2")
        a = self.t("24 ÷ 2", 38, BLEU_D)
        self.col(a, 1.7, 0.35)
        self.play(FadeIn(a, shift=UP * 0.1), run_time=0.3)
        self.au_mot("12. Longueur")
        a2 = self.t("= 12", 38, VERT_OK).next_to(a, RIGHT, buff=0.2)
        self.play(FadeIn(a2, shift=UP * 0.1), run_time=0.25)
        self.au_mot("Longueur plus largeur font 12")
        l1 = self.t("longueur + largeur = 12", 30)
        self.col(l1, 1.05, 0.35)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.3)
        self.au_mot("la longueur vaut 2 largeurs")
        cases = VGroup(*[Square(0.7, fill_color=c, fill_opacity=1, stroke_color=WHITE, stroke_width=2)
                         for c in (ROSE_D, ROSE_D, BLEU_D)]).arrange(RIGHT, buff=0)
        cases.move_to(P(-3.6, -1.75))
        self.play(FadeIn(cases[:2], shift=UP * 0.1), FadeIn(cases[2], shift=UP * 0.1), run_time=0.4)
        self.au_mot("3 largeurs font 12")
        l2 = self.t("3 largeurs = 12", 34, BLEU_D)
        self.col(l2, 0.4, 0.35)
        self.play(FadeIn(l2, shift=UP * 0.1), Indicate(cases, scale_factor=1.1), run_time=0.4)
        self.au_mot("La largeur : 4 centimètres")
        r1 = self.t("largeur : 4 cm", 36, VERT_OK)
        self.col(r1, -0.3, 0.35)
        e4 = etiquette(b, 1, "4 cm", 28, VERT_OK)
        self.play(FadeIn(r1, shift=UP * 0.1), FadeOut(et[1]), FadeIn(e4, scale=1.3), run_time=0.4)
        self.au_mot("la longueur : 8 centimètres")
        r2 = self.t("longueur : 8 cm", 36, VERT_OK)
        self.col(r2, -0.95, 0.35)
        e8 = etiquette(b, 0, "8 cm", 28, VERT_OK)
        self.play(FadeIn(r2, shift=UP * 0.1), FadeOut(et[0]), FadeIn(e8, scale=1.3), run_time=0.4)
        self.au_mot("8 plus 4")
        v = self.t("8 + 4 = 12", 34, GRAY_B)
        self.col(v, -1.7, 0.35)
        self.play(FadeIn(v, shift=UP * 0.1), run_time=0.3)
        self.au_mot("fois 2, 24")
        v2 = self.t("× 2 = 24 ✓", 34, VERT_OK).next_to(v, DOWN, buff=0.18).align_to(v, LEFT)
        self.play(FadeIn(v2, shift=UP * 0.1), run_time=0.3)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        b1 = boite(7, 3, 0.22, P(0, 1.0))
        b2 = boite(14, 6, 0.11, P(0, -0.6), "#c4b5fd", "#4c1d95").scale(1.4).move_to(P(0, -0.7))
        fig = VGroup(b1, ruban(b1, 6), b2, ruban(b2, 6))
        lignes = self.finale_gauche(fig, textes=[
            ("Allonger un côté de 1 :", "2 de plus au tour."),
            ("Doubler tous les côtés :", "doubler le périmètre."),
            ("Le même tour,", "pas forcément la même surface.")], fs=30)
        self.add(fig)
        self.au_mot("Allonger un côté")
        self.montrer_ligne(lignes[0], Indicate(b1, scale_factor=1.05))
        self.au_mot("Doubler tous les côtés")
        self.montrer_ligne(lignes[1], Indicate(b2, scale_factor=1.05))
        self.au_mot("deux formes peuvent avoir le même tour")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_allonger()
        self.ecran_doubler()
        self.ecran_meme_tour()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")
