# duree_placer_aiguilles.py
# EleveAI — Maths CP — série « Durées » (CP → 6e) : PLACER LES AIGUILLES (heure entière)
# (micro cp_duree_placer_aiguilles, notion duree), AVEC VOIX. Paysage 16:9, CEINTURE BLANCHE.
# Décor et métier : Léo, CLOWN DE CIRQUE (il règle la grande horloge du cirque pour 4 heures).
# Mapping micro → écrans : 02 (la petite d'abord, sur le 4), 03 (la grande sur le 12 : heure pile),
# 04 (on vérifie les 2 aiguilles), 06 (piège : ne pas inverser les aiguilles),
# questions 05 (9 heures, la petite sur le 9, B) et 07 (2 heures, la grande sur le 12, A), défi 08 (11 heures).
# Voix : manim/voix/cp-duree-placer-aiguilles.json (validée le 17/11, Julie, débit −6) ;
# marques : duree_placer_aiguilles_marques.json (python manim/scripts/cp/duree_marques.py placer-aiguilles).
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/cp/duree_placer_aiguilles.py DureePlacerAiguillesCP
# python -m manim render -qh --disable_caching manim/scripts/cp/duree_placer_aiguilles.py DureePlacerAiguillesCP -o eleveai-maths-cp-duree-placer-aiguilles --media_dir manim/scripts/cp/media-duree-placer-aiguilles
# Sortie : manim/sorties/cp/maths/duree/02-placer-aiguilles/eleveai-maths-cp-duree-placer-aiguilles.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from duree_cp_commun import *  # noqa: E402,F403


