# aire_composer.py
# EleveAI — Maths CM2 — série « Aire », épisode 06 : L'AIRE PAR DÉCOUPAGE (découper, ou enlever un morceau)
# (micro aire_composer, notion aire), AVEC VOIX. Paysage 16:9, CEINTURE VERTE.
# Short jumeau : cm2-aire-composer-short (gazon 30 − bac à sable 4 = 26 m²).
# Décor et métier : Nadia, SOIGNEUSE ANIMALIÈRE dans un parc animalier (centres : animaux, nature-ecologie).
# Le CM2, un cran au-dessus du CM1 : des mesures en mètres (plus de carreaux à compter), deux méthodes
# (découper en morceaux et ADDITIONNER, ou ENLEVER un trou d'un grand rectangle), un triangle dans le défi.
# Mapping micro → écrans : aire_composer = 02 (l'enclos en L découpé : 8 × 3 = 24, 4 × 3 = 12),
# 03 (on additionne : 24 + 12 = 36 m²), 04 (enlever : flamants 10 × 6 = 60, bassin 4 × 2 = 8, 60 − 8 = 52 m²),
# 06 (piège : deux morceaux qui se chevauchent, un coin compté deux fois ; ne rien oublier),
# questions 05 (B : 20 + 6 = 26 m²) et 07 (A : 45 − 9 = 36 m²), défi 08 (lémuriens : rectangle 6 × 4 = 24
# + triangle rectangle 4 × 3 ÷ 2 = 6 → 30 m²).
# Voix : manim/voix/cm2-aire-composer.json (validée le 14/11, Julie, débit −6) ;
# marques : aire_composer_marques.json (python manim/scripts/cm2/aire_marques_cm2.py composer).
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/cm2/aire_composer.py AireComposerCM2
# python -m manim render -qh --disable_caching manim/scripts/cm2/aire_composer.py AireComposerCM2 -o eleveai-maths-cm2-aire-composer --media_dir manim/scripts/cm2/media-aire-06
# Sortie : manim/sorties/cm2/maths/aire/06-composer/eleveai-maths-cm2-aire-composer.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from aire_cm2_commun import *  # noqa: E402,F403

SOL_C, SOL_B = "#d6d3d1", "#57534e"        # la terre nue (avant l'herbe)
HERBE_C, HERBE_B = "#86efac", "#166534"    # l'herbe, d'un seul tenant
P1_C, P1_B = "#4ade80", "#14532d"          # le premier morceau (vert)
P2_C, P2_B = "#fbbf24", "#78350f"          # le deuxième morceau (ambre)
EAU_C, EAU_B = "#38bdf8", "#0c4a6e"        # le bassin, la piscine
FONCE = "#0f172a"                          # texte posé sur la figure

# L'enclos en L (1 case = 1 m) : en haut 3 rangées de 8 (le premier), en dessous 3 rangées de 4 (le deuxième).
CASES_L = [(i, j) for j in (0, 1, 2) for i in range(8)] + [(i, j) for j in (3, 4, 5) for i in range(4)]
I_P1 = list(range(24))
I_P2 = list(range(24, 36))
# Le piège : un rectangle de 4 sur 6 (à gauche, toute la hauteur) chevauche le premier sur 4 × 3.
I_GAU = [k for k, (i, j) in enumerate(CASES_L) if i < 4]
I_CHEV = [k for k, (i, j) in enumerate(CASES_L) if i < 4 and j < 3]
# L'enclos des flamants : 10 sur 6 ; le bassin 4 sur 2 au milieu (colonnes 3-6, rangées 2-3).
BASSIN = [(i, j) for j in (2, 3) for i in (3, 4, 5, 6)]


def cote(mob, s, sens=LEFT, fs=30, couleur=JAUNE_TITRE, audit=True):
    """La mesure d'un côté, posée contre la figure ; audit=False : un nombre déjà dit (ou lu sur la figure)."""
    t = Text(s, font_size=fs, color=couleur, weight=BOLD).next_to(mob, sens, buff=0.18)
    return t if audit else hors_audit(t)


def pas_audit(m):
    """Un nombre redit (au mot, mais l'audit ne le compare pas à sa première fois)."""
    for f in m.get_family():
        f._pas_audit = True
    return m


def parties(g, idx):
    return VGroup(*[g[k] for k in idx])


def teinter(g, idx, c, b):
    return [g[k].animate.set_fill(c, 1).set_stroke(b) for k in idx]


