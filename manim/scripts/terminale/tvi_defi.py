# tvi_defi.py
# EleveAI — Maths Tle spé — paysage « Résoudre un exercice type bac avec continuité et
# TVI » (16:9), ceinture VERTE. Micro du coach : tvi_defi (notion continuite_tvi).
# Épisode 5 sur 5 de la série « CONTINUITÉ ET TVI ».
# Centre : sciences (liste fermée lib/videos/centres-interet.ts, tranche 15-18).
#
# Clé de voix → écran :
#   · 00-garde / 01-situation : Ryan, observatoire du Piton de la Fournaise — l'écart
#     entre l'inclinaison mesurée et le modèle ;
#   · 02-idee       : (x − 1)² − 4 sur [−2 ; 4] : mêmes signes aux bornes, deux zéros ;
#   · 03-theoreme   : la méthode en quatre temps ;
#   · 04/04b        : question 1 — décroît de 5 à −2 puis croît à 3 (réponse B) ;
#   · 05-appliquer  : t³ − 3t + 1 sur [0 ; 2], TABLEAU DE VARIATIONS, α et β ;
#   · 06-piege      : le théorème appliqué d'un bloc ne dit RIEN, et pourtant deux
#                     solutions ;
#   · 07/07b        : question 2 — l'encadrement de α (réponse A) ;
#   · 08-rediger    : la copie entière, bloc par morceau ;
#   · 09/09b        : le défi — x³ − 12x + 5 sur [0 ; 3], un morceau sans solution ;
#   · 10-finale / 11-abonne.
#
# ⚠️ Bonne réponse : 04 → B, 07 → A (tirage graine 2711).
# ⛔⛔ Nombres HORS AUDIT (`self.lettres`). ⛔ Pas de ⩽ ni ⩾ : le socle les refuse.
# ⚠️ C'est le seul épisode qui dresse un TABLEAU DE VARIATIONS (`tab_variations` du
#   socle) : ses nombres sortent de l'audit comme des graduations.
#
# Rendu : python -m manim render -ql --disable_caching manim/scripts/terminale/tvi_defi.py TviDefi -o eleveai-maths-terminale-tvi-defi --media_dir manim/scripts/terminale/media

import math
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(1, str(Path(__file__).resolve().parents[2] / "poste2"))

from manim import *

from analyse_ecrans import CompteARebours, EcransAnalyse, P, XL
from charte import *

Q04 = (["Combien de solutions", "pour f(x) = 0 ?"],
       [("une seule",),
        ("exactement deux",),
        ("au moins une, sans", "pouvoir dire combien")],
       {"largeur": 6.0, "xl": 0.6, "fs_enonce": 30}, "B")

Q07 = (["Que peut-on écrire", "pour α ?"],
       [("0,3 < α < 0,4",),
        ("α ≈ 0,13",),
        ("0,13 < α < 0,14",)],
       {"fs_enonce": 32}, "A")


def parabole(x):
    return (x - 1) ** 2 - 4


def ecart(t):
    """L'écart entre l'inclinaison mesurée et le modèle : t³ − 3t + 1 sur [0 ; 2]."""
    return t ** 3 - 3 * t + 1


def f_defi(x):
    return x ** 3 - 12 * x + 5


