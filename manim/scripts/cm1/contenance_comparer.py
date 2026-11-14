# contenance_comparer.py
# EleveAI — Maths CM1 — série « Contenance », épisode 01 : COMPARER DES CONTENANCES
# (micro contenance_comparer, notion contenance), AVEC VOIX. Paysage 16:9, CEINTURE JAUNE.
# Short jumeau : film Ti Margo (« 75, c'est plus que 1 ? », réponse B).
# Décor et métier : Inès, VENDEUSE DE JUS DE FRUITS FRAIS au marché (centres : cuisine, commerce).
# Mapping micro → écrans : 02 (la contenance, les unités L, cL, mL), 03 (même unité : on compare les nombres),
# 04 (deux unités : on convertit d'abord, 1 L = 100 cL = 1000 mL), 06 (piège : 75 cL n'est pas plus que 1 L),
# questions 05 (pichet 2 L contre carafe 150 cL, C) et 07 (1 L, 90 cL, 120 cL, A),
# défi 08 (ranger 4 récipients en mL).
# Voix : manim/voix/cm1-contenance-comparer.json (validée le 14/11, Julie, débit −6) ;
# marques : contenance_comparer_marques.json (python manim/scripts/cm1/aire_marques.py contenance:comparer).
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/cm1/contenance_comparer.py ContenanceComparerCM1
# python -m manim render -qh --disable_caching manim/scripts/cm1/contenance_comparer.py ContenanceComparerCM1 -o eleveai-maths-cm1-contenance-comparer --media_dir manim/scripts/cm1/media-contenance-01
# Sortie : manim/sorties/cm1/maths/contenance/01-comparer/eleveai-maths-cm1-contenance-comparer.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from contenance_cm1_commun import *  # noqa: E402,F403

# hauteur du corps : 2 unités pour 1 L (la taille dit la contenance, à peu près)
H_L = 2.0


def bouteille(cl, couleur=JUS, larg=0.85):
    return recipient("bouteille", H_L * cl / 100, larg, 0.85, couleur)


