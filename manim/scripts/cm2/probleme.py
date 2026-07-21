# probleme.py
# EleveAI — Maths CM2 — Résoudre un problème (notionId : probleme)
# Mêmes exemples que la fiche lib/fiches/maths-cm2-probleme.tsx.
# CM2 = texte brut, langage d'un enfant de ~10 ans. VARIÉTÉ D'ANIMATIONS
# (question surlignée, les 4 opérations, schéma en barres, défi marché 974).
#
# ⚠️ SON — ligne du 21/07 : VOIX de Frédéric. Script voix en bas, DEUX COLONNES.
#
# Mapping micro-compétences (banque probleme.bank.ts) → écrans :
# - probleme_choisir_operation  → écran 2 (réunir + · enlever − · groupes × · partager ÷)
# - probleme_une_etape          → écran 3 (bus 56 − 18 = 38, schéma en barres)
# - probleme_plusieurs_etapes   → écran 4 (Éva 3×8 + 6 = 30)
# - probleme_rediger            → écran 5 (la phrase réponse + l'unité)
# - probleme_defi               → défi + correction (marché 974 : 4×5 + 3, monnaie sur 30)
#
# Rendu : python -m manim render -qh manim/scripts/cm2/probleme.py ProblemeCM2 -o eleveai-maths-cm2-probleme --media_dir manim/scripts/cm2/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from manim import *

from charte import *
from mascotte import MascotteMargouillat

ROUGE = "#ef4444"
ORANGE = "#f97316"
VIOLET = "#8b5cf6"
BLEU_CLAIR = "#93c5fd"
VERT_CLAIR = "#86efac"


