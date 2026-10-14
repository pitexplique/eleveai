# litteral_calcul_short.py
# EleveAI — Maths 5e — les sept shorts du calcul littéral, un par micro.
# Voix validées le 09/10/2026 (« go ») : manim/voix/5e-litteral-calcul-short-<nom>.json
# Ils renvoient à la vidéo longue (litteral_calcul.py, https://youtu.be/c8ScGIErxJM).
# Même déroulé que les shorts des relatifs : question, piège, explication, règle,
# défi, renvoi. Le dessin des SACS de x billes revient dans « réduire » et
# « développer », comme dans la paysage.
#
# Rendu :
#   python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/5e/litteral_calcul_short.py <Classe> -o eleveai-maths-5e-litteral-calcul-short-<nom> --media_dir manim/scripts/5e/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from manim import *

from charte import *
from gabarit_sixieme import Short6e

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "seconde"))
from signes_expression_2de import echelle_ceintures  # noqa: E402

SAC = "#8B5E3C"
BILLE = "#60A5FA"


class _ShortLit5e(Short6e):
    """Les briques communes des shorts du calcul littéral."""

    def ouvrir(self, voix):
        self.clear()
        self.margo_bas()
        self.dire(voix)

    def pile(self, lignes, y, buff=0.18):
        g = VGroup(*[self.grand(t, font_size=s, color=c) for t, s, c in lignes]).arrange(DOWN, buff=buff)
        return g.move_to([0, y, 0])

    def faux(self, y=-1.2):
        f = self.grand("FAUX !", font_size=90, color=ROUGE_ERREUR).rotate(0.15).move_to([0, y, 0])
        self.play(FadeIn(f, scale=2.0))

    def barrer(self, mob, color=ROUGE_ERREUR):
        return Line(mob.get_corner(DL) + LEFT * 0.06, mob.get_corner(UR) + RIGHT * 0.06,
                    stroke_width=5, color=color)

    def sac(self, h=0.5):
        corps = RoundedRectangle(width=h * 0.85, height=h, corner_radius=0.1,
                                 fill_color=SAC, fill_opacity=1, stroke_color=WHITE, stroke_width=1.5)
        x = Text("x", font_size=int(h * 44), color=WHITE).move_to(corps.get_center())
        return VGroup(corps, x)

    def bille(self, r=0.1):
        return Circle(radius=r, fill_color=BILLE, fill_opacity=1, stroke_color=WHITE, stroke_width=1)

    def rangee(self, n_sacs, n_billes=0, buff=0.1):
        return VGroup(*[self.sac() for _ in range(n_sacs)],
                      *[self.bille() for _ in range(n_billes)]).arrange(RIGHT, buff=buff)

    def echelle(self):
        """⭐ 13/10 (Frédéric) : l'échelle des 7 ceintures, la blanche en couleur."""
        e = echelle_ceintures("blanche").scale_to_fit_width(config.frame_width * 0.7).move_to([0, 3.2, 0])
        self.play(FadeIn(e), run_time=0.5)

    def accroche(self, lignes, y=1.0):
        self.ouvrir("00-accroche")
        self.echelle()
        self.play(FadeIn(self.pile(lignes, y), scale=1.1))
        self.attendre_voix(marge=0.4)

    def piege(self, voix, faux_txt, raison, mot_raison, mot_faux="Et c'est faux"):
        self.ouvrir(voix)
        self.play(FadeIn(self.grand(faux_txt, font_size=80, color=ORANGE_RETENUE).move_to([0, 2.1, 0]), scale=1.3))
        self.au_mot(mot_raison)
        self.play(Write(self.pile(raison, 0.6)))
        self.au_mot(mot_faux)
        self.faux(-1.2)
        self.attendre_voix(marge=0.4)

    def defi(self, lignes, mot="À toi"):
        self.ouvrir("04-defi")
        self.play(Write(self.grand("À toi !", font_size=56, color=JAUNE_TITRE).move_to([0, 2.4, 0])))
        self.play(FadeIn(self.pile(lignes, 0.5), shift=UP * 0.2))
        self.attendre_voix(marge=2.0)


# ── 1. Comprendre (litteral_expression_comprendre) ──────────────────────────

