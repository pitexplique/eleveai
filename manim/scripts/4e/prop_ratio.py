# prop_ratio.py
# EleveAI — Maths 4e — Tout comprendre sur les ratios
# (notionId : prop_ratio), AVEC VOIX.
# Mêmes exemples que la fiche lib/fiches/maths-4e-ratio.tsx (écrite le 02/10) :
# le vert mélangé 2 : 3 (puis 2 : 3 : 7 avec du blanc), les 84 € partagés
# selon 1 : 2 : 4, le défi de l'écart (cerfs : sangliers = 3 : 5).
# ⭐ 02/10/2026 : la première vidéo de 4e. Elle naît avec la coupe de
# « Ratios et pourcentages » en deux notions.
# Voix validée par Frédéric : manim/voix/4e-prop-ratio.json (débit −7, entre la
# 6e à −10 et le lycée à −4).
#
# Mapping micro-compétences (coach 4e, notion prop_ratio) → écrans :
# - prop_rapport         → 01-ratio (2 : 3, l'ordre), 02-simplifier (6 : 9)
# - prop_ratio_quotients → 03-quotients (a/2 = b/3 ; 8 L → 12 L)
# - prop_ratio_trois     → 04-trois-termes (2 : 3 : 7)
# - prop_ratio_partager  → 05-partager (84 € selon 1 : 2 : 4), 06-part-du-tout
# - prop_ratio_defi      → 07-defi + correction (l'écart = des parts)
#
# ⭐ LE DESSIN QUI PORTE TOUT : la barre des parts, une case par part, toutes
# de la même taille. C'est elle qui fait voir « 2 parts CONTRE 3 parts », et
# pourquoi on divise par le nombre de PARTS au partage.
# ⛔ Pas de LaTeX sur ce poste : fractions par `fraction()`, jamais de Brace.
#
# Rendu : python -m manim render -qh --disable_caching manim/scripts/4e/prop_ratio.py PropRatio4e -o eleveai-maths-4e-prop-ratio --media_dir manim/scripts/4e/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from manim import *

from charte import *
from gabarit_sixieme import Notion6e

BLEU_P = "#3B82F6"    # la peinture bleue
JAUNE_P = "#FACC15"   # la peinture jaune
BLANC_P = "#E5E7EB"   # la peinture blanche
GRIS_P = "#94A3B8"

OBJECTIFS = [
    "Écrire un ratio et le simplifier",
    "Transformer un ratio en calcul",
    "Utiliser un ratio à trois nombres",
    "Partager une quantité selon un ratio",
]


class Notion4e(Notion6e):
    """Le gabarit parlé de la 6e, étiqueté 4e."""

    identite = "Maths 4e — EleveAI"


