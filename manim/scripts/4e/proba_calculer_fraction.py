# proba_calculer_fraction.py
# EleveAI — Maths 4e — Probabilités, épisode 5 : calculer une probabilité
# (une fraction suffit), AVEC VOIX. Paysage 16:9, CEINTURE ORANGE.
# Short jumeau (ceinture jaune) : proba_calculer_fraction_short.py.
#
# ⭐ LE DESSIN QUI PORTE TOUT : l'urne de la tombola de la kermesse, 20 tickets
# dont 4 DORÉS (gagnants). Les 4 dorés sautent au numérateur, les 20 au
# dénominateur : 4/20 ; puis les tickets se rangent en 4 rangées de 5, un doré
# par rangée : 1 chance sur 5.
# Écrans : 00 garde · 01 l'urne · 02 favorables sur total · 03 4/20 = 1/5 ·
# 04 le dé (multiple de 3 → 2/6 = 1/3) · 05 le piège 4/16 · 06 entre 0 et 1 ·
# 07 défi : sac de 12 billes · 07b correction 4/12 = 1/3 · 08 ce que tu as appris.
#
# Voix : manim/voix/4e-proba-calculer-fraction.json (débit −7).
# Rendu : python -m manim render -qh --disable_caching manim/scripts/4e/proba_calculer_fraction.py ProbaCalculerFraction4e -o eleveai-maths-4e-proba-calculer-fraction --media_dir manim/scripts/4e/media
# Puis copier le mp4 dans manim/sorties/4e/maths/probabilites/05-calculer-fraction/.

import math
import random
import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "seconde"))

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Notion6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

OR = "#FBBF24"
PAPIER = "#E5E7EB"
GRIS = "#9CA3AF"
BILLE_ROUGE = "#DC2626"
BILLE_BLEUE = "#2563EB"
BILLE_VERTE = "#16A34A"
GAGNANTS = (2, 7, 11, 16)  # les 4 tickets dorés parmi les 20


def P(x, y):
    return np.array([x, y, 0.0])


# ── les dessins communs (paysage et short) ──────────────────────────────────

def ticket(gagnant=False, s=1.0):
    """Un ticket de tombola : doré avec une étoile s'il gagne, blanc sinon."""
    fond = RoundedRectangle(width=0.66, height=0.38, corner_radius=0.06,
                            fill_color=OR if gagnant else PAPIER, fill_opacity=1,
                            stroke_color=ORANGE_RETENUE if gagnant else GRIS, stroke_width=2)
    trait = DashedLine(P(0.16, 0.16), P(0.16, -0.16), color=ORANGE_RETENUE if gagnant else GRIS,
                       stroke_width=1.5, dash_length=0.04)
    g = VGroup(fond, trait)
    if gagnant:
        g.add(Star(5, outer_radius=0.11, fill_color=WHITE, fill_opacity=1, stroke_width=0).move_to(P(-0.1, 0)))
    else:
        g.add(Line(P(-0.24, 0.05), P(0.04, 0.05), color=GRIS, stroke_width=2),
              Line(P(-0.24, -0.06), P(0.0, -0.06), color=GRIS, stroke_width=2))
    return g.scale(s)


def urne(larg=3.0, haut=2.6):
    """L'urne TRANSPARENTE de la tombola (on voit les tickets), fente sur le couvercle."""
    corps = RoundedRectangle(width=larg, height=haut, corner_radius=0.12,
                             fill_color="#E0F2FE", fill_opacity=0.10, stroke_color=WHITE, stroke_width=3)
    couv = RoundedRectangle(width=larg + 0.2, height=0.28, corner_radius=0.08,
                            fill_color=BLEU_CALCUL, fill_opacity=0.6, stroke_color=WHITE, stroke_width=2)
    couv.next_to(corps, UP, buff=0)
    fente = RoundedRectangle(width=larg * 0.4, height=0.08, corner_radius=0.04,
                             fill_color=BLACK, fill_opacity=1, stroke_width=0).move_to(couv)
    return VGroup(corps, couv, fente)


