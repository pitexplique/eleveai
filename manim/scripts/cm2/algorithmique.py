# algorithmique.py
# EleveAI — Maths CM2 — L'algorithmique (notionId : algorithmique)
# Mêmes exemples que la fiche lib/fiches/maths-cm2-algorithmique.tsx.
# CM2 = texte brut, langage d'un enfant de ~10 ans. VARIÉTÉ D'ANIMATIONS
# (blocs Scratch colorés lus dans l'ordre, avancer≠tourner, boucle, carré tracé).
#
# ⚠️ SON — ligne du 21/07 : VOIX de Frédéric. Script voix en bas, DEUX COLONNES.
#
# Mapping micro-compétences (banque algorithmique.bank.ts) → écrans :
# - algo_instruction / algo_programme → écran 1 (lire les blocs dans l'ordre)
# - algo_deplacement                  → écran 2 (avancer ≠ tourner : 30 + 20 = 50)
# - algo_repetition                   → écran 3 (répéter 4 × avancer 10 = 40)
# - algo_defi                         → défi + correction (margouillat trace un carré 4×50)
#
# Rendu : python -m manim render -qh manim/scripts/cm2/algorithmique.py AlgorithmiqueCM2 -o eleveai-maths-cm2-algorithmique --media_dir manim/scripts/cm2/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from manim import *

from charte import *
from mascotte import MascotteMargouillat

ROUGE = "#ef4444"
ORANGE = "#f97316"
VIOLET = "#8b5cf6"
JAUNE_BLOC = "#facc15"
BLEU_BLOC = "#3b82f6"
VERT_BLOC = "#10b981"


