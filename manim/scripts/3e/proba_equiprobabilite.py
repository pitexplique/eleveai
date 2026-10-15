# proba_equiprobabilite.py
# EleveAI — Maths 3e — Probabilités, épisode 3 : l'équiprobabilité
# (micro : proba_equiprobabilite), AVEC VOIX. Paysage ceinture VERTE.
#
# ⭐ LE DESSIN QUI PORTE TOUT : la ROUE de la kermesse. Rouge sur la moitié
# (180°), bleu, vert et jaune sur 60° chacun : 4 couleurs, mais pas la même
# chance. Puis le dé et la pièce (équiprobables), le sac 3 rouges / 1 bleue
# (on raisonne bille par bille → 3/4), le piège « 2 couleurs → 1/2 » barré,
# et le défi : roue bleu 180°, vert 90°, jaune 90° → 90/360 = 1/4.
# Dé, pièce, sac et billes : ceux de la bande-annonce (annonce_probabilites.py).
#
# Voix : manim/voix/3e-proba-equiprobabilite.json (Julie, débit −7).
# Short jumeau (ceinture jaune) : proba_equiprobabilite_short.py.
# Rendu : python -m manim render -qh --disable_caching manim/scripts/3e/proba_equiprobabilite.py ProbaEquiprobabilite3e -o eleveai-maths-3e-proba-equiprobabilite --media_dir manim/scripts/3e/media
# Puis copier le mp4 dans manim/sorties/3e/maths/probabilites/03-equiprobabilite/.

import math
import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "seconde"))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "annonce"))

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Notion6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402
from annonce_probabilites import (BILLE_BLEUE, BILLE_ROUGE, bille, de,  # noqa: E402
                                  de_qui_roule, piece_qui_tourne, sac_vide)

ROUGE = BILLE_ROUGE
BLEU = BILLE_BLEUE
VERT = "#22C55E"
JAUNE = JAUNE_TITRE

# La roue de la kermesse : (couleur, début en degrés, angle en degrés).
# Le rouge prend toute la moitié gauche ; bleu, vert, jaune se partagent la droite.
ROUE_KERMESSE = [(ROUGE, 90, 180), (BLEU, 270, 60), (VERT, 330, 60), (JAUNE, 30, 60)]
# La roue du défi : bleu 180°, vert 90°, jaune 90°.
ROUE_DEFI = [(BLEU, 90, 180), (VERT, 270, 90), (JAUNE, 0, 90)]


class Notion3e(Notion6e):
    identite = "Maths 3e — EleveAI"


def P(x, y):
    return np.array([x, y, 0.0])


def direction(deg):
    a = math.radians(deg)
    return np.array([math.cos(a), math.sin(a), 0.0])


def roue(parts, r, centre):
    """La roue : un secteur par couleur, bord blanc. Renvoie (secteurs, contour)."""
    secteurs = VGroup(*[
        Sector(radius=r, start_angle=math.radians(d), angle=math.radians(a), arc_center=centre,
               fill_color=c, fill_opacity=1, stroke_color=WHITE, stroke_width=3)
        for c, d, a in parts])
    contour = Circle(radius=r, stroke_color=WHITE, stroke_width=5).move_to(centre)
    return secteurs, contour


def aiguille(r, centre, deg=90):
    """La flèche de la roue, qui tourne autour du centre. Son angle est retenu."""
    fl = Arrow(centre, centre + direction(deg) * r * 0.82, buff=0, color=WHITE,
               stroke_width=9, max_tip_length_to_length_ratio=0.28)
    pivot = Dot(centre, radius=0.11 * max(r, 0.8), color=WHITE)
    g = VGroup(fl, pivot)
    g.angle = deg
    g.centre = centre
    return g


def tourner(aig, arrivee, tours=2, run_time=2.0):
    """L'animation d'un lancer : quelques tours, puis la flèche ralentit et s'arrête."""
    delta = (arrivee - aig.angle) % 360 + 360 * tours
    aig.angle = arrivee
    return Rotate(aig, angle=math.radians(delta), about_point=aig.centre,
                  rate_func=rate_functions.ease_out_cubic, run_time=run_time)


