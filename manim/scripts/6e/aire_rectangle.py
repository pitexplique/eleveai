# aire_rectangle.py
# EleveAI — Maths 6e — série « Aire » (lot A1-A4), épisode 01 : LES FORMULES DE L'AIRE (rectangle et carré)
# (micro aire_rectangle, + aire_carre en `aussi`), AVEC VOIX. Paysage 16:9, CEINTURE VERTE.
# Short jumeau : 6e-aire-rectangle-short (tapis carré de 3 m : 9 m², pas 12).
# Décor et métier : Amina, JARDINIÈRE (centres : nature-ecologie, sciences).
# La 6e, un cran au-dessus du CM2 : la formule écrite avec des lettres (A = L × l, A = c × c),
# les deux longueurs converties dans la même unité AVANT la formule, un problème à étapes (arrondir au-dessus).
# Mapping micro → écrans : aire_rectangle = 02 (pelouse 12 × 8 = 96 m², 8 rangées de 12, A = L × l),
# 04 (bordure 3 m × 50 cm : 0,5 m, 3 × 0,5 = 1,5 m²), question 05 (A : 9 × 4 = 36 cm², 26 = le périmètre),
# défi 08 (pelouse 9 × 6 = 54 m², sacs de 25 m² : 2 sacs = 50, il manque 4 → 3 sacs) ;
# aire_carre = 03 (A = c × c, côté 7 m : 49 m²), 06 (piège : 7 × 4 = 28 m, le périmètre ; aire 7 × 7 = 49 m²),
# question 07 (C : 6 × 6 = 36 cm²).
# Voix : manim/voix/6e-aire-rectangle.json (validée le 15/11, Julie, débit −6) ;
# marques : aire_rectangle_marques.json (python manim/scripts/6e/aire_surface_marques.py rectangle).
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/6e/aire_rectangle.py AireRectangle6e
# python -m manim render -qh --disable_caching manim/scripts/6e/aire_rectangle.py AireRectangle6e -o eleveai-maths-6e-aire-rectangle --media_dir manim/scripts/6e/media-aire6-01
# Sortie : manim/sorties/6e/maths/aire/01-rectangle/eleveai-maths-6e-aire-rectangle.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from aire_6e_commun import *  # noqa: E402,F403

GAZON_C, GAZON_B = "#22c55e", "#14532d"   # la pelouse (gazon)
GAZON2_C = "#86efac"                       # le gazon clair (2e sac)
TERRE_C, TERRE_B = "#a16207", "#422006"   # la terre de la bordure
SAC_C, SAC_B = "#e7c58b", "#78350f"       # le sac de graines (papier kraft)


def cote(mob, s, sens=LEFT, fs=30, couleur=JAUNE_TITRE, buff=0.18):
    """La mesure d'un côté, posée contre la figure (hors audit : le nombre est écrit dans la ligne de droite)."""
    return hors_audit(Text(s, font_size=fs, color=couleur, weight=BOLD).next_to(mob, sens, buff=buff))


def plaque(n_col, n_rang, c, couleur=GAZON_C, bord=GAZON_B):
    """Une figure PLEINE (sans carreaux) de la taille de rect_cases(n_col, n_rang, c)."""
    return Rectangle(width=n_col * c, height=n_rang * c, fill_color=couleur, fill_opacity=1, stroke_color=bord,
                     stroke_width=3)


def brins(f, n=14, seed=3):
    """Quelques touffes d'herbe dessinées sur une plaque de gazon (le décor)."""
    rng = np.random.default_rng(seed)
    g = VGroup()
    for _ in range(n):
        x = f.get_left()[0] + f.width * rng.uniform(0.08, 0.92)
        y = f.get_bottom()[1] + f.height * rng.uniform(0.12, 0.85)
        h = 0.14
        g.add(VGroup(*[Line(P(x, y), P(x + dx, y + h), stroke_color=GAZON_B, stroke_width=3)
                       for dx in (-0.06, 0, 0.06)]))
    return g


