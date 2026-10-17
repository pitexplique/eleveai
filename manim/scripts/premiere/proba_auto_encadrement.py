# proba_auto_encadrement.py
# EleveAI — Maths 1re TRONC COMMUN (automatismes) — série « Probabilités »,
# épisode 1 : une probabilité est entre 0 et 1 (micro : auto_proba_encadrement),
# AVEC VOIX. Paysage 16:9, CEINTURE BLEUE.
# Short jumeau : proba_auto_encadrement_short.py (ceinture jaune).
#
# Contexte écologie / business : la publicité « panneau solaire 120 % rentable ».
# Figure centrale : LA JAUGE de 0 (impossible) à 1 (certain), 0 % à 100 % ;
# chaque nombre dit se place sur la jauge au moment où il est dit ; 120 %, 7/5
# et −0,2 SORTENT de la jauge et sont barrés.
#
# Écrans : 00 garde · 01 la publicité · 02 la règle (la jauge) · 03 trois
# écritures, un seul point · 04 en pourcentage (120 % déborde) · 05 le piège
# (7/5 = 1,4 et −0,2 sortent) · 06 défi · 06b correction · 07 ce que tu as
# appris · 08 abonnement.
#
# Canvas du coach : la micro n'a pas de canvas (questions en texte) ; son indice
# parle de « l'échelle des probabilités : 0 impossible, 1/2, 1 certain » : c'est
# la jauge, dessinée comme l'échelle de la 3e (proba_vocabulaire.py, écran 05).
#
# Voix : manim/voix/premiere-commun-proba-encadrement.json (débit −7).
# Rendu : python -m manim render -qh --disable_caching manim/scripts/premiere/proba_auto_encadrement.py ProbaEncadrementPremiereCommun -o eleveai-maths-premiere-commun-proba-encadrement --media_dir manim/scripts/premiere/media
# Puis copier le mp4 dans manim/sorties/premiere-commun/maths/probabilites/01-entre-0-et-1/.

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

CIEL_PANNEAU = "#1E3A8A"
GRIS_ETEINT = "#6B7280"


class NotionPremiereCommun(Notion6e):
    identite = "Maths 1re — EleveAI"


def P(x, y):
    return np.array([x, y, 0.0])


# ── les dessins (paysage et short) ──────────────────────────────────────────

def panneau_solaire(larg=2.4, haut=1.5, lignes=3, colonnes=4):
    """Un panneau solaire incliné (cellules bleues, cadre argent) sur son pied."""
    dx, dy = 0.35, 0.0
    coins = [P(-larg / 2, -haut / 2), P(larg / 2, -haut / 2),
             P(larg / 2 + dx, haut / 2 + dy), P(-larg / 2 + dx, haut / 2 + dy)]
    cadre = Polygon(*coins, fill_color=CIEL_PANNEAU, fill_opacity=1, stroke_color="#CBD5E1", stroke_width=4)
    grille = VGroup()
    for i in range(1, colonnes):
        u = i / colonnes
        grille.add(Line(coins[0] + (coins[1] - coins[0]) * u, coins[3] + (coins[2] - coins[3]) * u))
    for j in range(1, lignes):
        v = j / lignes
        grille.add(Line(coins[0] + (coins[3] - coins[0]) * v, coins[1] + (coins[2] - coins[1]) * v))
    grille.set_stroke("#93C5FD", 1.6)
    reflet = Polygon(coins[3] + (coins[2] - coins[3]) * 0.1, coins[3] + (coins[2] - coins[3]) * 0.35,
                     coins[0] + (coins[1] - coins[0]) * 0.15, coins[0] + (coins[1] - coins[0]) * 0.02,
                     fill_color=WHITE, fill_opacity=0.12, stroke_width=0)
    pied = VGroup(Line(P(0.1, -haut / 2), P(0.1, -haut / 2 - 0.55)),
                  Line(P(-0.45, -haut / 2 - 0.55), P(0.65, -haut / 2 - 0.55))).set_stroke("#CBD5E1", 5)
    return VGroup(pied, cadre, grille, reflet)