class TviDefi(EcransAnalyse):
    fichier_marques = "tvi_defi_marques.json"   # WAV faits le 27/11 (-Debit -6 aux deux etapes)
    nom_voix = "terminale-tvi-defi"

    def page_de_garde(self):
        self.clear()
        self.dire("00-garde")
        self.add_mascotte(scale=0.8)
        titre = self.t("Continuité et TVI : un exercice type bac", 44, JAUNE_TITRE,
                       larg=11.6).to_edge(UP, buff=0.55)
        ident = self.t(self.identite, 26).next_to(titre, DOWN, buff=0.22)
        coeur = self.t("les variations d'abord", 56, BLEU_CALCUL).move_to(P(-0.6, 0.6))
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2))
        self.play(FadeIn(coeur))
        self.au_mot("jamais par le théorème")
        sous = self.t("jamais par le théorème", 36, ORANGE_RETENUE)
        self.play(FadeIn(sous.move_to(P(-0.6, -0.6)), shift=UP * 0.15))
        self.play(FadeIn(self.echelle().align_to(P(0, -3.45), DOWN)))
        self.attendre_voix(marge=0.5)

    def situation(self):
        self.clear()
        self.dire("01-situation")
        self.add_mascotte(scale=0.5)
        titre = self.t("Ryan, observatoire du volcan", 40, JAUNE_TITRE).to_edge(UP, buff=0.45)
        self.play(Write(titre), run_time=0.6)

        ax, grad = self.plan_axes((0, 2.15, 0.5), (-2.5, 4, 1), centre=(-3.4, -0.4),
                                  w=4.8, h=3.4, grad_x=(0, 2), grad_y=(0,))
        self.play(Create(ax), FadeIn(grad), run_time=0.6)

        self.au_mot("l'écart entre l'inclinaison mesurée")
        self.play(FadeIn(self.col(self.pile(
            [self.t("l'écart mesure −", 30, BLEU_CALCUL),
             self.t("modèle", 30, BLEU_CALCUL)], 2.4), 2.4)))
        self.au_mot("le modèle tombe juste")
        self.play(Create(self.niveau(ax, 0.0)), run_time=0.5)
        self.play(FadeIn(self.col(
            self.t("écart = 0 : le modèle colle", 28, JAUNE_TITRE), 1.5)))

        self.au_mot("l'écart est positif, à la fin aussi")
        c = self.courbe(ax, ecart, 0, 2.1)
        self.play(Create(c), run_time=1.4)
        self.play(FadeIn(self.pt(ax, 0, 1, VERT_OK)), FadeIn(self.pt(ax, 2, 3, VERT_OK)))
        self.play(FadeIn(self.col(self.t("positif aux deux bouts", 30, VERT_OK), 0.4)))

        self.au_mot("la courbe a croisé le 0 en chemin")
        self.play(FadeIn(self.col(self.t("et pourtant elle a croisé zéro", 30,
                                         ORANGE_RETENUE), -0.8)))
        self.attendre_voix(marge=0.5)

    def idee(self):
        self.clear()
        self.dire("02-idee")
        self.add_mascotte(scale=0.5)
        titre = self.t("Couper l'intervalle", 40, JAUNE_TITRE).to_edge(UP, buff=0.45)
        self.play(Write(titre), run_time=0.5)

        ax, grad = self.plan_axes((-2, 4.2, 1), (-5, 6, 2), centre=(-3.4, -0.4),
                                  w=4.8, h=3.4, grad_x=(1,), grad_y=(0,))
        self.play(Create(ax), FadeIn(grad), run_time=0.6)

        self.au_fin("le tout au carré, moins 4")
        self.play(FadeIn(self.col(
            self.t("g(x) = (x − 1)² − 4", 36, BLEU_CALCUL), 2.5)))
        self.play(Create(self.courbe(ax, parabole, -2, 4.1)), run_time=1.2)
        self.play(Create(self.niveau(ax, 0.0)), run_time=0.4)

        self.au_mot("Les deux bornes sont positives")
        self.play(FadeIn(self.pt(ax, -2, 5, VERT_OK)), FadeIn(self.pt(ax, 4, 5, VERT_OK)),
                  FadeIn(self.col(self.t("g(−2) = 5, g(4) = 5", 32, VERT_OK),
                                  1.6)))
        self.au_mot("le théorème ne dit rien")
        self.play(FadeIn(self.col(self.t("d'un bloc : il ne dit RIEN", 30, ROUGE_ERREUR),
                                  0.8)))

        self.au_mot("On coupe donc en 1")
        coupe = DashedLine(ax.c2p(1, -5), ax.c2p(1, 6), color=JAUNE_TITRE, stroke_width=3)
        self.play(Create(coupe), run_time=0.5)
        self.play(FadeIn(self.pt(ax, 1, -4, ROUGE_ERREUR)),
                  FadeIn(self.col(self.t("au creux : g(1) = −4", 32,
                                                      JAUNE_TITRE), -0.1)))

        self.au_mot("une solution de chaque côté")
        self.play(FadeIn(self.pt(ax, -1, 0, JAUNE_TITRE, r=0.1)),
                  FadeIn(self.pt(ax, 3, 0, JAUNE_TITRE, r=0.1)))
        self.play(FadeIn(self.col(self.pile(
            [self.t("une de chaque côté", 30, JAUNE_TITRE),
             self.t("trouvées parce qu'on a coupé", 28, VERT_OK)], -1.3), -1.3)))
        self.attendre_voix(marge=0.5)

    def theoreme(self):
        self.clear()
        self.dire("03-theoreme")
        self.add_mascotte(scale=0.5)
        titre = self.t("La méthode en quatre temps", 42, JAUNE_TITRE).to_edge(UP, buff=0.45)
        self.play(Write(titre), run_time=0.5)
        etapes = [("on justifie la continuité", "Un : on justifie"),
                  ("la dérivée, son signe, le tableau de variations",
                   "Deux : on calcule la dérivée"),
                  ("le corollaire sur CHAQUE morceau strictement monotone",
                   "Trois : sur chaque intervalle"),
                  ("on encadre les solutions à la calculatrice", "Quatre : on encadre")]
        bloc = VGroup()
        for i, (s, _) in enumerate(etapes):
            bloc.add(VGroup(self.pastille(i + 1), self.t(s, 30, larg=10.2))
                     .arrange(RIGHT, buff=0.3))
        bloc.arrange(DOWN, aligned_edge=LEFT, buff=0.42).move_to(P(-0.4, 0.2))
        for l, (_, mot) in zip(bloc, etapes):
            self.au_mot(mot)
            self.play(FadeIn(l, shift=RIGHT * 0.2), run_time=0.4)
        # ⛔ Repere qui pointait EN ARRIERE : « une solution, ou aucune » est dit a la
        # fin du point TROIS, alors que ce commentaire parait apres le point QUATRE.
        # RETARD de 3,07 s au dry run. ⚠️ `reperes-croissants-tvi.py` ne pouvait pas
        # le voir : les quatre etapes passent par une LISTE, et il ne lit que les
        # appels litteraux -- son angle mort, confirme sur un cas reel.
        # Le commentaire glose la methode entiere : il se pose sur la DERNIERE phrase.
        self.au_fin("on encadre les solutions à la calculatrice")
        c = self.t("sur chaque morceau on CONCLUT : une, ou aucune", 30, ORANGE_RETENUE)
        self.play(FadeIn(c.move_to(P(-0.4, -2.4))))
        self.attendre_voix(marge=0.5)

    def question_1(self):
        self.clear()
        self.dire("04-question")
        self.add_mascotte(scale=0.5)
        tab = self.tab_variations(("0", "2", "4"), ("−", "+"),
                                  (("5", "−2"), ("−2", "3")), x0=-6.4, y=0.6, larg=4.6,
                                  h=2.0)
        self.play(FadeIn(tab), run_time=0.6)

        t0 = self.renderer.time
        enonce, choix, kw, _ = Q04
        tete, q, cartes, pause, rebours = self.q_tete(
            [self.t(s, kw.get("fs_enonce", 32)) for s in enonce],
            [c[0] if len(c) == 1 else self.choix2(*c) for c in choix],
            **{k: v for k, v in kw.items() if k != "fs_enonce"})
        q
        for c in cartes:
            c
        self.play(FadeIn(tete), run_time=0.3)
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.4)
        self.q_montrer_choix(cartes)
        self.q_pause(pause, rebours, "04", t0, "B")
        return cartes, pause, rebours, tab

    def reponse_1(self, cartes, pause, rebours, tab):
        self.dire("04b-reponse")
        self.q_reponse(cartes, 1, pause, rebours)
        self.au_mot("Sur le premier morceau")
        un = self.t("morceau 1 : une solution", 28, VERT_OK)
        self.lettres(un)
        self.gauche(un, -1.4, xmax=0.2, x0=-6.4)
        self.play(FadeIn(un))
        self.au_mot("Sur le second")
        deux = self.t("morceau 2 : une solution", 28, VERT_OK)
        deux
        self.gauche(deux, -2.0, xmax=0.2, x0=-6.4)
        self.play(FadeIn(deux))
        self.au_mot("Une plus une font deux")
        tot = self.t("en tout : 2", 36, JAUNE_TITRE)
        self.gauche(tot, -2.8, xmax=0.2, x0=-6.4)
        self.play(FadeIn(tot, scale=1.2))
        self.attendre_voix(marge=0.5)

    def appliquer(self):
        self.clear()
        self.dire("05-appliquer")
        self.add_mascotte(scale=0.5)
        titre = self.t("La courbe de Ryan", 40, JAUNE_TITRE).to_edge(UP, buff=0.45)
        self.play(Write(titre), run_time=0.5)

        self.au_fin("plus 1, sur l'intervalle 0 2")
        f_ = self.t("f(t) = t³ − 3t + 1   sur [0 ; 2]", 34, BLEU_CALCUL)
        self.play(FadeIn(self.col(f_, 2.5)))
        self.au_mot("C'est un polynôme")
        self.play(FadeIn(self.col(self.t("polynôme → continue", 28, VERT_OK), 1.8)))

        self.au_mot("La dérivée f prime de t vaut")
        d = self.t("f ′(t) = 3t² − 3", 34, JAUNE_TITRE)
        self.play(FadeIn(self.col(d, 1.0)))
        self.au_mot("elle s'annule en 1")
        tab = self.tab_variations(("0", "1", "2"), ("−", "+"),
                                  (("1", "−1"), ("−1", "3")), x0=-6.4, y=0.3, larg=4.6,
                                  h=2.2)
        self.play(FadeIn(tab), run_time=0.7)

        self.au_mot("Sur l'intervalle 0 1")
        a = self.t("[0 ; 1] : une unique solution α", 30, VERT_OK)
        a
        self.play(FadeIn(self.col(a, -0.2)))
        self.au_mot("Sur l'intervalle 1 2")
        b = self.t("[1 ; 2] : une unique solution β", 30, VERT_OK)
        b
        self.play(FadeIn(self.col(b, -1.1)))
        self.au_mot("Deux solutions en tout")
        self.play(FadeIn(self.col(self.t("2 solutions", 40, JAUNE_TITRE),
                                  -2.1), scale=1.15))
        self.attendre_voix(marge=0.5)

    def piege(self):
        self.clear()
        self.dire("06-piege")
        self.add_mascotte(scale=0.5)
        titre = self.t("Le piège", 44, ORANGE_RETENUE).to_edge(UP, buff=0.45)
        self.play(Write(titre), run_time=0.5)

        self.au_fin("f de 2 vaut 3")
        bloc = VGroup(self.t("f(0) = 1 > 0", 34, ROUGE_ERREUR),
                      self.t("f(2) = 3 > 0", 34, ROUGE_ERREUR),
                      self.t("deux nombres positifs", 28, ROUGE_ERREUR))
        bloc.arrange(DOWN, buff=0.2)
        self.gauche(bloc, 1.5, xmax=1.0, x0=-6.4)
        self.play(FadeIn(bloc))

        self.au_mot("Le théorème ne dit rien du tout")
        r = self.t("le théorème ne dit RIEN", 36, ROUGE_ERREUR)
        self.play(FadeIn(self.col(r, 1.8), scale=1.15))
        self.au_mot("Il y a pourtant 2 solutions")
        p = self.t("et il y a 2 solutions", 34, VERT_OK)
        self.play(FadeIn(self.col(p, 0.9)))

        self.au_mot("2 solutions, ça se démontre en 2 fois")
        self.play(FadeIn(self.col(
            self.t("2 solutions = 2 démonstrations", 30, WHITE), 0.0)))
        self.au_mot("un morceau sans changement de signe")
        self.play(FadeIn(self.col(self.pile(
            [self.t("un morceau sans changement", 28, JAUNE_TITRE),
             self.t("de signe, on le CONCLUT —", 28, JAUNE_TITRE),
             self.t("on ne le saute pas", 28, JAUNE_TITRE)], -1.3), -1.3)))
        self.attendre_voix(marge=0.5)

    def question_2(self):
        self.clear()
        self.dire("07-question")
        self.add_mascotte(scale=0.5)
        calc = VGroup(self.t("à la calculatrice :", 26, GREY_B),
                      self.t("f(0,3) ≈ 0,13", 36, VERT_OK),
                      self.t("f(0,4) ≈ −0,14", 36, ROUGE_ERREUR))
        calc.arrange(DOWN, aligned_edge=LEFT, buff=0.26)
        self.gauche(calc, 0.3, xmax=1.6, x0=-6.0)
        self.play(FadeIn(calc), run_time=0.5)

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
        self.q_pause(pause, rebours, "07", t0, "A")
        return cartes, pause, rebours, calc

    def reponse_2(self, cartes, pause, rebours, calc):
        self.dire("07b-reponse")
        self.q_reponse(cartes, 0, pause, rebours)
        self.au_mot("La fonction change de signe entre")
        chg = self.t("la fonction change de signe", 28, VERT_OK)
        chg.next_to(calc, DOWN, buff=0.3).align_to(calc, LEFT)
        self.play(FadeIn(chg))
        self.au_mot("ce sont des images, pas des antécédents")
        bloc = VGroup(self.t("0,13 et −0,14 : des IMAGES", 28, ROUGE_ERREUR),
                      self.t("pas des antécédents", 28, ROUGE_ERREUR))
        bloc.arrange(DOWN, aligned_edge=LEFT, buff=0.16)
        # ⛔ même correction qu'en E4 : les blocs empilés se posent les uns par rapport
        # aux autres, jamais à une ordonnée devinée. « des IMAGES » s'écrivait sur
        # « la fonction change de signe ».
        bloc.next_to(chg, DOWN, buff=0.3).align_to(calc, LEFT)
        self.play(FadeIn(bloc))
        self.au_mot("On encadre alpha par des valeurs de t")
        bas = self.t("on encadre α par des valeurs de t", 28, JAUNE_TITRE)
        bas
        bas.next_to(bloc, DOWN, buff=0.3).align_to(calc, LEFT)
        self.play(FadeIn(bas))
        self.attendre_voix(marge=0.5)

    def rediger(self):
        self.clear()
        self.dire("08-rediger")
        self.add_mascotte(scale=0.5)
        titre = self.t("La copie type bac", 42, JAUNE_TITRE).to_edge(UP, buff=0.45)
        self.play(Write(titre), run_time=0.5)
        # ⭐ Chaque mot-cle couvre la ligne JUSQU'A son dernier nombre : le parcours
        # ci-dessous attend la FIN de ce que la voix en dit (au_fin), sinon la fin de
        # la ligne est a l'ecran avant d'etre prononcee.
        lignes = [("f est un polynôme, donc continue sur [0 ; 2]",
                   "f est un polynôme, donc elle est continue sur l'intervalle 0 2"),
                  ("le tableau de variations, avec le signe de f ′",
                   "Ensuite le tableau de variations, avec le signe de la dérivée"),
                  ("[0 ; 1] : continue, strictement décroissante de 1 à −1,",
                   "f est continue et strictement décroissante, f de 0 vaut 1, f de 1 vaut moins 1"),
                  ("0 entre les deux : une unique solution α",
                   "0 est compris entre les deux, donc il existe une unique solution alpha"),
                  ("le même bloc sur [1 ; 2] pour β",
                   "Le même bloc sur l'intervalle 1 2 pour bêta"),
                  ("0,3 < α < 0,4",
                   "lui-même plus petit que 0,4")]
        bloc = VGroup(*[self.t(s, 28, larg=11.4) for s, _ in lignes])
        bloc.arrange(DOWN, aligned_edge=LEFT, buff=0.26).move_to(P(-0.4, 0.1))
        for l, (_, mot) in zip(bloc, lignes):
            if mot:
                self.au_fin(mot)
            self.play(FadeIn(l, shift=RIGHT * 0.2), run_time=0.35)
        self.attendre_voix(marge=0.5)

    def le_defi(self):
        self.clear()
        self.dire("09-defi")
        self.add_mascotte(scale=0.6)
        titre = self.t("À toi de jouer !", 46, JAUNE_TITRE).to_edge(UP, buff=0.5)
        self.play(Write(titre), run_time=0.5)
        self.au_fin("moins 12 x, plus 5")
        f_ = self.t("f(x) = x³ − 12x + 5", 62, BLEU_CALCUL)
        self.play(FadeIn(f_.move_to(P(-0.4, 1.4))))
        self.au_mot("Combien l'équation f de x égale 0")
        q = self.t("combien de solutions sur [0 ; 3] ?", 36)
        self.play(FadeIn(q.move_to(P(-0.4, 0.0)), shift=UP * 0.15))
        self.au_mot("les deux morceaux ne donnent pas la même réponse")
        ind = self.t("attention : les deux morceaux diffèrent", 30, ORANGE_RETENUE)
        self.play(FadeIn(ind.move_to(P(-0.4, -1.1))))
        reb = CompteARebours(5, r=0.34, fs=32).move_to(P(-0.4, -2.3))
        self.play(FadeIn(reb, scale=0.6), run_time=0.3)
        self.attendre_voix(marge=0.3)
        reb.jouer(self)

    def correction(self):
        self.clear()
        self.dire("09b-correction")
        self.add_mascotte(scale=0.5)
        titre = self.t("Correction", 42, VERT_OK).to_edge(UP, buff=0.45)
        self.play(Write(titre), run_time=0.5)

        self.au_fin("moins 12 : elle s'annule en 2")
        d = self.t("f ′(x) = 3x² − 12, nulle en 2", 32, JAUNE_TITRE)
        self.play(FadeIn(self.col(d, 2.5)))
        tab = self.tab_variations(("0", "2", "3"), ("−", "+"),
                                  (("5", "−11"), ("−11", "−4")), x0=-6.4, y=0.9, larg=4.6,
                                  h=2.0)
        self.play(FadeIn(tab), run_time=0.7)

        self.au_mot("Sur l'intervalle 0 2")
        a = VGroup(self.t("[0 ; 2] : de 5 à −11", 30, VERT_OK),
                   self.t("0 entre les deux : UNE solution", 28, VERT_OK))
        a.arrange(DOWN, aligned_edge=LEFT, buff=0.14)
        self.play(FadeIn(self.col(a, 1.4)))

        self.au_mot("Sur l'intervalle 2 3")
        b = VGroup(self.t("[2 ; 3] : de −11 à −4", 30, ROUGE_ERREUR),
                   self.t("0 n'y est pas : AUCUNE", 28, ROUGE_ERREUR))
        b.arrange(DOWN, aligned_edge=LEFT, buff=0.14)
        self.play(FadeIn(self.col(b, 0.0)))

        self.au_mot("l'équation admet une seule solution")
        t = self.t("en tout : une seule solution", 34, JAUNE_TITRE)
        self.play(FadeIn(self.col(t, -1.4), scale=1.15))
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
            "Les variations passent avant le théorème",
            "Le corollaire sur chaque morceau strictement monotone",
            "On conclut sur chacun : une solution, ou aucune",
            "Deux bornes de même signe : il faut couper, pas conclure",
            "On encadre une solution par des valeurs de x, jamais de f",
        ])
        self.page_abonnement()
