# multiplication_division_shorts.py
# EleveAI — « Les bases » — les shorts de « Une multiplication, deux divisions ».
#
# ⭐ 07/10/2026 — Frédéric : « créer le short » (le 1, les billes). La paysage
# est en ligne : https://youtu.be/3ISJ48NHGd8 — le short y renvoie (« vidéos
# similaires ») ; son écran de fin pointe le coach, comme toute la série.
#   1. ShortBilles — 12 billes, 3 × 4 = 12, puis 12 : 4 = 3 et 12 : 3 = 4
# ⭐ Les billes de la paysage (Frédéric : « j'adore les schémas avec les billes »).
# ⛔ Zone sûre : rien de vital au-dessus de y = +3,0 ni sous y = −2,2.
#
# Voix (débit −7) :
#   powershell -File scripts/generer-voix.ps1 -Fichier manim/voix/bases-multiplication-division-short-billes.json -Debit -7
# Rendu :
#   python -m manim render -qh --disable_caching -r 1080,1920 manim/scripts/bases/multiplication_division_shorts.py ShortBilles -o eleveai-maths-bases-multiplication-division-short-billes --media_dir manim/scripts/bases/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parent))

from manim import *

from charte import *
from gabarit_bases import ShortBases
from gabarit_sixieme import _Voix6e
from multiplication_division import UneMultiplicationDeuxDivisions as Paysage


class _ShortMultiplication(_Voix6e, ShortBases):

    # les dessins de la paysage, empruntés tels quels
    t = Paysage.t
    jetons = Paysage.jetons
    colonnes = Paysage.colonnes
    cadre = Paysage.cadre

    def ecran(self, voix):
        self.clear()
        self.margo_bas()
        self.dire(voix)

    def billes(self, y=0.6):
        return self.jetons(3, 4, pas=0.85, rayon=0.28).move_to([0, y, 0])

    def fin(self, voix="05-fin"):
        """Le renvoi de la série (coach + abonnement), précédé de la question."""
        self.ecran(voix)
        q = VGroup(self.grand("Ta réponse", font_size=40, color=ORANGE_RETENUE),
                   self.grand("en commentaire", font_size=40, color=ORANGE_RETENUE)).arrange(DOWN, buff=0.15)
        q.move_to([0, 2.45, 0])
        self.play(FadeIn(q, shift=DOWN * 0.15))
        self.au_mot("Entraîne-toi")
        e = self.grand("Entraîne-toi sur", font_size=36, color=JAUNE_TITRE).move_to([0, 1.2, 0])
        site = self.grand("eleveai.fr", font_size=52, color=BLEU_CALCUL).move_to([0, 0.35, 0])
        cadre = SurroundingRectangle(site, color=BLEU_CALCUL, buff=0.22, stroke_width=3)
        self.play(FadeIn(e), GrowFromCenter(site), Create(cadre))
        self.au_mot("abonne-toi")
        ab = self.grand("Abonne-toi !", font_size=40, color=VERT_OK).move_to([0, -0.85, 0])
        poignee = self.grand("@eleveai974", font_size=44, color=VERT_OK).move_to([0, -1.65, 0])
        self.play(FadeIn(ab, shift=UP * 0.12), GrowFromCenter(poignee))
        self.play(Flash(poignee, color=VERT_OK, line_length=0.3))
        self.attendre_voix(marge=1.2)


# ══════════════════════════════════════════════════════════════════════════════
# 1 · Les billes : 3 × 4 = 12, donc deux divisions offertes
# ══════════════════════════════════════════════════════════════════════════════

