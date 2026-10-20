# proba5_equiprobabilite.py
# EleveAI — Maths 5e — série « Probabilités », épisode 3 : équiprobable ou
# non (micro : proba_equiprobabilite), AVEC VOIX. Paysage 16:9, CEINTURE
# JAUNE. Short jumeau : proba5_equiprobabilite_short.py (ceinture blanche).
#
# Écrans : 00 garde · 01 le dé équilibré (chaque face 1 sur 6) · 02 la
# définition (les 6 barres de même hauteur) · 03 la pièce (½, ½) et la roue
# de 4 parts égales (¼ chacune) · 04 la roue à parts inégales (rouge = la
# moitié), posée sur l'échelle de 0 à 1 · 05 le piège : dé truqué, punaise
# (2 issues ≠ ½ chacune) · 06 défi du sac 3 rouges / 1 bleue · 06b
# correction (3/4, 1/4 ; chaque bille 1/4) · 07 ce que tu as appris · 08
# fin (« Entraîne-toi sur éleveai point f r. Et abonne-toi ! », règle du 19/10).
#
# ⭐ Canvas repris du coach (lib/tutor-v4/components/ProbabilitesCanvas.tsx,
# banque 5e/maths/probabilites.bank.ts, micro proba_equiprobabilite) :
#   · « de » (fixed_1) : carte blanche, 6 faces en 3 × 2, liseré ardoise,
#     faces surlignées en ambre (#fef3c7 / #fbbf24) ;
#   · « roue » (fixed_2, open_1, tpl_1) : secteurs proportionnels aux POIDS,
#     départ en haut, sens horaire, liseré #0f172a, moyeu et pointe noirs en
#     haut, sur carte blanche ;
#   · « billes » (fixed_3, tpl_1) : billes en grille, colonnes
#     = min(6, max(3, ⌈√n⌉)), étiquettes « R » / « B » blanches cernées.
# ⛔ 17/10 « pas d'écart » : un nombre n'est écrit qu'au moment où il est dit.
#
# Voix : manim/voix/5e-proba-equiprobabilite.json (Julie, débit −8).
# Rendu : python -m manim render -qh --disable_caching manim/scripts/5e/proba5_equiprobabilite.py Proba5Equiprobabilite -o eleveai-maths-5e-proba-equiprobabilite --media_dir manim/scripts/5e/media
# Puis copier le mp4 dans manim/sorties/5e/maths/probabilites/03-equiprobabilite/.

import importlib.util
import math
import sys
from pathlib import Path

import numpy as np

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI.parents[1]))
sys.path.insert(0, str(ICI.parent / "seconde"))

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


_annonce = _charger("annonce_probabilites_5e_equi", ICI.parent / "annonce" / "annonce_probabilites.py")
piece_qui_tourne = _annonce.piece_qui_tourne

# les couleurs du coach
C_ROUGE = "#ef4444"
C_BLEU = "#3b82f6"
C_VERT = "#22c55e"
C_JAUNE = "#eab308"
ENCRE = "#0f172a"
FACE_DE = "#f8fafc"
FACE_ACTIVE = "#fef3c7"
BORD_ACTIF = "#fbbf24"
BORD_CARTE = "#e2e8f0"
GRIS_ETEINT = "#6B7280"


class Notion5e(Notion6e):
    identite = "Maths 5e — EleveAI"


def P(x, y):
    return np.array([x, y, 0.0])


def direction(deg):
    a = math.radians(deg)
    return np.array([math.cos(a), math.sin(a), 0.0])


# ── canvas « de » ───────────────────────────────────────────────────────────

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
    """La face « surlignée » du coach : fond ambré, bordure ambre (animations).
    ⛔ On anime la face ENTIÈRE : animer face_mob[0] seul le remet au premier
    plan, par-dessus ses points (constaté au brouillon)."""
    def maj(m):
        m[0].set_fill(FACE_ACTIVE if on else FACE_DE).set_stroke(BORD_ACTIF if on else ENCRE, 6 if on else 3)
        return m
    return [ApplyFunction(maj, face_mob)]


def _de_coach_6_points(face, cote):
    """La même face, mais TOUJOURS 6 points (ceux en trop sont invisibles) : une
    structure fixe, pour que `become` marche pendant un `play`."""
    d = de_coach(face, cote)
    while len(d[1]) < 6:
        d[1].add(Dot(d[0].get_center(), radius=cote * 0.07).set_opacity(0))
    return d