class ShortComprendreLitteral5e(_ShortLit5e):
    nom_voix = "5e-litteral-calcul-short-comprendre"

    def construct(self):
        self.accroche([("x = 2", 60, JAUNE_TITRE), ("3x = ?", 110, BLEU_CALCUL)])
        self.piege("01-piege", "32 ?", [("on colle", 40, WHITE), ("le 3 et le 2", 40, WHITE)], "On colle")

        self.ouvrir("02-sens")
        self.play(Write(self.grand("3x", font_size=110, color=BLEU_CALCUL).move_to([0, 2.2, 0])))
        self.au_mot("ça veut dire 3 fois x")
        self.play(FadeIn(self.grand("= 3 × x", font_size=70, color=BLEU_CALCUL).move_to([0, 1.0, 0])))
        self.au_mot("Le signe fois est caché")
        self.play(FadeIn(self.grand("le × est caché", font_size=38, color=ORANGE_RETENUE).move_to([0, 0.1, 0])))
        self.au_mot("Pour x égale 2")
        self.play(Write(self.pile([("x = 2 :", 40, JAUNE_TITRE), ("3 × 2 = 6", 64, VERT_OK)], -1.3)))
        self.attendre_voix(marge=0.4)

        self.ouvrir("03-regle")
        self.play(FadeIn(self.pile([("nombre collé", 38, WHITE), ("à une lettre", 38, WHITE),
                                    ("= multiplication", 40, VERT_OK)], 2.0)))
        self.au_mot("Ce nombre s'appelle")
        self.play(Write(self.grand("le coefficient", font_size=44, color=VERT_OK).move_to([0, 0.4, 0])))
        self.au_mot("Et 3 plus x")
        self.play(FadeIn(self.pile([("3 + x : le +", 40, ORANGE_RETENUE), ("ne se cache jamais", 36, ORANGE_RETENUE)], -1.1)))
        self.attendre_voix(marge=0.4)

        self.defi([("a = 5", 60, JAUNE_TITRE), ("4a = ?", 90, BLEU_CALCUL)])
        self.ecran_renvoi("05-fin")


# ── 2. Traduire (litteral_traduire) ─────────────────────────────────────────

class ShortTraduireLitteral5e(_ShortLit5e):
    nom_voix = "5e-litteral-calcul-short-traduire"

    def construct(self):
        self.accroche([("« le triple de n,", 40, BLEU_CALCUL), ("diminué de 4 »", 40, BLEU_CALCUL),
                       ("Comment l'écrire ?", 44, JAUNE_TITRE)])
        self.piege("01-piege", "3(n − 4) ?", [("on enlève 4", 38, WHITE), ("avant de tripler", 38, WHITE)], "Beaucoup écrivent")

        self.ouvrir("02-ordre")
        self.play(Write(self.grand("On lit dans l'ordre", font_size=40, color=JAUNE_TITRE).move_to([0, 2.5, 0])))
        self.au_mot("D'abord le triple")
        self.play(FadeIn(self.pile([("le triple de n", 36, WHITE), ("3n", 64, BLEU_CALCUL)], 1.3)))
        self.au_mot("Ensuite, diminué de 4")
        self.play(FadeIn(self.pile([("diminué de 4", 36, WHITE), ("− 4", 64, BLEU_CALCUL)], -0.1)))
        self.au_mot("On obtient")
        self.play(GrowFromCenter(self.grand("3n − 4", font_size=90, color=VERT_OK).move_to([0, -1.5, 0])))
        self.attendre_voix(marge=0.4)

        self.ouvrir("03-preuve")
        self.play(Write(self.grand("Test : n = 10", font_size=48, color=JAUNE_TITRE).move_to([0, 2.5, 0])))
        self.au_mot("3 n moins 4 : 30")
        self.play(FadeIn(self.pile([("3n − 4", 44, VERT_OK), ("30 − 4 = 26", 44, VERT_OK)], 1.2)))
        self.au_mot("Et 3 fois, parenthèse")
        self.play(FadeIn(self.pile([("3(n − 4)", 44, ORANGE_RETENUE), ("3 × 6 = 18", 44, ORANGE_RETENUE)], -0.4)))
        self.au_mot("Deux résultats différents")
        self.play(Write(self.pile([("26 ≠ 18", 56, ROUGE_ERREUR), ("pas la même expression", 32, WHITE)], -1.85)))
        self.attendre_voix(marge=0.4)

        self.defi([("« le double de x,", 40, WHITE), ("augmenté de 7 »", 40, WHITE), ("Écris-le !", 50, BLEU_CALCUL)])
        self.ecran_renvoi("05-fin")


# ── 3. Substituer (litteral_substituer) ─────────────────────────────────────

