# proba_conditionnelle_arbre.py
# EleveAI — Maths Tle spé — série « Probabilités conditionnelles », épisode 1 :
# l'ARBRE PONDÉRÉ (micro : proba_conditionnelle_arbre), AVEC VOIX.
# Paysage 16:9, CEINTURE NOIRE. Short jumeau : proba_conditionnelle_arbre_short.py.
#
# Situation : les tirs au but. Le gardien plonge à gauche (G) dans 60 % des cas ;
# il arrête (A) 30 fois sur 100 à gauche, 20 fois sur 100 à droite.
#
# Écrans : 00 garde · 01 la cage, le gardien qui plonge · 02 l'arbre construit
# branche par branche · 03 les deux règles (somme 1 ; P_G(A) = la branche G
# suivie, le reste s'estompe) · 04 un chemin = un produit (G → A s'allume,
# 0,18 au bout) · 05 P(A) = les deux chemins vers A (0,26) · 06 le piège
# 0,3 + 0,2 · 07 défi « but ? » · 07b correction (0,74) · 08 ce que tu as
# appris · 09 abonnement.
#
# ⭐ Canvas du coach repris : `arbre_proba` (lib/canvas/ArbreProbabilitesCanvas.tsx)
# — point de départ, trois colonnes, feuilles régulièrement espacées, un nœud
# intérieur au milieu de ses enfants ; la probabilité au milieu de la branche,
# en BLEU ; l'étiquette d'un nœud intérieur AU-DESSUS du nœud, celle d'une
# feuille À DROITE.
#
# Voix : manim/voix/terminale-proba-arbre.json (débit −6).
# Rendu : python -m manim render -qh --disable_caching manim/scripts/terminale/proba_conditionnelle_arbre.py ProbaArbreTerminale -o eleveai-maths-terminale-proba-arbre --media_dir manim/scripts/terminale/media
# Puis copier le mp4 dans manim/sorties/terminale/maths/probabilites/01-arbre-pondere/.

import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "seconde"))

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Notion6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

BRANCHE = "#94A3B8"      # le gris-ardoise des branches du coach, éclairci pour le fond noir
PROBA = BLEU_CALCUL      # les probabilités en bleu, comme sur le coach
MAILLOT = "#F97316"
PEAU = "#C68642"
GANTS = "#22C55E"


def P(x, y):
    return np.array([x, y, 0.0])


# ── les écritures ───────────────────────────────────────────────────────────

def lettre(l, fs=40, color=WHITE, barre=False, bold=True):
    """Une lettre d'événement, avec sa barre si c'est le contraire (Ā, Ḡ)."""
    t = Text(l, font_size=fs, color=color, weight=BOLD if bold else NORMAL)
    if not barre:
        return VGroup(t)
    y = t.get_top()[1] + fs * 0.0035
    b = Line(P(t.get_left()[0] + 0.01, y), P(t.get_right()[0] - 0.01, y), color=color,
             stroke_width=max(2.0, fs / 12))
    return VGroup(t, b)


def nota(texte, fs=40, color=WHITE, sub=None, sub_barre=False, barres=()):
    """Une notation en UN Text (même ligne de base) : « P(A) » ; `sub` glisse un
    indice après le P (P_G(A)) ; `barres` = indices des caractères (sans les
    espaces) à surligner (Ā)."""
    T = Text(texte, font_size=fs, color=color)
    g = VGroup(T)
    for i in barres:
        c = T[i]
        y = c.get_top()[1] + fs * 0.003
        g.add(Line(P(c.get_left()[0] + 0.01, y), P(c.get_right()[0] - 0.01, y), color=color,
                   stroke_width=max(2.0, fs / 13)))
    if sub is not None:
        s = lettre(sub, int(fs * 0.62), color, sub_barre, bold=False)
        s.move_to(P(T[0].get_right()[0] + 0.03 + s.width / 2, T[0].get_bottom()[1] + 0.02))
        reste = VGroup(*T[1:], *g[1:])
        reste.shift(RIGHT * (s.width + 0.04))
        g.add(s)
    return g


def caler(mob, car, ref):
    """Pose `mob` sur la ligne de base de `ref` : le bas du caractère `car`
    (une lettre sans jambage) au bas de `ref`."""
    mob.shift(UP * (ref.get_bottom()[1] - car.get_bottom()[1]))
    return mob


# ── la cage et le gardien ───────────────────────────────────────────────────

def ballon(r=0.2):
    rond = Circle(radius=r, fill_color=WHITE, fill_opacity=1, stroke_color=GREY_B, stroke_width=2)
    pent = RegularPolygon(5, radius=r * 0.38, fill_color="#111827", fill_opacity=1, stroke_width=0)
    rayons = VGroup(*[Line(pent.get_vertices()[k], pent.get_vertices()[k] * 2.4, color="#111827",
                           stroke_width=1.5) for k in range(5)])
    return VGroup(rond, rayons, pent)


