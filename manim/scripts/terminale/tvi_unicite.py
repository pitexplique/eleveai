# tvi_unicite.py
# EleveAI — Maths Tle spé — paysage « Justifier l'unicité d'une solution » (16:9),
# ceinture VERTE. Micro du coach : tvi_unicite (notion continuite_tvi).
# Épisode 3 sur 5 de la série « CONTINUITÉ ET TVI ».
# Centre : sport (liste fermée lib/videos/centres-interet.ts, tranche 15-18).
#
# Clé de voix → écran :
#   · 00-garde / 01-situation : Mathis court le Grand Raid — sa distance ne recule
#     jamais, il passe au kilomètre cent une fois et une seule ;
#   · 02-idee       : deux courbes, mêmes bornes, trois traversées contre une ;
#   · 03-theoreme   : le corollaire du TVI (théorème de la bijection) ;
#   · 04/04b        : question 1 — g croissante de 2 à 9 : AUCUNE solution (réponse C) ;
#   · 05-appliquer  : eˣ + x − 4 sur [0 ; 2], f ′ = eˣ + 1 > 0 ;
#   · 06-piege      : « strictement », le TVI seul, et l'intervalle de travail ;
#   · 07/07b        : question 2 — il manque la stricte monotonie (réponse B) ;
#   · 08-rediger    : la seule ligne qui change par rapport à l'épisode 2 ;
#   · 09/09b        : le défi — x + ln x = 3 sur [1 ; 3] ;
#   · 10-finale / 11-abonne.
#
# ⚠️ Bonne réponse : 04 → C, 07 → B (tirage graine 2711).
# ⛔⛔ Nombres HORS AUDIT (`self.lettres`) : la voix les dit en toutes lettres.
# ⛔ Les glyphes ⩽ et ⩾ sont REFUSÉS par le socle (carré vide) : écrire ≤ et ≥.
#
# Rendu : python -m manim render -ql --disable_caching manim/scripts/terminale/tvi_unicite.py TviUnicite -o eleveai-maths-terminale-tvi-unicite --media_dir manim/scripts/terminale/media

import math
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(1, str(Path(__file__).resolve().parents[2] / "poste2"))

from manim import *

from analyse_ecrans import CompteARebours, EcransAnalyse, P, XL, C_COURBE
from charte import *

Q04 = (["Combien de solutions", "pour g(x) = 0 ?"],
       [("une seule,", "g est monotone"),
        ("on ne peut", "pas le savoir"),
        ("aucune, 0 n'est", "jamais atteint")],
       {"fs_enonce": 28}, "C")   # ⚠️ 30 px : l'énoncé était RÉTRÉCI de 2 % par col()

# ⚠️ Mesuré : en deux lignes l'énoncé était rétréci de 9 %, et en trois lignes avec des
# cartes à DEUX lignes le bloc descendait sur Ti-Margo. Trois lignes d'énoncé + des
# cartes d'UNE ligne : l'énoncé garde sa taille, et le bloc remonte à −1,2.
Q07 = (["Qu'est-ce qui manque", "pour écrire", "« une unique solution » ?"],
       [("que f soit dérivable sur [0 ; 6]",),
        ("que f soit strictement monotone",),
        ("rien, on peut déjà l'écrire",)],
       {"largeur": 6.0, "xl": 0.6, "fs_enonce": 28}, "B")


def ondule(x):
    """La courbe qui monte, redescend et remonte : −3 en 0, 5 en 4, trois traversées."""
    # ⚠️ AMPLITUDE 3,2 ET PAS 2,6 : vu à la planche, le deuxième creux descendait à
    # −1,6, soit 0,26 d'écran sur une figure de 1,6 de haut. L'écran annonçait « elle
    # coupe trois fois » et on n'en voyait que deux. Une figure qui ne montre pas ce
    # que le texte affirme est pire qu'une figure absente.
    return -3 + 2 * x + 3.2 * math.sin(3 * math.pi * x / 4)


def monte(x):
    """La courbe qui ne fait que monter : mêmes bornes, UNE traversée."""
    return -3 + 2 * x


def f_appliquer(x):
    return math.exp(x) + x - 4


def f_defi(x):
    return x + math.log(x) - 3


