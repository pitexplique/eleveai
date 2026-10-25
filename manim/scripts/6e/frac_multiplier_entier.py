# frac_multiplier_entier.py
# EleveAI — Maths 6e — série « Fractions », épisode 10 : MULTIPLIER UNE
# FRACTION PAR UN ENTIER (micro du coach : fraction_multiplier_entier, notion
# fraction_calcul), AVEC VOIX. Paysage 16:9 SEULEMENT (le short existe déjà :
# 6e-fraction-calcul-short-multiplier, 3 × 2/5 et 4 × 2/7 : exemples NON repris
# ici). CEINTURE VERTE : la paysage complète du niveau.
# ⭐ Le BO (2025) : « calculer le produit d'une fraction par un nombre entier,
# et connaît sa propriété de commutativité » (écran 07). Rappel de SES erreurs :
# simplifier le résultat (12/8 = 3/2, écran 06 ; 18/4 = 9/2) et fraction →
# décimal (9/2 = 4,5, correction du défi).
#
# Décor et métier : ANIMAUX ; Lisa, SOIGNEUSE ANIMALIÈRE dans un refuge : un
# chat mange 3/8 de boîte par repas, 4 chats → 12/8 = 1 boîte et demie. Défi :
# 6 chiens × 3/4 L d'eau = 18/4 = 9/2 = 4,5 L. Rations inventées.
# Centres d'intérêt : animaux.
#
# Micro → écrans (banque fractions-calcul.bank.ts) : k × a/b = a/b + … + a/b
# (02), la règle « on multiplie le numérateur » (03, question 1 : 5 × 2/9,
# leurre 10/45), plus qu'une unité (04), simplifier le résultat (06),
# commutativité (07), le piège « × en bas aussi » (08 : 12/32 = 3/8), question
# 2 (3 × 1/3 = 1), défi (10).
# Écrans : 00 garde · 01 Lisa et les chats · 02 ajouter 4 fois · 03 la règle ·
# 04 plus qu'une boîte · 05 QUESTION 1 · 06 simplifier · 07 l'ordre · 08 le
# piège · 09 QUESTION 2 · 10 défi · 10b correction · 11 ce que tu as appris · 12 fin.
#
# Voix : manim/voix/6e-frac-multiplier-entier.json (débit −10), WAV dans
# public/sons/6e-frac-multiplier-entier/ ; marques : frac_multiplier_entier_marques.json.
# Outils : frac_commun.py + frac_lotc_commun.py.
# python -m manim render -qh --disable_caching manim/scripts/6e/frac_multiplier_entier.py FracMultiplierEntier6e -o eleveai-maths-6e-frac-multiplier-entier --media_dir manim/scripts/6e/media-frac-multiplier-entier
# Sortie : manim/sorties/6e/maths/fractions/10-multiplier-entier/eleveai-maths-6e-frac-multiplier-entier.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from frac_lotc_commun import *  # noqa: E402,F403

PATEE = ORANGE_PART
EAU = BLEU_PART


def soigneuse(s=1.0):
    """Lisa : polo vert du refuge, cheveux longs."""
    return personne(peau="#5c3a21", tenue="#15803d", cheveux="#111827", longs=True, s=s)


def chat(r=0.32, couleur="#f59e0b"):
    """Une tête de chat : rond, deux oreilles, deux yeux."""
    t = Circle(radius=r, fill_color=couleur, fill_opacity=1, stroke_width=0)
    o = VGroup(*[Polygon(P(s * r * 0.85, r * 0.35), P(s * r * 0.25, r * 0.85), P(s * r * 0.9, r * 1.15),
                         fill_color=couleur, fill_opacity=1, stroke_width=0) for s in (-1, 1)])
    y = VGroup(*[Dot(P(s * r * 0.35, r * 0.1), radius=r * 0.1, color=NUIT) for s in (-1, 1)])
    return VGroup(o, t, y)


def chien(r=0.32, couleur="#a16207"):
    """Une tête de chien : rond, deux oreilles tombantes, deux yeux, un nez."""
    t = Circle(radius=r, fill_color=couleur, fill_opacity=1, stroke_width=0)
    o = VGroup(*[Ellipse(width=r * 0.6, height=r * 1.2, fill_color="#713f12", fill_opacity=1, stroke_width=0)
                 .move_to(P(s * r * 0.95, 0)) for s in (-1, 1)])
    y = VGroup(*[Dot(P(s * r * 0.35, r * 0.2), radius=r * 0.1, color=NUIT) for s in (-1, 1)])
    n = Dot(P(0, -r * 0.25), radius=r * 0.15, color=NUIT)
    return VGroup(t, o, y, n)


