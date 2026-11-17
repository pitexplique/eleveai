# duree_defi.py
# EleveAI — Maths CP — série « Durées » (CP → 6e) : DÉFI SUR L'HEURE (midi, l'horloge qui avance ou retarde, 2 tours par jour)
# (micro cp_duree_defi, notion duree), AVEC VOIX. Paysage 16:9, CEINTURE BLANCHE.
# Décor et métier : Tom, PÂTISSIER (ses gâteaux sortent du four à midi).
# Questions 05 (midi : les 2 aiguilles sur le 12, A) et 07 (l'horloge avance de 1 h, montre 5 h : 4 h, B),
# défi 08 (la pendule retarde de 1 h, montre 2 h : 3 h).
# Voix : manim/voix/cp-duree-defi.json (validée le 17/11, Julie, débit −6) ;
# marques : duree_defi_marques.json (python manim/scripts/cp/duree_marques.py defi).
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/cp/duree_defi.py DureeDefiCP
# python -m manim render -qh --disable_caching manim/scripts/cp/duree_defi.py DureeDefiCP -o eleveai-maths-cp-duree-defi --media_dir manim/scripts/cp/media-duree-defi
# Sortie : manim/sorties/cp/maths/duree/05-defi/eleveai-maths-cp-duree-defi.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from duree_cp_commun import *  # noqa: E402,F403
from duree_ordonner import bande  # noqa: E402  (la bande des heures 1 à 12)

AVANCE = "#fb923c"   # l'horloge qui avance
RETARD = "#a5b4fc"   # l'horloge qui retarde


def four(s=1.0):
    """Le four du pâtissier : une caisse grise, une vitre orange, deux boutons."""
    caisse = RoundedRectangle(width=1.8, height=1.5, corner_radius=0.12, fill_color="#64748b", fill_opacity=1, stroke_width=0)
    vitre = RoundedRectangle(width=1.3, height=0.8, corner_radius=0.08, fill_color="#f97316", fill_opacity=0.85,
                             stroke_color="#1e293b", stroke_width=5).move_to(P(0, -0.2))
    bout = VGroup(*[Circle(radius=0.08, fill_color="#e2e8f0", fill_opacity=1, stroke_width=0).move_to(P(x, 0.5))
                    for x in (-0.45, 0.45)])
    return VGroup(caisse, vitre, bout).scale(s)


def gateau(s=1.0):
    """Un gâteau : un étage marron, un glaçage rose, une cerise."""
    base = Rectangle(width=1.0, height=0.4, fill_color="#92400e", fill_opacity=1, stroke_width=0)
    glace = RoundedRectangle(width=1.06, height=0.18, corner_radius=0.08, fill_color="#f9a8d4", fill_opacity=1,
                             stroke_width=0).move_to(P(0, 0.22))
    cerise = Circle(radius=0.09, fill_color="#dc2626", fill_opacity=1, stroke_width=0).move_to(P(0, 0.4))
    return VGroup(base, glace, cerise).scale(s)