class PropRatio4e(Notion4e):
    nom_voix = "4e-prop-ratio"

    # ── les dessins ─────────────────────────────────────────────────────────

    def cases(self, n, couleur, cw=0.6, h=0.62, textes=None, font_size=24):
        """Une rangée de `n` cases égales, collées. `textes` : un mot par case."""
        g = VGroup()
        for i in range(n):
            r = Rectangle(width=cw, height=h, stroke_width=2.5, color=WHITE)
            r.set_fill(couleur, opacity=0.9)
            g.add(r)
        g.arrange(RIGHT, buff=0)
        if textes:
            for r, t in zip(g, textes):
                r.add(Text(t, font_size=font_size, color=BLACK, weight=BOLD).move_to(r))
        return g

    def barre(self, groupes, cw=0.6, h=0.62, font_size=26):
        """Des groupes de cases côte à côte : [(n, couleur, étiquette), …].

        Renvoie (barre, étiquettes) ; chaque étiquette est sous SON groupe.
        """
        rangs = VGroup(*[self.cases(n, c, cw, h) for n, c, _ in groupes]).arrange(RIGHT, buff=0)
        etiq = VGroup()
        for g, (_, c, t) in zip(rangs, groupes):
            if t:
                etiq.add(Text(t, font_size=font_size, color=c).next_to(g, DOWN, buff=0.22))
        return rangs, etiq

    def barre_ratio(self, texte, font_size=40, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def barrer(self, mob):
        return Cross(mob, stroke_color=ROUGE_ERREUR, stroke_width=6, scale_factor=0.9)

    def piece(self):
        """Une pièce de 1 € : le disque doré, son liseré, et « 1 € » écrit dessus."""
        bord = Circle(radius=0.34, stroke_width=3, color="#B45309").set_fill("#FBBF24", opacity=1)
        coeur = Circle(radius=0.24, stroke_width=1.5, color="#B45309")
        txt = Text("1 €", font_size=20, color=BLACK, weight=BOLD)
        return VGroup(bord, coeur, txt)

    # ── 00 : la page de garde, PARLÉE ───────────────────────────────────────
    # ⛔ Frédéric, 02/10 : « ta voix doit correspondre aux écrits ». La voix
    # raconte les mises de Léo, Sami et Jade : on les ÉCRIT, et on dessine
    # leurs pièces de 1 €, chacune au moment où la voix la nomme. La page du
    # gabarit (titre, accroche, promesse) ne savait pas le faire.

    def page_de_garde(self, titre, accroche, promesse, voix="00-garde"):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire(voix)

        t = Text(titre, font_size=54, color=JAUNE_TITRE).to_edge(UP, buff=0.6)
        identite = Text(self.identite, font_size=28, color=WHITE).next_to(t, DOWN, buff=0.25)
        self.play(Write(t), FadeIn(identite, shift=DOWN * 0.2))

        l1 = Text("Les maths, ça sert à rien… sauf à partager sans se disputer.", font_size=28,
                  color=BLEU_CALCUL).move_to([-0.6, 1.55, 0])
        self.play(FadeIn(l1, shift=UP * 0.15))

        self.au_mot("Léo, Sami et Jade gagnent")
        l2 = Text("Léo, Sami et Jade gagnent 84 €.", font_size=36).move_to([-0.6, 0.8, 0])
        self.play(Write(l2))

        colonnes = []
        for (nom, n, c), x, mot in zip(
            [("Léo", 1, BLEU_CALCUL), ("Sami", 2, VERT_OK), ("Jade", 4, ORANGE_RETENUE)],
            [-4.6, -1.6, 1.9],
            ["Léo avait mis", "Sami 2 euros", "Jade 4 euros"],
        ):
            pieces = VGroup(*[self.piece() for _ in range(n)]).arrange(RIGHT, buff=0.08).move_to([x, -0.35, 0])
            lbl = Text(f"{nom} a mis {n} €", font_size=28, color=c).move_to([x, -1.1, 0])
            self.au_mot(mot)
            self.play(LaggedStart(*[FadeIn(p, scale=0.5) for p in pieces], lag_ratio=0.2), FadeIn(lbl))
            colonnes.append(VGroup(pieces, lbl))

        self.au_mot("Couper en trois")
        q = Text("Trois parts égales, c'est juste ?", font_size=32, color=ORANGE_RETENUE).move_to([-0.6, -1.95, 0])
        self.play(Write(q))
        self.au_mot("Pas vraiment")
        self.play(Create(self.barrer(q)))
        self.au_mot("Pour partager juste")
        self.play(Write(self.chute("Pour partager juste, il faut un ratio.", color=VERT_OK, font_size=34)))
        self.attendre_voix()

    # ── 01 : le ratio, tant contre tant ─────────────────────────────────────

    def ecran_ratio(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-ratio")
        self.titre_ecran("Un ratio : tant contre tant")

        pots_b = VGroup(*[self.pot(BLEU_P) for _ in range(2)]).arrange(RIGHT, buff=0.25)
        pots_j = VGroup(*[self.pot(JAUNE_P) for _ in range(3)]).arrange(RIGHT, buff=0.25)
        plus = Text("+", font_size=48)
        vert = self.pot("#22C55E", grand=True)
        egal = Text("=", font_size=48)
        melange = VGroup(pots_b, plus, pots_j, egal, vert).arrange(RIGHT, buff=0.4).move_to([-0.6, 1.7, 0])
        self.play(LaggedStart(*[FadeIn(p, shift=DOWN * 0.2) for p in pots_b], lag_ratio=0.3))
        self.play(FadeIn(plus), LaggedStart(*[FadeIn(p, shift=DOWN * 0.2) for p in pots_j], lag_ratio=0.3))
        self.play(FadeIn(egal), GrowFromCenter(vert))

        self.au_mot("On écrit")
        ecrit = self.barre_ratio("bleu : jaune = 2 : 3", font_size=46).move_to([-0.6, 0.35, 0])
        self.play(Write(ecrit))
        self.au_mot("On lit")
        lu = Text("on lit : « 2 pour 3 »", font_size=32, color=BLEU_CALCUL).next_to(ecrit, DOWN, buff=0.3)
        self.play(FadeIn(lu, shift=UP * 0.15))

        self.au_mot("toutes les parts")
        # ⚠️ Étiquettes COURTES : « 2 parts de bleu » sous 2 cases de 1,1 se
        # chevauchait avec l'étiquette voisine (vu sur la planche HD).
        barre, etiq = self.barre([(2, BLEU_P, "2 parts"), (3, JAUNE_P, "3 parts")], cw=1.1)
        VGroup(barre, etiq).move_to([-0.6, -1.55, 0])
        self.play(LaggedStart(*[GrowFromCenter(c) for g in barre for c in g], lag_ratio=0.12))
        self.play(FadeIn(etiq))

        self.au_mot("l'ordre compte")
        self.play(FadeOut(lu), FadeOut(barre), FadeOut(etiq), FadeOut(ecrit))
        a = Text("bleu : jaune = 2 : 3", font_size=38, color=BLEU_P)
        b = Text("jaune : bleu = 3 : 2", font_size=38, color=JAUNE_P)
        VGroup(a, b).arrange(DOWN, buff=0.45).move_to([-0.6, -1.4, 0])
        self.play(Write(a))
        self.au_mot("Jaune pour bleu")
        self.play(Write(b))
        self.play(Write(self.chute("L'ordre des mots = l'ordre des nombres", color=JAUNE_TITRE)))
        self.attendre_voix()

    def pot(self, couleur, grand=False):
        """Un pot de peinture : un seau et son couvercle."""
        k = 1.35 if grand else 1.0
        seau = Polygon([-0.3, 0.3, 0], [0.3, 0.3, 0], [0.24, -0.32, 0], [-0.24, -0.32, 0],
                       stroke_width=2.5, color=WHITE).set_fill(couleur, opacity=1)
        couvercle = Rectangle(width=0.7, height=0.1, stroke_width=0).set_fill(GREY_B, opacity=1)
        couvercle.next_to(seau, UP, buff=0.02)
        return VGroup(seau, couvercle).scale(k)

    # ── 02 : simplifier ─────────────────────────────────────────────────────

    def ecran_simplifier(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-simplifier")
        self.titre_ecran("Simplifier un ratio")

        # Les deux barres ont la MÊME longueur : la frontière bleu-jaune tombe
        # au même endroit, c'est le même vert.
        L = 7.5
        b69, _ = self.barre([(6, BLEU_P, None), (9, JAUNE_P, None)], cw=L / 15, h=0.55)
        b23, _ = self.barre([(2, BLEU_P, None), (3, JAUNE_P, None)], cw=L / 5, h=0.55)
        b69.move_to([0.2, 1.5, 0])
        b23.move_to([0.2, 0.25, 0])
        l69 = Text("6 : 9", font_size=36).next_to(b69, LEFT, buff=0.35)
        l23 = Text("2 : 3", font_size=36, color=VERT_OK).next_to(b23, LEFT, buff=0.35)
        self.play(FadeIn(b69), Write(l69))

        self.au_mot("Je divise les deux")
        fleche = Text("÷ 3", font_size=32, color=BLEU_CALCUL).move_to([l69.get_x(), 0.88, 0])
        self.play(FadeIn(fleche, shift=DOWN * 0.15))
        self.play(TransformFromCopy(b69, b23), Write(l23))
        frontiere = DashedLine([b23[1].get_left()[0], 2.0, 0], [b23[1].get_left()[0], -0.25, 0],
                               color=VERT_OK, stroke_width=3)
        self.play(Create(frontiere))

        self.au_mot("comme une fraction")
        self.play(Write(self.chute("Je divise les deux nombres par le même nombre", color=VERT_OK)))

        self.au_mot("Piège")
        faux = Text("6 − 4 = 2  et  9 − 4 = 5  →  2 : 5", font_size=36, color=WHITE).move_to([-0.3, -1.25, 0])
        self.play(Write(faux))
        self.au_mot("Ce n'est plus le même vert")
        self.play(Create(self.barrer(faux)))
        self.attendre_voix()

    # ── 03 : le ratio devient un calcul ─────────────────────────────────────

    def ecran_quotients(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-quotients")
        self.titre_ecran("Le ratio devient un calcul")

        haut = VGroup(
            Text("a : b = 2 : 3", font_size=40),
            Text("quand", font_size=32, color=GREY_B),
            self.fraction("a", 2, font_size=40, color_num=BLEU_P),
            Text("=", font_size=40),
            self.fraction("b", 3, font_size=40, color_num=JAUNE_P),
        ).arrange(RIGHT, buff=0.4).move_to([-0.6, 1.9, 0])
        self.play(Write(haut[0]))
        self.au_mot("quand a sur 2")
        self.play(FadeIn(haut[1]), Write(haut[2:]))

        self.au_mot("la valeur d'une part")
        part = Text("= la valeur d'une part", font_size=30, color=VERT_OK).next_to(haut, DOWN, buff=0.3)
        self.play(FadeIn(part, shift=UP * 0.15))

        self.au_mot("j'ai 8 litres")
        barre, _ = self.barre([(2, BLEU_P, None), (3, JAUNE_P, None)], cw=1.1, h=0.7)
        barre.move_to([-0.6, -0.55, 0])
        acc = Text("8 L de bleu", font_size=30, color=BLEU_P).next_to(barre[0], UP, buff=0.25)
        self.play(FadeIn(barre[0]), FadeIn(acc))
        self.au_mot("Une part vaut")
        q4 = [Text("4 L", font_size=26, color=BLACK, weight=BOLD).move_to(c) for c in barre[0]]
        calc1 = Text("8 ÷ 2 = 4 L", font_size=34, color=BLEU_CALCUL).move_to([-0.6, -1.75, 0])
        self.play(*[FadeIn(t) for t in q4], Write(calc1))
        self.au_mot("Le jaune")
        self.play(FadeIn(barre[1]))
        q4j = [Text("4 L", font_size=26, color=BLACK, weight=BOLD).move_to(c) for c in barre[1]]
        self.play(LaggedStart(*[FadeIn(t) for t in q4j], lag_ratio=0.3))
        self.au_mot("3 fois 4")
        res = Text("3 × 4 = 12 L de jaune", font_size=36, color=VERT_OK).next_to(calc1, DOWN, buff=0.3)
        self.play(Write(res))
        self.play(Circumscribe(res, color=VERT_OK))
        self.attendre_voix()

    # ── 04 : trois termes ───────────────────────────────────────────────────

    def ecran_trois(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-trois-termes")
        self.titre_ecran("Un ratio à trois nombres")

        barre, etiq = self.barre([(2, BLEU_P, "bleu"), (3, JAUNE_P, "jaune"), (7, BLANC_P, "blanc")], cw=0.68, h=0.62)
        VGroup(barre, etiq).move_to([-0.6, 1.3, 0])
        self.play(FadeIn(barre[0]), FadeIn(barre[1]), FadeIn(etiq[0]), FadeIn(etiq[1]))
        self.au_mot("j'ajoute du blanc")
        self.play(LaggedStart(*[GrowFromCenter(c) for c in barre[2]], lag_ratio=0.1), FadeIn(etiq[2]))
        self.au_mot("2 pour 3 pour 7")
        r = Text("bleu : jaune : blanc = 2 : 3 : 7", font_size=40).move_to([-0.6, -0.2, 0])
        self.play(Write(r))

        self.au_mot("La règle ne change pas")
        eg = VGroup(
            self.fraction("a", 2, font_size=40, color_num=BLEU_P), Text("=", font_size=40),
            self.fraction("b", 3, font_size=40, color_num=JAUNE_P), Text("=", font_size=40),
            self.fraction("c", 7, font_size=40, color_num=BLANC_P),
        ).arrange(RIGHT, buff=0.35).move_to([-0.6, -1.45, 0])
        self.play(Write(eg))
        self.au_mot("une seule quantité")
        self.play(Write(self.chute("Une quantité connue → une part → les deux autres", color=VERT_OK)))
        self.attendre_voix()

    # ── 05 : partager ───────────────────────────────────────────────────────

    def ecran_partager(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-partager")
        self.titre_ecran("Partager 84 € selon 1 : 2 : 4")

        noms = [("Léo", 1, BLEU_CALCUL), ("Sami", 2, VERT_OK), ("Jade", 4, ORANGE_RETENUE)]
        lignes = VGroup()
        for nom, n, c in noms:
            lbl = Text(nom, font_size=32, color=c)
            rang = self.cases(n, c, cw=0.95, h=0.6)
            lignes.add(VGroup(lbl, rang))
        # Les noms à gauche, les cases toutes alignées sur la même verticale :
        # c'est ce qui fait voir que Jade a 4 fois la part de Léo.
        for i, l in enumerate(lignes):
            y = 1.75 - 0.95 * i
            l[0].move_to([-5.6, y, 0])
            l[1].move_to([0, y, 0]).align_to(np.array([-4.6, 0, 0]), LEFT)
        self.play(LaggedStart(*[FadeIn(l, shift=RIGHT * 0.2) for l in lignes], lag_ratio=0.3))

        # ⛔ « ta voix doit correspondre aux écrits » (Frédéric, 02/10) : les
        # trois réflexes que la voix compte « un, deux, trois » sont ÉCRITS,
        # numérotés, alignés à gauche à partir de x = 0,6.
        def ligne(texte, y, color=WHITE):
            return Text(texte, font_size=26, color=color).move_to([0, y, 0]).align_to(np.array([0.9, 0, 0]), LEFT)

        self.au_mot("Trois réflexes")
        r0 = ligne("Trois réflexes :", 2.35, JAUNE_TITRE)
        self.play(FadeIn(r0, shift=DOWN * 0.15))
        self.au_mot("je compte les parts")
        e1 = ligne("1. Je compte : 1 + 2 + 4 = 7 parts", 1.7)
        self.play(Write(e1))
        self.au_mot("je trouve une part")
        e2 = ligne("2. Une part : 84 ÷ 7 = 12 €", 1.05, BLEU_CALCUL)
        self.play(Write(e2))
        self.au_mot("je distribue")
        e2b = ligne("3. Je distribue", 0.4, ORANGE_RETENUE)
        self.play(Write(e2b))
        douze = []
        for l in lignes:
            for c in l[1]:
                douze.append(Text("12", font_size=24, color=BLACK, weight=BOLD).move_to(c))
        self.play(LaggedStart(*[FadeIn(t, scale=0.6) for t in douze], lag_ratio=0.12))
        montants = ["12 €", "24 €", "48 €"]
        res = VGroup()
        for l, m, (_, _, c) in zip(lignes, montants, noms):
            res.add(Text(m, font_size=32, color=c).next_to(l[1], RIGHT, buff=0.35))
        for mot, t in zip(["Léo, 1 part", "Sami, 2 parts", "Jade, 4 parts"], res):
            self.au_mot(mot)
            self.play(FadeIn(t, shift=LEFT * 0.15), run_time=0.5)

        self.au_mot("je vérifie")
        # Sous la ligne de Jade (y ≈ −0,15), pas à côté de son « 48 € ».
        e3 = ligne("Je vérifie : 12 + 24 + 48 = 84", -0.85, VERT_OK)
        self.play(Write(e3))

        self.au_mot("Le piège")
        faux = Text("84 ÷ 3 personnes", font_size=34).move_to([-1.0, -1.85, 0])
        self.play(Write(faux))
        self.play(Create(self.barrer(faux)))
        self.au_mot("par le nombre de parts")
        self.play(Write(self.chute("On divise par le nombre de PARTS", color=JAUNE_TITRE)))
        self.attendre_voix()

    # ── 06 : une part du tout ───────────────────────────────────────────────

    def ecran_tout(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-part-du-tout")
        self.titre_ecran("Une part du tout")

        barre, etiq = self.barre([(2, BLEU_P, "bleu"), (3, JAUNE_P, "jaune")], cw=1.1, h=0.7)
        VGroup(barre, etiq).move_to([-0.6, 1.4, 0])
        self.play(FadeIn(barre), FadeIn(etiq))
        self.au_mot("5 parts en tout")
        total = Text("2 + 3 = 5 parts", font_size=34).move_to([-0.6, 0.0, 0])
        self.play(Write(total), Indicate(barre, color=WHITE, scale_factor=1.05))

        self.au_mot("deux cinquièmes")
        bon = VGroup(Text("bleu =", font_size=38, color=BLEU_P),
                     self.fraction(2, 5, font_size=40, color=VERT_OK),
                     Text("du mélange", font_size=34, color=VERT_OK)).arrange(RIGHT, buff=0.3)
        bon.move_to([-2.8, -1.45, 0])
        self.play(Write(bon))
        self.au_mot("Pas deux tiers")
        faux = VGroup(Text("pas", font_size=34), self.fraction(2, 3, font_size=40)).arrange(RIGHT, buff=0.3)
        faux.move_to([2.2, -1.45, 0])
        self.play(Write(faux))
        self.play(Create(self.barrer(faux[1])))
        self.au_mot("pas le total")
        self.play(Write(self.chute("3, c'est le jaune, pas le total", color=ORANGE_RETENUE)))
        self.attendre_voix()

    # ── 07 : défi et correction ─────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-defi")
        self.titre_ecran("Défi", font_size=48)

        l1 = Text("cerfs : sangliers = 3 : 5", font_size=48).move_to([-0.5, 1.6, 0])
        self.play(FadeIn(l1, shift=DOWN * 0.2))
        self.au_mot("40 sangliers de plus")
        l2 = Text("40 sangliers de plus que de cerfs", font_size=40, color=BLEU_CALCUL).move_to([-0.5, 0.4, 0])
        self.play(GrowFromCenter(l2))
        self.au_mot("Combien d'animaux")
        l3 = Text("Combien d'animaux en tout ?", font_size=44, color=JAUNE_TITRE).move_to([-0.5, -0.8, 0])
        self.play(Write(l3))
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause et cherche !", color=ORANGE_RETENUE, font_size=38)))
        self.attendre_voix(marge=3.5)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("07b-correction")
        self.titre_ecran("Correction")

        cw = 0.85
        cerfs = self.cases(3, "#A16207", cw=cw, h=0.6)
        sang = self.cases(5, GRIS_P, cw=cw, h=0.6)
        x0 = -4.6
        cerfs.move_to([x0 + 3 * cw / 2, 1.55, 0])
        sang.move_to([x0 + 5 * cw / 2, 0.7, 0])
        lc = Text("cerfs", font_size=28, color="#D6A35C").next_to(cerfs, LEFT, buff=0.3)
        ls = Text("sangliers", font_size=28, color=GRIS_P).next_to(sang, LEFT, buff=0.3)
        self.play(FadeIn(cerfs), FadeIn(lc), FadeIn(sang), FadeIn(ls))

        self.au_mot("L'écart aussi")
        ecart = VGroup(sang[3], sang[4])
        cadre = SurroundingRectangle(ecart, color=JAUNE_TITRE, buff=0.06, stroke_width=4)
        e_txt = Text("écart : 2 parts = 40", font_size=28, color=JAUNE_TITRE).next_to(cadre, RIGHT, buff=0.3)
        self.play(Create(cadre), Write(e_txt))
        self.au_mot("une part vaut 20")
        p1 = Text("1 part = 40 ÷ 2 = 20", font_size=34, color=BLEU_CALCUL).move_to([-0.6, -0.4, 0])
        self.play(Write(p1))
        vingt = [Text("20", font_size=24, color=BLACK, weight=BOLD).move_to(c) for c in [*cerfs, *sang]]
        self.play(LaggedStart(*[FadeIn(t, scale=0.6) for t in vingt], lag_ratio=0.08))

        self.au_mot("Cerfs : 3 fois 20")
        r1 = Text("cerfs : 3 × 20 = 60    sangliers : 5 × 20 = 100", font_size=30).move_to([-0.6, -1.25, 0])
        self.play(Write(r1))
        self.au_mot("En tout")
        r2 = Text("en tout : 160 animaux", font_size=38, color=VERT_OK).move_to([-0.6, -2.05, 0])
        self.play(Write(r2))
        self.play(Circumscribe(r2, color=VERT_OK))
        self.au_mot("C'est l'écart")
        self.play(Indicate(cadre, color=JAUNE_TITRE))
        self.attendre_voix()

    # ── déroulé ─────────────────────────────────────────────────────────────

    def construct(self):
        self.page_de_garde(
            titre="Tout comprendre sur les ratios",
            accroche="84 € à partager à trois : comment faire juste ?",
            promesse="On compte les parts, pas les personnes.",
        )
        self.page_objectifs(OBJECTIFS)
        self.ecran_ratio()
        self.ecran_simplifier()
        self.ecran_quotients()
        self.ecran_trois()
        self.ecran_partager()
        self.ecran_tout()
        self.ecran_defi()
        self.ecran_correction()
        self.page_finale(
            points=[
                "Un ratio compare des parts toutes égales",
                "Il se simplifie comme une fraction",
                "Partager : les parts, une part, je distribue",
            ],
            rappel="On divise par le nombre de parts, pas par le nombre de personnes.",
            voix="08-finale",
        )
        self.page_abonnement(voix="09-abonne")
