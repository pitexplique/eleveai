# 4e_solides_reconnaitre.py
# EleveAI — Maths 4e — série « Périmètre, aire, volume, solides », épisode S1 : RECONNAÎTRE LES SOLIDES
# (micro vision_reconnaitre, notion vision_espace), AVEC VOIX. Paysage 16:9, CEINTURE JAUNE.
# Vidéo COMMUNE avec la 3e (micro `volume_solide_reconnaitre`) : à brancher par `aussi`.
# Décor et métier : Yuna, ANIMATRICE 3D — un personnage de jeu (centres jeux-video, cinema-series).
# Mapping micro → écrans : 02 (les BASES décident : prisme contre pyramide), 03 (les solides ronds :
# cylindre, cône, boule), 04 (compter faces, arêtes, sommets), 06 (piège : un cube est un pavé, un
# pavé est un prisme), questions 05 (C : prisme droit) et 07 (A : 5 faces),
# défi 08 (fusée = cylindre + cône + 3 pavés → 5 solides, 3 disques).
# Voix : manim/voix/4e-solides-reconnaitre.json ; marques : 4e_solides_reconnaitre_marques.json.
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/4e_solides_reconnaitre.py SolidesReconnaitre4e
# Sortie : manim/sorties/4e/maths/solides/15-solides-reconnaitre/

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from volume_4e_commun import *  # noqa: E402,F403
from volume_4e_commun import (pave, prisme_tri, cylindre, cone, pyramide, boule, yuna4,  # noqa: E402
                              Paysage4e, PYR_FACE, PRI_FACE)

BASE_HL = "#facc15"