class FracMultiplierEntierBase(PaysageLotC):
    nom_voix = "6e-frac-multiplier-entier"
    fichier_marques = "frac_multiplier_entier_marques.json"

    def boite(self, k=0, y=0.0, x=-3.3, largeur=5.0, hauteur=0.55, n=8, couleur=PATEE):
        return Barre(n, k, largeur=largeur, hauteur=hauteur, couleur=couleur, marge=0.15, centre=P(x, y))

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Multiplier une fraction par un entier", self.identite, self.ceinture)
        self.au_mot("Multiplier")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        ex = expression("4 ×", (3, 8), "=", "?", fs=84).move_to(P(-0.6, 0.2))
        ex[3].set_color(AMBRE)
        self.au_mot("4 fois")
        self.play(FadeIn(ex[0], scale=1.2), run_time=0.3)
        self.frac(ex[1], "3 huitièmes")
        self.au_mot("combien")
        self.play(FadeIn(ex[2:], scale=0.5), run_time=0.4)
        self.insister(ex[3], 1.4, 0.25)
        self.attendre_voix(marge=0.8)

    # ── 01 : Lisa et les chats ──────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pers = soigneuse(1.1).move_to(P(-5.5, -0.5))
        self.au_mot("Voici Lisa")
        nom = self.t("Lisa", 40, BLEU_CALCUL).next_to(pers, UP, buff=0.3)
        self.play(FadeIn(pers, shift=UP * 0.3), FadeIn(nom), run_time=0.6)
        self.au_mot("soigneuse animalière")
        metier = self.bloc(["soigneuse", "animalière"], 30, BLEU_CALCUL).next_to(pers, DOWN, buff=0.2)
        for m in metier:
            m.set_x(pers.get_x())
        self.play(FadeIn(metier, shift=UP * 0.2), run_time=0.4)
        c1 = chat(0.38).move_to(P(-2.4, 1.9))
        b = self.boite(0, 1.9, x=1.3, largeur=4.4)
        self.au_mot("un chat mange")
        self.play(GrowFromCenter(c1), b.apparaitre(0.6), run_time=0.6)
        self.au_mot("3 huitièmes")
        l1 = VGroup(EcritureFraction(3, 8, fs=50, couleur=PATEE), self.t("de boîte", 36, PATEE)).arrange(RIGHT, buff=0.2)
        l1.next_to(b, DOWN, buff=0.25)
        self.play(b.colorier(range(3), lag=0.2), FadeIn(l1[0], scale=1.3), run_time=0.6)
        self.au_mot("d'une boîte")
        self.play(FadeIn(l1[1], shift=RIGHT * 0.15), run_time=0.3)
        self.au_mot("4 chats")
        chats = VGroup(*[chat(0.34, c) for c in ("#f59e0b", "#9ca3af", "#fde68a", "#78350f")]).arrange(RIGHT, buff=0.35)
        chats.move_to(P(-0.3, -0.8))
        t4 = self.t("4 chats", 40, WHITE).next_to(chats, RIGHT, buff=0.4)
        self.play(LaggedStart(*[GrowFromCenter(c) for c in chats], lag_ratio=0.2), FadeIn(t4), run_time=0.8)
        self.au_mot("Combien de boîtes")
        q = self.t("Combien de boîtes ?", 42, ORANGE_RETENUE).move_to(P(0.2, -2.3))
        self.play(FadeIn(q, shift=UP * 0.2), run_time=0.4)
        self.attendre_voix()

    # ── 02 : 3/8 ajouté 4 fois ──────────────────────────────────────────────
    def ecran_ajouter(self):
        self.ecran("02-ajouter")
        cols = ("#f59e0b", "#9ca3af", "#fde68a", "#78350f")
        ys = [2.3, 1.15, 0.0, -1.15]
        bs = [self.boite(0, y, x=-2.6, largeur=4.6, hauteur=0.5) for y in ys]
        cs = [chat(0.3, c).next_to(b, LEFT, buff=0.2) for c, b in zip(cols, bs)]
        self.au_mot("4 fois 3 huitièmes")
        self.play(*[FadeIn(c) for c in cs], *[b.apparaitre(0.6) for b in bs], run_time=0.6)
        self.au_mot("4 fois de suite")
        self.play(LaggedStart(*[b.colorier(range(3), lag=0.15) for b in bs], lag_ratio=0.3), run_time=1.2)
        self.au_mot("On compte les parts")
        self.calc([("3 + 3 + 3 + 3 =", WHITE), ("12", VERT_OK)], 1.2, 46, xl=1.2)
        self.au_mot("12 huitièmes")
        r = VGroup(self.t("=", 60), EcritureFraction(12, 8, fs=64, couleur=VERT_OK)).arrange(RIGHT, buff=0.3)
        self.col(r, -0.2, xl=1.2)
        self.play(FadeIn(r, scale=1.3), run_time=0.4)
        self.attendre_voix()

    # ── 03 : la règle ───────────────────────────────────────────────────────
    def ecran_regle(self):
        self.ecran("03-regle")
        tit = self.t("La règle", 48, JAUNE_TITRE).move_to(P(-5.0, 3.0))
        self.au_mot("La règle")
        self.play(Write(tit), run_time=0.5)
        ex = expression("4 ×", (3, 8), "=", (12, 8), fs=110).move_to(P(-2.4, 0.4))
        self.add(ex[0], ex[1])
        fl = CurvedArrow(ex[1].num.get_top() + UP * 0.12, ex[3].num.get_top() + UP * 0.12, angle=-TAU / 5,
                         color=AMBRE, stroke_width=5, tip_length=0.2)
        lab = self.t("× 4", 44, AMBRE).next_to(fl, UP, buff=0.08)
        self.au_mot("on multiplie le numérateur")
        self.play(Create(fl), FadeIn(lab), FadeIn(ex[2]), Indicate(ex[1].num, color=AMBRE, scale_factor=1.3),
                  run_time=0.35)
        self.au_mot("4 fois 3")
        self.calc([("4 × 3 =", WHITE), ("12", VERT_OK)], 1.5, 50, xl=1.9,
                  avec=[FadeIn(VGroup(ex[3].num, ex[3].trait), scale=1.3)])
        self.au_mot("Le dénominateur ne bouge pas")
        self.play(FadeIn(ex[3].den, scale=1.3), Indicate(ex[1].den, color=BLEU_CALCUL, scale_factor=1.3), run_time=0.5)
        l2 = self.col(self.bloc(["Le dénominateur", "ne bouge pas :", "8 reste 8."], 40, BLEU_CALCUL), -0.4, xl=1.9)
        self.poser_lignes(l2, "up", 0.3)
        self.au_mot("4 fois 3 huitièmes égale")
        self.play(Circumscribe(ex, color=VERT_OK), run_time=0.8)
        self.attendre_voix()

    # ── 04 : plus qu'une boîte ──────────────────────────────────────────────
    def ecran_plus_que_un(self):
        self.ecran("04-plus-que-un")
        b1 = self.boite(0, 1.6, x=-3.3, largeur=5.4, hauteur=0.6)
        b2 = self.boite(0, 0.0, x=-3.3, largeur=5.4, hauteur=0.6)
        self.add(b1, b2)
        self.au_mot("plus qu'une boîte")
        tit = self.col(self.t("Plus qu'une boîte !", 44, JAUNE_TITRE), 2.8)
        self.play(Write(tit), run_time=0.5)
        self.au_mot("8 huitièmes font 1 boîte")
        self.play(b1.colorier(range(8), lag=0.08), run_time=0.9)
        l1 = VGroup(EcritureFraction(8, 8, fs=54), self.t("= 1 boîte", 42)).arrange(RIGHT, buff=0.25)
        self.col(l1, 1.6)
        self.play(FadeIn(l1, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("Il reste 4 huitièmes")
        self.play(b2.colorier(range(4), lag=0.1), run_time=0.6)
        l2 = VGroup(EcritureFraction(4, 8, fs=54), self.t("= 1 demi", 42)).arrange(RIGHT, buff=0.25)
        self.col(l2, 0.1)
        self.play(FadeIn(l2[0], scale=1.3), run_time=0.3)
        self.au_mot("une demi-boîte")
        self.play(FadeIn(l2[1], shift=RIGHT * 0.2), Create(b2.fin_coloriee(vers=-0.3)), run_time=0.4)
        self.au_mot("1 boîte et demie")
        r = self.col(self.t("1 boîte et demie", 50, VERT_OK), -1.5)
        self.play(FadeIn(r, scale=1.3), run_time=0.4)
        self.play(Create(self.encadrer(r)), run_time=0.3)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (5 × 2/9) ───────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        b1 = self.boite(0, 1.0, x=-3.3, largeur=5.4, n=9, couleur=VIOLET_PART)
        b2 = self.boite(0, -0.3, x=-3.3, largeur=5.4, n=9, couleur=VIOLET_PART)
        self.add(b1)

        def apres(sc):
            sc.au_mot("5 fois 2")
            sc.rep(0, avec=[FadeIn(b2), b1.colorier(range(9), lag=0.05, run_time=0.7)])
            sc.play(b2.colorier([0], run_time=0.3))
            sc.au_mot("Le bas reste 9")
            sc.rep(1)
            sc.rep_fin()

        self.question_pause("05-question", "05b-reponse", ["5 × 2 neuvièmes", "= ?"],
                            [self.inline("10/45"), self.inline("10/9"), self.inline("7/9")], 1,
                            ["5 × 2 = 10 en haut,", "le bas reste 9."], mot_q="5 fois",
                            autres_r=apres)

    # ── 06 : simplifier le résultat ─────────────────────────────────────────
    def ecran_simplifier(self):
        self.ecran("06-simplifier")
        f, g = EcritureFraction(12, 8, fs=100), EcritureFraction(3, 2, fs=100)
        eg = egalite(f, g, buff=1.2).move_to(P(-3.3, 0.75))
        haut, bas = fleches(f, g, "÷ 4", fs=42, angle=TAU / 8)
        self.au_mot("On simplifie")
        tit = self.col(self.t("On simplifie", 46, JAUNE_TITRE), 2.9)
        self.play(Write(tit), FadeIn(f, scale=1.2), run_time=0.5)
        self.au_mot("dans la table de 4")
        self.play(Indicate(VGroup(f.num, f.den), color=AMBRE, scale_factor=1.25), run_time=0.6)
        self.au_mot("12 divisé par 4")
        self.calc([("12 ÷ 4 =", WHITE), ("3", VERT_OK)], 1.7, 50,
                  avec=[Create(haut[0]), FadeIn(haut[1])])
        self.play(FadeIn(eg[1]), FadeIn(VGroup(g.num, g.trait), scale=1.3), run_time=0.3)
        self.au_mot("8 divisé par 4")
        self.calc([("8 ÷ 4 =", WHITE), ("2", VERT_OK)], 0.7, 50, avec=[Create(bas[0]), FadeIn(bas[1])])
        self.play(FadeIn(g.den, scale=1.3), run_time=0.3)
        self.au_mot("3 demis")
        hs = VGroup(*[self.boite(1, -2.8, x=-5.3 + 2.0 * i, largeur=1.7, hauteur=0.5, n=2) for i in range(3)])
        self.play(LaggedStart(*[FadeIn(h, shift=UP * 0.15) for h in hs], lag_ratio=0.25), run_time=0.7)
        r = self.col(self.t("3 demi-boîtes", 44, VERT_OK), -0.6)
        self.play(FadeIn(r, scale=1.2), run_time=0.4)
        self.attendre_voix()

    # ── 07 : l'ordre ne compte pas ──────────────────────────────────────────
    def ecran_ordre(self):
        self.ecran("07-ordre")
        e1 = expression("4 ×", (3, 8), "=", (12, 8), fs=72).move_to(P(-0.4, 1.25))
        self.add(e1)
        e2 = expression((3, 8), "× 4", "=", (12, 8), fs=72).move_to(P(-0.4, -1.25))
        self.au_mot("l'ordre ne compte pas")
        tit = self.t("L'ordre ne compte pas", 46, JAUNE_TITRE).move_to(P(0, 3.0))
        self.play(Write(tit), run_time=0.5)
        self.au_mot("3 huitièmes fois 4")
        self.play(TransformFromCopy(e1[1], e2[0], path_arc=-PI / 4), TransformFromCopy(e1[0], e2[1], path_arc=PI / 4),
                  run_time=0.8)
        self.au_mot("aussi 12 huitièmes")
        self.play(FadeIn(e2[2:], scale=1.2), run_time=0.4)
        self.play(Create(self.encadrer(e2[3])), run_time=0.3)
        self.attendre_voix()

    # ── 08 : le piège (× 4 en bas aussi) ────────────────────────────────────
    def ecran_piege(self):
        self.ecran("08-piege")
        tit = self.t("Attention au piège !", 46, ROUGE_ERREUR).move_to(P(0, 3.05))
        self.au_mot("Attention au piège")
        self.play(Write(tit), run_time=0.5)
        f, g = EcritureFraction(3, 8, fs=72), EcritureFraction(12, 32, fs=72, couleur=ROUGE_ERREUR)
        eg = egalite(f, g, signe="→", buff=1.0).move_to(P(-3.6, 0.5))
        haut, bas = fleches(f, g, "× 4", couleur=ROUGE_ERREUR, fs=36, angle=TAU / 7)
        self.add(f)
        self.au_mot("multiplient aussi le dénominateur")
        self.play(Create(haut[0]), FadeIn(haut[1]), Create(bas[0]), FadeIn(bas[1]), run_time=0.6)
        self.au_mot("12 trente-deuxièmes")
        self.play(FadeIn(eg[1]), FadeIn(g, scale=1.3), run_time=0.4)
        self.au_mot("Faux")
        self.play(Create(croix(g, sw=6).set_stroke(opacity=0.9)), run_time=0.3)
        a = Barre(8, 3, largeur=5.0, hauteur=0.5, couleur=PATEE, marge=0.15, centre=P(2.6, 0.9))
        b = Barre(32, 12, largeur=5.0, hauteur=0.5, couleur=ROUGE_COACH, marge=0.15, sw=2, centre=P(2.6, -0.4))
        self.au_mot("12 trente-deuxièmes, c'est 3 huitièmes")
        la = self.inline("3/8", 34, PATEE).next_to(a, UP, buff=0.1).align_to(a, LEFT)
        lb = self.inline("12/32", 34, ROUGE_ERREUR).next_to(b, DOWN, buff=0.1).align_to(b, LEFT)
        self.play(FadeIn(a), FadeIn(b), FadeIn(la), FadeIn(lb), run_time=0.5)
        tir = a.fin_coloriee(vers=-1.6)
        self.play(Create(tir), run_time=0.5)
        self.au_mot("la part d'un seul chat")
        c = chat(0.4).move_to(P(-5.2, -1.85))
        u = self.t("1 seul chat !", 40, ROUGE_ERREUR).next_to(c, RIGHT, buff=0.3)
        self.play(GrowFromCenter(c), FadeIn(u), run_time=0.5)
        self.au_mot("4 chats mangent plus")
        r = self.t("On multiplie seulement le haut !", 40, VERT_OK).move_to(P(-0.4, -2.9))
        self.play(FadeIn(r, shift=UP * 0.2), run_time=0.4)
        self.attendre_voix()

    # ── 09 : QUESTION 2 (3 × 1/3) ───────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        b = self.boite(0, 0.5, x=-3.3, largeur=5.4, n=3, couleur=VIOLET_PART)
        self.add(b)

        def apres(sc):
            sc.au_mot("égale 3 tiers")
            sc.rep(0, avec=[b.colorier(range(3), lag=0.3, run_time=0.8)])
            sc.au_mot("c'est un entier")
            sc.rep(1)
            sc.rep_fin()

        self.question_pause("09-question", "09b-reponse", ["3 × 1 tiers,", "ça fait combien ?"],
                            [self.inline("3/9"), self.inline("1"), self.inline("4/3")], 1,
                            ["3 × 1/3 = 3/3", "= un entier : 1"], mot_q="3 fois", autres_r=apres)

    # ── 10 : défi (6 chiens × 3/4 L) ────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("10-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.col(self.t("À toi de jouer !", 50, JAUNE_TITRE), 3.0)
        self.play(Write(tit), run_time=0.6)
        c1 = chien(0.45).move_to(P(-4.6, 1.6))
        bol = self.boite(3, 1.6, x=-1.9, largeur=3.2, hauteur=0.55, n=4, couleur=EAU)
        l1 = VGroup(self.t("1 chien :", 40), EcritureFraction(3, 4, fs=56, couleur=EAU), self.t("L", 40, EAU))
        l1.arrange(RIGHT, buff=0.2)
        self.col(l1, 1.75)
        self.au_mot("chaque chien boit")
        self.play(GrowFromCenter(c1), bol.apparaitre(0.6), FadeIn(l1[0]), run_time=0.6)
        self.au_mot("3 quarts de litre")
        self.play(FadeIn(l1[1:], shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("6 chiens")
        chiens = VGroup(*[chien(0.32) for _ in range(6)]).arrange(RIGHT, buff=0.25).move_to(P(-3.3, -0.3))
        l2 = self.col(self.t("6 chiens", 40), 0.5)
        self.play(LaggedStart(*[GrowFromCenter(c) for c in chiens], lag_ratio=0.15), FadeIn(l2), run_time=0.8)
        self.au_mot("Combien de litres")
        l3 = self.col(self.bloc(["Combien de litres", "chaque jour ?"], 38, ORANGE_RETENUE), -0.7)
        self.poser_lignes(l3, "up", 0.3)
        self.pause_defi(y=-1.9)

    def ecran_correction(self):
        self.ecran("10b-correction", 0.65)
        tit = self.col(self.t("Correction", 50, JAUNE_TITRE), 3.0)
        self.play(Write(tit), run_time=0.5)
        e = expression("6 ×", (3, 4), "=", (18, 4), "=", (9, 2), fs=72).move_to(P(-3.0, 1.5))
        self.add(e[0], e[1])
        self.au_mot("6 fois 3")
        self.calc([("6 × 3 =", WHITE), ("18", VERT_OK)], 1.9, 46, xl=1.6)
        self.au_mot("18 quarts")
        self.play(FadeIn(e[2:4], scale=1.2), run_time=0.4)
        self.au_mot("On simplifie par 2")
        h, b = fleches(e[3], e[5], "÷ 2", fs=32, angle=TAU / 7)
        self.play(Create(h[0]), FadeIn(h[1]), Create(b[0]), FadeIn(b[1]), run_time=0.5)
        self.au_mot("9 demis")
        self.play(FadeIn(e[4:], scale=1.2), run_time=0.4)
        self.au_mot("9 divisé par 2")
        self.calc([("9 ÷ 2 =", WHITE), ("4,5", VERT_OK)], 0.8, 46, xl=1.6)
        litres = VGroup(*[Barre(2, 2 if i < 4 else 1, largeur=1.0, hauteur=0.5, couleur=EAU, marge=0.1)
                          for i in range(5)]).arrange(RIGHT, buff=0.15).move_to(P(-3.0, -1.1))
        lab = VGroup(*[Text("1 L", font_size=26, color=WHITE).next_to(l, DOWN, buff=0.1) for l in litres])
        for t in lab:
            t.sans_synchro = True
        self.play(LaggedStart(*[FadeIn(l, shift=UP * 0.15) for l in litres], lag_ratio=0.15), FadeIn(lab),
                  run_time=0.8)
        self.au_mot("Il faut 4,5 litres")
        r = self.col(self.t("4,5 L par jour", 50, VERT_OK), -0.5, xl=1.6)
        self.play(FadeIn(r, scale=1.3), run_time=0.4)
        self.play(Create(self.encadrer(r)), run_time=0.3)
        self.attendre_voix()

    # ── 11 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("11-finale", 0.65)
        b1 = self.boite(8, 0.4, x=0, largeur=4.4, hauteur=0.5)
        b2 = self.boite(4, -0.4, x=0, largeur=4.4, hauteur=0.5)
        lab = expression("4 ×", (3, 8), "=", (12, 8), fs=42).next_to(b2, DOWN, buff=0.3)
        fig = VGroup(b1, b2, lab)
        self.add(fig)
        lignes = self.finale_colonne(figure=fig, textes=[("On multiplie", "le numérateur."),
                                                         ("Le dénominateur", "ne change pas."),
                                                         ("L'ordre ne compte pas.",),
                                                         ("On simplifie le résultat.",)], fs=36)
        self.au_mot("on multiplie le numérateur")
        self.montrer_ligne(lignes[0])
        self.au_mot("Le dénominateur")
        self.montrer_ligne(lignes[1])
        self.au_mot("L'ordre")
        self.montrer_ligne(lignes[2])
        self.au_mot("Et on simplifie")
        self.montrer_ligne(lignes[3])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_ajouter()
        self.ecran_regle()
        self.ecran_plus_que_un()
        self.ecran_question1()
        self.ecran_simplifier()
        self.ecran_ordre()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("12-abonne")


class FracMultiplierEntier6e(FracMultiplierEntierBase):
    identite = "Maths 6e — EleveAI"
    ceinture = "verte"
