# 4e_volume_cone.py
# EleveAI — Maths 4e — série « Périmètre, aire, volume, solides », épisode V3 : LE VOLUME D'UN CÔNE
# (micro volume_cone, notion volume_solide), AVEC VOIX. Paysage 16:9, CEINTURE VERTE.
# Vidéo COMMUNE avec la 3e (même micro `volume_cone`) : à brancher par `aussi`.
# Décor et métier : Malo, GLACIER — le cornet (centres cuisine, argent-budget ; tranche 12-14).
# Mapping micro → écrans : 02 (le cône tient 3 fois dans le cylindre de même base et même hauteur),
# 03 (la formule : π × r × r × h ÷ 3), 04 (le cornet : r = 3, h = 12 → 36π ≈ 113 cm³),
# 06 (piège : le diamètre n'est pas le rayon), questions 05 (A : 12π) et 07 (B : 30π),
# défi 08 (60 cornets × 113 = 6 780 cm³ > 5 000 cm³ : un bac ne suffit pas).
# Voix : manim/voix/4e-volume-cone.json ; marques : 4e_volume_cone_marques.json.
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/4e_volume_cone.py VolumeCone4e
# Sortie : manim/sorties/4e/maths/volume/13-volume-cone/

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from volume_4e_commun import *  # noqa: E402,F403
from volume_4e_commun import cone, cylindre, sable, malo, Paysage4e, SABLE_C  # noqa: E402

CONE_C, CONE_D, CONE_B = "#fb923c", "#fdba74", "#7c2d12"
GLACE_C = "#fda4af"


def cornet(r, h, u, o, sw=4, boule_glace=True):
    """Un cornet de glace : un cône pointe en BAS, surmonté d'une boule.
    o = la POINTE. Attributs : .cone .glace .hh (hauteur) .rayon_trait"""
    S = o
    centre_haut = o + UP * h * u
    w, e = 2 * r * u, 2 * r * u * 0.32
    flancs = Polygon(centre_haut + P(-r * u, 0), centre_haut + P(r * u, 0), S,
                     fill_color=CONE_C, fill_opacity=1, stroke_width=0)
    bord = Ellipse(width=w, height=e, fill_color=CONE_D, fill_opacity=1, stroke_color=CONE_B,
                   stroke_width=sw).move_to(centre_haut)
    gen = VGroup(Line(centre_haut + P(-r * u, 0), S), Line(centre_haut + P(r * u, 0), S)).set_stroke(CONE_B, sw)
    g = VGroup(flancs, bord, gen)
    if boule_glace:
        g.add(Circle(radius=r * u * 0.92, fill_color=GLACE_C, fill_opacity=1, stroke_color="#9f1239",
                     stroke_width=sw).move_to(centre_haut + UP * r * u * 0.55))
    g.cone, g.bord, g.pointe, g.centre_haut = VGroup(flancs, gen), bord, S, centre_haut
    g.hh = DashedLine(centre_haut, S, color=HAUTEUR_C, stroke_width=6, dash_length=0.12)
    g.rayon_trait = Line(centre_haut, centre_haut + P(r * u, 0), color=BASE_C, stroke_width=8)
    g.r, g.h, g.u = r, h, u
    return g


