# proba_va_definition.py
# EleveAI — Maths 1re spé (micro va_definition, notion variables_aleatoires) —
# série « Probabilités » : UNE VARIABLE ALÉATOIRE, UNE FONCTION DÉFINIE SUR
# L'UNIVERS, AVEC VOIX. Paysage 16:9, ceinture MARRON. Short jumeau :
# proba_va_definition_short.py.
#
# ⭐ La micro du coach n'a pas de canvas propre (QCM « est-ce une variable
#   aléatoire ? », « ensemble de départ : les 36 couples »). La figure de la
#   vidéo est donc le DIAGRAMME EN FLÈCHES de la définition : à gauche
#   l'univers Ω (une patate, une pastille par issue : deux pièces P / F),
#   à droite la droite des réels (verticale), et une flèche par issue.
#   Plusieurs flèches peuvent arriver sur le même nombre (PF, FP → 1).
# ⛔ PAS D'ÉCART : chaque nombre (valeur, calcul du gain, 0,25) s'écrit quand
#   la voix le dit ; les graduations de la droite n'ont pas d'autre nombre.
#
# Écrans : 00 garde · 01 le jeu de la fête (deux pièces, quatre issues) · 02 les
# flèches : X = nombre de piles · 03 X est une fonction de Ω vers ℝ · 04 une
# autre règle : le gain G · 05 le piège : X n'est pas une probabilité · 06 défi
# (dé, 10 € / −2 €) · 06b correction · 07 ce que tu as appris · 08 fin.
#
# Voix : manim/voix/premiere-proba-va-definition.json (débit −6), calée mot à
# mot par proba_va_definition_marques.json.
# python -m manim render -qh --disable_caching manim/scripts/premiere/proba_va_definition.py ProbaVaDefinitionPremiere -o eleveai-maths-premiere-proba-va-definition --media_dir manim/scripts/premiere/media-va_definition-1s
# Sortie : manim/sorties/premiere/maths/probabilites/38-va-definition/

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
from proba_pc_conditionnelle import suite  # noqa: E402
from proba_bin_defi import MotsCales  # noqa: E402
from annonce_probabilites import de, piece_qui_tourne  # noqa: E402

COUL_P = JAUNE_TITRE      # PILE (comme la pièce de l'annonce)
COUL_F = ORANGE_RETENUE   # FACE
FLECHE = "#60A5FA"
MEME = "#F472B6"          # les deux flèches qui arrivent sur le même nombre
ISSUES = ["PP", "PF", "FP", "FF"]
NB_PILES = {i: i.count("P") for i in ISSUES}
GAIN = {i: 3 * i.count("P") - 2 for i in ISSUES}
assert GAIN == {"PP": 4, "PF": 1, "FP": 1, "FF": -2}


def P(x, y):
    return np.array([x, y, 0.0])


def jeton(c, r=0.27):
    """Une petite pièce : P (jaune) ou F (orange)."""
    d = Circle(radius=r, fill_color=COUL_P if c == "P" else COUL_F, fill_opacity=1, stroke_color=WHITE,
               stroke_width=2)
    return VGroup(d, Text(c, font_size=int(r * 90), color=BLACK, weight=BOLD).move_to(d))


def issue(nom, r=0.34):
    """Une issue : deux petites pièces côte à côte (PF = pile puis face)."""
    return VGroup(*[jeton(c, r) for c in nom]).arrange(RIGHT, buff=0.08)


def lettre_1654(s=1.0):
    """Une lettre de 1654 : parchemin, lignes d'écriture, cachet de cire."""
    feuille = Polygon(P(-0.8, 1.0), P(0.8, 1.0), P(0.85, -1.0), P(-0.75, -1.0), fill_color="#FDE68A",
                      fill_opacity=1, stroke_color="#B45309", stroke_width=3)
    lignes = VGroup(*[Line(P(-0.55, 0.65 - 0.28 * i), P(0.55 - 0.15 * (i % 3), 0.65 - 0.28 * i),
                           color="#78350F", stroke_width=3) for i in range(5)])
    cachet = Circle(radius=0.17, fill_color="#B91C1C", fill_opacity=1, stroke_width=0).move_to(P(0.45, -0.72))
    return VGroup(feuille, lignes, cachet).scale(s)


def nombre(v):
    """−2 avec le vrai signe moins."""
    return str(v).replace("-", "−")


