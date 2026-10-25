# stats_ajust_equation.py
# EleveAI — Maths STMG — série « Statistiques », LYCÉE : 22-ajust-equation
# (micro du coach statT_ajust_equation : « Déterminer l'équation d'une droite
# d'ajustement affine »), AVEC VOIX. Paysage 16:9. CEINTURE BLEUE (calcul de a
# et de b, lecture de a dans la situation, calculatrice des moindres carrés :
# les quatre gabarits de la banque, niveau terminale). Short jumeau :
# stats_ajust_equation_short.py (ORANGE).
#
# ⭐ Décor et métier : la SANTÉ et la retraite (centres d'intérêt : corps-sante,
# sciences) ; une ACTUAIRE (assurances, pensions : problématique : prévoir).
# ⭐ DONNÉES RÉELLES, vérifiées le 24/10/2026 : espérance de vie à la naissance,
# Insee, Bilan démographique 2023, tableaux rétrospectifs « Espérance de vie –
# Mortalité » (https://www.insee.fr/fr/statistiques/7746166), France métropolitaine
# jusqu'en 1990 puis France : femmes 1960 73,6 · 1970 75,9 · 1980 78,4 ·
# 1990 81,0 · 2000 82,8 · 2010 84,6 ; hommes 1960 67,0 · 2010 78,0.
#   x = années depuis 1950 (10, 20, …, 60). Droite par le premier et le dernier
#   point : a = 11 ÷ 50 = 0,22 ; b = 73,6 − 0,22 × 10 = 71,4. Moindres carrés
#   (calculé) : y ≈ 0,224 x + 71,55 → « 0,22 x + 71,55 ». 0,22 an ≈ 2,6 mois.
#   Hommes : a = 0,22, b = 64,8.
# ⭐ Figure du coach : `fonctionGraphique`, droite BLEUE. ⛔ PAS D'ÉCART.
#
# Mapping micro → écrans : statT_ajust_equation tpl_1 (droite par deux points)
# → 03, 04, question 05, défi · tpl_2 (sens du coefficient) → 06, question 08 ·
# tpl_3 / tpl_4 (calculatrice, moindres carrés) → 07.
# Écrans : 00 garde · 01 l'actuaire · 02 les données · 03 le coefficient a ·
# 04 l'ordonnée b · 05 QUESTION · 06 ce que veut dire a · 07 la calculatrice ·
# 08 QUESTION · 09 défi · 09b correction · 10 ce que tu as appris · 11 fin.
#
# Voix : manim/voix/stmg-stats-ajust-equation.json (débit −7) ; marques :
# manim/scripts/stmg/stats_ajust_equation_marques.json.
# python -m manim render -qh --disable_caching manim/scripts/stmg/stats_ajust_equation.py StatsAjustEquationStmg -o eleveai-maths-stmg-stats-ajust-equation --media_dir manim/scripts/stmg/media-stats-ajust-equation-stmg
# Sortie : manim/sorties/stmg/maths/statistiques/22-ajust-equation/eleveai-maths-stmg-stats-ajust-equation.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats_lycee_j1_commun import *  # noqa: E402,F403

XS = [10, 20, 30, 40, 50, 60]
EV = [73.6, 75.9, 78.4, 81.0, 82.8, 84.6]
A, B = 0.22, 71.4
G = P(-3.45, -0.3)


def coeur(h=1.0, couleur="#f43f5e"):
    """Un cœur dessiné (la santé)."""
    c1 = Circle(radius=0.3 * h, fill_color=couleur, fill_opacity=1, stroke_width=0).shift(LEFT * 0.21 * h)
    c2 = c1.copy().shift(RIGHT * 0.42 * h)
    pointe = Polygon(P(-0.49, -0.1) * h, P(0.49, -0.1) * h, P(0, -0.62) * h, fill_color=couleur, fill_opacity=1,
                     stroke_width=0)
    return VGroup(c1, c2, pointe).shift(UP * 0.1 * h)


