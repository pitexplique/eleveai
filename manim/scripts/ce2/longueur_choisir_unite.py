# longueur_choisir_unite.py
# EleveAI — Maths CE2 — série « Longueurs », épisode 05 : CHOISIR LA BONNE UNITÉ
# (micro ce2_longueur_choisir_unite, notion longueur), AVEC VOIX. Paysage 16:9, CEINTURE JAUNE.
# Short jumeau : film Ti Margo (Mamie à 3 millions de centimètres, réponse A).
# Décor et métier : Karim, PILOTE D'AVION (centre : transports) : l'avion 40 m, le vol 900 km, le stylo 14 cm.
# Mapping micro → écrans : 02 (un nombre simple : 14 cm plutôt que 140 mm), 03 (900 000 m → 900 km),
# 04 (repères : m pour une pièce, cm pour un objet en main, mm pour une chose fine),
# 06 (piège : la porte de 2 cm → 2 m), questions 05 (le couloir de l'aéroport, B) et 07 (le hublot de 30 : C),
# défi 08 (valise, trajet, billet : cm, km, mm).
# Voix : manim/voix/ce2-longueur-choisir-unite.json (validée le 14/11, Julie, débit −6) ;
# marques : longueur_choisir_unite_marques.json (python manim/scripts/ce2/perimetre_marques.py longueur:choisir-unite).
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/ce2/longueur_choisir_unite.py LongueurChoisirUniteCE2
# python -m manim render -qh --disable_caching manim/scripts/ce2/longueur_choisir_unite.py LongueurChoisirUniteCE2 -o eleveai-maths-ce2-longueur-choisir-unite --media_dir manim/scripts/ce2/media-lg-05
# Sortie : manim/sorties/ce2/maths/longueur/05-choisir-unite/eleveai-maths-ce2-longueur-choisir-unite.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from longueur_ce2_commun import *  # noqa: E402,F403

AVION = "#e2e8f0"
CIEL_B = "#7dd3fc"


def avion(L=3.0, couleur=AVION):
    """Un avion de ligne de profil, nez à droite, longueur L."""
    f = RoundedRectangle(width=L, height=L * 0.14, corner_radius=L * 0.07, fill_color=couleur, fill_opacity=1,
                         stroke_width=0)
    nez = Ellipse(width=L * 0.14, height=L * 0.12, fill_color=couleur, fill_opacity=1, stroke_width=0)
    nez.move_to(P(L * 0.47, -L * 0.005))
    aile = Polygon(P(-L * 0.05, -L * 0.02), P(L * 0.12, -L * 0.02), P(-L * 0.12, -L * 0.2), P(-L * 0.22, -L * 0.2),
                   fill_color="#94a3b8", fill_opacity=1, stroke_width=0)
    deriv = Polygon(P(-L * 0.36, L * 0.06), P(-L * 0.5, L * 0.06), P(-L * 0.5, L * 0.28), fill_color="#dc2626",
                    fill_opacity=1, stroke_width=0)
    hubl = VGroup(*[Circle(radius=L * 0.017, fill_color=CIEL_B, fill_opacity=1, stroke_width=0)
                    .move_to(P(-L * 0.3 + k * L * 0.065, L * 0.02)) for k in range(10)])
    cock = Polygon(P(L * 0.42, L * 0.02), P(L * 0.49, L * 0.02), P(L * 0.45, L * 0.05), fill_color="#1e3a8a",
                   fill_opacity=1, stroke_width=0)
    return VGroup(deriv, f, nez, aile, hubl, cock)


def stylo(L=1.4):
    return crayon(L, L * 0.13, corps="#2563eb", pointe="#e5e7eb")


def valise(s=1.0):
    c = RoundedRectangle(width=1.3 * s, height=0.9 * s, corner_radius=0.1 * s, fill_color="#be123c",
                         fill_opacity=1, stroke_color=WHITE, stroke_width=2)
    poig = RoundedRectangle(width=0.45 * s, height=0.2 * s, corner_radius=0.08 * s, stroke_color=WHITE,
                            stroke_width=4).next_to(c, UP, buff=-0.04 * s)
    bandes = VGroup(*[Line(c.get_top() + RIGHT * dx * s, c.get_bottom() + RIGHT * dx * s, color="#fda4af",
                           stroke_width=3) for dx in (-0.35, 0.35)])
    return VGroup(poig, c, bandes)