class ShortSubstituerLitteral5e(_ShortLit5e):
    nom_voix = "5e-litteral-calcul-short-substituer"

    def construct(self):
        self.accroche([("x = −2", 60, JAUNE_TITRE), ("5 − 3x = ?", 90, BLEU_CALCUL)])
        self.piege("01-piege", "−1 ?", [("x est négatif :", 38, WHITE), ("on l'a oublié", 38, WHITE)], "Ils oublient")

        self.ouvrir("02-parentheses")
        self.play(Write(self.grand("5 − 3x", font_size=70, color=BLEU_CALCUL).move_to([0, 2.4, 0])))
        self.au_mot("Je remplace x par moins 2")
        e = self.grand("5 − 3 × (−2)", font_size=60).move_to([0, 1.1, 0])
        self.play(Write(e))
        self.play(Indicate(VGroup(e[4], e[7]), color=ORANGE_RETENUE, scale_factor=1.6))
        self.au_mot("D'abord la multiplication")
        self.play(FadeIn(self.pile([("d'abord ×", 36, JAUNE_TITRE), ("3 × (−2) = −6", 52, VERT_OK)], -0.5)))
        self.attendre_voix(marge=0.4)

        self.ouvrir("03-calcul")
        self.play(Write(self.grand("5 − (−6)", font_size=80, color=BLEU_CALCUL).move_to([0, 2.2, 0])))
        self.au_mot("Enlever moins 6")
        self.play(FadeIn(self.pile([("enlever −6", 40, WHITE), ("= ajouter 6", 40, VERT_OK)], 0.8)))
        self.au_mot("5 plus 6")
        self.play(GrowFromCenter(self.grand("5 + 6 = 11", font_size=72, color=VERT_OK).move_to([0, -0.5, 0])))
        self.au_mot("Avec un négatif")
        self.play(FadeIn(self.pile([("négatif :", 34, ORANGE_RETENUE), ("toujours des ( )", 40, ORANGE_RETENUE)], -1.7)))
        self.attendre_voix(marge=0.4)

        self.defi([("x = −1", 60, JAUNE_TITRE), ("4 − 2x = ?", 90, BLEU_CALCUL)])
        self.ecran_renvoi("05-fin")


# ── 4. Réduire (litteral_reduire) ───────────────────────────────────────────

class ShortReduireLitteral5e(_ShortLit5e):
    nom_voix = "5e-litteral-calcul-short-reduire"

    def construct(self):
        self.accroche([("2x + 3 + 4x + 1", 54, BLEU_CALCUL), ("= 10x ?", 90, JAUNE_TITRE)])
        self.piege("01-piege", "10x ?", [("2 + 3 + 4 + 1", 40, WHITE), ("= 10 ?", 40, WHITE)], "Beaucoup additionnent")

        self.ouvrir("02-trier")
        self.play(Write(self.grand("On trie", font_size=56, color=JAUNE_TITRE).move_to([0, 2.6, 0])))
        self.au_mot("D'un côté les sacs")
        sacs = VGroup(self.rangee(2), self.grand("+", font_size=40), self.rangee(4)).arrange(RIGHT, buff=0.2)
        self.play(FadeIn(self.pile([("les x :", 36, VERT_OK), ("2x + 4x", 50, VERT_OK)], 1.6)),
                  FadeIn(sacs.move_to([0, 0.6, 0])))
        self.au_mot("De l'autre, les billes")
        billes = VGroup(self.rangee(0, 3), self.grand("+", font_size=40), self.rangee(0, 1)).arrange(RIGHT, buff=0.2)
        self.play(FadeIn(self.pile([("les nombres :", 36, BLEU_CALCUL), ("3 + 1", 50, BLEU_CALCUL)], -0.5)),
                  FadeIn(billes.move_to([0, -1.5, 0])))
        self.attendre_voix(marge=0.4)

        self.ouvrir("03-regrouper")
        self.play(FadeIn(self.grand("2x + 4x = 6x", font_size=56, color=VERT_OK).move_to([0, 2.2, 0])))
        self.play(FadeIn(self.rangee(6).move_to([0, 1.4, 0])))
        self.au_mot("3 plus 1")
        self.play(FadeIn(self.grand("3 + 1 = 4", font_size=56, color=BLEU_CALCUL).move_to([0, 0.5, 0])))
        self.au_mot("Le résultat")
        self.play(GrowFromCenter(self.grand("6x + 4", font_size=96, color=VERT_OK).move_to([0, -0.6, 0])))
        self.au_mot("Les x avec les x")
        self.play(FadeIn(self.pile([("les x avec les x,", 34, ORANGE_RETENUE), ("les nombres avec", 34, ORANGE_RETENUE), ("les nombres", 34, ORANGE_RETENUE)], -1.9, buff=0.1)))
        self.attendre_voix(marge=0.4)

        self.defi([("Réduis :", 44, WHITE), ("5x + 2 + x + 8", 56, BLEU_CALCUL)])
        self.ecran_renvoi("05-fin")