class VolumeCone4e(Paysage4e):
    nom_voix = "4e-volume-cone"
    fichier_marques = "4e_volume_cone_marques.json"
    ceinture = "verte"

    def etiquette(self, s, fs=28, couleur=WHITE):
        return sur_fond(m2(s, fs, couleur))

    # ── 00 ──────────────────────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Le volume d'un cône", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Le volume d'un cône")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q = self.bloc(["Combien de glace", "tient dans un cornet ?"], 38)
        q.move_to(P(0, 0.3)).align_to(P(-6.2, 0), LEFT)
        c = cornet(0.9, 2.4, 0.78, P(2.6, -1.9))
        self.au_mot("Combien de glace")
        self.play(FadeIn(q[0], shift=UP * 0.2), FadeIn(c, scale=0.85), run_time=0.5)
        self.au_mot("tient dans un cornet")
        self.play(FadeIn(q[1], shift=UP * 0.2), Indicate(c, color=JAUNE_TITRE, scale_factor=1.05), run_time=0.6)
        self.attendre_voix(marge=0.6)

    # ── 01 ──────────────────────────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        p = malo(1.0).move_to(P(-5.15, 0.0))
        self.au_mot("Voici Malo")
        nom = self.t("Malo", 40, BLEU_CALCUL).next_to(p, UP, buff=0.25)
        self.play(FadeIn(p, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("Il est glacier")
        met = self.t("glacier", 30, BLEU_CALCUL).next_to(p, DOWN, buff=0.2)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.4)
        self.au_mot("Ses cornets sont des cônes")
        cs = VGroup(*[cornet(0.72, 1.9, 0.62, P(-2.6 + k * 1.5, -1.6)) for k in range(3)])
        self.play(LaggedStart(*[FadeIn(c, shift=UP * 0.2) for c in cs], lag_ratio=0.2), run_time=0.7)
        x = 2.6
        l1 = self.bloc(["Pour savoir combien", "de glace il prépare,"], 30, WHITE)
        self.col(l1, 1.6, x)
        self.au_mot("Pour savoir combien de glace")
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.45)
        l2 = self.bloc(["il doit calculer", "le volume d'un cornet."], 30, JAUNE_TITRE)
        self.col(l2, 0.4, x)
        self.au_mot("il doit calculer le volume")
        self.play(FadeIn(l2, shift=UP * 0.1), Indicate(cs[1], color=JAUNE_TITRE, scale_factor=1.06),
                  run_time=0.5)
        self.attendre_voix()

    # ── 02 : le tiers du cylindre ───────────────────────────────────────────
    def ecran_le_tiers(self):
        self.ecran("02-le-tiers")
        u = 0.95
        co = cone(1.1, 2.1, u, P(-4.4, -1.9))
        cy = cylindre(1.1, 2.1, u, P(1.6, -1.9))
        et_c = hors_audit(self.t("le cône", 28, CONE_C)).next_to(co, DOWN, buff=0.3)
        et_y = hors_audit(self.t("le cylindre", 28, PRI_FACE)).next_to(cy, DOWN, buff=0.3)
        self.au_mot("comme la pyramide")
        tit = self.t("Même base, même hauteur", 42, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), FadeIn(co, shift=UP * 0.2), FadeIn(et_c), run_time=0.6)
        self.au_mot("dans le cylindre")
        self.play(FadeIn(cy, shift=UP * 0.2), FadeIn(et_y), run_time=0.5)
        self.au_mot("avec du sable")
        gr = sable(co, n=14, bas=0.0, haut=0.45, r=0.055)
        self.play(FadeIn(gr, shift=DOWN * 0.15), run_time=0.45)
        niveaux = []
        for k, mot in enumerate(["Une fois", "Deux fois", "Trois fois"]):
            self.au_mot(mot)
            h = 2.1 * (k + 1) / 3
            n = Polygon(cy.o + P(-1.1 * u, 0), cy.o + P(1.1 * u, 0), cy.o + P(1.1 * u, h * u),
                        cy.o + P(-1.1 * u, h * u), fill_color=SABLE_C, fill_opacity=0.9, stroke_width=0)
            dessus = Ellipse(width=2.2 * u, height=2.2 * u * 0.32, fill_color="#fde68a", fill_opacity=0.95,
                             stroke_width=0).move_to(cy.o + UP * h * u)
            for v in niveaux:
                self.remove(v)
            niveaux = [n, dessus]
            compte = hors_audit(self.t(mot, 32, SABLE_C)).move_to(P(-1.35, 1.0 - k * 0.7))
            self.play(FadeIn(n), FadeIn(dessus), FadeIn(compte, shift=RIGHT * 0.15), run_time=0.45)
        self.au_mot("Le cylindre est plein")
        plein = hors_audit(self.t("plein !", 32, VERT_OK)).move_to(P(-1.35, -1.2))
        self.play(FadeIn(plein, scale=1.3), run_time=0.35)
        res = hors_audit(self.gros("1 cône = 1 tiers du cylindre", fs=40)).move_to(P(0, -2.8))
        self.play(FadeIn(res, scale=1.15), run_time=0.5)
        self.insister(res, 1.06, 0.25)
        self.attendre_voix()

    # ── 03 : la formule ─────────────────────────────────────────────────────
    def ecran_formule(self):
        self.ecran("03-formule")
        u = 0.9
        co = cone(1.1, 1.9, u, P(-5.3, -1.4))
        self.add(co)
        x = -1.5
        l1 = self.t("La base d'un cône est un disque.", 32, WHITE)
        self.col(l1, 1.9, x)
        self.au_mot("La base d'un cône")
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(co.disque), run_time=0.45)
        tit = self.t("La formule", 44, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.3)
        l2 = self.ligne([("Son aire :", BASE_C), ("π × rayon × rayon.", BASE_C)], 32, buff=0.2)
        self.col(l2, 1.2, x)
        self.au_mot("Son aire")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("fois le rayon, fois le rayon")
        self.play(FadeIn(l2[1], shift=UP * 0.1), FadeIn(co.rayon_trait), run_time=0.45)
        cadre = RoundedRectangle(width=7.8, height=1.6, corner_radius=0.2, stroke_color=JAUNE_TITRE,
                                 stroke_width=5, fill_color="#431407", fill_opacity=0.6).move_to(P(1.4, -0.4))
        f = self.ligne([("π × rayon × rayon", BASE_C), ("× hauteur", HAUTEUR_C), ("÷ 3", JAUNE_TITRE)],
                       32, buff=0.2)
        f.move_to(cadre.get_center())
        self.au_mot("Volume du cône")
        self.play(FadeIn(cadre), run_time=0.3)
        self.play(FadeIn(f[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("fois la hauteur")
        self.play(FadeIn(f[1], shift=UP * 0.1), Create(co.hh), FadeIn(co.eq), run_time=0.45)
        self.au_mot("divisé par 3")
        self.play(FadeIn(f[2], scale=1.3), run_time=0.35)
        self.insister(f[2], 1.3, 0.25)
        self.attendre_voix()

    # ── 04 : le cornet de Malo ──────────────────────────────────────────────
    def ecran_exemple(self):
        self.ecran("04-exemple")
        u = 0.72
        c = cornet(1.0, 3.0, u, P(-4.6, -2.3))
        self.au_mot("Le cornet de Malo")
        tit = self.t("Le cornet de Malo", 42, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), FadeIn(c, shift=UP * 0.2), run_time=0.55)
        self.au_mot("3 centimètres de rayon")
        c3 = hors_audit(sur_fond(self.t("3 cm", 26, BASE_C))).next_to(c.rayon_trait, UP, buff=0.1)
        self.play(FadeIn(c.rayon_trait), FadeIn(c3), run_time=0.4)
        self.au_mot("12 centimètres de hauteur")
        c12 = hors_audit(sur_fond(self.t("12 cm", 26, HAUTEUR_C))).next_to(c.hh, RIGHT, buff=0.12)
        self.play(Create(c.hh), FadeIn(c12), run_time=0.4)
        x = -0.4
        l1 = self.ligne([("Le disque :", BASE_C), ("π × 3 × 3", BLEU_D), ("= 9π cm²", VERT_OK)], 32, buff=0.18)
        self.col(l1, 1.8, x)
        self.au_mot("Le disque de base")
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("pi fois 3 fois 3")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("9 pi centimètres carrés")
        self.play(FadeIn(l1[2], shift=UP * 0.1), run_time=0.3)
        l2 = self.ligne([("× 12", BLEU_D), ("= 108π", VERT_OK)], 34, buff=0.22)
        self.col(l2, 1.0, x)
        self.au_mot("On multiplie par 12")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("108 pi")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.3)
        l3 = self.ligne([("÷ 3", JAUNE_TITRE), ("= 36π cm³", VERT_OK)], 34, buff=0.22)
        self.col(l3, 0.2, x)
        self.au_mot("On divise par 3")
        self.play(FadeIn(l3[0], scale=1.2), run_time=0.3)
        self.au_mot("36 pi centimètres cubes")
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("Environ 113")
        res = self.gros("environ 113 cm³", fs=42)
        self.col(res, -0.7, x)
        e = self.etiquette("113 cm³", 28).move_to(c.cone.get_center() + DOWN * 0.3)
        self.play(FadeIn(res, scale=1.15), FadeIn(e, scale=1.2), run_time=0.5)
        self.insister(res, 1.08, 0.25)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (réponse A) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        co = cone(0.9, 1.7, 0.72, P(-5.0, 0.4))
        cr = hors_audit(sur_fond(self.t("2 cm", 24, BASE_C))).next_to(co.rayon_trait, DOWN, buff=0.08)
        ch = hors_audit(sur_fond(self.t("9 cm", 24, HAUTEUR_C))).next_to(co.hh, RIGHT, buff=0.1)

        def avant_q(sc):
            sc.play(FadeIn(co), FadeIn(co.rayon_trait), FadeIn(co.hh), FadeIn(cr), FadeIn(ch), run_time=0.4)

        self.question_gauche("05-question", "05b-reponse",
                             ["Un cône : rayon 2 cm,", "hauteur 9 cm.", "Quel est son volume ?"],
                             [self.choix("12π cm³"), self.choix("36π cm³"), self.choix("6π cm³")], 0,
                             ["π × 2 × 2 = 4π.", "× 9 = 36π.", "÷ 3 = 12π cm³.", "36π : l'oubli du ÷ 3."],
                             -0.3,
                             couper={1: ("× 9", "= 36π."), 2: ("÷ 3", "= 12π cm³."), 3: ("36π :", "l'oubli du", "÷ 3.")},
                             mot_q="Un cône a un rayon", avant_q=avant_q)

    # ── 06 : le piège du diamètre ───────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege", 0.65)
        tit = self.t("Attention au piège !", 48, ORANGE_Q).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        u = 0.95
        c = cornet(1.4, 2.4, u, P(-4.3, -2.2), boule_glace=False)
        self.add(c)
        diam = Line(c.centre_haut + P(-1.4 * u, 0), c.centre_haut + P(1.4 * u, 0), color=ROUGE_ERREUR,
                    stroke_width=8)
        x = -0.3
        l1 = self.bloc(["Quand on te donne le diamètre,", "ce n'est pas le rayon."], 32, ROUGE_ERREUR)
        self.col(l1, 1.6, x)
        self.au_mot("on te donne le diamètre")
        self.play(FadeIn(l1, shift=UP * 0.1), Create(diam), run_time=0.5)
        ed = hors_audit(sur_fond(self.t("6 cm", 24, ROUGE_ERREUR))).next_to(diam, UP, buff=0.12)
        self.play(FadeIn(ed), run_time=0.25)
        l2 = self.bloc(["Le rayon, c'est la moitié", "du diamètre."], 32, BASE_C)
        self.col(l2, 0.4, x)
        self.au_mot("Le rayon")
        self.play(FadeIn(l2, shift=UP * 0.1), FadeIn(c.rayon_trait), run_time=0.5)
        er = hors_audit(sur_fond(self.t("3 cm", 24, BASE_C))).next_to(c.rayon_trait, DOWN, buff=0.1)
        self.play(FadeIn(er), Indicate(c.rayon_trait, color=BASE_C, scale_factor=1.08), run_time=0.4)
        l3 = self.bloc(["Un cornet de 6 cm de diamètre", "a 3 cm de rayon."], 32, WHITE)
        self.col(l3, -1.0, x)
        self.au_mot("Un cornet de 6 centimètres")
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.45)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (réponse B) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        c = cornet(1.0, 2.0, 0.62, P(-5.0, -0.5), boule_glace=False)
        diam = Line(c.centre_haut + P(-1.0 * 0.62, 0), c.centre_haut + P(1.0 * 0.62, 0), color=BASE_C,
                    stroke_width=7)
        ed = hors_audit(sur_fond(self.t("6 cm", 24, BASE_C))).next_to(diam, UP, buff=0.1)
        ch = hors_audit(sur_fond(self.t("10 cm", 24, HAUTEUR_C))).next_to(c.hh, RIGHT, buff=0.1)

        def avant_q(sc):
            sc.play(FadeIn(c), FadeIn(diam), FadeIn(ed), FadeIn(c.hh), FadeIn(ch), run_time=0.4)

        self.question_gauche("07-question", "07b-reponse",
                             ["Un cornet : 6 cm de diamètre,", "10 cm de hauteur.", "Quel est son volume ?"],
                             [self.choix("120π cm³"), self.choix("30π cm³"), self.choix("90π cm³")], 1,
                             ["Le rayon vaut 3.", "π × 3 × 3 = 9π.", "× 10 = 90π, ÷ 3 = 30π cm³."],
                             -0.3,
                             couper={1: ("π × 3 × 3", "= 9π."), 2: ("× 10", "= 90π,", "÷ 3", "= 30π cm³.")},
                             mot_q="Un cornet de 6", avant_q=avant_q)

    # ── 08 : le défi ────────────────────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        cs = VGroup(*[cornet(0.52, 1.35, 0.6, P(-5.6 + (k % 6) * 0.95, -0.6 - (k // 6) * 1.5))
                      for k in range(12)])
        x = 0.9
        l0 = self.t("Malo prépare 60 cornets.", 32, WHITE)
        self.col(l0, 1.9, x)
        self.au_mot("Malo prépare 60 cornets")
        self.play(FadeIn(l0, shift=UP * 0.1),
                  LaggedStart(*[FadeIn(c, scale=0.8) for c in cs], lag_ratio=0.06), run_time=1.0)
        l1 = self.ligne([("Chaque cornet :", WHITE), ("113 cm³.", VERT_OK)], 32, buff=0.2)
        self.col(l1, 1.1, x)
        self.au_mot("Chaque cornet")
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("environ 113 centimètres cubes")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.35)
        l2 = self.ligne([("Un bac :", BLEU_D), ("5 litres.", BLEU_D)], 32, buff=0.2)
        self.col(l2, 0.3, x)
        self.au_mot("Un bac de glace contient 5 litres")
        bac = VGroup(RoundedRectangle(width=1.5, height=0.9, corner_radius=0.12, fill_color="#bae6fd",
                                      fill_opacity=0.9, stroke_color="#0369a1", stroke_width=4))
        bac.move_to(P(-5.3, -2.6))
        self.play(FadeIn(l2, shift=UP * 0.1), FadeIn(bac, shift=UP * 0.15), run_time=0.5)
        l3 = self.t("Un seul bac suffit-il ?", 36, JAUNE_TITRE)
        self.col(l3, -0.6, x)
        self.au_mot("Un seul bac suffit-il")
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.4)
        self.pause_defi(y=-2.1)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        x = -0.9
        l1 = self.ligne([("60 cornets :", WHITE), ("113 × 60", BLEU_D)], 34, buff=0.2)
        self.col(l1, 1.9, x)
        self.au_mot("60 cornets")
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("113 fois 60")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.3)
        l2 = self.t("= 6 780 cm³", 38, VERT_OK)
        self.col(l2, 1.1, x)
        self.au_mot("6 780 centimètres cubes")
        self.play(FadeIn(l2, scale=1.15), run_time=0.35)
        l3 = self.ligne([("1 L", BLEU_D), ("= 1 000 cm³,", WHITE)], 32, buff=0.2)
        self.col(l3, 0.3, x)
        self.au_mot("Un litre fait mille centimètres cubes")
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.45)
        l4 = self.ligne([("5 litres", BLEU_D), ("= 5 000 cm³.", VERT_OK)], 32, buff=0.2)
        self.col(l4, -0.4, x)
        self.au_mot("5 litres font 5 000")
        self.play(FadeIn(l4, shift=UP * 0.1), run_time=0.4)
        barres = VGroup(
            Rectangle(width=4.6, height=0.55, fill_color=GLACE_C, fill_opacity=0.95, stroke_width=0),
            Rectangle(width=3.4, height=0.55, fill_color="#bae6fd", fill_opacity=0.95, stroke_width=0))
        barres.arrange(DOWN, buff=0.22, aligned_edge=LEFT).move_to(P(-3.4, -2.3))
        et = VGroup(hors_audit(self.t("6 780", 24, "#9f1239")), hors_audit(self.t("5 000", 24, "#0369a1")))
        et[0].next_to(barres[0], RIGHT, buff=0.12)
        et[1].next_to(barres[1], RIGHT, buff=0.12)
        self.au_mot("6 780, c'est plus que 5 000")
        self.play(FadeIn(barres), FadeIn(et), run_time=0.5)
        self.au_mot("un seul bac ne suffit pas")
        res = self.bloc(["Un seul bac", "ne suffit pas."], 38, ORANGE_Q)
        self.col(res, -1.6, 1.5)
        self.play(FadeIn(res, scale=1.12), run_time=0.5)
        self.insister(res, 1.06, 0.25)
        self.attendre_voix()

    # ── 09 ──────────────────────────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        co = cone(1.0, 1.8, 0.85, ORIGIN)
        fig = VGroup(co, co.hh, co.rayon_trait)
        lignes = self.finale_gauche(fig, textes=[
            ("Le cône tient trois fois", "dans le cylindre de même base", "et de même hauteur."),
            ("Son volume : π × rayon", "× rayon × hauteur ÷ 3."),
            ("Le rayon est la moitié", "du diamètre.")], fs=30)
        self.add(fig)
        self.au_mot("Le cône tient trois fois")
        self.montrer_ligne(lignes[0], Indicate(co, color=JAUNE_TITRE, scale_factor=1.05))
        self.au_mot("Son volume")
        self.montrer_ligne(lignes[1], Indicate(co.rayon_trait, color=BASE_C, scale_factor=1.06))
        self.au_mot("Le rayon est la moitié")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_le_tiers()
        self.ecran_formule()
        self.ecran_exemple()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")
