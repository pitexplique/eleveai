# derivation.py
# EleveAI — Maths Première spé — La dérivation (notionId : derivation)
# Mêmes exemples que la fiche lib/fiches/maths-premiere-derivation.tsx et la banque
# lib/tutor-v4/questionBank/premiere-spe/maths/derivation.bank.ts.
#
# ⚠️ LYCÉE = LaTeX AUTORISÉ → on écrit les maths en MathTex/Tex (pas en Text brut).
# ⚠️ SON — ligne du 21/07 (leçons) : VOIX de Frédéric. Script voix en bas, DEUX COLONNES.
#
# Mapping micro-compétences (banque derivation.bank.ts) → écrans :
# - der_taux       → écran 1 (taux de x² entre 1 et 3 = 4, la corde) + accueil (la tangente)
# - der_usuelles   → écran 2 (tableau des dérivées usuelles : (xⁿ)' = n·xⁿ⁻¹, k', ax+b, 1/x, √x)
# - der_operations → écran 3 (dériver 3x² − 5x + 2 terme à terme → 6x − 5) + défi/correction
# - der_tangente   → écran 4 DESSINÉ (parabole y=x² + tangente en a=1 → y = 2x − 1)
#
# Rendu : python -m manim render -qh manim/scripts/premiere/derivation.py DerivationPremiere \
#           -o eleveai-maths-premiere-derivation --media_dir manim/scripts/premiere/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from manim import *

from charte import *
from mascotte import MascotteMargouillat

ROUGE = "#ef4444"
ORANGE = "#f97316"


