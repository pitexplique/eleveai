# proba6_vocabulaire.py
# EleveAI — Maths 6e — série « Probabilités », épisode 1 : L'ÉCHELLE DE 0 À 1
# (impossible, certain, un demi) — micro : proba_vocabulaire. AVEC VOIX.
# Paysage 16:9, CEINTURE BLANCHE.
# Short jumeau : proba6_vocabulaire_short.py (ceinture blanche, le sac tout rouge).
#
# ⭐⭐ LES CANVAS DU COACH (lib/tutor-v4/components/ProbabilitesCanvas.tsx), tels
# que les questions de la micro proba_vocabulaire les dessinent :
#   · « de »     : les 6 faces en grille 3 × 2 sur une carte blanche, faces
#                  claires (#f8fafc) bordées d'ardoise, faces SURLIGNÉES en ambre
#                  (#fef3c7, bord #fbbf24) ;
#   · « billes » : billes en grille (colonnes = min(6, max(3, ⌈√n⌉))), rouge
#                  #ef4444 / bleu #3b82f6, bord ardoise, SANS lettre (la banque
#                  6e ne met pas de label), sur une carte blanche.
# ⭐ Fil rouge de la série : L'ÉCHELLE DE 0 À 1 (impossible à 0, un demi au
# milieu, certain à 1), rouge → vert comme les mots.
# Style et dessins repris du CM2 (manim/scripts/cm2/proba_vocabulaire.py) : jeu
# de l'oie, carte du dé, sac de billes ; la pièce et le dé qui roule viennent de
# la bande-annonce.
#
# Écrans : 00 garde · 01 le jeu de l'oie (faire 7 ? entre 1 et 6 ? faire 6 ?) ·
# 02 impossible / certain (la carte du dé) · 03 l'échelle de 0 à 1 · 04 le
# milieu : un demi (pile ou face) · 05 le piège (jamais plus de 1) · 06 défi du
# sac tout rouge · 06b correction · 07 ce que tu as appris · 08 abonnement.
#
# Voix : manim/voix/6e-proba-vocabulaire.json (débit −10).
# Rendu : python -m manim render -qh --disable_caching manim/scripts/6e/proba6_vocabulaire.py Proba6Vocabulaire -o eleveai-maths-6e-proba-vocabulaire --media_dir manim/scripts/6e/media
# Puis copier le mp4 dans manim/sorties/6e/maths/probabilites/01-vocabulaire/.

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
from annonce_probabilites import de_qui_roule, piece_qui_tourne  # noqa: E402

# couleurs du canvas du coach
ARDOISE = "#0F172A"
FACE_CLAIRE = "#F8FAFC"
FACE_AMBRE = "#FEF3C7"
BORD_AMBRE = "#FBBF24"
BORD_GRIS = "#CBD5E1"
CARTE_FOND = "#FFFFFF"
ROUGE_BILLE = "#EF4444"
BLEU_BILLE = "#3B82F6"

# les mots, chacun sa couleur, partout (comme au CM2)
C_CERTAIN = VERT_OK
C_POSSIBLE = BLEU_CALCUL
C_IMPOSSIBLE = ROUGE_ERREUR

POINTS_COACH = {  # ProbabilitesCanvas.tsx, pointsDe (repère 0 → 100)
    1: [(50, 50)],
    2: [(30, 30), (70, 70)],
    3: [(30, 30), (50, 50), (70, 70)],
    4: [(30, 30), (70, 30), (30, 70), (70, 70)],
    5: [(30, 30), (70, 30), (50, 50), (30, 70), (70, 70)],
    6: [(30, 28), (70, 28), (30, 50), (70, 50), (30, 72), (70, 72)],
}


class Notion6eProba(Notion6e):
    identite = "Maths 6e — EleveAI"


def P(x, y):
    return np.array([x, y, 0.0])


# ── les canvas du coach, en Manim ───────────────────────────────────────────

