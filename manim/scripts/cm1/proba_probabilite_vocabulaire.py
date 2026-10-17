# proba_probabilite_vocabulaire.py
# EleveAI — Maths CM1 — série « Probabilités », épisode 1 : certain, possible,
# impossible (micro : probabilite_vocabulaire), AVEC VOIX. Paysage 16:9,
# CEINTURE BLANCHE. Short jumeau : proba_probabilite_vocabulaire_short.py.
#
# Écrans : 00 garde · 01 le sac de 3 billes rouges (les yeux fermés, on tire)
# · 02 rouge : certain · 03 verte : impossible (on cherche, aucune verte)
# · 04 + 1 bleue : possible (une fois oui, une fois non) · 05 la méthode : je
# regarde dans le sac (3 sacs : que ça / un peu / pas) · 06 le piège : 1 seule
# bleue ≠ impossible · 07 défi du dé (le dé du coach, 6 faces) · 07b correction
# (pas de face 7 ; la face 4 surlignée comme sur le coach) · 08 ce que tu as
# appris · 09 abonnement.
#
# ⭐ Les FIGURES DU COACH (lib/tutor-v4/components/ProbabilitesCanvas.tsx) :
#   · « billes » : carte blanche, billes en grille (3 colonnes au moins), cercle
#     de couleur cerclé de bleu nuit, la lettre de la couleur en blanc
#     (R, B, V) ; ici la carte blanche EST le sac (col et lien par-dessus) ;
#   · « de » : carte blanche, les 6 faces en grille 3 × 2 ; une face surlignée
#     = fond crème #fef3c7 et bord ambre.
# CM1 : très peu de texte, gros caractères, le dessin porte tout.
#
# Voix : manim/voix/cm1-proba-vocabulaire.json (débit −10).
# Rendu : python -m manim render -qh --disable_caching manim/scripts/cm1/proba_probabilite_vocabulaire.py ProbaVocabulaireCM1 -o eleveai-maths-cm1-proba-vocabulaire --media_dir manim/scripts/cm1/media
# Puis copier le mp4 dans manim/sorties/cm1/maths/probabilites/01-vocabulaire/.

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
from annonce_probabilites import de_qui_roule  # noqa: E402

# les couleurs du coach (probabilites.bank.ts, COULEURS)
COACH = {"R": "#ef4444", "B": "#3b82f6", "V": "#22c55e"}
NUIT = "#0f172a"
CARTE = "#f8fafc"
BORD = "#cbd5e1"
CREME = "#fef3c7"
AMBRE = "#fbbf24"
MOTS = {"certain": VERT_OK, "possible": ORANGE_RETENUE, "impossible": ROUGE_ERREUR}

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


# ── les dessins du coach (paysage et short) ─────────────────────────────────

def bille_coach(code, r=0.36):
    """Une bille du canvas « billes » : couleur du coach, bord bleu nuit, lettre blanche."""
    c = Circle(radius=r, fill_color=COACH[code], fill_opacity=1, stroke_color=NUIT, stroke_width=3)
    lettre = Text(code, font_size=int(r * 80), color=WHITE, weight=BOLD).move_to(c)
    return VGroup(c, lettre)


def bille_mystere(r=0.36):
    """La bille qu'on tire les yeux fermés : on ne sait pas encore sa couleur."""
    c = Circle(radius=r, fill_color=GREY_D, fill_opacity=1, stroke_color=WHITE, stroke_width=3)
    return VGroup(c, Text("?", font_size=int(r * 90), color=WHITE, weight=BOLD).move_to(c))


class Sac:
    """Le sac du coach : la carte blanche du canvas « billes » + un col et un lien.
    Les places suivent la grille du coach (colonnes, de gauche à droite, puis
    ligne suivante)."""

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