# ── 5. Tester (litteral_tester) ─────────────────────────────────────────────

class ShortTesterLitteral5e(_ShortLit5e):
    nom_voix = "5e-litteral-calcul-short-tester"

    def construct(self):
        self.accroche([("x + x = x × x", 60, BLEU_CALCUL), ("vrai pour x = 2 ?", 44, JAUNE_TITRE)])

        self.ouvrir("01-calcul")
        self.play(Write(self.grand("x = 2", font_size=60, color=JAUNE_TITRE).move_to([0, 2.5, 0])))
        self.au_mot("x plus x : 2 plus 2")
        self.play(FadeIn(self.grand("x + x = 2 + 2 = 4", font_size=44).move_to([0, 1.4, 0])))
        self.au_mot("x fois x : 2 fois 2")
        self.play(FadeIn(self.grand("x × x = 2 × 2 = 4", font_size=44).move_to([0, 0.5, 0])))
        self.au_mot("4 égale 4")
        self.play(Write(self.pile([("4 = 4", 64, VERT_OK), ("vraie pour x = 2", 40, VERT_OK)], -0.9)))
        self.attendre_voix(marge=0.4)

        self.ouvrir("02-piege")
        self.play(FadeIn(self.pile([("toujours", 60, ORANGE_RETENUE), ("vraie ?", 60, ORANGE_RETENUE)], 1.8), scale=1.3))
        self.au_mot("Et c'est faux")
        self.faux(-0.8)
        self.attendre_voix(marge=0.4)

        self.ouvrir("03-contre")
        self.play(Write(self.grand("x = 3", font_size=60, color=JAUNE_TITRE).move_to([0, 2.5, 0])))
        self.au_mot("x plus x : 6")
        self.play(FadeIn(self.grand("x + x = 6", font_size=50).move_to([0, 1.5, 0])))
        self.au_mot("x fois x : 9")
        self.play(FadeIn(self.grand("x × x = 9", font_size=50).move_to([0, 0.6, 0])))
        self.au_mot("6 n'est pas égal")
        self.play(Write(self.grand("6 ≠ 9", font_size=70, color=ROUGE_ERREUR).move_to([0, -0.4, 0])))
        self.au_mot("Vraie pour une valeur")
        self.play(FadeIn(self.pile([("vraie pour UNE valeur", 32, ORANGE_RETENUE), ("≠ vraie pour TOUTES", 32, ORANGE_RETENUE)], -1.6)))
        self.attendre_voix(marge=0.4)

        self.defi([("2x + 1 = 7", 64, BLEU_CALCUL), ("vraie pour x = 3 ?", 38, WHITE), ("et pour x = 4 ?", 38, WHITE)])
        self.ecran_renvoi("05-fin")


# ── 6. Développer (litteral_distributivite) ─────────────────────────────────

class ShortDevelopperLitteral5e(_ShortLit5e):
    nom_voix = "5e-litteral-calcul-short-developper"

    def construct(self):
        self.accroche([("5(x − 2)", 90, BLEU_CALCUL), ("= 5x − 2 ?", 64, JAUNE_TITRE)])
        self.piege("01-piege", "5x − 2 ?", [("le 2 n'a pas été", 38, WHITE), ("multiplié", 38, WHITE)], "Beaucoup oublient")

        self.ouvrir("02-sacs")
        e = self.grand("5(x − 2)", font_size=80, color=BLEU_CALCUL).move_to([0, 2.4, 0])
        self.play(Write(e))
        self.au_mot("un sac de x billes")
        paquets = VGroup()
        for _ in range(5):
            s = self.sac()
            b = VGroup(self.bille(), self.bille()).arrange(RIGHT, buff=0.06).next_to(s, RIGHT, buff=0.08)
            moins = VGroup(*[Line(o.get_corner(DL), o.get_corner(UR), color=ROUGE_ERREUR, stroke_width=3) for o in b])
            paquets.add(VGroup(s, b, moins))
        paquets.arrange(DOWN, buff=0.12).move_to([0, 0.4, 0])
        self.play(LaggedStart(*[FadeIn(p[0]) for p in paquets], lag_ratio=0.15))
        self.au_mot("auquel on enlève 2 billes")
        self.play(*[FadeIn(p[1]) for p in paquets])
        self.play(*[Create(p[2]) for p in paquets])
        self.au_mot("5 sacs, et 5 fois 2")
        self.play(FadeIn(self.pile([("5 sacs,", 34, VERT_OK), ("5 × 2 billes en moins", 32, ORANGE_RETENUE)], -1.6)))
        self.attendre_voix(marge=0.4)

        self.ouvrir("03-regle")
        e = self.grand("5(x − 2)", font_size=80, color=BLEU_CALCUL).move_to([0, 2.3, 0])
        self.add(e)
        f1 = CurvedArrow(e[0].get_top(), e[2].get_top(), angle=-PI / 2, color=VERT_OK)
        self.play(Create(f1), FadeIn(self.grand("5 × x = 5x", font_size=50, color=VERT_OK).move_to([0, 1.1, 0])))
        self.au_mot("5 fois 2 : 10")
        f2 = CurvedArrow(e[0].get_top(), e[4].get_top(), angle=-PI / 2, color=ORANGE_RETENUE)
        self.play(Create(f2), FadeIn(self.grand("5 × 2 = 10", font_size=50, color=ORANGE_RETENUE).move_to([0, 0.3, 0])))
        self.au_mot("On obtient")
        self.play(GrowFromCenter(self.grand("5x − 10", font_size=90, color=VERT_OK).move_to([0, -0.8, 0])))
        self.au_mot("Le 5 multiplie tout")
        self.play(FadeIn(self.pile([("le 5 multiplie", 34, ORANGE_RETENUE), ("TOUT dans la ( )", 34, ORANGE_RETENUE)], -1.9)))
        self.attendre_voix(marge=0.4)

        self.defi([("Développe :", 44, WHITE), ("4(x + 3)", 90, BLEU_CALCUL)])
        self.ecran_renvoi("05-fin")


