# frac_additionner.py
# EleveAI — Maths 5e — série « Fractions », épisode 07 : ADDITIONNER DES
# FRACTIONS (micro du coach : fraction_additionner, « additionner ou soustraire
# des fractions simples », notion fraction_calcul), AVEC VOIX. Paysage 16:9,
# CEINTURE VERTE : la paysage complète du niveau 5e (dénominateurs égaux ou
# multiples l'un de l'autre, piège, SIMPLIFIER le résultat, soustraire, défi).
# Short jumeau : frac_additionner_short.py (le tangram, jaune).
#
# Décor et métier : la MUSIQUE ; Maya, BATTEUSE, écrit le rythme d'une chanson.
# Une mesure (4 temps) = 1 ronde ; blanche = 1/2, noire = 1/4, croche = 1/8
# (valeurs des notes : solfège, fait stable, aucune donnée chiffrée du monde
# réel). Blanche + noire = 1/2 + 1/4 = 3/4 ; 3/8 + 1/8 = 4/8 = 1/2 = 0,5 = 50 %
# (SA première erreur : SIMPLIFIER, puis la chaîne décimal → pourcentage) ;
# 1 − 5/8 = 3/8 ; défi : 1/2 + 1/8 + 1/8 = 6/8 = 3/4. Centres : musique.
# Vérifié (Python, fractions.Fraction) : 1/2 + 1/4 = 3/4 ; 1/4 + 1/8 = 3/8 ;
# 3/8 + 1/8 = 1/2 ; 5/8 + 1/8 = 3/4 ; 1 − 5/8 = 3/8 ; 1/2 + 2 × 1/8 = 3/4.
#
# Micro → écrans (banque 5e/maths/fractions.bank.ts, genAddition) : ★2 même
# dénominateur (06, question 2), ★3 dénominateur multiple de l'autre (02, 03,
# question 1 = 1/4 + 1/8, leurres « n1+n2 / d1+d2 » et « numérateurs non
# convertis »), soustraction et « entier − fraction » (09), ★4 trois termes
# (défi 10), attenduFraction « simplifie » (06, 08, 10b).
# Écrans : 00 garde · 01 Maya et les notes · 02 même dénominateur · 03 la
# somme · 04 QUESTION 1 · 05 le piège · 06 simplifier · 07 0,5 = 50 % ·
# 08 QUESTION 2 · 09 soustraire · 10 défi · 10b correction · 11 ce que tu as
# appris · 12 fin.
#
# ⭐ Bases : 5e/frac_loth_commun.py (PaysageH = PaysageE du lot E de 4e + audit) ;
# figures canvas_fractions.py (non modifié).
# Voix : manim/voix/5e-frac-additionner.json (débit −10), WAV dans
# public/sons/5e-frac-additionner/ ; marques : 5e/frac_additionner_marques.json.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/5e/frac_additionner.py FracAdditionner5e
# python -m manim render -qh --disable_caching manim/scripts/5e/frac_additionner.py FracAdditionner5e -o eleveai-maths-5e-frac-additionner --media_dir manim/scripts/5e/media-frac-additionner
# Sortie : manim/sorties/5e/maths/fractions/07-additionner/eleveai-maths-5e-frac-additionner.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from frac_loth_commun import *  # noqa: E402,F403

C_BL = BLEU_PART       # la blanche (1 demi)
C_NO = VERT_PART       # la noire (1 quart)
C_CR = ORANGE_PART     # la croche (1 huitième)
XB, LB = -3.3, 5.6     # le centre des barres, leur largeur


def note(sorte="noire", s=1.0, couleur=WHITE):
    """Une note dessinée : ronde (vide), blanche (vide + hampe), noire (pleine +
    hampe), croche (pleine + hampe + crochet)."""
    pleine = sorte in ("noire", "croche")
    tete = Ellipse(width=0.42, height=0.3, stroke_color=couleur, stroke_width=5,
                   fill_color=couleur, fill_opacity=1 if pleine else 0).rotate(0.35)
    g = VGroup(tete)
    if sorte != "ronde":
        x = tete.get_right()[0] - 0.03
        hampe = Line(P(x, tete.get_y()), P(x, tete.get_y() + 1.0), color=couleur, stroke_width=5)
        g.add(hampe)
        if sorte == "croche":
            haut = hampe.get_end()
            g.add(CubicBezier(haut, haut + P(0.05, -0.2), haut + P(0.35, -0.25), haut + P(0.25, -0.6),
                              stroke_color=couleur, stroke_width=5))
    return g.scale(s)


