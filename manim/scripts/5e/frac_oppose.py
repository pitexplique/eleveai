# frac_oppose.py
# EleveAI — Maths 5e — série « Fractions », épisode 05 : L'OPPOSÉ D'UNE FRACTION
# (micro du coach : fraction_oppose, notion fraction_nombre), AVEC VOIX.
# Paysage 16:9, CEINTURE VERTE : la paysage complète du niveau 5e (le signe
# « − » devant la fraction, même distance à 0 de l'autre côté, un nombre +
# son opposé = 0, l'opposé d'un négatif, le piège « fraction retournée », défi
# corrigé qui finit par l'écriture décimale 0,3 cm = 3 mm).
# Négatifs : ici seulement, la micro les met (fraction_oppose, banque genOppose).
# Short jumeau : frac_oppose_short.py (blanche, les sauts du kangourou).
#
# Décor et métier : le PITON DE LA FOURNAISE (La Réunion) ; Ilan, VOLCANOLOGUE,
# mesure les mouvements du sol : lundi +2/5 cm, mardi −2/5 cm → le sol revient
# à 0. Défi : mercredi −3/10 cm, son opposé 3/10 = 0,3 cm = 3 mm.
# Chiffres inventés pour l'exemple (aucune mesure réelle citée). Centres :
# sciences, nature-ecologie.
# Vérifié (Python) : 2/5 + (−2/5) = 0 ; opposé de 3/5 = −3/5 (5/3 ≠) ;
# opposé de −7/9 = 7/9 ; opposé de −4/7 = 4/7 ; 5/6 + (−5/6) = 0 ; 3 ÷ 10 = 0,3.
#
# Micro → écrans (banque 5e/maths/fractions.bank.ts, genOppose + fixed_1/2) :
# le signe (02), la droite graduée (03 ; QUESTION 1 = fixed_1, leurre inverse
# de la banque), somme nulle (05 ; QUESTION 3 « … + ? = 0 »), opposé d'un
# négatif (06 ; QUESTION 2 = fixed_2), piège opposé / fraction retournée (08).
# Écrans : 00 garde · 01 Ilan · 02 le signe · 03 la droite · 04 QUESTION 1 ·
# 05 la somme vaut 0 · 06 opposé d'un négatif · 07 QUESTION 2 · 08 piège ·
# 09 QUESTION 3 · 10 défi · 10b correction · 11 ce que tu as appris · 12 fin.
#
# ⭐ Bases : 5e/frac_lotg_commun.py (PaysageG ← 4e/frac_lotd_commun.py ;
# moins_frac recopiée du lot F) ; canvas_fractions.py (non modifié).
# Ajouté ici : volcanologue(), volcan(), jauge(), droite_pm().
# Voix : manim/voix/5e-frac-oppose.json (débit −10) ; marques : 5e/frac_oppose_marques.json.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/5e/frac_oppose.py FracOppose5e
# python -m manim render -qh --disable_caching manim/scripts/5e/frac_oppose.py FracOppose5e -o eleveai-maths-5e-frac-oppose --media_dir manim/scripts/5e/media-frac-oppose
# Sortie : manim/sorties/5e/maths/fractions/05-oppose/eleveai-maths-5e-frac-oppose.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from frac_lotg_commun import *  # noqa: E402,F403

HAUT_C, BAS_C = VERT_PART, ORANGE_PART   # monter (+) / descendre (−)


def volcanologue(s=1.0):
    """Ilan : combinaison rouge, casque blanc, une tablette de mesure."""
    p = personne(peau=PEAUX[0], tenue="#b91c1c", cheveux="#111827")
    casque = VGroup(AnnularSector(inner_radius=0, outer_radius=0.5, angle=PI, start_angle=0, fill_color=WHITE,
                                  fill_opacity=1, stroke_width=0),
                    RoundedRectangle(width=1.15, height=0.1, corner_radius=0.04, fill_color="#e5e7eb", fill_opacity=1,
                                     stroke_width=0)).move_to(P(0, 0.42))
    tab = RoundedRectangle(width=0.55, height=0.4, corner_radius=0.05, fill_color="#0f172a", fill_opacity=1,
                           stroke_color="#94a3b8", stroke_width=3).move_to(P(0.6, -1.2))
    p.add(casque, tab)
    return p.scale(s)


