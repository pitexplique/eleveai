# continuite_reconnaitre.py
# EleveAI — Maths Tle spé — paysage « Reconnaître une fonction continue sur un
# intervalle » (16:9), ceinture VERTE. Micro du coach : continuite_reconnaitre
# (notion continuite_tvi). Épisode 1 sur 5 de la série « CONTINUITÉ ET TVI ».
# Centre : transports (liste fermée lib/videos/centres-interet.ts, tranche 15-18).
#
# Clé de voix → écran :
#   · 00-garde      : titre, et « dire sur quel intervalle » ;
#   · 01-situation  : Kévin régule le téléphérique — l'altitude de la cabine prend
#                     toutes les valeurs, le compteur de passagers saute ;
#   · 02-idee       : deux morceaux qui NE recollent pas : 2x + 1 puis 5, saut de 2 ;
#   · 03-theoreme   : le catalogue du bac, et « dérivable entraîne continue » ;
#   · 04/04b        : question-pause n° 1 (x² et 3x − 2 en 2 → réponse A) ;
#   · 05-appliquer  : (2x + 1)/(x − 3), continue sur DEUX intervalles ;
#   · 06-piege      : l'ensemble s'écrit en intervalles ; |x| continue et pas
#                     dérivable en 0 ; la réciproque, elle, est vraie ;
#   · 07/07b        : question-pause n° 2 (ln x + x² → réponse B) ;
#   · 08-rediger    : la phrase de copie, qui NOMME la raison ;
#   · 09/09b        : le défi — √(x − 1) + 1/(x − 4), deux intervalles ;
#   · 10-finale / 11-abonne.
#
# ⭐ Le socle d'écran est dans manim/poste2/analyse_ecrans.py. ⛔ Une correction
#   d'OUTIL se fait là-bas, jamais recopiée ici.
# ⚠️ Bonne réponse : 04 → A, 07 → B (tirage graine 2711).
# ⛔⛔ Les nombres sont HORS AUDIT (`self.lettres`) : la voix les dit en toutes lettres.
#   Voir la docstring de `EcransAnalyse.lettres`.
#
# Rendu (⛔ JAMAIS de HD sans avoir regardé la planche -ql) :
#   python -m manim render -ql --disable_caching manim/scripts/terminale/continuite_reconnaitre.py ContinuiteReconnaitre -o eleveai-maths-terminale-continuite-reconnaitre --media_dir manim/scripts/terminale/media

import math
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(1, str(Path(__file__).resolve().parents[2] / "poste2"))

from manim import *

from analyse_ecrans import CompteARebours, EcransAnalyse, P, XL, C_COURBE, C_SAUT
from charte import *

# ⭐ Les deux questions-pauses, exportées pour `manim/poste2/mesure-continuite-tvi.py`.
# ⛔ Elles ne sont recopiées nulle part : la mesure les importe.
# ⚠️ L'énoncé tient sur UNE ligne, et la définition de g est légendée SOUS la figure :
# mesuré, avec trois lignes d'énoncé le bas des cartes tombait à −2,26 et recouvrait
# Ti-Margo (sa boîte commence à x = 5,54, et les cartes vont jusqu'à 6,60).
Q04 = (["Continue en 2 ?"],
       [("oui, les deux morceaux", "valent 4 en 2"),
        ("non, il y a un saut", "de 2 unités"),
        ("il faudrait connaître", "la dérivée")],
       {"largeur": 5.6, "xl": 1.0, "fs_enonce": 30}, "A")

# ⚠️ Les trois cartes tiennent sur UNE ligne : ce sont des ensembles, pas des phrases.
Q07 = (["Sur quel ensemble", "h(x) = ln x + x²", "est-elle continue ?"],
       [("sur ℝ tout entier",),
        ("sur ]0 ; +∞[",),
        ("sur [0 ; +∞[",)],
       {"fs_enonce": 30}, "B")


def altitude(t):
    """L'altitude de la cabine : elle prend TOUTES les valeurs entre 40 et 180 m."""
    return 40 + 140 * (1 - math.cos(math.pi * t / 6)) / 2


def hyperbole(x):
    return (2 * x + 1) / (x - 3)


