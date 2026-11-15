# volume_compter.py
# EleveAI — Maths 6e — série « Volume et solides », épisode V2 : COMPTER DES VOLUMES
# (micro volume_compter ; aussi branchée depuis cm1-solides-defi), notion volume_solide.
# Paysage 16:9, CEINTURE VERTE, avec voix (manim/voix/6e-volume-compter.json, validée le 15/11, Julie, débit −6).
# Short jumeau : film Ti Margo (le bloc de sucres 4 × 2 × 3 = 24 : réponse C).
# Métier : Yanis, LOGISTICIEN (remorque de 8 × 4 × 3 = 96 cartons) ; centres : transports.
# Mapping micro → écrans : volume_compter → 02 (une couche : 3 × 2 = 6), 03 (2 couches : 6 × 2 = 12 cm³),
# 04 (longueur × largeur × hauteur), 06 (piège : les cubes cachés) ; questions 05 (3 couches de 5 → 15, rép. C)
# et 07 (cube d'arête 3 cm → 27 cm³, rép. B) ; défi 08 (remorque 8 × 4 × 3 = 96 cartons).
# Audit : bash <notes>/outils/dry.sh volume_compter VolumeCompter6e
# HD : bash <notes>/outils/hd.sh volume_compter VolumeCompter6e eleveai-maths-6e-volume-compter manim/sorties/6e/maths/volume/02-compter
# Sortie : manim/sorties/6e/maths/volume/02-compter/eleveai-maths-6e-volume-compter.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from volume_6e_commun import *  # noqa: E402,F403

HAUT_C = "#facc15"   # la 2e couche (jaune), pour distinguer les couches
TROIS_C = "#86efac"  # une 3e couche (vert clair)


def couche(emp, y):
    """Les cubes de l'étage y d'un Empilement (dans l'ordre de dessin)."""
    return VGroup(*[c for q, c in emp.cubes.items() if q[1] == y])


def remorque(emp, L, H, Pr):
    """La remorque de Yanis autour d'un Empilement L × H × Pr : contour en pointillés, cabine, roues."""
    boite = emp.boite(L, H, Pr, couleur="#e5e7eb", sw=3)
    e = emp.e
    x1 = emp.pp((L, 0, 0))
    cab = VGroup(
        RoundedRectangle(width=1.5 * e * 2, height=2.2 * e, corner_radius=0.12, fill_color="#dc2626",
                         fill_opacity=1, stroke_color=WHITE, stroke_width=2),
        RoundedRectangle(width=1.0 * e * 2, height=0.8 * e, corner_radius=0.06, fill_color="#bae6fd",
                         fill_opacity=1, stroke_width=0))
    cab[0].move_to(x1 + P(1.6 * e, 1.1 * e))
    cab[1].move_to(cab[0].get_center() + P(0.15 * e, 0.45 * e))
    roues = VGroup(*[Circle(radius=0.32 * e * 1.4, fill_color="#111827", fill_opacity=1, stroke_color="#9ca3af",
                            stroke_width=3).move_to(emp.pp((x, 0, 0)) + P(0, -0.35 * e)) for x in (1, 2.4)],
                   Circle(radius=0.32 * e * 1.4, fill_color="#111827", fill_opacity=1, stroke_color="#9ca3af",
                          stroke_width=3).move_to(cab[0].get_bottom() + P(0, -0.1 * e)))
    return boite, cab, roues


