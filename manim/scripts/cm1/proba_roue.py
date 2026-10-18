# proba_roue.py
# EleveAI — Maths CM1 — série « Probabilités », épisode 4 : la roue, le dé et
# le sac, tant de chances sur tant (micro : probabilite_roue_de_sac), AVEC VOIX.
# Paysage 16:9, CEINTURE BLANCHE. Short jumeau : proba_roue_short.py.
#
# ⭐ Les figures sont CELLES DU COACH (ProbabilitesCanvas.tsx, banque
# cm1/maths/probabilites.bank.ts, micro probabilite_roue_de_sac) :
#   · « roue » : parts posées à partir de midi dans le sens des aiguilles,
#     bord bleu nuit, moyeu noir, flèche noire en haut, sur la carte blanche ;
#     couleurs COULEURS (rouge, bleu, vert, jaune, rose) ;
#   · « de » (deCanvas) : les 6 faces en grille 3 × 2 ; face surlignée = crème
#     #fef3c7 et bord ambre ;
#   · « billes » (billesVariablesCanvas) : la carte blanche (ici le sac), billes
#     en grille de 3 colonnes, bord bleu nuit, lettre blanche R / B.
# ⛔ PAS D'ÉCART (17/10) : un nombre n'apparaît qu'au moment où la voix le dit ;
# seul le redondant (étiquettes, décor) peut s'écrire sans être dit.
#
# Écrans : 00 garde · 01 la roue de la kermesse (1 rouge, 2 bleues, 1 verte)
# · 02 je compte toutes les parts · 03 je compte les parts qui font gagner
# · 04 le dé · 05 le sac · 06 le piège (3 couleurs, 4 parts) · 07 défi (6 parts)
# · 07b correction · 08 ce que tu as appris · 09 abonnement.
#
# Voix : manim/voix/cm1-proba-roue.json (débit −10).
# Rendu : python -m manim render -qh --disable_caching manim/scripts/cm1/proba_roue.py ProbaRoueCM1 -o eleveai-maths-cm1-proba-roue --media_dir manim/scripts/cm1/media
# Puis copier le mp4 dans manim/sorties/cm1/maths/probabilites/04-roue-de-sac/.

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

# les couleurs du coach (COULEURS de la banque)
COUL = {"R": "#ef4444", "B": "#3b82f6", "V": "#22c55e", "J": "#eab308", "Ro": "#ec4899"}
NUIT = "#0f172a"
CARTE = "#f8fafc"
BORD = "#cbd5e1"
CREME = "#fef3c7"
AMBRE = "#fbbf24"

POINTS_DE = {
    1: [(0, 0)],
    2: [(-1, 1), (1, -1)],
    3: [(-1, 1), (0, 0), (1, -1)],
    4: [(-1, 1), (1, 1), (-1, -1), (1, -1)],
    5: [(-1, 1), (1, 1), (0, 0), (-1, -1), (1, -1)],
    6: [(-1, 1), (1, 1), (-1, 0), (1, 0), (-1, -1), (1, -1)],
}


class NotionCM1(Notion6e):
    identite = "Maths CM1 — EleveAI"


def P(x, y):
    return np.array([x, y, 0.0])


# ── la roue du coach ────────────────────────────────────────────────────────