def yeux_fermes(centre, s=1.0, color=WHITE):
    """Deux yeux fermés (deux arcs et des cils)."""
    g = VGroup()
    for dx in (-0.45, 0.45):
        arc = Arc(radius=0.3, start_angle=PI + 0.35, angle=PI - 0.7, color=color, stroke_width=6)
        arc.move_to(P(dx, 0))
        cils = VGroup(*[Line(P(dx + k * 0.15, -0.1), P(dx + k * 0.2, -0.24), color=color, stroke_width=4)
                        for k in (-1, 0, 1)])
        g.add(arc, cils)
    return g.scale(s).move_to(centre)


def oeil(centre, s=1.0):
    """Un œil ouvert : je REGARDE dans le sac."""
    blanc = Ellipse(width=1.2, height=0.7, fill_color=WHITE, fill_opacity=1, stroke_color=NUIT, stroke_width=3)
    iris = Circle(radius=0.22, fill_color=BLEU_CALCUL, fill_opacity=1, stroke_width=0)
    pupille = Dot(radius=0.1, color=NUIT)
    return VGroup(blanc, iris, pupille).scale(s).move_to(centre)


def mot(texte, font_size=40, color=None):
    """Une étiquette pleine : certain (vert), possible (orange), impossible (rouge)."""
    color = color or MOTS.get(texte, WHITE)
    lbl = Text(texte, font_size=font_size, color=BLACK, weight=BOLD)
    fond = RoundedRectangle(width=lbl.width + 0.5, height=lbl.height + 0.36, corner_radius=0.15,
                            fill_color=color, fill_opacity=1, stroke_width=0)
    return VGroup(fond, lbl.move_to(fond))


def croix(mob, color=ROUGE_ERREUR, sw=8):
    return VGroup(Line(mob.get_corner(UL), mob.get_corner(DR)),
                  Line(mob.get_corner(UR), mob.get_corner(DL))).set_stroke(color, sw)


SAC_C = P(-3.4, -0.4)   # le sac, à gauche
MAIN = P(2.6, 1.0)       # la bille tirée, à droite
BAS = P(2.5, -1.5)      # le mot (certain, possible, impossible)


