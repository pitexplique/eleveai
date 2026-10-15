# pourcentages_calcul_mental.py
# EleveAI — « Les bases » — Les pourcentages de tête : la leçon paysage.
#
# ⭐ 30/09/2026 — demandée par Frédéric « pour mes quatrièmes », avec le short
# `pourcentages_calcul_mental_short.py` qui renverra vers elle. SA méthode de
# classe : tout part de 10 % (enlever un 0, ou décaler la virgule), puis ×2, ×3
# pour 20 et 30 %, ÷2 pour 5 %, puis réduction (on enlève) et augmentation (on
# ajoute). Le script de la voix lui a été montré avant ce fichier.
# ⛔ AUCUNE ÉTIQUETTE DE NIVEAU (série « Les bases »).
#
# ⭐ L'OBJET QUI PORTE LA LEÇON : UNE BARRE DE 10 CASES DE 8 €. 80 €, c'est 10
# cases ; une case, c'est 10 %. 20 % = 2 cases, 5 % = une DEMI-case, 50 % = la
# moitié de la barre, −30 % = 3 cases qu'on retire, +10 % = une case qu'on ajoute.
# Le calcul mental devient quelque chose qu'on VOIT, écran après écran.
#
# ⭐ LA SYNCHRO SE LIT DANS LE TEXTE : `au("fragment")` attend l'instant où la voix
# prononce ce fragment, estimé à sa position dans la phrase (le débit de Julie
# est régulier). Régénérer une voix ne décale donc rien à la main.
#
# Voix : powershell -File scripts/generer-voix.ps1 -Fichier manim/voix/bases-pourcentages-calcul-mental.json -Debit -4
# Rendu :
#   python -m manim render -qh --disable_caching manim/scripts/bases/pourcentages_calcul_mental.py PourcentagesCalculMental -o eleveai-maths-bases-pourcentages-calcul-mental --media_dir manim/scripts/bases/media

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from manim import *

from charte import *
from gabarit_bases import NotionBases
from gabarit_seconde import SONS

NOM = "bases-pourcentages-calcul-mental"
TEXTES = json.loads((Path(__file__).resolve().parents[2] / "voix" / f"{NOM}.json").read_text(encoding="utf-8"))

CASE = 0.95      # largeur d'une case de la barre
HAUT = 0.85      # hauteur de la barre
GRIS = "#2B2B2B"


