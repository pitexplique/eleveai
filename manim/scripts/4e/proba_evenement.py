# proba_evenement.py
# EleveAI — Maths 4e — Probabilités, épisode 3 : les événements
# (certain, impossible, contraire), AVEC VOIX. Paysage ceinture ORANGE.
#
# ⭐ LE DESSIN QUI PORTE TOUT : 10 cartes numérotées de 1 à 10, en rangée.
# Les cartes qui réalisent l'événement s'allument en BLEU, celles du contraire
# en ORANGE. Certain : toutes s'allument ; impossible : la carte 12 n'existe pas.
# Le chapeau est celui de la 3e (proba_issue.py), recopié ici.
#
# Voix : manim/voix/4e-proba-evenement.json (débit −7).
# Short jumeau (ceinture blanche) : proba_evenement_short.py.
# Rendu : python -m manim render -qh --disable_caching manim/scripts/4e/proba_evenement.py ProbaEvenement4e -o eleveai-maths-4e-proba-evenement --media_dir manim/scripts/4e/media
# Puis copier le mp4 dans manim/sorties/4e/maths/probabilites/03-evenement/.

import math
import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "seconde"))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "annonce"))

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Notion6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

COUL_EV = BLEU_CALCUL       # l'événement
COUL_NON = ORANGE_RETENUE   # son contraire
CARTE_FOND = "#F9FAFB"


class Notion4e(Notion6e):
    identite = "Maths 4e — EleveAI"


def P(x, y):
    return np.array([x, y, 0.0])


# ── les dessins communs (paysage et short) ──────────────────────────────────

def carte(n, w=0.82, h=1.15, police=36):
    """Une carte blanche, son numéro en noir au milieu."""
    fond = RoundedRectangle(width=w, height=h, corner_radius=w * 0.14, fill_color=CARTE_FOND,
                            fill_opacity=1, stroke_color=GREY_B, stroke_width=2.5)
    num = Text(str(n), font_size=police, color=BLACK, weight=BOLD).move_to(fond)
    return VGroup(fond, num)


def rangee_cartes(w=0.82, h=1.15, buff=0.2, police=36, n=10):
    return VGroup(*[carte(k, w, h, police) for k in range(1, n + 1)]).arrange(RIGHT, buff=buff)


def dos_carte(w=0.82, h=1.15):
    fond = RoundedRectangle(width=w, height=h, corner_radius=w * 0.14, fill_color="#1D4ED8",
                            fill_opacity=1, stroke_color=WHITE, stroke_width=2.5)
    motif = RoundedRectangle(width=w * 0.7, height=h * 0.75, corner_radius=w * 0.08,
                             stroke_color=JAUNE_TITRE, stroke_width=2).move_to(fond)
    q = Text("?", font_size=34, color=JAUNE_TITRE, weight=BOLD).move_to(fond)
    return VGroup(fond, motif, q)


def chapeau(larg=2.2, haut=1.5):
    """Un chapeau de magicien RETOURNÉ : l'ouverture en haut (repris de la 3e)."""
    corps = Polygon(P(-larg / 2, 0), P(larg / 2, 0), P(larg * 0.47, -haut), P(-larg * 0.47, -haut),
                    fill_color="#1F2937", fill_opacity=1, stroke_color=WHITE, stroke_width=3)
    fond = Ellipse(width=larg * 0.94, height=0.32, fill_color="#1F2937", fill_opacity=1,
                   stroke_color=WHITE, stroke_width=3).move_to(P(0, -haut))
    bande = Rectangle(width=larg * 0.99, height=0.28, fill_color="#DC2626", fill_opacity=1,
                      stroke_width=0).move_to(P(0, -0.3))
    bord = Ellipse(width=larg * 1.45, height=0.42, fill_color="#374151", fill_opacity=1,
                   stroke_color=WHITE, stroke_width=3)
    trou = Ellipse(width=larg * 0.92, height=0.24, fill_color=BLACK, fill_opacity=1,
                   stroke_color=GREY_B, stroke_width=1.5)
    return VGroup(fond, corps, bande, bord, trou)


