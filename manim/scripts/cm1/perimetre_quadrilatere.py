# perimetre_quadrilatere.py
# EleveAI — Maths CM1 — série « Périmètre », épisode 02 : CALCULER LE PÉRIMÈTRE D'UN RECTANGLE OU D'UN CARRÉ
# (micro perimetre_quadrilatere, notion perimetre), AVEC VOIX. Paysage 16:9, CEINTURE JAUNE.
# Short jumeau : film Ti Margo (la moitié du tour du terrain).
# Décor et métier : Lucas, ENCADREUR (baguette de bois autour des tableaux ; centres : art-design, construction).
# Mapping micro → écrans : 02 (rectangle : côtés d'en face égaux), 03 (on fait le tour, puis (L + l) × 2),
# 04 (carré : côté × 4), 06 (piège : aire ≠ périmètre), questions 05 et 07, défi 08 (la baguette qui reste).
# Voix : manim/voix/cm1-perimetre-quadrilatere.json (validée le 13/11, Julie, débit −6) ;
# marques : perimetre_quadrilatere_marques.json (python manim/scripts/cm1/aire_marques.py perimetre:quadrilatere).
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/cm1/perimetre_quadrilatere.py PerimetreQuadrilatereCM1
# python -m manim render -qh --disable_caching manim/scripts/cm1/perimetre_quadrilatere.py PerimetreQuadrilatereCM1 -o eleveai-maths-cm1-perimetre-quadrilatere --media_dir manim/scripts/cm1/media-perimetre-02
# Sortie : manim/sorties/cm1/maths/perimetre/02-quadrilatere/eleveai-maths-cm1-perimetre-quadrilatere.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from perimetre_cm1_commun import *  # noqa: E402,F403

BOIS, BOIS_C = "#92400e", "#d97706"       # la baguette de bois (le cadre)
CIEL = "#bae6fd"                          # la toile du tableau
CARRE_C, CARRE_B = "#a78bfa", "#4c1d95"   # le tableau carré (violet)


def pts_rect(L, l, u=0.06):
    """Un rectangle par sa longueur L et sa largeur l (en cm, échelle u), centré.
    Sommets : 0 en haut à gauche, 1 en haut à droite, 2 en bas à droite, 3 en bas à gauche.
    Côtés : 0 haut, 1 droite, 2 bas, 3 gauche."""
    a, b = L * u / 2, l * u / 2
    return [P(-a, b), P(a, b), P(a, -b), P(-a, -b)]


def tableau(L=60, l=40, u=0.06, fond=CIEL, bord=BOIS, sw=9):
    """Un tableau : la toile (ciel, colline verte, soleil) dans son cadre de bois.
    tableau[0] = le rectangle (pour les étiquettes et le tour), tableau[1] = le dessin."""
    p = poly(pts_rect(L, l, u), fond, bord, sw=sw)
    w, h = p.width, p.height
    c = p.get_center()
    colline = Ellipse(width=w * 0.8, height=h * 0.55, fill_color=VERT_F, fill_opacity=1, stroke_width=0)
    colline.move_to(c + P(-w * 0.12, -h * 0.36))
    soleil = Circle(radius=min(w, h) * 0.12, fill_color="#facc15", fill_opacity=1, stroke_width=0)
    soleil.move_to(c + P(w * 0.26, h * 0.2))
    # la colline reste dans la toile
    dessin = Intersection(colline, p.copy(), fill_color=VERT_F, fill_opacity=1, stroke_width=0)
    return VGroup(p, VGroup(dessin, soleil))


def baguette(longueur=300, u=0.016, ep=0.16):
    """Une baguette de bois, vue de face (longueur en cm)."""
    return Rectangle(width=longueur * u, height=ep, fill_color=BOIS_C, fill_opacity=1, stroke_color=BOIS,
                     stroke_width=3)


