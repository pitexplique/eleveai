# proba_pc_partition.py
# EleveAI — Maths 1re spé (micro pc_partition, notion probabilites_conditionnelles)
# — série « Probabilités » : RECONNAÎTRE UNE PARTITION DE L'UNIVERS, AVEC VOIX.
# Paysage 16:9, ceinture MARRON. Short jumeau : proba_pc_partition_short.py.
#
# ⭐ La micro du coach n'a pas de canvas propre (questions en texte : dé à n
#   faces, « pair / multiple de 3 », bacs, part manquante). On dessine donc :
#   · l'univers Ω en rectangle, découpé en zones (E, V, R) : le « ni
#     chevauchement, ni oubli » se VOIT ;
#   · les six faces du dé, regroupées par cadres (A, B, C) ou par patates
#     (pair / multiple de 3, le contre-exemple de la banque, fixed_2) ;
#   · l'ARBRE PONDÉRÉ du coach (carte blanche, branches grises, lettres en
#     encre) pour le pont vers les probabilités totales (épisode 28).
# ⛔ PAS D'ÉCART : aucun nombre ne s'écrit sans être dit ; l'arbre n'a PAS de
#   probabilités (la voix n'en dit aucune).
#
# Écrans : 00 garde · 01 les trois bacs du festival (une responsable du tri) · 02 la définition · 03 un
# exemple (dé : 1-2 / 3-4 / 5-6) · 04 le contre-exemple (pair / multiple de 3)
# · 05 le piège (sans le bac gris) · 06 à quoi ça sert (somme = 1, arbre) ·
# 07 défi (au plus 3 / au moins 3) · 07b correction · 08 ce que tu as appris ·
# 09 fin (« Entraîne-toi sur eleveai.fr » + abonnement).
#
# Voix : manim/voix/premiere-proba-partition.json (débit −6), calée mot à mot
# par proba_pc_partition_marques.json (moteur WinRT Julie, comme la Tle).
# python -m manim render -qh --disable_caching manim/scripts/premiere/proba_pc_partition.py ProbaPartitionPremiere -o eleveai-maths-premiere-proba-partition --media_dir manim/scripts/premiere/media-partition-1s
# Sortie : manim/sorties/premiere/maths/probabilites/37-partition/

import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "seconde"))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "terminale"))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "annonce"))
sys.path.insert(0, str(Path(__file__).resolve().parent))

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Notion6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402
from proba_pc_conditionnelle import BORD, BRANCHE, ENCRE, lettre, suite  # noqa: E402
from proba_bin_defi import MotsCales  # noqa: E402
from annonce_probabilites import de  # noqa: E402

JAUNE_BAC = "#FACC15"
VERT_BAC = "#22C55E"
GRIS_BAC = "#94A3B8"
COUL_EV = {"E": JAUNE_BAC, "V": VERT_BAC, "R": GRIS_BAC}
COUL_ABC = {"A": "#F472B6", "B": "#38BDF8", "C": "#A78BFA"}
COUL_PAIR = "#38BDF8"
COUL_M3 = "#F59E0B"


def P(x, y):
    return np.array([x, y, 0.0])


# ── les dessins : bacs et déchets ───────────────────────────────────────────

def bac(couleur, s=1.0):
    """Un bac de tri : cuve évasée, couvercle, poignée, flèches du recyclage."""
    cuve = Polygon(P(-0.75, 0.7), P(0.75, 0.7), P(0.6, -0.8), P(-0.6, -0.8), fill_color=couleur,
                   fill_opacity=1, stroke_color=WHITE, stroke_width=2.5)
    couv = RoundedRectangle(width=1.75, height=0.22, corner_radius=0.08, fill_color=couleur, fill_opacity=1,
                            stroke_color=WHITE, stroke_width=2.5).move_to(P(0, 0.82))
    poignee = RoundedRectangle(width=0.5, height=0.14, corner_radius=0.06, fill_color="#1F2937",
                               fill_opacity=1, stroke_width=0).move_to(P(0, 1.0))
    sigle = VGroup(*[Arrow(P(0.28 * np.cos(a), 0.28 * np.sin(a) - 0.05),
                           P(0.28 * np.cos(a + 1.9), 0.28 * np.sin(a + 1.9) - 0.05),
                           buff=0, color="#1F2937", stroke_width=5, max_tip_length_to_length_ratio=0.35)
                     for a in (0.4, 0.4 + 2.094, 0.4 + 4.189)])
    return VGroup(cuve, couv, poignee, sigle).scale(s)


