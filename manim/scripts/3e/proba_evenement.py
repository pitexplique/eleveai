# proba_evenement.py
# EleveAI — Maths 3e — Probabilités, épisode 4 : les événements
# (micro : proba_evenement), AVEC VOIX. Paysage ceinture VERTE.
#
# ⭐ LES DESSINS : le jeu de l'oie (spirale de cases, un pion, un dé qui roule) ;
# les 6 faces du dé EN RANGÉE qui s'allument selon l'événement (« plus de 4 » →
# 5, 6 ; « supérieur ou égal à 4 » → 4, 5, 6, le 4 qui surgit agrandi) ; deux
# « patates » pair / supérieur à 3 pour ET (intersection 4, 6) et OU (réunion
# 2, 4, 5, 6) ; deux patates qui ne se touchent pas pour « incompatibles » ;
# défi : 12 maillots numérotés (multiples de 3 puis > 7 → 9 et 12).
# Le dé est celui de la bande-annonce (annonce_probabilites.py).
#
# Voix : manim/voix/3e-proba-evenement.json (débit −7).
# Rendu : python -m manim render -qh --disable_caching manim/scripts/3e/proba_evenement.py ProbaEvenement3e -o eleveai-maths-3e-proba-evenement --media_dir manim/scripts/3e/media
# Puis copier le mp4 dans manim/sorties/3e/maths/probabilites/04-evenements/.

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
from annonce_probabilites import GRIS_ETEINT, de, de_qui_roule  # noqa: E402

COUL_PAIR = BLEU_CALCUL
COUL_SUP = ORANGE_RETENUE
COUL_ET = VERT_OK
COUL_OU = VIOLET_ACCENT
MAILLOT = "#1D4ED8"


class Notion3e(Notion6e):
    identite = "Maths 3e — EleveAI"


def P(x, y):
    return np.array([x, y, 0.0])


# ── les dessins communs (paysage et short) ──────────────────────────────────

def rangee_faces(cote=0.95, buff=0.3):
    """Les 6 faces du dé, en rangée, de 1 à 6."""
    return VGroup(*[de(i, cote) for i in range(1, 7)]).arrange(RIGHT, buff=buff)


def plateau_oie(centre, n=34, taille=0.4):
    """Un plateau de jeu de l'oie simplifié : des cases le long d'une spirale."""
    cases = VGroup()
    couleurs = ["#FDE68A", "#A7F3D0", "#BFDBFE", "#FBCFE8"]
    theta = 0.0
    for k in range(n):
        r = 2.05 - 0.12 * theta
        p = centre + P(r * math.cos(theta) * 1.2, r * math.sin(theta))
        c = Square(taille, fill_color=couleurs[k % 4], fill_opacity=1, stroke_color="#111827", stroke_width=2)
        c.rotate(theta).move_to(p)
        cases.add(c)
        theta += taille * 1.12 / (r * 1.1)
    arrivee = Star(5, outer_radius=0.32, fill_color=JAUNE_TITRE, fill_opacity=1, stroke_width=0)
    arrivee.move_to(centre)
    return VGroup(cases, arrivee)


def maillot(numero, s=0.85, couleur=MAILLOT):
    pts = [(-0.18, 0.5), (-0.5, 0.45), (-0.75, 0.15), (-0.55, 0.02), (-0.42, 0.15), (-0.42, -0.55),
           (0.42, -0.55), (0.42, 0.15), (0.55, 0.02), (0.75, 0.15), (0.5, 0.45), (0.18, 0.5), (0.0, 0.36)]
    corps = Polygon(*[P(x, y) for x, y in pts], fill_color=couleur, fill_opacity=1,
                    stroke_color=WHITE, stroke_width=2)
    num = Text(str(numero), font_size=34, color=WHITE, weight=BOLD).move_to(P(0, -0.1))
    return VGroup(corps, num).scale(s)


def patate(larg, haut, couleur, angle=0.0):
    e = Ellipse(width=larg, height=haut, stroke_color=couleur, stroke_width=4,
                fill_color=couleur, fill_opacity=0.0)
    return e.rotate(angle)