def cage(larg=5.4, haut=2.4):
    """Les buts vus de face : deux poteaux, la barre, le filet."""
    filet = VGroup()
    for k in range(1, 12):
        x = -larg / 2 + k * larg / 12
        filet.add(Line(P(x, -haut / 2), P(x, haut / 2), stroke_width=1, color=GREY_B, stroke_opacity=0.5))
    for k in range(1, 5):
        y = -haut / 2 + k * haut / 5
        filet.add(Line(P(-larg / 2, y), P(larg / 2, y), stroke_width=1, color=GREY_B, stroke_opacity=0.5))
    cadre = VMobject(stroke_color=WHITE, stroke_width=9)
    cadre.set_points_as_corners([P(-larg / 2, -haut / 2), P(-larg / 2, haut / 2),
                                 P(larg / 2, haut / 2), P(larg / 2, -haut / 2)])
    sol = Line(P(-larg / 2 - 0.8, -haut / 2), P(larg / 2 + 0.8, -haut / 2), stroke_width=3, color=VERT_OK,
               stroke_opacity=0.6)
    return VGroup(filet, sol, cadre)


def gardien(s=1.0):
    """Le gardien, bras levés : maillot orange, gants verts. Hauteur ≈ 1,9 × s."""
    torse = RoundedRectangle(width=0.5, height=0.72, corner_radius=0.12, fill_color=MAILLOT,
                             fill_opacity=1, stroke_width=0)
    tete = Circle(radius=0.17, fill_color=PEAU, fill_opacity=1, stroke_width=0).move_to(P(0, 0.56))
    bras = VGroup(Line(P(-0.2, 0.26), P(-0.55, 0.66), stroke_width=11, color=MAILLOT),
                  Line(P(0.2, 0.26), P(0.55, 0.66), stroke_width=11, color=MAILLOT))
    gants = VGroup(Circle(radius=0.1, fill_color=GANTS, fill_opacity=1, stroke_width=0).move_to(P(-0.58, 0.7)),
                   Circle(radius=0.1, fill_color=GANTS, fill_opacity=1, stroke_width=0).move_to(P(0.58, 0.7)))
    short = Rectangle(width=0.5, height=0.2, fill_color="#111827", fill_opacity=1, stroke_width=0).move_to(P(0, -0.42))
    jambes = VGroup(Line(P(-0.13, -0.5), P(-0.25, -1.08), stroke_width=11, color=PEAU),
                    Line(P(0.13, -0.5), P(0.25, -1.08), stroke_width=11, color=PEAU))
    return VGroup(jambes, short, torse, bras, gants, tete).scale(s)


# ── l'arbre pondéré (le canvas `arbre_proba` du coach) ──────────────────────