class ShortBilles(_ShortMultiplication):

    nom_voix = "bases-multiplication-division-short-billes"

    def construct(self):
        # 00 — ⭐ l'image de la première seconde : la multiplication et ses billes
        self.ecran("00-accroche")
        f = self.grand("3 × 4 = 12", font_size=72).move_to([0, 2.4, 0])
        g = self.billes(0.6)
        self.add(f, g)
        self.au_mot("deux divisions")
        d = VGroup(self.grand("… alors tu connais", font_size=40, color=JAUNE_TITRE),
                   self.grand("2 divisions !", font_size=40, color=JAUNE_TITRE)).arrange(DOWN, buff=0.15)
        d.move_to([0, -1.3, 0])
        self.play(GrowFromCenter(d))
        self.attendre_voix(marge=0.3)

        # 01 — 3 rangées de 4
        self.ecran("01-billes")
        g = self.billes(0.6)
        self.add(g)
        self.au_mot("12 billes")
        self.play(Indicate(g, color=BLEU_CALCUL, scale_factor=1.08))
        self.au_mot("en 3 rangées de 4")
        r = self.grand("3 rangées de 4", font_size=40, color=ORANGE_RETENUE).move_to([0, 2.4, 0])
        self.play(FadeIn(r))
        self.au_mot("3 fois 4 égale 12")
        self.play(Write(self.grand("3 × 4 = 12", font_size=72).move_to([0, -1.4, 0])))
        self.attendre_voix(marge=0.3)

        # 02 — les colonnes : 12 : 4 = 3
        self.ecran("02-colonnes")
        g = self.billes(0.6)
        self.add(g)
        self.au_mot("On encadre les colonnes")
        cadres = VGroup(*[self.cadre(c, VERT_OK, buff=0.08) for c in self.colonnes(g)])
        self.play(LaggedStart(*[Create(c) for c in cadres], lag_ratio=0.2))
        self.au_mot("4 groupes de 3")
        self.play(FadeIn(self.grand("4 groupes de 3", font_size=40, color=VERT_OK).move_to([0, 2.4, 0])))
        self.au_mot("12 divisé par 4")
        res = self.grand("12 : 4 = 3", font_size=72, color=VERT_OK).move_to([0, -1.4, 0])
        self.play(Write(res))
        self.play(Circumscribe(res, color=VERT_OK))
        self.attendre_voix(marge=0.3)

        # 03 — les rangées : 12 : 3 = 4
        self.ecran("03-rangees")
        g = self.billes(0.6)
        self.add(g)
        self.au_mot("On encadre les rangées")
        cadres = VGroup(*[self.cadre(r, ORANGE_RETENUE, buff=0.08) for r in list(g)])
        self.play(LaggedStart(*[Create(c) for c in cadres], lag_ratio=0.2))
        self.au_mot("3 groupes de 4")
        self.play(FadeIn(self.grand("3 groupes de 4", font_size=40, color=ORANGE_RETENUE).move_to([0, 2.4, 0])))
        self.au_mot("12 divisé par 3")
        res = self.grand("12 : 3 = 4", font_size=72, color=ORANGE_RETENUE).move_to([0, -1.1, 0])
        self.play(Write(res))
        self.au_mot("On n'a pas bougé")
        self.play(FadeIn(self.grand("Pas une bille n'a bougé.", font_size=30, color=BLEU_CALCUL).move_to([0, -2.0, 0])))
        self.attendre_voix(marge=0.3)

        # 04 — le défi
        self.ecran("04-defi")
        self.play(Write(self.grand("À toi !", font_size=56, color=JAUNE_TITRE).move_to([0, 2.5, 0])))
        self.au_mot("7 fois 8 égale 56")
        self.play(Write(self.grand("7 × 8 = 56", font_size=72).move_to([0, 1.2, 0])))
        self.au_mot("Quelles sont les deux divisions")
        q = VGroup(self.grand("56 : … = …", font_size=56, color=BLEU_CALCUL),
                   self.grand("56 : … = …", font_size=56, color=BLEU_CALCUL)).arrange(DOWN, buff=0.45)
        q.move_to([0, -0.6, 0])
        self.play(LaggedStart(*[FadeIn(l, shift=UP * 0.15) for l in q], lag_ratio=0.4))
        self.attendre_voix(marge=1.5)

        # 05 — la fin
        self.fin("05-fin")


# ══════════════════════════════════════════════════════════════════════════════
# 2 · Le piège : 4 : 12 ne fait pas 3
# ══════════════════════════════════════════════════════════════════════════════

