# proba_contraire.py
# EleveAI — Maths 3e — Probabilités, épisode 6 : l'événement contraire
# (micro : proba_evenement_contraire), AVEC VOIX. Paysage ceinture VERTE.
#
# ⭐ LE DESSIN CLÉ : une BANDE de longueur 1 coupée en « A » (BLEU) et
# « non A » (ORANGE). Elle revient à chaque exemple : le dé (1/6 | 5/6), les
# mots contraires (pair | impair, au moins 3 | moins de 3), la météo
# (70 % | 30 %), le piège (0,2 | 0,8), le défi du sac (3/8 | 5/8).
# Situation : les petits chevaux, un cheval dans l'écurie, il faut un 6.
#
# Voix : manim/voix/3e-proba-contraire.json (débit −7).
# Rendu : python -m manim render -qh --disable_caching manim/scripts/3e/proba_contraire.py ProbaContraire3e -o eleveai-maths-3e-proba-contraire --media_dir manim/scripts/3e/media
# Puis copier le mp4 dans manim/sorties/3e/maths/probabilites/06-contraire/.

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
from annonce_probabilites import BILLE_BLEUE, BILLE_ROUGE, bille, de, de_qui_roule, sac_vide  # noqa: E402

COUL_A = BLEU_CALCUL        # l'événement A
COUL_NON = ORANGE_RETENUE   # son contraire
VERTE = "#16A34A"           # les billes vertes du défi
GRIS_CASE = "#374151"


def P(x, y):
    return np.array([x, y, 0.0])


# ── les dessins communs (paysage et short) ──────────────────────────────────

def bande(p, larg=8.0, haut=0.7, col_a=COUL_A, col_b=COUL_NON):
    """LA bande de longueur 1 : la part A à gauche (p), la part « non A » à droite.

    Renvoie VGroup(part_a, part_b, cadre) ; les parts se remplissent avec
    GrowFromEdge(…, LEFT).
    """
    la = larg * p
    a = Rectangle(width=max(la, 0.001), height=haut, stroke_width=0, fill_color=col_a, fill_opacity=0.9)
    b = Rectangle(width=max(larg - la, 0.001), height=haut, stroke_width=0, fill_color=col_b, fill_opacity=0.9)
    a.move_to(P(-larg / 2 + la / 2, 0))
    b.move_to(P(-larg / 2 + la + (larg - la) / 2, 0))
    cadre = Rectangle(width=larg, height=haut, stroke_color=WHITE, stroke_width=3)
    coupe = Line(P(-larg / 2 + la, -haut / 2), P(-larg / 2 + la, haut / 2), stroke_color=WHITE, stroke_width=3)
    return VGroup(a, b, VGroup(cadre, coupe))


def bande_cases(n, k, larg=8.0, haut=0.7, col_a=COUL_A, col_b=COUL_NON):
    """La bande coupée en n cases égales : k cases A, puis n − k cases « non A ».

    Les cases sont VIDES au départ (gris) ; on les colorie avec set_fill.
    Renvoie (cases, couleurs voulues).
    """
    w = larg / n
    cases = VGroup(*[Rectangle(width=w, height=haut, stroke_color=WHITE, stroke_width=2.5,
                               fill_color=GRIS_CASE, fill_opacity=0.6).move_to(P(-larg / 2 + w * (i + 0.5), 0))
                     for i in range(n)])
    couleurs = [col_a] * k + [col_b] * (n - k)
    return cases, couleurs


def regle_total(objet, texte, font_size=30, dessous=True, color=WHITE):
    """Une règle (trait + deux butées) sous ou sur la bande, avec son total : « 1 », « 100 % »."""
    g, d = objet.get_left(), objet.get_right()
    dy = -(objet.height / 2 + 0.22) if dessous else (objet.height / 2 + 0.22)
    y = objet.get_center()[1] + dy
    trait = Line(P(g[0], y), P(d[0], y), stroke_width=3, color=color)
    butees = VGroup(Line(P(g[0], y - 0.12), P(g[0], y + 0.12), stroke_width=3, color=color),
                    Line(P(d[0], y - 0.12), P(d[0], y + 0.12), stroke_width=3, color=color))
    lbl = Text(texte, font_size=font_size, color=color)
    lbl.next_to(trait, DOWN if dessous else UP, buff=0.1)
    fond = BackgroundRectangle(lbl, color=BLACK, fill_opacity=1, buff=0.06)
    return VGroup(trait, butees, fond, lbl)


