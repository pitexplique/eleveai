# contenance_unites.py
# EleveAI — Maths CE2 — série « Contenance », épisode 01 : LES UNITÉS L, dL, cL
# (micro ce2_contenance_unites, notion contenance), AVEC VOIX. Paysage 16:9, CEINTURE BLANCHE.
# Short jumeau : film Ti Margo (« La limonade à la règle », réponse B).
# Décor et métier : Lucas, CHEF CUISINIER (centre : cuisine).
# Mapping micro → écrans : 02 (la contenance, le litre et non le mètre), 03 (le litre, L),
# 04 (dL : déci = dix ; cL : centi = cent), 06 (ranger cL < dL < L), 07 (piège : cL n'est pas cm),
# questions 05 (ce que mesure un litre, A) et 08 (75 cL sur le sirop, C), défi 09 (marmite, verre, cuillère).
# Voix : manim/voix/ce2-contenance-unites.json (validée le 14/11, Julie, débit −6) ;
# marques : contenance_unites_marques.json (python manim/scripts/ce2/perimetre_marques.py contenance:unites).
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/ce2/contenance_unites.py ContenanceUnitesCE2
# python -m manim render -qh --disable_caching manim/scripts/ce2/contenance_unites.py ContenanceUnitesCE2 -o eleveai-maths-ce2-contenance-unites --media_dir manim/scripts/ce2/media-cont-01
# Sortie : manim/sorties/ce2/maths/contenance/01-unites/eleveai-maths-ce2-contenance-unites.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from contenance_ce2_commun import *  # noqa: E402,F403

H_L = 2.0  # hauteur du corps d'une bouteille de 1 L


def bouteille(cl, couleur=EAU, larg=0.85):
    return recipient("bouteille", H_L * cl / 100, larg, 0.85, couleur)


