# proba6_estimer.py
# EleveAI — Maths 6e — série « Probabilités », épisode 4 : calculer une
# probabilité, une fraction (micro : proba_estimer), AVEC VOIX. Paysage 16:9,
# CEINTURE JAUNE. Short jumeau : proba6_estimer_short.py (ceinture jaune).
#
# Écrans : 00 garde · 01 les petits chevaux (il faut un 6) · 02 compter : la
# face 6 MONTE au-dessus de la barre, les 6 faces DESCENDENT dessous → 1 sur 6
# · 03 la fraction (en haut les favorables, en bas toutes les issues) puis 1/6
# se pose sur l'échelle · 04 « pair » : 2, 4, 6 montent, les 6 faces en bas,
# 3 sur 6 = un demi, au milieu de l'échelle · 05 le piège 6 sur 1 (dépasse 1)
# · 06 défi du sac de 10 billes · 06b correction (3 sur 10 sur l'échelle) ·
# 07 ce que tu as appris · 08 abonnement.
#
# ⭐ Canvas repris du coach (lib/tutor-v4/components/ProbabilitesCanvas.tsx,
# banque 6e/maths/probabilites.bank.ts, micro proba_estimer) :
#   · « de » : carte blanche, 6 faces en 3 × 2, liseré foncé, points aux
#     positions du composant ; faces « surligne » sur fond ambré (#fef3c7,
#     bordure #fbbf24) — dont le canvas surligne [2, 4, 6] de la banque ;
#   · « billes » : billes en grille, colonnes = min(6, max(3, ⌈√n⌉)), rouge
#     #ef4444 / bleu #3b82f6, liseré ardoise, sur carte blanche.
# ⭐ Fil rouge de la série : l'échelle de 0 à 1 (impossible → certain).
# ⛔ 17/10 « pas d'écart » : un nombre n'est écrit qu'au moment où il est dit ;
# l'échelle porte des MOTS (impossible / certain), ses 0 et 1 n'apparaissent
# que quand la voix les dit (écrans 05 et 07).
#
# Voix : manim/voix/6e-proba-estimer.json (Julie, débit −10).
# Rendu : python -m manim render -qh --disable_caching manim/scripts/6e/proba6_estimer.py Proba6Estimer -o eleveai-maths-6e-proba-estimer --media_dir manim/scripts/6e/media
# Puis copier le mp4 dans manim/sorties/6e/maths/probabilites/04-calculer/.

import importlib.util
import math
import sys
from pathlib import Path

import numpy as np

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI.parents[1]))
sys.path.insert(0, str(ICI.parent / "seconde"))
sys.path.insert(0, str(ICI.parent / "annonce"))

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Notion6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402


def _charger(nom, chemin):
    """Charge un module PAR SON CHEMIN EXACT (des homonymes existent ailleurs)."""
    spec = importlib.util.spec_from_file_location(nom, chemin)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


_voc3e = _charger("proba_vocabulaire_3e_estimer", ICI.parent / "3e" / "proba_vocabulaire.py")
plateau_chevaux = _voc3e.plateau_chevaux

# les couleurs du coach
C_ROUGE = "#ef4444"
C_BLEU = "#3b82f6"
ENCRE = "#0f172a"
FACE_DE = "#f8fafc"
FACE_ACTIVE = "#fef3c7"
BORD_ACTIF = "#fbbf24"
BORD_CARTE = "#e2e8f0"
GRIS_ETEINT = "#6B7280"


class Notion6eProba(Notion6e):
    identite = "Maths 6e — EleveAI"


def P(x, y):
    return np.array([x, y, 0.0])


# ── les canvas du coach ─────────────────────────────────────────────────────

POINTS_COACH = {
    1: [(50, 50)],
    2: [(30, 30), (70, 70)],
    3: [(30, 30), (50, 50), (70, 70)],
    4: [(30, 30), (70, 30), (30, 70), (70, 70)],
    5: [(30, 30), (70, 30), (50, 50), (30, 70), (70, 70)],
    6: [(30, 28), (70, 28), (30, 50), (70, 50), (30, 72), (70, 72)],
}