def tortue(s=1.0):
    """Une tortue géante : la carapace bombée (écailles), la tête, les pattes."""
    pattes = VGroup(*[RoundedRectangle(width=0.32 * s, height=0.42 * s, corner_radius=0.1 * s, fill_color="#a8a29e",
                                       fill_opacity=1, stroke_color="#57534e", stroke_width=2)
                      .move_to(P(dx * s, -0.2 * s)) for dx in (-0.62, 0.55)])
    tete = Circle(0.24 * s, fill_color="#a8a29e", fill_opacity=1, stroke_color="#57534e", stroke_width=2) \
        .move_to(P(1.1 * s, 0.12 * s))
    cou = RoundedRectangle(width=0.45 * s, height=0.26 * s, corner_radius=0.1 * s, fill_color="#a8a29e",
                           fill_opacity=1, stroke_width=0).move_to(P(0.88 * s, 0.03 * s))
    oeil = Dot(P(1.18 * s, 0.18 * s), radius=0.045 * s, color=FONCE)
    carapace = AnnularSector(inner_radius=0, outer_radius=1.0 * s, angle=PI, start_angle=0, fill_color="#65a30d",
                             fill_opacity=1, stroke_color="#365314", stroke_width=4).stretch(0.72, 1)
    carapace.move_to(P(0, 0.33 * s))
    bord = RoundedRectangle(width=2.1 * s, height=0.2 * s, corner_radius=0.08 * s, fill_color="#3f6212",
                            fill_opacity=1, stroke_width=0).move_to(P(0, -0.02 * s))
    ecailles = VGroup(*[RegularPolygon(6, fill_color="#a3e635", fill_opacity=0.9, stroke_color="#365314",
                                       stroke_width=2).scale(0.17 * s).move_to(P(x * s, y * s))
                        for x, y in ((-0.45, 0.3), (0, 0.45), (0.45, 0.3), (-0.2, 0.15), (0.22, 0.15))])
    return VGroup(pattes, cou, tete, oeil, carapace, bord, ecailles)


def flamant(s=1.0):
    """Un flamant rose sur une patte."""
    rose = "#f472b6"
    corps = Ellipse(width=0.62 * s, height=0.34 * s, fill_color=rose, fill_opacity=1, stroke_width=0) \
        .move_to(P(0, 0.1 * s))
    aile = Ellipse(width=0.36 * s, height=0.18 * s, fill_color="#ec4899", fill_opacity=1, stroke_width=0) \
        .move_to(P(0.06 * s, 0.13 * s))
    cou = CubicBezier(P(-0.22 * s, 0.18 * s), P(-0.45 * s, 0.45 * s), P(-0.05 * s, 0.6 * s), P(-0.2 * s, 0.82 * s),
                      stroke_color=rose, stroke_width=9 * s)
    tete = Circle(0.09 * s, fill_color=rose, fill_opacity=1, stroke_width=0).move_to(P(-0.2 * s, 0.86 * s))
    bec = Polygon(P(-0.27 * s, 0.88 * s), P(-0.42 * s, 0.8 * s), P(-0.27 * s, 0.82 * s), fill_color=FONCE,
                  fill_opacity=1, stroke_width=0)
    patte = Line(P(0.05 * s, -0.05 * s), P(0.05 * s, -0.55 * s), stroke_color="#db2777", stroke_width=4)
    pliee = VGroup(Line(P(0.1 * s, -0.05 * s), P(0.25 * s, -0.25 * s), stroke_color="#db2777", stroke_width=4),
                   Line(P(0.25 * s, -0.25 * s), P(0.07 * s, -0.3 * s), stroke_color="#db2777", stroke_width=4))
    return VGroup(patte, pliee, cou, corps, aile, tete, bec)


