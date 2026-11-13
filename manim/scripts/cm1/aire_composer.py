# aire_composer.py
# EleveAI — Maths CM1 — série « Aire », épisode 04 : CALCULER UNE AIRE EN DÉCOUPANT
# (micro aire_composer, notion aire), AVEC VOIX. Paysage 16:9, CEINTURE VERTE.
# Short jumeau : film Ti Margo (le gâteau en L, 8 + 4 = 12 parts).
# Décor et métier : Yanis, ARCHITECTE (plan d'un appartement en L ; centres : construction, art-design).
# Mapping micro → écrans : 02 (découper en deux rectangles), 03 (chaque aire, puis ajouter),
# 04 (un autre découpage, même aire), 06 (piège : chevaucher, oublier), questions 05 et 07, défi 08 (le T).
# Voix : manim/voix/cm1-aire-composer.json (validée le 13/11, Julie, débit −6) ;
# marques : aire_composer_marques.json (python manim/scripts/cm1/aire_marques.py composer).
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/cm1/aire_composer.py AireComposerCM1
# python -m manim render -qh --disable_caching manim/scripts/cm1/aire_composer.py AireComposerCM1 -o eleveai-maths-cm1-aire-composer --media_dir manim/scripts/cm1/media-aire-04
# Sortie : manim/sorties/cm1/maths/aire/04-composer/eleveai-maths-cm1-aire-composer.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from aire_cm1_commun import *  # noqa: E402,F403

HAUT_C, HAUT_B = CARREAU, CARREAU_B        # la partie du haut (bleu ciel)
BAS_C, BAS_B = "#fbbf24", "#78350f"        # la partie du bas (ambre)
GAU_C, GAU_B = VERT_F, "#14532d"           # autre découpage : à gauche (vert)
DRO_C, DRO_B = "#a78bfa", "#4c1d95"        # autre découpage : à droite (violet)
MUR_C, MUR_B = "#e2e8f0", "#475569"        # le plan avant découpage (gris clair)

# L'appartement en L : en haut 2 rangées de 6, en bas 3 rangées de 2 (colonnes 0-1).
CASES_L = [(i, j) for j in (0, 1) for i in range(6)] + [(i, j) for j in (2, 3, 4) for i in (0, 1)]
I_HAUT = list(range(12))
I_BAS = list(range(12, 18))
I_GAU = [k for k, (i, j) in enumerate(CASES_L) if i < 2]
I_DRO = [k for k, (i, j) in enumerate(CASES_L) if i >= 2]
I_CHEV = [k for k, (i, j) in enumerate(CASES_L) if i < 2 and j < 2]  # compté deux fois si on chevauche
# La terrasse en T : en haut 1 rangée de 7, en dessous 4 rangées de 3 (colonnes 2-4).
CASES_T = [(i, 0) for i in range(7)] + [(i, j) for j in (1, 2, 3, 4) for i in (2, 3, 4)]


def cote(mob, s, sens=LEFT, fs=30, couleur=JAUNE_TITRE):
    return hors_audit(Text(s, font_size=fs, color=couleur, weight=BOLD).next_to(mob, sens, buff=0.18))


def parties(g, idx):
    return VGroup(*[g[k] for k in idx])


def teinter(g, idx, c, b):
    return [g[k].animate.set_fill(c, 1).set_stroke(b) for k in idx]


