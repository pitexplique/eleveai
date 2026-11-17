# 3e_section_pave_cube.py
# EleveAI — Maths 3e — série « Périmètre, aire, volume, solides », épisode T3 : LA SECTION D'UN PAVÉ
# ET D'UN CUBE (micro 3e section_pave_cube, notion sections_solides), AVEC VOIX. 16:9, CEINTURE JAUNE.
# Décor et métier : Fatou, BOULANGÈRE — trancher un pain de mie (centres cuisine, art-design).
# Mapping micro → écrans : 02 (une coupe parallèle à une face donne cette face, à la même taille),
# 03 (le cube de 8 cm : chaque tranche est un carré de 64 cm²), 04 (en biais, la section est plus
# grande : la diagonale dépasse le côté), 06 (piège : c'est l'ORIENTATION de la coupe qui décide),
# questions 05 (C : un rectangle identique à la face) et 07 (B : 64 cm²),
# défi 08 (pavé 30 × 10 × 10, tranches de 1 cm → 30 tranches de 100 cm²).
# Voix : manim/voix/3e-section-pave-cube.json ; marques : 3e_section_pave_cube_marques.json.
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/3e_section_pave_cube.py SectionPaveCube3e
# Sortie : manim/sorties/3e/maths/sections/33-section-pave-cube/

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from volume_4e_commun import *  # noqa: E402,F403
from volume_4e_commun import point3, pave, fatou, Paysage3e  # noqa: E402

MIE_C, MIE_D, MIE_COTE, CROUTE = "#fde68a", "#fef3c7", "#fcd34d", "#b45309"
PLAN_C = "#facc15"
SECTION_C = "#22d3ee"


def pain(l, p, h, u, o=ORIGIN, sw=4):
    """Le pain de mie : un pavé couleur mie, croûte dorée. Attributs : ceux de pave()."""
    return pave(l, p, h, u, o, face=MIE_C, dessus=MIE_D, cote=MIE_COTE, bord=CROUTE, sw=sw)


def plan_face(l, h, u, o=ORIGIN, y0=1.0, couleur=PLAN_C, op=0.3, sw=3):
    """Le plan de coupe PARALLÈLE À LA FACE AVANT, à la profondeur y0 : un parallélogramme
    vertical qui traverse le solide. o = le coin avant-bas-gauche du pavé."""
    q = lambda x, z: point3(o, u, x, y0, z)  # noqa: E731
    return Polygon(q(-0.25, -0.25), q(l + 0.25, -0.25), q(l + 0.25, h + 0.25), q(-0.25, h + 0.25),
                   fill_color=couleur, fill_opacity=op, stroke_color=couleur, stroke_width=sw)


def tranche(a, b, u, o=ORIGIN, sw=5, couleur=SECTION_C):
    """La tranche VUE À PLAT : un rectangle a × b. Attribut : .mie"""
    r = Rectangle(width=a * u, height=b * u, fill_color=couleur, fill_opacity=0.35,
                  stroke_color=couleur, stroke_width=sw).move_to(o)
    mie = Rectangle(width=a * u * 0.74, height=b * u * 0.74, fill_color=MIE_C, fill_opacity=0.55,
                    stroke_width=0).move_to(o)
    g = VGroup(r, mie)
    g.cadre, g.mie = r, mie
    return g


def vue_dessus(l, p, u, o=ORIGIN, sw=4):
    """Le pain vu de DESSUS : un rectangle l × p (longueur × largeur), croûte autour.
    o = son centre. Attributs : .bord"""
    r = Rectangle(width=l * u, height=p * u, fill_color=MIE_D, fill_opacity=0.5,
                  stroke_color=CROUTE, stroke_width=sw).move_to(o)
    g = VGroup(r)
    g.bord, g.l, g.p, g.u, g.o = r, l, p, u, o
    return g