class ContinuiteReconnaitre(EcransAnalyse):
    fichier_marques = "continuite_reconnaitre_marques.json"   # WAV faits le 27/11 (-Debit -6 aux deux etapes)
    nom_voix = "terminale-continuite-reconnaitre"

    # ── 00 ──────────────────────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.dire("00-garde")
        self.add_mascotte(scale=0.8)
        titre = self.t("Reconnaître une fonction continue", 46, JAUNE_TITRE, larg=11.6)
        titre.to_edge(UP, buff=0.55)
        ident = self.t(self.identite, 26).next_to(titre, DOWN, buff=0.22)
        coeur = self.t("sans lever le crayon", 60, BLEU_CALCUL).move_to(P(-0.6, 0.6))
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2))
        self.play(FadeIn(coeur))
        self.au_mot("il faut l'écrire")
        sous = self.t("…et dire sur quel intervalle", 36, ORANGE_RETENUE)
        self.play(FadeIn(sous.move_to(P(-0.6, -0.6)), shift=UP * 0.15))
        self.play(FadeIn(self.echelle().align_to(P(0, -3.45), DOWN)))
        self.attendre_voix(marge=0.5)

    # ── 01 ──────────────────────────────────────────────────────────────────

    def situation(self):
        self.clear()
        self.dire("01-situation")
        self.add_mascotte(scale=0.5)
        titre = self.t("Deux écrans en salle de contrôle", 38, JAUNE_TITRE)
        self.play(Write(titre.to_edge(UP, buff=0.45)), run_time=0.6)

        # ⚠️ DEUX figures empilées dans la moitié gauche : chacune 1,5 de haut, centrées
        # à y = 1,25 et y = −1,55. Mesuré : elles ne se touchent pas et restent au-dessus
        # du bas de cadre (−3,57).
        # ⚠️ centre à −3,3 et largeur 4,6, PAS −3,6 / 5,0 : avec 5,0 le bord gauche des
        # axes tombe à −6,10, et l'étiquette « 180 », posée à sa gauche, sortait à
        # −6,70 — au-delà de la marge de 3 % (−6,68). Vu par BORDS, par rien d'autre.
        ax1, g1 = self.plan_axes((0, 12.5, 2), (0, 200, 50), centre=(-3.3, 1.25),
                                 w=4.6, h=1.5, grad_y=(40, 180))
        ax2, g2 = self.plan_axes((0, 5, 1), (0, 4, 1), centre=(-3.3, -1.55),
                                 w=4.6, h=1.5, grad_y=(1, 2))
        self.play(Create(ax1), FadeIn(g1), run_time=0.5)

        self.au_mot("l'altitude de la cabine")
        c1 = self.courbe(ax1, altitude, 0, 12.4, color=VERT_OK)
        self.play(Create(c1), run_time=1.2)
        self.play(FadeIn(self.col(self.pile(
            [self.t("l'altitude :", 30, VERT_OK),
             self.t("toutes les valeurs", 28, VERT_OK)], 2.0), 2.0)))

        self.au_mot("le nombre de passagers")
        self.play(Create(ax2), FadeIn(g2), run_time=0.5)
        marches = self.marche(ax2, [0, 1.6, 3.1, 5], [1, 2, 3])
        self.play(Create(marches), run_time=0.9)
        # ⚠️ « 1,5 » est dit « un et demi » par la voix : hors audit.
        self.play(FadeIn(self.col(self.pile(
            [self.t("les passagers :", 30, C_SAUT),
             self.t("jamais 1,5", 28, C_SAUT)], -0.7), -0.7)))

        self.au_mot("Deux courbes, deux mondes")
        self.play(FadeIn(self.col(self.t("deux mondes", 34, ORANGE_RETENUE), -2.2)))
        self.attendre_voix(marge=0.5)

    # ── 02 ──────────────────────────────────────────────────────────────────

    def idee(self):
        self.clear()
        self.dire("02-idee")
        self.add_mascotte(scale=0.5)
        titre = self.t("Recoller deux morceaux", 40, JAUNE_TITRE).to_edge(UP, buff=0.45)
        self.play(Write(titre), run_time=0.5)

        ax, grad = self.plan_axes((0, 2.6, 1), (0, 6.5, 2), centre=(-3.6, -0.3),
                                  w=5.0, h=3.6, grad_x=(1,), grad_y=(3, 5))
        self.play(Create(ax), FadeIn(grad), run_time=0.6)

        self.au_mot("Une fonction est continue en a")
        deff = self.t("continue en a :", 32, VERT_OK)
        deff2 = self.t("lim f(x) = f(a)", 40, VERT_OK)
        self.play(FadeIn(self.col(VGroup(deff, deff2).arrange(DOWN, buff=0.14), 2.4)))

        self.au_mot("Prenons une fonction en deux morceaux")
        mor = self.deux_morceaux(ax, lambda x: 2 * x + 1, lambda x: 5.0, 0, 1, 2.5,
                                 recolle=False)
        self.play(Create(mor.m1), run_time=0.7)
        self.play(Create(mor.m2), run_time=0.7)

        self.au_mot("s'approche de 3")
        self.play(FadeIn(self.col(self.t("à gauche : 3", 36, C_SAUT), 0.9)))
        self.au_mot("la valeur en 1, c'est 5")
        self.play(FadeIn(self.col(self.t("en 1 : 5", 36, C_SAUT), 0.0)))

        self.au_mot("la courbe saute de 2")
        self.play(Create(mor.marque), run_time=0.6)
        self.play(FadeIn(self.col(self.t("saut de 2", 42, ROUGE_ERREUR), -1.0),
                         scale=1.2))
        self.play(FadeIn(self.col(
            self.t("pas continue en 1", 30, ROUGE_ERREUR), -1.9)))
        self.attendre_voix(marge=0.5)

    # ── 03 ──────────────────────────────────────────────────────────────────

    def theoreme(self):
        self.clear()
        self.dire("03-theoreme")
        self.add_mascotte(scale=0.5)
        titre = self.t("Le catalogue du bac", 42, JAUNE_TITRE).to_edge(UP, buff=0.45)
        self.play(Write(titre), run_time=0.5)

        lignes = [("les polynômes", "sur ℝ", "Les fonctions polynômes"),
                  ("la racine carrée", "sur [0 ; +∞[", "La fonction racine carrée"),
                  ("l'exponentielle", "sur ℝ", "L'exponentielle est continue"),
                  ("le logarithme", "sur ]0 ; +∞[", "le logarithme népérien"),
                  ("sommes, produits, composées", "continues", "Les sommes, les produits"),
                  ("un quotient", "là où le bas ne s'annule pas", "Un quotient l'est")]
        bloc = VGroup()
        for nom, ou, _ in lignes:
            bloc.add(VGroup(self.t(nom + " :", 28), self.t(ou, 28, VERT_OK))
                     .arrange(RIGHT, buff=0.22))
        bloc.arrange(DOWN, aligned_edge=LEFT, buff=0.24).move_to(P(-0.4, 0.7))
        for l, (_, _, mot) in zip(bloc, lignes):
            self.au_mot(mot)
            self.play(FadeIn(l, shift=RIGHT * 0.2), run_time=0.3)

        self.au_mot("une règle qui sert tout le temps")
        r = self.t("dérivable sur un intervalle  ⟹  continue", 34, ORANGE_RETENUE)
        self.play(FadeIn(r.move_to(P(-0.4, -2.2)), scale=1.1))
        self.attendre_voix(marge=0.5)

    # ── 04 · question 1 ─────────────────────────────────────────────────────

    def question_1(self):
        self.clear()
        self.dire("04-question")
        self.add_mascotte(scale=0.5)
        ax, grad = self.plan_axes((0, 3.2, 1), (0, 8, 2), centre=(-4.6, 0.2),
                                  w=3.0, h=2.6, grad_x=(2,), grad_y=(4,))
        mor = self.deux_morceaux(ax, lambda x: x * x, lambda x: 3 * x - 2, 0, 2, 3)
        legende = VGroup(self.t("g(x) = x² si x ≤ 2,", 28),
                         self.t("3x − 2 si x > 2", 28))
        # ⛔ VU À LA PLANCHE : posée SOUS les axes, la légende tombait sur les
        # graduations ET sur le bloc de calcul que l'écran de réponse pose à −2,0.
        # Trois textes au même endroit, illisibles. Au-dessus, il y a la place.
        legende.arrange(DOWN, aligned_edge=LEFT, buff=0.12).next_to(ax, UP, buff=0.25)
        self.play(Create(ax), FadeIn(grad), Create(mor), FadeIn(legende), run_time=0.9)

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
        self.q_pause(pause, rebours, "04", t0, "A")
        return cartes, pause, rebours, mor, ax

    def reponse_1(self, cartes, pause, rebours, mor, ax):
        self.dire("04b-reponse")
        self.q_reponse(cartes, 0, pause, rebours)
        self.au_mot("2 au carré fait 4")
        calc = VGroup(self.t("2² = 4", 34, VERT_OK),
                      self.t("3 × 2 − 2 = 4", 34, VERT_OK))
        calc.arrange(DOWN, buff=0.18)
        self.gauche(calc, -2.0, xmax=0.4, x0=-6.4)
        self.play(FadeIn(calc))
        self.au_mot("Les deux morceaux se rejoignent")
        self.play(FadeIn(mor.marque, scale=2.4),
                  Flash(mor.marque, color=VERT_OK, line_length=0.22))
        self.attendre_voix(marge=0.5)

    # ── 05 ──────────────────────────────────────────────────────────────────

    def appliquer(self):
        self.clear()
        self.dire("05-appliquer")
        self.add_mascotte(scale=0.5)
        titre = self.t("Un quotient", 40, JAUNE_TITRE).to_edge(UP, buff=0.45)
        self.play(Write(titre), run_time=0.5)

        ax, grad = self.plan_axes((-2, 6.4, 2), (-11, 11, 5), centre=(-3.6, -0.3),
                                  w=5.0, h=3.6, grad_x=(3,), grad_y=(0,))
        self.play(Create(ax), FadeIn(grad), run_time=0.6)

        self.au_mot("Soit f de x égale")
        f_ = self.t("f(x) = (2x + 1)/(x − 3)", 34, BLEU_CALCUL)
        self.play(FadeIn(self.col(f_, 2.4)))
        self.au_mot("C'est un quotient de deux polynômes")
        self.play(FadeIn(self.col(self.t("quotient de polynômes", 30, WHITE), 1.5)))

        self.au_mot("Le dénominateur s'annule en 3")
        asym = DashedLine(ax.c2p(3, -11), ax.c2p(3, 11), color=ROUGE_ERREUR, stroke_width=3)
        self.play(Create(asym), run_time=0.5)
        self.play(FadeIn(self.col(self.t("x = 3 interdit", 34, ROUGE_ERREUR), 0.6)))

        self.au_mot("Donc f est continue sur")
        self.play(Create(self.courbe(ax, hyperbole, -2, 2.2)),
                  Create(self.courbe(ax, hyperbole, 4.0, 6.4)), run_time=1.2)
        inter = VGroup(self.t("]−∞ ; 3[", 38, VERT_OK),
                       self.t("et  ]3 ; +∞[", 38, VERT_OK))
        inter.arrange(DOWN, aligned_edge=LEFT, buff=0.16)
        self.play(FadeIn(self.col(inter, -0.9)))
        self.au_mot("et on écrit les deux")
        self.play(FadeIn(self.col(self.t("deux intervalles", 30, JAUNE_TITRE), -2.1)))
        self.attendre_voix(marge=0.5)

    # ── 06 ──────────────────────────────────────────────────────────────────

    def piege(self):
        self.clear()
        self.dire("06-piege")
        self.add_mascotte(scale=0.5)
        titre = self.t("Le piège", 44, ORANGE_RETENUE).to_edge(UP, buff=0.45)
        self.play(Write(titre), run_time=0.5)

        self.au_mot("On n'écrit jamais")
        faux = self.t("continue sur ℝ \\ {3}", 34, ROUGE_ERREUR)
        self.gauche(faux, 2.1, xmax=1.2, x0=-6.4)
        self.play(FadeIn(faux))
        self.play(Create(self.croix(r=0.22).next_to(faux, RIGHT, buff=0.35)), run_time=0.4)

        self.au_mot("On donne les intervalles")
        bon = self.t("]−∞ ; 3[  et  ]3 ; +∞[", 34, VERT_OK)
        self.gauche(bon, 1.1, xmax=1.2, x0=-6.4)
        self.play(FadeIn(bon))

        self.au_mot("continue et dérivable")
        ax, grad = self.plan_axes((-2, 2.2, 1), (0, 2.4, 1), centre=(-4.3, -1.6),
                                  w=3.6, h=1.8, grad_y=(0,))
        self.play(Create(ax), FadeIn(grad),
                  Create(self.courbe(ax, abs, -2, 2.1, color=ORANGE_RETENUE)), run_time=0.8)
        self.play(FadeIn(self.t("|x| : une pointe en 0", 26, ORANGE_RETENUE)
                         .next_to(ax, DOWN, buff=0.18)))

        self.au_mot("elle n'est pas dérivable en 0")
        bloc = self.pile([self.t("continue en 0 : oui", 30, VERT_OK),
                          self.t("dérivable en 0 : non", 30, ROUGE_ERREUR)], 0.9)
        bloc
        self.play(FadeIn(bloc))
        self.au_mot("Dérivable entraîne continue")
        sens = self.pile([self.t("dérivable ⟹ continue", 30, VERT_OK),
                          self.t("continue ⟹ rien", 30, ROUGE_ERREUR)], -1.2)
        self.play(FadeIn(sens))
        self.attendre_voix(marge=0.5)

    # ── 07 · question 2 ─────────────────────────────────────────────────────

    def question_2(self):
        self.clear()
        self.dire("07-question")
        self.add_mascotte(scale=0.5)
        rap = self.pile([self.t("rappel :", 28, GREY_B),
                         self.t("ln continue", 30, VERT_OK),
                         self.t("sur ]0 ; +∞[", 30, VERT_OK)], 0.0, xl=-6.2)
        self.play(FadeIn(rap), run_time=0.4)

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
        return cartes, pause, rebours, rap

    def reponse_2(self, cartes, pause, rebours, rap):
        self.dire("07b-reponse")
        # ⛔ VU À LA PLANCHE : le rappel de la colonne de gauche restait affiché, et
        # l'explication s'écrivait PAR-DESSUS. Même famille que le « Mets pause » qui
        # restait sur l'explication dans la série espace : ce qui a servi doit partir.
        self.play(FadeOut(rap), run_time=0.2)
        self.q_reponse(cartes, 1, pause, rebours)
        self.au_mot("n'existe que pour x strictement positif")
        bloc = VGroup(self.t("ln x : x > 0", 36, VERT_OK),
                      self.t("x² : partout", 32, WHITE),
                      self.t("une somme n'existe que", 26, GREY_B),
                      self.t("là où les deux existent", 26, GREY_B))
        bloc.arrange(DOWN, aligned_edge=LEFT, buff=0.18)
        self.gauche(bloc, 0.4, xmax=0.2, x0=-6.4)
        self.play(FadeIn(bloc))
        self.au_mot("La réponse C ajoute un 0")
        bas = self.t("C ajoute un 0 que ln refuse", 26, ROUGE_ERREUR)
        bas
        self.gauche(bas, -2.2, xmax=0.2, x0=-6.4)
        self.play(FadeIn(bas))
        self.attendre_voix(marge=0.5)

    # ── 08 ──────────────────────────────────────────────────────────────────

    def rediger(self):
        self.clear()
        self.dire("08-rediger")
        self.add_mascotte(scale=0.5)
        titre = self.t("Sur la copie", 42, JAUNE_TITRE).to_edge(UP, buff=0.45)
        self.play(Write(titre), run_time=0.5)
        lignes = ["h est la somme du logarithme népérien,",
                  "continu sur ]0 ; +∞[, et d'un polynôme,",
                  "continu sur ℝ. Donc h est continue",
                  "sur ]0 ; +∞[."]
        bloc = VGroup(*[self.t(s, 32, larg=10.6) for s in lignes])
        bloc.arrange(DOWN, aligned_edge=LEFT, buff=0.22).move_to(P(-0.4, 0.9))
        self.play(FadeIn(bloc, shift=RIGHT * 0.2), run_time=0.8)
        self.au_mot("On nomme la raison")
        r = self.t("on nomme la RAISON, et l'INTERVALLE", 32, VERT_OK)
        self.play(FadeIn(r.move_to(P(-0.4, -1.5))))
        self.au_mot("On n'écrit jamais")
        j = self.t("jamais : « c'est continu »", 30, ROUGE_ERREUR)
        self.play(FadeIn(j.move_to(P(-0.4, -2.4))))
        self.attendre_voix(marge=0.5)

    # ── 09 · le défi ────────────────────────────────────────────────────────

    def le_defi(self):
        self.clear()
        self.dire("09-defi")
        self.add_mascotte(scale=0.6)
        titre = self.t("À toi de jouer !", 46, JAUNE_TITRE).to_edge(UP, buff=0.5)
        self.play(Write(titre), run_time=0.5)
        enonce = self.t("f(x) = √(x − 1) + 1/(x − 4)", 56, BLEU_CALCUL)
        self.play(FadeIn(enonce.move_to(P(-0.4, 0.9))))
        self.au_mot("Sur quels intervalles")
        q = self.t("sur quels intervalles f est-elle continue ?", 34)
        self.play(FadeIn(q.move_to(P(-0.4, -0.3)), shift=UP * 0.15))
        self.au_mot("il y en a plus d'un")
        ind = self.t("attention : il y en a plus d'un", 30, ORANGE_RETENUE)
        self.play(FadeIn(ind.move_to(P(-0.4, -1.4))))
        reb = CompteARebours(5, r=0.34, fs=32).next_to(ind, DOWN, buff=0.45)
        self.play(FadeIn(reb, scale=0.6), run_time=0.3)
        self.attendre_voix(marge=0.3)
        reb.jouer(self)

    def correction(self):
        self.clear()
        self.dire("09b-correction")
        self.add_mascotte(scale=0.5)
        titre = self.t("Correction", 42, VERT_OK).to_edge(UP, buff=0.45)
        self.play(Write(titre), run_time=0.5)

        # Une DROITE GRADUÉE, pas une courbe : la question porte sur un ensemble.
        axe = Line(P(-6.2, 0.4), P(0.6, 0.4), stroke_width=3)
        un, quatre = P(-4.6, 0.4), P(-1.6, 0.4)
        marques = VGroup(Line(un + DOWN * 0.14, un + UP * 0.14, stroke_width=3),
                         Line(quatre + DOWN * 0.14, quatre + UP * 0.14, stroke_width=3),
                         self.t("1", 26).move_to(un + DOWN * 0.42),
                         self.t("4", 26).move_to(quatre + DOWN * 0.42))
        self.play(Create(axe), FadeIn(marques), run_time=0.6)

        self.au_mot("La racine de x moins 1 existe")
        r1 = self.t("√(x − 1) : x ≥ 1", 32, VERT_OK)
        self.play(FadeIn(self.col(r1, 2.3)))
        self.au_mot("est continu partout sauf en 4")
        r2 = self.t("1/(x − 4) : x ≠ 4", 32, ROUGE_ERREUR)
        self.play(FadeIn(self.col(r2, 1.4)))

        self.au_mot("La fonction f est donc continue sur")
        seg1 = Line(un, quatre, stroke_width=9, color=VERT_OK)
        seg2 = Line(quatre, P(0.5, 0.4), stroke_width=9, color=VERT_OK)
        trou = Circle(radius=0.11, color=ROUGE_ERREUR, stroke_width=4).move_to(quatre)
        self.play(Create(seg1), Create(seg2), run_time=0.7)
        self.play(FadeIn(trou, scale=2))
        rep = VGroup(self.t("[1 ; 4[", 44, JAUNE_TITRE),
                     self.t("et  ]4 ; +∞[", 44, JAUNE_TITRE))
        rep.arrange(DOWN, aligned_edge=LEFT, buff=0.18)
        self.play(FadeIn(self.col(rep, -0.6)))
        self.au_mot("Deux intervalles, et pas un seul")
        self.play(FadeIn(self.col(self.t("deux, pas un", 32, VERT_OK), -2.0)))
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
            "Continue en a : la limite en a vaut f(a)",
            "Deux morceaux recollent s'ils donnent la même valeur",
            "Le catalogue : polynômes, racine, exponentielle, ln",
            "Un ensemble de continuité s'écrit intervalle par intervalle",
            "Dérivable entraîne continue — jamais le contraire",
        ])
        self.page_abonnement()