def soleil(r=0.45):
    """Un soleil dont les rayons tournent (updater : à couper en fin d'écran)."""
    disque = Circle(radius=r, fill_color=JAUNE_TITRE, fill_opacity=1, stroke_color=ORANGE_RETENUE, stroke_width=3)
    rayons = VGroup(*[Line(P(0, r * 1.25), P(0, r * 1.7)).rotate(k * TAU / 12, about_point=ORIGIN)
                      for k in range(12)]).set_stroke(JAUNE_TITRE, 4)
    g = VGroup(rayons, disque)
    rayons.add_updater(lambda m, dt: m.rotate(dt * 0.6, about_point=disque.get_center()))
    return g


def barrer(mob, color=ROUGE_ERREUR, sw=6):
    return Line(mob.get_corner(DL) + LEFT * 0.08, mob.get_corner(UR) + RIGHT * 0.08,
                stroke_width=sw, color=color)


class Jauge:
    """LA JAUGE : un tube de 0 à 1 (gauche → droite), graduée en quarts SANS
    nombres (un nombre n'apparaît que quand la voix le dit). Le remplissage
    suit un ValueTracker ; au-delà de 1 (ou sous 0), il SORT du tube, en rouge."""

    def __init__(self, x0, x1, y, h=0.5, sw=4):
        self.x0, self.x1, self.y, self.h = x0, x1, y, h
        self.tube = RoundedRectangle(width=x1 - x0, height=h, corner_radius=h / 2.5,
                                     stroke_color=WHITE, stroke_width=sw).move_to(P((x0 + x1) / 2, y))
        self.traits = VGroup(*[Line(P(self.x(q), y - h / 2), P(self.x(q), y - h / 2 + (0.2 if q == 0.5 else 0.13) * h * 2))
                               for q in (0.25, 0.5, 0.75)]).set_stroke(WHITE, 2.5, opacity=0.8)
        self.niveau = ValueTracker(0.0)

    def x(self, p):
        return self.x0 + (self.x1 - self.x0) * p

    def point(self, p):
        return P(self.x(p), self.y)

    def corps(self):
        return VGroup(self.tube, self.traits)

    def remplissage(self, couleur=VERT_OK):
        """Le liquide de la jauge : vert dans le tube, rouge ce qui déborde."""
        h = self.h * 0.72

        def faire():
            v = self.niveau.get_value()
            g = VGroup()
            dedans = min(max(v, 0.0), 1.0)
            if dedans > 0.004:
                g.add(Rectangle(width=self.x(dedans) - self.x0, height=h, stroke_width=0,
                                fill_color=couleur, fill_opacity=0.55)
                      .move_to(P((self.x0 + self.x(dedans)) / 2, self.y)))
            if v > 1.004:
                g.add(Rectangle(width=self.x(v) - self.x1, height=h, stroke_width=0,
                                fill_color=ROUGE_ERREUR, fill_opacity=0.75)
                      .move_to(P((self.x1 + self.x(v)) / 2, self.y)))
            if v < -0.004:
                g.add(Rectangle(width=self.x0 - self.x(v), height=h, stroke_width=0,
                                fill_color=ROUGE_ERREUR, fill_opacity=0.75)
                      .move_to(P((self.x0 + self.x(v)) / 2, self.y)))
            return g

        return always_redraw(faire)


