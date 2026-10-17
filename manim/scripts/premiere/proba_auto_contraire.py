# proba_auto_contraire.py
# EleveAI — Maths 1re TRONC COMMUN (automatismes) — série « Probabilités »,
# épisode 2 : l'événement contraire, 1 − p (micro : auto_proba_contraire),
# AVEC VOIX. Paysage 16:9, CEINTURE BLEUE. Short jumeau :
# proba_auto_contraire_short.py (ceinture jaune, la météo).
#
# ⭐ Le fil : le SCHÉMA EN BARRE du coach (canvas `schema_barre`,
# lib/canvas/SchemaBarreCanvas.tsx) : carte blanche, barre partagée en parts
# PROPORTIONNELLES à leur valeur (bleu clair #dbeafe, vert clair #dcfce7),
# la part inconnue en rose #fee2e2 cerclée de rouge avec un « ? », le total
# au-dessus (trait + taquets + étiquette), le nom de chaque part dessous.
#   A et A barre = les deux parts d'une même barre ; leur total = 1 (ou 100 %).
# Le piège : les trois cases « en avance / à l'heure / en retard » à la manière
# du tableau de loi du coach (`tableau_donnees`, canvasLoi de la banque :
# en-tête ardoise, cases blanches) : le contraire de « en avance », ce sont
# les DEUX autres cases.
#
# Écrans : 00 garde · 01 l'éolienne (0,85) · 02 le contraire, A barre · 03 la
# règle 1 − 0,85 · 04 en pourcentage (emballages 30 %) · 05 le piège du colis ·
# 06 défi des bouteilles · 06b correction · 07 ce que tu as appris · 08 abonnement.
#
# Voix : manim/voix/premiere-commun-proba-contraire.json (Julie, débit −7).
# Rendu : python -m manim render -qh --disable_caching manim/scripts/premiere/proba_auto_contraire.py ProbaContrairePremiereCommun -o eleveai-maths-premiere-commun-proba-contraire --media_dir manim/scripts/premiere/media
# Puis copier le mp4 dans manim/sorties/premiere-commun/maths/probabilites/02-contraire/.

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

# Couleurs du canvas du coach (SchemaBarreCanvas.tsx, Tailwind).
BLEU_PART = "#DBEAFE"
VERT_PART = "#DCFCE7"
JAUNE_PART = "#FEF3C7"
ROSE_INCONNU = "#FEE2E2"
ROUGE_INCONNU = "#DC2626"
CONTOUR = "#334155"
ENCRE = "#0F172A"
ARDOISE = "#1E293B"
CARTON = "#B45309"


class NotionPremiereCommun(Notion6e):
    identite = "Maths 1re — EleveAI"


def P(x, y):
    return np.array([x, y, 0.0])


# ── les écritures (que des Text) ────────────────────────────────────────────

def barre_sur(lettre, color=None, sw=3.5):
    """Le trait au-dessus d'une lettre (A barre)."""
    l = Line(lettre.get_corner(UL) + UP * 0.07, lettre.get_corner(UR) + UP * 0.07, stroke_width=sw)
    l.set_color(color or lettre.get_color())
    return l


def a_barre(font_size=36, color=WHITE, weight=BOLD):
    a = Text("A", font_size=font_size, color=color, weight=weight)
    return VGroup(a, barre_sur(a, color))


def ecrit(texte, font_size=36, color=WHITE, barres=()):
    """Un Text, avec des barres au-dessus des glyphes d'indices `barres`
    (les espaces ne comptent pas)."""
    T = Text(texte, font_size=font_size, color=color)
    return VGroup(T, *[barre_sur(T[i], color) for i in barres])


# ── les dessins ─────────────────────────────────────────────────────────────

def eolienne(h=2.6, pales_vg=None):
    """Mât + nacelle + trois pales. Renvoie (éolienne, pales) ; les pales
    tournent autour du moyeu (pales.moyeu)."""
    mat = Polygon(P(-0.09, 0), P(0.09, 0), P(0.045, h), P(-0.045, h),
                  fill_color="#E5E7EB", fill_opacity=1, stroke_color=GREY_B, stroke_width=1.5)
    moyeu = P(0, h)
    pales = VGroup()
    for k in range(3):
        pale = Polygon(P(-0.07, 0.1), P(0.07, 0.1), P(0.03, h * 0.5), P(-0.01, h * 0.52),
                       fill_color=WHITE, fill_opacity=1, stroke_color=GREY_B, stroke_width=1.2)
        pale.shift(moyeu).rotate(k * TAU / 3, about_point=moyeu)
        pales.add(pale)
    nacelle = Circle(radius=0.11, fill_color=GREY_C, fill_opacity=1, stroke_color=WHITE,
                     stroke_width=1.5).move_to(moyeu)
    sol = Line(P(-0.6, 0), P(0.6, 0), color=VERT_OK, stroke_width=4)
    return VGroup(sol, mat, pales, nacelle), pales, nacelle


