# proba6_lire.py
# EleveAI — Maths 6e — série « Probabilités », épisode 5 : lire une situation
# (micro : proba_lire), AVEC VOIX. Paysage 16:9, CEINTURE JAUNE.
# Short jumeau : proba6_lire_short.py (ceinture jaune).
#
# Écrans : 00 garde · 01 la tombola (50 tickets dans l'urne, 5 gagnants, on en
# tire un) · 02 repérer : toutes les issues (50), les favorables (5) ·
# 03 5 sur 50 = 1 sur 10 (UN gagnant par rangée de 10) → sur l'échelle ·
# 04 perdre : 50 − 5 = 45, 45 sur 50 → sur l'échelle · 05 le piège (« 5
# gagnants et 50 perdants » : 55 en tout) · 06 défi du sac (4 rouges,
# 6 bleues) · 06b correction (6 sur 10 sur l'échelle) · 07 ce que tu as
# appris · 08 abonnement.
#
# ⭐ Canvas repris du coach (lib/tutor-v4/components/ProbabilitesCanvas.tsx,
# banque 6e/maths/probabilites.bank.ts, micro proba_lire) :
#   · « billes » : billes en grille, colonnes = min(6, max(3, ⌈√n⌉)), rouge
#     #ef4444 / bleu #3b82f6, liseré ardoise, sur une carte blanche ;
#   · « tableau » (casesSurlignees en ambre) : les tickets gagnants sont
#     surlignés en ambre, les autres en gris (tickets des vidéos CM2).
# ⭐ L'échelle de 0 à 1 (fil rouge de la série) : chaque probabilité dite vient
# s'y poser. ⛔ « Pas d'écart » : ses bouts portent des MOTS (impossible,
# certain), aucun nombre que la voix ne dit pas.
#
# Voix : manim/voix/6e-proba-lire.json (débit −10).
# Rendu : python -m manim render -qh --disable_caching manim/scripts/6e/proba6_lire.py Proba6Lire -o eleveai-maths-6e-proba-lire --media_dir manim/scripts/6e/media
# Puis copier le mp4 dans manim/sorties/6e/maths/probabilites/05-lire/.

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
ARDOISE = "#0F172A"
CARTE_FOND = "#FFFFFF"
BORD_GRIS = "#CBD5E1"
ROUGE_BILLE = "#EF4444"
BLEU_BILLE = "#3B82F6"
GAGNANT = "#FBBF24"      # l'ambre du coach (case surlignée)
PERDANT = "#94A3B8"      # ticket ordinaire, gris

# l'urne : 10 colonnes × 5 rangées, UN gagnant par rangée (5 sur 50 = 1 sur 10)
COLS, ROWS = 10, 5
GAGNANTS = {(2, 0), (7, 1), (4, 2), (9, 3), (0, 4)}
URNE = (-3.0, 0.75)
TW, PX, PY = 0.56, 0.64, 0.48


def P(x, y):
    return np.array([x, y, 0.0])


def ticket(gagnant, w=0.8):
    """Un ticket : rectangle à encoches ; gagnant = ambre + étoile blanche,
    sinon gris. [0] corps, [1] encoches, [2] étoile (ou vide)."""
    h = w * 0.55
    corps = RoundedRectangle(width=w, height=h, corner_radius=w * 0.06,
                             fill_color=GAGNANT if gagnant else PERDANT, fill_opacity=1,
                             stroke_color=WHITE, stroke_width=2)
    enc = VGroup(*[Circle(radius=h * 0.16, fill_color=ARDOISE, fill_opacity=1, stroke_width=0)
                   .move_to(corps.get_edge_center(d)) for d in (LEFT, RIGHT)])
    etoile = VGroup()
    if gagnant:
        etoile = Star(5, outer_radius=h * 0.36, fill_color=WHITE, fill_opacity=1, stroke_color=ARDOISE,
                      stroke_width=1.5).move_to(corps)
    return VGroup(corps, enc, etoile)


def grille(gagnants, cols, rows, centre, w=TW, px=PX, py=PY):
    """Une grille de tickets ; renvoie (groupe, gagnants, perdants)."""
    g, gg, pp = VGroup(), VGroup(), VGroup()
    x0 = centre[0] - (cols - 1) * px / 2
    y0 = centre[1] + (rows - 1) * py / 2
    for r in range(rows):
        for c in range(cols):
            est = (c, r) in gagnants
            tk = ticket(est, w).move_to(P(x0 + c * px, y0 - r * py))
            g.add(tk)
            (gg if est else pp).add(tk)
    return g, gg, pp


