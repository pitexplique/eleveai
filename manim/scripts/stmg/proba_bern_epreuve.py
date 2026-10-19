# proba_bern_epreuve.py
# EleveAI — Maths STMG ET Maths 1re (tronc commun) — série « Probabilités » :
# l'ÉPREUVE DE BERNOULLI : deux issues, succès ou échec (micros :
# va_bern_reconnaitre en STMG, alea_bern_epreuve en 1re), AVEC VOIX.
# Paysage 16:9, CEINTURE BLEUE. Short jumeau : proba_bern_epreuve_short.py
# (ceinture jaune, un dé qui devient « pile ou face » : 6 / pas 6).
#
# ⭐⭐ UNE voix, UN script, DEUX rendus (Frédéric, 18/10 : « pour vendre en
# pack ») : ProbaBernEpreuveBase porte toutes les scènes ; les deux
# sous-classes ne changent que l'identité. La voix ne cite aucune classe.
#
# ⭐ Les deux banques n'ont pas de canvas pour cette micro (QCM « Bernoulli ou
# non ? », p et 1 − p) : la figure est la petite BRANCHE DOUBLE de l'arbre
# pondéré du coach (carte blanche, branches grises, probabilités en bleu),
# S 0,7 / S barre 0,3, posée QUAND la voix dit le nombre.
#
# Écrans : 00 garde · 01 le lancer franc (0,7) · 02 deux issues : panier
# réussi = succès S (vert), raté = échec S barre (rouge) · 03 p = 0,7,
# 1 − 0,7 = 0,3, « épreuve de Bernoulli de paramètre p » · 04 trois
# mini-exemples (client, graine, dé : 1 chance sur 6) · 05 le piège : un dé à
# six faces, les faces 1 à 5 se regroupent en « pas 6 » · 06 défi (32 cartes,
# un cœur ?) · 06b correction (les 8 cœurs ressortent, 8 / 32 = 0,25, échec
# 0,75) · 07 ce que tu as appris · 08 fin (« Entraîne-toi sur eleveai.fr »,
# « Abonne-toi ! @eleveai974 »).
#
# Voix : manim/voix/stmg-premiere-proba-bern-epreuve.json (débit −7).
# Rendus (depuis la racine du dépôt ; media à soi, sinon WinError 32) :
# python -m manim render -qh --disable_caching manim/scripts/stmg/proba_bern_epreuve.py ProbaBernEpreuveSTMG -o eleveai-maths-stmg-proba-bern-epreuve --media_dir manim/scripts/stmg/media-bern_epreuve
# python -m manim render -qh --disable_caching manim/scripts/stmg/proba_bern_epreuve.py ProbaBernEpreuvePremiere -o eleveai-maths-premiere-commun-proba-bern-epreuve --media_dir manim/scripts/stmg/media-bern_epreuve
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/proba_bern_epreuve_short.py ShortProbaBernEpreuve -o eleveai-maths-stmg-proba-bern-epreuve-short --media_dir manim/scripts/stmg/media-bern_epreuve
# (le short n'affiche aucune classe : un seul rendu, copié sous les deux noms,
#  …-stmg-…-short.mp4 et …-premiere-commun-…-short.mp4)
# Puis copier dans manim/sorties/stmg/maths/probabilites/18-bern-epreuve/ et
# manim/sorties/premiere-commun/maths/probabilites/18-bern-epreuve/.

import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "seconde"))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "premiere"))

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Notion6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402
from proba_pc_conditionnelle import BORD, BRANCHE, ENCRE, PROBA, frac, lettre, suite  # noqa: E402

SUCCES = "#22C55E"      # la case « succès S »
ECHEC = "#EF4444"       # la case « échec S barre »
BALLON = "#EA580C"
CERCEAU = "#F97316"
COEUR = "#DC2626"


def P(x, y):
    return np.array([x, y, 0.0])


# ── les dessins ─────────────────────────────────────────────────────────────

def ballon(r=0.32):
    """Un ballon de basket : disque orange et ses coutures noires."""
    d = Circle(radius=r, fill_color=BALLON, fill_opacity=1, stroke_color="#7C2D12", stroke_width=2)
    c1 = Line(P(-r, 0), P(r, 0), color="#1C1917", stroke_width=2)
    c2 = Line(P(0, -r), P(0, r), color="#1C1917", stroke_width=2)
    c3 = Arc(radius=r * 0.85, start_angle=-PI / 3, angle=2 * PI / 3, color="#1C1917", stroke_width=2)
    c3.move_to(P(-r * 0.55, 0))
    c4 = Arc(radius=r * 0.85, start_angle=2 * PI / 3, angle=2 * PI / 3, color="#1C1917", stroke_width=2)
    c4.move_to(P(r * 0.55, 0))
    return VGroup(d, c1, c2, c3, c4)


