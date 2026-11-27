# tvi_appliquer.py
# EleveAI — Maths Tle spé — paysage « Appliquer le théorème des valeurs intermédiaires »
# (16:9), ceinture VERTE. Micro du coach : tvi_appliquer (notion continuite_tvi).
# Épisode 2 sur 5 de la série « CONTINUITÉ ET TVI ».
# Centre : meteo-climat (liste fermée lib/videos/centres-interet.ts, tranche 15-18).
#
# Clé de voix → écran :
#   · 00-garde      : titre, et « prouver sans calculer » ;
#   · 01-situation  : Léa relève −2 °C à 6 h et 14 °C à midi au sommet du Maïdo ;
#   · 02-idee       : la courbe ne saute pas, donc elle coupe l'axe — sans qu'on
#                     sache où ;
#   · 03-theoreme   : l'énoncé, puis le cas k = 0 et les signes contraires ;
#   · 04/04b        : question-pause n° 1 (f(1)=5, f(4)=9, k=7 → réponse C) ;
#   · 05-appliquer  : g(x) = x⁵ + 3x − 5 sur [1 ; 2], g(1) = −1, g(2) = 33 ;
#   · 06-piege      : ce que le théorème NE dit pas quand les signes sont les mêmes ;
#   · 07/07b        : question-pause n° 2 (f(0)=2, f(3)=8, k=0 → réponse A) ;
#   · 08-rediger    : les trois lignes de l'existence ;
#   · 09/09b        : le défi — x³ = x + 5 entre 1 et 2, après l'avoir ramené à zéro ;
#   · 10-finale     : « Ce que tu as appris » ;
#   · 11-abonne     : eleveai.fr + « Abonne-toi ! ».
#
# ⭐ Le socle d'écran est dans manim/poste2/analyse_ecrans.py. ⛔ Une correction
#   d'OUTIL se fait là-bas, jamais recopiée ici.
# ⚠️ Bonne réponse : 04 → C, 07 → A (tirage graine 2711, table dans le manifeste
#   manim/REPRISE-continuite-tvi.md).
#
# ⛔⛔ TOUS LES NOMBRES DE CET ÉCRAN SONT HORS AUDIT (`self.lettres`), parce que la voix
#   de cette série dit les valeurs en toutes lettres. Voir la docstring de
#   `EcransAnalyse.lettres` : ce qui le rendrait, et pourquoi ce n'est pas fait.
#
# ⛔ Axes SANS include_numbers : Manim écrirait « 0.5 » avec un POINT, et graduerait
#   tout l'axe. Les graduations utiles sont posées à la main, avec la virgule.
#
# Rendu (⛔ JAMAIS de HD sans avoir regardé la planche -ql) :
#   python -m manim render -ql --disable_caching manim/scripts/terminale/tvi_appliquer.py TviAppliquer -o eleveai-maths-terminale-tvi-appliquer --media_dir manim/scripts/terminale/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(1, str(Path(__file__).resolve().parents[2] / "poste2"))

from manim import *

from analyse_ecrans import EcransAnalyse, P, XL, C_COURBE
from charte import *          # ⚠️ les couleurs ne viennent PAS du socle par un import nommé


def temperature(t):
    """La température au sommet, de −2 °C à 6 h à 14 °C à midi. Elle ne saute pas."""
    return -2 + 16 * ((t - 6) / 6) ** 1.6


# ⭐ LES DEUX QUESTIONS-PAUSES SONT EXPORTÉES : (énoncé, choix, kwargs de q_tete, bonne).
# `manim/poste2/mesure-continuite-tvi.py` les IMPORTE pour mesurer la police réelle des
# cartes et le bas du bloc. ⛔ Une liste recopiée à côté de la vraie, c'est l'accident
# déjà arrivé trois fois dans ce dépôt.
Q04 = (["L'équation f(x) = 7", "a-t-elle une solution ?"],
       [("non, f ne", "s'annule pas"),
        ("on ne peut", "pas conclure"),
        ("oui, au", "moins une")],
       {"fs_enonce": 28}, "C")

