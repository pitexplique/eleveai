# 3e_section_longueur.py
# EleveAI — Maths 3e — série « Périmètre, aire, volume, solides », épisode T7 : CALCULER UNE LONGUEUR
# DANS UNE SECTION (micro 3e section_calculer_longueur, notion sections_solides), AVEC VOIX.
# 16:9, CEINTURE BLEUE.
# Décor et métier : Maëlle, PILOTE DE LIGNE — se repérer en vol (centres transports, espace).
# Mapping micro → écrans : 02 (la méthode : dessiner la section à plat, y chercher le triangle
# rectangle), 03 (section rectangulaire 6 × 8 : la diagonale vaut 10), 04 (dans une sphère, le même
# triangle : R hypoténuse, d et r les côtés), 06 (piège : Pythagore ne s'applique que DANS un plan),
# questions 05 (C : 10 cm) et 07 (A : 12), défi 08 (9 km d'altitude, 40 km au sol → 41 km).
# Voix : manim/voix/3e-section-longueur.json ; marques : 3e_section_longueur_marques.json.
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/3e_section_longueur.py SectionLongueur3e
# Sortie : manim/sorties/3e/maths/sections/37-section-longueur/

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from volume_4e_commun import *  # noqa: E402,F403
from volume_4e_commun import maelle, Paysage3e  # noqa: E402

CIEL_C = "#1e3a8a"
SOL_C = "#4d7c0f"
AVION_C, AVION_B = "#e2e8f0", "#475569"
HYPO_C = "#f472b6"
GLOBE_C, GLOBE_B = "#2563eb", "#0c4a6e"
PARA_C = "#22d3ee"
DIST_C = "#f472b6"


def avion(s=1.0, o=ORIGIN, sw=3):
    """Un avion de ligne vu de profil : fuselage, aile, dérive."""
    corps = Polygon(o + P(-0.9 * s, 0), o + P(0.55 * s, 0.16 * s), o + P(0.95 * s, 0),
                    o + P(0.55 * s, -0.16 * s), fill_color=AVION_C, fill_opacity=1,
                    stroke_color=AVION_B, stroke_width=sw)
    aile = Polygon(o + P(0.1 * s, -0.05 * s), o + P(-0.1 * s, -0.42 * s),
                   o + P(0.3 * s, -0.42 * s), o + P(0.35 * s, -0.05 * s),
                   fill_color=AVION_C, fill_opacity=1, stroke_color=AVION_B, stroke_width=sw)
    derive = Polygon(o + P(-0.9 * s, 0.02 * s), o + P(-0.75 * s, 0.45 * s),
                     o + P(-0.5 * s, 0.45 * s), o + P(-0.45 * s, 0.02 * s),
                     fill_color=AVION_C, fill_opacity=1, stroke_color=AVION_B, stroke_width=sw)
    g = VGroup(aile, derive, corps)
    g.corps, g.aile = corps, derive
    return g


def rect_diagonale(a, b, u, o=ORIGIN, sw=5):
    """Une section rectangulaire a × b, vue à plat, avec sa diagonale et l'angle droit.
    Attributs : .rect .diag .angle .cote_a .cote_b"""
    r = Rectangle(width=a * u, height=b * u, fill_color=PARA_C, fill_opacity=0.25,
                  stroke_color=PARA_C, stroke_width=sw).move_to(o)
    A, B, C = r.get_corner(DL), r.get_corner(DR), r.get_corner(UR)
    g = VGroup(r)
    g.rect = r
    g.diag = Line(A, C, color=HYPO_C, stroke_width=sw + 2)
    g.cote_a = Line(A, B, color=BASE_C, stroke_width=sw + 2)
    g.cote_b = Line(B, C, color=HAUTEUR_C, stroke_width=sw + 2)
    g.angle = equerre(B, LEFT, UP, 0.2, WHITE)
    g.A, g.B, g.C = A, B, C
    return g


