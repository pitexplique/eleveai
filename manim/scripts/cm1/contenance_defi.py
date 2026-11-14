# contenance_defi.py
# EleveAI — Maths CM1 — série « Contenance », épisode 04 : RÉSOUDRE UN DÉFI DE CONTENANCES
# (micro contenance_defi, notion contenance), AVEC VOIX. Paysage 16:9, CEINTURE BLEUE.
# Short jumeau : film Ti Margo (la fête de la classe, 2 L pour 25 gobelets de 10 cL, réponse B).
# Décor et métier : Nora, APICULTRICE (centres : animaux, nature-ecologie).
# Mapping micro → écrans : 02 (d'abord la même unité : 2 L = 200 cL), 03 (combien de fois 25 dans 200 : 8 pots),
# 04 (on ajoute : 200 + 50 = 250 cL, 10 pots), 06 (piège : 2 L + 50 cL n'est pas 52),
# questions 05 (1 L 500 mL en verres de 250 mL, C) et 07 (5 L − 150 cL, A),
# défi 08 (3 L de miel, 10 pots de 25 cL : assez ?).
# Voix : manim/voix/cm1-contenance-defi.json (validée le 14/11, Julie, débit −6) ;
# marques : contenance_defi_marques.json (python manim/scripts/cm1/aire_marques.py contenance:defi).
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/cm1/contenance_defi.py ContenanceDefiCM1
# python -m manim render -qh --disable_caching manim/scripts/cm1/contenance_defi.py ContenanceDefiCM1 -o eleveai-maths-cm1-contenance-defi --media_dir manim/scripts/cm1/media-contenance-04
# Sortie : manim/sorties/cm1/maths/contenance/04-defi/eleveai-maths-cm1-contenance-defi.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from contenance_cm1_commun import *  # noqa: E402,F403


def pot(s=1.0, niveau=0.85):
    return recipient("pot", 0.75, 0.6, niveau, MIEL).scale(s)


def bocal(h=2.2, larg=1.25):
    """Le grand bidon de miel de la récolte."""
    return recipient("bidon", h, larg, 0.85, MIEL)


