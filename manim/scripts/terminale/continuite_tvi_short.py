# continuite_tvi_short.py
# EleveAI — Maths terminale spé — les cinq shorts du TVI, un par micro.
# Voix validées le 11/10/2026 (« go ») : manim/voix/terminale-continuite-tvi-short-<nom>.json
# Ils renvoient à la paysage (continuite_tvi.py, https://youtu.be/GWVlbZyiME4).
#
# Rendu :
#   python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/terminale/continuite_tvi_short.py <Classe> -o eleveai-maths-terminale-continuite-tvi-short-<nom> --media_dir manim/scripts/terminale/media

import math
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from manim import *

from charte import *
from gabarit_sixieme import Short6e


def f(x):
    return x ** 3 + x - 1


class _ShortTvi(Short6e):
    def ouvrir(self, voix):
        self.clear()
        self.margo_bas()
        self.dire(voix)

    def pile(self, lignes, y, buff=0.18):
        g = VGroup(*[self.grand(t, font_size=s, color=c) for t, s, c in lignes]).arrange(DOWN, buff=buff)
        return g.move_to([0, y, 0])

    def faux(self, y=-1.2):
        f_ = self.grand("FAUX !", font_size=90, color=ROUGE_ERREUR).rotate(0.15).move_to([0, y, 0])
        self.play(FadeIn(f_, scale=2.0))

    def axes(self, y=1.4, xr=(0, 1.2, 0.2), yr=(-1.4, 1.4, 0.5), w=3.8, h=3.0):
        return Axes(x_range=list(xr), y_range=list(yr), x_length=w, y_length=h, tips=False,
                    axis_config={"stroke_width": 2}).move_to([0, y, 0])

    def defi(self, lignes, y=0.5):
        self.ouvrir("04-defi")
        self.play(Write(self.grand("À toi !", font_size=56, color=JAUNE_TITRE).move_to([0, 2.6, 0])))
        self.play(FadeIn(self.pile(lignes, y), shift=UP * 0.2))
        self.attendre_voix(marge=2.0)


# ── 1. continuite_reconnaitre ───────────────────────────────────────────────

class ShortContinuiteTvi(_ShortTvi):
    nom_voix = "terminale-continuite-tvi-short-continuite"

    def construct(self):
        self.ouvrir("00-accroche")
        self.play(FadeIn(self.pile([("de −1 à 1…", 56, BLEU_CALCUL), ("elle touche", 48, WHITE), ("forcément 0 ?", 56, JAUNE_TITRE)], 1.0)))
        self.attendre_voix(marge=0.4)

        self.ouvrir("01-piege")
        self.play(FadeIn(self.grand("« oui, toujours » ?", font_size=50, color=ORANGE_RETENUE).move_to([0, 1.8, 0]), scale=1.3))
        self.au_mot("Et c'est faux")
        self.faux(0.0)
        self.attendre_voix(marge=0.4)

        self.ouvrir("02-saut")
        ax = self.axes(y=1.6, xr=(0, 4, 1), yr=(-1.5, 1.5, 1))
        g1 = ax.plot(lambda x: -1, x_range=[0, 2], color=ROUGE_ERREUR, stroke_width=6)
        g2 = ax.plot(lambda x: 1, x_range=[2, 4], color=ROUGE_ERREUR, stroke_width=6)
        self.play(Create(ax), Create(g1))
        self.au_mot("sans jamais toucher 0")
        self.play(Create(g2))
        self.play(FadeIn(self.pile([("un saut :", 36, ROUGE_ERREUR), ("0 n'est jamais atteint", 34, ROUGE_ERREUR)], -0.5)))
        self.au_mot("Il faut qu'elle soit continue")
        self.play(FadeIn(self.pile([("continue =", 36, VERT_OK), ("sans lever le crayon", 34, VERT_OK)], -1.9)))
        self.attendre_voix(marge=0.4)

        self.ouvrir("03-regle")
        self.play(Write(self.grand("Continues :", font_size=50, color=VERT_OK).move_to([0, 2.4, 0])))
        self.au_mot("Les polynômes")
        self.play(FadeIn(self.pile([("polynômes", 44, WHITE), ("exponentielle", 44, WHITE), ("ln sur ]0 ; +∞[", 40, WHITE)], 0.9)))
        self.au_mot("Pas de saut")
        self.play(FadeIn(self.grand("pas de saut, pas de trou", font_size=34, color=JAUNE_TITRE).move_to([0, -0.8, 0])))
        self.attendre_voix(marge=0.4)

        self.defi([("la partie entière", 40, WHITE), ("(des marches)", 34, GRAY_B), ("est-elle continue ?", 44, BLEU_CALCUL)])
        self.ecran_renvoi("05-fin")