class Roue:
    """La roue du coach : n parts égales, la 1re à partir de midi dans le sens
    des aiguilles. self.parts[i] = le secteur i ; self.fixe = moyeu + flèche ;
    self.fond = la carte blanche. On la fait tourner avec tourner()/arreter_sur()."""

    def __init__(self, codes, centre, r=1.5):
        self.codes, self.r = list(codes), r
        self.centre = np.array(centre, dtype=float)
        n = len(codes)
        self.n = n
        self.parts = VGroup()
        for i, c in enumerate(codes):
            a0 = PI / 2 - i * TAU / n
            self.parts.add(Sector(radius=r, angle=-TAU / n, start_angle=a0, fill_color=COUL[c],
                                  fill_opacity=1, stroke_color=NUIT, stroke_width=4))
        self.parts.shift(self.centre)
        k = 1.6 * r / 86.4
        moyeu = Dot(self.centre, radius=7 * k / 1.3, color=NUIT)
        fleche = Polygon(P(0, r + 9 * k), P(-9 * k, r - 13 * k), P(9 * k, r - 13 * k),
                         fill_color=NUIT, fill_opacity=1, stroke_color=WHITE, stroke_width=2).shift(self.centre)
        self.fixe = VGroup(moyeu, fleche)
        self.fond = RoundedRectangle(width=2 * r + 0.7, height=2 * r + 0.9, corner_radius=0.22,
                                     fill_color=WHITE, fill_opacity=1, stroke_color="#e2e8f0",
                                     stroke_width=2).move_to(self.centre + P(0, 0.12))
        self.angle = 0.0  # rotation totale, sens des aiguilles

    def tout(self):
        return VGroup(self.fond, self.parts, self.fixe)

    def milieu(self, i, k=0.6):
        """Le milieu de la part i (pour y poser un numéro), roue à l'arrêt."""
        a = PI / 2 - (i + 0.5) * TAU / self.n - self.angle
        return self.centre + P(k * self.r * math.cos(a), k * self.r * math.sin(a))

    def tourner(self, vitesse=7.0):
        etat = {"v": vitesse}

        def maj(m, dt):
            d = etat["v"] * dt
            self.angle += d
            m.rotate(-d, about_point=self.centre)

        self.parts.add_updater(maj)

    def arreter_sur(self, scene, i, run_time=2.4, tours=1):
        """La roue ralentit et s'arrête avec le MILIEU de la part i sous la flèche."""
        self.parts.clear_updaters()
        depart = self.angle
        mi = -(i + 0.5) * TAU / self.n  # rotation (depuis 0) qui amène la part i sous la flèche
        cible = depart + tours * TAU + ((mi - depart) % TAU)
        fait = {"a": 0.0}

        def pas(m, alpha):
            a = (cible - depart) * alpha
            m.rotate(-(a - fait["a"]), about_point=self.centre)
            fait["a"] = a

        scene.play(UpdateFromAlphaFunc(self.parts, pas), run_time=run_time,
                   rate_func=rate_functions.ease_out_cubic)
        self.angle = cible

    def eteindre(self, garder, opacite=0.25):
        """Les parts qui ne sont pas dans `garder` s'estompent (animations)."""
        return [p.animate.set_fill(opacity=1 if i in garder else opacite) for i, p in enumerate(self.parts)]

    def rallumer(self):
        return [p.animate.set_fill(opacity=1) for p in self.parts]


# ── le dé du coach ──────────────────────────────────────────────────────────

def face_coach(face, cote=1.0, active=False):
    """Une face du canvas « de » : carré arrondi, points bleu nuit ; surlignée = crème + ambre."""
    corps = RoundedRectangle(width=cote, height=cote, corner_radius=cote * 0.16,
                             fill_color=CREME if active else CARTE, fill_opacity=1,
                             stroke_color=AMBRE if active else NUIT, stroke_width=6 if active else 3)
    pts = VGroup(*[Dot(P(x * cote * 0.27, y * cote * 0.27), radius=cote * 0.075, color=NUIT)
                   for x, y in POINTS_DE[face]])
    return VGroup(corps, pts)