class ArbreP:
    """L'arbre G / Ḡ puis A / Ā.

    Chemins, dans l'ordre : 0 = G→A, 1 = G→Ā, 2 = Ḡ→A, 3 = Ḡ→Ā ;
    `b2[k]` est la 2e branche du chemin k, `b1[k // 2]` la 1re.
    """

    def __init__(self, racine=P(-6.4, 0.0), dx=2.35, dy1=1.3, dy2=0.65,
                 probas=("0,6", "0,4", "0,3", "0,7", "0,2", "0,8"),
                 fs=34, lab_fs=40, sw=4, ecart=0.27, haut_lab=0.36):
        self.racine = racine
        self.n1 = [racine + P(dx, dy1), racine + P(dx, -dy1)]
        self.n2 = [self.n1[0] + P(dx, dy2), self.n1[0] + P(dx, -dy2),
                   self.n1[1] + P(dx, dy2), self.n1[1] + P(dx, -dy2)]
        self.rac = Dot(racine, radius=0.08 * sw / 4, color=WHITE)
        self.b1 = VGroup(*[Line(racine, p, stroke_width=sw, color=BRANCHE) for p in self.n1])
        self.b2 = VGroup(*[Line(self.n1[k // 2], p, stroke_width=sw, color=BRANCHE)
                           for k, p in enumerate(self.n2)])
        # nœuds intérieurs : l'étiquette AU-DESSUS ; feuilles : À DROITE (comme le coach)
        # (le nœud du bas porte son étiquette DESSOUS : au-dessus, la branche qui
        # arrive d'en haut à gauche la traversait)
        self.l1 = VGroup(*[lettre("G", lab_fs, WHITE, barre=k == 1).move_to(p + (UP if k == 0 else DOWN) * haut_lab)
                           for k, p in enumerate(self.n1)])
        self.l2 = VGroup(*[lettre("A", lab_fs, WHITE, barre=k % 2 == 1) for k in range(4)])
        for l, p in zip(self.l2, self.n2):
            l.next_to(p, RIGHT, buff=0.14)
            l.shift(UP * (p[1] - l[0].get_center()[1]))
        self.q1 = VGroup(*[self._proba(probas[k], b, k == 0, fs, ecart) for k, b in enumerate(self.b1)])
        self.q2 = VGroup(*[self._proba(probas[2 + k], b, k % 2 == 0, fs, ecart)
                           for k, b in enumerate(self.b2)])

    @staticmethod
    def _proba(texte, branche, haut, fs, ecart):
        t = Text(texte, font_size=fs, color=PROBA, weight=BOLD)
        d = branche.get_end() - branche.get_start()
        n = np.array([-d[1], d[0], 0.0])
        n = n / np.linalg.norm(n)
        if n[1] < 0:
            n = -n
        return t.move_to(branche.get_center() + n * (ecart if haut else -ecart))

    def niveau1(self):
        return VGroup(self.rac, self.b1, self.l1, self.q1)

    def niveau2(self):
        return VGroup(self.b2, self.l2, self.q2)

    def tout(self):
        return VGroup(self.niveau1(), self.niveau2())

    def chemin(self, k):
        return VGroup(self.b1[k // 2], self.b2[k])

    def bout(self, k, texte, fs=34, color=JAUNE_TITRE, buff=0.3):
        """Le produit écrit AU BOUT du chemin k, à droite de la feuille."""
        t = Text(texte, font_size=fs, color=color, weight=BOLD)
        return t.next_to(self.l2[k], RIGHT, buff=buff).set_y(self.n2[k][1])

    def eteindre(self, garder=(), opacite=0.22):
        """Animations : seuls les chemins `garder` restent nets, le reste s'estompe."""
        anims = []
        for k in range(4):
            if k not in garder:
                anims += [self.b2[k].animate.set_stroke(opacity=opacite),
                          self.l2[k].animate.set_opacity(opacite), self.q2[k].animate.set_opacity(opacite)]
        for i in range(2):
            if not any(k // 2 == i for k in garder):
                anims += [self.b1[i].animate.set_stroke(opacity=opacite),
                          self.l1[i].animate.set_opacity(opacite), self.q1[i].animate.set_opacity(opacite)]
        return anims

    def allumer(self, k, color=JAUNE_TITRE, sw=8):
        return [b.animate.set_stroke(color, sw, opacity=1) for b in self.chemin(k)]

    def rallumer(self, sw=4):
        """Tout redevient net et gris."""
        return ([b.animate.set_stroke(BRANCHE, sw, opacity=1) for b in [*self.b1, *self.b2]]
                + [m.animate.set_opacity(1) for m in [*self.l1, *self.l2, *self.q1, *self.q2]])


class NotionTerminale(Notion6e):
    identite = "Maths Tle spé — EleveAI"


class ProbaArbreTerminale(NotionTerminale):
    nom_voix = "terminale-proba-arbre"

    def t(self, texte, font_size=36, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def ligne(self, morceaux, font_size=40, buff=0.24):
        """Une ligne en morceaux colorés, d'UN SEUL Text (même ligne de base) ;
        ligne[i] reste le i-ème morceau."""
        T = Text(" ".join(m for m, _ in morceaux), font_size=font_size)
        tailles = [len(m.replace(" ", "")) for m, _ in morceaux]
        if len(T) != sum(tailles):  # ligature : on retombe sur des morceaux séparés
            return VGroup(*[self.t(m, font_size, c) for m, c in morceaux]).arrange(RIGHT, buff=buff)
        g, k = VGroup(), 0
        for (m, c), n in zip(morceaux, tailles):
            g.add(VGroup(*T[k:k + n]).set_color(c))
            k += n
        return g

    def insister(self, mob, run_time=0.4):
        self.play(mob.animate.scale(1.5), run_time=run_time)
        self.play(mob.animate.scale(1 / 1.5), run_time=run_time)

    def barrer(self, mob, color=ROUGE_ERREUR, sw=6):
        return Line(mob.get_corner(DL) + LEFT * 0.08, mob.get_corner(UR) + RIGHT * 0.08,
                    stroke_width=sw, color=color)

    def poser(self, mob, x, y, droite=6.8):
        """Pose `mob` bord gauche en x, centré en y ; réduit s'il dépasserait `droite`."""
        if mob.width > droite - x:
            mob.scale_to_fit_width(droite - x)
        mob.move_to(P(x + mob.width / 2, y))
        return mob

    def legende(self):
        """G : gauche · Ḡ : droite / A : arrêt · Ā : but — en haut à droite."""
        def entree(l, barre, mot):
            return VGroup(lettre(l, 30, WHITE, barre), self.t(": " + mot, 28, GREY_A)).arrange(RIGHT, buff=0.12)
        l1 = VGroup(entree("G", False, "gauche"), entree("G", True, "droite")).arrange(RIGHT, buff=0.55)
        l2 = VGroup(entree("A", False, "arrêt"), entree("A", True, "but")).arrange(RIGHT, buff=0.55)
        for a, b in zip(l1, l2):
            b.align_to(a, LEFT)
        g = VGroup(l1, l2).arrange(DOWN, aligned_edge=LEFT, buff=0.22)
        return g.move_to(P(4.45, 2.3))

    def arbre_complet(self):
        A = ArbreP()
        self.add(A.tout())
        return A

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("L'arbre pondéré", 56, JAUNE_TITRE).to_edge(UP, buff=0.6)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.22)
        ech = echelle_ceintures("noire").move_to(P(-0.6, -2.55))
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech), run_time=0.9)
        A = ArbreP(racine=P(-4.6, -0.15), dx=2.3, dy1=0.8, dy2=0.42, fs=26, lab_fs=30, sw=3,
                   ecart=0.2, haut_lab=0.3)
        self.play(Create(A.rac), *[Create(b) for b in A.b1], run_time=0.5)
        self.play(FadeIn(A.l1), *[Create(b) for b in A.b2], run_time=0.5)
        self.au_mot("lire et construire")
        sous = self.t("lire et construire", 40, BLEU_CALCUL).move_to(P(3.4, -0.15))
        self.play(FadeIn(A.l2), FadeIn(sous, shift=LEFT * 0.2), run_time=0.5)
        self.play(*A.allumer(0), run_time=0.4)
        self.attendre_voix(marge=1.0)

    # ── 01 : la situation ───────────────────────────────────────────────────

    def scene_but(self, centre=P(-0.6, 1.0), s=0.9):
        """La cage, le gardien posé sur la ligne, le ballon au point de penalty."""
        c = cage().move_to(centre)
        gk = gardien(s).move_to(centre)
        gk.shift(UP * (c.get_bottom()[1] + 0.02 - gk.get_bottom()[1]))
        b = ballon(0.2).move_to(centre + P(0, -1.75))
        return c, gk, b

    def plonger(self, gk, cote, dx=1.75, run_time=0.5):
        """Le gardien plonge (cote = −1 à gauche, +1 à droite)."""
        self.play(gk.animate.rotate(-cote * 1.15).shift(RIGHT * cote * dx + UP * 0.25), run_time=run_time,
                  rate_func=rate_functions.ease_out_cubic)

    def gant_au_bout(self, gk, cote):
        return max(gk[4], key=lambda g: cote * g.get_center()[0]).get_center()

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.titre_ecran("Les tirs au but")
        c, gk, b = self.scene_but()
        self.play(FadeIn(c), FadeIn(gk, shift=UP * 0.2), FadeIn(b), run_time=0.6)
        l1 = self.ligne([("plonge à gauche :", WHITE), ("60 %", JAUNE_TITRE)], 36).move_to(P(-0.6, -1.35))
        l2 = self.ligne([("à gauche, arrêt :", WHITE), ("30 fois sur 100", JAUNE_TITRE)], 36)
        l3 = self.ligne([("à droite, arrêt :", WHITE), ("20 fois sur 100", JAUNE_TITRE)], 36)
        l2.next_to(l1, DOWN, buff=0.3).align_to(l1, LEFT)
        l3.next_to(l2, DOWN, buff=0.3).align_to(l1, LEFT)

        self.au_mot("un gardien plonge")
        gk.save_state()
        self.plonger(gk, -1)
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("60 %")
        self.play(FadeIn(l1[1], scale=0.6), run_time=0.3)
        self.insister(l1[1], 0.3)

        self.au_mot("il arrête le tir")
        cible = self.gant_au_bout(gk, -1)
        self.play(b.animate.move_to(cible).scale(0.8), run_time=0.45, rate_func=rate_functions.ease_in_quad)
        self.play(Flash(cible, color=VERT_OK, line_length=0.25), FadeIn(l2[0], shift=UP * 0.1), run_time=0.4)
        self.au_mot("30 fois sur 100")
        self.play(FadeIn(l2[1], scale=0.6), run_time=0.3)

        self.au_mot("à droite, 20")
        self.play(Restore(gk), b.animate.scale(1 / 0.8).move_to(P(-0.6, -0.75)), run_time=0.35)
        self.plonger(gk, 1)
        cible = self.gant_au_bout(gk, 1)
        self.play(b.animate.move_to(cible).scale(0.8), FadeIn(l3[0], shift=UP * 0.1), run_time=0.45)
        self.play(Flash(cible, color=VERT_OK, line_length=0.25), run_time=0.3)
        self.au_mot("20 fois sur 100")
        self.play(FadeIn(l3[1], scale=0.6), run_time=0.3)
        self.attendre_voix()

    # ── 02 : construire l'arbre ─────────────────────────────────────────────

    def ecran_construire(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-construire")
        self.titre_ecran("L'arbre pondéré")
        A = ArbreP()
        leg = self.legende()
        niv1 = self.t("1er niveau", 26, GREY_A).move_to(P((A.racine[0] + A.n1[0][0]) / 2, 2.55))
        niv2 = self.t("2e niveau", 26, GREY_A).move_to(P((A.n1[0][0] + A.n2[0][0]) / 2, 2.55))

        self.au_mot("Premier niveau")
        self.play(FadeIn(A.rac, scale=2), FadeIn(niv1), run_time=0.4)
        self.au_mot("G, gauche")
        self.play(Create(A.b1[0]), run_time=0.4)
        self.play(FadeIn(A.l1[0], scale=0.6), FadeIn(leg[0][0], shift=LEFT * 0.2), run_time=0.35)
        self.au_mot("0,6")
        self.play(FadeIn(A.q1[0], scale=0.5), run_time=0.3)
        self.insister(A.q1[0], 0.25)
        self.au_mot("G barre, droite")
        self.play(Create(A.b1[1]), run_time=0.4)
        self.play(FadeIn(A.l1[1], scale=0.6), FadeIn(leg[0][1], shift=LEFT * 0.2), run_time=0.35)
        self.au_mot("0,4")
        self.play(FadeIn(A.q1[1], scale=0.5), run_time=0.3)
        self.insister(A.q1[1], 0.25)

        self.au_mot("Deuxième niveau")
        self.play(FadeIn(niv2), run_time=0.3)
        self.au_mot("A, arrêt")
        self.play(FadeIn(leg[1][0], shift=LEFT * 0.2), run_time=0.35)
        self.au_mot("A barre, but")
        self.play(FadeIn(leg[1][1], shift=LEFT * 0.2), run_time=0.35)

        self.au_mot("Après G :")
        self.play(Indicate(A.l1[0], color=JAUNE_TITRE), Create(A.b2[0]), Create(A.b2[1]), run_time=0.5)
        self.play(FadeIn(A.l2[0]), FadeIn(A.l2[1]), run_time=0.3)
        self.au_mot("0,3")
        self.play(FadeIn(A.q2[0], scale=0.5), run_time=0.3)
        self.au_mot("0,7")
        self.play(FadeIn(A.q2[1], scale=0.5), run_time=0.3)
        self.au_mot("Après G barre")
        self.play(Indicate(A.l1[1], color=JAUNE_TITRE), Create(A.b2[2]), Create(A.b2[3]), run_time=0.5)
        self.play(FadeIn(A.l2[2]), FadeIn(A.l2[3]), run_time=0.3)
        self.au_mot("0,2")
        self.play(FadeIn(A.q2[2], scale=0.5), run_time=0.3)
        self.au_mot("0,8")
        self.play(FadeIn(A.q2[3], scale=0.5), run_time=0.3)
        self.attendre_voix()

    # ── 03 : les deux règles ────────────────────────────────────────────────

    def ecran_regles(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-regles")
        self.titre_ecran("Deux règles")
        A = self.arbre_complet()
        self.add(self.legende())
        X = 0.6

        self.au_mot("Les branches qui partent")
        r1 = self.ligne([("1.", JAUNE_TITRE), ("Branches d'un même nœud :", WHITE)], 30, 0.15)
        self.poser(r1, X, 1.2)
        self.play(FadeIn(r1, shift=UP * 0.1),
                  *[b.animate.set_stroke(JAUNE_TITRE, 8) for b in A.b1], run_time=0.5)
        self.au_mot("somme 1")
        # ⛔ PAS D'ÉCART : la voix dit « somme 1 », pas « 0,6 + 0,4 » : on écrit
        # « somme = 1 » et ce sont les paires de branches qui s'allument.
        somme = self.ligne([("somme", WHITE), ("=", WHITE), ("1", VERT_OK)], 44, 0.22)
        self.poser(somme, X + 0.3, 0.45)
        self.play(FadeIn(somme, shift=UP * 0.1), Indicate(VGroup(A.q1[0], A.q1[1]), color=JAUNE_TITRE),
                  run_time=0.5)
        self.insister(somme[2], 0.25)
        for k in (1, 2):
            paire = [A.b2[2 * (k - 1)], A.b2[2 * (k - 1) + 1]]
            self.play(*[b.animate.set_stroke(BRANCHE, 4) for b in [*A.b1, *A.b2]],
                      *[b.animate.set_stroke(JAUNE_TITRE, 8) for b in paire],
                      Indicate(VGroup(A.q2[2 * (k - 1)], A.q2[2 * (k - 1) + 1]), color=JAUNE_TITRE),
                      run_time=0.5)
        self.play(*[b.animate.set_stroke(BRANCHE, 4) for b in A.b2], run_time=0.3)

        self.au_mot("Au deuxième niveau")
        r2 = self.ligne([("2.", JAUNE_TITRE), ("Au 2e niveau :", WHITE), ("conditionnelle", ORANGE_RETENUE)], 30, 0.15)
        self.poser(r2, X, -0.95)
        self.play(FadeIn(r2, shift=UP * 0.1), run_time=0.4)
        self.au_mot("probabilité conditionnelle")
        # « sachant G » : on suit la branche G, le reste s'estompe
        self.play(*A.eteindre(garder=(0, 1)), *[b.animate.set_stroke(JAUNE_TITRE, 7) for b in A.chemin(0)],
                  run_time=0.6)
        self.au_mot("0,3, c'est")
        self.insister(A.q2[0], 0.3)
        self.au_mot("P indice G de A")
        eq = VGroup(Text("0,3 =", font_size=44, color=PROBA, weight=BOLD), nota("P(A)", 44, JAUNE_TITRE, sub="G"))
        eq.arrange(RIGHT, buff=0.2)
        caler(eq[1], eq[1][0][0], eq[0][2])
        self.poser(eq, X + 0.3, -1.65)
        self.play(FadeIn(eq, shift=UP * 0.15), run_time=0.5)
        self.insister(eq[1], 0.35)
        self.attendre_voix()

    # ── 04 : un chemin = un produit ─────────────────────────────────────────

    def suivre(self, A, k, color=JAUNE_TITRE, run_time=1.0):
        """Un point lumineux parcourt le chemin k, qui s'allume derrière lui."""
        trajet = VMobject().set_points_as_corners([A.racine, A.n1[k // 2], A.n2[k]])
        d = Dot(A.racine, radius=0.12, color=color)
        self.play(MoveAlongPath(d, trajet), *A.allumer(k, color), run_time=run_time, rate_func=linear)
        self.play(FadeOut(d, scale=2), run_time=0.25)

    def ecran_chemin(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-chemin")
        self.titre_ecran("La probabilité d'un chemin")
        A = self.arbre_complet()
        self.add(self.legende())
        X = 0.6

        self.au_mot("produit des branches")
        r = self.ligne([("chemin", JAUNE_TITRE), ("=", WHITE), ("produit des branches", WHITE)], 32, 0.2)
        self.poser(r, X, 1.15)
        self.play(FadeIn(r, shift=UP * 0.1), run_time=0.5)

        self.au_mot("Plonger à gauche et arrêter")
        self.play(*A.eteindre(garder=(0,)), run_time=0.4)
        self.suivre(A, 0)
        self.au_mot("0,6 fois 0,3")
        calc = self.ligne([("0,6", PROBA), ("×", WHITE), ("0,3", PROBA), ("=", WHITE), ("0,18", JAUNE_TITRE)], 48, 0.22)
        self.poser(calc, X + 0.3, 0.15)
        self.play(FadeIn(calc[0], shift=UP * 0.1), Indicate(A.q1[0], color=JAUNE_TITRE), run_time=0.45)
        self.play(FadeIn(calc[1]), FadeIn(calc[2], shift=UP * 0.1), Indicate(A.q2[0], color=JAUNE_TITRE),
                  run_time=0.45)
        self.au_mot("égale 0,18")
        b = A.bout(0, "0,18")
        self.play(FadeIn(calc[3]), FadeIn(calc[4], scale=0.6), FadeIn(b, shift=LEFT * 0.2), run_time=0.45)
        self.insister(b, 0.3)
        self.au_mot("C'est P de G inter A")
        n = self.ligne([("P(G ∩ A)", JAUNE_TITRE), ("=", WHITE), ("0,18", JAUNE_TITRE)], 48, 0.22)
        self.poser(n, X + 0.3, -0.95)
        self.play(FadeIn(n, shift=UP * 0.15), run_time=0.5)
        self.insister(n[0], 0.35)
        self.attendre_voix()

    # ── 05 : P(A), tous les chemins vers A ──────────────────────────────────

    def ecran_totales(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-totales")
        self.titre_ecran("Les chemins qui mènent à A")
        A = self.arbre_complet()
        self.add(self.legende())
        X = 0.6
        b0 = A.bout(0, "0,18")
        for m in A.chemin(0):
            m.set_stroke(JAUNE_TITRE, 8)
        self.add(b0)

        self.au_mot("Pour P de A")
        l0 = self.ligne([("P(A)", JAUNE_TITRE)], 48)
        self.poser(l0, X, 1.15)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.4)
        self.au_mot("les chemins qui mènent à A")
        self.play(*A.eteindre(garder=(0, 2)), run_time=0.4)
        self.play(*[Indicate(A.l2[k], color=JAUNE_TITRE, scale_factor=1.6) for k in (0, 2)], run_time=0.7)

        self.au_mot("0,18 plus 0,4 fois 0,2")
        l1 = self.ligne([("=", WHITE), ("0,18", JAUNE_TITRE), ("+", WHITE), ("0,4", PROBA), ("×", WHITE),
                         ("0,2", PROBA)], 44, 0.2)
        self.poser(l1, X + 0.4, 0.45)
        self.play(FadeIn(l1[:3], shift=UP * 0.1), Indicate(b0, color=WHITE), run_time=0.45)
        self.suivre(A, 2, run_time=0.8)
        self.play(FadeIn(l1[3:], shift=UP * 0.1), Indicate(A.q1[1], color=JAUNE_TITRE),
                  Indicate(A.q2[2], color=JAUNE_TITRE), run_time=0.5)
        self.au_mot("soit 0,18 plus 0,08")
        l2 = self.ligne([("=", WHITE), ("0,18", JAUNE_TITRE), ("+", WHITE), ("0,08", JAUNE_TITRE)], 44, 0.2)
        self.poser(l2, X + 0.4, -0.25)
        b2 = A.bout(2, "0,08")
        self.play(FadeIn(l2, shift=UP * 0.1), FadeIn(b2, shift=LEFT * 0.2), run_time=0.5)
        self.au_mot("0,26")
        l3 = self.ligne([("=", WHITE), ("0,26", VERT_OK)], 56, 0.25)
        self.poser(l3, X + 0.4, -1.05)
        self.play(FadeIn(l3, scale=0.6), run_time=0.4)
        self.play(Create(SurroundingRectangle(l3[1], color=VERT_OK, buff=0.12)), run_time=0.4)
        self.insister(l3[1], 0.35)
        self.attendre_voix()

    # ── 06 : le piège ───────────────────────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-piege")
        self.titre_ecran("Le piège")
        A = self.arbre_complet()
        self.add(self.legende())
        X = 0.6

        self.au_mot("additionner 0,3 et 0,2")
        faux = self.ligne([("0,3", PROBA), ("+", WHITE), ("0,2", PROBA)], 52, 0.25)
        self.poser(faux, X + 0.4, 0.85)
        self.play(*A.eteindre(garder=(0, 2)), run_time=0.4)
        self.play(FadeIn(faux, shift=UP * 0.1), Indicate(A.q2[0], color=ROUGE_ERREUR),
                  Indicate(A.q2[2], color=ROUGE_ERREUR), run_time=0.6)
        croix = self.barrer(faux, sw=8)
        self.play(Create(croix), run_time=0.4)

        self.au_mot("pas le même poids")
        self.play(*A.rallumer(), run_time=0.3)
        self.play(A.b1[0].animate.set_stroke(JAUNE_TITRE, 16), A.b1[1].animate.set_stroke(JAUNE_TITRE, 9),
                  run_time=0.6)
        self.play(Indicate(A.q1[0], color=JAUNE_TITRE, scale_factor=1.5),
                  Indicate(A.q1[1], color=JAUNE_TITRE, scale_factor=1.25), run_time=0.7)

        self.au_mot("on multiplie d'abord")
        bon = self.ligne([("0,6", JAUNE_TITRE), ("×", WHITE), ("0,3", PROBA), ("+", WHITE), ("0,4", JAUNE_TITRE),
                          ("×", WHITE), ("0,2", PROBA)], 46, 0.18)
        self.poser(bon, X + 0.4, -0.4)
        self.play(FadeIn(VGroup(bon[2], bon[3], bon[6]), shift=UP * 0.1), run_time=0.4)
        self.au_mot("par 0,6")
        self.play(FadeIn(VGroup(bon[0], bon[1]), shift=RIGHT * 0.15), run_time=0.35)
        self.insister(bon[0], 0.25)
        self.au_mot("et 0,4")
        self.play(FadeIn(VGroup(bon[4], bon[5]), shift=RIGHT * 0.15), run_time=0.35)
        self.insister(bon[4], 0.25)
        ok = self.coche(taille=0.3).next_to(bon, DOWN, buff=0.35)
        self.play(Create(ok), run_time=0.4)
        self.attendre_voix()

    # ── 07 : défi ───────────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)), run_time=0.6)
        A = ArbreP()
        self.play(FadeIn(A.tout()), FadeIn(self.legende()), run_time=0.5)
        self.au_mot("Probabilité qu'il y ait but")
        q = VGroup(self.t("Probabilité", 40), self.ligne([("qu'il y ait", WHITE), ("but", ORANGE_RETENUE),
                                                          ("?", WHITE)], 40, 0.18)).arrange(DOWN, buff=0.2)
        q.move_to(P(2.6, 0.55))
        c = cage(2.4, 1.05).move_to(P(2.6, -1.0))
        b = ballon(0.12).move_to(P(2.6, -1.85))
        self.play(FadeIn(q, shift=UP * 0.15), FadeIn(c), FadeIn(b), run_time=0.5)
        self.play(b.animate.move_to(P(3.4, -0.7)), run_time=0.5, rate_func=rate_functions.ease_in_quad)
        self.play(Indicate(q[1][1], color=ORANGE_RETENUE, scale_factor=1.4), run_time=0.5)
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=36)))
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("07b-correction")
        self.titre_ecran("Correction")
        A = self.arbre_complet()
        self.add(self.legende())
        X = 0.6

        self.au_mot("But, c'est A barre")
        l0 = VGroup(self.t("but :", 40, ORANGE_RETENUE), nota("P(A)", 48, JAUNE_TITRE, barres=(2,)))
        l0.arrange(RIGHT, buff=0.25)
        caler(l0[1], l0[1][0][0], l0[0][0])
        self.poser(l0, X, 1.15)
        self.play(FadeIn(l0, shift=UP * 0.1), *A.eteindre(garder=(1, 3)), run_time=0.5)
        self.play(*[Indicate(A.l2[k], color=JAUNE_TITRE, scale_factor=1.6) for k in (1, 3)], run_time=0.6)

        l1 = self.ligne([("=", WHITE), ("0,6", PROBA), ("×", WHITE), ("0,7", PROBA), ("+", WHITE), ("0,4", PROBA),
                         ("×", WHITE), ("0,8", PROBA)], 38, 0.16)
        self.poser(l1, X + 0.35, 0.45)
        self.au_mot("0,6 fois 0,7")
        self.suivre(A, 1, run_time=0.7)
        self.play(FadeIn(l1[:4], shift=UP * 0.1), run_time=0.4)
        self.au_mot("plus 0,4 fois 0,8")
        self.suivre(A, 3, run_time=0.7)
        self.play(FadeIn(l1[4:], shift=UP * 0.1), run_time=0.4)

        self.au_mot("0,42 plus 0,32")
        l2 = self.ligne([("=", WHITE), ("0,42", JAUNE_TITRE), ("+", WHITE), ("0,32", JAUNE_TITRE)], 42, 0.2)
        self.poser(l2, X + 0.35, -0.25)
        b1, b3 = A.bout(1, "0,42"), A.bout(3, "0,32")
        self.play(FadeIn(b1, shift=LEFT * 0.2), FadeIn(l2[:2]), run_time=0.4)
        self.play(FadeIn(b3, shift=LEFT * 0.2), FadeIn(l2[2:]), run_time=0.4)
        self.au_mot("égale 0,74")
        l3 = self.ligne([("=", WHITE), ("0,74", VERT_OK)], 54, 0.25)
        self.poser(l3, X + 0.35, -1.0)
        self.play(FadeIn(l3, scale=0.6), run_time=0.4)
        self.play(Create(SurroundingRectangle(l3[1], color=VERT_OK, buff=0.12)), run_time=0.35)
        self.insister(l3[1], 0.3)

        self.au_mot("Ou bien")
        l4 = self.ligne([("ou bien", GREY_A), ("1", WHITE), ("−", WHITE), ("0,26", JAUNE_TITRE)], 38, 0.2)
        self.poser(l4, X + 0.35, -1.8)
        self.play(FadeIn(l4[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("1 moins 0,26")
        self.play(FadeIn(l4[1:], shift=UP * 0.1), run_time=0.4)
        self.insister(l4[3], 0.3)
        self.attendre_voix()

    # ── 08 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)))
        acquis = [
            ("les branches d'un nœud font 1", "Les branches d'un nœud font 1"),
            ("ce sont des probabilités conditionnelles", "Au 2e niveau : probabilités conditionnelles"),
            ("Un chemin : on multiplie", "Un chemin : on multiplie"),
            ("Un événement : on additionne", "Un événement : on additionne ses chemins"),
        ]
        lignes = VGroup(*[VGroup(self.coche(), self.t(txt, 36)).arrange(RIGHT, buff=0.3) for _, txt in acquis])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.55)
        if lignes.width > 10.0:
            lignes.scale_to_fit_width(10.0)
        lignes.move_to(P(-0.9, 0.55))
        for (mot, _), l in zip(acquis, lignes):
            self.au_mot(mot)
            self.play(FadeIn(l[1], shift=RIGHT * 0.2), run_time=0.6)
            self.play(Create(l[0]), run_time=0.4)
        self.au_mot("L'épisode 2")
        self.play(Write(self.chute("Épisode 2 : la formule des probabilités conditionnelles", color=VERT_OK,
                                   font_size=34)))
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_construire()
        self.ecran_regles()
        self.ecran_chemin()
        self.ecran_totales()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="09-abonne")