def nuage(s=1.0):
    return VGroup(*[Circle(radius=r, fill_color="#9CA3AF", fill_opacity=1, stroke_width=0).move_to(P(x, y))
                    for x, y, r in [(-0.55, 0.0, 0.38), (0.0, 0.22, 0.52), (0.55, 0.0, 0.38),
                                    (-0.2, -0.12, 0.32), (0.25, -0.12, 0.32)]]).scale(s)


def gouttes_qui_tombent(centre, larg=1.3, haut=1.1, n=9, s=1.0):
    """Des gouttes qui tombent SANS FIN sous le nuage (updater)."""
    xs = np.linspace(-larg / 2, larg / 2, n)
    phases = [(i * 0.37) % 1.0 for i in range(n)]
    etat = {"t": 0.0}

    def faire():
        g = VGroup()
        for x, ph in zip(xs, phases):
            f = (etat["t"] * 1.3 + ph) % 1.0
            y = -f * haut
            g.add(Line(centre + P(x, y), centre + P(x - 0.06 * s, y - 0.22 * s), color=BLEU_CALCUL,
                       stroke_width=4 * s))
        return g

    holder = faire()

    # ⛔ 20/10 : `become` et non remove/add (l'ancien enfant restait dessiné sous le nouveau pendant un `play`).
    def maj(m, dt):
        etat["t"] += dt
        m.become(faire())

    holder.add_updater(maj)
    return holder


def soleil(r=0.5):
    """Un soleil dont les rayons tournent doucement (updater)."""
    disque = Circle(radius=r, fill_color=JAUNE_TITRE, fill_opacity=1, stroke_color=ORANGE_RETENUE, stroke_width=3)
    rayons = VGroup(*[Line(P(0, r * 1.25), P(0, r * 1.7), stroke_width=5, color=JAUNE_TITRE)
                      .rotate(k * TAU / 10, about_point=ORIGIN) for k in range(10)])
    rayons.add_updater(lambda m, dt: m.rotate(0.6 * dt, about_point=disque.get_center()))
    return VGroup(rayons, disque)


def cheval(couleur=VERTE, h=0.7):
    """Un cheval des petits chevaux (silhouette de cavalier)."""
    pts = [(-0.4, -0.5), (0.4, -0.5), (0.4, -0.38), (0.25, -0.3), (0.3, 0.1), (0.33, 0.35), (0.15, 0.52),
           (-0.02, 0.6), (-0.1, 0.48), (-0.3, 0.38), (-0.45, 0.18), (-0.42, 0.06), (-0.15, 0.12),
           (-0.25, -0.3), (-0.4, -0.38)]
    corps = Polygon(*[P(x, y) for x, y in pts], fill_color=couleur, fill_opacity=1, stroke_color=WHITE,
                    stroke_width=3)
    oeil = Dot(P(0.0, 0.36), radius=0.045, color=WHITE)
    return VGroup(corps, oeil).scale(h)


COUL_ECURIES = {(0, 0): VERTE, (6, 0): "#EAB308", (0, 6): "#DC2626", (6, 6): "#2563EB"}


