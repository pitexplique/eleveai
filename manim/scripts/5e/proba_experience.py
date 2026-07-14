# proba_experience.py
# EleveAI — Maths 5e — Les probabilités (notionId : proba_experience)
# Mêmes exemples que la fiche lib/fiches/maths-5e-probabilites.tsx.
#
# Mapping micro-compétences (banque probabilites.bank.ts) → écrans :
# - proba_vocabulaire / proba_issue → écran 1 (6 issues d'un dé, pairs = 3 favorables)
# - proba_calculer (dé)             → écran 2 (P(3) = 1/6) + écran 3 (P(pair) = 3/6 = 1/2)
# - proba_calculer (billes)         → écran 4 (P(rouge) = 3/5)
# - proba_equiprobabilite           → écran 5 (roue 3 rouge / 1 bleu : non équiprobable)
# - proba_defi                      → défi + correction (panier 974 : P(mangue) = 4/9)
#
# Rendu : python -m manim render -qh manim/scripts/5e/proba_experience.py ProbaExperience5e -o eleveai-maths-5e-proba-experience --media_dir manim/scripts/5e/media

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


class ProbaExperience5e(Scene):

    def add_mascotte(self, scale=0.5):
        m = MascotteMargouillat().scale(scale).to_corner(DOWN + RIGHT, buff=0.35)
        self.add(m)
        return m

    def titre_ecran(self, texte):
        t = Text(texte, font_size=40, color=JAUNE_TITRE).to_edge(UP)
        self.play(Write(t))
        return t

    def de(self, n, center, s=1.0, color=WHITE):
        sq = RoundedRectangle(width=s, height=s, corner_radius=0.12, color=color, stroke_width=3, fill_color=color, fill_opacity=0.06).move_to(center)
        d = s * 0.28
        pips = VGroup(*[Dot(np.array(center) + np.array([px * d, py * d, 0]), radius=s * 0.07, color=color) for px, py in PIPS[n]])
        return VGroup(sq, pips)

    def fraction(self, num, den, center, color=VERT_OK, fs=44):
        n = Text(str(num), font_size=fs, color=color)
        barre = Line(LEFT * 0.35, RIGHT * 0.35, stroke_width=3, color=color)
        d = Text(str(den), font_size=fs, color=color)
        grp = VGroup(n, barre, d).arrange(DOWN, buff=0.12).move_to(center)
        return grp

    # ── écran 0 : accueil ───────────────────────────────────────────────────

    def ecran_accueil(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        titre = Text("Les probabilités", font_size=52, color=JAUNE_TITRE).to_edge(UP)
        sous = Text("Maths 5e — EleveAI", font_size=32, color=WHITE).next_to(titre, DOWN, buff=0.35)
        accroche = Text("Quelle chance d'obtenir un 3 ?", font_size=36, color=BLEU_CALCUL)
        accroche.next_to(sous, DOWN, buff=0.9)
        astuce = Text("On met un nombre, entre 0 et 1, sur le hasard.", font_size=26, color=WHITE).next_to(accroche, DOWN, buff=0.5)
        self.play(Write(titre), FadeIn(sous, shift=0.3 * DOWN))
        self.play(Write(accroche))
        self.play(FadeIn(astuce, shift=UP * 0.2))
        self.wait(2.2)

    # ── écran 1 : les issues d'un dé ────────────────────────────────────────

    def ecran_issues(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("1. Les issues d'un dé")

        des = VGroup()
        for i in range(6):
            col = VERT_OK if (i + 1) % 2 == 0 else WHITE
            des.add(self.de(i + 1, [-4.5 + i * 1.8, 0.7, 0], s=1.3, color=col))
        self.play(LaggedStart(*[FadeIn(d, scale=0.7) for d in des], lag_ratio=0.15), run_time=1.8)

        n = Text("6 issues possibles : 1, 2, 3, 4, 5, 6", font_size=30, color=WHITE).move_to([0, -1.1, 0])
        self.play(FadeIn(n))
        self.wait(0.6)

        pairs = Text("« nombre pair » : 2, 4, 6  →  3 issues favorables", font_size=30, color=VERT_OK).to_edge(DOWN, buff=0.6)
        self.play(Write(pairs), Indicate(VGroup(des[1], des[3], des[5]), color=VERT_OK))
        self.wait(2.2)

    # ── écran 2 : calculer P(3) ─────────────────────────────────────────────

    def ecran_calcul3(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("2. Calculer une probabilité")

        de3 = self.de(3, [-3.6, 0.6, 0], s=1.8, color=BLEU_CALCUL)
        self.play(FadeIn(de3, scale=0.6))
        self.wait(0.4)

        formule = Text("issues favorables", font_size=28, color=VERT_OK).move_to([1.4, 1.3, 0])
        barre = Line([-0.2, 0.6, 0], [3.0, 0.6, 0], stroke_width=3, color=WHITE)
        formule2 = Text("issues possibles", font_size=28, color=BLEU_CALCUL).move_to([1.4, -0.1, 0])
        self.play(Write(formule), Create(barre), Write(formule2))
        self.wait(0.8)

        calc = Text("P(3) =", font_size=40, color=WHITE).move_to([-1.4, -1.6, 0])
        frac = self.fraction(1, 6, [0.5, -1.6, 0])
        self.play(Write(calc), FadeIn(frac))
        self.wait(2.2)

    # ── écran 3 : P(pair) = 3/6 = 1/2 ───────────────────────────────────────

    def ecran_calcul_pair(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("3. Un événement : « pair »")

        des = VGroup()
        for i, v in enumerate([2, 4, 6]):
            des.add(self.de(v, [-3.5 + i * 1.7, 1.1, 0], s=1.3, color=VERT_OK))
        self.play(LaggedStart(*[FadeIn(d, scale=0.7) for d in des], lag_ratio=0.2))
        self.wait(0.4)

        note = Text("3 issues favorables sur 6 possibles", font_size=30, color=WHITE).move_to([0, -0.5, 0])
        self.play(Write(note))
        self.wait(0.6)

        calc = Text("P(pair) =", font_size=38, color=WHITE).move_to([-2.4, -1.7, 0])
        frac1 = self.fraction(3, 6, [-0.4, -1.7, 0], color=BLEU_CALCUL, fs=38)
        egal = Text("=", font_size=38, color=WHITE).move_to([0.7, -1.7, 0])
        frac2 = self.fraction(1, 2, [1.7, -1.7, 0], fs=38)
        self.play(Write(calc), FadeIn(frac1))
        self.play(Write(egal), TransformFromCopy(frac1, frac2))
        self.wait(2.2)

    # ── écran 4 : billes P(rouge) = 3/5 ─────────────────────────────────────

    def ecran_billes(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("4. Un sac de billes")

        sac = RoundedRectangle(width=5.2, height=2.4, corner_radius=0.4, color=WHITE, stroke_width=3).move_to([-1.2, 0.6, 0])
        self.play(Create(sac))

        couleurs = [ROUGE_ERREUR] * 3 + [BLEU_CALCUL] * 2
        coords = [[-2.9, 1.1], [-1.9, 1.1], [-0.9, 1.1], [-2.4, 0.1], [-1.4, 0.1]]
        billes = VGroup(*[Dot([c[0], c[1], 0], radius=0.3, color=couleurs[i]) for i, c in enumerate(coords)])
        self.play(LaggedStart(*[GrowFromCenter(b) for b in billes], lag_ratio=0.12))
        self.wait(0.4)

        note = Text("3 rouges sur 5 billes", font_size=30, color=WHITE).move_to([2.6, 0.9, 0])
        calc = Text("P(rouge) =", font_size=34, color=WHITE).move_to([-1.6, -1.8, 0])
        frac = self.fraction(3, 5, [0.4, -1.8, 0], color=ROUGE_ERREUR, fs=38)
        self.play(FadeIn(note))
        self.play(Write(calc), FadeIn(frac))
        self.wait(2.2)

    # ── écran 5 : équiprobable ou non (roue) ────────────────────────────────

    def ecran_roue(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("5. Équiprobable ou non ?")

        centre = [-3.4, 0.2, 0]
        r = 1.6
        # 3 secteurs rouges (270°) + 1 bleu (90°)
        rouge = AnnularSector(inner_radius=0, outer_radius=r, angle=3 * PI / 2, start_angle=0, color=ROUGE_ERREUR, fill_opacity=0.85, stroke_color=WHITE).move_arc_center_to(centre)
        bleu = AnnularSector(inner_radius=0, outer_radius=r, angle=PI / 2, start_angle=3 * PI / 2, color=BLEU_CALCUL, fill_opacity=0.85, stroke_color=WHITE).move_arc_center_to(centre)
        self.play(GrowFromCenter(rouge), GrowFromCenter(bleu))
        self.wait(0.6)

        note = Text("3 parts rouges, 1 part bleue", font_size=28, color=WHITE).move_to([2.2, 1.2, 0])
        pr = Text("P(rouge) = 3/4", font_size=32, color=ROUGE_ERREUR).move_to([2.2, 0.3, 0])
        pb = Text("P(bleu) = 1/4", font_size=32, color=BLEU_CALCUL).move_to([2.2, -0.5, 0])
        self.play(FadeIn(note))
        self.play(Write(pr), Write(pb))
        self.wait(0.6)

        conclusion = Text("Pas la même chance → NON équiprobable", font_size=30, color=ORANGE_RETENUE).to_edge(DOWN)
        self.play(Write(conclusion))
        self.wait(2.2)

    # ── écran 6 : défi (panier 974) ─────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        titre = Text("Défi", font_size=46, color=JAUNE_TITRE).to_edge(UP)
        self.play(Write(titre))

        q1 = Text("Un panier à La Réunion :", font_size=30, color=WHITE).move_to([0, 2.0, 0])
        q2 = Text("4 mangues, 3 ananas, 2 letchis.", font_size=32, color=WHITE).move_to([0, 1.3, 0])
        q3 = Text("On prend un fruit au hasard.", font_size=30, color=WHITE).move_to([0, 0.6, 0])
        q4 = Text("Probabilité de prendre une mangue ?", font_size=32, color=BLEU_CALCUL).move_to([0, -0.2, 0])
        self.play(Write(q1), Write(q2))
        self.play(Write(q3), Write(q4))

        pause = Text("Mets pause et cherche !", font_size=30, color=ORANGE_RETENUE).to_edge(DOWN)
        self.play(Write(pause))
        self.wait(4.0)

    # ── écran 7 : correction ────────────────────────────────────────────────

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("Correction")

        etape1 = Text("Total de fruits : 4 + 3 + 2 = 9", font_size=34, color=WHITE).move_to([0, 1.4, 0])
        self.play(Write(etape1))
        self.wait(0.8)

        etape2 = Text("Mangues favorables : 4", font_size=32, color=ORANGE_RETENUE).move_to([0, 0.3, 0])
        self.play(Write(etape2))
        self.wait(0.6)

        calc = Text("P(mangue) =", font_size=38, color=WHITE).move_to([-1.6, -1.4, 0])
        frac = self.fraction(4, 9, [0.4, -1.4, 0], fs=40)
        self.play(Write(calc), FadeIn(frac))
        self.wait(2.4)

    # ── écran 8 : à retenir ─────────────────────────────────────────────────

    def ecran_conclusion(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        titre = Text("À retenir", font_size=46, color=JAUNE_TITRE).to_edge(UP)

        points = VGroup(
            Text("1. Probabilité = favorables ÷ possibles.", font_size=27),
            Text("2. Toujours entre 0 (impossible) et 1 (certain).", font_size=27),
            Text("3. Équiprobable = toutes les issues ont la même chance.", font_size=27),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.5).move_to([0, 0.3, 0])

        signature = Text(SIGNATURE, font_size=26, color=VERT_OK).to_edge(DOWN)

        self.play(Write(titre))
        self.play(LaggedStart(*[Write(p) for p in points], lag_ratio=0.3))
        self.play(Write(signature))
        self.wait(2.5)

    def construct(self):
        self.ecran_accueil()
        self.ecran_issues()
        self.ecran_calcul3()
        self.ecran_calcul_pair()
        self.ecran_billes()
        self.ecran_roue()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_conclusion()


# ─── SCRIPT VOIX (optionnel — à lire au téléphone par-dessus la vidéo muette) ──
# Dire « top » quand le titre d'accueil apparaît (point de synchro Clipchamp).
#
# [Accueil ~0:00]   « Salut ! Les probabilités. Quelle chance d'obtenir un 3 avec
#                     un dé ? On va mettre un nombre, entre 0 et 1, sur le hasard. »
# [Écran 1 ~0:12]   « Un dé a 6 issues possibles : 1, 2, 3, 4, 5, 6. Si mon
#                     événement est « nombre pair », les issues favorables sont 2,
#                     4 et 6 : trois issues. »
# [Écran 2 ~0:32]   « La probabilité, c'est le nombre d'issues favorables divisé
#                     par le nombre d'issues possibles. Pour un 3 : une seule
#                     favorable sur six. P de 3 égale un sixième. »
# [Écran 3 ~0:50]   « Pour « pair » : trois favorables sur six. Trois sixièmes,
#                     qu'on simplifie en un demi. »
# [Écran 4 ~1:08]   « Un sac de billes : 3 rouges et 2 bleues, donc 5 en tout. La
#                     probabilité de tirer une rouge, c'est 3 sur 5. »
# [Écran 5 ~1:26]   « Attention à l'équiprobabilité. Cette roue a 3 parts rouges
#                     et 1 bleue. Rouge, c'est 3 quarts ; bleu, 1 quart. Pas la
#                     même chance : ce n'est pas équiprobable. »
# [Défi ~1:46]      « À toi ! Un panier avec 4 mangues, 3 ananas, 2 letchis. La
#                     probabilité de prendre une mangue ? Mets pause. »
# [Correction ~2:02] « En tout : 4 plus 3 plus 2, ça fait 9 fruits. Il y a 4
#                     mangues. Donc P de mangue égale 4 sur 9. »
# [À retenir ~2:16] « On retient : probabilité, favorables sur possibles ;
#                     toujours entre 0 et 1 ; et équiprobable, c'est la même chance
#                     pour toutes les issues. À bientôt ! »
