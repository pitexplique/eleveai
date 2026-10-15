# entier_nombre.py
# EleveAI — Maths 6e — Les nombres entiers (notionId : entier_nombre), AVEC VOIX.
# Mêmes exemples que la fiche lib/fiches/maths-6e-entiers.tsx (réécrite le 30/09).
#
# ⭐ 01/10/2026 : la version muette d'août devient une vidéo parlée. Texte de la
# voix validé par Frédéric : manim/voix/6e-entier-nombre.json (débit −10).
#
# Mapping micro-compétences (coach 6e, notion entier_nombre) → écrans :
# - entier_lire_ecrire → 02-ecrire (« mille quarante-deux » → 1 042, le zéro)
# - entier_rang        → 01-tableau (chaque chiffre à son rang) + 02 (dizaines)
# - entier_decomposer  → 01-tableau (4 273 = 4 000 + 200 + 70 + 3)
# - entier_comparer    → 03-comparer (1 042 et 98 ; 345 et 354)
# - entier_encadrer    → 04-encadrer (40 < 47 < 50 ; 300 < 380 < 400)
# - entier_defi        → 05-defi + correction (3, 0, 5, 1 → 1 035)
#
# Rendu : python -m manim render -qh --disable_caching manim/scripts/6e/entier_nombre.py EntierNombre6e -o eleveai-maths-6e-entier-nombre --media_dir manim/scripts/6e/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from manim import *

from charte import *
from gabarit_sixieme import Notion6e

OBJECTIFS = [
    "Lire, écrire et décomposer un nombre entier",
    "Comparer deux nombres entiers",
    "Encadrer un nombre entier",
]
RANGS = ["Milliers", "Centaines", "Dizaines", "Unités"]


