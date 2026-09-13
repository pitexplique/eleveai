# fonctions_shorts.py
# EleveAI — les trois shorts de « Les maths, ça sert à rien… sauf à prévoir ».
# La vidéo paysage est dans `fonctions.py`.
#
# ⭐ UN SHORT PAR QUESTION, pas un par fonction : c'est la question que l'élève
# doit retenir, la fonction vient avec.
#   COMBIEN ?  → exponentielle   (rattachement coach : fonction_exponentielle)
#   QUAND ?    → logarithme      (rattachement coach : log_applications)
#   JUSQU'OÙ ? → fonction inverse (rattachement coach SECONDE, demandé par
#                Frédéric le 13/09 : « après on la met dans le coach seconde »)
#
# ⛔ Mêmes modèles chiffrés que la paysage, et vérifiés :
#   100 × 2¹⁰ = 102 400 ; 2ˣ = 10 000 → x = ln(10 000)/ln 2 ≈ 13,29.
# ⛔ Aucune graduation ≥ 1000 écrite par Manim : `Text` y met la virgule
# anglaise (« 1,200 »). Les axes en milliers ou en millions portent des
# libellés français posés à la main.
#
# Rendu (exemple) :
#   python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/bases/fonctions_shorts.py FonctionsShortCombien -o eleveai-maths-bases-fonctions-short-combien --media_dir manim/scripts/bases/media

import math
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from manim import *

from charte import *
from gabarit_bases import ShortBases
from gabarit_seconde import SONS

C_EXP = JAUNE_TITRE
C_LOG = BLEU_CALCUL
C_INV = VIOLET_ACCENT


class _Courbes:
    """Des axes étroits pour le 9:16, sans graduation verticale automatique."""

    def axes_court(self, x_range, y_range, labels_y, centre=(0.25, 0.4), x_len=3.3, y_len=2.5):
        axes = Axes(x_range=x_range, y_range=y_range, x_length=x_len, y_length=y_len, tips=False,
                    x_axis_config={"include_numbers": True, "label_constructor": Text, "font_size": 16},
                    y_axis_config={"include_numbers": False})
        axes.move_to([centre[0], centre[1], 0])
        grad = VGroup(*[Text(t, font_size=15, color=WHITE).next_to(axes.c2p(0, v), LEFT, buff=0.1)
                        for v, t in labels_y])
        return axes, grad


# ══════════════════════════════════════════════════════════════════════════════
#  COMBIEN ? — l'exponentielle
# ══════════════════════════════════════════════════════════════════════════════