class AireComposerBase(PhraseAGauche, PaysageAireCM1):
    nom_voix = "cm1-aire-composer"
    fichier_marques = "aire_composer_marques.json"
    ceinture = "verte"

    def plan_l(self, c=0.55, pos=P(-3.5, 0.2), couleurs=True):
        g = figure_cases(CASES_L, c, MUR_C, MUR_B).move_to(pos)
        if couleurs:
            for k in I_HAUT:
                g[k].set_fill(HAUT_C).set_stroke(HAUT_B)
            for k in I_BAS:
                g[k].set_fill(BAS_C).set_stroke(BAS_B)
        return g

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Calculer une aire en découpant", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Calculer une aire")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q = self.bloc(["Comment trouver l'aire", "d'une figure qui n'est", "pas un rectangle ?"], 36)
        q.move_to(P(0, 0.3)).align_to(P(-6.2, 0), LEFT)
        g = self.plan_l(0.42, P(3.6, 0.35))
        self.au_mot("Comment")
        self.play(FadeIn(q, shift=UP * 0.2), LaggedStart(*[FadeIn(x, scale=1.6) for x in g], lag_ratio=0.04),
                  run_time=1.0)
        self.attendre_voix(marge=0.6)

    # ── 01 : Yanis, architecte ──────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        ya = yanis(1.0).move_to(P(-5.3, 0.1))
        self.au_mot("Voici Yanis")
        nom = self.t("Yanis", 42, BLEU_CALCUL).next_to(ya, UP, buff=0.2)
        self.play(FadeIn(ya, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("architecte")
        met = self.t("architecte", 32, BLEU_CALCUL).next_to(ya, DOWN, buff=0.18)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.35)
        g = self.plan_l(0.5, P(-1.2, 0.5), couleurs=False)
        self.au_mot("le plan")
        self.play(LaggedStart(*[FadeIn(x, scale=1.3) for x in g], lag_ratio=0.03), run_time=0.6)
        self.au_mot("d'un appartement")
        tl = self.t("un appartement en L", 26, GRAY_B).next_to(g, DOWN, buff=0.15)
        self.play(FadeIn(tl), Indicate(g, color=JAUNE_TITRE, scale_factor=1.04), run_time=0.45)
        gc = carreau(1.3, MUR_C, MUR_B, 4).move_to(P(3.3, 0.7))
        lien = DashedLine(g[5].get_right(), gc.get_left(), color=GRAY_B, stroke_width=3)
        self.au_mot("Chaque carreau")
        self.play(Indicate(g[5], color=JAUNE_TITRE, scale_factor=1.3), Create(lien), FadeIn(gc, scale=0.6),
                  run_time=0.5)
        self.au_mot("1 mètre carré")
        m2 = Text("1 m²", font_size=32, color="#0f172a", weight=BOLD).move_to(gc)
        self.play(FadeIn(m2, scale=1.3), run_time=0.4)
        self.au_mot("Quelle est l'aire")
        q = self.t("Quelle est l'aire de l'appartement ?", 38, JAUNE_TITRE).move_to(P(-0.6, -2.55))
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.4)
        self.attendre_voix()

    # ── 02 : découper en deux rectangles ────────────────────────────────────
    def ecran_decouper(self):
        self.ecran("02-decouper")
        g = self.plan_l(couleurs=False)
        self.add(g)
        self.au_mot("Le L n'est pas")
        l1 = self.t("Ce n'est pas un rectangle.", 34, ROUGE_ERREUR)
        self.col(l1, 2.6)
        self.play(FadeIn(l1, shift=UP * 0.1), Wiggle(g), run_time=0.6)
        self.au_mot("Mais on peut")
        l2 = self.bloc(["Mais on peut le découper", "en deux rectangles."], 34, JAUNE_TITRE)
        self.col(l2, 1.7)
        c = g[0].width
        trait = DashedLine(g[12].get_corner(UL) + LEFT * 0.25, g[12].get_corner(UL) + RIGHT * (6 * c + 0.25),
                           color=JAUNE_TITRE, stroke_width=6, dash_length=0.12)
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.35)
        self.play(FadeIn(l2[1], shift=UP * 0.1), Create(trait), run_time=0.45)
        self.au_mot("En haut")
        l3 = self.ligne([("En haut :", HAUT_C), ("2 rangées de 6", WHITE)], 34)
        self.col(l3, 0.5)
        c6, r2 = cote(parties(g, I_HAUT), "6", UP, couleur=HAUT_C), cote(parties(g, I_HAUT), "2", LEFT, couleur=HAUT_C)
        self.play(FadeIn(l3[0], shift=UP * 0.1), *teinter(g, I_HAUT, HAUT_C, HAUT_B), run_time=0.45)
        self.play(FadeIn(l3[1], shift=UP * 0.1), FadeIn(c6), FadeIn(r2), run_time=0.4)
        self.au_mot("En bas")
        l4 = self.ligne([("En bas :", BAS_C), ("3 rangées de 2", WHITE)], 34)
        self.col(l4, -0.3)
        c2, r3 = cote(parties(g, I_BAS), "2", DOWN, couleur=BAS_C), cote(parties(g, I_BAS), "3", LEFT, couleur=BAS_C)
        self.play(FadeIn(l4[0], shift=UP * 0.1), *teinter(g, I_BAS, BAS_C, BAS_B), run_time=0.45)
        self.play(FadeIn(l4[1], shift=UP * 0.1), FadeIn(c2), FadeIn(r3), run_time=0.4)
        self.attendre_voix()

    # ── 03 : l'aire de chaque partie, puis on ajoute ────────────────────────
    def ecran_additionner(self):
        self.ecran("03-additionner")
        g = self.plan_l()
        haut, bas = parties(g, I_HAUT), parties(g, I_BAS)
        bas.shift(DOWN * 0.15)  # les deux parties, un peu écartées
        cotes = VGroup(cote(haut, "6", UP, couleur=HAUT_C), cote(haut, "2", LEFT, couleur=HAUT_C),
                       cote(bas, "2", DOWN, couleur=BAS_C), cote(bas, "3", LEFT, couleur=BAS_C))
        self.add(g, cotes)
        self.au_mot("On calcule")
        l0 = self.t("L'aire de chaque partie :", 34)
        self.col(l0, 2.65)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.35)
        self.au_mot("En haut")
        l1 = self.ligne([("En haut :", HAUT_C), ("2 × 6", BLEU_D), ("= 12", VERT_OK)], 38, buff=0.25)
        self.col(l1, 1.9)
        self.play(FadeIn(l1[0], shift=UP * 0.1), Indicate(haut, color=HAUT_C, scale_factor=1.04), run_time=0.4)
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.35)
        self.play(FadeIn(l1[2], shift=UP * 0.1), run_time=0.3)
        self.au_mot("En bas")
        l2 = self.ligne([("En bas :", BAS_C), ("3 × 2", BLEU_D), ("= 6", VERT_OK)], 38, buff=0.25)
        self.col(l2, 1.2)
        self.play(FadeIn(l2[0], shift=UP * 0.1), Indicate(bas, color=BAS_C, scale_factor=1.06), run_time=0.4)
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.35)
        self.play(FadeIn(l2[2], shift=UP * 0.1), run_time=0.3)
        self.au_mot("Puis on ajoute")
        l3 = self.t("Puis on ajoute :", 34, JAUNE_TITRE)
        self.col(l3, 0.45)
        self.play(FadeIn(l3, shift=UP * 0.1), bas.animate.shift(UP * 0.15), run_time=0.4)
        l4 = self.ligne([("12 + 6", BLEU_D), ("= 18", VERT_OK)], 46, buff=0.3)
        self.col(l4, -0.3)
        self.play(FadeIn(l4[0], shift=UP * 0.1), run_time=0.35)
        self.play(FadeIn(l4[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("L'appartement fait")
        res = self.gros("18 m²", fs=48)
        self.col(res, -1.35)
        self.play(FadeIn(res, scale=1.2), Indicate(g, color=VERT_OK, scale_factor=1.03), run_time=0.5)
        self.attendre_voix()

    # ── 04 : un autre découpage, la même aire ───────────────────────────────
    def ecran_autrement(self):
        self.ecran("04-autrement")
        g = self.plan_l(couleurs=False)
        self.add(g)
        self.au_mot("On peut aussi")
        l0 = self.bloc(["On peut aussi découper", "autrement :"], 34, JAUNE_TITRE)
        self.col(l0, 2.6)
        c = g[0].width
        trait = DashedLine(g[2].get_corner(UL) + UP * 0.25, g[2].get_corner(UL) + DOWN * (2 * c + 0.25),
                           color=JAUNE_TITRE, stroke_width=6, dash_length=0.12)
        self.play(FadeIn(l0, shift=UP * 0.1), Create(trait), run_time=0.5)
        gau, dro = parties(g, I_GAU), parties(g, I_DRO)
        self.au_mot("À gauche")
        l1 = self.ligne([("À gauche :", GAU_C), ("5 × 2", BLEU_D), ("= 10", VERT_OK)], 38, buff=0.25)
        self.col(l1, 1.6)
        c2, r5 = cote(gau, "2", DOWN, couleur=GAU_C), cote(gau, "5", LEFT, couleur=GAU_C)
        self.play(FadeIn(l1[0], shift=UP * 0.1), *teinter(g, I_GAU, GAU_C, GAU_B), FadeIn(c2), FadeIn(r5),
                  run_time=0.45)
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.35)
        self.play(FadeIn(l1[2], shift=UP * 0.1), run_time=0.3)
        self.au_mot("À droite")
        l2 = self.ligne([("À droite :", DRO_C), ("2 × 4", BLEU_D), ("= 8", VERT_OK)], 38, buff=0.25)
        self.col(l2, 0.9)
        c4, r2 = cote(dro, "4", UP, couleur=DRO_C), cote(dro, "2", RIGHT, couleur=DRO_C)
        self.play(FadeIn(l2[0], shift=UP * 0.1), *teinter(g, I_DRO, DRO_C, DRO_B), FadeIn(c4), FadeIn(r2),
                  run_time=0.45)
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.35)
        self.play(FadeIn(l2[2], shift=UP * 0.1), run_time=0.3)
        l3 = self.ligne([("10 + 8", BLEU_D), ("= 18", VERT_OK)], 46, buff=0.3)
        self.col(l3, 0.15)
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.35)
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("Toujours")
        res = self.gros("Toujours 18 m² !", fs=42)
        self.col(res, -0.8)
        self.play(FadeIn(res, scale=1.2), run_time=0.45)
        self.au_mot("La façon de découper")
        l4 = self.bloc(["La façon de découper", "ne change pas l'aire."], 34, JAUNE_TITRE)
        gauche(l4, -6.1, -2.5)
        self.play(FadeIn(l4, shift=UP * 0.1), run_time=0.45)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (réponse C) ─────────────────────────────────────────
    def figure_q1(self):
        cases = [(i, j) for j in (0, 1) for i in range(4)] + [(i, 2) for i in range(5)]
        g = figure_cases(cases, 0.55, HAUT_C, HAUT_B).move_to(P(-3.7, 0.75))
        for q in g[8:]:
            q.set_fill(BAS_C).set_stroke(BAS_B)
        return g

    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        g = self.figure_q1()

        def autres_q(sc):
            sc.play(FadeIn(g), run_time=0.35)

        def apres(sc):
            sc.play(FadeIn(numeros(g, 20, "#0f172a")), run_time=0.4)

        self.question_gauche("05-question", "05b-reponse",
                             ["Une figure : deux rectangles,", "l'un de 8 carreaux,", "l'autre de 5 carreaux.",
                              "Quelle est son aire ?"],
                             [self.choix("40 carreaux"), self.choix("3 carreaux"), self.choix("13 carreaux")], 2,
                             ["On ajoute les deux aires :", "8 + 5 = 13.", "L'aire est de", "13 carreaux."],
                             -0.45, sans_audit=(3,), mot_q="Une figure", autres_q=autres_q, autres_r=apres)

    # ── 06 : le piège (chevaucher, oublier) ─────────────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        self.au_mot("Attention")
        tit = self.t("Attention au piège !", 46, ROUGE_ERREUR)
        gauche(tit, -6.2, 3.05)
        self.play(Write(tit), run_time=0.35)
        g = self.plan_l(couleurs=False, pos=P(-3.6, 0.0))
        self.add(g)
        self.au_mot("Quand on découpe")
        l1 = self.bloc(["Les parties ne doivent", "pas se chevaucher."], 34)
        self.col(l1, 2.0)
        ch = parties(g, I_CHEV)
        cad_h = contour(parties(g, I_HAUT), HAUT_C, 8)
        cad_g = contour(parties(g, I_GAU), BAS_C, 8)
        self.play(FadeIn(l1, shift=UP * 0.1), Create(cad_h), Create(cad_g), run_time=0.7)
        self.au_mot("Un carreau compté")
        l2 = self.bloc(["Un carreau compté", "deux fois : on trouve trop !"], 32, ROUGE_ERREUR)
        self.col(l2, 0.75)
        self.play(FadeIn(l2, shift=UP * 0.1), ch.animate.set_fill(ROUGE_F).set_stroke("#7f1d1d"), run_time=0.5)
        self.play(Indicate(ch, color=ROUGE_ERREUR, scale_factor=1.15), run_time=0.5)
        self.au_mot("Et on n'oublie")
        l3 = self.t("Et on n'oublie aucun carreau.", 32, ORANGE_RETENUE)
        self.col(l3, -0.35)
        trou = g[16].copy().set_fill(BLACK, 0).set_stroke(ORANGE_RETENUE, 6)
        self.play(FadeOut(cad_h), FadeOut(cad_g), ch.animate.set_fill(MUR_C).set_stroke(MUR_B),
                  FadeIn(l3, shift=UP * 0.1), g[16].animate.set_fill(opacity=0.15), Create(trou), run_time=0.5)
        self.au_mot("Chaque carreau compte")
        res = self.gros("Chaque carreau compte\nune seule fois !", fs=34)
        gauche(res, -6.1, -2.45)
        self.play(FadeIn(res, scale=1.1), FadeOut(trou),
                  *teinter(g, I_HAUT, HAUT_C, HAUT_B), *teinter(g, I_BAS, BAS_C, BAS_B), run_time=0.6)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (réponse B) ─────────────────────────────────────────
    def figure_q2(self):
        cases = [(i, j) for j in (0, 1) for i in range(4)] + [(i, j) for j in (2, 3) for i in (0, 1)]
        g = figure_cases(cases, 0.55, HAUT_C, HAUT_B).move_to(P(-3.9, 1.2))
        for q in g[8:]:
            q.set_fill(ROSE_D).set_stroke("#831843")
        return g

    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        g = self.figure_q2()

        def autres_q(sc):
            sc.play(FadeIn(g), run_time=0.35)

        def apres(sc):
            sc.play(FadeIn(numeros(g, 20, "#0f172a")), run_time=0.4)

        self.question_gauche("07-question", "07b-reponse",
                             ["Un rectangle de 2 rangées de 4,", "et un carré de 2 de côté.",
                              "Quelle est son aire ?"],
                             [self.choix("10 carreaux"), self.choix("12 carreaux"), self.choix("16 carreaux")], 1,
                             ["Rectangle : 2 × 4 = 8.", "Carré : 2 × 2 = 4.", "8 + 4 = 12.",
                              "L'aire est de 12 carreaux."],
                             -0.15, sans_audit=(3,), q_sans_audit=(1,), mot_q="Une figure", autres_q=autres_q, autres_r=apres)

    # ── 08 : le défi (la terrasse en T) ─────────────────────────────────────
    def terrasse(self, couleurs=False):
        g = figure_cases(CASES_T, 0.45, MUR_C, MUR_B).move_to(P(-3.7, 0.2))
        if couleurs:
            for q in g[:7]:
                q.set_fill(HAUT_C).set_stroke(HAUT_B)
            for q in g[7:]:
                q.set_fill(BAS_C).set_stroke(BAS_B)
        return g

    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        g = self.terrasse()
        self.au_mot("une terrasse")
        l0 = self.t("Une terrasse en forme de T", 32, GRAY_B)
        self.col(l0, 2.3, 0.35)
        self.play(FadeIn(l0, shift=UP * 0.1), LaggedStart(*[FadeIn(q, scale=1.3) for q in g], lag_ratio=0.03),
                  run_time=0.7)
        self.au_mot("En haut")
        l1 = self.ligne([("En haut :", HAUT_C), ("1 rangée de 7", WHITE)], 34)
        self.col(l1, 1.6, 0.35)
        self.play(FadeIn(l1[0], shift=UP * 0.1), *teinter(g, range(7), HAUT_C, HAUT_B), run_time=0.4)
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.35)
        self.au_mot("En dessous")
        l2 = self.ligne([("En dessous :", BAS_C), ("4 rangées de 3", WHITE)], 34)
        self.col(l2, 0.9, 0.35)
        self.play(FadeIn(l2[0], shift=UP * 0.1), *teinter(g, range(7, 19), BAS_C, BAS_B), run_time=0.4)
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.35)
        self.au_mot("Chaque carreau")
        l3 = self.t("Chaque carreau : 1 m²", 32, GRAY_B)
        self.col(l3, 0.2, 0.35)
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.4)
        self.au_mot("Quelle est l'aire")
        q = self.bloc(["Quelle est l'aire", "de la terrasse ?"], 38, JAUNE_TITRE)
        self.col(q, -0.65, 0.35)
        self.play(FadeIn(q, shift=UP * 0.1), Wiggle(g), run_time=0.5)
        self.pause_defi(y=-1.75)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        g = self.terrasse(couleurs=True)
        self.add(g)
        haut, bas = VGroup(*g[:7]), VGroup(*g[7:])
        self.au_mot("La bande du haut")
        l0 = self.t("La bande du haut :", 32, HAUT_C)
        self.col(l0, 2.35, 0.35)
        self.play(FadeIn(l0, shift=UP * 0.1), Indicate(haut, color=HAUT_C, scale_factor=1.05), run_time=0.4)
        l1 = self.ligne([("1 × 7", BLEU_D), ("= 7 m²", VERT_OK)], 38, buff=0.3)
        self.col(l1, 1.8, 0.35)
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.35)
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("La partie du bas")
        l2 = self.t("La partie du bas :", 32, BAS_C)
        self.col(l2, 1.1, 0.35)
        self.play(FadeIn(l2, shift=UP * 0.1), Indicate(bas, color=BAS_C, scale_factor=1.05), run_time=0.4)
        l3 = self.ligne([("4 × 3", BLEU_D), ("= 12 m²", VERT_OK)], 38, buff=0.3)
        self.col(l3, 0.55, 0.35)
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.35)
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("On ajoute")
        l4 = self.ligne([("On ajoute :", JAUNE_TITRE), ("7 + 12", BLEU_D), ("= 19", VERT_OK)], 38, buff=0.25)
        self.col(l4, -0.2, 0.35)
        self.play(FadeIn(l4[0], shift=UP * 0.1), run_time=0.3)
        self.play(FadeIn(l4[1], shift=UP * 0.1), run_time=0.35)
        self.play(FadeIn(l4[2], shift=UP * 0.1), run_time=0.3)
        self.au_mot("La terrasse fait")
        res = self.gros("19 m²", fs=48)
        self.col(res, -1.2, 0.35)
        self.play(FadeIn(res, scale=1.2), Indicate(g, color=VERT_OK, scale_factor=1.03), run_time=0.5)
        self.insister(res, 1.1, 0.25)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        fig = self.plan_l(0.42)
        lignes = self.finale_gauche(fig, textes=[
            ("Une figure qui n'est pas un rectangle :", "on la découpe en rectangles."),
            ("On calcule l'aire de chaque partie,", "puis on ajoute."),
            ("Chaque carreau compte", "une seule fois.")], fs=32)
        self.add(fig)
        self.au_mot("Une figure")
        self.montrer_ligne(lignes[0], Indicate(fig, scale_factor=1.05))
        self.au_mot("On calcule")
        self.montrer_ligne(lignes[1])
        self.au_mot("Chaque carreau")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_decouper()
        self.ecran_additionner()
        self.ecran_autrement()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")


class AireComposerCM1(AireComposerBase):
    identite = "Maths CM1 — EleveAI"
    ceinture = "verte"
