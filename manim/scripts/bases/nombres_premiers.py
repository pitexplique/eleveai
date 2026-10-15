# nombres_premiers.py
# EleveAI — « Les bases » — Pourquoi 13 ne se range pas (les nombres premiers avec des billes).
#
# ⭐ 07/10/2026 — l'idée est de Frédéric : « une vidéo sur les nombres premiers et
# les divisions en montrant qu'on ne peut pas, avec un nombre premier, faire des
# groupes de billes » ; « ça concerne de la terminale au CP ». Voix validée
# (« go ») : manim/voix/bases-nombres-premiers.json (−7). Crible gardé.
# ⭐ Suite de « Une multiplication, deux divisions » (youtu.be/3ISJ48NHGd8) :
# mêmes billes, et le 13 : 4 qui ne tombait pas juste s'y explique enfin.
# ⛔ « Un nombre premier ne se range qu'en UNE SEULE RANGÉE » — jamais « ne se
# range pas en rectangle » : une rangée de 7, c'est un rectangle 1 × 7.
# ⛔ La division s'écrit « : ». ⛔ AUCUNE ÉTIQUETTE DE NIVEAU.
#
# Voix :
#   powershell -File scripts/generer-voix.ps1 -Fichier manim/voix/bases-nombres-premiers.json -Debit -7
# Rendu :
#   python -m manim render -qh --disable_caching manim/scripts/bases/nombres_premiers.py NombresPremiers -o eleveai-maths-bases-nombres-premiers --media_dir manim/scripts/bases/media

import math
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parent))

from manim import *

from charte import *
from gabarit_sixieme import Notion6e
from multiplication_division import UneMultiplicationDeuxDivisions as Billes

OBJECTIFS = [
    "ranger des billes en rectangles",
    "reconnaître un nombre premier",
    "trouver les nombres premiers jusqu'à 30",
]
PREMIERS_30 = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]


class _Billes:
    """Les billes de la série, et les essais de rangement."""

    t = Billes.t
    jetons = Billes.jetons
    colonnes = Billes.colonnes
    cadre = Billes.cadre

    def bille(self, rayon=0.2, couleur=BLEU_CALCUL):
        return Circle(radius=rayon, stroke_color=WHITE, stroke_width=2).set_fill(couleur, opacity=0.9)

    def essai(self, n, rangees, pas=0.5, rayon=0.18):
        """n billes rangées en `rangees` rangées égales. Ce qui dépasse est en
        ROUGE à droite de la dernière rangée ; s'il n'y a pas de quoi faire des
        rangées de 2, on complète avec des ronds en pointillés (ce qui MANQUE).
        Renvoie (groupe, trop, manque)."""
        par_rangee = n // rangees
        trop, manque = n - par_rangee * rangees, 0
        if par_rangee < 2:
            par_rangee = math.ceil(n / rangees)
            trop, manque = 0, par_rangee * rangees - n
        g = VGroup()
        for i in range(par_rangee * rangees):
            r, c = divmod(i, par_rangee)
            if i < par_rangee * rangees - manque:
                b = self.bille(rayon)
            else:
                b = DashedVMobject(Circle(radius=rayon, color=GREY_B, stroke_width=2), num_dashes=10)
            g.add(b.move_to([c * pas, -r * pas, 0]))
        for k in range(trop):
            g.add(self.bille(rayon, ROUGE_ERREUR).move_to([(par_rangee + 0.4 + k) * pas, -(rangees - 1) * pas, 0]))
        return g, trop, manque

    def rangee(self, n, pas=0.45, rayon=0.16, couleur=BLEU_CALCUL):
        return VGroup(*[self.bille(rayon, couleur).move_to([i * pas, 0, 0]) for i in range(n)])


