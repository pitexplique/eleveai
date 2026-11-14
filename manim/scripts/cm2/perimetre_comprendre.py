# perimetre_comprendre.py
# EleveAI — Maths CM2 — série « Périmètre », épisode 01 : COMPRENDRE LE PÉRIMÈTRE
# (micro perimetre_comprendre, notion perimetre), AVEC VOIX. Paysage 16:9, CEINTURE JAUNE.
# Short jumeau : film Ti Margo (20 allumettes : enclos long ou carré, même tour → A).
# Décor et métier : Noah, RÉGISSEUR DE CONCERTS (ruban lumineux autour de la scène, tapis sur le sol ;
# centres : musique, cinema-series).
# Mapping micro → écrans : 02 (le tour = périmètre, 8 + 5 + 8 + 5 = 26), 03 (surface = aire ; unités de
# longueur), 04 (carré 6,5 × 4 = 26 : même tour), 06 (piège : L × l = aire), questions 05 et 07, défi 08.
# Voix : manim/voix/cm2-perimetre-comprendre.json (validée le 14/11, Julie, débit −6) ;
# marques : python manim/scripts/cm2/perimetre_marques.py comprendre
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/cm2/perimetre_comprendre.py PerimetreComprendreCM2
# python -m manim render -qh --disable_caching manim/scripts/cm2/perimetre_comprendre.py PerimetreComprendreCM2 -o eleveai-maths-cm2-perimetre-comprendre --media_dir manim/scripts/cm2/media-perimetre-01
# Sortie : manim/sorties/cm2/maths/perimetre/01-comprendre/eleveai-maths-cm2-perimetre-comprendre.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from perimetre_cm2_commun import *  # noqa: E402,F403

BOIS, BOIS_B = "#a16207", "#713f12"        # le plancher de la scène
TAPIS, TAPIS_B = "#1f2937", "#9ca3af"      # le tapis noir
RUBAN = "#facc15"                          # le ruban lumineux (le tour)


def scene_noah(L=8, l=5, u=0.5):
    """La scène vue de dessus : un rectangle de plancher (L × l mètres, échelle u)."""
    return poly(pts_rect(L, l, u), BOIS, BOIS_B)


def ruban(p, sw=10):
    return tour(p, RUBAN, sw)


