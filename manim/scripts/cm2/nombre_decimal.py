# nombre_decimal.py
# EleveAI — Maths CM2 — Les nombres décimaux (notionId : nombre_decimal)
# Mêmes exemples que la fiche lib/fiches/maths-cm2-nombres-decimaux.tsx.
# CM2 = texte brut, langage d'un enfant de ~10 ans. Muet + texte : l'écran
# explique tout. VARIÉTÉ D'ANIMATIONS exigée (retours eau/lait) : la palette
# d'entrées tourne à chaque écran (Write / FadeIn shift / GrowFromCenter /
# FadeIn scale / .animate) et l'emphase change (Indicate, Flash, Circumscribe,
# TransformFromCopy). Légendes DISTRIBUÉES : chaque explication se pose à un
# endroit différent, près de l'action qu'elle décrit.
#
# Mapping micro-compétences (banque nombres-decimaux.bank.ts) → écrans :
# - decimal_lire            → écran 1 (tableau, 3 unités et 4 dixièmes → 3,4)
# - decimal_fraction        → écran 2 (7/10 = 0,7, barre en 10 parts + droite)
# - decimal_valeur_chiffre  → écran 3 (rangs de 8,36 : dixièmes / centièmes)
# - decimal_comparer        → écran 4 (0,7 vs 0,65 : on ajoute un zéro, 0,7 = 0,70)
# - decimal_ordonner        → écran 5 (ranger 0,35 ; 0,4 ; 0,5 sur la droite)
# - decimal_droite          → écran 5 (placer sur la droite graduée)
# - decimal_arrondir        → écran 6 (3,6 arrondi à l'unité → 4)
# - decimal_defi            → défi + correction (sentier 2,5 km → 0,5 km = 500 m)
#
# Rendu : python -m manim render -qh manim/scripts/cm2/nombre_decimal.py NombreDecimalCM2 -o eleveai-maths-cm2-nombre-decimal --media_dir manim/scripts/cm2/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from manim import *

from charte import *
from mascotte import MascotteMargouillat


def fmt(v):
    """Nombre → écriture française à virgule (0.5 → '0,5', 3 → '3')."""
    if v == int(v):
        return str(int(v))
    return ("%g" % v).replace(".", ",")


