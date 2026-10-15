# pourcentages_calcul_mental_short.py
# EleveAI — « Les bases » — Les pourcentages de tête : 10 %, 20 %, 30 %, 5 %, 50 %.
#
# ⭐ 30/09/2026 — demandé par Frédéric « pour mes quatrièmes », avec SA méthode de
# classe : tout part de 10 % (on enlève un 0, ou on décale la virgule), puis
# ×2 → 20 %, ×3 → 30 %, ÷2 → 5 %, et on applique à une réduction (on enlève) ou
# une augmentation (on ajoute). Exemple de Frédéric : 80 €, 10 % = 8 €.
# ⛔ AUCUNE ÉTIQUETTE DE NIVEAU (série « Les bases ») : la vidéo sert ses 4e sans
# le dire — voir `manim/gabarit_bases.py`.
# ⭐ LE FIL ROUGE : l'accroche pose le jean à 80 € soldé −30 %, et la réponse
# (56 €) ne tombe qu'à l'écran 05 — le short boucle sur sa question.
# ⭐ LE MÉMO NE DISPARAÎT PAS entre les écrans 03 et 04 : pas de `clear()`. Les
# cinq lignes s'empilent, et l'élève finit avec le tableau entier sous les yeux.
#
# Voix : powershell -File scripts/generer-voix.ps1 -Fichier manim/voix/bases-pourcentages-short-calcul-mental.json -Debit -4
# Rendu :
#   python -m manim render -qh --disable_caching -r 1080,1920 manim/scripts/bases/pourcentages_calcul_mental_short.py PourcentagesShortCalculMental -o eleveai-maths-bases-pourcentages-short-calcul-mental --media_dir manim/scripts/bases/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from manim import *

from charte import *
from gabarit_bases import ShortBases
from gabarit_seconde import SONS