def urne(centre=URNE, larg=7.0, haut=3.0):
    """L'urne de la tombola : une boîte transparente, une fente sur le dessus."""
    boite = RoundedRectangle(width=larg, height=haut, corner_radius=0.25, stroke_color=WHITE,
                             stroke_width=4, fill_color="#E0F2FE", fill_opacity=0.07).move_to(P(*centre))
    fente = RoundedRectangle(width=1.3, height=0.16, corner_radius=0.06, fill_color=ARDOISE, fill_opacity=1,
                             stroke_color=WHITE, stroke_width=3).move_to(boite.get_top())
    return VGroup(boite, fente)


# ── le canvas « billes » du coach ───────────────────────────────────────────

def bille_coach(couleur, lettre, r=0.3):
    d = Circle(radius=r, fill_color=couleur, fill_opacity=1, stroke_color=ARDOISE, stroke_width=3)
    l = Text(lettre, font_size=int(r * 70), color=WHITE, weight=BOLD)
    l.set_stroke(ARDOISE, width=2, background=True).move_to(d)
    return VGroup(d, l)


def carte_billes(elements, r=0.34, pas=0.85):
    """Le canvas « billes » : colonnes = min(6, max(3, ⌈√n⌉)). Renvoie (carte, billes)."""
    n = len(elements)
    cols = min(6, max(3, math.ceil(math.sqrt(n))))
    billes = VGroup()
    for i, (coul, lettre) in enumerate(elements):
        billes.add(bille_coach(coul, lettre, r).move_to(P((i % cols) * pas, -(i // cols) * pas)))
    lignes = math.ceil(n / cols)
    fond = RoundedRectangle(width=cols * pas + 0.3, height=lignes * pas + 0.3, corner_radius=0.2,
                            fill_color=CARTE_FOND, fill_opacity=1, stroke_color=BORD_GRIS, stroke_width=2)
    fond.move_to(P((cols - 1) * pas / 2, -(lignes - 1) * pas / 2))
    return VGroup(fond, billes), billes


def sac_autour(carte):
    """Le sac (dessiné autour de la carte du coach)."""
    corps = RoundedRectangle(width=carte.width + 0.6, height=carte.height + 0.6, corner_radius=0.45,
                             stroke_color=WHITE, stroke_width=4, fill_color="#E0F2FE",
                             fill_opacity=0.08).move_to(carte)
    col = Polygon(P(-0.6, 0), P(0.6, 0), P(0.35, 0.35), P(-0.35, 0.35), stroke_color=WHITE, stroke_width=4,
                  fill_color="#E0F2FE", fill_opacity=0.08).move_to(corps.get_top() + UP * 0.17)
    lien = Line(P(-0.42, 0), P(0.42, 0), color=ORANGE_RETENUE, stroke_width=7).move_to(corps.get_top() + UP * 0.2)
    return VGroup(corps, col, lien)


# ── l'échelle des probabilités (fil rouge de la série) ─────────────────────

X0, X1, YE = -5.6, 2.4, -2.45


def x_de(p):
    return X0 + (X1 - X0) * p


class Proba6Lire(Notion6e):
    nom_voix = "6e-proba-lire"

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

    def insister(self, mob, run_time=0.4):
        self.play(mob.animate.scale(1.5), run_time=run_time)
        self.play(mob.animate.scale(1 / 1.5), run_time=run_time)

    def sauter(self, mobs, h=0.18):
        self.play(*[m.animate.shift(UP * h) for m in mobs], run_time=0.2)
        self.play(*[m.animate.shift(DOWN * h) for m in mobs], run_time=0.3,
                  rate_func=rate_functions.ease_out_bounce)

    def barrer(self, mob, color=ROUGE_ERREUR, sw=7):
        return Line(mob.get_corner(DL) + LEFT * 0.1, mob.get_corner(UR) + RIGHT * 0.1,
                    stroke_width=sw, color=color)

    def urne_pleine(self, cache_gagnants=False):
        u = urne()
        g, gg, pp = grille(GAGNANTS, COLS, ROWS, URNE)
        if cache_gagnants:
            for tk in gg:
                tk[0].set_fill(PERDANT)
                tk[2].set_opacity(0)
        return u, g, gg, pp

    def echelle(self):
        barre = Line(P(X0, YE), P(X1, YE), stroke_width=12)
        barre.set_color([VERT_OK, JAUNE_TITRE, ORANGE_RETENUE, ROUGE_ERREUR])  # rouge à gauche (ordre inversé par Manim)
        bouts = VGroup(*[Line(P(x, YE - 0.2), P(x, YE + 0.2), stroke_width=5) for x in (X0, X1)])
        m0 = self.t("impossible", 30, ROUGE_ERREUR).next_to(P(X0, YE), DOWN, buff=0.3)
        m1 = self.t("certain", 30, VERT_OK).next_to(P(X1, YE), DOWN, buff=0.3)
        return VGroup(barre, bouts, m0, m1)

    def poser(self, frac, p, couleur, run_time=0.8):
        """La fraction vient se poser sur l'échelle, au-dessus de son point."""
        x = x_de(p)
        cible = frac.copy().scale_to_fit_height(0.85).move_to(P(x, YE + 0.35 + 0.425))
        point = Dot(P(x, YE), radius=0.12, color=couleur)
        self.play(Transform(frac, cible), run_time=run_time)
        self.play(GrowFromCenter(point), Flash(P(x, YE), color=couleur, line_length=0.25), run_time=0.4)
        return point

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("Lire une situation", 60, JAUNE_TITRE).to_edge(UP, buff=0.6)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.25)
        ech = echelle_ceintures("jaune").move_to(P(-0.6, -2.75))
        self.add(ech)
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), run_time=0.9)
        tks = VGroup(*[ticket(i in (1, 3), 1.1).move_to(P(-3.6 + i * 1.35, -0.2)) for i in range(5)])
        self.play(LaggedStart(*[FadeIn(tk, shift=DOWN * 0.4, scale=0.5) for tk in tks], lag_ratio=0.15),
                  run_time=0.9)
        loupe = VGroup(Circle(radius=0.55, stroke_color=WHITE, stroke_width=6),
                       Line(P(0.39, -0.39), P(0.8, -0.8), stroke_width=10, color=ORANGE_RETENUE))
        loupe.move_to(tks[0].get_center() + P(0.2, -0.2))
        self.play(FadeIn(loupe), run_time=0.2)
        self.play(loupe.animate.shift(RIGHT * 1.35 * 3), run_time=1.0, rate_func=rate_functions.ease_in_out_sine)
        self.attendre_voix(marge=0.8)

    # ── 01 : la tombola ─────────────────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.titre_ecran("La tombola")
        u, g, gg, pp = self.urne_pleine(cache_gagnants=True)
        self.play(FadeIn(u, scale=0.9), run_time=0.6)
        self.au_mot("50 tickets")
        self.play(LaggedStart(*[FadeIn(tk, shift=DOWN * 0.5) for tk in g], lag_ratio=0.03), run_time=1.3)
        l50 = self.ligne([("50", JAUNE_TITRE), ("tickets", WHITE)], 52).move_to(P(3.0, 1.7))
        self.play(FadeIn(l50, shift=LEFT * 0.2), run_time=0.4)
        self.au_mot("5 sont gagnants")
        l5 = self.ligne([("5", GAGNANT), ("gagnants", WHITE)], 52).move_to(P(3.0, 0.7))
        self.play(*[tk[0].animate.set_fill(GAGNANT) for tk in gg], *[tk[2].animate.set_opacity(1) for tk in gg],
                  FadeIn(l5, shift=LEFT * 0.2), run_time=0.5)
        self.sauter(gg)
        self.au_mot("Tu en tires un")
        tire = ticket(False, TW).move_to(u[1])
        tire[0].set_fill(WHITE)
        self.add(tire)
        self.play(tire.animate.scale(3.2).move_to(P(3.0, -0.6)), run_time=0.9,
                  rate_func=rate_functions.ease_out_back)
        q = Text("?", font_size=64, color=ARDOISE, weight=BOLD).move_to(tire)
        self.play(FadeIn(q, scale=0.4), run_time=0.3)
        tire.add(q)
        self.play(Wiggle(tire), run_time=0.6)
        self.attendre_voix()

    # ── 02 : repérer ────────────────────────────────────────────────────────

    def ecran_reperer(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-reperer")
        self.titre_ecran("Je repère")
        u, g, gg, pp = self.urne_pleine()
        self.add(u, g)
        self.au_mot("toutes les issues")
        cadre = SurroundingRectangle(g, color=BLEU_CALCUL, buff=0.12, stroke_width=5)
        l1 = self.t("toutes les issues", 38, BLEU_CALCUL).move_to(P(3.0, 1.8))
        self.play(Create(cadre), FadeIn(l1, shift=LEFT * 0.2), run_time=0.6)
        self.au_mot("50 tickets")
        n50 = self.t("50", 80, JAUNE_TITRE).next_to(l1, DOWN, buff=0.2)
        self.play(FadeIn(n50, scale=0.4), run_time=0.4)
        self.insister(n50, 0.3)
        self.au_mot("issues favorables")
        l2 = self.t("issues favorables", 38, VERT_OK).move_to(P(3.0, -0.2))
        cadres = VGroup(*[SurroundingRectangle(tk, color=VERT_OK, buff=0.05, stroke_width=4) for tk in gg])
        self.play(FadeOut(cadre), pp.animate.set_opacity(0.3), FadeIn(l2, shift=LEFT * 0.2),
                  Create(cadres), run_time=0.6)
        self.au_mot("5 tickets gagnants")
        n5 = self.t("5", 80, GAGNANT).next_to(l2, DOWN, buff=0.2)
        self.play(FadeIn(n5, scale=0.4), run_time=0.4)
        self.sauter(VGroup(*[VGroup(tk, c) for tk, c in zip(gg, cadres)]))
        self.attendre_voix()

    # ── 03 : calculer ───────────────────────────────────────────────────────

    def frac(self, a, b, font_size=60, ca=WHITE, cb=JAUNE_TITRE):
        return self.fraction(a, b, font_size, color=WHITE, color_num=ca, color_den=cb)

    def ecran_calculer(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-calculer")
        self.titre_ecran("Gagner")
        u, g, gg, pp = self.urne_pleine()
        ech = self.echelle()
        self.add(u, g)
        self.play(Create(ech[:2]), FadeIn(ech[2:]), run_time=0.7)
        self.au_mot("5 sur 50")
        f1 = self.frac(5, 50, 64, GAGNANT).move_to(P(1.9, 1.0))
        self.play(FadeIn(f1, shift=UP * 0.2), Indicate(gg, color=WHITE, scale_factor=1.3), run_time=0.6)
        self.insister(f1, 0.3)
        self.au_mot("C'est aussi")
        rangs = VGroup(*[SurroundingRectangle(VGroup(*g[r * COLS:(r + 1) * COLS]), color=BLEU_CALCUL,
                                              buff=0.04, stroke_width=4) for r in range(ROWS)])
        for r in range(ROWS):
            self.play(Create(rangs[r]), run_time=0.22)
        self.au_mot("1 sur 10")
        egal = self.t("=", 64).move_to(P(3.0, 1.0))
        f2 = self.frac(1, 10, 64, GAGNANT).move_to(P(4.1, 1.0))
        self.play(FadeIn(egal), FadeIn(f2, shift=UP * 0.2), FadeOut(rangs[1:]), run_time=0.5)
        self.play(Indicate(VGroup(rangs[0], g[:COLS]), color=JAUNE_TITRE, scale_factor=1.08), run_time=0.6)
        sur_ech = f2.copy()
        self.add(sur_ech)
        self.poser(sur_ech, 0.1, GAGNANT)
        mot = self.t("gagner", 26, GAGNANT).next_to(sur_ech, UP, buff=0.1)
        self.play(FadeIn(mot), run_time=0.3)
        self.attendre_voix()

    # ── 04 : perdre ─────────────────────────────────────────────────────────

    def ecran_perdre(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-perdre")
        self.titre_ecran("Perdre")
        u, g, gg, pp = self.urne_pleine()
        ech = self.echelle()
        f_g = self.frac(1, 10, 64, GAGNANT).scale_to_fit_height(0.85).move_to(P(x_de(0.1), YE + 0.775))
        mot_g = self.t("gagner", 26, GAGNANT).next_to(f_g, UP, buff=0.1)
        pt_g = Dot(P(x_de(0.1), YE), radius=0.12, color=GAGNANT)
        self.add(u, g, ech, f_g, mot_g, pt_g)
        self.au_mot("50 moins 5")
        calc = self.ligne([("50", JAUNE_TITRE), ("−", WHITE), ("5", GAGNANT)], 60).move_to(P(2.6, 1.7))
        self.play(FadeIn(calc, shift=LEFT * 0.2), run_time=0.4)
        croix = VGroup(*[self.barrer(tk, sw=5) for tk in gg])
        self.play(gg.animate.set_opacity(0.3), Create(croix), run_time=0.5)
        self.au_mot("45 tickets perdants")
        res = self.ligne([("=", WHITE), ("45", PERDANT)], 60).next_to(calc, RIGHT, buff=0.3)
        self.play(FadeIn(res, shift=LEFT * 0.2), run_time=0.4)
        self.play(Indicate(pp, color=WHITE, scale_factor=1.15), run_time=0.7)
        self.au_mot("45 sur 50")
        f = self.frac(45, 50, 64, PERDANT).move_to(P(3.0, 0.1))
        self.play(FadeIn(f, shift=UP * 0.2), run_time=0.4)
        self.insister(f, 0.3)
        self.poser(f, 0.9, PERDANT)
        mot = self.t("perdre", 26, PERDANT).next_to(f, UP, buff=0.1)
        self.play(FadeIn(mot), run_time=0.3)
        self.attendre_voix()

    # ── 05 : le piège ───────────────────────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-piege")
        self.play(Write(self.t("Le piège", 46, ROUGE_ERREUR).to_edge(UP)))
        self.au_mot("lire trop vite")
        vite = self.t("lire trop vite !", 38, ORANGE_RETENUE).move_to(P(3.2, 2.1))
        self.play(FadeIn(vite, shift=LEFT * 0.3), run_time=0.4)
        self.play(Wiggle(vite), run_time=0.5)
        self.au_mot("5 gagnants et")
        txt = Text("« 5 gagnants et 50 perdants »", font_size=34, color=ARDOISE)
        carte = RoundedRectangle(width=txt.width + 0.5, height=txt.height + 0.4, corner_radius=0.15,
                                 fill_color=CARTE_FOND, fill_opacity=1, stroke_color=BORD_GRIS, stroke_width=2)
        enonce = VGroup(carte, txt.move_to(carte)).move_to(P(-3.0, 2.1))
        gag = VGroup(*[ticket(True, TW).move_to(P(-3.2 + (i - 2) * PX, 1.0)) for i in range(5)])
        self.play(FadeIn(enonce, shift=DOWN * 0.2), run_time=0.4)
        self.play(LaggedStart(*[FadeIn(tk, shift=DOWN * 0.3) for tk in gag], lag_ratio=0.1), run_time=0.6)
        self.au_mot("50 perdants")
        per, _, _ = grille(set(), COLS, ROWS, P(-3.2, -0.85))
        self.play(LaggedStart(*[FadeIn(tk, shift=DOWN * 0.3) for tk in per], lag_ratio=0.02), run_time=1.0)
        self.au_mot("55 tickets en tout")
        tout = VGroup(gag, per)
        cadre = SurroundingRectangle(tout, color=JAUNE_TITRE, buff=0.15, stroke_width=5)
        l55 = self.ligne([("55", JAUNE_TITRE), ("en tout", WHITE)], 56).move_to(P(3.0, 0.4))
        self.play(Create(cadre), FadeIn(l55, scale=0.5), run_time=0.6)
        self.insister(l55[0], 0.3)
        self.au_mot("pas 50")
        pas = self.ligne([("pas", ROUGE_ERREUR), ("50", WHITE)], 56).move_to(P(3.0, -0.9))
        self.play(FadeIn(pas, shift=UP * 0.2), run_time=0.3)
        self.play(Create(self.barrer(pas[1])), run_time=0.3)
        self.attendre_voix()

    # ── 06 : défi ───────────────────────────────────────────────────────────

    def sac_du_defi(self, centre, s=1.0):
        elements = [(ROUGE_BILLE, "R")] * 4 + [(BLEU_BILLE, "B")] * 6
        carte, billes = carte_billes(elements)
        sac = sac_autour(carte)
        tout = VGroup(sac, carte).scale(s).move_to(centre)
        return tout, carte, billes

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("06-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        tout, carte, billes = self.sac_du_defi(P(-3.4, 0.3), 1.2)
        sac = tout[0]
        self.play(FadeIn(sac), FadeIn(carte[0]), run_time=0.5)
        self.au_mot("4 billes rouges")
        l1 = self.ligne([("4", ROUGE_BILLE), ("billes rouges", WHITE)], 44).move_to(P(2.9, 1.6))
        self.play(LaggedStart(*[FadeIn(b, scale=0.4) for b in billes[:4]], lag_ratio=0.15),
                  FadeIn(l1, shift=LEFT * 0.2), run_time=0.7)
        self.au_mot("6 billes bleues")
        l2 = self.ligne([("6", BLEU_BILLE), ("billes bleues", WHITE)], 44).move_to(P(2.9, 0.7))
        self.play(LaggedStart(*[FadeIn(b, scale=0.4) for b in billes[4:]], lag_ratio=0.12),
                  FadeIn(l2, shift=LEFT * 0.2), run_time=0.8)
        self.au_mot("tirer une bleue")
        q = self.ligne([("tirer une", WHITE), ("bleue", BLEU_BILLE), ("?", ORANGE_RETENUE)], 48).move_to(P(2.9, -0.6))
        self.play(FadeIn(q, scale=0.6), run_time=0.4)
        self.play(Indicate(q[1], color=BLEU_BILLE, scale_factor=1.3), run_time=0.6)
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=40)))
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("06b-correction")
        self.titre_ecran("Correction")
        tout, carte, billes = self.sac_du_defi(P(-3.6, 0.7), 0.95)
        ech = self.echelle()
        self.add(tout, ech)
        self.au_mot("4 plus 6")
        calc = self.ligne([("4", ROUGE_BILLE), ("+", WHITE), ("6", BLEU_BILLE)], 60).move_to(P(1.9, 1.7))
        self.play(FadeIn(calc, shift=LEFT * 0.2), run_time=0.4)
        self.au_mot("10 billes en tout")
        res = self.ligne([("=", WHITE), ("10", JAUNE_TITRE)], 60).next_to(calc, RIGHT, buff=0.3)
        cadre = SurroundingRectangle(billes, color=JAUNE_TITRE, buff=0.1, stroke_width=5)
        self.play(FadeIn(res, shift=LEFT * 0.2), Create(cadre), run_time=0.5)
        self.au_mot("6 bleues")
        self.play(FadeOut(cadre), billes[:4].animate.set_opacity(0.3), run_time=0.4)
        self.sauter(billes[4:])
        self.au_mot("6 sur 10")
        f = self.frac(6, 10, 64, BLEU_BILLE).move_to(P(2.6, -0.1))
        self.play(FadeIn(f, shift=UP * 0.2), run_time=0.4)
        self.insister(f, 0.3)
        self.poser(f, 0.6, BLEU_BILLE)
        self.attendre_voix()

    # ── 07 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)))
        self.au_mot("Je lis")
        jelis = self.t("Je lis :", 40, BLEU_CALCUL).move_to(P(-4.6, 2.3))
        self.play(FadeIn(jelis, shift=RIGHT * 0.2), run_time=0.4)
        acquis = [
            ("combien en tout", "Combien en tout ?"),
            ("combien de favorables", "Combien de favorables ?"),
            ("Je vérifie le total", "Je vérifie le total."),
            ("Et perdre", "Perdre, c'est le reste."),
        ]
        lignes = VGroup(*[VGroup(self.coche(), self.t(txt, 48)).arrange(RIGHT, buff=0.3) for _, txt in acquis])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.5)
        lignes.next_to(jelis, DOWN, buff=0.4).align_to(jelis, LEFT).shift(RIGHT * 0.5)
        for (mot, _), l in zip(acquis, lignes):
            self.au_mot(mot)
            self.play(FadeIn(l[1], shift=RIGHT * 0.2), run_time=0.5)
            self.play(Create(l[0]), run_time=0.35)
        self.au_mot("L'épisode 6")
        self.play(Write(self.chute("Épisode 6 : les défis", color=VERT_OK, font_size=40)))
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_reperer()
        self.ecran_calculer()
        self.ecran_perdre()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="08-abonne")
