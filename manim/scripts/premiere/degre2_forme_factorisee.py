# degre2_forme_factorisee.py
# EleveAI — Maths 1re (tronc commun, sans spé) et STMG — Le second degré par la
# forme factorisée, AVEC VOIX. SANS discriminant : leur programme n'en a pas.
#
# ⭐ 10/10/2026 : la paysage « équations » de 1re du fil calcul littéral. La 1re
# spé a déjà ses deux vidéos du second degré (15/09) ; celle-ci sert la 1re sans
# spé et la STMG. Voix validée : manim/voix/premiere-degre2-forme-factorisee.json
# (débit −5).
# ⭐ Un fil d'ÉCO du début à la fin (le bénéfice d'une entreprise de vélos) :
# Frédéric, « ils détestent tous les maths » → passer par le graphique et l'éco.
#
# ⭐ LE DESSIN QUI PORTE TOUT : la parabole B(x) = −(x − 2)(x − 8), ses deux
# racines sur l'axe, la zone de bénéfice en VERT et les zones de perte en ROUGE.
#
# Mapping micro-compétences → écrans :
# - quad_racines_factorisee / fct_d2_racines_factorisee → 02-racines
# - quad_lire_racines_courbe                            → 03-parabole
# - quad_signe_tableau / auto_alg_signe_factorisee      → 04-signe
# - quad_inequation / fct_d2_inequation                 → 05-inequation
# - quad_verifier_developpee / fct_d2_verifier_developpee → 06-verifier
# - auto_alg_equation_carre                             → 07-carre
#
# Rendu : python -m manim render -qh --disable_caching manim/scripts/premiere/degre2_forme_factorisee.py Degre2FormeFactorisee1re -o eleveai-maths-premiere-degre2-forme-factorisee --media_dir manim/scripts/premiere/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from manim import *

from charte import *
from gabarit_sixieme import Notion6e

OBJECTIFS = [
    "Lire les racines sur la forme factorisée",
    "Les voir sur la parabole, et trouver le signe",
    "Résoudre une inéquation, et x² = a",
]


class NotionPremiere(Notion6e):
    identite = "Maths 1re et STMG — EleveAI"