class ProbaEquiprobabilite3e(Notion3e):
    nom_voix = "3e-proba-equiprobabilite"

    def t(self, texte, font_size=36, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def ligne(self, morceaux, font_size=40, buff=0.24):
        return VGroup(*[m if isinstance(m, Mobject) else self.t(m[0], font_size, m[1])
                        for m in morceaux]).arrange(RIGHT, buff=buff)

    def insister(self, mob, run_time=0.45):
        self.play(mob.animate.scale(1.5), run_time=run_time)
        self.play(mob.animate.scale(1 / 1.5), run_time=run_time)

    def pousser(self, secteur, mid_deg, d=0.35, run_time=0.35):
        """Le secteur sort de la roue puis y revient : on le montre du doigt."""
        v = direction(mid_deg) * d
        self.play(secteur.animate.shift(v), run_time=run_time)
        self.play(secteur.animate.shift(-v), run_time=run_time)

    def barrer(self, mob, color=ROUGE_ERREUR):
        return Line(mob.get_corner(DL) + LEFT * 0.08, mob.get_corner(UR) + RIGHT * 0.08,
                    stroke_width=6, color=color)

    def roue_kermesse(self, r=2.0, centre=P(-3.6, -0.5)):
        sect, cont = roue(ROUE_KERMESSE, r, centre)
        aig = aiguille(r, centre)
        return sect, cont, aig

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("L'équiprobabilité", 56, JAUNE_TITRE).to_edge(UP, buff=0.6)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.25)
        ech = echelle_ceintures("verte").move_to(P(-0.6, -2.75))
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech))
        c = P(-5.45, -0.1)
        sect, cont = roue(ROUE_KERMESSE, 1.0, c)
        aig = aiguille(1.0, c)
        aig.add_updater(lambda m, dt: m.rotate(-4.0 * dt, about_point=c))
        d = de_qui_roule(P(4.2, -0.1), 1.2, periode=0.3)
        self.play(FadeIn(sect), FadeIn(cont), run_time=0.5)
        self.add(aig, d)
        self.au_mot("Toutes les issues")
        q = VGroup(self.t("Toutes les issues ont-elles", 34, BLEU_CALCUL),
                   self.t("la même chance ?", 36, BLEU_CALCUL)).arrange(DOWN, buff=0.2).move_to(P(-0.6, -0.1))
        self.play(FadeIn(q, shift=UP * 0.2))
        self.insister(q[1], 0.5)
        self.attendre_voix(marge=1.5)
        aig.clear_updaters()
        d.clear_updaters()

    # ── 01 : la kermesse ────────────────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.titre_ecran("À la kermesse")
        c = P(-4.3, -0.5)
        sect, cont, aig = self.roue_kermesse(1.9, c)
        self.play(FadeIn(sect, scale=0.6), Create(cont), run_time=1.0)
        self.add(aig)
        self.au_mot("4 couleurs")
        n = self.ligne([("4", JAUNE_TITRE), ("couleurs", WHITE)], 46, 0.2).move_to(P(2.0, 1.7))
        self.play(FadeIn(n, shift=UP * 0.2), run_time=0.5)
        noms = VGroup(*[self.t(m, 40, col) for m, col in
                        [("rouge", ROUGE), ("bleu", BLEU), ("vert", VERT), ("jaune", JAUNE)]])
        noms.arrange(RIGHT, buff=0.45).move_to(P(2.0, 0.75))
        mids = [180, 300, 0, 60]
        for ext, nom, s, m in zip(["rouge,", "bleu,", "vert et", "jaune."], noms, sect, mids):
            self.au_mot(ext)
            self.play(FadeIn(nom, shift=UP * 0.15), s.animate.shift(direction(m) * 0.3), run_time=0.3)
            self.play(s.animate.shift(-direction(m) * 0.3), run_time=0.25)
        self.au_mot("Le rouge prend la moitié")
        diam = Line(c + UP * 2.05, c + DOWN * 2.05, color=WHITE, stroke_width=7)
        moit = self.ligne([("rouge :", ROUGE), ("la moitié de la roue", WHITE)], 36, 0.2).move_to(P(2.0, -0.3))
        self.play(Create(diam), FadeIn(moit), run_time=0.7)
        self.pousser(sect[0], 180, 0.4)
        self.au_mot("Tu paries")
        self.play(Write(self.chute("Tu paries sur quelle couleur ?", color=BLEU_CALCUL, font_size=40)),
                  tourner(aig, 200, 3, 2.4))
        self.attendre_voix()

    # ── 02 : pas équiprobable ───────────────────────────────────────────────

    def ecran_pas_equi(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-pas-equi")
        self.titre_ecran("4 issues, pas la même chance")
        c = P(-4.3, -0.5)
        sect, cont, aig = self.roue_kermesse(1.9, c)
        self.add(sect, cont, aig)
        self.au_mot("4 issues")
        pastilles = VGroup(*[Dot(radius=0.2, color=col) for col in (ROUGE, BLEU, VERT, JAUNE)]).arrange(RIGHT, buff=0.3)
        l1 = self.ligne([("4", JAUNE_TITRE), ("issues :", WHITE), pastilles], 44, 0.25).move_to(P(2.0, 1.8))
        self.play(FadeIn(l1, shift=UP * 0.2), run_time=0.5)
        self.au_mot("pas la même chance")
        l2 = self.t("pas la même chance", 40, ORANGE_RETENUE).move_to(P(2.0, 0.9))
        self.play(FadeIn(l2), run_time=0.4)
        self.pousser(sect[0], 180, 0.4)
        self.pousser(sect[1], 300, 0.4)
        self.au_mot("Le rouge prend la moitié")
        self.play(tourner(aig, 160, 2, 1.8))
        self.play(Indicate(sect[0], color=ROUGE, scale_factor=1.05), run_time=0.6)
        self.au_mot("1 chance sur 2")
        frac = self.fraction(1, 2, 54, VERT_OK)
        l3 = self.ligne([("rouge :", ROUGE), ("1 chance sur 2 =", WHITE), frac], 38, 0.3).move_to(P(2.0, -0.45))
        self.play(FadeIn(l3[:2]), run_time=0.5)
        self.play(FadeIn(frac, shift=UP * 0.15), run_time=0.4)
        self.insister(frac)
        self.play(tourner(aig, 230, 2, 1.6))
        self.au_mot("pas équiprobables")
        self.play(Write(self.chute("Les issues ne sont pas équiprobables.", color=ORANGE_RETENUE, font_size=38)))
        self.attendre_voix()

    # ── 03 : définition ─────────────────────────────────────────────────────

    def ecran_definition(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-definition")
        self.titre_ecran("Équiprobable : la même chance")
        defi = VGroup(self.t("Équiprobable :", 36, VERT_OK),
                      self.t("toutes les issues ont la même chance", 36)).arrange(RIGHT, buff=0.25)
        defi.move_to(P(-0.4, 2.2))
        cadre = SurroundingRectangle(defi, color=VERT_OK, buff=0.2)
        self.play(FadeIn(defi), Create(cadre), run_time=0.8)
        self.au_mot("Un dé bien équilibré")
        d = de_qui_roule(P(-3.6, 0.65), 1.3, periode=0.25)
        self.add(d)
        lde = self.t("un dé équilibré", 30, BLEU_CALCUL).move_to(P(-3.6, -0.4))
        self.play(FadeIn(lde), run_time=0.4)
        self.au_mot("chaque face")
        faces = VGroup(*[de(k, 0.55) for k in range(1, 7)]).arrange(RIGHT, buff=0.15).move_to(P(-3.6, -1.2))
        self.play(LaggedStart(*[FadeIn(f, scale=0.5) for f in faces], lag_ratio=0.15), run_time=0.9)
        self.au_mot("1 chance sur 6")
        f6 = self.fraction(1, 6, 46, VERT_OK)
        l6 = self.ligne([("chaque face :", WHITE), f6], 34, 0.25).move_to(P(-3.6, -2.45))
        self.play(FadeIn(l6), run_time=0.5)
        self.insister(f6)
        self.au_mot("Une pièce")
        pc = piece_qui_tourne(P(2.4, 0.65), 0.85)
        self.add(pc)
        lpc = self.t("une pièce", 30, BLEU_CALCUL).move_to(P(2.4, -0.6))
        self.play(FadeIn(lpc), run_time=0.4)
        self.au_mot("1 chance sur 2")
        f2 = self.fraction(1, 2, 46, VERT_OK)
        l2 = self.ligne([("pile :", WHITE), f2], 34, 0.25).move_to(P(2.4, -1.75))
        self.play(FadeIn(l2), run_time=0.5)
        self.insister(f2)
        self.attendre_voix()
        d.clear_updaters()
        pc.clear_updaters()

    # ── 04 : les billes ─────────────────────────────────────────────────────

    def ecran_billes(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-billes")
        self.titre_ecran("Bille par bille")
        sac = sac_vide(2.4, 2.6).move_to(P(-4.9, -0.7))
        self.play(FadeIn(sac), run_time=0.4)
        cibles = [P(-5.5, -1.4), P(-4.8, -1.45), P(-5.15, -0.8), P(-4.3, -1.1)]
        billes = VGroup(*[bille(col, 0.3).move_to(p + UP * 3.4)
                          for col, p in zip([ROUGE, ROUGE, ROUGE, BLEU], cibles)])
        self.au_mot("3 billes rouges")
        t1 = self.ligne([("3", JAUNE_TITRE), ("billes rouges", ROUGE), ("et", WHITE),
                         ("1", JAUNE_TITRE), ("bleue", BLEU)], 38, 0.2).move_to(P(1.0, 2.05))
        self.add(billes)
        self.play(LaggedStart(*[b.animate.move_to(p) for b, p in zip(billes, cibles)], lag_ratio=0.25),
                  FadeIn(t1), run_time=1.3)
        self.au_mot("Deux couleurs")
        t2 = self.ligne([("2", JAUNE_TITRE), ("couleurs, mais pas la même chance", ORANGE_RETENUE)], 34, 0.2)
        t2.move_to(P(1.0, 1.3))
        self.play(FadeIn(t2, shift=UP * 0.15), run_time=0.5)
        self.au_mot("bille par bille")
        rang = [P(-1.6 + 1.05 * i, 0.3) for i in range(4)]
        for b, p in zip(billes, rang):
            self.play(b.animate.move_to(p + UP * 0.5), run_time=0.3)
            self.play(b.animate.move_to(p), run_time=0.2)
        self.au_mot("Les 4 billes sont équiprobables")
        t3 = self.ligne([("4", JAUNE_TITRE), ("billes équiprobables", WHITE)], 34, 0.2).move_to(P(0.0, -0.55))
        self.play(FadeIn(t3), LaggedStart(*[Indicate(b, color=WHITE, scale_factor=1.3) for b in billes],
                                          lag_ratio=0.2), run_time=1.0)
        self.au_mot("3 sont rouges")
        cadre = SurroundingRectangle(billes[:3], color=ROUGE, buff=0.12)
        t4 = self.ligne([("3", JAUNE_TITRE), ("sont rouges", ROUGE)], 34, 0.2).move_to(P(0.0, -1.2))
        self.play(Create(cadre), FadeIn(t4), run_time=0.6)
        self.au_mot("3 sur 4")
        f = self.fraction(3, 4, 54, VERT_OK)
        l = self.ligne([("probabilité du rouge =", WHITE), f], 40, 0.3).move_to(P(0.0, -2.4))
        self.play(FadeIn(l[0]), run_time=0.4)
        self.play(FadeIn(f, shift=UP * 0.15), run_time=0.4)
        self.insister(f)
        self.play(Circumscribe(f, color=VERT_OK), run_time=0.6)
        self.attendre_voix()

    # ── 05 : le piège ───────────────────────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-piege")
        self.titre_ecran("Le piège")
        sac = sac_vide(2.6, 2.8).move_to(P(-4.6, -0.4))
        cibles = [P(-5.25, -1.15), P(-4.5, -1.2), P(-4.9, -0.45), P(-3.95, -0.8)]
        billes = VGroup(*[bille(col, 0.33).move_to(p) for col, p in zip([ROUGE, ROUGE, ROUGE, BLEU], cibles)])
        self.add(sac, billes)
        self.au_mot("2 couleurs")
        f = self.fraction(1, 2, 50, ROUGE_ERREUR)
        faux = self.ligne([("2 couleurs", ROUGE_ERREUR), ("→", WHITE), f], 46, 0.35).move_to(P(1.4, 1.4))
        self.play(FadeIn(faux[:2]), run_time=0.5)
        self.au_mot("1 chance sur 2")
        self.play(FadeIn(f, shift=UP * 0.15), run_time=0.4)
        self.au_mot("Faux")
        self.play(Create(self.barrer(faux)), run_time=0.4)
        fx = self.t("Faux !", 60, ROUGE_ERREUR).move_to(P(1.4, 0.0))
        self.play(FadeIn(fx, scale=0.7), run_time=0.4)
        self.insister(fx, 0.35)
        self.au_mot("On compte les billes")
        nums = VGroup(*[self.t(str(k + 1), 28, WHITE).move_to(b) for k, b in enumerate(billes)])
        for b, n in zip(billes, nums):
            self.play(b.animate.scale(1.3), FadeIn(n), run_time=0.22)
            self.play(b.animate.scale(1 / 1.3), run_time=0.18)
        self.au_mot("pas les couleurs")
        self.play(Write(self.chute("On compte les billes, pas les couleurs.", color=VERT_OK, font_size=40)))
        self.attendre_voix()

    # ── 06 : défi ───────────────────────────────────────────────────────────

    def roue_defi(self, c, r=1.9, labels=True):
        sect, cont = roue(ROUE_DEFI, r, c)
        etiq = VGroup(
            self.t("180°", 36, WHITE).move_to(c + direction(150) * r * 0.58),  # au-dessus du pointillé des quarts
            self.t("90°", 34, BLACK).move_to(c + direction(315) * r * 0.58),
            self.t("90°", 34, BLACK).move_to(c + direction(45) * r * 0.58),
        )
        return sect, cont, etiq

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("06-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        c = P(-3.6, -0.4)
        sect, cont, etiq = self.roue_defi(c)
        self.play(Create(cont), run_time=0.5)
        for ext, s, e in zip(["bleu sur 180", "vert sur 90", "jaune sur 90"], sect, etiq):
            self.au_mot(ext)
            self.play(FadeIn(s), FadeIn(e), run_time=0.5)
        self.add(cont)
        aig = aiguille(1.9, c)
        self.add(aig)
        self.au_mot("Quelle est la probabilité du vert")
        q = self.ligne([("Probabilité du", BLEU_CALCUL), ("vert", VERT), ("?", BLEU_CALCUL)], 44, 0.2)
        q.move_to(P(2.4, 0.5))
        self.play(FadeIn(q, shift=UP * 0.2), tourner(aig, 300, 2, 2.0))
        self.insister(q[1], 0.4)
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=40)))
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("06b-correction")
        self.titre_ecran("Correction")
        c = P(-3.6, -0.4)
        r = 1.9
        sect, cont, etiq = self.roue_defi(c, r)
        self.add(sect, cont, etiq)
        self.au_mot("Le tour complet")
        tour = Circle(radius=r + 0.2, color=ORANGE_RETENUE, stroke_width=6).move_to(c)
        l1 = self.ligne([("tour complet :", WHITE), ("360°", ORANGE_RETENUE)], 40, 0.25).move_to(P(2.3, 1.8))
        self.play(Create(tour), FadeIn(l1), run_time=1.2)
        self.au_mot("Le vert en prend 90")
        l2 = self.ligne([("vert :", VERT), ("90°", VERT)], 40, 0.25).move_to(P(2.3, 0.9))
        self.play(FadeIn(l2), run_time=0.4)
        self.pousser(VGroup(sect[1], etiq[1]), 315, 0.45, 0.4)
        self.au_mot("90 sur 360")
        f1 = self.fraction(90, 360, 50, WHITE)
        eg = self.t("=", 50)
        f2 = self.fraction(1, 4, 54, VERT_OK)
        calc = VGroup(f1, eg, f2).arrange(RIGHT, buff=0.35).move_to(P(2.3, -0.75))
        self.play(FadeIn(f1, shift=UP * 0.15), run_time=0.5)
        self.au_mot("c'est 1 sur 4")
        quarts = VGroup(DashedLine(c + LEFT * r, c + RIGHT * r, color=WHITE, stroke_width=5),
                        DashedLine(c + UP * r, c + DOWN * r, color=WHITE, stroke_width=5))
        self.play(FadeIn(eg), FadeIn(f2, shift=UP * 0.15), Create(quarts), run_time=0.7)
        self.insister(f2)
        self.play(Circumscribe(f2, color=VERT_OK), run_time=0.6)
        self.attendre_voix()

    # ── 07 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)))
        acquis = [
            ("Équiprobable :", "Équiprobable : toutes les issues ont la même chance"),
            ("Sinon, on raisonne", "Sinon : des parts égales, billes ou secteurs"),
            ("Et 2 couleurs", "2 couleurs ne font pas 1/2"),
        ]
        lignes = VGroup(*[VGroup(self.coche(), self.t(txt, 40)).arrange(RIGHT, buff=0.3)
                          for _, txt in acquis])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.6)
        if lignes.width > 10.6:
            lignes.scale_to_fit_width(10.6)
        lignes.move_to(P(-0.9, 0.6))
        for (mot, _), l in zip(acquis, lignes):
            self.au_mot(mot)
            self.play(FadeIn(l[1], shift=RIGHT * 0.2), run_time=0.6)
            self.play(Create(l[0]), run_time=0.4)
        self.au_mot("L'épisode 4")
        self.play(Write(self.chute("Épisode 4 : les événements", color=VERT_OK, font_size=38)))
        self.attendre_voix(marge=1.0)

    # ── déroulé ─────────────────────────────────────────────────────────────

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_pas_equi()
        self.ecran_definition()
        self.ecran_billes()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="08-abonne")