def volcan(s=1.0):
    """Le volcan : un cône brun, un cratère, une lueur de lave, un panache."""
    cone = Polygon(P(-1.6, -0.8), P(1.6, -0.8), P(0.45, 0.8), P(-0.45, 0.8), fill_color="#57534e", fill_opacity=1,
                   stroke_color="#292524", stroke_width=3)
    lave = Polygon(P(-0.35, 0.8), P(0.35, 0.8), P(0.15, 0.55), P(-0.15, 0.55), fill_color="#f97316", fill_opacity=1,
                   stroke_width=0)
    coulee = Polygon(P(0.05, 0.6), P(0.2, 0.55), P(0.5, -0.8), P(0.25, -0.8), fill_color="#ea580c", fill_opacity=0.9,
                     stroke_width=0)
    fumee = VGroup(*[Circle(radius=r, fill_color="#9ca3af", fill_opacity=0.6, stroke_width=0).move_to(P(x, y))
                     for x, y, r in ((0.0, 1.05, 0.18), (0.2, 1.35, 0.22), (0.05, 1.7, 0.26))])
    return VGroup(cone, coulee, lave, fumee).scale(s)


def jauge(centre, h=2.4):
    """La règle du capteur : un axe vertical, le 0 (rouge), un curseur.
    .p(v) : le point du niveau v (en cm, −1 ≤ v ≤ 1) ; .curseur."""
    axe = Line(centre + DOWN * h / 2, centre + UP * h / 2, color=WHITE, stroke_width=5)
    zero = Line(centre + LEFT * 0.22, centre + RIGHT * 0.22, color=ROUGE_ZERO, stroke_width=6)
    lz = Text("0", font_size=30, color=ROUGE_ZERO).next_to(zero, LEFT, buff=0.12)
    lz.sans_synchro = True
    lz._pas_audit = True
    curseur = Triangle(fill_color=AMBRE, fill_opacity=1, stroke_width=0).scale(0.14).rotate(-PI / 2)
    curseur.next_to(centre, RIGHT, buff=0.05)
    g = VGroup(axe, zero, lz, curseur)
    g.curseur = curseur
    g.p = lambda v: centre + UP * v * h / 2
    return g


def droite_pm(n=10, longueur=8.0, centre=ORIGIN):
    """La demi-droite du coach, de −1 à 1 (n intervalles)."""
    d = Droite(-1, 1, n, etiquettes={-1: "−1", 0: "0", 1: "1"}, longueur=longueur, centre=centre)
    for t in d.get_family():
        if isinstance(t, Text):
            t._pas_audit = True
    return d


