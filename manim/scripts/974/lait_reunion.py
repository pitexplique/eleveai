# lait_reunion.py
# EleveAI — « Les maths en vrai · La Réunion » — Le lait de la Plaine des Cafres
# (comment le lait devient yaourt et fromage).
#
# Épisode 2 de la série « en vrai 974 », jumeau de circulation_eau.py : même format
# « simulation » (flux animés), hors banques (pas de notionId).
# Maths mobilisées : pourcentages (composition du lait) + proportionnalité
# (« 10 litres de lait pour 1 kg de fromage → combien pour 3 kg ? »).
#
# Deux scènes :
# - LaitReunion974      → 16:9 YouTube (~2 min)
# - LaitReunion974Short → 9:16 Shorts/Instagram (~45 s), rendre avec -r 1080,1920
#
# Rendu brouillon :
#   python -m manim render -ql manim/scripts/974/lait_reunion.py LaitReunion974 --media_dir manim/scripts/974/media
#   python -m manim render -ql -r 480,854 manim/scripts/974/lait_reunion.py LaitReunion974Short --media_dir manim/scripts/974/media
# Rendu final :
#   python -m manim render -qh manim/scripts/974/lait_reunion.py LaitReunion974 -o eleveai-maths-974-lait-reunion --media_dir manim/scripts/974/media
#   python -m manim render -qh -r 1080,1920 manim/scripts/974/lait_reunion.py LaitReunion974Short -o eleveai-maths-974-lait-reunion-short --media_dir manim/scripts/974/media
#
# Repères réels (ordres de grandeur, arrondis pour l'élève) :
# - Plaine des Cafres : ~1 500 m d'altitude, le pays du lait à La Réunion (la « route du lait »)
# - Composition du lait : ~87 % eau, ~5 % sucre (lactose), ~4 % matière grasse, ~3 % protéines, ~1 % minéraux
# - Rendement fromage : ~10 litres de lait pour 1 kg de fromage

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

import numpy as np
from manim import *

from charte import *
from mascotte import MascotteMargouillat


# ── décor partagé (16:9 et 9:16) ───────────────────────────────────────────────

def soleil(r=0.42):
    disque = Circle(radius=r, color=JAUNE_TITRE, fill_color=JAUNE_TITRE, fill_opacity=1, stroke_width=0)
    rayons = VGroup(*[
        Line((r + 0.10) * np.array([np.cos(a), np.sin(a), 0]),
             (r + 0.34) * np.array([np.cos(a), np.sin(a), 0]),
             color=JAUNE_TITRE, stroke_width=4)
        for a in np.linspace(0, 2 * PI, 8, endpoint=False)
    ])
    return VGroup(disque, rayons)


def pre(largeur=14.4, y_top=-2.1, hauteur=1.6):
    """Le pré vert de la Plaine des Cafres : bande à sommet ondulé."""
    n = 9
    xs = np.linspace(-largeur / 2, largeur / 2, n)
    top = [np.array([x, y_top + 0.16 * np.sin(i * 1.7), 0]) for i, x in enumerate(xs)]
    y_base = y_top - hauteur
    coins = top + [np.array([largeur / 2, y_base, 0]), np.array([-largeur / 2, y_base, 0])]
    return Polygon(*coins, color=VERT_OK, fill_color=GREEN, fill_opacity=0.85, stroke_width=0)


def touffes_herbe(y, xs, couleur=VERT_OK):
    g = VGroup()
    for x in xs:
        for dx in (-0.06, 0, 0.06):
            g.add(Line([x + dx, y, 0], [x + dx, y + 0.2, 0], color=couleur, stroke_width=3))
    return g