class Degre2FormeFactorisee1re(NotionPremiere):
    nom_voix = "premiere-degre2-forme-factorisee"

    def t(self, texte, font_size=36, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def barrer(self, mob, color=ROUGE_ERREUR):
        return Line(mob.get_corner(DL) + LEFT * 0.06, mob.get_corner(UR) + RIGHT * 0.06,
                    stroke_width=5, color=color)

    def repere(self, f, coin=(-3.6, -0.4), x_len=6.0, y_len=4.6, a=1.0):
        ax = Axes(x_range=[0, 10, 1], y_range=[-16, 12, 4], x_length=x_len, y_length=y_len,
                  axis_config={"include_numbers": True, "label_constructor": Text, "font_size": 20},
                  tips=False).move_to([coin[0], coin[1], 0])
        courbe = ax.plot(f, x_range=[0, 10], color=BLEU_CALCUL, stroke_width=4)
        return ax, courbe

    @staticmethod
    def B(x):
        return -(x - 2) * (x - 8)

    # ── 00 ──────────────────────────────────────────────────────────────────

    def page_de_garde(self, voix="00-garde"):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire(voix)
        titre = self.t("Le second degré, forme factorisée", 48, JAUNE_TITRE).to_edge(UP, buff=0.55)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.25)
        q = self.t("Des vélos : quand gagne-t-on de l'argent ?", 40, BLEU_CALCUL).move_to([-0.6, 1.0, 0])
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(q))
        self.au_mot("À partir de combien")
        self.play(FadeIn(self.t("bénéfice ?   perte ?", 44, VERT_OK).move_to([-0.6, -0.1, 0])))
        self.au_mot("une seule écriture")
        self.play(Write(self.t("B(x) = −(x − 2)(x − 8)", 52, JAUNE_TITRE).move_to([-0.6, -1.3, 0])))
        self.attendre_voix()

    # ── 01 ──────────────────────────────────────────────────────────────────

    def ecran_modele(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-modele")
        self.titre_ecran("1. Le modèle")
        self.au_mot("Le bénéfice, en milliers")
        self.play(Write(self.t("B(x) = −(x − 2)(x − 8)", 64, BLEU_CALCUL).move_to([-0.6, 1.6, 0])))
        self.play(FadeIn(self.t("B : bénéfice, en milliers d'euros", 34).move_to([-0.6, 0.5, 0])))
        self.au_mot("x, c'est le nombre")
        self.play(FadeIn(self.t("x : nombre de vélos, en centaines", 34).move_to([-0.6, -0.2, 0])))
        self.au_mot("s'appelle la forme factorisée")
        self.play(Write(self.chute("Un produit de facteurs : la forme factorisée.", color=JAUNE_TITRE)))
        self.attendre_voix()

    # ── 02 ──────────────────────────────────────────────────────────────────

    def ecran_racines(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-racines")
        self.titre_ecran("2. Les racines")
        self.au_mot("B de x égale 0")
        self.play(Write(self.t("−(x − 2)(x − 8) = 0", 56, BLEU_CALCUL).move_to([-0.6, 2.0, 0])))
        self.au_mot("C'est un produit nul")
        self.play(FadeIn(self.t("un produit nul !", 36, JAUNE_TITRE).move_to([-0.6, 1.15, 0])))
        self.au_mot("Donc x moins 2")
        self.play(FadeIn(self.t("x − 2 = 0   ou   x − 8 = 0", 46).move_to([-0.6, 0.3, 0])))
        self.au_mot("x égale 2, ou")
        self.play(FadeIn(self.t("x = 2   ou   x = 8", 52, VERT_OK).move_to([-0.6, -0.6, 0])))
        self.au_mot("les racines")
        self.play(FadeIn(self.t("les racines", 34, VERT_OK).move_to([-0.6, -1.3, 0])))
        self.au_mot("À 200 vélos")
        self.play(Write(self.chute("200 ou 800 vélos : ni gain, ni perte.", color=JAUNE_TITRE)))
        self.attendre_voix()

    # ── 03 ──────────────────────────────────────────────────────────────────

    def ecran_parabole(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-parabole")
        self.titre_ecran("3. Sur la parabole")
        ax, c = self.repere(self.B)
        self.play(Create(ax))
        self.play(Create(c), run_time=1.5)
        self.au_mot("les points où elle coupe")
        p2 = Dot(ax.c2p(2, 0), color=VERT_OK, radius=0.11)
        p8 = Dot(ax.c2p(8, 0), color=VERT_OK, radius=0.11)
        self.play(FadeIn(p2, scale=0.4), FadeIn(p8, scale=0.4), Flash(p2, color=VERT_OK), Flash(p8, color=VERT_OK))
        self.play(FadeIn(self.t("racines : 2 et 8", 40, VERT_OK).move_to([3.4, 1.4, 0])))
        self.au_mot("Le signe moins")
        self.play(FadeIn(self.t("le « − » devant :", 34, ORANGE_RETENUE).move_to([3.4, 0.4, 0])),
                  FadeIn(self.t("parabole vers le bas", 34, ORANGE_RETENUE).move_to([3.4, -0.2, 0])))
        self.attendre_voix()

    # ── 04 ──────────────────────────────────────────────────────────────────

    def tableau_signes(self, racines, signes, y=-2.3, x0=-3.4, w=7.4):
        """Une ligne x, une ligne signe. racines : textes ; signes : 5 textes."""
        cadre = Rectangle(width=w, height=1.2, color=WHITE, stroke_width=2).move_to([x0 + w / 2 - 0.9, y, 0])
        milieu = Line(cadre.get_left() + [0, 0, 0], cadre.get_right(), stroke_width=2)
        col = Line(cadre.get_top() + LEFT * (w / 2 - 1.6), cadre.get_bottom() + LEFT * (w / 2 - 1.6), stroke_width=2)
        tx = self.t("x", 28).move_to([cadre.get_left()[0] + 0.8, y + 0.3, 0])
        ts = self.t("B(x)", 28).move_to([cadre.get_left()[0] + 0.8, y - 0.3, 0])
        xs = [cadre.get_left()[0] + 1.6 + (w - 1.6) * k / 6 for k in range(1, 6)]
        ligne_x = VGroup(self.t("0", 26).move_to([xs[0] - 0.55, y + 0.3, 0]),
                         self.t(racines[0], 26).move_to([xs[1], y + 0.3, 0]),
                         self.t(racines[1], 26).move_to([xs[3], y + 0.3, 0]),
                         self.t("10", 26).move_to([xs[4] + 0.55, y + 0.3, 0]))
        couleurs = {"−": ROUGE_ERREUR, "+": VERT_OK, "0": WHITE}
        ligne_s = VGroup(*[self.t(s, 30, couleurs[s]).move_to([x, y - 0.3, 0]) for s, x in zip(signes, xs)])
        return VGroup(cadre, milieu, col, tx, ts, ligne_x), ligne_s

    def ecran_signe(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-signe")
        self.titre_ecran("4. Le signe")
        ax, c = self.repere(self.B, coin=(-3.0, 0.6), y_len=3.8)
        self.add(ax, c)
        self.au_mot("Entre 2 et 8")
        vert = ax.get_area(c, x_range=[2, 8], color=VERT_OK, opacity=0.45)
        self.play(FadeIn(vert))
        self.play(FadeIn(self.t("bénéfice : B(x) > 0", 34, VERT_OK).move_to([3.6, 1.4, 0])))
        self.au_mot("Avant 2")
        rouge = VGroup(ax.get_area(c, x_range=[0, 2], color=ROUGE_ERREUR, opacity=0.45),
                       ax.get_area(c, x_range=[8, 10], color=ROUGE_ERREUR, opacity=0.45))
        self.play(FadeIn(rouge))
        self.play(FadeIn(self.t("perte : B(x) < 0", 34, ROUGE_ERREUR).move_to([3.6, 0.6, 0])))
        self.au_mot("Le tableau de signes")
        cadre, signes = self.tableau_signes(["2", "8"], ["−", "0", "+", "0", "−"])
        self.play(Create(cadre))
        self.play(LaggedStart(*[FadeIn(s) for s in signes], lag_ratio=0.25))
        self.attendre_voix()

    # ── 05 ──────────────────────────────────────────────────────────────────

    def ecran_inequation(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-inequation")
        self.titre_ecran("5. Résoudre une inéquation")
        self.au_mot("On résout l'inéquation")
        self.play(Write(self.t("B(x) > 0", 70, BLEU_CALCUL).move_to([-0.6, 1.9, 0])))
        cadre, signes = self.tableau_signes(["2", "8"], ["−", "0", "+", "0", "−"], y=0.4)
        self.play(FadeIn(cadre), FadeIn(signes))
        self.au_mot("On lit la réponse")
        self.play(Indicate(signes[2], color=VERT_OK, scale_factor=1.8))
        self.au_mot("x entre 2 et 8")
        self.play(Write(self.t("2 < x < 8", 64, VERT_OK).move_to([-0.6, -1.15, 0])))
        self.au_mot("Entre 200 et 800")
        self.play(Write(self.chute("Bénéfice entre 200 et 800 vélos.", color=VERT_OK, font_size=36)))
        self.attendre_voix()

    # ── 06 ──────────────────────────────────────────────────────────────────

    def ecran_verifier(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-verifier")
        self.titre_ecran("6. Vérifier en développant")
        self.au_mot("x moins 2, fois")
        self.play(Write(self.t("(x − 2)(x − 8)", 52, BLEU_CALCUL).move_to([-0.6, 2.0, 0])))
        self.au_mot("x au carré, moins 8 x")
        self.play(FadeIn(self.t("= x² − 8x − 2x + 16", 46).move_to([-0.6, 1.1, 0])))
        self.au_mot("Donc x au carré moins 10")
        self.play(FadeIn(self.t("= x² − 10x + 16", 46).move_to([-0.6, 0.2, 0])))
        self.au_mot("Avec le signe moins devant")
        self.play(Write(self.t("B(x) = −x² + 10x − 16", 52, VERT_OK).move_to([-0.6, -0.9, 0])))
        self.au_mot("C'est la forme développée")
        self.play(Write(self.chute("La forme développée.", color=JAUNE_TITRE, font_size=36)))
        self.attendre_voix()

    # ── 07 ──────────────────────────────────────────────────────────────────

    def ecran_carre(self):
        self.clear()
        self.add_mascotte()
        self.dire("07-carre")
        self.titre_ecran("7. Un automatisme : x² = a")
        self.au_mot("x au carré égale 49")
        self.play(Write(self.t("x² = 49", 60, BLEU_CALCUL).move_to([-3.8, 1.6, 0])))
        self.au_mot("Deux solutions")
        self.play(FadeIn(self.t("x = 7  ou  x = −7", 44, VERT_OK).move_to([2.0, 1.6, 0])))
        self.au_mot("car moins 7 au carré")
        self.play(FadeIn(self.t("car (−7)² = 49", 34, GRAY_B).move_to([2.0, 0.95, 0])))
        self.au_mot("x au carré égale 0")
        self.play(FadeIn(self.t("x² = 0", 52, BLEU_CALCUL).move_to([-3.8, 0.0, 0])),
                  FadeIn(self.t("une seule solution : 0", 40).move_to([2.0, 0.0, 0])))
        self.au_mot("x au carré égale moins 1")
        self.play(FadeIn(self.t("x² = −1", 52, BLEU_CALCUL).move_to([-3.8, -1.3, 0])),
                  FadeIn(self.t("aucune solution", 40, ORANGE_RETENUE).move_to([2.0, -1.3, 0])))
        self.attendre_voix()

    # ── 08 ──────────────────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        self.au_mot("Une autre entreprise")
        self.play(FadeIn(self.t("B(x) = −3(x − 1)(x − 5)", 64, BLEU_CALCUL).move_to([-0.6, 1.0, 0])))
        self.au_mot("Pour quelles valeurs")
        self.play(FadeIn(self.t("Pour quels x le bénéfice est-il positif ?", 40).move_to([-0.6, -0.3, 0])))
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=36)))
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("08b-correction")
        self.titre_ecran("Correction")
        self.au_mot("Les racines")
        self.play(FadeIn(self.t("racines :  1  et  5", 46, VERT_OK).move_to([-3.4, 2.0, 0])))
        self.au_mot("moins 3, est négatif")
        self.play(FadeIn(self.t("−3 < 0 : parabole vers le bas", 34, ORANGE_RETENUE).move_to([-3.4, 1.2, 0])))
        f = lambda x: -3 * (x - 1) * (x - 5) / 1.5
        ax = Axes(x_range=[0, 6, 1], y_range=[-8, 8, 4], x_length=4.2, y_length=3.0,
                  axis_config={"include_numbers": True, "label_constructor": Text, "font_size": 18},
                  tips=False).move_to([3.2, 0.6, 0])
        c = ax.plot(f, x_range=[0, 6], color=BLEU_CALCUL, stroke_width=4)
        self.play(Create(ax), Create(c))
        self.au_mot("au-dessus de l'axe entre")
        self.play(FadeIn(ax.get_area(c, x_range=[1, 5], color=VERT_OK, opacity=0.45)))
        self.au_mot("Le bénéfice est positif")
        self.play(Write(self.t("B(x) > 0  pour  1 < x < 5", 46, VERT_OK).move_to([-0.6, -1.6, 0])))
        self.attendre_voix()

    def construct(self):
        self.page_de_garde()
        self.page_objectifs(OBJECTIFS)
        self.ecran_modele()
        self.ecran_racines()
        self.ecran_parabole()
        self.ecran_signe()
        self.ecran_inequation()
        self.ecran_verifier()
        self.ecran_carre()
        self.ecran_defi()
        self.ecran_correction()
        self.page_finale(
            points=[
                "Forme factorisée : on annule chaque facteur",
                "Les racines : où la parabole coupe l'axe",
                "Le signe du nombre devant donne le tableau",
            ],
            rappel="Piège : x² = 49 a DEUX solutions, 7 et −7.",
            voix="09-finale",
        )
        self.page_abonnement(voix="10-abonne")
