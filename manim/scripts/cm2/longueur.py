# longueur.py
# EleveAI — Maths CM2 — Les longueurs (notionId : longueur)
# Mêmes exemples que la fiche lib/fiches/maths-cm2-longueurs.tsx.
# CM2 = texte brut, langage d'un enfant de ~10 ans. VARIÉTÉ D'ANIMATIONS
# (règle graduée, segments comparés, gamme d'unités, distance qui s'additionne).
#
# ⚠️ SON — ligne du 21/07 : VOIX de Frédéric. Script voix en bas, DEUX COLONNES.
#
# Mapping micro-compétences (banque longueurs.bank.ts) → écrans :
# - longueur_estimer  → écran 1 (pièce 2 mm, règle 30 cm, piscine 25 m, trajet 25 km)
# - longueur_comparer → écran 2 (segments : 80 cm vs 1 m → 1 m plus long)
# - longueur_convertir→ écran 3 (1 km = 1000 m ; 2 km = 2000 m, × 1000)
# - longueur_defi     → défi + correction (rando 3 km + 1500 m = 4500 m)
#
# Rendu : python -m manim render -qh manim/scripts/cm2/longueur.py LongueurCM2 -o eleveai-maths-cm2-longueur --media_dir manim/scripts/cm2/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

import numpy as np
from manim import *

from charte import *
from mascotte import MascotteMargouillat


