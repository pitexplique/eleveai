# frac_comparer.py
# EleveAI — Maths 4e — série « Fractions », épisode 05 : COMPARER DES FRACTIONS
# (micro du coach : fraction_comparer), AVEC VOIX. Paysage 16:9, CEINTURE
# VERTE : la paysage complète du niveau 4e (même dénominateur, même numérateur,
# dénominateur commun, produits en croix, fraction contre décimal, comparer à
# 1, défi : ranger trois fractions), repère de REGLES.md.
# Short jumeau : frac_comparer_short.py (le steak d'1/3 de livre).
#
# Décor et métier : les DRONES ; Lucie, PILOTE DE DRONE (photos aériennes des
# champs) : batterie du drone A 5/8, du drone B 7/12 → 15/24 > 14/24 (produits
# en croix 60 > 56). Défi : 2/3, 3/4, 5/6 → 8/12 < 9/12 < 10/12. Chiffres
# inventés. Centres : technologie-ia, transports.
# Vérifié (Python) : 5/8 = 15/24 ; 7/12 = 14/24 ; 4 × 5 = 20 < 3 × 7 = 21 ;
# 3/5 = 0,6 > 0,58 ; 7/8 = 0,875 < 0,9.
#
# Micro → écrans : même dénominateur (02 = genPlusGrande ★2), même numérateur
# (03, question 1), dénominateur commun (05), produits en croix (06, question 2
# = genSigne), fraction contre décimal et comparer à 1 (08, question 3 =
# genFractionContreDecimal), défi (10).
# Écrans : 00 garde · 01 Lucie · 02 même dénominateur · 03 même numérateur ·
# 04 QUESTION 1 · 05 même dénominateur commun · 06 produits en croix ·
# 07 QUESTION 2 · 08 avec un décimal · 09 QUESTION 3 · 10 défi · 10b correction ·
# 11 ce que tu as appris · 12 fin.
#
# ⭐ Bases : 4e/frac_lotd_commun.py ; canvas_fractions.py (non modifié).
# Ajouté ici : pilote(), drone(), batterie().
# Voix : manim/voix/4e-frac-comparer.json (débit −10) ; marques : 4e/frac_comparer_marques.json.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/frac_comparer.py FracComparer4e
# python -m manim render -qh --disable_caching manim/scripts/4e/frac_comparer.py FracComparer4e -o eleveai-maths-4e-frac-comparer --media_dir manim/scripts/4e/media-frac-comparer
# Sortie : manim/sorties/4e/maths/fractions/05-comparer/eleveai-maths-4e-frac-comparer.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from frac_lotd_commun import *  # noqa: E402,F403

BATT = "#22c55e"
ROSE_X = "#f472b6"


def drone(s=1.0, couleur="#e2e8f0"):
    corps = RoundedRectangle(width=0.7, height=0.3, corner_radius=0.1, fill_color=couleur, fill_opacity=1,
                             stroke_color="#334155", stroke_width=3)
    bras = VGroup(*[Line(P(0, 0), P(x, 0.1), color="#334155", stroke_width=5) for x in (-0.65, 0.65)])
    helices = VGroup(*[Ellipse(width=0.55, height=0.1, fill_color="#94a3b8", fill_opacity=0.9, stroke_width=0)
                       .move_to(P(x, 0.17)) for x in (-0.65, 0.65)])
    cam = Circle(radius=0.08, fill_color="#111827", fill_opacity=1, stroke_width=0).move_to(P(0, -0.2))
    return VGroup(bras, corps, helices, cam).scale(s)


def pilote(s=1.0):
    """Lucie : veste orange, une télécommande à deux manettes."""
    p = personne(peau=PEAUX[3], tenue="#ea580c", cheveux="#78350f", longs=True)
    tel = VGroup(RoundedRectangle(width=0.9, height=0.45, corner_radius=0.1, fill_color="#1f2937", fill_opacity=1,
                                  stroke_color="#94a3b8", stroke_width=2),
                 *[Circle(radius=0.08, fill_color="#94a3b8", fill_opacity=1, stroke_width=0).move_to(P(x, 0))
                   for x in (-0.25, 0.25)]).move_to(P(0, -1.2))
    p.add(tel)
    return p.scale(s)


