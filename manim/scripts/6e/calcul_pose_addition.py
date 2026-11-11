# calcul_pose_addition.py
# EleveAI — Maths 6e — série « Calcul posé », épisode 01 : L'ADDITION POSÉE
# (micro entier_addition_posee, notion entier_calcul_pose), AVEC VOIX. Paysage 16:9, CEINTURE VERTE.
# Short jumeau : film Ti Margo (prototypes/ti-margo/films/calcul-pose.js, épisode addition).
# Décor et métier : Nadia, COMPTABLE (matrice métiers ; centre : argent-budget).
# Exemples de la fiche lib/fiches/maths-6e-calcul-pose.tsx : 475 + 286 = 761, défi 348 + 275 (+ 96).
# Écrans : garde (00), situation (01), aligner (02), poser (03), la retenue (04), QUESTION 1 (05),
# piège (06), QUESTION 2 (07), défi (08) et correction (08b), appris (09), fin (10).
# Voix : manim/voix/6e-calcul-pose-addition.json (Julie, débit −6) ;
# marques : calcul_pose_addition_marques.json (python manim/scripts/6e/calcul_pose_marques.py addition).
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/6e/calcul_pose_addition.py CalculPoseAddition6e
# python -m manim render -qh --disable_caching manim/scripts/6e/calcul_pose_addition.py CalculPoseAddition6e -o eleveai-maths-6e-calcul-pose-addition --media_dir manim/scripts/6e/media-cp-01
# Sortie : manim/sorties/6e/maths/calcul-pose/01-addition/eleveai-maths-6e-calcul-pose-addition.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from calcul_pose_commun import *  # noqa: E402,F403