class StatsAjustEquationBase(PaysageJ1):
    nom_voix = "stmg-stats-ajust-equation"
    fichier_marques = "stats_ajust_equation_marques.json"

    def nuage(self, ys=EV, centre=G):
        n = Nuage(XS, ys, 0, 70, 60, 90, pas_x=10, pas_y=5, fin_x=5, fin_y=1, largeur=5.6, hauteur=4.2,
                  nom_x="Années depuis 1950", nom_y="Espérance de vie (années)", fs=24, centre=centre)
        return self.cadrer(n)

    def pret(self, ys=EV):
        n = self.nuage(ys)
        self.add(n.fond, *n.ronds)
        return n

    def eq(self, a="0,22", b="71,4", fs=40, c=BLEU_CLAIR):
        return self.ligne([("y =", WHITE), (a, AMBRE), ("x +", WHITE), (b, VIOLET_CLAIR)], fs, 0.15)

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("L'équation d'une droite d'ajustement", self.identite, self.ceinture)
        n = self.nuage().scale(0.6).move_to(P(-2.6, 0.1))
        e = self.ligne([("y =", WHITE), ("a", AMBRE), ("x +", WHITE), ("b", VIOLET_CLAIR)], 64).move_to(P(2.6, 0.2))
        self.au_mot("Trouver l'équation")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), FadeIn(n), run_time=0.7)
        self.play(Write(e), run_time=0.6)
        self.au_mot("Deux points")
        self.play(n.allumer(0), n.allumer(5), run_time=0.4)
        self.play(Create(droite(n, A, B)), run_time=0.6)
        self.attendre_voix(marge=0.8)

    # ── 01 : l'actuaire ─────────────────────────────────────────────────────

    def ecran_situation(self):
        self.ecran("01-situation")
        self.au_mot("Une actuaire")
        c = coeur(1.4).move_to(P(-3.6, 1.0))
        m = self.t("Actuaire", 48, BLEU_CALCUL).move_to(P(-3.6, -0.8))
        self.play(FadeIn(c, scale=0.5), FadeIn(m, shift=UP * 0.2), run_time=0.6)
        self.au_mot("calcule les pensions")
        self.poser(self.bloc(["Elle calcule les retraites", "et les assurances."], 38), 2.45)
        self.au_mot("combien de temps on vit")
        self.poser(self.bloc(["Elle doit prévoir", "combien de temps on vit."], 38, JAUNE_TITRE), 1.0)
        self.play(c.animate.scale(1.15), run_time=0.25)
        self.play(c.animate.scale(1 / 1.15), run_time=0.25)
        self.au_mot("l'espérance de vie des femmes")
        self.poser(self.bloc(["L'espérance de vie", "des femmes en France (Insee)"], 34), -0.4)
        self.attendre_voix()

    # ── 02 : les données ────────────────────────────────────────────────────

    def ecran_donnees(self):
        self.ecran("02-donnees")
        n = self.nuage()
        self.play(FadeIn(n.fond), run_time=0.3)
        self.au_mot("En abscisse")
        self.play(Indicate(n.nom_x, color=ORANGE_V, scale_factor=1.2), run_time=0.5)
        l1 = self.ligne([("10", ORANGE_V), ("→ 1960", WHITE)], 36)
        l2 = self.ligne([("60", ORANGE_V), ("→ 2010", WHITE)], 36)
        self.col(VGroup(l1, l2).arrange(RIGHT, buff=0.6), 2.6)
        self.au_mot("10 pour")
        self.play(FadeIn(l1[0]), FadeIn(n.lu_x(10), scale=1.4), run_time=0.3)
        self.reveler([(l1[1], "1960,")])
        self.au_mot("60 pour")
        self.play(FadeIn(l2[0]), FadeIn(n.lu_x(60), scale=1.4), run_time=0.3)
        self.reveler([(l2[1], "2010. En")])
        self.au_mot("En ordonnée")
        self.play(Indicate(n.nom_y, color=VIOLET_H, scale_factor=1.15), run_time=0.5)
        mots = ["73,6 en 1960", "75,9", "78,4", "81,", "82,8", "84,6 en 2010"]
        vals = ["73,6", "75,9", "78,4", "81", "82,8", "84,6"]
        lig = VGroup(*[self.t(v, 34, VIOLET_CLAIR) for v in vals]).arrange(RIGHT, buff=0.3)
        self.col(lig, 1.65)
        for i, (mot, t) in enumerate(zip(mots, lig)):
            self.au_mot(mot)
            self.play(FadeIn(n.ronds[i], scale=3), FadeIn(t, shift=UP * 0.15), run_time=0.3)
        self.au_mot("presque alignés")
        self.poser(self.bloc(["Points presque alignés :", "ajustement affine"], 36, VERT_OK), 0.55)
        self.attendre_voix()


    # ── 03 : le coefficient directeur ───────────────────────────────────────

    def ecran_coef(self):
        self.ecran("03-coef")
        n = self.pret()
        self.au_mot("le premier et le dernier point")
        self.play(n.allumer(0), n.allumer(5), run_time=0.4)
        self.play(Create(droite(n, A, B)), run_time=0.7)
        p = self.ligne([("(10 ;", ROUGE_PT), ("73,6)", ROUGE_PT), ("et", WHITE), ("(60 ;", ROUGE_PT), ("84,6)", ROUGE_PT)],
                       34, 0.12)
        self.col(p, 2.75)
        e0, e5 = self.etiq2(n, 0, 10, "73,6", DR), self.etiq2(n, 5, 60, "84,6", LEFT)
        self.reveler([(VGroup(p[0], e0[0]), "10 ;"), (VGroup(p[1], e0[1]), "73,6 et"),
                      (VGroup(p[2], p[3], e5[0]), "60 ;"), (VGroup(p[4], e5[1]), "84,6. D")])
        self.au_mot("D'abord le coefficient directeur")
        self.poser(self.ligne([("1.", AMBRE), ("le coefficient directeur", WHITE), ("a", AMBRE)], 36), 1.95)
        self.au_mot("la différence des y")
        f = fraction(self.t("différence des y", 30, VIOLET_CLAIR), self.t("différence des x", 30, ORANGE_V), 30)
        g = VGroup(self.t("a =", 36, AMBRE), f).arrange(RIGHT, buff=0.2)
        self.poser(g, 0.95)
        coin = n.p(60, 73.6)
        dx = Line(n.ronds[0].get_center(), coin, color=ORANGE_V, stroke_width=6)
        dy = Line(coin, n.ronds[5].get_center(), color=VIOLET_H, stroke_width=6)
        num = self.ligne([("84,6 −", VIOLET_CLAIR), ("73,6", VIOLET_CLAIR)], 34, 0.12)
        den = self.ligne([("60 −", ORANGE_V), ("10", ORANGE_V)], 34, 0.12)
        f2 = fraction(num, den, 34)
        g2 = VGroup(self.t("a =", 38, AMBRE), f2).arrange(RIGHT, buff=0.2)
        r = self.ligne([("=", WHITE), ("11 ÷ 50", WHITE), ("=", WHITE), ("0,22", AMBRE)], 38)
        self.col(g2, -0.35)
        self.col(r, -1.35, xl=self.XL + 0.6)
        self.au_mot("84,6 moins")
        self.play(FadeIn(g2[0]), FadeIn(num[0]), FadeIn(f2[1]), run_time=0.3)
        self.au_mot("73,6, 11")
        self.play(FadeIn(num[1]), Create(dy), run_time=0.3)
        self.au_mot("11, divisé")
        e11 = texte("11", 22, VIOLET_H).set_stroke(WHITE, 5, background=True).scale(n._k()).next_to(dy, RIGHT, buff=0.08)
        self.play(FadeIn(e11, scale=1.4), run_time=0.3)
        self.au_mot("60 moins")
        self.play(FadeIn(den[0]), Create(dx), run_time=0.3)
        self.au_mot("10, 50")
        self.play(FadeIn(den[1]), run_time=0.25)
        self.au_mot("50.")
        e50 = texte("50", 22, ORANGE_V).set_stroke(WHITE, 5, background=True).scale(n._k()).next_to(dx, DOWN, buff=0.06)
        self.play(FadeIn(e50, scale=1.4), FadeIn(r[:2]), run_time=0.3)
        self.au_mot("0,22.")
        self.play(FadeIn(r[2:], shift=RIGHT * 0.2), run_time=0.3)
        self.insister(r[-1], 1.4)
        self.attendre_voix()


    # ── 04 : l'ordonnée à l'origine ─────────────────────────────────────────

    def ecran_ordonnee(self):
        self.ecran("04-ordonnee")
        n = self.pret()
        d = droite(n, A, B)
        self.add(d)
        self.au_mot("Ensuite l'ordonnée")
        self.poser(self.ligne([("2.", AMBRE), ("l'ordonnée à l'origine", WHITE), ("b", VIOLET_CLAIR)], 36), 2.6)
        self.au_mot("passe par le premier point")
        self.play(n.allumer(0), run_time=0.3)
        l1 = self.col(self.ligne([("73,6", ROUGE_PT), ("=", WHITE), ("0,22", AMBRE), ("×", WHITE), ("10", ORANGE_V),
                                  ("+", WHITE), ("b", VIOLET_CLAIR)], 40), 1.6)
        self.reveler([(l1[:2], "73,6 égale"), (l1[2:4], "0,22 fois"), (l1[4:], "10, plus")])
        l2 = self.col(self.ligne([("b", VIOLET_CLAIR), ("=", WHITE), ("73,6", WHITE), ("−", WHITE), ("2,2", WHITE),
                                  ("=", WHITE), ("71,4", VIOLET_CLAIR)], 40), 0.7)
        self.reveler([(l2[:4], "b égale"), (l2[4], "2,2 :")])
        self.au_mot("71,4. L")
        prol = DashedLine(n.p(0, B), n.p(10, A * 10 + B), color=BLEU_D, stroke_width=5)
        self.play(FadeIn(l2[5:], scale=1.3), Create(prol), FadeIn(n.lu_y(71.4)), run_time=0.5)
        e = self.col(self.eq(), -0.45)
        self.au_mot("L'équation")
        self.play(FadeIn(e[0]), run_time=0.25)
        self.reveler([(e[1:3], "0,22 x plus"), (e[3], ("71,4.", 2))])
        self.play(Create(self.encadrer(e)), run_time=0.4)
        self.attendre_voix()


    # ── 05 : QUESTION 1 ─────────────────────────────────────────────────────

    def ecran_question1(self):
        n = Nuage([2, 6], [30, 50], 0, 8, 0, 60, pas_x=2, pas_y=10, fin_x=1, fin_y=5, largeur=5.0, hauteur=4.0, fs=24,
                  centre=G)
        n = self.cadrer(n)
        fig = VGroup(n.fond, *n.ronds, droite(n, 5, 20))
        e1, e2 = self.etiq2(n, 0, 2, 30, DR), self.etiq2(n, 1, 6, 50, UL)

        self.clear()
        self.add_mascotte(scale=0.5)
        self.add(fig)
        self.question_pause("05-question", "05b-reponse", ["Une droite passe par", "ces deux points.",
                                                           "Son coefficient directeur ?"],
                            ["5", "0,2", "20"], 0, ["20 ÷ 4 = 5.", "B renverse, C oublie de diviser."],
                            mots_q=["Une droite", "les points", "Que vaut"], mots_choix=["5. B", "0,2. C", "20. Mets"],
                            mots_ph=["4 : 5", "B renverse"],
                            gestes_q={2: [("2 ; 30", lambda sc: sc.play(FadeIn(e1[0]), run_time=0.2)),
                                          ("30 et", lambda sc: sc.play(FadeIn(e1[1]), run_time=0.2)),
                                          ("6 ; 50", lambda sc: sc.play(FadeIn(e2[0]), run_time=0.2)),
                                          ("50. Que", lambda sc: sc.play(FadeIn(e2[1]), run_time=0.2))]})


    # ── 06 : ce que veut dire a ─────────────────────────────────────────────

    def ecran_sens(self):
        self.ecran("06-sens")
        n = self.pret()
        self.add(droite(n, A, B))
        self.au_mot("Que veut dire")
        q = self.col(self.ligne([("Que veut dire", WHITE), ("0,22", AMBRE), ("?", WHITE)], 42), 2.75)
        self.play(FadeIn(q[0]), run_time=0.25)
        self.reveler([(q[1:], "0,22 ?")])
        x0 = 40
        st = VGroup(Line(n.p(x0, A * x0 + B), n.p(x0 + 10, A * x0 + B), color=ORANGE_V, stroke_width=6),
                    Line(n.p(x0 + 10, A * x0 + B), n.p(x0 + 10, A * (x0 + 10) + B), color=VIOLET_H, stroke_width=6))
        self.au_mot("1, donc")
        self.play(Create(st[0]), run_time=0.4)
        self.poser(self.ligne([("x + 1", ORANGE_V), ("(une année de plus)", WHITE)], 34), 1.8)
        self.au_mot("0,22 an :")
        self.play(Create(st[1]), run_time=0.4)
        self.poser(self.ligne([("y + 0,22", VIOLET_CLAIR), ("an", WHITE)], 38), 1.0)
        self.au_mot("2 mois et demi")
        m = self.poser(self.bloc(["≈ 2 mois et demi", "par an !"], 44, VERT_OK), -0.05, "pop")
        self.insister(m, 1.1, 0.3)
        self.au_mot("qui s'ajoute")
        self.poser(self.t("+ 0,22 chaque année : ça s'ajoute", 32), -1.2)
        self.attendre_voix()


    # ── 07 : la calculatrice ────────────────────────────────────────────────

    def calculatrice(self, h=3.2):
        corps = RoundedRectangle(width=h * 0.6, height=h, corner_radius=0.18, fill_color="#1f2937", fill_opacity=1,
                                 stroke_color=GREY_B, stroke_width=3)
        ecran = RoundedRectangle(width=h * 0.5, height=h * 0.32, corner_radius=0.06, fill_color="#d9f99d",
                                 fill_opacity=1, stroke_width=0).move_to(corps.get_top() + DOWN * h * 0.22)
        touches = VGroup(*[RoundedRectangle(width=h * 0.11, height=h * 0.07, corner_radius=0.02, fill_color=GREY_D,
                                            fill_opacity=1, stroke_width=0) for _ in range(12)])
        touches.arrange_in_grid(4, 3, buff=h * 0.04).move_to(corps.get_center() + DOWN * h * 0.2)
        return VGroup(corps, ecran, touches)

    def ecran_calculatrice(self):
        self.ecran("07-calculatrice")
        n = self.pret()
        d = droite(n, A, B)
        self.add(d)
        self.au_mot("Et la calculatrice")
        c = self.calculatrice(2.5).move_to(P(1.85, -0.5))
        self.play(FadeIn(c, shift=UP * 0.3), run_time=0.5)
        self.au_mot("la régression linéaire")
        self.poser(self.ligne([("Calculatrice :", WHITE), ("régression linéaire", AMBRE)], 32), 2.8)
        r2 = VGroup(self.t("a=0,22", 18, "#1e293b"), self.t("b=71,55", 18, "#1e293b")).arrange(DOWN, buff=0.05)
        r2.move_to(c[1])
        e = self.ligne([("y =", WHITE), ("0,22", AMBRE), ("x +", WHITE), ("71,55", VIOLET_CLAIR)], 40)
        self.col(e, 1.95)
        self.au_mot("y égale")
        self.play(FadeIn(e[0]), run_time=0.2)
        self.reveler([(VGroup(e[1:3], r2[0]), "0,22 x"), (VGroup(e[3], r2[1]), "71,55.")])
        self.au_mot("Presque la même droite")
        mc = droite(n, 0.224, 71.55, VERT_ECART, 4)
        self.play(Create(mc), run_time=0.6)
        t = self.bloc(["Presque la même,", "mais avec TOUS", "les points"], 32, VERT_OK)
        t.scale_to_fit_width(min(t.width, self.BORD_X - 0.15 - 3.35))
        t.move_to(P(0, -0.5)).align_to(P(3.35, 0), LEFT)
        self.play(FadeIn(t, shift=LEFT * 0.2), run_time=0.45)
        self.au_mot("pas seulement de deux")
        self.play(*[Indicate(r, color=AMBRE, scale_factor=1.6) for r in n.ronds], run_time=0.7)
        self.attendre_voix()

    # ── 08 : QUESTION 2 ─────────────────────────────────────────────────────

    def ecran_question2(self):
        n = self.nuage()
        fig = VGroup(n.fond, *n.ronds, droite(n, A, B))
        self.ecran_question("08-question", "08b-reponse", ["y = 0,22x + 71,4 :", "que signifie 0,22 ?"],
                            ["× 0,22 chaque année", "+ 0,22 an environ par an", "0,22 an en 1950"], 1,
                            ["Un ajustement affine ajoute ;", "la valeur pour x = 0, c'est b."],
                            figure=fig, mots_q=["71,4, que", "0,22 ?"],
                            mots_choix=["0,22 chaque", "0,22 an chaque", "1950"],
                            mots_ph=["Un ajustement affine ajoute", "c'est b"])

    # ── 09 : défi ───────────────────────────────────────────────────────────

    def n_hommes(self):
        n = Nuage([10, 60], [67.0, 78.0], 0, 70, 60, 90, pas_x=10, pas_y=5, fin_x=5, fin_y=1, largeur=5.6, hauteur=4.2,
                  nom_x="Années depuis 1950", nom_y="Espérance de vie, hommes", fs=24, centre=G)
        return self.cadrer(n)

    def ecran_defi(self):
        self.ecran("09-defi", 0.65)
        n = self.n_hommes()
        self.add(n.fond)
        self.au_mot("À toi de jouer")
        self.titre_col("À toi de jouer", JAUNE_TITRE, 2.85, 50)
        l1 = self.col(self.ligne([("Hommes :", WHITE), ("67 ans", VIOLET_CLAIR), ("en 1960", WHITE)], 34), 1.95)
        l2 = self.col(self.ligne([("78 ans", VIOLET_CLAIR), ("en 2010", WHITE)], 34), 1.35)
        self.au_mot("Chez les hommes")
        self.play(FadeIn(l1[0]), run_time=0.25)
        self.reveler([(VGroup(l1[1], n.ronds[0]), "67 ans"), (l1[2], "1960,"),
                      (VGroup(l2[0], n.ronds[1]), "78 ans"), (l2[1], "2010.")])
        self.au_mot("Un : trouve le coefficient")
        self.poser(self.ligne([("1.", AMBRE), ("le coefficient directeur", WHITE), ("a", AMBRE)], 34), 0.5)
        self.au_mot("Deux : trouve son ordonnée")
        self.poser(self.ligne([("2.", AMBRE), ("l'ordonnée à l'origine", WHITE), ("b", VIOLET_CLAIR)], 34), -0.2)
        self.pause_defi(-1.3)

    def ecran_correction(self):
        self.ecran("09b-correction", 0.65)
        n = self.n_hommes()
        self.add(n.fond, n.ronds)
        self.titre_col("Correction", JAUNE_TITRE, 2.85, 50)
        num = self.ligne([("78 −", VIOLET_CLAIR), ("67", VIOLET_CLAIR)], 32, 0.12)
        den = self.t("50", 32, ORANGE_V)
        f = fraction(num, den, 32)
        g = VGroup(self.t("1. a =", 36, AMBRE), f, self.t("=", 38), self.t("0,22", 38, AMBRE)).arrange(RIGHT, buff=0.2)
        self.col(g, 1.75)
        self.au_mot("78 moins")
        self.play(FadeIn(g[0]), FadeIn(num[0]), FadeIn(f[1]), run_time=0.3)
        self.reveler([(num[1], "67, 11"), (den, "50 :")])
        self.au_mot("0,22, le")
        self.play(FadeIn(g[2:], scale=1.3), Create(droite(n, 0.22, 64.8)), run_time=0.5)
        self.au_mot("le même rythme")
        self.poser(self.t("le même rythme que les femmes !", 30, VERT_OK), 0.85)
        l2 = self.col(self.ligne([("2. b =", VIOLET_CLAIR), ("67 −", WHITE), ("0,22 × 10", WHITE), ("=", WHITE),
                                  ("64,8", VIOLET_CLAIR)], 34), 0.1)
        self.au_mot("b égale")
        self.play(FadeIn(l2[0]), run_time=0.25)
        self.reveler([(l2[1], "67 moins"), (l2[2], "10, soit"), (l2[3:], "64,8. L")])
        e = self.col(self.eq("0,22", "64,8", 38), -1.2)
        self.au_mot("L'équation")
        self.play(FadeIn(e[0]), run_time=0.25)
        self.reveler([(e[1:3], "0,22 x plus"), (e[3], ("64,8.", 2))])
        self.play(Create(self.encadrer(e)), run_time=0.4)
        self.attendre_voix()

    # ── 10 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.ecran("10-finale", 0.65)
        n = self.pret()
        lignes = self.finale_colonne(figure=n, textes=[
            ("a = différence des y", "÷ différence des x"),
            ("Je remplace un point dans", "y = ax + b pour trouver b."),
            ("a : ce que y gagne quand", "x augmente de 1.")])
        self.au_mot("Avec deux points")
        self.montrer_ligne(lignes[0], n.allumer(0), n.allumer(5))
        self.au_mot("Puis je remplace")
        self.montrer_ligne(lignes[1], Create(droite(n, A, B)))
        self.au_mot("Et a se lit")
        self.play(Create(lignes[2][0]), FadeIn(lignes[2][1][0], shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("1.")
        self.play(FadeIn(lignes[2][1][1], shift=RIGHT * 0.2), run_time=0.3)
        self.attendre_voix(marge=1.0)

    def etiq2(self, n, i, a, b, d):
        """Une étiquette « (a ; b) » en deux morceaux, pour les montrer chacun au mot."""
        g = VGroup(texte(f"({a} ;", 20, ROUGE_PT), texte(f"{b})", 20, ROUGE_PT)).arrange(RIGHT, buff=0.08)
        g.set_stroke(WHITE, 5, background=True).scale(n._k())
        return g.next_to(n.ronds[i], d, buff=0.06)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_donnees()
        self.ecran_coef()
        self.ecran_ordonnee()
        self.ecran_question1()
        self.ecran_sens()
        self.ecran_calculatrice()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("11-abonne")


class StatsAjustEquationStmg(StatsAjustEquationBase):
    identite = "Maths STMG — EleveAI"
    ceinture = "bleue"
