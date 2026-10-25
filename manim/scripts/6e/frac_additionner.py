# frac_additionner.py
# EleveAI — Maths 6e — série « Fractions », épisode 09 : ADDITIONNER ET
# SOUSTRAIRE DES FRACTIONS (micro du coach : fraction_additionner, notion
# fraction_calcul), AVEC VOIX. Paysage 16:9 SEULEMENT (le short existe déjà :
# 6e-fraction-calcul-short-additionner, 1/2 + 1/3 et 2/3 + 1/6 : exemples NON
# repris ici). CEINTURE VERTE : la paysage complète du niveau.
# ⭐ Le BO (2025) : même dénominateur, dénominateurs multiples l'un de l'autre,
# « dénominateurs quelconques dans des cas simples » (1/3 + 1/4, défi 2/3 +
# 1/4). Rappel de SA première erreur : on SIMPLIFIE le résultat (4/8 = 1/2).
#
# Décor et métier : SCIENCES ; Chloé, CHIMISTE : elle verse 1/8 L d'eau puis
# 3/8 L d'alcool dans un flacon ; puis 5/6 L − 1/3 L ; défi : 2/3 L + 1/4 L
# tient-il dans un flacon d'1 litre ? (11/12 L, oui). Aucune donnée réelle.
# Centres d'intérêt : sciences.
#
# Micro → écrans (banque fractions-calcul.bank.ts) : même dénominateur (02),
# simplifier le résultat (03), dénominateurs multiples (04, question 1 : 3/10 +
# 1/5), cas simple quelconque (06), le piège « on ajoute les bas » (07),
# soustraire (08), question 2 (2/5 + 2/5, leurre 4/10), défi (10).
# Écrans : 00 garde · 01 Chloé et le flacon · 02 même taille · 03 simplifier ·
# 04 1/2 + 1/4 · 05 QUESTION 1 · 06 1/3 + 1/4 · 07 le piège · 08 soustraire ·
# 09 QUESTION 2 · 10 défi · 10b correction · 11 ce que tu as appris · 12 fin.
#
# Voix : manim/voix/6e-frac-additionner.json (débit −10), WAV dans
# public/sons/6e-frac-additionner/ ; marques : manim/scripts/6e/frac_additionner_marques.json.
# Outils : frac_commun.py + frac_lotc_commun.py (expression(), personne()).
# python -m manim render -qh --disable_caching manim/scripts/6e/frac_additionner.py FracAdditionner6e -o eleveai-maths-6e-frac-additionner --media_dir manim/scripts/6e/media-frac-additionner
# Sortie : manim/sorties/6e/maths/fractions/09-additionner/eleveai-maths-6e-frac-additionner.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from frac_lotc_commun import *  # noqa: E402,F403

EAU = BLEU_PART
ALCOOL = VERT_PART
XB = -3.3      # le centre des barres (zone de gauche)
LB = 5.6       # leur largeur


def chimiste(s=1.0):
    """Chloé : blouse blanche, lunettes de protection, cheveux longs."""
    p = personne(peau="#e0ac69", tenue="#0f766e", cheveux="#1f2937", longs=True, s=s)
    p.add(blouse(p), lunettes(p, "#0ea5e9"))
    return p


def flacon(h=2.6, w=1.4):
    """Un flacon de labo (contour) ; .bas : le fond intérieur ; .w, .h."""
    corps = RoundedRectangle(width=w, height=h * 0.75, corner_radius=0.18, stroke_color="#cbd5e1", stroke_width=5)
    col = Rectangle(width=w * 0.38, height=h * 0.25, stroke_color="#cbd5e1", stroke_width=5)
    col.next_to(corps, UP, buff=-0.02)
    g = VGroup(corps, col)
    g.corps, g.w, g.h = corps, w, h
    return g


def couche(fl, de, a, couleur):
    """La couche de liquide entre les fractions de et a du corps du flacon."""
    c = fl.corps
    H = c.height - 0.12
    r = Rectangle(width=c.width - 0.14, height=max(0.001, H * (a - de)), fill_color=couleur, fill_opacity=0.9,
                  stroke_width=0)
    r.move_to(P(c.get_x(), c.get_bottom()[1] + 0.06 + H * (a + de) / 2))
    return r


