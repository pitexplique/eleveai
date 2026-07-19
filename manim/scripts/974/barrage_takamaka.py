# barrage_takamaka.py
# EleveAI — « Les maths en vrai · La Réunion » — Le barrage de Takamaka
# (comment l'eau de la rivière des Marsouins devient la lumière de l'île).
#
# Épisode « en vrai 974 », jumeau de lait_reunion.py : même format « simulation »
# (flux animés), hors banques (pas de notionId). Né du 19/07 : la page
# /simulateur-barrage d'abord, la vidéo ensuite — mêmes chiffres partout.
# Maths mobilisées : la formule puissance = 8 × débit × chute (proportionnalité)
# + un défi à 2 étapes (puissance, puis familles alimentées).
#
# Deux scènes :
# - BarrageTakamaka974      → 16:9 YouTube (~2 min)
# - BarrageTakamaka974Short → 9:16 Shorts/Instagram (~45 s), rendre avec -r 1080,1920
#
# Rendu brouillon :
#   python -m manim render -ql manim/scripts/974/barrage_takamaka.py BarrageTakamaka974 --media_dir manim/scripts/974/media
#   python -m manim render -ql -r 480,854 manim/scripts/974/barrage_takamaka.py BarrageTakamaka974Short --media_dir manim/scripts/974/media
# Rendu final :
#   python -m manim render -qh manim/scripts/974/barrage_takamaka.py BarrageTakamaka974 -o eleveai-maths-974-barrage-takamaka --media_dir manim/scripts/974/media
#   python -m manim render -qh -r 1080,1920 manim/scripts/974/barrage_takamaka.py BarrageTakamaka974Short -o eleveai-maths-974-barrage-takamaka-short --media_dir manim/scripts/974/media
#
# Repères réels (ordres de grandeur, arrondis pour l'élève — les mêmes que la
# page /simulateur-barrage) :
# - Rivière des Marsouins (Saint-Benoît), née dans la forêt de Bébour
# - Chute de Takamaka : ~500 m (une des plus hautes de France)
# - puissance (kW) ≈ 8 × débit (m³/s) × chute (m)   [9,81 × ~80 % de rendement]
# - une famille ≈ 10 kWh par jour (même repère que l'usine à sucre)
# - l'eau turbinée RESSORT INTACTE vers la rivière

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

import numpy as np
from manim import *

from charte import *
from mascotte import MascotteMargouillat


# ── décor partagé (16:9 et 9:16) ───────────────────────────────────────────────

def falaise(x_haut=-4.6, y_haut=1.6, x_bas=1.6, y_bas=-2.4, largeur=3.2):
    """La falaise de Takamaka : un grand versant sombre, du plateau au fond de vallée."""
    p = Polygon(
        [x_haut - largeur, y_haut, 0], [x_haut + 1.2, y_haut, 0],
        [x_bas + 0.6, y_bas, 0], [x_bas - largeur - 1.4, y_bas, 0],
        color=GREY_D, fill_color=GREY_E, fill_opacity=0.9, stroke_width=0,
    )
    return p


def foret(y, xs, echelle=1.0):
    """Des arbres stylisés (triangles) pour la forêt de Bébour."""
    g = VGroup()
    for i, x in enumerate(xs):
        h = (0.5 + 0.12 * (i % 3)) * echelle
        g.add(Polygon([x - 0.22 * echelle, y, 0], [x, y + h, 0], [x + 0.22 * echelle, y, 0],
                      color=VERT_OK, fill_color=GREEN, fill_opacity=0.9, stroke_width=0))
    return g


def riviere(x0, x1, y, amplitude=0.08):
    """Un ruban d'eau ondulé."""
    n = 10
    xs = np.linspace(x0, x1, n)
    pts = [np.array([x, y + amplitude * np.sin(i * 1.9), 0]) for i, x in enumerate(xs)]
    return VMobject(color=BLEU_CALCUL, stroke_width=7).set_points_smoothly(pts)


def conduite(depart, arrivee):
    """La conduite forcée : un gros tuyau gris + l'âme bleue de l'eau."""
    tube = Line(depart, arrivee, color=GREY_C, stroke_width=16)
    eau = Line(depart, arrivee, color=BLEU_CALCUL, stroke_width=7)
    return VGroup(tube, eau)