def de_coach_qui_roule(centre, cote=1.2, periode=0.16, faces=None):
    """La face du coach qui roule SANS FIN (updater)."""
    faces = faces or [3, 5, 2, 6, 1, 4]
    etat = {"t": 0.0}
    holder = _de_coach_6_points(faces[0], cote).move_to(centre)

    # ⛔ 20/10 : `become` sur une structure FIXE et non remove/add — remplacer les
    # enfants dans l'updater laissait, pendant un `play`, l'ancien dé dessiné sous le nouveau.
    def maj(m, dt):
        etat["t"] += dt
        k = int(etat["t"] / periode)
        ang = 0.35 * math.sin(etat["t"] * 9)
        saut = 0.12 * abs(math.sin(etat["t"] * 9))
        m.become(_de_coach_6_points(faces[k % len(faces)], cote).rotate(ang).move_to(centre + UP * saut))

    holder.add_updater(maj)
    return holder


# ── canvas « roue » (secteurs proportionnels aux poids) ─────────────────────

def disque_poids(parts, r=1.4):
    """parts = [(couleur, poids)] ; départ en haut, sens horaire. disque[i] = le secteur i."""
    total = sum(p for _, p in parts)
    g, debut = VGroup(), PI / 2
    for c, p in parts:
        a = TAU * p / total
        g.add(AnnularSector(inner_radius=0, outer_radius=r, angle=-a, start_angle=debut,
                            fill_color=c, fill_opacity=1, stroke_color=ENCRE, stroke_width=3))
        debut -= a
    return g


def milieux_deg(parts):
    """L'angle (en degrés) du milieu de chaque secteur."""
    total = sum(p for _, p in parts)
    res, debut = [], 90.0
    for _, p in parts:
        a = 360 * p / total
        res.append(debut - a / 2)
        debut -= a
    return res


def roue_coach(centre, parts, r=1.4):
    """Le canvas « roue » : carte blanche, disque, moyeu, pointe noire en haut.
    Renvoie (tout, disque)."""
    d = disque_poids(parts, r).shift(centre)  # construit autour de l'origine
    moyeu = Dot(centre, radius=r * 0.06, color=ENCRE)
    pointe = Polygon(P(0, 0), P(-0.16, 0.34), P(0.16, 0.34), fill_color=ENCRE, fill_opacity=1,
                     stroke_width=0).scale(r / 1.4).move_to(centre + UP * (r + 0.06), aligned_edge=DOWN)
    pointe.shift(DOWN * 0.22 * r / 1.4)
    fond = RoundedRectangle(width=2 * r + 0.8, height=2 * r + 1.0, corner_radius=0.2, fill_color=WHITE,
                            fill_opacity=1, stroke_color=BORD_CARTE, stroke_width=2).move_to(centre + UP * 0.1)
    return VGroup(fond, d, moyeu, pointe), d


class Toupie:
    """Fait tourner un disque (sens horaire) et l'arrête PILE à sa place."""

    def __init__(self, scene, d, centre, vitesse=6.0):
        self.scene, self.d, self.c, self.v, self.angle = scene, d, centre, vitesse, 0.0

        def maj(m, dt):
            m.rotate(-self.v * dt, about_point=self.c)
            self.angle += self.v * dt

        self.maj = maj
        d.add_updater(maj)

    def arreter(self, run_time=1.2):
        self.d.remove_updater(self.maj)
        reste = TAU - (self.angle % TAU)
        self.scene.play(Rotate(self.d, -(reste + TAU), about_point=self.c), run_time=run_time,
                        rate_func=rate_functions.ease_out_cubic)
        self.angle = 0.0


# ── canvas « billes » ───────────────────────────────────────────────────────

def bille_coach(couleur, r=0.3, label=None):
    """Une bille du coach : disque coloré, liseré ardoise, lettre blanche cernée."""
    b = Circle(radius=r, fill_color=couleur, fill_opacity=1, stroke_color=ENCRE, stroke_width=3)
    if not label:
        return VGroup(b)
    lettre = Text(label, font_size=int(r * 70), color=WHITE, weight=BOLD)
    lettre.set_stroke(ENCRE, width=3, background=True).move_to(b)
    return VGroup(b, lettre)


