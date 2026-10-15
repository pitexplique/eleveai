# continuite_tvi.py
# EleveAI — Maths terminale spé — Continuité et théorème des valeurs
# intermédiaires (notion continuite_tvi), AVEC VOIX.
# Exemple de la feuille lib/fiches-exercices/maths-terminale-continuite-tvi.tsx :
# x³ + x − 1 = 0 sur [0 ; 1], « rédiger comme au bac ».
#
# ⭐ 10/10/2026 : la paysage de terminale du fil « équations » (une par classe).
# Voix validée : manim/voix/terminale-continuite-tvi.json (débit −4, lycée).
# L'intuition : la montée au Piton des Neiges (Cilaos 1 200 m → sommet 3 070 m),
# exemple demandé par Frédéric à la place d'une randonnée sans lieu.
#
# Mapping micro-compétences (coach Tle spé) → écrans :
# - continuite_reconnaitre → 02-continuite
# - tvi_appliquer          → 03-theoreme, 04-appliquer, 06-encadrer
# - tvi_unicite            → 05-unicite
# - tvi_rediger            → 07-rediger
# - tvi_defi               → 08-defi + correction (eˣ + x = 0)
#
# ⛔ Axes SANS include_numbers : les décimaux s'écriraient avec un point. Les
# graduations utiles sont posées à la main, avec la virgule.
#
# Rendu : python -m manim render -qh --disable_caching manim/scripts/terminale/continuite_tvi.py ContinuiteTvi -o eleveai-maths-terminale-continuite-tvi --media_dir manim/scripts/terminale/media

import math
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from manim import *

from charte import *
from gabarit_sixieme import Notion6e

OBJECTIFS = [
    "Appliquer le théorème des valeurs intermédiaires",
    "Prouver qu'une solution est unique, et l'encadrer",
    "Rédiger comme au bac",
]


class NotionTerminale(Notion6e):
    identite = "Maths terminale spé — EleveAI"


def f(x):
    return x ** 3 + x - 1


ALPHA = 0.6823