class CalculPoseAdditionBase(PaysageCalculPose):
    nom_voix = "6e-calcul-pose-addition"
    fichier_marques = "calcul_pose_addition_marques.json"

    def _disposer_q(self, question, choix, phrase):
        """Le compte à rebours n'est pas un nombre dit : hors synchro."""
        r = super()._disposer_q(question, choix, phrase)
        for f in r[4].get_family():
            f.sans_synchro = True
        return r

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("L'addition posée", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("L'addition")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q = self.bloc(["Comment ne pas oublier", "une retenue ?"], 40)
        q.move_to(P(0, 0.35)).align_to(P(-6.2, 0), LEFT)
        cases = VGroup()
        for i in range(3):
            for x in (2.0, 2.7, 3.4):
                cases.add(DashedVMobject(Square(0.58, stroke_color=WHITE, stroke_width=3), num_dashes=16)
                          .move_to(P(x, 1.1 - 0.78 * i - (0.15 if i == 2 else 0))))
        plus = Text("+", font_size=56, color=WHITE, weight=BOLD).move_to(P(1.35, 0.32))
        barre = Line(P(1.1, -0.2), P(3.8, -0.2), color=WHITE, stroke_width=5)
        ret = VGroup(*[Circle(radius=0.13, color=ORANGE_RETENUE, fill_opacity=1).move_to(P(x - 0.27, 1.55))
                       for x in (2.0, 2.7)])
        self.au_mot("Comment")
        self.play(FadeIn(q, shift=UP * 0.2), FadeIn(cases), FadeIn(plus), Create(barre), run_time=0.3)
        self.au_mot("retenue")
        self.play(FadeIn(ret, scale=2), run_time=0.4)
        self.play(Indicate(ret, color=ORANGE_RETENUE, scale_factor=1.6), run_time=0.7)
        self.attendre_voix(marge=0.6)

    # ── 01 : Nadia, comptable ───────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        nd = nadia(1.05).move_to(P(-5.2, 0.0))
        self.au_mot("Voici Nadia")
        nom = self.t("Nadia", 42, BLEU_CALCUL).next_to(nd, UP, buff=0.2)
        self.play(FadeIn(nd, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("comptable")
        met = self.t("comptable", 32, BLEU_CALCUL).next_to(nd, DOWN, buff=0.18)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.35)
        f1 = facture("ÉLECTRICITÉ", 1.3).move_to(P(-2.3, 0.2))
        f2 = facture("INTERNET", 1.3, "#e0f2fe").move_to(P(0.4, 0.2))
        self.au_mot("Ce mois-ci")
        l1 = self.t("Ce mois-ci, elle a payé :", 38)
        gauche(l1, -3.4, 2.6)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.3)
        m1 = self.t("475 €", 46, ROSE_D).next_to(f1, DOWN, buff=0.25)
        m2 = self.t("286 €", 46, AMBRE_D).next_to(f2, DOWN, buff=0.25)
        self.au_mot("475 euros")
        self.play(FadeIn(m1, scale=1.2), run_time=0.3)
        self.au_mot("d'électricité")
        self.play(FadeIn(f1, shift=DOWN * 0.3), run_time=0.35)
        self.au_mot("286 euros")
        self.play(FadeIn(m2, scale=1.2), run_time=0.3)
        self.au_mot("d'internet")
        self.play(FadeIn(f2, shift=DOWN * 0.3), run_time=0.35)
        self.au_mot("Combien")
        q = self.t("Combien en tout ?", 46, JAUNE_TITRE).move_to(P(-0.95, -2.55))
        self.play(FadeIn(q, shift=UP * 0.15), Wiggle(VGroup(f1, f2)), run_time=0.5)
        self.attendre_voix()

    # ── 02 : aligner à droite ───────────────────────────────────────────────
    def ecran_aligner(self):
        self.ecran("02-aligner")
        po = Pose(["475", "286"], origine=P(-3.2, 0.9), pas=0.95, hl=1.15, fs=72)
        self.au_mot("D'abord")
        tit = self.t("On aligne les chiffres à droite.", 40, JAUNE_TITRE)
        tit.move_to(P(0, 3.0))
        self.play(Write(tit), FadeIn(po.ligne(0)), FadeIn(po.ligne(1)), FadeIn(po.signe), Create(po.barre),
                  run_time=0.5)
        for k, r in enumerate((0, 1, 2)):
            nom = NOM_RANG[r]
            lg = self.t(f"les {nom} sous les {nom},", 36, COUL_RANG_E[r])
            lg.scale(34 / 36)
            gauche(lg, -1.9, 1.3 - 0.85 * k)
            self.au_mot(f"{nom} sous les")
            self.play(FadeIn(lg, shift=UP * 0.1), Create(po.colonne(r, 0, 1)), FadeIn(po.entete(r), scale=1.4),
                      run_time=0.4)
        self.attendre_voix()

    # ── 03 : poser 475 + 286 ────────────────────────────────────────────────
    def ecran_pose(self):
        self.ecran("03-pose")
        po = Pose(["475", "286"], origine=P(-3.2, 1.5), pas=0.9, hl=1.1, fs=70)
        self.au_mot("On pose")
        l0 = self.ligne([("On pose", WHITE), ("475", ROSE_D), ("+ 286.", AMBRE_D)], 38, buff=0.16)
        gauche(l0, -1.4, 2.95)
        self.play(FadeIn(l0[0], shift=UP * 0.1), run_time=0.25)
        self.au_mot("475 plus")
        self.play(FadeIn(l0[1], shift=UP * 0.1), FadeIn(po.ligne(0), shift=DOWN * 0.1), run_time=0.3)
        self.au_mot("286. Unités")
        self.play(FadeIn(l0[2], shift=UP * 0.1), FadeIn(po.ligne(1), shift=DOWN * 0.1), FadeIn(po.signe),
                  Create(po.barre), FadeIn(VGroup(*[po.entete(r) for r in (0, 1, 2)])), run_time=0.3)
        etapes = (("Unités :", 0, "5 + 6", "5 plus 6", "= 11.", "11. J'écris", "1", "J'écris 1", "je retiens 1 dizaine",
                   "J'écris 1, je retiens 1."),
                  ("Dizaines :", 1, "1 + 7 + 8", "1 plus 7 plus 8", "= 16.", "16. J'écris", "6", "J'écris 6",
                   "je retiens 1 centaine", "J'écris 6, je retiens 1."),
                  ("Centaines :", 2, "1 + 4 + 2", "1 plus 4 plus 2", "= 7.", "2, 7", "7", None, None, None))
        y = 2.2
        for nom, r, calc, mot_calc, egal, mot_egal, chiffre, mot_ecrit, mot_ret, phrase in etapes:
            cad = po.colonne(r)
            lg = self.ligne([(nom, COUL_RANG_E[r]), (calc, WHITE), (egal, VERT_OK)], 36, buff=0.16)
            gauche(lg, -1.4, y)
            self.au_mot(nom[:-2])
            self.play(FadeIn(lg[0], shift=UP * 0.1), Create(cad), run_time=0.3)
            self.au_mot(mot_calc)
            self.play(FadeIn(lg[1], shift=UP * 0.1), run_time=0.3)
            self.au_mot(mot_egal)
            self.play(FadeIn(lg[2], shift=UP * 0.1), run_time=0.3)
            y -= 0.66
            if mot_ecrit:
                lr = self.ligne([(phrase.split(",")[0] + ",", VERT_OK), ("je retiens 1.", ORANGE_RETENUE)], 34,
                                buff=0.16)
                gauche(lr, -0.8, y)
                self.au_mot(mot_ecrit)
                self.play(FadeIn(lr[0], shift=UP * 0.1), FadeIn(po.res(r, chiffre), scale=1.6), run_time=0.3)
                self.au_mot(mot_ret)
                ret = po.ret(r + 1, 1)
                self.play(FadeIn(lr[1], shift=UP * 0.1), FadeIn(ret, scale=2), run_time=0.35)
                self.play(Indicate(ret, color=ORANGE_RETENUE, scale_factor=1.8), FadeOut(cad), run_time=0.35)
                y -= 0.72
            else:
                self.play(FadeIn(po.res(r, chiffre), scale=1.6), FadeOut(cad), run_time=0.3)
        self.au_mot("Nadia a payé")
        l5 = self.t("Nadia a payé :", 38)
        gauche(l5, -1.4, -2.3)
        g = self.gros("761 €", fs=56).next_to(l5, RIGHT, buff=0.35)
        self.play(FadeIn(l5, shift=UP * 0.1), run_time=0.3)
        self.au_mot("761 euros")
        self.play(FadeIn(g, scale=1.3), run_time=0.4)
        self.insister(g, 1.2, 0.25)
        self.attendre_voix()

    # ── 04 : pourquoi retenir 1 ─────────────────────────────────────────────
    def ecran_retenue(self):
        self.ecran("04-retenue")
        self.au_mot("Pourquoi")
        tit = self.t("Pourquoi retenir 1 ?", 44, ORANGE_RETENUE).move_to(P(0, 3.0))
        self.play(Write(tit), run_time=0.4)
        cubes = VGroup(*[cube(BLEU_D, 0.42) for _ in range(11)]).arrange(RIGHT, buff=0.08).move_to(P(0.6, 1.9))
        self.au_mot("11 unités")
        l1 = self.t("11 unités", 38, BLEU_D).next_to(cubes, LEFT, buff=0.35)
        self.play(FadeIn(l1, shift=UP * 0.1), LaggedStart(*[FadeIn(c, scale=1.5) for c in cubes], lag_ratio=0.06),
                  run_time=0.8)
        dix = VGroup(*cubes[:10])
        self.au_mot("1 dizaine et")
        barre = SurroundingRectangle(dix, color=AMBRE_D, buff=0.06, stroke_width=6)
        lg = self.ligne([("= 1 dizaine", AMBRE_D), ("et 1 unité.", BLEU_D)], 38, buff=0.2)
        gauche(lg, -3.6, 1.0)
        self.play(Create(barre), FadeIn(lg[0], shift=UP * 0.1), dix.animate.set_fill(AMBRE_D), run_time=0.45)
        self.au_mot("et 1 unité")
        self.play(FadeIn(lg[1], shift=UP * 0.1), Indicate(cubes[10], color=BLEU_D, scale_factor=1.6), run_time=0.4)
        # les colonnes : la barre de 10 change de colonne
        cd = RoundedRectangle(width=2.2, height=1.6, corner_radius=0.12, stroke_color=AMBRE_D, stroke_width=5) \
            .move_to(P(-1.6, -0.75))
        cu = RoundedRectangle(width=2.2, height=1.6, corner_radius=0.12, stroke_color=BLEU_D, stroke_width=5) \
            .move_to(P(1.0, -0.75))
        td = self.t("dizaines", 30, AMBRE_D).next_to(cd, UP, buff=0.12)
        tu = self.t("unités", 30, BLEU_D).next_to(cu, UP, buff=0.12)
        for f in VGroup(td, tu).get_family():
            f.sans_synchro = True  # étiquettes des colonnes, redites de l'écran
        self.au_mot("La dizaine part")
        self.play(FadeIn(VGroup(cd, cu, td, tu)), run_time=0.35)
        bloc10 = VGroup(dix, barre)
        self.play(bloc10.animate.scale(0.38).move_to(cd), cubes[10].animate.move_to(cu), run_time=0.9)
        self.au_mot("Une retenue")
        l3 = self.t("Une retenue, c'est un paquet de 10", 36, ORANGE_RETENUE)
        gauche(l3, -5.6, -2.45)
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.35)
        self.au_mot("qui change de colonne")
        l4 = self.t("qui change de colonne.", 36, ORANGE_RETENUE)
        gauche(l4, -5.6, -3.1)
        self.play(FadeIn(l4, shift=UP * 0.1), Indicate(bloc10, color=ORANGE_RETENUE, scale_factor=1.3), run_time=0.45)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (réponse A) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        po = Pose(["368", "157"], origine=P(-3.4, 1.7), pas=0.66, fs=60, hl=0.9)

        def autres_q(sc):
            sc.play(FadeIn(po.ligne(0)), FadeIn(po.ligne(1)), FadeIn(po.signe), Create(po.barre), run_time=0.35)

        def apres(sc):
            lg = sc.rep_bas(0, ["Unités : 8 + 7 = 15,", "je retiens 1."])
            sc.au_mot("Unités")
            sc.play(FadeIn(lg[0], shift=UP * 0.1), FadeIn(po.res(0, 5), scale=1.6), run_time=0.3)
            sc.au_mot("je retiens 1. Dizaines")
            sc.play(FadeIn(lg[1], shift=UP * 0.1), FadeIn(po.ret(1, 1), scale=2), run_time=0.3)
            lg2 = sc.rep_bas(1, ["Dizaines : 1 + 6 + 5 = 12,", "je retiens 1."])
            sc.au_mot("Dizaines")
            sc.play(FadeIn(lg2[0], shift=UP * 0.1), FadeIn(po.res(1, 2), scale=1.6), run_time=0.3)
            sc.au_mot("je retiens 1. Centaines")
            sc.play(FadeIn(lg2[1], shift=UP * 0.1), FadeIn(po.ret(2, 1), scale=2), run_time=0.3)
            lg3 = sc.rep_bas(2, ["Centaines : 1 + 3 + 1 = 5.", "Ça fait 525."])
            sc.au_mot("Centaines")
            sc.play(FadeIn(lg3[0], shift=UP * 0.1), FadeIn(po.res(2, 5), scale=1.6), run_time=0.3)
            sc.au_mot("Ça fait 525")
            sc.play(FadeIn(lg3[1], scale=1.2), run_time=0.3)
            sc.rep_fini()

        self.question_pause("05-question", "05b-reponse", ["Combien font 368 + 157 ?"],
                            [self.t("525", 36), self.t("415", 36), self.t("515", 36)], 0,
                            ["Unités : 8 + 7 = 15, je retiens 1.", "Dizaines : 1 + 6 + 5 = 12, je retiens 1.",
                             "Centaines : 1 + 3 + 1 = 5. Ça fait 525."], mot_q="Combien",
                            autres_q=autres_q, autres_r=apres)

    # ── 06 : le piège de l'alignement ───────────────────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        self.au_mot("Attention")
        tit = self.t("Attention au piège !", 46, ROUGE_ERREUR)
        gauche(tit, -6.2, 3.05)
        self.play(Write(tit), run_time=0.35)
        faux = Pose(["1248", "75"], origine=P(-2.6, 0.9), pas=0.75, fs=62, hl=0.95)
        bon = Pose(["1248", "75"], origine=P(3.4, 0.9), pas=0.75, fs=62, hl=0.95)
        lg0 = self.ligne([("Nadia ajoute", WHITE), ("1 248 €", ROSE_D), ("et", WHITE), ("75 €.", AMBRE_D)], 36,
                         buff=0.16)
        hors_audit(lg0[1])  # « 1 248 » : l'audit coupe le nombre à l'espace ; posé au mot
        gauche(lg0, -6.2, 2.2)
        self.au_mot("Nadia ajoute")
        self.play(FadeIn(lg0[0], shift=UP * 0.1), run_time=0.25)
        self.au_mot("1 248 euros")
        fl0 = faux.ligne(0)
        self.play(FadeIn(lg0[1], scale=1.2), FadeIn(fl0), run_time=0.3)
        self.au_mot("et 75")
        self.play(FadeIn(lg0[2]), FadeIn(lg0[3], scale=1.2), run_time=0.3)
        # la mauvaise pose : 75 sous le 1 et le 2
        f7, f5 = faux.place("7", 3, 1, ROUGE_ERREUR), faux.place("5", 2, 1, ROUGE_ERREUR)
        self.au_mot("On ne pose pas")
        lf = self.t("Pas en commençant à gauche !", 32, ROUGE_ERREUR)
        gauche(lf, -6.2, -1.5)
        self.play(FadeIn(VGroup(f7, f5), shift=RIGHT * 0.2), FadeIn(faux.signe), Create(faux.barre), run_time=0.4)
        self.au_mot("commençant à gauche")
        croix = Cross(VGroup(fl0, f7, f5), stroke_color=ROUGE_ERREUR, stroke_width=8)
        self.play(FadeIn(lf, shift=UP * 0.1), Create(croix), run_time=0.4)
        # la bonne pose
        self.play(FadeIn(bon.ligne(0)), FadeIn(bon.signe), Create(bon.barre), run_time=0.3)
        self.au_mot("Le 5 va sous")
        self.play(FadeIn(bon.chiffre(1, 0, VERT_OK), shift=DOWN * 0.3), Create(bon.colonne(0, 0, 1)), run_time=0.35)
        self.au_mot("le 7 sous")
        self.play(FadeIn(bon.chiffre(1, 1, VERT_OK), shift=DOWN * 0.3), Create(bon.colonne(1, 0, 1)), run_time=0.35)
        self.au_mot("Ça fait")
        res = VGroup(bon.res(3, 1), bon.res(2, 3), bon.res(1, 2), bon.res(0, 3), bon.ret(1, 1), bon.ret(2, 1))
        self.au_mot("1 323")
        g = self.gros("1 323 €", fs=52).move_to(P(2.4, -1.9))
        hors_audit(g[1])
        self.play(FadeIn(res, scale=1.3), FadeIn(g, scale=1.2), run_time=0.4)
        self.insister(g, 1.15, 0.25)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (réponse B) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        po = Pose(["2405", "36"], origine=P(-3.2, 1.7), pas=0.66, fs=60, hl=0.9)

        def autres_q(sc):
            sc.play(FadeIn(po.ligne(0)), FadeIn(po.signe), Create(po.barre), run_time=0.35)

        def apres(sc):
            lg = sc.rep_bas(0, ["On aligne à droite."])
            sc.au_mot("On aligne")
            sc.play(FadeIn(lg[0], shift=UP * 0.1), run_time=0.25)
            lg2 = sc.rep_bas(1, ["Le 6 va sous le 5,", "le 3 sous le 0."])
            hors_audit(lg2[0])  # posé au mot « 6 des unités » (l'audit compte aussi le « 6 » du choix B)
            sc.au_mot("6 des unités")
            sc.play(FadeIn(lg2[0], shift=UP * 0.1), FadeIn(po.chiffre(1, 0, VERT_OK), shift=DOWN * 0.3), run_time=0.3)
            sc.au_mot("3 des dizaines")
            sc.play(FadeIn(lg2[1], shift=UP * 0.1), FadeIn(po.chiffre(1, 1, VERT_OK), shift=DOWN * 0.3), run_time=0.3)
            lg3 = sc.rep_bas(2, ["Ça fait 2 441."])
            sc.au_mot("Ça fait")
            res = VGroup(po.res(3, 2), po.res(2, 4), po.res(1, 4), po.res(0, 1), po.ret(1, 1))
            sc.play(FadeIn(lg3[0], shift=UP * 0.1), FadeIn(res, scale=1.3), run_time=0.35)
            sc.rep_fini()

        self.question_pause("07-question", "07b-reponse", ["Dans 2 405 + 36, où poser le 36 ?"],
                            [self.choix("le 3 sous le 2"), self.choix("le 6 sous le 5"), self.choix("le 3 sous le 4")],
                            1, ["On aligne à droite.", "Le 6 va sous le 5, le 3 sous le 0.", "Ça fait 2 441."],
                            mot_q="Dans", autres_q=autres_q, autres_r=apres)

    # ── 08 : le défi ────────────────────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        nd = nadia(0.8).move_to(P(-5.3, 0.6))
        self.au_mot("Nadia paie")
        l0 = self.t("Nadia paie trois factures :", 38)
        self.col(l0, 2.2, xl=-4.2)
        self.play(FadeIn(nd, shift=UP * 0.2), FadeIn(l0, shift=UP * 0.1), run_time=0.35)
        fs_ = [facture("FACTURE", 0.85, c).move_to(P(-2.4 + 2.0 * k, 0.4)) for k, c in
               enumerate(("#fef3c7", "#e0f2fe", "#fce7f3"))]
        for f, (mot, txt, c) in zip(fs_, (("348 euros", "348 €", ROSE_D), ("275 euros", "275 €", AMBRE_D),
                                          ("96 euros", "96 €", BLEU_D))):
            self.au_mot(mot)
            m = self.t(txt, 38, c).next_to(f, DOWN, buff=0.18)
            self.play(FadeIn(f, shift=DOWN * 0.25), FadeIn(m, scale=1.2), run_time=0.35)
        self.au_mot("Combien")
        q = self.t("Combien en tout ?", 42, JAUNE_TITRE).move_to(P(-0.4, -1.2))
        self.play(FadeIn(q, shift=UP * 0.1), Wiggle(VGroup(*fs_)), run_time=0.45)
        self.pause_defi(y=-2.1)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        po = Pose(["348", "275", "96"], origine=P(-3.9, 1.9), pas=0.75, fs=60, hl=0.88)
        self.au_mot("On pose")
        l0 = self.t("On pose les trois nombres, alignés à droite.", 30)
        gauche(l0, -3.0, 2.5)
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(po.ligne(0)), FadeIn(po.ligne(1)), FadeIn(po.ligne(2)),
                  FadeIn(po.signe), Create(po.barre), run_time=0.4)
        etapes = (("Unités :", 0, "8 + 5 + 6", "8 plus 5 plus 6", "= 19.", "9", "J'écris 9", 1, "je retiens 1. Diz"),
                  ("Dizaines :", 1, "1 + 4 + 7 + 9", "1 plus 4 plus 7 plus 9", "= 21.", "1", "J'écris 1", 2,
                   "je retiens 2"),
                  ("Centaines :", 2, "2 + 3 + 2", "2 plus 3 plus 2", "= 7.", "7", None, None, None))
        y = 1.85
        for nom, r, calc, mot_calc, egal, ch, mot_ecrit, ret, mot_ret in etapes:
            cad = po.colonne(r)
            lg = self.ligne([(nom, COUL_RANG_E[r]), (calc, WHITE), (egal, VERT_OK)], 34, buff=0.14)
            gauche(lg, -3.0, y)
            self.au_mot(nom[:-2])
            self.play(FadeIn(lg[0], shift=UP * 0.1), Create(cad), run_time=0.25)
            self.au_mot(mot_calc)
            self.play(FadeIn(lg[1], shift=UP * 0.1), run_time=0.25)
            self.play(FadeIn(lg[2], shift=UP * 0.1), run_time=0.25)
            y -= 0.6
            if ret:
                lr = self.ligne([(f"J'écris {ch},", VERT_OK), (f"je retiens {ret}.", ORANGE_RETENUE)], 32, buff=0.14)
                gauche(lr, -2.4, y)
                self.au_mot(mot_ecrit)
                self.play(FadeIn(lr[0], shift=UP * 0.1), FadeIn(po.res(r, ch), scale=1.6), run_time=0.25)
                self.au_mot(mot_ret)
                rt = po.ret(r + 1, ret)
                self.play(FadeIn(lr[1], shift=UP * 0.1), FadeIn(rt, scale=2), FadeOut(cad), run_time=0.3)
                y -= 0.65
            else:
                self.play(FadeIn(po.res(r, ch), scale=1.6), FadeOut(cad), run_time=0.25)
        self.au_mot("Total")
        lt = self.t("Total :", 40)
        gauche(lt, -3.0, -1.6)
        self.play(FadeIn(lt, shift=UP * 0.1), run_time=0.25)
        self.au_mot("719 euros")
        g = self.gros("719 €", fs=56).next_to(lt, RIGHT, buff=0.3)
        self.play(FadeIn(g, scale=1.3), run_time=0.4)
        self.insister(g, 1.15, 0.25)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        po = Pose(["475", "286"], origine=P(-3.6, 1.0), pas=0.72, fs=62, hl=0.95)
        fig = VGroup(po, po.ligne(0), po.ligne(1), po.res(2, 7), po.res(1, 6), po.res(0, 1), po.ret(1, 1),
                     po.ret(2, 1))
        lignes = self.finale_gauche(fig, textes=[
            ("On aligne les chiffres", "à droite."),
            ("On commence", "par les unités."),
            ("Un paquet de 10 devient une retenue", "dans la colonne de gauche.")], fs=36)
        self.add(fig)
        self.au_mot("On aligne")
        self.montrer_ligne(lignes[0], Indicate(VGroup(fig[1], fig[2]), color=BLEU_D, scale_factor=1.15))
        self.au_mot("On commence")
        self.montrer_ligne(lignes[1], Indicate(fig[5], color=BLEU_D, scale_factor=1.8))
        self.au_mot("Un paquet")
        self.montrer_ligne(lignes[2], Indicate(VGroup(fig[6], fig[7]), color=ORANGE_RETENUE, scale_factor=2.0))
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_aligner()
        self.ecran_pose()
        self.ecran_retenue()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")


class CalculPoseAddition6e(CalculPoseAdditionBase):
    identite = "Maths 6e — EleveAI"
    ceinture = "verte"
