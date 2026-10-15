# pythagore_verifier.py
# EleveAI — Maths 4e — Pythagore, épisode 5 : vérifier une égalité avec trois longueurs
# (notionId : pythagore_theoreme, micro : pythagore_reciproque_verifier), AVEC VOIX.
#
# ⭐ « On suit exactement les micros » (13/10/2026) : ici on CALCULE et on
# COMPARE, on ne conclut pas (la conclusion « le triangle est rectangle » est la
# micro suivante). ⛔ Donc AUCUN petit carré d'angle droit sur les figures.
# L'image commune avec le short : la CORDE À 13 NŒUDS (3-4-5).
# Le plus grand côté en ORANGE (il joue le rôle de l'hypoténuse), les deux autres en BLEU.
#
# ⭐ Et à la fin (sa demande) : les triplets 3-4-5, 6-8-10, 5-12-13, 8-15-17, et le petit carré enfin dessiné.
# Voix : manim/voix/4e-pythagore-verifier.json (Julie, débit −7).
# Rendu : python -m manim render -qh --disable_caching manim/scripts/4e/pythagore_verifier.py PythagoreVerifier4e -o eleveai-maths-4e-pythagore-verifier --media_dir manim/scripts/4e/media
# Puis copier le mp4 dans manim/sorties/4e/maths/pythagore/05-verifier/.

import math
import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parent))

from pythagore_hypotenuse import COTE, COUL_HYP, P, PythagoreHypotenuse4e, echelle_ceintures  # noqa: E402

from manim import *  # noqa: E402

from charte import *  # noqa: E402

CORDE = "#D6B47A"


def tri3(l1, l2, l3, u, origine):
    """Un triangle de côtés AB = l1 (la base), AC = l2, BC = l3, à l'échelle u."""
    A = origine
    B = A + RIGHT * l1 * u
    x = (l1 ** 2 + l2 ** 2 - l3 ** 2) / (2 * l1)
    y = math.sqrt(max(l2 ** 2 - x ** 2, 0))
    C = A + np.array([x * u, y * u, 0])
    return A, B, C


