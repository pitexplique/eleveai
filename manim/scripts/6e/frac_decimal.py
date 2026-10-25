# frac_decimal.py
# EleveAI — Maths 6e — série « Fractions », épisode 04 : FRACTION ET NOMBRE
# DÉCIMAL (micro du coach : fraction_decimal, « Relier fraction et décimal »),
# AVEC VOIX. Paysage 16:9, CEINTURE VERTE : la paysage complète du niveau
# (quotient, division posée, droite graduée, piège, fractions à connaître,
# fraction > 1, lien avec le pourcentage, défi corrigé), repère de REGLES.md.
# ⭐ C'est la DEUXIÈME erreur des 6e de Frédéric : fraction → décimal
# (3/4 = 3 ÷ 4 = 0,75, et non 3,4), puis la troisième : 0,75 = 75 %.
# Short jumeau : frac_decimal_short.py (la barre de lecture d'une appli).
#
# Décor et métier : le BASKET ; Kenza, ENTRAÎNEUSE DE BASKET : Lou marque 3
# lancers francs sur 4 → 3/4 = 0,75 = 75 %. Défi : 4 sur 5 → 4/5 = 0,8 = 80 %.
# Aucune donnée du monde réel citée (match inventé). Centres : sport.
# Vérifié (Python) : 3/4 = 0,75 ; 1/4 = 0,25 ; 1/2 = 0,5 ; 1/5 = 0,2 ;
# 1/10 = 0,1 ; 2/5 = 0,4 ; 7/4 = 1,75 ; 4/5 = 0,8.
#
# Micro → écrans : la fraction est un quotient (02), la division posée 3 ÷ 4
# (03), la droite graduée du coach (04), 1/4 = 0,25 (05, question 1 ; leurres
# du QCM du coach : 1,4 et 4,1), le piège 3/4 ≠ 3,4 (06), les fractions à
# connaître (07, items fixes du coach 1/2, 1/4, 3/4, 1/5), 2/5 = 0,4 (08,
# question 2), fraction > 1 (09, item fraction_decimal_tpl_quotient), le lien
# 0,75 = 75 % (10, question 3 : leurres 0,75 % et 7,5 %), défi (12).
# Écrans : 00 garde · 01 Kenza · 02 une fraction = une division · 03 la
# division posée · 04 la droite graduée · 05 QUESTION 1 · 06 le piège · 07 à
# connaître · 08 QUESTION 2 · 09 plus que 1 · 10 le pourcentage · 11 QUESTION 3
# · 12 défi · 12b correction · 13 ce que tu as appris · 14 fin.
#
# ⭐ Ajouté DANS CE SCRIPT (canvas_fractions.py et frac_commun.py non modifiés) :
# entraineuse() (Kenza), ballon(), coche_v() ; Division « posée » montrée
# chiffre par chiffre AU MOT (ses Text sont rendus sans_synchro ici).
# Voix : manim/voix/6e-frac-decimal.json (débit −10), WAV dans
# public/sons/6e-frac-decimal/ ; marques : frac_decimal_marques.json.
# python -m manim render -qh --disable_caching manim/scripts/6e/frac_decimal.py FracDecimal6e -o eleveai-maths-6e-frac-decimal --media_dir manim/scripts/6e/media-frac-decimal
# Sortie : manim/sorties/6e/maths/fractions/04-decimal/eleveai-maths-6e-frac-decimal.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from frac_commun import *  # noqa: E402,F403
from frac_lire_ecrire import FracLireEcrireBase  # noqa: E402  (rep, q_tete, montrer2)

BALLON = "#f97316"