class ProbaVocabulaireCM1(NotionCM1):
    nom_voix = "cm1-proba-vocabulaire"

    def t(self, texte, font_size=40, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def insister(self, mob, run_time=0.4):
        self.play(mob.animate.scale(1.5), run_time=run_time)
        self.play(mob.animate.scale(1 / 1.5), run_time=run_time)

    def sac(self, codes, centre=SAC_C, cell=1.5):
        s = Sac(centre, cell=cell)
        return s, s.billes(codes, cell * 0.34)

    def tirer(self, s, cible, depuis=None, run_time=1.0):
        """Une bille mystère sort par le col du sac et vient en `cible`."""
        m = bille_mystere(0.55).move_to(depuis if depuis is not None else s.place(1))
        self.play(FadeIn(m, scale=0.5), run_time=0.25)
        self.play(m.animate.move_to(s.haut + UP * 0.5), run_time=run_time * 0.45)
        self.play(m.animate.move_to(cible), run_time=run_time * 0.55, path_arc=-0.6)
        return m

    def pulser(self, billes, k=1.3):
        """Les billes grossissent puis reviennent (sans changer de couleur)."""
        self.play(*[b.animate.scale(k) for b in billes], run_time=0.3)
        self.play(*[b.animate.scale(1 / k) for b in billes], run_time=0.3)

    def caler(self, mob, centre, gauche=-1.4, droite=6.7):
        """Pose `mob` à droite de la figure, sans déborder du cadre."""
        if mob.width > droite - gauche:
            mob.scale_to_fit_width(droite - gauche)
        mob.move_to(centre)
        mob.shift(LEFT * max(0, mob.get_right()[0] - droite) + RIGHT * max(0, gauche - mob.get_left()[0]))
        return mob

    def remettre(self, b, source):
        """La bille tirée retourne dans le sac ; sa trace reste, plus pâle."""
        retour = b.copy()
        self.play(retour.animate.move_to(source), b.animate.set_opacity(0.45), run_time=0.35)
        self.remove(retour)
        source.set_opacity(1)

    def reveler(self, m, code):
        b = bille_coach(code, 0.55).move_to(m)
        self.play(m.animate.stretch(0.02, 0), run_time=0.2)
        self.remove(m)
        b.stretch(0.02, 0)
        self.add(b)
        self.play(b.animate.stretch(50, 0), run_time=0.2)
        return b

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        identite = self.t(self.identite, 30).to_edge(UP, buff=0.3)
        ech = echelle_ceintures("blanche").move_to(P(-0.6, -2.85))
        s, billes = self.sac(["R", "R", "B"], P(-3.4, 0.15), 0.9)
        d = de_qui_roule(P(2.2, 0.3), 1.6)
        self.play(FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech), FadeIn(s.dessin), FadeIn(billes), run_time=0.6)
        self.add(d)
        mots = VGroup(mot("certain", 50), mot("possible", 50), mot("impossible", 50)).arrange(RIGHT, buff=0.45)
        mots.move_to(P(-0.6, 2.55))
        for ex, m in zip(["Certain", "possible", "impossible"], mots):
            self.au_mot(ex)
            self.play(GrowFromCenter(m), run_time=0.35)
        self.au_mot("Les mots du hasard")
        sous = self.t("Les mots du hasard", 50, JAUNE_TITRE).move_to(P(-0.6, -1.4))
        self.play(Write(sous), run_time=0.8)
        self.attendre_voix(marge=1.2)
        d.clear_updaters()

    # ── 01 : le sac de 3 billes rouges ──────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.titre_ecran("Dans un sac")
        s, billes = self.sac(["R", "R", "R"])
        self.au_mot("Dans un sac")
        self.play(FadeIn(s.dessin, shift=UP * 0.2), run_time=0.5)
        self.au_mot("3 billes rouges")
        trois = self.t("3", 120, JAUNE_TITRE).move_to(P(1.6, 0.8))
        rouges = self.t("rouges", 64, COACH["R"]).next_to(trois, RIGHT, buff=0.35)
        for k, b in enumerate(billes):
            self.play(FadeIn(b, shift=DOWN * 1.2), run_time=0.3)
            if k == 0:
                self.play(FadeIn(trois, scale=0.5), run_time=0.3)
        self.play(FadeIn(rouges, shift=LEFT * 0.2), run_time=0.3)
        self.au_mot("Rien que des rouges")
        self.pulser(billes)
        self.au_mot("Je ferme les yeux")
        self.play(FadeOut(VGroup(trois, rouges)), run_time=0.3)
        yeux = yeux_fermes(P(2.6, 2.3), 1.8)
        self.play(Create(yeux), run_time=0.6)
        self.au_mot("je tire une bille")
        self.play(FadeOut(billes[1], scale=0.5), run_time=0.2)
        self.tirer(s, MAIN, depuis=s.place(1))
        self.attendre_voix()

    # ── 02 : certain ────────────────────────────────────────────────────────

    def ecran_certain(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-certain")
        self.titre_ecran("Certain")
        s, billes = self.sac(["R", "R", "R"])
        billes[1].set_opacity(0)
        m = bille_mystere(0.55).move_to(MAIN)
        self.add(s.dessin, billes, m)
        self.au_mot("bille rouge")
        b = self.reveler(m, "R")
        self.insister(b, 0.3)
        self.au_mot("C'est sûr")
        ok = self.coche(taille=0.5).next_to(b, RIGHT, buff=0.5)
        self.play(Create(ok), run_time=0.4)
        self.au_mot("C'est certain")
        cert = self.caler(mot("certain", 56), BAS, -0.6, 5.5)
        self.play(GrowFromCenter(cert), run_time=0.4)
        self.insister(cert)
        self.attendre_voix()

    # ── 03 : impossible ─────────────────────────────────────────────────────

    def ecran_impossible(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-impossible")
        self.titre_ecran("Impossible")
        s, billes = self.sac(["R", "R", "R"])
        self.add(s.dessin, billes)
        self.au_mot("Tirer une bille verte")
        v = bille_coach("V", 0.6).move_to(MAIN)
        q = self.t("?", 96, JAUNE_TITRE).next_to(v, RIGHT, buff=0.3)
        self.play(FadeIn(v, scale=0.5), FadeIn(q), run_time=0.4)
        self.au_mot("Il n'y en a pas")
        loupe = SurroundingRectangle(billes[0], color=JAUNE_TITRE, buff=0.1, stroke_width=6)
        self.play(Create(loupe), run_time=0.3)
        for b in billes[1:]:
            self.play(loupe.animate.move_to(b), run_time=0.3)
        self.play(FadeOut(loupe), run_time=0.2)
        x = croix(v)
        self.play(Create(x), FadeOut(q), run_time=0.4)
        self.au_mot("C'est impossible")
        imp = self.caler(mot("impossible", 56), BAS, -0.6, 5.5)
        self.play(GrowFromCenter(imp), run_time=0.4)
        self.insister(imp)
        self.attendre_voix()

    # ── 04 : + 1 bleue : possible ───────────────────────────────────────────

    def ecran_possible(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-possible")
        self.titre_ecran("Possible")
        s, billes = self.sac(["R", "R", "R", "B"])
        self.add(s.dessin, *billes[:3])
        self.au_mot("j'ajoute 1 bille bleue")
        plus = self.t("1", 72, COACH["B"]).move_to(s.haut + P(1.6, 0.3))
        bleue = billes[3]
        depart = bleue.get_center().copy()
        bleue.move_to(s.haut + UP * 0.6)
        self.play(FadeIn(bleue), FadeIn(plus, scale=0.5), run_time=0.3)
        self.play(bleue.animate.move_to(depart), run_time=0.6, rate_func=rate_functions.ease_in_quad)
        self.au_mot("3 rouges")
        x_nb = s.centre[0] + 2.95
        n3 = self.t("3", 80, COACH["R"]).move_to(P(x_nb, s.place(0)[1]))
        self.play(FadeOut(plus), FadeIn(n3, scale=0.5), run_time=0.3)
        self.pulser(billes[:3])
        self.au_mot("et 1 bleue")
        n1 = self.t("1", 80, COACH["B"]).move_to(P(x_nb, s.place(3)[1]))
        self.play(FadeIn(n1, scale=0.5), run_time=0.3)
        self.pulser([bleue])
        self.au_mot("Tirer une bille bleue")
        cible = bille_coach("B", 0.5).move_to(P(2.2, 2.3))
        q = self.t("?", 84, JAUNE_TITRE).next_to(cible, RIGHT, buff=0.25)
        self.play(FadeIn(cible, scale=0.5), FadeIn(q), run_time=0.35)
        self.au_mot("Ça peut arriver")
        bleue.set_opacity(0)
        m1 = self.tirer(s, P(1.8, 0.35), depuis=s.place(3), run_time=0.6)
        b1 = self.reveler(m1, "B")
        ok = self.coche(taille=0.4).next_to(b1, DOWN, buff=0.2)
        self.play(Create(ok), run_time=0.25)
        self.remettre(b1, bleue)
        self.au_mot("ou pas")
        billes[0].set_opacity(0)
        m2 = self.tirer(s, P(3.6, 0.35), depuis=s.place(0), run_time=0.6)
        b2 = self.reveler(m2, "R")
        non = croix(Square(0.5).next_to(b2, DOWN, buff=0.2), sw=8)
        self.play(Create(non), run_time=0.25)
        self.remettre(b2, billes[0])
        self.au_mot("C'est possible")
        pos = self.caler(mot("possible", 56), BAS, -0.6, 5.5)
        self.play(GrowFromCenter(pos), run_time=0.4)
        self.insister(pos)
        self.attendre_voix()

    # ── 05 : la méthode : je regarde dans le sac ────────────────────────────

    def ecran_methode(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-methode")
        self.titre_ecran("Je regarde dans le sac")
        self.au_mot("je regarde dans le sac")
        o = oeil(P(-0.6, 2.5), 0.9)
        self.play(FadeIn(o, scale=0.5), run_time=0.4)
        cas = [("Il n'y a que ça", ["R", "R", "R"], "R", "c'est certain", "certain", -4.9),
               ("Il y en a un peu", ["R", "R", "R", "B"], "B", "c'est possible", "possible", -1.1),
               ("Il n'y en a pas", ["R", "R", "R", "B"], "V", "c'est impossible", "impossible", 2.75)]
        for ex, codes, code, ex_mot, nom, x in cas:
            self.au_mot(ex)
            s = Sac(P(x, 0.3), cell=0.9)
            billes = s.billes(codes, 0.31)
            cible = bille_coach(code, 0.42).move_to(P(x - 0.4, -1.5))
            q = self.t("?", 60, JAUNE_TITRE).next_to(cible, RIGHT, buff=0.15)
            self.play(FadeIn(s.dessin, scale=0.8), FadeIn(billes, scale=0.8), FadeIn(cible), FadeIn(q),
                      run_time=0.5)
            pareilles = [b for b, c in zip(billes, codes) if c == code]
            if pareilles:
                self.pulser(pareilles, 1.4)
            else:
                self.play(Create(croix(cible, sw=6)), run_time=0.4)
            self.au_mot(ex_mot)
            m = mot(nom, 38).move_to(P(x, -2.5))
            self.play(GrowFromCenter(m), run_time=0.35)
            self.insister(m, 0.3)
        self.attendre_voix()

    # ── 06 : le piège ───────────────────────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-piege")
        self.titre_ecran("Le piège")
        s, billes = self.sac(["R", "R", "R", "B"])
        self.add(s.dessin, billes)
        bleue = billes[3]
        self.au_mot("1 seule bille bleue")
        une = VGroup(self.t("1 seule", 64, COACH["B"]), bille_coach("B", 0.45)).arrange(RIGHT, buff=0.3)
        une.move_to(P(2.6, 2.0))
        self.play(FadeIn(une, shift=LEFT * 0.2), Circumscribe(bleue, Circle, color=JAUNE_TITRE), run_time=0.6)
        self.insister(bleue, 0.3)
        self.au_mot("pas impossible")
        imp = self.caler(mot("impossible", 56), P(2.6, 0.35), -0.6, 5.9)
        self.play(GrowFromCenter(imp), run_time=0.35)
        self.play(Create(croix(imp, sw=9)), run_time=0.4)
        self.au_mot("Il y en a une")
        cadre = SurroundingRectangle(bleue, color=VERT_OK, buff=0.12, stroke_width=6)
        self.play(Create(cadre), run_time=0.3)
        self.insister(VGroup(bleue, cadre), 0.3)
        self.au_mot("c'est possible")
        pos = self.caler(mot("possible", 56), BAS + DOWN * 0.15, -0.6, 5.5)
        self.play(GrowFromCenter(pos), run_time=0.4)
        self.insister(pos)
        self.attendre_voix()

    # ── 07 : défi : le dé du coach ──────────────────────────────────────────

    DE_C = P(-3.95, 0.45)

    def faire(self, n, couleur=JAUNE_TITRE, font_size=60):
        return VGroup(self.t("Faire", font_size), self.t(str(n), font_size + 14, couleur)).arrange(RIGHT, buff=0.3)

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-defi")
        self.play(Write(self.t("À toi de jouer", 48, JAUNE_TITRE).to_edge(UP)))
        fond, faces = carte_de(self.DE_C, 1.15, 1.4)
        self.au_mot("Un dé")
        self.play(FadeIn(fond), LaggedStart(*[FadeIn(f, scale=0.5) for f in faces], lag_ratio=0.12), run_time=0.9)
        self.au_mot("6 faces")
        l1 = self.t("6 faces", 54, JAUNE_TITRE).next_to(fond, DOWN, buff=0.35).shift(LEFT * 0.9)
        self.play(FadeIn(l1, shift=UP * 0.15), run_time=0.35)
        self.au_mot("de 1 à 6")
        l2 = self.t("de 1 à 6", 54).next_to(l1, RIGHT, buff=0.4)
        self.play(FadeIn(l2, shift=UP * 0.15), Indicate(faces[0][1], color=ORANGE_RETENUE),
                  Indicate(faces[5][1], color=ORANGE_RETENUE), run_time=0.5)
        self.au_mot("Faire 7")
        q1 = self.faire(7, font_size=66).move_to(P(2.8, 1.9))
        q1.add(self.t("?", 60).next_to(q1, RIGHT, buff=0.2))
        self.play(FadeIn(q1, shift=LEFT * 0.2), run_time=0.4)
        trio = VGroup(mot("certain", 34), mot("possible", 34), mot("impossible", 34)).arrange(RIGHT, buff=0.25)
        self.caler(trio, P(2.75, 0.75))
        for ex, m in zip(["certain", "possible ou", "impossible ?"], trio):
            self.au_mot(ex)
            self.play(GrowFromCenter(m), run_time=0.25)
        self.au_mot("Faire 4")
        q2 = self.faire(4, font_size=66).move_to(P(2.8, -0.5))
        q2.add(self.t("?", 60).next_to(q2, RIGHT, buff=0.2))
        self.play(FadeIn(q2, shift=LEFT * 0.2), run_time=0.4)
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=40)))
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("07b-correction")
        self.titre_ecran("Correction")
        fond, faces = carte_de(self.DE_C, 1.15, 1.4)
        self.add(fond, faces)
        self.au_mot("Faire 7 : impossible")
        r1 = VGroup(self.faire(7, font_size=50), self.t(":", 50), mot("impossible", 44)).arrange(RIGHT, buff=0.25)
        self.caler(r1, P(2.75, 2.0))
        self.play(FadeIn(r1, shift=UP * 0.15), run_time=0.5)
        self.au_mot("pas de 7")
        sept = VGroup(RoundedRectangle(width=1.15, height=1.15, corner_radius=0.16, stroke_color=GREY_B,
                                       stroke_width=3).set_stroke(opacity=0.8),
                      self.t("7", 64, GREY_B))
        sept[1].move_to(sept[0])
        sept.move_to(P(2.75, 0.6))
        self.play(FadeIn(sept, scale=0.6), LaggedStart(*[Indicate(f[1], color=ROUGE_ERREUR, scale_factor=1.3)
                                                         for f in faces], lag_ratio=0.1), run_time=0.9)
        self.play(Create(croix(sept, sw=8)), run_time=0.35)
        self.au_mot("Faire 4 : possible")
        r2 = VGroup(self.faire(4, font_size=50), self.t(":", 50), mot("possible", 44)).arrange(RIGHT, buff=0.25)
        self.caler(r2, P(2.75, -0.85))
        self.play(FadeIn(r2, shift=UP * 0.15), run_time=0.5)
        self.au_mot("une face 4")
        quatre = face_coach(4, 1.15, active=True).move_to(faces[3])
        self.play(ReplacementTransform(faces[3], quatre), run_time=0.4)
        self.insister(quatre, 0.35)
        self.attendre_voix()

    # ── 08 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-finale")
        self.play(Write(self.t("Ce que tu as appris", 48, JAUNE_TITRE).to_edge(UP)))
        acquis = [("Certain :", "certain", "à tous les coups"),
                  ("Impossible :", "impossible", "jamais"),
                  ("Possible :", "possible", "ça peut arriver")]
        lignes = VGroup(*[VGroup(self.coche(taille=0.3), mot(nom, 52), self.t(txt, 54)).arrange(RIGHT, buff=0.4)
                          for _, nom, txt in acquis])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.7).move_to(P(-0.9, 0.4))
        for (ex, _, _), l in zip(acquis, lignes):
            self.au_mot(ex)
            self.play(GrowFromCenter(l[1]), run_time=0.35)
            self.play(FadeIn(l[2], shift=RIGHT * 0.2), Create(l[0]), run_time=0.5)
        self.au_mot("L'épisode 2")
        self.play(Write(self.chute("Épisode 2 : c'est quoi, le hasard ?", color=VERT_OK, font_size=40)))
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_certain()
        self.ecran_impossible()
        self.ecran_possible()
        self.ecran_methode()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="09-abonne")