def turbine(r=0.55):
    """La roue Pelton : un cercle + des rayons en croix (elle tournera)."""
    roue = Circle(radius=r, color=BLEU_CALCUL, stroke_width=5)
    rayons = VGroup(*[
        Line(ORIGIN, r * 0.92 * np.array([np.cos(a), np.sin(a), 0]),
             color=BLEU_CALCUL, stroke_width=5)
        for a in np.linspace(0, 2 * PI, 8, endpoint=False)
    ])
    augets = VGroup(*[
        Dot(radius=0.07, color=WHITE).move_to(r * np.array([np.cos(a), np.sin(a), 0]))
        for a in np.linspace(0, 2 * PI, 8, endpoint=False)
    ])
    return VGroup(roue, rayons, augets)


def alternateur(r=0.4):
    """L'alternateur : cercle jaune + croix (il tournera avec la turbine)."""
    c = Circle(radius=r, color=JAUNE_TITRE, stroke_width=5)
    croix = VGroup(Line(UP * r * 0.85, DOWN * r * 0.85, color=JAUNE_TITRE, stroke_width=5),
                   Line(LEFT * r * 0.85, RIGHT * r * 0.85, color=JAUNE_TITRE, stroke_width=5))
    return VGroup(c, croix)


def ampoule(r=0.3):
    """Une ampoule : bulbe + culot."""
    bulbe = Circle(radius=r, color=JAUNE_TITRE, fill_color=JAUNE_TITRE, fill_opacity=0.95, stroke_width=2)
    culot = Rectangle(width=r * 0.9, height=r * 0.55, color=GREY_B, fill_color=GREY_B,
                      fill_opacity=1, stroke_width=0).next_to(bulbe, DOWN, buff=0)
    return VGroup(bulbe, culot)


def pylone(h=1.1):
    """Un pylône électrique stylisé."""
    pied = Line(DOWN * h / 2, UP * h / 2, color=GREY_B, stroke_width=4)
    b1 = Line(LEFT * 0.28 + UP * h * 0.28, RIGHT * 0.28 + UP * h * 0.28, color=GREY_B, stroke_width=3)
    b2 = Line(LEFT * 0.2 + UP * h * 0.08, RIGHT * 0.2 + UP * h * 0.08, color=GREY_B, stroke_width=3)
    return VGroup(pied, b1, b2)


class BarrageBase(Scene):
    """Helpers communs aux deux formats (les mêmes que lait_reunion.py)."""

    LARGEUR_SURE = 12.8  # 16:9 ; le Short redéfinit

    def add_mascotte(self, scale=0.5):
        m = MascotteMargouillat().scale(scale).to_corner(DOWN + RIGHT, buff=0.35)
        self.add(m)
        return m

    def T(self, texte, size=28, color=WHITE, **kw):
        """Text auto-ajusté à la largeur du cadre (sécurité anti-débordement)."""
        t = Text(texte, font_size=size, color=color, **kw)
        if t.width > self.LARGEUR_SURE:
            t.scale_to_fit_width(self.LARGEUR_SURE)
        return t

    def titre_ecran(self, texte):
        # les titres alternent aussi leur entrée (Write / glisse / grossit).
        t = self.T(texte, size=38, color=JAUNE_TITRE).to_edge(UP)
        if not hasattr(self, "_tt"):
            self._tt = 0
        anim = [Write(t), FadeIn(t, shift=0.3 * DOWN), GrowFromCenter(t)][self._tt % 3]
        self._tt += 1
        self.play(anim)
        return t

    def anim_entree(self, m, mode=None, run_time=0.8):
        """Une animation d'apparition qui CHANGE à chaque appel (anti-monotonie)."""
        palette = ["fade_up", "pop", "slide_r", "grow", "fade_down", "slide_l", "write"]
        if mode is None:
            if not hasattr(self, "_ai"):
                self._ai = 0
            mode = palette[self._ai % len(palette)]
            self._ai += 1
        table = {
            "write": lambda: Write(m, run_time=run_time),
            "fade_up": lambda: FadeIn(m, shift=0.45 * UP, run_time=run_time),
            "fade_down": lambda: FadeIn(m, shift=0.45 * DOWN, run_time=run_time),
            "slide_r": lambda: FadeIn(m, shift=0.7 * RIGHT, run_time=run_time),
            "slide_l": lambda: FadeIn(m, shift=0.7 * LEFT, run_time=run_time),
            "pop": lambda: FadeIn(m, scale=0.5, run_time=run_time),
            "grow": lambda: GrowFromCenter(m, run_time=run_time),
        }
        return table[mode]()

    def legende_mobile(self):
        """dire() : une légende à la fois, place qui tourne + anim qui varie."""
        state = {"m": None, "k": 0}
        places = [(-3.4, 1.9), (3.1, -1.4), (0, 2.5), (-3.2, -0.2), (0, -2.7), (3.2, 1.5)]

        def dire(texte, size=26, couleur=BLEU_CALCUL, mode=None, pos=None):
            x, y = pos if pos is not None else places[state["k"] % len(places)]
            t = self.T(texte, size=size, color=couleur).move_to([x, y, 0])
            if t.width > self.LARGEUR_SURE - 1.0:
                t.scale_to_fit_width(self.LARGEUR_SURE - 1.0).move_to([0, y, 0])
            entree = self.anim_entree(t, mode=mode)
            if state["m"] is None:
                self.play(entree)
            else:
                self.play(FadeOut(state["m"], shift=0.2 * DOWN), entree)
            state["m"] = t
            state["k"] += 1
            return t

        return dire, state

    def gouttes_le_long(self, depart, arrivee, n=4, run_time=1.4):
        """Des gouttes qui filent le long de la conduite (le flux visible)."""
        chemin = Line(depart, arrivee)
        gouttes = VGroup(*[Dot(radius=0.09, color=WHITE) for _ in range(n)])
        for g in gouttes:
            g.move_to(depart)
        self.play(LaggedStart(*[MoveAlongPath(g, chemin, run_time=run_time) for g in gouttes],
                              lag_ratio=0.22))
        self.remove(gouttes)


