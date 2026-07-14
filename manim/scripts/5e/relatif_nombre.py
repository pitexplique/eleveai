# relatif_nombre.py
# EleveAI — Maths 5e — Les nombres relatifs (notionId : relatif_nombre)
# Mêmes exemples que la fiche lib/fiches/maths-5e-nombres-relatifs.tsx.
#
# Mapping micro-compétences (banque nombres-relatifs.bank.ts) → écrans :
# - relatif_lire            → écran 1 (lire -3 : « en dessous de zéro »)
# - relatif_signe           → écran 1 (négatifs à gauche, positifs à droite de 0)
# - relatif_comparer        → écran 2 (Maïdo : -1 vs +6, le plus à droite gagne)
# - relatif_placer          → écran 3 (placer A à l'abscisse -3)
# - relatif_oppose          → écran 4 (l'opposé de -7 est +7, symétrie autour de 0)
# - relatif_valeur_absolue  → écran 5 (la distance à 0 de -5 vaut 5)
# - relatif_defi            → défi + correction (-2 puis +5 puis -3 → 0)
#
# Rendu : python -m manim render -qh manim/scripts/5e/relatif_nombre.py RelatifNombre5e -o eleveai-maths-5e-relatif-nombre --media_dir manim/scripts/5e/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from manim import *

from charte import *
from mascotte import MascotteMargouillat


