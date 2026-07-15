# circulation_eau.py
# EleveAI — « Les maths en vrai · La Réunion » — La circulation de l'eau à La Réunion
#
# NOUVEAU FORMAT (14/07) : vidéo « simulation » façon reel (flux animés), hors banques.
# Pas de notionId : c'est une vidéo de la série « en vrai 974 » (marketing + culture).
# Maths mobilisées : proportionnalité (« combien de fois plus »), lecture d'échelle,
# grands nombres (mm de pluie, altitude). Défi + correction comme les vidéos notions.
#
# Deux scènes dans ce fichier :
# - CirculationEau974      → 16:9 YouTube (~2 min)
# - CirculationEau974Short → 9:16 Shorts/Instagram (~45 s), rendre avec -r 1080,1920
#
# Rendu brouillon :
#   python -m manim render -ql manim/scripts/974/circulation_eau.py CirculationEau974 --media_dir manim/scripts/974/media
#   python -m manim render -ql -r 480,854 manim/scripts/974/circulation_eau.py CirculationEau974Short --media_dir manim/scripts/974/media
# Rendu final :
#   python -m manim render -qh manim/scripts/974/circulation_eau.py CirculationEau974 -o eleveai-maths-974-circulation-eau --media_dir manim/scripts/974/media
#   python -m manim render -qh -r 1080,1920 manim/scripts/974/circulation_eau.py CirculationEau974Short -o eleveai-maths-974-circulation-eau-short --media_dir manim/scripts/974/media
#
# Repères réels (ordres de grandeur, arrondis pour l'élève) :
# - Piton des Neiges : 3 071 m
# - Commerson (Est, hauts) : ~10 000 mm de pluie/an (records mondiaux de pluie)
# - Saint-Gilles (Ouest) : ~500 mm/an → 10 000 ÷ 500 = 20 fois plus
# - Usine hydroélectrique de la Rivière de l'Est

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

import numpy as np
from manim import *

from charte import *
from mascotte import MascotteMargouillat


# ── éléments de décor partagés (16:9 et 9:16) ──────────────────────────────────

def soleil(r=0.42):
    disque = Circle(radius=r, color=JAUNE_TITRE, fill_color=JAUNE_TITRE, fill_opacity=1, stroke_width=0)
    rayons = VGroup(*[
        Line((r + 0.10) * np.array([np.cos(a), np.sin(a), 0]),
             (r + 0.34) * np.array([np.cos(a), np.sin(a), 0]),
             color=JAUNE_TITRE, stroke_width=4)
        for a in np.linspace(0, 2 * PI, 8, endpoint=False)
    ])
    return VGroup(disque, rayons)


def nuage(largeur=1.6):
    g = VGroup(
        Circle(radius=0.30).shift(LEFT * 0.40),
        Circle(radius=0.42).shift(UP * 0.10),
        Circle(radius=0.28).shift(RIGHT * 0.42),
        RoundedRectangle(width=1.30, height=0.44, corner_radius=0.22).shift(DOWN * 0.12),
    )
    for m in g:
        m.set_fill(GREY_A, opacity=1).set_stroke(WHITE, width=1.5)
    g.scale(largeur / 1.6)
    return g


def gouttes_pluie(centre, n=8, largeur=1.6, couleur=BLEU_CALCUL):
    drops = VGroup()
    for i in range(n):
        x = centre[0] - largeur / 2 + i * largeur / max(n - 1, 1)
        y0 = centre[1] - 0.12 * (i % 3)
        drops.add(Line([x, y0, 0], [x - 0.08, y0 - 0.40, 0], color=couleur, stroke_width=3))
    return drops


def maison(couleur_mur=WHITE):
    mur = Square(side_length=0.62, color=couleur_mur, fill_color=GREY_E, fill_opacity=1, stroke_width=2)
    toit = Triangle(color=couleur_mur, fill_color=GREY_D, fill_opacity=1, stroke_width=2).scale(0.42)
    toit.stretch_to_fit_width(0.78).next_to(mur, UP, buff=0)
    fenetre = Square(side_length=0.20, color=WHITE, fill_color=GREY_C, fill_opacity=1, stroke_width=1.5)
    fenetre.move_to(mur.get_center())
    return VGroup(mur, toit, fenetre)


