# proba_experience.py
# EleveAI — Maths 6e — Premiers pas en probabilités (notionId : proba_experience)
# Mêmes exemples que la fiche lib/fiches/maths-6e-probabilites.tsx.
#
# Mapping micro-compétences (banque probabilites.bank.ts) → écrans :
# - proba_vocabulaire → écran 1 (impossible / possible / certain avec un dé)
# - proba_issue / proba_lire → écran 2 (les 6 issues, les pairs 2/4/6)
# - proba_comparer → écran 3 (sac de billes : 4 rouges > 2 bleues > 1 verte)
# - proba_estimer → écran 4 (l'échelle de 0 à 1)
# - proba_defi → défi (une probabilité de 1,5 ?) + correction
#
# Muet + texte : chaque écran s'explique seul. wait() généreux.
# Rendu : python -m manim render -qh manim/scripts/6e/proba_experience.py ProbaExperience6e -o eleveai-maths-6e-proba-experience --media_dir manim/scripts/6e/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

import numpy as np
from manim import *

from charte import *
from mascotte import MascotteMargouillat

PIPS = {
    1: [(0, 0)],
    2: [(-1, 1), (1, -1)],
    3: [(-1, 1), (0, 0), (1, -1)],
    4: [(-1, 1), (1, 1), (-1, -1), (1, -1)],
    5: [(-1, 1), (1, 1), (0, 0), (-1, -1), (1, -1)],
    6: [(-1, 1), (1, 1), (-1, 0), (1, 0), (-1, -1), (1, -1)],
}