class TviUnicite(EcransAnalyse):
    nom_voix = "terminale-tvi-unicite"

    def page_de_garde(self):
        self.clear()
        self.dire("00-garde")
        self.add_mascotte(scale=0.8)
        titre = self.t("Justifier l'unicité d'une solution", 46, JAUNE_TITRE, larg=11.6)
        titre.to_edge(UP, buff=0.55)
        ident = self.t(self.identite, 26).next_to(titre, DOWN, buff=0.22)
        coeur = self.t("au moins une  →  une seule", 54, BLEU_CALCUL).move_to(P(-0.6, 0.6))
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2))
        self.play(FadeIn(coeur))
        self.au_mot("il faut une hypothèse de plus")
        sous = self.t("il faut une hypothèse de plus", 36, ORANGE_RETENUE)
        self.play(FadeIn(sous.move_to(P(-0.6, -0.6)), shift=UP * 0.15))
        self.play(FadeIn(self.echelle().align_to(P(0, -3.45), DOWN)))
        self.attendre_voix(marge=0.5)

    def situation(self):
        self.clear()
        self.dire("01-situation")
        self.add_mascotte(scale=0.5)
        titre = self.t("Mathis sur le Grand Raid", 40, JAUNE_TITRE).to_edge(UP, buff=0.45)
        self.play(Write(titre), run_time=0.6)

        ax, grad = self.plan_axes((0, 10.5, 2), (0, 170, 50), centre=(-3.3, -0.3),
                                  w=4.6, h=3.4, grad_y=(100,))
        self.play(Create(ax), FadeIn(grad), run_time=0.6)

        self.au_mot("Sa distance parcourue")
        c = self.courbe(ax, lambda t: 165 * (t / 10.5) ** 1.25, 0, 10.4, color=VERT_OK)
        self.play(Create(c), run_time=1.3)
        self.play(FadeIn(self.col(self.pile(
            [self.t("elle ne saute pas", 30, VERT_OK),
             self.t("et ne recule jamais", 30, VERT_OK)], 2.2), 2.2)))

        self.au_mot("est donc passé au kilomètre 100")
        self.play(Create(self.niveau(ax, 100)), run_time=0.5)
        t100 = 10.5 * (100 / 165) ** (1 / 1.25)
        d = self.pt(ax, t100, 100, JAUNE_TITRE, r=0.11)
        self.play(FadeIn(d, scale=2.2), Flash(d, color=JAUNE_TITRE, line_length=0.25))
        self.play(FadeIn(self.col(
            self.t("au km 100 : une fois", 34, JAUNE_TITRE), 0.6)))

        self.au_mot("Un promeneur qui ferait demi-tour")
        self.play(FadeIn(self.col(self.pile(
            [self.t("un promeneur qui", 28, ORANGE_RETENUE),
             self.t("fait demi-tour :", 28, ORANGE_RETENUE),
             self.t("trois fois", 30, ORANGE_RETENUE)], -1.2), -1.2)))
        self.attendre_voix(marge=0.5)

    def idee(self):
        self.clear()
        self.dire("02-idee")
        self.add_mascotte(scale=0.5)
        titre = self.t("Deux courbes, deux réponses", 40, JAUNE_TITRE).to_edge(UP, buff=0.45)
        self.play(Write(titre), run_time=0.5)

        ax1, g1 = self.plan_axes((0, 4.2, 1), (-4, 6, 2), centre=(-3.3, 1.45),
                                 w=4.6, h=1.9, grad_y=(0,))
        ax2, g2 = self.plan_axes((0, 4.2, 1), (-4, 6, 2), centre=(-3.3, -1.5),
                                 w=4.6, h=1.9, grad_y=(0,))
        self.play(Create(ax1), Create(ax2), FadeIn(g1), FadeIn(g2), run_time=0.7)

        self.au_mot("Elles partent toutes les deux de moins 3")
        bornes = VGroup(self.pt(ax1, 0, -3, GREY_B), self.pt(ax1, 4, 5, GREY_B),
                        self.pt(ax2, 0, -3, GREY_B), self.pt(ax2, 4, 5, GREY_B))
        self.play(FadeIn(bornes), run_time=0.4)
        self.play(FadeIn(self.col(
            self.t("de −3 à 5, les deux", 30), 2.6)))

        self.au_mot("La première monte, redescend")
        self.play(Create(self.courbe(ax1, ondule, 0, 4.1, color=ORANGE_RETENUE)),
                  run_time=1.1)
        self.play(FadeIn(self.col(self.t("elle coupe trois fois", 30, ORANGE_RETENUE), 1.3)))

        self.au_mot("La seconde ne fait que monter")
        self.play(Create(self.courbe(ax2, monte, 0, 4.1, color=VERT_OK)), run_time=0.9)
        self.play(FadeIn(self.col(self.t("elle coupe une fois", 30, VERT_OK), -0.5)))

        self.au_mot("c'est le sens de variation")
        self.play(FadeIn(self.col(self.t("ce qui change :\nle sens de variation", 30,
                                         JAUNE_TITRE), -1.8)))
        self.attendre_voix(marge=0.5)

    def theoreme(self):
        self.clear()
        self.dire("03-theoreme")
        self.add_mascotte(scale=0.5)
        titre = self.t("Le corollaire du TVI", 42, JAUNE_TITRE).to_edge(UP, buff=0.45)
        self.play(Write(titre), run_time=0.5)
        lignes = [("f est continue sur [a ; b]", VERT_OK, "Soit f une fonction continue"),
                  ("et strictement monotone", VERT_OK, "et strictement monotone"),
                  ("k est compris entre f(a) et f(b)", VERT_OK, "Soit k un nombre"),
                  ("alors f(x) = k admet", WHITE, "Alors l'équation"),
                  ("une UNIQUE solution dans [a ; b]", WHITE, "admet une unique solution")]
        bloc = VGroup(*[self.t(s, 34, c) for s, c, _ in lignes])
        bloc.arrange(DOWN, aligned_edge=LEFT, buff=0.24).move_to(P(-0.5, 0.9))
        for l, (_, _, mot) in zip(bloc, lignes):
            self.au_mot(mot)
            self.play(FadeIn(l, shift=RIGHT * 0.2), run_time=0.35)
        self.au_mot("Deux hypothèses, et pas une seule")
        d = self.t("DEUX hypothèses, pas une", 36, ORANGE_RETENUE).move_to(P(-0.5, -1.6))
        self.play(FadeIn(d, scale=1.15))
        self.au_mot("se justifie par le signe de la dérivée")
        j = self.t("la monotonie se prouve par le signe de f ′", 30, BLEU_CALCUL)
        self.play(FadeIn(j.move_to(P(-0.5, -2.5))))
        self.attendre_voix(marge=0.5)

    def question_1(self):
        self.clear()
        self.dire("04-question")
        self.add_mascotte(scale=0.5)
        donnees = VGroup(self.t("g continue et", 30),
                         self.t("strictement croissante", 30),
                         self.t("sur [0 ; 5]", 32),
                         self.t("g(0) = 2", 40, BLEU_CALCUL),
                         self.t("g(5) = 9", 40, BLEU_CALCUL))
        donnees.arrange(DOWN, buff=0.26)
        self.gauche(donnees, 0.2, xmax=1.6, x0=-6.0)
        self.play(FadeIn(donnees), run_time=0.5)

        t0 = self.renderer.time
        enonce, choix, kw, _ = Q04
        tete, q, cartes, pause, rebours = self.q_tete(
            [self.t(s, kw.get("fs_enonce", 32)) for s in enonce],
            [self.choix2(*c) for c in choix],
            **{k: v for k, v in kw.items() if k != "fs_enonce"})
        q
        for c in cartes:
            c
        self.play(FadeIn(tete), run_time=0.3)
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.4)
        self.q_montrer_choix(cartes)
        self.q_pause(pause, rebours, "04", t0, "C")
        return cartes, pause, rebours, donnees

    def reponse_1(self, cartes, pause, rebours, donnees):
        self.dire("04b-reponse")
        self.play(FadeOut(donnees), run_time=0.2)
        self.q_reponse(cartes, 2, pause, rebours)
        self.au_mot("elle reste plus grande que 2")
        bloc = VGroup(self.t("g(x) ≥ 2 sur tout l'intervalle", 34, VERT_OK),
                      self.t("elle ne vaut jamais 0", 32, VERT_OK))
        bloc.arrange(DOWN, buff=0.22)
        self.gauche(bloc, 1.2, xmax=1.6, x0=-6.0)
        self.play(FadeIn(bloc))
        self.au_mot("La réponse A est le réflexe à éviter")
        bas = VGroup(self.t("A est le réflexe :", 28, ORANGE_RETENUE),
                     self.t("monotone donne AU PLUS une,", 26, GREY_B),
                     self.t("encore faut-il que 0", 26, GREY_B),
                     self.t("soit atteint", 26, GREY_B))
        bas.arrange(DOWN, aligned_edge=LEFT, buff=0.12)
        bas
        self.gauche(bas, -1.5, xmax=1.6, x0=-6.0)
        self.play(FadeIn(bas))
        self.attendre_voix(marge=0.5)

    def appliquer(self):
        self.clear()
        self.dire("05-appliquer")
        self.add_mascotte(scale=0.5)
        titre = self.t("Un exemple complet", 40, JAUNE_TITRE).to_edge(UP, buff=0.45)
        self.play(Write(titre), run_time=0.5)

        ax, grad = self.plan_axes((0, 2.15, 0.5), (-4, 6.5, 2), centre=(-3.4, -0.4),
                                  w=4.8, h=3.4, grad_x=(1, 2), grad_y=(0,))
        self.play(Create(ax), FadeIn(grad), run_time=0.6)

        self.au_mot("Soit f de x égale exponentielle")
        self.play(FadeIn(self.col(
            self.t("f(x) = eˣ + x − 4", 38, BLEU_CALCUL), 2.5)))
        self.au_mot("C'est une somme de fonctions continues")
        self.play(FadeIn(self.col(self.t("somme de continues", 30, VERT_OK), 1.7)))

        self.au_mot("f de 0 vaut 1")
        self.play(FadeIn(self.pt(ax, 0, f_appliquer(0), ROUGE_ERREUR), scale=2),
                  FadeIn(self.col(self.t("f(0) = −3", 36, ROUGE_ERREUR), 0.9)))
        self.au_mot("f de 2 vaut environ")
        self.play(FadeIn(self.pt(ax, 2, f_appliquer(2), VERT_OK), scale=2),
                  FadeIn(self.col(self.t("f(2) ≈ 5,39", 36, VERT_OK), 0.1)))

        self.au_mot("La dérivée f prime de x vaut")
        self.play(Create(self.courbe(ax, f_appliquer, 0, 2.1)), run_time=1.0)
        self.play(Create(self.niveau(ax, 0.0)), run_time=0.4)
        self.play(FadeIn(self.col(
            self.t("f ′(x) = eˣ + 1 > 0", 36, JAUNE_TITRE), -0.8)))
        self.au_mot("f est strictement croissante")
        self.play(FadeIn(self.col(self.t("strictement croissante", 30, VERT_OK), -1.5)))
        # ⚠️ à −2,4 cette ligne tombait sous le garde-fou Ti-Margo de col() et sortait
        # rétrécie ; à −2,2 elle garde sa taille.
        self.au_mot("admet donc une unique solution")
        # ⚠️ Texte RACCOURCI, pas déplacé : sous −1,95 et au-delà de x = 5,3, col()
        # rétrécit — c'est structurel. Plus la ligne est courte, moins la réduction
        # coûte : « UNIQUE solution α » perd 16 %, la version longue en perdait 33.
        self.play(FadeIn(self.col(self.t("UNIQUE solution α", 32, JAUNE_TITRE), -2.2)))
        self.attendre_voix(marge=0.5)

    def piege(self):
        self.clear()
        self.dire("06-piege")
        self.add_mascotte(scale=0.5)
        titre = self.t("Le piège", 44, ORANGE_RETENUE).to_edge(UP, buff=0.45)
        self.play(Write(titre), run_time=0.5)

        ax, grad = self.plan_axes((0, 4.2, 1), (-3, 3, 1), centre=(-3.5, 0.9),
                                  w=4.4, h=2.0, grad_y=(0,))
        self.play(Create(ax), FadeIn(grad), run_time=0.5)

        self.au_mot("Le mot strictement n'est pas décoratif")
        self.play(FadeIn(self.col(self.t("« croissante » seule :", 30, ORANGE_RETENUE), 2.5)))
        self.au_mot("peut rester constante sur un morceau")
        palier = VGroup(self.courbe(ax, lambda x: -2 + 2 * x, 0, 1, color=ROUGE_ERREUR),
                        self.courbe(ax, lambda x: 0.0, 1, 2.6, color=ROUGE_ERREUR),
                        self.courbe(ax, lambda x: 2 * (x - 2.6), 2.6, 4.1, color=ROUGE_ERREUR))
        self.play(Create(palier), run_time=1.0)
        self.play(FadeIn(self.col(
            self.t("un palier à 0 :", 30, ROUGE_ERREUR), 1.6)))
        self.au_mot("une infinité de solutions")
        self.play(FadeIn(self.col(self.t("une INFINITÉ de solutions", 32, ROUGE_ERREUR), 0.8)))

        self.au_mot("le théorème des valeurs intermédiaires tout seul")
        self.play(FadeIn(self.col(self.t("le TVI seul : jamais l'unicité", 30, WHITE), -0.3)))
        self.au_mot("la stricte monotonie doit valoir")
        # ⚠️ À y = −1,5 ce bloc descendait sous −1,95 en dépassant x = 5,3 : le
        # garde-fou Ti-Margo de col() le RÉTRÉCISSAIT, et il sortait deux fois trop
        # petit. Rien ne le signale — c'est la planche qui l'a montré. Remonté à −1,0.
        # ⚠️ Deux contraintes qui se contredisent, et il faut les deux : à −1,0 ce bloc
        # s'écrivait sur la ligne du dessus, à −1,5 il passait sous −1,95 et le
        # garde-fou Ti-Margo de col() le RÉTRÉCISSAIT. À 26 px et −1,45, son bas tombe
        # à −1,92 : au-dessus du seuil, et sous la ligne précédente.
        self.play(FadeIn(self.col(self.pile(
            [self.t("monotone SUR l'intervalle", 26, JAUNE_TITRE),
             self.t("de travail — ailleurs,", 26, JAUNE_TITRE),
             self.t("ça ne compte pas", 26, JAUNE_TITRE)], -1.45), -1.45)))
        self.attendre_voix(marge=0.5)

    def question_2(self):
        self.clear()
        self.dire("07-question")
        self.add_mascotte(scale=0.5)
        donnees = VGroup(self.t("f continue", 30),
                         self.t("sur [0 ; 6]", 30),
                         self.t("f(0) = −4", 36, BLEU_CALCUL),
                         self.t("f(6) = 2", 36, BLEU_CALCUL))
        donnees.arrange(DOWN, buff=0.28)
        self.gauche(donnees, 0.2, xmax=0.2, x0=-6.4)
        self.play(FadeIn(donnees), run_time=0.5)

        t0 = self.renderer.time
        enonce, choix, kw, _ = Q07
        tete, q, cartes, pause, rebours = self.q_tete(
            [self.t(s, kw.get("fs_enonce", 32)) for s in enonce],
            [c[0] for c in choix],
            **{k: v for k, v in kw.items() if k != "fs_enonce"})
        q
        for c in cartes:
            c
        self.play(FadeIn(tete), run_time=0.3)
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.4)
        self.q_montrer_choix(cartes)
        self.q_pause(pause, rebours, "07", t0, "B")
        return cartes, pause, rebours, donnees

    def reponse_2(self, cartes, pause, rebours, donnees):
        self.dire("07b-reponse")
        self.play(FadeOut(donnees), run_time=0.2)
        self.q_reponse(cartes, 1, pause, rebours)
        self.au_mot("Les signes contraires donnent l'existence")
        bloc = VGroup(self.t("signes contraires", 30, VERT_OK),
                      self.t("→ au moins une", 30, VERT_OK),
                      self.t("mais la courbe peut", 26, GREY_B),
                      self.t("redescendre et repasser", 26, GREY_B))
        bloc.arrange(DOWN, aligned_edge=LEFT, buff=0.16)
        self.gauche(bloc, 0.9, xmax=0.2, x0=-6.4)
        self.play(FadeIn(bloc))
        self.au_mot("La réponse A est le glissement classique")
        bas = VGroup(self.t("A : on se sert de f ′ pour", 26, ORANGE_RETENUE),
                     self.t("prouver la monotonie —", 26, ORANGE_RETENUE),
                     self.t("ce n'est pas elle qu'on exige", 26, ORANGE_RETENUE))
        bas.arrange(DOWN, aligned_edge=LEFT, buff=0.12)
        bas
        self.gauche(bas, -1.9, xmax=0.2, x0=-6.4)
        self.play(FadeIn(bas))
        self.attendre_voix(marge=0.5)

    def rediger(self):
        self.clear()
        self.dire("08-rediger")
        self.add_mascotte(scale=0.5)
        titre = self.t("La ligne qui change", 42, JAUNE_TITRE).to_edge(UP, buff=0.45)
        self.play(Write(titre), run_time=0.5)
        ligne = self.t("f ′(x) > 0 sur [0 ; 2], donc f est", 34, VERT_OK)
        ligne2 = self.t("strictement croissante sur [0 ; 2].", 34, VERT_OK)
        bloc = VGroup(ligne, ligne2).arrange(DOWN, aligned_edge=LEFT, buff=0.2)
        self.play(FadeIn(bloc.move_to(P(-0.4, 1.3)), shift=RIGHT * 0.2), run_time=0.6)
        self.au_mot("qui transforme au moins une en une seule")
        t = self.t("« au moins une »  →  « une seule »", 38, ORANGE_RETENUE)
        self.play(FadeIn(t.move_to(P(-0.4, -0.3)), scale=1.1))
        self.au_mot("c'est le sujet de la vidéo suivante")
        s = self.t("la copie entière : vidéo suivante", 30, GREY_B)
        self.play(FadeIn(s.move_to(P(-0.4, -1.6))))
        self.attendre_voix(marge=0.5)

    def le_defi(self):
        self.clear()
        self.dire("09-defi")
        self.add_mascotte(scale=0.6)
        titre = self.t("À toi de jouer !", 46, JAUNE_TITRE).to_edge(UP, buff=0.5)
        self.play(Write(titre), run_time=0.5)
        enonce = self.t("x + ln x = 3", 76, BLEU_CALCUL)
        self.play(FadeIn(enonce.move_to(P(-0.4, 0.9))))
        self.au_mot("admet une unique solution")
        q = self.t("une UNIQUE solution sur [1 ; 3] ?", 36)
        self.play(FadeIn(q.move_to(P(-0.4, -0.4)), shift=UP * 0.15))
        reb = CompteARebours(5, r=0.34, fs=32).move_to(P(-0.4, -1.8))
        self.play(FadeIn(reb, scale=0.6), run_time=0.3)
        self.attendre_voix(marge=0.3)
        reb.jouer(self)

    def correction(self):
        self.clear()
        self.dire("09b-correction")
        self.add_mascotte(scale=0.5)
        titre = self.t("Correction", 42, VERT_OK).to_edge(UP, buff=0.45)
        self.play(Write(titre), run_time=0.5)

        ax, grad = self.plan_axes((1, 3.15, 0.5), (-2.5, 1.5, 1), centre=(-3.4, -0.5),
                                  w=4.8, h=3.2, grad_x=(1, 3), grad_y=(0,))
        self.play(Create(ax), FadeIn(grad), run_time=0.6)

        self.au_mot("On pose f de x égale x, plus logarithme")
        self.play(FadeIn(self.col(
            self.t("f(x) = x + ln x − 3", 36, BLEU_CALCUL), 2.5)))
        self.au_mot("donc f est continue")
        self.play(FadeIn(self.col(self.t("somme de continues", 28, VERT_OK), 1.8)))

        self.au_mot("f de 1 vaut 1")
        self.play(FadeIn(self.pt(ax, 1, f_defi(1), ROUGE_ERREUR), scale=2),
                  FadeIn(self.col(self.t("f(1) = −2", 34, ROUGE_ERREUR), 1.0)))
        self.au_mot("f de 3 vaut logarithme népérien de 3")
        self.play(FadeIn(self.pt(ax, 3, f_defi(3), VERT_OK), scale=2),
                  FadeIn(self.col(self.t("f(3) = ln 3 ≈ 1,10", 34, VERT_OK), 0.2)))

        self.au_mot("La dérivée f prime de x vaut 1, plus 1 sur x")
        self.play(Create(self.courbe(ax, f_defi, 1, 3.1)), run_time=1.0)
        self.play(Create(self.niveau(ax, 0.0)), run_time=0.4)
        self.play(FadeIn(self.col(
            self.t("f ′(x) = 1 + 1/x > 0", 34, JAUNE_TITRE), -0.7)))
        self.au_mot("admet une unique solution")
        self.play(FadeIn(self.col(self.t("une UNIQUE solution", 32, VERT_OK), -1.7)))
        self.attendre_voix(marge=0.6)

    def construct(self):
        self.page_de_garde()
        self.situation()
        self.idee()
        self.theoreme()
        self.reponse_1(*self.question_1())
        self.appliquer()
        self.piege()
        self.reponse_2(*self.question_2())
        self.rediger()
        self.le_defi()
        self.correction()
        self.page_finale([
            "Le TVI donne l'existence, et seulement l'existence",
            "Pour l'unicité : y ajouter la stricte monotonie",
            "On la justifie par le signe de la dérivée",
            "Le mot « strictement » compte",
            "Strictement croissante et toujours positive : aucune solution",
        ])
        self.page_abonnement()
