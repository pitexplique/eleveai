# frac_additionner.py
# EleveAI — Maths 4e — série « Fractions », épisode 06 : ADDITIONNER DES
# FRACTIONS (micro du coach : fraction_additionner, notion fraction_calcul),
# AVEC VOIX. Paysage 16:9, CEINTURE VERTE : la paysage complète du niveau 4e
# (dénominateurs quelconques, relatifs, simplifier, piège, défi à 3 termes).
# Short jumeau : frac_additionner_short.py (le blé des scribes, 63/64, jaune).
#
# Décor et métier : les ABEILLES ; Mila, APICULTRICE : sa ruche est sur une
# balance connectée. Lundi + 2/3 kg, mardi + 3/4 kg → 8/12 + 9/12 = 17/12 kg ;
# pot d'1 kg : 7/12 + 1/6 = 9/12 = 3/4 = 0,75 = 75 % (SA première erreur :
# SIMPLIFIER le résultat, puis la chaîne décimal → pourcentage) ; jour de pluie :
# −5/6 + 1/4 = −10/12 + 3/12 = −7/12 ; défi : 3/4 − 1/3 + 1/12 = 6/12 = 1/2 kg.
# Chiffres inventés (aucune donnée du monde réel citée). Centres : animaux,
# nature-ecologie.
# Vérifié (Python, fractions.Fraction) : 2/3 + 3/4 = 17/12 ; 1/6 + 3/4 = 11/12 ;
# 5/7 < 3/4 ; 7/12 + 1/6 = 3/4 ; −5/6 + 1/4 = −7/12 ; −1/2 + 1/3 = −1/6 ;
# 3/4 − 1/3 + 1/12 = 1/2.
#
# Micro → écrans (banque 4e/maths/fractions.bank.ts) : genSommeQcm/Court (a+b,
# dénominateur commun = ppcm : 02, 03, question 1 = 1/6 + 3/4, leurres
# « n1+n2 / d1+d2 » et « numérateurs non convertis »), 4e_fraction_additionner_
# erreur_fixed_1 (le piège : 05), simplifier le résultat (06, tq(r)), formes
# « -a+b », « a+(-b) » (08, question 2), « a+b+c » (défi 10).
# Écrans : 00 garde · 01 Mila et la ruche · 02 même dénominateur · 03 la somme
# · 04 QUESTION 1 · 05 le piège · 06 simplifier · 07 décimal → % · 08 relatifs
# · 09 QUESTION 2 · 10 défi · 10b correction · 11 ce que tu as appris · 12 fin.
#
# ⭐ Bases : 4e/frac_lote_commun.py (PaysageE = PaysageLotC du lot C de 6e +
# audit de synchro) ; figures canvas_fractions.py (non modifié).
# Voix : manim/voix/4e-frac-additionner.json (débit −10), WAV dans
# public/sons/4e-frac-additionner/ ; marques : 4e/frac_additionner_marques.json.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/frac_additionner.py FracAdditionner4e
# python -m manim render -qh --disable_caching manim/scripts/4e/frac_additionner.py FracAdditionner4e -o eleveai-maths-4e-frac-additionner --media_dir manim/scripts/4e/media-frac-additionner
# Sortie : manim/sorties/4e/maths/fractions/06-additionner/eleveai-maths-4e-frac-additionner.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from frac_lote_commun import *  # noqa: E402,F403

MIEL_C = "#fbbf24"     # les parts du premier terme (miel)
VERT_C = VERT_PART     # les parts du second terme
XB, LB = -3.3, 5.6     # le centre des barres, leur largeur


def apicultrice(s=1.0):
    """Mila : chapeau à large bord et voile de protection, tenue claire."""
    p = personne(peau="#8d5524", tenue="#e5e7eb", cheveux="#1f2937", longs=True, s=s)
    c = p.tete.get_center()
    r = p.tete.width / 2
    bord = Ellipse(width=r * 3.2, height=r * 0.55, fill_color="#d6d3d1", fill_opacity=1, stroke_width=0)
    bord.move_to(c + UP * r * 0.75)
    calotte = RoundedRectangle(width=r * 1.6, height=r * 0.9, corner_radius=r * 0.3, fill_color="#d6d3d1",
                               fill_opacity=1, stroke_width=0).move_to(c + UP * r * 1.15)
    voile = Rectangle(width=r * 2.6, height=r * 1.7, fill_color="#94a3b8", fill_opacity=0.35, stroke_color="#cbd5e1",
                      stroke_width=2).move_to(c + DOWN * r * 0.1)
    p.add(voile, bord, calotte)
    return p