class FonctionsShortCombien(ShortBases, _Courbes):

    dossier_voix = SONS / "bases-fonctions-short-combien"

    def ecran_accroche(self):
        self.clear()
        self.margo_bas()
        self.dire("00-accroche")
        bloc = VGroup(
            self.grand("100 vues", font_size=80, color=C_EXP),
            self.grand("aujourd'hui", font_size=34, color=WHITE),
            self.grand("× 2 chaque jour", font_size=44, color=BLEU_CALCUL),
        ).arrange(DOWN, buff=0.22).move_to([0, 2.0, 0])
        self.play(FadeIn(bloc, shift=DOWN * 0.14), run_time=0.5)
        q = VGroup(
            self.grand("dans 10 jours ?", font_size=48, color=WHITE),
            self.grand("1 000 ? 2 000 ?", font_size=36, color=ORANGE_RETENUE),
        ).arrange(DOWN, buff=0.2).move_to([0, -0.35, 0])
        self.play(FadeIn(q, shift=UP * 0.12), run_time=0.4)
        self.attendre_voix(marge=0.4)

    def axes_vues(self):
        return self.axes_court([0, 10, 2], [0, 120, 40],
                               [(40, "40 000"), (80, "80 000"), (120, "120 000")], centre=(0.45, -0.05))

    def ecran_rien(self):
        self.clear()
        self.margo_bas()
        self.dire("01-rien")
        self.play(Write(self.grand("Les premiers jours", font_size=36, color=JAUNE_TITRE).move_to([0, 3.1, 0])))
        liste = VGroup(*[self.grand(t, font_size=32, color=WHITE)
                         for t in ("J+1 : 200", "J+2 : 400", "J+3 : 800")]).arrange(DOWN, buff=0.12)
        liste.move_to([0, 2.05, 0])
        self.play(LaggedStart(*[FadeIn(l) for l in liste], lag_ratio=0.3))
        axes, grad = self.axes_vues()
        self.play(Create(axes), FadeIn(grad), run_time=0.7)
        courbe = axes.plot(lambda x: 0.1 * 2 ** x, x_range=[0, 7], color=C_EXP, stroke_width=6)
        self.play(Create(courbe), run_time=1.5, rate_func=linear)
        self.play(Write(self.grand("presque rien…", font_size=40, color=ORANGE_RETENUE).move_to([0, -2.0, 0])))
        self.attendre_voix(marge=0.4)

    def ecran_explose(self):
        self.clear()
        self.margo_bas()
        self.dire("02-explose")
        self.play(Write(self.grand("Puis elle s'envole", font_size=38, color=JAUNE_TITRE).move_to([0, 3.1, 0])))
        axes, grad = self.axes_vues()
        self.add(axes, grad)
        debut = axes.plot(lambda x: 0.1 * 2 ** x, x_range=[0, 7], color=C_EXP, stroke_width=6)
        self.add(debut)
        fin = axes.plot(lambda x: 0.1 * 2 ** x, x_range=[7, 10], color=C_EXP, stroke_width=6)
        self.play(Create(fin), run_time=1.2)
        pt = Dot(axes.c2p(10, 102.4), color=WHITE, radius=0.09)
        self.play(GrowFromCenter(pt), Flash(pt, color=C_EXP, line_length=0.3))
        res = VGroup(
            self.grand("102 400", font_size=64, color=VERT_OK),
            self.grand("vues dans 10 jours", font_size=32, color=WHITE),
        ).arrange(DOWN, buff=0.15).move_to([0, 2.15, 0])
        self.play(FadeIn(res, shift=UP * 0.12))
        self.attendre_voix(marge=0.4)

    def ecran_nom(self):
        self.clear()
        self.margo_bas()
        self.dire("03-nom")
        bloc = VGroup(
            self.grand("croissance", font_size=46, color=C_EXP),
            self.grand("exponentielle", font_size=46, color=C_EXP),
        ).arrange(DOWN, buff=0.15).move_to([0, 2.5, 0])
        self.play(FadeIn(bloc, shift=DOWN * 0.1))
        regle = VGroup(
            self.grand("on multiplie toujours", font_size=30, color=WHITE),
            self.grand("par le même nombre", font_size=30, color=WHITE),
        ).arrange(DOWN, buff=0.12).move_to([0, 1.0, 0])
        self.play(FadeIn(regle, shift=UP * 0.1))
        formule = VGroup(Text("f(x) = 100 × ", font_size=40, color=WHITE),
                         self.puissance("2", "x", font_size=40)).arrange(RIGHT, buff=0.06)
        formule.move_to([0, -0.35, 0])
        cadre = SurroundingRectangle(formule, color=C_EXP, buff=0.25, stroke_width=3)
        self.play(FadeIn(formule), Create(cadre))
        self.attendre_voix(marge=0.4)

    def ecran_retenir(self):
        self.clear()
        self.margo_bas()
        self.dire("04-retenir")
        mot = self.grand("COMBIEN ?", font_size=72, color=C_EXP).move_to([0, 2.3, 0])
        self.play(GrowFromCenter(mot), Flash(mot, color=C_EXP, line_length=0.4))
        bas = VGroup(
            self.grand("→ l'exponentielle", font_size=38, color=WHITE),
            self.grand("au début, elle a l'air", font_size=30, color=ORANGE_RETENUE),
            self.grand("de ne rien faire", font_size=30, color=ORANGE_RETENUE),
        ).arrange(DOWN, buff=0.22).move_to([0, 0.35, 0])
        for m in bas:
            self.play(FadeIn(m, shift=UP * 0.1), run_time=0.4)
        self.attendre_voix(marge=0.4)

    def construct(self):
        self.ecran_accroche(); self.ecran_rien(); self.ecran_explose()
        self.ecran_nom(); self.ecran_retenir(); self.ecran_renvoi()


# ══════════════════════════════════════════════════════════════════════════════
#  QUAND ? — le logarithme
# ══════════════════════════════════════════════════════════════════════════════

