# aire_comprendre.py
# EleveAI — Maths CM1 — série « Aire », épisode 01 : COMPRENDRE CE QU'EST UNE AIRE
# (micro aire_comprendre, notion aire), AVEC VOIX. Paysage 16:9, CEINTURE JAUNE.
# Short jumeau : film Ti Margo (la ficelle autour de la cabane).
# Décor et métier : Mathis, CARRELEUR (matrice métiers cm1 aire ; centres : construction, art-design).
# Exemples du coach (aires.bank.ts) : l'aire = la surface à l'intérieur, le contour = le périmètre ;
# on compte les carreaux unités.
# Mapping micro → écrans : aire_comprendre = 02 (couvrir), 03 (l'aire), 04 (aire / périmètre),
# 06 (piège : le plus long n'a pas la plus grande aire), questions 05 et 07, défi 08.
# Voix : manim/voix/cm1-aire-comprendre.json (validée le 13/11, Julie, débit −6) ;
# marques : aire_comprendre_marques.json (python manim/scripts/cm1/aire_marques.py comprendre).
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/cm1/aire_comprendre.py AireComprendreCM1
# python -m manim render -qh --disable_caching manim/scripts/cm1/aire_comprendre.py AireComprendreCM1 -o eleveai-maths-cm1-aire-comprendre --media_dir manim/scripts/cm1/media-aire-01
# Sortie : manim/sorties/cm1/maths/aire/01-comprendre/eleveai-maths-cm1-aire-comprendre.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from aire_cm1_commun import *  # noqa: E402,F403