class ContenanceComparerBase(PaysageContenanceCM1):
    nom_voix = "cm1-contenance-comparer"
    fichier_marques = "contenance_comparer_marques.json"
    ceinture = "jaune"

    def deux_bouteilles(self, pos, k=1.0):
        """La bouteille de 1 L et celle de 75 cL, côte à côte (k : l'échelle)."""
        a, b = bouteille(100), bouteille(75)
        g = rangee_recipients([a, b], 0.6).scale(k).move_to(pos)
        return g

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Comparer des contenances", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Comparer des contenances")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q0 = self.ligne([("Laquelle", WHITE), ("contient le plus :", WHITE)], 38, buff=0.2)
        q1 = self.ligne([("1 L", JAUNE_TITRE), ("ou 75 cL ?", JAUNE_TITRE)], 38, buff=0.2)
        q = VGroup(q0, q1).arrange(DOWN, aligned_edge=LEFT, buff=0.3)
        q.move_to(P(0, 0.3)).align_to(P(-6.2, 0), LEFT)
        g = self.deux_bouteilles(P(3.9, 0.35), 0.75)
        self.au_mot("Laquelle")
        self.play(FadeIn(q0[0], shift=UP * 0.2), FadeIn(g, scale=1.1), run_time=0.3)
        self.au_mot("contient le plus")
        self.play(FadeIn(q0[1], shift=UP * 0.2), run_time=0.3)
        self.au_mot("1 litre")
        self.play(FadeIn(q1[0], shift=UP * 0.2), run_time=0.25)
        self.au_mot("ou 75")
        self.play(FadeIn(q1[1], shift=UP * 0.2), run_time=0.3)
        self.attendre_voix(marge=0.6)

    # ── 01 : Inès, vendeuse de jus au marché ────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pe = ines(0.95).move_to(P(-5.0, 0.35))
        self.au_mot("Voici Inès")
        nom = self.t("Inès", 42, JUS).next_to(pe, UP, buff=0.2)
        self.play(FadeIn(pe, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("au marché")
        met = self.bloc(["vendeuse de jus", "au marché"], 24, JUS).next_to(pe, DOWN, buff=0.12)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.35)
        a, b = bouteille(100), bouteille(75)
        a.move_to(P(-2.4, 0.4)).align_to(P(0, -0.7), DOWN)
        b.move_to(P(-0.9, 0.4)).align_to(P(0, -0.7), DOWN)
        l1 = self.ligne([("Une bouteille de", WHITE), ("1 L", JAUNE_TITRE)], 34, buff=0.2)
        l1.move_to(P(3.9, 1.7)).align_to(P(1.4, 0), LEFT)
        self.au_mot("une de 1 litre")
        ea = contenance(a, "1 L", audit=False)
        self.play(FadeIn(a, shift=UP * 0.2), FadeIn(l1, shift=UP * 0.1), FadeIn(ea), run_time=0.4)
        l2 = self.ligne([("et une de", WHITE), ("75 cL.", JAUNE_TITRE)], 34, buff=0.2)
        l2.next_to(l1, DOWN, buff=0.2).align_to(l1, LEFT)
        self.au_mot("une de 75 centilitres")
        eb = contenance(b, "75 cL", audit=False)
        self.play(FadeIn(b, shift=UP * 0.2), FadeIn(l2, shift=UP * 0.1), FadeIn(eb), run_time=0.4)
        self.au_mot("veut la plus grande")
        l3 = self.bloc(["Un client veut", "la plus grande."], 32)
        l3.next_to(l2, DOWN, buff=0.45).align_to(l1, LEFT)
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.4)
        self.au_mot("Laquelle lui donner")
        q = self.t("Laquelle lui donner ?", 38, JAUNE_TITRE).move_to(P(-0.2, -2.55))
        self.play(FadeIn(q, shift=UP * 0.15), Wiggle(VGroup(a, b)), run_time=0.5)
        self.attendre_voix()

    # ── 02 : la contenance, les unités ──────────────────────────────────────
    def ecran_contenance(self):
        self.ecran("02-contenance")
        r = vider(bouteille(100, EAU, 1.1).move_to(P(-3.6, 0.0)))
        self.add(r)
        self.au_mot("La contenance")
        l0 = self.t("La contenance :", 38, JAUNE_TITRE)
        self.col(l0, 2.4)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.35)
        self.au_mot("récipient peut contenir")
        l1 = self.bloc(["ce qu'un récipient", "peut contenir"], 34)
        self.col(l1, 1.45)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.35)
        self.au_mot("quand il est plein")
        l2 = self.t("quand il est plein.", 34, EAU)
        self.col(l2, 0.55)
        self.play(FadeIn(l2, shift=UP * 0.1), remplir(r, 1.2), run_time=1.2)
        self.au_mot("On la mesure")
        l3 = self.t("On la mesure en :", 32, GRAY_B)
        self.col(l3, -0.3)
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.3)
        unites = [("litres", "L"), ("centilitres", "cL"), ("millilitres", "mL")]
        for k, (mot, u) in enumerate(unites):
            l = self.ligne([(mot, WHITE), ("→", GRAY_B), (u, VERT_OK)], 34, buff=0.25)
            self.col(l, -1.05 - 0.65 * k)
            self.au_mot(mot)
            self.play(FadeIn(l, shift=UP * 0.1), run_time=0.3)
        self.attendre_voix()

    # ── 03 : même unité ─────────────────────────────────────────────────────
    def ecran_meme_unite(self):
        self.ecran("03-meme-unite")
        a, b = bouteille(75), bouteille(50, "#facc15")
        g = rangee_recipients([a, b], 0.9).move_to(P(-3.5, 0.2))
        self.au_mot("la même unité")
        l0 = self.t("Même unité : c'est facile !", 34, JAUNE_TITRE)
        self.col(l0, 2.4)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.35)
        self.au_mot("bouteille de 75")
        self.play(FadeIn(a, shift=UP * 0.2), FadeIn(contenance(a, "75 cL", audit=True)), run_time=0.35)
        self.au_mot("autre de 50")
        self.play(FadeIn(b, shift=UP * 0.2), FadeIn(contenance(b, "50 cL", audit=True)), run_time=0.35)
        l1 = self.ligne([("75", BLEU_D), ("est plus grand que", WHITE), ("50", BLEU_D)], 36, buff=0.2)
        self.col(l1, 1.1)
        self.au_mot("centilitres : 75")
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.2)
        self.au_mot("est plus grand")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.2)
        self.au_mot("que 50")
        self.play(FadeIn(l1[2], shift=UP * 0.1), run_time=0.25)
        self.au_mot("La bouteille de 75")
        l2 = self.ligne([("La bouteille de", WHITE), ("75 cL", VERT_OK)], 34, buff=0.2)
        self.col(l2, -0.1)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.3)
        self.au_mot("contient le plus")
        res = self.gros("contient le plus.", fs=46)
        self.col(res, -1.0)
        self.play(FadeIn(res, scale=1.2), Indicate(a, color=VERT_OK, scale_factor=1.08), run_time=0.5)
        self.attendre_voix()

    # ── 04 : deux unités : on convertit d'abord ─────────────────────────────
    def ecran_convertir(self):
        self.ecran("04-convertir")
        a, b = bouteille(100), bouteille(75)
        g = rangee_recipients([a, b], 0.8).move_to(P(-3.6, 0.5))
        ea, eb = contenance(a, "1 L"), contenance(b, "75 cL")
        self.add(g, ea, eb)
        XP = 0.2
        self.au_mot("deux unités différentes")
        l0 = self.t("Deux unités différentes :", 34, JAUNE_TITRE)
        self.col(l0, 2.5, XP)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.3)
        self.au_mot("d'abord la même unité")
        l1 = self.t("d'abord la même unité.", 34, ORANGE_RETENUE)
        self.col(l1, 1.85, XP)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.3)
        l2 = self.ligne([("1 L", BLEU_D), ("= 100 cL", VERT_OK)], 44, buff=0.3)
        self.col(l2, 1.05, XP)
        self.au_mot("1 litre, c'est")
        self.play(FadeIn(l2[0], shift=UP * 0.1), Indicate(ea, color=JAUNE_TITRE), run_time=0.3)
        self.au_mot("c'est 100")
        e100 = hors_audit(Text("100 cL", font_size=28, color=VERT_OK, weight=BOLD).move_to(ea))
        self.play(FadeIn(l2[1], shift=UP * 0.1), Transform(ea, e100), run_time=0.45)
        l3 = self.ligne([("On compare", WHITE), ("100 cL", BLEU_D), ("et", WHITE), ("75 cL", BLEU_D)], 32, buff=0.18)
        self.col(l3, 0.25, XP)
        self.au_mot("On compare")
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.2)
        self.au_mot("compare 100")
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.2)
        self.au_mot("et 75")
        self.play(FadeIn(l3[2], shift=UP * 0.1), FadeIn(l3[3], shift=UP * 0.1), run_time=0.2)
        self.au_mot("100 est plus grand")
        l4 = self.ligne([("100", VERT_OK), ("est plus grand.", WHITE)], 34, buff=0.2)
        self.col(l4, -0.45, XP)
        self.play(FadeIn(l4, shift=UP * 0.1), run_time=0.3)
        self.au_mot("bouteille de 1 litre")
        res = self.ligne([("1 L", VERT_OK), ("contient le plus", VERT_OK)], 42, buff=0.25)
        self.col(res, -1.3, XP)
        self.play(FadeIn(res[0], scale=1.2), run_time=0.25)
        self.au_mot("contient le plus")
        self.play(FadeIn(res[1], scale=1.1), Indicate(a, color=VERT_OK, scale_factor=1.08), run_time=0.45)
        self.au_mot("la donne au client")
        cli = self.t("Inès la donne au client.", 30, GRAY_B)
        self.col(cli, -2.05, XP)
        self.play(FadeIn(cli, shift=UP * 0.1), a.animate.shift(RIGHT * 0.15), run_time=0.35)
        l5 = self.ligne([("Et", WHITE), ("1 L", BLEU_D), ("= 1000 mL", VERT_OK)], 36, buff=0.22)
        l5.move_to(P(-3.6, -2.75))
        self.au_mot("Et 1 litre")
        self.play(FadeIn(l5[0], shift=UP * 0.1), FadeIn(l5[1], shift=UP * 0.1), run_time=0.25)
        self.au_mot("aussi 1000")
        self.play(FadeIn(l5[2], shift=UP * 0.1), run_time=0.3)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (réponse C) ─────────────────────────────────────────
    def figure_q1(self):
        pi = recipient("pichet", 1.9, 1.0, 0.85, JUS)
        ca = recipient("carafe", 1.45, 0.8, 0.85, EAU)
        return rangee_recipients([pi, ca], 0.75).move_to(P(-3.8, 1.5))

    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        g = self.figure_q1()

        def autres_q(sc):
            sc.play(FadeIn(g), run_time=0.35)

        def apres(sc):
            sc.play(Indicate(g[0], color=VERT_OK, scale_factor=1.06), run_time=0.2)

        self.question_gauche("05-question", "05b-reponse",
                             ["Qu'est-ce qui contient le plus :", "un pichet de 2 L,", "ou une carafe de 150 cL ?"],
                             [self.choix("la carafe"), self.choix("c'est pareil"), self.choix("le pichet")], 2,
                             ["2 L = 200 cL.", "200 est plus grand que 150 :", "le pichet contient le plus."],
                             -0.75, mot_q="Qu'est-ce qui contient", autres_q=autres_q, autres_r=apres)

    # ── 06 : le piège (75 > 1, mais 75 cL < 1 L) ────────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        self.au_mot("Attention")
        XP = 0.35
        tit = self.t("Attention au piège !", 46, ROUGE_ERREUR)
        gauche(tit, -6.2, 3.05)
        self.play(Write(tit), run_time=0.35)
        g = self.deux_bouteilles(P(-3.6, 0.0), 1.0)
        a, b = g
        self.add(g, contenance(a, "1 L"), contenance(b, "75 cL"))
        l0 = self.ligne([("75", ROUGE_ERREUR), ("est plus grand que", WHITE), ("1,", ROUGE_ERREUR)], 34, buff=0.2)
        self.col(l0, 2.1, XP)
        self.au_mot("piège ! 75")
        self.play(FadeIn(l0[0], shift=UP * 0.1), run_time=0.2)
        self.au_mot("est plus grand")
        self.play(FadeIn(l0[1], shift=UP * 0.1), run_time=0.2)
        self.au_mot("que 1")
        self.play(FadeIn(l0[2], shift=UP * 0.1), run_time=0.2)
        self.au_mot("mais 75 centilitres")
        l1 = self.ligne([("mais", WHITE), ("75 cL,", ROUGE_ERREUR)], 34, buff=0.2)
        self.col(l1, 1.3, XP)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.3)
        self.au_mot("pas plus que 1 litre")
        l2 = self.ligne([("ce n'est pas plus que", WHITE), ("1 L !", VERT_OK)], 34, buff=0.2)
        self.col(l2, 0.6, XP)
        self.play(FadeIn(l2, shift=UP * 0.1), Indicate(a, color=VERT_OK, scale_factor=1.06), run_time=0.4)
        self.au_mot("Regarde toujours les unités")
        l3 = self.t("Regarde toujours les unités :", 34, JAUNE_TITRE)
        self.col(l3, -0.35, XP)
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.3)
        l4 = self.ligne([("1 L", BLEU_D), ("= 100 cL", VERT_OK)], 46, buff=0.3)
        self.col(l4, -1.3, XP)
        self.au_mot("1 litre, c'est")
        self.play(FadeIn(l4[0], shift=UP * 0.1), run_time=0.25)
        self.au_mot("c'est 100")
        self.play(FadeIn(l4[1], shift=UP * 0.1), run_time=0.3)
        self.insister(l4, 1.12, 0.25)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (réponse A) ─────────────────────────────────────────
    def figure_q2(self):
        rs = [bouteille(100, JUS, 0.6), bouteille(90, "#facc15", 0.6), bouteille(120, "#f472b6", 0.6)]
        return rangee_recipients(rs, 0.5).scale(0.95).move_to(P(-3.8, 1.45))

    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        g = self.figure_q2()

        def autres_q(sc):
            sc.play(FadeIn(g), run_time=0.35)

        def apres(sc):
            sc.play(Indicate(g[2], color=VERT_OK, scale_factor=1.06), run_time=0.2)

        self.question_gauche("07-question", "07b-reponse",
                             ["Trois bouteilles : 1 L,", "90 cL et 120 cL.", "Laquelle contient le plus ?"],
                             [self.choix("120 cL"), self.choix("1 L"), self.choix("90 cL")], 0,
                             ["1 L = 100 cL.", "120 est plus grand", "que 100 et que 90 :", "la bouteille de 120 cL",
                              "contient le plus."],
                             -0.75, couper={1: ("120", "est plus grand"), 3: ("la bouteille de", "120 cL")},
                             mot_q="Trois bouteilles", autres_q=autres_q, autres_r=apres)

    # ── 08 : le défi (ranger 4 récipients) ──────────────────────────────────
    def quatre(self):
        """Le bidon (2 L), le verre (200 mL), la bouteille (1 L), la gourde (1500 mL), dans l'ordre de la voix."""
        bi = recipient("bidon", 2.6, 1.2, 0.85, EAU)
        ve = recipient("verre", 0.75, 0.6, 0.8, JUS)
        bo = bouteille(100, JUS, 0.75)
        go = recipient("gourde", 2.0, 0.9, 0.85, "#a78bfa")
        return VGroup(bi, ve, bo, go)

    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        q4 = self.quatre()
        rangee_recipients(q4, 0.85).scale(0.75).move_to(P(-3.0, 0.6))
        l0 = self.t("Inès range quatre récipients,", 30)
        self.col(l0, 2.2, 0.6)
        l1 = self.ligne([("du plus petit", JAUNE_TITRE), ("au plus grand :", JAUNE_TITRE)], 30, buff=0.18)
        self.col(l1, 1.55, 0.6)
        self.au_mot("Inès range")
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.3)
        self.au_mot("du plus petit")
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.2)
        self.au_mot("au plus grand")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.2)
        textes = [("bidon de 2", "2 L"), ("verre de 200", "200 mL"), ("bouteille de 1", "1 L"),
                  ("gourde de 1500", "1500 mL")]
        for k, (mot, s) in enumerate(textes):
            self.au_mot(mot)
            self.play(FadeIn(q4[k], shift=UP * 0.2), FadeIn(contenance(q4[k], s, 22, audit=True)), run_time=0.3)
        self.au_mot("Dans quel ordre")
        q = self.t("Dans quel ordre ?", 40, JAUNE_TITRE)
        self.col(q, 0.3, 0.6)
        self.play(FadeIn(q, shift=UP * 0.1), Wiggle(q4), run_time=0.5)
        self.pause_defi(y=-0.9)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        q4 = self.quatre()
        rangee_recipients(q4, 0.85).scale(0.75).move_to(P(-3.0, 0.9))
        ets = [contenance(r, s, 22) for r, s in zip(q4, ["2 L", "200 mL", "1 L", "1500 mL"])]
        self.add(q4, *ets)
        self.au_mot("tout en millilitres")
        l0 = self.t("On met tout en mL.", 34, ORANGE_RETENUE)
        self.col(l0, 2.3, 0.6)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.3)
        l1 = self.ligne([("1 L", BLEU_D), ("= 1000 mL", VERT_OK)], 38, buff=0.25)
        self.col(l1, 1.55, 0.6)
        self.au_mot("1 litre, 1000")
        self.play(FadeIn(l1, shift=UP * 0.1),
                  Transform(ets[2], hors_audit(Text("1000 mL", font_size=22, color=VERT_OK, weight=BOLD)
                                               .move_to(ets[2]))), run_time=0.4)
        l2 = self.ligne([("2 L", BLEU_D), ("= 2000 mL", VERT_OK)], 38, buff=0.25)
        self.col(l2, 0.85, 0.6)
        self.au_mot("2 litres, 2000")
        self.play(FadeIn(l2, shift=UP * 0.1),
                  Transform(ets[0], hors_audit(Text("2000 mL", font_size=22, color=VERT_OK, weight=BOLD)
                                               .move_to(ets[0]))), run_time=0.4)
        self.au_mot("plus petit au plus grand")
        # le nouvel ordre : verre, bouteille, gourde, bidon
        ordre = [1, 2, 3, 0]
        cible = VGroup(*[VGroup(q4[i], ets[i]).copy() for i in ordre]).arrange(RIGHT, buff=0.35, aligned_edge=DOWN)
        cible.move_to(P(0, -1.55))
        self.play(*[Transform(VGroup(q4[i], ets[i]), cible[k]) for k, i in enumerate(ordre)], run_time=1.0)
        noms = [("le verre, 200", "200"), ("la bouteille, 1000", "1000"), ("la gourde, 1500", "1500"),
                ("le bidon, 2000", "2000")]
        for k, (mot, s) in enumerate(noms):
            self.au_mot(mot)
            n = hors_audit(Text(str(k + 1), font_size=30, color=JAUNE_TITRE, weight=BOLD)
                           .next_to(cible[k], UP, buff=0.15))
            self.play(FadeIn(n, scale=1.4), Indicate(cible[k][0], color=VERT_OK, scale_factor=1.05), run_time=0.3)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        fig = self.deux_bouteilles(P(0, 0), 0.8)
        lignes = self.finale_gauche(fig, textes=[
            ("Pour comparer : d'abord", "la même unité."),
            ("1 L = 100 cL", "= 1000 mL."),
            ("Puis on compare", "les nombres.")], fs=32)
        self.add(fig)
        self.au_mot("Pour comparer")
        self.montrer_ligne(lignes[0], Indicate(fig, scale_factor=1.05))
        self.au_mot("1 litre")
        self.montrer_ligne(lignes[1])
        self.au_mot("Puis on compare")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_contenance()
        self.ecran_meme_unite()
        self.ecran_convertir()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")


class ContenanceComparerCM1(ContenanceComparerBase):
    identite = "Maths CM1 — EleveAI"
    ceinture = "jaune"
