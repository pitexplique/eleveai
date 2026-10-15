# suites.py
# EleveAI — Maths première spécialité — Les suites numériques (notionId : suites)
#
# ⭐ LE FIL, celui de la fiche d'exercices écrite le même jour : UNE SUITE
# AJOUTE, OU ELLE MULTIPLIE. Tout le chapitre commence par ce tri, et le
# paradoxe qui va avec : celle qui monte le plus lentement au départ finit
# toujours par dépasser l'autre, et de très loin.
#
#   SuitesAjouterMultiplier → reconnaître et MONTRER qu'une suite est
#                             arithmétique ou géométrique, écrire son terme
#                             général, et voir le duel des deux croissances.
#
# Mapping micro-compétences (notion suites) :
#   suite_termes, suite_recurrence  → écran 1 (les deux écritures)
#   suite_arithmetique              → écran 2
#   suite_geometrique               → écran 3
#   suite_evolution, suite_modeliser → écran 4 (le duel)
#   suite_variation                 → écran 5
#   suite_auxiliaire, suite_sommes, suite_somme_geo, suite_algorithme,
#   suite_limite, suite_registres   → ⏳ vidéo suivante
#
# Briques : les aides de `exponentielle.py` (rang, frac, encadre) et de
# `second_degre.py` (indice, poser). ⛔ Pas de LaTeX sur ce poste : Text + dessin,
# indices et exposants composés à la main.
#
# Rendu (sans cache, sinon les sons sautent) :
#   python -m manim render -qh --disable_caching manim/scripts/premiere/suites.py SuitesAjouterMultiplier -o eleveai-maths-premiere-suites-arith-geo --media_dir manim/scripts/premiere/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parent))

from manim import *

from charte import *
from second_degre import SecondDegreBase
from gabarit_seconde import SONS

# ⛔ La charte n'a ni gris ni « orange attention » : elle porte JAUNE_TITRE,
# VERT_OK, ROUGE_ERREUR, BLEU_CALCUL, ORANGE_RETENUE et VIOLET_ACCENT. Le gris
# des commentaires discrets vient de Manim.
GRIS_DOUX = GREY_B
ORANGE_ATTENTION = ORANGE_RETENUE


class SuitesBase(SecondDegreBase):
    """Les aides communes aux vidéos des suites."""

    identite = "Maths première — EleveAI"
    episode = ""
    total = 2

    # ── les aides propres aux suites ────────────────────────────────────────

    def u(self, rang, lettre="u", font_size=44, color=WHITE, color_ind=None):
        """u₀, u₁, uₙ, uₙ₊₁ — la lettre et son indice, composés à la main."""
        return self.indice(lettre, rang, font_size=font_size, color=color)

    def case(self, valeur, couleur, largeur=1.55, hauteur=0.95, font_size=34):
        """Une case de frise : la valeur d'un terme, dans son cadre."""
        boite = RoundedRectangle(
            corner_radius=0.12,
            width=largeur,
            height=hauteur,
            stroke_color=couleur,
            stroke_width=3,
            fill_color=couleur,
            fill_opacity=0.12,
        )
        t = self.T(str(valeur), font_size, WHITE)
        if t.width > largeur - 0.25:
            t.scale_to_fit_width(largeur - 0.25)
        return VGroup(boite, t.move_to(boite.get_center()))

    def frise(self, valeurs, operation, couleur, centre, largeur=1.55, buff=0.62, font_op=26):
        """
        Les premiers termes en ligne, et CE QU'ON FAIT pour passer de l'un au
        suivant, écrit sur chaque flèche.

        ⭐ C'est le dessin qui distingue les deux familles : la même image, avec
        « + r » ou « × q » sur les flèches. L'élève voit le mécanisme avant la
        formule.
        """
        cases = VGroup(*[self.case(v, couleur, largeur=largeur) for v in valeurs])
        cases.arrange(RIGHT, buff=buff)
        fleches = VGroup()
        for i in range(len(valeurs) - 1):
            depart = cases[i].get_right()
            arrivee = cases[i + 1].get_left()
            fl = Arrow(
                depart + RIGHT * 0.05,
                arrivee - RIGHT * 0.05,
                buff=0,
                stroke_width=3,
                max_tip_length_to_length_ratio=0.28,
                color=couleur,
            )
            etiquette = self.T(operation, font_op, couleur)
            etiquette.next_to(fl, UP, buff=0.08)
            fleches.add(VGroup(fl, etiquette))
        groupe = VGroup(cases, fleches)
        groupe.move_to(centre)
        return groupe, cases

    def ligne_duel(self, label, valeurs, couleur, y, x_gauche=-5.5, pas=3.1, font_size=30):
        """
        Une ligne du tableau du duel : son nom à gauche, ses valeurs alignées.

        ⛔ Mesuré sur la planche du 17/09 : avec un pas de 2,35, les en-têtes
        « dans 10 ans » et « dans 20 ans » se touchaient et se lisaient
        « dans 10 ansdans 20 ans ». Les colonnes se dimensionnent sur le PLUS
        LONG en-tête, jamais sur la plus courte valeur.
        """
        g = VGroup()
        nom = self.T(label, font_size, couleur).move_to([x_gauche, y, 0])
        g.add(nom)
        for i, v in enumerate(valeurs):
            g.add(self.T(str(v), font_size + 2, WHITE).move_to([x_gauche + 3.2 + i * pas, y, 0]))
        return g