class EauBase(Scene):
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
        # les titres alternent leur entrée (Write / glisse / grossit).
        t = self.T(texte, size=38, color=JAUNE_TITRE).to_edge(UP)
        if not hasattr(self, "_tt"):
            self._tt = 0
        anim = [Write(t), FadeIn(t, shift=0.3 * DOWN), GrowFromCenter(t)][self._tt % 3]
        self._tt += 1
        self.play(anim)
        return t

    def anim_entree(self, m, mode=None, run_time=0.8):
        """Apparition qui CHANGE à chaque appel (anti-monotonie). Sans mode imposé,
        on tourne dans une palette variée (fini le tout-Write)."""
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

    def legende_mobile(self, places=None):
        """dire() : une légende à la fois, qui CHANGE de place ET d'animation à
        chaque étape (fini la 2e ligne qui se réécrit au même endroit). `pos=`
        force une position, `mode=` force l'animation."""
        state = {"m": None, "k": 0}
        if places is None:
            places = [(-3.4, 2.6), (3.2, 1.9), (0, 2.9), (-3.3, 0.9), (3.3, -1.4), (0, -2.9)]

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


# ════════════════════════════════════════════════════════════════════════════════
#  SCÈNE 16:9 — la vidéo YouTube complète
# ════════════════════════════════════════════════════════════════════════════════

