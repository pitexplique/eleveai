# proba_probaT_arbre_lire_short.py
# EleveAI — Maths STMG ET Maths 1re (tronc commun) — short jumeau de
# « Lire un arbre pondéré ». CEINTURE JAUNE. Il AMUSE : au self, 80 % des
# élèves prennent des frites, et parmi eux 90 % du ketchup. Ce 90 %, où va-t-il
# sur l'arbre ?
#   · en HAUT le plateau du self : les frites arrivent, le ketchup gicle ;
#   · en BAS, EN MÊME TEMPS : l'arbre pondéré du coach (Arbre2 de la paysage)
#     qui se remplit : 0,8 ; 0,2 ; le 90 % glisse APRÈS la branche frites et
#     devient 0,9 = P_F(K) ;
#   · fin : la branche frites → pas de ketchup porte un « ? » ; « Réponds en
#     commentaire ! ». ⛔ PAS D'ÉCART : le 0,1 n'est jamais écrit (c'est la
#     question), ni les branches après « pas de frites ».
# Ti-Margo en bas (margo_bas). Aucun nom de personne, aucune classe à l'écran :
# UN SEUL rendu suffit, copié sous les deux noms (STMG, 1re). Les deux
# sous-classes existent quand même, identiques.
#
# Voix : manim/voix/stmg-premiere-proba-arbre-lire-short.json (débit −7).
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/proba_probaT_arbre_lire_short.py ShortProbaArbreLireSTMG -o eleveai-maths-stmg-proba-arbre-lire-short --media_dir manim/scripts/stmg/media-probaT_arbre_lire
# (ShortProbaArbreLirePremiere donne la même image.) Copier dans
# manim/sorties/stmg/maths/probabilites/07-arbre-lire/ et
# manim/sorties/premiere-commun/maths/probabilites/07-arbre-lire/
# (eleveai-maths-premiere-commun-proba-arbre-lire-short.mp4).

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from proba_probaT_arbre_lire import Arbre2, P, p_ind, suite  # noqa: E402  (pose les chemins)

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402
from proba_pc_conditionnelle import CHEMIN, pastille  # noqa: E402

LARGEUR_MAX = 4.1
PLATEAU = "#64748B"
FRITE = "#FCD34D"
CORNET = "#DC2626"
KETCHUP = "#B91C1C"


def plateau():
    t = RoundedRectangle(width=3.9, height=1.35, corner_radius=0.15, fill_color=PLATEAU, fill_opacity=1,
                         stroke_color="#CBD5E1", stroke_width=3)
    assiette = Circle(radius=0.5, fill_color=WHITE, fill_opacity=1, stroke_color="#CBD5E1",
                      stroke_width=3).move_to(t.get_center() + LEFT * 0.75)
    verre = VGroup(Polygon(P(-0.17, 0.3), P(0.17, 0.3), P(0.13, -0.3), P(-0.13, -0.3), fill_color="#7DD3FC",
                           fill_opacity=0.6, stroke_color=WHITE, stroke_width=2)).move_to(t.get_center() + RIGHT * 1.45)
    return VGroup(t, assiette, verre)


def frites(s=1.0):
    batons = VGroup(*[Rectangle(width=0.07, height=0.5 + 0.08 * (k % 3), fill_color=FRITE, fill_opacity=1,
                                stroke_color="#B45309", stroke_width=1).rotate((k - 3) * 0.1)
                      .move_to(P(-0.2 + k * 0.067, 0.18 + 0.03 * (k % 2))) for k in range(7)])
    cornet = Polygon(P(-0.3, 0.12), P(0.3, 0.12), P(0.18, -0.38), P(-0.18, -0.38), fill_color=CORNET,
                     fill_opacity=1, stroke_color=WHITE, stroke_width=2)
    return VGroup(batons, cornet).scale(s)


def bouteille(s=1.0):
    corps = RoundedRectangle(width=0.36, height=0.7, corner_radius=0.1, fill_color=KETCHUP, fill_opacity=1,
                             stroke_color=WHITE, stroke_width=2)
    bouchon = Polygon(P(-0.12, 0.35), P(0.12, 0.35), P(0.04, 0.55), P(-0.04, 0.55), fill_color=WHITE,
                      fill_opacity=1, stroke_width=0)
    etiquette = Rectangle(width=0.36, height=0.2, fill_color=WHITE, fill_opacity=0.9, stroke_width=0)
    return VGroup(corps, bouchon, etiquette).scale(s)


