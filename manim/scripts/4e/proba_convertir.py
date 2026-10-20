# proba_convertir.py
# EleveAI — Maths 4e — Probabilités, épisode 6 : une probabilité en décimal et
# en pourcentage (micro propre à la 4e), AVEC VOIX. Paysage 16:9, CEINTURE ORANGE.
# Short jumeau (ceinture jaune) : proba_convertir_short.py.
#
# ⭐ LE DESSIN QUI PORTE TOUT : le gâteau coupé en 4 (1 part colorée) puis la
# GRILLE 10 × 10 où 25 cases se colorent — 1/4 et 25/100, la même surface.
# Trois cases « fraction → décimal → pourcentage » reliées par « ÷ » et « × 100 ».
# Écrans : 00 garde · 01 la météo du match (25 % / « 1 chance sur 4 ») ·
# 02 trois écritures · 03 fraction → décimal (1 ÷ 4 = 0,25) · 04 décimal →
# pourcentage (0,25 × 100 = 25) · 05 pile ou face (50 %) · 06 le piège (5 %, 4 %) ·
# 07 défi 3/5 · 07b correction (0,6 ; 60 %) · 08 ce que tu as appris.
#
# Voix : manim/voix/4e-proba-convertir.json (débit −7).
# Rendu : python -m manim render -qh --disable_caching manim/scripts/4e/proba_convertir.py ProbaConvertir4e -o eleveai-maths-4e-proba-convertir --media_dir manim/scripts/4e/media
# Puis copier le mp4 dans manim/sorties/4e/maths/probabilites/06-convertir/.

import math
import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "seconde"))

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Notion6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

COUL_FRAC = JAUNE_TITRE
COUL_DEC = BLEU_CALCUL
COUL_PC = VERT_OK
PLUIE = "#60A5FA"
BILLE_ROUGE = "#DC2626"
BILLE_BLEUE = "#2563EB"


def P(x, y):
    return np.array([x, y, 0.0])


# ── les dessins communs (paysage et short) ──────────────────────────────────

def grille100(n, cote=0.3, couleur=COUL_PC):
    """La grille 10 × 10 : les n premières cases (ligne par ligne, du haut) colorées."""
    g = VGroup()
    for k in range(100):
        r, c = divmod(k, 10)
        q = Square(cote, stroke_color=WHITE, stroke_width=1.2)
        q.set_fill(couleur if k < n else BLACK, opacity=0.85 if k < n else 0.0)
        g.add(q.move_to(P((c - 4.5) * cote, (4.5 - r) * cote)))
    return g


def colorier(grille, n, couleur=COUL_PC):
    """Les animations qui colorent les cases jusqu'à n."""
    return [grille[k].animate.set_fill(couleur, 0.85) for k in range(n)]


def nuage(s=1.0):
    return VGroup(*[Circle(radius=r, fill_color="#9CA3AF", fill_opacity=1, stroke_width=0).move_to(P(x, y))
                    for x, y, r in [(-0.5, 0.0, 0.35), (0.0, 0.2, 0.48), (0.5, 0.0, 0.35),
                                    (-0.15, -0.1, 0.3), (0.25, -0.1, 0.3)]]).scale(s)


def gouttes_qui_tombent(haut, larg, chute, n=7, s=1.0):
    """Des gouttes qui tombent SANS FIN sous le nuage (updater)."""
    etat = {"t": 0.0}
    xs = [haut[0] - larg / 2 + larg * (k + 0.5) / n for k in range(n)]

    def faire(t):
        g = VGroup()
        for k, x in enumerate(xs):
            f = (t * 1.3 + k * 0.37) % 1.0
            y = haut[1] - f * chute
            g.add(Line(P(x, y), P(x - 0.06 * s, y - 0.22 * s), color=PLUIE, stroke_width=4))
        return g

    holder = faire(0)

    # ⛔ 20/10 : `become` et non remove/add (l'ancien enfant restait dessiné sous le nouveau pendant un `play`).
    def maj(m, dt):
        etat["t"] += dt
        m.become(faire(etat["t"]))

    holder.add_updater(maj)
    return holder