class DureeDefiBase(PaysageDureeCP):
    nom_voix = "cp-duree-defi"
    fichier_marques = "duree_defi_marques.json"
    ceinture = "blanche"

    def recule(self, hg, run_time=0.8):
        """La petite aiguille recule d'une heure (sens inverse des aiguilles d'une montre)."""
        hg._ang["h"] += TAU / 12
        return Rotate(hg.aig_h, TAU / 12, about_point=hg.centre(), run_time=run_time)

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Défi sur l'heure", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Défi")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q0 = self.t("À midi,", 38, JAUNE_TITRE)
        q1 = self.t("où sont les 2 aiguilles ?", 38)
        q = VGroup(q0, q1).arrange(DOWN, aligned_edge=LEFT, buff=0.3)
        q.move_to(P(0, 0.35)).align_to(P(-6.2, 0), LEFT)
        hg = hl(1.05, 12, 0).move_to(P(4.6, 0.35))
        sans_aiguille(hg, "h")
        sans_aiguille(hg, "m")
        pq = Text("?", font_size=60, color=JAUNE_TITRE, weight=BOLD).move_to(hg.centre())
        self.au_mot("À midi")
        self.play(FadeIn(q0, shift=UP * 0.2), FadeIn(hg, scale=0.8), run_time=0.4)
        self.au_mot("où sont")
        self.play(FadeIn(q1, shift=UP * 0.2), FadeIn(hors_audit(pq), scale=1.3), run_time=0.4)
        self.attendre_voix(marge=0.6)

    # ── 01 : Tom, pâtissier ─────────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pe = tom(0.95).move_to(P(-4.85, -0.2))
        self.au_mot("Voici Tom")
        nom = self.t("Tom", 42, JAUNE_TITRE).next_to(pe, UP, buff=0.95)
        self.play(FadeIn(pe, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("Il est pâtissier")
        met = self.t("pâtissier", 28, JAUNE_TITRE).next_to(pe, DOWN, buff=0.12)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.35)
        XL = -2.9
        fo = four(1.1).move_to(P(-0.9, -1.5))
        ga = gateau(0.9).move_to(P(-0.9, -0.35))
        l0 = gauche(self.ligne([("Ses gâteaux sortent du four", WHITE), ("à midi.", JAUNE_TITRE)], 36, buff=0.2), XL, 2.95)
        self.au_mot("Ses gâteaux")
        self.play(FadeIn(l0[0], shift=UP * 0.1), FadeIn(fo, shift=UP * 0.3), run_time=0.45)
        self.au_mot("à midi")
        self.play(FadeIn(l0[1], scale=1.15), FadeIn(ga, shift=UP * 0.3), run_time=0.4)
        hg = hl(1.3, 10, 0).move_to(P(3.7, -0.7))
        l1 = gauche(self.t("Tom regarde l'horloge", 36), XL, 2.1)
        l2 = gauche(self.t("de sa pâtisserie.", 36), XL, 1.5)
        self.au_mot("Tom regarde")
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(hg, scale=0.8), run_time=0.4)
        self.au_mot("de sa pâtisserie")
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.35)
        self.attendre_voix()

    # ── 02 : midi ───────────────────────────────────────────────────────────
    def ecran_midi(self):
        self.ecran("02-midi")
        tit = self.t("Midi", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        hg = hl(1.6, 10, 0).move_to(P(-4.3, -0.2))
        self.add(hg)
        self.au_mot("Midi")
        self.play(FadeIn(tit, shift=UP * 0.15), run_time=0.35)
        XL = -1.6
        l0 = gauche(self.ligne([("C'est", WHITE), ("12 heures pile.", JAUNE_TITRE)], 38, buff=0.2), XL, 1.9)
        self.au_mot("12 heures pile")
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.4)
        l1 = gauche(self.ligne([("La petite aiguille", AIG_H), ("est sur le 12.", WHITE)], 38, buff=0.2), XL, 0.85)
        self.au_mot("La petite aiguille")
        self.play(FadeIn(l1[0], shift=UP * 0.1), pointer(hg, "h", 12, run_time=1.0), run_time=1.0)
        self.au_mot("est sur le 12")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.35)
        l2 = gauche(self.ligne([("La grande", AIG_M), ("aussi est sur le 12.", WHITE)], 38, buff=0.2), XL, -0.2)
        self.au_mot("La grande aussi")
        self.play(FadeIn(l2, shift=UP * 0.1), Indicate(hg.aig_m, color=JAUNE_TITRE, scale_factor=1.15), run_time=0.45)
        l3 = gauche(self.t("Les 2 aiguilles sont", 38), XL, -1.25)
        l4 = gauche(self.t("l'une sur l'autre.", 38, VERT_OK), XL, -1.9)
        self.au_mot("Les 2 aiguilles")
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.35)
        self.au_mot("l'une sur l'autre")
        self.play(FadeIn(l4, scale=1.1), Create(entoure(hg, 12, VERT_OK)), run_time=0.45)
        self.attendre_voix()

    # ── 03 : l'horloge qui avance ou qui retarde ────────────────────────────
    def ecran_avance(self):
        self.ecran("03-avance")
        hv = hl(1.0, 3, 0).move_to(P(0, 1.05))
        ev = self.t("la vraie heure", 30, VERT_OK).next_to(hv, DOWN, buff=0.2)
        ha = hl(1.0, 4, 0).move_to(P(4.3, 1.05))
        hr = hl(1.0, 2, 0).move_to(P(-4.3, 1.05))
        ta = self.t("1 heure de plus", 30, AVANCE).next_to(ha, DOWN, buff=0.2)
        tr = self.t("1 heure de moins", 30, RETARD).next_to(hr, DOWN, buff=0.2)
        l0 = self.ligne([("Une horloge peut", WHITE), ("avancer.", AVANCE)], 38, buff=0.2).move_to(P(0, -2.1))
        self.au_mot("Une horloge peut avancer")
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(ha, scale=0.85), run_time=0.45)
        self.au_mot("1 heure de plus")
        self.play(FadeIn(ta, scale=1.15), Indicate(ha.aig_h, color=JAUNE_TITRE, scale_factor=1.3), run_time=0.45)
        self.au_mot("la vraie heure")
        self.play(FadeIn(hv, scale=0.85), FadeIn(ev), run_time=0.4)
        l1 = self.ligne([("Une horloge peut aussi", WHITE), ("retarder.", RETARD)], 38, buff=0.2).move_to(P(0, -2.1))
        self.au_mot("Une horloge peut aussi")
        self.play(FadeOut(l0), FadeIn(l1, shift=UP * 0.1), FadeIn(hr, scale=0.85), run_time=0.45)
        self.au_mot("1 heure de moins")
        self.play(FadeIn(tr, scale=1.15), Indicate(hr.aig_h, color=JAUNE_TITRE, scale_factor=1.3), run_time=0.45)
        self.attendre_voix()

    # ── 04 : 2 tours par jour ───────────────────────────────────────────────
    def ecran_deux_tours(self):
        self.ecran("04-deux-tours")
        hg = hl(1.3, 12, 0).move_to(P(4.9, 0.3))
        self.add(hg)
        XL = -6.2
        l0 = gauche(self.ligne([("Une journée a", WHITE), ("24 heures.", JAUNE_TITRE)], 40, buff=0.2), XL, 2.3)
        self.au_mot("Une journée a")
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.4)
        l1 = gauche(self.ligne([("Le cadran n'a que", WHITE), ("12 nombres.", JAUNE_TITRE)], 40, buff=0.2), XL, 1.2)
        self.au_mot("Le cadran")
        self.play(FadeIn(l1, shift=UP * 0.1), Indicate(hg.cadran, color=JAUNE_TITRE, scale_factor=1.05), run_time=0.5)
        l2 = gauche(self.t("Alors la petite aiguille fait", 40), XL, 0.1)
        l3 = gauche(self.t("2 tours par jour.", 46, VERT_OK), XL, -0.75)
        self.au_mot("Alors la petite")
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.35)
        self.au_mot("2 tours")
        self.play(FadeIn(l3, scale=1.15), Rotate(hg.aig_h, -2 * TAU, about_point=hg.centre()), run_time=2.0)
        self.attendre_voix()

    # ── 05 / 07 : questions ─────────────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        hg = hl(1.2, 12, 0).move_to(P(-3.6, 1.35))
        ah = sans_aiguille(hg, "h")
        am = sans_aiguille(hg, "m")
        self.add(hg)

        def autres_r(sc):
            sc.rep(0)
            sc.rep(1, avec=[GrowFromPoint(am, hg.centre()), GrowFromPoint(ah, hg.centre())])
            sc.add(hg.pivot)
            sc.rep_fin()

        xl0 = self.XL
        self.XL = -1.0   # un choix long : une colonne plus large
        try:
            self.question_gauche("05-question", "05b-reponse", ["À midi, où sont les aiguilles ?"],
                                 [self.choix("les 2 sur le 12"),
                                  VGroup(self.choix("la petite sur le 12,"), self.choix("la grande sur le 6")).arrange(
                                      DOWN, aligned_edge=LEFT, buff=0.1),
                                  self.choix("les 2 sur le 6")], 0,
                                 ["Midi, c'est 12 heures pile.", "Les 2 aiguilles sont sur le 12."], -1.75,
                                 mot_q="À midi", autres_r=autres_r)
        finally:
            self.XL = xl0

    # ── 06 : le piège (l'horloge avance : on recule) ────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        self.au_mot("Attention")
        tit = gauche(self.t("Attention au piège !", 46, ROUGE_ERREUR), -6.2, 3.05)
        self.play(Write(tit), run_time=0.35)
        l0 = gauche(self.ligne([("Quand l'horloge", WHITE), ("avance,", AVANCE)], 38, buff=0.2), -6.2, 2.05)
        l1 = gauche(self.ligne([("la vraie heure est", WHITE), ("plus tôt.", VERT_OK)], 38, buff=0.2), -6.2, 1.35)
        self.au_mot("Quand l'horloge")
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.4)
        self.au_mot("la vraie heure")
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.4)
        b = bande().move_to(P(-0.3, -0.2))
        self.play(FadeIn(b), run_time=0.4)
        l2 = gauche(self.ligne([("Alors on recule", WHITE), ("de 1 heure.", VERT_OK)], 40, buff=0.2), -6.2, -1.6)
        self.au_mot("Alors on recule")
        f = CurvedArrow(b.cases[7].get_bottom() + DOWN * 0.05, b.cases[6].get_bottom() + DOWN * 0.05, angle=-PI / 2,
                        color=VERT_OK, stroke_width=5)
        self.play(FadeIn(l2[0], shift=UP * 0.1), b.cases[7][0].animate.set_stroke(AVANCE, width=7), run_time=0.4)
        self.au_mot("de 1 heure")
        self.play(FadeIn(l2[1], scale=1.15), Create(f), b.cases[6][0].animate.set_stroke(VERT_OK, width=7), run_time=0.45)
        self.attendre_voix()

    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        hg = hl(1.2, 5, 0).move_to(P(-3.6, 1.35))
        self.add(hg)

        def autres_r(sc):
            sc.rep(0)
            sc.rep(1, avec=[self.recule(hg)])
            sc.rep(2, avec=[Create(entoure(hg, 4, VERT_OK))])
            sc.rep_fin()

        self.question_gauche("07-question", "07b-reponse",
                             ["L'horloge de Tom avance", "de 1 heure. Elle montre", "5 heures. Quelle est", "la vraie heure ?"],
                             [self.choix(x) for x in ["6 heures", "4 heures", "5 heures"]], 1,
                             ["L'horloge avance :", "on recule de 1 heure.", "Il est 4 heures."], -0.75,
                             mot_q="L'horloge de Tom", autres_r=autres_r)

    # ── 08 : le défi (la pendule retarde) ───────────────────────────────────
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
        fo = four(1.0).move_to(P(0.9, -2.4))
        hg = hl(0.9, 2, 0).move_to(P(3.6, -1.9))
        l0 = gauche(self.ligne([("La pendule du four", WHITE), ("retarde de 1 heure.", RETARD)], 38, buff=0.2), XL, 1.95)
        self.au_mot("La pendule du four")
        self.play(FadeIn(l0[0], shift=UP * 0.1), FadeIn(fo, shift=UP * 0.3), FadeIn(hg, scale=0.85), run_time=0.45)
        self.au_mot("retarde de 1 heure")
        self.play(FadeIn(l0[1], scale=1.1), run_time=0.4)
        l1 = gauche(self.ligne([("Elle montre", WHITE), ("2 heures.", JAUNE_TITRE)], 38, buff=0.2), XL, 1.15)
        self.au_mot("Elle montre")
        self.play(FadeIn(l1, shift=UP * 0.1), Indicate(hg.aig_h, color=JAUNE_TITRE, scale_factor=1.3), run_time=0.45)
        q = gauche(self.t("Quelle est la vraie heure ?", 40, JAUNE_TITRE), XL, 0.0)
        self.au_mot("Quelle est")
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.4)
        self.pause_gauche(y=-0.95)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        hg = hl(1.4, 2, 0).move_to(P(4.1, -0.1))
        self.play(FadeIn(hg, scale=0.85), run_time=0.4)
        XL = -6.2
        l0 = gauche(self.ligne([("La pendule retarde :", RETARD), ("elle est en retard.", WHITE)], 36, buff=0.2), XL, 1.95)
        self.au_mot("La pendule retarde")
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.4)
        l1 = gauche(self.ligne([("Alors on avance", WHITE), ("de 1 heure.", VERT_OK)], 40, buff=0.2), XL, 1.05)
        self.au_mot("Alors on avance")
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.4)
        l2 = gauche(self.ligne([("Après 2", WHITE), ("vient 3.", VERT_OK)], 42, buff=0.2), XL, 0.0)
        self.au_mot("Après 2")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("vient 3")
        self.play(FadeIn(l2[1], scale=1.15), pointer(hg, "h", 3, run_time=0.8), run_time=0.8)
        l3 = gauche(self.ligne([("Il est", WHITE), ("3 heures.", VERT_OK)], 46, buff=0.2), XL, -1.1)
        self.au_mot("Il est 3 heures")
        self.play(FadeIn(l3, scale=1.15), Create(entoure(hg, 3, VERT_OK)), run_time=0.45)
        self.insister(l3[1], 1.15, 0.22)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        h = hl(1.45, 12, 0)
        fig = hors_audit(VGroup(h))
        lignes = self.finale_gauche(fig, textes=[
            ("À midi, les 2 aiguilles", "sont sur le 12."),
            ("Si l'horloge avance, on recule.", "Si elle retarde, on avance."),
            ("La petite aiguille fait", "2 tours par jour.")], fs=34, x_fig=-4.6, xl=-2.0)
        self.add(fig)
        self.au_mot("À midi")
        self.montrer_ligne(lignes[0], Create(entoure(h, 12, VERT_OK)))
        self.au_mot("Si l'horloge")
        self.montrer_ligne(lignes[1], Indicate(h.aig_h, color=JAUNE_TITRE, scale_factor=1.2))
        self.au_mot("La petite aiguille")
        self.montrer_ligne(lignes[2], Rotate(h.aig_h, -TAU, about_point=h.centre()))
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_midi()
        self.ecran_avance()
        self.ecran_deux_tours()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")


class DureeDefiCP(DureeDefiBase):
    identite = "Maths CP — EleveAI"
    ceinture = "blanche"
