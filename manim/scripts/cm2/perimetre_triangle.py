# perimetre_triangle.py
# EleveAI — Maths CM2 — série « Périmètre », épisode 02 : LE PÉRIMÈTRE DU TRIANGLE, AVEC DES NOMBRES À VIRGULE
# (micro perimetre_triangle, notion perimetre), AVEC VOIX. Paysage 16:9, CEINTURE VERTE.
# Short jumeau : film Ti Margo (cerf-volant 60 cm + 60 cm + 1 m = 220 cm → C).
# Décor et métier : Maëlle, VOILIÈRE (bande cousue autour d'une voile ; centres : bateaux, sport).
# Mapping micro → écrans : 02 (3 côtés), 03 (aligner les virgules : 3,5 + 2,5 + 4 = 10), 04 (3 côtés égaux :
# 1,5 × 3), 06 (piège : convertir d'abord, 80 cm + 1 m + 1 m = 280 cm), questions 05 et 07, défi 08 (3 voiles).
# Voix : manim/voix/cm2-perimetre-triangle.json (validée le 14/11, Julie, débit −6) ;
# marques : python manim/scripts/cm2/perimetre_marques.py triangle (06-piege corrigé dans le script des marques)
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/cm2/perimetre_triangle.py PerimetreTriangleCM2
# python -m manim render -qh --disable_caching manim/scripts/cm2/perimetre_triangle.py PerimetreTriangleCM2 -o eleveai-maths-cm2-perimetre-triangle --media_dir manim/scripts/cm2/media-perimetre-02
# Sortie : manim/sorties/cm2/maths/perimetre/02-triangle/eleveai-maths-cm2-perimetre-triangle.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from perimetre_cm2_commun import *  # noqa: E402,F403

VOILE, VOILE_B = "#f1f5f9", "#64748b"      # la toile blanche
COQUE, COQUE_B = "#1d4ed8", "#1e3a8a"      # la coque du bateau
EGAL_C, EGAL_B = "#a78bfa", "#4c1d95"      # la petite voile aux 3 côtés égaux


def voile(base=2.5, g=4, d=3.5, u=0.75, fond=VOILE, bord=VOILE_B):
    """Une voile : un triangle, la base en bas (la bôme), la pointe en haut.
    Côtés : 0 la base, 1 à droite (d), 2 à gauche (g)."""
    return poly(pts_triangle(base, g, d, u), fond, bord)


def bateau(v):
    """Le mât (côté gauche de la voile) et la coque, sous la voile v."""
    a, b, c = v.get_vertices()
    coque = Polygon(a + P(-0.5, -0.12), b + P(0.6, -0.12), b + P(0.3, -0.6), a + P(-0.25, -0.6),
                    fill_color=COQUE, fill_opacity=1, stroke_color=COQUE_B, stroke_width=3)
    mat = Line(a + P(-0.05, -0.1), c + P(-0.05, 0.15), color="#78350f", stroke_width=7)
    return VGroup(coque, mat)


