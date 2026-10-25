# frac_lire_ecrire.py
# EleveAI — Maths 6e — série « Fractions », épisode 01 : LIRE ET ÉCRIRE UNE
# FRACTION (micro du coach : fraction_lire_ecrire), AVEC VOIX. Paysage 16:9,
# CEINTURE VERTE : la paysage complète du niveau (vocabulaire, lecture, écriture
# dans les deux sens, piège, défi corrigé), repère de REGLES.md.
# Short jumeau : frac_lire_ecrire_short.py (blanche, la barre de vie d'un jeu).
#
# Décor et métier : le POTAGER ; Lucas, MARAÎCHER : 8 carrés égaux, des tomates
# dans 3 → 3/8. Défi : son nouveau potager de 10 carrés, 3 de salades, 4 de
# fraises (sa sœur Nina) → il reste 3/10 vide (= 0,3, rappel de la chaîne).
# Aucune donnée du monde réel citée. Centres d'intérêt : nature-ecologie.
#
# Micro → écrans : dénominateur = parts en tout, numérateur = parts prises (02),
# lire : demis, tiers, quarts, puis « ièmes » (03), « que dit le 8 ? » (04,
# question 1, item fraction_lire_ecrire_open_1), lire sur une barre, un disque
# (05, canvas bar/circle du coach), écrire depuis les mots (06), 5/6 ≠ 6/5 ≠ 5,6
# (07, question 2), leurres du QCM du coach : fraction renversée, parts
# restantes (08), lire une barre 4/7 (09, question 3), deux enfants / ce qui
# reste (10, défi, item fraction_lire_ecrire_tpl_deux_enfants).
# Écrans : 00 garde · 01 Lucas · 02 la fraction 3/8 · 03 le nom des parts ·
# 04 QUESTION 1 · 05 toutes les formes · 06 écrire 7/10 · 07 QUESTION 2 ·
# 08 le piège · 09 QUESTION 3 · 10 défi · 10b correction · 11 ce que tu as
# appris · 12 fin.
#
# ⭐ Ajouté DANS CE SCRIPT (canvas_fractions.py et frac_commun.py non modifiés) :
# maraicher(), potager() (le potager dessiné, des plants qui poussent).
# Voix : manim/voix/6e-frac-lire-ecrire.json (débit −10), WAV dans
# public/sons/6e-frac-lire-ecrire/ ; calage mot à mot :
# manim/scripts/6e/frac_lire_ecrire_marques.json (scripts/marques_dump.ps1 puis
# scripts/cues2marques.py, voir frac_egale.py).
# python -m manim render -qh --disable_caching manim/scripts/6e/frac_lire_ecrire.py FracLireEcrire6e -o eleveai-maths-6e-frac-lire-ecrire --media_dir manim/scripts/6e/media-frac-lire-ecrire
# Sortie : manim/sorties/6e/maths/fractions/01-lire-ecrire/eleveai-maths-6e-frac-lire-ecrire.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from frac_commun import *  # noqa: E402,F403

TERRE, TERRE_F, BOIS = "#8b5a2b", "#6b4423", "#a16207"
FEUILLE, TOMATE = "#22c55e", "#ef4444"
FRAISE = "#f87171"


def maraicher(s=1.0):
    """Lucas, maraîcher : chapeau de paille, salopette verte, une cagette."""
    tete = Circle(radius=0.42, fill_color="#c68642", fill_opacity=1, stroke_width=0)
    bord = Ellipse(width=1.35, height=0.3, fill_color="#facc15", fill_opacity=1, stroke_width=0).move_to(P(0, 0.33))
    calotte = RoundedRectangle(width=0.72, height=0.4, corner_radius=0.15, fill_color="#eab308", fill_opacity=1,
                               stroke_width=0).move_to(P(0, 0.52))
    corps = Polygon(P(-0.75, -1.9), P(0.75, -1.9), P(0.5, -0.45), P(-0.5, -0.45), fill_color="#15803d",
                    fill_opacity=1, stroke_width=0)
    bretelles = VGroup(*[Line(P(x, -0.5), P(x * 0.7, -1.0), color="#bbf7d0", stroke_width=6) for x in (-0.3, 0.3)])
    cagette = Rectangle(width=1.1, height=0.42, fill_color=BOIS, fill_opacity=1, stroke_width=0).move_to(P(0, -1.35))
    toms = VGroup(*[Circle(radius=0.12, fill_color=TOMATE, fill_opacity=1, stroke_width=0).move_to(P(x, -1.08))
                    for x in (-0.33, -0.08, 0.17, 0.4)])
    return VGroup(corps, bretelles, toms, cagette, tete, calotte, bord).scale(s)