class RelatifNombre5e(Scene):

    # ── outils communs ──────────────────────────────────────────────────────

    def add_mascotte(self, scale=0.5):
        m = MascotteMargouillat().scale(scale).to_corner(DOWN + RIGHT, buff=0.35)
        self.add(m)
        return m

    def titre_ecran(self, texte):
        t = Text(texte, font_size=40, color=JAUNE_TITRE).to_edge(UP)
        self.play(Write(t))
        return t

    def droite(self, vmin, vmax, y=0.0, x_span=5.2, colorer=True):
        """Une droite graduée : axe + graduations + nombres. Renvoie (groupe, x_of)."""
        x0, x1 = -x_span, x_span

        def x_of(v):
            return x0 + (x1 - x0) * (v - vmin) / (vmax - vmin)

        axe = Arrow([x0 - 0.4, y, 0], [x1 + 0.4, y, 0], buff=0, stroke_width=3, color=WHITE)
        ticks = VGroup()
        labels = VGroup()
        for v in range(vmin, vmax + 1):
            tx = x_of(v)
            ticks.add(Line([tx, y - 0.14, 0], [tx, y + 0.14, 0], stroke_width=2))
            if colorer:
                col = VERT_OK if v > 0 else (ROUGE_ERREUR if v < 0 else JAUNE_TITRE)
            else:
                col = WHITE
            labels.add(Text(str(v), font_size=24, color=col).move_to([tx, y - 0.5, 0]))
        return VGroup(axe, ticks, labels), x_of

    def point(self, x_of, v, label, color, y=0.0):
        dot = Dot([x_of(v), y, 0], color=color, radius=0.13)
        lbl = Text(label, font_size=32, color=color).move_to([x_of(v), y + 0.68, 0])
        return VGroup(dot, lbl)

    # ── écran 0 : accueil ───────────────────────────────────────────────────

    def ecran_accueil(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        titre = Text("Les nombres relatifs", font_size=50, color=JAUNE_TITRE).to_edge(UP)
        sous_titre = Text("Maths 5e — EleveAI", font_size=32, color=WHITE)
        sous_titre.next_to(titre, DOWN, buff=0.35)
        accroche = Text("Qui est le plus grand : -2 ou +3 ?", font_size=36, color=BLEU_CALCUL)
        accroche.next_to(sous_titre, DOWN, buff=0.9)
        astuce = Text("Réponse dans la vidéo — tout se lit sur une droite.", font_size=26, color=WHITE)
        astuce.next_to(accroche, DOWN, buff=0.5)
        self.play(Write(titre), FadeIn(sous_titre))
        self.play(Write(accroche))
        self.play(FadeIn(astuce, shift=UP * 0.2))
        self.wait(2.2)

    # ── écran 1 : lire le signe (négatifs à gauche, positifs à droite) ──────

    def ecran_signe(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("1. Un signe et un côté")

        ligne, x_of = self.droite(-5, 5, y=0.3)
        self.play(Create(ligne[0]), Create(ligne[1]))
        self.play(LaggedStart(*[Write(l) for l in ligne[2]], lag_ratio=0.05))
        self.wait(0.6)

        zero_box = SurroundingRectangle(ligne[2][5], color=JAUNE_TITRE, buff=0.1)
        zero_txt = Text("0 : ni positif, ni négatif", font_size=26, color=JAUNE_TITRE).move_to([0, -1.5, 0])
        self.play(Create(zero_box), Write(zero_txt))
        self.wait(1.4)

        gauche = Text("négatifs (-)", font_size=28, color=ROUGE_ERREUR).move_to([-3.3, 1.4, 0])
        droite = Text("positifs (+)", font_size=28, color=VERT_OK).move_to([3.3, 1.4, 0])
        fg = Arrow([-0.4, 1.0, 0], [-3.3, 1.0, 0], buff=0.1, color=ROUGE_ERREUR)
        fd = Arrow([0.4, 1.0, 0], [3.3, 1.0, 0], buff=0.1, color=VERT_OK)
        self.play(FadeOut(zero_box), FadeOut(zero_txt))
        self.play(GrowArrow(fg), GrowArrow(fd), Write(gauche), Write(droite))
        self.wait(1.2)

        lire = Text("« 3 en dessous de zéro » → -3", font_size=32, color=BLEU_CALCUL).to_edge(DOWN)
        dot = Dot([x_of(-3), 0.3, 0], color=ROUGE_ERREUR, radius=0.14)
        self.play(Write(lire), FadeIn(dot, scale=0.4))
        self.play(Indicate(ligne[2][2], color=ROUGE_ERREUR), Flash(dot, color=ROUGE_ERREUR))
        self.wait(2.2)

    # ── écran 2 : comparer (-1 vs +6, le Maïdo) ─────────────────────────────

    def ecran_comparer(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("2. Comparer")

        enonce = Text("Au Maïdo : -1 °C le matin, +6 °C l'après-midi", font_size=28, color=WHITE).move_to([0, 1.9, 0])
        self.play(Write(enonce))

        ligne, x_of = self.droite(-3, 8, y=0.0)
        self.play(Create(ligne[0]), Create(ligne[1]), Write(ligne[2]))

        p1 = self.point(x_of, -1, "-1", ROUGE_ERREUR)
        p2 = self.point(x_of, 6, "+6", VERT_OK)
        self.play(FadeIn(p1, scale=0.4), FadeIn(p2, scale=0.4))
        self.wait(0.8)

        fleche = Arrow([x_of(-1), -0.9, 0], [x_of(6), -0.9, 0], buff=0.1, color=BLEU_CALCUL)
        plus_grand = Text("le plus à droite = le plus grand", font_size=26, color=BLEU_CALCUL).move_to([0, -1.5, 0])
        self.play(GrowArrow(fleche), Write(plus_grand))
        self.wait(1.2)

        conclusion = Text("+6 > -1", font_size=44, color=VERT_OK).to_edge(DOWN)
        self.play(Circumscribe(p2, color=VERT_OK), Write(conclusion))
        self.wait(2.2)

    # ── écran 3 : placer un point (A à l'abscisse -3) ───────────────────────

    def ecran_placer(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("3. Placer un point")

        consigne = Text("Place le point A d'abscisse -3", font_size=30, color=WHITE).move_to([0, 1.9, 0])
        self.play(Write(consigne))

        ligne, x_of = self.droite(-5, 5, y=0.2)
        self.play(Create(ligne[0]), Create(ligne[1]), Write(ligne[2]))
        self.wait(0.4)

        depart = Dot([x_of(0), 0.2, 0], color=JAUNE_TITRE, radius=0.12)
        etape = Text("Je pars de 0, je vais à GAUCHE (négatif) de 3", font_size=26, color=ORANGE_RETENUE).to_edge(DOWN)
        self.play(FadeIn(depart), Write(etape))

        chemin = Arrow([x_of(0), 0.9, 0], [x_of(-3), 0.9, 0], buff=0.1, color=ORANGE_RETENUE)
        self.play(GrowArrow(chemin))
        self.play(depart.animate.move_to([x_of(-3), 0.2, 0]).set_color(BLEU_CALCUL))
        self.wait(0.4)

        a_lbl = Text("A", font_size=34, color=BLEU_CALCUL).move_to([x_of(-3), 0.9, 0])
        self.play(FadeOut(chemin), Write(a_lbl), Indicate(depart, color=BLEU_CALCUL))
        self.wait(2.2)

    # ── écran 4 : l'opposé (-7 et +7) ───────────────────────────────────────

    def ecran_oppose(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("4. L'opposé")

        ligne, x_of = self.droite(-8, 8, y=0.0)
        self.play(Create(ligne[0]), Create(ligne[1]), Write(ligne[2]))

        p_neg = self.point(x_of, -7, "-7", ROUGE_ERREUR)
        self.play(FadeIn(p_neg, scale=0.4))
        self.wait(0.6)

        d_neg = DoubleArrow([x_of(-7), -0.8, 0], [x_of(0), -0.8, 0], buff=0.05, color=WHITE, stroke_width=3)
        d_pos = DoubleArrow([x_of(0), -0.8, 0], [x_of(7), -0.8, 0], buff=0.05, color=WHITE, stroke_width=3)
        s7g = Text("7", font_size=26, color=WHITE).move_to([x_of(-3.5), -1.25, 0])
        self.play(GrowFromCenter(d_neg), Write(s7g))
        self.wait(0.4)

        p_pos = self.point(x_of, 7, "+7", VERT_OK)
        s7d = Text("7", font_size=26, color=WHITE).move_to([x_of(3.5), -1.25, 0])
        self.play(TransformFromCopy(p_neg, p_pos), GrowFromCenter(d_pos), Write(s7d))
        self.wait(1.0)

        conclusion = Text("L'opposé de -7 est +7", font_size=36, color=VERT_OK).to_edge(DOWN)
        self.play(Write(conclusion))
        self.wait(2.2)

    # ── écran 5 : la valeur absolue (distance à 0) ──────────────────────────

    def ecran_valeur_absolue(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("5. La distance à 0")

        ligne, x_of = self.droite(-6, 6, y=0.2)
        self.play(Create(ligne[0]), Create(ligne[1]), Write(ligne[2]))

        p = self.point(x_of, -5, "-5", ROUGE_ERREUR, y=0.2)
        self.play(FadeIn(p, scale=0.4))
        self.wait(0.5)

        mesure = DoubleArrow([x_of(-5), -0.7, 0], [x_of(0), -0.7, 0], buff=0.05, color=BLEU_CALCUL, stroke_width=4)
        cinq = Text("5 unités", font_size=28, color=BLEU_CALCUL).move_to([x_of(-2.5), -1.25, 0])
        self.play(GrowFromCenter(mesure), Write(cinq))
        self.wait(1.0)

        conclusion = Text("valeur absolue de -5 = 5  (toujours positive)", font_size=30, color=VERT_OK).to_edge(DOWN)
        self.play(Write(conclusion))
        self.wait(2.4)

    # ── écran 6 : défi (thermomètre du sommet) ──────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        titre = Text("Défi", font_size=46, color=JAUNE_TITRE).to_edge(UP)
        self.play(Write(titre))

        q1 = Text("Au sommet, il fait -2 °C.", font_size=32, color=WHITE).move_to([0, 1.6, 0])
        q2 = Text("La température monte de 5 degrés,", font_size=30, color=WHITE).move_to([0, 0.95, 0])
        q3 = Text("puis redescend de 3 degrés.", font_size=30, color=WHITE).move_to([0, 0.4, 0])
        q4 = Text("Quelle est la température finale ?", font_size=32, color=BLEU_CALCUL).move_to([0, -0.4, 0])

        ligne, _ = self.droite(-4, 6, y=-1.5, x_span=4.6)
        self.play(Write(q1), Write(q2), Write(q3))
        self.play(Write(q4), Create(ligne[0]), Create(ligne[1]), Write(ligne[2]))

        pause = Text("Mets pause et cherche !", font_size=30, color=ORANGE_RETENUE).to_edge(DOWN)
        self.play(Write(pause))
        self.wait(4.0)

    # ── écran 7 : correction ────────────────────────────────────────────────

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("Correction")

        ligne, x_of = self.droite(-4, 6, y=1.2, x_span=5.0)
        self.play(Create(ligne[0]), Create(ligne[1]), Write(ligne[2]))

        curseur = Dot([x_of(-2), 1.2, 0], color=BLEU_CALCUL, radius=0.14)
        depart = Text("On part de -2", font_size=30, color=WHITE).move_to([0, 0.1, 0])
        self.play(FadeIn(curseur, scale=0.4), Write(depart))
        self.wait(1.0)

        etape1 = Text("+5 :  -2 + 5 = +3", font_size=32, color=VERT_OK).move_to([0, -0.7, 0])
        f1 = Arrow([x_of(-2), 1.7, 0], [x_of(3), 1.7, 0], buff=0.1, color=VERT_OK)
        self.play(GrowArrow(f1), curseur.animate.move_to([x_of(3), 1.2, 0]), Write(etape1))
        self.wait(1.2)

        etape2 = Text("-3 :  +3 - 3 = 0", font_size=32, color=ORANGE_RETENUE).move_to([0, -1.4, 0])
        f2 = Arrow([x_of(3), 0.7, 0], [x_of(0), 0.7, 0], buff=0.1, color=ORANGE_RETENUE)
        self.play(GrowArrow(f2), curseur.animate.move_to([x_of(0), 1.2, 0]).set_color(JAUNE_TITRE), Write(etape2))
        self.wait(1.0)

        conclusion = Text("Température finale : 0 °C", font_size=38, color=VERT_OK).to_edge(DOWN)
        self.play(Write(conclusion), Flash(curseur, color=JAUNE_TITRE))
        self.wait(2.4)

    # ── écran 8 : à retenir ─────────────────────────────────────────────────

    def ecran_conclusion(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        titre = Text("À retenir", font_size=46, color=JAUNE_TITRE).to_edge(UP)

        points = VGroup(
            Text("1. Un relatif = un signe (+/-) et une distance à 0.", font_size=28),
            Text("2. Sur la droite : le plus à droite est le plus grand.", font_size=28),
            Text("3. Opposés : -5 et +5, de chaque côté de 0.", font_size=28),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.5).move_to([0, 0.3, 0])

        signature = Text(SIGNATURE, font_size=26, color=VERT_OK).to_edge(DOWN)

        self.play(Write(titre))
        self.play(LaggedStart(*[Write(p) for p in points], lag_ratio=0.3))
        self.play(Write(signature))
        self.wait(2.5)

    # ── déroulé ─────────────────────────────────────────────────────────────

    def construct(self):
        self.ecran_accueil()
        self.ecran_signe()
        self.ecran_comparer()
        self.ecran_placer()
        self.ecran_oppose()
        self.ecran_valeur_absolue()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_conclusion()


# ─── SCRIPT VOIX (optionnel — à lire au téléphone par-dessus la vidéo muette) ──
# Dire « top » quand le titre d'accueil apparaît (point de synchro Clipchamp).
# Ton simple, phrases courtes, on REDIT ce que l'écran montre.
#
# [Accueil ~0:00]   « Salut ! Aujourd'hui, les nombres relatifs. Petite question :
#                     qui est le plus grand, moins deux ou plus trois ? Regarde. »
# [Écran 1 ~0:12]   « Voici la droite des nombres. Au milieu, le zéro : il n'est ni
#                     positif ni négatif. À droite, les positifs ; à gauche, les
#                     négatifs. Trois en dessous de zéro, ça s'écrit moins trois. »
# [Écran 2 ~0:30]   « Au Maïdo : moins un le matin, plus six l'après-midi. Le plus
#                     grand, c'est le plus à droite. Donc plus six est plus grand
#                     que moins un. Un positif gagne toujours contre un négatif. »
# [Écran 3 ~0:48]   « Placer moins trois ? Je pars de zéro et je vais à gauche,
#                     parce que c'est négatif, de trois pas. Voilà le point A. »
# [Écran 4 ~1:04]   « L'opposé, c'est le même nombre de l'autre côté du zéro.
#                     L'opposé de moins sept, c'est plus sept. Même distance :
#                     sept d'un côté, sept de l'autre. »
# [Écran 5 ~1:20]   « La valeur absolue, c'est juste la distance jusqu'à zéro.
#                     De moins cinq à zéro, il y a cinq. Donc la valeur absolue de
#                     moins cinq, c'est cinq. Une distance, c'est toujours positif. »
# [Défi ~1:36]      « À toi ! Au sommet, moins deux degrés. Ça monte de cinq, puis
#                     ça redescend de trois. Température finale ? Mets pause. »
# [Correction ~1:52] « On part de moins deux. On monte de cinq : moins deux plus
#                     cinq, ça fait plus trois. On descend de trois : plus trois
#                     moins trois, ça fait zéro. Il fait zéro degré. »
# [À retenir ~2:12] « On retient : un relatif, c'est un signe et une distance à
#                     zéro. Le plus à droite est le plus grand. Et les opposés se
#                     répondent de chaque côté du zéro. À bientôt ! »
