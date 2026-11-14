# longueur_convertir.py
# EleveAI — Maths CM1 — série « Longueurs », épisode 02 : CONVERTIR DES LONGUEURS
# (micro longueur_convertir, notion longueur), AVEC VOIX. Paysage 16:9, CEINTURE VERTE.
# Décor et métier : Bilal, ÉLECTRICIEN (5 m de câble, un plan en cm).
# Mapping micro → écrans : 02 (le tableau km hm dam m dm cm mm, 10 fois plus petit d'une colonne à l'autre),
# 03 (5 dans les m, un 0 en dm, un 0 en cm : 500 cm), 04 (1 m = 100 cm, 1 cm = 10 mm, 1 km = 1000 m),
# 06 (piège : 2 m 5 cm = 205 cm, pas 25), questions 05 (3 m en cm, A) et 07 (2 km en m, B),
# défi 08 (1 m 25 cm et 4 m 8 cm en cm : 125 et 408).
# Voix : manim/voix/cm1-longueur-convertir.json (validée le 14/11, Julie, débit −6) ;
# marques : longueur_convertir_marques.json (python manim/scripts/cm1/aire_marques.py longueur:convertir).
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/cm1/longueur_convertir.py LongueurConvertirCM1
# python -m manim render -qh --disable_caching manim/scripts/cm1/longueur_convertir.py LongueurConvertirCM1 -o eleveai-maths-cm1-longueur-convertir --media_dir manim/scripts/cm1/media-longueur-02
# Sortie : manim/sorties/cm1/maths/longueur/02-convertir/eleveai-maths-cm1-longueur-convertir.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from longueur_cm1_commun import *  # noqa: E402,F403

CABLE = "#f97316"    # le câble orange de Bilal
CABLE2 = "#38bdf8"   # un second câble (bleu)
EC = 0.015           # défi : 1 cm de câble = EC unités Manim (4 m 8 cm = 6,1 unités)


def lampe(s=1.0):
    """Une ampoule : le globe jaune, le culot gris, quelques rayons."""
    globe = Circle(radius=0.32 * s, fill_color="#fde047", fill_opacity=1, stroke_color=WHITE, stroke_width=2)
    culot = Rectangle(width=0.3 * s, height=0.22 * s, fill_color="#9ca3af", fill_opacity=1, stroke_width=0)
    culot.next_to(globe, LEFT, buff=-0.04 * s)
    rayons = VGroup(*[Line(P(0.42 * s, 0), P(0.62 * s, 0), color="#fde047", stroke_width=4)
                      .rotate(a, about_point=ORIGIN) for a in (-0.9, -0.45, 0, 0.45, 0.9)])
    rayons.move_to(globe.get_center() + RIGHT * 0.5 * s)
    return VGroup(rayons, culot, globe)


def plan_bleu(larg=1.4, h=1.0):
    """Le plan de l'électricien : une feuille bleue quadrillée, une lampe et un trait de câble."""
    f = Rectangle(width=larg, height=h, fill_color="#1e40af", fill_opacity=1, stroke_color=WHITE, stroke_width=2)
    q = VGroup()
    for k in range(1, 4):
        y = f.get_bottom()[1] + h * k / 4
        q.add(Line(P(f.get_left()[0], y), P(f.get_right()[0], y), color="#93c5fd", stroke_width=1))
    for k in range(1, 5):
        x = f.get_left()[0] + larg * k / 5
        q.add(Line(P(x, f.get_bottom()[1]), P(x, f.get_top()[1]), color="#93c5fd", stroke_width=1))
    tr = Line(f.get_left() + RIGHT * 0.2, f.get_right() + LEFT * 0.35, color=CABLE, stroke_width=5)
    pt = Dot(f.get_right() + LEFT * 0.3, radius=0.07, color="#fde047")
    return VGroup(f, q, tr, pt)


def poteau(h=1.3):
    """Un poteau électrique : le mât et la traverse."""
    m = Line(P(0, 0), P(0, h), color="#a16207", stroke_width=7)
    tr = Line(P(-0.28, h * 0.88), P(0.28, h * 0.88), color="#a16207", stroke_width=6)
    return VGroup(m, tr)


def ligne_poteaux(n=4, ecart=1.3, h=1.3):
    """Une ligne électrique : n poteaux reliés par le fil."""
    ps = VGroup(*[poteau(h).shift(RIGHT * k * ecart) for k in range(n)])
    fils = VGroup(*[ArcBetweenPoints(ps[k][1].get_center(), ps[k + 1][1].get_center(), angle=0.35,
                                     color=WHITE, stroke_width=3) for k in range(n - 1)])
    return VGroup(ps, fils)