# ⚠️ Q07 : l'énoncé a d'abord porté les données (« f continue sur [0 ; 3], f(0) = 2,
# f(3) = 8. ») sur une seule ligne, avec des cartes larges. Vu à la planche : `col()`
# l'avait RÉTRÉCI, et il se lisait deux fois plus petit que les autres écrans. Les
# données sont passées dans la colonne de GAUCHE, et l'énoncé tient en deux lignes
# courtes qui ne se réduisent pas.
# ⚠️ Q07 en cartes LARGES (6,0 à partir de x = 0,6) : mesuré, à 4,1 la carte B tombait
# à 18,5 px — sa ligne la plus longue fait 18 caractères, et c'est la LARGEUR qui décide,
# pas la police demandée. Les données passent donc à gauche, bornées avant x = 0,2.
Q07 = (["Que dit le théorème", "pour f(x) = 0 ?"],
       [("rien : 0 n'est pas", "entre 2 et 8"),
        ("qu'il y a au moins", "une solution"),
        ("qu'il n'y a", "aucune solution")],
       {"largeur": 6.0, "xl": 0.6, "fs_enonce": 30}, "A")


def g(x):
    return x ** 5 + 3 * x - 5


def defi(x):
    return x ** 3 - x - 5


class TviAppliquer(EcransAnalyse):
    nom_voix = "terminale-tvi-appliquer"

    # ── 00 ──────────────────────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.dire("00-garde")
        self.add_mascotte(scale=0.8)
        titre = self.t("Le théorème des valeurs intermédiaires", 46, JAUNE_TITRE, larg=11.6)
        titre.to_edge(UP, buff=0.55)
        ident = self.t(self.identite, 26).next_to(titre, DOWN, buff=0.22)
        coeur = self.lettres(self.t("f(a) < 0 < f(b)", 72, BLEU_CALCUL)).move_to(P(-0.6, 0.55))
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2))
        self.play(FadeIn(coeur))
        self.au_mot("sans jamais la calculer")
        sous = self.t("une solution existe — sans la calculer", 36, ORANGE_RETENUE)
        self.play(FadeIn(sous.move_to(P(-0.6, -0.65)), shift=UP * 0.15))
        # ⚠️ −3,45 et pas plus bas : `to_edge(DOWN, buff=0.3)` met le bas de l'échelle à
        # −3,70, au-delà de la marge de 3 % (−3,573). Signalé par BORDS sur le pilote.
        self.play(FadeIn(self.echelle().align_to(P(0, -3.45), DOWN)))
        self.attendre_voix(marge=0.5)

    # ── 01 ──────────────────────────────────────────────────────────────────

    def situation(self):
        self.clear()
        self.dire("01-situation")
        self.add_mascotte(scale=0.5)
        titre = self.t("Au sommet du Maïdo", 40, JAUNE_TITRE).to_edge(UP, buff=0.45)
        self.play(Write(titre), run_time=0.6)

        ax, grad = self.plan_axes((6, 12.4, 1), (-4, 16, 4), centre=(-3.4, -0.4),
                                  w=5.6, h=4.0, grad_x=(6, 12), grad_y=(-2, 14))
        self.play(Create(ax), FadeIn(grad), run_time=0.8)

        self.au_mot("À 6 heures")
        p6 = VGroup(self.pt(ax, 6, -2, ROUGE_ERREUR), self.pointilles(ax, 6, -2))
        l6 = self.t("6 h : −2 °C", 30, ROUGE_ERREUR)
        self.play(FadeIn(p6, scale=2), FadeIn(self.col(l6, 2.1)))

        self.au_mot("À midi")
        p12 = VGroup(self.pt(ax, 12, 14, VERT_OK), self.pointilles(ax, 12, 14))
        l12 = self.t("midi : 14 °C", 30, VERT_OK)
        self.play(FadeIn(p12, scale=2), FadeIn(self.col(l12, 1.2)))

        self.au_mot("Elle n'a pas regardé")
        q = self.t("Entre les deux ?", 34, ORANGE_RETENUE)
        self.play(FadeIn(self.col(q, 0.2), shift=UP * 0.15))

        self.au_mot("il a fait exactement")
        zero = self.t("0 °C, forcément", 36, BLEU_CALCUL)
        self.play(FadeIn(self.col(zero, -0.9), shift=UP * 0.15))
        self.au_mot("Sans savoir quand")
        quand = self.t("mais on ne sait pas quand", 28, GREY_B)
        self.play(FadeIn(self.col(quand, -1.8)))
        self.attendre_voix(marge=0.5)

    # ── 02 ──────────────────────────────────────────────────────────────────

    def idee(self):
        self.clear()
        self.dire("02-idee")
        self.add_mascotte(scale=0.5)
        titre = self.t("Elle ne saute pas", 40, JAUNE_TITRE).to_edge(UP, buff=0.45)
        self.play(Write(titre), run_time=0.5)

        ax, grad = self.plan_axes((6, 12.4, 1), (-4, 16, 4), centre=(-3.4, -0.4),
                                  w=5.6, h=4.0, grad_x=(6, 12), grad_y=(-2, 0, 14))
        self.add(ax, grad)
        self.play(FadeIn(self.pt(ax, 6, -2, ROUGE_ERREUR)),
                  FadeIn(self.pt(ax, 12, 14, VERT_OK)), run_time=0.4)

        self.au_mot("la température ne saute pas")
        c = self.courbe(ax, temperature, 6, 12.3)
        self.play(Create(c), run_time=1.6)
        bloc = self.pile([self.t("continue :", 32, VERT_OK),
                          self.t("sans lever le crayon", 30, VERT_OK)], 2.1)
        self.play(FadeIn(bloc))

        self.au_mot("sans lever le crayon, il faut bien")
        ligne0 = self.niveau(ax, 0.0)
        self.play(Create(ligne0), run_time=0.7)

        self.au_mot("0 est compris entre")
        enc = self.t("−2 < 0 < 14", 44, BLEU_CALCUL)
        self.play(FadeIn(self.col(enc, 0.5), shift=UP * 0.15))

        self.au_mot("donc 0 est atteint")
        t_zero = 6 + 6 * (2 / 16) ** (1 / 1.6)
        d = self.pt(ax, t_zero, 0, JAUNE_TITRE, r=0.11)
        self.play(FadeIn(d, scale=2.2), Flash(d, color=JAUNE_TITRE, line_length=0.25))
        self.play(FadeIn(self.col(self.t("atteint, quelque part", 30, JAUNE_TITRE), -0.6)))
        self.attendre_voix(marge=0.5)

    # ── 03 ──────────────────────────────────────────────────────────────────

    def theoreme(self):
        self.clear()
        self.dire("03-theoreme")
        self.add_mascotte(scale=0.5)
        titre = self.t("Le théorème", 42, JAUNE_TITRE).to_edge(UP, buff=0.45)
        self.play(Write(titre), run_time=0.5)

        lignes = [("f est continue sur [a ; b]", VERT_OK),
                  ("k est compris entre f(a) et f(b)", VERT_OK),
                  ("alors il existe au moins un c", WHITE),
                  ("de [a ; b] tel que f(c) = k", WHITE)]
        bloc = VGroup(*[self.t(s, 34, col) for s, col in lignes])
        bloc.arrange(DOWN, aligned_edge=LEFT, buff=0.26).move_to(P(-0.5, 1.15))
        for i, l in enumerate(bloc):
            self.au_mot(["Soit f une fonction", "Soit k un nombre",
                         "Alors il existe", "tel que f de c"][i])
            self.play(FadeIn(l, shift=RIGHT * 0.2), run_time=0.4)

        self.au_mot("k vaut presque toujours 0")
        cadre = self.t("au bac : k = 0", 40, ORANGE_RETENUE).move_to(P(-0.5, -1.0))
        self.play(FadeIn(cadre, scale=1.2),
                  Create(SurroundingRectangle(cadre, color=ORANGE_RETENUE, buff=0.22,
                                              stroke_width=3)))
        self.au_mot("sont de signes contraires")
        sig = self.t("f(a) et f(b) de signes contraires", 34, BLEU_CALCUL)
        self.play(FadeIn(sig.move_to(P(-0.5, -2.1)), shift=UP * 0.15))
        self.attendre_voix(marge=0.5)

    # ── 04 · question 1 ─────────────────────────────────────────────────────

    def question_1(self):
        self.clear()
        self.dire("04-question")
        self.add_mascotte(scale=0.5)
        donnees = VGroup(self.t("f continue sur [1 ; 4]", 34),
                         self.t("f(1) = 5", 42, BLEU_CALCUL),
                         self.t("f(4) = 9", 42, BLEU_CALCUL),
                         self.t("f(x) = 7 ?", 46, JAUNE_TITRE))
        donnees.arrange(DOWN, buff=0.38)
        self.gauche(donnees, 0.3, xmax=1.6, x0=-6.0)
        self.play(FadeIn(donnees), run_time=0.5)

        t0 = self.renderer.time
        enonce, choix, kw, _ = Q04
        tete, q, cartes, pause, rebours = self.q_tete(
            [self.t(s, kw.get("fs_enonce", 32)) for s in enonce],
            [self.choix2(*c) for c in choix],
            **{k: v for k, v in kw.items() if k != "fs_enonce"})
        q
        self.play(FadeIn(tete), run_time=0.3)
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.4)
        self.q_montrer_choix(cartes)
        self.q_pause(pause, rebours, "04", t0, "C")
        return cartes, pause, rebours, donnees

    def reponse_1(self, cartes, pause, rebours, donnees):
        self.dire("04b-reponse")
        self.q_reponse(cartes, 2, pause, rebours)
        self.au_mot("7 est compris entre 5 et 9")
        # ⛔ VU À LA PLANCHE : l'encadrement posé à y = −1,4 s'écrivait PAR-DESSUS la
        # ligne « f(x) = 7 ? » de la colonne de gauche, qui reste à l'écran. Le dry run
        # ne l'a pas vu (rien ne dépassait du cadre), BORDS non plus : deux objets qui
        # se chevauchent sont tous les deux dans la marge. ⭐ La question « f(x) = 7 ? »
        # est justement ce que l'encadrement RÉPOND : elle se transforme en lui.
        enc = self.t("5 < 7 < 9", 54, VERT_OK)
        enc.move_to(donnees[3]).align_to(donnees[3], LEFT)
        self.play(ReplacementTransform(donnees[3], enc))
        self.au_mot("La réponse A cherche un 0")
        bulle = self.t("A cherche un zéro :\non ne demande pas zéro", 28, ROUGE_ERREUR)
        self.gauche(bulle, -2.6, xmax=1.6, x0=-6.0)
        self.play(FadeIn(bulle))
        self.attendre_voix(marge=0.5)

    # ── 05 ──────────────────────────────────────────────────────────────────

    def appliquer(self):
        self.clear()
        self.dire("05-appliquer")
        self.add_mascotte(scale=0.5)
        titre = self.t("Un exemple complet", 40, JAUNE_TITRE).to_edge(UP, buff=0.45)
        self.play(Write(titre), run_time=0.5)

        ax, grad = self.plan_axes((0.85, 2.15, 0.5), (-8, 36, 10), centre=(-3.6, -0.5),
                                  w=5.0, h=3.8, grad_x=(1, 2), grad_y=(0,))
        self.play(Create(ax), FadeIn(grad), run_time=0.7)

        self.au_mot("Soit g de x égale")
        f_ = self.t("g(x) = x⁵ + 3x − 5", 38, BLEU_CALCUL)
        self.play(FadeIn(self.col(f_, 2.5)))
        self.au_mot("C'est une fonction polynôme")
        self.play(FadeIn(self.col(self.t("polynôme → continue", 32, VERT_OK), 1.6)))

        self.au_mot("g de 1 vaut")
        p1 = self.pt(ax, 1, g(1), ROUGE_ERREUR)
        self.play(FadeIn(p1, scale=2),
                  FadeIn(self.col(self.t("g(1) = −1", 38, ROUGE_ERREUR), 0.7)))
        self.au_mot("g de 2 vaut")
        p2 = self.pt(ax, 2, g(2), VERT_OK)
        self.play(FadeIn(p2, scale=2),
                  FadeIn(self.col(self.t("g(2) = 33", 38, VERT_OK), -0.1)))

        self.au_mot("0 est compris entre")
        self.play(Create(self.courbe(ax, g, 0.9, 2.1)), run_time=1.2)
        self.play(Create(self.niveau(ax, 0.0)), run_time=0.5)
        self.play(FadeIn(self.col(self.t("−1 < 0 < 33", 40, JAUNE_TITRE), -1.0)))

        self.au_mot("admet donc au moins une solution")
        self.play(FadeIn(self.col(self.t("au moins une solution", 32, VERT_OK), -1.9)))
        self.attendre_voix(marge=0.5)

    # ── 06 ──────────────────────────────────────────────────────────────────

    def piege(self):
        self.clear()
        self.dire("06-piege")
        self.add_mascotte(scale=0.5)
        titre = self.t("Le piège", 44, ORANGE_RETENUE).to_edge(UP, buff=0.45)
        self.play(Write(titre), run_time=0.5)

        ax, grad = self.plan_axes((0, 3.2, 1), (-3, 4, 2), centre=(-3.6, -0.3),
                                  w=5.0, h=3.4, grad_x=(0, 3), grad_y=(0,))
        self.add(ax, grad)
        self.play(Create(self.niveau(ax, 0.0)), run_time=0.4)

        self.au_mot("Si f de a et f de b sont du même signe")
        # une courbe qui part de 2,2, descend à −2 et remonte à 2,2 : mêmes signes aux
        # deux bornes, et DEUX zéros. ⚠️ Le creux est calé pour rester dans y ∈ [−3 ; 4].
        c = self.courbe(ax, lambda x: 2.2 - 16.8 * (x / 3) * (1 - x / 3), 0, 3)
        self.play(Create(c), run_time=1.2)
        self.play(FadeIn(self.pt(ax, 0, 2.2, VERT_OK)), FadeIn(self.pt(ax, 3, 2.2, VERT_OK)))
        self.play(FadeIn(self.col(self.t("mêmes signes aux bornes", 32, ORANGE_RETENUE), 2.3)))

        self.au_mot("il ne dit pas qu'il n'y a pas de solution")
        self.play(FadeIn(self.col(self.t("le théorème SE TAIT", 36, ROUGE_ERREUR), 1.3),
                         scale=1.15))
        self.au_mot("La courbe peut très bien")
        self.play(FadeIn(self.col(self.t("il peut y en avoir deux", 30, WHITE), 0.4)))

        self.au_mot("il donne l'existence")
        bloc = self.pile([self.t("il donne : l'existence", 30, VERT_OK),
                          self.t("jamais : la valeur", 30, ROUGE_ERREUR),
                          self.t("jamais : le nombre", 30, ROUGE_ERREUR)], -1.3)
        self.play(FadeIn(bloc, shift=UP * 0.15))
        self.attendre_voix(marge=0.5)

    # ── 07 · question 2 ─────────────────────────────────────────────────────

    def question_2(self):
        self.clear()
        self.dire("07-question")
        self.add_mascotte(scale=0.5)
        donnees = VGroup(self.t("f continue sur [0 ; 3]", 34),
                         self.t("f(0) = 2", 42, BLEU_CALCUL),
                         self.t("f(3) = 8", 42, BLEU_CALCUL),
                         self.t("f(x) = 0 ?", 46, JAUNE_TITRE))
        donnees.arrange(DOWN, buff=0.38)
        self.gauche(donnees, 0.3, xmax=0.2, x0=-6.4)     # ⚠️ cartes larges : avant 0,2
        self.play(FadeIn(donnees), run_time=0.5)

        t0 = self.renderer.time
        enonce, choix, kw, _ = Q07
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
        self.q_pause(pause, rebours, "07", t0, "A")
        return cartes, pause, rebours, donnees

    def reponse_2(self, cartes, pause, rebours, donnees):
        self.dire("07b-reponse")
        self.q_reponse(cartes, 0, pause, rebours)
        self.au_mot("les deux images sont positives")
        # même remède qu'en 04b : la ligne de question devient sa propre réponse,
        # au lieu de recevoir un bloc par-dessus.
        enc = self.t("2 > 0  et  8 > 0", 40, ROUGE_ERREUR)
        enc.move_to(donnees[3]).align_to(donnees[3], LEFT)
        self.play(ReplacementTransform(donnees[3], enc))
        self.au_mot("Le théorème ne s'applique pas")
        rien = self.t("0 n'est pas entre les deux", 26, ROUGE_ERREUR)
        rien
        self.gauche(rien, -1.95, xmax=0.2, x0=-6.4)   # ⚠️ vu à la planche : trop serré à −1,65
        self.play(FadeIn(rien))
        self.au_mot("La réponse C va trop loin")
        bas = VGroup(self.t("C va trop loin :", 26, ORANGE_RETENUE),
                     self.t("la courbe peut descendre", 24, GREY_B),
                     self.t("sous zéro, puis remonter", 24, GREY_B))
        bas.arrange(DOWN, aligned_edge=LEFT, buff=0.12)
        self.gauche(bas, -2.85, xmax=0.2, x0=-6.4)
        self.play(FadeIn(bas))
        self.attendre_voix(marge=0.5)

    # ── 08 ──────────────────────────────────────────────────────────────────

    def rediger(self):
        self.clear()
        self.dire("08-rediger")
        self.add_mascotte(scale=0.5)
        titre = self.t("Sur la copie", 42, JAUNE_TITRE).to_edge(UP, buff=0.45)
        self.play(Write(titre), run_time=0.5)
        lignes = ["f est continue sur [a ; b], parce que…",
                  "f(a) = … , f(b) = … , et 0 est entre les deux",
                  "d'après le TVI, f(x) = 0 admet au moins",
                  "une solution dans [a ; b]"]
        bloc = VGroup()
        for i, s in enumerate(lignes):
            # ⚠️ La 4ᵉ ligne prolonge la 3ᵉ : sa pastille est un ESPACEUR invisible.
            # `Text(" ")` ne se rend pas et casse l'alignement — un Dot transparent, si.
            n = self.pastille(i + 1) if i < 3 else Dot(radius=0.24).set_opacity(0)
            bloc.add(VGroup(n, self.t(s, 30, larg=9.6)).arrange(RIGHT, buff=0.3))
        bloc.arrange(DOWN, aligned_edge=LEFT, buff=0.34).move_to(P(-0.5, 0.55))
        for i, l in enumerate(bloc):
            if i < 3:
                self.au_mot(["Un : la fonction f", "Deux : f de a vaut", "Trois : d'après"][i])
            self.play(FadeIn(l, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("Le mot qui compte")
        mot = self.t("« au moins »", 42, ORANGE_RETENUE).move_to(P(-0.5, -2.2))
        self.play(FadeIn(mot, scale=1.2))
        self.attendre_voix(marge=0.5)

    # ── 09 · le défi ────────────────────────────────────────────────────────

    def le_defi(self):
        self.clear()
        self.dire("09-defi")
        self.add_mascotte(scale=0.6)
        titre = self.t("À toi de jouer !", 46, JAUNE_TITRE).to_edge(UP, buff=0.5)
        self.play(Write(titre), run_time=0.5)
        enonce = self.t("x³ = x + 5", 80, BLEU_CALCUL).move_to(P(-0.4, 0.9))
        self.play(FadeIn(enonce))
        self.au_mot("admet une solution entre 1 et 2")
        c = self.t("une solution entre 1 et 2 ?", 38).move_to(P(-0.4, -0.3))
        self.play(FadeIn(c, shift=UP * 0.15))
        self.au_mot("il faut tout ramener")
        ind = self.t("d'abord : tout ramener d'un seul côté", 30, ORANGE_RETENUE)
        self.play(FadeIn(ind.move_to(P(-0.4, -1.4))))
        reb = self.rebours_defi(ind)
        self.attendre_voix(marge=0.3)
        reb.jouer(self)

    def rebours_defi(self, sous):
        from stats_lycee_h2_commun import CompteARebours
        c = CompteARebours(5, r=0.34, fs=32).next_to(sous, DOWN, buff=0.45)
        self.play(FadeIn(c, scale=0.6), run_time=0.3)
        return c

    def correction(self):
        self.clear()
        self.dire("09b-correction")
        self.add_mascotte(scale=0.5)
        titre = self.t("Correction", 42, VERT_OK).to_edge(UP, buff=0.45)
        self.play(Write(titre), run_time=0.5)

        ax, grad = self.plan_axes((0.85, 2.15, 0.5), (-7, 3, 2), centre=(-3.6, -0.6),
                                  w=5.0, h=3.6, grad_x=(1, 2), grad_y=(0,))
        self.play(Create(ax), FadeIn(grad), run_time=0.6)

        self.au_mot("On pose f de x égale")
        pose = self.t("f(x) = x³ − x − 5", 38, BLEU_CALCUL)
        self.play(FadeIn(self.col(pose, 2.4)))
        self.au_mot("donc elle est continue")
        self.play(FadeIn(self.col(self.t("polynôme → continue", 30, VERT_OK), 1.5)))

        self.au_mot("f de 1 vaut")
        self.play(FadeIn(self.pt(ax, 1, defi(1), ROUGE_ERREUR), scale=2),
                  FadeIn(self.col(self.t("f(1) = −5", 38, ROUGE_ERREUR), 0.6)))
        self.au_mot("f de 2 vaut")
        self.play(FadeIn(self.pt(ax, 2, defi(2), VERT_OK), scale=2),
                  FadeIn(self.col(self.t("f(2) = 1", 38, VERT_OK), -0.2)))

        self.au_mot("0 est compris entre moins 5 et 1")
        self.play(Create(self.courbe(ax, defi, 0.9, 2.1)), run_time=1.0)
        self.play(Create(self.niveau(ax, 0.0)), run_time=0.4)
        self.play(FadeIn(self.col(self.t("−5 < 0 < 1", 40, JAUNE_TITRE), -1.1)))
        self.au_mot("c'est exactement résoudre")
        self.play(FadeIn(self.col(self.t("au moins une solution", 32, VERT_OK), -2.0)))
        self.attendre_voix(marge=0.6)

    # ── le film ─────────────────────────────────────────────────────────────

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
            "Deux hypothèses : f continue, et k entre f(a) et f(b)",
            "Il donne au moins une solution — jamais sa valeur",
            "Deux images de même signe : le théorème se tait",
            "On ramène toujours l'équation à f(x) = 0",
        ])
        self.page_abonnement()
