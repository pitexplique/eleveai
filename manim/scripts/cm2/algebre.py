# algebre.py
# EleveAI — Maths CM2 — Les débuts de l'algèbre (notionId : algebre)
# Mêmes exemples que la fiche lib/fiches/maths-cm2-algebre.tsx.
# CM2 = texte brut, langage d'un enfant de ~10 ans. VARIÉTÉ D'ANIMATIONS
# (balance du signe =, x + 9 = 20 inversé, modéliser 3x + 2, défi 4x = 36).
#
# ⚠️ SON — ligne du 21/07 : VOIX de Frédéric. Script voix en bas, DEUX COLONNES.
#
# Mapping micro-compétences (banque algebre.bank.ts) → écrans :
# - algebre_egalite            → écran 1 (8 + 4 = 6 + 6 : balance en équilibre)
# - algebre_nombre_inconnu     → écran 2 (x + 9 = 20 → opération inverse → 11)
# - algebre_relation/modeliser → écran 3 (3 feuilles cachent x + 2 → 3x + 2)
# - algebre_defi               → défi + correction (4x = 36 → 9)
#
# Rendu : python -m manim render -qh manim/scripts/cm2/algebre.py AlgebreCM2 -o eleveai-maths-cm2-algebre --media_dir manim/scripts/cm2/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

import numpy as np
from manim import *

from charte import *
from mascotte import MascotteMargouillat

ROUGE = "#ef4444"
ORANGE = "#f97316"
VIOLET = "#8b5cf6"
VERT_FEUILLE = "#4ade80"


