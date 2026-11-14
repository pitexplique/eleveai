# contenance_probleme.py
# EleveAI — Maths CE2 — série « Contenance », épisode 04 : résoudre un problème de contenances
# (micro ce2_contenance_probleme, notion contenance), AVEC VOIX. Paysage 16:9, CEINTURE ORANGE.
# Short jumeau : film Ti Margo (l'arrosoir, réponse C).
# Décor et métier : Mélissa, HORTICULTRICE dans une serre (centre : nature-ecologie).
# Mapping micro → écrans : 02 (la même unité : 5 L = 500 cL), 03 (ajouter : 80 + 80 = 160 cL),
# 04 (enlever : 500 − 160 = 340 cL), 06 (piège : 2 L + 50 cL ≠ 52), 08 (défi : répéter, 4 L en pichets de 50 cL),
# questions 05 (2 L + 50 cL, A) et 07 (1 L − 3 × 20 cL, C).
# Voix : manim/voix/ce2-contenance-probleme.json (validée le 14/11, Julie, débit −6) ;
# marques : contenance_probleme_marques.json (python manim/scripts/ce2/perimetre_marques.py contenance:probleme).
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/ce2/contenance_probleme.py ContenanceProblemeCE2
# python -m manim render -qh --disable_caching manim/scripts/ce2/contenance_probleme.py ContenanceProblemeCE2 -o eleveai-maths-ce2-contenance-probleme --media_dir manim/scripts/ce2/media-cont-04
# Sortie : manim/sorties/ce2/maths/contenance/04-probleme/eleveai-maths-ce2-contenance-probleme.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from contenance_ce2_commun import *  # noqa: E402,F403

NATURE = "#4ade80"


def serre(larg=3.2, h=2.2):
    """Une serre vue de face : murs vitrés, toit en pointe."""
    murs = Rectangle(width=larg, height=h * 0.6, stroke_color="#a7f3d0", stroke_width=3, fill_color="#064e3b",
                     fill_opacity=0.25)
    toit = Polygon(murs.get_corner(UL), murs.get_corner(UR), murs.get_top() + UP * h * 0.4,
                   stroke_color="#a7f3d0", stroke_width=3, fill_color="#064e3b", fill_opacity=0.25)
    vitres = VGroup(*[Line(murs.get_bottom() + RIGHT * larg * k / 4, murs.get_top() + RIGHT * larg * k / 4,
                           color="#a7f3d0", stroke_width=1.5) for k in (-1, 0, 1)])
    return VGroup(murs, toit, vitres)


def pichet(couleur=EAU, h=0.9):
    return recipient("pichet", h, 0.6, 0.8, couleur)


