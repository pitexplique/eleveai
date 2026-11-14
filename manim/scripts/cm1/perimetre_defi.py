# perimetre_defi.py
# EleveAI — Maths CM1 — série « Périmètre », épisode 04 : RÉSOUDRE UN DÉFI DE PÉRIMÈTRE
# (micro perimetre_defi, notion perimetre), AVEC VOIX. Paysage 16:9, CEINTURE BLEUE.
# Short jumeau : film Ti Margo (les escargots, réponse A).
# Décor et métier : Karim, ÉLEVEUR DE CHEVAUX (clôture à 3 rangées de fil autour d'un pré ; centres : nature-ecologie, animaux).
# Mapping micro → écrans : 02 (un tour : la moitié × 2), 03 (plusieurs tours : un tour × le nombre de tours),
# 04 (un côté qui manque : le périmètre moins les côtés connus), 06 (piège : on enlève, on n'ajoute pas),
# questions 05 (carré de 36 cm, B) et 07 (4 tours de piste, C), défi 08 (le pré carré, 300 m de fil).
# Voix : manim/voix/cm1-perimetre-defi.json (validée le 13/11, Julie, débit −6) ;
# marques : perimetre_defi_marques.json (python manim/scripts/cm1/aire_marques.py perimetre:defi).
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/cm1/perimetre_defi.py PerimetreDefiCM1
# python -m manim render -qh --disable_caching manim/scripts/cm1/perimetre_defi.py PerimetreDefiCM1 -o eleveai-maths-cm1-perimetre-defi --media_dir manim/scripts/cm1/media-perimetre-04
# Sortie : manim/sorties/cm1/maths/perimetre/04-defi/eleveai-maths-cm1-perimetre-defi.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from perimetre_cm1_commun import *  # noqa: E402,F403

PRE, PRE_B = "#86efac", "#15803d"          # le pré de Karim (herbe)
PRE2, PRE2_B = "#bef264", "#4d7c0f"        # le pré en triangle
PIQUET = "#92400e"                          # les piquets de bois
FIL = "#e5e7eb"                             # le fil de la clôture (vue de côté)
CARRE_C, CARRE_B = "#a78bfa", "#4c1d95"     # le carré de la question 1
PISTE, PISTE_B = "#fca5a5", "#991b1b"       # la piste de vélo de la question 2


# ── outils de l'épisode (le commun appartient à la série : ne pas le modifier ici) ──
def pts_rect(L, l, u=0.1):
    """Un rectangle par sa longueur L et sa largeur l (en m, échelle u), centré.
    Côtés : 0 haut, 1 droite, 2 bas, 3 gauche."""
    a, b = L * u / 2, l * u / 2
    return [P(-a, b), P(a, b), P(a, -b), P(-a, -b)]


def etiquettes(p, textes, cotes=None, fs=26, ecart=0.32):
    cotes = range(len(textes)) if cotes is None else cotes
    return VGroup(*[etiquette(p, i, s, fs, ecart=ecart) for i, s in zip(cotes, textes)])


def piquets(p, r=0.07):
    """Un piquet de bois à chaque coin du pré."""
    return VGroup(*[Square(side_length=2 * r, fill_color=PIQUET, fill_opacity=1, stroke_color=WHITE,
                           stroke_width=1.5).move_to(v) for v in p.get_vertices()])


def cloture(n=3, larg=2.4, h=1.1, couleurs=None):
    """La clôture vue de côté : 3 piquets et n rangées de fil (de bas en haut).
    cloture[0] = les piquets, cloture[1] = les fils."""
    xs = [-larg / 2, 0, larg / 2]
    pq = VGroup(*[Rectangle(width=0.13, height=h, fill_color=PIQUET, fill_opacity=1, stroke_width=0)
                  .move_to(P(x, 0)) for x in xs])
    couleurs = couleurs or [FIL] * n
    fils = VGroup(*[Line(P(-larg / 2 - 0.15, -h / 2 + h * (k + 1) / (n + 1)),
                         P(larg / 2 + 0.15, -h / 2 + h * (k + 1) / (n + 1)), color=couleurs[k], stroke_width=4)
                    for k in range(n)])
    return VGroup(pq, fils)


