# 4e_volume_defi.py
# EleveAI — Maths 4e — série « Périmètre, aire, volume, solides », épisode V4 : DÉFIS SUR LES VOLUMES
# (micro volume_defi, notion volume_solide), AVEC VOIX. Paysage 16:9, CEINTURE BLEUE.
# Vidéo COMMUNE avec la 3e (même micro `volume_defi`) : à brancher par `aussi`.
# Décor et métier : Elsa, HYDROLOGUE — la citerne d'eau de pluie, un cylindre posé sur un fond conique
# (centres nature-ecologie, meteo-climat ; tranche 12-14).
# Mapping micro → écrans : 02 (le cylindre : π × 1 × 1 × 3 = 3π ≈ 9,4 m³), 03 (le fond conique :
# π × 1 × 1 × 0,6 ÷ 3 = 0,2π ≈ 0,6 m³), 04 (le total : ≈ 10 m³ = 10 000 L), 06 (piège : × h pour le
# cylindre, × h ÷ 3 pour le cône), questions 05 (B : 20π) et 07 (C : 4π),
# défi 08 (10 000 ÷ 400 = 25 jours ; moins la semaine passée : 7 200 L, soit 18 jours).
# Voix : manim/voix/4e-volume-defi.json ; marques : 4e_volume_defi_marques.json.
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/4e_volume_defi.py VolumeDefi4e
# Sortie : manim/sorties/4e/maths/volume/14-volume-defi/

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from volume_4e_commun import *  # noqa: E402,F403
from volume_4e_commun import cone, cylindre, elsa, Paysage4e  # noqa: E402

CUVE_C, CUVE_D, CUVE_B = "#0ea5e9", "#7dd3fc", "#0c4a6e"
CONE_C, CONE_B = "#f59e0b", "#78350f"
EAU = "#38bdf8"


def citerne(r, h_cyl, h_cone, u, o, sw=4):
    """Une citerne : un cylindre debout, posé sur un fond CONIQUE pointe en bas.
    o = la pointe du cône. Attributs : .cyl .cone .base_cyl (le centre du disque du bas du cylindre)"""
    base_cyl = o + UP * h_cone * u
    cy = cylindre(r, h_cyl, u, base_cyl, corps=CUVE_C, dessus=CUVE_D, bord=CUVE_B, sw=sw)
    w, e = 2 * r * u, 2 * r * u * 0.32
    flancs = Polygon(base_cyl + P(-r * u, 0), base_cyl + P(r * u, 0), o, fill_color=CONE_C,
                     fill_opacity=1, stroke_width=0)
    gen = VGroup(Line(base_cyl + P(-r * u, 0), o), Line(base_cyl + P(r * u, 0), o)).set_stroke(CONE_B, sw)
    co = VGroup(flancs, gen)
    g = VGroup(co, cy)
    g.cyl, g.cone, g.base_cyl, g.pointe = cy, co, base_cyl, o
    g.r, g.h_cyl, g.h_cone, g.u = r, h_cyl, h_cone, u
    g.h_cyl_trait = DashedLine(base_cyl, base_cyl + UP * h_cyl * u, color=HAUTEUR_C, stroke_width=6,
                               dash_length=0.12)
    g.h_cone_trait = DashedLine(base_cyl, o, color=HAUTEUR_C, stroke_width=6, dash_length=0.1)
    g.rayon_trait = Line(base_cyl, base_cyl + P(r * u, 0), color=BASE_C, stroke_width=8)
    return g


