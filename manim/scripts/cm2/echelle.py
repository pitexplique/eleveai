# echelle.py
# EleveAI — Maths CM2 — Les échelles (notionId : echelle)
# Mêmes exemples que la fiche lib/fiches/maths-cm2-echelle.tsx.
# CM2 = texte brut, langage d'un enfant de ~10 ans. VARIÉTÉ D'ANIMATIONS
# (plan ↔ réalité, × pour agrandir, ÷ pour réduire, aller-retour).
#
# ⚠️ SON — ligne du 21/07 : VOIX de Frédéric. Script voix en bas, DEUX COLONNES.
#
# Mapping micro-compétences (banque echelles.bank.ts) → écrans :
# - echelle_comprendre      → écran 1 (1 cm → 10 m ; 2 cm → 20 m)
# - echelle_distance_reelle → écran 2 (du plan vers la réalité : 4 cm × 50 = 200 m)
# - echelle_distance_plan   → écran 3 (de la réalité vers le plan : 500 ÷ 100 = 5 cm)
# - echelle_defi            → défi + correction (carte de parc, aller-retour → 600 m)
#
# Rendu : python -m manim render -qh manim/scripts/cm2/echelle.py EchelleCM2 -o eleveai-maths-cm2-echelle --media_dir manim/scripts/cm2/media

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
VERT = "#16a34a"