def billet(s=1.0):
    b = RoundedRectangle(width=1.5 * s, height=0.7 * s, corner_radius=0.06 * s, fill_color="#fef3c7",
                         fill_opacity=1, stroke_color="#b45309", stroke_width=2)
    tr = VGroup(*[Line(P(-0.55 * s, y * s), P(0.2 * s, y * s), color="#92400e", stroke_width=2)
                  for y in (0.15, 0, -0.15)])
    av = avion(0.45 * s, "#1d4ed8").move_to(P(0.48 * s, 0.05 * s))
    return VGroup(b, tr, av)


def hublot(r=0.8):
    return VGroup(RoundedRectangle(width=r * 1.5, height=r * 2.0, corner_radius=r * 0.7, fill_color="#cbd5e1",
                                   fill_opacity=1, stroke_width=0),
                  RoundedRectangle(width=r * 1.05, height=r * 1.5, corner_radius=r * 0.5, fill_color=CIEL_B,
                                   fill_opacity=1, stroke_width=0),
                  Ellipse(width=r * 0.6, height=r * 0.25, fill_color=WHITE, fill_opacity=0.9, stroke_width=0)
                  .shift(UP * r * 0.2 + LEFT * r * 0.1))


def ville(s=1.0, c1="#fde68a", c2="#93c5fd"):
    return VGroup(*[Rectangle(width=0.3 * s, height=h * s, fill_color=c, fill_opacity=1, stroke_width=0)
                    for h, c in ((0.7, c1), (1.1, c2), (0.5, c1), (0.9, c2))]).arrange(RIGHT, buff=0.05,
                                                                                      aligned_edge=DOWN)


def couloir(s=1.0):
    sol = Polygon(P(-1.4 * s, -0.6 * s), P(1.4 * s, -0.6 * s), P(0.4 * s, 0.2 * s), P(-0.4 * s, 0.2 * s),
                  fill_color="#64748b", fill_opacity=1, stroke_width=0)
    murs = VGroup(Polygon(P(-1.4 * s, -0.6 * s), P(-0.4 * s, 0.2 * s), P(-0.4 * s, 0.9 * s), P(-1.4 * s, 1.1 * s),
                          fill_color="#cbd5e1", fill_opacity=1, stroke_width=0),
                  Polygon(P(1.4 * s, -0.6 * s), P(0.4 * s, 0.2 * s), P(0.4 * s, 0.9 * s), P(1.4 * s, 1.1 * s),
                          fill_color="#e2e8f0", fill_opacity=1, stroke_width=0))
    return VGroup(sol, murs)


def pouce(s=1.0, couleur="#e0ac69"):
    p = RoundedRectangle(width=0.32 * s, height=0.75 * s, corner_radius=0.15 * s, fill_color=couleur,
                         fill_opacity=1, stroke_width=0)
    ongle = RoundedRectangle(width=0.2 * s, height=0.22 * s, corner_radius=0.08 * s, fill_color="#fde4cf",
                             fill_opacity=1, stroke_width=0).move_to(p.get_top() + DOWN * 0.17 * s)
    return VGroup(p, ongle)