def tours_decales(p, n=3, pas=0.09, couleur=TOUR, sw=6):
    """n tours orange, un peu décalés vers l'extérieur (les rangées de fil vues de haut)."""
    g = VGroup()
    for k in range(n):
        t = tour(p, couleur, sw)
        if k:
            t.scale((p.width + 2 * pas * k) / p.width, about_point=p.get_center())
        g.add(t)
    return g


class PerimetreDefiBase(PaysagePerimetreCM1):
    nom_voix = "cm1-perimetre-defi"
    fichier_marques = "perimetre_defi_marques.json"
    ceinture = "bleue"

    def pre(self, u=0.095, pos=P(-3.2, 0.3)):
        """Le pré de Karim : 40 m de long, 30 m de large."""
        return poly(pts_rect(40, 30, u), PRE, PRE_B).move_to(pos)

    def pre_triangle(self, u=0.1, pos=P(-3.4, 0.2)):
        """L'autre pré, en triangle : 45 m (en bas), 30 m (à gauche), 25 m (à droite), à l'échelle.
        Côtés : 0 = 45 (bas), 1 = 25 (droite), 2 = 30 (gauche)."""
        A, B = P(0, 0), P(45, 0)
        x = (45 * 45 + 30 * 30 - 25 * 25) / (2 * 45)
        C = P(x, np.sqrt(30 * 30 - x * x))
        return poly([A * u, B * u, C * u], PRE2, PRE2_B).move_to(pos)

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Résoudre un défi de périmètre", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Un défi de périmètre")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q = self.bloc(["Plusieurs tours ?", "Un côté qui manque ?"], 38)
        q.move_to(P(0, 0.3)).align_to(P(-6.2, 0), LEFT)
        f = self.pre(0.075, P(3.9, 0.4))
        self.play(FadeIn(f, scale=1.2), FadeIn(piquets(f)), run_time=0.4)
        self.au_mot("plusieurs tours")
        self.play(FadeIn(q[0], shift=UP * 0.2), Create(tours_decales(f)), run_time=0.9)
        self.au_mot("un côté qui manque")
        self.play(FadeIn(q[1], shift=UP * 0.2), run_time=0.4)
        self.attendre_voix(marge=0.6)

    # ── 01 : Karim, éleveur de chevaux ──────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        ka = karim(1.0).move_to(P(-5.3, 0.1))
        self.au_mot("Voici Karim")
        nom = self.t("Karim", 42, ROUGE_ERREUR).next_to(ka, UP, buff=0.2)
        self.play(FadeIn(ka, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("éleveur de chevaux")
        met = self.bloc(["éleveur", "de chevaux"], 26, ROUGE_ERREUR).next_to(ka, DOWN, buff=0.15)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.35)
        f = self.pre(0.075, P(-1.3, 1.05))
        self.au_mot("autour d'un pré")
        self.play(FadeIn(f, scale=1.2), FadeIn(piquets(f)), run_time=0.45)
        l1 = self.ligne([("Un pré de", WHITE), ("40 m", JAUNE_TITRE)], 34, buff=0.2)
        l1.move_to(P(3.9, 1.7)).align_to(P(1.4, 0), LEFT)
        self.au_mot("pré rectangulaire de 40")
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(etiquette(f, 0, "40 m", 24, ecart=0.25)), run_time=0.35)
        l2 = self.ligne([("sur", WHITE), ("30 m.", JAUNE_TITRE)], 34, buff=0.2)
        l2.next_to(l1, DOWN, buff=0.2).align_to(l1, LEFT)
        self.au_mot("sur 30")
        self.play(FadeIn(l2, shift=UP * 0.1), FadeIn(etiquette(f, 3, "30 m", 24, ecart=0.25)), run_time=0.35)
        cl = cloture().scale(0.8).move_to(P(3.0, -0.65))
        l3 = self.t("3 rangées de fil", 32, FIL).next_to(cl, DOWN, buff=0.2)
        self.au_mot("3 rangées de fil")
        self.play(FadeIn(cl[0]), LaggedStart(*[Create(x) for x in cl[1]], lag_ratio=0.3), FadeIn(l3), run_time=0.7)
        self.au_mot("Combien de mètres")
        q = self.t("Combien de mètres de fil ?", 36, JAUNE_TITRE).move_to(P(-0.2, -2.55))
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.4)
        self.attendre_voix()

    # ── 02 : un seul tour ───────────────────────────────────────────────────
    def ecran_un_tour(self):
        self.ecran("02-un-tour")
        f = self.pre()
        self.add(f, piquets(f), etiquettes(f, ["40 m", "30 m", "40 m", "30 m"]))
        self.au_mot("D'abord")
        l0 = self.t("D'abord, un seul tour.", 34, JAUNE_TITRE)
        self.col(l0, 2.4)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.35)
        l1 = self.ligne([("40 + 30", BLEU_D), ("= 70", VERT_OK)], 44, buff=0.3)
        self.col(l1, 1.45)
        self.au_mot("40 plus 30")
        self.play(FadeIn(l1[0], shift=UP * 0.1), Create(cote_tour(f, 0)), Create(cote_tour(f, 1)), run_time=0.4)
        self.au_mot("30, 70")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("la moitié du tour")
        l2 = self.t("la moitié du tour", 32, GRAY_B)
        self.col(l2, 0.75)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.3)
        l3 = self.ligne([("70 × 2", BLEU_D), ("= 140", VERT_OK)], 44, buff=0.3)
        self.col(l3, -0.2)
        self.au_mot("70 fois 2")
        self.play(FadeIn(l3[0], shift=UP * 0.1), Create(cote_tour(f, 2)), Create(cote_tour(f, 3)), run_time=0.45)
        self.au_mot("2, 140")
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.3)
        res = hors_audit(self.gros("140 m", fs=52))  # le 140 vient d'être dit
        self.col(res, -1.35)
        self.play(FadeIn(res, scale=1.2), run_time=0.45)
        self.attendre_voix()

    # ── 03 : 3 rangées = 3 tours ────────────────────────────────────────────
    def ecran_trois_tours(self):
        self.ecran("03-trois-tours")
        f = self.pre()
        self.add(f, piquets(f), etiquettes(f, ["40 m", "30 m", "40 m", "30 m"], ecart=0.5))
        cl = cloture(couleurs=[TOUR, TOUR, TOUR]).scale(0.55).move_to(P(-3.2, -2.75))
        self.au_mot("3 rangées de fil")
        l0 = self.t("3 rangées de fil :", 34, JAUNE_TITRE)
        self.col(l0, 2.4)
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(cl[0]), LaggedStart(*[Create(x) for x in cl[1]], lag_ratio=0.3),
                  run_time=0.6)
        self.au_mot("3 tours")
        l1 = self.t("3 tours.", 34, ORANGE_RETENUE)
        self.col(l1, 1.7)
        t3 = tours_decales(f, 3, 0.1)
        self.play(FadeIn(l1, shift=UP * 0.1), LaggedStart(*[Create(t) for t in t3], lag_ratio=0.4), run_time=1.2)
        l2 = self.ligne([("140 × 3", BLEU_D), ("= 420", VERT_OK)], 46, buff=0.3)
        self.col(l2, 0.7)
        self.au_mot("140 fois 3")
        self.play(FadeIn(l2[0], shift=UP * 0.1), Indicate(t3, color=JAUNE_TITRE, scale_factor=1.03), run_time=0.4)
        self.au_mot("3, 420")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("Karim doit")
        l3 = self.t("Karim doit acheter", 34)
        self.col(l3, -0.35)
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.3)
        self.au_mot("acheter 420")
        res = self.gros("420 m de fil", fs=52)
        self.col(res, -1.3)
        self.play(FadeIn(res, scale=1.2), run_time=0.45)
        self.attendre_voix()

    # ── 04 : un côté qui manque ─────────────────────────────────────────────
    def ecran_cote(self):
        self.ecran("04-cote")
        f = self.pre_triangle()
        self.au_mot("en triangle")
        l0 = self.t("Un pré en triangle,", 34, JAUNE_TITRE)
        self.col(l0, 2.55)
        self.play(FadeIn(f, scale=1.2), FadeIn(l0, shift=UP * 0.1), run_time=0.35)
        l1 = self.ligne([("périmètre :", WHITE), ("100 m", ORANGE_RETENUE)], 34, buff=0.2)
        self.col(l1, 1.9)
        self.au_mot("périmètre de 100")
        self.play(FadeIn(l1, shift=UP * 0.1), Create(tour(f, sw=7)), run_time=0.45)
        self.au_mot("30 mètres")
        e30 = etiquette(f, 2, "30 m", 26, ecart=0.3)
        self.play(FadeIn(e30, scale=1.3), Indicate(cote_tour(f, 2, JAUNE_TITRE, 9), color=JAUNE_TITRE), run_time=0.25)
        self.au_mot("et 45")
        e45 = etiquette(f, 0, "45 m", 26, ecart=0.3)
        self.play(FadeIn(e45, scale=1.3), Indicate(cote_tour(f, 0, JAUNE_TITRE, 9), color=JAUNE_TITRE), run_time=0.25)
        self.au_mot("le troisième")
        eq = Text("?", font_size=40, color=ROUGE_ERREUR, weight=BOLD)
        v = f.get_vertices()
        m = (v[1] + v[2]) / 2
        eq.move_to(m + normalize(m - sum(v) / 3) * 0.45)
        manque = DashedLine(v[1], v[2], color=ROUGE_ERREUR, stroke_width=8, dash_length=0.15)
        self.play(FadeIn(eq, scale=1.4), Create(manque), run_time=0.35)
        l2 = self.ligne([("30 + 45", BLEU_D), ("= 75", VERT_OK)], 42, buff=0.3)
        self.col(l2, 1.0)
        self.au_mot("30 plus 45")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.25)
        self.au_mot("45, 75")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.25)
        l3 = self.ligne([("100 − 75", BLEU_D), ("= 25", VERT_OK)], 42, buff=0.3)
        self.col(l3, 0.05)
        self.au_mot("100 moins 75")
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.25)
        self.au_mot("75, 25")
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.25)
        self.au_mot("troisième côté mesure")
        l4 = self.t("Le troisième côté mesure", 32)
        self.col(l4, -0.9)
        self.play(FadeIn(l4, shift=UP * 0.1), run_time=0.3)
        self.au_mot("mesure 25")
        res = self.gros("25 m", fs=56)
        self.col(res, -1.8)
        e25 = hors_audit(etiquette(f, 1, "25 m", 26, ecart=0.3))
        self.play(FadeIn(res, scale=1.2), FadeOut(eq), FadeIn(e25, scale=1.3), FadeOut(manque),
                  Create(cote_tour(f, 1, VERT_OK, 9)), run_time=0.5)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (réponse B) ─────────────────────────────────────────
    def figure_q1(self):
        p = poly(pts_rect(9, 9, 0.27), CARRE_C, CARRE_B).move_to(P(-3.8, 1.5))
        return VGroup(p, Text("?", font_size=36, color=JAUNE_TITRE, weight=BOLD).next_to(p, UP, buff=0.12))

    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        g = self.figure_q1()

        def autres_q(sc):
            sc.play(FadeIn(g), run_time=0.35)

        def apres(sc):
            sc.play(Create(tour(g[0])), run_time=0.2)

        self.question_gauche("05-question", "05b-reponse",
                             ["Un carré a un périmètre", "de 36 cm.", "Combien mesure un côté ?"],
                             [self.choix("18 cm"), self.choix("9 cm"), self.choix("6 cm")], 1,
                             ["Un carré : 4 côtés égaux.", "36 ÷ 4 = 9,", "car 9 × 4 = 36.", "Un côté : 9 cm."],
                             -0.75, sans_audit=(2, 3), mot_q="Un carré", autres_q=autres_q, autres_r=apres)

    # ── 06 : le piège (on enlève, on n'ajoute pas) ──────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        self.au_mot("Attention")
        XP = 0.35
        tit = self.t("Attention au piège !", 46, ROUGE_ERREUR)
        gauche(tit, -6.2, 3.05)
        self.play(Write(tit), run_time=0.35)
        f = self.pre_triangle(0.09, P(-3.6, -0.4))
        self.add(f, etiquettes(f, ["45 m", "?", "30 m"], [0, 1, 2]))
        self.au_mot("côté qui manque")
        l0 = self.t("Pour un côté qui manque,", 34)
        self.col(l0, 2.2, XP)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.3)
        self.au_mot("on enlève les côtés connus")
        l1 = self.t("on enlève les côtés connus", 34, VERT_OK)
        self.col(l1, 1.5, XP)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.3)
        self.au_mot("du périmètre")
        l2 = self.t("du périmètre :", 34, VERT_OK)
        self.col(l2, 0.85, XP)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.25)
        self.au_mot("on ne les ajoute pas")
        l3 = self.t("on ne les ajoute pas !", 36, ROUGE_ERREUR)
        self.col(l3, 0.1, XP)
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.3)
        l4 = self.ligne([("30 + 45", ROUGE_ERREUR), ("+ 100", ROUGE_ERREUR), ("= 175 m", ROUGE_ERREUR)], 36, buff=0.18)
        self.col(l4, -0.8, XP)
        self.au_mot("30 plus 45")
        self.play(FadeIn(l4[0], shift=UP * 0.1), run_time=0.2)
        self.au_mot("plus 100")
        self.play(FadeIn(l4[1], shift=UP * 0.1), run_time=0.2)
        self.au_mot("175")
        self.play(FadeIn(l4[2], shift=UP * 0.1), run_time=0.25)
        barre = Line(l4.get_left() + LEFT * 0.1, l4.get_right() + RIGHT * 0.1, color=ROUGE_ERREUR, stroke_width=4)
        self.au_mot("bien trop long")
        l5 = self.bloc(["bien trop long", "pour un seul côté !"], 34, ROUGE_ERREUR)
        self.col(l5, -2.0, XP)
        self.play(Create(barre), FadeIn(l5, shift=UP * 0.1), run_time=0.45)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (réponse C) ─────────────────────────────────────────
    def figure_q2(self):
        piste = RoundedRectangle(corner_radius=0.75, width=3.6, height=1.5, fill_color=PISTE, fill_opacity=1,
                                 stroke_color=PISTE_B, stroke_width=4).move_to(P(-3.8, 1.55))
        herbe = RoundedRectangle(corner_radius=0.4, width=2.6, height=0.7, fill_color=PRE, fill_opacity=1,
                                 stroke_width=0).move_to(piste)
        et = hors_audit(Text("200 m", font_size=26, color=JAUNE_TITRE, weight=BOLD)
                        .next_to(piste, UP, buff=0.12))
        return VGroup(piste, herbe, et)

    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        g = self.figure_q2()

        def autres_q(sc):
            sc.play(FadeIn(g), run_time=0.35)

        self.question_gauche("07-question", "07b-reponse",
                             ["Une piste de vélo : 200 m", "de tour. Léa fait 4 tours.", "Combien de mètres ?"],
                             [self.choix("204 m"), self.choix("50 m"), self.choix("800 m")], 2,
                             ["4 tours de 200 m :", "200 × 4 = 800.", "Léa a roulé 800 m."],
                             -0.75, sans_audit=(2,), mot_q="Une piste", autres_q=autres_q)

    # ── 08 : le défi (le pré carré) ─────────────────────────────────────────
    def pre_carre(self):
        return poly(pts_rect(25, 25, 0.12), PRE, PRE_B).move_to(P(-3.4, -0.4))

    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        b = self.pre_carre()
        l0 = self.ligne([("Karim a", WHITE), ("300 m", ORANGE_RETENUE), ("de fil.", WHITE)], 32, buff=0.2)
        self.col(l0, 2.0, 0.35)
        self.au_mot("Karim a")
        self.play(FadeIn(l0[0], shift=UP * 0.1), run_time=0.2)
        self.au_mot("a 300")
        self.play(FadeIn(l0[1], shift=UP * 0.1), run_time=0.2)
        self.au_mot("mètres de fil")
        self.play(FadeIn(l0[2], shift=UP * 0.1), run_time=0.2)
        self.au_mot("pré carré de 25")
        l1 = self.ligne([("Un pré carré de", WHITE), ("25 m", JAUNE_TITRE)], 32, buff=0.2)
        self.col(l1, 1.25, 0.35)
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(b, scale=1.2), FadeIn(piquets(b)),
                  FadeIn(etiquettes(b, ["25 m"] * 4, fs=24)), run_time=0.45)
        self.au_mot("de côté")
        l2 = self.t("de côté,", 32)
        self.col(l2, 0.65, 0.35)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.2)
        self.au_mot("3 rangées de fil")
        l3 = self.t("avec 3 rangées de fil.", 32, ORANGE_RETENUE)
        self.col(l3, 0.05, 0.35)
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.3)
        self.au_mot("assez de fil")
        q = self.t("A-t-il assez de fil ?", 40, JAUNE_TITRE)
        self.col(q, -0.8, 0.35)
        self.play(FadeIn(q, shift=UP * 0.1), Wiggle(b), run_time=0.5)
        self.pause_defi(y=-1.85)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        b = self.pre_carre()
        self.add(b, piquets(b), etiquettes(b, ["25 m"] * 4, fs=24, ecart=0.5))
        self.au_mot("Un tour")
        l0 = self.t("Un tour :", 34, ORANGE_RETENUE)
        self.col(l0, 2.3, 0.35)
        self.play(FadeIn(l0, shift=UP * 0.1), Create(tour(b, sw=7)), run_time=0.45)
        l1 = self.ligne([("25 × 4", BLEU_D), ("= 100 m", VERT_OK)], 40, buff=0.3)
        self.col(l1, 1.55, 0.35)
        self.au_mot("25 fois 4")
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("4, 100")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("3 tours")
        l2 = self.t("3 tours :", 34, ORANGE_RETENUE)
        self.col(l2, 0.7, 0.35)
        t3 = tours_decales(b, 3, 0.1)
        self.play(FadeIn(l2, shift=UP * 0.1), LaggedStart(*[Create(t) for t in t3[1:]], lag_ratio=0.4), run_time=0.6)
        l3 = self.ligne([("100 × 3", BLEU_D), ("= 300 m", VERT_OK)], 40, buff=0.3)
        self.col(l3, -0.05, 0.35)
        self.au_mot("100 fois 3")
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("3, 300")
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("Karim a 300")
        l4 = hors_audit(self.ligne([("Karim a", WHITE), ("300 m :", ORANGE_RETENUE)], 34, buff=0.2))
        self.col(l4, -0.85, 0.35)
        self.play(FadeIn(l4, shift=UP * 0.1), run_time=0.3)
        self.au_mot("juste assez")
        res = self.gros("juste assez !", fs=46)
        self.col(res, -1.7, 0.35)
        self.play(FadeIn(res, scale=1.2), run_time=0.45)
        self.au_mot("il ne reste rien")
        l5 = self.t("Il ne reste rien.", 32, GRAY_B)
        self.col(l5, -2.5, 0.35)
        self.play(FadeIn(l5, shift=UP * 0.1), run_time=0.3)
        self.insister(res, 1.1, 0.25)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        f = self.pre(0.06)
        fig = VGroup(f, piquets(f), tours_decales(f, 3, 0.08))
        lignes = self.finale_gauche(fig, textes=[
            ("Plusieurs tours : on calcule", "un tour, puis on multiplie."),
            ("Un côté qui manque :", "le périmètre − les côtés connus.")], fs=32)
        self.add(fig)
        self.au_mot("Plusieurs tours")
        self.montrer_ligne(lignes[0], Indicate(fig, scale_factor=1.05))
        self.au_mot("Un côté qui manque")
        self.montrer_ligne(lignes[1])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_un_tour()
        self.ecran_trois_tours()
        self.ecran_cote()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")


class PerimetreDefiCM1(PerimetreDefiBase):
    identite = "Maths CM1 — EleveAI"
    ceinture = "bleue"