def plateau(centre, cote=3.6):
    """Le plateau des petits chevaux : 9 × 9 cases, quatre écuries, le centre."""
    c = cote / 9
    x0, y0 = centre[0] - cote / 2, centre[1] - cote / 2

    def pc(i, j):
        return P(x0 + c * (i + 0.5), y0 + c * (j + 0.5))

    g = VGroup()
    fond = Square(cote, fill_color="#F5F5DC", fill_opacity=0.15, stroke_color=WHITE, stroke_width=3).move_to(centre)
    g.add(fond)
    for (i0, j0), coul in COUL_ECURIES.items():
        e = Square(3 * c, fill_color=coul, fill_opacity=0.75, stroke_color=WHITE, stroke_width=2)
        e.move_to(pc(i0 + 1, j0 + 1))
        g.add(e, Circle(radius=c * 1.05, stroke_color=WHITE, stroke_width=2).move_to(e))
    for i in range(9):
        for j in range(9):
            if (3 <= i <= 5) != (3 <= j <= 5):
                coul = None
                if (i, j) == (0, 3):
                    coul = VERTE
                elif (i, j) == (5, 0):
                    coul = "#EAB308"
                elif (i, j) == (8, 5):
                    coul = "#2563EB"
                elif (i, j) == (3, 8):
                    coul = "#DC2626"
                sq = Square(c, stroke_color=WHITE, stroke_width=1.5).move_to(pc(i, j))
                if coul:
                    sq.set_fill(coul, 0.9)
                g.add(sq)
    m = pc(4, 4)
    for k, coul in enumerate([VERTE, "#DC2626", "#2563EB", "#EAB308"]):
        ang = PI + k * (-PI / 2)
        tri = Polygon(m, m + 1.5 * c * np.array([math.cos(ang + PI / 4), math.sin(ang + PI / 4), 0]) * math.sqrt(2),
                      m + 1.5 * c * np.array([math.cos(ang - PI / 4), math.sin(ang - PI / 4), 0]) * math.sqrt(2),
                      fill_color=coul, fill_opacity=0.85, stroke_color=WHITE, stroke_width=1.5)
        g.add(tri)
    return g, pc


class Notion3e(Notion6e):
    identite = "Maths 3e — EleveAI"