def places_urne(larg=3.0, haut=2.6, n=20, graine=2026):
    """n places en vrac dans l'urne, de bas en haut (5 par rangée)."""
    rng = random.Random(graine)
    places = []
    for k in range(n):
        r, c = divmod(k, 5)
        x = (c - 2) * larg * 0.18 + rng.uniform(-0.06, 0.06)
        y = -haut / 2 + 0.35 + r * (haut - 0.6) / 4 + rng.uniform(-0.05, 0.05)
        places.append((P(x, y), rng.uniform(-0.6, 0.6)))
    return places


POINTS_DE = {
    1: [(0, 0)],
    2: [(-1, 1), (1, -1)],
    3: [(-1, 1), (0, 0), (1, -1)],
    4: [(-1, 1), (1, 1), (-1, -1), (1, -1)],
    5: [(-1, 1), (1, 1), (0, 0), (-1, -1), (1, -1)],
    6: [(-1, 1), (1, 1), (-1, 0), (1, 0), (-1, -1), (1, -1)],
}


def de(face, cote=1.2):
    """Un dé DESSINÉ, vu de face : carré arrondi blanc, points noirs."""
    corps = RoundedRectangle(width=cote, height=cote, corner_radius=cote * 0.18,
                             fill_color=WHITE, fill_opacity=1, stroke_color=GREY_B, stroke_width=3)
    pts = VGroup(*[Dot(P(x * cote * 0.27, y * cote * 0.27), radius=cote * 0.085, color="#111827")
                   for x, y in POINTS_DE[face]])
    return VGroup(corps, pts)


def sac_vide(larg=2.2, haut=2.4):
    """Un sac TRANSPARENT (on voit les billes) fermé par un lien en haut."""
    corps = RoundedRectangle(width=larg, height=haut, corner_radius=larg * 0.3,
                             fill_color="#E0F2FE", fill_opacity=0.12, stroke_color=WHITE, stroke_width=3)
    col = Polygon(P(-larg * 0.22, haut / 2 - 0.05), P(larg * 0.22, haut / 2 - 0.05),
                  P(larg * 0.12, haut / 2 + 0.3), P(-larg * 0.12, haut / 2 + 0.3),
                  fill_color="#E0F2FE", fill_opacity=0.12, stroke_color=WHITE, stroke_width=3)
    lien = Line(P(-larg * 0.17, haut / 2 + 0.12), P(larg * 0.17, haut / 2 + 0.12),
                color=ORANGE_RETENUE, stroke_width=6)
    return VGroup(corps, col, lien)


def bille(couleur, r=0.24):
    b = Circle(radius=r, fill_color=couleur, fill_opacity=1, stroke_color=WHITE, stroke_width=2)
    reflet = Dot(radius=r * 0.22, color=WHITE).move_to(b.get_center() + P(-r * 0.35, r * 0.35)).set_opacity(0.7)
    return VGroup(b, reflet)


class Notion4e(Notion6e):
    identite = "Maths 4e — EleveAI"