def faire_tourner(pales, nacelle, vitesse=2.2):
    etat = {"v": vitesse}

    def maj(m, dt):
        m.rotate(-etat["v"] * dt, about_point=nacelle.get_center())

    pales.add_updater(maj)
    return etat


def colis(s=1.0):
    boite = Rectangle(width=1.2, height=0.85, fill_color=CARTON, fill_opacity=1, stroke_color="#78350F",
                      stroke_width=2)
    dessus = Polygon(P(-0.6, 0.425), P(0.6, 0.425), P(0.8, 0.65), P(-0.4, 0.65),
                     fill_color="#D97706", fill_opacity=1, stroke_color="#78350F", stroke_width=2)
    scotch = Rectangle(width=0.18, height=0.85, fill_color="#FDE68A", fill_opacity=0.9, stroke_width=0)
    return VGroup(boite, dessus, scotch).scale(s)


def emballage(s=1.0):
    """Un emballage qu'on rapporte : la boîte et la flèche du retour."""
    b = colis(0.8)
    fl = CurvedArrow(P(0.75, 0.55), P(-0.75, 0.55), angle=TAU / 3, color=VERT_OK, stroke_width=5)
    return VGroup(b, fl).scale(s)


def bouteille(couleur="#22C55E", s=1.0):
    corps = RoundedRectangle(width=0.42, height=0.95, corner_radius=0.12, fill_color=couleur,
                             fill_opacity=0.55, stroke_color=couleur, stroke_width=2.5)
    epaule = Polygon(P(-0.21, 0.42), P(0.21, 0.42), P(0.09, 0.66), P(-0.09, 0.66),
                     fill_color=couleur, fill_opacity=0.55, stroke_color=couleur, stroke_width=2.5)
    col = Rectangle(width=0.16, height=0.18, fill_color=couleur, fill_opacity=0.55,
                    stroke_color=couleur, stroke_width=2.5).move_to(P(0, 0.75))
    bouchon = Rectangle(width=0.2, height=0.1, fill_color=WHITE, fill_opacity=1, stroke_width=0).move_to(P(0, 0.88))
    return VGroup(corps, epaule, col, bouchon).scale(s)


def nuage(s=1.0, couleur="#9CA3AF"):
    return VGroup(*[Circle(radius=r, fill_color=couleur, fill_opacity=1, stroke_width=0).move_to(P(x, y))
                    for x, y, r in [(-0.5, 0.0, 0.35), (0.0, 0.2, 0.48), (0.5, 0.0, 0.35),
                                    (-0.15, -0.1, 0.3), (0.25, -0.1, 0.3)]]).scale(s)


def pluie(s=1.0):
    n = nuage(1.0, "#6B7280")
    gouttes = VGroup(*[Line(P(x, y), P(x - 0.08, y - 0.28), color=BLEU_CALCUL, stroke_width=4)
                       for x, y in [(-0.55, -0.45), (-0.2, -0.55), (0.15, -0.45), (0.5, -0.55),
                                    (-0.38, -0.9), (0.32, -0.9), (-0.02, -1.0)]])
    return VGroup(n, gouttes).scale(s)


def soleil(s=1.0):
    disque = Circle(radius=0.42, fill_color="#FACC15", fill_opacity=1, stroke_color="#F59E0B", stroke_width=3)
    rayons = VGroup(*[Line(P(0.55 * math.cos(a), 0.55 * math.sin(a)), P(0.8 * math.cos(a), 0.8 * math.sin(a)),
                           color="#FACC15", stroke_width=5) for a in np.linspace(0, TAU, 9)[:-1]])
    return VGroup(rayons, disque).scale(s)


# ── le schéma en barre du coach (SchemaBarreCanvas.tsx) ─────────────────────