def pots(n, s=1.0, cols=5, buff=0.18, niveau=0.85):
    g = VGroup(*[pot(s, niveau) for _ in range(n)])
    g.arrange_in_grid(rows=(n + cols - 1) // cols, cols=cols, buff=buff)
    return g


def pot_vide(s=1.0):
    """Un pot qui manque : en pointillés, avec un « ? »."""
    p = DashedVMobject(RoundedRectangle(width=0.6, height=0.75, corner_radius=0.08, color=ORANGE_RETENUE,
                                        stroke_width=3), num_dashes=16)
    q = hors_audit(Text("?", font_size=28, color=ORANGE_RETENUE, weight=BOLD))
    return VGroup(p, q).scale(s)


def abeille(s=1.0):
    corps = Ellipse(width=0.5, height=0.32, fill_color="#facc15", fill_opacity=1, stroke_color="#111827",
                    stroke_width=2)
    rayures = VGroup(*[Line(P(x, -0.15), P(x, 0.15), color="#111827", stroke_width=5) for x in (-0.06, 0.08)])
    ailes = VGroup(Ellipse(width=0.28, height=0.2, fill_color=WHITE, fill_opacity=0.7, stroke_width=0).move_to(P(-0.05, 0.2)),
                   Ellipse(width=0.28, height=0.2, fill_color=WHITE, fill_opacity=0.7, stroke_width=0).move_to(P(0.12, 0.2)))
    return VGroup(ailes, corps, rayures).scale(s)


class ContenanceDefiBase(PaysageContenanceCM1):
    nom_voix = "cm1-contenance-defi"
    fichier_marques = "contenance_defi_marques.json"
    ceinture = "bleue"

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Un défi de contenances", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Un défi de contenances")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q0 = self.t("Mettre la même unité,", 38, JAUNE_TITRE)
        q1 = self.t("puis calculer.", 38, JAUNE_TITRE)
        q = VGroup(q0, q1).arrange(DOWN, aligned_edge=LEFT, buff=0.3)
        q.move_to(P(0, 0.3)).align_to(P(-6.2, 0), LEFT)
        b = bocal(2.0, 1.1)
        ps = pots(4, 0.8, cols=2)
        fig = VGroup(b, ps).arrange(RIGHT, buff=0.5, aligned_edge=DOWN).move_to(P(3.4, 0.35))
        self.au_mot("Mettre la même unité")
        self.play(FadeIn(q0, shift=UP * 0.2), FadeIn(fig, scale=1.1), run_time=0.35)
        self.au_mot("puis calculer")
        self.play(FadeIn(q1, shift=UP * 0.2), run_time=0.3)
        self.attendre_voix(marge=0.6)

    # ── 01 : Nora, apicultrice ──────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pe = nora(0.95).move_to(P(-5.0, 0.35))
        self.au_mot("Voici Nora")
        nom = self.t("Nora", 42, MIEL).next_to(pe, UP, buff=0.45)
        self.play(FadeIn(pe, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("est apicultrice")
        met = self.t("apicultrice", 26, MIEL).next_to(pe, DOWN, buff=0.12)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.35)
        self.au_mot("élève des abeilles")
        ab = VGroup(*[abeille(0.9).move_to(pe.get_center() + P(dx, dy)) for dx, dy in ((1.0, 1.3), (1.4, 0.7), (0.8, 0.2))])
        self.play(FadeIn(ab, lag_ratio=0.3), run_time=0.5)
        b = bocal(2.2, 1.2).move_to(P(-2.0, 0.0)).align_to(P(0, -1.1), DOWN)
        XP = 0.6
        l1 = self.ligne([("Récolte :", WHITE), ("2 L", MIEL), ("de miel.", MIEL)], 34, buff=0.2)
        self.col(l1, 1.9, XP)
        self.au_mot("récolté 2")
        eb = contenance(b, "2 L")
        self.play(FadeIn(b, shift=UP * 0.2), FadeIn(l1[0], shift=UP * 0.1), FadeIn(l1[1], shift=UP * 0.1),
                  FadeIn(eb), run_time=0.3)
        self.au_mot("litres de miel")
        self.play(FadeIn(l1[2], shift=UP * 0.1), run_time=0.2)
        l2 = self.ligne([("Des pots de", WHITE), ("25 cL.", MIEL)], 34, buff=0.2)
        self.col(l2, 1.15, XP)
        un = pot(1.2).move_to(P(-0.4, -0.6))
        self.au_mot("des pots de 25")
        self.play(FadeIn(l2, shift=UP * 0.1), FadeIn(un, shift=UP * 0.2), run_time=0.35)
        self.add(contenance(un, "25 cL", 26))
        self.au_mot("Combien de pots")
        q = self.bloc(["Combien de pots", "peut-elle remplir ?"], 38, JAUNE_TITRE)
        self.col(q, -0.3, XP)
        self.play(FadeIn(q, shift=UP * 0.15), Wiggle(VGroup(b, un)), run_time=0.5)
        self.attendre_voix()

    # ── 02 : d'abord la même unité ──────────────────────────────────────────
    def ecran_convertir(self):
        self.ecran("02-convertir")
        XP = -0.4
        b = bocal(2.6, 1.4).move_to(P(-4.4, 0.2))
        eb = contenance(b, "2 L", 34)
        self.add(b, eb)
        self.au_mot("D'abord")
        l0 = self.t("D'abord, la même unité.", 40, ORANGE_RETENUE)
        self.col(l0, 2.2, XP)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.3)
        l1 = self.ligne([("2 L :", BLEU_D), ("2 × 100", WHITE), ("= 200 cL", VERT_OK)], 42, buff=0.22)
        self.col(l1, 0.9, XP)
        self.au_mot("unité. 2 litres")
        self.play(FadeIn(l1[0], shift=UP * 0.1), Indicate(eb, color=JAUNE_TITRE), run_time=0.25)
        self.au_mot("2 fois 100")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.2)
        self.au_mot("fois 100, 200")
        e200 = hors_audit(Text("200 cL", font_size=34, color=VERT_OK, weight=BOLD).move_to(eb))
        self.play(FadeIn(l1[2], shift=UP * 0.1), Transform(eb, e200), run_time=0.35)
        self.insister(l1[2], 1.15, 0.25)
        self.attendre_voix()

    # ── 03 : combien de fois 25 dans 200 ────────────────────────────────────
    def ecran_combien(self):
        self.ecran("03-combien-de-fois")
        XP = 0.6
        b = bocal(2.0, 1.1).move_to(P(-5.2, 1.2))
        eb = contenance(b, "200 cL", 26)
        self.add(b, eb)
        self.au_mot("combien de fois 25")
        l0 = self.ligne([("Combien de fois", WHITE), ("25", BLEU_D)], 38, buff=0.2)
        self.col(l0, 2.3, XP)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.25)
        self.au_mot("dans 200")
        l0b = self.ligne([("dans", WHITE), ("200 ?", BLEU_D)], 38, buff=0.2)
        self.col(l0b, 1.7, XP)
        self.play(FadeIn(l0b, shift=UP * 0.1), run_time=0.25)
        huit = pots(8, 0.95, cols=4, buff=0.25).move_to(P(-2.4, -1.0))
        l1 = self.ligne([("25 × 8", WHITE), ("= 200", VERT_OK)], 46, buff=0.25)
        self.col(l1, 0.6, XP)
        self.au_mot("200. 25 fois 8")
        self.play(FadeIn(l1[0], shift=UP * 0.1), LaggedStart(*[FadeIn(p, shift=UP * 0.15) for p in huit],
                                                              lag_ratio=0.12), run_time=0.8)
        self.au_mot("fois 8, 200")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.25)
        l2 = self.ligne([("Nora remplit", WHITE), ("8 pots.", VERT_OK)], 40, buff=0.2)
        self.col(l2, -0.45, XP)
        self.au_mot("Nora remplit 8")
        self.play(FadeIn(l2, scale=1.1), Indicate(huit, color=VERT_OK, scale_factor=1.04), run_time=0.45)
        self.attendre_voix()

    # ── 04 : le lendemain, on ajoute ────────────────────────────────────────
    def ecran_ajouter(self):
        self.ecran("04-ajouter")
        XP = 0.6
        huit = pots(8, 0.95, cols=4, buff=0.25).move_to(P(-3.6, 0.8))
        self.add(huit)
        self.au_mot("Le lendemain")
        l0 = self.ligne([("Encore", WHITE), ("50 cL", MIEL)], 38, buff=0.2)
        self.col(l0, 2.3, XP)
        self.au_mot("encore 50")
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.25)
        deux = pots(2, 0.95, cols=2, buff=0.25).next_to(huit, DOWN, buff=0.35).align_to(huit, LEFT)
        cadre = SurroundingRectangle(deux, color=ORANGE_RETENUE, buff=0.12, corner_radius=0.1)
        l1 = self.ligne([("2 pots", ORANGE_RETENUE), ("de plus,", WHITE)], 38, buff=0.2)
        self.col(l1, 1.55, XP)
        self.au_mot("centilitres : 2")
        self.play(FadeIn(l1[0], shift=UP * 0.1), FadeIn(deux, shift=UP * 0.2), Create(cadre), run_time=0.35)
        self.au_mot("pots de plus")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.2)
        l2 = self.ligne([("car 25 + 25", WHITE), ("= 50.", VERT_OK)], 38, buff=0.2)
        self.col(l2, 0.8, XP)
        self.au_mot("car 25 plus 25")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.2)
        self.au_mot("plus 25, 50")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.2)
        l3 = self.t("En tout :", 38, JAUNE_TITRE)
        self.col(l3, -0.15, XP)
        self.au_mot("En tout")
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.2)
        l4 = self.ligne([("250 cL", VERT_OK), ("de miel,", WHITE)], 40, buff=0.2)
        self.col(l4, -0.9, XP)
        l5 = self.ligne([("et", WHITE), ("10 pots.", VERT_OK)], 40, buff=0.2)
        self.col(l5, -1.6, XP)
        self.au_mot("tout : 250")
        self.play(FadeIn(l4[0], shift=UP * 0.1), run_time=0.25)
        self.au_mot("centilitres de miel")
        self.play(FadeIn(l4[1], shift=UP * 0.1), run_time=0.2)
        self.au_mot("et 10")
        self.play(FadeIn(l5[0]), FadeIn(l5[1], scale=1.2), Indicate(VGroup(huit, deux), color=VERT_OK,
                                                                     scale_factor=1.03), run_time=0.45)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (réponse C) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        b = recipient("bouteille", 1.9, 0.8, 0.85, JUS)
        vs = VGroup(*[recipient("verre", 0.6, 0.45, 0.8, JUS) for _ in range(3)]).arrange(RIGHT, buff=0.15)
        g = VGroup(b, vs).arrange(RIGHT, buff=0.5, aligned_edge=DOWN).move_to(P(-3.8, 1.5))

        def autres_q(sc):
            sc.play(FadeIn(g), run_time=0.35)

        self.question_gauche("05-question", "05b-reponse",
                             ["Une bouteille", "de 1 L et 500 mL.", "Des verres de 250 mL.", "Combien de verres ?"],
                             [self.choix("15 verres"), self.choix("4 verres"), self.choix("6 verres")], 2,
                             ["1 L et 500 mL :", "1000 + 500 = 1500 mL.", "250 × 6 = 1500.",
                              "On remplit 6 verres."],
                             -0.75, sans_audit=(3,), couper={1: ("1000 + 500", "= 1500 mL."), 2: ("250 × 6", "= 1500.")},
                             mot_q="Une bouteille", autres_q=autres_q)

    # ── 06 : le piège (2 L + 50 cL n'est pas 52) ────────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        self.au_mot("Attention")
        XP = 0.2
        tit = self.t("Attention au piège !", 46, ROUGE_ERREUR)
        gauche(tit, -6.2, 3.05)
        self.play(Write(tit), run_time=0.35)
        b = bocal(2.2, 1.2).move_to(P(-4.6, 0.0))
        p2 = VGroup(pot(1.0), pot(1.0)).arrange(RIGHT, buff=0.15).next_to(b, RIGHT, buff=0.4).align_to(b, DOWN)
        self.add(b, contenance(b, "2 L", 30), p2, contenance(p2, "50 cL", 26))
        l0 = self.ligne([("2 L + 50 cL", BLEU_D), ("≠ 52 !", ROUGE_ERREUR)], 46, buff=0.3)
        self.col(l0, 2.0, XP)
        self.au_mot("2 litres plus 50")
        self.play(FadeIn(l0[0], shift=UP * 0.1), run_time=0.25)
        self.au_mot("pas 52")
        self.play(FadeIn(l0[1], scale=1.3), run_time=0.3)
        l1 = self.bloc(["On n'ajoute pas des litres", "et des centilitres."], 32)
        self.col(l1, 1.0, XP)
        self.au_mot("On n'ajoute pas")
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.25)
        self.au_mot("et des centilitres")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.25)
        l2 = self.t("On convertit d'abord :", 34, ORANGE_RETENUE)
        self.col(l2, -0.05, XP)
        self.au_mot("On convertit")
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.25)
        l3 = self.ligne([("200 cL + 50", BLEU_D), ("= 250 cL", VERT_OK)], 40, buff=0.25)
        self.col(l3, -0.95, XP)
        self.au_mot("d'abord : 200")
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.25)
        self.au_mot("plus 50, 250")
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.3)
        self.insister(l3[1], 1.15, 0.25)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (réponse A) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        se = recipient("verre", 1.3, 1.35, 0.8, EAU)
        se.add(Arc(radius=0.66, start_angle=0, angle=PI, color=VERRE, stroke_width=4).move_to(se.corps.get_top() + UP * 0.33))
        ab = recipient("verre", 0.75, 0.6, 0.6, EAU)
        g = VGroup(se, ab).arrange(RIGHT, buff=0.9, aligned_edge=DOWN).move_to(P(-3.8, 1.5))
        g.add(CurvedArrow(se.get_top() + RIGHT * 0.45 + UP * 0.05, ab.get_top() + UP * 0.15, angle=-PI / 2,
                          color=VERRE, stroke_width=4, tip_length=0.2))

        def autres_q(sc):
            sc.play(FadeIn(g), run_time=0.35)

        self.question_gauche("07-question", "07b-reponse",
                             ["Un seau de 5 L d'eau.", "Nora en verse 150 cL.", "Combien de cL reste-t-il ?"],
                             [self.choix("350 cL"), self.choix("145 cL"), self.choix("650 cL")], 0,
                             ["5 L = 500 cL.", "500 − 150 = 350.", "Il reste 350 cL d'eau."],
                             -0.75, sans_audit=(2,), couper={0: ("5 L", "= 500 cL."), 1: ("500 − 150", "= 350.")},
                             mot_q="Un seau", autres_q=autres_q)

    # ── 08 : le défi (3 L de miel, 10 pots) ─────────────────────────────────
    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        XP = 0.6
        b = bocal(2.2, 1.2).move_to(P(-5.0, 0.6))
        dix = pots(10, 0.85, cols=5, buff=0.18).move_to(P(-2.3, 0.6))
        l0 = self.ligne([("Nora a", WHITE), ("3 L", MIEL), ("de miel,", MIEL)], 36, buff=0.2)
        self.col(l0, 2.1, XP)
        self.au_mot("Nora a 3")
        self.play(FadeIn(l0[0]), FadeIn(l0[1], shift=UP * 0.1), FadeIn(b, shift=UP * 0.2), run_time=0.3)
        self.au_mot("litres de miel")
        self.play(FadeIn(l0[2], shift=UP * 0.1), run_time=0.2)
        self.add(contenance(b, "3 L", 30))
        l1 = self.ligne([("et 10 pots", WHITE), ("de 25 cL.", MIEL)], 36, buff=0.2)
        self.col(l1, 1.4, XP)
        self.au_mot("et 10 pots")
        self.play(FadeIn(l1[0], shift=UP * 0.1), FadeIn(dix, lag_ratio=0.1), run_time=0.4)
        self.au_mot("de 25")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.2)
        self.add(contenance(dix, "10 × 25 cL", 26))
        self.au_mot("assez de pots")
        q = self.bloc(["A-t-elle assez de pots", "pour tout le miel ?"], 38, JAUNE_TITRE)
        self.col(q, 0.2, XP)
        self.play(FadeIn(q, shift=UP * 0.1), Wiggle(dix), run_time=0.5)
        self.pause_defi(y=-1.4)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        XP = 0.2
        b = bocal(2.0, 1.1).move_to(P(-5.2, 1.0))
        eb = contenance(b, "3 L", 28)
        dix = pots(10, 0.75, cols=5, buff=0.16).move_to(P(-2.9, 1.0))
        self.add(b, eb, dix)
        l1 = self.ligne([("3 L", BLEU_D), ("= 300 cL.", VERT_OK)], 40, buff=0.25)
        self.col(l1, 2.2, XP)
        self.au_mot("Correction. 3 litres")
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.2)
        self.au_mot("litres : 300")
        e300 = hors_audit(Text("300 cL", font_size=28, color=VERT_OK, weight=BOLD).move_to(eb))
        self.play(FadeIn(l1[1], shift=UP * 0.1), Transform(eb, e300), run_time=0.3)
        l2 = self.ligne([("10 pots :", WHITE), ("25 × 10", WHITE), ("= 250 cL.", VERT_OK)], 40, buff=0.22)
        self.col(l2, 1.4, XP)
        self.au_mot("centilitres. 10 pots")
        self.play(FadeIn(l2[0], shift=UP * 0.1), Indicate(dix, color=JAUNE_TITRE, scale_factor=1.04), run_time=0.3)
        self.au_mot("25 fois 10")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.2)
        self.au_mot("fois 10, 250")
        self.play(FadeIn(l2[2], shift=UP * 0.1), run_time=0.25)
        l3 = self.ligne([("250", BLEU_D), ("c'est moins que", WHITE), ("300 :", BLEU_D)], 38, buff=0.2)
        self.col(l3, 0.55, XP)
        self.au_mot("centilitres. 250")
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.2)
        self.au_mot("moins que 300")
        self.play(FadeIn(l3[1], shift=UP * 0.1), FadeIn(l3[2], shift=UP * 0.1), run_time=0.25)
        l4 = self.ligne([("il manque", ROUGE_ERREUR), ("50 cL,", ROUGE_ERREUR)], 40, buff=0.2)
        self.col(l4, -0.3, XP)
        self.au_mot("il manque 50")
        self.play(FadeIn(l4, shift=UP * 0.1), run_time=0.25)
        deux = VGroup(pot_vide(0.75), pot_vide(0.75)).arrange(RIGHT, buff=0.16).next_to(dix, DOWN, buff=0.3)
        l5 = self.gros("donc 2 pots de plus !", couleur=ORANGE_RETENUE, fs=46)
        self.col(l5, -1.25, XP)
        self.au_mot("donc 2 pots")
        self.play(FadeIn(l5, scale=1.15), FadeIn(deux, shift=UP * 0.2), run_time=0.4)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        fig = VGroup(bocal(2.0, 1.1), pots(4, 0.8, cols=2)).arrange(RIGHT, buff=0.35, aligned_edge=DOWN)
        lignes = self.finale_gauche(fig, textes=[
            ("Dans un défi : tout", "dans la même unité."),
            ("Puis on calcule : on ajoute,", "on enlève,"),
            ("ou on cherche", "combien de fois.")], fs=32)
        self.add(fig)
        self.au_mot("Dans un défi")
        self.montrer_ligne(lignes[0], Indicate(fig, scale_factor=1.05))
        self.au_mot("Puis on calcule")
        self.montrer_ligne(lignes[1])
        self.au_mot("ou on cherche")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_convertir()
        self.ecran_combien()
        self.ecran_ajouter()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")


class ContenanceDefiCM1(ContenanceDefiBase):
    identite = "Maths CM1 — EleveAI"
    ceinture = "bleue"