class Panier(VGroup):
    """Poteau, planche blanche, cerceau orange et filet. `self.cerceau` : le
    centre du cercle, là où le ballon passe."""

    def __init__(self, s=1.0, **kw):
        super().__init__(**kw)
        poteau = Rectangle(width=0.16, height=3.2, fill_color="#94A3B8", fill_opacity=1, stroke_width=0)
        poteau.move_to(P(0.95, -1.0))
        bras = Rectangle(width=0.6, height=0.12, fill_color="#94A3B8", fill_opacity=1, stroke_width=0)
        bras.move_to(P(0.7, 0.75))
        planche = Rectangle(width=0.16, height=1.5, fill_color=WHITE, fill_opacity=1, stroke_color="#CBD5E1",
                            stroke_width=2).move_to(P(0.35, 0.95))
        anneau = Ellipse(width=0.9, height=0.2, stroke_color=CERCEAU, stroke_width=6).move_to(P(-0.18, 0.45))
        filet = VGroup()
        for k in range(5):
            x = -0.58 + 0.2 * k
            filet.add(Line(P(x, 0.43), P(-0.18 + (x + 0.18) * 0.55, -0.15), color=WHITE, stroke_width=2))
        filet.add(Line(P(-0.52, 0.2), P(0.16, 0.2), color=WHITE, stroke_width=1.5),
                  Line(P(-0.42, 0.0), P(0.06, 0.0), color=WHITE, stroke_width=1.5))
        self.add(poteau, bras, planche, filet, anneau)
        self.scale(s)
        self.anneau = anneau

    @property
    def cerceau(self):
        return self.anneau.get_center()


def case_issue(mot, barre, couleur, fs=34, larg=3.0):
    """« succès S » / « échec S barre » : une case pleine, verte ou rouge."""
    g = suite(Text(mot, font_size=fs, color=WHITE, weight=BOLD), lettre("S", fs + 8, WHITE, barre), buff=0.25)
    fond = RoundedRectangle(width=max(larg, g.width + 0.5), height=g.height + 0.45, corner_radius=0.15,
                            fill_color=couleur, fill_opacity=0.9, stroke_color=WHITE, stroke_width=2)
    return VGroup(fond, g.move_to(fond))


PIPS = {1: [(0, 0)], 2: [(-1, 1), (1, -1)], 3: [(-1, 1), (0, 0), (1, -1)],
        4: [(-1, 1), (1, 1), (-1, -1), (1, -1)], 5: [(-1, 1), (1, 1), (0, 0), (-1, -1), (1, -1)],
        6: [(-1, 1), (1, 1), (-1, 0), (1, 0), (-1, -1), (1, -1)]}


def de(face=6, c=0.8, fond=WHITE, point=ENCRE):
    """Un dé vu de face : carré arrondi blanc et ses points."""
    carre = RoundedRectangle(width=c, height=c, corner_radius=c * 0.16, fill_color=fond, fill_opacity=1,
                             stroke_color="#94A3B8", stroke_width=2)
    pts = VGroup(*[Dot(P(x * c * 0.27, y * c * 0.27), radius=c * 0.085, color=point) for x, y in PIPS[face]])
    return VGroup(carre, pts)


def client(s=1.0):
    """Une silhouette et son sac de courses."""
    tete = Circle(radius=0.22, fill_color="#FBBF24", fill_opacity=1, stroke_width=0).move_to(P(0, 0.62))
    corps = RoundedRectangle(width=0.62, height=0.8, corner_radius=0.2, fill_color=BLEU_CALCUL, fill_opacity=1,
                             stroke_width=0).move_to(P(0, -0.05))
    sac = RoundedRectangle(width=0.42, height=0.46, corner_radius=0.06, fill_color="#F59E0B", fill_opacity=1,
                           stroke_color=WHITE, stroke_width=1.5).move_to(P(0.55, -0.25))
    anse = Arc(radius=0.12, start_angle=0, angle=PI, color=WHITE, stroke_width=3).move_to(P(0.55, 0.06))
    return VGroup(tete, corps, sac, anse).scale(s)