def batterie(n, k, largeur=3.4, centre=ORIGIN, etiquette=None):
    """Une batterie = une Barre du coach (verte), avec la borne au bout."""
    b = Barre(n, k, largeur=largeur, hauteur=0.55, couleur=BATT, marge=0.15, centre=centre)
    borne = Rectangle(width=0.12, height=0.25, fill_color="#334155", fill_opacity=1, stroke_width=0)
    borne.next_to(b.contour, RIGHT, buff=0.02)
    b.borne = borne
    return b


class FracComparerBase(PaysageLotD):
    nom_voix = "4e-frac-comparer"
    fichier_marques = "frac_comparer_marques.json"

    def titre(self, txt, couleur=JAUNE_TITRE, fs=46, y=3.0, centre=False):
        """Le titre paraît AU MOT choisi (sans attendre un mot qu'on ne dit pas)."""
        t = self.t(txt, fs, couleur)
        t.sans_synchro = True
        t.move_to(P(0, y)) if centre else self.col(t, y)
        self.play(Write(t), run_time=0.5)
        return t

    def signe_entre(self, f, g, s, couleur=VERT_OK, fs=None):
        """« f s g » posé sur une ligne (s = <, >, =)."""
        return egalite(f, g, signe=s, buff=0.6)

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Comparer des fractions", self.identite, self.ceinture, y_ech=-2.7)
        b1 = Barre(8, 5, largeur=4.2, hauteur=0.55, centre=P(-0.8, 0.75))
        b2 = Barre(12, 7, largeur=4.2, hauteur=0.55, centre=P(-0.8, -0.65))
        self.au_mot("Comparer des fractions")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        self.au_mot("Comment savoir")
        self.play(b1.apparaitre(0.8), b2.apparaitre(0.8))
        q = self.t("?", 90, AMBRE).next_to(VGroup(b1, b2), RIGHT, buff=0.5)
        self.play(FadeIn(q, scale=0.4), run_time=0.4)
        self.insister(q, 1.3, 0.25)
        self.attendre_voix(marge=0.8)

    # ── 01 : Lucie, pilote de drone ─────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pers = pilote(1.05).move_to(P(-5.0, -0.5))
        self.au_mot("Voici Lucie")
        nom = self.t("Lucie", 40, BLEU_CALCUL).next_to(pers, UP, buff=0.3)
        self.play(FadeIn(pers, shift=UP * 0.3), FadeIn(nom), run_time=0.6)
        self.au_mot("pilote de drone")
        metier = self.t("pilote de drone", 30, BLEU_CALCUL).next_to(pers, DOWN, buff=0.2)
        self.play(FadeIn(metier, shift=UP * 0.2), run_time=0.4)
        da, db = drone(1.2).move_to(P(-2.0, 2.0)), drone(1.2, "#fde68a").move_to(P(-2.0, -0.6))
        self.au_mot("vus du ciel")
        self.play(FadeIn(da, shift=UP * 0.4), FadeIn(db, shift=UP * 0.4), run_time=0.6)
        ba = batterie(8, 0, centre=P(3.3, 1.9))
        bb = batterie(12, 0, centre=P(3.3, 0.1))
        la = self.t("A", 40, WHITE).next_to(da, DOWN, buff=0.1)
        lb = self.t("B", 40, WHITE).next_to(db, DOWN, buff=0.1)
        self.au_mot("Le drone A")
        self.play(FadeIn(la), FadeIn(ba), FadeIn(ba.borne), run_time=0.4)
        self.au_mot("5 huitièmes")
        fa = EcritureFraction(5, 8, fs=54).next_to(ba, LEFT, buff=0.3)
        self.play(ba.colorier(range(5), lag=0.08), FadeIn(fa, scale=1.2), run_time=0.7)
        self.au_mot("Le drone B")
        self.play(FadeIn(lb), FadeIn(bb), FadeIn(bb.borne), run_time=0.4)
        self.au_mot("7 douzièmes")
        fb = EcritureFraction(7, 12, fs=54).next_to(bb, LEFT, buff=0.3)
        self.play(bb.colorier(range(7), lag=0.06), FadeIn(fb, scale=1.2), run_time=0.7)
        self.au_mot("le plus longtemps")
        q = self.col(self.t("Lequel vole le plus longtemps ?", 34, ORANGE_RETENUE), -1.6)
        self.play(FadeIn(q, scale=0.8), Wiggle(VGroup(da, db)), run_time=0.8)
        self.attendre_voix()

    # ── 02 : même dénominateur ──────────────────────────────────────────────
    def ecran_meme_den(self):
        self.ecran("02-meme-den")
        self.au_mot("Commençons")
        tit = self.titre("Même dénominateur", fs=44)
        b3 = Barre(8, 3, largeur=5.0, hauteur=0.6, centre=P(-3.4, 1.2))
        b5 = Barre(8, 5, largeur=5.0, hauteur=0.6, centre=P(-3.4, -0.5))
        f3, f5 = EcritureFraction(3, 8, fs=56), EcritureFraction(5, 8, fs=56)
        self.au_mot("3 huitièmes et")
        self.play(b3.apparaitre(0.6), run_time=0.6)
        self.au_mot("5 huitièmes")
        self.play(b5.apparaitre(0.6), run_time=0.6)
        self.au_mot("la même taille")
        l1 = self.col(self.t("parts de même taille", 36, AMBRE), 1.9)
        self.play(FadeIn(l1, shift=RIGHT * 0.2), LaggedStart(*[Indicate(p, color=AMBRE, scale_factor=1.1)
                                                              for p in b3.parts], lag_ratio=0.05), run_time=0.8)
        self.au_mot("5 parts, c'est")
        l2 = self.col(self.ligne([("5 parts", VERT_OK), (">", WHITE), ("3 parts", WHITE)], 40), 1.0)
        self.play(FadeIn(l2, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("Donc 5 huitièmes")
        eg = self.signe_entre(f5, f3, ">")
        self.col(eg, -0.6)
        self.play(FadeIn(eg, scale=1.1), Create(b5.fin_coloriee(vers=-0.3)), run_time=0.5)
        self.play(Create(self.encadrer(eg)), run_time=0.4)
        self.attendre_voix()

    # ── 03 : même numérateur ────────────────────────────────────────────────
    def ecran_meme_num(self):
        self.ecran("03-meme-num")
        self.au_mot("à numérateur égal")
        tit = self.titre("Même numérateur", fs=44)
        b4 = Barre(4, 3, largeur=5.0, hauteur=0.6, centre=P(-3.4, 1.2))
        b7 = Barre(7, 3, largeur=5.0, hauteur=0.6, centre=P(-3.4, -0.5))
        self.au_mot("3 quarts et")
        self.play(b4.apparaitre(0.6), run_time=0.6)
        self.au_mot("3 septièmes")
        self.play(b7.apparaitre(0.6), run_time=0.6)
        self.au_mot("3 parts dans")
        l1 = self.col(self.t("3 parts dans les deux cas", 34, WHITE), 1.9)
        self.play(FadeIn(l1, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("un quart est plus grand")
        self.play(Indicate(b4.parts[0], color=AMBRE, scale_factor=1.15), Indicate(b7.parts[0], color=AMBRE,
                                                                                 scale_factor=1.15), run_time=0.7)
        l2 = self.col(self.t("1 quart > 1 septième", 36, AMBRE), 1.05)
        l2.sans_synchro = True
        self.play(FadeIn(l2, shift=RIGHT * 0.2), run_time=0.35)
        self.au_mot("Donc 3 quarts")
        eg = self.signe_entre(EcritureFraction(3, 4, fs=56), EcritureFraction(3, 7, fs=56), ">")
        self.col(eg, -0.15)
        self.play(FadeIn(eg, scale=1.1), Create(b4.fin_coloriee(vers=-1.4)), run_time=0.5)
        self.au_mot("plus le dénominateur")
        r = self.col(self.bloc(["Plus le dénominateur est petit,", "plus les parts sont grandes."], 30, VERT_OK), -1.45)
        self.play(FadeIn(r, shift=UP * 0.15), run_time=0.5)
        self.attendre_voix()

    # ── 04 : QUESTION 1 (2/9 ou 2/5) ────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        b9 = Barre(9, 2, largeur=5.0, hauteur=0.6, centre=P(-3.4, 1.0))
        b5 = Barre(5, 2, largeur=5.0, hauteur=0.6, centre=P(-3.4, -0.7))
        l9 = self.inline("2/9", 32).next_to(b9, UP, buff=0.08).align_to(b9, LEFT)
        l5 = self.inline("2/5", 32).next_to(b5, UP, buff=0.08).align_to(b5, LEFT)

        def apres(sc):
            sc.rep(0, "Même numérateur", FadeIn(b9), FadeIn(l9), FadeIn(b5), FadeIn(l5))
            sc.play(Create(b5.fin_coloriee(vers=0.5).put_start_and_end_on(
                P(b5.x_trait(2), b5.contour.get_bottom()[1] - 0.1), P(b5.x_trait(2), b9.contour.get_top()[1] + 0.1))),
                run_time=0.5)
            sc.rep(1, "9 est plus grand", Indicate(sc.cartes_q[0], color=ROUGE_ERREUR, scale_factor=1.03))
            sc.fin_rep()

        self.question_pause("04-question", "04b-reponse", ["La plus grande :", "2/9 ou 2/5 ?"],
                            [self.inline("2/9"), self.inline("2/5"), self.inline("elles sont égales")], 1,
                            ["cinquièmes > neuvièmes", "9 > 5, mais 2/9 < 2/5 !"],
                            mot_q="Quelle fraction", autres_r=apres)

    # ── 05 : le même dénominateur commun (24) ───────────────────────────────
    def ecran_den_commun(self):
        self.ecran("05-meme-den-commun")
        ba = batterie(8, 5, largeur=4.8, centre=P(-3.6, 2.0))
        bb = batterie(12, 7, largeur=4.8, centre=P(-3.6, 0.6))
        self.add(ba, ba.borne, bb, bb.borne)
        self.au_mot("Revenons aux drones")
        la = self.t("A", 36).next_to(ba, LEFT, buff=0.15)
        lb = self.t("B", 36).next_to(bb, LEFT, buff=0.15)
        self.play(FadeIn(la), FadeIn(lb), run_time=0.3)
        self.au_nb("même dénominateur, 24")
        l0 = self.col(self.t("dénominateur commun : 24", 34, AMBRE), 2.85)
        self.play(FadeIn(l0, shift=RIGHT * 0.2), run_time=0.4)
        f1, g1 = EcritureFraction(5, 8, fs=46), EcritureFraction(15, 24, fs=46)
        e1 = egalite(f1, g1, buff=1.0)
        self.col(e1, 1.0)
        h1, b1 = fleches(f1, g1, "× 3", fs=30, angle=TAU / 10)
        self.au_mot("5 huitièmes égale")
        self.play(FadeIn(f1), Create(h1[0]), FadeIn(h1[1]), Create(b1[0]), FadeIn(b1[1]), run_time=0.5)
        self.au_mot("15 vingt")
        ba24, anim = ba.repartager(3, run_time=0.8)
        self.play(FadeIn(e1[1]), FadeIn(g1, scale=1.2), anim, run_time=0.8)
        f2, g2 = EcritureFraction(7, 12, fs=46), EcritureFraction(14, 24, fs=46)
        e2 = egalite(f2, g2, buff=1.0)
        self.col(e2, -1.75)
        h2, b2 = fleches(f2, g2, "× 2", fs=30, angle=TAU / 10)
        self.au_mot("7 douzièmes égale")
        self.play(FadeIn(f2), Create(h2[0]), FadeIn(h2[1]), Create(b2[0]), FadeIn(b2[1]), run_time=0.5)
        self.au_mot("14 vingt")
        bb24, anim = bb.repartager(2, run_time=0.8)
        self.play(FadeIn(e2[1]), FadeIn(g2, scale=1.2), anim, run_time=0.8)
        self.au_mot("15 est plus grand")
        c = self.bloc(["15 > 14 :", "le drone A a plus de batterie !"], 27, VERT_OK).move_to(P(-3.4, -1.15))
        tir = DashedLine(P(ba24.x_trait(15), ba24.contour.get_top()[1] + 0.1),
                         P(ba24.x_trait(15), bb24.contour.get_bottom()[1] - 0.1), color=AMBRE, stroke_width=5)
        self.play(FadeIn(c, shift=UP * 0.15), Create(tir), run_time=0.6)
        self.attendre_voix()

    # ── 06 : les produits en croix ──────────────────────────────────────────
    def ecran_croix(self):
        self.ecran("06-croix")
        self.au_mot("produits en croix")
        tit = self.titre("Les produits en croix", fs=44)
        f, g = EcritureFraction(5, 8, fs=90), EcritureFraction(7, 12, fs=90)
        eg = egalite(f, g, signe="?", buff=1.0).move_to(P(-3.3, 0.5))
        eg[1].set_color(AMBRE)
        x = VGroup(Line(f.num.get_center(), g.den.get_center(), color=ROSE_X, stroke_width=5).scale(0.75),
                   Line(f.den.get_center(), g.num.get_center(), color=ROSE_X, stroke_width=5).scale(0.75))
        self.add(eg)
        l1 = self.col(sans_synchro(self.ligne([("5 × 12 =", WHITE), ("60", ROSE_X)], 44)), 1.8)
        self.au_mot("5 fois 12")
        self.play(Create(x[0]), FadeIn(l1[0]), run_time=0.4)
        self.au_nb("égale 60")
        self.play(FadeIn(l1[1], scale=1.2), run_time=0.3)
        l2 = self.col(sans_synchro(self.ligne([("7 × 8 =", WHITE), ("56", ROSE_X)], 44)), 0.9)
        self.au_mot("7 fois 8")
        self.play(Create(x[1]), FadeIn(l2[0]), run_time=0.4)
        self.au_nb("égale 56")
        self.play(FadeIn(l2[1], scale=1.2), run_time=0.3)
        self.au_mot("60 est plus grand")
        l3 = self.col(self.t("60 > 56", 48, VERT_OK), -0.2)
        self.play(FadeIn(l3, scale=1.2), run_time=0.4)
        self.au_mot("5 huitièmes est plus grand")
        sup = self.t(">", 90, VERT_OK).move_to(eg[1])
        self.play(Transform(eg[1], sup), run_time=0.5)
        self.play(Create(self.encadrer(eg)), run_time=0.4)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (4/7 … 3/5) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        f, g = EcritureFraction(4, 7, fs=96), EcritureFraction(3, 5, fs=96)
        eg = egalite(f, g, signe="…", buff=1.0).move_to(P(-3.3, 0.4))
        eg[1].set_color(ORANGE_TROU)
        x = VGroup(Line(f.num.get_center(), g.den.get_center(), color=ROSE_X, stroke_width=5).scale(0.75),
                   Line(f.den.get_center(), g.num.get_center(), color=ROSE_X, stroke_width=5).scale(0.75))
        inf = self.t("<", 96, VERT_OK).move_to(eg[1])

        def avant(sc):
            sc.q_tete()
            sc.au_mot("4 septièmes")
            sc.play(FadeIn(f, scale=1.1), run_time=0.3)
            sc.au_mot("3 cinquièmes")
            sc.q_tete(FadeIn(eg[1]), FadeIn(g, scale=1.1))

        def apres(sc):
            sc.rep(0, "4 fois 5", Create(x[0]))
            sc.rep(1, "3 fois 7", Create(x[1]))
            sc.rep(2, "20 est plus petit", Transform(eg[1], inf))
            sc.fin_rep()

        self.question_pause("07-question", "07b-reponse", ["Quel signe entre", "4/7 et 3/5 ?"],
                            [self.inline("<  (plus petit)"), self.inline("=  (égal)"), self.inline(">  (plus grand)")], 0,
                            ["4 × 5 = 20", "3 × 7 = 21", "20 < 21 : 4/7 < 3/5"],
                            mot_q="Quel signe", avant_q=avant, autres_r=apres)

    # ── 08 : avec un nombre décimal, et comparer à 1 ────────────────────────
    def ecran_decimal(self):
        self.ecran("08-decimal")
        dr = Droite(0, 1, 10, etiquettes={0: "0", 1: "1"}, longueur=10.0, centre=P(-0.3, 0.9), fs=30)
        self.au_mot("Avec un nombre décimal")
        tit = self.t("Avec un nombre décimal", 44, JAUNE_TITRE).move_to(P(0, 3.1))
        self.play(Write(tit), FadeIn(dr), run_time=0.6)
        l1 = sans_synchro(self.ligne([("3/5 =", WHITE), ("3 ÷ 5 =", WHITE), ("0,6", VERT_OK)], 44)).move_to(P(-2.6, -0.9))
        self.au_mot("3 cinquièmes")
        self.play(FadeIn(l1[0], shift=RIGHT * 0.15), run_time=0.3)
        self.au_nb("3 divisé par 5")
        self.play(FadeIn(l1[1], shift=RIGHT * 0.15), run_time=0.3)
        self.au_nb("égale 0,6")
        self.play(FadeIn(l1[2], scale=1.3), FadeIn(dr.point(0.6, "0,6", couleur=VERT_OK, fs=30)), run_time=0.4)
        self.au_nb("plus grand que 0,58")
        p58 = dr.point(0.58, "0,58", couleur=ORANGE_PART, fs=26, haut=1.1)
        l2 = self.t("0,6 > 0,58", 44, VERT_OK).next_to(l1, RIGHT, buff=0.8)
        self.play(FadeIn(p58), FadeIn(l2, scale=1.2), run_time=0.4)
        self.au_mot("Et 5 quarts")
        f = EcritureFraction(5, 4, fs=64).move_to(P(-5.0, -2.5))
        self.play(FadeIn(f, scale=1.2), run_time=0.4)
        self.au_mot("Le numérateur est plus grand")
        l3 = self.ligne([("5 > 4 :", AMBRE), ("plus grand que 1", VERT_OK)], 40).next_to(f, RIGHT, buff=0.5)
        sans_synchro(l3)
        self.play(FadeIn(l3[0], shift=RIGHT * 0.15), Indicate(f.num, color=AMBRE, scale_factor=1.3), run_time=0.5)
        self.au_nb("plus grand que 1")
        self.play(FadeIn(l3[1], shift=RIGHT * 0.15), run_time=0.4)
        self.attendre_voix()

    # ── 09 : QUESTION 3 (7/8 ou 0,9) ────────────────────────────────────────
    def ecran_question3(self):
        self.clear()
        self.add_mascotte()
        dr = Droite(0.8, 1, 4, etiquettes={0.8: "0,8", 1: "1"}, longueur=4.4, centre=P(-3.3, -1.2), fs=30)
        f = EcritureFraction(7, 8, fs=72).move_to(P(-4.4, 2.0))
        d = self.t("0,9", 66, BLEU_CALCUL).move_to(P(-2.2, 2.0))
        p875 = dr.point(0.875, "0,875", couleur=VERT_OK, fs=26)
        p9 = dr.point(0.9, "0,9", couleur=BLEU_CALCUL, fs=26, haut=1.1)

        def avant(sc):
            sc.q_tete()
            sc.q_tete(FadeIn(f, scale=1.2), FadeIn(d, scale=1.2), FadeIn(dr))

        def apres(sc):
            sc.rep(0, "7 divisé par 8")
            sc.au_nb("égale 0,875")
            sc.play(FadeIn(p875), run_time=0.3)
            sc.rep(1, "Et 0,875")
            sc.au_nb("plus petit que 0,9")
            sc.play(FadeIn(p9), run_time=0.3)
            sc.fin_rep()

        self.question_pause("09-question", "09b-reponse", ["Le plus grand :", "7/8 ou 0,9 ?"],
                            [self.inline("7/8"), self.inline("0,9"), self.inline("ils sont égaux")], 1,
                            ["7 ÷ 8 = 0,875", "0,875 < 0,9"], mot_q="Lequel", avant_q=avant, autres_r=apres)

    # ── 10 : défi (ranger 2/3, 3/4, 5/6) ────────────────────────────────────
    def ecran_defi(self):
        self.ecran("10-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.titre("À toi de jouer !", fs=50)
        ds = VGroup(*[drone(0.9, c) for c in ("#e2e8f0", "#fde68a", "#bfdbfe")]).arrange(DOWN, buff=1.0).move_to(P(-4.6, 0.0))
        fr_ = [EcritureFraction(a, b, fs=46) for a, b in ((2, 3), (3, 4), (5, 6))]
        for f, dd in zip(fr_, ds):
            f.next_to(dd, RIGHT, buff=0.6)
        self.au_mot("Trois drones")
        self.play(LaggedStart(*[FadeIn(dd, shift=UP * 0.3) for dd in ds], lag_ratio=0.2), run_time=0.7)
        for f, mot in zip(fr_, ("2 tiers", "3 quarts", "5 sixièmes")):
            self.au_mot(mot)
            self.play(FadeIn(f, scale=1.2), run_time=0.35)
        self.au_mot("Range-les")
        l = self.col(self.bloc(["Range-les du plus", "petit au plus grand !"], 38, ORANGE_RETENUE), 1.2)
        self.play(FadeIn(l, shift=RIGHT * 0.2), run_time=0.4)
        self.pause_defi(y=-0.2)

    def ecran_correction(self):
        self.ecran("10b-correction", 0.65)
        tit = self.titre("Correction", fs=50)
        self.au_nb("Même dénominateur : 12")
        l0 = self.col(self.t("Même dénominateur : 12", 38, AMBRE), 2.2)
        self.play(FadeIn(l0, shift=RIGHT * 0.2), run_time=0.4)
        rangs = [((2, 3), (8, 12), 8, "2 tiers égale", "8 douzièmes", 1.6), ((3, 4), (9, 12), 9, "3 quarts égale", "9 douzièmes", 0.0),
                 ((5, 6), (10, 12), 10, "5 sixièmes égale", "10 douzièmes", -1.6)]
        for (a, b), (c, d), k, m1, m2, y in rangs:
            f, g = EcritureFraction(a, b, fs=52), EcritureFraction(c, d, fs=52)
            eg = egalite(f, g, buff=0.5).move_to(P(-5.0, y))
            br = Barre(12, k, largeur=3.6, hauteur=0.45, marge=0.12, couleur=BATT).next_to(eg, RIGHT, buff=0.4)
            self.au_mot(m1)
            self.play(FadeIn(f, scale=1.2), run_time=0.3)
            self.au_mot(m2)
            self.play(FadeIn(eg[1]), FadeIn(g, scale=1.2), br.apparaitre(0.5), run_time=0.5)
        self.au_mot("Donc 2 tiers")
        r = sans_synchro(self.bloc(["2/3 < 3/4 < 5/6"], 46, VERT_OK))
        self.col(r, -0.2, xl=1.5)
        self.play(FadeIn(r, scale=1.2), run_time=0.4)
        self.play(Create(self.encadrer(r)), run_time=0.4)
        self.attendre_voix()

    # ── 11 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("11-finale", 0.65)
        ba = Barre(8, 5, largeur=4.2, hauteur=0.55, etiquette="frac", fs=32, centre=P(-3.6, 0.9))
        bb = Barre(12, 7, largeur=4.2, hauteur=0.55, etiquette="frac", fs=32, centre=P(-3.6, -1.3))
        fig = VGroup(ba, bb)
        self.add(fig)
        lignes = self.finale_colonne(figure=fig, textes=[("Même dénominateur :", "on compare les numérateurs."),
                                                         ("Même numérateur : le plus", "petit dénominateur gagne."),
                                                         ("Sinon : même dénominateur", "ou produits en croix."),
                                                         ("Avec un décimal : on divise.",)], fs=34)
        self.montrer2(lignes[0], "Même dénominateur", "on compare")
        self.montrer2(lignes[1], "Même numérateur", "le plus petit")
        self.montrer2(lignes[2], "Sinon", "ou on calcule")
        self.montrer2(lignes[3], "Et avec un décimal")
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_meme_den()
        self.ecran_meme_num()
        self.ecran_question1()
        self.ecran_den_commun()
        self.ecran_croix()
        self.ecran_question2()
        self.ecran_decimal()
        self.ecran_question3()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("12-abonne")


class FracComparer4e(FracComparerBase):
    identite = "Maths 4e — EleveAI"
    ceinture = "verte"
