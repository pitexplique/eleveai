# proba2_interpreter.py
# EleveAI — Maths 2de — série « Probabilités », épisode 16 (FIN de la série
# seconde) : INTERPRÉTER UN ÉCHANTILLON (micro : echantillon_interpreter),
# AVEC VOIX. Paysage 16:9, CEINTURE BLEUE. Short : proba2_interpreter_short.py.
#
# Le fil : le jus de goyave. Le fabricant annonce 10 % de bouteilles mal
# remplies ; un contrôleur en prélève 400. 1/√400 = 0,05 : la fréquence tombe
# le plus souvent entre 0,05 et 0,15. 52 → 0,13 normal ; 80 → 0,2 suspect ;
# dehors n'est pas une preuve ; piège : n = 25 → 1/√25 = 0,2 ; défi 30 → 0,075.
#
# Écrans : 00 garde · 01 la situation (bouteilles, une sur dix mal remplie,
# la caisse de 400) · 02 l'intervalle (n = 400, 1/√400 = 0,05, la bande verte
# sur l'axe de 0 à 1) · 03 52 → 0,13 dedans, normal · 04 80 → 0,2 dehors,
# suspect · 05 prudence (dehors → rare → on doute → on vérifie) · 06 le piège
# n = 25 (la bande s'élargit) · 07 défi · 07b correction · 08 ce que tu as
# appris · 09 fin.
#
# ⭐ Canvas du coach : la banque echantillonnage.bank.ts (micro
# echantillon_interpreter) n'a AUCUN canvas (questions en texte). Le visuel
# est celui de la mission : l'axe des fréquences de 0 à 1, l'intervalle en
# bande verte ; chaque fréquence se pose, dedans (vert, « normal ») ou dehors
# (rouge, « suspect »).
# ⛔ PAS D'ÉCART : seuls les nombres dits s'écrivent (l'axe ne porte que 0 et 1,
# graduations redondantes).
#
# Voix : manim/voix/seconde-proba-interpreter.json (débit −7).
# Rendu : python -m manim render -qh --disable_caching manim/scripts/seconde/proba2_interpreter.py Proba2Interpreter -o eleveai-maths-seconde-proba-interpreter --media_dir manim/scripts/seconde/media
# Puis copier le mp4 dans manim/sorties/seconde/maths/probabilites/16-interpreter/.

import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parent))

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Notion6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

JUS = "#FB7185"          # le jus de goyave (rose)
VERRE = "#E2E8F0"        # le contour de la bouteille
BOUCHON = "#15803D"      # le bouchon vert
BANDE = "#22C55E"        # la bande verte de l'intervalle
DEDANS = VERT_OK
DEHORS = ROUGE_ERREUR
GRIS = "#94A3B8"


class NotionSeconde16(Notion6e):
    identite = "Maths 2de — EleveAI"


def P(x, y):
    return np.array([x, y, 0.0])


# ── les dessins : la bouteille, la caisse ───────────────────────────────────

def bouteille(bien=True, s=1.0):
    """Une bouteille de jus de goyave : corps, goulot, bouchon, jus (index 0).
    Mal remplie : le jus s'arrête à mi-hauteur."""
    corps = RoundedRectangle(width=0.42, height=0.82, corner_radius=0.1, stroke_color=VERRE,
                             stroke_width=2.5, fill_opacity=0)
    goulot = Rectangle(width=0.18, height=0.24, stroke_color=VERRE, stroke_width=2.5,
                       fill_opacity=0).next_to(corps, UP, buff=0)
    bouchon = Rectangle(width=0.22, height=0.1, fill_color=BOUCHON, fill_opacity=1,
                        stroke_color=WHITE, stroke_width=1.5).next_to(goulot, UP, buff=0)
    h = 0.74 if bien else 0.36
    jus = RoundedRectangle(width=0.34, height=h, corner_radius=0.07, fill_color=JUS, fill_opacity=1,
                           stroke_width=0)
    jus.move_to(corps.get_bottom() + UP * (h / 2 + 0.04))
    return VGroup(jus, corps, goulot, bouchon).scale(s)


def rangee(n, mauvaises=(), s=1.0, buff=0.18):
    return VGroup(*[bouteille(k not in mauvaises, s) for k in range(n)]).arrange(RIGHT, buff=buff)


