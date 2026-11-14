# longueur_mesurer.py
# EleveAI — Maths CE2 — série « Longueurs », épisode 03 : MESURER ET TRACER UN SEGMENT
# (micro ce2_longueur_mesurer, notion longueur), AVEC VOIX. Paysage 16:9, CEINTURE JAUNE.
# Short jumeau : film Ti Margo (la banane mal posée, réponse B).
# Décor et métier : Clara, ASTRONOME (centre : espace) : sa carte du ciel relie les étoiles par des segments.
# Mapping micro → écrans : 02 (le 0 n'est pas au bord, on pose le 0 sur le début), 03 (on lit sous l'autre
# bout : 6 cm), 04 (les millimètres : 5 cm et 4 mm, zoom), 06 (piège : début sur le 2, fin sur le 9 →
# 9 − 2 = 7 cm), 07 (tracer un segment de 8 cm : deux points, on relie),
# questions 05 (où poser le début, A) et 08 (règle décalée de 3 à 8, C : 5 cm),
# défi 09 (de 0 à 3 petits traits après le 4 : 4 cm et 3 mm).
# Voix : manim/voix/ce2-longueur-mesurer.json (validée le 14/11, Julie, débit −6) ;
# marques : longueur_mesurer_marques.json (python manim/scripts/ce2/perimetre_marques.py longueur:mesurer).
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/ce2/longueur_mesurer.py LongueurMesurerCE2
# python -m manim render -qh --disable_caching manim/scripts/ce2/longueur_mesurer.py LongueurMesurerCE2 -o eleveai-maths-ce2-longueur-mesurer --media_dir manim/scripts/ce2/media-lg-03
# Sortie : manim/sorties/ce2/maths/longueur/03-mesurer/eleveai-maths-ce2-longueur-mesurer.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from longueur_ce2_commun import *  # noqa: E402,F403

CIEL = "#0b1e4d"
ETOILE = "#fde047"
SEG = "#38bdf8"


def etoile(r=0.13, couleur=ETOILE):
    return Star(5, outer_radius=r, inner_radius=r * 0.45, fill_color=couleur, fill_opacity=1, stroke_width=0)


def segment_sur_regle(r, debut, fin, couleur=SEG, ep=0.1, ecart=0.12):
    """Le segment (un trait épais) posé juste au-dessus de la règle, de `debut` à `fin`, avec une étoile
    à chaque bout (la carte du ciel de Clara)."""
    xa, xb = r.x(debut), r.x(fin)
    y = r.haut() + ecart
    tr = Line(P(xa, y), P(xb, y), color=couleur, stroke_width=7)
    return VGroup(tr, etoile().move_to(P(xa, y)), etoile().move_to(P(xb, y)))


def carte_ciel(larg=5.0, haut=3.0):
    """La carte du ciel : un fond bleu nuit, des étoiles reliées par des segments."""
    fond = RoundedRectangle(width=larg, height=haut, corner_radius=0.15, fill_color=CIEL, fill_opacity=1,
                            stroke_color="#93c5fd", stroke_width=3)
    pts = [P(-1.8, -0.8), P(-0.9, 0.2), P(0.2, 0.6), P(1.2, -0.3), P(1.9, 0.9)]
    pts = [p * (larg / 5.0) for p in pts]
    segs = VGroup(*[Line(pts[k], pts[k + 1], color=SEG, stroke_width=4) for k in range(len(pts) - 1)])
    ets = VGroup(*[etoile(0.14).move_to(p) for p in pts])
    petites = VGroup(*[Dot(P(x, y) * (larg / 5.0), radius=0.03, color=WHITE)
                       for x, y in ((-2.1, 1.1), (-0.3, -1.1), (0.9, 1.2), (2.1, -1.0), (-1.4, 0.9))])
    return VGroup(fond, petites, segs, ets)


