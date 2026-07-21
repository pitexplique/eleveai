# probabilite.py
# EleveAI — Maths CM2 — Les probabilités (notionId : probabilite)
# Mêmes exemples que la fiche lib/fiches/maths-cm2-probabilite.tsx.
# CM2 = texte brut, langage d'un enfant de ~10 ans. VARIÉTÉ D'ANIMATIONS
# (dé, certain/possible/impossible, roue et billes, tombola 974).
#
# ⚠️ SON — ligne du 21/07 : VOIX de Frédéric. Script voix en bas, DEUX COLONNES.
#
# Mapping micro-compétences (banque probabilites.bank.ts) → écrans :
# - probabilite_hasard      → écran 1 (le hasard : on ne prévoit pas)
# - probabilite_vocabulaire → écran 2 (certain · possible · impossible : le 7 au dé)
# - probabilite_roue_de_sac → écran 3 (sac de billes : 3 rouges > 2 bleues > 1 verte)
# - probabilite_defi        → défi + correction (tombola : 5 gagnants / 100 → possible, pas certain)
#
# Rendu : python -m manim render -qh manim/scripts/cm2/probabilite.py ProbabiliteCM2 -o eleveai-maths-cm2-probabilite --media_dir manim/scripts/cm2/media

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
VERT = "#22c55e"
BLEU_B = "#3b82f6"