def graine(s=1.0):
    """Un peu de terre, une graine, une pousse à deux feuilles."""
    terre = Ellipse(width=1.3, height=0.32, fill_color="#92400E", fill_opacity=1, stroke_width=0).move_to(P(0, -0.45))
    gr = Ellipse(width=0.3, height=0.2, fill_color="#FDE68A", fill_opacity=1, stroke_width=0).move_to(P(0, -0.4))
    tige = Line(P(0, -0.35), P(0, 0.35), color=SUCCES, stroke_width=5)
    f1 = Ellipse(width=0.42, height=0.2, fill_color=SUCCES, fill_opacity=1, stroke_width=0).rotate(0.5)
    f1.move_to(P(-0.2, 0.3))
    f2 = f1.copy().rotate(-1.0).move_to(P(0.2, 0.42))
    return VGroup(terre, gr, tige, f1, f2).scale(s)


def carte_jeu(coeur=False, s=1.0):
    """Une carte à jouer, dos bleu ou cœur rouge sur fond blanc (aucun rang écrit)."""
    c = RoundedRectangle(width=0.5, height=0.7, corner_radius=0.06, fill_color=WHITE, fill_opacity=1,
                         stroke_color="#94A3B8", stroke_width=1.5)
    if coeur:
        sym = coeur_dessin(0.16, COEUR).move_to(c)
    else:
        sym = VGroup()
    return VGroup(c, sym).scale(s)


def coeur_dessin(r=0.2, couleur=COEUR):
    """Un cœur DESSINÉ (deux disques et un triangle) : pas de glyphe."""
    g = Circle(radius=r, fill_color=couleur, fill_opacity=1, stroke_width=0).move_to(P(-r * 0.72, r * 0.35))
    d = Circle(radius=r, fill_color=couleur, fill_opacity=1, stroke_width=0).move_to(P(r * 0.72, r * 0.35))
    t = Polygon(P(-r * 1.62, r * 0.05), P(r * 1.62, r * 0.05), P(0, -r * 1.75), fill_color=couleur,
                fill_opacity=1, stroke_width=0)
    return VGroup(g, d, t)


def couleur_dessin(k, r=0.15):
    """Les quatre couleurs du jeu, dessinées : 0 cœur, 1 carreau, 2 trèfle, 3 pique."""
    if k == 0:
        return coeur_dessin(r, COEUR)
    if k == 1:
        return Square(side_length=r * 2.0, fill_color=COEUR, fill_opacity=1, stroke_width=0).rotate(PI / 4)
    if k == 2:
        b = VGroup(*[Circle(radius=r * 0.62, fill_color=ENCRE, fill_opacity=1, stroke_width=0).move_to(P(x, y))
                     for x, y in ((0, r * 0.6), (-r * 0.6, -r * 0.1), (r * 0.6, -r * 0.1))])
        b.add(Polygon(P(0, -0.1 * r), P(-r * 0.4, -r * 1.3), P(r * 0.4, -r * 1.3), fill_color=ENCRE,
                      fill_opacity=1, stroke_width=0))
        return b
    p = coeur_dessin(r, ENCRE).rotate(PI)
    p.add(Polygon(P(0, -0.2 * r), P(-r * 0.45, -r * 1.5), P(r * 0.45, -r * 1.5), fill_color=ENCRE,
                  fill_opacity=1, stroke_width=0).shift(DOWN * r * 0.1))
    return p


def carte_couleur(k, s=1.0):
    c = RoundedRectangle(width=0.5, height=0.7, corner_radius=0.06, fill_color=WHITE, fill_opacity=1,
                         stroke_color="#94A3B8", stroke_width=1.5)
    return VGroup(c, couleur_dessin(k).move_to(c)).scale(s)


# ── la BRANCHE DOUBLE de l'arbre pondéré du coach ───────────────────────────