def lunette(s=1.0):
    """Une lunette astronomique sur son trépied."""
    tube = RoundedRectangle(width=1.4 * s, height=0.28 * s, corner_radius=0.1 * s, fill_color="#e2e8f0",
                            fill_opacity=1, stroke_width=0).rotate(0.5)
    pieds = VGroup(*[Line(P(0, -0.1 * s), P(dx * s, -1.0 * s), color="#94a3b8", stroke_width=5) for dx in (-0.4, 0, 0.4)])
    return VGroup(pieds, tube.move_to(P(0.1 * s, 0.1 * s)))


def cadre_zone(r, debut, fin, couleur=ORANGE_RETENUE, dessus=0.3):
    xa, xb = r.x(debut), r.x(fin)
    bas, haut = r.corps.get_bottom()[1] - 0.06, r.haut() + dessus
    c = DashedVMobject(Rectangle(width=xb - xa + 0.16, height=haut - bas, stroke_color=couleur, stroke_width=4),
                       num_dashes=24)
    c.move_to(P((xa + xb) / 2, (bas + haut) / 2))
    return c


def liens(a, b, couleur=ORANGE_RETENUE):
    if b.get_center()[1] < a.get_bottom()[1]:
        paires = [(a.get_corner(DL), b.get_corner(UL)), (a.get_corner(DR), b.get_corner(UR))]
    else:
        paires = [(a.get_corner(UR), b.get_corner(UL)), (a.get_corner(DR), b.get_corner(DL))]
    return VGroup(*[DashedLine(p, q, color=couleur, stroke_width=3, dash_length=0.12) for p, q in paires])