def ruche(s=1.0):
    """Une ruche (trois hausses et un toit) posée sur une balance à écran."""
    hausses = VGroup(*[RoundedRectangle(width=1.6, height=0.55, corner_radius=0.06, fill_color="#d97706",
                                        fill_opacity=1, stroke_color="#78350f", stroke_width=3) for _ in range(3)])
    hausses.arrange(UP, buff=0.04)
    toit = Polygon(P(-0.95, 0), P(0.95, 0), P(0.75, 0.3), P(-0.75, 0.3), fill_color="#92400e", fill_opacity=1,
                   stroke_width=0).next_to(hausses, UP, buff=0.02)
    trou = RoundedRectangle(width=0.5, height=0.1, corner_radius=0.04, fill_color="#1c1917", fill_opacity=1,
                            stroke_width=0).move_to(hausses[0].get_bottom() + UP * 0.12)
    plateau = Rectangle(width=2.0, height=0.14, fill_color="#64748b", fill_opacity=1, stroke_width=0)
    plateau.next_to(hausses, DOWN, buff=0.0)
    socle = RoundedRectangle(width=2.2, height=0.45, corner_radius=0.08, fill_color="#334155", fill_opacity=1,
                             stroke_width=0).next_to(plateau, DOWN, buff=0.0)
    ecran = RoundedRectangle(width=0.9, height=0.28, corner_radius=0.05, fill_color="#bbf7d0", fill_opacity=1,
                             stroke_width=0).move_to(socle)
    g = VGroup(socle, ecran, plateau, hausses, toit, trou).scale(s)
    g.ecran = ecran
    return g


def abeille(s=0.25):
    corps = Ellipse(width=0.8, height=0.5, fill_color=MIEL_C, fill_opacity=1, stroke_color="#111827", stroke_width=2)
    bandes = VGroup(*[Line(P(x, -0.22), P(x, 0.22), stroke_color="#111827", stroke_width=5) for x in (-0.1, 0.12)])
    ailes = VGroup(*[Ellipse(width=0.35, height=0.5, fill_color=WHITE, fill_opacity=0.7, stroke_width=0)
                     .move_to(P(x, 0.35)) for x in (-0.12, 0.12)])
    return VGroup(ailes, corps, bandes).scale(s)


def pot(h=2.2, w=1.5):
    """Un pot de miel (contour) ; .corps."""
    corps = RoundedRectangle(width=w, height=h, corner_radius=0.25, stroke_color="#cbd5e1", stroke_width=5)
    cou = Rectangle(width=w * 0.8, height=0.22, fill_color="#a16207", fill_opacity=1, stroke_width=0)
    cou.next_to(corps, UP, buff=0.0)
    g = VGroup(corps, cou)
    g.corps = corps
    return g


def niveau(pt, de, a, couleur=MIEL_C):
    c = pt.corps
    H = c.height - 0.14
    r = Rectangle(width=c.width - 0.16, height=max(0.001, H * (a - de)), fill_color=couleur, fill_opacity=0.9,
                  stroke_width=0)
    return r.move_to(P(c.get_x(), c.get_bottom()[1] + 0.07 + H * (a + de) / 2))


def fleche_droite(dr, a, b, couleur, h=0.55):
    """Un saut sur la droite graduée, de a à b, à la hauteur h au-dessus de l'axe."""
    return Arrow(dr.p(a) + UP * h, dr.p(b) + UP * h, buff=0, color=couleur, stroke_width=7, tip_length=0.22,
                 max_tip_length_to_length_ratio=0.5)