class VolumeCompterBase(PaysageVolume6e):
    nom_voix = "6e-volume-compter"
    fichier_marques = "volume_compter_marques.json"

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Compter des volumes", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Compter des volumes")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.8)
        self.au_mot("Comment compter")
        q = self.bloc(["Comment compter les cubes", "d'un pavé, sans les compter", "un par un ?"], 36, JAUNE_TITRE)
        gauche(q, -6.2, 0.6)
        emp = Empilement(pave_cubes(3, 2, 2), e=0.6, centre=P(4.3, 0.6),
                         couleurs={q_: HAUT_C for q_ in pave_cubes(3, 2, 2) if q_[1] == 1})
        self.play(FadeIn(q, shift=UP * 0.1), LaggedStart(*[FadeIn(c, shift=DOWN * 0.2) for c in emp],
                                                        lag_ratio=0.06), run_time=0.8)
        self.add(emp)
        self.attendre_voix(marge=0.6)

    # ── 01 : la situation ───────────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        yp = yanis(1.0).move_to(P(-5.3, 0.6))
        self.au_mot("Voici Yanis")
        nom = self.t("Yanis", 40, BLEU_CALCUL).next_to(yp, UP, buff=0.2)
        self.play(FadeIn(yp, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("Il est logisticien")
        met = self.t("logisticien", 28, BLEU_CALCUL).next_to(yp, DOWN, buff=0.2)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.35)
        emp = Empilement(pave_cubes(6, 2, 3), e=0.62, centre=P(0.4, 1.35), couleur=CARTON, trait="#78350f")
        boite, cab, roues = remorque(emp, 6, 2, 3)
        self.au_mot("il organise le chargement")
        self.play(Create(boite), FadeIn(cab, shift=LEFT * 0.3), FadeIn(roues), run_time=0.6)
        fond = [q for q in pave_cubes(6, 2, 3) if q[2] == 2 or (q[2] == 1 and q[0] < 3 and q[1] == 0)]
        fond = sorted(fond, key=lambda q: (-q[2], q[1], q[0]))
        self.au_mot("il range des cartons")
        self.play(LaggedStart(*[FadeIn(emp.cubes[q], shift=DOWN * 0.3) for q in fond], lag_ratio=0.12),
                  run_time=1.2)
        self.au_mot("Combien de cartons vont tenir")
        q = self.t("Combien de cartons vont tenir ?", 38, JAUNE_TITRE)
        gauche(q, -3.6, -1.15)
        self.play(FadeIn(q, shift=UP * 0.1), Indicate(boite, color=JAUNE_TITRE, scale_factor=1.02), run_time=0.5)
        self.au_mot("Il ne va pas les compter")
        l2 = self.t("Il ne va pas les compter un par un !", 32, ORANGE_RETENUE)
        gauche(l2, -3.6, -2.0)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.4)
        self.attendre_voix()

    # ── 02 : une couche ─────────────────────────────────────────────────────
    def figure_boite(self):
        emp = Empilement(pave_cubes(3, 2, 2), e=1.0, centre=P(-3.4, -0.3),
                         couleurs={q: HAUT_C for q in pave_cubes(3, 2, 2) if q[1] == 1})
        boite = emp.boite(3, 2, 2, couleur="#e5e7eb", sw=3)
        c3 = fleche_cote(emp.pp((0, 0, 0)) + DOWN * 0.25, emp.pp((3, 0, 0)) + DOWN * 0.25, "3 cubes", 28, LONG_C,
                         DOWN, 0.12)
        a, b = emp.pp((3, 0, 0)), emp.pp((3, 0, 2))
        c2 = fleche_cote(a + P(0.25, -0.12), b + P(0.25, -0.12), "2 cubes", 28, LONG_C, RIGHT, 0.12)
        return emp, boite, c3, c2

    def ecran_couche(self):
        self.ecran("02-couche")
        self.au_mot("L'idée")
        tit = self.t("L'idée : compter par couches.", 40, JAUNE_TITRE)
        gauche(tit, -6.2, 3.05)
        self.play(Write(tit), run_time=0.45)
        emp, boite, c3, c2 = self.figure_boite()
        self.au_mot("Voici une boîte")
        self.play(Create(boite), run_time=0.5)
        self.aux_extraits([c3, c2], ["3 cubes de long", "2 cubes de large"], run_time=0.3)
        self.au_mot("Au fond, une couche")
        l1 = self.t("Au fond : une couche", 34)
        self.col(l1, 1.3)
        bas = couche(emp, 0)
        self.play(FadeIn(l1, shift=UP * 0.1),
                  LaggedStart(*[FadeIn(c, shift=DOWN * 0.4) for c in bas], lag_ratio=0.12), run_time=0.8)
        lg = self.ligne([("3 × 2", BLEU_CALCUL), ("= 6 cubes", VERT_OK)], 48, buff=0.25)
        self.col(lg, 0.3)
        hors_audit(lg[0])  # 3 et 2 sont déjà dits (« 3 cubes de long et 2 cubes de large »)
        self.aux_extraits(lg, ["3 fois 2", "6 cubes"])
        self.play(Indicate(bas, color=VOL_C, scale_factor=1.04), run_time=0.4)
        self.attendre_voix()

    # ── 03 : multiplier par le nombre de couches ────────────────────────────
    def ecran_multiplier(self):
        self.ecran("03-multiplier")
        emp, boite, c3, c2 = self.figure_boite()
        for c in (c3, c2):
            hors_audit(c)
        bas, haut = couche(emp, 0), couche(emp, 1)
        self.add(boite, bas, c3, c2)
        tit = self.t("La boîte a 2 couches pareilles.", 40, JAUNE_TITRE)
        gauche(tit, -6.2, 3.05)
        haut.shift(UP * 1.6)
        self.aux_extraits([tit], ["2 couches pareilles"], run_time=0.35)
        self.play(FadeIn(haut), run_time=0.25)
        self.play(haut.animate.shift(DOWN * 1.6), run_time=0.6, rate_func=rate_functions.ease_in_quad)
        l1 = self.t("6 cubes par couche,", 34)
        self.col(l1, 1.8)
        l2 = self.t("2 couches :", 34)
        self.col(l2, 1.15)
        lg = self.ligne([("6 × 2", BLEU_CALCUL), ("= 12 cubes", VERT_OK)], 46, buff=0.25)
        self.col(lg, 0.3)
        hors_audit(l2)
        hors_audit(lg[0])
        self.aux_extraits([l1], ["6 cubes par couche"])
        self.play(Indicate(bas, color=VOL_C, scale_factor=1.04), run_time=0.35)
        self.aux_extraits([l2], [("2 couches :", 1)])
        self.play(Indicate(haut, color=HAUT_C, scale_factor=1.04), run_time=0.35)
        self.aux_extraits(lg, ["6 fois 2", "12 cubes"])
        l3 = self.t("Avec des cubes de 1 cm³ :", 32)
        self.col(l3, -0.55)
        self.aux_extraits([l3], ["1 centimètre cube"])
        g = self.gros("Volume : 12 cm³", couleur=VOL_C, fs=40)
        self.col(g, -1.3)
        hors_audit(g)
        self.aux_extraits([g], ["12 centimètres cubes"], run_time=0.3)
        self.insister(g, 1.08, 0.25)
        self.attendre_voix()

    # ── 04 : la formule ─────────────────────────────────────────────────────
    def ecran_formule(self):
        self.ecran("04-formule")
        self.au_mot("On retient")
        tit = self.t("On retient :", 44, JAUNE_TITRE)
        gauche(tit, -6.2, 3.05)
        emp = Empilement(pave_cubes(4, 2, 3), e=0.8, centre=P(-3.5, 0.75),
                         couleurs={q: HAUT_C for q in pave_cubes(4, 2, 3) if q[1] == 1})
        bas, haut = couche(emp, 0), couche(emp, 1)
        self.play(Write(tit), FadeIn(bas), FadeIn(haut), run_time=0.5)
        cl = fleche_cote(emp.pp((0, 0, 0)) + DOWN * 0.22, emp.pp((4, 0, 0)) + DOWN * 0.22, "longueur", 26, LONG_C,
                         DOWN, 0.1)
        a, b = emp.pp((4, 0, 0)), emp.pp((4, 0, 3))
        cw = fleche_cote(a + P(0.22, -0.1), b + P(0.22, -0.1), "largeur", 26, LONG_C, RIGHT, 0.1)
        cw[1].shift(DOWN * 0.3)
        ch = fleche_cote(emp.pp((0, 0, 0)) + LEFT * 0.22, emp.pp((0, 2, 0)) + LEFT * 0.22, "hauteur", 26, LONG_C,
                         LEFT, 0.1)
        self.au_mot("une couche, c'est")
        l1 = VGroup(self.t("Une couche :", 34), self.t("longueur × largeur", 34, LONG_C))
        self.col(l1[0], 2.3)
        self.col(l1[1], 1.7)
        self.play(FadeIn(l1[0], shift=UP * 0.1), haut.animate.set_opacity(0.15), run_time=0.4)
        self.au_mot("la longueur fois la largeur")
        self.play(FadeIn(l1[1], shift=UP * 0.1), GrowFromCenter(cl), GrowFromCenter(cw), run_time=0.45)
        self.play(Indicate(bas, color=VOL_C, scale_factor=1.04), run_time=0.4)
        self.au_mot("Puis on multiplie")
        l2 = self.t("× le nombre de couches :", 34)
        self.col(l2, 0.95)
        self.play(FadeIn(l2, shift=UP * 0.1), haut.animate.set_opacity(1), run_time=0.45)
        self.au_mot("la hauteur")
        l3 = self.t("la hauteur", 34, LONG_C)
        self.col(l3, 0.35)
        self.play(FadeIn(l3, shift=UP * 0.1), GrowFromCenter(ch), run_time=0.4)
        self.au_mot("Volume du pavé")
        f = self.bloc(["Volume du pavé =", "longueur × largeur × hauteur"], 38, VERT_OK)
        gauche(f, -5.7, -2.15)
        cadre = SurroundingRectangle(f, color=VERT_OK, buff=0.2, corner_radius=0.12, stroke_width=5)
        self.play(FadeIn(f[0], shift=UP * 0.1), Create(cadre), run_time=0.45)
        self.au_mot("longueur fois largeur fois hauteur")
        self.play(FadeIn(f[1], shift=UP * 0.1), run_time=0.4)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (réponse C) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        pos = pave_cubes(5, 3, 1)
        emp = Empilement(pos, e=0.68, centre=P(-3.5, 1.35), couleurs={q: HAUT_C for q in pos if q[1] == 1})

        def avant(sc):
            sc.play(LaggedStart(*[FadeIn(couche(emp, y), shift=DOWN * 0.3) for y in range(3)], lag_ratio=0.3),
                    run_time=0.6)

        def apres(sc):
            sc.au_mot("Une couche")
            sc.play(Indicate(couche(emp, 0), color=VOL_C, scale_factor=1.05), run_time=0.35)
            l1 = sc.rep_bas(0, [("Une couche : 5 cubes.", VERT_OK)], y0=-1.4, pas=0.6)
            sc.aux_extraits([l1], ["5 cubes"])
            l2 = sc.rep_bas(1, [("3 couches :", VERT_OK), ("3 × 5", VERT_OK), ("= 15 cubes.", VERT_OK)],
                            y0=-1.4, pas=0.6)
            hors_audit(l2[1])
            sc.aux_extraits(l2, ["3 couches pareilles", "3 fois 5", "15 cubes"])
            l3 = sc.rep_bas(2, [("8, c'est", ORANGE_RETENUE), ("3 + 5 :", ORANGE_RETENUE),
                                ("on a additionné !", ORANGE_RETENUE)], y0=-1.4, pas=0.6)
            hors_audit(l3[1])
            sc.aux_extraits(l3, ["8, c'est", "3 plus 5", "on a additionné"])
            sc.rep_fini()

        self.question_pause("05-question", "05b-reponse",
                            ["Un pavé a 3 couches", "de 5 cubes.", "Quel est son volume ?"],
                            [self.choix("8 cubes"), self.choix("35 cubes"), self.choix("15 cubes")], 2,
                            ["Une couche : 5 cubes.", "3 couches : 3 × 5 = 15 cubes.", "8, c'est 3 + 5 : on a additionné !"],
                            mot_q="Un pavé a 3 couches", avant_q=avant, autres_r=apres)

    # ── 06 : le piège ───────────────────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        self.au_mot("Attention au piège")
        tit = self.t("Attention au piège !", 46, ROUGE_ERREUR)
        gauche(tit, -6.2, 3.05)
        pos = pave_cubes(3, 2, 3)
        emp = Empilement(pos, e=0.72, centre=P(-3.5, -0.4), couleurs={q: HAUT_C for q in pos if q[1] == 1})
        bas, haut = couche(emp, 0), couche(emp, 1)
        self.play(Write(tit), FadeIn(bas), FadeIn(haut), run_time=0.5)
        self.au_mot("Sur un dessin")
        l1 = self.bloc(["Sur un dessin, on ne voit", "pas tous les cubes."], 32)
        self.col(l1, 1.9)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.4)
        self.au_mot("Ceux du fond et du dessous")
        l2 = self.bloc(["Ceux du fond et du dessous", "sont cachés."], 32, ORANGE_RETENUE)
        self.col(l2, 0.75)
        self.play(FadeIn(l2, shift=UP * 0.1), haut.animate.shift(UP * 0.72 * 1.4), run_time=0.7)
        self.au_mot("sont cachés")
        caches = VGroup(*[emp.cubes[q] for q in pos if q[1] == 0 and (q[2] > 0)])
        self.play(Indicate(caches, color=ORANGE_RETENUE, scale_factor=1.04), run_time=0.5)
        self.au_mot("Ils sont là quand même")
        l3 = self.t("Ils sont là quand même !", 32)
        self.col(l3, -0.25)
        self.play(FadeIn(l3, shift=UP * 0.1), haut.animate.shift(DOWN * 0.72 * 1.4), run_time=0.6)
        self.au_mot("en comptant par couches")
        l4 = self.bloc(["Par couches :", "on n'en oublie aucun."], 36, VERT_OK)
        self.col(l4, -1.25)
        self.play(FadeIn(l4, shift=UP * 0.1), run_time=0.4)
        self.play(haut.animate.shift(UP * 0.5), run_time=0.3)
        self.play(Indicate(bas, color=VOL_C, scale_factor=1.04), haut.animate.shift(DOWN * 0.5), run_time=0.45)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (réponse B) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        pos = pave_cubes(3, 3, 3)
        emp = Empilement(pos, e=0.62, centre=P(-3.4, 1.25), couleurs={q: HAUT_C for q in pos if q[1] == 1})
        cote = fleche_cote(emp.pp((0, 0, 0)) + DOWN * 0.2, emp.pp((3, 0, 0)) + DOWN * 0.2, "3 cm", 28, LONG_C,
                           DOWN, 0.1)
        hors_audit(cote)

        def avant(sc):
            sc.play(LaggedStart(*[FadeIn(couche(emp, y), shift=DOWN * 0.3) for y in range(3)], lag_ratio=0.3),
                    run_time=0.6)

        def autres(sc):
            sc.play(GrowFromCenter(cote), run_time=0.3)

        def apres(sc):
            haut = couche(emp, 2)
            l1 = sc.rep_bas(0, [("Une couche :", VERT_OK), ("3 × 3", VERT_OK), ("= 9 cubes.", VERT_OK)],
                            y0=-1.4, pas=0.6)
            sc.au_mot("Une couche")
            sc.play(FadeIn(l1[0], shift=UP * 0.08), Indicate(haut, color=JAUNE_TITRE, scale_factor=1.05),
                    run_time=0.3)
            sc.aux_extraits(l1[1:], ["3 fois 3", "9 cubes"])
            l2 = sc.rep_bas(1, [("3 couches :", VERT_OK), ("9 × 3", VERT_OK), ("= 27 cm³.", VERT_OK)],
                            y0=-1.4, pas=0.6)
            hors_audit(l2[0])
            hors_audit(l2[1])
            sc.aux_extraits(l2, ["3 couches", "9 fois 3", "27 centimètres cubes"])
            l3 = sc.rep_bas(2, [("9, c'est", ORANGE_RETENUE), ("une seule couche !", ORANGE_RETENUE)],
                            y0=-1.4, pas=0.6)
            hors_audit(l3[0])
            sc.aux_extraits(l3, ["9, c'est", "une seule couche"])
            sc.rep_fini()

        self.question_pause("07-question", "07b-reponse",
                            ["Un cube a une arête", "de 3 cm.", "Quel est son volume ?"],
                            [self.choix("9 cm³"), self.choix("27 cm³"), self.choix("12 cm³")], 1,
                            ["Une couche : 3 × 3 = 9 cubes.", "3 couches : 9 × 3 = 27 cm³.", "9, c'est une seule couche !"],
                            mot_q="Un cube a une arête", avant_q=avant, autres_q=autres, autres_r=apres)

    # ── 08 : le défi ────────────────────────────────────────────────────────
    def la_remorque(self, e, centre):
        emp = Empilement(pave_cubes(8, 3, 4), e=e, centre=centre, couleur=CARTON, trait="#78350f",
                         couleurs={q: "#eab308" for q in pave_cubes(8, 3, 4) if q[1] == 1})
        boite, cab, roues = remorque(emp, 8, 3, 4)
        return emp, boite, cab, roues

    def cotes_remorque(self, emp):
        c8 = fleche_cote(emp.pp((0, 0, 0)) + DOWN * 0.5, emp.pp((8, 0, 0)) + DOWN * 0.5, "8 cartons", 26, LONG_C,
                         DOWN, 0.08)
        a, b = emp.pp((0, 3, 0)), emp.pp((0, 3, 4))  # l'arête du haut, à gauche (vue)
        c4 = fleche_cote(a + P(-0.18, 0.18), b + P(-0.18, 0.18), "4", 28, LONG_C, UL, 0.06)
        c3 = fleche_cote(emp.pp((0, 0, 0)) + LEFT * 0.22, emp.pp((0, 3, 0)) + LEFT * 0.22, "3", 28, LONG_C,
                         LEFT, 0.1)
        return c8, c4, c3

    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        emp, boite, cab, roues = self.la_remorque(0.52, P(-1.2, 1.05))
        yp = yanis(0.75).move_to(P(5.0, 0.9))
        self.au_mot("La remorque de Yanis")
        self.play(Create(boite), FadeIn(cab), FadeIn(roues), FadeIn(yp, shift=LEFT * 0.2), run_time=0.6)
        c8, c4, c3 = self.cotes_remorque(emp)
        self.aux_extraits([c8, c4, c3], ["8 cartons de long", "4 de large", "3 de haut"], run_time=0.3)
        self.au_mot("Combien de cartons")
        q = self.t("Combien de cartons peut-il charger ?", 34, JAUNE_TITRE)
        gauche(q, -6.0, -1.5)
        self.play(FadeIn(q, shift=UP * 0.1), Indicate(boite, color=JAUNE_TITRE, scale_factor=1.02), run_time=0.45)
        self.au_mot("Mets pause")
        pz = self.t("Mets pause, et cherche !", 32, ORANGE_RETENUE).move_to(P(-1.2, -2.6))
        self.play(Write(pz), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        emp, boite, cab, roues = self.la_remorque(0.46, P(-1.6, 1.15))
        c8, c4, c3 = self.cotes_remorque(emp)
        for c in (c8, c4, c3):
            hors_audit(c)
        yp = yanis(0.7).move_to(P(5.0, 1.0))
        self.add(boite, cab, roues, c8, c4, c3, yp)
        l1 = self.ligne([("Une couche :", WHITE), ("8 × 4", BLEU_CALCUL), ("= 32 cartons", VERT_OK)], 32, buff=0.2)
        gauche(l1, -6.0, -1.15)
        self.au_mot("Une couche")
        bas = couche(emp, 0)
        self.play(FadeIn(l1[0], shift=UP * 0.08),
                  LaggedStart(*[FadeIn(c, shift=DOWN * 0.25) for c in bas], lag_ratio=0.03), run_time=0.5)
        self.aux_extraits(l1[1:], ["8 fois 4", "32 cartons"])
        l2 = self.ligne([("3 couches :", WHITE), ("32 × 3", BLEU_CALCUL), ("= 96 cartons", VERT_OK)], 32, buff=0.2)
        gauche(l2, -6.0, -1.85)
        hors_audit(l2[1])
        self.au_mot("3 couches")
        self.wait(0.07)
        h1, h2 = couche(emp, 1), couche(emp, 2)
        h1.shift(UP * 0.8)
        h2.shift(UP * 0.8)
        self.play(FadeIn(l2[0], shift=UP * 0.08), FadeIn(h1), FadeIn(h2), run_time=0.2)
        self.play(h1.animate.shift(DOWN * 0.8), h2.animate.shift(DOWN * 0.8), run_time=0.4,
                  rate_func=rate_functions.ease_in_quad)
        self.aux_extraits(l2[1:], ["32 fois 3", "96 cartons"])
        g = self.gros("Yanis peut charger 96 cartons !", couleur=VERT_OK, fs=36)
        g.move_to(P(-1.2, -2.75))
        hors_audit(g)
        self.aux_extraits([g], [("Yanis peut charger", 1)], run_time=0.3)
        self.insister(g, 1.06, 0.25)
        self.attendre_voix()

    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        pos = pave_cubes(3, 2, 2)
        emp = Empilement(pos, e=0.68, couleurs={q: HAUT_C for q in pos if q[1] == 1})
        lignes = self.finale_gauche(emp, textes=[
            ("Pour un pavé : une couche,", "× le nombre de couches."),
            ("Volume = longueur × largeur", "× hauteur."),
            ("Les cubes cachés sont", "comptés aussi.")], fs=30, x_fig=-4.9, xl=-2.6)
        for f in lignes.get_family():
            f.sans_synchro = True
        hors_audit(lignes)
        self.add(emp)
        self.au_mot("Pour un pavé")
        self.montrer_ligne(lignes[0])
        self.au_mot("longueur fois largeur")
        self.montrer_ligne(lignes[1])
        self.au_mot("Les cubes cachés")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_couche()
        self.ecran_multiplier()
        self.ecran_formule()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")


class VolumeCompter6e(VolumeCompterBase):
    ceinture = "verte"
    identite = "Maths 6e — EleveAI"