def carte_de(centre, cote=1.0, pas=1.25):
    """Le canvas « de » : la carte blanche et les 6 faces en grille 3 × 2."""
    faces = VGroup(*[face_coach(f, cote).move_to(centre + P(((f - 1) % 3 - 1) * pas, (0.5 - (f - 1) // 3) * pas))
                     for f in range(1, 7)])
    fond = RoundedRectangle(width=3 * pas + 0.35, height=2 * pas + 0.35, corner_radius=0.25,
                            fill_color=WHITE, fill_opacity=1, stroke_color=BORD, stroke_width=3).move_to(centre)
    return fond, faces


def surligner(face):
    """La face passe en crème + ambre, comme une face « surlignée » du coach (animation)."""
    return face[0].animate.set_fill(CREME).set_stroke(AMBRE, 6)


# ── le sac de billes du coach ───────────────────────────────────────────────

def bille_coach(code, r=0.36):
    """Une bille du canvas « billes » : couleur du coach, bord bleu nuit, lettre blanche."""
    c = Circle(radius=r, fill_color=COUL[code], fill_opacity=1, stroke_color=NUIT, stroke_width=3)
    lettre = Text(code, font_size=int(r * 80), color=WHITE, weight=BOLD).move_to(c)
    lettre.set_stroke(NUIT, width=2, background=True)
    return VGroup(c, lettre)


class Sac:
    """Le sac du coach : la carte blanche du canvas « billes » + un col et un lien.
    Places en grille de `cols` colonnes, de gauche à droite puis ligne suivante."""

    def __init__(self, centre, cols=3, rows=2, cell=1.0):
        self.cols, self.cell = cols, cell
        w, h = cols * cell + 0.5, rows * cell + 0.5
        corps = RoundedRectangle(width=w, height=h, corner_radius=0.3, fill_color=CARTE, fill_opacity=1,
                                 stroke_color=BORD, stroke_width=4)
        col = Polygon(P(-w * 0.2, h / 2 - 0.02), P(w * 0.2, h / 2 - 0.02), P(w * 0.11, h / 2 + 0.38),
                      P(-w * 0.11, h / 2 + 0.38), fill_color=CARTE, fill_opacity=1, stroke_color=BORD,
                      stroke_width=4)
        lien = Line(P(-w * 0.16, h / 2 + 0.16), P(w * 0.16, h / 2 + 0.16), color=ORANGE_RETENUE, stroke_width=8)
        self.dessin = VGroup(col, corps, lien).shift(centre)
        self.centre = np.array(centre, dtype=float)
        self.x0 = -cols * cell / 2 + cell / 2
        self.y0 = rows * cell / 2 - cell / 2
        self.haut = self.centre + P(0, h / 2 + 0.38)

    def place(self, i):
        return self.centre + P(self.x0 + (i % self.cols) * self.cell, self.y0 - (i // self.cols) * self.cell)

    def billes(self, codes, r=0.36):
        return VGroup(*[bille_coach(c, r).move_to(self.place(i)) for i, c in enumerate(codes)])


# ── petits dessins ──────────────────────────────────────────────────────────

def ballon(s=1.0, couleur=ROUGE_ERREUR):
    """Le ballon de baudruche qu'on gagne à la kermesse."""
    corps = Ellipse(width=0.9, height=1.1, fill_color=couleur, fill_opacity=1, stroke_color=WHITE, stroke_width=2)
    reflet = Ellipse(width=0.18, height=0.3, fill_color=WHITE, fill_opacity=0.6, stroke_width=0).move_to(P(-0.2, 0.22))
    noeud = Triangle(fill_color=couleur, fill_opacity=1, stroke_width=0).scale(0.08).move_to(P(0, -0.58))
    fil = VMobject(stroke_color=WHITE, stroke_width=2.5)
    fil.set_points_smoothly([P(0, -0.62), P(0.12, -0.95), P(-0.08, -1.25), P(0.05, -1.6)])
    return VGroup(fil, corps, reflet, noeud).scale(s)


def pastille(code, r=0.22):
    """Un petit rond de couleur, pour lister les couleurs d'une roue."""
    return Circle(radius=r, fill_color=COUL[code], fill_opacity=1, stroke_color=WHITE, stroke_width=2.5)


def croix(mob, color=ROUGE_ERREUR, sw=8):
    return VGroup(Line(mob.get_corner(UL), mob.get_corner(DR)),
                  Line(mob.get_corner(UR), mob.get_corner(DL))).set_stroke(color, sw)


def num(texte, font_size=48, color=WHITE):
    """Un numéro posé sur une part : blanc cerclé de bleu nuit, comme les étiquettes du coach."""
    t = Text(texte, font_size=font_size, color=color, weight=BOLD)
    t.set_stroke(NUIT, width=5, background=True)
    return t


ROUE_KERMESSE = ["R", "B", "V", "B"]  # 1 rouge, 2 bleues, 1 verte : 4 parts égales


class ProbaRoueCM1(NotionCM1):
    nom_voix = "cm1-proba-roue"
    XC = -0.6  # le centre de la zone utile (Ti-Margo occupe le coin bas-droit)
    XL = -1.3  # le bord gauche de la colonne de droite (à côté du dessin)
    FX = -4.2  # le centre du dessin, à gauche

    def col(self, mob, y):
        """Pose mob dans la colonne de droite, calé à gauche, sans déborder."""
        mob.move_to(P(0, y)).align_to(P(self.XL, 0), LEFT)
        if mob.get_right()[0] > 6.6:
            mob.scale_to_fit_width(6.6 - self.XL).align_to(P(self.XL, 0), LEFT)
        return mob

    def t(self, texte, font_size=40, color=WHITE):
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

    def chances(self, a, b, font_size=60, ca=JAUNE_TITRE, cb=JAUNE_TITRE):
        """« a chance(s) sur b », en toutes lettres (CM) ; [0] = a, [2] = b."""
        mot = "chance" if a == "1" else "chances"
        return self.ligne([(a, ca), (mot, WHITE), ("sur", WHITE), (b, cb)], font_size)

    def insister(self, mob, run_time=0.4, k=1.5):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def insister_parts(self, roue, idx, run_time=0.3, k=1.15, extra=None):
        """Les parts idx grossissent puis reviennent, depuis le centre de la roue."""
        g = VGroup(*[roue.parts[i] for i in idx], *(extra or []))
        self.play(g.animate.scale(k, about_point=roue.centre), run_time=run_time)
        self.play(g.animate.scale(1 / k, about_point=roue.centre), run_time=run_time)

    def compter_parts(self, roue, extraits, couleur=WHITE, font_size=56):
        """Les numéros 1, 2, 3… se posent sur les parts, chacun AU MOT."""
        nums = VGroup()
        for i, ex in enumerate(extraits):
            if ex:
                self.au_mot(ex)
            n = num(str(i + 1), font_size, couleur).move_to(roue.milieu(i))
            self.play(FadeIn(n, scale=0.4), roue.parts[i].animate.scale(1.08, about_point=roue.centre),
                      run_time=0.18)
            self.play(roue.parts[i].animate.scale(1 / 1.08, about_point=roue.centre), run_time=0.12)
            nums.add(n)
            self.add_foreground_mobjects(n)
        return nums

    def montrer_parts(self, roue):
        """Chaque part saute à son tour (sans numéro : la voix ne les compte pas ici)."""
        for p in roue.parts:
            self.play(p.animate.scale(1.1, about_point=roue.centre), run_time=0.13)
            self.play(p.animate.scale(1 / 1.1, about_point=roue.centre), run_time=0.09)

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("Combien de chances ?", 60, JAUNE_TITRE).to_edge(UP, buff=0.6)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.25)
        ech = echelle_ceintures("blanche").move_to(P(self.XC, -2.75))
        self.play(FadeIn(identite), FadeIn(ech), run_time=0.5)
        y = -0.15
        self.au_mot("La roue")
        roue = Roue(ROUE_KERMESSE, P(-4.3, y), 1.0)
        self.play(FadeIn(roue.tout(), scale=0.8), run_time=0.4)
        self.add_foreground_mobjects(roue.fixe)  # moyeu et flèche toujours devant
        roue.tourner(7.0)
        self.au_mot("le dé")
        fond, faces = carte_de(P(-0.6, y), 0.62, 0.78)
        self.play(FadeIn(VGroup(fond, faces), scale=0.8), run_time=0.4)
        self.au_mot("le sac")
        sac = Sac(P(3.1, y - 0.15), 3, 2, 0.72)
        billes = sac.billes(["R", "R", "B", "B", "B"], 0.26)
        self.play(FadeIn(sac.dessin, scale=0.8), LaggedStart(*[FadeIn(b, shift=DOWN * 0.3) for b in billes],
                                                           lag_ratio=0.15), run_time=0.6)
        self.au_mot("combien de chances")
        self.play(Write(titre), run_time=0.8)
        self.attendre_voix(marge=0.8)
        roue.parts.clear_updaters()

    # ── 01 : la roue de la kermesse ─────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.titre_ecran("À la kermesse", 48)
        roue = Roue(ROUE_KERMESSE, P(self.FX, -0.5), 2.0)
        self.au_mot("la roue a 4 parts")
        self.play(FadeIn(roue.tout(), scale=0.9), run_time=0.5)
        self.add_foreground_mobjects(roue.fixe)  # moyeu et flèche toujours devant
        self.au_mot("4 parts")
        quatre = self.t("4 parts", 54, JAUNE_TITRE).move_to(P(0, 2.0)).align_to(P(self.XL, 0), LEFT)
        self.play(FadeIn(quatre, scale=0.6), run_time=0.4)
        lignes = VGroup()
        for k, (ex, code, idx) in enumerate([("1 rouge", "R", [0]), ("2 bleues", "B", [1, 3]),
                                              ("1 verte", "V", [2])]):
            self.au_mot(ex)
            lg = VGroup(pastille(code, 0.24), self.t(ex, 46)).arrange(RIGHT, buff=0.3)
            self.col(lg, 0.95 - 0.85 * k)
            self.play(FadeIn(lg, shift=RIGHT * 0.2), *[Indicate(roue.parts[i], color=WHITE, scale_factor=1.08)
                                                       for i in idx], run_time=0.5)
            lignes.add(lg)
        self.au_mot("Si elle s'arrête")
        roue.tourner(8.0)
        self.au_mot("sur le rouge")
        self.play(Indicate(lignes[0], color=JAUNE_TITRE, scale_factor=1.2), run_time=0.5)
        roue.arreter_sur(self, 0, 2.2)
        self.au_mot("un ballon")
        b = ballon(1.0).move_to(P(4.9, 0.9))
        self.play(FadeIn(b, shift=UP * 0.6), Flash(roue.fixe[1], color=JAUNE_TITRE, line_length=0.3), run_time=0.6)
        self.play(b.animate.shift(UP * 0.15), run_time=0.5, rate_func=there_and_back)
        self.attendre_voix()

    # ── 02 : je compte toutes les parts ─────────────────────────────────────

    def ecran_compter(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-compter")
        self.titre_ecran("Je compte tout", 48)
        roue = Roue(ROUE_KERMESSE, P(self.FX, -0.5), 2.0)
        self.add(roue.tout())
        self.add_foreground_mobjects(roue.fixe)  # moyeu et flèche toujours devant
        self.au_mot("toutes les parts")
        self.play(Indicate(roue.parts, color=WHITE, scale_factor=1.05), run_time=0.5)
        self.compter_parts(roue, ["1, 2, 3, 4", "2, 3, 4", "3, 4", "4. Il"])
        self.au_mot("Il y a 4 parts")
        tot = self.ligne([("4", JAUNE_TITRE), ("parts", WHITE)], 72).move_to(P(0, 0.2)).align_to(P(self.XL, 0), LEFT)
        self.play(FadeIn(tot, scale=0.6), run_time=0.5)
        self.insister(tot[0], 0.35)
        self.attendre_voix()

    # ── 03 : je compte les parts qui font gagner ────────────────────────────

    def ecran_gagnant(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-gagnant")
        self.titre_ecran("Ce qui fait gagner", 48)
        roue = Roue(ROUE_KERMESSE, P(self.FX, -0.5), 2.0)
        self.add(roue.tout())
        self.add_foreground_mobjects(roue.fixe)  # moyeu et flèche toujours devant
        self.au_mot("qui font gagner")
        b = ballon(0.9).move_to(P(4.6, 1.5))
        self.play(FadeIn(b, shift=UP * 0.4), run_time=0.4)
        self.au_mot("1 seule")
        self.play(*roue.eteindre([0]), run_time=0.5)
        un = num("1", 60).move_to(roue.milieu(0))
        self.play(FadeIn(un, scale=0.4), run_time=0.3)
        self.add_foreground_mobjects(un)
        self.insister_parts(roue, [0], extra=[un])
        self.au_mot("la rouge")
        rouge = VGroup(pastille("R", 0.24), self.t("la rouge", 44)).arrange(RIGHT, buff=0.3)
        rouge.move_to(P(0, 1.3)).align_to(P(self.XL, 0), LEFT)
        self.play(FadeIn(rouge, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("J'ai 1 chance")
        ch = self.chances("1", "4", 66, ca=COUL["R"]).move_to(P(0, -0.2)).align_to(P(self.XL, 0), LEFT)
        self.play(FadeIn(ch[0], scale=0.5), FadeIn(ch[1]), run_time=0.4)
        self.au_mot("sur 4")
        self.play(*roue.rallumer(), FadeIn(ch[2]), FadeIn(ch[3], scale=0.5), run_time=0.5)
        self.play(Indicate(roue.parts, color=WHITE, scale_factor=1.05), run_time=0.5)
        cadre = SurroundingRectangle(ch, color=VERT_OK, buff=0.25, corner_radius=0.15, stroke_width=5)
        self.play(Create(cadre), run_time=0.4)
        self.insister(VGroup(ch, cadre), 0.3, 1.15)
        self.attendre_voix()

    # ── 04 : le dé ──────────────────────────────────────────────────────────

    def ecran_de(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-de")
        self.titre_ecran("Le dé", 48)
        fond, faces = carte_de(P(self.FX + 0.15, -0.5), 1.15, 1.45)
        self.au_mot("Avec un dé")
        self.play(FadeIn(fond), LaggedStart(*[FadeIn(f, scale=0.6) for f in faces], lag_ratio=0.12), run_time=0.9)
        self.au_mot("6 faces")
        for f in faces:
            self.play(f.animate.scale(1.15), run_time=0.09)
            self.play(f.animate.scale(1 / 1.15), run_time=0.07)
        six = self.ligne([("6", JAUNE_TITRE), ("faces", WHITE)], 60).move_to(P(0, 2.0)).align_to(P(self.XL, 0), LEFT)
        self.play(FadeIn(six, scale=0.6), run_time=0.4)
        self.au_mot("Pour faire 5")
        cinq = self.ligne([("pour faire", WHITE), ("5", COUL["J"])], 44).move_to(P(0, 0.75)).align_to(P(self.XL, 0), LEFT)
        self.play(FadeIn(cinq, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("une seule face")
        self.play(surligner(faces[4]), *[f.animate.set_opacity(0.3) for k, f in enumerate(faces) if k != 4],
                  run_time=0.5)
        self.insister(faces[4], 0.3)
        self.au_mot("1 chance sur 6")
        ch = self.chances("1", "6", 66).move_to(P(0, -0.6)).align_to(P(self.XL, 0), LEFT)
        self.play(FadeIn(ch[:2], scale=0.6), run_time=0.4)
        self.play(FadeIn(ch[2:], scale=0.6), *[f.animate.set_opacity(1) for k, f in enumerate(faces) if k != 4],
                  run_time=0.5)
        cadre = SurroundingRectangle(ch, color=VERT_OK, buff=0.25, corner_radius=0.15, stroke_width=5)
        self.play(Create(cadre), run_time=0.4)
        self.attendre_voix()

    # ── 05 : le sac ─────────────────────────────────────────────────────────

    def ecran_sac(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-sac")
        self.titre_ecran("Le sac", 48)
        sac = Sac(P(self.FX + 0.1, -0.8), 3, 2, 1.25)
        billes = sac.billes(["R", "R", "B", "B", "B"], 0.45)
        self.au_mot("avec un sac")
        self.play(FadeIn(sac.dessin, scale=0.9), run_time=0.5)
        self.au_mot("2 billes rouges")
        self.play(LaggedStart(*[FadeIn(b, shift=DOWN * 0.8) for b in billes[:2]], lag_ratio=0.3), run_time=0.6)
        self.au_mot("3 bleues")
        self.play(LaggedStart(*[FadeIn(b, shift=DOWN * 0.8) for b in billes[2:]], lag_ratio=0.3), run_time=0.7)
        self.au_mot("5 billes en tout")
        for b in billes:
            self.play(b.animate.scale(1.25), run_time=0.09)
            self.play(b.animate.scale(1 / 1.25), run_time=0.07)
        cinq = self.ligne([("5", JAUNE_TITRE), ("billes", WHITE)], 56).move_to(P(0, 2.0)).align_to(P(self.XL, 0), LEFT)
        self.play(FadeIn(cinq, scale=0.6), run_time=0.4)
        self.au_mot("2 rouges :")
        deux = VGroup(pastille("R", 0.24), self.ligne([("2", JAUNE_TITRE), ("rouges", WHITE)], 50))
        deux.arrange(RIGHT, buff=0.3).move_to(P(0, 0.85)).align_to(P(self.XL, 0), LEFT)
        self.play(FadeIn(deux, shift=RIGHT * 0.2), *[b.animate.set_opacity(0.3) for b in billes[2:]], run_time=0.5)
        self.play(*[b.animate.scale(1.4) for b in billes[:2]], run_time=0.3)
        self.play(*[b.animate.scale(1 / 1.4) for b in billes[:2]], run_time=0.3)
        self.au_mot("2 chances sur 5")
        ch = self.chances("2", "5", 62, ca=COUL["R"]).move_to(P(0, -0.45)).align_to(P(self.XL, 0), LEFT)
        self.play(FadeIn(ch[:2], scale=0.6), run_time=0.4)
        self.play(FadeIn(ch[2:], scale=0.6), *[b.animate.set_opacity(1) for b in billes[2:]], run_time=0.5)
        self.au_mot("de tirer une rouge")
        tirer = self.t("de tirer une rouge", 38).next_to(ch, DOWN, buff=0.35)
        cadre = SurroundingRectangle(VGroup(ch, tirer), color=VERT_OK, buff=0.25, corner_radius=0.15,
                                     stroke_width=5)
        self.play(FadeIn(tirer), Create(cadre), billes[0].animate.shift(UP * 0.5), run_time=0.6)
        self.attendre_voix()

    # ── 06 : le piège ───────────────────────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-piege")
        self.titre_ecran("Le piège", 48)
        roue = Roue(ROUE_KERMESSE, P(self.FX, -0.5), 2.0)
        self.au_mot("sur la roue")
        self.play(FadeIn(roue.tout(), scale=0.9), run_time=0.4)
        self.add_foreground_mobjects(roue.fixe)  # moyeu et flèche toujours devant
        self.au_mot("3 couleurs")
        past = VGroup(*[pastille(c, 0.26) for c in "RBV"]).arrange(RIGHT, buff=0.25)
        coul = VGroup(past, self.ligne([("3", ORANGE_RETENUE), ("couleurs", WHITE)], 50)).arrange(RIGHT, buff=0.4)
        coul.move_to(P(0, 1.6)).align_to(P(self.XL, 0), LEFT)
        self.play(LaggedStart(*[FadeIn(p, scale=0.4) for p in past], lag_ratio=0.3), FadeIn(coul[1]), run_time=0.6)
        self.au_mot("mais 4 parts")
        parts = self.ligne([("4", VERT_OK), ("parts", WHITE)], 56).move_to(P(0, 0.45)).align_to(P(self.XL, 0), LEFT)
        self.play(FadeIn(parts, scale=0.6), run_time=0.3)
        self.montrer_parts(roue)
        self.au_mot("On compte les parts")
        self.play(Create(self.coche(VERT_OK, 0.32).next_to(parts, RIGHT, buff=0.4)), run_time=0.4)
        self.insister(parts, 0.3)
        self.au_mot("pas les couleurs")
        self.play(Create(croix(coul, sw=7)), coul.animate.set_opacity(0.45), run_time=0.5)
        self.au_mot("Le bleu")
        self.play(*roue.eteindre([1, 3]), run_time=0.5)
        self.insister_parts(roue, [1, 3])
        self.au_mot("2 chances sur 4")
        ch = self.chances("2", "4", 64, ca=COUL["B"]).move_to(P(0, -1.0)).align_to(P(self.XL, 0), LEFT)
        self.play(FadeIn(ch[:2], scale=0.6), run_time=0.4)
        self.play(FadeIn(ch[2:], scale=0.6), *roue.rallumer(), run_time=0.5)
        cadre = SurroundingRectangle(ch, color=VERT_OK, buff=0.25, corner_radius=0.15, stroke_width=5)
        self.play(Create(cadre), run_time=0.4)
        self.attendre_voix()

    # ── 07 : défi ───────────────────────────────────────────────────────────

    ROUE_DEFI = ["J", "V", "J", "Ro", "J", "V"]  # 3 jaunes, 2 vertes, 1 rose

    def roue_defi(self):
        return Roue(self.ROUE_DEFI, P(self.FX, -0.5), 2.0)

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-defi")
        self.play(Write(self.t("À toi de jouer", 48, JAUNE_TITRE).to_edge(UP)))
        roue = self.roue_defi()
        self.au_mot("Une roue de 6 parts")
        self.play(FadeIn(roue.tout(), scale=0.9), run_time=0.5)
        self.add_foreground_mobjects(roue.fixe)  # moyeu et flèche toujours devant
        self.au_mot("6 parts")
        six = self.t("6 parts", 52, JAUNE_TITRE).move_to(P(0, 2.05)).align_to(P(self.XL, 0), LEFT)
        self.play(FadeIn(six, scale=0.6), run_time=0.4)
        for k, (ex, code) in enumerate([("3 jaunes", "J"), ("2 vertes", "V"), ("1 rose", "Ro")]):
            self.au_mot(ex)
            lg = VGroup(pastille(code, 0.22), self.t(ex, 40)).arrange(RIGHT, buff=0.28)
            self.col(lg, 1.2 - 0.62 * k)
            idx = [i for i, c in enumerate(self.ROUE_DEFI) if c == code]
            self.play(FadeIn(lg, shift=RIGHT * 0.2),
                      *[Indicate(roue.parts[i], color=WHITE, scale_factor=1.08) for i in idx], run_time=0.5)
        self.au_mot("Combien de chances")
        q = VGroup(VGroup(pastille("J", 0.26), self.t("le jaune :", 42)).arrange(RIGHT, buff=0.3),
                   self.t("combien de chances ?", 42, ORANGE_RETENUE)).arrange(DOWN, aligned_edge=LEFT, buff=0.25)
        self.col(q, -1.35)
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.5)
        roue.tourner(8.0)
        self.au_mot("Mets pause")
        roue.arreter_sur(self, 3, 1.4, tours=0)
        pause = self.col(self.t("Mets pause, et cherche !", 36, ORANGE_RETENUE), -2.45)
        self.play(Write(pause))
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07b-correction")
        self.titre_ecran("Correction", 48)
        roue = self.roue_defi()
        self.add(roue.tout())
        self.add_foreground_mobjects(roue.fixe)  # moyeu et flèche toujours devant
        self.au_mot("6 parts en tout")
        self.montrer_parts(roue)
        six = self.ligne([("6", JAUNE_TITRE), ("parts", WHITE)], 60).move_to(P(0, 1.8)).align_to(P(self.XL, 0), LEFT)
        self.play(FadeIn(six, scale=0.6), run_time=0.4)
        self.au_mot("3 jaunes")
        idx = [i for i, c in enumerate(self.ROUE_DEFI) if c == "J"]
        jaunes = VGroup(pastille("J", 0.24), self.ligne([("3", JAUNE_TITRE), ("jaunes", WHITE)], 52))
        jaunes.arrange(RIGHT, buff=0.3).move_to(P(0, 0.65)).align_to(P(self.XL, 0), LEFT)
        self.play(FadeIn(jaunes, shift=RIGHT * 0.2), *roue.eteindre(idx), run_time=0.5)
        self.insister_parts(roue, idx)
        self.au_mot("3 chances sur 6")
        ch = self.chances("3", "6", 66).move_to(P(0, -0.65)).align_to(P(self.XL, 0), LEFT)
        self.play(FadeIn(ch[:2], scale=0.6), run_time=0.4)
        self.play(FadeIn(ch[2:], scale=0.6), *roue.rallumer(), run_time=0.5)
        cadre = SurroundingRectangle(ch, color=VERT_OK, buff=0.25, corner_radius=0.15, stroke_width=5)
        self.play(Create(cadre), run_time=0.4)
        self.insister(VGroup(ch, cadre), 0.3, 1.15)
        self.attendre_voix()

    # ── 08 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-finale")
        self.play(Write(self.t("Ce que tu as appris", 46, JAUNE_TITRE).to_edge(UP)))
        acquis = ["Je compte tout.", "Je compte ce qui fait gagner.", "Je dis : tant de chances sur tant."]
        lignes = VGroup(*[VGroup(self.coche(), self.t(txt, 42)).arrange(RIGHT, buff=0.3) for txt in acquis])
        for lg, y in zip(lignes, [2.25, -0.85, -1.75]):
            lg.move_to(P(0, y)).align_to(P(-5.6, 0), LEFT)
        roue = Roue(ROUE_KERMESSE, P(-4.3, 0.65), 0.75)
        fd, faces = carte_de(P(-0.9, 0.6), 0.5, 0.62)
        sac = Sac(P(2.4, 0.5), 3, 2, 0.6)
        billes = sac.billes(["R", "R", "B", "B", "B"], 0.22)
        self.au_mot("Je compte tout")
        self.play(FadeIn(lignes[0][1], shift=RIGHT * 0.2), run_time=0.5)
        self.play(Create(lignes[0][0]), run_time=0.3)
        self.au_mot("les parts")
        self.play(FadeIn(roue.tout(), scale=0.7), run_time=0.4)
        self.add_foreground_mobjects(roue.fixe)  # moyeu et flèche toujours devant
        self.montrer_parts(roue)
        self.au_mot("les faces")
        self.play(FadeIn(VGroup(fd, faces), scale=0.7), run_time=0.4)
        self.au_mot("les billes")
        self.play(FadeIn(sac.dessin, scale=0.7), FadeIn(billes, shift=DOWN * 0.2), run_time=0.5)
        self.au_mot("Puis je compte")
        self.play(FadeIn(lignes[1][1], shift=RIGHT * 0.2), *roue.eteindre([0]), surligner(faces[4]),
                  *[b.animate.set_opacity(0.3) for b in billes[2:]], run_time=0.6)
        self.play(Create(lignes[1][0]), run_time=0.3)
        self.au_mot("Et je dis")
        self.play(FadeIn(lignes[2][1], shift=RIGHT * 0.2), run_time=0.6)
        self.play(Create(lignes[2][0]), run_time=0.3)
        self.insister(lignes[2][1], 0.3, 1.2)
        self.au_mot("L'épisode 5")
        self.play(Write(self.chute("Épisode 5 : le défi", color=VERT_OK, font_size=40)))
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_compter()
        self.ecran_gagnant()
        self.ecran_de()
        self.ecran_sac()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="09-abonne")
