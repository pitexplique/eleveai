# mental_addition.py
# EleveAI — Maths 6e — série « Calcul mental », épisode 01 : AJOUTER DE TÊTE
# (micro entier_addition_mentale, notion entier_calcul_mental), AVEC VOIX. Paysage 16:9,
# CEINTURE VERTE. Short jumeau : film Ti Margo (prototypes/ti-margo/films/calcul-mental.js).
# Décor et métier : Enzo, ARBITRE DE BASKET (centres : sport, basket).
# Micro → écrans : passer par la dizaine (02, 03, question 04), ajouter les dizaines puis
# les unités (05), le piège de la dizaine franchie (06, question 07), défi (08), appris (09).
# Voix : manim/voix/6e-mental-addition.json (Julie, débit −6) ;
# marques : mental_addition_marques.json (python manim/scripts/6e/mental_marques.py addition).
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/6e/mental_addition.py MentalAddition6e
# python -m manim render -qh --disable_caching manim/scripts/6e/mental_addition.py MentalAddition6e -o eleveai-maths-6e-mental-addition --media_dir manim/scripts/6e/media-men-01
# Sortie : manim/sorties/6e/maths/calcul-mental/01-addition/eleveai-maths-6e-mental-addition.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from mental_commun import *  # noqa: E402,F403

BLEUS = "#3b82f6"
ROUGES = "#ef4444"


