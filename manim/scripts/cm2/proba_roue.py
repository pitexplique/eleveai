# proba_roue.py
# EleveAI — Maths CM2 — série « Probabilités », épisode 4 : roue, dé, sac,
# compter les chances (micro : probabilite_roue_de_sac), AVEC VOIX.
# Paysage 16:9, CEINTURE BLANCHE. Short jumeau : proba_roue_short.py (jaune).
#
# Écrans : 00 garde · 01 la roue de 8 parts (3 R, 4 B, 1 V) · 02 compter
# (3, 4, 1 chances sur 8) · 03 le total (3 + 4 + 1 = 8, 8 sur 8, certain) ·
# 04 ne pas tomber sur le bleu (8 − 4 = 4) · 05 le dé (5 ou 6 : 2 chances
# sur 6) · 06 le piège (parts égales ?) · 07 défi du sac de 12 billes ·
# 07b correction · 08 ce que tu as appris · 09 abonnement.
#
# ⭐ Canvas repris du coach (lib/tutor-v4/components/ProbabilitesCanvas.tsx,
# banque cm2/maths/probabilites.bank.ts, micro probabilite_roue_de_sac) :
#   · « roue » des urnes colorées (urneCanvas) : une part par objet, de poids 1,
#     départ en haut, sens des aiguilles d'une montre, liseré foncé #0f172a,
#     lettre R / B / V blanche cernée de foncé, pointe noire en haut, moyeu
#     noir, sur carte blanche ;
#   · « roue » roueRougeFavoriCanvas (Rouge 3, Bleu 1, Vert 1, Jaune 1) : la
#     roue aux parts INÉGALES du piège ;
#   · « de » : carte blanche, 6 faces 3 × 2, faces surlignées en ambre ;
#   · « billes » : grille de colonnes min(6, max(3, ⌈√n⌉)) → 4 pour 12 billes.
#
# Voix : manim/voix/cm2-proba-roue.json (Julie, débit −10).
# Rendu : python -m manim render -qh --disable_caching manim/scripts/cm2/proba_roue.py ProbaRoueCM2 -o eleveai-maths-cm2-proba-roue --media_dir manim/scripts/cm2/media
# Puis copier le mp4 dans manim/sorties/cm2/maths/probabilites/04-roue-de-sac/.

import math
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from proba_hasard import (P, C_ROUGE, C_BLEU, C_VERT, C_JAUNE, ENCRE, ProbaHasardCM2,  # noqa: E402
                          de_coach_qui_roule, etiquette_blanche)
sys.path.insert(0, str(Path(__file__).resolve().parent))  # ⛔ proba_hasard a mis « seconde » devant :
from proba_vocabulaire import ProbaVocabulaireCM2, carte_billes, carte_de, surligner  # noqa: E402

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Notion6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

GRIS_PART = "#475569"     # une part « retirée » (assombrie)
CARTE_BORD = "#e2e8f0"

# la roue de l'épisode : 3 rouges, 4 bleues, 1 verte (comme urneCanvas)
ROUE_8 = [(C_ROUGE, "R", 1)] * 3 + [(C_BLEU, "B", 1)] * 4 + [(C_VERT, "V", 1)]
# roueRougeFavoriCanvas du coach : parts INÉGALES
ROUE_INEGALE = [(C_ROUGE, "Rouge", 3), (C_BLEU, "Bleu", 1), (C_VERT, "Vert", 1), (C_JAUNE, "Jaune", 1)]


def disque(segments, r=1.4, font_size=30):
    """Le disque de la roue du coach : départ en haut, sens horaire, chaque part
    proportionnelle à son poids. Renvoie VGroup(secteurs, lettres)."""
    total = sum(p for _, _, p in segments)
    secteurs, lettres = VGroup(), VGroup()
    a = PI / 2
    for coul, lbl, poids in segments:
        ang = poids / total * TAU
        s = AnnularSector(inner_radius=0, outer_radius=r, angle=-ang, start_angle=a,
                          fill_color=coul, fill_opacity=1, stroke_color=ENCRE, stroke_width=3)
        m = a - ang / 2
        secteurs.add(s)
        lettres.add(etiquette_blanche(lbl, font_size).move_to(P(0.62 * r * math.cos(m), 0.62 * r * math.sin(m))))
        a -= ang
    return VGroup(secteurs, lettres)