class ProbaExperience6e(Scene):

    def add_mascotte(self, scale=0.5):
        m = MascotteMargouillat().scale(scale).to_corner(DOWN + RIGHT, buff=0.35)
        self.add(m)
        return m

    def titre_ecran(self, texte):
        t = Text(texte, font_size=38, color=JAUNE_TITRE).to_edge(UP)
        self.play(Write(t))
        return t

    def de(self, n, center, s=1.0, color=WHITE):
        sq = RoundedRectangle(width=s, height=s, corner_radius=0.12, color=color, stroke_width=3, fill_color=color, fill_opacity=0.06).move_to(center)
        d = s * 0.28
        pips = VGroup(*[Dot(np.array(center) + np.array([px * d, py * d, 0]), radius=s * 0.07, color=color) for px, py in PIPS[n]])
        return VGroup(sq, pips)

    # ── écran 0 : accueil ───────────────────────────────────────────────────

    def ecran_accueil(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        titre = Text("Premiers pas en probabilités", font_size=44, color=JAUNE_TITRE).to_edge(UP)
        sous = Text("Maths 6e — EleveAI", font_size=32, color=WHITE).next_to(titre, DOWN, buff=0.35)
        accroche = Text("Le hasard : dé, bille, pile ou face.", font_size=34, color=BLEU_CALCUL)
        accroche.next_to(sous, DOWN, buff=0.9)
        astuce = Text("On ne connaît pas le résultat à l'avance.", font_size=28, color=VERT_OK).next_to(accroche, DOWN, buff=0.5)
        self.play(Write(titre), FadeIn(sous, shift=0.3 * DOWN))
        self.play(Write(accroche))
        self.play(FadeIn(astuce, scale=1.15))
        self.wait(2.2)

    # ── écran 1 : vocabulaire ───────────────────────────────────────────────

    def ecran_vocabulaire(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("1. Impossible, possible, certain")

        de6 = self.de(6, [-3.6, 0.3, 0], s=1.6, color=BLEU_CALCUL)
        self.play(FadeIn(de6, scale=0.6))

        lignes = VGroup(
            Text("obtenir 7  →  IMPOSSIBLE", font_size=30, color=ROUGE_ERREUR),
            Text("obtenir 6  →  POSSIBLE", font_size=30, color=BLEU_CALCUL),
            Text("un nombre de 1 à 6  →  CERTAIN", font_size=30, color=VERT_OK),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.55).move_to([1.6, 0.3, 0])
        self.play(LaggedStart(*[FadeIn(l, shift=0.2 * RIGHT) for l in lignes], lag_ratio=0.4))
        self.wait(2.2)

    # ── écran 2 : les issues ────────────────────────────────────────────────

    def ecran_issues(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("2. Lister les issues d'un dé")

        des = VGroup()
        for i in range(6):
            col = VERT_OK if (i + 1) % 2 == 0 else WHITE
            des.add(self.de(i + 1, [-4.5 + i * 1.8, 0.6, 0], s=1.3, color=col))
        self.play(LaggedStart(*[FadeIn(d, scale=0.7) for d in des], lag_ratio=0.15), run_time=1.8)

        n = Text("6 issues possibles : 1, 2, 3, 4, 5, 6", font_size=30, color=WHITE).move_to([0, -1.2, 0])
        self.play(FadeIn(n))
        self.wait(0.6)

        pairs = Text("« nombre pair » : 2, 4, 6  →  3 issues favorables", font_size=30, color=VERT_OK).to_edge(DOWN, buff=0.6)
        self.play(Write(pairs), Indicate(VGroup(des[1], des[3], des[5]), color=VERT_OK))
        self.wait(2.2)

    # ── écran 3 : comparer (sac de billes) ──────────────────────────────────

    def ecran_billes(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("3. Comparer dans un sac de billes")

        sac = RoundedRectangle(width=5.4, height=2.6, corner_radius=0.4, color=WHITE, stroke_width=3).move_to([-1.0, 0.3, 0])
        self.play(Create(sac))

        couleurs = [ROUGE_ERREUR] * 4 + [BLEU_CALCUL] * 2 + [VERT_OK] * 1
        billes = VGroup()
        xs = np.linspace(-2.9, 0.9, 4)
        ys = [0.9, 0.0]
        coords = []
        for r in range(4):
            coords.append([xs[r], 0.9])
        for r in range(3):
            coords.append([xs[r], -0.2])
        for i, col in enumerate(couleurs):
            billes.add(Dot([coords[i][0], coords[i][1], 0], radius=0.28, color=col))
        self.play(LaggedStart(*[GrowFromCenter(b) for b in billes], lag_ratio=0.1), run_time=1.4)

        legende = VGroup(
            Text("4 rouges  →  le plus probable", font_size=26, color=ROUGE_ERREUR),
            Text("2 bleues", font_size=26, color=BLEU_CALCUL),
            Text("1 verte  →  le moins probable", font_size=26, color=VERT_OK),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.3).move_to([0, -2.2, 0])
        self.play(FadeIn(legende))
        self.wait(2.2)

    # ── écran 4 : l'échelle de 0 à 1 ────────────────────────────────────────

    def ecran_echelle(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("4. L'échelle de 0 à 1")

        y = 0.2
        ligne = Line([-4.5, y, 0], [4.5, y, 0], color=WHITE, stroke_width=4)

        def x(p):
            return -4.5 + p * 9.0

        t0 = Line([x(0), y + 0.2, 0], [x(0), y - 0.2, 0], color=ROUGE_ERREUR, stroke_width=4)
        t1 = Line([x(1), y + 0.2, 0], [x(1), y - 0.2, 0], color=VERT_OK, stroke_width=4)
        l0 = VGroup(Text("0", font_size=30, color=ROUGE_ERREUR), Text("impossible", font_size=24, color=ROUGE_ERREUR)).arrange(DOWN, buff=0.15).next_to([x(0), y, 0], DOWN, buff=0.3)
        l1 = VGroup(Text("1", font_size=30, color=VERT_OK), Text("certain", font_size=24, color=VERT_OK)).arrange(DOWN, buff=0.15).next_to([x(1), y, 0], DOWN, buff=0.3)
        self.play(Create(ligne), Create(t0), Create(t1), FadeIn(l0), FadeIn(l1))
        self.wait(0.4)

        p8 = Dot([x(0.8), y, 0], radius=0.1, color=BLEU_CALCUL)
        e8 = Text("80 % de pluie\n(proche de 1)", font_size=22, color=BLEU_CALCUL, line_spacing=0.9).next_to(p8, UP, buff=0.25)
        p05 = Dot([x(0.06), y, 0], radius=0.1, color=ORANGE_RETENUE)
        e05 = Text("5 %\n(proche de 0)", font_size=22, color=ORANGE_RETENUE, line_spacing=0.9).next_to(p05, UP, buff=0.25)
        self.play(GrowFromCenter(p8), FadeIn(e8))
        self.play(GrowFromCenter(p05), FadeIn(e05))
        self.wait(2.2)

    # ── écran 5 : défi ──────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.6)
        titre = Text("À toi de jouer", font_size=46, color=JAUNE_TITRE).to_edge(UP)
        self.play(Write(titre))

        phrase = Text("Un camarade dit :", font_size=30, color=WHITE).move_to([0, 1.4, 0])
        bulle = Text("« La probabilité de gagner est 1,5 »", font_size=34, color=BLEU_CALCUL).move_to([0, 0.4, 0])
        self.play(FadeIn(phrase), Write(bulle))

        q = Text("Pourquoi est-ce impossible ?", font_size=32, color=ORANGE_RETENUE).move_to([0, -1.2, 0])
        pause = Text("Mets pause et cherche !", font_size=28, color=ORANGE_RETENUE).to_edge(DOWN, buff=0.4)
        self.play(Write(q))
        self.play(FadeIn(pause, scale=1.15))
        self.wait(4.0)

    # ── écran 6 : correction ────────────────────────────────────────────────

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("Correction")

        e1 = Text("Une chance se mesure entre 0 et 1.", font_size=32, color=BLEU_CALCUL).move_to([0, 1.3, 0])
        self.play(Write(e1))
        self.wait(0.8)

        e2 = Text("1 = déjà certain : rien ne peut dépasser 1.", font_size=30, color=WHITE).move_to([0, 0.2, 0])
        self.play(Write(e2))
        self.wait(0.8)

        conclusion = Text("Une probabilité de 1,5 n'a aucun sens.", font_size=34, color=VERT_OK).to_edge(DOWN, buff=0.9)
        self.play(Write(conclusion))
        self.wait(2.2)

    # ── écran 7 : à retenir ─────────────────────────────────────────────────

    def ecran_conclusion(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        titre = Text("À retenir", font_size=46, color=JAUNE_TITRE).to_edge(UP)

        points = VGroup(
            Text("1. Impossible, possible, certain : 3 mots clés.", font_size=27),
            Text("2. Une issue = un résultat possible ; on les liste tous.", font_size=27),
            Text("3. Plus il y a d'issues favorables, plus c'est probable.", font_size=27),
            Text("4. Une chance va de 0 (impossible) à 1 (certain).", font_size=27),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.42).move_to([0, 0.2, 0])

        signature = Text(SIGNATURE, font_size=26, color=VERT_OK).to_edge(DOWN)

        self.play(Write(titre))
        self.play(LaggedStart(*[Write(p) for p in points], lag_ratio=0.3))
        self.play(Write(signature))
        self.wait(2.5)

    def construct(self):
        self.ecran_accueil()
        self.ecran_vocabulaire()
        self.ecran_issues()
        self.ecran_billes()
        self.ecran_echelle()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_conclusion()