class ProbaCalculerFraction4e(Notion4e):
    nom_voix = "4e-proba-calculer-fraction"

    def t(self, texte, font_size=36, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def ligne(self, morceaux, font_size=40, buff=0.24):
        return VGroup(*[self.t(m, font_size, c) for m, c in morceaux]).arrange(RIGHT, buff=buff)

    def insister(self, mob, run_time=0.45):
        self.play(mob.animate.scale(1.5), run_time=run_time)
        self.play(mob.animate.scale(1 / 1.5), run_time=run_time)

    def barrer(self, mob, color=ROUGE_ERREUR):
        return Line(mob.get_corner(DL) + LEFT * 0.1, mob.get_corner(UR) + RIGHT * 0.1,
                    stroke_width=7, color=color)

    def grille_tickets(self, centre, pas_x=0.85, pas_y=0.58, s=1.0):
        """Les 20 tickets en 4 rangées de 5, dans l'ordre (les dorés dispersés)."""
        g = VGroup()
        for k in range(20):
            r, c = divmod(k, 5)
            g.add(ticket(k in GAGNANTS, s).move_to(centre + P((c - 2) * pas_x, (1.5 - r) * pas_y)))
        return g

    def simplifier(self, f1, f2, texte):
        """Les deux « ÷ k » entre deux fractions égales, en haut et en bas."""
        d1 = self.t(texte, 28, ORANGE_RETENUE).move_to((f1[0].get_center() + f2[0].get_center()) / 2 + UP * 0.45)
        d2 = self.t(texte, 28, ORANGE_RETENUE).move_to((f1[2].get_center() + f2[2].get_center()) / 2 + DOWN * 0.45)
        return VGroup(d1, d2)

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("Calculer une probabilité", 54, JAUNE_TITRE).to_edge(UP, buff=0.7)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.25)
        ech = echelle_ceintures("orange").move_to(P(-0.6, -2.4))
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech))

        u = urne(2.4, 2.0).move_to(P(-3.6, 0.15))
        tk = VGroup(*[ticket(k % 3 == 0, 0.9) for k in range(6)])
        bases = [P(-4.3 + (k % 3) * 0.7, -0.35 + (k // 3) * 0.55) for k in range(6)]
        for b, p in zip(tk, bases):
            b.move_to(p)
        horloge = {"t": 0.0}

        def saute(g, dt):
            horloge["t"] += dt
            for k, (b, p) in enumerate(zip(g, bases)):
                b.move_to(p + UP * 0.12 * abs(math.sin(horloge["t"] * 3 + k * 1.3)))

        tk.add_updater(saute)
        self.play(FadeIn(u), LaggedStart(*[FadeIn(b, scale=0.5) for b in tk], lag_ratio=0.15), run_time=0.9)

        self.au_mot("Une fraction suffit")
        formule = VGroup(self.t("P =", 46),
                         self.fraction("favorables", "total", 42, JAUNE_TITRE)).arrange(RIGHT, buff=0.45)
        formule.move_to(P(2.0, 0.15))
        self.play(FadeIn(formule, shift=LEFT * 0.3), run_time=0.7)
        self.insister(formule[1], 0.4)
        self.attendre_voix(marge=1.2)
        tk.clear_updaters()

    # ── 01 : l'urne de la tombola ───────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.titre_ecran("La tombola de la kermesse")
        centre = P(-3.8, -0.3)
        u = urne(3.2, 2.8).move_to(centre)
        self.play(FadeIn(u, shift=DOWN * 0.2), run_time=0.6)
        places = places_urne(3.2, 2.8)

        self.au_mot("20 tickets")
        tickets = VGroup()
        for k in range(20):
            p, ang = places[k]
            tickets.add(ticket(False, 0.9).rotate(ang).move_to(centre + p + UP * 2.4).set_opacity(0))
        self.add(tickets)
        l20 = self.ligne([("20", JAUNE_TITRE), ("tickets", WHITE)], 44, 0.2).move_to(P(1.2, 1.5))
        self.play(LaggedStart(*[m.animate.set_opacity(1).move_to(centre + places[k][0])
                                for k, m in enumerate(tickets)], lag_ratio=0.08),
                  FadeIn(l20, shift=RIGHT * 0.2), run_time=1.6, rate_func=rate_functions.ease_out_bounce)

        self.au_mot("4 d'entre eux")
        dores = VGroup(*[ticket(True, 0.9).rotate(places[k][1]).move_to(tickets[k]) for k in GAGNANTS])
        l4 = VGroup(ticket(True, 1.2), self.t("4", 44, OR), self.t("gagnants", 40, OR)).arrange(RIGHT, buff=0.25)
        l4.move_to(P(1.4, 0.4))
        self.play(*[ReplacementTransform(tickets[k], d) for k, d in zip(GAGNANTS, dores)],
                  FadeIn(l4, shift=RIGHT * 0.2), run_time=0.8)
        for k, d in zip(GAGNANTS, dores):
            tickets.submobjects[k] = d
        self.play(*[Flash(d, color=OR, line_length=0.15, num_lines=8) for d in dores], run_time=0.6)

        self.au_mot("Tu en tires un")
        mystere = VGroup(ticket(False, 1.6).set_fill(GRIS), self.t("?", 34, BLACK))
        mystere[1].move_to(mystere[0])
        mystere.move_to(centre + UP * 0.6)
        self.play(FadeIn(mystere, scale=0.5), run_time=0.3)
        self.play(mystere.animate.move_to(P(1.2, -0.8)), run_time=0.7)
        self.play(Wiggle(mystere), run_time=0.6)

        self.au_mot("Quelle est ta chance")
        self.play(Write(self.chute("Quelle chance de gagner ?", color=OR, font_size=42)))
        self.attendre_voix()

    # ── 02 : favorables sur total ───────────────────────────────────────────

    def ecran_methode(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-methode")
        self.titre_ecran("Favorables sur total")
        rang = VGroup(*[ticket(k in GAGNANTS, 0.85).move_to(P(-5.6 + (k % 10) * 0.72, 2.2 - (k // 10) * 0.5))
                        for k in range(20)])
        self.play(LaggedStart(*[FadeIn(b, shift=DOWN * 0.3) for b in rang], lag_ratio=0.04), run_time=1.0)

        self.au_mot("la même chance")
        self.play(*[Wiggle(b, scale_value=1.3) for b in rang], run_time=1.0)
        self.au_mot("équiprobables")
        eq = self.t("issues équiprobables : chaque ticket a la même chance", 30, BLEU_CALCUL).move_to(P(-0.9, 1.05))
        self.play(FadeIn(eq), run_time=0.6)

        self.au_mot("Alors la probabilité")
        formule = VGroup(self.t("P =", 46),
                         self.fraction("nombre d'issues favorables", "nombre total d'issues", 34))
        formule.arrange(RIGHT, buff=0.3).move_to(P(-1.2, -0.9))
        self.play(FadeIn(formule[0]), Write(formule[1]), run_time=1.2)
        self.au_mot("le nombre d'issues favorables")
        self.play(Indicate(formule[1][0], color=OR, scale_factor=1.15),
                  *[Indicate(rang[k], color=OR) for k in GAGNANTS], run_time=0.9)
        self.au_mot("le nombre total")
        self.play(Indicate(formule[1][2], color=JAUNE_TITRE, scale_factor=1.15),
                  Wiggle(rang), run_time=0.9)
        self.play(Create(SurroundingRectangle(formule, color=VERT_OK, buff=0.2, stroke_width=4)), run_time=0.5)
        self.attendre_voix()

    # ── 03 : 4/20 = 1/5 ─────────────────────────────────────────────────────

    def ecran_calcul(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-calcul")
        self.titre_ecran("La chance de gagner")
        g = self.grille_tickets(P(-3.6, 0.3), 1.1, 0.75, 1.35)
        self.play(LaggedStart(*[FadeIn(b, scale=0.5) for b in g], lag_ratio=0.04), run_time=0.9)

        pe = self.t("P =", 60).move_to(P(0.9, 0.3))
        xn = 2.4
        num = self.t("4", 76, OR).move_to(P(xn, 0.92))
        barre = Line(P(xn - 0.6, 0.3), P(xn + 0.6, 0.3), stroke_width=5)
        den = self.t("20", 76).move_to(P(xn, -0.34))

        self.au_mot("4 tickets gagnants")
        copies = VGroup(*[g[k].copy() for k in GAGNANTS])
        self.play(*[g[k].animate.shift(UP * 0.15) for k in GAGNANTS], FadeIn(pe), run_time=0.3)
        self.play(LaggedStart(*[MoveAlongPath(c, ArcBetweenPoints(c.get_center(), num.get_center(), angle=-PI / 3))
                                for c in copies], lag_ratio=0.15),
                  *[g[k].animate.shift(DOWN * 0.15) for k in GAGNANTS], run_time=1.0)
        self.play(ReplacementTransform(copies, num), run_time=0.4)

        self.au_mot("sur 20 tickets")
        tous = g.copy()
        self.play(LaggedStart(*[b.animate.move_to(den.get_center()).scale(0.5) for b in tous], lag_ratio=0.04),
                  Create(barre), run_time=1.1)
        self.play(ReplacementTransform(tous, den), run_time=0.4)

        self.au_mot("4 sur 20")
        f1 = VGroup(num, barre, den)
        self.insister(f1, 0.4)

        self.au_mot("On simplifie par 4")
        egal = self.t("=", 64).move_to(P(3.75, 0.3))
        f2 = self.fraction(1, 5, 76, VERT_OK).move_to(P(4.9, 0.3))
        div = self.simplifier(f1, f2, "÷ 4")
        self.play(FadeIn(div), FadeIn(egal), run_time=0.5)

        self.au_mot("1 sur 5")
        self.play(FadeIn(f2, shift=LEFT * 0.2), run_time=0.5)
        # les 20 tickets se rangent : un doré par rangée de 5
        ordre = []
        autres = [k for k in range(20) if k not in GAGNANTS]
        for r in range(4):
            ordre.append(GAGNANTS[r])
            ordre.extend(autres[4 * r:4 * r + 4])
        cible = self.grille_tickets(P(-3.6, 0.3), 1.1, 0.75, 1.35)
        self.play(*[g[k].animate.move_to(cible[i]) for i, k in enumerate(ordre)], run_time=1.0)
        cadres = VGroup(*[SurroundingRectangle(VGroup(*[g[k] for k in ordre[5 * r:5 * r + 5]]),
                                               color=VERT_OK, buff=0.07, stroke_width=3) for r in range(4)])
        self.play(LaggedStart(*[Create(c) for c in cadres], lag_ratio=0.2), run_time=0.8)
        self.insister(f2, 0.4)

        self.au_mot("Tu as 1 chance sur 5")
        self.play(Write(self.chute("1 chance sur 5 de gagner", color=VERT_OK, font_size=44)))
        self.attendre_voix()

    # ── 04 : le dé ──────────────────────────────────────────────────────────

    def ecran_de(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-de")
        self.titre_ecran("Avec un dé")
        des = VGroup(*[de(f, 1.0) for f in range(1, 7)]).arrange(RIGHT, buff=0.45).move_to(P(-1.2, 1.9))
        self.play(LaggedStart(*[FadeIn(d, shift=DOWN * 0.4, scale=0.6) for d in des], lag_ratio=0.15),
                  run_time=1.0)

        self.au_mot("obtenir un multiple de 3")
        q = self.t("obtenir un multiple de 3", 36, BLEU_CALCUL).move_to(P(-1.2, 0.85))
        self.play(FadeIn(q, shift=UP * 0.2), run_time=0.5)

        self.au_mot("3 et 6")
        cadres = VGroup(*[SurroundingRectangle(des[i], color=VERT_OK, buff=0.1, stroke_width=5) for i in (2, 5)])
        self.play(Create(cadres), *[des[i].animate.shift(UP * 0.2) for i in (2, 5)], run_time=0.5)
        self.play(*[des[i].animate.shift(DOWN * 0.2) for i in (2, 5)], run_time=0.3)

        yb = -1.0
        pe = self.t("P =", 52).move_to(P(-4.4, yb))
        xn = -3.0
        num = self.t("2", 66, VERT_OK).move_to(P(xn, yb + 0.55))
        barre = Line(P(xn - 0.45, yb), P(xn + 0.45, yb), stroke_width=5)
        den = self.t("6", 66).move_to(P(xn, yb - 0.57))

        self.au_mot("il y en a 2")
        copies = VGroup(des[2].copy(), des[5].copy())
        self.play(FadeIn(pe), *[c.animate.scale(0.4).move_to(num) for c in copies], run_time=0.8)
        self.play(ReplacementTransform(copies, num), run_time=0.3)

        self.au_mot("Sur 6 faces")
        tous = des.copy()
        self.play(Create(barre), LaggedStart(*[d.animate.scale(0.3).move_to(den) for d in tous], lag_ratio=0.08),
                  run_time=0.9)
        self.play(ReplacementTransform(tous, den), run_time=0.3)

        self.au_mot("2 sur 6")
        f1 = VGroup(num, barre, den)
        self.insister(f1, 0.4)

        self.au_mot("1 sur 3")
        egal = self.t("=", 56).move_to(P(-1.7, yb))
        f2 = self.fraction(1, 3, 66, VERT_OK).move_to(P(-0.5, yb))
        div = self.simplifier(f1, f2, "÷ 2")
        self.play(FadeIn(egal), FadeIn(div), FadeIn(f2, shift=LEFT * 0.2), run_time=0.6)
        self.insister(f2, 0.4)
        self.play(Create(SurroundingRectangle(f2, color=VERT_OK, buff=0.15)), run_time=0.4)
        self.attendre_voix()

    # ── 05 : le piège ───────────────────────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-piege")
        self.titre_ecran("Le piège")
        self.au_mot("diviser par les autres")
        cat = self.t("diviser par les autres ?", 34, ROUGE_ERREUR).move_to(P(-1.0, 2.45))
        self.play(FadeIn(cat), run_time=0.5)

        self.au_mot("4 gagnants")
        dores = VGroup(*[ticket(True, 0.95) for _ in range(4)]).arrange_in_grid(2, 2, buff=0.12).move_to(P(-5.0, 0.6))
        l4 = self.ligne([("4", OR), ("gagnants", OR)], 32, 0.15).next_to(dores, DOWN, buff=0.25)
        self.play(LaggedStart(*[FadeIn(b, scale=0.5) for b in dores], lag_ratio=0.15), FadeIn(l4), run_time=0.7)

        self.au_mot("16 perdants")
        blancs = VGroup(*[ticket(False, 0.95) for _ in range(16)]).arrange_in_grid(4, 4, buff=0.1).move_to(P(-1.9, 0.6))
        l16 = self.ligne([("16", WHITE), ("perdants", WHITE)], 32, 0.15).next_to(blancs, DOWN, buff=0.25)
        l4.set_y(l16.get_y())
        self.play(LaggedStart(*[FadeIn(b, scale=0.5) for b in blancs], lag_ratio=0.04), FadeIn(l16), run_time=0.8)

        self.au_mot("n'est pas 4 sur 16")
        faux = VGroup(self.t("P =", 44, ROUGE_ERREUR), self.fraction(4, 16, 52, ROUGE_ERREUR)).arrange(RIGHT, buff=0.25)
        faux.move_to(P(2.6, 1.0))
        self.play(FadeIn(faux, shift=LEFT * 0.2), Indicate(blancs, color=ROUGE_ERREUR), run_time=0.7)
        barre = self.barrer(faux)
        self.play(Create(barre), run_time=0.4)
        self.play(Wiggle(VGroup(faux, barre)), run_time=0.5)

        self.au_mot("C'est 4 sur 20")
        bon = VGroup(self.t("P =", 44, VERT_OK), self.fraction(4, 20, 52, VERT_OK)).arrange(RIGHT, buff=0.25)
        bon.move_to(P(2.6, -1.3))
        self.play(FadeIn(bon, shift=UP * 0.2), run_time=0.5)

        self.au_mot("20 tickets en tout")
        tout = VGroup(dores, blancs)
        yc = l16.get_bottom()[1] - 0.25
        g, d = P(tout.get_left()[0], yc), P(tout.get_right()[0], yc)
        crochet = VGroup(Line(g, d), Line(g, g + UP * 0.2), Line(d, d + UP * 0.2)).set_stroke(VERT_OK, 4)
        l20 = self.ligne([("20", VERT_OK), ("tickets en tout", VERT_OK)], 34, 0.15).next_to(crochet, DOWN, buff=0.2)
        self.play(Create(crochet), FadeIn(l20), Indicate(bon[1][2], color=VERT_OK, scale_factor=1.4), run_time=0.8)
        self.play(Create(SurroundingRectangle(bon, color=VERT_OK, buff=0.15)), run_time=0.4)
        self.attendre_voix()

    # ── 06 : entre 0 et 1 ───────────────────────────────────────────────────

    def ecran_bornes(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-bornes")
        self.titre_ecran("Toujours entre 0 et 1")
        x0, x1, y = -5.5, 2.5, 0.6
        axe = Line(P(x0, y), P(x1, y), stroke_width=6, color=VERT_OK)
        t0 = Line(P(x0, y - 0.2), P(x0, y + 0.2), stroke_width=5)
        t1 = Line(P(x1, y - 0.2), P(x1, y + 0.2), stroke_width=5)
        self.au_mot("entre 0 et 1")
        z = self.t("0", 56).next_to(t0, DOWN, buff=0.2)
        u = self.t("1", 56).next_to(t1, DOWN, buff=0.2)
        self.play(Create(axe), FadeIn(t0), FadeIn(t1), FadeIn(z, scale=1.5), FadeIn(u, scale=1.5), run_time=0.9)
        # les deux probabilités de la vidéo, à leur place
        for (n, d), dessin in [((1, 5), ticket(True, 1.1)), ((1, 3), de(3, 0.6))]:
            x = x0 + (x1 - x0) * n / d
            pt = Dot(P(x, y), radius=0.12, color=JAUNE_TITRE)
            fr = self.fraction(n, d, 32, JAUNE_TITRE).next_to(pt, DOWN, buff=0.3)
            dessin.next_to(pt, UP, buff=0.25)
            self.play(FadeIn(pt, scale=2), FadeIn(fr), FadeIn(dessin, shift=DOWN * 0.2), run_time=0.5)

        self.au_mot("plus que 1")
        rouge = DashedLine(P(x1, y), P(x1 + 2.3, y), stroke_width=6, color=ROUGE_ERREUR, dash_length=0.15)
        croix = VGroup(Line(P(-0.25, -0.25), P(0.25, 0.25)), Line(P(-0.25, 0.25), P(0.25, -0.25))).set_stroke(
            ROUGE_ERREUR, 8).move_to(P(x1 + 1.3, y))
        self.play(Create(rouge), run_time=0.5)
        self.au_mot("il y a une erreur")
        err = self.t("plus que 1 : erreur !", 34, ROUGE_ERREUR).move_to(P(x1 + 1.3, y + 0.85))
        self.play(Create(croix), FadeIn(err, shift=UP * 0.2), run_time=0.5)
        self.play(Wiggle(VGroup(croix, err)), run_time=0.6)
        self.play(Write(self.chute("Une probabilité est entre 0 et 1.", color=VERT_OK, font_size=40)))
        self.attendre_voix()

    # ── 07 : défi ───────────────────────────────────────────────────────────

    def sac_billes(self, centre):
        s = sac_vide(3.0, 2.8).move_to(centre)
        rng = random.Random(44)
        couleurs = [BILLE_ROUGE] * 5 + [BILLE_BLEUE] * 4 + [BILLE_VERTE] * 3
        rng.shuffle(couleurs)
        billes = VGroup()
        for k, c in enumerate(couleurs):
            r, col = divmod(k, 4)
            billes.add(bille(c, 0.26).move_to(centre + P((col - 1.5) * 0.62 + rng.uniform(-0.05, 0.05),
                                                         -0.85 + r * 0.6 + rng.uniform(-0.04, 0.04))))
        return s, billes, couleurs

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        centre = P(-4.0, 0.1)
        s, billes, couleurs = self.sac_billes(centre)
        self.au_mot("Un sac de 12 billes")
        l12 = self.ligne([("12", JAUNE_TITRE), ("billes", WHITE)], 40, 0.18).move_to(P(0.3, 2.0))
        self.play(FadeIn(s), FadeIn(l12), run_time=0.5)
        for extrait, coul, n, nom, y in [("5 rouges", BILLE_ROUGE, "5", "rouges", 1.1),
                                         ("4 bleues", BILLE_BLEUE, "4", "bleues", 0.3),
                                         ("3 vertes", BILLE_VERTE, "3", "vertes", -0.5)]:
            self.au_mot(extrait)
            lot = VGroup(*[b for b, c in zip(billes, couleurs) if c == coul])
            lbl = VGroup(bille(coul, 0.26), self.t(n, 40, JAUNE_TITRE), self.t(nom, 38, WHITE)).arrange(RIGHT, buff=0.25)
            lbl.move_to(P(0.3, y))
            self.play(LaggedStart(*[FadeIn(b, shift=DOWN * 1.5) for b in lot], lag_ratio=0.15),
                      FadeIn(lbl, shift=RIGHT * 0.2), run_time=0.7, rate_func=rate_functions.ease_out_bounce)
        self.au_mot("tirer une bille bleue")
        q = self.t("Probabilité de tirer une bille bleue ?", 36, BLEU_CALCUL).move_to(P(-0.8, -1.65))
        self.play(FadeIn(q, shift=UP * 0.2), run_time=0.6)
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=40)))
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("07b-correction")
        self.titre_ecran("Correction")
        centre = P(-4.0, 0.0)
        s, billes, couleurs = self.sac_billes(centre)
        self.add(s, billes)
        bleues = VGroup(*[b for b, c in zip(billes, couleurs) if c == BILLE_BLEUE])

        yb = 0.0
        pe = self.t("P =", 52).move_to(P(-0.6, yb))
        xn = 0.9
        num = self.t("4", 66, BILLE_BLEUE).move_to(P(xn, yb + 0.57))
        barre = Line(P(xn - 0.55, yb), P(xn + 0.55, yb), stroke_width=5)
        den = self.t("12", 66).move_to(P(xn, yb - 0.57))

        self.au_mot("4 billes bleues")
        copies = bleues.copy()
        self.play(*[b.animate.shift(UP * 0.2) for b in bleues], FadeIn(pe), run_time=0.3)
        self.play(LaggedStart(*[c.animate.move_to(num).scale(0.5) for c in copies], lag_ratio=0.12),
                  *[b.animate.shift(DOWN * 0.2) for b in bleues], run_time=0.8)
        self.play(ReplacementTransform(copies, num), run_time=0.3)

        self.au_mot("sur 12 billes")
        tous = billes.copy()
        self.play(Create(barre), LaggedStart(*[b.animate.move_to(den).scale(0.4) for b in tous], lag_ratio=0.05),
                  run_time=0.9)
        self.play(ReplacementTransform(tous, den), run_time=0.3)

        self.au_mot("4 sur 12")
        f1 = VGroup(num, barre, den)
        self.insister(f1, 0.4)

        self.au_mot("On simplifie par 4")
        egal = self.t("=", 56).move_to(P(2.2, yb))
        f2 = self.fraction(1, 3, 66, VERT_OK).move_to(P(3.4, yb))
        div = self.simplifier(f1, f2, "÷ 4")
        self.play(FadeIn(egal), FadeIn(div), run_time=0.5)
        self.au_mot("1 sur 3")
        self.play(FadeIn(f2, shift=LEFT * 0.2), run_time=0.4)
        self.insister(f2, 0.4)
        self.play(Create(SurroundingRectangle(f2, color=VERT_OK, buff=0.15)), run_time=0.4)
        self.attendre_voix()

    # ── 08 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)))
        l1 = VGroup(self.coche(), self.t("Issues équiprobables :", 34), self.t("P =", 34),
                    self.fraction("favorables", "total", 30, JAUNE_TITRE))
        l2 = VGroup(self.coche(), self.t("On divise par le total, pas par les autres", 34))
        lignes = VGroup(l1, l2)
        for l in lignes:
            l.arrange(RIGHT, buff=0.3)
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.7)
        if lignes.width > 10.0:
            lignes.scale_to_fit_width(10.0)
        lignes.move_to(P(-0.9, 0.7))
        for mot, l in zip(["Quand les issues", "On divise par le total"], lignes):
            self.au_mot(mot)
            self.play(FadeIn(l[1:], shift=RIGHT * 0.2), run_time=0.6)
            self.play(Create(l[0]), run_time=0.4)
        self.au_mot("L'épisode 6")
        self.play(Write(self.chute("Épisode 6 : une probabilité en pourcentage", color=VERT_OK, font_size=38)))
        self.attendre_voix(marge=1.0)

    # ── déroulé ─────────────────────────────────────────────────────────────

    def construct(self):
        self.page_garde()
        self.ecran_situation()
        self.ecran_methode()
        self.ecran_calcul()
        self.ecran_de()
        self.ecran_piege()
        self.ecran_bornes()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="09-abonne")