def de_coach(face, cote=1.0, actif=False):
    """Une face de dé comme sur le coach (viewBox 100, carré de 84)."""
    k = cote / 84
    corps = RoundedRectangle(width=cote, height=cote, corner_radius=16 * k,
                             fill_color=FACE_ACTIVE if actif else FACE_DE, fill_opacity=1,
                             stroke_color=BORD_ACTIF if actif else ENCRE, stroke_width=6 if actif else 3)
    pts = VGroup(*[Dot(P((x - 50) * k, -(y - 50) * k), radius=6 * k, color=ENCRE)
                   for x, y in POINTS_COACH[face]])
    return VGroup(corps, pts)


def carte_de(cote=0.9, gap=0.22):
    """Le canvas « de » : carte blanche, les 6 faces en grille 3 × 2. Renvoie (carte, faces)."""
    faces = VGroup(*[de_coach(f, cote) for f in range(1, 7)])
    faces.arrange_in_grid(rows=2, cols=3, buff=gap)
    fond = RoundedRectangle(width=faces.width + 0.5, height=faces.height + 0.5, corner_radius=0.2,
                            fill_color=WHITE, fill_opacity=1, stroke_color=BORD_CARTE, stroke_width=2)
    fond.move_to(faces)
    return VGroup(fond, faces), faces


def surligner(face_mob, on=True):
    """La face « surlignée » du coach : fond ambré, bordure ambre."""
    face_mob[0].set_fill(FACE_ACTIVE if on else FACE_DE)
    face_mob[0].set_stroke(BORD_ACTIF if on else ENCRE, 6 if on else 3)


def de_coach_qui_roule(centre, cote=1.2, periode=0.16, faces=None):
    """La face du coach qui roule SANS FIN (updater)."""
    faces = faces or [3, 5, 2, 6, 1, 4]
    etat = {"t": 0.0}
    holder = VGroup(de_coach(faces[0], cote).move_to(centre))

    def maj(m, dt):
        etat["t"] += dt
        k = int(etat["t"] / periode)
        ang = 0.35 * math.sin(etat["t"] * 9)
        saut = 0.12 * abs(math.sin(etat["t"] * 9))
        m.remove(*m.submobjects)
        m.add(de_coach(faces[k % len(faces)], cote).rotate(ang).move_to(centre + UP * saut))

    holder.add_updater(maj)
    return holder


def bille_coach(couleur, r=0.3):
    return Circle(radius=r, fill_color=couleur, fill_opacity=1, stroke_color=ENCRE, stroke_width=3)


# le sac du défi : 3 rouges parmi 10, mélangées une fois pour toutes
SAC_10 = [C_BLEU, C_ROUGE, C_BLEU, C_BLEU, C_BLEU, C_ROUGE, C_BLEU, C_BLEU, C_ROUGE, C_BLEU]