class AlgebreCM2(Scene):

    def add_mascotte(self, scale=0.5):
        m = MascotteMargouillat().scale(scale).to_corner(DOWN + RIGHT, buff=0.35)
        self.add(m)
        return m

    def titre_ecran(self, texte):
        t = Text(texte, font_size=40, color=JAUNE_TITRE).to_edge(UP)
        self.play(Write(t))
        return t

    def feuille_x(self, symbole="x"):
        """Une feuille (groupe caché) : ellipse verte + x."""
        f = Ellipse(width=1.0, height=0.75, stroke_color="#166534", stroke_width=3,
                    fill_color=VERT_FEUILLE, fill_opacity=0.85)
        t = Text(symbole, font_size=30, color="#0f172a").move_to(f.get_center())
        return VGroup(f, t)

    # ── écran 0 : accueil ───────────────────────────────────────────────────

    def ecran_accueil(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        titre = Text("Les débuts de l'algèbre", font_size=48, color=JAUNE_TITRE).to_edge(UP)
        sous = Text("Maths CM2 — EleveAI", font_size=30, color=WHITE).next_to(titre, DOWN, buff=0.3)

        gros_x = Text("x", font_size=110, color=VIOLET).move_to([-1.4, -0.3, 0])
        note = Text("un nom pour un nombre inconnu", font_size=28, color=BLEU_CALCUL).to_edge(DOWN, buff=0.5)
        self.play(Write(titre), FadeIn(sous))
        self.play(GrowFromCenter(gros_x))
        self.play(FadeIn(note, shift=UP * 0.2))
        self.wait(2.2)

    # ── écran 1 : le signe = est une balance ────────────────────────────────

    def ecran_egalite(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("1. Le signe = , une balance")

        gauche = Text("8 + 4", font_size=44, color=BLEU_CALCUL).move_to([-3.0, 0.6, 0])
        egal = Text("=", font_size=54, color=WHITE).move_to([0, 0.6, 0])
        droite = Text("6 + 6", font_size=44, color=ORANGE).move_to([3.0, 0.6, 0])
        self.play(FadeIn(gauche), FadeIn(egal), FadeIn(droite))

        # fléau en équilibre
        pivot = np.array([0, -1.2, 0])
        colonne = Line(pivot, pivot + DOWN * 0.5, stroke_width=6, color=WHITE)
        fleau = Line(pivot + LEFT * 2.4, pivot + RIGHT * 2.4, stroke_width=6, color=VERT_OK)
        p12g = Text("12", font_size=34, color=BLEU_CALCUL).move_to(pivot + LEFT * 2.4 + DOWN * 0.4)
        p12d = Text("12", font_size=34, color=ORANGE).move_to(pivot + RIGHT * 2.4 + DOWN * 0.4)
        self.play(Create(colonne), Create(fleau))
        self.play(TransformFromCopy(gauche, p12g), TransformFromCopy(droite, p12d))

        concl = Text("Même valeur des deux côtés : c'est vrai", font_size=30, color=VERT_OK).to_edge(DOWN, buff=0.5)
        self.play(Write(concl))
        self.wait(2.2)

    # ── écran 2 : le nombre inconnu ─────────────────────────────────────────

    def ecran_inconnu(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("2. Retrouver le nombre inconnu")

        expr = Text("x + 9 = 20", font_size=50, color=VIOLET).move_to([0, 1.0, 0])
        self.play(Write(expr))

        note = Text("l'inverse de + 9, c'est − 9", font_size=30, color=WHITE).move_to([0, -0.2, 0])
        calc = Text("20 − 9 = 11", font_size=44, color=BLEU_CALCUL).move_to([0, -1.2, 0])
        self.play(FadeIn(note, shift=UP * 0.1))
        self.play(Write(calc))

        concl = Text("x = 11", font_size=46, color=VERT_OK).to_edge(DOWN, buff=0.5)
        self.play(Write(concl))
        self.wait(2.2)

    # ── écran 3 : modéliser ─────────────────────────────────────────────────

    def ecran_modeliser(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("3. Écrire la situation avec x")

        feuilles = VGroup(*[self.feuille_x() for _ in range(3)]).arrange(RIGHT, buff=0.35).move_to([-2.4, 0.5, 0])
        plus = Text("+", font_size=40, color=WHITE).next_to(feuilles, RIGHT, buff=0.35)
        visibles = VGroup(*[Dot(radius=0.16, color=ORANGE) for _ in range(2)]).arrange(RIGHT, buff=0.25).next_to(plus, RIGHT, buff=0.35)
        self.play(LaggedStart(*[GrowFromCenter(f) for f in feuilles], lag_ratio=0.2))
        self.play(FadeIn(plus), *[GrowFromCenter(v) for v in visibles])

        leg = Text("3 feuilles (x chacune) + 2 visibles", font_size=26, color=WHITE).move_to([0, -1.0, 0])
        expr = Text("3x + 2", font_size=48, color=VIOLET).to_edge(DOWN, buff=0.5)
        self.play(FadeIn(leg))
        self.play(Write(expr))
        self.wait(2.2)

    # ── écran 4 : défi ──────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.55)
        titre = Text("Défi : retrouver x", font_size=44, color=JAUNE_TITRE).to_edge(UP)
        self.play(GrowFromCenter(titre))

        expr = Text("4x = 36", font_size=64, color=VIOLET).move_to([-0.6, 0.4, 0])
        self.play(Write(expr))

        consigne = Text("4 fois le même nombre donnent 36", font_size=28, color=WHITE).to_edge(DOWN, buff=1.0)
        pause = Text("Quel est x ? Mets pause !", font_size=30, color=ORANGE).to_edge(DOWN, buff=0.4)
        self.play(FadeIn(consigne, shift=UP * 0.2))
        self.play(Write(pause))
        self.wait(4.0)

    # ── écran 5 : correction ────────────────────────────────────────────────

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("Correction")

        expr = Text("4x = 36", font_size=48, color=VIOLET).move_to([0, 1.1, 0])
        note = Text("l'inverse de × 4, c'est ÷ 4", font_size=30, color=WHITE).move_to([0, 0.0, 0])
        calc = Text("36 ÷ 4 = 9", font_size=44, color=BLEU_CALCUL).move_to([0, -1.1, 0])
        self.play(Write(expr))
        self.play(FadeIn(note, shift=UP * 0.1))
        self.play(Write(calc))
        concl = Text("x = 9", font_size=44, color=VERT_OK).to_edge(DOWN, buff=0.4)
        self.play(Write(concl))
        self.wait(2.4)

    # ── écran 6 : à retenir ─────────────────────────────────────────────────

    def ecran_conclusion(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        titre = Text("À retenir", font_size=46, color=JAUNE_TITRE).to_edge(UP)

        points = VGroup(
            Text("1. Un nombre inconnu peut recevoir un nom : x.", font_size=27),
            Text("2. Le signe = veut dire « même valeur des deux côtés ».", font_size=27),
            Text("3. Pour retrouver x, on fait l'opération inverse.", font_size=27),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.5).move_to([0, 0.2, 0])

        signature = Text(SIGNATURE, font_size=26, color=VERT_OK).to_edge(DOWN)

        self.play(Write(titre))
        self.play(LaggedStart(*[FadeIn(p, shift=RIGHT * 0.3) for p in points], lag_ratio=0.3))
        self.play(Write(signature))
        self.wait(2.5)

    def construct(self):
        self.ecran_accueil()
        self.ecran_egalite()
        self.ecran_inconnu()
        self.ecran_modeliser()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_conclusion()


# ─── SCRIPT VOIX (leçon → VOIX de Frédéric, ligne éditoriale du 21/07) ─────────
# DEUX COLONNES : ce qui RESTE écrit à l'écran (minimal) / ce que dit la VOIX.
# Règle d'or : la voix GUIDE LE REGARD, elle ne relit pas le texte affiché.
#
#  minutage   │ CE QUI RESTE À L'ÉCRAN        │ CE QUE DIT LA VOIX (guidage, ≠ écran)
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  Accueil    │ « Les débuts de l'algèbre » x │ « Ce grand x, retiens-le : en algèbre, c'est
#  ~0:00      │                               │   le nom qu'on donne à un nombre qu'on ne
#             │                               │   connaît pas encore. »
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  Écran 1    │  8 + 4 = 6 + 6 · balance 12   │ « Regarde la balance : à gauche douze, à
#  ~0:16      │                               │   droite douze. Elle reste droite. Le signe
#             │                               │   égal, c'est ça : le même poids des deux côtés. »
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  Écran 2    │  x + 9 = 20 → 20 − 9 = 11     │ « On a ajouté neuf pour arriver à vingt. Pour
#  ~0:34      │                               │   remonter jusqu'à x, on fait le chemin à
#             │                               │   l'envers : on enlève neuf. Onze. »
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  Écran 3    │  3 feuilles + 2 · 3x + 2      │ « Trois feuilles cachent chacune le même
#  ~0:52      │                               │   nombre de margouillats : ça fait trois x.
#             │                               │   Deux se promènent dehors : trois x plus deux. »
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  Défi       │  4x = 36                     │ « À toi. Quatre fois un même nombre mystère
#  ~1:12      │                               │   font trente-six. Quel est ce nombre ? Souviens-
#             │                               │   toi de l'opération inverse. Pause. »
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  Correction │  36 ÷ 4 = 9                  │ « Multiplié par quatre à l'aller, donc divisé
#  ~1:28      │                               │   par quatre au retour. Trente-six divisé par
#             │                               │   quatre : neuf. x vaut neuf. »
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  À retenir  │  les 3 points                 │ « Retiens : x est le nom du nombre inconnu ;
#  ~1:44      │                               │   le signe égal équilibre les deux côtés ; et
#             │                               │   pour trouver x, on inverse l'opération. À bientôt ! »