class ProblemeCM2(Scene):

    def add_mascotte(self, scale=0.5):
        m = MascotteMargouillat().scale(scale).to_corner(DOWN + RIGHT, buff=0.35)
        self.add(m)
        return m

    def titre_ecran(self, texte):
        t = Text(texte, font_size=40, color=JAUNE_TITRE).to_edge(UP)
        self.play(Write(t))
        return t

    def barre_seg(self, largeur, hauteur, couleur, valeur, label):
        rect = Rectangle(width=largeur, height=hauteur, stroke_color="#334155",
                         stroke_width=3, fill_color=couleur, fill_opacity=0.85)
        v = Text(str(valeur), font_size=30, color="#0f172a").move_to(rect.get_center())
        lab = Text(label, font_size=22, color=WHITE).next_to(rect, DOWN, buff=0.15)
        return VGroup(rect, v, lab)

    # ── écran 0 : accueil ───────────────────────────────────────────────────

    def ecran_accueil(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        titre = Text("Résoudre un problème", font_size=52, color=JAUNE_TITRE).to_edge(UP)
        sous = Text("Maths CM2 — EleveAI", font_size=30, color=WHITE).next_to(titre, DOWN, buff=0.3)

        etapes = VGroup(
            Text("1. Je lis la question", font_size=30, color=WHITE),
            Text("2. Je choisis l'opération", font_size=30, color=BLEU_CALCUL),
            Text("3. Je calcule", font_size=30, color=WHITE),
            Text("4. Je réponds par une phrase", font_size=30, color=VERT_OK),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.35).move_to([-1.2, -0.4, 0])

        self.play(Write(titre), FadeIn(sous))
        self.play(LaggedStart(*[FadeIn(e, shift=RIGHT * 0.3) for e in etapes], lag_ratio=0.3))
        self.wait(2.2)

    # ── écran 1 : lire la question ──────────────────────────────────────────

    def ecran_lire(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("1. Lire la question")

        enonce = VGroup(
            Text("Un bus transporte 56 élèves.", font_size=30, color=WHITE),
            Text("18 élèves descendent.", font_size=30, color=WHITE),
            Text("Combien reste-t-il d'élèves ?", font_size=32, color=JAUNE_TITRE),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.4).move_to([-0.6, 0.2, 0])

        self.play(LaggedStart(*[FadeIn(l, shift=UP * 0.1) for l in enonce], lag_ratio=0.4))
        cadre = SurroundingRectangle(enonce[2], color=JAUNE_TITRE, buff=0.15, corner_radius=0.1)
        self.play(Create(cadre))
        note = Text("On cherche ce qu'il RESTE", font_size=28, color=ORANGE).to_edge(DOWN, buff=0.5)
        self.play(FadeIn(note, shift=UP * 0.2))
        self.wait(2.2)

    # ── écran 2 : choisir l'opération ───────────────────────────────────────

    def ecran_operations(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("2. Choisir l'opération")

        lignes = VGroup(
            Text("réunir, ajouter", font_size=28, color=WHITE),
            Text("enlever, donner", font_size=28, color=WHITE),
            Text("plusieurs groupes égaux", font_size=28, color=WHITE),
            Text("partager en parts égales", font_size=28, color=WHITE),
        )
        signes = VGroup(
            Text("+", font_size=44, color=VERT_OK),
            Text("−", font_size=44, color=BLEU_CALCUL),
            Text("×", font_size=44, color=ORANGE),
            Text("÷", font_size=44, color=VIOLET),
        )
        rows = VGroup()
        for s, l in zip(signes, lignes):
            rows.add(VGroup(s, l.next_to(s, RIGHT, buff=0.4)))
        rows.arrange(DOWN, aligned_edge=LEFT, buff=0.45).move_to([-0.8, -0.2, 0])

        self.play(LaggedStart(*[FadeIn(r, shift=RIGHT * 0.3) for r in rows], lag_ratio=0.3))
        self.wait(2.4)

    # ── écran 3 : une étape (schéma en barres) ──────────────────────────────

    def ecran_une_etape(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("3. Une étape : le bus")

        # barre du total 56
        total = Rectangle(width=6.0, height=0.9, stroke_color="#334155", stroke_width=3,
                          fill_color=BLEU_CLAIR, fill_opacity=0.5).move_to([0, 1.0, 0])
        lab_total = Text("56 élèves au départ", font_size=24, color=WHITE).next_to(total, UP, buff=0.15)
        self.play(FadeIn(total), FadeIn(lab_total))

        # coupe : restent (?) + descendent (18)
        gauche = self.barre_seg(4.1, 0.9, VERT_CLAIR, "?", "restent").move_to([-0.95, -0.5, 0])
        droite = self.barre_seg(1.9, 0.9, "#fca5a5", "18", "descendent").move_to([2.05, -0.5, 0])
        self.play(TransformFromCopy(total, gauche), TransformFromCopy(total, droite))

        calc = Text("56 − 18 = 38", font_size=40, color=VERT_OK).to_edge(DOWN, buff=0.5)
        self.play(Write(calc))
        self.wait(2.2)

    # ── écran 4 : plusieurs étapes ──────────────────────────────────────────

    def ecran_plusieurs(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("4. Plusieurs étapes")

        enonce = Text("3 livres à 8 € + une trousse à 6 €", font_size=30, color=WHITE).move_to([0, 1.4, 0])
        self.play(FadeIn(enonce, shift=UP * 0.1))

        etape1 = Text("1)  3 × 8 = 24 €", font_size=34, color=BLEU_CALCUL).move_to([0, 0.3, 0])
        etape2 = Text("2)  24 + 6 = 30 €", font_size=34, color=ORANGE).move_to([0, -0.6, 0])
        self.play(Write(etape1))
        self.play(Write(etape2))

        concl = Text("Éva paie 30 €", font_size=36, color=VERT_OK).to_edge(DOWN, buff=0.5)
        self.play(Write(concl))
        self.wait(2.2)

    # ── écran 5 : rédiger la réponse ────────────────────────────────────────

    def ecran_rediger(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("5. Répondre par une phrase")

        faux = Text("« 38 »", font_size=40, color=ROUGE).move_to([-2.6, 0.6, 0])
        croix = Cross(faux, stroke_color=ROUGE, stroke_width=6).scale(0.6)
        bon = Text("« Il reste 38 élèves. »", font_size=34, color=VERT_OK).move_to([1.2, 0.6, 0])

        self.play(FadeIn(faux))
        self.play(Create(croix))
        self.play(FadeIn(bon, shift=RIGHT * 0.2))
        note = Text("Une phrase complète, avec l'unité", font_size=28, color=WHITE).to_edge(DOWN, buff=0.6)
        self.play(FadeIn(note, shift=UP * 0.2))
        self.wait(2.2)

    # ── écran 6 : défi 974 ──────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.55)
        titre = Text("Défi : le marché de Saint-Pierre", font_size=40, color=JAUNE_TITRE).to_edge(UP)
        self.play(GrowFromCenter(titre))

        lignes = VGroup(
            Text("4 sachets de letchis à 5 € chacun", font_size=30, color=WHITE),
            Text("+ un jus à 3 €", font_size=30, color=WHITE),
            Text("Léa donne 30 €", font_size=30, color=WHITE),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.35).move_to([-0.6, 0.4, 0])
        self.play(LaggedStart(*[FadeIn(l, shift=UP * 0.1) for l in lignes], lag_ratio=0.3))

        pause = Text("Combien de monnaie ? Mets pause !", font_size=30, color=ORANGE).to_edge(DOWN, buff=0.5)
        self.play(Write(pause))
        self.wait(4.0)

    # ── écran 7 : correction ────────────────────────────────────────────────

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("Correction")

        etapes = VGroup(
            Text("1)  letchis : 4 × 5 = 20 €", font_size=32, color=BLEU_CALCUL),
            Text("2)  avec le jus : 20 + 3 = 23 €", font_size=32, color=ORANGE),
            Text("3)  monnaie : 30 − 23 = 7 €", font_size=32, color=WHITE),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.45).move_to([-0.4, 0.2, 0])
        for e in etapes:
            self.play(Write(e), run_time=0.9)

        concl = Text("Léa reçoit 7 € de monnaie", font_size=34, color=VERT_OK).to_edge(DOWN, buff=0.4)
        self.play(Write(concl))
        self.wait(2.4)

    # ── écran 8 : à retenir ─────────────────────────────────────────────────

    def ecran_conclusion(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        titre = Text("À retenir", font_size=46, color=JAUNE_TITRE).to_edge(UP)

        points = VGroup(
            Text("1. Je lis la question, puis je choisis l'opération.", font_size=27),
            Text("2. Un schéma en barres aide à voir ce qu'on cherche.", font_size=27),
            Text("3. Je réponds par une phrase, avec l'unité.", font_size=27),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.5).move_to([0, 0.2, 0])

        signature = Text(SIGNATURE, font_size=26, color=VERT_OK).to_edge(DOWN)

        self.play(Write(titre))
        self.play(LaggedStart(*[FadeIn(p, shift=RIGHT * 0.3) for p in points], lag_ratio=0.3))
        self.play(Write(signature))
        self.wait(2.5)

    def construct(self):
        self.ecran_accueil()
        self.ecran_lire()
        self.ecran_operations()
        self.ecran_une_etape()
        self.ecran_plusieurs()
        self.ecran_rediger()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_conclusion()


# ─── SCRIPT VOIX (leçon → VOIX de Frédéric, ligne éditoriale du 21/07) ─────────
# DEUX COLONNES : ce qui RESTE écrit à l'écran (minimal) / ce que dit la VOIX.
# Règle d'or : la voix GUIDE LE REGARD, elle ne relit pas le texte affiché.
#
#  minutage   │ CE QUI RESTE À L'ÉCRAN        │ CE QUE DIT LA VOIX (guidage, ≠ écran)
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  Accueil    │ « Résoudre un problème » +    │ « Un problème, c'est une petite histoire
#  ~0:00      │  les 4 étapes                 │   avec des nombres. Quatre gestes suffisent
#             │                               │   pour t'en sortir à chaque fois. »
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  Écran 1    │  le bus + question cadrée     │ « Avant tout, cherche la question, celle qui
#  ~0:16      │  on cherche ce qui RESTE      │   est encadrée. Ici on ne te demande pas le
#             │                               │   total : on demande ce qu'il reste. »
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  Écran 2    │  + − × ÷ (4 lignes)          │ « Chaque situation appelle son opération.
#  ~0:32      │                               │   On réunit : plus. On enlève : moins. Des
#             │                               │   groupes pareils : fois. On partage : divisé. »
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  Écran 3    │  barre 56 → ? + 18            │ « Dessine-le. La grande barre, c'est les
#  ~0:52      │  56 − 18 = 38                 │   cinquante-six du départ. On la coupe : ceux
#             │                               │   qui descendent, et ce qu'on cherche, le point
#             │                               │   d'interrogation. Il ne reste qu'à soustraire. »
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  Écran 4    │  1) 3×8=24  2) 24+6=30       │ « Parfois un seul calcul ne suffit pas. D'abord
#  ~1:12      │                               │   le prix des livres, ENSUITE seulement on
#             │                               │   ajoute la trousse. Un pas après l'autre. »
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  Écran 5    │  « 38 » ✗ · phrase ✓          │ « Ne rends jamais un nombre tout nu. Trente-huit
#  ~1:30      │                               │   quoi ? Des élèves ! Écris la phrase entière,
#             │                               │   avec l'unité. C'est ça, répondre. »
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  Défi       │  marché : 4×5 € + 3 €, 30 €   │ « À toi, au marché. Quatre sachets, un jus, un
#  ~1:46      │                               │   billet de trente. Fais les calculs dans l'ordre
#             │                               │   et trouve la monnaie. Pause. »
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  Correction │  20 € · 23 € · 7 €            │ « Les letchis, vingt. Avec le jus, vingt-trois.
#  ~2:02      │                               │   Trente moins vingt-trois : sept euros rendus. »
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  À retenir  │  les 3 points                 │ « Retiens : la question d'abord ; un schéma pour
#  ~2:16      │                               │   voir ; et toujours une phrase avec l'unité pour
#             │                               │   finir. À bientôt ! »