def roue(centre, segments=ROUE_8, r=1.4, font_size=30, carte=True):
    """Le canvas « roue » : disque, moyeu noir, pointe noire en haut, carte
    blanche. Renvoie (tout, disque) ; disque[0][i] = la part i."""
    d = disque(segments, r, font_size).move_to(centre)
    moyeu = Dot(centre, radius=r * 0.05, color=ENCRE)
    pointe = Polygon(P(0, 0), P(-0.16, 0.34), P(0.16, 0.34), fill_color=ENCRE, fill_opacity=1,
                     stroke_width=0).scale(r / 1.4).move_to(centre + UP * (r + 0.06), aligned_edge=DOWN)
    pointe.shift(DOWN * 0.22 * r / 1.4)
    g = VGroup()
    if carte:
        g.add(RoundedRectangle(width=2 * r + 0.8, height=2 * r + 1.0, corner_radius=0.2, fill_color=WHITE,
                               fill_opacity=1, stroke_color=CARTE_BORD, stroke_width=2).move_to(centre + UP * 0.1))
    g.add(d, moyeu, pointe)
    return g, d


class Toupie:
    """Fait tourner un disque (sens horaire) et sait l'arrêter PILE dans sa
    position de départ, pour que les parts retombent à leur place."""

    def __init__(self, scene, d, centre, vitesse=6.0):
        self.scene, self.d, self.c, self.v, self.angle = scene, d, centre, vitesse, 0.0

        def maj(m, dt):
            m.rotate(-self.v * dt, about_point=self.c)
            self.angle += self.v * dt

        self.maj = maj
        d.add_updater(maj)

    def arreter(self, run_time=1.2):
        self.d.remove_updater(self.maj)
        reste = TAU - (self.angle % TAU)
        self.scene.play(Rotate(self.d, -(reste + TAU), about_point=self.c), run_time=run_time,
                        rate_func=rate_functions.ease_out_cubic)
        self.angle = 0.0


SAC_12 = [(C_ROUGE, "R")] * 5 + [(C_BLEU, "B")] * 4 + [(C_VERT, "V")] * 3


def sac_billes(elements, centre, r=0.34, pas=0.85):
    """Un sac transparent autour du canvas « billes » du coach.
    Renvoie (sac, carte, billes)."""
    carte, billes = carte_billes(elements, r=r, pas=pas)
    carte.move_to(centre)
    corps = RoundedRectangle(width=carte.width + 0.7, height=carte.height + 0.7, corner_radius=0.5,
                             stroke_color=WHITE, stroke_width=4, fill_color="#E0F2FE",
                             fill_opacity=0.08).move_to(carte)
    col = Polygon(P(-0.7, 0), P(0.7, 0), P(0.4, 0.4), P(-0.4, 0.4), stroke_color=WHITE, stroke_width=4,
                  fill_color="#E0F2FE", fill_opacity=0.08).move_to(corps.get_top() + UP * 0.2)
    lien = Line(P(-0.5, 0), P(0.5, 0), color=ORANGE_RETENUE, stroke_width=7).move_to(corps.get_top() + UP * 0.22)
    return VGroup(corps, col, lien), carte, billes


class NotionCM2(Notion6e):
    identite = "Maths CM2 — EleveAI"


