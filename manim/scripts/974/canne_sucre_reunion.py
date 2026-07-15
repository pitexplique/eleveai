# canne_sucre_reunion.py
# EleveAI — « Les maths en vrai · La Réunion » — La canne à sucre : du champ au sucre (et à la lumière)
#
# Épisode 6 de la série « en vrai 974 » (voir manim/REGLES.md). ÉDUCATIVE ET HONNÊTE,
# centrée sur L'HUMAIN : on suit un PLANTEUR, sa canne se transforme à l'usine du Gol,
# et on n'oublie jamais les gens (la filière emploie ~18 000 personnes). Le « wow » :
# la bagasse (les fibres) est brûlée → électricité (la canne fait du sucre ET de la
# lumière, écho de l'épisode eau). Ordre de grandeur honnêtes, tout en « environ ».
#
# Maths : proportionnalité — le défi RELIE le m² de canne au sucre
# (1 m² → ~10 kg de canne → ~1 kg de sucre ; un champ de 3 000 m² → 3 000 kg de sucre).
#
# Deux scènes :
# - CanneSucreReunion974      → 16:9 YouTube (~1 min 50)
# - CanneSucreReunion974Short → 9:16 Shorts/Instagram (~40 s), rendre avec -r 1080,1920
#
# Rendu brouillon :
#   python -m manim render -ql manim/scripts/974/canne_sucre_reunion.py CanneSucreReunion974 --media_dir manim/scripts/974/media
#   python -m manim render -ql -r 480,854 manim/scripts/974/canne_sucre_reunion.py CanneSucreReunion974Short --media_dir manim/scripts/974/media
# Rendu final :
#   python -m manim render -qh manim/scripts/974/canne_sucre_reunion.py CanneSucreReunion974 -o eleveai-maths-974-canne-sucre-reunion --media_dir manim/scripts/974/media
#   python -m manim render -qh -r 1080,1920 manim/scripts/974/canne_sucre_reunion.py CanneSucreReunion974Short -o eleveai-maths-974-canne-sucre-reunion-short --media_dir manim/scripts/974/media
#
# Repères réels (ordres de grandeur, arrondis pour l'élève) :
# - Rendement : ~100 kg de canne → ~10 kg de sucre (~10 %) ; ~10 kg de canne / m² / an → ~1 kg de sucre / m²
# - Usines : le Gol (Saint-Louis) et Bois Rouge (Saint-André)
# - Coproduits : bagasse → électricité (centrale thermique) ; mélasse → rhum
# - Filière canne-sucre-rhum : ~3 000 planteurs, ~18 000 personnes (direct + indirect)

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

import numpy as np
from manim import *

from charte import *
from mascotte import MascotteMargouillat

CANNE = ManimColor("#8BC34A")
CANNE_F = ManimColor("#558B2F")
SIROP = ManimColor("#C77E2A")
SUCRE = ManimColor("#F2E4C4")
MELASSE = ManimColor("#4E342E")
PEAU = ManimColor("#C8A165")


# ── décor partagé ──────────────────────────────────────────────────────────────

def soleil(r=0.42):
    disque = Circle(radius=r, color=JAUNE_TITRE, fill_color=JAUNE_TITRE, fill_opacity=1, stroke_width=0)
    rayons = VGroup(*[
        Line((r + 0.10) * np.array([np.cos(a), np.sin(a), 0]), (r + 0.32) * np.array([np.cos(a), np.sin(a), 0]),
             color=JAUNE_TITRE, stroke_width=4) for a in np.linspace(0, 2 * PI, 8, endpoint=False)])
    return VGroup(disque, rayons)


def canne(echelle=1.0):
    tige = RoundedRectangle(width=0.15, height=1.9, corner_radius=0.06, fill_color=CANNE, fill_opacity=1, stroke_width=0)
    noeuds = VGroup(*[Line([-0.08, y, 0], [0.08, y, 0], color=CANNE_F, stroke_width=3) for y in np.linspace(-0.75, 0.75, 5)])
    f1 = Polygon([0, 0.9, 0], [-0.4, 1.55, 0], [-0.03, 1.0, 0], fill_color=CANNE_F, fill_opacity=1, stroke_width=0)
    f2 = Polygon([0, 0.9, 0], [0.4, 1.5, 0], [0.03, 1.0, 0], fill_color=CANNE_F, fill_opacity=1, stroke_width=0)
    return VGroup(tige, noeuds, f1, f2).scale(echelle)


