# demi_droite_graduee.py
# EleveAI — Maths 6e — La demi-droite graduée
# (notionId : demi_droite_graduee), AVEC VOIX.
# Mêmes exemples que la fiche lib/fiches/maths-6e-demi-droite-graduee.tsx.
# Voix : manim/voix/6e-demi-droite-graduee.json (débit −10), validée le 05/10/2026.
#
# ⭐ Un seul geste porte toute la vidéo : LE SAUT. Une flèche courbe d'un trait
# au suivant, c'est le pas qu'on compte depuis 0 — on le voit en lisant, en
# plaçant, avec les quarts, et dans la correction du défi.
#
# Mapping micro-compétences (coach 6e, notion demi_droite_graduee) → écrans :
# - abscisse_lire     → 01 (origine, abscisse), 02 (le pas), 03 (A = 0,5 ; C = 0,3)
# - abscisse_placer   → 04 (2,3 en dixièmes ; 4,2 de 0,5 en 0,5)
# - abscisse_fraction → 05 (3/4 ; 7/4 entre 1 et 2)
# - abscisse_graduer  → 06 (12 cm en quarts)
# - défi              → 07 + correction (B sur le 3e trait, pas 0,5)
#
# Rendu : python -m manim render -qh --disable_caching manim/scripts/6e/demi_droite_graduee.py DemiDroiteGraduee6e -o eleveai-maths-6e-demi-droite-graduee --media_dir manim/scripts/6e/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from manim import *

from charte import *
from gabarit_sixieme import Notion6e

OBJECTIFS = [
    "Lire un nombre sur une demi-droite graduée",
    "Placer un nombre décimal",
    "Placer une fraction",
    "Graduer un segment",
]
BOIS = "#E9C46A"


def ecrit(v):
    """1.5 → « 1,5 » ; 2.0 → « 2 »."""
    return f"{v:g}".replace(".", ",")


