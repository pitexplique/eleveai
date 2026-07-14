# stat_statistique.py
# EleveAI — Maths 5e — Les statistiques (notionId : stat_statistique)
# Mêmes exemples que la fiche lib/fiches/maths-5e-statistiques.tsx.
#
# Mapping micro-compétences (banque statistiques.bank.ts) → écrans :
# - stat_lire_graphique / stat_lire_tableau → écran 1 (barres, la plus haute = Foot)
# - stat_donnee_organiser                   → écran 2 (effectif total = 32)
# - stat_effectif_frequence                 → écran 3 (10 / 25 = 0,4 = 40 %)
# - stat_moyenne                            → écran 4 (moyenne de 10, 12, 14 = 12)
# - stat_representer / _representation_choisir → à retenir + fiche
# - stat_defi                               → défi + correction (déchets 974 : 12 + 8 + 10 = 30)
#
# Rendu : python -m manim render -qh manim/scripts/5e/stat_statistique.py StatStatistique5e -o eleveai-maths-5e-stat-statistique --media_dir manim/scripts/5e/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from manim import *

from charte import *
from mascotte import MascotteMargouillat


class StatStatistique5e(Scene):

    # ── outils communs ──────────────────────────────────────────────────────

    def add_mascotte(self, scale=0.5):
        m = MascotteMargouillat().scale(scale).to_corner(DOWN + RIGHT, buff=0.35)
        self.add(m)
        return m

    def titre_ecran(self, texte):
        t = Text(texte, font_size=40, color=JAUNE_TITRE).to_edge(UP)
        self.play(Write(t))
        return t

    def barres(self, data, x0=-4.2, base_y=-1.6, bar_w=1.0, gap=0.45, unit=0.22, highlight=None):
        """data : liste de (label, valeur). Renvoie (groupe, liste de barres)."""
        axe = Line([x0 - 0.4, base_y, 0], [x0 + len(data) * (bar_w + gap), base_y, 0], stroke_width=3)
        bars = VGroup()
        labels = VGroup()
        vals = VGroup()
        rects = []
        for i, (lab, val) in enumerate(data):
            x = x0 + i * (bar_w + gap) + bar_w / 2
            h = val * unit
            col = ORANGE_RETENUE if highlight == i else BLEU_CALCUL
            rect = Rectangle(width=bar_w, height=h, stroke_width=2, color=WHITE).set_fill(col, opacity=0.85)
            rect.move_to([x, base_y + h / 2, 0])
            rects.append(rect)
            bars.add(rect)
            labels.add(Text(lab, font_size=22, color=WHITE).move_to([x, base_y - 0.35, 0]))
            vals.add(Text(str(val), font_size=24, color=col).move_to([x, base_y + h + 0.25, 0]))
        return VGroup(axe, bars, labels, vals), rects

    # ── écran 0 : accueil ───────────────────────────────────────────────────

    def ecran_accueil(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        titre = Text("Les statistiques", font_size=52, color=JAUNE_TITRE).to_edge(UP)
        sous_titre = Text("Maths 5e — EleveAI", font_size=32, color=WHITE)
        sous_titre.next_to(titre, DOWN, buff=0.35)
        accroche = Text("Plein de données... comment les résumer ?", font_size=34, color=BLEU_CALCUL)
        accroche.next_to(sous_titre, DOWN, buff=0.9)
        astuce = Text("On compte, on dessine, on résume.", font_size=26, color=WHITE)
        astuce.next_to(accroche, DOWN, buff=0.5)
        self.play(Write(titre), FadeIn(sous_titre))
        self.play(Write(accroche))
        self.play(FadeIn(astuce, shift=UP * 0.2))
        self.wait(2.2)

    # ── écran 1 : lire un graphique ─────────────────────────────────────────

    def ecran_graphique(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("1. Lire un diagramme")

        data = [("Foot", 12), ("Basket", 8), ("Natation", 5), ("Dessin", 7)]
        grp, rects = self.barres(data, highlight=0)
        self.play(Create(grp[0]))
        self.play(LaggedStart(*[GrowFromEdge(r, DOWN) for r in rects], lag_ratio=0.2))
        self.play(Write(grp[2]), Write(grp[3]))
        self.wait(0.8)

        conclusion = Text("La barre la plus haute = la plus choisie : Foot", font_size=30, color=ORANGE_RETENUE).to_edge(DOWN)
        self.play(Indicate(rects[0], color=ORANGE_RETENUE), Write(conclusion))
        self.wait(2.2)

    # ── écran 2 : l'effectif total ──────────────────────────────────────────

    def ecran_total(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("2. L'effectif total")

        data = [("Foot", 12), ("Basket", 8), ("Natation", 5), ("Dessin", 7)]
        grp, rects = self.barres(data, base_y=-1.2)
        self.play(Create(grp[0]), *[GrowFromEdge(r, DOWN) for r in rects], Write(grp[2]), Write(grp[3]))
        self.wait(0.6)

        somme = Text("12 + 8 + 5 + 7", font_size=36, color=BLEU_CALCUL).move_to([0, 2.0, 0])
        self.play(Write(somme))
        self.wait(0.6)

        conclusion = Text("Effectif total = 32 élèves", font_size=36, color=VERT_OK).to_edge(DOWN)
        self.play(Write(conclusion))
        self.wait(2.2)

    # ── écran 3 : la fréquence (10 / 25) ────────────────────────────────────

    def ecran_frequence(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("3. La fréquence")

        enonce = Text("Sur 25 élèves, 10 viennent à vélo.", font_size=32, color=WHITE).move_to([0, 1.9, 0])
        self.play(Write(enonce))
        self.wait(0.6)

        formule = Text("fréquence = effectif ÷ total", font_size=30, color=BLEU_CALCUL).move_to([0, 0.9, 0])
        self.play(Write(formule))
        self.wait(0.6)

        calcul = Text("10 ÷ 25 = 0,4", font_size=44, color=VERT_OK).move_to([0, -0.3, 0])
        self.play(Write(calcul))
        self.wait(0.6)

        pct = Text("= 40 %", font_size=40, color=ORANGE_RETENUE).move_to([0, -1.4, 0])
        self.play(Write(pct))
        self.wait(0.6)

        note = Text("Une fréquence est toujours entre 0 et 1.", font_size=26, color=WHITE).to_edge(DOWN)
        self.play(FadeIn(note))
        self.wait(2.0)

    # ── écran 4 : la moyenne (10, 12, 14) ───────────────────────────────────

    def ecran_moyenne(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("4. La moyenne")

        data = [("", 10), ("", 12), ("", 14)]
        grp, rects = self.barres(data, x0=-2.5, base_y=-1.6, unit=0.16, highlight=None)
        self.play(Create(grp[0]), *[GrowFromEdge(r, DOWN) for r in rects], Write(grp[3]))
        self.wait(0.4)

        calcul = Text("(10 + 12 + 14) ÷ 3 = 36 ÷ 3", font_size=32, color=WHITE).move_to([0, 2.0, 0])
        self.play(Write(calcul))
        self.wait(0.8)

        # ligne de moyenne à 12
        y12 = -1.6 + 12 * 0.16
        ligne = DashedLine([-3.2, y12, 0], [3.2, y12, 0], color=VERT_OK, stroke_width=4)
        lbl = Text("moyenne = 12", font_size=30, color=VERT_OK).next_to(ligne, RIGHT, buff=0.15)
        self.play(Create(ligne), Write(lbl))
        self.wait(2.2)

    # ── écran 5 : défi (déchets 974) ────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        titre = Text("Défi", font_size=46, color=JAUNE_TITRE).to_edge(UP)
        self.play(Write(titre))

        q1 = Text("À La Réunion, une classe ramasse des déchets :", font_size=28, color=WHITE).move_to([0, 2.4, 0])
        q2 = Text("Effectif total ramassé ?", font_size=32, color=BLEU_CALCUL).move_to([0, 1.7, 0])
        data = [("Plastique", 12), ("Verre", 8), ("Papier", 10)]
        grp, rects = self.barres(data, x0=-3.0, base_y=-2.4, unit=0.16)
        self.play(Write(q1))
        self.play(Write(q2), Create(grp[0]), *[GrowFromEdge(r, DOWN) for r in rects], Write(grp[2]), Write(grp[3]))

        pause = Text("Mets pause et cherche !", font_size=30, color=ORANGE_RETENUE).to_edge(DOWN)
        self.play(Write(pause))
        self.wait(4.0)

    # ── écran 6 : correction ────────────────────────────────────────────────

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("Correction")

        etape = Text("On additionne les effectifs :", font_size=34, color=WHITE).move_to([0, 1.3, 0])
        self.play(Write(etape))
        self.wait(0.6)

        calcul = Text("12 + 8 + 10", font_size=44, color=BLEU_CALCUL).move_to([0, 0.1, 0])
        self.play(Write(calcul))
        self.wait(0.6)

        conclusion = Text("= 30 déchets ramassés", font_size=40, color=VERT_OK).to_edge(DOWN)
        self.play(Write(conclusion))
        self.wait(2.4)

    # ── écran 7 : à retenir ─────────────────────────────────────────────────

    def ecran_conclusion(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        titre = Text("À retenir", font_size=46, color=JAUNE_TITRE).to_edge(UP)

        points = VGroup(
            Text("1. Effectif = combien de fois. Total = somme des effectifs.", font_size=26),
            Text("2. Fréquence = effectif ÷ total (entre 0 et 1).", font_size=26),
            Text("3. Moyenne = somme des valeurs ÷ leur nombre.", font_size=26),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.5).move_to([0, 0.3, 0])

        signature = Text(SIGNATURE, font_size=26, color=VERT_OK).to_edge(DOWN)

        self.play(Write(titre))
        self.play(LaggedStart(*[Write(p) for p in points], lag_ratio=0.3))
        self.play(Write(signature))
        self.wait(2.5)

    # ── déroulé ─────────────────────────────────────────────────────────────

    def construct(self):
        self.ecran_accueil()
        self.ecran_graphique()
        self.ecran_total()
        self.ecran_frequence()
        self.ecran_moyenne()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_conclusion()


# ─── SCRIPT VOIX (optionnel — à lire au téléphone par-dessus la vidéo muette) ──
# Dire « top » quand le titre d'accueil apparaît (point de synchro Clipchamp).
#
# [Accueil ~0:00]   « Salut ! Les statistiques. Quand on a plein de données,
#                     comment les résumer ? On compte, on dessine, on résume. »
# [Écran 1 ~0:12]   « Voici un diagramme en barres. La hauteur d'une barre, c'est
#                     l'effectif. La plus haute, c'est le foot : l'activité la plus
#                     choisie. »
# [Écran 2 ~0:30]   « L'effectif total, c'est la somme de toutes les barres : 12
#                     plus 8 plus 5 plus 7, ça fait 32 élèves. »
# [Écran 3 ~0:46]   « La fréquence : effectif divisé par total. Sur 25 élèves, 10
#                     à vélo : 10 divisé par 25, ça fait 0,4, c'est-à-dire 40 %.
#                     Une fréquence est toujours entre 0 et 1. »
# [Écran 4 ~1:06]   « La moyenne : on additionne les valeurs et on divise par leur
#                     nombre. 10 plus 12 plus 14, ça fait 36, divisé par 3 : la
#                     moyenne est 12. Regarde, c'est le niveau du milieu. »
# [Défi ~1:26]      « À toi ! Une classe ramasse 12 plastiques, 8 verres, 10
#                     papiers. Effectif total ? Mets pause. »
# [Correction ~1:42] « On additionne : 12 plus 8 plus 10, ça fait 30 déchets
#                     ramassés. »
# [À retenir ~1:56] « On retient : effectif, c'est combien de fois. Fréquence,
#                     effectif divisé par total. Moyenne, la somme divisée par le
#                     nombre de valeurs. À bientôt ! »
