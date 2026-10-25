# frac_simplifier_short.py
# EleveAI — Maths 4e — short jumeau de l'épisode 02 « Simplifier une fraction »
# (micro fraction_simplifier). CEINTURE BLANCHE (règle du short blanc,
# REGLES.md) : on VOIT la simplification, aucun calcul à poser.
# Il AMUSE : « Moins de briques ? » Noé, CONCEPTEUR DE JOUETS, construit un mur
# de 12 petites briques dont 9 rouges :
#   · EN HAUT, l'image qui bouge : 3 petites briques fusionnent en 1 grosse
#     brique de même longueur (4 grosses, 3 rouges) ;
#   · EN BAS, au même instant, la barre du coach se regroupe 3 par 3 :
#     9/12 = 3/4 (même code couleur : rouge = rouge) ;
#   · surprise : avec des briques de 4, une brique serait rouge ET blanche :
#     4 ne divise pas 9 → impossible (c'est pourquoi on divise par un
#     diviseur COMMUN) ;
#   · 1 question-pause (3 s) : 10 briques dont 4 rouges, regroupées 2 par 2 ;
#   · fin : « 18 briques dont 12 rouges : le moins de briques possible,
#     combien de rouges ? » en commentaire (12/18 = 2/3 → 2).
# Centres d'intérêt : jeux-defis, art-design. Aucune donnée réelle citée.
# ⛔ PAS D'ÉCART : un nombre n'apparaît qu'au mot où la voix le dit.
#
# Voix : manim/voix/4e-frac-simplifier-short.json (débit −10) ; marques :
# manim/scripts/4e/frac_simplifier_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/4e/frac_simplifier_short.py FracSimplifierShort4e -o eleveai-maths-4e-frac-simplifier-short --media_dir manim/scripts/4e/media-frac-simplifier-short
# Sortie : manim/sorties/4e/maths/fractions/02-simplifier/eleveai-maths-4e-frac-simplifier-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from frac_lotd_commun import *  # noqa: E402,F403

ROUGE_B, BLANC_B, ENCRE_B = "#ef4444", "#f1f5f9", "#1f2937"
U = 0.3          # la longueur d'une petite brique (1 tenon)
Y_MUR, Y_BARRE = 1.25, -0.35


def brique(k, couleur, h=0.42):
    """Une brique de k tenons : le corps et ses tenons sur le dessus."""
    corps = RoundedRectangle(width=k * U - 0.02, height=h, corner_radius=0.04, fill_color=couleur, fill_opacity=1,
                             stroke_color=ENCRE_B, stroke_width=2.5)
    tenons = VGroup(*[RoundedRectangle(width=U * 0.55, height=0.09, corner_radius=0.02, fill_color=couleur,
                                       fill_opacity=1, stroke_color=ENCRE_B, stroke_width=2)
                      .move_to(P(-k * U / 2 + U * (i + 0.5), h / 2 + 0.045)) for i in range(k)])
    return VGroup(corps, tenons)


def mur(n, rouges, k=1, couleurs=None):
    """n/k briques de k tenons, posées bout à bout ; les `rouges` premiers
    tenons sont rouges. couleurs : une couleur par brique (sinon calculée)."""
    nb = n // k
    cs = couleurs or [ROUGE_B if i * k < rouges else BLANC_B for i in range(nb)]
    g = VGroup(*[brique(k, c) for c in cs]).arrange(RIGHT, buff=0.02)
    return g.move_to(P(0, Y_MUR))