# ══════════════════════════════════════════════════════════════════════════════
#  VIDÉO 1 — AJOUTER OU MULTIPLIER
#  suite_termes, suite_recurrence, suite_arithmetique, suite_geometrique,
#  suite_evolution, suite_modeliser, suite_variation
# ══════════════════════════════════════════════════════════════════════════════


class SuitesAjouterMultiplier(SuitesBase):
    episode = "1"

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.dossier_voix = SONS / "premiere-suites-arith-geo"

    # ── écran 1 : les deux écritures ────────────────────────────────────────
    def ecran_ecritures(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-ecritures")
        titre = self.T("Une suite, deux écritures", 46, JAUNE_TITRE).to_edge(UP, buff=0.55)
        self.play(Write(titre))

        # La frise : on part de 4 et on ajoute 3.
        groupe, cases = self.frise([4, 7, 10, 13], "+ 3", BLEU_CALCUL, [0, 1.55, 0])
        self.play(FadeIn(groupe[0][0]))
        for i in range(3):
            self.play(GrowArrow(groupe[1][i][0]), FadeIn(groupe[1][i][1]), run_time=0.4)
            self.play(FadeIn(cases[i + 1], shift=RIGHT * 0.2), run_time=0.4)

        rangs = VGroup()
        for i, c in enumerate(cases):
            rangs.add(self.u(i, font_size=26, color=GRIS_DOUX).next_to(c, DOWN, buff=0.16))
        self.play(FadeIn(rangs))

        # Les deux écritures, côte à côte.
        gauche = VGroup(
            self.T("par récurrence", 30, VERT_OK),
            self.rang(self.u("n+1", font_size=38), "=", self.u("n", font_size=38), "+ 3", font_size=38, buff=0.2),
            self.T("on avance d'un terme au suivant", 24, GRIS_DOUX),
        ).arrange(DOWN, buff=0.28).move_to([-3.6, -1.35, 0])

        droite = VGroup(
            self.T("explicite", 30, ORANGE_ATTENTION),
            self.rang(self.u("n", font_size=38), "= 4 + 3n", font_size=38, buff=0.2),
            self.T("on saute directement au rang voulu", 24, GRIS_DOUX),
        ).arrange(DOWN, buff=0.28).move_to([3.6, -1.35, 0])

        self.play(FadeIn(gauche, shift=UP * 0.15))
        self.play(FadeIn(droite, shift=UP * 0.15))

        barre = Line([0, -0.45, 0], [0, -2.3, 0], stroke_color=GRIS_DOUX, stroke_width=2)
        self.play(Create(barre))
        self.play(Write(self.chute("C'est la même suite. Mais pour calculer u₁₀₀, une seule des deux sert.", color=BLEU_CALCUL)))
        self.attendre_voix()

    # ── écran 2 : arithmétique ──────────────────────────────────────────────
    def ecran_arithmetique(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-arithmetique")
        titre = self.T("Arithmétique : on AJOUTE", 46, JAUNE_TITRE).to_edge(UP, buff=0.55)
        self.play(Write(titre))

        groupe, _ = self.frise([5, 9, 13, 17, 21], "+ 4", VERT_OK, [0, 1.7, 0], largeur=1.3, buff=0.5)
        self.play(FadeIn(groupe, shift=DOWN * 0.15))

        # Le geste du devoir : MONTRER.
        # ⛔ En 30, ce titre touchait le bord gauche du cadre (planche du 17/09).
        montrer = VGroup(
            self.T("Montrer qu'elle est arithmétique", 27, ROUGE_ERREUR),
            self.rang(self.u("n+1", font_size=34), "−", self.u("n", font_size=34), "= 4", font_size=34, buff=0.18),
            self.T("la différence ne dépend plus de n", 23, GRIS_DOUX),
        ).arrange(DOWN, buff=0.24).move_to([-3.85, -0.55, 0])
        self.play(FadeIn(montrer, shift=UP * 0.15))

        formule = self.encadre(
            self.rang(self.u("n", font_size=40), "=", self.u("0", font_size=40), "+ r n", font_size=40, buff=0.2),
            couleur=VERT_OK,
        )
        formule.move_to([3.7, -0.35, 0])
        exemple = self.rang(self.u("n", font_size=34), "= 5 + 4n", font_size=34, buff=0.2).next_to(formule, DOWN, buff=0.35)
        self.play(FadeIn(formule[0]), Create(formule[1]))
        self.play(FadeIn(exemple))
        self.play(Write(self.chute("r est la raison : le nombre qu'on ajoute, et lui seul.", color=VERT_OK)))
        self.attendre_voix()

    # ── écran 3 : géométrique ───────────────────────────────────────────────
    def ecran_geometrique(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-geometrique")
        titre = self.T("Géométrique : on MULTIPLIE", 46, JAUNE_TITRE).to_edge(UP, buff=0.55)
        self.play(Write(titre))

        groupe, _ = self.frise([5, 10, 20, 40, 80], "× 2", BLEU_CALCUL, [0, 1.7, 0], largeur=1.3, buff=0.5)
        self.play(FadeIn(groupe, shift=DOWN * 0.15))

        montrer = VGroup(
            self.T("Montrer qu'elle est géométrique", 27, ROUGE_ERREUR),
            self.rang(self.frac(self.u("n+1", font_size=30), self.u("n", font_size=30)), "= 2", font_size=34, buff=0.25),
            self.T("le quotient ne dépend plus de n", 23, GRIS_DOUX),
        ).arrange(DOWN, buff=0.24).move_to([-3.85, -0.6, 0])
        self.play(FadeIn(montrer, shift=UP * 0.15))

        formule = self.encadre(
            self.rang(self.u("n", font_size=40), "=", self.u("0", font_size=40), "×", self.puissance("q", "n", font_size=40), font_size=40, buff=0.2),
            couleur=BLEU_CALCUL,
        )
        formule.move_to([3.7, -0.35, 0])
        exemple = self.rang(self.u("n", font_size=34), "= 5 ×", self.puissance("2", "n", font_size=34), font_size=34, buff=0.2).next_to(formule, DOWN, buff=0.35)
        self.play(FadeIn(formule[0]), Create(formule[1]))
        self.play(FadeIn(exemple))
        self.play(Write(self.chute("Ici on DIVISE. Si on soustrayait, le résultat dépendrait encore de n.", color=BLEU_CALCUL)))
        self.attendre_voix()

    # ── écran 4 : le duel ───────────────────────────────────────────────────
    def ecran_duel(self):
        self.clear()
        self.add_mascotte(scale=0.5)
        self.dire("04-duel")
        titre = self.T("+ 30 par an, ou + 12 % par an ?", 46, JAUNE_TITRE).to_edge(UP, buff=0.5)
        self.play(Write(titre))

        sous = self.T("Deux clubs partent de 250 membres.", 28, GRIS_DOUX).next_to(titre, DOWN, buff=0.25)
        self.play(FadeIn(sous))

        entetes = self.ligne_duel("", ["dans 1 an", "dans 10 ans", "dans 20 ans"], GRIS_DOUX, 1.15, font_size=24)
        self.play(FadeIn(entetes))

        ligne_a = self.ligne_duel("+ 30 par an", [280, 550, 850], VERT_OK, 0.25)
        self.play(FadeIn(ligne_a[0]))
        for m in ligne_a[1:]:
            self.play(FadeIn(m, shift=UP * 0.12), run_time=0.35)

        ligne_g = self.ligne_duel("+ 12 % par an", [280, 776, 2412], BLEU_CALCUL, -0.85)
        self.play(FadeIn(ligne_g[0]))
        for m in ligne_g[1:]:
            self.play(FadeIn(m, shift=UP * 0.12), run_time=0.35)

        # ⭐ La première colonne est identique : c'est ce qui rend le reste frappant.
        egal = SurroundingRectangle(VGroup(ligne_a[1], ligne_g[1]), color=JAUNE_TITRE, buff=0.18, corner_radius=0.1)
        self.play(Create(egal))
        self.play(FadeIn(self.T("la première année, exactement pareil", 24, JAUNE_TITRE).move_to([-3.2, -1.75, 0])))

        ecart = SurroundingRectangle(VGroup(ligne_a[3], ligne_g[3]), color=ROUGE_ERREUR, buff=0.18, corner_radius=0.1)
        self.play(Create(ecart))
        self.play(FadeIn(self.T("vingt ans plus tard : presque le triple", 24, ROUGE_ERREUR).move_to([3.4, -1.75, 0])))

        self.play(Write(self.chute("Un pourcentage part lentement — puis il dépasse tout. Toujours.", color=ORANGE_ATTENTION)))
        self.attendre_voix()

    # ── écran 5 : le sens de variation ──────────────────────────────────────
    def ecran_variation(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-variation")
        titre = self.T("Monte-t-elle, ou descend-elle ?", 46, JAUNE_TITRE).to_edge(UP, buff=0.55)
        self.play(Write(titre))

        def carte(entete, regle, verdict, couleur, x):
            g = VGroup(
                self.T(entete, 30, couleur),
                self.T(regle, 34, WHITE),
                self.T(verdict, 28, couleur),
            ).arrange(DOWN, buff=0.3)
            cadre = RoundedRectangle(
                corner_radius=0.15,
                width=5.6,
                height=2.5,
                stroke_color=couleur,
                stroke_width=2.5,
                fill_color=couleur,
                fill_opacity=0.07,
            )
            return VGroup(cadre, g.move_to(cadre.get_center())).move_to([x, 0.55, 0])

        a = carte("arithmétique", "r > 0", "elle monte", VERT_OK, -3.55)
        b = carte("arithmétique", "r < 0", "elle descend", ROUGE_ERREUR, 3.55)
        self.play(FadeIn(a, shift=UP * 0.15))
        self.play(FadeIn(b, shift=UP * 0.15))

        # ⛔ Une seule ligne de 28 sortait du cadre des DEUX côtés (planche du
        # 17/09). Deux lignes courtes, et des mots de classe : « la raison q »
        # plutôt que « de premier terme positif ».
        geo = VGroup(
            self.T("Pour une suite géométrique qui part d'un nombre positif :", 26, GRIS_DOUX),
            self.rang(
                self.T("q plus grand que 1", 30, VERT_OK), ": elle monte.",
                self.T("q entre 0 et 1", 30, ROUGE_ERREUR), ": elle descend.",
                font_size=28, buff=0.22,
            ),
        ).arrange(DOWN, buff=0.24).move_to([0, -1.55, 0])
        self.play(FadeIn(geo))
        self.play(Write(self.chute("Le sens se lit sur la raison. Pas besoin de dériver.", color=BLEU_CALCUL)))
        self.attendre_voix()

    # ── défi et correction ──────────────────────────────────────────────────
    def ecran_defi(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-defi")
        titre = self.T("Défi", 52, JAUNE_TITRE).to_edge(UP, buff=0.7)
        self.play(Write(titre))
        consigne = self.T("Arithmétique ou géométrique ? Puis donne le terme général.", 32, JAUNE_TITRE).move_to([0, 2.0, 0])
        self.play(Write(consigne))

        d1 = self.rang("1.", self.u("0", font_size=42), "= 5", "  et  ", self.u("n+1", font_size=42), "=", self.u("n", font_size=42), "+ 4", font_size=42, buff=0.22).move_to([0, 0.75, 0])
        d2 = self.rang("2.", self.u("0", font_size=42), "= 5", "  et  ", self.u("n+1", font_size=42), "= 3", self.u("n", font_size=42), font_size=42, buff=0.22).move_to([0, -0.5, 0])
        self.play(FadeIn(d1, shift=DOWN * 0.2))
        self.play(FadeIn(d2, shift=DOWN * 0.2))
        self.play(FadeIn(self.T("Calcule ensuite u₁₀ pour la première, et v₄ pour la seconde.", 28, GRIS_DOUX).move_to([0, -1.6, 0])))
        self.play(Write(self.chute("Mets pause et cherche !", color=ORANGE_ATTENTION)))
        self.attendre_voix()

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("07-correction")
        titre = self.T("Correction", 52, JAUNE_TITRE).to_edge(UP, buff=0.65)
        self.play(Write(titre))

        c1 = VGroup(
            self.rang("1. on AJOUTE 4 :", self.T("arithmétique", 34, VERT_OK), font_size=34, buff=0.25),
            self.rang(self.u("n", font_size=36), "= 5 + 4n", "  donc  ", self.u("10", font_size=36), "=", self.T("45", 36, VERT_OK), font_size=36, buff=0.2),
        ).arrange(DOWN, buff=0.3).move_to([0, 1.15, 0])

        c2 = VGroup(
            self.rang("2. on MULTIPLIE par 3 :", self.T("géométrique", 34, BLEU_CALCUL), font_size=34, buff=0.25),
            self.rang(self.u("n", font_size=36, lettre="v"), "= 5 ×", self.puissance("3", "n", font_size=36), "  donc  ", self.u("4", font_size=36, lettre="v"), "= 5 × 81 =", self.T("405", 36, BLEU_CALCUL), font_size=36, buff=0.2),
        ).arrange(DOWN, buff=0.3).move_to([0, -0.85, 0])

        self.play(FadeIn(c1, shift=DOWN * 0.15))
        self.play(FadeIn(c2, shift=DOWN * 0.15))
        self.play(Write(self.chute("Quatre ans suffisent à la seconde pour dépasser dix ans de la première.", color=ORANGE_ATTENTION)))
        self.attendre_voix()

    def construct(self):
        self.page_de_garde(
            titre="Les suites : ajouter ou multiplier",
            accroche="+ 30 par an, ou + 12 % par an ?",
            promesse="Celle qui part le plus lentement finit toujours devant.",
        )
        self.page_objectifs([
            "reconnaître une suite arithmétique ou géométrique",
            "MONTRER qu'elle en est une, par le calcul",
            "écrire son terme général, et atteindre un rang lointain",
        ])
        self.ecran_ecritures()
        self.ecran_arithmetique()
        self.ecran_geometrique()
        self.ecran_duel()
        self.ecran_variation()
        self.ecran_defi()
        self.ecran_correction()
        self.page_finale(
            points=[
                "reconnaître : on ajoute, ou on multiplie",
                "montrer : la différence, ou le quotient",
                "écrire le terme général et sauter au rang voulu",
            ],
            rappel="Un pourcentage finit toujours par dépasser une hausse fixe.",
        )
        self.page_abonnement()