def etiquettes(p, textes, cotes=None, fs=28):
    cotes = range(len(textes)) if cotes is None else cotes
    return VGroup(*[etiquette(p, i, s, fs) for i, s in zip(cotes, textes)])


class PerimetreQuadrilatereBase(PaysagePerimetreCM1):
    nom_voix = "cm1-perimetre-quadrilatere"
    fichier_marques = "perimetre_quadrilatere_marques.json"
    ceinture = "jaune"

    def tableau_lucas(self, u=0.055, pos=P(-3.3, 0.3)):
        """Le tableau de Lucas : 60 cm de long, 40 cm de large."""
        return tableau(60, 40, u).move_to(pos)

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Calculer le périmètre d'un rectangle ou d'un carré", self.identite,
                                       self.ceinture, y_ech=-2.45)
        self.au_mot("Calculer le périmètre")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q = self.bloc(["Faut-il mesurer", "les 4 côtés ?"], 40)
        q.move_to(P(0, 0.3)).align_to(P(-6.2, 0), LEFT)
        t = self.tableau_lucas(0.05, P(3.6, 0.35))
        self.play(FadeIn(t, scale=1.2), run_time=0.6)
        self.au_mot("Faut-il")
        self.play(FadeIn(q[0], shift=UP * 0.2), run_time=0.4)
        self.au_mot("les 4 côtés")
        self.play(FadeIn(q[1], shift=UP * 0.2), run_time=0.4)
        self.play(Create(tour(t[0])), run_time=0.9)
        self.attendre_voix(marge=0.6)

    # ── 01 : Lucas, encadreur ───────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        lu = lucas(1.0).move_to(P(-5.3, 0.1))
        self.au_mot("Voici Lucas")
        nom = self.t("Lucas", 42, BOIS_C).next_to(lu, UP, buff=0.2)
        self.play(FadeIn(lu, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("encadreur")
        met = self.t("encadreur", 28, BOIS_C).next_to(lu, DOWN, buff=0.15)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.35)
        # l'atelier : des cadres accrochés au mur
        cadres = VGroup(tableau(30, 40, 0.035), tableau(40, 40, 0.035, "#fde68a"), tableau(50, 30, 0.035, "#fbcfe8"))
        cadres.arrange(RIGHT, buff=0.35, aligned_edge=UP).move_to(P(-0.6, 1.9))
        self.au_mot("Il fabrique")
        self.play(LaggedStart(*[FadeIn(x, shift=DOWN * 0.2) for x in cadres], lag_ratio=0.2), run_time=0.8)
        lg = self.t("des cadres en bois", 28, GRAY_B).next_to(cadres, DOWN, buff=0.25)
        self.au_mot("en bois")
        self.play(FadeIn(lg), run_time=0.35)
        gros_t = self.tableau_lucas(0.045, P(3.8, -0.45))
        self.au_mot("rectangulaire")
        self.play(FadeIn(gros_t, scale=1.2), run_time=0.5)
        q = self.bloc(["Combien de centimètres", "de baguette ?"], 36, JAUNE_TITRE)
        q.move_to(P(-0.4, -1.75))
        self.au_mot("combien")
        self.play(FadeIn(q[0], shift=UP * 0.15), run_time=0.4)
        self.au_mot("de baguette")
        self.play(FadeIn(q[1], shift=UP * 0.15), Create(tour(gros_t[0])), run_time=0.9)
        self.attendre_voix()

    # ── 02 : un rectangle, les côtés d'en face égaux ────────────────────────
    def ecran_rectangle(self):
        self.ecran("02-rectangle")
        t = self.tableau_lucas()
        p = t[0]
        self.add(t)
        self.au_mot("Un rectangle a 4 côtés")
        l0 = self.t("Un rectangle a 4 côtés.", 34, JAUNE_TITRE)
        self.col(l0, 2.4)
        self.play(FadeIn(l0, shift=UP * 0.1), Create(tour(p, sw=7)), run_time=0.6)
        l1 = self.pile([("Les côtés d'en face", WHITE), ("sont égaux.", WHITE)], 34)
        self.col(l1, 1.45)
        self.au_mot("Les côtés d'en face")
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("sont égaux")
        self.play(FadeIn(l1[1], shift=UP * 0.1), Indicate(cote_tour(p, 0, JAUNE_TITRE, 9), color=JAUNE_TITRE),
                  Indicate(cote_tour(p, 2, JAUNE_TITRE, 9), color=JAUNE_TITRE), run_time=0.4)
        l2 = self.ligne([("60 cm", JAUNE_TITRE), ("de long,", WHITE)], 34, buff=0.2)
        self.col(l2, 0.35)
        self.au_mot("mesure 60")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("de long")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.25)
        l3 = self.ligne([("40 cm", JAUNE_TITRE), ("de large.", WHITE)], 34, buff=0.2)
        self.col(l3, -0.35)
        self.au_mot("long et 40")
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("de large")
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.25)
        # les 4 côtés, nommés un à un (60 en haut, 60 en bas, 40 à gauche, 40 à droite)
        cotes = [("Donc 60", 0, "60 cm"), ("haut, 60", 2, "60 cm"), ("bas, 40", 3, "40 cm"), ("gauche, 40", 1, "40 cm")]
        for mot, i, s in cotes:
            self.au_mot(mot)
            self.play(FadeIn(etiquette(p, i, s), scale=1.3),
                      Indicate(cote_tour(p, i, JAUNE_TITRE, 9), color=JAUNE_TITRE), run_time=0.35)
        self.attendre_voix()

    # ── 03 : on fait le tour, puis plus vite ────────────────────────────────
    def ecran_additionner(self):
        self.ecran("03-additionner")
        t = self.tableau_lucas()
        p = t[0]
        et = etiquettes(p, ["60 cm", "40 cm", "60 cm", "40 cm"])
        self.add(t, et)
        self.au_mot("On fait le tour")
        l0 = self.t("On fait le tour :", 34, JAUNE_TITRE)
        self.col(l0, 2.4)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.35)
        l1 = self.ligne([("60 + 40", BLEU_D), ("= 100", VERT_OK)], 42, buff=0.3)
        self.col(l1, 1.6)
        self.au_mot("60 plus 40")
        orange = [cote_tour(p, 0), cote_tour(p, 1)]
        self.play(FadeIn(l1[0], shift=UP * 0.1), Create(orange[0]), Create(orange[1]), run_time=0.45)
        self.au_mot("40, 100")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.3)
        prec = l1
        calc = [l0, l1]
        for mot_a, mot_b, a, b, i in [("Plus 60", "160", "+ 60", "= 160", 2), ("Plus 40", "40, 200", "+ 40", "= 200", 3)]:
            lg = self.ligne([(a, BLEU_D), (b, VERT_OK)], 42, buff=0.3)
            lg.next_to(prec, DOWN, buff=0.3)
            lg.shift(RIGHT * (l1[1].get_left()[0] - lg[1].get_left()[0]))
            self.au_mot(mot_a)
            c = cote_tour(p, i)
            orange.append(c)
            self.play(FadeIn(lg[0], shift=UP * 0.1), Create(c), run_time=0.25)
            self.au_mot(mot_b)
            self.play(FadeIn(lg[1], shift=UP * 0.1), run_time=0.2)
            prec = lg
            calc.append(lg)
        self.au_mot("faut 200")
        res = self.gros("200 cm", fs=52)
        self.col(res, -1.0)
        self.play(FadeIn(res, scale=1.2), run_time=0.5)
        # plus vite : la moitié du tour, puis × 2
        self.au_mot("Plus vite")
        self.play(*[FadeOut(m) for m in calc + [res] + orange], run_time=0.4)
        v0 = self.t("Plus vite :", 34, ORANGE_RETENUE)
        self.col(v0, 2.4)
        self.play(FadeIn(v0, shift=UP * 0.1), run_time=0.3)
        v1 = self.ligne([("longueur", WHITE), ("+ largeur", WHITE)], 34, buff=0.18)
        self.col(v1, 1.65)
        self.au_mot("une longueur")
        self.play(FadeIn(v1[0], shift=UP * 0.1), Create(cote_tour(p, 0)), run_time=0.35)
        self.au_mot("plus une largeur")
        self.play(FadeIn(v1[1], shift=UP * 0.1), Create(cote_tour(p, 1)), run_time=0.2)
        v2 = self.ligne([("= 100 :", VERT_OK), ("la moitié du tour", WHITE)], 34, buff=0.2)
        self.col(v2, 0.95)
        self.au_mot("largeur, 100")
        self.play(FadeIn(v2[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("la moitié du tour")
        self.play(FadeIn(v2[1], shift=UP * 0.1), run_time=0.3)
        v3 = self.ligne([("100 × 2", BLEU_D), ("= 200", VERT_OK)], 44, buff=0.3)
        self.col(v3, 0.05)
        self.au_mot("100 fois 2")
        self.play(FadeIn(v3[0], shift=UP * 0.1), Create(cote_tour(p, 2)), Create(cote_tour(p, 3)), run_time=0.5)
        self.au_mot("2, 200")
        self.play(FadeIn(v3[1], shift=UP * 0.1), run_time=0.3)
        res2 = hors_audit(self.gros("200 cm", fs=52))  # le 200 vient d'être dit
        self.col(res2, -1.05)
        self.play(FadeIn(res2, scale=1.2), run_time=0.45)
        self.attendre_voix()

    # ── 04 : le carré, côté × 4 ─────────────────────────────────────────────
    def ecran_carre(self):
        self.ecran("04-carre")
        t = tableau(35, 35, 0.085, CARRE_C, BOIS).move_to(P(-3.6, 0.3))
        p = t[0]
        r0 = self.ligne([("Un carré de", WHITE), ("35 cm", JAUNE_TITRE)], 34, buff=0.18)
        l0 = VGroup(r0[0], r0[1], self.t("de côté.", 34))
        l0[2].next_to(r0, DOWN, buff=0.14).align_to(r0, LEFT)
        self.col(l0, 2.25)
        self.au_mot("carré")
        self.play(FadeIn(t, scale=1.2), FadeIn(l0[0], shift=UP * 0.1), run_time=0.25)
        self.au_mot("carré de 35")
        self.play(FadeIn(l0[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("de côté")
        self.play(FadeIn(l0[2], shift=UP * 0.1), run_time=0.25)
        l1 = self.ligne([("Les 4 côtés", WHITE), ("sont égaux.", WHITE)], 34, buff=0.18)
        self.col(l1, 1.2)
        self.au_mot("les 4 côtés")
        self.play(FadeIn(l1[0], shift=UP * 0.1), FadeIn(etiquettes(p, ["35 cm"] * 4)), run_time=0.4)
        self.au_mot("sont égaux")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.3)
        l2 = self.ligne([("35 ×", BLEU_D), ("4", BLEU_D), ("= 140", VERT_OK)], 48, buff=0.22)
        self.col(l2, 0.25)
        self.au_mot("35", 2)
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.2)
        self.au_mot("fois 4")
        self.play(FadeIn(l2[1], shift=UP * 0.1), Create(tour(p)), run_time=0.4)
        self.au_mot("140")
        self.play(FadeIn(l2[2], shift=UP * 0.1), run_time=0.3)
        self.au_mot("faut 140")
        res = self.gros("140 cm", fs=52)
        self.col(res, -0.95)
        self.play(FadeIn(res, scale=1.2), run_time=0.5)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (réponse B) ─────────────────────────────────────────
    def figure_q1(self):
        p = poly(pts_rect(9, 5, 0.36), CARREAU, CARREAU_B).move_to(P(-3.7, 1.45))
        return VGroup(p, etiquettes(p, ["9 cm", "5 cm"], [0, 3], 26))

    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        g = self.figure_q1()

        def autres_q(sc):
            sc.play(FadeIn(g), run_time=0.35)

        # (pas de tour animé avant la phrase : « 9 plus 5 » suit aussitôt « Réponse B »)
        self.question_gauche("05-question", "05b-reponse",
                             ["Un rectangle : 9 cm de long", "et 5 cm de large.", "Quel est son périmètre ?"],
                             [self.choix("14 cm"), self.choix("28 cm"), self.choix("45 cm")], 1,
                             ["9 + 5 = 14 :", "la moitié du tour.", "14 × 2 = 28.", "Le périmètre : 28 cm."],
                             -0.75, sans_audit=(3,), couper={0: ("9 +", "5", "= 14 :")}, q_sans_audit=(1,),
                             mot_q="Un rectangle", autres_q=autres_q)

    # ── 06 : le piège (aire ≠ périmètre) ────────────────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        self.au_mot("Attention")
        XP = 0.4  # la colonne du piège, plus large
        tit = self.t("Attention au piège !", 46, ROUGE_ERREUR)
        gauche(tit, -6.2, 3.05)
        self.play(Write(tit), run_time=0.35)
        g = rect_cases(6, 4, 0.55).move_to(P(-3.6, -0.3))
        cadre = poly([g.get_corner(UL), g.get_corner(UR), g.get_corner(DR), g.get_corner(DL)], op=0, sw=0)
        l0 = self.ligne([("Un rectangle de", WHITE), ("6", JAUNE_TITRE), ("sur 4", JAUNE_TITRE)], 34, buff=0.18)
        self.col(l0, 2.1, XP)
        self.au_mot("Pour un rectangle")
        self.play(FadeIn(g), FadeIn(l0[0], shift=UP * 0.1), run_time=0.2)
        self.au_mot("rectangle de 6")
        self.play(FadeIn(l0[1], shift=UP * 0.1), FadeIn(etiquettes(cadre, ["6 cm"], [0])), run_time=0.25)
        self.au_mot("sur 4")
        self.play(FadeIn(l0[2], shift=UP * 0.1), FadeIn(etiquettes(cadre, ["4 cm"], [3])), run_time=0.25)
        l1 = self.pile([("6 × 4 = 24 :", ROUGE_ERREUR), ("c'est son aire,", WHITE)], 34)
        self.col(l1, 1.05, XP)
        self.au_mot("fois 4, 24")
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("son aire")
        self.play(FadeIn(l1[1], shift=UP * 0.1), FadeIn(numeros(g)), run_time=0.5)
        self.au_mot("les carreaux du dedans")
        l2 = self.t("les carreaux du dedans.", 34, GRAY_B)
        self.col(l2, 0.2, XP)
        self.play(FadeIn(l2, shift=UP * 0.1), Indicate(g, color=CARREAU, scale_factor=1.04), run_time=0.5)
        self.au_mot("Le périmètre, c'est le tour")
        l3 = self.t("Le périmètre, c'est le tour :", 34, VERT_OK)
        self.col(l3, -0.6, XP)
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.35)
        l4 = self.ligne([("6 + 4", BLEU_D), ("+ 6", BLEU_D), ("+ 4", BLEU_D), ("= 20 cm", VERT_OK)], 36, buff=0.18)
        self.col(l4, -1.4, XP)
        for k, mot in enumerate(["6 plus 4", "plus 6", None, "20 centimètres"]):
            if mot is None:
                self.au_mot("plus 4", 2)
            else:
                self.au_mot(mot)
            anims = [FadeIn(l4[k], shift=UP * 0.1)]
            if k == 0:
                anims += [Create(cote_tour(cadre, 0)), Create(cote_tour(cadre, 1))]
            elif k in (1, 2):
                anims.append(Create(cote_tour(cadre, k + 1)))
            self.play(*anims, run_time=0.35)
        self.insister(l4[3], 1.12, 0.25, about=l4[3].get_left())
        self.attendre_voix()

    # ── 07 : QUESTION 2 (réponse A) ─────────────────────────────────────────
    def figure_q2(self):
        p = poly(pts_rect(12, 12, 0.18), "#fde68a", "#a16207").move_to(P(-3.7, 1.45))
        return VGroup(p, etiquettes(p, ["12 cm"], [0], 26))

    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        g = self.figure_q2()

        def autres_q(sc):
            sc.play(FadeIn(g), run_time=0.35)

        def apres(sc):
            sc.play(Create(tour(g[0])), run_time=0.6)

        self.question_gauche("07-question", "07b-reponse",
                             ["Un carré a des côtés", "de 12 cm.", "Quel est son périmètre ?"],
                             [self.choix("48 cm"), self.choix("24 cm"), self.choix("144 cm")], 0,
                             ["Un carré a 4 côtés égaux :", "12 × 4 = 48.", "Le périmètre : 48 cm."],
                             -0.75, sans_audit=(2,), mot_q="Un carré", autres_q=autres_q, autres_r=apres)

    # ── 08 : le défi (la baguette qui reste) ────────────────────────────────
    def atelier_defi(self):
        """La baguette de 300 cm (en haut) et le tableau de 80 cm sur 50 cm (en bas)."""
        b = baguette(300, 0.016).move_to(P(-3.3, 2.15))
        eb = hors_audit(self.t("300 cm", 26, JAUNE_TITRE).next_to(b, DOWN, buff=0.15))
        t = tableau(80, 50, 0.042).move_to(P(-3.3, -1.0))
        et = etiquettes(t[0], ["80 cm", "50 cm"], [0, 3], 26)
        return b, eb, t, et

    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        b, eb, t, et = self.atelier_defi()
        l0 = self.ligne([("Une baguette de", WHITE), ("300 cm", JAUNE_TITRE)], 34, buff=0.18)
        self.col(l0, 2.2, 0.35)
        self.au_mot("Lucas a une baguette")
        self.play(FadeIn(l0[0], shift=UP * 0.1), FadeIn(b, shift=RIGHT * 0.3), run_time=0.45)
        self.au_mot("de 300")
        self.play(FadeIn(l0[1], shift=UP * 0.1), FadeIn(eb), run_time=0.3)
        l1 = self.pile([("Un tableau de 80 cm", WHITE), ("sur 50 cm", WHITE)], 34)
        self.col(l1, 1.15, 0.35)
        self.au_mot("tableau de 80")
        self.play(FadeIn(l1[0], shift=UP * 0.1), FadeIn(t, scale=1.15), FadeIn(et[0]), run_time=0.45)
        self.au_mot("sur 50")
        self.play(FadeIn(l1[1], shift=UP * 0.1), FadeIn(et[1]), run_time=0.3)
        self.au_mot("Combien de centimètres")
        q = self.bloc(["Combien de baguette", "lui restera-t-il ?"], 38, JAUNE_TITRE)
        self.col(q, -0.2, 0.35)
        self.play(FadeIn(q, shift=UP * 0.1), Wiggle(b), run_time=0.5)
        self.pause_defi(y=-1.9)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        b, eb, t, et = self.atelier_defi()
        p = t[0]
        self.add(b, eb, t, et)
        r1 = self.ligne([("80 + 50", BLEU_D), ("= 130 :", VERT_OK)], 40, buff=0.3)
        l1 = VGroup(r1[0], r1[1], self.t("la moitié du tour", 34))
        l1[2].next_to(r1, DOWN, buff=0.14).align_to(r1, LEFT)
        self.col(l1, 2.2, 0.35)
        self.au_mot("80 plus 50")
        self.play(FadeIn(l1[0], shift=UP * 0.1), Create(cote_tour(p, 0)), Create(cote_tour(p, 3)), run_time=0.45)
        self.au_mot("130")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("la moitié du tour")
        self.play(FadeIn(l1[2], shift=UP * 0.1), run_time=0.3)
        l2 = self.ligne([("130 × 2", BLEU_D), ("= 260 cm", VERT_OK)], 40, buff=0.3)
        self.col(l2, 1.0, 0.35)
        self.au_mot("130 fois 2")
        self.play(FadeIn(l2[0], shift=UP * 0.1), Create(cote_tour(p, 1)), Create(cote_tour(p, 2)), run_time=0.45)
        self.au_mot("260 centimètres")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.3)
        # la baguette : 260 cm pour le cadre, le reste
        u = 0.016
        x0 = b.get_left()[0]
        pris = Rectangle(width=260 * u, height=b.height, fill_color=TOUR, fill_opacity=1, stroke_width=0)
        pris.move_to(b).align_to(b, LEFT)
        reste = b.copy().stretch_to_fit_width(40 * u).align_to(b, RIGHT)
        l3 = self.ligne([("300 − 260", BLEU_D), ("= 40", VERT_OK)], 40, buff=0.3)
        self.col(l3, 0.1, 0.35)
        self.au_mot("300 moins 260")
        self.play(FadeIn(l3[0], shift=UP * 0.1), GrowFromEdge(pris, LEFT), run_time=0.5)
        self.au_mot("260, 40")
        self.play(FadeIn(l3[1], shift=UP * 0.1), Indicate(reste, color=JAUNE_TITRE, scale_factor=1.4), run_time=0.45)
        self.add(reste)
        res = self.gros("Il reste 40 cm", fs=44)
        hors_audit(res)  # le 40 vient d'être dit (« 260, 40 centimètres »)
        self.col(res, -1.05, 0.35)
        self.play(FadeIn(res, scale=1.2), run_time=0.5)
        self.insister(res, 1.1, 0.25)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        t = self.tableau_lucas(0.05)
        fig = VGroup(t, tour(t[0]))
        lignes = self.finale_gauche(fig, textes=[
            ("Un rectangle :", "longueur + largeur,", "puis × 2."),
            ("Un carré :", "le côté × 4."),
            ("Le périmètre n'est pas l'aire :", "on fait le tour.")], fs=32)
        self.add(fig)
        self.au_mot("Un rectangle")
        b0 = lignes[0][1]
        vieux = b0[1]  # « longueur + largeur, » en deux morceaux, chacun à son mot
        morceaux = VGroup(*[Text(m, font_size=vieux.font_size, color=WHITE, font=vieux.font)
                            for m in ("longueur", "+ largeur,")]).arrange(RIGHT, buff=0.15)
        morceaux.align_to(vieux, LEFT).align_to(vieux, DOWN)
        b0.submobjects[1] = morceaux
        self.play(FadeIn(b0[0], shift=RIGHT * 0.2), Create(lignes[0][0]), Indicate(fig, scale_factor=1.05),
                  run_time=0.5)
        self.au_mot("la longueur")
        self.play(FadeIn(b0[1][0], shift=RIGHT * 0.2), run_time=0.3)
        self.au_mot("plus la largeur")
        self.play(FadeIn(b0[1][1], shift=RIGHT * 0.2), run_time=0.3)
        self.au_mot("puis fois 2")
        self.play(FadeIn(b0[2], shift=RIGHT * 0.2), run_time=0.35)
        self.au_mot("Un carré")
        b1 = lignes[1][1]
        self.play(FadeIn(b1[0], shift=RIGHT * 0.2), Create(lignes[1][0]), run_time=0.45)
        self.au_mot("côté fois 4")
        self.play(FadeIn(b1[1], shift=RIGHT * 0.2), run_time=0.35)
        self.au_mot("Le périmètre n'est")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_rectangle()
        self.ecran_additionner()
        self.ecran_carre()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")


class PerimetreQuadrilatereCM1(PerimetreQuadrilatereBase):
    identite = "Maths CM1 — EleveAI"
    ceinture = "jaune"