def codage(carre, couleur=WHITE, n=1):
    """Les petits traits de codage au milieu des 4 côtés d'un carré (côtés égaux)."""
    g = VGroup()
    pts = [carre.get_top(), carre.get_bottom(), carre.get_left(), carre.get_right()]
    for k, p in enumerate(pts):
        vertical = k < 2
        d = UP * 0.15 if vertical else RIGHT * 0.15
        g.add(Line(p - d, p + d, stroke_color=couleur, stroke_width=5))
    return g


def sac(s=1.0):
    """Un sac de graines : le sac en papier kraft, le haut replié, une pousse dessinée sur l'étiquette."""
    corps = Polygon(P(-0.45 * s, -0.6 * s), P(0.45 * s, -0.6 * s), P(0.4 * s, 0.45 * s), P(-0.4 * s, 0.45 * s),
                    fill_color=SAC_C, fill_opacity=1, stroke_color=SAC_B, stroke_width=3)
    pli = Rectangle(width=0.84 * s, height=0.16 * s, fill_color="#d4a95f", fill_opacity=1, stroke_color=SAC_B,
                    stroke_width=3).move_to(P(0, 0.53 * s))
    eti = Circle(0.25 * s, fill_color=WHITE, fill_opacity=1, stroke_color=GAZON_B, stroke_width=2) \
        .move_to(P(0, -0.12 * s))
    tige = Line(P(0, -0.3 * s), P(0, 0.02 * s), stroke_color=GAZON_B, stroke_width=3)
    f1 = Ellipse(width=0.2 * s, height=0.1 * s, fill_color=GAZON_C, fill_opacity=1, stroke_width=0) \
        .move_to(P(-0.08 * s, -0.02 * s)).rotate(0.5)
    f2 = f1.copy().rotate(-1.0).move_to(P(0.08 * s, -0.02 * s))
    return VGroup(corps, pli, eti, tige, f1, f2)


def fleur(s=1.0, couleur="#f472b6"):
    """Une petite fleur vue de dessus (la bordure)."""
    pet = VGroup(*[Circle(0.07 * s, fill_color=couleur, fill_opacity=1, stroke_width=0)
                   .move_to(P(0.08 * s * np.cos(a), 0.08 * s * np.sin(a))) for a in np.linspace(0, 2 * PI, 6)[:-1]])
    coeur = Circle(0.05 * s, fill_color="#facc15", fill_opacity=1, stroke_width=0)
    return VGroup(pet, coeur)


