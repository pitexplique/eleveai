# frac_calcul_defi.py
# EleveAI — Maths 6e — série « Fractions », épisode 11 : DÉFIS DE CALCUL AVEC
# LES FRACTIONS (micro du coach : fraction_calcul_defi, notion fraction_calcul),
# AVEC VOIX. Paysage 16:9 SEULEMENT (le short existe déjà :
# 6e-fraction-calcul-short-defi, le gâteau 1/4 + 1/6 : exemple NON repris).
# CEINTURE VERTE : la paysage complète du niveau (problèmes à étapes).
# ⭐ Deux méthodes qui se vérifient l'une l'autre (en km, puis en fractions) ;
# la chaîne de SES trois erreurs en bonus : 18/40 → 9/20 (simplifier) → 45/100
# → 0,45 → 45 % (écran 10).
#
# Décor et métier : MONTAGNE ; Sarah, GUIDE DE MONTAGNE : randonnée de 24 km,
# 3/8 le matin, 1/4 l'après-midi → il reste 9 km. Défi : groupe de 40
# randonneurs, 1/4 d'enfants, 3/10 d'ados → 18 adultes. Chiffres inventés.
# Centres d'intérêt : sport, histoire-geographie.
#
# Micro → écrans (banque fractions-calcul.bank.ts, items « défi ») : fraction
# d'une quantité (03, 04), retrancher du tout (05), additionner (question 1 :
# 3/8 + 1/4, leurre 4/12), le tout = 8/8 (07), produit > 3 si fraction > 1
# (question 2 : 3 × 5/4), problème à trois groupes (09).
# Écrans : 00 garde · 01 Sarah et la randonnée · 02 le plan · 03 le matin · 04
# l'après-midi · 05 ce qui reste · 06 QUESTION 1 · 07 méthode 2 · 08 QUESTION 2
# · 09 défi · 09b correction · 10 la chaîne → 45 % · 11 ce que tu as appris · 12 fin.
#
# Voix : manim/voix/6e-frac-calcul-defi.json (débit −10), WAV dans
# public/sons/6e-frac-calcul-defi/ ; marques : frac_calcul_defi_marques.json.
# Outils : frac_commun.py + frac_lotc_commun.py.
# python -m manim render -qh --disable_caching manim/scripts/6e/frac_calcul_defi.py FracCalculDefi6e -o eleveai-maths-6e-frac-calcul-defi --media_dir manim/scripts/6e/media-frac-calcul-defi
# Sortie : manim/sorties/6e/maths/fractions/11-calcul-defi/eleveai-maths-6e-frac-calcul-defi.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from frac_lotc_commun import *  # noqa: E402,F403

MATIN = ORANGE_PART
APREM = VERT_PART
XP, YP, LP = -1.6, 1.7, 7.6      # le parcours : centre x, y, largeur


def guide(s=1.0):
    """Sarah : veste rouge de montagne, casquette."""
    p = personne(peau="#c68642", tenue="#b91c1c", cheveux="#3f2a14", longs=True, s=s)
    c = p.tete.get_center()
    r = p.tete.width / 2
    visiere = RoundedRectangle(width=r * 1.6, height=r * 0.22, corner_radius=0.03, fill_color="#1e3a8a",
                               fill_opacity=1, stroke_width=0).move_to(c + UP * r * 0.55 + RIGHT * r * 0.35)
    p.add(visiere)
    return p


def montagnes(l=5.0, h=1.6):
    m1 = Polygon(P(-l / 2, 0), P(-l / 6, h), P(l / 6, 0), fill_color="#475569", fill_opacity=1, stroke_width=0)
    m2 = Polygon(P(-l / 10, 0), P(l / 4, h * 0.8), P(l / 2, 0), fill_color="#64748b", fill_opacity=1, stroke_width=0)
    neige = Polygon(P(-l / 6 - 0.25, h - 0.35), P(-l / 6, h), P(-l / 6 + 0.25, h - 0.35), fill_color=WHITE,
                    fill_opacity=1, stroke_width=0)
    return VGroup(m1, m2, neige)


