# perimetre_triangle.py
# EleveAI — Maths CM1 — série « Périmètre », épisode 01 : CALCULER LE PÉRIMÈTRE D'UN TRIANGLE
# (micro perimetre_triangle, notion perimetre), AVEC VOIX. Paysage 16:9, CEINTURE JAUNE.
# Short jumeau : film Ti Margo (la guirlande du fanion : 40 + 40 + 30 = 110 cm, trop court).
# Décor et métier : Nina, DÉCORATRICE DE FÊTES (galon autour des fanions ; centres : art-design).
# Mapping micro → écrans : 02 (le tour = 3 côtés), 03 (on ajoute les 3 côtés), 04 (3 côtés égaux : × 3),
# 06 (piège : oublier un côté), questions 05 et 07, défi 08 (4 fanions).
# Voix : manim/voix/cm1-perimetre-triangle.json (validée le 13/11, Julie, débit −6) ;
# marques : perimetre_triangle_marques.json (python manim/scripts/cm1/aire_marques.py perimetre:triangle).
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/cm1/perimetre_triangle.py PerimetreTriangleCM1
# python -m manim render -qh --disable_caching manim/scripts/cm1/perimetre_triangle.py PerimetreTriangleCM1 -o eleveai-maths-cm1-perimetre-triangle --media_dir manim/scripts/cm1/media-perimetre-01
# Sortie : manim/sorties/cm1/maths/perimetre/01-triangle/eleveai-maths-cm1-perimetre-triangle.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from perimetre_cm1_commun import *  # noqa: E402,F403

EGAL_C, EGAL_B = "#a78bfa", "#4c1d95"      # le fanion aux 3 côtés égaux (violet)
Q1_C, Q1_B = CARREAU, CARREAU_B             # le triangle de la question 1 (bleu ciel)


def etiquettes(p, textes, fs=28):
    return VGroup(*[etiquette(p, i, s, fs) for i, s in enumerate(textes)])