class FracSimplifierShort4e(ShortLotD):
    nom_voix = "4e-frac-simplifier-short"
    fichier_marques = "frac_simplifier_short_marques.json"
    ceinture = "blanche"

    def barre(self, n, k):
        return Barre(n, k, largeur=n * U + 0.02 * (n - 1), hauteur=0.42, couleur=ROUGE_COACH, marge=0.12, sw=2,
                     centre=P(0, Y_BARRE))

    def construct(self):
        self.margo_bas()
        titre, badge = self.entete_short("Moins de briques ?", self.ceinture)
        self.add(badge)
        garder = [badge, titre, self.mobjects[0]]

        # ── 00 : le mur de 12 ──
        self.dire("00-accroche")
        self.au_mot("Noé")
        nm = self.bloc(["Noé,", "concepteur de jouets"], 30, BLEU_CALCUL).move_to(P(0, -2.3))
        self.play(FadeIn(nm, scale=0.8), run_time=0.4)
        m12 = mur(12, 0, 1)
        b = self.barre(12, 0)
        self.au_mot("12 petites")
        l1 = self.t("12 briques", 32).move_to(P(0, 0.55))
        l1.sans_synchro = True
        self.play(LaggedStart(*[FadeIn(x, shift=DOWN * 0.3) for x in m12], lag_ratio=0.06), b.apparaitre(1.0),
                  FadeIn(l1), FadeOut(nm), run_time=1.1)
        self.au_mot("9 sont rouges")
        rouges = [m12[i] for i in range(9)]
        f = EcritureFraction(9, 12, fs=56).move_to(P(-1.25, -1.75))
        self.play(*[x.animate.set_fill(ROUGE_B) for x in rouges], b.colorier(range(9), lag=0.05),
                  FadeOut(l1), FadeIn(f, scale=1.3), run_time=0.9)
        self.au_mot("moins de briques")
        self.play(Write(titre), run_time=0.7)
        self.attendre_voix(marge=0.2)

        # ── 01 : 3 petites → 1 grosse ──
        self.dire("01-grosses")
        self.au_mot("3 petites")
        cadres = VGroup(*[SurroundingRectangle(VGroup(*m12[i:i + 3]), color=AMBRE, buff=0.05, stroke_width=4)
                          for i in range(0, 12, 3)])
        gb = b.groupes(3)
        self.play(Create(cadres), Create(gb), run_time=0.8)
        self.au_mot("1 grosse")
        m4 = mur(12, 9, 3)
        b4, anim = b.regrouper(3, run_time=1.0)
        self.play(*[ReplacementTransform(VGroup(*m12[3 * i:3 * i + 3]), m4[i]) for i in range(4)], anim,
                  FadeOut(cadres), FadeOut(gb), run_time=1.0)
        self.au_mot("12 divisé par 3")
        c1 = self.t("12 ÷ 3 = 4", 30).move_to(P(0.85, -1.45))
        self.play(FadeIn(c1, shift=UP * 0.15), run_time=0.4)
        self.au_mot("9 divisé par 3")
        c2 = self.t("9 ÷ 3 = 3", 30, ROUGE_B).move_to(P(0.85, -2.05))
        self.play(FadeIn(c2, shift=UP * 0.15), run_time=0.4)
        self.au_mot("Le mur n'a pas changé")
        tir = DashedLine(P(m4[2].get_right()[0] + 0.01, Y_MUR + 0.4), P(b4.x_trait(3), Y_BARRE - 0.3),
                         color=AMBRE, stroke_width=4, dash_length=0.08)
        self.play(Create(tir), run_time=0.6)
        self.au_mot("3 quarts")
        g = EcritureFraction(3, 4, fs=56)
        eg = VGroup(f.copy(), self.t("=", 56), g).arrange(RIGHT, buff=0.3).move_to(P(0, -1.8))
        eg[1].sans_synchro = True
        self.play(FadeOut(c1), FadeOut(c2), f.animate.move_to(eg[0]), FadeIn(eg[1]), FadeIn(g, scale=1.3),
                  run_time=0.5)
        self.insister(g, 1.3)
        self.attendre_voix(marge=0.3)
        self.vider(garder)

        # ── 02 : le piège des briques de 4 ──
        self.dire("02-piege")
        m12 = mur(12, 9, 1)
        b = self.barre(12, 9)
        self.au_mot("briques de 4")
        self.play(FadeIn(m12), FadeIn(b), run_time=0.4)
        cadres = VGroup(*[SurroundingRectangle(VGroup(*m12[i:i + 4]), color=AMBRE, buff=0.05, stroke_width=4)
                          for i in range(0, 12, 4)])
        self.play(Create(cadres), Create(b.groupes(4)), run_time=0.7)
        self.au_mot("12 divisé par 4")
        c1 = self.t("12 ÷ 4 = 3", 32, VERT_OK).move_to(P(0, -1.3))
        self.play(FadeIn(c1, shift=UP * 0.15), run_time=0.4)
        self.au_mot("9 divisé par 4")
        c2 = self.t("9 ÷ 4 = ?", 32, ROUGE_ERREUR).move_to(P(0, -1.85))
        self.play(FadeIn(c2, shift=UP * 0.15), run_time=0.4)
        self.au_mot("rouge et blanche")
        mix = brique(4, BLANC_B).move_to(VGroup(*m12[8:12]))
        mix.add(Rectangle(width=U - 0.02, height=0.42 - 0.03, fill_color=ROUGE_B, fill_opacity=1, stroke_width=0)
                .move_to(mix[0]).align_to(mix[0], LEFT).shift(RIGHT * 0.015))
        self.play(ReplacementTransform(VGroup(*m12[8:12]), mix), Indicate(cadres[2], color=ROUGE_ERREUR),
                  run_time=0.7)
        self.play(Wiggle(mix, scale_value=1.15), run_time=0.7)
        self.au_mot("Impossible")
        x = croix(mix, sw=6)
        imp = self.t("Impossible !", 36, ROUGE_ERREUR).move_to(P(0, -2.5))
        self.play(Create(x), FadeIn(imp, scale=1.3), run_time=0.5)
        self.attendre_voix(marge=0.4)
        self.vider(garder)

        # ── 03 : la question-pause (3 s) ──
        self.question_pause("03-question", "03b-reponse", ["10 briques, dont 4 rouges,", "regroupées 2 par 2 :",
                                                           "combien de rouges ?"],
                            [self.inline("2", 30), self.inline("4", 30), self.inline("5", 30)], 0,
                            ["4 ÷ 2 = 2 : le mur fait 2/5."], mot_q="Un mur")
        self.vider(garder)

        # ── 04 : la question en commentaire ──
        self.dire("04-question")
        self.au_mot("18 briques")
        m18 = VGroup(*[brique(1, BLANC_B) for _ in range(18)]).arrange(RIGHT, buff=0.02).scale(0.7).move_to(P(0, Y_MUR))
        l1 = self.t("18 briques", 32).move_to(P(0, 0.4))
        self.play(LaggedStart(*[FadeIn(x, shift=DOWN * 0.3) for x in m18], lag_ratio=0.05), FadeIn(l1),
                  run_time=1.0)
        self.au_mot("dont 12 rouges")
        l2 = self.t("dont 12 rouges", 32, ROUGE_B).move_to(P(0, -0.2))
        self.play(*[m18[i].animate.set_fill(ROUGE_B) for i in range(12)], FadeIn(l2), run_time=0.8)
        self.au_mot("le moins de briques")
        q = self.bloc(["le moins de briques :", "combien de rouges ?"], 32, ORANGE_RETENUE).move_to(P(0, -1.05))
        self.play(FadeIn(q, scale=0.8), run_time=0.4)
        self.appel_commentaire(y=-2.3)