class FonctionsShortQuand(ShortBases, _Courbes):

    dossier_voix = SONS / "bases-fonctions-short-quand"

    def ecran_accroche(self):
        self.clear()
        self.margo_bas()
        self.dire("00-accroche")
        bloc = VGroup(
            self.grand("100 000 vues", font_size=62, color=C_EXP),
            self.grand("en 10 jours", font_size=38, color=WHITE),
        ).arrange(DOWN, buff=0.2).move_to([0, 2.3, 0])
        self.play(FadeIn(bloc, shift=DOWN * 0.14), run_time=0.5)
        q = VGroup(
            self.grand("le MILLION ?", font_size=54, color=C_LOG),
            self.grand("encore 100 jours ?", font_size=36, color=ORANGE_RETENUE),
        ).arrange(DOWN, buff=0.22).move_to([0, 0.2, 0])
        self.play(FadeIn(q, shift=UP * 0.12), run_time=0.4)
        self.attendre_voix(marge=0.4)

    def ecran_question(self):
        self.clear()
        self.margo_bas()
        self.dire("01-question")
        bloc = VGroup(
            self.grand("on connaît", font_size=36, color=WHITE),
            self.grand("le RÉSULTAT", font_size=46, color=VERT_OK),
            self.grand("on cherche", font_size=36, color=WHITE),
            self.grand("le TEMPS", font_size=46, color=C_LOG),
        ).arrange(DOWN, buff=0.2).move_to([0, 1.7, 0])
        for m in bloc:
            self.play(FadeIn(m, shift=UP * 0.1), run_time=0.38)
        note = self.grand("la question inverse", font_size=34, color=JAUNE_TITRE).move_to([0, -0.85, 0])
        self.play(FadeIn(note, shift=UP * 0.1))
        self.attendre_voix(marge=0.4)

    def ecran_log(self):
        self.clear()
        self.margo_bas()
        self.dire("02-log")
        self.play(Write(self.grand("le LOGARITHME", font_size=44, color=C_LOG).move_to([0, 3.15, 0])))
        axes, grad = self.axes_court([0, 14, 2], [0, 1800, 600],
                                     [(600, "0,6 M"), (1200, "1,2 M"), (1800, "1,8 M")], centre=(0.45, 1.25))
        self.play(Create(axes), FadeIn(grad), run_time=0.7)
        courbe = axes.plot(lambda x: 0.1 * 2 ** x, x_range=[0, 14], color=C_EXP, stroke_width=5)
        self.play(Create(courbe), run_time=1.2, rate_func=linear)
        x_m = math.log(10_000) / math.log(2)
        h = DashedLine(axes.c2p(0, 1000), axes.c2p(x_m, 1000), color=C_LOG, stroke_width=3)
        v = DashedLine(axes.c2p(x_m, 1000), axes.c2p(x_m, 0), color=C_LOG, stroke_width=3)
        self.play(Create(h))
        self.play(Create(v))
        calc = VGroup(
            VGroup(self.puissance("2", "x", font_size=30), Text(" = 10 000", font_size=30, color=WHITE)).arrange(RIGHT, buff=0.08),
            self.grand("x = ln(10 000) ÷ ln 2", font_size=28, color=VERT_OK),
        ).arrange(DOWN, buff=0.22).move_to([0, -1.2, 0])
        for m in calc:
            self.play(FadeIn(m, shift=UP * 0.1), run_time=0.45)
        self.attendre_voix(marge=0.4)

    def ecran_reponse(self):
        self.clear()
        self.margo_bas()
        self.dire("03-reponse")
        res = VGroup(
            self.grand("≈ 13,3", font_size=84, color=C_LOG),
            self.grand("jours", font_size=44, color=WHITE),
        ).arrange(DOWN, buff=0.12).move_to([0, 2.2, 0])
        self.play(GrowFromCenter(res), Flash(res[0], color=C_LOG, line_length=0.4))
        bas = VGroup(
            self.grand("à peine 3 jours", font_size=40, color=VERT_OK),
            self.grand("après les 100 000", font_size=34, color=WHITE),
        ).arrange(DOWN, buff=0.18).move_to([0, 0.05, 0])
        self.play(FadeIn(bas, shift=UP * 0.12))
        self.attendre_voix(marge=0.4)

    def ecran_retenir(self):
        self.clear()
        self.margo_bas()
        self.dire("04-retenir")
        mot = self.grand("QUAND ?", font_size=78, color=C_LOG).move_to([0, 2.3, 0])
        self.play(GrowFromCenter(mot), Flash(mot, color=C_LOG, line_length=0.4))
        bas = VGroup(
            self.grand("→ le logarithme", font_size=38, color=WHITE),
            self.grand("les derniers zéros", font_size=32, color=ORANGE_RETENUE),
            self.grand("arrivent très vite", font_size=32, color=ORANGE_RETENUE),
        ).arrange(DOWN, buff=0.22).move_to([0, 0.35, 0])
        for m in bas:
            self.play(FadeIn(m, shift=UP * 0.1), run_time=0.4)
        self.attendre_voix(marge=0.4)

    def construct(self):
        self.ecran_accroche(); self.ecran_question(); self.ecran_log()
        self.ecran_reponse(); self.ecran_retenir(); self.ecran_renvoi()


# ══════════════════════════════════════════════════════════════════════════════
#  JUSQU'OÙ ? — la fonction inverse (→ coach de seconde)
# ══════════════════════════════════════════════════════════════════════════════