class ShortPiege(_ShortMultiplication):

    nom_voix = "bases-multiplication-division-short-piege"

    def fit(self, mob, largeur=4.1):
        if mob.width > largeur:
            mob.scale_to_fit_width(largeur)
        return mob

    def construct(self):
        # 00 — ⭐ l'image de la première seconde : la vraie, puis la fausse
        self.ecran("00-accroche")
        self.add(self.grand("12 : 4 = 3", font_size=72, color=VERT_OK).move_to([0, 2.3, 0]))
        self.au_mot("Alors 4 divisé par 12")
        self.play(Write(self.grand("4 : 12 = 3 ?", font_size=72, color=ROUGE_ERREUR).move_to([0, 0.8, 0])))
        self.au_mot("C'est le piège")
        self.play(GrowFromCenter(self.grand("PIÈGE !", font_size=80, color=ROUGE_ERREUR).move_to([0, -0.9, 0])))
        self.attendre_voix(marge=0.3)

        # 01 — la multiplication se retourne
        self.ecran("01-fois")
        g = self.billes(0.9)
        self.add(g)
        self.au_mot("3 fois 4 égale 4 fois 3")
        f = self.grand("3 × 4 = 4 × 3", font_size=60).move_to([0, -1.2, 0])
        self.play(Write(f), Rotate(g, angle=-PI / 2), run_time=1.4)
        self.play(Create(self.coche().scale(1.6).next_to(f, DOWN, buff=0.3)))
        self.attendre_voix(marge=0.3)

        # 02 — la division, non : 12 billes en 4 groupes
        self.ecran("02-partage")
        self.play(FadeIn(self.grand("Une division, non.", font_size=44, color=ORANGE_RETENUE).move_to([0, 2.6, 0])))
        self.au_mot("12 divisé par 4")
        titre = self.grand("12 : 4", font_size=64).move_to([0, 1.7, 0])
        self.play(Write(titre))
        g = self.billes(0.0)
        self.au_mot("12 billes partagées")
        self.play(FadeIn(g))
        cadres = VGroup(*[self.cadre(c, VERT_OK, buff=0.08) for c in self.colonnes(g)])
        self.play(LaggedStart(*[Create(c) for c in cadres], lag_ratio=0.2))
        self.au_mot("3 billes dans chaque groupe")
        self.play(Transform(titre, self.grand("12 : 4 = 3", font_size=64, color=VERT_OK).move_to(titre)))
        self.play(FadeIn(self.grand("3 dans chaque groupe", font_size=34, color=VERT_OK).move_to([0, -1.6, 0])))
        self.attendre_voix(marge=0.3)

        # 03 — 4 billes en 12 groupes : même pas une par groupe
        self.ecran("03-retourne")
        self.add(self.grand("4 : 12", font_size=64, color=ROUGE_ERREUR).move_to([0, 2.6, 0]))
        self.au_mot("4 billes")
        billes = VGroup(*[Circle(radius=0.26, stroke_color=WHITE, stroke_width=2).set_fill(BLEU_CALCUL, opacity=0.9)
                          for _ in range(4)]).arrange(RIGHT, buff=0.3).move_to([0, 1.6, 0])
        self.play(LaggedStart(*[GrowFromCenter(b) for b in billes], lag_ratio=0.15))
        self.au_mot("en 12 groupes")
        cases = VGroup(*[RoundedRectangle(width=0.8, height=0.8, corner_radius=0.12,
                                          stroke_color=WHITE, stroke_width=2) for _ in range(12)])
        cases.arrange_in_grid(rows=3, cols=4, buff=0.15).move_to([0, -0.1, 0])
        self.play(LaggedStart(*[Create(c) for c in cases], lag_ratio=0.05))
        self.play(*[b.animate.move_to(cases[i]) for i, b in enumerate(billes)], run_time=1.0)
        self.au_mot("même pas une bille par groupe")
        self.play(*[cases[i].animate.set_stroke(ROUGE_ERREUR, width=4) for i in range(4, 12)])
        self.play(FadeIn(self.grand("des groupes vides !", font_size=34, color=ROUGE_ERREUR).move_to([0, -1.55, 0])))
        self.au_mot("Ça ne fait pas 3")
        faux = self.grand("4 : 12 = 3", font_size=56, color=ROUGE_ERREUR).move_to([0, -2.25, 0])
        self.play(Write(faux))
        self.play(Create(Cross(faux, stroke_color=WHITE, stroke_width=5, scale_factor=0.85)))
        self.attendre_voix(marge=0.3)

        # 04 — retiens
        self.ecran("04-retiens")
        self.play(FadeIn(self.grand("Retiens", font_size=56, color=JAUNE_TITRE).move_to([0, 2.5, 0])))
        self.au_mot("le grand nombre")
        douze = self.grand("12", font_size=96, color=VERT_OK)
        reste = self.grand(": 4 = 3", font_size=96)
        ligne = self.fit(VGroup(douze, reste).arrange(RIGHT, buff=0.2)).move_to([0, 0.9, 0])
        self.play(Write(ligne))
        self.play(Circumscribe(douze, color=VERT_OK))
        self.au_mot("il passe en premier")
        self.play(FadeIn(VGroup(self.grand("le grand nombre", font_size=36, color=VERT_OK),
                                self.grand("passe en premier", font_size=36, color=VERT_OK))
                         .arrange(DOWN, buff=0.15).move_to([0, -0.8, 0])))
        self.attendre_voix(marge=0.4)

        # 05 — la fin de la série (coach + abonnement)
        self.ecran_renvoi("05-fin")


# ══════════════════════════════════════════════════════════════════════════════
# 3 · 56 : 8 sans poser la division
# ══════════════════════════════════════════════════════════════════════════════