def vache(echelle=1.0):
    """Une vache stylisée, tête à droite (blanche à taches noires + pis rose)."""
    corps = RoundedRectangle(width=2.0, height=1.05, corner_radius=0.38,
                             color=BLACK, fill_color=WHITE, fill_opacity=1, stroke_width=3)
    taches = VGroup(
        Ellipse(width=0.55, height=0.45).move_to([-0.35, 0.12, 0]),
        Ellipse(width=0.42, height=0.36).move_to([0.45, -0.14, 0]),
        Circle(radius=0.17).move_to([0.05, 0.34, 0]),
    )
    for t in taches:
        t.set_fill(BLACK, opacity=1).set_stroke(width=0)

    pattes = VGroup(*[
        Rectangle(width=0.16, height=0.55, color=BLACK, fill_color=WHITE, fill_opacity=1, stroke_width=2)
        .move_to([x, -0.78, 0]) for x in (-0.72, -0.28, 0.28, 0.72)
    ])
    sabots = VGroup(*[
        Rectangle(width=0.16, height=0.12, color=BLACK, fill_color=BLACK, fill_opacity=1, stroke_width=0)
        .move_to([x, -1.0, 0]) for x in (-0.72, -0.28, 0.28, 0.72)
    ])
    pis = Ellipse(width=0.4, height=0.3, color=PINK, fill_color=PINK, fill_opacity=1, stroke_width=0).move_to([0.2, -0.6, 0])
    queue = Line([-1.0, 0.2, 0], [-1.35, -0.5, 0], color=BLACK, stroke_width=3)

    tete = Ellipse(width=0.7, height=0.86, color=BLACK, fill_color=WHITE, fill_opacity=1, stroke_width=3).move_to([1.2, 0.2, 0])
    museau = Ellipse(width=0.5, height=0.4, color=PINK, fill_color=PINK, fill_opacity=1, stroke_width=2).move_to([1.28, -0.02, 0])
    narine1 = Dot(radius=0.03, color=BLACK).move_to([1.2, -0.02, 0])
    narine2 = Dot(radius=0.03, color=BLACK).move_to([1.36, -0.02, 0])
    oeil = Dot(radius=0.05, color=BLACK).move_to([1.15, 0.42, 0])
    oreille = Ellipse(width=0.26, height=0.14, color=BLACK, fill_color=WHITE, fill_opacity=1, stroke_width=2).move_to([0.92, 0.5, 0])
    corne = Line([1.12, 0.6, 0], [1.06, 0.78, 0], color=GREY_B, stroke_width=4)

    return VGroup(queue, pattes, sabots, corps, taches, pis,
                  tete, oreille, corne, museau, narine1, narine2, oeil).scale(echelle)


def bouteille_lait(echelle=1.0):
    corps = RoundedRectangle(width=0.5, height=0.9, corner_radius=0.1, color=GREY_B, stroke_width=2)
    lait = RoundedRectangle(width=0.44, height=0.6, corner_radius=0.08, color=WHITE,
                            fill_color=WHITE, fill_opacity=0.95, stroke_width=0).move_to(corps.get_center() + DOWN * 0.1)
    col = Rectangle(width=0.22, height=0.16, color=GREY_B, stroke_width=2).next_to(corps, UP, buff=0)
    bouchon = Rectangle(width=0.24, height=0.1, color=BLEU_CALCUL, fill_color=BLEU_CALCUL,
                        fill_opacity=1, stroke_width=0).next_to(col, UP, buff=0)
    return VGroup(corps, lait, col, bouchon).scale(echelle)


def pot_yaourt(echelle=1.0):
    corps = Polygon([-0.3, -0.38, 0], [0.3, -0.38, 0], [0.36, 0.28, 0], [-0.36, 0.28, 0],
                    color=GREY_B, fill_color=WHITE, fill_opacity=0.95, stroke_width=2)
    couvercle = Rectangle(width=0.78, height=0.1, color=VIOLET_ACCENT, fill_color=VIOLET_ACCENT,
                          fill_opacity=1, stroke_width=0).move_to([0, 0.33, 0])
    return VGroup(corps, couvercle).scale(echelle)


def fromage(echelle=1.0):
    corps = Rectangle(width=1.0, height=0.48, fill_color=JAUNE_TITRE, fill_opacity=1,
                      stroke_color=ORANGE_RETENUE, stroke_width=2).shift(DOWN * 0.14)
    haut = Ellipse(width=1.0, height=0.3, fill_color=JAUNE_TITRE, fill_opacity=1,
                   stroke_color=ORANGE_RETENUE, stroke_width=2).move_to(corps.get_top())
    trous = VGroup(
        Dot(radius=0.05, color=ORANGE_RETENUE).move_to(corps.get_center() + [-0.22, 0.02, 0]),
        Dot(radius=0.06, color=ORANGE_RETENUE).move_to(corps.get_center() + [0.18, -0.08, 0]),
        Dot(radius=0.04, color=ORANGE_RETENUE).move_to(corps.get_center() + [0.02, 0.1, 0]),
    )
    return VGroup(corps, haut, trous).scale(echelle)


