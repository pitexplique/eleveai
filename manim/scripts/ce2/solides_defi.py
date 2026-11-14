# solides_defi.py
# EleveAI — Maths CE2 — série « Solides et espace », épisode 05 : UN DÉFI SUR LES SOLIDES
# (micro ce2_solide_defi, notion solides), AVEC VOIX. Paysage 16:9, CEINTURE BLEUE.
# Vidéo COMMUNE : sert aussi au CM1 (`aussi`).
# Short jumeau : film Ti Margo (le cube en spaghettis : 8 ne suffisent pas, il en faut 12 ; réponse A).
# Décor et métier : Lou, CRÉATRICE DE LAMPES (un fil de lumière sur les arêtes ; centres : sciences,
# construction).
# Mapping micro → écrans : 02 (devinette : les nombres, puis la forme des faces), 03 (piège : cube et
# pavé ont les mêmes nombres), 05 (le fil : 12 arêtes × 5 cm), questions 04 (2 disques et ça roule :
# cylindre, rép. C) et 06 (12 × 3 = 36, rép. B ; 24 = les sommets), défi 07 (12 × 10 = 120 > 100).
# Voix : manim/voix/ce2-solides-defi.json (validée le 14/11, Julie, débit −6).
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/ce2/solides_defi.py SolidesDefiCE2
# python -m manim render -qh --disable_caching manim/scripts/ce2/solides_defi.py SolidesDefiCE2 -o eleveai-maths-ce2-solides-defi --media_dir manim/scripts/ce2/media-sol-05
# Sortie : manim/sorties/ce2/maths/solides/05-defi/eleveai-maths-ce2-solides-defi.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from solides_ce2_commun import *  # noqa: E402,F403

LUMIERE = "#fde047"
NUIT = "#1e1b4b"


def lampe(sol):
    """Le fil de lumière posé sur TOUTES les arêtes d'un solide : un halo, puis le fil."""
    g = VGroup()
    for j, (a, b) in enumerate(sol.aretes_i):
        p, q = sol.pt(a), sol.pt(b)
        if sol.vue_arete[j]:
            g.add(VGroup(Line(p, q, color=LUMIERE, stroke_width=16, stroke_opacity=0.25),
                         Line(p, q, color=LUMIERE, stroke_width=6)))
        else:
            g.add(VGroup(DashedLine(p, q, color=LUMIERE, stroke_width=5, dash_length=0.12)))
    return g


def boite_lampe(e=1.0, centre=ORIGIN, L=1.0, h=1.0, p=1.0):
    return pave(L, h, p, e=e, centre=centre, couleur=NUIT, opacite=0.9, couleur_trait="#a5b4fc")