class AireComposerCM2(LigneAlignee, PaysageAireCM2G):
    nom_voix = "cm2-aire-composer"
    fichier_marques = "aire_composer_marques.json"
    ceinture = "verte"

    def enclos_l(self, c=0.45, pos=P(-3.5, 0.2), etat="parties"):
        """L'enclos en L ; etat : "sol" (terre), "herbe" (d'un seul tenant), "parties" (vert + ambre)."""
        g = figure_cases(CASES_L, c, SOL_C, SOL_B).move_to(pos)
        if etat == "herbe":
            g.set_fill(HERBE_C).set_stroke(HERBE_B)
        elif etat == "parties":
            for k in I_P1:
                g[k].set_fill(P1_C).set_stroke(P1_B)
            for k in I_P2:
                g[k].set_fill(P2_C).set_stroke(P2_B)
        return g

    def flamants(self, c=0.38, pos=P(-3.6, 0.4)):
        """L'enclos des flamants : 10 sur 6 d'herbe, le bassin de 4 sur 2 ; .bassin, .herbe."""
        g = rect_cases(10, 6, c, HERBE_C, HERBE_B).move_to(pos)
        g.bassin = VGroup(*[g[j * 10 + i] for i, j in BASSIN])
        g.herbe = VGroup(*[q for q in g if q not in g.bassin])
        g.bassin.set_fill(EAU_C).set_stroke(EAU_B)
        return g

    def lemuriens(self, c=0.45, pos=P(-4.0, 0.6), couleurs=True):
        """Le rectangle de 6 sur 4 et le triangle rectangle (côtés de l'angle droit 4 et 3) collé à droite."""
        r = rect_cases(6, 4, c, VERT_F if couleurs else SOL_C, "#14532d" if couleurs else SOL_B).move_to(pos)
        hd, bd = r.get_corner(UR), r.get_corner(DR)
        tri = Polygon(hd, bd, bd + RIGHT * 3 * c, fill_color=TRIANGLE_C if couleurs else SOL_C, fill_opacity=1,
                      stroke_color=TRIANGLE_B if couleurs else SOL_B, stroke_width=4)
        a = 0.2
        angle = VGroup(Line(bd + UP * a, bd + UP * a + RIGHT * a, color=WHITE, stroke_width=3),
                       Line(bd + UP * a + RIGHT * a, bd + RIGHT * a, color=WHITE, stroke_width=3))
        g = VGroup(r, tri, angle)
        g.rect, g.tri, g.angle, g.c = r, tri, angle, c
        g.cote_droit = Line(hd, bd, color=JAUNE_TITRE, stroke_width=8)
        g.base = Line(bd, bd + RIGHT * 3 * c)
        return g

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("L'aire par découpage", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("L'aire par découpage")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q = self.bloc(["Comment calculer l'aire", "d'une figure qui n'est", "pas un rectangle ?"], 36)
        q.move_to(P(0, 0.3)).align_to(P(-6.2, 0), LEFT)
        g = self.enclos_l(0.36, P(3.7, 0.35))
        self.au_mot("Comment calculer")
        self.play(FadeIn(q, shift=UP * 0.2), LaggedStart(*[FadeIn(x, scale=1.6) for x in g], lag_ratio=0.03),
                  run_time=1.0)
        self.attendre_voix(marge=0.6)

    # ── 01 : Nadia, soigneuse animalière ────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        na = nadia(1.0).move_to(P(-5.0, 0.1))
        self.au_mot("Voici Nadia")
        nom = self.t("Nadia", 42, BLEU_CALCUL).next_to(na, UP, buff=0.2)
        self.play(FadeIn(na, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        met = self.bloc(["soigneuse dans un", "parc animalier"], 24, BLEU_CALCUL).next_to(na, DOWN, buff=0.18)
        for x in met:
            x.set_x(na.get_x())
        self.au_mot("soigneuse dans un")
        self.play(FadeIn(met[0], shift=DOWN * 0.1), run_time=0.3)
        self.au_mot("un parc animalier")
        self.play(FadeIn(met[1], shift=DOWN * 0.1), run_time=0.3)
        g = self.enclos_l(0.4, P(-1.1, 0.75), etat="sol")
        to = tortue(0.85).move_to(P(3.6, 0.9))
        self.au_mot("les tortues géantes")
        self.play(LaggedStart(*[FadeIn(x, scale=1.3) for x in g], lag_ratio=0.02), FadeIn(to, shift=LEFT * 0.3),
                  run_time=0.7)
        self.au_mot("en forme de L")
        tl = self.t("en forme de L", 28, GRAY_B).next_to(g, DOWN, buff=0.2)
        self.play(FadeIn(tl), Indicate(g, color=JAUNE_TITRE, scale_factor=1.04), run_time=0.45)
        self.au_mot("tout le sol d'herbe")
        self.play(LaggedStart(*[q.animate.set_fill(HERBE_C).set_stroke(HERBE_B) for q in g], lag_ratio=0.02),
                  run_time=0.8)
        self.au_mot("Combien de mètres carrés")
        q = self.t("Combien de m² d'herbe ?", 40, JAUNE_TITRE).move_to(P(-0.6, -2.55))
        self.play(FadeIn(q, shift=UP * 0.15), Wiggle(to), run_time=0.5)
        self.attendre_voix()

    # ── 02 : découper en deux rectangles ────────────────────────────────────
    def ecran_decouper(self):
        self.ecran("02-decouper")
        g = self.enclos_l(etat="herbe")
        self.add(g)
        self.au_mot("n'est pas un rectangle")
        l1 = self.t("Ce n'est pas un rectangle.", 34, ROUGE_ERREUR)
        self.col(l1, 2.65)
        self.play(FadeIn(l1, shift=UP * 0.1), Wiggle(g), run_time=0.6)
        l2 = self.bloc(["Mais on peut le découper", "en deux rectangles."], 34, JAUNE_TITRE)
        self.col(l2, 1.75)
        self.au_mot("Mais on peut le découper")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("en deux rectangles")
        c = g[0].width
        coin = g[24].get_corner(UL)
        trait = DashedLine(coin + LEFT * 0.25, coin + RIGHT * (4 * c + 0.15), color=JAUNE_TITRE, stroke_width=6,
                           dash_length=0.12).set_z_index(5)
        self.play(FadeIn(l2[1], shift=UP * 0.1), Create(trait), run_time=0.4)
        p1, p2 = parties(g, I_P1), parties(g, I_P2)
        # le premier : 8 mètres sur 3
        self.au_mot("Le premier : 8")
        l3 = self.ligne([("Le premier :", P1_C), ("8 m", WHITE), ("sur 3 m", WHITE)], 34)
        self.col(l3, 0.75)
        c8 = cote(p1, "8 m", UP, couleur=P1_C, audit=False)
        self.play(FadeIn(l3[0], shift=UP * 0.1), FadeIn(l3[1], shift=UP * 0.1), FadeIn(c8),
                  *teinter(g, I_P1, P1_C, P1_B), run_time=0.25)
        r3 = cote(p1, "3 m", LEFT, couleur=P1_C, audit=False)
        self.au_mot("sur 3, 24")
        l4a = VGroup(hors_audit(self.t("8 ×", 38, BLEU_D)), hors_audit(self.t("3", 38, BLEU_D))).arrange(RIGHT, buff=0.24)
        l4b = self.t("= 24 m²", 38, VERT_OK)
        l4 = VGroup(l4a, l4b).arrange(RIGHT, buff=0.3)
        self.col(l4, 0.1)
        self.play(FadeIn(l3[2], shift=UP * 0.1), FadeIn(r3), FadeIn(l4, shift=UP * 0.1), Indicate(p1, color=P1_C, scale_factor=1.03), run_time=0.4)
        # le deuxième : 4 mètres sur 3
        self.au_mot("Le deuxième : 4")
        l5 = self.ligne([("Le deuxième :", P2_C), ("4 m", WHITE), ("sur 3 m", WHITE)], 34)
        self.col(l5, -0.8)
        c4 = cote(p2, "4 m", DOWN, couleur=P2_C, audit=False)
        self.play(FadeIn(l5[0], shift=UP * 0.1), FadeIn(l5[1], shift=UP * 0.1), FadeIn(c4),
                  *teinter(g, I_P2, P2_C, P2_B), run_time=0.25)
        r3b = cote(p2, "3 m", LEFT, couleur=P2_C, audit=False)
        self.au_mot("sur 3, 12")
        l6a = VGroup(hors_audit(self.t("4 ×", 38, BLEU_D)), hors_audit(self.t("3", 38, BLEU_D))).arrange(RIGHT, buff=0.24)
        l6b = self.t("= 12 m²", 38, VERT_OK)
        l6 = VGroup(l6a, l6b).arrange(RIGHT, buff=0.3)
        self.col(l6, -1.45)
        self.play(FadeIn(l5[2], shift=UP * 0.1), FadeIn(r3b), FadeIn(l6, shift=UP * 0.1), Indicate(p2, color=P2_C, scale_factor=1.04), run_time=0.4)
        self.attendre_voix()

    # ── 03 : on additionne les deux morceaux ────────────────────────────────
    def ecran_assembler(self):
        self.ecran("03-assembler")
        g = self.enclos_l()
        p1, p2 = parties(g, I_P1), parties(g, I_P2)
        p2.shift(DOWN * 0.15)  # les deux morceaux, un peu écartés
        e1 = m2("24 m²", 32, FONCE).move_to(p1)
        e2 = m2("12 m²", 32, FONCE).move_to(p2)
        self.add(g, e1, e2)
        l1 = self.bloc(["On additionne", "les deux morceaux :"], 36, JAUNE_TITRE)
        self.col(l1, 2.2)
        self.au_mot("On additionne")
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("les deux morceaux")
        self.play(FadeIn(l1[1], shift=UP * 0.1), p2.animate.shift(UP * 0.15), e2.animate.shift(UP * 0.15),
                  run_time=0.45)
        self.au_mot("24 plus 12")
        l2 = self.ligne([("24 + 12", BLEU_D), ("= 36", VERT_OK)], 50, buff=0.3)
        self.col(l2, 0.8)
        self.play(FadeIn(l2[0], scale=1.2), Indicate(e1, scale_factor=1.3), Indicate(e2, scale_factor=1.3),
                  run_time=0.45)
        self.au_mot("12, 36")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("d'herbe")
        res = hors_audit(self.gros("36 m² d'herbe", fs=46))
        self.col(res, -0.5)
        self.play(FadeIn(res, scale=1.2), FadeOut(e1), FadeOut(e2),
                  LaggedStart(*[q.animate.set_fill(HERBE_C).set_stroke(HERBE_B) for q in g], lag_ratio=0.015),
                  run_time=0.8)
        self.insister(res, 1.1, 0.25)
        self.attendre_voix()

    # ── 04 : autre méthode, enlever (les flamants) ──────────────────────────
    def ecran_enlever(self):
        self.ecran("04-enlever")
        self.au_mot("Autre méthode : enlever")
        tit = self.t("Autre méthode : enlever", 38, JAUNE_TITRE)
        self.col(tit, 2.65)
        self.play(Write(tit), run_time=0.4)
        g = self.flamants()
        fl = VGroup(flamant(1.0), flamant(1.0)).arrange(RIGHT, buff=0.6).move_to(P(-3.6, -1.9))
        self.au_mot("L'enclos des flamants")
        self.play(LaggedStart(*[FadeIn(x, scale=1.3) for x in g], lag_ratio=0.008), FadeIn(fl, shift=UP * 0.2),
                  run_time=0.7)
        self.au_mot("rectangle de 10")
        l1 = self.ligne([("Rectangle :", HERBE_C), ("10 m", WHITE), ("sur 6 m", WHITE)], 34)
        self.col(l1, 1.85)
        c10 = cote(g, "10 m", UP, fs=28, couleur=HERBE_C, audit=False)
        self.play(FadeIn(l1[0], shift=UP * 0.1), FadeIn(l1[1], shift=UP * 0.1), FadeIn(c10), run_time=0.2)
        self.au_mot("10 mètres sur 6")
        r6 = cote(g, "6 m", LEFT, fs=28, couleur=HERBE_C, audit=False)
        self.play(FadeIn(l1[2], shift=UP * 0.1), FadeIn(r6), run_time=0.3)
        self.au_mot("un bassin de 4")
        l2 = self.ligne([("Bassin :", EAU_C), ("4 m", WHITE), ("sur 2 m", WHITE)], 34)
        self.col(l2, 1.15)
        self.play(FadeIn(l2[0], shift=UP * 0.1), FadeIn(l2[1], shift=UP * 0.1),
                  Indicate(g.bassin, color=EAU_C, scale_factor=1.1), run_time=0.2)
        self.au_mot("4 mètres sur 2")
        self.play(FadeIn(l2[2], shift=UP * 0.1), run_time=0.3)
        l3a = self.ligne([("L'herbe =", HERBE_C), ("le grand rectangle", WHITE)], 34)
        l3b = self.t("− le bassin", 34, EAU_C)
        l3 = VGroup(l3a, l3b).arrange(DOWN, aligned_edge=LEFT, buff=0.14)
        self.col(l3, 0.15)
        l3b.align_to(l3a[1], LEFT)
        self.au_mot("L'herbe")
        self.play(FadeIn(l3a[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("le grand rectangle")
        self.play(FadeIn(l3a[1], shift=UP * 0.1), Indicate(g, color=WHITE, scale_factor=1.02), run_time=0.25)
        trou = Rectangle(width=g.bassin.width, height=g.bassin.height, stroke_color=ROUGE_ERREUR,
                         stroke_width=6).move_to(g.bassin).set_z_index(5)
        self.au_mot("le bassin : 60")
        l4 = self.ligne([("60", BLEU_D), ("− 8", BLEU_D), ("= 52 m²", VERT_OK)], 48, buff=0.25)
        self.col(l4, -0.95)
        self.play(FadeIn(l3b, shift=UP * 0.1), Create(trou), FadeIn(l4[0], scale=1.2), run_time=0.25)
        self.au_mot("60 moins 8")
        self.play(FadeIn(l4[1], shift=UP * 0.1), g.bassin.animate.set_fill(opacity=0.12), run_time=0.2)
        self.bring_to_front(trou)
        self.au_mot("8, 52")
        self.play(FadeIn(l4[2], shift=UP * 0.1), Indicate(g.herbe, color=VERT_OK, scale_factor=1.02), run_time=0.45)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (réponse B) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        c = 0.42
        a = rect_cases(5, 4, c, P1_C, P1_B)
        b = rect_cases(3, 2, c, P2_C, P2_B)
        b.next_to(a, RIGHT, buff=0).align_to(a, DOWN)
        fig = VGroup(a, b).move_to(P(-3.75, 1.55))
        cotes = VGroup(cote(a, "5 m", UP, fs=26, couleur=P1_C, audit=False),
                       cote(a, "4 m", LEFT, fs=26, couleur=P1_C, audit=False),
                       cote(b, "3 m", DOWN, fs=26, couleur=P2_C, audit=False),
                       cote(b, "2 m", RIGHT, fs=26, couleur=P2_C, audit=False))

        def autres_q(sc):
            sc.play(FadeIn(fig), FadeIn(cotes), run_time=0.35)

        self.question_gauche("05-question", "05b-reponse",
                             ["Un rectangle de 5 m sur 4 m", "et un rectangle de 3 m sur 2 m.",
                              "Quelle est son aire ?"],
                             [self.choix("14 m²"), self.choix("26 m²"), self.choix("120 m²")], 1,
                             ["5 × 4 = 20.", "3 × 2 = 6.", "On additionne :", "20 + 6 = 26 m²."],
                             0.05, couper={0: ("5 × 4", "= 20."), 1: ("3 × 2", "= 6."), 3: ("20 + 6", "= 26 m².")},
                             mot_q="Une figure", autres_q=autres_q)

    # ── 06 : le piège (chevaucher, oublier) ─────────────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        self.au_mot("Attention")
        tit = self.t("Attention au piège !", 46, ROUGE_ERREUR)
        gauche(tit, -6.2, 3.05)
        self.play(Write(tit), run_time=0.35)
        g = self.enclos_l(etat="herbe", pos=P(-3.6, 0.0))
        self.add(g)
        l1 = self.bloc(["Chaque morceau ne", "compte qu'une fois."], 34, JAUNE_TITRE)
        self.col(l1, 2.0)
        self.au_mot("chaque morceau ne")
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("qu'une fois")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("se chevauchent")
        l2 = self.bloc(["Deux rectangles", "qui se chevauchent :"], 32)
        self.col(l2, 0.85)
        for f in l2[0].get_family():  # « deux » serait cherché dans « deux fois », dit plus tard
            f.sans_synchro = True
        cad_h = contour(parties(g, I_P1), CARREAU, 8)
        cad_g = contour(parties(g, I_GAU), P2_C, 8)
        self.play(FadeIn(l2, shift=UP * 0.1), Create(cad_h), Create(cad_g), run_time=0.7)
        self.au_mot("le même coin")
        l3 = self.bloc(["le même coin", "compté deux fois !"], 32, ROUGE_ERREUR)
        self.col(l3, -0.3)
        ch = parties(g, I_CHEV)
        self.play(FadeIn(l3, shift=UP * 0.1), ch.animate.set_fill(ROUGE_F).set_stroke("#7f1d1d"), run_time=0.5)
        self.play(Indicate(ch, color=ROUGE_ERREUR, scale_factor=1.1), run_time=0.5)
        self.au_mot("sans chevauchement")
        res = self.gros("Sans chevauchement,", fs=34)
        gauche(res, -6.1, -2.05)
        self.play(FadeIn(res, scale=1.1), FadeOut(cad_h), FadeOut(cad_g),
                  *teinter(g, I_P1, P1_C, P1_B), *teinter(g, I_P2, P2_C, P2_B), run_time=0.6)
        self.au_mot("sans oublier de morceau")
        res2 = self.gros("sans oublier de morceau.", fs=34)
        gauche(res2, -6.1, -3.1)
        trou = parties(g, I_P2).copy().set_fill(opacity=0).set_stroke(ORANGE_RETENUE, 6)
        self.play(FadeIn(res2, scale=1.1), parties(g, I_P2).animate.set_fill(opacity=0.15), Create(trou),
                  run_time=0.5)
        self.play(parties(g, I_P2).animate.set_fill(opacity=1), FadeOut(trou), run_time=0.5)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (réponse A) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        g = rect_cases(9, 5, 0.36, HERBE_C, HERBE_B).move_to(P(-3.8, 1.75))
        pisc = VGroup(*[g[j * 9 + i] for j in (1, 2, 3) for i in (5, 6, 7)])
        pisc.set_fill(EAU_C).set_stroke(EAU_B)
        cotes = VGroup(cote(g, "9 m", UP, fs=26, couleur=HERBE_C, audit=False),
                       cote(g, "5 m", LEFT, fs=26, couleur=HERBE_C, audit=False))

        def autres_q(sc):
            sc.play(FadeIn(g), FadeIn(cotes), run_time=0.35)

        def apres(sc):
            sc.play(pisc.animate.set_fill(opacity=0.12), run_time=0.25)

        self.question_gauche("07-question", "07b-reponse",
                             ["Un jardin de 9 m sur 5 m,", "une piscine carrée de 3 m", "de côté.",
                              "Quelle aire pour la pelouse ?"],
                             [self.choix("36 m²"), self.choix("54 m²"), self.choix("42 m²")], 0,
                             ["Jardin : 9 × 5 = 45.", "Piscine : 3 × 3 = 9.", "On enlève :", "45 − 9 = 36 m²."],
                             0.35, couper={0: ("Jardin : 9 × 5", "= 45."), 1: ("Piscine : 3 × 3", "= 9."),
                                           3: ("45 − 9", "= 36 m².")},
                             mot_q="Un jardin", autres_q=autres_q, autres_r=apres)

    # ── 08 : le défi (les lémuriens : rectangle + triangle) ─────────────────
    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        g = self.lemuriens()
        self.au_mot("des lémuriens")
        l0 = self.t("Les lémuriens :", 32, GRAY_B)
        self.col(l0, 2.35, 0.35)
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(g.rect, scale=0.9), run_time=0.5)
        self.au_mot("rectangle de 6")
        l1 = self.ligne([("Rectangle :", VERT_F), ("6 m", WHITE), ("sur 4 m", WHITE)], 34)
        self.col(l1, 1.7, 0.35)
        c6 = cote(g.rect, "6 m", UP, couleur=VERT_F, audit=False)
        self.play(FadeIn(l1[0], shift=UP * 0.1), FadeIn(l1[1], shift=UP * 0.1), FadeIn(c6), run_time=0.2)
        self.au_mot("6 mètres sur 4")
        r4 = cote(g.rect, "4 m", LEFT, couleur=VERT_F, audit=False)
        self.play(FadeIn(l1[2], shift=UP * 0.1), FadeIn(r4), run_time=0.3)
        self.au_mot("un triangle rectangle")
        l2 = self.t("+ un triangle rectangle", 34, TRIANGLE_C)
        self.col(l2, 1.05, 0.35)
        self.play(FadeIn(l2, shift=UP * 0.1), FadeIn(g.tri, shift=LEFT * 0.3), Create(g.angle), run_time=0.4)
        l3 = self.ligne([("Angle droit :", TRIANGLE_C), ("4 m", WHITE), ("et 3 m", WHITE)], 34)
        self.col(l3, 0.4, 0.35)
        self.au_mot("l'angle droit")
        self.play(FadeIn(l3[0], shift=UP * 0.1), Indicate(g.angle, color=WHITE, scale_factor=1.6), run_time=0.35)
        self.au_mot("mesurent 4")
        self.play(FadeIn(l3[1], shift=UP * 0.1), Create(g.cote_droit), run_time=0.2)
        self.au_mot("4 mètres et 3")
        c3 = cote(g.base, "3 m", DOWN, couleur=TRIANGLE_C, audit=False)
        self.play(FadeIn(l3[2], shift=UP * 0.1), FadeIn(c3), Indicate(g.tri, color=TRIANGLE_C, scale_factor=1.05),
                  run_time=0.4)
        self.au_mot("l'aire totale")
        q = self.bloc(["Quelle est", "l'aire totale ?"], 38, JAUNE_TITRE)
        self.col(q, -0.6, 0.35)
        self.play(FadeIn(q, shift=UP * 0.1), FadeOut(g.cote_droit), Wiggle(g), run_time=0.5)
        self.pause_defi(y=-1.75)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        g = self.lemuriens()
        c = g.c
        cotes = VGroup(cote(g.rect, "6 m", UP, couleur=VERT_F, audit=False),
                       cote(g.rect, "4 m", LEFT, couleur=VERT_F, audit=False),
                       cote(g.base, "3 m", DOWN, couleur=TRIANGLE_C, audit=False))
        self.add(g, cotes)
        XC = 0.0
        l1 = self.ligne([("Rectangle :", VERT_F), ("6 × 4", BLEU_D)], 34)
        self.col(l1, 2.3, XC)
        self.au_mot("Le rectangle")
        self.play(FadeIn(l1[0], shift=UP * 0.1), Indicate(g.rect, color=VERT_F, scale_factor=1.03), run_time=0.35)
        self.au_mot("6 fois 4")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.25)
        self.au_mot("4, 24")
        l1b = aligner_base([l1[1], self.t("= 24 m²", 34, VERT_OK).next_to(l1, RIGHT, buff=0.25)])[1]
        self.play(FadeIn(l1b, shift=UP * 0.1), run_time=0.3)
        l2 = self.ligne([("Triangle :", TRIANGLE_C), ("4 × 3", BLEU_D)], 34)
        self.col(l2, 1.55, XC)
        self.au_mot("Le triangle")
        self.play(FadeIn(l2[0], shift=UP * 0.1), Indicate(g.tri, color=TRIANGLE_C, scale_factor=1.05), run_time=0.3)
        self.au_mot("4 fois 3")
        hd = g.rect.get_corner(UR)
        moitie = DashedVMobject(Rectangle(width=3 * c, height=4 * c, stroke_color=TRIANGLE_C, stroke_width=4),
                                num_dashes=36)
        moitie.move_to(hd + P(1.5 * c, -2 * c))
        self.play(FadeIn(l2[1], shift=UP * 0.1), Create(moitie), run_time=0.4)
        self.au_mot("3, 12")
        l2b = aligner_base([l2[1], self.t("= 12", 34, BLEU_D).next_to(l2, RIGHT, buff=0.25)])[1]
        self.play(FadeIn(l2b, shift=UP * 0.1), Indicate(moitie, color=TRIANGLE_C, scale_factor=1.04), run_time=0.35)
        l3a = VGroup(hors_audit(self.t("12 ÷", 34, BLEU_D)), self.t("2", 34, BLEU_D)).arrange(RIGHT, buff=0.24)
        l3b = self.t("= 6 m²", 34, VERT_OK)
        l3 = VGroup(l3a, l3b).arrange(RIGHT, buff=0.25)
        self.col(l3, 0.85, l2[1].get_left()[0])
        self.au_mot("par 2, 6")
        self.play(FadeIn(l3, shift=UP * 0.1), FadeOut(moitie), Indicate(g.tri, color=TRIANGLE_C, scale_factor=1.06),
                  run_time=0.35)
        l4 = self.ligne([("En tout :", JAUNE_TITRE), ("24 + 6", BLEU_D)], 36)
        self.col(l4, 0.05, XC)
        self.au_mot("En tout")
        self.play(FadeIn(l4[0], shift=UP * 0.1), run_time=0.25)
        self.au_mot("24 plus 6")
        self.play(FadeIn(l4[1], shift=UP * 0.1), run_time=0.25)
        self.au_mot("6, 30")
        l4b = aligner_base([l4[1], self.t("= 30 m²", 36, VERT_OK).next_to(l4, RIGHT, buff=0.25)])[1]
        self.play(FadeIn(l4b, shift=UP * 0.1), run_time=0.3)
        res = pas_audit(self.gros("30 m²", fs=48))
        self.col(res, -0.95, XC)
        self.play(FadeIn(res, scale=1.2), Indicate(g, color=VERT_OK, scale_factor=1.03), run_time=0.45)
        self.insister(res, 1.1, 0.25)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        a = self.enclos_l(0.26)
        b = self.flamants(0.24)
        fig = VGroup(a, b).arrange(DOWN, buff=0.45)
        lignes = self.finale_gauche(fig, textes=[
            ("On découpe en rectangles ou en", "triangles, puis on additionne."),
            ("Ou on enlève un morceau", "à un grand rectangle."),
            ("Chaque morceau compte", "une seule fois.")], fs=32)
        self.add(fig)
        self.au_mot("Pour une figure")
        self.montrer_ligne(lignes[0], Indicate(a, scale_factor=1.05))
        self.au_mot("On peut aussi")
        self.montrer_ligne(lignes[1], Indicate(b, scale_factor=1.05))
        self.au_mot("Chaque morceau compte")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_decouper()
        self.ecran_assembler()
        self.ecran_enlever()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")