class LaitBase(Scene):
    """Helpers communs aux deux formats."""

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
        """Une animation d'apparition qui CHANGE à chaque appel (anti-monotonie).
        Sans mode imposé, on tourne dans une palette variée."""
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
        """Retourne dire() : une légende à la fois, mais qui CHANGE de place ET
        d'animation à chaque étape (fini la 2ᵉ ligne qui se réécrit au même endroit).
        Les positions tournent : coin haut-gauche, droite, haut, gauche, bas."""
        state = {"m": None, "k": 0}
        # (x, y) variés — jamais deux étapes de suite au même endroit.
        places = [(-3.4, 1.9), (3.1, -1.4), (0, 2.5), (-3.2, -0.2), (0, -2.7), (3.2, 1.5)]

        def dire(texte, size=26, couleur=BLEU_CALCUL, mode=None):
            x, y = places[state["k"] % len(places)]
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


# ════════════════════════════════════════════════════════════════════════════════
#  SCÈNE 16:9 — la vidéo YouTube complète
# ════════════════════════════════════════════════════════════════════════════════

class LaitReunion974(LaitBase):

    # ── écran 0 : accueil ───────────────────────────────────────────────────

    def ecran_accueil(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        titre = self.T("D'où vient ton yaourt ?", size=44, color=JAUNE_TITRE).to_edge(UP)
        sous = self.T("Les maths en vrai · La Réunion — EleveAI", size=30).next_to(titre, DOWN, buff=0.35)

        p = pre()
        sol = soleil(0.42).move_to([5.2, -1.5, 0])
        v = vache(0.62).move_to([-3.0, -1.7, 0])
        accroche = self.T("Du pré de la Plaine des Cafres... jusqu'à ton frigo !",
                          size=30, color=BLEU_CALCUL).move_to([0, 0.6, 0])

        # entrée : le titre grossit, le décor se pose, le soleil tourne, la vache glisse.
        self.play(GrowFromCenter(titre), FadeIn(sous, shift=0.3 * DOWN))
        self.play(FadeIn(p, shift=0.3 * UP), GrowFromCenter(sol))
        self.play(Rotate(sol, PI / 6, run_time=1.0), FadeIn(v, shift=0.6 * RIGHT))
        self.play(FadeIn(accroche, scale=0.5))
        self.wait(2.4)

    # ── écran 1 : la Plaine des Cafres ──────────────────────────────────────

    def ecran_plaine(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("1. La Plaine des Cafres, le pays du lait")

        p = pre()
        herbe = touffes_herbe(-2.2, np.linspace(-6, 6, 13))
        sol = soleil(0.42).move_to([-5.0, 2.2, 0])
        v = vache(0.7).move_to([1.2, -1.55, 0])
        self.play(FadeIn(p), GrowFromCenter(sol), FadeIn(herbe, lag_ratio=0.05))
        self.play(FadeIn(v, shift=0.5 * RIGHT))

        # légende n°1 : glisse depuis la gauche, en haut
        alt = self.T("À 1 500 m d'altitude, il fait frais :", size=27, color=WHITE).move_to([-1.4, 1.7, 0])
        alt2 = self.T("l'herbe pousse bien.", size=27, color=WHITE).next_to(alt, RIGHT, buff=0.25)
        self.play(self.anim_entree(alt, mode="slide_l"), self.anim_entree(alt2, mode="slide_r"))
        self.wait(0.5)

        # la vache broute : petit hochement de tête + une goutte de lait tombe
        l2 = self.T("Elles broutent cette herbe... et donnent du bon lait.",
                    size=27, color=BLEU_CALCUL).move_to([-0.3, 0.7, 0])
        self.play(self.anim_entree(l2, mode="fade_up"), Wiggle(v, scale_value=1.06))
        goutte = Circle(radius=0.09, color=WHITE, fill_color=WHITE, fill_opacity=1, stroke_width=0).move_to([1.35, -2.1, 0])
        self.play(FadeIn(goutte, scale=0.4))
        self.play(goutte.animate.shift(DOWN * 0.3).set_opacity(0.2), run_time=0.8)
        self.wait(2.0)

    # ── écran 2 : ce qu'il y a dans le lait (pourcentages) ──────────────────

    def ecran_composition(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("2. Qu'y a-t-il dans le lait ?")

        # barre empilée : hauteur 4 = 100 % ; légende en colonne (pas d'étiquette
        # collée aux segments fins → jamais de chevauchement).
        H = 4.0
        segments = [
            ("eau", 87, BLEU_CALCUL),
            ("sucre (lactose)", 5, VIOLET_ACCENT),
            ("matière grasse", 4, JAUNE_TITRE),
            ("protéines", 3, VERT_OK),
            ("minéraux", 1, ORANGE_RETENUE),
        ]
        x_bar = -4.6
        bas = -2.5
        barre = VGroup()
        y = bas
        for nom, pct, col in segments:
            h = H * pct / 100
            seg = Rectangle(width=1.3, height=h, fill_color=col, fill_opacity=0.9, stroke_color=WHITE, stroke_width=1)
            seg.move_to([x_bar, y + h / 2, 0])
            barre.add(seg)
            y += h
        contour = Rectangle(width=1.3, height=H, color=WHITE, stroke_width=2).move_to([x_bar, bas + H / 2, 0])

        # colonne de légende à droite : pastille couleur + texte
        lignes = VGroup()
        for nom, pct, col in segments:
            pastille = Square(side_length=0.34, fill_color=col, fill_opacity=0.9, stroke_color=WHITE, stroke_width=1)
            txt = self.T(f"{pct} %  {nom}", size=26, color=col)
            lignes.add(VGroup(pastille, txt).arrange(RIGHT, buff=0.3))
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.34).move_to([0.6, 0.9, 0])

        self.play(Create(contour))
        for seg, ligne in zip(barre, lignes):
            self.play(GrowFromEdge(seg, DOWN), FadeIn(ligne, shift=0.2 * RIGHT), run_time=0.55)

        # on zoome sur le gros segment « eau » pour marquer les 87 %.
        self.play(Indicate(barre[0], color=BLEU_CALCUL, scale_factor=1.15),
                  Flash(lignes[0], color=BLEU_CALCUL))
        note = self.T("Le lait, c'est SURTOUT de l'eau !", size=27, color=BLEU_CALCUL).move_to([0.4, -1.4, 0])
        note2 = self.T("Fromage et yaourt = le reste, qu'on concentre.", size=25).move_to([0.4, -2.1, 0])
        self.play(self.anim_entree(note, mode="grow"))
        self.play(self.anim_entree(note2, mode="fade_up"))
        self.wait(2.2)

    # ── écran 3 : le yaourt ─────────────────────────────────────────────────

    def ecran_yaourt(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("3. Le lait devient YAOURT")
        dire, _ = self.legende_mobile()

        # pot au centre-gauche pour laisser la place aux légendes qui tournent
        pot = pot_yaourt(1.5).move_to([-2.4, -0.5, 0])
        lait = RoundedRectangle(width=0.95, height=0.75, corner_radius=0.12, color=WHITE,
                                fill_color=WHITE, fill_opacity=0.9, stroke_width=0).move_to([-2.4, -0.6, 0])
        self.play(FadeIn(pot[0], shift=0.3 * UP), GrowFromEdge(lait, DOWN))
        dire("On part du lait, tout simple.", mode="slide_l")

        # on chauffe : vagues de chaleur orange sous le pot (elles pulsent)
        chaleur = VGroup(*[
            Arc(radius=0.2 + 0.12 * i, start_angle=PI * 0.15, angle=PI * 0.7, color=ORANGE_RETENUE, stroke_width=3)
            .move_to([-2.4, -1.75, 0]) for i in range(3)
        ])
        self.play(LaggedStart(*[GrowFromCenter(c) for c in chaleur], lag_ratio=0.2), run_time=1.0)
        dire("On le chauffe un peu (≈ 40 °C).", couleur=ORANGE_RETENUE, mode="fade_down")
        self.play(Indicate(chaleur, color=ORANGE_RETENUE, scale_factor=1.2))

        # on ajoute les ferments : petits points (positions fixes, reproductibles)
        pos = [(-0.25, -0.85), (0.2, -0.6), (0.05, -0.9), (-0.1, -0.55), (0.25, -0.8), (-0.2, -0.65)]
        ferments = VGroup(*[Dot(radius=0.05, color=VERT_OK).move_to([-2.4 + px, py, 0]) for px, py in pos])
        dire("On ajoute des ferments : de minuscules bactéries.", couleur=VERT_OK, mode="pop")
        self.play(LaggedStart(*[FadeIn(d, scale=0.3) for d in ferments], lag_ratio=0.15), run_time=1.4)

        pos2 = [(-0.3, -0.9), (0.3, -0.9), (-0.15, -0.6), (0.15, -0.6), (0.0, -0.75), (-0.32, -0.65),
                (0.32, -0.7), (-0.05, -0.95), (0.1, -0.9), (0.22, -0.55)]
        plus = VGroup(*[Dot(radius=0.05, color=VERT_OK).move_to([-2.4 + px, py, 0]) for px, py in pos2])
        dire("Elles mangent le sucre et se multiplient...", couleur=VERT_OK, mode="grow")
        self.play(LaggedStart(*[GrowFromCenter(d) for d in plus], lag_ratio=0.08), run_time=1.6)

        # le lait épaissit → yaourt (transformation + halo)
        yaourt = RoundedRectangle(width=1.0, height=0.82, corner_radius=0.12, color=WHITE,
                                  fill_color=WHITE, fill_opacity=1, stroke_color=VIOLET_ACCENT, stroke_width=2).move_to([-2.4, -0.55, 0])
        dire("...le lait épaissit : c'est le YAOURT !", couleur=VERT_OK, mode="fade_up")
        self.play(FadeOut(ferments), FadeOut(plus), Transform(lait, yaourt), FadeIn(pot[1], shift=0.2 * DOWN))
        self.play(pot.animate.scale(1.12), Circumscribe(pot, color=VERT_OK))
        self.wait(2.0)

    # ── écran 4 : le fromage ────────────────────────────────────────────────

    def ecran_fromage(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("4. Le lait devient FROMAGE")
        dire, _ = self.legende_mobile()

        cuve = VGroup(
            Line([-1.2, 0.4, 0], [-1.2, -1.0, 0], color=GREY_B, stroke_width=3),
            Line([-1.2, -1.0, 0], [1.2, -1.0, 0], color=GREY_B, stroke_width=3),
            Line([1.2, -1.0, 0], [1.2, 0.4, 0], color=GREY_B, stroke_width=3),
        ).move_to([-2.6, -0.3, 0])
        lait = Rectangle(width=2.3, height=1.2, fill_color=WHITE, fill_opacity=0.9, stroke_width=0).move_to([-2.6, -0.4, 0])
        self.play(Create(cuve), GrowFromEdge(lait, DOWN))
        dire("On chauffe le lait dans une grande cuve.", mode="slide_l")

        dire("On ajoute la présure : le lait se met à cailler.", couleur=ORANGE_RETENUE, mode="fade_down")
        # le lait se sépare : caillé (cubes blancs) + petit-lait (liquide jaune clair)
        petit_lait = Rectangle(width=2.3, height=0.5, fill_color=JAUNE_TITRE, fill_opacity=0.35, stroke_width=0).move_to([-2.6, 0.05, 0])
        cubes = VGroup()
        for i in range(12):
            c = Square(side_length=0.2, color=WHITE, fill_color=WHITE, fill_opacity=1, stroke_color=GREY_C, stroke_width=1)
            cx = -3.6 + (i % 4) * 0.66
            cy = -0.75 + (i // 4) * 0.24
            c.move_to([cx, cy, 0])
            cubes.add(c)
        dire("Ça se sépare : le CAILLÉ (solide) et le PETIT-LAIT (liquide).", couleur=BLEU_CALCUL, mode="pop")
        self.play(Transform(lait, petit_lait), LaggedStart(*[FadeIn(c, scale=0.4) for c in cubes], lag_ratio=0.06), run_time=1.8)

        # étiquettes des deux parts, qui glissent en place
        f1 = self.T("caillé", size=22, color=WHITE).move_to([-2.6, -1.35, 0])
        f2 = self.T("petit-lait", size=22, color=JAUNE_TITRE).next_to(f1, RIGHT, buff=0.5)
        self.play(FadeIn(f1, shift=0.2 * UP), FadeIn(f2, shift=0.2 * UP))

        # on presse le caillé → une meule de fromage (la flèche se trace, le caillé devient meule)
        dire("On presse, on sale, on affine → le FROMAGE !", couleur=VERT_OK, mode="grow")
        meule = fromage(1.6).move_to([3.4, -0.4, 0])
        fleche = Arrow([-1.1, -0.4, 0], [2.4, -0.4, 0], color=WHITE, stroke_width=4, buff=0.2)
        self.play(GrowArrow(fleche))
        self.play(ReplacementTransform(cubes, meule), FadeOut(f1), FadeOut(f2))
        self.play(meule.animate.scale(1.12), Flash(meule, color=VERT_OK))
        self.wait(2.0)

    # ── écran 5 : défi ──────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.6)
        titre = self.T("Défi", size=48, color=JAUNE_TITRE).to_edge(UP)
        self.play(GrowFromCenter(titre))

        # le rappel encadré, EN HAUT (sous le titre), centré — n'empiète sur rien
        rappel = self.T("Rappel : 10 L de lait → 1 kg de fromage", size=26, color=VERT_OK).move_to([0, 2.1, 0])
        cadre = SurroundingRectangle(rappel, color=VERT_OK, buff=0.2, corner_radius=0.1)
        self.play(self.anim_entree(rappel, mode="fade_down"), Create(cadre))

        # ligne du milieu : le bidon (250 L) à gauche, le fromage (500 g) à droite
        bidon = RoundedRectangle(width=1.5, height=1.9, corner_radius=0.18, color=GREY_B,
                                 fill_color=GREY_D, fill_opacity=0.5, stroke_width=3).move_to([-3.9, 0.2, 0])
        bidon_lait = RoundedRectangle(width=1.32, height=1.4, corner_radius=0.12, color=WHITE,
                                      fill_color=WHITE, fill_opacity=0.9, stroke_width=0).move_to([-3.9, 0.05, 0])
        anse = Arc(radius=0.45, start_angle=0, angle=PI, color=GREY_B, stroke_width=4).move_to([-3.9, 1.2, 0])
        lab_bidon = self.T("250 L / jour", size=26, color=BLEU_CALCUL).next_to(bidon, DOWN, buff=0.2)
        self.play(FadeIn(VGroup(bidon, bidon_lait, anse), shift=0.6 * RIGHT))
        self.play(self.anim_entree(lab_bidon, mode="fade_up"))

        petit = fromage(0.9).move_to([1.4, 0.3, 0])
        lab_petit = self.T("un fromage = 500 g", size=26, color=JAUNE_TITRE).next_to(petit, DOWN, buff=0.3)
        self.play(FadeIn(petit, scale=0.4))
        self.play(self.anim_entree(lab_petit, mode="pop"))

        # la question, en bas — deux lignes centrées
        q1 = self.T("Combien de fromages la fromagerie", size=30, color=WHITE).move_to([0, -1.75, 0])
        q2 = self.T("fait-elle en une journée ?", size=30, color=WHITE).next_to(q1, DOWN, buff=0.18)
        self.play(self.anim_entree(q1, mode="slide_l"), self.anim_entree(q2, mode="slide_r"))
        pause = self.T("⏸ Mets pause : il y a DEUX étapes...", size=28, color=ORANGE_RETENUE).to_edge(DOWN, buff=0.35)
        self.play(GrowFromCenter(pause))
        self.wait(4.5)

    # ── écran 6 : correction (2 étapes) ─────────────────────────────────────

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("Correction")

        # ── Étape 1 : les litres → les kilos de fromage
        e1 = self.T("Étape 1 — le lait donne le fromage", size=28, color=BLEU_CALCUL).move_to([0, 2.3, 0])
        self.play(self.anim_entree(e1, mode="slide_l"))
        c1 = self.T("250 L ÷ 10 = 25 kg de fromage", size=38, color=VERT_OK).move_to([0, 1.4, 0])
        self.play(self.anim_entree(c1, mode="grow"))
        self.play(Circumscribe(c1, color=VERT_OK))

        # ── Étape 2 : les kilos → le nombre de fromages (avec conversion)
        e2 = self.T("Étape 2 — combien de fromages de 500 g ?", size=28, color=ORANGE_RETENUE).move_to([0, 0.4, 0])
        self.play(self.anim_entree(e2, mode="slide_r"))
        conv = self.T("500 g = 0,5 kg", size=30, color=WHITE).move_to([0, -0.4, 0])
        self.play(self.anim_entree(conv, mode="pop"))
        c2 = self.T("25 ÷ 0,5 = 50 fromages", size=38, color=VERT_OK).move_to([0, -1.3, 0])
        self.play(self.anim_entree(c2, mode="fade_up"))
        self.play(Flash(c2, color=VERT_OK))

        concl = self.T("→ 50 fromages par jour !", size=32, color=JAUNE_TITRE).to_edge(DOWN, buff=0.5)
        self.play(GrowFromCenter(concl))
        self.wait(2.8)

    # ── écran 7 : à retenir ─────────────────────────────────────────────────

    def ecran_conclusion(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        titre = self.T("À retenir", size=46, color=JAUNE_TITRE).to_edge(UP)

        points = VGroup(
            self.T("1. La Plaine des Cafres (1 500 m) : le pays du lait à La Réunion.", size=26),
            self.T("2. Le lait, c'est surtout de l'eau (87 %) + matière grasse + protéines.", size=26),
            self.T("3. Yaourt = lait chauffé + ferments qui l'épaississent.", size=26),
            self.T("4. Fromage = lait caillé puis pressé (10 L de lait → 1 kg).", size=26),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.42).move_to([-0.2, 0.2, 0])

        signature = self.T(SIGNATURE, size=26, color=VERT_OK).to_edge(DOWN)
        self.play(GrowFromCenter(titre))
        self.play(LaggedStart(*[FadeIn(p, shift=0.4 * RIGHT) for p in points], lag_ratio=0.35))
        self.play(FadeIn(signature, shift=0.3 * UP), Flash(signature, color=VERT_OK))
        self.wait(2.5)

    def construct(self):
        self.ecran_accueil()
        self.ecran_plaine()
        self.ecran_composition()
        self.ecran_yaourt()
        self.ecran_fromage()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_conclusion()


# ════════════════════════════════════════════════════════════════════════════════
#  SCÈNE 9:16 — le Short, rendre avec -r 1080,1920
# ════════════════════════════════════════════════════════════════════════════════

class LaitReunion974Short(LaitBase):

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
        t1 = self.T("10 litres de lait", size=34).move_to([0, 2.4, 0])
        t2 = self.T("= 1 seul kg", size=40, color=JAUNE_TITRE).next_to(t1, DOWN, buff=0.25)
        t3 = self.T("de fromage.", size=34).next_to(t2, DOWN, buff=0.25)

        p = pre(largeur=4.6, y_top=-1.9, hauteur=1.6)
        v = vache(0.7).move_to([-0.4, -1.0, 0])
        self.play(Write(badge), Write(t1), Write(t2), Write(t3))
        self.play(FadeIn(p, shift=0.2 * UP), FadeIn(v, shift=0.3 * RIGHT))
        # la question reste à gauche du margouillat (coin bas-droit)
        q = self.T("D'où vient ton yaourt ?", size=28, color=BLEU_CALCUL).move_to([-0.35, -3.5, 0])
        self.play(Write(q))
        self.wait(1.8)

    def ecran_plaine(self):
        self.clear()
        self.add_mascotte(scale=0.45)
        l1 = self.T("Tout commence à la", size=26).move_to([0, 3.4, 0])
        l2 = self.T("Plaine des Cafres,", size=28, color=BLEU_CALCUL).next_to(l1, DOWN, buff=0.15)
        l3 = self.T("à 1 500 m d'altitude.", size=26).next_to(l2, DOWN, buff=0.15)
        self.play(Write(l1), Write(l2), Write(l3))

        p = pre(largeur=4.6, y_top=-0.4, hauteur=1.6)
        sol = soleil(0.34).move_to([-1.4, 1.4, 0])
        v = vache(0.75).move_to([0.1, 0.5, 0])
        self.play(GrowFromCenter(sol), FadeIn(p))
        self.play(FadeIn(v, shift=0.3 * RIGHT))

        l4 = self.T("Les vaches broutent l'herbe des hauts", size=24, color=VERT_OK).move_to([0, -2.5, 0])
        l5 = self.T("et donnent du bon lait.", size=24, color=VERT_OK).next_to(l4, DOWN, buff=0.15)
        self.play(Write(l4), Write(l5))
        self.wait(1.8)

    def ecran_transfo(self):
        self.clear()
        self.add_mascotte(scale=0.45)
        l1 = self.T("Ce lait devient...", size=30, color=JAUNE_TITRE).move_to([0, 3.4, 0])
        self.play(Write(l1))

        # deux produits EMPILÉS (le vertical est trop étroit pour 2 colonnes) :
        # l'icône à gauche, le texte à droite.
        pot = pot_yaourt(1.2).move_to([-1.3, 1.9, 0])
        ly = self.T("YAOURT", size=28, color=VIOLET_ACCENT).move_to([0.7, 2.15, 0])
        ly2 = self.T("lait + ferments", size=22).move_to([0.7, 1.6, 0])
        self.play(FadeIn(pot, scale=0.6), Write(ly), Write(ly2))

        f = fromage(1.4).move_to([-1.3, -0.1, 0])
        lf = self.T("FROMAGE", size=28, color=JAUNE_TITRE).move_to([0.75, 0.2, 0])
        lf2 = self.T("lait caillé, pressé", size=22).move_to([0.75, -0.35, 0])
        self.play(FadeIn(f, scale=0.6), Write(lf), Write(lf2))

        l3 = self.T("Le fromage, c'est du lait", size=24, color=BLEU_CALCUL).move_to([0, -2.4, 0])
        l4 = self.T("concentré : d'où les 10 litres !", size=24, color=BLEU_CALCUL).next_to(l3, DOWN, buff=0.15)
        self.play(Write(l3), Write(l4))
        self.wait(2.0)

    def ecran_cta(self):
        self.clear()
        m = MascotteMargouillat().scale(0.9).move_to([0, -1.4, 0])
        self.add(m)
        t1 = self.T("La Réunion en vrai,", size=28).move_to([0, 2.6, 0])
        t2 = self.T("expliquée en vidéo :", size=28).next_to(t1, DOWN, buff=0.2)
        url = self.T("eleveai.fr", size=44, color=VERT_OK).next_to(t2, DOWN, buff=0.5)
        sig = self.T(SIGNATURE, size=20, color=VERT_OK).move_to([0, -3.4, 0])
        self.play(Write(t1), Write(t2))
        self.play(Write(url), Flash(url, color=VERT_OK))
        self.play(Write(sig))
        self.wait(2.2)

    def construct(self):
        self.ecran_hook()
        self.ecran_plaine()
        self.ecran_transfo()
        self.ecran_cta()


# ─── SCRIPT VOIX (optionnel — à lire au téléphone par-dessus la vidéo 16:9 muette) ──
# Dire « top » quand le titre d'accueil apparaît (point de synchro Clipchamp).
#
# [Accueil ~0:00]    « D'où vient ton yaourt ? Du pré de la Plaine des Cafres,
#                      jusqu'à ton frigo. »
# [Écran 1 ~0:12]    « La Plaine des Cafres, à mille cinq cents mètres d'altitude.
#                      Il y fait frais, l'herbe pousse bien, les vaches la broutent
#                      et donnent du bon lait. »
# [Écran 2 ~0:32]    « Dans le lait, il y a surtout de l'eau : quatre-vingt-sept pour
#                      cent ! Puis du sucre, de la matière grasse, des protéines. Le
#                      fromage et le yaourt, c'est le reste, qu'on concentre. »
# [Écran 3 ~0:55]    « Pour le yaourt : on chauffe un peu le lait, on ajoute des
#                      ferments, de minuscules bactéries. Elles mangent le sucre, se
#                      multiplient, et le lait épaissit : c'est le yaourt ! »
# [Écran 4 ~1:20]    « Pour le fromage : on ajoute la présure, le lait caille. Ça se
#                      sépare en deux : le caillé, solide, et le petit-lait, liquide.
#                      On presse le caillé, on le sale, on l'affine : le fromage ! »
# [Défi ~1:45]       « À toi ! Il faut dix litres de lait pour un kilo de fromage.
#                      Combien de litres pour trois kilos ? Mets pause. »
# [Correction ~2:00] « Dix fois trois : trente. Il faut trente litres de lait pour
#                      trois kilos de fromage. »
# [À retenir ~2:15]  « On retient : la Plaine des Cafres, le pays du lait ; le lait,
#                      surtout de l'eau ; le yaourt, du lait et des ferments ; le
#                      fromage, du lait caillé et pressé. À bientôt ! »