class LongueurChoisirUniteBase(PaysageLongueurCE2):
    nom_voix = "ce2-longueur-choisir-unite"
    fichier_marques = "longueur_choisir_unite_marques.json"
    ceinture = "jaune"

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Choisir la bonne unité", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Choisir la bonne unité")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q = self.bloc(["Centimètres, mètres", "ou kilomètres ?"], 38, JAUNE_TITRE, buff=0.22)
        q.move_to(P(0, 0.4)).align_to(P(-6.2, 0), LEFT)
        av = avion(3.6).move_to(P(3.2, 0.6))
        self.au_mot("Centimètres, mètres")
        self.play(FadeIn(q, shift=UP * 0.2), FadeIn(av, shift=LEFT * 0.6), run_time=0.5)
        self.attendre_voix(marge=0.6)

    # ── 01 : Karim, pilote d'avion ──────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pe = karim(0.95).move_to(P(-5.0, 0.4))
        self.au_mot("Voici Karim")
        nom = self.t("Karim", 42, JAUNE_TITRE).next_to(pe, UP, buff=0.55)
        self.play(FadeIn(pe, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("Il est pilote d'avion")
        met = self.t("pilote d'avion", 26, CIEL_B).next_to(pe, DOWN, buff=0.12)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.35)
        rows = [("Son avion mesure 40", "son avion", "40 m", avion(2.2), 2.3),
                ("Il vole 900", "son vol", "900 km", VGroup(ville(0.5), Line(P(0, 0), P(1.0, 0), color=GRAY_B,
                                                                               stroke_width=4),
                                                         ville(0.5, "#fca5a5", "#a7f3d0")).arrange(RIGHT, buff=0.1,
                                                                                                 aligned_edge=DOWN),
                 0.7),
                ("son stylo mesure 14", "son stylo", "14 cm", stylo(1.4), -0.9)]
        for ex, nm, lg, d, y in rows:
            d.move_to(P(-1.6, y))
            t = self.ligne([(nm, WHITE), (lg, JAUNE_TITRE)], 38, buff=0.3)
            gauche(t, 0.6, y)
            self.au_mot(ex)
            self.play(FadeIn(d, shift=RIGHT * 0.3), FadeIn(t, shift=UP * 0.1), run_time=0.4)
        self.au_mot("Pourquoi trois unités différentes")
        q = self.t("Pourquoi trois unités différentes ?", 38, JAUNE_TITRE)
        gauche(q, -3.2, -2.4)
        self.play(FadeIn(q, scale=1.1), run_time=0.4)
        self.attendre_voix()

    # ── 02 : un nombre simple ───────────────────────────────────────────────
    def ecran_regle(self):
        self.ecran("02-regle")
        self.au_mot("On choisit l'unité qui donne un nombre simple")
        l0 = self.bloc(["On choisit l'unité", "qui donne un nombre simple."], 38, JAUNE_TITRE, buff=0.15)
        gauche(l0, -6.2, 2.6)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.4)
        st = stylo(3.2).move_to(P(2.6, 2.4))
        self.add(st)
        self.play(FadeIn(st, shift=LEFT * 0.3), run_time=0.3)
        b = self.ligne([("en centimètres :", WHITE), ("14", VERT_OK)], 44, buff=0.3)
        gauche(b, -5.6, 0.6)
        self.au_mot("Le stylo en centimètres")
        self.play(FadeIn(b[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("14. En")
        ok = self.coche().scale(1.6).next_to(b, RIGHT, buff=0.5)
        self.play(FadeIn(b[1], scale=1.3), FadeIn(ok), run_time=0.3)
        m = self.ligne([("en millimètres :", WHITE), ("140", ORANGE_RETENUE)], 44, buff=0.3)
        gauche(m, -5.6, -0.8)
        self.au_mot("En millimètres")
        self.play(FadeIn(m[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("140")
        self.play(FadeIn(m[1], scale=1.3), run_time=0.3)
        self.au_mot("c'est plus long à dire")
        lo = self.t("plus long à dire", 34, ORANGE_RETENUE).next_to(m, RIGHT, buff=0.5)
        self.play(FadeIn(lo), run_time=0.3)
        self.insister(b[1], 1.3, 0.25)
        self.attendre_voix()

    # ── 03 : les grandes distances ──────────────────────────────────────────
    def ecran_grand(self):
        self.ecran("03-grand")
        v1 = ville(0.9).move_to(P(-5.0, 2.1))
        v2 = ville(0.9, "#fca5a5", "#a7f3d0").move_to(P(4.8, 2.1))
        tr = DashedLine(v1.get_right() + UP * 0.1, v2.get_left() + UP * 0.1, color=GRAY_B)
        av = avion(1.3).move_to(v1.get_right() + P(0.8, 0.6))
        self.au_mot("Le trajet de l'avion")
        self.play(FadeIn(v1), FadeIn(v2), Create(tr), FadeIn(av), run_time=0.45)
        self.play(av.animate.move_to(v2.get_left() + P(-0.8, 0.6)), run_time=1.0)
        a = self.ligne([("en mètres :", WHITE), ("900 000 m", ROUGE_ERREUR)], 46, buff=0.3)
        gauche(a, -5.6, 0.3)
        hors_audit(a[1])  # « 900 000 » : l'audit ne le lit pas en un seul nombre ; posé à « 900 000 »
        self.au_mot("en mètres")
        self.play(FadeIn(a[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("900 000")
        self.play(FadeIn(a[1], scale=1.3), run_time=0.35)
        self.au_mot("Beaucoup trop de chiffres")
        l1 = self.t("Beaucoup trop de chiffres !", 34, ROUGE_ERREUR)
        gauche(l1, -5.3, -0.5)
        self.play(FadeIn(l1, shift=UP * 0.1), Wiggle(a[1]), run_time=0.5)
        b = self.ligne([("en kilomètres :", WHITE), ("900 km", VERT_OK)], 46, buff=0.3)
        gauche(b, -5.6, -1.5)
        hors_audit(b[1])  # « 900 » : le 900 de « 900 000 » est dit avant ; posé à son extrait
        self.au_mot("En kilomètres")
        self.play(FadeIn(b[0], shift=UP * 0.1), run_time=0.3)
        self.aux_extraits([b[1]], [("900. Pour", 1)], run_time=0.3)
        self.au_mot("Pour les grandes distances")
        l2 = self.ligne([("Grandes distances :", JAUNE_TITRE), ("le kilomètre.", VERT_OK)], 38, buff=0.25)
        gauche(l2, -5.6, -2.5)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.4)
        self.insister(b[1], 1.2, 0.25)
        self.attendre_voix()

    # ── 04 : les repères ────────────────────────────────────────────────────
    def ecran_repere(self):
        self.ecran("04-repere")
        lignes = [("Pour une pièce", "une pièce, une maison, un avion", "le mètre", "m",
                   VGroup(porte(1.0, 0.5), avion(1.4)).arrange(RIGHT, buff=0.3, aligned_edge=DOWN), 2.1),
                  ("Pour un objet qui tient dans la main", "un objet dans la main", "le centimètre", "cm",
                   stylo(1.6), 0.3),
                  ("Pour une chose toute fine", "une chose toute fine", "le millimètre", "mm",
                   billet(0.9), -1.5)]
        for ex, quoi, unite, u, d, y in lignes:
            t = self.ligne([(quoi + " :", WHITE), (unite, VERT_OK)], 34, buff=0.25)
            gauche(t, -6.2, y)
            uu = self.t(u, 60, VERT_OK).move_to(P(5.3, y))
            d.move_to(P(3.0, y))
            self.au_mot(ex)
            self.play(FadeIn(t[0], shift=UP * 0.1), FadeIn(d, shift=LEFT * 0.2), run_time=0.35)
            self.play(FadeIn(t[1], scale=1.1), FadeIn(uu, scale=1.3), run_time=0.3)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (réponse B) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        co = couloir(1.0).move_to(P(-3.8, 1.3))

        def autres_q(sc):
            sc.play(FadeIn(co), run_time=0.35)

        def apres(sc):
            sc.play(Indicate(co, color=VERT_OK, scale_factor=1.05), run_time=0.25)

        self.question_gauche("05-question", "05b-reponse",
                             ["Avec quelle unité mesure-t-on", "la longueur d'un couloir", "de l'aéroport ?"],
                             [self.choix("le millimètre"), self.choix("le mètre"), self.choix("le kilomètre")], 1,
                             ["Pour un couloir, le mètre", "donne un nombre simple.",
                              "Le km : pour les routes ;", "le mm : les choses fines."],
                             -0.75, mot_q="Avec quelle unité", autres_q=autres_q, autres_r=apres)

    # ── 06 : le piège : la porte de 2 cm ────────────────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        self.au_mot("Attention")
        tit = self.t("Attention au piège !", 46, ROUGE_ERREUR)
        gauche(tit, -6.2, 3.0)
        self.play(Write(tit), run_time=0.35)
        self.au_mot("Tom écrit")
        l0 = self.ligne([("Tom écrit : la porte mesure", WHITE), ("2 cm", ROUGE_ERREUR)], 36, buff=0.22)
        gauche(l0, -6.2, 2.0)
        self.play(FadeIn(l0[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("2 centimètres de haut")
        self.play(FadeIn(l0[1], scale=1.2), run_time=0.3)
        self.au_mot("Le nombre 2 est juste")
        l1 = self.ligne([("Le nombre 2 : juste.", VERT_OK), ("L'unité : fausse !", ROUGE_ERREUR)], 34, buff=0.4)
        gauche(l1, -6.2, 1.1)
        hors_audit(l1[0])
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("mais l'unité est fausse")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.3)
        po = pouce(1.6).move_to(P(-4.6, -1.0))
        cm2 = Line(po.get_corner(DL) + DOWN * 0.15, po.get_corner(DR) + DOWN * 0.15, color=ORANGE_RETENUE,
                   stroke_width=5)
        e2 = hors_audit(self.t("2 cm : un pouce !", 32, ORANGE_RETENUE)).next_to(po, RIGHT, buff=0.3)
        self.au_mot("2 centimètres, c'est la largeur d'un pouce")
        self.play(FadeIn(po, scale=1.2), Create(cm2), FadeIn(e2), run_time=0.45)
        pt = porte(2.6, 1.2).move_to(P(3.6, -1.1))
        f = fleche_double(pt.get_corner(UR) + RIGHT * 0.3, pt.get_corner(DR) + RIGHT * 0.3, VERT_OK)
        e = hors_audit(self.t("2 m", 40, VERT_OK)).next_to(f, RIGHT, buff=0.15)
        self.au_mot("La porte mesure 2 mètres")
        self.play(FadeIn(pt, shift=UP * 0.2), GrowFromCenter(f), FadeIn(e, scale=1.2), run_time=0.45)
        self.insister(e, 1.3, 0.25)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (réponse C) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        h = hublot(0.75).move_to(P(-3.8, 1.3))
        et = hors_audit(self.t("30 ?", 40, JAUNE_TITRE)).next_to(h, RIGHT, buff=0.3)

        def autres_q(sc):
            sc.play(FadeIn(h, scale=1.1), FadeIn(et), run_time=0.35)

        def apres(sc):
            sc.play(Indicate(h, color=VERT_OK, scale_factor=1.06), run_time=0.25)

        self.question_gauche("07-question", "07b-reponse",
                             ["Karim lit :", "le hublot mesure 30.", "Quelle unité ?"],
                             [self.choix("30 km"), self.choix("30 mm"), self.choix("30 cm")], 2,
                             ["Un hublot : grand comme", "une feuille de cahier,", "30 cm.",
                              "30 mm : un bouton !"],
                             -0.75, sans_audit=(2, 3), mot_q="Karim lit", autres_q=autres_q, autres_r=apres)

    # ── 08 : le défi ────────────────────────────────────────────────────────
    def trois(self):
        tr = VGroup(ville(0.55), Line(P(0, 0), P(1.2, 0), color=GRAY_B, stroke_width=5),
                    ville(0.55, "#fca5a5", "#a7f3d0")).arrange(RIGHT, buff=0.08, aligned_edge=DOWN)
        return VGroup(valise(1.1), tr, billet(1.0)).arrange(RIGHT, buff=1.2).move_to(P(-0.7, 0.5))

    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        self.au_mot("Choisis l'unité")
        l0 = self.t("Choisis l'unité :", 36, JAUNE_TITRE)
        gauche(l0, -6.2, 2.3)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.3)
        g = self.trois()
        noms = ["la longueur d'une valise", "le trajet entre deux villes", "l'épaisseur d'un billet"]
        lab = ["la valise", "le trajet", "le billet"]
        for k, ex in enumerate(noms):
            e = self.t(lab[k], 28, GRAY_B).next_to(g[k], DOWN, buff=0.25)
            self.au_mot(ex)
            self.play(FadeIn(g[k], shift=UP * 0.2), FadeIn(e), run_time=0.3)
        self.play(Wiggle(g), run_time=0.5)
        self.pause_defi(y=-2.5)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        g = self.trois().shift(UP * 0.8)
        self.add(g)
        rep = [("La valise", "des centimètres", "cm", "environ 60", "≈ 60 cm", 0),
               ("Le trajet entre deux villes", "des kilomètres", "km", None, None, 1),
               ("L'épaisseur d'un billet", "des millimètres", "mm", "à peine 1", "≈ 1 mm", 2)]
        for ex, mot, u, ex2, val, i in rep:
            self.au_mot(ex)
            self.play(Indicate(g[i], scale_factor=1.06), run_time=0.3)
            self.au_mot(mot)
            e = self.t(u, 54, VERT_OK).next_to(g[i], DOWN, buff=0.35)
            self.play(FadeIn(e, scale=1.3), run_time=0.3)
            if ex2:
                v = self.t(val, 32, JAUNE_TITRE).next_to(e, DOWN, buff=0.2)
                self.au_mot(ex2)
                self.play(FadeIn(v, shift=UP * 0.1), run_time=0.3)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        fig = VGroup(avion(2.4), stylo(1.2), billet(0.7)).arrange(DOWN, buff=0.35)
        lignes = self.finale_gauche(fig, textes=[
            ("On choisit l'unité", "qui donne un nombre simple."),
            ("km : les grandes distances ;", "m : une maison ;"),
            ("cm : un objet ;", "mm : une chose toute fine.")], fs=32)
        self.add(fig)
        self.au_mot("On choisit l'unité")
        self.montrer_ligne(lignes[0], Indicate(fig, scale_factor=1.05))
        self.au_mot("Le kilomètre pour les grandes distances")
        self.montrer_ligne(lignes[1])
        self.au_mot("le centimètre pour un objet")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_regle()
        self.ecran_grand()
        self.ecran_repere()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")


class LongueurChoisirUniteCE2(LongueurChoisirUniteBase):
    identite = "Maths CE2 — EleveAI"
    ceinture = "jaune"
