# contenance_comparer.py
# EleveAI — Maths CM2 — série « Contenance », épisode 01 : COMPARER DES CONTENANCES
# (micro contenance_comparer, notion contenance), AVEC VOIX. Paysage 16:9, CEINTURE JAUNE.
# Short jumeau : cm2-contenance-comparer-short (canette 33 cL / bouteille 0,5 L : B).
# Décor et métier : Paul, GLACIER (glaces artisanales ; centres : cuisine, commerce).
# Le CM2, un cran au-dessus du CM1 : un nombre à virgule se convertit avant de comparer
# (2,5 L = 2 L et demi = 250 cL), le décilitre entre dans le tableau L | dL | cL | mL.
# Mapping micro → écrans : contenance_comparer = 02 (même unité d'abord ; tableau des unités :
# 1 L = 10 dL = 100 cL = 1000 mL), 03 (2,5 L = 200 cL + 50 cL = 250 cL, trois bouteilles),
# 04 (250 cL contre 240 cL, bacs à l'échelle, 10 cL de plus), 06 (piège : 240 > 2,5 mais cL contre L),
# questions 05 (A : 1,5 L = 1500 mL > 1200 mL) et 07 (C : 0,5 L = 500 mL, 45 cL = 450 mL, 600 mL),
# défi 08 (ranger 1,2 L, 115 cL, 1250 mL : tout en cL, 115 < 120 < 125).
# Voix : manim/voix/cm2-contenance-comparer.json (validée le 15/11, Julie, débit −6) ;
# marques : contenance_comparer_marques.json (python manim/scripts/cm2/aire_marques_cm2.py contenance:comparer).
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/cm2/contenance_comparer.py ContenanceComparerCM2
# python -m manim render -qh --disable_caching manim/scripts/cm2/contenance_comparer.py ContenanceComparerCM2 -o eleveai-maths-cm2-contenance-comparer --media_dir manim/scripts/cm2/media-contenance-01
# Sortie : manim/sorties/cm2/maths/contenance/01-comparer/eleveai-maths-cm2-contenance-comparer.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from contenance_cm2_commun import *  # noqa: E402,F403

CORNET = "#d6a35c"   # le cornet de glace
FRAISE = "#f9a8d4"   # la boule fraise


def bac(cl, k=0.012, larg=1.5, couleur=MANGUE):
    """Un bac de sorbet : la hauteur dit la contenance (k unités par cL), plein à 90 %."""
    return recipient("pot", k * cl, larg, 0.9, couleur)


def bouteille(cl, couleur=EAU, k=0.016, larg=0.8, niveau=0.9):
    """Une bouteille dont la hauteur du corps dit la contenance (k unités par cL)."""
    return recipient("bouteille", k * cl, larg, niveau, couleur)


def cornet(s=1.0):
    """Un cornet de glace : le cône, une boule mangue, une boule fraise."""
    cone = Polygon(P(-0.32, 0), P(0.32, 0), P(0, -0.9), fill_color=CORNET, fill_opacity=1, stroke_color="#78350f",
                   stroke_width=3)
    b1 = Circle(0.3, fill_color=MANGUE, fill_opacity=1, stroke_width=0).move_to(P(-0.12, 0.2))
    b2 = Circle(0.27, fill_color=FRAISE, fill_opacity=1, stroke_width=0).move_to(P(0.14, 0.42))
    return VGroup(cone, b1, b2).scale(s)


def niveau_haut(r):
    """Le haut du liquide d'un récipient (pour la jauge)."""
    return r.liquide.get_top()[1]