class EntierNombre6e(Notion6e):
    nom_voix = "6e-entier-nombre"

    # ── 01 : le tableau de numération (4 273) ──────────────────────────────

    def ecran_tableau(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-tableau")
        self.titre_ecran("Le tableau de numération")

        ent, cases, xs = self.tableau_num(RANGS, y_ent=1.9, y_case=1.0, largeur=2.3, x_centre=-0.6)
        self.play(FadeIn(ent, shift=DOWN * 0.2), Create(cases))

        self.au_mot("On range")
        ch = self.chiffres(xs, 1.0, "4273", font_size=60)
        # en partant des unités : de droite à gauche
        self.play(LaggedStart(*[FadeIn(c, scale=1.5) for c in reversed(ch)], lag_ratio=0.4))

        valeurs = VGroup()
        for k, (mot, v) in enumerate(zip(["Le 4 est", "Le 2 est", "Le 7 vaut", "Le 3 vaut"],
                                         ["4 000", "200", "70", "3"])):
            self.au_mot(mot)
            t = Text(v, font_size=36, color=VERT_OK).move_to([xs[k], -0.3, 0])
            valeurs.add(t)
            self.play(Indicate(ch[k], color=BLEU_CALCUL, scale_factor=1.4),
                      FadeIn(t, shift=DOWN * 0.25))

        self.au_mot("Donc 4 273")
        self.play(Write(self.chute("4 273 = 4 000 + 200 + 70 + 3", color=VERT_OK, font_size=38)))
        self.au_mot("Le 2 vaut 200")
        self.play(Circumscribe(VGroup(ch[1], valeurs[1]), color=ORANGE_RETENUE, buff=0.2))
        self.play(valeurs[1].animate.scale(1.3).set_color(ORANGE_RETENUE))
        self.attendre_voix()

    # ── 02 : lire et écrire (« mille quarante-deux » → 1 042) ──────────────

    def ecran_ecrire(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-ecrire")
        self.titre_ecran("Lire et écrire")

        mots = Text("« mille quarante-deux »", font_size=42, color=BLEU_CALCUL).move_to([-0.6, 2.2, 0])
        self.play(GrowFromCenter(mots))

        ent, cases, xs = self.tableau_num(RANGS, y_ent=1.15, y_case=0.25, largeur=2.3, x_centre=-0.6)
        self.play(FadeIn(ent), Create(cases))

        self.au_mot("Mille : un 1")
        un = Text("1", font_size=60).move_to([xs[0], 0.25, 0])
        self.play(FadeIn(un, scale=1.5))
        self.au_mot("Quarante-deux :")
        quatre = Text("4", font_size=60).move_to([xs[2], 0.25, 0])
        deux = Text("2", font_size=60).move_to([xs[3], 0.25, 0])
        self.play(FadeIn(quatre, scale=1.5), FadeIn(deux, scale=1.5))

        self.au_mot("Et les centaines")
        self.play(cases[1].animate.set_stroke(ORANGE_RETENUE, width=6))
        self.play(Indicate(cases[1], color=ORANGE_RETENUE))
        self.au_mot("Alors on écrit un zéro")
        zero = Text("0", font_size=60, color=ORANGE_RETENUE).move_to([xs[1], 0.25, 0])
        self.play(GrowFromCenter(zero))
        self.play(Flash(zero, color=ORANGE_RETENUE, line_length=0.3))

        self.au_mot("Sans lui")
        faux = Text("Sans le zéro : 142", font_size=36, color=ROUGE_ERREUR).move_to([-0.6, -1.25, 0])
        barre = Line(faux.get_left(), faux.get_right(), color=ROUGE_ERREUR, stroke_width=5)
        self.play(FadeIn(faux, shift=UP * 0.2))
        self.au_mot("Ce n'est pas du tout")
        self.play(Create(barre))

        self.au_mot("Mille quarante-deux s'écrit")
        self.play(FadeOut(faux), FadeOut(barre))
        self.play(Write(self.chute("mille quarante-deux = 1 042", color=VERT_OK, font_size=38)))
        self.au_mot("Et son chiffre des dizaines")
        boite = SurroundingRectangle(quatre, color=VERT_OK, buff=0.15)
        diz = Text("chiffre des dizaines : 4", font_size=30, color=VERT_OK).move_to([-0.6, -1.25, 0])
        self.play(Create(boite), FadeIn(diz))
        self.attendre_voix()

    # ── 03 : comparer (1 042 et 98 ; 345 et 354) ───────────────────────────

    def ecran_comparer(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-comparer")
        self.titre_ecran("Comparer deux nombres")

        a = Text("1 042", font_size=64).move_to([-2.2, 1.3, 0])
        b = Text("98", font_size=64).move_to([0, 0.0, 0]).align_to(a, RIGHT)
        self.play(FadeIn(a, shift=RIGHT * 0.3), FadeIn(b, shift=RIGHT * 0.3))

        self.au_mot("1 042 a quatre")
        la = Text("4 chiffres", font_size=32, color=BLEU_CALCUL).next_to(a, RIGHT, buff=1.0)
        self.play(Indicate(a, color=BLEU_CALCUL), FadeIn(la))
        self.au_mot("98 n'en a")
        lb = Text("2 chiffres", font_size=32, color=BLEU_CALCUL).next_to(b, RIGHT, buff=1.0).align_to(la, LEFT)
        self.play(Indicate(b, color=BLEU_CALCUL), FadeIn(lb))
        self.au_mot("Le plus long gagne")
        c1 = self.chute("1 042 > 98", color=VERT_OK, font_size=44)
        self.play(a.animate.set_color(VERT_OK), Write(c1))

        self.au_mot("Et si les deux")
        self.play(FadeOut(VGroup(a, b, la, lb, c1)))

        xs = [-3.0, -2.2, -1.4]
        n1 = self.chiffres(xs, 1.3, "345", font_size=68)
        n2 = self.chiffres(xs, 0.0, "354", font_size=68)
        self.play(FadeIn(n1, shift=DOWN * 0.2), FadeIn(n2, shift=UP * 0.2))

        self.au_mot("Les centaines")
        boite = SurroundingRectangle(VGroup(n1[0], n2[0]), color=BLEU_CALCUL, buff=0.15)
        eg = Text("3 = 3 : on continue", font_size=34, color=BLEU_CALCUL).move_to([2.3, 0.65, 0])
        self.play(Create(boite), FadeIn(eg))
        self.au_mot("Les dizaines")
        boite2 = SurroundingRectangle(VGroup(n1[1], n2[1]), color=ORANGE_RETENUE, buff=0.15)
        sup = Text("5 > 4", font_size=48, color=ORANGE_RETENUE).move_to([2.3, 0.65, 0])
        self.play(Transform(boite, boite2), FadeOut(eg), GrowFromCenter(sup))
        self.au_mot("C'est fini")
        self.play(n2.animate.set_color(VERT_OK), Write(self.chute("354 > 345", color=VERT_OK, font_size=44)))
        self.attendre_voix()

    # ── 04 : encadrer (40 < 47 < 50 ; 300 < 380 < 400) ─────────────────────

    def ecran_encadrer(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-encadrer")
        self.titre_ecran("Encadrer un nombre")

        dr, pt = self.droite(40, 50, 10, {40: "40", 50: "50"}, centre=(-0.4, 0.9), font_size=34)
        self.play(Create(dr[0]), Create(dr[1]), FadeIn(dr[2]))

        self.au_mot("Regarde 47")
        p = self.point(pt, 47, "47", font_size=40)
        self.play(FadeIn(p, scale=0.5))
        self.au_mot("Il est après 40")
        self.play(Indicate(dr[2][0], color=BLEU_CALCUL, scale_factor=1.5))
        self.au_mot("et avant 50")
        self.play(Indicate(dr[2][1], color=BLEU_CALCUL, scale_factor=1.5))
        self.au_mot("On écrit")
        enc = Text("40 < 47 < 50", font_size=52, color=VERT_OK).move_to([-0.4, -0.9, 0])
        self.play(Write(enc))
        self.play(Circumscribe(enc, color=VERT_OK))

        self.au_mot("Et 380")
        dr2, pt2 = self.droite(300, 400, 10, {300: "300", 400: "400"}, centre=(-0.4, 0.9), font_size=34)
        p2 = self.point(pt2, 380, "380", font_size=40)
        enc2 = Text("300 < 380 < 400", font_size=52, color=VERT_OK).move_to([-0.4, -0.9, 0])
        self.play(FadeOut(p), FadeOut(enc), ReplacementTransform(dr, dr2))
        self.play(FadeIn(p2, scale=0.5))
        self.au_mot("deux centaines")
        self.play(Write(enc2))
        self.attendre_voix()

    # ── 05 : défi et correction (3, 0, 5, 1 → 1 035) ───────────────────────

    def cases_defi(self, y=-0.4):
        xs = [-2.4, -1.2, 0.0, 1.2]
        cases = VGroup(*[Square(side_length=1.0, color=WHITE, stroke_width=3).move_to([x, y, 0]) for x in xs])
        return cases, xs

    def cartes(self, y=1.4):
        cartes = VGroup()
        for x, c in zip([-2.4, -1.2, 0.0, 1.2], "3051"):
            fond = RoundedRectangle(width=0.9, height=1.0, corner_radius=0.12, color=BLEU_CALCUL,
                                    fill_opacity=0.25, stroke_width=3)
            cartes.add(VGroup(fond, Text(c, font_size=52)).move_to([x, y, 0]))
        return cartes

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("05-defi")
        self.titre_ecran("Défi", font_size=48)

        cartes = self.cartes()
        self.play(LaggedStart(*[FadeIn(c, shift=DOWN * 0.3) for c in cartes], lag_ratio=0.25))
        self.au_mot("écris le plus petit")
        cases, _ = self.cases_defi()
        q = Text("le plus PETIT nombre de 4 chiffres ?", font_size=36, color=BLEU_CALCUL).move_to([-0.6, -1.65, 0])
        self.play(Create(cases), Write(q))
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause et cherche !", color=ORANGE_RETENUE, font_size=38)))
        self.attendre_voix(marge=3.5)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("05b-correction")
        self.titre_ecran("Correction")

        cartes = self.cartes()
        cases, xs = self.cases_defi()
        self.add(cartes, cases)
        # cartes : 0 → « 3 », 1 → « 0 », 2 → « 5 », 3 → « 1 »

        self.au_mot("Le plus petit, c'est 0")
        self.play(Indicate(cartes[1], color=ORANGE_RETENUE, scale_factor=1.3))
        self.au_mot("Mais attention")
        interdit = Text("Un nombre ne commence pas par 0", font_size=32, color=ROUGE_ERREUR).move_to([-0.6, -1.65, 0])
        self.play(cartes[1].animate.move_to(cases[0]), FadeIn(interdit))
        croix = Cross(cases[0], stroke_color=ROUGE_ERREUR, stroke_width=6)
        self.play(Create(croix))

        self.au_mot("On commence donc par 1")
        self.play(FadeOut(croix), cartes[1].animate.move_to([-1.2, 1.4, 0]))
        self.play(cartes[3].animate.move_to(cases[0]), FadeOut(interdit))
        self.au_mot("Puis 0")
        self.play(cartes[1].animate.move_to(cases[1]))
        self.au_mot("puis 3")
        self.play(cartes[0].animate.move_to(cases[2]))
        self.au_mot("puis 5")
        self.play(cartes[2].animate.move_to(cases[3]))
        self.au_mot("La réponse")
        self.play(*[c[0].animate.set_color(VERT_OK) for c in cartes],
                  Write(self.chute("Réponse : 1 035", color=VERT_OK, font_size=44)))
        self.attendre_voix()

    # ── déroulé ─────────────────────────────────────────────────────────────

    def construct(self):
        self.page_de_garde(
            titre="Les nombres entiers",
            accroche="Dans 4 273, que vaut le 2 ?",
            promesse="Ce qui compte, c'est la place.",
        )
        self.page_objectifs(OBJECTIFS)
        self.ecran_tableau()
        self.ecran_ecrire()
        self.ecran_comparer()
        self.ecran_encadrer()
        self.ecran_defi()
        self.ecran_correction()
        self.page_finale(points=OBJECTIFS, rappel="Le zéro ne vaut rien, mais il garde la place.")
        self.page_abonnement()
