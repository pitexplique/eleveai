# proba_calculer.py
# EleveAI — Maths 3e — Probabilités, épisode 5 : calculer une probabilité
# (micro : proba_calculer), AVEC VOIX. Paysage 16:9, CEINTURE VERTE.
# Short jumeau (ceinture jaune) : proba_calculer_short.py.
#
# ⭐ LE DESSIN QUI PORTE TOUT : un paquet de 12 bonbons emballés — 4 citron
# (jaunes), 5 fraise (roses), 3 menthe (verts). Les 5 roses SAUTENT au
# numérateur, les 12 au dénominateur : 5/12.
# Écrans : 00 garde · 01 le paquet · 02 favorables sur total · 03 les trois
# écritures (bande en 4) · 04 la bande de longueur 1 (4/12 + 5/12 + 3/12 = 1) ·
# 05 le tableau à double entrée (7 sur 28) · 06 le piège « 3 parfums → 1/3 » ·
# 07 défi : 14 maillots, multiples de 4 → 3/14 · 08 ce que tu as appris.
#
# Voix : manim/voix/3e-proba-calculer.json (débit −7).
# Rendu : python -m manim render -qh --disable_caching manim/scripts/3e/proba_calculer.py ProbaCalculer3e -o eleveai-maths-3e-proba-calculer --media_dir manim/scripts/3e/media
# Puis copier le mp4 dans manim/sorties/3e/maths/probabilites/05-calculer/.

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

CITRON = "#FACC15"
FRAISE = "#F472B6"
MENTHE = "#34D399"
GRIS = "#9CA3AF"
PARFUMS = [CITRON] * 4 + [FRAISE] * 5 + [MENTHE] * 3


def P(x, y):
    return np.array([x, y, 0.0])


# ── les dessins communs (paysage et short) ──────────────────────────────────

def bonbon(couleur, s=1.0):
    """Un bonbon EMBALLÉ : le corps ovale, les deux papillotes, un reflet."""
    corps = Ellipse(width=0.52, height=0.34, fill_color=couleur, fill_opacity=1,
                    stroke_color=WHITE, stroke_width=2)
    pg = Polygon(P(-0.22, 0), P(-0.46, 0.17), P(-0.42, 0), P(-0.46, -0.17),
                 fill_color=couleur, fill_opacity=0.75, stroke_color=WHITE, stroke_width=1.5)
    pd = pg.copy().rotate(PI, about_point=ORIGIN)
    reflet = Ellipse(width=0.18, height=0.07, fill_color=WHITE, fill_opacity=0.6,
                     stroke_width=0).move_to(P(-0.06, 0.08))
    return VGroup(pg, pd, corps, reflet).scale(s)


def sachet(larg=3.0, haut=3.4):
    """Le paquet TRANSPARENT (on voit les bonbons), fermé par une bande dentelée."""
    corps = RoundedRectangle(width=larg, height=haut, corner_radius=0.2,
                             fill_color="#E0F2FE", fill_opacity=0.10, stroke_color=WHITE, stroke_width=3)
    y0 = haut / 2
    n = 10
    pts = [P(-larg / 2, y0)]
    for k in range(n + 1):
        x = -larg / 2 + larg * k / n
        pts.append(P(x, y0 + (0.32 if k % 2 == 0 else 0.2)))
    pts.append(P(larg / 2, y0))
    bande = Polygon(*pts, fill_color=BLEU_CALCUL, fill_opacity=0.55, stroke_color=WHITE, stroke_width=2)
    return VGroup(corps, bande)


def places_sachet(larg=3.0, haut=3.4, s=1.0):
    """Douze places dans le paquet, de bas en haut (3 par rangée, un peu de désordre)."""
    rng = random.Random(512)
    places = []
    for r in range(4):
        for c in range(3):
            x = (c - 1) * larg * 0.29 + rng.uniform(-0.07, 0.07)
            y = -haut / 2 + 0.42 * s + r * (haut - 0.6) / 4 + rng.uniform(-0.05, 0.05)
            places.append((P(x, y), rng.uniform(-0.5, 0.5)))
    return places