def face_coach(f, cote=1.0):
    """Une case du canvas « de » : [0] cadre, [1] face, [2] points."""
    cadre = RoundedRectangle(width=cote, height=cote, corner_radius=cote * 0.12,
                             fill_color=CARTE_FOND, fill_opacity=1, stroke_color=BORD_GRIS, stroke_width=3)
    k = cote / 100
    face = RoundedRectangle(width=84 * k, height=84 * k, corner_radius=16 * k,
                            fill_color=FACE_CLAIRE, fill_opacity=1, stroke_color=ARDOISE, stroke_width=3)
    pts = VGroup(*[Dot(P((x - 50) * k, (50 - y) * k), radius=6 * k * 1.15, color=ARDOISE)
                   for x, y in POINTS_COACH[f]])
    return VGroup(cadre, face, pts)


def surligner(case):
    """L'animation qui SURLIGNE une face, comme `surligne` dans le coach."""
    # les points sont animés EN DERNIER : une mobject animée repasse au premier
    # plan, et la face ambre recouvrait sinon ses propres points
    return [case[0].animate.set_stroke(BORD_AMBRE, 5).set_fill(FACE_AMBRE),
            case[1].animate.set_fill(FACE_AMBRE),
            case[2].animate.set_color(ARDOISE)]


def carte_de(cote=1.0, gap=0.2, surligne=()):
    """Le canvas « de » : 6 faces en 3 colonnes sur une carte blanche.
    Renvoie (carte, faces) ; faces[f - 1] est la face f."""
    faces = VGroup(*[face_coach(f, cote) for f in range(1, 7)])
    faces.arrange_in_grid(rows=2, cols=3, buff=gap)
    fond = RoundedRectangle(width=faces.width + 2 * gap + 0.1, height=faces.height + 2 * gap + 0.1,
                            corner_radius=0.2, fill_color=CARTE_FOND, fill_opacity=1,
                            stroke_color=BORD_GRIS, stroke_width=2).move_to(faces)
    for f in surligne:
        c = faces[f - 1]
        c[0].set_stroke(BORD_AMBRE, 5).set_fill(FACE_AMBRE)
        c[1].set_fill(FACE_AMBRE)
    return VGroup(fond, faces), faces


def bille_coach(couleur, r=0.4):
    """Une bille du canvas « billes » : disque coloré bordé d'ardoise."""
    return Circle(radius=r, fill_color=couleur, fill_opacity=1, stroke_color=ARDOISE, stroke_width=3)


