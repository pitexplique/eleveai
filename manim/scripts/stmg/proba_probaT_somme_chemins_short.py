# proba_probaT_somme_chemins_short.py
# EleveAI — Maths STMG ET Maths 1re (tronc commun) — short jumeau de
# « Plusieurs chemins vers le même événement : on additionne ».
# CEINTURE JAUNE. Il AMUSE : une roue (secteur or / gris) décide du sac où l'on
# pioche ; sac rouge 0,5 de gagner, sac bleu 0,1. « La moyenne, 0,3 ? » Non !
#   · en HAUT la roue qui tourne, les deux sacs de billes, la bille qui saute ;
#   · en BAS, EN MÊME TEMPS : le petit arbre (or / gris → gagné) qui se remplit,
#     les deux chemins 0,1 et 0,08, la somme 0,18 ;
#   · fin : la roue passe à une fois sur deux, « Réponds en commentaire ! ».
# Ti-Margo en bas (margo_bas). Aucun nom de personne, aucune classe à l'écran :
# UN SEUL rendu suffit, copié sous les deux noms (STMG, 1re). Les deux
# sous-classes existent quand même, identiques.
# ⛔ PAS D'ÉCART : le 0,8 de la branche grise n'apparaît que quand la voix le dit.
#
# Voix : manim/voix/stmg-premiere-proba-somme-chemins-short.json (débit −7).
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/proba_probaT_somme_chemins_short.py ShortProbaSommeCheminsSTMG -o eleveai-maths-stmg-proba-somme-chemins-short --media_dir manim/scripts/stmg/media-probaT_somme_chemins
# (ShortProbaSommeCheminsPremiere donne la même image.) Copier dans
# manim/sorties/stmg/maths/probabilites/11-somme-chemins/ et
# manim/sorties/premiere-commun/maths/probabilites/11-somme-chemins/
# (eleveai-maths-premiere-commun-proba-somme-chemins-short.mp4).

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from proba_probaT_somme_chemins import P, pastille, suite  # noqa: E402  (pose les chemins)

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

LARGEUR_MAX = 4.1
OR = "#FBBF24"
GRIS = "#9CA3AF"
ROUGE_SAC = "#DC2626"
BLEU_SAC = "#2563EB"
GAGNE = "#22C55E"
PERDU = "#E5E7EB"
CENTRE_ROUE = P(-1.25, 0.8)
R_ROUE = 0.72


def secteurs(part_or):
    """La roue : le secteur or (part_or du tour) centré en haut, le reste gris."""
    a = TAU * part_or
    s_or = AnnularSector(inner_radius=0, outer_radius=R_ROUE, angle=a, start_angle=PI / 2 - a / 2,
                         fill_color=OR, fill_opacity=1, stroke_color=WHITE, stroke_width=3)
    s_gris = AnnularSector(inner_radius=0, outer_radius=R_ROUE, angle=TAU - a, start_angle=PI / 2 + a / 2,
                           fill_color=GRIS, fill_opacity=1, stroke_color=WHITE, stroke_width=3)
    return VGroup(s_or, s_gris).shift(CENTRE_ROUE)


def fleche_roue():
    return Triangle(fill_color=WHITE, fill_opacity=1, stroke_width=0).scale(0.13).rotate(PI).move_to(
        CENTRE_ROUE + UP * (R_ROUE + 0.12))


def sac(couleur, gagnants, centre):
    corps = RoundedRectangle(width=1.0, height=0.95, corner_radius=0.3, fill_color=couleur, fill_opacity=1,
                             stroke_color=WHITE, stroke_width=2)
    col = Polygon(P(-0.25, 0.47), P(0.25, 0.47), P(0.14, 0.62), P(-0.14, 0.62), fill_color=couleur,
                  fill_opacity=1, stroke_color=WHITE, stroke_width=2)
    noeud = Line(P(-0.2, 0.55), P(0.2, 0.55), color=WHITE, stroke_width=4)
    billes = VGroup(*[Circle(radius=0.075, fill_color=GAGNE if k < gagnants else PERDU, fill_opacity=1,
                             stroke_color="#0F172A", stroke_width=1) for k in range(10)])
    billes.arrange_in_grid(2, 5, buff=0.04).move_to(P(0, -0.1))
    return VGroup(corps, col, noeud, billes).move_to(centre)