class PourcentagesCalculMental(NotionBases):

    dossier_voix = SONS / NOM

    # ── la synchro ──────────────────────────────────────────────────────────

    def dire(self, nom, dossier=None):
        duree = super().dire(nom, dossier)
        self._nom, self._t0, self._duree = nom, self.renderer.time, duree
        return duree

    def au(self, fragment):
        """Attend que la voix arrive à `fragment` (position dans la phrase)."""
        texte = TEXTES[self._nom]
        i = texte.index(fragment)
        t = self._t0 + i / len(texte) * self._duree
        attente = t - self.renderer.time
        if attente > 0.05:
            self.wait(attente)

    # ── les briques ─────────────────────────────────────────────────────────

    def etiquette(self, prix, centre=ORIGIN, largeur=2.6, hauteur=1.2, font_size=64):
        """Une étiquette de prix DESSINÉE : un rectangle à pointe, et son trou."""
        l, h = largeur, hauteur
        forme = Polygon(
            [-l / 2, h / 2, 0], [l / 2, h / 2, 0], [l / 2, -h / 2, 0],
            [-l / 2, -h / 2, 0], [-l / 2 - 0.5, 0, 0],
            color=WHITE, stroke_width=4, fill_color=GRIS, fill_opacity=1,
        )
        trou = Circle(radius=0.1, color=WHITE, stroke_width=3).move_to([-l / 2 - 0.1, 0, 0])
        p = Text(prix, font_size=font_size, color=WHITE).move_to([0.15, 0, 0])
        return VGroup(forme, trou, p).move_to(centre)

    def barre(self, n=10, valeur="8 €", gauche=-4.75, y=1.3, font_size=24):
        """La barre de `n` cases : le prix entier, découpé en dixièmes."""
        cases = VGroup()
        for k in range(n):
            r = Rectangle(width=CASE, height=HAUT, color=WHITE, stroke_width=2.5,
                          fill_color=GRIS, fill_opacity=1)
            r.move_to([gauche + CASE * (k + 0.5), y, 0])
            t = Text(valeur, font_size=font_size, color=WHITE).move_to(r)
            cases.add(VGroup(r, t))
        return cases

    def colorier(self, cases, couleur, opacite=0.9):
        return [c[0].animate.set_fill(couleur, opacity=opacite) for c in cases]

    def ligne(self, texte, y, couleur=WHITE, font_size=40):
        t = Text(texte, font_size=font_size, color=couleur)
        if t.width > 11.0:
            t.scale_to_fit_width(11.0)
        return t.move_to([-0.4, y, 0])

    # ── 01 · pourquoi 10 %, c'est diviser par 10 ────────────────────────────

    def ecran_pourquoi(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-pourquoi")
        self.titre_ecran("Pourquoi 10 %, c'est facile")

        # La grille de 100 : 10 carrés coloriés = une colonne = 1 part sur 10.
        pas, cote = 0.36, 0.3
        grille = VGroup(*[
            Square(side_length=cote, stroke_width=0, fill_color=GRIS, fill_opacity=1)
            .move_to([-4.6 + (k % 10) * pas, -1.9 + (k // 10) * pas, 0])
            for k in range(100)
        ])
        self.play(FadeIn(grille), run_time=0.6)

        self.au("Pour cent veut dire")
        l1 = self.ligne("pour cent  =  sur 100", 1.4, BLEU_CALCUL).shift(RIGHT * 2.4)
        self.play(FadeIn(l1))
        self.au("10 pour cent, c'est donc")
        dix = VGroup(*[grille[k * 10] for k in range(10)])
        self.play(*self.colorier(dix, BLEU_CALCUL), run_time=0.8)
        f1 = VGroup(Text("10 %  =", font_size=40, color=WHITE),
                    self.fraction(10, 100, font_size=40, color=BLEU_CALCUL)).arrange(RIGHT, buff=0.3)
        f1.move_to([2.0, 0.1, 0])
        self.play(FadeIn(f1))
        self.au("c'est pareil que 1 sur 10")
        f2 = VGroup(Text("=", font_size=40, color=WHITE),
                    self.fraction(1, 10, font_size=40, color=VERT_OK)).arrange(RIGHT, buff=0.3)
        f2.next_to(f1, RIGHT, buff=0.3)
        self.play(FadeIn(f2))
        self.au("Autrement dit")
        regle = Text("10 %  =  diviser par 10", font_size=44, color=JAUNE_TITRE).move_to([1.9, -1.5, 0])
        cadre = SurroundingRectangle(regle, color=JAUNE_TITRE, buff=0.22, stroke_width=3)
        self.play(Write(regle), Create(cadre))
        self.attendre_voix()

    # ── 02 · on enlève un zéro ──────────────────────────────────────────────

    def nombre_barre(self, avant, y):
        """« 80 » écrit avec son dernier 0 en rouge, prêt à être barré."""
        a = Text(avant, font_size=54, color=WHITE)
        z = Text("0", font_size=54, color=ROUGE_ERREUR)
        return VGroup(a, z).arrange(RIGHT, buff=0.04, aligned_edge=DOWN).move_to([-3.2, y, 0])

    def ecran_zero(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-zero")
        self.titre_ecran("Un zéro à la fin ? On l'enlève")

        exemples = [("8", "8", "10 pour cent de 80"), ("25", "25", "10 pour cent de 250"),
                    ("1 20", "120", "10 pour cent de 1 200")]
        for i, (avant, res, frag) in enumerate(exemples):
            y = 1.5 - i * 1.35
            self.au(frag)
            pre = Text("10 % de", font_size=36, color=BLEU_CALCUL).move_to([-5.3, y, 0])
            # VU AU RENDU : centré à x fixe, « 1 200 » mordait sur « 10 % de ».
            n = self.nombre_barre(avant, y).next_to(pre, RIGHT, buff=0.4)
            self.play(FadeIn(pre), FadeIn(n), run_time=0.5)
            barre = Line(n[1].get_corner(DL) + DL * 0.05, n[1].get_corner(UR) + UR * 0.05,
                         color=ROUGE_ERREUR, stroke_width=6)
            self.play(Create(barre), run_time=0.4)
            r = Text(f"=  {res}", font_size=54, color=VERT_OK).next_to(n, RIGHT, buff=0.7)
            self.play(FadeIn(r, shift=RIGHT * 0.15), run_time=0.4)

        self.au("On enlève un zéro, un seul")
        self.play(Write(self.chute("un zéro, un seul", color=JAUNE_TITRE, font_size=36)))
        self.attendre_voix()

    # ── 03 · pas de zéro ? on décale la virgule ─────────────────────────────

    def ecran_virgule(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-virgule")
        self.titre_ecran("Pas de zéro ? On décale la virgule")

        # 45,0 : les chiffres restent en place, la VIRGULE recule d'un rang.
        y = 1.35
        quatre = Text("4", font_size=110, color=WHITE).move_to([-1.3, y, 0])
        cinq = Text("5", font_size=110, color=WHITE).move_to([-0.35, y, 0])
        virg = Text(",", font_size=110, color=ORANGE_RETENUE).move_to([0.3, y - 0.4, 0])
        zero = Text("0", font_size=110, color=GREY_B).move_to([0.95, y, 0])
        self.au("45, c'est")
        pre = Text("10 % de", font_size=40, color=BLEU_CALCUL).move_to([-4.2, y, 0])
        self.play(FadeIn(pre), FadeIn(quatre), FadeIn(cinq), FadeIn(virg), FadeIn(zero))
        self.au("On décale : 4")
        fleche = CurvedArrow([0.3, y - 0.95, 0], [-0.85, y - 0.95, 0], color=ORANGE_RETENUE, angle=-PI / 2.5)
        self.play(Create(fleche), run_time=0.5)
        self.play(virg.animate.move_to([-0.82, y - 0.4, 0]),
                  quatre.animate.move_to([-1.55, y, 0]),
                  cinq.animate.move_to([-0.1, y, 0]),
                  FadeOut(zero), run_time=1.0)
        self.play(FadeOut(fleche), run_time=0.3)
        self.au("c'est 4 euros 50")
        r = Text("=  4,50 €", font_size=60, color=VERT_OK).move_to([2.9, y, 0])
        self.play(FadeIn(r, shift=RIGHT * 0.15))

        self.au("10 pour cent de 7 euros")
        l2 = self.ligne("10 % de 7 €   =   0,7 €   =   70 centimes", -0.6)
        self.play(FadeIn(l2))
        self.au("Et 10 pour cent de 12")
        l3 = self.ligne("10 % de 12,5   =   1,25", -1.6)
        self.play(FadeIn(l3))
        self.attendre_voix()

    # ── 04 + 05 · la barre de 80 € : ×2, ×3, ×4, puis ÷2 ────────────────────

    def ecrans_barre(self):
        self.clear()
        self.add_mascotte()

        # 04 · les multiples
        self.dire("04-multiples")
        t = self.titre_ecran("Tu as 10 % ? Tu as tout le reste")
        cases = self.barre()
        prix = Text("80 €", font_size=36, color=JAUNE_TITRE).next_to(cases, LEFT, buff=0.35)
        self.au("Reprenons 80 euros")
        self.play(LaggedStart(*[FadeIn(c) for c in cases], lag_ratio=0.06), FadeIn(prix), run_time=1.0)
        accolade = Brace(cases[0], DOWN, color=BLEU_CALCUL)
        dix = Text("10 %", font_size=28, color=BLEU_CALCUL).next_to(accolade, DOWN, buff=0.1)
        self.play(*self.colorier([cases[0]], BLEU_CALCUL), GrowFromCenter(accolade), FadeIn(dix))

        lignes = [
            ("20 pour cent, c'est deux fois", 2, "20 %  =  2 × 8  =  16 €"),
            ("30 pour cent, trois fois", 3, "30 %  =  3 × 8  =  24 €"),
            ("Et 40 pour cent", 4, "40 %  =  4 × 8  =  32 €"),
        ]
        courant = None
        for frag, k, texte in lignes:
            self.au(frag)
            l = self.ligne(texte, -1.0, WHITE, font_size=44)
            anims = self.colorier(cases[:k], BLEU_CALCUL)
            if courant is None:
                self.play(*anims, FadeIn(l), run_time=0.7)
            else:
                self.play(*anims, ReplacementTransform(courant, l), run_time=0.7)
            courant = l
        self.attendre_voix(marge=0.4)

        # 05 · les moitiés — la barre reste, on la remet en gris
        self.dire("05-moities")
        t2 = Text("On divise par 2", font_size=40, color=JAUNE_TITRE).to_edge(UP)
        self.play(ReplacementTransform(t, t2), FadeOut(courant),
                  *[c[0].animate.set_fill(GRIS, opacity=1) for c in cases], run_time=0.6)
        # 5 % : une DEMI-case
        self.au("5 pour cent, c'est la moitié")
        demi = Rectangle(width=CASE / 2, height=HAUT, stroke_width=0, fill_color=VERT_OK, fill_opacity=0.9)
        demi.align_to(cases[0][0], LEFT).align_to(cases[0][0], DOWN)
        pointilles = DashedLine(cases[0][0].get_top(), cases[0][0].get_bottom(), color=WHITE, dash_length=0.08)
        self.add(demi, cases[0][1])
        self.play(FadeIn(demi), Create(pointilles))
        l = self.ligne("5 %  =  8 ÷ 2  =  4 €", -1.0, WHITE, font_size=44)
        self.play(FadeIn(l))
        # 50 % : la moitié de la barre
        self.au("Et 50 pour cent")
        l50 = self.ligne("50 %  =  80 ÷ 2  =  40 €", -1.0, WHITE, font_size=44)
        self.play(FadeOut(demi), FadeOut(pointilles), *self.colorier(cases[:5], VERT_OK),
                  ReplacementTransform(l, l50), run_time=0.8)
        # 15 % = 10 % + 5 %
        self.au("Bonus")
        demi2 = demi.copy().align_to(cases[1][0], LEFT)
        pointilles2 = DashedLine(cases[1][0].get_top(), cases[1][0].get_bottom(), color=WHITE, dash_length=0.08)
        self.play(*[c[0].animate.set_fill(GRIS, opacity=1) for c in cases[1:5]], run_time=0.5)
        self.add(demi2, cases[1][1])
        self.play(FadeIn(demi2), Create(pointilles2), run_time=0.5)
        l15 = self.ligne("15 %  =  10 % + 5 %  =  8 + 4  =  12 €", -1.0, ORANGE_RETENUE, font_size=44)
        self.play(ReplacementTransform(l50, l15))
        self.attendre_voix()

    # ── 06 · réduction : on enlève des cases ────────────────────────────────

    def ecran_reduction(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-reduction")
        self.titre_ecran("Réduction : on ENLÈVE")
        cases = self.barre()
        prix = Text("80 €", font_size=36, color=JAUNE_TITRE).next_to(cases, LEFT, buff=0.35)
        self.play(FadeIn(cases), FadeIn(prix), run_time=0.6)

        self.au("Moins 10 pour cent")
        self.play(*self.colorier([cases[9]], ROUGE_ERREUR))
        l1 = self.ligne("−10 % :   80 − 8  =  72 €", -0.3, WHITE, font_size=44)
        self.au("et on paie")
        self.play(FadeIn(l1), cases[9].animate.set_opacity(0.25))

        self.au("Et notre jean")
        self.play(cases[9].animate.set_opacity(1))
        self.play(*self.colorier(cases[7:], ROUGE_ERREUR))
        self.au("On paie 80 moins 24")
        l2 = self.ligne("−30 % :   80 − 24  =  56 €", -1.5, WHITE, font_size=44)
        cadre = SurroundingRectangle(l2, color=JAUNE_TITRE, buff=0.2, stroke_width=4)
        self.play(FadeIn(l2), cases[7:].animate.set_opacity(0.25))
        accolade = Brace(cases[:7], UP, color=VERT_OK)
        reste = Text("56 €", font_size=30, color=VERT_OK).next_to(accolade, UP, buff=0.1)
        self.play(Create(cadre), GrowFromCenter(accolade), FadeIn(reste))
        self.attendre_voix()

    # ── 07 · augmentation : on ajoute une case ──────────────────────────────

    def ecran_augmentation(self):
        self.clear()
        self.add_mascotte()
        self.dire("07-augmentation")
        self.titre_ecran("Augmentation : on AJOUTE")
        cases = self.barre(gauche=-5.3)
        prix = Text("80 €", font_size=30, color=JAUNE_TITRE).next_to(cases, UP, buff=0.25)
        self.play(FadeIn(cases), FadeIn(prix), run_time=0.6)

        self.au("80 plus 8")
        onze = self.barre(n=1, gauche=-5.3 + 10 * CASE)[0]
        onze[0].set_fill(VERT_OK, opacity=0.9)
        self.play(FadeIn(onze, shift=LEFT * 0.4))
        l1 = self.ligne("+10 % :   80 + 8  =  88 €", -0.3, WHITE, font_size=44)
        self.play(FadeIn(l1))

        self.au("Et s'il augmente de 5")
        demi = Rectangle(width=CASE / 2, height=HAUT, color=WHITE, stroke_width=2.5,
                         fill_color=VERT_OK, fill_opacity=0.9).align_to(onze[0], LEFT).align_to(onze[0], DOWN)
        quatre = Text("4 €", font_size=24, color=WHITE).move_to(demi)
        self.play(ReplacementTransform(onze, VGroup(demi, quatre)))
        l2 = self.ligne("+5 % :   80 + 4  =  84 €", -1.5, WHITE, font_size=44)
        self.play(FadeIn(l2))
        self.attendre_voix()

    # ── 08 · le piège ───────────────────────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("08-piege")
        self.titre_ecran("Le piège")

        faux = VGroup(Text("24 €", font_size=60, color=ROUGE_ERREUR),
                      Text("c'est la RÉDUCTION", font_size=30, color=ROUGE_ERREUR)).arrange(DOWN, buff=0.2)
        vrai = VGroup(Text("56 €", font_size=60, color=VERT_OK),
                      Text("c'est le PRIX À PAYER", font_size=30, color=VERT_OK)).arrange(DOWN, buff=0.2)
        faux.move_to([-3.2, 1.3, 0])
        vrai.move_to([2.6, 1.3, 0])
        self.au("24 euros")
        self.play(FadeIn(faux))
        croix = Cross(faux[0], stroke_color=ROUGE_ERREUR, stroke_width=6)
        self.au("Beaucoup s'arrêtent")
        self.play(Create(croix), FadeIn(vrai))

        self.au("Pose-toi toujours")
        q = Text("Mon résultat va-t-il dans le bon sens ?", font_size=34, color=JAUNE_TITRE).move_to([-0.4, -0.35, 0])
        self.play(Write(q))
        self.au("après une réduction")
        r1 = self.ligne("réduction   →   plus PETIT qu'avant", -1.3, ROUGE_ERREUR, font_size=36)
        self.play(FadeIn(r1))
        self.au("Après une augmentation")
        r2 = self.ligne("augmentation   →   plus GRAND qu'avant", -2.1, VERT_OK, font_size=36)
        self.play(FadeIn(r2))
        self.attendre_voix()

    # ── 09 · le défi, puis sa correction ────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte()
        self.dire("09-defi")
        self.titre_ecran("À toi !")
        tag = self.etiquette("60 €", centre=[-2.4, 1.0, 0])
        jeu = Text("un jeu vidéo", font_size=34, color=WHITE).next_to(tag, UP, buff=0.35)
        solde = Text("−20 %", font_size=72, color=ROUGE_ERREUR).move_to([1.9, 1.0, 0])
        self.play(FadeIn(jeu), FadeIn(tag))
        self.au("Il est soldé")
        self.play(FadeIn(solde, scale=1.2))
        self.au("Combien vas-tu payer")
        q = Text("Tu paies combien ?", font_size=48, color=JAUNE_TITRE).move_to([-0.4, -0.8, 0])
        self.play(Write(q))
        self.au("Mets pause")
        pause = VGroup(Rectangle(width=0.22, height=0.8), Rectangle(width=0.22, height=0.8)) \
            .arrange(RIGHT, buff=0.22).set_fill(WHITE, 1).set_stroke(width=0)
        mot = Text("pause, et cherche de tête", font_size=32, color=WHITE)
        VGroup(pause, mot).arrange(RIGHT, buff=0.4).move_to([-0.4, -2.1, 0])
        self.play(FadeIn(pause), FadeIn(mot))
        self.attendre_voix(marge=2.5)   # le temps de chercher

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("09b-correction")
        self.titre_ecran("Correction")
        cases = self.barre(valeur="6 €")
        prix = Text("60 €", font_size=36, color=JAUNE_TITRE).next_to(cases, LEFT, buff=0.35)
        self.play(FadeIn(cases), FadeIn(prix), run_time=0.6)

        self.au("10 pour cent de 60")
        self.play(*self.colorier([cases[9]], BLEU_CALCUL))
        l1 = self.ligne("10 % de 60  =  6 €", -0.1, WHITE, font_size=38)
        self.play(FadeIn(l1))
        self.au("20 pour cent")
        self.play(*self.colorier(cases[8:], ROUGE_ERREUR))
        l2 = self.ligne("20 %  =  2 × 6  =  12 €", -0.95, WHITE, font_size=38)
        self.play(FadeIn(l2))
        self.au("C'est une réduction")
        l3 = self.ligne("60 − 12  =  48 €", -1.9, VERT_OK, font_size=50)
        cadre = SurroundingRectangle(l3, color=JAUNE_TITRE, buff=0.2, stroke_width=4)
        self.play(FadeIn(l3), cases[8:].animate.set_opacity(0.25))
        self.play(Create(cadre))
        self.au("Et 48 est bien")
        # VU AU RENDU : à droite puis à gauche du cadre, la phrase sortait de l'écran.
        verif = Text("48 < 60 : le bon sens", font_size=28, color=VERT_OK).next_to(cadre, DOWN, buff=0.25)
        self.play(FadeIn(verif))
        self.attendre_voix()

    def construct(self):
        self.page_de_garde(
            titre="Les pourcentages de tête",
            accroche="−30 % sur un jean à 80 € : tu paies combien ?",
            promesse="Tu vas apprendre à calculer une promo sans calculatrice.",
        )
        self.page_objectifs([
            "calculer 10 % de n'importe quel prix, de tête",
            "en déduire 20 %, 30 %, 5 % et 50 %",
            "calculer un prix après une réduction ou une augmentation",
        ])
        self.ecran_pourquoi()
        self.ecran_zero()
        self.ecran_virgule()
        self.ecrans_barre()
        self.ecran_reduction()
        self.ecran_augmentation()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.page_finale(
            points=[
                "calculer 10 % de tête : enlever un 0, ou décaler la virgule",
                "en déduire 20 %, 30 %, 5 % et 50 %",
                "réduction : on enlève — augmentation : on ajoute",
            ],
            rappel="La réduction n'est pas le prix à payer : 80 − 24 = 56 €",
        )
        self.page_abonnement()