def maillot(numero, s=1.0, couleur=BLEU_CALCUL):
    """Un maillot de sport numéroté."""
    forme = Polygon(P(-0.18, 0.45), P(-0.45, 0.36), P(-0.62, 0.06), P(-0.43, -0.05), P(-0.33, 0.12),
                    P(-0.33, -0.48), P(0.33, -0.48), P(0.33, 0.12), P(0.43, -0.05), P(0.62, 0.06),
                    P(0.45, 0.36), P(0.18, 0.45), P(0, 0.3),
                    fill_color=couleur, fill_opacity=0.9, stroke_color=WHITE, stroke_width=2)
    num = Text(str(numero), font_size=30, color=WHITE, weight=BOLD).move_to(P(0, -0.1))
    return VGroup(forme, num).scale(s)


def eleve(couleur=GRIS, s=1.0):
    tete = Circle(radius=0.08, fill_color=couleur, fill_opacity=1, stroke_width=0).move_to(P(0, 0.1))
    corps = RoundedRectangle(width=0.24, height=0.18, corner_radius=0.08, fill_color=couleur,
                             fill_opacity=1, stroke_width=0).move_to(P(0, -0.08))
    return VGroup(tete, corps).scale(s)


class Notion3e(Notion6e):
    identite = "Maths 3e — EleveAI"


