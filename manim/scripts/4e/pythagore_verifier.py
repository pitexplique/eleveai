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
# ⭐ 31/10/2026 : refonte « questions-pauses » (manim/questions-pythagore.md, Ép. 5) :
# Q1 après 04-piege (6² + 8²), Q2 après 06-desordre (AB = 8, BC = 5, AC = 6), compte à
# rebours de 5 s ; finale « Ce que tu as appris » ; fin du 19/10. Module commun :
# pythagore_pauses.py. Marques mot à mot : 4e-pythagore-verifier.marques.json (ici).
# Avant tout rendu :
#   AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/pythagore_verifier.py PythagoreVerifier4e
# Voix : manim/voix/4e-pythagore-verifier.json (Julie, débit −7) ; clés 04q/04r/06q/06r,
# 08-finale et 09-abonne ajoutées ou changées le 31/10.
# Rendu : python -m manim render -qh --disable_caching manim/scripts/4e/pythagore_verifier.py PythagoreVerifier4e -o eleveai-maths-4e-pythagore-verifier --media_dir manim/scripts/4e/media
# Puis copier le mp4 dans manim/sorties/4e/maths/pythagore/05-verifier/.

import math
import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parent))

# (31/10) plus d'héritage de PythagoreHypotenuse4e (refait en parallèle par un autre agent) :
# on reprend ses petits dessins ici, et le mixin des questions-pauses vient EN PREMIER.
from pythagore_carre_racine import COTE, PythagoreCarreRacine4e  # noqa: E402  (pose les chemins)
from pythagore_reconnaitre import P, Notion4e, PythagoreReconnaitre4e, echelle_ceintures  # noqa: E402
from pythagore_pauses import PausesPaysage  # noqa: E402

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_trigo import COUL_HYP  # noqa: E402

CORDE = "#D6B47A"


def tri3(l1, l2, l3, u, origine):
    """Un triangle de côtés AB = l1 (la base), AC = l2, BC = l3, à l'échelle u."""
    A = origine
    B = A + RIGHT * l1 * u
    x = (l1 ** 2 + l2 ** 2 - l3 ** 2) / (2 * l1)
    y = math.sqrt(max(l2 ** 2 - x ** 2, 0))
    C = A + np.array([x * u, y * u, 0])
    return A, B, C