class AireRectangle6e(PaysageAire6eG):
    nom_voix = "6e-aire-rectangle"
    fichier_marques = "aire_rectangle_marques.json"
    ceinture = "verte"

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Les formules de l'aire", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Les formules de l'aire")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q = self.bloc(["Le rectangle et le carré,", "sans compter", "les carreaux."], 38)
        q.move_to(P(0, 0.35)).align_to(P(-6.2, 0), LEFT)
        r = plaque(6, 4, 0.42).move_to(P(2.6, 0.45))
        k = plaque(3, 3, 0.42, GAZON2_C, GAZON_B).next_to(r, RIGHT, buff=0.35).align_to(r, DOWN)
        fo = VGroup(*[hors_audit(Text(s, font_size=30, color="#0f172a", weight=BOLD)).move_to(m)
                      for s, m in (("A = L × l", r), ("c × c", k))])
        self.au_mot("Le rectangle et le carré")
        self.play(FadeIn(q[0], shift=UP * 0.2), FadeIn(r, scale=0.9), FadeIn(k, scale=0.9), run_time=0.6)
        self.au_mot("sans compter")
        self.play(FadeIn(q[1], shift=UP * 0.2), run_time=0.35)
        self.au_mot("les carreaux")
        self.play(FadeIn(q[2], shift=UP * 0.2), FadeIn(fo, scale=1.2), run_time=0.45)
        self.attendre_voix(marge=0.6)

    # ── 01 : Amina, jardinière ──────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        am = amina(1.0).move_to(P(-5.2, 0.2))
        self.au_mot("Voici Amina")
        nom = self.t("Amina", 40, BLEU_CALCUL).next_to(am, UP, buff=0.25)
        self.play(FadeIn(am, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("Elle est jardinière")
        met = self.t("jardinière", 28, BLEU_CALCUL).next_to(am, DOWN, buff=0.18)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.35)
        f = plaque(12, 8, 0.36).move_to(P(0.2, 0.75))
        h = brins(f)
        self.au_mot("semer une pelouse")
        self.play(FadeIn(f, scale=0.9), FadeIn(h), run_time=0.5)
        self.au_mot("calcule sa surface")
        q1 = self.t("Sa surface ?", 34, JAUNE_TITRE).next_to(f, DOWN, buff=0.25)
        self.play(FadeIn(q1, shift=UP * 0.1), Indicate(f, color=JAUNE_TITRE, scale_factor=1.03), run_time=0.45)
        s1 = sac(1.2).move_to(P(4.6, 0.75))
        self.au_mot("le bon sac de graines")
        self.play(FadeIn(s1, shift=UP * 0.2), run_time=0.4)
        g = rect_cases(12, 8, 0.36).move_to(f)
        self.au_mot("un par un")
        self.play(LaggedStart(*[FadeIn(x, scale=1.3) for x in g[:14]], lag_ratio=0.15), run_time=1.2)
        self.au_mot("Trop long")
        tl = self.t("Trop long !", 40, ROUGE_ERREUR).move_to(P(0.2, -2.45))
        self.play(FadeIn(tl, scale=1.2), Wiggle(VGroup(*g[:14])), run_time=0.5)
        self.attendre_voix()

    # ── 02 : le rectangle, A = L × l ────────────────────────────────────────
    def ecran_rectangle(self):
        self.ecran("02-rectangle")
        c = 0.34
        f = plaque(12, 8, c).move_to(P(-3.3, 0.1))
        g = rect_cases(12, 8, c).move_to(f)
        self.add(f)
        xl = 0.35
        self.au_mot("mesure 12")
        l1 = self.ligne([("12 m", CARREAU), ("sur 8 m", ORANGE_RETENUE)], 40)
        self.col(l1, 2.6, xl)
        c12 = cote(f, "12 m", UP, couleur=CARREAU, buff=0.14)
        r8 = cote(f, "8 m", LEFT, couleur=ORANGE_RETENUE)
        self.play(FadeIn(l1[0], shift=UP * 0.1), FadeIn(c12), run_time=0.3)
        self.au_mot("sur 8")
        self.play(FadeIn(l1[1], shift=UP * 0.1), FadeIn(r8), run_time=0.3)
        self.au_mot("de carrés de")
        l2 = self.bloc(["Des carrés de 1 m", "de côté :"], 32, GRAY_B)
        self.col(l2, 1.6, xl)
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.2)
        self.au_mot("de côté")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.2)
        self.play(LaggedStart(*[FadeIn(x, scale=1.3) for x in g], lag_ratio=0.005), run_time=0.5)
        self.au_mot("8 rangées")
        l3 = self.ligne([("8 rangées", ORANGE_RETENUE), ("de 12", CARREAU)], 38)
        self.col(l3, 0.65, xl)
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.2)
        self.au_mot("rangées de 12")
        self.play(FadeIn(l3[1], shift=UP * 0.1), Indicate(rangee(g, 0, 12), color=CARREAU, scale_factor=1.05),
                  run_time=0.3)
        self.play(LaggedStart(*[Indicate(rangee(g, j, 12), color=ORANGE_RETENUE, scale_factor=1.04)
                                for j in range(8)], lag_ratio=0.2), run_time=0.8)
        self.au_mot("12 fois 8")
        l4 = self.ligne([("12 × 8", BLEU_D), ("= 96 m²", VERT_OK)], 46, buff=0.3)
        self.col(l4, -0.3, xl)
        self.play(FadeIn(l4[0], scale=1.2), run_time=0.3)
        self.au_mot("8, 96")
        self.play(FadeIn(l4[1], shift=UP * 0.1), Indicate(g, color=VERT_OK, scale_factor=1.03), run_time=0.4)
        self.au_mot("La formule")
        fo = self.gros("A = L × l", JAUNE_TITRE, 52)
        self.col(fo, -1.55, xl)
        eL = hors_audit(Text("(L)", font_size=30, color=CARREAU, weight=BOLD)).next_to(c12, RIGHT, buff=0.2)
        el = hors_audit(Text("(l)", font_size=30, color=ORANGE_RETENUE, weight=BOLD)).next_to(r8, DOWN, buff=0.15)
        self.play(FadeIn(fo, scale=1.2), run_time=0.4)
        self.play(FadeIn(eL, scale=1.4), FadeIn(el, scale=1.4), Indicate(c12, scale_factor=1.3),
                  Indicate(r8, scale_factor=1.3), run_time=0.5)
        self.attendre_voix()

    # ── 03 : le carré, A = c × c ────────────────────────────────────────────
    def ecran_carre(self):
        self.ecran("03-carre")
        c = 0.42
        f = plaque(7, 7, c, GAZON2_C, GAZON_B).move_to(P(-3.7, 0.0))
        g = rect_cases(7, 7, c).move_to(f)
        xl = 0.35
        self.au_mot("Un carré de gazon")
        self.play(FadeIn(f, scale=0.9), run_time=0.4)
        l1 = self.ligne([("Un carré :", JAUNE_TITRE), ("4 côtés égaux", JAUNE_TITRE)], 36)
        self.col(l1, 2.5, xl)
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.25)
        self.au_mot("4 côtés égaux")
        cod = codage(f)
        self.play(FadeIn(l1[1], shift=UP * 0.1), Create(cod), run_time=0.4)
        self.au_mot("mesure c")
        l2 = self.t("Son côté : c", 36)
        self.col(l2, 1.6, xl)
        cc1 = cote(f, "c", UP, 38, CARREAU, buff=0.3)
        cc2 = cote(f, "c", LEFT, 38, CARREAU, buff=0.3)
        self.play(FadeIn(l2, shift=UP * 0.1), FadeIn(cc1, scale=1.4), FadeIn(cc2, scale=1.4), run_time=0.4)
        self.au_mot("c fois c")
        fo = self.gros("A = c × c", JAUNE_TITRE, 52)
        self.col(fo, 0.55, xl)
        self.play(FadeIn(fo, scale=1.2), Indicate(VGroup(cc1, cc2), scale_factor=1.3), run_time=0.45)
        self.au_mot("Côté 7")
        l3 = self.t("Côté 7 m :", 36)
        self.col(l3, -0.6, xl)
        c7h, c7g = cote(f, "7 m", UP, couleur=CARREAU, buff=0.3), cote(f, "7 m", LEFT, couleur=CARREAU, buff=0.3)
        self.play(FadeIn(l3, shift=UP * 0.1), Transform(cc1, c7h), Transform(cc2, c7g), run_time=0.2)
        self.au_mot("7 fois 7")
        l4 = self.ligne([("7 × 7", BLEU_D), ("= 49 m²", VERT_OK)], 46, buff=0.3)
        self.col(l4, -1.5, xl)
        self.play(FadeIn(l4[0], scale=1.2), FadeIn(g), run_time=0.2)
        self.play(FadeIn(l4[1], shift=UP * 0.1), run_time=0.25)
        self.play(Indicate(g, color=VERT_OK, scale_factor=1.03), run_time=0.4)
        self.attendre_voix()

    # ── 04 : la même unité (3 m × 50 cm) ────────────────────────────────────
    def ecran_unites(self):
        self.ecran("04-unites")
        u = 1.25
        bo = Rectangle(width=3 * u, height=u / 2, fill_color=TERRE_C, fill_opacity=1, stroke_color=TERRE_B,
                       stroke_width=3).move_to(P(-3.3, -0.2))
        fl = VGroup(*[fleur(1.0, ("#f472b6", "#f97316", "#a78bfa")[k % 3]).move_to(
            bo.get_left() + RIGHT * u * (0.25 + 0.5 * k) + UP * 0.02 * ((-1) ** k)) for k in range(6)])
        cadres = VGroup(*[DashedVMobject(Square(u, stroke_color=GRAY_B, stroke_width=3), num_dashes=28)
                          for _ in range(3)]).arrange(RIGHT, buff=0)
        cadres.align_to(bo, DOWN).align_to(bo, LEFT)
        xl = 0.35
        self.au_mot("Les deux longueurs")
        l1 = self.bloc(["Les deux longueurs :", "dans la même unité !"], 34, JAUNE_TITRE)
        self.col(l1, 2.5, xl)
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("dans la même unité")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("bordure mesure 3")
        l2 = self.ligne([("3 m", BLEU_D), ("sur 50 cm", BLEU_D)], 38)
        self.col(l2, 1.45, xl)
        c3 = cote(bo, "3 m", DOWN, buff=0.18)
        r50 = cote(bo, "50 cm", LEFT, fs=26)
        self.play(FadeIn(bo, scale=0.9), FadeIn(fl), FadeIn(l2[0], shift=UP * 0.1), FadeIn(c3), run_time=0.4)
        self.au_mot("sur 50")
        self.play(FadeIn(l2[1], shift=UP * 0.1), FadeIn(r50), run_time=0.3)
        self.au_mot("50 centimètres, c'est")
        l3 = self.ligne([("50 cm", WHITE), ("= 0,5 m", VERT_OK)], 38, buff=0.3)
        self.col(l3, 0.55, xl)
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("c'est 0,5")
        r05 = cote(bo, "0,5 m", LEFT, fs=26, couleur=VERT_OK)
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.3)
        self.play(Transform(r50, r05), run_time=0.35)
        self.au_mot("3 fois 0,5")
        l4 = self.ligne([("3 × 0,5", BLEU_D), ("= 1,5 m²", VERT_OK)], 44, buff=0.3)
        self.col(l4, -0.5, xl)
        self.play(FadeIn(l4[0], scale=1.2), Create(cadres), run_time=0.45)
        self.au_mot("0,5 : 1,5")
        self.play(FadeIn(l4[1], shift=UP * 0.1), Indicate(bo, color=VERT_OK, scale_factor=1.04), run_time=0.4)
        self.insister(l4[1], 1.15, 0.25)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (réponse A) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        g = rect_cases(9, 4, 0.4).move_to(P(-3.6, 1.5))
        c9 = cote(g, "9 cm", UP, fs=28, buff=0.12)
        r4 = cote(g, "4 cm", LEFT, fs=28)

        def autres_q(sc):
            sc.play(FadeIn(g), FadeIn(c9), FadeIn(r4), run_time=0.35)

        def apres(sc):
            sc.play(g.animate.set_fill(VERT_F), run_time=0.25)

        self.question_gauche("05-question", "05b-reponse",
                             ["Quelle est l'aire", "d'un rectangle", "de 9 cm sur 4 cm ?"],
                             [self.choix("36 cm²"), self.choix("26 cm²"), self.choix("13 cm²")], 0,
                             ["A = L × l :", "9 × 4 = 36 cm².", "26, c'est le périmètre :",
                              "le tour, pas la surface."],
                             0.2, couper={1: ("9 × 4", "= 36 cm²."), 2: ("26,", "c'est le périmètre :")},
                             mot_q="Quelle est", autres_q=autres_q, autres_r=apres)

    # ── 06 : le piège (7 × 4, c'est le périmètre) ───────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        self.au_mot("Attention")
        tit = self.t("Attention au piège !", 46, ROUGE_ERREUR)
        gauche(tit, -6.2, 3.05)
        self.play(Write(tit), run_time=0.35)
        c = 0.4
        f = plaque(7, 7, c, GAZON2_C, GAZON_B).move_to(P(-4.0, -0.25))
        g = rect_cases(7, 7, c).move_to(f)
        tour = contour(f, PLINTHE, 9)
        xl = -1.0
        self.au_mot("L'aire d'un carré")
        l1 = self.ligne([("L'aire d'un carré", JAUNE_TITRE), ("de côté 7 m", JAUNE_TITRE)], 34)
        self.col(l1, 2.2, xl)
        c7 = cote(f, "7 m", UP, buff=0.14)
        self.play(FadeIn(l1[0], shift=UP * 0.1), FadeIn(f, scale=0.9), run_time=0.35)
        self.au_mot("côté 7")
        self.play(FadeIn(l1[1], shift=UP * 0.1), FadeIn(c7), run_time=0.3)
        self.au_mot("pas 7 fois 4")
        l2 = self.t("ce n'est pas 7 × 4 !", 36, ROUGE_ERREUR)
        self.col(l2, 1.45, xl)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.35)
        self.au_mot("4. 7 fois 4")
        l3 = self.ligne([("7 × 4", PLINTHE), ("= 28 m :", PLINTHE)], 38, buff=0.25)
        self.col(l3, 0.65, xl)
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.25)
        self.au_mot("4, 28")
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.25)
        self.au_mot("c'est son périmètre")
        l3b = self.t("son périmètre, en m.", 34, PLINTHE)
        self.col(l3b, 0.0, xl)
        self.play(FadeIn(l3b, shift=UP * 0.1), Create(tour), run_time=0.6)
        self.au_mot("Son aire")
        l4a = self.t("Son aire :", 36, VERT_OK)
        self.col(l4a, -0.75, xl)
        self.play(FadeIn(l4a, shift=UP * 0.1), run_time=0.3)
        self.au_mot("7 fois 7")
        l4 = self.ligne([("7 × 7", BLEU_D), ("= 49 m²", VERT_OK)], 42, buff=0.3)
        self.col(l4, -1.5, xl)
        self.play(FadeIn(l4[0], scale=1.2), FadeOut(tour), FadeIn(g), run_time=0.2)
        self.au_mot("7, 49")
        self.play(FadeIn(l4[1], shift=UP * 0.1), run_time=0.25)
        self.play(Indicate(g, color=VERT_OK, scale_factor=1.03), run_time=0.4)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (réponse C) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        g = rect_cases(6, 6, 0.3, ROSE_D, "#831843").move_to(P(-3.7, 1.4))
        c6 = cote(g, "6 cm", UP, fs=28, buff=0.12)

        def autres_q(sc):
            sc.play(FadeIn(g), FadeIn(c6), run_time=0.35)

        def apres(sc):
            sc.play(g.animate.set_fill(VERT_F), run_time=0.25)

        self.question_gauche("07-question", "07b-reponse",
                             ["Un carré a 6 cm", "de côté.", "Quelle est son aire ?"],
                             [self.choix("24 cm²"), self.choix("12 cm²"), self.choix("36 cm²")], 2,
                             ["A = c × c :", "6 × 6 = 36 cm²."],
                             0.1, couper={1: ("6 × 6", "= 36 cm².")}, mot_q="Un carré",
                             autres_q=autres_q, autres_r=apres)

    # ── 08 : le défi (combien de sacs ?) ────────────────────────────────────
    def pelouse_defi(self, c=0.44):
        return rect_cases(9, 6, c, GAZON_C, GAZON_B).move_to(P(-3.3, 0.7))

    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        g = self.pelouse_defi()
        xl = 0.35
        c9 = cote(g, "9 m", UP, buff=0.12)
        r6 = cote(g, "6 m", LEFT)
        self.au_mot("pelouse de 9")
        l1 = self.ligne([("Pelouse :", GRAY_B), ("9 m", WHITE)], 34)
        self.col(l1, 2.2, xl)
        self.play(LaggedStart(*[FadeIn(q, scale=1.3) for q in g], lag_ratio=0.01), FadeIn(l1[0], shift=UP * 0.1),
                  run_time=0.6)
        self.play(FadeIn(l1[1], shift=UP * 0.1), FadeIn(c9), run_time=0.25)
        self.au_mot("sur 6")
        l1b = self.t("sur 6 m.", 34)
        l1b.next_to(l1, RIGHT, buff=0.2)
        aligner_base(VGroup(l1[1], l1b))
        self.play(FadeIn(l1b, shift=UP * 0.1), FadeIn(r6), run_time=0.3)
        self.au_mot("couvre 25")
        l2 = self.bloc(["Un sac de graines", "couvre 25 m²."], 34, SAC_C)
        self.col(l2, 1.15, xl)
        s1 = sac(0.9).next_to(g, DOWN, buff=0.35)
        self.play(FadeIn(l2, shift=UP * 0.1), FadeIn(s1, shift=UP * 0.2), run_time=0.4)
        self.au_mot("Combien de sacs")
        q = self.bloc(["Combien de sacs", "doit-elle acheter ?"], 38, JAUNE_TITRE)
        self.col(q, -0.25, xl)
        self.play(FadeIn(q, shift=UP * 0.1), Wiggle(s1), run_time=0.5)
        self.pause_defi(y=-1.6)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        g = self.pelouse_defi()
        c9 = cote(g, "9 m", UP, buff=0.12)
        r6 = cote(g, "6 m", LEFT)
        self.add(g, c9, r6)
        xl = 0.35
        self.au_mot("L'aire")
        l0 = self.t("L'aire :", 34, GRAY_B)
        self.col(l0, 2.3, xl)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.3)
        self.au_mot("9 fois 6")
        l1 = self.ligne([("9 × 6", BLEU_D), ("= 54 m²", VERT_OK)], 42, buff=0.3)
        self.col(l1, 1.6, xl)
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("6, 54")
        self.play(FadeIn(l1[1], shift=UP * 0.1), Indicate(g, color=VERT_OK, scale_factor=1.03), run_time=0.4)
        sacs = VGroup(*[sac(0.62) for _ in range(3)]).arrange(RIGHT, buff=0.45).next_to(g, DOWN, buff=0.3)
        self.au_mot("2 sacs")
        l2 = self.ligne([("2 sacs", WHITE), ("couvrent 50 m² :", WHITE)], 34, buff=0.18)
        self.col(l2, 0.75, xl)
        self.play(FadeIn(l2[0], shift=UP * 0.1), FadeIn(sacs[:2], shift=UP * 0.2), run_time=0.3)
        self.au_mot("couvrent 50")
        self.play(FadeIn(l2[1], shift=UP * 0.1),
                  LaggedStart(*[q.animate.set_fill(CARREAU if k < 25 else AMBRE_D).set_stroke(CARREAU_B)
                                for k, q in enumerate(g[:50])], lag_ratio=0.01), run_time=0.8)
        self.au_mot("il manque 4")
        l3 = self.t("il manque 4 m² !", 36, ROUGE_ERREUR)
        self.col(l3, 0.05, xl)
        self.play(FadeIn(l3, shift=UP * 0.1), *[q.animate.set_fill(ROUGE_F) for q in g[50:]], run_time=0.4)
        self.play(Indicate(VGroup(*g[50:]), color=ROUGE_ERREUR, scale_factor=1.15), run_time=0.4)
        self.au_mot("Il faut 3")
        res = self.gros("Il faut 3 sacs", fs=44)
        self.col(res, -0.95, xl)
        self.play(FadeIn(res, scale=1.2), FadeIn(sacs[2], shift=UP * 0.2),
                  *[q.animate.set_fill(VIOLET_D) for q in g[50:]], run_time=0.45)
        self.insister(res, 1.1, 0.25)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        a = rect_cases(5, 3, 0.42)
        b = rect_cases(3, 3, 0.42, GAZON2_C, GAZON_B)
        fig = VGroup(a, b).arrange(DOWN, buff=0.45)
        lignes = self.finale_gauche(fig, textes=[
            ("Rectangle :", "A = L × l"),
            ("Carré :", "A = c × c"),
            ("Les deux longueurs dans la même unité,", "la réponse en unités carrées : cm², m².")],
            fs=30, xl=-2.9)
        self.add(fig)
        self.au_mot("Rectangle")
        self.montrer_ligne(lignes[0], Indicate(a, scale_factor=1.05))
        self.au_mot("Carré")
        self.montrer_ligne(lignes[1], Indicate(b, scale_factor=1.05))
        self.au_mot("Les deux longueurs")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_rectangle()
        self.ecran_carre()
        self.ecran_unites()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")