def tache(s=1.0):
    return VGroup(Ellipse(width=0.42, height=0.16, fill_color=KETCHUP, fill_opacity=1, stroke_width=0),
                  Circle(radius=0.07, fill_color=KETCHUP, fill_opacity=1, stroke_width=0).shift(RIGHT * 0.16 + UP * 0.07),
                  ).scale(s)


class ShortProbaArbreLireBase(Short6e):
    nom_voix = "stmg-premiere-proba-arbre-lire-short"

    def t(self, texte, font_size=30, color=WHITE, largeur=LARGEUR_MAX):
        t = Text(texte, font_size=font_size, color=color)
        if t.width > largeur:
            t.scale_to_fit_width(largeur)
        return t

    def insister(self, mob, k=1.5, run_time=0.3):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def ligne(self, morceaux, fs=28, y=-0.2):
        g = suite(*[Text(tx, font_size=fs, color=c) for tx, c in morceaux], buff=0.12)
        if g.width > LARGEUR_MAX:
            g.scale_to_fit_width(LARGEUR_MAX)
        return g.move_to(P(0, y))

    def construct(self):
        self.margo_bas()

        # ── 00 : l'accroche : le plateau, les frites, le ketchup ──
        self.dire("00-accroche")
        titre = self.grand("Au self", font_size=44, color=JAUNE_TITRE).move_to(P(0, 3.45))
        badge = echelle_ceintures("jaune").scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.3))
        pl = plateau().move_to(P(0, 1.05))
        self.play(Write(titre), FadeIn(badge, shift=DOWN * 0.2), FadeIn(pl, shift=LEFT * 2.5), run_time=0.8)
        a = Arbre2("F", "K", dx=1.4, dy1=0.52, dy2=0.3, fs=24, tfs=16)
        if a.width > 4.3:
            a.scale_to_fit_width(4.3)
        if a.height > 2.45:
            a.scale_to_fit_height(2.45)
        a.move_to(P(0, -1.72))
        self.au_mot("80 %")
        fr = frites(1.1).move_to(pl[1].get_center() + UP * 0.12)
        l1 = self.ligne([("80 %", JAUNE_TITRE), ("des élèves : frites", WHITE)], 30, -0.02)
        self.play(FadeIn(fr, shift=DOWN * 0.8), FadeIn(l1, shift=UP * 0.15), run_time=0.6)
        self.play(Wiggle(fr), run_time=0.5)
        self.au_mot("parmi eux")
        l2 = self.ligne([("parmi eux :", WHITE), ("90 %", JAUNE_TITRE), ("ketchup", KETCHUP)], 30, -0.5)
        bt = bouteille(1.0).move_to(P(0.45, 2.9)).rotate(-2.4)
        self.add(bt)
        self.play(bt.animate.move_to(pl[1].get_center() + P(0.55, 0.75)), FadeIn(l2[0], shift=UP * 0.15),
                  run_time=0.5)
        self.au_mot("90 %")
        tc = tache(1.0).move_to(fr[0].get_top() + DOWN * 0.08)
        self.play(GrowFromCenter(tc), FadeIn(l2[1:], scale=1.5), Wiggle(bt), run_time=0.6)
        self.insister(l2[1], 1.4, 0.2)
        self.au_mot("Ce 90 %")
        self.play(FadeOut(bt, shift=UP * 0.6), FadeOut(l1, shift=UP * 0.2), l2.animate.move_to(P(0, -0.02)),
                  FadeIn(a.socle()), *[FadeIn(b) for b in a.branches], *[FadeIn(m) for m in a.lab], run_time=0.7)
        self.au_mot("où va-t-il")
        nonante = pastille("90 %", 22).move_to(P(0.2, 1.05))
        q = self.grand("?", font_size=56, color=ORANGE_RETENUE).next_to(nonante, RIGHT, buff=0.12)
        self.play(TransformFromCopy(l2[1], nonante), FadeIn(q, scale=0.5), run_time=0.6)
        self.play(Wiggle(nonante), run_time=0.6)
        self.attendre_voix(marge=0.1)

        # ── 01 : premier niveau, puis le 90 % APRÈS la branche frites ──
        self.dire("01-image")
        self.au_mot("Premier niveau")
        leg = self.ligne([("F", BLEU_CALCUL), (": frites", WHITE), ("   K", BLEU_CALCUL), (": ketchup", WHITE)],
                         28, -0.02)
        self.play(FadeOut(l2, shift=UP * 0.2), FadeOut(q), FadeIn(leg, shift=UP * 0.15), run_time=0.5)
        n0 = a.nombre(0, "0,8", 24, buff=0.05)
        n1 = a.nombre(1, "0,2", 24, buff=0.05, dessous=True)
        self.remove(n0, n1)
        self.au_mot("frites, 0,8")
        self.play(a.branches[0].animate.set_stroke(CHEMIN, 8), Indicate(fr, scale_factor=1.15), run_time=0.4)
        self.play(FadeIn(n0, scale=1.8), run_time=0.4)
        self.au_mot("pas de frites, 0,2")
        self.play(a.branches[0].animate.set_stroke(a.branches[1].get_color(), 4),
                  a.branches[1].animate.set_stroke(CHEMIN, 8), run_time=0.4)
        self.play(FadeIn(n1, scale=1.8), run_time=0.4)
        self.au_mot("Le 90 %")
        self.play(*a.etat([0]), Indicate(nonante, color=JAUNE_TITRE), run_time=0.6)
        self.au_mot("ceux qui ont des frites")
        self.play(Indicate(a.lab[0][1], color=CHEMIN, scale_factor=1.8), Wiggle(fr), run_time=0.7)
        self.au_mot("il va APRÈS")
        self.play(nonante.animate.move_to(a.branches[2].get_center() + UP * 0.3), run_time=0.7)
        self.au_mot("Frites, puis ketchup")
        self.play(*a.etat([0, 2]), run_time=0.5)
        self.au_mot(": 0,9")
        n2 = a.nombre(2, "0,9", 24, buff=0.05)
        self.remove(n2)
        self.play(ReplacementTransform(nonante, n2), run_time=0.6)
        self.insister(n2, 1.6, 0.2)
        self.au_mot("C'est P indice F de K")
        f = p_ind("F", "K", 64)
        eg = Text("=", font_size=64).next_to(f, RIGHT, buff=0.18)
        v = Text("0,9", font_size=64, color=BLUE_C).next_to(eg, RIGHT, buff=0.18)
        v.shift(UP * (f[0].get_bottom()[1] - v[0].get_bottom()[1]))
        eg.match_y(f[0])
        fl = VGroup(f, eg, v).scale_to_fit_width(3.0).move_to(P(0, -0.02))
        self.play(FadeOut(leg, shift=UP * 0.2), FadeIn(f[0]), TransformFromCopy(a.lab[0][1], f[1]), run_time=0.6)
        self.play(FadeIn(f[2][0]), FadeIn(f[2][2]), TransformFromCopy(a.lab[2], f[2][1]), FadeIn(eg),
                  TransformFromCopy(n2, v), run_time=0.6)
        self.play(Indicate(f[1], color=JAUNE_TITRE, scale_factor=1.8), run_time=0.5)
        self.attendre_voix(marge=0.1)

        # ── 02 : la question : la branche frites → pas de ketchup ──
        self.dire("02-question")
        self.au_mot("Sur la branche")
        toi = self.grand("Et toi ?", font_size=50, color=JAUNE_TITRE).move_to(P(0, 3.45))
        self.play(ReplacementTransform(titre, toi), run_time=0.4)
        self.au_mot("frites puis pas de ketchup")
        qn = Text("?", font_size=44, color=ORANGE_RETENUE, weight=BOLD)
        a.nombres.pop(3, None)
        self.play(*a.etat([0, 3]), run_time=0.5)
        self.play(n2.animate.set_opacity(1), run_time=0.2)
        qn.move_to(a.branches[3].get_center() + DOWN * 0.28 + LEFT * 0.12)
        self.play(FadeIn(qn, scale=2.0), run_time=0.4)
        self.play(Wiggle(qn, scale_value=1.5), run_time=0.6)
        self.au_mot("quel nombre")
        quel = self.grand("Quel nombre ?", font_size=44, color=ORANGE_RETENUE).move_to(P(0, 1.45))
        self.play(FadeOut(VGroup(pl, fr, tc), shift=UP * 0.3), FadeOut(fl, shift=DOWN * 0.2),
                  FadeIn(quel, scale=0.7), run_time=0.6)
        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.t("Réponds en", 40, VERT_OK), self.t("commentaire !", 40, VERT_OK))
        appel.arrange(DOWN, buff=0.06).move_to(P(0, 0.35))
        self.play(FadeIn(appel, scale=0.7), run_time=0.4)
        self.play(appel.animate.scale(1.08), run_time=0.25)
        self.play(appel.animate.scale(1 / 1.08), run_time=0.25)
        self.attendre_voix(marge=1.5)


class ShortProbaArbreLireSTMG(ShortProbaArbreLireBase):
    identite = "Maths STMG — EleveAI"


class ShortProbaArbreLirePremiere(ShortProbaArbreLireBase):
    identite = "Maths 1re — EleveAI"