def bonhomme(echelle=1.0, couleur=WHITE):
    tete = Circle(radius=0.16, color=couleur, fill_color=couleur, fill_opacity=1, stroke_width=0).shift(UP * 0.5)
    corps = Line([0, 0.34, 0], [0, -0.25, 0], color=couleur, stroke_width=5)
    bras = Line([-0.28, 0.1, 0], [0.28, 0.1, 0], color=couleur, stroke_width=5)
    jg = Line([0, -0.25, 0], [-0.2, -0.7, 0], color=couleur, stroke_width=5)
    jd = Line([0, -0.25, 0], [0.2, -0.7, 0], color=couleur, stroke_width=5)
    return VGroup(tete, corps, bras, jg, jd).scale(echelle)


def planteur(echelle=1.0):
    corps = bonhomme(1.0, PEAU)
    brim = Ellipse(width=0.66, height=0.16, fill_color=CANNE_F, fill_opacity=1, stroke_width=0).move_to([0, 0.6, 0])
    dome = Ellipse(width=0.34, height=0.22, fill_color=CANNE_F, fill_opacity=1, stroke_width=0).move_to([0, 0.68, 0])
    return VGroup(corps, brim, dome).scale(echelle)


def camion(echelle=1.0):
    benne = Rectangle(width=1.7, height=0.7, fill_color=GREY_D, fill_opacity=1, stroke_color=GREY_B, stroke_width=2).move_to([-0.2, 0.1, 0])
    cabine = Rectangle(width=0.7, height=0.85, fill_color=BLEU_CALCUL, fill_opacity=1, stroke_width=0).move_to([1.0, 0.18, 0])
    vitre = Rectangle(width=0.4, height=0.3, fill_color=WHITE, fill_opacity=0.9, stroke_width=0).move_to([1.05, 0.4, 0])
    charge = VGroup(*[RoundedRectangle(width=1.5, height=0.12, corner_radius=0.05, fill_color=CANNE, fill_opacity=1, stroke_width=0).move_to([-0.2, 0.5 + i * 0.14, 0]) for i in range(3)])
    r1 = Circle(radius=0.22, color=BLACK, fill_color=BLACK, fill_opacity=1, stroke_width=0).move_to([-0.6, -0.35, 0])
    r2 = Circle(radius=0.22, color=BLACK, fill_color=BLACK, fill_opacity=1, stroke_width=0).move_to([0.3, -0.35, 0])
    r3 = Circle(radius=0.22, color=BLACK, fill_color=BLACK, fill_opacity=1, stroke_width=0).move_to([1.0, -0.35, 0])
    return VGroup(benne, charge, cabine, vitre, r1, r2, r3).scale(echelle)


def usine(echelle=1.0):
    corps = Rectangle(width=2.2, height=1.3, fill_color=GREY_D, fill_opacity=1, stroke_color=GREY_B, stroke_width=2).move_to([0, 0, 0])
    toit = Rectangle(width=2.2, height=0.18, fill_color=GREY_B, fill_opacity=1, stroke_width=0).move_to([0, 0.65, 0])
    chem = Rectangle(width=0.32, height=0.9, fill_color=GREY_C, fill_opacity=1, stroke_width=0).move_to([0.7, 1.1, 0])
    portes = VGroup(*[Rectangle(width=0.3, height=0.5, fill_color=ManimColor("#0b2c4a"), fill_opacity=1, stroke_width=0).move_to([-0.6 + i * 0.6, -0.4, 0]) for i in range(3)])
    return VGroup(corps, toit, chem, portes).scale(echelle)


def maison(couleur=WHITE):
    mur = Square(side_length=0.62, color=couleur, fill_color=GREY_E, fill_opacity=1, stroke_width=2)
    toit = Triangle(color=couleur, fill_color=GREY_D, fill_opacity=1, stroke_width=2).scale(0.42).stretch_to_fit_width(0.78).next_to(mur, UP, buff=0)
    fen = Square(side_length=0.2, color=WHITE, fill_color=GREY_C, fill_opacity=1, stroke_width=1.5).move_to(mur.get_center())
    return VGroup(mur, toit, fen)


