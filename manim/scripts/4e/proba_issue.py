# proba_issue.py
# EleveAI — Maths 4e — Probabilités, épisode 2 : les issues (micro : proba_issue), AVEC VOIX.
# Paysage 16:9, CEINTURE ORANGE. Short jumeau : proba_issue_short.py (ceinture blanche).
#
# Écrans : 00 garde (la roue tourne) · 01 la roue de la kermesse (fanions, 8 cases,
# la flèche) · 02 la liste dans l'ordre 1 → 8 (chaque case s'allume) · 03 la trousse :
# 4 stylos bleus, 1 rouge, les yeux fermés → 2 issues pour 5 stylos · 04 la méthode
# (lire ce qu'on regarde, écrire chaque résultat une fois) · 05 piège 1 : compter les
# objets · 06 piège 2 : écrire deux fois le même résultat · 07 défi de la boîte de
# crayons (2 rouges, 1 vert, 4 jaunes) · 07b correction (3 piles = 3 issues) · 08 ce
# que tu as appris · 09 abonnement.
#
# Code de la roue repris de la 3e (proba_issue.py) ; textes propres à la 4e.
#
# Voix : manim/voix/4e-proba-issue.json (débit −7).
# Rendu : python -m manim render -qh --disable_caching manim/scripts/4e/proba_issue.py ProbaIssue4e -o eleveai-maths-4e-proba-issue --media_dir manim/scripts/4e/media
# Puis copier le mp4 dans manim/sorties/4e/maths/probabilites/02-issue/.

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

GRIS_ETEINT = "#6B7280"
COUL_ROUE = ["#2563EB", "#DC2626", "#16A34A", "#D97706"]
STYLO_BLEU = "#2563EB"
STYLO_ROUGE = "#DC2626"
CRAYON = {"rouge": "#DC2626", "vert": "#16A34A", "jaune": "#FACC15"}
BOIS = "#F5D0A9"


class Notion4e(Notion6e):
    identite = "Maths 4e — EleveAI"


def P(x, y):
    return np.array([x, y, 0.0])


# ── les dessins ─────────────────────────────────────────────────────────────

def roue(r=1.7, angle=0.0):
    """Une roue de jeu à 8 cases numérotées de 1 à 8, tournée de `angle` (les numéros restent droits)."""
    secteurs = VGroup()
    nums = VGroup()
    for i in range(8):
        a0 = PI / 2 - (i + 1) * TAU / 8 + angle
        secteurs.add(Sector(radius=r, angle=TAU / 8, start_angle=a0,
                            fill_color=COUL_ROUE[i % 4], fill_opacity=1, stroke_color=WHITE, stroke_width=3))
        am = a0 + TAU / 16
        nums.add(Text(str(i + 1), font_size=int(26 * r), color=WHITE, weight=BOLD)
                 .move_to(P(0.68 * r * math.cos(am), 0.68 * r * math.sin(am))))
    moyeu = Circle(radius=r * 0.12, fill_color=WHITE, fill_opacity=1, stroke_color=GREY_B, stroke_width=2)
    return VGroup(secteurs, nums, moyeu)


def fleche_roue(centre, r, s=0.24):
    return Triangle(fill_color=WHITE, fill_opacity=1, stroke_width=0).scale(s).rotate(PI).move_to(
        centre + UP * (r + 0.12))


def fanions(x0=-6.6, x1=6.6, y=2.75, n=14, creux=0.35):
    couleurs = [JAUNE_TITRE, ROUGE_ERREUR, BLEU_CALCUL, VERT_OK, ORANGE_RETENUE, VIOLET_ACCENT]
    fil = ParametricFunction(lambda s: P(x0 + (x1 - x0) * s, y - creux * 4 * s * (1 - s)), t_range=[0, 1],
                             color=GREY_B, stroke_width=2)
    g = VGroup(fil)
    for k in range(n):
        s = (k + 0.5) / n
        x = x0 + (x1 - x0) * s
        yy = y - creux * 4 * s * (1 - s)
        g.add(Polygon(P(x - 0.2, yy), P(x + 0.2, yy), P(x, yy - 0.42), fill_color=couleurs[k % 6],
                      fill_opacity=0.9, stroke_width=0))
    return g