class AlgorithmiqueCM2(Scene):

    def add_mascotte(self, scale=0.5):
        m = MascotteMargouillat().scale(scale).to_corner(DOWN + RIGHT, buff=0.35)
        self.add(m)
        return m

    def titre_ecran(self, texte):
        t = Text(texte, font_size=40, color=JAUNE_TITRE).to_edge(UP)
        self.play(Write(t))
        return t

    def bloc(self, texte, couleur, largeur=3.6, txt_color=WHITE):
        box = RoundedRectangle(width=largeur, height=0.62, corner_radius=0.12,
                               stroke_width=0, fill_color=couleur, fill_opacity=1.0)
        t = Text(texte, font_size=22, color=txt_color).move_to(box.get_center())
        return VGroup(box, t)

    # ── écran 0 : accueil ───────────────────────────────────────────────────

    def ecran_accueil(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        titre = Text("L'algorithmique", font_size=54, color=JAUNE_TITRE).to_edge(UP)
        sous = Text("Maths CM2 — EleveAI", font_size=30, color=WHITE).next_to(titre, DOWN, buff=0.3)

        prog = VGroup(
            self.bloc("quand je clique", JAUNE_BLOC, txt_color="#0f172a"),
            self.bloc("avancer de 20", BLEU_BLOC),
            self.bloc("tourner de 90°", BLEU_BLOC),
            self.bloc("dire Bonjour !", VIOLET),
        ).arrange(DOWN, buff=0.18, aligned_edge=LEFT).move_to([-1.4, -0.4, 0])

        self.play(Write(titre), FadeIn(sous))
        self.play(LaggedStart(*[FadeIn(b, shift=RIGHT * 0.3) for b in prog], lag_ratio=0.3))
        self.wait(2.2)

    # ── écran 1 : lire dans l'ordre ─────────────────────────────────────────

    def ecran_lire(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("1. On lit dans l'ordre")

        prog = VGroup(
            self.bloc("quand je clique", JAUNE_BLOC, txt_color="#0f172a"),
            self.bloc("avancer de 10", BLEU_BLOC),
            self.bloc("tourner de 90°", BLEU_BLOC),
            self.bloc("dire Bonjour !", VIOLET),
        ).arrange(DOWN, buff=0.2, aligned_edge=LEFT).move_to([-1.4, 0.1, 0])
        self.play(LaggedStart(*[FadeIn(b, shift=RIGHT * 0.3) for b in prog], lag_ratio=0.25))

        fleche = Arrow(prog[0].get_left() + LEFT * 0.3 + UP * 0.0,
                       prog[3].get_left() + LEFT * 0.3, buff=0.1,
                       color=JAUNE_TITRE, stroke_width=4)
        note = Text("de haut en bas", font_size=24, color=JAUNE_TITRE).next_to(fleche, LEFT, buff=0.1)
        self.play(GrowArrow(fleche), FadeIn(note))
        compte = Text("3 actions après le départ", font_size=28, color=VERT_OK).to_edge(DOWN, buff=0.5)
        self.play(Write(compte))
        self.wait(2.2)

    # ── écran 2 : avancer ≠ tourner ─────────────────────────────────────────

    def ecran_deplacement(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("2. Avancer n'est pas tourner")

        prog = VGroup(
            self.bloc("avancer de 30", BLEU_BLOC, largeur=3.2),
            self.bloc("tourner de 90°", ORANGE, largeur=3.2),
            self.bloc("avancer de 20", BLEU_BLOC, largeur=3.2),
        ).arrange(DOWN, buff=0.2, aligned_edge=LEFT).move_to([-3.2, 0.3, 0])
        self.play(LaggedStart(*[FadeIn(b, shift=RIGHT * 0.3) for b in prog], lag_ratio=0.25))

        # trajet en L
        p0 = np.array([0.3, -1.4, 0])
        p1 = p0 + RIGHT * 2.6
        p2 = p1 + UP * 1.8
        l1 = Line(p0, p1, color=BLEU_BLOC, stroke_width=6)
        l2 = Line(p1, p2, color=BLEU_BLOC, stroke_width=6)
        d = Dot(p0, color=VERT_OK)
        self.play(FadeIn(d))
        self.play(Create(l1))
        self.play(Create(l2))

        calc = Text("on additionne les « avancer » : 30 + 20 = 50", font_size=28, color=VERT_OK).to_edge(DOWN, buff=0.5)
        self.play(Write(calc))
        self.wait(2.2)

    # ── écran 3 : la boucle répéter ─────────────────────────────────────────

    def ecran_boucle(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("3. La boucle « répéter »")

        entete = self.bloc("répéter 4 fois", ORANGE, largeur=3.0).move_to([-1.6, 1.0, 0])
        interieur = self.bloc("avancer de 10", BLEU_BLOC, largeur=2.7).move_to([-1.2, 0.2, 0])
        crochet = Line(entete.get_corner(DL) + LEFT * 1.2, interieur.get_corner(DL) + LEFT * 0.95,
                       color=ORANGE, stroke_width=5)
        self.play(FadeIn(entete, shift=DOWN * 0.1))
        self.play(FadeIn(interieur, shift=RIGHT * 0.2), Create(crochet))

        detail = Text("10 + 10 + 10 + 10", font_size=30, color=WHITE).move_to([0, -1.2, 0])
        calc = Text("4 × 10 = 40 pas", font_size=38, color=VERT_OK).to_edge(DOWN, buff=0.5)
        self.play(FadeIn(detail))
        self.play(Write(calc))
        self.wait(2.2)

    # ── écran 4 : défi (le carré) ───────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.55)
        titre = Text("Défi : tracer un carré", font_size=42, color=JAUNE_TITRE).to_edge(UP)
        self.play(GrowFromCenter(titre))

        entete = self.bloc("répéter 4 fois", ORANGE, largeur=3.0).move_to([-3.0, 0.9, 0])
        b1 = self.bloc("avancer de 50", BLEU_BLOC, largeur=2.7).move_to([-2.6, 0.15, 0])
        b2 = self.bloc("tourner de 90°", BLEU_BLOC, largeur=2.7).move_to([-2.6, -0.6, 0])
        self.play(FadeIn(entete), FadeIn(b1), FadeIn(b2))

        consigne = Text("Combien de côtés ? Quelle distance en tout ?", font_size=26,
                        color=WHITE).to_edge(DOWN, buff=1.0)
        pause = Text("Mets pause et cherche !", font_size=28, color=ORANGE).to_edge(DOWN, buff=0.4)
        self.play(FadeIn(consigne, shift=UP * 0.2))
        self.play(Write(pause))
        self.wait(4.0)

    # ── écran 5 : correction (le carré se trace) ────────────────────────────

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("Correction")

        cote = 2.0
        c0 = np.array([-1.0, -1.4, 0])
        coins = [c0, c0 + RIGHT * cote, c0 + RIGHT * cote + UP * cote, c0 + UP * cote]
        carre = VGroup()
        for i in range(4):
            carre.add(Line(coins[i], coins[(i + 1) % 4], color=VERT_OK, stroke_width=6))
        pt = Dot(c0, color=ORANGE)
        self.play(FadeIn(pt))
        for seg in carre:
            self.play(Create(seg), run_time=0.5)

        note = Text("4 côtés → répéter 4 fois", font_size=28, color=WHITE).move_to([2.6, 0.6, 0])
        calc = Text("4 × 50 = 200 pas", font_size=34, color=VERT_OK).to_edge(DOWN, buff=0.4)
        self.play(FadeIn(note, shift=LEFT * 0.2))
        self.play(Write(calc))
        self.wait(2.4)

    # ── écran 6 : à retenir ─────────────────────────────────────────────────

    def ecran_conclusion(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        titre = Text("À retenir", font_size=46, color=JAUNE_TITRE).to_edge(UP)

        points = VGroup(
            Text("1. Un programme se lit dans l'ordre, de haut en bas.", font_size=27),
            Text("2. Avancer change la position ; tourner change la direction.", font_size=27),
            Text("3. « Répéter n fois » exécute n fois les blocs dedans.", font_size=27),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.5).move_to([0, 0.2, 0])

        signature = Text(SIGNATURE, font_size=26, color=VERT_OK).to_edge(DOWN)

        self.play(Write(titre))
        self.play(LaggedStart(*[FadeIn(p, shift=RIGHT * 0.3) for p in points], lag_ratio=0.3))
        self.play(Write(signature))
        self.wait(2.5)

    def construct(self):
        self.ecran_accueil()
        self.ecran_lire()
        self.ecran_deplacement()
        self.ecran_boucle()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_conclusion()


# ─── SCRIPT VOIX (leçon → VOIX de Frédéric, ligne éditoriale du 21/07) ─────────
# DEUX COLONNES : ce qui RESTE écrit à l'écran (minimal) / ce que dit la VOIX.
# Règle d'or : la voix GUIDE LE REGARD, elle ne relit pas le texte affiché.
#
#  minutage   │ CE QUI RESTE À L'ÉCRAN        │ CE QUE DIT LA VOIX (guidage, ≠ écran)
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  Accueil    │ « L'algorithmique » + 4 blocs │ « Voici un petit programme, comme dans
#  ~0:00      │                               │   Scratch. Chaque bloc de couleur est un
#             │                               │   ordre donné à la machine. »
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  Écran 1    │  4 blocs + flèche ↓           │ « Suis la flèche : on lit toujours du haut
#  ~0:16      │  3 actions après le départ    │   vers le bas. Le bloc jaune, c'est juste le
#             │                               │   départ ; compte seulement ce qui vient après. »
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  Écran 2    │  trajet en L · 30 + 20 = 50   │ « Attention à ne pas tout mélanger. Regarde
#  ~0:34      │                               │   le trait : avancer déplace le lutin, tourner
#             │                               │   le fait juste pivoter. On n'ajoute QUE les pas. »
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  Écran 3    │  répéter 4 · avancer 10       │ « Le bloc orange, c'est une boucle. Ce qui est
#  ~0:52      │  4 × 10 = 40                  │   pincé dedans se refait quatre fois. Plutôt que
#             │                               │   quatre blocs, un seul suffit. »
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  Défi       │  répéter 4 · avancer · tourner│ « À toi. Ce programme dessine un carré. Combien
#  ~1:12      │                               │   de côtés a un carré ? Et si chaque côté fait
#             │                               │   cinquante pas, combien en tout ? Pause. »
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  Correction │  le carré se trace · 4×50=200 │ « Regarde le trait fermer le carré : quatre
#  ~1:30      │                               │   côtés, donc on répète quatre fois. Quatre fois
#             │                               │   cinquante : deux cents pas en tout. »
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  À retenir  │  les 3 points                 │ « Retiens : on lit dans l'ordre ; avancer et
#  ~1:46      │                               │   tourner, ce n'est pas pareil ; et une boucle
#             │                               │   répète ce qu'elle contient. À bientôt ! »
