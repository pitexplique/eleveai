# entier_nombre_short.py
# EleveAI — Maths 6e — Short « Le zéro qui garde la place » (micro entier_lire_ecrire).
# Voix validée le 01/10/2026 : manim/voix/6e-entier-nombre-short-zero.json.
# Renvoie à la vidéo longue (entier_nombre.py).
#
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/6e/entier_nombre_short.py ShortZeroEntier6e -o eleveai-maths-6e-entier-nombre-short-zero --media_dir manim/scripts/6e/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from manim import *

from charte import *
from gabarit_sixieme import Short6e


class ShortZeroEntier6e(Short6e):
    nom_voix = "6e-entier-nombre-short-zero"

    def tableau(self):
        ent, cases, xs = self.tableau_num(["M", "C", "D", "U"], y_ent=1.1, y_case=0.25,
                                          largeur=0.95, font_ent=30)
        legende = self.grand("milliers · centaines · dizaines · unités", font_size=20,
                             color=GREY_B).move_to([0, 1.7, 0])
        return ent, cases, xs, legende

    def ecran_accroche(self):
        self.clear()
        self.margo_bas()
        self.dire("00-accroche")
        zero = Text("0", font_size=180, color=ORANGE_RETENUE).move_to([0, 1.5, 0])
        l1 = self.grand("Un zéro,", font_size=46).move_to([0, -0.2, 0])
        l2 = self.grand("ça ne vaut rien.", font_size=46).move_to([0, -0.85, 0])
        self.play(GrowFromCenter(zero))
        self.play(FadeIn(l1), FadeIn(l2))
        self.au_mot("Alors, pourquoi")
        q = VGroup(self.grand("Pourquoi on ne peut", font_size=36, color=BLEU_CALCUL),
                   self.grand("pas l'enlever ?", font_size=36, color=BLEU_CALCUL)).arrange(DOWN, buff=0.15)
        q.move_to([0, -1.85, 0])
        self.play(Write(q), Flash(zero, color=ORANGE_RETENUE, line_length=0.4))
        self.attendre_voix(marge=0.4)

    def ecran_dicte(self):
        self.clear()
        self.margo_bas()
        self.dire("01-dicte")
        mots = VGroup(self.grand("« mille", font_size=44, color=BLEU_CALCUL),
                      self.grand("quarante-deux »", font_size=44, color=BLEU_CALCUL)).arrange(DOWN, buff=0.15)
        mots.move_to([0, 2.6, 0])
        ent, cases, xs, leg = self.tableau()
        self.play(FadeIn(mots))
        self.play(FadeIn(ent), Create(cases), FadeIn(leg))
        self.au_mot("Un millier")
        self.play(FadeIn(Text("1", font_size=60).move_to([xs[0], 0.25, 0]), scale=1.5))
        self.au_mot("Pas de centaine")
        self.play(cases[1].animate.set_stroke(ORANGE_RETENUE, width=6))
        self.play(Indicate(cases[1], color=ORANGE_RETENUE))
        self.au_mot("4 dizaines")
        self.play(FadeIn(Text("4", font_size=60).move_to([xs[2], 0.25, 0]), scale=1.5))
        self.au_mot("2 unités")
        self.play(FadeIn(Text("2", font_size=60).move_to([xs[3], 0.25, 0]), scale=1.5))
        self.attendre_voix(marge=0.4)

    def ecran_oubli(self):
        self.clear()
        self.margo_bas()
        self.dire("02-oubli")
        t = self.grand("Sans le zéro :", font_size=40).move_to([0, 2.4, 0])
        self.play(FadeIn(t))
        n = Text("142", font_size=120, color=ROUGE_ERREUR).move_to([0, 1.0, 0])
        self.play(GrowFromCenter(n))
        self.au_mot("Ça fait cent")
        l = self.grand("cent quarante-deux", font_size=36, color=ROUGE_ERREUR).move_to([0, -0.3, 0])
        self.play(Write(l))
        self.au_mot("Presque mille")
        p = VGroup(self.grand("Presque mille", font_size=40, color=ORANGE_RETENUE),
                   self.grand("de moins !", font_size=40, color=ORANGE_RETENUE)).arrange(DOWN, buff=0.15)
        p.move_to([0, -1.5, 0])
        self.play(FadeIn(p, scale=1.4))
        self.attendre_voix(marge=0.4)

    def ecran_place(self):
        self.clear()
        self.margo_bas()
        self.dire("03-place")
        ent, cases, xs, leg = self.tableau()
        chiffres = VGroup(*[Text(c, font_size=60).move_to([xs[i], 0.25, 0]) for i, c in ((0, "1"), (2, "4"), (3, "2"))])
        self.add(ent, cases, leg, chiffres)
        zero = Text("0", font_size=60, color=ORANGE_RETENUE).move_to([xs[1], 0.25, 0])
        self.play(GrowFromCenter(zero))
        self.play(Flash(zero, color=ORANGE_RETENUE, line_length=0.3))
        self.au_mot("C'est lui qui pousse")
        self.play(Indicate(chiffres[0], color=BLEU_CALCUL, scale_factor=1.5))
        self.au_mot("Mille quarante-deux s'écrit")
        res = self.grand("1 042", font_size=110, color=VERT_OK).move_to([0, -1.3, 0])
        self.play(GrowFromCenter(res))
        self.attendre_voix(marge=0.4)

    def ecran_defi(self):
        self.clear()
        self.margo_bas()
        self.dire("04-defi")
        a = self.grand("À toi !", font_size=56, color=JAUNE_TITRE).move_to([0, 2.3, 0])
        self.play(Write(a))
        q = VGroup(self.grand("« trois cent", font_size=44, color=BLEU_CALCUL),
                   self.grand("quatre »", font_size=44, color=BLEU_CALCUL)).arrange(DOWN, buff=0.15)
        q.move_to([0, 0.9, 0])
        self.play(FadeIn(q))
        cases = VGroup(*[Square(side_length=0.9, color=WHITE, stroke_width=3) for _ in range(3)])
        cases.arrange(RIGHT, buff=0.15).move_to([0, -0.6, 0])
        self.play(Create(cases))
        self.attendre_voix(marge=2.0)

    def construct(self):
        self.ecran_accroche()
        self.ecran_dicte()
        self.ecran_oubli()
        self.ecran_place()
        self.ecran_defi()
        self.ecran_renvoi("05-fin")
