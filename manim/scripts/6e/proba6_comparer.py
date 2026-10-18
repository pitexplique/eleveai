# proba6_comparer.py
# EleveAI — Maths 6e — série « Probabilités », épisode 2 : comparer des
# probabilités (micro : proba_comparer), AVEC VOIX. Paysage 16:9, CEINTURE
# BLANCHE. Short jumeau : proba6_comparer_short.py (ceinture blanche).
#
# Écrans : 00 garde · 01 la roue de 6 parts égales (3 rouges, 2 bleues,
# 1 verte) qu'on fait tourner · 02 compter (3/6, 2/6, 1/6) · 03 ⭐ ranger sur
# L'ÉCHELLE de 0 à 1 (verticale : la voix dit « le plus haut », « le plus
# bas ») · 04 la méthode (les parts sortent de la roue et s'empilent) · 05 le
# piège (la fausse roue en 3 tiers, barrée) · 06 défi du dé (pair, ou 1 ou 2) ·
# 06b correction · 07 ce que tu as appris · 08 abonnement.
#
# ⭐ Canvas repris du coach (lib/tutor-v4/components/ProbabilitesCanvas.tsx,
# banque 6e/maths/probabilites.bank.ts, micro proba_comparer) :
#   · « roue » (canvasRoue / tpl_4_couleur) : parts de poids 1, départ en haut,
#     sens horaire, liseré #0f172a, pointe noire en haut, moyeu noir, carte
#     blanche, sans étiquette (la couleur porte tout) ; ici les parts d'une
#     même couleur sont GROUPÉES (le coach les mélange) pour qu'on les compte ;
#   · « de » (6e_proba_comparer_fixed_1) : carte blanche, 6 faces en 3 × 2,
#     faces surlignées en ambre (#fef3c7 / #fbbf24).
# ⛔ 17/10 « pas d'écart » : un nombre n'apparaît qu'au moment où il est dit.
#
# Voix : manim/voix/6e-proba-comparer.json (Julie, débit −10).
# Rendu : python -m manim render -qh --disable_caching manim/scripts/6e/proba6_comparer.py Proba6Comparer -o eleveai-maths-6e-proba-comparer --media_dir manim/scripts/6e/media
# Puis copier le mp4 dans manim/sorties/6e/maths/probabilites/02-comparer/.

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

# couleurs du coach
C_ROUGE = "#ef4444"
C_BLEU = "#3b82f6"
C_VERT = "#22c55e"
ENCRE = "#0f172a"
CARTE_BORD = "#e2e8f0"
FACE_DE = "#f8fafc"
FACE_AMBRE = "#fef3c7"
BORD_AMBRE = "#fbbf24"
GRIS_ETEINT = "#6B7280"

# la roue de l'épisode : 3 rouges, 2 bleues, 1 verte (6 parts égales)
ROUE_6 = [C_ROUGE] * 3 + [C_BLEU] * 2 + [C_VERT]