class ShortProbaSommeCheminsBase(Short6e):
    ceinture = "jaune"
    nom_voix = "stmg-premiere-proba-somme-chemins-short"

    def t(self, texte, font_size=30, color=WHITE, largeur=LARGEUR_MAX):
        t = Text(texte, font_size=font_size, color=color)
        if t.width > largeur:
            t.scale_to_fit_width(largeur)
        return t

    def insister(self, mob, k=1.5, run_time=0.3):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def ligne(self, morceaux, fs=34, y=-2.55):
        g = suite(*[Text(x, font_size=fs, color=c) for x, c in morceaux], buff=0.12)
        if g.width > LARGEUR_MAX:
            g.scale_to_fit_width(LARGEUR_MAX)
        return g.move_to(P(0, y))

    def mini_arbre(self):
        """Le petit arbre du bas : départ → or / gris → gagné. Rien n'est ajouté à la scène."""
        rac, n1, n2 = P(-1.95, -1.3), P(-0.85, -0.75), P(-0.85, -1.85)
        f1, f2 = P(0.1, -0.75), P(0.1, -1.85)
        self.br = [Line(rac, n1, color=WHITE, stroke_width=4), Line(rac, n2, color=WHITE, stroke_width=4),
                   Line(n1, f1, color=WHITE, stroke_width=4), Line(n2, f2, color=WHITE, stroke_width=4)]
        self.dep = Dot(rac, radius=0.06)
        self.l_or = Text("or", font_size=24, color=OR).next_to(n1, UP, buff=0.08).shift(LEFT * 0.12)
        self.l_gris = Text("gris", font_size=24, color=GRIS).next_to(n2, DOWN, buff=0.08)
        self.g1 = Text("gagné", font_size=24, color=GAGNE).next_to(f1, RIGHT, buff=0.1)
        self.g2 = Text("gagné", font_size=24, color=GAGNE).next_to(f2, RIGHT, buff=0.1)
        fs = 26
        self.n02 = Text("0,2", font_size=fs, color=BLEU_CALCUL, weight=BOLD).move_to(
            (rac + n1) / 2 + P(-0.22, 0.2))
        self.n08 = Text("0,8", font_size=fs, color=BLEU_CALCUL, weight=BOLD).move_to(
            (rac + n2) / 2 + P(-0.22, -0.2))
        self.n05 = Text("0,5", font_size=fs, color=BLEU_CALCUL, weight=BOLD).move_to((n1 + f1) / 2 + P(0.1, 0.2))
        self.n01 = Text("0,1", font_size=fs, color=BLEU_CALCUL, weight=BOLD).move_to((n2 + f2) / 2 + P(0, 0.2))

    def allume(self, ks, coul=ORANGE_RETENUE):
        return [b.animate.set_stroke(coul if k in ks else WHITE, 8 if k in ks else 4,
                                     opacity=1 if k in ks else 0.35) for k, b in enumerate(self.br)]

    def construct(self):
        self.margo_bas()
        self.mini_arbre()

        # ── 00 : l'accroche : la roue, les deux sacs, « la moyenne, 0,3 ? » ──
        self.dire("00-accroche")
        titre = self.grand("La roue et les sacs", font_size=40, color=JAUNE_TITRE).move_to(P(0, 3.4))
        badge = echelle_ceintures(self.ceinture).scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.3))
        roue = secteurs(0.2)
        fl = fleche_roue()
        rouge = sac(ROUGE_SAC, 5, P(0.55, 0.75))
        bleu = sac(BLEU_SAC, 1, P(1.68, 0.75))
        self.play(Write(titre), FadeIn(badge, shift=DOWN * 0.2), FadeIn(roue), FadeIn(fl), FadeIn(rouge),
                  FadeIn(bleu), run_time=0.7)
        self.play(Rotate(roue, 2 * TAU, about_point=CENTRE_ROUE), run_time=1.4, rate_func=rate_functions.ease_out_cubic)
        self.au_mot("une fois sur cinq")
        self.play(Indicate(roue[0], color=JAUNE_TITRE, scale_factor=1.15), FadeIn(self.dep),
                  Create(self.br[0]), FadeIn(self.l_or), run_time=0.7)
        self.au_mot("0,2")
        self.play(FadeIn(self.n02, scale=1.6), run_time=0.4)
        self.insister(self.n02, 1.5, 0.2)
        self.au_mot("sac rouge")
        a1 = CurvedArrow(CENTRE_ROUE + P(0.35, 0.8), rouge.get_top() + UP * 0.08, angle=-1.2, color=OR,
                         stroke_width=4, tip_length=0.15)
        self.play(Create(a1), Indicate(rouge, color=ROUGE_SAC, scale_factor=1.12), Create(self.br[2]),
                  FadeIn(self.g1), run_time=0.7)
        self.au_mot("0,5 de gagner")
        self.play(FadeIn(self.n05, scale=1.6), Indicate(rouge[3][:5], color=GAGNE, scale_factor=1.6), run_time=0.6)
        self.au_mot("Sinon")
        self.play(Rotate(roue, PI, about_point=CENTRE_ROUE), FadeOut(a1), Create(self.br[1]), FadeIn(self.l_gris),
                  run_time=0.8)
        self.au_mot("sac bleu")
        a2 = CurvedArrow(CENTRE_ROUE + P(0.0, -0.85), bleu.get_bottom() + DOWN * 0.08, angle=0.9, color=GRIS,
                         stroke_width=4, tip_length=0.15)
        self.play(Create(a2), Indicate(bleu, color=BLEU_SAC, scale_factor=1.12), Create(self.br[3]),
                  FadeIn(self.g2), run_time=0.7)
        self.au_mot("0,1.")
        self.play(FadeIn(self.n01, scale=1.6), Indicate(bleu[3][:1], color=GAGNE, scale_factor=2), run_time=0.6)
        self.au_mot("la moyenne")
        moy = self.ligne([("la moyenne :", ORANGE_RETENUE), ("0,3 ?", ORANGE_RETENUE)], 34)
        self.play(FadeOut(a2), FadeIn(moy[0], shift=UP * 0.15), run_time=0.5)
        self.au_mot("0,3 ?")
        self.play(FadeIn(moy[1], scale=1.6), run_time=0.4)
        self.insister(moy[1], 1.3, 0.2)
        self.attendre_voix(marge=0.1)

        # ── 01 : non ! les deux chemins, puis la somme ──
        self.dire("01-image")
        self.au_mot("Non")
        non = self.grand("NON !", font_size=50, color=ROUGE_ERREUR).move_to(P(1.1, -0.02))
        barre = Line(moy.get_left() + LEFT * 0.1, moy.get_right() + RIGHT * 0.1, color=ROUGE_ERREUR, stroke_width=6)
        self.play(FadeIn(non, scale=2), Create(barre), run_time=0.4)
        self.insister(non, 1.2, 0.2)
        self.play(FadeOut(non), FadeOut(moy), FadeOut(barre), run_time=0.4)
        self.au_mot("Or puis gagné")
        b1 = rouge[3][0].copy()
        self.play(Rotate(roue, PI, about_point=CENTRE_ROUE), *self.allume([0, 2]), run_time=0.8)
        self.play(b1.animate.shift(UP * 0.9).scale(1.8), run_time=0.4, rate_func=rate_functions.there_and_back)
        fs = 34
        l1 = self.ligne([("0,2", BLEU_CALCUL), ("×", WHITE), ("0,5", BLEU_CALCUL), ("=", WHITE), ("0,1", JAUNE_TITRE)],
                        fs)
        self.au_mot("0,2 fois")
        self.play(TransformFromCopy(self.n02, l1[0]), FadeIn(l1[1]), run_time=0.5)
        self.au_mot("0,5, égale")
        self.play(TransformFromCopy(self.n05, l1[2]), run_time=0.5)
        self.au_mot("égale 0,1")
        p1 = pastille("0,1", 22).next_to(self.g1, RIGHT, buff=0.1)
        self.play(FadeIn(l1[3]), FadeIn(l1[4], scale=1.6), run_time=0.4)
        self.play(TransformFromCopy(l1[4], p1), run_time=0.5)
        self.au_mot("Gris puis gagné")
        b2 = bleu[3][0].copy()
        self.play(FadeOut(l1), Rotate(roue, PI, about_point=CENTRE_ROUE), *self.allume([1, 3]), run_time=0.8)
        self.play(b2.animate.shift(UP * 0.9).scale(1.8), run_time=0.4, rate_func=rate_functions.there_and_back)
        l2 = self.ligne([("0,8", BLEU_CALCUL), ("×", WHITE), ("0,1", BLEU_CALCUL), ("=", WHITE),
                         ("0,08", JAUNE_TITRE)], fs)
        self.au_mot("0,8 fois")
        self.play(FadeIn(self.n08, scale=1.6), run_time=0.3)
        self.play(TransformFromCopy(self.n08, l2[0]), FadeIn(l2[1]), run_time=0.5)
        self.au_mot("0,1, égale")
        self.play(TransformFromCopy(self.n01, l2[2]), run_time=0.5)
        self.au_mot("égale 0,08")
        p2 = pastille("0,08", 22).next_to(self.g2, RIGHT, buff=0.1)
        self.play(FadeIn(l2[3]), FadeIn(l2[4], scale=1.6), run_time=0.4)
        self.play(TransformFromCopy(l2[4], p2), run_time=0.5)
        self.au_mot("On additionne")
        self.play(FadeOut(l2), *self.allume([0, 1, 2, 3]), run_time=0.5)
        l3 = self.ligne([("0,1", JAUNE_TITRE), ("+", WHITE), ("0,08", JAUNE_TITRE), ("=", WHITE),
                         ("0,18", VERT_OK)], 38)
        self.au_mot("0,1 plus")
        self.play(TransformFromCopy(p1[1], l3[0]), FadeIn(l3[1], scale=2), run_time=0.5)
        self.au_mot("0,08, égale")
        self.play(TransformFromCopy(p2[1], l3[2]), run_time=0.5)
        self.au_mot("égale 0,18")
        self.play(FadeIn(l3[3]), FadeIn(l3[4], scale=1.8), run_time=0.4)
        self.insister(l3[4], 1.25, 0.25)
        self.au_mot("Bien moins")
        moins = self.grand("Bien moins que 0,3 !", font_size=30, color=ORANGE_RETENUE).move_to(P(0, -0.13))
        self.play(FadeIn(moins, scale=0.6), run_time=0.5)
        self.insister(moins, 1.12, 0.2)
        self.attendre_voix(marge=0.1)

        # ── 02 : la question : la roue tombe sur l'or une fois sur deux ──
        self.dire("02-question")
        toi = self.grand("Et toi ?", font_size=48, color=JAUNE_TITRE).move_to(P(0, 3.4))
        self.play(ReplacementTransform(titre, toi), FadeOut(VGroup(l3, p1, p2, moins, self.n08), shift=DOWN * 0.2),
                  *self.allume([0, 1, 2, 3], WHITE), run_time=0.5)
        self.au_mot("une fois sur deux")
        roue2 = secteurs(0.5)
        self.play(Transform(roue, roue2), run_time=1.0)
        self.play(Indicate(roue[0], color=JAUNE_TITRE, scale_factor=1.12), run_time=0.5)
        self.au_mot("0,5 ?")
        n = Text("0,5", font_size=30, color=ORANGE_RETENUE, weight=BOLD).move_to(self.n02)
        self.play(Transform(self.n02, n), run_time=0.5)
        self.insister(self.n02, 1.6, 0.25)
        self.au_mot("Calcule")
        q = self.ligne([("Ta chance de gagner ?", BLEU_CALCUL)], 32)
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.5)
        self.au_mot("réponds en commentaire")
        appel = VGroup(self.t("Réponds en", 38, VERT_OK), self.t("commentaire !", 38, VERT_OK))
        appel.arrange(DOWN, buff=0.06).move_to(P(0, 2.4))
        self.play(FadeOut(badge), FadeIn(appel, scale=0.7), run_time=0.4)
        self.play(appel.animate.scale(1.08), run_time=0.25)
        self.play(appel.animate.scale(1 / 1.08), run_time=0.25)
        self.attendre_voix(marge=1.5)


class ShortProbaSommeCheminsSTMG(ShortProbaSommeCheminsBase):
    identite = "Maths STMG — EleveAI"


class ShortProbaSommeCheminsPremiere(ShortProbaSommeCheminsBase):
    identite = "Maths 1re — EleveAI"


# 20/10 : la 1re SPÉ, même voix, ceinture ORANGE.
class ShortProbaSommeCheminsPremiereSpe(ShortProbaSommeCheminsBase):
    identite = "Maths 1re spé — EleveAI"
    ceinture = "orange"
