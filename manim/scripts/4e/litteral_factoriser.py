# litteral_factoriser.py
# EleveAI — Maths 4e (identités en 3e) — Factoriser (notion litteral_factorisation), AVEC VOIX.
# ⭐ 12/10/2026 : paysage 3 du fil « calcul littéral ». Même dessin que « Développer »
# (le rectangle découpé), lu à l'envers. Voix validée : manim/voix/4e-litteral-factoriser.json
# (débit −7). Ouverture SANS « Les maths, ça sert à rien… » (son doute du 12/10).
#
# Mapping : litteral_facteur_commun → 02 ; litteral_factoriser_simple → 03 ;
# litteral_factoriser_verifier → 04 ; 3e litteral_identite → 05, 06 ; défi → 07.
#
# Rendu : python -m manim render -qh --disable_caching manim/scripts/4e/litteral_factoriser.py LitteralFactoriser4e -o eleveai-maths-4e-litteral-factoriser --media_dir manim/scripts/4e/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parent))

from manim import *

from charte import *
from litteral_developper import LitteralDevelopper4e

OBJECTIFS = [
    "Repérer un facteur commun et factoriser",
    "Vérifier une factorisation en développant",
    "En 3e : factoriser avec les identités remarquables",
]


class LitteralFactoriser4e(LitteralDevelopper4e):
    nom_voix = "4e-litteral-factoriser"

    def page_de_garde(self, voix="00-garde"):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire(voix)
        titre = self.t("Factoriser", 56, JAUNE_TITRE).to_edge(UP, buff=0.6)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.25)
        q = self.t("6x + 15 = ?  ×  (  ?  )", 72, BLEU_CALCUL).move_to([-0.6, 0.4, 0])
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(q))
        self.au_mot("faire le chemin à l'envers")
        self.play(FadeIn(self.t("le chemin à l'envers", 36, ORANGE_RETENUE).move_to([-0.6, -0.8, 0])))
        self.au_mot("C'est ça, factoriser")
        self.play(Write(self.chute("C'est ça, factoriser.", color=VERT_OK, font_size=36)))
        self.attendre_voix()

    def ecran_retour(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-retour")
        self.titre_ecran("1. Le chemin retour")
        self.au_mot("Développer, c'est passer")
        self.play(FadeIn(self.t("développer :  3(2x + 5)  →  6x + 15", 38).move_to([-0.6, 2.0, 0])))
        self.au_mot("Factoriser, c'est le chemin retour")
        self.play(FadeIn(self.t("factoriser :  6x + 15  →  3(2x + 5)", 38, VERT_OK).move_to([-0.6, 1.25, 0])))
        self.au_mot("Sur le rectangle découpé")
        cases, etiq = self.grille([("?", 2.6), ("?", 1.4)], [("?", 1.4)], coin=(-3.6, 0.2))
        self.montrer_grille(cases, etiq)
        self.play(FadeIn(self.remplir(cases[0][0], "6x", BLEU_CALCUL)), FadeIn(self.remplir(cases[0][1], "15", ORANGE_RETENUE)))
        self.au_mot("on cherche la hauteur commune")
        self.play(Indicate(etiq[-1], color=JAUNE_TITRE, scale_factor=1.8))
        self.attendre_voix()

    def ecran_facteur(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-facteur")
        self.titre_ecran("2. Le facteur commun")
        self.au_mot("qu'ont en commun")
        self.play(FadeIn(self.t("6x + 15", 64, BLEU_CALCUL).move_to([-0.6, 2.0, 0])))
        self.au_mot("6, c'est 3 fois 2")
        self.play(FadeIn(self.t("6x = 3 × 2x", 44).move_to([-3.2, 1.0, 0])))
        self.au_mot("15, c'est 3 fois 5")
        self.play(FadeIn(self.t("15 = 3 × 5", 44).move_to([2.0, 1.0, 0])))
        self.au_mot("c'est le facteur commun")
        self.play(FadeIn(self.t("facteur commun : 3", 40, JAUNE_TITRE).move_to([-0.6, 0.1, 0])))
        self.au_mot("On le sort devant")
        cases, etiq = self.grille([("2x", 2.6), ("5", 1.4)], [("3", 1.2)], coin=(-3.6, -0.7))
        self.montrer_grille(cases, etiq)
        self.play(FadeIn(self.remplir(cases[0][0], "6x", BLEU_CALCUL)), FadeIn(self.remplir(cases[0][1], "15", ORANGE_RETENUE)))
        self.play(Write(self.t("= 3(2x + 5)", 52, VERT_OK).move_to([3.3, -1.3, 0])))
        self.attendre_voix()

    def ecran_lettre(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-lettre")
        self.titre_ecran("3. Une lettre en facteur commun")
        self.au_mot("x au carré plus 4 x")
        self.play(FadeIn(self.t("x² + 4x", 64, BLEU_CALCUL).move_to([-0.6, 1.9, 0])))
        self.au_mot("x au carré, c'est x fois x")
        self.play(FadeIn(self.t("x² = x × x", 44).move_to([-3.2, 0.8, 0])))
        self.au_mot("4 x, c'est 4 fois x")
        self.play(FadeIn(self.t("4x = 4 × x", 44).move_to([2.0, 0.8, 0])))
        self.au_mot("Le x est dans les deux")
        self.play(Write(self.t("x² + 4x = x(x + 4)", 58, VERT_OK).move_to([-0.6, -0.5, 0])))
        self.attendre_voix()

    def ecran_verifier(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-verifier")
        self.titre_ecran("4. Vérifier en développant")
        self.au_mot("3 fois, parenthèse, 2 x plus 5 :")
        self.play(FadeIn(self.t("3(2x + 5) = 6x + 15", 50, VERT_OK).move_to([-1.4, 1.6, 0])))
        self.au_mot("On retrouve")
        self.play(FadeIn(self.coche().move_to([3.4, 1.6, 0])))
        self.au_mot("Le piège")
        faux = self.t("3(2x + 15)", 50, ORANGE_RETENUE).move_to([-3.0, 0.0, 0])
        self.play(FadeIn(faux))
        self.au_mot("tu trouves 6 x plus 45")
        self.play(FadeIn(self.t("= 6x + 45", 50, ROUGE_ERREUR).move_to([1.2, 0.0, 0])), Create(self.barrer(faux)))
        self.au_mot("Ce n'est pas l'expression")
        self.play(Write(self.chute("6x + 45 ≠ 6x + 15 : la factorisation est fausse.", color=ORANGE_RETENUE)))
        self.attendre_voix()

    def ecran_identite(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-identite")
        self.titre_ecran("5. En 3e : les identités, à l'envers")
        self.au_mot("x au carré moins 9")
        self.play(FadeIn(self.t("x² − 9", 64, BLEU_CALCUL).move_to([-0.6, 2.0, 0])))
        self.au_mot("x au carré moins 3 au carré")
        self.play(FadeIn(self.t("= x² − 3²   (différence de deux carrés)", 38).move_to([-0.6, 1.1, 0])))
        self.au_mot("Elle se factorise")
        self.play(Write(self.t("= (x − 3)(x + 3)", 58, VERT_OK).move_to([-0.6, 0.1, 0])))
        self.au_mot("Vérifions")
        self.play(FadeIn(self.t("x² + 3x − 3x − 9 = x² − 9", 40).move_to([-0.6, -1.0, 0])))
        self.au_mot("Le milieu disparaît")
        self.play(FadeIn(self.coche().move_to([3.6, -1.0, 0])))
        self.attendre_voix()

    def ecran_carre(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-carre")
        self.titre_ecran("6. Le carré d'une somme")
        self.au_mot("Et x au carré plus 6 x")
        self.play(FadeIn(self.t("x² + 6x + 9", 64, BLEU_CALCUL).move_to([-0.6, 1.9, 0])))
        self.au_mot("On reconnaît")
        self.play(FadeIn(self.t("= x² + 2 × x × 3 + 3²", 46).move_to([-0.6, 0.8, 0])))
        self.au_mot("Donc x au carré")
        self.play(Write(self.t("= (x + 3)²", 64, VERT_OK).move_to([-0.6, -0.4, 0])))
        self.attendre_voix()

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        self.au_mot("Factorise")
        self.play(GrowFromCenter(self.t("25 − x²", 100, BLEU_CALCUL).move_to([-0.6, 1.0, 0])))
        self.au_mot("Attention à l'ordre")
        self.play(FadeIn(self.t("attention à l'ordre !", 40, ORANGE_RETENUE).move_to([-0.6, -0.4, 0])))
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=36)))
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("07b-correction")
        self.titre_ecran("Correction")
        self.au_mot("25, c'est 5 au carré")
        self.play(FadeIn(self.t("25 − x² = 5² − x²", 50).move_to([-0.6, 1.9, 0])))
        self.au_mot("Une différence de deux carrés")
        self.play(Write(self.t("= (5 − x)(5 + x)", 58, VERT_OK).move_to([-0.6, 0.8, 0])))
        self.au_mot("Le piège")
        faux = self.t("(x − 5)(x + 5)", 46, ORANGE_RETENUE).move_to([-0.6, -0.4, 0])
        self.play(FadeIn(faux), Create(self.barrer(faux)))
        self.au_mot("Ça donne x au carré moins 25")
        self.play(FadeIn(self.t("= x² − 25 : signe inversé", 36, ROUGE_ERREUR).move_to([-0.6, -1.3, 0])))
        self.attendre_voix()

    def construct(self):
        self.page_de_garde()
        self.page_objectifs(OBJECTIFS)
        self.ecran_retour()
        self.ecran_facteur()
        self.ecran_lettre()
        self.ecran_verifier()
        self.ecran_identite()
        self.ecran_carre()
        self.ecran_defi()
        self.ecran_correction()
        self.page_finale(
            points=[
                "Factoriser : le chemin retour du développement",
                "On sort le facteur commun devant la parenthèse",
                "On vérifie toujours en redéveloppant",
            ],
            rappel="Piège : 25 − x² = (5 − x)(5 + x), pas (x − 5)(x + 5).",
            voix="08-finale",
        )
        self.page_abonnement(voix="09-abonne")
