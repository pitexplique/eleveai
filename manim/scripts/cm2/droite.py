# droite.py
# EleveAI — Maths CM2 — Droites, segments et demi-droites (notionId : droite)
# Mêmes exemples que la fiche lib/fiches/maths-cm2-droite.tsx.
# CM2 = texte brut, langage d'un enfant de ~10 ans. VARIÉTÉ D'ANIMATIONS
# (droite/segment/demi-droite, parallèles, perpendiculaires + équerre, cahier).
#
# ⚠️ SON — ligne du 21/07 : VOIX de Frédéric. Script voix en bas, DEUX COLONNES.
#
# Mapping micro-compétences (banque droites.bank.ts) → écrans :
# - droite_reconnaitre     → écran 1 (droite sans fin · segment [AB] · demi-droite)
# - droite_parallele       → écran 2 (deux droites // même écart)
# - droite_perpendiculaire → écran 3 (angle droit + équerre)
# - droite_defi            → défi + correction (cahier : horizontale ⊥ verticale)
#
# Rendu : python -m manim render -qh manim/scripts/cm2/droite.py DroiteCM2 -o eleveai-maths-cm2-droite --media_dir manim/scripts/cm2/media

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


class DroiteCM2(Scene):

    def add_mascotte(self, scale=0.5):
        m = MascotteMargouillat().scale(scale).to_corner(DOWN + RIGHT, buff=0.35)
        self.add(m)
        return m

    def titre_ecran(self, texte):
        t = Text(texte, font_size=40, color=JAUNE_TITRE).to_edge(UP)
        self.play(Write(t))
        return t

    def droite(self, p1, p2, couleur=BLEU_CALCUL):
        return DoubleArrow(p1, p2, buff=0, color=couleur, stroke_width=5,
                           tip_length=0.22, max_tip_length_to_length_ratio=0.12)

    def demi_droite(self, p1, p2, couleur=BLEU_CALCUL):
        return Arrow(p1, p2, buff=0, color=couleur, stroke_width=5, tip_length=0.22,
                     max_tip_length_to_length_ratio=0.12)

    def pt(self, pos, label, couleur=ROUGE):
        d = Dot(pos, radius=0.09, color=couleur)
        t = Text(label, font_size=24, color=couleur).next_to(d, UP, buff=0.1)
        return VGroup(d, t)

    # ── écran 0 : accueil ───────────────────────────────────────────────────

    def ecran_accueil(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        titre = Text("Droites et segments", font_size=52, color=JAUNE_TITRE).to_edge(UP)
        sous = Text("Maths CM2 — EleveAI", font_size=30, color=WHITE).next_to(titre, DOWN, buff=0.3)

        d = self.droite([-3.2, -0.4, 0], [2.2, 0.8, 0])
        lab = Text("(d)", font_size=30, color=BLEU_CALCUL).next_to(d.get_center(), UP, buff=0.2)
        note = Text("une ligne qui ne s'arrête jamais", font_size=28, color=BLEU_CALCUL).to_edge(DOWN, buff=0.5)
        self.play(Write(titre), FadeIn(sous))
        self.play(GrowFromCenter(d), FadeIn(lab))
        self.play(FadeIn(note, shift=UP * 0.2))
        self.wait(2.2)

    # ── écran 1 : droite / segment / demi-droite ────────────────────────────

    def ecran_reconnaitre(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("1. Trois lignes différentes")

        # droite
        d = self.droite([-5.4, 1.4, 0], [-1.4, 1.4, 0])
        ld = Text("droite : sans fin", font_size=24, color=BLEU_CALCUL).next_to(d, RIGHT, buff=0.3)
        # segment
        seg = Line([-5.4, 0.0, 0], [-1.4, 0.0, 0], color=VERT, stroke_width=5)
        a = self.pt([-5.4, 0.0, 0], "A"); b = self.pt([-1.4, 0.0, 0], "B")
        ls = Text("segment [AB] : deux bouts", font_size=24, color=VERT).next_to(seg, RIGHT, buff=0.3)
        # demi-droite
        dd = self.demi_droite([-5.4, -1.4, 0], [-1.4, -1.4, 0], couleur=VIOLET)
        o = self.pt([-5.4, -1.4, 0], "O", couleur=VIOLET)
        ldd = Text("demi-droite : un seul bout", font_size=24, color=VIOLET).next_to(dd, RIGHT, buff=0.3)

        self.play(GrowFromCenter(d), FadeIn(ld))
        self.play(Create(seg), FadeIn(a), FadeIn(b), FadeIn(ls))
        self.play(GrowArrow(dd), FadeIn(o), FadeIn(ldd))
        self.wait(2.4)

    # ── écran 2 : parallèles ────────────────────────────────────────────────

    def ecran_paralleles(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("2. Droites parallèles")

        d1 = self.droite([-3.4, 0.9, 0], [3.4, 0.9, 0])
        d2 = self.droite([-3.4, -0.7, 0], [3.4, -0.7, 0])
        self.play(GrowFromCenter(d1))
        self.play(GrowFromCenter(d2))

        # marques d'écart
        for x in (-1.6, 1.6):
            fl = DoubleArrow([x, 0.9, 0], [x, -0.7, 0], buff=0, color=VIOLET, stroke_width=3,
                             tip_length=0.14, max_tip_length_to_length_ratio=0.1)
            self.play(GrowFromCenter(fl), run_time=0.5)
        note = Text("même écart partout : elles ne se coupent jamais", font_size=26, color=VERT_OK).to_edge(DOWN, buff=0.5)
        sym = Text("(d1) // (d2)", font_size=30, color=VIOLET).move_to([0, 1.9, 0])
        self.play(FadeIn(note), FadeIn(sym))
        self.wait(2.2)

    # ── écran 3 : perpendiculaires ──────────────────────────────────────────

    def ecran_perpendiculaires(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("3. Droites perpendiculaires")

        h = self.droite([-3.2, 0.2, 0], [3.2, 0.2, 0])
        v = self.droite([0, -1.8, 0], [0, 2.0, 0])
        self.play(GrowFromCenter(h))
        self.play(GrowFromCenter(v))

        # équerre : petit carré rouge au coin haut-droit
        s = 0.4
        equerre = VMobject(color=ROUGE, stroke_width=5)
        equerre.set_points_as_corners([
            [s, 0.2, 0], [s, 0.2 + s, 0], [0, 0.2 + s, 0],
        ])
        pt_i = Dot([0, 0.2, 0], color=ORANGE)
        self.play(FadeIn(pt_i))
        self.play(Create(equerre))
        note = Text("angle droit : elles sont perpendiculaires", font_size=26, color=VERT_OK).to_edge(DOWN, buff=0.5)
        self.play(FadeIn(note))
        self.wait(2.2)

    # ── écran 4 : défi (le cahier) ──────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.55)
        titre = Text("Défi : les carreaux du cahier", font_size=40, color=JAUNE_TITRE).to_edge(UP)
        self.play(GrowFromCenter(titre))

        # petit quadrillage
        grille = VGroup()
        for i in range(-2, 3):
            grille.add(Line([i * 0.7, -1.6, 0], [i * 0.7, 1.4, 0], stroke_width=1.5, color="#94a3b8"))
            grille.add(Line([-1.6, i * 0.6 + 0.0, 0], [1.6, i * 0.6 + 0.0, 0], stroke_width=1.5, color="#94a3b8"))
        grille.move_to([-0.3, 0.0, 0])
        self.play(Create(grille))

        h = Line([-1.9, 0.0, 0], [1.9, 0.0, 0], color=VERT, stroke_width=6).shift(LEFT * 0.3)
        v = Line([-0.3, -1.6, 0], [-0.3, 1.4, 0], color=BLEU_CALCUL, stroke_width=6)
        self.play(Create(h), Create(v))

        pause = Text("Parallèles ou perpendiculaires ? Pause !", font_size=28, color=ORANGE).to_edge(DOWN, buff=0.5)
        self.play(Write(pause))
        self.wait(4.0)

    # ── écran 5 : correction ────────────────────────────────────────────────

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("Correction")

        h = self.droite([-3.0, 0.2, 0], [3.0, 0.2, 0], couleur=VERT)
        v = self.droite([0, -1.6, 0], [0, 2.0, 0])
        self.play(GrowFromCenter(h), GrowFromCenter(v))

        s = 0.4
        equerre = VMobject(color=ROUGE, stroke_width=5)
        equerre.set_points_as_corners([[s, 0.2, 0], [s, 0.2 + s, 0], [0, 0.2 + s, 0]])
        self.play(Create(equerre), Flash([0, 0.2, 0], color=ORANGE))

        concl = Text("Angle droit → perpendiculaires", font_size=32, color=VERT_OK).to_edge(DOWN, buff=0.4)
        self.play(Write(concl))
        self.wait(2.4)

    # ── écran 6 : à retenir ─────────────────────────────────────────────────

    def ecran_conclusion(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        titre = Text("À retenir", font_size=46, color=JAUNE_TITRE).to_edge(UP)

        points = VGroup(
            Text("1. Droite = sans fin ; segment = 2 bouts ; demi-droite = 1 bout.", font_size=25),
            Text("2. Parallèles : même écart, elles ne se coupent jamais.", font_size=25),
            Text("3. Perpendiculaires : elles forment un angle droit.", font_size=25),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.5).move_to([0, 0.2, 0])

        signature = Text(SIGNATURE, font_size=26, color=VERT_OK).to_edge(DOWN)

        self.play(Write(titre))
        self.play(LaggedStart(*[FadeIn(p, shift=RIGHT * 0.3) for p in points], lag_ratio=0.3))
        self.play(Write(signature))
        self.wait(2.5)

    def construct(self):
        self.ecran_accueil()
        self.ecran_reconnaitre()
        self.ecran_paralleles()
        self.ecran_perpendiculaires()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_conclusion()


# ─── SCRIPT VOIX (leçon → VOIX de Frédéric, ligne éditoriale du 21/07) ─────────
# DEUX COLONNES : ce qui RESTE écrit à l'écran (minimal) / ce que dit la VOIX.
# Règle d'or : la voix GUIDE LE REGARD, elle ne relit pas le texte affiché.
#
#  minutage   │ CE QUI RESTE À L'ÉCRAN        │ CE QUE DIT LA VOIX (guidage, ≠ écran)
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  Accueil    │ « Droites et segments » (d)   │ « Regarde les deux flèches au bout de cette
#  ~0:00      │                               │   ligne : elles veulent dire qu'elle continue
#             │                               │   encore et encore, sans jamais s'arrêter. »
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  Écran 1    │  droite · segment · demi-dr.  │ « Trois cousines. Celle du haut n'a pas de bout.
#  ~0:14      │                               │   Celle du milieu s'arrête net en A et en B : un
#             │                               │   segment. La dernière a un seul bout : une demi-droite. »
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  Écran 2    │  d1 // d2 · même écart         │ « Ces deux-là ? Suis l'espace entre elles : il
#  ~0:34      │                               │   est le même à gauche comme à droite. Elles ne se
#             │                               │   rencontreront jamais. On dit parallèles. »
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  Écran 3    │  croix + équerre rouge         │ « Ici elles se croisent. Pose ton équerre au
#  ~0:52      │                               │   coin : ça tombe pile, un angle droit. Le petit
#             │                               │   carré rouge le prouve. Perpendiculaires. »
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  Défi       │  cahier : horizontale + vert.  │ « À toi. Regarde les lignes de ton cahier :
#  ~1:10      │                               │   une couchée, une debout. Elles se croisent
#             │                               │   comment, à ton avis ? Pause. »
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  Correction │  équerre · angle droit         │ « Au croisement, un angle bien carré. Les lignes
#  ~1:28      │                               │   du cahier sont perpendiculaires — c'est pour ça
#             │                               │   qu'on écrit droit dessus ! »
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  À retenir  │  les 3 points                 │ « Retiens : droite sans fin, segment à deux bouts ;
#  ~1:44      │                               │   parallèles gardent l'écart ; perpendiculaires font
#             │                               │   un angle droit. À bientôt ! »