# ── 2. tvi_appliquer ────────────────────────────────────────────────────────

class ShortAppliquerTvi(_ShortTvi):
    nom_voix = "terminale-continuite-tvi-short-appliquer"

    def construct(self):
        self.ouvrir("00-accroche")
        self.play(FadeIn(self.pile([("x³ + x − 1 = 0", 56, BLEU_CALCUL), ("une solution", 44, WHITE), ("entre 0 et 1 ?", 44, WHITE)], 1.4)))
        self.au_mot("Sans la calculer")
        self.play(FadeIn(self.grand("sans la calculer ?", font_size=44, color=JAUNE_TITRE).move_to([0, -0.4, 0])))
        self.attendre_voix(marge=0.4)

        self.ouvrir("01-calcul")
        ax = self.axes(y=1.7)
        c = ax.plot(f, x_range=[0, 1.08], color=BLEU_CALCUL, stroke_width=4)
        self.play(Create(ax))
        self.au_mot("f de 0 égale moins 1")
        self.play(FadeIn(Dot(ax.c2p(0, -1), color=ROUGE_ERREUR, radius=0.1)),
                  FadeIn(self.grand("f(0) = −1", font_size=44, color=ROUGE_ERREUR).move_to([0, -0.3, 0])))
        self.au_mot("f de 1 égale 1")
        self.play(FadeIn(Dot(ax.c2p(1, 1), color=VERT_OK, radius=0.1)),
                  FadeIn(self.grand("f(1) = 1", font_size=44, color=VERT_OK).move_to([0, -1.1, 0])))
        self.play(Create(c))
        self.attendre_voix(marge=0.4)

        self.ouvrir("02-regle")
        self.play(FadeIn(self.pile([("polynôme", 40, WHITE), ("donc continue", 40, VERT_OK)], 2.2)))
        self.au_mot("Elle passe du négatif")
        self.play(FadeIn(self.grand("−  puis  +", font_size=60, color=ORANGE_RETENUE).move_to([0, 0.7, 0])))
        self.au_mot("elle s'annule forcément")
        self.play(FadeIn(self.pile([("elle s'annule", 40, JAUNE_TITRE), ("entre 0 et 1", 40, JAUNE_TITRE)], -0.6)))
        self.au_mot("C'est le théorème")
        self.play(FadeIn(self.grand("le TVI", font_size=60, color=VERT_OK).move_to([0, -1.9, 0])))
        self.attendre_voix(marge=0.4)

        self.ouvrir("03-piege")
        self.play(FadeIn(self.pile([("Le piège :", 46, ORANGE_RETENUE), ("oublier", 44, WHITE), ("« f est continue »", 44, WHITE)], 1.6)))
        self.au_mot("Sans la continuité")
        self.play(FadeIn(self.pile([("sans continuité,", 36, ROUGE_ERREUR), ("pas de théorème", 36, ROUGE_ERREUR)], -0.6)))
        self.attendre_voix(marge=0.4)

        self.defi([("x³ − 2 = 0", 64, BLEU_CALCUL), ("une solution", 40, WHITE), ("entre 1 et 2 ?", 40, WHITE)])
        self.ecran_renvoi("05-fin")