def allumage(cartes, numeros, couleur):
    """Les animations qui allument les cartes `numeros` (fond coloré).
    ⚠️ On transforme la carte ENTIÈRE : animer le seul fond dans un LaggedStart
    le remonte au premier plan, et il cache le numéro."""
    anims = []
    for k in numeros:
        cible = cartes[k - 1].copy()
        cible[0].set_fill(couleur, 1).set_stroke(WHITE, 4)
        anims.append(Transform(cartes[k - 1], cible))
    return anims


def eteindre(cartes, numeros, opac=0.25):
    return [cartes[k - 1].animate.set_opacity(opac) for k in numeros]


class ProbaEvenement4e(Notion4e):
    nom_voix = "4e-proba-evenement"

    def t(self, texte, font_size=36, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def ligne(self, morceaux, font_size=36, buff=0.2):
        return VGroup(*[m if isinstance(m, Mobject) else self.t(m[0], font_size, m[1])
                        for m in morceaux]).arrange(RIGHT, buff=buff)

    def insister(self, mob, run_time=0.4):
        self.play(mob.animate.scale(1.5), run_time=run_time)
        self.play(mob.animate.scale(1 / 1.5), run_time=run_time)

    def barrer(self, mob, color=ROUGE_ERREUR):
        return Line(mob.get_corner(DL) + LEFT * 0.08, mob.get_corner(UR) + RIGHT * 0.08,
                    stroke_width=6, color=color)

    def cartes(self, y=1.55, x=-0.4):
        return rangee_cartes().move_to(P(x, y))

    def allumer_une_a_une(self, cartes, numeros, couleur, run_time=0.25):
        for k in numeros:
            self.play(*allumage(cartes, [k], couleur), run_time=run_time)
            self.play(cartes[k - 1].animate.shift(UP * 0.2), rate_func=there_and_back, run_time=run_time)

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("Les événements", 60, JAUNE_TITRE).to_edge(UP, buff=0.6)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.25)
        ech = echelle_ceintures("orange").move_to(P(-0.6, -2.75))
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech))
        c = self.cartes(0.75, -0.6)
        self.play(LaggedStart(*[FadeIn(k, shift=DOWN * 0.4) for k in c], lag_ratio=0.08), run_time=1.0)
        y = -0.9
        mots = [("Certain,", "certain", VERT_OK, range(1, 11), VERT_OK),
                ("impossible,", "impossible", ROUGE_ERREUR, [], None),
                ("ou contraire", "contraire ?", COUL_NON, [1, 3, 5, 7, 9], COUL_NON)]
        lbl = VGroup(*[self.t(m[1], 44, m[2]) for m in mots]).arrange(RIGHT, buff=0.7).move_to(P(-0.6, y))
        for (ext, _, col, nums, cc), l in zip(mots, lbl):
            self.au_mot(ext)
            if ext == "Certain,":
                self.play(FadeIn(l, shift=UP * 0.2), *allumage(c, nums, cc), run_time=0.5)
            elif ext == "impossible,":
                self.play(FadeIn(l, shift=UP * 0.2), *[k.animate.set_opacity(0.25) for k in c], run_time=0.5)
            else:
                neuves = self.cartes(0.75, -0.6)
                for k in (2, 4, 6, 8, 10):
                    neuves[k - 1][0].set_fill(COUL_EV, 1).set_stroke(WHITE, 4)
                for k in nums:
                    neuves[k - 1][0].set_fill(COUL_NON, 1).set_stroke(WHITE, 4)
                self.play(FadeIn(l, shift=UP * 0.2), FadeOut(c), FadeIn(neuves), run_time=0.5)
        self.insister(lbl[2], 0.35)
        self.attendre_voix(marge=1.2)

    # ── 01 : la situation ───────────────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.titre_ecran("10 cartes dans un chapeau")
        c = self.cartes(2.0, -0.4).scale(0.85)
        self.au_mot("On met 10 cartes")
        self.play(LaggedStart(*[FadeIn(k, shift=DOWN * 0.3) for k in c], lag_ratio=0.08), run_time=1.0)
        ch = chapeau(2.4, 1.6).move_to(P(-3.8, -1.0))
        self.au_mot("dans un chapeau")
        self.play(FadeIn(ch, shift=UP * 0.3), run_time=0.5)
        trou = ch[4].get_center()
        self.au_mot("numérotées")
        l1 = self.ligne([("10 cartes,", WHITE), ("de 1 à 10", JAUNE_TITRE)], 38).move_to(P(2.4, 0.4))
        self.play(FadeIn(l1[0]), run_time=0.3)
        self.au_mot("de 1 à 10")
        self.play(Write(l1[1]), Indicate(c[0], color=JAUNE_TITRE), Indicate(c[9], color=JAUNE_TITRE), run_time=0.6)
        # les cartes plongent dans le chapeau
        self.play(LaggedStart(*[k.animate.scale(0.5).move_to(trou + DOWN * 0.1).set_opacity(0) for k in c],
                              lag_ratio=0.08), run_time=1.2)
        self.au_mot("Tu en tires une")
        tiree = dos_carte(0.9, 1.25).move_to(trou)
        self.add(tiree)
        self.play(tiree.animate.move_to(trou + UP * 1.6), run_time=0.7)
        self.play(Wiggle(tiree), run_time=0.6)
        self.au_mot("Tu gagnes si")
        l2 = self.ligne([("Tu gagnes si :", WHITE), ("numéro pair", COUL_EV)], 38).move_to(P(2.4, -0.6))
        self.play(FadeIn(l2[0]), run_time=0.3)
        self.au_mot("est pair")
        self.play(Write(l2[1]), run_time=0.5)
        self.insister(l2[1], 0.35)
        self.au_mot("Quelles cartes")
        self.play(Write(self.chute("Quelles cartes te font gagner ?", color=BLEU_CALCUL, font_size=38)))
        self.attendre_voix()

    # ── 02 : les issues qui réalisent l'événement ───────────────────────────

    def ecran_realise(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-realise")
        self.titre_ecran("Les cartes qui font gagner")
        c = self.cartes()
        self.play(LaggedStart(*[FadeIn(k, shift=UP * 0.2) for k in c], lag_ratio=0.06), run_time=0.8)
        self.au_mot("Les cartes 2")
        res = VGroup(*[self.t(s, 44, COUL_EV) for s in ("2,", "4,", "6,", "8", "et", "10")]).arrange(RIGHT, buff=0.25)
        res[4].set_color(WHITE)
        res.move_to(P(-0.4, 0.15))
        morceaux = [("2,", 2, res[0]), ("4,", 4, res[1]), ("6,", 6, res[2]), ("8 et", 8, res[3]), ("et 10", 10, res[5])]
        for ext, k, m in morceaux:
            self.au_mot(ext if ext != "2," else "2, 4")
            anims = [FadeIn(m, scale=0.6)] + allumage(c, [k], COUL_EV)
            if k == 10:
                anims.append(FadeIn(res[4]))
            self.play(*anims, run_time=0.3)
        self.insister(VGroup(*[c[k - 1] for k in (2, 4, 6, 8, 10)]), 0.35)
        self.au_mot("Ce sont les issues")
        l1 = self.t("les issues qui réalisent l'événement", 36).move_to(P(-0.4, -0.9))
        self.play(FadeIn(l1, shift=UP * 0.15), run_time=0.5)
        self.au_mot("« obtenir un nombre pair »")
        ev = self.t("« obtenir un nombre pair »", 42, COUL_EV).move_to(P(-0.4, -1.8))
        self.play(Write(ev), run_time=0.8)
        self.play(Create(SurroundingRectangle(ev, color=COUL_EV, buff=0.15)), run_time=0.4)
        self.attendre_voix()

    # ── 03 : certain ────────────────────────────────────────────────────────

    def ecran_certain(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-certain")
        self.titre_ecran("Un événement certain")
        c = self.cartes()
        self.add(c)
        self.au_mot("Obtenir un nombre")
        ev = self.ligne([("obtenir un nombre", WHITE), ("plus petit que 11", JAUNE_TITRE)], 38).move_to(P(-0.4, 0.15))
        self.play(FadeIn(ev[0]), run_time=0.4)
        self.au_mot("plus petit que 11")
        self.play(Write(ev[1]), run_time=0.6)
        s11 = self.t("< 11", 44, JAUNE_TITRE).next_to(ev, DOWN, buff=0.25)
        self.play(FadeIn(s11, shift=UP * 0.15), run_time=0.3)
        self.au_mot("toutes les cartes")
        self.play(LaggedStart(*allumage(c, range(1, 11), VERT_OK), lag_ratio=0.1), run_time=1.2)
        self.play(LaggedStart(*[k.animate(rate_func=there_and_back).shift(UP * 0.25) for k in c],
                              lag_ratio=0.08), run_time=1.0)
        self.au_mot("C'est un événement certain")
        fin = self.t("certain", 64, VERT_OK).move_to(P(-0.4, -1.95))
        self.play(GrowFromCenter(fin), run_time=0.5)
        self.insister(fin, 0.4)
        self.attendre_voix()

    # ── 04 : impossible ─────────────────────────────────────────────────────

    def ecran_impossible(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-impossible")
        self.titre_ecran("Un événement impossible")
        c = self.cartes(1.55, -1.0)
        self.add(c)
        self.au_mot("Obtenir 12")
        fant = DashedVMobject(RoundedRectangle(width=0.82, height=1.15, corner_radius=0.11,
                                               stroke_color=ROUGE_ERREUR, stroke_width=3), num_dashes=24)
        f12 = VGroup(fant, self.t("12", 34, ROUGE_ERREUR).move_to(fant)).next_to(c, RIGHT, buff=0.45)
        ev = self.ligne([("obtenir", WHITE), ("12", ROUGE_ERREUR)], 42).move_to(P(-0.4, 0.15))
        self.play(FadeIn(ev), FadeIn(f12, scale=0.7), run_time=0.6)
        self.insister(ev[1], 0.35)
        self.au_mot("aucune carte")
        loupe = VGroup(Circle(radius=0.45, stroke_color=WHITE, stroke_width=5),
                       Line(P(0.32, -0.32), P(0.7, -0.7), stroke_width=8, color=WHITE))
        loupe.move_to(c[0].get_center() + DOWN * 1.2)
        self.play(FadeIn(loupe), run_time=0.2)
        for k in c:
            self.play(loupe.animate.move_to(k.get_center() + DOWN * 1.2), k.animate.set_opacity(0.3),
                      run_time=0.14)
        self.play(FadeOut(loupe), run_time=0.2)
        self.au_mot("C'est un événement impossible")
        fin = self.t("impossible", 64, ROUGE_ERREUR).move_to(P(-0.4, -1.95))
        self.play(GrowFromCenter(fin), Create(self.barrer(f12)), run_time=0.5)
        self.insister(fin, 0.4)
        self.attendre_voix()

    # ── 05 : le contraire ───────────────────────────────────────────────────

    def ecran_contraire(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-contraire")
        self.titre_ecran("L'événement contraire")
        c = self.cartes(1.75)
        self.add(c)
        pairs, impairs = [2, 4, 6, 8, 10], [1, 3, 5, 7, 9]
        self.au_mot("Le contraire")
        l1 = self.ligne([("événement :", COUL_EV), ("obtenir un nombre pair", WHITE)], 34).move_to(P(-0.6, 0.45))
        self.play(FadeIn(l1), *allumage(c, pairs, COUL_EV), run_time=0.6)
        self.au_mot("ne pas obtenir")
        l2 = self.ligne([("contraire :", COUL_NON), ("ne pas obtenir un nombre pair", WHITE)], 34)
        l2.next_to(l1, DOWN, buff=0.3).align_to(l1, LEFT)
        self.play(FadeIn(l2, shift=UP * 0.15), run_time=0.5)
        self.insister(l2[1][:6], 0.35)
        self.au_mot("toutes les autres cartes")
        self.play(*[c[k - 1].animate.set_opacity(0.5) for k in pairs], run_time=0.3)
        self.au_mot("1, 3")
        res = self.t("1, 3, 5, 7 et 9", 40, COUL_NON).next_to(l2, DOWN, buff=0.3)
        self.play(Write(res), run_time=1.3)
        self.allumer_une_a_une(c, impairs, COUL_NON, 0.18)
        self.au_mot("obtenir un nombre impair")
        l3 = self.ligne([("contraire :", COUL_NON), ("obtenir un nombre impair", WHITE)], 34)
        l3.move_to(l2, aligned_edge=LEFT)
        self.play(ReplacementTransform(l2, l3), *[c[k - 1].animate.set_opacity(1) for k in pairs], run_time=0.6)
        self.insister(l3[1][-6:], 0.35)
        # le partage : les cartes se rangent en deux paquets
        self.au_mot("se partagent")
        self.play(FadeOut(VGroup(l1, l3, res)), run_time=0.4)
        gp = VGroup(*[c[k - 1] for k in pairs])
        gi = VGroup(*[c[k - 1] for k in impairs])
        self.play(gp.animate.arrange(RIGHT, buff=0.15).move_to(P(-3.6, 0.6)),
                  gi.animate.arrange(RIGHT, buff=0.15).move_to(P(2.0, 0.6)), run_time=1.0)
        lp = self.t("l'événement", 32, COUL_EV).next_to(gp, DOWN, buff=0.25)
        li = self.t("son contraire", 32, COUL_NON).next_to(gi, DOWN, buff=0.25)
        tout = SurroundingRectangle(VGroup(gp, gi, lp, li), color=WHITE, buff=0.3, corner_radius=0.15)
        lt = self.t("toutes les issues", 32).next_to(tout, UP, buff=0.12)
        self.play(FadeIn(lp), FadeIn(li), Create(tout), FadeIn(lt), run_time=0.8)
        self.au_mot("sans en oublier")
        b1 = VGroup(self.coche(), self.t("aucune oubliée", 32)).arrange(RIGHT, buff=0.25)
        b2 = VGroup(self.coche(), self.t("aucune comptée deux fois", 32)).arrange(RIGHT, buff=0.25)
        VGroup(b1, b2).arrange(DOWN, aligned_edge=LEFT, buff=0.3).move_to(P(-1.2, -1.75))
        self.play(FadeIn(b1[1]), Create(b1[0]), run_time=0.5)
        self.au_mot("sans en compter deux fois")
        self.play(FadeIn(b2[1]), Create(b2[0]), run_time=0.5)
        self.attendre_voix()

    # ── 06 : le piège ───────────────────────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-piege")
        self.titre_ecran("Le piège")
        c = self.cartes()
        self.add(c)
        self.au_mot("le contraire de")
        l1 = self.ligne([("contraire de", WHITE), ("« obtenir 10 »", COUL_EV)], 38).move_to(P(-0.6, 0.2))
        self.play(FadeIn(l1), *allumage(c, [10], COUL_EV), run_time=0.5)
        self.insister(c[9], 0.3)
        self.au_mot("ce n'est pas")
        faux = self.ligne([("≠", ROUGE_ERREUR), ("« obtenir 1 »", ROUGE_ERREUR)], 38).next_to(l1, DOWN, buff=0.35)
        self.play(FadeIn(faux), *allumage(c, [1], ROUGE_ERREUR), run_time=0.5)
        bar = self.barrer(c[0])
        self.play(Create(bar), run_time=0.3)
        self.au_mot("n'importe quelle")
        self.play(FadeOut(bar), run_time=0.3)
        self.play(LaggedStart(*allumage(c, range(1, 10), COUL_NON),
                              lag_ratio=0.12), run_time=1.2)
        self.au_mot("de 1 à 9")
        bon = self.ligne([("contraire :", COUL_NON), ("de 1 à 9", COUL_NON)], 42).move_to(P(-0.6, -1.85))
        self.play(Write(bon), run_time=0.6)
        self.insister(bon[1], 0.35)
        self.attendre_voix()

    # ── 07 : défi ───────────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        c = self.cartes(1.55)
        self.au_mot("de 1 à 10")
        self.play(LaggedStart(*[FadeIn(k, shift=DOWN * 0.3) for k in c], lag_ratio=0.07), run_time=0.9)
        l0 = self.t("cartes de 1 à 10", 32, JAUNE_TITRE).move_to(P(-0.4, 0.5))
        self.play(FadeIn(l0), run_time=0.3)
        self.au_mot("Quelles cartes")
        q1 = self.ligne([("1. Quelles cartes réalisent", WHITE), ("« obtenir un multiple de 3 » ?", COUL_EV)], 34)
        q1.scale_to_fit_width(min(q1.width, 11.0)).move_to(P(-0.4, -0.35))
        self.play(FadeIn(q1, shift=UP * 0.15), run_time=0.6)
        self.au_mot("Et son contraire")
        q2 = self.ligne([("2. Et son", WHITE), ("contraire ?", COUL_NON)], 34)
        q2.next_to(q1, DOWN, buff=0.3).align_to(q1, LEFT)
        self.play(FadeIn(q2, shift=UP * 0.15), run_time=0.5)
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=40)))
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("07b-correction")
        self.titre_ecran("Correction")
        c = self.cartes(1.55)
        self.add(c)
        self.au_mot("Multiple de 3")
        l1 = self.ligne([("multiple de 3 :", COUL_EV)], 38).move_to(P(-2.2, 0.15))
        self.play(FadeIn(l1), run_time=0.4)
        self.au_mot("3, 6 et 9")
        r1 = self.t("3, 6 et 9", 40, COUL_EV).next_to(l1, RIGHT, buff=0.3)
        self.play(Write(r1), *allumage(c, [3, 6, 9], COUL_EV), run_time=0.7)
        self.insister(VGroup(c[2], c[5], c[8]), 0.35)
        self.au_mot("Le contraire")
        l2 = self.t("contraire :", 38, COUL_NON).next_to(l1, DOWN, buff=0.5).align_to(l1, LEFT)
        self.play(FadeIn(l2), run_time=0.4)
        self.au_mot("1, 2, 4")
        r2 = self.t("1, 2, 4, 5, 7, 8 et 10", 40, COUL_NON).next_to(l2, RIGHT, buff=0.3)
        self.play(Write(r2), run_time=2.0)
        self.play(LaggedStart(*allumage(c, (1, 2, 4, 5, 7, 8, 10), COUL_NON),
                              lag_ratio=0.15), run_time=1.2)
        self.play(Write(self.chute("Toutes les autres cartes.", color=VERT_OK, font_size=38)))
        self.attendre_voix()

    # ── 08 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)))
        acquis = [
            ("Un événement est", "Un événement est réalisé par certaines issues"),
            ("Toutes : il", "Toutes les issues : certain ; aucune : impossible"),
            ("Son contraire", "Son contraire : toutes les autres issues"),
        ]
        lignes = VGroup(*[VGroup(self.coche(), self.t(txt, 36)).arrange(RIGHT, buff=0.3)
                          for _, txt in acquis])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.55)
        if lignes.width > 10.4:
            lignes.scale_to_fit_width(10.4)
        lignes.move_to(P(-0.8, 0.5))
        for (mot, _), l in zip(acquis, lignes):
            self.au_mot(mot)
            self.play(FadeIn(l[1], shift=RIGHT * 0.2), run_time=0.6)
            self.play(Create(l[0]), run_time=0.4)
        self.au_mot("L'épisode 4")
        self.play(Write(self.chute("Épisode 4 : la même chance pour toutes les issues ?",
                                   color=VERT_OK, font_size=34)))
        self.attendre_voix(marge=1.0)

    # ── déroulé ─────────────────────────────────────────────────────────────

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_realise()
        self.ecran_certain()
        self.ecran_impossible()
        self.ecran_contraire()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="09-abonne")