def canette(s=1.0):
    """Un emballage : une canette."""
    corps = RoundedRectangle(width=0.36, height=0.62, corner_radius=0.08, fill_color="#EF4444",
                             fill_opacity=1, stroke_color=WHITE, stroke_width=1.5)
    bande = Rectangle(width=0.36, height=0.14, fill_color=WHITE, fill_opacity=0.9, stroke_width=0)
    return VGroup(corps, bande).scale(s)


def bouteille(s=1.0):
    """Du verre : une bouteille verte."""
    corps = RoundedRectangle(width=0.34, height=0.55, corner_radius=0.08, fill_color="#15803D",
                             fill_opacity=1, stroke_color=WHITE, stroke_width=1.5).move_to(P(0, -0.12))
    col = Rectangle(width=0.13, height=0.28, fill_color="#15803D", fill_opacity=1, stroke_color=WHITE,
                    stroke_width=1.5).move_to(P(0, 0.29))
    return VGroup(col, corps).scale(s)


def banane(s=1.0):
    """Le reste : une peau de banane."""
    arc = Arc(radius=0.45, start_angle=PI * 1.15, angle=PI * 0.7, color="#FDE047", stroke_width=11)
    queue = Line(arc.get_start(), arc.get_start() + P(-0.06, 0.12), color="#78350F", stroke_width=6)
    peau1 = Line(arc.get_end(), arc.get_end() + P(0.22, 0.2), color="#FDE047", stroke_width=8)
    peau2 = Line(arc.get_end(), arc.get_end() + P(0.28, -0.06), color="#EAB308", stroke_width=8)
    return VGroup(arc, queue, peau1, peau2).move_to(ORIGIN).scale(s)


DECHET = {"E": canette, "V": bouteille, "R": banane}


def note(couleur, s=1.0):
    """Une croche dessinée : tête ovale, hampe, crochet."""
    tete = Ellipse(width=0.34, height=0.24, fill_color=couleur, fill_opacity=1, stroke_width=0).rotate(0.4)
    hampe = Line(P(0.15, 0.02), P(0.15, 0.8), color=couleur, stroke_width=5)
    crochet = Line(P(0.15, 0.8), P(0.42, 0.52), color=couleur, stroke_width=5)
    return VGroup(tete, hampe, crochet).scale(s)


def festival():
    """Une scène de festival : plateau, toit, deux enceintes, projecteurs, notes."""
    plateau = Rectangle(width=6.0, height=0.45, fill_color="#334155", fill_opacity=1, stroke_color=WHITE,
                        stroke_width=2).move_to(P(0, -1.3))
    toit = Polygon(P(-3.3, 1.4), P(3.3, 1.4), P(2.9, 1.9), P(-2.9, 1.9), fill_color="#7C3AED", fill_opacity=1,
                   stroke_color=WHITE, stroke_width=2)
    poteaux = VGroup(*[Line(P(x, -1.1), P(x, 1.4), color=GREY_B, stroke_width=5) for x in (-2.9, 2.9)])
    enceintes = VGroup(*[VGroup(Rectangle(width=0.7, height=1.1, fill_color="#111827", fill_opacity=1,
                                          stroke_color=GREY_B, stroke_width=2),
                                Circle(radius=0.22, color=GREY_B, stroke_width=3).shift(DOWN * 0.15),
                                Circle(radius=0.1, color=GREY_B, stroke_width=3).shift(UP * 0.3)).move_to(P(x, -0.5))
                         for x in (-2.3, 2.3)])
    faisceaux = VGroup(*[Polygon(P(x, 1.4), P(x - 0.9, -1.07), P(x + 0.5, -1.07), fill_color=JAUNE_TITRE,
                                 fill_opacity=0.18, stroke_width=0) for x in (-0.9, 1.0)])
    notes = VGroup(note(JAUNE_TITRE), note("#F472B6", 0.8), note("#38BDF8", 0.9))
    for n, p in zip(notes, (P(-0.8, 0.2), P(0.3, 0.7), P(1.1, -0.1))):
        n.move_to(p)
    return VGroup(faisceaux, plateau, poteaux, toit, enceintes, notes)


def faces(cote=0.85, buff=0.35):
    """Les six faces du dé, de 1 à 6, en ligne."""
    return VGroup(*[de(k, cote) for k in range(1, 7)]).arrange(RIGHT, buff=buff)


