# duree_lire_heure.py
# EleveAI — Maths CP — série « Durées » (CP → 6e) : LIRE L'HEURE (heure entière)
# (micro cp_duree_lire_heure, notion duree), AVEC VOIX. Paysage 16:9, CEINTURE BLANCHE.
# Décor et métier : Rose, HORLOGÈRE (elle répare les horloges).
# Mapping micro → écrans : 02 (les 2 aiguilles : la petite courte, la grande longue ; la petite donne l'heure),
# 03 (lire 3 heures pile), 04 (8 heures), 06 (piège : la grande se voit mieux mais ne donne pas l'heure),
# questions 05 (5 heures, B) et 07 (10 heures, A), défi 08 (7 heures).
# Voix : manim/voix/cp-duree-lire-heure.json (validée le 17/11, Julie, débit −6) ;
# marques : duree_lire_heure_marques.json (python manim/scripts/cp/duree_marques.py lire-heure).
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/cp/duree_lire_heure.py DureeLireHeureCP
# python -m manim render -qh --disable_caching manim/scripts/cp/duree_lire_heure.py DureeLireHeureCP -o eleveai-maths-cp-duree-lire-heure --media_dir manim/scripts/cp/media-duree-lire-heure
# Sortie : manim/sorties/cp/maths/duree/01-lire-heure/eleveai-maths-cp-duree-lire-heure.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from duree_cp_commun import *  # noqa: E402,F403