class DemiDroiteGraduee6e(Notion6e):
    nom_voix = "6e-demi-droite-graduee"

    # ── les dessins propres à cette vidéo ──────────────────────────────────

    def demi_droite(self, a, b, n, etiquettes, longueur=10.0, centre=(0, 0),
                    font_size=28, origine=True):
        """Une demi-droite graduée : elle PART de l'origine et file à droite.

        `etiquettes` : liste des valeurs écrites sous la droite.
        Renvoie (axe, traits, étiquettes, valeur → point).
        """
        cx, cy = centre
        x0 = cx - longueur / 2

        def pt(v):
            return np.array([x0 + longueur * (v - a) / (b - a), cy, 0])

        depart = pt(a) if origine else pt(a) + LEFT * 0.4
        axe = Line(depart, pt(b) + RIGHT * 0.9, stroke_width=3)
        axe.add_tip(tip_length=0.22, tip_width=0.2)
        traits = VGroup()
        for i in range(n + 1):
            v = a + (b - a) * i / n
            h = 0.2 if abs(v - round(v)) < 1e-9 else 0.12
            traits.add(Line(pt(v) + DOWN * h, pt(v) + UP * h, stroke_width=2.5))
        labels = VGroup(*[Text(ecrit(v), font_size=font_size).move_to(pt(v) + DOWN * 0.55)
                          for v in etiquettes])
        return axe, traits, labels, pt

    def saut(self, pt, v1, v2, texte=None, couleur=ORANGE_RETENUE, font_size=24, haut=0.22):
        """Le saut d'un trait au suivant : une flèche courbe, et ce qu'on atteint."""
        arc = ArcBetweenPoints(pt(v1) + UP * haut, pt(v2) + UP * haut, angle=-PI / 2,
                               color=couleur, stroke_width=3)
        arc.add_tip(tip_length=0.14, tip_width=0.14)
        g = VGroup(arc)
        if texte:
            g.add(Text(texte, font_size=font_size, color=couleur).next_to(arc, UP, buff=0.08))
        return g

    def zone(self, pt, v1, v2, couleur=JAUNE_TITRE):
        return Line(pt(v1), pt(v2), color=couleur, stroke_width=12, stroke_opacity=0.8)

    def regle(self, n_cm, x_gauche, cm, y_haut, font_size=22, hauteur=0.85):
        """Une règle en bois : un trait par centimètre, un petit par demi."""
        corps = Rectangle(width=n_cm * cm + 0.8, height=hauteur, stroke_color=BOIS, stroke_width=2,
                          fill_color=BOIS, fill_opacity=0.18)
        corps.move_to([x_gauche - 0.4 + (n_cm * cm + 0.8) / 2, y_haut - hauteur / 2, 0])
        traits, nums = VGroup(), VGroup()
        for k in range(2 * n_cm + 1):
            x = x_gauche + k * cm / 2
            h = 0.3 if k % 2 == 0 else 0.16
            traits.add(Line([x, y_haut, 0], [x, y_haut - h, 0], stroke_width=2))
            if k % 2 == 0:
                nums.add(Text(str(k // 2), font_size=font_size).move_to([x, y_haut - 0.52, 0]))
        return corps, traits, nums

    # ── 00 : page de garde — la règle devient une demi-droite ─────────────

    def ecran_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")

        t = Text("La demi-droite graduée", font_size=54, color=JAUNE_TITRE).to_edge(UP, buff=0.6)
        identite = Text(self.identite, font_size=30, color=WHITE).next_to(t, DOWN, buff=0.3)
        self.play(Write(t), FadeIn(identite, shift=DOWN * 0.2))

        cm, xg = 1.4, -5.2
        corps, traits, nums = self.regle(6, xg, cm, 1.55)
        self.play(FadeIn(corps), Create(traits), FadeIn(nums))

        self.au_mot("Un 0 au bout")
        self.play(Indicate(nums[0], color=JAUNE_TITRE, scale_factor=1.6))
        self.au_mot("puis 1, 2, 3")
        self.play(LaggedStart(*[Indicate(nums[k], color=JAUNE_TITRE, scale_factor=1.5)
                                for k in (1, 2, 3)], lag_ratio=0.4))
        self.au_mot("le même écart")
        y_b = 1.55 - 0.85
        sauts = VGroup()
        for k in range(3):
            arc = ArcBetweenPoints([xg + k * cm, y_b - 0.1, 0], [xg + (k + 1) * cm, y_b - 0.1, 0],
                                   angle=PI / 2, color=ORANGE_RETENUE, stroke_width=3)
            sauts.add(arc)
        ecart = Text("même écart", font_size=28, color=ORANGE_RETENUE).next_to(sauts, RIGHT, buff=0.3)
        self.play(LaggedStart(*[Create(s) for s in sauts], lag_ratio=0.3), FadeIn(ecart))

        self.au_mot("Ta règle, c'est")
        axe, tr, lb, pt = self.demi_droite(0, 3, 3, [0, 1, 2, 3], longueur=9.0, centre=(-1.0, -1.1))
        nom = Text("une demi-droite graduée", font_size=32, color=BLEU_CALCUL).move_to([-1.0, -2.25, 0])
        self.play(FadeOut(sauts), FadeOut(ecart), Create(axe), Create(tr), FadeIn(lb))
        self.play(Write(nom))

        self.au_mot("chaque nombre a sa place")
        self.play(Transform(nom, Text("Chaque nombre a sa place.", font_size=34, color=VERT_OK).move_to(nom)))
        self.au_mot("Même 0 virgule 5")
        p1 = self.point(pt, 0.5, "0,5", color=VERT_OK)
        self.play(FadeIn(p1, scale=0.5))
        self.au_mot("Même trois quarts")
        d = Dot(pt(0.75), color=VIOLET_ACCENT, radius=0.11)
        f = self.fraction(3, 4, font_size=26, color=VIOLET_ACCENT).next_to(d, UP, buff=0.2)
        self.play(FadeIn(d, scale=0.5), FadeIn(f))
        self.attendre_voix()

    # ── 00b : les objectifs, une phrase ────────────────────────────────────

    def ecran_objectifs(self):
        self.clear()
        self.add_mascotte()
        self.dire("00b-objectifs")

        titre = Text("À la fin, tu sauras", font_size=44, color=JAUNE_TITRE).to_edge(UP, buff=0.75)
        self.play(Write(titre), run_time=0.7)
        lignes = VGroup()
        for i, texte in enumerate(OBJECTIFS):
            num = Text(f"{i + 1}.", font_size=34, color=BLEU_CALCUL)
            corps = Text(texte, font_size=32, color=WHITE)
            lignes.add(VGroup(num, corps).arrange(RIGHT, buff=0.28, aligned_edge=UP))
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.62).move_to([-0.3, 0.0, 0])
        for mot, l in zip(("lire un nombre", "placer un nombre", "placer une fraction", "graduer"), lignes):
            self.au_mot(mot)
            self.play(FadeIn(l, shift=RIGHT * 0.25), run_time=0.45)
        self.attendre_voix()

    # ── 01 : l'origine, la même longueur, l'abscisse ───────────────────────

    def ecran_definition(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-definition")
        self.titre_ecran("Une demi-droite graduée")

        axe, tr, lb, pt = self.demi_droite(0, 4, 4, [0, 1, 2, 3, 4], longueur=8.4, centre=(-1.2, 0.2))
        self.play(Create(axe), Create(tr[0]))

        self.au_mot("l'origine")
        o = Dot(pt(0), color=JAUNE_TITRE, radius=0.12)
        l_o = Text("origine", font_size=30, color=JAUNE_TITRE).next_to(o, UP, buff=0.35)
        self.play(FadeIn(o, scale=0.5), Write(l_o))
        self.au_mot("Elle vaut 0")
        self.play(FadeIn(lb[0], shift=UP * 0.2))

        self.au_mot("la même longueur")
        meme = Text("toujours la même longueur", font_size=30, color=ORANGE_RETENUE).move_to([-1.2, 2.2, 0])
        self.play(FadeIn(meme))
        unite = Line(pt(0), pt(1), color=ORANGE_RETENUE, stroke_width=9)
        self.play(Create(unite), run_time=0.5)
        self.au_mot("1, 2, 3, 4")
        for k in range(1, 5):
            self.play(unite.animate.move_to((pt(k - 1) + pt(k)) / 2 if k > 1 else unite.get_center()),
                      Create(tr[k]), FadeIn(lb[k]), run_time=0.35)
        self.play(FadeOut(unite), run_time=0.3)

        self.au_mot("Chaque point de la droite")
        porte = Text("chaque point porte un nombre", font_size=30).move_to([-1.2, -1.3, 0])
        self.play(Transform(meme, porte.copy().move_to(meme)), run_time=0.5)
        self.au_mot("son abscisse")
        mot = Text("ce nombre = son ABSCISSE", font_size=34, color=BLEU_CALCUL).move_to([-1.2, -1.4, 0])
        self.play(Write(mot))

        self.au_mot("Le point A")
        a = self.point(pt, 3, "A", color=VERT_OK)
        self.play(FadeIn(a, scale=0.5))
        self.au_mot("son abscisse est 3")
        self.play(Indicate(lb[3], color=VERT_OK, scale_factor=1.6))
        self.play(Write(self.chute("L'abscisse de A est 3.", color=VERT_OK, font_size=42)))
        self.attendre_voix()

    # ── 02 : le pas ────────────────────────────────────────────────────────

    def ecran_pas(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-le-pas")
        self.titre_ecran("Le pas")

        vals = [0, 0.2, 0.4, 0.6, 0.8, 1]
        axe, tr, lb, pt = self.demi_droite(0, 1, 5, vals, longueur=10.0, centre=(-0.9, 0.5))
        self.play(Create(axe), Create(tr), FadeIn(lb))

        self.au_mot("Ici, on lit")
        self.play(LaggedStart(*[Indicate(lb[k], color=BLEU_CALCUL, scale_factor=1.5) for k in range(3)],
                              lag_ratio=0.5))
        self.au_mot("on avance de 0 virgule 2")
        sauts = VGroup(*[self.saut(pt, vals[k], vals[k + 1], "+ 0,2") for k in range(5)])
        self.play(LaggedStart(*[Create(s) for s in sauts], lag_ratio=0.3), run_time=1.8)

        self.au_mot("c'est le pas")
        pas = Text("le pas = 0,2", font_size=40, color=ORANGE_RETENUE).move_to([-0.9, 2.1, 0])
        self.play(GrowFromCenter(pas))

        self.au_mot("La règle d'or")
        regle = Text("Règle d'or : avant de lire, je trouve le pas.", font_size=34, color=JAUNE_TITRE)
        regle.move_to([-0.9, -1.15, 0])
        cadre = SurroundingRectangle(regle, color=JAUNE_TITRE, buff=0.2)
        self.play(Write(regle), Create(cadre))

        self.au_mot("Je prends deux nombres")
        b1 = SurroundingRectangle(lb[2], color=BLEU_CALCUL, buff=0.08)
        b2 = SurroundingRectangle(lb[3], color=BLEU_CALCUL, buff=0.08)
        self.play(Create(b1), Create(b2))
        self.au_mot("je calcule l'écart")
        calc = Text("0,6 − 0,4 = 0,2", font_size=40, color=BLEU_CALCUL).move_to([-1.5, -2.4, 0])
        self.play(Write(calc))
        self.attendre_voix()

    # ── 03 : lire une abscisse (A = 0,5 ; C = 0,3) ─────────────────────────

    def ecran_lire(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-lire")
        self.titre_ecran("Je lis une abscisse")

        vals = [0, 0.2, 0.4, 0.6, 0.8, 1]
        axe, tr, lb, pt = self.demi_droite(0, 1, 5, vals, longueur=10.0, centre=(-0.9, 0.4))
        a = self.point(pt, 0.5, "A", color=ORANGE_RETENUE)
        self.play(Create(axe), Create(tr), FadeIn(lb), FadeIn(a, scale=0.5))

        self.au_mot("Le pas vaut")
        pas = Text("pas = 0,2", font_size=36, color=ORANGE_RETENUE).move_to([-4.6, 2.3, 0])
        self.play(FadeIn(pas))
        self.au_mot("Je compte depuis 0")
        s1 = self.saut(pt, 0, 0.2, "0,2", couleur=BLEU_CALCUL)
        s2 = self.saut(pt, 0.2, 0.4, "0,4", couleur=BLEU_CALCUL)
        self.play(Create(s1), Indicate(lb[1], color=BLEU_CALCUL))
        self.play(Create(s2), Indicate(lb[2], color=BLEU_CALCUL))

        self.au_mot("A est juste au milieu")
        z = self.zone(pt, 0.4, 0.6)
        txt = Text("A est au milieu de 0,4 et 0,6", font_size=34).move_to([-0.9, -1.2, 0])
        self.play(Create(z), FadeIn(txt))
        self.au_mot("Son abscisse est 0 virgule 5")
        r_a = Text("abscisse de A = 0,5", font_size=40, color=VERT_OK).move_to([-0.9, -2.1, 0])
        self.play(a.animate.set_color(VERT_OK), Write(r_a))

        self.au_mot("Et le point C")
        c = self.point(pt, 0.3, "C", color=ORANGE_RETENUE)
        z2 = self.zone(pt, 0.2, 0.4)
        self.play(FadeOut(s1), FadeOut(s2), FadeOut(z), FadeIn(c, scale=0.5))
        self.play(Create(z2), Transform(txt, Text("C est au milieu de 0,2 et 0,4", font_size=34).move_to(txt)))
        self.au_mot("Son abscisse est 0 virgule 3")
        r_c = Text("abscisse de C = 0,3", font_size=40, color=VERT_OK).move_to(r_a)
        self.play(c.animate.set_color(VERT_OK), Transform(r_a, r_c))
        self.au_mot("pas 3")
        faux = Text("pas 3 !", font_size=40, color=ROUGE_ERREUR).next_to(r_a, RIGHT, buff=0.5)
        self.play(FadeIn(faux, scale=1.4))
        self.attendre_voix()

    # ── 04 : placer un nombre (2,3 ; puis 4,2) ─────────────────────────────

    def ecran_placer(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-placer")
        self.titre_ecran("Je place un nombre")

        q = Text("Placer 2,3", font_size=40, color=BLEU_CALCUL).move_to([-4.4, 2.4, 0])
        self.play(FadeIn(q))
        dr, pt = self.droite(2, 3, 10, {2: "2", 3: "3"}, longueur=10.0, centre=(-0.9, 1.0))
        self.au_mot("La droite va de 2 à 3")
        self.play(Create(dr[0]), Create(dr[1]), FadeIn(dr[2]))
        self.au_mot("coupée en 10")
        dix = Text("10 parts", font_size=30, color=WHITE).move_to([1.2, 2.4, 0])
        self.play(FadeIn(dix))
        self.au_mot("Chaque petit trait")
        self.play(Transform(dix, Text("1 petit trait = 0,1", font_size=32, color=VIOLET_ACCENT).move_to(dix)))

        self.au_mot("Je vais à 2")
        curseur = Dot(pt(2), color=ORANGE_RETENUE, radius=0.11)
        self.play(FadeIn(curseur, scale=2))
        self.au_mot("j'avance de 3 dixièmes")
        cibles = [2.1, 2.2, 2.3]
        precedent = 2
        sauts = VGroup()
        for v in cibles:
            s = self.saut(pt, precedent, v, ecrit(v), font_size=22)
            sauts.add(s)
            self.play(Create(s), curseur.animate.move_to(pt(v)), run_time=0.55)
            precedent = v
        self.au_mot("Je marque le point")
        p = Dot(pt(2.3), color=VERT_OK, radius=0.13)
        lp = Text("2,3", font_size=30, color=VERT_OK).move_to(pt(2.3) + DOWN * 0.55)
        self.play(FadeOut(curseur), FadeIn(p, scale=0.5), Write(lp))

        self.au_mot("Et 4 virgule 2")
        axe, tr, lb, pt2 = self.demi_droite(3.5, 5, 3, [3.5, 4, 4.5, 5], longueur=7.5,
                                            centre=(0.2, -1.4), origine=False)
        q2 = Text("Et 4,2 ?", font_size=40, color=BLEU_CALCUL).move_to([-5.5, -1.4, 0])
        self.play(FadeIn(q2), Create(axe), Create(tr), FadeIn(lb))
        self.au_mot("de 0 virgule 5 en 0 virgule 5")
        self.play(LaggedStart(*[Indicate(l, color=ORANGE_RETENUE) for l in lb], lag_ratio=0.25))
        self.au_mot("Il est entre 4 et 4 virgule 5")
        self.play(Create(self.zone(pt2, 4, 4.5)))
        self.au_mot("plus près de 4")
        p2 = self.point(pt2, 4.2, "4,2", color=VERT_OK)
        self.play(FadeIn(p2, scale=0.5))
        self.play(Write(self.chute("4,2 : entre 4 et 4,5, plus près de 4", color=VERT_OK, font_size=36)))
        self.attendre_voix()

    # ── 05 : une fraction a sa place (3/4 ; 7/4) ───────────────────────────

    def ecran_fraction(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-fraction")
        self.titre_ecran("Une fraction a sa place")

        lg, cx, cy = 10.0, -0.9, -0.2
        axe, tr, lb, pt = self.demi_droite(0, 2, 8, [0, 1, 2], longueur=lg, centre=(cx, cy))
        entiers = VGroup(tr[0], tr[4], tr[8])
        quarts = VGroup(*[tr[k] for k in (1, 2, 3, 5, 6, 7)])
        self.play(Create(axe), Create(entiers), FadeIn(lb))

        self.au_mot("On coupe l'unité en 4")
        barre = self.barre_parts(4, 0, largeur=lg / 2, hauteur=0.5,
                                 centre=[(pt(0)[0] + pt(1)[0]) / 2, 1.85, 0], couleur=VIOLET_ACCENT)
        self.play(FadeIn(barre, shift=DOWN * 0.2))
        self.play(Create(quarts))

        self.au_mot("Chaque trait vaut un quart")
        regle = VGroup(Text("1 trait =", font_size=34), self.fraction(1, 4, font_size=34, color=VIOLET_ACCENT))
        regle.arrange(RIGHT, buff=0.25).move_to([3.0, 1.85, 0])
        self.play(FadeIn(regle))

        fr = {}
        for k, mot in ((1, "Un quart"), (2, "deux quarts"), (3, "trois quarts :")):
            self.au_mot(mot)
            fr[k] = self.fraction(k, 4, font_size=24, color=VIOLET_ACCENT).move_to(pt(k / 4) + UP * 0.8)
            self.play(FadeIn(fr[k], shift=DOWN * 0.15), barre[k - 1].animate.set_fill(VIOLET_ACCENT, opacity=0.85),
                      run_time=0.45)
        self.au_mot("sur le troisième trait")
        p34 = Dot(pt(0.75), color=VERT_OK, radius=0.13)
        self.play(FadeIn(p34, scale=0.5), fr[3].animate.set_color(VERT_OK))

        self.au_mot("Et 4 quarts")
        f44 = self.fraction(4, 4, font_size=24, color=JAUNE_TITRE).move_to(pt(1) + UP * 0.8)
        self.play(FadeIn(f44, shift=DOWN * 0.15), barre[3].animate.set_fill(VIOLET_ACCENT, opacity=0.85))
        self.au_mot("pile sur 1")
        self.play(Indicate(lb[1], color=JAUNE_TITRE, scale_factor=1.6))

        self.au_mot("Alors où est sept quarts")
        q74 = VGroup(self.fraction(7, 4, font_size=34, color=BLEU_CALCUL), Text("?", font_size=40, color=BLEU_CALCUL))
        q74.arrange(RIGHT, buff=0.2).move_to(regle)
        self.play(FadeOut(barre), FadeOut(regle), FadeIn(q74))
        self.au_mot("4 quarts font 1")
        self.play(Indicate(f44, color=JAUNE_TITRE, scale_factor=1.4))
        self.au_mot("8 quarts font 2")
        f84 = self.fraction(8, 4, font_size=24, color=JAUNE_TITRE).move_to(pt(2) + UP * 0.8)
        self.play(FadeIn(f84, shift=DOWN * 0.15), Indicate(lb[2], color=JAUNE_TITRE))
        self.au_mot("Sept quarts est entre")
        self.play(Create(self.zone(pt, 1, 2, couleur=BLEU_CALCUL)))
        p74 = Dot(pt(1.75), color=VERT_OK, radius=0.13)
        f74 = self.fraction(7, 4, font_size=24, color=VERT_OK).move_to(pt(1.75) + UP * 0.8)
        self.play(FadeIn(p74, scale=0.5), FadeIn(f74))
        fin = VGroup(self.fraction(7, 4, font_size=36, color=VERT_OK),
                     Text("est entre 1 et 2, tout près de 2", font_size=36, color=VERT_OK))
        fin.arrange(RIGHT, buff=0.3).move_to([-1.2, -2.3, 0])
        self.play(FadeIn(fin))
        self.attendre_voix()

    # ── 06 : graduer un segment (12 cm en quarts) ──────────────────────────

    def ecran_graduer(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-graduer")
        self.titre_ecran("Je gradue un segment")

        cm, xg, ys = 0.75, -5.4, 1.0

        def x(c):
            return xg + c * cm

        self.au_mot("On a un segment")
        seg = Line([x(0), ys, 0], [x(12), ys, 0], stroke_width=5)
        bouts = VGroup(*[Line([x(c), ys - 0.22, 0], [x(c), ys + 0.22, 0], stroke_width=5) for c in (0, 12)])
        corps, traits, nums = self.regle(12, xg, cm, ys - 0.35, font_size=20)
        l12 = Text("12 cm", font_size=34).move_to([-3.6, 2.3, 0])
        self.play(Create(seg), Create(bouts), FadeIn(l12))
        self.play(FadeIn(corps), Create(traits), FadeIn(nums))
        self.au_mot("à couper en quarts")
        quarts = Text("en quarts", font_size=34, color=VIOLET_ACCENT).next_to(l12, RIGHT, buff=0.4)
        self.play(FadeIn(quarts))

        self.au_mot("4 parts égales")
        self.play(Transform(quarts, Text("en quarts = 4 parts égales", font_size=34, color=VIOLET_ACCENT)
                            .next_to(l12, RIGHT, buff=0.4)))
        self.au_mot("12 divisé par 4")
        calc = Text("12 ÷ 4 = 3", font_size=44, color=BLEU_CALCUL).move_to([-3.8, -1.6, 0])
        self.play(Write(calc))

        self.au_mot("tous les 3 centimètres")
        marques = VGroup()
        for c, mot in ((3, "à 3"), (6, "à 6"), (9, "à 9")):
            self.au_mot(mot)
            m = Line([x(c), ys - 0.3, 0], [x(c), ys + 0.3, 0], color=ORANGE_RETENUE, stroke_width=6)
            lm = Text(f"{c} cm", font_size=26, color=ORANGE_RETENUE).move_to([x(c), ys + 0.6, 0])
            marques.add(VGroup(m, lm))
            self.play(Create(m), FadeIn(lm), Indicate(nums[c], color=ORANGE_RETENUE), run_time=0.5)

        self.au_mot("Trois traits à l'intérieur")
        self.play(LaggedStart(*[Indicate(mq[0], color=ORANGE_RETENUE, scale_factor=1.3) for mq in marques],
                              lag_ratio=0.3))
        t3 = Text("3 traits", font_size=34, color=ORANGE_RETENUE).move_to([0.6, -1.6, 0])
        self.play(FadeIn(t3))
        self.au_mot("coupé en 4")
        couleurs = [BLEU_CALCUL, VIOLET_ACCENT, BLEU_CALCUL, VIOLET_ACCENT]
        parts = VGroup(*[Line([x(3 * k), ys, 0], [x(3 * k + 3), ys, 0], color=couleurs[k], stroke_width=9)
                         for k in range(4)])
        self.play(LaggedStart(*[Create(p) for p in parts], lag_ratio=0.25))
        self.play(Write(self.chute("4 parts égales de 3 cm", color=VERT_OK, font_size=42)))
        self.attendre_voix()

    # ── 07 : défi (B sur le 3e trait, de 0,5 en 0,5) et correction ─────────

    def droite_defi(self):
        return self.demi_droite(0, 2.5, 5, [0, 0.5], longueur=10.0, centre=(-0.9, 0.5))

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-defi")
        self.titre_ecran("Défi", font_size=48)

        axe, tr, lb, pt = self.droite_defi()
        self.play(Create(axe), Create(tr), FadeIn(lb))
        self.au_mot("de 0 virgule 5 en 0 virgule 5")
        g = Text("graduée de 0,5 en 0,5", font_size=36, color=ORANGE_RETENUE).move_to([-0.9, 2.2, 0])
        self.play(FadeIn(g))
        self.au_mot("le point B")
        b = self.point(pt, 1.5, "B", color=BLEU_CALCUL)
        self.play(FadeIn(b, scale=0.5))
        self.au_mot("troisième trait")
        rangs = VGroup(*[Text(f"{k}e" if k > 1 else "1er", font_size=24, color=ORANGE_RETENUE)
                         .move_to(pt(0.5 * k) + DOWN * 1.1) for k in (1, 2, 3)])
        self.play(LaggedStart(*[FadeIn(r, shift=UP * 0.15) for r in rangs], lag_ratio=0.4))
        self.au_mot("Quelle est son abscisse")
        q = Text("Abscisse de B = ?", font_size=46, color=JAUNE_TITRE).move_to([-0.9, -1.6, 0])
        self.play(Write(q))
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause et cherche !", color=ORANGE_RETENUE, font_size=40)))
        self.attendre_voix(marge=3.5)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("07b-correction")
        self.titre_ecran("Correction")

        axe, tr, lb, pt = self.droite_defi()
        b = self.point(pt, 1.5, "B", color=BLEU_CALCUL, haut=False)
        self.play(FadeIn(axe), FadeIn(tr), FadeIn(lb), FadeIn(b))
        self.au_mot("Le pas vaut")
        pas = Text("pas = 0,5", font_size=40, color=ORANGE_RETENUE).move_to([-4.4, 2.3, 0])
        self.play(FadeIn(pas))
        self.au_mot("Je compte depuis 0")
        precedent = 0
        for v in (0.5, 1, 1.5):
            s = self.saut(pt, precedent, v, ecrit(v), couleur=BLEU_CALCUL, font_size=28)
            self.play(Create(s), run_time=0.6)
            precedent = v
        self.au_mot("L'abscisse de B est")
        r = Text("abscisse de B = 1,5", font_size=44, color=VERT_OK).move_to([-0.9, -1.5, 0])
        self.play(b.animate.set_color(VERT_OK), Write(r))
        self.au_mot("Et pas 3")
        faux = Text("Pas 3 : le pas ne vaut pas 1 !", font_size=38, color=ROUGE_ERREUR).move_to([-0.9, -2.5, 0])
        self.play(FadeIn(faux, scale=1.2))
        self.attendre_voix()

    # ── déroulé ─────────────────────────────────────────────────────────────

    def construct(self):
        self.ecran_garde()
        self.ecran_objectifs()
        self.ecran_definition()
        self.ecran_pas()
        self.ecran_lire()
        self.ecran_placer()
        self.ecran_fraction()
        self.ecran_graduer()
        self.ecran_defi()
        self.ecran_correction()
        self.page_finale(
            points=[
                "Lire une abscisse : je trouve le pas, puis je compte depuis 0",
                "Placer un nombre décimal, et une fraction",
                "Graduer un segment : la longueur ÷ le nombre de parts",
            ],
            rappel="Avant de lire, je trouve le pas !",
            voix="08-finale",
        )
        self.page_abonnement(voix="09-abonne")