class ContenanceComparerCM2(PaysageContenanceCM2):
    nom_voix = "cm2-contenance-comparer"
    fichier_marques = "contenance_comparer_marques.json"
    ceinture = "jaune"

    def deux_bacs(self, pos, k=0.012):
        """Le bac de 2,5 L (250 cL) et celui de 240 cL, à la même échelle, côte à côte."""
        a, b = bac(250, k), bac(240, k, couleur=MANGUE)
        return rangee_recipients([a, b], 0.6).move_to(pos)

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Comparer des contenances", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Comparer des contenances")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q0 = self.t("Qui contient le plus :", 38)
        q1 = self.ligne([("2,5 L", JAUNE_TITRE), ("ou 240 cL ?", JAUNE_TITRE)], 38, buff=0.2)
        q = VGroup(q0, q1).arrange(DOWN, aligned_edge=LEFT, buff=0.3)
        q.move_to(P(0, 0.3)).align_to(P(-6.2, 0), LEFT)
        g = self.deux_bacs(P(3.6, 0.4), 0.008)
        self.au_mot("contient le plus")
        self.play(FadeIn(q0, shift=UP * 0.2), FadeIn(g, scale=1.1), run_time=0.3)
        self.au_mot("2,5 litres")
        self.play(FadeIn(q1[0], shift=UP * 0.2), run_time=0.25)
        self.au_mot("ou 240")
        self.play(FadeIn(q1[1], shift=UP * 0.2), run_time=0.3)
        self.attendre_voix(marge=0.6)

    # ── 01 : Paul, glacier ──────────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pe = paul(0.95).move_to(P(-5.2, 0.35))
        self.au_mot("Voici Paul")
        nom = self.t("Paul", 42, FRAISE).next_to(pe, UP, buff=0.25)
        self.play(FadeIn(pe, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("Il est glacier")
        met = self.t("glacier", 28, FRAISE).next_to(pe, DOWN, buff=0.15)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.3)
        self.au_mot("glaces artisanales")
        co = cornet(0.75).next_to(met, DOWN, buff=0.45)
        self.play(FadeIn(co, shift=UP * 0.2), run_time=0.35)
        a, b = bac(250, 0.01), bac(240, 0.01)
        rangee_recipients([a, b], 0.45).move_to(P(-2.0, 0.6))
        l0 = self.bloc(["Deux bacs de sorbet", "à la mangue :"], 32, MANGUE)
        l0.move_to(P(0, 2.2)).align_to(P(0.9, 0), LEFT)
        self.au_mot("deux bacs de sorbet")
        self.play(FadeIn(l0[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("à la mangue")
        self.play(FadeIn(l0[1], shift=UP * 0.1), run_time=0.25)
        l1 = self.ligne([("un de", WHITE), ("2,5 L,", JAUNE_TITRE)], 34, buff=0.2)
        l1.move_to(P(0, 1.05)).align_to(l0, LEFT)
        self.au_mot("un de 2,5 litres")
        ea = contenance(a, "2,5 L")
        self.play(FadeIn(a, shift=UP * 0.2), FadeIn(l1, shift=UP * 0.1), FadeIn(ea), run_time=0.4)
        l2 = self.ligne([("et un de", WHITE), ("240 cL.", JAUNE_TITRE)], 34, buff=0.2)
        l2.next_to(l1, DOWN, buff=0.25).align_to(l0, LEFT)
        self.au_mot("un de 240 centilitres")
        eb = contenance(b, "240 cL")
        self.play(FadeIn(b, shift=UP * 0.2), FadeIn(l2, shift=UP * 0.1), FadeIn(eb), run_time=0.4)
        l3 = self.bloc(["Pour la fête du quartier :", "servir le plus grand."], 30)
        l3.next_to(l2, DOWN, buff=0.45).align_to(l0, LEFT)
        self.au_mot("fête du quartier")
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("servir le plus grand")
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("Lequel prendre")
        q = self.t("Lequel prendre ?", 40, JAUNE_TITRE).move_to(P(-0.6, -2.6))
        self.play(FadeIn(q, shift=UP * 0.15), Wiggle(VGroup(a, b)), run_time=0.5)
        self.attendre_voix()

    # ── 02 : la même unité ; le tableau des unités ──────────────────────────
    def ecran_meme_unite(self):
        self.ecran("02-meme-unite")
        XP = 0.6
        bo = bouteille(100, EAU, 0.016, 0.9).move_to(P(-3.6, 1.55))
        tab = tableau_unites(larg=1.15, haut=0.75, fs=32).move_to(P(-3.6, -1.15))
        self.au_mot("Pour comparer deux contenances")
        l0 = self.bloc(["Pour comparer", "deux contenances :"], 34, JAUNE_TITRE)
        self.col(l0, 2.45, XP)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.35)
        self.au_mot("dans la même unité")
        l1 = self.bloc(["d'abord la même", "unité !"], 34, ORANGE_RETENUE)
        self.col(l1, 1.15, XP)
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(bo, shift=UP * 0.2), FadeIn(tab), run_time=0.4)
        self.au_mot("Retiens")
        l2 = self.t("Retiens :", 32, GRAY_B)
        self.col(l2, 0.15, XP)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.3)
        l3 = self.ligne([("1 L", BLEU_D), ("= 10 dL", VERT_OK)], 40, buff=0.25)
        self.col(l3, -0.6, XP)
        egal = l3[1][0]
        l4 = self.t("= 100 cL", 40, VERT_OK)
        l4.move_to(P(0, -1.35)).align_to(egal, LEFT)
        l5 = self.t("= 1000 mL", 40, VERT_OK)
        l5.move_to(P(0, -2.1)).align_to(egal, LEFT)
        c1 = chiffre(tab, 0, "1", 36, BLEU_D)
        self.au_mot("1 litre")
        self.play(FadeIn(l3[0], shift=UP * 0.1), FadeIn(c1, scale=1.3), Indicate(bo, scale_factor=1.05),
                  run_time=0.3)
        self.au_mot("10 décilitres")
        z1 = chiffre(tab, 1, "0", 36, VERT_OK)
        self.play(FadeIn(l3[1], shift=UP * 0.1), FadeIn(z1, scale=1.3), Indicate(tab.tetes[1], color=VERT_OK),
                  run_time=0.3)
        self.au_mot("100 centilitres")
        z2 = chiffre(tab, 2, "0", 36, VERT_OK)
        self.play(FadeIn(l4, shift=UP * 0.1), FadeIn(z2, scale=1.3), Indicate(tab.tetes[2], color=VERT_OK),
                  run_time=0.3)
        self.au_mot("1000 millilitres")
        z3 = chiffre(tab, 3, "0", 36, VERT_OK)
        self.play(FadeIn(l5, shift=UP * 0.1), FadeIn(z3, scale=1.3), Indicate(tab.tetes[3], color=VERT_OK),
                  run_time=0.3)
        self.attendre_voix()

    # ── 03 : 2,5 L = 2 L et demi = 250 cL ───────────────────────────────────
    def ecran_virgule(self):
        self.ecran("03-virgule")
        XP = 0.6
        bs = [bouteille(100, MANGUE, 0.016, 0.8, 0.95), bouteille(100, MANGUE, 0.016, 0.8, 0.95),
              bouteille(100, MANGUE, 0.016, 0.8, 0.475)]
        g = rangee_recipients(bs, 0.45).move_to(P(-3.7, 1.0))
        self.au_mot("2,5 litres")
        l0 = self.ligne([("2,5 L", BLEU_D), ("= 2 L", WHITE), ("et demi", WHITE)], 38, buff=0.25)
        self.col(l0, 2.45, XP)
        self.play(FadeIn(l0[0], shift=UP * 0.1), run_time=0.2)
        self.au_mot("c'est 2 litres")
        self.play(FadeIn(l0[1], shift=UP * 0.1), FadeIn(bs[0], shift=UP * 0.2), FadeIn(bs[1], shift=UP * 0.2),
                  run_time=0.25)
        self.au_mot("et demi")
        self.play(FadeIn(l0[2], shift=UP * 0.1), FadeIn(bs[2], shift=UP * 0.2), run_time=0.2)
        l1 = self.ligne([("2 L", BLEU_D), ("= 200 cL", VERT_OK)], 38, buff=0.25)
        self.col(l1, 1.5, XP)
        acc1 = Brace(VGroup(bs[0], bs[1]), DOWN, color=VERT_OK, buff=0.12)
        e1 = hors_audit(Text("200 cL", font_size=28, color=VERT_OK, weight=BOLD)).next_to(acc1, DOWN, buff=0.1)
        self.au_mot("demi. 2 litres")
        self.play(FadeIn(l1[0], shift=UP * 0.1), Indicate(VGroup(bs[0], bs[1]), color=VERT_OK, scale_factor=1.05),
                  run_time=0.3)
        self.au_mot("200 centilitres")
        self.play(FadeIn(l1[1], shift=UP * 0.1), GrowFromCenter(acc1), FadeIn(e1), run_time=0.35)
        l2 = self.ligne([("Un demi-litre", ROSE_D), ("= 50 cL", VERT_OK)], 36, buff=0.25)
        self.col(l2, 0.6, XP)
        acc2 = Brace(bs[2], DOWN, color=ROSE_D, buff=0.12)
        acc2.shift(UP * (acc1.get_bottom()[1] - acc2.get_bottom()[1]))
        e2 = hors_audit(Text("50 cL", font_size=28, color=ROSE_D, weight=BOLD)).next_to(acc2, DOWN, buff=0.1)
        e2.set_y(e1.get_y())
        self.au_mot("Un demi-litre")
        self.play(FadeIn(l2[0], shift=UP * 0.1), Indicate(bs[2], color=ROSE_D, scale_factor=1.06), run_time=0.3)
        self.au_mot("50 centilitres")
        self.play(FadeIn(l2[1], shift=UP * 0.1), GrowFromCenter(acc2), FadeIn(e2), run_time=0.35)
        l3 = self.ligne([("2,5 L", BLEU_D), ("= 250 cL", VERT_OK)], 46, buff=0.3)
        boite = SurroundingRectangle(l3, color=VERT_OK, buff=0.2, corner_radius=0.12, stroke_width=5)
        res = VGroup(boite, l3)
        self.col(res, -0.55, XP)
        tot = hors_audit(Text("250 cL", font_size=40, color=VERT_OK, weight=BOLD)).move_to(P(-3.7, -2.15))
        self.au_mot("Donc 2,5 litres")
        self.play(Create(boite), FadeIn(l3[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("250 centilitres")
        self.play(FadeIn(l3[1], scale=1.2), FadeIn(tot, scale=1.3), run_time=0.4)
        self.insister(res, 1.1, 0.25)
        self.attendre_voix()

    # ── 04 : 250 cL contre 240 cL ───────────────────────────────────────────
    def ecran_comparer(self):
        self.ecran("04-comparer")
        XP = 0.6
        g = self.deux_bacs(P(-3.7, 0.55), 0.011)
        a, b = g
        ea, eb = contenance(a, "2,5 L"), contenance(b, "240 cL")
        self.add(g, ea, eb)
        ya, yb = niveau_haut(a), niveau_haut(b)
        x0, x1 = g.get_left()[0] - 0.25, g.get_right()[0] + 0.25
        ja = DashedLine(P(x0, ya), P(x1, ya), color=VERT_OK, stroke_width=3, dash_length=0.1)
        jb = DashedLine(P(x0, yb), P(x1, yb), color=GRAY_B, stroke_width=3, dash_length=0.1)
        l0 = self.ligne([("On compare", WHITE), ("250 cL", BLEU_D), ("et", WHITE), ("240 cL", BLEU_D)], 32,
                        buff=0.18)
        self.col(l0, 2.45, XP)
        self.au_mot("On compare")
        self.play(FadeIn(l0[0], shift=UP * 0.1), run_time=0.2)
        self.au_mot("compare 250")
        e250 = hors_audit(Text("250 cL", font_size=28, color=VERT_OK, weight=BOLD).move_to(ea))
        self.play(FadeIn(l0[1], shift=UP * 0.1), Transform(ea, e250), run_time=0.3)
        self.au_mot("et 240")
        self.play(FadeIn(l0[2], shift=UP * 0.1), FadeIn(l0[3], shift=UP * 0.1), Indicate(eb), run_time=0.25)
        l1 = self.ligne([("250", VERT_OK), ("est plus grand.", WHITE)], 36, buff=0.2)
        self.col(l1, 1.65, XP)
        self.au_mot("centilitres : 250")
        self.play(FadeIn(l1[0], shift=UP * 0.1), Create(ja), Create(jb), run_time=0.3)
        self.au_mot("est plus grand")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.25)
        self.au_mot("Le bac de 2,5")
        l2 = self.ligne([("Le bac de", WHITE), ("2,5 L", VERT_OK)], 36, buff=0.2)
        self.col(l2, 0.85, XP)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.3)
        self.au_mot("contient le plus")
        res = self.gros("contient le plus,", fs=44)
        self.col(res, 0.05, XP)
        self.play(FadeIn(res, scale=1.2), Indicate(a, color=VERT_OK, scale_factor=1.06), run_time=0.45)
        l3 = self.ligne([("10 cL", ORANGE_RETENUE), ("de plus.", WHITE)], 36, buff=0.2)
        self.col(l3, -0.8, XP)
        fl = DoubleArrow(P(x1 - 0.05, yb - 0.02), P(x1 - 0.05, ya + 0.02), color=ORANGE_RETENUE, buff=0,
                         stroke_width=4, tip_length=0.12, max_tip_length_to_length_ratio=0.5)
        e10 = hors_audit(Text("10 cL", font_size=26, color=ORANGE_RETENUE, weight=BOLD)) \
            .next_to(P(x1, (ya + yb) / 2), RIGHT, buff=0.12)
        self.au_mot("plus, 10")
        self.play(FadeIn(l3[0], shift=UP * 0.1), FadeIn(fl), FadeIn(e10), run_time=0.3)
        self.au_mot("centilitres de plus")
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.25)
        self.au_mot("Paul l'emporte")
        cli = self.t("Paul l'emporte à la fête !", 30, GRAY_B)
        self.col(cli, -1.6, XP)
        self.play(FadeIn(cli, shift=UP * 0.1), a.animate.shift(UP * 0.12), run_time=0.35)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (réponse A) ─────────────────────────────────────────
    def figure_q1(self):
        bo = bouteille(150, EAU, 0.011, 0.8)
        go = recipient("gourde", 0.011 * 120, 0.9, 0.9, "#a78bfa")
        g = rangee_recipients([bo, go], 0.8).move_to(P(-3.8, 2.0))
        ets = VGroup(contenance(bo, "1,5 L", 26), contenance(go, "1200 mL", 26))
        return VGroup(g, ets)

    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        f = self.figure_q1()

        def autres_q(sc):
            sc.play(FadeIn(f), run_time=0.35)

        self.question_gauche("05-question", "05b-reponse",
                             ["Qu'est-ce qui contient le plus :", "une bouteille de 1,5 L,", "ou une gourde de 1200 mL ?"],
                             [self.choix("la bouteille"), self.choix("la gourde"), self.choix("c'est pareil")], 0,
                             ["1,5 L = 1500 mL.", "1500 est plus grand", "que 1200 :", "la bouteille",
                              "contient le plus."],
                             0.4, couper={1: ("1500", "est plus grand")},
                             mot_q="Qu'est-ce qui contient", autres_q=autres_q)

    # ── 06 : le piège (240 > 2,5, mais cL contre L) ─────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        self.au_mot("Attention")
        XP = -0.6
        tit = self.t("Attention au piège !", 46, ROUGE_ERREUR)
        gauche(tit, -6.2, 3.05)
        self.play(Write(tit), run_time=0.35)
        g = self.deux_bacs(P(-3.8, 0.1), 0.009)
        a, b = g
        ea, eb = contenance(a, "2,5 L", 32), contenance(b, "240 cL", 32)
        self.add(g, ea, eb)
        l0 = self.bloc(["On ne compare pas les nombres", "sans regarder les unités."], 32)
        self.col(l0, 1.95, XP)
        self.au_mot("On ne compare pas")
        self.play(FadeIn(l0[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("sans regarder les unités")
        self.play(FadeIn(l0[1], shift=UP * 0.1), run_time=0.3)
        l1 = self.ligne([("240", ROUGE_ERREUR), ("est plus grand que", WHITE), ("2,5…", ROUGE_ERREUR)], 34,
                        buff=0.2)
        self.col(l1, 0.9, XP)
        self.au_mot("unités. 240")
        self.play(FadeIn(l1[0], shift=UP * 0.1), Indicate(eb, color=ROUGE_ERREUR), run_time=0.25)
        self.au_mot("est plus grand")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.2)
        self.au_mot("que 2,5")
        self.play(FadeIn(l1[2], shift=UP * 0.1), Indicate(ea, color=ROUGE_ERREUR), run_time=0.25)
        l2 = self.ligne([("mais", WHITE), ("des cL", ROUGE_ERREUR), ("contre", WHITE), ("des L !", ROUGE_ERREUR)],
                        34, buff=0.2)
        self.col(l2, 0.2, XP)
        self.au_mot("ce sont des centilitres")
        self.play(FadeIn(l2[0], shift=UP * 0.1), FadeIn(l2[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("contre des litres")
        self.play(FadeIn(l2[2], shift=UP * 0.1), FadeIn(l2[3], shift=UP * 0.1), run_time=0.3)
        self.au_mot("Mets toujours la même")
        l3 = self.bloc(["Mets toujours la même", "unité avant de comparer."], 34, JAUNE_TITRE)
        self.col(l3, -0.95, XP)
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("unité avant")
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.3)
        self.insister(l3, 1.06, 0.25, about=l3.get_left())
        self.attendre_voix()

    # ── 07 : QUESTION 2 (réponse C) ─────────────────────────────────────────
    def figure_q2(self):
        k = 0.026
        ps = [recipient("pot", k * 50, 0.95, 0.9, LAIT), recipient("pot", k * 45, 0.95, 0.9, FRAISE),
              recipient("pot", k * 60, 0.95, 0.9, "#a3e635")]
        g = rangee_recipients(ps, 0.55).move_to(P(-3.8, 2.05))
        ets = VGroup(*[contenance(p, s, 26) for p, s in zip(ps, ["0,5 L", "45 cL", "600 mL"])])
        return VGroup(g, ets)

    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        f = self.figure_q2()

        def autres_q(sc):
            sc.play(FadeIn(f), run_time=0.35)

        def apres(sc):
            sc.play(Indicate(f[0][1], color=VERT_OK, scale_factor=1.08), run_time=0.2)

        self.question_gauche("07-question", "07b-reponse",
                             ["Trois pots :", "0,5 L, 45 cL et 600 mL.", "Lequel est le plus petit ?"],
                             [self.choix("0,5 L"), self.choix("600 mL"), self.choix("45 cL")], 2,
                             ["Tout en mL :", "0,5 L = 500 mL,", "45 cL = 450 mL,", "et 600 mL.",
                              "Le plus petit : 450 mL,", "le pot de 45 cL."],
                             0.45,
                             mot_q="trois pots", autres_q=autres_q, autres_r=apres)

    # ── 08 : le défi (ranger trois bidons de lait) ──────────────────────────
    def bidons(self, k=0.017):
        """Les bidons de 1,2 L, 115 cL et 1250 mL (dans l'ordre de la voix), à la même échelle."""
        return VGroup(*[recipient("bidon", k * cl, 1.05, 0.9, LAIT) for cl in (120, 115, 125)])

    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        bi = self.bidons()
        rangee_recipients(bi, 0.95).move_to(P(-3.6, 0.55))
        XP = 0.6
        l0 = self.bloc(["Range ces trois", "bidons de lait"], 34)
        self.col(l0, 2.05, XP)
        l1 = self.bloc(["du plus petit", "au plus grand :"], 34, JAUNE_TITRE)
        self.col(l1, 0.85, XP)
        self.au_mot("Range ces trois")
        self.play(FadeIn(l0[0], shift=UP * 0.1), run_time=0.25)
        self.au_mot("bidons de lait")
        self.play(FadeIn(l0[1], shift=UP * 0.1), run_time=0.25)
        self.au_mot("du plus petit")
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.2)
        self.au_mot("au plus grand")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.2)
        for k, (mot, s) in enumerate([("grand : 1,2", "1,2 L"), ("litre, 115", "115 cL"), ("et 1250", "1250 mL")]):
            self.au_mot(mot)
            self.play(FadeIn(bi[k], shift=UP * 0.2), FadeIn(contenance(bi[k], s, 26, audit=True)), run_time=0.3)
        self.pause_defi(y=-0.75)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        bi = self.bidons()
        rangee_recipients(bi, 0.95).move_to(P(-3.6, 0.75))
        ets = [contenance(r, s, 26) for r, s in zip(bi, ["1,2 L", "115 cL", "1250 mL"])]
        self.add(bi, *ets)
        XP = 0.6
        self.au_mot("Tout en centilitres")
        l0 = self.t("Tout en cL :", 36, ORANGE_RETENUE)
        self.col(l0, 2.35, XP)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.3)
        l1 = self.ligne([("1,2 L", BLEU_D), ("= 120 cL", VERT_OK)], 38, buff=0.25)
        self.col(l1, 1.6, XP)
        self.au_mot("centilitres : 1,2")
        self.play(FadeIn(l1[0], shift=UP * 0.1), Indicate(ets[0]), run_time=0.25)
        self.au_mot("litre, 120")
        self.play(FadeIn(l1[1], shift=UP * 0.1),
                  Transform(ets[0], hors_audit(Text("120 cL", font_size=26, color=VERT_OK, weight=BOLD)
                                               .move_to(ets[0]))), run_time=0.35)
        l2 = self.ligne([("1250 mL", BLEU_D), ("= 125 cL", VERT_OK)], 38, buff=0.25)
        self.col(l2, 0.85, XP)
        self.au_mot("centilitres. 1250")
        self.play(FadeIn(l2[0], shift=UP * 0.1), Indicate(ets[2]), run_time=0.25)
        self.au_mot("millilitres, 125")
        self.play(FadeIn(l2[1], shift=UP * 0.1),
                  Transform(ets[2], hors_audit(Text("125 cL", font_size=26, color=VERT_OK, weight=BOLD)
                                               .move_to(ets[2]))), run_time=0.35)
        l3 = self.ligne([("On range :", WHITE), ("115, 120, 125", VERT_OK)], 34, buff=0.22)
        self.col(l3, 0.1, XP)
        self.au_mot("On range")
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.2)
        self.au_mot("115, 120, 125")
        # le nouvel ordre : 115 cL, 1,2 L (120), 1250 mL (125)
        xs = [bi[k].get_x() for k in range(3)]
        self.play(FadeIn(l3[1], shift=UP * 0.1),
                  VGroup(bi[1], ets[1]).animate.set_x(xs[0]), VGroup(bi[0], ets[0]).animate.set_x(xs[1]),
                  run_time=0.6)
        ordre = [1, 0, 2]
        l4 = self.ligne([("115 cL,", VERT_OK), ("puis 1,2 L,", VERT_OK)], 34, buff=0.22)
        self.col(l4, -0.65, XP)
        l5 = self.t("puis 1250 mL.", 34, VERT_OK)
        self.col(l5, -1.35, XP)
        for k, (mot, m) in enumerate([("d'abord 115", l4[0]), ("puis 1,2", l4[1]), ("puis 1250", l5)]):
            self.au_mot(mot)
            i = ordre[k]
            n = hors_audit(Text(str(k + 1), font_size=34, color=JAUNE_TITRE, weight=BOLD)
                           .next_to(bi[i], UP, buff=0.18))
            self.play(FadeIn(m, shift=UP * 0.1), FadeIn(n, scale=1.4),
                      Indicate(bi[i], color=VERT_OK, scale_factor=1.05), run_time=0.3)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        fig = self.deux_bacs(P(0, 0), 0.009)
        lignes = self.finale_gauche(fig, textes=[
            ("Pour comparer : d'abord", "la même unité."),
            ("1 L = 100 cL", "= 1000 mL."),
            ("Un nombre à virgule aussi :", "2,5 L = 250 cL.")], fs=32)
        ets = VGroup(contenance(fig[0], "250 cL", 26), contenance(fig[1], "240 cL", 26))
        self.add(fig, ets)
        self.au_mot("Pour comparer")
        self.montrer_ligne(lignes[0], Indicate(fig, scale_factor=1.05))
        self.au_mot("1 litre")
        self.montrer_ligne(lignes[1])
        self.au_mot("Un nombre à virgule")
        self.montrer_ligne(lignes[2], Indicate(fig[0], color=VERT_OK, scale_factor=1.05))
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_meme_unite()
        self.ecran_virgule()
        self.ecran_comparer()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")
