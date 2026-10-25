# frac_rationnel.py
# EleveAI — Maths 4e — série « Fractions », épisode 04 : LES NOMBRES RATIONNELS
# (micro du coach : fraction_rationnel, « Reconnaître qu'un nombre est
# rationnel et passer d'une écriture à une autre »), AVEC VOIX. Paysage 16:9,
# CEINTURE VERTE : la paysage complète du niveau 4e (définition a/b, b ≠ 0,
# entiers, NÉGATIFS, décimaux, rationnel non décimal, pièges, défi corrigé).
# Short jumeau : frac_rationnel_short.py (la roue magique de 1/7).
#
# Décor et métier : le FOOTBALL ; Nadia, ANALYSTE DE DONNÉES d'un club.
# ⭐ Donnée RÉELLE (demande de Frédéric : des footballeurs que les élèves
# adorent) : Kylian Mbappé, Coupe du monde 2022 : 8 buts en 7 matchs (meilleur
# buteur). Vérifié le 25/10/2026 par WebSearch : ESPN « Kylian Mbappe at the
# World Cup: History, results, stats » (eight goals in seven matches in 2022) ;
# goal.com / soccerway.com (8 buts, Soulier d'or). 8/7 = 1,142857… (non décimal).
# Défi : une joueuse du club, 12 buts en 8 matchs (inventé) → 3/2 = 1,5.
# Centres : sport.
# Vérifié (Python) : 8/7 = 1,142857142857… ; 3 × 0,33 = 0,99 ; 12/8 = 3/2 = 1,5.
#
# Micro → écrans : quotient de deux entiers (02), définition a/b, b ≠ 0 (03,
# question 2 = genEstRationnel « n/0 »), entiers / négatifs / décimaux (04 =
# genEcritureFractionnaire), −1,3 = −13/10 (question 1, leurre du coach : le
# signe perdu), décimal → fraction (06), rationnel non décimal (08, question 3).
# Écrans : 00 garde · 01 Nadia · 02 8 ÷ 7 ne s'arrête pas · 03 la définition ·
# 04 tous rationnels · 05 QUESTION 1 · 06 décimal → fraction · 07 QUESTION 2 ·
# 08 le piège 1/3 · 09 QUESTION 3 · 10 défi · 10b correction · 11 ce que tu as
# appris · 12 fin.
#
# ⭐ Bases : 4e/frac_lotd_commun.py ; canvas_fractions.py (non modifié).
# Ajouté ici : analyste(), ballon_foot(), panneau_stats().
# Voix : manim/voix/4e-frac-rationnel.json (débit −10) ; marques : 4e/frac_rationnel_marques.json.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/frac_rationnel.py FracRationnel4e
# python -m manim render -qh --disable_caching manim/scripts/4e/frac_rationnel.py FracRationnel4e -o eleveai-maths-4e-frac-rationnel --media_dir manim/scripts/4e/media-frac-rationnel
# Sortie : manim/sorties/4e/maths/fractions/04-rationnel/eleveai-maths-4e-frac-rationnel.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from frac_lotd_commun import *  # noqa: E402,F403

PELOUSE = "#16a34a"


def ballon_foot(r=0.3):
    b = Circle(radius=r, fill_color=WHITE, fill_opacity=1, stroke_color="#111827", stroke_width=3)
    pent = RegularPolygon(5, fill_color="#111827", fill_opacity=1, stroke_width=0).scale(r * 0.38)
    taches = VGroup(*[RegularPolygon(5, fill_color="#111827", fill_opacity=1, stroke_width=0).scale(r * 0.2)
                      .move_to(r * 0.78 * np.array([np.cos(a), np.sin(a), 0])) for a in np.linspace(PI / 2, PI / 2 + TAU, 5, endpoint=False)])
    return VGroup(b, pent, taches)