def batteuse(s=1.0):
    """Maya : t-shirt violet, deux baguettes."""
    p = personne(peau="#8d5524", tenue="#7c3aed", cheveux="#111827", longs=True, s=s)
    c = p.corps.get_center()
    bag = VGroup(*[Line(c + P(x, 0.1), c + P(x * 2.2, 0.9), color="#fde68a", stroke_width=6) for x in (-0.35, 0.35)])
    p.add(bag)
    return p


def batterie(s=1.0):
    """Une caisse claire et une cymbale."""
    caisse = VGroup(Rectangle(width=1.4, height=0.6, fill_color="#dc2626", fill_opacity=1, stroke_width=0),
                    Ellipse(width=1.4, height=0.35, fill_color="#e5e7eb", fill_opacity=1, stroke_width=0))
    caisse[1].move_to(caisse[0].get_top())
    pied = Line(P(0, -0.3), P(0, -1.1), color="#94a3b8", stroke_width=5)
    cymb = VGroup(Line(P(1.2, -1.1), P(1.2, 0.9), color="#94a3b8", stroke_width=4),
                  Ellipse(width=1.2, height=0.18, fill_color="#facc15", fill_opacity=1, stroke_width=0).move_to(P(1.2, 0.95)))
    return VGroup(pied, caisse, cymb).scale(s)