class LongueurCM2(Scene):

    def add_mascotte(self, scale=0.5):
        m = MascotteMargouillat().scale(scale).to_corner(DOWN + RIGHT, buff=0.35)
        self.add(m)
        return m

    def titre_ecran(self, texte):
        t = Text(texte, font_size=40, color=JAUNE_TITRE).to_edge(UP)
        self.play(Write(t))
        return t

    def regle(self, center, largeur=8.0, graduations=10):
        """Une règle graduée. Renvoie le groupe."""
        c = np.array([center[0], center[1], 0])
        corps = Rectangle(width=largeur, height=0.7, stroke_width=3, color=WHITE,
                          fill_color="#123", fill_opacity=1).move_to(c)
        grp = VGroup(corps)
        for i in range(graduations + 1):
            x = c[0] - largeur / 2 + largeur * i / graduations
            h = 0.28 if i % 5 == 0 else 0.16
            grp.add(Line([x, c[1] + 0.35 - h, 0], [x, c[1] + 0.35, 0], stroke_width=2, color=WHITE))
        return grp

    # ── écran 0 : accueil ───────────────────────────────────────────────────

    def ecran_accueil(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        titre = Text("Les longueurs", font_size=54, color=JAUNE_TITRE).to_edge(UP)
        sous = Text("Maths CM2 — EleveAI", font_size=32, color=WHITE).next_to(titre, DOWN, buff=0.3)
        r = self.regle([0, 0.2, 0], largeur=8.0)
        accroche = Text("1 m = 100 cm   ·   1 km = 1000 m", font_size=34, color=BLEU_CALCUL).move_to([0, -1.2, 0])
        self.play(Write(titre), FadeIn(sous))
        self.play(Create(r))
        self.play(FadeIn(accroche, shift=UP * 0.2))
        self.wait(2.2)

    # ── écran 1 : estimer ──────────────────────────────────────────────────

    def ecran_estimer(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("1. Choisir la bonne unité")

        lignes = [
            ("Épaisseur d'une pièce", "2 mm", VERT_OK),
            ("Règle d'écolier", "30 cm", VERT_OK),
            ("Une piscine", "25 m", BLEU_CALCUL),
            ("Trajet entre 2 villes", "25 km", BLEU_CALCUL),
        ]
        rows = VGroup()
        for nom, m, col in lignes:
            g = VGroup(
                Text(nom, font_size=28, color=WHITE),
                Text("≈ " + m, font_size=28, color=col),
            ).arrange(RIGHT, buff=0.5)
            rows.add(g)
        rows.arrange(DOWN, aligned_edge=LEFT, buff=0.5).move_to([0, -0.2, 0])
        self.play(LaggedStart(*[FadeIn(g, shift=RIGHT * 0.3) for g in rows], lag_ratio=0.3))

        note = Text("La bonne unité selon la taille : mm, cm, m ou km.", font_size=26, color=ORANGE_RETENUE).to_edge(DOWN, buff=0.5)
        self.play(FadeIn(note))
        self.wait(2.2)

    # ── écran 2 : comparer (segments) ──────────────────────────────────────

    def ecran_comparer(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("2. Comparer 80 cm et 1 m")

        astuce = Text("Même unité d'abord : 1 m = 100 cm", font_size=28, color=ORANGE_RETENUE).move_to([0, 2.1, 0])
        self.play(FadeIn(astuce, shift=DOWN * 0.2))

        x0 = -4.5
        # 1 m = 100 cm → segment de référence (long)
        seg_m = Line([x0, 0.8, 0], [x0 + 8.0, 0.8, 0], stroke_width=10, color=VERT_OK)
        lab_m = Text("1 m = 100 cm", font_size=26, color=VERT_OK).next_to(seg_m, UP, buff=0.2)
        # 80 cm → 80 % de la longueur
        seg_cm = Line([x0, -0.6, 0], [x0 + 8.0 * 0.8, -0.6, 0], stroke_width=10, color=BLEU_CALCUL)
        lab_cm = Text("80 cm", font_size=26, color=BLEU_CALCUL).next_to(seg_cm, DOWN, buff=0.2)
        self.play(Create(seg_m), FadeIn(lab_m))
        self.play(Create(seg_cm), FadeIn(lab_cm))

        # trait pointillé pour montrer ce qui manque
        manque = DashedLine([x0 + 8.0 * 0.8, -0.6, 0], [x0 + 8.0, -0.6, 0], color=ORANGE_RETENUE, stroke_width=4)
        self.play(Create(manque))

        conclusion = Text("1 m est plus long que 80 cm", font_size=32, color=VERT_OK).to_edge(DOWN, buff=0.6)
        self.play(Write(conclusion))
        self.wait(2.2)

    # ── écran 3 : convertir ────────────────────────────────────────────────

    def ecran_convertir(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("3. Convertir en mètres")

        km = Text("2 km", font_size=56, color=WHITE).move_to([-3.0, 0.6, 0])
        fleche = Arrow([-1.6, 0.6, 0], [1.0, 0.6, 0], buff=0.2, color=ORANGE_RETENUE)
        x1000 = Text("× 1000", font_size=32, color=ORANGE_RETENUE).next_to(fleche, UP, buff=0.2)
        m = Text("2000 m", font_size=56, color=VERT_OK).move_to([3.0, 0.6, 0])
        self.play(Write(km))
        self.play(GrowArrow(fleche), FadeIn(x1000))
        self.play(TransformFromCopy(km, m))

        detail = Text("1 km = 1000 m,  donc  2 km = 2 × 1000 = 2000 m", font_size=28, color=BLEU_CALCUL).to_edge(DOWN, buff=0.7)
        self.play(FadeIn(detail, shift=UP * 0.2))
        self.wait(2.2)

    # ── écran 4 : défi ─────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.6)
        titre = Text("Défi", font_size=46, color=JAUNE_TITRE).to_edge(UP)
        self.play(GrowFromCenter(titre))

        q1 = Text("Une randonnée : 3 km le matin,", font_size=32, color=WHITE).move_to([0, 1.6, 0])
        q2 = Text("1500 m l'après-midi.", font_size=32, color=WHITE).move_to([0, 0.85, 0])
        q3 = Text("Distance totale en mètres ?", font_size=34, color=BLEU_CALCUL).move_to([0, 0.05, 0])
        indice = Text("Indice : mets tout en mètres d'abord.", font_size=26, color=ORANGE_RETENUE).move_to([0, -0.75, 0])
        self.play(Write(q1))
        self.play(FadeIn(q2, shift=DOWN * 0.2))
        self.play(FadeIn(q3, shift=DOWN * 0.2))
        self.play(FadeIn(indice, shift=UP * 0.2))

        pause = Text("Mets pause et cherche !", font_size=30, color=ORANGE_RETENUE).to_edge(DOWN)
        self.play(Write(pause))
        self.wait(4.0)

    # ── écran 5 : correction ───────────────────────────────────────────────

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("Correction")

        e1 = Text("3 km = 3000 m", font_size=36, color=ORANGE_RETENUE).move_to([0, 1.2, 0])
        e2 = Text("3000 + 1500 = 4500", font_size=42, color=BLEU_CALCUL).move_to([0, 0.1, 0])
        self.play(Write(e1))
        self.play(FadeIn(e2, shift=DOWN * 0.2))
        self.wait(0.5)

        conclusion = Text("La randonnée : 4500 m", font_size=42, color=VERT_OK).to_edge(DOWN, buff=0.8)
        self.play(Write(conclusion))
        self.wait(2.4)

    # ── écran 6 : à retenir ─────────────────────────────────────────────────

    def ecran_conclusion(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        titre = Text("À retenir", font_size=46, color=JAUNE_TITRE).to_edge(UP)

        points = VGroup(
            Text("1. 1 km = 1000 m, 1 m = 100 cm, 1 cm = 10 mm.", font_size=27),
            Text("2. Pour comparer ou additionner : la même unité d'abord.", font_size=27),
            Text("3. Estimer = choisir la bonne unité et un ordre de grandeur.", font_size=27),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.5).move_to([0, 0.2, 0])

        signature = Text(SIGNATURE, font_size=26, color=VERT_OK).to_edge(DOWN)

        self.play(Write(titre))
        self.play(LaggedStart(*[FadeIn(p, shift=RIGHT * 0.3) for p in points], lag_ratio=0.3))
        self.play(Write(signature))
        self.wait(2.5)

    def construct(self):
        self.ecran_accueil()
        self.ecran_estimer()
        self.ecran_comparer()
        self.ecran_convertir()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_conclusion()


# ─── SCRIPT VOIX (leçon → VOIX de Frédéric, ligne éditoriale du 21/07) ─────────
# DEUX COLONNES : ce qui RESTE écrit à l'écran (minimal) / ce que dit la VOIX.
# Règle d'or : la voix GUIDE LE REGARD, elle ne relit pas le texte affiché.
#
#  minutage   │ CE QUI RESTE À L'ÉCRAN        │ CE QUE DIT LA VOIX (guidage, ≠ écran)
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  Accueil    │ « Les longueurs » + règle     │ « Mesurer une distance ou une taille.
#  ~0:00      │  1 m = 100 cm · 1 km = 1000 m │   Deux égalités à garder en tête toute
#             │                               │   la vidéo : cent centimètres dans un
#             │                               │   mètre, mille mètres dans un kilomètre. »
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  Écran 1    │  pièce 2 mm … trajet 25 km    │ « Chaque objet a son unité. Pour une
#  ~0:14      │                               │   pièce, on parle en millimètres ; pour un
#             │                               │   trajet, en kilomètres. Choisis la bonne
#             │                               │   échelle avant même de mesurer. »
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  Écran 2    │  segment 1 m vs 80 cm         │ « Deux barres. Ne te fie pas aux chiffres
#  ~0:34      │  → 1 m plus long              │   quatre-vingts et un. Passe le mètre en
#             │                               │   centimètres : cent. Regarde le petit
#             │                               │   pointillé qui manque au bout. »
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  Écran 3    │  2 km × 1000 = 2000 m         │ « Des kilomètres vers les mètres : on
#  ~0:54      │                               │   multiplie par mille. Deux kilomètres,
#             │                               │   deux mille mètres. »
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  Défi       │  3 km + 1500 m                │ « À toi, sur le sentier. Matin en kilomètres,
#  ~1:12      │  Distance totale ?           │   après-midi en mètres. Range-les pareil
#             │                               │   avant d'additionner. Pause. »
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  Correction │  3 km = 3000 m                │ « Le matin en mètres : trois mille. On
#  ~1:28      │  3000 + 1500 = 4500          │   ajoute l'après-midi, mille cinq cents.
#             │                               │   Quatre mille cinq cents mètres en tout. »
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  À retenir  │  les 3 points                 │ « Retiens les trois égalités des longueurs ;
#  ~1:44      │                               │   même unité avant de comparer ; et la
#             │                               │   bonne unité pour chaque objet. À bientôt ! »
