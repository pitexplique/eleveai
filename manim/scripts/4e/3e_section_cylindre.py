# 3e_section_cylindre.py
# EleveAI — Maths 3e — série « Périmètre, aire, volume, solides », épisode T4 : LA SECTION D'UN
# CYLINDRE (micro 3e section_cylindre, notion sections_solides), AVEC VOIX. 16:9, CEINTURE VERTE.
# Décor et métier : Oscar, TOURNEUR SUR MÉTAUX — couper le tube d'une trottinette
# (centres transports, technologie-ia).
# Mapping micro → écrans : 02 (perpendiculairement à l'axe → un disque), 03 (parallèlement à l'axe,
# par le centre → un rectangle de largeur le diamètre), 04 (un tube n'est pas plein : la section
# est une couronne), 06 (piège : perpendiculaire à l'axe = parallèle à la base, c'est la même coupe),
# questions 05 (B : un disque) et 07 (A : un rectangle),
# défi 08 (couronne 3 / 2,5 → 9π − 6,25π = 2,75π ≈ 8,6 cm² de métal).
# Voix : manim/voix/3e-section-cylindre.json ; marques : 3e_section_cylindre_marques.json.
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/3e_section_cylindre.py SectionCylindre3e
# Sortie : manim/sorties/3e/maths/sections/34-section-cylindre/

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from volume_4e_commun import *  # noqa: E402,F403
from volume_4e_commun import point3, cylindre, oscar, Paysage3e  # noqa: E402

METAL_C, METAL_D, METAL_B = "#94a3b8", "#cbd5e1", "#334155"
PLAN_C = "#facc15"
SECTION_C = "#22d3ee"
AXE_C = "#f472b6"


def tube(r, h, u, o=ORIGIN, sw=4):
    """Un tube de métal : un cylindre gris. Attributs : ceux de cylindre(), plus .axe"""
    c = cylindre(r, h, u, o, corps=METAL_C, dessus=METAL_D, bord=METAL_B, sw=sw)
    c.axe = DashedLine(o + DOWN * 0.3 * u, o + UP * (h + 0.3) * u, color=AXE_C, stroke_width=5,
                       dash_length=0.14)
    return c


def plan_travers(l, p, u, o=ORIGIN, couleur=PLAN_C, op=0.3, sw=3):
    """Le plan de coupe PERPENDICULAIRE à l'axe (horizontal), en cavalière."""
    q = lambda x, y: point3(o, u, x, y, 0)  # noqa: E731
    return Polygon(q(0, 0), q(l, 0), q(l, p), q(0, p), fill_color=couleur, fill_opacity=op,
                   stroke_color=couleur, stroke_width=sw)


def plan_long(l, h, u, o=ORIGIN, couleur=PLAN_C, op=0.28, sw=3):
    """Le plan de coupe PARALLÈLE à l'axe : un rectangle vertical qui traverse le tube."""
    return Rectangle(width=l * u, height=h * u, fill_color=couleur, fill_opacity=op,
                     stroke_color=couleur, stroke_width=sw).move_to(o)


def disque_plat(r, u, o=ORIGIN, sw=5, couleur=SECTION_C):
    """La section vue à plat : un disque."""
    d = Circle(radius=r * u, fill_color=couleur, fill_opacity=0.35, stroke_color=couleur,
               stroke_width=sw).move_to(o)
    d.centre, d.r = o, r
    return d


def couronne(re, ri, u, o=ORIGIN, sw=5):
    """La section d'un TUBE vue à plat : un disque percé d'un disque (le métal en gris).
    Attributs : .metal .trou .r_ext .r_int"""
    metal = Annulus(inner_radius=ri * u, outer_radius=re * u, fill_color=METAL_C, fill_opacity=0.9,
                    stroke_color=METAL_B, stroke_width=sw).move_to(o)
    trou = Circle(radius=ri * u, fill_color=BLACK, fill_opacity=1, stroke_color=METAL_B,
                  stroke_width=sw * 0.7).move_to(o)
    g = VGroup(trou, metal)
    g.metal, g.trou, g.centre, g.r_ext, g.r_int, g.u = metal, trou, o, re, ri, u
    return g