class FracAdditionnerBase(PaysageH):
    nom_voix = "5e-frac-additionner"
    fichier_marques = "frac_additionner_marques.json"

    def barre(self, n, k=0, y=0.0, couleur=C_BL, largeur=LB, **kw):
        return Barre(n, k, largeur=largeur, hauteur=0.6, couleur=couleur, marge=0.2, centre=P(XB, y), **kw)

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Additionner des fractions", self.identite, self.ceinture, y_ech=-2.7)
        self.au_mot("Additionner")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        ex = expression((1, 2), "+", (1, 4), "=", "?", fs=80).move_to(P(-0.6, 0.2))
        ex[4].set_color(AMBRE)
        self.montre(["1 demi", "plus 1 quart"], [ex[0], ex[1:3]])
        self.au_mot("combien")
        self.play(FadeIn(ex[3:], scale=0.5), run_time=0.4)
        self.insister(ex[4], 1.4, 0.25)
        self.attendre_voix(marge=0.8)

    # ── 01 : Maya et les notes ──────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        self.personnage(batteuse(1.0), "Maya", ["batteuse"], x=-5.3, y=-0.3)
        bt = batterie(0.9).move_to(P(-2.6, -0.9))
        self.au_mot("le rythme")
        self.play(FadeIn(bt, shift=UP * 0.2), run_time=0.5)
        rangs = []
        for i, (sorte, v, c) in enumerate([("ronde", None, WHITE), ("blanche", (1, 2), C_BL),
                                           ("noire", (1, 4), C_NO), ("croche", (1, 8), C_CR)]):
            n = note(sorte, 0.7, c)
            nom = self.t(sorte, 34, c)
            val = self.t("= 1", 40) if v is None else VGroup(self.t("=", 40), EcritureFraction(*v, fs=44, couleur=c))
            if v is not None:
                val.arrange(RIGHT, buff=0.2)
            r = VGroup(n, nom, val).arrange(RIGHT, buff=0.3)
            rangs.append(self.col(r, 2.6 - 1.05 * i))
        self.au_mot("1 ronde")
        self.play(FadeIn(rangs[0][:2], shift=RIGHT * 0.15), run_time=0.3)
        self.au_nb("1 ronde")
        self.play(FadeIn(rangs[0][2], scale=1.2), run_time=0.3)
        for r, mot, val in zip(rangs[1:], ["Une blanche", "une noire", "une croche"],
                               ["vaut 1 demi", "noire 1 quart", "croche 1 huitième"]):
            self.au_mot(mot)
            self.play(FadeIn(r[:2], shift=RIGHT * 0.15), run_time=0.3)
            self.au_nb(val)
            self.play(FadeIn(r[2], scale=1.2), run_time=0.3)
        self.au_mot("Maya joue une blanche")
        self.play(Indicate(rangs[1], color=AMBRE), Indicate(bt[1], color=AMBRE), run_time=0.5)
        self.au_mot("puis une noire")
        self.play(Indicate(rangs[2], color=AMBRE), Indicate(bt[1], color=AMBRE), run_time=0.5)
        self.au_mot("Quelle part")
        q = self.col(self.t("Mesure remplie : ?", 40, ORANGE_RETENUE), -1.75)
        self.play(FadeIn(q, shift=UP * 0.2), run_time=0.4)
        self.attendre_voix()

    # ── 02 : le même dénominateur (1/2 = 2/4) ───────────────────────────────
    def ecran_commun(self):
        self.ecran("02-commun")
        a = self.barre(2, 1, 1.4)
        b = self.barre(4, 1, -0.1, couleur=C_NO)
        e1 = expression((1, 2, C_BL), "+", (1, 4, C_NO), fs=56)
        self.col(e1, 2.4)
        self.montre(["1 demi plus", "plus 1 quart"], [e1[0], e1[1:]], avec=[a.apparaitre(0.5)])
        self.play(b.apparaitre(0.5), run_time=0.5)
        self.au_mot("pas la même taille")
        self.play(Indicate(a.parts[0], color=AMBRE), Indicate(b.parts[0], color=AMBRE), run_time=0.6)
        lg = self.col(self.ligne([("4", AMBRE), ("est un multiple de 2", WHITE)], 36), 1.25)
        sans_synchro(lg)
        self.montre(["4 est", "multiple de 2"], lg, anim="fade", run_time=0.3)
        self.au_mot("tout en quarts")
        t = self.col(self.t("→ tout en quarts", 36, AMBRE), 0.55)
        self.play(FadeIn(t, shift=RIGHT * 0.15), run_time=0.3)
        f, g = EcritureFraction(1, 2, fs=60, couleur=C_BL), EcritureFraction(2, 4, fs=60, couleur=C_BL)
        eg = egalite(f, g, buff=1.0)
        self.col(eg, -1.45)
        self.au_mot("1 demi égale")
        self.play(FadeIn(f, scale=1.3), run_time=0.3)
        self.au_nb("égale 2 quarts")
        a4, an = a.repartager(2, run_time=0.8)
        self.play(an, FadeIn(eg[1]), FadeIn(g, scale=1.3))
        haut, bas = fleches(f, g, "× 2", fs=30, angle=TAU / 10)
        self.au_nb("on multiplie par 2")
        self.play(Create(haut[0]), FadeIn(haut[1]), Create(bas[0]), FadeIn(bas[1]), run_time=0.5)
        self.attendre_voix()
        return a4, b

    # ── 03 : la somme (3/4 de la mesure) ────────────────────────────────────
    def ecran_somme(self):
        self.ecran("03-somme")
        e = expression((2, 4, C_BL), "+", (1, 4, C_NO), fs=56)
        self.col(e, 2.4)
        self.add(e)
        m = self.barre(4, 0, 0.0)
        notes = VGroup(note("blanche", 0.6, C_BL).move_to(P(XB - LB / 4, 1.25)),
                       note("noire", 0.6, C_NO).move_to(P(XB + LB / 8, 1.25)))
        self.au_mot("même taille")
        self.play(FadeIn(m), FadeIn(notes), run_time=0.5)
        anims = [m.colorier([0, 1], couleur=C_BL, lag=0.1, run_time=0.4), m.colorier([2], couleur=C_NO, run_time=0.3)]
        self.calc([("2 + 1 =", WHITE), ("3", VERT_OK)], 1.1, 50, avec=[Succession(*anims)])
        self.au_mot("3 quarts de la mesure")
        e3 = expression("=", (3, 4), fs=62)
        e3[1].set_color(VERT_OK)
        self.col(e3, -0.2)
        self.play(FadeIn(e3, scale=1.2), run_time=0.4)
        self.play(Create(self.encadrer(e3[1])), run_time=0.3)
        self.au_mot("Il manque encore")
        self.play(m.parts[3].animate.set_fill(ORANGE_RETENUE, 1), run_time=0.4)
        self.au_nb("Il manque encore 1 quart")
        r = self.col(self.t("Il manque 1 quart :", 40, AMBRE), -1.6)
        self.play(FadeIn(r, scale=1.2), run_time=0.35)
        self.au_mot("une noire")
        n4 = note("noire", 0.6, ORANGE_RETENUE).move_to(P(XB + 3 * LB / 8, 1.25))
        n5 = note("noire", 0.5, ORANGE_RETENUE).next_to(r, RIGHT, buff=0.3)
        self.play(FadeIn(n4, scale=1.4), FadeIn(n5, scale=1.4), run_time=0.4)
        self.attendre_voix()

    # ── 04 : QUESTION 1 (1/4 + 1/8) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        a = self.barre(4, 1, 1.0, couleur=C_NO)
        b = self.barre(8, 1, -0.4, couleur=C_CR)
        self.add(a, b)

        def apres(sc):
            sc.au_mot("1 quart égale 2 huitièmes")
            a8, an1 = a.repartager(2, run_time=0.7)
            sc.rep(0, avec=[an1])
            sc.au_mot("2 plus 1")
            sc.rep(1)
            sc.rep_fin()

        self.question_pause("04-question", "04b-reponse", ["1 quart", "+ 1 huitième ?"],
                            [self.inline("2/12"), self.inline("3/8"), self.inline("2/8")], 1,
                            ["1/4 = 2/8", "2 + 1 = 3 : 3/8"], mot_q="1 quart", autres_r=apres)

    # ── 05 : le piège (on n'ajoute pas les dénominateurs) ──────────────────
    def ecran_piege(self):
        self.ecran("05-piege")
        self.au_mot("Attention au piège")
        self.titre("Attention au piège !", ROUGE_ERREUR)
        self.au_mot("On n'ajoute jamais")
        r = self.col(self.bloc(["On n'ajoute jamais", "les dénominateurs !"], 38, ROUGE_ERREUR), 1.9)
        self.poser_lignes(r, "up", 0.3)
        faux = expression((1, 2), "+", (1, 4), "=", (2, 6, ROUGE_ERREUR), fs=62)
        self.col(faux, 0.3)
        self.montre(["1 demi plus", "plus 1 quart"], [faux[0], faux[1:4]])
        self.au_mot("2 sixièmes")
        self.play(FadeIn(faux[4], scale=1.3), run_time=0.3)
        self.play(Create(croix(faux[3:], sw=6).set_stroke(opacity=0.9)), run_time=0.3)
        a = Barre(2, 1, largeur=4.6, hauteur=0.6, couleur=C_BL, centre=P(-2.6, 1.5))
        s = Barre(6, 2, largeur=4.6, hauteur=0.6, couleur=ROUGE_COACH, centre=P(-2.6, -0.6))
        la = pas_audit(self.inline("1/2", 36, C_BL).next_to(a, LEFT, buff=0.15))
        ls = pas_audit(self.inline("2/6", 36, ROUGE_ERREUR).next_to(s, LEFT, buff=0.15))
        self.au_mot("Regarde")
        self.play(FadeIn(a), FadeIn(la), FadeIn(s), FadeIn(ls), run_time=0.5)
        self.au_mot("moins que 1 demi")
        self.play(Create(a.fin_coloriee(vers=-2.4)), run_time=0.6)
        self.au_mot("Impossible")
        m = self.col(self.bloc(["En ajoutant,", "on ne peut pas avoir moins !"], 34, AMBRE), -1.3)
        bloc_fixe(m)
        self.play(FadeIn(m, shift=UP * 0.2), run_time=0.4)
        self.attendre_voix()

    # ── 06 : simplifier le résultat (3/8 + 1/8 = 4/8 = 1/2) ─────────────────
    def ecran_simplifier(self):
        self.ecran("06-simplifier")
        b = self.barre(8, 0, -0.3)
        cr = VGroup(*[note("croche", 0.5, C_CR if i < 3 else C_NO).move_to(P(XB - LB / 2 + LB / 16 * (2 * i + 1), 0.95))
                      for i in range(4)])
        e = expression((3, 8, C_CR), "+", (1, 8, C_NO), fs=54)
        self.col(e, 2.6)
        self.au_mot("3 croches")
        self.play(FadeIn(b), LaggedStart(*[FadeIn(c, shift=DOWN * 0.2) for c in cr[:3]], lag_ratio=0.2), run_time=0.6)
        self.au_nb("3 croches : 3 huitièmes")
        self.play(FadeIn(e[0], scale=1.2), b.colorier(range(3), couleur=C_CR, lag=0.1, run_time=0.5), run_time=0.5)
        self.au_mot("encore 1 croche")
        self.play(FadeIn(cr[3], shift=DOWN * 0.2), run_time=0.3)
        self.au_nb("encore 1 croche : 1 huitième")
        self.play(FadeIn(e[1:], scale=1.2), b.colorier([3], couleur=C_NO, run_time=0.3), run_time=0.4)
        self.calc([("3 + 1 =", WHITE), ("4", VERT_OK)], 1.55, 46)
        f, g = EcritureFraction(4, 8, fs=64), EcritureFraction(1, 2, fs=64, couleur=VERT_OK)
        eg = egalite(f, g, buff=1.0)
        self.col(eg, -0.95)
        self.au_mot("4 huitièmes")
        self.play(FadeIn(f, scale=1.3), run_time=0.35)
        self.au_mot("on simplifie")
        self.play(Indicate(f, color=AMBRE), run_time=0.5)
        haut, bas = fleches(f, g, "÷ 4", fs=32, angle=TAU / 10)
        self.au_nb("On divise par 4")
        b2, anim = b.regrouper(4, run_time=0.9)
        self.play(Create(haut[0]), FadeIn(haut[1]), Create(bas[0]), FadeIn(bas[1]), anim)
        self.au_mot("1 demi")
        self.play(FadeIn(eg[1]), FadeIn(g, scale=1.3), run_time=0.4)
        self.play(Create(self.encadrer(g, buff=0.15)), run_time=0.3)
        self.attendre_voix()

    # ── 07 : la chaîne 1/2 = 0,5 = 50 % ─────────────────────────────────────
    def ecran_chaine(self):
        self.ecran("07-chaine")
        b = self.barre(2, 1, 0.3)
        self.add(b)
        f = EcritureFraction(1, 2, fs=70, couleur=VERT_OK)
        self.col(f, 2.0)
        self.au_mot("1 demi")
        self.play(FadeIn(f, scale=1.2), run_time=0.4)
        self.au_mot("1 divisé par 2")
        self.calc([("1 ÷ 2", WHITE), ("= 0,5", BLEU_CALCUL)], 0.4, 54)
        pc = Pourcentage(50, mode="chargement", largeur=4.6, hauteur=0.55, couleur=C_BL, etiquette=False)
        pc.vide()
        self.col(pc, -0.9)
        p50 = self.t("50 %", 50, C_BL).next_to(pc, DOWN, buff=0.25).align_to(pc, RIGHT)
        pc.plein.set_opacity(1)
        self.au_mot("remplie à 50")
        self.play(FadeIn(pc.piste), run_time=0.2)
        self.add(pc.plein)
        self.play(pc.remplir(0.4), run_time=0.4)
        self.au_nb("remplie à 50")
        self.play(FadeIn(p50, scale=1.3), run_time=0.35)
        self.au_mot("à moitié")
        self.insister(p50, 1.3, 0.25)
        self.attendre_voix()

    # ── 08 : QUESTION 2 (5/8 + 1/8, simplifier) ─────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        b = self.barre(8, 0, 0.3)
        self.add(b)

        def apres(sc):
            sc.au_mot("5 plus 1")
            sc.rep(0, avec=[Succession(b.colorier(range(5), couleur=C_CR, lag=0.08, run_time=0.4),
                                       b.colorier([5], couleur=C_NO, run_time=0.2))])
            sc.au_nb("On divise par 2")
            b4, an = b.regrouper(2, run_time=0.8)
            sc.rep(1, avec=[an])
            sc.au_mot("Enlever 2")
            sc.rep(2)
            sc.rep_fin()

        self.question_pause("08-question", "08b-reponse", ["5 huitièmes + 1 huitième,", "simplifié ?"],
                            [self.inline("6/16"), self.inline("4/6"), self.inline("3/4")], 2,
                            ["5 + 1 = 6 : 6/8", "÷ 2 en haut et en bas : 3/4", "Enlever 2 : c'est le piège !"],
                            mot_q="5 huitièmes", autres_r=apres)

    # ── 09 : soustraire (1 − 5/8 = 3/8) ─────────────────────────────────────
    def ecran_soustraire(self):
        self.ecran("09-soustraire")
        self.au_mot("Pour soustraire")
        self.titre("Soustraire")
        b = self.barre(8, 0, 0.0)
        self.au_mot("Une mesure entière")
        self.play(FadeIn(b), run_time=0.4)
        e = expression("1", "−", (5, 8, C_BL), fs=54)
        self.col(e, 1.9)
        self.au_nb("c'est 1")
        self.play(FadeIn(e[0], scale=1.2), Indicate(b.contour, color=AMBRE), run_time=0.4)
        self.au_nb("déjà écrit 5")
        self.play(FadeIn(e[1:], scale=1.2), b.colorier(range(5), couleur=C_BL, lag=0.08, run_time=0.5), run_time=0.5)
        e2 = expression("=", (8, 8), "−", (5, 8, C_BL), fs=54)
        self.col(e2, 0.6)
        self.au_nb("1 égale 8")
        self.play(FadeIn(e2[:2], scale=1.2), run_time=0.4)
        self.au_nb("huitièmes moins 5")
        self.play(FadeIn(e2[2:], scale=1.2), run_time=0.3)
        self.au_mot("8 moins 5")
        self.calc([("8 − 5 =", WHITE), ("3", VERT_OK)], -0.65, 44,
                  avec=[b.colorier([5, 6, 7], couleur=ORANGE_RETENUE, lag=0.1, run_time=0.5)])
        self.au_nb("Il lui reste 3")
        res = self.ligne([("reste :", VERT_OK)], 40)
        f = EcritureFraction(3, 8, fs=52, couleur=VERT_OK)
        r = VGroup(res, f).arrange(RIGHT, buff=0.25).move_to(P(XB, -1.6))
        r[0].sans_synchro = True
        self.play(FadeIn(r, scale=1.2), run_time=0.4)
        self.attendre_voix()

    # ── 10 : défi (1/2 + 1/8 + 1/8) ─────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("10-defi")
        self.au_mot("À toi de jouer")
        self.titre("À toi de jouer !", fs=50, centre=True)
        b = self.barre(8, 0, -0.2)
        ns = VGroup(note("blanche", 0.6, C_BL).move_to(P(XB - LB / 4, 1.1)),
                    note("croche", 0.6, C_CR).move_to(P(XB + LB / 16, 1.1)),
                    note("croche", 0.6, C_CR).move_to(P(XB + 3 * LB / 16, 1.1)))
        self.play(FadeIn(b), run_time=0.4)
        lignes = []
        for i, (sg, n, d, c) in enumerate([("", 1, 2, C_BL), ("+", 1, 8, C_CR), ("+", 1, 8, C_CR)]):
            l = VGroup(self.t(sg or " ", 46, c), EcritureFraction(n, d, fs=46, couleur=c)).arrange(RIGHT, buff=0.2)
            lignes.append(self.col(l, 2.0 - 1.0 * i, xl=self.XL + 0.6))
        for k, (l, mot) in enumerate(zip(lignes, ["joue 1 demi", "puis 1 huitième", "encore 1 huitième"])):
            self.au_nb(mot)
            self.play(FadeIn(l, scale=1.2), FadeIn(ns[k], shift=DOWN * 0.2), run_time=0.4)
        self.au_mot("Quelle part")
        q = self.col(self.t("Mesure remplie : ?", 38, ORANGE_RETENUE), -1.0)
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.35)
        self.au_mot("Simplifie")
        s = self.col(self.t("Simplifie !", 34, AMBRE), -1.65)
        self.play(FadeIn(s, scale=1.2), run_time=0.3)
        self.pause_defi(y=-2.35)

    def ecran_correction(self):
        self.ecran("10b-correction")
        self.titre("Correction", fs=50, centre=True)
        b = self.barre(8, 0, -0.2)
        self.au_mot("tout en huitièmes")
        self.play(FadeIn(b), run_time=0.5)
        e = expression((4, 8, C_BL), "+", (1, 8, C_CR), "+", (1, 8, C_CR), fs=46)
        self.col(e, 2.0)
        self.au_nb("1 demi égale 4")
        self.play(FadeIn(e[0], scale=1.2), b.colorier(range(4), couleur=C_BL, lag=0.08, run_time=0.4), run_time=0.45)
        lg = self.col(self.ligne([("4 +", WHITE), ("1 +", WHITE), ("1 =", WHITE), ("6", VERT_OK)], 44), 0.95)
        sans_synchro(lg)
        self.au_nb("huitièmes. 4")
        self.play(FadeIn(lg[0], shift=RIGHT * 0.15), run_time=0.3)
        self.au_nb("4 plus 1")
        self.play(FadeIn(lg[1], shift=RIGHT * 0.15), FadeIn(e[1:3], scale=1.2),
                  b.colorier([4], couleur=C_CR, run_time=0.3), run_time=0.3)
        self.au_nb("4 plus 1 plus 1")
        self.play(FadeIn(lg[2], shift=RIGHT * 0.15), FadeIn(e[3:], scale=1.2),
                  b.colorier([5], couleur=C_CR, run_time=0.3), run_time=0.3)
        self.au_nb("égale 6")
        self.play(FadeIn(lg[3], scale=1.3), run_time=0.3)
        f, g = EcritureFraction(6, 8, fs=56), EcritureFraction(3, 4, fs=56, couleur=VERT_OK)
        eg = egalite(f, g, buff=1.0)
        self.col(eg, -1.0)
        self.au_mot("6 huitièmes")
        self.play(FadeIn(f, scale=1.3), run_time=0.35)
        haut, bas = fleches(f, g, "÷ 2", fs=30, angle=TAU / 10)
        self.au_nb("On simplifie par 2")
        b4, an = b.regrouper(2, run_time=0.5)
        self.play(Create(haut[0]), FadeIn(haut[1]), Create(bas[0]), FadeIn(bas[1]), an, run_time=0.5)
        self.au_mot("3 quarts. La")
        self.play(FadeIn(eg[1]), FadeIn(g, scale=1.3), run_time=0.4)
        self.au_mot("La mesure est remplie")
        ok = self.col(self.t("Remplie aux 3 quarts !", 38, VERT_OK), -2.75)
        self.play(FadeIn(ok, scale=1.2), run_time=0.4)
        self.attendre_voix()

    # ── 11 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("11-finale", 0.65)
        fig = VGroup(expression((1, 2), "+", (1, 4), fs=44), expression("=", (2, 4), "+", (1, 4), fs=44),
                     expression("=", (3, 4), fs=44)).arrange(DOWN, aligned_edge=LEFT, buff=0.3)
        self.add(fig)
        lignes = self.finale_colonne(figure=fig, textes=[("Même dénominateur d'abord,", "puis on ajoute les numérateurs."),
                                                         ("Pour soustraire,", "c'est pareil."),
                                                         ("On simplifie toujours", "le résultat."),
                                                         ("Jamais on n'ajoute", "les dénominateurs !")], fs=34)
        self.au_mot("On écrit les fractions")
        self.montrer_ligne(lignes[0])
        self.au_mot("Pour soustraire")
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
        self.ecran_commun()
        self.ecran_somme()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_simplifier()
        self.ecran_chaine()
        self.ecran_question2()
        self.ecran_soustraire()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("12-abonne")


class FracAdditionner5e(FracAdditionnerBase):
    identite = "Maths 5e — EleveAI"
    ceinture = "verte"