class LongueurMesurerBase(PaysageLongueurCE2):
    nom_voix = "ce2-longueur-mesurer"
    fichier_marques = "longueur_mesurer_marques.json"
    ceinture = "jaune"

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Mesurer et tracer un segment", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Mesurer et tracer un segment")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q = self.t("Où poser sa règle ?", 42, JAUNE_TITRE)
        q.move_to(P(0, 0.4)).align_to(P(-6.2, 0), LEFT)
        r = regle(6, 0.7, h=0.65, fs=18).move_to(P(3.3, 0.0))
        s = segment_sur_regle(r, 0, 5)
        self.au_mot("Où poser sa règle")
        self.play(FadeIn(q, shift=UP * 0.2), FadeIn(r, shift=UP * 0.2), Create(s), run_time=0.5)
        self.attendre_voix(marge=0.6)

    # ── 01 : Clara, astronome ───────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pe = clara(0.95).move_to(P(-5.0, 0.2))
        self.au_mot("Voici Clara")
        nom = self.t("Clara", 42, JAUNE_TITRE).next_to(pe, UP, buff=0.55)
        self.play(FadeIn(pe, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("Elle est astronome")
        met = self.t("astronome", 26, "#93c5fd").next_to(pe, DOWN, buff=0.12)
        lu = lunette(0.9).next_to(pe, RIGHT, buff=0.3).shift(DOWN * 0.3)
        self.play(FadeIn(met, shift=DOWN * 0.1), FadeIn(lu, shift=LEFT * 0.2), run_time=0.35)
        self.au_mot("elle observe les étoiles")
        l0 = self.t("Elle observe les étoiles.", 32)
        gauche(l0, -2.4, 3.0)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.35)
        ca = carte_ciel(5.0, 3.0).move_to(P(2.6, 0.6))
        self.au_mot("Sur sa carte du ciel")
        self.play(FadeIn(ca[0]), FadeIn(ca[1]), FadeIn(ca[3], scale=1.3), run_time=0.45)
        self.au_mot("elle relie les étoiles")
        self.play(LaggedStart(*[Create(s) for s in ca[2]], lag_ratio=0.3), run_time=0.9)
        self.au_mot("elle mesure chaque segment")
        l1 = self.t("Elle mesure chaque segment avec sa règle.", 32, JAUNE_TITRE)
        gauche(l1, -6.0, -2.4)
        r = regle(5, 0.7, h=0.55, fs=16).next_to(ca, DOWN, buff=0.25).shift(RIGHT * 0.5)
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(r, shift=UP * 0.2), run_time=0.4)
        self.play(Indicate(ca[2][1], color=ORANGE_RETENUE, scale_factor=1.3), run_time=0.4)
        self.attendre_voix()

    # ── 02 : le 0 n'est pas au bord ─────────────────────────────────────────
    def ecran_zero(self):
        self.ecran("02-zero")
        r = regle(9, 1.0, h=0.9, fs=24).move_to(P(-0.6, 0.4))
        self.au_mot("Sur une règle")
        self.play(FadeIn(r, shift=UP * 0.2), run_time=0.35)
        l0 = self.ligne([("Le 0", VERT_OK), ("n'est pas toujours au bord.", WHITE)], 36, buff=0.2)
        gauche(l0, -6.2, 3.0)
        bout = Rectangle(width=r.x(0) - r.corps.get_left()[0], height=r.corps.height, fill_color=ROUGE_ERREUR,
                         fill_opacity=0.75, stroke_width=0).align_to(r.corps, LEFT).set_y(r.corps.get_y())
        self.au_mot("le 0 n'est pas toujours au bord")
        self.play(FadeIn(l0, shift=UP * 0.1), Indicate(r.nums[0], color=VERT_OK, scale_factor=1.8),
                  FadeIn(bout), run_time=0.45)
        self.play(Flash(bout, color=ROUGE_ERREUR, line_length=0.2), run_time=0.4)
        s = segment_sur_regle(r, 0, 6).shift(UP * 1.2)
        self.au_mot("On pose le 0")
        l1 = self.ligne([("On pose le 0", VERT_OK), ("sur le début du segment,", WHITE)], 34, buff=0.2)
        gauche(l1, -6.2, -1.3)
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(s, shift=DOWN * 0.2), run_time=0.4)
        z0 = repere(r, 0, VERT_OK, h=1.6)
        self.play(s.animate.shift(DOWN * 1.2), Create(z0), FadeOut(bout), run_time=0.6)
        self.au_mot("et la règle bien le long du segment")
        l2 = self.t("et la règle bien le long du segment.", 34, JAUNE_TITRE)
        gauche(l2, -6.2, -2.1)
        self.play(FadeIn(l2, shift=UP * 0.1), Indicate(s[0], color=JAUNE_TITRE, scale_factor=1.05), run_time=0.45)
        self.attendre_voix()

    # ── 03 : on lit sous l'autre bout ───────────────────────────────────────
    def ecran_lire(self):
        self.ecran("03-lire")
        r = regle(9, 1.0, h=0.9, fs=24).move_to(P(-0.6, 0.6))
        s = segment_sur_regle(r, 0, 6)
        z0 = repere(r, 0, VERT_OK, h=0.6)
        self.add(r, s, z0)
        self.au_mot("Puis on lit le nombre")
        l0 = self.t("Puis on lit le nombre sous l'autre bout.", 34, JAUNE_TITRE)
        gauche(l0, -6.2, 3.0)
        f6 = repere(r, 6, ORANGE_RETENUE, h=0.6)
        self.play(FadeIn(l0, shift=UP * 0.1), Create(f6), run_time=0.4)
        self.au_mot("Ici, 6")
        ici = self.t("Ici : 6", 40, ORANGE_RETENUE)
        gauche(ici, -6.0, -1.0)
        self.play(FadeIn(ici, scale=1.2), Indicate(r.nums[6], color=ORANGE_RETENUE, scale_factor=2.0), run_time=0.5)
        res = self.ligne([("Le segment mesure", WHITE), ("6 cm.", VERT_OK)], 46, buff=0.25)
        gauche(res, -6.0, -2.1)
        hors_audit(res[1])  # « 6 » déjà dit (« Ici, 6 ») : posé à son extrait
        self.au_mot("Le segment mesure")
        self.play(FadeIn(res, scale=1.1), run_time=0.4)
        acc = accolade(s, "6 cm", 34, VERT_OK)
        self.play(FadeIn(acc), run_time=0.3)
        self.insister(res[1], 1.2, 0.25)
        self.attendre_voix()

    # ── 04 : les millimètres ────────────────────────────────────────────────
    def ecran_mm(self):
        self.ecran("04-mm")
        r = regle(7, 1.0, h=0.85, fs=22).move_to(P(-2.6, 1.3))
        self.add(r)
        self.au_mot("Entre deux grands traits")
        l0 = self.ligne([("Entre deux grands traits :", WHITE), ("10 petits traits,", ORANGE_RETENUE)], 34,
                        buff=0.2)
        gauche(l0, -6.2, 3.0)
        self.play(FadeIn(l0[0], shift=UP * 0.1), run_time=0.3)
        cz = cadre_zone(r, 5, 6)
        Z = 4.2
        zoom = regle(1, Z, depuis=5, h=1.4, fs=30).move_to(P(3.9, -0.9))
        lz = liens(cz, zoom)
        self.au_mot("10 petits traits")
        self.play(FadeIn(l0[1], shift=UP * 0.1), Create(cz), Create(lz), FadeIn(zoom, scale=0.6), run_time=0.5)
        self.au_mot("les millimètres")
        mm = self.t("les millimètres", 34, ORANGE_RETENUE)
        gauche(mm, -6.0, 2.35)
        self.play(FadeIn(mm, shift=UP * 0.1), Indicate(zoom.traits, color=ORANGE_RETENUE, scale_factor=1.0),
                  run_time=0.4)
        s = segment_sur_regle(r, 0, 5.4)
        self.au_mot("Ce segment s'arrête")
        l1 = self.t("Ce segment s'arrête", 34)
        gauche(l1, -6.2, -0.4)
        self.play(FadeIn(l1, shift=UP * 0.1), Create(s), run_time=0.5)
        ez = segment_sur_regle(zoom, 5, 5.4)
        sauts = VGroup(*[ArcBetweenPoints(P(zoom.x(5 + k / 10), zoom.haut() + 0.35),
                                          P(zoom.x(5 + (k + 1) / 10), zoom.haut() + 0.35), angle=-TAU / 4,
                                          color=JAUNE_TITRE, stroke_width=4) for k in range(4)])
        l2 = self.ligne([("4 petits traits", ORANGE_RETENUE), ("après le 5.", ORANGE_RETENUE)], 34, buff=0.2)
        gauche(l2, -6.2, -1.1)
        self.au_mot("4 petits traits")
        self.play(FadeIn(l2[0], shift=UP * 0.1), Create(ez),
                  LaggedStart(*[Create(a) for a in sauts], lag_ratio=0.3), run_time=0.7)
        self.au_mot("après le 5")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.3)
        res = self.ligne([("Il mesure", WHITE), ("5 cm", VERT_OK), ("et", WHITE), ("4 mm.", ORANGE_RETENUE)], 44,
                         buff=0.3)
        gauche(res, -6.2, -2.3)
        hors_audit(res[1])  # 5 et 4 déjà dits : posés à leur extrait
        hors_audit(res[3])
        self.aux_extraits([res[0], res[1], VGroup(res[2], res[3])],
                          ["Il mesure", ("5 centimètres", 1), ("4 millimètres", 1)])
        self.insister(res, 1.08, 0.25)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (réponse A) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        r = regle(6, 0.6, h=0.6, fs=16).move_to(P(-3.8, 1.3))
        s = segment_sur_regle(r, 0, 4)

        def autres_q(sc):
            sc.play(FadeIn(r), Create(s), run_time=0.4)

        def apres(sc):
            sc.play(Indicate(r.nums[0], color=VERT_OK, scale_factor=2.0), run_time=0.3)

        self.question_gauche("05-question", "05b-reponse",
                             ["Pour mesurer un segment,", "où pose-t-on son début ?"],
                             [self.choix("sur le 0"), self.choix("sur le bord"), self.choix("sur le 1")], 0,
                             ["On pose le début sur le 0.", "Le bord ne compte pas :",
                              "il y a souvent", "un petit morceau avant le 0."],
                             -0.75, mot_q="Pour mesurer un segment", autres_q=autres_q, autres_r=apres)

    # ── 06 : le piège : début sur le 2 ──────────────────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        self.au_mot("Attention")
        tit = self.t("Attention au piège !", 46, ROUGE_ERREUR)
        gauche(tit, -6.2, 3.0)
        self.play(Write(tit), run_time=0.35)
        r = regle(10, 0.9, h=0.85, fs=22).move_to(P(-1.2, 1.0))
        self.add(r)
        s = segment_sur_regle(r, 2, 9)
        d2 = repere(r, 2, ORANGE_RETENUE)
        self.au_mot("Léo pose le début du segment sur le 2")
        l0 = self.ligne([("Léo pose le début", WHITE), ("sur le 2,", ORANGE_RETENUE)], 34, buff=0.2)
        gauche(l0, -6.2, -0.35)
        self.play(FadeIn(l0, shift=UP * 0.1), Create(s), Create(d2), run_time=0.45)
        f9 = repere(r, 9, ROUGE_ERREUR)
        self.au_mot("La fin tombe sur le 9")
        l1 = self.ligne([("la fin sur le 9.", WHITE), ("Il lit 9 : faux !", ROUGE_ERREUR)], 34, buff=0.3)
        gauche(l1, -6.2, -1.05)
        hors_audit(l1[1])
        self.play(FadeIn(l1[0], shift=UP * 0.1), Create(f9), run_time=0.35)
        self.au_mot("Il lit 9")
        self.play(FadeIn(l1[1], scale=1.15), Indicate(r.nums[9], color=ROUGE_ERREUR, scale_factor=2.0),
                  run_time=0.4)
        arcs = VGroup(*[ArcBetweenPoints(P(r.x(2 + k), s.get_top()[1] + 0.08), P(r.x(3 + k), s.get_top()[1] + 0.08),
                                         angle=-TAU / 4, color=JAUNE_TITRE, stroke_width=4) for k in range(7)])
        self.au_mot("Il faut compter de 2 à 9")
        l2 = self.t("Il faut compter de 2 à 9 :", 34, JAUNE_TITRE)
        gauche(l2, -6.2, -1.85)
        hors_audit(l2)
        self.play(FadeIn(l2, shift=UP * 0.1), LaggedStart(*[Create(a) for a in arcs], lag_ratio=0.2), run_time=0.8)
        c = self.ligne([("9 − 2", BLEU_D), ("= 7", VERT_OK)], 46, buff=0.25)
        gauche(c, -6.0, -2.7)
        hors_audit(c[0])
        self.aux_extraits([c[0], c[1]], [("9 moins 2", 1, 0.3), "7"])
        res = self.t("7 cm", 46, VERT_OK).next_to(c, RIGHT, buff=0.8)
        hors_audit(res)
        self.au_mot("Le segment mesure 7")
        self.play(FadeIn(res, scale=1.2), run_time=0.3)
        self.insister(res, 1.2, 0.25)
        self.attendre_voix()

    # ── 07 : tracer un segment de 8 cm ──────────────────────────────────────
    def ecran_tracer(self):
        self.ecran("07-tracer")
        self.au_mot("Pour tracer un segment de 8 centimètres")
        l0 = self.ligne([("Tracer un segment de", WHITE), ("8 cm :", JAUNE_TITRE)], 38, buff=0.2)
        gauche(l0, -6.2, 3.0)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.35)
        r = regle(10, 0.95, h=0.85, fs=22).move_to(P(-0.8, 0.2))
        self.play(FadeIn(r, shift=UP * 0.2), run_time=0.3)
        y = r.haut() + 0.15
        pa = Dot(P(r.x(0), y), radius=0.09, color=SEG)
        pb = Dot(P(r.x(8), y), radius=0.09, color=SEG)
        self.au_mot("on marque un point en face du 0")
        e1 = hors_audit(self.t("1. un point en face du 0", 32, WHITE))
        gauche(e1, -6.0, -1.0)
        self.play(FadeIn(e1, shift=UP * 0.1), GrowFromCenter(pa), Indicate(r.nums[0], scale_factor=1.8),
                  run_time=0.4)
        self.au_mot("un point en face du 8")
        e2 = hors_audit(self.t("2. un point en face du 8", 32, WHITE))
        gauche(e2, -6.0, -1.7)
        self.play(FadeIn(e2, shift=UP * 0.1), GrowFromCenter(pb), Indicate(r.nums[8], scale_factor=1.8),
                  run_time=0.4)
        self.au_mot("puis on relie les deux points")
        e3 = hors_audit(self.t("3. on relie, en suivant la règle", 32, JAUNE_TITRE))
        gauche(e3, -6.0, -2.4)
        cr = crayon(1.6, 0.22).rotate(-0.6).move_to(pa.get_center() + P(0.55, 0.45))
        trait = Line(pa.get_center(), pb.get_center(), color=SEG, stroke_width=7)
        self.play(FadeIn(e3, shift=UP * 0.1), FadeIn(cr), run_time=0.3)
        self.play(Create(trait), cr.animate.shift(pb.get_center() - pa.get_center()), run_time=1.2)
        self.play(FadeOut(cr), run_time=0.2)
        acc = accolade(trait, "8 cm", 32, VERT_OK)
        self.play(FadeIn(acc), run_time=0.3)
        self.attendre_voix()

    # ── 08 : QUESTION 2 (réponse C) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        r = regle(9, 0.55, h=0.55, fs=15).move_to(P(-3.6, 1.3))
        s = segment_sur_regle(r, 3, 8)

        def autres_q(sc):
            sc.play(FadeIn(r), Create(s), run_time=0.4)

        def apres(sc):
            sc.play(Indicate(s, color=VERT_OK, scale_factor=1.06), run_time=0.2)

        self.question_gauche("08-question", "08b-reponse",
                             ["La règle de Clara est décalée :", "le début est sur le 3,", "la fin sur le 8.",
                              "Combien mesure le segment ?"],
                             [self.choix("8 cm"), self.choix("11 cm"), self.choix("5 cm")], 2,
                             ["De 3 à 8 :", "8 − 3 = 5.", "Le segment mesure 5 cm."],
                             -0.75, sans_audit=(2,), mot_q="La règle de Clara", autres_q=autres_q, autres_r=apres)

    # ── 09 : le défi ────────────────────────────────────────────────────────
    def figure_defi(self, y=0.6):
        r = regle(7, 1.0, h=0.85, fs=22).move_to(P(-2.4, y))
        s = segment_sur_regle(r, 0, 4.3)
        cz = cadre_zone(r, 4, 5)
        zoom = regle(1, 4.0, depuis=4, h=1.3, fs=28).move_to(P(3.3, y - 1.9))
        ez = segment_sur_regle(zoom, 4, 4.3)
        return r, s, cz, zoom, ez

    def ecran_defi(self):
        self.ecran("09-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        r, s, cz, zoom, ez = self.figure_defi()
        self.au_mot("Clara mesure un dernier segment")
        self.play(FadeIn(r, shift=UP * 0.2), run_time=0.3)
        self.au_mot("Il commence sur le 0")
        l0 = self.t("Il commence sur le 0,", 34)
        gauche(l0, -6.2, 2.3)
        self.play(FadeIn(l0, shift=UP * 0.1), Create(s), run_time=0.5)
        l1 = self.ligne([("et s'arrête 3 petits traits", ORANGE_RETENUE), ("après le 4.", ORANGE_RETENUE)], 34,
                        buff=0.2)
        gauche(l1, -6.2, 1.65)
        self.au_mot("s'arrête 3")
        self.play(FadeIn(l1[0], shift=UP * 0.1), Create(cz), Create(liens(cz, zoom)), FadeIn(zoom, scale=0.6),
                  run_time=0.6)
        self.au_mot("après le 4")
        self.play(FadeIn(l1[1], shift=UP * 0.1), Create(ez), run_time=0.4)
        self.au_mot("Combien mesure-t-il")
        q = self.t("Combien mesure-t-il ?", 40, JAUNE_TITRE)
        gauche(q, -6.2, -1.6)
        self.play(FadeIn(q, scale=1.1), run_time=0.4)
        self.pause_defi(y=-2.5)

    def ecran_correction(self):
        self.ecran("09b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        r, s, cz, zoom, ez = self.figure_defi(1.2)
        lz = liens(cz, zoom)
        self.add(r, s, cz, zoom, ez, lz)
        s4 = segment_sur_regle(r, 0, 4, couleur=VERT_OK)
        l0 = self.ligne([("Jusqu'au 4 :", WHITE), ("4 cm", VERT_OK)], 40, buff=0.25)
        gauche(l0, -6.2, -0.9)
        hors_audit(l0[1])
        self.au_mot("Jusqu'au 4")
        self.play(FadeIn(l0[0], shift=UP * 0.1), Create(s4), run_time=0.4)
        self.aux_extraits([l0[1]], [("4 centimètres", 1)])
        sauts = VGroup(*[ArcBetweenPoints(P(zoom.x(4 + k / 10), zoom.haut() + 0.35),
                                          P(zoom.x(4 + (k + 1) / 10), zoom.haut() + 0.35), angle=-TAU / 4,
                                          color=ORANGE_RETENUE, stroke_width=4) for k in range(3)])
        l1 = self.ligne([("Puis 3 petits traits :", WHITE), ("3 mm", ORANGE_RETENUE)], 40, buff=0.25)
        gauche(l1, -6.2, -1.7)
        hors_audit(l1[1])
        self.au_mot("Puis 3 petits traits")
        self.play(FadeIn(l1[0], shift=UP * 0.1), LaggedStart(*[Create(a) for a in sauts], lag_ratio=0.3),
                  run_time=0.6)
        self.aux_extraits([l1[1]], [("3 millimètres", 1)])
        res = self.ligne([("Il mesure", WHITE), ("4 cm et 3 mm.", VERT_OK)], 46, buff=0.38)
        gauche(res, -6.2, -2.65)
        hors_audit(res[1])
        self.au_mot("Le segment mesure")
        self.play(FadeIn(res, scale=1.1), run_time=0.4)
        self.insister(res[1], 1.15, 0.25)
        self.attendre_voix()

    # ── 10 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("10-finale", 0.65)
        r = regle(5, 0.65, h=0.55, fs=15)
        fig = VGroup(r, segment_sur_regle(r, 0, 4))
        lignes = self.finale_gauche(fig, textes=[
            ("On pose le 0 de la règle", "sur le début du segment,", "puis on lit sous l'autre bout."),
            ("Règle décalée :", "on soustrait."),
            ("Pour tracer : deux points,", "puis on les relie.")], fs=30)
        self.add(fig)
        self.au_mot("On pose le 0 de la règle")
        self.montrer_ligne(lignes[0], Indicate(fig, scale_factor=1.05))
        self.au_mot("Si la règle est décalée")
        self.montrer_ligne(lignes[1])
        self.au_mot("Pour tracer")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_zero()
        self.ecran_lire()
        self.ecran_mm()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_tracer()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("11-abonne")


class LongueurMesurerCE2(LongueurMesurerBase):
    identite = "Maths CE2 — EleveAI"
    ceinture = "jaune"