def stylo(couleur, L=2.6):
    """Un stylo couché : capuchon à gauche (avec l'agrafe), corps, pointe à droite."""
    h = 0.22
    corps = RoundedRectangle(width=L * 0.62, height=h, corner_radius=0.06, fill_color=WHITE, fill_opacity=0.9,
                             stroke_color=GREY_B, stroke_width=1.5).move_to(P(L * 0.06, 0))
    encre = Rectangle(width=L * 0.5, height=0.05, fill_color=couleur, fill_opacity=1, stroke_width=0).move_to(corps)
    cap = RoundedRectangle(width=L * 0.26, height=h * 1.1, corner_radius=0.06, fill_color=couleur, fill_opacity=1,
                           stroke_width=0).move_to(P(-L * 0.37, 0))
    agrafe = Line(P(-L * 0.45, h * 0.75), P(-L * 0.28, h * 0.75), color=couleur, stroke_width=4)
    pointe = Polygon(P(L * 0.37, h / 2), P(L * 0.37, -h / 2), P(L * 0.5, 0), fill_color=GREY_B, fill_opacity=1,
                     stroke_width=0)
    bille = Dot(P(L * 0.5, 0), radius=0.03, color=couleur)
    return VGroup(corps, encre, cap, agrafe, pointe, bille)


def trousse(larg=3.6, haut=1.6):
    corps = RoundedRectangle(width=larg, height=haut, corner_radius=0.35, fill_color="#7C3AED", fill_opacity=0.22,
                             stroke_color=WHITE, stroke_width=3)
    zip_ = DashedLine(P(-larg / 2 + 0.3, haut / 2 - 0.12), P(larg / 2 - 0.3, haut / 2 - 0.12), dash_length=0.08,
                      color=GREY_B, stroke_width=3)
    tirette = VGroup(Circle(radius=0.08, stroke_color=JAUNE_TITRE, stroke_width=3),
                     Line(P(0, -0.08), P(0, -0.3), color=JAUNE_TITRE, stroke_width=3)).move_to(
        P(larg / 2 - 0.35, haut / 2 - 0.25))
    return VGroup(corps, zip_, tirette)


def crayon(couleur, h=1.7, w=0.3):
    """Un crayon de couleur DEBOUT : corps coloré, bois taillé, mine de la couleur."""
    corps = Rectangle(width=w, height=h * 0.74, fill_color=couleur, fill_opacity=1, stroke_color=WHITE,
                      stroke_width=1.2).move_to(P(0, -h * 0.13))
    arete = Line(P(0, -h / 2), P(0, h * 0.24), color=BLACK, stroke_width=1, stroke_opacity=0.35)
    bois = Polygon(P(-w / 2, h * 0.24), P(w / 2, h * 0.24), P(w * 0.17, h * 0.43), P(-w * 0.17, h * 0.43),
                   fill_color=BOIS, fill_opacity=1, stroke_width=0)
    mine = Polygon(P(-w * 0.17, h * 0.43), P(w * 0.17, h * 0.43), P(0, h * 0.5), fill_color=couleur,
                   fill_opacity=1, stroke_width=0)
    return VGroup(corps, arete, bois, mine)


def boite(larg=3.2, haut=1.5):
    face = Rectangle(width=larg, height=haut, fill_color="#92400E", fill_opacity=0.85, stroke_color=WHITE,
                     stroke_width=3)
    bord = Line(P(-larg / 2, haut / 2), P(larg / 2, haut / 2), color=WHITE, stroke_width=5)
    lbl = Text("CRAYONS", font_size=22, color=WHITE, weight=BOLD).move_to(face).shift(DOWN * 0.15)
    return VGroup(face, bord, lbl)


def oeil(ferme=False, s=1.0):
    if ferme:
        paup = ArcBetweenPoints(P(-0.45, 0), P(0.45, 0), angle=PI / 2.2, color=WHITE, stroke_width=5)
        cils = VGroup(*[Line(paup.point_from_proportion(t), paup.point_from_proportion(t) + P(0.06 * (t - 0.5) * 4, -0.16))
                        for t in (0.2, 0.4, 0.6, 0.8)]).set_stroke(WHITE, 3)
        return VGroup(paup, cils).scale(s)
    haut = ArcBetweenPoints(P(-0.45, 0), P(0.45, 0), angle=-PI / 2.2, color=WHITE, stroke_width=5)
    bas = ArcBetweenPoints(P(-0.45, 0), P(0.45, 0), angle=PI / 2.2, color=WHITE, stroke_width=5)
    iris = Circle(radius=0.15, fill_color=BLEU_CALCUL, fill_opacity=1, stroke_width=0)
    pup = Dot(radius=0.06, color=BLACK)
    return VGroup(haut, bas, iris, pup).scale(s)