class PythagoreVerifier4e(PythagoreHypotenuse4e):
    nom_voix = "4e-pythagore-verifier"

    # ── les dessins ─────────────────────────────────────────────────────────

    def comparer(self, gauche, droite, egal, y=-1.2, x0=2.9, font_size=34):
        """Deux colonnes : le carré du plus grand | la somme des deux autres.
        `gauche` / `droite` : listes de lignes ; le verdict s'écrit au milieu."""
        col_g = VGroup(*[self.t(l, font_size, COUL_HYP) for l in gauche]).arrange(DOWN, buff=0.18)
        font_size = font_size
        col_d = VGroup(*[self.t(l, font_size, COTE) for l in droite]).arrange(DOWN, buff=0.18)
        # Les deux colonnes de part et d'autre de x0, assez loin pour que le signe tienne entre les cadres.
        col_g.next_to(P(x0 - 0.55, y + 0.5), DL, buff=0).shift(DOWN * 0.0)
        col_d.next_to(P(x0 + 0.55, y + 0.5), DR, buff=0)
        col_g.align_to(P(0, y + 0.5), UP)
        col_d.align_to(P(0, y + 0.5), UP)
        cadre_g = SurroundingRectangle(col_g, color=COUL_HYP, buff=0.2, corner_radius=0.12)
        cadre_d = SurroundingRectangle(col_d, color=COTE, buff=0.2, corner_radius=0.12)
        y_milieu = (max(cadre_g.get_bottom()[1], cadre_d.get_bottom()[1]) + y + 0.5) / 2
        signe = self.t("=" if egal else "≠", 60, VERT_OK if egal else ROUGE_ERREUR).move_to(P(x0, y_milieu))
        return col_g, col_d, cadre_g, cadre_d, signe

    def jouer_comparaison(self, comp, mots):
        col_g, col_d, cadre_g, cadre_d, signe = comp
        self.au_mot(mots[0])
        self.play(Create(cadre_g), FadeIn(col_g[0]))
        for l in col_g[1:]:
            self.play(FadeIn(l), run_time=0.5)
        self.au_mot(mots[1])
        self.play(Create(cadre_d), FadeIn(col_d[0]))
        for l in col_d[1:]:
            self.play(FadeIn(l), run_time=0.5)
        self.au_mot(mots[2])
        self.play(GrowFromCenter(signe))

    def figure(self, l1, l2, l3, noms, u, origine, plus_grand="BC", lettres=None):
        A, B, C = tri3(l1, l2, l3, u, origine)
        cotes = {"AB": Line(A, B), "AC": Line(A, C), "BC": Line(B, C)}
        for k, ln in cotes.items():
            ln.set_stroke(COUL_HYP if k == plus_grand else COTE, 6)
        etiquettes = VGroup()
        g = (A + B + C) / 3
        for k, txt in zip(("AB", "AC", "BC"), noms):
            m = cotes[k].get_center()
            d = (m - g) / np.linalg.norm(m - g)
            etiquettes.add(self.t(txt, 30, COUL_HYP if k == plus_grand else COTE).move_to(m + d * 0.4))
        lab = VGroup()
        if lettres:
            for nom, pt in zip(lettres, (A, B, C)):
                d = (pt - g) / np.linalg.norm(pt - g)
                lab.add(self.t(nom, 30).move_to(pt + d * 0.35))
        return (A, B, C), VGroup(*cotes.values()), etiquettes, lab

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("Vérifier une égalité de Pythagore", 52, JAUNE_TITRE).to_edge(UP, buff=0.7)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.25)
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2))
        self.au_mot("Une corde à 13 nœuds")
        q1 = self.t("Une corde à 13 nœuds :", 40, BLEU_CALCUL)
        q2 = self.t("pourquoi les bâtisseurs s'en servent-ils ?", 40, BLEU_CALCUL)
        VGroup(q1, q2).arrange(DOWN, buff=0.2).move_to(P(0, 0.2))
        self.play(FadeIn(q1, shift=UP * 0.2))
        self.play(FadeIn(q2, shift=UP * 0.2))
        self.play(FadeIn(echelle_ceintures("jaune").move_to(P(-0.6, -2.4))))
        self.attendre_voix(marge=1.0)

    # ── 01 : la corde ───────────────────────────────────────────────────────

    def ecran_corde(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-corde")
        u = 0.75
        # La corde tendue en triangle : 4 en bas, 3 qui monte, 5 qui redescend (12 intervalles).
        A = P(-5.2, -2.2)
        B, C = A + RIGHT * 4 * u, A + UP * 3 * u
        tour = [A + RIGHT * k * u for k in range(5)] + [B + (C - B) * k / 5 for k in range(1, 6)] + \
               [C + DOWN * k * u for k in range(1, 4)]
        droite = [P(-6.0 + k * 0.85, 1.6) for k in range(13)]
        corde = VMobject(stroke_color=CORDE, stroke_width=6).set_points_as_corners(droite)
        noeuds = VGroup(*[Dot(p, radius=0.09, color=CORDE) for p in droite])
        self.play(Create(corde), LaggedStart(*[GrowFromCenter(n) for n in noeuds], lag_ratio=0.08), run_time=1.6)
        self.au_mot("12 intervalles")
        self.play(FadeIn(self.t("13 nœuds, 12 intervalles", 30, CORDE).move_to(P(0, 2.2))))
        self.au_mot("On la tend en triangle")
        cible = VMobject(stroke_color=CORDE, stroke_width=6).set_points_as_corners(tour)
        self.play(Transform(corde, cible), *[n.animate.move_to(p) for n, p in zip(noeuds, tour)], run_time=2.2)
        self.au_mot("3 intervalles")
        self.play(FadeIn(self.t("3", 36, COTE).next_to(Line(A, C), LEFT, buff=0.25)))
        self.au_mot("4 intervalles")
        self.play(FadeIn(self.t("4", 36, COTE).next_to(Line(A, B), DOWN, buff=0.25)))
        self.au_mot("5 intervalles")
        self.play(FadeIn(self.t("5", 36, COUL_HYP).move_to((B + C) / 2 + UR * 0.35)))
        self.au_mot("On a trois longueurs")
        self.play(FadeIn(self.ligne("3, 4 et 5", 0.9, 44, x=3.0)))
        self.au_mot("Est-ce qu'elles vérifient")
        self.play(FadeIn(self.ligne("l'égalité de Pythagore ?", 0.0, 36, BLEU_CALCUL, x=3.0)))
        self.attendre_voix()

    def corde_figee(self):
        u = 0.75
        A = P(-5.2, -2.2)
        B, C = A + RIGHT * 4 * u, A + UP * 3 * u
        cotes = VGroup(Line(A, B), Line(A, C)).set_stroke(COTE, 6)
        grand = Line(B, C, color=COUL_HYP, stroke_width=6)
        lab = VGroup(self.t("3", 36, COTE).next_to(Line(A, C), LEFT, buff=0.25),
                     self.t("4", 36, COTE).next_to(Line(A, B), DOWN, buff=0.25),
                     self.t("5", 36, COUL_HYP).move_to((B + C) / 2 + UR * 0.35))
        return VGroup(cotes, grand, lab), grand

    # ── 02 : le plus grand côté ─────────────────────────────────────────────

    def ecran_plus_grand(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-plus-grand")
        self.titre_ecran("Étape 1 : le plus grand côté")
        fig, grand = self.corde_figee()
        fig[1].set_stroke(CORDE)
        self.add(fig)
        self.au_mot("Ici, 5")
        self.play(grand.animate.set_stroke(COUL_HYP, 10), Indicate(fig[2][2], color=COUL_HYP, scale_factor=1.6))
        self.play(FadeIn(self.ligne("plus grand côté : 5", 1.2, 40, COUL_HYP, x=2.6)))
        self.au_mot("son carré va seul")
        self.play(FadeIn(self.ligne("son carré, seul d'un côté", 0.3, 32, x=2.6)))
        self.attendre_voix()

    # ── 03 : deux calculs séparés ───────────────────────────────────────────

    def ecran_deux_calculs(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-deux-calculs")
        self.titre_ecran("Étapes 2 et 3 : deux calculs, puis on compare")
        fig, _ = self.corde_figee()
        self.add(fig.scale(0.8).move_to(P(-5.0, 0.6)))
        comp = self.comparer(["le plus grand", "5² = 25"], ["les deux autres", "3² + 4²", "= 9 + 16 = 25"], True,
                             y=0.6, x0=2.6)
        self.jouer_comparaison(comp, ["le carré du plus grand", "la somme des carrés", "on compare"])
        self.au_mot("l'égalité est vérifiée")
        self.play(Write(self.chute("25 = 25 : l'égalité est vérifiée.", color=VERT_OK, font_size=36)))
        self.attendre_voix()

    # ── 04 : le piège ───────────────────────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-piege")
        self.titre_ecran("Le piège : écrire « = » trop tôt")
        faux = self.ligne("5² = 3² + 4²", 1.4, 56, ROUGE_ERREUR, x=0)
        self.au_mot("écrire tout de suite")
        self.play(Write(faux))
        self.au_mot("On ne sait pas encore")
        q = self.t("?", 72, ROUGE_ERREUR).next_to(faux, RIGHT, buff=0.4)
        self.play(FadeIn(q), Wiggle(faux))
        self.play(Create(Line(faux.get_left(), faux.get_right(), color=ROUGE_ERREUR, stroke_width=6)))
        self.au_mot("On calcule chaque côté à part")
        bon = VGroup(self.t("5² = 25", 44, COUL_HYP), self.t("|", 44, GRAY_B), self.t("3² + 4² = 25", 44, COTE))
        bon.arrange(RIGHT, buff=0.6).move_to(P(0, -0.2))
        self.play(FadeIn(bon))
        self.au_mot("le signe égal qu'à la fin")
        self.play(Write(self.ligne("puis : 25 = 25", -1.2, 44, VERT_OK, x=0)))
        self.attendre_voix()

    # ── 05 : quand ce n'est pas égal ────────────────────────────────────────

    def ecran_pas_egal(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-pas-egal")
        self.titre_ecran("Quand ce n'est pas égal")
        (A, B, C), cotes, etiq, _ = self.figure(5, 4, 6, ("5 cm", "4 cm", "6 cm"), 0.55, P(-6.0, -1.6))
        self.au_mot("4, 5 et 6")
        self.play(Create(cotes), FadeIn(etiq))
        comp = self.comparer(["le plus grand", "6² = 36"], ["les deux autres", "4² + 5²", "= 16 + 25 = 41"], False,
                             y=1.2, x0=1.7)
        self.jouer_comparaison(comp, ["Le plus grand : 6", "4 au carré plus 5", "36 et 41"])
        self.au_mot("L'égalité n'est pas vérifiée")
        self.play(Write(self.chute("36 ≠ 41 : l'égalité n'est pas vérifiée.", color=ORANGE_RETENUE, font_size=34)))
        self.attendre_voix()

    # ── 06 : les longueurs dans le désordre ─────────────────────────────────

    def ecran_desordre(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-desordre")
        self.titre_ecran("Attention : les longueurs dans le désordre")
        (A, B, C), cotes, etiq, lab = self.figure(8, 15, 17, ("8", "15", "17"), 0.2, P(-6.2, -1.9),
                                                  plus_grand="BC", lettres="ABC")
        cotes.set_stroke(WHITE)
        etiq.set_color(WHITE)
        self.au_mot("AB égale 8")
        self.play(Create(cotes), FadeIn(lab))
        self.play(FadeIn(self.ligne("AB = 8   BC = 17   AC = 15", 1.9, 34, x=2.4)))
        self.au_mot("Le plus grand, c'est BC")
        self.play(cotes[2].animate.set_stroke(COUL_HYP, 8), cotes[0].animate.set_stroke(COTE, 6),
                  cotes[1].animate.set_stroke(COTE, 6), FadeIn(etiq))
        comp = self.comparer(["BC² = 17²", "= 289"], ["AB² + AC²", "= 64 + 225", "= 289"], True, y=0.9, x0=2.9)
        self.jouer_comparaison(comp, ["17 au carré", "8 au carré plus 15", "L'égalité est vérifiée"])
        self.attendre_voix()

    # ── 07 : défi ───────────────────────────────────────────────────────────

    def figure_defi(self):
        return self.figure(12, 5, 13, ("12 cm", "5 cm", "13 cm"), 0.32, P(-6.0, -1.6))

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        (A, B, C), cotes, etiq, _ = self.figure_defi()
        cotes.set_stroke(WHITE)
        etiq.set_color(WHITE)
        self.au_mot("5, 12 et 13")
        self.play(Create(cotes), FadeIn(etiq))
        self.au_mot("Calcule le carré du plus grand")
        self.play(FadeIn(self.ligne("le carré du plus grand = ?", 1.0, 34, COUL_HYP, x=2.7)))
        self.au_mot("puis la somme des carrés")
        self.play(FadeIn(self.ligne("la somme des deux autres = ?", 0.2, 34, COTE, x=2.7)))
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=36)))
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("07b-correction")
        self.titre_ecran("Correction")
        (A, B, C), cotes, etiq, _ = self.figure_defi()
        self.add(cotes, etiq)
        comp = self.comparer(["le plus grand", "13² = 169"], ["les deux autres", "5² + 12²", "= 25 + 144 = 169"],
                             True, y=1.4, x0=1.7)
        self.jouer_comparaison(comp, ["Le plus grand côté", "5 au carré plus 12", "Les deux font 169"])
        self.play(Write(self.chute("169 = 169 : l'égalité est vérifiée.", color=VERT_OK, font_size=36)))
        self.attendre_voix()

    # ── 07c : les triplets, et enfin le petit carré ─────────────────────────

    def ecran_triplets(self):
        """⭐ Frédéric, 13/10 : « à la fin donne des triplets de Pythagore », « tu peux
        dessiner à la fin le petit carré, car on l'a prouvé ! ». Répond aussi à la
        question de la page de garde : pourquoi la corde à 13 nœuds."""
        self.clear()
        self.add_mascotte()
        self.dire("07c-triplets")
        self.titre_ecran("Des triplets à connaître")
        fig, grand = self.corde_figee()
        self.add(fig)
        A = P(-5.2, -2.2)
        lignes = [("3, 4, 5", "3² + 4² = 5²"), ("6, 8, 10", "6² + 8² = 10²"),
                  ("5, 12, 13", "5² + 12² = 13²"), ("8, 15, 17", "8² + 15² = 17²")]
        for k, (mot, txt) in enumerate(lignes):
            self.au_mot(mot)
            l = VGroup(self.t(mot, 40, JAUNE_TITRE), self.t(txt, 30, GRAY_B)).arrange(RIGHT, buff=0.5)
            self.play(FadeIn(l.move_to(P(2.6, 1.6 - 0.75 * k)), shift=RIGHT * 0.2), run_time=0.6)
        self.au_mot("le triangle a un angle droit")
        carre = self.carre_droit(A, RIGHT, UP, s=0.42)
        self.play(GrowFromCenter(carre))
        self.play(Flash(A + UR * 0.21, color=BLEU_CALCUL, line_length=0.35), Indicate(carre, scale_factor=1.6))
        self.au_mot("Voilà pourquoi")
        self.play(Write(self.chute("La corde à 13 nœuds : un angle droit sans équerre.", color=VERT_OK, font_size=34)))
        self.attendre_voix()

    # ── 08 : ce que tu sais faire maintenant ────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-finale")
        self.play(Write(self.t("Ce que tu sais faire maintenant", 44, JAUNE_TITRE).to_edge(UP)))
        questions = [
            ("Repérer le plus grand", "Repérer le plus grand côté ?"),
            ("Faire les deux calculs", "Faire les deux calculs séparément ?"),
            ("Comparer avant", "Comparer avant d'écrire le signe égal ?"),
        ]
        lignes = VGroup(*[VGroup(self.coche(), self.t(txt, 30)).arrange(RIGHT, buff=0.3) for _, txt in questions])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.55).move_to(P(-0.3, 0.5))
        for (mot, _), l in zip(questions, lignes):
            self.au_mot(mot)
            self.play(FadeIn(l[1], shift=RIGHT * 0.2), run_time=0.6)
            self.play(Create(l[0]), run_time=0.4)
        self.au_mot("Alors l'épisode 6")
        self.play(Write(self.chute("Épisode 6 : conclure, le triangle est-il rectangle ?", color=VERT_OK, font_size=34)))
        self.attendre_voix(marge=1.0)

    # ── déroulé ─────────────────────────────────────────────────────────────

    def construct(self):
        self.page_de_garde()
        self.ecran_corde()
        self.ecran_plus_grand()
        self.ecran_deux_calculs()
        self.ecran_piege()
        self.ecran_pas_egal()
        self.ecran_desordre()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_triplets()
        self.ecran_finale()
        self.page_abonnement(voix="09-abonne")
