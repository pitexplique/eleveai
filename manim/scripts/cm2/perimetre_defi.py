# perimetre_defi.py
# EleveAI — Maths CM2 — série « Périmètre », épisode 05 : DÉFI — RETROUVER UN CÔTÉ, ACHETER LA BONNE LONGUEUR
# (micro perimetre_defi, notion perimetre), AVEC VOIX. Paysage 16:9, CEINTURE BLEUE.
# Short jumeau : film Ti Margo (36 m de grillage, enclos carré : 9 m → C).
# Décor et métier : Malo, TECHNICIEN EN ROBOTIQUE (fil de robot tondeuse ; centres : technologie-ia, nature-ecologie).
# Mapping micro → écrans : 02 (61 m de fil → 2 rouleaux de 50 m), 03 (côté caché : moitié du tour − longueur),
# 04 (carré : 34 ÷ 4 = 8,5), 06 (piège : 50 − 15 = 35, faux), questions 05 et 07,
# défi 08 (carré de 9,5 m, déjà 15 m de fil → 23 m à acheter).
# Voix : manim/voix/cm2-perimetre-defi.json (validée le 14/11, Julie, débit −6) ;
# marques : python manim/scripts/cm2/perimetre_marques.py defi
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/cm2/perimetre_defi.py PerimetreDefiCM2
# python -m manim render -qh --disable_caching manim/scripts/cm2/perimetre_defi.py PerimetreDefiCM2 -o eleveai-maths-cm2-perimetre-defi --media_dir manim/scripts/cm2/media-perimetre-05
# Sortie : manim/sorties/cm2/maths/perimetre/05-defi/eleveai-maths-cm2-perimetre-defi.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from perimetre_cm2_commun import *  # noqa: E402,F403

PELOUSE, PELOUSE_B = "#16a34a", "#14532d"
FIL = "#f97316"          # le fil du robot (orange, comme la casquette de Malo)
CUIVRE = "#b45309"


def jardin(L, l, u, pos):
    p = poly(pts_rect(L, l, u), PELOUSE, PELOUSE_B).move_to(pos)
    return p


def robot(s=1.0):
    """Le robot tondeuse : une coque orange arrondie, deux roues, un petit voyant."""
    coque = RoundedRectangle(width=0.9 * s, height=0.5 * s, corner_radius=0.2 * s, fill_color=FIL,
                             fill_opacity=1, stroke_color="#7c2d12", stroke_width=3)
    roues = VGroup(*[Circle(radius=0.12 * s, fill_color="#111827", fill_opacity=1, stroke_width=0)
                     .move_to(coque.get_bottom() + P(dx * s, 0)) for dx in (-0.28, 0.28)])
    voyant = Dot(coque.get_center() + P(0.2 * s, 0.08 * s), radius=0.06 * s, color="#22d3ee")
    return VGroup(coque, roues, voyant)


def rouleau(s=1.0, texte=None, fs=24):
    """Un rouleau de fil vu de face (deux cercles), avec sa longueur à côté (hors audit)."""
    ext = Circle(radius=0.38 * s, fill_color=FIL, fill_opacity=1, stroke_color="#7c2d12", stroke_width=3)
    tours = VGroup(*[Circle(radius=r * s, stroke_color="#7c2d12", stroke_width=1.5) for r in (0.3, 0.22)])
    axe = Circle(radius=0.12 * s, fill_color="#1f2937", fill_opacity=1, stroke_width=0)
    g = VGroup(ext, tours, axe)
    if texte:
        g.add(hors_audit(Text(texte, font_size=fs, color=WHITE, weight=BOLD)).next_to(ext, RIGHT, buff=0.15))
    return g