class ProbaEncadrementPremiereCommun(NotionPremiereCommun):
    nom_voix = "premiere-commun-proba-encadrement"

    X0, X1, YE = -3.6, 1.9, -0.7

    def t(self, texte, font_size=36, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def ligne(self, morceaux, font_size=40, buff=0.24):
        """Une ligne en morceaux colorés, d'UN SEUL Text (même ligne de base)."""
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

    def etiquette(self, mob, color, pad=0.22):
        fond = RoundedRectangle(width=mob.width + 2 * pad, height=mob.height + 1.6 * pad, corner_radius=0.12,
                                fill_color="#0F172A", fill_opacity=1, stroke_color=color, stroke_width=4)
        return VGroup(fond, mob.move_to(fond))

    # ── la jauge et ses repères ─────────────────────────────────────────────

    def jauge(self, y=None):
        return Jauge(self.X0, self.X1, self.YE if y is None else y)

    def nb_borne(self, j, p, texte):
        return self.t(texte, 44, JAUNE_TITRE).next_to(j.point(p), DOWN, buff=0.38)

    def mot_borne(self, nb, mot, couleur):
        return self.t(mot, 30, couleur).next_to(nb, DOWN, buff=0.12)

    def reperes(self, j, mots=True):
        """0 et 1 sous les bouts (et « impossible », « certain ») : un RAPPEL."""
        n0, n1 = self.nb_borne(j, 0, "0"), self.nb_borne(j, 1, "1")
        g = VGroup(n0, n1)
        if mots:
            g.add(self.mot_borne(n0, "impossible", ROUGE_ERREUR), self.mot_borne(n1, "certain", VERT_OK))
        return g

    def curseur(self, j, p, tag, couleur, haut=0.75, dx=0.0):
        """Un triangle posé sur la jauge au point p, et l'étiquette au-dessus."""
        tri = Triangle(fill_color=couleur, fill_opacity=1, stroke_width=0).scale(0.17).rotate(PI)
        tri.move_to(P(j.x(p), j.y + j.h / 2 + 0.2))
        tag.move_to(P(j.x(p) + dx, tri.get_top()[1] + haut + tag.height / 2))
        lien = Line(tag.get_bottom(), tri.get_top(), color=couleur, stroke_width=3)
        return VGroup(tri, lien, tag)

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.ligne([("Une probabilité :", JAUNE_TITRE), ("entre 0 et 1", VERT_OK)], 50, 0.3)
        titre.to_edge(UP, buff=0.7)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.25)
        ech = echelle_ceintures("bleue").move_to(P(-0.6, -2.6))
        self.play(Write(titre[0]), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech), run_time=0.9)
        j = Jauge(-4.0, 2.4, 0.3)
        liq = j.remplissage()
        self.add(liq)
        self.play(Create(j.corps()), run_time=0.5)
        self.au_mot("entre 0")
        n0, n1 = self.nb_borne(j, 0, "0"), self.nb_borne(j, 1, "1")
        self.play(FadeIn(titre[1], shift=UP * 0.15), FadeIn(n0, scale=0.5), run_time=0.4)
        self.play(j.niveau.animate.set_value(1), FadeIn(n1, scale=0.5), run_time=1.0)
        self.attendre_voix(marge=1.0)

    # ── 01 : la publicité ───────────────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.titre_ecran("Une publicité")
        sol = soleil(0.42).move_to(P(-5.6, 1.9))
        pan = panneau_solaire(2.4, 1.5).move_to(P(-4.7, -0.2))
        fond = RoundedRectangle(width=6.6, height=3.0, corner_radius=0.2, fill_color="#FFFBEB", fill_opacity=1,
                                stroke_color=ORANGE_RETENUE, stroke_width=6).move_to(P(1.15, 0.55))
        pieds = VGroup(*[Rectangle(width=0.18, height=1.1, fill_color=GREY_D, fill_opacity=1, stroke_width=0)
                         .move_to(P(1.15 + s * 2.2, -1.5)) for s in (-1, 1)])
        self.au_mot("Une publicité annonce")
        self.play(FadeIn(sol, scale=0.6), FadeIn(pan, shift=UP * 0.3), FadeIn(pieds), GrowFromCenter(fond),
                  run_time=0.8)
        self.au_mot("Notre panneau")
        l1 = self.t("« Notre panneau solaire a", 31, "#1F2937").move_to(P(1.15, 1.45))
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.4)
        self.au_mot("120 %")
        l2 = self.ligne([("120 %", ORANGE_RETENUE), ("de chances", "#1F2937")], 46, 0.2).move_to(P(1.15, 0.6))
        self.play(FadeIn(l2, scale=0.6), run_time=0.4)
        self.insister(l2[0], 0.3)
        self.au_mot("d'être rentable")
        l3 = self.t("d'être rentable ! »", 31, "#1F2937").move_to(P(1.15, -0.25))
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.4)
        self.au_mot("Ça sonne bien")
        etoiles = VGroup(*[Star(5, outer_radius=0.22, fill_color=JAUNE_TITRE, fill_opacity=1, stroke_width=0)
                           .move_to(fond.get_center() + P(dx, dy))
                           for dx, dy in [(-3.5, 1.4), (3.5, 1.4), (-3.55, -0.9), (3.55, -0.9)]])
        self.play(LaggedStart(*[GrowFromCenter(e) for e in etoiles], lag_ratio=0.15), run_time=0.6)
        self.play(Wiggle(VGroup(l1, l2, l3)), run_time=0.7)
        self.au_mot("Mais c'est impossible")
        tampon = self.t("impossible !", 54, ROUGE_ERREUR)
        cadre_t = SurroundingRectangle(tampon, color=ROUGE_ERREUR, buff=0.18, stroke_width=6)
        tamp = VGroup(cadre_t, tampon).rotate(0.18).move_to(P(1.6, -1.45))
        self.play(FadeOut(etoiles), FadeIn(tamp, scale=1.8), run_time=0.35)
        self.play(Create(barrer(l2[0], sw=7)), run_time=0.35)
        self.attendre_voix()
        sol[0].clear_updaters()

    # ── 02 : la règle, la jauge ─────────────────────────────────────────────

    def ecran_regle(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-regle")
        self.titre_ecran("La jauge des probabilités")
        j = self.jauge()
        liq = j.remplissage()
        self.add(liq)
        self.play(Create(j.corps()), run_time=0.8)
        self.au_mot("entre 0 et 1")
        n0, n1 = self.nb_borne(j, 0, "0"), self.nb_borne(j, 1, "1")
        regle = self.ligne([("0", JAUNE_TITRE), ("≤", WHITE), ("probabilité", BLEU_CALCUL), ("≤", WHITE),
                            ("1", JAUNE_TITRE)], 48, 0.25).move_to(P(-0.85, 1.9))
        self.play(FadeIn(n0, scale=0.5), FadeIn(regle[0]), FadeIn(regle[1:3]), run_time=0.4)
        self.au_mot("et 1")
        self.play(FadeIn(n1, scale=0.5), FadeIn(regle[3:]), run_time=0.4)
        self.au_mot("0, c'est")
        self.insister(n0, 0.3)
        self.au_mot("événement impossible")
        m0 = self.mot_borne(n0, "impossible", ROUGE_ERREUR)
        self.play(FadeIn(m0, shift=UP * 0.15), Flash(j.point(0), color=ROUGE_ERREUR), run_time=0.5)
        self.au_mot("1, c'est")
        self.insister(n1, 0.3)
        self.au_mot("événement certain")
        m1 = self.mot_borne(n1, "certain", VERT_OK)
        self.play(FadeIn(m1, shift=UP * 0.15), Flash(j.point(1), color=VERT_OK), run_time=0.5)
        self.au_mot("Entre les deux")
        acc = Brace(Line(j.point(0), j.point(1)), UP, color=BLEU_CALCUL).shift(UP * (j.h / 2 + 0.05))
        self.play(j.niveau.animate.set_value(1), GrowFromCenter(acc), run_time=1.6)
        self.au_mot("tout ce qui")
        tout = self.t("tout ce qui peut arriver", 34, BLEU_CALCUL).next_to(acc, UP, buff=0.12)
        self.play(FadeIn(tout, shift=UP * 0.15), run_time=0.5)
        self.attendre_voix()

    def jauge_rappel(self, mots=True, y=None):
        """La jauge déjà posée (rappel de l'écran 02) : tube, 0, 1, les mots."""
        j = self.jauge(y)
        liq = j.remplissage()
        rep = self.reperes(j, mots)
        self.add(liq)
        self.play(FadeIn(j.corps()), FadeIn(rep), run_time=0.5)
        return j, rep

    # ── 03 : trois écritures, un seul point ─────────────────────────────────

    def ecran_ecritures(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-ecritures")
        self.titre_ecran("Trois écritures")
        j, rep = self.jauge_rappel(mots=False)
        cible = P(j.x(0.25), j.y + j.h / 2 + 0.08)
        xs, yv = [-4.6, -1.6, 1.6], 1.15
        noms = ["en décimal", "en fraction", "en pourcentage"]
        valeurs = [self.t("0,25", 52, JAUNE_TITRE), self.fraction(1, 4, 44, JAUNE_TITRE),
                   self.t("25 %", 52, JAUNE_TITRE)]
        extraits = [("En décimal", "0,25"), ("En fraction", "1 sur 4"), ("En pourcentage", "25 %")]
        fleches = VGroup()
        for x, nom, v, (e1, e2) in zip(xs, noms, valeurs, extraits):
            self.au_mot(e1)
            lbl = self.t(nom, 28, BLEU_CALCUL).move_to(P(x, 2.2))
            self.play(FadeIn(lbl, shift=DOWN * 0.1), run_time=0.3)
            self.au_mot(e2)
            v.move_to(P(x, yv))
            fl = Arrow(v.get_bottom() + DOWN * 0.05, cible, buff=0.08, color=JAUNE_TITRE, stroke_width=4,
                       max_tip_length_to_length_ratio=0.08)
            anims = [FadeIn(v, scale=0.5), GrowArrow(fl)]
            if not fleches:
                anims.append(j.niveau.animate.set_value(0.25))
            self.play(*anims, run_time=0.6)
            fleches.add(fl)
        self.au_mot("le même nombre")
        egal = VGroup(*[self.t("=", 52).move_to(P((a + b) / 2, yv)) for a, b in zip(xs, xs[1:])])
        self.play(FadeIn(egal), Flash(cible, color=JAUNE_TITRE, line_length=0.25), run_time=0.5)
        self.insister(VGroup(*valeurs, egal), 0.4)
        self.attendre_voix()

    # ── 04 : en pourcentage, 120 % déborde ──────────────────────────────────

    def ecran_pourcentage(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-pourcentage")
        self.titre_ecran("En pourcentage")
        j, rep = self.jauge_rappel(mots=True)
        self.au_mot("entre 0 %")
        p0 = self.t("0 %", 36, JAUNE_TITRE).next_to(j.point(0), UP, buff=0.42)
        regle = self.ligne([("0 %", JAUNE_TITRE), ("≤", WHITE), ("probabilité", BLEU_CALCUL), ("≤", WHITE),
                            ("100 %", JAUNE_TITRE)], 44, 0.25).move_to(P(-0.85, 2.0))
        self.play(FadeIn(p0, scale=0.5), FadeIn(regle[:3]), run_time=0.4)
        self.au_mot("et 100 %")
        p1 = self.t("100 %", 36, JAUNE_TITRE).next_to(j.point(1), UP, buff=0.42)
        self.play(FadeIn(p1, scale=0.5), FadeIn(regle[3:]), j.niveau.animate.set_value(1), run_time=0.9)
        self.au_mot("120 %, c'est")
        tag = self.etiquette(self.t("120 %", 40, ROUGE_ERREUR), ROUGE_ERREUR)
        cur = self.curseur(j, 1.2, tag, ROUGE_ERREUR, haut=1.0)
        self.play(j.niveau.animate.set_value(1.2), FadeIn(cur, shift=DOWN * 0.2), run_time=0.8)
        self.au_mot("plus que 100 %")
        self.play(Indicate(p1, color=WHITE), Flash(j.point(1.1), color=ROUGE_ERREUR), run_time=0.6)
        self.insister(tag, 0.3)
        self.au_mot("pas une probabilité")
        self.play(Create(barrer(tag, sw=7)), run_time=0.4)
        self.attendre_voix()

    # ── 05 : le piège : 7/5 et −0,2 sortent de la jauge ─────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-piege")
        self.titre_ecran("Le piège")
        j, rep = self.jauge_rappel(mots=True)
        self.au_mot("une fraction plus grande")
        q1 = self.t("une fraction plus grande que 1", 34, ORANGE_RETENUE).move_to(P(-0.85, 2.15))
        self.play(FadeIn(q1, shift=DOWN * 0.1), run_time=0.5)
        self.au_mot("7 sur 5")
        f75 = self.fraction(7, 5, 40, ROUGE_ERREUR)
        tag = self.etiquette(f75, ROUGE_ERREUR)
        cur = self.curseur(j, 1.4, tag, ROUGE_ERREUR, haut=0.55)
        self.play(FadeIn(cur, shift=DOWN * 0.2), run_time=0.5)
        self.au_mot("c'est 1,4")
        vaut = self.t("= 1,4", 40, ROUGE_ERREUR).next_to(tag, RIGHT, buff=0.2)
        self.play(FadeIn(vaut, shift=LEFT * 0.1), j.niveau.animate.set_value(1.4), run_time=0.9)
        self.au_mot("1,4 : impossible")
        self.play(Create(barrer(VGroup(vaut, tag), sw=7)), Wiggle(cur[0]), run_time=0.6)
        self.au_mot("Et un nombre négatif")
        q2 = self.t("un nombre négatif", 34, ORANGE_RETENUE).move_to(q1)
        self.play(FadeOut(q1, shift=UP * 0.1), FadeIn(q2, shift=UP * 0.1), j.niveau.animate.set_value(0),
                  run_time=0.6)
        self.au_mot("moins 0,2")
        tg2 = self.etiquette(self.t("−0,2", 40, ROUGE_ERREUR), ROUGE_ERREUR)
        cur2 = self.curseur(j, -0.2, tg2, ROUGE_ERREUR, haut=0.55)
        self.play(FadeIn(cur2, shift=DOWN * 0.2), j.niveau.animate.set_value(-0.2), run_time=0.8)
        self.au_mot("impossible aussi")
        self.play(Create(barrer(tg2, sw=7)), Wiggle(cur2[0]), run_time=0.6)
        self.attendre_voix()

    # ── 06 : défi ───────────────────────────────────────────────────────────

    VALEURS_DEFI = [(0.95, "0,95"), (1.5, (3, 2)), (1.0, "100 %"), (-0.2, "−0,2")]
    X_CARTES = [-4.6, -2.5, -0.3, 2.0]

    def cartes_defi(self, y=1.05):
        cartes = VGroup()
        for (p, v), x in zip(self.VALEURS_DEFI, self.X_CARTES):
            m = self.fraction(*v, 40, JAUNE_TITRE) if isinstance(v, tuple) else self.t(v, 42, JAUNE_TITRE)
            cartes.add(self.etiquette(m, BLEU_CALCUL).move_to(P(x, y)))
        return cartes

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("06-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        j, rep = self.jauge_rappel(mots=False)
        self.au_mot("Lesquels peuvent")
        q = self.t("Lesquels peuvent être des probabilités ?", 36).move_to(P(-0.85, 2.3))
        self.play(FadeIn(q, shift=DOWN * 0.1), run_time=0.5)
        cartes = self.cartes_defi()
        for ex, c in zip(["0,95", "3 sur 2", "100 %", "moins 0,2"], cartes):
            self.au_mot(ex)
            self.play(FadeIn(c, shift=DOWN * 0.3, scale=0.6), run_time=0.35)
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=40)))
        self.attendre_voix(marge=2.0)

    # ── 06b : correction : chaque carte se place, ou sort ───────────────────

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("06b-correction")
        self.titre_ecran("Correction")
        j, rep = self.jauge_rappel(mots=True, y=-1.4)
        cartes = self.cartes_defi(2.3)
        self.add(cartes)
        c95, c32, c100, cneg = cartes
        hors = []

        def poser(carte, p, couleur, haut, dx=0.0):
            cible = carte.copy()
            cur = self.curseur(j, p, cible, couleur, haut=haut, dx=dx)
            self.play(carte.animate.move_to(cible).set_stroke(couleur), j.niveau.animate.set_value(p),
                      run_time=0.7)
            carte[0].set_stroke(couleur)
            self.play(FadeIn(cur[0], shift=DOWN * 0.15), Create(cur[1]), run_time=0.3)
            return cur

        self.au_mot("0,95 : oui")
        poser(c95, 0.95, VERT_OK, 0.5, dx=-1.2)
        ok1 = self.coche().next_to(c95, LEFT, buff=0.2)
        self.play(Create(ok1), run_time=0.3)
        self.au_mot("100 % : oui")
        poser(c100, 1.0, VERT_OK, 1.4, dx=-0.1)
        ok2 = self.coche().next_to(c100, RIGHT, buff=0.2)
        self.play(Create(ok2), run_time=0.3)
        self.au_mot("événement certain")
        self.play(Indicate(rep[3], color=VERT_OK, scale_factor=1.3), run_time=0.6)
        self.au_mot("3 sur 2 vaut")
        poser(c32, 1.5, ROUGE_ERREUR, 0.5, dx=-0.25)
        self.au_mot("1,5 : non")
        vaut = self.t("= 1,5", 40, ROUGE_ERREUR).next_to(c32, RIGHT, buff=0.18)
        self.play(FadeIn(vaut, shift=LEFT * 0.1), run_time=0.35)
        self.play(Create(barrer(VGroup(c32, vaut), sw=7)), run_time=0.4)
        self.au_mot("Moins 0,2 : non")
        poser(cneg, -0.2, ROUGE_ERREUR, 0.5)
        self.play(Create(barrer(cneg, sw=7)), run_time=0.4)
        self.attendre_voix()

    # ── 07 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)))
        acquis = [
            ("Une probabilité est entre 0 et 1", [("Entre", WHITE), ("0", JAUNE_TITRE), ("et", WHITE),
                                                 ("1", JAUNE_TITRE), (", ou entre", WHITE), ("0 %", JAUNE_TITRE),
                                                 ("et", WHITE), ("100 %", JAUNE_TITRE)]),
            ("0 : impossible", [("0", JAUNE_TITRE), (": impossible", ROUGE_ERREUR)]),
            ("1 : certain", [("1", JAUNE_TITRE), (": certain", VERT_OK)]),
            ("Plus que 1 ou négatif", [("Plus que 1 ou négatif : ce n'est pas une probabilité", WHITE)]),
        ]
        lignes = VGroup(*[VGroup(self.coche(), self.ligne(m, 36, 0.18)).arrange(RIGHT, buff=0.3)
                          for _, m in acquis])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.55)
        if lignes.width > 10.5:
            lignes.scale_to_fit_width(10.5)
        lignes.move_to(P(-0.9, 0.55))
        for (mot, _), l in zip(acquis, lignes):
            self.au_mot(mot)
            self.play(FadeIn(l[1], shift=RIGHT * 0.2), run_time=0.6)
            self.play(Create(l[0]), run_time=0.4)
        self.au_mot("L'épisode 2")
        self.play(Write(self.chute("Épisode 2 : l'événement contraire", color=VERT_OK, font_size=36)))
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_regle()
        self.ecran_ecritures()
        self.ecran_pourcentage()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="08-abonne")