class DureeLireHeureBase(PaysageDureeCP):
    nom_voix = "cp-duree-lire-heure"
    fichier_marques = "duree_lire_heure_marques.json"
    ceinture = "blanche"

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Lire l'heure", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Lire l'heure")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q0 = self.t("La petite aiguille est sur le 3.", 38)
        q1 = self.t("Quelle heure est-il ?", 38, JAUNE_TITRE)
        q = VGroup(q0, q1).arrange(DOWN, aligned_edge=LEFT, buff=0.3)
        q.move_to(P(0, 0.35)).align_to(P(-6.2, 0), LEFT)
        hg = hl(1.05, 3, 0).move_to(P(4.6, 0.35))
        self.au_mot("La petite aiguille")
        self.play(FadeIn(hg, scale=0.8), run_time=0.3)
        self.play(Indicate(hg.aig_h, color=JAUNE_TITRE, scale_factor=1.2), run_time=0.4)
        self.au_mot("sur le 3")
        self.play(FadeIn(q0, shift=UP * 0.2), run_time=0.35)
        self.au_mot("Quelle heure")
        self.play(FadeIn(q1, shift=UP * 0.2), run_time=0.35)
        self.attendre_voix(marge=0.6)

    # ── 01 : Rose, horlogère ────────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pe = rose(0.95).move_to(P(-4.85, 0.0))
        self.au_mot("Voici Rose")
        nom = self.t("Rose", 42, JAUNE_TITRE).next_to(pe, UP, buff=0.55)
        self.play(FadeIn(pe, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("Elle est horlogère")
        met = self.t("horlogère", 28, JAUNE_TITRE).next_to(pe, DOWN, buff=0.12)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.35)
        XL = -2.6
        l0 = gauche(self.t("Elle répare les horloges.", 36), XL, 2.95)
        # l'établi et ses horloges
        etabli = RoundedRectangle(width=5.4, height=0.22, corner_radius=0.06, fill_color="#a16207",
                                  fill_opacity=1, stroke_width=0).move_to(P(1.15, -1.45))
        pieds = VGroup(*[Rectangle(width=0.16, height=1.1, fill_color="#78350f", fill_opacity=1,
                                   stroke_width=0).move_to(P(x, -2.1)) for x in (-1.3, 3.6)])
        h1 = hl(0.55, 10, 0).move_to(P(-1.0, -0.75))
        h2 = hl(0.55, 6, 0).move_to(P(3.3, -0.75))
        self.au_mot("Elle répare")
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(VGroup(etabli, pieds)), FadeIn(h1, shift=UP * 0.2),
                  FadeIn(h2, shift=UP * 0.2), run_time=0.5)
        hg = hl(1.05, 3, 0).move_to(P(1.15, 0.0))
        l1 = gauche(self.t("Ce matin, une horloge sonne.", 36), XL, 2.15)
        ondes = VGroup(*[Arc(radius=1.35 + 0.25 * k, start_angle=-0.45, angle=0.9, color=JAUNE_TITRE,
                             stroke_width=5).move_arc_center_to(hg.centre()) for k in range(2)],
                       *[Arc(radius=1.35 + 0.25 * k, start_angle=PI - 0.45, angle=0.9, color=JAUNE_TITRE,
                             stroke_width=5).move_arc_center_to(hg.centre()) for k in range(2)])
        self.au_mot("Ce matin")
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(hg, scale=0.8), run_time=0.45)
        self.au_mot("sonne")
        self.play(Wiggle(hg, scale_value=1.08, rotation_angle=0.05 * TAU), Create(ondes), run_time=0.8)
        self.play(FadeOut(ondes), run_time=0.3)
        self.au_mot("Rose la regarde")
        regard = DashedLine(pe.tete.get_right() + RIGHT * 0.1, hg.get_left() + LEFT * 0.1, color=WHITE,
                            stroke_width=3, dash_length=0.12)
        self.play(Create(regard), run_time=0.45)
        q = gauche(self.t("Quelle heure est-il ?", 40, JAUNE_TITRE), XL, -3.05)
        self.au_mot("Quelle heure")
        self.play(FadeIn(q, shift=UP * 0.15), Circumscribe(hg, color=JAUNE_TITRE, shape=Circle, buff=0.05),
                  run_time=0.6)
        self.attendre_voix()

    # ── 02 : les deux aiguilles ─────────────────────────────────────────────
    def ecran_aiguilles(self):
        self.ecran("02-aiguilles")
        tit = self.t("Les aiguilles", 46, JAUNE_TITRE).move_to(P(0, 3.15))
        hg = hl(1.6, 3, 0).move_to(P(-4.3, -0.2))
        self.add(hors_audit(tit), hg)
        XL = -1.6
        l0 = gauche(self.t("Une horloge a 2 aiguilles.", 36), XL, 1.9)
        self.au_mot("a 2 aiguilles")
        self.play(FadeIn(l0, shift=UP * 0.1), Indicate(hg.aig_h, color=JAUNE_TITRE),
                  Indicate(hg.aig_m, color=JAUNE_TITRE), run_time=0.6)
        l1 = self.ligne([("La petite aiguille", AIG_H), ("est courte.", WHITE)], 36, buff=0.2)
        gauche(l1, XL, 0.8)
        f1 = fleche_vers(l1.get_left() + LEFT * 0.05, bout_aiguille(hg, "h", 0.8), AIG_H)
        self.au_mot("La petite aiguille est courte")
        self.play(FadeIn(l1, shift=UP * 0.1), GrowArrow(f1), run_time=0.45)
        self.insister(hg.aig_h, 1.25, 0.25)
        l2 = self.ligne([("La grande aiguille", AIG_M), ("est longue.", WHITE)], 36, buff=0.2)
        gauche(l2, XL, -0.3)
        f2 = fleche_vers(l2.get_left() + LEFT * 0.05, bout_aiguille(hg, "m", 0.72), AIG_M)
        self.au_mot("La grande aiguille est longue")
        self.play(FadeIn(l2, shift=UP * 0.1), GrowArrow(f2), run_time=0.45)
        self.insister(hg.aig_m, 1.15, 0.25)
        l3a = gauche(self.t("C'est la petite", 40, AIG_H), XL, -1.55)
        l3b = gauche(self.t("qui donne l'heure.", 40, VERT_OK), XL, -2.3)
        l3 = VGroup(l3a, l3b)
        self.au_mot("C'est la petite")
        self.play(FadeIn(l3a, shift=UP * 0.1), run_time=0.35)
        self.au_mot("qui donne")
        self.play(FadeIn(l3b, shift=UP * 0.1), run_time=0.35)
        self.play(Circumscribe(l3, color=VERT_OK, buff=0.1), Indicate(hg.aig_h, color=AIG_H, scale_factor=1.3),
                  run_time=0.8)
        self.attendre_voix()

    # ── 03 : lire 3 heures ──────────────────────────────────────────────────
    def lire(self, cle, h, cote_h=-4.3, xl=-1.6, autre=False):
        """L'écran « je lis l'heure » : horloge d'un côté, les phrases de l'autre."""
        self.ecran(cle)
        hg = hl(1.6, h, 0).move_to(P(cote_h, -0.15))
        if autre:
            tit = self.t("Une autre horloge", 46, JAUNE_TITRE).move_to(P(0, 3.15))
            self.au_mot("Une autre horloge")
            self.play(FadeIn(tit, shift=UP * 0.15), FadeIn(hg, shift=LEFT * 0.4), run_time=0.5)
            mot_p = "La petite aiguille"
        else:
            tit = self.t("Je lis l'heure", 46, JAUNE_TITRE).move_to(P(0, 3.15))
            self.add(hors_audit(tit), hg)
            l0 = gauche(self.ligne([("Regarde", WHITE), ("la petite aiguille.", AIG_H)], 36, buff=0.2), xl, 1.9)
            self.au_mot("Regarde la petite")
            self.play(FadeIn(l0, shift=UP * 0.1), Indicate(hg.aig_h, color=JAUNE_TITRE, scale_factor=1.3),
                      run_time=0.55)
            mot_p = "Elle est sur"
        y1 = 0.75 if not autre else 1.9
        l1 = gauche(self.ligne([("La petite aiguille" if autre else "Elle", AIG_H), (f"est sur le {h}.", WHITE)],
                               36, buff=0.2), xl, y1)
        c1 = entoure(hg, h, AIG_H)
        self.au_mot(mot_p)
        if autre:
            self.play(Indicate(hg.aig_h, color=JAUNE_TITRE, scale_factor=1.3), run_time=0.45)
        self.au_mot(f"sur le {h}")
        self.play(FadeIn(l1, shift=UP * 0.1), Create(c1), run_time=0.45)
        l2 = gauche(self.ligne([("La grande", AIG_M), ("est sur le 12.", WHITE)], 36, buff=0.2), xl, y1 - 1.15)
        c2 = entoure(hg, 12, AIG_M)
        self.au_mot("La grande")
        self.play(Indicate(hg.aig_m, color=JAUNE_TITRE, scale_factor=1.2), run_time=0.4)
        self.au_mot("sur le 12")
        self.play(FadeIn(l2, shift=UP * 0.1), Create(c2), run_time=0.45)
        if autre:
            res = gauche(self.t(f"Il est {h} heures.", 50, VERT_OK), xl, y1 - 2.6)
            self.au_mot(f"Il est {h}")
        else:
            res = gauche(self.ligne([("Alors il est", WHITE), (f"{h} heures pile.", VERT_OK)], 42, buff=0.4),
                         xl, y1 - 2.6)
            self.au_mot("Alors il est")
        self.play(FadeIn(res, scale=1.15), run_time=0.45)
        self.insister(res if autre else res[1], 1.15, 0.25)
        self.attendre_voix()

    def ecran_lire(self):
        self.lire("03-lire", 3)

    def ecran_encore(self):
        self.lire("04-encore", 8, cote_h=4.0, xl=-6.2, autre=True)

    # ── 05 : QUESTION 1 (réponse B) ─────────────────────────────────────────
    def question(self, cle_q, cle_r, h, choix, bonne, phrase):
        self.clear()
        self.add_mascotte()
        hg = hl(1.2, h, 0).move_to(P(-3.6, 1.35))
        self.add(hg)
        c = entoure(hg, h, AIG_H)

        def autres_r(sc):
            sc.rep(0, avec=[Create(c)])
            sc.rep_fin()

        self.question_gauche(cle_q, cle_r,
                             [f"La petite aiguille est sur le {h}.", "La grande est sur le 12.",
                              "Quelle heure est-il ?"],
                             [self.choix(x) for x in choix], bonne, phrase, -0.75, mot_q="La petite aiguille",
                             autres_r=autres_r)

    def ecran_question1(self):
        self.question("05-question", "05b-reponse", 5, ["12 heures", "5 heures", "6 heures"], 1,
                      ["La petite aiguille est sur le 5.", "Il est 5 heures."])

    # ── 06 : le piège (la grande se voit mieux) ─────────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        self.au_mot("Attention")
        tit = gauche(self.t("Attention au piège !", 46, ROUGE_ERREUR), -6.2, 3.05)
        self.play(Write(tit), run_time=0.35)
        hg = hl(1.6, 4, 0).move_to(P(4.0, -0.1))
        self.add(hg)
        XL = -6.2
        l0 = gauche(self.ligne([("La grande aiguille", AIG_M), ("se voit mieux.", WHITE)], 38, buff=0.2), XL, 1.8)
        self.au_mot("La grande aiguille se voit")
        self.play(FadeIn(l0, shift=UP * 0.1), hg.aig_m.animate.set_stroke(width=6), run_time=0.4)
        self.insister(hg.aig_m, 1.2, 0.3)
        l1 = gauche(self.ligne([("Mais elle ne donne pas", WHITE), ("l'heure.", ROUGE_ERREUR)], 38, buff=0.2),
                    XL, 0.65)
        self.au_mot("Mais elle ne donne")
        croix = VGroup(Line(P(-0.35, -0.35), P(0.35, 0.35)), Line(P(-0.35, 0.35), P(0.35, -0.35)))
        croix.set_stroke(ROUGE_ERREUR, 8).move_to(bout_aiguille(hg, "m", 0.55) + RIGHT * 0.55)
        self.play(FadeIn(l1, shift=UP * 0.1), Create(croix), run_time=0.45)
        l2 = gauche(self.ligne([("Sur le 12,", AIG_M), ("elle dit seulement :", WHITE)], 38, buff=0.2), XL, -0.5)
        c12 = entoure(hg, 12, AIG_M)
        self.au_mot("Sur le 12")
        self.play(FadeIn(l2, shift=UP * 0.1), Create(c12), FadeOut(croix), run_time=0.45)
        l3 = gauche(self.t("heure pile.", 46, VERT_OK), XL, -1.65)
        self.au_mot("heure pile")
        self.play(FadeIn(l3, scale=1.2), run_time=0.4)
        self.insister(l3, 1.15, 0.25)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (réponse A) ─────────────────────────────────────────
    def ecran_question2(self):
        self.question("07-question", "07b-reponse", 10, ["10 heures", "12 heures", "11 heures"], 0,
                      ["On lit la petite aiguille :", "elle est sur le 10.", "Il est 10 heures."])

    # ── 08 : le défi (7 heures) ─────────────────────────────────────────────
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
        l0 = gauche(self.t("Rose répare une pendule.", 38), XL, 2.0)
        pend = VGroup(RoundedRectangle(width=2.9, height=4.6, corner_radius=0.3, fill_color="#78350f",
                                       fill_opacity=1, stroke_color="#facc15", stroke_width=4),
                      Line(P(0, -0.6), P(0, -1.75), color="#facc15", stroke_width=5),
                      Circle(radius=0.3, fill_color="#facc15", fill_opacity=1, stroke_width=0).move_to(P(0, -1.8)))
        pend.move_to(P(3.3, -0.35))
        hg = hl(1.15, 7, 0).move_to(pend[0].get_top() + DOWN * 1.45)
        self.au_mot("Rose répare")
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(pend, shift=UP * 0.3), FadeIn(hg, shift=UP * 0.3),
                  run_time=0.5)
        self.play(Rotate(VGroup(pend[1], pend[2]), 0.25, about_point=P(3.3, -0.95)), run_time=0.4)
        l1 = gauche(self.ligne([("La petite aiguille", AIG_H), ("est sur le 7.", WHITE)], 38, buff=0.2), XL, 0.9)
        self.au_mot("sur le 7")
        self.play(FadeIn(l1, shift=UP * 0.1), Indicate(hg.aig_h, color=JAUNE_TITRE, scale_factor=1.3), run_time=0.45)
        l2 = gauche(self.ligne([("La grande", AIG_M), ("est sur le 12.", WHITE)], 38, buff=0.2), XL, -0.2)
        self.au_mot("sur le 12")
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.35)
        q = gauche(self.t("Quelle heure est-il ?", 40, JAUNE_TITRE), XL, -1.4)
        self.au_mot("Quelle heure")
        self.play(FadeIn(q, shift=UP * 0.15), Circumscribe(hg, color=JAUNE_TITRE, shape=Circle, buff=0.05),
                  run_time=0.6)
        self.pause_gauche(y=-2.55)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        hg = hl(1.6, 7, 0).move_to(P(4.0, -0.2))
        self.play(FadeIn(hg, scale=0.85), run_time=0.4)
        XL = -6.2
        l0 = gauche(self.ligne([("On cherche", WHITE), ("la petite aiguille.", AIG_H)], 38, buff=0.2), XL, 1.95)
        self.au_mot("On cherche")
        self.play(FadeIn(l0, shift=UP * 0.1), Indicate(hg.aig_h, color=JAUNE_TITRE, scale_factor=1.3), run_time=0.5)
        l1 = gauche(self.ligne([("Elle", AIG_H), ("est sur le 7.", WHITE)], 38, buff=0.2), XL, 0.85)
        self.au_mot("sur le 7")
        self.play(FadeIn(l1, shift=UP * 0.1), Create(entoure(hg, 7, AIG_H)), run_time=0.45)
        l2 = gauche(self.ligne([("La grande", AIG_M), ("est sur le 12 :", WHITE)], 38, buff=0.2), XL, -0.25)
        self.au_mot("sur le 12")
        self.play(FadeIn(l2, shift=UP * 0.1), Create(entoure(hg, 12, AIG_M)), run_time=0.45)
        l3 = gauche(self.t("c'est l'heure pile.", 38), XL, -1.2)
        self.au_mot("c'est l'heure pile")
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.35)
        res = gauche(self.t("Il est 7 heures.", 50, VERT_OK), XL, -2.4)
        self.au_mot("Il est 7")
        self.play(FadeIn(res, scale=1.2), run_time=0.4)
        self.insister(res, 1.15, 0.25)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        h = hl(1.45, 3, 0)
        fig = hors_audit(VGroup(h))
        lignes = self.finale_gauche(fig, textes=[
            ("La petite aiguille", "donne l'heure."),
            ("On lit le nombre", "qu'elle montre."),
            ("La grande sur le 12,", "c'est l'heure pile.")], fs=34, x_fig=-4.2, xl=-1.2)
        self.add(fig)
        self.au_mot("La petite aiguille")
        self.montrer_ligne(lignes[0], Indicate(h.aig_h, color=JAUNE_TITRE, scale_factor=1.3))
        self.au_mot("On lit le nombre")
        self.montrer_ligne(lignes[1], Create(entoure(h, 3, AIG_H)))
        self.au_mot("La grande sur le 12")
        self.montrer_ligne(lignes[2], Create(entoure(h, 12, AIG_M)))
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_aiguilles()
        self.ecran_lire()
        self.ecran_encore()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")


class TestHorlogeCP(PaysageDureeCP):
    def construct(self):
        h1 = hl(1.6, 3, 0).move_to(P(-4.3, 0))
        h2 = hl(1.15, 7, 0).move_to(P(0, 0))
        h3 = hl(0.55, 10, 0).move_to(P(3.5, 0))
        self.add(h1, h2, h3, entoure(h1, 12, AIG_M), entoure(h1, 3, AIG_H), entoure(h2, 7, AIG_H), entoure(h2, 12, AIG_M))


class DureeLireHeureCP(DureeLireHeureBase):
    identite = "Maths CP — EleveAI"
    ceinture = "blanche"