def carte_billes(couleurs, r=0.4, pas=1.0):
    """Le canvas « billes » : colonnes = min(6, max(3, ⌈√n⌉)). Renvoie (carte, billes)."""
    n = len(couleurs)
    cols = min(6, max(3, math.ceil(math.sqrt(n))))
    billes = VGroup(*[bille_coach(c, r).move_to(P((i % cols) * pas, -(i // cols) * pas))
                      for i, c in enumerate(couleurs)])
    lignes = math.ceil(n / cols)
    fond = RoundedRectangle(width=cols * pas + 0.3, height=lignes * pas + 0.3, corner_radius=0.2,
                            fill_color=CARTE_FOND, fill_opacity=1, stroke_color=BORD_GRIS, stroke_width=2)
    fond.move_to(P((cols - 1) * pas / 2, -(lignes - 1) * pas / 2))
    return VGroup(fond, billes), billes


def sac_autour(carte, marge=0.35):
    """Le sac transparent fermé par un lien orange, autour de la carte des billes."""
    corps = RoundedRectangle(width=carte.width + 2 * marge, height=carte.height + 2 * marge, corner_radius=0.45,
                             stroke_color=WHITE, stroke_width=4, fill_color="#E0F2FE",
                             fill_opacity=0.08).move_to(carte)
    col = Polygon(P(-0.6, 0), P(0.6, 0), P(0.35, 0.35), P(-0.35, 0.35), stroke_color=WHITE, stroke_width=4,
                  fill_color="#E0F2FE", fill_opacity=0.08).move_to(corps.get_top() + UP * 0.17)
    lien = Line(P(-0.45, 0), P(0.45, 0), color=ORANGE_RETENUE, stroke_width=7).move_to(corps.get_top() + UP * 0.2)
    return VGroup(corps, col, lien)


def case_oie(n, cote=0.62, couleur="#FDE68A"):
    c = Square(cote, fill_color=couleur, fill_opacity=1, stroke_color=ARDOISE, stroke_width=2)
    return VGroup(c, Text(str(n), font_size=20, color=ARDOISE, weight=BOLD).move_to(c))  # décor


def piste_oie(centre, n=15, r=2.7):
    """Un jeu de l'oie SIMPLIFIÉ : des cases numérotées en spirale (comme au CM2)."""
    cases = VGroup()
    a = PI
    for i in range(n):
        coul = ["#FDE68A", "#BFDBFE", "#BBF7D0"][i % 3]
        cases.add(case_oie(i + 1, 0.7, coul).move_to(centre + P(r * math.cos(a), r * math.sin(a))))
        a -= 0.78 / r
        r -= 0.085
    return cases


def pion(couleur=ROUGE_BILLE, s=1.0):
    tete = Circle(radius=0.11, fill_color=couleur, fill_opacity=1, stroke_color=WHITE, stroke_width=2)
    corps = Polygon(P(-0.14, -0.22), P(0.14, -0.22), P(0.06, 0.0), P(-0.06, 0.0),
                    fill_color=couleur, fill_opacity=1, stroke_color=WHITE, stroke_width=2)
    tete.move_to(P(0, 0.08))
    return VGroup(corps, tete).scale(s)


def case_sept(cote=1.0):
    """Le « 7 » qu'aucune face ne porte : une case vide, le 7 en rouge."""
    c = RoundedRectangle(width=cote, height=cote, corner_radius=cote * 0.12, stroke_color=C_IMPOSSIBLE,
                         stroke_width=4)
    return VGroup(c, Text("7", font_size=int(cote * 62), color=C_IMPOSSIBLE, weight=BOLD).move_to(c))


def croix(mob, couleur=C_IMPOSSIBLE, sw=8):
    return VGroup(Line(mob.get_corner(UL), mob.get_corner(DR)),
                  Line(mob.get_corner(UR), mob.get_corner(DL))).set_stroke(couleur, sw)


# ── L'ÉCHELLE DE 0 À 1 (le fil rouge) ───────────────────────────────────────

def barre_echelle(a, b, epaisseur=14):
    """La barre de a (0) à b (1), du rouge (impossible) au vert (certain), et
    ses deux bouts. Marche à l'horizontale comme à la verticale."""
    # ⚠️ PAS de set_color([...]) sur une Line : le sens du dégradé dépend de
    # l'orientation (debout, il s'inversait). Des petits segments, chacun sa
    # couleur : rouge en a (0), vert en b (1), dans tous les sens.
    n_seg = 48
    couleurs = color_gradient([C_IMPOSSIBLE, ORANGE_RETENUE, JAUNE_TITRE, C_CERTAIN], n_seg)
    barre = VGroup(*[Line(a + (b - a) * k / n_seg, a + (b - a) * (k + 1.04) / n_seg if k < n_seg - 1 else b,
                          stroke_width=epaisseur, color=couleurs[k]) for k in range(n_seg)])
    d = (b - a) / np.linalg.norm(b - a)
    n = np.array([-d[1], d[0], 0.0]) * 0.24
    bouts = VGroup(*[Line(p - n, p + n, stroke_width=5, color=WHITE) for p in (a, b)])
    return VGroup(barre, bouts)


class Proba6Vocabulaire(Notion6eProba):
    nom_voix = "6e-proba-vocabulaire"

    # l'échelle horizontale des écrans 03 à 06
    X0, X1, YE = -4.8, 3.0, -0.9

    def t(self, texte, font_size=36, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def ligne(self, morceaux, font_size=40, buff=0.24):
        """Une ligne en morceaux colorés, d'UN SEUL Text ; ligne[i] = i-ème morceau."""
        T = Text(" ".join(m for m, _ in morceaux), font_size=font_size)
        tailles = [len(m.replace(" ", "")) for m, _ in morceaux]
        if len(T) != sum(tailles):
            return VGroup(*[self.t(m, font_size, c) for m, c in morceaux]).arrange(RIGHT, buff=buff)
        g, k = VGroup(), 0
        for (m, c), n in zip(morceaux, tailles):
            g.add(VGroup(*T[k:k + n]).set_color(c))
            k += n
        return g

    def insister(self, mob, run_time=0.4):
        self.play(mob.animate.scale(1.5), run_time=run_time)
        self.play(mob.animate.scale(1 / 1.5), run_time=run_time)

    def barrer(self, mob, color=ROUGE_ERREUR, sw=7):
        return Line(mob.get_corner(DL) + LEFT * 0.1, mob.get_corner(UR) + RIGHT * 0.1,
                    stroke_width=sw, color=color)

    def demi(self, font_size=52, color=JAUNE_TITRE):
        return self.fraction(1, 2, font_size, color)

    # ── l'échelle ───────────────────────────────────────────────────────────

    def x_de(self, p):
        return self.X0 + (self.X1 - self.X0) * p

    def echelle(self):
        return barre_echelle(P(self.X0, self.YE), P(self.X1, self.YE))

    def nombre(self, p, mob):
        """Un nombre (0, 1, un demi) posé SOUS l'échelle, au point p."""
        return mob.next_to(P(self.x_de(p), self.YE), DOWN, buff=0.4)

    def mot_sous(self, nb, texte, couleur, font_size=34):
        return self.t(texte, font_size, couleur).next_to(nb, DOWN, buff=0.2)

    def fleche(self, p, couleur, haut=1.0):
        x = self.x_de(p)
        return Arrow(P(x, self.YE + haut), P(x, self.YE + 0.12), buff=0.0, color=couleur, stroke_width=6,
                     max_tip_length_to_length_ratio=0.3)

    def bornes(self):
        """0 « impossible » et 1 « certain », déjà dits : posés d'un coup."""
        n0 = self.nombre(0, self.t("0", 56, JAUNE_TITRE))
        n1 = self.nombre(1, self.t("1", 56, JAUNE_TITRE))
        return VGroup(n0, self.mot_sous(n0, "impossible", C_IMPOSSIBLE),
                      n1, self.mot_sous(n1, "certain", C_CERTAIN))

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.ligne([("Impossible,", C_IMPOSSIBLE), ("certain…", C_CERTAIN)], 60, 0.3)
        titre.to_edge(UP, buff=0.7)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.3)
        ech = echelle_ceintures("blanche").move_to(P(-0.6, -2.6))
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech), run_time=1.2)
        d = de_qui_roule(P(-3.8, 0.4), 1.4)
        self.add(d)
        self.au_mot("et entre les deux")
        q = self.t("?", 120, JAUNE_TITRE).move_to(P(-1.7, 0.4))
        self.play(FadeIn(q, scale=0.4), run_time=0.4)
        self.au_mot("la probabilité")
        mot = self.t("la probabilité", 54, BLEU_CALCUL).move_to(P(1.9, 0.4))
        self.play(FadeIn(mot, shift=LEFT * 0.3), run_time=0.5)
        self.insister(mot, 0.35)
        self.attendre_voix(marge=1.0)
        d.clear_updaters()

    # ── 01 : le jeu de l'oie ────────────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.titre_ecran("Le jeu de l'oie")
        piste = piste_oie(P(-4.2, -0.3), 15, 2.3)
        p = pion().move_to(piste[3].get_center() + UP * 0.05)
        self.play(LaggedStart(*[FadeIn(c, scale=0.6) for c in piste], lag_ratio=0.05), run_time=0.9)
        self.play(FadeIn(p, shift=DOWN * 0.3), run_time=0.3)
        self.au_mot("on lance un dé")
        roule = de_qui_roule(P(2.4, 1.75), 1.3, periode=0.15)
        self.add(roule)
        questions = [("Faire 7 ?", [("faire", WHITE), ("7", C_IMPOSSIBLE), ("?", WHITE)]),
                     ("Faire un nombre entre 1 et 6 ?",
                      [("un nombre entre", WHITE), ("1", C_CERTAIN), ("et", WHITE), ("6", C_CERTAIN), ("?", WHITE)]),
                     ("Faire 6 ?", [("faire", WHITE), ("6", C_POSSIBLE), ("?", WHITE)])]
        y = 0.25
        for extrait, morceaux in questions:
            self.au_mot(extrait)
            q = self.ligne(morceaux, 40, 0.2)
            q.move_to(P(2.4, y))
            self.play(FadeIn(q, shift=LEFT * 0.3), run_time=0.4)
            self.insister(q, 0.25)
            y -= 0.95
        roule.clear_updaters()
        self.attendre_voix()

    # ── 02 : impossible, certain (la carte du dé) ───────────────────────────

    def ecran_impossible_certain(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-impossible-certain")
        self.titre_ecran("Impossible ou certain ?")
        carte, faces = carte_de(1.0, 0.2)
        carte.move_to(P(-3.7, 0.2))
        self.play(FadeIn(carte, shift=UP * 0.2), run_time=0.6)

        self.au_mot("Faire 7")
        sept = case_sept(1.0).move_to(P(0.3, 1.3))
        self.play(FadeIn(sept, scale=0.5), run_time=0.4)
        self.play(Wiggle(carte, scale_value=1.05), run_time=0.6)
        self.au_mot("jamais")
        x7 = croix(sept)
        jamais = self.t("jamais !", 44, C_IMPOSSIBLE).next_to(sept, RIGHT, buff=0.4)
        self.play(Create(x7), FadeIn(jamais, shift=LEFT * 0.2), run_time=0.4)
        self.au_mot("C'est impossible")
        imp = self.t("impossible", 54, C_IMPOSSIBLE).next_to(jamais, DOWN, buff=0.25).align_to(jamais, LEFT)
        self.play(FadeIn(imp, scale=0.6), run_time=0.4)
        self.insister(imp, 0.3)

        self.au_mot("entre 1 et 6")
        entre = self.ligne([("entre", WHITE), ("1", JAUNE_TITRE), ("et", WHITE), ("6", JAUNE_TITRE)], 40, 0.2)
        entre.move_to(P(1.4, -1.0))
        self.play(FadeIn(entre, shift=LEFT * 0.2), run_time=0.4)
        self.play(LaggedStart(*[AnimationGroup(*surligner(f)) for f in faces], lag_ratio=0.12), run_time=0.9)
        self.au_mot("à tous les coups")
        cadre = SurroundingRectangle(faces, color=C_CERTAIN, buff=0.12, stroke_width=7)
        tous = self.t("à tous les coups !", 40, C_CERTAIN).next_to(entre, DOWN, buff=0.3)
        self.play(Create(cadre), FadeIn(tous, shift=UP * 0.2), run_time=0.5)
        self.au_mot("C'est certain")
        cert = self.t("certain", 54, C_CERTAIN).next_to(tous, DOWN, buff=0.3)
        self.play(FadeIn(cert, scale=0.6), run_time=0.4)
        self.insister(cert, 0.3)
        self.attendre_voix()

    # ── 03 : L'ÉCHELLE DE 0 À 1 ─────────────────────────────────────────────

    def ecran_echelle(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-echelle")
        self.titre_ecran("L'échelle des probabilités")
        ech = self.echelle()
        self.au_mot("sur une échelle")
        self.play(Create(ech[0], lag_ratio=1), FadeIn(ech[1]), run_time=1.0)
        self.au_mot("de 0 à 1")
        n0 = self.nombre(0, self.t("0", 56, JAUNE_TITRE))
        n1 = self.nombre(1, self.t("1", 56, JAUNE_TITRE))
        self.play(FadeIn(n0, scale=0.5), run_time=0.3)
        self.play(FadeIn(n1, scale=0.5), run_time=0.3)

        self.au_mot("Impossible, c'est 0")
        sept = case_sept(0.9)
        sept.add(croix(sept[0], sw=7))
        sept.move_to(P(self.x_de(0), self.YE + 1.6))
        f0 = self.fleche(0, C_IMPOSSIBLE, 1.1)
        m0 = self.mot_sous(n0, "impossible", C_IMPOSSIBLE)
        self.play(FadeIn(sept, shift=DOWN * 0.3), GrowArrow(f0), FadeIn(m0), run_time=0.5)
        self.insister(n0, 0.3)

        self.au_mot("Certain, c'est 1")
        carte, _ = carte_de(0.42, 0.08, surligne=(1, 2, 3, 4, 5, 6))
        carte.move_to(P(self.x_de(1), self.YE + 1.65))
        f1 = self.fleche(1, C_CERTAIN, 1.1)
        m1 = self.mot_sous(n1, "certain", C_CERTAIN)
        self.play(FadeIn(carte, shift=DOWN * 0.3), GrowArrow(f1), FadeIn(m1), run_time=0.5)
        self.insister(n1, 0.3)

        self.au_mot("Faire 6")
        six = face_coach(6, 0.9)
        six[0].set_stroke(BORD_AMBRE, 5).set_fill(FACE_AMBRE)
        six[1].set_fill(FACE_AMBRE)
        six.move_to(P(self.x_de(0.5), 2.0))
        self.play(FadeIn(six, scale=0.5), run_time=0.4)
        self.au_mot("c'est possible")
        curseur = Triangle(fill_color=C_POSSIBLE, fill_opacity=1, stroke_width=0).scale(0.2).rotate(PI)
        curseur.move_to(P(self.x_de(0.5), self.YE + 0.38))
        poss = self.t("possible", 40, C_POSSIBLE).move_to(P(self.x_de(0.5), self.YE + 0.95))
        self.play(FadeIn(curseur, shift=DOWN * 0.2), FadeIn(poss), six.animate.next_to(poss, UP, buff=0.25),
                  run_time=0.5)
        self.au_mot("entre les deux")
        bloc = VGroup(curseur, poss, six)
        # entre les deux : il glisse vers 0, puis vers 1, puis se pose (sans nombre)
        self.play(bloc.animate.shift(LEFT * 1.6), run_time=0.6)
        self.play(bloc.animate.shift(RIGHT * 2.6), run_time=0.7)
        self.play(bloc.animate.shift(LEFT * 3.3), run_time=0.8)
        self.attendre_voix()

    # ── 04 : le milieu, un demi ─────────────────────────────────────────────

    def ecran_milieu(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-milieu")
        self.titre_ecran("Au milieu : un demi")
        ech = self.echelle()
        self.add(ech, self.bornes())
        self.au_mot("Au milieu")
        xm = self.x_de(0.5)
        trait = Line(P(xm, self.YE - 0.28), P(xm, self.YE + 0.28), stroke_width=6, color=WHITE)
        self.play(Create(trait), Indicate(ech[0], color=WHITE, scale_factor=1.03), run_time=0.5)
        self.au_mot("un demi")
        d = self.nombre(0.5, self.demi(46))
        self.play(FadeIn(d, scale=0.5), run_time=0.4)
        self.insister(d, 0.35)
        self.au_mot("une chance sur deux")
        ch = self.ligne([("1", JAUNE_TITRE), ("chance sur", WHITE), ("2", JAUNE_TITRE)], 38, 0.2)
        ch.next_to(d, DOWN, buff=0.25)
        self.play(FadeIn(ch, shift=UP * 0.2), run_time=0.4)
        self.au_mot("Pile ou face")
        piece = piece_qui_tourne(P(xm, 1.55), 0.7)
        self.add(piece)
        fl = self.fleche(0.5, JAUNE_TITRE, 1.0)
        self.au_mot("c'est un demi")
        self.play(GrowArrow(fl), run_time=0.4)
        self.insister(d, 0.35)
        self.attendre_voix()
        piece.clear_updaters()

    # ── 05 : le piège ───────────────────────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-piege")
        self.titre_ecran("Le piège")
        ech = self.echelle()
        self.add(ech, self.bornes())
        self.au_mot("ne dépasse jamais 1")
        regle = self.ligne([("jamais plus de", WHITE), ("1", JAUNE_TITRE)], 48, 0.2).move_to(P(-0.9, 2.2))
        self.play(FadeIn(regle, shift=DOWN * 0.2), run_time=0.5)
        self.insister(regle[1], 0.3)

        self.au_mot("Plus de 1")
        # au-delà de 1 : une zone vide, en pointillés
        hors = DashedLine(P(self.X1 + 0.15, self.YE), P(self.X1 + 2.2, self.YE), color=GREY_B, stroke_width=6,
                          dash_length=0.18)
        curseur = Triangle(fill_color=ORANGE_RETENUE, fill_opacity=1, stroke_width=0).scale(0.2).rotate(PI)
        curseur.move_to(P(self.x_de(0.5), self.YE + 0.38))
        self.play(Create(hors), FadeIn(curseur), run_time=0.4)
        self.play(curseur.animate.move_to(P(self.X1 + 1.3, self.YE + 0.38)), run_time=1.0)
        self.au_mot("plus que certain")
        pqc = self.t("plus que certain ?", 38, ORANGE_RETENUE).move_to(P(self.X1 + 0.9, self.YE + 1.5))
        self.play(FadeIn(pqc, scale=0.6), run_time=0.4)
        self.au_mot("ça n'existe pas")
        self.play(Create(self.barrer(pqc, sw=8)), Create(croix(curseur, sw=6)), run_time=0.4)
        n = self.t("ça n'existe pas !", 44, C_IMPOSSIBLE).move_to(P(-0.9, 1.15))
        self.play(FadeIn(n, scale=0.6), run_time=0.4)
        self.insister(n, 0.3)
        self.attendre_voix(marge=1.2)

    # ── 06 : défi, le sac tout rouge ────────────────────────────────────────

    YD = -1.25  # l'échelle du défi, plus bas (le sac au-dessus)

    def sac_rouge(self):
        carte, billes = carte_billes([ROUGE_BILLE] * 6, r=0.34, pas=0.85)
        carte.move_to(P(-0.5, 0.9))
        return sac_autour(carte), carte, billes

    def echelle_defi(self):
        a, b = P(self.X0, self.YD), P(self.X1, self.YD)
        ech = barre_echelle(a, b)
        n0 = self.t("0", 50, JAUNE_TITRE).next_to(a, DOWN, buff=0.35)
        n1 = self.t("1", 50, JAUNE_TITRE).next_to(b, DOWN, buff=0.35)
        return ech, n0, n1

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("06-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        ech, n0, n1 = self.echelle_defi()
        self.au_mot("Où placer sur l'échelle")
        self.play(Create(ech[0], lag_ratio=1), FadeIn(ech[1]), FadeIn(n0), FadeIn(n1), run_time=0.8)
        self.au_mot("tirer une bille rouge")
        sac, carte, billes = self.sac_rouge()
        self.play(Create(sac), FadeIn(carte[0]), run_time=0.5)
        self.au_mot("toutes rouges")
        self.play(LaggedStart(*[FadeIn(b, scale=0.3) for b in billes], lag_ratio=0.12), run_time=0.8)
        q1 = VGroup(bille_coach(ROUGE_BILLE, 0.3), self.t("?", 60, ORANGE_RETENUE)).arrange(RIGHT, buff=0.25)
        q1.move_to(P(2.6, 1.5))
        self.play(FadeIn(q1, shift=LEFT * 0.3), run_time=0.4)
        self.au_mot("tirer une bille bleue")
        q2 = VGroup(bille_coach(BLEU_BILLE, 0.3), self.t("?", 60, ORANGE_RETENUE)).arrange(RIGHT, buff=0.25)
        q2.move_to(P(2.6, 0.35))
        self.play(FadeIn(q2, shift=LEFT * 0.3), run_time=0.4)
        self.au_mot("ce même sac")
        self.play(Indicate(sac[0], color=WHITE, scale_factor=1.05), run_time=0.6)
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=40)))
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("06b-correction")
        self.titre_ecran("Correction")
        ech, n0, n1 = self.echelle_defi()
        sac, carte, billes = self.sac_rouge()
        self.add(ech, n0, n1, sac, carte)
        self.au_mot("Une rouge")
        rouge = bille_coach(ROUGE_BILLE, 0.34).move_to(billes[1])
        self.play(rouge.animate.move_to(P(2.2, 1.4)).scale(1.3), run_time=0.6)
        self.au_mot("c'est certain")
        cert = self.t("certain", 46, C_CERTAIN)
        cert.move_to(P(2.2 + 0.8 + cert.width / 2, 1.4))
        self.play(FadeIn(cert, scale=0.6), run_time=0.4)
        self.au_mot("on la place à 1")
        x1 = self.x_de(1)
        self.play(VGroup(rouge, cert).animate.arrange(DOWN, buff=0.15).move_to(P(x1, self.YD + 1.15)),
                  run_time=0.7)
        self.play(Indicate(n1, color=C_CERTAIN, scale_factor=1.5), run_time=0.6)

        self.au_mot("Une bleue")
        bleue = bille_coach(BLEU_BILLE, 0.44).move_to(P(2.2, 1.4))
        self.play(FadeIn(bleue, scale=0.5), run_time=0.4)
        self.play(bleue.animate.move_to(carte.get_center()), run_time=0.35)
        self.play(bleue.animate.move_to(P(2.2, 1.4)), run_time=0.35)
        self.au_mot("c'est impossible")
        xb = croix(bleue, sw=7)
        imp = self.t("impossible", 46, C_IMPOSSIBLE)
        imp.move_to(P(2.2 + 0.8 + imp.width / 2, 1.4))
        self.play(Create(xb), FadeIn(imp, scale=0.6), run_time=0.4)
        self.au_mot("on la place à 0")
        g = VGroup(VGroup(bleue, xb), imp)
        self.play(g.animate.arrange(DOWN, buff=0.15).move_to(P(self.x_de(0) + 0.6, self.YD + 1.15)),
                  run_time=0.7)
        self.play(Indicate(n0, color=C_IMPOSSIBLE, scale_factor=1.5), run_time=0.6)
        self.attendre_voix(marge=1.5)

    # ── 07 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-finale")
        self.play(Write(self.t("Ce que tu as appris", 46, JAUNE_TITRE).to_edge(UP)))
        lignes_m = [
            ("entre 0 et 1", [("Une probabilité est entre", WHITE), ("0", JAUNE_TITRE), ("et", WHITE),
                              ("1", JAUNE_TITRE)]),
            ("0 : impossible", [("0", JAUNE_TITRE), (":", WHITE), ("impossible", C_IMPOSSIBLE)]),
            ("1 : certain", [("1", JAUNE_TITRE), (":", WHITE), ("certain", C_CERTAIN)]),
        ]
        lignes = VGroup(*[VGroup(self.coche(taille=0.3), self.ligne(m, 44, 0.2)).arrange(RIGHT, buff=0.35)
                          for _, m in lignes_m])
        demi = VGroup(self.coche(taille=0.3),
                      VGroup(self.demi(40),
                             self.ligne([(":", WHITE), ("1", JAUNE_TITRE), ("chance sur", WHITE),
                                         ("2", JAUNE_TITRE)], 44, 0.2)).arrange(RIGHT, buff=0.25)
                      ).arrange(RIGHT, buff=0.35)
        lignes.add(demi)
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.45)
        if lignes.width > 10.5:
            lignes.scale_to_fit_width(10.5)
        lignes.move_to(P(-0.8, 0.45))
        for ex, l in zip(["entre 0 et 1", "0 : impossible", "1 : certain", "Un demi"], lignes):
            self.au_mot(ex)
            self.play(FadeIn(l[1], shift=RIGHT * 0.2), run_time=0.5)
            self.play(Create(l[0]), run_time=0.3)
        self.au_mot("L'épisode 2")
        self.play(Write(self.chute("Épisode 2 : comparer des probabilités", color=VERT_OK, font_size=40)))
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_impossible_certain()
        self.ecran_echelle()
        self.ecran_milieu()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="08-abonne")