class ContinuiteTvi(NotionTerminale):
    nom_voix = "terminale-continuite-tvi"

    def t(self, texte, font_size=36, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def axes_f(self, centre=(-3.4, -0.2), x_len=5.6, y_len=4.4):
        ax = Axes(x_range=[0, 1.2, 0.2], y_range=[-1.4, 1.4, 0.5], x_length=x_len, y_length=y_len,
                  tips=False, axis_config={"stroke_width": 2}).move_to([centre[0], centre[1], 0])
        lab = VGroup(*[self.t(tx, 22).next_to(ax.c2p(v, 0), DOWN, buff=0.15) for v, tx in [(1, "1")]],
                     self.t("0", 22).next_to(ax.c2p(0, 0), DL, buff=0.08),
                     self.t("−1", 22).next_to(ax.c2p(0, -1), LEFT, buff=0.1),
                     self.t("1", 22).next_to(ax.c2p(0, 1), LEFT, buff=0.1))
        return ax, lab

    # ── 00 ──────────────────────────────────────────────────────────────────

    def page_de_garde(self, voix="00-garde"):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire(voix)
        titre = self.t("Le théorème des valeurs intermédiaires", 46, JAUNE_TITRE).to_edge(UP, buff=0.55)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.25)
        q = self.t("x³ + x − 1 = 0", 90, BLEU_CALCUL).move_to([-0.6, 0.6, 0])
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(q))
        self.au_mot("Aucune formule")
        self.play(FadeIn(self.t("aucune formule…", 38, ORANGE_RETENUE).move_to([-0.6, -0.6, 0])))
        self.au_mot("une solution, une seule")
        self.play(FadeIn(self.t("une solution, une seule, au centième près", 36, VERT_OK).move_to([-0.6, -1.3, 0])))
        self.au_mot("Les maths, ça sert à rien")
        self.play(Write(self.chute("Les maths, ça sert à rien… sauf à prouver qu'une solution existe.", color=JAUNE_TITRE, font_size=28)))
        self.attendre_voix()

    # ── 01 ──────────────────────────────────────────────────────────────────

    def ecran_intuition(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-intuition")
        self.titre_ecran("1. L'idée : la montée au Piton des Neiges")
        ax = Axes(x_range=[0, 10, 1], y_range=[1000, 3200, 500], x_length=8.0, y_length=4.4, tips=False,
                  axis_config={"stroke_width": 2}).move_to([-0.4, -0.3, 0])
        alt = lambda t: 1200 + 187 * t + 180 * math.sin(1.4 * t)
        chemin = ax.plot(alt, x_range=[0, 10], color=VERT_OK, stroke_width=5)
        self.play(Create(ax))
        self.au_mot("Tu pars de Cilaos")
        d = Dot(ax.c2p(0, 1200), color=BLEU_CALCUL, radius=0.11)
        self.play(FadeIn(d), FadeIn(VGroup(self.t("Cilaos", 26, BLEU_CALCUL), self.t("1 200 m", 26, BLEU_CALCUL)).arrange(DOWN, buff=0.08).next_to(d, LEFT, buff=0.25)))
        self.au_mot("tu arrives au sommet")
        self.play(Create(chemin), run_time=2.0)
        s = Dot(ax.c2p(10, alt(10)), color=JAUNE_TITRE, radius=0.11)
        self.play(FadeIn(s), FadeIn(self.t("sommet : 3 070 m", 30, JAUNE_TITRE).next_to(s, LEFT, buff=0.2).shift(UP * 0.3)))
        self.au_mot("forcément passé par 2 000")
        h = DashedLine(ax.c2p(0, 2000), ax.c2p(10, 2000), color=ORANGE_RETENUE)
        self.play(Create(h), FadeIn(self.t("2 000 m", 28, ORANGE_RETENUE).next_to(h, RIGHT, buff=0.15)))
        t0 = next(k / 100 for k in range(1000) if alt(k / 100) >= 2000)
        self.play(Flash(ax.c2p(t0, 2000), color=ORANGE_RETENUE), FadeIn(Dot(ax.c2p(t0, 2000), color=ORANGE_RETENUE)))
        self.au_mot("C'est toute l'idée")
        self.play(Write(self.chute("Sans lever le pied du sol, on passe par toutes les altitudes.", color=VERT_OK, font_size=28)))
        self.attendre_voix()

    # ── 02 ──────────────────────────────────────────────────────────────────

    def ecran_continuite(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-continuite")
        self.titre_ecran("2. Une fonction continue")
        ax1 = Axes(x_range=[0, 4, 1], y_range=[-1.5, 1.5, 1], x_length=4.2, y_length=3.0, tips=False).move_to([-3.6, 0.2, 0])
        c1 = ax1.plot(lambda x: math.tanh(1.5 * (x - 2)), x_range=[0, 4], color=VERT_OK, stroke_width=5)
        self.play(Create(ax1), Create(c1), run_time=1.5)
        self.play(FadeIn(self.t("sans lever le crayon", 30, VERT_OK).next_to(ax1, DOWN, buff=0.2)))
        self.au_mot("Les polynômes")
        self.play(FadeIn(self.t("polynômes, exponentielle : continus", 30).move_to([-0.6, 2.25, 0])))
        self.au_mot("Si la courbe fait un saut")
        ax2 = Axes(x_range=[0, 4, 1], y_range=[-1.5, 1.5, 1], x_length=4.2, y_length=3.0, tips=False).move_to([2.6, 0.2, 0])
        g1 = ax2.plot(lambda x: -1, x_range=[0, 2], color=ROUGE_ERREUR, stroke_width=5)
        g2 = ax2.plot(lambda x: 1, x_range=[2, 4], color=ROUGE_ERREUR, stroke_width=5)
        self.play(Create(ax2), Create(g1))
        self.play(Create(g2))
        self.au_mot("sans jamais toucher 0")
        self.play(FadeIn(self.t("de −1 à 1 sans toucher 0", 30, ROUGE_ERREUR).next_to(ax2, DOWN, buff=0.2)))
        self.attendre_voix()

    # ── 03 ──────────────────────────────────────────────────────────────────

    def ecran_theoreme(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-theoreme")
        self.titre_ecran("3. Le théorème")
        self.au_mot("Si f est continue")
        self.play(FadeIn(self.t("f continue sur [a ; b]", 40, BLEU_CALCUL).move_to([-0.6, 2.1, 0])))
        self.au_mot("alors f prend toutes les valeurs")
        self.play(FadeIn(self.t("⟹  f prend toutes les valeurs entre f(a) et f(b)", 34).move_to([-0.6, 1.25, 0])))
        self.au_mot("En particulier")
        cas = self.t("f(a) et f(b) de signes contraires", 38, ORANGE_RETENUE).move_to([-0.6, 0.0, 0])
        self.play(FadeIn(cas))
        self.au_mot("a au moins une solution")
        r = self.t("⟹  f(x) = 0 a AU MOINS une solution entre a et b", 36, VERT_OK).move_to([-0.6, -1.0, 0])
        self.play(Write(r), Create(SurroundingRectangle(r, color=VERT_OK, buff=0.18)))
        self.attendre_voix()

    # ── 04 ──────────────────────────────────────────────────────────────────

    def ecran_appliquer(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-appliquer")
        self.titre_ecran("4. L'appliquer")
        ax, lab = self.axes_f()
        c = ax.plot(f, x_range=[0, 1.08], color=BLEU_CALCUL, stroke_width=4)
        self.play(Create(ax), FadeIn(lab))
        self.au_mot("f de x égale x au cube")
        self.play(FadeIn(self.t("f(x) = x³ + x − 1  sur  [0 ; 1]", 34, BLEU_CALCUL).move_to([2.8, 2.0, 0])), Create(c))
        self.au_mot("elle est continue")
        self.play(FadeIn(self.t("polynôme  ⟹  continue", 32).move_to([2.8, 1.2, 0])))
        self.au_mot("f de 0 égale moins 1")
        p0 = Dot(ax.c2p(0, -1), color=ROUGE_ERREUR, radius=0.1)
        self.play(FadeIn(p0), FadeIn(self.t("f(0) = −1", 34, ROUGE_ERREUR).move_to([2.8, 0.4, 0])))
        self.au_mot("f de 1 égale 1")
        p1 = Dot(ax.c2p(1, 1), color=VERT_OK, radius=0.1)
        self.play(FadeIn(p1), FadeIn(self.t("f(1) = 1", 34, VERT_OK).move_to([2.8, -0.3, 0])))
        self.au_mot("la courbe doit traverser")
        a = Dot(ax.c2p(ALPHA, 0), color=JAUNE_TITRE, radius=0.11)
        self.play(FadeIn(a), Flash(a, color=JAUNE_TITRE))
        self.au_mot("qu'on appelle alpha")
        self.play(FadeIn(self.t("α", 40, JAUNE_TITRE).next_to(a, DR, buff=0.08)),
                  FadeIn(self.t("au moins une solution α", 34, JAUNE_TITRE).move_to([2.8, -1.2, 0])))
        self.attendre_voix()

    # ── 05 ──────────────────────────────────────────────────────────────────

    def ecran_unicite(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-unicite")
        self.titre_ecran("5. Une seule solution ?")
        ax, lab = self.axes_f()
        c = ax.plot(f, x_range=[0, 1.08], color=BLEU_CALCUL, stroke_width=4)
        self.add(ax, lab, c)
        self.au_mot("strictement monotone")
        self.play(FadeIn(self.t("il faut : f strictement monotone", 32, ORANGE_RETENUE).move_to([2.8, 2.0, 0])))
        self.au_mot("f prime de x égale")
        self.play(FadeIn(self.t("f'(x) = 3x² + 1 > 0", 40, BLEU_CALCUL).move_to([2.8, 1.1, 0])))
        self.au_mot("strictement croissante")
        self.play(FadeIn(self.t("f strictement croissante", 34, VERT_OK).move_to([2.8, 0.2, 0])))
        self.play(ShowPassingFlash(c.copy().set_stroke(JAUNE_TITRE, 8), time_width=0.5, run_time=1.4))
        self.au_mot("qu'une seule fois")
        self.play(FadeIn(Dot(ax.c2p(ALPHA, 0), color=JAUNE_TITRE, radius=0.11)),
                  FadeIn(self.t("elle coupe l'axe UNE fois", 32).move_to([2.8, -0.6, 0])))
        self.au_mot("est unique")
        self.play(Write(self.t("α est unique", 44, JAUNE_TITRE).move_to([2.8, -1.5, 0])))
        self.attendre_voix()

    # ── 06 ──────────────────────────────────────────────────────────────────

    def ecran_encadrer(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-encadrer")
        self.titre_ecran("6. Encadrer α")
        self.au_mot("changement de signe")
        self.play(FadeIn(self.t("on cherche un changement de signe", 34, ORANGE_RETENUE).move_to([-0.6, 2.2, 0])))
        lignes = [("f de 0 virgule 6", "f(0,6) ≈ −0,18", ROUGE_ERREUR, -3.0, 1.3),
                  ("f de 0 virgule 7", "f(0,7) ≈ 0,04", VERT_OK, 1.8, 1.3),
                  ("f de 0 virgule 68", "f(0,68) < 0", ROUGE_ERREUR, -3.0, -0.4),
                  ("f de 0 virgule 69", "f(0,69) > 0", VERT_OK, 1.8, -0.4)]
        for mot, txt, c, x, y in lignes:
            self.au_mot(mot)
            self.play(FadeIn(self.t(txt, 40, c).move_to([x, y, 0])))
            if mot.endswith("0 virgule 7"):
                self.play(Write(self.t("0,6 < α < 0,7", 46, JAUNE_TITRE).move_to([-0.6, 0.45, 0])))
        self.au_mot("Alpha est entre 0 virgule 68")
        self.play(Write(self.t("0,68 < α < 0,69", 52, JAUNE_TITRE).move_to([-0.6, -1.4, 0])))
        self.attendre_voix()

    # ── 07 ──────────────────────────────────────────────────────────────────

    def ecran_rediger(self):
        self.clear()
        self.add_mascotte()
        self.dire("07-rediger")
        self.titre_ecran("7. Rédiger comme au bac")
        y = 2.0
        for mot, num, txt in [("Un : f est continue", "1", "f est continue sur [0 ; 1] (polynôme)."),
                              ("Deux : f est strictement", "2", "f est strictement croissante sur [0 ; 1]."),
                              ("Trois : f de 0", "3", "f(0) = −1 < 0  et  f(1) = 1 > 0."),
                              ("Quatre : d'après", "4", "D'après le corollaire du TVI,")]:
            self.au_mot(mot)
            n = self.t(num, 36, JAUNE_TITRE).move_to([-5.6, y, 0])
            self.play(FadeIn(n), FadeIn(self.t(txt, 32).next_to(n, RIGHT, buff=0.35)))
            y -= 0.8
        self.play(FadeIn(self.t("f(x) = 0 admet une unique solution α dans [0 ; 1].", 32, VERT_OK).move_to([-0.6, y + 0.15, 0])))
        self.attendre_voix()

    # ── 08 ──────────────────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        self.au_mot("g de x égale exponentielle")
        self.play(GrowFromCenter(self.t("g(x) = eˣ + x", 80, BLEU_CALCUL).move_to([-0.6, 1.2, 0])))
        self.au_mot("Montre que")
        self.play(FadeIn(self.t("g(x) = 0 a une unique solution dans [−1 ; 0]", 36).move_to([-0.6, 0.0, 0])))
        self.au_mot("Rédige les quatre lignes")
        self.play(FadeIn(self.t("rédige les 4 lignes", 34, ORANGE_RETENUE).move_to([-0.6, -0.8, 0])))
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=36)))
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("08b-correction")
        self.titre_ecran("Correction")
        y = 2.0
        for mot, num, txt in [("Un : g est continue", "1", "g est continue (somme de fonctions continues)."),
                              ("Deux : g prime", "2", "g'(x) = eˣ + 1 > 0 : g strictement croissante."),
                              ("Trois : g de moins 1", "3", "g(−1) = e⁻¹ − 1 ≈ −0,63 < 0  et  g(0) = 1 > 0."),
                              ("Quatre : d'après", "4", "Corollaire du TVI : une unique solution dans [−1 ; 0].")]:
            self.au_mot(mot)
            n = self.t(num, 34, JAUNE_TITRE).move_to([-5.8, y, 0])
            self.play(FadeIn(n), FadeIn(self.t(txt, 30, VERT_OK if num == "4" else WHITE).next_to(n, RIGHT, buff=0.3)))
            y -= 0.85
        self.attendre_voix()

    def construct(self):
        self.page_de_garde()
        self.page_objectifs(OBJECTIFS)
        self.ecran_intuition()
        self.ecran_continuite()
        self.ecran_theoreme()
        self.ecran_appliquer()
        self.ecran_unicite()
        self.ecran_encadrer()
        self.ecran_rediger()
        self.ecran_defi()
        self.ecran_correction()
        self.page_finale(
            points=[
                "Continue + changement de signe : au moins une solution",
                "Strictement monotone en plus : une seule",
                "Au bac : continuité, monotonie, signes, conclusion",
            ],
            rappel="Piège : sans la stricte monotonie, pas d'unicité.",
            voix="09-finale",
        )
        self.page_abonnement(voix="10-abonne")