def plant(c=0.9, fruit=TOMATE):
    """Un plant : une tige, deux feuilles, trois fruits."""
    tige = Line(P(0, -0.3 * c), P(0, 0.25 * c), color=FEUILLE, stroke_width=6)
    f = VGroup(*[Ellipse(width=0.3 * c, height=0.14 * c, fill_color=FEUILLE, fill_opacity=1, stroke_width=0)
                 .rotate(a).move_to(P(dx * c, 0.0)) for dx, a in ((-0.13, 0.5), (0.13, -0.5))])
    fr_ = VGroup(*[Circle(radius=0.08 * c, fill_color=fruit, fill_opacity=1, stroke_width=0).move_to(P(x * c, y * c))
                   for x, y in ((-0.12, 0.2), (0.12, 0.26), (0.0, -0.12))])
    return VGroup(tige, f, fr_)


def potager(lignes=2, colonnes=4, cote=0.95, centre=ORIGIN):
    """Le potager dessiné : des carrés de terre dans un cadre de bois.
    .cases[i] (ordre de lecture) ; plants à ajouter avec plant()."""
    cases = VGroup(*[Square(cote, fill_color=TERRE, fill_opacity=1, stroke_color=TERRE_F, stroke_width=5)
                     .move_to(P((i % colonnes - (colonnes - 1) / 2) * cote, ((lignes - 1) / 2 - i // colonnes) * cote))
                     for i in range(lignes * colonnes)])
    cadre = SurroundingRectangle(cases, buff=0.06, color=BOIS, stroke_width=10, corner_radius=0.05)
    g = VGroup(cadre, cases).move_to(centre)
    g.cases = cases
    return g


class FracLireEcrireBase(PaysageFrac):
    nom_voix = "6e-frac-lire-ecrire"
    fichier_marques = "frac_lire_ecrire_marques.json"

    def _disposer_q(self, question, choix, phrase):
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        self.cartes_q, self.ph_q, self.q_q = cartes, ph, q
        return tete, q, cartes, pause, rebours, ph

    def q_tete(self, *anims):
        """Dans un avant_q : la 1re ligne de la question À SON MOT, avec la figure
        (sinon elle attend la fin de la figure) ; question_pause pose le reste."""
        l0 = self.q_q[0]
        self.play(FadeIn(l0, shift=UP * 0.15), *anims, run_time=0.5)
        self.q_q.remove(l0)

    def montrer2(self, lg, *mots, autres=()):
        """« Ce que tu as appris » : la coche et la 1re ligne au 1er mot, chaque
        ligne suivante à SON mot."""
        self.au_mot(mots[0])
        self.play(Create(lg[0]), FadeIn(lg[1][0], shift=RIGHT * 0.2), *autres, run_time=0.5)
        for m, l in zip(mots[1:], lg[1][1:]):
            self.au_mot(m)
            self.play(FadeIn(l, shift=RIGHT * 0.2), run_time=0.35)

    def rep(self, i, mot, *anims, run_time=0.5):
        """Une ligne de l'explication d'une question, AU MOT, avec le geste de la
        figure (amélioration demandée : plus de ligne qui attend la fin du geste)."""
        self.au_mot(mot)
        self.play(FadeIn(self.ph_q[i], shift=UP * 0.15), *anims, run_time=run_time)

    def fin_rep(self):
        """Les lignes sont posées : question_pause n'a plus rien à poser."""
        self.ph_q.submobjects = []

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Lire et écrire une fraction", self.identite, self.ceinture)
        d = Disque(8, 3, rayon=1.15, centre=P(-1.6, -0.1))
        q = self.t("?", 110, AMBRE).move_to(P(1.4, -0.1))
        self.au_mot("Lire et écrire")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        self.au_mot("deux nombres")
        self.play(d.apparaitre(1.0))
        self.play(FadeIn(q, scale=0.4), run_time=0.4)
        self.insister(q, 1.3, 0.25)
        self.attendre_voix(marge=0.8)

    # ── 01 : Lucas, maraîcher ───────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pers = maraicher(1.15).move_to(P(-5.2, -0.4))
        self.au_mot("Voici Lucas")
        nom = self.t("Lucas", 40, BLEU_CALCUL).next_to(pers, UP, buff=0.3)
        self.play(FadeIn(pers, shift=UP * 0.3), FadeIn(nom), run_time=0.6)
        self.au_mot("maraîcher")
        metier = self.t("maraîcher", 36, BLEU_CALCUL).next_to(pers, DOWN, buff=0.25)
        self.play(FadeIn(metier, shift=UP * 0.2), run_time=0.4)
        pot = potager(centre=P(-1.6, -0.2))
        self.au_mot("Son potager")
        self.play(FadeIn(pot[0]), LaggedStart(*[FadeIn(c, scale=0.8) for c in pot.cases], lag_ratio=0.08),
                  run_time=1.0)
        self.au_mot("8 carrés égaux")
        l1 = self.col(self.ligne([("8", BLEU_CALCUL), ("carrés égaux", WHITE)], 42), 1.6)
        self.play(FadeIn(l1, shift=RIGHT * 0.2),
                  LaggedStart(*[Indicate(c, color=AMBRE, scale_factor=1.08) for c in pot.cases], lag_ratio=0.1),
                  run_time=1.0)
        self.au_mot("tomates dans 3")
        plants = VGroup(*[plant().move_to(pot.cases[i]) for i in range(3)])
        l2 = self.col(self.ligne([("tomates dans", WHITE), ("3", TOMATE), ("carrés", WHITE)], 42), 0.6)
        self.play(LaggedStart(*[GrowFromPoint(p, p.get_bottom()) for p in plants], lag_ratio=0.3),
                  FadeIn(l2, shift=RIGHT * 0.2), run_time=1.0)
        self.au_mot("Quelle part")
        q = self.col(self.t("Quelle part du potager ?", 40, ORANGE_RETENUE), -0.6)
        self.play(FadeIn(q, scale=0.8), run_time=0.4)
        self.attendre_voix()

    # ── 02 : la fraction 3/8 ────────────────────────────────────────────────
    def ecran_fraction(self):
        self.ecran("02-fraction")
        gr = Grille(2, 4, 0, cote=0.9, centre=P(-3.6, 0.4))
        f = EcritureFraction(3, 8, fs=120).move_to(P(1.7, 0.4))
        self.add(gr)
        self.au_mot("8 carrés en tout")
        bas = self.ligne([("8", BLEU_CALCUL), ("carrés en tout", WHITE)], 36)
        bas.next_to(f.den, RIGHT, buff=0.6)
        self.play(FadeIn(f.den, scale=1.4), FadeIn(bas, shift=RIGHT * 0.2),
                  LaggedStart(*[Indicate(c, color=AMBRE, scale_factor=1.1) for c in gr.liste], lag_ratio=0.06),
                  run_time=1.0)
        self.au_mot("dénominateur")
        nd = self.t("le dénominateur", 36, AMBRE).next_to(bas, DOWN, buff=0.18).align_to(bas, LEFT)
        self.play(FadeIn(nd, shift=UP * 0.15), run_time=0.4)
        self.au_mot("en bas")
        self.insister(f.den, 1.35, 0.25)
        self.au_mot("planté 3")
        haut = self.ligne([("3", BLEU_CALCUL), ("carrés plantés", WHITE)], 36)
        haut.next_to(f.num, RIGHT, buff=0.6).align_to(bas, LEFT)
        self.play(gr.colorier(range(3)), FadeIn(f.num, scale=1.4), FadeIn(haut, shift=RIGHT * 0.2), run_time=0.8)
        self.au_mot("numérateur")
        nn = self.t("le numérateur", 36, AMBRE).next_to(haut, UP, buff=0.18).align_to(bas, LEFT)
        self.play(FadeIn(nn, shift=DOWN * 0.15), run_time=0.4)
        self.au_mot("en haut")
        self.insister(f.num, 1.35, 0.25)
        self.au_mot("un trait")
        self.play(Create(f.trait), run_time=0.5)
        self.au_mot("On lit")
        lit = self.ligne([("On lit :", WHITE), ("3 huitièmes", JAUNE_TITRE)], 46).move_to(P(0, -2.5))
        self.play(FadeIn(lit[0], shift=RIGHT * 0.2), run_time=0.3)
        self.au_mot("3 huitièmes")
        self.play(FadeIn(lit[1], scale=1.3), run_time=0.4)
        self.play(Create(self.encadrer(lit[1])), run_time=0.4)
        self.attendre_voix()

    # ── 03 : le nom des parts ───────────────────────────────────────────────
    def ecran_noms(self):
        self.ecran("03-noms")
        self.au_mot("le nom des parts")
        tit = self.t("Le nom des parts", 46, JAUNE_TITRE).move_to(P(0, 3.05))
        self.play(Write(tit), run_time=0.5)
        rangs = [(2, "demis", "En 2"), (3, "tiers", "En 3"), (4, "quarts", "En 4"),
                 (5, "cinquièmes", "En 5"), (8, "huitièmes", "En 8"), (10, "dixièmes", "En 10")]
        for k, (n, nom, mot) in enumerate(rangs):
            x0 = -5.0 if k < 3 else 0.55
            y = [1.35, 0.0, -1.35][k % 3]
            b = Barre(n, 1, largeur=1.9, hauteur=0.48, marge=0.14, centre=P(x0, y))
            lg = self.ligne([(str(n), AMBRE), ("→", WHITE), (nom, BLEU_CALCUL)], 36)
            lg.next_to(b, RIGHT, buff=0.3)
            if k == 3:
                self.au_mot("on ajoute")
                ieme = self.t("puis on ajoute « ième »", 34, VERT_OK).move_to(P(2.4, 2.25))
                self.play(FadeIn(ieme, shift=DOWN * 0.15), run_time=0.4)
            self.au_mot(mot)
            self.play(b.apparaitre(0.6), FadeIn(lg[0], scale=1.3), run_time=0.6)
            self.au_mot(nom)
            self.play(FadeIn(lg[1:], shift=RIGHT * 0.2), run_time=0.35)
        self.attendre_voix()

    # ── 04 : QUESTION 1 (que dit le 8 ?) ────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        gr = Grille(2, 4, 3, cote=0.9, centre=P(-3.4, 0.9))
        f = EcritureFraction(3, 8, fs=80).next_to(gr, DOWN, buff=0.45)

        def avant(sc):
            sc.q_tete(gr.apparaitre(0.6), FadeIn(f, scale=1.2))

        def apres(sc):
            sc.rep(0, "Le 8", Indicate(f.den, color=VERT_OK, scale_factor=1.5))
            sc.rep(1, "compte tous", LaggedStart(*[Indicate(c, color=VERT_OK, scale_factor=1.1) for c in gr.liste],
                                                 lag_ratio=0.06), run_time=1.0)
            sc.au_mot("c'est le 3")
            sc.play(Indicate(f.num, color=AMBRE, scale_factor=1.5), run_time=0.6)
            sc.fin_rep()

        self.question_pause("04-question", "04b-reponse", ["Dans 3 huitièmes,", "que dit le 8 ?"],
                            ["8 carrés en tout", "8 carrés plantés", "8 carrés vides"], 0,
                            ["Le 8, en bas,", "compte tous les carrés."], mot_q="Dans 3", avant_q=avant,
                            autres_r=apres)

    # ── 05 : toutes les formes (barre, disque) ──────────────────────────────
    def ecran_formes(self):
        self.ecran("05-formes")
        self.au_mot("toutes les formes")
        tit = self.col(self.t("Toutes les formes", 46, JAUNE_TITRE), 3.0)
        self.play(Write(tit), run_time=0.5)
        b = Barre(5, 0, largeur=5.0, hauteur=0.7, centre=P(-3.4, 1.55))
        d = Disque(6, 0, rayon=1.15, centre=P(-3.4, -1.55))
        for fig, n, k, mot_fig, mot_k, mot_f, nom, y in ((b, 5, 2, "Une barre", "2 sont", "2 cinquièmes", "cinquièmes", 1.55),
                                                         (d, 6, 5, "Un disque", "5 sont", "5 sixièmes", "sixièmes", -1.55)):
            self.au_mot(mot_fig)
            self.play(fig.apparaitre(0.9))
            self.au_mot(mot_k)
            self.play(fig.colorier(range(k), lag=0.15), run_time=0.8)
            self.au_mot(mot_f)
            f = EcritureFraction(k, n, fs=84).move_to(P(1.9, y))
            lu = self.ligne([(str(k), JAUNE_TITRE), (nom, JAUNE_TITRE)], 40).next_to(f, RIGHT, buff=0.6)
            self.play(FadeIn(f, scale=1.3), FadeIn(lu, shift=RIGHT * 0.2), run_time=0.45)
        self.attendre_voix()

    # ── 06 : écrire 7 dixièmes ──────────────────────────────────────────────
    def ecran_ecrire(self):
        self.ecran("06-ecrire")
        self.au_mot("l'autre sens")
        tit = self.col(self.t("Dans l'autre sens", 46, JAUNE_TITRE), 3.0)
        self.play(Write(tit), run_time=0.5)
        self.au_mot("7 dixièmes")
        mots = self.ligne([("7", JAUNE_TITRE), ("dixièmes", JAUNE_TITRE)], 50).move_to(P(-3.3, 2.0))
        self.play(FadeIn(mots, scale=1.2), run_time=0.45)
        f = EcritureFraction(7, 10, fs=110).move_to(P(1.55, 0.2))
        b = Barre(10, 0, largeur=5.4, hauteur=0.65, centre=P(-3.3, -0.4))
        self.au_mot("10 en bas")
        self.play(FadeIn(f.trait), FadeIn(f.den, scale=1.4), run_time=0.4)
        self.au_mot("10 parts en tout")
        l1 = self.ligne([("10", BLEU_CALCUL), ("parts en tout", WHITE)], 34).next_to(f.den, RIGHT, buff=0.4)
        self.play(FadeIn(l1, shift=RIGHT * 0.2), b.apparaitre(0.9), run_time=0.9)
        self.au_mot("7 en haut")
        self.play(FadeIn(f.num, scale=1.4), run_time=0.4)
        self.au_mot("7 parts prises")
        l2 = self.ligne([("7", BLEU_CALCUL), ("parts prises", WHITE)], 34).next_to(f.num, RIGHT, buff=0.4)
        l2.align_to(l1, LEFT)
        self.play(FadeIn(l2, shift=RIGHT * 0.2), b.colorier(range(7), lag=0.1), run_time=0.9)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (comment s'écrit 5 sixièmes ?) ─────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        mots = self.ligne([("5", JAUNE_TITRE), ("sixièmes", JAUNE_TITRE)], 64).move_to(P(-3.3, 0.6))
        d = Disque(6, 5, rayon=1.0, centre=P(-3.3, -1.6))

        def avant(sc):
            sc.q_tete()
            sc.play(FadeIn(mots, scale=1.2), run_time=0.4)

        def apres(sc):
            sc.rep(0, "6 parts en tout", d.apparaitre(0.8), run_time=0.8)
            sc.rep(1, "5 parts prises")
            sc.fin_rep()

        self.question_pause("07-question", "07b-reponse", ["Comment s'écrit", "5 sixièmes ?"],
                            [self.inline("6/5"), self.inline("5/6"), self.inline("5,6")], 1,
                            ["6 parts en tout : en bas.", "5 parts prises : en haut."], mot_q="Comment",
                            avant_q=avant, autres_r=apres)

    # ── 08 : le piège ───────────────────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("08-piege")
        pot = potager(centre=P(-3.4, 0.3))
        plants = VGroup(*[plant().move_to(pot.cases[i]) for i in range(3)])
        self.add(pot, plants)
        self.au_mot("Attention au piège")
        tit = self.col(self.t("Attention au piège !", 46, ROUGE_ERREUR), 3.0)
        self.play(Write(tit), run_time=0.5)
        fs = 64
        f1 = EcritureFraction(8, 3, fs=fs, couleur=ROUGE_ERREUR).move_to(P(1.7, 1.55))
        f2 = EcritureFraction(5, 8, fs=fs, couleur=ORANGE_RETENUE).move_to(P(1.7, -0.25))
        f3 = EcritureFraction(3, 8, fs=fs, couleur=VERT_OK).move_to(P(1.7, -2.05))
        self.au_mot("le 8 en haut")
        self.play(FadeIn(f1, scale=1.3), run_time=0.4)
        x1 = croix(f1, sw=6).set_stroke(opacity=0.85)
        self.play(Create(x1), run_time=0.4)
        self.au_mot("toujours en bas")
        t1 = self.t("en tout : en bas !", 34, WHITE).next_to(f1, RIGHT, buff=0.5)
        self.play(FadeIn(t1, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("les carrés vides")
        vides = [pot.cases[i] for i in range(3, 8)]
        self.play(*[c.animate.set_stroke(ORANGE_RETENUE, 7) for c in vides], run_time=0.6)
        self.au_mot("5 huitièmes")
        self.play(FadeIn(f2, scale=1.3), run_time=0.4)
        self.au_mot("ce qui reste")
        t2 = self.t("ce qui reste", 34, ORANGE_RETENUE).next_to(f2, RIGHT, buff=0.5).align_to(t1, LEFT)
        self.play(FadeIn(t2, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("a planté 3 huitièmes")
        t3 = self.t("planté", 34, VERT_OK).next_to(f3, RIGHT, buff=0.5).align_to(t1, LEFT)
        self.play(FadeIn(f3, scale=1.3), FadeIn(t3, shift=RIGHT * 0.2),
                  *[c.animate.set_stroke(TERRE_F, 5) for c in vides], run_time=0.5)
        self.play(Create(self.encadrer(VGroup(f3, t3))), Indicate(plants, color=VERT_OK), run_time=0.6)
        self.attendre_voix()

    # ── 09 : QUESTION 3 (la barre 4/7) ──────────────────────────────────────
    def ecran_question3(self):
        self.clear()
        self.add_mascotte()
        b = Barre(7, 4, largeur=5.4, hauteur=0.75, centre=P(-3.3, 0.3))
        self.add(b)

        def apres(sc):
            sc.rep(0, "7 parts en tout",
                   LaggedStart(*[Indicate(p, color=AMBRE, scale_factor=1.12) for p in b.parts], lag_ratio=0.08),
                   run_time=0.9)
            sc.rep(1, "4 parts coloriées",
                   LaggedStart(*[Indicate(b.parts[i], color=WHITE, scale_factor=1.15) for i in range(4)],
                               lag_ratio=0.15), run_time=0.8)
            sc.au_mot("la partie blanche")
            sc.play(Indicate(sc.cartes_q[1], color=ORANGE_RETENUE, scale_factor=1.03), run_time=0.5)
            sc.fin_rep()

        self.question_pause("09-question", "09b-reponse", ["Quelle fraction de la", "barre est coloriée ?"],
                            [self.inline("7/4"), self.inline("3/7"), self.inline("4/7")], 2,
                            ["7 parts en tout, en bas.", "4 coloriées, en haut."], mot_q="Quelle",
                            autres_r=apres)

    # ── 10 : défi (le potager de 10 carrés) ─────────────────────────────────
    def grille_defi(self, remplie=False):
        gr = Grille(2, 5, 0, cote=0.95, centre=P(-3.4, 0.2))
        if remplie:
            for i in range(3):
                gr.liste[i].set_fill(VERT_PART, 1)
            for i in range(3, 7):
                gr.liste[i].set_fill(FRAISE, 1)
        return gr

    def ecran_defi(self):
        self.ecran("10-defi", 0.65)
        gr = self.grille_defi()
        self.au_mot("À toi de jouer")
        tit = self.col(self.t("À toi de jouer !", 50, JAUNE_TITRE), 3.0)
        self.play(Write(tit), run_time=0.6)
        self.au_mot("10 carrés égaux")
        l1 = self.col(self.ligne([("10", BLEU_CALCUL), ("carrés égaux", WHITE)], 40), 2.0)
        self.play(gr.apparaitre(1.0), FadeIn(l1, shift=RIGHT * 0.2), run_time=1.0)
        self.au_mot("3 carrés de salades")
        l2 = self.col(self.ligne([("3", VERT_PART), ("de salades", WHITE)], 40), 1.15)
        self.play(gr.colorier(range(3), couleur=VERT_PART, lag=0.15), FadeIn(l2, shift=RIGHT * 0.2), run_time=0.8)
        self.au_mot("4 carrés de fraises")
        l3 = self.col(self.ligne([("4", FRAISE), ("de fraises (Nina)", WHITE)], 40), 0.3)
        self.play(gr.colorier(range(3, 7), couleur=FRAISE, lag=0.15), FadeIn(l3, shift=RIGHT * 0.2), run_time=0.8)
        self.au_mot("Quelle fraction")
        l4 = self.col(self.t("Quelle fraction reste vide ?", 38, ORANGE_RETENUE), -0.6)
        self.play(FadeIn(l4, scale=0.8), run_time=0.4)
        self.pause_defi(y=-1.5)

    def ecran_correction(self):
        self.ecran("10b-correction", 0.65)
        gr = self.grille_defi(remplie=True)
        self.add(gr)
        tit = self.col(self.t("Correction", 50, JAUNE_TITRE), 3.0)
        self.play(Write(tit), run_time=0.5)
        self.au_mot("10 carrés en tout")
        l1 = self.col(self.ligne([("10", BLEU_CALCUL), ("en tout : en bas", WHITE)], 38), 2.1)
        self.play(FadeIn(l1, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("3 plus 4")
        l2 = self.col(self.ligne([("3 + 4 = 7", WHITE), ("plantés", WHITE)], 38), 1.3)
        self.play(FadeIn(l2, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("10 moins 7")
        l3 = self.col(self.ligne([("10 − 7 = 3", WHITE), ("vides", ORANGE_RETENUE)], 38), 0.5)
        self.play(FadeIn(l3, shift=RIGHT * 0.2), run_time=0.4)
        self.play(*[Indicate(gr.liste[i], color=ORANGE_RETENUE, scale_factor=1.12) for i in range(7, 10)], run_time=0.6)
        self.au_mot("Il reste 3 dixièmes")
        f = EcritureFraction(3, 10, fs=84).move_to(P(1.9, -1.15))
        self.play(FadeIn(f, scale=1.3), run_time=0.4)
        self.play(Create(self.encadrer(f)), run_time=0.4)
        self.au_mot("c'est aussi 0,3")
        z = self.ligne([("=", WHITE), ("0,3", BLEU_CALCUL)], 64).next_to(f, RIGHT, buff=0.5)
        z[0].set_y(f.trait.get_y())
        z[1].set_y(f.trait.get_y())
        self.play(FadeIn(z, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("on le verra bientôt")
        bt = self.col(self.t("(une prochaine vidéo)", 30, AMBRE), -2.55)
        self.play(FadeIn(bt, shift=UP * 0.15), run_time=0.4)
        self.attendre_voix()

    # ── 11 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("11-finale", 0.65)
        gr = Grille(2, 4, 3, cote=0.75, centre=P(-3.6, 0.4))
        f = EcritureFraction(3, 8, fs=80).next_to(gr, DOWN, buff=0.4)
        fig = VGroup(gr, f)
        self.add(fig)
        lignes = self.finale_colonne(figure=fig, textes=[("Le dénominateur, en bas :", "toutes les parts."),
                                                         ("Le numérateur, en haut :", "les parts prises."),
                                                         ("On lit : demis, tiers, quarts,", "puis les « ièmes »."),
                                                         ("Des parts toujours égales.",)], fs=36)
        self.montrer2(lignes[0], "Le dénominateur", "compte toutes", autres=[Indicate(f.den, color=AMBRE, scale_factor=1.4)])
        self.montrer2(lignes[1], "Le numérateur", "compte les parts", autres=[Indicate(f.num, color=AMBRE, scale_factor=1.4)])
        self.montrer2(lignes[2], "On lit", "puis les")
        self.montrer2(lignes[3], "Et les parts")
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_fraction()
        self.ecran_noms()
        self.ecran_question1()
        self.ecran_formes()
        self.ecran_ecrire()
        self.ecran_question2()
        self.ecran_piege()
        self.ecran_question3()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("12-abonne")


class FracLireEcrire6e(FracLireEcrireBase):
    identite = "Maths 6e — EleveAI"
    ceinture = "verte"