def base_du_texte(t):
    """Le bas des lettres sans jambage d'un Text (None si les glyphes ne se comptent pas)."""
    chars = [c for c in t.text if not c.isspace()]
    if len(chars) != len(t.submobjects):
        return None
    bas = [g.get_bottom()[1] for c, g in zip(chars, t.submobjects) if c.isalnum() and c not in "gjpqyçQ"]
    return max(bas) if bas else None


class LongueurConvertirBase(PaysageLongueurCM1):
    nom_voix = "cm1-longueur-convertir"
    fichier_marques = "longueur_convertir_marques.json"
    ceinture = "verte"

    def ligne(self, morceaux, fs=40, buff=0.2):
        """Comme la ligne de la série, mais les morceaux posés sur la MÊME ligne de base
        (centrés, « il doit couper » et « 5 m » flottaient à des hauteurs différentes)."""
        lg = super().ligne(morceaux, fs, buff=buff)
        bases = [base_du_texte(m) for m in lg]
        if all(b is not None for b in bases):
            for m, b in zip(lg[1:], bases[1:]):
                m.shift(UP * (bases[0] - b))
        return lg

    def colonne(self, t, u):
        """Les trois morceaux de la colonne u du tableau (en-tête, case, nom)."""
        i = list(t.tete.keys()).index(u)
        return VGroup(*t[3 * i:3 * i + 3])

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Convertir des longueurs", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Convertir des longueurs")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q0 = self.t("Combien de cm", 38)
        q1 = self.t("dans 5 m ?", 38, JAUNE_TITRE)
        q = VGroup(q0, q1).arrange(DOWN, aligned_edge=LEFT, buff=0.3)
        q.move_to(P(0, 0.3)).align_to(P(-6.2, 0), LEFT)
        c = ruban(4.2, CABLE, 0.26).move_to(P(2.6, 0.35))
        lp = lampe(0.9).next_to(c, RIGHT, buff=0.05)
        self.au_mot("Combien de centimètres")
        self.play(FadeIn(q0, shift=UP * 0.2), FadeIn(lp), GrowFromEdge(c, LEFT), run_time=0.35)
        self.au_mot("dans 5 mètres")
        ec = etiq(c, "5 m", 30, cote=UP)
        self.play(FadeIn(q1, shift=UP * 0.2), FadeIn(ec), run_time=0.3)
        self.attendre_voix(marge=0.6)

    # ── 01 : Bilal, électricien ─────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pe = bilal(0.95).move_to(P(-5.0, 0.35))
        self.au_mot("Voici Bilal")
        nom = self.t("Bilal", 42, JAUNE_TITRE).next_to(pe, UP, buff=0.55)
        self.play(FadeIn(pe, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("Il est électricien")
        met = self.t("électricien", 26, JAUNE_TITRE).next_to(pe, DOWN, buff=0.12)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.35)
        XL = -2.9
        l0 = self.t("Pour brancher une lampe,", 32)
        gauche(l0, XL, 2.5)
        l1 = self.ligne([("il doit couper", WHITE), ("5 m", JAUNE_TITRE), ("de câble.", JAUNE_TITRE)], 32,
                        buff=0.18)
        gauche(l1, XL, 1.85)
        c = ruban(6.0, CABLE, 0.26)
        gauche(c, XL, 0.55)
        lp = lampe(0.9).next_to(c, RIGHT, buff=0.05)
        self.au_mot("brancher une lampe")
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(lp, scale=1.2), run_time=0.35)
        self.au_mot("il doit couper")
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.25)
        self.au_mot("couper 5")
        ec = etiq(c, "5 m", 30, cote=UP)
        self.play(FadeIn(l1[1], shift=UP * 0.1), GrowFromEdge(c, LEFT), FadeIn(ec), run_time=0.25)
        self.au_mot("mètres de câble")
        self.play(FadeIn(l1[2], shift=UP * 0.1), run_time=0.25)
        pl = plan_bleu(1.5, 1.05)
        gauche(pl, XL, -0.95)
        l2 = self.ligne([("Son plan :", WHITE), ("en cm.", JAUNE_TITRE)], 34, buff=0.2)
        gauche(l2, XL + 1.85, -0.95)
        self.au_mot("son plan")
        self.play(FadeIn(pl, shift=UP * 0.2), FadeIn(l2[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("écrit en centimètres")
        self.play(FadeIn(l2[1], shift=UP * 0.1), Indicate(pl, color=JAUNE_TITRE, scale_factor=1.06), run_time=0.45)
        self.au_mot("Combien de centimètres doit")
        q = self.t("Combien de cm couper ?", 40, JAUNE_TITRE).move_to(P(-0.4, -2.6))
        self.play(FadeIn(q, shift=UP * 0.15), Wiggle(c), run_time=0.5)
        self.attendre_voix()

    # ── 02 : le tableau de conversion ───────────────────────────────────────
    def ecran_tableau(self):
        self.ecran("02-tableau")
        tit = self.t("Les unités de longueur", 44, JAUNE_TITRE).move_to(P(0, 2.95))
        t = tableau_conv(cw=1.55, ch=0.72, fs=32).move_to(P(0, 1.15))
        self.au_mot("Les unités de longueur")
        self.play(FadeIn(tit, shift=UP * 0.15), run_time=0.25)
        mots = [("tableau : kilomètre", "km"), ("hectomètre", "hm"), ("décamètre", "dam"),
                ("décamètre, mètre", "m"), ("décimètre", "dm"), ("centimètre", "cm"), ("millimètre", "mm")]
        for mot, u in mots:
            self.au_mot(mot)
            self.play(FadeIn(self.colonne(t, u), shift=DOWN * 0.15), run_time=0.22)
        # les flèches d'une colonne à la suivante, sous le tableau
        fl = VGroup()
        for a, b in zip(COLS[:-1], COLS[1:]):
            pa, pb = t.cases[a].get_bottom(), t.cases[b].get_bottom()
            fl.add(CurvedArrow(pa + DOWN * 0.08 + RIGHT * 0.15, pb + DOWN * 0.08 + LEFT * 0.15, angle=0.9,
                               color=ORANGE_RETENUE, stroke_width=4, tip_length=0.18))
        l0 = self.t("D'une colonne à la suivante :", 36)
        self.col(l0, -1.1, -4.6)
        self.au_mot("D'une colonne à la suivante")
        self.play(FadeIn(l0, shift=UP * 0.1), LaggedStart(*[Create(f) for f in fl], lag_ratio=0.2), run_time=0.9)
        l1 = self.ligne([("c'est 10 fois", VERT_OK), ("plus petit.", VERT_OK)], 48, buff=0.25)
        self.col(l1, -2.0, -4.6)
        self.au_mot("c'est 10")
        self.play(FadeIn(l1[0], scale=1.2), run_time=0.3)
        self.au_mot("plus petit")
        self.play(FadeIn(l1[1], scale=1.1), Indicate(fl, color=JAUNE_TITRE), run_time=0.45)
        self.attendre_voix()

    # ── 03 : placer 5 m dans le tableau ─────────────────────────────────────
    def ecran_placer(self):
        self.ecran("03-placer")
        t = tableau_conv(cw=1.4, ch=0.7, fs=30, surligne=("m", "cm")).move_to(P(-0.2, 2.15))
        self.add(t)
        self.au_mot("On écrit 5")
        c5 = chiffre(t, "m", "5", fs=40, audit=True)
        self.play(FadeIn(c5, scale=1.5), run_time=0.35)
        self.au_mot("colonne des mètres")
        self.play(Indicate(t.tete["m"], color=JAUNE_TITRE, scale_factor=1.3), run_time=0.4)
        self.au_mot("On veut des centimètres")
        self.play(Indicate(t.tete["cm"], color=JAUNE_TITRE, scale_factor=1.3), run_time=0.4)
        self.au_mot("un zéro dans les décimètres")
        z1 = chiffre(t, "dm", "0", ORANGE_RETENUE, fs=40)
        self.play(FadeIn(z1, scale=1.5), run_time=0.3)
        self.au_mot("un zéro dans les centimètres")
        z2 = chiffre(t, "cm", "0", ORANGE_RETENUE, fs=40)
        self.play(FadeIn(z2, scale=1.5), run_time=0.3)
        cs = VGroup(t.cases["m"], t.cases["dm"], t.cases["cm"])
        acc = accolade(cs, "500 cm", 32, VERT_OK, dessus=False)
        l1 = self.ligne([("5 m", BLEU_D), ("= 500 cm", VERT_OK)], 50, buff=0.3)
        gauche(l1, -3.0, -0.75)
        self.au_mot("5 mètres, c'est")
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.25)
        self.au_mot("c'est 500")
        self.play(FadeIn(l1[1], shift=UP * 0.1), FadeIn(acc, shift=UP * 0.1), run_time=0.4)
        l2 = self.ligne([("Bilal coupe", WHITE), ("500 cm", VERT_OK)], 40, buff=0.25)
        gauche(l2, -3.0, -1.85)
        c = ruban(5.2, CABLE, 0.24)
        gauche(c, -3.0, -2.7)
        self.au_mot("Bilal coupe 500")
        self.play(FadeIn(l2, shift=UP * 0.1), GrowFromEdge(c, LEFT), run_time=0.45)
        self.insister(l1, 1.12, 0.25)
        self.attendre_voix()

    # ── 04 : les égalités à connaître ───────────────────────────────────────
    def mini(self, cols, chiffres, cw=0.9):
        t = tableau_conv(cols, cw=cw, ch=0.5, fs=24)
        ch = VGroup(*[chiffre(t, u, s, BLEU_D if k == 0 else ORANGE_RETENUE, fs=28)
                      for k, (u, s) in enumerate(zip(cols, chiffres))])
        return t, ch

    def ecran_egalites(self):
        self.ecran("04-egalites")
        self.au_mot("Les égalités")
        tit = self.t("Les égalités à connaître :", 42, JAUNE_TITRE)
        gauche(tit, -6.2, 3.0)
        self.play(FadeIn(tit, shift=UP * 0.15), run_time=0.35)
        XT, XE = -6.2, -1.6
        lignes = [(["m", "dm", "cm"], "1 m", "= 100 cm", "1 mètre", "c'est 100", 1.8),
                  (["cm", "mm"], "1 cm", "= 10 mm", "1 centimètre", "centimètre, c'est 10", 0.55),
                  (["km", "hm", "dam", "m"], "1 km", "= 1000 m", "1 kilomètre", "kilomètre, c'est 1000", -0.7)]
        eqs = []
        for cols, a, b, mot_a, mot_b, y in lignes:
            t, ch = self.mini(cols, ["1"] + ["0"] * (len(cols) - 1))
            gauche(t, XT, y)
            for c_, u in zip(ch, cols):
                c_.move_to(t.case(u))
            eq = self.ligne([(a, BLEU_D), (b, VERT_OK)], 44, buff=0.3)
            gauche(eq, XE, y)
            eqs.append(eq)
            self.au_mot(mot_a)
            self.play(FadeIn(t, shift=RIGHT * 0.2), FadeIn(ch[0], scale=1.4), FadeIn(eq[0], shift=UP * 0.1),
                      run_time=0.25)
            self.au_mot(mot_b)
            self.play(FadeIn(eq[1], shift=UP * 0.1), LaggedStart(*[FadeIn(z, scale=1.4) for z in ch[1:]],
                                                                  lag_ratio=0.3), run_time=0.3)
        l0 = self.t("Dans une unité plus petite,", 34, ORANGE_RETENUE)
        gauche(l0, XT, -1.95)
        l1 = self.t("le nombre est plus grand.", 34, ORANGE_RETENUE)
        gauche(l1, XT, -2.6)
        self.au_mot("Dans une unité plus petite")
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.3)
        self.au_mot("le nombre est plus grand")
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.3)
        self.insister(VGroup(*eqs), 1.06, 0.25)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (réponse A) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        g = barre([100, 100, 100], 0.013, couleurs=(CABLE, "#fb923c"), h=0.4).move_to(P(-3.8, 1.5))
        acc = accolade(g, "3 m", 30)

        def autres_q(sc):
            sc.play(FadeIn(g), FadeIn(acc), run_time=0.35)

        self.question_gauche("05-question", "05b-reponse",
                             ["3 m,", "c'est combien de cm ?"],
                             [self.choix("300 cm"), self.choix("30 cm"), self.choix("3000 cm")], 0,
                             ["1 m = 100 cm.", "Donc 3 m = 300 cm."],
                             -0.75, mot_q="3 mètres", autres_q=autres_q)

    # ── 06 : le piège (2 m 5 cm = 205 cm, pas 25) ───────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        self.au_mot("Attention")
        tit = self.t("Attention au piège !", 46, ROUGE_ERREUR)
        gauche(tit, -6.2, 3.05)
        self.play(Write(tit), run_time=0.35)
        t = tableau_conv(["m", "dm", "cm"], cw=1.25, ch=0.75, fs=30).move_to(P(-4.4, 0.6))
        self.add(t)
        XP = -1.9
        l0 = self.ligne([("2 m 5 cm", BLEU_D), ("≠ 25 cm", ROUGE_ERREUR)], 44, buff=0.3)
        self.col(l0, 2.0, XP)
        self.au_mot("piège ! 2 mètres 5")
        self.play(FadeIn(l0[0], shift=UP * 0.1), run_time=0.25)
        self.au_mot("pas 25")
        self.play(FadeIn(l0[1], shift=UP * 0.1), run_time=0.3)
        self.insister(l0[1], 1.15, 0.2)
        l1 = self.ligne([("2 m", BLEU_D), ("= 200 cm", VERT_OK)], 44, buff=0.3)
        self.col(l1, 0.95, XP)
        self.au_mot("2 mètres, c'est")
        c2 = chiffre(t, "m", "2", fs=38)
        self.play(FadeIn(l1[0], shift=UP * 0.1), FadeIn(c2, scale=1.4), run_time=0.3)
        self.au_mot("c'est 200")
        z1 = chiffre(t, "dm", "0", ORANGE_RETENUE, fs=38)
        z2 = chiffre(t, "cm", "0", ORANGE_RETENUE, fs=38)
        self.play(FadeIn(l1[1], shift=UP * 0.1), FadeIn(z1, scale=1.4), FadeIn(z2, scale=1.4), run_time=0.35)
        l2 = self.ligne([("+ 5 :", WHITE), ("205 cm", VERT_OK)], 44, buff=0.3)
        self.col(l2, -0.1, XP)
        self.au_mot("Plus 5")
        c5 = chiffre(t, "cm", "5", VERT_OK, fs=38)
        self.play(FadeIn(l2[0], shift=UP * 0.1), FadeOut(z2), FadeIn(c5, scale=1.4), run_time=0.2)
        self.au_mot("5 : 205")
        cs = VGroup(t.cases["m"], t.cases["dm"], t.cases["cm"])
        acc = accolade(cs, "205 cm", 30, VERT_OK, dessus=False)
        self.play(FadeIn(l2[1], scale=1.2), FadeIn(acc, shift=UP * 0.1), run_time=0.4)
        l3 = self.t("Le zéro garde sa place.", 38, JAUNE_TITRE)
        self.col(l3, -1.25, XP)
        self.au_mot("Le zéro garde sa place")
        self.play(FadeIn(l3, shift=UP * 0.1), Circumscribe(z1, color=JAUNE_TITRE, buff=0.12), run_time=0.6)
        self.insister(z1, 1.4, 0.25)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (réponse B) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        g = ligne_poteaux(4, 1.2, 1.1).move_to(P(-3.8, 1.35))
        acc = accolade(g, "2 km", 30)

        def autres_q(sc):
            sc.play(FadeIn(g), FadeIn(acc), run_time=0.35)

        self.question_gauche("07-question", "07b-reponse",
                             ["Bilal tire une ligne", "électrique de 2 km.", "Combien de mètres ?"],
                             [self.choix("200 m"), self.choix("2000 m"), self.choix("20 m")], 1,
                             ["1 km = 1000 m.", "Donc 2 km = 2000 m."],
                             -0.75, mot_q="Bilal tire", autres_q=autres_q)

    # ── 08 : le défi (1 m 25 cm et 4 m 8 cm en cm) ──────────────────────────
    def deux_cables(self):
        g = rubans_alignes([125, 408], [CABLE, CABLE2], EC, buff=0.75, ep=0.26)
        return g

    def pause_gauche(self, y=-2.75, marge=2.0):
        """« Mets pause, et cherche ! » à gauche, sous la question (à droite, il collait à Ti-Margo)."""
        self.au_mot("Mets pause")
        p = gauche(self.t("Mets pause, et cherche !", 32, ORANGE_RETENUE), -6.2, y)
        self.play(Write(p), run_time=0.8)
        self.attendre_voix(marge=marge)

    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        g = self.deux_cables()
        gauche(g, -6.2, 0.9)
        a, b = g
        l0 = self.ligne([("Bilal a", WHITE), ("deux câbles :", WHITE)], 36, buff=0.18)
        gauche(l0, -6.2, 2.2)
        self.au_mot("Bilal a")
        self.play(FadeIn(l0[0], shift=UP * 0.1), run_time=0.25)
        self.au_mot("deux câbles")
        self.play(FadeIn(l0[1], shift=UP * 0.1), run_time=0.25)
        self.au_mot("un de 1 mètre 25 centimètres")
        ea = etiq(a, "1 m 25 cm", 28, cote=RIGHT, audit=True)
        self.play(GrowFromEdge(a, LEFT), FadeIn(ea), run_time=0.4)
        self.au_mot("un de 4 mètres 8 centimètres")
        eb = etiq(b, "4 m 8 cm", 28, cote=RIGHT, audit=True)
        self.play(GrowFromEdge(b, LEFT), FadeIn(eb), run_time=0.4)
        q = self.ligne([("Combien de cm", JAUNE_TITRE), ("pour chacun ?", JAUNE_TITRE)], 40, buff=0.2)
        gauche(q, -6.2, -0.75)
        self.au_mot("Combien de centimètres")
        self.play(FadeIn(q[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("pour chacun")
        self.play(FadeIn(q[1], shift=UP * 0.1), Wiggle(g), run_time=0.5)
        self.pause_gauche(y=-2.0)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        g = self.deux_cables()
        gauche(g, -6.2, 1.7)
        a, b = g
        ea = etiq(a, "1 m 25 cm", 28, cote=RIGHT)
        eb = etiq(b, "4 m 8 cm", 28, cote=RIGHT)
        self.add(g, ea, eb)
        XL = -6.2
        l1 = self.ligne([("1 m = 100 cm,", BLEU_D), ("+ 25 :", WHITE), ("125 cm", VERT_OK)], 40, buff=0.3)
        gauche(l1, XL, 0.15)
        self.au_mot("1 mètre, c'est 100")
        self.play(FadeIn(l1[0], shift=UP * 0.1), Indicate(a, color=JAUNE_TITRE, scale_factor=1.05), run_time=0.35)
        self.au_mot("Plus 25")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.25)
        self.au_mot("25 : 125")
        n1 = etiq(a, "125 cm", 28, VERT_OK, cote=RIGHT)
        self.play(FadeIn(l1[2], scale=1.2), Transform(ea, n1), run_time=0.4)
        l2 = self.ligne([("4 m = 400 cm,", BLEU_D), ("+ 8 :", WHITE), ("408 cm", VERT_OK)], 40, buff=0.3)
        gauche(l2, XL, -0.85)
        self.au_mot("4 mètres, c'est 400")
        self.play(FadeIn(l2[0], shift=UP * 0.1), Indicate(b, color=JAUNE_TITRE, scale_factor=1.05), run_time=0.35)
        self.au_mot("Plus 8")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.25)
        self.au_mot("8 : 408")
        n2 = etiq(b, "408 cm", 28, VERT_OK, cote=RIGHT)
        self.play(FadeIn(l2[2], scale=1.2), Transform(eb, n2), run_time=0.4)
        l3 = self.t("Attention au zéro !", 42, ORANGE_RETENUE)
        gauche(l3, XL, -2.0)
        self.au_mot("Attention au zéro")
        zero = l2[2][1]
        self.play(FadeIn(l3, shift=UP * 0.1), Circumscribe(zero, color=ORANGE_RETENUE, buff=0.08), run_time=0.6)
        self.insister(l2[2], 1.2, 0.25)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        t = tableau_conv(["m", "dm", "cm"], cw=1.2, ch=0.72, fs=30)
        ch = VGroup(chiffre(t, "m", "5", fs=40), chiffre(t, "dm", "0", ORANGE_RETENUE, fs=40),
                    chiffre(t, "cm", "0", ORANGE_RETENUE, fs=40))
        fig = VGroup(t, ch)
        lignes = self.finale_gauche(fig, textes=[
            ("Pour convertir : on place", "le nombre dans le tableau."),
            ("1 m = 100 cm.",),
            ("1 cm = 10 mm.",),
            ("1 km = 1000 m.",)], fs=34)
        self.add(fig)
        self.au_mot("Pour convertir")
        self.montrer_ligne(lignes[0], Indicate(fig, scale_factor=1.05))
        self.au_mot("1 mètre, c'est 100")
        self.montrer_ligne(lignes[1])
        self.au_mot("centimètre, c'est 10")
        self.montrer_ligne(lignes[2])
        self.au_mot("kilomètre, c'est 1000")
        self.montrer_ligne(lignes[3])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_tableau()
        self.ecran_placer()
        self.ecran_egalites()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")


class LongueurConvertirCM1(LongueurConvertirBase):
    identite = "Maths CM1 — EleveAI"
    ceinture = "verte"