class SolidesDefiBase(PaysageSolidesCE2):
    nom_voix = "ce2-solides-defi"
    fichier_marques = "solides_defi_marques.json"

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Un défi sur les solides", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Un défi sur les solides")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.8)
        c = boite_lampe(1.4, P(4.8, 0.6))
        q = self.bloc(["Des indices, des arêtes à mesurer :", "sauras-tu tout trouver ?"], 34)
        q.move_to(P(0, 0.6)).align_to(P(-6.2, 0), LEFT)
        self.au_mot("Des indices")
        self.play(FadeIn(q[0], shift=UP * 0.2), FadeIn(c), run_time=0.5)
        self.au_mot("sauras-tu")
        self.play(FadeIn(q[1], shift=UP * 0.2), LaggedStart(*[Create(x) for x in lampe(c)], lag_ratio=0.08),
                  run_time=1.2)
        self.attendre_voix(marge=0.6)

    def ecran_situation(self):
        self.ecran("01-situation")
        lp = lou(1.0).move_to(P(-5.3, 0.2))
        self.au_mot("Voici Lou")
        nom = self.t("Lou", 42, BLEU_CALCUL).next_to(lp, UP, buff=0.2)
        self.play(FadeIn(lp, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("créatrice de lampes")
        met = self.bloc(["créatrice", "de lampes"], 28, BLEU_CALCUL).next_to(lp, DOWN, buff=0.2)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.35)
        ls = [boite_lampe(1.2, P(-1.8, 1.0)), pyramide(4, 1.2, 1.3, e=1.1, centre=P(1.0, 1.0), couleur=NUIT,
                                                         couleur_trait="#a5b4fc"),
              boite_lampe(1.0, P(3.8, 1.0), L=1.6, h=0.9, p=0.9)]
        self.au_mot("la forme de solides")
        self.play(LaggedStart(*[FadeIn(x, shift=UP * 0.2) for x in ls], lag_ratio=0.2), run_time=0.7)
        l1 = self.ligne([("un fil de lumière", LUMIERE), ("sur les arêtes", LUMIERE)], 30, buff=0.2).move_to(P(1.0, -0.7))
        self.au_mot("un fil de lumière")
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.2)
        self.au_mot("sur leurs arêtes")
        self.play(FadeIn(l1[1], shift=UP * 0.1),
                  *[LaggedStart(*[Create(x) for x in lampe(s)], lag_ratio=0.05) for s in ls], run_time=0.8)
        self.au_mot("Deux défis")
        q = self.t("Deux défis l'attendent !", 40, JAUNE_TITRE).move_to(P(1.0, -2.2))
        self.play(FadeIn(q, scale=1.2), run_time=0.4)
        self.attendre_voix()

    # ── 02 : la lampe mystère ───────────────────────────────────────────────
    def ecran_devinette(self):
        self.ecran("02-devinette")
        self.au_mot("Premier défi")
        tit = self.t("Premier défi : la lampe mystère", 42, JAUNE_TITRE)
        gauche(tit, -6.2, 3.05)
        boite = RoundedRectangle(width=2.0, height=2.0, corner_radius=0.2, fill_color="#334155", fill_opacity=1,
                                 stroke_color=WHITE, stroke_width=3).move_to(P(-4.9, 1.0))
        pi = Text("?", font_size=90, color=JAUNE_TITRE, weight=BOLD).move_to(boite)
        self.play(Write(tit), FadeIn(boite), FadeIn(pi), run_time=0.5)
        i1 = self.ligne([("Indice 1 :", BLEU_CALCUL), ("6 faces,", FACE_C), ("12 arêtes,", ARETE_C),
                         ("8 sommets.", SOMMET_C)], 32, buff=0.2)
        gauche(i1, -2.9, 1.9)
        self.au_mot("Indice 1")
        self.play(FadeIn(i1[0]), run_time=0.25)
        self.aux_extraits(i1[1:], ["6 faces", "12 arêtes", "8 sommets"])
        self.au_mot("Cube ou pavé droit")
        l2 = self.t("Cube ou pavé droit ?", 34)
        gauche(l2, -2.9, 1.1)
        c = cube(e=1.3, centre=P(-1.6, -0.6))
        pv = pave(1.8, 1.0, 1.0, e=1.3, centre=P(2.4, -0.6), couleur="#a78bfa")
        self.play(FadeIn(l2, shift=UP * 0.1), FadeIn(c, shift=UP * 0.2), FadeIn(pv, shift=UP * 0.2), run_time=0.5)
        self.au_mot("Les deux ont ces nombres")
        l3 = self.t("Les deux !", 34, ROUGE_ERREUR).next_to(l2, RIGHT, buff=0.3)
        self.play(FadeIn(l3, scale=1.2), Indicate(c), Indicate(pv), run_time=0.5)
        i2 = self.bloc(["Indice 2 : ses faces sont des", "rectangles, pas des carrés."], 32, BLEU_CALCUL)
        gauche(i2, -6.2, -2.35)
        self.au_mot("Indice 2")
        self.play(FadeIn(i2[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("rectangles")
        self.play(FadeIn(i2[1], shift=UP * 0.1), *[FadeIn(pv.face(k, "#facc15", 0.5)) for k in (0, 3, 5)],
                  run_time=0.4)
        self.au_mot("C'est donc un pavé droit")
        cr = Cross(c, stroke_color=ROUGE_ERREUR, stroke_width=6).scale(0.7)
        lum = lampe(pv)
        rep = self.t("C'est un pavé droit !", 36, VERT_OK).move_to(P(2.4, 1.0))
        self.play(Create(cr), FadeIn(rep, scale=1.2), LaggedStart(*[Create(x) for x in lum], lag_ratio=0.05),
                  run_time=0.9)
        self.attendre_voix()

    # ── 03 : le piège ───────────────────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("03-piege")
        self.au_mot("Attention")
        tit = self.t("Attention au piège !", 46, ROUGE_ERREUR)
        gauche(tit, -6.2, 3.05)
        self.play(Write(tit), run_time=0.35)
        self.au_mot("Les nombres ne suffisent pas")
        l0 = self.t("Les nombres ne suffisent pas toujours.", 34)
        gauche(l0, -6.2, 2.2)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.35)
        c = cube(e=1.6, centre=P(-3.6, 0.4))
        pv = pave(1.8, 1.0, 1.0, e=1.6, centre=P(2.2, 0.4), couleur="#a78bfa")
        self.au_mot("Le cube et le pavé droit ont les mêmes nombres")
        n1 = self.t("6 faces, 12 arêtes, 8 sommets", 26).next_to(c, DOWN, buff=0.35)
        n2 = n1.copy().next_to(pv, DOWN, buff=0.35)
        hors_audit(n1)
        hors_audit(n2)
        for m in (n1, n2):
            for f in m.get_family():
                f.sans_synchro = True
        self.play(FadeIn(c), FadeIn(pv), FadeIn(n1), FadeIn(n2), run_time=0.5)
        self.au_mot("la forme des faces")
        fc = VGroup(*[c.face(k, "#facc15", 0.5) for k in (0, 3, 5)])
        fp = VGroup(*[pv.face(k, "#facc15", 0.5) for k in (0, 3, 5)])
        g = self.t("C'est la forme des faces qui fait la différence.", 32, VERT_OK).move_to(P(-0.4, -2.45))
        self.play(FadeIn(fc), FadeIn(fp), FadeIn(g, shift=UP * 0.1), run_time=0.5)
        t1 = self.t("des carrés", 30, "#facc15").next_to(c, UP, buff=0.25)
        t2 = self.t("des rectangles", 30, "#facc15").next_to(pv, UP, buff=0.25)
        self.play(FadeIn(t1), FadeIn(t2), run_time=0.35)
        self.attendre_voix()

    # ── 04 : QUESTION 1 (réponse C) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        boite = RoundedRectangle(width=1.8, height=1.8, corner_radius=0.2, fill_color="#334155", fill_opacity=1,
                                 stroke_color=WHITE, stroke_width=3).move_to(P(-4.4, 1.3))
        pi = Text("?", font_size=80, color=JAUNE_TITRE, weight=BOLD).move_to(boite)

        def autres_q(sc):
            sc.play(FadeIn(boite), FadeIn(pi), run_time=0.35)

        def apres(sc):
            cy = Cylindre(0.6, 1.2, e=1.0, centre=boite.get_center(), couleur=NUIT, couleur_trait="#a5b4fc")
            sc.play(FadeOut(boite), FadeOut(pi), FadeIn(cy), run_time=0.4)
            lg = sc.rep_bas(0, [("Un disque en haut,", FACE_C), ("un disque en bas,", FACE_C), "et ça roule :"],
                            fs=30, buff=0.2)
            sc.au_mot("Un disque en haut")
            sc.play(FadeIn(lg[0]), FadeIn(cy.disque_haut("#facc15")), run_time=0.3)
            sc.au_mot("un disque en bas")
            sc.play(FadeIn(lg[1]), FadeIn(cy.disque_bas("#facc15")), run_time=0.3)
            sc.au_mot("et ça roule")
            sc.play(FadeIn(lg[2]), run_time=0.25)
            lg2 = sc.rep_bas(1, ["c'est un cylindre."], fs=30)
            sc.au_mot("c'est un cylindre")
            sc.play(FadeIn(lg2), run_time=0.25)
            lg3 = sc.rep_bas(2, ["Le cône n'a qu'un disque, et la boule n'en a aucun."], fs=30)
            sc.au_mot("Le cône n'a qu'un disque")
            sc.play(FadeIn(lg3), run_time=0.3)
            sc.rep_fini()

        self.question_pause("04-question", "04b-reponse",
                            ["Une lampe a 2 faces plates en forme", "de disque, et elle peut rouler.",
                             "C'est quel solide ?"],
                            [self.choix("une boule"), self.choix("un cône"), self.choix("un cylindre")], 2,
                            ["Un disque en haut, un disque en bas, et ça roule :", "c'est un cylindre.",
                             "Le cône n'a qu'un disque, et la boule n'en a aucun."],
                            mot_q="Une lampe", autres_q=autres_q, autres_r=apres)

    # ── 05 : le fil de lumière ──────────────────────────────────────────────
    def ecran_fil(self):
        self.ecran("05-fil")
        self.au_mot("Deuxième défi")
        tit = self.t("Deuxième défi : le fil de lumière", 42, JAUNE_TITRE)
        gauche(tit, -6.2, 3.05)
        self.play(Write(tit), run_time=0.45)
        c = boite_lampe(2.5, P(-3.6, 0.2))
        self.au_mot("une lampe en cube")
        self.play(FadeIn(c, shift=UP * 0.2), run_time=0.4)
        cin = self.t("5 cm", 32, LUMIERE).next_to(c.arete_ab(0, 1), DOWN, buff=0.2)
        l1 = self.ligne([("Chaque arête mesure", WHITE), ("5 cm.", LUMIERE)], 30, buff=0.2)
        gauche(l1, 0.2, 2.1)
        self.aux_extraits([l1[0]], ["Chaque arête"])
        self.play(Create(c.arete_ab(0, 1, LUMIERE, 10)), run_time=0.3)
        self.aux_extraits([VGroup(l1[1], cin)], ["5 centimètres"])
        self.au_mot("Le cube a 12 arêtes")
        l2 = self.bloc(["Le cube a 12 arêtes,", "toutes de la même longueur."], 30)
        gauche(l2, 0.2, 1.0)
        self.play(FadeIn(l2[0], shift=UP * 0.1), LaggedStart(*[Create(x) for x in lampe(c)], lag_ratio=0.08),
                  run_time=0.9)
        self.au_mot("toutes de la même longueur")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.3)
        lg = self.ligne([("12", BLEU_D), ("× 5", BLEU_D), ("= 60", BLEU_D)], 44, buff=0.26)
        gauche(lg, 0.4, -0.5)
        self.aux_extraits(lg, ["12 fois 5", "5, 60", "60. Il"])
        self.au_mot("Il faut 60 centimètres")
        g = self.gros("Il faut 60 cm de fil.", couleur=LUMIERE, fs=34)
        gauche(g, 0.2, -1.7)
        self.play(FadeIn(g, scale=1.2), run_time=0.4)
        self.insister(g, 1.1, 0.25)
        self.attendre_voix()

    # ── 06 : QUESTION 2 (réponse B) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        c = boite_lampe(1.4, P(-4.4, 1.3))
        tro = self.t("3 cm", 28, LUMIERE).next_to(c.arete_ab(0, 1), DOWN, buff=0.15)

        def autres_q(sc):
            sc.play(FadeIn(c), Create(c.arete_ab(0, 1, LUMIERE, 8)), run_time=0.35)
            sc.add(tro)

        def apres(sc):
            k = dict(fs=30, buff=0.22, y0=-1.4, pas=0.6)
            lg = sc.rep_bas(0, [("12 arêtes de 3 cm :", LUMIERE)], **k)
            lg1 = sc.rep_bas(1, ["12", "× 3", "= 36."], **k)
            sc.au_mot("12 arêtes de 3")
            sc.play(FadeIn(lg[0]), LaggedStart(*[Create(x) for x in lampe(c)], lag_ratio=0.05), run_time=0.6)
            sc.aux_extraits(lg1, ["12 fois 3", "3, 36", "36. 24"])
            lg2 = sc.rep_bas(2, [("24", ROUGE_ERREUR), ("= 8 × 3 :", ROUGE_ERREUR)], **k)
            lg3 = sc.rep_bas(3, [("on a compté les sommets !", ROUGE_ERREUR)], **k)
            sc.aux_extraits([lg2[0], lg2[1], lg3[0]], ["24, c'est", "8 fois 3", "on a compté"])
            sc.rep_fini()

        self.question_pause("06-question", "06b-reponse",
                            ["Une petite lampe en cube a des", "arêtes de 3 cm.", "Combien faut-il de fil ?"],
                            [self.choix("24 centimètres"), self.choix("36 centimètres"), self.choix("18 centimètres")],
                            1, ["12 arêtes de 3 cm : 12 × 3 = 36.", "24 = 8 × 3 : on a compté les sommets !"],
                            mot_q="Une petite lampe", autres_q=autres_q, autres_r=apres)

    # ── 07 : le défi ────────────────────────────────────────────────────────
    def bobine(self, centre):
        b = VGroup(Circle(radius=0.5, fill_color=LUMIERE, fill_opacity=1, stroke_color=WHITE, stroke_width=2),
                   Circle(radius=0.16, fill_color="#111827", fill_opacity=1, stroke_width=0))
        b.move_to(centre)
        return VGroup(Line(b.get_right() + DOWN * 0.1, b.get_right() + P(0.8, -0.8), color=LUMIERE,
                           stroke_width=8), b)

    def ecran_defi(self):
        self.ecran("07-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        c = boite_lampe(1.9, P(-4.4, 0.4))
        dix = self.t("10 cm", 30, LUMIERE).next_to(c.arete_ab(0, 1), DOWN, buff=0.2)
        self.au_mot("Lou fabrique")
        l0 = self.t("Lou fabrique une grande lampe en cube,", 30)
        gauche(l0, -1.9, 2.0)
        self.play(FadeIn(c, shift=UP * 0.2), FadeIn(l0, shift=UP * 0.1), run_time=0.4)
        l0b = self.ligne([("avec des arêtes de", WHITE), ("10 cm.", LUMIERE)], 30, buff=0.2)
        gauche(l0b, -1.9, 1.4)
        self.aux_extraits([l0b[0], VGroup(l0b[1], dix)], ["avec des arêtes", "10 centimètres"])
        bo = self.bobine(P(4.6, 0.3))
        l1 = self.ligne([("Elle a", WHITE), ("100 cm de fil.", LUMIERE)], 30, buff=0.2)
        gauche(l1, -1.9, 0.75)
        self.aux_extraits(l1, ["Elle a", "100 centimètres"])
        self.play(FadeIn(bo, scale=0.7), run_time=0.3)
        self.au_mot("Est-ce assez")
        q = self.t("Est-ce assez ?", 40, JAUNE_TITRE)
        gauche(q, -1.9, -0.4)
        self.play(FadeIn(q, shift=UP * 0.1), run_time=0.4)
        self.au_mot("Mets pause")
        pz = self.t("Mets pause, et cherche !", 32, ORANGE_RETENUE)
        gauche(pz, -1.9, -1.5)
        self.play(Write(pz), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.ecran("07b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        c = boite_lampe(1.9, P(-4.4, 0.6))
        dix = self.t("10 cm", 30, LUMIERE).next_to(c.arete_ab(0, 1), DOWN, buff=0.2)
        hors_audit(dix)
        self.add(c, dix)
        x = -1.9
        lg = self.ligne([("12 arêtes de 10 cm :", LUMIERE), ("12", BLEU_D), ("× 10", BLEU_D), ("= 120.", BLEU_D)], 30,
                        buff=0.22)
        gauche(lg, x, 2.1)
        self.au_mot("12 arêtes de 10")
        self.play(FadeIn(lg[0]), LaggedStart(*[Create(k) for k in lampe(c)], lag_ratio=0.05), run_time=0.5)
        self.aux_extraits(lg[1:], ["12 fois 10", "10, 120", "120. Il"])
        l1 = self.t("Il faut 120 cm de fil.", 30)
        hors_audit(l1)  # au 2e « 120 » dit ; l'audit le compare au 1er (« 10, 120 »)
        gauche(l1, x, 1.35)
        self.aux_extraits([l1], ["Il faut 120"])
        l2 = self.ligne([("Lou n'en a que", WHITE), ("100 :", BLEU_D)], 30, buff=0.2)
        gauche(l2, x, 0.6)
        self.au_mot("Lou n'en a que")
        self.play(FadeIn(l2[0]), run_time=0.25)
        self.aux_extraits([l2[1]], ["100 : ce"])
        l2b = self.t("ce n'est pas assez.", 32, ROUGE_ERREUR)
        gauche(l2b, x, -0.1)
        self.au_mot("ce n'est pas assez")
        self.play(FadeIn(l2b, scale=1.1), run_time=0.3)
        lm = self.ligne([("120", BLEU_D), ("− 100", BLEU_D), ("= 20", BLEU_D)], 36, buff=0.26)
        hors_audit(lm[0])
        hors_audit(lm[1])
        for m in lm[:2]:
            for f in m.get_family():
                f.sans_synchro = True
        gauche(lm, x, -0.85)
        self.au_mot("Il lui manque")
        self.play(FadeIn(lm[0]), FadeIn(lm[1]), run_time=0.25)
        self.aux_extraits([lm[2]], ["20 centimètres."])
        g = self.gros("Il lui manque 20 cm.", couleur=ROUGE_ERREUR, fs=34)
        hors_audit(g)
        for f in g.get_family():
            f.sans_synchro = True
        gauche(g, x, -1.9)
        self.play(FadeIn(g, scale=1.2), run_time=0.3)
        self.attendre_voix()

    def ecran_finale(self):
        self.ecran("08-finale", 0.65)
        c = boite_lampe(1.7)
        lignes = self.finale_gauche(c, textes=[
            ("Pour reconnaître un solide : on compte", "faces, arêtes et sommets…"),
            ("… puis on regarde la forme des faces.",),
            ("Toutes les arêtes d'un cube :", "12 × la longueur d'une arête.")], fs=30, x_fig=-4.8, xl=-2.5)
        self.add(c)
        self.au_mot("Pour reconnaître un solide")
        self.montrer_ligne(lignes[0])
        self.au_mot("puis on regarde la forme")
        self.montrer_ligne(lignes[1], *[FadeIn(c.face(k, "#facc15", 0.4)) for k in (0, 3, 5)])
        for f in lignes[2].get_family():
            f.sans_synchro = True
        self.au_mot("12 fois la longueur")
        self.wait(0.07)
        self.montrer_ligne(lignes[2], LaggedStart(*[Create(x) for x in lampe(c)], lag_ratio=0.05))
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_devinette()
        self.ecran_piege()
        self.ecran_question1()
        self.ecran_fil()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("09-abonne")


class SolidesDefiCE2(SolidesDefiBase):
    identite = "Maths CE2 — EleveAI"
    ceinture = "bleue"