class ProbaIssue4e(Notion4e):
    nom_voix = "4e-proba-issue"

    def t(self, texte, font_size=36, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def ligne(self, morceaux, font_size=40, buff=0.22):
        return VGroup(*[self.t(m, font_size, c) for m, c in morceaux]).arrange(RIGHT, buff=buff)

    def insister(self, mob, run_time=0.45):
        self.play(mob.animate.scale(1.5), run_time=run_time)
        self.play(mob.animate.scale(1 / 1.5), run_time=run_time)

    def barrer(self, mob, color=ROUGE_ERREUR, sw=6):
        return Line(mob.get_corner(DL) + LEFT * 0.08, mob.get_corner(UR) + RIGHT * 0.08,
                    stroke_width=sw, color=color)

    def puce(self, texte, color, font_size=32, fg=BLACK):
        lbl = self.t(texte, font_size, fg)
        fond = RoundedRectangle(width=lbl.width + 0.4, height=lbl.height + 0.3, corner_radius=0.12,
                                fill_color=color, fill_opacity=1, stroke_width=0)
        return VGroup(fond, lbl.move_to(fond))

    def roue_qui_tourne(self, centre, r, vitesse=-3.0):
        ang = ValueTracker(0.0)
        ang.add_updater(lambda m, dt: m.increment_value(vitesse * dt))
        w = always_redraw(lambda: roue(r, ang.get_value()).move_to(centre))
        self.add(ang)
        return w, ang

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("Les issues d'une expérience", 54, JAUNE_TITRE).to_edge(UP, buff=0.6)
        ident = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.22)
        ech = echelle_ceintures("orange").move_to(P(-0.6, -2.6))
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=1.0)
        w, ang = self.roue_qui_tourne(P(-4.0, -0.2), 1.3)
        self.add(w, fleche_roue(P(-4.0, -0.2), 1.3, 0.2))
        self.au_mot("Comment")
        q = VGroup(self.t("Comment être sûr", 44, BLEU_CALCUL),
                   self.t("de n'en oublier aucune ?", 44, BLEU_CALCUL)).arrange(DOWN, buff=0.15).move_to(P(1.5, -0.2))
        self.play(FadeIn(q, shift=UP * 0.2), run_time=0.6)
        self.attendre_voix(marge=1.0)
        ang.clear_updaters()
        w.clear_updaters()

    # ── 01 : la roue de la kermesse ─────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        titre = self.titre_ecran("La roue de la kermesse")
        fan = fanions(y=2.65)
        self.au_mot("À la kermesse")
        self.play(Create(fan), run_time=0.8)
        c, r = P(-3.6, -0.6), 1.75
        ang = ValueTracker(0.0)
        w = roue(r, 0.0).move_to(c)
        fl = fleche_roue(c, r)
        pied = Polygon(c + P(-0.2, -r + 0.1), c + P(0.2, -r + 0.1), c + P(0.6, -r - 0.55), c + P(-0.6, -r - 0.55),
                       fill_color=GREY_D, fill_opacity=1, stroke_color=WHITE, stroke_width=2)
        self.au_mot("une roue")
        self.play(FadeIn(pied), FadeIn(w, scale=0.7), FadeIn(fl), run_time=0.6)
        self.au_mot("de 1 à 8")
        num = self.ligne([("numérotée de", WHITE), ("1", JAUNE_TITRE), ("à", WHITE), ("8", JAUNE_TITRE)], 38, 0.18)
        num.move_to(P(2.7, 1.2))
        self.play(FadeIn(num, shift=LEFT * 0.2), Indicate(w[1][0], color=JAUNE_TITRE, scale_factor=1.6),
                  Indicate(w[1][7], color=JAUNE_TITRE, scale_factor=1.6), run_time=0.7)
        self.au_mot("On la fait tourner")
        self.remove(w)
        w = always_redraw(lambda: roue(r, ang.get_value()).move_to(c))
        self.add(w, fl)
        self.play(ang.animate.set_value(2 * TAU + 3.5 * TAU / 8), run_time=2.2,
                  rate_func=rate_functions.ease_out_cubic)
        w.clear_updaters()
        self.au_mot("le numéro sous la flèche")
        lit = self.t("on lit le numéro sous la flèche", 32).move_to(P(2.7, 0.2))
        self.play(FadeIn(lit, shift=LEFT * 0.2), Indicate(fl, color=JAUNE_TITRE, scale_factor=1.6), run_time=0.6)
        self.play(w[1][3].animate.scale(1.6).set_color(JAUNE_TITRE), run_time=0.3)
        self.play(w[1][3].animate.scale(1 / 1.6), run_time=0.3)
        self.au_mot("Quels résultats")
        q = self.t("Quels résultats peuvent sortir ?", 38, BLEU_CALCUL).move_to(P(2.7, -1.2))
        self.play(Write(q), run_time=0.8)
        self.attendre_voix()

    # ── 02 : la liste ───────────────────────────────────────────────────────

    def ecran_liste(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-liste")
        self.titre_ecran("On les écrit dans l'ordre")
        c, r = P(-4.4, -0.4), 1.6
        w = roue(r, 0.0).move_to(c)
        self.add(w, fleche_roue(c, r))
        boites = VGroup(*[RoundedRectangle(width=0.68, height=0.8, corner_radius=0.1, stroke_color=WHITE,
                                           stroke_width=2.5) for _ in range(8)]).arrange(RIGHT, buff=0.12)
        boites.move_to(P(1.7, 1.0))
        tete = self.t("Les issues :", 34, BLEU_CALCUL).next_to(boites, UP, buff=0.35).align_to(boites, LEFT)
        self.play(FadeIn(tete), FadeIn(boites), run_time=0.5)
        self.au_mot("pour n'en oublier aucun")
        aucun = self.t("pour n'en oublier aucun", 30, GRIS_ETEINT).next_to(tete, RIGHT, buff=0.4)
        self.play(FadeIn(aucun), run_time=0.4)
        nums = VGroup(*[self.t(str(i + 1), 38, WHITE).move_to(b) for i, b in enumerate(boites)])
        extraits = ["1, 2", "2, 3", "3, 4", "4, 5", "5, 6", "6, 7", "7, 8", "8. Il"]
        for i, ex in enumerate(extraits):
            self.au_mot(ex)
            sect = w[0][i]
            self.play(FadeIn(nums[i], scale=1.8), sect.animate.set_fill(opacity=0.35),
                      boites[i].animate.set_stroke(VERT_OK), run_time=0.25)
        self.au_mot("Il y a 8 issues")
        acc = Brace(boites, DOWN, color=VERT_OK)
        huit = self.ligne([("8", JAUNE_TITRE), ("issues", VERT_OK)], 50, 0.2).next_to(acc, DOWN, buff=0.3)
        self.play(GrowFromCenter(acc), FadeIn(huit, scale=0.8), w[0].animate.set_fill(opacity=1), run_time=0.6)
        self.insister(huit[0], 0.35)
        self.play(Create(self.coche(VERT_OK, 0.3).next_to(huit, RIGHT, buff=0.35)), run_time=0.4)
        self.attendre_voix()

    # ── 03 : la trousse ─────────────────────────────────────────────────────

    def stylos_dans(self, centre):
        couleurs = [STYLO_BLEU] * 4 + [STYLO_ROUGE]
        g = VGroup(*[stylo(cc, 2.6) for cc in couleurs]).arrange(DOWN, buff=0.06)
        g.move_to(centre + DOWN * 0.08)
        return g

    def ecran_objets(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-objets")
        self.titre_ecran("Autre expérience : la trousse")
        ct = P(-3.6, 0.6)
        tr = trousse(3.6, 1.9).move_to(ct)
        st = self.stylos_dans(ct)
        self.au_mot("Dans une trousse")
        self.play(FadeIn(tr, scale=0.9), run_time=0.5)
        self.au_mot("4 stylos bleus")
        l1 = self.ligne([("4", JAUNE_TITRE), ("stylos bleus", STYLO_BLEU)], 38, 0.18).move_to(P(2.6, 2.1))
        self.play(LaggedStart(*[FadeIn(s, shift=RIGHT * 0.6) for s in st[:4]], lag_ratio=0.2), FadeIn(l1),
                  run_time=0.9)
        self.au_mot("1 stylo rouge")
        l2 = self.ligne([("1", JAUNE_TITRE), ("stylo rouge", STYLO_ROUGE)], 38, 0.18).move_to(P(2.6, 1.45))
        self.play(FadeIn(st[4], shift=RIGHT * 0.6), FadeIn(l2), run_time=0.5)
        self.au_mot("Les yeux fermés")
        oe = oeil(True, 0.9).move_to(P(0.4, 0.55))
        yf = self.t("yeux fermés", 32).next_to(oe, RIGHT, buff=0.35)
        self.play(FadeIn(oe), FadeIn(yf), run_time=0.4)
        self.au_mot("on en prend un")
        pris = st[2]
        self.play(pris.animate.shift(UP * 1.5).rotate(0.15), run_time=0.6)
        self.au_mot("on regarde sa couleur")
        oe2 = oeil(False, 0.9).move_to(oe)
        coul = self.ligne([("on regarde :", WHITE), ("la couleur", JAUNE_TITRE)], 32, 0.18).next_to(oe2, RIGHT, buff=0.35)
        self.play(ReplacementTransform(oe, oe2), ReplacementTransform(yf, coul), run_time=0.5)
        self.play(Indicate(pris, color=STYLO_BLEU, scale_factor=1.1), run_time=0.5)
        self.play(pris.animate.shift(DOWN * 1.5).rotate(-0.15), run_time=0.5)
        self.au_mot("Les issues sont")
        tete = self.t("Les issues :", 34, BLEU_CALCUL).move_to(P(-4.4, -1.35))
        self.play(FadeIn(tete), run_time=0.4)
        self.au_mot("bleu, et rouge")
        pb = self.puce("bleu", STYLO_BLEU, 32, WHITE).next_to(tete, RIGHT, buff=0.35)
        self.play(GrowFromCenter(pb), run_time=0.3)
        self.au_mot("et rouge")
        pr = self.puce("rouge", STYLO_ROUGE, 32, WHITE).next_to(pb, RIGHT, buff=0.3)
        self.play(GrowFromCenter(pr), run_time=0.3)
        self.au_mot("Seulement 2 issues")
        deux = self.ligne([("2", JAUNE_TITRE), ("issues", VERT_OK)], 48, 0.2).move_to(P(-3.4, -2.45))
        self.play(FadeIn(deux, scale=0.8), run_time=0.4)
        self.insister(deux[0], 0.35)
        self.au_mot("alors qu'il y a 5 stylos")
        cinq = self.ligne([("alors qu'il y a", GRIS_ETEINT), ("5", JAUNE_TITRE), ("stylos", GRIS_ETEINT)], 36, 0.18)
        cinq.next_to(deux, RIGHT, buff=0.6)
        self.play(FadeIn(cinq, shift=LEFT * 0.2), LaggedStart(*[Indicate(s, scale_factor=1.08) for s in st],
                                                               lag_ratio=0.15), run_time=0.9)
        self.attendre_voix()

    # ── 04 : la méthode ─────────────────────────────────────────────────────

    def ecran_methode(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-methode")
        self.titre_ecran("La méthode")
        self.au_mot("d'abord")
        e1 = self.ligne([("D'abord :", JAUNE_TITRE), ("lire ce qu'on regarde", WHITE)], 40, 0.25).move_to(P(-0.6, 2.25))
        oe = oeil(False, 0.8).next_to(e1, LEFT, buff=0.35)
        self.play(FadeIn(e1, shift=RIGHT * 0.2), FadeIn(oe), run_time=0.6)
        self.au_mot("Le numéro")
        mr = roue(0.75, 0.0).move_to(P(-3.6, 0.6))
        fm = fleche_roue(P(-3.6, 0.6), 0.75, 0.13)
        n1 = self.t("le numéro ?", 34, BLEU_CALCUL).next_to(mr, RIGHT, buff=0.35)
        self.play(FadeIn(mr, scale=0.6), FadeIn(fm), FadeIn(n1), run_time=0.5)
        self.play(Rotate(mr, -TAU, about_point=mr.get_center()), run_time=1.0)
        self.au_mot("La couleur")
        sts = VGroup(stylo(STYLO_BLEU, 1.6), stylo(STYLO_ROUGE, 1.6)).arrange(DOWN, buff=0.15).move_to(P(1.6, 0.6))
        n2 = self.t("la couleur ?", 34, BLEU_CALCUL).next_to(sts, RIGHT, buff=0.35)
        self.play(FadeIn(sts, shift=LEFT * 0.3), FadeIn(n2), run_time=0.5)
        self.au_mot("Ensuite")
        e2 = VGroup(self.ligne([("Ensuite :", JAUNE_TITRE), ("écrire chaque résultat possible", WHITE)], 40, 0.25),
                    self.t("une seule fois", 44, VERT_OK)).arrange(DOWN, buff=0.2).move_to(P(-0.6, -1.2))
        self.play(FadeIn(e2[0], shift=RIGHT * 0.2), run_time=0.6)
        self.au_mot("une seule fois")
        self.play(FadeIn(e2[1], scale=0.7), run_time=0.4)
        self.insister(e2[1], 0.35)
        self.play(Create(self.coche(VERT_OK, 0.3).next_to(e2[1], RIGHT, buff=0.35)), run_time=0.4)
        self.attendre_voix()

    # ── 05 : piège 1 : compter les objets ───────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-piege")
        self.titre_ecran("Le piège")
        st = VGroup(*[stylo(cc, 2.2).rotate(PI / 2) for cc in [STYLO_BLEU] * 4 + [STYLO_ROUGE]])
        st.arrange(RIGHT, buff=0.45).move_to(P(-3.4, 0.45))
        self.add(st)
        self.au_mot("compter les objets")
        faux = self.t("compter les objets", 38, ROUGE_ERREUR).move_to(P(2.6, 1.6))
        cpt = VGroup(*[self.t(str(i + 1), 30, ROUGE_ERREUR).next_to(s, DOWN, buff=0.15) for i, s in enumerate(st)])
        self.play(FadeIn(faux), LaggedStart(*[FadeIn(k, scale=1.5) for k in cpt], lag_ratio=0.15), run_time=0.9)
        self.au_mot("au lieu des résultats")
        self.play(Create(self.barrer(faux)), run_time=0.35)
        bon = self.t("compter les résultats", 38, VERT_OK).next_to(faux, DOWN, buff=0.35)
        self.play(FadeIn(bon, shift=UP * 0.15), run_time=0.4)
        self.au_mot("5 stylos")
        cinq = self.ligne([("5", JAUNE_TITRE), ("stylos,", WHITE)], 40, 0.18).move_to(P(-4.6, -2.3))
        self.play(FadeIn(cinq), FadeOut(cpt), run_time=0.4)
        self.au_mot("mais 2 couleurs")
        # les stylos se rangent en deux piles : les bleus ensemble, le rouge à part
        cibles = [P(-5.0 + 0.3 * k, 0.45) for k in range(4)] + [P(-1.8, 0.45)]
        self.play(*[s.animate.move_to(p) for s, p in zip(st, cibles)], run_time=0.6)
        cad = VGroup(SurroundingRectangle(VGroup(*st[:4]), color=STYLO_BLEU, buff=0.15),
                     SurroundingRectangle(st[4], color=STYLO_ROUGE, buff=0.15))
        deux = self.ligne([("mais", WHITE), ("2", JAUNE_TITRE), ("couleurs", WHITE)], 40, 0.18)
        deux.next_to(cinq, RIGHT, buff=0.35)
        self.play(Create(cad), FadeIn(deux), run_time=0.5)
        self.au_mot(": 2 issues")
        iss = self.ligne([("2", JAUNE_TITRE), ("issues", VERT_OK)], 50, 0.2).move_to(P(2.6, -0.4))
        self.play(FadeIn(iss, scale=0.7), run_time=0.4)
        self.insister(iss, 0.35)
        self.attendre_voix()

    # ── 06 : piège 2 : écrire deux fois ─────────────────────────────────────

    def ecran_piege2(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-piege2")
        self.titre_ecran("Deuxième piège")
        self.au_mot("écrire deux fois")
        regle = self.t("écrire deux fois le même résultat", 38, ROUGE_ERREUR).move_to(P(-0.6, 2.3))
        self.play(FadeIn(regle, shift=UP * 0.15), run_time=0.5)
        carnet = RoundedRectangle(width=8.6, height=1.3, corner_radius=0.12, fill_color=WHITE, fill_opacity=1,
                                  stroke_color=GREY_B, stroke_width=2).move_to(P(-1.3, 0.7))
        self.play(FadeIn(carnet), run_time=0.3)
        mots = [("bleu", "#1D4ED8"), ("bleu", "#1D4ED8"), ("bleu", "#1D4ED8"), ("bleu", "#1D4ED8"), ("rouge", "#B91C1C")]
        ecr = VGroup()
        for i, (m, cc) in enumerate(mots):
            ecr.add(Text(m + (" ;" if i < 4 else ""), font_size=30, color=cc, weight=BOLD))
        ecr.arrange(RIGHT, buff=0.28).move_to(carnet)
        extraits = ["Bleu, bleu, bleu, bleu, rouge", "bleu, bleu, bleu, rouge", "bleu, bleu, rouge",
                    "bleu, rouge", "rouge : non"]
        for ex, m in zip(extraits, ecr):
            self.au_mot(ex)
            self.play(Write(m), run_time=0.3)
        self.au_mot("non !")
        croix = self.barrer(VGroup(*ecr), sw=8)
        non = self.t("non !", 60, ROUGE_ERREUR).move_to(P(4.6, 0.7))
        self.play(Create(croix), FadeIn(non, scale=0.5), run_time=0.4)
        self.play(Wiggle(non), run_time=0.5)
        self.au_mot("On écrit bleu")
        bon = RoundedRectangle(width=4.2, height=1.3, corner_radius=0.12, fill_color=WHITE, fill_opacity=1,
                               stroke_color=VERT_OK, stroke_width=5).move_to(P(-2.0, -1.3))
        bt = VGroup(Text("bleu ;", font_size=44, color="#1D4ED8", weight=BOLD),
                    Text("rouge", font_size=44, color="#B91C1C", weight=BOLD)).arrange(RIGHT, buff=0.3).move_to(bon).set_z_index(2)
        self.play(FadeIn(bon), TransformFromCopy(ecr[0], bt[0]), TransformFromCopy(ecr[4], bt[1]), run_time=0.8)
        self.au_mot("une seule fois")
        une = self.t("une seule fois", 40, VERT_OK).next_to(bon, RIGHT, buff=0.5)
        self.play(FadeIn(une, shift=LEFT * 0.2), Create(self.coche(VERT_OK, 0.3).next_to(une, RIGHT, buff=0.3)),
                  run_time=0.5)
        self.insister(VGroup(bon, bt), 0.35)
        self.attendre_voix()

    # ── 07 : défi ───────────────────────────────────────────────────────────

    def crayons_boite(self, cb):
        cols = ["rouge", "rouge", "vert", "jaune", "jaune", "jaune", "jaune"]
        cr = VGroup(*[crayon(CRAYON[c], 1.7, 0.3) for c in cols]).arrange(RIGHT, buff=0.08)
        cr.move_to(cb + UP * 0.55)
        return cr, cols

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        cb = P(-4.2, -0.4)
        bx = boite(3.2, 1.5).move_to(cb)
        cr, _ = self.crayons_boite(cb)
        bx.set_z_index(1)
        self.au_mot("Une boîte")
        self.play(FadeIn(bx), run_time=0.4)
        lignes = [self.ligne([("2", JAUNE_TITRE), ("crayons rouges,", CRAYON["rouge"])], 38, 0.18),
                  self.ligne([("1", JAUNE_TITRE), ("vert", CRAYON["vert"])], 38, 0.18),
                  self.ligne([("et", WHITE), ("4", JAUNE_TITRE), ("jaunes", CRAYON["jaune"])], 38, 0.18)]
        for k, l in enumerate(lignes):
            l.move_to(P(1.4, 2.1 - 0.6 * k)).align_to(P(-0.6, 0), LEFT)
        for ex, idx, l in (("2 crayons rouges", [0, 1], lignes[0]), ("1 vert", [2], lignes[1]),
                           ("4 jaunes", [3, 4, 5, 6], lignes[2])):
            self.au_mot(ex)
            self.play(LaggedStart(*[FadeIn(cr[i], shift=DOWN * 1.2) for i in idx], lag_ratio=0.2), FadeIn(l),
                      run_time=0.6)
        self.au_mot("On en tire un")
        myst = crayon(GREY_B, 1.7, 0.3).move_to(cb + UP * 0.2)
        qm = Text("?", font_size=34, color=BLACK, weight=BOLD).move_to(myst[0])
        myst.add(qm)
        self.add(myst)
        self.play(myst.animate.shift(UP * 1.8).rotate(-0.2), run_time=0.6)
        self.au_mot("Quelles sont les issues")
        q1 = self.t("1. Quelles sont les issues ?", 36, BLEU_CALCUL)
        q1.move_to(P(0, 0.1)).align_to(P(-0.6, 0), LEFT)
        self.play(FadeIn(q1, shift=UP * 0.15), run_time=0.5)
        self.au_mot("Combien")
        q2 = self.t("2. Combien y en a-t-il ?", 36, BLEU_CALCUL).next_to(q1, DOWN, buff=0.35).align_to(q1, LEFT)
        self.play(FadeIn(q2, shift=UP * 0.15), run_time=0.5)
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=36)))
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("07b-correction")
        self.titre_ecran("Correction")
        cb = P(-4.6, 0.4)
        bx = boite(3.2, 1.5).move_to(cb).set_z_index(1)
        cr, cols = self.crayons_boite(cb)
        self.add(bx, cr)
        self.au_mot("On regarde la couleur")
        oe = oeil(False, 0.8).move_to(P(-4.6, -1.3))
        lc = self.t("la couleur", 32, JAUNE_TITRE).next_to(oe, RIGHT, buff=0.3)
        self.play(FadeIn(oe), FadeIn(lc), run_time=0.4)
        xs = {"rouge": -0.6, "vert": 1.6, "jaune": 3.8}
        rang = {"rouge": 0, "vert": 0, "jaune": 0}
        cibles = []
        for c in cols:
            cibles.append(P(xs[c] - 0.35 + 0.22 * rang[c], 1.0))
            rang[c] += 1
        for c in cols:
            pass
        # recentre chaque pile
        for nom in xs:
            idx = [i for i, c in enumerate(cols) if c == nom]
            dx = (cibles[idx[0]][0] + cibles[idx[-1]][0]) / 2 - xs[nom]
            for i in idx:
                cibles[i] = cibles[i] - P(dx, 0)
        puces = {}
        for ex, nom in (("rouge,", "rouge"), ("vert,", "vert"), ("jaune.", "jaune")):
            self.au_mot(ex)
            idx = [i for i, c in enumerate(cols) if c == nom]
            pc = self.puce(nom, CRAYON[nom], 32, BLACK if nom == "jaune" else WHITE).move_to(P(xs[nom], -0.35))
            puces[nom] = pc
            self.play(*[cr[i].animate.move_to(cibles[i]) for i in idx], GrowFromCenter(pc), run_time=0.5)
        self.au_mot("Il y a 3 issues")
        trois = self.ligne([("3", JAUNE_TITRE), ("issues", VERT_OK)], 50, 0.2).move_to(P(1.6, -1.4))
        self.play(FadeIn(trois, scale=0.8), *[Indicate(p, scale_factor=1.15) for p in puces.values()], run_time=0.6)
        self.insister(trois[0], 0.35)
        self.au_mot("même s'il y a 7 crayons")
        sept = self.ligne([("même s'il y a", GRIS_ETEINT), ("7", JAUNE_TITRE), ("crayons", GRIS_ETEINT)], 36, 0.18)
        sept.next_to(trois, DOWN, buff=0.3)
        self.play(FadeIn(sept, shift=LEFT * 0.2), run_time=0.5)
        self.attendre_voix()

    # ── 08 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)))
        acquis = [
            ("Une issue, c'est", "Une issue : un résultat possible"),
            ("On lit ce qu'on regarde", "Lire ce qu'on regarde, puis écrire"),
            ("chaque résultat une seule fois", "chaque résultat une seule fois"),
            ("Les objets ne sont pas", "Les objets ne sont pas les issues"),
        ]
        lignes = VGroup(*[VGroup(self.coche(), self.t(txt, 38)).arrange(RIGHT, buff=0.3) for _, txt in acquis])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.55)
        lignes[2][0].set_opacity(0)  # suite de la ligne précédente : pas de coche
        lignes[2].shift(UP * 0.35)
        lignes[3].shift(UP * 0.1)
        if lignes.width > 11.6:
            lignes.scale_to_fit_width(11.6)
        lignes.move_to(P(-0.6, 0.6))
        for k, ((mot, _), l) in enumerate(zip(acquis, lignes)):
            self.au_mot(mot)
            self.play(FadeIn(l[1], shift=RIGHT * 0.2), run_time=0.6)
            if k != 2:
                self.play(Create(l[0]), run_time=0.4)
        self.au_mot("L'épisode 3")
        self.play(Write(self.chute("Épisode 3 : les événements", color=VERT_OK, font_size=38)))
        self.attendre_voix(marge=1.0)

    # ── déroulé ─────────────────────────────────────────────────────────────

    def construct(self):
        self.page_garde()
        self.ecran_situation()
        self.ecran_liste()
        self.ecran_objets()
        self.ecran_methode()
        self.ecran_piege()
        self.ecran_piege2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="09-abonne")
