# longueur_comparer.py
# EleveAI — Maths CM1 — série « Longueurs », épisode 01 : COMPARER DES LONGUEURS
# (micro longueur_comparer, notion longueur), AVEC VOIX. Paysage 16:9, CEINTURE JAUNE.
# Short jumeau : film Ti Margo (« Le saut en longueur » : 150 contre 2, réponse A).
# Décor et métier : Jade, COUTURIÈRE (centres : mode, art-design).
# Mapping micro → écrans : 02 (même unité : on compare les nombres), 03 (deux unités : on convertit d'abord,
# 1 m = 100 cm), 04 (1 cm = 10 mm, 1 km = 1000 m), 06 (piège : 85 cm n'est pas plus long que 1 m),
# questions 05 (ruban 2 m contre bande 180 cm, B) et 07 (le plus court de 1 m, 95 cm, 1 m 10 cm, C),
# défi 08 (ranger 4 rubans en cm).
# Voix : manim/voix/cm1-longueur-comparer.json (validée le 14/11, Julie, débit −6) ;
# marques : longueur_comparer_marques.json (python manim/scripts/cm1/aire_marques.py longueur:comparer).
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/cm1/longueur_comparer.py LongueurComparerCM1
# python -m manim render -qh --disable_caching manim/scripts/cm1/longueur_comparer.py LongueurComparerCM1 -o eleveai-maths-cm1-longueur-comparer --media_dir manim/scripts/cm1/media-longueur-01
# Sortie : manim/sorties/cm1/maths/longueur/01-comparer/eleveai-maths-cm1-longueur-comparer.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from longueur_cm1_commun import *  # noqa: E402,F403

# 1 cm de ruban = E unités Manim (1 m = 4,5 unités)
E = 0.045