def entraineuse(s=1.0):
    """Kenza, entraîneuse de basket : queue de cheval, survêtement, sifflet, tablette."""
    tete = Circle(radius=0.4, fill_color="#a0522d", fill_opacity=1, stroke_width=0)
    cheveux = VGroup(Sector(radius=0.43, angle=PI, start_angle=0, fill_color="#111827", fill_opacity=1,
                            stroke_width=0).move_to(P(0, 0.22)),
                     Ellipse(width=0.3, height=0.6, fill_color="#111827", fill_opacity=1, stroke_width=0)
                     .move_to(P(-0.45, -0.05)))
    corps = Polygon(P(-0.75, -1.9), P(0.75, -1.9), P(0.5, -0.45), P(-0.5, -0.45), fill_color="#dc2626",
                    fill_opacity=1, stroke_width=0)
    bandes = VGroup(*[Line(P(x, -0.5), P(x * 1.4, -1.85), color=WHITE, stroke_width=5) for x in (-0.42, 0.42)])
    sifflet = VGroup(Line(P(-0.15, -0.45), P(0.05, -0.85), color="#e5e7eb", stroke_width=3),
                     RoundedRectangle(width=0.2, height=0.12, corner_radius=0.04, fill_color="#fbbf24",
                                      fill_opacity=1, stroke_width=0).move_to(P(0.08, -0.9)))
    tablette = RoundedRectangle(width=0.7, height=0.5, corner_radius=0.06, fill_color="#1e293b", fill_opacity=1,
                                stroke_color="#94a3b8", stroke_width=3).move_to(P(0.55, -1.25))
    return VGroup(cheveux[1], corps, bandes, sifflet, tablette, tete, cheveux[0]).scale(s)


def ballon(r=0.32):
    b = Circle(radius=r, fill_color=BALLON, fill_opacity=1, stroke_color="#1f2937", stroke_width=3)
    l = VGroup(Line(P(-r, 0), P(r, 0)), Line(P(0, -r), P(0, r)),
               ArcBetweenPoints(P(-r * 0.7, r * 0.7), P(-r * 0.7, -r * 0.7), angle=-PI / 2),
               ArcBetweenPoints(P(r * 0.7, r * 0.7), P(r * 0.7, -r * 0.7), angle=PI / 2)).set_stroke("#1f2937", 2)
    return VGroup(b, l)


def coche_v(t=0.22, couleur=VERT_OK):
    return VMobject(stroke_color=couleur, stroke_width=8).set_points_as_corners(
        [P(-t, 0), P(-t * 0.3, -t * 0.7), P(t, t * 0.8)])


def tirs(n, reussis, x0=-2.9, y=0.7, ecart=0.85):
    """n ballons ; sous chacun une coche verte (réussi) ou une croix rouge."""
    bs = VGroup(*[ballon().move_to(P(x0 + i * ecart, y)) for i in range(n)])
    marques = VGroup()
    for i in range(n):
        if i < reussis:
            marques.add(coche_v().move_to(P(x0 + i * ecart, y - 0.65)))
        else:
            marques.add(croix(Square(0.36).move_to(P(x0 + i * ecart, y - 0.65)), sw=7))
    return bs, marques


def sans_synchro(m):
    for f in m.get_family():
        f.sans_synchro = True
    return m