class ProbaCalculer3e(Notion3e):
    nom_voix = "3e-proba-calculer"

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

    def rangee(self, y, x0=-5.2, pas=0.78, s=0.8):
        """Les 12 bonbons en ligne : 4 citron, 5 fraise, 3 menthe."""
        return VGroup(*[bonbon(c, s).move_to(P(x0 + i * pas, y)) for i, c in enumerate(PARFUMS)])

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("Calculer une probabilité", 54, JAUNE_TITRE).to_edge(UP, buff=0.7)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.25)
        ech = echelle_ceintures("verte").move_to(P(-0.6, -2.4))
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech))

        trio = VGroup(*[bonbon(c, 1.5) for c in (CITRON, FRAISE, MENTHE)])
        bases = [P(-4.6, 0.4), P(-3.0, 0.4), P(-1.4, 0.4)]
        for b, p in zip(trio, bases):
            b.move_to(p)
        horloge = {"t": 0.0}

        def danse(g, dt):
            horloge["t"] += dt
            tt = horloge["t"]
            for k, (b, p) in enumerate(zip(g, bases)):
                b.move_to(p + UP * 0.18 * abs(math.sin(tt * 3 + k * 1.1)))

        trio.add_updater(danse)
        self.play(LaggedStart(*[FadeIn(b, scale=0.5) for b in trio], lag_ratio=0.3), run_time=0.9)

        self.au_mot("En un seul calcul")
        formule = VGroup(self.t("P =", 46),
                         self.fraction("favorables", "total", 42, JAUNE_TITRE)).arrange(RIGHT, buff=0.3)
        formule.move_to(P(2.6, 0.4))
        self.play(FadeIn(formule, shift=LEFT * 0.3), run_time=0.7)
        self.insister(formule[1], 0.4)
        self.attendre_voix(marge=1.2)
        trio.clear_updaters()

    # ── 01 : le paquet ──────────────────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.titre_ecran("Un paquet de bonbons")
        centre = P(-4.0, -0.35)
        sac = sachet(3.0, 3.4).move_to(centre)
        self.play(FadeIn(sac, shift=DOWN * 0.2), run_time=0.6)
        places = places_sachet(3.0, 3.4)
        self.bonbons = VGroup()

        groupes = [("4 bonbons au citron", CITRON, "4", "citron", 0, 4, 1.6),
                   ("5 à la fraise", FRAISE, "5", "fraise", 4, 9, 0.75),
                   ("3 à la menthe", MENTHE, "3", "menthe", 9, 12, -0.1)]
        for extrait, coul, n, nom, a, b, y in groupes:
            self.au_mot(extrait)
            neufs = VGroup()
            for k in range(a, b):
                p, ang = places[k]
                neufs.add(bonbon(coul, 0.72).rotate(ang).move_to(centre + p + UP * 2.6).set_opacity(0))
            self.add(neufs)
            lbl = VGroup(bonbon(coul, 0.9), self.t(n, 44, JAUNE_TITRE), self.t(nom, 40, coul)).arrange(RIGHT, buff=0.3)
            lbl.move_to(P(0.6, y), aligned_edge=LEFT).shift(LEFT * 1.0)
            self.play(LaggedStart(*[m.animate.set_opacity(1).move_to(centre + places[a + i][0])
                                    for i, m in enumerate(neufs)], lag_ratio=0.2),
                      FadeIn(lbl, shift=RIGHT * 0.2), run_time=1.0, rate_func=rate_functions.ease_out_bounce)
            self.bonbons.add(*neufs)

        self.au_mot("Les yeux fermés")
        oeil = VGroup(Arc(radius=0.55, start_angle=PI + 0.3, angle=PI - 0.6, stroke_width=6, color=WHITE))
        for a in np.linspace(PI + 0.55, 2 * PI - 0.55, 4):
            p = P(0.55 * math.cos(a), 0.55 * math.sin(a))
            oeil.add(Line(p, p * 1.35, stroke_width=4, color=WHITE))
        oeil.move_to(P(1.4, -1.5))
        self.play(Create(oeil), run_time=0.6)

        self.au_mot("tu en prends un")
        mystere = VGroup(bonbon(GRIS, 1.3), self.t("?", 34, BLACK)).move_to(centre + UP * 0.2)
        mystere[1].move_to(mystere[0][2])
        self.play(FadeIn(mystere, scale=0.5), run_time=0.3)
        self.play(mystere.animate.move_to(P(-4.0, 2.05)), run_time=0.7)
        self.play(Wiggle(mystere), run_time=0.7)

        self.au_mot("Quelle chance")
        self.play(Write(self.chute("Quelle chance d'avoir la fraise ?", color=FRAISE, font_size=40)))
        self.attendre_voix()

    # ── 02 : favorables sur total ───────────────────────────────────────────

    def ecran_formule(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-formule")
        self.titre_ecran("Favorables sur total")
        rang = self.rangee(2.05)
        self.play(LaggedStart(*[FadeIn(b, shift=DOWN * 0.3) for b in rang], lag_ratio=0.08), run_time=1.0)

        self.au_mot("équiprobables")
        eq = self.t("issues équiprobables : chaque bonbon a la même chance", 30, BLEU_CALCUL).move_to(P(-1.0, 1.2))
        self.play(FadeIn(eq), *[Wiggle(b, scale_value=1.25) for b in rang], run_time=1.0)

        self.au_mot("la probabilité, c'est")
        formule = VGroup(self.t("P =", 42),
                         self.fraction("nombre d'issues favorables", "nombre total d'issues", 30))
        formule.arrange(RIGHT, buff=0.3).to_edge(LEFT, buff=0.45).set_y(-0.65)
        self.play(FadeIn(formule[0]), Write(formule[1]), run_time=1.2)
        self.au_mot("favorables sur")
        self.play(Indicate(formule[1][0], color=FRAISE, scale_factor=1.15), run_time=0.7)
        self.au_mot("nombre total")
        self.play(Indicate(formule[1][2], color=JAUNE_TITRE, scale_factor=1.15), run_time=0.7)

        egal = self.t("=", 54).next_to(formule, RIGHT, buff=0.45)
        xn = egal.get_x() + 1.2
        num = self.t("5", 72, FRAISE).move_to(P(xn, -0.05))
        barre = Line(P(xn - 0.55, -0.62), P(xn + 0.55, -0.62), stroke_width=5)
        den = self.t("12", 72, WHITE).move_to(P(xn, -1.2))

        self.au_mot("5 bonbons à la fraise")
        roses = VGroup(*[rang[i].copy() for i in range(4, 9)])
        self.play(LaggedStart(*[MoveAlongPath(b, ArcBetweenPoints(b.get_center(), num.get_center(), angle=-PI / 3))
                                for b in roses], lag_ratio=0.15),
                  *[rang[i].animate.shift(UP * 0.25) for i in range(4, 9)], FadeIn(egal), run_time=1.1)
        self.play(ReplacementTransform(roses, num), *[rang[i].animate.shift(DOWN * 0.25) for i in range(4, 9)],
                  run_time=0.5)

        self.au_mot("12 en tout")
        tous = VGroup(*[b.copy() for b in rang])
        self.play(LaggedStart(*[b.animate.move_to(den.get_center()).scale(0.6) for b in tous], lag_ratio=0.06),
                  Create(barre), run_time=1.1)
        self.play(ReplacementTransform(tous, den), run_time=0.5)

        self.au_mot("5 sur 12")
        frac = VGroup(num, barre, den)
        self.insister(frac, 0.4)
        self.play(Create(SurroundingRectangle(frac, color=VERT_OK, buff=0.2, stroke_width=4)), run_time=0.5)
        self.attendre_voix()

    # ── 03 : les trois écritures ────────────────────────────────────────────

    def ecran_ecritures(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-ecritures")
        self.titre_ecran("Trois écritures, un seul nombre")
        x0, L, y = -4.6, 8.0, 1.3
        cases = VGroup(*[Rectangle(width=L / 4, height=0.9, stroke_color=WHITE, stroke_width=3)
                         .move_to(P(x0 + L / 8 + i * L / 4, y)) for i in range(4)])
        zero = self.t("0", 30).move_to(P(x0, y - 0.8))
        un = self.t("1", 30).move_to(P(x0 + L, y - 0.8))
        self.play(Create(cases), FadeIn(zero), FadeIn(un), run_time=1.0)

        yb = -0.9
        self.au_mot("1 sur 4")
        f = self.fraction(1, 4, 64, JAUNE_TITRE).move_to(P(-4.0, yb))
        self.play(cases[0].animate.set_fill(BLEU_CALCUL, 0.85), FadeIn(f, shift=UP * 0.2), run_time=0.6)
        self.insister(cases[0], 0.35)

        self.au_mot("c'est 0,25")
        e1 = self.t("=", 60).move_to(P(-2.5, yb))
        dec = self.t("0,25", 64, BLEU_CALCUL).move_to(P(-0.9, yb))
        tick = Line(P(x0 + L / 4, y - 0.55), P(x0 + L / 4, y - 0.95), stroke_width=3)
        petit = self.t("0,25", 28, BLEU_CALCUL).next_to(tick, DOWN, buff=0.08)
        self.play(FadeIn(e1), FadeIn(dec, shift=UP * 0.2), Create(tick), FadeIn(petit), run_time=0.6)

        self.au_mot("25 pour cent")
        e2 = self.t("=", 60).move_to(P(0.7, yb))
        pc = self.t("25 %", 64, VERT_OK).move_to(P(2.4, yb))
        haut = self.t("25 %", 30, VERT_OK).next_to(cases[0], UP, buff=0.15)
        self.play(FadeIn(e2), FadeIn(pc, shift=UP * 0.2), FadeIn(haut), run_time=0.6)
        self.insister(VGroup(f, e1, dec, e2, pc), 0.4)
        self.play(Write(self.chute("Fraction, décimal, pourcentage : le même nombre.", color=BLEU_CALCUL,
                                   font_size=34)))
        self.attendre_voix()

    # ── 04 : la somme fait 1 ────────────────────────────────────────────────

    def ecran_somme(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-somme")
        self.titre_ecran("La somme fait toujours 1")
        c, y, gap = 0.7, 0.85, 0.6
        tailles = [(4, CITRON, "Citron"), (5, FRAISE, "Fraise :"), (3, MENTHE, "Menthe :")]
        x = -0.6 - (12 * c + 2 * gap) / 2
        morceaux, fracs = [], []
        for n, coul, extrait in tailles:
            self.au_mot(extrait)
            m = VGroup(*[Square(c, stroke_color=WHITE, stroke_width=2, fill_color=coul, fill_opacity=0.85)
                         .move_to(P(x + c / 2 + i * c, y)) for i in range(n)])
            fr = self.fraction(n, 12, 40, coul).next_to(m, UP, buff=0.3)
            self.play(LaggedStart(*[GrowFromCenter(q) for q in m], lag_ratio=0.12),
                      FadeIn(fr, shift=DOWN * 0.15), run_time=0.8)
            morceaux.append(m)
            fracs.append(fr)
            x += n * c + gap

        self.au_mot("Le total fait")
        self.play(VGroup(morceaux[1], fracs[1]).animate.shift(LEFT * gap),
                  VGroup(morceaux[2], fracs[2]).animate.shift(LEFT * 2 * gap), run_time=0.6)
        self.play(*[VGroup(m, f).animate.shift(RIGHT * gap) for m, f in zip(morceaux, fracs)], run_time=0.4)
        plus = VGroup(*[self.t("+", 44).move_to((fracs[i].get_center() + fracs[i + 1].get_center()) / 2)
                        for i in range(2)])
        bande = VGroup(*morceaux)
        g, d = bande.get_corner(DL) + DOWN * 0.25, bande.get_corner(DR) + DOWN * 0.25
        crochet = VGroup(Line(g, d), Line(g, g + UP * 0.2), Line(d, d + UP * 0.2)).set_stroke(WHITE, 3)
        self.play(FadeIn(plus), Create(crochet), run_time=0.5)

        self.au_mot("12 sur 12")
        douze = self.fraction(12, 12, 48).move_to(P(-1.6, -1.0))
        self.play(FadeIn(douze, shift=UP * 0.2), run_time=0.5)
        self.au_mot("c'est 1")
        un = self.ligne([("=", WHITE), ("1", VERT_OK)], 60, 0.3).next_to(douze, RIGHT, buff=0.3)
        self.play(FadeIn(un), run_time=0.4)
        self.insister(un[1], 0.4)

        self.au_mot("La somme des probabilités")
        self.play(Write(self.chute("Toutes les issues : la somme fait toujours 1.",
                                   color=VERT_OK, font_size=40)))
        self.attendre_voix()

    # ── 05 : le tableau ─────────────────────────────────────────────────────

    def ecran_tableau(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-tableau")
        self.titre_ecran("Avec un tableau à double entrée")
        larg = [1.6, 3.0, 1.5, 1.2]
        ys = [2.25, 1.6, 0.95, 0.3]
        x0 = -6.6
        xs = []
        x = x0
        for w in larg:
            xs.append(x + w / 2)
            x += w
        grille = VGroup()
        for i, yy in enumerate(ys):
            for j, (w, xx) in enumerate(zip(larg, xs)):
                if i == 0 and j == 0:
                    continue
                grille.add(Rectangle(width=w, height=0.65, stroke_color=WHITE, stroke_width=2).move_to(P(xx, yy)))
        entetes = VGroup(*[self.t(s, 20, BLEU_CALCUL).move_to(P(xx, ys[0]))
                           for s, xx in zip(["demi-pensionnaire", "externe", "total"], xs[1:])])
        lignes = VGroup(*[self.t(s, 26, BLEU_CALCUL).move_to(P(xs[0], yy))
                          for s, yy in zip(["filles", "garçons", "total"], ys[1:])])
        valeurs = {(1, 2): "6", (1, 3): "13", (2, 1): "9", (2, 2): "6", (2, 3): "15",
                   (3, 1): "16", (3, 2): "12"}
        autres = VGroup(*[self.t(v, 30).set_opacity(0.45).move_to(P(xs[j], ys[i])) for (i, j), v in valeurs.items()])

        self.au_mot("Avec un tableau")
        self.play(Create(grille), FadeIn(entetes), FadeIn(lignes), run_time=1.0)
        self.play(FadeIn(autres), run_time=0.4)

        # les 28 élèves
        gx, gy = 1.3, 2.2
        foule = VGroup()
        for r in range(4):
            for k in range(7):
                foule.add(eleve(GRIS, 1.3).move_to(P(gx + k * 0.48, gy - r * 0.5)))
        self.au_mot("28 élèves")
        v28 = self.t("28", 34, JAUNE_TITRE).move_to(P(xs[3], ys[3]))
        l28 = self.ligne([("28", JAUNE_TITRE), ("élèves", WHITE)], 30, 0.18).move_to(P(gx + 1.44, 0.15))
        self.play(LaggedStart(*[FadeIn(e, scale=0.5) for e in foule], lag_ratio=0.03),
                  FadeIn(v28, scale=1.5), FadeIn(l28), run_time=1.0)

        self.au_mot("7 sont des filles")
        v7 = self.t("7", 34, JAUNE_TITRE).move_to(P(xs[1], ys[1]))
        cadre7 = SurroundingRectangle(v7, color=JAUNE_TITRE, buff=0.12)
        filles = [foule[i] for i in (0, 1, 2, 3, 4, 5, 6)]
        self.play(FadeIn(v7, scale=1.6), Create(cadre7),
                  *[f.animate.set_fill(JAUNE_TITRE, 1) for f in filles], run_time=0.7)

        self.au_mot("On tire un élève")
        anneau = Circle(radius=0.26, stroke_color=VERT_OK, stroke_width=5).move_to(foule[20])
        self.play(Create(anneau), run_time=0.3)
        for i in (11, 25, 3, 17, 9, 5):
            self.play(anneau.animate.move_to(foule[i]), run_time=0.22)

        yb = -1.55
        self.au_mot("7 sur 28")
        f1 = self.fraction(7, 28, 50, JAUNE_TITRE)
        gp = VGroup(self.t("P =", 48), f1).arrange(RIGHT, buff=0.3).move_to(P(-3.6, yb))
        self.play(FadeIn(gp, shift=UP * 0.2), run_time=0.6)

        self.au_mot("donc 1 sur 4")
        egal = self.t("=", 48).next_to(gp, RIGHT, buff=0.35)
        f2 = self.fraction(1, 4, 50, VERT_OK).next_to(egal, RIGHT, buff=0.35)
        d1 = self.t("÷ 7", 28, ORANGE_RETENUE).move_to((f1[0].get_center() + f2[0].get_center()) / 2 + UP * 0.5)
        d2 = self.t("÷ 7", 28, ORANGE_RETENUE).move_to((f1[2].get_center() + f2[2].get_center()) / 2 + DOWN * 0.5)
        self.play(FadeIn(egal), FadeIn(f2, shift=LEFT * 0.2), FadeIn(d1), FadeIn(d2), run_time=0.6)
        self.insister(f2, 0.4)
        self.attendre_voix()

    # ── 06 : le piège ───────────────────────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-piege")
        self.titre_ecran("Le piège")
        self.au_mot("diviser par le nombre de catégories")
        cat = self.t("diviser par le nombre de catégories ?", 32, ROUGE_ERREUR).move_to(P(-0.8, 2.3))
        self.play(FadeIn(cat), run_time=0.5)

        self.au_mot("3 parfums")
        trois = VGroup(*[bonbon(c, 1.5) for c in (CITRON, FRAISE, MENTHE)]).arrange(RIGHT, buff=0.5)
        trois.move_to(P(-4.0, 1.2))
        l3 = self.ligne([("3", JAUNE_TITRE), ("parfums", WHITE)], 34, 0.18).next_to(trois, DOWN, buff=0.3)
        self.play(LaggedStart(*[FadeIn(b, scale=0.5) for b in trois], lag_ratio=0.25), FadeIn(l3), run_time=0.8)

        self.au_mot("donc 1 sur 3")
        faux = VGroup(self.t("P =", 44, ROUGE_ERREUR), self.fraction(1, 3, 52, ROUGE_ERREUR),
                      self.t("?", 52, ROUGE_ERREUR)).arrange(RIGHT, buff=0.25).move_to(P(1.4, 1.1))
        self.play(FadeIn(faux, shift=LEFT * 0.2), run_time=0.5)

        self.au_mot("Non")
        barre = self.barrer(faux)
        self.play(Create(barre), run_time=0.4)
        self.play(Wiggle(VGroup(faux, barre)), run_time=0.6)

        self.au_mot("on divise par le nombre de bonbons")
        rang = self.rangee(-0.75, x0=-5.4, pas=0.72, s=0.75)
        l12 = self.ligne([("12", JAUNE_TITRE), ("bonbons", WHITE)], 32, 0.18).next_to(rang, RIGHT, buff=0.35)
        self.play(LaggedStart(*[FadeIn(b, shift=DOWN * 0.3) for b in rang], lag_ratio=0.06),
                  FadeIn(l12), run_time=1.0)
        bon = VGroup(self.t("P(fraise) =", 42, VERT_OK), self.fraction(5, 12, 50, VERT_OK)).arrange(RIGHT, buff=0.25)
        bon.move_to(P(-2.4, -2.3))
        self.play(FadeIn(bon, shift=UP * 0.2), *[Indicate(rang[i], color=FRAISE) for i in range(4, 9)],
                  run_time=0.8)
        self.play(Create(SurroundingRectangle(bon, color=VERT_OK, buff=0.15)), run_time=0.4)
        self.attendre_voix()

    # ── 07 : défi ───────────────────────────────────────────────────────────

    def maillots(self):
        g = VGroup()
        for k in range(14):
            r, c = divmod(k, 7)
            g.add(maillot(k + 1, 1.0).move_to(P(-5.3 + c * 1.35, 1.75 - r * 1.35)))
        return g

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        self.au_mot("Des maillots")
        m = self.maillots()
        self.play(LaggedStart(*[FadeIn(x, shift=DOWN * 0.2) for x in m], lag_ratio=0.08), run_time=1.3)
        self.au_mot("multiple de 4")
        q = self.t("Probabilité d'obtenir un multiple de 4 ?", 38, BLEU_CALCUL).move_to(P(-0.8, -0.95))
        self.play(FadeIn(q, shift=UP * 0.2), run_time=0.6)
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=40)))
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("07b-correction")
        self.titre_ecran("Correction")
        m = self.maillots()
        self.add(m)
        lbl = self.t("multiples de 4 :", 34, BLEU_CALCUL).move_to(P(-4.9, -1.3))
        self.au_mot("Les multiples de 4")
        self.play(FadeIn(lbl), run_time=0.4)
        nums = VGroup()
        for extrait, k, x in [("4, 8", 4, -2.6), ("8 et", 8, -1.9), ("12. 3", 12, -1.1)]:
            self.au_mot(extrait)
            n = self.t(str(k), 38, JAUNE_TITRE).move_to(P(x, -1.3))
            nums.add(n)
            self.play(m[k - 1][0].animate.set_fill(JAUNE_TITRE, 1), m[k - 1][1].animate.set_color(BLACK),
                      FadeIn(n, scale=1.5), run_time=0.35)
            self.play(m[k - 1].animate.scale(1.3), run_time=0.2)
            self.play(m[k - 1].animate.scale(1 / 1.3), run_time=0.2)

        self.au_mot("3 issues favorables")
        num = self.t("3", 60, JAUNE_TITRE).move_to(P(2.6, -0.95))
        barre = Line(P(2.05, -1.45), P(3.15, -1.45), stroke_width=5)
        den = self.t("14", 60).move_to(P(2.6, -2.0))
        pe = self.t("P =", 52).move_to(P(1.0, -1.45))
        self.play(FadeIn(pe), TransformFromCopy(nums, num), run_time=0.7)
        self.au_mot("sur 14")
        self.play(Create(barre), FadeIn(den, shift=UP * 0.2), run_time=0.7)
        self.au_mot("3 sur 14")
        frac = VGroup(num, barre, den)
        self.play(VGroup(num, barre, den).animate.set_color(VERT_OK), run_time=0.3)
        self.insister(frac, 0.4)
        self.play(Create(SurroundingRectangle(frac, color=VERT_OK, buff=0.15)), run_time=0.4)
        self.attendre_voix()

    # ── 08 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)))
        l1 = VGroup(self.coche(), self.t("P =", 34), self.fraction("favorables", "total", 30, JAUNE_TITRE),
                    self.t("quand c'est équiprobable", 34))
        l2 = VGroup(self.coche(), self.fraction(1, 4, 34, JAUNE_TITRE), self.t("=  0,25  =  25 %", 34))
        l3 = VGroup(self.coche(), self.t("La somme des probabilités fait toujours 1", 34))
        lignes = VGroup(l1, l2, l3)
        for l in lignes:
            l.arrange(RIGHT, buff=0.3)
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.55)
        if lignes.width > 10.0:
            lignes.scale_to_fit_width(10.0)
        lignes.move_to(P(-0.9, 0.55))
        for mot, l in zip(["Une probabilité, c'est", "Elle s'écrit", "Et la somme"], lignes):
            self.au_mot(mot)
            self.play(FadeIn(l[1:], shift=RIGHT * 0.2), run_time=0.6)
            self.play(Create(l[0]), run_time=0.4)
        self.au_mot("L'épisode 6")
        self.play(Write(self.chute("Épisode 6 : l'événement contraire", color=VERT_OK, font_size=38)))
        self.attendre_voix(marge=1.0)

    # ── déroulé ─────────────────────────────────────────────────────────────

    def construct(self):
        self.page_garde()
        self.ecran_situation()
        self.ecran_formule()
        self.ecran_ecritures()
        self.ecran_somme()
        self.ecran_tableau()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="09-abonne")