class AireComprendreBase(PaysageAireCM1):
    nom_voix = "cm1-aire-comprendre"
    fichier_marques = "aire_comprendre_marques.json"

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("L'aire", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("L'aire")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q = self.bloc(["Combien de place", "prend une surface ?"], 40)
        q.move_to(P(0, 0.35)).align_to(P(-6.2, 0), LEFT)
        g = rect_cases(4, 3, 0.55).move_to(P(3.0, 0.4))
        self.au_mot("Combien")
        self.play(FadeIn(q, shift=UP * 0.2), run_time=0.4)
        self.au_mot("surface")
        self.play(LaggedStart(*[FadeIn(c, scale=1.6) for c in g], lag_ratio=0.08), run_time=1.0)
        self.attendre_voix(marge=0.6)

    # ── 01 : Mathis, carreleur ──────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        m = mathis(1.0).move_to(P(-5.2, 0.1))
        self.au_mot("Voici Mathis")
        nom = self.t("Mathis", 42, BLEU_CALCUL).next_to(m, UP, buff=0.2)
        self.play(FadeIn(m, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("carreleur")
        met = self.t("carreleur", 32, BLEU_CALCUL).next_to(m, DOWN, buff=0.18)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.35)
        sol = Rectangle(width=5 * 0.62, height=3 * 0.62, stroke_color=WHITE, stroke_width=4,
                        fill_color="#1e293b", fill_opacity=1).move_to(P(-1.2, 0.4))
        ts = self.t("le sol de la cuisine", 28, GRAY_B).next_to(sol, DOWN, buff=0.2)
        self.au_mot("couvrir le sol")
        self.play(Create(sol), FadeIn(ts), run_time=0.5)
        pile = VGroup(*[carreau(0.62).move_to(P(2.3 + 0.06 * k, 0.1 + 0.06 * k)) for k in range(4)])
        self.au_mot("avec des carreaux")
        self.play(FadeIn(pile, shift=LEFT * 0.3), run_time=0.4)
        self.au_mot("Combien")
        q = self.t("Combien de carreaux ?", 44, JAUNE_TITRE).move_to(P(-0.4, -2.55))
        self.play(FadeIn(q, shift=UP * 0.15), Wiggle(pile), run_time=0.5)
        self.attendre_voix()

    # ── 02 : couvrir le sol ─────────────────────────────────────────────────
    def ecran_couvrir(self):
        self.ecran("02-couvrir")
        sol = Rectangle(width=5 * 0.75, height=3 * 0.75, stroke_color=WHITE, stroke_width=4).move_to(P(-3.3, 0.5))
        g = rect_cases(5, 3, 0.75).move_to(sol)
        self.add(sol)
        self.au_mot("un par un")
        l0 = self.bloc(["Sans trou,", "sans superposer."], 36)
        self.col(l0, 2.6)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.35)
        for j, (mot, txt) in enumerate((("Première rangée", "1re rangée : 5"), ("Deuxième rangée", "2e rangée : 5"),
                                        ("Troisième rangée", "3e rangée : 5"))):
            lg = self.t(txt, 34, BLEU_D)
            self.col(lg, 1.3 - 0.65 * j)
            hors_audit(lg)  # « 1re », « 2e », « 3e » : dits en toutes lettres
            self.au_mot(mot)
            self.play(LaggedStart(*[FadeIn(c, shift=DOWN * 0.3) for c in rangee(g, j, 5)], lag_ratio=0.12),
                      FadeIn(lg, shift=UP * 0.1), run_time=0.8)
        self.au_mot("Le sol est couvert")
        self.play(Indicate(g, color=CARREAU, scale_factor=1.05), run_time=0.5)
        nums = numeros(g, 24, "#0f172a")
        self.au_mot("On compte")
        self.play(LaggedStart(*[FadeIn(n, scale=1.5) for n in nums], lag_ratio=0.08), run_time=1.0)
        self.au_mot("15 carreaux")
        res = self.gros("15 carreaux", fs=46)
        self.col(res, -1.4)
        self.play(FadeIn(res, scale=1.2), run_time=0.4)
        self.insister(res, 1.15, 0.25)
        self.attendre_voix()

    # ── 03 : l'aire, c'est l'intérieur ──────────────────────────────────────
    def ecran_aire(self):
        self.ecran("03-aire")
        g = rect_cases(5, 3, 0.75).move_to(P(-3.3, 0.5))
        self.add(g)
        self.au_mot("La place")
        lg = self.pile([("La place du sol,", WHITE), ("c'est son aire.", VERT_OK)], 36)
        self.col(lg, 2.75)
        self.play(FadeIn(lg, shift=UP * 0.1), g.animate.set_fill(VERT_F), run_time=0.5)
        self.au_mot("L'aire de la cuisine")
        l2 = self.t("Aire de la cuisine :", 34)
        self.col(l2, 1.4)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.3)
        self.au_mot("15 carreaux")
        res = self.gros("15 carreaux", fs=44)
        self.col(res, 0.5)
        self.play(FadeIn(res, scale=1.2), run_time=0.4)
        self.au_mot("tout l'intérieur")
        l3 = self.pile([("tout l'intérieur,", VERT_OK), ("pas seulement le bord.", WHITE)], 34)
        self.col(l3, -0.85)
        self.play(FadeIn(l3[0], shift=UP * 0.1), Indicate(g, color=VERT_F, scale_factor=1.06), run_time=0.5)
        self.au_mot("pas seulement")
        bord = contour(g, GRAY_B, 6)
        self.play(FadeIn(l3[1], shift=UP * 0.1), Create(bord), run_time=0.5)
        self.play(FadeOut(bord), run_time=0.3)
        self.attendre_voix()

    # ── 04 : le tour (périmètre) et l'intérieur (aire) ──────────────────────
    def ecran_tour(self):
        self.ecran("04-tour")
        g = rect_cases(5, 3, 0.75).move_to(P(-3.3, 0.5))
        g.set_fill("#1e293b")
        self.add(g)
        self.au_mot("Et le bord")
        tit = self.t("Et le bord ?", 42, JAUNE_TITRE)
        self.col(tit, 2.9)
        self.play(Write(tit), run_time=0.35)
        pl = contour(g, PLINTHE, 12)
        self.au_mot("Tout autour")
        self.play(Create(pl), run_time=1.2)
        self.au_mot("La plinthe fait le tour")
        l1 = self.pile([("Plinthe = le tour :", PLINTHE), ("le périmètre.", PLINTHE)], 36)
        self.col(l1, 1.7)
        self.play(FadeIn(l1[0], shift=UP * 0.1), Indicate(pl, color=PLINTHE, scale_factor=1.04), run_time=0.45)
        self.au_mot("c'est le périmètre")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("Le carrelage couvre")
        l2 = self.pile([("Carrelage = l'intérieur :", VERT_OK), ("l'aire.", VERT_OK)], 36)
        self.col(l2, 0.2)
        self.play(FadeIn(l2[0], shift=UP * 0.1), g.animate.set_fill(VERT_F), run_time=0.6)
        self.au_mot("c'est l'aire")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.3)
        et_p = self.t("périmètre", 28, PLINTHE).next_to(pl, UP, buff=0.15)
        et_a = self.t("aire", 34, "#052e16").move_to(g)
        hors_audit(VGroup(et_p, et_a))  # redites des deux lignes
        self.play(FadeIn(et_p), FadeIn(et_a), run_time=0.4)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (réponse B) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        mur = VGroup(*[Rectangle(width=0.9, height=0.42, stroke_color="#78350f", stroke_width=2,
                                 fill_color="#d6a77a", fill_opacity=1)
                       .move_to(P(-5.3 + 0.92 * i + (0.46 if j % 2 else 0), 1.5 - 0.44 * j))
                       for j in range(6) for i in range(5)])
        mur = VGroup(*[b for b in mur if b.get_right()[0] < -0.4])
        rouleau = VGroup(RoundedRectangle(width=1.0, height=0.36, corner_radius=0.12, fill_color="#3b82f6",
                                          fill_opacity=1, stroke_width=0),
                         Line(P(0, -0.18), P(0, -0.9), color=GRAY_B, stroke_width=6)).move_to(P(-2.6, -1.6))

        def autres_q(sc):
            sc.play(FadeIn(mur), FadeIn(rouleau), run_time=0.35)

        def apres(sc):
            peint = Rectangle(width=mur.width, height=mur.height, fill_color="#3b82f6", fill_opacity=0.75,
                              stroke_width=0).move_to(mur)
            sc.play(FadeIn(peint, shift=DOWN * 0.3), rouleau.animate.shift(UP * 2.4), run_time=0.35)

        self.question_pause("05-question", "05b-reponse", ["Pour peindre un mur,", "que cherche-t-on ?"],
                            [self.choix("son périmètre"), self.choix("son aire"), self.choix("sa hauteur")], 1,
                            ["La peinture couvre tout le mur.", "On cherche son aire."], mot_q="Pour savoir",
                            autres_q=autres_q, autres_r=apres)

    # ── 06 : le piège (la bande longue) ─────────────────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        self.au_mot("Attention")
        tit = self.t("Attention au piège !", 46, ROUGE_ERREUR)
        gauche(tit, -6.2, 3.05)
        self.play(Write(tit), run_time=0.35)
        bande = rect_cases(6, 1, 0.6, AMBRE_D, "#78350f").move_to(P(-3.4, 1.7))
        carre = rect_cases(3, 3, 0.6, ROSE_D, "#831843").move_to(P(-4.3, -0.6))
        self.au_mot("une longue bande")
        self.play(LaggedStart(*[FadeIn(c, shift=RIGHT * 0.2) for c in bande], lag_ratio=0.1), run_time=0.7)
        self.au_mot("et un carré")
        self.play(LaggedStart(*[FadeIn(c, scale=1.4) for c in carre], lag_ratio=0.08), run_time=0.7)
        self.au_mot("La bande a l'air")
        l1 = self.bloc(["La bande a l'air", "plus grande…"], 34, AMBRE_D)
        self.col(l1, 2.25)
        self.play(FadeIn(l1, shift=UP * 0.1), Indicate(bande, color=AMBRE_D, scale_factor=1.08), run_time=0.5)
        self.au_mot("On compte")
        nb = numeros(bande, 22, "#0f172a")
        self.play(LaggedStart(*[FadeIn(n) for n in nb], lag_ratio=0.08), run_time=0.6)
        self.au_mot("la bande, 6")
        l2 = self.ligne([("Bande :", AMBRE_D), ("6 carreaux.", AMBRE_D)], 34)
        self.col(l2, 1.3)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.3)
        nc = numeros(carre, 22, "#0f172a")
        self.au_mot("Le carré, 9")
        self.play(LaggedStart(*[FadeIn(n) for n in nc], lag_ratio=0.06), run_time=0.5)
        l3 = self.ligne([("Carré :", ROSE_D), ("9 carreaux.", ROSE_D)], 34)
        self.col(l3, 0.7)
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.3)
        self.au_mot("Le carré a la plus grande")
        l4 = self.bloc(["Le carré a la", "plus grande aire !"], 34, VERT_OK)
        self.col(l4, -0.15)
        self.play(FadeIn(l4, shift=UP * 0.1), Indicate(carre, color=VERT_OK, scale_factor=1.1), run_time=0.5)
        self.au_mot("Le plus long")
        l5 = self.bloc(["Le plus long", "n'a pas toujours", "la plus grande aire."], 30, ORANGE_RETENUE)
        self.col(l5, -1.6)
        self.play(FadeIn(l5, shift=UP * 0.1), run_time=0.4)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (réponse A) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        c = 0.5
        verte = rect_cases(4, 2, c, VERT_F, "#14532d").move_to(P(-4.6, 1.7))
        bleue = figure_cases([(0, 0), (1, 0), (2, 0), (3, 0), (0, 1), (1, 1), (0, 2)], c, BLEU_D, "#1e3a8a") \
            .move_to(P(-1.9, 1.45))
        rouge = rect_cases(3, 2, c, ROUGE_F, "#7f1d1d").move_to(P(-3.4, -0.6))

        def autres_q(sc):
            sc.play(FadeIn(verte), FadeIn(bleue), FadeIn(rouge), run_time=0.35)

        def apres(sc):
            nums = VGroup(numeros(verte, 20, "#0f172a"), numeros(bleue, 20, "#0f172a"), numeros(rouge, 20, "#0f172a"))
            sc.play(FadeIn(nums), run_time=0.3)

        self.question_pause("07-question", "07b-reponse", ["Quelle figure a", "la plus grande aire ?"],
                            [self.choix("verte : 8 carreaux", 26), self.choix("bleue : 7 carreaux", 26),
                             self.choix("rouge : 6 carreaux", 26)], 0,
                            ["On compte les carreaux.", "La verte en couvre 8 :", "la plus grande aire."],
                            mot_q="Quelle figure", autres_q=autres_q, autres_r=apres)

    # ── 08 : le défi ────────────────────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        g = figure_cases([(i, 0) for i in range(5)] + [(i, 1) for i in range(5)] + [(i, 2) for i in range(3)], 0.7) \
            .move_to(P(-3.4, 0.6))
        self.au_mot("Mathis carrelle")
        l0 = self.t("Mathis carrelle une terrasse.", 34)
        self.col(l0, 2.2)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.35)
        for j, (mot, txt, a, b) in enumerate((("Première rangée", "1re rangée : 5", 0, 5),
                                               ("Deuxième rangée", "2e rangée : 5", 5, 10),
                                               ("Troisième rangée", "3e rangée : 3", 10, 13))):
            lg = hors_audit(self.t(txt, 32, BLEU_D))
            self.col(lg, 1.4 - 0.55 * j)
            self.au_mot(mot)
            self.play(LaggedStart(*[FadeIn(q, shift=DOWN * 0.3) for q in g[a:b]], lag_ratio=0.12),
                      FadeIn(lg, shift=UP * 0.1), run_time=0.7)
        self.au_mot("Quelle est l'aire")
        q = self.bloc(["Quelle est l'aire", "de la terrasse ?"], 38, JAUNE_TITRE)
        self.col(q, -0.5)
        self.play(FadeIn(q, shift=UP * 0.1), Wiggle(g), run_time=0.5)
        self.pause_defi(y=-1.6)  # au-dessus de Ti-Margo

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        g = figure_cases([(i, 0) for i in range(5)] + [(i, 1) for i in range(5)] + [(i, 2) for i in range(3)], 0.7) \
            .move_to(P(-3.4, 0.6))
        self.add(g)
        self.au_mot("On compte tous")
        l0 = self.t("On compte tous les carreaux.", 32)
        self.col(l0, 2.2)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.3)
        self.au_mot("5 plus 5")
        l1 = self.ligne([("5 + 5 =", BLEU_D), ("10", BLEU_D)], 40, buff=0.3)
        self.col(l1, 1.2)
        self.play(FadeIn(l1, shift=UP * 0.1), Indicate(g[:10], color=BLEU_D, scale_factor=1.05), run_time=0.5)
        self.au_mot("Plus 3")
        l2 = self.ligne([("10", BLEU_D), ("+ 3", BLEU_D), ("= 13", BLEU_D)], 40, buff=0.3)
        self.col(l2, 0.2)
        # le 10 descend de la ligne du dessus (déjà dit, déjà écrit) : une redite, hors synchro
        hors_audit(l2[0])
        self.play(TransformFromCopy(l1[1], l2[0]), FadeIn(l2[1], shift=UP * 0.1),
                  Indicate(g[10:], color=BLEU_D, scale_factor=1.1), run_time=0.4)
        self.play(FadeIn(l2[2], shift=UP * 0.1), run_time=0.3)
        self.au_mot("L'aire de la terrasse")
        res = self.gros("13 carreaux", fs=46)
        self.col(res, -1.2)
        self.play(FadeIn(res, scale=1.2), g.animate.set_fill(VERT_F), run_time=0.5)
        self.insister(res, 1.12, 0.25)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        g = rect_cases(4, 3, 0.62, VERT_F, "#14532d")
        pl = contour(g, PLINTHE, 9)
        fig = VGroup(g, pl)
        lignes = self.finale_gauche(fig, textes=[
            ("L'aire, c'est la place", "que prend une surface."),
            ("On la mesure en comptant", "les carreaux qui la couvrent."),
            ("Le périmètre, c'est le tour ;", "l'aire, c'est l'intérieur.")], fs=34)
        pl.move_to(g)
        self.add(g)
        self.au_mot("L'aire, c'est la place")
        self.montrer_ligne(lignes[0], Indicate(g, color=VERT_F, scale_factor=1.06))
        self.au_mot("On la mesure")
        nums = numeros(g, 22, "#0f172a")
        self.montrer_ligne(lignes[1], LaggedStart(*[FadeIn(n) for n in nums], lag_ratio=0.05))
        self.au_mot("Le périmètre")
        self.montrer_ligne(lignes[2], Create(pl))
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_couvrir()
        self.ecran_aire()
        self.ecran_tour()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")


class AireComprendreCM1(AireComprendreBase):
    identite = "Maths CM1 — EleveAI"
    ceinture = "jaune"