class ContenanceUnitesBase(PaysageContenanceCE2):
    nom_voix = "ce2-contenance-unites"
    fichier_marques = "contenance_unites_marques.json"
    ceinture = "blanche"

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Les unités de contenance", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Les unités de contenance")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q = self.bloc(["Avec quoi mesure-t-on", "ce que contient", "une bouteille ?"], 38, JAUNE_TITRE, buff=0.22)
        q.move_to(P(0, 0.3)).align_to(P(-6.2, 0), LEFT)
        b = bouteille(100).scale(0.95).move_to(P(3.9, 0.35))
        self.au_mot("Avec quoi mesure-t-on")
        self.play(FadeIn(q[0], shift=UP * 0.2), FadeIn(b, scale=1.1), run_time=0.35)
        self.au_mot("ce que contient")
        self.play(FadeIn(q[1], shift=UP * 0.2), run_time=0.3)
        self.au_mot("une bouteille")
        self.play(FadeIn(q[2], shift=UP * 0.2), Wiggle(b), run_time=0.5)
        self.attendre_voix(marge=0.6)

    # ── 01 : Lucas, chef cuisinier ──────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pe = lucas(0.95).move_to(P(-5.0, 0.2))
        self.au_mot("Voici Lucas")
        nom = self.t("Lucas", 42, JAUNE_TITRE).next_to(pe, UP, buff=0.55)
        self.play(FadeIn(pe, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("chef cuisinier")
        met = self.t("chef cuisinier", 26, JUS).next_to(pe, DOWN, buff=0.12)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.35)
        ma = vider(marmite().move_to(P(-2.0, -1.2)))
        self.au_mot("Pour sa soupe")
        l0 = self.t("Pour sa soupe, il verse :", 34)
        self.col(l0, 2.3, 0.3)
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(ma, shift=UP * 0.2), run_time=0.4)
        trois = [("de l'eau", EAU), ("du lait", LAIT), ("de la crème", CREME)]
        rs = VGroup()
        for k, (mot, c) in enumerate(trois):
            r = bouteille(45, c, 0.55).move_to(P(-2.9 + 0.9 * k, 1.1))
            rs.add(r)
            lg = self.t(mot, 32, c)
            self.col(lg, 1.6 - 0.6 * k, 0.6)
            self.au_mot(mot)
            self.play(FadeIn(lg, shift=UP * 0.1), FadeIn(r, shift=DOWN * 0.2), run_time=0.3)
        self.play(remplir(ma, 0.8))
        self.au_mot("il mesure")
        l4 = self.t("Pour ne pas se tromper, il mesure.", 30, GRAY_B)
        self.col(l4, -0.4, 0.3)
        self.play(FadeIn(l4, shift=UP * 0.1), run_time=0.35)
        self.au_mot("quelle unité")
        q = self.t("Mais avec quelle unité ?", 40, JAUNE_TITRE)
        self.col(q, -1.4, 0.3)
        self.play(FadeIn(q, scale=1.1), Wiggle(ma), run_time=0.5)
        self.attendre_voix()

    # ── 02 : la contenance ; un litre, pas un mètre ─────────────────────────
    def ecran_contenance(self):
        self.ecran("02-contenance")
        r = vider(bouteille(100, EAU, 1.1).move_to(P(-4.0, 0.2)))
        self.add(r)
        self.au_mot("La contenance")
        l0 = self.t("La contenance :", 38, JAUNE_TITRE)
        self.col(l0, 2.5, -2.4)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.35)
        self.au_mot("récipient peut contenir")
        l1 = self.bloc(["la quantité de liquide", "qu'un récipient peut contenir"], 32)
        self.col(l1, 1.55, -2.4)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.35)
        self.au_mot("quand il est plein")
        l2 = self.t("quand il est plein.", 32, EAU)
        self.col(l2, 0.6, -2.4)
        self.play(FadeIn(l2, shift=UP * 0.1), remplir(r, 1.2), run_time=1.2)
        self.au_mot("Une longueur")
        l3 = self.ligne([("Une longueur", WHITE), ("→", GRAY_B), ("en mètres (m)", GRAY_B)], 30, buff=0.22)
        self.col(l3, -0.5, -2.4)
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("en mètres")
        self.play(FadeIn(l3[1:], shift=UP * 0.1), run_time=0.3)
        self.au_mot("Une contenance")
        l4 = self.ligne([("Une contenance", WHITE), ("→", GRAY_B), ("en litres (L)", VERT_OK)], 32, buff=0.22)
        self.col(l4, -1.4, -2.4)
        self.play(FadeIn(l4[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("en litres")
        self.play(FadeIn(l4[1:], shift=UP * 0.1), Indicate(r, color=VERT_OK, scale_factor=1.05), run_time=0.45)
        self.insister(l4[2], 1.15, 0.25)
        self.attendre_voix()

    # ── 03 : le litre, un grand L ───────────────────────────────────────────
    def ecran_litre(self):
        self.ecran("03-litre")
        self.au_mot("Le litre")
        l0 = self.ligne([("Le litre", JAUNE_TITRE), ("s'écrit", WHITE)], 40, buff=0.25)
        gauche(l0, -6.2, 2.7)
        self.play(FadeIn(l0[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("grand L")
        L = self.t("L", 120, VERT_OK).next_to(l0, RIGHT, buff=0.35)
        self.play(FadeIn(l0[1], shift=UP * 0.1), GrowFromCenter(L), run_time=0.5)
        b = bouteille(100)
        b.move_to(P(-3.3, -0.4))
        ma = marmite(2.6, 1.6, 0.8, EAU).move_to(P(2.2, -0.8))
        self.au_mot("Cette bouteille")
        self.play(FadeIn(b, shift=UP * 0.2), run_time=0.35)
        self.au_mot("contient 1 litre")
        eb = contenance(b, "1 L", 34, audit=True)
        self.play(FadeIn(eb, scale=1.2), run_time=0.3)
        self.au_mot("La grande marmite")
        self.play(FadeIn(ma, shift=UP * 0.2), run_time=0.35)
        self.au_mot("contient 5 litres")
        em = contenance(ma, "5 L", 34, audit=True)
        self.play(FadeIn(em, scale=1.2), Indicate(ma, scale_factor=1.04), run_time=0.4)
        self.attendre_voix()

    # ── 04 : décilitre et centilitre ────────────────────────────────────────
    def ecran_dl_cl(self):
        self.ecran("04-dl-cl")
        self.au_mot("Pour les petites quantités")
        l0 = self.t("Pour les petites quantités, on partage le litre.", 32, JAUNE_TITRE)
        gauche(l0, -6.2, 2.9)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.4)
        XP = -6.0
        self.au_mot("Le décilitre")
        d0 = self.ligne([("le décilitre", WHITE), ("→", GRAY_B), ("dL", VERT_OK)], 38, buff=0.25)
        gauche(d0, XP, 1.8)
        self.play(FadeIn(d0, shift=UP * 0.1), run_time=0.3)
        self.au_mot("déci veut dire dix")
        d1 = self.t("« déci » veut dire dix", 30, ORANGE_RETENUE)
        gauche(d1, XP + 0.3, 1.15)
        self.play(FadeIn(d1, shift=UP * 0.1), run_time=0.3)
        self.au_mot("Le centilitre")
        c0 = self.ligne([("le centilitre", WHITE), ("→", GRAY_B), ("cL", VERT_OK)], 38, buff=0.25)
        gauche(c0, XP, 0.2)
        self.play(FadeIn(c0, shift=UP * 0.1), run_time=0.3)
        self.au_mot("centi veut dire cent")
        c1 = self.t("« centi » veut dire cent", 30, ORANGE_RETENUE)
        gauche(c1, XP + 0.3, -0.45)
        self.play(FadeIn(c1, shift=UP * 0.1), run_time=0.3)
        ve = recipient("verre", 1.1, 0.85, 0.8, LAIT).move_to(P(2.6, 0.7))
        cu = cuillere(1.3).move_to(P(4.8, 0.6))
        self.au_mot("Le petit verre")
        self.play(FadeIn(ve, shift=UP * 0.2), run_time=0.3)
        self.au_mot("contient 1 décilitre")
        ev = contenance(ve, "1 dL", 32, audit=True)
        self.play(FadeIn(ev, scale=1.2), Indicate(d0[2]), run_time=0.4)
        self.au_mot("Une grosse cuillère")
        self.play(FadeIn(cu, shift=UP * 0.2), run_time=0.3)
        self.au_mot("environ 1 centilitre")
        ec = contenance(cu, "≈ 1 cL", 32, audit=True)
        self.play(FadeIn(ec, scale=1.2), Indicate(c0[2]), run_time=0.4)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (réponse A) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        g = bouteille(100, JUS).scale(0.85).move_to(P(-3.8, 1.5))

        def autres_q(sc):
            sc.play(FadeIn(g), run_time=0.35)

        def apres(sc):
            sc.play(Indicate(g, color=VERT_OK, scale_factor=1.06), run_time=0.2)

        self.question_gauche("05-question", "05b-reponse",
                             ["Que mesure-t-on", "avec un litre ?"],
                             [self.choix("ce qu'un récipient" + chr(10) + "peut contenir"),
                              self.choix("la longueur d'un objet"), self.choix("la masse d'un objet")], 0,
                             ["Le litre mesure", "une contenance.", "Longueur : en mètres.", "Masse : en grammes."],
                             -0.75, mot_q="Que mesure-t-on", autres_q=autres_q, autres_r=apres)

    # ── 06 : ranger cL < dL < L ─────────────────────────────────────────────
    def ecran_ranger(self):
        self.ecran("06-ranger")
        self.au_mot("On range les trois unités")
        l0 = self.t("On range les trois unités :", 38, JAUNE_TITRE)
        gauche(l0, -6.2, 2.8)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.35)
        self.au_mot("de la plus petite à la plus grande")
        l1 = self.t("de la plus petite à la plus grande", 32, GRAY_B)
        gauche(l1, -6.2, 2.1)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.35)
        objets = [cuillere(1.2), recipient("verre", 1.1, 0.85, 0.8, LAIT), bouteille(100)]
        noms = [("le centilitre", "cL"), ("le décilitre", "dL"), ("le litre", "L")]
        xs = [-4.2, -0.6, 3.2]
        prec = None
        for k, (o, (mot, u)) in enumerate(zip(objets, noms)):
            o.move_to(P(xs[k], 0.0))
            if k < 2:
                o.align_to(P(0, -0.9), DOWN)
            else:
                o.align_to(P(0, -0.9), DOWN)
            u_t = self.t(u, 54, VERT_OK).move_to(P(xs[k], -1.7))
            self.au_mot(mot)
            anims = [FadeIn(o, shift=UP * 0.2), FadeIn(u_t, scale=1.2)]
            if prec is not None:
                fl = self.t("<", 60, ORANGE_RETENUE).move_to(P((xs[k] + xs[k - 1]) / 2, -1.7))
                anims.append(FadeIn(fl))
            self.play(*anims, run_time=0.35)
            prec = u_t
        self.au_mot("Plus on partage le litre")
        l2 = self.t("Plus on partage le litre,", 32)
        gauche(l2, -6.2, -2.6)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.3)
        self.au_mot("plus la part est petite")
        l3 = self.t("plus la part est petite.", 32, ORANGE_RETENUE).next_to(l2, RIGHT, buff=0.2)
        self.play(FadeIn(l3, shift=UP * 0.1), Indicate(objets[0], scale_factor=1.15), run_time=0.45)
        self.attendre_voix()

    # ── 07 : le piège : cL n'est pas cm ─────────────────────────────────────
    def ecran_piege(self):
        self.ecran("07-piege")
        self.au_mot("Attention")
        tit = self.t("Attention au piège !", 46, ROUGE_ERREUR)
        gauche(tit, -6.2, 3.0)
        self.play(Write(tit), run_time=0.35)
        self.au_mot("ne veulent pas dire centimètre")
        f0 = self.ligne([("cL", ROUGE_ERREUR), ("n'est pas", WHITE), ("centimètre", ROUGE_ERREUR)], 40, buff=0.25)
        gauche(f0, -6.0, 1.9)
        barre = Line(f0[2].get_left(), f0[2].get_right(), color=ROUGE_ERREUR, stroke_width=6)
        self.play(FadeIn(f0, shift=UP * 0.1), run_time=0.35)
        self.play(Create(barre), run_time=0.3)
        self.au_mot("C'est la dernière lettre")
        l1 = self.t("La dernière lettre dit ce qu'on mesure :", 32, JAUNE_TITRE)
        gauche(l1, -6.0, 0.9)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.35)
        regle = VGroup(Rectangle(width=2.6, height=0.45, fill_color="#fde047", fill_opacity=1, stroke_width=0),
                       *[Line(P(-1.2 + 0.24 * i, 0.22), P(-1.2 + 0.24 * i, 0.1 if i % 2 else 0.02), color="#1f2937",
                              stroke_width=2) for i in range(11)]).move_to(P(3.6, 0.0))
        self.au_mot("m pour les mètres")
        m1 = self.ligne([("cm", WHITE), ("→ le m :", GRAY_B), ("des mètres", WHITE)], 34, buff=0.2)
        gauche(m1, -5.6, 0.05)
        self.play(FadeIn(m1, shift=UP * 0.1), FadeIn(regle, shift=LEFT * 0.2), run_time=0.35)
        b = bouteille(70, SIROP, 0.7).move_to(P(3.6, -1.6))
        self.au_mot("L pour les litres")
        m2 = self.ligne([("cL", WHITE), ("→ le L :", GRAY_B), ("des litres", VERT_OK)], 34, buff=0.2)
        gauche(m2, -5.6, -0.8)
        self.play(FadeIn(m2, shift=UP * 0.1), FadeIn(b, shift=LEFT * 0.2), run_time=0.35)
        self.au_mot("c'est le centilitre")
        res = self.ligne([("cL", VERT_OK), ("= le centilitre", VERT_OK)], 46, buff=0.25)
        gauche(res, -5.6, -2.0)
        self.play(FadeIn(res, scale=1.15), run_time=0.4)
        self.insister(res, 1.1, 0.25)
        self.attendre_voix()

    # ── 08 : QUESTION 2 (réponse C) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        b = bouteille(75, SIROP, 0.85).move_to(P(-3.8, 1.55))
        et = contenance(b, "75 cL", 30)

        def autres_q(sc):
            sc.play(FadeIn(b), run_time=0.3)

        def apres(sc):
            sc.play(FadeIn(et, scale=1.2), run_time=0.2)

        self.question_gauche("08-question", "08b-reponse",
                             ["Sur une bouteille de sirop,", "on lit 75,", "puis c et L.", "Que veulent-elles dire ?"],
                             [self.choix("centimètre"), self.choix("décilitre"), self.choix("centilitre")], 2,
                             ["Le L dit litre,", "le c dit centi :", "c'est le centilitre.",
                              "La bouteille contient", "75 cL de sirop."],
                             -0.75, couper={4: ("75 cL", "de sirop.")}, mot_q="Sur une bouteille", autres_q=autres_q, autres_r=apres)

    # ── 09 : le défi (marmite, verre, cuillère) ─────────────────────────────
    def trois(self):
        ma = marmite(2.0, 1.25, 0.75)
        ve = recipient("verre", 1.1, 0.85, 0.8, LAIT)
        cu = cuillere(1.3)
        g = VGroup(ma, ve, cu).arrange(RIGHT, buff=1.0, aligned_edge=DOWN).move_to(P(-1.2, -0.2))
        return g

    def ecran_defi(self):
        self.ecran("09-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        g = self.trois()
        self.au_mot("trois récipients")
        l0 = self.t("Lucas a trois récipients :", 32)
        gauche(l0, -6.2, 2.3)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.3)
        for k, mot in enumerate(["une marmite", "un verre", "une cuillère"]):
            self.au_mot(mot)
            self.play(FadeIn(g[k], shift=UP * 0.2), run_time=0.3)
        self.au_mot("Quelle unité pour chacun")
        q = self.t("Quelle unité pour chacun ?", 36, JAUNE_TITRE)
        gauche(q, -6.2, -1.6)
        self.play(FadeIn(q, shift=UP * 0.1), run_time=0.3)
        u = self.ligne([("L", VERT_OK), ("dL", VERT_OK), ("cL", VERT_OK)], 44, buff=0.7)
        u.next_to(q, RIGHT, buff=0.6)
        for k, mot in enumerate(["le litre", "le décilitre", "le centilitre"]):
            self.au_mot(mot)
            self.play(FadeIn(u[k], scale=1.2), run_time=0.25)
        self.play(Wiggle(g), run_time=0.5)
        self.pause_defi(y=-2.6)

    def ecran_correction(self):
        self.ecran("09b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        g = self.trois().shift(UP * 0.6)
        self.add(g)
        rep = [("La marmite contient beaucoup", "des litres", "L", 0),
               ("Le verre", "quelques décilitres", "dL", 1),
               ("La cuillère", "des centilitres", "cL", 2)]
        for k, (m1, m2, u, i) in enumerate(rep):
            self.au_mot(m1)
            self.play(Indicate(g[i], scale_factor=1.06), run_time=0.3)
            self.au_mot(m2)
            e = self.t(u, 48, VERT_OK).next_to(g[i], DOWN, buff=0.3)
            self.play(FadeIn(e, scale=1.3), run_time=0.3)
        self.au_mot("Une grande quantité")
        l = self.t("Une grande quantité, une grande unité.", 36, JAUNE_TITRE).move_to(P(-0.6, -2.4))
        self.play(FadeIn(l, shift=UP * 0.1), run_time=0.4)
        self.attendre_voix()

    # ── 10 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("10-finale", 0.65)
        fig = VGroup(cuillere(0.9), recipient("verre", 0.9, 0.7, 0.8, LAIT), bouteille(80)) \
            .arrange(RIGHT, buff=0.35, aligned_edge=DOWN)
        lignes = self.finale_gauche(fig, textes=[
            ("La contenance se mesure", "en L, en dL et en cL."),
            ("Le litre est la plus grande,", "le centilitre la plus petite."),
            ("Le grand L", "veut dire litre.")], fs=32)
        self.add(fig)
        self.au_mot("La contenance se mesure")
        self.montrer_ligne(lignes[0], Indicate(fig, scale_factor=1.05))
        self.au_mot("Le litre est la plus grande")
        self.montrer_ligne(lignes[1])
        self.au_mot("Le grand L")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_contenance()
        self.ecran_litre()
        self.ecran_dl_cl()
        self.ecran_question1()
        self.ecran_ranger()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("11-abonne")


class ContenanceUnitesCE2(ContenanceUnitesBase):
    identite = "Maths CE2 — EleveAI"
    ceinture = "blanche"