def ballon(r=0.45):
    rond = Circle(radius=r, fill_color=WHITE, fill_opacity=1, stroke_color=GREY_B, stroke_width=2)
    pent = RegularPolygon(5, radius=r * 0.38, fill_color="#111827", fill_opacity=1, stroke_width=0)
    rayons = VGroup(*[Line(pent.get_vertices()[k], pent.get_vertices()[k] * 2.4, color="#111827", stroke_width=2)
                      for k in range(5)])
    return VGroup(rond, rayons, pent)


def piece_qui_tourne(centre, r=0.75):
    """Une pièce qui tourne sur elle-même : PILE, puis FACE, puis PILE…"""
    etat = {"t": 0.0}
    # ⛔ 20/10 : structure FIXE (disque + « PILE » + « FACE », on n'allume que le bon mot)
    # redessinée par `become` : remove/add laissait une 2e pièce dessinée pendant un `play`.
    mot_pile = Text("PILE", font_size=int(r * 34), color=BLACK, weight=BOLD)
    mot_face = Text("FACE", font_size=int(r * 34), color=BLACK, weight=BOLD)

    def faire(t):
        c = math.cos(t * 5)
        pile = c >= 0
        disque = Circle(radius=r, fill_color=JAUNE_TITRE if pile else ORANGE_RETENUE, fill_opacity=1,
                        stroke_color=WHITE, stroke_width=3)
        mp = mot_pile.copy().move_to(disque).set_opacity(1 if pile else 0)
        mf = mot_face.copy().move_to(disque).set_opacity(0 if pile else 1)
        g = VGroup(disque, mp, mf)
        g.stretch(max(abs(c), 0.05), 0)
        return g.move_to(centre + UP * 0.25 * abs(math.sin(t * 2.5)))

    holder = faire(0)

    def maj(m, dt):
        etat["t"] += dt
        m.become(faire(etat["t"]))

    holder.add_updater(maj)
    return holder


def bille(couleur, r=0.24):
    b = Circle(radius=r, fill_color=couleur, fill_opacity=1, stroke_color=WHITE, stroke_width=2)
    reflet = Dot(radius=r * 0.22, color=WHITE).move_to(b.get_center() + P(-r * 0.35, r * 0.35)).set_opacity(0.7)
    return VGroup(b, reflet)


def sac_vide(larg=2.2, haut=2.4):
    corps = RoundedRectangle(width=larg, height=haut, corner_radius=larg * 0.3,
                             fill_color="#E0F2FE", fill_opacity=0.12, stroke_color=WHITE, stroke_width=3)
    col = Polygon(P(-larg * 0.22, haut / 2 - 0.05), P(larg * 0.22, haut / 2 - 0.05),
                  P(larg * 0.12, haut / 2 + 0.3), P(-larg * 0.12, haut / 2 + 0.3),
                  fill_color="#E0F2FE", fill_opacity=0.12, stroke_color=WHITE, stroke_width=3)
    lien = Line(P(-larg * 0.17, haut / 2 + 0.12), P(larg * 0.17, haut / 2 + 0.12),
                color=ORANGE_RETENUE, stroke_width=6)
    return VGroup(corps, col, lien)


class Notion4e(Notion6e):
    identite = "Maths 4e — EleveAI"