class BrancheDouble(VGroup):
    """Carte blanche : départ, branche 0 → S (haut), branche 1 → S barre (bas)."""

    def __init__(self, dx=2.4, dy=1.0, fs=34, **kw):
        super().__init__(**kw)
        racine = P(0, 0)
        bouts = [P(dx, dy), P(dx, -dy)]
        self.branches = [Line(racine, b, color=BRANCHE, stroke_width=4) for b in bouts]
        self.depart = Dot(racine, radius=0.07, color=ENCRE)
        self.lab = [lettre("S", fs, SUCCES, False).next_to(bouts[0], RIGHT, buff=0.14),
                    lettre("S", fs, ECHEC, True).next_to(bouts[1], RIGHT, buff=0.14)]
        tout = VGroup(self.depart, *self.branches, *self.lab)
        self.carte = RoundedRectangle(width=tout.width + 1.3, height=tout.height + 1.2, corner_radius=0.2,
                                      fill_color=WHITE, fill_opacity=1, stroke_color=BORD, stroke_width=2)
        self.carte.move_to(tout).shift(UP * 0.25)
        self.titre = Text("Arbre pondéré", font_size=22, color=ENCRE, weight=BOLD)
        self.titre.next_to(self.carte.get_top(), DOWN, buff=0.14)
        self.nombres = {}
        self.add(self.carte, self.titre, *self.branches, self.depart, *self.lab)

    def socle(self):
        return VGroup(self.carte, self.titre, self.depart)

    def nombre(self, k, texte, fs=30, buff=0.1):
        """Le nombre de la branche k, en bleu, du côté extérieur du trait."""
        t = Text(texte, font_size=fs, color=PROBA, weight=BOLD)
        u, v = self.branches[k].get_start(), self.branches[k].get_end()
        d = v - u
        n = np.array([-d[1], d[0], 0.0])
        n = n / np.linalg.norm(n)
        if (k == 0 and n[1] < 0) or (k == 1 and n[1] > 0):
            n = -n
        demi = abs(n[0]) * t.width / 2 + abs(n[1]) * t.height / 2
        t.move_to((u + v) / 2 + n * (demi + buff))
        self.nombres[k] = t
        return t