class FonctionsShortJusquou(ShortBases, _Courbes):

    dossier_voix = SONS / "bases-fonctions-short-jusquou"

    def ecran_accroche(self):
        self.clear()
        self.margo_bas()
        self.dire("00-accroche")
        g = self.disque(8, 1, rayon=1.0, couleur=C_INV).move_to([0, 2.2, 0])
        self.play(FadeIn(g), run_time=0.45)
        q = VGroup(
            self.grand("de plus en plus", font_size=36, color=WHITE),
            self.grand("de monde…", font_size=36, color=WHITE),
            self.grand("ta part = 0 ?", font_size=54, color=ORANGE_RETENUE),
        ).arrange(DOWN, buff=0.2).move_to([0, -0.05, 0])
        self.play(FadeIn(q, shift=UP * 0.12), run_time=0.45)
        self.attendre_voix(marge=0.4)

    def ecran_parts(self):
        self.clear()
        self.margo_bas()
        self.dire("01-parts")
        # ⚠️ Même taille pour les quatre lignes, puis on borne le GROUPE : sinon
        # la plus longue rétrécit seule (défaut des fractions, 11/09).
        lignes = VGroup(*[Text(t, font_size=34, color=c) for t, c in [
            ("2  →  1/2", WHITE), ("10  →  1/10", WHITE),
            ("100  →  1/100", WHITE), ("1 000 000  →  1/1 000 000", C_INV)]]).arrange(DOWN, buff=0.38)
        if lignes.width > config.frame_width - 0.5:
            lignes.scale_to_fit_width(config.frame_width - 0.5)
        lignes.move_to([0, 1.6, 0])
        for l in lignes:
            self.play(FadeIn(l, shift=RIGHT * 0.1), run_time=0.45)
        self.attendre_voix(marge=0.4)

    def ecran_courbe(self):
        self.clear()
        self.margo_bas()
        self.dire("02-courbe")
        self.play(Write(self.grand("ta part rétrécit", font_size=38, color=JAUNE_TITRE).move_to([0, 3.15, 0])))
        axes, grad = self.axes_court([0, 10, 2], [0, 1, 1], [(1, "1")], centre=(0.3, 0.9))
        self.play(Create(axes), FadeIn(grad), run_time=0.7)
        courbe = axes.plot(lambda x: 1 / x, x_range=[1, 10], color=C_INV, stroke_width=6)
        self.play(Create(courbe), run_time=1.4)
        bas = VGroup(
            self.grand("mais 1/x", font_size=40, color=WHITE),
            self.grand("n'est JAMAIS zéro", font_size=40, color=VERT_OK),
        ).arrange(DOWN, buff=0.18).move_to([0, -1.4, 0])
        self.play(FadeIn(bas, shift=UP * 0.12))
        self.attendre_voix(marge=0.4)

    def ecran_nom(self):
        self.clear()
        self.margo_bas()
        self.dire("03-nom")
        titre = self.grand("fonction inverse", font_size=48, color=C_INV).move_to([0, 2.7, 0])
        self.play(FadeIn(titre, shift=DOWN * 0.1))
        formule = VGroup(Text("f(x) =", font_size=46, color=WHITE),
                         self.fraction("1", "x", font_size=46)).arrange(RIGHT, buff=0.2).move_to([0, 1.3, 0])
        cadre = SurroundingRectangle(formule, color=C_INV, buff=0.25, stroke_width=3)
        self.play(FadeIn(formule), Create(cadre))
        bas = VGroup(
            self.grand("elle s'approche de zéro", font_size=30, color=WHITE),
            self.grand("sans jamais le toucher", font_size=30, color=VERT_OK),
        ).arrange(DOWN, buff=0.15).move_to([0, -0.4, 0])
        self.play(FadeIn(bas, shift=UP * 0.1))
        self.attendre_voix(marge=0.4)

    def ecran_retenir(self):
        self.clear()
        self.margo_bas()
        self.dire("04-retenir")
        mot = self.grand("JUSQU'OÙ ?", font_size=68, color=C_INV).move_to([0, 2.3, 0])
        self.play(GrowFromCenter(mot), Flash(mot, color=C_INV, line_length=0.4))
        bas = VGroup(
            self.grand("→ la fonction inverse", font_size=34, color=WHITE),
            self.grand("aussi près qu'on veut", font_size=32, color=VERT_OK),
            self.grand("jamais jusqu'au bout", font_size=32, color=ORANGE_RETENUE),
        ).arrange(DOWN, buff=0.22).move_to([0, 0.35, 0])
        for m in bas:
            self.play(FadeIn(m, shift=UP * 0.1), run_time=0.4)
        self.attendre_voix(marge=0.4)

    def construct(self):
        self.ecran_accroche(); self.ecran_parts(); self.ecran_courbe()
        self.ecran_nom(); self.ecran_retenir(); self.ecran_renvoi()