class DureePlacerAiguillesBase(PaysageDureeCP):
    nom_voix = "cp-duree-placer-aiguilles"
    fichier_marques = "duree_placer_aiguilles_marques.json"
    ceinture = "blanche"

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Placer les aiguilles", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Placer les aiguilles")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q0 = self.ligne([("Comment montrer", WHITE), ("4 heures", JAUNE_TITRE)], 38, buff=0.2)
        q1 = self.t("sur une horloge ?", 38)
        q = VGroup(q0, q1).arrange(DOWN, aligned_edge=LEFT, buff=0.3)
        q.move_to(P(0, 0.35)).align_to(P(-6.2, 0), LEFT)
        hg = hl(1.05, 4, 0).move_to(P(4.6, 0.35))
        sans_aiguille(hg, "h")
        sans_aiguille(hg, "m")
        pq = Text("?", font_size=60, color=JAUNE_TITRE, weight=BOLD).move_to(hg.centre())
        self.au_mot("Comment montrer")
        self.play(FadeIn(q0[0], shift=UP * 0.2), FadeIn(hg, scale=0.8), run_time=0.4)
        self.au_mot("4 heures")
        self.play(FadeIn(q0[1], scale=1.2), run_time=0.35)
        self.au_mot("sur une horloge")
        self.play(FadeIn(q1, shift=UP * 0.2), FadeIn(hors_audit(pq), scale=1.3), run_time=0.4)
        self.attendre_voix(marge=0.6)

    # ── 01 : Léo, clown de cirque ───────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pe = leo(0.95).move_to(P(-4.85, -0.2))
        self.au_mot("Voici Léo")
        nom = self.t("Léo", 42, JAUNE_TITRE).next_to(pe, UP, buff=0.75)
        self.play(FadeIn(pe, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("Il est clown")
        met = self.t("clown de cirque", 28, JAUNE_TITRE).next_to(pe, DOWN, buff=0.12)
        ch = chapiteau(1.05).move_to(P(-1.35, -1.5))
        self.play(FadeIn(met, shift=DOWN * 0.1), FadeIn(ch, shift=UP * 0.3), run_time=0.45)
        XL = -2.9
        l0 = gauche(self.ligne([("Son spectacle commence", WHITE), ("à 4 heures.", JAUNE_TITRE)], 36, buff=0.2), XL, 2.95)
        self.au_mot("Son spectacle")
        self.play(FadeIn(l0[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("à 4 heures")
        self.play(FadeIn(l0[1], scale=1.2), run_time=0.35)
        hg = hl(1.35, 8, 10).move_to(P(3.7, -0.5))
        l1 = gauche(self.t("Il veut régler", 36), XL, 2.15)
        l2 = gauche(self.t("la grande horloge du cirque.", 36), XL, 1.55)
        self.au_mot("Il veut régler")
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.35)
        self.au_mot("la grande horloge")
        self.play(FadeIn(l2, shift=UP * 0.1), FadeIn(hg, scale=0.8), run_time=0.45)
        self.play(Wiggle(hg, scale_value=1.06, rotation_angle=0.04 * TAU), run_time=0.8)
        self.attendre_voix()

    # ── 02-04 : la petite, la grande, on vérifie (la même horloge) ──────────
    def ecran_petite(self):
        self.ecran("02-petite")
        tit = self.t("Je place les aiguilles", 46, JAUNE_TITRE).move_to(P(0, 3.15))
        self.hg = hg = hl(1.6, 8, 10).move_to(P(-4.3, -0.2))
        self.add(hors_audit(tit), hg)
        XL = -1.6
        l0 = gauche(self.ligne([("D'abord,", WHITE), ("la petite aiguille.", AIG_H)], 38, buff=0.2), XL, 1.9)
        self.au_mot("D'abord")
        self.play(FadeIn(l0, shift=UP * 0.1), Indicate(hg.aig_h, color=JAUNE_TITRE, scale_factor=1.3), run_time=0.5)
        l1 = gauche(self.t("C'est elle qui donne l'heure.", 38), XL, 0.8)
        self.au_mot("C'est elle")
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.35)
        l2 = gauche(self.ligne([("Léo la met", WHITE), ("sur le 4.", AIG_H)], 42, buff=0.2), XL, -0.45)
        self.au_mot("Léo la met")
        self.play(FadeIn(l2[0], shift=UP * 0.1), pointer(hg, "h", 4, run_time=1.0), run_time=1.0)
        self.au_mot("sur le 4")
        self.play(FadeIn(l2[1], scale=1.2), Create(entoure(hg, 4, AIG_H)), run_time=0.45)
        self.attendre_voix()

    def ecran_grande(self):
        self.ecran("03-grande")
        tit = self.t("Je place les aiguilles", 46, JAUNE_TITRE).move_to(P(0, 3.15))
        hg = self.hg
        self.add(hors_audit(tit), hg)
        XL = -1.6
        l0 = gauche(self.ligne([("Ensuite,", WHITE), ("la grande aiguille.", AIG_M)], 38, buff=0.2), XL, 1.9)
        self.au_mot("Ensuite")
        self.play(FadeIn(l0, shift=UP * 0.1), Indicate(hg.aig_m, color=JAUNE_TITRE, scale_factor=1.2), run_time=0.5)
        l1 = gauche(self.ligne([("4 heures,", JAUNE_TITRE), ("c'est une heure pile.", WHITE)], 38, buff=0.2), XL, 0.8)
        self.au_mot("4 heures, c'est")
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.4)
        l2 = gauche(self.t("Alors Léo met la grande", 38), XL, -0.35)
        l3 = gauche(self.t("sur le 12.", 42, AIG_M), XL, -1.05)
        self.au_mot("Alors Léo met")
        self.play(FadeIn(l2, shift=UP * 0.1), pointer(hg, "m", 12, run_time=1.1), run_time=1.1)
        self.au_mot("sur le 12")
        self.play(FadeIn(l3, scale=1.2), Create(entoure(hg, 12, AIG_M)), run_time=0.45)
        self.attendre_voix()

    def ecran_verifier(self):
        self.ecran("04-verifier")
        tit = self.t("On vérifie", 46, JAUNE_TITRE).move_to(P(0, 3.15))
        hg = self.hg
        self.add(hg)
        self.au_mot("On vérifie")
        self.play(FadeIn(tit, shift=UP * 0.15), run_time=0.35)
        XL = -1.6
        l0 = gauche(self.ligne([("La petite aiguille", AIG_H), ("est sur le 4.", WHITE)], 38, buff=0.2), XL, 1.8)
        self.au_mot("sur le 4")
        self.play(FadeIn(l0, shift=UP * 0.1), Indicate(hg.aig_h, color=JAUNE_TITRE, scale_factor=1.3), run_time=0.45)
        self.play(Create(coche_v(l0).next_to(l0, LEFT, buff=0.18)), run_time=0.3)
        l1 = gauche(self.ligne([("La grande aiguille", AIG_M), ("est sur le 12.", WHITE)], 38, buff=0.2), XL, 0.65)
        self.au_mot("sur le 12")
        self.play(FadeIn(l1, shift=UP * 0.1), Indicate(hg.aig_m, color=JAUNE_TITRE, scale_factor=1.2), run_time=0.45)
        self.play(Create(coche_v(l1).next_to(l1, LEFT, buff=0.18)), run_time=0.3)
        res = gauche(self.ligne([("L'horloge montre", WHITE), ("4 heures.", VERT_OK)], 40, buff=0.3), XL - 0.4, -0.9)
        self.au_mot("L'horloge montre")
        self.play(FadeIn(res[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("4 heures")
        self.play(FadeIn(res[1], scale=1.2), Circumscribe(hg, color=VERT_OK, shape=Circle, buff=0.05), run_time=0.6)
        self.insister(res[1], 1.15, 0.25)
        self.attendre_voix()

    # ── 05 / 07 : questions (une aiguille manque, elle arrive avec la réponse) ─
    def question(self, cle_q, cle_r, h, quelle, lignes_q, choix, bonne, phrase, mot_aig):
        self.clear()
        self.add_mascotte()
        hg = hl(1.2, h, 0).move_to(P(-3.6, 1.35))
        aig = sans_aiguille(hg, quelle)
        self.add(hg)
        n = h if quelle == "h" else 12
        c = entoure(hg, n, AIG_H if quelle == "h" else AIG_M)

        def autres_r_aig(sc):
            for i in range(len(phrase)):
                sc.rep(i, avec=[GrowFromPoint(aig, hg.centre()), Create(c)] if i == mot_aig else [])
            sc.add(hg.pivot)
            sc.rep_fin()

        self.question_gauche(cle_q, cle_r, lignes_q, [self.choix(x) for x in choix], bonne, phrase, -0.75,
                             mot_q="Pour montrer", autres_r=autres_r_aig)

    def ecran_question1(self):
        self.question("05-question", "05b-reponse", 9, "h", ["Pour montrer 9 heures,", "où va la petite aiguille ?"],
                      ["sur le 12", "sur le 9", "sur le 10"], 1,
                      ["La petite aiguille donne l'heure.", "Elle va sur le 9."], 1)

    # ── 06 : le piège (ne pas inverser les aiguilles) ───────────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        self.au_mot("Attention")
        tit = gauche(self.t("Attention au piège !", 46, ROUGE_ERREUR), -6.2, 3.05)
        self.play(Write(tit), run_time=0.35)
        faux = hl(1.15, 12, 20).move_to(P(-4.95, 0.55))
        juste = hl(1.15, 4, 0).move_to(P(-2.05, 0.55))
        l0 = gauche(self.t("Il ne faut pas inverser les aiguilles.", 38), -6.2, -1.45)
        self.au_mot("Il ne faut pas")
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(faux, scale=0.85), run_time=0.45)
        x = croix_x(faux.cadran, s=0.9)
        self.play(Create(x), run_time=0.4)
        XR = 0.55
        l1 = gauche(self.ligne([("La petite va", AIG_H), ("sur l'heure.", WHITE)], 36, buff=0.2), XR, 1.1)
        self.au_mot("La petite va")
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(juste, scale=0.85), run_time=0.35)
        self.play(Indicate(juste.aig_h, color=JAUNE_TITRE, scale_factor=1.3), run_time=0.4)
        l2 = gauche(self.ligne([("La grande va", AIG_M), ("sur le 12.", WHITE)], 36, buff=0.2), XR, 0.0)
        self.au_mot("La grande va")
        self.play(FadeIn(l2[0], shift=UP * 0.1), Indicate(juste.aig_m, color=JAUNE_TITRE, scale_factor=1.2),
                  run_time=0.4)
        self.au_mot("sur le 12")
        self.play(FadeIn(l2[1], scale=1.15), Create(coche_v(juste, s=0.45).next_to(juste, RIGHT, buff=0.12)), run_time=0.45)
        self.attendre_voix()

    def ecran_question2(self):
        self.question("07-question", "07b-reponse", 2, "m", ["Pour montrer 2 heures,", "où va la grande aiguille ?"],
                      ["sur le 12", "sur le 2", "sur le 6"], 0,
                      ["Pour une heure pile,", "la grande aiguille", "va toujours sur le 12."], 2)

    # ── 08 : le défi (11 heures) ────────────────────────────────────────────
    def pause_gauche(self, y=-2.75, marge=2.0):
        self.au_mot("Mets pause")
        p = gauche(self.t("Mets pause, et cherche !", 36, ORANGE_RETENUE), -6.2, y)
        self.play(Write(p), run_time=0.8)
        self.attendre_voix(marge=marge)

    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        XL = -6.2
        pe = leo(0.8).move_to(P(1.7, -1.0))
        balles = VGroup(*[Circle(radius=0.16, fill_color=c, fill_opacity=1, stroke_width=0).move_to(pe.get_top() + P(dx, dy + 0.15))
                          for c, dx, dy in (("#ef4444", -0.55, 0.45), ("#22c55e", 0.0, 0.8), ("#3b82f6", 0.55, 0.45))])
        hg = hl(1.4, 11, 0).move_to(P(4.4, -0.1))
        sans_aiguille(hg, "h")
        sans_aiguille(hg, "m")
        l0 = gauche(self.ligne([("Léo jongle", WHITE), ("à 11 heures.", JAUNE_TITRE)], 40, buff=0.2), XL, 1.9)
        self.au_mot("Léo jongle")
        self.play(FadeIn(l0[0], shift=UP * 0.1), FadeIn(pe, shift=UP * 0.3), FadeIn(balles), FadeIn(hg, scale=0.85),
                  run_time=0.4)
        self.au_mot("à 11 heures")
        self.play(FadeIn(l0[1], scale=1.2), Rotate(balles, -TAU / 3, about_point=balles.get_center()), run_time=0.45)
        q0 = gauche(self.t("Où places-tu", 40, JAUNE_TITRE), XL, 0.75)
        q1 = gauche(self.t("les 2 aiguilles ?", 40, JAUNE_TITRE), XL, 0.05)
        self.au_mot("Où places-tu")
        self.play(FadeIn(q0, shift=UP * 0.15), Rotate(balles, -TAU / 3, about_point=balles.get_center()), run_time=0.5)
        self.au_mot("les 2 aiguilles")
        self.play(FadeIn(q1, shift=UP * 0.15), Circumscribe(hg, color=JAUNE_TITRE, shape=Circle, buff=0.05),
                  run_time=0.6)
        self.pause_gauche(y=-1.2)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        hg = hl(1.6, 11, 0).move_to(P(4.0, -0.2))
        ah = sans_aiguille(hg, "h")
        am = sans_aiguille(hg, "m")
        self.play(FadeIn(hg, scale=0.85), run_time=0.4)
        XL = -6.2
        l0 = gauche(self.ligne([("La petite aiguille", AIG_H), ("donne l'heure :", WHITE)], 38, buff=0.2), XL, 1.95)
        self.au_mot("La petite aiguille")
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.4)
        l1 = gauche(self.ligne([("elle va", WHITE), ("sur le 11.", AIG_H)], 42, buff=0.2), XL, 1.15)
        self.au_mot("elle va")
        self.play(FadeIn(l1[0], shift=UP * 0.1), GrowFromPoint(ah, hg.centre()), run_time=0.5)
        self.add(hg.pivot)
        self.au_mot("sur le 11")
        self.play(FadeIn(l1[1], scale=1.2), Create(entoure(hg, 11, AIG_H, f=0.8)), run_time=0.45)
        l2 = gauche(self.t("C'est une heure pile :", 38), XL, -0.15)
        self.au_mot("C'est une heure pile")
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.35)
        l3 = gauche(self.ligne([("la grande va", WHITE), ("sur le 12.", AIG_M)], 42, buff=0.2), XL, -0.95)
        self.au_mot("la grande va")
        self.play(FadeIn(l3[0], shift=UP * 0.1), GrowFromPoint(am, hg.centre()), run_time=0.5)
        self.add(hg.pivot)
        self.au_mot("sur le 12")
        self.play(FadeIn(l3[1], scale=1.2), Create(entoure(hg, 12, AIG_M, f=0.8)), run_time=0.45)
        self.play(Circumscribe(hg, color=VERT_OK, shape=Circle, buff=0.05), run_time=0.6)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        h = hl(1.45, 4, 0)
        fig = hors_audit(VGroup(h))
        lignes = self.finale_gauche(fig, textes=[
            ("La petite aiguille va", "sur le nombre de l'heure."),
            ("Pour une heure pile,", "la grande va sur le 12."),
            ("On vérifie toujours", "les 2 aiguilles.")], fs=34, x_fig=-4.2, xl=-1.2)
        self.add(fig)
        self.au_mot("La petite aiguille")
        self.montrer_ligne(lignes[0], Create(entoure(h, 4, AIG_H)))
        self.au_mot("Pour une heure pile")
        self.montrer_ligne(lignes[1], Create(entoure(h, 12, AIG_M)))
        self.au_mot("On vérifie")
        self.montrer_ligne(lignes[2], Circumscribe(h, color=VERT_OK, shape=Circle, buff=0.05))
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_petite()
        self.ecran_grande()
        self.ecran_verifier()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")


class DureePlacerAiguillesCP(DureePlacerAiguillesBase):
    identite = "Maths CP — EleveAI"
    ceinture = "blanche"