class PerimetreTriangleBase(PaysagePerimetreCM1):
    nom_voix = "cm1-perimetre-triangle"
    fichier_marques = "perimetre_triangle_marques.json"
    ceinture = "jaune"

    def fanion_nina(self, u=0.135, pos=P(-3.6, 0.3)):
        """Le fanion de Nina : 20 cm en haut, 25 cm à gauche, 25 cm à droite.
        Sommets : 0 en haut à gauche, 1 en haut à droite, 2 la pointe. Côtés : 0 haut, 1 droite, 2 gauche."""
        return fanion(20, 25, 25, u).move_to(pos)

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Calculer le périmètre d'un triangle", self.identite, self.ceinture,
                                       y_ech=-2.45)
        self.au_mot("Calculer le périmètre")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q = self.bloc(["Combien de galon pour", "faire le tour d'un fanion ?"], 36)
        q.move_to(P(0, 0.3)).align_to(P(-6.2, 0), LEFT)
        f = self.fanion_nina(0.085, P(3.8, 0.45))
        self.au_mot("Combien")
        self.play(FadeIn(q, shift=UP * 0.2), FadeIn(f, scale=1.3), run_time=0.8)
        self.play(Create(tour(f)), run_time=0.9)
        self.attendre_voix(marge=0.6)

    # ── 01 : Nina, décoratrice de fêtes ─────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        ni = nina(1.0).move_to(P(-5.3, 0.1))
        self.au_mot("Voici Nina")
        nom = self.t("Nina", 42, ROSE_D).next_to(ni, UP, buff=0.2)
        self.play(FadeIn(ni, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("décoratrice")
        met = self.bloc(["décoratrice", "de fêtes"], 28, ROSE_D).next_to(ni, DOWN, buff=0.15)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.35)
        # la guirlande de fanions, sur une ficelle
        couleurs = [(FOND_TRI, FOND_TRI_B), ("#fde047", "#a16207"), (CARREAU, CARREAU_B), (VERT_F, "#14532d")]
        fan = VGroup(*[fanion(20, 25, 25, 0.06, c, b) for c, b in couleurs]).arrange(RIGHT, buff=0.25)
        fan.move_to(P(0.6, 1.6))
        ficelle = Line(fan.get_corner(UL) + LEFT * 0.4, fan.get_corner(UR) + RIGHT * 0.4, color=GRAY_B,
                       stroke_width=3)
        self.au_mot("Elle fabrique")
        self.play(Create(ficelle), LaggedStart(*[FadeIn(x, shift=DOWN * 0.2) for x in fan], lag_ratio=0.15),
                  run_time=0.8)
        tri = self.t("en forme de triangle", 28, GRAY_B).next_to(fan, DOWN, buff=0.25)
        self.au_mot("en forme de triangle")
        self.play(FadeIn(tri), run_time=0.35)
        gros_f = self.fanion_nina(0.08, P(4.6, -0.6))
        self.au_mot("Autour de chaque")
        self.play(TransformFromCopy(fan[0], gros_f), run_time=0.5)
        self.au_mot("un galon doré")
        gal = tour(gros_f, "#facc15", 9)
        self.play(Create(gal), run_time=0.9)
        self.au_mot("Combien de centimètres")
        q = self.bloc(["Combien de centimètres", "de galon pour un fanion ?"], 36, JAUNE_TITRE)
        q.move_to(P(0.2, -1.75))
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.4)
        self.attendre_voix()

    # ── 02 : le tour, ce sont les 3 côtés ───────────────────────────────────
    def ecran_tour(self):
        self.ecran("02-tour")
        f = self.fanion_nina()
        self.add(f)
        self.au_mot("Le périmètre")
        l0 = self.bloc(["Le périmètre,", "c'est la longueur du tour."], 34, JAUNE_TITRE)
        self.col(l0, 2.4)
        self.play(FadeIn(l0, shift=UP * 0.1), Create(tour(f)), run_time=0.6)
        self.au_mot("Un triangle a 3 côtés")
        l1 = self.t("Un triangle a 3 côtés.", 34)
        self.col(l1, 1.35)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.3)
        lignes = [(("mesure 20",), 0, "20 cm en haut"), (("haut, 25",), 2, "25 cm à gauche"),
                  (("et 25",), 1, "25 cm à droite")]
        for k, (mot, i, s) in enumerate(lignes):
            self.au_mot(*mot)
            nb, ou = " ".join(s.split()[:2]), " ".join(s.split()[2:])
            lg = self.ligne([(nb, JAUNE_TITRE), (ou, WHITE)], 34, buff=0.2)
            self.col(lg, 0.45 - 0.75 * k)
            et = etiquette(f, i, nb)
            self.play(FadeIn(lg[0], shift=UP * 0.1), FadeIn(et, scale=1.3), run_time=0.3)
            self.play(FadeIn(lg[1], shift=UP * 0.1), Indicate(cote_tour(f, i, JAUNE_TITRE, 9), color=JAUNE_TITRE),
                      run_time=0.3)
        self.attendre_voix()

    # ── 03 : on ajoute les 3 côtés ──────────────────────────────────────────
    def ecran_additionner(self):
        self.ecran("03-additionner")
        f = self.fanion_nina()
        et = etiquettes(f, ["20 cm", "25 cm", "25 cm"])
        self.add(f, et)
        self.au_mot("On ajoute les 3 côtés")
        l0 = self.bloc(["On ajoute les 3 côtés,", "en faisant le tour :"], 34, JAUNE_TITRE)
        self.col(l0, 2.4)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.4)
        self.au_mot("20 plus 25")
        l1 = self.ligne([("20 + 25", BLEU_D), ("= 45", VERT_OK)], 44, buff=0.3)
        self.col(l1, 1.2)
        self.play(FadeIn(l1[0], shift=UP * 0.1), Create(cote_tour(f, 0)), Create(cote_tour(f, 2)), run_time=0.5)
        self.au_mot("45")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("Plus 25")
        l2 = self.ligne([("+ 25", BLEU_D), ("= 70", VERT_OK)], 44, buff=0.3)
        l2.next_to(l1, DOWN, buff=0.35)
        l2.shift(RIGHT * (l1[1].get_left()[0] - l2[1].get_left()[0]))
        self.play(FadeIn(l2[0], shift=UP * 0.1), Create(cote_tour(f, 1)), run_time=0.35)
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.25)
        self.au_mot("faut 70")
        res = self.gros("70 cm", fs=56)
        self.col(res, -1.25)
        self.play(FadeIn(res, scale=1.2), run_time=0.5)
        self.attendre_voix()

    # ── 04 : 3 côtés égaux → × 3 ────────────────────────────────────────────
    def ecran_egaux(self):
        self.ecran("04-egaux")
        f = fanion(30, 30, 30, 0.105, EGAL_C, EGAL_B).move_to(P(-3.6, 0.3))
        self.au_mot("Un autre fanion")
        self.play(FadeIn(f, scale=1.2), run_time=0.4)
        self.au_mot("ses 3 côtés")
        l0 = VGroup(self.t("3 côtés égaux :", 34), self.ligne([("30 cm", JAUNE_TITRE), ("chacun", WHITE)], 34, buff=0.2))
        l0.arrange(DOWN, aligned_edge=LEFT, buff=0.14)
        self.col(l0, 2.4)
        self.play(FadeIn(l0[0], shift=UP * 0.1), run_time=0.3)
        self.play(FadeIn(l0[1][0], shift=UP * 0.1), FadeIn(etiquettes(f, ["30 cm"] * 3)), run_time=0.3)
        self.play(FadeIn(l0[1][1], shift=UP * 0.1), run_time=0.25)
        self.au_mot("Au lieu de")
        l1 = self.t("30 + 30 + 30", 40, GRAY_B)
        self.col(l1, 1.1)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.4)
        self.au_mot("on calcule")
        l2 = self.ligne([("30 × 3", BLEU_D), ("= 90", VERT_OK)], 48, buff=0.3)
        self.col(l2, 0.05)
        barre = Line(l1.get_left(), l1.get_right(), color=ROUGE_ERREUR, stroke_width=5)
        self.play(FadeIn(l2[0], shift=UP * 0.1), Create(barre), Create(tour(f)), run_time=0.5)
        self.au_mot("90")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("Le périmètre est")
        res = self.gros("Périmètre : 90 cm", fs=40)
        self.col(res, -1.15)
        self.play(FadeIn(res, scale=1.2), run_time=0.5)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (réponse A) ─────────────────────────────────────────
    def figure_q1(self):
        p = poly(pts_triangle(10, 6, 8, 0.3), Q1_C, Q1_B).move_to(P(-3.7, 1.5))
        return VGroup(p, etiquettes(p, ["10 cm", "8 cm", "6 cm"], 26))

    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        g = self.figure_q1()

        def autres_q(sc):
            sc.play(FadeIn(g), run_time=0.35)

        def apres(sc):
            sc.play(Create(tour(g[0])), run_time=0.6)

        self.question_gauche("05-question", "05b-reponse",
                             ["Un triangle : 6 cm,", "8 cm et 10 cm.", "Quel est son périmètre ?"],
                             [self.choix("24 cm"), self.choix("14 cm"), self.choix("18 cm")], 0,
                             ["On ajoute les 3 côtés :", "6 + 8 = 14,", "+ 10 = 24.", "Le périmètre : 24 cm."],
                             -0.75, sans_audit=(3,), mot_q="Un triangle", autres_q=autres_q, autres_r=apres)

    # ── 06 : le piège (oublier un côté) ─────────────────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        self.au_mot("Attention")
        tit = self.t("Attention au piège !", 46, ROUGE_ERREUR)
        gauche(tit, -6.2, 3.05)
        self.play(Write(tit), run_time=0.35)
        f = self.fanion_nina(pos=P(-3.6, -0.45))
        et = etiquettes(f, ["20 cm", "25 cm", "25 cm"])
        self.add(f, et)
        self.au_mot("Le périmètre, c'est le tour")
        l0 = self.bloc(["Le périmètre,", "c'est le tour entier."], 34)
        self.col(l0, 2.1)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.4)
        self.au_mot("Si on oublie")
        l1 = self.t("Si on oublie un côté :", 34, ORANGE_RETENUE)
        self.col(l1, 1.1)
        self.play(FadeIn(l1, shift=UP * 0.1), Create(cote_tour(f, 0)), Create(cote_tour(f, 2)), run_time=0.5)
        self.au_mot("20 plus 25")
        l2 = self.t("20 + 25 = 45 cm", 40, ROUGE_ERREUR)
        self.col(l2, 0.25)
        manque = DashedLine(f.get_vertices()[1], f.get_vertices()[2], color=ROUGE_ERREUR, stroke_width=9,
                            dash_length=0.15)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.4)
        self.au_mot("il manque")
        l3 = self.bloc(["Il manque un morceau", "de galon !"], 34, ROUGE_ERREUR)
        self.col(l3, -0.95)
        self.play(FadeIn(l3, shift=UP * 0.1), Create(manque), run_time=0.5)
        self.play(Indicate(manque, color=ROUGE_ERREUR, scale_factor=1.1), run_time=0.5)
        self.au_mot("On compte les 3 côtés")
        res = self.gros("On compte les 3 côtés,\nchacun une seule fois !", fs=34)
        gauche(res, -6.1, -2.85)
        self.play(FadeIn(res, scale=1.1), FadeOut(manque), Create(cote_tour(f, 1)), run_time=0.6)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (réponse C) ─────────────────────────────────────────
    def figure_q2(self):
        p = poly(pts_triangle(70, 70, 70, 0.032), WHITE, ROUGE_ERREUR, sw=16).move_to(P(-3.8, 1.55))
        return VGroup(p, etiquettes(p, ["70 cm"] * 3, 26))

    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        g = self.figure_q2()

        def autres_q(sc):
            sc.play(FadeIn(g), run_time=0.35)

        def apres(sc):
            sc.play(Create(tour(g[0])), run_time=0.6)

        self.question_gauche("07-question", "07b-reponse",
                             ["Un panneau routier :", "3 côtés égaux de 70 cm.",
                              "Quel est son périmètre ?"],
                             [self.choix("140 cm"), self.choix("73 cm"), self.choix("210 cm")], 2,
                             ["Les 3 côtés sont égaux :", "70 × 3 = 210.", "Le périmètre : 210 cm."],
                             -0.75, sans_audit=(2,), mot_q="Un panneau", autres_q=autres_q, autres_r=apres)

    # ── 08 : le défi (4 fanions) ────────────────────────────────────────────
    def guirlande(self):
        """La guirlande (4 petits fanions, en haut) et UN fanion en grand, avec ses côtés (en bas)."""
        fan = VGroup(*[fanion(15, 20, 20, 0.045) for _ in range(4)]).arrange(RIGHT, buff=0.18)
        fan.move_to(P(-3.6, 2.2))
        fic = Line(fan.get_corner(UL) + LEFT * 0.3, fan.get_corner(UR) + RIGHT * 0.3, color=GRAY_B, stroke_width=3)
        grand = fanion(15, 20, 20, 0.12).move_to(P(-3.6, -0.85))
        return fan, fic, grand

    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        fan, fic, grand = self.guirlande()
        self.au_mot("Nina fait")
        l0 = self.t("Une guirlande de 4 fanions", 34)
        self.col(l0, 2.2, 0.35)
        self.play(FadeIn(l0, shift=UP * 0.1), Create(fic),
                  LaggedStart(*[FadeIn(x, shift=DOWN * 0.2) for x in fan], lag_ratio=0.15), run_time=0.8)
        self.au_mot("Chaque fanion")
        l1 = self.bloc(["Chaque fanion :", "15 cm, 20 cm et 20 cm"], 34)
        self.col(l1, 1.15, 0.35)
        et = etiquettes(grand, ["15 cm", "20 cm", "20 cm"], 28)
        self.play(FadeIn(l1, shift=UP * 0.1), TransformFromCopy(fan[0], grand), FadeIn(et), run_time=0.6)
        self.au_mot("Combien de centimètres")
        q = self.bloc(["Combien de galon", "pour les 4 fanions ?"], 38, JAUNE_TITRE)
        self.col(q, -0.15, 0.35)
        self.play(FadeIn(q, shift=UP * 0.1), Wiggle(fan), run_time=0.5)
        self.pause_defi(y=-1.75)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        fan, fic, grand = self.guirlande()
        et = etiquettes(grand, ["15 cm", "20 cm", "20 cm"], 28)
        self.add(fic, fan, grand, et)
        self.au_mot("Un fanion")
        l0 = self.t("Un fanion :", 34, ROSE_D)
        self.col(l0, 2.35, 0.35)
        self.play(FadeIn(l0, shift=UP * 0.1), Create(tour(grand)), run_time=0.5)
        l1 = self.ligne([("15 + 20", BLEU_D), ("= 35", VERT_OK)], 40, buff=0.3)
        self.col(l1, 1.65, 0.35)
        self.au_mot("15 plus 20")
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("35")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.3)
        l2 = self.ligne([("+ 20", BLEU_D), ("= 55 cm", VERT_OK)], 40, buff=0.3)
        l2.next_to(l1, DOWN, buff=0.3)
        l2.shift(RIGHT * (l1[1].get_left()[0] - l2[1].get_left()[0]))
        self.au_mot("Plus 20")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("55 centimètres")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("Pour 4 fanions")
        l3 = self.t("Pour 4 fanions :", 34, ROSE_D)
        self.col(l3, 0.2, 0.35)
        self.play(FadeIn(l3, shift=UP * 0.1), *[Create(tour(x, sw=6)) for x in fan], run_time=0.6)
        l4 = self.ligne([("55 × 4", BLEU_D), ("= 220", VERT_OK)], 40, buff=0.3)
        self.col(l4, -0.45, 0.35)
        self.au_mot("55 fois 4")
        self.play(FadeIn(l4[0], shift=UP * 0.1), run_time=0.3)
        self.play(FadeIn(l4[1], shift=UP * 0.1), run_time=0.25)
        self.au_mot("faut 220")
        res = self.gros("220 cm", fs=56)
        self.col(res, -1.4, 0.35)
        self.play(FadeIn(res, scale=1.2), run_time=0.5)
        self.insister(res, 1.1, 0.25)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        f = self.fanion_nina(0.11)
        fig = VGroup(f, tour(f))
        lignes = self.finale_gauche(fig, textes=[
            ("Le périmètre d'un triangle :", "la somme de ses 3 côtés."),
            ("3 côtés égaux :", "un côté × 3."),
            ("On n'oublie aucun côté.",)], fs=32)
        hors_audit(lignes[1])  # « × 3 » : le 3 de « par 3 », redit après « les 3 côtés »
        self.add(fig)
        self.au_mot("Le périmètre d'un triangle")
        self.montrer_ligne(lignes[0], Indicate(fig, scale_factor=1.05))
        self.au_mot("Si les 3 côtés")
        self.montrer_ligne(lignes[1])
        self.au_mot("On n'oublie")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_tour()
        self.ecran_additionner()
        self.ecran_egaux()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")


class PerimetreTriangleCM1(PerimetreTriangleBase):
    identite = "Maths CM1 — EleveAI"
    ceinture = "jaune"