class ContenanceProblemeBase(PaysageContenanceCE2):
    nom_voix = "ce2-contenance-probleme"
    fichier_marques = "contenance_probleme_marques.json"
    ceinture = "orange"

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Un problème de contenances", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Un problème de contenances")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q = self.bloc(["Combien reste-t-il", "dans l'arrosoir ?"], 40, JAUNE_TITRE, buff=0.22)
        q.move_to(P(0, 0.4)).align_to(P(-6.2, 0), LEFT)
        ar = arrosoir(1.1).move_to(P(3.8, 0.3))
        self.au_mot("Combien reste-t-il")
        self.play(FadeIn(q[0], shift=UP * 0.2), FadeIn(ar, scale=1.1), run_time=0.35)
        self.au_mot("dans l'arrosoir")
        self.play(FadeIn(q[1], shift=UP * 0.2), Wiggle(ar), run_time=0.5)
        self.attendre_voix(marge=0.6)

    # ── 01 : Mélissa, horticultrice ─────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pe = melissa(0.95).move_to(P(-5.0, 0.0))
        self.au_mot("Voici Mélissa")
        nom = self.t("Mélissa", 42, NATURE).next_to(pe, UP, buff=0.45)
        self.play(FadeIn(pe, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("Elle est horticultrice")
        met = self.t("horticultrice", 26, NATURE).next_to(pe, DOWN, buff=0.12)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.35)
        se = serre().move_to(P(-1.6, 1.3))
        self.au_mot("dans une serre")
        l0 = hors_audit(self.bloc(["Elle fait pousser des fleurs", "dans une serre."], 30, GRAY_B))
        self.col(l0, 2.6, 1.2)
        fl = VGroup(*[plant(0.5) for _ in range(3)]).arrange(RIGHT, buff=0.35).move_to(se[0]).shift(DOWN * 0.1)
        self.play(FadeIn(se), FadeIn(fl, shift=UP * 0.1), FadeIn(l0, shift=UP * 0.1), run_time=0.5)
        ar = arrosoir(0.85).move_to(P(-2.4, -1.7))
        l1 = self.ligne([("Son arrosoir :", WHITE), ("5 L", JAUNE_TITRE)], 34, buff=0.2)
        self.col(l1, 1.2, 1.2)
        self.au_mot("Son arrosoir contient")
        self.play(FadeIn(ar, shift=UP * 0.2), FadeIn(l1[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("contient 5 litres")
        self.play(FadeIn(l1[1], shift=UP * 0.1), FadeIn(contenance(ar, "5 L", 28)), run_time=0.3)
        pl = VGroup(plant(0.75), plant(0.75)).arrange(RIGHT, buff=0.5).move_to(P(-0.4, -1.6))
        l2 = self.ligne([("Elle arrose", WHITE), ("deux plants,", JAUNE_TITRE)], 34, buff=0.2)
        self.col(l2, 0.45, 1.2)
        self.au_mot("Elle arrose deux plants")
        self.play(FadeIn(l2, shift=UP * 0.1), FadeIn(pl, shift=UP * 0.2), run_time=0.4)
        l3 = self.ligne([("avec", WHITE), ("80 cL", JAUNE_TITRE), ("chacun.", WHITE)], 34, buff=0.2)
        self.col(l3, -0.3, 1.2)
        self.au_mot("80 centilitres chacun")
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.3)
        self.au_mot("Combien de centilitres")
        q = self.bloc(["Combien de centilitres", "reste-t-il dans l'arrosoir ?"], 36, JAUNE_TITRE)
        self.col(q, -1.3, 1.2)
        self.play(FadeIn(q, shift=UP * 0.1), Wiggle(ar), run_time=0.5)
        self.attendre_voix()

    # ── 02 : la même unité ──────────────────────────────────────────────────
    def ecran_convertir(self):
        self.ecran("02-convertir")
        ar = arrosoir(1.1).move_to(P(-4.6, 0.6))
        ea = contenance(ar, "5 L", 32)
        self.add(ar, ea)
        XP = -1.8
        self.au_mot("la même unité")
        l0 = self.t("D'abord, la même unité.", 38, ORANGE_RETENUE)
        self.col(l0, 2.6, XP)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.35)
        l1 = self.ligne([("1 L", BLEU_D), ("= 100 cL", VERT_OK)], 44, buff=0.3)
        self.col(l1, 1.6, XP)
        self.au_mot("1 litre")
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.25)
        self.au_mot("c'est 100")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.3)
        l2 = self.ligne([("5 L", BLEU_D), ("= 5 × 100", BLEU_D), ("= 500 cL", VERT_OK)], 46, buff=0.25)
        self.col(l2, 0.5, XP)
        bs = VGroup(*[recipient("bouteille", 1.0, 0.5, 0.85, EAU) for _ in range(5)]).arrange(RIGHT, buff=0.3)
        bs.move_to(P(0.6, -1.6))
        cents = VGroup(*[hors_audit(self.t("100", 26, VERT_OK).next_to(b, DOWN, buff=0.12)) for b in bs])
        self.au_mot("5 litres")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.25)
        self.au_mot("5 fois 100")
        self.play(FadeIn(l2[1], shift=UP * 0.1), LaggedStart(*[FadeIn(VGroup(b, c), shift=UP * 0.1)
                                                                 for b, c in zip(bs, cents)], lag_ratio=0.1),
                  run_time=0.5)
        self.au_mot("500 centilitres")
        e5 = hors_audit(Text("500 cL", font_size=32, color=VERT_OK, weight=BOLD).move_to(ea))
        self.play(FadeIn(l2[2], shift=UP * 0.1), Transform(ea, e5), run_time=0.4)
        self.insister(l2[2], 1.15, 0.25)
        self.attendre_voix()

    # ── 03 : ce qu'elle verse ───────────────────────────────────────────────
    def ecran_verse(self):
        self.ecran("03-verse")
        pl = VGroup(plant(1.1), plant(1.1)).arrange(RIGHT, buff=1.6).move_to(P(-3.0, -0.6))
        ets = VGroup(*[hors_audit(self.t("80 cL", 30, EAU).next_to(p, DOWN, buff=0.2)) for p in pl])
        ar = arrosoir(0.8).move_to(P(-5.2, 2.2))
        self.add(pl)
        self.au_mot("Les deux plants")
        l0 = self.t("Les deux plants :", 38, JAUNE_TITRE)
        self.col(l0, 2.4, -0.8)
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(ar), run_time=0.3)
        l1 = self.ligne([("80", BLEU_D), ("+ 80", BLEU_D), ("= 160 cL", VERT_OK)], 48, buff=0.25)
        self.col(l1, 0.9, -0.8)
        hors_audit(l1[1])  # « 80 » redit : posé à son extrait
        self.au_mot("80 plus")
        self.play(FadeIn(l1[0], shift=UP * 0.1), FadeIn(ets[0]),
                  ar.animate.move_to(pl[0].get_top() + P(-0.4, 1.0)).rotate(-0.4), run_time=0.3)
        self.au_mot("plus 80")
        self.wait(0.3)
        self.play(FadeIn(l1[1], shift=UP * 0.1), FadeIn(ets[1]),
                  ar.animate.move_to(pl[1].get_top() + P(-0.4, 1.0)), run_time=0.3)
        self.au_mot("160 centilitres")
        self.play(FadeIn(l1[2], shift=UP * 0.1), run_time=0.3)
        self.insister(l1[2], 1.15, 0.25)
        self.attendre_voix()

    # ── 04 : ce qui reste ───────────────────────────────────────────────────
    def ecran_reste(self):
        self.ecran("04-reste")
        self.au_mot("On enlève")
        l0 = self.t("On enlève ce qu'elle a versé.", 38, JAUNE_TITRE)
        gauche(l0, -6.2, 2.9)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.35)
        W, H = 10.0, 0.9
        tout = Rectangle(width=W, height=H, fill_color=EAU, fill_opacity=0.35, stroke_color=WHITE, stroke_width=2)
        tout.move_to(P(-0.4, 1.4))
        verse = Rectangle(width=W * 160 / 500, height=H, fill_color=ORANGE_RETENUE, fill_opacity=0.85,
                          stroke_width=0).align_to(tout, RIGHT).set_y(tout.get_y())
        reste = Rectangle(width=W * 340 / 500, height=H, fill_color=VERT_OK, fill_opacity=0.6,
                          stroke_width=0).align_to(tout, LEFT).set_y(tout.get_y())
        e500 = hors_audit(self.t("500 cL", 30, BLEU_D).next_to(tout, UP, buff=0.12))
        e160 = hors_audit(self.t("160 cL versés", 24, WHITE).move_to(verse))
        e340 = hors_audit(self.t("340 cL", 32, WHITE).move_to(reste))
        l1 = self.ligne([("500", BLEU_D), ("− 160", ORANGE_RETENUE), ("= 340", VERT_OK)], 52, buff=0.25)
        gauche(l1, -5.6, -0.3)
        self.aux_extraits([l1[0]], ["500 moins"])
        self.play(FadeIn(tout), FadeIn(e500), run_time=0.3)
        self.aux_extraits([l1[1]], ["160, 340"])
        self.play(FadeIn(verse), FadeIn(e160), run_time=0.3)
        self.aux_extraits([l1[2]], ["340. Il"])
        self.play(FadeIn(reste), FadeIn(e340), run_time=0.3)
        res = self.ligne([("Il reste", WHITE), ("340 cL", VERT_OK), ("dans l'arrosoir.", WHITE)], 42, buff=0.22)
        gauche(res, -5.6, -1.7)
        hors_audit(res[1])
        self.aux_extraits([res[0], res[1]], ["Il reste", ("340 centilitres", 1)])
        self.au_mot("dans l'arrosoir")
        self.play(FadeIn(res[2], shift=UP * 0.1), run_time=0.3)
        self.insister(res[1], 1.15, 0.25)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (réponse A) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        g = rangee_recipients([recipient("bouteille", 1.6, 0.75, 0.85, JUS),
                               recipient("bouteille", 1.6, 0.75, 0.85, JUS),
                               recipient("verre", 0.8, 0.6, 0.8, EAU)], 0.35).move_to(P(-3.8, 1.5))

        def autres_q(sc):
            sc.play(FadeIn(g), run_time=0.35)

        def apres(sc):
            sc.play(Indicate(g, color=VERT_OK, scale_factor=1.06), run_time=0.2)

        self.question_gauche("05-question", "05b-reponse",
                             ["Mélissa mélange 2 L de jus", "et 50 cL d'eau.", "Combien de centilitres en tout ?"],
                             [self.choix("250 cL"), self.choix("52 cL"), self.choix("70 cL")], 0,
                             ["2 L : 2 × 100 = 200 cL.", "200 + 50 = 250 cL", "de boisson."],
                             -0.75, couper={0: ("2 L :", "2 × 100", "= 200 cL."), 1: ("200 + 50", "= 250 cL")},
                             mot_q="Mélissa mélange", autres_q=autres_q, autres_r=apres)

    # ── 06 : le piège ───────────────────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        self.au_mot("Attention")
        tit = self.t("Attention au piège !", 46, ROUGE_ERREUR)
        gauche(tit, -6.2, 3.0)
        self.play(Write(tit), run_time=0.35)
        fx = self.ligne([("2 L + 50 cL", WHITE), ("= 52", ROUGE_ERREUR)], 54, buff=0.3)
        gauche(fx, -5.6, 1.7)
        self.aux_extraits([fx[0]], [("2 litres plus 50", 1, 0.0)])
        self.au_mot("pas 52")
        croix = Cross(fx[1], stroke_color=ROUGE_ERREUR, stroke_width=6, scale_factor=1.1)
        self.play(FadeIn(fx[1], shift=UP * 0.1), run_time=0.2)
        self.play(Create(croix), run_time=0.3)
        g = rangee_recipients([recipient("bouteille", 1.6, 0.7, 0.85, JUS),
                               recipient("bouteille", 1.6, 0.7, 0.85, JUS),
                               recipient("verre", 0.8, 0.6, 0.8, EAU)], 0.3).move_to(P(4.2, 1.6))
        self.play(FadeIn(g, shift=UP * 0.1), run_time=0.3)
        self.au_mot("On n'ajoute pas")
        l1 = self.ligne([("On n'ajoute pas des", WHITE), ("litres", ORANGE_RETENUE), ("et des", WHITE),
                         ("centilitres.", ORANGE_RETENUE)], 34, buff=0.18)
        gauche(l1, -6.0, 0.3)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.35)
        self.au_mot("On convertit d'abord")
        l2 = self.t("On convertit d'abord,", 40, VERT_OK)
        gauche(l2, -6.0, -0.8)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.3)
        self.au_mot("puis on calcule")
        l3 = self.t("puis on calcule.", 40, VERT_OK)
        gauche(l3, -6.0, -1.7)
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.3)
        self.insister(VGroup(l2, l3), 1.08, 0.25)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (réponse C) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        g = rangee_recipients([recipient("bouteille", 1.8, 0.8, 0.85, EAU)]
                              + [recipient("verre", 0.75, 0.55, 0.8, EAU) for _ in range(3)], 0.3)
        g.move_to(P(-3.8, 1.5))

        def autres_q(sc):
            sc.play(FadeIn(g), run_time=0.35)

        def apres(sc):
            sc.play(Indicate(g[0], color=VERT_OK, scale_factor=1.06), run_time=0.2)

        self.question_gauche("07-question", "07b-reponse",
                             ["Une bouteille contient 1 L.", "Mélissa remplit 3 verres de 20 cL.",
                              "Combien de centilitres reste-t-il ?"],
                             [self.choix("60 cL"), self.choix("97 cL"), self.choix("40 cL")], 2,
                             ["3 × 20 = 60 cL.", "1 L = 100 cL.", "100 − 60 = 40.", "Il reste 40 cL."],
                             -0.75, sans_audit=(3,), mot_q="Une bouteille contient", autres_q=autres_q, autres_r=apres)

    # ── 08 : le défi ────────────────────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        bac = recipient("bidon", 1.6, 2.4, 0.0, EAU).move_to(P(-4.4, 0.4))
        pi = pichet().move_to(P(-1.9, 0.0))
        l0 = self.ligne([("Mélissa remplit un bac de", WHITE), ("4 L", JAUNE_TITRE)], 34, buff=0.2)
        gauche(l0, -0.9, 1.9)
        self.au_mot("un bac de 4 litres")
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(bac, shift=UP * 0.2), FadeIn(contenance(bac, "4 L", 28)),
                  run_time=0.4)
        l1 = self.ligne([("avec un pichet de", WHITE), ("50 cL.", JAUNE_TITRE)], 34, buff=0.2)
        gauche(l1, -0.9, 1.2)
        self.au_mot("pichet de 50 centilitres")
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(pi, shift=UP * 0.2), FadeIn(contenance(pi, "50 cL", 26)),
                  run_time=0.4)
        self.au_mot("Combien de pichets")
        q = self.bloc(["Combien de pichets", "lui faut-il ?"], 40, JAUNE_TITRE)
        gauche(q, -0.9, 0.0)
        self.play(FadeIn(q, shift=UP * 0.1), Wiggle(pi), run_time=0.5)
        self.pause_defi(y=-2.2)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        l0 = self.ligne([("1 L", BLEU_D), ("= 100 cL :", VERT_OK)], 42, buff=0.3)
        gauche(l0, -6.0, 2.0)
        l1 = self.ligne([("50 + 50,", BLEU_D), ("donc", WHITE), ("2 pichets.", VERT_OK)], 42, buff=0.22)
        gauche(l1, -6.0, 1.1)
        hors_audit(l1[2])
        self.aux_extraits([l0[0], l0[1], l1[0], VGroup(l1[1], l1[2])],
                          ["1 litre", "100 centilitres", "50 plus 50", "2 pichets"])
        # 4 colonnes de 1 L, chacune remplie par 2 pichets
        cols = VGroup()
        for k in range(4):
            c = VGroup(pichet(EAU, 0.6), pichet(EAU, 0.6)).arrange(UP, buff=0.12)
            cols.add(c)
        cols.arrange(RIGHT, buff=0.55).move_to(P(-1.0, -1.7))
        ls = VGroup(*[hors_audit(self.t("1 L", 24, JAUNE_TITRE).next_to(c, DOWN, buff=0.12)) for c in cols])
        self.play(FadeIn(cols[0], shift=UP * 0.1), FadeIn(ls[0]), run_time=0.3)
        l2 = self.ligne([("Pour 4 L :", BLEU_D), ("4 × 2", BLEU_D), ("= 8 pichets.", VERT_OK)], 42, buff=0.22)
        gauche(l2, -6.0, 0.2)
        self.aux_extraits([l2[0], l2[1]], ["4 litres", "4 fois 2"])
        self.play(LaggedStart(*[FadeIn(VGroup(c, l), shift=UP * 0.1) for c, l in zip(cols[1:], ls[1:])],
                              lag_ratio=0.2), run_time=0.5)
        self.aux_extraits([l2[2]], ["8 pichets"])
        self.insister(l2[2], 1.15, 0.25)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        fig = arrosoir(1.0)
        lignes = self.finale_gauche(fig, textes=[
            ("Tout dans", "la même unité."),
            ("Puis le calcul : ajouter,", "enlever ou répéter."),
            ("On écrit l'unité", "dans la réponse.")], fs=34)
        self.add(fig)
        self.au_mot("on met tout dans la même unité")
        self.montrer_ligne(lignes[0], Indicate(fig, scale_factor=1.05))
        self.au_mot("Puis on choisit le calcul")
        self.montrer_ligne(lignes[1])
        self.au_mot("on écrit l'unité")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_convertir()
        self.ecran_verse()
        self.ecran_reste()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")


class ContenanceProblemeCE2(ContenanceProblemeBase):
    identite = "Maths CE2 — EleveAI"
    ceinture = "orange"
