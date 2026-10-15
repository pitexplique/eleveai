# decimal_nombre.py
# EleveAI — Maths 6e — Tout comprendre sur les nombres décimaux
# (notionId : decimal_nombre), AVEC VOIX.
# Mêmes exemples que la fiche lib/fiches/maths-6e-decimaux.tsx (réécrite le 30/09).
#
# ⭐ 01/10/2026 : réécrite. La version muette d'août suivait la fiche de juin et
# traitait le CALCUL (addition, ×, ÷), qui est la notion `decimal_calcul` ; elle
# oubliait arrondir et encadrer. Celle-ci suit les six micros du coach.
# ⭐ Frédéric : « expliquer d'où viennent les nombres décimaux » → deux écrans
# d'origine (le crayon qu'on mesure ; « décimal » vient de dix, l'euro).
# ⛔ Pas d'histoire savante (Stevin, al-Kashi) : retirée le 01/10, « ça va
# intéresser personne » en 6e.
# Voix validée : manim/voix/6e-decimal-nombre.json (débit −10).
#
# Mapping micro-compétences (coach 6e, notion decimal_nombre) → écrans :
# - decimal_lire_ecrire → 01-origine (12,4 cm), 03-tableau (3,45), 04-fraction (25/10)
# - decimal_rang        → 03-tableau (grille des centièmes), 05-rang (12,764 ; 0,09)
# - decimal_comparer    → 06-comparer (0,7 et 0,65)
# - decimal_arrondir    → 07-arrondir (12,7 ; 4,382)
# - decimal_encadrer    → 08-encadrer (7,38 ; entre 2,5 et 2,6)
# - decimal_defi        → 09-defi + correction (3,5 et 3,45)
#
# Rendu : python -m manim render -qh --disable_caching manim/scripts/6e/decimal_nombre.py DecimalNombre6e -o eleveai-maths-6e-decimal-nombre --media_dir manim/scripts/6e/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from manim import *

from charte import *
from gabarit_sixieme import Notion6e

OBJECTIFS = [
    "Lire un décimal et le rang de chaque chiffre",
    "Comparer deux nombres décimaux",
    "Arrondir et encadrer un nombre décimal",
]
RANGS = ["Unités", ",", "Dixièmes", "Centièmes", "Millièmes"]