class VolumeDefi4e(Paysage4e):
    nom_voix = "4e-volume-defi"
    fichier_marques = "4e_volume_defi_marques.json"
    ceinture = "bleue"

    def etiquette(self, s, fs=28, couleur=WHITE):
        return sur_fond(m2(s, fs, couleur))

    # ── 00 ──────────────────────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Défis sur les volumes", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Défis sur les volumes")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q = self.bloc(["Combien de jours tient", "une citerne pleine ?"], 38)
        q.move_to(P(0, 0.3)).align_to(P(-6.2, 0), LEFT)
        c = citerne(0.85, 2.0, 0.55, 0.72, P(2.7, -1.9))
        self.au_mot("Combien de jours tient")
        self.play(FadeIn(q[0], shift=UP * 0.2), FadeIn(c, scale=0.85), run_time=0.5)
        self.au_mot("une citerne pleine")
        self.play(FadeIn(q[1], shift=UP * 0.2), Indicate(c, color=JAUNE_TITRE, scale_factor=1.05), run_time=0.6)
        self.attendre_voix(marge=0.6)

    # ── 01 ──────────────────────────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        p = elsa(1.0).move_to(P(-4.95, 0.0))
        self.au_mot("Voici Elsa")
        nom = self.t("Elsa", 40, BLEU_CALCUL).next_to(p, UP, buff=0.25)
        self.play(FadeIn(p, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("hydrologue")
        met = self.bloc(["hydrologue :", "elle étudie", "l'eau"], 26, BLEU_CALCUL).next_to(p, DOWN, buff=0.18)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.45)
        c = citerne(0.9, 2.2, 0.6, 0.68, P(-1.9, -2.2))
        self.au_mot("une citerne qui récupère l'eau de pluie")
        gouttes = VGroup(*[Dot(P(-2.6 + k * 0.42, 2.6 - (k % 3) * 0.3), radius=0.07, color=EAU)
                           for k in range(7)])
        self.play(FadeIn(c, shift=UP * 0.2), LaggedStart(*[FadeIn(g, shift=DOWN * 0.3) for g in gouttes],
                                                         lag_ratio=0.1), run_time=0.8)
        x = 2.5
        l1 = self.bloc(["Cette citerne est un cylindre", "posé sur un fond"], 30, WHITE)
        self.col(l1, 1.4, x)
        self.au_mot("Cette citerne est un cylindre")
        self.play(FadeIn(l1, shift=UP * 0.1), Indicate(c.cyl, color=CUVE_C, scale_factor=1.05), run_time=0.5)
        l2 = self.t("en forme de cône.", 30, CONE_C)
        self.col(l2, 0.35, x)
        self.au_mot("en forme de cône")
        self.play(FadeIn(l2, shift=UP * 0.1), Indicate(c.cone, color=CONE_C, scale_factor=1.06), run_time=0.5)
        self.attendre_voix()

    # ── 02 : le cylindre ────────────────────────────────────────────────────
    def ecran_cylindre(self):
        self.ecran("02-le-cylindre")
        u = 1.0
        c = citerne(0.9, 2.4, 0.65, u, P(-5.0, -2.4))
        self.add(c)
        x = 0.4
        l1 = self.ligne([("Le cylindre :", CUVE_C), ("1 m de rayon,", BASE_C)], 32, buff=0.2)
        self.col(l1, 2.0, x)
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("1 mètre de rayon")
        self.play(FadeIn(l1[1], shift=UP * 0.1), FadeIn(c.rayon_trait), run_time=0.4)
        tit = hors_audit(self.t("Le cylindre", 44, JAUNE_TITRE)).move_to(P(0, 3.15))
        l2 = self.t("3 m de hauteur.", 32, HAUTEUR_C)
        self.col(l2, 1.3, x)
        self.au_mot("3 mètres de hauteur")
        self.play(Write(tit), FadeIn(l2, shift=UP * 0.1), Create(c.h_cyl_trait), run_time=0.5)
        l3 = self.ligne([("π × 1 × 1", BLEU_D), ("× 3", BLEU_D)], 34, buff=0.2)
        self.col(l3, 0.5, x)
        self.au_mot("pi fois 1 fois 1")
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("fois 3")
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.3)
        l4 = self.ligne([("= 3π m³,", VERT_OK), ("environ 9,4 m³.", VERT_OK)], 34, buff=0.2)
        self.col(l4, -0.3, x)
        self.au_mot("Trois pi mètres cubes")
        self.play(FadeIn(l4[0], scale=1.15), run_time=0.35)
        self.au_mot("environ 9,4")
        e = self.etiquette("9,4 m³", 28).move_to(c.cyl.get_center())
        self.play(FadeIn(l4[1], shift=UP * 0.1), FadeIn(e, scale=1.2), run_time=0.45)
        self.attendre_voix()

    # ── 03 : le fond conique ────────────────────────────────────────────────
    def ecran_cone(self):
        self.ecran("03-le-cone")
        u = 1.0
        c = citerne(0.9, 2.4, 0.65, u, P(-5.0, -2.4))
        self.add(c)
        x = 0.4
        l1 = self.ligne([("Le fond conique :", CONE_C), ("1 m de rayon,", BASE_C)], 32, buff=0.2)
        self.col(l1, 2.0, x)
        self.play(FadeIn(l1[0], shift=UP * 0.1), Indicate(c.cone, color=CONE_C, scale_factor=1.06),
                  run_time=0.4)
        self.au_mot("1 mètre de rayon")
        self.play(FadeIn(l1[1], shift=UP * 0.1), FadeIn(c.rayon_trait), run_time=0.4)
        tit = hors_audit(self.t("Le fond conique", 44, JAUNE_TITRE)).move_to(P(0, 3.15))
        l2 = self.t("0,6 m de hauteur.", 32, HAUTEUR_C)
        self.col(l2, 1.3, x)
        self.au_mot("0,6 mètre de hauteur")
        self.play(Write(tit), FadeIn(l2, shift=UP * 0.1), Create(c.h_cone_trait), run_time=0.5)
        l3 = self.ligne([("π × 1 × 1", BLEU_D), ("× 0,6", BLEU_D), ("÷ 3", JAUNE_TITRE)], 32, buff=0.18)
        self.col(l3, 0.5, x)
        self.au_mot("Pi fois 1 fois 1")
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("fois 0,6")
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("divisé par 3")
        self.play(FadeIn(l3[2], scale=1.2), run_time=0.3)
        l4 = self.ligne([("= 0,2π m³,", VERT_OK), ("environ 0,6 m³.", VERT_OK)], 32, buff=0.2)
        self.col(l4, -0.3, x)
        self.au_mot("Zéro virgule 2 pi")
        self.play(FadeIn(l4[0], scale=1.15), run_time=0.35)
        self.au_mot("environ 0,6 mètre cube")
        e = self.etiquette("0,6 m³", 26).move_to(c.cone.get_center() + DOWN * 0.1)
        self.play(FadeIn(l4[1], shift=UP * 0.1), FadeIn(e, scale=1.2), run_time=0.45)
        self.attendre_voix()

    # ── 04 : le total ───────────────────────────────────────────────────────
    def ecran_total(self):
        self.ecran("04-total")
        u = 1.0
        c = citerne(0.9, 2.4, 0.65, u, P(-5.2, -2.4))
        self.add(c)
        x = 0.1
        l1 = self.ligne([("En tout :", WHITE), ("9,4 + 0,6", BLEU_D)], 36, buff=0.2)
        self.col(l1, 1.9, x)
        self.au_mot("En tout")
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("9,4 plus 0,6")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.35)
        tit = self.t("La citerne entière", 44, JAUNE_TITRE).move_to(P(0, 3.15))
        l2 = self.t("environ 10 m³.", 40, VERT_OK)
        self.col(l2, 1.0, x)
        self.au_mot("environ 10 mètres cubes")
        eau = VGroup(c.cyl.corps.copy().set_fill(EAU, 0.85), c.cone[0].copy().set_fill(EAU, 0.85))
        self.play(Write(tit), FadeIn(l2, scale=1.15), FadeIn(eau), run_time=0.6)
        self.insister(l2, 1.1, 0.25)
        l3 = self.ligne([("Soit", WHITE), ("10 000 litres", VERT_OK), ("d'eau de pluie.", WHITE)], 34, buff=0.18)
        self.col(l3, -0.1, x)
        self.au_mot("Soit 10 000 litres")
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.5)
        rappel = hors_audit(self.t("1 m³ = 1 000 L", 30, BLEU_D))
        self.col(rappel, -1.1, x)
        self.play(FadeIn(rappel), run_time=0.35)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (réponse B) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        cy = cylindre(1.0, 2.0, 0.62, P(-5.0, -0.1), corps=CUVE_C, dessus=CUVE_D, bord=CUVE_B)
        rt = Line(P(-5.0, -0.1), P(-5.0, -0.1) + P(1.0 * 0.62, 0), color=BASE_C, stroke_width=7)
        er = hors_audit(sur_fond(self.t("2 m", 24, BASE_C))).next_to(rt, DOWN, buff=0.08)
        eh = hors_audit(sur_fond(self.t("5 m", 24, HAUTEUR_C))).next_to(cy, RIGHT, buff=0.12)

        def avant_q(sc):
            sc.play(FadeIn(cy), FadeIn(rt), FadeIn(er), FadeIn(eh), run_time=0.4)

        self.question_gauche("05-question", "05b-reponse",
                             ["Un cylindre : rayon 2 m,", "hauteur 5 m.", "Quel est son volume ?"],
                             [self.choix("10π m³"), self.choix("20π m³"), self.choix("40π m³")], 1,
                             ["π × 2 × 2 = 4π.", "× 5 = 20π m³.", "10π : le rayon", "compté une seule fois."],
                             -0.3,
                             couper={1: ("× 5", "= 20π m³."), 2: ("10π :", "le rayon")},
                             mot_q="Un cylindre de rayon", avant_q=avant_q)

    # ── 06 : le piège ───────────────────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege", 0.65)
        tit = self.t("Attention au piège !", 48, ORANGE_Q).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        cy = cylindre(0.85, 1.7, 0.85, P(-4.9, -1.9), corps=CUVE_C, dessus=CUVE_D, bord=CUVE_B)
        co = cone(0.85, 1.7, 0.85, P(-1.9, -1.9), corps=CONE_C, disque="#fcd34d", bord=CONE_B)
        self.add(cy, co)
        ecy = hors_audit(self.t("cylindre", 26, CUVE_C)).next_to(cy, DOWN, buff=0.22)
        eco = hors_audit(self.t("cône", 26, CONE_C)).next_to(co, DOWN, buff=0.22)
        self.add(ecy, eco)
        x = 1.2
        l1 = self.bloc(["Pour un cylindre,", "on multiplie par la hauteur."], 32, CUVE_C)
        self.col(l1, 1.5, x)
        self.au_mot("Pour un cylindre")
        self.play(FadeIn(l1, shift=UP * 0.1), Indicate(cy, color=CUVE_C, scale_factor=1.05), run_time=0.5)
        l2 = self.bloc(["Pour un cône,", "on multiplie par la hauteur", "et on divise par 3."], 32, CONE_C)
        self.col(l2, 0.1, x)
        self.au_mot("Pour un cône")
        self.play(FadeIn(l2, shift=UP * 0.1), Indicate(co, color=CONE_C, scale_factor=1.05), run_time=0.55)
        l3 = self.bloc(["Le même début,", "deux fins différentes."], 34, JAUNE_TITRE)
        self.col(l3, -1.5, x)
        self.au_mot("Le même début")
        self.play(FadeIn(l3, scale=1.1), run_time=0.5)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (réponse C) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        co = cone(1.0, 1.7, 0.62, P(-4.8, 0.35), corps=CONE_C, disque="#fcd34d", bord=CONE_B)
        er = hors_audit(sur_fond(self.t("2 m", 24, BASE_C))).next_to(co.rayon_trait, DOWN, buff=0.08)
        eh = hors_audit(sur_fond(self.t("3 m", 24, HAUTEUR_C))).next_to(co.hh, RIGHT, buff=0.1)

        def avant_q(sc):
            sc.play(FadeIn(co), FadeIn(co.rayon_trait), FadeIn(co.hh), FadeIn(er), FadeIn(eh), run_time=0.4)

        self.question_gauche("07-question", "07b-reponse",
                             ["Un fond conique : rayon 2 m,", "hauteur 3 m.", "Quel est son volume ?"],
                             [self.choix("12π m³"), self.choix("6π m³"), self.choix("4π m³")], 2,
                             ["π × 2 × 2 = 4π.", "× 3 = 12π, ÷ 3 = 4π m³.", "12π : l'oubli du ÷ 3."],
                             -0.3,
                             couper={1: ("× 3", "= 12π,", "÷ 3", "= 4π m³."), 2: ("12π :", "l'oubli du", "÷ 3.")},
                             mot_q="Un fond conique", avant_q=avant_q)

    # ── 08 : le défi ────────────────────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        c = citerne(0.85, 2.1, 0.6, 0.85, P(-5.2, -2.3))
        eau = VGroup(c.cyl.corps.copy().set_fill(EAU, 0.85), c.cone[0].copy().set_fill(EAU, 0.85))
        x = 0.4
        l0 = self.ligne([("La citerne :", WHITE), ("10 000 litres.", VERT_OK)], 32, buff=0.2)
        self.col(l0, 1.9, x)
        self.au_mot("La citerne")
        self.play(FadeIn(l0[0], shift=UP * 0.1), FadeIn(c), FadeIn(eau), run_time=0.5)
        self.au_mot("10 000 litres")
        self.play(FadeIn(l0[1], shift=UP * 0.1), run_time=0.3)
        l1 = self.ligne([("La famille utilise", WHITE), ("400 litres par jour.", BLEU_D)], 32, buff=0.2)
        self.col(l1, 1.1, x)
        self.au_mot("La famille")
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("400 litres par jour")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.3)
        l2 = self.bloc(["Il n'a pas plu", "depuis une semaine."], 32, ORANGE_Q)
        self.col(l2, 0.1, x)
        self.au_mot("Il n'a pas plu depuis une semaine")
        soleil = VGroup(Circle(radius=0.3, fill_color="#fbbf24", fill_opacity=1, stroke_width=0),
                        *[Line(ORIGIN, P(0.5, 0), stroke_color="#fbbf24", stroke_width=4).rotate(
                            k * PI / 4, about_point=ORIGIN).shift(P(0.0, 0.0)) for k in range(8)])
        soleil.move_to(P(-2.3, 2.1))
        self.play(FadeIn(l2, shift=UP * 0.1), FadeIn(soleil, scale=0.8), run_time=0.55)
        l3 = self.bloc(["Combien de jours", "peut-elle encore tenir ?"], 34, JAUNE_TITRE)
        self.col(l3, -1.2, x)
        self.au_mot("Combien de jours")
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.45)
        self.pause_defi(y=-2.6)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        x = -0.6
        l1 = self.ligne([("Pleine :", WHITE), ("10 000 ÷ 400", BLEU_D), ("= 25 jours.", VERT_OK)], 32, buff=0.18)
        self.col(l1, 1.9, x)
        self.au_mot("Pleine, elle tiendrait")
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("10 000 divisé par 400")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.35)
        self.au_mot("25 jours")
        self.play(FadeIn(l1[2], shift=UP * 0.1), run_time=0.3)
        l2 = self.ligne([("La semaine passée :", ORANGE_Q), ("7 × 400", BLEU_D), ("= 2 800 L.", VERT_OK)],
                        32, buff=0.18)
        self.col(l2, 1.1, x)
        self.au_mot("Mais la semaine passée")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("7 fois 400")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("2 800 litres")
        self.play(FadeIn(l2[2], shift=UP * 0.1), run_time=0.3)
        l3 = self.ligne([("Il reste", WHITE), ("7 200 litres.", VERT_OK)], 34, buff=0.2)
        self.col(l3, 0.3, x)
        self.au_mot("Il reste 7 200 litres")
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.4)
        l4 = self.ligne([("7 200 ÷ 400", BLEU_D)], 34, buff=0.2)
        self.col(l4, -0.4, x)
        self.au_mot("7 200", 2)
        self.play(FadeIn(l4), run_time=0.18)
        self.au_mot("18 jours")
        res = self.gros("18 jours", fs=46)
        self.col(res, -1.3, x)
        jours = VGroup(*[Square(side_length=0.3, fill_color=EAU, fill_opacity=0.9, stroke_color=CUVE_B,
                                stroke_width=2) for _ in range(18)]).arrange_in_grid(rows=2, buff=0.1)
        jours.move_to(P(-3.6, -2.6))
        self.play(FadeIn(res, scale=1.15),
                  LaggedStart(*[FadeIn(j, scale=0.7) for j in jours], lag_ratio=0.04), run_time=0.8)
        self.insister(res, 1.08, 0.25)
        self.attendre_voix()

    # ── 09 ──────────────────────────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        c = citerne(0.8, 1.8, 0.5, 0.78, ORIGIN)
        lignes = self.finale_gauche(c, textes=[
            ("Un solide compliqué se découpe", "en solides simples."),
            ("On calcule chaque morceau,", "puis on additionne."),
            ("Un mètre cube,", "c'est mille litres.")], fs=30)
        self.add(c)
        self.au_mot("Un solide compliqué")
        self.montrer_ligne(lignes[0], Indicate(c.cyl, color=CUVE_C, scale_factor=1.05))
        self.au_mot("On calcule chaque morceau")
        self.montrer_ligne(lignes[1], Indicate(c.cone, color=CONE_C, scale_factor=1.06))
        self.au_mot("Un mètre cube")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_cylindre()
        self.ecran_cone()
        self.ecran_total()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")
