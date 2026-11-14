# perimetre_quadrilatere.py
# EleveAI — Maths CM2 — série « Périmètre », épisode 03 : LE PÉRIMÈTRE DU RECTANGLE ET DU CARRÉ, EN GRAND
# (micro perimetre_quadrilatere, notion perimetre), AVEC VOIX. Paysage 16:9, CEINTURE VERTE.
# Short jumeau : film Ti Margo (2 tours d'un terrain de basket 28 × 15 = 172 m → A).
# Décor et métier : Rayan, JARDINIER DE STADE (lignes blanches du terrain ; centres : football, handball-volley).
# Mapping micro → écrans : 02 (4 côtés : 2 longueurs, 2 largeurs), 03 (raccourci : (L + l) × 2 = 328),
# 04 (carré 12,5 × 4 = 50), 06 (piège : la moitié du tour ; L × l = l'aire), questions 05 et 07,
# défi 08 (2 tours d'un terrain de handball 40 × 20 avec 250 m de peinture).
# Voix : manim/voix/cm2-perimetre-quadrilatere.json (validée le 14/11, Julie, débit −6) ;
# marques : python manim/scripts/cm2/perimetre_marques.py quadrilatere
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/cm2/perimetre_quadrilatere.py PerimetreQuadrilatereCM2
# python -m manim render -qh --disable_caching manim/scripts/cm2/perimetre_quadrilatere.py PerimetreQuadrilatereCM2 -o eleveai-maths-cm2-perimetre-quadrilatere --media_dir manim/scripts/cm2/media-perimetre-03
# Sortie : manim/sorties/cm2/maths/perimetre/03-quadrilatere/eleveai-maths-cm2-perimetre-quadrilatere.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from perimetre_cm2_commun import *  # noqa: E402,F403

PELOUSE, PELOUSE_B = "#16a34a", "#14532d"
CRAIE = "#f8fafc"
SOL_HAND, SOL_HAND_B = "#2563eb", "#1e3a8a"   # le terrain de handball (bleu)


def terrain(L=100, l=64, u=0.045, fond=PELOUSE, bord=PELOUSE_B):
    """Un terrain vu de dessus : le rectangle, la ligne du milieu, le rond central (traits fins)."""
    p = poly(pts_rect(L, l, u), fond, bord)
    a, b = L * u / 2, l * u / 2
    dedans = VGroup(Line(P(0, b), P(0, -b), color=CRAIE, stroke_width=2.5),
                    Circle(radius=min(a, b) * 0.28, color=CRAIE, stroke_width=2.5))
    return p, dedans