class CanneBase(Scene):
    LARGEUR_SURE = 12.8

    def add_mascotte(self, scale=0.5):
        m = MascotteMargouillat().scale(scale).to_corner(DOWN + RIGHT, buff=0.35)
        self.add(m)
        return m

    def T(self, texte, size=28, color=WHITE, **kw):
        t = Text(texte, font_size=size, color=color, **kw)
        if t.width > self.LARGEUR_SURE:
            t.scale_to_fit_width(self.LARGEUR_SURE)
        return t

    def titre_ecran(self, texte):
        t = self.T(texte, size=38, color=JAUNE_TITRE).to_edge(UP)
        if not hasattr(self, "_tt"):
            self._tt = 0
        anim = [Write(t), FadeIn(t, shift=0.3 * DOWN), GrowFromCenter(t)][self._tt % 3]
        self._tt += 1
        self.play(anim)
        return t

    def anim_entree(self, m, mode=None, run_time=0.8):
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
        state = {"m": None, "k": 0}
        if places is None:
            places = [(-3.4, 2.6), (3.2, 1.9), (0, 2.9), (-3.3, 0.9), (3.3, -1.4), (0, -2.9)]

        def dire(texte, size=26, couleur=BLEU_CALCUL, mode=None, pos=None):
            x, y = pos if pos is not None else places[state["k"] % len(places)]
            t = self.T(texte, size=size, color=couleur).move_to([x, y, 0])
            if t.width > self.LARGEUR_SURE - 1.0:
                t.scale_to_fit_width(self.LARGEUR_SURE - 1.0).move_to([0, y, 0])
            half = self.LARGEUR_SURE / 2 - 0.25
            if t.get_right()[0] > half:
                t.shift(LEFT * (t.get_right()[0] - half))
            if t.get_left()[0] < -half:
                t.shift(RIGHT * (-half - t.get_left()[0]))
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

