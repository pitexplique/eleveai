# multiplication.py
# EleveAI — Maths CM2 — La multiplication (notionId : multiplication)
# Mêmes exemples que la fiche lib/fiches/maths-cm2-multiplication.tsx.
# CM2 = texte brut, langage d'un enfant de ~10 ans. Muet + texte. VARIÉTÉ
# D'ANIMATIONS + légendes distribuées.
#
# Mapping micro-compétences (banque multiplication.bank.ts) → écrans :
# - multiplication_table         → écran 1 (4 groupes de 6 → 4×6 = 24 ; tables)
# - multiplication_mental        → écran 2 (24×5 = ×10 puis moitié)
# - multiplication_posee         → écran 3 (247×4 = 988, colonne par colonne)
# - multiplication_posee (zéro)  → écran 4 (306×5 = 1530, le zéro garde sa place)
# - multiplication_puissance_dix → écran 5 (56×100 = 5600, deux zéros)
# - multiplication_probleme/defi → défi + correction (marché : 4×12 + 3×8 = 72)
#
# Rendu : python -m manim render -qh manim/scripts/cm2/multiplication.py MultiplicationCM2 -o eleveai-maths-cm2-multiplication --media_dir manim/scripts/cm2/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from manim import *

from charte import *
from mascotte import MascotteMargouillat