class ProbaContraire3e(Notion3e):
    nom_voix = "3e-proba-contraire"

    def t(self, texte, font_size=36, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def ligne(self, morceaux, font_size=40, buff=0.22):
        return VGroup(*[self.t(m, font_size, c) for m, c in morceaux]).arrange(RIGHT, buff=buff)

    def insister(self, mob, run_time=0.45, bord=LEFT):
        """Agrandir puis rétrécir, ancré sur un bord pour ne pas mordre le voisin de gauche."""
        self.play(mob.animate.scale(1.5, about_edge=bord), run_time=run_time)
        self.play(mob.animate.scale(1 / 1.5, about_edge=bord), run_time=run_time)

    def barrer(self, mob, color=ROUGE_ERREUR):
        return Line(mob.get_corner(DL) + LEFT * 0.08, mob.get_corner(UR) + RIGHT * 0.08,
                    stroke_width=6, color=color)

    def dans(self, part, texte, font_size=30, color=BLACK):
        lbl = self.t(texte, font_size, color)
        if lbl.width > part.width - 0.1:
            lbl.scale_to_fit_width(max(part.width - 0.1, 0.2))
        return lbl.move_to(part)

    def remplir(self, b, i, run_time=0.8):
        """Remplit la part i de la bande, puis remet le cadre par-dessus."""
        self.play(GrowFromEdge(b[i], LEFT), run_time=run_time)
        self.add(b[2])

    def carte(self, lignes, couleur, larg=3.0, haut=1.2):
        fond = RoundedRectangle(width=larg, height=haut, corner_radius=0.15, fill_color=couleur,
                                fill_opacity=0.25, stroke_color=couleur, stroke_width=4)
        txt = VGroup(*[self.t(l, 30) for l in lignes]).arrange(DOWN, buff=0.08)
        if txt.width > larg - 0.2:
            txt.scale_to_fit_width(larg - 0.2)
        return VGroup(fond, txt.move_to(fond))

    def dos_de_carte(self, larg=3.0, haut=1.2):
        fond = RoundedRectangle(width=larg, height=haut, corner_radius=0.15, fill_color="#4B5563",
                                fill_opacity=1, stroke_color=WHITE, stroke_width=3)
        return VGroup(fond, self.t("?", 44).move_to(fond))

    def retourner(self, dos, face):
        """La carte se retourne : le dos s'aplatit, la face s'ouvre."""
        face.move_to(dos)
        cible = face.copy()
        face.stretch(0.02, 0)
        self.play(dos.animate.stretch(0.02, 0), run_time=0.25)
        self.remove(dos)
        self.add(face)
        self.play(Transform(face, cible), run_time=0.3)

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("L'événement contraire", 56, JAUNE_TITRE).to_edge(UP, buff=0.7)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.25)
        ech = echelle_ceintures("verte").move_to(P(-0.6, -2.5))
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech))
        b = bande(1 / 3, 8.0, 0.8).move_to(P(-0.6, 0.6))
        la = self.dans(b[0], "A", 34)
        lb = self.dans(b[1], "non A", 34)
        self.add(b[2])
        self.remplir(b, 0, 0.6)
        self.play(FadeIn(la), run_time=0.3)
        self.remplir(b, 1, 0.6)
        self.play(FadeIn(lb), run_time=0.3)
        self.au_mot("Le calcul le plus rapide")
        rap = self.t("le calcul le plus rapide", 40, BLEU_CALCUL).move_to(P(-0.6, -0.8))
        self.play(FadeIn(rap, shift=UP * 0.2))
        self.insister(rap, 0.4, ORIGIN)
        self.attendre_voix(marge=1.2)

    # ── 01 : les petits chevaux ─────────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.titre_ecran("Aux petits chevaux")
        pl, pc = plateau(P(-3.7, -0.3), 4.2)
        ch = cheval(VERTE, 0.8).move_to(pc(1, 1))
        self.play(FadeIn(pl), run_time=0.8)
        self.play(FadeIn(ch, shift=DOWN * 0.3), run_time=0.5)
        rou = de_qui_roule(P(1.3, 0.2), 1.5, periode=0.12)
        self.add(rou)
        self.au_mot("il faut un 6")
        self.remove(rou)
        rou.clear_updaters()
        d6 = de(6, 1.5).move_to(P(1.3, 0.2))
        self.add(d6)
        regle = self.ligne([("il faut un", WHITE), ("6", JAUNE_TITRE), ("pour sortir", WHITE)], 36, 0.18)
        regle.move_to(P(1.7, 1.95))
        self.play(FadeIn(regle, shift=DOWN * 0.15), run_time=0.4)
        self.insister(d6, 0.3, ORIGIN)
        self.au_mot("pour sortir")
        self.play(ch.animate(path_arc=-PI / 2).move_to(pc(0, 3)), run_time=0.8)
        self.au_mot("Quelle chance")
        self.play(ch.animate(path_arc=PI / 2).move_to(pc(1, 1)), FadeOut(d6), run_time=0.6)
        rou2 = de_qui_roule(P(1.3, 0.2), 1.5, periode=0.12, faces=[2, 5, 1, 4, 3])
        self.add(rou2)
        q = self.chute("Quelle chance de ne pas sortir ?", color=BLEU_CALCUL, font_size=40)
        self.play(Write(q), run_time=1.0)
        self.wait(0.6)
        rou2.clear_updaters()
        self.attendre_voix(marge=0.8)

    # ── 02 : le calcul ──────────────────────────────────────────────────────

    def ecran_calcul(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-calcul")
        self.titre_ecran("Faire 6, ou ne pas faire 6")
        des = VGroup(*[de(f, 0.85) for f in range(1, 7)]).arrange(RIGHT, buff=0.3).move_to(P(-0.6, 1.9))
        self.play(LaggedStart(*[FadeIn(d, shift=DOWN * 0.2) for d in des], lag_ratio=0.15), run_time=1.0)
        self.au_mot("c'est le contraire de faire 6")
        six, autres = des[5], des[:5]
        self.play(six.animate.move_to(P(-4.85, 1.9)),
                  autres.animate.arrange(RIGHT, buff=0.25).move_to(P(-0.4, 1.9)), run_time=0.8)
        c6 = SurroundingRectangle(six, color=COUL_A, buff=0.15, stroke_width=4)
        cn = SurroundingRectangle(autres, color=COUL_NON, buff=0.15, stroke_width=4)
        l6 = self.t("faire 6", 30, COUL_A).next_to(c6, DOWN, buff=0.15)
        ln = self.t("ne pas faire 6", 30, COUL_NON).next_to(cn, DOWN, buff=0.15)
        self.play(Create(c6), FadeIn(l6), Create(cn), FadeIn(ln), run_time=0.7)

        b = bande(1 / 6, 9.0, 0.7).move_to(P(-1.1, -1.55))
        self.au_mot("Faire 6 : 1 chance")
        f6 = self.t("1/6", 48, COUL_A).move_to(P(-4.85, 0.05))
        self.add(b[2])
        self.play(FadeIn(f6, shift=UP * 0.15), run_time=0.4)
        self.remplir(b, 0, 0.5)
        self.play(FadeIn(self.dans(b[0], "1/6", 30)), run_time=0.3)
        self.au_mot("Ne pas faire 6 : 1 moins")
        calc = self.t("1 − 1/6", 48, COUL_NON).move_to(P(-1.0, 0.05))
        self.play(Write(calc), run_time=0.7)
        self.au_mot("c'est 5 sur 6")
        res = self.t("= 5/6", 48, COUL_NON).next_to(calc, RIGHT, buff=0.55)
        self.play(Write(res), run_time=0.5)
        self.remplir(b, 1, 0.6)
        self.play(FadeIn(self.dans(b[1], "5/6", 30)), FadeIn(regle_total(b, "1", 34)), run_time=0.4)
        self.insister(res, 0.4)
        self.attendre_voix()

    # ── 03 : la règle ───────────────────────────────────────────────────────

    def ecran_regle(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-regle")
        self.titre_ecran("La règle")
        f = self.ligne([("p(non A)", COUL_NON), ("=", WHITE), ("1", WHITE), ("−", WHITE), ("p(A)", COUL_A)], 60, 0.25)
        f.move_to(P(-0.6, 1.85))
        self.au_mot("la probabilité du contraire de A")
        self.play(Write(f[0]), run_time=0.7)
        self.au_mot("c'est 1 moins")
        self.play(Write(f[1:4]), run_time=0.6)
        self.au_mot("la probabilité de A.")
        self.play(Write(f[4]), run_time=0.5)
        cadre = SurroundingRectangle(f, color=JAUNE_TITRE, buff=0.2, stroke_width=4)
        self.play(Create(cadre), run_time=0.5)

        self.au_mot("A et son contraire")
        b = bande(0.35, 9.0, 0.8).move_to(P(-0.6, -0.35))
        self.add(b[2])
        self.remplir(b, 0, 0.6)
        self.play(FadeIn(self.dans(b[0], "A", 34)), run_time=0.3)
        self.remplir(b, 1, 0.6)
        self.play(FadeIn(self.dans(b[1], "non A", 34)), run_time=0.3)
        self.au_mot("toutes les issues")
        tot = regle_total(b, "1", 36, dessous=False)
        self.play(FadeIn(tot), Indicate(b[2], color=WHITE, scale_factor=1.05), run_time=0.6)
        self.au_mot("leurs probabilités font 1")
        s = self.ligne([("p(A)", COUL_A), ("+", WHITE), ("p(non A)", COUL_NON), ("=", WHITE), ("1", VERT_OK)], 44, 0.2)
        s.move_to(P(-0.6, -1.95))
        self.play(Write(s), run_time=0.8)
        self.insister(s[4], 0.4)
        self.attendre_voix()

    # ── 04 : bien écrire le contraire ───────────────────────────────────────

    def rangee(self, y, faces_a, faces_non, lignes_a, lignes_non, extrait_a, extrait_non, avant=None):
        carte_a = self.carte(lignes_a, COUL_A).move_to(P(-5.0, y))
        dos = self.dos_de_carte().move_to(P(-1.8, y))
        carte_n = self.carte(lignes_non, COUL_NON)
        ordre = faces_a + faces_non
        cases, couls = bande_cases(6, len(faces_a), 4.2, 0.75)
        cases.move_to(P(2.35, y))
        des = VGroup(*[de(f, 0.5).move_to(c) for f, c in zip(ordre, cases)])
        self.au_mot(extrait_a)
        if avant is not None:
            avant.clear_updaters()
            self.play(FadeOut(avant, scale=0.5), run_time=0.3)
        self.play(FadeIn(carte_a, shift=RIGHT * 0.2), FadeIn(dos), FadeIn(cases), FadeIn(des), run_time=0.6)
        self.play(*[c.animate.set_fill(k, 0.9) for c, k in zip(cases[:len(faces_a)], couls)], run_time=0.5)
        self.au_mot(extrait_non)
        self.retourner(dos, carte_n)
        self.play(*[c.animate.set_fill(k, 0.9) for c, k in
                    zip(cases[len(faces_a):], couls[len(faces_a):])], run_time=0.5)
        coupe = Line(cases[len(faces_a)].get_corner(UL) + UP * 0.12, cases[len(faces_a)].get_corner(DL) + DOWN * 0.12,
                     stroke_width=6, color=WHITE)
        self.play(Create(coupe), Indicate(carte_n, color=COUL_NON, scale_factor=1.1), run_time=0.5)

    def ecran_mots(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-mots")
        rou = de_qui_roule(P(-0.6, 0.4), 1.8, periode=0.18)
        self.add(rou)
        self.titre_ecran("Bien écrire le contraire")
        self.au_mot("c'est la moitié du travail")
        self.play(Write(self.chute("Bien écrire le contraire : la moitié du travail !",
                                   color=BLEU_CALCUL, font_size=34)), run_time=0.9)
        self.rangee(1.55, [2, 4, 6], [1, 3, 5], ["obtenir un", "nombre pair"], ["obtenir un", "nombre impair"],
                    "obtenir un nombre pair", "obtenir un nombre impair", avant=rou)
        self.rangee(-0.95, [3, 4, 5, 6], [1, 2], ["au moins 3"], ["moins de 3"], "au moins 3", "moins de 3")
        self.attendre_voix()

    # ── 05 : en pourcentage ─────────────────────────────────────────────────

    def ecran_pourcentage(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-pourcentage")
        self.titre_ecran("Avec des pourcentages")
        nu = nuage(1.2).move_to(P(-4.3, 1.75))
        pluie = gouttes_qui_tombent(P(-4.3, 1.3), 1.4, 1.1, 9)
        self.play(FadeIn(nu, shift=DOWN * 0.2), run_time=0.6)
        b = bande(0.7, 9.0, 0.75).move_to(P(-1.1, -1.55))
        self.au_mot("70 pour cent")
        self.add(pluie)
        l70 = self.ligne([("pluie :", COUL_A), ("70 %", COUL_A)], 42, 0.2).move_to(P(1.5, 1.85))
        self.add(b[2])
        self.play(FadeIn(l70, shift=LEFT * 0.2), run_time=0.5)
        self.remplir(b, 0, 0.7)
        self.play(FadeIn(self.dans(b[0], "pluie : 70 %", 30)), run_time=0.3)
        self.au_mot("qu'il ne pleuve pas")
        so = soleil(0.5).move_to(P(-1.6, 1.75))
        lsec = self.ligne([("pas de pluie :", COUL_NON), ("?", COUL_NON)], 42, 0.2).move_to(P(1.5, 1.0))
        self.play(FadeIn(so, scale=0.5), FadeIn(lsec, shift=LEFT * 0.2), run_time=0.6)
        self.au_mot("100 moins 70")
        calc = self.t("100 % − 70 %", 46, WHITE).move_to(P(-1.0, -0.25))
        self.play(Write(calc), run_time=0.8)
        self.au_mot("30 pour cent")
        res = self.t("= 30 %", 46, COUL_NON).next_to(calc, RIGHT, buff=0.3)
        trente = self.t("30 %", 42, COUL_NON).move_to(lsec[1], aligned_edge=LEFT)
        self.play(Write(res), Transform(lsec[1], trente), run_time=0.6)
        self.remplir(b, 1, 0.5)
        self.play(FadeIn(self.dans(b[1], "sec : 30 %", 30)), FadeIn(regle_total(b, "100 %", 32)), run_time=0.4)
        self.insister(res, 0.4)
        self.attendre_voix()
        pluie.clear_updaters()
        so[0].clear_updaters()

    # ── 06 : le piège ───────────────────────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-piege")
        self.titre_ecran("Le piège")
        self.au_mot("oublier le 1 moins")
        self.play(Write(self.chute("Ne pas oublier le « 1 − » !", color=ROUGE_ERREUR, font_size=38)), run_time=0.7)
        roue = self.disque(5, 1, rayon=1.25, couleur=COUL_A, vide=COUL_NON).move_to(P(-4.6, 0.55))
        for s in roue[1:]:
            s.set_fill(COUL_NON, 0.85)
        fleche = Triangle(fill_color=WHITE, fill_opacity=1, stroke_width=0).scale(0.18).rotate(PI)
        fleche.next_to(roue, UP, buff=0.02)
        self.play(FadeIn(roue), FadeIn(fleche), run_time=0.5)
        roue.add_updater(lambda m, dt: m.rotate(-2.0 * dt))
        b = bande(0.2, 9.0, 0.75).move_to(P(-1.1, -1.3))
        self.au_mot("Si gagner a une probabilité de 0,2")
        g = self.ligne([("p(gagner)", COUL_A), ("=", WHITE), ("0,2", COUL_A)], 44).move_to(P(1.3, 1.85))
        self.add(b[2])
        self.play(Write(g), run_time=0.7)
        self.remplir(b, 0, 0.4)
        self.play(FadeIn(self.dans(b[0], "0,2", 28)), run_time=0.3)
        self.au_mot("perdre n'a pas 0,2")
        faux = self.ligne([("p(perdre)", ROUGE_ERREUR), ("=", ROUGE_ERREUR), ("0,2", ROUGE_ERREUR)], 44)
        faux.move_to(P(1.3, 0.95))
        self.play(FadeIn(faux), run_time=0.4)
        self.play(Create(self.barrer(faux)), run_time=0.4)
        self.au_mot("mais 1 moins 0,2")
        bon = self.ligne([("p(perdre)", COUL_NON), ("=", WHITE), ("1 − 0,2", WHITE)], 44).move_to(P(0.7, 0.05))
        self.play(Write(bon), run_time=0.8)
        self.au_mot("c'est 0,8")
        r = self.ligne([("=", WHITE), ("0,8", VERT_OK)], 44).next_to(bon, RIGHT, buff=0.22)
        self.play(Write(r), run_time=0.4)
        self.remplir(b, 1, 0.5)
        self.play(FadeIn(self.dans(b[1], "0,8", 30)), FadeIn(regle_total(b, "1", 32)), run_time=0.3)
        self.insister(r[1], 0.4)
        self.attendre_voix()
        roue.clear_updaters()

    # ── 07 : défi ───────────────────────────────────────────────────────────

    def sac_du_defi(self, centre, s=1.0):
        sac = sac_vide(2.3, 2.1).scale(s).move_to(centre)
        couls = [VERTE] * 3 + [BILLE_ROUGE, BILLE_BLEUE, BILLE_ROUGE, BILLE_BLEUE, BILLE_ROUGE]
        pos = [(-0.6, -0.65), (0.0, -0.7), (0.6, -0.6), (-0.3, -0.15), (0.3, -0.1),
               (-0.75, -0.15), (0.75, -0.1), (0.0, 0.35)]
        billes = VGroup(*[bille(c, 0.25 * s).move_to(centre + P(x * s, y * s)) for c, (x, y) in zip(couls, pos)])
        bases = [b.get_center() for b in billes]
        horloge = {"t": 0.0}

        def secoue(g, dt):
            horloge["t"] += dt
            tt = horloge["t"]
            for i, (b, p) in enumerate(zip(g, bases)):
                b.move_to(p + P(0.07 * s * math.sin(tt * 6 + i * 1.7), 0.08 * s * abs(math.sin(tt * 5 + i * 2.3))))

        billes.add_updater(secoue)
        return sac, billes

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        self.au_mot("Dans un sac")
        sac, billes = self.sac_du_defi(P(-4.6, 0.7), 1.2)
        self.play(FadeIn(sac), FadeIn(billes), run_time=0.6)
        cases, couls = bande_cases(8, 3, 8.0, 0.75, col_a=VERTE)
        cases.move_to(P(-1.1, -1.25))
        self.au_mot("une bille verte est 3 sur 8")
        v = self.ligne([("p(verte)", VERTE), ("=", WHITE), ("3/8", VERTE)], 46).move_to(P(1.5, 1.5))
        self.play(Write(v), FadeIn(cases), run_time=0.8)
        self.play(*[c.animate.set_fill(VERTE, 0.9) for c in cases[:3]], run_time=0.5)
        self.au_mot("de ne pas tirer une bille verte")
        n = self.ligne([("p(non verte)", COUL_NON), ("=", WHITE), ("?", COUL_NON)], 46).move_to(P(1.5, 0.5))
        q = self.t("?", 40, COUL_NON).move_to(cases[3:])
        self.play(Write(n), FadeIn(q), run_time=0.7)
        self.insister(n[2], 0.4)
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=40)))
        self.attendre_voix(marge=2.0)
        billes.clear_updaters()

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("07b-correction")
        self.titre_ecran("Correction")
        sac, billes = self.sac_du_defi(P(-5.0, 1.0), 0.8)
        self.add(sac, billes)
        cases, couls = bande_cases(8, 3, 8.0, 0.75, col_a=VERTE)
        cases.move_to(P(-1.1, -1.5))
        self.au_mot("1 moins 3 sur 8")
        l1 = self.t("1 − 3/8", 50).move_to(P(0.2, 1.75))
        self.play(Write(l1), FadeIn(cases), run_time=0.7)
        self.au_mot("8 sur 8 moins")
        l2 = self.t("= 8/8 − 3/8", 50).next_to(l1, DOWN, buff=0.35, aligned_edge=LEFT)
        tot = regle_total(cases, "8/8", 32)
        self.play(Write(l2), FadeIn(tot), *[c.animate.set_fill(WHITE, 0.35) for c in cases], run_time=0.8)
        self.play(*[c.animate.set_fill(VERTE, 0.9) for c in cases[:3]], run_time=0.5)
        self.au_mot("5 sur 8.")
        l3 = self.t("= 5/8", 56, VERT_OK).next_to(l2, DOWN, buff=0.35, aligned_edge=LEFT)
        self.play(Write(l3), *[c.animate.set_fill(COUL_NON, 0.9) for c in cases[3:]], run_time=0.7)
        self.play(FadeIn(self.t("5/8", 34, BLACK).move_to(cases[3:])), run_time=0.3)
        self.insister(l3, 0.4)
        self.attendre_voix()
        billes.clear_updaters()

    # ── 08 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)))
        acquis = [
            ("La probabilité du contraire", "p(non A) = 1 − p(A)"),
            ("Bien écrire le contraire", "Bien écrire le contraire : la moitié du travail"),
            ("Et ça marche aussi", "Aussi en pourcentage : on part de 100 %"),
        ]
        lignes = VGroup(*[VGroup(self.coche(), self.t(txt, 38)).arrange(RIGHT, buff=0.3) for _, txt in acquis])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.6)
        if lignes.width > 11.5:
            lignes.scale_to_fit_width(11.5)
        lignes.move_to(P(-0.5, 0.7))
        for (mot, _), l in zip(acquis, lignes):
            self.au_mot(mot)
            self.play(FadeIn(l[1], shift=RIGHT * 0.2), run_time=0.6)
            self.play(Create(l[0]), run_time=0.4)
        self.au_mot("L'épisode 7")
        self.play(Write(self.chute("Épisode 7 : deux épreuves", color=VERT_OK, font_size=38)))
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_calcul()
        self.ecran_regle()
        self.ecran_mots()
        self.ecran_pourcentage()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="09-abonne")