class NombreDecimalCM2(Scene):

    # ── outils communs ──────────────────────────────────────────────────────

    def add_mascotte(self, scale=0.5):
        m = MascotteMargouillat().scale(scale).to_corner(DOWN + RIGHT, buff=0.35)
        self.add(m)
        return m

    def titre_ecran(self, texte):
        t = Text(texte, font_size=40, color=JAUNE_TITRE).to_edge(UP)
        self.play(Write(t))
        return t

    def droite_dec(self, vmin, vmax, step, y=0.0, x_span=5.4, labels_every=1):
        """Droite graduée décimale : axe + graduations + nombres à virgule.
        Renvoie (groupe, x_of). labels_every=2 → une étiquette sur deux."""
        x0, x1 = -x_span, x_span

        def x_of(v):
            return x0 + (x1 - x0) * (v - vmin) / (vmax - vmin)

        axe = Arrow([x0 - 0.4, y, 0], [x1 + 0.4, y, 0], buff=0, stroke_width=3, color=WHITE)
        ticks = VGroup()
        labels = VGroup()
        n = round((vmax - vmin) / step)
        for i in range(n + 1):
            v = round(vmin + i * step, 4)
            tx = x_of(v)
            big = (i % labels_every == 0)
            h = 0.16 if big else 0.09
            ticks.add(Line([tx, y - h, 0], [tx, y + h, 0], stroke_width=2))
            if big:
                labels.add(Text(fmt(v), font_size=22, color=WHITE).move_to([tx, y - 0.5, 0]))
        return VGroup(axe, ticks, labels), x_of

    def point(self, x_of, v, label, color, y=0.0, up=0.66):
        dot = Dot([x_of(v), y, 0], color=color, radius=0.12)
        lbl = Text(label, font_size=28, color=color).move_to([x_of(v), y + up, 0])
        return VGroup(dot, lbl)

    # ── écran 0 : accueil ───────────────────────────────────────────────────

    def ecran_accueil(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        titre = Text("Les nombres décimaux", font_size=50, color=JAUNE_TITRE).to_edge(UP)
        sous_titre = Text("Maths CM2 — EleveAI", font_size=32, color=WHITE)
        sous_titre.next_to(titre, DOWN, buff=0.35)
        accroche = Text("0,7 ou 0,65 : lequel est le plus grand ?", font_size=36, color=BLEU_CALCUL)
        accroche.next_to(sous_titre, DOWN, buff=0.9)
        astuce = Text("Un nombre à virgule… tout se lit rang par rang.", font_size=26, color=WHITE)
        astuce.next_to(accroche, DOWN, buff=0.5)
        self.play(Write(titre), FadeIn(sous_titre))
        self.play(GrowFromCenter(accroche))
        self.play(FadeIn(astuce, shift=UP * 0.2))
        self.wait(2.2)

    # ── écran 1 : lire et écrire (3 unités et 4 dixièmes → 3,4) ─────────────
    # Entrées : FadeIn shift + Create + .animate.scale ; emphase : Indicate.

    def ecran_lire(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("1. Lire et écrire")

        enonce = Text("trois unités et quatre dixièmes", font_size=32, color=WHITE).move_to([0, 2.0, 0])
        self.play(FadeIn(enonce, shift=DOWN * 0.3))
        self.wait(0.6)

        # Deux cases : unités | dixièmes, séparées par la virgule.
        cases = VGroup(
            Rectangle(width=1.8, height=1.1, stroke_width=2, color=WHITE).move_to([-1.4, 0.5, 0]),
            Rectangle(width=1.8, height=1.1, stroke_width=2, color=WHITE).move_to([1.4, 0.5, 0]),
        )
        entetes = VGroup(
            Text("Unités", font_size=24, color=BLEU_CALCUL).next_to(cases[0], UP, buff=0.18),
            Text("Dixièmes", font_size=24, color=BLEU_CALCUL).next_to(cases[1], UP, buff=0.18),
        )
        virgule = Text(",", font_size=64, color=VERT_OK).move_to([0, 0.25, 0])
        self.play(Create(cases), FadeIn(entetes, shift=DOWN * 0.2))
        self.play(GrowFromCenter(virgule))
        self.wait(0.5)

        c3 = Text("3", font_size=64).move_to([-1.4, 0.5, 0])
        c4 = Text("4", font_size=64).move_to([1.4, 0.5, 0])
        self.play(FadeIn(c3, scale=0.4))
        self.play(Indicate(entetes[0], color=BLEU_CALCUL))
        self.play(FadeIn(c4, scale=0.4))
        self.play(Indicate(entetes[1], color=BLEU_CALCUL))
        self.wait(0.8)

        # Le nombre se rassemble : on lit 3,4.
        resultat = Text("3,4", font_size=72, color=VERT_OK).to_edge(DOWN, buff=0.7)
        legende = Text("On écrit les unités, la virgule, puis les dixièmes.",
                       font_size=26, color=WHITE).move_to([0, -1.4, 0])
        self.play(Write(resultat))
        self.play(FadeIn(legende, shift=UP * 0.2))
        self.wait(2.2)

    # ── écran 2 : de la fraction au décimal (7/10 = 0,7) ───────────────────
    # Entrées : barre découpée + coloriage LaggedStart ; emphase : Circumscribe.

    def ecran_fraction(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("2. Une fraction décimale")

        frac = Text("7/10 = 7 dixièmes", font_size=34, color=BLEU_CALCUL).move_to([0, 2.0, 0])
        self.play(FadeIn(frac, shift=RIGHT * 0.3))

        # Une barre partagée en 10 : on colorie 7 morceaux.
        largeur = 8.0
        h = 0.8
        pas = largeur / 10
        x0 = -largeur / 2
        parts = VGroup()
        for i in range(10):
            r = Rectangle(width=pas, height=h, stroke_width=2, color=WHITE)
            r.move_to([x0 + pas * (i + 0.5), 0.5, 0])
            parts.add(r)
        self.play(Create(parts))
        self.play(LaggedStart(*[parts[i].animate.set_fill(BLEU_CALCUL, opacity=0.8)
                                for i in range(7)], lag_ratio=0.15))
        cadre = SurroundingRectangle(VGroup(*parts[:7]), color=VERT_OK, buff=0.06)
        sept = Text("7 morceaux coloriés sur 10", font_size=26, color=VERT_OK).move_to([0, -0.7, 0])
        self.play(Circumscribe(VGroup(*parts[:7]), color=VERT_OK), FadeIn(cadre))
        self.play(FadeIn(sept, shift=UP * 0.2))
        self.wait(1.0)

        conclusion = Text("7/10 = 0,7", font_size=52, color=VERT_OK).to_edge(DOWN, buff=0.6)
        self.play(Write(conclusion))
        self.wait(2.2)

    # ── écran 3 : le rang d'un chiffre (8,36) ──────────────────────────────
    # Entrées : GrowFromCenter + TransformFromCopy ; emphase : SurroundingRectangle.

    def ecran_rang(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("3. Le rang des chiffres")

        nombre = Text("8,36", font_size=80, color=WHITE).move_to([0, 1.4, 0])
        self.play(GrowFromCenter(nombre))
        self.wait(0.4)

        # On repère chaque chiffre par une étiquette qui vient DE lui.
        u = Text("8 : unités", font_size=28, color=WHITE).move_to([-3.2, -0.2, 0])
        d = Text("3 : dixièmes", font_size=28, color=BLEU_CALCUL).move_to([0, -1.0, 0])
        c = Text("6 : centièmes", font_size=28, color=VERT_OK).move_to([3.0, -0.2, 0])
        self.play(Write(u))
        self.play(FadeIn(d, shift=DOWN * 0.2))
        self.play(FadeIn(c, shift=RIGHT * 0.2))
        self.wait(0.8)

        box = SurroundingRectangle(nombre[3], color=VERT_OK, buff=0.08)  # le '6'
        rappel = Text("Juste après la virgule : dixièmes, puis centièmes.",
                      font_size=26, color=ORANGE_RETENUE).to_edge(DOWN)
        self.play(Create(box), Indicate(nombre[3], color=VERT_OK))
        self.play(Write(rappel))
        self.wait(2.2)

    # ── écran 4 : comparer (0,7 vs 0,65) ───────────────────────────────────
    # Entrées : FadeIn + .animate.set_color ; emphase : Flash + box.

    def ecran_comparer(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("4. Comparer 0,7 et 0,65")

        astuce = Text("On met le même nombre de chiffres : 0,7 = 0,70",
                      font_size=30, color=ORANGE_RETENUE).move_to([0, 1.9, 0])
        self.play(FadeIn(astuce, shift=DOWN * 0.2))
        self.wait(0.8)

        n1 = Text("0,70", font_size=64, color=WHITE).move_to([-2.2, 0.4, 0])
        n2 = Text("0,65", font_size=64, color=WHITE).move_to([2.2, 0.4, 0])
        self.play(FadeIn(n1, scale=0.5), FadeIn(n2, scale=0.5))
        self.wait(0.5)

        # On compare les dixièmes (le 1er chiffre après la virgule).
        box1 = SurroundingRectangle(n1[2], color=BLEU_CALCUL, buff=0.08)  # 7
        box2 = SurroundingRectangle(n2[2], color=BLEU_CALCUL, buff=0.08)  # 6
        dix = Text("7 dixièmes > 6 dixièmes", font_size=30, color=BLEU_CALCUL).move_to([0, -1.0, 0])
        self.play(Create(box1), Create(box2), Write(dix))
        self.play(Flash(n1[2], color=VERT_OK))
        self.wait(1.0)

        conclusion = Text("0,7 > 0,65", font_size=48, color=VERT_OK).to_edge(DOWN, buff=0.6)
        self.play(n1.animate.set_color(VERT_OK), FadeOut(box1), FadeOut(box2), Write(conclusion))
        self.wait(2.2)

    # ── écran 5 : ranger sur la droite (0,35 ; 0,4 ; 0,5) ──────────────────
    # Entrées : Create ligne + FadeIn scale points ; emphase : GrowArrow.

    def ecran_ranger(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("5. Ranger sur la droite")

        consigne = Text("Range du plus petit au plus grand : 0,35 ; 0,4 ; 0,5",
                        font_size=28, color=WHITE).move_to([0, 2.0, 0])
        self.play(Write(consigne))

        ligne, x_of = self.droite_dec(0, 1, 0.1, y=0.3, x_span=5.4)
        self.play(Create(ligne[0]), Create(ligne[1]))
        self.play(LaggedStart(*[Write(l) for l in ligne[2]], lag_ratio=0.05))
        self.wait(0.5)

        p1 = self.point(x_of, 0.35, "0,35", BLEU_CALCUL, y=0.3)
        p2 = self.point(x_of, 0.4, "0,4", BLEU_CALCUL, y=0.3)
        p3 = self.point(x_of, 0.5, "0,5", VERT_OK, y=0.3)
        self.play(FadeIn(p1, scale=0.4))
        self.play(FadeIn(p2, scale=0.4))
        self.play(FadeIn(p3, scale=0.4))
        self.wait(0.6)

        fleche = Arrow([x_of(0.30), -0.7, 0], [x_of(0.55), -0.7, 0], buff=0.1, color=ORANGE_RETENUE)
        sens = Text("le plus à gauche = le plus petit", font_size=26, color=ORANGE_RETENUE).move_to([0, -1.25, 0])
        self.play(GrowArrow(fleche), FadeIn(sens, shift=UP * 0.2))
        self.wait(1.0)

        conclusion = Text("0,35 < 0,4 < 0,5", font_size=44, color=VERT_OK).to_edge(DOWN)
        self.play(Write(conclusion), Circumscribe(p3, color=VERT_OK))
        self.wait(2.2)

    # ── écran 6 : arrondir (3,6 → 4) ───────────────────────────────────────
    # Entrées : droite + curseur qui glisse (.animate.move_to) ; emphase : Flash.

    def ecran_arrondir(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("6. Arrondir à l'unité")

        consigne = Text("Arrondis 3,6 à l'unité la plus proche", font_size=30, color=WHITE).move_to([0, 2.0, 0])
        self.play(FadeIn(consigne, shift=DOWN * 0.2))

        ligne, x_of = self.droite_dec(3, 4, 0.1, y=0.3, x_span=5.2)
        self.play(Create(ligne[0]), Create(ligne[1]), Write(ligne[2]))
        self.wait(0.4)

        curseur = self.point(x_of, 3.6, "3,6", BLEU_CALCUL, y=0.3)
        self.play(FadeIn(curseur, scale=0.4))
        regle = Text("Le chiffre des dixièmes est 6 (5 ou plus) → on monte",
                     font_size=26, color=ORANGE_RETENUE).move_to([0, -0.9, 0])
        self.play(Write(regle))
        self.wait(0.8)

        # Le point remonte vers l'entier 4.
        fleche = Arrow([x_of(3.6), 1.1, 0], [x_of(4), 1.1, 0], buff=0.1, color=VERT_OK)
        self.play(GrowArrow(fleche), curseur.animate.move_to([x_of(4), 0.3, 0]).set_color(VERT_OK))
        self.play(Flash(Dot([x_of(4), 0.3, 0]), color=VERT_OK))
        self.wait(0.6)

        conclusion = Text("3,6 arrondi à l'unité = 4", font_size=40, color=VERT_OK).to_edge(DOWN)
        self.play(Write(conclusion))
        self.wait(2.2)

    # ── écran 7 : défi (sentier du volcan) ─────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        titre = Text("Défi", font_size=46, color=JAUNE_TITRE).to_edge(UP)
        self.play(GrowFromCenter(titre))

        q1 = Text("À La Réunion, un sentier fait 2,5 km.", font_size=32, color=WHITE).move_to([0, 1.5, 0])
        q2 = Text("Que représente le 0,5 km en mètres ?", font_size=32, color=BLEU_CALCUL).move_to([0, 0.7, 0])
        indice = Text("Indice : 1 km = 1000 m", font_size=28, color=ORANGE_RETENUE).move_to([0, -0.2, 0])
        self.play(Write(q1))
        self.play(FadeIn(q2, shift=DOWN * 0.2))
        self.play(FadeIn(indice, shift=UP * 0.2))

        pause = Text("Mets pause et cherche !", font_size=30, color=ORANGE_RETENUE).to_edge(DOWN)
        self.play(Write(pause))
        self.wait(4.0)

    # ── écran 8 : correction (0,5 km = 500 m) ──────────────────────────────

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("Correction")

        # Une barre de 1 km partagée en deux : la moitié fait 500 m.
        ligne, x_of = self.droite_dec(0, 1, 0.1, y=0.6, x_span=5.2)
        km = Text("1 km", font_size=26, color=WHITE).move_to([x_of(1), 1.3, 0])
        self.play(Create(ligne[0]), Create(ligne[1]), Write(ligne[2]), FadeIn(km))
        self.wait(0.4)

        moitie = self.point(x_of, 0.5, "0,5 km", BLEU_CALCUL, y=0.6)
        mesure = DoubleArrow([x_of(0), -0.3, 0], [x_of(0.5), -0.3, 0], buff=0.05,
                             color=VERT_OK, stroke_width=4)
        self.play(FadeIn(moitie, scale=0.4))
        self.play(GrowFromCenter(mesure))
        self.wait(0.6)

        e1 = Text("0,5 km = la moitié de 1000 m", font_size=30, color=WHITE).move_to([0, -1.1, 0])
        self.play(FadeIn(e1, shift=UP * 0.2))
        self.wait(0.8)

        conclusion = Text("0,5 km = 500 m", font_size=44, color=VERT_OK).to_edge(DOWN)
        self.play(Write(conclusion), Flash(moitie[0], color=VERT_OK))
        self.wait(2.4)

    # ── écran 9 : à retenir ─────────────────────────────────────────────────

    def ecran_conclusion(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        titre = Text("À retenir", font_size=46, color=JAUNE_TITRE).to_edge(UP)

        points = VGroup(
            Text("1. Un décimal = une partie entière , une virgule , une partie décimale.", font_size=26),
            Text("2. Après la virgule : dixièmes, puis centièmes.", font_size=26),
            Text("3. On peut ajouter des zéros à droite : 2,5 = 2,50.", font_size=26),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.5).move_to([0, 0.3, 0])

        signature = Text(SIGNATURE, font_size=26, color=VERT_OK).to_edge(DOWN)

        self.play(Write(titre))
        self.play(LaggedStart(*[FadeIn(p, shift=RIGHT * 0.3) for p in points], lag_ratio=0.3))
        self.play(Write(signature))
        self.wait(2.5)

    # ── déroulé ─────────────────────────────────────────────────────────────

    def construct(self):
        self.ecran_accueil()
        self.ecran_lire()
        self.ecran_fraction()
        self.ecran_rang()
        self.ecran_comparer()
        self.ecran_ranger()
        self.ecran_arrondir()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_conclusion()


# ─── SCRIPT VOIX (optionnel — à lire au téléphone par-dessus la vidéo muette) ──
# Dire « top » quand le titre d'accueil apparaît (point de synchro Clipchamp).
# Ton simple, phrases courtes, on REDIT ce que l'écran montre.
#
# [Accueil ~0:00]    « Salut ! Aujourd'hui, les nombres décimaux, les nombres à
#                      virgule. Petite question : qui est le plus grand, zéro
#                      virgule sept ou zéro virgule soixante-cinq ? Regarde. »
# [Écran 1 ~0:12]    « Trois unités et quatre dixièmes. Les unités vont dans la
#                      première case, les dixièmes juste après la virgule. Ça
#                      s'écrit trois virgule quatre. »
# [Écran 2 ~0:28]    « Sept dixièmes, c'est sept sur dix. Je colorie sept morceaux
#                      sur dix. Sept dixièmes, ça s'écrit zéro virgule sept. »
# [Écran 3 ~0:44]    « Dans huit virgule trente-six : le huit, c'est les unités.
#                      Juste après la virgule, le trois, ce sont les dixièmes. Et
#                      le six, ce sont les centièmes. »
# [Écran 4 ~1:00]    « Pour comparer, je mets le même nombre de chiffres : zéro
#                      virgule sept, c'est zéro virgule soixante-dix. Sept dixièmes,
#                      c'est plus que six. Donc zéro virgule sept est plus grand. »
# [Écran 5 ~1:18]    « Je range sur la droite. Le plus à gauche est le plus petit :
#                      zéro virgule trente-cinq, puis zéro virgule quatre, puis zéro
#                      virgule cinq. »
# [Écran 6 ~1:36]    « Arrondir trois virgule six. Je regarde les dixièmes : six,
#                      c'est cinq ou plus, donc je monte. Trois virgule six arrondi,
#                      ça fait quatre. »
# [Défi ~1:52]       « À toi ! Un sentier de deux virgule cinq kilomètres. Le zéro
#                      virgule cinq kilomètre, ça fait combien de mètres ? Mets pause. »
# [Correction ~2:08] « Un kilomètre, c'est mille mètres. Zéro virgule cinq, c'est la
#                      moitié : cinq cents mètres. Le sentier fait deux kilomètres et
#                      cinq cents mètres. »
# [À retenir ~2:26]  « On retient : un décimal, c'est une partie entière, une virgule,
#                      une partie décimale. Après la virgule, les dixièmes puis les
#                      centièmes. Et on peut ajouter des zéros à droite. À bientôt ! »