class FracDecimalBase(FracLireEcrireBase):
    nom_voix = "6e-frac-decimal"
    fichier_marques = "frac_decimal_marques.json"

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Fraction et nombre décimal", self.identite, self.ceinture)
        b = Barre(4, 3, largeur=4.2, hauteur=0.6, centre=P(-1.6, 0.1))
        v = self.t(",", 140, AMBRE).move_to(P(1.4, 0.35))
        q = self.t("?", 100, AMBRE).move_to(P(2.3, 0.1))
        self.au_mot("Fraction et nombre")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        self.au_mot("Une fraction peut-elle")
        self.play(b.apparaitre(0.9))
        self.au_mot("avec une virgule")
        self.play(FadeIn(v, scale=0.4), FadeIn(q, scale=0.4), run_time=0.4)
        self.insister(VGroup(v, q), 1.3, 0.25)
        self.attendre_voix(marge=0.8)

    # ── 01 : Kenza, entraîneuse de basket ───────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pers = entraineuse(1.1).move_to(P(-5.1, -0.3))
        self.au_mot("Voici Kenza")
        nom = self.t("Kenza", 40, BLEU_CALCUL).next_to(pers, UP, buff=0.3)
        self.play(FadeIn(pers, shift=UP * 0.3), FadeIn(nom), run_time=0.6)
        self.au_mot("entraîneuse")
        metier = VGroup(self.t("entraîneuse", 32, BLEU_CALCUL), self.t("de basket", 32, BLEU_CALCUL)).arrange(
            DOWN, buff=0.08).next_to(pers, DOWN, buff=0.2)
        self.play(FadeIn(metier, shift=UP * 0.2), run_time=0.4)
        bs, mq = tirs(4, 3, x0=-3.1)
        self.au_mot("Lou a marqué")
        self.play(LaggedStart(*[FadeIn(b, shift=DOWN * 0.3) for b in bs], lag_ratio=0.2), run_time=0.8)
        self.au_mot("3 lancers francs")
        l1 = self.col(self.ligne([("Lou :", WHITE), ("3", VERT_OK), ("paniers", WHITE)], 38), 1.6)
        self.play(LaggedStart(*[Create(m) for m in mq[:3]], lag_ratio=0.25), FadeIn(l1, shift=RIGHT * 0.2),
                  run_time=0.8)
        self.au_mot("sur 4")
        l1b = self.ligne([("sur", WHITE), ("4", BLEU_CALCUL)], 38).next_to(l1, RIGHT, buff=0.2)
        self.play(Create(mq[3]), FadeIn(l1b, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("avec une virgule")
        l2 = self.col(self.t("avec une virgule ?", 42, ORANGE_RETENUE), 0.4)
        self.play(FadeIn(l2, scale=0.8), run_time=0.4)
        self.attendre_voix()

    # ── 02 : une fraction = une division ────────────────────────────────────
    def ecran_quotient(self):
        self.ecran("02-quotient")
        b = Barre(4, 3, largeur=5.0, hauteur=0.7, centre=P(-3.4, 1.4))
        bs, mq = tirs(4, 3, x0=-4.6, y=-0.7, ecart=1.25)
        self.add(bs, mq)
        f = EcritureFraction(3, 4, fs=110).move_to(P(1.4, 1.2))
        self.au_mot("3 quarts")
        self.play(b.apparaitre(0.6), FadeIn(f, scale=1.3), run_time=0.6)
        self.au_mot("Et une fraction")
        u = self.col(self.t("une fraction = une division", 36, AMBRE), -0.5)
        self.play(FadeIn(u, shift=UP * 0.15), run_time=0.4)
        self.au_mot("c'est 3 divisé")
        d = self.t("= 3 ÷ 4", 76).next_to(f, RIGHT, buff=0.35)
        d.set_y(f.trait.get_y())
        self.play(FadeIn(d, shift=RIGHT * 0.2), run_time=0.45)
        self.play(Indicate(f.trait, color=AMBRE, scale_factor=1.4), run_time=0.6)
        self.attendre_voix()

    # ── 03 : la division posée 3 ÷ 4 ────────────────────────────────────────
    def ecran_poser(self):
        self.ecran("03-poser")
        dv = sans_synchro(Division(3, 4, decimales=2, mode="pose", fs=80).move_to(P(-2.6, 0.15)))
        divid, virg, diviseur, pot_v, pot_h = dv.cadre
        g0, g1, g2 = dv.etapes[1:]
        self.au_mot("Posons")
        tit = self.col(self.t("La division posée", 44, JAUNE_TITRE), 3.0)
        self.play(Write(tit), Create(pot_v), Create(pot_h), run_time=0.6)
        self.au_mot("En 3")
        self.play(FadeIn(divid[0], scale=1.3), run_time=0.3)
        self.au_mot("fois 4")
        self.play(FadeIn(diviseur, scale=1.3), run_time=0.3)
        self.au_mot("0 fois")
        self.play(FadeIn(g0, scale=1.4), run_time=0.35)
        self.au_mot("une virgule")
        self.play(FadeIn(g1[0], scale=1.6), FadeIn(virg, scale=1.6), run_time=0.35)
        self.au_mot("un zéro")
        self.play(FadeIn(divid[1], scale=1.4), run_time=0.35)
        self.au_mot("30")
        self.play(Indicate(VGroup(divid[0], virg, divid[1]), color=AMBRE), run_time=0.5)
        self.au_mot("7 fois")
        self.play(FadeIn(g1[1], scale=1.4), run_time=0.3)
        self.au_mot("28")
        self.play(FadeIn(VGroup(g1[2], g1[3], g1[4])), run_time=0.35)
        self.au_mot("reste 2")
        self.play(FadeIn(g1[5][0], scale=1.4), run_time=0.3)
        self.au_mot("un zéro", n=2)
        self.play(FadeIn(divid[2], scale=1.4), FadeIn(g1[5][1], scale=1.4), run_time=0.35)
        self.au_mot("5 fois")
        self.play(FadeIn(g2[0], scale=1.4), run_time=0.3)
        self.au_mot("égale 20")
        self.play(FadeIn(VGroup(g2[1], g2[2], g2[3])), run_time=0.35)
        self.au_mot("reste 0")
        self.play(FadeIn(g2[4], scale=1.4), run_time=0.3)
        self.au_mot("c'est fini")
        self.play(Circumscribe(g2[4], color=VERT_OK), run_time=0.5)
        self.au_mot("3 divisé par 4, égale")
        res = self.col(self.ligne([("3 ÷ 4 =", WHITE), ("0,75", VERT_OK)], 56), -0.6, xl=2.2)
        self.play(FadeIn(res[0], shift=RIGHT * 0.2), run_time=0.35)
        self.au_mot("0,75.")
        self.play(FadeIn(res[1], scale=1.4), run_time=0.35)
        self.play(Create(self.encadrer(res)), run_time=0.4)
        self.attendre_voix()

    # ── 04 : la droite graduée ──────────────────────────────────────────────
    def ecran_droite(self):
        self.ecran("04-droite")
        dr = Droite(0, 1, 4, etiquettes={0: "0", 1: "1"}, longueur=9.0, centre=P(-0.6, 0.9))
        b = Barre(4, 3, largeur=9.0, hauteur=0.55, carte=False)
        b.move_to(P((dr.p(0)[0] + dr.p(1)[0]) / 2, -1.0))
        self.au_mot("De 0 à 1")
        self.play(FadeIn(dr), run_time=0.6)
        self.au_mot("coupée en 4")
        self.play(LaggedStart(*[Indicate(dr.ticks[i], color=AMBRE, scale_factor=1.8) for i in range(5)],
                              lag_ratio=0.2), b.apparaitre(0.9), run_time=1.0)
        self.au_mot("3 quarts tombe")
        pt_ = dr.point(0.75, (3, 4))
        self.play(FadeIn(pt_, shift=DOWN * 0.2), Create(b.fin_coloriee(vers=0.0).put_start_and_end_on(
            P(b.x_trait(3), b.contour.get_bottom()[1]), dr.p(0.75))), run_time=0.6)
        self.au_mot("pile sur 0,75")
        e75 = texte("0,75", 34, color=VERT_OK).next_to(dr.p(0.75), DOWN, buff=0.5)
        self.play(FadeIn(e75, scale=1.4), run_time=0.35)
        self.au_mot("entre 0,5")
        e5 = texte("0,5", 34, color=NUIT).next_to(dr.p(0.5), DOWN, buff=0.37)
        self.play(FadeIn(e5, scale=1.3), Indicate(dr.etiquettes[1], color=AMBRE, scale_factor=1.5), run_time=0.6)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (1/4 = ?) ───────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        b = Barre(4, 1, largeur=5.0, hauteur=0.7, centre=P(-3.4, 1.0))
        f = EcritureFraction(1, 4, fs=96).move_to(P(-3.4, -1.0))
        self.add(b)

        def avant(sc):
            sc.q_tete()
            sc.q_tete(FadeIn(f, scale=1.2))

        def apres(sc):
            sc.rep(0, "1 divisé", Indicate(f.trait, color=VERT_OK, scale_factor=1.4))
            sc.rep(1, "1,4 colle", Indicate(sc.cartes_q[0], color=ROUGE_ERREUR, scale_factor=1.03))
            sc.fin_rep()

        self.question_pause("05-question", "05b-reponse", ["Quelle est l'écriture", "décimale de 1 quart ?"],
                            [self.inline("1,4"), self.inline("0,25"), self.inline("4,1")], 1,
                            ["1 ÷ 4 = 0,25", "1,4 colle les nombres : faux !"], mot_q="Quelle",
                            avant_q=avant, autres_r=apres)

    # ── 06 : le piège 3/4 ≠ 3,4 ─────────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        self.au_mot("Attention au piège")
        tit = self.t("Attention au piège !", 46, ROUGE_ERREUR).move_to(P(0, 3.0))
        self.play(Write(tit), run_time=0.5)
        f = EcritureFraction(3, 4, fs=80)
        ne = self.t("≠", 80, ROUGE_ERREUR)
        ne.sans_synchro = True
        tq = self.t("3,4", 80, ROUGE_ERREUR)
        grp = VGroup(f, ne, tq).arrange(RIGHT, buff=0.5).move_to(P(0, 1.55))
        ne.set_y(f.trait.get_y())
        tq.set_y(f.trait.get_y())
        self.au_mot("3 quarts, ce n'est")
        self.play(FadeIn(f, scale=1.3), run_time=0.35)
        self.au_mot("pas 3,4")
        self.play(FadeIn(ne, scale=1.4), FadeIn(tq, scale=1.3), run_time=0.4)
        dr = Droite(0, 4, 4, etiquettes={k: str(k) for k in range(5)}, longueur=10.0, centre=P(0, -0.85))
        self.play(FadeIn(dr), run_time=0.5)
        self.au_mot("plus que 3")
        p34 = dr.point(3.4, "3,4", couleur=ROUGE_ERREUR)
        self.play(FadeIn(p34, shift=DOWN * 0.2), Indicate(tq, color=ROUGE_ERREUR), run_time=0.5)
        self.au_mot("moins que 1")
        p75 = dr.point(0.75, (3, 4), couleur=VERT_OK)
        self.play(FadeIn(p75, shift=DOWN * 0.2), Indicate(f, color=VERT_OK), run_time=0.5)
        self.au_mot("une barre entière")
        un = Line(dr.p(0), dr.p(1), color=BLEU_PART, stroke_width=14)
        self.play(FadeIn(un, shift=UP * 0.1), run_time=0.4)
        r = self.ligne([("Entre les deux nombres :", WHITE), ("÷", VERT_OK), (", jamais une virgule !", ROUGE_ERREUR)],
                       30).move_to(P(-0.9, -2.75))
        self.au_mot("Entre les deux")
        self.play(FadeIn(r[0], shift=UP * 0.15), run_time=0.4)
        self.au_mot("une division")
        self.play(FadeIn(r[1], scale=1.5), run_time=0.3)
        self.au_mot("jamais une virgule")
        self.play(FadeIn(r[2], shift=UP * 0.15), run_time=0.4)
        self.attendre_voix()

    # ── 07 : à connaître par cœur ───────────────────────────────────────────
    def ecran_connaitre(self):
        self.ecran("07-connaitre")
        self.au_mot("à connaître")
        tit = self.t("À connaître par cœur", 46, JAUNE_TITRE).move_to(P(0, 3.0))
        self.play(Write(tit), run_time=0.5)
        rangs = [(1, 2, "0,5", "1 demi", "0,5."), (1, 4, "0,25", "1 quart", "0,25."), (3, 4, "0,75", "3 quarts", "0,75."),
                 (1, 5, "0,2", "1 cinquième", "0,2."), (1, 10, "0,1", "1 dixième", "0,1.")]
        for k, (a, d, dec, mot_f, mot_d) in enumerate(rangs):
            x0 = -5.0 if k < 3 else 1.6
            y = [1.5, 0.0, -1.5][k % 3]
            b = Barre(d, a, largeur=2.2, hauteur=0.5, marge=0.14, centre=P(x0, y))
            f = EcritureFraction(a, d, fs=56).next_to(b, RIGHT, buff=0.45)
            e = self.ligne([("=", WHITE), (dec, VERT_OK)], 48).next_to(f, RIGHT, buff=0.3)
            e.set_y(f.trait.get_y())
            self.au_mot(mot_f)
            self.play(b.apparaitre(0.5), FadeIn(f, scale=1.3), run_time=0.5)
            self.au_mot(mot_d)
            self.play(FadeIn(e, shift=RIGHT * 0.15), run_time=0.35)
        self.attendre_voix()

    # ── 08 : QUESTION 2 (2/5 = ?) ───────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        b = Barre(5, 2, largeur=5.0, hauteur=0.7, centre=P(-3.4, 1.0))
        f = EcritureFraction(2, 5, fs=96).move_to(P(-3.4, -1.0))
        self.add(b)

        def avant(sc):
            sc.q_tete()
            sc.q_tete(FadeIn(f, scale=1.2))

        def apres(sc):
            sc.rep(0, "2 divisé", Indicate(f.trait, color=VERT_OK, scale_factor=1.4))
            sc.rep(1, "1 cinquième", Indicate(b.parts[0], color=WHITE))
            sc.rep(2, "donc 2", Indicate(VGroup(b.parts[0], b.parts[1]), color=WHITE))
            sc.fin_rep()

        self.question_pause("08-question", "08b-reponse", ["Quelle est l'écriture", "décimale de 2 cinquièmes ?"],
                            [self.inline("2,5"), self.inline("0,4"), self.inline("0,2")], 1,
                            ["2 ÷ 5 = 0,4", "ou : 1/5 = 0,2,", "donc 2/5 = 0,4"], mot_q="Quelle",
                            avant_q=avant, autres_r=apres)

    # ── 09 : plus que 1 (7/4 = 1,75) ────────────────────────────────────────
    def ecran_plus_que_1(self):
        self.ecran("09-plus-que-1")
        b1 = Barre(4, 0, largeur=4.6, hauteur=0.7, centre=P(-3.6, 1.3))
        b2 = Barre(4, 0, largeur=4.6, hauteur=0.7, centre=P(-3.6, -0.9))
        f = EcritureFraction(7, 4, fs=100).move_to(P(1.3, 1.2))
        self.au_mot("Et 7 quarts")
        self.play(FadeIn(f, scale=1.3), b1.apparaitre(0.6), b2.apparaitre(0.6), run_time=0.6)
        self.play(b1.colorier(range(4), lag=0.1), b2.colorier(range(3), lag=0.1), run_time=1.0)
        self.au_mot("7 divisé par 4")
        d = self.t("= 7 ÷ 4 = 1,75", 52).next_to(f, RIGHT, buff=0.3)
        d.set_y(f.trait.get_y())
        if d.get_right()[0] > 6.4:
            g0 = d.get_left()[0]
            d.scale_to_fit_width(6.4 - g0).align_to(P(g0, 0), LEFT)
        self.play(FadeIn(d, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("Le numérateur est")
        g = self.col(self.bloc(["numérateur > dénominateur :", "la fraction dépasse 1 !"], 36, AMBRE), -0.4)
        self.play(FadeIn(g[0], shift=UP * 0.15), Indicate(f.num, color=AMBRE, scale_factor=1.4), run_time=0.5)
        # 25/10 : la 2e ligne attendait le « 1 » final et retardait l'accolade
        # de 0,79 s : elle entre MOT À MOT (« la fraction » · « dépasse » ·
        # « 1 ! »), l'accolade « 1 entier » avec le « 1 ».
        l2 = self.ligne([("la fraction", AMBRE), ("dépasse", AMBRE), ("1 !", AMBRE)], 36)
        l2.scale(g[1].width / l2.width).move_to(g[1])  # même taille et même place que la ligne du bloc
        self.au_mot("la fraction")
        self.play(FadeIn(l2[0], shift=UP * 0.15), run_time=0.3)
        self.au_mot("dépasse 1")
        self.play(FadeIn(l2[1], shift=UP * 0.15), run_time=0.3)
        acc = b1.accolade("1 entier", dessus=False, fs=30)
        self.au_mot("1.")
        self.play(FadeIn(l2[2], scale=1.3), FadeIn(acc, shift=UP * 0.1), run_time=0.35)
        self.attendre_voix()

    # ── 10 : le pourcentage ─────────────────────────────────────────────────
    def cases(self, v, pleine=False):
        pc = Pourcentage(v, mode="cases", cote=0.36, etiquette=False, centre=P(-3.6, 0.1))
        if pleine:
            for i in range(v):
                pc.grille.liste[i].set_fill(BLEU_PART, 1)
            return pc
        return pc.vide()

    def ecran_pourcentage(self):
        self.ecran("10-pourcentage")
        self.au_mot("les pourcentages")
        tit = self.col(self.t("Et le pourcentage !", 46, JAUNE_TITRE), 3.0)
        pc = self.cases(75)
        self.play(Write(tit), FadeIn(pc), run_time=0.6)
        self.au_mot("0,75, c'est")
        l1 = self.col(self.ligne([("0,75 =", WHITE), ("75 centièmes", BLEU_CALCUL)], 40), 1.8)
        self.play(FadeIn(l1, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("75 cases")
        l2 = self.col(self.ligne([("75 cases", BLEU_CALCUL), ("sur 100", WHITE)], 40), 0.9)
        self.play(FadeIn(l2, shift=RIGHT * 0.2), pc.remplir(1.6), run_time=1.6)
        self.au_mot("On écrit 75")
        l3 = self.col(self.t("75 %", 90, VERT_OK), -0.4)
        self.play(FadeIn(l3, scale=1.4), run_time=0.4)
        self.play(Create(self.encadrer(l3)), run_time=0.4)
        self.au_mot("Lou a réussi")
        l4 = self.col(self.ligne([("Lou :", WHITE), ("75 %", VERT_OK), ("de réussite", WHITE)], 38), -1.8)
        self.play(FadeIn(l4, shift=UP * 0.15), run_time=0.4)
        self.attendre_voix()

    # ── 11 : QUESTION 3 (0,75 en pourcentage) ──────────────────────────────
    def ecran_question3(self):
        self.clear()
        self.add_mascotte()
        pc = self.cases(75, pleine=True)
        self.add(pc)

        def apres(sc):
            sc.rep(0, "0,75, c'est", Indicate(pc.grille, color=VERT_OK, scale_factor=1.03))
            sc.rep(1, "0,75 %, ce", Indicate(pc.grille.liste[0], color=ROUGE_ERREUR, scale_factor=2.0))
            sc.fin_rep()

        self.question_pause("11-question", "11b-reponse", ["0,75 en pourcentage,", "c'est combien ?"],
                            [self.inline("0,75 %"), self.inline("7,5 %"), self.inline("75 %")], 2,
                            ["0,75 = 75 centièmes = 75 %", "0,75 % : même pas 1 case !"], mot_q="0,75 en",
                            autres_r=apres)

    # ── 12 : défi (4 sur 5) ─────────────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("12-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.col(self.t("À toi de jouer !", 50, JAUNE_TITRE), 3.0)
        self.play(Write(tit), run_time=0.6)
        bs, mq = tirs(5, 4, x0=-5.4, y=0.8, ecart=0.9)
        self.au_mot("4 lancers francs")
        l1 = self.col(self.ligne([("Lou :", WHITE), ("4", VERT_OK), ("paniers", WHITE)], 38), 2.0)
        self.play(FadeIn(bs), LaggedStart(*[Create(m) for m in mq[:4]], lag_ratio=0.2), FadeIn(l1), run_time=0.9)
        self.au_mot("sur 5")
        l1b = self.ligne([("sur", WHITE), ("5", BLEU_CALCUL)], 38).next_to(l1, RIGHT, buff=0.2)
        self.play(Create(mq[4]), FadeIn(l1b), run_time=0.4)
        for y, txt, mot in ((1.0, "1. en fraction ?", "en fraction"), (0.2, "2. en nombre décimal ?", "puis en nombre"),
                            (-0.6, "3. en pourcentage ?", "puis en pourcentage")):
            self.au_mot(mot)
            l = self.col(self.t(txt, 38, ORANGE_RETENUE), y)
            self.play(FadeIn(l, shift=RIGHT * 0.2), run_time=0.35)
        self.pause_defi(y=-1.6)

    def ecran_correction(self):
        self.ecran("12b-correction", 0.65)
        tit = self.col(self.t("Correction", 50, JAUNE_TITRE), 3.0)
        pc = self.cases(80)
        self.play(Write(tit), FadeIn(pc), run_time=0.5)
        self.au_mot("4 cinquièmes")
        f = EcritureFraction(4, 5, fs=58)
        self.col(f, 1.6)
        self.play(FadeIn(f, scale=1.3), run_time=0.4)
        self.au_mot("4 divisé par 5")
        l2 = self.col(self.t("4 ÷ 5 = 0,8", 42), 0.55)
        self.play(FadeIn(l2, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("Et 0,8")
        l3 = self.col(self.ligne([("0,8 = 80 centièmes", WHITE)], 38), -0.35)
        self.play(FadeIn(l3, shift=RIGHT * 0.2), pc.remplir(1.4), run_time=1.4)
        self.au_mot("80 %")
        l4 = self.col(self.t("80 %", 70, VERT_OK), -1.3)
        self.play(FadeIn(l4, scale=1.4), run_time=0.4)
        self.play(Create(self.encadrer(l4)), run_time=0.4)
        self.au_mot("de 75 %")
        l5 = self.col(self.ligne([("75 %", WHITE), ("→", WHITE), ("80 %", VERT_OK)], 36), -2.45)
        self.play(FadeIn(l5, shift=UP * 0.15), run_time=0.4)
        self.attendre_voix()

    # ── 13 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("13-finale", 0.65)
        b = Barre(4, 3, largeur=4.0, hauteur=0.6, etiquette="frac", fs=34, centre=P(-3.6, 0.9))
        pc = self.cases(75, pleine=True).scale(0.55).move_to(P(-3.6, -1.6))
        fig = VGroup(b, pc)
        self.add(fig)
        lignes = self.finale_colonne(figure=fig, textes=[("Une fraction est une division :", "3 quarts = 3 ÷ 4."),
                                                         ("3 ÷ 4 = 0,75",),
                                                         ("Jamais de virgule", "entre les deux nombres."),
                                                         ("0,75 = 75 %",)], fs=36)
        self.montrer2(lignes[0], "Une fraction", "3 quarts, c'est")
        self.montrer2(lignes[1], "3 divisé par 4, égale")
        self.montrer2(lignes[2], "Jamais", "entre les")
        self.montrer2(lignes[3], "Et 0,75")
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_quotient()
        self.ecran_poser()
        self.ecran_droite()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_connaitre()
        self.ecran_question2()
        self.ecran_plus_que_1()
        self.ecran_pourcentage()
        self.ecran_question3()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("14-abonne")


class FracDecimal6e(FracDecimalBase):
    identite = "Maths 6e — EleveAI"
    ceinture = "verte"