def carte_billes(couleurs, r=0.3, pas=0.78):
    """Le canvas « billes » : colonnes = min(6, max(3, ⌈√n⌉)). Renvoie (carte, billes)."""
    n = len(couleurs)
    cols = min(6, max(3, math.ceil(math.sqrt(n))))
    billes = VGroup(*[bille_coach(c, r).move_to(P((i % cols) * pas, -(i // cols) * pas))
                      for i, c in enumerate(couleurs)])
    lignes = math.ceil(n / cols)
    fond = RoundedRectangle(width=cols * pas + 0.3, height=lignes * pas + 0.3, corner_radius=0.2,
                            fill_color=WHITE, fill_opacity=1, stroke_color=BORD_CARTE, stroke_width=2)
    fond.move_to(P((cols - 1) * pas / 2, -(lignes - 1) * pas / 2))
    return VGroup(fond, billes), billes


def sac_autour(carte):
    """Le sac transparent, dessiné autour de la carte du coach."""
    corps = RoundedRectangle(width=carte.width + 0.6, height=carte.height + 0.6, corner_radius=0.45,
                             stroke_color=WHITE, stroke_width=4, fill_color="#E0F2FE",
                             fill_opacity=0.08).move_to(carte)
    col = Polygon(P(-0.6, 0), P(0.6, 0), P(0.35, 0.35), P(-0.35, 0.35), stroke_color=WHITE, stroke_width=4,
                  fill_color="#E0F2FE", fill_opacity=0.08).move_to(corps.get_top() + UP * 0.17)
    lien = Line(P(-0.42, 0), P(0.42, 0), color=ORANGE_RETENUE, stroke_width=7).move_to(corps.get_top() + UP * 0.2)
    return VGroup(corps, col, lien)


# ── la fraction et l'échelle ────────────────────────────────────────────────

def nombre(txt, fs=72, color=WHITE):
    return Text(str(txt), font_size=fs, color=color, weight=BOLD)


def barre(largeur, color=WHITE, sw=5):
    return Line(LEFT * largeur / 2, RIGHT * largeur / 2, color=color, stroke_width=sw)


def fraction(num, den, fs=72, color=WHITE, c_num=None, c_den=None):
    """Une fraction ÉCRITE (pas de LaTeX) : [0] numérateur, [1] barre, [2] dénominateur."""
    n = nombre(num, fs, c_num or color)
    d = nombre(den, fs, c_den or color)
    b = barre(max(n.width, d.width) + 0.25, color, 4 + fs / 24)
    return VGroup(n, b, d).arrange(DOWN, buff=0.12)


def echelle(x0, x1, y, sw=12, h=0.22):
    """L'échelle des probabilités : [0] la barre dégradée, [1] les deux bouts, [2] la graduation du milieu."""
    b = Line(P(x0, y), P(x1, y), stroke_width=sw)
    b.set_color([VERT_OK, JAUNE_TITRE, ORANGE_RETENUE, ROUGE_ERREUR])  # manim inverse le dégradé : rouge à GAUCHE
    bouts = VGroup(*[Line(P(x, y - h), P(x, y + h), stroke_width=5) for x in (x0, x1)])
    milieu = Line(P((x0 + x1) / 2, y - h * 0.7), P((x0 + x1) / 2, y + h * 0.7), stroke_width=3)
    return VGroup(b, bouts, milieu)


# ── la vidéo ────────────────────────────────────────────────────────────────

class Proba6Estimer(Notion6eProba):
    nom_voix = "6e-proba-estimer"

    # l'échelle du bas (paysage)
    X0, X1, YE = -5.4, 3.0, -2.35

    def t(self, texte, font_size=40, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def insister(self, mob, run_time=0.35):
        self.play(mob.animate.scale(1.5), run_time=run_time)
        self.play(mob.animate.scale(1 / 1.5), run_time=run_time)

    def barrer(self, mob, color=ROUGE_ERREUR, sw=8):
        return VGroup(Line(mob.get_corner(UL) + P(-0.1, 0.1), mob.get_corner(DR) + P(0.1, -0.1)),
                      Line(mob.get_corner(UR) + P(0.1, 0.1), mob.get_corner(DL) + P(-0.1, -0.1))
                      ).set_stroke(color, sw)

    def x_de(self, p):
        return self.X0 + (self.X1 - self.X0) * p

    def poser_echelle(self, run_time=0.7):
        """L'échelle avec ses MOTS (pas de nombre : ils viennent avec la voix)."""
        ech = echelle(self.X0, self.X1, self.YE)
        imp = self.t("impossible", 28, ROUGE_ERREUR).next_to(P(self.X0, self.YE - 0.22), DOWN, buff=0.12)
        cer = self.t("certain", 28, VERT_OK).next_to(P(self.X1, self.YE - 0.22), DOWN, buff=0.12)
        self.play(Create(ech), FadeIn(imp), FadeIn(cer), run_time=run_time)
        return VGroup(ech, imp, cer)

    def poser_sur_echelle(self, frac_src, p, couleur=JAUNE_TITRE, run_time=1.0):
        """Une copie de la fraction descend se poser au-dessus du point p de l'échelle."""
        x = self.x_de(p)
        tag = frac_src.copy()
        cible_h = 0.9
        tag.generate_target()
        tag.target.scale_to_fit_height(cible_h).move_to(P(x, self.YE + 0.55 + cible_h / 2))
        pt = Dot(P(x, self.YE), radius=0.13, color=couleur)
        fl = Line(P(x, self.YE + 0.5), P(x, self.YE + 0.14), color=couleur, stroke_width=5)
        self.play(MoveToTarget(tag), run_time=run_time)
        self.play(Create(fl), GrowFromCenter(pt), Flash(pt, color=couleur), run_time=0.45)
        return VGroup(tag, fl, pt)

    def monter(self, sources, cibles_xy, cote, run_time=0.7, lag=0.12):
        """Des COPIES des faces (ou billes) volent vers leurs places ; renvoie les copies."""
        copies = VGroup(*[s.copy() for s in sources])
        anims = []
        for c, (x, y) in zip(copies, cibles_xy):
            c.generate_target()
            c.target.scale_to_fit_width(cote).move_to(P(x, y))
            anims.append(MoveToTarget(c, path_arc=-0.5))
        self.play(LaggedStart(*anims, lag_ratio=lag), run_time=run_time)
        return copies

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("Calculer une probabilité", 60, JAUNE_TITRE).to_edge(UP, buff=0.6)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.25)
        ech = echelle_ceintures("jaune").move_to(P(-0.6, -2.6))
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech), run_time=1.0)
        roule = de_coach_qui_roule(P(-2.6, 0.3), 1.5)
        self.add(roule)
        haut = de_coach(6, 0.8, actif=True).move_to(P(1.6, 1.0))
        b = barre(2.6, WHITE, 7).move_to(P(1.6, 0.3))
        bas = VGroup(*[de_coach(f, 0.36) for f in range(1, 7)]).arrange(RIGHT, buff=0.06).move_to(P(1.6, -0.25))
        self.play(GrowFromCenter(b), run_time=0.4)
        self.play(FadeIn(haut, shift=DOWN * 0.3), LaggedStart(*[FadeIn(d, shift=UP * 0.2) for d in bas],
                                                              lag_ratio=0.1), run_time=0.8)
        self.attendre_voix(marge=1.0)
        roule.clear_updaters()

    # ── 01 : les petits chevaux ─────────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.titre_ecran("Les petits chevaux")
        plat, pions, chemin = plateau_chevaux(4.2)
        plat.move_to(P(-3.8, 0.0))
        decal = plat[0].get_center()
        chemin = [p + decal for p in chemin]
        self.play(FadeIn(plat, scale=0.9), run_time=0.7)
        roule = de_coach_qui_roule(P(1.6, 0.6), 1.6)
        self.add(roule)
        self.au_mot("il faut un 6")
        six = nombre("6", 120, JAUNE_TITRE).move_to(P(4.0, 0.6))
        self.play(FadeIn(six, scale=0.5), run_time=0.4)
        self.insister(six, 0.3)
        self.au_mot("pour sortir")
        roule.clear_updaters()
        self.remove(roule)
        fini = de_coach(6, 1.6, actif=True).move_to(P(1.6, 0.6))
        self.add(fini)
        rouge = pions[0]
        self.play(rouge.animate.move_to(chemin[0]).scale(1.3), run_time=0.5)
        self.play(rouge.animate.scale(1 / 1.3), run_time=0.2)
        self.au_mot("Quelle est la probabilité")
        q = self.t("?", 130, ORANGE_RETENUE).move_to(P(1.6, -1.6))
        self.play(FadeIn(q, scale=0.5), run_time=0.4)
        self.insister(q, 0.3)
        self.attendre_voix()

    # ── 02 : compter → la fraction se construit avec les faces ──────────────

    XC, YH, YB, YBARRE = 0.6, 1.65, 0.05, 0.85   # zone de la fraction de dés
    XN = 4.6                                    # la fraction écrite, à droite
    PAS_BAS, COTE_BAS = 0.78, 0.64

    def x_bas(self, i, n=6):
        return self.XC + (i - (n - 1) / 2) * self.PAS_BAS

    def poser_carte(self, centre=P(-4.65, 0.85), surligne=()):
        carte, faces = carte_de(0.8, 0.2)
        carte.move_to(centre)
        for f in surligne:
            surligner(faces[f - 1])
        self.play(FadeIn(carte, shift=RIGHT * 0.3), run_time=0.6)
        return carte, faces

    def ecran_formule(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-formule")
        self.titre_ecran("Je compte")
        carte, faces = self.poser_carte()

        self.au_mot("une seule, le 6")
        self.play(faces[5].animate.scale(1.25), run_time=0.25)
        surligner(faces[5])
        self.play(faces[5].animate.scale(1 / 1.25), run_time=0.25)
        haut = self.monter([faces[5]], [(self.XC, self.YH)], self.COTE_BAS + 0.1, 0.7)
        n1 = nombre("1", 84, VERT_OK).move_to(P(self.XN, self.YH))
        self.play(FadeIn(n1, scale=0.5), run_time=0.35)

        self.au_mot("Je compte toutes")
        tour = SurroundingRectangle(faces, color=BLEU_CALCUL, buff=0.12, stroke_width=6, corner_radius=0.12)
        self.play(Create(tour), run_time=0.6)
        self.au_mot("issues : 6")
        bas = self.monter(list(faces), [(self.x_bas(i), self.YB) for i in range(6)], self.COTE_BAS, 1.0)
        n6 = nombre("6", 84, BLEU_CALCUL).move_to(P(self.XN, self.YB))
        self.play(FadeIn(n6, scale=0.5), run_time=0.35)

        self.au_mot("c'est 1 sur 6")
        b_des = barre(6 * self.PAS_BAS + 0.3, WHITE, 7).move_to(P(self.XC, self.YBARRE))
        egal = self.t("=", 80).move_to(P(3.55, self.YBARRE))
        b_num = barre(1.0, WHITE, 7).move_to(P(self.XN, self.YBARRE))
        self.play(GrowFromCenter(b_des), GrowFromCenter(b_num), FadeIn(egal), run_time=0.6)
        self.insister(VGroup(n1, b_num, n6), 0.3)
        self.attendre_voix()

    # ── 03 : la fraction ; elle se pose sur l'échelle ───────────────────────

    def ecran_fraction(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-fraction")
        self.titre_ecran("Une fraction")
        self.au_mot("1 sur 6")
        fr = fraction("1", "6", 110).move_to(P(-3.6, 0.75))
        self.play(FadeIn(fr[0], shift=DOWN * 0.2), GrowFromCenter(fr[1]), FadeIn(fr[2], shift=UP * 0.2),
                  run_time=0.6)

        self.au_mot("En haut")
        lbl_h = VGroup(self.t("favorables", 44, VERT_OK), de_coach(6, 0.6, actif=True)).arrange(RIGHT, buff=0.3)
        lbl_h.move_to(P(0.9, fr[0].get_center()[1])).align_to(P(-1.6, 0), LEFT)
        fl_h = Arrow(lbl_h.get_left(), fr[0].get_right(), buff=0.2, color=VERT_OK, stroke_width=6,
                     max_tip_length_to_length_ratio=0.25)
        self.play(fr[0].animate.set_color(VERT_OK), GrowArrow(fl_h), FadeIn(lbl_h, shift=LEFT * 0.3),
                  run_time=0.6)
        self.insister(fr[0], 0.3)

        self.au_mot("En bas")
        rang = VGroup(*[de_coach(f, 0.42) for f in range(1, 7)]).arrange(RIGHT, buff=0.08)
        lbl_b = VGroup(self.t("toutes les issues", 44, BLEU_CALCUL), rang).arrange(DOWN, buff=0.15,
                                                                                 aligned_edge=LEFT)
        lbl_b.move_to(P(0.9, fr[2].get_center()[1] - 0.2)).align_to(P(-1.6, 0), LEFT)
        fl_b = Arrow(lbl_b[0].get_left(), fr[2].get_right(), buff=0.2, color=BLEU_CALCUL, stroke_width=6,
                     max_tip_length_to_length_ratio=0.25)
        self.play(fr[2].animate.set_color(BLEU_CALCUL), GrowArrow(fl_b), FadeIn(lbl_b, shift=LEFT * 0.3),
                  run_time=0.6)
        self.insister(fr[2], 0.3)

        self.poser_echelle(0.6)
        self.poser_sur_echelle(fr, 1 / 6)
        self.attendre_voix(marge=1.0)

    # ── 04 : un nombre pair → 3 sur 6 = un demi ─────────────────────────────

    def ecran_pair(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-pair")
        self.titre_ecran("Un nombre pair")
        carte, faces = self.poser_carte()
        for ex, f in zip([": 2,", "4, 6", "6, trois"], (2, 4, 6)):
            self.au_mot(ex)
            self.play(faces[f - 1].animate.scale(1.25), run_time=0.2)
            surligner(faces[f - 1])
            self.play(faces[f - 1].animate.scale(1 / 1.25), run_time=0.2)

        self.au_mot("trois issues")
        haut = self.monter([faces[1], faces[3], faces[5]],
                           [(self.XC + (k - 1) * self.PAS_BAS, self.YH) for k in range(3)], self.COTE_BAS, 0.8)
        n3 = nombre("3", 84, VERT_OK).move_to(P(self.XN, self.YH))
        self.play(FadeIn(n3, scale=0.5), run_time=0.35)

        self.au_mot("sur 6.")
        bas = self.monter(list(faces), [(self.x_bas(i), self.YB) for i in range(6)], self.COTE_BAS, 0.9)
        n6 = nombre("6", 84, BLEU_CALCUL).move_to(P(self.XN, self.YB))
        self.play(FadeIn(n6, scale=0.5), run_time=0.35)

        self.au_mot("c'est 3 sur 6")
        b_des = barre(6 * self.PAS_BAS + 0.3, WHITE, 7).move_to(P(self.XC, self.YBARRE))
        egal = self.t("=", 80).move_to(P(3.55, self.YBARRE))
        b_num = barre(1.0, WHITE, 7).move_to(P(self.XN, self.YBARRE))
        self.play(GrowFromCenter(b_des), GrowFromCenter(b_num), FadeIn(egal), run_time=0.6)
        fr = VGroup(n3, b_num, n6)
        self.insister(fr, 0.3)

        self.au_mot("un demi")
        # la moitié se VOIT : les 3 faces du haut couvrent la moitié de la rangée du bas
        accol = Brace(VGroup(*bas[:3]), DOWN, color=VERT_OK, buff=0.08)
        self.play(GrowFromCenter(accol), run_time=0.35)
        self.poser_echelle(0.5)
        tag = self.poser_sur_echelle(fr, 0.5, VERT_OK, 0.8)
        demi = VGroup(self.t("=", 54), fraction("1", "2", 54, VERT_OK)).arrange(RIGHT, buff=0.2)
        demi.next_to(tag[0], RIGHT, buff=0.25)
        self.play(FadeIn(demi, shift=LEFT * 0.2), run_time=0.4)
        self.insister(demi[1], 0.3)
        self.attendre_voix(marge=1.0)

    # ── 05 : le piège 6 sur 1 ───────────────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-piege")
        self.titre_ecran("Le piège")
        self.au_mot("6 sur 1")
        faux = fraction("6", "1", 100, ROUGE_ERREUR).move_to(P(-3.8, 0.8))
        self.play(FadeIn(faux, scale=0.6), run_time=0.5)
        croix = self.barrer(faux)
        self.play(Create(croix), run_time=0.4)

        self.au_mot("En haut, toujours")
        bon = fraction("1", "6", 100, c_num=VERT_OK, c_den=BLEU_CALCUL).move_to(P(0.2, 0.8))
        self.play(FadeIn(bon, shift=LEFT * 0.3), run_time=0.5)
        lbl = VGroup(self.t("favorables", 40, VERT_OK), de_coach(6, 0.55, actif=True)).arrange(RIGHT, buff=0.25)
        lbl.next_to(bon[0], RIGHT, buff=0.6)
        self.play(FadeIn(lbl, shift=LEFT * 0.2), run_time=0.4)
        self.au_mot("les plus petits")
        self.insister(bon[0], 0.35)

        self.au_mot("ne dépasse jamais 1")
        ech = self.poser_echelle(0.6)
        un = nombre("1", 60, JAUNE_TITRE).next_to(P(self.X1, self.YE + 0.25), UP, buff=0.12)
        self.play(FadeIn(un, scale=0.5), Flash(P(self.X1, self.YE), color=VERT_OK), run_time=0.4)
        self.insister(un, 0.3)
        # le 6 sur 1 tomberait AU-DELÀ de 1, hors de l'échelle : barré
        petit = faux.copy()
        self.play(petit.animate.scale_to_fit_height(0.85).move_to(P(self.X1 + 1.35, self.YE + 0.8)), run_time=0.7)
        hors = Line(P(self.X1 + 0.1, self.YE), P(self.X1 + 1.9, self.YE), color=ROUGE_ERREUR, stroke_width=6)
        hors = DashedVMobject(hors, num_dashes=6)
        self.play(Create(hors), run_time=0.3)
        self.play(Create(self.barrer(petit, sw=7)), run_time=0.35)

        self.attendre_voix(marge=0.8)

    # ── 06 : défi du sac de billes ──────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("06-defi")
        self.play(Write(self.t("À toi de jouer", 50, JAUNE_TITRE).to_edge(UP)))
        self.au_mot("Un sac de 10")
        carte, billes = carte_billes(SAC_10, 0.3, 0.78)
        carte.move_to(P(-3.4, 0.3))
        sac = sac_autour(carte)
        self.play(Create(sac), FadeIn(carte[0]),
                  LaggedStart(*[FadeIn(b, scale=0.4) for b in billes], lag_ratio=0.08), run_time=1.0)
        self.au_mot("10 billes")
        dix = VGroup(nombre("10", 72, WHITE), self.t("billes", 44)).arrange(RIGHT, buff=0.25)
        dix.move_to(P(2.4, 1.6))
        self.play(FadeIn(dix, shift=LEFT * 0.2), run_time=0.4)
        self.au_mot("3 rouges")
        rouges = [b for b, c in zip(billes, SAC_10) if c == C_ROUGE]
        trois = VGroup(nombre("3", 72, C_ROUGE), self.t("rouges", 44, C_ROUGE)).arrange(RIGHT, buff=0.25)
        trois.next_to(dix, DOWN, buff=0.35).align_to(dix, LEFT)
        self.play(FadeIn(trois, shift=LEFT * 0.2),
                  *[Indicate(b, color=JAUNE_TITRE, scale_factor=1.4) for b in rouges], run_time=0.6)
        self.au_mot("Quelle est la probabilité")
        q = fraction("?", "?", 72, ORANGE_RETENUE).move_to(P(2.4, -1.0))
        bille_q = bille_coach(C_ROUGE, 0.3).next_to(q, LEFT, buff=0.5)
        self.play(FadeIn(bille_q, scale=0.5), FadeIn(q, scale=0.6), run_time=0.5)
        self.insister(q, 0.3)
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=40)))
        self.attendre_voix(marge=2.0)

    # ── 06b : correction ────────────────────────────────────────────────────

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("06b-correction")
        self.titre_ecran("Correction")
        carte, billes = carte_billes(SAC_10, 0.26, 0.66)
        carte.move_to(P(-4.9, 0.85))
        self.play(FadeIn(carte, shift=RIGHT * 0.3), run_time=0.5)
        xc, pas, cote = 0.3, 0.52, 0.44
        rouges = [b for b, c in zip(billes, SAC_10) if c == C_ROUGE]

        self.au_mot("3 favorables")
        self.play(*[Indicate(b, color=JAUNE_TITRE, scale_factor=1.4) for b in rouges], run_time=0.4)
        self.monter(rouges, [(xc + (k - 1) * pas, self.YH) for k in range(3)], cote, 0.7)
        n3 = nombre("3", 84, VERT_OK).move_to(P(self.XN, self.YH))
        self.play(FadeIn(n3, scale=0.5), run_time=0.3)

        self.au_mot("sur 10")
        self.monter(list(billes), [(xc + (i - 4.5) * pas, self.YB) for i in range(10)], cote, 0.9, 0.06)
        n10 = nombre("10", 84, BLEU_CALCUL).move_to(P(self.XN, self.YB))
        self.play(FadeIn(n10, scale=0.5), run_time=0.3)

        self.au_mot("est 3 sur 10")
        b_des = barre(10 * pas + 0.3, WHITE, 7).move_to(P(xc, self.YBARRE))
        egal = self.t("=", 80).move_to(P(3.55, self.YBARRE))
        b_num = barre(1.4, WHITE, 7).move_to(P(self.XN, self.YBARRE))
        self.play(GrowFromCenter(b_des), GrowFromCenter(b_num), FadeIn(egal), run_time=0.6)
        fr = VGroup(n3, b_num, n10)
        self.insister(fr, 0.3)
        self.poser_echelle(0.5)
        self.poser_sur_echelle(fr, 0.3, VERT_OK, 0.8)
        self.attendre_voix(marge=1.0)

    # ── 07 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-finale")
        self.play(Write(self.t("Ce que tu as appris", 48, JAUNE_TITRE).to_edge(UP)))

        self.au_mot("les issues favorables")
        mots = VGroup(self.t("favorables", 46, VERT_OK), barre(4.6, WHITE, 6),
                      self.t("toutes les issues", 46, BLEU_CALCUL)).arrange(DOWN, buff=0.15)
        c1 = self.coche()
        l1 = VGroup(c1, mots).arrange(RIGHT, buff=0.5).move_to(P(-1.2, 1.55))
        self.play(FadeIn(mots[0], shift=DOWN * 0.2), GrowFromCenter(mots[1]), run_time=0.5)
        self.au_mot("sur toutes")
        self.play(FadeIn(mots[2], shift=UP * 0.2), run_time=0.5)
        self.play(Create(c1), run_time=0.35)

        self.au_mot("en fraction")
        c2 = self.coche()
        l2 = VGroup(c2, self.t("une fraction", 46)).arrange(RIGHT, buff=0.5)
        l2.move_to(P(-1.2, -0.05)).align_to(l1, LEFT)
        self.play(FadeIn(l2[1], shift=RIGHT * 0.2), run_time=0.45)
        self.play(Create(c2), run_time=0.35)

        self.au_mot("entre 0 et 1")
        x0, x1, y = -4.2, 1.6, -1.3
        c3 = self.coche().move_to(P(-5.6, y))
        ech = echelle(x0, x1, y, 10, 0.2)
        n0 = nombre("0", 50, JAUNE_TITRE).next_to(P(x0, y - 0.2), DOWN, buff=0.12)
        n1 = nombre("1", 50, JAUNE_TITRE).next_to(P(x1, y - 0.2), DOWN, buff=0.12)
        self.play(Create(ech), FadeIn(n0, scale=0.5), run_time=0.5)
        self.play(FadeIn(n1, scale=0.5), run_time=0.3)
        self.play(Create(c3), run_time=0.35)

        self.au_mot("L'épisode 5")
        self.play(Write(self.chute("Épisode 5 : lire une situation", color=VERT_OK, font_size=40)))
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_formule()
        self.ecran_fraction()
        self.ecran_pair()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="08-abonne")