class FracOpposeBase(PaysageG):
    nom_voix = "5e-frac-oppose"
    fichier_marques = "frac_oppose_marques.json"

    def mf(self, num, den, fs=56, c=WHITE, moins=False):
        return moins_frac(num, den, fs=fs, couleur=c) if moins else EcritureFraction(num, den, fs=fs, couleur=c)

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("L'opposé d'une fraction", self.identite, self.ceinture, y_ech=-2.7)
        d = droite_pm(10, 7.0, P(-0.6, -0.1))
        self.au_mot("L'opposé")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), FadeIn(d), run_time=0.8)
        self.au_mot("de l'autre côté")
        a = CurvedArrow(d.p(0.4) + UP * 0.35, d.p(-0.4) + UP * 0.35, angle=TAU / 5, color=AMBRE, stroke_width=6)
        self.play(Create(a), Flash(d.p(0), color=ROUGE_ZERO), run_time=0.8)
        self.attendre_voix(marge=0.8)

    # ── 01 : Ilan, volcanologue ─────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pers, nom, met = self.personnage(volcanologue(0.95), "Ilan", "volcanologue", x=-5.3, y=-0.7, fs_met=24)
        self.au_mot("Voici Ilan")
        self.play(FadeIn(pers, shift=UP * 0.3), FadeIn(nom), run_time=0.6)
        self.au_mot("volcanologue")
        self.play(FadeIn(met, shift=UP * 0.2), run_time=0.4)
        v = volcan(0.9).move_to(P(-2.55, -0.4))
        j = jauge(P(0.25, 0.1))
        self.au_mot("les mouvements du sol")
        self.play(FadeIn(v, shift=UP * 0.2), FadeIn(j), run_time=0.6)
        self.L([("lundi :", WHITE, "Lundi"), ("monte de", HAUT_C, "monté de"),
                (EcritureFraction(2, 5, fs=50, couleur=HAUT_C), WHITE, "monté de 2"), ("cm", WHITE, None)], 2.2,
               fs=38, avec={2: [j.curseur.animate.move_to(j.p(0.4) + RIGHT * 0.2), v.animate.scale(1.05)]})
        self.L([("mardi :", WHITE, "Mardi"), ("descend de", BAS_C, "redescendu"),
                (EcritureFraction(2, 5, fs=50, couleur=BAS_C), WHITE, "descendu de 2"), ("cm", WHITE, None)], 0.85,
               fs=38, avec={2: [j.curseur.animate.move_to(j.p(0) + RIGHT * 0.2), v.animate.scale(1 / 1.05)]})
        self.au_mot("Comment écrire")
        q = self.col(self.bloc(["Comment écrire", "ces deux mouvements ?"], 36, ORANGE_RETENUE), -0.85)
        sans_synchro(q)
        self.play(FadeIn(q, scale=0.85), run_time=0.4)
        self.attendre_voix()

    # ── 02 : le signe ───────────────────────────────────────────────────────
    def ecran_signe(self):
        self.ecran("02-signe")
        j = jauge(P(-4.3, 0.2), h=3.6)
        self.add(j)
        up = Arrow(j.p(0) + LEFT * 0.5, j.p(0.4) + LEFT * 0.5, buff=0, color=HAUT_C, stroke_width=8)
        dn = Arrow(j.p(0.4) + RIGHT * 0.75, j.p(0) + RIGHT * 0.75, buff=0, color=BAS_C, stroke_width=8)
        self.L([("monter :", HAUT_C, "Monter"), ("+", HAUT_C, "plus 2"),
                (EcritureFraction(2, 5, fs=60, couleur=HAUT_C), WHITE, None)], 2.3, fs=48,
               avec={1: [GrowArrow(up), j.curseur.animate.move_to(j.p(0.4) + RIGHT * 0.2)]})
        g = moins_frac(2, 5, fs=60, couleur=BAS_C)
        self.L([("descendre :", BAS_C, "Descendre"), (g, WHITE, "moins 2")], 0.9, fs=48,
               avec={1: [GrowArrow(dn), j.curseur.animate.move_to(j.p(0) + RIGHT * 0.2)]})
        self.au_mot("un signe moins")
        self.play(Indicate(g.signe, color=AMBRE, scale_factor=2.0), run_time=0.7)
        r = self.col(self.bloc(["le signe « − »", "devant la fraction"], 34, AMBRE), -0.4)
        sans_synchro(r)
        self.play(FadeIn(r, shift=UP * 0.15), run_time=0.4)
        self.au_mot("s'annulent")
        self.play(Indicate(VGroup(up, dn), color=WHITE), run_time=0.6)
        self.L([("le sol revient à", VERT_OK, "le sol revient"), ("0", ROUGE_ZERO, "revient à 0")], -1.8, fs=44,
               avec={1: [Flash(j.p(0), color=ROUGE_ZERO)]})
        self.attendre_voix()

    # ── 03 : la droite graduée ──────────────────────────────────────────────
    def ecran_droite(self):
        self.ecran("03-droite")
        d = droite_pm(10, 8.0, P(-0.4, 1.4))
        self.au_mot("droite graduée")
        self.play(FadeIn(d, shift=UP * 0.2), run_time=0.6)
        ph = d.point(0.4, "2/5", couleur=HAUT_C)
        pb = d.point(-0.4, "−2/5", couleur=BAS_C)
        self.au_nb("graduée, 2")
        self.play(FadeIn(ph, shift=DOWN * 0.2), run_time=0.35)
        self.au_nb("et moins 2")
        self.play(FadeIn(pb, shift=DOWN * 0.2), run_time=0.35)
        self.au_mot("même distance")
        a1 = Line(d.p(0), d.p(0.4), color=HAUT_C, stroke_width=12)
        a2 = Line(d.p(-0.4), d.p(0), color=BAS_C, stroke_width=12)
        miroir = DashedLine(d.p(0) + UP * 1.2, d.p(0) + DOWN * 1.1, color=ROUGE_ZERO, stroke_width=4)
        self.play(Create(a1), Create(a2), Create(miroir), run_time=0.7)
        self.au_mot("nombres opposés")
        op = self.t("deux nombres opposés", 44, VERT_OK).move_to(P(-0.4, -0.85))
        op.sans_synchro = True
        self.play(FadeIn(op, scale=1.1), run_time=0.4)
        self.L([("l'opposé de", WHITE, "L'opposé de"), (EcritureFraction(2, 5, fs=52), WHITE, "opposé de 2"),
                ("est", WHITE, None), (moins_frac(2, 5, fs=52, couleur=VERT_OK), WHITE, "c'est moins 2")], -2.2, x=-0.4)
        self.attendre_voix()

    # ── 04 : QUESTION 1 (l'opposé de 3/5) ───────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        d = droite_pm(10, 5.4, P(-3.0, 0.4))
        self.add(d)
        p3 = d.point(0.6, "3/5", couleur=HAUT_C)
        pm = d.point(-0.6, "−3/5", couleur=VERT_OK)

        def avant(sc):
            sc.au_nb("l'opposé de 3")
            sc.q_tete(FadeIn(p3, shift=DOWN * 0.2))

        def apres(sc):
            sc.rep_mots(0, [("On change le signe :", None, "On change"), ("−3/5", None, "moins 3")],
                        avec={1: [FadeIn(pm, shift=DOWN * 0.2)]})
            sc.rep_mots(1, [("5/3 : fraction retournée,", None, "5 tiers"), ("un autre nombre !", None, "un autre")])
            sc.fin_rep()

        self.question_pause("04-question", "04b-reponse", ["Quel est l'opposé de 3/5 ?"],
                            [self.inline("−3/5"), self.inline("5/3"), self.inline("3/5")], 0,
                            ["On change le signe : −3/5", "5/3 : fraction retournée, un autre nombre !"],
                            avant_q=avant, autres_r=apres)

    # ── 05 : un nombre + son opposé = 0 ─────────────────────────────────────
    def ecran_somme(self):
        self.ecran("05-somme")
        d = droite_pm(10, 8.0, P(-0.4, 1.0))
        self.au_mot("Autre façon")
        self.play(FadeIn(d, shift=UP * 0.2), run_time=0.5)
        self.L([("Un nombre", JAUNE_TITRE, "un nombre"), ("+ son opposé", JAUNE_TITRE, "son opposé"),
                ("= 0", VERT_OK, "fait 0")], 3.0, fs=46, x=0)
        aller = CurvedArrow(d.p(0) + UP * 0.3, d.p(0.6) + UP * 0.3, angle=-TAU / 6, color=HAUT_C, stroke_width=6)
        retour = CurvedArrow(d.p(0.6) + DOWN * 0.3, d.p(0) + DOWN * 0.3, angle=-TAU / 6, color=BAS_C, stroke_width=6)
        self.L([(EcritureFraction(3, 5, fs=60, couleur=HAUT_C), WHITE, "0. 3"), ("+", WHITE, "plus moins"),
                ("(", WHITE, None), (moins_frac(3, 5, fs=60, couleur=BAS_C), WHITE, "moins 3"), (")", WHITE, None),
                ("=", WHITE, "égale 0"), ("0", VERT_OK, None)], -1.3, fs=60, x=-0.4,
               avec={0: [Create(aller)], 2: [Create(retour)], 3: [Flash(d.p(0), color=VERT_OK)]})
        self.au_mot("Comme le sol")
        r = self.t("monter, puis redescendre d'autant", 34, AMBRE).move_to(P(-0.6, -2.75))
        r.sans_synchro = True
        r._pas_audit = True
        self.play(FadeIn(r, shift=UP * 0.15), run_time=0.4)
        self.attendre_voix()

    # ── 06 : l'opposé d'un nombre négatif ───────────────────────────────────
    def ecran_negatif(self):
        self.ecran("06-negatif")
        self.au_mot("nombre négatif")
        self.titre("L'opposé d'un nombre négatif", fs=42, centre=True)
        d = droite_pm(18, 8.0, P(-0.4, 1.1))
        self.play(FadeIn(d, shift=UP * 0.2), run_time=0.5)
        pm = d.point(-7 / 9, "−7/9", couleur=BAS_C)
        pp = d.point(7 / 9, "7/9", couleur=VERT_OK)
        a = CurvedArrow(d.p(-7 / 9) + UP * 1.0, d.p(7 / 9) + UP * 1.0, angle=-TAU / 8, color=AMBRE, stroke_width=6)
        self.L([("l'opposé de", WHITE, "L'opposé de moins"), (moins_frac(7, 9, fs=56, couleur=BAS_C), WHITE, "moins 7"),
                ("est", WHITE, None), (EcritureFraction(7, 9, fs=56, couleur=VERT_OK), WHITE, "c'est 7")], -0.9,
               x=-0.4, avec={1: [FadeIn(pm, shift=DOWN * 0.2)], 3: [Create(a), FadeIn(pp, shift=DOWN * 0.2)]})
        self.au_mot("on enlève le signe")
        r1 = self.t("on enlève le signe « − »", 36, AMBRE).move_to(P(-0.4, -2.05))
        r1.sans_synchro = True
        self.play(FadeIn(r1, shift=UP * 0.15), run_time=0.4)
        self.au_mot("L'opposé de l'opposé")
        r2 = self.t("l'opposé de l'opposé = le nombre de départ", 34, VERT_OK).move_to(P(-0.4, -2.85))
        r2.sans_synchro = True
        self.play(FadeIn(r2, shift=UP * 0.15), run_time=0.4)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (l'opposé de −4/7) ──────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        d = droite_pm(14, 5.4, P(-3.0, 0.4))
        self.add(d)
        pm = d.point(-4 / 7, "−4/7", couleur=BAS_C)
        pp = d.point(4 / 7, "4/7", couleur=VERT_OK)

        def avant(sc):
            sc.au_nb("l'opposé de moins 4")
            sc.q_tete(FadeIn(pm, shift=DOWN * 0.2))

        def apres(sc):
            sc.rep_mots(0, [("On change le signe :", None, "On change"), ("− devient +", None, "le moins devient")],
                        avec={1: [FadeIn(pp, shift=DOWN * 0.2)]})
            sc.rep_mots(1, [("4/7", None, "plus. 4"), ("+ (−4/7)", None, "plus moins 4"), ("= 0", None, "égale 0")])
            sc.fin_rep()

        self.question_pause("07-question", "07b-reponse", ["Quel est l'opposé de −4/7 ?"],
                            [self.inline("−7/4"), self.inline("4/7"), self.inline("−4/7")], 1,
                            ["On change le signe : − devient +", "4/7 + (−4/7) = 0"], avant_q=avant, autres_r=apres)

    # ── 08 : le piège (la fraction retournée) ───────────────────────────────
    def ecran_piege(self):
        self.ecran("08-piege")
        self.au_mot("Attention au piège")
        self.titre("Attention au piège !", ROUGE_ERREUR, 46, centre=True)
        self.au_mot("ce n'est pas la fraction")
        r0 = self.t("opposé ≠ fraction retournée", 40, AMBRE).move_to(P(0, 2.1))
        r0.sans_synchro = True
        self.play(FadeIn(r0, scale=1.1), run_time=0.4)
        f1, g1 = EcritureFraction(2, 5, fs=64), moins_frac(2, 5, fs=64, couleur=VERT_OK)
        e1 = VGroup(f1, Text("→", font_size=64), g1).arrange(RIGHT, buff=0.5).move_to(P(-2.6, 0.5))
        e1[1].sans_synchro = True
        self.au_nb("L'opposé de 2")
        self.play(FadeIn(f1, scale=1.2), run_time=0.35)
        self.au_nb("c'est moins 2")
        self.play(FadeIn(e1[1]), FadeIn(g1, scale=1.3), run_time=0.4)
        self.L([("on change le signe", VERT_OK, "on change le signe")], 0.5, fs=38, x=2.9,
               avec=[Create(self.coche(VERT_OK, 0.3).next_to(g1, RIGHT, buff=0.3))])
        f2, g2 = EcritureFraction(2, 5, fs=64), EcritureFraction(5, 2, fs=64, couleur=ROUGE_ERREUR)
        e2 = VGroup(f2, Text("→", font_size=64), g2).arrange(RIGHT, buff=0.5).move_to(P(-2.6, -1.4))
        e2[1].sans_synchro = True
        for t in f2.get_family():
            t._pas_audit = True
        self.au_nb("signe. 5")
        self.play(FadeIn(f2), FadeIn(e2[1]), FadeIn(g2, scale=1.3), run_time=0.4)
        self.L([("fraction retournée :", ROUGE_ERREUR, ("la fraction retournée", 2))], -1.1, fs=34, x=2.9)
        self.L([("un autre nombre !", ROUGE_ERREUR, "un autre")], -1.7, fs=34, x=2.9, avec=[Create(croix(g2, sw=6))])
        self.au_mot("on ne touche jamais")
        r = self.t("On ne touche jamais à la fraction !", 36, VERT_OK).move_to(P(-0.6, -2.85))
        r.sans_synchro = True
        self.play(FadeIn(r, shift=UP * 0.15), run_time=0.4)
        self.attendre_voix()

    # ── 09 : QUESTION 3 (5/6 + … = 0) ───────────────────────────────────────
    def ecran_question3(self):
        self.clear()
        self.add_mascotte()
        trou = self.morceaux([(EcritureFraction(5, 6, fs=80), WHITE, None), ("+", WHITE, None),
                              ("( … )", ORANGE_TROU, None), ("= 0", WHITE, None)], fs=80, buff=0.35)
        trou.scale_to_fit_width(min(trou.width, 5.4)).move_to(P(-3.2, 0.3))
        rep = moins_frac(5, 6, fs=64, couleur=VERT_OK)
        rep = VGroup(Text("(", font_size=80, color=VERT_OK), rep, Text(")", font_size=80, color=VERT_OK))
        rep.arrange(RIGHT, buff=0.06).move_to(trou[2])
        sans_synchro(rep)

        def avant(sc):
            sc.au_nb("Question ! 5")
            sc.play(FadeIn(trou[0], scale=1.2), run_time=0.35)
            sc.au_mot("plus combien")
            sc.play(FadeIn(trou[1]), FadeIn(trou[2]), run_time=0.3)
            sc.au_nb("égale 0")
            sc.q_tete(FadeIn(trou[3]))

        def apres(sc):
            sc.rep_mots(0, [("5/6", None, "C. 5"), ("+ (−5/6)", None, "plus moins 5"), ("= 0", None, "égale 0")],
                        avec={1: [FadeOut(trou[2]), FadeIn(rep, scale=1.2)]})
            sc.rep_mots(1, [("deux nombres opposés", None, "deux nombres")])
            sc.fin_rep()

        self.question_pause("09-question", "09b-reponse", ["5/6 + combien = 0 ?"],
                            [self.inline("6/5"), self.inline("0"), self.inline("−5/6")], 2,
                            ["5/6 + (−5/6) = 0", "deux nombres opposés"], avant_q=avant, autres_r=apres)

    # ── 10 : défi (mercredi) ────────────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("10-defi", 0.65)
        self.au_mot("À toi de jouer")
        self.titre("À toi de jouer !", fs=50)
        v = volcan(1.0).move_to(P(-4.0, 0.0))
        j = jauge(P(-1.4, 0.1))
        self.play(FadeIn(v, shift=UP * 0.2), FadeIn(j), run_time=0.5)
        self.L([("mercredi :", WHITE, "Mercredi"), ("descend de", BAS_C, "descendu"),
                (EcritureFraction(3, 10, fs=50, couleur=BAS_C), WHITE, "descendu de 3"), ("cm", WHITE, None)], 1.9,
               fs=38, avec={2: [j.curseur.animate.move_to(j.p(-0.3) + RIGHT * 0.2)]})
        self.au_mot("avec un signe")
        l2 = self.col(self.bloc(["1. Écris-le avec un signe.", "2. Son opposé, avec une virgule ?"], 34,
                                ORANGE_RETENUE), 0.5)
        sans_synchro(l2)
        for x in l2.get_family():
            x._pas_audit = True
        self.play(FadeIn(l2[0], shift=UP * 0.15), run_time=0.35)
        self.au_mot("Puis écris son opposé")
        self.play(FadeIn(l2[1], shift=UP * 0.15), run_time=0.35)
        self.pause_defi(y=-0.8)

    def ecran_correction(self):
        self.ecran("10b-correction", 0.65)
        self.titre("Correction", fs=50)
        d = droite_pm(10, 5.6, P(-3.1, 1.0))
        self.add(d)
        pm, pp = d.point(-0.3, "−3/10", couleur=BAS_C), d.point(0.3, "3/10", couleur=VERT_OK)
        self.L([("descendre :", BAS_C, "Descendre"), (moins_frac(3, 10, fs=48, couleur=BAS_C), WHITE, "moins 3")],
               2.2, fs=40, avec={1: [FadeIn(pm, shift=DOWN * 0.2)]})
        self.L([("son opposé :", VERT_OK, "Son opposé"), (EcritureFraction(3, 10, fs=48, couleur=VERT_OK), WHITE,
                                                           "opposé : 3")], 0.8, fs=40, avec={1: [FadeIn(pp, shift=DOWN * 0.2)]})
        self.L([("3 ÷", BLEU_CALCUL, "c'est 3"), ("10 =", BLEU_CALCUL, "divisé par 10"), ("0,3 cm", BLEU_CALCUL,
                                                                                         "égale 0,3")], -0.55, fs=46)
        self.L([("= 3 mm", VERT_OK, "soit 3 mill")], -1.5, fs=46)
        self.attendre_voix()

    # ── 11 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("11-finale", 0.65)
        d = droite_pm(10, 5.0, P(-3.4, 0.0))
        fig = VGroup(d, d.point(0.4, "2/5", couleur=HAUT_C), d.point(-0.4, "−2/5", couleur=BAS_C),
                     DashedLine(d.p(0) + UP * 1.1, d.p(0) + DOWN * 0.9, color=ROUGE_ZERO, stroke_width=4))
        self.add(fig)
        lignes = self.finale_colonne(figure=fig, textes=[("L'opposé : de l'autre côté", "de 0, même distance."),
                                                         ("On change seulement", "le signe."),
                                                         ("Un nombre + son opposé", "= 0."),
                                                         ("L'opposé n'est jamais la", "fraction retournée !")], fs=36)
        self.montrer2(lignes[0], "L'opposé d'un nombre", "côté de 0")
        self.montrer2(lignes[1], "On change seulement", "le signe")
        self.montrer2(lignes[2], "Un nombre plus son", "égale 0")
        self.montrer2(lignes[3], "Et l'opposé", "fraction retournée")
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_signe()
        self.ecran_droite()
        self.ecran_question1()
        self.ecran_somme()
        self.ecran_negatif()
        self.ecran_question2()
        self.ecran_piege()
        self.ecran_question3()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("12-abonne")


class FracOppose5e(FracOpposeBase):
    identite = "Maths 5e — EleveAI"
    ceinture = "verte"