def caisse(lignes=4, cols=8, s=0.42, mauvaises=()):
    """Une caisse de bouteilles vue de face (un échantillon)."""
    b = VGroup(*[bouteille(k not in mauvaises, s) for k in range(lignes * cols)])
    b.arrange_in_grid(rows=lignes, cols=cols, buff=(0.08, 0.1))
    cadre = RoundedRectangle(width=b.width + 0.3, height=b.height + 0.3, corner_radius=0.12,
                             stroke_color="#A16207", stroke_width=4).move_to(b)
    return VGroup(b, cadre)


def fraction(num, den, fs=40, couleur=WHITE, c_num=None):
    """Une fraction empilée, en Text : num / trait / den."""
    n = Text(num, font_size=fs, color=c_num or couleur)
    d = Text(den, font_size=fs, color=couleur)
    w = max(n.width, d.width) + 0.16
    trait = Line(LEFT * w / 2, RIGHT * w / 2, stroke_width=fs / 12, color=couleur)
    n.next_to(trait, UP, buff=0.1)
    d.next_to(trait, DOWN, buff=0.1)
    return VGroup(n, trait, d)


def un_sur_racine(n, fs=40, couleur=WHITE):
    """1 sur racine de n, empilé : « 1 » sur « √n »."""
    return fraction("1", f"√{n}", fs, couleur)


# ── l'axe des fréquences, de 0 à 1, et la bande de l'intervalle ─────────────

class AxeFreq(VGroup):
    """L'axe des fréquences de 0 à vmax (graduations tous les `pas` ; seuls 0
    et 1 s'écrivent). self.pt(v) donne le point de la fréquence v.
    vmax = 1 : l'axe ENTIER (la petite règle du bas) ; vmax = 0,35 : la LOUPE."""

    def __init__(self, longueur=10.5, centre=ORIGIN, fs=26, h_bande=0.42, vmax=1.0, pas=0.1, sw=3):
        super().__init__()
        self.longueur, self.h_bande, self.fs, self.vmax = longueur, h_bande, fs, vmax
        self.x0 = centre[0] - longueur / 2
        self.y = centre[1]
        self.ligne = Line(self.pt(0) + LEFT * 0.15, self.pt(vmax) + RIGHT * 0.35, stroke_width=sw,
                          color=WHITE).add_tip(tip_length=0.18 * sw / 3, tip_width=0.16 * sw / 3)
        n = int(round(vmax / pas))
        g = 0.14 * h_bande / 0.42
        self.ticks = VGroup(*[Line(self.pt(k * pas) + DOWN * (g if k in (0, n) else g * 0.6),
                                   self.pt(k * pas) + UP * (g if k in (0, n) else g * 0.6),
                                   stroke_width=2, color=WHITE) for k in range(n + 1)])
        self.zero = Text("0", font_size=fs, color=WHITE).next_to(self.pt(0), DOWN, buff=0.22 * h_bande / 0.42 + 0.05)
        self.add(self.ligne, self.ticks, self.zero)
        if vmax == 1.0:
            self.un = Text("1", font_size=fs, color=WHITE).next_to(self.pt(1), DOWN,
                                                                  buff=0.22 * h_bande / 0.42 + 0.05)
            self.add(self.un)

    def pt(self, v):
        return P(self.x0 + self.longueur * v / self.vmax, self.y)

    def bande(self, a, b, couleur=BANDE):
        """La bande verte de a à b (clippée à 0), DERRIÈRE l'axe."""
        a = max(a, 0.0)
        r = Rectangle(width=self.pt(b)[0] - self.pt(a)[0], height=self.h_bande, fill_color=couleur,
                      fill_opacity=0.45, stroke_color=couleur, stroke_width=3)
        return r.move_to(P((self.pt(a)[0] + self.pt(b)[0]) / 2, self.y))

    def borne(self, v, texte, fs=None, couleur=BANDE):
        """Une borne de la bande, écrite SOUS l'axe (sous la ligne des 0 et 1)."""
        t = Text(texte, font_size=fs or self.fs, color=couleur)
        return t.move_to(self.pt(v) + DOWN * (0.42 + self.h_bande / 2 + t.height / 2))

    def jalon(self, v, texte, couleur, fs=None, haut=0.75):
        """Une fréquence posée : un point sur l'axe et sa valeur au-dessus."""
        d = Dot(self.pt(v), radius=0.11, color=couleur)
        d.set_stroke(WHITE, 1.5)
        t = Text(texte, font_size=fs or self.fs + 4, color=couleur, weight=BOLD)
        t.move_to(self.pt(v) + UP * haut)
        tige = DashedLine(t.get_bottom() + DOWN * 0.05, d.get_top(), stroke_width=2, color=couleur,
                          dash_length=0.06)
        return VGroup(d, t, tige)