def analyste(s=1.0):
    """Nadia : maillot du club, un ordinateur portable."""
    p = personne(peau=PEAUX[4], tenue="#2563eb", cheveux="#111827", longs=True)
    bande = Rectangle(width=1.0, height=0.12, fill_color=WHITE, fill_opacity=1, stroke_width=0).move_to(P(0, -0.85))
    pc = VGroup(RoundedRectangle(width=0.9, height=0.55, corner_radius=0.05, fill_color="#0f172a", fill_opacity=1,
                                 stroke_color="#94a3b8", stroke_width=3),
                Rectangle(width=1.05, height=0.08, fill_color="#94a3b8", fill_opacity=1, stroke_width=0).shift(DOWN * 0.31)
                ).move_to(P(0.45, -1.35))
    barres = VGroup(*[Rectangle(width=0.1, height=h, fill_color=VERT_OK, fill_opacity=1, stroke_width=0)
                      .move_to(P(0.25 + 0.15 * i, -1.5 + h / 2 + 0.02)) for i, h in enumerate((0.15, 0.3, 0.22, 0.38))])
    p.add(bande, pc, barres.shift(UP * 0.18))
    return p.scale(s)


def nb_neg(s, fs=72, couleur=WHITE):
    t = Text(s, font_size=fs, color=couleur)
    return t