class SchemaBarre:
    """La carte blanche du coach, sa barre partagée en parts proportionnelles.

    parts : [(poids, couleur)] ; inconnue=True → rose cerclé de rouge.
    Les nombres et les noms se posent à part (valeur / nom / total), au moment
    où la voix les dit.
    """

    def __init__(self, parts, centre=P(-0.6, 0.0), largeur=8.6, h_barre=1.0,
                 carte=(9.6, 3.3), dy_barre=0.15, fs_val=34, fs_nom=26):
        self.centre, self.fs_val, self.fs_nom = centre, fs_val, fs_nom
        self.carte = RoundedRectangle(width=carte[0], height=carte[1], corner_radius=0.25,
                                      fill_color=WHITE, fill_opacity=1, stroke_color="#CBD5E1",
                                      stroke_width=2).move_to(centre)
        somme = sum(p for p, *_ in parts)
        x = centre[0] - largeur / 2
        self.y = centre[1] + dy_barre
        self.rects = VGroup()
        for k, part in enumerate(parts):
            poids, couleur = part[0], part[1]
            inconnue = len(part) > 2 and part[2]
            w = largeur * poids / somme
            r = Rectangle(width=w, height=h_barre, fill_color=ROSE_INCONNU if inconnue else couleur,
                          fill_opacity=1, stroke_color=ROUGE_INCONNU if inconnue else CONTOUR,
                          stroke_width=3)
            r.move_to(P(x + w / 2, self.y))
            self.rects.add(r)
            x += w
        self.h = h_barre
        self.gauche = centre[0] - largeur / 2
        self.droite = centre[0] + largeur / 2

    def tout(self):
        return VGroup(self.carte, self.rects)

    def valeur(self, i, texte, color=ENCRE):
        t = Text(texte, font_size=self.fs_val, color=color, weight=BOLD)
        if t.width > self.rects[i].width - 0.12:
            t.scale_to_fit_width(self.rects[i].width - 0.12)
        return t.move_to(self.rects[i])

    def inconnu(self, i):
        return Text("?", font_size=self.fs_val + 10, color=ROUGE_INCONNU, weight=BOLD).move_to(self.rects[i])

    def nom(self, i, mob, color=CONTOUR):
        if isinstance(mob, str):
            mob = Text(mob, font_size=self.fs_nom, color=color, weight=BOLD)
        mob.next_to(self.rects[i], DOWN, buff=0.2)
        # le nom reste DANS la carte
        mob.shift(LEFT * max(0, mob.get_right()[0] - (self.carte.get_right()[0] - 0.2)))
        mob.shift(RIGHT * max(0, (self.carte.get_left()[0] + 0.2) - mob.get_left()[0]))
        return mob

    def total(self, texte, i0=0, i1=None):
        """Le total au-dessus : un trait, deux taquets, l'étiquette au milieu."""
        i1 = len(self.rects) - 1 if i1 is None else i1
        xg = self.rects[i0].get_left()[0]
        xd = self.rects[i1].get_right()[0]
        y = self.y + self.h / 2 + 0.42
        trait = Line(P(xg, y), P(xd, y), color=ENCRE, stroke_width=3)
        taquets = VGroup(*[Line(P(x, y - 0.13), P(x, y + 0.13), color=ENCRE, stroke_width=3) for x in (xg, xd)])
        lbl = Text(texte, font_size=self.fs_val - 4, color=ENCRE, weight=BOLD)
        boite = RoundedRectangle(width=lbl.width + 0.4, height=lbl.height + 0.22, corner_radius=0.1,
                                 fill_color="#F8FAFC", fill_opacity=1, stroke_color="#CBD5E1", stroke_width=1.5)
        boite.move_to(P((xg + xd) / 2, y))
        lbl.move_to(boite)
        return VGroup(trait, taquets, boite, lbl)

    def devient_connue(self, i, couleur):
        return self.rects[i].animate.set_fill(couleur).set_stroke(CONTOUR)