# ════════════════════════════════════════════════════════════════════════════════
#  SCÈNE 16:9 — la vidéo YouTube complète
# ════════════════════════════════════════════════════════════════════════════════

class BarrageTakamaka974(BarrageBase):

    # ── écran 0 : accueil ───────────────────────────────────────────────────

    def ecran_accueil(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        titre = self.T("L'eau qui allume l'île ?", size=44, color=JAUNE_TITRE).to_edge(UP)
        sous = self.T("Les maths en vrai · La Réunion — EleveAI", size=30).next_to(titre, DOWN, buff=0.35)

        f = falaise()
        arbres = foret(1.6, np.linspace(-6.4, -4.2, 5))
        cond = conduite([-4.4, 1.4, 0], [1.2, -2.2, 0])
        amp = ampoule(0.34).move_to([4.8, 0.6, 0])
        accroche = self.T("De la forêt de Bébour... jusqu'à ta lampe !",
                          size=30, color=BLEU_CALCUL).move_to([1.6, 2.0, 0])

        self.play(GrowFromCenter(titre), FadeIn(sous, shift=0.3 * DOWN))
        self.play(FadeIn(f, shift=0.3 * UP), FadeIn(arbres, lag_ratio=0.1))
        self.play(Create(cond), run_time=1.0)
        self.gouttes_le_long([-4.4, 1.4, 0], [1.2, -2.2, 0], n=3, run_time=1.2)
        self.play(FadeIn(amp, scale=0.5), Flash(amp, color=JAUNE_TITRE))
        self.play(FadeIn(accroche, scale=0.5))
        self.wait(2.4)

    # ── écran 1 : la rivière des Marsouins ──────────────────────────────────

    def ecran_riviere(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("1. La rivière des Marsouins")
        dire, _ = self.legende_mobile()

        arbres = foret(0.6, np.linspace(-5.8, 5.8, 12), echelle=1.15)
        riv = riviere(-6.6, 6.6, -0.6, amplitude=0.14)
        self.play(FadeIn(arbres, lag_ratio=0.06))
        self.play(Create(riv), run_time=1.4)

        dire("Elle naît dans la forêt de Bébour, dans les hauts de Saint-Benoît.",
             mode="slide_l", pos=(0, 2.4))
        # la pluie : des gouttes qui tombent sur la forêt
        pluie = VGroup(*[Dot(radius=0.05, color=BLEU_CALCUL).move_to([x, 2.0 - 0.3 * (i % 3), 0])
                         for i, x in enumerate(np.linspace(-5, 5, 9))])
        self.play(LaggedStart(*[g.animate.shift(DOWN * 1.2).set_opacity(0.15) for g in pluie],
                              lag_ratio=0.08), run_time=1.6)
        dire("C'est un des endroits les plus arrosés de France :", couleur=BLEU_CALCUL, mode="fade_down")
        dire("la rivière est toujours bien nourrie.", couleur=BLEU_CALCUL, mode="pop")

        # la prise d'eau : un petit barrage sur la rivière, une part captée
        barrage = Rectangle(width=0.25, height=0.8, color=GREY_B, fill_color=GREY_B,
                            fill_opacity=1, stroke_width=0).move_to([1.6, -0.6, 0])
        tuyau = Line([1.7, -0.75, 0], [4.6, -1.5, 0], color=GREY_C, stroke_width=10)
        self.play(GrowFromEdge(barrage, DOWN))
        self.play(Create(tuyau))
        # décalée à gauche : à (0, -2.6) elle frôlait le margouillat (vu au brouillon).
        dire("Une prise d'eau capte UNE PARTIE de la rivière — le reste continue.",
             size=25, couleur=VERT_OK, mode="fade_up", pos=(-0.7, -2.6))
        self.wait(2.2)

    # ── écran 2 : la chute (~500 m) ─────────────────────────────────────────

    def ecran_chute(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("2. La chute : 500 mètres")
        dire, _ = self.legende_mobile()

        f = falaise(x_haut=-4.2, y_haut=1.8, x_bas=2.2, y_bas=-2.5)
        cond = conduite([-4.0, 1.6, 0], [1.8, -2.3, 0])
        self.play(FadeIn(f, shift=0.3 * UP))
        self.play(Create(cond), run_time=1.2)

        # la cote : une accolade de hauteur, 500 m
        cote = DoubleArrow([3.6, 1.6, 0], [3.6, -2.3, 0], color=JAUNE_TITRE,
                           stroke_width=4, buff=0, tip_length=0.22)
        lab = self.T("~500 m", size=34, color=JAUNE_TITRE).next_to(cote, RIGHT, buff=0.25)
        self.play(GrowFromEdge(cote, UP), self.anim_entree(lab, mode="pop"))

        dire("L'eau plonge dans la conduite forcée, le long de la falaise.",
             mode="slide_l", pos=(-2.2, 2.4))
        self.gouttes_le_long([-4.0, 1.6, 0], [1.8, -2.3, 0], n=4, run_time=1.1)
        dire("Une des plus hautes chutes de France !", couleur=JAUNE_TITRE, mode="grow")
        dire("Plus c'est haut, plus l'eau arrive vite et frappe fort :", mode="fade_down")
        dire("c'est l'ÉNERGIE DE LA HAUTEUR.", couleur=VERT_OK, mode="pop", pos=(0, -2.7))
        self.wait(2.2)

    # ── écran 3 : la turbine et l'alternateur ───────────────────────────────

    def ecran_turbine(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("3. La turbine fait le courant")
        dire, _ = self.legende_mobile()

        # la centrale : un cadre, la turbine à gauche, l'alternateur à droite
        salle = RoundedRectangle(width=5.6, height=3.0, corner_radius=0.2,
                                 color=GREY_B, stroke_width=3).move_to([-2.2, -0.6, 0])
        turb = turbine(0.75).move_to([-3.4, -0.6, 0])
        alt = alternateur(0.55).move_to([-0.9, -0.6, 0])
        axe = Line(turb.get_right(), alt.get_left(), color=GREY_B, stroke_width=6)
        jet = Arrow([-5.6, 0.6, 0], turb.get_center() + UP * 0.4, color=BLEU_CALCUL,
                    stroke_width=6, buff=0.1)
        self.play(Create(salle))
        self.play(FadeIn(turb, scale=0.5), FadeIn(alt, scale=0.5), Create(axe))
        dire("L'eau sort en jet puissant et frappe la roue de la turbine.",
             mode="slide_l", pos=(0, 2.4))
        self.play(GrowArrow(jet))
        self.play(Rotate(turb, -2 * PI, run_time=1.6), Rotate(alt, -2 * PI, run_time=1.6))

        # sous le titre (centrée) : la place tournante tombait au bord droit
        # et coupait la phrase (vu au brouillon).
        dire("La turbine entraîne l'alternateur : la rotation devient du courant.",
             couleur=JAUNE_TITRE, mode="fade_down", pos=(0, 2.4))
        fil = VMobject(color=JAUNE_TITRE, stroke_width=4).set_points_smoothly(
            [[-0.3, -0.4, 0], [1.4, 0.6, 0], [3.0, 1.2, 0], [4.6, 1.6, 0]])
        p1 = pylone().move_to([2.2, 0.4, 0])
        p2 = pylone().move_to([4.2, 1.0, 0])
        amp = ampoule(0.3).move_to([5.6, 2.0, 0])
        self.play(Create(fil), FadeIn(p1), FadeIn(p2))
        self.play(FadeIn(amp, scale=0.4), Flash(amp, color=JAUNE_TITRE))
        self.play(Rotate(turb, -2 * PI, run_time=1.2), Rotate(alt, -2 * PI, run_time=1.2),
                  Indicate(amp, color=JAUNE_TITRE))

        # l'eau ressort : flèche bleue vers la rivière, en bas
        sortie = Arrow(salle.get_bottom() + DOWN * 0.05, salle.get_bottom() + DOWN * 0.05 + RIGHT * 3.2,
                       color=BLEU_CALCUL, stroke_width=5, buff=0.1)
        self.play(GrowArrow(sortie))
        dire("Et l'eau ? Elle RESSORT INTACTE vers la rivière. Rien ne se perd.",
             couleur=VERT_OK, mode="fade_up", pos=(0, -2.8))
        self.wait(2.4)

    # ── écran 4 : la formule ────────────────────────────────────────────────

    def ecran_formule(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("4. La formule du barrage")

        # la formule se construit morceau par morceau, chaque mot a sa couleur
        p1 = self.T("puissance", size=36, color=JAUNE_TITRE)
        p2 = self.T("=  8  ×", size=36)
        p3 = self.T("débit", size=36, color=BLEU_CALCUL)
        p4 = self.T("×", size=36)
        p5 = self.T("chute", size=36, color=VERT_OK)
        formule = VGroup(p1, p2, p3, p4, p5).arrange(RIGHT, buff=0.35).move_to([0, 1.5, 0])
        self.play(self.anim_entree(p1, mode="slide_l"))
        self.play(self.anim_entree(p2, mode="fade_down"), self.anim_entree(p3, mode="pop"))
        self.play(self.anim_entree(p4, mode="fade_down"), self.anim_entree(p5, mode="grow"))
        cadre = SurroundingRectangle(formule, color=JAUNE_TITRE, buff=0.3, corner_radius=0.12)
        self.play(Create(cadre))

        u1 = self.T("débit en m³ par seconde · chute en mètres · puissance en kW",
                    size=24, color=GREY_B).next_to(cadre, DOWN, buff=0.35)
        self.play(self.anim_entree(u1, mode="fade_up"))

        # l'exemple : 3 m³/s (le curseur de la page) — chaque nombre s'allume
        ex = self.T("Exemple : la rivière donne 3 m³ chaque seconde", size=28,
                    color=BLEU_CALCUL).move_to([0, -0.7, 0])
        self.play(self.anim_entree(ex, mode="slide_r"))
        calc = self.T("8 × 3 × 500 = 12 000 kW", size=40, color=VERT_OK).move_to([0, -1.7, 0])
        self.play(self.anim_entree(calc, mode="grow"))
        self.play(Circumscribe(calc, color=VERT_OK))
        note = self.T("12 000 kW = 12 MW — des dizaines de milliers d'ampoules.",
                      size=26, color=WHITE).to_edge(DOWN, buff=0.5)
        self.play(self.anim_entree(note, mode="fade_up"))
        self.wait(2.6)

    # ── écran 5 : défi (2 étapes) ───────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.6)
        titre = self.T("Défi", size=48, color=JAUNE_TITRE).to_edge(UP)
        self.play(GrowFromCenter(titre))

        # les DEUX rappels encadrés, en haut, centrés
        rappel = self.T("Rappels : puissance = 8 × débit × chute · une famille = 10 kWh par jour",
                        size=25, color=VERT_OK).move_to([0, 2.1, 0])
        cadre = SurroundingRectangle(rappel, color=VERT_OK, buff=0.2, corner_radius=0.1)
        self.play(self.anim_entree(rappel, mode="fade_down"), Create(cadre))

        # le dessin du défi, COMPACT à gauche (conduite + cote serrées) pour
        # laisser un vrai couloir aux questions — les brouillons ont montré
        # tour à tour la cote sur les questions puis les questions au bord.
        cond = conduite([-5.6, 1.0, 0], [-2.8, -1.4, 0])
        deb = self.T("5 m³/s", size=28, color=BLEU_CALCUL).move_to([-5.6, -0.6, 0])
        cote = DoubleArrow([-2.1, 1.0, 0], [-2.1, -1.4, 0], color=JAUNE_TITRE,
                           stroke_width=4, buff=0, tip_length=0.2)
        chute_lab = self.T("500 m", size=26, color=JAUNE_TITRE).next_to(cote, DOWN, buff=0.15)
        self.play(Create(cond), self.anim_entree(deb, mode="slide_r"))
        self.play(GrowFromEdge(cote, UP), self.anim_entree(chute_lab, mode="pop"))
        self.gouttes_le_long([-5.6, 1.0, 0], [-2.8, -1.4, 0], n=3, run_time=1.0)

        q1 = self.T("1) Quelle puissance sort de la centrale ?", size=27, color=WHITE).move_to([2.4, 0.6, 0])
        q2 = self.T("2) Combien de familles ont leur journée", size=27, color=WHITE).move_to([2.4, -0.2, 0])
        q3 = self.T("de courant, si la rivière tient 24 h ?", size=27, color=WHITE).move_to([2.5, -0.8, 0])
        self.play(self.anim_entree(q1, mode="slide_l"))
        self.play(self.anim_entree(q2, mode="fade_up"), self.anim_entree(q3, mode="fade_up"))

        pause = self.T("Mets pause : il y a DEUX étapes !", size=28, color=ORANGE_RETENUE).to_edge(DOWN, buff=0.35)
        self.play(GrowFromCenter(pause))
        self.wait(4.5)

    # ── écran 6 : correction (2 étapes) ─────────────────────────────────────

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("Correction")

        e1 = self.T("Étape 1 — la puissance", size=28, color=BLEU_CALCUL).move_to([0, 2.3, 0])
        self.play(self.anim_entree(e1, mode="slide_l"))
        c1 = self.T("8 × 5 × 500 = 20 000 kW", size=38, color=VERT_OK).move_to([0, 1.4, 0])
        self.play(self.anim_entree(c1, mode="grow"))
        self.play(Circumscribe(c1, color=VERT_OK))

        e2 = self.T("Étape 2 — les familles", size=28, color=ORANGE_RETENUE).move_to([0, 0.4, 0])
        self.play(self.anim_entree(e2, mode="slide_r"))
        conv = self.T("En 24 h : 20 000 × 24 = 480 000 kWh", size=30, color=WHITE).move_to([0, -0.4, 0])
        self.play(self.anim_entree(conv, mode="pop"))
        c2 = self.T("480 000 ÷ 10 = 48 000 familles", size=38, color=VERT_OK).move_to([0, -1.3, 0])
        self.play(self.anim_entree(c2, mode="fade_up"))
        self.play(Flash(c2, color=VERT_OK))

        concl = self.T("→ l'eau d'une rivière éclaire 48 000 familles !", size=32,
                       color=JAUNE_TITRE).to_edge(DOWN, buff=0.5)
        self.play(GrowFromCenter(concl))
        self.wait(2.8)

    # ── écran 7 : à retenir ─────────────────────────────────────────────────

    def ecran_conclusion(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        titre = self.T("À retenir", size=46, color=JAUNE_TITRE).to_edge(UP)

        points = VGroup(
            self.T("1. Takamaka : l'eau de la rivière des Marsouins fait de l'électricité.", size=26),
            self.T("2. La chute (~500 m) donne sa force à l'eau : l'énergie de la hauteur.", size=26),
            self.T("3. puissance = 8 × débit × chute (en kW).", size=26),
            self.T("4. L'eau turbinée ressort intacte : on emprunte sa chute, pas sa vie.", size=26),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.42).move_to([-0.2, 0.2, 0])

        joue = self.T("Joue avec le vrai simulateur : eleveai.fr/barrage", size=28,
                      color=BLEU_CALCUL).move_to([0, -2.2, 0])
        signature = self.T(SIGNATURE, size=26, color=VERT_OK).to_edge(DOWN)
        self.play(GrowFromCenter(titre))
        self.play(LaggedStart(*[FadeIn(p, shift=0.4 * RIGHT) for p in points], lag_ratio=0.35))
        self.play(self.anim_entree(joue, mode="pop"), Flash(joue, color=BLEU_CALCUL))
        self.play(FadeIn(signature, shift=0.3 * UP))
        self.wait(2.5)

    def construct(self):
        self.ecran_accueil()
        self.ecran_riviere()
        self.ecran_chute()
        self.ecran_turbine()
        self.ecran_formule()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_conclusion()


# ════════════════════════════════════════════════════════════════════════════════
#  SCÈNE 9:16 — le Short, rendre avec -r 1080,1920
# ════════════════════════════════════════════════════════════════════════════════

class BarrageTakamaka974Short(BarrageBase):

    LARGEUR_SURE = 4.1

    def __init__(self, **kwargs):
        # cadre vertical : -r ne change que les pixels → on impose le cadre logique
        config.frame_height = 8.0
        config.frame_width = 4.5
        super().__init__(**kwargs)

    def ecran_hook(self):
        self.clear()
        self.add_mascotte(scale=0.55)
        badge = self.T("LA RÉUNION", size=26, color=JAUNE_TITRE).move_to([0, 3.4, 0])
        t1 = self.T("L'eau tombe de 500 m...", size=32).move_to([0, 2.5, 0])
        t2 = self.T("et éclaire 48 000 familles.", size=32, color=JAUNE_TITRE).next_to(t1, DOWN, buff=0.25)
        self.play(Write(badge), Write(t1), Write(t2))

        cond = conduite([-1.6, 1.2, 0], [1.2, -1.6, 0])
        amp = ampoule(0.3).move_to([1.5, 0.6, 0])
        self.play(Create(cond))
        self.gouttes_le_long([-1.6, 1.2, 0], [1.2, -1.6, 0], n=3, run_time=1.0)
        self.play(FadeIn(amp, scale=0.4), Flash(amp, color=JAUNE_TITRE))

        q = self.T("Bienvenue à Takamaka !", size=28, color=BLEU_CALCUL).move_to([-0.35, -3.3, 0])
        self.play(Write(q))
        self.wait(1.8)

    def ecran_chute(self):
        self.clear()
        self.add_mascotte(scale=0.45)
        l1 = self.T("La rivière des Marsouins", size=27, color=BLEU_CALCUL).move_to([0, 3.4, 0])
        l2 = self.T("plonge le long de la falaise :", size=25).next_to(l1, DOWN, buff=0.15)
        self.play(Write(l1), Write(l2))

        f = Polygon([-2.3, 2.0, 0], [-0.4, 2.0, 0], [1.5, -1.8, 0], [-2.3, -1.8, 0],
                    color=GREY_D, fill_color=GREY_E, fill_opacity=0.9, stroke_width=0)
        cond = conduite([-1.5, 1.8, 0], [1.1, -1.6, 0])
        cote = DoubleArrow([1.8, 1.8, 0], [1.8, -1.6, 0], color=JAUNE_TITRE,
                           stroke_width=4, buff=0, tip_length=0.18)
        lab = self.T("500 m", size=28, color=JAUNE_TITRE).move_to([1.35, 0.1, 0]).rotate(PI / 2)
        self.play(FadeIn(f, shift=0.2 * UP))
        self.play(Create(cond), GrowFromEdge(cote, UP), FadeIn(lab))
        self.gouttes_le_long([-1.5, 1.8, 0], [1.1, -1.6, 0], n=4, run_time=1.0)

        l3 = self.T("En bas, elle frappe une turbine", size=24, color=VERT_OK).move_to([0, -2.6, 0])
        l4 = self.T("qui fabrique le courant.", size=24, color=VERT_OK).next_to(l3, DOWN, buff=0.15)
        self.play(Write(l3), Write(l4))
        self.wait(1.8)

    def ecran_formule(self):
        self.clear()
        self.add_mascotte(scale=0.45)
        l1 = self.T("La formule du barrage :", size=28, color=JAUNE_TITRE).move_to([0, 3.3, 0])
        self.play(Write(l1))

        f1 = self.T("puissance =", size=30).move_to([0, 2.2, 0])
        f2 = self.T("8 × débit × chute", size=32, color=BLEU_CALCUL).next_to(f1, DOWN, buff=0.2)
        cadre = SurroundingRectangle(VGroup(f1, f2), color=JAUNE_TITRE, buff=0.25, corner_radius=0.1)
        self.play(Write(f1), FadeIn(f2, scale=0.6))
        self.play(Create(cadre))

        ex1 = self.T("5 m³/s × 500 m :", size=26).move_to([0, 0.4, 0])
        ex2 = self.T("8 × 5 × 500", size=32, color=BLEU_CALCUL).next_to(ex1, DOWN, buff=0.2)
        ex3 = self.T("= 20 000 kW", size=36, color=VERT_OK).next_to(ex2, DOWN, buff=0.25)
        self.play(Write(ex1))
        self.play(FadeIn(ex2, shift=0.3 * UP))
        self.play(GrowFromCenter(ex3), Flash(ex3, color=VERT_OK))

        l5 = self.T("Et l'eau ressort intacte", size=24, color=BLEU_CALCUL).move_to([0, -2.4, 0])
        l6 = self.T("vers la rivière !", size=24, color=BLEU_CALCUL).next_to(l5, DOWN, buff=0.15)
        self.play(Write(l5), Write(l6))
        self.wait(2.0)

    def ecran_cta(self):
        self.clear()
        m = MascotteMargouillat().scale(0.9).move_to([0, -1.4, 0])
        self.add(m)
        t1 = self.T("Règle le débit toi-même,", size=28).move_to([0, 2.6, 0])
        t2 = self.T("le barrage est dans ta main :", size=28).next_to(t1, DOWN, buff=0.2)
        url = self.T("eleveai.fr/barrage", size=40, color=VERT_OK).next_to(t2, DOWN, buff=0.5)
        sig = self.T(SIGNATURE, size=20, color=VERT_OK).move_to([0, -3.4, 0])
        self.play(Write(t1), Write(t2))
        self.play(Write(url), Flash(url, color=VERT_OK))
        self.play(Write(sig))
        self.wait(2.2)

    def construct(self):
        self.ecran_hook()
        self.ecran_chute()
        self.ecran_formule()
        self.ecran_cta()


# ─── SCRIPT VOIX (optionnel — à lire au téléphone par-dessus la vidéo 16:9 muette) ──
# Dire « top » quand le titre d'accueil apparaît (point de synchro Clipchamp).
#
# [Accueil ~0:00]    « L'eau qui allume l'île ? De la forêt de Bébour jusqu'à ta
#                      lampe — bienvenue à Takamaka. »
# [Écran 1 ~0:15]    « La rivière des Marsouins naît dans la forêt de Bébour, un des
#                      endroits les plus arrosés de France. Une prise d'eau capte une
#                      partie de la rivière — le reste continue son chemin. »
# [Écran 2 ~0:40]    « L'eau plonge dans la conduite forcée : cinq cents mètres de
#                      chute, une des plus hautes de France. Plus c'est haut, plus
#                      l'eau frappe fort : c'est l'énergie de la hauteur. »
# [Écran 3 ~1:00]    « En bas, le jet frappe la turbine, qui entraîne l'alternateur :
#                      la rotation devient du courant, qui file vers les pylônes.
#                      Et l'eau ? Elle ressort intacte vers la rivière. »
# [Écran 4 ~1:25]    « La formule du barrage : puissance égale huit fois le débit
#                      fois la chute. Trois mètres cubes par seconde ? Huit fois
#                      trois fois cinq cents : douze mille kilowatts. »
# [Défi ~1:50]       « À toi ! Cinq mètres cubes par seconde, cinq cents mètres de
#                      chute. Quelle puissance ? Et combien de familles pour la
#                      journée ? Mets pause, il y a deux étapes. »
# [Correction ~2:10] « Huit fois cinq fois cinq cents : vingt mille kilowatts. Sur
#                      vingt-quatre heures, quatre cent quatre-vingt mille
#                      kilowattheures — de quoi éclairer quarante-huit mille
#                      familles. »
# [À retenir ~2:30]  « On retient : Takamaka, l'eau qui fait la lumière ; la chute
#                      donne la force ; puissance égale huit fois débit fois chute ;
#                      et l'eau repart intacte. Joue avec le barrage sur eleveai
#                      point fr slash barrage. À bientôt ! »