# ── 3. tvi_unicite ──────────────────────────────────────────────────────────

class ShortUniciteTvi(_ShortTvi):
    nom_voix = "terminale-continuite-tvi-short-unicite"

    def construct(self):
        self.ouvrir("00-accroche")
        self.play(FadeIn(self.pile([("« au moins une »", 50, BLEU_CALCUL), ("ou", 40, WHITE), ("« une seule » ?", 50, JAUNE_TITRE)], 1.0)))
        self.attendre_voix(marge=0.4)

        self.ouvrir("01-piege")
        self.play(FadeIn(self.pile([("« unique »", 56, ORANGE_RETENUE), ("sans justifier ?", 44, WHITE)], 1.6), scale=1.2))
        self.au_mot("le correcteur enlève")
        self.play(FadeIn(self.grand("− des points", font_size=56, color=ROUGE_ERREUR).move_to([0, -0.5, 0])))
        self.attendre_voix(marge=0.4)

        self.ouvrir("02-monotonie")
        ax = self.axes(y=1.4)
        c = ax.plot(f, x_range=[0, 1.08], color=VERT_OK, stroke_width=5)
        self.play(Create(ax))
        self.au_mot("strictement monotone")
        self.play(FadeIn(self.grand("strictement monotone", font_size=38, color=JAUNE_TITRE).move_to([0, -0.6, 0])))
        self.au_mot("Une courbe qui ne fait que monter")
        self.play(Create(c), run_time=1.5)
        self.play(FadeIn(Dot(ax.c2p(0.6823, 0), color=JAUNE_TITRE, radius=0.11)),
                  FadeIn(self.grand("elle coupe l'axe UNE fois", font_size=32).move_to([0, -1.4, 0])))
        self.attendre_voix(marge=0.4)

        self.ouvrir("03-exemple")
        self.play(FadeIn(self.grand("f(x) = x³ + x − 1", font_size=46, color=BLEU_CALCUL).move_to([0, 2.3, 0])))
        self.au_mot("f prime de x")
        self.play(FadeIn(self.grand("f'(x) = 3x² + 1", font_size=48).move_to([0, 1.2, 0])))
        self.au_mot("toujours positif")
        self.play(FadeIn(self.grand("> 0 toujours", font_size=44, color=VERT_OK).move_to([0, 0.4, 0])))
        self.au_mot("f est strictement croissante")
        self.play(FadeIn(self.pile([("strictement croissante", 36, VERT_OK), ("solution UNIQUE", 46, JAUNE_TITRE)], -0.9)))
        self.attendre_voix(marge=0.4)

        self.defi([("f(x) = x² − 1", 50, BLEU_CALCUL), ("sur [−2 ; 2]", 38, WHITE), ("combien de solutions ?", 34, WHITE), ("pourquoi le TVI", 32, GRAY_B), ("ne suffit pas ?", 32, GRAY_B)], y=0.1)
        self.ecran_renvoi("05-fin")


# ── 4. tvi_rediger ──────────────────────────────────────────────────────────