class Sagittal(VGroup):
    """Le diagramme en flèches : Ω (patate + issues) → ℝ (droite verticale)."""

    def __init__(self, objets, y_de, centre_omega=P(-4.2, -0.4), x_axe=-0.6, haut=4.9, y_axe=(-2.3, 2.1),
                 buff_objets=0.42, **kw):
        super().__init__(**kw)
        self.objets = objets
        objets.arrange(DOWN, buff=buff_objets).move_to(centre_omega)
        self.patate = Ellipse(width=max(objets.width + 1.3, 2.6), height=haut, color=WHITE, stroke_width=4,
                              fill_color="#1E293B", fill_opacity=0.6).move_to(centre_omega)
        self.omega = Text("Ω", font_size=46).next_to(self.patate, UP, buff=0.05).shift(LEFT * 1.1)
        self.axe = Arrow(P(x_axe, y_axe[0]), P(x_axe, y_axe[1]), buff=0, color=GREY_B, stroke_width=4,
                         max_tip_length_to_length_ratio=0.05)
        self.reels = Text("ℝ", font_size=46).next_to(self.axe, UP, buff=0.05)
        self.x_axe, self.y_de = x_axe, y_de
        self.fleches, self.graduations = {}, {}
        self.add(self.patate, objets, self.axe)

    def point(self, v):
        return P(self.x_axe, self.y_de(v))

    def graduation(self, v, fs=44, color=WHITE):
        tic = Line(self.point(v) + LEFT * 0.12, self.point(v) + RIGHT * 0.12, color=WHITE, stroke_width=4)
        lab = Text(nombre(v), font_size=fs, color=color).next_to(tic, RIGHT, buff=0.15)
        g = VGroup(tic, lab)
        self.graduations[v] = g
        return g

    def fleche(self, k, v, color=FLECHE):
        a = self.objets[k].get_right() + RIGHT * 0.1
        f = Arrow(a, self.point(v) + LEFT * 0.08, buff=0, color=color, stroke_width=5,
                  max_tip_length_to_length_ratio=0.06)
        self.fleches[k] = f
        return f


def y_x(v):
    return -1.6 + 1.3 * v


def y_g(v):
    return -0.6 + 0.45 * v


def y_defi(v):
    return -0.95 + 0.22 * v