class Short56(_ShortMultiplication):

    nom_voix = "bases-multiplication-division-short-56"

    def construct(self):
        # 00 — ⭐ l'image de la première seconde : la division, en grand
        self.ecran("00-accroche")
        self.add(self.grand("56 : 8 = ?", font_size=84).move_to([0, 1.6, 0]))
        self.au_mot("Sans poser la division")
        self.play(FadeIn(VGroup(self.grand("sans poser", font_size=44, color=ORANGE_RETENUE),
                                self.grand("la division", font_size=44, color=ORANGE_RETENUE))
                         .arrange(DOWN, buff=0.15).move_to([0, -0.2, 0])))
        self.au_mot("Prêt")
        self.play(GrowFromCenter(self.grand("Prêt ?", font_size=56, color=JAUNE_TITRE).move_to([0, -1.6, 0])))
        self.attendre_voix(marge=0.3)

        # 01 — la question
        self.ecran("01-question")
        self.play(FadeIn(self.grand("Diviser, c'est", font_size=40, color=JAUNE_TITRE).move_to([0, 2.5, 0])))
        self.au_mot("8 fois combien font 56")
        self.play(Write(self.grand("8 × ? = 56", font_size=80, color=BLEU_CALCUL).move_to([0, 0.8, 0])))
        self.attendre_voix(marge=0.3)

        # 02 — la table de 8, au rythme de la voix
        self.ecran("02-table")
        self.play(FadeIn(self.grand("La table de 8", font_size=44, color=JAUNE_TITRE).move_to([0, 3.0, 0])), run_time=0.4)
        lignes = VGroup(*[self.grand(f"8 × {k} = {8 * k}", font_size=44) for k in range(1, 8)])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.2).move_to([0, 0.35, 0])
        for l, rep in zip(lignes, ["table de 8", "16", "24", "32", "40", "48", "56. Stop"]):
            self.au_mot(rep)
            self.play(FadeIn(l, shift=RIGHT * 0.15), run_time=0.35)
        self.play(lignes[-1].animate.set_color(VERT_OK))
        self.play(Create(self.cadre(lignes[-1], VERT_OK)))
        self.play(GrowFromCenter(self.grand("Stop !", font_size=48, color=ROUGE_ERREUR).move_to([0, -2.0, 0])))
        self.attendre_voix(marge=0.3)

        # 03 — la réponse
        self.ecran("03-reponse")
        self.play(Write(self.grand("8 × 7 = 56", font_size=72).move_to([0, 1.8, 0])))
        self.au_mot("Donc 56 divisé par 8")
        res = self.grand("56 : 8 = 7", font_size=80, color=VERT_OK).move_to([0, 0.1, 0])
        self.play(Write(res))
        self.play(Circumscribe(res, color=VERT_OK))
        self.attendre_voix(marge=0.3)

        # 04 — en cadeau : un paquet dessiné (pas d'emoji dans un Text)
        self.ecran("04-cadeau")
        boite = Square(side_length=1.2, color=JAUNE_TITRE, stroke_width=4).move_to([0, 2.0, 0])
        ruban = VGroup(Line(boite.get_top(), boite.get_bottom(), color=ORANGE_RETENUE, stroke_width=6),
                       Line(boite.get_left(), boite.get_right(), color=ORANGE_RETENUE, stroke_width=6))
        noeud = VGroup(*[Circle(radius=0.18, color=ORANGE_RETENUE, stroke_width=5)
                         .move_to(boite.get_top() + d * 0.2 + UP * 0.15) for d in (LEFT, RIGHT)])
        self.play(GrowFromCenter(VGroup(boite, ruban, noeud)))
        self.au_mot("en cadeau")
        self.play(FadeIn(self.grand("en cadeau", font_size=44, color=JAUNE_TITRE).move_to([0, 0.75, 0])))
        self.au_mot("56 divisé par 7")
        self.play(Write(self.grand("56 : 7 = 8", font_size=80, color=JAUNE_TITRE).move_to([0, -0.7, 0])))
        self.attendre_voix(marge=0.4)

        # 05 — le défi
        self.ecran("05-defi")
        self.play(Write(self.grand("À toi !", font_size=60, color=JAUNE_TITRE).move_to([0, 2.3, 0])))
        self.au_mot("63 divisé par 9")
        self.play(Write(self.grand("63 : 9 = ?", font_size=84, color=BLEU_CALCUL).move_to([0, 0.6, 0])))
        self.attendre_voix(marge=1.5)

        # 06 — la fin
        self.fin("06-fin")