# ── 7. Défi (litteral_defi) ─────────────────────────────────────────────────

class ShortDefiLitteral5e(_ShortLit5e):
    nom_voix = "5e-litteral-calcul-short-defi"

    def rectangle(self, y):
        r = Rectangle(width=3.0, height=1.5, color=WHITE, stroke_width=4).move_to([0, y, 0])
        lg = self.grand("x + 3", font_size=36, color=BLEU_CALCUL).next_to(r, UP, buff=0.12)
        la = self.grand("x", font_size=36, color=VERT_OK).next_to(r, LEFT, buff=0.12)
        return VGroup(r, lg, la)

    def construct(self):
        self.ouvrir("00-accroche")
        self.echelle()
        self.play(Create(self.rectangle(1.6)))
        self.au_mot("Quel est son périmètre")
        self.play(Write(self.grand("Périmètre ?", font_size=60, color=JAUNE_TITRE).move_to([0, -0.4, 0])))
        self.attendre_voix(marge=0.4)

        self.piege("01-piege", "x + 3 + x ?", [("il manque", 40, WHITE), ("deux côtés", 40, WHITE)], "Ils oublient")

        self.ouvrir("02-tour")
        rect = self.rectangle(2.0)
        self.add(rect)
        self.au_mot("le tour")
        self.play(ShowPassingFlash(rect[0].copy().set_stroke(JAUNE_TITRE, 8), time_width=0.6, run_time=1.5))
        self.au_mot("deux longueurs et deux largeurs")
        self.play(FadeIn(self.grand("2 longueurs + 2 largeurs", font_size=30).move_to([0, 0.6, 0])))
        self.au_mot("2 fois, parenthèse")
        self.play(Write(self.grand("2(x + 3) + 2x", font_size=54, color=BLEU_CALCUL).move_to([0, -0.3, 0])))
        self.au_mot("Je développe")
        self.play(Write(self.grand("= 2x + 6 + 2x", font_size=54, color=BLEU_CALCUL).move_to([0, -1.2, 0])))
        self.attendre_voix(marge=0.4)

        self.ouvrir("03-reduire")
        self.play(FadeIn(self.grand("2x + 6 + 2x", font_size=54, color=BLEU_CALCUL).move_to([0, 2.5, 0])))
        self.au_mot("Le périmètre, c'est")
        self.play(GrowFromCenter(self.grand("= 4x + 6", font_size=84, color=VERT_OK).move_to([0, 1.4, 0])))
        self.au_mot("Vérifions")
        self.play(FadeIn(self.pile([("x = 5 :", 40, JAUNE_TITRE), ("4 × 5 + 6 = 26", 46, WHITE)], 0.0)))
        self.au_mot("Et le rectangle de 8 sur 5")
        self.play(FadeIn(self.pile([("8 + 5 + 8 + 5", 44, VERT_OK), ("= 26", 50, VERT_OK)], -1.6)))
        self.attendre_voix(marge=0.4)

        self.defi([("Un carré de côté", 40, WHITE), ("x + 2", 80, BLEU_CALCUL), ("Son périmètre ?", 44, WHITE)])
        self.ecran_renvoi("05-fin")