class FracAdditionnerBase(PaysageLotC):
    nom_voix = "6e-frac-additionner"
    fichier_marques = "frac_additionner_marques.json"

    def barre(self, n, k=0, y=0.0, couleur=EAU, **kw):
        return Barre(n, k, largeur=LB, hauteur=0.65, couleur=couleur, marge=0.2, centre=P(XB, y), **kw)

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Additionner des fractions", self.identite, self.ceinture)
        self.au_mot("Additionner")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        ex = expression((1, 8), "+", (3, 8), "=", "?", fs=80).move_to(P(-0.6, 0.2))
        ex[4].set_color(AMBRE)
        self.frac(ex[0], "1 huitième")
        self.au_mot("plus 3 huitièmes")
        self.play(FadeIn(ex[1]), FadeIn(ex[2], scale=1.3), run_time=0.4)
        self.au_mot("combien")
        self.play(FadeIn(ex[3:], scale=0.5), run_time=0.4)
        self.insister(ex[4], 1.4, 0.25)
        self.attendre_voix(marge=0.8)

    # ── 01 : Chloé et le flacon ─────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pers = chimiste(1.1).move_to(P(-5.5, -0.5))
        self.au_mot("Voici Chloé")
        nom = self.t("Chloé", 40, BLEU_CALCUL).next_to(pers, UP, buff=0.3)
        self.play(FadeIn(pers, shift=UP * 0.3), FadeIn(nom), run_time=0.6)
        self.au_mot("chimiste")
        metier = self.t("chimiste", 34, BLEU_CALCUL).next_to(pers, DOWN, buff=0.2)
        fl = flacon(3.2, 1.6).move_to(P(-2.4, -0.1))
        self.play(FadeIn(metier, shift=UP * 0.2), FadeIn(fl, shift=UP * 0.2), run_time=0.5)
        l1 = VGroup(self.t("eau :", 40, EAU), EcritureFraction(1, 8, fs=54, couleur=EAU), self.t("L", 40, EAU))
        l2 = VGroup(self.t("alcool :", 40, ALCOOL), EcritureFraction(3, 8, fs=54, couleur=ALCOOL),
                    self.t("L", 40, ALCOOL))
        for l in (l1, l2):
            l.arrange(RIGHT, buff=0.22)
        self.col(l1, 1.7)
        self.col(l2, 0.4)
        self.au_mot("1 huitième de litre")
        self.play(FadeIn(l1[1:], scale=1.2), FadeIn(couche(fl, 0, 1 / 8, EAU)), run_time=0.5)
        self.au_mot("d'eau")
        self.play(FadeIn(l1[0], shift=RIGHT * 0.15), run_time=0.3)
        self.au_mot("3 huitièmes de litre")
        self.play(FadeIn(l2[1:], scale=1.2), FadeIn(couche(fl, 1 / 8, 4 / 8, ALCOOL)), run_time=0.5)
        self.au_mot("d'alcool")
        self.play(FadeIn(l2[0], shift=RIGHT * 0.15), run_time=0.3)
        self.au_mot("Combien de liquide")
        q = self.col(self.t("En tout : ? L", 44, ORANGE_RETENUE), -1.0)
        self.play(FadeIn(q, shift=UP * 0.2), run_time=0.4)
        self.attendre_voix()

    def barre2(self, n, a, b, y):
        """Une barre de n parts : a parts d'eau (bleu), puis b parts d'alcool (vert)."""
        br = self.barre(n, a + b, y)
        for i in range(a, a + b):
            br.parts[i].set_fill(ALCOOL, 1)
        return br

    # ── 02 : des parts de même taille ───────────────────────────────────────
    def ecran_meme(self):
        self.ecran("02-meme")
        b = self.barre(8, 0, 1.9)
        ex = expression((1, 8, EAU), "+", (3, 8, ALCOOL), "=", (4, 8), fs=76).move_to(P(XB, -0.4))
        self.au_mot("même taille")
        self.play(b.apparaitre(0.7), run_time=0.7)
        self.au_mot("des huitièmes")
        self.play(LaggedStart(*[Indicate(p, color=AMBRE, scale_factor=1.12) for p in b.parts], lag_ratio=0.08),
                  run_time=0.8)
        self.au_mot("On les compte")
        self.play(b.colorier([0], couleur=EAU), FadeIn(ex[0], scale=1.2), run_time=0.4)
        self.play(b.colorier([1, 2, 3], couleur=ALCOOL), FadeIn(ex[1]), FadeIn(ex[2], scale=1.2), run_time=0.6)
        self.au_mot("1 plus 3")
        self.calc([("1 + 3 =", WHITE), ("4", VERT_OK)], 2.2, 50)
        self.au_mot("4 huitièmes de litre")
        self.play(FadeIn(ex[3]), FadeIn(ex[4], scale=1.3), run_time=0.4)
        self.au_mot("On ajoute les numérateurs")
        r1 = self.col(self.bloc(["On ajoute", "les numérateurs."], 40, VERT_OK), 0.7)
        self.play(FadeIn(r1, shift=RIGHT * 0.2), Indicate(VGroup(ex[0].num, ex[2].num, ex[4].num), color=AMBRE),
                  run_time=0.6)
        self.au_mot("Le dénominateur")
        r2 = self.col(self.bloc(["Le dénominateur", "ne change pas."], 40, AMBRE), -0.9)
        self.play(FadeIn(r2, shift=RIGHT * 0.2), Indicate(VGroup(ex[0].den, ex[2].den, ex[4].den), color=AMBRE),
                  run_time=0.6)
        self.attendre_voix()
        return b

    # ── 03 : simplifier le résultat ─────────────────────────────────────────
    def ecran_simplifier(self, b):
        self.ecran("03-simplifier")
        self.add(b)
        f, g = EcritureFraction(4, 8, fs=90), EcritureFraction(1, 2, fs=90)
        eg = egalite(f, g, buff=1.1).move_to(P(XB, -0.9))
        haut, bas = fleches(f, g, "÷ 4", fs=40, angle=TAU / 7)
        self.frac(f, "Et 4 huitièmes")
        self.au_mot("se simplifie")
        tit = self.col(self.t("On simplifie !", 46, JAUNE_TITRE), 2.2)
        self.play(Write(tit), run_time=0.5)
        self.au_mot("On divise par 4")
        b2, anim = b.regrouper(4, run_time=1.0)
        self.play(Create(haut[0]), FadeIn(haut[1]), Create(bas[0]), FadeIn(bas[1]), anim)
        self.au_mot("1 demi")
        self.play(FadeIn(eg[1]), FadeIn(g, scale=1.3), run_time=0.4)
        self.au_mot("un demi-litre")
        r = self.col(self.t("un demi-litre", 50, VERT_OK), 0.6)
        self.play(FadeIn(r, scale=1.3), run_time=0.4)
        self.play(Create(self.encadrer(r)), run_time=0.3)
        self.attendre_voix()

    # ── 04 : 1/2 + 1/4 (un dénominateur multiple de l'autre) ───────────────
    def ecran_multiple(self):
        self.ecran("04-multiple")
        a = self.barre(2, 1, 2.3)
        b = self.barre(4, 0, 0.9, couleur=ALCOOL)
        b.colorier([0], couleur=ALCOOL)
        b.parts[0].set_fill(ALCOOL, 1)
        e1 = expression((1, 2, EAU), "+", (1, 4, ALCOOL), fs=54)
        self.col(e1, 2.5)
        self.au_mot("les parts sont différentes")
        self.play(FadeIn(a), FadeIn(b), run_time=0.5)
        self.play(Indicate(a.parts[0], color=AMBRE), Indicate(b.parts[0], color=AMBRE), run_time=0.6)
        self.au_mot("1 demi plus 1 quart")
        self.play(FadeIn(e1[0], scale=1.2), run_time=0.3)
        self.play(FadeIn(e1[1:], scale=1.2), run_time=0.3)
        self.au_mot("4 est dans la table de 2")
        t = self.col(self.t("4 = 2 × 2", 40, AMBRE), 1.38)
        self.play(FadeIn(t, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("1 demi égale 2 quarts")
        a4, anim = a.repartager(2, run_time=0.8)
        e2 = expression("=", (2, 4, EAU), "+", (1, 4, ALCOOL), fs=54)
        self.col(e2, 0.1)
        self.play(anim, FadeIn(e2[:2], scale=1.2))
        self.au_mot("2 quarts plus 1 quart")
        self.play(FadeIn(e2[2:], scale=1.2), run_time=0.4)
        c = self.barre2(4, 2, 1, -0.6)
        self.au_mot("égale 3 quarts")
        e3 = expression("=", (3, 4), fs=54)
        self.col(e3, -1.5)
        self.play(FadeIn(c, shift=DOWN * 0.2), FadeIn(e3, scale=1.2), run_time=0.5)
        self.play(Create(self.encadrer(e3[1])), run_time=0.3)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (3/10 + 1/5) ────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        a = self.barre(10, 3, 1.2)
        b = self.barre(5, 1, -0.3, couleur=ALCOOL)
        self.add(a, b)

        def apres(sc):
            sc.au_mot("1 cinquième égale 2 dixièmes")
            b10, anim = b.repartager(2, run_time=0.8)
            sc.rep(0, avec=[anim])
            sc.au_mot("3 dixièmes plus 2 dixièmes")
            c = sc.barre2(10, 3, 2, -1.8)
            sc.rep(1, avec=[FadeIn(c, shift=DOWN * 0.2)])
            sc.rep_fin()

        self.question_pause("05-question", "05b-reponse", ["3 dixièmes", "+ 1 cinquième ?"],
                            [self.inline("4/15"), self.inline("5/10"), self.inline("4/10")], 1,
                            ["1/5 = 2/10", "3/10 + 2/10 = 5/10"], mot_q="3 dixièmes", autres_r=apres)

    # ── 06 : 1/3 + 1/4 (cas simple quelconque) ──────────────────────────────
    def ecran_quelconque(self):
        self.ecran("06-quelconque")
        a = self.barre(3, 1, 2.3)
        b = self.barre(4, 1, 0.9, couleur=ALCOOL)
        e1 = expression((1, 3, EAU), "+", (1, 4, ALCOOL), fs=54)
        self.col(e1, 2.5)
        self.au_mot("Et 1 tiers plus 1 quart")
        self.play(FadeIn(a), FadeIn(e1[0], scale=1.2), run_time=0.4)
        self.play(FadeIn(b), FadeIn(e1[1:], scale=1.2), run_time=0.4)
        self.au_mot("dans la table de 3")
        t = self.col(self.ligne([("table de 3", WHITE), ("et de 4 :", WHITE), ("12", AMBRE)], 38), 1.38)
        self.poser_lignes(t, "fade", 0.3)
        self.au_mot("1 tiers égale 4 douzièmes")
        a12, an1 = a.repartager(4, run_time=0.8)
        e2 = expression("=", (4, 12, EAU), "+", (3, 12, ALCOOL), fs=54)
        self.col(e2, 0.1)
        self.play(an1, FadeIn(e2[:2], scale=1.2))
        self.au_mot("1 quart égale 3 douzièmes")
        b12, an2 = b.repartager(3, run_time=0.8)
        self.play(an2, FadeIn(e2[2:], scale=1.2))
        self.au_mot("égale 7 douzièmes")
        c = self.barre2(12, 4, 3, -0.6)
        e3 = expression("=", (7, 12), fs=54)
        self.col(e3, -1.5)
        self.play(FadeIn(c, shift=DOWN * 0.2), FadeIn(e3, scale=1.2), run_time=0.5)
        self.play(Create(self.encadrer(e3[1])), run_time=0.3)
        self.attendre_voix()

    # ── 07 : le piège (on n'ajoute pas les dénominateurs) ──────────────────
    def ecran_piege(self):
        self.ecran("07-piege")
        tit = self.col(self.t("Attention au piège !", 46, ROUGE_ERREUR), 3.0)
        self.au_mot("Attention au piège")
        self.play(Write(tit), run_time=0.5)
        self.au_mot("On n'ajoute jamais")
        r = self.col(self.bloc(["On n'ajoute jamais", "les dénominateurs !"], 38, ROUGE_ERREUR), 1.9)
        self.poser_lignes(r, "up", 0.3)
        faux = expression((1, 3), "+", (1, 4), "=", (2, 7, ROUGE_ERREUR), fs=62)
        self.col(faux, 0.3)
        self.au_mot("1 tiers plus 1 quart, ce n'est pas")
        self.play(FadeIn(faux[:4], scale=1.2), run_time=0.4)
        self.au_mot("2 septièmes")
        self.play(FadeIn(faux[4], scale=1.3), run_time=0.3)
        self.play(Create(croix(faux[3:], sw=6).set_stroke(opacity=0.9)), run_time=0.3)
        a = Barre(3, 1, largeur=4.4, hauteur=0.6, couleur=EAU, centre=P(-2.7, 1.5))
        s = Barre(7, 2, largeur=4.4, hauteur=0.6, couleur=ROUGE_COACH, centre=P(-2.7, -0.6))
        la = self.inline("1/3", 36, EAU).next_to(a, LEFT, buff=0.12)
        ls = self.inline("2/7", 36, ROUGE_ERREUR).next_to(s, LEFT, buff=0.12)
        self.au_mot("Regarde")
        self.play(FadeIn(a), FadeIn(la), FadeIn(s), FadeIn(ls), run_time=0.5)
        self.au_mot("moins qu'1 tiers")
        tir = a.fin_coloriee(vers=-2.4)
        self.play(Create(tir), run_time=0.6)
        self.au_mot("Impossible")
        m = self.col(self.bloc(["En ajoutant,", "on ne peut pas avoir moins !"], 34, AMBRE), -1.3)
        self.poser_lignes(m, "up", 0.3)
        self.attendre_voix()

    # ── 08 : soustraire (5/6 − 1/3) ─────────────────────────────────────────
    def ecran_soustraire(self):
        self.ecran("08-soustraire")
        self.au_mot("Pour soustraire")
        tit = self.col(self.t("Soustraire", 46, JAUNE_TITRE), 3.0)
        self.play(Write(tit), run_time=0.5)
        a = self.barre(6, 5, 1.6)
        e = expression((5, 6), "−", (1, 3), fs=54)
        self.col(e, 1.6)
        self.au_mot("5 sixièmes de litre")
        self.play(a.apparaitre(0.6), FadeIn(e[0], scale=1.2), run_time=0.6)
        self.au_mot("1 tiers")
        self.play(FadeIn(e[1:], scale=1.2), run_time=0.4)
        self.au_mot("1 tiers égale 2 sixièmes")
        e2 = expression("=", (5, 6), "−", (2, 6), fs=54)
        self.col(e2, 0.1)
        grp = SurroundingRectangle(VGroup(a.parts[3], a.parts[4]), color=ROUGE_ERREUR, buff=0.05, stroke_width=6)
        self.play(FadeIn(e2, scale=1.2), Create(grp), run_time=0.5)
        self.au_mot("égale 3 sixièmes")
        e3 = expression("=", (3, 6), fs=54)
        self.col(e3, -1.4)
        self.play(a.vider([3, 4]), FadeOut(grp), FadeIn(e3, scale=1.2), run_time=0.6)
        self.au_mot("un demi-litre")
        tir = a.fin_coloriee(vers=-0.9)
        r = self.t("= un demi-litre", 38, VERT_OK).next_to(e3, DOWN, buff=0.25).align_to(e3, LEFT)
        self.play(Create(tir), FadeIn(r, shift=RIGHT * 0.2), run_time=0.5)
        self.attendre_voix()

    # ── 09 : QUESTION 2 (2/5 + 2/5) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        b = self.barre(5, 0, 0.5)
        self.add(b)

        def apres(sc):
            sc.au_mot("2 plus 2")
            sc.rep(0, avec=[b.colorier([0, 1], couleur=EAU, run_time=0.4)])
            sc.play(b.colorier([2, 3], couleur=ALCOOL, run_time=0.4))
            sc.au_mot("Le dénominateur")
            sc.rep(1, 2)
            sc.rep_fin()

        self.question_pause("09-question", "09b-reponse", ["2 cinquièmes", "+ 2 cinquièmes ?"],
                            [self.inline("4/10"), self.inline("4/5"), self.inline("2/5")], 1,
                            ["2 + 2 = 4 : 4/5", "Le dénominateur", "ne change pas."], mot_q="2 cinquièmes",
                            autres_r=apres)

    # ── 10 : défi (2/3 L + 1/4 L dans un flacon d'1 L ?) ────────────────────
    def ecran_defi(self):
        self.ecran("10-defi", 0.65)
        fl = flacon(3.0, 1.5).move_to(P(-4.8, 0.0))
        self.au_mot("À toi de jouer")
        tit = self.col(self.t("À toi de jouer !", 50, JAUNE_TITRE), 3.0)
        self.play(Write(tit), run_time=0.6)
        l1 = VGroup(EcritureFraction(2, 3, fs=56, couleur=EAU), self.t("L", 40, EAU), self.t("+", 44),
                    EcritureFraction(1, 4, fs=56, couleur=ALCOOL), self.t("L", 40, ALCOOL)).arrange(RIGHT, buff=0.2)
        self.col(l1, 1.8)
        self.au_mot("2 tiers de litre")
        self.play(FadeIn(l1[:2], scale=1.2), FadeIn(fl), FadeIn(couche(fl, 0, 2 / 3, EAU)), run_time=0.5)
        self.au_mot("1 quart de litre")
        self.play(FadeIn(l1[2:], scale=1.2), run_time=0.4)
        self.au_mot("Combien de litres")
        l2 = self.col(self.t("Combien de litres ?", 40, ORANGE_RETENUE), 0.6)
        self.play(FadeIn(l2, shift=UP * 0.15), run_time=0.3)
        un = self.t("1 L", 36, WHITE).next_to(fl.corps, RIGHT, buff=0.2).align_to(fl.corps, UP)
        self.au_mot("ça tient")
        l3 = self.col(self.t("Ça tient dans 1 L ?", 40, ORANGE_RETENUE), -0.3)
        self.play(FadeIn(l3, shift=UP * 0.15), FadeIn(un), run_time=0.3)
        self.pause_defi(y=-1.5)

    def ecran_correction(self):
        self.ecran("10b-correction", 0.65)
        tit = self.col(self.t("Correction", 50, JAUNE_TITRE), 3.0)
        self.play(Write(tit), run_time=0.5)
        a = Barre(3, 2, largeur=5.4, hauteur=0.55, couleur=EAU, marge=0.18, centre=P(-3.4, 2.1))
        b = Barre(4, 1, largeur=5.4, hauteur=0.55, couleur=ALCOOL, marge=0.18, centre=P(-3.4, 0.9))
        self.add(a, b)
        self.au_mot("tout en douzièmes")
        self.play(Indicate(VGroup(a, b), color=AMBRE, scale_factor=1.03), run_time=0.5)
        self.au_mot("2 tiers égale 8 douzièmes")
        a12, an1 = a.repartager(4, run_time=0.7)
        e1 = expression((2, 3, EAU), "=", (8, 12, EAU), fs=42)
        self.col(e1, 2.05)
        self.play(an1, FadeIn(e1, scale=1.2))
        self.au_mot("1 quart égale 3 douzièmes")
        b12, an2 = b.repartager(3, run_time=0.7)
        e2 = expression((1, 4, ALCOOL), "=", (3, 12, ALCOOL), fs=42)
        self.col(e2, 0.85)
        self.play(an2, FadeIn(e2, scale=1.2))
        self.au_mot("8 plus 3")
        c = Barre(12, 11, largeur=5.4, hauteur=0.55, couleur=EAU, marge=0.18, centre=P(-3.4, -0.4))
        for i in range(8, 11):
            c.parts[i].set_fill(ALCOOL, 1)
        self.calc([("8 + 3 =", WHITE), ("11", VERT_OK)], -0.3, 44, avec=[FadeIn(c, shift=DOWN * 0.15)])
        self.au_mot("11 douzièmes de litre")
        e3 = expression((11, 12), "L", fs=60)
        e3[1].set_color(VERT_OK)
        self.col(e3, -1.45)
        self.play(FadeIn(e3, scale=1.3), run_time=0.4)
        self.au_mot("moins que 12 douzièmes")
        vide = SurroundingRectangle(c.parts[11], color=AMBRE, buff=0.04, stroke_width=6)
        reste = self.t("il reste 1 part vide", 30, AMBRE).next_to(c, DOWN, buff=0.15)
        self.play(Create(vide), FadeIn(reste), run_time=0.5)
        self.au_mot("ça tient")
        ok = self.t("Ça tient !", 50, VERT_OK).move_to(P(-3.4, -2.4))
        self.play(FadeIn(ok, scale=1.3), run_time=0.4)
        self.attendre_voix()

    # ── 11 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("11-finale", 0.65)
        c = Barre(12, 7, largeur=4.4, hauteur=0.55, couleur=EAU)
        for i in range(4, 7):
            c.parts[i].set_fill(ALCOOL, 1)
        lab = expression((1, 3, EAU), "+", (1, 4, ALCOOL), "=", (7, 12), fs=42).next_to(c, DOWN, buff=0.3)
        fig = VGroup(c, lab)
        self.add(fig)
        lignes = self.finale_colonne(figure=fig, textes=[("Même taille de parts :", "on ajoute les numérateurs."),
                                                         ("Sinon : d'abord", "le même dénominateur."),
                                                         ("On simplifie le résultat.",),
                                                         ("Jamais on n'ajoute", "les dénominateurs !")], fs=36)
        self.au_mot("Avec des parts de même taille")
        self.montrer_ligne(lignes[0])
        self.au_mot("Sinon")
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
        b = self.ecran_meme()
        self.ecran_simplifier(b)
        self.ecran_multiple()
        self.ecran_question1()
        self.ecran_quelconque()
        self.ecran_piege()
        self.ecran_soustraire()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("12-abonne")


class FracAdditionner6e(FracAdditionnerBase):
    identite = "Maths 6e — EleveAI"
    ceinture = "verte"