class FracAdditionnerBase(PaysageE):
    nom_voix = "4e-frac-additionner"
    fichier_marques = "frac_additionner_marques.json"

    def barre(self, n, k=0, y=0.0, couleur=MIEL_C, largeur=LB, **kw):
        return Barre(n, k, largeur=largeur, hauteur=0.6, couleur=couleur, marge=0.2, centre=P(XB, y), **kw)

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Additionner des fractions", self.identite, self.ceinture, y_ech=-2.7)
        self.au_mot("Additionner")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        ex = expression((2, 3), "+", (3, 4), "=", "?", fs=80).move_to(P(-0.6, 0.2))
        ex[4].set_color(AMBRE)
        self.frac(ex[0], "2 tiers")
        self.au_nb("plus 3 quarts")
        self.play(FadeIn(ex[1]), FadeIn(ex[2], scale=1.3), run_time=0.4)
        self.au_mot("combien")
        self.play(FadeIn(ex[3:], scale=0.5), run_time=0.4)
        self.insister(ex[4], 1.4, 0.25)
        self.attendre_voix(marge=0.8)

    # ── 01 : Mila et la ruche ───────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pers = apicultrice(1.05).move_to(P(-5.3, -0.6))
        self.au_mot("Voici Mila")
        nom = self.t("Mila", 40, BLEU_CALCUL).next_to(pers, UP, buff=0.35)
        self.play(FadeIn(pers, shift=UP * 0.3), FadeIn(nom), run_time=0.6)
        self.au_mot("apicultrice")
        metier = self.t("apicultrice", 34, BLEU_CALCUL).next_to(pers, DOWN, buff=0.2)
        self.play(FadeIn(metier, shift=UP * 0.2), run_time=0.4)
        ru = ruche(1.0).move_to(P(-2.3, -0.5))
        ab = VGroup(*[abeille().move_to(ru.get_top() + P(x, y)) for x, y in ((-0.7, 0.4), (0.5, 0.7), (0.9, 0.2))])
        self.au_mot("balance connectée")
        self.play(FadeIn(ru, shift=UP * 0.2), LaggedStart(*[FadeIn(a, scale=0.3) for a in ab], lag_ratio=0.3),
                  run_time=0.8)
        self.play(*[a.animate.shift(P(0.15, 0.1)) for a in ab], rate_func=there_and_back, run_time=0.6)
        l1 = VGroup(self.t("Lundi :", 40), self.t("+", 44, MIEL_C), EcritureFraction(2, 3, fs=54, couleur=MIEL_C),
                    self.t("kg", 40, MIEL_C)).arrange(RIGHT, buff=0.2)
        l2 = VGroup(self.t("Mardi :", 40), self.t("+", 44, VERT_C), EcritureFraction(3, 4, fs=54, couleur=VERT_C),
                    self.t("kg", 40, VERT_C)).arrange(RIGHT, buff=0.2)
        self.col(l1, 2.2)
        self.col(l2, 0.55)
        self.au_mot("Lundi")
        self.play(FadeIn(l1[0], shift=RIGHT * 0.15), run_time=0.3)
        self.au_mot("2 tiers de kilo")
        self.play(FadeIn(l1[1:], scale=1.2), Indicate(ru.ecran, color=MIEL_C), run_time=0.5)
        self.au_mot("Mardi")
        self.play(FadeIn(l2[0], shift=RIGHT * 0.15), run_time=0.3)
        self.au_mot("3 quarts de kilo")
        self.play(FadeIn(l2[1:], scale=1.2), Indicate(ru.ecran, color=VERT_C), run_time=0.5)
        self.au_mot("Combien en deux jours")
        q = self.col(self.t("En deux jours : ? kg", 42, ORANGE_RETENUE), -1.05)
        self.play(FadeIn(q, shift=UP * 0.2), run_time=0.4)
        self.attendre_voix()

    # ── 02 : le même dénominateur ───────────────────────────────────────────
    def ecran_commun(self):
        self.ecran("02-commun")
        a = self.barre(3, 2, 1.6)
        b = self.barre(4, 3, 0.2, couleur=VERT_C)
        e1 = expression((2, 3, MIEL_C), "+", (3, 4, VERT_C), fs=56)
        self.col(e1, 2.4)
        self.montre(["2 tiers plus", "plus 3 quarts"], [e1[0], e1[1:]], avec=[a.apparaitre(0.5)])
        self.play(b.apparaitre(0.5), run_time=0.5)
        self.au_mot("pas la même taille")
        self.play(Indicate(a.parts[0], color=AMBRE), Indicate(b.parts[0], color=AMBRE), run_time=0.6)
        self.au_mot("table de 3")
        t = self.col(self.ligne([("table de 3", WHITE), ("et de 4 :", WHITE), ("12", AMBRE)], 38), 1.2)
        self.poser_lignes(t, "fade", 0.3)
        self.au_nb("2 tiers égale 8 douzièmes")
        a12, an1 = a.repartager(4, run_time=0.8)
        e2 = expression("=", (8, 12, MIEL_C), "+", (9, 12, VERT_C), fs=56)
        self.col(e2, -0.2)
        self.play(an1, FadeIn(e2[:2], scale=1.2))
        self.au_nb("3 quarts égale 9 douzièmes")
        b12, an2 = b.repartager(3, run_time=0.8)
        self.play(an2, FadeIn(e2[2:], scale=1.2))
        self.play(Indicate(VGroup(e2[1].den, e2[3].den), color=AMBRE), run_time=0.5)
        self.attendre_voix()
        return e2

    # ── 03 : la somme (17/12 kg) ────────────────────────────────────────────
    def ecran_somme(self, e2):
        self.ecran("03-somme")
        e2.move_to(P(0, 0)).align_to(P(self.XL, 0), LEFT).set_y(2.4)
        self.add(e2)
        b1 = self.barre(12, 0, 1.3)
        b2 = self.barre(12, 0, -0.1)
        self.au_mot("même taille")
        self.play(FadeIn(b1), FadeIn(b2), run_time=0.5)
        self.au_mot("8 plus 9")
        anims = [b1.colorier(range(8), couleur=MIEL_C, lag=0.05, run_time=0.5),
                 b1.colorier(range(8, 12), couleur=VERT_C, lag=0.05, run_time=0.4),
                 b2.colorier(range(5), couleur=VERT_C, lag=0.05, run_time=0.4)]
        self.calc([("8 + 9 =", WHITE), ("17", VERT_OK)], 1.1, 50, avec=[Succession(*anims)])
        self.au_mot("17 douzièmes de kilo")
        e3 = expression("=", (17, 12), "kg", fs=62)
        e3[2].set_color(VERT_OK)
        self.col(e3, -0.3)
        self.play(FadeIn(e3, scale=1.2), run_time=0.4)
        self.play(Create(self.encadrer(e3[1])), run_time=0.3)
        self.au_mot("12 douzièmes")
        un = b1.accolade("12 douzièmes", fs=30, dessus=True)
        un[1].sans_synchro = True
        self.play(FadeIn(un, shift=DOWN * 0.1), run_time=0.4)
        self.au_mot("plus d'1 kilo")
        r = self.col(self.t("Plus d'1 kilo !", 44, AMBRE), -1.7)
        self.play(FadeIn(r, scale=1.3), run_time=0.4)
        self.attendre_voix()

    # ── 04 : QUESTION 1 (1/6 + 3/4) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        a = self.barre(6, 1, 1.2)
        b = self.barre(4, 3, -0.2, couleur=VERT_C)
        self.add(a, b)

        def apres(sc):
            sc.au_mot("1 sixième égale 2 douzièmes")
            a12, an1 = a.repartager(2, run_time=0.7)
            sc.rep(0, avec=[an1])
            sc.au_mot("3 quarts égale 9 douzièmes")
            b12, an2 = b.repartager(3, run_time=0.7)
            sc.rep(1, avec=[an2])
            sc.au_mot("2 plus 9")
            sc.rep(2)
            sc.rep_fin()

        self.question_pause("04-question", "04b-reponse", ["1 sixième", "+ 3 quarts ?"],
                            [self.inline("4/10"), self.inline("11/12"), self.inline("4/12")], 1,
                            ["1/6 = 2/12", "3/4 = 9/12", "2 + 9 = 11 : 11/12"], mot_q="1 sixième", autres_r=apres)

    # ── 05 : le piège (on n'ajoute pas les dénominateurs) ──────────────────
    def ecran_piege(self):
        self.ecran("05-piege")
        self.au_mot("Attention au piège")
        tit = self.titre("Attention au piège !", ROUGE_ERREUR)
        self.au_mot("On n'ajoute jamais")
        r = self.col(self.bloc(["On n'ajoute jamais", "les dénominateurs !"], 38, ROUGE_ERREUR), 1.9)
        self.poser_lignes(r, "up", 0.3)
        faux = expression((2, 3), "+", (3, 4), "=", (5, 7, ROUGE_ERREUR), fs=62)
        self.col(faux, 0.3)
        self.montre(["2 tiers plus", "plus 3 quarts"], [faux[0], faux[1:4]])
        self.au_mot("5 septièmes")
        self.play(FadeIn(faux[4], scale=1.3), run_time=0.3)
        self.play(Create(croix(faux[3:], sw=6).set_stroke(opacity=0.9)), run_time=0.3)
        a = Barre(4, 3, largeur=4.6, hauteur=0.6, couleur=VERT_C, centre=P(-2.6, 1.5))
        s = Barre(7, 5, largeur=4.6, hauteur=0.6, couleur=ROUGE_COACH, centre=P(-2.6, -0.6))
        la = pas_audit(self.inline("3/4", 36, VERT_C).next_to(a, LEFT, buff=0.15))
        ls = pas_audit(self.inline("5/7", 36, ROUGE_ERREUR).next_to(s, LEFT, buff=0.15))
        self.au_mot("Regarde")
        self.play(FadeIn(a), FadeIn(la), FadeIn(s), FadeIn(ls), run_time=0.5)
        self.au_mot("moins que 3 quarts")
        tir = a.fin_coloriee(vers=-2.4)
        self.play(Create(tir), run_time=0.6)
        self.au_mot("Impossible")
        m = self.col(self.bloc(["En ajoutant,", "on ne peut pas avoir moins !"], 34, AMBRE), -1.3)
        bloc_fixe(m)
        self.play(FadeIn(m, shift=UP * 0.2), run_time=0.4)
        self.attendre_voix()

    # ── 06 : simplifier le résultat (7/12 + 1/6 = 9/12 = 3/4) ───────────────
    def ecran_simplifier(self):
        self.ecran("06-simplifier")
        pt = pot(2.4, 1.6).move_to(P(-5.0, 0.2))
        un = self.t("1 kg", 32).next_to(pt, UP, buff=0.15)
        self.au_mot("un pot d'1 kilo")
        self.play(FadeIn(pt, shift=UP * 0.2), FadeIn(un), run_time=0.5)
        b = Barre(12, 0, largeur=3.6, hauteur=0.5, couleur=MIEL_C, marge=0.15, centre=P(-1.9, -2.3))
        e = expression((7, 12, MIEL_C), "+", (1, 6, VERT_C), fs=50)
        self.col(e, 2.85)
        self.au_mot("7 douzièmes de kilo")
        self.play(FadeIn(e[0], scale=1.2), FadeIn(niveau(pt, 0, 7 / 12)), FadeIn(b), run_time=0.5)
        self.play(b.colorier(range(7), lag=0.04, run_time=0.5))
        self.au_nb("puis 1 sixième")
        self.play(FadeIn(e[1:], scale=1.2), FadeIn(niveau(pt, 7 / 12, 9 / 12, VERT_C)), run_time=0.5)
        self.au_nb("1 sixième égale 2 douzièmes")
        e2 = expression("=", (7, 12, MIEL_C), "+", (2, 12, VERT_C), fs=50)
        self.col(e2, 1.65)
        self.play(FadeIn(e2, scale=1.2), b.colorier([7, 8], couleur=VERT_C, run_time=0.4), run_time=0.5)
        self.au_mot("7 plus 2")
        self.calc([("7 + 2 =", WHITE), ("9", VERT_OK)], 0.65, 44)
        f, g = EcritureFraction(9, 12, fs=64), EcritureFraction(3, 4, fs=64, couleur=VERT_OK)
        eg = egalite(f, g, buff=1.0)
        self.col(eg, -1.6)
        self.au_mot("9 douzièmes")
        self.play(FadeIn(f, scale=1.3), run_time=0.35)
        self.au_mot("on simplifie")
        self.play(Indicate(f, color=AMBRE), run_time=0.5)
        haut, bas = fleches(f, g, "÷ 3", fs=32, angle=TAU / 10)
        self.au_nb("On divise par 3")
        b4, anim = b.regrouper(3, run_time=0.9)
        self.play(Create(haut[0]), FadeIn(haut[1]), Create(bas[0]), FadeIn(bas[1]), anim)
        self.au_mot("3 quarts")
        self.play(FadeIn(eg[1]), FadeIn(g, scale=1.3), run_time=0.4)
        self.play(Create(self.encadrer(g, buff=0.15)), run_time=0.3)
        self.attendre_voix()
        return pt

    # ── 07 : la chaîne 3/4 = 0,75 = 75 % ────────────────────────────────────
    def ecran_chaine(self):
        self.ecran("07-chaine")
        pt = pot(2.4, 1.6).move_to(P(-4.4, 0.2))
        self.add(pt, niveau(pt, 0, 0.75))
        f = EcritureFraction(3, 4, fs=70, couleur=VERT_OK)
        self.col(f, 2.0)
        self.au_mot("3 quarts")
        self.play(FadeIn(f, scale=1.2), run_time=0.4)
        self.au_mot("3 divisé par 4")
        self.calc([("3 ÷ 4", WHITE), ("= 0,75", BLEU_CALCUL)], 0.4, 54)
        pc = Pourcentage(75, mode="chargement", largeur=4.6, hauteur=0.55, couleur=MIEL_C, etiquette=False)
        pc.vide()
        self.col(pc, -0.9)
        self.au_mot("plein à 75 %")
        p75 = self.t("75 %", 50, MIEL_C).next_to(pc, DOWN, buff=0.25).align_to(pc, RIGHT)
        pc.plein.set_opacity(1)
        self.play(FadeIn(pc.piste), run_time=0.2)
        self.add(pc.plein)
        self.play(pc.remplir(0.4), run_time=0.4)
        self.au_nb("plein à 75 %")
        self.play(FadeIn(p75, scale=1.3), run_time=0.35)
        self.insister(p75, 1.3, 0.25)
        self.attendre_voix()

    def droite12(self, a=-1, b=1, n=24, y=0.6, longueur=4.9):
        et = {a: "−1" if a == -1 else str(a), 0: "0", b: str(b)}
        return pas_audit(Droite(a, b, n, etiquettes=et, longueur=longueur, fs=30, centre=P(XB, y)))

    # ── 08 : avec des relatifs (−5/6 + 1/4 = −7/12) ─────────────────────────
    def ecran_relatifs(self):
        self.ecran("08-relatifs")
        self.au_mot("Avec des nombres")
        tit = self.titre("Avec des relatifs")
        ru = ruche(0.7).move_to(P(-5.2, 1.85))
        dr = self.droite12(y=-0.4)
        self.au_mot("Un jour de pluie")
        gouttes = VGroup(*[Line(P(x, 0), P(x - 0.08, -0.25), stroke_color=BLEU_CALCUL, stroke_width=4)
                           .move_to(ru.get_top() + P(x, 0.25 + 0.15 * (i % 2))) for i, x in enumerate((-0.6, -0.2, 0.2, 0.6))])
        self.play(FadeIn(ru), FadeIn(gouttes, shift=DOWN * 0.3), FadeIn(dr), run_time=0.6)
        e = expression("−", (5, 6, ROUGE_ERREUR), "+", (1, 4, VERT_C), fs=54)
        self.col(e, 2.0)
        self.au_mot("perd 5 sixièmes")
        f1 = fleche_droite(dr, 0, -10 / 12, ROUGE_ERREUR)
        self.au_nb("perd 5 sixièmes")
        self.play(FadeIn(e[:2], scale=1.2), GrowArrow(f1), run_time=0.6)
        self.au_mot("elle gagne 1 quart")
        f2 = fleche_droite(dr, -10 / 12, -7 / 12, VERT_C, h=1.0)
        self.au_nb("elle gagne 1 quart")
        self.play(FadeIn(e[2:], scale=1.2), GrowArrow(f2), run_time=0.6)
        e2 = expression("=", "−", (10, 12, ROUGE_ERREUR), "+", (3, 12, VERT_C), fs=54)
        self.col(e2, 0.6)
        self.au_nb("Moins 5 sixièmes égale moins 10")
        self.play(FadeIn(e2[:3], scale=1.2), run_time=0.4)
        self.au_nb("1 quart égale 3")
        self.play(FadeIn(e2[3:], scale=1.2), run_time=0.4)
        self.au_mot("Moins 10 plus 3")
        self.calc([("−10 + 3 =", WHITE), ("−7", VERT_OK)], -0.7, 46)
        self.au_nb("moins 7 douzièmes")
        e3 = expression("=", "−", (7, 12, VERT_OK), "kg", fs=60)
        e3[3].set_color(VERT_OK)
        self.col(e3, -1.9)
        pt = VGroup(Dot(dr.p(-7 / 12), radius=0.12, color=VERT_OK))
        self.play(FadeIn(e3, scale=1.2), FadeIn(pt, scale=2), run_time=0.4)
        self.play(Create(self.encadrer(e3[1:3], buff=0.12)), run_time=0.3)
        self.attendre_voix()

    # ── 09 : QUESTION 2 (−1/2 + 1/3) ────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        dr = self.droite12(n=12, y=0.2)
        self.add(dr)

        def apres(sc):
            sc.au_mot("Moins 1 demi égale moins 3 sixièmes")
            sc.rep(0, avec=[GrowArrow(fleche_droite(dr, 0, -0.5, ROUGE_ERREUR))])
            sc.au_mot("1 tiers égale 2 sixièmes")
            sc.rep(1, avec=[GrowArrow(fleche_droite(dr, -0.5, -1 / 6, VERT_C, h=1.0))])
            sc.au_mot("Moins 3 plus 2")
            sc.rep(2, avec=[FadeIn(Dot(dr.p(-1 / 6), radius=0.12, color=VERT_OK), scale=2)])
            sc.rep_fin()

        self.question_pause("09-question", "09b-reponse", ["−1 demi", "+ 1 tiers ?"],
                            [self.inline("0"), self.inline("−1/6"), self.inline("1/6")], 1,
                            ["−1/2 = −3/6", "1/3 = 2/6", "−3 + 2 = −1 : −1/6"], mot_q="moins 1 demi",
                            autres_r=apres)

    # ── 10 : défi (3/4 − 1/3 + 1/12) ────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("10-defi", 0.65)
        self.au_mot("À toi de jouer")
        ru = ruche(1.0).move_to(P(-4.0, -0.2))
        t = self.col(self.t("À toi de jouer !", 50, JAUNE_TITRE), 3.0)
        self.play(Write(t), FadeIn(ru, shift=UP * 0.2), run_time=0.5)
        lignes = []
        for i, (sg, n, d, c) in enumerate([("+", 3, 4, VERT_C), ("−", 1, 3, ROUGE_ERREUR), ("+", 1, 12, VERT_C)]):
            l = VGroup(self.t(sg, 46, c), EcritureFraction(n, d, fs=44, couleur=c),
                       self.t("kg", 36, c)).arrange(RIGHT, buff=0.2)
            lignes.append(self.col(l, 2.15 - 1.2 * i, xl=self.XL + 0.6))
        for l, mot in zip(lignes, ["gagne 3 quarts", "perd 1 tiers", "gagne 1 douzième"]):
            self.au_nb(mot)
            self.play(FadeIn(l, scale=1.2), Indicate(ru.ecran, color=l[0].get_color()), run_time=0.4)
        self.au_mot("gagné ou perdu")
        q = self.col(self.t("Gagné ou perdu ? Combien ?", 38, ORANGE_RETENUE), -1.4)
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.35)
        self.pause_defi(y=-2.05)

    def ecran_correction(self):
        self.ecran("10b-correction", 0.65)
        tit = self.titre("Correction", fs=50)
        dr = self.droite12(a=0, b=1, n=12, y=-0.6)
        self.au_mot("tout en douzièmes")
        self.play(FadeIn(dr), run_time=0.5)
        e = expression((9, 12, VERT_C), "−", (4, 12, ROUGE_ERREUR), "+", (1, 12, VERT_C), fs=46)
        self.col(e, 2.05)
        self.au_nb("3 quarts égale 9")
        self.play(FadeIn(e[0], scale=1.2), GrowArrow(fleche_droite(dr, 0, 9 / 12, VERT_C, h=0.5)), run_time=0.5)
        self.au_nb("1 tiers égale 4")
        self.play(FadeIn(e[1:3], scale=1.2), GrowArrow(fleche_droite(dr, 9 / 12, 5 / 12, ROUGE_ERREUR, h=0.95)),
                  run_time=0.5)
        lg = self.col(self.ligne([("9 −", WHITE), ("4 +", WHITE), ("1 =", WHITE), ("6", VERT_OK)], 44), 1.05)
        for m in lg:
            m.sans_synchro = True
        self.au_nb("9 moins")
        self.play(FadeIn(lg[0], shift=RIGHT * 0.2), run_time=0.3)
        self.au_nb("9 moins 4")
        self.play(FadeIn(lg[1], shift=RIGHT * 0.2), run_time=0.3)
        self.au_nb("9 moins 4 plus 1")
        self.play(FadeIn(lg[2], shift=RIGHT * 0.2), FadeIn(e[3:], scale=1.2),
                  GrowArrow(fleche_droite(dr, 5 / 12, 6 / 12, VERT_C, h=1.4)), run_time=0.4)
        self.au_nb("égale 6")
        self.play(FadeIn(lg[3], scale=1.3), run_time=0.3)
        f, g = EcritureFraction(6, 12, fs=56), EcritureFraction(1, 2, fs=56, couleur=VERT_OK)
        eg = egalite(f, g, buff=1.0)
        self.col(eg, -0.8)
        self.au_nb("6 douzièmes")
        self.play(FadeIn(f, scale=1.3), FadeIn(Dot(dr.p(0.5), radius=0.12, color=VERT_OK), scale=2), run_time=0.4)
        haut, bas = fleches(f, g, "÷ 6", fs=30, angle=TAU / 10)
        self.au_nb("On simplifie par 6")
        self.play(Create(haut[0]), FadeIn(haut[1]), Create(bas[0]), FadeIn(bas[1]), run_time=0.6)
        self.au_mot("1 demi")
        self.play(FadeIn(eg[1]), FadeIn(g, scale=1.3), run_time=0.4)
        self.au_mot("La ruche a gagné")
        ok = self.col(self.t("Gagné : un demi-kilo !", 38, VERT_OK), -2.7)
        self.play(FadeIn(ok, scale=1.2), run_time=0.4)
        self.attendre_voix()

    # ── 11 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("11-finale", 0.65)
        fig = VGroup(expression((2, 3), "+", (3, 4), fs=44), expression("=", (8, 12), "+", (9, 12), fs=44),
                     expression("=", (17, 12), fs=44)).arrange(DOWN, aligned_edge=LEFT, buff=0.3)
        self.add(fig)
        lignes = self.finale_colonne(figure=fig, textes=[("Même dénominateur d'abord,", "puis on ajoute les numérateurs."),
                                                         ("Avec des relatifs,", "on garde les signes."),
                                                         ("On simplifie toujours", "le résultat."),
                                                         ("Jamais on n'ajoute", "les dénominateurs !")], fs=34)
        self.au_mot("On écrit les fractions")
        self.montrer_ligne(lignes[0])
        self.au_mot("Avec des relatifs")
        self.montrer_ligne(lignes[1])
        self.au_mot("On simplifie")
        self.montrer_ligne(lignes[2])
        self.au_mot("Et on n'ajoute jamais")
        self.montrer_ligne(lignes[3])
        lignes[3][1].set_color(ROUGE_ERREUR)
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        e2 = self.ecran_commun()
        self.ecran_somme(e2)
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_simplifier()
        self.ecran_chaine()
        self.ecran_relatifs()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("12-abonne")


class FracAdditionner4e(FracAdditionnerBase):
    identite = "Maths 4e — EleveAI"
    ceinture = "verte"