class PerimetreQuadrilatereBase(PaysagePerimetreCM2):
    nom_voix = "cm2-perimetre-quadrilatere"
    fichier_marques = "perimetre_quadrilatere_marques.json"
    ceinture = "verte"

    def terrain_rayan(self, u=0.04, pos=P(-3.2, 0.35)):
        p, d = terrain(100, 64, u)
        g = VGroup(p, d).move_to(pos)
        return p, d

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Le périmètre du rectangle et du carré", self.identite, self.ceinture,
                                       y_ech=-2.45)
        p, d = self.terrain_rayan(0.03, P(3.8, 0.45))
        self.au_mot("Le périmètre du rectangle et du carré")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), FadeIn(p), FadeIn(d), run_time=0.7)
        q = self.bloc(["Combien de mètres de ligne", "autour d'un terrain ?"], 36)
        q.move_to(P(0, 0.3)).align_to(P(-6.2, 0), LEFT)
        self.au_mot("Combien de mètres de ligne")
        self.play(FadeIn(q, shift=UP * 0.2), Create(tour(p, CRAIE, 7)), run_time=0.7)
        self.attendre_voix(marge=0.6)

    # ── 01 : Rayan, jardinier de stade ──────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        ra = rayan(1.0).move_to(P(-5.3, 0.1))
        self.au_mot("Voici Rayan")
        nom = self.t("Rayan", 42, VERT_OK).next_to(ra, UP, buff=0.2)
        self.play(FadeIn(ra, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("jardinier de stade")
        met = self.bloc(["jardinier", "de stade"], 28, VERT_OK).next_to(ra, DOWN, buff=0.15)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.35)
        p, d = self.terrain_rayan(0.042, P(0.7, 1.0))
        self.au_mot("il trace les lignes blanches")
        self.play(FadeIn(p, scale=1.1), FadeIn(d), run_time=0.5)
        self.play(Create(tour(p, CRAIE, 7)), run_time=1.0)
        self.au_mot("100 mètres de long")
        et = etiquettes(p, ["100 m", "64 m"], cotes=[0, 1], fs=28)
        self.play(FadeIn(et[0], scale=1.3), run_time=0.3)
        self.au_mot("64 mètres de large")
        self.play(FadeIn(et[1], scale=1.3), run_time=0.3)
        self.au_mot("pour en faire le tour")
        q = self.bloc(["Combien de mètres de ligne", "pour en faire le tour ?"], 36, JAUNE_TITRE)
        q.move_to(P(0.6, -1.85))
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.4)
        self.attendre_voix()

    # ── 02 : 4 côtés, 2 longueurs et 2 largeurs ─────────────────────────────
    def ecran_quatre(self):
        self.ecran("02-quatre")
        p, d = self.terrain_rayan()
        self.add(p, d)
        self.au_mot("Un rectangle a 4 côtés")
        l0 = self.t("Un rectangle a 4 côtés :", 34, JAUNE_TITRE)
        self.col(l0, 2.4)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.35)
        et = etiquettes(p, ["100 m", "64 m", "100 m", "64 m"], fs=28)
        self.au_mot("2 longueurs")
        l1 = self.ligne([("2 longueurs", BLEU_D), ("et", WHITE)], 34, buff=0.2)
        self.col(l1, 1.55)
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(et[0]), FadeIn(et[2]),
                  Create(cote_tour(p, 0, BLEU_D, 9)), Create(cote_tour(p, 2, BLEU_D, 9)), run_time=0.45)
        self.au_mot("2 largeurs")
        l1b = self.t("2 largeurs", 34, ROSE_D)
        self.col(l1b, 0.95)
        self.play(FadeIn(l1b, shift=UP * 0.1), FadeIn(et[1]), FadeIn(et[3]),
                  Create(cote_tour(p, 1, ROSE_D, 9)), Create(cote_tour(p, 3, ROSE_D, 9)), run_time=0.45)
        self.au_mot("On peut tout additionner")
        l2 = self.t("On peut tout additionner :", 34)
        self.col(l2, 0.05)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.3)
        self.au_mot("100 plus 64")
        a = self.t("100 + 64", 42, BLEU_D)
        self.col(a, -0.75)
        self.play(FadeIn(a, shift=UP * 0.1), run_time=0.3)
        self.au_mot("plus 100, plus 64")
        b = self.t("+ 100 + 64", 42, BLEU_D).next_to(a, DOWN, buff=0.25).align_to(a, LEFT)
        self.play(FadeIn(b, shift=UP * 0.1), run_time=0.3)
        self.attendre_voix()

    # ── 03 : le raccourci (L + l) × 2 ───────────────────────────────────────
    def ecran_raccourci(self):
        self.ecran("03-raccourci")
        p, d = self.terrain_rayan()
        et = etiquettes(p, ["100 m", "64 m", "100 m", "64 m"], fs=28)
        self.add(p, d, et)
        self.au_mot("c'est la moitié du tour")
        l0 = self.bloc(["Une longueur + une largeur :", "la moitié du tour."], 34, JAUNE_TITRE)
        self.col(l0, 2.4)
        self.play(FadeIn(l0, shift=UP * 0.1), Create(cote_tour(p, 0)), Create(cote_tour(p, 1)), run_time=0.6)
        self.au_mot("100 plus 64")
        a = self.t("100 + 64", 44, BLEU_D)
        self.col(a, 1.2)
        self.play(FadeIn(a, shift=UP * 0.1), run_time=0.3)
        self.au_mot("64, 164")
        a2 = self.t("= 164", 44, VERT_OK).next_to(a, RIGHT, buff=0.25)
        self.play(FadeIn(a2, shift=UP * 0.1), run_time=0.3)
        self.au_mot("On double")
        l1 = self.t("On double :", 34)
        self.col(l1, 0.3)
        self.play(FadeIn(l1, shift=UP * 0.1), Create(cote_tour(p, 2)), Create(cote_tour(p, 3)), run_time=0.5)
        self.au_mot("164 fois 2")
        b = self.t("164 × 2", 44, BLEU_D)
        self.col(b, -0.55)
        self.play(FadeIn(b, shift=UP * 0.1), run_time=0.3)
        self.au_mot("2, 328")
        b2 = self.t("= 328", 44, VERT_OK).next_to(b, RIGHT, buff=0.25)
        self.play(FadeIn(b2, shift=UP * 0.1), run_time=0.3)
        self.au_mot("Rayan trace 328 mètres")
        res = hors_audit(self.gros("328 m de ligne", fs=44))
        self.col(res, -1.6)
        self.play(FadeIn(res, scale=1.2), run_time=0.5)
        self.attendre_voix()

    # ── 04 : le carré, côté × 4 ─────────────────────────────────────────────
    def ecran_carre(self):
        self.ecran("04-carre")
        self.au_mot("Et un carré")
        l0 = self.t("Et un carré ?", 38, JAUNE_TITRE)
        self.col(l0, 2.4)
        p, d = terrain(12.5, 12.5, 0.23)
        g = VGroup(p, d).move_to(P(-3.6, 0.3))
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(g, scale=1.1), run_time=0.45)
        self.au_mot("Ses 4 côtés sont égaux")
        l1 = self.t("4 côtés égaux", 34)
        self.col(l1, 1.55)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.3)
        self.au_mot("12,5 mètres de côté")
        et = etiquettes(p, ["12,5 m"] * 4, fs=28)
        self.play(FadeIn(et, scale=1.2), run_time=0.35)
        self.au_mot("12,5 fois 4")
        a = self.t("12,5 × 4", 46, BLEU_D)
        self.col(a, 0.55)
        self.play(FadeIn(a, shift=UP * 0.1), Create(tour(p)), run_time=0.6)
        self.au_mot("50 mètres")
        a2 = self.t("= 50 m", 46, VERT_OK).next_to(a, RIGHT, buff=0.25)
        self.play(FadeIn(a2, shift=UP * 0.1), run_time=0.3)
        self.au_mot("le côté fois 4")
        res = self.bloc(["Carré :", "le côté × 4"], 40, VERT_OK)
        hors_audit(res)
        self.col(res, -1.05)
        cadre = SurroundingRectangle(res, color=VERT_OK, buff=0.18, corner_radius=0.12, stroke_width=4)
        self.play(FadeIn(res, scale=1.1), Create(cadre), run_time=0.5)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (réponse A) ─────────────────────────────────────────
    def figure_q1(self):
        p = poly(pts_rect(9, 6, 0.3), CARREAU, CARREAU_B).move_to(P(-3.7, 1.6))
        return VGroup(p, etiquettes(p, ["9 m", "6 m"], cotes=[0, 1], fs=26))

    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        g = self.figure_q1()

        def autres_q(sc):
            sc.play(FadeIn(g), run_time=0.35)

        def apres(sc):
            sc.play(Create(tour(g[0])), run_time=0.6)

        self.question_gauche("05-question", "05b-reponse",
                             ["Un rectangle de 9 m", "sur 6 m.", "Quel est son périmètre ?"],
                             [self.choix("30 m"), self.choix("54 m"), self.choix("15 m")], 0,
                             ["9 + 6 = 15 :", "la moitié du tour.", "On double :", "15 × 2 = 30 m."],
                             -0.45, mot_q="Un rectangle", autres_q=autres_q, autres_r=apres)

    # ── 06 : le piège (la moitié du tour ; L × l) ───────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        self.au_mot("Attention")
        tit = self.t("Attention au piège !", 46, ROUGE_ERREUR)
        gauche(tit, -6.2, 3.05)
        self.play(Write(tit), run_time=0.35)
        p, d = self.terrain_rayan(pos=P(-3.2, 0.0))
        et = etiquettes(p, ["100 m", "64 m", "100 m", "64 m"], fs=28)
        self.add(p, d, et)
        self.au_mot("100 plus 64, 164")
        l0 = self.t("100 + 64 = 164", 40, ROUGE_ERREUR)
        self.col(l0, 2.2)
        self.play(FadeIn(l0, shift=UP * 0.1), Create(cote_tour(p, 0)), Create(cote_tour(p, 1)), run_time=0.45)
        self.au_mot("la moitié du tour")
        l1 = self.bloc(["seulement la moitié", "du tour !"], 32, ROUGE_ERREUR)
        self.col(l1, 1.3)
        manque = VGroup(DashedLine(p.get_vertices()[2], p.get_vertices()[3], color=ROUGE_ERREUR, stroke_width=8),
                        DashedLine(p.get_vertices()[3], p.get_vertices()[0], color=ROUGE_ERREUR, stroke_width=8))
        self.play(FadeIn(l1, shift=UP * 0.1), Create(manque), run_time=0.5)
        self.au_mot("Il faut doubler")
        l2 = self.t("Il faut doubler.", 36, VERT_OK)
        self.col(l2, 0.4)
        self.play(FadeIn(l2, shift=UP * 0.1), FadeOut(manque), Create(cote_tour(p, 2)), Create(cote_tour(p, 3)),
                  run_time=0.5)
        self.au_mot("on ne multiplie pas 100 par 64")
        l3 = self.t("100 × 64", 40, ROUGE_ERREUR)
        self.col(l3, -0.5)
        barre = Line(l3.get_left(), l3.get_right(), color=ROUGE_ERREUR, stroke_width=6)
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.3)
        self.play(Create(barre), run_time=0.25)
        self.au_mot("l'aire de la pelouse")
        l4 = self.bloc(["= l'aire de la pelouse,", "pas la longueur de la ligne !"], 32, GRAY_B)
        self.col(l4, -1.5)
        self.play(FadeIn(l4[0], shift=UP * 0.1), Indicate(p, color=PELOUSE, scale_factor=1.03), run_time=0.5)
        self.au_mot("pas la longueur de la ligne")
        self.play(FadeIn(l4[1], shift=UP * 0.1), run_time=0.3)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (réponse B) ─────────────────────────────────────────
    def figure_q2(self):
        """Un quadrilatère quelconque (côtés 3,5 ; 4 ; 2,5 ; 5, à peu près à l'échelle)."""
        u = 0.5
        pts = [P(0, 0), P(5 * u, 0), P(4.3 * u, 2.4 * u), P(0.6 * u, 3.4 * u)]
        p = poly(pts, "#fbbf24", "#92400e").move_to(P(-3.7, 1.55))
        return VGroup(p, etiquettes(p, ["5 m", "2,5 m", "4 m", "3,5 m"], fs=26))

    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        g = self.figure_q2()

        def autres_q(sc):
            sc.play(FadeIn(g), run_time=0.35)

        def apres(sc):
            sc.play(Create(tour(g[0])), run_time=0.6)

        self.question_gauche("07-question", "07b-reponse",
                             ["Un quadrilatère a des côtés", "de 3,5 m, 4 m,", "2,5 m et 5 m.", "Quel est son périmètre ?"],
                             [self.choix("14,10 m"), self.choix("15 m"), self.choix("14 m")], 1,
                             ["Côtés pas égaux :", "on additionne les 4.", "3,5 + 2,5 = 6,", "+ 4 = 10,",
                              "+ 5 = 15 m."],
                             -0.45, mot_q="Un quadrilatère", autres_q=autres_q, autres_r=apres)

    # ── 08 : le défi (handball 40 × 20, 2 tours, 250 m de peinture) ─────────
    def figure_defi(self, pos=P(-3.5, 0.3)):
        p, d = terrain(40, 20, 0.11, SOL_HAND, SOL_HAND_B)
        VGroup(p, d).move_to(pos)
        return p, d, etiquettes(p, ["40 m", "20 m"], cotes=[0, 1], fs=28)

    def pot(self, pos=P(-3.5, -2.2)):
        corps = RoundedRectangle(width=0.8, height=0.7, corner_radius=0.08, fill_color=CRAIE, fill_opacity=1,
                                 stroke_color=GRAY_B, stroke_width=3)
        anse = Arc(radius=0.32, start_angle=0, angle=PI, color=GRAY_B, stroke_width=4).next_to(corps, UP, buff=0)
        e = hors_audit(self.t("250 m", 28, CRAIE)).next_to(corps, RIGHT, buff=0.2)
        return VGroup(corps, anse, e).move_to(pos)

    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        p, d, et = self.figure_defi()
        self.au_mot("un terrain de handball")
        l0 = self.t("Un terrain de handball :", 34)
        self.col(l0, 2.2, 0.35)
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(p, scale=1.1), FadeIn(d), run_time=0.5)
        self.au_mot("40 mètres sur 20 mètres")
        l0b = self.t("40 m sur 20 m", 34, JAUNE_TITRE)
        self.col(l0b, 1.6, 0.35)
        self.play(FadeIn(l0b, shift=UP * 0.1), FadeIn(et), run_time=0.35)
        self.au_mot("pour 250 mètres de ligne")
        po = self.pot()
        l1 = self.bloc(["De la peinture", "pour 250 m de ligne"], 34)
        self.col(l1, 0.6, 0.35)
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(po, scale=1.2), run_time=0.5)
        self.au_mot("2 fois le tour")
        q = self.bloc(["Peut-il en faire", "2 fois le tour ?"], 38, JAUNE_TITRE)
        self.col(q, -0.65, 0.35)
        self.play(FadeIn(q, shift=UP * 0.1), Wiggle(po), run_time=0.5)
        self.pause_defi(y=-1.9)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        p, d, et = self.figure_defi()
        po = self.pot()
        self.add(p, d, et, po)
        self.au_mot("Un tour")
        l0 = self.t("Un tour :", 34, ROSE_D)
        self.col(l0, 2.35, 0.35)
        self.play(FadeIn(l0, shift=UP * 0.1), Create(tour(p)), run_time=0.45)
        self.au_mot("40 plus 20")
        a = self.t("40 + 20", 40, BLEU_D)
        self.col(a, 1.65, 0.35)
        self.play(FadeIn(a, shift=UP * 0.1), run_time=0.3)
        self.au_mot("20, 60")
        a2 = self.t("= 60", 40, VERT_OK).next_to(a, RIGHT, buff=0.2)
        self.play(FadeIn(a2, shift=UP * 0.1), run_time=0.25)
        self.au_mot("Fois 2 : 120 mètres")
        b = self.ligne([("× 2", BLEU_D), ("= 120 m", VERT_OK)], 40, buff=0.25)
        b.next_to(a2, DOWN, buff=0.3)
        b.shift(RIGHT * (a2.get_left()[0] - b[1].get_left()[0]))
        self.play(FadeIn(b, shift=UP * 0.1), run_time=0.3)
        self.au_mot("Deux tours")
        l1 = self.t("Deux tours :", 34, ROSE_D)
        self.col(l1, 0.2, 0.35)
        self.play(FadeIn(l1, shift=UP * 0.1), Indicate(tour(p, TOUR, 14)), run_time=0.45)
        self.au_mot("120 fois 2")
        c = self.t("120 × 2", 40, BLEU_D)
        self.col(c, -0.5, 0.35)
        self.play(FadeIn(c, shift=UP * 0.1), run_time=0.3)
        self.au_mot("240 mètres")
        c2 = self.t("= 240 m", 40, VERT_OK).next_to(c, RIGHT, buff=0.2)
        self.play(FadeIn(c2, shift=UP * 0.1), run_time=0.25)
        self.au_mot("240 est plus petit que 250")
        d1 = self.t("240 < 250 : oui !", 40, VERT_OK)
        self.col(d1, -1.1, 0.35)
        self.play(FadeIn(d1, shift=UP * 0.1), Wiggle(po), run_time=0.45)
        self.au_mot("pour 10 mètres")
        res = self.bloc(["Il reste de la peinture", "pour 10 m."], 34, VERT_OK)
        self.col(res, -2.0, 0.35)
        self.play(FadeIn(res, scale=1.1), run_time=0.45)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        p, d = terrain(100, 64, 0.03)
        fig = VGroup(p, d, tour(p))
        lignes = self.finale_gauche(fig, textes=[
            ("Rectangle :", "longueur + largeur, puis on double."),
            ("Carré :", "le côté × 4."),
            ("Autre quadrilatère :", "on additionne les 4 côtés.")], fs=30)
        hors_audit(lignes[1])  # « × 4 » : le 4 de « fois 4 », redit
        self.add(fig)
        self.au_mot("Pour un rectangle")
        self.montrer_ligne(lignes[0], Indicate(fig, scale_factor=1.05))
        self.au_mot("Pour un carré")
        self.montrer_ligne(lignes[1])
        self.au_mot("on additionne les 4 côtés")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_quatre()
        self.ecran_raccourci()
        self.ecran_carre()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")


class PerimetreQuadrilatereCM2(PerimetreQuadrilatereBase):
    identite = "Maths CM2 — EleveAI"
    ceinture = "verte"