class FracRationnelBase(PaysageLotD):
    nom_voix = "4e-frac-rationnel"
    fichier_marques = "frac_rationnel_marques.json"

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Les nombres rationnels", self.identite, self.ceinture, y_ech=-2.7)
        f = EcritureFraction("a", "b", fs=90, couleur=AMBRE).move_to(P(-0.6, -0.35))
        f.num.set_color(AMBRE)
        f.den.set_color(AMBRE)
        self.au_mot("Les nombres rationnels")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        self.au_mot("Quels nombres")
        self.play(FadeIn(f, scale=1.3), run_time=0.5)
        q = self.t("?", 100, AMBRE).next_to(f, RIGHT, buff=0.6)
        self.play(FadeIn(q, scale=0.4), run_time=0.4)
        self.insister(q, 1.3, 0.25)
        self.attendre_voix(marge=0.8)

    # ── 01 : Nadia, analyste de données ─────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pers = analyste(1.05).move_to(P(-4.7, -0.4))
        self.au_mot("Voici Nadia")
        nom = self.t("Nadia", 40, BLEU_CALCUL).next_to(pers, UP, buff=0.3)
        self.play(FadeIn(pers, shift=UP * 0.3), FadeIn(nom), run_time=0.6)
        self.au_mot("analyste")
        metier = VGroup(self.t("analyste de données", 25, BLEU_CALCUL), self.t("club de football", 25, BLEU_CALCUL)
                        ).arrange(DOWN, buff=0.06).next_to(pers, DOWN, buff=0.2)
        self.play(FadeIn(metier, shift=UP * 0.2), run_time=0.4)
        bal = ballon_foot(0.45).move_to(P(-2.2, 0.9))
        self.au_mot("Kylian Mbappé")
        l1 = self.col(self.t("Kylian Mbappé", 42, JAUNE_TITRE), 2.4)
        self.play(FadeIn(l1, shift=RIGHT * 0.2), FadeIn(bal, scale=0.5), run_time=0.5)
        self.au_mot("Coupe du monde")
        l2 = self.col(self.t("Coupe du monde 2022", 36), 1.6)
        self.play(FadeIn(l2, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("8 buts")
        l3 = self.col(self.ligne([("8 buts", VERT_OK), ("en", WHITE), ("7 matchs", BLEU_CALCUL)], 40), 0.7)
        self.play(FadeIn(l3, shift=RIGHT * 0.2), Rotate(bal, -PI), run_time=0.5)
        self.au_mot("Combien de buts")
        q = self.col(self.t("Buts par match ?", 40, ORANGE_RETENUE), -0.3)
        self.play(FadeIn(q, scale=0.8), run_time=0.4)
        self.au_mot("8 septièmes")
        f = EcritureFraction(8, 7, fs=84)
        self.col(f, -1.7)
        self.play(FadeIn(f, scale=1.3), run_time=0.4)
        self.insister(f, 1.15, 0.25)
        self.attendre_voix()

    # ── 02 : 8 ÷ 7 ne s'arrête jamais ───────────────────────────────────────
    def ecran_division(self):
        self.ecran("02-division")
        f = EcritureFraction(8, 7, fs=90).move_to(P(-5.2, 1.4))
        self.add(f)
        l = self.ligne([("= 8 ÷ 7 =", WHITE), ("1,", VERT_OK), ("142857", AMBRE), ("142857", BLEU_CALCUL),
                        ("142857", AMBRE), ("…", WHITE)], 54, buff=0.04)
        l[1].next_to(l[0], RIGHT, buff=0.2)
        l.next_to(f, RIGHT, buff=0.3).set_y(f.trait.get_y())
        if l.get_right()[0] > 6.5:
            g0 = l.get_left()[0]
            l.scale_to_fit_width(6.5 - g0).align_to(P(g0, 0), LEFT)
        sans_synchro(l)
        self.au_mot("8 divisé par 7")
        self.play(FadeIn(l[0], shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("égale 1")
        self.play(FadeIn(l[1]), FadeIn(l[2], shift=RIGHT * 0.15), run_time=0.4)
        self.au_mot("reviennent")
        self.play(FadeIn(l[3], shift=RIGHT * 0.15), run_time=0.4)
        self.au_mot("encore et encore")
        self.play(FadeIn(l[4], shift=RIGHT * 0.15), FadeIn(l[5]), run_time=0.4)
        boucle = VGroup(*[Brace(l[k], DOWN, color=l[k].get_color()) for k in (2, 3, 4)])
        self.play(LaggedStart(*[GrowFromCenter(b) for b in boucle], lag_ratio=0.3), run_time=0.8)
        self.au_mot("ne s'arrête jamais")
        n1 = self.t("ne s'arrête jamais :", 38, ORANGE_RETENUE).move_to(P(-2.2, -0.35))
        self.play(FadeIn(n1, shift=UP * 0.15), run_time=0.4)
        self.au_mot("pas un nombre décimal")
        n2 = self.t("pas un nombre décimal", 38, ROUGE_ERREUR).next_to(n1, RIGHT, buff=0.3)
        if n2.get_right()[0] > 6.4:
            n2.next_to(n1, DOWN, buff=0.15).align_to(n1, LEFT)
        self.play(FadeIn(n2, shift=UP * 0.15), run_time=0.4)
        self.au_nb("environ 1,14")
        ar = self.ligne([("arrondi :", WHITE), ("≈ 1,14", BLEU_CALCUL), ("but par match", WHITE)], 38)
        sans_synchro(ar)
        ar.move_to(P(-1.6, -1.75))
        self.play(FadeIn(ar, shift=UP * 0.15), run_time=0.4)
        self.au_mot("quotient de deux entiers")
        r = self.t("quotient de deux entiers : RATIONNEL", 38, VERT_OK).move_to(P(-0.8, -2.75))
        self.play(FadeIn(r, scale=1.1), run_time=0.5)
        self.play(Create(self.encadrer(r, buff=0.15)), run_time=0.4)
        self.attendre_voix()

    # ── 03 : la définition ──────────────────────────────────────────────────
    def ecran_definition(self):
        self.ecran("03-definition")
        f = EcritureFraction("a", "b", fs=130).move_to(P(-4.0, 0.4))
        self.au_mot("Un nombre rationnel")
        tit = self.titre("Un nombre rationnel", fs=46)
        self.au_mot("a sur b")
        self.play(FadeIn(f, scale=1.3), run_time=0.5)
        self.au_mot("a et b entiers")
        l1 = self.col(self.ligne([("a", AMBRE), ("et", WHITE), ("b", AMBRE), (": des entiers", WHITE)], 42), 1.6)
        self.play(FadeIn(l1, shift=RIGHT * 0.2), Indicate(VGroup(f.num, f.den), color=AMBRE), run_time=0.6)
        self.au_mot("b différent de 0")
        l2 = self.col(self.ligne([("b", AMBRE), ("≠ 0", ROUGE_ERREUR)], 56), 0.5)
        self.play(FadeIn(l2, scale=1.2), Indicate(f.den, color=ROUGE_ERREUR, scale_factor=1.4), run_time=0.6)
        self.au_mot("on ne divise jamais par 0")
        z = EcritureFraction(4, 0, fs=70, den_c=ROUGE_ERREUR)
        lz = VGroup(z, self.t("n'a pas de sens", 36, ROUGE_ERREUR)).arrange(RIGHT, buff=0.4)
        self.col(lz, -1.0)
        self.play(FadeIn(lz, shift=UP * 0.15), run_time=0.4)
        self.play(Create(croix(z, sw=6)), run_time=0.4)
        self.attendre_voix()

    # ── 04 : beaucoup de nombres sont rationnels ────────────────────────────
    def ecran_tous(self):
        self.ecran("04-tous")
        dr = Droite(-4, 6, 10, etiquettes={-4: "−4", 0: "0", 6: "6"}, longueur=10.0, centre=P(-0.5, -2.22), fs=30)
        self.au_mot("Beaucoup de nombres")
        tit = self.t("Ils sont tous rationnels !", 44, JAUNE_TITRE).move_to(P(0, 3.05))
        self.play(Write(tit), FadeIn(dr), run_time=0.6)
        lignes = [("5 égale", "5 sur 1", ["5 =", (5, 1)], 5, "5", BLEU_CALCUL, 2.25),
                  ("moins 3 égale", "moins 3 sur 1", ["−3 =", ("−3", 1)], -3, "−3", ORANGE_PART, 1.1),
                  ("0,25 égale", "25 centièmes", ["0,25 =", (25, 100), "=", (1, 4)], 0.25, "0,25", VERT_OK, -0.05)]
        for mot, mot2, morceaux, v, et, c, y in lignes:
            items = []
            for m in morceaux:
                if isinstance(m, tuple):
                    items.append(EcritureFraction(m[0], m[1], fs=42, couleur=c))
                else:
                    items.append(self.t(m, 40, c))
            lg = VGroup(*items).arrange(RIGHT, buff=0.3).move_to(P(-0.5, y))
            for it in items:
                if not isinstance(it, EcritureFraction):
                    it.set_y(items[1].trait.get_y())
            sans_synchro(lg)
            pt = dr.point(v, et, couleur=c, fs=30)
            self.au_nb(mot) if any(ch.isdigit() for ch in mot) else self.au_mot(mot)
            self.play(FadeIn(items[0], shift=RIGHT * 0.2), FadeIn(pt, shift=DOWN * 0.2), run_time=0.4)
            self.au_mot(mot2)
            self.play(FadeIn(items[1], scale=1.2), run_time=0.35)
            if len(items) > 2:
                self.au_mot("soit 1 quart")
                self.play(FadeIn(VGroup(*items[2:]), shift=RIGHT * 0.2), run_time=0.4)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (−1,3 en fraction) ──────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        dr = Droite(-2, 0, 20, etiquettes={-2: "−2", -1: "−1", 0: "0"}, longueur=4.6, centre=P(-3.2, -0.6), fs=30)
        self.add(dr)
        pt = dr.point(-1.3, "−1,3", couleur=ORANGE_PART, fs=32)

        def avant(sc):
            sc.q_tete()
            sc.q_tete(FadeIn(pt, shift=DOWN * 0.2))

        def apres(sc):
            sc.rep(0, "1,3, c'est")
            sc.rep(1, "le signe moins", Indicate(pt, color=VERT_OK, scale_factor=1.3))
            sc.rep(2, "13 dixièmes a perdu", Indicate(sc.cartes_q[1], color=ROUGE_ERREUR, scale_factor=1.03))
            sc.fin_rep()

        self.question_pause("05-question", "05b-reponse", ["Quelle écriture est", "égale à −1,3 ?"],
                            [self.inline("−13/10"), self.inline("13/10"), self.inline("−1/3")], 0,
                            ["1,3 = 13/10", "le signe reste : −13/10", "13/10 a perdu son signe."],
                            mot_q="Quelle", avant_q=avant, autres_r=apres)

    # ── 06 : décimal → fraction (2,5 = 25/10 = 5/2) ─────────────────────────
    def ecran_decimal(self):
        self.ecran("06-decimal")
        self.au_mot("Pour écrire un décimal")
        tit = self.titre("Décimal → fraction", fs=46)
        d = self.t("2,5", 90, BLEU_CALCUL).move_to(P(-5.3, 1.0))
        f, g = EcritureFraction(25, 10, fs=80), EcritureFraction(5, 2, fs=80)
        s0 = self.t("=", 80).next_to(d, RIGHT, buff=0.3)
        eg = egalite(f, g, buff=1.2).next_to(s0, RIGHT, buff=0.3)
        eg.shift(UP * (d.get_y() - f.trait.get_y()))
        h, b = fleches(f, g, "÷ 5", fs=36, angle=TAU / 7)
        sans_synchro(VGroup(s0))
        self.au_mot("2,5")
        self.play(FadeIn(d, scale=1.3), run_time=0.4)
        self.au_nb("un chiffre")
        l1 = self.bloc(["1 chiffre après", "la virgule"], 28).next_to(d, DOWN, buff=0.45).align_to(d, LEFT)
        sans_synchro(l1)
        self.play(FadeIn(l1, shift=RIGHT * 0.15), Indicate(d[2], color=AMBRE, scale_factor=1.6), run_time=0.5)
        self.au_nb("sur 10")
        self.play(FadeIn(s0), FadeIn(f.trait), FadeIn(f.den, scale=1.3), run_time=0.4)
        self.au_mot("25 dixièmes")
        self.play(FadeIn(f.num, scale=1.3), run_time=0.35)
        self.au_nb("par 5")
        self.play(Create(h[0]), FadeIn(h[1]), Create(b[0]), FadeIn(b[1]), run_time=0.5)
        self.au_mot("5 demis")
        self.play(FadeIn(eg[1]), FadeIn(g, scale=1.3), run_time=0.4)
        bs = VGroup(*[Barre(2, k, largeur=2.2, hauteur=0.55, marge=0.14) for k in (2, 2, 1)]).arrange(RIGHT, buff=0.2)
        bs.move_to(P(-1.8, -1.9))
        self.play(LaggedStart(*[x.apparaitre(0.5) for x in bs], lag_ratio=0.3), Create(self.encadrer(g)), run_time=1.0)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (lequel n'est pas rationnel ?) ──────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        z = EcritureFraction(4, 0, fs=110, den_c=ROUGE_ERREUR).move_to(P(-3.4, 0.4))
        qm = self.t("?", 90, AMBRE).next_to(z, RIGHT, buff=0.5)
        self.add(qm)

        def apres(sc):
            sc.rep(0, "4 sur 0", FadeIn(z, scale=1.2), FadeOut(qm))
            sc.play(Create(croix(z, sw=7)), run_time=0.4)
            sc.rep(1, "Moins 7")
            sc.rep(2, "0,5, c'est")
            sc.fin_rep()

        self.question_pause("07-question", "07b-reponse", ["Lequel de ces nombres", "n'est pas rationnel ?"],
                            [self.inline("−7"), self.inline("4/0"), self.inline("0,5")], 1,
                            ["4/0 : on ne divise jamais par 0.", "−7 = −7/1", "0,5 = 1/2"],
                            mot_q="Lequel", autres_r=apres)

    # ── 08 : le piège : rationnel, mais pas décimal (1/3) ───────────────────
    def ecran_piege(self):
        self.ecran("08-piege")
        self.au_mot("Attention")
        tit = self.t("Rationnel… mais pas décimal !", 44, ROUGE_ERREUR).move_to(P(0, 3.05))
        self.play(Write(tit), run_time=0.5)
        b = Barre(3, 1, largeur=5.0, hauteur=0.6, centre=P(-3.4, 1.4))
        f = EcritureFraction(1, 3, fs=80).move_to(P(-5.3, -0.6))
        l = self.ligne([("= 0,", WHITE), ("3", AMBRE), ("3", AMBRE), ("3", AMBRE), ("…", WHITE)], 70, buff=0.03)
        l.next_to(f, RIGHT, buff=0.3).set_y(f.trait.get_y())
        sans_synchro(l)
        self.au_mot("1 tiers égale")
        self.play(b.apparaitre(0.6), FadeIn(f, scale=1.2), run_time=0.6)
        self.au_mot("0,333")
        self.play(FadeIn(l[0]), LaggedStart(*[FadeIn(x, shift=RIGHT * 0.1) for x in l[1:]], lag_ratio=0.3), run_time=0.8)
        self.au_mot("ne s'arrêtent jamais")
        self.play(Indicate(l[1:4], color=AMBRE, scale_factor=1.3), run_time=0.6)
        self.au_mot("0,33 n'est")
        a = self.col(self.ligne([("0,33 :", BLEU_CALCUL), ("valeur approchée", WHITE)], 38), 1.6)
        self.play(FadeIn(a, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("3 fois 0,33")
        c = self.col(self.ligne([("3 × 0,33 =", WHITE), ("0,99", ROUGE_ERREUR), ("≠ 1", ROUGE_ERREUR)], 42), 0.6)
        sans_synchro(c)
        self.play(FadeIn(c[0], shift=RIGHT * 0.2), run_time=0.35)
        self.au_nb("égale 0,99")
        self.play(FadeIn(c[1], scale=1.2), run_time=0.3)
        self.au_mot("pas 1")
        self.play(FadeIn(c[2], scale=1.2), run_time=0.3)
        self.au_mot("est rationnel")
        r = self.t("1/3 : rationnel, pas décimal", 40, VERT_OK).move_to(P(-0.6, -2.4))
        r.sans_synchro = True
        self.play(FadeIn(r, shift=UP * 0.15), run_time=0.4)
        self.play(Create(self.encadrer(r)), run_time=0.4)
        self.attendre_voix()

    # ── 09 : QUESTION 3 (8/7 est-il décimal ?) ──────────────────────────────
    def ecran_question3(self):
        self.clear()
        self.add_mascotte()
        f = EcritureFraction(8, 7, fs=100).move_to(P(-4.6, 0.6))
        dec = self.t("= 1,142857…", 50, AMBRE).next_to(f, RIGHT, buff=0.3).set_y(f.trait.get_y())
        dec.sans_synchro = True
        bal = ballon_foot(0.4).move_to(P(-3.4, -1.7))

        def avant(sc):
            sc.q_tete(FadeIn(f, scale=1.2), FadeIn(bal, scale=0.5))

        def apres(sc):
            sc.rep(0, "8 divisé par 7", FadeIn(dec, shift=RIGHT * 0.15))
            sc.rep(1, "1,14 n'est", Indicate(sc.cartes_q[0], color=ROUGE_ERREUR, scale_factor=1.03))
            sc.rep(2, "Mais c'est", Indicate(f, color=VERT_OK, scale_factor=1.2))
            sc.fin_rep()

        self.question_pause("09-question", "09b-reponse", ["8/7 est-il un", "nombre décimal ?"],
                            [self.inline("oui : 1,14"), self.inline("non, mais rationnel"),
                             self.inline("non, pas rationnel")], 1,
                            ["8 ÷ 7 ne s'arrête pas.", "1,14 : un arrondi.", "Mais rationnel !"], mot_q="8 septièmes", avant_q=avant, autres_r=apres)

    # ── 10 : défi (12 buts en 8 matchs) ─────────────────────────────────────
    def ecran_defi(self):
        self.ecran("10-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.titre("À toi de jouer !", fs=50)
        bals = VGroup(*[ballon_foot(0.2) for _ in range(12)]).arrange_in_grid(3, 4, buff=0.25).move_to(P(-3.6, 0.3))
        self.au_mot("12 buts")
        l1 = self.col(self.ligne([("12 buts", VERT_OK), ("en", WHITE), ("8 matchs", BLEU_CALCUL)], 40), 2.0)
        sans_synchro(l1)
        self.play(LaggedStart(*[FadeIn(x, scale=0.5) for x in bals], lag_ratio=0.06), FadeIn(l1[0]), run_time=0.8)
        self.au_nb("en 8")
        self.play(FadeIn(l1[1:]), run_time=0.35)
        for y, txt, mot in ((1.0, "1. fraction irréductible ?", "fraction irréductible"),
                            (0.1, "2. nombre décimal ?", "aussi un nombre")):
            self.au_mot(mot)
            l = self.col(self.t(txt, 38, ORANGE_RETENUE), y)
            self.play(FadeIn(l, shift=RIGHT * 0.2), run_time=0.35)
        self.pause_defi(y=-0.9)

    def ecran_correction(self):
        self.ecran("10b-correction", 0.65)
        tit = self.titre("Correction", fs=50)
        f, g = EcritureFraction(12, 8, fs=84), EcritureFraction(3, 2, fs=84)
        eg = egalite(f, g, buff=1.2).move_to(P(-3.4, 0.9))
        h, b = fleches(f, g, "÷ 4", fs=38, angle=TAU / 7)
        self.au_mot("12 huitièmes")
        self.play(FadeIn(f, scale=1.3), run_time=0.4)
        self.au_nb("par 4")
        self.play(Create(h[0]), FadeIn(h[1]), Create(b[0]), FadeIn(b[1]), run_time=0.5)
        self.au_mot("3 demis")
        self.play(FadeIn(eg[1]), FadeIn(g, scale=1.3), run_time=0.4)
        l1 = self.col(sans_synchro(self.ligne([("3 ÷", WHITE), ("2 =", WHITE), ("1,5", VERT_OK)], 46)), 1.6)
        self.au_mot("3 divisé")
        self.play(FadeIn(l1[0]), run_time=0.3)
        self.au_nb("3 divisé par 2")
        self.play(FadeIn(l1[1]), run_time=0.3)
        self.au_nb("égale 1,5")
        self.play(FadeIn(l1[2], scale=1.3), run_time=0.3)
        self.au_mot("la division s'arrête")
        l2 = self.col(self.t("la division s'arrête", 36, AMBRE), 0.7)
        self.play(FadeIn(l2, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("est rationnel")
        l3 = self.col(self.bloc(["rationnel ET décimal !"], 34, VERT_OK), -0.4)
        self.play(FadeIn(l3, scale=1.2), run_time=0.4)
        self.play(Create(self.encadrer(l3)), run_time=0.4)
        self.attendre_voix()

    # ── 11 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("11-finale", 0.65)
        f = EcritureFraction("a", "b", fs=90).move_to(P(-4.2, 1.0))
        bz = self.ligne([("b", AMBRE), ("≠ 0", ROUGE_ERREUR)], 48).next_to(f, DOWN, buff=0.5)
        fig = VGroup(f, bz)
        sans_synchro(fig)
        self.add(fig)
        lignes = self.finale_colonne(figure=fig, textes=[("Un rationnel s'écrit a/b,", "avec b différent de 0."),
                                                         ("Entiers, négatifs, décimaux :", "tous rationnels."),
                                                         ("Certains, comme 1/3,", "ne sont pas décimaux."),
                                                         ("On ne divise jamais par 0 !",)], fs=34)
        self.montrer2(lignes[0], "Un nombre rationnel", "b différent de 0")
        self.montrer2(lignes[1], "Les entiers", "sont rationnels")
        self.montrer2(lignes[2], "Certains rationnels", "ne sont pas décimaux")
        self.montrer2(lignes[3], "Et on ne divise")
        lignes[3][1].set_color(ROUGE_ERREUR)
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_division()
        self.ecran_definition()
        self.ecran_tous()
        self.ecran_question1()
        self.ecran_decimal()
        self.ecran_question2()
        self.ecran_piege()
        self.ecran_question3()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("12-abonne")


class FracRationnel4e(FracRationnelBase):
    identite = "Maths 4e — EleveAI"
    ceinture = "verte"