def cadre_autour(mobs, couleur, buff=0.14, sw=5):
    return SurroundingRectangle(VGroup(*mobs), color=couleur, buff=buff, stroke_width=sw, corner_radius=0.15)


class ArbreBacs(VGroup):
    """L'arbre pondéré du coach, premier niveau seulement : départ → E, V, R."""

    def __init__(self, dx=2.4, dy=1.25, fs=34, **kw):
        super().__init__(**kw)
        racine = P(0, 0)
        noeuds = [P(dx, dy), P(dx, 0), P(dx, -dy)]
        self.branches = [Line(racine, n, color=BRANCHE, stroke_width=4) for n in noeuds]
        self.depart = Dot(racine, radius=0.07, color=ENCRE)
        self.lab = [lettre(lt, fs, ENCRE).next_to(n, RIGHT, buff=0.15) for lt, n in zip("EVR", noeuds)]
        self.pastilles = [Dot(n, radius=0.11, color=COUL_EV[lt]) for lt, n in zip("EVR", noeuds)]
        tout = VGroup(self.depart, *self.branches, *self.lab)
        self.carte = RoundedRectangle(width=tout.width + 1.4, height=tout.height + 1.2, corner_radius=0.2,
                                      fill_color=WHITE, fill_opacity=1, stroke_color=BORD, stroke_width=2)
        self.carte.move_to(tout).shift(UP * 0.25)
        self.titre = Text("Arbre pondéré", font_size=22, color=ENCRE, weight=BOLD)
        self.titre.next_to(self.carte.get_top(), DOWN, buff=0.12)
        self.add(self.carte, self.titre, *self.branches, self.depart, *self.pastilles, *self.lab)

    def socle(self):
        return VGroup(self.carte, self.titre, self.depart)