class MentalAdditionBase(PaysageMental):
    nom_voix = "6e-mental-addition"
    fichier_marques = "mental_addition_marques.json"

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Ajouter de tête", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Ajouter")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        self.au_mot("Comment")
        q = self.bloc(["Comment calculer", "sans poser l'opération ?"], 40).move_to(P(-3.0, 0.45))
        self.play(FadeIn(q[0], shift=UP * 0.2), run_time=0.35)
        self.au_mot("56 plus 8")
        calc = self.ligne([("56 +", JAUNE_TITRE), ("8 = ?", JAUNE_TITRE)], 72, buff=0.42).move_to(P(3.3, 0.45))
        self.play(FadeIn(calc[0], scale=1.3), run_time=0.3)
        self.au_mot("8 sans")
        self.play(FadeIn(calc[1], scale=1.3), run_time=0.3)
        self.au_mot("sans poser")
        self.play(FadeIn(q[1], shift=UP * 0.2), run_time=0.35)
        self.play(Indicate(calc, color=JAUNE_TITRE, scale_factor=1.2), run_time=0.6)
        self.attendre_voix(marge=0.6)

    # ── 01 : Enzo, arbitre de basket ────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        ez = enzo(1.05).move_to(P(-4.6, 0.1))
        self.au_mot("Voici Enzo")
        nom = self.t("Enzo", 42, BLEU_CALCUL).next_to(ez, UP, buff=0.2)
        self.play(FadeIn(ez, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("arbitre de basket")
        met = self.t("arbitre de basket", 28, BLEU_CALCUL).next_to(ez, DOWN, buff=0.18)
        bal = ballon(1.0).move_to(P(-3.2, -0.5))
        self.play(FadeIn(met, shift=DOWN * 0.1), FadeIn(bal, shift=DOWN * 0.5), run_time=0.4)
        self.au_mot("il compte les points")
        l1 = self.t("Il compte les points de tête.", 36)
        self.col(l1, 2.75, xl=-2.4)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.35)
        pan = tableau_score([("BLEUS", BLEUS)], 1.15).move_to(P(1.0, 0.9))
        self.au_mot("Les Bleus")
        self.play(FadeIn(pan, shift=DOWN * 0.2), run_time=0.4)
        self.au_mot("56 points")
        s56 = score(pan.case[0], 56)
        self.play(FadeIn(s56, scale=1.4), run_time=0.35)
        self.au_mot("encore 8")
        plus = self.t("+ 8", 64, AMBRE_D).next_to(pan, RIGHT, buff=0.45)
        self.play(FadeIn(plus, shift=LEFT * 0.3), Wiggle(bal), run_time=0.45)
        self.au_mot("Combien")
        q = self.t("Combien de points en tout ?", 42, JAUNE_TITRE)
        self.col(q, -1.0, xl=-2.4)
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.4)
        self.attendre_voix()

    # ── 02 : passer par la dizaine ──────────────────────────────────────────
    def ecran_dizaine(self):
        self.ecran("02-dizaine")
        self.au_mot("Enzo passe")
        tit = self.t("Je passe par la dizaine", 46, JAUNE_TITRE).move_to(P(0, 3.0))
        self.play(Write(tit), run_time=0.45)
        bd = Bonds(56, 64, x0=-5.4, x1=3.8, y=0.6, fs=40)
        self.play(Create(bd.trait), run_time=0.4)
        t56 = self.jouer_tic(bd, 56, "De 56")
        t60 = self.jouer_tic(bd, 60, "à 60", couleur=ROND)
        b1 = self.jouer_bond(bd, 56, 60, "+ 4", "il manque 4")
        l1 = self.ligne_mots([("Il coupe", WHITE), ("8", AMBRE_D), ("en", WHITE), ("4 et 4.", AMBRE_D)],
                             ["Il coupe", "8 en", None, "4 et 4"], -0.75, fs=38, xl=-5.6)
        self.etapes(bd, [("56 +", "56 plus"), ("4", "4, ça fait 60"), ("= 60.", "60. Puis")], -1.45,
                    gestes={2: [Indicate(t60.nombre, color=ROND, scale_factor=1.4)]})
        b2 = bd.bond(60, 64, "+ 4")
        t64 = bd.tic(64, VERT_OK)
        self.etapes(bd, [("60 +", "60 plus"), ("4", "4, ça fait 64"), ("= 64.", "64. Les")], -2.15,
                    gestes={1: [Create(b2.fleche), FadeIn(b2.etiquette, scale=1.3)],
                            2: [Create(t64[0]), FadeIn(t64[1], scale=1.3)]})
        self.au_mot("Les Bleus ont")
        g = self.gros("64 points", fs=50).move_to(P(3.3, -1.5))
        self.play(FadeIn(g, scale=1.3), run_time=0.4)
        self.insister(g, 1.15, 0.25)
        self.attendre_voix()

    # ── 03 : un nombre rond, c'est un raccourci ─────────────────────────────
    def ecran_rond(self):
        self.ecran("03-rond")
        bd = Bonds(56, 64, x0=-5.4, x1=3.8, y=1.2, fs=40)
        t56, t60, t64 = bd.tic(56), bd.tic(60, ROND), bd.tic(64, VERT_OK)
        hors_audit(VGroup(t56, t60, t64))
        self.add(bd, t56, t60, t64, bd.bond(56, 60, "+ 4"), bd.bond(60, 64, "+ 4"))
        self.au_mot("Pourquoi")
        q = self.t("Pourquoi passer par 60 ?", 44, JAUNE_TITRE)
        self.col(q, -0.5, xl=-5.6)
        self.play(FadeIn(q, shift=UP * 0.1), run_time=0.4)
        self.au_mot("un nombre rond")
        cer = bd.rond(t60)
        r = self.t("Un nombre rond, c'est un raccourci !", 40, ROND)
        self.col(r, -1.3, xl=-5.6)
        self.play(Create(cer), FadeIn(r, shift=UP * 0.1), run_time=0.45)
        self.play(t60.animate.scale(1.35), run_time=0.3)
        self.play(t60.animate.scale(1 / 1.35), run_time=0.3)
        self.au_mot("Ajouter 4 à 60")
        l = self.ligne([("Ajouter 4", WHITE), ("à 60 :", ROND), ("facile !", VERT_OK)], 40, buff=0.2)
        self.col(l, -2.1, xl=-5.6)
        self.play(FadeIn(l[0], shift=UP * 0.1), run_time=0.3)
        self.play(FadeIn(l[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("facile")
        self.play(FadeIn(l[2], scale=1.3), run_time=0.3)
        self.attendre_voix()

    # ── 04 : QUESTION 1 (réponse C) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        bd = Bonds(47, 55, x0=-5.9, x1=-1.2, y=0.4, fs=34)

        def autres_q(sc):
            sc.play(Create(bd.trait), run_time=0.3)

        def apres(sc):
            lg0 = sc.ligne_rep(0, ["De 47", "à 50,", "il manque 3."])
            sc.au_mot("De 47")
            _t = bd.tic(47)
            sc.play(FadeIn(lg0[0], shift=UP * 0.1), Create(_t[0]), FadeIn(_t[1]), run_time=0.25)
            sc.au_mot("à 50")
            _t = bd.tic(50, couleur=ROND)
            sc.play(FadeIn(lg0[1], shift=UP * 0.1), Create(_t[0]), FadeIn(_t[1]), run_time=0.25)
            sc.au_mot("il manque 3")
            _b = bd.bond(47, 50, "+ 3")
            sc.play(FadeIn(lg0[2], shift=UP * 0.1), Create(_b.fleche), FadeIn(_b.etiquette), run_time=0.3)
            lg1 = sc.ligne_rep(1, ["8, c'est", "3 et 5."])
            sc.au_mot("8, c'est")
            sc.play(FadeIn(lg1[0], shift=UP * 0.1), run_time=0.25)
            sc.au_mot("3 et 5")
            sc.play(FadeIn(lg1[1], shift=UP * 0.1), run_time=0.25)
            lg2 = sc.ligne_rep(2, ["50 + 5", "= 55."])
            sc.au_mot("50 plus 5")
            _b = bd.bond(50, 55, "+ 5")
            sc.play(FadeIn(lg2[0], shift=UP * 0.1), Create(_b.fleche), FadeIn(_b.etiquette), run_time=0.3)
            sc.au_mot("55")
            _t = bd.tic(55, couleur=VERT_OK)
            sc.play(FadeIn(lg2[1], shift=UP * 0.1), Create(_t[0]), FadeIn(_t[1]), run_time=0.25)
            sc.rep_fini()

        self.question_pause("04-question", "04b-reponse", ["Combien font 47 + 8 ?"],
                            [self.t("65", 36), self.t("54", 36), self.t("55", 36)], 2,
                            ["De 47 à 50, il manque 3.", "8, c'est 3 et 5.", "50 + 5 = 55."], mot_q="Combien",
                            autres_q=autres_q, autres_r=apres)

    # ── 05 : les dizaines, puis les unités ──────────────────────────────────
    def ecran_decomposer(self):
        self.ecran("05-decomposer")
        pan = tableau_score([("SAMEDI", ROUGES), ("DIMANCHE", ROUGES)], 0.9).move_to(P(-3.6, 2.55))
        self.au_mot("Au tournoi")
        self.play(FadeIn(pan, shift=DOWN * 0.2), run_time=0.4)
        self.au_mot("134 points")
        self.play(FadeIn(score(pan.case[0], 134, fs=50), scale=1.3), run_time=0.3)
        self.au_mot("28 points")
        self.play(FadeIn(score(pan.case[1], 28, fs=50), scale=1.3), run_time=0.3)
        l1 = self.ligne_mots([("Il coupe", WHITE), ("28", AMBRE_D), ("en", WHITE), ("20", ROSE_D), ("et", WHITE),
                              ("8.", AMBRE_D)], ["Enzo coupe", "28 en", None, "20 et", None, "8. 134"], 2.55, fs=36, xl=1.2)
        bd = Bonds(134, 162, x0=-5.4, x1=4.2, y=-0.55, fs=38)
        self.play(Create(bd.trait), run_time=0.3)
        t134, b1, t154 = bd.tic(134), bd.bond(134, 154, "+ 20", ROSE_D), bd.tic(154)
        self.etapes(bd, [("134 +", "134 plus"), ("20", "20, ça fait 154"), ("= 154.", "154. Puis")], -1.75,
                    gestes={0: [Create(t134[0]), FadeIn(t134[1])], 1: [Create(b1.fleche), FadeIn(b1.etiquette, scale=1.3)],
                            2: [Create(t154[0]), FadeIn(t154[1])]})
        b2, t162 = bd.bond(154, 162, "+ 8"), bd.tic(162, VERT_OK)
        self.etapes(bd, [("154 +", "154 plus"), ("8", "8, ça fait 162"), ("= 162", "162 points")], -2.45,
                    gestes={1: [Create(b2.fleche), FadeIn(b2.etiquette, scale=1.3)],
                            2: [Create(t162[0]), FadeIn(t162[1], scale=1.3)]})
        g = self.gros("162 points", fs=46).move_to(P(2.2, -2.1))
        self.play(FadeIn(g, scale=1.3), run_time=0.4)
        self.attendre_voix()

    # ── 06 : le piège de la dizaine franchie ────────────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        self.au_mot("Attention")
        tit = self.t("Attention au piège !", 46, ROUGE_ERREUR).move_to(P(0, 3.0))
        self.play(Write(tit), run_time=0.4)
        self.au_mot("154 plus 8")
        c = self.t("154 + 8", 52, WHITE).move_to(P(0, 2.05))
        self.play(FadeIn(c, shift=UP * 0.1), run_time=0.3)
        self.au_mot("on passe la dizaine")
        l0 = self.t("On passe la dizaine !", 38, ORANGE_RETENUE).move_to(P(0, 1.3))
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.35)
        bd = Bonds(154, 162, x0=-5.0, x1=3.4, y=-0.95, fs=38)
        self.play(Create(bd.trait), run_time=0.3)
        self.jouer_tic(bd, 154, "154 plus 6")
        self.jouer_bond(bd, 154, 160, "+ 6", None)
        self.jouer_tic(bd, 160, "160", couleur=ROND)
        self.jouer_bond(bd, 160, 162, "+ 2", "plus 2")
        t162 = self.jouer_tic(bd, 162, "162. Pas", couleur=VERT_OK)
        self.au_mot("Pas 152")
        faux = self.t("152", 48, ROUGE_ERREUR).move_to(P(-2.2, -2.6))
        pas = self.t("Pas", 40, ROUGE_ERREUR).next_to(faux, LEFT, buff=0.2)
        self.play(FadeIn(pas), FadeIn(faux, scale=1.3), run_time=0.3)
        self.play(Create(self.barrer(faux)), Indicate(t162.nombre, color=VERT_OK, scale_factor=1.5), run_time=0.4)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (réponse A) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        bd = Bonds(245, 282, x0=-6.2, x1=-0.6, y=0.4, fs=26)

        def autres_q(sc):
            sc.play(Create(bd.trait), run_time=0.3)

        def apres(sc):
            _b0 = bd.bond(245, 275, "+ 30", ROSE_D, fs=28)
            lg0 = sc.ligne_rep(0, ["245 + 30", "= 275."])
            sc.au_mot("245 plus 30")
            _t = bd.tic(245)
            sc.play(FadeIn(lg0[0], shift=UP * 0.1), Create(_t[0]), FadeIn(_t[1]), run_time=0.25)
            sc.play(Create(_b0.fleche), FadeIn(_b0.etiquette), run_time=0.3)
            sc.au_mot("275. Puis")
            _t = bd.tic(275)
            sc.play(FadeIn(lg0[1], shift=UP * 0.1), Create(_t[0]), FadeIn(_t[1]), run_time=0.25)
            lg1 = sc.ligne_rep(1, ["275 + 7 :"])
            sc.au_mot("275 plus 7")
            _b = bd.bond(275, 282, "+ 7", fs=28)
            sc.play(FadeIn(lg1[0], shift=UP * 0.1), Create(_b.fleche), FadeIn(_b.etiquette), run_time=0.3)
            lg15 = sc.ligne_rep(2, ["on passe par 280,"])
            sc.au_mot("on passe par 280")
            sc.play(FadeIn(lg15[0], shift=UP * 0.1), run_time=0.25)
            lg2 = sc.ligne_rep(3, ["et on arrive à 282."])
            sc.au_mot("et on arrive")
            _t = bd.tic(282, couleur=VERT_OK)
            _t[1].shift(RIGHT * 0.14)
            sc.play(FadeIn(lg2[0], shift=UP * 0.1), Create(_t[0]), FadeIn(_t[1]), run_time=0.25)
            sc.rep_fini()

        self.question_pause("07-question", "07b-reponse", ["Combien font 245 + 37 ?"],
                            [self.t("282", 36), self.t("272", 36), self.t("285", 36)], 0,
                            ["245 + 30 = 275.", "275 + 7 :", "on passe par 280,", "et on arrive à 282."],
                            mot_q="Combien", autres_q=autres_q, autres_r=apres)

    # ── 08 : le défi ────────────────────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        pan = tableau_score([("BLEUS", BLEUS), ("ROUGES", ROUGES)], 1.15).move_to(P(-2.6, 1.25))
        self.play(FadeIn(pan, shift=DOWN * 0.2), run_time=0.35)
        self.au_mot("78 points")
        self.play(FadeIn(score(pan.case[0], 78), scale=1.3), run_time=0.3)
        self.au_mot("encore 15")
        p15 = self.t("+ 15", 50, AMBRE_D).next_to(pan.case[0], DOWN, buff=0.5)
        self.play(FadeIn(p15, shift=UP * 0.2), run_time=0.3)
        self.au_mot("92 points")
        self.play(FadeIn(score(pan.case[1], 92), scale=1.3), run_time=0.3)
        self.au_mot("Qui gagne")
        q = self.t("Qui gagne ?", 52, JAUNE_TITRE).move_to(P(3.9, 1.25))
        bal = ballon(1.2).next_to(q, DOWN, buff=0.45)
        self.play(FadeIn(q, scale=1.2), FadeIn(bal, shift=DOWN * 0.4), run_time=0.45)
        self.play(Wiggle(bal), run_time=0.5)
        self.pause_defi(y=-1.9)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        bd = Bonds(78, 93, x0=-5.4, x1=3.6, y=1.15, fs=38)
        self.play(Create(bd.trait), run_time=0.3)
        self.jouer_tic(bd, 78, "78 plus 2")
        self.jouer_bond(bd, 78, 80, "+ 2", None)
        self.jouer_tic(bd, 80, "80. Il", couleur=ROND)
        self.au_mot("Il reste 13")
        l1 = self.ligne([("Il reste", WHITE), ("13", AMBRE_D), ("à ajouter.", WHITE)], 36, buff=0.18)
        self.col(l1, -0.2, xl=-5.6)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.35)
        self.jouer_bond(bd, 80, 93, "+ 13", "80 plus 13")
        self.jouer_tic(bd, 93, "93. Les Bleus", couleur=VERT_OK)
        self.au_mot("Les Bleus ont 93")
        l2 = self.ligne([("Bleus :", BLEUS), ("93", VERT_OK)], 40, buff=0.2)
        self.col(l2, -1.0, xl=-5.6)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.3)
        self.au_mot("les Rouges 92")
        l3 = self.ligne([("Rouges :", ROUGES), ("92", WHITE)], 40, buff=0.2)
        self.col(l3, -1.0, xl=-1.4)
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.3)
        self.au_mot("Les Bleus gagnent")
        g = self.tampon("Les Bleus gagnent !", VERT_OK, 44).move_to(P(-2.4, -2.1))
        self.play(FadeIn(g, scale=1.3), run_time=0.4)
        self.au_mot("d'un seul point")
        d = self.t("d'un seul point !", 36, VERT_OK).next_to(g, RIGHT, buff=0.3)
        self.play(FadeIn(d, shift=LEFT * 0.2), run_time=0.3)
        self.insister(g, 1.12, 0.25)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        bd = Bonds(56, 64, x0=0, x1=4.2, y=0, fs=36)
        t56, t60, t64 = bd.tic(56), bd.tic(60, ROND), bd.tic(64, VERT_OK)
        fig = VGroup(bd, t56, t60, t64, bd.bond(56, 60, "+ 4"), bd.bond(60, 64, "+ 4"), bd.rond(t60))
        hors_audit(fig)
        self.add(fig)
        lignes = self.finale_colonne(figure=fig, textes=[
            ("On passe par", "un nombre rond."),
            ("On ajoute les dizaines,", "puis les unités."),
            ("On fait attention quand", "on passe la dizaine.")], fs=36)
        self.au_mot("on passe par")
        self.montrer_ligne(lignes[0], Indicate(fig[6], color=ROND, scale_factor=1.3))
        self.au_mot("On ajoute les dizaines")
        self.montrer_ligne(lignes[1])
        self.au_mot("On fait attention")
        self.montrer_ligne(lignes[2], Indicate(fig[3], color=VERT_OK, scale_factor=1.4))
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_dizaine()
        self.ecran_rond()
        self.ecran_question1()
        self.ecran_decomposer()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")


class MentalAddition6e(MentalAdditionBase):
    identite = "Maths 6e — EleveAI"
    ceinture = "verte"