class SolidesReconnaitre4e(Paysage4e):
    nom_voix = "4e-solides-reconnaitre"
    fichier_marques = "4e_solides_reconnaitre_marques.json"
    ceinture = "jaune"

    # ── 00 ──────────────────────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Reconnaître les solides", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Reconnaître les solides")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q = self.bloc(["À quoi voit-on", "qu'un solide est un prisme ?"], 36)
        q.move_to(P(0, 0.35)).align_to(P(-6.2, 0), LEFT)
        pr = prisme_tri(1.6, 1.3, 0.8, 1.2, 0.72, P(2.0, -1.2))
        self.au_mot("À quoi voit-on")
        self.play(FadeIn(q[0], shift=UP * 0.2), FadeIn(pr, scale=0.85), run_time=0.5)
        self.au_mot("un prisme")
        self.play(FadeIn(q[1], shift=UP * 0.2), Indicate(pr, color=JAUNE_TITRE, scale_factor=1.05), run_time=0.6)
        self.attendre_voix(marge=0.6)

    # ── 01 ──────────────────────────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        p = yuna4(1.0).move_to(P(-5.2, 0.4))
        self.au_mot("Voici Yuna")
        nom = self.t("Yuna", 40, BLEU_CALCUL).next_to(p, UP, buff=0.25)
        self.play(FadeIn(p, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("animatrice 3D")
        met = self.bloc(["animatrice 3D", "d'un jeu"], 26, BLEU_CALCUL).next_to(p, DOWN, buff=0.18)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.45)
        x = 1.8
        l1 = self.bloc(["Elle ne part jamais", "d'une forme compliquée."], 30, WHITE)
        self.col(l1, 2.0, x)
        self.au_mot("Elle ne part jamais")
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.45)
        self.au_mot("Elle assemble des solides simples")
        l2 = self.t("Elle assemble des solides simples :", 30, JAUNE_TITRE)
        self.col(l2, 0.95, x)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.4)
        sols = VGroup(
            pave(1.0, 0.8, 1.2, 0.52, P(-3.3, -2.5)),
            cylindre(0.5, 1.1, 0.52, P(-1.5, -2.5)),
            cone(0.5, 1.2, 0.52, P(-0.1, -2.5)),
            pyramide(1.0, 1.2, 0.52, P(0.9, -2.5)),
            boule(0.55, 0.52, P(3.4, -2.0)))
        self.au_mot("des pavés, des cylindres")
        self.play(LaggedStart(*[FadeIn(s, shift=UP * 0.2) for s in sols], lag_ratio=0.18), run_time=1.1)
        self.au_mot("une boule")
        self.play(Indicate(sols[4], color=JAUNE_TITRE, scale_factor=1.1), run_time=0.45)
        self.attendre_voix()

    # ── 02 : les bases décident ─────────────────────────────────────────────
    def ecran_les_bases(self):
        self.ecran("02-les-bases")
        u = 0.95
        pr = prisme_tri(1.7, 1.4, 0.85, 1.4, u, P(-5.9, -1.2))
        py = pyramide(1.7, 1.8, u, P(0.9, -1.2))
        self.add(pr, py)
        e1 = hors_audit(self.t("prisme droit", 26, PRI_FACE)).next_to(pr, DOWN, buff=0.3)
        e2 = hors_audit(self.t("pyramide", 26, PYR_FACE)).next_to(py, DOWN, buff=0.3)
        self.add(e1, e2)
        self.au_mot("Un solide se reconnaît à ses bases")
        tit = self.t("Ce sont les bases qui décident", 42, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.5)
        x = -2.4
        l1 = self.bloc(["Le prisme droit a deux bases", "identiques,"], 30, PRI_FACE)
        self.col(l1, 1.9, x)
        self.au_mot("Le prisme droit")
        self.play(FadeIn(l1, shift=UP * 0.1), Indicate(pr.avant, color=BASE_HL, scale_factor=1.08),
                  run_time=0.55)
        l2 = self.t("et des faces rectangulaires.", 30, PRI_FACE)
        self.col(l2, 1.05, x)
        self.au_mot("des faces latérales rectangulaires")
        self.play(FadeIn(l2, shift=UP * 0.1), Indicate(pr.pans, color=BASE_HL, scale_factor=1.04),
                  run_time=0.5)
        l3 = self.bloc(["La pyramide n'a qu'une", "seule base,"], 30, PYR_FACE)
        self.col(l3, 0.15, x)
        self.au_mot("La pyramide")
        self.play(FadeIn(l3, shift=UP * 0.1), Indicate(py.base, color=BASE_HL, scale_factor=1.08),
                  run_time=0.55)
        l4 = self.bloc(["et des triangles qui se", "rejoignent au sommet."], 30, PYR_FACE)
        self.col(l4, -0.95, x)
        self.au_mot("des triangles qui se rejoignent")
        self.play(FadeIn(l4, shift=UP * 0.1), Indicate(py.faces, color=BASE_HL, scale_factor=1.05),
                  Flash(py.S, color=JAUNE_TITRE, line_length=0.2), run_time=0.6)
        self.attendre_voix()

    # ── 03 : les solides ronds ──────────────────────────────────────────────
    def ecran_les_ronds(self):
        self.ecran("03-les-ronds")
        u = 0.9
        cy = cylindre(0.65, 1.5, u, P(-4.8, -1.6))
        co = cone(0.65, 1.6, u, P(-1.3, -1.6))
        bo = boule(0.72, u, P(2.4, -0.9))
        e1 = hors_audit(self.t("cylindre", 26, PRI_FACE)).next_to(cy, DOWN, buff=0.28)
        e2 = hors_audit(self.t("cône", 26, "#fb923c")).next_to(co, DOWN, buff=0.28)
        e3 = hors_audit(self.t("boule", 26, "#f472b6")).next_to(bo, DOWN, buff=0.28)
        self.au_mot("la base est un disque")
        tit = self.t("Quand la base est ronde", 42, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.45)
        x = -0.2
        l1 = self.ligne([("Deux disques,", BASE_C), ("pas de pointe :", WHITE), ("un cylindre.", PRI_FACE)],
                        30, buff=0.18)
        self.col(l1, 1.9, x)
        self.au_mot("Deux disques et pas de pointe")
        self.play(FadeIn(cy, shift=UP * 0.2), FadeIn(e1), FadeIn(l1[0], shift=UP * 0.1),
                  FadeIn(l1[1], shift=UP * 0.1), run_time=0.6)
        self.au_mot("c'est un cylindre")
        self.play(FadeIn(l1[2], shift=UP * 0.1), run_time=0.3)
        l2 = self.ligne([("Un disque et une pointe :", WHITE), ("un cône.", "#fb923c")], 30, buff=0.18)
        self.col(l2, 1.1, x)
        self.au_mot("Un disque et une pointe")
        self.play(FadeIn(co, shift=UP * 0.2), FadeIn(e2), FadeIn(l2[0], shift=UP * 0.1), run_time=0.55)
        self.au_mot("c'est un cône")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.3)
        l3 = self.bloc(["Et la boule n'a", "aucune face plate."], 30, "#f472b6")
        self.col(l3, 0.2, x)
        self.au_mot("la boule n'a aucune face plate")
        self.play(FadeIn(bo, shift=UP * 0.2), FadeIn(e3), FadeIn(l3, shift=UP * 0.1), run_time=0.6)
        self.attendre_voix()

    # ── 04 : compter ────────────────────────────────────────────────────────
    def ecran_compter(self):
        self.ecran("04-compter")
        u = 1.15
        py = pyramide(1.8, 2.0, u, P(-5.6, -1.9))
        self.add(py)
        self.au_mot("Yuna compte aussi les faces")
        tit = self.t("Compter faces, arêtes, sommets", 40, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.5)
        x = -0.3
        l1 = self.ligne([("Une pyramide", PYR_FACE), ("à base carrée :", BASE_C)], 32, buff=0.2)
        self.col(l1, 1.9, x)
        self.au_mot("Une pyramide à base carrée")
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(py.base_trait), run_time=0.5)
        l2 = self.ligne([("un carré", BASE_C), ("et quatre triangles :", PYR_FACE), ("cinq faces.", VERT_OK)],
                        32, buff=0.18)
        self.col(l2, 1.05, x)
        self.au_mot("un carré et quatre triangles")
        self.play(FadeIn(l2[0], shift=UP * 0.1), FadeIn(l2[1], shift=UP * 0.1),
                  Indicate(py.faces, color=BASE_HL, scale_factor=1.05), run_time=0.6)
        self.au_mot("donc cinq faces")
        self.play(FadeIn(l2[2], scale=1.15), run_time=0.35)
        l3 = self.t("Huit arêtes.", 34, "#38bdf8")
        self.col(l3, 0.2, x)
        self.au_mot("Huit arêtes")
        aretes = VGroup(Line(py.A, py.B), Line(py.B, py.C), Line(py.C, py.D), Line(py.D, py.A),
                        Line(py.A, py.S), Line(py.B, py.S), Line(py.C, py.S), Line(py.D, py.S))
        aretes.set_stroke("#38bdf8", 6)
        self.play(FadeIn(l3, shift=UP * 0.1), Create(aretes), run_time=0.7)
        l4 = self.t("Cinq sommets.", 34, "#f472b6")
        self.col(l4, -0.65, x)
        self.au_mot("Cinq sommets")
        pts = VGroup(*[Dot(p_, radius=0.1, color="#f472b6") for p_ in (py.A, py.B, py.C, py.D, py.S)])
        self.play(FadeIn(l4, shift=UP * 0.1), LaggedStart(*[GrowFromCenter(d) for d in pts], lag_ratio=0.12),
                  run_time=0.7)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (réponse C) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        pr = prisme_tri(1.6, 1.3, 0.8, 1.5, 0.62, P(-5.5, 0.35))
        e = hors_audit(self.t("2 bases triangulaires", 24, BASE_C)).next_to(pr, DOWN, buff=0.18)
        e2 = hors_audit(self.t("3 faces rectangulaires", 24, PRI_FACE)).next_to(e, DOWN, buff=0.1)

        def avant_q(sc):
            sc.play(FadeIn(pr), FadeIn(e), FadeIn(e2), run_time=0.4)

        self.question_gauche("05-question", "05b-reponse",
                             ["Deux bases triangulaires,", "trois faces rectangulaires.", "Qu'est-ce que c'est ?"],
                             [self.choix("une pyramide"), self.choix("un pavé droit"),
                              self.choix("un prisme droit")], 2,
                             ["Deux bases identiques :", "un prisme droit.", "La pyramide n'aurait",
                              "qu'une seule base."],
                             -0.3, mot_q="Un solide a deux bases", avant_q=avant_q)

    # ── 06 : le piège ───────────────────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege", 0.65)
        tit = self.t("Attention au piège !", 48, ORANGE_Q).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        cube = pave(1.2, 1.2, 1.2, 1.0, P(-5.9, -1.5))
        pv = pave(1.8, 1.1, 1.0, 1.0, P(-2.2, -1.4))
        self.add(cube, pv)
        ec = hors_audit(self.t("cube", 26, PRI_FACE)).next_to(cube, DOWN, buff=0.25)
        ep = hors_audit(self.t("pavé droit", 26, PRI_FACE)).next_to(pv, DOWN, buff=0.25)
        self.add(ec, ep)
        x = 2.1
        l1 = self.bloc(["Ce n'est pas l'allure", "qui décide,", "ce sont les bases."], 30, ROUGE_ERREUR)
        self.col(l1, 1.8, x)
        self.au_mot("Ce n'est pas l'allure générale")
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.5)
        l2 = self.bloc(["Un cube est un pavé droit", "dont toutes les faces", "sont des carrés."], 30, WHITE)
        self.col(l2, 0.4, x)
        self.au_mot("Un cube est un pavé droit")
        self.play(FadeIn(l2, shift=UP * 0.1), Indicate(cube, color=BASE_HL, scale_factor=1.06), run_time=0.6)
        l3 = self.bloc(["Un pavé droit est aussi", "un prisme droit :", "ses bases sont", "des rectangles."],
                       30, VERT_OK)
        self.col(l3, -1.3, x)
        self.au_mot("Un pavé droit est aussi")
        self.play(FadeIn(l3, shift=UP * 0.1), Indicate(pv, color=BASE_HL, scale_factor=1.06), run_time=0.6)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (réponse A) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        py = pyramide(1.7, 1.8, 0.66, P(-5.3, 0.3))
        e = hors_audit(self.t("base carrée", 24, BASE_C)).next_to(py, DOWN, buff=0.2)

        def avant_q(sc):
            sc.play(FadeIn(py), FadeIn(py.base_trait), FadeIn(e), run_time=0.4)

        self.question_gauche("07-question", "07b-reponse",
                             ["Une pyramide à base carrée.", "Combien de faces en tout ?"],
                             [self.choix("5"), self.choix("4"), self.choix("6")], 0,
                             ["Le carré de la base,", "plus quatre triangles :", "cinq faces.",
                              "4 : oublier la base."],
                             -0.3, couper={3: ("4 :", "oublier la base.")},
                             mot_q="Une pyramide a une base carrée", avant_q=avant_q)

    # ── 08 : le défi (la fusée) ─────────────────────────────────────────────
    def fusee(self, u=0.8, o=P(-5.3, -2.3)):
        """La fusée de Yuna : trois pavés (les réacteurs), un cylindre, un cône."""
        g = VGroup()
        cyl = cylindre(0.55, 1.8, u, o + P(0, 0.9 * u), corps=PRI_FACE, dessus="#7dd3fc", bord="#0c4a6e")
        co = cone(0.55, 0.9, u, o + P(0, 2.7 * u), corps="#fb923c", disque="#fdba74", bord="#7c2d12")
        pavs = VGroup(*[pave(0.4, 0.4, 0.9, u, o + P(-0.75 + k * 0.75, 0)) for k in range(3)])
        g.add(pavs, cyl, co)
        g.cyl, g.cone, g.pavs = cyl, co, pavs
        return g

    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        f = self.fusee()
        x = 0.9
        l0 = self.t("Yuna modélise une fusée :", 32, WHITE)
        self.col(l0, 1.9, x)
        self.au_mot("Yuna modélise une fusée")
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.4)
        l1 = self.ligne([("un cylindre", PRI_FACE), ("surmonté d'un cône,", "#fb923c")], 32, buff=0.18)
        self.col(l1, 1.1, x)
        self.au_mot("un cylindre surmonté d'un cône")
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(f.cyl, shift=UP * 0.2), FadeIn(f.cone, shift=DOWN * 0.2),
                  run_time=0.7)
        l2 = self.t("posé sur trois pavés.", 32, "#38bdf8")
        self.col(l2, 0.4, x)
        self.au_mot("posé sur trois pavés")
        self.play(FadeIn(l2, shift=UP * 0.1), LaggedStart(*[FadeIn(p_, shift=UP * 0.15) for p_ in f.pavs],
                                                          lag_ratio=0.15), run_time=0.7)
        l3 = self.bloc(["Combien de solides en tout,", "et combien de disques ?"], 34, JAUNE_TITRE)
        self.col(l3, -0.8, x)
        self.au_mot("Combien de solides en tout")
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.5)
        self.pause_defi(y=-2.4)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        f = self.fusee()
        self.add(f)
        x = 0.9
        l1 = self.ligne([("Les solides :", WHITE), ("un cylindre,", PRI_FACE), ("un cône,", "#fb923c")],
                        30, buff=0.15)
        self.col(l1, 1.9, x)
        self.au_mot("Les solides")
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("un cylindre")
        self.play(FadeIn(l1[1], shift=UP * 0.1), Indicate(f.cyl, color=BASE_HL, scale_factor=1.06),
                  run_time=0.4)
        self.au_mot("un cône")
        self.play(FadeIn(l1[2], shift=UP * 0.1), Indicate(f.cone, color=BASE_HL, scale_factor=1.08),
                  run_time=0.4)
        l2 = self.ligne([("trois pavés,", "#38bdf8"), ("cinq solides.", VERT_OK)], 32, buff=0.2)
        self.col(l2, 1.15, x)
        self.au_mot("trois pavés")
        self.play(FadeIn(l2[0], shift=UP * 0.1), Indicate(f.pavs, color=BASE_HL, scale_factor=1.06),
                  run_time=0.4)
        self.au_mot("cinq solides")
        self.play(FadeIn(l2[1], scale=1.15), run_time=0.35)
        l3 = self.ligne([("Les disques :", BASE_C), ("le cylindre en a deux,", PRI_FACE)], 30, buff=0.15)
        self.col(l3, 0.35, x)
        self.au_mot("Les disques")
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("le cylindre en a deux")
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.4)
        l4 = self.ligne([("le cône en a un,", "#fb923c"), ("les pavés aucun.", "#38bdf8")], 30, buff=0.15)
        self.col(l4, -0.35, x)
        self.au_mot("le cône en a un")
        self.play(FadeIn(l4[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("les pavés n'en ont aucun")
        self.play(FadeIn(l4[1], shift=UP * 0.1), run_time=0.35)
        self.au_mot("Trois disques")
        res = self.gros("Trois disques", fs=44)
        self.col(res, -1.3, x)
        self.play(FadeIn(res, scale=1.15), run_time=0.5)
        self.insister(res, 1.08, 0.25)
        self.attendre_voix()

    # ── 09 ──────────────────────────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        pr = prisme_tri(1.4, 1.1, 0.7, 1.1, 0.72, P(-0.9, -0.6))
        py = pyramide(1.2, 1.3, 0.72, P(0.6, -0.6))
        fig = VGroup(pr, py)
        lignes = self.finale_gauche(fig, textes=[
            ("Un solide se reconnaît", "à ses bases, pas à son allure."),
            ("Deux bases identiques :", "un prisme."),
            ("Une seule base et des triangles :", "une pyramide."),
            ("Un disque et une pointe :", "un cône.")], fs=28)
        self.add(fig)
        self.au_mot("Un solide se reconnaît")
        self.montrer_ligne(lignes[0])
        self.au_mot("Deux bases identiques")
        self.montrer_ligne(lignes[1], Indicate(pr.avant, color=BASE_HL, scale_factor=1.08))
        self.au_mot("Une seule base")
        self.montrer_ligne(lignes[2], Indicate(py.base, color=BASE_HL, scale_factor=1.08))
        self.au_mot("Un disque et une pointe")
        self.montrer_ligne(lignes[3])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_les_bases()
        self.ecran_les_ronds()
        self.ecran_compter()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")