class ProbaPartitionPremiere(MotsCales, Notion6e):
    fichier_marques = "proba_pc_partition_marques.json"
    nom_voix = "premiere-proba-partition"
    identite = "Maths 1re spé — EleveAI"
    ceinture = "marron"
    XD = 0.75  # le bord gauche de la colonne de droite

    def t(self, texte, font_size=34, color=WHITE, largeur=None):
        t = Text(texte, font_size=font_size, color=color)
        if largeur and t.width > largeur:
            t.scale_to_fit_width(largeur)
        return t

    def insister(self, mob, run_time=0.3, k=1.5):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def univers_bacs(self, centre=P(-3.25, -0.3), larg=6.3, haut=4.4, avec_r=True):
        """Ω en rectangle, découpé en trois zones E | V | R, trois déchets par zone."""
        w = larg / 3
        zones = VGroup()
        for i, lt in enumerate("EVR"):
            c = centre + P(-larg / 2 + w * (i + 0.5), 0)
            r = Rectangle(width=w, height=haut, fill_color=COUL_EV[lt], fill_opacity=0.18,
                          stroke_color=COUL_EV[lt], stroke_width=3).move_to(c)
            nom = lettre(lt, 46, COUL_EV[lt]).move_to(r.get_top() + DOWN * 0.5)
            objs = VGroup(*[DECHET[lt](1.15) for _ in range(3)]).arrange(DOWN, buff=0.35)
            objs.move_to(c + DOWN * 0.35)
            zones.add(VGroup(r, nom, objs))
        cadre = Rectangle(width=larg, height=haut, stroke_color=WHITE, stroke_width=4).move_to(centre)
        omega = self.t("Ω", 46, WHITE).next_to(cadre, LEFT, buff=0.12).align_to(cadre, UP)
        return zones, cadre, omega

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("Reconnaître une partition de l'univers", 46, JAUNE_TITRE, 12.6).to_edge(UP, buff=0.6)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.22)
        ech = echelle_ceintures(self.ceinture).move_to(P(-0.6, -2.95))
        zones, cadre, omega = self.univers_bacs(P(-0.6, -0.3), 6.0, 3.0)
        for z in zones:
            z[2].arrange(RIGHT, buff=0.12).scale_to_fit_width(z[0].width * 0.8)
            z[2].move_to(z[0].get_center() + DOWN * 0.35)
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech), run_time=1.0)
        self.play(LaggedStart(*[FadeIn(z, shift=UP * 0.2) for z in zones], lag_ratio=0.25), Create(cadre),
                  FadeIn(omega), run_time=1.0)
        self.attendre_voix(marge=0.2)

    # ── 01 : les trois bacs du self ─────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.titre_ecran("Au festival : trois bacs de tri")
        self.au_mot("Inès")
        fest = festival().move_to(P(-0.8, -0.2))
        self.play(FadeIn(fest, shift=UP * 0.2), run_time=0.8)
        self.play(LaggedStart(*[n.animate(rate_func=there_and_back).shift(UP * 0.35) for n in fest[5]],
                              lag_ratio=0.3), run_time=1.2)
        self.au_mot("Trois bacs")
        self.play(FadeOut(fest, shift=UP * 0.3), run_time=0.5)
        xs = {"E": -4.3, "V": -1.0, "R": 2.3}
        mots = {"E": ("jaune pour", "emballages"), "V": ("vert pour", "verre"), "R": ("gris pour", "reste")}
        self.bacs = {}
        for lt in "EVR":
            self.au_mot(mots[lt][0])
            b = bac(COUL_EV[lt], 1.15).move_to(P(xs[lt], -0.55))
            nom = self.t(mots[lt][1], 32, COUL_EV[lt]).next_to(b, DOWN, buff=0.3)
            d = DECHET[lt](1.3).move_to(P(xs[lt], 2.0))
            self.play(FadeIn(b, shift=UP * 0.3), FadeIn(nom), FadeIn(d, shift=DOWN * 0.3), run_time=0.6)
            self.play(d.animate.move_to(b.get_center() + UP * 0.3).scale(0.6), run_time=0.5,
                      rate_func=rate_functions.ease_in_quad)
            self.play(FadeOut(d, scale=0.5), Wiggle(b, scale_value=1.06), run_time=0.4)
            self.bacs[lt] = VGroup(b, nom)
        self.au_mot("au hasard")
        main = VGroup(*[DECHET[lt](1.4) for lt in "EVR"]).arrange(RIGHT, buff=0.5).move_to(P(5.2, 1.4))
        q = self.t("?", 60, JAUNE_TITRE).next_to(main, DOWN, buff=0.2)
        self.play(LaggedStart(*[FadeIn(m, scale=0.4) for m in main], lag_ratio=0.25), FadeIn(q), run_time=0.8)
        self.play(*[Wiggle(m) for m in main], run_time=0.8)
        for lt, mot in (("E", "E :"), ("V", "V :"), ("R", "R :")):
            self.au_mot(mot)
            l = lettre(lt, 64, COUL_EV[lt]).next_to(self.bacs[lt][0], UP, buff=0.3)
            self.play(FadeIn(l, scale=1.8), Indicate(self.bacs[lt][0], color=COUL_EV[lt], scale_factor=1.08),
                      run_time=0.5)
        self.attendre_voix(marge=0.4)

    # ── 02 : la définition ──────────────────────────────────────────────────

    def ecran_definition(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-definition")
        self.titre_ecran("Une partition de l'univers")
        zones, cadre, omega = self.univers_bacs()
        self.play(LaggedStart(*[FadeIn(z, shift=UP * 0.2) for z in zones], lag_ratio=0.25), Create(cadre),
                  run_time=1.2)
        L = 5.4
        self.au_mot("Un :")
        c1 = VGroup(self.t("1.  aucun déchet", 34), self.t("dans deux bacs", 34)).arrange(DOWN, aligned_edge=LEFT,
                                                                                           buff=0.1)
        c1.move_to(P(self.XD, 1.35), aligned_edge=LEFT)
        self.play(FadeIn(c1, shift=LEFT * 0.2), run_time=0.5)
        voyageur = zones[0][2][0]
        depart = voyageur.get_center()
        bord = zones[0][0].get_right() + UP * (depart[1] - zones[0][0].get_center()[1])
        self.play(voyageur.animate.move_to(bord), run_time=0.6)
        croix = Cross(voyageur, stroke_color=ROUGE_ERREUR, stroke_width=6).scale(1.3)
        self.play(Create(croix), Wiggle(voyageur), run_time=0.6)
        self.play(FadeOut(croix), voyageur.animate.move_to(depart), run_time=0.5)
        self.au_mot("incompatibles")
        inc = self.t("incompatibles deux à deux", 34, BLEU_CALCUL, L).next_to(c1, DOWN, buff=0.3)
        inc.align_to(c1, LEFT)
        self.play(FadeIn(inc, scale=1.3), *[Indicate(z[0], color=z[0].get_stroke_color(), scale_factor=1.02)
                                            for z in zones], run_time=0.7)
        self.au_mot("Deux :")
        c2 = self.t("2.  chaque déchet a son bac", 34, WHITE, L).move_to(P(self.XD, -0.75), aligned_edge=LEFT)
        self.play(FadeIn(c2, shift=LEFT * 0.2), run_time=0.5)
        self.play(LaggedStart(*[Indicate(o, scale_factor=1.3) for z in zones for o in z[2]], lag_ratio=0.08),
                  run_time=1.0)
        self.au_mot("Leur réunion")
        reu = suite(*[self.t(x, 40, VERT_OK) for x in ("E", "∪", "V", "∪", "R", "=", "Ω")], buff=0.15)
        reu.next_to(c2, DOWN, buff=0.4).align_to(c2, LEFT)
        self.play(FadeIn(reu[:5], scale=1.3), cadre.animate.set_stroke(JAUNE_TITRE, 8), run_time=0.6)
        self.au_mot("oméga")
        self.play(FadeIn(omega, scale=1.6), FadeIn(reu[5:], scale=1.4), run_time=0.5)
        self.insister(omega, 0.25)
        self.attendre_voix(marge=0.4)

    # ── 03 : un exemple : le dé, 1-2 / 3-4 / 5-6 ────────────────────────────

    def ecran_exemple(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-exemple")
        self.titre_ecran("Un exemple avec un dé")
        fs = faces(1.2, 0.5).move_to(P(-0.6, 0.45))
        omega_c = SurroundingRectangle(fs, color=WHITE, buff=0.75, stroke_width=4).stretch(1.0, 0)
        omega_c.shift(DOWN * 0.15)
        omega = self.t("Ω", 44).next_to(omega_c, LEFT, buff=0.12).align_to(omega_c, UP)
        self.au_mot("Avec un dé")
        self.play(LaggedStart(*[FadeIn(f, scale=0.5) for f in fs], lag_ratio=0.12), Create(omega_c),
                  FadeIn(omega), run_time=1.0)
        self.cadres = []
        for i, (lt, mot, txt) in enumerate((("A", "A : 1", "1 ou 2"), ("B", "B : 3", "3 ou 4"),
                                            ("C", "C : 5", "5 ou 6"))):
            self.au_mot(mot)
            c = cadre_autour(fs[2 * i:2 * i + 2], COUL_ABC[lt], 0.12)
            nom = self.t(lt, 44, COUL_ABC[lt]).next_to(c, UP, buff=0.12)
            sous = self.t(txt, 34, COUL_ABC[lt]).next_to(c, DOWN, buff=0.15)
            self.play(Create(c), FadeIn(nom, scale=1.6), FadeIn(sous, shift=UP * 0.1), run_time=0.6)
            self.cadres.append(c)
        self.au_mot("Chaque face")
        self.play(LaggedStart(*[Indicate(f, color=COUL_ABC["ABC"[k // 2]], scale_factor=1.25)
                                for k, f in enumerate(fs)], lag_ratio=0.15), run_time=1.3)
        self.au_mot("aucune n'est")
        self.play(omega_c.animate.set_stroke(JAUNE_TITRE, 8), run_time=0.5)
        self.au_mot("c'est une partition")
        ok = suite(self.t("une partition", 40, VERT_OK), self.coche(taille=0.3), buff=0.3)
        ok.move_to(P(-0.6, -2.55))
        self.play(FadeIn(ok[0], scale=1.4), Create(ok[1]), run_time=0.6)
        self.attendre_voix(marge=0.4)

    # ── 04 : le contre-exemple : pair / multiple de 3 ───────────────────────

    def ecran_contre_exemple(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-contre-exemple")
        self.titre_ecran("Un contre-exemple")
        pos = {2: P(-4.7, 0.95), 4: P(-4.1, -0.35), 6: P(-2.3, 0.4), 3: P(-0.4, 0.4), 1: P(-5.6, -1.85),
               5: P(0.9, -1.85)}
        d = {k: de(k, 0.72).move_to(p) for k, p in pos.items()}
        omega_c = Rectangle(width=8.0, height=5.0, stroke_color=WHITE, stroke_width=4).move_to(P(-2.4, -0.15))
        omega = self.t("Ω", 44).next_to(omega_c, LEFT, buff=0.12).align_to(omega_c, UP)
        self.play(LaggedStart(*[FadeIn(d[k], scale=0.5) for k in range(1, 7)], lag_ratio=0.1), Create(omega_c),
                  FadeIn(omega), run_time=1.0)
        pair = Ellipse(width=4.0, height=2.9, color=COUL_PAIR, stroke_width=5, fill_color=COUL_PAIR,
                       fill_opacity=0.12).move_to(P(-3.6, 0.35))
        m3 = Ellipse(width=3.0, height=2.0, color=COUL_M3, stroke_width=5, fill_color=COUL_M3,
                     fill_opacity=0.12).move_to(P(-1.35, 0.4))
        l_pair = self.t("pair", 34, COUL_PAIR).next_to(pair, UP, buff=0.08).shift(LEFT * 0.6)
        l_m3 = self.t("multiple de 3", 30, COUL_M3).next_to(m3, UP, buff=0.08).shift(RIGHT * 0.5)
        self.au_mot("« pair »")
        self.play(Create(pair), FadeIn(l_pair), run_time=0.5)
        self.bring_to_front(*d.values())
        self.play(*[Indicate(d[k], color=COUL_PAIR) for k in (2, 4, 6)], run_time=0.4)
        self.au_mot("« multiple de 3 »")
        self.play(Create(m3), FadeIn(l_m3), run_time=0.5)
        self.bring_to_front(*d.values())
        self.play(*[Indicate(d[k], color=COUL_M3) for k in (3, 6)], run_time=0.4)
        self.au_mot("Le 6")
        anneau6 = Circle(radius=0.6, color=ROUGE_ERREUR, stroke_width=6).move_to(d[6])
        self.play(Create(anneau6), run_time=0.4)
        self.insister(VGroup(d[6], anneau6), 0.25, 1.35)
        l1 = self.t("6 : dans les deux", 36, ROUGE_ERREUR).move_to(P(2.2, 1.5), aligned_edge=LEFT)
        self.play(FadeIn(l1, shift=LEFT * 0.2), run_time=0.4)
        self.au_mot("ça se chevauche")
        l2 = self.t("chevauchement", 36, ROUGE_ERREUR).next_to(l1, DOWN, buff=0.15).align_to(l1, LEFT)
        self.play(FadeIn(l2, scale=1.3), run_time=0.4)
        self.au_mot("Le 1 et le 5")
        anneaux = VGroup(*[Circle(radius=0.6, color=ORANGE_RETENUE, stroke_width=6).move_to(d[k]) for k in (1, 5)])
        l3 = self.t("1 et 5 : dans aucun", 36, ORANGE_RETENUE).move_to(P(2.2, 0.0), aligned_edge=LEFT)
        self.play(Create(anneaux), FadeIn(l3, shift=LEFT * 0.2), run_time=0.5)
        self.au_mot("oubliés")
        l4 = self.t("oubli", 36, ORANGE_RETENUE).next_to(l3, DOWN, buff=0.15).align_to(l3, LEFT)
        self.play(FadeIn(l4, scale=1.3), *[Wiggle(d[k]) for k in (1, 5)], run_time=0.6)
        self.au_mot("Ce n'est pas")
        non = suite(self.t("pas une partition", 36, ROUGE_ERREUR),
                    Cross(Square(0.4), stroke_color=ROUGE_ERREUR, stroke_width=7), buff=0.25)
        non.move_to(P(2.2, -1.5), aligned_edge=LEFT)
        self.play(FadeIn(non, scale=1.3), run_time=0.5)
        self.attendre_voix(marge=0.4)

    # ── 05 : le piège : sans le bac gris ────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-piege")
        self.titre_ecran("Le piège")
        xs = {"E": -4.6, "V": -1.6, "R": 1.4}
        bacs = {lt: bac(COUL_EV[lt], 1.0).move_to(P(xs[lt], -0.9)) for lt in "EVR"}
        noms = {lt: lettre(lt, 50, COUL_EV[lt]).next_to(bacs[lt], UP, buff=0.25) for lt in "EVR"}
        self.play(*[FadeIn(VGroup(bacs[lt], noms[lt]), shift=UP * 0.2) for lt in "EVR"], run_time=0.6)
        self.au_mot("croire")
        q = self.t("incompatibles… ça suffit ?", 38, ORANGE_RETENUE).move_to(P(-1.0, 2.2))
        self.play(FadeIn(q, shift=DOWN * 0.15), run_time=0.5)
        self.au_mot("Sans le bac gris")
        croix = Cross(VGroup(bacs["R"], noms["R"]), stroke_color=ROUGE_ERREUR, stroke_width=8)
        self.play(Create(croix), run_time=0.4)
        self.play(FadeOut(VGroup(bacs["R"], noms["R"], croix), shift=DOWN * 0.3), run_time=0.5)
        self.au_mot("ne se chevauchent pas")
        coches = VGroup(*[self.coche(taille=0.28).next_to(bacs[lt], DOWN, buff=0.25) for lt in "EV"])
        self.play(LaggedStart(*[Create(c) for c in coches], lag_ratio=0.3), run_time=0.6)
        self.au_mot("la peau de banane")
        b = banane(1.6).move_to(P(4.6, 1.0))
        self.play(FadeIn(b, shift=LEFT * 0.4), run_time=0.4)
        for lt in "VE":
            cible = bacs[lt].get_top() + UP * 0.5
            self.play(b.animate.move_to(cible), run_time=0.45)
            self.play(Wiggle(bacs[lt], scale_value=1.05), b.animate.shift(UP * 0.4), run_time=0.35)
        self.play(b.animate.move_to(P(1.4, -0.6)), run_time=0.45)
        pq = self.t("?", 90, ROUGE_ERREUR).next_to(b, RIGHT, buff=0.25)
        self.play(FadeIn(pq, scale=2), Wiggle(b), run_time=0.6)
        self.au_mot("Il ne faut rien oublier")
        fin = self.chute("Il ne faut rien oublier !", color=VERT_OK, font_size=40)
        self.play(FadeIn(fin, shift=UP * 0.15), run_time=0.5)
        self.insister(fin, 0.25, 1.2)
        self.attendre_voix(marge=0.4)

    # ── 06 : à quoi ça sert : somme = 1, l'arbre ────────────────────────────

    def ecran_utile(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-utile")
        self.titre_ecran("À quoi ça sert ?")
        fs = 42
        termes = [("P(E)", COUL_EV["E"]), ("+", WHITE), ("P(V)", COUL_EV["V"]), ("+", WHITE),
                  ("P(R)", COUL_EV["R"]), ("=", WHITE), ("1", VERT_OK)]
        k = [self.t(x, fs, c) for x, c in termes]
        suite(*k, buff=0.22).move_to(P(2.3, 1.95))
        for mot, morceaux in (("P de E", [0]), ("plus P de V", [1, 2]), ("plus P de R", [3, 4]),
                              ("égale 1", [5, 6])):
            self.au_mot(mot)
            self.play(*[FadeIn(k[i], scale=1.4) for i in morceaux], run_time=0.4)
        cadre = SurroundingRectangle(k[6], color=VERT_OK, buff=0.18, stroke_width=4, corner_radius=0.08)
        self.play(Create(cadre), run_time=0.3)
        self.insister(VGroup(k[6], cadre), 0.25)
        self.au_mot("chaque bac")
        a = ArbreBacs().scale(1.2).move_to(P(-3.7, -0.85))
        self.play(FadeIn(a.socle()), run_time=0.4)
        for i in range(3):
            self.play(Create(a.branches[i]), FadeIn(a.pastilles[i]), FadeIn(a.lab[i], scale=1.5), run_time=0.45)
        self.au_mot("le départ")
        fl = Arrow(P(-0.4, -0.85), P(1.0, -0.85), color=BLEU_CALCUL, buff=0, stroke_width=7)
        pt = VGroup(self.t("probabilités", 36, BLEU_CALCUL), self.t("totales", 36, BLEU_CALCUL))
        pt.arrange(DOWN, aligned_edge=LEFT, buff=0.1).next_to(fl, RIGHT, buff=0.25)
        self.play(GrowArrow(fl), FadeIn(pt, shift=LEFT * 0.2), run_time=0.6)
        self.insister(pt, 0.25, 1.2)
        self.attendre_voix(marge=0.4)

    # ── 07 : défi ───────────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        self.au_mot("On lance un dé")
        fs = faces(0.95, 0.45).move_to(P(-0.6, 1.25))
        self.play(LaggedStart(*[FadeIn(f, scale=0.5) for f in fs], lag_ratio=0.1), run_time=0.8)
        self.au_mot("A :")
        la = self.t("A : obtenir au plus 3", 40, COUL_ABC["A"]).move_to(P(-0.6, -0.15))
        self.play(FadeIn(la, shift=UP * 0.15), run_time=0.5)
        self.au_mot("B :")
        lb = self.t("B : obtenir au moins 3", 40, COUL_ABC["B"]).move_to(P(-0.6, -0.95))
        self.play(FadeIn(lb, shift=UP * 0.15), run_time=0.5)
        self.au_mot("A et B forment-ils")
        q = self.t("une partition ?", 44, BLEU_CALCUL).move_to(P(-0.6, -1.85))
        self.play(FadeIn(q, scale=1.3), run_time=0.5)
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=36)))
        self.attendre_voix(marge=0.8)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("07b-correction")
        self.titre_ecran("Correction")
        fs = faces(0.95, 0.45).move_to(P(-0.8, 0.55))
        self.add(fs)
        self.au_mot("A, c'est")
        ca = cadre_autour(fs[0:3], COUL_ABC["A"], 0.12)
        la = self.t("A : 1, 2, 3", 36, COUL_ABC["A"]).next_to(ca, UP, buff=0.15)
        self.play(Create(ca), FadeIn(la, shift=DOWN * 0.1), run_time=0.6)
        self.au_mot("B, c'est")
        cb = cadre_autour(fs[2:6], COUL_ABC["B"], 0.28)
        lb = self.t("B : 3, 4, 5, 6", 36, COUL_ABC["B"]).next_to(cb, DOWN, buff=0.15)
        self.play(Create(cb), FadeIn(lb, shift=UP * 0.1), run_time=0.6)
        self.au_mot("Le 3")
        anneau = Circle(radius=0.62, color=ROUGE_ERREUR, stroke_width=6).move_to(fs[2])
        l1 = self.t("3 : dans les deux", 34, ROUGE_ERREUR).move_to(P(-0.8, -1.55))
        self.play(Create(anneau), FadeIn(l1), run_time=0.5)
        self.insister(VGroup(fs[2], anneau), 0.25, 1.3)
        self.au_mot("pas incompatibles")
        l1b = self.t("3 : dans les deux : pas incompatibles", 34, ROUGE_ERREUR).move_to(l1)
        self.play(Transform(l1, l1b), run_time=0.4)
        self.au_mot("Ce n'est pas")
        non = suite(self.t("pas une partition", 36, ROUGE_ERREUR),
                    Cross(Square(0.4), stroke_color=ROUGE_ERREUR, stroke_width=7), buff=0.25)
        non.move_to(P(-0.8, -2.4))
        self.play(FadeIn(non, scale=1.3), run_time=0.5)
        self.au_mot("au moins 4")
        cb2 = cadre_autour(fs[3:6], COUL_ABC["B"], 0.28)
        lb2 = self.t("B : au moins 4", 36, COUL_ABC["B"]).next_to(cb2, DOWN, buff=0.15)
        self.play(Transform(cb, cb2), Transform(lb, lb2), FadeOut(anneau), FadeOut(l1), FadeOut(non), run_time=0.7)
        self.au_mot("ce serait bon")
        oui = suite(self.t("une partition", 40, VERT_OK), self.coche(taille=0.3), buff=0.3).move_to(P(-0.8, -2.0))
        self.play(FadeIn(oui[0], scale=1.4), Create(oui[1]), run_time=0.6)
        self.attendre_voix(marge=0.4)

    # ── 08 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)))
        fs = 36
        textes = [("Incompatibles deux à deux", WHITE), ("Leur réunion : l'univers Ω", WHITE),
                  ("Ni chevauchement, ni oubli", VERT_OK), ("Somme des probabilités : 1", WHITE)]
        lignes = VGroup(*[VGroup(self.coche(), self.t(x, fs, c)).arrange(RIGHT, buff=0.3) for x, c in textes])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.6).move_to(P(-0.6, 0.0))
        for mot, l in zip(["incompatibles", "dont la réunion", "Ni chevauchement", "Et la somme"], lignes):
            self.au_mot(mot)
            self.play(FadeIn(l[1], shift=RIGHT * 0.2), run_time=0.6)
            self.play(Create(l[0]), run_time=0.3)
        self.attendre_voix(marge=0.5)

    # ── 09 : la fin (règle du 19/10) ────────────────────────────────────────

    def page_abonnement(self, voix="09-abonne"):
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
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_definition()
        self.ecran_exemple()
        self.ecran_contre_exemple()
        self.ecran_piege()
        self.ecran_utile()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement()