POINTS_COACH = {
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


# ── le canvas « roue » du coach ─────────────────────────────────────────────

def disque(couleurs, r=1.4):
    """Les parts égales, départ en haut, sens horaire. disque[i] = la part i."""
    n = len(couleurs)
    g = VGroup()
    for i, c in enumerate(couleurs):
        g.add(AnnularSector(inner_radius=0, outer_radius=r, angle=-TAU / n, start_angle=PI / 2 - i * TAU / n,
                            fill_color=c, fill_opacity=1, stroke_color=ENCRE, stroke_width=3))
    return g


def roue(centre, couleurs=ROUE_6, r=1.4, carte=True):
    """Le canvas « roue » : carte blanche, disque, moyeu, pointe noire en haut.
    Renvoie (tout, disque)."""
    d = disque(couleurs, r).move_to(centre)
    moyeu = Dot(centre, radius=r * 0.05, color=ENCRE)
    pointe = Polygon(P(0, 0), P(-0.16, 0.34), P(0.16, 0.34), fill_color=ENCRE, fill_opacity=1,
                     stroke_width=0).scale(r / 1.4).move_to(centre + UP * (r + 0.06), aligned_edge=DOWN)
    pointe.shift(DOWN * 0.22 * r / 1.4)
    g = VGroup()
    if carte:
        g.add(RoundedRectangle(width=2 * r + 0.8, height=2 * r + 1.0, corner_radius=0.2, fill_color=WHITE,
                               fill_opacity=1, stroke_color=CARTE_BORD, stroke_width=2).move_to(centre + UP * 0.1))
    g.add(d, moyeu, pointe)
    return g, d


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


# ── le canvas « de » du coach ───────────────────────────────────────────────

def face_coach(f, cote=1.0):
    """Une case du canvas « de ». [0] cadre, [1] face, [2] points."""
    cadre = RoundedRectangle(width=cote, height=cote, corner_radius=cote * 0.12, fill_color=WHITE,
                             fill_opacity=1, stroke_color="#cbd5e1", stroke_width=3)
    k = cote / 100
    face = RoundedRectangle(width=84 * k, height=84 * k, corner_radius=16 * k, fill_color=FACE_DE,
                            fill_opacity=1, stroke_color=ENCRE, stroke_width=3)
    pts = VGroup(*[Dot(P((x - 50) * k, (50 - y) * k), radius=6 * k * 1.15, color=ENCRE)
                   for x, y in POINTS_COACH[f]])
    return VGroup(cadre, face, pts)


def surligner(case, bord=BORD_AMBRE, fond=FACE_AMBRE):
    """La face SURLIGNÉE, comme `surligne` dans le coach."""
    return [case[0].animate.set_stroke(bord, 6).set_fill(fond), case[1].animate.set_fill(fond)]


def carte_de(cote=1.0, gap=0.2):
    """Le canvas « de » : 6 faces en 3 × 2 sur une carte blanche.
    Renvoie (carte, faces) ; faces[f - 1] = la face f."""
    faces = VGroup(*[face_coach(f, cote) for f in range(1, 7)])
    faces.arrange_in_grid(rows=2, cols=3, buff=gap)
    fond = RoundedRectangle(width=faces.width + 2 * gap + 0.1, height=faces.height + 2 * gap + 0.1,
                            corner_radius=0.2, fill_color=WHITE, fill_opacity=1, stroke_color=CARTE_BORD,
                            stroke_width=2).move_to(faces)
    return VGroup(fond, faces), faces


# ── la vidéo ────────────────────────────────────────────────────────────────

GRIS_VIDE = "#cbd5e1"                  # une part pas encore coloriée


class Proba6Comparer(Notion6eProba):
    nom_voix = "6e-proba-comparer"

    def t(self, texte, font_size=40, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def ligne(self, morceaux, font_size=40, buff=0.22):
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

    def au_mot_n(self, extrait, n):
        """Comme au_mot, mais vise la n-ième fois que l'extrait est dit."""
        texte, i = self._texte_voix, -1
        for _ in range(n):
            i = texte.find(extrait, i + 1)
            if i < 0:
                raise ValueError(f"« {extrait} » (n° {n}) absent de la voix : {texte[:60]}…")
        if not self._duree_voix:
            return
        reste = self._debut_voix + self._duree_voix * i / len(texte) - self.renderer.time
        if reste > 0.05:
            self.wait(reste)

    def insister(self, mob, run_time=0.3):
        self.play(mob.animate.scale(1.5), run_time=run_time)
        self.play(mob.animate.scale(1 / 1.5), run_time=run_time)

    def barrer(self, mob, color=ROUGE_ERREUR, sw=8):
        return Line(mob.get_corner(DL) + LEFT * 0.1, mob.get_corner(UR) + RIGHT * 0.1, stroke_width=sw, color=color)

    def parts(self, d, couleur):
        return [p for p, c in zip(d, ROUE_6) if c == couleur]

    def eclairer(self, d, couleur, run_time=0.3):
        """Les parts d'une couleur restent vives, les autres s'estompent."""
        self.play(*[p.animate.set_fill(opacity=1 if c == couleur else 0.2) for p, c in zip(d, ROUE_6)],
                  run_time=run_time)

    def rallumer(self, d, run_time=0.3):
        self.play(*[p.animate.set_fill(opacity=1) for p in d], run_time=run_time)

    def pastille(self, couleur, r=0.22):
        return Circle(radius=r, fill_color=couleur, fill_opacity=1, stroke_color=ENCRE, stroke_width=3)

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("Lequel est le plus probable ?", 56, JAUNE_TITRE).to_edge(UP, buff=0.6)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.25)
        ech = echelle_ceintures("blanche").move_to(P(-0.6, -3.15))
        self.add(ech)
        c = P(-0.6, -0.45)
        tout, d = roue(c, r=1.3)
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(tout, scale=0.7), run_time=1.0)
        top = Toupie(self, d, c, vitesse=7.0)
        self.wait(0.8)
        top.arreter(0.9)
        self.attendre_voix(marge=0.8)

    # ── 01 : la roue ────────────────────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.titre_ecran("La roue")
        c = P(-3.3, 0.0)
        tout, d = roue(c, r=1.75)
        for p in d:
            p.set_fill(GRIS_VIDE)
        carte, d_, moyeu, pointe = tout
        self.au_mot("Une roue")
        self.play(FadeIn(carte), FadeIn(moyeu), FadeIn(pointe), run_time=0.3)
        self.au_mot("6 parts égales")
        six = self.t("6 parts égales", 46, JAUNE_TITRE).move_to(P(0.5, 1.75), aligned_edge=LEFT)
        self.play(LaggedStart(*[FadeIn(p, scale=0.6) for p in d], lag_ratio=0.12), FadeIn(six, shift=UP * 0.15),
                  run_time=0.8)
        lignes = [("3 rouges", C_ROUGE, 0.65), ("2 bleues", C_BLEU, -0.35), ("1 verte", C_VERT, -1.35)]
        for mot, coul, y in lignes:
            self.au_mot(mot)
            lbl = self.ligne([(mot.split()[0], coul), (mot.split()[1], coul)], 50, 0.2)
            pas_ = VGroup(self.pastille(coul, 0.24), lbl).arrange(RIGHT, buff=0.3).move_to(P(0.5, y), aligned_edge=LEFT)
            self.play(*[p.animate.set_fill(coul) for p in self.parts(d, coul)], FadeIn(pas_, shift=UP * 0.15),
                      run_time=0.35)
        self.au_mot("On la fait tourner")
        top = Toupie(self, d, c, vitesse=8.0)
        self.wait(1.0)
        top.arreter(1.0)
        self.attendre_voix()

    # ── 02 : compter les parts ──────────────────────────────────────────────

    def ecran_compter(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-compter")
        self.titre_ecran("On compte les parts")
        c = P(-3.6, 0.0)
        tout, d = roue(c, r=1.75)
        self.add(tout)
        rangs = [("Rouge", "3 parts", C_ROUGE, 3, 1.75), ("Bleu", "2 parts", C_BLEU, 2, 0.0),
                 ("Vert", "1 part", C_VERT, 1, -1.75)]
        for k, (nom, nb, coul, n, y) in enumerate(rangs):
            self.au_mot(nom)
            f = self.fraction(n, 6, 60, WHITE, color_num=coul, color_den=JAUNE_TITRE)
            pas_ = self.pastille(coul, 0.3).move_to(P(0.6, y))
            f.next_to(pas_, RIGHT, buff=0.55)
            self.eclairer(d, coul, 0.25)
            self.play(FadeIn(pas_, scale=0.5), run_time=0.2)
            self.au_mot(nb)
            self.play(FadeIn(f[0], scale=0.5), *[p.animate.scale(1.08, about_point=c) for p in self.parts(d, coul)],
                      run_time=0.3)
            self.play(*[p.animate.scale(1 / 1.08, about_point=c) for p in self.parts(d, coul)], run_time=0.2)
            self.au_mot_n("sur 6", k + 1)
            self.play(Create(f[1]), FadeIn(f[2], shift=UP * 0.1), Indicate(tout[0], color=JAUNE_TITRE, scale_factor=1.03),
                      run_time=0.35)
        self.rallumer(d)
        self.attendre_voix()

    # ── 03 : ranger sur l'échelle (verticale) ───────────────────────────────

    XE, Y0, Y1 = 0.0, -2.45, 2.35

    def y_de(self, p):
        return self.Y0 + (self.Y1 - self.Y0) * p

    def echelle(self):
        barre = Line(P(self.XE, self.Y0), P(self.XE, self.Y1), stroke_width=10, color=BLEU_CALCUL)
        bouts = VGroup(*[Line(P(self.XE - 0.25, y), P(self.XE + 0.25, y), stroke_width=5)
                         for y in (self.Y0, self.Y1)])
        milieu = Line(P(self.XE - 0.15, self.y_de(0.5)), P(self.XE + 0.15, self.y_de(0.5)), stroke_width=3)
        return VGroup(barre, bouts, milieu)

    def ecran_ranger(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-ranger")
        self.titre_ecran("On range")
        c = P(-5.0, 0.3)
        tout, d = roue(c, r=1.05)
        self.add(tout)
        data = [(3, C_ROUGE, 1.4), (2, C_BLEU, 0.0), (1, C_VERT, -1.4)]
        fr = []
        for n, coul, y in data:
            f = self.fraction(n, 6, 42, WHITE, color_num=coul, color_den=JAUNE_TITRE).move_to(P(-2.75, y))
            fr.append(f)
        self.add(*fr)
        self.au_mot("On range")
        ech = self.echelle()
        self.play(Create(ech), run_time=0.6)
        self.au_mot("de 0")
        z = self.t("0", 52, JAUNE_TITRE).next_to(P(self.XE - 0.25, self.Y0), LEFT, buff=0.25)
        self.play(FadeIn(z, scale=0.5), run_time=0.25)
        self.au_mot("à 1")
        u = self.t("1", 52, JAUNE_TITRE).next_to(P(self.XE - 0.25, self.Y1), LEFT, buff=0.25)
        self.play(FadeIn(u, scale=0.5), run_time=0.25)
        points = []
        for (n, coul, _), f in zip(data, fr):
            y = self.y_de(n / 6)
            pt = Dot(P(self.XE, y), radius=0.15, color=coul).set_stroke(WHITE, 2)
            dx = -0.95 if coul == C_BLEU else 0.95  # le bleu à gauche : les fractions ne se touchent pas
            self.play(f.animate.move_to(P(self.XE + dx, y)), FadeIn(pt, scale=0.4), run_time=0.4)
            points.append(pt)
        self.au_mot("Le rouge est le plus haut")
        self.play(Indicate(points[0], color=C_ROUGE, scale_factor=1.6), run_time=0.4)
        self.au_mot("c'est le plus probable")
        plus = self.t("le plus probable", 40, C_ROUGE).next_to(fr[0], RIGHT, buff=0.5)
        self.play(FadeIn(plus, shift=LEFT * 0.2), run_time=0.35)
        self.insister(fr[0], 0.25)
        self.au_mot("Le vert est le plus bas")
        self.play(Indicate(points[2], color=C_VERT, scale_factor=1.6), run_time=0.4)
        self.au_mot("c'est le moins probable")
        moins = self.t("le moins probable", 40, C_VERT).next_to(fr[2], RIGHT, buff=0.5)
        self.play(FadeIn(moins, shift=LEFT * 0.2), run_time=0.35)
        self.insister(fr[2], 0.25)
        self.attendre_voix()

    # ── 04 : la méthode ─────────────────────────────────────────────────────

    def ecran_methode(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-methode")
        self.titre_ecran("La méthode")
        c = P(-4.3, 0.3)
        tout, d = roue(c, r=1.5)
        self.add(tout)
        self.au_mot("sur une même roue")
        cadre = SurroundingRectangle(tout[0], color=JAUNE_TITRE, buff=0.08, stroke_width=5)
        self.play(Create(cadre), run_time=0.4)
        self.play(FadeOut(cadre), run_time=0.25)
        self.au_mot("plus il y a de parts")
        # les parts sortent de la roue et s'empilent en colonnes : 3, 2, 1
        cote, base = 0.85, -1.55
        xs = {C_ROUGE: -0.6, C_BLEU: 0.9, C_VERT: 2.4}
        haut = {C_ROUGE: 0, C_BLEU: 0, C_VERT: 0}
        anims, colonnes = [], {C_ROUGE: VGroup(), C_BLEU: VGroup(), C_VERT: VGroup()}
        for p, coul in zip(d, ROUE_6):
            sq = Square(cote, fill_color=coul, fill_opacity=1, stroke_color=ENCRE, stroke_width=3)
            sq.move_to(P(xs[coul], base + cote / 2 + haut[coul] * cote))
            haut[coul] += 1
            colonnes[coul].add(sq)
            anims.append(TransformFromCopy(p, sq))
        sol = Line(P(-1.3, base), P(3.1, base), stroke_width=4, color=WHITE)
        self.play(Create(sol), LaggedStart(*anims, lag_ratio=0.12), run_time=1.3)
        self.au_mot("plus c'est probable")
        ch = self.chute("Plus il y a de parts, plus c'est probable.", color=VERT_OK, font_size=40)
        fl = Arrow(P(3.6, base + 0.2), P(3.6, base + 3 * cote), buff=0, color=VERT_OK, stroke_width=7,
                   max_tip_length_to_length_ratio=0.18)
        self.play(GrowArrow(fl), Write(ch), run_time=0.8)
        self.au_mot("On compare le nombre de parts")
        for coul in (C_ROUGE, C_BLEU, C_VERT):
            col = colonnes[coul]
            self.play(col.animate.scale(1.15), run_time=0.22)
            self.play(col.animate.scale(1 / 1.15), run_time=0.22)
        self.attendre_voix()

    # ── 05 : le piège ───────────────────────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-piege")
        self.titre_ecran("Le piège")
        self.au_mot("3 couleurs")
        trois = VGroup(*[self.pastille(c, 0.26) for c in (C_ROUGE, C_BLEU, C_VERT)]).arrange(RIGHT, buff=0.2)
        lbl = self.ligne([("3", JAUNE_TITRE), ("couleurs", WHITE)], 46, 0.2)
        haut = VGroup(lbl, trois).arrange(RIGHT, buff=0.4).move_to(P(-0.6, 2.45))
        self.play(FadeIn(lbl, shift=UP * 0.15), LaggedStart(*[FadeIn(p, scale=0.4) for p in trois], lag_ratio=0.2),
                  run_time=0.5)
        self.au_mot("1 chance sur 3 chacune")
        cf = P(-3.9, -0.05)
        faux, dfaux = roue(cf, couleurs=[C_ROUGE, C_BLEU, C_VERT], r=1.35)
        fausse = VGroup(self.t("1 chance sur 3", 38, ORANGE_RETENUE), self.t("chacune", 38, ORANGE_RETENUE))
        fausse.arrange(DOWN, buff=0.12).move_to(P(-3.9, -2.45))
        self.play(FadeIn(faux, scale=0.7), FadeIn(fausse, shift=UP * 0.15), run_time=0.5)
        croix = VGroup(Line(faux[0].get_corner(UL), faux[0].get_corner(DR)),
                       Line(faux[0].get_corner(UR), faux[0].get_corner(DL))).set_stroke(ROUGE_ERREUR, 9)
        self.play(Create(croix), Create(self.barrer(fausse, sw=6)), run_time=0.5)
        self.au_mot("Les couleurs n'ont pas")
        cv = P(2.3, -0.05)
        vrai, dv = roue(cv, r=1.35)
        self.play(FadeIn(vrai, scale=0.7), run_time=0.4)
        self.au_mot("le même nombre de parts")
        bon = VGroup(self.t("pas le même", 38, VERT_OK), self.t("nombre de parts", 38, VERT_OK))
        bon.arrange(DOWN, buff=0.12).move_to(P(2.3, -2.45))
        self.play(FadeIn(bon, shift=UP * 0.15), run_time=0.35)
        for coul in (C_ROUGE, C_BLEU, C_VERT):
            ps = self.parts(dv, coul)
            self.play(*[p.animate.scale(1.12, about_point=cv) for p in ps], run_time=0.2)
            self.play(*[p.animate.scale(1 / 1.12, about_point=cv) for p in ps], run_time=0.2)
        self.attendre_voix()

    # ── 06 : défi, le dé (le canvas « de » du coach) ────────────────────────

    def etiquette(self, texte, color, font_size=38):
        lbl = self.t(texte, font_size, BLACK)
        fond = RoundedRectangle(width=lbl.width + 0.5, height=lbl.height + 0.35, corner_radius=0.14,
                                fill_color=color, fill_opacity=1, stroke_width=0)
        return VGroup(fond, lbl.move_to(fond))

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("06-defi")
        self.play(Write(self.t("À toi de jouer", 48, JAUNE_TITRE).to_edge(UP)), run_time=0.6)
        self.au_mot("Avec un dé")
        carte, faces = carte_de(1.1, 0.2)
        carte.move_to(P(-3.6, 0.45))
        self.play(FadeIn(carte[0]), LaggedStart(*[FadeIn(f, scale=0.5) for f in faces], lag_ratio=0.08), run_time=0.7)
        self.au_mot("un nombre pair")
        e1 = self.etiquette("un nombre pair", BORD_AMBRE).move_to(P(2.0, 1.3))
        self.play(GrowFromCenter(e1), run_time=0.4)
        self.au_mot("ou faire 1 ou 2")
        ou = self.t("ou", 36).move_to(P(2.0, 0.45))
        e2 = self.etiquette("1 ou 2", BLEU_CALCUL).move_to(P(2.0, -0.4))
        self.play(FadeIn(ou), GrowFromCenter(e2), run_time=0.4)
        self.au_mot("Lequel est le plus probable")
        q = self.t("Lequel est le plus probable ?", 42, WHITE).move_to(P(-0.6, -1.85))
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.4)
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=42)), run_time=0.7)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("06b-correction")
        self.titre_ecran("Correction")
        carte, faces = carte_de(1.0, 0.18)
        carte.move_to(P(-4.3, 0.55))
        self.add(carte)
        x0 = -1.7
        self.au_mot("Nombre pair")
        r1 = self.ligne([("nombre pair :", BORD_AMBRE), ("2, 4, 6", WHITE)], 42, 0.25)
        r1.move_to(P(x0, 1.3), aligned_edge=LEFT)
        self.play(FadeIn(r1[0], shift=UP * 0.15), run_time=0.3)
        self.au_mot("2, 4, 6")
        self.play(FadeIn(r1[1], shift=UP * 0.15), run_time=0.3)
        for f in (2, 4, 6):
            self.play(*surligner(faces[f - 1]), run_time=0.18)
        self.au_mot("trois faces")
        t1 = self.t("3 faces", 42, JAUNE_TITRE).move_to(P(x0, 0.55), aligned_edge=LEFT)
        self.play(FadeIn(t1, scale=0.6), run_time=0.3)
        self.insister(t1, 0.22)
        self.au_mot("1 ou 2 :")
        r2 = VGroup(self.t("1 ou 2 :", 42, BLEU_CALCUL), self.t("2 faces", 42, JAUNE_TITRE)).arrange(RIGHT, buff=0.3)
        r2.move_to(P(x0, -0.45), aligned_edge=LEFT)
        self.play(FadeIn(r2[0], shift=UP * 0.15), run_time=0.3)
        for f in (1, 2):
            self.play(faces[f - 1][0].animate.set_stroke(BLEU_CALCUL, 7), run_time=0.18)
        self.au_mot("deux faces")
        self.play(FadeIn(r2[1], scale=0.6), run_time=0.3)
        self.insister(r2[1], 0.22)
        self.au_mot("Le nombre pair est plus probable")
        # l'échelle : « pair » se pose plus haut que « 1 ou 2 »
        xe, ya, yb = 4.6, -1.9, 2.0
        barre = Line(P(xe, ya), P(xe, yb), stroke_width=9, color=BLEU_CALCUL)
        bouts = VGroup(*[Line(P(xe - 0.2, y), P(xe + 0.2, y), stroke_width=4) for y in (ya, yb)])
        ppair = Dot(P(xe, ya + (yb - ya) * 0.5), radius=0.14, color=BORD_AMBRE).set_stroke(WHITE, 2)
        p12 = Dot(P(xe, ya + (yb - ya) / 3), radius=0.14, color=BLEU_CALCUL).set_stroke(WHITE, 2)
        lp = self.t("pair", 32, BORD_AMBRE).next_to(ppair, RIGHT, buff=0.25)
        l12 = self.t("1 ou 2", 32, BLEU_CALCUL).next_to(p12, RIGHT, buff=0.25)
        ok = self.chute("Le nombre pair est plus probable.", color=VERT_OK, font_size=42)
        self.play(Create(VGroup(barre, bouts)), run_time=0.4)
        self.play(FadeIn(ppair, scale=0.4), FadeIn(lp), FadeIn(p12, scale=0.4), FadeIn(l12), Write(ok), run_time=0.7)
        self.play(Indicate(ppair, color=BORD_AMBRE, scale_factor=1.7), run_time=0.5)
        self.attendre_voix()

    # ── 07 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-finale")
        self.play(Write(self.t("Ce que tu as appris", 48, JAUNE_TITRE).to_edge(UP)), run_time=0.7)
        acquis = [("je compte les parts", "Je compte les parts ou les faces."),
                  ("Plus il y en a", "Plus il y en a, plus c'est probable."),
                  ("Et je range", "Je range sur l'échelle de 0 à 1.")]
        lignes = VGroup(*[VGroup(self.coche(), self.t(txt, 44)).arrange(RIGHT, buff=0.3) for _, txt in acquis])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.75)
        if lignes.width > 11.5:
            lignes.scale_to_fit_width(11.5)
        lignes.move_to(P(-0.6, 0.6))
        for (mot, _), l in zip(acquis, lignes):
            self.au_mot(mot)
            self.play(FadeIn(l[1], shift=RIGHT * 0.2), run_time=0.5)
            self.play(Create(l[0]), run_time=0.3)
        self.au_mot("L'épisode 3")
        self.play(Write(self.chute("L'épisode 3 t'attend : les issues.", color=VERT_OK, font_size=42)))
        self.attendre_voix(marge=1.0)

    # ── 08 : abonnement (rien qui ne soit dit) ──────────────────────────────

    def page_abonnement(self, voix="08-abonne"):
        self.clear()
        self.dire(voix)
        self.add_mascotte(scale=0.9)
        self.au_mot("va sur le coach")
        entraine = self.t("Va sur le coach", 46, JAUNE_TITRE).move_to(P(0, 2.05))
        self.play(Write(entraine), run_time=0.6)
        self.au_mot("sur éleveai")
        site = self.t("eleveai.fr", 58, BLEU_CALCUL).move_to(P(0, 1.05))
        cadre = SurroundingRectangle(site, color=BLEU_CALCUL, buff=0.26, stroke_width=3)
        self.play(GrowFromCenter(site), Create(cadre), run_time=0.6)
        self.au_mot("abonne-toi")
        abonne = self.t("Abonne-toi à la chaîne !", 44, VERT_OK).move_to(P(0, -0.7))
        self.play(FadeIn(abonne, shift=UP * 0.15), run_time=0.5)
        self.play(Flash(abonne, color=VERT_OK, line_length=0.3), run_time=0.6)
        self.attendre_voix(marge=1.4)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_compter()
        self.ecran_ranger()
        self.ecran_methode()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="08-abonne")