class DerivationPremiere(Scene):

    def add_mascotte(self, scale=0.5):
        m = MascotteMargouillat().scale(scale).to_corner(DOWN + RIGHT, buff=0.35)
        self.add(m)
        return m

    def titre_ecran(self, texte):
        t = Text(texte, font_size=40, color=JAUNE_TITRE).to_edge(UP)
        self.play(Write(t))
        return t

    def repere(self, x_range, y_range, x_len=6.2, y_len=4.2):
        return Axes(
            x_range=x_range, y_range=y_range, x_length=x_len, y_length=y_len,
            axis_config={"include_tip": True, "stroke_width": 3, "color": WHITE},
            tips=True,
        )

    # ── écran 0 : accueil ───────────────────────────────────────────────────
    def ecran_accueil(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        titre = Text("La dérivation", font_size=52, color=JAUNE_TITRE).to_edge(UP)
        sous = Text("Maths Première spé — EleveAI", font_size=28, color=WHITE).next_to(titre, DOWN, buff=0.25)

        ax = self.repere([-1, 3.2, 1], [-1, 5, 1], x_len=5.6, y_len=3.6).shift(DOWN * 0.4 + LEFT * 0.6)
        para = ax.plot(lambda x: x * x, x_range=[-1, 2.4], color=BLEU_CALCUL, stroke_width=5)
        tang = ax.plot(lambda x: 2 * x - 1, x_range=[-0.2, 2.6], color=ROUGE, stroke_width=5)
        A = Dot(ax.c2p(1, 1), color=VERT_OK, radius=0.09)
        labA = MathTex("A", color=VERT_OK, font_size=34).next_to(A, UR, buff=0.08)

        accroche = Text("Quelle est la pente de la courbe, ici, exactement ?",
                        font_size=26, color=BLEU_CALCUL).to_edge(DOWN, buff=0.35)

        self.play(Write(titre), FadeIn(sous))
        self.play(Create(ax), run_time=1.2)
        self.play(Create(para), run_time=1.4)
        self.play(GrowFromCenter(A), Write(labA))
        self.play(Create(tang), run_time=1.1)
        self.play(FadeIn(accroche, shift=UP * 0.2))
        self.wait(2.4)

    # ── écran 1 : taux de variation → nombre dérivé ─────────────────────────
    def ecran_taux(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("1. Le taux de variation")

        formule = MathTex(r"\text{taux} = \dfrac{f(b) - f(a)}{b - a}",
                          font_size=48, color=WHITE).move_to([0, 1.4, 0])
        self.play(Write(formule))

        appli = MathTex(r"f(x) = x^2 \quad,\quad a = 1 \;,\; b = 3",
                        font_size=40, color=BLEU_CALCUL).move_to([0, 0.2, 0])
        self.play(FadeIn(appli, shift=UP * 0.2))

        calc = MathTex(r"\dfrac{f(3) - f(1)}{3 - 1} = \dfrac{9 - 1}{2} = 4",
                       font_size=44, color=WHITE).move_to([0, -1.1, 0])
        self.play(Write(calc))
        self.play(Circumscribe(calc[0][-1], color=VERT_OK))

        note = Text("C'est la pente de la corde entre les deux points.",
                    font_size=26, color=VERT_OK).to_edge(DOWN, buff=0.45)
        self.play(FadeIn(note, shift=UP * 0.2))
        self.wait(2.4)

    # ── écran 2 : les dérivées usuelles ─────────────────────────────────────
    def ecran_usuelles(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("2. Les dérivées à connaître")

        cle = MathTex(r"(x^n)' = n\,x^{\,n-1}", font_size=52, color=JAUNE_TITRE).move_to([0, 1.6, 0])
        self.play(Write(cle))
        self.play(Indicate(cle, color=ORANGE))

        lignes = VGroup(
            MathTex(r"k' = 0", font_size=40),
            MathTex(r"(ax + b)' = a", font_size=40),
            MathTex(r"(x^2)' = 2x", font_size=40),
            MathTex(r"(x^3)' = 3x^2", font_size=40),
            MathTex(r"\left(\dfrac{1}{x}\right)' = -\dfrac{1}{x^2}", font_size=40),
            MathTex(r"(\sqrt{x})' = \dfrac{1}{2\sqrt{x}}", font_size=40),
        ).arrange_in_grid(rows=3, cols=2, buff=(1.4, 0.7)).move_to([0, -0.9, 0])
        for m in lignes:
            m.set_color(WHITE)

        self.play(LaggedStart(*[FadeIn(m, shift=RIGHT * 0.2) for m in lignes], lag_ratio=0.25))
        self.wait(2.6)

    # ── écran 3 : dériver terme à terme ─────────────────────────────────────
    def ecran_operations(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("3. Dériver terme à terme")

        f = MathTex(r"f(x) = 3x^2 - 5x + 2", font_size=48, color=BLEU_CALCUL).move_to([0, 1.5, 0])
        self.play(Write(f))

        d1 = MathTex(r"(3x^2)' = 6x", font_size=38, color=WHITE).move_to([-3.2, 0.1, 0])
        d2 = MathTex(r"(-5x)' = -5", font_size=38, color=WHITE).move_to([0, 0.1, 0])
        d3 = MathTex(r"(2)' = 0", font_size=38, color=WHITE).move_to([3.2, 0.1, 0])
        self.play(FadeIn(d1, shift=UP * 0.2))
        self.play(FadeIn(d2, shift=UP * 0.2))
        self.play(FadeIn(d3, shift=UP * 0.2))
        self.play(Circumscribe(d3, color=ORANGE))

        res = MathTex(r"f'(x) = 6x - 5", font_size=50, color=VERT_OK).move_to([0, -1.3, 0])
        self.play(Write(res))
        note = Text("La constante disparaît (sa dérivée est 0).",
                    font_size=26, color=ORANGE).to_edge(DOWN, buff=0.45)
        self.play(FadeIn(note, shift=UP * 0.2))
        self.wait(2.4)

    # ── écran 4 : l'équation de la tangente (dessinée) ──────────────────────
    def ecran_tangente(self):
        self.clear()
        self.add_mascotte(scale=0.45)
        self.titre_ecran("4. L'équation de la tangente")

        ax = self.repere([-1, 3.2, 1], [-2, 6, 2], x_len=5.4, y_len=4.0).shift(DOWN * 0.3 + LEFT * 1.4)
        para = ax.plot(lambda x: x * x, x_range=[-1, 2.5], color=BLEU_CALCUL, stroke_width=5)
        tang = ax.plot(lambda x: 2 * x - 1, x_range=[-0.4, 2.7], color=ROUGE, stroke_width=5)
        A = Dot(ax.c2p(1, 1), color=VERT_OK, radius=0.09)
        labA = MathTex("A(1\,;1)", color=VERT_OK, font_size=30).next_to(A, UP, buff=0.12)

        self.play(Create(ax), Create(para), run_time=1.6)
        self.play(GrowFromCenter(A), Write(labA))

        etapes = VGroup(
            MathTex(r"y = f'(a)(x - a) + f(a)", font_size=34, color=WHITE),
            MathTex(r"f(1) = 1 ,\; f'(1) = 2", font_size=34, color=BLEU_CALCUL),
            MathTex(r"y = 2(x - 1) + 1", font_size=34, color=WHITE),
            MathTex(r"y = 2x - 1", font_size=40, color=VERT_OK),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.35).to_edge(RIGHT, buff=0.5)

        self.play(FadeIn(etapes[0], shift=UP * 0.2))
        self.play(FadeIn(etapes[1], shift=UP * 0.2))
        self.play(Create(tang), FadeIn(etapes[2], shift=UP * 0.2), run_time=1.2)
        self.play(Write(etapes[3]))
        self.wait(2.6)

    # ── écran 5 : défi (nombre dérivé) ──────────────────────────────────────
    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.55)
        titre = Text("Défi : un nombre dérivé", font_size=44, color=JAUNE_TITRE).to_edge(UP)
        self.play(GrowFromCenter(titre))

        enonce = MathTex(r"f(x) = x^2 - 4x + 1", font_size=52, color=WHITE).move_to([0, 0.9, 0])
        quest = MathTex(r"f'(3) = \; ?", font_size=48, color=BLEU_CALCUL).move_to([0, -0.4, 0])
        self.play(Write(enonce))
        self.play(FadeIn(quest, shift=UP * 0.2))

        pause = Text("Dérive d'abord, puis remplace. Mets pause !",
                     font_size=30, color=ORANGE).to_edge(DOWN, buff=0.5)
        self.play(Write(pause))
        self.wait(4.0)

    # ── écran 6 : correction ────────────────────────────────────────────────
    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("Correction")

        etape1 = MathTex(r"f'(x) = 2x - 4", font_size=48, color=WHITE).move_to([0, 1.2, 0])
        self.play(Write(etape1))
        note = Text("On dérive d'abord…", font_size=26, color=BLEU_CALCUL).next_to(etape1, DOWN, buff=0.3)
        self.play(FadeIn(note))

        etape2 = MathTex(r"f'(3) = 2 \times 3 - 4 = 2", font_size=50, color=VERT_OK).move_to([0, -0.8, 0])
        self.play(Write(etape2))
        self.play(Flash(etape2.get_center(), color=ORANGE))
        note2 = Text("…puis on remplace x par 3.", font_size=26, color=VERT_OK).to_edge(DOWN, buff=0.5)
        self.play(FadeIn(note2, shift=UP * 0.2))
        self.wait(2.6)

    # ── écran 7 : à retenir ─────────────────────────────────────────────────
    def ecran_conclusion(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        titre = Text("À retenir", font_size=46, color=JAUNE_TITRE).to_edge(UP)

        points = VGroup(
            MathTex(r"1.\;\; f'(a) = \text{pente de la tangente en } a", font_size=34),
            MathTex(r"2.\;\; (x^n)' = n\,x^{\,n-1} \text{ ; les usuelles par cœur}", font_size=34),
            MathTex(r"3.\;\; \text{Tangente : } y = f'(a)(x - a) + f(a)", font_size=34),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.55).move_to([0, 0.2, 0])
        for p in points:
            p.set_color(WHITE)

        signature = Text(SIGNATURE, font_size=26, color=VERT_OK).to_edge(DOWN)

        self.play(Write(titre))
        self.play(LaggedStart(*[FadeIn(p, shift=RIGHT * 0.3) for p in points], lag_ratio=0.3))
        self.play(Write(signature))
        self.wait(2.6)

    def construct(self):
        self.ecran_accueil()
        self.ecran_taux()
        self.ecran_usuelles()
        self.ecran_operations()
        self.ecran_tangente()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_conclusion()


# ─── SCRIPT VOIX (leçon → VOIX de Frédéric, ligne éditoriale du 21/07) ─────────
# DEUX COLONNES : ce qui RESTE écrit à l'écran (minimal) / ce que dit la VOIX.
# Règle d'or : la voix GUIDE LE REGARD, elle ne relit pas les formules affichées.
#
#  minutage   │ CE QUI RESTE À L'ÉCRAN         │ CE QUE DIT LA VOIX (guidage, ≠ écran)
# ───────────┼───────────────────────────────┼──────────────────────────────────────
#  Accueil    │ parabole + tangente au point A │ « Regarde cette courbe. En un point précis,
#  ~0:00      │ « pente, ici, exactement ? »   │   je pose une droite qui l'épouse : la
#             │                                │   tangente. Toute la dérivation tient dans
#             │                                │   une question : quelle est sa pente ? »
# ───────────┼───────────────────────────────┼──────────────────────────────────────
#  Écran 1    │ taux = (f(b)−f(a))/(b−a)        │ « D'abord la pente MOYENNE entre deux points :
#  ~0:18      │ = 4 sur x² entre 1 et 3        │   la corde. Ici, entre un et trois, la courbe
#             │                                │   monte de huit pour deux d'avance : pente quatre.
#             │                                │   Rapproche les points, tu obtiens la tangente. »
# ───────────┼───────────────────────────────┼──────────────────────────────────────
#  Écran 2    │ (xⁿ)' = n·xⁿ⁻¹ + 5 usuelles    │ « Ces formules, tu les apprends par cœur, comme
#  ~0:40      │                                │   les tables autrefois. La puissance descend
#             │                                │   devant, l'exposant baisse d'un. Le reste en
#             │                                │   découle : la constante, la racine, l'inverse. »
# ───────────┼───────────────────────────────┼──────────────────────────────────────
#  Écran 3    │ 3x²−5x+2 → 6x − 5              │ « Un polynôme se dérive morceau par morceau,
#  ~1:02      │                                │   sans se presser. Trois x deux donne six x,
#             │                                │   moins cinq x donne moins cinq… et le deux,
#             │                                │   tout seul, disparaît : sa pente est nulle. »
# ───────────┼───────────────────────────────┼──────────────────────────────────────
#  Écran 4    │ courbe + tangente, y = 2x − 1  │ « La recette de la tangente : la pente, c'est
#  ~1:24      │                                │   f prime de a ; et elle passe par le point.
#             │                                │   Ici pente deux, point un un : la droite rouge,
#             │                                │   y égale deux x moins un. Regarde-la coller. »
# ───────────┼───────────────────────────────┼──────────────────────────────────────
#  Défi       │ f(x)=x²−4x+1 , f'(3) = ?        │ « À toi. Ne fonce pas sur le trois tout de suite :
#  ~1:46      │                                │   dérive d'abord la fonction, garde la lettre x,
#             │                                │   ET SEULEMENT APRÈS remplace-la par trois. Pause. »
# ───────────┼───────────────────────────────┼──────────────────────────────────────
#  Correction │ f'(x)=2x−4 , f'(3)=2           │ « La dérivée, c'est deux x moins quatre. Puis on
#  ~2:02      │                                │   remplace : deux fois trois moins quatre, il
#             │                                │   reste deux. C'est ça, le nombre dérivé en trois. »
# ───────────┼───────────────────────────────┼──────────────────────────────────────
#  À retenir  │ les 3 points                   │ « Retiens l'essentiel : le nombre dérivé est une
#  ~2:18      │                                │   pente ; les dérivées usuelles s'apprennent par
#             │                                │   cœur ; et la tangente a toujours la même formule. »
# ──────────────────────────────────────────────────────────────────────────────────