class EchelleCM2(Scene):

    def add_mascotte(self, scale=0.5):
        m = MascotteMargouillat().scale(scale).to_corner(DOWN + RIGHT, buff=0.35)
        self.add(m)
        return m

    def titre_ecran(self, texte):
        t = Text(texte, font_size=40, color=JAUNE_TITRE).to_edge(UP)
        self.play(Write(t))
        return t

    def ratio(self, texte):
        box = RoundedRectangle(width=3.2, height=0.7, corner_radius=0.15,
                               stroke_color=VIOLET, stroke_width=3,
                               fill_color=VIOLET, fill_opacity=0.12)
        t = Text(f"Échelle : {texte}", font_size=26, color=VIOLET).move_to(box.get_center())
        return VGroup(box, t)

    def segment(self, x1, x2, y, couleur, label):
        ln = Line([x1, y, 0], [x2, y, 0], color=couleur, stroke_width=6)
        d1 = Dot([x1, y, 0], color="#0f172a", radius=0.06)
        d2 = Dot([x2, y, 0], color="#0f172a", radius=0.06)
        t = Text(label, font_size=24, color=couleur).next_to(ln, DOWN, buff=0.12)
        return VGroup(ln, d1, d2, t)

    # ── écran 0 : accueil ───────────────────────────────────────────────────

    def ecran_accueil(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        titre = Text("Les échelles", font_size=54, color=JAUNE_TITRE).to_edge(UP)
        sous = Text("Maths CM2 — EleveAI", font_size=30, color=WHITE).next_to(titre, DOWN, buff=0.3)

        r = self.ratio("1 cm → 10 m").move_to([-1.4, 0.5, 0])
        note = Text("dessiner en petit ce qui est grand", font_size=28, color=BLEU_CALCUL).to_edge(DOWN, buff=0.5)
        self.play(Write(titre), FadeIn(sous))
        self.play(GrowFromCenter(r))
        self.play(FadeIn(note, shift=UP * 0.2))
        self.wait(2.2)

    # ── écran 1 : comprendre ────────────────────────────────────────────────

    def ecran_comprendre(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("1. Ce que vaut 1 cm")

        r = self.ratio("1 cm → 10 m").to_edge(UP, buff=1.2)
        self.play(FadeIn(r))

        plan = self.segment(-3.0, -1.8, 0.4, BLEU_CALCUL, "1 cm sur le plan")
        reel = self.segment(-3.0, 1.0, -1.2, VERT, "10 m en vrai")
        self.play(Create(plan[0]), FadeIn(plan[1]), FadeIn(plan[2]), FadeIn(plan[3]))
        self.play(Create(reel[0]), FadeIn(reel[1]), FadeIn(reel[2]), FadeIn(reel[3]))

        note = Text("alors 2 cm → 20 m", font_size=32, color=VERT_OK).to_edge(DOWN, buff=0.5)
        self.play(Write(note))
        self.wait(2.2)

    # ── écran 2 : du plan vers la réalité (×) ───────────────────────────────

    def ecran_vers_realite(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("2. Du plan vers la réalité")

        r = self.ratio("1 cm → 50 m").to_edge(UP, buff=1.2)
        self.play(FadeIn(r))

        plan = Text("plan : 4 cm", font_size=32, color=BLEU_CALCUL).move_to([0, 0.6, 0])
        fleche = Text("× 50", font_size=34, color=ORANGE).move_to([0, -0.3, 0])
        reel = Text("réalité : 4 × 50 = 200 m", font_size=34, color=VERT_OK).move_to([0, -1.3, 0])
        self.play(FadeIn(plan))
        self.play(Write(fleche))
        self.play(Write(reel))
        note = Text("on MULTIPLIE", font_size=30, color=WHITE).to_edge(DOWN, buff=0.5)
        self.play(FadeIn(note, shift=UP * 0.2))
        self.wait(2.2)

    # ── écran 3 : de la réalité vers le plan (÷) ────────────────────────────

    def ecran_vers_plan(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("3. De la réalité vers le plan")

        r = self.ratio("1 cm → 100 m").to_edge(UP, buff=1.2)
        self.play(FadeIn(r))

        reel = Text("réalité : 500 m", font_size=32, color=VERT).move_to([0, 0.6, 0])
        fleche = Text("÷ 100", font_size=34, color=ORANGE).move_to([0, -0.3, 0])
        plan = Text("plan : 500 ÷ 100 = 5 cm", font_size=34, color=VERT_OK).move_to([0, -1.3, 0])
        self.play(FadeIn(reel))
        self.play(Write(fleche))
        self.play(Write(plan))
        note = Text("on DIVISE", font_size=30, color=WHITE).to_edge(DOWN, buff=0.5)
        self.play(FadeIn(note, shift=UP * 0.2))
        self.wait(2.2)

    # ── écran 4 : défi (la carte du parc) ───────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.55)
        titre = Text("Défi : la carte du parc", font_size=42, color=JAUNE_TITRE).to_edge(UP)
        self.play(GrowFromCenter(titre))

        r = self.ratio("1 cm → 100 m").move_to([-1.2, 1.0, 0])
        self.play(FadeIn(r))

        lignes = VGroup(
            Text("Le chemin mesure 3 cm sur la carte.", font_size=28, color=WHITE),
            Text("On fait l'aller-retour.", font_size=28, color=ORANGE),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.3).move_to([-0.8, -0.4, 0])
        self.play(LaggedStart(*[FadeIn(l, shift=UP * 0.1) for l in lignes], lag_ratio=0.3))

        pause = Text("Quelle distance en tout ? Pause !", font_size=28, color=VERT).to_edge(DOWN, buff=0.5)
        self.play(Write(pause))
        self.wait(4.0)

    # ── écran 5 : correction ────────────────────────────────────────────────

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("Correction")

        etapes = VGroup(
            Text("aller : 3 × 100 = 300 m", font_size=34, color=BLEU_CALCUL),
            Text("aller-retour : 300 × 2 = 600 m", font_size=34, color=ORANGE),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.5).move_to([0, 0.3, 0])
        for e in etapes:
            self.play(Write(e), run_time=0.9)

        concl = Text("On parcourt 600 m", font_size=36, color=VERT_OK).to_edge(DOWN, buff=0.4)
        self.play(Write(concl))
        self.wait(2.4)

    # ── écran 6 : à retenir ─────────────────────────────────────────────────

    def ecran_conclusion(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        titre = Text("À retenir", font_size=46, color=JAUNE_TITRE).to_edge(UP)

        points = VGroup(
            Text("1. L'échelle relie le plan et la réalité (ex. 1 cm → 10 m).", font_size=26),
            Text("2. Plan → réalité : on multiplie. Réalité → plan : on divise.", font_size=26),
            Text("3. Un aller-retour, c'est deux fois l'aller.", font_size=26),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.5).move_to([0, 0.2, 0])

        signature = Text(SIGNATURE, font_size=26, color=VERT_OK).to_edge(DOWN)

        self.play(Write(titre))
        self.play(LaggedStart(*[FadeIn(p, shift=RIGHT * 0.3) for p in points], lag_ratio=0.3))
        self.play(Write(signature))
        self.wait(2.5)

    def construct(self):
        self.ecran_accueil()
        self.ecran_comprendre()
        self.ecran_vers_realite()
        self.ecran_vers_plan()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_conclusion()


# ─── SCRIPT VOIX (leçon → VOIX de Frédéric, ligne éditoriale du 21/07) ─────────
# DEUX COLONNES : ce qui RESTE écrit à l'écran (minimal) / ce que dit la VOIX.
# Règle d'or : la voix GUIDE LE REGARD, elle ne relit pas le texte affiché.
#
#  minutage   │ CE QUI RESTE À L'ÉCRAN        │ CE QUE DIT LA VOIX (guidage, ≠ écran)
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  Accueil    │ « Les échelles » 1 cm → 10 m  │ « Comment faire tenir tout un parc sur une
#  ~0:00      │                               │   feuille ? Grâce à l'échelle : elle dit ce que
#             │                               │   vaut, en vrai, chaque centimètre du dessin. »
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  Écran 1    │  plan 1 cm · réel 10 m         │ « Regarde les deux traits : le petit, c'est un
#  ~0:16      │  2 cm → 20 m                  │   centimètre sur le plan ; le grand, dix mètres
#             │                               │   pour de vrai. Deux fois plus long ? Vingt mètres. »
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  Écran 2    │  4 cm  × 50  = 200 m          │ « Tu pars du plan pour aller vers le vrai, donc
#  ~0:34      │  on MULTIPLIE                 │   c'est plus grand : on multiplie. Quatre
#             │                               │   centimètres, cinquante mètres chacun : deux cents. »
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  Écran 3    │  500 m  ÷ 100  = 5 cm         │ « Cette fois, c'est l'inverse : du vrai vers le
#  ~0:52      │  on DIVISE                    │   plan, donc plus petit. On divise. Cinq cents
#             │                               │   mètres deviennent cinq centimètres sur la feuille. »
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  Défi       │  carte parc · 3 cm · A-R       │ « À toi. Sur la carte, trois centimètres, et un
#  ~1:10      │                               │   centimètre vaut cent mètres. Mais attention :
#             │                               │   on revient au départ ! Aller ET retour. Pause. »
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  Correction │  300 m · × 2 · 600 m          │ « L'aller : trois fois cent, trois cents mètres.
#  ~1:28      │                               │   Et comme on revient, on double : six cents
#             │                               │   mètres en tout. Le piège, c'était le retour ! »
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  À retenir  │  les 3 points                 │ « Retiens : l'échelle relie le plan et le vrai ;
#  ~1:44      │                               │   du plan vers le vrai on multiplie, dans l'autre
#             │                               │   sens on divise ; et un aller-retour compte double. À bientôt ! »