class FracCalculDefiBase(PaysageLotC):
    nom_voix = "6e-frac-calcul-defi"
    fichier_marques = "frac_calcul_defi_marques.json"

    def parcours(self, matin=0, aprem=0, y=YP, largeur=LP, x=XP):
        b = Barre(8, matin + aprem, largeur=largeur, hauteur=0.65, couleur=MATIN, marge=0.2, centre=P(x, y))
        for i in range(matin, matin + aprem):
            b.parts[i].set_fill(APREM, 1)
        g0 = Text("0", font_size=30).next_to(b.carte, LEFT, buff=0.12)
        g1 = Text("24 km", font_size=30).next_to(b.carte, RIGHT, buff=0.12)
        for t in (g0, g1):
            t.sans_synchro = True
        return b, VGroup(g0, g1)

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Défis de calcul avec les fractions", self.identite, self.ceinture)
        self.au_mot("Défis")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        m = montagnes(4.4, 1.7).move_to(P(-2.2, 0.2))
        self.play(FadeIn(m, shift=UP * 0.2), run_time=0.6)
        self.au_mot("Combien de kilomètres")
        q = self.t("? km", 84, AMBRE).next_to(m, RIGHT, buff=0.6)
        self.play(FadeIn(q, scale=0.4), run_time=0.5)
        self.insister(q, 1.3, 0.25)
        self.attendre_voix(marge=0.8)

    # ── 01 : Sarah et la randonnée ──────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pers = guide(1.0).move_to(P(-5.2, -1.2))
        self.au_mot("Voici Sarah")
        nom = self.t("Sarah", 38, BLEU_CALCUL).next_to(pers, UP, buff=0.25)
        self.play(FadeIn(pers, shift=UP * 0.3), FadeIn(nom), run_time=0.6)
        self.au_mot("guide de montagne")
        metier = self.bloc(["guide", "de montagne"], 30, BLEU_CALCUL).next_to(pers, DOWN, buff=0.15)
        for m in metier:
            m.set_x(pers.get_x())
        self.play(FadeIn(metier, shift=UP * 0.2), run_time=0.4)
        b, bornes = self.parcours()
        self.au_mot("24 kilomètres")
        self.play(b.apparaitre(0.7), FadeIn(bornes), run_time=0.7)
        l1 = VGroup(self.t("matin :", 40, MATIN), EcritureFraction(3, 8, fs=54, couleur=MATIN)).arrange(RIGHT, buff=0.2)
        l2 = VGroup(self.t("après-midi :", 40, APREM), EcritureFraction(1, 4, fs=54, couleur=APREM)).arrange(RIGHT, buff=0.2)
        l1.move_to(P(-1.2, 0.0))
        l2.move_to(P(-1.2, -1.25)).align_to(l1, LEFT)
        self.au_mot("Le matin")
        self.play(FadeIn(l1[0], shift=RIGHT * 0.2), run_time=0.3)
        self.frac(l1[1], "3 huitièmes")
        self.au_mot("L'après-midi")
        self.play(FadeIn(l2[0], shift=RIGHT * 0.2), run_time=0.3)
        self.frac(l2[1], "1 quart")
        self.au_mot("Combien de kilomètres reste")
        q = self.t("Il reste ? km", 44, ORANGE_RETENUE).move_to(P(-0.4, -2.5))
        self.play(FadeIn(q, shift=UP * 0.2), run_time=0.4)
        self.attendre_voix()

    # ── 02 : le plan ────────────────────────────────────────────────────────
    def ecran_plan(self):
        self.ecran("02-plan")
        self.au_mot("étape par étape")
        t1 = self.t("Étape par étape", 54, JAUNE_TITRE).move_to(P(0, 1.6))
        self.play(Write(t1), run_time=0.6)
        marches = VGroup(*[Rectangle(width=1.2, height=0.35 * (i + 1), fill_color=GREY_D, fill_opacity=1,
                                     stroke_color=WHITE, stroke_width=2) for i in range(4)]).arrange(RIGHT, buff=0,
                                                                                                   aligned_edge=DOWN)
        marches.move_to(P(0, 0.0))
        self.play(LaggedStart(*[GrowFromEdge(m, DOWN) for m in marches], lag_ratio=0.2), run_time=0.8)
        self.au_mot("Méthode 1")
        t2 = self.bloc(["Méthode 1 :", "chaque partie en kilomètres"], 44, BLEU_CALCUL).move_to(P(0, -1.8))
        for m in t2:
            m.set_x(0)
        self.poser_lignes(t2, "up", 0.35)
        self.attendre_voix()

    def km_parts(self, b, txt="3", fs=28):
        return VGroup(*[Text(txt, font_size=fs, color=AMBRE).next_to(p, UP, buff=0.3) for p in b.parts])

    # ── 03 : le matin ───────────────────────────────────────────────────────
    def ecran_matin(self):
        self.ecran("03-matin")
        b, bornes = self.parcours()
        self.add(b, bornes)
        l = VGroup(self.t("Matin :", 42, MATIN), EcritureFraction(3, 8, fs=56, couleur=MATIN),
                   self.t("de 24", 42, MATIN)).arrange(RIGHT, buff=0.2)
        self.col(l, -0.55, xl=-5.8)
        self.au_mot("Le matin")
        self.play(FadeIn(l[0], shift=RIGHT * 0.2), run_time=0.3)
        self.frac(l[1], "3 huitièmes")
        self.au_mot("de 24")
        self.play(FadeIn(l[2], shift=RIGHT * 0.2), run_time=0.3)
        self.au_mot("24 divisé par 8")
        k = self.km_parts(b)
        self.calc([("24 ÷ 8 =", WHITE), ("3", VERT_OK)], -1.55, 48, xl=-5.8,
                  avec=[LaggedStart(*[Indicate(p, color=AMBRE, scale_factor=1.1) for p in b.parts], lag_ratio=0.1,
                                    run_time=0.8)])
        self.play(LaggedStart(*[FadeIn(t) for t in k], lag_ratio=0.08), run_time=0.5)
        self.au_mot("3 fois 3")
        self.calc([("3 × 3 =", WHITE), ("9", VERT_OK)], -2.55, 48, xl=-5.8, avec=[b.colorier(range(3), lag=0.2)])
        self.au_mot("9 kilomètres")
        acc = b.accolade(None, couleur=MATIN, dessus=False)
        t9 = self.t("9 km", 40, MATIN).next_to(acc, DOWN, buff=0.1)
        self.play(GrowFromCenter(acc), FadeIn(t9, scale=1.3), run_time=0.5)
        self.attendre_voix()
        return k

    # ── 04 : l'après-midi ───────────────────────────────────────────────────
    def ecran_apres_midi(self, k):
        self.ecran("04-apres-midi")
        b, bornes = self.parcours(3)
        self.add(b, bornes, k)
        l = VGroup(self.t("Après-midi :", 42, APREM), EcritureFraction(1, 4, fs=56, couleur=APREM),
                   self.t("de 24", 42, APREM)).arrange(RIGHT, buff=0.2)
        self.col(l, -0.55, xl=-5.8)
        self.au_mot("L'après-midi")
        self.play(FadeIn(l[0], shift=RIGHT * 0.2), run_time=0.3)
        self.frac(l[1], "1 quart")
        self.play(FadeIn(l[2], shift=RIGHT * 0.2), run_time=0.3)
        self.au_mot("24 divisé par 4")
        quarts = b.groupes(2)
        self.calc([("24 ÷ 4 =", WHITE), ("6", VERT_OK)], -1.55, 48, xl=-5.8,
                  avec=[LaggedStart(*[Create(r) for r in quarts], lag_ratio=0.2, run_time=0.8)])
        self.au_mot("6 kilomètres")
        acc = Brace(VGroup(b.parts[3], b.parts[4]), DOWN, color=APREM)
        t6 = self.t("6 km", 40, APREM).next_to(acc, DOWN, buff=0.1)
        self.play(b.colorier([3, 4], couleur=APREM, lag=0.2), FadeOut(quarts), GrowFromCenter(acc),
                  FadeIn(t6, scale=1.3), run_time=0.6)
        self.attendre_voix()

    # ── 05 : ce qui reste ───────────────────────────────────────────────────
    def ecran_reste(self, k):
        self.ecran("05-reste")
        b, bornes = self.parcours(3, 2)
        self.add(b, bornes, k)
        self.au_mot("9 plus 6")
        self.calc([("9 + 6 =", WHITE), ("15", VERT_OK), ("km marchés", WHITE)], -0.55, 48, xl=-5.8)
        self.au_mot("Il reste 24 moins 15")
        r = SurroundingRectangle(VGroup(*b.parts[5:]), color=AMBRE, buff=0.06, stroke_width=7)
        self.calc([("24 − 15 =", WHITE), ("9", VERT_OK), ("km", WHITE)], -1.55, 48, xl=-5.8, avec=[Create(r)])
        t = self.t("Il reste 9 km !", 50, VERT_OK).move_to(P(-2.0, -2.4))
        t.sans_synchro = True
        self.play(FadeIn(t, scale=1.3), run_time=0.4)
        self.play(Create(self.encadrer(t)), run_time=0.3)
        self.attendre_voix()

    # ── 06 : QUESTION 1 (3/8 + 1/4) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        b, _ = self.parcours(3, 0, y=0.6, largeur=5.6, x=-3.3)
        self.add(b)

        def apres(sc):
            sc.au_mot("1 quart égale 2 huitièmes")
            sc.rep(0, avec=[b.colorier([3, 4], couleur=APREM, run_time=0.6)])
            sc.au_mot("3 plus 2")
            sc.rep(1)
            sc.rep_fin()

        self.question_pause("06-question", "06b-reponse", ["3 huitièmes", "+ 1 quart ?"],
                            [self.inline("4/12"), self.inline("5/8"), self.inline("4/8")], 1,
                            ["1/4 = 2/8", "3 + 2 = 5 : 5/8"], mot_q="3 huitièmes", autres_r=apres)

    # ── 07 : méthode 2, avec les fractions ──────────────────────────────────
    def ecran_methode2(self):
        self.ecran("07-methode2")
        b, bornes = self.parcours(3, 2)
        self.add(b, bornes)
        self.au_mot("Méthode 2")
        tit = self.t("Méthode 2 : avec les fractions", 40, JAUNE_TITRE).move_to(P(0, 3.05))
        self.play(Write(tit), run_time=0.5)
        e1 = expression((5, 8), fs=48)
        l1 = VGroup(self.t("marché :", 40), e1).arrange(RIGHT, buff=0.25)
        self.col(l1, 0.3, xl=-5.8)
        self.au_mot("5 huitièmes du parcours")
        self.play(FadeIn(l1, shift=RIGHT * 0.2), run_time=0.4)
        e2 = expression("tout :", (8, 8), fs=48)
        self.col(e2, 0.3, xl=-1.0)
        self.au_mot("8 huitièmes")
        self.play(FadeIn(e2, shift=RIGHT * 0.2), Indicate(b.contour, color=AMBRE), run_time=0.5)
        self.au_mot("Il reste 8 moins 5")
        e3 = expression("reste :", (8, 8), "−", (5, 8), "=", (3, 8, VERT_OK), fs=48)
        self.col(e3, -1.15, xl=-5.8)
        r = SurroundingRectangle(VGroup(*b.parts[5:]), color=AMBRE, buff=0.06, stroke_width=7)
        self.play(FadeIn(e3[:4], shift=RIGHT * 0.2), Create(r), run_time=0.5)
        self.au_mot("3 huitièmes.")
        self.play(FadeIn(e3[4:], scale=1.2), run_time=0.4)
        self.au_mot("3 huitièmes de 24")
        e4 = self.ligne([("3/8 de 24 =", WHITE), ("9 km", VERT_OK)], 46)
        e4[0].sans_synchro = True
        self.col(e4, -2.3, xl=-5.8)
        self.play(FadeIn(e4[0], shift=RIGHT * 0.2), run_time=0.3)
        self.au_mot("c'est 9 kilomètres")
        self.play(FadeIn(e4[1], scale=1.3), run_time=0.3)
        self.au_mot("Les deux méthodes")
        ok = self.t("même résultat : 9 km !", 38, VERT_OK).next_to(e4, DOWN, buff=0.25).align_to(e4, LEFT)
        self.play(FadeIn(ok, shift=LEFT * 0.2), run_time=0.4)
        self.attendre_voix()

    # ── 08 : QUESTION 2 (3 × 5/4 et 3) ──────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        b1 = Barre(4, 4, largeur=2.6, hauteur=0.55, couleur=VIOLET_PART, marge=0.12, centre=P(-4.7, 0.6))
        b2 = Barre(4, 1, largeur=2.6, hauteur=0.55, couleur=VIOLET_PART, marge=0.12, centre=P(-1.9, 0.6))
        lab = self.t("5 quarts", 34, VIOLET_PART).next_to(VGroup(b1, b2), DOWN, buff=0.25)
        un = self.t("= 1", 34, WHITE).next_to(b1, UP, buff=0.15)

        def apres(sc):
            sc.au_mot("5 quarts, c'est plus")
            sc.rep(0, avec=[FadeIn(b1), FadeIn(b2), FadeIn(lab)])
            sc.play(FadeIn(un), Indicate(b2, color=AMBRE), run_time=0.5)
            sc.au_mot("Donc 3 fois")
            sc.rep(1)
            sc.rep(2)
            sc.rep_fin()

        self.question_pause("08-question", "08b-reponse", ["3 × 5 quarts :", "plus grand ou", "plus petit que 3 ?"],
                            [self.inline("plus petit"), self.inline("égal"), self.inline("plus grand")], 2,
                            ["5 quarts > 1,", "donc 3 × 5 quarts > 3 :", "15 quarts."], mot_q="3 fois 5 quarts",
                            autres_r=apres)

    # ── 09 : défi (40 randonneurs) ──────────────────────────────────────────
    def groupe(self):
        return Grille(4, 10, 0, cote=0.52, couleur=MATIN, centre=P(-3.5, 0.3))

    def ecran_defi(self):
        self.ecran("09-defi", 0.65)
        g = self.groupe()
        self.au_mot("À toi de jouer")
        tit = self.col(self.t("À toi de jouer !", 50, JAUNE_TITRE), 3.0)
        self.play(Write(tit), run_time=0.6)
        self.au_mot("40 randonneurs")
        l0 = self.col(self.ligne([("40", BLEU_CALCUL), ("randonneurs", WHITE)], 40), 2.15)
        self.play(g.apparaitre(0.8), FadeIn(l0, shift=RIGHT * 0.2), run_time=0.8)
        l1 = VGroup(EcritureFraction(1, 4, fs=42, couleur=MATIN), self.t("enfants", 38, MATIN)).arrange(RIGHT, buff=0.2)
        l2 = VGroup(EcritureFraction(3, 10, fs=42, couleur=APREM), self.t("ados", 38, APREM)).arrange(RIGHT, buff=0.2)
        l3 = self.t("les autres : adultes", 38, WHITE)
        self.col(l1, 1.2)
        self.col(l2, 0.15)
        self.col(l3, -0.75)
        self.frac(l1[0], "1 quart")
        self.au_mot("des enfants")
        self.play(FadeIn(l1[1], shift=RIGHT * 0.15), run_time=0.3)
        self.frac(l2[0], "3 dixièmes")
        self.au_mot("des ados")
        self.play(FadeIn(l2[1], shift=RIGHT * 0.15), run_time=0.3)
        self.au_mot("Les autres")
        self.play(FadeIn(l3, shift=RIGHT * 0.15), run_time=0.3)
        self.au_mot("Combien y a-t-il d'adultes")
        q = self.col(self.t("Combien d'adultes ?", 40, ORANGE_RETENUE), -1.5)
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.3)
        self.pause_defi(y=-2.3, marge=2.0)

    def ecran_correction(self):
        self.ecran("09b-correction", 0.65)
        g = self.groupe()
        self.add(g)
        tit = self.col(self.t("Correction", 50, JAUNE_TITRE), 3.0)
        self.play(Write(tit), run_time=0.5)
        self.au_mot("40 divisé par 4")
        self.calc([("40 ÷ 4 =", WHITE), ("10", MATIN), ("enfants", MATIN)], 2.0, 40)
        self.play(g.colorier(range(10), couleur=MATIN, lag=0.04), run_time=0.6)
        self.au_mot("40 divisé par 10")
        self.calc([("40 ÷ 10 =", WHITE), ("4", APREM)], 1.1, 40)
        self.au_mot("3 fois 4")
        self.calc([("3 × 4 =", WHITE), ("12", APREM), ("ados", APREM)], 0.2, 40,
                  avec=[g.colorier(range(10, 22), couleur=APREM, lag=0.04, run_time=0.7)])
        self.au_mot("10 plus 12")
        self.calc([("10 + 12 =", WHITE), ("22", WHITE)], -0.7, 40)
        self.au_mot("Il reste 40 moins 22")
        self.calc([("40 − 22 =", WHITE), ("18", VERT_OK), ("adultes", VERT_OK)], -1.6, 44,
                  avec=[LaggedStart(*[Indicate(g.liste[i], color=VERT_OK, scale_factor=1.2) for i in range(22, 40)],
                                    lag_ratio=0.04, run_time=0.8)])
        self.attendre_voix()

    # ── 10 : la chaîne 18/40 → 45 % ─────────────────────────────────────────
    def ecran_chaine(self):
        self.ecran("10-chaine")
        self.au_mot("Bonus")
        tit = self.t("Bonus : en pourcentage ?", 46, JAUNE_TITRE).move_to(P(0, 3.0))
        self.play(Write(tit), run_time=0.5)
        fs = 64
        fa, fb, fc = EcritureFraction(18, 40, fs=fs), EcritureFraction(9, 20, fs=fs), EcritureFraction(45, 100, fs=fs)
        d, p = self.t("0,45", 60, BLEU_CALCUL), self.t("45 %", 60, VERT_OK)
        ch = VGroup(fa, fb, fc, d, p).arrange(RIGHT, buff=1.0).move_to(P(-0.4, 0.6))
        sig = VGroup(*[self.t("=", 56).move_to((ch[i].get_right() + ch[i + 1].get_left()) / 2).set_y(fa.trait.get_y())
                       for i in range(4)])
        for s_ in sig:
            s_.sans_synchro = True
        h1, b1 = fleches(fa, fb, "÷ 2", fs=32, angle=TAU / 6)
        h2, b2 = fleches(fb, fc, "× 5", fs=32, angle=TAU / 6)
        self.au_mot("18 adultes sur 40")
        self.play(FadeIn(fa, scale=1.3), run_time=0.4)
        self.au_mot("On simplifie par 2")
        self.play(Create(h1[0]), FadeIn(h1[1]), Create(b1[0]), FadeIn(b1[1]), run_time=0.5)
        self.au_mot("9 vingtièmes")
        self.play(FadeIn(sig[0]), FadeIn(fb, scale=1.3), run_time=0.4)
        self.au_mot("On multiplie par 5")
        self.play(Create(h2[0]), FadeIn(h2[1]), Create(b2[0]), FadeIn(b2[1]), run_time=0.5)
        self.au_mot("45 centièmes")
        self.play(FadeIn(sig[1]), FadeIn(fc, scale=1.3), run_time=0.4)
        self.au_mot("0,45, c'est")
        self.play(FadeIn(sig[2]), FadeIn(d, scale=1.3), run_time=0.4)
        self.au_mot("45 %")
        self.play(FadeIn(sig[3]), FadeIn(p, scale=1.3), run_time=0.4)
        noms = [self.t(s_, 28, AMBRE).set_x(m.get_x()) for s_, m in
                zip(("simplifié", "sur 100", "décimal", "pourcentage"), (fb, fc, d, p))]
        for n_ in noms:
            n_.set_y(-1.4)
            n_.sans_synchro = True
        self.play(Create(self.encadrer(p)), LaggedStart(*[FadeIn(n_) for n_ in noms], lag_ratio=0.2), run_time=0.8)
        self.attendre_voix()

    # ── 11 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("11-finale", 0.65)
        b, bornes = self.parcours(3, 2, y=0, largeur=4.6, x=0)
        lab = self.t("il reste 9 km", 34, VERT_OK).next_to(b, DOWN, buff=0.3)
        fig = VGroup(b, bornes, lab)
        self.add(fig)
        lignes = self.finale_colonne(figure=fig, textes=[("Un défi : étape", "par étape."),
                                                         ("Chaque part en nombre,", "ou avec les fractions."),
                                                         ("On vérifie : même", "résultat par les 2 méthodes.")],
                                     fs=36)
        self.au_mot("Un défi")
        self.montrer_ligne(lignes[0])
        self.au_mot("On calcule chaque part")
        self.montrer_ligne(lignes[1])
        self.au_mot("Et on vérifie")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_plan()
        k = self.ecran_matin()
        self.ecran_apres_midi(k)
        self.ecran_reste(k)
        self.ecran_question1()
        self.ecran_methode2()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_chaine()
        self.ecran_finale()
        self.page_abonnement("12-abonne")


class FracCalculDefi6e(FracCalculDefiBase):
    identite = "Maths 6e — EleveAI"
    ceinture = "verte"