class DecimalNombre6e(Notion6e):
    nom_voix = "6e-decimal-nombre"

    # ── 01 : d'où ils viennent — le crayon qu'on mesure ────────────────────

    def ecran_origine(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-origine")
        self.titre_ecran("D'où viennent les décimaux ?")

        # la règle : de 11 à 13 cm, 4,6 unités d'écran par centimètre — assez
        # large pour que les dix morceaux d'un centimètre se voient.
        y0 = -0.2

        def x(cm):
            return -5.3 + 4.6 * (cm - 11)

        regle = Rectangle(width=10.4, height=1.3, stroke_width=2, color=GREY_B,
                          fill_color=GREY_E, fill_opacity=0.6).move_to([-0.7, y0 - 0.65, 0])
        cm_ticks = VGroup(*[Line([x(c), y0, 0], [x(c), y0 - 0.6, 0], stroke_width=4) for c in range(11, 14)])
        cm_lbl = VGroup(*[Text(str(c), font_size=34).move_to([x(c), y0 - 0.95, 0]) for c in range(11, 14)])
        unite = Text("cm", font_size=28, color=GREY_B).move_to([x(13) + 0.75, y0 - 0.95, 0])

        # le crayon : corps orange, pointe, mine ; sa pointe tombe sur 12,4
        bout = x(12.4)
        depart = -7.2
        corps = Rectangle(width=bout - 0.7 - depart, height=0.6, stroke_width=0,
                          fill_color=ORANGE_RETENUE, fill_opacity=1)
        corps.move_to([(depart + bout - 0.7) / 2, y0 + 0.5, 0])
        pointe = Polygon([bout - 0.7, y0 + 0.8, 0], [bout - 0.7, y0 + 0.2, 0], [bout, y0 + 0.5, 0],
                         stroke_width=0, fill_color="#f5d6a0", fill_opacity=1)
        mine = Polygon([bout - 0.22, y0 + 0.6, 0], [bout - 0.22, y0 + 0.4, 0], [bout, y0 + 0.5, 0],
                       stroke_width=0, fill_color=GREY_D, fill_opacity=1)
        crayon = VGroup(corps, pointe, mine)

        self.play(FadeIn(regle), Create(cm_ticks), FadeIn(cm_lbl), FadeIn(unite))
        self.play(FadeIn(crayon, shift=RIGHT * 0.5))

        self.au_mot("Il dépasse 12")
        zone = Rectangle(width=4.6, height=1.3, stroke_width=0, fill_color=JAUNE_TITRE,
                         fill_opacity=0.22).move_to([x(12.5), y0 - 0.65, 0])
        self.play(FadeIn(zone), Indicate(cm_lbl[1], color=JAUNE_TITRE, scale_factor=1.5))

        self.au_mot("on coupe un centimètre")
        mm = VGroup(*[Line([x(12 + k / 10), y0, 0], [x(12 + k / 10), y0 - 0.35, 0], stroke_width=2.5)
                      for k in range(1, 10)])
        self.play(LaggedStart(*[Create(t) for t in mm], lag_ratio=0.15))
        self.au_mot("Chaque morceau est un dixième")
        info = Text("1 morceau = 1 dixième de cm", font_size=34, color=BLEU_CALCUL).move_to([-0.5, 2.2, 0])
        self.play(FadeIn(info, shift=DOWN * 0.2))
        self.au_mot("Sur ta règle")
        info2 = Text("= 1 millimètre", font_size=34, color=BLEU_CALCUL).next_to(info, DOWN, buff=0.25)
        self.play(FadeIn(info2))

        self.au_mot("Le crayon dépasse de 4")
        morceaux = VGroup(*[Line([x(12 + k / 10) + 0.03, y0 - 0.15, 0], [x(12 + (k + 1) / 10) - 0.03, y0 - 0.15, 0],
                                 color=VERT_OK, stroke_width=12) for k in range(4)])
        nums = VGroup(*[Text(str(k + 1), font_size=30, color=VERT_OK)
                        .move_to([x(12 + (k + 0.5) / 10), y0 + 1.25, 0]) for k in range(4)])
        for m, n in zip(morceaux, nums):
            self.play(Create(m), FadeIn(n), run_time=0.45)

        self.au_mot("On écrit 12 virgule 4")
        res = self.chute("12,4 cm", color=VERT_OK, font_size=56)
        self.play(GrowFromCenter(res))
        self.play(Flash(res, color=VERT_OK, line_length=0.3))

        self.au_mot("On recoupe chaque morceau")
        info3 = Text("1 dixième coupé en 10 : les centièmes", font_size=34, color=ORANGE_RETENUE)
        info3.move_to([-0.5, 2.2, 0])
        self.play(FadeOut(info2), Transform(info, info3))
        self.au_mot("Voilà d'où viennent")
        self.play(Circumscribe(res, color=VERT_OK))
        self.attendre_voix()

    # ── 02 : « décimal » vient de dix ; l'euro ─────────────────────────────

    def ecran_euro(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-histoire")
        self.titre_ecran("Décimal, ça veut dire « dix »")

        latin = Text("decem = dix", font_size=48, color=BLEU_CALCUL).move_to([-0.5, 2.1, 0])
        self.play(GrowFromCenter(latin))
        self.au_mot("tout se coupe en 10")
        self.play(Indicate(latin, color=BLEU_CALCUL))

        self.au_mot("Un euro")
        piece = VGroup(Circle(radius=0.75, color=JAUNE_TITRE, fill_opacity=0.25, stroke_width=5),
                       Text("1 €", font_size=40, color=JAUNE_TITRE)).move_to([-3.8, 0.5, 0])
        egal = Text("= 100 centimes", font_size=44).next_to(piece, RIGHT, buff=0.5)
        self.play(GrowFromCenter(piece))
        self.play(Write(egal))

        self.au_mot("Un prix de 2 euros 45")
        prix = Text("2,45 €", font_size=96).move_to([-1.0, -1.0, 0])
        self.play(FadeIn(prix, scale=1.3))
        self.au_mot("2 euros entiers")
        b1 = Brace(prix[0], DOWN, color=BLEU_CALCUL)
        l1 = Text("2 € entiers", font_size=30, color=BLEU_CALCUL).next_to(b1, DOWN, buff=0.15)
        l1.align_to(b1, RIGHT).shift(LEFT * 0.1)
        self.play(prix[0].animate.set_color(BLEU_CALCUL), GrowFromCenter(b1), FadeIn(l1))
        self.au_mot("et 45 centimes")
        b2 = Brace(VGroup(prix[2], prix[3]), DOWN, color=VERT_OK)
        l2 = Text("45 centimes", font_size=30, color=VERT_OK).next_to(b2, DOWN, buff=0.15)
        l2.align_to(b2, LEFT).shift(RIGHT * 0.1)
        self.play(prix[2].animate.set_color(VERT_OK), prix[3].animate.set_color(VERT_OK),
                  GrowFromCenter(b2), FadeIn(l2))
        self.attendre_voix()

    # ── 03 : les rangs continuent après la virgule (3,45 ; la grille) ──────

    def ecran_tableau(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-tableau")
        self.titre_ecran("Les rangs après la virgule")

        ent, cases, xs = self.tableau_num(RANGS, y_ent=1.9, y_case=1.0, largeur=2.2, x_centre=-0.6)
        self.play(FadeIn(ent[0]), Create(cases[0]))
        self.au_mot("Juste après, les dixièmes")
        virg = Text(",", font_size=60, color=JAUNE_TITRE).move_to([xs[1], 0.85, 0])
        self.play(FadeIn(virg), FadeIn(ent[1]), Create(cases[2]))
        self.au_mot("Puis les centièmes")
        self.play(FadeIn(ent[2]), Create(cases[3]))
        self.au_mot("Puis les millièmes")
        self.play(FadeIn(ent[3]), Create(cases[4]))

        self.au_mot("Prenons 3 virgule 45")
        ch = VGroup(*[Text(c, font_size=60).move_to([xs[i], 1.0, 0]) for i, c in ((0, "3"), (2, "4"), (3, "5"))])
        self.play(LaggedStart(*[FadeIn(c, scale=1.4) for c in ch], lag_ratio=0.3))
        self.au_mot("Le 3 est aux unités")
        v0 = Text("3", font_size=34, color=VERT_OK).move_to([xs[0], -0.3, 0])
        self.play(Indicate(ch[0]), FadeIn(v0, shift=DOWN * 0.2))
        self.au_mot("Le 4 est aux dixièmes")
        v1 = Text("0,4", font_size=36, color=VERT_OK).move_to([xs[2], -0.3, 0])
        self.play(Indicate(ch[1], color=BLEU_CALCUL), FadeIn(v1, shift=DOWN * 0.2))
        self.au_mot("Le 5 est aux centièmes")
        v2 = Text("0,05", font_size=36, color=VERT_OK).move_to([xs[3], -0.3, 0])
        self.play(Indicate(ch[2], color=BLEU_CALCUL), FadeIn(v2, shift=DOWN * 0.2))

        self.au_mot("Regarde la grille")
        self.play(FadeOut(VGroup(ent, cases, virg, ch, v0, v1, v2)))

        cote, n = 0.42, 10
        ox, oy = -5.9, 1.85  # coin haut-gauche ; la grille finit à x = −1,7
        carreaux = VGroup()
        for col in range(n):
            for lig in range(n):
                carreaux.add(Square(side_length=cote, stroke_width=1.5, stroke_color=WHITE)
                             .move_to([ox + cote * (col + 0.5), oy - cote * (lig + 0.5), 0]))
        self.play(Create(carreaux), run_time=1.2)

        def carreau(col, lig):
            return carreaux[col * n + lig]

        self.au_mot("Une colonne, c'est un dixième")
        col0 = VGroup(*[carreau(0, l) for l in range(n)])
        def a_droite(t, y):
            # les phrases partent de x = −1,1, à droite de la grille
            return t.move_to([-1.1 + t.width / 2, y, 0])

        t1 = a_droite(Text("1 colonne = 1 dixième", font_size=34, color=BLEU_CALCUL), 1.0)
        self.play(col0.animate.set_fill(BLEU_CALCUL, opacity=0.8), FadeIn(t1))
        self.au_mot("Un carreau, c'est un centième")
        t2 = a_droite(Text("1 carreau = 1 centième", font_size=34, color=ORANGE_RETENUE), 0.0)
        self.play(carreau(9, 9).animate.set_fill(ORANGE_RETENUE, opacity=0.9), FadeIn(t2))

        self.au_mot("4 colonnes et 5 carreaux")
        self.play(carreau(9, 9).animate.set_fill(opacity=0))
        autres = VGroup(*[carreau(c, l) for c in range(1, 4) for l in range(n)])
        self.play(autres.animate.set_fill(BLEU_CALCUL, opacity=0.8), run_time=0.8)
        cinq = VGroup(*[carreau(4, l) for l in range(5)])
        self.play(cinq.animate.set_fill(ORANGE_RETENUE, opacity=0.9), run_time=0.6)
        res = VGroup(Text("4 colonnes + 5 carreaux", font_size=34, color=VERT_OK),
                     Text("= 0,45", font_size=48, color=VERT_OK)).arrange(DOWN, buff=0.2)
        a_droite(res, -1.4)
        self.play(Write(res))
        self.attendre_voix()

    # ── 04 : d'une fraction au décimal (25/10 = 2,5) ───────────────────────

    def ecran_fraction(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-fraction")
        self.titre_ecran("D'une fraction au décimal")

        fr = self.fraction(25, 10, font_size=56, color=BLEU_CALCUL).move_to([-3.5, 1.7, 0])
        egal = Text("= 25 dixièmes", font_size=44).next_to(fr, RIGHT, buff=0.5)
        self.play(FadeIn(fr, scale=1.3))
        self.au_mot("c'est 25 dixièmes")
        self.play(Write(egal))

        barres = VGroup()
        for cx in (-4.3, -0.7, 2.9):
            barres.add(self.barre_parts(10, 0, largeur=3.3, hauteur=0.75, centre=[cx, -0.2, 0]))
        self.play(LaggedStart(*[Create(b) for b in barres], lag_ratio=0.2))

        self.au_mot("Dix dixièmes font une unité")
        self.play(LaggedStart(*[r.animate.set_fill(BLEU_CALCUL, opacity=0.85) for r in barres[0]], lag_ratio=0.08))
        u1 = Text("1 unité", font_size=28, color=BLEU_CALCUL).next_to(barres[0], DOWN, buff=0.3)
        self.play(FadeIn(u1))
        self.au_mot("Donc vingt dixièmes")
        self.play(LaggedStart(*[r.animate.set_fill(BLEU_CALCUL, opacity=0.85) for r in barres[1]], lag_ratio=0.08))
        u2 = Text("2 unités", font_size=28, color=BLEU_CALCUL).next_to(barres[1], DOWN, buff=0.3)
        self.play(FadeIn(u2))
        self.au_mot("Il reste 5 dixièmes")
        self.play(LaggedStart(*[barres[2][k].animate.set_fill(ORANGE_RETENUE, opacity=0.9) for k in range(5)],
                              lag_ratio=0.12))
        u3 = Text("5 dixièmes", font_size=28, color=ORANGE_RETENUE).next_to(barres[2], DOWN, buff=0.3)
        self.play(FadeIn(u3))
        self.au_mot("25 sur 10, c'est 2 virgule 5")
        self.play(Write(self.chute("25/10 = 2,5", color=VERT_OK, font_size=50)))
        self.attendre_voix()

    # ── 05 : le rang d'un chiffre (12,764 ; le piège 0,09) ─────────────────

    def ecran_rang(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-rang")
        self.titre_ecran("Le rang d'un chiffre")

        entetes = ["Dizaines", "Unités", ",", "Dixièmes", "Centièmes", "Millièmes"]
        ent, cases, xs = self.tableau_num(entetes, y_ent=1.9, y_case=1.0, largeur=1.9, x_centre=-0.6)
        virg = Text(",", font_size=60, color=JAUNE_TITRE).move_to([xs[2], 0.85, 0])
        ch = VGroup(*[Text(c, font_size=60).move_to([xs[i], 1.0, 0])
                      for i, c in ((0, "1"), (1, "2"), (3, "7"), (4, "6"), (5, "4"))])
        self.play(FadeIn(ent), Create(cases), FadeIn(virg))
        self.play(LaggedStart(*[FadeIn(c, scale=1.3) for c in ch], lag_ratio=0.2))

        ordres = VGroup()
        for mot, k, txt, coul in (("le premier chiffre", 2, "1er", BLEU_CALCUL),
                                  ("Le deuxième", 3, "2e", ORANGE_RETENUE),
                                  ("Le troisième", 4, "3e", VERT_OK)):
            self.au_mot(mot)
            t = Text(txt, font_size=34, color=coul).move_to([xs[k + 1], -0.3, 0])
            ordres.add(t)
            # ent n'a pas d'entête pour la virgule : Dixièmes = ent[2], etc.
            self.play(ch[k].animate.set_color(coul), FadeIn(t, shift=UP * 0.2),
                      Indicate(ent[k], color=coul))

        self.au_mot("Attention au piège")
        self.play(FadeOut(ch), FadeOut(ordres))
        piege = VGroup(*[Text(c, font_size=60).move_to([xs[i], 1.0, 0]) for i, c in ((1, "0"), (3, "0"), (4, "9"))])
        self.play(LaggedStart(*[FadeIn(c, scale=1.3) for c in piege], lag_ratio=0.2))
        self.au_mot("le 9 est au deuxième rang")
        boite = SurroundingRectangle(VGroup(piege[2], ent[3]), color=ORANGE_RETENUE, buff=0.12)
        self.play(Create(boite), piege[2].animate.set_color(ORANGE_RETENUE))
        self.au_mot("C'est 9 centièmes")
        self.play(Write(self.chute("0,09 : 9 centièmes, pas 9 dixièmes", color=ORANGE_RETENUE, font_size=36)))
        self.attendre_voix()

    # ── comparer dans le tableau (sert à 06 et à la correction) ────────────

    def comparer_tableau(self, haut, bas, extrait_entiers, extrait_dixiemes, extrait_conclusion,
                         conclusion, extrait_zero, extrait_final, final):
        """Deux décimaux l'un sous l'autre : unités, puis dixièmes, puis le zéro."""
        ent, cases, xs = self.tableau_num(["Unités", ",", "Dixièmes", "Centièmes"], y_ent=1.6,
                                          y_case=0.75, largeur=2.1, x_centre=-2.2)
        y2 = -0.35
        cases2 = VGroup(*[c.copy().move_to([c.get_x(), y2, 0]) for c in cases if len(c) or isinstance(c, Rectangle)])
        r1 = self.chiffres(xs, 0.75, haut, font_size=56)
        r2 = self.chiffres(xs, y2, bas, font_size=56)
        self.play(FadeIn(ent), Create(cases), Create(cases2))
        self.play(FadeIn(r1, shift=DOWN * 0.2), FadeIn(r2, shift=UP * 0.2))

        self.au_mot(extrait_entiers)
        boite = SurroundingRectangle(VGroup(r1[0], r2[0]), color=BLEU_CALCUL, buff=0.12)
        eg = Text(f"{haut[0]} = {bas[0]}", font_size=40, color=BLEU_CALCUL).move_to([3.2, 0.2, 0])
        self.play(Create(boite), FadeIn(eg))
        self.au_mot(extrait_dixiemes)
        boite2 = SurroundingRectangle(VGroup(r1[2], r2[2]), color=ORANGE_RETENUE, buff=0.12)
        sup = Text(f"{haut[2]} > {bas[2]}", font_size=48, color=ORANGE_RETENUE).move_to([3.2, 0.2, 0])
        self.play(Transform(boite, boite2), FadeOut(eg), GrowFromCenter(sup))
        self.au_mot(extrait_conclusion)
        c = self.chute(conclusion, color=VERT_OK, font_size=46)
        self.play(r1.animate.set_color(VERT_OK), Write(c))

        self.au_mot(extrait_zero)
        zero = Text("0", font_size=56, color=ORANGE_RETENUE).move_to([xs[3], 0.75, 0])
        self.play(FadeOut(boite), FadeOut(sup), GrowFromCenter(zero))
        self.play(Flash(zero, color=ORANGE_RETENUE, line_length=0.3))
        self.au_mot(extrait_final)
        fin = Text(final, font_size=44, color=VERT_OK).move_to([3.2, 0.2, 0])
        self.play(Write(fin), Circumscribe(VGroup(r1[2], zero, r2[2], r2[3]), color=VERT_OK))

    # ── 06 : comparer (0,7 et 0,65) ────────────────────────────────────────

    def ecran_comparer(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-comparer")
        self.titre_ecran("Comparer deux décimaux")

        q = Text("0,7  ou  0,65 ?", font_size=60, color=BLEU_CALCUL).move_to([-0.5, 1.4, 0])
        self.play(GrowFromCenter(q))
        self.au_mot("Beaucoup répondent")
        faux = Text("« 65 est plus grand que 7 »", font_size=38, color=ROUGE_ERREUR).move_to([-0.5, 0.0, 0])
        self.play(FadeIn(faux, shift=UP * 0.2))
        self.au_mot("C'est faux")
        tampon = Text("FAUX !", font_size=64, color=ROUGE_ERREUR).rotate(0.15).move_to([-0.5, -1.4, 0])
        self.play(FadeIn(tampon, scale=2.0))

        self.au_mot("On compare d'abord")
        self.play(FadeOut(VGroup(q, faux, tampon)))
        self.comparer_tableau(
            "0,7 ", "0,65",
            "les parties entières", "Puis les dixièmes", "Donc 0 virgule 7",
            "0,7 > 0,65", "L'astuce", "70 centièmes", "70 > 65",
        )
        self.attendre_voix()

    # ── 07 : arrondir (12,7 ; 4,382) ───────────────────────────────────────

    def ecran_arrondir(self):
        self.clear()
        self.add_mascotte()
        self.dire("07-arrondir")
        self.titre_ecran("Arrondir")

        dr, pt = self.droite(12, 13, 10, {12: "12", 13: "13"}, centre=(-0.5, 0.8), font_size=36)
        self.play(Create(dr[0]), Create(dr[1]), FadeIn(dr[2]))
        p = self.point(pt, 12.7, "12,7", color=BLEU_CALCUL, font_size=36)
        self.play(FadeIn(p, scale=0.5))
        self.au_mot("il est plus près de 13")
        fl = Arrow(pt(12.7) + DOWN * 0.9, pt(13) + DOWN * 0.9, color=VERT_OK, buff=0.0)
        fl2 = Arrow(pt(12.7) + DOWN * 0.9, pt(12) + DOWN * 0.9, color=GREY_B, buff=0.0, stroke_width=3)
        self.play(GrowArrow(fl2))
        self.play(GrowArrow(fl))
        self.au_mot("Arrondi à l'unité")
        r1 = Text("arrondi à l'unité : 13", font_size=40, color=VERT_OK).move_to([-0.5, -1.0, 0])
        self.play(Write(r1))

        self.au_mot("Pour arrondir au dixième")
        self.play(FadeOut(VGroup(dr, p, fl, fl2, r1)))
        nb = Text("4,382", font_size=110).move_to([-1.5, 0.9, 0])
        self.play(FadeIn(nb, scale=1.2))
        # nb : 0 « 4 », 1 « , », 2 « 3 », 3 « 8 », 4 « 2 »
        self.au_mot("on regarde le chiffre d'après")
        b_dix = SurroundingRectangle(nb[2], color=BLEU_CALCUL, buff=0.1)
        l_dix = Text("dixièmes", font_size=26, color=BLEU_CALCUL).next_to(b_dix, DOWN, buff=0.2)
        self.play(Create(b_dix), FadeIn(l_dix))
        self.au_mot("le chiffre d'après est 8")
        b_ap = SurroundingRectangle(nb[3], color=ORANGE_RETENUE, buff=0.1)
        l_ap = Text("chiffre d'après", font_size=26, color=ORANGE_RETENUE).next_to(b_ap, UP, buff=0.2)
        self.play(Create(b_ap), FadeIn(l_ap), nb[3].animate.set_color(ORANGE_RETENUE))
        self.au_mot("5 ou plus, on monte")
        regle = Text("8 : 5 ou plus, on monte", font_size=38, color=ORANGE_RETENUE).move_to([-0.5, -1.2, 0])
        self.play(FadeIn(regle, shift=UP * 0.2))
        self.au_mot("L'arrondi au dixième est")
        self.play(Write(self.chute("4,382 arrondi au dixième : 4,4", color=VERT_OK, font_size=40)))
        self.attendre_voix()

    # ── 08 : encadrer et intercaler (7,38 ; entre 2,5 et 2,6) ──────────────

    def ecran_encadrer(self):
        self.clear()
        self.add_mascotte()
        self.dire("08-encadrer")
        self.titre_ecran("Encadrer et intercaler")

        dr, pt = self.droite(7, 8, 10, {7: "7", 8: "8"}, centre=(-0.5, 1.7), font_size=32)
        p = self.point(pt, 7.38, "7,38", color=BLEU_CALCUL, font_size=30)
        self.play(Create(dr[0]), Create(dr[1]), FadeIn(dr[2]))
        self.play(FadeIn(p, scale=0.5))
        self.au_mot("c'est l'encadrement à l'unité")
        e1 = Text("à l'unité :   7 < 7,38 < 8", font_size=36, color=VERT_OK).move_to([-0.5, 0.6, 0])
        self.play(Write(e1))

        self.au_mot("On peut serrer plus fort")
        # ⭐ le morceau de 7,3 à 7,4 s'allume en orange sur la première droite,
        # puis la seconde droite le montre en grand, dans la même couleur
        morceau = Line(pt(7.3), pt(7.4), color=ORANGE_RETENUE, stroke_width=10)
        self.play(Create(morceau))
        dr2, pt2 = self.droite(7.3, 7.4, 10, {7.3: "7,3", 7.4: "7,4"}, centre=(-0.5, -0.9), font_size=32)
        dr2[0].set_color(ORANGE_RETENUE)
        p2 = self.point(pt2, 7.38, "7,38", color=BLEU_CALCUL, font_size=30)
        self.play(TransformFromCopy(morceau, dr2[0]), Create(dr2[1]), FadeIn(dr2[2]))
        self.play(FadeIn(p2, scale=0.5))
        self.au_mot("C'est l'encadrement au dixième")
        e2 = Text("au dixième :   7,3 < 7,38 < 7,4", font_size=36, color=VERT_OK).move_to([-0.5, -2.2, 0])
        zoom = morceau
        self.play(Write(e2))

        self.au_mot("Et entre 2 virgule 5")
        self.play(FadeOut(VGroup(dr, p, e1, dr2, p2, zoom, e2)))
        dr3, pt3 = self.droite(2.5, 2.6, 10, {2.5: "2,5", 2.6: "2,6"}, centre=(-0.5, 0.6),
                               longueur=10.0, font_size=36)
        q = Text("Un nombre entre 2,5 et 2,6 ?", font_size=40, color=BLEU_CALCUL).move_to([-0.5, 2.2, 0])
        self.play(FadeIn(q), Create(dr3[0]), Create(dr3[1]), FadeIn(dr3[2]))
        self.au_mot("On écrit 2 virgule 50")
        n50 = Text("2,50", font_size=36).move_to(dr3[2][0])
        n60 = Text("2,60", font_size=36).move_to(dr3[2][1])
        self.play(Transform(dr3[2][0], n50), Transform(dr3[2][1], n60))
        self.au_mot("Entre les deux")
        petits = VGroup(*[Text(f"2,5{k}", font_size=20, color=GREY_B).move_to(pt3(2.5 + k / 100) + DOWN * 0.45)
                          for k in range(1, 10)])
        self.play(LaggedStart(*[FadeIn(t, shift=UP * 0.15) for t in petits], lag_ratio=0.15))
        self.au_mot("Par exemple")
        p3 = self.point(pt3, 2.55, "2,55", color=VERT_OK, font_size=36)
        self.play(FadeIn(p3, scale=0.5), petits[4].animate.set_color(VERT_OK))
        self.play(Write(self.chute("2,50 < 2,55 < 2,60", color=VERT_OK, font_size=44)))
        self.attendre_voix()

    # ── 09 : défi et correction (3,5 et 3,45) ──────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("09-defi")
        self.titre_ecran("Défi", font_size=48)

        l1 = Text("45 > 5", font_size=56).move_to([-0.5, 1.6, 0])
        self.play(FadeIn(l1, shift=DOWN * 0.2))
        self.au_mot("Pourtant")
        l2 = Text("pourtant  3,5 > 3,45", font_size=56, color=BLEU_CALCUL).move_to([-0.5, 0.3, 0])
        self.play(GrowFromCenter(l2))
        self.au_mot("Pourquoi")
        l3 = Text("Pourquoi ?", font_size=50, color=JAUNE_TITRE).move_to([-0.5, -1.0, 0])
        self.play(Write(l3))
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause et cherche !", color=ORANGE_RETENUE, font_size=38)))
        self.attendre_voix(marge=3.5)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("09b-correction")
        self.titre_ecran("Correction")
        self.comparer_tableau(
            "3,5 ", "3,45",
            "Les parties entières", "On compare les dixièmes", "Donc 3 virgule 5",
            "3,5 > 3,45", "Avec l'astuce du zéro", "50 centièmes battent", "50 > 45",
        )
        self.attendre_voix()

    # ── déroulé ─────────────────────────────────────────────────────────────

    def construct(self):
        self.page_de_garde(
            titre="Tout comprendre sur les nombres décimaux",
            accroche="12 cm et un petit bout : comment l'écrire ?",
            promesse="On coupe en 10, puis encore en 10.",
        )
        self.page_objectifs(OBJECTIFS)
        self.ecran_origine()
        self.ecran_euro()
        self.ecran_tableau()
        self.ecran_fraction()
        self.ecran_rang()
        self.ecran_comparer()
        self.ecran_arrondir()
        self.ecran_encadrer()
        self.ecran_defi()
        self.ecran_correction()
        self.page_finale(
            points=[
                "D'où viennent les décimaux : couper en 10",
                "Lire le rang de chaque chiffre",
                "Comparer deux nombres décimaux",
                "Arrondir : 5 ou plus, on monte",
            ],
            rappel="Pour comparer : le même nombre de chiffres après la virgule.",
        )
        self.page_abonnement()