class SectionPaveCube3e(Paysage3e):
    nom_voix = "3e-section-pave-cube"
    fichier_marques = "3e_section_pave_cube_marques.json"
    ceinture = "jaune"

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
        titre, ident, ech = self.garde("La section d'un pavé", self.identite, self.ceinture,
                                       y_ech=-2.45)
        self.au_mot("La section d'un pavé")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q = self.bloc(["Quelle forme", "a une tranche ?"], 38)
        q.move_to(P(0, 0.35)).align_to(P(-6.2, 0), LEFT)
        pn = pain(2.2, 1.4, 1.2, 0.85, P(2.3, -1.5))
        self.au_mot("Quelle forme")
        self.play(FadeIn(q[0], shift=UP * 0.2), FadeIn(pn, scale=0.85), run_time=0.5)
        pl = plan_face(2.2, 1.2, 0.85, P(2.3, -1.5), y0=0.9)
        self.au_mot("a une tranche")
        self.play(FadeIn(q[1], shift=UP * 0.2), FadeIn(pl, shift=LEFT * 0.3), run_time=0.6)
        self.attendre_voix(marge=0.6)

    # ── 01 ──────────────────────────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        p = fatou(1.0).move_to(P(-5.1, 0.4))
        self.au_mot("Voici Fatou")
        nom = self.t("Fatou", 40, BLEU_CALCUL).next_to(p, UP, buff=0.25)
        self.play(FadeIn(p, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("boulangère")
        met = self.t("boulangère", 26, BLEU_CALCUL).next_to(p, DOWN, buff=0.2)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.4)
        x = -2.9
        l1 = self.t("Chaque matin :", 32, WHITE)
        self.col(l1, 2.1, x)
        self.au_mot("Chaque matin")
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.4)
        pn = pain(2.6, 1.4, 1.3, 0.8, P(1.6, -1.1))
        l2 = self.t("des pains de mie.", 32, WHITE)
        self.col(l2, 1.3, x)
        self.au_mot("pains de mie")
        self.play(FadeIn(l2, shift=UP * 0.1), FadeIn(pn, scale=0.85), run_time=0.7)
        l3 = self.t("Un pain de mie, c'est un pavé droit.", 30, BASE_C)
        self.col(l3, 0.3, x)
        self.au_mot("Un pain de mie")
        self.play(FadeIn(l3, shift=UP * 0.1), Indicate(pn, color=BASE_C, scale_factor=1.05),
                  run_time=0.7)
        trs = VGroup(*[tranche(1.4, 1.3, 0.6, P(-4.6 + k * 1.1, -2.5), sw=3) for k in range(3)])
        l4 = self.t("Et chaque tranche est une section.", 32, SECTION_C)
        self.col(l4, -0.8, x)
        self.au_mot("chaque tranche est une section")
        self.play(FadeIn(l4, scale=1.08),
                  LaggedStart(*[FadeIn(t, scale=0.8) for t in trs], lag_ratio=0.18), run_time=0.9)
        self.insister(l4, 1.05, 0.25)
        self.attendre_voix()

    # ── 02 : la coupe parallèle à une face ──────────────────────────────────
    def ecran_parallele(self):
        self.ecran("02-parallele")
        u = 0.95
        pn = pain(2.6, 1.6, 1.4, u, P(-5.8, -1.6))
        self.add(pn)
        tit = hors_audit(self.t("Parallèlement à une face", 42, JAUNE_TITRE)).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.5)
        x = -1.2
        pl = plan_face(2.6, 1.4, u, pn.o, y0=1.1)
        l1 = self.t("Coupe parallèlement à une face :", 30, PLAN_C)
        self.col(l1, 2.0, x)
        self.au_mot("coupe parallèlement")
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(pl, shift=LEFT * 0.3), run_time=0.7)
        tr = tranche(1.6, 1.4, u, P(4.2, 0.6))
        l2 = self.bloc(["la tranche a exactement", "la forme de cette face :"], 30, WHITE)
        self.col(l2, 1.0, x)
        self.au_mot("tranche a exactement")
        self.play(FadeIn(l2[0], shift=UP * 0.1), FadeIn(tr, scale=0.8), run_time=0.7)
        self.au_mot("la forme de cette face")
        self.play(FadeIn(l2[1], shift=UP * 0.1), Indicate(pn.face, color=SECTION_C,
                                                          scale_factor=1.04), run_time=0.6)
        l3 = self.t("un rectangle, de mêmes dimensions.", 30, SECTION_C)
        self.col(l3, -0.2, x)
        self.au_mot("rectangle, de mêmes dimensions")
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.5)
        trs = VGroup(*[tranche(1.6, 1.4, u * 0.6, P(-5.2 + k * 1.2, -2.9), sw=3) for k in range(4)])
        l4 = self.t("Toutes les tranches sont identiques.", 32, VERT_OK)
        self.col(l4, -1.4, x)
        self.au_mot("Toutes les tranches")
        self.play(FadeIn(l4, scale=1.08),
                  LaggedStart(*[FadeIn(t, scale=0.8) for t in trs], lag_ratio=0.14), run_time=0.9)
        self.attendre_voix()

    # ── 03 : le cube de 8 cm ────────────────────────────────────────────────
    def ecran_le_cube(self):
        self.ecran("03-le-cube")
        u = 1.15
        cb = pain(1.6, 1.6, 1.6, u, P(-5.6, -1.7))
        tit = hors_audit(self.t("Et sur un cube ?", 44, JAUNE_TITRE)).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        x = -1.3
        l1 = self.ligne([("Un cube de", WHITE), ("8 cm", BASE_C)], 32, buff=0.18)
        self.col(l1, 2.0, x)
        self.au_mot("un cube de 8")
        self.play(FadeIn(l1[0], shift=UP * 0.1), FadeIn(cb, scale=0.85), run_time=0.7)
        self.play(FadeIn(l1[1], scale=1.15), run_time=0.3)
        pl = plan_face(1.6, 1.6, u, cb.o, y0=0.8)
        l2 = self.t("Chaque tranche parallèle à une face", 30, PLAN_C)
        self.col(l2, 1.1, x)
        self.au_mot("chaque tranche parallèle")
        self.play(FadeIn(l2, shift=UP * 0.1), FadeIn(pl, shift=LEFT * 0.3), run_time=0.7)
        car = tranche(1.6, 1.6, u, P(4.0, 0.2))
        # ⛔ « 8 cm de côté » attendait « côté », dit 0,8 s après le 8 : le nombre et le mot long
        #    vont dans deux morceaux (leçon 24).
        l3 = self.ligne([("serait un carré de", WHITE), ("8 cm", BASE_C), ("de côté :", WHITE)],
                        30, buff=0.16)
        self.col(l3, 0.2, x)
        self.au_mot("serait un carré")
        self.play(FadeIn(l3[0], shift=UP * 0.1), FadeIn(car, scale=0.8), run_time=0.7)
        # ⛔ Le second « 8 » de la voix est le DERNIER : le calcul se pose aussitôt après
        #    l'étiquette, sinon il part en AUDIT-TARD et en TARD, faute de « 8 » plus loin.
        l4 = self.ligne([("8 × 8", BLEU_D), ("= 64 cm²", VERT_OK)], 42, buff=0.22)
        self.col(l4, -1.0, x)
        self.au_mot("de 8 centimètres de côté")
        self.play(FadeIn(l3[1], scale=1.1), run_time=0.3)
        self.play(FadeIn(l4[0], shift=UP * 0.1), run_time=0.25)
        self.au_mot("de côté")
        self.play(FadeIn(l3[2], shift=UP * 0.1), run_time=0.3)
        self.au_mot("64 centimètres carrés")
        self.play(FadeIn(l4[1], scale=1.15), run_time=0.5)
        self.insister(l4[1], 1.08, 0.25)
        self.attendre_voix()

    # ── 04 : la coupe en biais ──────────────────────────────────────────────
    def ecran_en_biais(self):
        self.ecran("04-en-biais")
        tit = hors_audit(self.t("Et en biais ?", 44, JAUNE_TITRE)).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        u = 1.05
        # ⭐ Le pain VU DE DESSUS : la coupe droite et la coupe en biais se comparent d'un coup d'œil.
        vd = vue_dessus(3.0, 1.6, u, P(-3.3, 1.5))
        et = hors_audit(self.t("vu de dessus", 22, CROUTE)).next_to(vd, UP, buff=0.15)
        x = -0.1
        l1 = self.t("Coupe en biais :", 32, PLAN_C)
        self.col(l1, 1.9, x)
        self.au_mot("coupe en biais")
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(vd, scale=0.9), FadeIn(et), run_time=0.7)
        droite = Line(P(-3.6, 1.5 - 0.8 * u), P(-3.6, 1.5 + 0.8 * u), color=BLEU_D, stroke_width=7)
        biais = Line(P(-2.5, 1.5 - 0.8 * u), P(-1.3, 1.5 + 0.8 * u), color=ROUGE_ERREUR,
                     stroke_width=7)
        l2 = self.t("la tranche change.", 32, WHITE)
        self.col(l2, 1.1, x)
        self.au_mot("la tranche change")
        self.play(FadeIn(l2, shift=UP * 0.1), Create(droite), Create(biais), run_time=0.8)
        tr1 = tranche(1.6, 1.3, u * 0.8, P(-4.8, -1.6))
        tr2 = tranche(2.2, 1.3, u * 0.8, P(-1.8, -1.6), couleur=ROUGE_ERREUR)
        l3 = self.t("un rectangle plus long :", 30, ROUGE_ERREUR)
        self.col(l3, 0.2, x)
        self.au_mot("rectangle, mais plus long")
        self.play(FadeIn(l3, shift=UP * 0.1), FadeIn(tr1, scale=0.85), FadeIn(tr2, scale=0.85),
                  run_time=0.9)
        l4 = self.bloc(["la diagonale est plus longue", "que le côté."], 30, WHITE)
        self.col(l4, -0.8, x)
        self.au_mot("la diagonale")
        self.play(FadeIn(l4, shift=UP * 0.1), Indicate(biais, color=ROUGE_ERREUR,
                                                       scale_factor=1.08), run_time=0.7)
        l5 = self.t("Une section plus grande.", 34, JAUNE_TITRE)
        self.col(l5, -2.1, x)
        self.au_mot("section plus grande")
        self.play(FadeIn(l5, scale=1.1), run_time=0.5)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (réponse C) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        pn = pain(2.0, 1.2, 1.1, 0.8, P(-6.0, 0.3))
        pl = plan_face(2.0, 1.1, 0.8, pn.o, y0=0.8)

        def avant_q(sc):
            sc.play(FadeIn(pn), FadeIn(pl), run_time=0.45)

        self.question_gauche("05-question", "05b-reponse",
                             ["On tranche un pain de mie", "parallèlement à sa face avant.",
                              "La tranche est…"],
                             [self.choix("un carré plus petit"), self.choix("un triangle"),
                              self.choix("un rectangle identique")], 2,
                             ["Une coupe parallèle", "à une face donne cette face,",
                              "à la même taille."],
                             -0.3,
                             mot_q="On tranche un pain", avant_q=avant_q)

    # ── 06 : le piège de l'orientation ──────────────────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege", 0.65)
        tit = self.t("Attention au piège !", 48, ORANGE_Q).move_to(P(0, 3.15))
        self.au_mot("Attention au piège")
        self.play(Write(tit), run_time=0.4)
        x = -0.6
        l1 = self.bloc(["La section ne dépend pas", "que du solide :"], 32, ROUGE_ERREUR)
        self.col(l1, 2.0, x)
        self.au_mot("La section ne dépend pas")
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.45)
        self.au_mot("que du solide")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.4)
        l2 = self.bloc(["aussi de l'orientation", "de la coupe."], 32, PLAN_C)
        self.col(l2, 0.9, x)
        self.au_mot("aussi de l'orientation")
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.5)
        u = 0.75
        vd = vue_dessus(2.6, 1.5, u, P(-4.2, 1.6))
        d1 = Line(P(-4.6, 1.6 - 0.75 * u), P(-4.6, 1.6 + 0.75 * u), color=BLEU_D, stroke_width=6)
        d2 = Line(P(-3.6, 1.6 - 0.75 * u), P(-2.8, 1.6 + 0.75 * u), color=ROUGE_ERREUR,
                  stroke_width=6)
        tr1 = tranche(1.5, 1.2, u, P(-4.6, -1.2))
        tr2 = tranche(2.0, 1.2, u, P(-2.4, -1.2), couleur=ROUGE_ERREUR)
        l3 = self.bloc(["Le même pain donne", "des tranches différentes"], 30, WHITE)
        self.col(l3, -0.3, x)
        self.au_mot("Le même pain")
        self.play(FadeIn(l3[0], shift=UP * 0.1), FadeIn(vd, scale=0.9), Create(d1), Create(d2),
                  run_time=0.9)
        self.au_mot("des tranches différentes")
        self.play(FadeIn(l3[1], shift=UP * 0.1), FadeIn(tr1, scale=0.85), FadeIn(tr2, scale=0.85),
                  run_time=0.8)
        l4 = self.t("selon le geste.", 34, JAUNE_TITRE)
        self.col(l4, -1.6, x)
        self.au_mot("selon le geste")
        self.play(FadeIn(l4, scale=1.1), run_time=0.5)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (réponse B) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        cb = pain(1.4, 1.4, 1.4, 0.85, P(-5.8, 0.3))
        e8 = hors_audit(sur_fond(self.t("8 cm", 24, BASE_C))).next_to(cb, DOWN, buff=0.12)

        def avant_q(sc):
            sc.play(FadeIn(cb), FadeIn(e8), run_time=0.45)

        self.question_gauche("07-question", "07b-reponse",
                             ["Un cube de 8 cm de côté,", "coupé parallèlement à une face.",
                              "L'aire de la section ?"],
                             [self.choix("512 cm²"), self.choix("64 cm²"), self.choix("32 cm²")], 1,
                             ["8 × 8 = 64 cm².", "512, c'est 8 × 8 × 8 :", "le volume du cube."],
                             -0.3,
                             couper={0: ("8 × 8", "= 64 cm²."), 1: ("512,", "c'est 8 × 8 × 8 :")},
                             mot_q="On coupe un cube", avant_q=avant_q)

    # ── 08 : le défi ────────────────────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        u = 0.95
        pn = pain(3.0, 1.0, 1.0, u, P(-5.6, -1.0))
        # ⛔ La colonne du défi passe à gauche : à x = 0,9 le bloc du bas mordait sur Ti-Margo.
        x = -1.6
        l0 = self.t("Le pain de Fatou :", 32, WHITE)
        self.col(l0, 2.0, x)
        self.au_mot("Le pain de Fatou")
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(pn, scale=0.85), run_time=0.7)
        # ⛔ Un morceau = un nombre OU un mot long : « 30 cm de long » attendait « long »,
        #    dit 0,7 s après le 30, et le nombre partait en AUDIT-TARD (leçon 24).
        l1 = self.ligne([("30 cm", BASE_C), ("de long,", BASE_C)], 30, buff=0.16)
        self.col(l1, 1.2, x)
        self.au_mot("30 centimètres")
        self.play(FadeIn(l1[0], scale=1.1), run_time=0.3)
        self.au_mot("de long")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.3)
        l2 = self.ligne([("10 cm", BASE_C), ("de large,", BASE_C)], 30, buff=0.16)
        self.col(l2, 0.45, x)
        self.au_mot("10 de large")
        self.play(FadeIn(l2[0], scale=1.1), run_time=0.3)
        self.au_mot("de large")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.3)
        l2b = self.ligne([("10 cm", BASE_C), ("de haut.", BASE_C)], 30, buff=0.16)
        self.col(l2b, -0.3, x)
        self.au_mot("10 de haut")
        self.play(FadeIn(l2b[0], scale=1.1), run_time=0.3)
        self.au_mot("de haut")
        self.play(FadeIn(l2b[1], shift=UP * 0.1), run_time=0.3)
        coupes = VGroup(*[Line(point3(pn.o, u, 0.3 * k, -0.1, -0.1),
                               point3(pn.o, u, 0.3 * k, -0.1, 1.1), color=PLAN_C, stroke_width=2)
                          for k in range(1, 10)])
        l3 = self.ligne([("Des tranches de", WHITE), ("1 cm", PLAN_C), ("d'épaisseur,", WHITE)],
                        30, buff=0.16)
        self.col(l3, -1.0, x)
        self.au_mot("des tranches")
        self.play(FadeIn(l3[0], shift=UP * 0.1), FadeIn(coupes), run_time=0.7)
        self.au_mot("1 centimètre d'épaisseur")
        self.play(FadeIn(l3[1], scale=1.15), run_time=0.3)
        self.play(FadeIn(l3[2], shift=UP * 0.1), run_time=0.3)
        l4 = self.t("parallèles à la face carrée.", 30, WHITE)
        self.col(l4, -1.7, x)
        self.au_mot("parallèles à la face carrée")
        self.play(FadeIn(l4, shift=UP * 0.1), run_time=0.45)
        l5 = self.bloc(["Combien de tranches,", "et quelle aire chacune ?"], 32, JAUNE_TITRE)
        self.col(l5, -2.6, x)
        self.au_mot("Combien de tranches")
        self.play(FadeIn(l5[0], shift=UP * 0.1), run_time=0.45)
        self.au_mot("quelle est l'aire")
        self.play(FadeIn(l5[1], shift=UP * 0.1), run_time=0.45)
        self.pause_gauche()

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        u = 0.9
        tr = tranche(1.0, 1.0, u * 1.6, P(-4.9, 0.9))
        x = -2.4
        l1 = self.ligne([("Parallèles au carré", ORANGE_Q), ("10 sur 10 :", BASE_C)], 30, buff=0.18)
        self.col(l1, 2.0, x)
        self.au_mot("parallèles au carré")
        self.play(FadeIn(l1[0], shift=UP * 0.1), FadeIn(tr, scale=0.85), run_time=0.7)
        self.au_mot("de 10 sur 10")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.35)
        l2 = self.ligne([("il y en a", WHITE), ("30,", VERT_OK)], 36, buff=0.18)
        self.col(l2, 1.1, x)
        self.au_mot("il y en a 30")
        self.play(FadeIn(l2[0], shift=UP * 0.1), FadeIn(l2[1], scale=1.2), run_time=0.5)
        l3 = self.t("une par centimètre de longueur.", 30, WHITE)
        self.col(l3, 0.3, x)
        self.au_mot("une par centimètre")
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.45)
        trs = VGroup(*[tranche(1.0, 1.0, u * 0.45, P(-5.6 + k * 0.52, -1.5), sw=2)
                       for k in range(12)])
        self.play(LaggedStart(*[FadeIn(t, scale=0.8) for t in trs], lag_ratio=0.07), run_time=1.0)
        l4 = self.ligne([("Chaque tranche :", WHITE), ("10 × 10", BLEU_D), ("= 100 cm²", VERT_OK)],
                        32, buff=0.18)
        self.col(l4, -0.6, x)
        self.au_mot("Chaque tranche")
        self.play(FadeIn(l4[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("10 fois 10")
        self.play(FadeIn(l4[1], shift=UP * 0.1), run_time=0.35)
        self.au_mot("100 centimètres carrés")
        self.play(FadeIn(l4[2], scale=1.15), run_time=0.45)
        self.insister(l4[2], 1.1, 0.25)
        self.attendre_voix()

    # ── 09 ──────────────────────────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        pn = pain(1.8, 1.1, 1.0, 0.8, ORIGIN)
        fig = VGroup(pn, tranche(1.1, 1.0, 0.8, P(2.3, 0.4)))
        lignes = self.finale_gauche(fig, textes=[
            ("Une section parallèle à une face", "d'un pavé est un rectangle", "identique à cette face."),
            ("La forme de la section dépend", "de l'orientation de la coupe."),
            ("Une coupe en biais donne", "une section plus grande.")], fs=28)
        self.add(fig)
        self.au_mot("Une section parallèle")
        self.montrer_ligne(lignes[0], Indicate(pn.face, color=SECTION_C, scale_factor=1.05))
        self.au_mot("La forme de la section")
        self.montrer_ligne(lignes[1])
        self.au_mot("Une coupe en biais")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_parallele()
        self.ecran_le_cube()
        self.ecran_en_biais()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")