# ── la vidéo ────────────────────────────────────────────────────────────────

C_AXE = P(-0.7, -0.35)   # le centre de la LOUPE (axe de 0 à 0,35)
C_MINI = P(-2.0, -2.55)  # le centre de l'axe entier (0 à 1), en petit
VMAX = 0.35


class Proba2Interpreter(NotionSeconde16):
    nom_voix = "seconde-proba-interpreter"

    def t(self, texte, font_size=36, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def ligne(self, morceaux, font_size=40, buff=0.2):
        return VGroup(*[m if isinstance(m, Mobject) else self.t(m, font_size, c)
                        for m, c in morceaux]).arrange(RIGHT, buff=buff)

    def insister(self, mob, run_time=0.3, k=1.5):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def axe(self):
        """La LOUPE : l'axe de 0 à 0,35, en grand."""
        return AxeFreq(centre=C_AXE, vmax=VMAX, pas=0.05)

    def mini(self):
        """L'axe ENTIER de 0 à 1, en petit, sous la loupe."""
        return AxeFreq(longueur=5.0, centre=C_MINI, fs=22, h_bande=0.2, vmax=1.0, pas=0.1, sw=2)

    def trapeze(self, a, m):
        """Le faisceau de la loupe : de [0 ; 0,35] du petit axe vers le grand."""
        pts = [m.pt(0), m.pt(VMAX), a.pt(VMAX), a.pt(0)]
        fond = Polygon(*pts, stroke_width=0, fill_color=WHITE, fill_opacity=0.06)
        bords = VGroup(DashedLine(pts[0], pts[3], stroke_width=1.5, color=GRIS, dash_length=0.08),
                       DashedLine(pts[1], pts[2], stroke_width=1.5, color=GRIS, dash_length=0.08))
        return VGroup(fond, bords)

    def axe_bande(self, n_label=True, avec_mini=True):
        """L'axe (et sa loupe) avec la bande de n = 400, déjà posés (rappel).
        a.mini, a.mini_bande, a.bornes : les morceaux à animer ensuite."""
        a = self.axe()
        b = a.bande(0.05, 0.15)
        g = VGroup()
        if avec_mini:
            m = self.mini()
            a.mini, a.mini_bande = m, m.bande(0.05, 0.15)
            g.add(self.trapeze(a, m), a.mini_bande, m)
        g.add(b, a)
        a.bornes = VGroup(a.borne(0.05, "0,05"), a.borne(0.15, "0,15"))
        if n_label:
            g.add(a.bornes)
        return a, b, g

    def poser(self, a, v, texte, couleur, mot=None, mot_couleur=None):
        """La fréquence tombe d'en haut sur l'axe ; puis son verdict au-dessus."""
        j = a.jalon(v, texte, couleur)
        d0 = j[0].copy().move_to(a.pt(v) + UP * 1.3)
        self.play(FadeIn(d0, scale=0.5), run_time=0.3)
        self.play(d0.animate.move_to(j[0]), run_time=0.4, rate_func=rate_functions.ease_in_quad)
        self.remove(d0)
        self.add(j[0])
        self.play(FadeIn(j[1], shift=UP * 0.15), Create(j[2]), Flash(j[0], color=couleur, line_length=0.18),
                  run_time=0.4)
        return j

    def verdict(self, j, texte, couleur, fs=36):
        m = self.t(texte, fs, couleur).next_to(j[1], UP, buff=0.18)
        self.play(FadeIn(m, scale=0.6), run_time=0.35)
        self.insister(m, 0.25, 1.35)
        return m

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("Interpréter un échantillon", 54, JAUNE_TITRE).to_edge(UP, buff=0.7)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.25)
        ech = echelle_ceintures("bleue").move_to(P(-0.6, -2.7))
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech), run_time=1.0)
        b = bouteille(True, 1.5).move_to(P(-0.6, 0.15))
        self.play(FadeIn(b, shift=UP * 0.2), run_time=0.4)
        self.au_mot("normal")
        n = self.t("normal ?", 44, DEDANS).move_to(P(-3.4, 0.15))
        self.play(FadeIn(n, shift=RIGHT * 0.2), run_time=0.35)
        self.au_mot("suspect")
        s = self.t("suspect ?", 44, DEHORS).move_to(P(2.2, 0.15))
        self.play(FadeIn(s, shift=LEFT * 0.2), run_time=0.35)
        self.insister(s, 0.25, 1.3)
        self.attendre_voix(marge=1.0)

    # ── 01 : la situation ───────────────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.titre_ecran("Le jus de goyave")
        tapis = Line(P(-6.6, -0.05), P(0.2, -0.05), stroke_width=8, color="#475569")
        r = rangee(10, mauvaises=(6,), s=1.0, buff=0.2).move_to(P(-3.2, 0.55))
        r.shift(LEFT * 7)
        self.play(Create(tapis), run_time=0.4)
        self.play(r.animate.shift(RIGHT * 7), run_time=1.6, rate_func=rate_functions.ease_out_cubic)
        self.au_mot("10 %")
        l1 = self.ligne([("10 %", JAUNE_TITRE), ("mal remplies", WHITE)], 40, 0.25).move_to(P(-3.2, 2.0))
        mal = r[6]
        cad = SurroundingRectangle(mal, color=DEHORS, buff=0.08)
        self.play(FadeIn(l1, shift=DOWN * 0.2), Create(cad), run_time=0.5)
        self.insister(VGroup(mal, cad), 0.3, 1.3)
        self.insister(l1[0], 0.25, 1.35)
        self.au_mot("Un contrôleur")
        c = caisse(5, 8, 0.38, mauvaises=(5, 19, 30)).move_to(P(3.0, 0.2))
        self.play(FadeIn(c, shift=LEFT * 0.3), run_time=0.6)
        self.au_mot("400")
        n = self.ligne([("400", JAUNE_TITRE), ("bouteilles", WHITE)], 40, 0.2).next_to(c, DOWN, buff=0.35)
        self.play(FadeIn(n, shift=UP * 0.2), run_time=0.4)
        self.insister(n[0], 0.25, 1.35)
        self.attendre_voix()

    # ── 02 : l'intervalle ───────────────────────────────────────────────────

    def ecran_intervalle(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-intervalle")
        self.titre_ecran("L'intervalle")
        a, m = self.axe(), self.mini()
        self.play(Create(m.ligne), FadeIn(m.ticks), FadeIn(m.zero), FadeIn(m.un), run_time=0.5)
        tr = self.trapeze(a, m)
        self.play(FadeIn(tr), Create(a.ligne), FadeIn(a.ticks), FadeIn(a.zero), run_time=0.7)
        self.au_mot("n égale 400")
        n = self.ligne([("n", BLEU_CALCUL), ("=", WHITE), ("400", JAUNE_TITRE)], 44, 0.2).move_to(P(-4.3, 1.75))
        self.play(FadeIn(n, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("1 sur racine de 400")
        f = un_sur_racine("400", 40, BLEU_CALCUL)
        f.move_to(P(-1.6, 1.75))
        self.play(FadeIn(f, shift=RIGHT * 0.2), run_time=0.45)
        self.au_mot("0,05.")
        r = self.ligne([("=", WHITE), ("0,05", VERT_OK)], 44, 0.2).next_to(f, RIGHT, buff=0.25)
        self.play(FadeIn(r, shift=RIGHT * 0.2), run_time=0.4)
        self.insister(r[1], 0.3)
        self.au_mot("La fréquence")
        fr = self.t("la fréquence", 34, WHITE).move_to(P(2.4, 0.85))
        self.play(FadeIn(fr, shift=LEFT * 0.2), run_time=0.4)
        self.au_mot("entre 0,05 et 0,15")
        b = a.bande(0.1, 0.1)
        b.stretch_to_fit_width(0.02)
        self.add(b)
        self.bring_to_front(a)
        cible = a.bande(0.05, 0.15)
        mb = m.bande(0.1, 0.1).stretch_to_fit_width(0.01)
        self.add(mb)
        self.bring_to_front(a, m)
        self.play(Transform(b, cible), Transform(mb, m.bande(0.05, 0.15)), run_time=0.8)
        self.bring_to_front(a, m)
        b1, b2 = a.borne(0.05, "0,05"), a.borne(0.15, "0,15")
        self.play(FadeIn(b1, shift=UP * 0.15), run_time=0.35)
        self.au_mot("0,15")
        self.play(FadeIn(b2, shift=UP * 0.15), run_time=0.35)
        self.insister(VGroup(b, b1, b2), 0.3, 1.25)
        fl = Arrow(fr.get_bottom(), b.get_top() + UP * 0.05, buff=0.15, color=BANDE, stroke_width=5)
        self.play(GrowArrow(fl), run_time=0.4)
        self.attendre_voix()

    # ── 03 / 04 : un cas, une fréquence qui se pose ─────────────────────────

    def ecran_cas(self, cle, titre, k, mot_k, mot_f, mot_v, v, texte_v, couleur, verdict,
                  mot_verdict, mauvaises, suite=None):
        self.clear()
        self.add_mascotte()
        self.dire(cle)
        self.titre_ecran(titre)
        a, b, g = self.axe_bande()
        self.add(g)
        self.au_mot(mot_k)
        r = rangee(8, mauvaises=mauvaises, s=0.75, buff=0.12)
        r.move_to(P(-6.4 + r.width / 2, 1.95))
        l = self.ligne([(str(k), JAUNE_TITRE), ("mal remplies", WHITE)], 38, 0.2)
        l.next_to(r, RIGHT, buff=0.4)
        self.play(FadeIn(r, lag_ratio=0.1), FadeIn(l, shift=LEFT * 0.2), run_time=0.6)
        self.insister(l[0], 0.25, 1.35)
        self.au_mot(mot_f)
        fr = fraction(str(k), "400", 38, WHITE, JAUNE_TITRE).next_to(l, RIGHT, buff=0.7)
        self.play(FadeIn(fr, shift=LEFT * 0.2), run_time=0.4)
        self.au_mot(mot_v)
        res = self.ligne([("=", WHITE), (texte_v, couleur)], 42, 0.2).next_to(fr, RIGHT, buff=0.25)
        self.play(FadeIn(res, shift=RIGHT * 0.2), run_time=0.35)
        j = self.poser(a, v, texte_v, couleur)
        self.au_mot(mot_verdict)
        if couleur == DEDANS:
            self.play(Indicate(b, color=BANDE, scale_factor=1.15), run_time=0.5)
        else:
            fl = DoubleArrow(a.pt(0.15) + UP * 0.38, a.pt(v) + UP * 0.38, buff=0.05, color=DEHORS,
                             stroke_width=4, tip_length=0.15)
            self.play(GrowFromCenter(fl), Indicate(b, color=DEHORS, scale_factor=1.1), run_time=0.5)
        m = self.verdict(j, verdict, couleur)
        if couleur == DEDANS:
            ok = self.coche(taille=0.2).next_to(m, RIGHT, buff=0.2)
            self.play(Create(ok), run_time=0.3)
        if suite:
            mot, texte = suite
            self.au_mot(mot)
            mach = self.ligne([(texte, ORANGE_RETENUE)], 36).move_to(P(3.4, 0.8))
            self.play(FadeIn(mach, shift=UP * 0.2), run_time=0.4)
            self.insister(mach, 0.25, 1.2)
        self.attendre_voix()
        return a, j

    # ── 05 : prudence ───────────────────────────────────────────────────────

    def ecran_prudence(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-prudence")
        self.titre_ecran("Attention")
        a, b, g = self.axe_bande()
        j = a.jalon(0.2, "0,2", DEHORS)
        self.add(g, j)
        self.au_mot("en dehors")
        self.play(Indicate(j[0], color=DEHORS, scale_factor=2.0), run_time=0.5)
        self.au_mot("pas une preuve")
        pr = self.ligne([("dehors", DEHORS), ("≠", WHITE), ("preuve", WHITE)], 40, 0.25).move_to(P(-0.7, 2.15))
        self.play(FadeIn(pr, shift=RIGHT * 0.2), run_time=0.4)
        self.insister(pr[1], 0.25, 1.4)
        etapes = [("C'est rare", "rare", WHITE), ("on doute", "on doute", ORANGE_RETENUE),
                  ("on vérifie", "on vérifie", VERT_OK)]
        mots = VGroup(*[self.t(texte, 38, c) for _, texte, c in etapes]).arrange(RIGHT, buff=1.0)
        mots.move_to(P(-0.7, 1.2))
        pr.move_to(P(-0.7, 2.15))
        prec = None
        for (mot, _, _), m in zip(etapes, mots):
            self.au_mot(mot)
            anims = [FadeIn(m, shift=RIGHT * 0.2)]
            if prec is not None:
                anims.append(GrowArrow(Arrow(prec.get_right(), m.get_left(), buff=0.12, color=GRIS,
                                             stroke_width=4, max_tip_length_to_length_ratio=0.3)))
            self.play(*anims, run_time=0.4)
            prec = m
        loupe = VGroup(Circle(radius=0.3, color=VERT_OK, stroke_width=5),
                       Line(P(0.21, -0.21), P(0.55, -0.55), color=VERT_OK, stroke_width=8))
        loupe.next_to(prec, RIGHT, buff=0.3)
        self.play(FadeIn(loupe, scale=0.5), run_time=0.35)
        self.play(loupe.animate.shift(j[0].get_center() - loupe[0].get_center()), run_time=0.7)
        self.attendre_voix()

    # ── 06 : le piège ───────────────────────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-piege")
        self.titre_ecran("Le piège")
        a, b, g = self.axe_bande()
        self.add(g)
        self.au_mot("la taille de l'échantillon")
        q = self.ligne([("n", BLEU_CALCUL), ("?", ORANGE_RETENUE)], 60, 0.15).move_to(P(-5.0, 1.75))
        self.play(FadeIn(q, scale=0.5), run_time=0.4)
        self.insister(q, 0.3, 1.4)
        self.au_mot("Sur 25 bouteilles")
        c = caisse(5, 5, 0.3).move_to(P(-5.0, 1.65))
        n = self.ligne([("n", BLEU_CALCUL), ("=", WHITE), ("25", JAUNE_TITRE)], 40, 0.18)
        n.next_to(c, RIGHT, buff=0.35)
        self.play(FadeOut(q), FadeIn(c, shift=DOWN * 0.2), FadeIn(n, shift=RIGHT * 0.2), run_time=0.5)
        self.insister(n[2], 0.25, 1.35)
        self.au_mot("beaucoup plus large")
        ancien = DashedVMobject(a.bande(0.05, 0.15).set_fill(opacity=0).set_stroke(WHITE, 2), num_dashes=30)
        large = a.bande(-0.1, 0.3)
        self.add(ancien)
        self.play(Transform(b, large), Transform(a.mini_bande, a.mini.bande(-0.1, 0.3)), FadeOut(a.bornes), run_time=0.9)
        self.bring_to_front(a, ancien)
        fl = DoubleArrow(a.pt(0) + UP * 0.45, a.pt(0.3) + UP * 0.45, buff=0, color=BANDE, stroke_width=5,
                         tip_length=0.18)
        self.play(GrowFromCenter(fl), run_time=0.4)
        self.insister(VGroup(b, fl), 0.3, 1.2)
        self.au_mot("1 sur racine de 25")
        f = un_sur_racine("25", 40, BLEU_CALCUL).move_to(P(1.2, 1.7))
        self.play(FadeIn(f, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("0,2")
        r = self.ligne([("=", WHITE), ("0,2", ORANGE_RETENUE)], 44, 0.2).next_to(f, RIGHT, buff=0.25)
        self.play(FadeIn(r, shift=RIGHT * 0.2), run_time=0.35)
        self.insister(r[1], 0.3)
        self.attendre_voix()

    # ── 07 : défi ───────────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        a, b, g = self.axe_bande(avec_mini=False)
        self.play(FadeIn(g), run_time=0.5)
        self.au_mot("Sur 400 bouteilles")
        c = caisse(4, 8, 0.32, mauvaises=(3, 20)).move_to(P(-4.3, 1.6))
        n = self.ligne([("400", JAUNE_TITRE), ("bouteilles", WHITE)], 36, 0.18).next_to(c, RIGHT, buff=0.35)
        n.shift(UP * 0.3)
        self.play(FadeIn(c, shift=DOWN * 0.2), FadeIn(n, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("30 mal remplies")
        m = self.ligne([("30", JAUNE_TITRE), ("mal remplies", WHITE)], 36, 0.18).next_to(n, DOWN, buff=0.25)
        m.align_to(n, LEFT)
        self.play(FadeIn(m, shift=RIGHT * 0.2), run_time=0.4)
        self.insister(m[0], 0.25, 1.4)
        self.au_mot("Normal ou suspect")
        q = VGroup(self.t("normal", 38, DEDANS), self.t("ou", 34, WHITE), self.t("suspect", 38, DEHORS),
                   self.t("?", 52, ORANGE_RETENUE)).arrange(RIGHT, buff=0.22).move_to(P(3.3, 0.55))
        pt = self.t("?", 56, ORANGE_RETENUE).move_to(a.pt(0.1) + UP * 0.75)
        self.play(FadeIn(q, shift=LEFT * 0.2), FadeIn(pt, shift=DOWN * 0.3), run_time=0.45)
        self.play(pt.animate.shift(RIGHT * 1.2), run_time=0.5)
        self.play(pt.animate.shift(LEFT * 1.6), run_time=0.6)
        self.play(pt.animate.shift(RIGHT * 0.4), run_time=0.3)
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=36)))
        self.attendre_voix(marge=2.0)

    # ── 07b : correction ────────────────────────────────────────────────────

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("07b-correction")
        self.titre_ecran("Correction")
        a, b, g = self.axe_bande(n_label=False)
        self.add(g)
        self.au_mot("30 sur 400")
        fr = fraction("30", "400", 40, WHITE, JAUNE_TITRE).move_to(P(0.2, 1.85))
        self.play(FadeIn(fr, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("0,075")
        res = self.ligne([("=", WHITE), ("0,075", DEDANS)], 44, 0.2).next_to(fr, RIGHT, buff=0.25)
        self.play(FadeIn(res, shift=RIGHT * 0.2), run_time=0.35)
        j = self.poser(a, 0.075, "0,075", DEDANS)
        self.au_mot("Entre 0,05")
        b1, b2 = a.borne(0.05, "0,05"), a.borne(0.15, "0,15")
        self.play(FadeIn(b1, shift=UP * 0.15), Indicate(b, color=BANDE, scale_factor=1.1), run_time=0.4)
        self.au_mot("et 0,15")
        self.play(FadeIn(b2, shift=UP * 0.15), run_time=0.35)
        self.au_mot(": normal")
        m = self.verdict(j, "normal", DEDANS)
        ok = self.coche(taille=0.2).next_to(m, RIGHT, buff=0.2)
        self.play(Create(ok), run_time=0.3)
        self.attendre_voix()

    # ── 08 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)))
        fs = 40
        l1 = VGroup(self.t("l'intervalle", fs, WHITE), self.t("p ±", 44, BLEU_CALCUL),
                    un_sur_racine("n", 36, BLEU_CALCUL)).arrange(RIGHT, buff=0.25)
        l2 = self.ligne([("Dedans :", DEDANS), ("fluctuation normale", WHITE)], fs, 0.22)
        l3 = self.ligne([("Dehors :", DEHORS), ("on doute", WHITE)], fs, 0.22)
        lignes = VGroup(*[VGroup(self.coche(), l).arrange(RIGHT, buff=0.3) for l in (l1, l2, l3)])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.5).scale(1.15).move_to(P(-0.9, 0.7))
        for mot, l in zip(["On calcule", "Dedans", "Dehors"], lignes):
            self.au_mot(mot)
            self.play(FadeIn(l[1], shift=RIGHT * 0.2), run_time=0.5)
            self.play(Create(l[0]), run_time=0.3)
        self.au_mot("Bravo")
        bravo = VGroup(self.t("Bravo, tu as fini", 38, VERT_OK),
                       self.t("les probabilités de seconde !", 36, VERT_OK)).arrange(DOWN, buff=0.15)
        bravo.move_to(P(-0.9, -2.45))
        self.play(Write(bravo), run_time=1.2)
        self.insister(bravo[0], 0.3, 1.2)
        self.attendre_voix(marge=1.0)

    # ── 09 : la fin (règle du 19/10) ────────────────────────────────────────

    def page_abonnement(self, voix="09-abonne"):
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
        self.ecran_intervalle()
        self.ecran_cas("03-cas1", "52 bouteilles", 52, "52 bouteilles", "52 sur 400", "0,13", 0.13, "0,13",
                       DEDANS, "normal", "dans l'intervalle", mauvaises=(2, 6))
        self.ecran_cas("04-cas2", "80 bouteilles", 80, "80 bouteilles", "80 sur 400", "0,2.", 0.2, "0,2",
                       DEHORS, "suspect", "en dehors", mauvaises=(1, 4, 6),
                       suite=("déréglée", "machine déréglée ?"))
        self.ecran_prudence()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="09-abonne")