def coupe_sphere(R, d, u, o=ORIGIN, sw=5):
    """La sphère vue en coupe : grand cercle, corde, et le triangle rectangle."""
    rs = (R * R - d * d) ** 0.5
    cer = Circle(radius=R * u, stroke_color=GLOBE_C, stroke_width=sw, fill_color=GLOBE_C,
                 fill_opacity=0.12).move_to(o)
    H = o + UP * d * u
    M = H + RIGHT * rs * u
    g = VGroup(cer, Line(H + LEFT * rs * u, M, color=PARA_C, stroke_width=sw + 2))
    g.cercle, g.corde = cer, g[1]
    g.R_trait = Line(o, M, color=GLOBE_B, stroke_width=sw + 1)
    g.d_trait = Line(o, H, color=DIST_C, stroke_width=sw + 1)
    g.r_trait = Line(H, M, color=PARA_C, stroke_width=sw + 2)
    g.angle = equerre(H, RIGHT, DOWN, 0.2, DIST_C)
    g.centre_pt = Dot(o, radius=0.07, color=WHITE)
    g.H, g.M, g.centre, g.rs = H, M, o, rs
    return g


class SectionLongueur3e(Paysage3e):
    nom_voix = "3e-section-longueur"
    fichier_marques = "3e_section_longueur_marques.json"
    ceinture = "bleue"

    def pause_gauche(self, y=-3.2, x=-6.2, marge=2.0):
        """« Mets pause, et cherche ! » en bas À GAUCHE.
        ⛔ Dans la colonne de droite (pause_defi du commun), le « ! » touche Ti-Margo : constaté
        sur les planches de T1, T2, T3 et T4. La mascotte occupe x > 4,6 et y < −2,2."""
        self.au_mot("Mets pause")
        p = self.t("Mets pause, et cherche !", 32, ORANGE_RETENUE)
        self.col(p, y, x)
        self.play(Write(p), run_time=0.8)
        self.attendre_voix(marge=marge)

    # ── 00 ──────────────────────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Une longueur dans une section", self.identite,
                                       self.ceinture, y_ech=-2.45)
        self.au_mot("Calculer une longueur")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q = self.bloc(["Où se cache", "le triangle rectangle ?"], 38)
        q.move_to(P(0, 0.35)).align_to(P(-6.2, 0), LEFT)
        rd = rect_diagonale(2.0, 1.4, 0.95, P(3.8, 0.1))
        self.au_mot("Où se cache")
        self.play(FadeIn(q[0], shift=UP * 0.2), FadeIn(rd, scale=0.85), run_time=0.5)
        self.au_mot("le triangle rectangle")
        self.play(FadeIn(q[1], shift=UP * 0.2), Create(rd.diag), FadeIn(rd.angle), run_time=0.8)
        self.attendre_voix(marge=0.6)

    # ── 01 ──────────────────────────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        p = maelle(1.0).move_to(P(-5.2, 0.5))
        self.au_mot("Voici Maëlle")
        nom = self.t("Maëlle", 40, BLEU_CALCUL).next_to(p, UP, buff=0.25)
        self.play(FadeIn(p, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("pilote de ligne")
        met = self.t("pilote de ligne", 24, BLEU_CALCUL).next_to(p, DOWN, buff=0.2)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.4)
        x = -2.7
        sol = Line(P(-0.4, -2.6), P(6.4, -2.6), color=SOL_C, stroke_width=8)
        av = avion(1.1, P(3.6, 0.6))
        l1 = self.t("En vol :", 32, WHITE)
        self.col(l1, 2.1, x)
        self.au_mot("En vol")
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(av, shift=RIGHT * 0.3), Create(sol),
                  run_time=0.9)
        vert = DashedLine(P(3.6, 0.2), P(3.6, -2.6), color=HAUTEUR_C, stroke_width=5,
                          dash_length=0.12)
        l2 = self.t("une position au sol", 32, BASE_C)
        self.col(l2, 1.3, x)
        self.au_mot("une position au sol")
        self.play(FadeIn(l2, shift=UP * 0.1), FadeIn(Dot(P(3.6, -2.6), radius=0.09, color=BASE_C)),
                  run_time=0.6)
        l3 = self.t("et une altitude.", 32, HAUTEUR_C)
        self.col(l3, 0.5, x)
        self.au_mot("et une altitude")
        self.play(FadeIn(l3, shift=UP * 0.1), Create(vert), run_time=0.8)
        l4 = self.t("Pour calculer une distance,", 30, WHITE)
        self.col(l4, -0.5, x)
        self.au_mot("Pour calculer")
        self.play(FadeIn(l4, shift=UP * 0.1), run_time=0.5)
        l5 = self.t("toujours le problème à un plan.", 32, JAUNE_TITRE)
        self.col(l5, -1.5, x)
        self.au_mot("le problème à un plan")
        self.play(FadeIn(l5, scale=1.08), run_time=0.55)
        self.attendre_voix()

    # ── 02 : la méthode ─────────────────────────────────────────────────────
    def ecran_ramener_au_plan(self):
        self.ecran("02-ramener-au-plan")
        tit = hors_audit(self.t("La méthode", 44, JAUNE_TITRE)).move_to(P(0, 3.15))
        x = -1.4
        l1 = self.t("La méthode est toujours la même :", 30, WHITE)
        self.col(l1, 2.0, x)
        self.au_mot("La méthode est toujours")
        self.play(Write(tit), FadeIn(l1, shift=UP * 0.1), run_time=0.8)
        rd = rect_diagonale(2.2, 1.6, 1.0, P(-4.0, 0.3))
        l2 = self.t("on dessine la section à plat,", 30, PARA_C)
        self.col(l2, 1.0, x)
        self.au_mot("on dessine la section")
        self.play(FadeIn(l2, shift=UP * 0.1), FadeIn(rd, scale=0.85), run_time=0.9)
        ca = hors_audit(sur_fond(self.t("connu", 22, BASE_C))).next_to(rd.cote_a, DOWN, buff=0.08)
        cb = hors_audit(sur_fond(self.t("connu", 22, HAUTEUR_C))).next_to(rd.cote_b, RIGHT,
                                                                         buff=0.08)
        l3 = self.t("on y place les longueurs connues,", 30, BASE_C)
        self.col(l3, 0.0, x)
        self.au_mot("on y place les longueurs")
        self.play(FadeIn(l3, shift=UP * 0.1), Create(rd.cote_a), Create(rd.cote_b),
                  FadeIn(ca), FadeIn(cb), run_time=0.9)
        l4 = self.bloc(["et on cherche", "le triangle rectangle."], 34, VERT_OK)
        self.col(l4, -1.3, x)
        self.au_mot("et on cherche")
        self.play(FadeIn(l4[0], shift=UP * 0.1), run_time=0.45)
        self.play(FadeIn(l4[1], shift=UP * 0.1), Create(rd.diag), FadeIn(rd.angle), run_time=0.9)
        self.attendre_voix()

    # ── 03 : la diagonale d'une section rectangulaire ───────────────────────
    def ecran_la_diagonale(self):
        self.ecran("03-la-diagonale")
        u = 1.0
        rd = rect_diagonale(2.4, 1.8, u, P(-4.2, 0.6))
        tit = hors_audit(self.t("La diagonale", 44, JAUNE_TITRE)).move_to(P(0, 3.15))
        x = -1.1
        l1 = self.t("Une section rectangulaire", 30, PARA_C)
        self.col(l1, 2.0, x)
        self.au_mot("une section rectangulaire")
        self.play(Write(tit), FadeIn(l1, shift=UP * 0.1), FadeIn(rd, scale=0.85), run_time=0.9)
        e6 = hors_audit(sur_fond(self.t("6", 26, BASE_C))).next_to(rd.cote_a, DOWN, buff=0.08)
        e8 = hors_audit(sur_fond(self.t("8", 26, HAUTEUR_C))).next_to(rd.cote_b, RIGHT, buff=0.08)
        l2 = self.ligne([("de", WHITE), ("6 sur 8,", BASE_C)], 32, buff=0.16)
        self.col(l2, 1.2, x)
        self.au_mot("de 6 sur 8")
        self.play(FadeIn(l2[0], shift=UP * 0.1), FadeIn(l2[1], scale=1.1), Create(rd.cote_a),
                  Create(rd.cote_b), FadeIn(e6), FadeIn(e8), run_time=0.9)
        l3 = self.t("la diagonale ferme un triangle.", 30, HYPO_C)
        self.col(l3, 0.4, x)
        self.au_mot("la diagonale ferme")
        self.play(FadeIn(l3, shift=UP * 0.1), Create(rd.diag), FadeIn(rd.angle), run_time=0.9)
        l4 = self.ligne([("6²", BASE_C), ("+ 8²", HAUTEUR_C), ("= 36 + 64", BLEU_D),
                         ("= 100", VERT_OK)], 32, buff=0.16)
        self.col(l4, -0.6, x)
        self.au_mot("6 au carré")
        self.play(FadeIn(l4[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("plus 8 au carré")
        self.play(FadeIn(l4[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("36 plus 64")
        self.play(FadeIn(l4[2], shift=UP * 0.1), run_time=0.35)
        self.au_mot("100.")
        self.play(FadeIn(l4[3], shift=UP * 0.1), run_time=0.35)
        l5 = self.ligne([("√100", BLEU_D), ("= 10", VERT_OK)], 40, buff=0.2)
        self.col(l5, -1.8, x)
        self.au_mot("La racine de 100")
        self.play(FadeIn(l5[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("c'est 10")
        self.play(FadeIn(l5[1], scale=1.2), run_time=0.5)
        self.insister(l5[1], 1.1, 0.25)
        self.attendre_voix()

    # ── 04 : le même triangle dans une sphère ───────────────────────────────
    def ecran_la_sphere(self):
        self.ecran("04-la-sphere")
        u = 1.3
        cs = coupe_sphere(1.3, 0.7, u, P(-4.0, 0.0))
        self.add(cs.cercle, cs.corde, cs.centre_pt)
        tit = hors_audit(self.t("Le même triangle", 44, JAUNE_TITRE)).move_to(P(0, 3.15))
        x = -1.1
        l1 = self.t("Dans une sphère, c'est le même :", 30, WHITE)
        self.col(l1, 2.0, x)
        self.au_mot("Dans une sphère")
        self.play(Write(tit), FadeIn(l1, shift=UP * 0.1), run_time=0.8)
        l2 = self.ligne([("le rayon de la sphère", GLOBE_B), ("est l'hypoténuse,", GLOBE_B)],
                        28, buff=0.16)
        self.col(l2, 1.0, x)
        self.au_mot("le rayon de la sphère")
        self.play(FadeIn(l2[0], shift=UP * 0.1), Create(cs.R_trait), run_time=0.8)
        self.au_mot("est l'hypoténuse")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.4)
        l3 = self.t("la distance au centre", 28, DIST_C)
        self.col(l3, 0.1, x)
        self.au_mot("la distance au centre")
        self.play(FadeIn(l3, shift=UP * 0.1), Create(cs.d_trait), FadeIn(cs.angle), run_time=0.8)
        l4 = self.t("et le rayon de la section", 28, PARA_C)
        self.col(l4, -0.8, x)
        self.au_mot("et le rayon de la section")
        self.play(FadeIn(l4, shift=UP * 0.1), Create(cs.r_trait), run_time=0.8)
        l5 = self.t("sont les côtés de l'angle droit.", 30, VERT_OK)
        self.col(l5, -1.8, x)
        self.au_mot("sont les côtés")
        self.play(FadeIn(l5, shift=UP * 0.1), run_time=0.5)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (réponse C) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        rd = rect_diagonale(1.8, 1.3, 0.9, P(-4.9, 0.8))
        e6 = hors_audit(sur_fond(self.t("6", 24, BASE_C))).next_to(rd.cote_a, DOWN, buff=0.06)
        e8 = hors_audit(sur_fond(self.t("8", 24, HAUTEUR_C))).next_to(rd.cote_b, RIGHT, buff=0.06)

        def avant_q(sc):
            sc.play(FadeIn(rd), Create(rd.cote_a), Create(rd.cote_b), FadeIn(e6), FadeIn(e8),
                    Create(rd.diag), FadeIn(rd.angle), run_time=0.6)

        self.question_gauche("05-question", "05b-reponse",
                             ["Une section rectangulaire", "de 6 cm sur 8.", "La diagonale ?"],
                             [self.choix("14 cm"), self.choix("48 cm"), self.choix("10 cm")], 2,
                             ["36 + 64 = 100.", "La racine de 100, c'est 10.",
                              "14, c'est 6 + 8."],
                             -0.3,
                             couper={0: ("36 + 64", "= 100."),
                                     1: ("La racine de", "100,", "c'est 10."),
                                     2: ("14,", "c'est 6 + 8.")},
                             mot_q="Dans une section rectangulaire", avant_q=avant_q)

    # ── 06 : le piège du plan ───────────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege", 0.65)
        tit = self.t("Attention au piège !", 48, ORANGE_Q).move_to(P(0, 3.15))
        self.au_mot("Attention au piège")
        self.play(Write(tit), run_time=0.4)
        x = -1.6
        pv = pave(2.0, 1.4, 1.6, 0.95, P(-5.9, -0.4))
        l1 = self.bloc(["Le théorème de Pythagore", "ne s'applique"], 32, ROUGE_ERREUR)
        self.col(l1, 2.0, x)
        self.au_mot("Le théorème de Pythagore")
        self.play(FadeIn(l1[0], shift=UP * 0.1), FadeIn(pv, scale=0.85), run_time=0.8)
        self.au_mot("ne s'applique")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.4)
        l2 = self.t("que dans un plan.", 36, ROUGE_ERREUR)
        self.col(l2, 0.9, x)
        self.play(FadeIn(l2, scale=1.1), run_time=0.5)
        rd = rect_diagonale(1.8, 1.3, 0.9, P(-4.3, -2.3))
        l3 = self.bloc(["Il faut d'abord dessiner", "la section,"], 32, WHITE)
        self.col(l3, -0.2, x)
        self.au_mot("Il faut d'abord")
        self.play(FadeIn(l3, shift=UP * 0.1), FadeIn(rd, scale=0.85), run_time=0.9)
        l4 = self.t("puis y travailler à plat.", 34, VERT_OK)
        self.col(l4, -1.4, x)
        self.au_mot("puis y travailler")
        self.play(FadeIn(l4, shift=UP * 0.1), Create(rd.diag), FadeIn(rd.angle), run_time=0.9)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (réponse A) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        cs = coupe_sphere(1.3, 1.2, 0.9, P(-4.9, 0.6))
        e13 = hors_audit(sur_fond(self.t("13", 24, GLOBE_B))).next_to(cs.R_trait, DOWN, buff=0.06)
        e5 = hors_audit(sur_fond(self.t("5", 24, PARA_C))).next_to(cs.r_trait, UP, buff=0.06)

        def avant_q(sc):
            sc.play(FadeIn(cs.cercle), Create(cs.corde), Create(cs.R_trait), Create(cs.r_trait),
                    FadeIn(e13), FadeIn(e5), FadeIn(cs.angle), run_time=0.6)

        self.question_gauche("07-question", "07b-reponse",
                             ["Sphère de rayon 13,", "cercle de rayon 5.",
                              "La distance au centre ?"],
                             [self.choix("12"), self.choix("8"), self.choix("18")], 0,
                             ["169 − 25 = 144.", "La racine de 144, c'est 12.",
                              "8, c'est 13 − 5."],
                             -0.3,
                             couper={0: ("169 − 25", "= 144."),
                                     1: ("La racine de", "144,", "c'est 12."),
                                     2: ("8,", "c'est 13 − 5.")},
                             mot_q="Une sphère de rayon 13", avant_q=avant_q)

    # ── 08 : le défi ────────────────────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        sol = Line(P(-6.2, -2.4), P(-0.6, -2.4), color=SOL_C, stroke_width=8)
        av = avion(0.95, P(-5.6, -0.2))
        x = 0.2
        l0 = self.t("Maëlle survole un point", 32, WHITE)
        self.col(l0, 2.0, x)
        self.au_mot("Maëlle survole")
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(av, shift=RIGHT * 0.25), Create(sol),
                  run_time=0.9)
        vert = Line(P(-5.6, -0.6), P(-5.6, -2.4), color=HAUTEUR_C, stroke_width=7)
        l1 = self.ligne([("à", WHITE), ("9 km", HAUTEUR_C), ("d'altitude.", WHITE)], 32, buff=0.16)
        self.col(l1, 1.1, x)
        self.au_mot("9 kilomètres")
        self.play(FadeIn(l1[0], shift=UP * 0.1), FadeIn(l1[1], scale=1.1), Create(vert),
                  run_time=0.6)
        self.au_mot("d'altitude")
        self.play(FadeIn(l1[2], shift=UP * 0.1), run_time=0.3)
        aero = VGroup(Rectangle(width=0.7, height=0.3, fill_color=AVION_C, fill_opacity=1,
                                stroke_color=AVION_B, stroke_width=3),
                      Line(ORIGIN, UP * 0.35).set_stroke(AVION_B, 4))
        aero[0].move_to(P(-1.0, -2.25))
        aero[1].move_to(P(-1.0, -1.9))
        horiz = Line(P(-5.6, -2.4), P(-1.0, -2.4), color=BASE_C, stroke_width=7)
        l2 = self.t("L'aéroport est à", 32, WHITE)
        self.col(l2, 0.2, x)
        self.au_mot("L'aéroport est")
        self.play(FadeIn(l2, shift=UP * 0.1), FadeIn(aero, shift=UP * 0.2), run_time=0.8)
        l3 = self.ligne([("40 km", BASE_C), ("devant elle, au sol.", WHITE)], 32, buff=0.16)
        self.col(l3, -0.7, x)
        self.au_mot("40 kilomètres")
        self.play(FadeIn(l3[0], scale=1.1), Create(horiz), run_time=0.6)
        self.au_mot("devant elle")
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.35)
        hyp = DashedLine(P(-5.6, -0.6), P(-1.0, -2.4), color=HYPO_C, stroke_width=6,
                         dash_length=0.14)
        l4 = self.bloc(["Quelle distance la sépare", "en ligne droite ?"], 32, JAUNE_TITRE)
        self.col(l4, -1.8, x)
        self.au_mot("Quelle distance")
        self.play(FadeIn(l4[0], shift=UP * 0.1), run_time=0.5)
        self.au_mot("en ligne droite")
        self.play(FadeIn(l4[1], shift=UP * 0.1), Create(hyp), run_time=0.9)
        self.pause_gauche(y=-3.3)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        sol = Line(P(-6.2, -2.6), P(-1.6, -2.6), color=SOL_C, stroke_width=7)
        vert = Line(P(-5.8, -1.0), P(-5.8, -2.6), color=HAUTEUR_C, stroke_width=7)
        horiz = Line(P(-5.8, -2.6), P(-1.8, -2.6), color=BASE_C, stroke_width=7)
        hyp = Line(P(-5.8, -1.0), P(-1.8, -2.6), color=HYPO_C, stroke_width=7)
        self.add(sol, vert, horiz, hyp, equerre(P(-5.8, -2.6), RIGHT, UP, 0.22, WHITE))
        x = -1.2
        l1 = self.t("Le triangle rectangle :", 30, WHITE)
        self.col(l1, 2.1, x)
        self.au_mot("Le triangle rectangle")
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.45)
        l2 = self.ligne([("40²", BASE_C), ("+ 9²", HAUTEUR_C)], 36, buff=0.18)
        self.col(l2, 1.2, x)
        self.au_mot("40 au carré")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("plus 9 au carré")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.35)
        # ⛔ Les nombres à 4 chiffres sortent de l'audit (l'espace des milliers les rend
        #    introuvables dans la voix) : ils sont posés à la main, au mot.
        l3 = self.ligne([("= 1 600", BLEU_D), ("+ 81", BLEU_D), ("= 1 681", VERT_OK)], 34,
                        buff=0.18)
        hors_audit(l3[0])
        hors_audit(l3[2])
        self.col(l3, 0.2, x)
        self.au_mot("1 600")
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.35)
        # (pas d'au_mot : « + 81 » est audité, le gabarit attend le 81 tout seul)
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.35)
        self.au_mot("1 681.")
        self.play(FadeIn(l3[2], shift=UP * 0.1), run_time=0.35)
        # ⛔ « √1 681 = 41 km » en UN seul texte part en TARD : la synchro le découpe en morceaux
        #    (« √1 », « 681 = ») que hors_audit ne couvre plus. Le nombre va dans son morceau.
        l4 = self.ligne([("√ 1 681", BLEU_D), ("= 41 km", VERT_OK)], 42, buff=0.22)
        hors_audit(l4[0])
        self.col(l4, -1.0, x)
        self.au_mot("La racine de")
        self.play(FadeIn(l4[0], shift=UP * 0.1), run_time=0.4)
        self.au_mot("c'est 41")
        self.play(FadeIn(l4[1], scale=1.15), run_time=0.5)
        self.insister(l4[1], 1.08, 0.25)
        l4 = self.bloc(["à peine un de plus", "qu'au sol."], 32, JAUNE_TITRE)
        self.col(l4, -2.3, x)
        self.au_mot("à peine un de plus")
        self.play(FadeIn(l4[0], shift=UP * 0.1), run_time=0.45)
        self.play(FadeIn(l4[1], shift=UP * 0.1), run_time=0.4)
        self.attendre_voix()

    # ── 09 ──────────────────────────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        rd = rect_diagonale(1.6, 1.2, 0.9, ORIGIN)
        fig = VGroup(rd, rd.cote_a, rd.cote_b, rd.diag, rd.angle)
        lignes = self.finale_gauche(fig, textes=[
            ("On ramène le calcul à une", "section dessinée à plat."),
            ("On y cherche", "le triangle rectangle."),
            ("Pythagore s'applique dans ce plan,", "jamais dans l'espace.")], fs=28)
        self.add(fig)
        self.au_mot("On ramène toujours")
        self.montrer_ligne(lignes[0])
        self.au_mot("On y cherche")
        self.montrer_ligne(lignes[1])
        self.au_mot("on applique Pythagore")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_ramener_au_plan()
        self.ecran_la_diagonale()
        self.ecran_la_sphere()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")