class ProbaContrairePremiereCommun(NotionPremiereCommun):
    nom_voix = "premiere-commun-proba-contraire"

    CARTE_Y = -1.25

    def t(self, texte, font_size=36, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def ligne(self, morceaux, font_size=40, buff=0.24):
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

    def barrer(self, mob, color=ROUGE_ERREUR, sw=6):
        return Line(mob.get_corner(DL) + LEFT * 0.08, mob.get_corner(UR) + RIGHT * 0.08,
                    stroke_width=sw, color=color)

    def schema(self, parts, **kw):
        kw.setdefault("centre", P(-0.6, self.CARTE_Y))
        kw.setdefault("carte", (9.6, 2.9))
        return SchemaBarre(parts, **kw)

    def formule(self, font_size=40, color=WHITE):
        """« P(Ā) = 1 − P(A) » : P ( A ) = 1 − P ( A ) → barre sur le glyphe 2."""
        return ecrit("P(A) = 1 − P(A)", font_size, color, barres=(2,))

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("L'événement contraire", 54, JAUNE_TITRE).to_edge(UP, buff=0.7)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.25)
        ech = echelle_ceintures("bleue").move_to(P(-0.6, -2.7))
        sb = self.schema([(0.7, BLEU_PART), (0.3, VERT_PART)], centre=P(-0.6, 0.05), carte=(9.6, 2.0),
                         dy_barre=0.0, h_barre=1.1)
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech), FadeIn(sb.tout()), run_time=1.0)
        self.au_mot("1 moins p")
        p = sb.valeur(0, "p", ENCRE).scale(1.3)
        unmp = sb.valeur(1, "1 − p", ENCRE).scale(1.2)
        self.play(FadeIn(unmp, scale=0.5), FadeIn(p, scale=0.5), run_time=0.5)
        self.insister(unmp, 0.35)
        self.attendre_voix(marge=1.2)

    # ── 01 : l'éolienne ─────────────────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.titre_ecran("Une éolienne")
        eo, pales, nacelle = eolienne(2.0)
        eo.move_to(P(-4.4, 0.45), aligned_edge=DOWN)
        self.au_mot("Une éolienne")
        self.play(FadeIn(eo, shift=UP * 0.2), run_time=0.6)
        etat = faire_tourner(pales, nacelle)
        sb = self.schema([(0.85, BLEU_PART), (0.15, VERT_PART, True)])
        self.au_mot("elle tourne")
        n0 = sb.nom(0, "elle tourne")
        self.play(FadeIn(sb.carte), GrowFromEdge(sb.rects[0], LEFT), FadeIn(n0), run_time=0.7)
        self.au_mot("0,85")
        v0 = sb.valeur(0, "0,85")
        self.play(FadeIn(v0, scale=0.5), run_time=0.35)
        self.insister(v0, 0.35)
        self.au_mot("ne tourne pas")
        etat["v"] = 0.0
        n1 = sb.nom(1, "ne tourne pas", ROUGE_INCONNU)
        q = sb.inconnu(1)
        self.play(GrowFromEdge(sb.rects[1], LEFT), FadeIn(n1), pales.animate.set_fill(GREY_B), run_time=0.6)
        self.play(FadeIn(q, scale=0.4), run_time=0.3)
        self.insister(q, 0.35)
        self.attendre_voix()
        pales.clear_updaters()

    # ── 02 : le contraire, A barre ──────────────────────────────────────────

    def schema_eolienne(self, connue=False):
        sb = self.schema([(0.85, BLEU_PART), (0.15, VERT_PART, not connue)])
        n0 = sb.nom(0, "elle tourne")
        n1 = sb.nom(1, "ne tourne pas", CONTOUR if connue else ROUGE_INCONNU)
        return sb, n0, n1

    def ecran_contraire(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-contraire")
        sb, n0, n1 = self.schema_eolienne()
        q = sb.inconnu(1)
        self.add(sb.tout(), n0, n1, q)
        self.titre_ecran("Le contraire")
        l1 = self.ligne([("« ne tourne pas »", VERT_OK), ("=", WHITE), ("le contraire de", WHITE),
                         ("« elle tourne »", BLEU_CALCUL)], 36, 0.22).move_to(P(-0.6, 2.2))
        self.play(FadeIn(l1[0], shift=UP * 0.15), Indicate(n1, color=VERT_OK), run_time=0.6)
        self.au_mot("c'est le contraire")
        self.play(FadeIn(VGroup(l1[1], l1[2]), shift=UP * 0.15), run_time=0.5)
        self.au_mot("« elle tourne »")
        self.play(FadeIn(l1[3], shift=UP * 0.15), Indicate(n0, color=BLEU_CALCUL), run_time=0.5)
        self.au_mot("On le note A barre")
        a = Text("A", font_size=48, color=ENCRE, weight=BOLD).move_to(sb.rects[0])
        ab = a_barre(48, ENCRE).move_to(sb.rects[1])
        self.play(FadeOut(q), FadeIn(a, scale=0.5), FadeIn(ab, scale=0.5), run_time=0.5)
        self.insister(ab, 0.4)
        self.au_mot("Un des deux arrive forcément")
        cadre = SurroundingRectangle(sb.rects, color=JAUNE_TITRE, buff=0.08, stroke_width=6)
        l2 = self.t("un des deux, forcément", 32, JAUNE_TITRE).move_to(P(-2.9, 1.0))
        self.play(Create(cadre), FadeIn(l2, shift=UP * 0.15), run_time=0.6)
        self.au_mot("jamais les deux")
        x = sb.rects[1].get_left()[0]
        sep = Line(P(x, sb.y - sb.h / 2 - 0.1), P(x, sb.y + sb.h / 2 + 0.1), color=ROUGE_ERREUR, stroke_width=9)
        l3 = self.t("jamais les deux", 32, ROUGE_ERREUR).move_to(P(2.0, 1.0))
        self.play(Create(sep), FadeIn(l3, shift=UP * 0.15), run_time=0.5)
        self.insister(l3, 0.35)
        self.attendre_voix()

    # ── 03 : la règle, 1 − 0,85 ─────────────────────────────────────────────

    def ecran_regle(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-regle")
        sb, n0, n1 = self.schema_eolienne()
        a = Text("A", font_size=48, color=ENCRE, weight=BOLD).move_to(sb.rects[0])
        ab = a_barre(48, ENCRE).move_to(sb.rects[1])
        self.add(sb.tout(), n0, n1, a, ab)
        self.titre_ecran("La règle")
        self.au_mot("font 1")
        tot = sb.total("1")
        self.play(FadeIn(tot, shift=DOWN * 0.15), run_time=0.5)
        self.insister(tot[2:], 0.35)
        self.au_mot("Donc P de A barre")
        f = self.formule(46).move_to(P(-0.6, 2.25))
        cadre_f = SurroundingRectangle(f, color=VERT_OK, buff=0.18, stroke_width=3)
        self.play(Write(f), run_time=1.0)
        self.play(Create(cadre_f), run_time=0.4)
        self.au_mot("1 moins 0,85")
        calc = self.ligne([("1 − 0,85", WHITE), ("=", WHITE), ("0,15", VERT_OK)], 46, 0.25).move_to(P(-0.6, 1.0))
        v0 = sb.valeur(0, "0,85")
        self.play(FadeIn(calc[0], shift=UP * 0.15), ReplacementTransform(a, v0), run_time=0.6)
        self.au_mot(": 0,15")
        v1 = sb.valeur(1, "0,15")
        self.play(FadeIn(calc[1:], shift=UP * 0.15), ReplacementTransform(ab, v1),
                  sb.devient_connue(1, VERT_PART), n1.animate.set_color(CONTOUR), run_time=0.6)
        self.insister(calc[2], 0.35)
        self.attendre_voix()

    # ── 04 : en pourcentage, les emballages ─────────────────────────────────

    def ecran_pourcentage(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-pourcentage")
        emb = emballage(1.1).move_to(P(-5.0, 1.5))
        self.add(emb)
        self.titre_ecran("En pourcentage, pareil")
        sb = self.schema([(0.3, BLEU_PART), (0.7, VERT_PART)])
        self.au_mot("30 %")
        n0 = sb.nom(0, "rapportent")
        v0 = sb.valeur(0, "30 %")
        self.play(FadeIn(sb.carte), GrowFromEdge(sb.rects[0], LEFT),
                  FadeIn(n0), run_time=0.6)
        self.play(FadeIn(v0, scale=0.5), run_time=0.3)
        self.play(Indicate(emb, color=VERT_OK, scale_factor=1.25), run_time=0.6)
        self.au_mot("70 %")
        n1 = sb.nom(1, "ne le rapportent pas")
        v1 = sb.valeur(1, "70 %")
        self.play(GrowFromEdge(sb.rects[1], LEFT), FadeIn(n1), run_time=0.5)
        self.play(FadeIn(v1, scale=0.5), run_time=0.3)
        self.insister(v1, 0.35)
        self.au_mot("100 moins 30")
        tot = sb.total("100 %")
        calc = self.ligne([("100 − 30", WHITE), ("=", WHITE), ("70", VERT_OK)], 46, 0.25).move_to(P(0.4, 1.4))
        self.play(FadeIn(tot, shift=DOWN * 0.15), FadeIn(calc, shift=UP * 0.15), run_time=0.6)
        self.insister(calc[2], 0.35)
        self.attendre_voix()

    # ── 05 : le piège du colis ──────────────────────────────────────────────

    def cases_colis(self, y=-1.0):
        """Les trois issues, à la manière du tableau de loi du coach :
        en-tête ardoise, trois cases blanches."""
        noms = ["en avance", "à l'heure", "en retard"]
        w, h = 3.0, 1.15
        xs = [-0.6 + (k - 1) * w for k in range(3)]
        tete = Rectangle(width=3 * w, height=0.75, fill_color=ARDOISE, fill_opacity=1,
                         stroke_color=CONTOUR, stroke_width=2).move_to(P(-0.6, y + h / 2 + 0.375))
        lt = Text("Le colis arrive…", font_size=28, color=WHITE, weight=BOLD).move_to(tete)
        cases = VGroup(*[Rectangle(width=w, height=h, fill_color=WHITE, fill_opacity=1, stroke_color=CONTOUR,
                                   stroke_width=2).move_to(P(x, y)) for x in xs])
        mots = VGroup(*[Text(n, font_size=32, color=ENCRE, weight=BOLD).move_to(c) for n, c in zip(noms, cases)])
        return VGroup(tete, lt), cases, mots

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-piege")
        self.titre_ecran("Le piège")
        tete, cases, mots = self.cases_colis(-0.9)
        boite = colis(1.0).move_to(P(-5.6, 2.0))
        self.play(FadeIn(boite, shift=RIGHT * 0.3), FadeIn(tete), FadeIn(cases), FadeIn(mots), run_time=0.7)
        self.au_mot("arrive en avance")
        q = self.ligne([("le contraire de", WHITE), ("« en avance »", BLEU_CALCUL)], 38, 0.22).move_to(P(-0.6, 2.2))
        a = Text("A", font_size=40, color=BLEU_CALCUL, weight=BOLD).next_to(cases[0], DOWN, buff=0.25)
        self.play(FadeIn(q, shift=UP * 0.15), cases[0].animate.set_fill(BLEU_PART).set_stroke(JAUNE_TITRE, 6), FadeIn(a), run_time=0.6)
        self.au_mot("il arrive en retard")
        faux = self.ligne([("≠", ROUGE_ERREUR), ("« en retard »", ROUGE_ERREUR)], 38, 0.22)
        faux.next_to(q, DOWN, buff=0.35)
        self.play(cases[2].animate.set_fill(ROSE_INCONNU).set_stroke(ROUGE_INCONNU, 6), FadeIn(faux, shift=UP * 0.15),
                  run_time=0.5)
        self.insister(faux[0], 0.3)
        self.au_mot("à l'heure")
        self.play(cases[1].animate.set_fill(JAUNE_PART).set_stroke(JAUNE_TITRE, 6), run_time=0.4)
        self.play(Indicate(mots[1], color=ORANGE_RETENUE, scale_factor=1.4), run_time=0.7)
        self.au_mot("Le contraire, c'est")
        deux = VGroup(cases[1], cases[2])
        acc = Brace(deux, DOWN, color=VERT_OK, buff=0.15)
        ab = a_barre(40, VERT_OK).next_to(acc, DOWN, buff=0.12)
        self.play(*[c.animate.set_fill(VERT_PART).set_stroke(VERT_OK, 6) for c in deux],
                  Create(self.barrer(faux, sw=5)), GrowFromCenter(acc), FadeIn(ab), run_time=0.7)
        self.au_mot("il n'arrive pas en avance")
        bon = self.t("« il n'arrive pas en avance »", 34, VERT_OK).next_to(ab, DOWN, buff=0.15)
        self.play(FadeIn(bon, shift=UP * 0.15), run_time=0.5)
        self.insister(ab, 0.35)
        self.attendre_voix()

    # ── 06 : défi des bouteilles ────────────────────────────────────────────

    def bouteilles(self):
        couleurs = ["#22C55E", "#38BDF8", "#A3E635", "#22C55E", "#38BDF8"]
        return VGroup(*[bouteille(c, 0.9) for c in couleurs]).arrange(RIGHT, buff=0.18)

    def schema_bouteilles(self, y=None):
        sb = self.schema([(0.65, BLEU_PART, True), (0.35, VERT_PART)], centre=P(-0.6, y or self.CARTE_Y))
        n0 = sb.nom(0, "recyclées", ROUGE_INCONNU)
        n1 = sb.nom(1, "pas recyclées")
        return sb, n0, n1

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("06-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        bt = self.bouteilles().scale(1.3).move_to(P(-0.6, 1.85))
        self.play(LaggedStart(*[FadeIn(b, shift=DOWN * 0.3) for b in bt], lag_ratio=0.15), run_time=0.8)
        sb, n0, n1 = self.schema_bouteilles(-0.95)
        self.au_mot("35 %")
        v1 = sb.valeur(1, "35 %")
        self.play(FadeIn(sb.carte), FadeIn(sb.rects[1]), FadeIn(n1), run_time=0.5)
        self.play(FadeIn(v1, scale=0.5), run_time=0.3)
        self.insister(v1, 0.35)
        self.au_mot("Quelle est la probabilité")
        q = sb.inconnu(0)
        self.play(FadeIn(sb.rects[0]), FadeIn(n0), FadeIn(q, scale=0.4), run_time=0.5)
        self.insister(q, 0.35)
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=36)))
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("06b-correction")
        sb, n0, n1 = self.schema_bouteilles()
        q = sb.inconnu(0)
        v1 = sb.valeur(1, "35 %")
        self.add(sb.tout(), n0, n1, q, v1)
        self.titre_ecran("Correction")
        self.au_mot("Recyclée, c'est le contraire")
        l1 = self.ligne([("« recyclée »", BLEU_CALCUL), ("=", WHITE), ("le contraire de", WHITE),
                         ("« pas recyclée »", VERT_OK)], 36, 0.22).move_to(P(-0.6, 2.2))
        self.play(FadeIn(l1, shift=UP * 0.15), Indicate(n0, color=BLEU_CALCUL), run_time=0.7)
        self.au_mot("100 moins 35")
        tot = sb.total("100 %")
        calc = self.ligne([("100 − 35", WHITE), ("=", WHITE), ("65 %", VERT_OK), (", soit", WHITE),
                           ("0,65", VERT_OK)], 44, 0.22).move_to(P(-0.6, 1.1))
        self.play(FadeIn(tot, shift=DOWN * 0.15), FadeIn(calc[0], shift=UP * 0.15), run_time=0.6)
        self.au_mot(": 65 %")
        v0 = sb.valeur(0, "65 %")
        self.play(FadeIn(VGroup(calc[1], calc[2]), shift=UP * 0.15), ReplacementTransform(q, v0),
                  sb.devient_connue(0, BLEU_PART), n0.animate.set_color(CONTOUR), run_time=0.6)
        self.insister(v0, 0.35)
        self.au_mot("soit 0,65")
        self.play(FadeIn(VGroup(calc[3], calc[4]), shift=UP * 0.15), run_time=0.5)
        self.insister(calc[4], 0.35)
        self.attendre_voix()

    # ── 07 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)))
        textes = [
            self.t("Le contraire de A : « A n'arrive pas »", 38),
            self.formule(42),
            self.t("Le contraire dit exactement « non A »", 38),
        ]
        mots = ["Le contraire de A", "P de A barre égale", "Et le contraire dit exactement"]
        lignes = VGroup(*[VGroup(self.coche(), tx).arrange(RIGHT, buff=0.3) for tx in textes])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.65)
        if lignes.width > 10.0:
            lignes.scale_to_fit_width(10.0)
        lignes.move_to(P(-0.9, 0.6))
        for mot, l in zip(mots, lignes):
            self.au_mot(mot)
            self.play(FadeIn(l[1], shift=RIGHT * 0.2), run_time=0.6)
            self.play(Create(l[0]), run_time=0.4)
        self.au_mot("rien d'autre")
        self.insister(lignes[2][1], 0.35)
        self.au_mot("L'épisode 3")
        self.play(Write(self.chute("Épisode 3 : additionner les issues", color=VERT_OK, font_size=36)))
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_contraire()
        self.ecran_regle()
        self.ecran_pourcentage()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="08-abonne")