class PourcentagesShortCalculMental(ShortBases):
    """LA MÉTHODE — 10 % d'abord, tout le reste s'en déduit."""

    dossier_voix = SONS / "bases-pourcentages-short-calcul-mental"

    # ── les briques ─────────────────────────────────────────────────────────

    def titre2(self, mot, suite, couleur):
        """Un titre en DEUX lignes : sur une seule, « Réduction : on enlève » sortait
        réduit à une taille illisible (vu au rendu)."""
        return VGroup(
            self.grand(mot, font_size=52, color=couleur),
            self.grand(suite, font_size=36, color=couleur),
        ).arrange(DOWN, buff=0.12).move_to([0, 2.8, 0])

    def titre(self, texte, couleur=JAUNE_TITRE, font_size=44):
        return self.grand(texte, font_size=font_size, color=couleur).move_to([0, 2.95, 0])

    def bas(self, texte, couleur=WHITE, font_size=34):
        return self.grand(texte, font_size=font_size, color=couleur).move_to([0, -1.75, 0])

    def etiquette(self, prix, centre=ORIGIN, largeur=3.0, hauteur=1.5, font_size=80):
        """Une étiquette de prix DESSINÉE : un rectangle à pointe, et son trou."""
        l, h = largeur, hauteur
        forme = Polygon(
            [-l / 2, h / 2, 0], [l / 2, h / 2, 0], [l / 2, -h / 2, 0],
            [-l / 2, -h / 2, 0], [-l / 2 - 0.55, 0, 0],
            color=WHITE, stroke_width=4, fill_color="#2B2B2B", fill_opacity=1,
        )
        trou = Circle(radius=0.11, color=WHITE, stroke_width=3).move_to([-l / 2 - 0.12, 0, 0])
        p = Text(prix, font_size=font_size, color=WHITE).move_to([0.2, 0, 0])
        return VGroup(forme, trou, p).move_to(centre)

    # ── 00 · l'accroche ─────────────────────────────────────────────────────

    def ecran_accroche(self):
        self.clear()
        self.margo_bas()
        self.dire("00-accroche")
        tag = self.etiquette("80 €", centre=[0.15, 1.55, 0])
        solde = self.grand("−30 %", font_size=84, color=ROUGE_ERREUR).move_to([0, 0.05, 0])
        q = self.grand("Tu paies combien ?", font_size=40, color=JAUNE_TITRE).move_to([0, -1.05, 0])
        # ⭐ l'image de la 1re seconde porte déjà la question entière
        self.add(tag, solde, q)
        self.wait(5.2)   # « Pas besoin de calculatrice » tombe vers 5,5 s
        sans = self.grand("sans calculatrice", font_size=34, color=WHITE).move_to([0, -1.85, 0])
        self.play(FadeIn(sans, shift=UP * 0.12), run_time=0.4)
        self.attendre_voix(marge=0.4)

    # ── 01 · 10 % : on enlève un zéro ───────────────────────────────────────

    def ecran_dix(self):
        self.clear()
        self.margo_bas()
        self.dire("01-dix")
        t = self.titre("Tout part de 10 %")
        self.play(Write(t), run_time=0.6)
        self.wait(0.6)
        q = self.grand("10 % de 80", font_size=48, color=BLEU_CALCUL).move_to([0, 1.55, 0])
        self.play(FadeIn(q))
        huit = Text("8", font_size=150, color=WHITE)
        zero = Text("0", font_size=150, color=WHITE)
        nombre = VGroup(huit, zero).arrange(RIGHT, buff=0.08).move_to([0, 0.05, 0])
        self.play(FadeIn(nombre), run_time=0.5)
        self.wait(0.5)
        # « on enlève un zéro » : le 0 rougit et s'envole
        self.play(zero.animate.set_color(ROUGE_ERREUR), run_time=0.35)
        self.play(FadeOut(zero, shift=UP * 1.2 + RIGHT * 0.6), huit.animate.move_to([0, 0.05, 0]), run_time=0.8)
        res = self.grand("= 8 €", font_size=64, color=VERT_OK).move_to([0, -1.35, 0])
        self.play(FadeIn(res, scale=1.2))
        self.attendre_voix(marge=0.5)

    # ── 02 · pas de zéro ? on décale la virgule ─────────────────────────────

    def ecran_virgule(self):
        self.clear()
        self.margo_bas()
        self.dire("02-virgule")
        t = self.titre("Pas de 0 à enlever ?", font_size=40)
        self.play(Write(t), run_time=0.6)
        self.wait(1.2)
        q = self.grand("10 % de 45", font_size=48, color=BLEU_CALCUL).move_to([0, 1.55, 0])
        self.play(FadeIn(q))
        # Les deux chiffres ne bougent pas : c'est la VIRGULE qui se déplace.
        quatre = Text("4", font_size=150, color=WHITE).move_to([-0.45, 0.05, 0])
        cinq = Text("5", font_size=150, color=WHITE).move_to([0.45, 0.05, 0])
        virg = Text(",", font_size=150, color=ORANGE_RETENUE)
        virg.move_to([1.1, -0.35, 0])
        self.play(FadeIn(quatre), FadeIn(cinq), FadeIn(virg))
        self.wait(1.4)
        fleche = Arrow([1.1, -1.0, 0], [0.05, -1.0, 0], buff=0, color=ORANGE_RETENUE, stroke_width=6)
        self.play(GrowArrow(fleche), run_time=0.5)
        # VU AU RENDU : la virgule posée entre deux chiffres collés les chevauchait —
        # le 4 et le 5 s'écartent pour lui faire place.
        self.play(virg.animate.move_to([0.0, -0.35, 0]),
                  quatre.animate.move_to([-0.72, 0.05, 0]),
                  cinq.animate.move_to([0.72, 0.05, 0]), run_time=1.0)
        self.play(FadeOut(fleche), run_time=0.3)
        rang = self.grand("1 rang vers la gauche", font_size=30, color=ORANGE_RETENUE).move_to([0, -1.1, 0])
        self.play(FadeIn(rang))
        self.wait(1.2)
        res = self.grand("= 4,50 €", font_size=60, color=VERT_OK).move_to([0, -2.0, 0])
        self.play(FadeIn(res, scale=1.2))
        self.attendre_voix(marge=0.5)

    # ── 03 + 04 · le mémo qui s'empile ──────────────────────────────────────

    def ligne_memo(self, pct, calcul, res, y, couleur):
        g = VGroup(
            Text(pct, font_size=38, color=couleur),
            Text(calcul, font_size=30, color=ORANGE_RETENUE),
            Text(res, font_size=38, color=WHITE),
        ).arrange(RIGHT, buff=0.3)
        if g.width > config.frame_width - 0.4:
            g.scale_to_fit_width(config.frame_width - 0.4)
        return g.move_to([0, y, 0])

    def ecrans_memo(self):
        self.clear()
        self.margo_bas()

        # 03 · ×2 et ×3
        self.dire("03-multiples")
        t = self.titre("80 €", font_size=52)
        self.play(Write(t), run_time=0.5)
        dix = self.ligne_memo("10 %", "=", "8 €", 1.95, BLEU_CALCUL)
        cadre = SurroundingRectangle(dix, color=BLEU_CALCUL, buff=0.16, stroke_width=3)
        self.play(FadeIn(dix), Create(cadre))
        self.wait(2.2)
        vingt = self.ligne_memo("20 %", "2 × 8 =", "16 €", 1.0, BLEU_CALCUL)
        self.play(FadeIn(vingt, shift=DOWN * 0.15))
        self.wait(3.6)
        trente = self.ligne_memo("30 %", "3 × 8 =", "24 €", 0.1, BLEU_CALCUL)
        self.play(FadeIn(trente, shift=DOWN * 0.15))
        self.attendre_voix(marge=0.4)

        # 04 · ÷2
        self.dire("04-moities")
        self.wait(1.8)
        cinq = self.ligne_memo("5 %", "8 ÷ 2 =", "4 €", -0.8, VERT_OK)
        self.play(FadeIn(cinq, shift=DOWN * 0.15))
        self.wait(3.2)
        cinquante = self.ligne_memo("50 %", "80 ÷ 2 =", "40 €", -1.7, VERT_OK)
        self.play(FadeIn(cinquante, shift=DOWN * 0.15))
        self.attendre_voix(marge=0.8)

    # ── 05 · réduction : on enlève ──────────────────────────────────────────

    def ecran_reduction(self):
        self.clear()
        self.margo_bas()
        self.dire("05-reduction")
        t = self.titre2("Réduction", "on enlève", ROUGE_ERREUR)
        self.play(Write(t), run_time=0.6)
        self.wait(1.0)
        l1 = self.grand("−10 %", font_size=52, color=ROUGE_ERREUR).move_to([0, 1.55, 0])
        l2 = self.grand("80 − 8 = 72 €", font_size=46, color=WHITE).move_to([0, 0.8, 0])
        self.play(FadeIn(l1))
        self.wait(0.8)
        self.play(FadeIn(l2))
        self.wait(1.6)
        # « et notre jean » : l'étiquette de l'accroche revient
        tag = self.etiquette("80 €", centre=[0.15, -0.1, 0], largeur=2.3, hauteur=1.0, font_size=54)
        sold = self.grand("−30 %", font_size=44, color=ROUGE_ERREUR).move_to([0, -0.95, 0])
        self.play(FadeIn(tag), FadeIn(sold))
        self.wait(1.0)
        l3 = self.grand("80 − 24 = 56 €", font_size=46, color=WHITE).move_to([0, -1.85, 0])
        self.play(FadeIn(l3))
        cadre = SurroundingRectangle(l3, color=JAUNE_TITRE, buff=0.16, stroke_width=4)
        self.play(Create(cadre))
        self.play(Flash(cadre, color=JAUNE_TITRE, line_length=0.3))
        self.attendre_voix(marge=0.6)

    # ── 06 · augmentation : on ajoute ───────────────────────────────────────

    def ecran_augmentation(self):
        self.clear()
        self.margo_bas()
        self.dire("06-augmentation")
        t = self.titre2("Augmentation", "on ajoute", VERT_OK)
        self.play(Write(t), run_time=0.6)
        self.wait(0.9)
        l1 = self.grand("+10 %", font_size=70, color=VERT_OK).move_to([0, 1.3, 0])
        self.play(FadeIn(l1))
        self.wait(0.6)
        l2 = self.grand("80 + 8 = 88 €", font_size=50, color=WHITE).move_to([0, 0.0, 0])
        self.play(FadeIn(l2))
        self.attendre_voix(marge=0.8)

    # ── 07 · le défi ────────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.margo_bas()
        self.dire("07-defi")
        self.play(Write(Text("À toi", font_size=46, color=ORANGE_RETENUE).move_to([0, 2.8, 0])), run_time=0.5)
        l1 = self.grand("Jeu vidéo", font_size=48, color=WHITE).move_to([0, 1.75, 0])
        tag = self.etiquette("60 €", centre=[0.15, 0.55, 0], largeur=2.3, hauteur=1.0, font_size=54)
        l2 = self.grand("−20 %", font_size=70, color=ROUGE_ERREUR).move_to([0, -0.65, 0])
        l3 = self.grand("= ?", font_size=96, color=JAUNE_TITRE).move_to([0, -1.75, 0])
        for m in (l1, tag, l2):
            self.play(FadeIn(m, shift=UP * 0.12), run_time=0.45)
        self.play(FadeIn(l3, scale=1.2))
        self.play(Flash(l3, color=JAUNE_TITRE, line_length=0.4))
        self.attendre_voix(marge=0.8)

    def construct(self):
        self.ecran_accroche()
        self.ecran_dix()
        self.ecran_virgule()
        self.ecrans_memo()
        self.ecran_reduction()
        self.ecran_augmentation()
        self.ecran_defi()
        self.ecran_renvoi(voix="08-fin")