class ProbaVaDefinitionPremiere(MotsCales, Notion6e):
    fichier_marques = "proba_va_definition_marques.json"
    nom_voix = "premiere-proba-va-definition"
    identite = "Maths 1re spé — EleveAI"
    ceinture = "marron"
    XD = 0.6   # le bord gauche de la colonne de droite

    def t(self, texte, font_size=34, color=WHITE, largeur=None):
        t = Text(texte, font_size=font_size, color=color)
        if largeur and t.width > largeur:
            t.scale_to_fit_width(largeur)
        return t

    def insister(self, mob, run_time=0.3, k=1.5):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def ligne(self, texte, y, fs=34, color=WHITE):
        return self.t(texte, fs, color, 6.2).move_to(P(self.XD, y), aligned_edge=LEFT)

    def diagramme_x(self, complet=True, **kw):
        """Le diagramme de X (nombre de piles) ; complet : flèches et nombres déjà là."""
        s = Sagittal(VGroup(*[issue(i) for i in ISSUES]), y_x, **kw)
        s.add(s.omega, s.reels)
        if complet:
            for v in (0, 1, 2):
                s.add(s.graduation(v))
            for k, i in enumerate(ISSUES):
                s.add(s.fleche(k, NB_PILES[i], MEME if i in ("PF", "FP") else FLECHE))
        return s

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("Une variable aléatoire", 50, JAUNE_TITRE).to_edge(UP, buff=0.5)
        sous = self.t("une fonction définie sur l'univers", 34, BLEU_CALCUL).next_to(titre, DOWN, buff=0.15)
        identite = self.t(self.identite, 26).next_to(sous, DOWN, buff=0.15)
        ech = echelle_ceintures(self.ceinture).move_to(P(-0.6, -3.0))
        s = self.diagramme_x(centre_omega=P(-2.4, -0.4), x_axe=1.3)
        s.remove(s.omega, s.reels)
        s.scale(0.62).move_to(P(-0.8, -0.75))
        self.play(Write(titre), FadeIn(sous), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech), run_time=1.0)
        self.play(FadeIn(s), run_time=0.8)
        self.attendre_voix(marge=0.5)

    # ── 01 : le jeu : deux pièces, quatre issues ────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.titre_ecran("1654 : des lettres sur le hasard")
        self.au_mot("En 1654")
        an = self.t("1654", 64, JAUNE_TITRE).move_to(P(-0.8, 1.9))
        l1 = lettre_1654().move_to(P(-4.0, 0.2))
        l2 = lettre_1654().move_to(P(2.4, 0.2))
        self.play(FadeIn(an, scale=1.5), FadeIn(l1, shift=RIGHT * 0.3), FadeIn(l2, shift=LEFT * 0.3), run_time=0.8)
        self.au_mot("s'écrivent")
        aller = CurvedArrow(P(-3.0, 0.7), P(1.4, 0.7), angle=-0.5, color=BLEU_CALCUL, stroke_width=5)
        retour = CurvedArrow(P(1.4, -0.3), P(-3.0, -0.3), angle=-0.5, color=BLEU_CALCUL, stroke_width=5)
        self.play(Create(aller), run_time=0.6)
        self.play(Create(retour), run_time=0.6)
        self.au_mot("magistrat")
        jour = self.t("magistrat le jour", 34).move_to(P(-0.8, -1.55))
        self.play(FadeIn(jour, shift=UP * 0.15), run_time=0.5)
        self.au_mot("mathématicien")
        soir = self.t("mathématicien le soir", 34, BLEU_CALCUL).move_to(P(-0.8, -2.2))
        self.play(FadeIn(soir, shift=UP * 0.15), run_time=0.5)
        self.au_mot("Un jeu")
        self.play(FadeOut(VGroup(an, l1, l2, aller, retour, jour, soir)), run_time=0.5)
        self.au_mot("deux fois une pièce")
        p1 = piece_qui_tourne(P(-2.2, 1.3), r=0.8)
        p2 = piece_qui_tourne(P(0.6, 1.3), r=0.8, phase=0.7, vitesse=1.2)
        self.add(p1, p2)
        self.wait(0.8)
        self.au_mot("Quatre issues")
        iss = VGroup(*[issue(i, 0.36) for i in ISSUES]).arrange(RIGHT, buff=0.7).move_to(P(-0.8, -1.1))
        for mot, k in (("pile pile,", 0), ("pile face,", 1), ("face pile,", 2), ("face face.", 3)):
            self.au_mot(mot)
            self.play(FadeIn(iss[k], shift=UP * 0.3, scale=0.6), run_time=0.4)
        self.au_mot("l'univers")
        p1.clear_updaters()
        p2.clear_updaters()
        pat = Ellipse(width=iss.width + 1.4, height=2.0, color=WHITE, stroke_width=4).move_to(iss)
        self.play(Create(pat), FadeOut(p1), FadeOut(p2), run_time=0.7)
        self.au_mot("oméga")
        om = self.t("Ω", 54).next_to(pat, LEFT, buff=0.2)
        self.play(FadeIn(om, scale=1.6), run_time=0.4)
        self.insister(om, 0.25)
        self.attendre_voix(marge=0.4)

    # ── 02 : les flèches : X = nombre de piles ──────────────────────────────

    def ecran_fleches(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-fleches")
        self.titre_ecran("Une flèche par issue")
        s = self.diagramme_x(complet=False)
        self.play(FadeIn(s.patate), FadeIn(s.omega), LaggedStart(*[FadeIn(o) for o in s.objets], lag_ratio=0.15),
                  run_time=0.8)
        self.au_mot("On compte les piles")
        self.play(GrowArrow(s.axe), FadeIn(s.reels), run_time=0.6)
        for k, (m1, v) in enumerate((("Pile pile donne 2", 2), ("Pile face donne 1", 1), ("Face pile, 1", 1),
                                     ("Face face, 0", 0))):
            self.au_mot(m1)
            self.play(s.objets[k].animate(rate_func=there_and_back).scale(1.25), run_time=0.35)
            anims = [GrowArrow(s.fleche(k, v, MEME if k in (1, 2) else FLECHE))]
            if v not in s.graduations:
                anims.append(FadeIn(s.graduation(v), scale=1.5))
            self.play(*anims, run_time=0.5)
        self.au_mot("une flèche vers un nombre")
        self.play(LaggedStart(*[Indicate(f, color=JAUNE_TITRE, scale_factor=1.1) for f in s.fleches.values()],
                              lag_ratio=0.2), run_time=1.0)
        self.au_mot("s'appelle X")
        x = self.t("X", 72, JAUNE_TITRE).move_to(P(-2.35, 1.95))
        self.play(FadeIn(x, scale=2), run_time=0.5)
        self.au_mot("variable aléatoire")
        va = VGroup(self.t("X : une variable", 38, JAUNE_TITRE), self.t("aléatoire", 38, JAUNE_TITRE))
        va.arrange(DOWN, aligned_edge=LEFT, buff=0.1).move_to(P(1.3, 0.4), aligned_edge=LEFT)
        self.play(FadeIn(va, shift=LEFT * 0.2), run_time=0.6)
        self.attendre_voix(marge=0.4)

    # ── 03 : X est une fonction de Ω vers ℝ ─────────────────────────────────

    def ecran_fonction(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-fonction")
        self.titre_ecran("X est une fonction")
        s = self.diagramme_x()
        self.add(s)
        fs = 52
        k = [self.t(x, fs, c) for x, c in (("X", JAUNE_TITRE), (":", WHITE), ("Ω", WHITE), ("→", WHITE),
                                            ("ℝ", WHITE))]
        notation = suite(*k, buff=0.2).move_to(P(self.XD + 1.0, 1.5), aligned_edge=LEFT)
        self.au_mot("X est une fonction")
        self.play(FadeIn(VGroup(k[0], k[1]), scale=1.3), run_time=0.5)
        self.au_mot("part de l'univers")
        self.play(FadeIn(k[2], scale=1.5), s.patate.animate(rate_func=there_and_back).set_stroke(JAUNE_TITRE, 10),
                  Indicate(s.omega, scale_factor=1.4), run_time=0.7)
        self.au_mot("nombres réels")
        self.play(FadeIn(k[3]), FadeIn(k[4], scale=1.5), Indicate(s.axe, color=JAUNE_TITRE),
                  Indicate(s.reels, scale_factor=1.4), run_time=0.7)
        self.au_mot("une seule flèche")
        l1 = self.ligne("une seule flèche par issue", 0.3, 38, FLECHE)
        self.play(FadeIn(l1, shift=LEFT * 0.2), run_time=0.4)
        for kk in range(4):
            self.play(s.objets[kk].animate(rate_func=there_and_back).scale(1.2), Indicate(s.fleches[kk], color=FLECHE),
                      run_time=0.35)
        self.au_mot("deux issues peuvent")
        l2 = self.ligne("deux issues → le même nombre", -0.6, 38, MEME)
        self.play(FadeIn(l2, shift=LEFT * 0.2), *[s.fleches[kk].animate.set_stroke(width=9) for kk in (1, 2)],
                  run_time=0.5)
        self.au_mot("ici, 1")
        self.insister(s.graduations[1], 0.3, 1.6)
        self.attendre_voix(marge=0.4)

    # ── 04 : une autre règle : le gain G ────────────────────────────────────

    def ecran_gain(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-gain")
        self.titre_ecran("Même univers, autre règle")
        s = Sagittal(VGroup(*[issue(i) for i in ISSUES]), y_g)
        s.add(s.omega, s.reels)
        self.play(FadeIn(s), run_time=0.6)
        self.au_mot("le gain G")
        g = self.t("G", 72, VERT_OK).move_to(P(-2.35, 1.95))
        self.play(FadeIn(g, scale=2), run_time=0.5)
        self.au_mot("coûte 2 écus")
        regle = suite(self.t("2 écus la partie", 32, ROUGE_ERREUR), self.t(",", 32), buff=0.05)
        regle.move_to(P(self.XD, 1.95), aligned_edge=LEFT)
        self.play(FadeIn(regle, shift=DOWN * 0.1), run_time=0.4)
        self.au_mot("rapporte 3 écus")
        r2 = self.t("3 écus par pile", 32, COUL_P).next_to(regle, RIGHT, buff=0.25)
        self.play(FadeIn(r2, shift=DOWN * 0.1), run_time=0.4)
        lignes = {}
        etapes = (
            ("Pile pile :", [0], "pile pile :", "6 moins 2", "6 − 2", "2, 4", 4, 0.95),
            ("Une seule pile", [1, 2], "une pile :", "3 moins 2", "3 − 2", "2, 1", 1, 0.05),
        )
        for m0, ks, lib, m1, calc, m2, v, y in etapes:
            self.au_mot(m0)
            l0 = self.t(lib, 34).move_to(P(self.XD, y), aligned_edge=LEFT)
            self.play(FadeIn(l0), *[s.objets[k].animate(rate_func=there_and_back).scale(1.25) for k in ks], run_time=0.45)
            self.au_mot(m1)
            l1 = self.t(calc, 38, WHITE).next_to(l0, RIGHT, buff=0.25)
            self.play(FadeIn(l1, scale=1.3), run_time=0.4)
            self.au_mot(m2)
            l2 = suite(self.t("=", 38), self.t(nombre(v), 40, VERT_OK), buff=0.15).next_to(l1, RIGHT, buff=0.2)
            self.play(FadeIn(l2, scale=1.3), FadeIn(s.graduation(v, color=VERT_OK), scale=1.5),
                      *[GrowArrow(s.fleche(k, v, VERT_OK)) for k in ks], run_time=0.6)
            lignes[v] = VGroup(l0, l1, l2)
        self.au_mot("Face face : moins 2")
        l0 = self.t("face face :", 34).move_to(P(self.XD, -0.85), aligned_edge=LEFT)
        l1 = self.t("−2", 40, VERT_OK).next_to(l0, RIGHT, buff=0.25)
        self.play(FadeIn(l0), s.objets[3].animate(rate_func=there_and_back).scale(1.25), run_time=0.45)
        self.play(FadeIn(l1, scale=1.3), FadeIn(s.graduation(-2, color=VERT_OK), scale=1.5),
                  GrowArrow(s.fleche(3, -2, VERT_OK)), run_time=0.6)
        self.attendre_voix(marge=0.4)

    # ── 05 : le piège : X n'est pas une probabilité ─────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-piege")
        self.titre_ecran("Le piège")
        s = self.diagramme_x()
        self.add(s)
        self.au_mot("X n'est pas")
        l0 = self.ligne("X n'est pas une probabilité", 1.95, 38, ORANGE_RETENUE)
        self.play(FadeIn(l0, shift=DOWN * 0.15), run_time=0.5)
        self.au_mot("X égale 2 :")
        l1 = self.ligne("X = 2 : deux piles", 1.2, 38)
        self.play(FadeIn(l1, shift=LEFT * 0.2), s.objets[0].animate(rate_func=there_and_back).scale(1.3),
                  s.fleches[0].animate.set_stroke(JAUNE_TITRE, 9), run_time=0.6)
        self.au_mot("La probabilité que")
        l2 = self.t("P(X = 2)", 36, BLEU_CALCUL).move_to(P(self.XD, 0.45), aligned_edge=LEFT)
        self.play(FadeIn(l2, shift=LEFT * 0.2), run_time=0.5)
        self.au_mot("une issue sur quatre")
        l3 = self.t(": 1 issue sur 4", 36, BLEU_CALCUL).next_to(l2, RIGHT, buff=0.2)
        cadre = SurroundingRectangle(s.objets[0], color=JAUNE_TITRE, buff=0.1, stroke_width=4)
        self.play(FadeIn(l3), Create(cadre), LaggedStart(*[o.animate(rate_func=there_and_back).scale(1.15) for o in s.objets],
                                                         lag_ratio=0.15), run_time=0.9)
        self.au_mot("0,25")
        l4 = self.t("= 0,25", 44, VERT_OK).next_to(l2, DOWN, buff=0.3).align_to(l2, LEFT)
        self.play(FadeIn(l4, scale=1.5), run_time=0.5)
        self.insister(l4, 0.25, 1.3)
        self.au_mot("Et G vaut")
        l5 = self.ligne("G : 4 ou −2", -1.1, 38, VERT_OK)
        self.play(FadeIn(l5, shift=LEFT * 0.2), run_time=0.5)
        self.au_mot("jamais")
        l6 = self.t("jamais une probabilité !", 34, ROUGE_ERREUR).next_to(l5, DOWN, buff=0.2).align_to(l5, LEFT)
        self.play(FadeIn(l6, scale=1.3), run_time=0.5)
        self.attendre_voix(marge=0.4)

    # ── 06 : défi : le dé, 10 € ou −2 € ─────────────────────────────────────

    def diagramme_de(self):
        s = Sagittal(VGroup(*[de(k, 0.6) for k in range(1, 7)]), y_defi, buff_objets=0.12)
        s.add(s.omega, s.reels)
        return s

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("06-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        s = self.diagramme_de()
        self.au_mot("On lance un dé")
        self.play(FadeIn(s), run_time=0.7)
        self.au_mot("10 euros")
        l1 = self.ligne("6 : on gagne 10 €", 1.8, 38, VERT_OK)
        self.play(FadeIn(l1, shift=LEFT * 0.2), s.objets[5].animate(rate_func=there_and_back).scale(1.3), run_time=0.5)
        self.au_mot("perd 2 euros")
        l2 = self.ligne("sinon : on perd 2 €", 1.05, 38, ROUGE_ERREUR)
        self.play(FadeIn(l2, shift=LEFT * 0.2), run_time=0.5)
        self.au_mot("G est le gain")
        l3 = self.ligne("G : le gain", 0.3, 38, JAUNE_TITRE)
        self.play(FadeIn(l3, shift=LEFT * 0.2), run_time=0.4)
        self.au_mot("Où vont")
        l4 = self.ligne("Où vont les flèches ?", -0.55, 38, BLEU_CALCUL)
        pq = self.t("?", 70, BLEU_CALCUL).move_to(P(-2.3, -0.4))
        self.play(FadeIn(l4), FadeIn(pq, scale=1.6), run_time=0.5)
        self.au_mot("combien de valeurs")
        l5 = self.ligne("Combien de valeurs pour G ?", -1.3, 38, BLEU_CALCUL)
        self.play(FadeIn(l5), run_time=0.5)
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=36)))
        self.attendre_voix(marge=1.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("06b-correction")
        self.titre_ecran("Correction")
        s = self.diagramme_de()
        self.add(s)
        self.au_mot("Les faces 1")
        self.play(LaggedStart(*[s.objets[k].animate(rate_func=there_and_back).scale(1.25) for k in range(5)], lag_ratio=0.15),
                  run_time=1.0)
        self.au_mot("sur moins 2")
        self.play(FadeIn(s.graduation(-2, color=ROUGE_ERREUR), scale=1.5),
                  LaggedStart(*[GrowArrow(s.fleche(k, -2, ROUGE_ERREUR)) for k in range(5)], lag_ratio=0.12),
                  run_time=1.0)
        self.au_mot("La face 6")
        self.play(s.objets[5].animate(rate_func=there_and_back).scale(1.3), run_time=0.4)
        self.au_mot("sur 10")
        self.play(FadeIn(s.graduation(10, color=VERT_OK), scale=1.5), GrowArrow(s.fleche(5, 10, VERT_OK)),
                  run_time=0.6)
        self.au_mot("Six issues")
        l1 = self.ligne("six issues", 1.0, 40)
        self.play(FadeIn(l1, shift=LEFT * 0.2), s.patate.animate(rate_func=there_and_back).set_stroke(JAUNE_TITRE, 10),
                  run_time=0.5)
        self.au_mot("deux valeurs")
        l2 = self.ligne("deux valeurs :", 0.0, 40, JAUNE_TITRE)
        self.play(FadeIn(l2, shift=LEFT * 0.2), run_time=0.4)
        self.au_mot("moins 2 et 10")
        vals = suite(self.t("−2", 46, ROUGE_ERREUR), self.t("et", 40), self.t("10", 46, VERT_OK), buff=0.25)
        vals.next_to(l2, DOWN, buff=0.3).align_to(l2, LEFT)
        self.play(FadeIn(vals, scale=1.3), *[Indicate(s.graduations[v][1], scale_factor=1.5) for v in (-2, 10)],
                  run_time=0.6)
        self.attendre_voix(marge=0.5)

    # ── 07 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)))
        textes = [("Un nombre réel pour chaque issue", WHITE), ("X : Ω → ℝ, une fonction", JAUNE_TITRE),
                  ("Plusieurs issues, même nombre : possible", WHITE), ("X n'est pas une probabilité", ORANGE_RETENUE)]
        lignes = VGroup(*[VGroup(self.coche(), self.t(x, 36, c)).arrange(RIGHT, buff=0.3) for x, c in textes])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.6)
        if lignes.width > 12.0:
            lignes.scale_to_fit_width(12.0)
        lignes.move_to(P(-0.6, 0.0))
        for mot, l in zip(["associe", "c'est une fonction", "Plusieurs issues", "Et X n'est pas"], lignes):
            self.au_mot(mot)
            self.play(FadeIn(l[1], shift=RIGHT * 0.2), run_time=0.6)
            self.play(Create(l[0]), run_time=0.3)
        self.attendre_voix(marge=0.5)

    # ── 08 : la fin (règle du 19/10) ────────────────────────────────────────

    def page_abonnement(self, voix="08-abonne"):
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
        self.ecran_fleches()
        self.ecran_fonction()
        self.ecran_gain()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement()