class ProbaBernEpreuveBase(Notion6e):
    """Toutes les scènes ; les sous-classes ne changent que l'identité."""

    nom_voix = "stmg-premiere-proba-bern-epreuve"
    identite = "Maths — EleveAI"

    def t(self, texte, font_size=36, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def insister(self, mob, run_time=0.3):
        self.play(mob.animate.scale(1.5), run_time=run_time)
        self.play(mob.animate.scale(1 / 1.5), run_time=run_time)

    def tir(self, b, panier, reussi=True, run_time=1.0):
        """Le ballon part en cloche vers le cerceau ; réussi : il traverse le
        filet ; raté : il tape le cercle et rebondit au loin."""
        c = panier.cerceau
        if reussi:
            arc = ArcBetweenPoints(b.get_center(), c + UP * 0.25, angle=-PI / 2.2)
            self.play(MoveAlongPath(b, arc), Rotate(b, -2 * PI), run_time=run_time,
                      rate_func=rate_functions.linear)
            self.play(b.animate.move_to(c + DOWN * 0.55), run_time=0.3, rate_func=rate_functions.ease_in_quad)
            self.play(b.animate.move_to(c + DOWN * 1.6), run_time=0.3)
        else:
            cible = c + LEFT * 0.42 + UP * 0.2
            arc = ArcBetweenPoints(b.get_center(), cible, angle=-PI / 2.4)
            self.play(MoveAlongPath(b, arc), Rotate(b, -2 * PI), run_time=run_time,
                      rate_func=rate_functions.linear)
            rebond = ArcBetweenPoints(cible, cible + LEFT * 1.4 + DOWN * 1.4, angle=-PI / 1.6)
            self.play(MoveAlongPath(b, rebond), Wiggle(panier.anneau, scale_value=1.15), run_time=0.6)

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("L'épreuve de Bernoulli", 54, JAUNE_TITRE).to_edge(UP, buff=0.55)
        sous = self.t("deux issues : succès ou échec", 40, BLEU_CALCUL).next_to(titre, DOWN, buff=0.2)
        identite = self.t(self.identite, 28).next_to(sous, DOWN, buff=0.22)
        ech = echelle_ceintures("bleue").move_to(P(-0.6, -2.75))
        cs = case_issue("succès", False, SUCCES, 34).move_to(P(-2.6, -0.5))
        ce = case_issue("échec", True, ECHEC, 34).move_to(P(1.4, -0.5))
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech), run_time=1.0)
        self.au_mot("deux issues")
        self.play(FadeIn(sous, shift=UP * 0.15), run_time=0.5)
        self.au_mot("succès")
        self.play(FadeIn(cs, scale=1.4), run_time=0.4)
        self.au_mot("échec")
        self.play(FadeIn(ce, scale=1.4), run_time=0.4)
        self.attendre_voix(marge=1.0)

    # ── 01 : le lancer franc ────────────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.titre_ecran("Le lancer franc")
        pan = Panier(1.25).move_to(P(1.6, -0.15))
        sol = Line(P(-6.5, -2.75), P(4.5, -2.75), color="#475569", stroke_width=4)
        b = ballon(0.3).move_to(P(-4.6, -1.1))
        self.play(FadeIn(sol), FadeIn(pan, shift=LEFT * 0.3), FadeIn(b, shift=UP * 0.3), run_time=0.7)
        self.au_mot("tire un lancer franc")
        self.tir(b, pan, True, 1.0)
        self.play(FadeOut(b), run_time=0.2)
        self.au_mot("Elle le réussit")
        l1 = self.t("Réussir le lancer :", 36).move_to(P(-3.6, 1.6))
        self.play(FadeIn(l1, shift=UP * 0.15), run_time=0.5)
        self.au_mot("0,7")
        v = self.t("0,7", 64, JAUNE_TITRE).next_to(l1, DOWN, buff=0.3)
        self.play(FadeIn(v, scale=1.8), run_time=0.4)
        self.insister(v)
        self.attendre_voix()

    # ── 02 : deux issues : succès S, échec S barre ──────────────────────────

    def ecran_deux(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-deux")
        self.titre_ecran("Deux issues seulement")
        pg = Panier(0.95).move_to(P(-3.0, 0.4))
        pd = Panier(0.95).move_to(P(2.6, 0.4))
        self.play(FadeIn(pg), FadeIn(pd), run_time=0.5)
        self.au_mot("le panier est réussi")
        b1 = ballon(0.24).move_to(P(-6.0, -0.4))
        self.add(b1)
        self.tir(b1, pg, True, 0.8)
        self.au_mot("ou il est raté")
        b2 = ballon(0.24).move_to(P(-0.4, -0.4))
        self.add(b2)
        self.tir(b2, pd, False, 0.8)
        cs = case_issue("succès", False, SUCCES, 34).move_to(P(-2.8, -2.55))
        ce = case_issue("échec", True, ECHEC, 34).move_to(P(2.8, -2.55))
        self.au_mot("On appelle « succès »")
        rs = self.t("réussi", 30, SUCCES).next_to(cs, LEFT, buff=0.25)
        self.play(FadeIn(rs, shift=UP * 0.1), FadeIn(cs[0]), FadeIn(cs[1][0]), run_time=0.5)
        self.au_mot("notée S")
        self.play(FadeIn(cs[1][1], scale=1.8), run_time=0.4)
        self.insister(cs)
        self.au_mot("L'autre, c'est l'échec")
        rr = self.t("raté", 30, ECHEC).next_to(ce, LEFT, buff=0.25)
        self.play(FadeIn(rr, shift=UP * 0.1), FadeIn(ce[0]), FadeIn(ce[1][0]), run_time=0.5)
        self.au_mot("S barre")
        self.play(FadeIn(ce[1][1], scale=1.8), run_time=0.4)
        self.insister(ce)
        self.attendre_voix()

    # ── 03 : le paramètre p ; l'échec 1 − p ─────────────────────────────────

    def ecran_p(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-p")
        self.titre_ecran("Le paramètre p")
        a = BrancheDouble().scale(0.85).move_to(P(-4.7, 1.0))
        self.play(FadeIn(a.socle()), *[Create(b) for b in a.branches], FadeIn(VGroup(*a.lab)), run_time=0.8)
        x0 = -1.7
        self.au_mot("La probabilité du succès")
        l1 = suite(self.t("p", 54, JAUNE_TITRE), self.t("= probabilité du succès", 36), buff=0.2)
        l1.move_to(P(x0, 2.2), aligned_edge=LEFT)
        self.play(FadeIn(l1, shift=UP * 0.15), Indicate(a.lab[0], color=SUCCES, scale_factor=1.6), run_time=0.7)
        self.au_mot("Ici, p égale 0,7")
        l2 = suite(self.t("p", 54, JAUNE_TITRE), self.t("=", 54), self.t("0,7", 54, VERT_OK), buff=0.25)
        l2.move_to(P(x0, 1.15), aligned_edge=LEFT)
        n0 = a.nombre(0, "0,7")
        self.play(FadeIn(l2[:2]), run_time=0.3)
        self.au_mot("0,7. L'échec")
        self.play(FadeIn(l2[2], scale=1.8), FadeIn(n0, scale=1.6), run_time=0.5)
        self.insister(n0, 0.25)
        self.au_mot("L'échec : 1 moins 0,7")
        k = [self.t(s, 50, c) for s, c in (("Échec :", ECHEC), ("1 − 0,7", WHITE), ("=", WHITE), ("0,3", VERT_OK))]
        l3 = suite(*k, buff=0.25).move_to(P(x0, 0.05), aligned_edge=LEFT)
        self.play(FadeIn(k[0], shift=UP * 0.1), Indicate(a.lab[1], color=ECHEC, scale_factor=1.6), run_time=0.5)
        self.play(FadeIn(k[1], shift=UP * 0.1), run_time=0.4)
        self.au_mot("égale 0,3")
        n1 = a.nombre(1, "0,3")
        self.play(FadeIn(k[2]), FadeIn(k[3], scale=1.8), FadeIn(n1, scale=1.6), run_time=0.5)
        self.insister(n1, 0.25)
        self.au_mot("Une expérience à deux issues")
        d1 = self.t("deux issues, succès et échec :", 36).move_to(P(-0.6, -1.25))
        self.play(FadeIn(d1, shift=UP * 0.1), run_time=0.5)
        self.au_mot("c'est une épreuve de Bernoulli")
        d2 = suite(self.t("épreuve de Bernoulli", 44, JAUNE_TITRE), self.t("de paramètre", 36),
                   self.t("p", 48, JAUNE_TITRE), buff=0.22)
        if d2.width > 10.6:
            d2.scale_to_fit_width(10.6)
        d2.next_to(d1, DOWN, buff=0.3)
        cad = SurroundingRectangle(d2, color=JAUNE_TITRE, buff=0.18, stroke_width=4)
        self.play(Write(d2[0]), run_time=0.8)
        self.au_mot("de paramètre p")
        self.play(FadeIn(d2[1:], shift=LEFT * 0.1), Create(cad), run_time=0.6)
        self.insister(VGroup(d2, cad), 0.3)
        self.attendre_voix()

    # ── 04 : d'autres épreuves de Bernoulli ─────────────────────────────────

    def ecran_exemples(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-exemples")
        self.titre_ecran("D'autres épreuves de Bernoulli")
        xs = (-4.9, -0.8, 3.3)
        icones = [client(1.4), graine(1.6), de(6, 1.3)]
        for ic, x in zip(icones, xs):
            ic.move_to(P(x, 1.5))
        mots = [("achète", "n'achète pas"), ("germe", "ne germe pas"), ("6", "pas 6")]
        cles = ["un client achète", "Une graine germe", "Un dé tombe sur 6"]
        cles_non = ["ou pas. Une graine", "ou pas. Un dé", "ou pas : succès"]
        blocs = []
        for (ms, me), x in zip(mots, xs):
            s = VGroup(lettre("S", 36, SUCCES), self.t(":", 32), self.t(ms, 32, SUCCES)).arrange(RIGHT, buff=0.14)
            e = VGroup(lettre("S", 36, ECHEC, True), self.t(":", 32), self.t(me, 32, ECHEC)).arrange(RIGHT, buff=0.14)
            g = VGroup(s, e).arrange(DOWN, aligned_edge=LEFT, buff=0.35).move_to(P(x, -0.35))
            blocs.append(g)
        for ic, g, c1, c2 in zip(icones, blocs, cles, cles_non):
            self.au_mot(c1)
            self.play(FadeIn(ic, shift=UP * 0.2), FadeIn(g[0], shift=UP * 0.1), run_time=0.5)
            self.au_mot(c2)
            self.play(FadeIn(g[1], shift=UP * 0.1), run_time=0.4)
        self.au_mot("1 chance sur 6")
        un6 = suite(self.t("succès :", 36, SUCCES), frac("1", "6", 48, VERT_OK), buff=0.2)
        un6.next_to(blocs[2], DOWN, buff=0.45)
        self.play(FadeIn(un6, scale=1.5), Indicate(icones[2], color=SUCCES), run_time=0.6)
        self.insister(un6[1], 0.25)
        self.attendre_voix()

    # ── 05 : le piège : « il faut deux issues dans l'expérience » ───────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-piege")
        self.titre_ecran("Le piège")
        self.au_mot("croire qu'il faut")
        faux = self.t("Il faut exactement deux issues dans l'expérience ?", 34, ROUGE_ERREUR).move_to(P(-0.4, 2.45))
        self.play(FadeIn(faux, shift=UP * 0.15), run_time=0.6)
        self.au_mot("Un dé en a six")
        des = VGroup(*[de(f, 0.85) for f in range(1, 7)]).arrange(RIGHT, buff=0.3).move_to(P(-0.6, 1.3))
        six = self.t("6 issues", 36, JAUNE_TITRE).next_to(des, DOWN, buff=0.3)
        self.play(LaggedStart(*[FadeIn(d, shift=DOWN * 0.3) for d in des], lag_ratio=0.12), run_time=0.8)
        self.play(FadeIn(six, scale=1.5), run_time=0.4)
        self.au_mot("si on ne regarde que")
        self.play(FadeOut(six), run_time=0.3)
        pas6 = VGroup(*[des[k] for k in range(5)])
        cible_p = VGroup(*[d.copy() for d in pas6]).arrange(RIGHT, buff=0.12).move_to(P(-3.3, -0.1))
        cible_6 = des[5].copy().move_to(P(2.7, -0.1))
        self.play(*[d.animate.move_to(c) for d, c in zip(pas6, cible_p)], des[5].animate.move_to(cible_6),
                  run_time=0.9)
        cad_p = SurroundingRectangle(pas6, color=ECHEC, buff=0.15, stroke_width=5)
        cad_6 = SurroundingRectangle(des[5], color=SUCCES, buff=0.15, stroke_width=5)
        lab6 = suite(lettre("S", 34, SUCCES), self.t(":", 30), self.t("« 6 »", 34, SUCCES), buff=0.12)
        lab6.next_to(cad_6, DOWN, buff=0.25)
        labp = suite(lettre("S", 34, ECHEC, True), self.t(":", 30), self.t("« pas 6 »", 34, ECHEC), buff=0.12)
        labp.next_to(cad_p, DOWN, buff=0.25)
        self.au_mot("« 6 » ou")
        self.play(Create(cad_6), FadeIn(lab6, shift=UP * 0.1), run_time=0.5)
        self.au_mot("« pas 6 »")
        self.play(Create(cad_p), FadeIn(labp, shift=UP * 0.1), run_time=0.5)
        self.au_mot("on en fait une épreuve")
        ok = self.t("deux issues : épreuve de Bernoulli", 36, VERT_OK).move_to(P(-0.6, -2.05))
        barre = Line(faux.get_left() + LEFT * 0.1, faux.get_right() + RIGHT * 0.1, color=ROUGE_ERREUR,
                     stroke_width=6)
        self.play(FadeIn(ok, shift=UP * 0.1), Create(barre), faux.animate.set_opacity(0.45), run_time=0.6)
        self.au_mot("C'est la question posée")
        ch = self.chute("C'est la question posée qui crée les deux issues", color=JAUNE_TITRE, font_size=34)
        self.play(Write(ch), run_time=0.9)
        self.attendre_voix()

    # ── 06 : défi : un cœur dans 32 cartes ──────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("06-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        self.au_mot("On tire une carte")
        paquet = VGroup(*[carte_jeu(False, 2.4).shift(P(0.03 * k, 0.03 * k)) for k in range(6)])
        for c in paquet:
            c[0].set_fill("#1D4ED8")
        paquet.move_to(P(-4.4, 0.9))
        self.play(FadeIn(paquet, shift=UP * 0.2), run_time=0.5)
        self.au_mot("32 cartes")
        n32 = self.t("32 cartes", 38, JAUNE_TITRE).next_to(paquet, DOWN, buff=0.35)
        self.play(FadeIn(n32, scale=1.5), run_time=0.4)
        self.au_mot("Succès")
        q1 = suite(lettre("S", 44, SUCCES), self.t(":", 40), self.t("« la carte est un cœur »", 38, SUCCES),
                   coeur_dessin(0.17), buff=0.2)
        q1.move_to(P(1.2, 1.3))
        self.play(FadeIn(q1, shift=UP * 0.15), run_time=0.6)
        self.au_mot("Quel est le paramètre p")
        q2 = suite(self.t("p", 60, JAUNE_TITRE), self.t("=", 60), self.t("?", 66, ORANGE_RETENUE), buff=0.3)
        q2.move_to(P(1.2, -0.2))
        self.play(FadeIn(q2, scale=1.4), run_time=0.5)
        self.insister(q2[2], 0.3)
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=36)))
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("06b-correction")
        self.titre_ecran("Correction")
        # 4 rangées de 8 : une rangée par couleur ; la rangée 0 = les cœurs.
        jeu = VGroup(*[VGroup(*[carte_couleur(r, 1.2) for _ in range(8)]).arrange(RIGHT, buff=0.1)
                       for r in range(4)]).arrange(DOWN, buff=0.14)
        jeu.move_to(P(-3.5, -0.35))
        self.play(LaggedStart(*[FadeIn(c, scale=0.6) for rg in jeu for c in rg], lag_ratio=0.02), run_time=1.0)
        self.au_mot("8 cœurs")
        coeurs = jeu[0]
        autres = VGroup(*jeu[1:])
        self.play(coeurs.animate.shift(UP * 0.35), autres.animate.set_opacity(0.3), run_time=0.6)
        cad = SurroundingRectangle(coeurs, color=SUCCES, buff=0.1, stroke_width=5)
        n8 = self.t("8 cœurs", 34, SUCCES).next_to(cad, UP, buff=0.15)
        self.play(Create(cad), FadeIn(n8, scale=1.4), run_time=0.5)
        self.au_mot("sur 32 cartes")
        n32 = self.t("32 cartes", 34, JAUNE_TITRE).next_to(jeu, DOWN, buff=0.3)
        self.play(FadeIn(n32, scale=1.4), run_time=0.4)
        x0 = 0.9
        self.au_mot("p égale 8 sur 32")
        k = [self.t("p", 56, JAUNE_TITRE), self.t("=", 56), frac("8", "32", 46, WHITE, SUCCES, JAUNE_TITRE),
             self.t("=", 56), self.t("0,25", 56, VERT_OK)]
        l1 = suite(*k, buff=0.25).move_to(P(x0, 1.0), aligned_edge=LEFT)
        self.play(FadeIn(VGroup(k[0], k[1])), run_time=0.3)
        self.play(TransformFromCopy(n8, k[2][0]), GrowFromCenter(k[2][1]), TransformFromCopy(n32, k[2][2]),
                  run_time=0.7)
        self.au_mot("égale 0,25")
        self.play(FadeIn(k[3]), FadeIn(k[4], scale=1.8), run_time=0.5)
        self.insister(k[4])
        self.au_mot("L'échec : 0,75")
        l2 = suite(self.t("Échec :", 44, ECHEC), self.t("0,75", 52, VERT_OK), buff=0.25)
        l2.move_to(P(x0, -0.5), aligned_edge=LEFT)
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.4)
        self.au_mot("0,75")
        self.play(FadeIn(l2[1], scale=1.8), run_time=0.4)
        ok = self.coche(taille=0.35).next_to(l2, RIGHT, buff=0.5)
        self.play(Create(ok), run_time=0.4)
        self.attendre_voix()

    # ── 07 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)))
        fs = 36
        l1 = suite(self.t("Épreuve de Bernoulli :", fs, JAUNE_TITRE), self.t("deux issues,", fs),
                   self.t("succès", fs, SUCCES), self.t("et", fs), self.t("échec", fs, ECHEC), buff=0.18)
        l2 = suite(self.t("p", fs + 6, JAUNE_TITRE), self.t("= probabilité du succès ;", fs),
                   self.t("échec :", fs, ECHEC), self.t("1 − p", fs + 4, VERT_OK), buff=0.18)
        l3 = self.t("La question posée choisit le succès", fs)
        lignes = VGroup(*[VGroup(self.coche(), l).arrange(RIGHT, buff=0.3) for l in (l1, l2, l3)])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.6)
        if lignes.width > 12.2:
            lignes.scale_to_fit_width(12.2)
        lignes.move_to(P(-0.4, 0.6))
        for mot, l in zip(["Une épreuve de Bernoulli", "Son paramètre p", "Et c'est la question"], lignes):
            self.au_mot(mot)
            self.play(FadeIn(l[1], shift=RIGHT * 0.2), run_time=0.6)
            self.play(Create(l[0]), run_time=0.4)
        self.au_mot("Prochaine vidéo")
        ch = suite(self.t("Prochaine vidéo :", 36, VERT_OK), self.t("répéter une épreuve", 36), buff=0.22)
        ch.move_to(P(-0.9, -2.6))
        self.play(FadeIn(ch, shift=UP * 0.15), run_time=0.6)
        self.attendre_voix(marge=1.0)

    # ── 08 : la fin (règle du 19/10) ────────────────────────────────────────

    def page_abonnement(self, voix="08-abonne"):
        """« Entraîne-toi sur » + eleveai.fr encadré, puis « Abonne-toi ! » +
        @eleveai974. Rien d'autre."""
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

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_deux()
        self.ecran_p()
        self.ecran_exemples()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="08-abonne")


class ProbaBernEpreuveSTMG(ProbaBernEpreuveBase):
    identite = "Maths STMG — EleveAI"


class ProbaBernEpreuvePremiere(ProbaBernEpreuveBase):
    identite = "Maths 1re — EleveAI"