class MultiplicationCM2(Scene):

    # ── outils communs ──────────────────────────────────────────────────────

    def add_mascotte(self, scale=0.5):
        m = MascotteMargouillat().scale(scale).to_corner(DOWN + RIGHT, buff=0.35)
        self.add(m)
        return m

    def titre_ecran(self, texte):
        t = Text(texte, font_size=40, color=JAUNE_TITRE).to_edge(UP)
        self.play(Write(t))
        return t

    def digits(self, chaine, xs, y, color=WHITE, font_size=54):
        """Écrit un nombre chiffre par chiffre, aligné à droite sur les colonnes xs."""
        rangee = VGroup()
        decalage = len(xs) - len(chaine)
        for i, caractere in enumerate(chaine):
            rangee.add(
                Text(caractere, font_size=font_size, color=color)
                .move_to([xs[decalage + i], y, 0])
            )
        return rangee

    def paquet(self, n, x, y, couleur=BLEU_CALCUL):
        """Un paquet : une boîte contenant n points (2 rangées)."""
        boite = RoundedRectangle(width=1.5, height=1.5, corner_radius=0.12,
                                 stroke_width=2, color=couleur)
        boite.move_to([x, y, 0])
        pts = VGroup()
        cols = 3
        for i in range(n):
            r, c = divmod(i, cols)
            px = x - 0.45 + c * 0.45
            py = y + 0.28 - r * 0.5
            pts.add(Dot([px, py, 0], radius=0.11, color=couleur))
        return VGroup(boite, pts)

    # ── écran 0 : accueil ───────────────────────────────────────────────────

    def ecran_accueil(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        titre = Text("La multiplication", font_size=52, color=JAUNE_TITRE).to_edge(UP)
        sous_titre = Text("Maths CM2 — EleveAI", font_size=32, color=WHITE)
        sous_titre.next_to(titre, DOWN, buff=0.35)
        accroche = Text("6 boîtes de 8 crayons : combien en tout ?", font_size=36, color=BLEU_CALCUL)
        accroche.next_to(sous_titre, DOWN, buff=0.9)
        astuce = Text("Les tables · de tête · en colonnes", font_size=28, color=WHITE)
        astuce.next_to(accroche, DOWN, buff=0.5)
        self.play(Write(titre), FadeIn(sous_titre))
        self.play(GrowFromCenter(accroche))
        self.play(FadeIn(astuce, shift=UP * 0.2))
        self.wait(2.2)

    # ── écran 1 : des groupes égaux (4 × 6 = 24) ───────────────────────────
    # Entrées : LaggedStart des paquets ; emphase : Indicate.

    def ecran_groupes(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("1. Des groupes égaux")

        enonce = Text("4 paquets de 6, c'est 4 × 6", font_size=32, color=WHITE).move_to([0, 2.0, 0])
        self.play(FadeIn(enonce, shift=DOWN * 0.2))

        paquets = VGroup(*[self.paquet(6, -4.0 + i * 2.4, 0.4) for i in range(4)])
        self.play(LaggedStart(*[GrowFromCenter(p) for p in paquets], lag_ratio=0.25))
        self.wait(0.6)

        somme = Text("6 + 6 + 6 + 6 = 24", font_size=32, color=ORANGE_RETENUE).move_to([0, -1.3, 0])
        self.play(Write(somme))
        self.wait(0.8)

        conclusion = Text("4 × 6 = 24   (les tables : à connaître par cœur !)",
                          font_size=32, color=VERT_OK).to_edge(DOWN)
        self.play(Write(conclusion), Indicate(somme, color=VERT_OK))
        self.wait(2.2)

    # ── écran 2 : de tête (24 × 5) ─────────────────────────────────────────
    # Entrées : FadeIn shift en cascade ; emphase : Circumscribe.

    def ecran_mental(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("2. Calculer de tête")

        calcul = Text("24 × 5 = ?", font_size=46, color=BLEU_CALCUL).move_to([0, 1.7, 0])
        self.play(GrowFromCenter(calcul))
        self.wait(0.5)

        astuce = Text("× 5, c'est × 10 puis la moitié", font_size=30, color=ORANGE_RETENUE).move_to([0, 0.8, 0])
        self.play(FadeIn(astuce, shift=RIGHT * 0.3))
        self.wait(0.6)

        e1 = Text("24 × 10 = 240", font_size=34, color=WHITE).move_to([0, 0.0, 0])
        e2 = Text("la moitié de 240 = 120", font_size=34, color=WHITE).move_to([0, -0.7, 0])
        self.play(FadeIn(e1, shift=UP * 0.2))
        self.play(FadeIn(e2, shift=UP * 0.2))
        self.wait(0.8)

        conclusion = Text("24 × 5 = 120", font_size=44, color=VERT_OK).to_edge(DOWN)
        self.play(Write(conclusion), Circumscribe(e2, color=VERT_OK))
        self.wait(2.2)

    # ── écran 3 : poser la multiplication (247 × 4 = 988) ──────────────────
    # Le cœur : colonne par colonne, retenues en orange, résultat vert.

    def ecran_poser(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("3. Poser la multiplication")

        xs = [-3.0, -2.3, -1.6]
        haut = self.digits("247", xs, 1.15)
        bas = self.digits("4", xs, 0.35)
        fois = Text("×", font_size=54).move_to([-3.8, 0.35, 0])
        barre = Line([-4.1, -0.15, 0], [-1.2, -0.15, 0], stroke_width=3)
        self.play(FadeIn(haut), FadeIn(bas), FadeIn(fois), Create(barre))

        regle = Text("On multiplie 4 par chaque chiffre,", font_size=26, color=BLEU_CALCUL).move_to([2.2, 1.5, 0])
        regle2 = Text("des unités vers les centaines.", font_size=26, color=BLEU_CALCUL).move_to([2.2, 1.05, 0])
        self.play(Write(regle), Write(regle2))
        self.wait(1.0)
        self.play(FadeOut(regle), FadeOut(regle2))

        # unités : 7 × 4 = 28
        cadre = SurroundingRectangle(VGroup(haut[2], bas[0]), color=BLEU_CALCUL, buff=0.16)
        calc1 = Text("7 × 4 = 28", font_size=30, color=BLEU_CALCUL).move_to([2.2, 0.9, 0])
        r_u = Text("8", font_size=54).move_to([xs[2], -0.75, 0])
        ret1 = Text("2", font_size=28, color=ORANGE_RETENUE).move_to([xs[1], 1.75, 0])
        self.play(Create(cadre), Write(calc1))
        self.play(Write(r_u), Write(ret1))
        self.wait(1.0)

        # dizaines : 4 × 4 = 16, + 2 = 18
        cadre2 = SurroundingRectangle(VGroup(ret1, haut[1], bas[0]), color=BLEU_CALCUL, buff=0.16)
        calc2 = Text("4 × 4 = 16, + 2 = 18", font_size=30, color=BLEU_CALCUL).move_to([2.2, 0.25, 0])
        r_d = Text("8", font_size=54).move_to([xs[1], -0.75, 0])
        ret2 = Text("1", font_size=28, color=ORANGE_RETENUE).move_to([xs[0], 1.75, 0])
        self.play(Transform(cadre, cadre2), Write(calc2))
        self.play(Write(r_d), Write(ret2))
        self.wait(1.0)

        # centaines : 2 × 4 = 8, + 1 = 9
        cadre3 = SurroundingRectangle(VGroup(ret2, haut[0], bas[0]), color=BLEU_CALCUL, buff=0.16)
        calc3 = Text("2 × 4 = 8, + 1 = 9", font_size=30, color=BLEU_CALCUL).move_to([2.2, -0.4, 0])
        r_c = Text("9", font_size=54).move_to([xs[0], -0.75, 0])
        self.play(Transform(cadre, cadre3), Write(calc3))
        self.play(Write(r_c))
        self.wait(0.6)

        resultat = VGroup(r_c, r_d, r_u)
        conclusion = Text("247 × 4 = 988", font_size=36, color=VERT_OK).to_edge(DOWN)
        self.play(FadeOut(cadre), resultat.animate.set_color(VERT_OK), Write(conclusion))
        self.wait(2.2)

    # ── écran 4 : le zéro garde sa place (306 × 5 = 1530) ──────────────────
    # Entrées : digits + Indicate sur le 0 ; emphase : Flash.

    def ecran_zero(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("4. Le zéro garde sa place")

        xs = [-2.6, -1.9, -1.2]
        haut = self.digits("306", xs, 1.1)
        bas = self.digits("5", xs, 0.35)
        fois = Text("×", font_size=54).move_to([-3.4, 0.35, 0])
        barre = Line([-3.7, -0.15, 0], [-0.8, -0.15, 0], stroke_width=3)
        self.play(FadeIn(haut), FadeIn(bas), FadeIn(fois), Create(barre))
        self.wait(0.4)

        # on attire l'œil sur le zéro des dizaines.
        box0 = SurroundingRectangle(haut[1], color=ROUGE_ERREUR, buff=0.1)
        note = Text("5 × 0 = 0 : on écrit 0 à sa place,", font_size=28, color=ORANGE_RETENUE).move_to([2.4, 1.0, 0])
        note2 = Text("on ne le supprime pas !", font_size=28, color=ORANGE_RETENUE).move_to([2.4, 0.5, 0])
        self.play(Create(box0), Indicate(haut[1], color=ROUGE_ERREUR))
        self.play(Write(note), Write(note2))
        self.wait(1.2)

        resultat = self.digits("1530", [-3.3, -2.6, -1.9, -1.2], -0.75, color=VERT_OK)
        conclusion = Text("306 × 5 = 1530   (surtout pas 153)", font_size=34, color=VERT_OK).to_edge(DOWN)
        self.play(FadeOut(box0), Write(resultat))
        self.play(Write(conclusion), Flash(resultat[1], color=VERT_OK))
        self.wait(2.2)

    # ── écran 5 : × 10, 100, 1000 (56 × 100 = 5600) ────────────────────────
    # Entrées : les zéros arrivent par FadeIn scale ; emphase : Indicate.

    def ecran_puissance(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("5. Multiplier par 10, 100, 1000")

        regle = Text("Pour un nombre entier : on ajoute des zéros à droite.",
                     font_size=30, color=ORANGE_RETENUE).move_to([0, 1.9, 0])
        self.play(FadeIn(regle, shift=DOWN * 0.2))
        self.wait(0.6)

        base = Text("56 × 100 =", font_size=48, color=WHITE).move_to([-1.4, 0.4, 0])
        cinquante_six = Text("56", font_size=48, color=BLEU_CALCUL).next_to(base, RIGHT, buff=0.25)
        self.play(Write(base), FadeIn(cinquante_six))
        self.wait(0.4)

        z1 = Text("0", font_size=48, color=VERT_OK).next_to(cinquante_six, RIGHT, buff=0.05)
        z2 = Text("0", font_size=48, color=VERT_OK).next_to(z1, RIGHT, buff=0.05)
        deux = Text("2 zéros pour × 100", font_size=28, color=VERT_OK).move_to([2.4, -0.6, 0])
        self.play(FadeIn(z1, scale=0.3))
        self.play(FadeIn(z2, scale=0.3))
        self.play(Write(deux))
        self.play(Indicate(VGroup(z1, z2), color=VERT_OK))
        self.wait(0.8)

        conclusion = Text("56 × 100 = 5600", font_size=42, color=VERT_OK).to_edge(DOWN)
        self.play(Write(conclusion))
        self.wait(2.2)

    # ── écran 6 : défi (marché, deux étapes) ───────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        titre = Text("Défi", font_size=46, color=JAUNE_TITRE).to_edge(UP)
        self.play(GrowFromCenter(titre))

        q1 = Text("Au marché, une famille achète :", font_size=32, color=WHITE).move_to([0, 1.5, 0])
        q2 = Text("4 paniers de 12 mangues", font_size=32, color=BLEU_CALCUL).move_to([0, 0.8, 0])
        q3 = Text("et 3 paniers de 8 letchis.", font_size=32, color=VERT_OK).move_to([0, 0.2, 0])
        q4 = Text("Combien de fruits en tout ?", font_size=32, color=WHITE).move_to([0, -0.6, 0])
        self.play(Write(q1))
        self.play(FadeIn(q2, shift=RIGHT * 0.3))
        self.play(FadeIn(q3, shift=RIGHT * 0.3))
        self.play(Write(q4))

        pause = Text("Mets pause et cherche !", font_size=30, color=ORANGE_RETENUE).to_edge(DOWN)
        self.play(Write(pause))
        self.wait(4.0)

    # ── écran 7 : correction (48 + 24 = 72) ────────────────────────────────

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("Correction")

        e1 = Text("Les mangues : 4 × 12 = 48", font_size=34, color=BLEU_CALCUL).move_to([0, 1.4, 0])
        self.play(FadeIn(e1, shift=RIGHT * 0.3))
        self.wait(0.8)

        e2 = Text("Les letchis : 3 × 8 = 24", font_size=34, color=VERT_OK).move_to([0, 0.5, 0])
        self.play(FadeIn(e2, shift=RIGHT * 0.3))
        self.wait(0.8)

        e3 = Text("En tout : 48 + 24", font_size=34, color=WHITE).move_to([0, -0.5, 0])
        self.play(Write(e3))
        self.wait(0.6)

        conclusion = Text("48 + 24 = 72 fruits", font_size=44, color=VERT_OK).to_edge(DOWN)
        self.play(Write(conclusion))
        self.wait(2.4)

    # ── écran 8 : à retenir ─────────────────────────────────────────────────

    def ecran_conclusion(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        titre = Text("À retenir", font_size=46, color=JAUNE_TITRE).to_edge(UP)

        points = VGroup(
            Text("1. Multiplier, c'est compter des groupes égaux.", font_size=27),
            Text("2. Je pose en alignant les rangs, sans oublier les retenues.", font_size=27),
            Text("3. × 10, × 100, × 1000 : j'ajoute 1, 2 ou 3 zéros à droite.", font_size=27),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.5).move_to([0, 0.3, 0])

        signature = Text(SIGNATURE, font_size=26, color=VERT_OK).to_edge(DOWN)

        self.play(Write(titre))
        self.play(LaggedStart(*[FadeIn(p, shift=RIGHT * 0.3) for p in points], lag_ratio=0.3))
        self.play(Write(signature))
        self.wait(2.5)

    # ── déroulé ─────────────────────────────────────────────────────────────

    def construct(self):
        self.ecran_accueil()
        self.ecran_groupes()
        self.ecran_mental()
        self.ecran_poser()
        self.ecran_zero()
        self.ecran_puissance()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_conclusion()


# ─── SCRIPT VOIX (optionnel — à lire au téléphone par-dessus la vidéo muette) ──
# Dire « top » quand le titre d'accueil apparaît (point de synchro Clipchamp).
# Ton simple, phrases courtes, on REDIT ce que l'écran montre.
#
# [Accueil ~0:00]    « Salut ! La multiplication. Six boîtes de huit crayons, ça
#                      fait combien de crayons ? On va apprendre à calculer vite. »
# [Écran 1 ~0:14]    « Quatre paquets de six, c'est quatre fois six. Six plus six
#                      plus six plus six, ça fait vingt-quatre. Multiplier, c'est
#                      compter des groupes égaux. Et les tables, on les apprend par
#                      cœur ! »
# [Écran 2 ~0:34]    « Vingt-quatre fois cinq, de tête ? Multiplier par cinq, c'est
#                      multiplier par dix puis prendre la moitié. Vingt-quatre fois
#                      dix, deux cent quarante. La moitié, cent vingt. »
# [Écran 3 ~0:54]    « Deux cent quarante-sept fois quatre : on pose. Sept fois
#                      quatre, vingt-huit : j'écris huit, je retiens deux. Quatre
#                      fois quatre, seize, plus deux, dix-huit : j'écris huit, je
#                      retiens un. Deux fois quatre, huit, plus un, neuf. Ça fait
#                      neuf cent quatre-vingt-huit. »
# [Écran 4 ~1:18]    « Trois cent six fois cinq. Attention au zéro ! Cinq fois zéro,
#                      zéro : on l'écrit à sa place, on ne le supprime pas. Le
#                      résultat, c'est mille cinq cent trente, pas cent cinquante-trois. »
# [Écran 5 ~1:38]    « Multiplier par dix, cent, mille : pour un nombre entier, on
#                      ajoute des zéros à droite. Cinquante-six fois cent : deux
#                      zéros, cinq mille six cents. »
# [Défi ~1:56]       « À toi ! Quatre paniers de douze mangues, et trois paniers de
#                      huit letchis. Combien de fruits en tout ? Mets pause. »
# [Correction ~2:14] « Les mangues : quatre fois douze, quarante-huit. Les letchis :
#                      trois fois huit, vingt-quatre. En tout : quarante-huit plus
#                      vingt-quatre, soixante-douze fruits. »
# [À retenir ~2:34]  « On retient : multiplier, c'est des groupes égaux. On pose en
#                      alignant les rangs, avec les retenues. Et par dix, cent, mille,
#                      on ajoute des zéros. À bientôt ! »