class ProbaRoueCM2(NotionCM2):
    nom_voix = "cm2-proba-roue"

    # les outils des épisodes 1 et 2, tels quels
    ligne = ProbaVocabulaireCM2.ligne
    chances = ProbaVocabulaireCM2.chances
    page_abonnement = ProbaHasardCM2.page_abonnement

    def t(self, texte, font_size=40, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def insister(self, mob, run_time=0.35):
        self.play(mob.animate.scale(1.5), run_time=run_time)
        self.play(mob.animate.scale(1 / 1.5), run_time=run_time)

    def pulser(self, mobs, k=1.18, run_time=0.25):
        self.play(*[m.animate.scale(k) for m in mobs], run_time=run_time)
        self.play(*[m.animate.scale(1 / k) for m in mobs], run_time=run_time)

    def parts(self, d, idx):
        """Les parts idx (secteur + lettre) d'un disque, pour les faire bouger."""
        return [VGroup(d[0][i], d[1][i]) for i in idx]

    def regrouper(self, d, *devant):
        """Remet le disque d'un seul tenant dans la scène (les updaters ne
        tournent que sur ce qui y est), le moyeu et la pointe devant."""
        self.remove(*d[0], *d[1])
        self.add(d)
        self.bring_to_front(*devant)

    def barrer(self, mob, color=ROUGE_ERREUR, sw=8):
        return Line(mob.get_corner(DL) + LEFT * 0.1, mob.get_corner(UR) + RIGHT * 0.1,
                    stroke_width=sw, color=color)

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.ligne([("Roue,", C_ROUGE), ("dé,", WHITE), ("sac :", C_BLEU), ("compter les chances", JAUNE_TITRE)],
                           54, 0.25).to_edge(UP, buff=0.6)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.25)
        ech = echelle_ceintures("blanche").move_to(P(-0.6, -2.75))
        self.add(ech)
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), run_time=0.9)
        c = P(-4.2, -0.05)
        r, d = roue(c, ROUE_8, 1.15, 24)
        self.play(FadeIn(r, scale=0.8), run_time=0.4)
        toupie = Toupie(self, d, c, 7.0)
        self.au_mot("dé,")
        de_r = de_coach_qui_roule(P(-0.9, -0.05), 1.35)
        self.add(de_r)
        self.au_mot("sac")
        sac, carte, billes = sac_billes(SAC_12, P(2.3, -0.2), r=0.24, pas=0.6)
        self.play(Create(sac), FadeIn(carte[0]), LaggedStart(*[FadeIn(b, scale=0.3) for b in billes], lag_ratio=0.05),
                  run_time=0.8)
        self.attendre_voix(marge=1.0)
        de_r.clear_updaters()
        toupie.arreter(0.6)

    # ── 01 : la roue de 8 parts ─────────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        c = P(-3.6, -0.1)
        r, d = roue(c, ROUE_8, 1.75, 34)
        carte, d_, moyeu, pointe = r
        for s in d[0]:
            s.set_fill(GRIS_PART)
        self.au_mot("Une roue de 8 parts")
        self.play(FadeIn(carte), LaggedStart(*[GrowFromPoint(s, c) for s in d[0]], lag_ratio=0.1),
                  FadeIn(moyeu), FadeIn(pointe), run_time=1.0)
        huit = self.ligne([("8", JAUNE_TITRE), ("parts", WHITE)], 52, 0.25).move_to(P(2.2, 2.4))
        self.play(FadeIn(huit, shift=LEFT * 0.2), run_time=0.4)
        lignes = [("3 rouges", C_ROUGE, range(0, 3), "3", "rouges"), ("4 bleues", C_BLEU, range(3, 7), "4", "bleues"),
                  ("1 verte", C_VERT, range(7, 8), "1", "verte")]
        y = 1.15
        for ex, coul, idx, n, mot in lignes:
            self.au_mot(ex)
            l = self.ligne([(n, JAUNE_TITRE), (mot, coul)], 50, 0.25).move_to(P(2.2, y))
            self.play(*[d[0][i].animate.set_fill(coul) for i in idx], *[FadeIn(d[1][i]) for i in idx],
                      FadeIn(l, shift=LEFT * 0.2), run_time=0.45)
            self.pulser(self.parts(d, idx), 1.12, 0.2)
            y -= 1.15
        self.au_mot("On la fait tourner")
        self.regrouper(d, moyeu, pointe)
        toupie = Toupie(self, d, c, 8.0)
        self.attendre_voix(marge=0.4)
        toupie.arreter(1.0)

    # la roue posée à gauche (écrans 02 à 04)
    C_ROUE = P(-3.6, -0.1)

    def poser_roue(self):
        r, d = roue(self.C_ROUE, ROUE_8, 1.75, 34)
        self.add(r)
        return r, d

    # ── 02 : compter ────────────────────────────────────────────────────────

    def ecran_compter(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-compter")
        r, d = self.poser_roue()
        self.au_mot("8 parts en tout")
        tout = self.ligne([("8", JAUNE_TITRE), ("parts en tout", WHITE)], 46, 0.25).move_to(P(2.2, 2.45))
        contours = VGroup(*[s.copy().set_fill(opacity=0).set_stroke(JAUNE_TITRE, 7) for s in d[0]])
        self.play(LaggedStart(*[Create(k) for k in contours], lag_ratio=0.12), FadeIn(tout, shift=LEFT * 0.2),
                  run_time=1.0)
        self.play(FadeOut(contours), run_time=0.3)
        y = 1.1
        for coul, idx, n, ex1, ex2 in [(C_ROUGE, range(0, 3), 3, "3 rouges", "3 chances sur 8"),
                                       (C_BLEU, range(3, 7), 4, "4 bleues", "4 chances sur 8"),
                                       (C_VERT, range(7, 8), 1, "1 verte", "1 chance sur 8")]:
            self.au_mot(ex1)
            pastille = Square(0.45, fill_color=coul, fill_opacity=1, stroke_color=WHITE, stroke_width=2)
            self.pulser(self.parts(d, idx), 1.15, 0.25)
            self.au_mot(ex2)
            l = self.chances(n, 8, 48)
            l[0].set_color(coul)
            g = VGroup(pastille, l).arrange(RIGHT, buff=0.35).move_to(P(2.2, y))
            self.play(FadeIn(g, shift=LEFT * 0.2), run_time=0.4)
            y -= 1.15
        self.attendre_voix()

    # ── 03 : le total ───────────────────────────────────────────────────────

    def ecran_total(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-total")
        r, d = self.poser_roue()
        somme = self.ligne([("3", C_ROUGE), ("+", WHITE), ("4", C_BLEU), ("+", WHITE), ("1", C_VERT), ("=", WHITE),
                            ("8", JAUNE_TITRE)], 64, 0.3).move_to(P(2.2, 1.9))
        for ex, morceaux, idx in [("3 plus", [0], range(0, 3)), ("4 plus", [1, 2], range(3, 7)),
                                  ("1, ça", [3, 4], range(7, 8))]:
            self.au_mot(ex)
            self.play(*[FadeIn(somme[k], shift=UP * 0.15) for k in morceaux],
                      *[m.animate.scale(1.15) for m in self.parts(d, idx)], run_time=0.3)
            self.play(*[m.animate.scale(1 / 1.15) for m in self.parts(d, idx)], run_time=0.2)
        self.au_mot("fait 8")
        self.play(FadeIn(somme[5]), FadeIn(somme[6], scale=0.5), run_time=0.35)
        self.insister(somme[6], 0.25)
        self.au_mot("toutes les chances réunies")
        anneau = Circle(radius=1.85, stroke_color=JAUNE_TITRE, stroke_width=9).move_to(self.C_ROUE)
        self.play(Create(anneau), run_time=0.7)
        self.bring_to_front(r[-1])  # la pointe repasse devant l'anneau
        self.au_mot("8 sur 8")
        huit = self.ligne([("8", JAUNE_TITRE), ("sur", WHITE), ("8", JAUNE_TITRE)], 64, 0.3).move_to(P(2.2, 0.35))
        self.play(FadeIn(huit, shift=UP * 0.2), run_time=0.4)
        self.insister(huit, 0.3)
        self.au_mot("C'est certain")
        cert = self.t("certain", 60, VERT_OK).move_to(P(2.2, -1.25))
        coche = self.coche(taille=0.35).next_to(cert, LEFT, buff=0.35)
        self.play(FadeIn(cert, scale=0.6), Create(coche), run_time=0.5)
        self.attendre_voix()

    # ── 04 : ne pas tomber sur le bleu ──────────────────────────────────────

    def ecran_ne_pas(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-ne-pas")
        r, d = self.poser_roue()
        titre = self.ligne([("Ne pas tomber sur le", WHITE), ("bleu", C_BLEU)], 44, 0.2).to_edge(UP, buff=0.4)
        self.play(Write(titre), run_time=0.7)
        calc = self.ligne([("8", JAUNE_TITRE), ("−", WHITE), ("4", C_BLEU), ("=", WHITE), ("4", VERT_OK)],
                          70, 0.35).move_to(P(2.2, 1.2))
        self.au_mot("8 parts")
        self.play(FadeIn(calc[0], scale=0.5), *[m.animate.scale(1.1) for m in self.parts(d, range(8))],
                  run_time=0.35)
        self.play(*[m.animate.scale(1 / 1.1) for m in self.parts(d, range(8))], run_time=0.25)
        self.au_mot("moins 4 bleues")
        bleues = range(3, 7)
        self.play(FadeIn(calc[1]), FadeIn(calc[2], shift=UP * 0.15),
                  *[d[0][i].animate.set_fill(GRIS_PART) for i in bleues],
                  *[d[1][i].animate.set_opacity(0.25) for i in bleues], run_time=0.6)
        self.au_mot("il reste 4 parts")
        reste = [0, 1, 2, 7]
        contours = VGroup(*[d[0][i].copy().set_fill(opacity=0).set_stroke(WHITE, 9) for i in reste])
        self.play(FadeIn(calc[3]), FadeIn(calc[4], scale=0.5), Create(contours), run_time=0.5)
        self.insister(calc[4], 0.25)
        self.au_mot("4 chances sur 8")
        res = self.chances(4, 8, 50, VERT_OK).move_to(P(2.4, -0.6))
        res[3].set_color(JAUNE_TITRE)
        self.play(FadeIn(res, shift=UP * 0.2), run_time=0.45)
        self.insister(res, 0.3)
        self.attendre_voix()

    # ── 05 : le dé ──────────────────────────────────────────────────────────

    def ecran_de(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-de")
        cde = P(-3.0, 0.2)
        self.au_mot("Avec un dé")
        roule = de_coach_qui_roule(cde, 1.6)
        self.add(roule)
        self.au_mot("faire un nombre")
        carte, faces = carte_de(1.1, 0.2)
        carte.move_to(cde)
        roule.clear_updaters()
        self.play(FadeOut(roule, scale=0.6), FadeIn(carte, scale=0.8), run_time=0.5)
        self.au_mot("plus grand que 4")
        q = self.ligne([("plus grand que", WHITE), ("4", JAUNE_TITRE)], 50, 0.25).move_to(P(2.8, 1.9))
        self.play(FadeIn(q, shift=LEFT * 0.2), run_time=0.4)
        self.play(Indicate(faces[3], color=JAUNE_TITRE, scale_factor=1.15), run_time=0.5)
        for ex, f in [("5 ou", 5), ("ou 6", 6)]:
            self.au_mot(ex)
            self.play(*surligner(faces[f - 1]), run_time=0.2)
            self.play(faces[f - 1].animate.scale(1.25), run_time=0.2)
            self.play(faces[f - 1].animate.scale(1 / 1.25), run_time=0.2)
        cinq_six = self.ligne([("5", VERT_OK), ("ou", WHITE), ("6", VERT_OK)], 56, 0.3).move_to(P(2.8, 0.75))
        self.play(FadeIn(cinq_six, shift=UP * 0.15), run_time=0.3)
        self.au_mot("2 chances sur 6")
        res = self.chances(2, 6, 50, VERT_OK).move_to(P(3.0, -0.6))
        res[3].set_color(JAUNE_TITRE)
        self.play(FadeIn(res, shift=UP * 0.2), run_time=0.45)
        self.insister(res, 0.3)
        self.attendre_voix()

    # ── 06 : le piège ───────────────────────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-piege")
        self.titre_ecran("Le piège")
        cg, cd = P(-3.9, -0.45), P(1.7, -0.45)
        rg, dg = roue(cg, ROUE_INEGALE, 1.45, 22)
        rd, dd = roue(cd, ROUE_8, 1.45, 26)
        self.au_mot("compter les parts")
        self.play(FadeIn(rg, scale=0.85), run_time=0.5)
        self.au_mot("ne marche que si")
        croix = VGroup(Line(P(-1.2, 1.2), P(1.2, -1.2)), Line(P(-1.2, -1.2), P(1.2, 1.2))).set_stroke(ROUGE_ERREUR, 12)
        croix.move_to(cg)
        self.play(Create(croix), run_time=0.5)
        self.au_mot("la même taille")
        mt = self.t("même taille", 46, JAUNE_TITRE).move_to(P(-0.9, 2.35))
        self.play(FadeIn(mt, scale=0.7), run_time=0.4)
        self.play(VGroup(dg[0][0], dg[1][0]).animate.scale(1.12, about_point=cg), run_time=0.3)
        self.play(VGroup(dg[0][0], dg[1][0]).animate.scale(1 / 1.12, about_point=cg), run_time=0.3)
        self.bring_to_front(rg[-2], rg[-1], croix)
        self.au_mot("Ici, les 8 parts")
        self.play(FadeIn(rd, scale=0.85), run_time=0.5)
        contours = VGroup(*[s.copy().set_fill(opacity=0).set_stroke(JAUNE_TITRE, 6) for s in dd[0]])
        self.play(LaggedStart(*[Create(k) for k in contours], lag_ratio=0.1), run_time=0.8)
        self.au_mot("sont égales")
        eg = self.ligne([("8", JAUNE_TITRE), ("parts égales", WHITE)], 38, 0.2).next_to(rd, DOWN, buff=0.15)
        self.play(FadeIn(eg, shift=UP * 0.15), run_time=0.4)
        self.au_mot("on peut compter")
        ok = self.coche(taille=0.45).next_to(rd, RIGHT, buff=0.35)
        self.play(Create(ok), contours.animate.set_stroke(VERT_OK), run_time=0.5)
        self.insister(ok, 0.25)
        self.attendre_voix()

    # ── 07 : défi, le sac de 12 billes ──────────────────────────────────────

    C_SAC = P(-3.4, -0.15)

    def le_sac(self):
        sac, carte, billes = sac_billes(SAC_12, self.C_SAC, r=0.36, pas=0.92)
        for b in billes[9:]:  # les vertes : on ne les voit pas encore
            b[0].set_fill(GRIS_PART)
            b[1].set_opacity(0)
        return sac, carte, billes

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)), run_time=0.7)
        sac, carte, billes = self.le_sac()
        x = 2.4
        self.au_mot("12 billes")
        for b in billes[:9]:
            b[0].set_fill(GRIS_PART)
            b[1].set_opacity(0)
        douze = self.ligne([("12", JAUNE_TITRE), ("billes", WHITE)], 48, 0.22).move_to(P(x, 2.1))
        self.play(Create(sac), FadeIn(carte[0]), LaggedStart(*[FadeIn(b, scale=0.3) for b in billes], lag_ratio=0.06),
                  FadeIn(douze, shift=LEFT * 0.2), run_time=1.0)
        for ex, idx, coul, n, mot, y in [("5 rouges", range(0, 5), C_ROUGE, "5", "rouges", 1.25),
                                         ("4 bleues", range(5, 9), C_BLEU, "4", "bleues", 0.4)]:
            self.au_mot(ex)
            l = self.ligne([(n, JAUNE_TITRE), (mot, coul)], 48, 0.22).move_to(P(x, y))
            self.play(*[billes[i][0].animate.set_fill(coul) for i in idx],
                      *[billes[i][1].animate.set_opacity(1) for i in idx], FadeIn(l, shift=LEFT * 0.2), run_time=0.45)
        self.au_mot("les autres vertes")
        la = self.ligne([("les autres", WHITE), ("vertes", C_VERT)], 44, 0.22).move_to(P(x, -0.45))
        qs = VGroup(*[Text("?", font_size=34, color=WHITE, weight=BOLD).move_to(b) for b in billes[9:]])
        self.play(FadeIn(la, shift=LEFT * 0.2), FadeIn(qs, scale=0.5), run_time=0.45)
        self.au_mot("Combien de chances")
        q = VGroup(self.t("Combien de chances", 36, ORANGE_RETENUE),
                   self.t("de tirer une verte ?", 36, ORANGE_RETENUE)).arrange(DOWN, buff=0.15).move_to(P(x, -1.65))
        self.play(FadeIn(q, scale=0.7), run_time=0.4)
        self.pulser(list(billes[9:]) + list(qs), 1.25, 0.25)
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=40)))
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("07b-correction")
        self.titre_ecran("Correction")
        sac, carte, billes = self.le_sac()
        self.add(sac, carte)
        calc = self.ligne([("12", JAUNE_TITRE), ("−", WHITE), ("5", C_ROUGE), ("−", WHITE), ("4", C_BLEU)],
                          62, 0.3).move_to(P(2.4, 1.7))
        fin = self.ligne([("=", WHITE), ("3", VERT_OK), ("vertes", C_VERT)], 62, 0.3)
        fin.next_to(calc, DOWN, buff=0.4).align_to(calc, LEFT)
        self.au_mot("12 moins")
        self.play(FadeIn(calc[0], scale=0.5), run_time=0.3)
        self.pulser(list(billes), 1.15, 0.2)
        for ex, morceaux, idx in [("moins 5", [1, 2], range(0, 5)), ("moins 4", [3, 4], range(5, 9))]:
            self.au_mot(ex)
            self.play(*[FadeIn(calc[k], shift=UP * 0.15) for k in morceaux],
                      *[billes[i].animate.set_opacity(0.2) for i in idx], run_time=0.5)
        self.au_mot("3 vertes")
        vertes = list(billes[9:])
        self.play(FadeIn(fin, shift=UP * 0.15), *[b[0].animate.set_fill(C_VERT) for b in vertes],
                  *[b[1].animate.set_opacity(1) for b in vertes], run_time=0.45)
        self.pulser(vertes, 1.3, 0.25)
        self.au_mot("3 chances sur 12")
        res = self.chances(3, 12, 46, VERT_OK).move_to(P(3.0, -0.9))
        res[3].set_color(JAUNE_TITRE)
        self.play(FadeIn(res, shift=UP * 0.2), run_time=0.45)
        self.insister(res, 0.3)
        self.attendre_voix()

    # ── 08 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-finale")
        self.play(Write(self.t("Ce que tu as appris", 46, JAUNE_TITRE).to_edge(UP)), run_time=0.7)
        textes = [
            [("Je compte", WHITE), ("tous les cas,", JAUNE_TITRE), ("puis les", WHITE), ("cas gagnants.", VERT_OK)],
            [("Toutes les chances réunies font le", WHITE), ("total.", JAUNE_TITRE)],
            [("Ne pas gagner :", ORANGE_RETENUE), ("le total moins les gagnants.", WHITE)],
        ]
        lignes = VGroup(*[VGroup(self.coche(taille=0.25), self.ligne(m, 42, 0.22)).arrange(RIGHT, buff=0.3)
                          for m in textes]).arrange(DOWN, aligned_edge=LEFT, buff=1.0)
        if lignes.width > 12.4:
            lignes.scale_to_fit_width(12.4)
        lignes.move_to(P(-0.3, 0.4))
        for ex, l in zip(["Je compte tous", "Toutes les chances", "Ne pas gagner"], lignes):
            self.au_mot(ex)
            self.play(FadeIn(l[1], shift=RIGHT * 0.2), run_time=0.6)
            self.play(Create(l[0]), run_time=0.3)
        self.au_mot("L'épisode 5")
        self.play(Write(self.chute("L'épisode 5 t'attend : le défi.", color=VERT_OK, font_size=40)))
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_compter()
        self.ecran_total()
        self.ecran_ne_pas()
        self.ecran_de()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="09-abonne")