class PerimetreTriangleBase(PaysagePerimetreCM2):
    nom_voix = "cm2-perimetre-triangle"
    fichier_marques = "perimetre_triangle_marques.json"
    ceinture = "verte"

    def voile_maelle(self, u=0.75, pos=P(-3.6, 0.45)):
        return voile(2.5, 4, 3.5, u).move_to(pos)

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Le périmètre du triangle", self.identite, self.ceinture, y_ech=-2.45)
        v = self.voile_maelle(0.55, P(3.8, 0.55))
        self.au_mot("Le périmètre du triangle")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), FadeIn(bateau(v)), FadeIn(v),
                  run_time=0.7)
        self.au_mot("avec des nombres à virgule")
        st = self.t("avec des nombres à virgule", 32, GRAY_B)
        st.move_to(P(0, 1.0)).align_to(P(-6.2, 0), LEFT)
        self.play(FadeIn(st, shift=UP * 0.1), run_time=0.35)
        q = self.bloc(["Combien de bande", "pour border une voile ?"], 36)
        q.move_to(P(0, -0.2)).align_to(P(-6.2, 0), LEFT)
        self.au_mot("Combien de bande")
        self.play(FadeIn(q, shift=UP * 0.2), Create(tour(v)), run_time=0.7)
        self.attendre_voix(marge=0.6)

    # ── 01 : Maëlle, voilière ───────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        ma = maelle(1.0).move_to(P(-5.3, 0.1))
        self.au_mot("Voici Maëlle")
        nom = self.t("Maëlle", 42, BLEU_D).next_to(ma, UP, buff=0.2)
        self.play(FadeIn(ma, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("voilière")
        met = self.t("voilière", 28, BLEU_D).next_to(ma, DOWN, buff=0.15)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.35)
        v = self.voile_maelle(0.6, P(0.6, 0.9))
        bt = bateau(v)
        self.au_mot("les voiles des bateaux")
        self.play(FadeIn(bt, shift=UP * 0.2), FadeIn(v, shift=UP * 0.2), run_time=0.6)
        self.au_mot("elle coud une bande solide")
        b = tour(v)
        e = self.t("la bande", 30, TOUR).next_to(v, RIGHT, buff=0.5)
        self.play(Create(b), FadeIn(e), run_time=0.9)
        self.au_mot("dans le vent")
        vent = VGroup(*[Arc(radius=0.5, start_angle=PI * 0.9, angle=-PI * 0.5, color=CARREAU, stroke_width=4)
                        .move_to(P(-1.3, 1.8 - 0.5 * k)) for k in range(3)])
        self.play(LaggedStart(*[Create(x) for x in vent], lag_ratio=0.2), run_time=0.6)
        self.au_mot("Combien de mètres de bande")
        q = self.bloc(["Combien de mètres de bande", "pour cette voile ?"], 36, JAUNE_TITRE)
        q.move_to(P(0.6, -1.85))
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.4)
        self.attendre_voix()

    # ── 02 : les 3 côtés ────────────────────────────────────────────────────
    def ecran_cotes(self):
        self.ecran("02-cotes")
        v = self.voile_maelle()
        self.add(bateau(v), v)
        et = etiquettes(v, ["2,5 m", "3,5 m", "4 m"], fs=28, ecart=0.45)
        self.au_mot("La voile est un triangle")
        l0 = self.t("La voile est un triangle.", 34, JAUNE_TITRE)
        self.col(l0, 2.4)
        self.play(FadeIn(l0, shift=UP * 0.1), Indicate(v, scale_factor=1.04), run_time=0.5)
        lignes = [("mesurent 4 mètres", 2, "4 m"), ("3,5 mètres", 1, "3,5 m"), ("et 2,5 mètres", 0, "2,5 m")]
        self.au_mot("Ses 3 côtés")
        l1 = self.t("3 côtés :", 34)
        self.col(l1, 1.4)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.3)
        prec = None
        for mot, i, s in lignes:
            self.au_mot(mot)
            lg = self.t(s, 36, JAUNE_TITRE)
            if prec is None:
                self.col(lg, 0.65)
            else:
                lg.next_to(prec, RIGHT, buff=0.45)
            self.play(FadeIn(lg, shift=UP * 0.1), FadeIn(et[i], scale=1.3),
                      Indicate(cote_tour(v, i, JAUNE_TITRE, 9), color=JAUNE_TITRE), run_time=0.3)
            prec = lg
        self.au_mot("la somme des 3 côtés")
        l2 = self.bloc(["Le périmètre :", "la somme des 3 côtés."], 36, JAUNE_TITRE)
        self.col(l2, -0.45)
        self.play(FadeIn(l2, shift=UP * 0.1), Create(tour(v)), run_time=0.7)
        self.attendre_voix()

    # ── 03 : aligner les virgules ───────────────────────────────────────────
    def ecran_additionner(self):
        self.ecran("03-additionner")
        v = self.voile_maelle()
        et = etiquettes(v, ["2,5 m", "3,5 m", "4 m"], fs=28, ecart=0.45)
        self.add(bateau(v), v, et)
        self.au_mot("en alignant les virgules")
        l0 = self.bloc(["On additionne", "en alignant les virgules."], 34, JAUNE_TITRE)
        self.col(l0, 2.4)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.4)
        self.au_mot("3,5 plus 2,5")
        h1 = self.t("3,5", 48, BLEU_D)
        h2 = self.t("+ 2,5", 48, BLEU_D)
        pose = VGroup(h1, h2).arrange(DOWN, aligned_edge=RIGHT, buff=0.15)
        self.col(pose, 0.95, 1.6)
        trait = Line(pose.get_corner(DL) + P(-0.1, -0.12), pose.get_corner(DR) + P(0.1, -0.12), color=WHITE,
                     stroke_width=4)
        self.play(FadeIn(pose, shift=UP * 0.1), Create(trait), Create(cote_tour(v, 1)), Create(cote_tour(v, 0)),
                  run_time=0.3)
        self.au_mot("2,5 : 6")
        r1 = self.t("6", 48, VERT_OK).next_to(trait, DOWN, buff=0.15).align_to(pose, RIGHT)
        self.play(FadeIn(r1, shift=UP * 0.1), run_time=0.3)
        self.au_mot("Plus 4 : 10")
        l2 = self.ligne([("6 + 4", BLEU_D), ("= 10", VERT_OK)], 44, buff=0.3)
        hors_audit(l2[0])
        self.col(l2, -1.1, 1.0)
        self.play(FadeIn(l2, shift=UP * 0.1), Create(cote_tour(v, 2)), run_time=0.4)
        self.au_mot("Il faut 10 mètres")
        res = hors_audit(self.gros("10 m de bande", fs=46))
        self.col(res, -2.05, 1.0)
        self.play(FadeIn(res, scale=1.2), run_time=0.5)
        self.attendre_voix()

    # ── 04 : 3 côtés égaux → × 3 ────────────────────────────────────────────
    def ecran_egaux(self):
        self.ecran("04-egaux")
        v = voile(1.5, 1.5, 1.5, 1.6, EGAL_C, EGAL_B).move_to(P(-3.6, 0.3))
        self.au_mot("Une petite voile")
        self.play(FadeIn(v, scale=1.2), run_time=0.4)
        self.au_mot("ses 3 côtés égaux")
        l0 = self.t("3 côtés égaux :", 34)
        self.col(l0, 2.4)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.3)
        self.au_mot("1,5 mètre chacun")
        l0b = self.ligne([("1,5 m", JAUNE_TITRE), ("chacun", WHITE)], 34, buff=0.2).next_to(l0, DOWN, buff=0.14)
        l0b.align_to(l0, LEFT)
        self.play(FadeIn(l0b, shift=UP * 0.1), FadeIn(etiquettes(v, ["1,5 m"] * 3, fs=28)), run_time=0.35)
        self.au_mot("Au lieu d'additionner 3 fois")
        l1 = self.t("1,5 + 1,5 + 1,5", 40, GRAY_B)
        hors_audit(l1)
        self.col(l1, 0.95)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.4)
        self.au_mot("1,5 fois 3")
        l2 = self.t("1,5 × 3", 48, BLEU_D)
        self.col(l2, -0.1)
        barre = Line(l1.get_left(), l1.get_right(), color=ROUGE_ERREUR, stroke_width=5)
        self.play(FadeIn(l2, shift=UP * 0.1), Create(barre), Create(tour(v)), run_time=0.5)
        self.au_mot("3, 4,5")
        l2b = self.t("= 4,5", 48, VERT_OK).next_to(l2, RIGHT, buff=0.3)
        self.play(FadeIn(l2b, shift=UP * 0.1), run_time=0.3)
        self.au_mot("Le périmètre est de 4,5 mètres")
        res = self.gros("Périmètre : 4,5 m", fs=40)
        hors_audit(res)
        self.col(res, -1.2)
        self.play(FadeIn(res, scale=1.2), run_time=0.5)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (réponse B) ─────────────────────────────────────────
    def figure_q1(self):
        p = poly(pts_triangle(4, 6, 6, 0.33), CARREAU, CARREAU_B).move_to(P(-3.7, 1.95))
        return VGroup(p, etiquettes(p, ["4 cm", "6 cm", "6 cm"], fs=26))

    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        g = self.figure_q1()

        def autres_q(sc):
            sc.play(FadeIn(g), run_time=0.35)

        def apres(sc):
            sc.play(Create(tour(g[0])), run_time=0.6)

        self.question_gauche("05-question", "05b-reponse",
                             ["Un triangle : 2 côtés égaux", "de 6 cm, une base de 4 cm.",
                              "Quel est son périmètre ?"],
                             [self.choix("10 cm"), self.choix("16 cm"), self.choix("24 cm")], 1,
                             ["Les 2 côtés égaux", "comptent :", "6 + 6 = 12,", "+ 4 = 16.",
                              "Le périmètre : 16 cm."],
                             -0.15, sans_audit=(4,), mot_q="Un triangle", autres_q=autres_q, autres_r=apres)

    # ── 06 : le piège (convertir d'abord) ───────────────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        self.au_mot("Attention")
        tit = self.t("Attention au piège !", 46, ROUGE_ERREUR)
        gauche(tit, -6.2, 3.05)
        self.play(Write(tit), run_time=0.35)
        v = voile(0.8, 1, 1, 2.9).move_to(P(-3.7, -0.35))
        self.au_mot("on convertit d'abord")
        l0 = self.bloc(["Unités différentes :", "on convertit d'abord !"], 34, JAUNE_TITRE)
        self.col(l0, 2.15)
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(v, scale=1.1), run_time=0.45)
        self.au_mot("80 centimètres")
        e0 = etiquette(v, 0, "80 cm", 28)
        self.play(FadeIn(e0, scale=1.3), run_time=0.25)
        self.au_mot("1 mètre et 1 mètre")
        e12 = VGroup(etiquette(v, 1, "1 m", 28), etiquette(v, 2, "1 m", 28))
        self.play(FadeIn(e12, scale=1.3), run_time=0.25)
        self.au_mot("80, 1 et 1")
        l1 = self.t("80 + 1 + 1", 40, ROUGE_ERREUR)
        self.col(l1, 1.0)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.3)
        barre = Line(l1.get_left(), l1.get_right(), color=ROUGE_ERREUR, stroke_width=6)
        self.play(Create(barre), run_time=0.25)
        self.au_mot("c'est 100 centimètres")
        l2 = self.ligne([("1 m", WHITE), ("= 100 cm", VERT_OK)], 40, buff=0.2)
        hors_audit(l2[0])
        self.col(l2, 0.0)
        n12 = VGroup(etiquette(v, 1, "100 cm", 28, VERT_OK), etiquette(v, 2, "100 cm", 28, VERT_OK))
        self.play(FadeIn(l2, shift=UP * 0.1), ReplacementTransform(e12, n12), run_time=0.45)
        self.au_mot("80 plus 100, plus 100")
        l3 = self.t("80 + 100 + 100", 40, BLEU_D)
        self.col(l3, -1.0)
        self.play(FadeIn(l3, shift=UP * 0.1), Create(tour(v)), run_time=0.35)
        self.au_mot("280 centimètres")
        res = self.gros("= 280 cm", fs=48)
        self.col(res, -1.95)
        self.play(FadeIn(res, scale=1.2), run_time=0.45)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (réponse A) ─────────────────────────────────────────
    def figure_q2(self):
        v = voile(1.5, 2.5, 2, 0.95).move_to(P(-3.7, 1.95))
        return VGroup(v, etiquettes(v, ["1,5 m", "2 m", "2,5 m"], fs=26))

    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        g = self.figure_q2()

        def autres_q(sc):
            sc.play(FadeIn(g), run_time=0.35)

        def apres(sc):
            sc.play(Create(tour(g[0])), run_time=0.6)

        self.question_gauche("07-question", "07b-reponse",
                             ["Une voile : 2 m, 1,5 m", "et 2,5 m.", "Quel est son périmètre ?"],
                             [self.choix("6 m"), self.choix("5,10 m"), self.choix("4 m")], 0,
                             ["1,5 + 2,5 :", "5 dixièmes", "+ 5 dixièmes = 1,", "donc 4.", "+ 2 = 6 m."],
                             -0.15, mot_q="Une voile", autres_q=autres_q, autres_r=apres)

    # ── 08 : le défi (3 voiles, rouleau de 20 m) ────────────────────────────
    def voiles_defi(self):
        petites = VGroup(*[voile(1, 2.5, 2.5, 0.42) for _ in range(3)]).arrange(RIGHT, buff=0.35)
        petites.move_to(P(-3.6, 2.0))
        grande = voile(1, 2.5, 2.5, 1.05).move_to(P(-4.3, -0.9))
        et = etiquettes(grande, ["1 m", "2,5 m", "2,5 m"], fs=24, ecart=0.62)
        return petites, grande, et

    def rouleau(self, pos=P(-1.85, -1.3)):
        disque = VGroup(Circle(0.42, fill_color=TOUR, fill_opacity=1, stroke_color="#7c2d12", stroke_width=4),
                        Circle(0.14, fill_color=BLACK, fill_opacity=1, stroke_width=0))
        e = hors_audit(self.t("20 m", 28, TOUR)).next_to(disque, DOWN, buff=0.12)
        return VGroup(disque, e).move_to(pos)

    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        petites, grande, et = self.voiles_defi()
        self.au_mot("Maëlle borde 3 voiles pareilles")
        l0 = self.t("3 voiles pareilles", 34)
        self.col(l0, 2.2, 0.35)
        self.play(FadeIn(l0, shift=UP * 0.1), LaggedStart(*[FadeIn(x, shift=UP * 0.2) for x in petites],
                                                          lag_ratio=0.15), run_time=0.7)
        self.au_mot("Chaque voile")
        l1 = self.t("Chaque voile :", 34)
        self.col(l1, 1.45, 0.35)
        self.play(FadeIn(l1, shift=UP * 0.1), TransformFromCopy(petites[0], grande), FadeIn(et), run_time=0.5)
        self.au_mot("2,5 mètres, 2,5 mètres")
        l1b = self.t("2,5 m, 2,5 m", 34, JAUNE_TITRE)
        self.col(l1b, 0.9, 0.35)
        self.play(FadeIn(l1b, shift=UP * 0.1), run_time=0.3)
        self.au_mot("et 1 mètre")
        l1c = self.t("et 1 m", 34, JAUNE_TITRE).next_to(l1b, RIGHT, buff=0.2)
        self.play(FadeIn(l1c, shift=UP * 0.1), run_time=0.3)
        self.au_mot("un rouleau de 20 mètres")
        ro = self.rouleau()
        l2 = self.ligne([("Un rouleau de", WHITE), ("20 m", TOUR)], 34, buff=0.18)
        self.col(l2, 0.05, 0.35)
        self.play(FadeIn(l2, shift=UP * 0.1), FadeIn(ro, scale=1.2), run_time=0.5)
        self.au_mot("Combien de mètres lui restera-t-il")
        q = self.bloc(["Combien de mètres", "lui restera-t-il ?"], 38, JAUNE_TITRE)
        self.col(q, -0.95, 0.35)
        self.play(FadeIn(q, shift=UP * 0.1), Wiggle(ro), run_time=0.5)
        self.pause_defi(y=-2.2)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        petites, grande, et = self.voiles_defi()
        ro = self.rouleau()
        self.add(petites, grande, et, ro)
        self.au_mot("Une voile")
        l0 = self.t("Une voile :", 34, ROSE_D)
        self.col(l0, 2.3, 0.35)
        self.play(FadeIn(l0, shift=UP * 0.1), Create(tour(grande)), run_time=0.45)
        self.au_mot("2,5 plus 2,5")
        a = self.t("2,5 + 2,5", 40, BLEU_D)
        self.col(a, 1.6, 0.35)
        self.play(FadeIn(a, shift=UP * 0.1), run_time=0.3)
        self.au_mot("2,5, 5")
        a2 = self.t("= 5", 40, VERT_OK).next_to(a, RIGHT, buff=0.2)
        self.play(FadeIn(a2, shift=UP * 0.1), run_time=0.25)
        self.au_mot("Plus 1 : 6 mètres")
        b = self.ligne([("+ 1", BLEU_D), ("= 6 m", VERT_OK)], 40, buff=0.25)
        b.next_to(a2, DOWN, buff=0.3)
        b.shift(RIGHT * (a2.get_left()[0] - b[1].get_left()[0]))
        self.play(FadeIn(b, shift=UP * 0.1), run_time=0.3)
        self.au_mot("Pour 3 voiles")
        l1 = self.t("3 voiles :", 34, ROSE_D)
        self.col(l1, 0.05, 0.35)
        self.play(FadeIn(l1, shift=UP * 0.1), *[Create(tour(x, sw=6)) for x in petites], run_time=0.5)
        self.au_mot("6 fois 3")
        c = self.t("6 × 3", 40, BLEU_D).next_to(l1, RIGHT, buff=0.25)
        self.play(FadeIn(c, shift=UP * 0.1), run_time=0.3)
        self.au_mot("18 mètres")
        c2 = self.t("= 18 m", 40, VERT_OK).next_to(c, RIGHT, buff=0.2)
        self.play(FadeIn(c2, shift=UP * 0.1), run_time=0.25)
        self.au_mot("20 moins 18")
        d = self.t("20 − 18", 40, BLEU_D)
        self.col(d, -0.8, 0.35)
        self.play(FadeIn(d, shift=UP * 0.1), Wiggle(ro), run_time=0.4)
        self.au_mot("il lui restera 2 mètres")
        res = self.gros("Il reste 2 m", fs=48)
        hors_audit(res)
        self.col(res, -1.7, 0.35)
        self.play(FadeIn(res, scale=1.2), run_time=0.5)
        self.insister(res, 1.1, 0.25)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        v = self.voile_maelle(0.55)
        fig = VGroup(v, tour(v))
        lignes = self.finale_gauche(fig, textes=[
            ("Le périmètre d'un triangle :", "la somme de ses 3 côtés."),
            ("Nombres à virgule :", "on aligne les virgules."),
            ("Unités différentes :", "on convertit d'abord.")], fs=32)
        self.add(fig)
        self.au_mot("Le périmètre d'un triangle")
        self.montrer_ligne(lignes[0], Indicate(fig, scale_factor=1.05))
        self.au_mot("on aligne les virgules")
        self.montrer_ligne(lignes[1])
        self.au_mot("on convertit d'abord")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_cotes()
        self.ecran_additionner()
        self.ecran_egaux()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")


class PerimetreTriangleCM2(PerimetreTriangleBase):
    identite = "Maths CM2 — EleveAI"
    ceinture = "verte"