class PerimetreComprendreBase(PaysagePerimetreCM2):
    nom_voix = "cm2-perimetre-comprendre"
    fichier_marques = "perimetre_comprendre_marques.json"
    ceinture = "jaune"

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Comprendre le périmètre", self.identite, self.ceinture, y_ech=-2.45)
        q = self.bloc(["Le tour ou la surface :", "qu'est-ce qu'on mesure ?"], 36)
        q.move_to(P(0, 0.3)).align_to(P(-6.2, 0), LEFT)
        s = scene_noah(8, 5, 0.33).move_to(P(3.6, 0.4))
        self.au_mot("Comprendre le périmètre")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), FadeIn(s, scale=1.2), run_time=0.6)
        self.au_mot("Le tour")
        self.play(FadeIn(q[0], shift=UP * 0.2), Create(ruban(s)), run_time=0.4)
        self.au_mot("la surface")
        self.play(s.animate.set_fill(TAPIS), run_time=0.4)
        self.au_mot("qu'est-ce qu'on mesure")
        self.play(FadeIn(q[1], shift=UP * 0.2), run_time=0.3)
        self.attendre_voix(marge=0.6)

    # ── 01 : Noah, régisseur de concerts ────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        no = noah(1.0).move_to(P(-5.3, 0.1))
        self.au_mot("Voici Noah")
        nom = self.t("Noah", 42, BLEU_D).next_to(no, UP, buff=0.2)
        self.play(FadeIn(no, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("régisseur")
        met = self.bloc(["régisseur", "de concerts"], 28, BLEU_D).next_to(no, DOWN, buff=0.15)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.35)
        s = scene_noah(8, 5, 0.5).move_to(P(0.2, 0.95))
        self.au_mot("il prépare la scène")
        self.play(FadeIn(s, scale=1.15), run_time=0.5)
        self.au_mot("un ruban lumineux tout autour")
        r = ruban(s)
        e1 = self.t("le ruban", 30, RUBAN).next_to(s, RIGHT, buff=0.35).shift(UP * 0.6)
        self.play(Create(r), FadeIn(e1), run_time=0.9)
        self.au_mot("un tapis noir sur tout le sol")
        tap = poly(pts_rect(8, 5, 0.5), TAPIS, TAPIS_B, sw=0).move_to(s).scale(0.97)
        e2 = self.t("le tapis", 30, GRAY_B).next_to(s, RIGHT, buff=0.35).shift(DOWN * 0.6)
        self.play(FadeIn(tap), FadeIn(e2), r.animate.set_z_index(2), run_time=0.6)
        self.au_mot("est-ce qu'on les mesure pareil")
        q = self.bloc(["Le ruban et le tapis :", "on les mesure pareil ?"], 36, JAUNE_TITRE)
        q.move_to(P(0.6, -1.85))
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.4)
        self.attendre_voix()

    # ── 02 : le tour = le périmètre ─────────────────────────────────────────
    def figure_scene(self, pos=P(-3.5, 0.3), u=0.55):
        s = scene_noah(8, 5, u).move_to(pos)
        return s, etiquettes(s, ["8 m", "5 m", "8 m", "5 m"], fs=28)

    def ecran_contour(self):
        self.ecran("02-contour")
        s, et = self.figure_scene()
        self.add(s)
        self.au_mot("Le ruban suit le bord")
        l0 = self.t("Le ruban suit le bord.", 34)
        self.col(l0, 2.75)
        self.play(FadeIn(l0, shift=UP * 0.1), Create(ruban(s)), run_time=0.8)
        self.au_mot("c'est le périmètre")
        l1 = self.bloc(["Sa longueur,", "c'est le périmètre :", "la longueur du tour."], 34, JAUNE_TITRE)
        self.col(l1, 1.35)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.4)
        self.au_mot("8 mètres de long")
        self.play(FadeIn(et[0], scale=1.3), FadeIn(et[2], scale=1.3), run_time=0.35)
        self.au_mot("5 mètres de large")
        self.play(FadeIn(et[1], scale=1.3), FadeIn(et[3], scale=1.3), run_time=0.35)
        self.au_mot("Le tour")
        l2 = self.t("Le tour :", 34)
        self.col(l2, 0.05)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.3)
        self.au_mot("8 plus 5")
        a = self.t("8 + 5", 44, BLEU_D)
        self.col(a, -0.7)
        self.play(FadeIn(a, shift=UP * 0.1), Create(cote_tour(s, 0)), Create(cote_tour(s, 1)), run_time=0.4)
        self.au_mot("plus 8, plus 5")
        b = self.t("+ 8 + 5", 44, BLEU_D).next_to(a, RIGHT, buff=0.3)
        self.play(FadeIn(b, shift=UP * 0.1), Create(cote_tour(s, 2)), Create(cote_tour(s, 3)), run_time=0.4)
        self.au_mot("26 mètres")
        res = self.gros("= 26 m", fs=52).next_to(b, RIGHT, buff=0.25)
        if res.get_right()[0] > 6.6:
            res.next_to(a, DOWN, buff=0.3).align_to(a, LEFT)
        self.play(FadeIn(res, scale=1.2), run_time=0.5)
        self.attendre_voix()

    # ── 03 : la surface, c'est l'aire ───────────────────────────────────────
    def ecran_surface(self):
        self.ecran("03-surface")
        s, et = self.figure_scene()
        r = ruban(s)
        self.add(s, et, r)
        self.au_mot("Le tapis, lui, couvre tout l'intérieur")
        tap = poly(pts_rect(8, 5, 0.55), TAPIS, TAPIS_B, sw=0).move_to(s).scale(0.97)
        l0 = self.bloc(["Le tapis couvre", "tout l'intérieur."], 34)
        self.col(l0, 2.4)
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(tap), r.animate.set_z_index(2), run_time=0.6)
        self.au_mot("c'est une surface : son aire")
        l1 = self.ligne([("une surface :", WHITE), ("son aire", GRAY_B)], 34, buff=0.2)
        self.col(l1, 1.35)
        self.play(FadeIn(l1, shift=UP * 0.1), Indicate(tap, color=GRAY_B, scale_factor=1.03), run_time=0.5)
        self.au_mot("Le périmètre est une longueur")
        l2 = self.bloc(["Le périmètre", "est une longueur :"], 36, JAUNE_TITRE)
        self.col(l2, 0.2)
        self.play(FadeIn(l2, shift=UP * 0.1), Indicate(r, color=RUBAN, scale_factor=1.03), run_time=0.5)
        self.au_mot("il se mesure en mètres")
        unites = VGroup(self.t("mètres", 36, VERT_OK), self.t("centimètres", 36, VERT_OK),
                        self.t("kilomètres", 36, VERT_OK))
        unites.arrange(DOWN, aligned_edge=LEFT, buff=0.12)
        self.col(unites, -1.4)
        self.play(FadeIn(unites[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("en centimètres")
        self.play(FadeIn(unites[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("en kilomètres")
        self.play(FadeIn(unites[2], shift=UP * 0.1), run_time=0.3)
        self.attendre_voix()

    # ── 04 : un carré, le même tour ─────────────────────────────────────────
    def ecran_meme_tour(self):
        self.ecran("04-meme-tour")
        s = scene_noah(8, 5, 0.35).move_to(P(-4.3, 1.75))
        r = ruban(s, 8)
        self.add(s, r)
        e26 = hors_audit(self.t("26 m", 30, RUBAN)).next_to(s, RIGHT, buff=0.25)
        self.add(e26)
        self.au_mot("une petite scène carrée")
        c = poly(pts_rect(6.5, 6.5, 0.4), BOIS, BOIS_B).move_to(P(-4.3, -1.15))
        self.play(FadeIn(c, scale=1.2), run_time=0.4)
        self.au_mot("6,5 mètres de côté")
        ec = etiquettes(c, ["6,5 m"], cotes=[1], fs=28)
        l0 = self.ligne([("Carré :", WHITE), ("6,5 m", JAUNE_TITRE), ("de côté", WHITE)], 34, buff=0.18)
        self.col(l0, 2.4)
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(ec, scale=1.3), run_time=0.4)
        self.au_mot("Son tour : 6,5 fois 4")
        l1 = self.t("6,5 × 4", 44, BLEU_D)
        self.col(l1, 1.3)
        self.play(FadeIn(l1, shift=UP * 0.1), Create(ruban(c, 8)), run_time=0.8)
        self.au_mot("4, 26 mètres")
        l1b = self.gros("= 26 m", fs=52).next_to(l1, RIGHT, buff=0.25)
        self.play(FadeIn(l1b, scale=1.2), run_time=0.4)
        self.au_mot("Le même ruban")
        l2 = self.t("Le même ruban !", 38, RUBAN)
        self.col(l2, 0.15)
        self.play(FadeIn(l2, shift=UP * 0.1), Indicate(r, color=RUBAN), run_time=0.5)
        self.au_mot("le même périmètre")
        l3 = self.bloc(["Deux figures différentes :", "le même périmètre."], 34, JAUNE_TITRE)
        self.col(l3, -1.05)
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.4)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (réponse B) ─────────────────────────────────────────
    def figure_q1(self):
        """Un champ (vert) et son grillage (piquets gris tout autour)."""
        ch = poly(pts_rect(7, 4, 0.5), "#65a30d", "#365314").move_to(P(-3.7, 1.55))
        gr = tour(ch, GRAY_B, 5)
        v = ch.get_vertices()
        pq = VGroup()
        for a, b in zip(v, list(v[1:]) + [v[0]]):
            for k in range(5):
                pq.add(Dot(a + (b - a) * k / 5, radius=0.07, color=WHITE))
        return VGroup(ch, gr, pq)

    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        g = self.figure_q1()

        def autres_q(sc):
            sc.play(FadeIn(g), run_time=0.35)

        def apres(sc):
            sc.play(Create(tour(g[0])), run_time=0.6)

        self.question_gauche("05-question", "05b-reponse",
                             ["Du grillage autour", "d'un champ :", "que calcule-t-on ?"],
                             [self.choix("son aire"), self.choix("son périmètre"), self.choix("son volume")], 1,
                             ["Le grillage fait", "le tour du champ :", "on calcule son périmètre,", "une longueur."],
                             -0.45, mot_q="Pour savoir", autres_q=autres_q, autres_r=apres)

    # ── 06 : le piège (longueur × largeur) ──────────────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        self.au_mot("Attention")
        tit = self.t("Attention au piège !", 46, ROUGE_ERREUR)
        gauche(tit, -6.2, 3.05)
        self.play(Write(tit), run_time=0.35)
        s, et = self.figure_scene(P(-3.5, 0.0), 0.5)
        self.add(s, et)
        self.au_mot("je fais longueur fois largeur")
        l0 = self.bloc(["Un élève dit :", "« longueur × largeur »"], 34)
        self.col(l0, 2.2)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.4)
        self.au_mot("Non")
        barre = Line(l0[1].get_left(), l0[1].get_right(), color=ROUGE_ERREUR, stroke_width=6)
        self.play(Create(barre), run_time=0.3)
        self.au_mot("8 fois 5")
        l1 = self.t("8 × 5", 40, ROUGE_ERREUR)
        self.col(l1, 1.05)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.3)
        self.au_mot("5, 40")
        l1b = self.t("= 40", 40, ROUGE_ERREUR).next_to(l1, RIGHT, buff=0.2)
        self.play(FadeIn(l1b, shift=UP * 0.1), run_time=0.3)
        self.au_mot("qui couvrent la scène")
        cases = VGroup(*[Square(0.5, stroke_color=WHITE, stroke_width=1.5, fill_color=CARREAU, fill_opacity=0.55)
                         .move_to(s.get_corner(UL) + P(0.25 + 0.5 * i, -0.25 - 0.5 * j))
                         for j in range(5) for i in range(8)])
        l2 = self.bloc(["= 40 carrés de 1 m :", "la surface, son aire !"], 32, GRAY_B)
        hors_audit(l2[0])
        self.col(l2, 0.0)
        self.play(LaggedStart(*[FadeIn(x) for x in cases], lag_ratio=0.02), FadeIn(l2[0]), run_time=0.9)
        self.au_mot("son aire")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("la somme des côtés")
        l3 = self.t("Périmètre = somme des côtés", 32, JAUNE_TITRE)
        self.col(l3, -1.05)
        self.play(FadeIn(l3, shift=UP * 0.1), FadeOut(cases), Create(ruban(s)), run_time=0.6)
        self.au_mot("26 mètres")
        res = self.gros("26 m", fs=56)
        self.col(res, -1.95)
        self.play(FadeIn(res, scale=1.2), run_time=0.45)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (réponse C) ─────────────────────────────────────────
    def figure_q2(self):
        """Une règle (mètre de chantier jaune) : l'outil des longueurs."""
        reg = Rectangle(width=4.4, height=0.55, fill_color="#facc15", fill_opacity=1, stroke_color="#a16207",
                        stroke_width=3)
        traits = VGroup(*[Line(P(-2.2 + 0.44 * k, 0.27), P(-2.2 + 0.44 * k, 0.27 - (0.3 if k % 5 == 0 else 0.16)),
                               color=BLACK, stroke_width=3) for k in range(1, 10)])
        return VGroup(reg, traits).move_to(P(-3.7, 1.7))

    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        g = self.figure_q2()

        def autres_q(sc):
            sc.play(FadeIn(g), run_time=0.35)

        self.question_gauche("07-question", "07b-reponse",
                             ["Quelle unité peut exprimer", "un périmètre ?"],
                             [self.choix("le litre"), self.choix("le mètre carré"), self.choix("le mètre")], 2,
                             ["Une longueur :", "mètres, centimètres,", "kilomètres.", "Le mètre carré :",
                              "pour les aires !"],
                             0.6, mot_q="Quelle unité", autres_q=autres_q)

    # ── 08 : le défi (scène 10 × 4, rouleau de 25 m) ────────────────────────
    def figure_defi(self):
        s = scene_noah(10, 4, 0.42).move_to(P(-3.3, 0.2))
        return s, etiquettes(s, ["10 m", "4 m", "10 m", "4 m"], fs=28)

    def rouleau(self, pos=P(-3.3, -2.45)):
        disque = VGroup(Circle(0.45, fill_color=RUBAN, fill_opacity=1, stroke_color="#a16207", stroke_width=4),
                        Circle(0.15, fill_color=BLACK, fill_opacity=1, stroke_width=0))
        e = hors_audit(self.t("25 m", 30, RUBAN)).next_to(disque, RIGHT, buff=0.2)
        return VGroup(disque, e).move_to(pos)

    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        s, et = self.figure_defi()
        self.au_mot("10 mètres sur 4 mètres")
        l0 = self.bloc(["Une scène rectangulaire", "de 10 m sur 4 m"], 34)
        self.col(l0, 2.1, 0.35)
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(s, scale=1.1), FadeIn(et), run_time=0.6)
        self.au_mot("un rouleau de 25 mètres")
        ro = self.rouleau()
        l1 = self.ligne([("Un rouleau de", WHITE), ("25 m", RUBAN)], 34, buff=0.18)
        self.col(l1, 0.95, 0.35)
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(ro, scale=1.2), run_time=0.5)
        self.au_mot("Est-ce assez")
        q = self.t("Est-ce assez ?", 40, JAUNE_TITRE)
        self.col(q, -0.05, 0.35)
        self.play(FadeIn(q, shift=UP * 0.1), Wiggle(ro), run_time=0.5)
        self.pause_defi(y=-1.3)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        s, et = self.figure_defi()
        ro = self.rouleau()
        self.add(s, et, ro)
        self.au_mot("Le tour")
        l0 = self.t("Le tour :", 34, ROSE_D)
        self.col(l0, 2.3, 0.35)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.3)
        self.au_mot("10 plus 4")
        a = self.t("10 + 4", 42, BLEU_D)
        self.col(a, 1.45, 0.35)
        self.play(FadeIn(a, shift=UP * 0.1), Create(cote_tour(s, 0)), Create(cote_tour(s, 1)), run_time=0.35)
        self.au_mot("plus 10, plus 4")
        b = self.t("+ 10 + 4", 42, BLEU_D).next_to(a, RIGHT, buff=0.2)
        self.play(FadeIn(b, shift=UP * 0.1), Create(cote_tour(s, 2)), Create(cote_tour(s, 3)), run_time=0.35)
        self.au_mot("28 mètres")
        c = self.t("= 28 m", 42, VERT_OK)
        self.col(c, 0.6, 0.35)
        self.play(FadeIn(c, shift=UP * 0.1), run_time=0.35)
        self.au_mot("25 mètres est trop court")
        l1 = self.ligne([("25 m < 28 m :", ROUGE_ERREUR), ("trop court !", ROUGE_ERREUR)], 36, buff=0.2)
        hors_audit(l1[0])
        self.col(l1, -0.35, 0.35)
        self.play(FadeIn(l1, shift=UP * 0.1), Wiggle(ro), run_time=0.5)
        self.au_mot("il manque 3 mètres")
        res = self.gros("Il manque 3 m", fs=46, couleur=ROUGE_ERREUR)
        self.col(res, -1.4, 0.35)
        self.play(FadeIn(res, scale=1.2), run_time=0.5)
        self.insister(res, 1.1, 0.25)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        s = scene_noah(8, 5, 0.38)
        fig = VGroup(s, ruban(s, 8))
        lignes = self.finale_gauche(fig, textes=[
            ("Le périmètre :", "la longueur du tour."),
            ("Il se mesure avec", "une unité de longueur."),
            ("Deux figures différentes :", "parfois le même périmètre."),
            ("Le tour n'est pas", "la surface.")], fs=30)
        self.add(fig)
        self.au_mot("Le périmètre, c'est")
        self.montrer_ligne(lignes[0], Indicate(fig, scale_factor=1.05))
        self.au_mot("Il se mesure")
        self.montrer_ligne(lignes[1])
        self.au_mot("Deux figures")
        self.montrer_ligne(lignes[2])
        self.au_mot("On ne confond pas")
        self.montrer_ligne(lignes[3])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_contour()
        self.ecran_surface()
        self.ecran_meme_tour()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")


class PerimetreComprendreCM2(PerimetreComprendreBase):
    identite = "Maths CM2 — EleveAI"
    ceinture = "jaune"