def trottinette(s=1.0, o=ORIGIN, sw=4):
    """Une trottinette : deux roues, la planche, le tube vertical et le guidon."""
    planche = Rectangle(width=2.4 * s, height=0.16 * s, fill_color=METAL_D, fill_opacity=1,
                        stroke_color=METAL_B, stroke_width=sw * 0.6).move_to(o)
    roues = VGroup(*[Circle(radius=0.28 * s, fill_color="#1f2937", fill_opacity=1,
                            stroke_color=METAL_B, stroke_width=sw * 0.6)
                     .move_to(o + P(x * s, -0.3 * s)) for x in (-1.1, 1.1)])
    colonne = Line(o + P(-1.1 * s, 0), o + P(-1.1 * s, 1.5 * s)).set_stroke(METAL_C, sw + 3)
    guidon = Line(o + P(-1.65 * s, 1.5 * s), o + P(-0.55 * s, 1.5 * s)).set_stroke(METAL_C, sw + 2)
    g = VGroup(planche, roues, colonne, guidon)
    g.colonne, g.guidon, g.planche = colonne, guidon, planche
    return g


class SectionCylindre3e(Paysage3e):
    nom_voix = "3e-section-cylindre"
    fichier_marques = "3e_section_cylindre_marques.json"
    ceinture = "verte"

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
        titre, ident, ech = self.garde("La section d'un cylindre", self.identite, self.ceinture,
                                       y_ech=-2.45)
        self.au_mot("La section d'un cylindre")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q = self.t("Disque ou rectangle ?", 38)
        q.move_to(P(0, 0.35)).align_to(P(-6.2, 0), LEFT)
        tb = tube(0.7, 2.0, 0.85, P(3.4, -1.5))
        d = disque_plat(0.5, 0.85, P(5.4, 0.3))
        self.au_mot("Disque ou rectangle")
        self.play(FadeIn(q, shift=UP * 0.2), FadeIn(tb, scale=0.85), FadeIn(d, scale=0.8),
                  run_time=0.8)
        self.attendre_voix(marge=0.6)

    # ── 01 ──────────────────────────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        p = oscar(1.0).move_to(P(-4.9, 0.6))
        self.au_mot("Voici Oscar")
        nom = self.t("Oscar", 40, BLEU_CALCUL).next_to(p, UP, buff=0.25)
        self.play(FadeIn(p, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("tourneur sur métaux")
        met = self.t("tourneur sur métaux", 20, BLEU_CALCUL).next_to(p, DOWN, buff=0.2)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.4)
        x = -2.6
        tbs = VGroup(*[tube(0.3, 1.4, 0.8, P(-5.0 + k * 0.9, -2.9), sw=3) for k in range(3)])
        l1 = self.t("il découpe des tubes.", 32, WHITE)
        self.col(l1, 2.1, x)
        self.au_mot("découpe des tubes")
        self.play(FadeIn(l1, shift=UP * 0.1),
                  LaggedStart(*[FadeIn(t, scale=0.8) for t in tbs], lag_ratio=0.18), run_time=0.9)
        tr = trottinette(1.0, P(3.3, 0.3))
        l2 = self.t("Le cadre d'une trottinette", 30, WHITE)
        self.col(l2, 1.2, x)
        self.au_mot("Le cadre d'une trottinette")
        self.play(FadeIn(l2, shift=UP * 0.1), FadeIn(tr, scale=0.85), run_time=0.8)
        l3 = self.t("est fait de tubes,", 30, METAL_D)
        self.col(l3, 0.4, x)
        self.au_mot("est fait de tubes")
        self.play(FadeIn(l3, shift=UP * 0.1), Indicate(tr.colonne, color=PLAN_C, scale_factor=1.1),
                  run_time=0.7)
        l4 = self.bloc(["et la façon de les couper", "change tout."], 32, JAUNE_TITRE)
        self.col(l4, -0.9, x)
        self.au_mot("la façon de les couper")
        self.play(FadeIn(l4[0], shift=UP * 0.1), run_time=0.5)
        self.play(FadeIn(l4[1], scale=1.1), run_time=0.45)
        self.attendre_voix()

    # ── 02 : la coupe en travers ────────────────────────────────────────────
    def ecran_en_travers(self):
        self.ecran("02-en-travers")
        u = 1.0
        tb = tube(0.75, 2.2, u, P(-5.0, -1.8))
        self.add(tb, tb.axe)
        tit = hors_audit(self.t("En travers", 44, JAUNE_TITRE)).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        x = -2.6
        pl = plan_travers(1.9, 1.5, u, P(-5.95, -0.7))
        l1 = self.bloc(["Coupe perpendiculairement", "à l'axe du tube :"], 30, PLAN_C)
        self.col(l1, 2.0, x)
        self.au_mot("coupe perpendiculairement")
        self.play(FadeIn(l1[0], shift=UP * 0.1), FadeIn(pl, shift=DOWN * 0.3), run_time=0.7)
        self.au_mot("à l'axe du tube")
        self.play(FadeIn(l1[1], shift=UP * 0.1), Indicate(tb.axe, color=AXE_C, scale_factor=1.05),
                  run_time=0.6)
        d = disque_plat(0.95, u, P(3.9, 0.9))
        l2 = self.t("la section est un disque.", 32, SECTION_C)
        self.col(l2, 0.9, x)
        self.au_mot("la section est un disque")
        self.play(FadeIn(l2, shift=UP * 0.1), FadeIn(d, scale=0.8), run_time=0.8)
        l3 = self.bloc(["C'est la coupe qu'on voit", "au bout d'un tube."], 30, WHITE)
        self.col(l3, -0.5, x)
        self.au_mot("la coupe qu'on voit")
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.5)
        self.au_mot("au bout d'un tube")
        self.play(FadeIn(l3[1], shift=UP * 0.1), Indicate(tb.haut, color=SECTION_C,
                                                          scale_factor=1.08), run_time=0.6)
        self.attendre_voix()

    # ── 03 : la coupe dans la longueur ──────────────────────────────────────
    def ecran_dans_la_longueur(self):
        self.ecran("03-dans-la-longueur")
        u = 1.0
        tb = tube(0.75, 2.2, u, P(-5.0, -1.8))
        self.add(tb, tb.axe)
        tit = hors_audit(self.t("Dans la longueur", 44, JAUNE_TITRE)).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        x = -2.3
        pl = plan_long(0.35, 2.8, u, P(-5.0, -0.6))
        l1 = self.t("Coupe parallèlement à l'axe,", 30, PLAN_C)
        self.col(l1, 2.0, x)
        self.au_mot("coupe parallèlement à l'axe")
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(pl), run_time=0.7)
        l2 = self.t("en passant par le centre :", 30, PLAN_C)
        self.col(l2, 1.2, x)
        self.au_mot("passant par le centre")
        self.play(FadeIn(l2, shift=UP * 0.1), FadeIn(Dot(tb.o, radius=0.08, color=PLAN_C)),
                  run_time=0.6)
        r = Rectangle(width=1.5 * u, height=2.2 * u, fill_color=SECTION_C, fill_opacity=0.35,
                      stroke_color=SECTION_C, stroke_width=5).move_to(P(4.1, 0.3))
        l3 = self.t("la section est un rectangle.", 32, SECTION_C)
        self.col(l3, 0.3, x)
        self.au_mot("la section est un rectangle")
        self.play(FadeIn(l3, shift=UP * 0.1), FadeIn(r, scale=0.8), run_time=0.8)
        larg = Line(r.get_corner(DL), r.get_corner(DR)).set_stroke(BASE_C, 7).shift(DOWN * 0.18)
        l4 = self.t("Sa largeur est le diamètre,", 30, BASE_C)
        self.col(l4, -0.6, x)
        self.au_mot("Sa largeur")
        self.play(FadeIn(l4, shift=UP * 0.1), Create(larg), run_time=0.7)
        lng = Line(r.get_corner(UR), r.get_corner(DR)).set_stroke(HAUTEUR_C, 7).shift(RIGHT * 0.18)
        l5 = self.t("sa longueur, celle du tube.", 30, HAUTEUR_C)
        self.col(l5, -1.5, x)
        self.au_mot("sa longueur")
        self.play(FadeIn(l5, shift=UP * 0.1), Create(lng), run_time=0.7)
        self.attendre_voix()

    # ── 04 : le tube est creux — la couronne ────────────────────────────────
    def ecran_le_vide(self):
        self.ecran("04-le-vide")
        tit = hors_audit(self.t("Un tube est creux", 44, JAUNE_TITRE)).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        u = 1.0
        x = -1.5
        l1 = self.t("Un tube n'est pas plein :", 32, WHITE)
        self.col(l1, 2.0, x)
        self.au_mot("un tube n'est pas plein")
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.45)
        co = couronne(1.2, 0.95, u, P(-4.4, 0.3))
        l2 = self.bloc(["sa section en travers", "est une couronne,"], 30, SECTION_C)
        self.col(l2, 1.1, x)
        self.au_mot("sa section en travers")
        self.play(FadeIn(l2[0], shift=UP * 0.1), FadeIn(co, scale=0.85), run_time=0.8)
        self.au_mot("est une couronne")
        self.play(FadeIn(l2[1], shift=UP * 0.1), Indicate(co.metal, color=SECTION_C,
                                                          scale_factor=1.06), run_time=0.6)
        l3 = self.t("un disque percé d'un disque.", 30, WHITE)
        self.col(l3, 0.1, x)
        self.au_mot("un disque percé")
        self.play(FadeIn(l3, shift=UP * 0.1), Indicate(co.trou, color=ROUGE_ERREUR,
                                                       scale_factor=1.15), run_time=0.7)
        l4 = self.bloc(["L'aire de métal est la différence", "des deux disques."], 32, VERT_OK)
        self.col(l4, -0.9, x)
        self.au_mot("L'aire de métal")
        self.play(FadeIn(l4[0], shift=UP * 0.1), run_time=0.5)
        # ⛔ La marge basse du paysage est y = −3,57 : un disque de rayon 1,2 centré en −2,4
        #    déborde (BORD). Rayons 1,0 et 0,8, centres à −2,45.
        gd = disque_plat(1.0, u, P(-4.9, -2.45), couleur=BASE_C)
        pt = disque_plat(0.8, u, P(-2.4, -2.45), couleur=ROUGE_ERREUR)
        moins = hors_audit(self.t("−", 40, WHITE)).move_to(P(-3.65, -2.45))
        self.au_mot("des deux disques")
        self.play(FadeIn(l4[1], shift=UP * 0.1), FadeIn(gd, scale=0.8), FadeIn(moins),
                  FadeIn(pt, scale=0.8), run_time=0.9)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (réponse B) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        tb = tube(0.6, 1.8, 0.8, P(-5.2, 0.1))
        pl = plan_travers(1.6, 1.3, 0.8, P(-5.95, 0.9))

        def avant_q(sc):
            sc.play(FadeIn(tb), FadeIn(tb.axe), FadeIn(pl), run_time=0.45)

        self.question_gauche("05-question", "05b-reponse",
                             ["On coupe un tube", "perpendiculairement à son axe.", "La section est…"],
                             [self.choix("un rectangle"), self.choix("un disque"),
                              self.choix("un triangle")], 1,
                             ["Perpendiculairement à l'axe,", "c'est parallèle aux bases :",
                              "on retrouve un disque."],
                             -0.3,
                             mot_q="On coupe un tube", avant_q=avant_q)

    # ── 06 : le piège du vocabulaire ────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege", 0.65)
        tit = self.t("Attention au piège !", 48, ORANGE_Q).move_to(P(0, 3.15))
        self.au_mot("Attention au piège")
        self.play(Write(tit), run_time=0.4)
        u = 0.95
        tb = tube(0.7, 2.0, u, P(-4.8, -1.6))
        self.add(tb)
        pl = plan_travers(1.8, 1.4, u, P(-5.7, -0.6))
        x = -2.2
        l1 = self.t("Perpendiculaire à l'axe", 32, AXE_C)
        self.col(l1, 2.0, x)
        self.au_mot("Perpendiculaire à l'axe")
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(tb.axe), run_time=0.6)
        l2 = self.t("et parallèle à la base :", 32, BASE_C)
        self.col(l2, 1.1, x)
        self.au_mot("parallèle à la base")
        self.play(FadeIn(l2, shift=UP * 0.1), Indicate(tb.bas, color=BASE_C, scale_factor=1.08),
                  run_time=0.6)
        l3 = self.t("c'est la même coupe.", 36, VERT_OK)
        self.col(l3, 0.1, x)
        self.au_mot("même coupe")
        self.play(FadeIn(l3, scale=1.12), FadeIn(pl, shift=DOWN * 0.25), run_time=0.8)
        l4 = self.t("Tantôt l'axe, tantôt la base :", 30, WHITE)
        self.col(l4, -1.0, x)
        self.au_mot("tantôt de l'axe")
        self.play(FadeIn(l4, shift=UP * 0.1), run_time=0.5)
        l5 = self.t("savoir à quoi on se réfère.", 32, JAUNE_TITRE)
        self.col(l5, -1.9, x)
        self.au_mot("savoir à quoi")
        self.play(FadeIn(l5, shift=UP * 0.1), run_time=0.5)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (réponse A) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        tb = tube(0.6, 1.8, 0.8, P(-5.2, 0.1))
        pl = plan_long(0.3, 2.3, 0.8, P(-5.2, 0.85))

        def avant_q(sc):
            sc.play(FadeIn(tb), FadeIn(tb.axe), FadeIn(pl), run_time=0.45)

        self.question_gauche("07-question", "07b-reponse",
                             ["On coupe un cylindre", "parallèlement à son axe,",
                              "en passant par le centre."],
                             [self.choix("un rectangle"), self.choix("un disque"),
                              self.choix("un ovale")], 0,
                             ["Un rectangle, dont la largeur", "est le diamètre du cylindre."],
                             -0.3,
                             mot_q="On coupe un cylindre", avant_q=avant_q)

    # ── 08 : le défi ────────────────────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        u = 1.5
        co = couronne(1.2, 1.0, u, P(-4.0, 0.2))
        x = 0.6
        l0 = self.t("Oscar coupe un tube :", 32, WHITE)
        self.col(l0, 2.0, x)
        self.au_mot("Oscar coupe un tube")
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(co, scale=0.85), run_time=0.8)
        re = Line(co.centre, co.centre + P(1.2 * u, 0)).set_stroke(BASE_C, 7)
        l1 = self.ligne([("3 cm", BASE_C), ("de rayon extérieur,", BASE_C)], 30, buff=0.16)
        self.col(l1, 1.1, x)
        self.au_mot("3 centimètres")
        self.play(FadeIn(l1[0], scale=1.1), Create(re), run_time=0.45)
        self.au_mot("de rayon extérieur")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.35)
        ri = Line(co.centre, co.centre + P(1.0 * u, 0)).set_stroke(ROUGE_ERREUR, 7).shift(DOWN * 0.35)
        l2 = self.ligne([("2,5 cm", ROUGE_ERREUR), ("de rayon intérieur.", ROUGE_ERREUR)],
                        30, buff=0.16)
        self.col(l2, 0.2, x)
        self.au_mot("2,5 centimètres")
        self.play(FadeIn(l2[0], scale=1.1), Create(ri), run_time=0.45)
        self.au_mot("de rayon intérieur")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.35)
        l3 = self.bloc(["Quelle est l'aire de métal", "sur la coupe ?"], 34, JAUNE_TITRE)
        self.col(l3, -1.0, x)
        self.au_mot("l'aire de métal")
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.5)
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.45)
        self.pause_gauche()

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        u = 1.2
        co = couronne(1.2, 1.0, u, P(-4.6, 0.6))
        self.add(co)
        x = -2.3
        l1 = self.ligne([("Le grand disque :", WHITE), ("π × 3 × 3", BLEU_D), ("= 9π", VERT_OK)],
                        30, buff=0.16)
        self.col(l1, 2.0, x)
        self.au_mot("Le grand disque")
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("3 fois 3")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.35)
        self.au_mot("9 pi.")
        self.play(FadeIn(l1[2], shift=UP * 0.1), run_time=0.35)
        l2 = self.ligne([("Le trou :", WHITE), ("π × 2,5 × 2,5", BLEU_D), ("= 6,25π", ROUGE_ERREUR)],
                        30, buff=0.16)
        self.col(l2, 1.1, x)
        self.au_mot("Le trou")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("2,5 fois 2,5")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.35)
        self.au_mot("6,25 pi.")
        self.play(FadeIn(l2[2], shift=UP * 0.1), run_time=0.35)
        l3 = self.ligne([("La couronne :", WHITE), ("9π − 6,25π", BLEU_D),
                         ("= 2,75π cm²", VERT_OK)], 30, buff=0.16)
        self.col(l3, 0.2, x)
        self.au_mot("La couronne")
        self.play(FadeIn(l3[0], shift=UP * 0.1), Indicate(co.metal, color=SECTION_C,
                                                          scale_factor=1.06), run_time=0.6)
        self.au_mot("9 pi moins")
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.35)
        self.au_mot("2,75 pi")
        self.play(FadeIn(l3[2], scale=1.15), run_time=0.45)
        res = self.gros("environ 8,6 cm² de métal", fs=38)
        self.col(res, -1.4, x)
        self.au_mot("Environ 8,6")
        self.play(FadeIn(res, scale=1.12), run_time=0.5)
        self.insister(res, 1.06, 0.25)
        self.attendre_voix()

    # ── 09 ──────────────────────────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        tb = tube(0.6, 1.6, 0.9, P(-0.8, -0.8))
        fig = VGroup(tb, disque_plat(0.55, 0.9, P(1.2, 0.5)), couronne(0.5, 0.38, 0.9, P(1.2, -1.2)))
        lignes = self.finale_gauche(fig, textes=[
            ("Une coupe perpendiculaire à l'axe", "d'un cylindre donne un disque."),
            ("Une coupe parallèle à l'axe", "donne un rectangle."),
            ("Et la section d'un tube", "est une couronne.")], fs=28)
        self.add(fig)
        self.au_mot("Une coupe perpendiculaire")
        self.montrer_ligne(lignes[0])
        self.au_mot("Une coupe parallèle")
        self.montrer_ligne(lignes[1])
        self.au_mot("la section d'un tube")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_en_travers()
        self.ecran_dans_la_longueur()
        self.ecran_le_vide()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")