class CirculationEau974(EauBase):

    # coupe Ouest → Est de l'île (le relief qui fait tout)
    def profil_ile(self, echelle=1.0, decal=ORIGIN):
        crete = [(-6.6, -2.6), (-4.0, -2.0), (-1.6, 0.3), (0.0, 1.3), (1.4, 0.4), (4.0, -1.9), (6.6, -2.6)]
        pts = [np.array([x, y, 0]) * echelle + decal for x, y in crete]
        bas = [np.array([6.6, -3.5, 0]) * echelle + decal, np.array([-6.6, -3.5, 0]) * echelle + decal]
        return Polygon(*pts, *bas, color=GREY_B, fill_color=GREY_D, fill_opacity=0.8, stroke_width=2)

    def mer(self, x_centre, largeur):
        return Rectangle(width=largeur, height=0.9, color=BLEU_CALCUL, fill_color=BLEU_CALCUL,
                         fill_opacity=0.55, stroke_width=0).move_to([x_centre, -3.05, 0])

    # ── écran 0 : accueil ───────────────────────────────────────────────────

    def ecran_accueil(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        titre = self.T("D'où vient l'eau de ton robinet ?", size=44, color=JAUNE_TITRE).to_edge(UP)
        sous = self.T("Les maths en vrai · La Réunion — EleveAI", size=30).next_to(titre, DOWN, buff=0.35)

        # petite silhouette de l'île : deux sommets au-dessus de la mer
        ile = self.profil_ile(echelle=0.42, decal=np.array([-2.2, -1.1, 0]))
        mer = Rectangle(width=8.2, height=0.5, color=BLEU_CALCUL, fill_color=BLEU_CALCUL,
                        fill_opacity=0.55, stroke_width=0).move_to([-2.2, -2.35, 0])
        sol = soleil(0.36).move_to([1.2, 0.6, 0])

        accroche = self.T("Suivons une goutte d'eau : de l'océan... jusqu'à la lumière !",
                          size=30, color=BLEU_CALCUL).next_to(sous, DOWN, buff=0.55)

        self.play(GrowFromCenter(titre), FadeIn(sous, shift=0.3 * DOWN))
        self.play(FadeIn(mer), FadeIn(ile, shift=0.3 * UP), GrowFromCenter(sol))
        self.play(Rotate(sol[1], PI / 6, run_time=0.9), FadeIn(accroche, scale=0.5))
        self.wait(2.4)

    # ── écran 1 : évaporation ───────────────────────────────────────────────

    def ecran_evaporation(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("1. Le soleil fait monter l'eau")

        ocean = Rectangle(width=12.6, height=1.5, color=BLEU_CALCUL, fill_color=BLEU_CALCUL,
                          fill_opacity=0.55, stroke_width=0).move_to([0, -2.7, 0])
        nom = self.T("OCÉAN INDIEN", size=24, color=WHITE).move_to(ocean.get_center())
        sol = soleil(0.5).move_to([-5.2, 2.4, 0])
        self.play(GrowFromEdge(ocean, DOWN), FadeIn(nom), GrowFromCenter(sol))
        self.play(Rotate(sol[1], PI / 8), run_time=0.8)

        l1 = self.T("Le soleil chauffe l'océan : l'eau s'évapore.", size=28).move_to([1.2, 2.6, 0])
        self.play(self.anim_entree(l1, mode="slide_r"))

        # les gouttes invisibles qui montent
        gouttes = VGroup(*[
            Circle(radius=0.07, color=BLEU_CALCUL, fill_color=BLEU_CALCUL, fill_opacity=0.9, stroke_width=0)
            .move_to([-3.2 + i * 1.1, -1.85, 0])
            for i in range(6)
        ])
        self.play(LaggedStart(*[
            Succession(FadeIn(g, scale=0.4),
                       g.animate.shift(UP * (2.6 + 0.3 * (i % 3))).set_opacity(0.15))
            for i, g in enumerate(gouttes)
        ], lag_ratio=0.18), run_time=3.0)

        nu = nuage(1.8).move_to([1.6, 1.2, 0])
        l2 = self.T("En montant, la vapeur refroidit :", size=26, color=BLEU_CALCUL).move_to([-0.2, -0.3, 0])
        l3 = self.T("elle redevient des gouttes → un nuage est né !", size=26, color=BLEU_CALCUL).move_to([0, -1.1, 0])
        self.play(FadeIn(nu, scale=0.6))
        self.play(self.anim_entree(l2, mode="fade_up"))
        self.play(self.anim_entree(l3, mode="grow"), Flash(nu, color=GREY_A))
        self.wait(2.4)

    # ── écran 2 : l'effet de foehn ──────────────────────────────────────────

    def ecran_foehn(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("2. Pourquoi il pleut surtout à l'Est ?")

        # légendes distribuées : places calées sur le CIEL dégagé (haut-gauche,
        # haut-droite) pour ne pas tomber sur le relief central.
        dire, legende = self.legende_mobile(places=[(-3.4, 2.5), (3.3, 2.5), (-3.4, 1.4), (3.3, 1.4)])

        ile = self.profil_ile()
        mer_e = self.mer(6.3, 1.4)
        mer_o = self.mer(-6.3, 1.4)
        sommet = self.T("Piton des Neiges · 3 071 m", size=20).move_to([0, 1.75, 0])
        ouest = self.T("OUEST", size=24, color=ORANGE_RETENUE).move_to([-5.4, -3.05, 0])
        est = self.T("EST", size=24, color=BLEU_CALCUL).move_to([5.4, -3.05, 0])
        self.play(FadeIn(ile, shift=0.3 * UP), FadeIn(mer_e), FadeIn(mer_o))
        self.play(FadeIn(sommet, shift=0.2 * DOWN), FadeIn(ouest, shift=0.3 * LEFT), FadeIn(est, shift=0.3 * RIGHT))

        vent = Arrow([6.6, -0.9, 0], [4.4, -0.9, 0], color=WHITE, stroke_width=4, buff=0)
        vlab = self.T("les alizés", size=22).next_to(vent, UP, buff=0.12)
        self.play(GrowArrow(vent), FadeIn(vlab, shift=0.3 * LEFT))

        nu = nuage(1.5).move_to([5.6, -1.3, 0])
        self.play(FadeIn(nu, scale=0.6))
        dire("Le vent pousse le nuage sur la montagne.", mode="slide_r")
        self.play(nu.animate.move_to([3.2, -0.6, 0]), run_time=1.2)
        self.play(nu.animate.move_to([1.6, 1.1, 0]).scale(1.25), run_time=1.4)

        # il pleut sur le versant Est
        pluie1 = gouttes_pluie([2.6, 0.4, 0], n=9, largeur=2.2)
        pluie2 = gouttes_pluie([3.4, -0.6, 0], n=9, largeur=2.2)
        dire("En haut il fait froid : il pleut à l'EST.", mode="pop")
        for pl in (pluie1, pluie2):
            self.play(LaggedStart(*[
                Succession(FadeIn(d, shift=0.25 * DOWN), FadeOut(d, shift=0.35 * DOWN))
                for d in pl
            ], lag_ratio=0.06), run_time=1.6)

        # l'air redescend sec à l'Ouest
        self.play(nu.animate.move_to([-1.3, 1.0, 0]).scale(0.55).set_opacity(0.4), run_time=1.4)
        descente = Arrow([-1.8, 0.6, 0], [-4.0, -1.5, 0], color=ORANGE_RETENUE, stroke_width=4, buff=0)
        sol = soleil(0.4).move_to([-5.3, 1.9, 0])
        self.play(GrowArrow(descente), GrowFromCenter(sol))
        dire("L'air redescend sec : l'OUEST reste sec.", couleur=ORANGE_RETENUE, mode="slide_l")
        self.wait(1.0)

        self.play(FadeOut(legende["m"]))
        foehn = self.T("C'est l'effet de foehn !", size=34, color=VERT_OK).move_to([0, 2.55, 0])
        self.play(GrowFromCenter(foehn), Circumscribe(VGroup(vent, nu), color=VERT_OK))
        self.wait(2.2)

    # ── écran 3 : l'eau descend ─────────────────────────────────────────────

    def ecran_descente(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("3. La pluie descend... jusqu'à ton robinet")

        ile = self.profil_ile()
        mer_e = self.mer(6.3, 1.4)
        nu = nuage(1.4).move_to([0.6, 2.0, 0])
        self.play(FadeIn(ile, shift=0.3 * UP), FadeIn(mer_e), FadeIn(nu, scale=0.7))

        pl = gouttes_pluie([0.6, 1.3, 0], n=7, largeur=1.6)
        self.play(LaggedStart(*[
            Succession(FadeIn(d, shift=0.25 * DOWN), FadeOut(d, shift=0.35 * DOWN)) for d in pl
        ], lag_ratio=0.06), run_time=1.4)

        l1 = self.T("L'eau dévale : cascades, puis rivières, jusqu'à la mer.",
                    size=25, color=BLEU_CALCUL).move_to([-1.4, 2.9, 0])
        self.play(self.anim_entree(l1, mode="slide_l"))

        # le chemin de l'eau : sommet → versant Est → mer
        chemin = VMobject(color=BLEU_CALCUL, stroke_width=5)
        chemin.set_points_as_corners([
            [0.2, 1.15, 0], [1.4, 0.35, 0], [2.1, 0.1, 0], [2.1, -0.9, 0],
            [3.2, -1.4, 0], [4.2, -2.0, 0], [5.8, -2.62, 0],
        ])
        self.play(Create(chemin), run_time=1.6)

        gouttes = VGroup(*[Circle(radius=0.075, color=BLEU_CALCUL, fill_color=BLEU_CALCUL,
                                  fill_opacity=1, stroke_width=0) for _ in range(4)])
        for g in gouttes:
            g.move_to(chemin.get_start())
        self.play(LaggedStart(*[MoveAlongPath(g, chemin) for g in gouttes], lag_ratio=0.22), run_time=3.0)
        self.play(FadeOut(gouttes))

        # une partie s'infiltre
        infiltre = DashedLine([3.0, -1.35, 0], [3.4, -2.9, 0], color=VIOLET_ACCENT, stroke_width=4)
        l2 = self.T("Une partie s'infiltre sous terre : les nappes.", size=24, color=VIOLET_ACCENT)
        l2.move_to([-3.3, 0.9, 0])
        self.play(Create(infiltre), self.anim_entree(l2, mode="fade_up"))
        self.wait(0.6)

        # une partie est captée
        captage = RoundedRectangle(width=1.0, height=0.55, corner_radius=0.1, color=VERT_OK,
                                   stroke_width=3).move_to([2.1, -0.45, 0])
        clab = self.T("réservoir", size=18, color=VERT_OK).next_to(captage, RIGHT, buff=0.15)
        l3 = self.T("Une partie est captée : réservoirs → ton robinet !", size=24, color=VERT_OK)
        l3.move_to([-3.1, 0.1, 0])
        self.play(GrowFromCenter(captage), FadeIn(clab, shift=0.2 * RIGHT))
        self.play(self.anim_entree(l3, mode="grow"))
        self.wait(2.4)

    # ── écran 4 : la centrale hydroélectrique ───────────────────────────────

    def ecran_centrale(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("4. L'eau qui tombe devient de la lumière")

        retenue = Rectangle(width=2.4, height=0.85, color=BLEU_CALCUL, fill_color=BLEU_CALCUL,
                            fill_opacity=0.6, stroke_width=2).move_to([-4.8, 1.7, 0])
        rlab = self.T("retenue d'eau, en altitude", size=20).next_to(retenue, UP, buff=0.15)
        conduite = Line([-3.9, 1.35, 0], [-0.7, -1.55, 0], color=GREY_B, stroke_width=12)
        klab = self.T("conduite forcée", size=20).move_to([-3.4, -0.6, 0])
        self.play(FadeIn(retenue, shift=0.3 * DOWN), FadeIn(rlab, shift=0.2 * DOWN))
        self.play(Create(conduite), FadeIn(klab, shift=0.3 * LEFT))

        # la turbine
        turbine = VGroup(
            Circle(radius=0.55, color=WHITE, stroke_width=3),
            *[Line(ORIGIN, 0.5 * np.array([np.cos(a), np.sin(a), 0]), color=WHITE, stroke_width=3)
              for a in np.linspace(0, 2 * PI, 4, endpoint=False)],
            Circle(radius=0.08, color=WHITE, fill_color=WHITE, fill_opacity=1, stroke_width=0),
        ).move_to([-0.35, -1.85, 0])
        tlab = self.T("turbine", size=20).next_to(turbine, DOWN, buff=0.15)
        self.play(Create(turbine), FadeIn(tlab, shift=0.2 * DOWN))

        l1 = self.T("À la Rivière de l'Est, l'eau tombe de très haut", size=26, color=BLEU_CALCUL)
        l2 = self.T("dans un grand tuyau : elle fait tourner une turbine.", size=26, color=BLEU_CALCUL)
        l1.move_to([1.8, 2.6, 0])
        l2.next_to(l1, DOWN, buff=0.22)
        self.play(self.anim_entree(l1, mode="slide_r"))
        self.play(self.anim_entree(l2, mode="fade_up"))

        # l'eau coule, la turbine tourne
        chemin = Line(conduite.get_start(), conduite.get_end())
        gouttes = VGroup(*[Circle(radius=0.08, color=BLEU_CALCUL, fill_color=BLEU_CALCUL,
                                  fill_opacity=1, stroke_width=0).move_to(chemin.get_start())
                           for _ in range(5)])
        self.play(
            LaggedStart(*[MoveAlongPath(g, chemin) for g in gouttes], lag_ratio=0.18),
            Rotate(turbine, -3 * PI),
            run_time=3.0,
        )
        self.play(FadeOut(gouttes))

        # le courant part vers les maisons
        fil = Line([0.2, -1.6, 0], [3.1, -1.6, 0], color=JAUNE_TITRE, stroke_width=4)
        flab = self.T("électricité", size=20, color=JAUNE_TITRE).next_to(fil, UP, buff=0.12)
        m1 = maison().move_to([3.9, -1.75, 0])
        m2 = maison().move_to([5.3, -1.75, 0])
        self.play(Create(fil), Write(flab), FadeIn(m1), FadeIn(m2))
        self.play(m1[2].animate.set_fill(JAUNE_TITRE, opacity=1),
                  m2[2].animate.set_fill(JAUNE_TITRE, opacity=1),
                  Flash(m1[2], color=JAUNE_TITRE), Flash(m2[2], color=JAUNE_TITRE))

        l3 = self.T("La pluie de l'Est éclaire les maisons de toute l'île !", size=27, color=VERT_OK)
        l3.to_edge(DOWN, buff=0.5).shift(LEFT * 1.0)
        self.play(GrowFromCenter(l3))
        self.wait(2.4)

    # ── écran 5 : défi ──────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.6)
        titre = self.T("Défi", size=48, color=JAUNE_TITRE).to_edge(UP)
        self.play(GrowFromCenter(titre))

        # rappel encadré, EN HAUT, centré
        rappel = self.T("Rappel : 1 mm de pluie sur 1 m² = 1 litre", size=26, color=VERT_OK).move_to([0, 2.2, 0])
        cadre = SurroundingRectangle(rappel, color=VERT_OK, buff=0.2, corner_radius=0.1)
        self.play(self.anim_entree(rappel, mode="fade_down"), Create(cadre))

        # à gauche : la maison + son toit (100 m²) sous la pluie
        m = maison().scale(1.5).move_to([-4.2, -0.4, 0])
        pluie = gouttes_pluie([-4.2, 1.2, 0], n=7, largeur=1.9)
        toit_lab = self.T("toit : 100 m²", size=24, color=WHITE).next_to(m, DOWN, buff=0.25)
        pluie_lab = self.T("2 000 mm / an", size=24, color=BLEU_CALCUL).move_to([-4.2, 1.7, 0])
        self.play(FadeIn(m, shift=0.4 * UP))
        self.play(self.anim_entree(pluie_lab, mode="fade_down"),
                  LaggedStart(*[Succession(FadeIn(d, shift=0.2 * DOWN), FadeOut(d, shift=0.3 * DOWN)) for d in pluie],
                              lag_ratio=0.06), run_time=1.4)
        self.play(self.anim_entree(toit_lab, mode="fade_up"))

        # à droite : une citerne de 5 000 L
        cuve = RoundedRectangle(width=1.7, height=2.0, corner_radius=0.2, color=GREY_B,
                                fill_color=GREY_D, fill_opacity=0.4, stroke_width=3).move_to([2.6, -0.3, 0])
        eau = RoundedRectangle(width=1.5, height=1.2, corner_radius=0.12, color=BLEU_CALCUL,
                               fill_color=BLEU_CALCUL, fill_opacity=0.55, stroke_width=0).move_to([2.6, -0.75, 0])
        cit_lab = self.T("une citerne = 5 000 L", size=24, color=JAUNE_TITRE).next_to(cuve, DOWN, buff=0.25)
        self.play(FadeIn(cuve, shift=0.4 * UP), GrowFromEdge(eau, DOWN))
        self.play(self.anim_entree(cit_lab, mode="pop"))

        q = self.T("Combien de citernes remplit-on en un an ?", size=30, color=WHITE).move_to([0, -2.5, 0])
        self.play(self.anim_entree(q, mode="grow"))
        pause = self.T("Mets pause : il y a DEUX étapes !", size=28, color=ORANGE_RETENUE).to_edge(DOWN, buff=0.3)
        self.play(GrowFromCenter(pause))
        self.wait(4.5)

    # ── écran 6 : correction (2 étapes) ─────────────────────────────────────

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("Correction")

        # ── Étape 1 : la pluie tombée sur le toit (mm × m² → litres)
        e1 = self.T("Étape 1 — l'eau tombée sur le toit", size=28, color=BLEU_CALCUL).move_to([0, 2.3, 0])
        self.play(self.anim_entree(e1, mode="slide_l"))
        c1a = self.T("2 000 mm × 100 m²", size=34, color=WHITE).move_to([0, 1.4, 0])
        self.play(self.anim_entree(c1a, mode="pop"))
        c1b = self.T("= 200 000 litres", size=38, color=VERT_OK).move_to([0, 0.6, 0])
        self.play(self.anim_entree(c1b, mode="grow"))
        self.play(Circumscribe(c1b, color=VERT_OK))

        # ── Étape 2 : combien de citernes de 5 000 L
        e2 = self.T("Étape 2 — combien de citernes de 5 000 L ?", size=28, color=ORANGE_RETENUE).move_to([0, -0.4, 0])
        self.play(self.anim_entree(e2, mode="slide_r"))
        c2 = self.T("200 000 ÷ 5 000 = 40 citernes", size=38, color=VERT_OK).move_to([0, -1.3, 0])
        self.play(self.anim_entree(c2, mode="fade_up"))
        self.play(Flash(c2, color=VERT_OK))

        concl = self.T("→ 40 citernes d'eau de pluie en un an !", size=30, color=JAUNE_TITRE).to_edge(DOWN, buff=0.5)
        self.play(GrowFromCenter(concl))
        self.wait(2.8)

    # ── écran 7 : à retenir ─────────────────────────────────────────────────

    def ecran_conclusion(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        titre = self.T("À retenir", size=46, color=JAUNE_TITRE).to_edge(UP)

        points = VGroup(
            self.T("1. Le soleil fait monter l'eau de l'océan (évaporation).", size=26),
            self.T("2. Les alizés poussent les nuages sur la montagne : il pleut à l'Est.", size=26),
            self.T("3. L'eau descend : cascades, rivières, nappes... et ton robinet.", size=26),
            self.T("4. À la Rivière de l'Est, l'eau qui tombe fabrique de l'électricité.", size=26),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.42).move_to([-0.4, 0.2, 0])

        signature = self.T(SIGNATURE, size=26, color=VERT_OK).to_edge(DOWN)

        self.play(GrowFromCenter(titre))
        self.play(LaggedStart(*[FadeIn(p, shift=0.4 * RIGHT) for p in points], lag_ratio=0.35))
        self.play(FadeIn(signature, shift=0.3 * UP), Flash(signature, color=VERT_OK))
        self.wait(2.5)

    def construct(self):
        self.ecran_accueil()
        self.ecran_evaporation()
        self.ecran_foehn()
        self.ecran_descente()
        self.ecran_centrale()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_conclusion()


# ════════════════════════════════════════════════════════════════════════════════
#  SCÈNE 9:16 — le Short (Instagram / YouTube Shorts), rendre avec -r 1080,1920
#  Cadre : largeur 4.5 unités, hauteur 8 unités.
# ════════════════════════════════════════════════════════════════════════════════

class CirculationEau974Short(EauBase):

    LARGEUR_SURE = 4.1

    def __init__(self, **kwargs):
        # cadre vertical : -r ne change que les pixels, pas le cadre logique →
        # on impose largeur 4.5 / hauteur 8 AVANT la création de la caméra.
        config.frame_height = 8.0
        config.frame_width = 4.5
        super().__init__(**kwargs)

    def profil_mini(self, y_base=-2.0, y_sommet=0.2):
        crete = [(-2.2, y_base), (-1.3, y_base + 0.25), (-0.5, y_sommet - 0.35), (0.0, y_sommet),
                 (0.5, y_sommet - 0.35), (1.3, y_base + 0.25), (2.2, y_base)]
        pts = [np.array([x, y, 0]) for x, y in crete]
        bas = [np.array([2.2, y_base - 0.5, 0]), np.array([-2.2, y_base - 0.5, 0])]
        return Polygon(*pts, *bas, color=GREY_B, fill_color=GREY_D, fill_opacity=0.8, stroke_width=2)

    # ── écran 1 : le hook ───────────────────────────────────────────────────

    def ecran_hook(self):
        self.clear()
        self.add_mascotte(scale=0.55)
        badge = self.T("LA RÉUNION", size=26, color=JAUNE_TITRE).move_to([0, 3.3, 0])
        t1 = self.T("Il pleut", size=34).move_to([0, 2.3, 0])
        t2 = self.T("20 fois plus", size=44, color=BLEU_CALCUL).next_to(t1, DOWN, buff=0.25)
        t3 = self.T("à l'EST qu'à l'OUEST.", size=32).next_to(t2, DOWN, buff=0.3)
        q = self.T("Pourquoi ?", size=42, color=JAUNE_TITRE).next_to(t3, DOWN, buff=0.55)

        ile = self.profil_mini(y_base=-2.4, y_sommet=-0.6)
        mer = Rectangle(width=4.4, height=0.4, color=BLEU_CALCUL, fill_color=BLEU_CALCUL,
                        fill_opacity=0.55, stroke_width=0).move_to([0, -2.6, 0])

        self.play(Write(badge))
        self.play(Write(t1), Write(t2))
        self.play(Write(t3))
        self.play(FadeIn(mer), FadeIn(ile, shift=0.2 * UP))
        self.play(Write(q), Flash(q, color=JAUNE_TITRE))
        self.wait(1.8)

    # ── écran 2 : le foehn en 15 secondes ───────────────────────────────────

    def ecran_foehn(self):
        self.clear()
        self.add_mascotte(scale=0.45)

        l1 = self.T("Les alizés poussent les nuages", size=26, color=BLEU_CALCUL).move_to([0, 3.4, 0])
        l2 = self.T("sur la montagne.", size=26, color=BLEU_CALCUL).next_to(l1, DOWN, buff=0.18)
        self.play(Write(l1), Write(l2))

        ile = self.profil_mini(y_base=-1.6, y_sommet=0.6)
        ouest = self.T("OUEST", size=20, color=ORANGE_RETENUE).move_to([-1.5, -2.45, 0])
        est = self.T("EST", size=20, color=BLEU_CALCUL).move_to([1.5, -2.45, 0])
        self.play(FadeIn(ile), Write(ouest), Write(est))

        nu = nuage(1.0).move_to([1.8, -0.9, 0])
        self.play(FadeIn(nu, scale=0.6))
        self.play(nu.animate.move_to([0.55, 0.55, 0]).scale(1.2), run_time=1.2)

        pl = gouttes_pluie([0.95, -0.05, 0], n=6, largeur=1.1)
        self.play(LaggedStart(*[
            Succession(FadeIn(d, shift=0.2 * DOWN), FadeOut(d, shift=0.3 * DOWN)) for d in pl
        ], lag_ratio=0.07), run_time=1.4)

        l3 = self.T("Ils lâchent tout à l'Est.", size=26, color=BLEU_CALCUL).move_to([0, 1.9, 0])
        self.play(Write(l3))

        self.play(nu.animate.move_to([-0.7, 0.35, 0]).scale(0.5).set_opacity(0.35), run_time=1.0)
        sol = soleil(0.28).move_to([-1.7, 1.1, 0])
        l4 = self.T("L'Ouest reste sec :", size=26, color=ORANGE_RETENUE).move_to([0, -3.0, 0])
        l5 = self.T("c'est l'effet de foehn !", size=28, color=VERT_OK).next_to(l4, DOWN, buff=0.18)
        self.play(GrowFromCenter(sol))
        self.play(Write(l4), Write(l5))
        self.wait(2.0)

    # ── écran 3 : l'eau devient lumière ─────────────────────────────────────

    def ecran_centrale(self):
        self.clear()
        self.add_mascotte(scale=0.45)

        l1 = self.T("Et cette pluie ?", size=28, color=JAUNE_TITRE).move_to([0, 3.4, 0])
        l2 = self.T("Elle fait tourner des turbines !", size=26, color=BLEU_CALCUL).next_to(l1, DOWN, buff=0.2)
        self.play(Write(l1), Write(l2))

        retenue = Rectangle(width=1.6, height=0.6, color=BLEU_CALCUL, fill_color=BLEU_CALCUL,
                            fill_opacity=0.6, stroke_width=2).move_to([-1.1, 1.6, 0])
        conduite = Line([-0.6, 1.3, 0], [0.6, -0.9, 0], color=GREY_B, stroke_width=10)
        turbine = VGroup(
            Circle(radius=0.42, color=WHITE, stroke_width=3),
            *[Line(ORIGIN, 0.38 * np.array([np.cos(a), np.sin(a), 0]), color=WHITE, stroke_width=3)
              for a in np.linspace(0, 2 * PI, 4, endpoint=False)],
        ).move_to([0.85, -1.15, 0])
        self.play(FadeIn(retenue), Create(conduite), Create(turbine))

        chemin = Line(conduite.get_start(), conduite.get_end())
        gouttes = VGroup(*[Circle(radius=0.07, color=BLEU_CALCUL, fill_color=BLEU_CALCUL,
                                  fill_opacity=1, stroke_width=0).move_to(chemin.get_start())
                           for _ in range(4)])
        self.play(LaggedStart(*[MoveAlongPath(g, chemin) for g in gouttes], lag_ratio=0.2),
                  Rotate(turbine, -2.5 * PI), run_time=2.2)
        self.play(FadeOut(gouttes))

        m1 = maison().scale(0.9).move_to([-0.9, -2.2, 0])
        fil = Line(turbine.get_center() + 0.45 * DOWN, m1.get_center() + 0.45 * RIGHT,
                   color=JAUNE_TITRE, stroke_width=4)
        self.play(Create(fil), FadeIn(m1))
        self.play(m1[2].animate.set_fill(JAUNE_TITRE, opacity=1), Flash(m1[2], color=JAUNE_TITRE))

        l3 = self.T("La pluie de l'Est", size=28, color=VERT_OK).move_to([0, -3.1, 0])
        l4 = self.T("éclaire toute l'île !", size=28, color=VERT_OK).next_to(l3, DOWN, buff=0.18)
        self.play(Write(l3), Write(l4))
        self.wait(2.0)

    # ── écran 4 : CTA ───────────────────────────────────────────────────────

    def ecran_cta(self):
        self.clear()
        m = MascotteMargouillat().scale(0.9).move_to([0, -1.4, 0])
        self.add(m)
        t1 = self.T("Toute l'eau de La Réunion,", size=28).move_to([0, 2.6, 0])
        t2 = self.T("expliquée en vidéo :", size=28).next_to(t1, DOWN, buff=0.2)
        url = self.T("eleveai.fr", size=44, color=VERT_OK).next_to(t2, DOWN, buff=0.5)
        sig = self.T(SIGNATURE, size=20, color=VERT_OK).move_to([0, -3.4, 0])
        self.play(Write(t1), Write(t2))
        self.play(Write(url), Flash(url, color=VERT_OK))
        self.play(Write(sig))
        self.wait(2.2)

    def construct(self):
        self.ecran_hook()
        self.ecran_foehn()
        self.ecran_centrale()
        self.ecran_cta()


# ─── SCRIPT VOIX (optionnel — à lire au téléphone par-dessus la vidéo 16:9 muette) ──
# Dire « top » quand le titre d'accueil apparaît (point de synchro Clipchamp).
#
# [Accueil ~0:00]    « D'où vient l'eau de ton robinet ? Suivons une goutte d'eau,
#                      de l'océan jusqu'à la lumière. »
# [Écran 1 ~0:12]    « Le soleil chauffe l'océan Indien. L'eau s'évapore et monte.
#                      En altitude il fait froid : la vapeur redevient des gouttes,
#                      un nuage est né. »
# [Écran 2 ~0:35]    « Les alizés poussent le nuage vers l'île. La montagne l'oblige
#                      à monter, il refroidit, et il lâche sa pluie à l'Est. L'air
#                      redescend à l'Ouest, déjà vidé de son eau : l'Ouest reste sec.
#                      C'est l'effet de foehn. »
# [Écran 3 ~1:05]    « La pluie dévale : cascades, rivières. Une partie s'infiltre
#                      sous terre, dans les nappes. Une partie est captée dans des
#                      réservoirs... jusqu'à ton robinet. »
# [Écran 4 ~1:25]    « Et à la Rivière de l'Est, l'eau tombe de très haut dans un
#                      grand tuyau. Elle fait tourner une turbine : la pluie de l'Est
#                      éclaire les maisons de toute l'île. »
# [Défi ~1:45]       « À toi ! À Commerson, dans l'Est, il tombe dix mille millimètres
#                      de pluie par an. À Saint-Gilles, cinq cents. Combien de fois
#                      plus à Commerson ? Mets pause ! »
# [Correction ~2:00] « Dix mille divisé par cinq cents : vingt. Il pleut vingt fois
#                      plus à Commerson qu'à Saint-Gilles. Et les deux sont sur la
#                      même île, à quarante kilomètres ! »
# [À retenir ~2:20]  « On retient : le soleil fait monter l'eau, les alizés la
#                      ramènent sur l'île, la montagne la fait pleuvoir à l'Est, et
#                      cette eau descend jusqu'à ton robinet... et jusqu'à la
#                      turbine qui allume ta lampe. À bientôt ! »