def carte_billes(billes_def, r=0.3, pas=0.78):
    """Le canvas « billes » : colonnes = min(6, max(3, ⌈√n⌉)). Renvoie (carte, billes)."""
    n = len(billes_def)
    cols = min(6, max(3, math.ceil(math.sqrt(n))))
    billes = VGroup(*[bille_coach(c, r, lab).move_to(P((i % cols) * pas, -(i // cols) * pas))
                      for i, (c, lab) in enumerate(billes_def)])
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


# le sac du défi : 3 rouges et 1 bleue (comme billesCanvas : « R » / « B »)
SAC_DEFI = [(C_ROUGE, "R"), (C_ROUGE, "R"), (C_ROUGE, "R"), (C_BLEU, "B")]


# ── fraction, échelle, punaise ──────────────────────────────────────────────

def fraction(num, den, fs=56, color=WHITE):
    """Une fraction ÉCRITE (pas de LaTeX) : [0] numérateur, [1] barre, [2] dénominateur."""
    n = Text(str(num), font_size=fs, color=color, weight=BOLD)
    d = Text(str(den), font_size=fs, color=color, weight=BOLD)
    b = Line(LEFT, RIGHT, color=color, stroke_width=4 + fs / 24)
    b.set_width(max(n.width, d.width) + 0.22)
    return VGroup(n, b, d).arrange(DOWN, buff=0.1)


def echelle(x0, x1, y, sw=12, h=0.22):
    """L'échelle des probabilités : [0] la barre dégradée, [1] les deux bouts, [2] le milieu."""
    b = Line(P(x0, y), P(x1, y), stroke_width=sw)
    b.set_color([VERT_OK, JAUNE_TITRE, ORANGE_RETENUE, ROUGE_ERREUR])  # manim inverse : rouge à GAUCHE
    bouts = VGroup(*[Line(P(x, y - h), P(x, y + h), stroke_width=5) for x in (x0, x1)])
    milieu = Line(P((x0 + x1) / 2, y - h * 0.7), P((x0 + x1) / 2, y + h * 0.7), stroke_width=3)
    return VGroup(b, bouts, milieu)


TETE = "#F59E0B"
ACIER = "#CBD5E1"


def punaise(s=1.0):
    """Une punaise POINTE EN HAUT, la tête à plat : le bas de la tête est à l'origine."""
    tete = RoundedRectangle(width=1.0, height=0.16, corner_radius=0.07, fill_color=TETE, fill_opacity=1,
                            stroke_color=WHITE, stroke_width=2).move_to(P(0, 0.08))
    cou = Polygon(P(-0.2, 0.16), P(0.2, 0.16), P(0.13, 0.42), P(-0.13, 0.42), fill_color=TETE,
                  fill_opacity=1, stroke_color=WHITE, stroke_width=2)
    aiguille = Polygon(P(-0.045, 0.42), P(0.045, 0.42), P(0.0, 1.05), fill_color=ACIER, fill_opacity=1,
                       stroke_color=ACIER, stroke_width=1)
    return VGroup(aiguille, cou, tete).scale(s, about_point=ORIGIN)


def punaise_haut(sol, s=1.0):
    """Pointe en HAUT, posée sur le sol (point bas au milieu de la tête)."""
    return punaise(s).shift(sol)


def punaise_bas(sol, s=1.0):
    """Pointe en BAS : couchée sur le bord de la tête, la pointe touche le sol."""
    p = punaise(s).rotate(-118 * DEGREES, about_point=ORIGIN)
    p.shift(sol - P(p.get_center()[0], p.get_bottom()[1]))
    return p


def table(x0, x1, y):
    return Line(P(x0, y), P(x1, y), color="#94A3B8", stroke_width=5)


# ── la vidéo ────────────────────────────────────────────────────────────────

# la roue de 4 parts égales, et la roue à parts inégales (rouge = la moitié)
ROUE_EGALE = [(C_ROUGE, 1), (C_BLEU, 1), (C_VERT, 1), (C_JAUNE, 1)]
ROUE_INEGALE = [(C_ROUGE, 2), (C_BLEU, 1), (C_VERT, 1)]


class Proba5Equiprobabilite(Notion5e):
    nom_voix = "5e-proba-equiprobabilite"

    def t(self, texte, font_size=40, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def ligne(self, morceaux, font_size=40, buff=0.22):
        return VGroup(*[m if isinstance(m, Mobject) else self.t(m[0], font_size, m[1])
                        for m in morceaux]).arrange(RIGHT, buff=buff)

    def insister(self, mob, run_time=0.35):
        self.play(mob.animate.scale(1.5), run_time=run_time)
        self.play(mob.animate.scale(1 / 1.5), run_time=run_time)

    def barrer(self, mob, color=ROUGE_ERREUR, sw=8):
        return VGroup(Line(mob.get_corner(UL) + P(-0.1, 0.1), mob.get_corner(DR) + P(0.1, -0.1)),
                      Line(mob.get_corner(UR) + P(0.1, 0.1), mob.get_corner(DL) + P(-0.1, -0.1))
                      ).set_stroke(color, sw)

    def tampon(self, texte, couleur, fs=36):
        """Le verdict dans un cadre : « Équiprobable » (vert) ou « Pas équiprobable » (rouge)."""
        mot = self.t(texte, fs, couleur)
        cadre = SurroundingRectangle(mot, color=couleur, buff=0.16, corner_radius=0.12, stroke_width=5)
        return VGroup(cadre, mot)

    def pousser(self, secteur, centre, mid_deg, d=0.3, run_time=0.3):
        """Le secteur sort de la roue puis y revient : on le montre du doigt."""
        v = direction(mid_deg) * d
        self.play(secteur.animate.shift(v), run_time=run_time)
        self.play(secteur.animate.shift(-v), run_time=run_time)

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("Équiprobable ?", 60, JAUNE_TITRE).to_edge(UP, buff=0.6)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.25)
        ech = echelle_ceintures("jaune").move_to(P(-0.6, -2.7))
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech), run_time=0.9)
        roule = de_coach_qui_roule(P(-5.0, 0.0), 1.3)
        c = P(4.1, 0.0)
        rq, dq = roue_coach(c, ROUE_EGALE, 1.0)
        self.add(roule)
        self.play(FadeIn(rq), run_time=0.4)
        top = Toupie(self, dq, c, 7.0)
        self.au_mot("toutes les issues")
        q = VGroup(self.t("toutes les issues ont", 34, BLEU_CALCUL),
                   self.t("la même chance ?", 38, BLEU_CALCUL)).arrange(DOWN, buff=0.2).move_to(P(-0.45, 0.0))
        self.play(FadeIn(q, shift=UP * 0.2), run_time=0.5)
        self.insister(q[1], 0.3)
        self.attendre_voix(marge=1.0)
        roule.clear_updaters()
        dq.remove_updater(top.maj)

    # ── 01 : le dé équilibré ────────────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.titre_ecran("Un dé bien équilibré")
        roule = de_coach_qui_roule(P(-4.4, 0.4), 1.6)
        self.add(roule)
        carte, faces = carte_de(1.0, 0.25)
        carte.move_to(P(1.6, 0.6))
        self.au_mot("Chaque face")
        self.play(FadeIn(carte[0]), LaggedStart(*[FadeIn(f, scale=0.5) for f in faces], lag_ratio=0.12),
                  run_time=0.9)
        self.play(LaggedStart(*[a for f in faces for a in surligner(f)], lag_ratio=0.1), run_time=0.7)
        self.au_mot("1 sur 6")
        f6 = fraction(1, 6, 60, VERT_OK)
        l6 = self.ligne([("chaque face :", WHITE), f6], 40, 0.35).move_to(P(1.6, -2.0))
        self.play(FadeIn(l6[0]), FadeIn(f6, shift=UP * 0.15), run_time=0.5)
        self.insister(f6)
        self.attendre_voix(marge=0.6)
        roule.clear_updaters()

    # ── 02 : la définition ──────────────────────────────────────────────────

    def ecran_definition(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-definition")
        self.titre_ecran("Équiprobable")
        # les 6 faces, et sous chacune une barre : toutes de la MÊME hauteur
        faces = VGroup(*[de_coach(f, 0.75) for f in range(1, 7)]).arrange(RIGHT, buff=0.45).move_to(P(-0.6, 1.9))
        self.add(faces)
        base_y = -1.4
        barres = VGroup(*[Rectangle(width=0.6, height=1.6, fill_color=VERT_OK, fill_opacity=0.85, stroke_width=0)
                          .move_to(P(f.get_x(), base_y + 0.8)) for f in faces])
        sol = Line(P(faces.get_left()[0] - 0.3, base_y), P(faces.get_right()[0] + 0.3, base_y),
                   color=WHITE, stroke_width=3)
        self.play(Create(sol), run_time=0.3)
        self.au_mot("la même probabilité")
        self.play(LaggedStart(*[GrowFromEdge(b, DOWN) for b in barres], lag_ratio=0.1), run_time=1.0)
        niveau = DashedLine(P(sol.get_left()[0], base_y + 1.6), P(sol.get_right()[0], base_y + 1.6),
                            color=JAUNE_TITRE, stroke_width=4)
        lbl = self.t("même chance", 30, JAUNE_TITRE).next_to(niveau, RIGHT, buff=0.2)
        self.play(Create(niveau), FadeIn(lbl), run_time=0.5)
        self.au_mot("équiprobables")
        tp = self.tampon("équiprobables", VERT_OK, 44).move_to(P(-0.6, -2.4))
        self.play(GrowFromCenter(tp), run_time=0.5)
        self.insister(tp, 0.3)
        self.attendre_voix(marge=0.6)

    # ── 03 : la pièce et la roue de 4 parts égales ──────────────────────────

    def ecran_exemples(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-exemples")
        self.titre_ecran("Équiprobable : des exemples")
        sep = DashedLine(P(-0.9, 2.6), P(-0.9, -3.2), color=GREY_B, stroke_width=2)
        self.add(sep)
        # à gauche : la pièce
        xa = -4.3
        self.au_mot("Une pièce équilibrée")
        pc = piece_qui_tourne(P(xa, 1.3), 0.85)
        self.add(pc)
        lp = self.t("une pièce équilibrée", 30, BLEU_CALCUL).move_to(P(xa, 0.05))
        self.play(FadeIn(lp), run_time=0.4)
        self.au_mot("pile, un demi")
        f1 = fraction(1, 2, 44, VERT_OK)
        l1 = self.ligne([("pile :", WHITE), f1], 36, 0.3).move_to(P(xa, -0.85))
        self.play(FadeIn(l1[0]), FadeIn(f1, shift=UP * 0.15), run_time=0.4)
        self.au_mot("face, un demi")
        f2 = fraction(1, 2, 44, VERT_OK)
        l2 = self.ligne([("face :", WHITE), f2], 36, 0.3).move_to(P(xa, -2.0))
        l2.align_to(l1, RIGHT)
        self.play(FadeIn(l2[0]), FadeIn(f2, shift=UP * 0.15), run_time=0.4)
        self.au_mot("Équiprobable. Une roue")
        tp1 = self.tampon("Équiprobable", VERT_OK, 34).move_to(P(xa, -3.05))
        pc.clear_updaters()
        self.remove(pc)
        fixe = Circle(radius=0.85, fill_color=JAUNE_TITRE, fill_opacity=1, stroke_color=WHITE, stroke_width=3)
        self.add(VGroup(fixe, Text("PILE", font_size=28, color=BLACK, weight=BOLD).move_to(fixe)).move_to(P(xa, 1.3)))
        self.play(GrowFromCenter(tp1), run_time=0.4)
        # à droite : la roue de 4 parts égales
        xb, c = 2.3, P(2.3, 0.95)
        self.au_mot("Une roue de 4 parts")
        rq, dq = roue_coach(c, ROUE_EGALE, 1.25)
        self.play(FadeIn(rq, scale=0.8), run_time=0.5)
        top = Toupie(self, dq, c, 7.0)
        self.au_mot("chaque part")
        top.arreter(1.0)
        mids = milieux_deg(ROUE_EGALE)
        for s, m in zip(dq, mids):
            self.play(s.animate.shift(direction(m) * 0.2), run_time=0.15)
        self.play(*[s.animate.shift(-direction(m) * 0.2) for s, m in zip(dq, mids)], run_time=0.25)
        self.au_mot("1 sur 4")
        f4 = fraction(1, 4, 44, VERT_OK)
        l4 = self.ligne([("chaque part :", WHITE), f4], 36, 0.3).move_to(P(xb, -1.45))
        self.play(FadeIn(l4[0]), FadeIn(f4, shift=UP * 0.15), run_time=0.4)
        self.insister(f4, 0.3)
        tp2 = self.tampon("Équiprobable", VERT_OK, 34).move_to(P(xb - 0.4, -2.5))
        self.au_mot("4. Équiprobable")
        self.play(GrowFromCenter(tp2), run_time=0.4)
        self.attendre_voix(marge=1.3)

    # ── 04 : la roue à parts inégales ───────────────────────────────────────

    def ecran_contre_exemple(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-contre-exemple")
        self.titre_ecran("Des parts inégales")
        c = P(-4.2, 0.45)
        rq, dq = roue_coach(c, ROUE_INEGALE, 1.75)
        self.play(FadeIn(rq, scale=0.8), run_time=0.6)
        top = Toupie(self, dq, c, 6.0)
        mids = milieux_deg(ROUE_INEGALE)
        self.au_mot("une grande part rouge")
        top.arreter(1.0)
        self.pousser(dq[0], c, mids[0], 0.35)
        self.au_mot("la moitié de la roue")
        diam = Line(c + UP * 1.85, c + DOWN * 1.85, color=WHITE, stroke_width=7)
        moit = self.ligne([("rouge :", C_ROUGE), ("la moitié", WHITE)], 38, 0.2).move_to(P(1.6, 2.15))
        self.play(Create(diam), FadeIn(moit), run_time=0.6)
        self.au_mot("deux petites parts")
        self.play(FadeOut(diam), run_time=0.2)
        self.play(dq[1].animate.shift(direction(mids[1]) * 0.3), dq[2].animate.shift(direction(mids[2]) * 0.3),
                  run_time=0.3)
        self.play(dq[1].animate.shift(-direction(mids[1]) * 0.3), dq[2].animate.shift(-direction(mids[2]) * 0.3),
                  run_time=0.3)
        # l'échelle de 0 à 1 (fil rouge de la série), avec ses mots
        X0, X1, YE = -0.9, 4.2, -1.25
        ech = echelle(X0, X1, YE)
        imp = self.t("impossible", 26, ROUGE_ERREUR).next_to(P(X0, YE - 0.22), DOWN, buff=0.12)
        cer = self.t("certain", 26, VERT_OK).next_to(P(X1, YE - 0.22), DOWN, buff=0.12)
        self.play(Create(ech), FadeIn(imp), FadeIn(cer), run_time=0.6)
        self.au_mot("Rouge, un demi")
        fr = fraction(1, 2, 40, C_ROUGE)
        lr = self.ligne([("rouge :", C_ROUGE), fr], 36, 0.25).move_to(P(1.6, 1.05))
        self.play(FadeIn(lr[0]), FadeIn(fr, shift=UP * 0.15), run_time=0.4)
        xm = (X0 + X1) / 2
        pr = Dot(P(xm, YE), radius=0.16, color=C_ROUGE).set_stroke(WHITE, 3)
        self.play(GrowFromCenter(pr), Flash(pr, color=C_ROUGE), run_time=0.5)
        self.au_mot("Les autres, moins")
        lm = self.ligne([("bleu, vert :", WHITE), ("moins", ORANGE_RETENUE)], 36, 0.25)
        lm.next_to(lr, DOWN, buff=0.35).align_to(lr, LEFT)
        xq = X0 + (X1 - X0) * 0.25
        pb = Dot(P(xq - 0.12, YE), radius=0.16, color=C_BLEU).set_stroke(WHITE, 3)
        pv = Dot(P(xq + 0.12, YE), radius=0.16, color=C_VERT).set_stroke(WHITE, 3)
        pb.move_to(P(xm, YE))
        pv.move_to(P(xm, YE))
        self.play(FadeIn(lm), run_time=0.3)
        self.add(pb, pv, pr)
        self.play(pb.animate.move_to(P(xq - 0.12, YE)), pv.animate.move_to(P(xq + 0.12, YE)), run_time=0.7)
        self.au_mot("Pas équiprobable")
        tp = self.tampon("Pas équiprobable", ROUGE_ERREUR, 40).move_to(P(1.3, -2.75))
        self.play(GrowFromCenter(tp), run_time=0.4)
        self.insister(tp, 0.3)
        self.attendre_voix(marge=0.6)

    # ── 05 : le piège ───────────────────────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-piege")
        self.titre_ecran("Le piège")
        # le dé truqué : il retombe toujours sur le 6
        self.au_mot("un dé truqué")
        dt_ = de_coach(6, 1.4, actif=True).move_to(P(-5.3, 1.2))
        plomb = self.t("truqué", 30, ORANGE_RETENUE).next_to(dt_, DOWN, buff=0.2)
        self.play(FadeIn(dt_, shift=DOWN * 0.6), run_time=0.35)
        self.play(Wiggle(dt_), FadeIn(plomb), run_time=0.6)
        # la punaise qui tombe
        self.au_mot("une punaise qui tombe")
        sol_y = -0.15
        tb = table(-3.4, 4.6, sol_y)
        p0 = punaise(1.5).move_to(P(0.7, 2.4)).rotate(0.6)
        self.play(Create(tb), FadeIn(p0), run_time=0.3)
        self.play(p0.animate.rotate(3.2).move_to(P(0.7, sol_y + 0.7)), run_time=0.6, rate_func=rate_functions.ease_in_quad)
        self.play(FadeOut(p0), run_time=0.15)
        self.au_mot("Deux issues")
        xh, xb = -1.5, 2.9
        ph = punaise_haut(P(xh, sol_y), 1.6)
        pb = punaise_bas(P(xb, sol_y), 1.6)
        self.play(FadeIn(ph, shift=DOWN * 0.3), FadeIn(pb, shift=DOWN * 0.3), run_time=0.4)
        self.au_mot("pointe en haut")
        lh = self.t("pointe en haut", 34, JAUNE_TITRE).next_to(P(xh, sol_y), DOWN, buff=0.25)
        self.play(FadeIn(lh), Indicate(ph, color=JAUNE_TITRE), run_time=0.4)
        self.au_mot("pointe en bas")
        lb = self.t("pointe en bas", 34, JAUNE_TITRE).next_to(P(xb, sol_y), DOWN, buff=0.25)
        self.play(FadeIn(lb), Indicate(pb, color=JAUNE_TITRE), run_time=0.4)
        self.au_mot("pas forcément la même chance")
        qh = self.t("?", 64, ORANGE_RETENUE).next_to(lh, DOWN, buff=0.15)
        qb = self.t("?", 64, ORANGE_RETENUE).next_to(lb, DOWN, buff=0.15)
        neq = self.t("≠", 64, ORANGE_RETENUE).move_to(P((xh + xb) / 2, qh.get_y()))
        self.play(FadeIn(qh, scale=0.5), FadeIn(qb, scale=0.5), FadeIn(neq, scale=0.5), run_time=0.4)
        self.insister(neq, 0.3)
        # la règle
        self.au_mot("Deux issues ne veut pas dire")
        f = fraction(1, 2, 40, ROUGE_ERREUR)
        regle = self.ligne([("2 issues", WHITE), ("≠", ORANGE_RETENUE), f, ("chacune", WHITE)], 40, 0.3)
        regle.move_to(P(-0.6, -2.85))
        self.play(FadeIn(regle[:2]), run_time=0.4)
        self.au_mot("un demi chacune")
        self.play(FadeIn(regle[2:], shift=UP * 0.15), run_time=0.4)
        self.insister(regle[1], 0.3)
        self.attendre_voix(marge=0.6)

    # ── 06 : défi ───────────────────────────────────────────────────────────

    def sac_defi(self, centre):
        carte, billes = carte_billes(SAC_DEFI, 0.36, 0.95)
        carte.move_to(centre)
        sac = sac_autour(carte)
        return sac, carte, billes

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("06-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        sac, carte, billes = self.sac_defi(P(-4.0, 0.4))
        self.au_mot("Dans un sac")
        self.play(FadeIn(sac), FadeIn(carte[0]), run_time=0.4)
        self.au_mot("3 billes rouges")
        l1 = self.ligne([("3", JAUNE_TITRE), ("billes rouges", C_ROUGE)], 40, 0.2).move_to(P(2.0, 2.1))
        self.play(LaggedStart(*[FadeIn(b, shift=DOWN * 0.8) for b in billes[:3]], lag_ratio=0.25),
                  FadeIn(l1), run_time=0.8)
        self.au_mot("1 bille bleue")
        l2 = self.ligne([("1", JAUNE_TITRE), ("bille bleue", C_BLEU)], 40, 0.2)
        l2.next_to(l1, DOWN, buff=0.3).align_to(l1, LEFT)
        self.play(FadeIn(billes[3], shift=DOWN * 0.8), FadeIn(l2), run_time=0.5)
        self.au_mot("On tire une bille")
        self.play(Indicate(billes, color=WHITE, scale_factor=1.15), run_time=0.6)
        self.au_mot("Les issues")
        q = VGroup(self.ligne([("« rouge »", C_ROUGE), ("et", WHITE), ("« bleue » :", C_BLEU)], 40, 0.2),
                   self.t("équiprobables ?", 46, BLEU_CALCUL)).arrange(DOWN, buff=0.25).move_to(P(2.0, -0.4))
        self.play(FadeIn(q, shift=UP * 0.2), run_time=0.6)
        self.insister(q[1], 0.35)
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=40)))
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("06b-correction")
        self.titre_ecran("Correction")
        sac, carte, billes = self.sac_defi(P(-4.0, 0.9))
        self.add(sac, carte, billes)
        self.au_mot("Non")
        non = self.t("Non !", 64, ROUGE_ERREUR).move_to(P(1.6, 2.2))
        self.play(FadeIn(non, scale=0.5), run_time=0.4)
        self.insister(non, 0.3)
        self.au_mot("Rouge : 3 sur 4")
        cr = SurroundingRectangle(billes[:3], color=JAUNE_TITRE, buff=0.12, stroke_width=5)
        f34 = fraction(3, 4, 46, C_ROUGE)
        lr = self.ligne([("rouge :", C_ROUGE), f34], 40, 0.3).move_to(P(0.7, 0.85))
        self.play(Create(cr), FadeIn(lr[0]), FadeIn(f34, shift=UP * 0.15), run_time=0.5)
        self.au_mot("Bleue : 1 sur 4")
        cb = SurroundingRectangle(billes[3], color=JAUNE_TITRE, buff=0.12, stroke_width=5)
        f14 = fraction(1, 4, 46, C_BLEU)
        lb = self.ligne([("bleue :", C_BLEU), f14], 40, 0.3).move_to(P(4.0, 0.85))
        self.play(ReplacementTransform(cr, cb), FadeIn(lb[0]), FadeIn(f14, shift=UP * 0.15), run_time=0.5)
        self.play(FadeOut(cb), run_time=0.2)
        self.au_mot("Mais chaque bille")
        # les 4 billes sortent du sac et se rangent, chacune avec sa chance
        rang = VGroup(*[b.copy() for b in billes])
        xs = [-3.6 + 1.6 * i for i in range(4)]
        self.play(*[r.animate.move_to(P(x, -1.15)).scale(1.15) for r, x in zip(rang, xs)],
                  billes.animate.set_opacity(0.25), run_time=0.8)
        self.au_mot("1 chance sur 4")
        quarts = VGroup(*[fraction(1, 4, 34, VERT_OK).next_to(r, DOWN, buff=0.2) for r in rang])
        self.play(LaggedStart(*[FadeIn(q, shift=UP * 0.15) for q in quarts], lag_ratio=0.15), run_time=0.7)
        self.au_mot("ce sont les 4 billes")
        ch = self.chute("Les 4 billes sont équiprobables.", color=VERT_OK, font_size=40)
        self.play(Write(ch), LaggedStart(*[Indicate(r, color=WHITE, scale_factor=1.25) for r in rang],
                                         lag_ratio=0.15), run_time=1.0)
        self.attendre_voix(marge=0.6)

    # ── 07 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)))
        acquis = [
            ("Équiprobable : toutes", "Équiprobable : toutes les issues ont la même chance", WHITE),
            ("Dé, pièce, parts égales", "Dé, pièce, parts égales : oui", VERT_OK),
            ("Parts inégales", "Parts inégales, dé truqué : non", ROUGE_ERREUR),
        ]
        lignes = VGroup()
        for _, txt, col in acquis:
            morceaux = txt.split(" : ", 1) if txt.startswith("Équiprobable") else [txt]
            if len(morceaux) == 2:
                bloc = VGroup(self.t(morceaux[0] + " :", 40, VERT_OK), self.t(morceaux[1], 40, col)
                              ).arrange(DOWN, aligned_edge=LEFT, buff=0.18)
            else:
                bloc = self.t(txt, 40, col)
            lignes.add(VGroup(self.coche(), bloc).arrange(RIGHT, buff=0.3, aligned_edge=UP))
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.6)
        if lignes.width > 10.6:
            lignes.scale_to_fit_width(10.6)
        lignes.move_to(P(-0.7, 0.35))
        for (mot, _, _), l in zip(acquis, lignes):
            self.au_mot(mot)
            self.play(FadeIn(l[1], shift=RIGHT * 0.2), run_time=0.6)
            self.play(Create(l[0]), run_time=0.4)
        self.au_mot("L'épisode 4")
        self.play(Write(self.chute("Épisode 4 : calculer une probabilité", color=VERT_OK, font_size=38)))
        self.attendre_voix(marge=1.0)

    # ── 08 : la fin (règle du 19/10) ────────────────────────────────────────

    def page_abonnement(self, voix="08-abonne"):
        """« Entraîne-toi sur » + eleveai.fr encadré, puis « Abonne-toi ! » +
        @eleveai974. Rien d'autre (la voix dit exactement cela)."""
        self.clear()
        self.dire(voix)
        self.add_mascotte(scale=0.9)
        entraine = self.t("Entraîne-toi sur", 46, JAUNE_TITRE).move_to(P(0, 2.05))
        site = self.t("eleveai.fr", 62, BLEU_CALCUL).move_to(P(0, 1.0))
        cadre = SurroundingRectangle(site, color=BLEU_CALCUL, buff=0.26, stroke_width=3)
        abonne = self.t("Abonne-toi !", 44, VERT_OK).move_to(P(0, -0.6))
        poignee = self.t("@eleveai974", 48, VERT_OK).move_to(P(0, -1.6))
        self.play(Write(entraine), run_time=0.6)
        self.au_mot("éleveai")
        self.play(GrowFromCenter(site), Create(cadre), run_time=0.6)
        self.au_mot("abonne-toi")
        self.play(FadeIn(abonne, shift=UP * 0.15), run_time=0.4)
        self.play(GrowFromCenter(poignee), run_time=0.4)
        self.play(Flash(poignee, color=VERT_OK, line_length=0.3))
        self.attendre_voix(marge=1.4)

    # ── déroulé ─────────────────────────────────────────────────────────────

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_definition()
        self.ecran_exemples()
        self.ecran_contre_exemple()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="08-abonne")