class PythagoreVerifier4e(PausesPaysage, Notion4e):
    nom_voix = "4e-pythagore-verifier"

    # Les dessins des épisodes 1 à 3, repris tels quels (comme dans pythagore_hypotenuse.py).
    t = PythagoreCarreRacine4e.t
    carre_de = PythagoreCarreRacine4e.carre_de
    carre_sur = PythagoreCarreRacine4e.carre_sur
    carre_droit = PythagoreReconnaitre4e.carre_droit
    tri_rect = PythagoreReconnaitre4e.tri_rect

    def ligne(self, texte, y, font_size=36, color=WHITE, x=3.4):
        return self.t(texte, font_size, color).move_to(P(x, y))

    # ── les dessins ─────────────────────────────────────────────────────────
    # (31/10) chaque MORCEAU paraît à SON mot : une ligne = liste de (texte, extrait de la voix) ;
    # un extrait avec un nombre attend son DERNIER nombre (au_nb), sinon son premier mot (au_mot).

    def attendre(self, extrait, n=1):
        if any(c.isdigit() for c in extrait):
            self.au_nb(extrait, n)
        else:
            self.au_mot(extrait, n)

    def colonne(self, lignes, font_size, color):
        col = VGroup()
        for l in lignes:
            col.add(VGroup(*[self.t(txt, font_size, color) for txt, _ in l]).arrange(RIGHT, buff=0.16))
        col.arrange(DOWN, buff=0.18)
        col.cues = [cue for l in lignes for _, cue in l]
        col.morceaux = [m for ligne in col for m in ligne]
        return col

    def comparer(self, gauche, droite, egal, y=-1.2, x0=2.9, font_size=34):
        """Deux colonnes : le carré du plus grand | la somme des deux autres.
        `gauche` / `droite` : listes de lignes de (texte, extrait) ; le verdict au milieu."""
        col_g = self.colonne(gauche, font_size, COUL_HYP)
        col_d = self.colonne(droite, font_size, COTE)
        col_g.next_to(P(x0 - 0.55, y + 0.5), DL, buff=0)
        col_d.next_to(P(x0 + 0.55, y + 0.5), DR, buff=0)
        col_g.align_to(P(0, y + 0.5), UP)
        col_d.align_to(P(0, y + 0.5), UP)
        cadre_g = SurroundingRectangle(col_g, color=COUL_HYP, buff=0.2, corner_radius=0.12)
        cadre_d = SurroundingRectangle(col_d, color=COTE, buff=0.2, corner_radius=0.12)
        y_milieu = (max(cadre_g.get_bottom()[1], cadre_d.get_bottom()[1]) + y + 0.5) / 2
        signe = self.t("=" if egal else "≠", 60, VERT_OK if egal else ROUGE_ERREUR).move_to(P(x0, y_milieu))
        return col_g, col_d, cadre_g, cadre_d, signe

    def jouer_comparaison(self, comp, cue_signe):
        col_g, col_d, cadre_g, cadre_d, signe = comp
        for col, cadre in ((col_g, cadre_g), (col_d, cadre_d)):
            for k, (m, cue) in enumerate(zip(col.morceaux, col.cues)):
                self.attendre(cue)
                anims = [FadeIn(m, shift=UP * 0.12)] + ([Create(cadre)] if k == 0 else [])
                self.play(*anims, run_time=0.3)
        if cue_signe is not None:  # sinon : le signe se joue à part (écran 03)
            self.attendre(cue_signe)
            self.play(GrowFromCenter(signe), run_time=0.5)

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
            e = self.t(txt, 30, COUL_HYP if k == plus_grand else COTE)
            # (31/10) l'étiquette DEHORS, d'autant plus loin qu'elle est large (« 4 cm » touchait son côté).
            etiquettes.add(e.move_to(m + d * (0.22 + 0.5 * e.width * abs(d[0]) + 0.5 * e.height * abs(d[1]))))
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
        q1 = self.t("Une corde à 13 nœuds :", 40, BLEU_CALCUL)
        q2 = self.t("pourquoi les bâtisseurs s'en servent-ils ?", 40, BLEU_CALCUL)
        VGroup(q1, q2).arrange(DOWN, buff=0.2).move_to(P(0, 0.2))
        self.au_nb("Une corde à 13")
        self.play(FadeIn(q1, shift=UP * 0.2), run_time=0.5)
        self.au_mot("pourquoi")
        self.play(FadeIn(q2, shift=UP * 0.2), run_time=0.6)
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
        self.play(Create(corde), LaggedStart(*[GrowFromCenter(n) for n in noeuds], lag_ratio=0.08), run_time=0.9)
        n13, i12 = self.t("13 nœuds,", 30, CORDE), self.t("12 intervalles", 30, CORDE)
        VGroup(n13, i12).arrange(RIGHT, buff=0.2).move_to(P(0, 2.2))
        self.au_nb("avec 13")
        self.play(FadeIn(n13), run_time=0.3)
        self.au_nb("12 intervalles")
        self.play(FadeIn(i12), run_time=0.4)
        self.au_mot("On la tend en triangle")
        cible = VMobject(stroke_color=CORDE, stroke_width=6).set_points_as_corners(tour)
        self.play(Transform(corde, cible), *[n.animate.move_to(p) for n, p in zip(noeuds, tour)], run_time=1.0)
        self.au_nb("3 intervalles")
        self.play(FadeIn(self.t("3", 36, COTE).next_to(Line(A, C), LEFT, buff=0.25)), run_time=0.4)
        self.au_nb("4 intervalles")
        self.play(FadeIn(self.t("4", 36, COTE).next_to(Line(A, B), DOWN, buff=0.25)), run_time=0.4)
        self.au_nb("5 intervalles")
        self.play(FadeIn(self.t("5", 36, COUL_HYP).move_to((B + C) / 2 + UR * 0.35)), run_time=0.4)
        self.au_mot("On a trois longueurs")
        self.play(FadeIn(self.ligne("3, 4 et 5", 0.9, 44, x=3.0)))  # le rappel des trois longueurs dites
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
        titre = self.titre_ecran("Étape 2 : deux calculs séparés")
        fig, _ = self.corde_figee()
        self.add(fig.scale(0.8).move_to(P(-5.0, 0.6)))
        comp = self.comparer([[("le plus grand", "du plus grand")], [("5²", "grand : 5"), ("= 25", "carré, 25")]],
                             [[("les deux autres", "deux autres")], [("3²", "autres : 3"), ("+ 4²", "plus 4")],
                              [("= 9", "carré, 9"), ("+ 16", "plus 16"), ("= 25", "16, 25")]],
                             True, y=0.6, x0=2.1)
        self.jouer_comparaison(comp, None)
        self.au_mot("Troisième étape")
        self.play(ReplacementTransform(titre, self.t("Étape 3 : on compare", 40, JAUNE_TITRE).to_edge(UP)), run_time=0.6)
        self.au_mot("on compare")
        self.play(GrowFromCenter(comp[4]), run_time=0.5)
        self.au_nb("25 et 25")
        self.play(Write(self.chute("25 = 25 : l'égalité est vérifiée.", color=VERT_OK, font_size=36)), run_time=0.8)
        self.attendre_voix()

    # ── 04 : le piège ───────────────────────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-piege")
        self.titre_ecran("Le piège : écrire « = » trop tôt")
        faux = VGroup(*[self.t(x, 56, ROUGE_ERREUR) for x in ("5²", "= 3²", "+ 4²")]).arrange(RIGHT, buff=0.25)
        faux.move_to(P(0, 1.4))
        for m, cue in zip(faux, ("suite 5", "égale 3", "plus 4")):
            self.au_nb(cue)
            self.play(FadeIn(m, shift=UP * 0.12), run_time=0.35)
        self.au_mot("On ne sait pas encore")
        q = self.t("?", 72, ROUGE_ERREUR).next_to(faux, RIGHT, buff=0.4)
        self.play(FadeIn(q), Wiggle(faux))
        self.play(Create(Line(faux.get_left(), faux.get_right(), color=ROUGE_ERREUR, stroke_width=6)))
        self.au_mot("On calcule chaque côté à part")
        bon = VGroup(self.t("5²", 44, COUL_HYP), self.t("|", 44, GRAY_B), self.t("3² + 4²", 44, COTE))
        bon.arrange(RIGHT, buff=0.6).move_to(P(0, -0.2))
        self.play(FadeIn(bon[0]), FadeIn(bon[1]), FadeIn(bon[2]))
        self.play(FadeIn(self.t("chaque côté à part", 30, GRAY_B).next_to(bon, DOWN, buff=0.25)), run_time=0.5)
        self.au_mot("le signe égal qu'à la fin")
        self.play(Write(self.ligne("le signe « = » : seulement à la fin", -1.8, 40, VERT_OK, x=0)))
        self.attendre_voix()

    # ── 05 : quand ce n'est pas égal ────────────────────────────────────────

    def ecran_pas_egal(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-pas-egal")
        (A, B, C), cotes, etiq, _ = self.figure(5, 4, 6, ("5 cm", "4 cm", "6 cm"), 0.55, P(-5.4, -1.6))
        titre = Text("Quand ce n'est pas égal", font_size=40, color=JAUNE_TITRE).to_edge(UP)
        self.play(Write(titre), Create(cotes), run_time=1.2)  # « 4 » est dit à 1,5 s
        for k, cue in ((1, "longueurs : 4"), (0, "4, 5"), (2, "5 et 6")):
            self.au_nb(cue)
            self.play(FadeIn(etiq[k]), run_time=0.3)
        comp = self.comparer([[("le plus grand", "Le plus grand")], [("6²", "grand : 6. 6"), ("= 36", "carré : 36")]],
                             [[("les deux autres", "36. 4")], [("4²", "36. 4"), ("+ 5²", "plus 5")],
                              [("= 16", "carré : 16"), ("+ 25", "plus 25"), ("= 41", "25, 41")]],
                             False, y=1.2, x0=1.7)
        self.jouer_comparaison(comp, "36 et 41")
        self.au_mot("L'égalité n'est pas vérifiée")
        self.play(Write(self.chute("36 ≠ 41 : l'égalité n'est pas vérifiée.", color=ORANGE_RETENUE, font_size=34)))
        self.attendre_voix()

    # ── 06 : les longueurs dans le désordre ─────────────────────────────────

    def ecran_desordre(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-desordre")
        self.titre_ecran("Attention : les longueurs dans le désordre")
        (A, B, C), cotes, etiq, lab = self.figure(8, 15, 17, ("8", "15", "17"), 0.2, P(-5.6, -1.9),
                                                  plus_grand="BC", lettres="ABC")
        cotes.set_stroke(WHITE)
        etiq.set_color(WHITE)
        self.au_mot("AB égale")
        self.play(Create(cotes), FadeIn(lab), run_time=0.6)
        donnees = VGroup(*[self.t(x, 34) for x in ("AB = 8", "BC = 17", "AC = 15")]).arrange(RIGHT, buff=0.6)
        donnees.move_to(P(2.4, 2.3))
        for m, cue in zip(donnees, ("AB égale 8", "BC égale 17", "AC égale 15")):
            self.au_nb(cue)
            self.play(FadeIn(m), run_time=0.3)
        self.au_mot("Le plus grand, c'est BC")
        self.play(cotes[2].animate.set_stroke(COUL_HYP, 8), cotes[0].animate.set_stroke(COTE, 6),
                  cotes[1].animate.set_stroke(COTE, 6), FadeIn(etiq))
        comp = self.comparer([[("BC²", "c'est BC"), ("= 17²", "BC : 17. 17")], [("= 289", "carré : 289")]],
                             [[("AB²", "289. 8"), ("+ AC²", "plus 15")], [("= 64", "carré : 64"), ("+ 225", "plus 225")],
                              [("= 289", "225, 289")]], True, y=0.9, x0=2.9)
        self.jouer_comparaison(comp, "L'égalité est vérifiée")
        self.attendre_voix()

    # ── 07 : défi ───────────────────────────────────────────────────────────

    def figure_defi(self):
        return self.figure(12, 5, 13, ("12 cm", "5 cm", "13 cm"), 0.32, P(-5.2, -1.6))

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        (A, B, C), cotes, etiq, _ = self.figure_defi()
        cotes.set_stroke(WHITE)
        etiq.set_color(WHITE)
        self.au_mot("Un triangle")
        self.play(Create(cotes), run_time=0.8)
        for k, cue in ((1, "de 5"), (0, "5, 12"), (2, "12 et 13")):
            self.au_nb(cue)
            self.play(FadeIn(etiq[k]), run_time=0.3)
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
        comp = self.comparer([[("le plus grand", "Le plus grand")], [("13²", "côté : 13. 13"), ("= 169", "carré : 169")]],
                             [[("les deux autres", "169. 5")], [("5²", "169. 5"), ("+ 12²", "plus 12")],
                              [("= 25", "carré : 25"), ("+ 144", "plus 144"), ("= 169", "144, 169")]],
                             True, y=1.4, x0=1.5)
        self.jouer_comparaison(comp, "Les deux font 169")
        self.au_mot("l'égalité est vérifiée")
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
        # (31/10) chaque nombre du triplet à SON mot ; l'égalité grise avec le dernier.
        cues = [("connaître : 3", "3, 4", "4, 5"), ("5. 6", "6, 8", "8, 10"), ("10. 5", "5, 12", "12, 13"),
                ("13. 8", "8, 15", "15, 17")]
        for k, ((mot, txt), cs) in enumerate(zip(lignes, cues)):
            nbs = VGroup(*[self.t(x, 40, JAUNE_TITRE) for x in [n + "," for n in mot.split(", ")[:2]] + [mot.split(", ")[2]]])
            nbs.arrange(RIGHT, buff=0.18)
            l = VGroup(nbs, self.t(txt, 30, GRAY_B)).arrange(RIGHT, buff=0.5).move_to(P(2.6, 1.6 - 0.75 * k))
            for j, (m, cue) in enumerate(zip(nbs, cs)):
                self.au_nb(cue)
                self.play(FadeIn(m, shift=RIGHT * 0.12), *([FadeIn(l[1], shift=RIGHT * 0.12)] if j == 2 else []),
                          run_time=0.25)
        self.au_mot("le triangle a un angle droit")
        carre = self.carre_droit(A, RIGHT, UP, s=0.42)
        self.play(GrowFromCenter(carre))
        self.play(Flash(A + UR * 0.21, color=BLEU_CALCUL, line_length=0.35), Indicate(carre, scale_factor=1.6))
        self.au_nb("la corde à 13")
        self.play(Write(self.chute("La corde à 13 nœuds : un angle droit sans équerre.", color=VERT_OK, font_size=34)))
        self.attendre_voix()

    # ── 04q / 06q : les questions-pauses (questions-pythagore.md, Ép. 5) ──────

    def question_somme(self):
        self.ecran_question("04q-question", "04r-reponse", [["Côtés 6,", "8", "et 10 cm :"], ["6²", "+ 8²", "= ?"]],
                            ["14", "100", "196"], 1, [["36", "+ 64", "= 100,"], ["autant que", "10²."]])

    def question_desordre(self):
        self.ecran_question("06q-question", "06r-reponse", [["AB = 8,", "BC = 5,", "AC = 6."], "L'égalité est-elle vérifiée ?"],
                            ["oui : 64 et 64", "non : 64 et 61", "non : 25 et 100"], 1,
                            [["Le plus grand : AB,", "8²", "= 64 ;"], ["25", "+ 36", "= 61."]])

    # ── 08 : ce que tu as appris (31/10 : titre en haut et centré) ──────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)))
        questions = [
            ("Repérer le plus grand", "Repérer le plus grand côté."),
            ("Faire les deux calculs", "Faire les deux calculs séparément."),
            ("Comparer avant", "Comparer avant d'écrire le signe égal."),
        ]
        lignes = VGroup(*[VGroup(self.coche(), self.t(txt, 30)).arrange(RIGHT, buff=0.3) for _, txt in questions])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.55).move_to(P(-0.3, 0.5))
        for (mot, _), l in zip(questions, lignes):
            self.au_mot(mot)
            self.play(FadeIn(l[1], shift=RIGHT * 0.2), run_time=0.6)
            self.play(Create(l[0]), run_time=0.4)
        self.au_nb("Alors l'épisode 6")
        self.play(Write(self.chute("Épisode 6 : conclure, le triangle est-il rectangle ?", color=VERT_OK, font_size=34)))
        self.attendre_voix(marge=1.0)

    # ── déroulé ─────────────────────────────────────────────────────────────

    def construct(self):
        self.page_de_garde()
        self.ecran_corde()
        self.ecran_plus_grand()
        self.ecran_deux_calculs()
        self.ecran_piege()
        self.question_somme()
        self.ecran_pas_egal()
        self.ecran_desordre()
        self.question_desordre()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_triplets()
        self.ecran_finale()
        self.page_abonnement(voix="09-abonne")