class CanneSucreReunion974(CanneBase):

    # ── écran 0 : accueil ───────────────────────────────────────────────────
    def ecran_accueil(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        titre = self.T("D'où vient le sucre ? De la canne péi !", size=42, color=JAUNE_TITRE).to_edge(UP)
        sous = self.T("Les maths en vrai · La Réunion — EleveAI", size=30).next_to(titre, DOWN, buff=0.35)
        sol = soleil(0.4).move_to([4.8, 1.4, 0])
        p = planteur(0.9).move_to([-4.2, -1.4, 0])
        c1 = canne(0.9).move_to([-2.8, -1.2, 0])
        c2 = canne(0.9).move_to([-2.2, -1.2, 0])
        accroche = self.T("Suis un planteur : sa canne va devenir du sucre... et de la lumière.",
                          size=29, color=CANNE).move_to([0.4, 0.9, 0])
        if accroche.width > 11.5:
            accroche.scale_to_fit_width(11.5).move_to([0.4, 0.9, 0])
        self.play(GrowFromCenter(titre), FadeIn(sous, shift=0.3 * DOWN))
        self.play(GrowFromCenter(sol), FadeIn(p, shift=0.4 * RIGHT), FadeIn(c1, shift=0.2 * UP), FadeIn(c2, shift=0.2 * UP))
        self.play(FadeIn(accroche, scale=0.5))
        self.wait(2.0)

    # ── écran 1 : dans le champ (le soleil devient du sucre) ────────────────
    def ecran_champ(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("1. Dans le champ, le soleil devient du sucre")

        sol = soleil(0.45).move_to([-5.0, 2.1, 0])
        champ = VGroup(*[canne(0.85).move_to([-3.4 + i * 0.95, -1.4, 0]) for i in range(8)])
        p = planteur(0.85).move_to([4.6, -1.5, 0])
        self.play(GrowFromCenter(sol), LaggedStart(*[FadeIn(c, shift=0.3 * UP) for c in champ], lag_ratio=0.08), run_time=2.0)
        self.play(FadeIn(p, shift=0.4 * LEFT))

        # les rayons "nourrissent" la canne
        rayons = VGroup(*[Arrow(sol.get_center(), champ[i].get_top(), color=JAUNE_TITRE, stroke_width=2, buff=0.2) for i in (1, 3, 5)])
        l1 = self.T("La canne pousse au soleil : ses feuilles fabriquent le sucre.", size=26).move_to([0, 1.5, 0])
        self.play(self.anim_entree(l1, mode="fade_down"), LaggedStart(*[GrowArrow(r) for r in rayons], lag_ratio=0.2))
        self.play(FadeOut(rayons))

        # la coupe : une canne bascule
        l2 = self.T("Le planteur la coupe : c'est la campagne sucrière.", size=26, color=CANNE).move_to([0, 0.6, 0])
        self.play(self.anim_entree(l2, mode="slide_l"))
        self.play(champ[6].animate.rotate(-PI / 3, about_point=champ[6].get_bottom()), run_time=0.8)
        self.wait(2.0)

    # ── écran 2 : direction l'usine du Gol ──────────────────────────────────
    def ecran_route(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("2. Direction l'usine du Gol")

        route = Line([-6.6, -2.2, 0], [6.6, -2.2, 0], color=GREY_B, stroke_width=4)
        us = usine(1.0).move_to([4.6, -1.2, 0])
        uslab = self.T("le Gol", size=22, color=WHITE).next_to(us, DOWN, buff=0.15)
        cam = camion(0.9).move_to([-5.0, -1.7, 0])
        self.play(Create(route), FadeIn(us, shift=0.3 * UP), FadeIn(uslab, shift=0.2 * DOWN))
        self.play(FadeIn(cam, shift=0.4 * RIGHT))

        l1 = self.T("Le cachalot (le camion) emporte la canne à la sucrerie.", size=26).move_to([0, 1.6, 0])
        self.play(self.anim_entree(l1, mode="fade_down"))
        self.play(cam.animate.move_to([2.4, -1.7, 0]), run_time=2.2)
        l2 = self.T("Deux grandes usines sur l'île : le Gol et Bois Rouge.", size=25, color=BLEU_CALCUL).move_to([0, 0.6, 0])
        self.play(self.anim_entree(l2, mode="fade_up"))
        self.wait(1.8)

    # ── écran 3 : la transformation ─────────────────────────────────────────
    def ecran_transformation(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("3. On presse, on chauffe, ça cristallise")
        dire, _ = self.legende_mobile(places=[(-3.5, 2.5), (3.4, 2.5), (0, 2.5), (0, -2.7)])

        # broyage : deux rouleaux + une canne qui entre, un filet de jus qui sort
        r1 = Circle(radius=0.4, color=GREY_B, fill_color=GREY_D, fill_opacity=1, stroke_width=3).move_to([-4.2, 0.5, 0])
        r2 = Circle(radius=0.4, color=GREY_B, fill_color=GREY_D, fill_opacity=1, stroke_width=3).move_to([-4.2, -0.4, 0])
        c = canne(0.6).move_to([-5.4, 0.05, 0]).rotate(PI / 2)
        self.play(FadeIn(VGroup(r1, r2)), FadeIn(c))
        dire("On BROIE la canne : on en tire le jus.", couleur=CANNE, mode="slide_l")
        self.play(c.animate.move_to([-4.2, 0.05, 0]).scale(0.5), Rotate(r1, PI), Rotate(r2, -PI), run_time=1.2)
        jus = VGroup(*[Dot([-4.2, -0.9 - i * 0.18, 0], radius=0.06, color=SIROP) for i in range(3)])
        self.play(LaggedStart(*[FadeIn(d, shift=0.2 * DOWN) for d in jus], lag_ratio=0.2))

        # évaporation : cuve + chaleur + vapeur
        cuve = Rectangle(width=1.4, height=0.9, fill_color=SIROP, fill_opacity=0.7, stroke_color=GREY_B, stroke_width=2).move_to([-0.6, -0.4, 0])
        vap = VGroup(*[Circle(radius=0.05, color=WHITE, fill_color=WHITE, fill_opacity=0.7, stroke_width=0).move_to([-0.9 + i * 0.3, 0.2, 0]) for i in range(3)])
        self.play(FadeIn(cuve))
        dire("On CHAUFFE : l'eau s'en va, le jus devient sirop.", couleur=SIROP, mode="fade_down")
        self.play(LaggedStart(*[Succession(FadeIn(v, scale=0.4), v.animate.shift(UP * 1.2).set_opacity(0.1)) for v in vap], lag_ratio=0.2), run_time=1.6)

        # cristallisation : des petits carrés de sucre + mélasse à part
        cristaux = VGroup(*[Square(side_length=0.16, fill_color=SUCRE, fill_opacity=1, stroke_color=GREY_C, stroke_width=1) for _ in range(9)]).arrange_in_grid(3, 3, buff=0.06).move_to([3.2, 0.1, 0])
        sucrelab = self.T("le SUCRE", size=24, color=SUCRE).next_to(cristaux, UP, buff=0.2)
        melasse = Rectangle(width=0.6, height=0.5, fill_color=MELASSE, fill_opacity=1, stroke_width=0).move_to([5.0, -0.6, 0])
        mlab = self.T("mélasse", size=18, color=MELASSE).next_to(melasse, DOWN, buff=0.1)
        dire("Le sirop CRISTALLISE : voilà le sucre ! (et la mélasse à part)", couleur=VERT_OK, mode="grow")
        self.play(LaggedStart(*[FadeIn(s, scale=0.4) for s in cristaux], lag_ratio=0.08), FadeIn(sucrelab, shift=0.2 * UP), run_time=1.4)
        self.play(FadeIn(melasse, shift=0.2 * UP), FadeIn(mlab, shift=0.2 * DOWN))
        self.wait(1.8)

    # ── écran 4 : le WOW (bagasse → électricité) ────────────────────────────
    def ecran_wow(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("4. La canne fait du sucre ET de la lumière")

        bagasse = VGroup(*[Line([-5.0 + 0.12 * (i % 2), -0.2 + 0.16 * i, 0], [-4.4 + 0.12 * (i % 2), -0.1 + 0.16 * i, 0], color=CANNE_F, stroke_width=5) for i in range(5)])
        blab = self.T("la bagasse (les fibres)", size=22, color=CANNE_F).move_to([-4.4, -1.3, 0])
        self.play(LaggedStart(*[GrowFromCenter(b) for b in bagasse], lag_ratio=0.1), FadeIn(blab, shift=0.2 * DOWN))

        # brûlée → flamme → électricité → maisons
        flamme = VGroup(*[Polygon([-2.6 + 0.2 * i, -0.5, 0], [-2.5 + 0.2 * i, 0.3, 0], [-2.4 + 0.2 * i, -0.5, 0], fill_color=ORANGE_RETENUE, fill_opacity=1, stroke_width=0) for i in range(3)])
        fleche1 = Arrow([-3.9, 0.0, 0], [-2.9, 0.0, 0], color=WHITE, stroke_width=4, buff=0.1)
        self.play(GrowArrow(fleche1), LaggedStart(*[GrowFromEdge(f, DOWN) for f in flamme], lag_ratio=0.1))

        l1 = self.T("La bagasse est brûlée → de l'ÉLECTRICITÉ !", size=27, color=JAUNE_TITRE).move_to([1.6, 2.0, 0])
        self.play(self.anim_entree(l1, mode="slide_r"))
        fil = Line([-2.0, -0.1, 0], [1.4, -0.1, 0], color=JAUNE_TITRE, stroke_width=4)
        m1 = maison().move_to([2.4, -0.35, 0])
        m2 = maison().move_to([3.7, -0.35, 0])
        self.play(Create(fil), FadeIn(m1), FadeIn(m2))
        self.play(m1[2].animate.set_fill(JAUNE_TITRE, opacity=1), m2[2].animate.set_fill(JAUNE_TITRE, opacity=1),
                  Flash(m1[2], color=JAUNE_TITRE), Flash(m2[2], color=JAUNE_TITRE))

        l2 = self.T("Elle alimente l'usine ET l'île. La mélasse, elle, devient du rhum.", size=25, color=VERT_OK).move_to([0, -2.6, 0])
        self.play(self.anim_entree(l2, mode="fade_up"))
        self.wait(2.0)

    # ── écran 5 : la filière (les gens) ─────────────────────────────────────
    def ecran_filiere(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("5. Derrière le sucre, il y a des gens")

        gens = VGroup(
            planteur(0.8),
            bonhomme(0.8, ManimColor("#E0A030")),
            bonhomme(0.8, BLEU_CALCUL),
            bonhomme(0.8, ManimColor("#C0C0C0")),
        ).arrange(RIGHT, buff=0.9).move_to([0, 0.4, 0])
        etiquettes = VGroup(
            self.T("planteur", size=20, color=CANNE).next_to(gens[0], DOWN, buff=0.2),
            self.T("coupeur", size=20).next_to(gens[1], DOWN, buff=0.2),
            self.T("chauffeur", size=20).next_to(gens[2], DOWN, buff=0.2),
            self.T("ouvrier", size=20).next_to(gens[3], DOWN, buff=0.2),
        )
        for g, e in zip(gens, etiquettes):
            self.play(FadeIn(g, shift=0.2 * UP), FadeIn(e, shift=0.2 * DOWN), run_time=0.45)

        l1 = self.T("~ 3 000 planteurs.", size=28, color=CANNE).move_to([-3.0, 2.0, 0])
        l2 = self.T("~ 18 000 personnes vivent de la canne à La Réunion.", size=27, color=VERT_OK).move_to([0, -2.3, 0])
        self.play(self.anim_entree(l1, mode="slide_l"))
        self.play(self.anim_entree(l2, mode="grow"))
        self.wait(2.2)

    # ── écran 6 : le rendement (relie le m² au sucre) ───────────────────────
    def ecran_rendement(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("6. Combien de sucre dans un champ ?")

        # un carré de 1 m² de canne
        carre = Square(side_length=1.8, color=CANNE_F, stroke_width=3).move_to([-3.8, -0.3, 0])
        mini = VGroup(*[canne(0.5).move_to([-4.4 + i * 0.4, -0.5, 0]) for i in range(4)])
        carrelab = self.T("1 m² de canne", size=24, color=CANNE).next_to(carre, DOWN, buff=0.2)
        self.play(Create(carre), LaggedStart(*[FadeIn(c, shift=0.2 * UP) for c in mini], lag_ratio=0.1), FadeIn(carrelab, shift=0.2 * DOWN))

        l1 = self.T("1 m² donne ~ 10 kg de canne par an.", size=28, color=WHITE).move_to([2.2, 1.4, 0])
        l2 = self.T("Et 10 kg de canne → 1 kg de sucre.", size=28, color=SIROP).move_to([2.2, 0.4, 0])
        l3 = self.T("Donc 1 m² ≈ 1 kg de sucre !", size=30, color=VERT_OK).move_to([2.2, -0.7, 0])
        self.play(self.anim_entree(l1, mode="slide_r"))
        self.play(self.anim_entree(l2, mode="fade_up"))
        self.play(self.anim_entree(l3, mode="grow"), Flash(l3, color=VERT_OK))
        self.wait(2.2)

    # ── écran 7 : défi (relie le m² de canne au sucre) ──────────────────────
    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.55)
        titre = self.T("Défi", size=48, color=JAUNE_TITRE).to_edge(UP)
        self.play(GrowFromCenter(titre))

        rappel = self.T("Rappel : 1 m² → 10 kg de canne  ·  10 kg de canne → 1 kg de sucre", size=24, color=SIROP).move_to([0, 2.2, 0])
        if rappel.width > 11.5:
            rappel.scale_to_fit_width(11.5).move_to([0, 2.2, 0])
        cadre = SurroundingRectangle(rappel, color=SIROP, buff=0.2, corner_radius=0.1)
        self.play(self.anim_entree(rappel, mode="fade_down"), Create(cadre))

        p = planteur(0.9).move_to([-4.4, 0.2, 0])
        champ = Square(side_length=1.9, color=CANNE_F, fill_color=CANNE, fill_opacity=0.25, stroke_width=3).move_to([-1.6, 0.1, 0])
        champlab = self.T("le champ : 3 000 m²", size=26, color=CANNE).next_to(champ, DOWN, buff=0.2)
        self.play(FadeIn(p, shift=0.3 * RIGHT), Create(champ))
        self.play(self.anim_entree(champlab, mode="pop"))

        q1 = self.T("Combien de kg de sucre", size=30, color=WHITE).move_to([3.2, 0.5, 0])
        q2 = self.T("ce champ donne-t-il par an ?", size=30, color=WHITE).next_to(q1, DOWN, buff=0.16)
        self.play(self.anim_entree(q1, mode="slide_r"), self.anim_entree(q2, mode="slide_r"))
        pause = self.T("Mets pause : il y a DEUX étapes !", size=26, color=ORANGE_RETENUE).to_edge(DOWN, buff=0.3)
        self.play(GrowFromCenter(pause))
        self.wait(4.5)

    # ── écran 8 : correction ────────────────────────────────────────────────
    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("Correction")

        e1 = self.T("Étape 1 — la canne récoltée (3 000 m² × 10 kg)", size=27, color=CANNE).move_to([0, 2.3, 0])
        self.play(self.anim_entree(e1, mode="slide_l"))
        c1 = self.T("3 000 × 10 = 30 000 kg de canne", size=36, color=VERT_OK).move_to([0, 1.4, 0])
        self.play(self.anim_entree(c1, mode="pop"))

        e2 = self.T("Étape 2 — le sucre (10 kg de canne → 1 kg)", size=27, color=SIROP).move_to([0, 0.3, 0])
        self.play(self.anim_entree(e2, mode="slide_r"))
        c2 = self.T("30 000 ÷ 10 = 3 000 kg de sucre", size=36, color=VERT_OK).move_to([0, -0.7, 0])
        self.play(self.anim_entree(c2, mode="grow"))
        self.play(Flash(c2, color=VERT_OK))

        concl = self.T("→ 3 000 kg de sucre (soit 1 kg par m²).", size=30, color=JAUNE_TITRE).to_edge(DOWN, buff=0.6)
        self.play(GrowFromCenter(concl))
        self.wait(2.6)

    # ── écran 9 : à retenir (l'hommage aux hommes) ──────────────────────────
    def ecran_conclusion(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        titre = self.T("À retenir", size=46, color=JAUNE_TITRE).to_edge(UP)
        points = VGroup(
            self.T("1. La canne transforme le soleil en sucre.", size=25),
            self.T("2. À l'usine : on broie, on chauffe, ça cristallise en sucre.", size=25),
            self.T("3. La bagasse fait de l'électricité : du sucre ET de la lumière.", size=25),
            self.T("4. Derrière le sucre, il y a des hommes — on ne les oublie jamais.", size=25, color=JAUNE_TITRE),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.4).move_to([-0.1, 0.2, 0])
        signature = self.T(SIGNATURE, size=26, color=VERT_OK).to_edge(DOWN)
        self.play(GrowFromCenter(titre))
        self.play(LaggedStart(*[FadeIn(p, shift=0.4 * RIGHT) for p in points], lag_ratio=0.35))
        self.play(FadeIn(signature, shift=0.3 * UP), Flash(signature, color=VERT_OK))
        self.wait(2.6)

    def construct(self):
        self.ecran_accueil()
        self.ecran_champ()
        self.ecran_route()
        self.ecran_transformation()
        self.ecran_wow()
        self.ecran_filiere()
        self.ecran_rendement()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_conclusion()


# ════════════════════════════════════════════════════════════════════════════════
#  SCÈNE 9:16 — le Short
# ════════════════════════════════════════════════════════════════════════════════

class CanneSucreReunion974Short(CanneBase):

    LARGEUR_SURE = 4.1

    def __init__(self, **kwargs):
        config.frame_height = 8.0
        config.frame_width = 4.5
        super().__init__(**kwargs)

    def ecran_hook(self):
        self.clear()
        self.add_mascotte(scale=0.55)
        t1 = self.T("La canne péi fait", size=30).move_to([0, 3.3, 0])
        t2 = self.T("du SUCRE", size=38, color=SUCRE).next_to(t1, DOWN, buff=0.18)
        t3 = self.T("ET de la LUMIÈRE.", size=32, color=JAUNE_TITRE).next_to(t2, DOWN, buff=0.2)
        self.play(self.anim_entree(t1, mode="fade_down"))
        self.play(self.anim_entree(t2, mode="pop"), self.anim_entree(t3, mode="grow"))
        c = VGroup(*[canne(0.9).move_to([-1.0 + i * 1.0, -1.4, 0]) for i in range(3)])
        self.play(LaggedStart(*[FadeIn(x, shift=0.3 * UP) for x in c], lag_ratio=0.15))
        self.wait(1.4)

    def ecran_wow(self):
        self.clear()
        self.add_mascotte(scale=0.45)
        l1 = self.T("La bagasse (les fibres)", size=26, color=CANNE_F).move_to([0, 3.3, 0])
        l2 = self.T("est brûlée →", size=26).next_to(l1, DOWN, buff=0.15)
        l3 = self.T("ÉLECTRICITÉ !", size=34, color=JAUNE_TITRE).next_to(l2, DOWN, buff=0.2)
        self.play(self.anim_entree(l1, mode="fade_down"))
        self.play(self.anim_entree(l2, mode="slide_l"))
        self.play(GrowFromCenter(l3), Flash(l3, color=JAUNE_TITRE))
        m1 = maison().scale(0.9).move_to([0, -1.4, 0])
        self.play(FadeIn(m1, shift=0.3 * UP))
        self.play(m1[2].animate.set_fill(JAUNE_TITRE, opacity=1), Flash(m1[2], color=JAUNE_TITRE))
        l4 = self.T("Elle alimente l'île !", size=26, color=VERT_OK).move_to([0, -3.0, 0])
        self.play(self.anim_entree(l4, mode="grow"))
        self.wait(1.6)

    def ecran_hommes(self):
        self.clear()
        self.add_mascotte(scale=0.45)
        l1 = self.T("Et derrière le sucre,", size=28, color=JAUNE_TITRE).move_to([0, 3.3, 0])
        l2 = self.T("il y a des hommes.", size=28).next_to(l1, DOWN, buff=0.18)
        self.play(self.anim_entree(l1, mode="fade_down"))
        self.play(self.anim_entree(l2, mode="slide_l"))
        gens = VGroup(planteur(0.8), bonhomme(0.8, ManimColor("#E0A030")), bonhomme(0.8, BLEU_CALCUL)).arrange(RIGHT, buff=0.5).move_to([0, 0.2, 0])
        self.play(LaggedStart(*[FadeIn(g, shift=0.2 * UP) for g in gens], lag_ratio=0.15))
        l3 = self.T("~ 18 000 personnes", size=28, color=VERT_OK).move_to([0, -2.2, 0])
        l4 = self.T("vivent de la canne.", size=26).next_to(l3, DOWN, buff=0.15)
        self.play(self.anim_entree(l3, mode="grow"))
        self.play(self.anim_entree(l4, mode="fade_up"))
        self.wait(1.8)

    def ecran_cta(self):
        self.clear()
        m = MascotteMargouillat().scale(0.9).move_to([0, -1.4, 0])
        self.add(m)
        t1 = self.T("La Réunion en vrai,", size=28).move_to([0, 2.6, 0])
        t2 = self.T("expliquée en vidéo :", size=28).next_to(t1, DOWN, buff=0.2)
        url = self.T("eleveai.fr", size=44, color=VERT_OK).next_to(t2, DOWN, buff=0.5)
        sig = self.T(SIGNATURE, size=20, color=VERT_OK).move_to([0, -3.4, 0])
        self.play(self.anim_entree(t1, mode="slide_l"), self.anim_entree(t2, mode="slide_r"))
        self.play(GrowFromCenter(url), Flash(url, color=VERT_OK))
        self.play(FadeIn(sig, shift=0.2 * UP))
        self.wait(2.2)

    def construct(self):
        self.ecran_hook()
        self.ecran_wow()
        self.ecran_hommes()
        self.ecran_cta()


# ─── SCRIPT VOIX (optionnel — à lire au téléphone par-dessus la vidéo 16:9 muette) ──
# [Accueil ~0:00]   « D'où vient le sucre ? De la canne de La Réunion. Suis un
#                     planteur : sa canne va devenir du sucre... et de la lumière. »
# [Écran 1 ~0:10]   « Dans le champ, la canne pousse au soleil : ses feuilles
#                     fabriquent le sucre. Le planteur la coupe : c'est la campagne
#                     sucrière. »
# [Écran 2 ~0:25]   « Le cachalot, le camion, emporte la canne à l'usine du Gol — une
#                     des deux grandes sucreries de l'île avec Bois Rouge. »
# [Écran 3 ~0:40]   « On broie la canne pour en tirer le jus. On le chauffe : l'eau
#                     s'en va, le jus devient un sirop. Le sirop cristallise : voilà le
#                     sucre ! Et la mélasse est mise à part. »
# [Écran 4 ~1:00]   « Et la bagasse, les fibres qui restent ? Elle est brûlée pour
#                     faire de l'électricité, qui alimente l'usine et l'île ! La canne
#                     fait du sucre ET de la lumière. La mélasse, elle, devient du rhum.
#                     Rien ne se perd. »
# [Écran 5 ~1:20]   « Et derrière le sucre, il y a des gens : environ trois mille
#                     planteurs, et dix-huit mille personnes qui vivent de la canne. »
# [Écran 6 ~1:35]   « Combien de sucre dans un champ ? Un mètre carré donne environ
#                     10 kg de canne, et 10 kg de canne font 1 kg de sucre. Donc un
#                     mètre carré, c'est environ un kilo de sucre ! »
# [Défi ~1:50]      « À toi ! Le champ du planteur fait 3 000 mètres carrés. Combien de
#                     kilos de sucre par an ? »
# [Correction ~2:05]« 3 000 fois 10 : 30 000 kg de canne. 30 000 divisé par 10 : 3 000.
#                     3 000 kg de sucre, soit un kilo par mètre carré. »
# [À retenir ~2:20] « On retient : la canne transforme le soleil en sucre ; à l'usine
#                     on broie, on chauffe, ça cristallise ; la bagasse fait de
#                     l'électricité ; et derrière le sucre, il y a des hommes. On ne les
#                     oublie jamais. »