class ProbaEvenement3e(Notion3e):
    nom_voix = "3e-proba-evenement"

    def t(self, texte, font_size=36, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def ligne(self, morceaux, font_size=36, buff=0.2):
        return VGroup(*[self.t(m, font_size, c) for m, c in morceaux]).arrange(RIGHT, buff=buff)

    def insister(self, mob, run_time=0.45):
        self.play(mob.animate.scale(1.5), run_time=run_time)
        self.play(mob.animate.scale(1 / 1.5), run_time=run_time)

    def allumer(self, faces, numeros, couleur=VERT_OK, run_time=0.6):
        """Les faces `numeros` s'allument (cadre de couleur), les autres pâlissent."""
        cadres = VGroup()
        anims = []
        for i, f in enumerate(faces, start=1):
            if i in numeros:
                cadres.add(SurroundingRectangle(f, color=couleur, buff=0.08, stroke_width=6,
                                                corner_radius=0.12))
                anims.append(f.animate.set_opacity(1))
            else:
                anims.append(f.animate.set_opacity(0.22))
        self.play(*anims, Create(cadres), run_time=run_time)
        return cadres

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("Les événements", 60, JAUNE_TITRE).to_edge(UP, buff=0.6)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.25)
        ech = echelle_ceintures("verte").move_to(P(-0.6, -2.6))
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech))
        roule = de_qui_roule(P(-4.3, 0.2), 1.6)
        self.add(roule)
        self.au_mot("Quelles issues")
        q = VGroup(self.t("Quelles issues réalisent", 42, BLEU_CALCUL),
                   self.t("un événement ?", 42, BLEU_CALCUL)).arrange(DOWN, buff=0.2)
        q.move_to(P(1.2, 0.3))
        self.play(FadeIn(q, shift=UP * 0.2))
        self.attendre_voix(marge=1.5)
        roule.clear_updaters()

    # ── 01 : le jeu de l'oie ────────────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.titre_ecran("Au jeu de l'oie")
        plateau = plateau_oie(P(-3.9, -0.4))
        cases = plateau[0]
        pion = VGroup(Circle(radius=0.17, fill_color=ROUGE_ERREUR, fill_opacity=1, stroke_color=WHITE,
                             stroke_width=3)).move_to(cases[3])
        self.play(LaggedStart(*[FadeIn(c, scale=0.5) for c in cases], lag_ratio=0.06),
                  FadeIn(plateau[1]), run_time=1.4)
        self.play(FadeIn(pion, shift=DOWN * 0.3), run_time=0.4)
        self.au_mot("tu lances un dé")
        roule = de_qui_roule(P(2.6, 1.0), 1.8)
        self.add(roule)
        self.wait(0.4)
        self.au_mot("Tu gagnes si")
        cond = self.ligne([("Tu gagnes si :", WHITE), ("plus de 4", JAUNE_TITRE)], 40, 0.35)
        cond.move_to(P(2.6, -1.0))
        self.play(FadeIn(cond[0]), run_time=0.4)
        self.au_mot("plus de 4")
        self.play(Write(cond[1]), run_time=0.6)
        self.insister(cond[1], 0.4)
        roule.clear_updaters()
        self.remove(roule)
        d6 = de(6, 1.8).move_to(P(2.6, 1.0))
        self.add(d6)
        # le pion avance de 6 cases
        for k in range(4, 10):
            self.play(pion.animate.move_to(cases[k]).shift(UP * 0.0), run_time=0.18)
        self.au_mot("Quels lancers")
        self.play(Write(self.chute("Quels lancers te font gagner ?", color=BLEU_CALCUL, font_size=38)))
        self.attendre_voix()

    # ── 02 : les issues qui réalisent l'événement ───────────────────────────

    def ecran_issues(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-issues")
        self.titre_ecran("Les issues qui font gagner")
        faces = rangee_faces(1.1, 0.4).move_to(P(-0.8, 1.3))
        nums = VGroup(*[self.t(str(i), 30, GRIS_ETEINT).next_to(f, DOWN, buff=0.15)
                        for i, f in enumerate(faces, start=1)])
        self.play(LaggedStart(*[FadeIn(f, shift=UP * 0.2) for f in faces], lag_ratio=0.12),
                  FadeIn(nums), run_time=1.0)
        self.au_mot("Plus de 4")
        pd4 = self.t("plus de 4", 40, JAUNE_TITRE).move_to(P(-0.8, -0.4))
        self.play(FadeIn(pd4, shift=UP * 0.2), run_time=0.4)
        self.au_mot("ce sont 5 et 6")
        cadres = self.allumer(faces, [5, 6])
        self.play(nums[4].animate.set_color(VERT_OK), nums[5].animate.set_color(VERT_OK), run_time=0.3)
        self.insister(VGroup(faces[4:], cadres), 0.4)
        self.au_mot("L'événement")
        ev = self.ligne([("événement :", BLEU_CALCUL), ("« obtenir plus de 4 »", JAUNE_TITRE)], 38)
        ev.move_to(P(-0.8, -0.4))
        self.play(ReplacementTransform(pd4, ev), run_time=0.6)
        self.au_mot("2 issues")
        res = self.ligne([("réalisé par", WHITE), ("2 issues :", VERT_OK), ("5 et 6", VERT_OK)], 40)
        res.move_to(P(-0.8, -1.4))
        self.play(FadeIn(res[:2], shift=UP * 0.2), run_time=0.5)
        self.au_mot("issues : 5 et 6")
        self.play(Write(res[2]), run_time=0.5)
        self.play(Circumscribe(res[1:], color=VERT_OK), run_time=0.8)
        self.attendre_voix()

    # ── 03 : attention aux mots ─────────────────────────────────────────────

    def ecran_mots(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-mots")
        self.titre_ecran("Attention aux mots")
        y1, y2 = 1.25, -0.95
        r1 = rangee_faces(0.85, 0.28).move_to(P(1.2, y1))
        r2 = rangee_faces(0.85, 0.28).move_to(P(1.2, y2))
        self.au_mot("Strictement supérieur à 4")
        l1 = VGroup(self.t("strictement", 32, BLEU_CALCUL),
                    self.t("supérieur à 4", 32, BLEU_CALCUL)).arrange(DOWN, buff=0.1)
        l1.move_to(P(-4.4, y1))
        s1 = self.t("> 4", 40, JAUNE_TITRE).next_to(l1, DOWN, buff=0.15)
        self.play(FadeIn(l1, shift=RIGHT * 0.2), FadeIn(s1),
                  LaggedStart(*[FadeIn(f) for f in r1], lag_ratio=0.1), run_time=0.9)
        self.au_mot("5 et 6. Sup")
        self.allumer(r1, [5, 6])
        self.au_mot("Supérieur ou égal à 4")
        l2 = VGroup(self.t("supérieur", 32, ORANGE_RETENUE),
                    self.t("ou égal à 4", 32, ORANGE_RETENUE)).arrange(DOWN, buff=0.1)
        l2.move_to(P(-4.4, y2))
        s2 = self.t("≥ 4", 40, JAUNE_TITRE).next_to(l2, DOWN, buff=0.15)
        self.play(FadeIn(l2, shift=RIGHT * 0.2), FadeIn(s2),
                  LaggedStart(*[FadeIn(f) for f in r2], lag_ratio=0.1), run_time=0.9)
        self.au_mot("4, 5 et 6")
        cad = self.allumer(r2, [5, 6], ORANGE_RETENUE, run_time=0.4)
        # le 4 qui apparaît EN PLUS : agrandi puis rétréci
        c4 = SurroundingRectangle(r2[3], color=JAUNE_TITRE, buff=0.08, stroke_width=6, corner_radius=0.12)
        self.play(r2[3].animate.set_opacity(1), Create(c4), run_time=0.4)
        self.insister(VGroup(r2[3], c4), 0.45)
        plus = self.t("+ le 4 !", 34, JAUNE_TITRE).next_to(c4, DOWN, buff=0.2)
        self.play(FadeIn(plus, shift=UP * 0.15), run_time=0.4)
        self.au_mot("Un seul mot")
        self.play(Indicate(VGroup(l2[1]), color=JAUNE_TITRE, scale_factor=1.3), run_time=0.8)
        self.play(Write(self.chute("Un seul mot change le nombre d'issues.", color=VERT_OK, font_size=36)))
        self.attendre_voix()

    # ── 04 : ET / OU ────────────────────────────────────────────────────────

    def ecran_et_ou(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-et-ou")
        self.titre_ecran("Deux conditions : ET, OU")
        cx, cy = -3.5, -0.3
        cadre = RoundedRectangle(width=6.4, height=4.9, corner_radius=0.2, stroke_color=GREY_B,
                                 stroke_width=2).move_to(P(cx, cy))
        pa = patate(3.4, 3.0, COUL_PAIR, 0.3).move_to(P(cx - 0.85, cy + 0.15))
        sp = patate(3.4, 3.0, COUL_SUP, -0.3).move_to(P(cx + 0.85, cy + 0.15))
        lpa = self.t("pair", 32, COUL_PAIR).move_to(P(cx - 2.2, cy + 1.95))
        lsp = self.t("supérieur à 3", 30, COUL_SUP).move_to(P(cx + 1.55, cy + 1.95))
        pos = {2: (cx - 1.65, cy + 0.2), 4: (cx, cy + 0.75), 6: (cx, cy - 0.35),
               5: (cx + 1.65, cy + 0.2), 1: (cx - 2.5, cy - 1.95), 3: (cx + 2.5, cy - 1.95)}
        nums = {k: self.t(str(k), 44).move_to(P(*p)) for k, p in pos.items()}
        self.play(Create(cadre), LaggedStart(*[FadeIn(n, scale=0.5) for n in nums.values()], lag_ratio=0.1),
                  run_time=0.9)
        self.au_mot("Deux conditions")
        self.play(Create(pa), FadeIn(lpa), run_time=0.7)
        self.play(Create(sp), FadeIn(lsp), run_time=0.7)

        xr = 3.1
        self.au_mot("pair ET supérieur")
        et_txt = self.ligne([("pair", COUL_PAIR), ("ET", COUL_ET), ("> 3", COUL_SUP)], 38).move_to(P(xr, 1.7))
        inter = Intersection(pa, sp, fill_color=COUL_ET, fill_opacity=0.55, stroke_width=0)
        self.play(FadeIn(et_txt, shift=LEFT * 0.2), FadeIn(inter), run_time=0.7)
        self.au_mot("4 et 6. Un")
        r_et = self.t("4 et 6", 44, COUL_ET).next_to(et_txt, DOWN, buff=0.25)
        self.play(Write(r_et), run_time=0.5)
        self.insister(VGroup(nums[4], nums[6]), 0.35)

        self.au_mot("pair OU supérieur")
        ou_txt = self.ligne([("pair", COUL_PAIR), ("OU", COUL_OU), ("> 3", COUL_SUP)], 38).move_to(P(xr, 0.0))
        uni = Union(pa, sp, fill_color=COUL_OU, fill_opacity=0.45, stroke_width=0)
        self.play(FadeIn(ou_txt, shift=LEFT * 0.2), FadeOut(inter), FadeIn(uni), run_time=0.7)
        self.au_mot("2, 4, 5 et 6")
        r_ou = self.t("2, 4, 5 et 6", 44, COUL_OU).next_to(ou_txt, DOWN, buff=0.25)
        self.play(Write(r_ou), run_time=0.6)
        self.insister(VGroup(*[nums[k] for k in (2, 4, 5, 6)]), 0.3)
        self.play(nums[1].animate.set_opacity(0.3), nums[3].animate.set_opacity(0.3), run_time=0.3)

        self.au_mot("ET garde")
        b1 = self.ligne([("ET :", COUL_ET), ("les deux", WHITE)], 32).move_to(P(xr - 0.4, -1.75))
        self.play(FadeIn(b1, shift=UP * 0.15), Indicate(r_et, color=COUL_ET), run_time=0.6)
        self.au_mot("OU garde")
        b2 = self.ligne([("OU :", COUL_OU), ("au moins une", WHITE)], 32).move_to(P(xr - 0.4, -2.45))
        self.play(FadeIn(b2, shift=UP * 0.15), Indicate(r_ou, color=COUL_OU), run_time=0.6)
        self.attendre_voix()

    # ── 05 : incompatibles ──────────────────────────────────────────────────

    def ecran_incompatibles(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-incompatibles")
        self.titre_ecran("Des événements incompatibles")
        d = VGroup(self.t("incompatibles :", 38, ROUGE_ERREUR),
                   self.t("jamais en même temps", 38)).arrange(RIGHT, buff=0.3).move_to(P(-0.6, 2.2))
        self.au_mot("incompatibles s'ils")
        self.play(FadeIn(d[0], shift=UP * 0.2), run_time=0.5)
        self.au_mot("ne peuvent pas arriver")
        self.play(FadeIn(d[1], shift=UP * 0.2), run_time=0.5)

        self.au_mot("Obtenir 1")
        g1 = VGroup(patate(2.0, 2.4, JAUNE_TITRE).set_fill(JAUNE_TITRE, 0.15), self.t("1", 54))
        g1[1].move_to(g1[0])
        l1 = self.t("obtenir 1", 32, JAUNE_TITRE).next_to(g1[0], UP, buff=0.15)
        G1 = VGroup(g1, l1).move_to(P(-4.4, -0.3))
        self.play(FadeIn(G1, scale=0.8), run_time=0.6)
        self.au_mot("obtenir un nombre pair")
        g2 = VGroup(patate(3.2, 2.6, COUL_PAIR).set_fill(COUL_PAIR, 0.15))
        trio = VGroup(*[self.t(s, 50) for s in ("2", "4", "6")]).arrange(RIGHT, buff=0.45).move_to(g2[0])
        g2.add(trio)
        l2 = self.t("obtenir un nombre pair", 32, COUL_PAIR).next_to(g2[0], UP, buff=0.15)
        G2 = VGroup(g2, l2).move_to(P(1.6, -0.3))
        self.play(FadeIn(G2, scale=0.8), run_time=0.6)
        # elles s'approchent… mais ne se touchent pas
        self.play(G1.animate.shift(RIGHT * 1.2), G2.animate.shift(LEFT * 1.2), run_time=0.7)
        mur = Line(P(-1.75, 0.9), P(-1.75, -1.5), color=ROUGE_ERREUR, stroke_width=6)
        self.play(Create(mur), Flash(P(-1.75, -0.3), color=ROUGE_ERREUR), run_time=0.5)
        self.play(G1.animate.shift(LEFT * 0.5), G2.animate.shift(RIGHT * 0.5), run_time=0.4)
        commun = self.t("aucune issue commune", 32, WHITE).move_to(P(-1.75, -2.2))
        self.play(FadeIn(commun, shift=UP * 0.15), run_time=0.4)
        self.au_mot("incompatibles.")
        ch = self.t("incompatibles", 48, ROUGE_ERREUR).move_to(P(-1.75, -2.95))
        self.play(GrowFromCenter(ch), run_time=0.4)
        self.insister(ch, 0.35)
        self.attendre_voix(marge=1.5)

    # ── 06 : défi ───────────────────────────────────────────────────────────

    def les_maillots(self, y_haut=1.0, y_bas=-0.6):
        m = VGroup(*[maillot(k) for k in range(1, 13)])
        for k, mm in enumerate(m):
            mm.move_to(P(-4.9 + 1.55 * (k % 6), y_haut if k < 6 else y_bas))
        return m

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("06-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        self.au_mot("Des maillots")
        m = self.les_maillots(1.6, 0.2)
        self.play(LaggedStart(*[FadeIn(x, shift=DOWN * 0.3) for x in m], lag_ratio=0.08), run_time=1.3)
        self.au_mot("de 1 à 12")
        de1a12 = self.t("numérotés de 1 à 12", 32, BLEU_CALCUL).move_to(P(-1.05, -0.8))
        self.play(FadeIn(de1a12), Indicate(m[0], color=JAUNE_TITRE), Indicate(m[11], color=JAUNE_TITRE),
                  run_time=0.6)
        self.au_mot("Quelles issues")
        q = VGroup(self.t("Quelles issues réalisent :", 34),
                   self.ligne([("un multiple de 3", BLEU_CALCUL), ("ET", VERT_OK),
                               ("strictement supérieur à 7 ?", ORANGE_RETENUE)], 32))
        q.arrange(DOWN, buff=0.18).move_to(P(-1.05, -1.8))
        self.play(FadeIn(q[0]), run_time=0.4)
        self.au_mot("un multiple de 3")
        self.play(FadeIn(q[1][:2], shift=UP * 0.15), run_time=0.4)
        self.au_mot("strictement supérieur à 7")
        self.play(FadeIn(q[1][2], shift=UP * 0.15), run_time=0.4)
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=36)))
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("06b-correction")
        self.titre_ecran("Correction")
        m = self.les_maillots(1.6, 0.2)
        self.add(m)
        self.au_mot("Les multiples de 3")
        l1 = self.ligne([("multiples de 3 :", BLEU_CALCUL), ("3, 6, 9 et 12", WHITE)], 36).move_to(P(-1.05, -0.85))
        self.play(FadeIn(l1[0]), *[m[k].animate.set_opacity(0.25) for k in range(12) if (k + 1) % 3],
                  run_time=0.5)
        self.au_mot("3, 6, 9 et 12")
        cad3 = VGroup(*[SurroundingRectangle(m[k - 1], color=BLEU_CALCUL, buff=0.06) for k in (3, 6, 9, 12)])
        self.play(Write(l1[1]), LaggedStart(*[Create(c) for c in cad3], lag_ratio=0.25), run_time=1.0)
        self.au_mot("Strictement supérieurs à 7")
        l2 = self.ligne([("strictement supérieurs à 7 :", ORANGE_RETENUE), ("9 et 12", VERT_OK)], 36)
        l2.move_to(P(-1.05, -1.6))
        self.play(FadeIn(l2[0]), m[2].animate.set_opacity(0.25), m[5].animate.set_opacity(0.25),
                  FadeOut(cad3[0]), FadeOut(cad3[1]), run_time=0.5)
        self.au_mot("9 et 12. Deux")
        self.play(Write(l2[1]), cad3[2].animate.set_color(VERT_OK), cad3[3].animate.set_color(VERT_OK),
                  run_time=0.5)
        self.insister(VGroup(m[8], m[11], cad3[2], cad3[3]), 0.4)
        self.au_mot("Deux issues")
        res = self.ligne([("2 issues :", VERT_OK), ("9 et 12", VERT_OK)], 44).move_to(P(-1.05, -2.6))
        self.play(FadeIn(res, scale=0.8), run_time=0.5)
        self.play(Create(SurroundingRectangle(res, color=VERT_OK, buff=0.15)), run_time=0.4)
        self.attendre_voix()

    # ── 07 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)))
        acquis = [
            ("Un événement est", "Un événement est réalisé par une liste d'issues"),
            ("Strictement et", "Strictement (>) et ou égal (≥) : pas la même liste"),
            ("ET garde", "ET : les deux conditions ; OU : au moins une"),
        ]
        lignes = VGroup(*[VGroup(self.coche(), self.t(txt, 38)).arrange(RIGHT, buff=0.3)
                          for _, txt in acquis])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.55)
        if lignes.width > 10.0:
            lignes.scale_to_fit_width(10.0)
        lignes.move_to(P(-0.9, 0.3))
        for (mot, _), l in zip(acquis, lignes):
            self.au_mot(mot)
            self.play(FadeIn(l[1], shift=RIGHT * 0.2), run_time=0.6)
            self.play(Create(l[0]), run_time=0.4)
        self.au_mot("L'épisode 5")
        self.play(Write(self.chute("Épisode 5 : calculer une probabilité", color=VERT_OK, font_size=36)))
        self.attendre_voix(marge=1.0)

    # ── déroulé ─────────────────────────────────────────────────────────────

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_issues()
        self.ecran_mots()
        self.ecran_et_ou()
        self.ecran_incompatibles()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="08-abonne")