class ProbabiliteCM2(Scene):

    def add_mascotte(self, scale=0.5):
        m = MascotteMargouillat().scale(scale).to_corner(DOWN + RIGHT, buff=0.35)
        self.add(m)
        return m

    def titre_ecran(self, texte):
        t = Text(texte, font_size=40, color=JAUNE_TITRE).to_edge(UP)
        self.play(Write(t))
        return t

    def de(self, points, couleur=WHITE, taille=1.3):
        """Un dé : carré arrondi + points (positions sur une grille 0..1)."""
        box = RoundedRectangle(width=taille, height=taille, corner_radius=0.12,
                               stroke_color="#0f172a", stroke_width=4,
                               fill_color=couleur, fill_opacity=0.9)
        grp = VGroup(box)
        for (px, py) in points:
            d = Dot(box.get_center() + np.array([(px - 0.5) * taille * 0.72,
                                                 (0.5 - py) * taille * 0.72, 0]),
                    radius=0.09, color="#0f172a")
            grp.add(d)
        return grp

    def bille(self, couleur):
        return Circle(radius=0.28, color="#0f172a", stroke_width=3,
                      fill_color=couleur, fill_opacity=0.95)

    FACE = {
        1: [(0.5, 0.5)],
        2: [(0.3, 0.3), (0.7, 0.7)],
        3: [(0.3, 0.3), (0.5, 0.5), (0.7, 0.7)],
        5: [(0.3, 0.3), (0.7, 0.3), (0.5, 0.5), (0.3, 0.7), (0.7, 0.7)],
    }

    # ── écran 0 : accueil ───────────────────────────────────────────────────

    def ecran_accueil(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        titre = Text("Les probabilités", font_size=52, color=JAUNE_TITRE).to_edge(UP)
        sous = Text("Maths CM2 — EleveAI", font_size=30, color=WHITE).next_to(titre, DOWN, buff=0.3)

        de = self.de(self.FACE[5]).move_to([-1.4, -0.3, 0])
        note = Text("le hasard : on ne sait pas d'avance", font_size=28, color=BLEU_CALCUL).to_edge(DOWN, buff=0.5)
        self.play(Write(titre), FadeIn(sous))
        self.play(GrowFromCenter(de), Rotate(de, PI / 12), run_time=0.8)
        self.play(FadeIn(note, shift=UP * 0.2))
        self.wait(2.2)

    # ── écran 1 : le hasard ─────────────────────────────────────────────────

    def ecran_hasard(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("1. Le hasard")

        de = self.de(self.FACE[3]).move_to([0, 0.5, 0])
        self.play(GrowFromCenter(de))
        # le dé "roule" : change de face
        for f in (5, 2, 3):
            nouv = self.de(self.FACE.get(f, self.FACE[3])).move_to([0, 0.5, 0])
            self.play(Transform(de, nouv), run_time=0.5)
        q = Text("Quelle face va sortir ? On ne peut pas le prévoir.", font_size=28, color=WHITE).to_edge(DOWN, buff=0.6)
        self.play(FadeIn(q, shift=UP * 0.2))
        self.wait(2.0)

    # ── écran 2 : certain / possible / impossible ───────────────────────────

    def ecran_vocabulaire(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("2. Certain, possible, impossible")

        lignes = VGroup(
            Text("certain : sûr d'arriver", font_size=28, color=VERT_OK),
            Text("possible : peut arriver", font_size=28, color=BLEU_CALCUL),
            Text("impossible : ne peut pas arriver", font_size=28, color=ROUGE),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.4).move_to([-1.2, 0.6, 0])
        self.play(LaggedStart(*[FadeIn(l, shift=RIGHT * 0.3) for l in lignes], lag_ratio=0.3))

        ex = Text("un 7 sur un dé (1 à 6) → impossible", font_size=30, color=ROUGE).to_edge(DOWN, buff=0.5)
        self.play(Write(ex))
        self.wait(2.2)

    # ── écran 3 : comparer les chances (sac de billes) ──────────────────────

    def ecran_comparer(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("3. Comparer les chances")

        rouges = VGroup(*[self.bille(ROUGE) for _ in range(3)])
        bleues = VGroup(*[self.bille(BLEU_B) for _ in range(2)])
        verte = VGroup(self.bille(VERT))
        sac = VGroup(*rouges, *bleues, *verte).arrange_in_grid(rows=2, cols=3, buff=0.3).move_to([-0.6, 0.3, 0])
        self.play(LaggedStart(*[GrowFromCenter(b) for b in sac], lag_ratio=0.15))

        compte = Text("3 rouges · 2 bleues · 1 verte", font_size=28, color=WHITE).move_to([0, -1.4, 0])
        concl = Text("le rouge est le plus probable", font_size=30, color=VERT_OK).to_edge(DOWN, buff=0.5)
        self.play(FadeIn(compte))
        self.play(Write(concl))
        self.wait(2.2)

    # ── écran 4 : défi (la tombola) ─────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.55)
        titre = Text("Défi : la tombola", font_size=44, color=JAUNE_TITRE).to_edge(UP)
        self.play(GrowFromCenter(titre))

        lignes = VGroup(
            Text("100 tickets en tout", font_size=30, color=WHITE),
            Text("5 tickets gagnants", font_size=30, color=VERT_OK),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.35).move_to([-0.8, 0.4, 0])
        self.play(LaggedStart(*[FadeIn(l, shift=UP * 0.1) for l in lignes], lag_ratio=0.3))

        pause = Text("Es-tu certain de gagner ? Pause !", font_size=30, color=ORANGE).to_edge(DOWN, buff=0.5)
        self.play(Write(pause))
        self.wait(4.0)

    # ── écran 5 : correction ────────────────────────────────────────────────

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("Correction")

        lignes = VGroup(
            Text("5 gagnants… mais 95 perdants !", font_size=32, color=WHITE),
            Text("Gagner est POSSIBLE,", font_size=32, color=BLEU_CALCUL),
            Text("mais pas CERTAIN.", font_size=32, color=ROUGE),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.4).move_to([-0.4, 0.1, 0])
        for l in lignes:
            self.play(FadeIn(l, shift=RIGHT * 0.2), run_time=0.7)
        self.wait(2.4)

    # ── écran 6 : à retenir ─────────────────────────────────────────────────

    def ecran_conclusion(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        titre = Text("À retenir", font_size=46, color=JAUNE_TITRE).to_edge(UP)

        points = VGroup(
            Text("1. Le hasard : on ne connaît pas le résultat d'avance.", font_size=26),
            Text("2. Un événement est certain, possible ou impossible.", font_size=26),
            Text("3. Plus il y a de cas favorables, plus c'est probable.", font_size=26),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.5).move_to([0, 0.2, 0])

        signature = Text(SIGNATURE, font_size=26, color=VERT_OK).to_edge(DOWN)

        self.play(Write(titre))
        self.play(LaggedStart(*[FadeIn(p, shift=RIGHT * 0.3) for p in points], lag_ratio=0.3))
        self.play(Write(signature))
        self.wait(2.5)

    def construct(self):
        self.ecran_accueil()
        self.ecran_hasard()
        self.ecran_vocabulaire()
        self.ecran_comparer()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_conclusion()


# ─── SCRIPT VOIX (leçon → VOIX de Frédéric, ligne éditoriale du 21/07) ─────────
# DEUX COLONNES : ce qui RESTE écrit à l'écran (minimal) / ce que dit la VOIX.
# Règle d'or : la voix GUIDE LE REGARD, elle ne relit pas le texte affiché.
#
#  minutage   │ CE QUI RESTE À L'ÉCRAN        │ CE QUE DIT LA VOIX (guidage, ≠ écran)
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  Accueil    │ « Les probabilités » + dé     │ « Avant de lancer ce dé, peux-tu me dire quelle
#  ~0:00      │                               │   face va sortir ? Non. C'est ça, le hasard : on
#             │                               │   ne sait pas d'avance. »
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  Écran 1    │  le dé change de face          │ « Regarde-le rouler : une face, puis une autre.
#  ~0:14      │                               │   Impossible de prévoir laquelle s'arrêtera en
#             │                               │   haut. On peut juste parler de chances. »
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  Écran 2    │  certain · possible · imposs.  │ « Trois mots à retenir. Certain : ça arrive à
#  ~0:32      │  un 7 → impossible            │   coup sûr. Possible : ça peut arriver. Impossible :
#             │                               │   jamais — comme sortir un sept sur un dé. »
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  Écran 3    │  3 rouges 2 bleues 1 verte     │ « Dans le sac, compte les couleurs. Il y a plus
#  ~0:52      │  rouge = le plus probable      │   de rouges que de bleues, plus de bleues que de
#             │                               │   vertes. La plus nombreuse a le plus de chances. »
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  Défi       │  tombola : 5 / 100             │ « À toi. Cent tickets, cinq gagnants. Tu en
#  ~1:10      │                               │   prends un. Es-tu SÛR de gagner ? Réfléchis
#             │                               │   bien aux autres tickets… Pause. »
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  Correction │  possible, pas certain         │ « Cinq gagnants, oui, mais quatre-vingt-quinze
#  ~1:26      │                               │   perdants ! Gagner, c'est possible… mais pas du
#             │                               │   tout certain. Voilà la différence. »
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  À retenir  │  les 3 points                 │ « Retiens : le hasard, on ne prévoit pas ; certain,
#  ~1:42      │                               │   possible ou impossible ; et plus il y a de cas
#             │                               │   favorables, plus c'est probable. À bientôt ! »
