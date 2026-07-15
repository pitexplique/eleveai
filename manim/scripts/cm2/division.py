# division.py
# EleveAI — Maths CM2 — La division (notionId : division)
# Mêmes exemples que la fiche lib/fiches/maths-cm2-division.tsx.
# CM2 = texte brut, langage d'un enfant de ~10 ans. Muet + texte. VARIÉTÉ
# D'ANIMATIONS + légendes distribuées.
#
# Mapping micro-compétences (banque division.bank.ts) → écrans :
# - division_sens               → écran 1 (12 billes partagées en 3 → 4 chacun)
# - division_lien_multiplication→ écran 2 (48 ÷ 6 = 8 car 6 × 8 = 48)
# - division_posee              → écran 3 (37 ÷ 5, potence, quotient 7)
# - division_reste              → écran 4 (reste 2 < 5 ; vérif 7 × 5 + 2 = 37)
# - division_probleme/defi      → défi + correction (38 samoussas ÷ 5 → 7 reste 3)
#
# Rendu : python -m manim render -qh manim/scripts/cm2/division.py DivisionCM2 -o eleveai-maths-cm2-division --media_dir manim/scripts/cm2/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from manim import *

from charte import *
from mascotte import MascotteMargouillat


class DivisionCM2(Scene):

    # ── outils communs ──────────────────────────────────────────────────────

    def add_mascotte(self, scale=0.5):
        m = MascotteMargouillat().scale(scale).to_corner(DOWN + RIGHT, buff=0.35)
        self.add(m)
        return m

    def titre_ecran(self, texte):
        t = Text(texte, font_size=40, color=JAUNE_TITRE).to_edge(UP)
        self.play(Write(t))
        return t

    def potence(self, dividende, diviseur, cx=-2.6, cy=0.9):
        """Le squelette d'une division posée : dividende | diviseur, barre sous
        le diviseur. Renvoie un dict de points utiles."""
        d1 = Text(dividende, font_size=54).move_to([cx, cy, 0])
        bar_v = Line([cx + 0.75, cy + 0.55, 0], [cx + 0.75, cy - 1.3, 0], stroke_width=3)
        d2 = Text(diviseur, font_size=54).move_to([cx + 1.25, cy, 0])
        bar_h = Line([cx + 0.75, cy - 0.5, 0], [cx + 1.9, cy - 0.5, 0], stroke_width=3)
        return {
            "dividende": d1, "bar_v": bar_v, "diviseur": d2, "bar_h": bar_h,
            "q_pos": [cx + 1.25, cy - 1.0, 0], "cx": cx, "cy": cy,
        }

    # ── écran 0 : accueil ───────────────────────────────────────────────────

    def ecran_accueil(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        titre = Text("La division", font_size=54, color=JAUNE_TITRE).to_edge(UP)
        sous_titre = Text("Maths CM2 — EleveAI", font_size=32, color=WHITE)
        sous_titre.next_to(titre, DOWN, buff=0.35)
        accroche = Text("37 bonbons pour 5 amis : combien chacun ?", font_size=36, color=BLEU_CALCUL)
        accroche.next_to(sous_titre, DOWN, buff=0.9)
        astuce = Text("Partager · le quotient · le reste", font_size=28, color=WHITE)
        astuce.next_to(accroche, DOWN, buff=0.5)
        self.play(Write(titre), FadeIn(sous_titre))
        self.play(GrowFromCenter(accroche))
        self.play(FadeIn(astuce, shift=UP * 0.2))
        self.wait(2.2)

    # ── écran 1 : le sens (12 billes partagées en 3) ───────────────────────
    # Entrées : billes distribuées une à une ; emphase : Indicate.

    def ecran_sens(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("1. Partager en parts égales")

        enonce = Text("12 billes partagées entre 3 enfants", font_size=32, color=WHITE).move_to([0, 2.0, 0])
        self.play(FadeIn(enonce, shift=DOWN * 0.2))

        # 3 boîtes.
        boites = VGroup(*[
            RoundedRectangle(width=2.2, height=1.7, corner_radius=0.12, stroke_width=2, color=BLEU_CALCUL)
            .move_to([-3.2 + i * 3.2, 0.1, 0]) for i in range(3)
        ])
        self.play(Create(boites))

        # 12 billes : le tas, puis on les distribue une par une (4 par boîte).
        tas = VGroup(*[Dot([-5.5 + (i % 6) * 0.35, -1.9 + (i // 6) * 0.4, 0], radius=0.13, color=VERT_OK)
                       for i in range(12)])
        self.play(LaggedStart(*[GrowFromCenter(b) for b in tas], lag_ratio=0.05))
        self.wait(0.4)

        anims = []
        for i, bille in enumerate(tas):
            boite_idx = i % 3
            r = i // 3
            cible = [-3.2 + boite_idx * 3.2 - 0.6 + (r % 2) * 0.6, 0.4 - (r // 2) * 0.6, 0]
            anims.append(bille.animate.move_to(cible))
        self.play(LaggedStart(*anims, lag_ratio=0.08, run_time=3.0))
        self.wait(0.6)

        conclusion = Text("12 ÷ 3 = 4   (4 billes chacun)", font_size=36, color=VERT_OK).to_edge(DOWN)
        self.play(Write(conclusion))
        self.wait(2.0)

    # ── écran 2 : le lien avec la table (48 ÷ 6 = 8) ───────────────────────
    # Entrées : FadeIn + TransformFromCopy ; emphase : Circumscribe.

    def ecran_lien(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("2. Diviser = l'inverse de multiplier")

        q = Text("48 ÷ 6 = ?", font_size=48, color=BLEU_CALCUL).move_to([0, 1.5, 0])
        self.play(GrowFromCenter(q))
        self.wait(0.5)

        astuce = Text("Je cherche dans la table de 6 :", font_size=30, color=ORANGE_RETENUE).move_to([0, 0.6, 0])
        self.play(FadeIn(astuce, shift=RIGHT * 0.3))
        self.wait(0.4)

        table = Text("6 × 8 = 48", font_size=44, color=WHITE).move_to([0, -0.3, 0])
        self.play(Write(table))
        self.play(Circumscribe(table, color=VERT_OK))
        self.wait(0.8)

        conclusion = Text("donc 48 ÷ 6 = 8", font_size=44, color=VERT_OK).to_edge(DOWN)
        self.play(Write(conclusion))
        self.wait(2.0)

    # ── écran 3 : poser avec un reste (37 ÷ 5) ─────────────────────────────
    # Le cœur : potence, quotient, 5×7=35, reste 2.

    def ecran_poser(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("3. Poser : 37 ÷ 5")

        p = self.potence("37", "5")
        self.play(FadeIn(p["dividende"]), Create(p["bar_v"]), FadeIn(p["diviseur"]), Create(p["bar_h"]))
        self.wait(0.6)

        question = Text("Combien de fois 5 dans 37 ?", font_size=28, color=BLEU_CALCUL).move_to([2.4, 1.4, 0])
        self.play(Write(question))
        self.wait(0.8)

        calc = Text("5 × 7 = 35   (5 × 8 = 40, trop grand)", font_size=28, color=BLEU_CALCUL).move_to([2.4, 0.7, 0])
        quotient = Text("7", font_size=54, color=VERT_OK).move_to(p["q_pos"])
        self.play(Write(calc))
        self.play(Write(quotient))
        self.wait(1.0)

        # on soustrait 35 pour trouver le reste.
        moins = Text("− 35", font_size=44).move_to([p["cx"] - 0.15, p["cy"] - 0.75, 0])
        petite_barre = Line([p["cx"] - 0.75, p["cy"] - 1.15, 0], [p["cx"] + 0.55, p["cy"] - 1.15, 0], stroke_width=3)
        reste = Text("2", font_size=48, color=ORANGE_RETENUE).move_to([p["cx"] + 0.1, p["cy"] - 1.6, 0])
        note = Text("37 − 35 = 2 : c'est le reste", font_size=28, color=ORANGE_RETENUE).move_to([2.4, -0.3, 0])
        self.play(Write(moins), Create(petite_barre))
        self.play(Write(reste), Write(note))
        self.wait(1.0)

        conclusion = Text("37 ÷ 5 : quotient 7, reste 2", font_size=36, color=VERT_OK).to_edge(DOWN)
        self.play(Write(conclusion), Flash(reste, color=ORANGE_RETENUE))
        self.wait(2.2)

    # ── écran 4 : le reste et la vérification ──────────────────────────────
    # Entrées : comparaison reste/diviseur ; emphase : Indicate + vérif verte.

    def ecran_reste(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("4. Le reste, et on vérifie")

        r1 = Text("Le reste est TOUJOURS plus petit que le diviseur.",
                  font_size=30, color=WHITE).move_to([0, 1.8, 0])
        self.play(FadeIn(r1, shift=DOWN * 0.2))

        compare = Text("2  <  5", font_size=56, color=BLEU_CALCUL).move_to([0, 0.7, 0])
        note = Text("reste 2 plus petit que le diviseur 5 ✔", font_size=26, color=ORANGE_RETENUE).move_to([0, -0.1, 0])
        self.play(GrowFromCenter(compare))
        self.play(Indicate(compare, color=VERT_OK), Write(note))
        self.wait(1.0)

        # la vérification.
        verif_titre = Text("Je vérifie : quotient × diviseur + reste", font_size=28, color=WHITE).move_to([0, -0.9, 0])
        self.play(Write(verif_titre))
        conclusion = Text("7 × 5 + 2 = 37 ✔", font_size=44, color=VERT_OK).to_edge(DOWN)
        self.play(Write(conclusion))
        self.wait(2.2)

    # ── écran 5 : défi (38 samoussas en barquettes de 5) ───────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        titre = Text("Défi", font_size=46, color=JAUNE_TITRE).to_edge(UP)
        self.play(GrowFromCenter(titre))

        q1 = Text("À La Réunion, on range 38 samoussas", font_size=32, color=WHITE).move_to([0, 1.5, 0])
        q2 = Text("en barquettes de 5.", font_size=32, color=WHITE).move_to([0, 0.9, 0])
        q3 = Text("Combien de barquettes pleines ?", font_size=32, color=BLEU_CALCUL).move_to([0, 0.1, 0])
        q4 = Text("Et combien en reste-t-il ?", font_size=32, color=ORANGE_RETENUE).move_to([0, -0.6, 0])
        self.play(Write(q1), Write(q2))
        self.play(Write(q3))
        self.play(FadeIn(q4, shift=UP * 0.2))

        pause = Text("Mets pause et cherche !", font_size=30, color=ORANGE_RETENUE).to_edge(DOWN)
        self.play(Write(pause))
        self.wait(4.0)

    # ── écran 6 : correction (38 ÷ 5 → 7 reste 3) ──────────────────────────

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("Correction")

        p = self.potence("38", "5", cx=-2.8, cy=0.9)
        self.play(FadeIn(p["dividende"]), Create(p["bar_v"]), FadeIn(p["diviseur"]), Create(p["bar_h"]))

        calc = Text("5 × 7 = 35", font_size=30, color=BLEU_CALCUL).move_to([2.2, 1.3, 0])
        quotient = Text("7", font_size=54, color=VERT_OK).move_to(p["q_pos"])
        self.play(Write(calc), Write(quotient))
        self.wait(0.8)

        moins = Text("− 35", font_size=44).move_to([p["cx"] - 0.15, p["cy"] - 0.75, 0])
        petite_barre = Line([p["cx"] - 0.75, p["cy"] - 1.15, 0], [p["cx"] + 0.55, p["cy"] - 1.15, 0], stroke_width=3)
        reste = Text("3", font_size=48, color=ORANGE_RETENUE).move_to([p["cx"] + 0.1, p["cy"] - 1.6, 0])
        self.play(Write(moins), Create(petite_barre), Write(reste))
        self.wait(0.6)

        lecture = Text("7 barquettes pleines, il reste 3 samoussas", font_size=28, color=WHITE).move_to([2.2, 0.2, 0])
        verif = Text("Vérif : 7 × 5 + 3 = 38 ✔", font_size=28, color=VERT_OK).move_to([2.2, -0.5, 0])
        self.play(Write(lecture))
        self.play(Write(verif))
        self.wait(0.6)

        conclusion = Text("38 ÷ 5 = 7, reste 3", font_size=40, color=VERT_OK).to_edge(DOWN)
        self.play(Write(conclusion))
        self.wait(2.4)

    # ── écran 7 : à retenir ─────────────────────────────────────────────────

    def ecran_conclusion(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        titre = Text("À retenir", font_size=46, color=JAUNE_TITRE).to_edge(UP)

        points = VGroup(
            Text("1. Diviser, c'est partager en parts égales.", font_size=27),
            Text("2. Le reste est toujours plus petit que le diviseur.", font_size=27),
            Text("3. Vérif : quotient × diviseur + reste = dividende.", font_size=27),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.5).move_to([0, 0.3, 0])

        signature = Text(SIGNATURE, font_size=26, color=VERT_OK).to_edge(DOWN)

        self.play(Write(titre))
        self.play(LaggedStart(*[FadeIn(p, shift=RIGHT * 0.3) for p in points], lag_ratio=0.3))
        self.play(Write(signature))
        self.wait(2.5)

    # ── déroulé ─────────────────────────────────────────────────────────────

    def construct(self):
        self.ecran_accueil()
        self.ecran_sens()
        self.ecran_lien()
        self.ecran_poser()
        self.ecran_reste()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_conclusion()


# ─── SCRIPT VOIX (optionnel — à lire au téléphone par-dessus la vidéo muette) ──
# Dire « top » quand le titre d'accueil apparaît (point de synchro Clipchamp).
# Ton simple, phrases courtes, on REDIT ce que l'écran montre.
#
# [Accueil ~0:00]    « Salut ! La division. Trente-sept bonbons pour cinq amis :
#                      combien chacun ? On va apprendre à partager. »
# [Écran 1 ~0:14]    « Douze billes à partager entre trois enfants. On donne une
#                      bille à chacun, encore une, encore une… À la fin, chaque
#                      enfant a quatre billes. Douze divisé par trois égale quatre. »
# [Écran 2 ~0:36]    « Quarante-huit divisé par six ? Diviser, c'est l'inverse de
#                      multiplier. Je cherche dans la table de six : six fois huit,
#                      quarante-huit. Donc quarante-huit divisé par six égale huit. »
# [Écran 3 ~0:54]    « Trente-sept divisé par cinq. Combien de fois cinq dans
#                      trente-sept ? Cinq fois sept, trente-cinq ; cinq fois huit,
#                      quarante, trop grand. Le quotient est sept. Trente-sept moins
#                      trente-cinq, il reste deux. »
# [Écran 4 ~1:16]    « Le reste, deux, est plus petit que le diviseur, cinq : c'est
#                      normal. Et on vérifie toujours : sept fois cinq plus deux,
#                      ça fait bien trente-sept. »
# [Défi ~1:36]       « À toi ! On range trente-huit samoussas en barquettes de cinq.
#                      Combien de barquettes pleines, et combien reste-t-il ? Pause. »
# [Correction ~1:54] « Cinq fois sept, trente-cinq. Le quotient est sept : sept
#                      barquettes pleines. Trente-huit moins trente-cinq, il reste
#                      trois samoussas. On vérifie : sept fois cinq plus trois,
#                      trente-huit. »
# [À retenir ~2:14]  « On retient : diviser, c'est partager en parts égales. Le
#                      reste est toujours plus petit que le diviseur. Et on vérifie
#                      avec quotient fois diviseur plus reste. À bientôt ! »