class ProbaConvertir4e(Notion4e):
    nom_voix = "4e-proba-convertir"

    def t(self, texte, font_size=36, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def ligne(self, morceaux, font_size=40, buff=0.2):
        return VGroup(*[self.t(m, font_size, c) for m, c in morceaux]).arrange(RIGHT, buff=buff)

    def insister(self, mob, run_time=0.45):
        self.play(mob.animate.scale(1.5), run_time=run_time)
        self.play(mob.animate.scale(1 / 1.5), run_time=run_time)

    def barrer(self, mob, color=ROUGE_ERREUR):
        return Line(mob.get_corner(DL) + LEFT * 0.1, mob.get_corner(UR) + RIGHT * 0.1,
                    stroke_width=7, color=color)

    def trio(self, y=1.9, xs=(-4.6, -0.9, 2.8), larg=2.5, haut=1.5):
        """Les trois cases « fraction → décimal → pourcentage », vides, et leurs flèches."""
        cases, noms, fleches = VGroup(), VGroup(), VGroup()
        for x, nom, c in zip(xs, ["fraction", "décimal", "pourcentage"], [COUL_FRAC, COUL_DEC, COUL_PC]):
            cases.add(RoundedRectangle(width=larg, height=haut, corner_radius=0.18, stroke_color=c,
                                       stroke_width=4).move_to(P(x, y)))
            noms.add(self.t(nom, 26, c).next_to(cases[-1], UP, buff=0.1))
        for i, lab in enumerate(["÷", "× 100"]):
            a = Arrow(cases[i].get_right(), cases[i + 1].get_left(), buff=0.08, stroke_width=5,
                      max_tip_length_to_length_ratio=0.3, color=ORANGE_RETENUE)
            fleches.add(VGroup(a, self.t(lab, 30, ORANGE_RETENUE).next_to(a, UP, buff=0.08)))
        return cases, noms, fleches

    def contenus(self, num, den, dec, pc, fs=48):
        return (self.fraction(num, den, fs, COUL_FRAC), self.t(dec, fs, COUL_DEC), self.t(pc, fs, COUL_PC))

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("Une probabilité en pourcentage", 52, JAUNE_TITRE).to_edge(UP, buff=0.7)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.25)
        ech = echelle_ceintures("orange").move_to(P(-0.6, -2.4))
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech))
        cases, noms, fleches = self.trio(y=0.15, xs=(-4.4, -0.7, 3.0), larg=2.3, haut=1.4)
        self.play(Create(cases), FadeIn(noms), run_time=0.8)
        self.au_mot("Trois écritures")
        for c, m in zip(cases, self.contenus(1, 4, "0,25", "25 %", 50)):
            m.move_to(c)
            self.play(FadeIn(m, scale=0.6), run_time=0.35)
        self.play(FadeIn(fleches), run_time=0.4)
        self.au_mot("un seul nombre")
        self.play(*[Indicate(c, color=WHITE, scale_factor=1.12) for c in cases], run_time=0.8)
        self.attendre_voix(marge=1.2)

    # ── 01 : la météo du match ──────────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.titre_ecran("La météo du match")
        self.au_mot("La météo annonce")
        nu = nuage(1.3).move_to(P(-4.2, 1.5))
        self.play(FadeIn(nu, shift=DOWN * 0.2), run_time=0.5)
        pluie = gouttes_qui_tombent(P(-4.2, 1.05), 1.6, 1.3, 8, 1.2)
        self.add(pluie)
        self.au_mot("25 %")
        badge = self.t("25 %", 60, COUL_PC).move_to(P(-4.2, -0.75))
        cadre = SurroundingRectangle(badge, color=COUL_PC, buff=0.18, corner_radius=0.12)
        risque = self.t("risque de pluie", 28, PLUIE).next_to(cadre, DOWN, buff=0.15)
        self.play(FadeIn(badge, scale=1.6), Create(cadre), FadeIn(risque), run_time=0.7)
        self.au_mot("le match de dimanche")
        b = ballon(0.42).move_to(P(-1.4, -0.4))
        self.play(FadeIn(b, shift=LEFT * 1.0), Rotate(b, -TAU), run_time=0.8)

        self.au_mot("Ton ami dit")
        tete = Circle(radius=0.32, fill_color="#F59E0B", fill_opacity=1, stroke_width=0).move_to(P(3.3, -0.6))
        corps = RoundedRectangle(width=0.9, height=0.8, corner_radius=0.3, fill_color=BLEU_CALCUL,
                                 fill_opacity=1, stroke_width=0).move_to(P(3.3, -1.45))
        ami = VGroup(corps, tete)
        bulle = RoundedRectangle(width=4.0, height=1.5, corner_radius=0.3, stroke_color=WHITE, stroke_width=3,
                                 fill_color="#1F2937", fill_opacity=1).move_to(P(1.6, 1.35))
        queue = Polygon(P(2.4, 0.62), P(2.9, 0.62), P(3.05, 0.0), fill_color="#1F2937", fill_opacity=1,
                        stroke_color=WHITE, stroke_width=3)
        self.play(FadeIn(ami, shift=UP * 0.3), run_time=0.4)
        self.au_mot("1 chance sur 4")
        dit = VGroup(self.t("1 chance sur", 34), self.t("4", 40, COUL_FRAC)).arrange(RIGHT, buff=0.25)
        dit.move_to(bulle)
        self.play(FadeIn(queue), GrowFromCenter(bulle), run_time=0.4)
        self.add(queue, bulle)
        self.play(FadeIn(dit), run_time=0.4)
        self.au_mot("Qui a raison")
        self.play(Write(self.chute("Qui a raison ?", color=JAUNE_TITRE, font_size=46)))
        self.play(Wiggle(VGroup(badge, cadre)), Wiggle(dit), run_time=0.8)
        self.attendre_voix()
        pluie.clear_updaters()

    # ── 02 : trois écritures ────────────────────────────────────────────────

    def ecran_idee(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-idee")
        self.titre_ecran("Trois écritures, un seul nombre")
        self.au_mot("Les deux")
        g1 = VGroup(self.t("25 %", 46, COUL_PC), self.coche(taille=0.3)).arrange(RIGHT, buff=0.3).move_to(P(-3.0, 2.0))
        g2 = VGroup(self.t("1 chance sur", 40), self.t("4", 44, COUL_FRAC), self.coche(taille=0.3))
        g2.arrange(RIGHT, buff=0.3).move_to(P(2.2, 2.0))
        self.play(FadeIn(g1[0]), FadeIn(g2[:2]), run_time=0.4)
        self.play(Create(g1[1]), Create(g2[2]), run_time=0.5)

        cases, noms, fleches = self.trio(y=-0.2)
        m = self.contenus(1, 4, "0,25", "25 %", 54)
        for c, mm in zip(cases, m):
            mm.move_to(c)
        for k, extrait in enumerate(["en fraction", "en nombre décimal", "ou en pourcentage"]):
            self.au_mot(extrait)
            self.play(Create(cases[k]), FadeIn(noms[k]), FadeIn(m[k], scale=0.6), run_time=0.6)
        self.au_mot("C'est le même nombre")
        self.play(FadeIn(fleches), run_time=0.4)
        self.play(*[Indicate(mm, color=WHITE, scale_factor=1.3) for mm in m], run_time=0.9)
        self.play(Write(self.chute("Le même nombre, écrit de trois façons.", color=WHITE, font_size=38)))
        self.attendre_voix()

    # ── 03 : fraction → décimal ─────────────────────────────────────────────

    def ecran_decimal(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-decimal")
        self.titre_ecran("De la fraction au décimal")
        cases, noms, fleches = self.trio(y=1.3)
        self.play(Create(cases[:2]), FadeIn(noms[:2]), run_time=0.6)
        self.au_mot("on divise")
        self.play(GrowArrow(fleches[0][0]), FadeIn(fleches[0][1], scale=1.6), run_time=0.6)
        self.insister(fleches[0][1], 0.35)

        self.au_mot("1 sur 4")
        f = self.fraction(1, 4, 54, COUL_FRAC).move_to(cases[0])
        gat = self.disque(4, 1, rayon=1.1, centre=P(-4.6, -1.4), couleur=COUL_FRAC)
        self.play(FadeIn(f, scale=0.6), FadeIn(gat), run_time=0.6)
        self.play(gat[0].animate.shift(P(0.15, 0.15)), run_time=0.3)
        self.play(gat[0].animate.shift(P(-0.15, -0.15)), run_time=0.3)

        y = -1.4
        self.au_mot("c'est 1 divisé par 4")
        calc = self.t("1 ÷ 4", 64).move_to(P(-1.2, y))
        self.play(TransformFromCopy(f, calc), run_time=0.7)
        self.au_mot("égale 0,25")
        res = self.ligne([("=", WHITE), ("0,25", COUL_DEC)], 64, 0.3).next_to(calc, RIGHT, buff=0.3)
        self.play(FadeIn(res, shift=LEFT * 0.2), run_time=0.5)
        self.insister(res[1], 0.4)
        d = self.t("0,25", 54, COUL_DEC).move_to(cases[1])
        self.play(TransformFromCopy(res[1], d), run_time=0.6)
        self.play(Create(SurroundingRectangle(VGroup(calc, res), color=COUL_DEC, buff=0.2)), run_time=0.4)
        self.attendre_voix()

    # ── 04 : décimal → pourcentage ──────────────────────────────────────────

    def ecran_pourcentage(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-pourcentage")
        self.titre_ecran("Du décimal au pourcentage")
        cases, noms, fleches = self.trio(y=1.3)
        m = self.contenus(1, 4, "0,25", "25 %", 54)
        for c, mm in zip(cases, m):
            mm.move_to(c)
        self.add(cases[:2], noms[:2], fleches[0], m[0], m[1])
        self.play(Create(cases[2]), FadeIn(noms[2]), run_time=0.5)
        self.au_mot("on multiplie par 100")
        self.play(GrowArrow(fleches[1][0]), FadeIn(fleches[1][1], scale=1.6), run_time=0.6)
        self.insister(fleches[1][1], 0.35)

        y = -0.4
        gr = grille100(0, 0.24).move_to(P(3.6, -0.9))
        self.au_mot("0,25 fois 100")
        calc = self.t("0,25 × 100", 54).move_to(P(-4.2, y))
        calc[:4].set_color(COUL_DEC)
        self.play(TransformFromCopy(m[1], calc[:4]), FadeIn(calc[4:]), Create(gr), run_time=0.8)
        self.au_mot("égale 25")
        res = self.ligne([("=", WHITE), ("25", COUL_PC)], 54, 0.3).next_to(calc, RIGHT, buff=0.3)
        self.play(FadeIn(res, shift=LEFT * 0.2), LaggedStart(*colorier(gr, 25), lag_ratio=0.03), run_time=1.0)
        self.au_mot("Donc 25 %")
        self.play(TransformFromCopy(res[1], m[2]), run_time=0.6)
        sous = self.t("25 cases sur 100", 28, COUL_PC).next_to(gr, DOWN, buff=0.15)
        self.play(FadeIn(sous), run_time=0.3)
        self.insister(m[2], 0.35)

        self.au_mot("1 sur 4, 0,25 et 25 %")
        gat = self.disque(4, 1, rayon=0.75, centre=P(-0.6, -1.75), couleur=COUL_FRAC)
        self.play(FadeIn(gat, scale=0.6), run_time=0.4)
        self.play(*[Indicate(mm, color=WHITE, scale_factor=1.25) for mm in m], run_time=0.8)
        self.au_mot("c'est le même nombre")
        self.play(Write(self.chute("Le même nombre : un quart.", color=WHITE, font_size=34).shift(LEFT * 2.0)),
                  run_time=0.8)
        self.attendre_voix()

    # ── 05 : pile ou face ───────────────────────────────────────────────────

    def ecran_exemple(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-exemple")
        self.titre_ecran("Pile ou face")
        piece = piece_qui_tourne(P(-5.2, 1.6), 0.7)
        self.add(piece)
        self.au_mot("1 sur 2")
        f = VGroup(self.t("P =", 50), self.fraction(1, 2, 56, COUL_FRAC)).arrange(RIGHT, buff=0.25).move_to(P(-2.6, 1.6))
        self.play(FadeIn(f, shift=LEFT * 0.2), run_time=0.5)
        self.au_mot("1 divisé par 2")
        l1 = self.t("1 ÷ 2", 54).move_to(P(-4.4, 0.0), aligned_edge=LEFT)
        self.play(FadeIn(l1), run_time=0.4)
        self.au_mot("égale 0,5")
        r1 = self.ligne([("=", WHITE), ("0,5", COUL_DEC)], 54, 0.25).next_to(l1, RIGHT, buff=0.25)
        self.play(FadeIn(r1, shift=LEFT * 0.2), run_time=0.4)
        self.au_mot("0,5 fois 100")
        l2 = self.t("0,5 × 100", 54).move_to(P(-4.4, -1.3), aligned_edge=LEFT)
        l2[:3].set_color(COUL_DEC)
        gr = grille100(0, 0.27).move_to(P(3.2, 0.1))
        self.play(FadeIn(l2), Create(gr), run_time=0.6)
        self.au_mot("égale 50")
        r2 = self.ligne([("=", WHITE), ("50", COUL_PC)], 54, 0.25).next_to(l2, RIGHT, buff=0.25)
        self.play(FadeIn(r2, shift=LEFT * 0.2), LaggedStart(*colorier(gr, 50), lag_ratio=0.015), run_time=1.0)
        self.au_mot("50 %")
        pc = self.t("50 %", 60, COUL_PC).next_to(gr, DOWN, buff=0.2)
        self.play(FadeIn(pc, scale=1.6), run_time=0.4)
        self.insister(pc, 0.35)
        piece.clear_updaters()
        self.attendre_voix()

    # ── 06 : le piège ───────────────────────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-piege")
        self.titre_ecran("Le piège")
        rangs = [(1.35, "0,5", "5 %", 5, "50 %", 50, "0,5, ce n'est pas 5 %", "C'est 50 %"),
                 (-1.05, None, "4 %", 4, "25 %", 25, "1 sur 4, ce n'est pas 4 %", None)]
        cote = 0.19
        for y, gauche, faux_pc, nf, bon_pc, nb, extrait_faux, extrait_bon in rangs:
            self.au_mot(extrait_faux)
            if gauche:
                g = self.t(gauche, 50, COUL_DEC)
            else:
                g = self.fraction(1, 4, 46, COUL_FRAC)
            faux = VGroup(g, self.t("=", 50, ROUGE_ERREUR), self.t(faux_pc, 50, ROUGE_ERREUR)).arrange(RIGHT, buff=0.25)
            faux.move_to(P(-4.6, y))
            gf = grille100(nf, cote, ROUGE_ERREUR).move_to(P(-1.4, y))
            self.play(FadeIn(faux), FadeIn(gf), run_time=0.5)
            barre = self.barrer(faux[1:])
            self.play(Create(barre), run_time=0.35)
            bon = self.t("= " + bon_pc, 50, COUL_PC).move_to(P(1.4, y))
            gb = grille100(nb, cote, COUL_PC).move_to(P(3.8, y))
            if extrait_bon:
                self.au_mot(extrait_bon)
            self.play(FadeIn(bon, shift=LEFT * 0.2), FadeIn(gb), run_time=0.5)
            self.insister(gb, 0.3)
        self.au_mot("Un pourcentage se lit sur 100")
        self.play(Write(self.chute("Un pourcentage se lit sur 100 cases.", color=JAUNE_TITRE, font_size=38)))
        self.attendre_voix()

    # ── 07 : défi ───────────────────────────────────────────────────────────

    def sac_billes(self, centre):
        s = sac_vide(2.4, 2.0).move_to(centre)
        couleurs = [BILLE_ROUGE, BILLE_BLEUE, BILLE_ROUGE, BILLE_ROUGE, BILLE_BLEUE]
        pos = [(-0.55, -0.45), (0.0, -0.45), (0.55, -0.45), (-0.28, 0.1), (0.28, 0.1)]
        billes = VGroup(*[bille(c, 0.25).move_to(centre + P(x, y)) for c, (x, y) in zip(couleurs, pos)])
        return s, billes

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        s, billes = self.sac_billes(P(-5.0, 1.7))
        self.play(FadeIn(s), LaggedStart(*[FadeIn(b, shift=DOWN) for b in billes], lag_ratio=0.15), run_time=0.8)
        self.au_mot("3 sur 5")
        f = VGroup(self.t("P(rouge) =", 44), self.fraction(3, 5, 52, COUL_FRAC)).arrange(RIGHT, buff=0.25)
        f.move_to(P(-0.4, 1.6))
        self.play(FadeIn(f, shift=LEFT * 0.2), *[Indicate(billes[i], color=BILLE_ROUGE) for i in (0, 2, 3)],
                  run_time=0.7)
        cases, noms, fleches = self.trio(y=-0.8)
        self.au_mot("Écris-la en décimal")
        q = [self.fraction(3, 5, 52, COUL_FRAC), self.t("?", 60, COUL_DEC), self.t("? %", 60, COUL_PC)]
        for c, mm in zip(cases, q):
            mm.move_to(c)
        self.play(Create(cases), FadeIn(noms), FadeIn(fleches), FadeIn(q[0]), FadeIn(q[1], scale=1.5), run_time=0.8)
        self.au_mot("puis en pourcentage")
        self.play(FadeIn(q[2], scale=1.5), run_time=0.4)
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=40)))
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("07b-correction")
        self.titre_ecran("Correction")
        y1, y2 = 1.9, 0.75
        self.au_mot("3 divisé par 5")
        l1 = self.t("3 ÷ 5", 54).move_to(P(-5.3, y1), aligned_edge=LEFT)
        self.play(FadeIn(l1), run_time=0.4)
        self.au_mot("égale 0,6")
        r1 = self.ligne([("=", WHITE), ("0,6", COUL_DEC)], 54, 0.25).next_to(l1, RIGHT, buff=0.25)
        self.play(FadeIn(r1, shift=LEFT * 0.2), run_time=0.4)
        self.au_mot("0,6 fois 100")
        l2 = self.t("0,6 × 100", 54).move_to(P(-5.3, y2), aligned_edge=LEFT)
        l2[:3].set_color(COUL_DEC)
        gr = grille100(0, 0.25).move_to(P(3.6, 1.0))
        self.play(FadeIn(l2), Create(gr), run_time=0.6)
        self.au_mot("égale 60")
        r2 = self.ligne([("=", WHITE), ("60", COUL_PC)], 54, 0.25).next_to(l2, RIGHT, buff=0.25)
        self.play(FadeIn(r2, shift=LEFT * 0.2), LaggedStart(*colorier(gr, 60), lag_ratio=0.012), run_time=1.0)

        cases, noms, fleches = self.trio(y=-1.55, xs=(-5.0, -1.6, 1.8), larg=2.2, haut=1.25)
        m = self.contenus(3, 5, "0,6", "60 %", 50)
        for c, mm in zip(cases, m):
            mm.move_to(c)
        self.au_mot("Donc 3 sur 5")
        self.play(Create(cases), FadeIn(noms), FadeIn(fleches), FadeIn(m[0]), run_time=0.7)
        self.au_mot("c'est 0,6")
        self.play(TransformFromCopy(r1[1], m[1]), run_time=0.5)
        self.au_mot("c'est 60 %")
        self.play(FadeIn(m[2], scale=1.6), run_time=0.4)
        self.insister(m[2], 0.35)
        self.attendre_voix()

    # ── 08 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)))
        l1 = VGroup(self.coche(), self.t("Trois écritures :", 34),
                    self.fraction(1, 4, 32, COUL_FRAC), self.t("= 0,25 = 25 %", 34))
        l2 = VGroup(self.coche(), self.t("Fraction → décimal : on divise", 34), self.t("1 ÷ 4", 34, COUL_DEC))
        l3 = VGroup(self.coche(), self.t("Décimal → pourcentage : on multiplie par 100", 34))
        lignes = VGroup(l1, l2, l3)
        for l in lignes:
            l.arrange(RIGHT, buff=0.3)
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.6)
        if lignes.width > 10.5:
            lignes.scale_to_fit_width(10.5)
        lignes.move_to(P(-0.8, 0.6))
        for mot, l in zip(["Une probabilité s'écrit", "Fraction vers décimal", "Décimal vers pourcentage"], lignes):
            self.au_mot(mot)
            self.play(FadeIn(l[1:], shift=RIGHT * 0.2), run_time=0.6)
            self.play(Create(l[0]), run_time=0.4)
        self.au_mot("L'épisode 7")
        self.play(Write(self.chute("Épisode 7 : comparer deux probabilités", color=VERT_OK, font_size=38)))
        self.attendre_voix(marge=1.0)

    # ── déroulé ─────────────────────────────────────────────────────────────

    def construct(self):
        self.page_garde()
        self.ecran_situation()
        self.ecran_idee()
        self.ecran_decimal()
        self.ecran_pourcentage()
        self.ecran_exemple()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="09-abonne")