class PerimetreDefiBase(PaysagePerimetreCM2):
    nom_voix = "cm2-perimetre-defi"
    fichier_marques = "perimetre_defi_marques.json"
    ceinture = "bleue"

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Défi de périmètre", self.identite, self.ceinture, y_ech=-2.45)
        p = jardin(15, 10, 0.18, P(3.8, 0.45))
        ro = robot(0.8).move_to(p.get_center() + P(0.3, -0.2))
        self.au_mot("Défi de périmètre")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), FadeIn(p), FadeIn(ro), run_time=0.7)
        q = self.bloc(["Retrouver un côté caché,", "acheter la bonne longueur."], 34)
        q.move_to(P(0, 0.3)).align_to(P(-6.2, 0), LEFT)
        self.au_mot("Retrouver un côté caché")
        self.play(FadeIn(q, shift=UP * 0.2), Create(tour(p, FIL, 7)), run_time=0.7)
        self.attendre_voix(marge=0.6)

    # ── 01 : Malo, technicien en robotique ──────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        ma = malo(1.0).move_to(P(-5.3, 0.1))
        self.au_mot("Voici Malo")
        nom = self.t("Malo", 42, FIL).next_to(ma, UP, buff=0.2)
        self.play(FadeIn(ma, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("technicien en robotique")
        met = self.bloc(["technicien", "en robotique"], 28, FIL).next_to(ma, DOWN, buff=0.15)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.35)
        p = jardin(15, 10, 0.3, P(0.7, 1.0))
        ro = robot(0.9).move_to(p.get_center() + P(-1.2, 0.3))
        self.au_mot("robots tondeuses")
        self.play(FadeIn(p, scale=1.1), FadeIn(ro, shift=RIGHT * 0.3), run_time=0.5)
        self.au_mot("tond la pelouse tout seul")
        self.play(ro.animate.shift(RIGHT * 2.2 + DOWN * 0.5), run_time=1.2)
        self.au_mot("enterrer un fil tout autour")
        self.play(Create(tour(p, FIL, 8)), run_time=1.2)
        self.au_mot("sa frontière")
        self.play(Indicate(ro, color=YELLOW, scale_factor=1.15), run_time=0.5)
        self.au_mot("Combien de fil")
        q = self.t("Combien de fil ?", 40, JAUNE_TITRE).move_to(P(0.7, -1.75))
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.4)
        self.attendre_voix()

    # ── 02 : 61 m de fil, des rouleaux de 50 m ──────────────────────────────
    def ecran_rouleaux(self):
        self.ecran("02-rouleaux")
        p = jardin(18.5, 12, 0.2, P(-3.4, 1.1))
        et = etiquettes(p, ["18,5 m", "12 m"], cotes=[0, 1], fs=28)
        self.au_mot("Le jardin est un rectangle")
        l0 = self.t("18,5 m sur 12 m", 36, JAUNE_TITRE)
        self.col(l0, 2.4)
        self.play(FadeIn(p, scale=1.1), FadeIn(et), FadeIn(l0, shift=UP * 0.1), run_time=0.5)
        self.au_mot("18,5 plus 12")
        a = self.t("18,5 + 12", 42, BLEU_D)
        self.col(a, 1.55)
        self.play(FadeIn(a, shift=UP * 0.1), Create(cote_tour(p, 0)), Create(cote_tour(p, 1)), run_time=0.45)
        self.au_mot("30,5")
        a2 = self.t("= 30,5", 42, VERT_OK).next_to(a, RIGHT, buff=0.25)
        self.play(FadeIn(a2, shift=UP * 0.1), run_time=0.3)
        self.au_mot("Fois 2")
        b = self.ligne([("× 2", BLEU_D), ("= 61 m", VERT_OK)], 42, buff=0.25)
        b.next_to(a2, DOWN, buff=0.3)
        b.shift(RIGHT * (a2.get_left()[0] - b[1].get_left()[0]))
        self.play(FadeIn(b[0], shift=UP * 0.1), Create(cote_tour(p, 2)), Create(cote_tour(p, 3)), run_time=0.45)
        self.au_mot("61 mètres de fil")
        self.play(FadeIn(b[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("rouleaux de 50 mètres")
        r1 = rouleau(1.0, "50 m", 26).move_to(P(-4.4, -1.3))
        l1 = self.t("Rouleaux de 50 m", 34)
        self.col(l1, -0.05)
        self.play(FadeIn(r1, scale=1.2), FadeIn(l1, shift=UP * 0.1), run_time=0.45)
        self.au_mot("un rouleau ne suffit pas")
        l2 = self.t("Un rouleau ne suffit pas.", 34, ROUGE_ERREUR)
        self.col(l2, -0.85)
        self.play(FadeIn(l2, shift=UP * 0.1), Wiggle(r1), run_time=0.5)
        self.au_mot("il en faut 2")
        r2 = rouleau(1.0, "50 m", 26).next_to(r1, RIGHT, buff=1.0)
        res = hors_audit(self.gros("Il en faut 2 !", fs=44))
        self.col(res, -1.7)
        self.play(FadeIn(r2, scale=1.2), FadeIn(res, scale=1.2), run_time=0.5)
        self.attendre_voix()

    # ── 03 : le côté caché (moitié du tour − longueur) ──────────────────────
    def figure_cache(self, pos=P(-3.4, 0.6)):
        p = jardin(15, 10, 0.25, pos)
        return p, etiquettes(p, ["15 m", "?"], cotes=[0, 1], fs=30)

    def ecran_cote_cache(self):
        self.ecran("03-cote-cache")
        p, et = self.figure_cache()
        self.au_mot("Un client dit")
        self.play(FadeIn(p, scale=1.1), run_time=0.4)
        self.au_mot("périmètre de 50 mètres")
        l0 = self.t("Périmètre : 50 m", 34, JAUNE_TITRE)
        self.col(l0, 2.45)
        self.play(FadeIn(l0, shift=UP * 0.1), Create(tour(p, FIL, 7)), run_time=0.5)
        self.au_mot("longueur de 15 mètres")
        l0b = self.t("Longueur : 15 m", 34, JAUNE_TITRE)
        self.col(l0b, 1.85)
        self.play(FadeIn(l0b, shift=UP * 0.1), FadeIn(et[0], scale=1.3), run_time=0.35)
        self.au_mot("Quelle est sa largeur")
        l0c = self.t("Largeur ?", 34, ROSE_D)
        self.col(l0c, 1.25)
        self.play(FadeIn(l0c, shift=UP * 0.1), FadeIn(et[1], scale=1.5), run_time=0.35)
        self.au_mot("La moitié du tour")
        l1 = self.t("La moitié du tour :", 34)
        self.col(l1, 0.45)
        self.play(FadeIn(l1, shift=UP * 0.1), Create(cote_tour(p, 0)), Create(cote_tour(p, 1)), run_time=0.5)
        self.au_mot("50 divisé par 2")
        a = self.t("50 ÷ 2", 40, BLEU_D)
        self.col(a, -0.25)
        self.play(FadeIn(a, shift=UP * 0.1), run_time=0.3)
        self.au_mot("2, 25")
        a2 = self.t("= 25", 40, VERT_OK).next_to(a, RIGHT, buff=0.25)
        self.play(FadeIn(a2, shift=UP * 0.1), run_time=0.3)
        self.au_mot("Une longueur plus une largeur")
        l2 = self.t("longueur + largeur = 25", 30, GRAY_B)
        self.col(l2, -0.9)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.35)
        self.au_mot("25 moins 15")
        b = self.t("25 − 15", 40, BLEU_D)
        self.col(b, -1.6)
        self.play(FadeIn(b, shift=UP * 0.1), run_time=0.3)
        self.au_mot("mesure 10 mètres")
        b2 = self.t("= 10 m", 40, VERT_OK).next_to(b, RIGHT, buff=0.25)
        dix = etiquette(p, 1, "10 m", 30, VERT_OK, 0.32)
        self.play(FadeIn(b2, shift=UP * 0.1), FadeOut(et[1]), FadeIn(dix, scale=1.3), run_time=0.4)
        self.attendre_voix()

    # ── 04 : le carré, périmètre ÷ 4 ────────────────────────────────────────
    def ecran_carre(self):
        self.ecran("04-carre")
        p = jardin(8.5, 8.5, 0.32, P(-3.5, 0.4))
        q4 = etiquettes(p, ["?"] * 4, fs=30)
        self.au_mot("Un jardin carré")
        l0 = self.t("Un jardin carré", 36, JAUNE_TITRE)
        self.col(l0, 2.4)
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(p, scale=1.1), run_time=0.45)
        self.au_mot("périmètre de 34 mètres")
        l0b = self.t("Périmètre : 34 m", 34)
        self.col(l0b, 1.7)
        self.play(FadeIn(l0b, shift=UP * 0.1), Create(tour(p, FIL, 7)), run_time=0.5)
        self.au_mot("Ses 4 côtés sont égaux")
        l1 = self.t("4 côtés égaux", 34)
        self.col(l1, 1.0)
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(q4, scale=1.3), run_time=0.35)
        self.au_mot("34 divisé par 4")
        a = self.t("34 ÷ 4", 46, BLEU_D)
        self.col(a, 0.15)
        self.play(FadeIn(a, shift=UP * 0.1), run_time=0.3)
        self.au_mot("4, 8,5")
        a2 = self.t("= 8,5", 46, VERT_OK).next_to(a, RIGHT, buff=0.25)
        self.play(FadeIn(a2, shift=UP * 0.1), run_time=0.3)
        self.au_mot("Chaque côté mesure")
        res = hors_audit(self.bloc(["Chaque côté :", "8,5 m"], 40, VERT_OK))
        self.col(res, -1.15)
        cadre = SurroundingRectangle(res, color=VERT_OK, buff=0.18, corner_radius=0.12, stroke_width=4)
        huit = etiquettes(p, ["8,5 m"] * 4, fs=28, couleur=VERT_OK)
        self.play(FadeIn(res, scale=1.1), Create(cadre), FadeOut(q4), FadeIn(huit), run_time=0.5)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (réponse B) ─────────────────────────────────────────
    def figure_q1(self):
        p = poly(pts_rect(7, 7, 0.32), CARREAU, CARREAU_B).move_to(P(-3.7, 1.55))
        return VGroup(p, etiquettes(p, ["?"] * 4, fs=26))

    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        g = self.figure_q1()

        def autres_q(sc):
            sc.play(FadeIn(g), run_time=0.35)

        def apres(sc):
            sc.play(Create(tour(g[0])), run_time=0.6)

        self.question_gauche("05-question", "05b-reponse",
                             ["Un carré a un périmètre", "de 28 cm.", "Combien mesure un côté ?"],
                             [self.choix("14 cm"), self.choix("7 cm"), self.choix("24 cm")], 1,
                             ["Les 4 côtés sont égaux :", "28 ÷ 4 = 7.", "On vérifie :", "7 × 4 = 28."],
                             -0.45, mot_q="Un carré", autres_q=autres_q, autres_r=apres)

    # ── 06 : le piège (50 − 15 : le tour contient deux longueurs) ───────────
    def ecran_piege(self):
        self.ecran("06-piege")
        self.au_mot("Attention")
        tit = self.t("Attention au piège !", 46, ROUGE_ERREUR)
        gauche(tit, -6.2, 3.05)
        self.play(Write(tit), run_time=0.35)
        p = jardin(15, 10, 0.25, P(-3.4, 0.0))
        et = etiquettes(p, ["15 m", "?", "15 m", "?"], fs=30)
        self.add(p, et)
        self.au_mot("on n'enlève pas la longueur")
        l0 = self.bloc(["On n'enlève pas la longueur", "au tour entier."], 30, GRAY_B)
        self.col(l0, 2.15)
        self.play(FadeIn(l0, shift=UP * 0.1), Create(tour(p, FIL, 7)), run_time=0.5)
        self.au_mot("50 moins 15")
        l1 = self.t("50 − 15 = 35", 40, ROUGE_ERREUR)
        self.col(l1, 1.15)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.3)
        self.au_mot("c'est faux")
        barre = Line(l1.get_left(), l1.get_right(), color=ROUGE_ERREUR, stroke_width=6)
        self.play(Create(barre), run_time=0.25)
        self.au_mot("le tour contient deux longueurs")
        l2 = self.bloc(["Le tour contient", "deux longueurs !"], 32, ROUGE_ERREUR)
        self.col(l2, 0.2)
        self.play(FadeIn(l2, shift=UP * 0.1), Create(cote_tour(p, 0, BLEU_D, 10)),
                  Create(cote_tour(p, 2, BLEU_D, 10)), run_time=0.5)
        self.au_mot("On prend d'abord la moitié du tour")
        l3 = self.bloc(["D'abord la moitié du tour,", "puis on enlève la longueur."], 32, VERT_OK)
        self.col(l3, -1.15)
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("puis on enlève la longueur")
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.3)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (réponse A) ─────────────────────────────────────────
    def figure_q2(self):
        p = poly(pts_rect(6, 3, 0.45), "#fbbf24", "#92400e").move_to(P(-3.7, 1.6))
        return VGroup(p, etiquettes(p, ["6 cm", "?"], cotes=[0, 1], fs=26))

    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        g = self.figure_q2()

        def autres_q(sc):
            sc.play(FadeIn(g), run_time=0.35)

        def apres(sc):
            sc.play(Create(tour(g[0])), run_time=0.6)

        self.question_gauche("07-question", "07b-reponse",
                             ["Un rectangle a un périmètre", "de 18 cm.", "Sa longueur mesure 6 cm.",
                              "Quelle est sa largeur ?"],
                             [self.choix("3 cm"), self.choix("12 cm"), self.choix("6 cm")], 0,
                             ["La moitié du tour :", "18 ÷ 2 = 9.", "9 − 6 = 3 cm.", "On vérifie :",
                              "6 + 3 = 9, × 2 = 18."],
                             -0.45, mot_q="Un rectangle", autres_q=autres_q, autres_r=apres)

    # ── 08 : le défi (carré de 9,5 m, déjà 15 m de fil) ─────────────────────
    def figure_defi(self, pos=P(-3.6, 0.55)):
        p = jardin(9.5, 9.5, 0.27, pos)
        return p, etiquettes(p, ["9,5 m"], cotes=[0], fs=28)

    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        p, et = self.figure_defi()
        self.au_mot("Le jardin de Malo")
        l0 = self.t("Le jardin de Malo :", 34)
        self.col(l0, 2.2, 0.35)
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(p, scale=1.1), run_time=0.45)
        self.au_mot("un carré de 9,5 mètres")
        l0b = self.t("un carré de 9,5 m", 34, JAUNE_TITRE)
        self.col(l0b, 1.6, 0.35)
        self.play(FadeIn(l0b, shift=UP * 0.1), FadeIn(et), run_time=0.35)
        self.au_mot("vieux morceau de fil de 15 mètres")
        ro = rouleau(0.9, "15 m", 26).move_to(P(-3.9, -1.6))
        l1 = self.bloc(["Il a déjà", "15 m de fil."], 34)
        self.col(l1, 0.65, 0.35)
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(ro, scale=1.2), run_time=0.5)
        self.au_mot("Combien de mètres de fil")
        q = self.bloc(["Combien de mètres", "doit-il acheter ?"], 38, JAUNE_TITRE)
        self.col(q, -0.6, 0.35)
        self.play(FadeIn(q, shift=UP * 0.1), Wiggle(ro), run_time=0.5)
        self.pause_defi(y=-1.9)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        p, et = self.figure_defi()
        ro = rouleau(0.9, "15 m", 26).move_to(P(-3.9, -1.6))
        self.add(p, et, ro)
        self.au_mot("Le tour du carré")
        l0 = self.t("Le tour du carré :", 34, ROSE_D)
        self.col(l0, 2.35, 0.35)
        self.play(FadeIn(l0, shift=UP * 0.1), Create(tour(p, FIL, 8)), run_time=0.45)
        self.au_mot("9,5 fois 4")
        a = self.t("9,5 × 4", 40, BLEU_D)
        self.col(a, 1.65, 0.35)
        self.play(FadeIn(a, shift=UP * 0.1), run_time=0.3)
        self.au_mot("38 mètres")
        a2 = self.t("= 38 m", 40, VERT_OK).next_to(a, RIGHT, buff=0.2)
        self.play(FadeIn(a2, shift=UP * 0.1), run_time=0.25)
        self.au_mot("Il a déjà 15 mètres")
        l1 = self.t("Il a déjà 15 m :", 34, ROSE_D)
        self.col(l1, 0.75, 0.35)
        self.play(FadeIn(l1, shift=UP * 0.1), Indicate(ro, scale_factor=1.15), run_time=0.45)
        self.au_mot("38 moins 15")
        c = self.t("38 − 15", 40, BLEU_D)
        self.col(c, 0.05, 0.35)
        self.play(FadeIn(c, shift=UP * 0.1), run_time=0.3)
        self.au_mot("15, 23")
        c2 = self.t("= 23", 40, VERT_OK).next_to(c, RIGHT, buff=0.2)
        self.play(FadeIn(c2, shift=UP * 0.1), run_time=0.25)
        self.au_mot("Malo doit acheter")
        res = hors_audit(self.bloc(["Malo doit acheter", "23 m de fil."], 36, VERT_OK))
        self.col(res, -1.05, 0.35)
        cadre = SurroundingRectangle(res, color=VERT_OK, buff=0.2, corner_radius=0.12, stroke_width=4)
        self.play(FadeIn(res, scale=1.1), Create(cadre), run_time=0.45)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        p = jardin(15, 10, 0.17, ORIGIN)
        fig = VGroup(p, tour(p, FIL, 7))
        lignes = self.finale_gauche(fig, textes=[
            ("Retrouver un côté :", "on part du périmètre."),
            ("Carré :", "on divise par 4."),
            ("Rectangle :", "moitié du tour − côté connu.")], fs=30)
        self.add(fig)
        self.au_mot("Pour retrouver un côté")
        self.montrer_ligne(lignes[0], Indicate(fig, scale_factor=1.05))
        self.au_mot("Pour un carré")
        self.montrer_ligne(lignes[1])
        self.au_mot("Pour un rectangle")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_rouleaux()
        self.ecran_cote_cache()
        self.ecran_carre()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")


class PerimetreDefiCM2(PerimetreDefiBase):
    identite = "Maths CM2 — EleveAI"
    ceinture = "bleue"