class ShortRedigerTvi(_ShortTvi):
    nom_voix = "terminale-continuite-tvi-short-rediger"

    def construct(self):
        self.ouvrir("00-accroche")
        self.play(FadeIn(self.pile([("Le TVI au bac :", 50, BLEU_CALCUL), ("4 lignes", 90, JAUNE_TITRE), ("= tous les points", 40, VERT_OK)], 1.0)))
        self.attendre_voix(marge=0.4)

        self.ouvrir("01-lignes")
        y = 2.3
        for mot, l1, l2 in [("Un : f est continue", "1. f est", "continue"), ("Deux : f est strictement", "2. f strictement", "monotone"),
                            ("Trois : les signes", "3. signes contraires", "aux bornes")]:
            self.au_mot(mot)
            self.play(FadeIn(self.pile([(l1, 40, WHITE), (l2, 40, VERT_OK)], y, buff=0.08)))
            y -= 1.45
        self.attendre_voix(marge=0.4)

        self.ouvrir("02-conclusion")
        self.play(FadeIn(self.pile([("4. d'après le corollaire", 32, VERT_OK), ("du TVI, f(x) = 0", 32, VERT_OK), ("admet une unique", 32, VERT_OK), ("solution", 32, VERT_OK)], 1.2)))
        self.attendre_voix(marge=0.4)

        self.ouvrir("03-piege")
        self.play(FadeIn(self.pile([("« d'après", 44, ORANGE_RETENUE), ("le théorème »", 44, ORANGE_RETENUE)], 1.8)))
        self.au_mot("Au bac, on cite")
        self.play(FadeIn(self.pile([("on CITE :", 40, WHITE), ("corollaire du TVI", 44, VERT_OK)], -0.2)))
        self.attendre_voix(marge=0.4)

        self.defi([("Laquelle des", 42, WHITE), ("4 lignes oublies-tu", 42, WHITE), ("le plus souvent ?", 42, BLEU_CALCUL)])
        self.ecran_renvoi("05-fin")


# ── 5. tvi_defi ─────────────────────────────────────────────────────────────

class ShortDefiTvi(_ShortTvi):
    nom_voix = "terminale-continuite-tvi-short-defi"

    def construct(self):
        self.ouvrir("00-accroche")
        self.play(FadeIn(self.pile([("une solution α", 48, BLEU_CALCUL), ("entre 0 et 1", 44, WHITE), ("au centième ?", 52, JAUNE_TITRE)], 1.0)))
        self.attendre_voix(marge=0.4)

        self.ouvrir("01-balayage")
        self.play(FadeIn(self.grand("changement de signe ?", font_size=38, color=ORANGE_RETENUE).move_to([0, 2.4, 0])))
        self.au_mot("f de 0 virgule 6")
        self.play(FadeIn(self.grand("f(0,6) < 0", font_size=48, color=ROUGE_ERREUR).move_to([0, 1.3, 0])))
        self.au_mot("f de 0 virgule 7")
        self.play(FadeIn(self.grand("f(0,7) > 0", font_size=48, color=VERT_OK).move_to([0, 0.4, 0])))
        self.au_mot("alpha est entre")
        self.play(GrowFromCenter(self.grand("0,6 < α < 0,7", font_size=56, color=JAUNE_TITRE).move_to([0, -0.8, 0])))
        self.attendre_voix(marge=0.4)

        self.ouvrir("02-centieme")
        self.play(FadeIn(self.grand("au centième", font_size=44, color=BLEU_CALCUL).move_to([0, 2.4, 0])))
        self.au_mot("f de 0 virgule 68")
        self.play(FadeIn(self.grand("f(0,68) < 0", font_size=48, color=ROUGE_ERREUR).move_to([0, 1.3, 0])))
        self.au_mot("f de 0 virgule 69")
        self.play(FadeIn(self.grand("f(0,69) > 0", font_size=48, color=VERT_OK).move_to([0, 0.4, 0])))
        self.au_mot("Alpha est entre 0 virgule 68")
        self.play(GrowFromCenter(self.grand("0,68 < α < 0,69", font_size=54, color=JAUNE_TITRE).move_to([0, -0.8, 0])))
        self.attendre_voix(marge=0.4)

        self.ouvrir("03-regle")
        self.play(FadeIn(self.pile([("on garde l'intervalle", 38, WHITE), ("où le signe change", 38, WHITE)], 1.6)))
        self.au_mot("C'est le balayage")
        self.play(FadeIn(self.pile([("le balayage", 52, VERT_OK), ("à la calculatrice", 36, GRAY_B)], -0.3)))
        self.attendre_voix(marge=0.4)

        self.defi([("x³ = 2", 80, BLEU_CALCUL), ("encadre la solution", 38, WHITE), ("au dixième", 44, JAUNE_TITRE)])
        self.ecran_renvoi("05-fin")