class NombresPremiers(_Billes, Notion6e):

    identite = "Les bases · EleveAI"
    nom_voix = "bases-nombres-premiers"

    # ── 01 · les rectangles de 12 ───────────────────────────────────────────
    def ecran_rectangles(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-rectangles-12")
        self.titre_ecran("12 billes en rectangle")
        r1 = self.jetons(1, 12, pas=0.48, rayon=0.17).move_to([-0.6, 2.05, 0])
        r2 = self.jetons(2, 6, pas=0.48, rayon=0.17).move_to([-3.6, 0.0, 0])
        r3 = self.jetons(3, 4, pas=0.48, rayon=0.17).move_to([2.2, -0.2, 0])
        l1 = self.t("1 × 12", 34).next_to(r1, DOWN, buff=0.3)
        l2 = self.t("2 × 6", 34).next_to(r2, DOWN, buff=0.45)
        l3 = self.t("3 × 4", 34).next_to(r3, DOWN, buff=0.35)
        for extrait, r, txt in [("1 rangée de 12", r1, "1 rangée de 12"), ("2 rangées de 6", r2, "2 rangées de 6"),
                                ("3 rangées de 4", r3, "3 rangées de 4")]:
            self.au_mot(extrait)
            self.play(LaggedStart(*[GrowFromCenter(b) for ligne in r for b in ligne], lag_ratio=0.03), run_time=0.9)
        for extrait, l in [("1 fois 12", l1), ("2 fois 6", l2), ("3 fois 4", l3)]:
            self.au_mot(extrait)
            self.play(Write(l), run_time=0.6)
        self.au_mot("Toutes égales")
        self.play(Write(self.chute("Trois rectangles, toujours 12 billes.", color=VERT_OK)))
        self.attendre_voix()

    # ── 02 · les diviseurs de 12 ────────────────────────────────────────────
    def ecran_diviseurs(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-diviseurs")
        self.titre_ecran("Les diviseurs de 12")
        r2 = self.jetons(2, 6, pas=0.48, rayon=0.17).move_to([-3.6, 1.6, 0])
        r3 = self.jetons(3, 4, pas=0.48, rayon=0.17).move_to([-3.6, -0.3, 0])
        self.add(r2, r3)
        self.au_mot("12 divisé par 2")
        self.play(*[Create(self.cadre(l, VERT_OK, buff=0.07)) for l in r2])
        self.play(Write(self.t("12 : 2 = 6", 48, VERT_OK).move_to([1.4, 1.6, 0])))
        self.au_mot("12 divisé par 3")
        self.play(*[Create(self.cadre(l, ORANGE_RETENUE, buff=0.07)) for l in r3])
        self.play(Write(self.t("12 : 3 = 4", 48, ORANGE_RETENUE).move_to([1.4, -0.3, 0])))
        self.au_mot("Les nombres 1, 2")
        divs = VGroup(*[self.t(str(d), 44, BLEU_CALCUL) for d in (1, 2, 3, 4, 6, 12)]).arrange(RIGHT, buff=0.55)
        divs.move_to([-0.6, -2.0, 0])
        cadres = VGroup(*[SurroundingRectangle(d, color=BLEU_CALCUL, buff=0.15, corner_radius=0.1) for d in divs])
        self.play(LaggedStart(*[FadeIn(VGroup(d, c), scale=1.2) for d, c in zip(divs, cadres)], lag_ratio=0.15))
        self.au_mot("sans reste")
        self.play(FadeIn(self.t("les diviseurs de 12", 28, BLEU_CALCUL).next_to(divs, UP, buff=0.35)))
        self.attendre_voix()

    # ── 03 · 7 billes ───────────────────────────────────────────────────────
    def ecran_sept(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-sept")
        self.titre_ecran("Et avec 7 billes ?")
        for extrait, rangees, x, legende, coul in [
            ("En 2 rangées", 2, -4.6, "il en reste 1", ROUGE_ERREUR),
            ("En 3 rangées", 3, -1.2, "il en reste 1", ROUGE_ERREUR),
            ("Avec 4, 5 ou 6", 4, 2.3, "il en manque", GREY_B),
        ]:
            self.au_mot(extrait)
            g, _, _ = self.essai(7, rangees)
            g.move_to([x, 1.1, 0])
            titre = self.t(f"{rangees} rangées", 28, WHITE).move_to([x, 2.55, 0])
            leg = self.t(legende, 26, coul).next_to(g, DOWN, buff=0.3)
            self.play(FadeIn(titre), LaggedStart(*[GrowFromCenter(b) for b in g], lag_ratio=0.06), run_time=1.0)
            self.play(FadeIn(leg))
        self.au_mot("une seule rangée de 7")
        r = self.rangee(7, pas=0.55, rayon=0.2).move_to([-0.8, -1.55, 0])
        self.play(LaggedStart(*[GrowFromCenter(b) for b in r], lag_ratio=0.06))
        self.play(Create(self.cadre(r, VERT_OK, buff=0.1)))
        self.au_mot("7 n'a que deux")
        self.play(Write(self.chute("Deux diviseurs seulement, 1 et 7.", color=VERT_OK)))
        self.attendre_voix()

    # ── 04 · la définition ──────────────────────────────────────────────────
    def ecran_definition(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-definition")
        self.au_mot("s'appelle un nombre premier")
        titre = self.t("7 est un nombre premier", 48, JAUNE_TITRE).to_edge(UP)
        self.play(Write(titre))
        self.au_mot("exactement deux diviseurs")
        d = VGroup(self.t("Un nombre premier a exactement", 34),
                   self.t("2 diviseurs, 1 et lui-même.", 34, VERT_OK)).arrange(DOWN, buff=0.2)
        d.move_to([-0.6, 1.7, 0])
        cadre = SurroundingRectangle(d, color=VERT_OK, buff=0.25, corner_radius=0.15)
        self.play(FadeIn(d), Create(cadre))
        self.au_mot("impossible de faire")
        r = self.rangee(7, pas=0.62, rayon=0.22).move_to([-0.8, -0.2, 0])
        self.play(LaggedStart(*[GrowFromCenter(b) for b in r], lag_ratio=0.05))
        self.au_mot("sauf un seul groupe")
        un = self.cadre(r, VERT_OK, buff=0.1)
        self.play(Create(un))
        l1 = self.t("1 groupe de 7", 28, VERT_OK).next_to(r, UP, buff=0.35)
        self.play(FadeIn(l1))
        self.au_mot("des groupes d'une seule bille")
        petits = VGroup(*[self.cadre(b, ORANGE_RETENUE, buff=0.06) for b in r])
        self.play(LaggedStart(*[Create(c) for c in petits], lag_ratio=0.08))
        self.play(FadeIn(self.t("7 groupes de 1", 28, ORANGE_RETENUE).next_to(r, DOWN, buff=0.4)))
        self.attendre_voix()

    # ── 05 · 1 et 2 ─────────────────────────────────────────────────────────
    def ecran_un_deux(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-un-et-deux")
        self.titre_ecran("Et 1 ? Et 2 ?")
        sep = Line([-0.6, 2.6, 0], [-0.6, -2.9, 0], color=GREY_B, stroke_width=2)
        self.add(sep)
        self.au_mot("Et 1 ?")
        b1 = self.bille(0.3).move_to([-4.0, 1.4, 0])
        self.play(GrowFromCenter(b1), FadeIn(self.t("1", 56).next_to(b1, LEFT, buff=0.5)))
        self.play(FadeIn(self.t("1 seul diviseur", 30).move_to([-4.0, 0.4, 0])))
        self.au_mot("1 n'est pas premier")
        self.play(Write(self.t("pas premier", 36, ROUGE_ERREUR).move_to([-4.0, -0.5, 0])))
        self.au_mot("Et 2 ?")
        b2 = VGroup(self.bille(0.3), self.bille(0.3)).arrange(RIGHT, buff=0.25).move_to([2.6, 1.4, 0])
        self.play(GrowFromCenter(b2), FadeIn(self.t("2", 56).next_to(b2, LEFT, buff=0.5)))
        self.play(FadeIn(self.t("2 diviseurs, 1 et 2", 30).move_to([2.6, 0.4, 0])))
        self.au_mot("2 est premier")
        p2 = self.t("premier", 36, VERT_OK).move_to([2.6, -0.5, 0])
        self.play(Write(p2))
        self.au_mot("le seul nombre premier pair")
        self.play(FadeIn(self.t("le seul premier pair", 28, JAUNE_TITRE).next_to(p2, DOWN, buff=0.3)))
        self.au_mot("Tous les autres nombres pairs")
        for n, x in [(6, 1.0), (8, 3.4)]:
            g = self.jetons(2, n // 2, pas=0.36, rayon=0.13).move_to([x, -1.8, 0])
            self.play(FadeIn(g), FadeIn(self.t(f"{n} = 2 × {n // 2}", 24).next_to(g, DOWN, buff=0.2)), run_time=0.6)
        self.attendre_voix()

    # ── 06 · le crible d'Ératosthène ────────────────────────────────────────
    def ecran_crible(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-crible")
        self.titre_ecran("Le crible d'Ératosthène")
        cases = {}
        g = VGroup()
        for n in range(1, 31):
            l, c = (n - 1) // 10, (n - 1) % 10
            carre = Square(side_length=0.78, stroke_width=1.5, stroke_color=GREY_B)
            carre.move_to([-4.5 + c * 0.86, 1.75 - l * 0.86, 0])
            txt = self.t(str(n), 28).move_to(carre)
            cases[n] = VGroup(carre, txt)
            g.add(cases[n])
        self.play(FadeIn(g))
        self.au_mot("le crible")
        self.play(FadeIn(self.t("il y a plus de 2 000 ans", 24, BLEU_CALCUL).move_to([-0.6, -1.05, 0])))

        def barrer(nombres):
            return [cases[n][1].animate.set_opacity(0.25) for n in nombres] + \
                   [cases[n][0].animate.set_fill(GREY_E, opacity=1) for n in nombres]

        def garder(n, coul):
            return Circle(radius=0.36, color=coul, stroke_width=4).move_to(cases[n])

        self.au_mot("On barre 1")
        self.play(*barrer([1]))
        for p, coul, extrait in [(2, VERT_OK, "On garde 2"), (3, ORANGE_RETENUE, "On garde 3"), (5, VIOLET_ACCENT, "On garde 5")]:
            self.au_mot(extrait)
            self.play(Create(garder(p, coul)))
            multiples = [m for m in range(2 * p, 31, p)]
            self.play(*barrer(multiples), run_time=1.2)
        self.au_mot("Ce qui reste")
        self.play(LaggedStart(*[Create(garder(p, VERT_OK)) for p in PREMIERS_30 if p > 5], lag_ratio=0.15))
        liste = self.t("2   3   5   7   11   13   17   19   23   29", 34, VERT_OK).move_to([-0.6, -1.85, 0])
        self.play(Write(liste))
        self.attendre_voix()

    # ── 07 · 13 ─────────────────────────────────────────────────────────────
    def ecran_treize(self):
        self.clear()
        self.add_mascotte()
        self.dire("07-treize")
        self.titre_ecran("13 : 4, ça ne tombait pas juste")
        self.au_mot("13 divisé par 4")
        g, _, _ = self.essai(13, 4, pas=0.45, rayon=0.16)
        g.move_to([-3.8, 0.9, 0])
        self.play(LaggedStart(*[GrowFromCenter(b) for b in g], lag_ratio=0.04))
        self.play(FadeIn(self.t("4 rangées : il en reste 1", 26, ROUGE_ERREUR).next_to(g, DOWN, buff=0.3)))
        self.au_mot("13 est premier")
        self.play(Write(self.t("13 est premier", 52, VERT_OK).move_to([2.4, 1.1, 0])))
        self.au_mot("13 billes ne se rangent")
        r = self.rangee(13, pas=0.45, rayon=0.16).move_to([-0.8, -1.4, 0])
        self.play(LaggedStart(*[GrowFromCenter(b) for b in r], lag_ratio=0.04))
        self.play(Create(self.cadre(r, VERT_OK, buff=0.1)))
        self.au_mot("Toutes les autres divisions")
        self.play(Write(self.chute("Toutes les autres divisions de 13 laissent un reste.", color=BLEU_CALCUL)))
        self.attendre_voix()

    # ── 08 · le piège : impair ≠ premier ────────────────────────────────────
    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("08-piege")
        self.titre_ecran("Le piège")
        self.au_mot("un nombre impair")
        self.play(Write(self.t("impair ne veut pas dire premier", 38, ORANGE_RETENUE).move_to([-0.6, 2.4, 0])))
        self.au_mot("9 est impair")
        g9 = self.jetons(3, 3, pas=0.55, rayon=0.2).move_to([-3.6, 0.5, 0])
        self.play(FadeIn(g9))
        self.play(*[Create(self.cadre(l, ORANGE_RETENUE, buff=0.07)) for l in g9])
        self.au_mot("9 égale 3 fois 3")
        e9 = self.t("9 = 3 × 3", 44).next_to(g9, DOWN, buff=0.4)
        self.play(Write(e9))
        self.au_mot("9 n'est pas premier")
        self.play(FadeIn(self.t("pas premier", 32, ROUGE_ERREUR).next_to(e9, DOWN, buff=0.25)))
        self.au_mot("Pareil pour 15")
        g15 = self.jetons(3, 5, pas=0.55, rayon=0.2).move_to([2.0, 0.5, 0])
        self.play(FadeIn(g15))
        self.play(*[Create(self.cadre(l, ORANGE_RETENUE, buff=0.07)) for l in g15])
        e15 = self.t("15 = 3 × 5", 44).next_to(g15, DOWN, buff=0.4)
        self.play(Write(e15))
        self.play(FadeIn(self.t("pas premier", 32, ROUGE_ERREUR).next_to(e15, DOWN, buff=0.25)))
        self.attendre_voix()

    # ── 09 · le récapitulatif ───────────────────────────────────────────────
    def ecran_recap(self):
        self.clear()
        self.add_mascotte()
        self.dire("09-recap")
        self.titre_ecran("Le récapitulatif")
        self.au_mot("Les diviseurs d'un nombre")
        g = self.jetons(3, 4, pas=0.4, rayon=0.14).move_to([-4.6, 1.6, 0])
        l1 = self.t("Les diviseurs se lisent dans les rectangles.", 28).move_to([1.1, 1.6, 0])
        self.play(FadeIn(g), FadeIn(l1))
        self.au_mot("Un nombre premier ne se range")
        r = self.rangee(7, pas=0.32, rayon=0.12).move_to([-4.6, 0.0, 0])
        self.play(FadeIn(r), Create(self.cadre(r, VERT_OK, buff=0.08)))
        l2 = VGroup(self.t("Un nombre premier, une seule rangée", 30, VERT_OK),
                    self.t("2 diviseurs, 1 et lui-même", 30, VERT_OK)).arrange(DOWN, buff=0.15).move_to([1.1, 0.0, 0])
        self.play(FadeIn(l2))
        self.au_mot("1 n'est pas premier")
        l3 = VGroup(self.t("1 n'est pas premier.", 30, ROUGE_ERREUR),
                    self.t("2 est le seul premier pair.", 30, JAUNE_TITRE)).arrange(DOWN, buff=0.15).move_to([0.2, -1.6, 0])
        self.play(FadeIn(l3))
        self.attendre_voix()

    # ── 10-11 · défi et correction ──────────────────────────────────────────
    def ecran_defi(self):
        self.clear()
        self.add_mascotte()
        self.dire("10-defi")
        self.titre_ecran("À toi !")
        self.au_mot("Parmi 21")
        self.play(Write(self.t("21     23     25", 80).move_to([-0.6, 1.0, 0])))
        self.play(FadeIn(self.t("Lequel est premier ?", 44, BLEU_CALCUL).move_to([-0.6, -0.5, 0])))
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=34)))
        self.attendre_voix(marge=2.5)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("11-correction")
        self.titre_ecran("Correction")
        self.au_mot("21 billes")
        g21 = self.jetons(3, 7, pas=0.3, rayon=0.11).move_to([-3.8, 1.7, 0])
        self.play(FadeIn(g21), *[Create(self.cadre(l, ORANGE_RETENUE, buff=0.05).set_stroke(width=2.5)) for l in g21])
        self.play(Write(self.t("21 = 3 × 7, pas premier", 36, ROUGE_ERREUR).move_to([1.8, 1.7, 0])))
        self.au_mot("25 billes")
        g25 = self.jetons(5, 5, pas=0.26, rayon=0.1).move_to([-3.8, 0.0, 0])
        self.play(FadeIn(g25), *[Create(self.cadre(l, ORANGE_RETENUE, buff=0.04).set_stroke(width=2.5)) for l in g25])
        self.play(Write(self.t("25 = 5 × 5, pas premier", 36, ROUGE_ERREUR).move_to([1.8, 0.0, 0])))
        self.au_mot("23 billes")
        r = self.rangee(23, pas=0.22, rayon=0.085).move_to([-3.2, -1.75, 0])
        self.play(FadeIn(r), Create(self.cadre(r, VERT_OK, buff=0.07)))
        p = self.t("23 est premier", 40, VERT_OK).move_to([2.6, -1.75, 0])
        self.play(Write(p))
        self.play(Create(self.coche().next_to(p, RIGHT, buff=0.3)))
        self.attendre_voix()

    def construct(self):
        self.page_de_garde(
            titre="Pourquoi 13 ne se range pas",
            accroche="12 billes, oui. 13 billes, impossible ?",
            promesse="Ranger des billes pour voir les nombres premiers.",
        )
        self.page_objectifs(OBJECTIFS)
        self.ecran_rectangles()
        self.ecran_diviseurs()
        self.ecran_sept()
        self.ecran_definition()
        self.ecran_un_deux()
        self.ecran_crible()
        self.ecran_treize()
        self.ecran_piege()
        self.ecran_recap()
        self.ecran_defi()
        self.ecran_correction()
        self.page_finale(
            points=OBJECTIFS,
            rappel="Un nombre premier de billes ne se range qu'en une seule rangée.",
            voix="12-finale",
        )
        self.page_abonnement(voix="13-abonne")