class LongueurComparerBase(PaysageLongueurCM1):
    nom_voix = "cm1-longueur-comparer"
    fichier_marques = "longueur_comparer_marques.json"
    ceinture = "jaune"

    def deux_rubans(self, pos, k=1.0):
        """Le ruban de 1 m (rose) et celui de 85 cm (violet), alignés à gauche."""
        g = rubans_alignes([100, 85], [RUBAN, RUBAN2], E * k, buff=0.75 * k, ep=0.34 * k)
        return g.move_to(pos)

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Comparer des longueurs", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Comparer des longueurs")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q0 = self.ligne([("Lequel", WHITE), ("est le plus long :", WHITE)], 38, buff=0.2)
        q1 = self.ligne([("1 m", JAUNE_TITRE), ("ou 85 cm ?", JAUNE_TITRE)], 38, buff=0.2)
        q = VGroup(q0, q1).arrange(DOWN, aligned_edge=LEFT, buff=0.3)
        q.move_to(P(0, 0.3)).align_to(P(-6.2, 0), LEFT)
        g = self.deux_rubans(P(3.3, 0.35), 0.85)
        self.au_mot("Lequel")
        self.play(FadeIn(q0[0], shift=UP * 0.2), FadeIn(g, shift=RIGHT * 0.3), run_time=0.3)
        self.au_mot("est le plus long")
        self.play(FadeIn(q0[1], shift=UP * 0.2), run_time=0.3)
        self.au_mot("1 mètre")
        self.play(FadeIn(q1[0], shift=UP * 0.2), run_time=0.25)
        self.au_mot("ou 85")
        self.play(FadeIn(q1[1], shift=UP * 0.2), run_time=0.3)
        self.attendre_voix(marge=0.6)

    # ── 01 : Jade, couturière ───────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pe = jade(0.95).move_to(P(-5.0, 0.35))
        self.au_mot("Voici Jade")
        nom = self.t("Jade", 42, RUBAN).next_to(pe, UP, buff=0.2)
        self.play(FadeIn(pe, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("Elle est couturière")
        met = self.t("couturière", 26, RUBAN).next_to(pe, DOWN, buff=0.12)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.35)
        l0 = self.bloc(["Pour finir une robe,", "il lui faut le plus long", "de ses deux rubans."], 30)
        l0.move_to(P(2.6, 1.9)).align_to(P(-2.9, 0), LEFT)
        self.au_mot("finir une robe")
        self.play(FadeIn(l0[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("le plus long")
        self.play(FadeIn(l0[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("deux rubans")
        self.play(FadeIn(l0[2], shift=UP * 0.1), run_time=0.3)
        a, b = ruban(100 * E, RUBAN), ruban(85 * E, RUBAN2)
        a.move_to(P(0, -0.35)).align_to(P(-2.9, 0), LEFT)
        b.move_to(P(0, -1.2)).align_to(P(-2.9, 0), LEFT)
        self.au_mot("un de 1 mètre")
        ea = etiq(a, "1 m", audit=True)
        self.play(GrowFromEdge(a, LEFT), FadeIn(ea), run_time=0.45)
        self.au_mot("un de 85 centimètres")
        eb = etiq(b, "85 cm", audit=True)
        self.play(GrowFromEdge(b, LEFT), FadeIn(eb), run_time=0.45)
        self.au_mot("Lequel choisir")
        q = self.t("Lequel choisir ?", 40, JAUNE_TITRE).move_to(P(0.2, -2.55))
        self.play(FadeIn(q, shift=UP * 0.15), Wiggle(VGroup(a, b)), run_time=0.5)
        self.attendre_voix()

    # ── 02 : même unité ─────────────────────────────────────────────────────
    def ecran_meme_unite(self):
        self.ecran("02-meme-unite")
        a, b = ruban(85 * E, RUBAN2), ruban(60 * E, RUBAN3)
        VGroup(a, b).arrange(DOWN, buff=0.9, aligned_edge=LEFT).move_to(P(-3.7, 0.3))
        self.au_mot("la même unité")
        l0 = self.t("Même unité : c'est facile !", 34, JAUNE_TITRE)
        self.col(l0, 2.4)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.35)
        self.au_mot("ruban de 85")
        self.play(GrowFromEdge(a, LEFT), FadeIn(etiq(a, "85 cm", cote=UP, audit=True)), run_time=0.4)
        self.au_mot("autre de 60")
        self.play(GrowFromEdge(b, LEFT), FadeIn(etiq(b, "60 cm", cote=UP, audit=True)), run_time=0.2)
        l1 = self.ligne([("85", BLEU_D), ("est plus grand que", WHITE), ("60", BLEU_D)], 36, buff=0.2)
        self.col(l1, 1.1)
        self.au_mot("centimètres : 85")
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.2)
        self.au_mot("est plus grand")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.2)
        self.au_mot("que 60")
        self.play(FadeIn(l1[2], shift=UP * 0.1), run_time=0.25)
        self.au_mot("Le ruban de 85")
        l2 = self.ligne([("Le ruban de", WHITE), ("85 cm", VERT_OK)], 34, buff=0.2)
        self.col(l2, -0.1)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.3)
        self.au_mot("est le plus long")
        res = self.gros("est le plus long.", fs=46)
        self.col(res, -1.0)
        self.play(FadeIn(res, scale=1.2), Indicate(a, color=VERT_OK, scale_factor=1.06), run_time=0.5)
        self.attendre_voix()

    # ── 03 : deux unités : on convertit d'abord ─────────────────────────────
    def ecran_convertir(self):
        self.ecran("03-convertir")
        g = self.deux_rubans(P(-4.3, 0.6), 0.8)
        a, b = g
        ea, eb = etiq(a, "1 m", 30), etiq(b, "85 cm", 30)
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
        l2 = self.ligne([("1 m", BLEU_D), ("= 100 cm", VERT_OK)], 44, buff=0.3)
        self.col(l2, 1.05, XP)
        self.au_mot("1 mètre, c'est")
        self.play(FadeIn(l2[0], shift=UP * 0.1), Indicate(ea, color=JAUNE_TITRE), run_time=0.3)
        self.au_mot("c'est 100")
        e100 = hors_audit(Text("100 cm", font_size=30, color=VERT_OK, weight=BOLD).move_to(ea).align_to(ea, LEFT))
        self.play(FadeIn(l2[1], shift=UP * 0.1), Transform(ea, e100), run_time=0.45)
        l3 = self.ligne([("On compare", WHITE), ("100 cm", BLEU_D), ("et", WHITE), ("85 cm", BLEU_D)], 32, buff=0.18)
        self.col(l3, 0.25, XP)
        self.au_mot("On compare")
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.2)
        self.au_mot("compare 100")
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.2)
        self.au_mot("et 85")
        self.play(FadeIn(l3[2], shift=UP * 0.1), FadeIn(l3[3], shift=UP * 0.1), run_time=0.2)
        self.au_mot("100 est plus grand")
        l4 = self.ligne([("100", VERT_OK), ("est plus grand.", WHITE)], 34, buff=0.2)
        self.col(l4, -0.45, XP)
        self.play(FadeIn(l4, shift=UP * 0.1), run_time=0.3)
        self.au_mot("ruban de 1 mètre")
        res = self.ligne([("1 m", VERT_OK), ("est le plus long", VERT_OK)], 42, buff=0.25)
        self.col(res, -1.3, XP)
        self.play(FadeIn(res[0], scale=1.2), run_time=0.25)
        self.au_mot("est le plus long")
        self.play(FadeIn(res[1], scale=1.1), Indicate(a, color=VERT_OK, scale_factor=1.06), run_time=0.45)
        self.au_mot("Jade le prend")
        pr = self.t("Jade le prend.", 30, GRAY_B)
        self.col(pr, -2.05, XP)
        self.play(FadeIn(pr, shift=UP * 0.1), a.animate.shift(UP * 0.15), run_time=0.35)
        self.attendre_voix()

    # ── 04 : les autres égalités (mm, km) ───────────────────────────────────
    def ecran_egalites(self):
        self.ecran("04-egalites")
        self.au_mot("Retiens aussi")
        tit = self.t("Retiens aussi :", 44, JAUNE_TITRE).move_to(P(0, 2.7))
        self.play(FadeIn(tit, shift=UP * 0.15), run_time=0.35)
        # en haut : 1 cm sur la règle, découpé en 10 mm
        r = regle(4, 1.6, mm=True, h=0.8, fs=22).move_to(P(-2.4, 0.95))
        self.play(FadeIn(r), run_time=0.3)
        l1 = self.ligne([("1 cm", BLEU_D), ("= 10 mm", VERT_OK)], 44, buff=0.3)
        gauche(l1, 1.6, 0.95)
        self.au_mot("1 centimètre, c'est")
        bande = sur_regle(r, 1, 2, RUBAN3)
        self.play(FadeIn(l1[0], shift=UP * 0.1), GrowFromEdge(bande, LEFT), run_time=0.35)
        self.au_mot("c'est 10")
        self.play(FadeIn(l1[1], shift=UP * 0.1), Indicate(r.traits, color=ORANGE_RETENUE), run_time=0.45)
        # en bas : 1 km = 1000 m (une route, 10 tronçons de 100 m)
        route = VGroup(*[Rectangle(width=0.42, height=0.28, fill_color="#475569" if k % 2 else "#94a3b8",
                                   fill_opacity=1, stroke_width=0) for k in range(10)]).arrange(RIGHT, buff=0)
        route.move_to(P(-2.4, -1.25))
        l2 = self.ligne([("1 km", BLEU_D), ("= 1000 m", VERT_OK)], 44, buff=0.3)
        gauche(l2, 1.6, -1.25)
        self.au_mot("Et 1 kilomètre")
        self.play(FadeIn(l2[0], shift=UP * 0.1), GrowFromEdge(route, LEFT), run_time=0.45)
        self.au_mot("c'est 1000")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.3)
        self.insister(l2, 1.12, 0.25)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (réponse B) ─────────────────────────────────────────
    def figure_q1(self):
        g = rubans_alignes([200, 180], [RUBAN, RUBAN4], 0.021, buff=0.45, ep=0.3)
        return g.move_to(P(-3.9, 1.55))

    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        g = self.figure_q1()

        def autres_q(sc):
            sc.play(FadeIn(g), run_time=0.35)

        def apres(sc):
            sc.play(Indicate(g[0], color=VERT_OK, scale_factor=1.06), run_time=0.2)

        self.question_gauche("05-question", "05b-reponse",
                             ["Qu'est-ce qui est le plus long :", "un ruban de 2 m,", "ou une bande de 180 cm ?"],
                             [self.choix("la bande"), self.choix("le ruban"), self.choix("c'est pareil")], 1,
                             ["2 m = 200 cm.", "200 est plus grand que 180 :", "le ruban est le plus long."],
                             -0.75, mot_q="Qu'est-ce qui est", autres_q=autres_q, autres_r=apres)

    # ── 06 : le piège (85 > 1, mais 85 cm < 1 m) ────────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        self.au_mot("Attention")
        XP = 0.35
        tit = self.t("Attention au piège !", 46, ROUGE_ERREUR)
        gauche(tit, -6.2, 3.05)
        self.play(Write(tit), run_time=0.35)
        g = self.deux_rubans(P(-3.9, 0.3), 0.85)
        a, b = g
        self.add(g, etiq(a, "1 m", 30), etiq(b, "85 cm", 30))
        l0 = self.ligne([("85", ROUGE_ERREUR), ("est plus grand que", WHITE), ("1,", ROUGE_ERREUR)], 34, buff=0.2)
        self.col(l0, 2.1, XP)
        self.au_mot("piège ! 85")
        self.play(FadeIn(l0[0], shift=UP * 0.1), run_time=0.2)
        self.au_mot("est plus grand")
        self.play(FadeIn(l0[1], shift=UP * 0.1), run_time=0.2)
        self.au_mot("que 1")
        self.play(FadeIn(l0[2], shift=UP * 0.1), run_time=0.2)
        self.au_mot("mais 85 centimètres")
        l1 = self.ligne([("mais", WHITE), ("85 cm,", ROUGE_ERREUR)], 34, buff=0.2)
        self.col(l1, 1.3, XP)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.3)
        self.au_mot("plus long que 1 mètre")
        l2 = self.bloc(["ce n'est pas plus long", "que 1 m !"], 34)
        self.col(l2, 0.4, XP)
        self.play(FadeIn(l2, shift=UP * 0.1), Indicate(a, color=VERT_OK, scale_factor=1.06), run_time=0.4)
        self.au_mot("Regarde toujours les unités")
        l3 = self.t("Regarde toujours les unités :", 34, JAUNE_TITRE)
        self.col(l3, -0.6, XP)
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.3)
        l4 = self.ligne([("1 m", BLEU_D), ("= 100 cm", VERT_OK)], 46, buff=0.3)
        self.col(l4, -1.5, XP)
        self.au_mot("1 mètre, c'est")
        self.play(FadeIn(l4[0], shift=UP * 0.1), run_time=0.25)
        self.au_mot("c'est 100")
        self.play(FadeIn(l4[1], shift=UP * 0.1), run_time=0.3)
        self.insister(l4, 1.12, 0.25)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (réponse C) ─────────────────────────────────────────
    def figure_q2(self):
        g = rubans_alignes([100, 95, 110], [RUBAN, RUBAN3, RUBAN2], 0.032, buff=0.32, ep=0.26)
        return g.move_to(P(-3.9, 1.5))

    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        g = self.figure_q2()

        def autres_q(sc):
            sc.play(FadeIn(g), run_time=0.35)

        def apres(sc):
            sc.play(Indicate(g[1], color=VERT_OK, scale_factor=1.06), run_time=0.2)

        self.question_gauche("07-question", "07b-reponse",
                             ["Trois fils :", "1 m, 95 cm", "et 1 m 10 cm.", "Lequel est le plus court ?"],
                             [self.choix("1 m"), self.choix("1 m 10 cm"), self.choix("95 cm")], 2,
                             ["1 m = 100 cm.", "1 m 10 cm = 110 cm.", "95 est le plus petit :",
                              "le fil de 95 cm", "est le plus court."],
                             -0.75, couper={2: ("95", "est le plus petit :"), 3: ("le fil de", "95 cm")},
                             mot_q="Trois fils", autres_q=autres_q, autres_r=apres)

    # ── 08 : le défi (ranger 4 rubans) ──────────────────────────────────────
    EC = 0.023  # 2 m = 4,6 unités

    def quatre(self):
        """Ficelle 2 m, galon 150 cm, ruban 1 m 80 cm, dentelle 90 cm (dans l'ordre de la voix)."""
        lg = [200, 150, 180, 90]
        cs = ["#e5e7eb", RUBAN4, RUBAN, RUBAN3]
        return rubans_alignes(lg, cs, self.EC, buff=0.8, ep=0.3)

    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        q4 = self.quatre().move_to(P(-3.9, 0.3))
        l0 = self.t("Jade range quatre rubans,", 30)
        self.col(l0, 2.2, 0.6)
        l1 = self.ligne([("du plus court", JAUNE_TITRE), ("au plus long :", JAUNE_TITRE)], 30, buff=0.18)
        self.col(l1, 1.55, 0.6)
        self.au_mot("Jade range")
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.3)
        self.au_mot("du plus court")
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.2)
        self.au_mot("au plus long")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.2)
        textes = [("ficelle de 2", "ficelle 2 m"), ("galon de 150", "galon 150 cm"),
                  ("ruban de 1 mètre 80", "ruban 1 m 80 cm"), ("dentelle de 90", "dentelle 90 cm")]
        self.etq = []
        for k, (mot, s) in enumerate(textes):
            self.au_mot(mot)
            e = etiq(q4[k], s, 27, cote=UP, buff=0.08, audit=True).align_to(q4[k], LEFT)
            self.etq.append(e)
            self.play(GrowFromEdge(q4[k], LEFT), FadeIn(e), run_time=0.3)
        self.au_mot("Dans quel ordre")
        q = self.t("Dans quel ordre ?", 40, JAUNE_TITRE)
        self.col(q, 0.3, 0.6)
        self.play(FadeIn(q, shift=UP * 0.1), Wiggle(q4), run_time=0.5)
        self.pause_defi(y=-0.9)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        q4 = self.quatre().move_to(P(-3.9, 1.0))
        noms = ["ficelle 2 m", "galon 150 cm", "ruban 1 m 80 cm", "dentelle 90 cm"]
        ets = [etiq(r, s, 27, cote=UP, buff=0.08).align_to(r, LEFT) for r, s in zip(q4, noms)]
        self.add(q4, *ets)
        self.au_mot("tout en centimètres")
        l0 = self.t("On met tout en cm.", 34, ORANGE_RETENUE)
        self.col(l0, 2.3, 0.6)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.3)
        l1 = self.ligne([("2 m", BLEU_D), ("= 200 cm", VERT_OK)], 36, buff=0.25)
        self.col(l1, 1.55, 0.6)
        self.au_mot("2 mètres, 200")
        self.play(FadeIn(l1, shift=UP * 0.1),
                  Transform(ets[0], hors_audit(Text("ficelle 200 cm", font_size=27, color=VERT_OK, weight=BOLD)
                                               .move_to(ets[0]).align_to(ets[0], LEFT))), run_time=0.4)
        l2 = self.ligne([("1 m 80 cm", BLEU_D), ("= 180 cm", VERT_OK)], 36, buff=0.25)
        self.col(l2, 0.85, 0.6)
        self.au_mot("1 mètre 80")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.25)
        self.au_mot("centimètres, 180")
        self.play(FadeIn(l2[1], shift=UP * 0.1),
                  Transform(ets[2], hors_audit(Text("ruban 180 cm", font_size=27, color=VERT_OK, weight=BOLD)
                                               .move_to(ets[2]).align_to(ets[2], LEFT))), run_time=0.4)
        self.au_mot("plus court au plus long")
        # le nouvel ordre : dentelle, galon, ruban, ficelle — rangés du plus court au plus long, en bas
        ordre = [3, 1, 2, 0]
        cible = VGroup(*[VGroup(ets[i], q4[i]).copy() for i in ordre])
        for c in cible:
            c[0].next_to(c[1], UP, buff=0.08).align_to(c[1], LEFT)
        cible.arrange(DOWN, buff=0.3, aligned_edge=LEFT).move_to(P(0.9, -1.7))
        self.play(*[Transform(VGroup(ets[i], q4[i]), cible[k]) for k, i in enumerate(ordre)], run_time=1.0)
        res = [("la dentelle, 90", "90"), ("le galon, 150", "150"), ("le ruban, 180", "180"),
               ("la ficelle, 200", "200")]
        for k, (mot, s) in enumerate(res):
            self.au_mot(mot)
            n = hors_audit(Text(str(k + 1), font_size=28, color=JAUNE_TITRE, weight=BOLD)
                           .next_to(cible[k][1], LEFT, buff=0.2))
            self.play(FadeIn(n, scale=1.4), Indicate(cible[k][1], color=VERT_OK, scale_factor=1.05), run_time=0.3)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        fig = self.deux_rubans(P(0, 0), 0.7)
        lignes = self.finale_gauche(fig, textes=[
            ("Pour comparer : d'abord", "la même unité."),
            ("1 m = 100 cm.",),
            ("Puis on compare", "les nombres.")], fs=32)
        self.add(fig)
        self.au_mot("Pour comparer")
        self.montrer_ligne(lignes[0], Indicate(fig, scale_factor=1.05))
        self.au_mot("1 mètre")
        self.montrer_ligne(lignes[1])
        self.au_mot("Puis on compare")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_meme_unite()
        self.ecran_convertir()
        self.ecran_egalites()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")


class LongueurComparerCM1(LongueurComparerBase):
    identite = "Maths CM1 — EleveAI"
    ceinture = "jaune"
